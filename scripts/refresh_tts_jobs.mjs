#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { buildTopicArtifactDir, projectRoot } from "./lib/export_runtime.mjs";
import { writeTtsJobs } from "./lib/lecture/jobs.mjs";
import { applyTtsNormalizationToScriptManifest } from "./lib/lecture/tts_normalization.mjs";

function parseArgs(argv) {
  const args = {
    outputDir: path.join(projectRoot, "generated", "lectures"),
    provider: "qwen3_tts",
    school: "",
    course: "",
    session: "",
    topic: "",
    qwenMode: "custom_voice",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2).replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) {
      throw new Error(`Missing value for --${token.slice(2)}`);
    }
    args[key] = value;
    index += 1;
  }

  return args;
}

function stubAlignmentManifest(scriptManifest, providerId) {
  return {
    provider: {
      id: providerId,
      config_hash: "refresh-tts-jobs",
    },
    slides: (scriptManifest.slides || []).map((slide) => ({
      slide_id: slide.slide_id,
      duration: 0,
      segments: (slide.segments || []).map((segment) => ({
        segment_id: segment.segment_id,
        t0: 0,
        t1: 0,
      })),
    })),
  };
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

  for (const descriptor of topics) {
    const artifactDir = buildTopicArtifactDir(args.outputDir, descriptor);
    const manifestPath = path.join(artifactDir, "script.manifest.json");
    const raw = JSON.parse(await readFile(manifestPath, "utf8"));
    const scriptManifest = applyTtsNormalizationToScriptManifest(raw);
    const alignmentManifest = stubAlignmentManifest(scriptManifest, args.provider);
    const jobs = await writeTtsJobs({
      descriptor,
      scriptManifest,
      alignmentManifest,
      providerId: args.provider,
      options: { qwenMode: args.qwenMode },
    });
    console.log(
      `Refreshed ${jobs.files.length} TTS jobs for ${toReviewLabel(descriptor)} `
      + `(provider=${args.provider}, tts_text on segments where speech differs).`,
    );
  }
}

main().catch((error) => {
  console.error(error?.stack || error?.message || error);
  process.exit(1);
});