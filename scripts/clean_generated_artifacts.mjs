#!/usr/bin/env node

import { readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./lib/export_runtime.mjs";
import { relativeProjectPath } from "./lib/lecture/utils.mjs";

const GENERATED_ROOT = path.join(projectRoot, "generated");

const EXACT_RELATIVE_PATHS = [
  "cache/script_provider",
  "outputs/audio",
  "outputs/alignment",
  "jobs/tts",
  "smoke",
  "validation",
  "phase4_test",
  "screenshots",
  "lectures/report.json",
  "lectures/report.md",
  "lectures/motion_refresh.report.json",
  "lectures/motion_refresh.report.md",
  "lectures/slide_video_controls.report.json",
  "lectures/slide_video_controls.report.md",
  "lectures/prof_scripts.report.json",
  "lectures/prof_scripts.report.md",
  "lectures/audio.report.json",
  "lectures/audio.report.md",
  "layout.manifest.json",
  "status/catalog_summary.json",
];

const LECTURE_TRANSIENT_DIRS = new Set(["audio", "subtitles", "review"]);
const LECTURE_TRANSIENT_FILES = new Set(["timeline.json", "tts_alignment.json"]);

function parseArgs(argv) {
  const args = {
    confirm: false,
  };

  for (const token of argv) {
    if (token === "--confirm") args.confirm = true;
    if (token === "--dry-run") args.confirm = false;
  }

  return args;
}

async function fileExists(filePath) {
  return Boolean(await stat(filePath).catch(() => null));
}

async function collectLectureTransients(dirPath, removals) {
  const entries = await readdir(dirPath, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (LECTURE_TRANSIENT_DIRS.has(entry.name)) {
        removals.add(entryPath);
        continue;
      }
      await collectLectureTransients(entryPath, removals);
      continue;
    }

    if (entry.isFile() && LECTURE_TRANSIENT_FILES.has(entry.name)) {
      removals.add(entryPath);
    }
  }
}

async function collectRemovals() {
  const removals = new Set();
  for (const relativePath of EXACT_RELATIVE_PATHS) {
    const absolutePath = path.join(GENERATED_ROOT, relativePath);
    if (await fileExists(absolutePath)) removals.add(absolutePath);
  }

  await collectLectureTransients(path.join(GENERATED_ROOT, "lectures"), removals);
  return Array.from(removals).sort();
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const removals = await collectRemovals();

  console.log(`${args.confirm ? "Deleting" : "Dry run"} ${removals.length} generated artifact paths.`);
  for (const item of removals) {
    console.log(`- ${relativeProjectPath(item)}`);
  }

  if (!args.confirm) {
    console.log("No files were removed. Re-run with --confirm to apply this cleanup.");
    return;
  }

  for (const item of removals) {
    await rm(item, { recursive: true, force: true });
  }
  console.log("Generated cleanup complete.");
}

main()
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
