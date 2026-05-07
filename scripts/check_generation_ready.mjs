#!/usr/bin/env node

import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { projectRoot } from "./lib/export_runtime.mjs";
import {
  buildCatalogSummary,
  validateTopicGenerationReadiness,
  writeTopicGenerationStatus,
} from "./lib/lecture/readiness.mjs";

function parseArgs(argv) {
  const args = {
    outputDir: path.join(projectRoot, "generated", "lectures"),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
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

  const statuses = [];
  for (const descriptor of topics) {
    const status = await validateTopicGenerationReadiness({
      descriptor,
      outputRoot: args.outputDir,
    });
    const statusPath = await writeTopicGenerationStatus(status);
    statuses.push(status);
    console.log(`${toReviewLabel(descriptor)} -> ${status.readiness_state} (${statusPath})`);
  }

  const catalog = await buildCatalogSummary(statuses);
  console.log(`Catalog summary written to ${catalog.path}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
