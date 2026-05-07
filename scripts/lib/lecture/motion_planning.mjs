import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  MOTION_MANIFEST_SCHEMA_VERSION,
  buildManualSlideVideoPath,
  relativeContractPath,
} from "./contracts.mjs";
import { clamp, relativeProjectPath } from "./utils.mjs";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function round(value, digits = 3) {
  const factor = 10 ** digits;
  return Math.round(Number(value || 0) * factor) / factor;
}

function findSlide(manifest, slideId) {
  return asArray(manifest?.slides).find((slide) => slide.slide_id === slideId) || null;
}

function centerOfBox(bbox) {
  if (!Array.isArray(bbox) || bbox.length !== 4) return [0, 0];
  return [round((bbox[0] + bbox[2]) / 2, 2), round((bbox[1] + bbox[3]) / 2, 2)];
}

function boxWidth(bbox) {
  if (!Array.isArray(bbox) || bbox.length !== 4) return 0;
  return Math.max(0, Number(bbox[2]) - Number(bbox[0]));
}

function boxHeight(bbox) {
  if (!Array.isArray(bbox) || bbox.length !== 4) return 0;
  return Math.max(0, Number(bbox[3]) - Number(bbox[1]));
}

function overlapArea(boxA, boxB) {
  if (!Array.isArray(boxA) || !Array.isArray(boxB)) return 0;
  const x0 = Math.max(boxA[0], boxB[0]);
  const y0 = Math.max(boxA[1], boxB[1]);
  const x1 = Math.min(boxA[2], boxB[2]);
  const y1 = Math.min(boxA[3], boxB[3]);
  if (x1 <= x0 || y1 <= y0) return 0;
  return (x1 - x0) * (y1 - y0);
}

function slideGeometry(layoutSlide, layoutManifest) {
  const bbox = Array.isArray(layoutSlide?.bbox)
    ? layoutSlide.bbox
    : [0, 0, ...(Array.isArray(layoutManifest?.viewport) ? layoutManifest.viewport : [1920, 1080])];
  return {
    bbox,
    width: boxWidth(bbox) || 1920,
    height: boxHeight(bbox) || 1080,
  };
}

function fallbackZones(layoutSlide, width, height) {
  return {
    avatar_safe_left: [0, round(height * 0.56, 2), round(width * 0.24, 2), height],
    avatar_safe_right: [round(width * 0.76, 2), round(height * 0.56, 2), width, height],
  };
}

function candidatePlacements(layoutSlide, planSlide = null, layoutManifest = null) {
  const { bbox, width, height } = slideGeometry(layoutSlide, layoutManifest);
  const fallback = fallbackZones(layoutSlide, width, height);
  const rawZones = {
    ...fallback,
    ...(layoutSlide?.zones || {}),
  };
  const zones = {
    avatar_safe_left: Array.isArray(rawZones.avatar_safe_left) ? rawZones.avatar_safe_left : fallback.avatar_safe_left,
    avatar_safe_right: Array.isArray(rawZones.avatar_safe_right) ? rawZones.avatar_safe_right : fallback.avatar_safe_right,
  };
  const centerBox = [round(width * 0.34, 2), round(height * 0.58, 2), round(width * 0.66, 2), height];
  const leftHalf = [round(-width * 0.10, 2), round(height * 0.58, 2), round(width * 0.18, 2), height];
  const rightHalf = [round(width * 0.82, 2), round(height * 0.58, 2), round(width * 1.10, 2), height];
  const allowCenter = Boolean(planSlide?.avatar_hint?.allow_center)
    || ["intro", "recap", "exit_check"].includes(planSlide?.slide_role || "")
    || planSlide?.importance === "high";
  const allowHalfOut = planSlide?.avatar_hint?.allow_half_out !== false;

  const candidates = [
    { screen_anchor: "left_bottom", placement_bbox: zones.avatar_safe_left, visibility_mode: "inside" },
    { screen_anchor: "right_bottom", placement_bbox: zones.avatar_safe_right, visibility_mode: "inside" },
    {
      screen_anchor: "left_mid",
      placement_bbox: [zones.avatar_safe_left[0], round(height * 0.34, 2), zones.avatar_safe_left[2], round(height * 0.88, 2)],
      visibility_mode: "inside",
    },
    {
      screen_anchor: "right_mid",
      placement_bbox: [zones.avatar_safe_right[0], round(height * 0.34, 2), zones.avatar_safe_right[2], round(height * 0.88, 2)],
      visibility_mode: "inside",
    },
  ];

  if (allowCenter) {
    candidates.push({ screen_anchor: "center_bottom", placement_bbox: centerBox, visibility_mode: "inside" });
  }
  if (allowHalfOut) {
    candidates.push({ screen_anchor: "left_bottom", placement_bbox: leftHalf, visibility_mode: "half_out_left" });
    candidates.push({ screen_anchor: "right_bottom", placement_bbox: rightHalf, visibility_mode: "half_out_right" });
  }

  return candidates.map((candidate) => ({
    ...candidate,
    center_xy: centerOfBox(candidate.placement_bbox),
    slide_bbox: bbox,
  }));
}

