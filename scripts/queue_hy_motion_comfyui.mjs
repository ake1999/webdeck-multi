#!/usr/bin/env node

import crypto from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { projectRoot } from "./lib/export_runtime.mjs";
import { buildJobsDir } from "./lib/lecture/contracts.mjs";
import { buildExpectedHyMotionOutputs, verifyHyMotionOutputs } from "./lib/lecture/hy_motion_assets.mjs";
import { buildHyMotionInstruction, buildHyMotionOutputSpec } from "./lib/lecture/hy_motion_instructions.mjs";
import { relativeProjectPath } from "./lib/lecture/utils.mjs";

const MAX_HYMOTION_DURATION_SEC = 12.0;
const MAX_COMFY_INT = 2147483647;

function parseArgs(argv) {
  const args = {
    workflow: path.join(projectRoot, "hy_motion_slide_batch_workflow.json"),
    comfyUrl: process.env.COMFYUI_URL || "http://127.0.0.1:8188",
    outputSubdirBase: "webdeck_hy_motion",
    pollMs: 4000,
    timeoutSec: 3600,
    seedMode: "hash_per_slide",
    timingMode: "chunk",
    comfyOutputRoot: "",
    verifyOutputs: true,
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    if (["dryRun"].includes(key)) {
      args[key] = true;
      continue;
    }
    if (["skipOutputVerify", "noVerifyOutputs"].includes(key)) {
      args.verifyOutputs = false;
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

function absoluteProjectPath(projectRelativePath) {
  if (!projectRelativePath) return "";
  return path.isAbsolute(projectRelativePath)
    ? projectRelativePath
    : path.join(projectRoot, projectRelativePath);
}

function hashSeed(jobId, baseSeed = 123456789) {
  const digest = crypto.createHash("sha256").update(`${baseSeed}:${jobId}`).digest();
  const numeric = digest.readUInt32BE(0);
  return Math.max(1, numeric % MAX_COMFY_INT);
}

function normalizeSeed(value) {
  const numeric = Math.floor(Math.abs(Number(value || 1)));
  return Math.max(1, numeric % MAX_COMFY_INT);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function findNodeByType(workflow, type) {
  return (Array.isArray(workflow?.nodes) ? workflow.nodes : []).find((node) => node.type === type) || null;
}

function workflowDefaults(workflow) {
  const network = findNodeByType(workflow, "HYMotionLoadNetwork");
  const llm = findNodeByType(workflow, "HYMotionLoadLLM");
  const llmGguf = findNodeByType(workflow, "HYMotionLoadLLMGGUF");
  const generate = findNodeByType(workflow, "HYMotionGenerate");
  const saveNpz = findNodeByType(workflow, "HYMotionSaveNPZ");
  const exportFbx = findNodeByType(workflow, "HYMotionExportFBX");
  const llmType = llmGguf ? "gguf" : "huggingface";

  return {
    network_model: network?.widgets_values?.[0] || "HY-Motion-1.0-Lite",
    llm_type: llmType,
    llm_model: llm?.widgets_values?.[0] || "Qwen3-8B-bnb-4bit",
    llm_quantization: llm?.widgets_values?.[1] || "bnb-4bit",
    llm_offload_to_cpu: Boolean(llm?.widgets_values?.[2] ?? true),
    llm_gguf_file: llmGguf?.widgets_values?.[0] || "",
    llm_gguf_device_strategy: llmGguf?.widgets_values?.[1] || "gpu",
    duration: Number(generate?.widgets_values?.[0] || 6),
    seed: Number(generate?.widgets_values?.[1] || 123456789),
    cfg_scale: Number(generate?.widgets_values?.[2] || 4),
    num_samples: Number(generate?.widgets_values?.[3] || 1),
    save_npz_output_dir: saveNpz?.widgets_values?.[0] || "webdeck_hy_motion",
    save_npz_prefix: saveNpz?.widgets_values?.[1] || "__SLIDE_ID__",
    export_fbx_output_dir: exportFbx?.widgets_values?.[0] || "webdeck_hy_motion",
    export_fbx_prefix: exportFbx?.widgets_values?.[1] || "__SLIDE_ID__",
    export_fbx_custom_path: exportFbx?.widgets_values?.[2] || "",
    export_fbx_yaw_offset: Number(exportFbx?.widgets_values?.[3] || 0),
    export_fbx_scale: Number(exportFbx?.widgets_values?.[4] || 0),
  };
}

function buildApiPrompt({ defaults, instruction, outputSpec, seed, durationSec }) {
  const llmNode = defaults.llm_type === "gguf"
    ? {
      class_type: "HYMotionLoadLLMGGUF",
      inputs: {
        gguf_file: defaults.llm_gguf_file,
        device_strategy: defaults.llm_gguf_device_strategy,
      },
    }
    : {
      class_type: "HYMotionLoadLLM",
      inputs: {
        model_name: defaults.llm_model,
        quantization: defaults.llm_quantization,
        offload_to_cpu: defaults.llm_offload_to_cpu,
      },
    };

  return {
    "1": {
      class_type: "HYMotionLoadNetwork",
      inputs: {
        model_name: defaults.network_model,
      },
    },
    "2": llmNode,
    "3": {
      class_type: "HYMotionEncodeText",
      inputs: {
        llm: ["2", 0],
        text: instruction,
      },
    },
    "4": {
      class_type: "HYMotionGenerate",
      inputs: {
        network: ["1", 0],
        conditioning: ["3", 0],
        duration: Number(durationSec || defaults.duration || 6),
        seed,
        cfg_scale: defaults.cfg_scale,
        num_samples: defaults.num_samples,
      },
    },
    "5": {
      class_type: "HYMotionSaveNPZ",
      inputs: {
        motion_data: ["4", 0],
        output_dir: outputSpec.npz_output_dir,
        filename_prefix: outputSpec.filename_prefix,
      },
    },
    "6": {
      class_type: "HYMotionExportFBX",
      inputs: {
        motion_data: ["4", 0],
        output_dir: outputSpec.fbx_output_dir,
        filename_prefix: outputSpec.filename_prefix,
        custom_fbx_path: defaults.export_fbx_custom_path,
        yaw_offset: defaults.export_fbx_yaw_offset,
        scale: defaults.export_fbx_scale,
      },
    },
  };
}

function round(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(Number(value || 0) * factor) / factor;
}

function buildMotionChunks(totalDuration) {
  const chunks = [];
  const safeDuration = Math.max(0.5, Number(totalDuration || 0));
  let start = 0;

  while (start < safeDuration - 1e-6) {
    const remaining = safeDuration - start;
    const duration = Math.min(MAX_HYMOTION_DURATION_SEC, remaining);
    chunks.push({
      index: chunks.length + 1,
      t0: round(start),
      t1: round(start + duration),
      duration_sec: round(duration),
    });
    start += duration;
  }

  if (chunks.length > 1 && chunks.at(-1).duration_sec < 0.5) {
    const tail = chunks.pop();
    const previous = chunks[chunks.length - 1];
    previous.t1 = round(tail.t1);
    previous.duration_sec = round(previous.t1 - previous.t0);
  }

  const total = chunks.length || 1;
  return (chunks.length ? chunks : [{ index: 1, t0: 0, t1: round(safeDuration), duration_sec: round(safeDuration) }])
    .map((chunk) => ({ ...chunk, total }));
}

function buildCompressedMotionParts(totalDuration) {
  const safeDuration = Math.max(0.5, Number(totalDuration || 0));
  const generatedDuration = Math.min(MAX_HYMOTION_DURATION_SEC, safeDuration);
  return [{
    index: 1,
    total: 1,
    t0: 0,
    t1: round(safeDuration),
    duration_sec: round(generatedDuration),
    stretch_factor: round(safeDuration / generatedDuration, 3),
  }];
}

function chunkFilePrefix(slideId, chunk) {
  if (!chunk || Number(chunk.total || 1) <= 1) return slideId;
  return `${slideId}__part_${String(chunk.index).padStart(2, "0")}`;
}

function chunkInstruction(baseInstruction, chunk) {
  if (!chunk || Number(chunk.total || 1) <= 1) return baseInstruction;
  return `${baseInstruction} This motion asset is part ${chunk.index} of ${chunk.total}, covering approximately ${chunk.t0} to ${chunk.t1} seconds of the slide. Keep the same presenter identity and continuous movement style across parts.`;
}

function compressedInstruction(baseInstruction, chunk, originalDuration) {
  if (!chunk) return baseInstruction;
  if (round(Number(originalDuration || 0), 2) <= MAX_HYMOTION_DURATION_SEC) return baseInstruction;
  return `${baseInstruction} Create a denser and slightly faster base motion lasting ${chunk.duration_sec} seconds that can later be time-stretched by about ${chunk.stretch_factor} times to cover the full ${round(originalDuration, 2)} second slide while staying smooth and teacher-like.`;
}

async function collectSlideVideoJobs(selector) {
  const topics = filterTopics(await discoverTopics(), selector);
  const jobs = [];

  for (const descriptor of topics) {
    const jobsDir = buildJobsDir("slide_video", descriptor);
    const exists = await fileExists(jobsDir);
    if (!exists) continue;
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

async function loadSlideMotionFromJob(job) {
  const motionPath = absoluteProjectPath(job.motion_manifest_file);
  if (!motionPath || !await fileExists(motionPath)) {
    throw new Error(`Missing motion manifest file: ${job.motion_manifest_file}`);
  }
  return await readJson(motionPath);
}

async function queuePrompt({ comfyUrl, apiPrompt, clientId }) {
  const response = await fetch(`${comfyUrl.replace(/\/$/, "")}/prompt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      prompt: apiPrompt,
    }),
  });

  if (!response.ok) {
    throw new Error(`ComfyUI prompt queue failed: ${response.status} ${await response.text()}`);
  }

  return await response.json();
}

async function waitForPrompt({ comfyUrl, promptId, pollMs, timeoutSec }) {
  const deadline = Date.now() + (Number(timeoutSec) * 1000);
  const historyUrl = `${comfyUrl.replace(/\/$/, "")}/history/${promptId}`;

  while (Date.now() < deadline) {
    const response = await fetch(historyUrl, { method: "GET" });
    if (!response.ok) {
      await sleep(pollMs);
      continue;
    }
    const payload = await response.json();
    const entry = payload?.[promptId];
    if (entry?.status?.status_str === "error") {
      throw new Error(`ComfyUI prompt ${promptId} failed.`);
    }
    if (entry?.status?.completed || entry?.status?.status_str === "success") {
      return entry;
    }
    if (entry?.outputs && Object.keys(entry.outputs).length) {
      return entry;
    }
    await sleep(pollMs);
  }

  throw new Error(`Timed out waiting for ComfyUI prompt ${promptId}.`);
}

function makeMarkdown(report) {
  const lines = [
    "# HY Motion ComfyUI Queue Report",
    "",
    `- Selector: \`${report.selector}\``,
    `- ComfyUI: \`${report.comfy_url}\``,
    `- Workflow: \`${report.workflow}\``,
    `- Timing mode: \`${report.timing_mode}\``,
    `- Output verification: ${report.verify_outputs ? "yes" : "no"}`,
    `- Comfy output root: \`${report.comfy_output_root || ""}\``,
    `- Jobs: ${report.summary.total}`,
    `- Queued: ${report.summary.success}`,
    `- Failed: ${report.summary.failed}`,
    `- Missing required NPZ: ${report.summary.missing_required_outputs}`,
    `- Dry run: ${report.dry_run ? "yes" : "no"}`,
    "",
  ];

  report.jobs.forEach((item) => {
    lines.push(`## ${item.job_id}`);
    lines.push("");
    lines.push(`- Status: ${item.status}`);
    lines.push(`- Slide: \`${item.selector.school}/${item.selector.course}/${item.selector.session}/${item.selector.topic}/${item.slide_id}\``);
    lines.push(`- Motion job: \`${item.job_file}\``);
    lines.push(`- NPZ dir: \`${item.npz_output_dir || ""}\``);
    lines.push(`- FBX dir: \`${item.fbx_output_dir || ""}\``);
    lines.push(`- Parts: ${item.part_count || 0}`);
    if (Array.isArray(item.parts)) {
      item.parts.forEach((part) => {
        const npzState = part.npz_found == null ? "not checked" : (part.npz_found ? "found" : "missing");
        const fbxState = part.fbx_found == null ? "not checked" : (part.fbx_found ? "found" : "missing");
        lines.push(`- Part ${part.index}/${part.total}: prefix=\`${part.filename_prefix}\` duration=${part.duration_sec}s stretch=${part.stretch_factor || 1} prompt=\`${part.prompt_id || ""}\` npz=${npzState} fbx=${fbxState}`);
      });
    }
    if (item.error) {
      lines.push(`- Error: ${item.error}`);
    }
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

  const jobs = await collectSlideVideoJobs(selector);
  if (!jobs.length) {
    throw new Error(`No slide video jobs matched selector ${summarizeSelector(selector)}.`);
  }

  const workflow = await readJson(args.workflow);
  const defaults = workflowDefaults(workflow);
  const clientId = crypto.randomUUID();

  const report = {
    selector: summarizeSelector(selector),
    comfy_url: args.comfyUrl,
    workflow: relativeProjectPath(args.workflow),
    timing_mode: args.timingMode,
    verify_outputs: Boolean(args.verifyOutputs),
    comfy_output_root: args.comfyOutputRoot || "",
    dry_run: Boolean(args.dryRun),
    generated_at: new Date().toISOString(),
    jobs: [],
    summary: {
      total: jobs.length,
      success: 0,
      failed: 0,
      missing_required_outputs: 0,
    },
  };

  for (const item of jobs) {
    const { descriptor, job, relativePath } = item;
    try {
      const slideMotion = await loadSlideMotionFromJob(job);
      const instruction = buildHyMotionInstruction({
        slideJob: job,
        slideMotion,
      });
      const outputSpec = buildHyMotionOutputSpec({
        descriptor,
        slideId: job.slide_id,
        baseSubdir: args.outputSubdirBase || defaults.save_npz_output_dir || "webdeck_hy_motion",
      });
      const baseSeed = String(args.seedMode) === "fixed"
        ? normalizeSeed(defaults.seed || 123456789)
        : hashSeed(job.job_id, Number(defaults.seed || 123456789));
      const chunks = String(args.timingMode) === "compress12"
        ? buildCompressedMotionParts(job.duration_sec)
        : buildMotionChunks(job.duration_sec);
      const partSummaries = [];

      if (args.dryRun) {
        report.summary.success += 1;
        report.jobs.push({
          status: "dry_run",
          job_id: job.job_id,
          slide_id: job.slide_id,
          selector: job.selector,
          job_file: relativePath,
          npz_output_dir: outputSpec.npz_output_dir,
          fbx_output_dir: outputSpec.fbx_output_dir,
          timing_mode: args.timingMode,
          part_count: chunks.length,
          parts: chunks.map((chunk) => ({
            index: chunk.index,
            total: chunk.total,
            t0: chunk.t0,
            t1: chunk.t1,
            duration_sec: chunk.duration_sec,
            stretch_factor: chunk.stretch_factor || 1,
            filename_prefix: chunkFilePrefix(job.slide_id, chunk),
            expected_outputs: buildExpectedHyMotionOutputs({
              npzOutputDir: outputSpec.npz_output_dir,
              fbxOutputDir: outputSpec.fbx_output_dir,
              filenamePrefix: chunkFilePrefix(job.slide_id, chunk),
            }),
            npz_found: null,
            fbx_found: null,
            missing_outputs: [],
            prompt_id: "",
            seed: normalizeSeed(baseSeed + chunk.index - 1),
          })),
          instruction,
        });
        console.log(`DRY RUN ${toReviewLabel(descriptor)} / ${job.slide_id} -> ${chunks.length} part(s) [mode=${args.timingMode}] in ${outputSpec.npz_output_dir} + ${outputSpec.fbx_output_dir}`);
        continue;
      }

      for (const chunk of chunks) {
        const filenamePrefix = chunkFilePrefix(job.slide_id, chunk);
        const chunkSeed = normalizeSeed(baseSeed + chunk.index - 1);
        const expectedOutputs = buildExpectedHyMotionOutputs({
          npzOutputDir: outputSpec.npz_output_dir,
          fbxOutputDir: outputSpec.fbx_output_dir,
          filenamePrefix,
        });
        const apiPrompt = buildApiPrompt({
          defaults,
          instruction: String(args.timingMode) === "compress12"
            ? compressedInstruction(instruction, chunk, job.duration_sec)
            : chunkInstruction(instruction, chunk),
          outputSpec: {
            ...outputSpec,
            filename_prefix: filenamePrefix,
          },
          seed: chunkSeed,
          durationSec: chunk.duration_sec,
        });

        const queued = await queuePrompt({
          comfyUrl: args.comfyUrl,
          apiPrompt,
          clientId,
        });
        const promptId = queued.prompt_id || queued.promptId || "";
        const historyEntry = await waitForPrompt({
          comfyUrl: args.comfyUrl,
          promptId,
          pollMs: Number(args.pollMs || 4000),
          timeoutSec: Number(args.timeoutSec || 3600),
        });
        const verification = args.verifyOutputs
          ? await verifyHyMotionOutputs({
            historyEntry,
            comfyOutputRoot: args.comfyOutputRoot || "",
            expectedOutputs,
          })
          : {
            expected_outputs: expectedOutputs,
            history_outputs: { files: [], npz: [], fbx: [] },
            local_outputs: { npz: [], fbx: [] },
            npz_found: null,
            fbx_found: null,
            missing_outputs: [],
          };
        partSummaries.push({
          index: chunk.index,
          total: chunk.total,
          t0: chunk.t0,
          t1: chunk.t1,
          duration_sec: chunk.duration_sec,
          stretch_factor: chunk.stretch_factor || 1,
          filename_prefix: filenamePrefix,
          prompt_id: promptId,
          seed: chunkSeed,
          ...verification,
        });
      }

      const missingRequiredOutputs = partSummaries
        .filter((part) => part.npz_found === false)
        .map((part) => part.filename_prefix);
      if (missingRequiredOutputs.length) report.summary.missing_required_outputs += 1;

      report.summary.success += 1;
      report.jobs.push({
        status: missingRequiredOutputs.length ? "queued_missing_outputs" : "queued",
        job_id: job.job_id,
        slide_id: job.slide_id,
        selector: job.selector,
        job_file: relativePath,
        npz_output_dir: outputSpec.npz_output_dir,
        fbx_output_dir: outputSpec.fbx_output_dir,
        timing_mode: args.timingMode,
        part_count: chunks.length,
        parts: partSummaries,
        missing_required_outputs: missingRequiredOutputs,
        instruction,
      });
      console.log(`Queued HY motion for ${toReviewLabel(descriptor)} / ${job.slide_id} -> ${chunks.length} part(s)`);
    } catch (error) {
      report.summary.failed += 1;
      report.jobs.push({
        status: "failed",
        job_id: job.job_id,
        slide_id: job.slide_id,
        selector: job.selector,
        job_file: relativePath,
        npz_output_dir: "",
        fbx_output_dir: "",
        part_count: 0,
        parts: [],
        error: error?.message || String(error),
      });
      console.error(`Failed HY motion for ${toReviewLabel(descriptor)} / ${job.slide_id}: ${error?.message || error}`);
    }
  }

  const reportDir = path.join(projectRoot, "generated", "lectures");
  await mkdir(reportDir, { recursive: true });
  const jsonPath = path.join(reportDir, "hy_motion_queue.report.json");
  const mdPath = path.join(reportDir, "hy_motion_queue.report.md");
  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(mdPath, makeMarkdown(report), "utf8");

  console.log(`HY motion queue JSON written to ${jsonPath}`);
  console.log(`HY motion queue Markdown written to ${mdPath}`);
  console.log(`Jobs: ${report.summary.total} | success=${report.summary.success} failed=${report.summary.failed}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
