import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildTopicArtifactDir, projectRoot } from "../export_runtime.mjs";
import { localFileExists } from "../catalog.mjs";
import { validateLayoutManifest } from "../manifest_schema.mjs";
import { runCommandCapture } from "../tts/audio_utils.mjs";
import {
  buildCatalogSummaryPath,
  buildJobsDir,
  buildManualOutputsDir,
  buildStatusDir,
  buildTopicStatusPath,
  issueCounts,
  issueStatus,
  normalizeMediaSourceMode,
  relativeContractPath,
  validateAvatarJob,
  validateAvatarProfile,
  validateJobStatus,
  validateLecturePlan,
  validateReferenceAssets,
  validateScriptManifest,
  validateScriptOverride,
  validateTimelineManifest,
  validateTtsJob,
} from "./contracts.mjs";

const TOPIC_STATUS_SCHEMA_VERSION = "phase4_5-topic-status-v1";
const CATALOG_SUMMARY_SCHEMA_VERSION = "phase4_5-catalog-summary-v1";
const NON_BLOCKING_WARNING_CODES = new Set([
  "slide.no_safe_zone",
  "element.bbox_overflow_x",
  "element.bbox_overflow_y",
]);

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function pushIssue(issues, severity, code, message, location = "") {
  issues.push({ severity, code, message, location });
}

async function readJsonSafe(filePath, issues, codeBase, location) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    pushIssue(issues, "error", `${codeBase}.read`, `Failed to read JSON file: ${error?.message || error}`, location);
    return null;
  }
}

async function collectJsonFiles(dirPath) {
  const entries = await readdir(dirPath).catch(() => []);
  return entries
    .filter((entry) => entry.endsWith(".json"))
    .map((entry) => path.join(dirPath, entry))
    .sort((left, right) => left.localeCompare(right));
}

async function directoryExists(dirPath) {
  return Boolean(await stat(dirPath).catch(() => null));
}

async function validateJsonFile({ filePath, validator, issues, codeBase, location }) {
  const exists = await localFileExists(filePath);
  if (!exists) {
    pushIssue(issues, "error", `${codeBase}.missing`, "Required file is missing.", location);
    return null;
  }
  const json = await readJsonSafe(filePath, issues, codeBase, location);
  if (!json) return null;
  validator(json).forEach((issue) => issues.push(issue));
  return json;
}

async function probeRenderHasAudio(filePath) {
  const output = await runCommandCapture("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "stream=codec_type",
    "-of",
    "default=nw=1:nk=1",
    filePath,
  ]).catch(() => "");
  return String(output).split(/\s+/).includes("audio");
}

function summarizeJobStates(statuses) {
  return statuses.reduce(
    (counts, status) => {
      counts[status.state] = (counts[status.state] || 0) + 1;
      if (status.reused) counts.reused += 1;
      return counts;
    },
    { pending: 0, running: 0, done: 0, error: 0, reused: 0 },
  );
}

function blockerReasonsFromIssues(issues) {
  return issues
    .filter((issue) => issue.severity === "error")
    .map((issue) => `${issue.code}: ${issue.message}${issue.location ? ` (${issue.location})` : ""}`);
}

function topicSelector(descriptor) {
  return {
    school: descriptor.school,
    course: descriptor.course,
    session: descriptor.session,
    topic: descriptor.topic,
  };
}