function candidateFreeXRanges(candidate, currentBBox, nextBBox, slideWidth) {
  const xRanges = [];
  const candidateWidth = boxWidth(candidate.placement_bbox) || round(slideWidth * 0.22, 2);
  const current = Array.isArray(currentBBox) ? currentBBox : null;
  const next = Array.isArray(nextBBox) ? nextBBox : null;
  const blockers = [current, next].filter(Boolean).sort((a, b) => a[0] - b[0]);
  let cursor = candidate.visibility_mode === "half_out_left" ? -candidateWidth * 0.45 : 0;
  const maxX = candidate.visibility_mode === "half_out_right" ? slideWidth - candidateWidth * 0.55 : slideWidth - candidateWidth;

  blockers.forEach((blocker) => {
    const leftLimit = Math.max(cursor, blocker[0] - candidateWidth);
    if (leftLimit > cursor) {
      xRanges.push([round(cursor, 2), round(leftLimit, 2)]);
    }
    cursor = Math.max(cursor, blocker[2]);
  });

  if (maxX > cursor) {
    xRanges.push([round(cursor, 2), round(maxX, 2)]);
  }

  return xRanges.filter((range) => range[1] - range[0] > candidateWidth * 0.25);
}

function importanceScore(planSlide, cue, segment) {
  const base = planSlide?.importance === "high" ? 1 : planSlide?.importance === "medium" ? 0.65 : 0.4;
  let score = base;
  if (segment?.delivery_kind === "caution") score += 0.2;
  if (segment?.delivery_kind === "compare") score += 0.15;
  if (asArray(segment?.emphasis_words).length) score += 0.1;
  if (cue?.target_type === "image" || cue?.target_type === "widget" || cue?.target_type === "iframe") score += 0.1;
  return clamp(score, 0.25, 1.2);
}

function currentTargetSide(targetBBox, slideWidth) {
  const center = centerOfBox(targetBBox)[0] || slideWidth / 2;
  if (center < slideWidth * 0.42) return "left";
  if (center > slideWidth * 0.58) return "right";
  return "center";
}

function costForCandidate({
  candidate,
  cue,
  nextCue,
  prevCenter,
  importance,
  slideWidth,
}) {
  const currentOverlap = overlapArea(candidate.placement_bbox, cue?.target_bbox);
  const nextOverlap = overlapArea(candidate.placement_bbox, nextCue?.target_bbox);
  const currentArea = Math.max(1, boxWidth(cue?.target_bbox) * boxHeight(cue?.target_bbox));
  const nextArea = Math.max(1, boxWidth(nextCue?.target_bbox) * boxHeight(nextCue?.target_bbox));
  const currentRatio = currentOverlap / currentArea;
  const nextRatio = nextOverlap / nextArea;
  const movePenalty = prevCenter
    ? Math.abs((candidate.center_xy[0] || 0) - (prevCenter[0] || 0)) / Math.max(slideWidth, 1)
    : 0;
  const targetSide = currentTargetSide(cue?.target_bbox, slideWidth);
  const sameSidePenalty = (
    (targetSide === "left" && candidate.center_xy[0] < slideWidth * 0.5)
    || (targetSide === "right" && candidate.center_xy[0] > slideWidth * 0.5)
  ) ? 0.14 : 0;
  const centerPenalty = candidate.screen_anchor === "center_bottom" ? 0.1 : 0;
  const halfOutPenalty = candidate.visibility_mode.startsWith("half_out") ? 0.06 : 0;

  return (
    currentRatio * 140
    + nextRatio * 70
    + movePenalty * 18
    + sameSidePenalty * 40 * importance
    + centerPenalty * 18
    + halfOutPenalty * 10
  );
}

