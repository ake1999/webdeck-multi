#!/usr/bin/env python3
"""Validate and prepare outputs for one avatar-video topic job.

This is intentionally a thin adapter. It does not run ComfyUI, Wav2Lip, or any heavy
rendering yet. It validates the generated job contract and creates the output/status
paths the web player expects.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

if __package__ is None or __package__ == "":
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from tools.avatar_video_renderer.motion_bank_adapter import load_motion_bank
from tools.avatar_video_renderer.output_paths import expected_output_files, project_root_from_config, slide_output_dir, slide_status_path
from tools.avatar_video_renderer.status import base_slide_status, write_json
from tools.avatar_video_renderer.media_renderer import export_alpha, render_real_slide
from tools.avatar_video_renderer.transparency import probe_alpha, write_checkerboard_preview, write_placeholder_transparent_webm


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def default_config(project_root: Path) -> dict[str, Any]:
    return {
        "project_root": str(project_root),
        "motion_bank_file": "tools/avatar_video/motion_bank.v1.json",
        "outputs_root": "generated/outputs/avatar_video",
        "status_root": "generated/status/avatar_video",
        "transparency": {"required": True, "checkerboard_preview": True},
    }


def load_config(path: Path | None, project_root: Path) -> dict[str, Any]:
    config = default_config(project_root)
    if path:
        user_config = load_json(path)
        config.update(user_config)
        config.setdefault("project_root", str(project_root))
    return config


def resolve_project_path(project_root: Path, value: str | None) -> Path | None:
    if not value:
        return None
    path = Path(value)
    if not path.is_absolute():
        path = project_root / path
    return path


def validate_slide(project_root: Path, job: dict[str, Any], slide: dict[str, Any], motion_bank, slide_count: int) -> dict[str, Any]:
    errors: list[str] = []
    warnings: list[str] = []
    resolved_motion_ids: list[str] = []

    slide_id = slide.get("slide_id")
    if not slide_id:
        errors.append("missing slide_id")

    screenshot = resolve_project_path(project_root, slide.get("slide_assets", {}).get("screenshot"))
    audio = resolve_project_path(project_root, slide.get("speech", {}).get("audio"))
    if not screenshot or not screenshot.exists():
        errors.append(f"missing screenshot: {slide.get('slide_assets', {}).get('screenshot')}")
    if not audio or not audio.exists():
        errors.append(f"missing audio: {slide.get('speech', {}).get('audio')}")

    duration = slide.get("duration_sec") or slide.get("speech", {}).get("audio_duration_sec")
    if duration is None:
        warnings.append("missing duration_sec; renderer will need to infer from audio")
    elif float(duration) <= 0:
        errors.append(f"invalid duration_sec: {duration}")

    avatar = slide.get("avatar", {})
    for item in avatar.get("motion_plan", []):
        if item.get("type") == "motion_bank":
            motion_id = item.get("motion_id")
            placement = item.get("placement")
            resolved_motion_ids.append(str(motion_id))
            errors.extend(motion_bank.validate_motion_use(str(motion_id), placement, int(slide.get("slide_index", 0)), slide_count))
        elif item.get("type") == "idle":
            continue
        else:
            errors.append(f"unknown motion_plan item type: {item.get('type')}")

    for event in avatar.get("events", []):
        errors.extend(motion_bank.validate_event(event))

    return {
        "errors": errors,
        "warnings": warnings,
        "resolved_inputs": {
            "screenshot": str(screenshot) if screenshot else None,
            "audio": str(audio) if audio else None,
            "motion_ids": resolved_motion_ids,
        },
    }


def render_job(job_path: Path, config_path: Path | None = None, create_placeholder_slide: str | None = None, create_placeholder_first: bool = False, render_slide_id: str | None = None, alpha_only_slide_id: str | None = None) -> dict[str, Any]:
    project_root = Path.cwd().resolve()
    config = load_config(config_path, project_root)
    project_root = project_root_from_config(config)
    job = load_json(job_path if job_path.is_absolute() else project_root / job_path)
    motion_bank = load_motion_bank(project_root, job, config)

    if job.get("schema_version") != "webdeck.avatar_video_job.v1":
        raise ValueError(f"Unsupported job schema: {job.get('schema_version')}")

    slides = job.get("slides", [])
    summary = {
        "job": str(job_path),
        "job_id": job.get("job_id"),
        "slides": len(slides),
        "validated": 0,
        "blocked": 0,
        "warnings": 0,
        "placeholder_outputs": [],
        "rendered_outputs": [],
        "alpha_only_outputs": [],
        "status_files": [],
    }

    for i, slide in enumerate(slides):
        out_dir = slide_output_dir(config, job, slide)
        out_dir.mkdir(parents=True, exist_ok=True)
        status_path = slide_status_path(config, job, slide)
        outputs = expected_output_files(config, job, slide)
        validation = validate_slide(project_root, job, slide, motion_bank, len(slides))

        make_placeholder = False
        if create_placeholder_first and i == 0:
            make_placeholder = True
        if create_placeholder_slide and create_placeholder_slide == slide.get("slide_id"):
            make_placeholder = True

        alpha_validation = None
        real_render_result = None
        make_real_render = bool(render_slide_id and render_slide_id == slide.get("slide_id"))
        make_alpha_only = bool(alpha_only_slide_id and alpha_only_slide_id == slide.get("slide_id"))

        if make_placeholder and make_real_render:
            validation["warnings"].append("Both placeholder and real render requested; real render takes precedence.")
            make_placeholder = False
        if make_alpha_only and make_real_render:
            validation["warnings"].append("Both alpha-only and real render requested; real render takes precedence.")
            make_alpha_only = False
        if make_alpha_only and make_placeholder:
            validation["warnings"].append("Both alpha-only and placeholder requested; alpha-only takes precedence.")
            make_placeholder = False

        if make_real_render and not validation["errors"]:
            real_render_result = render_real_slide(project_root, config, job, slide, outputs)
            alpha_validation = real_render_result.get("alpha_validation")
            summary["rendered_outputs"].append(str(outputs["transparent_webm"]))

        if make_alpha_only and not validation["errors"]:
            source_mp4 = outputs["debug_with_background"]
            if not source_mp4.exists():
                source_mp4 = outputs["mp4_with_audio"]
            if not source_mp4.exists():
                validation["errors"].append(f"missing alpha-only source video: {outputs['debug_with_background']} or {outputs['mp4_with_audio']}")
            else:
                width, height = job.get("render", {}).get("resolution", [896, 1200])
                fps = int(job.get("render", {}).get("fps", 24))
                duration = float(slide.get("duration_sec") or slide.get("speech", {}).get("audio_duration_sec") or 1.0)
                alpha_validation = export_alpha(
                    config,
                    source_mp4,
                    outputs["transparent_webm"],
                    outputs["silent_transparent_webm"],
                    outputs["alpha_preview_checkerboard"],
                    width,
                    height,
                    fps,
                    duration,
                )
                real_render_result = {
                    "source_video": str(source_mp4),
                    "alpha_validation": alpha_validation,
                }
                summary["alpha_only_outputs"].append(str(outputs["transparent_webm"]))

        if make_placeholder and not validation["errors"]:
            duration = min(float(slide.get("duration_sec") or 1.0), 2.0)
            width, height = job.get("render", {}).get("resolution", [896, 1200])
            fps = int(job.get("render", {}).get("fps", 24))
            write_placeholder_transparent_webm(outputs["transparent_webm"], duration, width, height, fps, silent=True)
            write_placeholder_transparent_webm(outputs["silent_transparent_webm"], duration, width, height, fps, silent=True)
            try:
                write_checkerboard_preview(outputs["transparent_webm"], outputs["alpha_preview_checkerboard"], width, height, fps, duration)
            except Exception as exc:
                validation["warnings"].append(f"checkerboard preview failed: {exc}")
            alpha_validation = probe_alpha(outputs["transparent_webm"])
            summary["placeholder_outputs"].append(str(outputs["transparent_webm"]))

        status = base_slide_status(job, slide, outputs, validation)
        if make_real_render and not validation["errors"]:
            status["status"] = "rendered"
            status["stage"] = "real_one_slide_render"
            status["alpha_validation"] = alpha_validation
            status["render_engine"] = {
                "mode": "one_slide_motion_bank_wav2lip",
                "heavy_rendering_enabled": True
            }
            status["render_details"] = real_render_result
        elif make_alpha_only and not validation["errors"]:
            status["status"] = "alpha_exported"
            status["stage"] = "alpha_only_export"
            status["alpha_validation"] = alpha_validation
            status["render_engine"] = {
                "mode": "alpha_only",
                "heavy_rendering_enabled": False
            }
            status["render_details"] = real_render_result
        elif make_placeholder and not validation["errors"]:
            status["status"] = "placeholder_created"
            status["stage"] = "placeholder_alpha_output"
            status["alpha_validation"] = alpha_validation
        write_json(status_path, status)
        write_json(outputs["render_status"], status)

        if validation["errors"]:
            summary["blocked"] += 1
        else:
            summary["validated"] += 1
        summary["warnings"] += len(validation["warnings"])
        summary["status_files"].append(str(status_path))

    return summary


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--job", required=True, help="Path to one generated avatar-video topic job JSON.")
    parser.add_argument("--config", help="Optional renderer config JSON. Defaults are enough for validation.")
    parser.add_argument("--placeholder-first-slide", action="store_true", help="Create a tiny transparent placeholder WebM for the first valid slide.")
    parser.add_argument("--placeholder-slide-id", help="Create a tiny transparent placeholder WebM for this slide_id.")
    parser.add_argument("--render-slide-id", help="Render one real slide using motion-bank stitching + Wav2Lip + alpha export.")
    parser.add_argument("--alpha-only-slide-id", help="Re-export transparent outputs for this slide from an existing debug/background MP4.")
    args = parser.parse_args()

    summary = render_job(
        Path(args.job),
        Path(args.config) if args.config else None,
        create_placeholder_slide=args.placeholder_slide_id,
        create_placeholder_first=args.placeholder_first_slide,
        render_slide_id=args.render_slide_id,
        alpha_only_slide_id=args.alpha_only_slide_id,
    )
    print(json.dumps(summary, indent=2))
    if summary["blocked"]:
        raise SystemExit(2)


if __name__ == "__main__":
    main()
