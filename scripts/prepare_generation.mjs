#!/usr/bin/env node

import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { projectRoot } from "./lib/export_runtime.mjs";
import { SCRIPT_WRITER_PROMPT_VERSION } from "./lib/lecture/llm_schema.mjs";
import { buildLectureArtifacts } from "./lib/lecture/pipeline.mjs";
import { resolveAllowScriptFallbackDefault } from "./lib/lecture/script_provider.mjs";
import { ensureLecturePlanFile } from "./lib/lecture/plan_generator.mjs";
import {
  buildCatalogSummary,
  validateTopicGenerationReadiness,
  writeTopicGenerationStatus,
} from "./lib/lecture/readiness.mjs";

function parseArgs(argv) {
  const args = {
    outputDir: path.join(projectRoot, "generated", "lectures"),
    viewport: "1920x1080",
    provider: "qwen3_tts",
    scriptProvider: process.env.WEBDECK_SCRIPT_PROVIDER || (process.env.CI ? "deterministic" : "auto"),
    scriptModel: process.env.WEBDECK_SCRIPT_MODEL || "",
    scriptEndpoint: process.env.WEBDECK_SCRIPT_ENDPOINT || process.env.OLLAMA_HOST || "http://127.0.0.1:11434",
    scriptPromptVersion: process.env.WEBDECK_SCRIPT_PROMPT_VERSION || SCRIPT_WRITER_PROMPT_VERSION,
    scriptTemperature: process.env.WEBDECK_SCRIPT_TEMPERATURE || "0.2",
    scriptMaxRetries: process.env.WEBDECK_SCRIPT_MAX_RETRIES || "2",
    scriptTimeoutMs: process.env.WEBDECK_SCRIPT_TIMEOUT_MS || "60000",
    allowScriptFallback: process.env.WEBDECK_ALLOW_SCRIPT_FALLBACK || "",
    maxSegmentsPerSlide: 8,
    maxWordsPerSegment: 28,
    maxAutoItems: 6,
    motionSampleRateFps: 6,
    voiceName: "slt",
    forcePlans: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    if (key === "debug-screenshots") {
      args.debugScreenshots = true;
      continue;
    }
    if (key === "forcePlans") {
      args.forcePlans = true;
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

function booleanOption(value, fallback = false) {
  if (value == null || value === "") return fallback;
  if (typeof value === "boolean") return value;
  return !["0", "false", "no", "off"].includes(String(value).trim().toLowerCase());
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

  const topicStatuses = [];

  for (const descriptor of topics) {
    console.log(`Preparing ${toReviewLabel(descriptor)}...`);
    const planInfo = await ensureLecturePlanFile(descriptor, { force: args.forcePlans });
    console.log(`  lecture.plan.json: ${planInfo.reused ? "reused" : "generated"} -> ${planInfo.path}`);

    let buildError = "";
    try {
      const build = await buildLectureArtifacts({
        descriptor,
        outputRoot: args.outputDir,
        providerId: args.provider,
        viewport: args.viewport,
        debugScreenshots: Boolean(args.debugScreenshots),
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
          scriptApiKey: args.scriptApiKey || "",
          scriptApiKeyFile: args.scriptApiKeyFile || "",
          scriptPromptVersion: args.scriptPromptVersion || "script_writer_v2",
          scriptTemperature: Number(args.scriptTemperature ?? 0.2),
          scriptMaxRetries: Number(args.scriptMaxRetries ?? 2),
          scriptTimeoutMs: Number(args.scriptTimeoutMs || 60000),
          topicPlanTimeoutMs: Number(args.topicPlanTimeoutMs || args.scriptTimeoutMs || 180000),
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
        },
      });
      console.log(`  artifacts: ${build.output_dir}`);
    } catch (error) {
      buildError = error?.message || String(error);
      console.error(`  build blocked: ${buildError}`);
    }

    const status = await validateTopicGenerationReadiness({
      descriptor,
      outputRoot: args.outputDir,
      buildError,
    });
    const statusPath = await writeTopicGenerationStatus(status);
    topicStatuses.push(status);
    console.log(`  readiness: ${status.readiness_state} -> ${statusPath}`);
    if (status.blocker_reasons.length) {
      status.blocker_reasons.forEach((reason) => {
        console.log(`    blocker: ${reason}`);
      });
    }
  }

  const catalog = await buildCatalogSummary(topicStatuses);
  console.log(`Catalog summary written to ${catalog.path}`);
  console.log(
    `Topics=${catalog.summary.total_topics} exportable=${catalog.summary.exportable_topics} `
    + `ready=${catalog.summary.ready_for_generation} blocked=${catalog.summary.blocked}`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
