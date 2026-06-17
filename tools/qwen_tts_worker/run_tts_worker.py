#!/usr/bin/env python3
from __future__ import annotations

import argparse
import logging
import sys
import traceback
from pathlib import Path
from typing import Any

from alignment_utils import build_provider_metadata, build_slide_alignment_entry
from audio_utils import assemble_slide_audio, write_wav_atomic
from contract_utils import (
    ContractError,
    ResolvedJob,
    alignment_manifest_contains_slide,
    chunked,
    discover_job_files,
    ensure_parent_dir,
    load_worker_config,
    merge_topic_alignment,
    resolve_job_contract,
    write_json_atomic,
)
from instruction_builder import build_instruction
from qwen_backend import QwenBackend
from status_utils import mark_done, mark_error, mark_running, read_status

LOGGER = logging.getLogger("qwen_tts_worker")


def configure_logging(level_name: str) -> None:
    level = getattr(logging, str(level_name or "INFO").upper(), logging.INFO)
    logging.basicConfig(
        level=level,
        format="%(asctime)s | %(levelname)s | %(message)s",
        datefmt="%H:%M:%S",
    )


def is_reusable_job(resolved_job: ResolvedJob, status: dict[str, Any] | None) -> bool:
    if not status:
        return False
    if status.get("state") != "done":
        return False
    if status.get("contract_hash") != resolved_job.job["contract_hash"]:
        return False
    if not resolved_job.audio_path.exists():
        return False
    if not resolved_job.alignment_path.exists():
        return False
    return alignment_manifest_contains_slide(
        resolved_job.alignment_path,
        resolved_job.alignment_slide_id,
        resolved_job.audio_contract_path,
    )


def _debug_segment_path(resolved_job: ResolvedJob, segment_id: str) -> Path:
    return resolved_job.audio_path.parent / f"{resolved_job.slide_id}__{segment_id}.debug.wav"


def process_job_file(
    config: dict[str, Any],
    job_path: str | Path,
    *,
    backend: QwenBackend | None = None,
    dry_run: bool = False,
    overwrite: bool = False,
) -> dict[str, Any]:
    resolved_job = resolve_job_contract(config, job_path)
    job = resolved_job.job
    status = read_status(resolved_job.status_path)
    reusable = is_reusable_job(resolved_job, status)

    if reusable and not overwrite:
        LOGGER.info("Skipping reusable job: %s", resolved_job.job_path)
        return {
            "job_id": job["job_id"],
            "state": "done",
            "reused": True,
            "job_path": str(resolved_job.job_path),
        }

    if dry_run:
        LOGGER.info(
            "Dry run: would process %s -> %s",
            resolved_job.job_path,
            resolved_job.audio_path,
        )
        return {
            "job_id": job["job_id"],
            "state": "pending",
            "reused": reusable,
            "job_path": str(resolved_job.job_path),
        }

    if backend is None:
        raise RuntimeError("A live backend instance is required for non-dry-run execution.")

    started_at = mark_running(resolved_job.status_path, job)
    try:
        segment_audio_items: list[dict[str, Any]] = []
        for segment in job["segments"]:
            instruction = build_instruction(segment, str(config.get("default_instruction") or ""))
            spoken_text = str(segment.get("tts_text") or segment.get("text") or "").strip()
            waveform, sample_rate, metadata = backend.synthesize_segment(
                text=spoken_text,
                instruction=instruction,
            )
            segment_audio_items.append(
                {
                    "segment": segment,
                    "waveform": waveform,
                    "sample_rate": sample_rate,
                    "words": metadata.get("words") or [],
                    "instruction": instruction,
                }
            )

        waveform, sample_rate, segment_artifacts = assemble_slide_audio(
            segment_audio_items,
            pause_between_segments_ms=int(config.get("pause_between_segments_ms", 120)),
        )

        ensure_parent_dir(resolved_job.audio_path)
        write_wav_atomic(resolved_job.audio_path, waveform, sample_rate)

        if config.get("save_debug_segment_wavs"):
            from audio_utils import write_wav_atomic as write_debug_wav

            for item in segment_audio_items:
                debug_path = _debug_segment_path(resolved_job, item["segment"]["segment_id"])
                write_debug_wav(debug_path, item["waveform"], item["sample_rate"])

        provider_meta = build_provider_metadata(job, config)
        slide_alignment = build_slide_alignment_entry(
            job,
            segment_artifacts,
            sample_rate_hz=sample_rate,
            speaker=str(config.get("speaker") or "Aiden"),
            language=str(config.get("language") or "English"),
        )
        merge_topic_alignment(
            resolved_job.alignment_path,
            str(job["topic_id"]),
            provider_meta,
            slide_alignment,
        )

        mark_done(resolved_job.status_path, job, reused=False, started_at=started_at)
        LOGGER.info("Done: %s", resolved_job.job_path)
        return {
            "job_id": job["job_id"],
            "state": "done",
            "reused": False,
            "audio_path": str(resolved_job.audio_path),
            "alignment_path": str(resolved_job.alignment_path),
        }
    except Exception as exc:
        error_text = f"{exc.__class__.__name__}: {exc}"
        mark_error(resolved_job.status_path, job, error_text, started_at=started_at)
        LOGGER.error("Failed job %s: %s", resolved_job.job_path, error_text)
        LOGGER.debug("%s", traceback.format_exc())
        return {
            "job_id": job["job_id"],
            "state": "error",
            "error": error_text,
            "job_path": str(resolved_job.job_path),
        }


