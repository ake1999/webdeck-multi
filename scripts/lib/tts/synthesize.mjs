import crypto from "node:crypto";
import { ffmpegFliteProvider } from "./providers/ffmpeg_flite.mjs";
import { openAiTtsProvider } from "./providers/openai.mjs";
import { xttsProvider } from "./providers/xtts.mjs";
import { kokoroProvider } from "./providers/kokoro.mjs";
import { qwen3TtsProvider } from "./providers/qwen3_tts.mjs";
import { relativeProjectPath } from "../lecture/utils.mjs";

const PROVIDERS = new Map([
  [ffmpegFliteProvider.id, ffmpegFliteProvider],
  ["local", ffmpegFliteProvider],
  [openAiTtsProvider.id, openAiTtsProvider],
  [xttsProvider.id, xttsProvider],
  [kokoroProvider.id, kokoroProvider],
  [qwen3TtsProvider.id, qwen3TtsProvider],
]);

export function resolveTtsProvider(providerId = "ffmpeg_flite") {
  const provider = PROVIDERS.get(providerId);
  if (!provider) {
    throw new Error(`Unknown TTS provider "${providerId}". Available providers: ${Array.from(PROVIDERS.keys()).join(", ")}`);
  }
  return provider;
}

function buildProviderMeta(provider, providerId, options = {}) {
  const providerConfig = {
    provider: providerId,
    mode: options.qwenMode || null,
    model_id: options.qwenModelId || options.qwenModel || null,
    reference_audio: options.qwenReferenceAudio || null,
    voice_name: options.voiceName || null,
    seed: options.qwenSeed != null ? Number(options.qwenSeed) : null,
  };
  const configHash = crypto
    .createHash("sha256")
    .update(JSON.stringify(providerConfig))
    .digest("hex")
    .slice(0, 16);

  return {
    id: provider.id,
    label: provider.label,
    supports_word_timings: Boolean(provider.supportsWordTimings),
    requested_provider: providerId,
    mode: providerConfig.mode,
    config_hash: configHash,
  };
}

export async function synthesizeTopicAudio({
  scriptManifest,
  audioDir,
  providerId = "ffmpeg_flite",
  options = {},
  authoring = null,
}) {
  const provider = resolveTtsProvider(providerId);
  const slides = [];
  const providerWarnings = [];
  const actualProviders = new Set();

  for (const slide of scriptManifest.slides || []) {
    const synthesized = await provider.synthesizeSlide({
      slide,
      outputDir: audioDir,
      options,
      authoring,
    });
    if (synthesized.providerMeta?.actual_provider) {
      actualProviders.add(synthesized.providerMeta.actual_provider);
    } else if (synthesized.providerMeta?.provider_id) {
      actualProviders.add(synthesized.providerMeta.provider_id);
    } else {
      actualProviders.add(provider.id);
    }
    if (Array.isArray(synthesized.providerMeta?.warnings)) {
      providerWarnings.push(...synthesized.providerMeta.warnings);
    }

    slides.push({
      slide_id: slide.slide_id,
      audio_file: relativeProjectPath(synthesized.audioFile),
      duration: synthesized.duration,
      segments: synthesized.segments,
      provider: synthesized.providerMeta || null,
    });
  }

  return {
    topic_id: scriptManifest.topic_id,
    provider: {
      ...buildProviderMeta(provider, providerId, options),
      actual_providers: Array.from(actualProviders),
      warnings: providerWarnings,
    },
    slides,
  };
}
