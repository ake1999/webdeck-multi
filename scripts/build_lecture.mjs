#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { projectRoot } from "./lib/export_runtime.mjs";
import { buildLectureArtifacts } from "./lib/lecture/pipeline.mjs";

function parseArgs(argv) {
  const args = {
    outputDir: path.join(projectRoot, "generated", "lectures"),
    viewport: "1920x1080",
    provider: "ffmpeg_flite",
    scriptProvider: process.env.WEBDECK_SCRIPT_PROVIDER || (process.env.CI ? "deterministic" : "auto"),
    scriptModel: process.env.WEBDECK_SCRIPT_MODEL || "",
    scriptEndpoint: process.env.WEBDECK_SCRIPT_ENDPOINT || process.env.OLLAMA_HOST || "http://127.0.0.1:11434",
    scriptPromptVersion: process.env.WEBDECK_SCRIPT_PROMPT_VERSION || "script_writer_v2",
    scriptTemperature: process.env.WEBDECK_SCRIPT_TEMPERATURE || "0.2",
    scriptMaxRetries: process.env.WEBDECK_SCRIPT_MAX_RETRIES || "2",
    scriptTimeoutMs: process.env.WEBDECK_SCRIPT_TIMEOUT_MS || "60000",
    allowScriptFallback: process.env.WEBDECK_ALLOW_SCRIPT_FALLBACK || "1",
    debugScreenshots: false,
    maxSegmentsPerSlide: 8,
    maxWordsPerSegment: 28,
    maxAutoItems: 6,
    motionSampleRateFps: 6,
    voiceName: "slt",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;

    const key = token.slice(2);
    if (key === "debug-screenshots") {
      args.debugScreenshots = true;
      continue;
    }

    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }

    args[key] = value;
    index += 1;
  }

  return args;
}

function makeMarkdown(report) {
  const lines = [
    "# WebDeck Lecture Build Report",
    "",
    `- Selector: \`${report.selector}\``,
    `- TTS Provider: \`${report.provider}\``,
    `- Script Provider: \`${report.script_provider}\``,
    `- Topics: ${report.summary.total}`,
    `- Built: ${report.summary.success}`,
    `- Failed: ${report.summary.failed}`,
    "",
  ];

  report.topics.forEach((topic) => {
    lines.push(`## ${toReviewLabel(topic.descriptor)}`);
    lines.push("");
    lines.push(`- Status: ${topic.status}`);
    if (topic.status === "success") {
      lines.push(`- Output: \`${topic.output_dir}\``);
      lines.push(`- Timeline: \`${topic.timeline}\``);
      lines.push(`- Script: \`${topic.script_manifest}\``);
      lines.push(`- Audio dir: \`${topic.audio_dir}\``);
      lines.push(`- TTS jobs: \`${topic.tts_jobs?.dir || ""}\``);
      lines.push(`- Review: \`${topic.review.html}\``);
      lines.push(`- Avatar jobs: \`${topic.avatar_jobs?.dir || ""}\``);
      lines.push(`- Motion manifest: \`${topic.motion_manifest || ""}\``);
      lines.push(`- Slide video jobs: \`${topic.slide_video_jobs?.dir || ""}\``);
      lines.push(`- Manual outputs: audio=\`${topic.manual_outputs?.audio || ""}\` renders=\`${topic.manual_outputs?.renders || ""}\``);
      lines.push(`- Duration: ${topic.total_duration}s`);
      if (topic.authoring_warnings?.length) {
        topic.authoring_warnings.forEach((warning) => lines.push(`- Authoring warning: ${warning}`));
      }
    } else {
      lines.push(`- Error: ${topic.error}`);
    }
    lines.push("");
  });

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
    script_provider: args.scriptProvider,
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
      const built = await buildLectureArtifacts({
        descriptor,
        outputRoot: args.outputDir,
        providerId: args.provider,
        viewport: args.viewport,
        debugScreenshots: args.debugScreenshots,
        analysisTimeoutMs: args.analysisTimeoutMs,
        analysisAssetTimeoutMs: args.analysisAssetTimeoutMs,
        options: {
          maxSegmentsPerSlide: Number(args.maxSegmentsPerSlide),
          maxWordsPerSegment: Number(args.maxWordsPerSegment),
          maxAutoItems: Number(args.maxAutoItems),
          motionSampleRateFps: Number(args.motionSampleRateFps || 6),
          voiceName: args.voiceName,
          scriptPolicy: args.scriptPolicy || "teacher_clear_concise",
          scriptProvider: args.scriptProvider,
          scriptModel: args.scriptModel || "",
          scriptEndpoint: args.scriptEndpoint || "",
          scriptPromptVersion: args.scriptPromptVersion || "script_writer_v2",
          scriptTemperature: Number(args.scriptTemperature ?? 0.2),
          scriptMaxRetries: Number(args.scriptMaxRetries ?? 2),
          scriptTimeoutMs: Number(args.scriptTimeoutMs || 60000),
          topicPlanTimeoutMs: Number(args.topicPlanTimeoutMs || args.scriptTimeoutMs || 180000),
          allowScriptFallback: args.allowScriptFallback ?? true,
          forceScriptComparison: args.forceScriptComparison || "",
          scriptOverride: args.scriptOverride || "",
          lecturePlan: args.lecturePlan || "",
          avatarProfile: args.avatarProfile || "",
          referenceAssets: args.referenceAssets || "",
          qwenMode: args.qwenMode || "",
          qwenModel: args.qwenModel || args.qwenModelId || "",
          qwenModelId: args.qwenModelId || args.qwenModel || "",
          qwenReferenceAudio: args.qwenReferenceAudio || "",
          qwenReferenceText: args.qwenReferenceText || "",
          qwenDevice: args.qwenDevice || "",
          qwenDtype: args.qwenDtype || "",
          qwenSeed: args.qwenSeed,
          qwenLanguage: args.qwenLanguage || "",
          allowProviderFallback: args.allowProviderFallback ?? true,
        },
      });
      report.summary.success += 1;
      report.topics.push({
        status: "success",
        ...built,
      });
      console.log(`Built lecture artifacts for ${toReviewLabel(descriptor)} -> ${built.output_dir}`);
    } catch (error) {
      report.summary.failed += 1;
      report.topics.push({
        status: "failed",
        descriptor,
        error: error?.message || String(error),
      });
      console.error(`Failed to build lecture for ${toReviewLabel(descriptor)}: ${error?.message || error}`);
    }
  }

  await mkdir(args.outputDir, { recursive: true });
  const jsonPath = path.join(args.outputDir, "report.json");
  const mdPath = path.join(args.outputDir, "report.md");
  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(mdPath, makeMarkdown(report), "utf8");

  console.log(`Lecture build JSON written to ${jsonPath}`);
  console.log(`Lecture build Markdown written to ${mdPath}`);
  console.log(`Topics: ${report.summary.total} | built=${report.summary.success} failed=${report.summary.failed}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
