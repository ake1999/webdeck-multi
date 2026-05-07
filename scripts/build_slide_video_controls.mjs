#!/usr/bin/env node

import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { projectRoot } from "./lib/export_runtime.mjs";
import { buildJobsDir } from "./lib/lecture/contracts.mjs";
import {
  buildSlideVideoControlsForJob,
  validateSlideVideoControls,
  writeSlideVideoControls,
} from "./lib/lecture/slide_video_controls.mjs";
import { relativeProjectPath } from "./lib/lecture/utils.mjs";

function parseArgs(argv) {
  const args = {
    promptEndpoint: process.env.WEBDECK_MOTION_PROMPT_ENDPOINT || process.env.OLLAMA_HOST || "http://10.0.0.16:11434",
    promptModel: process.env.WEBDECK_MOTION_PROMPT_MODEL || "mistral-nemo:latest",
    promptTemperature: process.env.WEBDECK_MOTION_PROMPT_TEMPERATURE || "0.15",
    promptTimeoutMs: process.env.WEBDECK_MOTION_PROMPT_TIMEOUT_MS || "60000",
    promptVersion: "kimodo_instructor_v001",
    fps: 30,
    overwrite: false,
    dryRun: false,
    allowDeterministicPrompts: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    if (["overwrite", "dryRun"].includes(key)) {
      args[key] = true;
      continue;
    }
    if (key === "allowDeterministicPromptsForTests") {
      args.allowDeterministicPrompts = true;
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

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function fileExists(filePath) {
  return Boolean(await stat(filePath).catch(() => null));
}

function absoluteProjectPath(value) {
  if (!value) return "";
  return path.isAbsolute(value) ? value : path.join(projectRoot, value);
}

async function collectSlideVideoJobs(selector, specificJob = "") {
  if (specificJob) {
    const filePath = absoluteProjectPath(specificJob);
    const job = await readJson(filePath);
    if (selector.slideId && job.slide_id !== selector.slideId) return [];
    return [{
      descriptor: job.selector,
      filePath,
      relativePath: relativeProjectPath(filePath),
      job: {
        ...job,
        job_file: relativeProjectPath(filePath),
      },
    }];
  }

  const topics = filterTopics(await discoverTopics(), selector);
  const jobs = [];

  for (const descriptor of topics) {
    const jobsDir = buildJobsDir("slide_video", descriptor);
    if (!await fileExists(jobsDir)) continue;
    const entries = (await readdir(jobsDir)).filter((name) => name.endsWith(".json")).sort();
    for (const entry of entries) {
      const filePath = path.join(jobsDir, entry);
      const job = await readJson(filePath);
      if (selector.slideId && job.slide_id !== selector.slideId) continue;
      jobs.push({
        descriptor,
        filePath,
        relativePath: relativeProjectPath(filePath),
        job: {
          ...job,
          job_file: relativeProjectPath(filePath),
        },
      });
    }
  }

  return jobs;
}

function makeMarkdown(report) {
  const lines = [
    "# Slide Video AI-1 Controls Report",
    "",
    `- Selector: \`${report.selector}\``,
    `- Prompt endpoint: \`${report.prompt_endpoint}\``,
    `- Prompt model: \`${report.prompt_model}\``,
    `- Dry run: ${report.dry_run ? "yes" : "no"}`,
    `- Jobs: ${report.summary.total}`,
    `- Written: ${report.summary.written}`,
    `- Failed: ${report.summary.failed}`,
    "",
  ];

  report.jobs.forEach((item) => {
    lines.push(`## ${item.job_id}`);
    lines.push("");
    lines.push(`- Status: ${item.status}`);
    lines.push(`- Slide: \`${item.selector.school}/${item.selector.course}/${item.selector.session}/${item.selector.topic}/${item.slide_id}\``);
    if (item.motion_requests_file) lines.push(`- Motion requests: \`${item.motion_requests_file}\``);
    if (item.avatar_plan_file) lines.push(`- Avatar plan: \`${item.avatar_plan_file}\``);
    if (item.motion_request_count != null) lines.push(`- Motion requests count: ${item.motion_request_count}`);
    if (item.segment_count != null) lines.push(`- Segment count: ${item.segment_count}`);
    if (item.error) lines.push(`- Error: ${item.error}`);
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
    slideId: args.slideId || "",
  };
  const jobs = await collectSlideVideoJobs(selector, args.job || "");
  if (!jobs.length) {
    throw new Error(`No slide video jobs matched selector ${summarizeSelector(selector)}.`);
  }

  const report = {
    schema_version: "phase7-slide-video-ai1-controls-report-v1",
    selector: summarizeSelector(selector),
    generated_at: new Date().toISOString(),
    prompt_endpoint: args.allowDeterministicPrompts ? "" : args.promptEndpoint,
    prompt_model: args.allowDeterministicPrompts ? "deterministic_test_prompt" : args.promptModel,
    dry_run: Boolean(args.dryRun),
    jobs: [],
    summary: {
      total: jobs.length,
      written: 0,
      failed: 0,
    },
  };

  for (const item of jobs) {
    const { descriptor, job } = item;
    try {
      const controls = await buildSlideVideoControlsForJob({
        job,
        options: {
          fps: Number(args.fps || 30),
          promptEndpoint: args.promptEndpoint,
          promptModel: args.promptModel,
          promptTemperature: Number(args.promptTemperature ?? 0.15),
          promptTimeoutMs: Number(args.promptTimeoutMs || 60000),
          promptVersion: args.promptVersion || "kimodo_instructor_v001",
          allowDeterministicPrompts: Boolean(args.allowDeterministicPrompts),
        },
      });
      const validation = validateSlideVideoControls({
        motionRequests: controls.motionRequests,
        avatarPlan: controls.avatarPlan,
      });
      if (!validation.valid) {
        throw new Error(`Generated invalid controls: ${validation.errors.join(" ")}`);
      }

      if (!args.dryRun) {
        await writeSlideVideoControls({
          job,
          motionRequests: controls.motionRequests,
          avatarPlan: controls.avatarPlan,
          report: controls.report,
          outputPaths: controls.outputPaths,
          overwrite: Boolean(args.overwrite),
        });
      }

      report.summary.written += args.dryRun ? 0 : 1;
      report.jobs.push({
        status: args.dryRun ? "dry_run" : "written",
        job_id: job.job_id,
        selector: job.selector,
        slide_id: job.slide_id,
        motion_requests_file: relativeProjectPath(controls.outputPaths.motionRequests),
        avatar_plan_file: relativeProjectPath(controls.outputPaths.avatarPlan),
        report_file: relativeProjectPath(controls.outputPaths.report),
        motion_request_count: controls.motionRequests.requests.length,
        segment_count: controls.avatarPlan.segments.length,
      });
      console.log(`${args.dryRun ? "Prepared" : "Wrote"} AI-1 controls for ${toReviewLabel(descriptor)} / ${job.slide_id}`);
    } catch (error) {
      report.summary.failed += 1;
      report.jobs.push({
        status: "failed",
        job_id: job.job_id,
        selector: job.selector,
        slide_id: job.slide_id,
        error: error?.message || String(error),
      });
      console.error(`Failed AI-1 controls for ${toReviewLabel(descriptor)} / ${job.slide_id}: ${error?.message || error}`);
    }
  }

  const reportDir = path.join(projectRoot, "generated", "lectures");
  await mkdir(reportDir, { recursive: true });
  const jsonPath = path.join(reportDir, "slide_video_controls.report.json");
  const mdPath = path.join(reportDir, "slide_video_controls.report.md");
  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(mdPath, makeMarkdown(report), "utf8");

  console.log(`AI-1 controls JSON report written to ${jsonPath}`);
  console.log(`AI-1 controls Markdown report written to ${mdPath}`);
  console.log(`Jobs=${report.summary.total} written=${report.summary.written} failed=${report.summary.failed}`);

  if (report.summary.failed > 0) {
    process.exitCode = 1;
  }
}

main()
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
