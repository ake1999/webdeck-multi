#!/usr/bin/env python3
from __future__ import annotations

from typing import Any

STYLE_ALIASES = {
    "clear_explain": "explain",
    "teacher_clear": "clear_teacher",
    "neutral_explain": "explain",
    "serious": "serious_clear",
    "demo": "energetic_demo",
    "recap": "calm_recap",
}

DELIVERY_KIND_TO_STYLE = {
    "introduce": "clear_teacher",
    "explain": "explain",
    "compare": "compare_explain",
    "recap": "calm_recap",
    "demo": "energetic_demo",
    "quiz_prompt": "quiz_prompt",
    "caution": "caution",
}

STYLE_SENTENCES = {
    "clear_teacher": "Use a clear, neutral, instructor-like delivery.",
    "serious_clear": "Speak a little more carefully and seriously, while staying calm and easy to follow.",
    "compare_explain": "Compare the two ideas clearly and naturally. Emphasize the contrast without sounding dramatic.",
    "energetic_demo": "Speak with more energy and curiosity, but remain clear and teacher-like.",
    "calm_recap": "Speak calmly and slightly slower, like a recap at the end of a lecture.",
    "caution": "Speak firmly and more seriously, like an important safety warning.",
    "quiz_prompt": "Sound inviting and slightly curious, like you are prompting students to think.",
    "explain": "Explain the idea naturally, like a teacher guiding students through it step by step.",
}


def _normalize_style(value: Any) -> str | None:
    text = str(value or "").strip().lower()
    if not text:
        return None
    return STYLE_ALIASES.get(text, text)


def resolve_style(segment: dict[str, Any]) -> str:
    for key in ("delivery_kind", "tone", "voice_style"):
        normalized = _normalize_style(segment.get(key))
        if not normalized:
            continue
        if key == "delivery_kind":
            normalized = DELIVERY_KIND_TO_STYLE.get(normalized, normalized)
        if normalized in STYLE_SENTENCES:
            return normalized
    return "clear_teacher"


def _energy_sentence(energy: Any) -> str | None:
    try:
        value = float(energy)
    except (TypeError, ValueError):
        return None
    if value <= 0.42:
        return "Keep the energy restrained and steady."
    if value <= 0.62:
        return "Keep the energy balanced and controlled."
    if value <= 0.78:
        return "Bring a little extra energy while staying professional."
    return "Use noticeably more energy, but still stay precise and teacher-like."


def _pace_sentence(pace: Any) -> str | None:
    try:
        value = float(pace)
    except (TypeError, ValueError):
        return None
    if value <= 0.9:
        return "Speak slightly slower than normal for clarity."
    if value <= 1.02:
        return "Keep a natural lecture pace."
    if value <= 1.12:
        return "Speak a little more briskly, but stay easy to follow."
    return "Keep the pace lively, while preserving clear articulation."


def _attention_sentence(segment: dict[str, Any]) -> str | None:
    attention_mode = str(segment.get("attention_mode") or "").strip().lower()
    if attention_mode in {"hybrid_focus", "widget_demo"}:
        return "Guide attention between the visual and your explanation without sounding rushed."
    if attention_mode in {"element_focus", "compare_focus"}:
        return "Gently guide attention toward the relevant part of the slide as you speak."
    target_element = str(segment.get("target_element") or "").strip().lower()
    if target_element and target_element not in {"title", "slide", "slide_root", "whole_slide"}:
        return "Lightly guide attention to the relevant part of the slide."
    return None


def _emphasis_sentence(emphasis_words: Any) -> str | None:
    if not isinstance(emphasis_words, list):
        return None
    cleaned = [str(word).strip() for word in emphasis_words if str(word).strip()]
    if not cleaned:
        return None
    return f"Slightly emphasize these words or phrases: {', '.join(cleaned)}."


def build_instruction(segment: dict[str, Any], default_instruction: str) -> str:
    style = resolve_style(segment)
    parts = [
        default_instruction.strip(),
        STYLE_SENTENCES[style],
    ]
    energy_sentence = _energy_sentence(segment.get("energy"))
    pace_sentence = _pace_sentence(segment.get("pace"))
    attention_sentence = _attention_sentence(segment)
    emphasis_sentence = _emphasis_sentence(segment.get("emphasis_words"))
    for sentence in (energy_sentence, pace_sentence, attention_sentence, emphasis_sentence):
        if sentence:
            parts.append(sentence)
    parts.append("Keep it natural, clear, and non-theatrical.")
    return " ".join(part for part in parts if part)
