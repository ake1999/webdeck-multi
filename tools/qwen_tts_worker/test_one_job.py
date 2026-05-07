#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys

from run_tts_worker import main as worker_main


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run one frozen TTS job end-to-end with Qwen CustomVoice.")
    parser.add_argument("--config", required=True, help="Path to worker config JSON.")
    parser.add_argument("--job", required=True, help="Path to one generated/jobs/tts/... JSON file.")
    parser.add_argument("--overwrite", action="store_true", help="Force regeneration even if outputs already match.")
    parser.add_argument("--log-level", default="INFO", help="Override worker log level.")
    parser.add_argument("--dry-run", action="store_true", help="Validate the job without generating audio.")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    worker_args = [
        "--config",
        args.config,
        "--job",
        args.job,
        "--log-level",
        args.log_level,
    ]
    if args.overwrite:
        worker_args.append("--overwrite")
    if args.dry_run:
        worker_args.append("--dry-run")
    return worker_main(worker_args)


if __name__ == "__main__":
    sys.exit(main())