function pickPlacement({ candidates, cue, nextCue, prevCenter, importance, slideWidth }) {
  return candidates
    .map((candidate) => ({
      ...candidate,
      score: costForCandidate({ candidate, cue, nextCue, prevCenter, importance, slideWidth }),
    }))
    .sort((left, right) => left.score - right.score)[0];
}

function cueBehavior(cue) {
  const avatarAction = asArray(cue?.actions).find((action) => action.type === "avatar");
  return {
    behavior: avatarAction?.behavior || "idle_talk",
    expression: avatarAction?.expression || "friendly_confident",
    screen_anchor: avatarAction?.screen_anchor || "",
  };
}

function gestureModeForCue(behavior, importance, isWalking) {
  if (behavior === "point_left_mid" || behavior === "point_right_mid") {
    return isWalking ? "walk_point_soft" : importance > 0.7 ? "point_hold" : "point_soft";
  }
  if (behavior === "explain_open_hand") {
    return isWalking ? "walk_open_hand" : "open_hand_explain";
  }
  if (behavior === "emphasize") return "emphasize";
  if (behavior === "face_viewer") return "face_viewer";
  return isWalking ? "walk_idle" : "idle_talk";
}

function viewerTarget(slideWidth, slideHeight) {
  return [round(slideWidth / 2, 2), round(slideHeight * 0.36, 2)];
}

function yawToTarget(fromXY, toXY, scale, maxDeg) {
  if (!Array.isArray(fromXY) || !Array.isArray(toXY)) return 0;
  const dx = (toXY[0] || 0) - (fromXY[0] || 0);
  return round(clamp(dx * scale, -maxDeg, maxDeg), 2);
}

function lerp(a, b, alpha) {
  return Number(a || 0) + (Number(b || 0) - Number(a || 0)) * clamp(alpha, 0, 1);
}

function lerpPoint(a, b, alpha) {
  return [round(lerp(a?.[0], b?.[0], alpha), 2), round(lerp(a?.[1], b?.[1], alpha), 2)];
}

function buildCuePlan({
  cue,
  nextCue,
  segment,
  planSlide,
  layoutSlide,
  layoutManifest,
  prevCenter,
}) {
  const { width, height } = slideGeometry(layoutSlide, layoutManifest);
  const importance = importanceScore(planSlide, cue, segment);
  const candidates = candidatePlacements(layoutSlide, planSlide, layoutManifest);
  const chosen = pickPlacement({
    candidates,
    cue,
    nextCue,
    prevCenter,
    importance,
    slideWidth: width,
  });
  const nextChosen = nextCue
    ? pickPlacement({
      candidates,
      cue: nextCue,
      nextCue: null,
      prevCenter: chosen.center_xy,
      importance: importanceScore(planSlide, nextCue, segment),
      slideWidth: width,
    })
    : chosen;
  const duration = Math.max(0, Number(cue?.t1 || 0) - Number(cue?.t0 || 0));
  const shouldReposition = Boolean(nextCue) && Math.abs(nextChosen.center_xy[0] - chosen.center_xy[0]) > width * 0.08;
  const walkWindow = shouldReposition ? Math.min(1.1, Math.max(0.35, duration * 0.32)) : 0;
  const walkStart = shouldReposition ? Math.max(Number(cue.t0), Number(cue.t1) - walkWindow) : Number(cue.t1);
  const walkEnd = shouldReposition ? Number(cue.t1) : Number(cue.t1);
  const behaviorInfo = cueBehavior(cue);
  const pointRequired = behaviorInfo.behavior.startsWith("point_");

  return {
    cue_id: cue.cue_id,
    segment_id: cue.segment_id,
    t0: round(cue.t0),
    t1: round(cue.t1),
    duration: round(duration),
    speech: cue.speech,
    target_element: cue.target_element,
    target_type: cue.target_type,
    target_bbox: cue.target_bbox,
    attention_xy: cue.attention_xy,
    attention_mode: cue.attention_mode,
    behavior: behaviorInfo.behavior,
    expression: behaviorInfo.expression,
    importance: round(importance, 2),
    preferred_anchor: chosen.screen_anchor,
    placement_bbox: chosen.placement_bbox,
    visibility_mode: chosen.visibility_mode,
    center_xy: chosen.center_xy,
    allowed_x_ranges: candidateFreeXRanges(chosen, cue?.target_bbox, nextCue?.target_bbox, width),
    next_target_bbox: nextCue?.target_bbox || null,
    next_center_xy: nextChosen.center_xy,
    next_anchor: nextChosen.screen_anchor,
    should_reposition: shouldReposition,
    walk_start_t: round(walkStart),
    walk_end_t: round(walkEnd),
    pointing_required: pointRequired,
    point_target_xy: pointRequired ? cue.attention_xy : null,
    gaze_mode: cue.attention_mode === "slide_focus" ? "viewer_primary" : "target_primary",
    delivery_kind: segment?.delivery_kind || "",
    tone: segment?.voice?.tone || "",
    energy: Number(segment?.voice?.energy || 0),
    pace: Number(segment?.voice?.pace || 0),
    emphasis_words: asArray(segment?.emphasis_words),
  };
}

