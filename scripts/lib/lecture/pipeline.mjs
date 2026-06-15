import { cp, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildTopicRuntime } from "../../../shared/deck_model.js";
import { buildTopicArtifactDir, createExportRuntime, projectRoot } from "../export_runtime.mjs";
import { loadTopicModule } from "../catalog.mjs";
import { loadLectureAuthoring } from "./authoring.mjs";
import { buildManualAlignmentPath, buildManualOutputsDir, relativeContractPath } from "./contracts.mjs";
import { generateScriptManifest } from "./script_generation.mjs";
import { synthesizeTopicAudio } from "../tts/synthesize.mjs";
import { writeSubtitles } from "./subtitles.mjs";
import { compileTimeline } from "./timeline.mjs";
import { writeAvatarJobs, writeSlideVideoJobs, writeTtsJobs } from "./jobs.mjs";
import { compileMotionManifest, writeMotionArtifacts } from "./motion_planning.mjs";
import { getTopicScriptPlanWithCache } from "./topic_script_plan.mjs";
import { writeLectureReview } from "./review.mjs";
import { relativeProjectPath } from "./utils.mjs";

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function readJsonIfExists(filePath) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch {
    return null;
  }
}

async function fileExists(filePath) {
  return Boolean(await stat(filePath).catch(() => null));
}

async function hasPngFiles(dirPath) {
  const entries = await readdir(dirPath).catch(() => []);
  return entries.some((entry) => entry.endsWith(".png"));
}

async function copyIfMissing(sourcePath, targetPath) {
  await cp(sourcePath, targetPath, {
    recursive: true,
    force: false,
    errorOnExist: false,
  }).catch(() => {});
}

function defaultLectureOutputRoot() {
  return path.join(projectRoot, "generated", "lectures");
}

function validationArtifactDir(descriptor) {
  return buildTopicArtifactDir(
    path.join(projectRoot, "generated", "validation", "exports"),
    descriptor,
  );
}

async function ensureManualOutputDirs(descriptor) {
  const outputDirs = buildManualOutputsDir(descriptor);
  await Promise.all(
    Object.values(outputDirs).map((dirPath) => mkdir(dirPath, { recursive: true })),
  );
  return outputDirs;
}

async function ensureCanonicalAudioDirs(descriptor) {
  const outputDirs = buildManualOutputsDir(descriptor);
  await Promise.all([
    mkdir(outputDirs.audio, { recursive: true }),
    mkdir(outputDirs.alignment, { recursive: true }),
  ]);
  return outputDirs;
}

async function ensureLayoutArtifacts({
  descriptor,
  artifactDir,
  viewport,
  debugScreenshots,
  analysisTimeoutMs,
  analysisAssetTimeoutMs,
  exportRuntime = null,
}) {
  const manifestPath = path.join(artifactDir, "layout.manifest.json");
  const screenshotsDir = path.join(artifactDir, "screenshots");

  if (await hasPngFiles(screenshotsDir).catch(() => false)) {
    return {
      manifest: await readJson(manifestPath),
      manifestPath,
      screenshotsDir,
      source: "existing",
    };
  }

  const validationDir = validationArtifactDir(descriptor);
  const validationManifestPath = path.join(validationDir, "layout.manifest.json");
  const validationScreenshotsDir = path.join(validationDir, "screenshots");

  if (await hasPngFiles(validationScreenshotsDir)) {
    await mkdir(artifactDir, { recursive: true });
    await copyIfMissing(validationManifestPath, manifestPath);
    await copyIfMissing(validationScreenshotsDir, screenshotsDir);
    return {
      manifest: await readJson(manifestPath),
      manifestPath,
      screenshotsDir,
      source: "validation-cache",
    };
  }

  const runtime = exportRuntime || await createExportRuntime({ viewport });
  try {
    const exported = await runtime.exportTopic({
      ...descriptor,
      outDir: artifactDir,
      viewport,
      debugScreenshots,
      analysisTimeoutMs,
      analysisAssetTimeoutMs,
    });
    return {
      manifest: exported.manifest,
      manifestPath: exported.manifestPath,
      screenshotsDir: exported.screenshotsDir,
      source: "fresh-export",
    };
  } finally {
    if (!exportRuntime) {
      await runtime.close();
    }
  }
}

function shouldBuildTopicScriptPlan(options = {}) {
  const provider = String(options.scriptProvider || (process.env.CI ? "deterministic" : "auto")).toLowerCase();
  const promptVersion = String(options.scriptPromptVersion || "script_writer_v2").trim();
  return (
    ["llm_local", "auto"].includes(provider)
    && Boolean(String(options.scriptModel || "").trim())
    && promptVersion === "script_writer_v2"
  );
}

