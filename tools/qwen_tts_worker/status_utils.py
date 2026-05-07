#!/usr/bin/env python3
from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from contract_utils import JOB_STATUS_SCHEMA_VERSION, load_json, write_json_atomic

ALLOWED_STATES = {"pending", "running", "done", "error"}


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def read_status(path: Path) -> dict[str, Any] | None:
    if not path.exists():
        return None
    try:
        return load_json(path)
    except Exception:
        return None


def write_status(path: Path, payload: dict[str, Any]) -> None:
    state = payload.get("state")
    if state not in ALLOWED_STATES:
        raise ValueError(f"Invalid status state: {state}")
    write_json_atomic(path, payload)


def build_status_payload(
    *,
    job: dict[str, Any],
    state: str,
    reused: bool,
    output_file: str,
    secondary_output_files: list[str],
    started_at: str | None = None,
    error: str | None = None,
) -> dict[str, Any]:
    if state not in ALLOWED_STATES:
        raise ValueError(f"Invalid status state: {state}")
    payload: dict[str, Any] = {
        "schema_version": JOB_STATUS_SCHEMA_VERSION,
        "job_id": job["job_id"],
        "kind": "tts",
        "state": state,
        "contract_hash": job["contract_hash"],
        "output_file": output_file,
        "secondary_output_files": list(secondary_output_files),
        "reused": bool(reused),
        "updated_at": now_iso(),
    }
    if started_at:
        payload["started_at"] = started_at
    if error:
        payload["error"] = error
    return payload


def mark_running(path: Path, job: dict[str, Any]) -> str:
    started_at = now_iso()
    payload = build_status_payload(
        job=job,
        state="running",
        reused=False,
        output_file=job.get("output_file") or job["audio_output_file"],
        secondary_output_files=list(job.get("secondary_output_files") or [job["alignment_output_file"]]),
        started_at=started_at,
    )
    write_status(path, payload)
    return started_at


def mark_done(path: Path, job: dict[str, Any], *, reused: bool, started_at: str | None = None) -> None:
    payload = build_status_payload(
        job=job,
        state="done",
        reused=reused,
        output_file=job.get("output_file") or job["audio_output_file"],
        secondary_output_files=list(job.get("secondary_output_files") or [job["alignment_output_file"]]),
        started_at=started_at,
    )
    write_status(path, payload)


def mark_error(path: Path, job: dict[str, Any], error: str, *, started_at: str | None = None) -> None:
    payload = build_status_payload(
        job=job,
        state="error",
        reused=False,
        output_file=job.get("output_file") or job["audio_output_file"],
        secondary_output_files=list(job.get("secondary_output_files") or [job["alignment_output_file"]]),
        started_at=started_at,
        error=error,
    )
    write_status(path, payload)
