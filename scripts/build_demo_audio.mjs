#!/usr/bin/env node

import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildTopicRuntime } from "../shared/deck_model.js";
import { discoverTopics, filterTopics, loadTopicModule, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { projectRoot } from "./lib/export_runtime.mjs";
import { loadLectureAuthoring } from "./lib/lecture/authoring.mjs";
import { splitNarrationText, ttsTextForSpeech, relativeProjectPath } from "./lib/lecture/utils.mjs";
import { synthesizeTopicAudio } from "./lib/tts/synthesize.mjs";

const BOOLEAN_FLAGS = new Set(["write-report"]);

function normalizeKey(key) {
  return key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function parseArgs(argv) {
  const args = {
    provider: "qwen3_tts",
    voiceName: "slt",
    demoOverlayFile: "",
    outputDir: path.join(projectRoot, "generated", "outputs", "demo_audio"),
    writeReport: false,
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

  args.outputDir = path.isAbsolute(args.outputDir) ? args.outputDir : path.join(projectRoot, args.outputDir);
  return args;
}

function booleanOption(value, fallback = false) {
  if (value == null || value === "") return fallback;
  if (typeof value === "boolean") return value;
  return !["0", "false", "no", "off"].includes(String(value).trim().toLowerCase());
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

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function safeId(value) {
  return String(value || "")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function demoOverlayPath(descriptor, args) {
  if (args.demoOverlayFile) {
    return path.isAbsolute(args.demoOverlayFile)
      ? args.demoOverlayFile
      : path.join(projectRoot, args.demoOverlayFile);
  }
  return descriptor.filePath.replace(/\.slides\.js$/, ".demo_overlays.json");
}

function demoAudioTopicDir(descriptor, outputRoot) {
  return path.join(
    outputRoot,
    descriptor.school,
    descriptor.course,
    descriptor.session,
    descriptor.topic,
  );
}

function normalizeDemoSegment(rawSegment, index, demoId) {
  const description = String(rawSegment.description || rawSegment.action || "").trim();
  const text = String(rawSegment.text || rawSegment.narration_text || rawSegment.say || description).trim();
  return {
    segment_id: safeId(rawSegment.segment_id || `${demoId}_seg_${String(index + 1).padStart(2, "0")}`),
    t0: Number(rawSegment.t0 ?? rawSegment.start_sec ?? 0),
    t1: Number(rawSegment.t1 ?? rawSegment.end_sec ?? rawSegment.t0 ?? rawSegment.start_sec ?? 0),
    text,
    description,
  };
}

function segmentsFromText(text, demoId, voice) {
  return splitNarrationText(text, {
    maxSegments: 8,
    maxWordsPerSegment: 26,
  }).map((segmentText, index) => ({
    segment_id: `${demoId}_seg_${String(index + 1).padStart(2, "0")}`,
    text: segmentText,
    tts_text: ttsTextForSpeech(segmentText),
    voice,
    emphasis_words: [],
    target_element: null,
    attention_mode: "demo_focus",
  }));
}

function buildDemoSpeechSegments(rawDemo, demoId) {
  const narration = rawDemo.narration && typeof rawDemo.narration === "object" ? rawDemo.narration : {};
  const voice = {
    tone: narration.tone || rawDemo.tone || "teacher_demo_clear",
    energy: Number(narration.energy ?? rawDemo.energy ?? 0.56),
    pace: Number(narration.pace ?? rawDemo.pace ?? 0.96),
  };
  const explicitSegments = asArray(narration.segments || rawDemo.narration_segments)
    .map((segment, index) => normalizeDemoSegment(segment, index, demoId))
    .filter((segment) => segment.text);

  if (explicitSegments.length) {
    return explicitSegments.map((segment) => ({
      segment_id: segment.segment_id,
      text: segment.text,
      tts_text: ttsTextForSpeech(segment.text),
      voice,
      emphasis_words: [],
      target_element: null,
      attention_mode: "demo_focus",
      source_t0: segment.t0,
      source_t1: segment.t1,
      source_description: segment.description,
    }));
  }

  const text = String(narration.text || rawDemo.narration_text || rawDemo.text || "").trim();
  return segmentsFromText(text, demoId, voice);
}

function normalizeDemo(rawDemo, index, slideId) {
  const order = Number(rawDemo.order ?? index + 1);
  const demoId = safeId(rawDemo.demo_id || rawDemo.id || `demo_${String(order).padStart(2, "0")}`);
  const segments = buildDemoSpeechSegments(rawDemo, demoId);
  return {
    slide_id: slideId,
    demo_id: demoId,
    order,
    synthetic_slide_id: `${slideId}__${demoId}`,
    title: String(rawDemo.title || "").trim(),
    source_video: String(rawDemo.source_video || rawDemo.video || rawDemo.src || "").trim(),
    segments,
  };
}

function loadDemoSlides(raw) {
  if (Array.isArray(raw?.slides)) return raw.slides;
  return Object.entries(raw?.slides || {}).map(([slideId, value]) => ({
    slide_id: slideId,
    ...(value || {}),
  }));
}

function normalizeDemoOverlayFile(raw) {
  const demos = [];
  for (const slideItem of loadDemoSlides(raw)) {
    const slideId = String(slideItem.slide_id || "").trim();
    if (!slideId) continue;
    demos.push(...asArray(slideItem.demos || slideItem.clips || slideItem.overlays)
      .map((demo, index) => normalizeDemo(demo, index, slideId))
      .filter((demo) => demo.segments.length));
  }
  return demos.sort((left, right) =>
    left.slide_id.localeCompare(right.slide_id) || left.order - right.order,
  );
}

async function loadDemoOverlays(descriptor, args) {
  const filePath = demoOverlayPath(descriptor, args);
  const raw = await readJsonIfExists(filePath);
  if (!raw) return { filePath, demos: [] };
  return {
    filePath,
    demos: normalizeDemoOverlayFile(raw),
  };
}

function makeOptions(args) {
  return {
    voiceName: args.voiceName,
    providerVoice: args.providerVoice || "",
    qwenMode: args.qwenMode || "",
    qwenModel: args.qwenModel || args.qwenModelId || "",
    qwenModelId: args.qwenModelId || args.qwenModel || "",
    qwenReferenceAudio: args.qwenReferenceAudio || "",
    qwenReferenceText: args.qwenReferenceText || "",
    qwenDevice: args.qwenDevice || "",
    qwenDtype: args.qwenDtype || "",
    qwenSeed: args.qwenSeed,
    qwenLanguage: args.qwenLanguage || "",
    qwenPythonBin: args.qwenPythonBin || "",
    allowProviderFallback: booleanOption(args.allowProviderFallback, false),
    avatarProfile: args.avatarProfile || "",
    referenceAssets: args.referenceAssets || "",
    lecturePlan: args.lecturePlan || "",
  };
}

function makeScriptManifest(descriptor, demos) {
  return {
    schema_version: "webdeck.demo_audio_script.v1",
    topic_id: descriptor.topic,
    slides: demos.map((demo) => ({
      slide_id: demo.synthetic_slide_id,
      source_slide_id: demo.slide_id,
      demo_id: demo.demo_id,
      title: demo.title,
      source_video: demo.source_video,
      provider_used: "manual_demo_overlay",
      segments: demo.segments,
    })),
  };
}

function makeDemoManifest({ descriptor, overlayFile, alignmentManifest, demos }) {
  const bySyntheticId = new Map(asArray(alignmentManifest.slides).map((slide) => [slide.slide_id, slide]));
  return {
    schema_version: "webdeck.demo_audio_manifest.v1",
    selector: {
      school: descriptor.school,
      course: descriptor.course,
      session: descriptor.session,
      topic: descriptor.topic,
    },
    source_overlay_file: relativeProjectPath(overlayFile),
    provider: alignmentManifest.provider,
    demos: demos.map((demo) => {
      const alignment = bySyntheticId.get(demo.synthetic_slide_id) || {};
      return {
        slide_id: demo.slide_id,
        demo_id: demo.demo_id,
        synthetic_slide_id: demo.synthetic_slide_id,
        title: demo.title,
        source_video: demo.source_video,
        audio_file: alignment.audio_file || "",
        duration: Number(alignment.duration || 0),
        segments: alignment.segments || [],
      };
    }),
  };
}

function makeMarkdown(report) {
  const lines = [
    "# Demo Audio Build Report",
    "",
    `- Selector: \`${report.selector}\``,
    `- TTS provider: \`${report.provider}\``,
    `- Topics: ${report.summary.total}`,
    `- Built: ${report.summary.success}`,
    `- Skipped: ${report.summary.skipped}`,
    `- Failed: ${report.summary.failed}`,
    "",
  ];

  for (const topic of report.topics) {
    lines.push(`## ${toReviewLabel(topic.descriptor)}`);
    lines.push("");
    lines.push(`- Status: ${topic.status}`);
    if (topic.status === "success") {
      lines.push(`- Demo audio dir: \`${topic.audio_dir}\``);
      lines.push(`- Manifest: \`${topic.manifest}\``);
      lines.push(`- Demos: ${topic.demo_count}`);
      lines.push(`- Duration: ${topic.total_duration}s`);
    } else if (topic.status === "skipped") {
      lines.push(`- Reason: ${topic.reason}`);
    } else {
      lines.push(`- Error: ${topic.error}`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

async function buildTopicDemoAudio({ descriptor, args }) {
  const overlay = await loadDemoOverlays(descriptor, args);
  if (!await fileExists(overlay.filePath)) {
    return {
      descriptor,
      status: "skipped",
      reason: `No demo overlay sidecar: ${relativeProjectPath(overlay.filePath)}`,
    };
  }
  if (!overlay.demos.length) {
    return {
      descriptor,
      status: "skipped",
      reason: `No demos with narration text in ${relativeProjectPath(overlay.filePath)}`,
    };
  }

  const { slidesData, topicMeta } = await loadTopicModule(descriptor);
  const runtime = buildTopicRuntime({
    topicMeta,
    slidesData,
    topicFallback: descriptor.topic,
  });
  const authoring = await loadLectureAuthoring({
    descriptor,
    runtime,
    slidesData,
    options: makeOptions(args),
  });
  const audioDir = demoAudioTopicDir(descriptor, args.outputDir);
  await mkdir(audioDir, { recursive: true });

  const scriptManifest = makeScriptManifest(descriptor, overlay.demos);
  const alignmentManifest = await synthesizeTopicAudio({
    scriptManifest,
    audioDir,
    providerId: args.provider,
    options: makeOptions(args),
    authoring,
  });
  const manifest = makeDemoManifest({
    descriptor,
    overlayFile: overlay.filePath,
    alignmentManifest,
    demos: overlay.demos,
  });
  const manifestPath = path.join(audioDir, "demo_alignment.json");
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  return {
    descriptor,
    status: "success",
    audio_dir: relativeProjectPath(audioDir),
    manifest: relativeProjectPath(manifestPath),
    demo_count: overlay.demos.length,
    total_duration: Math.round(
      manifest.demos.reduce((sum, demo) => sum + Number(demo.duration || 0), 0) * 100,
    ) / 100,
  };
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

  const report = {
    selector: summarizeSelector(selector),
    provider: args.provider,
    generated_at: new Date().toISOString(),
    topics: [],
    summary: {
      total: topics.length,
      success: 0,
      skipped: 0,
      failed: 0,
    },
  };

  for (const descriptor of topics) {
    try {
      const built = await buildTopicDemoAudio({ descriptor, args });
      report.summary[built.status] = (report.summary[built.status] || 0) + 1;
      report.topics.push(built);
      if (built.status === "success") {
        console.log(`Built demo audio for ${toReviewLabel(descriptor)} -> ${built.manifest}`);
      } else {
        console.log(`Skipped demo audio for ${toReviewLabel(descriptor)}: ${built.reason}`);
      }
    } catch (error) {
      report.summary.failed += 1;
      report.topics.push({
        status: "failed",
        descriptor,
        error: error?.message || String(error),
      });
      console.error(`Failed demo audio for ${toReviewLabel(descriptor)}: ${error?.message || error}`);
    }
  }

  if (args.writeReport) {
    await mkdir(args.outputDir, { recursive: true });
    const jsonPath = path.join(args.outputDir, "demo_audio.report.json");
    const mdPath = path.join(args.outputDir, "demo_audio.report.md");
    await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    await writeFile(mdPath, makeMarkdown(report), "utf8");
    console.log(`Demo audio JSON report written to ${jsonPath}`);
    console.log(`Demo audio Markdown report written to ${mdPath}`);
  }

  console.log(
    `Topics: ${report.summary.total} | built=${report.summary.success} skipped=${report.summary.skipped} failed=${report.summary.failed}`,
  );
  if (report.summary.failed > 0) {
    process.exitCode = 1;
  }
}

main()
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
