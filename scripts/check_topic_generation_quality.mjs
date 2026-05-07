#!/usr/bin/env node

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { buildTopicArtifactDir, projectRoot } from "./lib/export_runtime.mjs";
import { validateSlideVideoControls } from "./lib/lecture/slide_video_controls.mjs";
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

function genericPhraseCount(value) {
  const text = String(value || "").toLowerCase();
  const patterns = [
    /next key term/g,
    /once .* is clear/g,
    /this slide covers/g,
    /use .* to introduce/g,
    /carry this idea forward/g,
    /last session/g,
    /continuing from our (previous|last) discussion/g,
    /building on our previous discussion/g,
  ];
  return patterns.reduce((total, pattern) => total + asArray(text.match(pattern)).length, 0);
}

function restartLanguagePattern() {
  return /\b(hello everyone|welcome everyone|last session|today|continuing from our (previous|last) discussion|building on our previous discussion|let'?s dive right in)\b/i;
}

function finalTextHasClosing(text) {
  return /\b(remember|finish|wrap|next class|next time|next session|question|questions|check|takeaway|before you leave|you should|as you work|leave knowing|always keep in mind|before starting|before operating)\b/i
    .test(String(text || ""));
}

function isTransitionFragment(value) {
  const text = String(value || "").trim();
  return words(text).length <= 5 && /^(first|firstly|next|moving on|last|lastly|finally),?\s+/i.test(text);
}

function validateScriptQuality(scriptManifest, topicPlan, options) {
  const issues = [];
  const slides = asArray(scriptManifest?.slides);
  if (!slides.length) issues.push("script.manifest.json has no slides.");
  if (options.requireLlm) {
    slides.forEach((slide) => {
      if (slide.provider_used !== "llm_local") {
        issues.push(`${slide.slide_id}: provider_used is ${slide.provider_used || "missing"}, expected llm_local.`);
      }
      if (slide.fallback_reason) {
        issues.push(`${slide.slide_id}: fallback_reason is present: ${slide.fallback_reason}`);
      }
    });
  }
  if (!topicPlan) issues.push("script.topic_plan.json is missing.");
  if (topicPlan && asArray(topicPlan.slides).length !== slides.length) {
    issues.push("topic plan slide count does not match script manifest slide count.");
  }

  const allText = slides.flatMap((slide) => asArray(slide.segments).map((segment) => segment.text)).join(" ");
  const genericCount = genericPhraseCount(allText);
  if (genericCount > Math.max(2, Math.ceil(slides.length * 0.08))) {
    issues.push(`spoken script contains too many generic transition phrases: ${genericCount}`);
  }

  const firstText = asArray(slides[0]?.segments).map((segment) => segment.text).join(" ");
  const lastText = asArray(slides[slides.length - 1]?.segments).map((segment) => segment.text).join(" ");
  if (slides.length && !/\b(welcome|today|we('|’)re|we are|this (course|session|topic|lesson))\b/i.test(firstText)) {
    issues.push(`${slides[0].slide_id}: opening does not sound like a class start.`);
  }
  if (slides.length && !finalTextHasClosing(lastText)) {
    issues.push(`${slides[slides.length - 1].slide_id}: final slide does not sound like a closing or handoff.`);
  }
  if (slides.length && /\b(before we move on|as we move on|when we move on|let'?s move on)\b/i.test(lastText)) {
    issues.push(`${slides[slides.length - 1].slide_id}: final slide sounds like another middle slide.`);
  }

  slides.forEach((slide) => {
    const slideWords = words(asArray(slide.segments).map((segment) => segment.text).join(" ")).length;
    if (slideWords < 12) issues.push(`${slide.slide_id}: script is very short (${slideWords} words).`);
    asArray(slide.segments).forEach((segment) => {
      if (/\.{3,}\s*$/.test(String(segment?.text || "").trim())) {
        issues.push(`${slide.slide_id}: segment ${segment.segment_id || "unknown"} ends with an unfinished ellipsis.`);
      }
      if (/^\.{3,}/.test(String(segment?.text || "").trim())) {
        issues.push(`${slide.slide_id}: segment ${segment.segment_id || "unknown"} starts with an unfinished ellipsis.`);
      }
      if (isTransitionFragment(segment?.text)) {
        issues.push(`${slide.slide_id}: segment ${segment.segment_id || "unknown"} is a transition fragment instead of a complete idea.`);
      }
      if (/\b(finally|lastly),\s+sometimes\s+\w+/i.test(String(segment?.text || ""))) {
        issues.push(`${slide.slide_id}: segment ${segment.segment_id || "unknown"} is missing a subject after the final transition.`);
      }
    });
    if (slide !== slides[0] && restartLanguagePattern().test(asArray(slide.segments).map((segment) => segment.text).join(" "))) {
      issues.push(`${slide.slide_id}: script restarts the lecture mid-topic.`);
    }
  });

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

    if (!await fileExists(scriptPath)) {
      issues.push(`Missing ${relativeProjectPath(scriptPath)}`);
    } else {
      issues.push(...validateScriptQuality(
        await readJson(scriptPath),
        await readJson(topicPlanPath).catch(() => null),
        args,
      ));
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