export async function buildLectureScriptArtifacts({
  descriptor,
  outputRoot = defaultLectureOutputRoot(),
  viewport = "1920x1080",
  debugScreenshots = false,
  analysisTimeoutMs,
  analysisAssetTimeoutMs,
  exportRuntime = null,
  options = {},
}) {
  const artifactDir = buildTopicArtifactDir(outputRoot, descriptor);
  await mkdir(artifactDir, { recursive: true });

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
    options,
  });

  const layout = await ensureLayoutArtifacts({
    descriptor,
    artifactDir,
    viewport,
    debugScreenshots,
    analysisTimeoutMs,
    analysisAssetTimeoutMs,
    exportRuntime,
  });

  const topicScriptPlanResult = shouldBuildTopicScriptPlan(options)
    ? await getTopicScriptPlanWithCache({
      descriptor,
      runtime: topicRuntime,
      slidesData,
      authoring,
      layoutManifest: layout.manifest,
      options,
    })
    : null;

  let topicPlanPath = "";
  if (topicScriptPlanResult?.plan) {
    topicPlanPath = path.join(artifactDir, "script.topic_plan.json");
    await writeFile(topicPlanPath, `${JSON.stringify(topicScriptPlanResult.plan, null, 2)}\n`, "utf8");
  }

  const scriptManifest = await generateScriptManifest({
    descriptor,
    runtime: topicRuntime,
    slidesData,
    layoutManifest: layout.manifest,
    authoring,
    topicScriptPlan: topicScriptPlanResult?.plan || null,
    options,
  });
  const scriptManifestPath = path.join(artifactDir, "script.manifest.json");
  await writeFile(scriptManifestPath, `${JSON.stringify(scriptManifest, null, 2)}\n`, "utf8");

  return {
    descriptor,
    topic_id: topicRuntime.topicId,
    output_dir: relativeProjectPath(artifactDir),
    layout_source: layout.source,
    layout_manifest: relativeProjectPath(layout.manifestPath),
    script_manifest: relativeProjectPath(scriptManifestPath),
    topic_plan: topicPlanPath ? relativeProjectPath(topicPlanPath) : "",
    authoring_files: authoring.fileSummary,
    authoring_warnings: authoring.warnings,
    screenshots_dir: relativeProjectPath(layout.screenshotsDir),
    slide_count: scriptManifest.slides.length,
    provider_counts: scriptManifest.slides.reduce((counts, slide) => {
      const provider = slide.provider_used || "unknown";
      counts[provider] = (counts[provider] || 0) + 1;
      return counts;
    }, {}),
  };
}

export async function buildLectureAudioArtifacts({
  descriptor,
  outputRoot = defaultLectureOutputRoot(),
  providerId = "qwen3_tts",
  options = {},
}) {
  const artifactDir = buildTopicArtifactDir(outputRoot, descriptor);
  const scriptManifestPath = path.join(artifactDir, "script.manifest.json");
  if (!await fileExists(scriptManifestPath)) {
    throw new Error(`Missing required script manifest: ${relativeProjectPath(scriptManifestPath)}. Run build:prof-scripts first.`);
  }

  const scriptManifest = await readJson(scriptManifestPath);
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
    options,
  });
  const manualOutputDirs = await ensureCanonicalAudioDirs(descriptor);

  const alignmentManifest = await synthesizeTopicAudio({
    scriptManifest,
    audioDir: manualOutputDirs.audio,
    providerId,
    options,
    authoring,
  });
  const alignmentPath = buildManualAlignmentPath(descriptor);
  await writeFile(alignmentPath, `${JSON.stringify(alignmentManifest, null, 2)}\n`, "utf8");

  return {
    descriptor,
    topic_id: scriptManifest.topic_id,
    script_manifest: relativeProjectPath(scriptManifestPath),
    audio_dir: relativeContractPath(manualOutputDirs.audio),
    tts_alignment: relativeContractPath(alignmentPath),
    provider: alignmentManifest.provider,
    slide_count: alignmentManifest.slides.length,
    total_duration: Math.round(
      (alignmentManifest.slides || []).reduce(
        (sum, slide) => sum + Number(slide.duration || 0),
        0,
      ) * 100,
    ) / 100,
  };
}

