#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable

JOB_STATUS_SCHEMA_VERSION = "phase4_5-job-status-v1"
TTS_JOB_SCHEMA_VERSION = "phase4_5-tts-job-v1"


class ContractError(RuntimeError):
    pass


@dataclass(frozen=True)
class ResolvedJob:
    job_path: Path
    status_path: Path
    audio_path: Path
    alignment_path: Path
    selector: dict[str, str]
    slide_id: str
    alignment_slide_id: str
    audio_contract_path: str
    alignment_contract_path: str
    status_contract_path: str
    job: dict[str, Any]


DEFAULT_CONFIG: dict[str, Any] = {
    "model_name": "Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice",
    "speaker": "Aiden",
    "language": "English",
    "device": "cuda:0",
    "dtype": "bfloat16",
    "jobs_root": "generated/jobs/tts",
    "outputs_audio_root": "generated/outputs/audio",
    "outputs_alignment_root": "generated/outputs/alignment",
    "status_root": "generated/status",
    "max_jobs": 0,
    "overwrite": False,
    "default_instruction": (
        "Speak clearly like an experienced robotics instructor. "
        "Keep the speech natural, clear, and easy to follow."
    ),
    "pause_between_segments_ms": 120,
    "log_level": "INFO",
    "worker_name": "qwen_tts_worker",
    "save_debug_segment_wavs": False,
    "test_output_root": "tools/qwen_tts_worker/test_outputs",
    "seed": 1234,
}


def normalize_contract_path(value: str | os.PathLike[str]) -> str:
    return str(value).replace("\\", "/").lstrip("./")


