#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import math
import shutil
import subprocess
from pathlib import Path

import cv2
import numpy as np
from PIL import Image


def ffprobe_duration(path: Path) -> float:
    out = subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", str(path)
    ], text=True).strip()
    return float(out) if out else 0.0


def load_frames(path: Path):
    cap = cv2.VideoCapture(str(path))
    fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
    frames = []
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        frames.append(frame)
    cap.release()
    if not frames:
        raise RuntimeError(f"no frames: {path}")
    return frames, fps




def detect_face_bbox_rgb(img_rgb: np.ndarray, app) -> tuple[float, float, float, float] | None:
    faces = app.get(img_rgb)
    if not faces:
        return None
    face = max(faces, key=lambda f: float((f.bbox[2] - f.bbox[0]) * (f.bbox[3] - f.bbox[1])))
    return tuple(float(x) for x in face.bbox)


def bbox_center_size(bbox: tuple[float, float, float, float]):
    x1, y1, x2, y2 = bbox
    return ((x1 + x2) / 2.0, (y1 + y2) / 2.0, x2 - x1, y2 - y1)


def face_align_frames(frames: list[np.ndarray], ref_face_bbox, app, target_w: int, target_h: int, bg=(247, 247, 247)) -> tuple[list[np.ndarray], dict]:
    if app is None:
        return frames, {"face_align_applied": False, "face_align_failed": False, "reason": "insightface_unavailable"}
    first_rgb = cv2.cvtColor(frames[0], cv2.COLOR_BGR2RGB)
    src_face_bbox = detect_face_bbox_rgb(first_rgb, app)
    if src_face_bbox is None or ref_face_bbox is None:
        return frames, {"face_align_applied": False, "face_align_failed": True}

    src_cx, src_cy, src_w, src_h = bbox_center_size(src_face_bbox)
    ref_cx, ref_cy, ref_w, ref_h = bbox_center_size(ref_face_bbox)
    if src_w <= 1 or src_h <= 1:
        return frames, {"face_align_applied": False, "face_align_failed": True}

    scale = ((ref_w / src_w) + (ref_h / src_h)) / 2.0
    scale = max(0.85, min(1.25, scale))
    tx = ref_cx - scale * src_cx
    ty = ref_cy - scale * src_cy
    M = np.array([[scale, 0.0, tx], [0.0, scale, ty]], dtype=np.float32)
    aligned = [cv2.warpAffine(f, M, (target_w, target_h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_CONSTANT, borderValue=bg) for f in frames]
    return aligned, {
        "face_align_applied": True,
        "source_face_bbox": [round(x, 2) for x in src_face_bbox],
        "reference_face_bbox": [round(x, 2) for x in ref_face_bbox],
        "scale": round(float(scale), 5),
        "tx": round(float(tx), 2),
        "ty": round(float(ty), 2),
    }


def find_content_y(frames: list[np.ndarray]) -> tuple[int, int, dict]:
    sample_ids = np.linspace(0, len(frames) - 1, min(12, len(frames))).astype(int)
    tops = []
    bottoms = []
    for idx in sample_ids:
        frame = frames[int(idx)]
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        row_mean = gray.mean(axis=1)
        row_std = gray.std(axis=1)
        non_black = (row_mean > 18) | (row_std > 8)
        ys = np.where(non_black)[0]
        if len(ys):
            tops.append(int(ys[0]))
            bottoms.append(int(ys[-1] + 1))
    if not tops:
        return 0, frames[0].shape[0], {"black_crop_failed": True}
    # Conservative crop: remove rows that are black in all sampled frames.
    top = max(tops)
    bottom = min(bottoms)
    if bottom <= top + 32:
        return 0, frames[0].shape[0], {"black_crop_failed": True, "sample_tops": tops, "sample_bottoms": bottoms}
    return top, bottom, {"sample_tops": tops, "sample_bottoms": bottoms}


def resize_to_target(frame: np.ndarray, y1: int, y2: int, target_w: int, target_h: int, bg=(247, 247, 247)) -> np.ndarray:
    crop = frame[y1:y2, :, :]
    ch, cw = crop.shape[:2]
    src_aspect = cw / ch
    target_aspect = target_w / target_h
    if abs(src_aspect - target_aspect) < 0.01:
        return cv2.resize(crop, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
    # Preserve all content, pad rather than crop. This prevents zooming.
    scale = min(target_w / cw, target_h / ch)
    nw = max(2, int(round(cw * scale)) // 2 * 2)
    nh = max(2, int(round(ch * scale)) // 2 * 2)
    resized = cv2.resize(crop, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
    canvas = np.full((target_h, target_w, 3), bg, dtype=np.uint8)
    x = (target_w - nw) // 2
    y = (target_h - nh) // 2
    canvas[y:y+nh, x:x+nw] = resized
    return canvas


def black_edge_stats(frame: np.ndarray) -> dict:
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    top_rows = 0
    for y in range(gray.shape[0]):
        if gray[y].mean() < 18 and gray[y].std() < 8:
            top_rows += 1
        else:
            break
    bottom_rows = 0
    for y in range(gray.shape[0] - 1, -1, -1):
        if gray[y].mean() < 18 and gray[y].std() < 8:
            bottom_rows += 1
        else:
            break
    return {"top_black_rows": top_rows, "bottom_black_rows": bottom_rows}


def reference_mask(reference_alpha: Path, target_w: int, target_h: int) -> np.ndarray:
    ref = Image.open(reference_alpha).convert("RGBA").resize((target_w, target_h), Image.LANCZOS)
    a = np.array(ref)[:, :, 3]
    return a > 96


def load_reference_face_bbox(reference_alpha: Path, target_w: int, target_h: int, app):
    if app is None:
        return None
    ref = Image.open(reference_alpha).convert("RGBA").resize((target_w, target_h), Image.LANCZOS)
    # Composite over the same off-white background used for normalized videos.
    arr = np.array(ref)
    bg = np.full((target_h, target_w, 3), 247, dtype=np.uint8)
    alpha = arr[:, :, 3:4].astype(np.float32) / 255.0
    rgb = (arr[:, :, :3].astype(np.float32) * alpha + bg.astype(np.float32) * (1.0 - alpha)).astype(np.uint8)
    return detect_face_bbox_rgb(rgb, app)


def mask_bbox(mask: np.ndarray) -> tuple[int, int, int, int] | None:
    ys, xs = np.where(mask)
    if len(xs) == 0:
        return None
    return int(xs.min()), int(ys.min()), int(xs.max() + 1), int(ys.max() + 1)


def foreground_bbox(frame: np.ndarray, ref_mask: np.ndarray | None = None) -> tuple[int, int, int, int] | None:
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv)
    bg = (v >= 198) & (s <= 95)
    fg = ~bg
    fg = cv2.morphologyEx(fg.astype(np.uint8), cv2.MORPH_OPEN, np.ones((3, 3), np.uint8), iterations=1).astype(bool)
    if ref_mask is not None:
        # Use reference only as a weak stabilizer, not as the measurement itself.
        fg |= (ref_mask & (v < 245))
    return mask_bbox(fg)


def bbox_delta(a, b) -> dict:
    if a is None or b is None:
        return {"bbox_compare_failed": True}
    ax1, ay1, ax2, ay2 = a
    bx1, by1, bx2, by2 = b
    return {
        "bbox_dx": round(((ax1 + ax2) / 2) - ((bx1 + bx2) / 2), 2),
        "bbox_dy": round(((ay1 + ay2) / 2) - ((by1 + by2) / 2), 2),
        "bbox_dw": round((ax2 - ax1) - (bx2 - bx1), 2),
        "bbox_dh": round((ay2 - ay1) - (by2 - by1), 2),
    }


def frame_score(frame: np.ndarray, first_frame: np.ndarray, ref_mask: np.ndarray) -> float:
    # Lower is better: visual closeness to start plus foreground bbox closeness to reference.
    small = cv2.resize(frame, (224, 300), interpolation=cv2.INTER_AREA).astype(np.float32)
    first = cv2.resize(first_frame, (224, 300), interpolation=cv2.INTER_AREA).astype(np.float32)
    img_diff = float(np.mean(np.abs(small - first)))
    ref_bbox = mask_bbox(ref_mask)
    fg_bbox = foreground_bbox(frame, ref_mask)
    bd = bbox_delta(fg_bbox, ref_bbox)
    if bd.get("bbox_compare_failed"):
        return img_diff + 10000
    return img_diff + abs(bd["bbox_dx"]) * 0.4 + abs(bd["bbox_dy"]) * 0.4 + abs(bd["bbox_dw"]) * 0.15 + abs(bd["bbox_dh"]) * 0.15


def normalize_one(src: Path, dst: Path, motion_id: str, ref_mask: np.ndarray, ref_face_bbox, face_app, args) -> dict:
    frames, fps = load_frames(src)
    y1, y2, crop_info = find_content_y(frames)
    norm = [resize_to_target(f, y1, y2, args.width, args.height) for f in frames]
    norm, face_align_info = face_align_frames(norm, ref_face_bbox, face_app, args.width, args.height)

    min_tail = min(args.min_trim_tail_frames, max(0, len(norm) - 2))
    end_only = motion_id in {"type_laptop", "type_laptop_long", "show_computer_screen", "see_you_next"}
    if end_only:
        keep_count = max(1, len(norm) - min_tail)
        trim_reason = "end_only_min_tail_trim"
    else:
        search = min(args.max_trim_tail_frames, max(0, len(norm) - 2))
        first = norm[0]
        candidates = []
        # Always remove at least min_tail frames, then choose the best earlier ending.
        for trim in range(min_tail, search + 1):
            idx = len(norm) - 1 - trim
            if idx <= 0:
                continue
            candidates.append((frame_score(norm[idx], first, ref_mask), trim, idx))
        best = min(candidates, key=lambda x: x[0]) if candidates else (0.0, min_tail, len(norm) - 1 - min_tail)
        keep_count = best[2] + 1
        trim_reason = "best_tail_neutral_match"

    norm = norm[:keep_count]
    dst.parent.mkdir(parents=True, exist_ok=True)
    tmp = dst.with_suffix(".tmp.mp4")
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(str(tmp), fourcc, fps, (args.width, args.height))
    for f in norm:
        out.write(f)
    out.release()
    # Re-encode with H.264 and no audio.
    subprocess.run([
        "ffmpeg", "-y", "-i", str(tmp), "-an", "-r", f"{fps:.6f}",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "veryfast", str(dst)
    ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    tmp.unlink(missing_ok=True)

    first_stats = black_edge_stats(norm[0])
    last_stats = black_edge_stats(norm[-1])
    ref_bbox = mask_bbox(ref_mask)
    first_bbox = foreground_bbox(norm[0], ref_mask)
    last_bbox = foreground_bbox(norm[-1], ref_mask)
    fail_reasons = []
    if first_stats["top_black_rows"] > 2 or first_stats["bottom_black_rows"] > 2 or last_stats["top_black_rows"] > 2 or last_stats["bottom_black_rows"] > 2:
        fail_reasons.append("black_rows_remain")
    first_delta = bbox_delta(first_bbox, ref_bbox)
    if not first_delta.get("bbox_compare_failed"):
        if abs(first_delta["bbox_dy"]) > args.max_bbox_center_delta_px or abs(first_delta["bbox_dx"]) > args.max_bbox_center_delta_px:
            fail_reasons.append("reference_bbox_center_mismatch")
        if abs(first_delta["bbox_dw"]) > args.max_bbox_size_delta_px or abs(first_delta["bbox_dh"]) > args.max_bbox_size_delta_px:
            fail_reasons.append("reference_bbox_size_mismatch")
    duration = len(norm) / fps
    return {
        "motion_id": motion_id,
        "source": str(src),
        "output": str(dst),
        "source_frames": len(frames),
        "output_frames": len(norm),
        "fps": round(fps, 3),
        "duration_sec": round(duration, 3),
        "source_size": [int(frames[0].shape[1]), int(frames[0].shape[0])],
        "output_size": [args.width, args.height],
        "crop_y": [int(y1), int(y2)],
        "crop_info": crop_info,
        "face_align": face_align_info,
        "trimmed_tail_frames": int(len(frames) - len(norm)),
        "trim_reason": trim_reason,
        "first_black_rows": first_stats,
        "last_black_rows": last_stats,
        "reference_bbox": ref_bbox,
        "first_bbox": first_bbox,
        "last_bbox": last_bbox,
        "first_bbox_delta": first_delta,
        "last_bbox_delta": bbox_delta(last_bbox, ref_bbox),
        "status": "failed" if fail_reasons else "ok",
        "fail_reasons": fail_reasons,
    }


def update_motion_bank(path: Path, reports: list[dict]) -> None:
    if not path.exists():
        return
    data = json.loads(path.read_text())
    motions = data.get("motions", {})
    for r in reports:
        if r["motion_id"] in motions:
            motions[r["motion_id"]]["duration_sec"] = r["duration_sec"]
            motions[r["motion_id"]].setdefault("normalization", {})
            motions[r["motion_id"]]["normalization"].update({
                "status": r["status"],
                "trimmed_tail_frames": r["trimmed_tail_frames"],
                "crop_y": r["crop_y"],
            })
    path.write_text(json.dumps(data, indent=2) + "\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--raw-dir", type=Path, required=True)
    ap.add_argument("--out-dir", type=Path, required=True)
    ap.add_argument("--reference-alpha", type=Path, required=True)
    ap.add_argument("--motion-bank", type=Path)
    ap.add_argument("--width", type=int, default=896)
    ap.add_argument("--height", type=int, default=1200)
    ap.add_argument("--min-trim-tail-frames", type=int, default=3)
    ap.add_argument("--max-trim-tail-frames", type=int, default=24)
    ap.add_argument("--max-bbox-center-delta-px", type=float, default=90)
    ap.add_argument("--max-bbox-size-delta-px", type=float, default=180)
    args = ap.parse_args()

    face_app = None
    try:
        from insightface.app import FaceAnalysis
        face_app = FaceAnalysis(providers=["CPUExecutionProvider"])
        face_app.prepare(ctx_id=0, det_size=(640, 640))
    except ModuleNotFoundError:
        print("warning: insightface is not installed; continuing without face alignment")
    ref_mask = reference_mask(args.reference_alpha, args.width, args.height)
    ref_face_bbox = load_reference_face_bbox(args.reference_alpha, args.width, args.height, face_app)
    if face_app is not None and ref_face_bbox is None:
        raise RuntimeError(f"Could not detect reference face in {args.reference_alpha}")
    reports = []
    for src in sorted(args.raw_dir.glob("*_raw.mp4")):
        motion_id = src.name[:-8]
        # Keep short 3s version derived from type_laptop_raw separately below.
        if motion_id == "type_laptop":
            long_dst = args.out_dir / "type_laptop_long.mp4"
            r_long = normalize_one(src, long_dst, "type_laptop_long", ref_mask, ref_face_bbox, face_app, args)
            reports.append(r_long)
            short_dst = args.out_dir / "type_laptop.mp4"
            tmp_report = normalize_one(src, short_dst, "type_laptop", ref_mask, ref_face_bbox, face_app, args)
            # Cut first 3 seconds from normalized long, preserving no audio.
            subprocess.run([
                "ffmpeg", "-y", "-i", str(long_dst), "-t", "3.0", "-an",
                "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "veryfast", str(short_dst)
            ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            tmp_report["duration_sec"] = round(ffprobe_duration(short_dst), 3)
            tmp_report["output_frames"] = int(round(tmp_report["duration_sec"] * tmp_report["fps"]))
            tmp_report["trim_reason"] = "first_3_seconds_from_type_laptop_long"
            reports.append(tmp_report)
            continue
        dst = args.out_dir / f"{motion_id}.mp4"
        reports.append(normalize_one(src, dst, motion_id, ref_mask, ref_face_bbox, face_app, args))

    report_path = args.out_dir / "normalization_report.json"
    report_path.write_text(json.dumps({"reports": reports}, indent=2) + "\n")
    if args.motion_bank:
        update_motion_bank(args.motion_bank, reports)
    print(json.dumps({
        "clips": len(reports),
        "failed": [r["motion_id"] for r in reports if r["status"] != "ok"],
        "report": str(report_path),
    }, indent=2))


if __name__ == "__main__":
    main()
