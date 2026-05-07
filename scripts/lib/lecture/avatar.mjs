import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "../export_runtime.mjs";
import {
  buildCompiledRenderPath,
  buildManualRenderPath,
  relativeContractPath,
} from "./contracts.mjs";
import { relativeProjectPath } from "./utils.mjs";

const ALLOWED_BEHAVIORS = new Set([
  "face_viewer",
  "idle_talk",
  "point_left_mid",
  "point_right_mid",
  "explain_open_hand",
  "emphasize",
  "enter_left",
  "enter_right",
  "clear_avatar",
]);

const ALLOWED_ANCHORS = new Set([
  "left_bottom",
  "right_bottom",
  "left_mid",
  "right_mid",
  "center_bottom",
]);

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function round(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

function slideDimensions(slideLayout) {
  const bbox = Array.isArray(slideLayout?.bbox) ? slideLayout.bbox : [0, 0, 1280, 720];
  return {
    bbox,
    width: bbox[2] - bbox[0],
    height: bbox[3] - bbox[1],
  };
}

function normalizeBehavior(behavior, avatarProfile) {
  if (!behavior) return "";
  if (ALLOWED_BEHAVIORS.has(behavior)) return behavior;
  const mapped = avatarProfile?.behaviors?.[behavior];
  if (mapped && ALLOWED_BEHAVIORS.has(mapped)) return mapped;
  return "";
}

function defaultExpression(segmentScript, planSlide) {
  const voiceStyle = planSlide?.voice_style || segmentScript?.voice?.voice_style || "";
  const tone = planSlide?.tone || segmentScript?.voice?.tone || "";
  const key = `${voiceStyle} ${tone}`.toLowerCase();

  if (key.includes("serious")) return "serious";
  if (key.includes("recap") || key.includes("calm")) return "calm";
  if (key.includes("energetic") || key.includes("demo")) return "engaged";
  return "friendly_confident";
}

function chooseAnchorForTarget(targetBBox, slideLayout, defaults = {}) {
  const { bbox, width, height } = slideDimensions(slideLayout);
  const slideMid = bbox[0] + width / 2;
  const targetMid = Array.isArray(targetBBox) ? (targetBBox[0] + targetBBox[2]) / 2 : slideMid;
  const defaultAnchor = defaults.defaultAnchor || "right_bottom";

  if (!Array.isArray(targetBBox)) return defaultAnchor;
  if (targetMid < slideMid) return defaults.leftTargetAnchor || "right_bottom";
  if (targetMid > slideMid) return defaults.rightTargetAnchor || "left_bottom";
  return height > 0 ? defaultAnchor : "right_bottom";
}

function placementForAnchor(anchor, slideLayout) {
  const { bbox, width, height } = slideDimensions(slideLayout);
  const leftZone = slideLayout?.zones?.avatar_safe_left || [bbox[0], round(height * 0.56), round(width * 0.26), bbox[3]];
  const rightZone = slideLayout?.zones?.avatar_safe_right || [round(width * 0.74), round(height * 0.56), bbox[2], bbox[3]];

  if (anchor === "left_bottom") return leftZone;
  if (anchor === "right_bottom") return rightZone;
  if (anchor === "left_mid") {
    return [leftZone[0], round(height * 0.34), leftZone[2], round(height * 0.88)];
  }
  if (anchor === "right_mid") {
    return [rightZone[0], round(height * 0.34), rightZone[2], round(height * 0.88)];
  }
  if (anchor === "center_bottom") {
    return [round(width * 0.34), round(height * 0.58), round(width * 0.66), bbox[3]];
  }

  return rightZone;
}

function detectComparisonSlide(slideScript) {
  const key = `${slideScript?.slide_id || ""} ${slideScript?.slide_type || ""}`.toLowerCase();
  return key.includes("compare") || key.includes("workspace") || key.includes("vs");
}

function detectRecapSlide(slideScript) {
  const key = `${slideScript?.slide_id || ""}`.toLowerCase();
  return key.includes("recap") || key.includes("memory") || key.includes("exit") || key.includes("checklist");
}

function normalizeHintBehavior(behavior, avatarProfile) {
  return normalizeBehavior(behavior, avatarProfile);
}

function behaviorFromDeliveryKind(deliveryKind, cue, anchor) {
  if (!deliveryKind) return "";
  if (deliveryKind === "introduce") return "face_viewer";
  if (deliveryKind === "compare") return "explain_open_hand";
  if (deliveryKind === "recap") return "explain_open_hand";
  if (deliveryKind === "demo") {
    return cue?.target_element && cue.target_element !== "slide"
      ? (anchor.startsWith("right") ? "point_left_mid" : "point_right_mid")
      : "idle_talk";
  }
  if (deliveryKind === "quiz_prompt") return "face_viewer";
  if (deliveryKind === "caution") return "emphasize";
  return "";
}

function behaviorFromAttentionMode(attentionMode, cue, anchor) {
  if (!attentionMode) return "";
  if (attentionMode === "hybrid_focus" && cue?.target_element && cue.target_element !== "slide") {
    return anchor.startsWith("right") ? "point_left_mid" : "point_right_mid";
  }
  return "";
}

function cueOrdinal(cue) {
  const match = String(cue?.cue_id || "").match(/(\d+)$/);
  return match ? Number(match[1]) : 1;
}

function naturalTargetBehavior(cue, segmentScript, planSlide, anchor) {
  if (!cue?.target_element || cue.target_element === "slide") return "idle_talk";
  const targetType = String(cue?.target_type || "").toLowerCase();
  const deliveryKind = String(segmentScript?.delivery_kind || "").toLowerCase();
  const ordinal = cueOrdinal(cue);

  if (targetType === "title") return ordinal === 1 ? "face_viewer" : "explain_open_hand";
  if (targetType === "subtitle" || targetType === "meta") return "explain_open_hand";
  if (deliveryKind === "demo") return anchor.startsWith("right") ? "point_left_mid" : "point_right_mid";
  if (deliveryKind === "quiz_prompt") return "face_viewer";
  if (deliveryKind === "caution" || asArray(segmentScript?.emphasis_words).length) return "emphasize";

  const importance = String(planSlide?.importance || "").toLowerCase();
  const shouldPoint = ordinal % 4 === 2 || (importance === "high" && ordinal % 5 === 0);
  if (shouldPoint) return anchor.startsWith("right") ? "point_left_mid" : "point_right_mid";
  if (ordinal % 3 === 0) return "face_viewer";
  return "explain_open_hand";
}

function inferBehavior({
  slideScript,
  segmentScript,
  cue,
  planSlide,
  avatarProfile,
  anchor,
}) {
  const explicit = normalizeBehavior(planSlide?.avatar_hint?.preferred_behavior, avatarProfile);
  if (explicit && !["idle_talk", "face_viewer"].includes(explicit)) return { behavior: explicit, source: "plan_hint" };

  const llmHint = normalizeHintBehavior(segmentScript?.avatar_behavior_hint, avatarProfile);
  if (llmHint) return { behavior: llmHint, source: "llm_hint" };

  const attentionModeBehavior = behaviorFromAttentionMode(segmentScript?.attention_mode, cue, anchor);
  if (attentionModeBehavior) {
    return { behavior: attentionModeBehavior, source: "attention_mode" };
  }

  if (planSlide?.scene_policy === "clean" || planSlide?.scene_policy === "none") {
    return { behavior: "clear_avatar", source: "scene_policy" };
  }

  if (asArray(segmentScript?.emphasis_words).length) {
    return { behavior: "emphasize", source: "emphasis_words" };
  }

  if (slideScript.slide_type === "title") {
    return { behavior: "face_viewer", source: "slide_type" };
  }

  if (detectRecapSlide(slideScript) || String(planSlide?.voice_style || "").toLowerCase().includes("recap")) {
    return { behavior: "explain_open_hand", source: "recap_heuristic" };
  }

  if (detectComparisonSlide(slideScript)) {
    return { behavior: "explain_open_hand", source: "comparison_heuristic" };
  }

  const deliveryKindBehavior = behaviorFromDeliveryKind(segmentScript?.delivery_kind, cue, anchor);
  if (deliveryKindBehavior) {
    return { behavior: deliveryKindBehavior, source: "delivery_kind" };
  }

  if (cue?.target_element && cue.target_element !== "slide") {
    return {
      behavior: naturalTargetBehavior(cue, segmentScript, planSlide, anchor),
      source: "natural_target_variation",
    };
  }

  if (explicit) return { behavior: explicit, source: "plan_hint" };

  return { behavior: "idle_talk", source: "default_idle" };
}

function imageRefById(authoring) {
  return new Map(asArray(authoring?.imageReferences).map((item) => [item.id, item]));
}

function clipRefByBehavior(authoring) {
  return new Map(
    asArray(authoring?.referenceAssets?.avatar_clips).map((item) => [item.behavior || item.id, item]),
  );
}

function behaviorAssetId(behavior) {
  if (behavior === "explain_open_hand") return "fullbody_front_open_hand";
  if (behavior === "point_left_mid") return "fullbody_point_left";
  if (behavior === "point_right_mid") return "fullbody_point_right";
  if (behavior === "emphasize") return "fullbody_emphasize";
  return "fullbody_front_idle";
}

export function compileAvatarAction({
  descriptor,
  slideScript,
  slideLayout,
  segmentScript,
  cue,
  planSlide,
  authoring,
}) {
  const explicitAnchor = planSlide?.avatar_hint?.preferred_anchor || planSlide?.avatar_anchor || "";
  const defaultAnchor = explicitAnchor
    || planSlide?.avatar_anchor
    || authoring?.topicDefaults?.avatar_anchor
    || authoring?.avatarProfile?.visual?.default_screen_anchor
    || authoring?.avatarProfile?.anchors?.default
    || "right_bottom";
  const inferredAnchor = chooseAnchorForTarget(cue?.target_bbox, slideLayout, {
    defaultAnchor,
  });
  const screenAnchor = ALLOWED_ANCHORS.has(explicitAnchor)
    ? explicitAnchor
    : ALLOWED_ANCHORS.has(inferredAnchor)
      ? inferredAnchor
      : ALLOWED_ANCHORS.has(defaultAnchor)
        ? defaultAnchor
        : "right_bottom";

  const inferredBehavior = inferBehavior({
    slideScript,
    segmentScript,
    cue,
    planSlide,
    avatarProfile: authoring?.avatarProfile,
    anchor: screenAnchor,
  });
  const behavior = inferredBehavior.behavior;

  const expression = defaultExpression(segmentScript, planSlide);
  const imageMap = imageRefById(authoring);
  const clipMap = clipRefByBehavior(authoring);
  const pngAsset = imageMap.get(behaviorAssetId(behavior));
  const clipAsset = clipMap.get(behavior);
  const compiledRenderPath = buildCompiledRenderPath(descriptor, slideScript.slide_id, cue.cue_id);
  const manualRenderWebmPath = buildManualRenderPath(descriptor, slideScript.slide_id, cue.cue_id, "webm");
  const manualRenderPngPath = buildManualRenderPath(descriptor, slideScript.slide_id, cue.cue_id, "png");

  const compiledCandidates = [
    {
      kind: "webm",
      src: relativeContractPath(compiledRenderPath),
      available: false,
      asset_id: `${slideScript.slide_id}__${cue.cue_id}`,
      replaceable: false,
      source_kind: "compiled_render",
    },
  ];
  if (clipAsset?.file) {
    compiledCandidates.push({
      kind: "webm",
      src: clipAsset.file,
      available: Boolean(clipAsset.exists),
      asset_id: clipAsset.id || behavior,
      replaceable: true,
      source_kind: "compiled_placeholder",
    });
  }
  if (pngAsset?.relative_path) {
    compiledCandidates.push({
      kind: "png",
      src: pngAsset.relative_path,
      available: Boolean(pngAsset.exists),
      asset_id: pngAsset.id,
      replaceable: true,
      source_kind: "compiled_placeholder",
    });
  }

  const manualCandidates = [
    {
      kind: "webm",
      src: relativeContractPath(manualRenderWebmPath),
      available: false,
      asset_id: `${slideScript.slide_id}__${cue.cue_id}`,
      replaceable: false,
      source_kind: "manual_render",
    },
    {
      kind: "png",
      src: relativeContractPath(manualRenderPngPath),
      available: false,
      asset_id: `${slideScript.slide_id}__${cue.cue_id}`,
      replaceable: false,
      source_kind: "manual_render",
    },
  ];

  return {
    type: "avatar",
    behavior,
    behavior_source: inferredBehavior.source,
    screen_anchor: screenAnchor,
    expression,
    target_element: cue.target_element,
    placement_bbox: placementForAnchor(screenAnchor, slideLayout),
    asset_candidates: compiledCandidates,
    media: {
      compiled_render: relativeContractPath(compiledRenderPath),
      manual_render_webm: relativeContractPath(manualRenderWebmPath),
      manual_render_png: relativeContractPath(manualRenderPngPath),
      compiled_candidates: compiledCandidates,
      manual_candidates: manualCandidates,
    },
    clear: behavior === "clear_avatar",
  };
}

export async function writeAvatarJobs() {
  throw new Error("writeAvatarJobs moved to scripts/lib/lecture/jobs.mjs");
}
