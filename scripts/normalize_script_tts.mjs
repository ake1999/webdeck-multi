#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { buildTopicArtifactDir, projectRoot } from "./lib/export_runtime.mjs";
import {
  applyTtsNormalizationToScriptManifest,
  auditTtsNormalization,
} from "./lib/lecture/tts_normalization.mjs";
import { relativeProjectPath } from "./lib/lecture/utils.mjs";

function parseArgs(argv) {
  const args = {
    outputDir: path.join(projectRoot, "generated", "lectures"),
    school: "",
    course: "",
    session: "",
    topic: "",
    manifest: "",
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    if (key === "dry-run") {
      args.dryRun = true;
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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const targets = [];

  if (args.manifest) {
    targets.push({ manifestPath: path.resolve(projectRoot, args.manifest) });
  } else {
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
      targets.push({
        descriptor,
        manifestPath: path.join(buildTopicArtifactDir(args.outputDir, descriptor), "script.manifest.json"),
      });
    }
  }

  for (const target of targets) {
    const raw = await readFile(target.manifestPath, "utf8");
    const manifest = JSON.parse(raw);
    const changes = auditTtsNormalization(manifest);
    const label = target.descriptor ? toReviewLabel(target.descriptor) : relativeProjectPath(target.manifestPath);

    if (!changes.length) {
      console.log(`${label}: TTS normalization already up to date.`);
      continue;
    }

    console.log(`${label}: updating ${changes.length} segment(s).`);
    changes.slice(0, 5).forEach((change) => {
      console.log(`  ${change.slide_id}/${change.segment_id}`);
      console.log(`    display: ${change.display_text}`);
      console.log(`    speech:  ${change.expected_tts_text}`);
    });
    if (changes.length > 5) {
      console.log(`  ... and ${changes.length - 5} more`);
    }

    if (args.dryRun) continue;

    const normalized = applyTtsNormalizationToScriptManifest(manifest);
    await writeFile(target.manifestPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
    console.log(`  wrote ${relativeProjectPath(target.manifestPath)}`);
  }
}

main().catch((error) => {
  console.error(error?.stack || error?.message || error);
  process.exit(1);
});