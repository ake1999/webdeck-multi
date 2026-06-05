#!/usr/bin/env python3
"""Validate and prepare outputs for an avatar-video batch job."""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

if __package__ is None or __package__ == "":
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from tools.avatar_video_renderer.render_avatar_video_job import render_job
from tools.avatar_video_renderer.status import utc_now, write_json


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--job", required=True, help="Path to generated avatar-video batch job JSON.")
    parser.add_argument("--config", help="Optional renderer config JSON.")
    parser.add_argument("--placeholder-first-slide", action="store_true", help="Create one placeholder transparent WebM for the first slide of the first job only.")
    args = parser.parse_args()

    project_root = Path.cwd().resolve()
    batch_path = Path(args.job)
    if not batch_path.is_absolute():
        batch_path = project_root / batch_path
    batch = load_json(batch_path)
    if batch.get("schema_version") != "webdeck.avatar_batch_job.v1":
        raise ValueError(f"Unsupported batch schema: {batch.get('schema_version')}")

    summaries = []
    total = {"jobs": 0, "slides": 0, "validated": 0, "blocked": 0, "warnings": 0, "placeholder_outputs": []}
    for index, job_ref in enumerate(batch.get("jobs", [])):
        summary = render_job(
            Path(job_ref),
            Path(args.config) if args.config else None,
            create_placeholder_first=args.placeholder_first_slide and index == 0,
        )
        summaries.append(summary)
        total["jobs"] += 1
        total["slides"] += summary["slides"]
        total["validated"] += summary["validated"]
        total["blocked"] += summary["blocked"]
        total["warnings"] += summary["warnings"]
        total["placeholder_outputs"].extend(summary["placeholder_outputs"])

    status = {
        "schema_version": "webdeck.avatar_batch_render_status.v1",
        "updated_at": utc_now(),
        "batch_id": batch.get("batch_id"),
        "render_mode": batch.get("render_mode"),
        "summary": total,
        "jobs": summaries,
    }
    out = project_root / "generated" / "status" / "avatar_video" / "batches" / f"{batch.get('batch_id', batch_path.stem)}.json"
    write_json(out, status)
    print(json.dumps(status, indent=2))
    if total["blocked"]:
        raise SystemExit(2)


if __name__ == "__main__":
    main()
