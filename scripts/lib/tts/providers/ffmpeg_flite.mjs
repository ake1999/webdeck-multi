import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { clamp, ttsTextForSpeech } from "../../lecture/utils.mjs";
import {
  buildAlignmentSegments,
  concatSegments,
  probeDuration,
  runCommand,
} from "../audio_utils.mjs";

const SAMPLE_RATE = 16000;

function resolveVoiceName(segment, options = {}) {
  if (segment?.voice?.provider_voice) return segment.voice.provider_voice;
  if (options.voiceName) return options.voiceName;

  const tone = String(segment?.voice?.tone || "").toLowerCase();
  if (tone.includes("warm")) return "awb";
  if (tone.includes("serious")) return "slt";
  return "slt";
}

async function synthesizeTextToFile(text, outputPath, voiceName, pace) {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "webdeck-flite-segment-"));
  const textFile = path.join(tempDir, "segment.txt");
  const rawPath = path.join(tempDir, "segment-raw.wav");

  try {
    await writeFile(textFile, `${text}\n`, "utf8");
    await runCommand("ffmpeg", [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-f",
      "lavfi",
      "-i",
      `flite=textfile='${textFile.replace(/'/g, "\\'")}':voice=${voiceName}`,
      "-ar",
      String(SAMPLE_RATE),
      "-ac",
      "1",
      rawPath,
    ]);

    const boundedPace = clamp(pace || 1, 0.5, 2);
    if (Math.abs(boundedPace - 1) > 0.001) {
      await runCommand("ffmpeg", [
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-i",
        rawPath,
        "-filter:a",
        `atempo=${boundedPace.toFixed(3)}`,
        "-ar",
        String(SAMPLE_RATE),
        "-ac",
        "1",
        outputPath,
      ]);
    } else {
      await runCommand("ffmpeg", [
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-i",
        rawPath,
        "-c:a",
        "copy",
        outputPath,
      ]);
    }
  } finally {
    await rm(tempDir, { recursive: true, force: true }).catch(() => {});
  }
}

async function synthesizeSilence(outputPath, durationSeconds = 0.4) {
  await runCommand("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-f",
    "lavfi",
    "-i",
    `anullsrc=r=${SAMPLE_RATE}:cl=mono`,
    "-t",
    String(durationSeconds),
    "-ar",
    String(SAMPLE_RATE),
    "-ac",
    "1",
    outputPath,
  ]);
}

export const ffmpegFliteProvider = {
  id: "ffmpeg_flite",
  label: "Local ffmpeg flite",
  supportsWordTimings: false,
  async synthesizeSlide({ slide, outputDir, options = {} }) {
    await mkdir(outputDir, { recursive: true });
    const tempDir = await mkdtemp(path.join(os.tmpdir(), `webdeck-slide-${slide.slide_id}-`));
    const outputPath = path.join(outputDir, `${slide.slide_id}.wav`);

    try {
      const segmentArtifacts = [];
      const segments = Array.isArray(slide.segments) ? slide.segments : [];

      if (!segments.length) {
        const silencePath = path.join(tempDir, "segment-01.wav");
        await synthesizeSilence(silencePath);
        await concatSegments([silencePath], outputPath);
        return {
          slide_id: slide.slide_id,
          audioFile: outputPath,
          duration: await probeDuration(outputPath),
          segments: [],
        };
      }

      for (let index = 0; index < segments.length; index += 1) {
        const segment = segments[index];
        const segmentPath = path.join(tempDir, `segment-${String(index + 1).padStart(2, "0")}.wav`);
        await synthesizeTextToFile(
          segment.tts_text || ttsTextForSpeech(segment.text),
          segmentPath,
          resolveVoiceName(segment, options),
          Number(segment.voice?.pace) || Number(options.defaultPace) || 1,
        );
        const duration = await probeDuration(segmentPath);
        segmentArtifacts.push({
          segment,
          segmentPath,
          duration,
        });
      }

      await concatSegments(
        segmentArtifacts.map((artifact) => artifact.segmentPath),
        outputPath,
      );

      const alignmentSegments = buildAlignmentSegments(segmentArtifacts);

      return {
        slide_id: slide.slide_id,
        audioFile: outputPath,
        duration: await probeDuration(outputPath),
        segments: alignmentSegments,
        providerMeta: {
          provider_id: "ffmpeg_flite",
          sample_rate_hz: SAMPLE_RATE,
          voice_name: options.voiceName || "slt",
        },
      };
    } finally {
      await rm(tempDir, { recursive: true, force: true }).catch(() => {});
    }
  },
};
