import crypto from "node:crypto";
import path from "node:path";
import { getSlideTypeSet } from "../catalog.mjs";
import { projectRoot } from "../export_runtime.mjs";
import { relativeProjectPath } from "./utils.mjs";

export const AVATAR_PROFILE_SCHEMA_VERSION = "phase4_5-avatar-profile-v1";
export const REFERENCE_ASSETS_SCHEMA_VERSION = "phase4_5-reference-assets-v1";
export const LEGACY_LECTURE_PLAN_SCHEMA_VERSION = "phase4_5-lecture-plan-v1";
export const LECTURE_PLAN_SCHEMA_VERSION = "phase6-lecture-plan-v2";
export const SCRIPT_OVERRIDE_SCHEMA_VERSION = "phase5-script-override-v1";
export const SCRIPT_MANIFEST_SCHEMA_VERSION = "phase4_5-script-manifest-v1";
export const TIMELINE_SCHEMA_VERSION = "phase4_5-timeline-v1";
export const MOTION_MANIFEST_SCHEMA_VERSION = "phase7-motion-manifest-v1";
export const TTS_JOB_SCHEMA_VERSION = "phase4_5-tts-job-v1";
export const AVATAR_JOB_SCHEMA_VERSION = "phase4_5-avatar-job-v1";
export const SLIDE_VIDEO_JOB_SCHEMA_VERSION = "phase7-slide-video-job-v1";
export const JOB_STATUS_SCHEMA_VERSION = "phase4_5-job-status-v1";

export const JOB_STATES = ["pending", "running", "done", "error"];
export const MEDIA_SOURCE_MODES = ["compiled", "manual", "auto"];
export const AVATAR_BEHAVIORS = [
  "face_viewer",
  "idle_talk",
  "point_left_mid",
  "point_right_mid",
  "explain_open_hand",
  "emphasize",
  "enter_left",
  "enter_right",
  "clear_avatar",
];
export const AVATAR_ANCHORS = [
  "left_bottom",
  "right_bottom",
  "left_mid",
  "right_mid",
  "center_bottom",
];

const VALID_SLIDE_TYPES = getSlideTypeSet();
const LECTURE_PLAN_SCENE_POLICIES = new Set(["none", "minimal", "hybrid", "scene_allowed", "clean"]);
const LECTURE_PLAN_OBJECT_POLICIES = new Set(["none", "suggested", "preferred"]);
const LECTURE_PLAN_SLIDE_ROLES = new Set([
  "intro",
  "setup",
  "definition",
  "intuition",
  "comparison",
  "demo",
  "practice",
  "recap",
  "exit_check",
  "caution",
  "reference",
]);
const LECTURE_PLAN_IMPORTANCE = new Set(["high", "medium", "low"]);
const LECTURE_PLAN_TEACHER_STRATEGIES = new Set([
  "define_then_example",
  "compare_then_summarize",
  "intuitive_visual_explanation",
  "cautionary_explanation",
  "guided_practice",
  "recap_and_reinforce",
]);

function pushIssue(issues, severity, code, message, location = "", context = {}) {
  issues.push({
    severity,
    code,
    message,
    location,
    ...context,
  });
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNumber(value) {
  return Number.isFinite(Number(value));
}

function isString(value) {
  return typeof value === "string";
}

function isNonEmptyString(value) {
  return isString(value) && value.trim().length > 0;
}

function isStringArray(value) {
  return Array.isArray(value) && value.every(isNonEmptyString);
}

function isStringArrayLike(value) {
  return isNonEmptyString(value) || isStringArray(value);
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function isBox(value) {
  return Array.isArray(value) && value.length === 4 && value.every(isNumber);
}

function isPoint(value) {
  return Array.isArray(value) && value.length === 2 && value.every(isNumber);
}

function insideBox(anchor, bbox) {
  return (
    Array.isArray(anchor)
    && Array.isArray(bbox)
    && anchor[0] >= bbox[0]
    && anchor[0] <= bbox[2]
    && anchor[1] >= bbox[1]
    && anchor[1] <= bbox[3]
  );
}

function saneBox(value) {
  return isBox(value) && value[2] >= value[0] && value[3] >= value[1];
}

function validateEnumValue(issues, value, values, code, message, location, required = true) {
  if (value == null || value === "") {
    if (required) {
      pushIssue(issues, "error", code, message, location);
    }
    return;
  }

  if (!isNonEmptyString(value) || !values.has(String(value))) {
    pushIssue(issues, "error", code, message, location);
  }
}

function validateStringArrayLike(issues, value, code, message, location, required = false) {
  if (value == null || value === "") {
    if (required) {
      pushIssue(issues, "error", code, message, location);
    }
    return;
  }

  if (!isStringArrayLike(value)) {
    pushIssue(issues, "error", code, message, location);
  }
}

function validateTeachingArc(issues, teachingArc, location, required = false) {
  if (teachingArc == null) {
    if (required) {
      pushIssue(issues, "error", "lecture_plan.teaching_arc", "teaching_arc must be an object.", location);
    }
    return;
  }

  if (!isObject(teachingArc)) {
    pushIssue(issues, "error", "lecture_plan.teaching_arc", "teaching_arc must be an object.", location);
    return;
  }

  for (const key of ["entry_point", "progression", "destination", "tone"]) {
    if (!isNonEmptyString(teachingArc[key])) {
      pushIssue(issues, "error", `lecture_plan.teaching_arc.${key}`, `${key} must be a non-empty string.`, `${location}.${key}`);
    }
  }

  validateStringArrayLike(
    issues,
    teachingArc.methods,
    "lecture_plan.teaching_arc.methods",
    "methods must be a string or an array of non-empty strings.",
    `${location}.methods`,
    true,
  );
}

function validateSelector(selector, issues, location = "selector") {
  if (!isObject(selector)) {
    pushIssue(issues, "error", "selector.invalid", "Selector must be an object.", location);
    return;
  }

  for (const key of ["school", "course", "session", "topic"]) {
    if (!isNonEmptyString(selector[key])) {
      pushIssue(issues, "error", "selector.field", `Selector ${key} must be a non-empty string.`, `${location}.${key}`);
    }
  }
}

function validateVoiceObject(voice, issues, location) {
  if (!isObject(voice)) {
    pushIssue(issues, "error", "voice.invalid", "Voice settings must be an object.", location);
    return;
  }
  if (!isNonEmptyString(voice.tone)) {
    pushIssue(issues, "error", "voice.tone", "Voice tone must be a non-empty string.", `${location}.tone`);
  }
  if (!isNumber(voice.energy)) {
    pushIssue(issues, "error", "voice.energy", "Voice energy must be numeric.", `${location}.energy`);
  }
  if (!isNumber(voice.pace)) {
    pushIssue(issues, "error", "voice.pace", "Voice pace must be numeric.", `${location}.pace`);
  }
}

export function normalizeMediaSourceMode(value, fallback = "compiled") {
  const normalized = String(value || fallback).trim().toLowerCase();
  return MEDIA_SOURCE_MODES.includes(normalized) ? normalized : fallback;
}

export function contractHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);
}

