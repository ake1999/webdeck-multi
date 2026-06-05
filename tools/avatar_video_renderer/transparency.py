#!/usr/bin/env python3
"""Transparency helpers for placeholder output and later alpha validation."""
from __future__ import annotations

import subprocess
from pathlib import Path
from typing import Any


def run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, check=True, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)


def write_placeholder_transparent_webm(path: Path, duration_sec: float = 1.0, width: int = 896, height: int = 1200, fps: int = 24, silent: bool = True) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    duration = max(0.1, float(duration_sec))
    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", f"nullsrc=s={width}x{height}:r={fps}:d={duration}",
        "-vf", "format=yuva420p,colorchannelmixer=aa=0",
        "-c:v", "libvpx-vp9", "-auto-alt-ref", "0", "-pix_fmt", "yuva420p",
        "-b:v", "0", "-crf", "35",
    ]
    if silent:
        cmd += ["-an"]
    cmd.append(str(path))
    run(cmd)


def write_checkerboard_preview(alpha_webm: Path, preview_mp4: Path, width: int = 896, height: int = 1200, fps: int = 24, duration_sec: float = 1.0) -> None:
    preview_mp4.parent.mkdir(parents=True, exist_ok=True)
    duration = max(0.1, float(duration_sec))
    checker = (
        f"nullsrc=s={width}x{height}:r={fps}:d={duration},"
        "geq=lum='if(eq(mod(floor(X/64)+floor(Y/64),2),0),119,189)':cb=128:cr=128,"
        "format=yuv420p[bg];"
        f"[bg][0:v]overlay=0:0:format=auto"
    )
    run([
        "ffmpeg", "-y", "-c:v", "libvpx-vp9", "-i", str(alpha_webm),
        "-filter_complex", checker,
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-an", str(preview_mp4)
    ])


