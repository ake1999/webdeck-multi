#!/usr/bin/env node

import { spawn } from "node:child_process";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { projectRoot } from "./lib/export_runtime.mjs";
import { JOB_STATUS_SCHEMA_VERSION, buildJobStatusPath, buildJobsDir } from "./lib/lecture/contracts.mjs";
import {
  LOCAL_HY_MOTION_ROOT,
  findMatchingAssetsInDir,
  localHyMotionDir,
} from "./lib/lecture/hy_motion_assets.mjs";
import { relativeProjectPath } from "./lib/lecture/utils.mjs";

function parseArgs(argv) {
  const args = {
    rendererCommand: process.env.WEBDECK_SLIDE_VIDEO_RENDERER || "",
    motionRoot: LOCAL_HY_MOTION_ROOT,
    queueReport: path.join(projectRoot, "generated", "lectures", "hy_motion_queue.report.json"),
    packetRoot: path.join(projectRoot, "generated", "cache", "slide_video_render"),
    overwrite: false,
    dryRun: false,
    allowMissingMotionAsset: false,
    maxJobs: 0,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    if (["overwrite", "dryRun", "allowMissingMotionAsset"].includes(key)) {
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

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function readJsonIfExists(filePath) {
  try {
    return await readJson(filePath);
  } catch {
    return null;
  }
}

async function fileExists(filePath) {
  return Boolean(await stat(filePath).catch(() => null));
}

function absoluteProjectPath(value) {
  if (!value) return "";
  return path.isAbsolute(value) ? value : path.join(projectRoot, value);
}

function statusPathForJob(job) {
  return buildJobStatusPath(job.selector, "slide_video", job.slide_id);
}

function nowIso() {
  return new Date().toISOString();
}

async function writeStatus(statusPath, job, state, options = {}) {
  await mkdir(path.dirname(statusPath), { recursive: true });
  const payload = {
    schema_version: JOB_STATUS_SCHEMA_VERSION,
    job_id: job.job_id,
    kind: "slide_video",
    state,
    contract_hash: job.contract_hash,
    output_file: job.output_file,
    secondary_output_files: Array.isArray(job.secondary_output_files) ? job.secondary_output_files.slice() : [],
    reused: Boolean(options.reused),
    updated_at: nowIso(),
  };
  if (options.startedAt) payload.started_at = options.startedAt;
  if (options.error) payload.error = options.error;
  if (options.render_packet_file) payload.render_packet_file = options.render_packet_file;
  if (options.motion_assets) payload.motion_assets = options.motion_assets;
  if (options.renderer_command) payload.renderer_command = options.renderer_command;
  await writeFile(statusPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return payload;
}

async function collectSlideVideoJobs(selector, specificJob = "") {
  if (specificJob) {
    const filePath = absoluteProjectPath(specificJob);
    const job = await readJson(filePath);
    return [{
      descriptor: job.selector,
      filePath,
      relativePath: relativeProjectPath(filePath),
      job,
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
        job,
      });
    }
  }

  return jobs;
}

function topicArtifactDirFromJob(job) {
  if (job.motion_manifest_file) {
    return path.dirname(path.dirname(absoluteProjectPath(job.motion_manifest_file)));
  }
  return path.join(
    projectRoot,
    "generated",
    "lectures",
    job.selector.school,
    job.selector.course,
    job.selector.session,
    job.selector.topic,
  );
}

function findQueueJob(queueReport, job) {
  const jobs = Array.isArray(queueReport?.jobs) ? queueReport.jobs : [];
  return jobs.find((item) =>
    item.job_id === job.job_id
    || (
      item.slide_id === job.slide_id
      && item.selector?.school === job.selector.school
      && item.selector?.course === job.selector.course
      && item.selector?.session === job.selector.session
      && item.selector?.topic === job.selector.topic
    ),
  ) || null;
}

async function resolveHyMotionAssets({ job, queueJob, motionRoot }) {
  const parts = Array.isArray(queueJob?.parts) && queueJob.parts.length
    ? queueJob.parts
    : [{
      index: 1,
      total: 1,
      t0: 0,
      t1: Number(job.duration_sec || 0),
      duration_sec: Number(job.duration_sec || 0),
      stretch_factor: 1,
      filename_prefix: job.slide_id,
    }];
  const npzDir = localHyMotionDir({ root: motionRoot, kind: "npz", selector: job.selector });
  const resolvedParts = [];

  for (const part of parts) {
    const expected = {
      filename_prefix: part.filename_prefix || job.slide_id,
      ext: "npz",
    };
    const matches = await findMatchingAssetsInDir(npzDir, expected);
    resolvedParts.push({
      index: part.index || resolvedParts.length + 1,
      total: part.total || parts.length,
      t0: Number(part.t0 || 0),
      t1: Number(part.t1 || job.duration_sec || 0),
      generated_duration_sec: Number(part.duration_sec || 0),
      stretch_factor: Number(part.stretch_factor || 1),
      filename_prefix: expected.filename_prefix,
      npz_files: matches.map(relativeProjectPath),
      missing: matches.length === 0,
    });
  }

  return {
    local_root: relativeProjectPath(motionRoot),
    npz_dir: relativeProjectPath(npzDir),
    timing_mode: queueJob?.timing_mode || "",
    queue_prompt_ids: parts.map((part) => part.prompt_id || "").filter(Boolean),
    parts: resolvedParts,
    missing_parts: resolvedParts.filter((part) => part.missing).map((part) => part.filename_prefix),
  };
}

function slideSummary(slideMotion) {
  const slide = slideMotion?.slide || {};
  const samples = Array.isArray(slide.samples) ? slide.samples : [];
  const cues = Array.isArray(slide.cues) ? slide.cues : [];
  return {
    duration_sec: Number(slide.duration || 0),
    sample_rate_fps: Number(slideMotion?.sample_rate_fps || 0),
    cue_count: cues.length,
    sample_count: samples.length,
    first_root_xy: samples[0] ? [samples[0].root_x, samples[0].root_y] : null,
    last_root_xy: samples.at(-1) ? [samples.at(-1).root_x, samples.at(-1).root_y] : null,
    carry_pose_in: slide.carry_pose_in || null,
    carry_pose_out: slide.carry_pose_out || null,
  };
}

function findSlideAlignment(alignment, slideId) {
  return (Array.isArray(alignment?.slides) ? alignment.slides : []).find((slide) => slide.slide_id === slideId) || null;
}

function findSlideScript(scriptManifest, slideId) {
  return (Array.isArray(scriptManifest?.slides) ? scriptManifest.slides : []).find((slide) => slide.slide_id === slideId) || null;
}

async function buildRenderPacket({ jobItem, queueJob, motionRoot, packetRoot }) {
  const { job, filePath } = jobItem;
  const topicDir = topicArtifactDirFromJob(job);
  const paths = {
    job_file: filePath,
    audio_file: absoluteProjectPath(job.resolved_audio_file),
    alignment_file: absoluteProjectPath(job.resolved_alignment_file),
    motion_manifest_file: absoluteProjectPath(job.motion_manifest_file),
    topic_motion_manifest_file: absoluteProjectPath(job.topic_motion_manifest_file),
    layout_manifest_file: path.join(topicDir, "layout.manifest.json"),
    script_manifest_file: path.join(topicDir, "script.manifest.json"),
    screenshot_file: path.join(topicDir, "screenshots", `${job.slide_id}.png`),
    output_file: absoluteProjectPath(job.output_file),
    mp4_output_file: absoluteProjectPath(job.secondary_output_files?.[0] || ""),
  };

  const requiredInputs = [
    ["audio_file", paths.audio_file],
    ["alignment_file", paths.alignment_file],
    ["motion_manifest_file", paths.motion_manifest_file],
    ["layout_manifest_file", paths.layout_manifest_file],
    ["script_manifest_file", paths.script_manifest_file],
  ];
  const missingInputs = [];
  for (const [name, file] of requiredInputs) {
    if (!file || !await fileExists(file)) missingInputs.push(name);
  }

  const slideMotion = missingInputs.includes("motion_manifest_file") ? null : await readJson(paths.motion_manifest_file);
  const alignment = missingInputs.includes("alignment_file") ? null : await readJson(paths.alignment_file);
  const scriptManifest = missingInputs.includes("script_manifest_file") ? null : await readJson(paths.script_manifest_file);
  const motionAssets = await resolveHyMotionAssets({ job, queueJob, motionRoot });

  const packetDir = path.join(
    packetRoot,
    job.selector.school,
    job.selector.course,
    job.selector.session,
    job.selector.topic,
  );
  const packetPath = path.join(packetDir, `${job.slide_id}.render_packet.json`);
  const packet = {
    schema_version: "phase7-slide-video-render-packet-v1",
    created_at: nowIso(),
    job,
    inputs: {
      job_file: relativeProjectPath(paths.job_file),
      audio_file: relativeProjectPath(paths.audio_file),
      alignment_file: relativeProjectPath(paths.alignment_file),
      motion_manifest_file: relativeProjectPath(paths.motion_manifest_file),
      topic_motion_manifest_file: paths.topic_motion_manifest_file ? relativeProjectPath(paths.topic_motion_manifest_file) : "",
      layout_manifest_file: relativeProjectPath(paths.layout_manifest_file),
      script_manifest_file: relativeProjectPath(paths.script_manifest_file),
      screenshot_file: await fileExists(paths.screenshot_file) ? relativeProjectPath(paths.screenshot_file) : "",
      hy_motion: motionAssets,
    },
    summaries: {
      motion: slideMotion ? slideSummary(slideMotion) : null,
      alignment_slide_duration_sec: findSlideAlignment(alignment, job.slide_id)?.duration ?? null,
      script_segment_count: Array.isArray(findSlideScript(scriptManifest, job.slide_id)?.segments)
        ? findSlideScript(scriptManifest, job.slide_id).segments.length
        : null,
    },
    output: {
      webm_file: relativeProjectPath(paths.output_file),
      mp4_file: paths.mp4_output_file ? relativeProjectPath(paths.mp4_output_file) : "",
      viewport: Array.isArray(job.viewport) ? job.viewport : [1920, 1080],
      background: "transparent",
      contains_audio: false,
      duration_sec: Number(job.duration_sec || 0),
    },
    renderer_expectations: {
      use_audio_for_lip_sync_only: true,
      render_silent_alpha_webm: true,
      fixed_camera: true,
      retime_compress12_motion: motionAssets.parts.some((part) => Number(part.stretch_factor || 1) !== 1),
    },
  };

  return {
    packet,
    packetPath,
    paths,
    missingInputs,
    motionAssets,
  };
}

function shellQuote(value) {
  return `'${String(value).replaceAll("'", "'\\''")}'`;
}

function expandRendererCommand(template, context) {
  if (template.includes("{packet}") || template.includes("{output}") || template.includes("{mp4}") || template.includes("{job}")) {
    return template
      .replaceAll("{packet}", shellQuote(context.packetPath))
      .replaceAll("{output}", shellQuote(context.outputPath))
      .replaceAll("{mp4}", shellQuote(context.mp4Path || ""))
      .replaceAll("{job}", shellQuote(context.jobPath));
  }
  return `${template} ${shellQuote(context.packetPath)}`;
}

async function runRendererCommand(command, env) {
  return await new Promise((resolve, reject) => {
    const child = spawn(command, {
      cwd: projectRoot,
      env: { ...process.env, ...env },
      shell: true,
      stdio: "inherit",
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`Renderer command failed with ${signal || `exit code ${code}`}.`));
    });
  });
}

function makeMarkdown(report) {
  const lines = [
    "# Slide Video Render Report",
    "",
    `- Selector: \`${report.selector}\``,
    `- Renderer command: \`${report.renderer_command || ""}\``,
    `- Render enabled: ${report.render_enabled ? "yes" : "no"}`,
    `- Dry run: ${report.dry_run ? "yes" : "no"}`,
    `- Jobs: ${report.summary.total}`,
    `- Ready: ${report.summary.ready}`,
    `- Rendered: ${report.summary.rendered}`,
    `- Reused: ${report.summary.reused}`,
    `- Blocked: ${report.summary.blocked}`,
    `- Failed: ${report.summary.failed}`,
    "",
  ];

  report.jobs.forEach((item) => {
    lines.push(`## ${item.job_id}`);
    lines.push("");
    lines.push(`- Status: ${item.status}`);
    lines.push(`- Slide: \`${item.selector.school}/${item.selector.course}/${item.selector.session}/${item.selector.topic}/${item.slide_id}\``);
    lines.push(`- Packet: \`${item.render_packet_file || ""}\``);
    lines.push(`- Output: \`${item.output_file || ""}\``);
    if (item.missing_inputs?.length) lines.push(`- Missing inputs: ${item.missing_inputs.join(", ")}`);
    if (item.missing_motion_parts?.length) lines.push(`- Missing HY-Motion NPZ: ${item.missing_motion_parts.join(", ")}`);
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
  const motionRoot = absoluteProjectPath(args.motionRoot);
  const packetRoot = absoluteProjectPath(args.packetRoot);
  const queueReport = await readJsonIfExists(absoluteProjectPath(args.queueReport));
  let jobs = await collectSlideVideoJobs(selector, args.job || "");
  if (Number(args.maxJobs || 0) > 0) jobs = jobs.slice(0, Number(args.maxJobs));
  if (!jobs.length) {
    throw new Error(`No slide video jobs matched selector ${summarizeSelector(selector)}.`);
  }

  const renderEnabled = Boolean(args.rendererCommand) && !args.dryRun;
  const report = {
    schema_version: "phase7-slide-video-render-report-v1",
    selector: summarizeSelector(selector),
    renderer_command: args.rendererCommand || "",
    render_enabled: renderEnabled,
    dry_run: Boolean(args.dryRun),
    allow_missing_motion_asset: Boolean(args.allowMissingMotionAsset),
    motion_root: relativeProjectPath(motionRoot),
    queue_report: args.queueReport ? relativeProjectPath(absoluteProjectPath(args.queueReport)) : "",
    generated_at: nowIso(),
    jobs: [],
    summary: {
      total: jobs.length,
      ready: 0,
      rendered: 0,
      reused: 0,
      blocked: 0,
      failed: 0,
    },
  };

  for (const jobItem of jobs) {
    const { descriptor, job } = jobItem;
    const outputPath = absoluteProjectPath(job.output_file);
    const statusPath = statusPathForJob(job);
    try {
      const existingStatus = await readJsonIfExists(statusPath);
      if (!args.overwrite && existingStatus?.state === "done" && existingStatus.contract_hash === job.contract_hash && await fileExists(outputPath)) {
        report.summary.reused += 1;
        report.jobs.push({
          status: "reused",
          job_id: job.job_id,
          slide_id: job.slide_id,
          selector: job.selector,
          output_file: job.output_file,
        });
        console.log(`Reused existing slide video for ${toReviewLabel(descriptor)} / ${job.slide_id}`);
        continue;
      }

      const queueJob = findQueueJob(queueReport, job);
      const renderPacket = await buildRenderPacket({
        jobItem,
        queueJob,
        motionRoot,
        packetRoot,
      });
      const missingMotionParts = renderPacket.motionAssets.missing_parts;
      const blockingInputs = [
        ...renderPacket.missingInputs,
        ...(args.allowMissingMotionAsset ? [] : missingMotionParts.map((part) => `hy_motion_npz:${part}`)),
      ];

      if (!args.dryRun) {
        await mkdir(path.dirname(renderPacket.packetPath), { recursive: true });
        await writeFile(renderPacket.packetPath, `${JSON.stringify(renderPacket.packet, null, 2)}\n`, "utf8");
      }

      const renderPacketFile = relativeProjectPath(renderPacket.packetPath);
      if (blockingInputs.length) {
        report.summary.blocked += 1;
        if (renderEnabled) {
          await writeStatus(statusPath, job, "error", {
            error: `Missing required render inputs: ${blockingInputs.join(", ")}`,
            render_packet_file: renderPacketFile,
            motion_assets: renderPacket.motionAssets,
          });
        }
        report.jobs.push({
          status: "blocked",
          job_id: job.job_id,
          slide_id: job.slide_id,
          selector: job.selector,
          render_packet_file: renderPacketFile,
          output_file: job.output_file,
          missing_inputs: renderPacket.missingInputs,
          missing_motion_parts: missingMotionParts,
        });
        console.log(`Blocked slide video for ${toReviewLabel(descriptor)} / ${job.slide_id}: ${blockingInputs.join(", ")}`);
        continue;
      }

      report.summary.ready += 1;
      if (!renderEnabled) {
        report.jobs.push({
          status: "ready",
          job_id: job.job_id,
          slide_id: job.slide_id,
          selector: job.selector,
          render_packet_file: renderPacketFile,
          output_file: job.output_file,
          missing_inputs: [],
          missing_motion_parts: [],
        });
        console.log(`Ready slide video packet for ${toReviewLabel(descriptor)} / ${job.slide_id}`);
        continue;
      }

      const startedAt = nowIso();
      await writeStatus(statusPath, job, "running", {
        startedAt,
        render_packet_file: renderPacketFile,
        motion_assets: renderPacket.motionAssets,
        renderer_command: args.rendererCommand,
      });

      await mkdir(path.dirname(outputPath), { recursive: true });
      const rendererCommand = expandRendererCommand(args.rendererCommand, {
        packetPath: renderPacket.packetPath,
        outputPath,
        mp4Path: absoluteProjectPath(job.secondary_output_files?.[0] || ""),
        jobPath: jobItem.filePath,
      });
      await runRendererCommand(rendererCommand, {
        WEBDECK_RENDER_PACKET: renderPacket.packetPath,
        WEBDECK_SLIDE_VIDEO_OUTPUT: outputPath,
        WEBDECK_SLIDE_VIDEO_MP4: absoluteProjectPath(job.secondary_output_files?.[0] || ""),
        WEBDECK_JOB_FILE: jobItem.filePath,
        WEBDECK_AUDIO_FILE: renderPacket.paths.audio_file,
        WEBDECK_ALIGNMENT_FILE: renderPacket.paths.alignment_file,
        WEBDECK_MOTION_FILE: renderPacket.paths.motion_manifest_file,
        WEBDECK_HY_MOTION_NPZ: renderPacket.motionAssets.parts
          .flatMap((part) => part.npz_files)
          .map(absoluteProjectPath)
          .join(path.delimiter),
      });

      if (!await fileExists(outputPath)) {
        throw new Error(`Renderer completed but output file was not written: ${job.output_file}`);
      }

      await writeStatus(statusPath, job, "done", {
        startedAt,
        render_packet_file: renderPacketFile,
        motion_assets: renderPacket.motionAssets,
        renderer_command: args.rendererCommand,
      });
      report.summary.rendered += 1;
      report.jobs.push({
        status: "rendered",
        job_id: job.job_id,
        slide_id: job.slide_id,
        selector: job.selector,
        render_packet_file: renderPacketFile,
        output_file: job.output_file,
      });
      console.log(`Rendered slide video for ${toReviewLabel(descriptor)} / ${job.slide_id}`);
    } catch (error) {
      report.summary.failed += 1;
      if (renderEnabled) {
        await writeStatus(statusPath, job, "error", {
          error: error?.message || String(error),
          renderer_command: args.rendererCommand,
        });
      }
      report.jobs.push({
        status: "failed",
        job_id: job.job_id,
        slide_id: job.slide_id,
        selector: job.selector,
        output_file: job.output_file,
        error: error?.message || String(error),
      });
      console.error(`Failed slide video for ${job.job_id}: ${error?.message || error}`);
    }
  }

  const reportDir = path.join(projectRoot, "generated", "lectures");
  await mkdir(reportDir, { recursive: true });
  const jsonPath = path.join(reportDir, "slide_video_render.report.json");
  const mdPath = path.join(reportDir, "slide_video_render.report.md");
  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(mdPath, makeMarkdown(report), "utf8");

  console.log(`Slide video render JSON written to ${jsonPath}`);
  console.log(`Slide video render Markdown written to ${mdPath}`);
  console.log(
    `Jobs=${report.summary.total} ready=${report.summary.ready} rendered=${report.summary.rendered} `
    + `reused=${report.summary.reused} blocked=${report.summary.blocked} failed=${report.summary.failed}`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