function topicPath(baseDir, descriptor) {
  return path.join(
    baseDir,
    descriptor.school,
    descriptor.course,
    descriptor.session,
    descriptor.topic,
  );
}

export function buildCompiledLectureDir(descriptor, outputRoot = path.join(projectRoot, "generated", "lectures")) {
  return topicPath(outputRoot, descriptor);
}

export function buildCompiledRenderPath(descriptor, slideId, cueId) {
  return path.join(
    projectRoot,
    "generated",
    "renders",
    descriptor.school,
    descriptor.course,
    descriptor.session,
    descriptor.topic,
    `${slideId}__${cueId}.webm`,
  );
}

export function buildJobsDir(kind, descriptor) {
  return topicPath(path.join(projectRoot, "generated", "jobs", kind), descriptor);
}

export function buildTtsJobPath(descriptor, slideId) {
  return path.join(buildJobsDir("tts", descriptor), `${slideId}.json`);
}

export function buildAvatarJobPath(descriptor, slideId, cueId) {
  return path.join(buildJobsDir("avatar", descriptor), `${slideId}__${cueId}.json`);
}

export function buildSlideVideoJobPath(descriptor, slideId) {
  return path.join(buildJobsDir("slide_video", descriptor), `${slideId}.json`);
}

export function buildStatusDir(descriptor) {
  return topicPath(path.join(projectRoot, "generated", "status"), descriptor);
}

export function buildTopicStatusPath(descriptor) {
  return path.join(buildStatusDir(descriptor), "topic_status.json");
}

export function buildJobStatusPath(descriptor, kind, jobBaseName) {
  return path.join(buildStatusDir(descriptor), kind, `${jobBaseName}.job_status.json`);
}

export function buildCatalogSummaryPath() {
  return path.join(projectRoot, "generated", "status", "catalog_summary.json");
}

export function buildManualAudioPath(descriptor, slideId) {
  return path.join(
    projectRoot,
    "generated",
    "outputs",
    "audio",
    descriptor.school,
    descriptor.course,
    descriptor.session,
    descriptor.topic,
    `${slideId}.wav`,
  );
}

export function buildManualAlignmentPath(descriptor) {
  return path.join(
    projectRoot,
    "generated",
    "outputs",
    "alignment",
    descriptor.school,
    descriptor.course,
    descriptor.session,
    descriptor.topic,
    "tts_alignment.json",
  );
}

export function buildManualRenderPath(descriptor, slideId, cueId, ext = "webm") {
  return path.join(
    projectRoot,
    "generated",
    "outputs",
    "renders",
    descriptor.school,
    descriptor.course,
    descriptor.session,
    descriptor.topic,
    `${slideId}__${cueId}.${ext}`,
  );
}

export function buildManualSlideVideoPath(descriptor, slideId, ext = "webm") {
  return path.join(
    projectRoot,
    "generated",
    "outputs",
    "slide_video",
    descriptor.school,
    descriptor.course,
    descriptor.session,
    descriptor.topic,
    `${slideId}.${ext}`,
  );
}

export function buildManualOutputsDir(descriptor) {
  return {
    audio: path.dirname(buildManualAudioPath(descriptor, "placeholder")),
    alignment: path.dirname(buildManualAlignmentPath(descriptor)),
    renders: path.dirname(buildManualRenderPath(descriptor, "placeholder", "cue_00")),
    status: buildStatusDir(descriptor),
  };
}

export function relativeContractPath(filePath) {
  return relativeProjectPath(filePath);
}

export function issueCounts(issues) {
  return issues.reduce(
    (acc, issue) => {
      acc[issue.severity] = (acc[issue.severity] || 0) + 1;
      return acc;
    },
    { error: 0, warning: 0, info: 0 },
  );
}

