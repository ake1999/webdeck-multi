#!/usr/bin/env node

import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildTopicRuntime } from "../shared/deck_model.js";
import { discoverTopics, filterTopics, loadTopicModule, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";
import { buildTopicArtifactDir, projectRoot } from "./lib/export_runtime.mjs";
import { loadLectureAuthoring } from "./lib/lecture/authoring.mjs";
import { buildManualAlignmentPath } from "./lib/lecture/contracts.mjs";
import { writeAvatarJobs, writeSlideVideoJobs } from "./lib/lecture/jobs.mjs";
import { compileMotionManifest, writeMotionArtifacts } from "./lib/lecture/motion_planning.mjs";
import { writeLectureReview } from "./lib/lecture/review.mjs";
import { writeSubtitles } from "./lib/lecture/subtitles.mjs";
import { compileTimeline } from "./lib/lecture/timeline.mjs";
import { relativeProjectPath } from "./lib/lecture/utils.mjs";

function parseArgs(argv) {
  const args = {
    outputDir: path.join(projectRoot, "generated", "lectures"),
    motionSampleRateFps: 6,
    writeSubtitles: false,
    writeReview: false,
    writeTimeline: false,
    writeReport: false,
  };
  const booleanFlags = new Set([
    "write-subtitles",
    "write-review",
    "write-timeline",
    "write-report",
    "writeSubtitles",
    "writeReview",
    "writeTimeline",
    "writeReport",
  ]);
  const normalizeKey = (key) => key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const rawKey = token.slice(2);
    const key = normalizeKey(rawKey);
    if (booleanFlags.has(rawKey)) {
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

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function fileExists(filePath) {
  return Boolean(await stat(filePath).catch(() => null));
}

function makeMarkdown(report) {
  const lines = [
    "# WebDeck Motion Refresh Report",
    "",
    `- Selector: \`${report.selector}\``,
    `- Topics: ${report.summary.total}`,
    `- Refreshed: ${report.summary.success}`,
    `- Failed: ${report.summary.failed}`,
    "",
  ];

  report.topics.forEach((topic) => {
    lines.push(`## ${toReviewLabel(topic.descriptor)}`);
    lines.push("");
    lines.push(`- Status: ${topic.status}`);
    if (topic.status === "success") {
      lines.push(`- Timing source: \`${topic.timing_source}\``);
      lines.push(`- Timeline: \`${topic.timeline}\``);
      lines.push(`- Motion manifest: \`${topic.motion_manifest}\``);
      lines.push(`- Slide video jobs: \`${topic.slide_video_jobs?.dir || ""}\``);
      lines.push(`- Avatar jobs: \`${topic.avatar_jobs?.dir || ""}\``);
      lines.push(`- Review: \`${topic.review?.html || ""}\``);
    } else {
      lines.push(`- Error: ${topic.error}`);
    }
    lines.push("");
  });

  return `${lines.join("\n")}\n`;
}

async function refreshTopic({ descriptor, outputRoot, sampleRateFps, options = {} }) {
  const artifactDir = buildTopicArtifactDir(outputRoot, descriptor);
  const scriptManifestPath = path.join(artifactDir, "script.manifest.json");
  const layoutManifestPath = path.join(artifactDir, "layout.manifest.json");
  const compiledAlignmentPath = path.join(artifactDir, "tts_alignment.json");
  const screenshotsDir = path.join(artifactDir, "screenshots");

  for (const requiredPath of [scriptManifestPath, layoutManifestPath]) {
    if (!await fileExists(requiredPath)) {
      throw new Error(`Missing required artifact: ${relativeProjectPath(requiredPath)}`);
    }
  }

  const scriptManifest = await readJson(scriptManifestPath);
  const layoutManifest = await readJson(layoutManifestPath);

  const manualAlignmentPath = buildManualAlignmentPath(descriptor);
  const useManualAlignment = await fileExists(manualAlignmentPath);
  const useCompiledAlignment = !useManualAlignment && await fileExists(compiledAlignmentPath);
  if (!useManualAlignment && !useCompiledAlignment) {
    throw new Error(
      `Missing required alignment artifact: ${relativeProjectPath(manualAlignmentPath)} `
      + `or ${relativeProjectPath(compiledAlignmentPath)}. Run build:audio first.`,
    );
  }
  const chosenAlignmentPath = useManualAlignment ? manualAlignmentPath : compiledAlignmentPath;
  const alignmentManifest = await readJson(chosenAlignmentPath);
  const timingSource = useManualAlignment ? "manual" : "compiled";

  const { slidesData, topicMeta } = await loadTopicModule(descriptor);
  const topicRuntime = buildTopicRuntime({
    topicMeta,
    slidesData,
    topicFallback: descriptor.topic,
  });
  const authoring = await loadLectureAuthoring({
    descriptor,
    runtime: topicRuntime,
    slidesData,
    options: {},
  });

  const subtitles = options.writeSubtitles
    ? await writeSubtitles({
      scriptManifest,
      alignmentManifest,
      subtitlesDir: path.join(artifactDir, "subtitles"),
    })
    : {
      topic_file: "",
      slide_files: {},
    };

  const timelineManifest = compileTimeline({
    descriptor,
    scriptManifest,
    layoutManifest,
    alignmentManifest,
    subtitles,
    outputDir: artifactDir,
    compiledAlignmentPath: relativeProjectPath(chosenAlignmentPath),
    authoring,
  });
  const timelinePath = path.join(artifactDir, "timeline.json");
  if (options.writeTimeline) {
    await writeFile(timelinePath, `${JSON.stringify(timelineManifest, null, 2)}\n`, "utf8");
  }

  const motionManifest = compileMotionManifest({
    descriptor,
    scriptManifest,
    layoutManifest,
    timelineManifest,
    authoring,
    sampleRateFps,
    timingSource,
  });
  const motionArtifacts = await writeMotionArtifacts({
    descriptor,
    motionManifest,
    artifactDir,
  });

  const avatarJobs = await writeAvatarJobs({
    descriptor,
    timelineManifest,
    authoring,
  });
  const slideVideoJobs = await writeSlideVideoJobs({
    descriptor,
    motionArtifacts,
    motionManifest,
  });
  const review = options.writeReview
    ? await writeLectureReview({
      descriptor,
      scriptManifest,
      alignmentManifest,
      timelineManifest,
      motionManifest,
      motionArtifacts,
      screenshotsDir,
      reviewDir: path.join(artifactDir, "review"),
      avatarJobs,
      slideVideoJobs,
      authoring,
    })
    : null;

  return {
    descriptor,
    timing_source: timingSource,
    alignment_manifest: relativeProjectPath(chosenAlignmentPath),
    timeline: options.writeTimeline ? relativeProjectPath(timelinePath) : "",
    motion_manifest: motionArtifacts.topic_manifest,
    avatar_jobs: avatarJobs,
    slide_video_jobs: slideVideoJobs,
    review,
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
    generated_at: new Date().toISOString(),
    topics: [],
    summary: {
      total: topics.length,
      success: 0,
      failed: 0,
    },
  };

  for (const descriptor of topics) {
    try {
      const refreshed = await refreshTopic({
        descriptor,
        outputRoot: args.outputDir,
        sampleRateFps: Number(args.motionSampleRateFps || 6),
        options: {
          writeSubtitles: Boolean(args.writeSubtitles),
          writeReview: Boolean(args.writeReview),
          writeTimeline: Boolean(args.writeTimeline),
        },
      });
      report.summary.success += 1;
      report.topics.push({
        status: "success",
        ...refreshed,
      });
      console.log(
        `Refreshed motion for ${toReviewLabel(descriptor)} `
        + `(timing=${refreshed.timing_source}) -> ${refreshed.motion_manifest}`,
      );
    } catch (error) {
      report.summary.failed += 1;
      report.topics.push({
        status: "failed",
        descriptor,
        error: error?.message || String(error),
      });
      console.error(`Failed to refresh ${toReviewLabel(descriptor)}: ${error?.message || error}`);
    }
  }

  if (args.writeReport) {
    await mkdir(args.outputDir, { recursive: true });
    const jsonPath = path.join(args.outputDir, "motion_refresh.report.json");
    const mdPath = path.join(args.outputDir, "motion_refresh.report.md");
    await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    await writeFile(mdPath, makeMarkdown(report), "utf8");

    console.log(`Motion refresh JSON written to ${jsonPath}`);
    console.log(`Motion refresh Markdown written to ${mdPath}`);
  }
  console.log(`Topics: ${report.summary.total} | refreshed=${report.summary.success} failed=${report.summary.failed}`);

  if (report.summary.failed > 0) {
    process.exitCode = 1;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
