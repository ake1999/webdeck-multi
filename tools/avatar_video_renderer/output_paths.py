#!/usr/bin/env python3
"""Output path helpers for avatar-video jobs."""
from __future__ import annotations

from pathlib import Path
from typing import Any


def project_root_from_config(config: dict[str, Any]) -> Path:
    return Path(config.get("project_root", ".")).resolve()


def selector_parts(job: dict[str, Any]) -> tuple[str, str, str, str]:
    selector = job.get("selector", {})
    school = selector.get("school") or job.get("school") or "UNKNOWN"
    course = selector.get("course") or job.get("course_id") or "UNKNOWN_COURSE"
    session = selector.get("session") or job.get("session_id") or "UNKNOWN_SESSION"
    topic = selector.get("topic") or job.get("topic_id") or "UNKNOWN_TOPIC"
    return school, course, session, topic


def slide_output_dir(config: dict[str, Any], job: dict[str, Any], slide: dict[str, Any]) -> Path:
    root = project_root_from_config(config)
    school, course, session, topic = selector_parts(job)
    return root / config.get("outputs_root", "generated/outputs/avatar_video") / school / course / session / topic / slide["slide_id"]


def slide_status_path(config: dict[str, Any], job: dict[str, Any], slide: dict[str, Any]) -> Path:
    root = project_root_from_config(config)
    school, course, session, topic = selector_parts(job)
    return root / config.get("status_root", "generated/status/avatar_video") / school / course / session / topic / f"{slide['slide_id']}.json"


def expected_output_files(config: dict[str, Any], job: dict[str, Any], slide: dict[str, Any]) -> dict[str, Path]:
    out = slide_output_dir(config, job, slide)
    return {
        "transparent_webm": out / "transparent.webm",
        "silent_transparent_webm": out / "silent_transparent.webm",
        "alpha_preview_checkerboard": out / "alpha_preview_checkerboard.mp4",
        "debug_with_background": out / "debug_with_background.mp4",
        "mp4_with_audio": out / "mp4_with_audio.mp4",
        "render_status": out / "render_status.json",
    }