export function issueStatus(issues) {
  const counts = issueCounts(issues);
  if (counts.error > 0) return "blocked";
  if (counts.warning > 0) return "warning";
  return "ready_for_generation";
}

export function validateAvatarProfile(profile) {
  const issues = [];
  if (!isObject(profile)) {
    pushIssue(issues, "error", "avatar_profile.invalid_root", "Avatar profile must be an object.", "avatar_profile");
    return issues;
  }

  if (!isNonEmptyString(profile.character_id)) {
    pushIssue(issues, "error", "avatar_profile.character_id", "character_id must be a non-empty string.", "avatar_profile.character_id");
  }
  if (!isNonEmptyString(profile.display_name)) {
    pushIssue(issues, "warning", "avatar_profile.display_name", "display_name should be a non-empty string.", "avatar_profile.display_name");
  }
  if (!isObject(profile.visual)) {
    pushIssue(issues, "error", "avatar_profile.visual", "visual must be an object.", "avatar_profile.visual");
  }
  if (!isObject(profile.voice)) {
    pushIssue(issues, "error", "avatar_profile.voice", "voice must be an object.", "avatar_profile.voice");
  } else {
    if (!isNonEmptyString(profile.voice.provider)) {
      pushIssue(issues, "error", "avatar_profile.voice.provider", "voice.provider must be a non-empty string.", "avatar_profile.voice.provider");
    }
    if (!isObject(profile.voice.defaults)) {
      pushIssue(issues, "warning", "avatar_profile.voice.defaults", "voice.defaults should be an object.", "avatar_profile.voice.defaults");
    }
  }

  const styles = profile.voice_styles;
  if (styles != null && !isObject(styles)) {
    pushIssue(issues, "error", "avatar_profile.voice_styles", "voice_styles must be an object when present.", "avatar_profile.voice_styles");
  }

  const anchors = profile.anchors?.allowed;
  if (anchors != null && (!Array.isArray(anchors) || anchors.some((item) => !AVATAR_ANCHORS.includes(item)))) {
    pushIssue(issues, "error", "avatar_profile.anchors.allowed", "anchors.allowed must contain only supported avatar anchors.", "avatar_profile.anchors.allowed");
  }

  return issues;
}

export function validateReferenceAssets(referenceAssets) {
  const issues = [];
  if (!isObject(referenceAssets)) {
    pushIssue(issues, "error", "reference_assets.invalid_root", "Reference assets must be an object.", "reference_assets");
    return issues;
  }

  if (!isNonEmptyString(referenceAssets.character_id)) {
    pushIssue(issues, "error", "reference_assets.character_id", "character_id must be a non-empty string.", "reference_assets.character_id");
  }

  for (const key of ["voice_references", "image_references"]) {
    if (!Array.isArray(referenceAssets[key])) {
      pushIssue(issues, "error", `reference_assets.${key}`, `${key} must be an array.`, `reference_assets.${key}`);
      continue;
    }
    referenceAssets[key].forEach((entry, index) => {
      if (!isObject(entry)) {
        pushIssue(issues, "error", "reference_assets.entry", "Reference asset entries must be objects.", `reference_assets.${key}[${index}]`);
        return;
      }
      if (!isNonEmptyString(entry.id)) {
        pushIssue(issues, "error", "reference_assets.entry.id", "Reference asset entries must have a non-empty id.", `reference_assets.${key}[${index}].id`);
      }
      if (!isNonEmptyString(entry.file)) {
        pushIssue(issues, "error", "reference_assets.entry.file", "Reference asset entries must have a file path.", `reference_assets.${key}[${index}].file`);
      }
    });
  }

  return issues;
}

