#!/usr/bin/env node

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { buildTopicArtifactDir, projectRoot } from "./lib/export_runtime.mjs";
import { buildManualAlignmentPath } from "./lib/lecture/contracts.mjs";
import { validateSlideVideoControls } from "./lib/lecture/slide_video_controls.mjs";
import {
  validateProductionScripts,
  validateTtsJobsMatchManifest,
} from "./lib/lecture/script_quality.mjs";
import { relativeProjectPath } from "./lib/lecture/utils.mjs";

function parseArgs(argv) {
  const args = {
    outputDir: path.join(projectRoot, "generated", "lectures"),
    requireLlm: true,
    requireControls: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    if (key === "no-require-llm") {
      args.requireLlm = false;
      continue;
    }
    if (key === "require-controls") {
      args.requireControls = true;
      continue;
    }
    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) throw new Error(`Missing value for --${key}`);
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

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function words(value) {
  return String(value || "").split(/\s+/).filter(Boolean);
}

function validateScriptQuality(scriptManifest, topicPlan, options) {
  const issues = validateProductionScripts(scriptManifest, {
    requireLlm: options.requireLlm,
    requireYoutubeRetention: options.requireYoutubeRetention !== false,
  });
  const slides = asArray(scriptManifest?.slides);
  if (!topicPlan) issues.push("script.topic_plan.json is missing.");
  if (topicPlan && asArray(topicPlan.slides).length !== slides.length) {
    issues.push("topic plan slide count does not match script manifest slide count.");
  }
  return issues;
}

function validateMotionQuality(motionManifest) {
  const issues = [];
  const slides = asArray(motionManifest?.slides);
  slides.forEach((slide) => {
    const cues = asArray(slide.cues);
    if (cues.length >= 3 && cues.every((cue) => cue.behavior === "idle_talk")) {
      issues.push(`${slide.slide_id}: all ${cues.length} cues are idle_talk.`);
    }
    const longIdle = cues.find((cue) => cue.behavior === "idle_talk" && Number(cue.duration || 0) >= 18);
    if (longIdle) {
      issues.push(`${slide.slide_id}: cue ${longIdle.cue_id} is idle_talk for ${longIdle.duration}s.`);
    }
    const pointCues = cues.filter((cue) => String(cue.behavior || "").startsWith("point_") || cue.pointing_required);
    if (cues.length >= 4 && pointCues.length / cues.length > 0.75) {
      issues.push(`${slide.slide_id}: too many cues require pointing (${pointCues.length}/${cues.length}).`);
    }
    const slideFocusCues = cues.filter((cue) => cue.attention_mode === "slide_focus" && cue.target_element && cue.target_element !== "slide");
    const gazeOrPointCues = slideFocusCues.filter((cue) => cue.pointing_required || cue.gaze_mode);
    if (slideFocusCues.length && gazeOrPointCues.length < Math.ceil(slideFocusCues.length * 0.7)) {
      issues.push(`${slide.slide_id}: too few slide-focus cues have gaze/point intent.`);
    }
  });
  return issues;
}

async function validateControlsQuality(selector, options) {
  const controlsDir = path.join(
    projectRoot,
    "generated",
    "controls",
    "slide_video",
    selector.school,
    selector.course,
    selector.session,
    selector.topic,
  );
  if (!await fileExists(controlsDir)) {
    return options.requireControls ? [`Missing controls dir: ${relativeProjectPath(controlsDir)}`] : [];
  }
  const entries = await readdir(controlsDir);
  const motionFiles = entries.filter((entry) => entry.endsWith(".motion_requests.json"));
  const issues = [];
  for (const fileName of motionFiles) {
    const slideId = fileName.replace(".motion_requests.json", "");
    const motionRequests = await readJson(path.join(controlsDir, fileName));
    const avatarPlanPath = path.join(controlsDir, `${slideId}.avatar_plan.json`);
    if (!await fileExists(avatarPlanPath)) {
      issues.push(`${slideId}: missing avatar_plan.json`);
      continue;
    }
    const avatarPlan = await readJson(avatarPlanPath);
    const validation = validateSlideVideoControls({ motionRequests, avatarPlan });
    if (!validation.valid) {
      validation.errors.forEach((error) => issues.push(`${slideId}: ${error}`));
    }
    const segments = asArray(avatarPlan.segments);
    if (segments.length >= 3 && segments.every((segment) => segment.motion_type === "idle_talk")) {
      issues.push(`${slideId}: all avatar plan segments are idle_talk.`);
    }
  }
  return issues;
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
  if (!topics.length) throw new Error(`No topics matched selector ${summarizeSelector(selector)}.`);

  let failed = 0;
  for (const descriptor of topics) {
    const artifactDir = buildTopicArtifactDir(args.outputDir, descriptor);
    const scriptPath = path.join(artifactDir, "script.manifest.json");
    const topicPlanPath = path.join(artifactDir, "script.topic_plan.json");
    const motionPath = path.join(artifactDir, "motion.manifest.json");
    const issues = [];

    let scriptManifest = null;
    if (!await fileExists(scriptPath)) {
      issues.push(`Missing ${relativeProjectPath(scriptPath)}`);
    } else {
      scriptManifest = await readJson(scriptPath);
      issues.push(...validateScriptQuality(
        scriptManifest,
        await readJson(topicPlanPath).catch(() => null),
        args,
      ));
      const alignmentPath = buildManualAlignmentPath(descriptor);
      if (await fileExists(alignmentPath)) {
        const alignmentManifest = await readJson(alignmentPath);
        issues.push(...await validateTtsJobsMatchManifest({
          descriptor,
          scriptManifest,
          alignmentManifest,
          providerId: alignmentManifest?.provider?.requested_provider || "qwen3_tts",
        }));
      }
    }
    if (!await fileExists(motionPath)) {
      issues.push(`Missing ${relativeProjectPath(motionPath)}`);
    } else {
      issues.push(...validateMotionQuality(await readJson(motionPath)));
    }
    issues.push(...await validateControlsQuality(descriptor, args));

    if (issues.length) {
      failed += 1;
      console.error(`Quality check failed for ${toReviewLabel(descriptor)}:`);
      issues.forEach((issue) => console.error(`- ${issue}`));
    } else {
      console.log(`Quality check passed for ${toReviewLabel(descriptor)}`);
    }
  }
  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error?.stack || error?.message || error);
  process.exit(1);
});
