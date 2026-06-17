import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  AVATAR_JOB_SCHEMA_VERSION,
  JOB_STATUS_SCHEMA_VERSION,
  SLIDE_VIDEO_JOB_SCHEMA_VERSION,
  TTS_JOB_SCHEMA_VERSION,
  buildAvatarJobPath,
  buildCompiledRenderPath,
  buildJobStatusPath,
  buildJobsDir,
  buildManualSlideVideoPath,
  buildTtsJobPath,
  buildSlideVideoJobPath,
  buildManualAlignmentPath,
  buildManualAudioPath,
  buildManualRenderPath,
  contractHash,
  relativeContractPath,
} from "./contracts.mjs";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

async function fileExists(filePath) {
  return Boolean(await stat(filePath).catch(() => null));
}

async function readJsonIfExists(filePath) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch {
    return null;
  }
}

function nowIso() {
  return new Date().toISOString();
}

function summarizeStatuses(statuses) {
  return statuses.reduce(
    (counts, status) => {
      counts[status.state] = (counts[status.state] || 0) + 1;
      if (status.reused) counts.reused += 1;
      return counts;
    },
    { pending: 0, running: 0, done: 0, error: 0, reused: 0 },
  );
}

async function buildJobStatus({ descriptor, kind, jobBaseName, job, requiredOutputs }) {
  const statusPath = buildJobStatusPath(descriptor, kind, jobBaseName);
  await mkdir(path.dirname(statusPath), { recursive: true });

  const existing = await readJsonIfExists(statusPath);
  const outputsExist = await Promise.all(requiredOutputs.map((filePath) => fileExists(filePath)));
  const allOutputsReady = outputsExist.every(Boolean);
  const reusable = Boolean(
    existing
    && existing.state === "done"
    && existing.contract_hash === job.contract_hash
    && allOutputsReady,
  );

  const base = {
    schema_version: JOB_STATUS_SCHEMA_VERSION,
    job_id: job.job_id,
    kind,
    state: reusable ? "done" : "pending",
    contract_hash: job.contract_hash,
    output_file: job.output_file,
    secondary_output_files: (job.secondary_output_files || []).slice(),
    reused: reusable,
    updated_at: nowIso(),
  };

  if (reusable && existing?.started_at) {
    base.started_at = existing.started_at;
  }

  await writeFile(statusPath, `${JSON.stringify(base, null, 2)}\n`, "utf8");
  return {
    path: relativeContractPath(statusPath),
    data: base,
  };
}

function selectorForJob(descriptor) {
  return {
    school: descriptor.school,
    course: descriptor.course,
    session: descriptor.session,
    topic: descriptor.topic,
  };
}

export function buildTtsJobRecord({
  descriptor,
  scriptManifest,
  slide,
  slideAlignment = null,
  alignmentManifest = null,
  providerId,
  options = {},
}) {
  const topicAlignmentPath = buildManualAlignmentPath(descriptor);
  const outputAudioPath = buildManualAudioPath(descriptor, slide.slide_id);
  const providerMeta = slideAlignment?.provider || alignmentManifest?.provider || null;
  const jobBase = {
    schema_version: TTS_JOB_SCHEMA_VERSION,
    kind: "tts",
    job_id: `${scriptManifest.topic_id}__${slide.slide_id}`,
    topic_id: scriptManifest.topic_id,
    selector: selectorForJob(descriptor),
    slide_id: slide.slide_id,
    provider: {
      requested_provider: providerId,
      active_provider: providerMeta?.actual_provider || providerMeta?.provider_id || alignmentManifest?.provider?.id || providerId,
      config_hash: alignmentManifest?.provider?.config_hash || "",
      requested_mode: options.qwenMode || "",
    },
    audio_output_file: relativeContractPath(outputAudioPath),
    alignment_output_file: relativeContractPath(topicAlignmentPath),
    alignment_slide_id: slide.slide_id,
    warnings: (slide.warnings || []).slice(),
    segments: asArray(slide.segments).map((segment) => ({
      segment_id: segment.segment_id,
      text: segment.text,
      ...(segment.tts_text ? { tts_text: segment.tts_text } : {}),
      tone: segment.voice?.tone || "",
      energy: Number(segment.voice?.energy || 0),
      pace: Number(segment.voice?.pace || 0),
      emphasis_words: asArray(segment.emphasis_words),
      target_element: segment.target_element,
      attention_mode: segment.attention_mode || "",
    })),
  };

  return {
    ...jobBase,
    contract_hash: contractHash(jobBase),
    output_file: relativeContractPath(outputAudioPath),
    secondary_output_files: [relativeContractPath(topicAlignmentPath)],
  };
}