export function validateLecturePlan(plan) {
  const issues = [];
  if (!isObject(plan)) {
    pushIssue(issues, "error", "lecture_plan.invalid_root", "Lecture plan must be an object.", "lecture_plan");
    return issues;
  }
  const schemaVersion = String(plan.schema_version || LEGACY_LECTURE_PLAN_SCHEMA_VERSION);
  const isV2 = schemaVersion === LECTURE_PLAN_SCHEMA_VERSION;

  if (!isNonEmptyString(plan.topic_id)) {
    pushIssue(issues, "error", "lecture_plan.topic_id", "topic_id must be a non-empty string.", "lecture_plan.topic_id");
  }
  if (!isObject(plan.topic_defaults)) {
    pushIssue(issues, "error", "lecture_plan.topic_defaults", "topic_defaults must be an object.", "lecture_plan.topic_defaults");
  }
  validateTeachingArc(issues, plan.teaching_arc, "lecture_plan.teaching_arc", isV2);
  if (isV2) {
    if (!isNonEmptyString(plan.audience_level)) {
      pushIssue(issues, "error", "lecture_plan.audience_level", "audience_level must be a non-empty string.", "lecture_plan.audience_level");
    }
    if (!isNonEmptyString(plan.topic_goal)) {
      pushIssue(issues, "error", "lecture_plan.topic_goal", "topic_goal must be a non-empty string.", "lecture_plan.topic_goal");
    }
    validateStringArrayLike(
      issues,
      plan.topic_takeaways,
      "lecture_plan.topic_takeaways",
      "topic_takeaways must be a string or an array of non-empty strings.",
      "lecture_plan.topic_takeaways",
      true,
    );
    validateStringArrayLike(
      issues,
      plan.style_notes,
      "lecture_plan.style_notes",
      "style_notes must be a string or an array of non-empty strings.",
      "lecture_plan.style_notes",
      true,
    );
    if (!isNonEmptyString(plan.transition_style)) {
      pushIssue(issues, "error", "lecture_plan.transition_style", "transition_style must be a non-empty string.", "lecture_plan.transition_style");
    }
    validateEnumValue(
      issues,
      plan.scene_policy_default,
      LECTURE_PLAN_SCENE_POLICIES,
      "lecture_plan.scene_policy_default",
      "scene_policy_default must be a supported scene policy.",
      "lecture_plan.scene_policy_default",
      true,
    );
    validateEnumValue(
      issues,
      plan.object_policy_default,
      LECTURE_PLAN_OBJECT_POLICIES,
      "lecture_plan.object_policy_default",
      "object_policy_default must be a supported object policy.",
      "lecture_plan.object_policy_default",
      true,
    );
  } else {
    if (plan.audience_level != null && !isNonEmptyString(plan.audience_level)) {
      pushIssue(issues, "error", "lecture_plan.audience_level", "audience_level must be a non-empty string when present.", "lecture_plan.audience_level");
    }
    if (plan.topic_goal != null && !isNonEmptyString(plan.topic_goal)) {
      pushIssue(issues, "error", "lecture_plan.topic_goal", "topic_goal must be a non-empty string when present.", "lecture_plan.topic_goal");
    }
    validateStringArrayLike(
      issues,
      plan.topic_takeaways,
      "lecture_plan.topic_takeaways",
      "topic_takeaways must be a string or an array of non-empty strings when present.",
      "lecture_plan.topic_takeaways",
      false,
    );
    validateStringArrayLike(
      issues,
      plan.style_notes,
      "lecture_plan.style_notes",
      "style_notes must be a string or an array of non-empty strings when present.",
      "lecture_plan.style_notes",
      false,
    );
  }
  if (!Array.isArray(plan.slides)) {
    pushIssue(issues, "error", "lecture_plan.slides", "slides must be an array.", "lecture_plan.slides");
    return issues;
  }

  plan.slides.forEach((slide, index) => {
    const location = `lecture_plan.slides[${index}]`;
    if (!isObject(slide)) {
      pushIssue(issues, "error", "lecture_plan.slide", "Slide plan entries must be objects.", location);
      return;
    }
    if (!isObject(slide.slide_ref)) {
      pushIssue(issues, "error", "lecture_plan.slide_ref", "slide_ref must be an object.", `${location}.slide_ref`);
    }
    if (!isNonEmptyString(slide.narration_seed)) {
      pushIssue(issues, "error", "lecture_plan.narration_seed", "narration_seed must be a non-empty string.", `${location}.narration_seed`);
    }
    if (!isNonEmptyString(slide.voice_style)) {
      pushIssue(issues, "error", "lecture_plan.voice_style", "voice_style must be a non-empty string.", `${location}.voice_style`);
    }
    if (!isNonEmptyString(slide.tone)) {
      pushIssue(issues, "error", "lecture_plan.tone", "tone must be a non-empty string.", `${location}.tone`);
    }
    if (!isNumber(slide.energy)) {
      pushIssue(issues, "error", "lecture_plan.energy", "energy must be numeric.", `${location}.energy`);
    }
    if (!isNumber(slide.pace)) {
      pushIssue(issues, "error", "lecture_plan.pace", "pace must be numeric.", `${location}.pace`);
    }
    if (!isNonEmptyString(slide.attention_mode)) {
      pushIssue(issues, "error", "lecture_plan.attention_mode", "attention_mode must be a non-empty string.", `${location}.attention_mode`);
    }
    validateEnumValue(
      issues,
      slide.scene_policy,
      LECTURE_PLAN_SCENE_POLICIES,
      "lecture_plan.scene_policy",
      "scene_policy must be a supported scene policy.",
      `${location}.scene_policy`,
      true,
    );
    if (slide.object_policy != null || isV2) {
      validateEnumValue(
        issues,
        slide.object_policy,
        LECTURE_PLAN_OBJECT_POLICIES,
        "lecture_plan.object_policy",
        "object_policy must be a supported object policy.",
        `${location}.object_policy`,
        isV2,
      );
    }
    if (slide.avatar_hint != null && !isObject(slide.avatar_hint)) {
      pushIssue(issues, "error", "lecture_plan.avatar_hint", "avatar_hint must be an object when present.", `${location}.avatar_hint`);
    }
    if (isV2) {
      validateEnumValue(
        issues,
        slide.slide_role,
        LECTURE_PLAN_SLIDE_ROLES,
        "lecture_plan.slide_role",
        "slide_role must be a supported value.",
        `${location}.slide_role`,
        true,
      );
      validateEnumValue(
        issues,
        slide.importance,
        LECTURE_PLAN_IMPORTANCE,
        "lecture_plan.importance",
        "importance must be one of high, medium, or low.",
        `${location}.importance`,
        true,
      );
      validateEnumValue(
        issues,
        slide.teacher_strategy,
        LECTURE_PLAN_TEACHER_STRATEGIES,
        "lecture_plan.teacher_strategy",
        "teacher_strategy must be a supported value.",
        `${location}.teacher_strategy`,
        true,
      );
      for (const key of ["transition_from_previous", "transition_to_next", "explanation_style", "delivery_goal"]) {
        if (!isNonEmptyString(slide[key])) {
          pushIssue(issues, "error", `lecture_plan.${key}`, `${key} must be a non-empty string.`, `${location}.${key}`);
        }
      }
      if (slide.scene_hint != null && !isNonEmptyString(slide.scene_hint)) {
        pushIssue(issues, "error", "lecture_plan.scene_hint", "scene_hint must be a non-empty string when present.", `${location}.scene_hint`);
      }
      if (slide.story_hint != null && !isNonEmptyString(slide.story_hint)) {
        pushIssue(issues, "error", "lecture_plan.story_hint", "story_hint must be a non-empty string when present.", `${location}.story_hint`);
      }
      validateStringArrayLike(
        issues,
        slide.must_cover,
        "lecture_plan.must_cover",
        "must_cover must be a string or an array of non-empty strings.",
        `${location}.must_cover`,
        false,
      );
      validateStringArrayLike(
        issues,
        slide.must_say,
        "lecture_plan.must_say",
        "must_say must be a string or an array of non-empty strings.",
        `${location}.must_say`,
        false,
      );
      validateStringArrayLike(
        issues,
        slide.emphasis_words,
        "lecture_plan.emphasis_words",
        "emphasis_words must be a string or an array of non-empty strings.",
        `${location}.emphasis_words`,
        false,
      );
      validateStringArrayLike(
        issues,
        slide.prop_suggestions,
        "lecture_plan.prop_suggestions",
        "prop_suggestions must be a string or an array of non-empty strings when present.",
        `${location}.prop_suggestions`,
        false,
      );
      validateStringArrayLike(
        issues,
        slide.likely_student_confusion,
        "lecture_plan.likely_student_confusion",
        "likely_student_confusion must be a string or an array of non-empty strings.",
        `${location}.likely_student_confusion`,
        false,
      );
    } else {
      if (slide.slide_role != null) {
        validateEnumValue(
          issues,
          slide.slide_role,
          LECTURE_PLAN_SLIDE_ROLES,
          "lecture_plan.slide_role",
          "slide_role must be a supported value when present.",
          `${location}.slide_role`,
          false,
        );
      }
      if (slide.importance != null) {
        validateEnumValue(
          issues,
          slide.importance,
          LECTURE_PLAN_IMPORTANCE,
          "lecture_plan.importance",
          "importance must be one of high, medium, or low when present.",
          `${location}.importance`,
          false,
        );
      }
      if (slide.teacher_strategy != null) {
        validateEnumValue(
          issues,
          slide.teacher_strategy,
          LECTURE_PLAN_TEACHER_STRATEGIES,
          "lecture_plan.teacher_strategy",
          "teacher_strategy must be a supported value when present.",
          `${location}.teacher_strategy`,
          false,
        );
      }
    }
  });

  return issues;
}

