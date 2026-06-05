#!/usr/bin/env python3
"""Motion-bank contract loading and validation."""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any


class MotionBank:
    def __init__(self, path: Path):
        self.path = path
        self.data = json.loads(path.read_text(encoding="utf-8"))
        self.motions: dict[str, Any] = self.data.get("motions", {})
        self.events: dict[str, Any] = self.data.get("events", {})

    def has_motion(self, motion_id: str) -> bool:
        return motion_id in self.motions

    def motion(self, motion_id: str) -> dict[str, Any]:
        return self.motions[motion_id]

    def validate_motion_use(self, motion_id: str, placement: str | None, slide_index: int, slide_count: int) -> list[str]:
        errors: list[str] = []
        if not self.has_motion(motion_id):
            return [f"unknown motion_id: {motion_id}"]
        motion = self.motion(motion_id)
        allowed = set(motion.get("allowed_placements", []))
        if placement and allowed and placement not in allowed:
            errors.append(f"motion {motion_id} placement {placement!r} not in allowed placements {sorted(allowed)}")
        allowed_slide_positions = set(motion.get("allowed_slide_positions", []))
        if "final" in allowed_slide_positions and slide_index != slide_count - 1:
            errors.append(f"motion {motion_id} is final-slide only but slide_index={slide_index}, slide_count={slide_count}")
        return errors

    def validate_event(self, event: dict[str, Any]) -> list[str]:
        errors: list[str] = []
        event_type = event.get("type")
        if event_type not in self.events:
            return [f"unknown event type: {event_type}"]
        fields = self.events[event_type].get("fields", {})
        if event_type == "blink":
            if event.get("eye") not in fields.get("eye", []):
                errors.append(f"invalid blink eye: {event.get('eye')}")
            if event.get("strength") not in fields.get("strength", []):
                errors.append(f"invalid blink strength: {event.get('strength')}")
        elif event_type == "gaze":
            if event.get("target") not in fields.get("target", []):
                errors.append(f"invalid gaze target: {event.get('target')}")
            intensity = event.get("intensity")
            if intensity is not None:
                lo, hi = fields.get("intensity_range", [0.0, 1.0])
                if not (lo <= float(intensity) <= hi):
                    errors.append(f"gaze intensity {intensity} outside [{lo}, {hi}]")
        elif event_type == "emotion":
            if event.get("name") not in fields.get("name", []):
                errors.append(f"invalid emotion name: {event.get('name')}")
            intensity = event.get("intensity")
            if intensity is not None:
                lo, hi = fields.get("intensity_range", [0.0, 1.0])
                if not (lo <= float(intensity) <= hi):
                    errors.append(f"emotion intensity {intensity} outside [{lo}, {hi}]")
        elif event_type == "head_pose":
            for name, key in [("yaw", "yaw_range"), ("pitch", "pitch_range"), ("roll", "roll_range")]:
                if name in event:
                    lo, hi = fields.get(key, [-999, 999])
                    if not (lo <= float(event[name]) <= hi):
                        errors.append(f"head_pose {name}={event[name]} outside [{lo}, {hi}]")
        return errors


def load_motion_bank(project_root: Path, job: dict[str, Any], config: dict[str, Any]) -> MotionBank:
    metadata_file = (
        job.get("render", {}).get("motion_bank", {}).get("metadata_file")
        or config.get("motion_bank_file")
        or "tools/avatar_video/motion_bank.v1.json"
    )
    path = Path(metadata_file)
    if not path.is_absolute():
        path = project_root / path
    return MotionBank(path)