export async function validateTopicGenerationReadiness({
  descriptor,
  outputRoot = path.join(projectRoot, "generated", "lectures"),
  buildError = "",
}) {
  const issues = [];
  const artifactDir = buildTopicArtifactDir(outputRoot, descriptor);
  const lecturePlanPath = descriptor.filePath.replace(/\.slides\.js$/, ".lecture.plan.json");
  const scriptOverridePath = descriptor.filePath.replace(/\.slides\.js$/, ".script.override.json");
  const reviewPath = path.join(artifactDir, "review", "index.html");
  const subtitlesDir = path.join(artifactDir, "subtitles");
  const statusDir = buildStatusDir(descriptor);
  const manualOutputs = buildManualOutputsDir(descriptor);

  const lecturePlan = await validateJsonFile({
    filePath: lecturePlanPath,
    validator: validateLecturePlan,
    issues,
    codeBase: "lecture_plan",
    location: "authored.lecture_plan",
  });

  if (await localFileExists(scriptOverridePath)) {
    await validateJsonFile({
      filePath: scriptOverridePath,
      validator: validateScriptOverride,
      issues,
      codeBase: "script_override",
      location: "authored.script_override",
    });
  }

  const avatarProfilePath = lecturePlan?.avatar_profile
    ? path.resolve(projectRoot, lecturePlan.avatar_profile)
    : path.join(projectRoot, "shared", "avatar.profile.json");
  const referenceAssetsPath = lecturePlan?.reference_assets
    ? path.resolve(projectRoot, lecturePlan.reference_assets)
    : path.join(projectRoot, "shared", "reference_assets.json");

  await validateJsonFile({
    filePath: avatarProfilePath,
    validator: validateAvatarProfile,
    issues,
    codeBase: "avatar_profile",
    location: "authored.avatar_profile",
  });
  await validateJsonFile({
    filePath: referenceAssetsPath,
    validator: validateReferenceAssets,
    issues,
    codeBase: "reference_assets",
    location: "authored.reference_assets",
  });

  if (buildError) {
    pushIssue(issues, "error", "build.failed", buildError, "build");
  }

  const layoutManifestPath = path.join(artifactDir, "layout.manifest.json");
  const scriptManifestPath = path.join(artifactDir, "script.manifest.json");
  const timelinePath = path.join(artifactDir, "timeline.json");

  if (!buildError) {
    await validateJsonFile({
      filePath: layoutManifestPath,
      validator: validateLayoutManifest,
      issues,
      codeBase: "layout_manifest",
      location: "generated.layout_manifest",
    });
    await validateJsonFile({
      filePath: scriptManifestPath,
      validator: validateScriptManifest,
      issues,
      codeBase: "script_manifest",
      location: "generated.script_manifest",
    });
    await validateJsonFile({
      filePath: timelinePath,
      validator: validateTimelineManifest,
      issues,
      codeBase: "timeline",
      location: "generated.timeline",
    });
  }

  if (!await localFileExists(reviewPath)) {
    pushIssue(issues, "error", "review.missing", "Review HTML is missing.", "generated.review");
  }

  const subtitlesEntries = await readdir(subtitlesDir).catch(() => []);
  if (!subtitlesEntries.some((entry) => entry.endsWith(".vtt"))) {
    pushIssue(issues, "error", "subtitles.missing", "No subtitle VTT files were generated.", "generated.subtitles");
  }

  for (const [key, dirPath] of Object.entries(manualOutputs)) {
    if (!await directoryExists(dirPath)) {
      pushIssue(issues, "error", "manual_output_dir.missing", `Manual output directory is missing: ${key}`, `manual_outputs.${key}`);
    }
  }

  const ttsJobDir = buildJobsDir("tts", descriptor);
  const avatarJobDir = buildJobsDir("avatar", descriptor);
  const ttsJobs = [];
  const avatarJobs = [];
  const ttsJobStatuses = [];
  const avatarJobStatuses = [];

  const ttsJobFiles = await collectJsonFiles(ttsJobDir);
  if (!ttsJobFiles.length) {
    pushIssue(issues, "error", "tts_jobs.missing", "No TTS job files were generated.", "generated.jobs.tts");
  }
  for (const filePath of ttsJobFiles) {
    const json = await readJsonSafe(filePath, issues, "tts_job", relativeContractPath(filePath));
    if (!json) continue;
    validateTtsJob(json).forEach((issue) => issues.push(issue));
    ttsJobs.push(json);
  }

  const avatarJobFiles = await collectJsonFiles(avatarJobDir);
  if (!avatarJobFiles.length) {
    pushIssue(issues, "error", "avatar_jobs.missing", "No avatar job files were generated.", "generated.jobs.avatar");
  }
  for (const filePath of avatarJobFiles) {
    const json = await readJsonSafe(filePath, issues, "avatar_job", relativeContractPath(filePath));
    if (!json) continue;
    validateAvatarJob(json).forEach((issue) => issues.push(issue));
    avatarJobs.push(json);
  }

  const ttsStatusFiles = await collectJsonFiles(path.join(statusDir, "tts"));
  for (const filePath of ttsStatusFiles) {
    const json = await readJsonSafe(filePath, issues, "tts_status", relativeContractPath(filePath));
    if (!json) continue;
    validateJobStatus(json).forEach((issue) => issues.push(issue));
    ttsJobStatuses.push(json);
  }

  const avatarStatusFiles = await collectJsonFiles(path.join(statusDir, "avatar"));
  for (const filePath of avatarStatusFiles) {
    const json = await readJsonSafe(filePath, issues, "avatar_status", relativeContractPath(filePath));
    if (!json) continue;
    validateJobStatus(json).forEach((issue) => issues.push(issue));
    avatarJobStatuses.push(json);
  }

  const manualRenderEntries = await readdir(manualOutputs.renders).catch(() => []);
  for (const entry of manualRenderEntries) {
    if (!entry.endsWith(".webm")) continue;
    const filePath = path.join(manualOutputs.renders, entry);
    if (await probeRenderHasAudio(filePath)) {
      pushIssue(issues, "error", "manual_render.contains_audio", "Avatar render clips must be silent.", relativeContractPath(filePath));
    }
  }

  const blocker_reasons = blockerReasonsFromIssues(issues);
  const significantWarnings = issues.filter(
    (issue) => issue.severity === "warning" && !NON_BLOCKING_WARNING_CODES.has(issue.code),
  );
  const readiness_state = blocker_reasons.length
    ? "blocked"
    : significantWarnings.length
      ? "warning"
      : "ready_for_generation";
  const ttsCounts = summarizeJobStates(ttsJobStatuses);
  const avatarCounts = summarizeJobStates(avatarJobStatuses);

  return {
    schema_version: TOPIC_STATUS_SCHEMA_VERSION,
    selector: topicSelector(descriptor),
    artifact_dir: relativeContractPath(artifactDir),
    readiness_state,
    source_mode_default: normalizeMediaSourceMode("compiled"),
    authored_files: {
      lecture_plan: relativeContractPath(lecturePlanPath),
      avatar_profile: relativeContractPath(avatarProfilePath),
      reference_assets: relativeContractPath(referenceAssetsPath),
    },
    generated_files: {
      layout_manifest: relativeContractPath(layoutManifestPath),
      script_manifest: relativeContractPath(scriptManifestPath),
      timeline: relativeContractPath(timelinePath),
      review: relativeContractPath(reviewPath),
      subtitles_dir: relativeContractPath(subtitlesDir),
      tts_jobs_dir: relativeContractPath(ttsJobDir),
      avatar_jobs_dir: relativeContractPath(avatarJobDir),
    },
    manual_outputs: Object.fromEntries(
      Object.entries(manualOutputs).map(([key, value]) => [key, relativeContractPath(value)]),
    ),
    job_counts: {
      tts: ttsCounts,
      avatar: avatarCounts,
    },
    blocker_reasons,
    issue_counts: issueCounts(issues),
    issues,
  };
}