export function validateScriptOverride(overrideFile) {
  const issues = [];
  if (!isObject(overrideFile)) {
    pushIssue(issues, "error", "script_override.invalid_root", "Script override must be an object.", "script_override");
    return issues;
  }

  if (!isNonEmptyString(overrideFile.topic_id)) {
    pushIssue(issues, "error", "script_override.topic_id", "topic_id must be a non-empty string.", "script_override.topic_id");
  }
  if (!Array.isArray(overrideFile.slides)) {
    pushIssue(issues, "error", "script_override.slides", "slides must be an array.", "script_override.slides");
    return issues;
  }

  overrideFile.slides.forEach((slide, index) => {
    const location = `script_override.slides[${index}]`;
    if (!isObject(slide)) {
      pushIssue(issues, "error", "script_override.slide", "Slide override entries must be objects.", location);
      return;
    }
    if (!isObject(slide.slide_ref)) {
      pushIssue(issues, "error", "script_override.slide_ref", "slide_ref must be an object.", `${location}.slide_ref`);
    }
    if (slide.voice_style != null && !isNonEmptyString(slide.voice_style)) {
      pushIssue(issues, "error", "script_override.voice_style", "voice_style must be a non-empty string when present.", `${location}.voice_style`);
    }
    if (slide.text != null && !isNonEmptyString(slide.text)) {
      pushIssue(issues, "error", "script_override.text", "text must be a non-empty string when present.", `${location}.text`);
    }
    if (slide.segments != null && !Array.isArray(slide.segments)) {
      pushIssue(issues, "error", "script_override.segments", "segments must be an array when present.", `${location}.segments`);
    }
    if (!isNonEmptyString(slide.text) && !Array.isArray(slide.segments)) {
      pushIssue(issues, "error", "script_override.content", "Each override slide must provide text or segments.", location);
    }
    if (Array.isArray(slide.segments)) {
      slide.segments.forEach((segment, segmentIndex) => {
        const segmentLocation = `${location}.segments[${segmentIndex}]`;
        if (!isObject(segment)) {
          pushIssue(issues, "error", "script_override.segment", "Override segments must be objects.", segmentLocation);
          return;
        }
        if (!isNonEmptyString(segment.text)) {
          pushIssue(issues, "error", "script_override.segment_text", "Override segment text must be a non-empty string.", `${segmentLocation}.text`);
        }
        if (segment.target_element != null && !isNonEmptyString(segment.target_element)) {
          pushIssue(issues, "error", "script_override.target_element", "target_element must be a non-empty string when present.", `${segmentLocation}.target_element`);
        }
      });
    }
  });

  return issues;
}

