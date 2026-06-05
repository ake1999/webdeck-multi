#!/usr/bin/env python3
"""One-slide media rendering for avatar-video jobs.

This is the first real renderer milestone: stitch renderer-side motion-bank clips,
apply Wav2Lip last, then export transparent WebM variants.
"""
from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any

from tools.avatar_video_renderer.transparency import probe_alpha, write_checkerboard_preview, write_connected_background_alpha_webm

IDLE_STYLE_CLIPS = {
    "thoughtful": "idle_thinking_at_desk",
    "engaged": "explaining",
    "calm": "idle_at_desk",
    "default": "idle_at_desk",
}


def run(cmd: list[str], cwd: Path | None = None) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, cwd=str(cwd) if cwd else None, check=True, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)


def resolve_path(project_root: Path, value: str) -> Path:
    path = Path(value)
    if not path.is_absolute():
        path = project_root / path
    return path


def local_assets(config: dict[str, Any]) -> dict[str, Any]:
    return config.get("local_assets", {})


def motion_bank_root(project_root: Path, config: dict[str, Any]) -> Path:
    root = local_assets(config).get("renderer_motion_bank_root", "tools/avatar_video_renderer/assets/motion_bank/instructor_05/normalized")
    return resolve_path(project_root, root)


def clip_path(project_root: Path, config: dict[str, Any], motion_id: str) -> Path:
    path = motion_bank_root(project_root, config) / f"{motion_id}.mp4"
    if not path.exists():
        raise FileNotFoundError(f"motion clip not found for {motion_id}: {path}")
    return path


def ffmpeg_escape(path: Path) -> str:
    return str(path).replace("'", "'\\''")


