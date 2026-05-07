import { rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

export function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ["ignore", "ignore", "pipe"],
      ...options,
    });

    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}: ${stderr.trim()}`));
      }
    });
  });
}

export function runCommandCapture(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ["ignore", "pipe", "pipe"],
      ...options,
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
        resolve(stdout.trim());
      } else {
        reject(new Error(`${command} exited with code ${code}: ${stderr.trim()}`));
      }
    });
  });
}

export async function probeDuration(filePath) {
  const output = await runCommandCapture("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=nw=1:nk=1",
    filePath,
  ]);

  return Number(output || 0);
}

export async function concatSegments(segmentPaths, outputPath) {
  const fileListPath = `${outputPath}.concat.txt`;
  const fileList = segmentPaths
    .map((segmentPath) => `file '${segmentPath.replace(/'/g, "'\\''")}'`)
    .join("\n");

  await writeFile(fileListPath, `${fileList}\n`, "utf8");
  try {
    await runCommand("ffmpeg", [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      fileListPath,
      "-c",
      "copy",
      outputPath,
    ]);
  } finally {
    await rm(fileListPath, { force: true }).catch(() => {});
  }
}

export function roundTime(value) {
  return Math.round(Number(value || 0) * 1000) / 1000;
}

export function estimateWordTimings(text, t0, t1) {
  const tokens = String(text || "")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (!tokens.length) return [];
  const weights = tokens.map((token) => Math.max(token.replace(/[^\w]/g, "").length, 1));
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  let cursor = Number(t0);
  return tokens.map((token, index) => {
    const span = ((t1 - t0) * weights[index]) / totalWeight;
    const word = {
      word: token,
      t0: roundTime(cursor),
      t1: roundTime(cursor + span),
    };
    cursor += span;
    return word;
  });
}

export function buildAlignmentSegments(segmentArtifacts, options = {}) {
  let cursor = 0;
  return segmentArtifacts.map((artifact) => {
    const t0 = roundTime(cursor);
    cursor += Number(artifact.duration || 0);
    const t1 = roundTime(cursor);
    const hasNativeWords = Array.isArray(artifact.words) && artifact.words.length;
    const words = hasNativeWords
      ? artifact.words.map((word) => ({
        ...word,
        t0: roundTime(word.t0),
        t1: roundTime(word.t1),
      }))
      : options.estimateWords === false
        ? undefined
        : estimateWordTimings(artifact.segment?.text || "", t0, t1);

    return {
      segment_id: artifact.segment.segment_id,
      t0,
      t1,
      alignment_quality: hasNativeWords
        ? "word"
        : words?.length
          ? "estimated_word"
          : "segment_only",
      ...(words?.length ? { words } : {}),
    };
  });
}
