#!/usr/bin/env node

import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { buildTopicArtifactDir, projectRoot } from "./lib/export_runtime.mjs";
import { buildManualAlignmentPath, buildManualAudioPath } from "./lib/lecture/contracts.mjs";
import { plainTextForSpeech } from "./lib/lecture/utils.mjs";

const JOB_SCHEMA_VERSION = "webdeck.avatar_video_job.v1";
const BATCH_SCHEMA_VERSION = "webdeck.avatar_batch_job.v1";

function parseResolution(value, fallback) {
  const raw = String(value || "").trim();
  if (!raw) return fallback.slice();
  const match = raw.match(/^(\d+)x(\d+)$/i);
  if (!match) throw new Error(`Expected resolution as WIDTHxHEIGHT, got "${value}".`);
  return [Number(match[1]), Number(match[2])];
}

function parseArgs(argv) {
  const args = {
    outputDir: path.join(projectRoot, "generated", "jobs", "avatar_video"),
    lectureOutputDir: path.join(projectRoot, "generated", "lectures"),
    motionBank: path.join(projectRoot, "tools", "avatar_video", "motion_bank.v1.json"),
    renderMode: "per_slide",
    fps: 24,
    resolution: "896x1200",
    character: "instructor_05",
    avatarScale: 0.42,
    slideResolution: "1920x1080",
    overlayMarginPx: 0,
    questionPauseSec: 4.0,
    renderModeBatch: "silent_transparent_first",
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    if (key === "dryRun" || key === "dry-run") {
      args.dryRun = true;
      continue;
    }
    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key.replace(/-([a-z])/g, (_, char) => char.toUpperCase())] = value;
    index += 1;
  }

  args.fps = Number(args.fps || 24);
  args.avatarScale = Number(args.avatarScale || 0.42);
  args.overlayMarginPx = Number(args.overlayMarginPx ?? 0);
  args.questionPauseSec = Number(args.questionPauseSec ?? 4.0);
  args.resolution = parseResolution(args.resolution, [896, 1200]);
  args.slideResolution = parseResolution(args.slideResolution, [1920, 1080]);
  args.outputDir = path.isAbsolute(args.outputDir) ? args.outputDir : path.join(projectRoot, args.outputDir);
  args.lectureOutputDir = path.isAbsolute(args.lectureOutputDir) ? args.lectureOutputDir : path.join(projectRoot, args.lectureOutputDir);
  args.motionBank = path.isAbsolute(args.motionBank) ? args.motionBank : path.join(projectRoot, args.motionBank);
  return args;
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function fileExists(filePath) {
  return Boolean(await stat(filePath).catch(() => null));
}

function relativeProjectPath(filePath) {
  return path.relative(projectRoot, filePath).split(path.sep).join("/");
}

function absoluteProjectPath(value) {
  if (!value) return "";
  return path.isAbsolute(value) ? value : path.join(projectRoot, value);
}