def make_segment(src: Path, dst: Path, duration: float, start: float = 0.0, loop: bool = False, fps: int = 24, size: tuple[int, int] = (896, 1200), config: dict[str, Any] | None = None) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    cmd = ["ffmpeg", "-y"]
    if loop:
        cmd += ["-stream_loop", "-1"]
    if start > 0:
        cmd += ["-ss", f"{start:.6f}"]
    cmd += ["-i", str(src), "-t", f"{duration:.6f}", "-an"]
    rendering = (config or {}).get("rendering", {})
    scale_factor = float(rendering.get("avatar_scale", 1.0))
    y_offset = int(rendering.get("avatar_y_offset_px", 0))
    bg = str(rendering.get("background_color", "0xf7f7f7")).replace("0x", "#")
    if scale_factor < 0.999:
        scaled_w = max(2, int(round(size[0] * scale_factor)) // 2 * 2)
        scaled_h = max(2, int(round(size[1] * scale_factor)) // 2 * 2)
        x = max(0, (size[0] - scaled_w) // 2)
        y = max(0, min(size[1] - scaled_h, y_offset))
        vf = f"fps={fps},scale={scaled_w}:{scaled_h}:flags=lanczos,pad={size[0]}:{size[1]}:{x}:{y}:color={bg},setpts=PTS-STARTPTS"
    else:
        vf = f"fps={fps},scale={size[0]}:{size[1]}:flags=lanczos,setpts=PTS-STARTPTS"
    cmd += [
        "-vf", vf,
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "veryfast",
        str(dst),
    ]
    run(cmd)


def build_visual(project_root: Path, config: dict[str, Any], job: dict[str, Any], slide: dict[str, Any], out_dir: Path) -> Path:
    fps = int(job.get("render", {}).get("fps", 24))
    width, height = job.get("render", {}).get("resolution", [896, 1200])
    target_duration = float(slide.get("duration_sec") or slide.get("speech", {}).get("audio_duration_sec") or 1.0)
    plan = sorted(slide.get("avatar", {}).get("motion_plan", []), key=lambda x: float(x.get("start_sec", 0)))
    tmp_dir = out_dir / "_tmp_render"
    if tmp_dir.exists():
        shutil.rmtree(tmp_dir)
    tmp_dir.mkdir(parents=True, exist_ok=True)

    segments: list[Path] = []
    cursor = 0.0
    segment_index = 1

    def add_idle(start: float, duration: float, style: str = "default") -> None:
        nonlocal segment_index
        if duration <= 0.04:
            return
        motion_id = IDLE_STYLE_CLIPS.get(style, IDLE_STYLE_CLIPS["default"])
        dst = tmp_dir / f"seg_{segment_index:03d}_{motion_id}.mp4"
        make_segment(clip_path(project_root, config, motion_id), dst, duration, loop=True, fps=fps, size=(width, height), config=config)
        segments.append(dst)
        segment_index += 1

    for item in plan:
        start = float(item.get("start_sec", cursor))
        if start > cursor + 0.04:
            add_idle(cursor, start - cursor)
            cursor = start

        if item.get("type") == "idle":
            duration_value = item.get("duration_sec", 0)
            if duration_value == "fill":
                next_starts = [float(x.get("start_sec", target_duration)) for x in plan if float(x.get("start_sec", 0)) > start]
                duration = (min(next_starts) if next_starts else target_duration) - start
            else:
                duration = float(duration_value)
            add_idle(start, min(duration, max(0.0, target_duration - start)), item.get("style", "default"))
            cursor = max(cursor, start + duration)
        elif item.get("type") == "motion_bank":
            motion_id = item["motion_id"]
            trim = item.get("trim") or {}
            trim_start = float(trim.get("start_sec", 0.0))
            if "end_sec" in trim:
                duration = float(trim["end_sec"]) - trim_start
            else:
                # Fall back to the bank metadata duration if the job did not trim.
                duration = float(item.get("duration_sec", target_duration - start))
            duration = min(duration, max(0.0, target_duration - start))
            if duration > 0.04:
                dst = tmp_dir / f"seg_{segment_index:03d}_{motion_id}.mp4"
                make_segment(clip_path(project_root, config, motion_id), dst, duration, start=trim_start, loop=False, fps=fps, size=(width, height), config=config)
                segments.append(dst)
                segment_index += 1
            cursor = max(cursor, start + duration)
        else:
            raise ValueError(f"Unsupported motion plan item: {item}")

    if cursor < target_duration - 0.04:
        add_idle(cursor, target_duration - cursor)

    list_path = tmp_dir / "concat.txt"
    list_path.write_text("".join(f"file '{ffmpeg_escape(p)}'\n" for p in segments), encoding="utf-8")
    visual = out_dir / "debug_visual_mp4.mp4"
    run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(list_path),
        "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "veryfast", str(visual)
    ])
    return visual



def probe_media_duration(path: Path, stream: str = "a:0") -> float:
    try:
        out = run([
            "ffprobe", "-v", "error", "-select_streams", stream,
            "-show_entries", "stream=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(path)
        ]).stdout.strip()
        return float(out) if out else 0.0
    except Exception:
        return 0.0


def prepare_audio_for_slide(audio: Path, target_duration: float, tmp_dir: Path, pad_to_duration: bool = False) -> tuple[Path, dict[str, Any]]:
    actual = probe_media_duration(audio, "a:0")
    prepared = tmp_dir / "slide_audio_padded.wav"
    info = {
        "source_audio": str(audio),
        "source_duration_sec": round(actual, 3),
        "target_duration_sec": round(target_duration, 3),
        "pad_to_duration_requested": bool(pad_to_duration),
        "padded": False,
    }
    if pad_to_duration and actual and actual < target_duration - 0.05:
        run([
            "ffmpeg", "-y", "-i", str(audio),
            "-af", "apad", "-t", f"{target_duration:.6f}",
            "-ar", "24000", "-ac", "1", str(prepared)
        ])
        info["padded"] = True
        info["prepared_audio"] = str(prepared)
        info["prepared_duration_sec"] = round(probe_media_duration(prepared, "a:0"), 3)
        return prepared, info
    info["prepared_audio"] = str(audio)
    info["prepared_duration_sec"] = round(actual, 3) if actual else None
    return audio, info

def run_wav2lip(project_root: Path, config: dict[str, Any], visual_mp4: Path, audio: Path, out_mp4: Path) -> str:
    assets = local_assets(config)
    wav2lip_root = resolve_path(project_root, assets.get("wav2lip_root", "/home/monjazeb/Projects/webdeck/tools/Wav2Lip"))
    checkpoint = resolve_path(project_root, assets.get("wav2lip_checkpoint", "/home/monjazeb/Projects/webdeck/tools/Wav2Lip/checkpoints/Wav2lip/wav2lip_gan.pth"))
    cmd = [
        sys.executable, "inference.py",
        "--checkpoint_path", str(checkpoint),
        "--face", str(visual_mp4),
        "--audio", str(audio),
        "--outfile", str(out_mp4),
        "--pads", "0", "10", "0", "0",
        "--nosmooth",
    ]
    result = run(cmd, cwd=wav2lip_root)
    return result.stdout


def export_alpha(config: dict[str, Any], source_mp4: Path, transparent_webm: Path, silent_webm: Path, preview_mp4: Path, width: int, height: int, fps: int, duration: float) -> dict[str, Any]:
    tcfg = config.get("transparency", {})
    alpha_method = tcfg.get("alpha_method", "connected_background")
    if alpha_method == "connected_background":
        ref_alpha = tcfg.get("reference_alpha")
        ref_alpha_path = resolve_path(Path.cwd(), ref_alpha) if ref_alpha else None
        write_connected_background_alpha_webm(source_mp4, transparent_webm, silent_webm, width, height, fps, crf=30, reference_alpha=ref_alpha_path)
    else:
        key_color = tcfg.get("key_color", "0xf7f7f7")
        similarity = float(tcfg.get("similarity", 0.18))
        blend = float(tcfg.get("blend", 0.08))
        vf = f"format=rgba,colorkey={key_color}:{similarity}:{blend},format=yuva420p"
        run([
            "ffmpeg", "-y", "-i", str(source_mp4),
            "-vf", vf,
            "-c:v", "libvpx-vp9", "-auto-alt-ref", "0", "-pix_fmt", "yuva420p",
            "-b:v", "0", "-crf", "30",
            "-c:a", "libopus", str(transparent_webm)
        ])
        run([
            "ffmpeg", "-y", "-i", str(source_mp4),
            "-vf", vf,
            "-c:v", "libvpx-vp9", "-auto-alt-ref", "0", "-pix_fmt", "yuva420p",
            "-b:v", "0", "-crf", "30",
            "-an", str(silent_webm)
        ])
    write_checkerboard_preview(transparent_webm, preview_mp4, width, height, fps, duration)
    return probe_alpha(transparent_webm)


def render_real_slide(project_root: Path, config: dict[str, Any], job: dict[str, Any], slide: dict[str, Any], outputs: dict[str, Path]) -> dict[str, Any]:
    out_dir = outputs["transparent_webm"].parent
    out_dir.mkdir(parents=True, exist_ok=True)
    audio = resolve_path(project_root, slide["speech"]["audio"])
    width, height = job.get("render", {}).get("resolution", [896, 1200])
    fps = int(job.get("render", {}).get("fps", 24))
    duration = float(slide.get("duration_sec") or slide.get("speech", {}).get("audio_duration_sec") or 1.0)

    visual = build_visual(project_root, config, job, slide, out_dir)
    tmp_dir = out_dir / "_tmp_render"
    pad_audio = bool(config.get("rendering", {}).get("pad_audio_to_slide_duration", False))
    prepared_audio, audio_info = prepare_audio_for_slide(audio, duration, tmp_dir, pad_to_duration=pad_audio)
    wav2lip_log = run_wav2lip(project_root, config, visual, prepared_audio, outputs["mp4_with_audio"])
    shutil.copyfile(outputs["mp4_with_audio"], outputs["debug_with_background"])
    alpha = export_alpha(
        config,
        outputs["mp4_with_audio"],
        outputs["transparent_webm"],
        outputs["silent_transparent_webm"],
        outputs["alpha_preview_checkerboard"],
        width,
        height,
        fps,
        duration,
    )
    return {
        "visual_mp4": str(visual),
        "audio": audio_info,
        "wav2lip_log_tail": "\n".join(wav2lip_log.strip().splitlines()[-80:]),
        "alpha_validation": alpha,
    }