export async function writeTtsJobs({
  descriptor,
  scriptManifest,
  alignmentManifest,
  providerId,
  options = {},
}) {
  const jobsDir = buildJobsDir("tts", descriptor);
  await mkdir(jobsDir, { recursive: true });

  const topicAlignmentPath = buildManualAlignmentPath(descriptor);
  const jobs = [];
  const jobFiles = [];
  const statuses = [];
  const statusFiles = [];

  for (const slide of asArray(scriptManifest?.slides)) {
    const slideAlignment = asArray(alignmentManifest?.slides).find((item) => item.slide_id === slide.slide_id);
    const outputAudioPath = buildManualAudioPath(descriptor, slide.slide_id);
    const job = buildTtsJobRecord({
      descriptor,
      scriptManifest,
      slide,
      slideAlignment,
      alignmentManifest,
      providerId,
      options,
    });

    const jobPath = buildTtsJobPath(descriptor, slide.slide_id);
    await writeFile(jobPath, `${JSON.stringify(job, null, 2)}\n`, "utf8");
    jobFiles.push(relativeContractPath(jobPath));
    jobs.push(job);

    const status = await buildJobStatus({
      descriptor,
      kind: "tts",
      jobBaseName: slide.slide_id,
      job,
      requiredOutputs: [outputAudioPath, topicAlignmentPath],
    });
    statusFiles.push(status.path);
    statuses.push(status.data);
  }

  return {
    dir: relativeContractPath(jobsDir),
    files: jobFiles,
    jobs,
    statuses,
    status_files: statusFiles,
    counts: summarizeStatuses(statuses),
  };
}

export async function writeAvatarJobs({
  descriptor,
  timelineManifest,
  authoring,
}) {
  const jobsDir = buildJobsDir("avatar", descriptor);
  await mkdir(jobsDir, { recursive: true });

  const jobFiles = [];
  const jobs = [];
  const statuses = [];
  const statusFiles = [];

  for (const slide of asArray(timelineManifest?.slides)) {
    for (const cue of asArray(slide.timeline)) {
      const avatarAction = asArray(cue.actions).find((action) => action.type === "avatar");
      if (!avatarAction || avatarAction.behavior === "clear_avatar") continue;

      const outputWebmPath = buildManualRenderPath(descriptor, slide.slide_id, cue.cue_id, "webm");
      const outputPngPath = buildManualRenderPath(descriptor, slide.slide_id, cue.cue_id, "png");
      const compiledRenderPath = buildCompiledRenderPath(descriptor, slide.slide_id, cue.cue_id);

      const jobBase = {
        schema_version: AVATAR_JOB_SCHEMA_VERSION,
        kind: "avatar",
        job_id: `${timelineManifest.topic_id}__${slide.slide_id}__${cue.cue_id}`,
        type: "transparent_avatar_clip",
        selector: selectorForJob(descriptor),
        topic_id: timelineManifest.topic_id,
        slide_id: slide.slide_id,
        cue_id: cue.cue_id,
        character_id: authoring?.avatarProfile?.character_id || "teacher_avatar",
        behavior: avatarAction.behavior,
        expression: avatarAction.expression,
        duration_sec: Math.round((Number(cue.t1 || 0) - Number(cue.t0 || 0)) * 100) / 100,
        background: "transparent",
        contains_audio: false,
        output_file: relativeContractPath(outputWebmPath),
        secondary_output_files: [relativeContractPath(outputPngPath)],
        compiled_output_file: relativeContractPath(compiledRenderPath),
        screen_anchor: avatarAction.screen_anchor,
        target_element: avatarAction.target_element,
        replaceable: true,
      };

      const job = {
        ...jobBase,
        contract_hash: contractHash(jobBase),
      };

      const jobPath = buildAvatarJobPath(descriptor, slide.slide_id, cue.cue_id);
      await writeFile(jobPath, `${JSON.stringify(job, null, 2)}\n`, "utf8");
      jobFiles.push(relativeContractPath(jobPath));
      jobs.push(job);

      const status = await buildJobStatus({
        descriptor,
        kind: "avatar",
        jobBaseName: `${slide.slide_id}__${cue.cue_id}`,
        job,
        requiredOutputs: [outputWebmPath],
      });

      if (status.data.state !== "done" && await fileExists(outputPngPath)) {
        status.data.state = "done";
        status.data.reused = true;
        status.data.resolved_output_file = relativeContractPath(outputPngPath);
        await writeFile(
          buildJobStatusPath(descriptor, "avatar", `${slide.slide_id}__${cue.cue_id}`),
          `${JSON.stringify(status.data, null, 2)}\n`,
          "utf8",
        );
      }

      statusFiles.push(status.path);
      statuses.push(status.data);
    }
  }

  return {
    dir: relativeContractPath(jobsDir),
    files: jobFiles,
    jobs,
    statuses,
    status_files: statusFiles,
    counts: summarizeStatuses(statuses),
  };
}

