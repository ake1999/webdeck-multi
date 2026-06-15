#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { projectRoot } from "./lib/export_runtime.mjs";
import { buildLectureAudioArtifacts } from "./lib/lecture/pipeline.mjs";

const BOOLEAN_FLAGS = new Set(["write-report"]);

function normalizeKey(key) {
  return key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function parseArgs(argv) {
  const args = {
    outputDir: path.join(projectRoot, "generated", "lectures"),
    provider: "qwen3_tts",
    writeReport: false,
    voiceName: "slt",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;

    const rawKey = token.slice(2);
    const key = normalizeKey(rawKey);
    if (BOOLEAN_FLAGS.has(rawKey)) {
      args[key] = true;
      continue;
    }

    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) {
      throw new Error(`Missing value for --${rawKey}`);
    }

    args[key] = value;
    index += 1;
  }

  return args;
}

function booleanOption(value, fallback = false) {
  if (value == null || value === "") return fallback;
  if (typeof value === "boolean") return value;
  return !["0", "false", "no", "off"].includes(String(value).trim().toLowerCase());
}

function makeOptions(args) {
  return {
    voiceName: args.voiceName,
    providerVoice: args.providerVoice || "",
    qwenMode: args.qwenMode || "",
    qwenModel: args.qwenModel || args.qwenModelId || "",
    qwenModelId: args.qwenModelId || args.qwenModel || "",
    qwenReferenceAudio: args.qwenReferenceAudio || "",
    qwenReferenceText: args.qwenReferenceText || "",
    qwenDevice: args.qwenDevice || "",
    qwenDtype: args.qwenDtype || "",
    qwenSeed: args.qwenSeed,
    qwenLanguage: args.qwenLanguage || "",
    allowProviderFallback: booleanOption(args.allowProviderFallback, false),
    avatarProfile: args.avatarProfile || "",
    referenceAssets: args.referenceAssets || "",
    lecturePlan: args.lecturePlan || "",
  };
}

function makeMarkdown(report) {
  const lines = [
    "# Audio Build Report",
    "",
    `- Selector: \`${report.selector}\``,
    `- TTS provider: \`${report.provider}\``,
    `- Topics: ${report.summary.total}`,
    `- Built: ${report.summary.success}`,
    `- Failed: ${report.summary.failed}`,
    "",
  ];

  for (const topic of report.topics) {
    lines.push(`## ${toReviewLabel(topic.descriptor)}`);
    lines.push("");
    lines.push(`- Status: ${topic.status}`);
    if (topic.status === "success") {
      lines.push(`- Audio dir: \`${topic.audio_dir}\``);
      lines.push(`- Alignment: \`${topic.tts_alignment}\``);
      lines.push(`- Slides: ${topic.slide_count}`);
      lines.push(`- Duration: ${topic.total_duration}s`);
    } else {
      lines.push(`- Error: ${topic.error}`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const selector = {
    school: args.school || "",
    course: args.course || "",
    session: args.session || "",
    topic: args.topic || "",
  };

  const topics = filterTopics(await discoverTopics(), selector);
  if (!topics.length) {
    throw new Error(`No topics matched selector ${summarizeSelector(selector)}.`);
  }

  const report = {
    selector: summarizeSelector(selector),
    provider: args.provider,
    generated_at: new Date().toISOString(),
    topics: [],
    summary: {
      total: topics.length,
      success: 0,
      failed: 0,
    },
  };

  for (const descriptor of topics) {
    try {
      const built = await buildLectureAudioArtifacts({
        descriptor,
        outputRoot: args.outputDir,
        providerId: args.provider,
        options: makeOptions(args),
      });
      report.summary.success += 1;
      report.topics.push({
        status: "success",
        ...built,
      });
      console.log(`Built audio for ${toReviewLabel(descriptor)} -> ${built.tts_alignment}`);
    } catch (error) {
      report.summary.failed += 1;
      report.topics.push({
        status: "failed",
        descriptor,
        error: error?.message || String(error),
      });
      console.error(`Failed audio for ${toReviewLabel(descriptor)}: ${error?.message || error}`);
    }
  }

  if (args.writeReport) {
    await mkdir(args.outputDir, { recursive: true });
    const jsonPath = path.join(args.outputDir, "audio.report.json");
    const mdPath = path.join(args.outputDir, "audio.report.md");
    await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    await writeFile(mdPath, makeMarkdown(report), "utf8");
    console.log(`Audio JSON report written to ${jsonPath}`);
    console.log(`Audio Markdown report written to ${mdPath}`);
  }

  console.log(`Topics: ${report.summary.total} | built=${report.summary.success} failed=${report.summary.failed}`);
  if (report.summary.failed > 0) {
    process.exitCode = 1;
  }
}

main()
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
