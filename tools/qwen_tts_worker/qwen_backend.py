#!/usr/bin/env python3
from __future__ import annotations

import logging
import random
from typing import Any

LOGGER = logging.getLogger(__name__)


class BackendError(RuntimeError):
    pass


def _torch_dtype(name: str | None, torch_mod):
    value = str(name or "").strip().lower()
    if value in {"float16", "fp16", "half"}:
        return torch_mod.float16
    if value in {"float32", "fp32"}:
        return torch_mod.float32
    return torch_mod.bfloat16


def _set_seed(seed: int, torch_mod) -> None:
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
    try:
        torch_mod.cuda.manual_seed_all(seed)
    except Exception:
        pass


def _load_dependencies():
    import numpy as np  # type: ignore
    import torch  # type: ignore
    from qwen_tts import Qwen3TTSModel  # type: ignore

    return np, torch, Qwen3TTSModel


class QwenBackend:
    def __init__(self, config: dict[str, Any]):
        self.config = config
        self._model = None
        self._torch = None
        self._np = None

    def _build_model_kwargs(self, torch_mod):
        kwargs: dict[str, Any] = {
            "dtype": _torch_dtype(str(self.config.get("dtype") or "bfloat16"), torch_mod),
        }
        device = str(self.config.get("device") or "auto").strip() or "auto"
        kwargs["device_map"] = device
        return kwargs

    def _ensure_model(self):
        if self._model is not None:
            return self._model

        np_mod, torch_mod, qwen_model_cls = _load_dependencies()
        _set_seed(int(self.config.get("seed", 1234)), torch_mod)
        model_name = str(self.config.get("model_name") or "Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice")
        LOGGER.info("Loading Qwen model: %s", model_name)
        self._model = qwen_model_cls.from_pretrained(
            model_name,
            **self._build_model_kwargs(torch_mod),
        )
        self._torch = torch_mod
        self._np = np_mod
        return self._model

    def preflight(self) -> None:
        self._ensure_model()

    def synthesize_segment(self, *, text: str, instruction: str) -> tuple[Any, int, dict[str, Any]]:
        if not str(text or "").strip():
            raise BackendError("Cannot synthesize empty segment text.")
        model = self._ensure_model()
        speaker = str(self.config.get("speaker") or "Aiden")
        language = str(self.config.get("language") or "English")
        wavs, sample_rate = model.generate_custom_voice(
            text=text,
            language=language,
            speaker=speaker,
            instruct=instruction or None,
        )
        if not wavs:
            raise BackendError("Qwen returned no waveform for the segment.")
        waveform = self._np.asarray(wavs[0], dtype=self._np.float32)
        return waveform, int(sample_rate), {
            "speaker": speaker,
            "language": language,
            "instruction": instruction,
        }