function safeId(value) {
  return String(value || "")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function round(value, digits = 3) {
  const scale = 10 ** digits;
  return Math.round(Number(value || 0) * scale) / scale;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function findSlide(manifest, slideId) {
  return asArray(manifest?.slides).find((slide) => slide.slide_id === slideId) || null;
}

function slideText(slideScript) {
  return asArray(slideScript?.segments)
    .map((segment) => plainTextForSpeech(segment.text))
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function slideKeywords(slideScript) {
  return [
    slideScript?.slide_id || "",
    slideScript?.slide_type || "",
    slideScript?.lecture_plan?.slide_role || "",
    slideScript?.lecture_plan?.delivery_goal || "",
    slideScript?.lecture_plan?.teacher_strategy || "",
    slideText(slideScript),
    ...asArray(slideScript?.segments).map((segment) => [
      segment.delivery_kind || "",
      segment.avatar_behavior_hint || "",
      segment.target_element || "",
      ...asArray(segment.emphasis_words),
    ].join(" ")),
  ].join(" ").toLowerCase();
}

function isQuestionSlide(slideScript) {
  const text = slideKeywords(slideScript);
  const slideType = String(slideScript?.slide_type || "").toLowerCase();
  const slideRole = String(slideScript?.lecture_plan?.slide_role || "").toLowerCase();
  const slideId = String(slideScript?.slide_id || "").toLowerCase();
  return (
    ["mcq", "question", "quiz", "poll"].includes(slideType)
    || /\b(mcq|quiz|question|knowledge_check|quick_check|check_your_understanding|exit_ticket|poll)\b/.test(slideId)
    || /\b(quiz|knowledge check|quick check|check your understanding|multiple choice|which of the following|choose the correct answer|select the correct answer|pause and think|take a moment to answer|answer this|what would you do)\b/.test(text)
    || /\b(question|quiz|poll|check)\b/.test(slideRole)
  );
}

function contentCenterX(layoutSlide) {
  const boxes = asArray(layoutSlide?.elements)
    .filter((element) => element.visible !== false && Array.isArray(element.bbox) && element.bbox.length === 4)
    .filter((element) => !["meta", "slide"].includes(element.type));
  if (!boxes.length) return 960;
  const weighted = boxes.reduce((acc, element) => {
    const [left, top, right, bottom] = element.bbox;
    const area = Math.max(1, (right - left) * (bottom - top));
    acc.sum += ((left + right) / 2) * area;
    acc.area += area;
    return acc;
  }, { sum: 0, area: 0 });
  return weighted.sum / weighted.area;
}

function contentSide(layoutSlide) {
  const center = contentCenterX(layoutSlide);
  if (center < 820) return "left";
  if (center > 1100) return "right";
  return "center";
}

function motionById(motionBank, motionId) {
  const motion = motionBank?.motions?.[motionId];
  if (!motion) throw new Error(`Motion bank does not define motion_id "${motionId}".`);
  return motion;
}

function isEndOnly(motion) {
  return Boolean(motion?.constraints?.end_only) || asArray(motion?.allowed_placements).length === 1 && motion.allowed_placements[0] === "end";
}

function chooseMotionId({ slideScript, layoutSlide, index, total }) {
  const text = slideKeywords(slideScript);
  const side = contentSide(layoutSlide);
  const isFirst = index === 0;
  const isFinal = index === total - 1;

  if (isFirst) return "welcome_audience";
  if (isFinal) return "see_you_next";
  if (/\b(wrap up|closing|summary|recap)\b/.test(text)) return "nodding_desk";
  if (/\b(overview|start|introduction|introduce|frame)\b/.test(text)) return "presenting_concept";
  if (isQuestionSlide(slideScript)) return "wait_audience_response";
  if (/\b(type|terminal|command|code|bash|source|workspace|package|node|ros2|screen)\b/.test(text)) {
    return /\b(long|several|commands|terminal|workspace|package)\b/.test(text) ? "type_laptop_long" : "type_laptop";
  }
  if (/\b(important|key|remember|must|critical|warning|deduction|grade|safety|careful)\b/.test(text)) {
    return side === "left" || side === "center" ? "point_left_emphasis" : "key_point";
  }
  if (/\b(compare|difference|versus|vs|contrast|changed)\b/.test(text)) return "presenting_concept";
  if (side === "left") return "point_left";
  if (side === "right") return "presenting_concept";
  return index % 3 === 0 ? "explaining" : index % 3 === 1 ? "presenting_concept" : "nodding_desk";
}

function idleStyleForSlide(slideScript, index) {
  const text = slideKeywords(slideScript);
  if (index === 0) return "engaged";
  if (isQuestionSlide(slideScript)) return "thoughtful";
  if (/\b(important|key|remember|safety|warning)\b/.test(text)) return "engaged";
  return "calm";
}

function idleEntry(startSec, durationSec, style) {
  return {
    type: "idle",
    start_sec: round(startSec),
    duration_sec: durationSec === "fill" ? "fill" : round(durationSec),
    style,
  };
}

function motionEntry({ motionId, motion, startSec, placement, durationLimit = null }) {
  const duration = Number(motion.duration_sec || 0);
  const trimEnd = durationLimit == null ? duration : Math.min(duration, Math.max(1.5, Number(durationLimit)));
  const entry = {
    type: "motion_bank",
    motion_id: motionId,
    start_sec: round(startSec),
    placement,
    settle_before: motion.constraints?.settle_before !== false,
    settle_after: motion.constraints?.settle_after !== false,
  };
  if (motion.constraints?.can_trim !== false && trimEnd < duration - 0.05) {
    entry.trim = {
      start_sec: 0.0,
      end_sec: round(trimEnd),
    };
  }
  if (isEndOnly(motion)) {
    entry.settle_after = false;
  }
  return entry;
}

function buildMotionPlan({ slideScript, layoutSlide, alignmentSlide, index, total, motionBank }) {
  const duration = Number(alignmentSlide.duration || 0);
  const speechDuration = Number(alignmentSlide.speech_duration || alignmentSlide.duration || 0);
  const style = idleStyleForSlide(slideScript, index);
  if (duration <= 0) return [];
  if (duration < 5) return [idleEntry(0, "fill", style)];

  const motionId = chooseMotionId({ slideScript, layoutSlide, index, total });
  const motion = motionById(motionBank, motionId);
  const clipDuration = Math.min(Number(motion.duration_sec || 0), duration);
  const plan = [];

  if (motionId === "wait_audience_response" && duration - speechDuration >= 1.5) {
    if (speechDuration > 0.75) plan.push(idleEntry(0, speechDuration, style));
    plan.push(motionEntry({
      motionId,
      motion,
      startSec: speechDuration,
      placement: "end",
      durationLimit: duration - speechDuration,
    }));
    return plan;
  }

  if (isEndOnly(motion)) {
    const start = Math.max(0, duration - clipDuration);
    if (start > 0.75) plan.push(idleEntry(0, start, style));
    plan.push(motionEntry({
      motionId,
      motion,
      startSec: start,
      placement: "end",
    }));
    return plan;
  }

  const placement = asArray(motion.allowed_placements).includes("beginning") && (index === 0 || duration < 10)
    ? "beginning"
    : "middle";
  const start = placement === "beginning"
    ? 0
    : Math.min(Math.max(2.0, duration * 0.22), Math.max(0, duration - clipDuration - 1.2));
  if (start > 0.75) plan.push(idleEntry(0, start, style));
  plan.push(motionEntry({
    motionId,
    motion,
    startSec: start,
    placement,
    durationLimit: Math.min(clipDuration, Math.max(3.0, duration - start)),
  }));
  const end = start + Math.min(clipDuration, Math.max(3.0, duration - start));
  if (duration - end > 1.0) {
    plan.push(idleEntry(end, "fill", style));
  }
  return plan;
}

function deterministicJitter(seed, amount) {
  let hash = 0;
  for (const char of String(seed)) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return ((hash % 1000) / 1000 - 0.5) * amount;
}

function buildEvents({ slideScript, layoutSlide, alignmentSlide, motionPlan, index, total }) {
  const duration = Number(alignmentSlide.duration || 0);
  const events = [];
  if (duration <= 0) return events;

  const blinkTimes = [2.4, 6.8, 11.5, 17.2, 24.0]
    .map((time, blinkIndex) => time + deterministicJitter(`${slideScript.slide_id}:${blinkIndex}`, 0.8))
    .filter((time) => time > 0.6 && time < duration - 0.3)
    .slice(0, Math.max(1, Math.min(5, Math.floor(duration / 5))));
  blinkTimes.forEach((time, blinkIndex) => {
    events.push({
      time_sec: round(time),
      type: "blink",
      eye: "both",
      strength: blinkIndex % 3 === 0 ? "full" : "normal",
    });
  });

  const primaryMotion = motionPlan.find((item) => item.type === "motion_bank");
  const side = contentSide(layoutSlide);
  if (primaryMotion) {
    const gazeTarget = primaryMotion.motion_id.includes("point_left")
      ? "slide_left"
      : primaryMotion.motion_id.includes("point_right") || primaryMotion.motion_id === "point_slide_right"
        ? "slide_right"
        : side === "right" ? "slide_right" : "slide_left";
    if (!["type_laptop", "type_laptop_long", "show_computer_screen"].includes(primaryMotion.motion_id)) {
      events.push({
        time_sec: round(Math.min(duration - 0.5, Number(primaryMotion.start_sec || 0) + 0.9)),
        type: "gaze",
        target: gazeTarget,
        duration_sec: 1.2,
        intensity: 0.45,
      });
    }
  }

  if (index === 0) {
    events.push({
      time_sec: round(Math.min(2.0, duration * 0.2)),
      type: "emotion",
      name: "subtle_happy",
      duration_sec: 2.0,
      intensity: 0.55,
    });
  } else if (index === total - 1) {
    events.push({
      time_sec: round(Math.max(0.5, duration - 3.0)),
      type: "emotion",
      name: "subtle_happy",
      duration_sec: 2.5,
      intensity: 0.5,
    });
  } else if (isQuestionSlide(slideScript)) {
    events.push({
      time_sec: round(Math.min(duration - 0.5, duration * 0.55)),
      type: "emotion",
      name: "thoughtful",
      duration_sec: 2.0,
      intensity: 0.45,
    });
  }

  const headTime = Math.min(duration - 0.5, Math.max(1.5, duration * 0.35));
  if (headTime > 0.5) {
    events.push({
      time_sec: round(headTime),
      type: "head_pose",
      yaw: round(deterministicJitter(`${slideScript.slide_id}:yaw`, 4.5)),
      pitch: round(deterministicJitter(`${slideScript.slide_id}:pitch`, 3.0)),
      roll: round(deterministicJitter(`${slideScript.slide_id}:roll`, 1.0)),
      duration_sec: 1.5,
      easing: "ease_in_out",
    });
  }

  return events
    .filter((event) => Number(event.time_sec) >= 0 && Number(event.time_sec) <= duration)
    .sort((left, right) => Number(left.time_sec) - Number(right.time_sec));
}

function buildPlacement({ args }) {
  const [slideWidth, slideHeight] = args.slideResolution;
  const [videoWidth, videoHeight] = args.resolution;
  const scaledWidth = videoWidth * args.avatarScale;
  const scaledHeight = videoHeight * args.avatarScale;
  return {
    anchor: "bottom_right",
    scale: round(args.avatarScale, 4),
    x: Math.round(slideWidth - scaledWidth - args.overlayMarginPx),
    y: Math.round(slideHeight - scaledHeight - args.overlayMarginPx),
    reference_resolution: args.slideResolution,
    scale_policy: "scale_with_slide",
    margin_px: args.overlayMarginPx,
    edge_margin_px: args.overlayMarginPx,
  };
}

function renderDefaults({ args, motionBank }) {
  return {
    mode: args.renderMode,
    fps: args.fps,
    resolution: args.resolution,
    character: args.character,
    background: {
      type: "transparent",
      source_background: "near_white",
      alpha_method: "colorkey_first_pass",
    },
    audio_policy: "lip_sync_last",
    motion_bank: {
      bank_id: motionBank.bank_id,
      metadata_file: relativeProjectPath(args.motionBank),
    },
    overlay: {
      target: "web_slide",
      anchor: "bottom_right",
      scale_with_slide: true,
      reference_slide_resolution: args.slideResolution,
      reference_scale: round(args.avatarScale, 4),
      margin_px: args.overlayMarginPx,
      edge_margin_px: args.overlayMarginPx,
    },
    outputs: {
      mp4_with_audio: true,
      transparent_webm: true,
      silent_transparent_webm: true,
      debug_visual_mp4: true,
    },
  };
}

function defaultAvatarSettings() {
  return {
    idle: {
      enabled: true,
      style: "wandering_near_neutral",
      intensity: 0.65,
      blink_rate: "natural",
      gaze_rate: "low",
      head_motion: {
        yaw: [-3.5, 3.5],
        pitch: [-2.5, 3.5],
        roll: [-0.8, 0.8],
        easing: "ease_in_out",
      },
    },
    transitions: {
      settle_to_neutral_before_action: true,
      settle_to_neutral_after_action: true,
      settle_duration_sec: 0.8,
    },
    lip_sync: {
      engine: "wav2lip",
      pads: [0, 10, 0, 0],
      nosmooth: true,
    },
  };
}

async function loadTopicInputs({ descriptor, args }) {
  const artifactDir = buildTopicArtifactDir(args.lectureOutputDir, descriptor);
  const scriptPath = path.join(artifactDir, "script.manifest.json");
  const layoutPath = path.join(artifactDir, "layout.manifest.json");
  const alignmentPath = buildManualAlignmentPath(descriptor);
  const required = [
    ["script manifest", scriptPath],
    ["layout manifest", layoutPath],
    ["canonical TTS alignment", alignmentPath],
  ];
  for (const [label, filePath] of required) {
    if (!await fileExists(filePath)) {
      throw new Error(`Missing ${label}: ${relativeProjectPath(filePath)}`);
    }
  }
  return {
    artifactDir,
    scriptManifest: await readJson(scriptPath),
    layoutManifest: await readJson(layoutPath),
    alignmentManifest: await readJson(alignmentPath),
  };
}

async function buildTopicJob({ descriptor, args, motionBank }) {
  const { artifactDir, scriptManifest, layoutManifest, alignmentManifest } = await loadTopicInputs({ descriptor, args });
  const jobId = safeId(`${descriptor.school}_${descriptor.course}_${descriptor.session}_${descriptor.topic}`);
  const slides = [];
  const missing = [];
  const scriptSlides = asArray(scriptManifest.slides);

  for (const [index, slideScript] of scriptSlides.entries()) {
    const slideId = slideScript.slide_id;
    const alignmentSlide = findSlide(alignmentManifest, slideId);
    const layoutSlide = findSlide(layoutManifest, slideId);
    if (!alignmentSlide) {
      missing.push(`alignment for ${slideId}`);
      continue;
    }
    if (!layoutSlide) {
      missing.push(`layout for ${slideId}`);
      continue;
    }

    const screenshotPath = path.join(artifactDir, "screenshots", `${slideId}.png`);
    const audioPath = absoluteProjectPath(alignmentSlide.audio_file || buildManualAudioPath(descriptor, slideId));
    if (!await fileExists(screenshotPath)) missing.push(`screenshot for ${slideId}: ${relativeProjectPath(screenshotPath)}`);
    if (!await fileExists(audioPath)) missing.push(`audio for ${slideId}: ${relativeProjectPath(audioPath)}`);

    const speechDurationSec = round(alignmentSlide.duration || 0);
    const questionPauseSec = isQuestionSlide(slideScript) ? Math.max(0, args.questionPauseSec) : 0;
    const durationSec = round(speechDurationSec + questionPauseSec);
    const timingSlide = {
      ...alignmentSlide,
      speech_duration: speechDurationSec,
      duration: durationSec,
    };
    const motionPlan = buildMotionPlan({
      slideScript,
      layoutSlide,
      alignmentSlide: timingSlide,
      index,
      total: scriptSlides.length,
      motionBank,
    });
    slides.push({
      slide_id: slideId,
      slide_index: index,
      duration_sec: durationSec,
      slide_assets: {
        screenshot: relativeProjectPath(screenshotPath),
      },
      speech: {
        text: slideText(slideScript),
        audio: relativeProjectPath(audioPath),
        audio_duration_sec: speechDurationSec,
        segments: asArray(slideScript.segments).map((segment) => {
          const aligned = asArray(alignmentSlide.segments).find((item) => item.segment_id === segment.segment_id);
          return {
            segment_id: segment.segment_id,
            text: plainTextForSpeech(segment.text),
            t0: aligned ? round(aligned.t0) : null,
            t1: aligned ? round(aligned.t1) : null,
            target_element: segment.target_element || "slide",
            delivery_kind: segment.delivery_kind || "",
            avatar_behavior_hint: segment.avatar_behavior_hint || "",
          };
        }),
      },
      avatar: {
        placement: buildPlacement({ args }),
        motion_plan: motionPlan,
        ...(questionPauseSec > 0
          ? {
            interaction: {
              type: "answer_pause",
              start_sec: speechDurationSec,
              duration_sec: round(questionPauseSec),
              reason: "question_or_quiz_slide",
            },
          }
          : {}),
        events: buildEvents({
          slideScript,
          layoutSlide,
          alignmentSlide: timingSlide,
          motionPlan,
          index,
          total: scriptSlides.length,
        }),
      },
    });
  }

  if (missing.length) {
    throw new Error(`Cannot build avatar video job; missing required assets:\n- ${missing.join("\n- ")}`);
  }

  return {
    schema_version: JOB_SCHEMA_VERSION,
    job_id: jobId,
    course_id: descriptor.course,
    session_id: descriptor.session,
    topic_id: descriptor.topic,
    selector: {
      school: descriptor.school,
      course: descriptor.course,
      session: descriptor.session,
      topic: descriptor.topic,
    },
    render: renderDefaults({ args, motionBank }),
    defaults: defaultAvatarSettings(),
    slides,
  };
}

function jobOutputPath(descriptor, args) {
  return path.join(
    args.outputDir,
    descriptor.school,
    descriptor.course,
    descriptor.session,
    `${descriptor.topic}.json`,
  );
}

function batchOutputPath(args, selector) {
  const parts = [
    selector.school || "all-schools",
    selector.course || "all-courses",
    selector.session || "all-sessions",
    selector.topic || "all-topics",
  ].map(safeId);
  return path.join(args.outputDir, "batches", `${parts.join("_")}.json`);
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
  const motionBank = await readJson(args.motionBank);

  const writtenJobs = [];
  const failures = [];
  for (const descriptor of topics) {
    try {
      const job = await buildTopicJob({ descriptor, args, motionBank });
      const outputPath = jobOutputPath(descriptor, args);
      if (!args.dryRun) {
        await mkdir(path.dirname(outputPath), { recursive: true });
        await writeFile(outputPath, `${JSON.stringify(job, null, 2)}\n`, "utf8");
      }
      writtenJobs.push({
        descriptor,
        path: relativeProjectPath(outputPath),
        slide_count: job.slides.length,
      });
      console.log(`${args.dryRun ? "Prepared" : "Wrote"} avatar video job for ${toReviewLabel(descriptor)} -> ${relativeProjectPath(outputPath)}`);
    } catch (error) {
      failures.push({
        descriptor,
        error: error?.message || String(error),
      });
      console.error(`Failed avatar video job for ${toReviewLabel(descriptor)}: ${error?.message || error}`);
    }
  }

  if (writtenJobs.length > 1) {
    const batch = {
      schema_version: BATCH_SCHEMA_VERSION,
      batch_id: safeId(`${selector.school || "all"}_${selector.course || "all"}_${selector.session || "all"}_${selector.topic || "all"}`),
      render_mode: args.renderModeBatch,
      jobs: writtenJobs.map((item) => item.path),
    };
    const outputPath = batchOutputPath(args, selector);
    if (!args.dryRun) {
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, `${JSON.stringify(batch, null, 2)}\n`, "utf8");
    }
    console.log(`${args.dryRun ? "Prepared" : "Wrote"} avatar video batch -> ${relativeProjectPath(outputPath)}`);
  }

  console.log(`Avatar video jobs: matched=${topics.length} written=${writtenJobs.length} failed=${failures.length}`);
  if (failures.length) process.exitCode = 1;
}

main()
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