function buildSlideSamples({
  slidePlan,
  slideDuration,
  sampleRateFps,
  viewerXY,
  entryPose,
}) {
  const samples = [];
  const dt = 1 / sampleRateFps;
  const totalSamples = Math.max(1, Math.floor(slideDuration * sampleRateFps) + 1);
  const cues = slidePlan.cues;
  const firstCue = cues[0] || null;
  const settleDuration = firstCue ? Math.min(0.6, Math.max(0.2, firstCue.t1 - firstCue.t0 > 0 ? (firstCue.t1 - firstCue.t0) * 0.2 : 0.4)) : 0.4;

  for (let index = 0; index < totalSamples; index += 1) {
    const t = round(Math.min(slideDuration, index * dt));
    let activeCue = cues.find((cue) => t >= cue.t0 && t <= cue.t1);
    if (!activeCue) {
      activeCue = cues.find((cue) => t < cue.t0) || cues[cues.length - 1] || null;
    }
    if (!activeCue) {
      continue;
    }

    let rootXY = activeCue.center_xy;
    if (activeCue.should_reposition && t >= activeCue.walk_start_t && activeCue.walk_end_t > activeCue.walk_start_t) {
      const alpha = (t - activeCue.walk_start_t) / Math.max(0.001, activeCue.walk_end_t - activeCue.walk_start_t);
      rootXY = lerpPoint(activeCue.center_xy, activeCue.next_center_xy, alpha);
    }

    if (entryPose && t <= settleDuration) {
      rootXY = lerpPoint(entryPose.root_xy, rootXY, t / Math.max(0.001, settleDuration));
    }

    const targetXY = activeCue.point_target_xy || activeCue.attention_xy || viewerXY;
    const viewerBlend = activeCue.gaze_mode === "viewer_primary" ? 0.25 : 0.7;
    const gazeTarget = lerpPoint(targetXY, viewerXY, viewerBlend);
    const walkingTo = activeCue.should_reposition && t >= activeCue.walk_start_t && t <= activeCue.walk_end_t
      ? activeCue.next_center_xy
      : rootXY;
    const walkDistance = Math.abs((walkingTo[0] || 0) - (rootXY[0] || 0));
    const walkSpeed = activeCue.should_reposition && activeCue.walk_end_t > activeCue.walk_start_t
      ? walkDistance / Math.max(0.001, activeCue.walk_end_t - activeCue.walk_start_t)
      : 0;
    const isWalking = walkSpeed > 12;

    samples.push({
      t,
      cue_id: activeCue.cue_id,
      segment_id: activeCue.segment_id,
      root_x: round(rootXY[0], 2),
      root_y: round(rootXY[1], 2),
      body_yaw_deg: yawToTarget(rootXY, targetXY, 0.035, 18),
      head_yaw_deg: yawToTarget(rootXY, gazeTarget, 0.06, 28),
      gaze_target_xy: gazeTarget,
      point_target_xy: activeCue.point_target_xy || null,
      gesture_mode: gestureModeForCue(activeCue.behavior, activeCue.importance, isWalking),
      gesture_weight: round(clamp(activeCue.importance, 0.35, 1), 2),
      walk_speed_px_s: round(walkSpeed, 2),
      screen_anchor: activeCue.preferred_anchor,
      visibility_mode: activeCue.visibility_mode,
      expression: activeCue.expression,
    });
  }

  return samples;
}

