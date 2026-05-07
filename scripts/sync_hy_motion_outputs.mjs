#!/usr/bin/env node

import os from "node:os";
import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./lib/export_runtime.mjs";
import {
  LOCAL_HY_MOTION_ROOT,
  buildExpectedHyMotionOutputs,
  findMatchingAssetsInDir,
  hyMotionOutputDirToPath,
  localHyMotionDir,
} from "./lib/lecture/hy_motion_assets.mjs";
import { relativeProjectPath } from "./lib/lecture/utils.mjs";

function parseArgs(argv) {
  const args = {
    report: path.join(projectRoot, "generated", "lectures", "hy_motion_queue.report.json"),
    sourceRoot: "",
    destRoot: LOCAL_HY_MOTION_ROOT,
    includeFbx: false,
    overwrite: false,
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    if (["includeFbx", "overwrite", "dryRun"].includes(key)) {
      args[key] = true;
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

function expandPath(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw === "~") return os.homedir();
  if (raw.startsWith("~/")) return path.join(os.homedir(), raw.slice(2));
  return path.isAbsolute(raw) ? raw : path.join(projectRoot, raw);
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function fileExists(filePath) {
  return Boolean(await stat(filePath).catch(() => null));
}

function displayPath(filePath) {
  const relative = path.relative(projectRoot, filePath);
  if (relative && !relative.startsWith("..") && !path.isAbsolute(relative)) {
    return relative.split(path.sep).join("/");
  }
  return filePath;
}

function selectorMatches(selector, filters) {
  for (const key of ["school", "course", "session", "topic"]) {
    if (filters[key] && selector?.[key] !== filters[key]) return false;
  }
  return true;
}

function expectedOutputsForPart(job, part) {
  if (part?.expected_outputs?.npz || part?.expected_outputs?.fbx) return part.expected_outputs;
  return buildExpectedHyMotionOutputs({
    npzOutputDir: job.npz_output_dir,
    fbxOutputDir: job.fbx_output_dir,
    filenamePrefix: part?.filename_prefix || job.slide_id,
  });
}

async function syncOneKind({
  kind,
  selector,
  expected,
  sourceRoot,
  destRoot,
  overwrite,
  dryRun,
}) {
  const sourceDir = hyMotionOutputDirToPath(sourceRoot, expected.output_dir);
  const matches = await findMatchingAssetsInDir(sourceDir, expected);
  const destDir = localHyMotionDir({ root: destRoot, kind, selector });
  const copied = [];
  const skipped = [];

  if (!matches.length) {
    return {
      kind,
      source_dir: displayPath(sourceDir),
      dest_dir: displayPath(destDir),
      copied,
      skipped,
      missing: true,
    };
  }

  if (!dryRun) await mkdir(destDir, { recursive: true });

  for (const sourceFile of matches) {
    const destFile = path.join(destDir, path.basename(sourceFile));
    const exists = await fileExists(destFile);
    if (exists && !overwrite) {
      skipped.push({
        source_file: displayPath(sourceFile),
        dest_file: displayPath(destFile),
        reason: "exists",
      });
      continue;
    }
    if (!dryRun) await copyFile(sourceFile, destFile);
    copied.push({
      source_file: displayPath(sourceFile),
      dest_file: displayPath(destFile),
      dry_run: dryRun,
    });
  }

  return {
    kind,
    source_dir: displayPath(sourceDir),
    dest_dir: displayPath(destDir),
    copied,
    skipped,
    missing: false,
  };
}

function makeMarkdown(report) {
  const lines = [
    "# HY Motion Output Sync Report",
    "",
    `- Queue report: \`${report.queue_report}\``,
    `- Source root: \`${report.source_root}\``,
    `- Destination root: \`${report.dest_root}\``,
    `- Include FBX: ${report.include_fbx ? "yes" : "no"}`,
    `- Dry run: ${report.dry_run ? "yes" : "no"}`,
    `- Jobs: ${report.summary.total}`,
    `- Copied files: ${report.summary.copied_files}`,
    `- Skipped files: ${report.summary.skipped_files}`,
    `- Missing parts: ${report.summary.missing_parts}`,
    "",
  ];

  report.jobs.forEach((job) => {
    lines.push(`## ${job.job_id}`);
    lines.push("");
    lines.push(`- Status: ${job.status}`);
    lines.push(`- Slide: \`${job.selector.school}/${job.selector.course}/${job.selector.session}/${job.selector.topic}/${job.slide_id}\``);
    job.parts.forEach((part) => {
      const states = part.results.map((result) => `${result.kind}:${result.missing ? "missing" : "ok"}`).join(", ");
      lines.push(`- Part ${part.index}/${part.total}: prefix=\`${part.filename_prefix}\` ${states}`);
    });
    if (job.error) lines.push(`- Error: ${job.error}`);
    lines.push("");
  });

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const reportPath = expandPath(args.report);
  const sourceRoot = expandPath(args.sourceRoot);
  const destRoot = expandPath(args.destRoot);
  const filters = {
    school: args.school || "",
    course: args.course || "",
    session: args.session || "",
    topic: args.topic || "",
    slideId: args.slideId || "",
  };

  if (!sourceRoot) {
    throw new Error("Missing --sourceRoot. Use the ComfyUI output folder or a mounted copy of it.");
  }

  const queueReport = await readJson(reportPath);
  const jobs = (Array.isArray(queueReport.jobs) ? queueReport.jobs : [])
    .filter((job) => selectorMatches(job.selector, filters))
    .filter((job) => !filters.slideId || job.slide_id === filters.slideId);

  if (!jobs.length) {
    throw new Error("No HY-Motion queue report jobs matched the selector.");
  }

  const report = {
    schema_version: "phase7-hy-motion-sync-report-v1",
    queue_report: displayPath(reportPath),
    source_root: sourceRoot,
    dest_root: displayPath(destRoot),
    include_fbx: Boolean(args.includeFbx),
    overwrite: Boolean(args.overwrite),
    dry_run: Boolean(args.dryRun),
    generated_at: new Date().toISOString(),
    jobs: [],
    summary: {
      total: jobs.length,
      copied_files: 0,
      skipped_files: 0,
      missing_parts: 0,
    },
  };

  for (const job of jobs) {
    try {
      const partReports = [];
      for (const part of Array.isArray(job.parts) ? job.parts : []) {
        const expectedOutputs = expectedOutputsForPart(job, part);
        const kinds = args.includeFbx ? ["npz", "fbx"] : ["npz"];
        const results = [];

        for (const kind of kinds) {
          const result = await syncOneKind({
            kind,
            selector: job.selector,
            expected: expectedOutputs[kind],
            sourceRoot,
            destRoot,
            overwrite: Boolean(args.overwrite),
            dryRun: Boolean(args.dryRun),
          });
          report.summary.copied_files += result.copied.length;
          report.summary.skipped_files += result.skipped.length;
          results.push(result);
        }

        if (results.some((result) => result.kind === "npz" && result.missing)) {
          report.summary.missing_parts += 1;
        }

        partReports.push({
          index: part.index,
          total: part.total,
          filename_prefix: part.filename_prefix || job.slide_id,
          expected_outputs: expectedOutputs,
          results,
        });
      }

      const missingNpz = partReports.some((part) =>
        part.results.some((result) => result.kind === "npz" && result.missing),
      );
      report.jobs.push({
        status: missingNpz ? "missing_npz" : "synced",
        job_id: job.job_id,
        slide_id: job.slide_id,
        selector: job.selector,
        timing_mode: job.timing_mode || queueReport.timing_mode || "",
        parts: partReports,
      });
      console.log(`${missingNpz ? "Missing" : "Synced"} HY motion for ${job.job_id}`);
    } catch (error) {
      report.jobs.push({
        status: "failed",
        job_id: job.job_id,
        slide_id: job.slide_id,
        selector: job.selector,
        parts: [],
        error: error?.message || String(error),
      });
      console.error(`Failed to sync ${job.job_id}: ${error?.message || error}`);
    }
  }

  await mkdir(destRoot, { recursive: true });
  const jsonPath = path.join(destRoot, "hy_motion_sync.report.json");
  const mdPath = path.join(destRoot, "hy_motion_sync.report.md");
  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(mdPath, makeMarkdown(report), "utf8");

  console.log(`HY motion sync JSON written to ${jsonPath}`);
  console.log(`HY motion sync Markdown written to ${mdPath}`);
  console.log(
    `Jobs=${report.summary.total} copied=${report.summary.copied_files} `
    + `skipped=${report.summary.skipped_files} missing_parts=${report.summary.missing_parts}`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
