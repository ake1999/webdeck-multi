#!/usr/bin/env node

import path from "node:path";
import { convertCalculusMaterialToTopic } from "./lib/calculus/material_converter.mjs";
import { projectRoot } from "./lib/export_runtime.mjs";

const BOOLEAN_FLAGS = new Set(["force", "dry-run"]);

function normalizeKey(key) {
  return key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function parseArgs(argv) {
  const args = {
    school: "AU",
    course: "ARIAN_Calculus_1",
    session: "S01",
    outputRoot: path.join(projectRoot, "courses"),
    force: false,
    dryRun: false,
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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.material && !args.materialPath) {
    args.materialPath = args.material;
  }
  const result = await convertCalculusMaterialToTopic(args);
  console.log(JSON.stringify({
    source: result.sourcePath,
    topic: result.descriptor.topic,
    descriptor: {
      school: result.descriptor.school,
      course: result.descriptor.course,
      session: result.descriptor.session,
      topic: result.descriptor.topic,
    },
    slides: path.relative(projectRoot, result.slidesPath),
    lecture_plan: path.relative(projectRoot, result.planPath),
    slide_count: result.slideCount,
    plan_issues: result.planIssueCount,
    plan_warnings: result.planWarningCount,
    dry_run: result.dryRun,
  }, null, 2));
}

main().catch((error) => {
  console.error(error?.stack || error?.message || error);
  process.exit(1);
});