export function validateScriptManifest(manifest) {
  const issues = [];
  if (!isObject(manifest)) {
    pushIssue(issues, "error", "script_manifest.invalid_root", "Script manifest must be an object.", "script_manifest");
    return issues;
  }

  if (!isNonEmptyString(manifest.topic_id)) {
    pushIssue(issues, "error", "script_manifest.topic_id", "topic_id must be a non-empty string.", "script_manifest.topic_id");
  }
  validateSelector(manifest.selector, issues, "script_manifest.selector");
  if (!isObject(manifest.style)) {
    pushIssue(issues, "error", "script_manifest.style", "style must be an object.", "script_manifest.style");
  }
  if (!isObject(manifest.authoring)) {
    pushIssue(issues, "error", "script_manifest.authoring", "authoring must be an object.", "script_manifest.authoring");
  }
  if (!Array.isArray(manifest.slides)) {
    pushIssue(issues, "error", "script_manifest.slides", "slides must be an array.", "script_manifest.slides");
    return issues;
  }

  const seenSlideIds = new Set();
  manifest.slides.forEach((slide, slideIndex) => {
    const location = `script_manifest.slides[${slideIndex}]`;
    if (!isObject(slide)) {
      pushIssue(issues, "error", "script_manifest.slide", "Slide entries must be objects.", location);
      return;
    }
    if (!isNonEmptyString(slide.slide_id)) {
      pushIssue(issues, "error", "script_manifest.slide_id", "slide_id must be a non-empty string.", `${location}.slide_id`);
    } else if (seenSlideIds.has(slide.slide_id)) {
      pushIssue(issues, "error", "script_manifest.duplicate_slide_id", `Duplicate slide_id "${slide.slide_id}".`, `${location}.slide_id`);
    } else {
      seenSlideIds.add(slide.slide_id);
    }
    if (!isNonEmptyString(slide.slide_type) || !VALID_SLIDE_TYPES.has(slide.slide_type)) {
      pushIssue(issues, "error", "script_manifest.slide_type", "slide_type must be a supported slide type.", `${location}.slide_type`);
    }
    if (!isNonEmptyString(slide.script_source)) {
      pushIssue(issues, "error", "script_manifest.script_source", "script_source must be a non-empty string.", `${location}.script_source`);
    }
    if (slide.provider_used != null && !isNonEmptyString(slide.provider_used)) {
      pushIssue(issues, "error", "script_manifest.provider_used", "provider_used must be a non-empty string when present.", `${location}.provider_used`);
    }
    if (slide.model_used != null && !isNonEmptyString(slide.model_used)) {
      pushIssue(issues, "error", "script_manifest.model_used", "model_used must be a non-empty string when present.", `${location}.model_used`);
    }
    if (slide.prompt_version != null && !isNonEmptyString(slide.prompt_version)) {
      pushIssue(issues, "error", "script_manifest.prompt_version", "prompt_version must be a non-empty string when present.", `${location}.prompt_version`);
    }
    if (slide.fallback_reason != null && !isNonEmptyString(slide.fallback_reason)) {
      pushIssue(issues, "error", "script_manifest.fallback_reason", "fallback_reason must be a non-empty string when present.", `${location}.fallback_reason`);
    }
    if (slide.generation_warnings != null && !Array.isArray(slide.generation_warnings)) {
      pushIssue(issues, "error", "script_manifest.generation_warnings", "generation_warnings must be an array when present.", `${location}.generation_warnings`);
    }
    if (slide.cache_used != null && !isBoolean(slide.cache_used)) {
      pushIssue(issues, "error", "script_manifest.cache_used", "cache_used must be a boolean when present.", `${location}.cache_used`);
    }
    if (!Array.isArray(slide.segments) || !slide.segments.length) {
      pushIssue(issues, "error", "script_manifest.segments", "slides must contain at least one segment.", `${location}.segments`);
      return;
    }

    const seenSegmentIds = new Set();
    slide.segments.forEach((segment, segmentIndex) => {
      const segmentLocation = `${location}.segments[${segmentIndex}]`;
      if (!isObject(segment)) {
        pushIssue(issues, "error", "script_manifest.segment", "Segments must be objects.", segmentLocation);
        return;
      }
      if (!isNonEmptyString(segment.segment_id)) {
        pushIssue(issues, "error", "script_manifest.segment_id", "segment_id must be a non-empty string.", `${segmentLocation}.segment_id`);
      } else if (seenSegmentIds.has(segment.segment_id)) {
        pushIssue(issues, "error", "script_manifest.duplicate_segment_id", `Duplicate segment_id "${segment.segment_id}" within slide.`, `${segmentLocation}.segment_id`);
      } else {
        seenSegmentIds.add(segment.segment_id);
      }
      if (!isNonEmptyString(segment.text)) {
        pushIssue(issues, "error", "script_manifest.segment_text", "Segment text must be a non-empty string.", `${segmentLocation}.text`);
      }
      if (!isNonEmptyString(segment.target_element)) {
        pushIssue(issues, "error", "script_manifest.target_element", "target_element must be a non-empty string.", `${segmentLocation}.target_element`);
      }
      if (!isNonEmptyString(segment.attention_mode)) {
        pushIssue(issues, "error", "script_manifest.attention_mode", "attention_mode must be a non-empty string.", `${segmentLocation}.attention_mode`);
      }
      if (segment.avatar_behavior_hint != null && !isNonEmptyString(segment.avatar_behavior_hint)) {
        pushIssue(issues, "error", "script_manifest.avatar_behavior_hint", "avatar_behavior_hint must be a non-empty string when present.", `${segmentLocation}.avatar_behavior_hint`);
      }
      if (segment.delivery_kind != null && !isNonEmptyString(segment.delivery_kind)) {
        pushIssue(issues, "error", "script_manifest.delivery_kind", "delivery_kind must be a non-empty string when present.", `${segmentLocation}.delivery_kind`);
      }
      validateVoiceObject(segment.voice, issues, `${segmentLocation}.voice`);
    });
  });

  return issues;
}

