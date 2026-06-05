#!/usr/bin/env python3
"""Status file helpers for avatar-video rendering."""
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def write_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

def base_slide_status(job: dict[str, Any], slide: dict[str, Any], outputs: dict[str, Path], validation: dict[str, Any]) -> dict[str, Any]:
    return {
        "schema_version": "webdeck.avatar_render_status.v1",
        "updated_at": utc_now(),
        "job_id": job.get("job_id"),
        "course_id": job.get("course_id"),
        "session_id": job.get("session_id"),
        "topic_id": job.get("topic_id"),
        "slide_id": slide.get("slide_id"),
        "slide_index": slide.get("slide_index"),
        "status": "validated" if not validation["errors"] else "blocked",
        "stage": "contract_validation",
        "validation": validation,
        "outputs": {k: str(v) for k, v in outputs.items()},
        "render_engine": {
            "mode": "thin_adapter",
            "heavy_rendering_enabled": False
        }
    }