export async function writeTopicGenerationStatus(status) {
  const topicStatusPath = buildTopicStatusPath(status.selector);
  await mkdir(path.dirname(topicStatusPath), { recursive: true });
  await writeFile(topicStatusPath, `${JSON.stringify(status, null, 2)}\n`, "utf8");
  return relativeContractPath(topicStatusPath);
}

export async function buildCatalogSummary(topicStatuses) {
  const totalTopics = topicStatuses.length;
  const blockedTopics = topicStatuses.filter((item) => item.readiness_state === "blocked");
  const readyTopics = topicStatuses.filter((item) => item.readiness_state === "ready_for_generation");
  const warningTopics = topicStatuses.filter((item) => item.readiness_state === "warning");
  const exportableTopics = totalTopics - blockedTopics.length;

  const summary = {
    schema_version: CATALOG_SUMMARY_SCHEMA_VERSION,
    generated_at: new Date().toISOString(),
    total_topics: totalTopics,
    exportable_topics: exportableTopics,
    blocked_topics: blockedTopics.length,
    ready_for_generation: readyTopics.length,
    warning: warningTopics.length,
    blocked: blockedTopics.length,
    exact_blocked_topic_reasons: blockedTopics.map((item) => ({
      selector: item.selector,
      reasons: item.blocker_reasons,
    })),
    reusable_tts_jobs: topicStatuses.reduce((sum, item) => sum + Number(item.job_counts?.tts?.reused || 0), 0),
    reusable_avatar_jobs: topicStatuses.reduce((sum, item) => sum + Number(item.job_counts?.avatar?.reused || 0), 0),
    topics: topicStatuses.map((item) => ({
      selector: item.selector,
      readiness_state: item.readiness_state,
      blocker_reasons: item.blocker_reasons,
      reusable_tts_jobs: Number(item.job_counts?.tts?.reused || 0),
      reusable_avatar_jobs: Number(item.job_counts?.avatar?.reused || 0),
    })),
  };

  const outputPath = buildCatalogSummaryPath();
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
  return {
    path: relativeContractPath(outputPath),
    summary,
  };
}
