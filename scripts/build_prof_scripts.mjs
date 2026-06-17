#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { projectRoot } from "./lib/export_runtime.mjs";
import { SCRIPT_WRITER_PROMPT_VERSION } from "./lib/lecture/llm_schema.mjs";
import { buildLectureScriptArtifacts } from "./lib/lecture/pipeline.mjs";
import { resolveAllowScriptFallbackDefault } from "./lib/lecture/script_provider.mjs";

const BOOLEAN_FLAGS = new Set(["debug-screenshots", "write-report"]);

function normalizeKey(key) {
  return key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function parseArgs(argv) {
  const args = {
    outputDir: path.join(projectRoot, "generated", "lectures"),
    viewport: "1920x1080",
    scriptProvider: process.env.WEBDECK_SCRIPT_PROVIDER || (process.env.CI ? "deterministic" : "auto"),
    scriptModel: process.env.WEBDECK_SCRIPT_MODEL || "",
    scriptEndpoint: process.env.WEBDECK_SCRIPT_ENDPOINT || process.env.OLLAMA_HOST || "http://127.0.0.1:11434",
    scriptPromptVersion: process.env.WEBDECK_SCRIPT_PROMPT_VERSION || SCRIPT_WRITER_PROMPT_VERSION,
    scriptTemperature: process.env.WEBDECK_SCRIPT_TEMPERATURE || "0.2",
    scriptMaxRetries: process.env.WEBDECK_SCRIPT_MAX_RETRIES || "2",
    scriptTimeoutMs: process.env.WEBDECK_SCRIPT_TIMEOUT_MS || "60000",
    topicPlanTimeoutMs: process.env.WEBDECK_TOPIC_PLAN_TIMEOUT_MS || process.env.WEBDECK_SCRIPT_TIMEOUT_MS || "180000",
    allowScriptFallback: process.env.WEBDECK_ALLOW_SCRIPT_FALLBACK || "",
    debugScreenshots: false,
    writeReport: false,
    maxSegmentsPerSlide: 8,
    maxWordsPerSegment: 28,
    maxAutoItems: 6,
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

function makeOptions(args) {
  return {
    maxSegmentsPerSlide: Number(args.maxSegmentsPerSlide),
    maxWordsPerSegment: Number(args.maxWordsPerSegment),
    maxAutoItems: Number(args.maxAutoItems),
    voiceName: args.voiceName,
    scriptPolicy: args.scriptPolicy || "teacher_clear_concise",
    scriptProvider: args.scriptProvider,
    scriptModel: args.scriptModel || "",
    scriptEndpoint: args.scriptEndpoint || "",
    scriptApiKey: args.scriptApiKey || "",
    scriptApiKeyFile: args.scriptApiKeyFile || "",
    scriptPromptVersion: args.scriptPromptVersion || "script_writer_v2",
    scriptTemperature: Number(args.scriptTemperature ?? 0.2),
    scriptMaxRetries: Number(args.scriptMaxRetries ?? 2),
    scriptTimeoutMs: Number(args.scriptTimeoutMs || 60000),
    topicPlanTimeoutMs: Number(args.topicPlanTimeoutMs || args.scriptTimeoutMs || 180000),
    topicPlanMode: args.topicPlanMode || "",
    topicPlanMaxRetries: Number(args.topicPlanMaxRetries ?? args.scriptMaxRetries ?? 2),
    allowScriptFallback: args.allowScriptFallback !== ""
      ? args.allowScriptFallback
      : resolveAllowScriptFallbackDefault({
        scriptProvider: args.scriptProvider,
        scriptModel: args.scriptModel || "",
      }),
    forceScriptComparison: args.forceScriptComparison || "",
    scriptOverride: args.scriptOverride || "",
    lecturePlan: args.lecturePlan || "",
    avatarProfile: args.avatarProfile || "",
    referenceAssets: args.referenceAssets || "",
  };
}

function makeMarkdown(report) {
  const lines = [
    "# Professor Script Build Report",
    "",
    `- Selector: \`${report.selector}\``,
    `- Script provider: \`${report.script_provider}\``,
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
      lines.push(`- Script: \`${topic.script_manifest}\``);
      if (topic.topic_plan) lines.push(`- Topic plan: \`${topic.topic_plan}\``);
      lines.push(`- Slides: ${topic.slide_count}`);
      lines.push(`- Providers: \`${JSON.stringify(topic.provider_counts || {})}\``);
      for (const warning of topic.authoring_warnings || []) {
        lines.push(`- Authoring warning: ${warning}`);
      }
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
      const built = await buildLectureScriptArtifacts({
        descriptor,
        outputRoot: args.outputDir,
        viewport: args.viewport,
        debugScreenshots: args.debugScreenshots,
        analysisTimeoutMs: args.analysisTimeoutMs,
        analysisAssetTimeoutMs: args.analysisAssetTimeoutMs,
        options: makeOptions(args),
      });
      report.summary.success += 1;
      report.topics.push({
        status: "success",
        ...built,
      });
      console.log(`Built professor scripts for ${toReviewLabel(descriptor)} -> ${built.script_manifest}`);
    } catch (error) {
      report.summary.failed += 1;
      report.topics.push({
        status: "failed",
        descriptor,
        error: error?.message || String(error),
      });
      console.error(`Failed professor scripts for ${toReviewLabel(descriptor)}: ${error?.message || error}`);
    }
  }

  if (args.writeReport) {
    await mkdir(args.outputDir, { recursive: true });
    const jsonPath = path.join(args.outputDir, "prof_scripts.report.json");
    const mdPath = path.join(args.outputDir, "prof_scripts.report.md");
    await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    await writeFile(mdPath, makeMarkdown(report), "utf8");
    console.log(`Professor script JSON report written to ${jsonPath}`);
    console.log(`Professor script Markdown report written to ${mdPath}`);
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