export function compileMotionManifest({
  descriptor,
  scriptManifest,
  layoutManifest,
  timelineManifest,
  authoring = null,
  sampleRateFps = 6,
  timingSource = "compiled",
}) {
  const slides = [];
  let previousCarryPose = null;

  for (const slideScript of asArray(scriptManifest?.slides)) {
    const layoutSlide = findSlide(layoutManifest, slideScript.slide_id);
    const timelineSlide = findSlide(timelineManifest, slideScript.slide_id);
    if (!layoutSlide || !timelineSlide) continue;

    const planSlide = authoring?.slidePlansById?.[slideScript.slide_id] || null;
    const { width, height } = slideGeometry(layoutSlide, layoutManifest);
    const viewerXY = viewerTarget(width, height);
    let prevCenter = previousCarryPose?.root_xy || [width * 0.88, height * 0.8];

    const cues = asArray(timelineSlide.timeline).map((cue, index) => {
      const segment = asArray(slideScript.segments).find((item) => item.segment_id === cue.segment_id) || null;
      const nextCue = asArray(timelineSlide.timeline)[index + 1] || null;
      const cuePlan = buildCuePlan({
        cue,
        nextCue,
        segment,
        planSlide,
        layoutSlide,
        layoutManifest,
        prevCenter,
      });
      prevCenter = cuePlan.next_center_xy || cuePlan.center_xy;
      return cuePlan;
    });

    const entryPolicy = previousCarryPose ? "carry_previous_slide" : "enter_right";
    const entryPose = previousCarryPose || {
      root_xy: [round(width * 1.08, 2), round(height * 0.8, 2)],
      screen_anchor: "right_bottom",
      visibility_mode: "half_out_right",
    };
    const samples = buildSlideSamples({
      slidePlan: { cues },
      slideDuration: Number(timelineSlide.duration || 0),
      sampleRateFps,
      viewerXY,
      entryPose,
    });
    const carryOut = samples[samples.length - 1]
      ? {
        root_xy: [samples[samples.length - 1].root_x, samples[samples.length - 1].root_y],
        screen_anchor: samples[samples.length - 1].screen_anchor,
        visibility_mode: samples[samples.length - 1].visibility_mode,
      }
      : entryPose;

    const slidePlan = {
      slide_id: slideScript.slide_id,
      slide_type: slideScript.slide_type,
      duration: round(timelineSlide.duration),
      timing_source: timingSource,
      viewport: asArray(layoutManifest?.viewport),
      entry_policy: entryPolicy,
      carry_pose_in: entryPose,
      carry_pose_out: carryOut,
      media: {
        audio: {
          compiled: timelineSlide.media?.audio?.compiled || timelineSlide.audio_file || "",
          manual: timelineSlide.media?.audio?.manual || "",
        },
        alignment: {
          compiled: timelineSlide.media?.alignment?.compiled || "",
          manual: timelineSlide.media?.alignment?.manual || "",
        },
        output_video: relativeContractPath(buildManualSlideVideoPath(descriptor, slideScript.slide_id)),
      },
      cues,
      samples,
    };

    previousCarryPose = carryOut;
    slides.push(slidePlan);
  }

  return {
    schema_version: MOTION_MANIFEST_SCHEMA_VERSION,
    topic_id: scriptManifest.topic_id,
    selector: scriptManifest.selector,
    viewport: asArray(layoutManifest?.viewport),
    sample_rate_fps: sampleRateFps,
    timing_source: timingSource,
    planner: {
      mode: "deterministic_staging_with_lookahead",
      fixed_camera: true,
      max_turn_deg: 18,
      head_bias_toward_students: true,
      walk_style: "slow_only",
      carry_pose_across_slides: true,
      slide_video_unit: "one_video_per_slide",
    },
    slides,
  };
}

export async function writeMotionArtifacts({
  descriptor,
  motionManifest,
  artifactDir,
}) {
  const motionDir = path.join(artifactDir, "motion");
  const topicManifestPath = path.join(artifactDir, "motion.manifest.json");
  await mkdir(motionDir, { recursive: true });
  await writeFile(topicManifestPath, `${JSON.stringify(motionManifest, null, 2)}\n`, "utf8");

  const slideFiles = [];
  for (const slide of asArray(motionManifest.slides)) {
    const slidePath = path.join(motionDir, `${slide.slide_id}.motion.json`);
    const slidePayload = {
      schema_version: motionManifest.schema_version,
      topic_id: motionManifest.topic_id,
      selector: motionManifest.selector,
      viewport: motionManifest.viewport,
      sample_rate_fps: motionManifest.sample_rate_fps,
      planner: motionManifest.planner,
      slide,
    };
    await writeFile(slidePath, `${JSON.stringify(slidePayload, null, 2)}\n`, "utf8");
    slideFiles.push({
      slide_id: slide.slide_id,
      path: relativeProjectPath(slidePath),
    });
  }

  return {
    topic_manifest: relativeProjectPath(topicManifestPath),
    slide_files: slideFiles,
    dir: relativeProjectPath(motionDir),
  };
}
