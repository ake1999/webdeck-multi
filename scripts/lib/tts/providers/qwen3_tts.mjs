import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { buildAlignmentSegments, concatSegments, probeDuration } from "../audio_utils.mjs";
import { ffmpegFliteProvider } from "./ffmpeg_flite.mjs";
import { projectRoot } from "../../export_runtime.mjs";
import { ttsTextForSpeech } from "../../lecture/utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RUNNER_PATH = path.join(__dirname, "qwen3_tts_runner.py");

function runPythonRunner(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("python3", [RUNNER_PATH, ...args], {
      cwd: projectRoot,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`qwen3_tts_runner.py exited with code ${code}: ${stderr.trim() || stdout.trim()}`));
      }
    });
  });
}

function absoluteProjectPath(value) {
  if (!value) return "";
  return path.isAbsolute(value) ? value : path.resolve(projectRoot, value);
}

function inferReferenceAudio(authoring, profileVoice) {
  if (profileVoice?.primary_reference_audio) {
    return absoluteProjectPath(profileVoice.primary_reference_audio);
  }
  return authoring?.voiceReferences?.find((entry) => entry.exists)?.absolute_path || "";
}

function inferReferenceText(authoring, profileVoice) {
  if (profileVoice?.primary_reference_text) return String(profileVoice.primary_reference_text);
  return authoring?.voiceReferences?.find((entry) => entry.exists)?.transcript || "";
}

function buildConfig({ slide, options = {}, authoring }) {
  const profileVoice = authoring?.avatarProfile?.voice || {};
  const config = {
    provider: "qwen3_tts",
    mode: options.qwenMode || profileVoice.mode || "clone",
    model_id: options.qwenModelId || options.qwenModel || profileVoice.model_id || "Qwen/Qwen3-TTS-12Hz-0.6B-Base",
    reference_audio: absoluteProjectPath(
      options.qwenReferenceAudio
      || profileVoice.reference_audio
      || inferReferenceAudio(authoring, profileVoice),
    ),
    reference_text: options.qwenReferenceText
      || profileVoice.reference_text
      || inferReferenceText(authoring, profileVoice),
    instruction_defaults: {
      ...(profileVoice.defaults || {}),
      ...(profileVoice.instruction_defaults || {}),
      ...(options.qwenInstructionDefaults || {}),
    },
    device: options.qwenDevice || "auto",
    dtype: options.qwenDtype || "bfloat16",
    seed: Number(options.qwenSeed ?? 1234),
    language: options.qwenLanguage || "English",
    allow_fallback: options.allowProviderFallback !== false && options.allowProviderFallback !== "0",
    fallback_provider: options.fallbackProvider || profileVoice.fallback_provider || "ffmpeg_flite",
    python_bin: options.qwenPythonBin || "python3",
    segments: (Array.isArray(slide.segments) ? slide.segments : []).map((segment) => ({
      segment_id: segment.segment_id,
      text: segment.tts_text || ttsTextForSpeech(segment.text),
      display_text: segment.text,
      voice: segment.voice || {},
      language: segment.voice?.language || options.qwenLanguage || "English",
    })),
  };

  return config;
}

function buildRunnerPayload({ slide, outputDir, options, authoring, tempDir }) {
  const config = buildConfig({ slide, options, authoring });
  return {
    slide_id: slide.slide_id,
    output_dir: outputDir,
    temp_dir: tempDir,
    ...config,
  };
}

async function runQwenSynthesis({ slide, outputDir, options, authoring }) {
  await mkdir(outputDir, { recursive: true });
  const tempDir = await mkdtemp(path.join(os.tmpdir(), `webdeck-qwen-${slide.slide_id}-`));
  const outputPath = path.join(outputDir, `${slide.slide_id}.wav`);
  const requestPath = path.join(tempDir, "request.json");
  const responsePath = path.join(tempDir, "response.json");

  try {
    const payload = buildRunnerPayload({ slide, outputDir, options, authoring, tempDir });
    await writeFile(requestPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    let runnerError = null;
    try {
      await runPythonRunner(["--input", requestPath, "--output", responsePath]);
    } catch (error) {
      runnerError = error;
    }
    const response = JSON.parse(await readFile(responsePath, "utf8").catch(async () => {
      if (runnerError) {
        throw runnerError;
      }
      throw new Error("Qwen3-TTS runner did not produce a response payload.");
    }));

    if (!response.ok) {
      throw new Error(response.error || runnerError?.message || "Qwen3-TTS runner failed without a specific error.");
    }

    const artifacts = [];
    for (const segment of response.segments || []) {
      const segmentFile = path.isAbsolute(segment.file)
        ? segment.file
        : path.join(tempDir, String(segment.file || ""));
      const duration = await probeDuration(segmentFile);
      artifacts.push({
        segment: slide.segments.find((item) => item.segment_id === segment.segment_id) || {
          segment_id: segment.segment_id,
          text: segment.text || "",
        },
        duration,
        segmentPath: segmentFile,
        words: segment.words || [],
      });
    }

    if (!artifacts.length) {
      throw new Error("Qwen3-TTS runner returned no synthesized segments.");
    }

    await concatSegments(
      artifacts.map((artifact) => artifact.segmentPath),
      outputPath,
    );

    return {
      slide_id: slide.slide_id,
      audioFile: outputPath,
      duration: await probeDuration(outputPath),
      segments: buildAlignmentSegments(artifacts, { estimateWords: false }),
      providerMeta: {
        provider_id: "qwen3_tts",
        requested_mode: response.mode || payload.mode,
        model_id: response.model_id || payload.model_id,
        sample_rate_hz: response.sample_rate_hz || null,
        used_fallback: false,
        warnings: response.warnings || [],
      },
    };
  } finally {
    await rm(tempDir, { recursive: true, force: true }).catch(() => {});
  }
}

export const qwen3TtsProvider = {
  id: "qwen3_tts",
  label: "Qwen3-TTS (local python runner)",
  supportsWordTimings: true,
  async synthesizeSlide({ slide, outputDir, options = {}, authoring = null }) {
    try {
      return await runQwenSynthesis({
        slide,
        outputDir,
        options,
        authoring,
      });
    } catch (error) {
      const allowFallback = options.allowProviderFallback !== false && options.allowProviderFallback !== "0";
      if (!allowFallback) {
        throw error;
      }

      const fallback = await ffmpegFliteProvider.synthesizeSlide({
        slide,
        outputDir,
        options,
      });
      return {
        ...fallback,
        providerMeta: {
          ...(fallback.providerMeta || {}),
          provider_id: "qwen3_tts",
          requested_provider: "qwen3_tts",
          actual_provider: "ffmpeg_flite",
          used_fallback: true,
          fallback_reason: error?.message || String(error),
        },
      };
    }
  },
};