export async function writeSlideVideoJobs({
  descriptor,
  motionArtifacts,
  motionManifest,
}) {
  const jobsDir = buildJobsDir("slide_video", descriptor);
  await mkdir(jobsDir, { recursive: true });

  const jobFiles = [];
  const jobs = [];
  const statuses = [];
  const statusFiles = [];
  const slideFileById = new Map((motionArtifacts?.slide_files || []).map((item) => [item.slide_id, item.path]));

  for (const slide of asArray(motionManifest?.slides)) {
    const outputWebmPath = buildManualSlideVideoPath(descriptor, slide.slide_id, "webm");
    const outputMp4Path = buildManualSlideVideoPath(descriptor, slide.slide_id, "mp4");
    const motionFile = slideFileById.get(slide.slide_id) || "";
    await mkdir(path.dirname(outputWebmPath), { recursive: true });

    const jobBase = {
      schema_version: SLIDE_VIDEO_JOB_SCHEMA_VERSION,
      kind: "slide_video",
      job_id: `${motionManifest.topic_id}__${slide.slide_id}`,
      selector: selectorForJob(descriptor),
      topic_id: motionManifest.topic_id,
      slide_id: slide.slide_id,
      duration_sec: Math.round(Number(slide.duration || 0) * 100) / 100,
      timing_source: slide.timing_source || motionManifest.timing_source || "compiled",
      viewport: Array.isArray(slide.viewport) ? slide.viewport.slice() : [],
      sample_rate_fps: Number(motionManifest.sample_rate_fps || 6),
      fixed_camera: true,
      background: "transparent",
      contains_audio: false,
      audio: {
        preferred: slide.media?.audio?.manual || slide.media?.audio?.compiled || "",
        manual: slide.media?.audio?.manual || "",
        compiled: slide.media?.audio?.compiled || "",
      },
      alignment: {
        preferred: slide.media?.alignment?.manual || slide.media?.alignment?.compiled || "",
        manual: slide.media?.alignment?.manual || "",
        compiled: slide.media?.alignment?.compiled || "",
      },
      resolved_audio_file: (
        (slide.timing_source || motionManifest.timing_source) === "manual"
          ? (slide.media?.audio?.manual || slide.media?.audio?.compiled || "")
          : (slide.media?.audio?.compiled || slide.media?.audio?.manual || "")
      ),
      resolved_alignment_file: (
        (slide.timing_source || motionManifest.timing_source) === "manual"
          ? (slide.media?.alignment?.manual || slide.media?.alignment?.compiled || "")
          : (slide.media?.alignment?.compiled || slide.media?.alignment?.manual || "")
      ),
      motion_manifest_file: motionFile,
      topic_motion_manifest_file: motionArtifacts?.topic_manifest || "",
      entry_policy: slide.entry_policy || "",
      carry_pose_in: slide.carry_pose_in || null,
      output_file: relativeContractPath(outputWebmPath),
      secondary_output_files: [relativeContractPath(outputMp4Path)],
    };

    const job = {
      ...jobBase,
      contract_hash: contractHash(jobBase),
    };

    const jobPath = buildSlideVideoJobPath(descriptor, slide.slide_id);
    await writeFile(jobPath, `${JSON.stringify(job, null, 2)}\n`, "utf8");
    jobFiles.push(relativeContractPath(jobPath));
    jobs.push(job);

    const status = await buildJobStatus({
      descriptor,
      kind: "slide_video",
      jobBaseName: slide.slide_id,
      job,
      requiredOutputs: [outputWebmPath],
    });
    statusFiles.push(status.path);
    statuses.push(status.data);
  }

  return {
    dir: relativeContractPath(jobsDir),
    files: jobFiles,
    jobs,
    statuses,
    status_files: statusFiles,
    counts: summarizeStatuses(statuses),
  };
}