export function validateTimelineManifest(manifest) {
  const issues = [];
  if (!isObject(manifest)) {
    pushIssue(issues, "error", "timeline.invalid_root", "Timeline manifest must be an object.", "timeline");
    return issues;
  }

  if (!isNonEmptyString(manifest.topic_id)) {
    pushIssue(issues, "error", "timeline.topic_id", "topic_id must be a non-empty string.", "timeline.topic_id");
  }
  validateSelector(manifest.selector, issues, "timeline.selector");
  if (!Array.isArray(manifest.slides)) {
    pushIssue(issues, "error", "timeline.slides", "slides must be an array.", "timeline.slides");
    return issues;
  }

  manifest.slides.forEach((slide, slideIndex) => {
    const location = `timeline.slides[${slideIndex}]`;
    if (!isObject(slide)) {
      pushIssue(issues, "error", "timeline.slide", "Timeline slides must be objects.", location);
      return;
    }
    if (!isNonEmptyString(slide.slide_id)) {
      pushIssue(issues, "error", "timeline.slide_id", "slide_id must be a non-empty string.", `${location}.slide_id`);
    }
    if (!isNonEmptyString(slide.slide_type) || !VALID_SLIDE_TYPES.has(slide.slide_type)) {
      pushIssue(issues, "error", "timeline.slide_type", "slide_type must be a supported slide type.", `${location}.slide_type`);
    }
    if (!isNumber(slide.duration) || Number(slide.duration) < 0) {
      pushIssue(issues, "error", "timeline.duration", "duration must be a non-negative number.", `${location}.duration`);
    }
    if (!isObject(slide.media)) {
      pushIssue(issues, "error", "timeline.media", "slide media must be an object.", `${location}.media`);
    } else {
      for (const mediaKey of ["audio", "alignment"]) {
        if (!isObject(slide.media[mediaKey])) {
          pushIssue(issues, "error", "timeline.media_entry", `${mediaKey} media entry must be an object.`, `${location}.media.${mediaKey}`);
          continue;
        }
        for (const sourceMode of ["compiled", "manual"]) {
          if (!isNonEmptyString(slide.media[mediaKey][sourceMode])) {
            pushIssue(issues, "error", "timeline.media_path", `${mediaKey}.${sourceMode} must be a non-empty path.`, `${location}.media.${mediaKey}.${sourceMode}`);
          }
        }
      }
    }
    if (!Array.isArray(slide.timeline)) {
      pushIssue(issues, "error", "timeline.cues", "timeline must be an array.", `${location}.timeline`);
      return;
    }
    slide.timeline.forEach((cue, cueIndex) => {
      const cueLocation = `${location}.timeline[${cueIndex}]`;
      if (!isObject(cue)) {
        pushIssue(issues, "error", "timeline.cue", "Cue entries must be objects.", cueLocation);
        return;
      }
      for (const key of ["cue_id", "segment_id", "speech", "attention_mode", "target_element", "target_type"]) {
        if (!isNonEmptyString(cue[key])) {
          pushIssue(issues, "error", `timeline.${key}`, `${key} must be a non-empty string.`, `${cueLocation}.${key}`);
        }
      }
      if (!isNumber(cue.t0) || !isNumber(cue.t1) || Number(cue.t1) < Number(cue.t0)) {
        pushIssue(issues, "error", "timeline.time_range", "Cue t0/t1 must be numeric and ordered.", cueLocation);
      }
      if (!isPoint(cue.attention_xy)) {
        pushIssue(issues, "error", "timeline.attention_xy", "attention_xy must be a [x, y] pair.", `${cueLocation}.attention_xy`);
      }
      if (!saneBox(cue.target_bbox)) {
        pushIssue(issues, "error", "timeline.target_bbox", "target_bbox must be a sane bbox.", `${cueLocation}.target_bbox`);
      } else if (isPoint(cue.attention_xy) && !insideBox(cue.attention_xy, cue.target_bbox)) {
        pushIssue(issues, "warning", "timeline.attention_outside_target", "attention_xy should stay inside target_bbox.", `${cueLocation}.attention_xy`);
      }
      if (!Array.isArray(cue.actions)) {
        pushIssue(issues, "error", "timeline.actions", "actions must be an array.", `${cueLocation}.actions`);
        return;
      }
      cue.actions.forEach((action, actionIndex) => {
        const actionLocation = `${cueLocation}.actions[${actionIndex}]`;
        if (!isObject(action) || !isNonEmptyString(action.type)) {
          pushIssue(issues, "error", "timeline.action", "Each action must be an object with a type.", actionLocation);
          return;
        }
        if (action.type === "avatar") {
          if (!AVATAR_BEHAVIORS.includes(action.behavior)) {
            pushIssue(issues, "error", "timeline.avatar.behavior", "Avatar behavior must be a supported value.", `${actionLocation}.behavior`);
          }
          if (!AVATAR_ANCHORS.includes(action.screen_anchor)) {
            pushIssue(issues, "error", "timeline.avatar.anchor", "Avatar screen_anchor must be supported.", `${actionLocation}.screen_anchor`);
          }
          if (!saneBox(action.placement_bbox)) {
            pushIssue(issues, "error", "timeline.avatar.placement_bbox", "Avatar placement_bbox must be a sane bbox.", `${actionLocation}.placement_bbox`);
          }
          if (!isObject(action.media)) {
            pushIssue(issues, "error", "timeline.avatar.media", "Avatar action media must be an object.", `${actionLocation}.media`);
          }
        }
      });
    });
  });

  return issues;
}