export async function buildLectureArtifacts({
  descriptor,
  outputRoot = defaultLectureOutputRoot(),
  providerId = "qwen3_tts",
  viewport = "1920x1080",
  debugScreenshots = false,
  analysisTimeoutMs,
  analysisAssetTimeoutMs,
  exportRuntime = null,
  options = {},
}) {
  const artifactDir = buildTopicArtifactDir(outputRoot, descriptor);
  await mkdir(artifactDir, { recursive: true });

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
    options,
  });
  const manualOutputDirs = await ensureManualOutputDirs(descriptor);

  const layout = await ensureLayoutArtifacts({
    descriptor,
    artifactDir,
    viewport,
    debugScreenshots,
    analysisTimeoutMs,
    analysisAssetTimeoutMs,
    exportRuntime,
  });

  const topicScriptPlanResult = shouldBuildTopicScriptPlan(options)
    ? await getTopicScriptPlanWithCache({
      descriptor,
      runtime: topicRuntime,
      slidesData,
      authoring,
      layoutManifest: layout.manifest,
      options,
    })
    : null;
  if (topicScriptPlanResult?.plan) {
    const topicPlanPath = path.join(artifactDir, "script.topic_plan.json");
    await writeFile(topicPlanPath, `${JSON.stringify(topicScriptPlanResult.plan, null, 2)}\n`, "utf8");
  }

  const scriptManifest = await generateScriptManifest({
    descriptor,
    runtime: topicRuntime,
    slidesData,
    layoutManifest: layout.manifest,
    authoring,
    topicScriptPlan: topicScriptPlanResult?.plan || null,
    options,
  });
  const scriptManifestPath = path.join(artifactDir, "script.manifest.json");
  await writeFile(scriptManifestPath, `${JSON.stringify(scriptManifest, null, 2)}\n`, "utf8");

  const audioDir = manualOutputDirs.audio;
  const alignmentManifest = await synthesizeTopicAudio({
    scriptManifest,
    audioDir,
    providerId,
    options,
    authoring,
  });
  const alignmentPath = buildManualAlignmentPath(descriptor);
  await writeFile(alignmentPath, `${JSON.stringify(alignmentManifest, null, 2)}\n`, "utf8");

  const subtitles = await writeSubtitles({
    scriptManifest,
    alignmentManifest,
    subtitlesDir: path.join(artifactDir, "subtitles"),
  });

  const timelineManifest = compileTimeline({
    descriptor,
    scriptManifest,
    layoutManifest: layout.manifest,
    alignmentManifest,
    subtitles,
    outputDir: artifactDir,
    compiledAlignmentPath: relativeProjectPath(alignmentPath),
    authoring,
  });
  const timelinePath = path.join(artifactDir, "timeline.json");
  await writeFile(timelinePath, `${JSON.stringify(timelineManifest, null, 2)}\n`, "utf8");

  const manualAlignmentPath = buildManualAlignmentPath(descriptor);
  let motionAlignmentManifest = alignmentManifest;
  let motionTimingSource = "compiled";
  if (await fileExists(manualAlignmentPath)) {
    const manualAlignmentManifest = await readJsonIfExists(manualAlignmentPath);
    if (manualAlignmentManifest?.slides?.length) {
      motionAlignmentManifest = manualAlignmentManifest;
      motionTimingSource = "manual";
    }
  }
  const motionTimelineManifest = motionTimingSource === "manual"
    ? compileTimeline({
      descriptor,
      scriptManifest,
      layoutManifest: layout.manifest,
      alignmentManifest: motionAlignmentManifest,
      subtitles,
      outputDir: artifactDir,
      compiledAlignmentPath: relativeProjectPath(alignmentPath),
      authoring,
    })
    : timelineManifest;

  const motionManifest = compileMotionManifest({
    descriptor,
    scriptManifest,
    layoutManifest: layout.manifest,
    timelineManifest: motionTimelineManifest,
    authoring,
    sampleRateFps: Number(options.motionSampleRateFps || 6),
    timingSource: motionTimingSource,
  });
  const motionArtifacts = await writeMotionArtifacts({
    descriptor,
    motionManifest,
    artifactDir,
  });

  const ttsJobs = await writeTtsJobs({
    descriptor,
    scriptManifest,
    alignmentManifest,
    providerId,
    options,
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

  const review = await writeLectureReview({
    descriptor,
    scriptManifest,
    alignmentManifest,
    timelineManifest,
    motionManifest,
    motionArtifacts,
    screenshotsDir: layout.screenshotsDir,
    reviewDir: path.join(artifactDir, "review"),
    avatarJobs,
    slideVideoJobs,
    authoring,
  });

  return {
    descriptor,
    topic_id: topicRuntime.topicId,
    output_dir: relativeProjectPath(artifactDir),
    layout_source: layout.source,
    layout_manifest: relativeProjectPath(layout.manifestPath),
    script_manifest: relativeProjectPath(scriptManifestPath),
    tts_alignment: relativeProjectPath(alignmentPath),
    timeline: relativeProjectPath(timelinePath),
    motion_manifest: motionArtifacts.topic_manifest,
    subtitles,
    review,
    authoring_files: authoring.fileSummary,
    authoring_warnings: authoring.warnings,
    tts_jobs: ttsJobs,
    avatar_jobs: avatarJobs,
    slide_video_jobs: slideVideoJobs,
    screenshots_dir: relativeProjectPath(layout.screenshotsDir),
    audio_dir: relativeProjectPath(audioDir),
    manual_outputs: Object.fromEntries(
      Object.entries(manualOutputDirs).map(([key, value]) => [key, relativeContractPath(value)]),
    ),
    slide_count: scriptManifest.slides.length,
    total_duration: Math.round(
      (alignmentManifest.slides || []).reduce(
        (sum, slide) => sum + Number(slide.duration || 0),
        0,
      ) * 100,
    ) / 100,
  };
}