def stable_hash(payload: Any) -> str:
    blob = json.dumps(payload, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return hashlib.sha256(blob).hexdigest()[:16]


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def ensure_parent_dir(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def write_json_atomic(path: Path, payload: dict[str, Any]) -> None:
    ensure_parent_dir(path)
    temp_path = path.with_name(f".{path.name}.tmp")
    with temp_path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2)
        handle.write("\n")
    os.replace(temp_path, path)


def resolve_path(root: Path, value: str | os.PathLike[str]) -> Path:
    candidate = Path(value)
    if candidate.is_absolute():
        return candidate.resolve()
    return (root / candidate).resolve()


def resolve_repo_root(config_path: Path, raw_config: dict[str, Any]) -> Path:
    repo_root_value = raw_config.get("repo_root", ".")
    base_dir = config_path.resolve().parent
    return resolve_path(base_dir, repo_root_value)


def load_worker_config(config_path: str | os.PathLike[str]) -> dict[str, Any]:
    config_file = Path(config_path).resolve()
    raw = load_json(config_file)
    config = {**DEFAULT_CONFIG, **raw}
    repo_root = resolve_repo_root(config_file, raw)
    config["repo_root"] = str(repo_root)
    for key in (
        "jobs_root",
        "outputs_audio_root",
        "outputs_alignment_root",
        "status_root",
        "test_output_root",
    ):
        config[f"{key}_path"] = str(resolve_path(repo_root, config[key]))
    config["pause_between_segments_ms"] = int(config.get("pause_between_segments_ms", 120))
    config["max_jobs"] = int(config.get("max_jobs", 0))
    config["overwrite"] = bool(config.get("overwrite", False))
    config["speaker"] = str(config.get("speaker") or "Aiden")
    config["language"] = str(config.get("language") or "English")
    return config


def selector_key(selector: dict[str, Any]) -> tuple[str, str, str, str]:
    return (
        str(selector.get("school") or ""),
        str(selector.get("course") or ""),
        str(selector.get("session") or ""),
        str(selector.get("topic") or ""),
    )


def build_audio_contract_path(config: dict[str, Any], selector: dict[str, str], slide_id: str) -> str:
    root_name = normalize_contract_path(config["outputs_audio_root"])
    return "/".join([root_name, selector["school"], selector["course"], selector["session"], selector["topic"], f"{slide_id}.wav"])


def build_alignment_contract_path(config: dict[str, Any], selector: dict[str, str]) -> str:
    root_name = normalize_contract_path(config["outputs_alignment_root"])
    return "/".join([root_name, selector["school"], selector["course"], selector["session"], selector["topic"], "tts_alignment.json"])


def build_status_contract_path(config: dict[str, Any], selector: dict[str, str], slide_id: str) -> str:
    root_name = normalize_contract_path(config["status_root"])
    return "/".join(
        [
            root_name,
            selector["school"],
            selector["course"],
            selector["session"],
            selector["topic"],
            "tts",
            f"{slide_id}.job_status.json",
        ]
    )


def contract_to_absolute(repo_root: Path, contract_path: str) -> Path:
    return resolve_path(repo_root, contract_path)


def relative_contract_path(repo_root: Path, path: Path) -> str:
    return normalize_contract_path(path.resolve().relative_to(repo_root.resolve()))


def validate_required_job_fields(job: dict[str, Any]) -> None:
    if job.get("schema_version") != TTS_JOB_SCHEMA_VERSION:
        raise ContractError(
            f"Unsupported job schema_version {job.get('schema_version')!r}; expected {TTS_JOB_SCHEMA_VERSION}."
        )
    if job.get("kind") != "tts":
        raise ContractError(f"Job kind must be 'tts', got {job.get('kind')!r}.")
    for key in ("job_id", "topic_id", "slide_id", "audio_output_file", "alignment_output_file", "contract_hash"):
        if not str(job.get(key) or "").strip():
            raise ContractError(f"Missing required job field: {key}")
    segments = job.get("segments")
    if not isinstance(segments, list) or not segments:
        raise ContractError("TTS job must include a non-empty segments array.")


def resolve_job_contract(config: dict[str, Any], job_path_value: str | os.PathLike[str]) -> ResolvedJob:
    repo_root = Path(config["repo_root"]).resolve()
    job_path = resolve_path(repo_root, job_path_value)
    job = load_json(job_path)
    validate_required_job_fields(job)

    selector = job.get("selector")
    if not isinstance(selector, dict):
        raise ContractError("Job selector must be an object.")
    school, course, session, topic = selector_key(selector)
    if not all((school, course, session, topic)):
        raise ContractError("Job selector must include school/course/session/topic.")
    normalized_selector = {
        "school": school,
        "course": course,
        "session": session,
        "topic": topic,
    }
    slide_id = str(job["slide_id"])
    expected_job_path = Path(config["jobs_root_path"]) / school / course / session / topic / f"{slide_id}.json"
    if job_path.resolve() != expected_job_path.resolve():
        raise ContractError(
            f"Job path {job_path} does not match frozen contract path {expected_job_path}."
        )

    expected_audio_contract = build_audio_contract_path(config, normalized_selector, slide_id)
    expected_alignment_contract = build_alignment_contract_path(config, normalized_selector)
    expected_status_contract = build_status_contract_path(config, normalized_selector, slide_id)

    actual_audio_contract = normalize_contract_path(job["audio_output_file"])
    actual_alignment_contract = normalize_contract_path(job["alignment_output_file"])
    actual_output_contract = normalize_contract_path(job.get("output_file") or job["audio_output_file"])
    if actual_audio_contract != expected_audio_contract:
        raise ContractError(
            f"audio_output_file mismatch for {slide_id}: {actual_audio_contract} != {expected_audio_contract}"
        )
    if actual_alignment_contract != expected_alignment_contract:
        raise ContractError(
            "alignment_output_file mismatch for "
            f"{slide_id}: {actual_alignment_contract} != {expected_alignment_contract}"
        )
    if actual_output_contract != expected_audio_contract:
        raise ContractError(
            f"output_file mismatch for {slide_id}: {actual_output_contract} != {expected_audio_contract}"
        )
    secondary_files = [normalize_contract_path(item) for item in job.get("secondary_output_files") or []]
    if expected_alignment_contract not in secondary_files:
        raise ContractError(
            f"secondary_output_files must include alignment contract path {expected_alignment_contract!r}."
        )

    audio_path = contract_to_absolute(repo_root, expected_audio_contract)
    alignment_path = contract_to_absolute(repo_root, expected_alignment_contract)
    status_path = contract_to_absolute(repo_root, expected_status_contract)
    alignment_slide_id = str(job.get("alignment_slide_id") or slide_id)

    return ResolvedJob(
        job_path=job_path,
        status_path=status_path,
        audio_path=audio_path,
        alignment_path=alignment_path,
        selector=normalized_selector,
        slide_id=slide_id,
        alignment_slide_id=alignment_slide_id,
        audio_contract_path=expected_audio_contract,
        alignment_contract_path=expected_alignment_contract,
        status_contract_path=expected_status_contract,
        job=job,
    )


def selector_matches(selector: dict[str, str], filters: dict[str, str | None]) -> bool:
    for key, value in filters.items():
        if value and selector.get(key) != value:
            return False
    return True


def discover_job_files(
    config: dict[str, Any],
    filters: dict[str, str | None] | None = None,
    specific_job: str | os.PathLike[str] | None = None,
) -> list[Path]:
    repo_root = Path(config["repo_root"]).resolve()
    if specific_job:
        candidate = resolve_path(repo_root, specific_job)
        if not candidate.exists():
            raise FileNotFoundError(f"Job file not found: {candidate}")
        return [candidate]

    jobs_root = Path(config["jobs_root_path"]).resolve()
    files = sorted(jobs_root.rglob("*.json"))
    if not filters:
        return files

    selected: list[Path] = []
    for job_path in files:
        try:
            job = load_json(job_path)
            selector = job.get("selector") or {}
            normalized = {
                "school": str(selector.get("school") or ""),
                "course": str(selector.get("course") or ""),
                "session": str(selector.get("session") or ""),
                "topic": str(selector.get("topic") or ""),
            }
        except Exception:
            continue
        if selector_matches(normalized, filters):
            selected.append(job_path)
    return selected


def alignment_manifest_contains_slide(
    alignment_path: Path,
    slide_id: str,
    audio_contract_path: str,
) -> bool:
    if not alignment_path.exists():
        return False
    try:
        manifest = load_json(alignment_path)
    except Exception:
        return False
    for slide in manifest.get("slides") or []:
        if slide.get("slide_id") == slide_id and normalize_contract_path(slide.get("audio_file") or "") == audio_contract_path:
            return True
    return False


def merge_topic_alignment(
    alignment_path: Path,
    topic_id: str,
    provider_meta: dict[str, Any],
    slide_entry: dict[str, Any],
) -> dict[str, Any]:
    if alignment_path.exists():
        existing = load_json(alignment_path)
        if existing.get("topic_id") and existing.get("topic_id") != topic_id:
            raise ContractError(
                f"Alignment topic_id mismatch in {alignment_path}: {existing.get('topic_id')} != {topic_id}"
            )
        slides = [item for item in existing.get("slides") or [] if item.get("slide_id") != slide_entry.get("slide_id")]
    else:
        slides = []

    slides.append(slide_entry)
    slides.sort(key=lambda item: str(item.get("slide_id") or ""))
    merged = {
        "topic_id": topic_id,
        "provider": provider_meta,
        "slides": slides,
    }
    write_json_atomic(alignment_path, merged)
    return merged


def chunked(items: Iterable[Path], max_items: int) -> list[Path]:
    if max_items <= 0:
        return list(items)
    return list(items)[:max_items]