export function validateTtsJob(job) {
  const issues = [];
  if (!isObject(job)) {
    pushIssue(issues, "error", "tts_job.invalid_root", "TTS job must be an object.", "tts_job");
    return issues;
  }
  if (job.kind !== "tts") {
    pushIssue(issues, "error", "tts_job.kind", "TTS job kind must be \"tts\".", "tts_job.kind");
  }
  for (const key of ["job_id", "topic_id", "slide_id", "contract_hash", "audio_output_file", "alignment_output_file"]) {
    if (!isNonEmptyString(job[key])) {
      pushIssue(issues, "error", `tts_job.${key}`, `${key} must be a non-empty string.`, `tts_job.${key}`);
    }
  }
  if (!Array.isArray(job.segments) || !job.segments.length) {
    pushIssue(issues, "error", "tts_job.segments", "TTS jobs must contain segments.", "tts_job.segments");
    return issues;
  }
  job.segments.forEach((segment, index) => {
    const location = `tts_job.segments[${index}]`;
    if (!isObject(segment)) {
      pushIssue(issues, "error", "tts_job.segment", "TTS job segments must be objects.", location);
      return;
    }
    for (const key of ["segment_id", "text", "tone", "target_element", "attention_mode"]) {
      if (!isNonEmptyString(segment[key])) {
        pushIssue(issues, "error", `tts_job.segment.${key}`, `${key} must be a non-empty string.`, `${location}.${key}`);
      }
    }
    for (const key of ["energy", "pace"]) {
      if (!isNumber(segment[key])) {
        pushIssue(issues, "error", `tts_job.segment.${key}`, `${key} must be numeric.`, `${location}.${key}`);
      }
    }
    if (!Array.isArray(segment.emphasis_words)) {
      pushIssue(issues, "error", "tts_job.segment.emphasis_words", "emphasis_words must be an array.", `${location}.emphasis_words`);
    }
  });
  return issues;
}

export function validateAvatarJob(job) {
  const issues = [];
  if (!isObject(job)) {
    pushIssue(issues, "error", "avatar_job.invalid_root", "Avatar job must be an object.", "avatar_job");
    return issues;
  }
  if (job.kind !== "avatar") {
    pushIssue(issues, "error", "avatar_job.kind", "Avatar job kind must be \"avatar\".", "avatar_job.kind");
  }
  if (!isNonEmptyString(job.job_id)) {
    pushIssue(issues, "error", "avatar_job.job_id", "job_id must be a non-empty string.", "avatar_job.job_id");
  }
  if (!isNonEmptyString(job.contract_hash)) {
    pushIssue(issues, "error", "avatar_job.contract_hash", "contract_hash must be a non-empty string.", "avatar_job.contract_hash");
  }
  if (!AVATAR_BEHAVIORS.includes(job.behavior)) {
    pushIssue(issues, "error", "avatar_job.behavior", "behavior must be a supported avatar behavior.", "avatar_job.behavior");
  }
  if (!isNonEmptyString(job.output_file)) {
    pushIssue(issues, "error", "avatar_job.output_file", "output_file must be a non-empty string.", "avatar_job.output_file");
  }
  if (!isBoolean(job.contains_audio) || job.contains_audio !== false) {
    pushIssue(issues, "error", "avatar_job.contains_audio", "Avatar jobs must explicitly set contains_audio to false.", "avatar_job.contains_audio");
  }
  if (!isNumber(job.duration_sec) || Number(job.duration_sec) < 0) {
    pushIssue(issues, "error", "avatar_job.duration_sec", "duration_sec must be a non-negative number.", "avatar_job.duration_sec");
  }
  return issues;
}

export function validateJobStatus(status) {
  const issues = [];
  if (!isObject(status)) {
    pushIssue(issues, "error", "job_status.invalid_root", "Job status must be an object.", "job_status");
    return issues;
  }
  for (const key of ["job_id", "kind", "state", "contract_hash", "output_file", "updated_at"]) {
    if (!isNonEmptyString(status[key])) {
      pushIssue(issues, "error", `job_status.${key}`, `${key} must be a non-empty string.`, `job_status.${key}`);
    }
  }
  if (!JOB_STATES.includes(status.state)) {
    pushIssue(issues, "error", "job_status.state_value", `state must be one of: ${JOB_STATES.join(", ")}.`, "job_status.state");
  }
  if (!isBoolean(status.reused)) {
    pushIssue(issues, "error", "job_status.reused", "reused must be a boolean.", "job_status.reused");
  }
  return issues;
}