def read_alpha_plane_stats(path: Path) -> dict[str, Any]:
    result = subprocess.run([
        "ffmpeg", "-v", "error", "-c:v", "libvpx-vp9", "-i", str(path),
        "-vf", "alphaextract", "-frames:v", "1",
        "-f", "rawvideo", "-pix_fmt", "gray", "-"
    ], check=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode != 0 or not result.stdout:
        return {
            "alpha_extract_ok": False,
            "alpha_extract_error": result.stderr.decode("utf-8", errors="replace").strip(),
        }

    alpha = result.stdout
    alpha_min = min(alpha)
    alpha_max = max(alpha)
    alpha_mean = sum(alpha) / len(alpha)
    return {
        "alpha_extract_ok": True,
        "alpha_min": alpha_min,
        "alpha_max": alpha_max,
        "alpha_mean": round(alpha_mean, 3),
        "alpha_has_transparent_pixels": alpha_min < 255,
        "alpha_has_visible_pixels": alpha_max > 0,
    }


def probe_alpha(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"exists": False, "has_alpha_metadata": False, "pix_fmt": None, "alpha_extract_ok": False}
    metadata = run([
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=pix_fmt:stream_tags=alpha_mode",
        "-of", "json", str(path)
    ]).stdout
    import json
    data = json.loads(metadata)
    stream = (data.get("streams") or [{}])[0]
    pix_fmt = stream.get("pix_fmt")
    tags = stream.get("tags") or {}
    alpha_mode = tags.get("alpha_mode") or tags.get("ALPHA_MODE")
    alpha_stats = read_alpha_plane_stats(path)
    return {
        "exists": True,
        "pix_fmt": pix_fmt,
        "alpha_mode": alpha_mode,
        "has_alpha_metadata": alpha_mode == "1" or (pix_fmt and "a" in pix_fmt),
        **alpha_stats,
    }


def write_connected_background_alpha_webm(source_mp4: Path, transparent_webm: Path, silent_webm: Path, width: int = 896, height: int = 1200, fps: int = 24, crf: int = 30, reference_alpha: Path | None = None) -> None:
    """Create VP9 alpha WebM by removing only border-connected near-white background.

    This avoids the main failure mode of colorkey: removing white/bright skin or shirt
    areas that are inside the character instead of connected to the outer background.
    """
    import cv2
    import numpy as np
    from PIL import Image

    transparent_webm.parent.mkdir(parents=True, exist_ok=True)
    silent_webm.parent.mkdir(parents=True, exist_ok=True)

    reference_mask = None
    reference_bg_mask = None
    if reference_alpha and reference_alpha.exists():
        ref = Image.open(reference_alpha).convert("RGBA").resize((width, height), Image.LANCZOS)
        ref_a = np.array(ref)[:, :, 3]
        # Sure foreground: protect bright shirt/skin/face, but avoid treating very
        # soft reference edges as hard foreground.
        reference_mask = (ref_a > 96).astype(np.uint8)
        ref_kernel = np.ones((11, 11), np.uint8)
        reference_mask = cv2.dilate(reference_mask, ref_kernel, iterations=1).astype(bool)

        # Sure background: use only reference-transparent regions connected to
        # the image border. Internal transparent holes can be laptop/screen holes
        # in the reference matte, so they must not seed background removal.
        ref_bg = (ref_a <= 8).astype(np.uint8)
        ref_bg = cv2.erode(ref_bg, kernel=np.ones((3, 3), np.uint8), iterations=1)
        ref_labels_count, ref_labels = cv2.connectedComponents(ref_bg, connectivity=8)
        ref_border_labels = set()
        ref_border_labels.update(np.unique(ref_labels[0, :]).tolist())
        ref_border_labels.update(np.unique(ref_labels[-1, :]).tolist())
        ref_border_labels.update(np.unique(ref_labels[:, 0]).tolist())
        ref_border_labels.update(np.unique(ref_labels[:, -1]).tolist())
        ref_border_labels.discard(0)
        reference_bg_mask = np.isin(ref_labels, list(ref_border_labels)) if ref_border_labels else np.zeros(ref_labels.shape, dtype=bool)

    cap = cv2.VideoCapture(str(source_mp4))
    actual_fps = cap.get(cv2.CAP_PROP_FPS) or fps
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    if frame_count <= 0:
        raise RuntimeError(f"No frames found in {source_mp4}")

    ff = subprocess.Popen([
        "ffmpeg", "-y",
        "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{width}x{height}", "-r", f"{actual_fps:.6f}", "-i", "-",
        "-c:v", "libvpx-vp9", "-auto-alt-ref", "0", "-pix_fmt", "yuva420p",
        "-metadata:s:v:0", "alpha_mode=1",
        # Lossless avoids VP9 alpha ringing that can reintroduce isolated
        # 1-pixel opaque white dots after an otherwise clean matte.
        "-lossless", "1", "-b:v", "0", "-crf", "0", "-an", str(silent_webm)
    ], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    kernel = np.ones((3, 3), np.uint8)
    prev_bg = None
    while True:
        ok, bgr = cap.read()
        if not ok:
            break
        if bgr.shape[1] != width or bgr.shape[0] != height:
            bgr = cv2.resize(bgr, (width, height), interpolation=cv2.INTER_LANCZOS4)

        hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
        h, s, v = cv2.split(hsv)
        # Near-white / low saturation candidate background. This is intentionally
        # wider than a simple chroma key. Edge/previous-bg connectivity and the
        # reference alpha protect bright internal character pixels such as shirt
        # and skin.
        white_candidate = (v >= 198) & (s <= 95)

        # The generated backgrounds are plain but not exactly white. Estimate the
        # current background color from the top corners and include pixels close
        # to that color. This removes off-white borders without keying the white
        # shirt, because the reference alpha blocks internal foreground removal.
        corner = max(24, min(width, height) // 14)
        bg_samples = np.concatenate([
            bgr[:corner, :corner].reshape(-1, 3),
            bgr[:corner, width - corner:width].reshape(-1, 3),
        ], axis=0)
        bg_color = np.median(bg_samples, axis=0)
        color_diff = np.linalg.norm(bgr.astype(np.float32) - bg_color.astype(np.float32), axis=2)
        color_candidate = (color_diff <= 58.0) & (v >= 150) & (s <= 135)

        candidate = (white_candidate | color_candidate).astype(np.uint8)
        candidate = cv2.morphologyEx(candidate, cv2.MORPH_CLOSE, kernel, iterations=1)

        labels_count, labels = cv2.connectedComponents(candidate, connectivity=8)
        seed = np.zeros(labels.shape, dtype=bool)
        seed[0, :] = True
        seed[-1, :] = True
        seed[:, 0] = True
        seed[:, -1] = True
        if prev_bg is not None:
            seed |= cv2.dilate(prev_bg.astype(np.uint8), kernel, iterations=1).astype(bool)
        if reference_bg_mask is not None:
            seed |= reference_bg_mask

        seed_labels = set(np.unique(labels[seed & (candidate > 0)]).tolist())
        seed_labels.discard(0)
        bg = np.isin(labels, list(seed_labels)) if seed_labels else np.zeros(labels.shape, dtype=bool)

        dynamic_reference_mask = None
        if reference_mask is not None:
            # The reference alpha is only a foreground prior, not a permanent
            # matte. If the character moves away from a reference pixel and that
            # pixel now matches the current background, it must become
            # transparent. Otherwise a white "old pose" ghost stays behind the
            # moving avatar.
            current_sure_bg = (color_diff <= 18.0) & (v >= 170) & (s <= 70)
            dynamic_reference_mask = reference_mask & (~current_sure_bg)
            bg = bg & (~dynamic_reference_mask)
        else:
            # Fallback protection if no reference alpha exists.
            protect = np.zeros(labels.shape, dtype=np.uint8)
            cx = width // 2
            cv2.ellipse(protect, (cx, int(height * 0.56)), (int(width * 0.43), int(height * 0.56)), 0, 0, 360, 1, -1)
            protect[int(height * 0.30):height, int(width * 0.18):int(width * 0.82)] = 1
            bg = bg & (protect == 0)

        bg = cv2.dilate(bg.astype(np.uint8), kernel, iterations=1).astype(bool)
        alpha = np.where(bg, 0, 255).astype(np.uint8)

        if dynamic_reference_mask is not None:
            # Restore only the current-frame foreground prior after background
            # dilation. Do not restore the whole static reference pose.
            alpha[dynamic_reference_mask] = 255

        alpha = cv2.GaussianBlur(alpha, (5, 5), 0)
        if dynamic_reference_mask is not None:
            alpha[dynamic_reference_mask] = 255

        # Remove tiny opaque speckles left by compression noise or disconnected
        # white fragments. Do this after blur, and keep the dynamic foreground
        # prior protected so small real details are not punched out.
        visible = (alpha > 0).astype(np.uint8)
        comp_count, comp_labels, comp_stats, _ = cv2.connectedComponentsWithStats(visible, connectivity=8)
        speckle_mask = np.zeros(alpha.shape, dtype=bool)
        for comp_id in range(1, comp_count):
            area = int(comp_stats[comp_id, cv2.CC_STAT_AREA])
            if area > 96:
                continue
            comp = comp_labels == comp_id
            # Small real details are usually colored/dark. The leftover artifacts
            # are tiny white or low-saturation background-colored islands, so
            # remove those even when the broad reference prior includes them.
            comp_is_white = bool(np.mean(v[comp]) >= 185 and np.mean(s[comp]) <= 120)
            if area <= 24 or comp_is_white:
                speckle_mask |= comp
        if dynamic_reference_mask is not None:
            # Protect non-white small details, but allow white background specks
            # inside the reference prior to disappear.
            protected_nonwhite = dynamic_reference_mask & ~((v >= 185) & (s <= 120))
            speckle_mask &= ~protected_nonwhite
        alpha[speckle_mask] = 0

        # Some speckles are connected to the main foreground only by very faint
        # alpha after blur. Repeat cleanup at practical visibility thresholds so
        # tiny high-alpha islands cannot remain as white dots.
        for cleanup_threshold in (24, 64, 128):
            visible_t = (alpha > cleanup_threshold).astype(np.uint8)
            comp_count_t, comp_labels_t, comp_stats_t, _ = cv2.connectedComponentsWithStats(visible_t, connectivity=8)
            threshold_speckles = np.zeros(alpha.shape, dtype=bool)
            for comp_id in range(1, comp_count_t):
                area = int(comp_stats_t[comp_id, cv2.CC_STAT_AREA])
                if area <= 96:
                    threshold_speckles |= comp_labels_t == comp_id
            if dynamic_reference_mask is not None:
                protected_nonwhite = dynamic_reference_mask & ~((v >= 185) & (s <= 120))
                threshold_speckles &= ~protected_nonwhite
            alpha[threshold_speckles] = 0

        # Edge de-fringing: white/off-white pixels immediately touching
        # transparent regions are usually background contamination, not character
        # detail. Use 7x7 because it gave the cleanest edge, but protect pixels
        # clearly inside the reference foreground core so bright clothing is less
        # likely to be cut away.
        transparent_near = cv2.dilate((alpha < 28).astype(np.uint8), np.ones((7, 7), np.uint8), iterations=1).astype(bool)
        near_white_edge = transparent_near & (((v >= 176) & (s <= 132)) | (color_diff <= 47.0))
        if dynamic_reference_mask is not None:
            foreground_core = cv2.erode(dynamic_reference_mask.astype(np.uint8), np.ones((7, 7), np.uint8), iterations=1).astype(bool)
            near_white_edge &= ~foreground_core
            near_white_edge &= ~((dynamic_reference_mask) & ~((v >= 180) & (s <= 125)))
        alpha[near_white_edge] = 0

        # Decontaminate semi-transparent edge color. If any soft edge remains,
        # copy color from nearby opaque foreground instead of leaving the old
        # white background RGB in place. This matters for players/codecs that
        # interpolate RGB before compositing alpha.
        rgba = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGBA)
        semi_edge = (alpha > 0) & (alpha < 245)
        if np.any(semi_edge):
            opaque_fg = (alpha > 245).astype(np.uint8)
            if np.any(opaque_fg):
                dist, nearest = cv2.distanceTransformWithLabels(1 - opaque_fg, cv2.DIST_L2, 3, labelType=cv2.DIST_LABEL_PIXEL)
                ys, xs = np.where(opaque_fg > 0)
                # OpenCV labels are 1-based indices into the foreground pixel list.
                nearest_idx = np.maximum(nearest[semi_edge] - 1, 0)
                nearest_idx = np.minimum(nearest_idx, len(xs) - 1)
                rgba[semi_edge, :3] = rgba[ys[nearest_idx], xs[nearest_idx], :3]

        # Temporal continuity: if a white region was transparent on the previous
        # frame, allow the background region to continue through it on the next
        # frame. Stable opaque white regions stay opaque unless they connect to
        # the outside background.
        prev_bg = alpha < 24

        rgba[:, :, 3] = alpha
        ff.stdin.write(rgba.tobytes())

    cap.release()
    ff.stdin.close()
    ff.stdin = None
    stdout, stderr = ff.communicate()
    if ff.returncode != 0:
        raise RuntimeError(stderr.decode("utf-8", errors="replace"))

    # Mux audio onto a copy while preserving VP9 alpha video.
    subprocess.run([
        "ffmpeg", "-y", "-i", str(silent_webm), "-i", str(source_mp4),
        "-map", "0:v:0", "-map", "1:a:0?", "-c:v", "copy", "-metadata:s:v:0", "alpha_mode=1", "-c:a", "libopus", "-shortest", str(transparent_webm)
    ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
