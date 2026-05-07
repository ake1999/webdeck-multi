import { readFile } from "node:fs/promises";
import path from "node:path";
import { localFileExists } from "../catalog.mjs";
import { projectRoot } from "../export_runtime.mjs";
import { relativeProjectPath } from "./utils.mjs";
import { stripRichText } from "../../../shared/deck_model.js";

function normalizeTextKey(value) {
  return stripRichText(String(value || "")).replace(/\s+/g, " ").trim().toLowerCase();
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function firstExistingPath(candidates) {
  for (const candidate of candidates) {
    if (!candidate) continue;
    if (await localFileExists(candidate)) {
      return candidate;
    }
  }
  return candidates.find(Boolean) || null;
}

async function resolveInputPath(ref, baseDir) {
  if (!ref) return null;
  const value = String(ref).trim();
  if (!value) return null;
  if (path.isAbsolute(value)) return value;

  const projectCandidate = path.resolve(projectRoot, value);
  const baseCandidate = path.resolve(baseDir || projectRoot, value);

  if (value.startsWith("./") || value.startsWith("../")) {
    return await firstExistingPath([baseCandidate, projectCandidate]);
  }

  return await firstExistingPath([projectCandidate, baseCandidate]);
}

function resolveSlidePlanRef({ runtime, slidesData, slideRef = {} }) {
  if (!slideRef || typeof slideRef !== "object") return null;
  const byTitle = (() => {
    if (!slideRef.source_title) return null;
    const targetKey = normalizeTextKey(slideRef.source_title);
    const hit = runtime.slides.find((slide, index) => {
      const raw = slidesData[index] || {};
      return normalizeTextKey(raw.title || slide.title || slide.slideId) === targetKey;
    });
    return hit?.slideId || null;
  })();

  if (slideRef.slide_id) {
    const hit = runtime.slides.find((slide) => slide.slideId === slideRef.slide_id);
    if (hit) return hit.slideId;
  }

  if (Number.isInteger(slideRef.index) && slideRef.index >= 0 && slideRef.index < runtime.slides.length) {
    const byIndex = runtime.slides[slideRef.index].slideId;
    return byTitle && byTitle !== byIndex ? byTitle : byIndex;
  }

  return byTitle;
}

function normalizeReferenceEntries(items, filePath) {
  return (Array.isArray(items) ? items : []).map((item) => ({
    ...item,
    __source_file: filePath,
  }));
}

async function resolveReferencedAssets(entries, filePath) {
  const baseDir = path.dirname(filePath);
  const resolved = [];

  for (const entry of entries) {
    const absolutePath = await resolveInputPath(entry.file, baseDir);
    const exists = absolutePath ? await localFileExists(absolutePath) : false;
    resolved.push({
      ...entry,
      absolute_path: absolutePath,
      relative_path: absolutePath ? relativeProjectPath(absolutePath) : String(entry.file || ""),
      exists,
    });
  }

  return resolved;
}

function buildVoiceStyleMap(avatarProfile) {
  return avatarProfile?.voice_styles && typeof avatarProfile.voice_styles === "object"
    ? avatarProfile.voice_styles
    : {};
}

function splitListLike(value) {
  return String(value || "")
    .split(/\r?\n|•|;\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeStringArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    const parts = splitListLike(value);
    return parts.length ? parts : [value.trim()].filter(Boolean);
  }
  return [];
}

function normalizeTeachingArc(teachingArc = {}) {
  if (!teachingArc || typeof teachingArc !== "object" || Array.isArray(teachingArc)) {
    return {
      entry_point: "",
      progression: "",
      destination: "",
      tone: "",
      methods: [],
    };
  }
  return {
    entry_point: String(teachingArc.entry_point || "").trim(),
    progression: String(teachingArc.progression || "").trim(),
    destination: String(teachingArc.destination || "").trim(),
    tone: String(teachingArc.tone || "").trim(),
    methods: normalizeStringArray(teachingArc.methods),
  };
}

function normalizeAvatarHint(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}

function normalizeLecturePlan(plan) {
  if (!plan || typeof plan !== "object" || Array.isArray(plan)) return null;
  const topicDefaults = plan.topic_defaults && typeof plan.topic_defaults === "object" && !Array.isArray(plan.topic_defaults)
    ? plan.topic_defaults
    : {};
  const scenePolicyDefault = String(plan.scene_policy_default || topicDefaults.scene_policy || "minimal").trim() || "minimal";
  const objectPolicyDefault = String(plan.object_policy_default || "none").trim() || "none";

  return {
    ...plan,
    teaching_arc: normalizeTeachingArc(plan.teaching_arc),
    audience_level: String(plan.audience_level || "").trim(),
    topic_goal: String(plan.topic_goal || "").trim(),
    topic_takeaways: normalizeStringArray(plan.topic_takeaways),
    style_notes: normalizeStringArray(plan.style_notes),
    transition_style: String(plan.transition_style || "").trim(),
    scene_policy_default: scenePolicyDefault,
    object_policy_default: objectPolicyDefault,
    topic_defaults: {
      ...topicDefaults,
      scene_policy: String(topicDefaults.scene_policy || scenePolicyDefault || "minimal").trim() || "minimal",
    },
    slides: (Array.isArray(plan.slides) ? plan.slides : []).map((slidePlan) => ({
      ...slidePlan,
      slide_role: String(slidePlan.slide_role || "").trim(),
      importance: String(slidePlan.importance || "").trim(),
      object_policy: String(slidePlan.object_policy || objectPolicyDefault || "none").trim() || "none",
      transition_from_previous: String(slidePlan.transition_from_previous || "").trim(),
      transition_to_next: String(slidePlan.transition_to_next || "").trim(),
      likely_student_confusion: normalizeStringArray(slidePlan.likely_student_confusion),
      teacher_strategy: String(slidePlan.teacher_strategy || "").trim(),
      scene_hint: String(slidePlan.scene_hint || "").trim(),
      prop_suggestions: normalizeStringArray(slidePlan.prop_suggestions),
      explanation_style: String(slidePlan.explanation_style || "").trim(),
      story_hint: String(slidePlan.story_hint || "").trim(),
      delivery_goal: String(slidePlan.delivery_goal || "").trim(),
      must_cover: normalizeStringArray(slidePlan.must_cover),
      must_say: normalizeStringArray(slidePlan.must_say),
      emphasis_words: normalizeStringArray(slidePlan.emphasis_words),
      avatar_hint: normalizeAvatarHint(slidePlan.avatar_hint),
    })),
  };
}

export async function loadLectureAuthoring({
  descriptor,
  runtime,
  slidesData,
  options = {},
}) {
  const warnings = [];
  const topicDir = descriptor.sessionDir || path.dirname(descriptor.filePath || "");
  const defaultPlanPath = descriptor.filePath
    ? descriptor.filePath.replace(/\.slides\.js$/, ".lecture.plan.json")
    : null;
  const defaultScriptOverridePath = descriptor.filePath
    ? descriptor.filePath.replace(/\.slides\.js$/, ".script.override.json")
    : null;
  const lecturePlanPath = await resolveInputPath(options.lecturePlan, topicDir)
    || (defaultPlanPath && await localFileExists(defaultPlanPath) ? defaultPlanPath : null);
  const scriptOverridePath = await resolveInputPath(options.scriptOverride, topicDir)
    || (defaultScriptOverridePath && await localFileExists(defaultScriptOverridePath) ? defaultScriptOverridePath : null);

  let lecturePlan = null;
  if (lecturePlanPath) {
    try {
      lecturePlan = normalizeLecturePlan(await readJson(lecturePlanPath));
    } catch (error) {
      warnings.push(`Failed to read lecture plan at ${relativeProjectPath(lecturePlanPath)}: ${error?.message || error}`);
    }
  }

  let scriptOverride = null;
  if (scriptOverridePath) {
    try {
      scriptOverride = await readJson(scriptOverridePath);
    } catch (error) {
      warnings.push(`Failed to read script override at ${relativeProjectPath(scriptOverridePath)}: ${error?.message || error}`);
    }
  }

  const avatarProfilePath = await resolveInputPath(
    options.avatarProfile || lecturePlan?.avatar_profile,
    lecturePlanPath ? path.dirname(lecturePlanPath) : topicDir,
  );
  const referenceAssetsPath = await resolveInputPath(
    options.referenceAssets || lecturePlan?.reference_assets,
    lecturePlanPath ? path.dirname(lecturePlanPath) : topicDir,
  );

  let avatarProfile = null;
  if (avatarProfilePath) {
    try {
      avatarProfile = await readJson(avatarProfilePath);
    } catch (error) {
      warnings.push(`Failed to read avatar profile at ${relativeProjectPath(avatarProfilePath)}: ${error?.message || error}`);
    }
  } else if (lecturePlan?.avatar_profile || options.avatarProfile) {
    warnings.push(`Avatar profile was referenced but not found: ${lecturePlan?.avatar_profile || options.avatarProfile}`);
  }

  let referenceAssets = null;
  if (referenceAssetsPath) {
    try {
      referenceAssets = await readJson(referenceAssetsPath);
    } catch (error) {
      warnings.push(`Failed to read reference assets at ${relativeProjectPath(referenceAssetsPath)}: ${error?.message || error}`);
    }
  } else if (lecturePlan?.reference_assets || options.referenceAssets) {
    warnings.push(`Reference assets file was referenced but not found: ${lecturePlan?.reference_assets || options.referenceAssets}`);
  }

  const voiceReferences = referenceAssets
    ? await resolveReferencedAssets(
      normalizeReferenceEntries(referenceAssets.voice_references, referenceAssetsPath),
      referenceAssetsPath,
    )
    : [];
  const imageReferences = referenceAssets
    ? await resolveReferencedAssets(
      normalizeReferenceEntries(referenceAssets.image_references, referenceAssetsPath),
      referenceAssetsPath,
    )
    : [];

  imageReferences.forEach((entry) => {
    if (!entry.exists) {
      warnings.push(`Avatar image reference is missing on disk: ${entry.file}`);
    }
  });
  voiceReferences.forEach((entry) => {
    if (!entry.exists) {
      warnings.push(`Voice reference audio is missing on disk: ${entry.file}`);
    }
  });

  const slidePlansById = {};
  (Array.isArray(lecturePlan?.slides) ? lecturePlan.slides : []).forEach((slidePlan, index) => {
    const resolvedSlideId = resolveSlidePlanRef({
      runtime,
      slidesData,
      slideRef: slidePlan.slide_ref || {},
    });

    if (!resolvedSlideId) {
      warnings.push(`Lecture plan slide entry ${index + 1} could not resolve to a real slide id.`);
      return;
    }

    if (slidePlansById[resolvedSlideId]) {
      warnings.push(`Lecture plan contains multiple entries for slide ${resolvedSlideId}; later entries override earlier ones.`);
    }

    slidePlansById[resolvedSlideId] = {
      ...slidePlan,
      resolved_slide_id: resolvedSlideId,
    };
  });

  const scriptOverridesById = {};
  (Array.isArray(scriptOverride?.slides) ? scriptOverride.slides : []).forEach((slideOverride, index) => {
    const resolvedSlideId = resolveSlidePlanRef({
      runtime,
      slidesData,
      slideRef: slideOverride.slide_ref || {},
    });

    if (!resolvedSlideId) {
      warnings.push(`Script override slide entry ${index + 1} could not resolve to a real slide id.`);
      return;
    }

    if (scriptOverridesById[resolvedSlideId]) {
      warnings.push(`Script override contains multiple entries for slide ${resolvedSlideId}; later entries override earlier ones.`);
    }

    scriptOverridesById[resolvedSlideId] = {
      ...slideOverride,
      resolved_slide_id: resolvedSlideId,
    };
  });

  return {
    warnings,
    lecturePlan,
    lecturePlanPath,
    scriptOverride,
    scriptOverridePath,
    avatarProfile,
    avatarProfilePath,
    referenceAssets,
    referenceAssetsPath,
    topicDefaults: lecturePlan?.topic_defaults || {},
    topicPedagogy: lecturePlan
      ? {
        teaching_arc: lecturePlan.teaching_arc || normalizeTeachingArc(),
        audience_level: lecturePlan.audience_level || "",
        topic_goal: lecturePlan.topic_goal || "",
        topic_takeaways: lecturePlan.topic_takeaways || [],
        style_notes: lecturePlan.style_notes || [],
        transition_style: lecturePlan.transition_style || "",
        scene_policy_default: lecturePlan.scene_policy_default || "",
        object_policy_default: lecturePlan.object_policy_default || "",
      }
      : {
        teaching_arc: normalizeTeachingArc(),
        audience_level: "",
        topic_goal: "",
        topic_takeaways: [],
        style_notes: [],
        transition_style: "",
        scene_policy_default: "",
        object_policy_default: "",
      },
    slidePlansById,
    scriptOverridesById,
    voiceStyles: buildVoiceStyleMap(avatarProfile),
    voiceReferences,
    imageReferences,
    fileSummary: {
      lecture_plan: lecturePlanPath ? relativeProjectPath(lecturePlanPath) : "",
      script_override: scriptOverridePath ? relativeProjectPath(scriptOverridePath) : "",
      avatar_profile: avatarProfilePath ? relativeProjectPath(avatarProfilePath) : "",
      reference_assets: referenceAssetsPath ? relativeProjectPath(referenceAssetsPath) : "",
    },
  };
}
