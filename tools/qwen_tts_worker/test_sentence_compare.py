#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import logging
import sys
from pathlib import Path

from audio_utils import write_wav_atomic
from contract_utils import ensure_parent_dir, load_worker_config, resolve_path, stable_hash, write_json_atomic
from instruction_builder import build_instruction
from qwen_backend import QwenBackend

LOGGER = logging.getLogger("test_sentence_compare")

SAMPLES = [
    {
        "name": "01_clear_teacher",
        "segment": {
            "segment_id": "sample_01",
            "text": "Today we are going to break robot payload down into the practical meaning you will actually use in industry.",
            "tone": "clear_teacher",
            "energy": 0.58,
            "pace": 0.96,
            "emphasis_words": ["practical meaning", "industry"],
            "target_element": "title",
            "attention_mode": "slide_focus",
        },
    },
    {
        "name": "02_compare_explain",
        "segment": {
            "segment_id": "sample_02",
            "text": "Reach tells you how far the robot can extend, while workspace tells you everywhere the tool can actually operate.",
            "tone": "compare_explain",
            "energy": 0.62,
            "pace": 0.98,
            "emphasis_words": ["Reach", "workspace", "everywhere"],
            "target_element": "bullet_2",
            "attention_mode": "compare_focus",
        },
    },
    {
        "name": "03_calm_recap",
        "segment": {
            "segment_id": "sample_03",
            "text": "So the short version is this: choose the robot by task, payload, reach, speed, and repeatability.",
            "tone": "calm_recap",
            "energy": 0.42,
            "pace": 0.9,
            "emphasis_words": ["task", "payload", "repeatability"],
            "target_element": "bullet_4",
            "attention_mode": "slide_focus",
        },
    },
]


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Generate three sample sentences for voice-quality review.")
    parser.add_argument("--config", required=True, help="Path to worker config JSON.")
    parser.add_argument("--log-level", default="INFO")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    logging.basicConfig(
        level=getattr(logging, args.log_level.upper(), logging.INFO),
        format="%(asctime)s | %(levelname)s | %(message)s",
        datefmt="%H:%M:%S",
    )

    config = load_worker_config(args.config)
    backend = QwenBackend(config)
    backend.preflight()

    repo_root = Path(config["repo_root"]).resolve()
    output_root = resolve_path(repo_root, config["test_output_root"])
    output_root.mkdir(parents=True, exist_ok=True)

    manifest = {
        "worker_name": config.get("worker_name"),
        "model_name": config.get("model_name"),
        "speaker": config.get("speaker"),
        "samples": [],
    }

    for sample in SAMPLES:
        instruction = build_instruction(sample["segment"], str(config["default_instruction"]))
        waveform, sample_rate, metadata = backend.synthesize_segment(
            text=sample["segment"]["text"],
            instruction=instruction,
        )
        output_path = output_root / f"{sample['name']}.wav"
        ensure_parent_dir(output_path)
        write_wav_atomic(output_path, waveform, sample_rate)
        duration = len(waveform) / float(sample_rate)
        LOGGER.info("Wrote %s (%.2fs)", output_path, duration)
        manifest["samples"].append(
            {
                "name": sample["name"],
                "file": str(output_path),
                "duration_sec": round(duration, 3),
                "instruction": instruction,
                "metadata": metadata,
            }
        )

    manifest["manifest_hash"] = stable_hash(manifest)
    write_json_atomic(output_root / "sentence_compare_manifest.json", manifest)
    LOGGER.info("Sentence compare samples are ready in %s", output_root)
    return 0


if __name__ == "__main__":
    sys.exit(main())
