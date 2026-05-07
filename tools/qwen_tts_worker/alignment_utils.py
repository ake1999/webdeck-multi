#!/usr/bin/env python3
from __future__ import annotations

from typing import Any

from contract_utils import stable_hash


def round_time(value: float, digits: int = 3) -> float:
    return round(float(value or 0.0), digits)


def round_duration(value: float) -> float:
    return round(float(value or 0.0), 6)


def estimate_word_timings(text: str, t0: float, t1: float) -> list[dict[str, float | str]]:
    tokens = [token.strip() for token in str(text or "").split() if token.strip()]
    if not tokens:
        return []
    weights = [max(sum(ch.isalnum() for ch in token), 1) for token in tokens]
    total_weight = sum(weights) or 1
    cursor = float(t0)
    words: list[dict[str, float | str]] = []
    total_span = float(t1) - float(t0)
    for index, token in enumerate(tokens):
        span = total_span * (weights[index] / total_weight)
        start = round_time(cursor)
        end = round_time(cursor + span)
        words.append({"word": token, "t0": start, "t1": end})
        cursor += span
    if words:
        words[-1]["t1"] = round_time(t1)
    return words


def build_provider_metadata(job: dict[str, Any], config: dict[str, Any]) -> dict[str, Any]:
    requested_provider = str((job.get("provider") or {}).get("requested_provider") or "qwen3_tts")
    config_hash = stable_hash(
        {
            "worker_name": config.get("worker_name"),
            "model_name": config.get("model_name"),
            "speaker": config.get("speaker"),
            "language": config.get("language"),
            "dtype": config.get("dtype"),
            "pause_between_segments_ms": config.get("pause_between_segments_ms"),
            "default_instruction": config.get("default_instruction"),
        }
    )
    return {
        "id": "qwen3_tts_customvoice_worker",
        "label": "Qwen3-TTS CustomVoice Worker",
        "supports_word_timings": False,
        "requested_provider": requested_provider,
        "mode": "custom_voice",
        "config_hash": config_hash,
        "actual_providers": ["qwen3_tts_customvoice_worker"],
        "warnings": [],
    }


def build_slide_alignment_entry(
    job: dict[str, Any],
    segment_artifacts: list[dict[str, Any]],
    *,
    sample_rate_hz: int,
    speaker: str,
    language: str,
) -> dict[str, Any]:
    segments: list[dict[str, Any]] = []
    cursor = 0.0
    for artifact in segment_artifacts:
        segment = artifact["segment"]
        t0 = round_time(cursor)
        cursor += float(artifact["duration"])
        t1 = round_time(cursor)
        native_words = artifact.get("words") or []
        if native_words:
            words = [
                {
                    "word": str(word["word"]),
                    "t0": round_time(float(word["t0"])),
                    "t1": round_time(float(word["t1"])),
                }
                for word in native_words
            ]
            quality = "word"
        else:
            words = estimate_word_timings(segment.get("text") or "", t0, t1)
            quality = "estimated_word" if words else "segment_only"
        item: dict[str, Any] = {
            "segment_id": segment["segment_id"],
            "t0": t0,
            "t1": t1,
            "alignment_quality": quality,
        }
        if words:
            item["words"] = words
        segments.append(item)

    return {
        "slide_id": str(job.get("alignment_slide_id") or job["slide_id"]),
        "audio_file": str(job["audio_output_file"]),
        "duration": round_duration(sum(float(item["duration"]) for item in segment_artifacts)),
        "segments": segments,
        "provider": {
            "provider_id": "qwen3_tts_customvoice_worker",
            "sample_rate_hz": int(sample_rate_hz),
            "speaker": speaker,
            "language": language,
        },
    }
