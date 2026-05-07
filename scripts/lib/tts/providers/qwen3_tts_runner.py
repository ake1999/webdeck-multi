#!/usr/bin/env python3

import argparse
import json
import os
import random
import sys
import traceback
from pathlib import Path


def _write_response(output_path, payload):
    Path(output_path).write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def _torch_dtype(name, torch_mod):
    value = str(name or "").lower()
    if value in {"float16", "fp16", "half"}:
        return torch_mod.float16
    if value in {"float32", "fp32"}:
        return torch_mod.float32
    return torch_mod.bfloat16


def _set_seed(seed, torch_mod):
    random.seed(seed)
    try:
        import numpy as np  # type: ignore

        np.random.seed(seed)
    except Exception:
        pass
    try:
        torch_mod.manual_seed(seed)
    except Exception:
        pass


def _load_dependencies():
    import torch  # type: ignore
    import soundfile as sf  # type: ignore
    from qwen_tts import Qwen3TTSModel  # type: ignore

    return torch, sf, Qwen3TTSModel


def _build_model_kwargs(payload, torch_mod):
    kwargs = {
        "device_map": payload.get("device") or "auto",
        "dtype": _torch_dtype(payload.get("dtype"), torch_mod),
    }
    attn = payload.get("attn_implementation")
    if attn:
        kwargs["attn_implementation"] = attn
    return kwargs


def _voice_clone_prompt(model, payload):
    reference_audio = payload.get("reference_audio")
    reference_text = payload.get("reference_text")
    if not reference_audio or not os.path.exists(reference_audio):
      raise FileNotFoundError(
          f"Qwen3-TTS clone mode requires a real reference audio file. Missing: {reference_audio}"
      )
    if not reference_text:
      raise ValueError("Qwen3-TTS clone mode requires reference_text.")

    return model.create_voice_clone_prompt(
        ref_audio=reference_audio,
        ref_text=reference_text,
        x_vector_only_mode=False,
    )


def _instruction_text(payload, segment):
    defaults = payload.get("instruction_defaults") or {}
    explicit = segment.get("voice", {}).get("instruction") or defaults.get("instruction")
    if explicit:
        return explicit

    tone = segment.get("voice", {}).get("tone") or defaults.get("tone")
    energy = segment.get("voice", {}).get("energy", defaults.get("energy"))
    pace = segment.get("voice", {}).get("pace", defaults.get("pace"))
    bits = []
    if tone:
        bits.append(f"Tone: {tone}")
    if energy is not None:
        bits.append(f"Energy: {energy}")
    if pace is not None:
        bits.append(f"Pace: {pace}")
    return ". ".join(bits)


def _generate_segment(model, payload, segment, clone_prompt):
    mode = str(payload.get("mode") or "clone").lower()
    text = segment.get("text") or ""
    language = segment.get("language") or payload.get("language") or "English"
    instruct = _instruction_text(payload, segment)

    if mode == "clone":
        wavs, sr = model.generate_voice_clone(
            text=text,
            language=language,
            voice_clone_prompt=clone_prompt,
        )
        return wavs[0], sr, {}

    if mode == "voice_design":
        wavs, sr = model.generate_voice_design(
            text=text,
            language=language,
            instruct=instruct,
        )
        return wavs[0], sr, {}

    if mode == "custom_voice":
        speaker = segment.get("voice", {}).get("speaker") or payload.get("speaker") or "Ryan"
        wavs, sr = model.generate_custom_voice(
            text=text,
            language=language,
            speaker=speaker,
            instruct=instruct or None,
        )
        return wavs[0], sr, {"speaker": speaker}

    raise ValueError(f"Unsupported Qwen3-TTS mode: {mode}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    try:
        payload = json.loads(Path(args.input).read_text(encoding="utf-8"))
        torch_mod, soundfile_mod, qwen_model_cls = _load_dependencies()
        _set_seed(int(payload.get("seed", 1234)), torch_mod)

        model = qwen_model_cls.from_pretrained(
            payload.get("model_id") or "Qwen/Qwen3-TTS-12Hz-0.6B-Base",
            **_build_model_kwargs(payload, torch_mod),
        )

        clone_prompt = None
        if str(payload.get("mode") or "clone").lower() == "clone":
            clone_prompt = _voice_clone_prompt(model, payload)

        temp_dir = Path(payload.get("temp_dir") or ".")
        segments_dir = temp_dir / "segments"
        segments_dir.mkdir(parents=True, exist_ok=True)

        results = []
        for index, segment in enumerate(payload.get("segments") or []):
            wav, sample_rate, metadata = _generate_segment(model, payload, segment, clone_prompt)
            out_file = segments_dir / f"{index + 1:02d}_{segment.get('segment_id', 'segment')}.wav"
            soundfile_mod.write(str(out_file), wav, sample_rate)
            results.append(
                {
                    "segment_id": segment.get("segment_id"),
                    "text": segment.get("text"),
                    "file": str(out_file),
                    "words": metadata.get("words", []),
                }
            )

        _write_response(
            args.output,
            {
                "ok": True,
                "provider_id": "qwen3_tts",
                "model_id": payload.get("model_id"),
                "mode": payload.get("mode"),
                "sample_rate_hz": 24000,
                "segments": results,
                "warnings": [],
            },
        )
    except Exception as exc:
        _write_response(
            args.output,
            {
                "ok": False,
                "error": f"{exc.__class__.__name__}: {exc}",
                "traceback": traceback.format_exc(),
            },
        )
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