def build_argument_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Batch Qwen CustomVoice TTS worker for frozen lecture jobs.")
    parser.add_argument("--config", required=True, help="Path to worker config JSON.")
    parser.add_argument("--school")
    parser.add_argument("--course")
    parser.add_argument("--session")
    parser.add_argument("--topic")
    parser.add_argument("--job", help="Process one explicit TTS job JSON path.")
    parser.add_argument("--dry-run", action="store_true", help="Report actions without writing outputs or statuses.")
    parser.add_argument("--overwrite", action="store_true", help="Regenerate outputs even when a matching done status already exists.")
    parser.add_argument("--max-jobs", type=int, default=None, help="Limit the number of jobs processed. 0 means unlimited.")
    parser.add_argument("--log-level", default=None, help="Override configured log level.")
    return parser


def run_worker(args: argparse.Namespace) -> int:
    config = load_worker_config(args.config)
    if args.log_level:
        config["log_level"] = args.log_level
    if args.max_jobs is not None:
        config["max_jobs"] = int(args.max_jobs)
    if args.overwrite:
        config["overwrite"] = True

    configure_logging(str(config.get("log_level") or "INFO"))
    filters = {
        "school": args.school,
        "course": args.course,
        "session": args.session,
        "topic": args.topic,
    }
    job_files = discover_job_files(config, filters=filters, specific_job=args.job)
    job_files = chunked(job_files, int(config.get("max_jobs", 0)))
    LOGGER.info("Discovered %d TTS job(s).", len(job_files))

    if not job_files:
        LOGGER.warning("No matching TTS jobs were found.")
        return 0

    backend = None
    if not args.dry_run:
        LOGGER.info("Running model preflight for Qwen CustomVoice.")
        backend = QwenBackend(config)
        backend.preflight()

    failures = 0
    processed = 0
    reused = 0
    for job_path in job_files:
        result = process_job_file(
            config,
            job_path,
            backend=backend,
            dry_run=args.dry_run,
            overwrite=bool(config.get("overwrite", False)),
        )
        processed += 1
        if result.get("reused"):
            reused += 1
        if result.get("state") == "error":
            failures += 1

    LOGGER.info(
        "Finished worker run. processed=%d reused=%d failures=%d dry_run=%s",
        processed,
        reused,
        failures,
        args.dry_run,
    )
    return 1 if failures else 0


def main(argv: list[str] | None = None) -> int:
    parser = build_argument_parser()
    args = parser.parse_args(argv)
    try:
        return run_worker(args)
    except (ContractError, FileNotFoundError, ValueError) as exc:
        configure_logging("INFO")
        LOGGER.error("Worker startup failed: %s", exc)
        LOGGER.debug("%s", traceback.format_exc())
        return 1
    except Exception as exc:
        configure_logging("INFO")
        LOGGER.error("Fatal worker failure: %s: %s", exc.__class__.__name__, exc)
        LOGGER.debug("%s", traceback.format_exc())
        return 1


if __name__ == "__main__":
    sys.exit(main())
