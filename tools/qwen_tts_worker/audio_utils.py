#!/usr/bin/env python3
from __future__ import annotations

import math
import os
from pathlib import Path
from typing import Any


def _np():
    import numpy as np  # type: ignore

    return np


def _sf():
    import soundfile as sf  # type: ignore

    return sf


def _resample_poly():
    from scipy.signal import resample_poly  # type: ignore

    return resample_poly


def ensure_mono_float32(waveform: Any):
    np = _np()
    array = np.asarray(waveform, dtype=np.float32)
    array = np.squeeze(array)
    if array.ndim == 0:
        return np.asarray([float(array)], dtype=np.float32)
    if array.ndim == 1:
        return array.astype(np.float32, copy=False)
    if array.ndim == 2:
        if array.shape[0] <= 4 and array.shape[1] > array.shape[0]:
            return array.mean(axis=0, dtype=np.float32)
        return array.mean(axis=1, dtype=np.float32)
    return array.reshape(-1).astype(np.float32, copy=False)


def resample_if_needed(waveform: Any, src_rate: int, dst_rate: int):
    np = _np()
    mono = ensure_mono_float32(waveform)
    if int(src_rate) == int(dst_rate):
        return mono
    resample_poly = _resample_poly()
    divisor = math.gcd(int(src_rate), int(dst_rate))
    up = int(dst_rate) // divisor
    down = int(src_rate) // divisor
    return np.asarray(resample_poly(mono, up, down), dtype=np.float32)


def make_silence(duration_ms: int, sample_rate: int):
    np = _np()
    sample_count = max(int(round((float(duration_ms) / 1000.0) * int(sample_rate))), 0)
    return np.zeros(sample_count, dtype=np.float32)


def normalize_audio(waveform: Any, *, target_peak: float = 0.9, ceiling: float = 0.97, max_up_gain: float = 1.5):
    np = _np()
    mono = ensure_mono_float32(waveform)
    if mono.size == 0:
        return mono
    peak = float(np.max(np.abs(mono)))
    if peak <= 0.0:
        return mono
    gain = min(target_peak / peak, max_up_gain)
    normalized = mono * gain
    new_peak = float(np.max(np.abs(normalized)))
    if new_peak > ceiling > 0.0:
        normalized = normalized * (ceiling / new_peak)
    return np.asarray(normalized, dtype=np.float32)


def assemble_slide_audio(
    segment_items: list[dict[str, Any]],
    *,
    pause_between_segments_ms: int = 120,
    peak_limit: float = 0.97,
) -> tuple[Any, int, list[dict[str, Any]]]:
    np = _np()
    if not segment_items:
        raise ValueError("No segment audio items were provided.")

    target_sample_rate = int(segment_items[0]["sample_rate"])
    assembled = []
    artifacts: list[dict[str, Any]] = []

    for index, item in enumerate(segment_items):
        segment_wave = resample_if_needed(item["waveform"], int(item["sample_rate"]), target_sample_rate)
        trailing_pause_ms = pause_between_segments_ms if index < len(segment_items) - 1 else 0
        if trailing_pause_ms > 0:
            segment_wave = np.concatenate([segment_wave, make_silence(trailing_pause_ms, target_sample_rate)])
        artifacts.append(
            {
                "segment": item["segment"],
                "duration": len(segment_wave) / float(target_sample_rate),
                "words": item.get("words") or [],
                "instruction": item.get("instruction") or "",
            }
        )
        assembled.append(segment_wave)

    full_waveform = np.concatenate(assembled) if assembled else np.zeros(1, dtype=np.float32)
    full_waveform = normalize_audio(full_waveform, ceiling=peak_limit)
    return full_waveform, target_sample_rate, artifacts


def write_wav_atomic(path: Path, waveform: Any, sample_rate: int) -> None:
    sf = _sf()
    suffix = path.suffix or ".wav"
    temp_path = path.with_name(f".{path.stem}.tmp{suffix}")
    path.parent.mkdir(parents=True, exist_ok=True)
    sf.write(
        str(temp_path),
        ensure_mono_float32(waveform),
        int(sample_rate),
        format="WAV",
        subtype="PCM_16",
    )
    os.replace(temp_path, path)
