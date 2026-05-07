import crypto from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "../export_runtime.mjs";
import { relativeProjectPath } from "./utils.mjs";

export const AI1_CONTROL_SCHEMA_VERSION = "1.0";
export const AI1_PROMPT_VERSION = "kimodo_instructor_v001";
export const AI1_PROMPT_CACHE_SCHEMA_VERSION = "phase7-ai1-kimodo-prompt-cache-v1";

export const CAMERA_REFERENCE = Object.freeze({
  render_resolution_px: [1920, 1080],
  render_aspect_ratio: "16:9",
  camera_type: "orthographic",
  camera_location_world_m: [0.0, -6.0, 1.2375],
  camera_look_direction: "+Y",
  camera_up_axis: "+Z",
  orthographic_scale_m: 2.775,
  character_front_direction: "-Y",
  slide_width_m: 4.933,
  slide_height_m: 2.775,
  character_height_m: 1.85,
  target_character_height_fraction: 0.6667,
  target_character_height_px: 720,
  pixels_per_meter: 389.19,
  meters_per_pixel: 0.002569,
  bottom_margin_m: 0.15,
  bottom_world_z_m: -0.15,
  axis_convention: {
    screen_right: "+X",
    screen_left: "-X",
    screen_up: "+Z",
    screen_down: "-Z",
    toward_camera_audience: "-Y",
    toward_slide_background: "+Y",
  },
});

export const GAZE_TARGET_WORLD_Y_M = -0.40;
export const POINT_TARGET_WORLD_Y_M = -0.25;
export const DEPTH_POLICY = "keep_y_fixed";
export const MAX_DEPTH_Y_DRIFT_M = 0.05;

const VIEWPORT = Object.freeze({
  width: 1920,
  height: 1080,
  aspect_ratio: "16:9",
});

const VISIBLE_FRAME_PX = Object.freeze({
  left: 0,
  right: 1920,
  top: 0,
  bottom: 1080,
});

const MOVEMENT_BOX_PX = Object.freeze({
  left: -120,
  right: 2040,
  top: 0,
  bottom: 1080,
});

const VISIBLE_FRAME_WORLD_M = Object.freeze({
  left_x: -2.4665,
  right_x: 2.4665,
  top_z: 2.625,
  bottom_z: -0.15,
});

const MOVEMENT_BOX_WORLD_M = Object.freeze({
  left_x: -2.775,
  right_x: 2.775,
  top_z: 2.625,
  bottom_z: -0.15,
});

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function round(value, digits = 3) {
  const factor = 10 ** digits;
  return Math.round(Number(value || 0) * factor) / factor;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value)));
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function fileExists(filePath) {
  return Boolean(await stat(filePath).catch(() => null));
}

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function absoluteProjectPath(value) {
  if (!value) return "";
  return path.isAbsolute(value) ? value : path.join(projectRoot, value);
}

export function controlsDirForSelector(selector) {
  return path.join(
    projectRoot,
    "generated",
    "controls",
    "slide_video",
    selector.school,
    selector.course,
    selector.session,
    selector.topic,
  );
}

export function controlsPathsForJob(job) {
  const controlsDir = controlsDirForSelector(job.selector);
  return {
    dir: controlsDir,
    motionRequests: path.join(controlsDir, `${job.slide_id}.motion_requests.json`),
    avatarPlan: path.join(controlsDir, `${job.slide_id}.avatar_plan.json`),
    report: path.join(controlsDir, `${job.slide_id}.ai1_report.md`),
  };
}

export function pixelToWorldX(xPx) {
  return round((Number(xPx) - 960) / CAMERA_REFERENCE.pixels_per_meter);
}

export function pixelToWorldZ(yPx) {
  return round(CAMERA_REFERENCE.bottom_world_z_m + (1080 - Number(yPx)) / CAMERA_REFERENCE.pixels_per_meter);
}

export function pixelToPointWorld([xPx, yPx], yDepth) {
  return [pixelToWorldX(xPx), round(yDepth), pixelToWorldZ(yPx)];
}

export function pixelToBaseWorld([xPx]) {
  return [pixelToWorldX(xPx), 0, 0];
}

export function durationBucket(durationSec) {
  const duration = Number(durationSec || 0);
  if (duration <= 3.5) return "3s";
  if (duration <= 6.5) return "5s";
  return "8s";
}

export function energyBucket(value, importance = 0) {
  const energy = Number(value || 0);
  if (energy >= 0.76 && Number(importance || 0) >= 0.8) return "emphatic";
  if (energy >= 0.56 || Number(importance || 0) >= 0.7) return "normal";
  return "calm";
}

function anchorToBucket(anchor = "") {
  const value = String(anchor || "").toLowerCase();
  if (value.includes("left")) return "bottom_left";
  if (value.includes("right")) return "bottom_right";
  if (value.includes("center")) return "bottom_center";
  return "bottom_right";
}

function bodyFacingBucket(anchorBucket, targetPoint) {
  if (!Array.isArray(targetPoint)) return "audience";
  if (anchorBucket === "bottom_right") return "slightly_left";
  if (anchorBucket === "bottom_left") return "slightly_right";
  return targetPoint[0] < 960 ? "slightly_left" : "slightly_right";
}

function bodyYawForFacing(bucket) {
  if (bucket === "slightly_left") return -15;
  if (bucket === "slide_left") return -28;
  if (bucket === "slightly_right") return 15;
  if (bucket === "slide_right") return 28;
  return 0;
}

function headYawBucket(direction) {
  if (String(direction).includes("left")) return "left";
  if (String(direction).includes("right")) return "right";
  return "center";
}

function headPitchBucket(direction) {
  if (String(direction).includes("up")) return "up";
  if (String(direction).includes("down")) return "down";
  return "neutral";
}

export function directionBucketFromVector(dx, dy) {
  const absX = Math.abs(Number(dx || 0));
  const absY = Math.abs(Number(dy || 0));
  if (absX < 80 && absY < 80) return "center";
  const horizontal = dx < -80 ? "left" : dx > 80 ? "right" : "";
  const vertical = dy < -80 ? "up" : dy > 80 ? "down" : "";
  if (vertical && horizontal) return `${vertical}_${horizontal}`;
  return vertical || horizontal || "center";
}

function targetDirectionBucket(basePoint, targetPoint) {
  if (!Array.isArray(basePoint) || !Array.isArray(targetPoint)) return "center";
  return directionBucketFromVector(targetPoint[0] - basePoint[0], targetPoint[1] - basePoint[1]);
}

function walkDirectionBucket(cue) {
  if (!cue?.should_reposition) return "in_place";
  const fromX = Number(cue.center_xy?.[0] || 0);
  const toX = Number(cue.next_center_xy?.[0] || fromX);
  if (toX < fromX - 40) return "left";
  if (toX > fromX + 40) return "right";
  return "in_place";
}

function stepsBucket(cue) {
  if (!cue?.should_reposition) return 0;
  const fromX = Number(cue.center_xy?.[0] || 0);
  const toX = Number(cue.next_center_xy?.[0] || fromX);
  const distance = Math.abs(toX - fromX);
  if (distance < 80) return 1;
  if (distance < 180) return 2;
  if (distance < 320) return 3;
  if (distance < 520) return 4;
  return 5;
}

function shouldPoint(cue, index) {
  if (cue?.pointing_required) return true;
  if (!cue?.target_element || cue.target_type === "title" || cue.target_type === "slide") return false;
  const importance = Number(cue.importance || 0);
  const targetTypes = new Set(["bullet", "image", "gallery", "video", "iframe", "widget", "formula", "code"]);
  if (!targetTypes.has(String(cue.target_type || ""))) return false;
  if (importance >= 0.78) return true;
  return Number(cue.duration || 0) >= 3.2 && index % 3 === 1;
}

function shouldGlance(cue, index, pointing) {
  if (pointing) return true;
  if (!cue?.target_element || cue.target_type === "slide") return false;
  return cue.attention_mode === "slide_focus" && index % 2 === 0;
}

function motionTypeForCue(cue, index, pointing, cueCount) {
  if (cue?.should_reposition) {
    const direction = walkDirectionBucket(cue);
    if (direction === "left") return "side_step_left";
    if (direction === "right") return "side_step_right";
    return "weight_shift_right";
  }
  if (pointing) return "explain_point";
  if (index === 0 && cue?.target_type === "title") return "gesture_emphasis";
  if (index === cueCount - 1 && Number(cue?.duration || 0) >= 4) return "gesture_emphasis";
  if (String(cue?.behavior || "") === "emphasize" || Number(cue?.importance || 0) >= 0.84 || asArray(cue?.emphasis_words).length) {
    return "gesture_emphasis";
  }
  if (shouldGlance(cue, index, false) && Number(cue?.duration || 0) <= 3.5) return "glance";
  if (cue?.target_type && cue.target_type !== "title" && cue.target_type !== "slide") {
    if (!shouldGlance(cue, index, false) && index % 3 === 0) return "idle_talk";
    return "explain_small";
  }
  return index === 0 ? "explain_small" : "idle_talk";
}

function gestureBucketForCue(cue, motionType, pointing) {
  if (motionType.startsWith("side_step_") || motionType.startsWith("weight_shift_")) return "none";
  if (motionType === "glance") return "none";
  if (pointing) return "light";
  if (motionType === "gesture_emphasis") return Number(cue?.importance || 0) >= 0.9 ? "medium" : "light";
  if (motionType === "idle_talk") return "light";
  return "light";
}

function pointHand(anchorBucket, pointDirection, pointing) {
  if (!pointing) return "none";
  if (anchorBucket === "bottom_right" && String(pointDirection).includes("left")) return "right";
  if (anchorBucket === "bottom_left" && String(pointDirection).includes("right")) return "left";
  return "auto";
}

function pointIntensity(pointing, gestureBucket) {
  if (!pointing) return "none";
  return gestureBucket === "medium" ? "medium" : "light";
}

function basePointForCue(cue, anchorBucket) {
  return basePointFromX(Number(cue?.center_xy?.[0] || 0), anchorBucket);
}

function basePointFromX(rawX, anchorBucket) {
  const defaultX = anchorBucket === "bottom_left" ? 240 : anchorBucket === "bottom_center" ? 960 : 1689.6;
  const resolvedX = Number(rawX || defaultX);
  const x = anchorBucket === "bottom_left"
    ? clamp(resolvedX, MOVEMENT_BOX_PX.left, 720)
    : anchorBucket === "bottom_center"
      ? clamp(resolvedX, 650, 1270)
      : clamp(resolvedX, 1200, MOVEMENT_BOX_PX.right);
  return [round(x, 2), 1030];
}

function screenPathForCue(cue, anchorBucket, fromPoint) {
  const toPoint = cue?.should_reposition
    ? basePointFromX(Number(cue?.next_center_xy?.[0] || fromPoint[0]), anchorBucket)
    : fromPoint;
  return {
    path_type: cue?.should_reposition ? "linear" : "stationary",
    from_avatar_base_screen_xy_px: fromPoint,
    to_avatar_base_screen_xy_px: toPoint,
    from_avatar_base_world_xyz_m: pixelToBaseWorld(fromPoint),
    to_avatar_base_world_xyz_m: pixelToBaseWorld(toPoint),
    depth_policy: DEPTH_POLICY,
    max_depth_y_drift_m: MAX_DEPTH_Y_DRIFT_M,
  };
}

function safeAreas() {
  return {
    body_safe_rect_px: { ...VISIBLE_FRAME_PX },
    hand_safe_rect_px: { ...VISIBLE_FRAME_PX },
    content_safe_rect_px: {
      left: 40,
      right: 1880,
      top: 40,
      bottom: 1040,
    },
    visible_frame_px: { ...VISIBLE_FRAME_PX },
    movement_box_px: { ...MOVEMENT_BOX_PX },
    visible_frame_world_m: { ...VISIBLE_FRAME_WORLD_M },
    movement_box_world_m: { ...MOVEMENT_BOX_WORLD_M },
  };
}

function screenConstraints(cue) {
  if (cue?.visibility_mode === "partial_offscreen_allowed") {
    return {
      visible_frame_px: { ...VISIBLE_FRAME_PX },
      movement_box_px: { ...MOVEMENT_BOX_PX },
      visible_frame_world_m: { ...VISIBLE_FRAME_WORLD_M },
      movement_box_world_m: { ...MOVEMENT_BOX_WORLD_M },
      visibility_mode: "partial_offscreen_allowed",
      keep_body_inside_movement_box: true,
      keep_hands_inside_movement_box: true,
      keep_depth_y_fixed: true,
      max_depth_y_drift_m: MAX_DEPTH_Y_DRIFT_M,
      allow_body_overflow_px: 120,
      allow_hand_overflow_px: 0,
    };
  }
  return {
    visible_frame_px: { ...VISIBLE_FRAME_PX },
    movement_box_px: { ...MOVEMENT_BOX_PX },
    visible_frame_world_m: { ...VISIBLE_FRAME_WORLD_M },
    movement_box_world_m: { ...MOVEMENT_BOX_WORLD_M },
    visibility_mode: "inside_visible_frame",
    keep_body_inside_visible: true,
    keep_hands_inside_visible: true,
    keep_depth_y_fixed: true,
    max_depth_y_drift_m: MAX_DEPTH_Y_DRIFT_M,
    allow_body_overflow_px: 120,
    allow_hand_overflow_px: 0,
  };
}

function normalizedMotionKey(hashSource) {
  return crypto.createHash("md5").update(hashSource).digest("hex").slice(0, 12);
}

function buildHashSource({
  promptVersion,
  motionType,
  durationBucketValue,
  energyBucketValue,
  gestureBucketValue,
  directionBucketValue,
  stepsBucketValue,
  bodyFacingBucketValue,
  gazeDirectionBucket,
  pointDirectionBucket,
  depthPolicy = DEPTH_POLICY,
}) {
  return [
    promptVersion,
    motionType,
    durationBucketValue,
    energyBucketValue,
    gestureBucketValue,
    directionBucketValue,
    stepsBucketValue,
    bodyFacingBucketValue,
    `gaze_${gazeDirectionBucket}`,
    `point_${pointDirectionBucket}`,
    depthPolicy,
  ].join("|");
}

function promptIntentFromBuckets(request) {
  const directionPhrase = {
    center: "toward the center",
    left: "toward the left side",
    right: "toward the right side",
    up: "upward",
    down: "downward",
    up_left: "toward the upper-left side",
    up_right: "toward the upper-right side",
    down_left: "toward the lower-left side",
    down_right: "toward the lower-right side",
    none: "",
    audience: "toward the audience",
    slide: "toward the slide",
  }[request.point_direction_bucket] || "";

  if (request.motion_type === "side_step_right") return `two small lateral steps to the right while facing the audience`;
  if (request.motion_type === "side_step_left") return `two small lateral steps to the left while facing the audience`;
  if (request.motion_type === "weight_shift_right") return `subtle weight shift toward the right while facing the audience`;
  if (request.motion_type === "weight_shift_left") return `subtle weight shift toward the left while facing the audience`;
  if (request.motion_type === "explain_point") return `small controlled pointing gesture ${directionPhrase}`.trim();
  if (request.motion_type === "gesture_emphasis") return "controlled emphatic teaching gesture";
  if (request.motion_type === "glance") return "brief calm glance toward slide content with hands relaxed low";
  if (request.motion_type === "explain_small") return "small open-palm explaining gesture";
  return "calm idle speaking with subtle hand movement";
}

function fallbackCanonicalPrompt(request) {
  const intent = promptIntentFromBuckets(request);
  if (request.motion_type === "side_step_right" || request.motion_type === "side_step_left") {
    return `A middle-aged male professional instructor takes ${request.steps_bucket || 2} small lateral steps ${request.direction_bucket === "left" ? "to the left" : "to the right"} while facing the audience. The motion is calm, realistic, and businesslike. The torso stays upright, pelvis stable, shoulders level, and arms relaxed low beside the body. The movement is a controlled side-step, not walking forward or backward. Avoid forward travel, backward travel, turning the back to the audience, dancing, runway walking, exaggerated hip sway, playful motion, jumping, bouncing, spinning, and unstable balance.`;
  }
  if (request.motion_type === "weight_shift_right" || request.motion_type === "weight_shift_left") {
    return `A middle-aged male professional instructor makes a subtle weight shift ${request.direction_bucket === "left" ? "to the left" : "to the right"} while facing the audience. Feet stay close to the floor, torso upright, pelvis stable, shoulders level, and arms relaxed low beside the body. The motion is calm, realistic, and businesslike with no forward or backward travel. Avoid dancing, runway walking, exaggerated hip sway, playful motion, jumping, bouncing, spinning, and unstable balance.`;
  }
  return `A middle-aged male professional instructor stands calmly and performs ${intent}. Feet remain planted, torso upright, pelvis stable, shoulders level, and hands stay controlled near the waist or lower chest. The motion is calm, businesslike, and suitable for a university lecture. Avoid dancing, jumping, bouncing, runway walk, exaggerated hip movement, unstable balance, playful movement, and wide arm swings.`;
}

function normalizeOllamaEndpoint(value) {
  return String(value || "http://10.0.0.16:11434").trim().replace(/\/+$/, "");
}

async function postJson(url, payload, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${text.slice(0, 400)}`);
    }
    try {
      return JSON.parse(text);
    } catch {
      return { response: text };
    }
  } finally {
    clearTimeout(timer);
  }
}

function cleanPromptText(text) {
  return String(text || "")
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```[a-z]*|```/gi, ""))
    .replace(/["“”]/g, "")
    .replace(/^["'\s]+|["'\s]+$/g, "")
    .split(/\n{2,}/)[0]
    .replace(/\s+/g, " ")
    .trim();
}

function ensureInstructorSubject(prompt) {
  const normalized = prompt
    .replace(/\bmiddle[- ]aged male professional instructor\s+(professional instructor|instructor|lecturer|teacher|presenter)\b/i, "middle-aged male professional instructor")
    .replace(/\bA middle[- ]aged male professional instructor\s+A middle[- ]aged male professional instructor\b/i, "A middle-aged male professional instructor");
  prompt = normalized;
  if (/(middle[- ]aged|mature|professional).{0,60}(male|man).{0,80}(instructor|lecturer|teacher|presenter)/i.test(prompt)) {
    return prompt;
  }
  if (/^(the\s+)?(instructor|lecturer|teacher|presenter)\b/i.test(prompt)) {
    return prompt.replace(/^(the\s+)?(instructor|lecturer|teacher|presenter)\b/i, "A middle-aged male professional instructor");
  }
  const lowered = prompt.charAt(0).toLowerCase() + prompt.slice(1);
  return `A middle-aged male professional instructor ${lowered}`;
}

function ensureAvoidSentence(prompt) {
  const positiveMotion = String(prompt).split(/\bavoid\b/i)[0].trim().replace(/[.]*$/, ".");
  return `${positiveMotion} Avoid dancing, jumping, bouncing, runway walk, exaggerated hip movement, unstable balance, playful movement, and wide arm swings.`;
}

function polishPromptGrammar(prompt) {
  return String(prompt)
    .replace(/\bstand calmly\b/gi, "stands calmly")
    .replace(/\bstands calmly,\s*explain\b/gi, "stands calmly and explains")
    .replace(/\bcalmly explain\b/gi, "calmly explains")
    .replace(/,\s*avoiding[^.]+/gi, "")
    .replace(/\bpoint upwards left\b/gi, "point toward the upper-left side")
    .replace(/\bprofessional instructor professional instructor\b/gi, "professional instructor")
    .replace(/\s+/g, " ")
    .trim();
}

function promptMatchesMotionType(prompt, request) {
  if (!request) return true;
  const positiveMotion = String(prompt).split(/\bavoid\b/i)[0] || "";
  const isSideStep = request.motion_type === "side_step_right" || request.motion_type === "side_step_left";
  const isWeightShift = request.motion_type === "weight_shift_right" || request.motion_type === "weight_shift_left";
  if (!isSideStep && !isWeightShift && /\b(walk|walking|gait|heel-to-toe|steps?|feet land flat|side-?step)\b/i.test(positiveMotion)) {
    return false;
  }
  if (isSideStep && !/\b(side-?step|lateral steps?|steps? (to|toward) the (left|right))\b/i.test(positiveMotion)) {
    return false;
  }
  const sideStepMotion = positiveMotion
    .replace(/\bnot walking forward or backward\b/gi, "")
    .replace(/\bno forward or backward travel\b/gi, "")
    .replace(/\bnot forward or backward\b/gi, "");
  if (isSideStep && /\b(forward|backward|toward the camera|away from the camera|walks forward|walks backward)\b/i.test(sideStepMotion)) return false;
  if (isWeightShift && /\b(walk|walking|forward|backward)\b/i.test(positiveMotion)) return false;
  if (request.motion_type !== "explain_point" && /\b(point|pointing)\b/i.test(positiveMotion)) {
    return false;
  }
  if (request.motion_type === "explain_point" && !/\b(point|pointing)\b/i.test(positiveMotion)) {
    return false;
  }
  return true;
}

function validateCanonicalPrompt(text, request = null) {
  let prompt = cleanPromptText(text);
  if (!prompt) return "";
  if (/pixel|coordinate|camera|slide_id|narration/i.test(prompt)) return "";
  prompt = ensureInstructorSubject(prompt);
  prompt = polishPromptGrammar(prompt);
  prompt = ensureAvoidSentence(prompt);
  prompt = polishPromptGrammar(prompt);
  if (!/middle[- ]aged male professional instructor/i.test(prompt)) return "";
  if (!/\bavoid\b/i.test(prompt)) return "";
  if (!promptMatchesMotionType(prompt, request)) return "";
  return prompt;
}

async function readPromptCache(cachePath, hashSource, request, options = {}) {
  try {
    const cached = JSON.parse(await readFile(cachePath, "utf8"));
    if (cached?.model === "deterministic_test_prompt" && !options.allowDeterministicPrompts) return null;
    if (cached?.hash_source === hashSource && cached?.canonical_prompt) {
      const canonicalPrompt = validateCanonicalPrompt(cached.canonical_prompt, request);
      if (canonicalPrompt) {
        return {
          ...cached,
          canonical_prompt: canonicalPrompt,
        };
      }
    }
  } catch {
    return null;
  }
  return null;
}

async function normalizePromptWithOllama(request, options) {
  const endpoint = normalizeOllamaEndpoint(options.promptEndpoint);
  const model = String(options.promptModel || "mistral-nemo:latest").trim();
  const timeoutMs = Number(options.promptTimeoutMs || 60000);
  const temperature = Number(options.promptTemperature ?? 0.15);
  const prompt = [
    "You are a motion prompt normalizer for Kimodo.",
    "Output only one final motion prompt, no explanation.",
    "Do not mention slide pixels, screen coordinates, camera, narration, or JSON.",
    "Always describe a middle-aged male professional instructor.",
    "Use stable pelvis, minimal hip sway, level shoulders, upright torso.",
    "Do not request forward or backward walking for slide-overlay videos.",
    "For side-step motions, describe lateral steps left or right while facing the audience and keeping depth fixed.",
    "For non-side-step motion, do not mention walking, gait, steps, heel-to-toe contact, or foot travel.",
    "Only mention pointing when motion_type is explain_point.",
    "Use a positive desired motion first, then one short Avoid sentence.",
    "Always include negative constraints: no dancing, no runway walk, no exaggerated hip movement, no playful movement, no jumping.",
    "",
    "Rewrite this draft into one concise Kimodo prompt:",
    fallbackCanonicalPrompt(request),
    "",
    "Normalized motion fields:",
    JSON.stringify({
      motion_type: request.motion_type,
      duration_bucket: request.duration_bucket,
      energy_bucket: request.energy_bucket,
      gesture_bucket: request.gesture_bucket,
      speed_bucket: request.speed_bucket,
      direction_bucket: request.direction_bucket,
      steps_bucket: request.steps_bucket,
      body_facing_bucket: request.body_facing_bucket,
      gaze_direction_bucket: request.gaze_direction_bucket,
      point_direction_bucket: request.point_direction_bucket,
      point_hand: request.point_hand,
      pointing: request.pointing,
      depth_policy: request.depth_policy,
      max_depth_y_drift_m: request.max_depth_y_drift_m,
      intent: promptIntentFromBuckets(request),
    }, null, 2),
  ].join("\n");

  const payload = await postJson(`${endpoint}/api/generate`, {
    model,
    prompt,
    stream: false,
    options: { temperature },
  }, timeoutMs);
  const normalized = validateCanonicalPrompt(payload?.response || payload?.message?.content || "", request);
  if (normalized) return normalized;
  const repaired = validateCanonicalPrompt(fallbackCanonicalPrompt(request), request);
  if (repaired) return repaired;
  throw new Error(`Ollama returned an invalid Kimodo prompt for ${request.motion_key}.`);
}

async function canonicalPromptForRequest(request, options) {
  const promptVersion = String(options.promptVersion || AI1_PROMPT_VERSION);
  const cacheDir = path.join(projectRoot, "generated", "cache", "slide_video_controls", "kimodo_prompts", promptVersion);
  const cachePath = path.join(cacheDir, `${request.motion_key}.json`);
  const cached = await readPromptCache(cachePath, request.hash_source, request, options);
  if (cached) return cached.canonical_prompt;

  let canonicalPrompt = "";
  if (options.allowDeterministicPrompts) {
    canonicalPrompt = fallbackCanonicalPrompt(request);
  } else {
    canonicalPrompt = await normalizePromptWithOllama(request, options);
  }

  await writeJson(cachePath, {
    schema_version: AI1_PROMPT_CACHE_SCHEMA_VERSION,
    prompt_version: promptVersion,
    motion_key: request.motion_key,
    hash_source: request.hash_source,
    model: options.allowDeterministicPrompts ? "deterministic_test_prompt" : String(options.promptModel || "mistral-nemo:latest"),
    endpoint: options.allowDeterministicPrompts ? "" : normalizeOllamaEndpoint(options.promptEndpoint),
    canonical_prompt: canonicalPrompt,
    updated_at: new Date().toISOString(),
  });
  return canonicalPrompt;
}

function buildSegmentControls({ cue, index, cueCount, promptVersion }) {
  const anchorBucket = anchorToBucket(cue.preferred_anchor || cue.screen_anchor);
  const basePoint = basePointForCue(cue, anchorBucket);
  const targetPoint = Array.isArray(cue.point_target_xy)
    ? cue.point_target_xy
    : Array.isArray(cue.attention_xy)
      ? cue.attention_xy
      : null;
  const pointing = shouldPoint(cue, index);
  const glance = shouldGlance(cue, index, pointing);
  const motionType = motionTypeForCue(cue, index, pointing, cueCount);
  const gazeDirectionBucket = glance && targetPoint ? targetDirectionBucket(basePoint, targetPoint) : "center";
  const pointDirectionBucket = pointing && targetPoint ? targetDirectionBucket(basePoint, targetPoint) : "none";
  const bodyFacingBucketValue = bodyFacingBucket(anchorBucket, targetPoint);
  const directionBucketValue = walkDirectionBucket(cue);
  const stepsBucketValue = stepsBucket(cue);
  const gestureBucketValue = gestureBucketForCue(cue, motionType, pointing);
  const durationBucketValue = durationBucket(cue.duration || (Number(cue.t1 || 0) - Number(cue.t0 || 0)));
  const energyBucketValue = energyBucket(cue.energy, cue.importance);
  const speedBucket = motionType.startsWith("side_step_") ? "slow" : "none";
  const pointHandValue = pointHand(anchorBucket, pointDirectionBucket, pointing);
  const hashSource = buildHashSource({
    promptVersion,
    motionType,
    durationBucketValue,
    energyBucketValue,
    gestureBucketValue,
    directionBucketValue,
    stepsBucketValue,
    bodyFacingBucketValue,
    gazeDirectionBucket,
    pointDirectionBucket,
    depthPolicy: DEPTH_POLICY,
  });
  const motionKey = normalizedMotionKey(hashSource);
  const requestId = `${cue.segment_id || cue.cue_id || `seg_${index + 1}`}__${motionKey}`;

  const request = {
    request_id: requestId,
    t0: round(cue.t0, 2),
    t1: round(cue.t1, 2),
    duration_sec: round(Number(cue.t1 || 0) - Number(cue.t0 || 0), 2),
    duration_bucket: durationBucketValue,
    motion_type: motionType,
    character: "middle_aged_male_professional_instructor",
    energy_bucket: energyBucketValue,
    gesture_bucket: gestureBucketValue,
    speed_bucket: speedBucket,
    direction_bucket: directionBucketValue,
    steps_bucket: stepsBucketValue,
    body_facing_bucket: bodyFacingBucketValue,
    gaze_direction_bucket: gazeDirectionBucket,
    point_direction_bucket: pointDirectionBucket,
    pointing,
    point_hand: pointHandValue,
    depth_policy: DEPTH_POLICY,
    max_depth_y_drift_m: MAX_DEPTH_Y_DRIFT_M,
    canonical_prompt: "",
    prompt_version: promptVersion,
    hash_source: hashSource,
    motion_key: motionKey,
  };

  const targetElementId = cue.target_element || null;
  const gazeTarget = glance && targetPoint ? [round(targetPoint[0], 2), round(targetPoint[1], 2)] : null;
  const pointTarget = pointing && targetPoint ? [round(targetPoint[0], 2), round(targetPoint[1], 2)] : null;
  const segment = {
    segment_id: cue.segment_id || cue.cue_id || `seg_${String(index + 1).padStart(2, "0")}`,
    cue_id: cue.cue_id || "",
    request_id: requestId,
    t0: request.t0,
    t1: request.t1,
    duration_sec: request.duration_sec,
    motion_key: motionKey,
    motion_type: motionType,
    avatar_base_screen_xy_px: basePoint,
    avatar_base_world_xyz_m: pixelToBaseWorld(basePoint),
    root_anchor_bucket: anchorBucket,
    avatar_height_fraction: CAMERA_REFERENCE.target_character_height_fraction,
    placement_reason: placementReason(anchorBucket, cue),
    screen_path: screenPathForCue(cue, anchorBucket, basePoint),
    body_control: {
      body_facing_bucket: bodyFacingBucketValue,
      body_yaw_deg: bodyYawForFacing(bodyFacingBucketValue),
    },
    gaze_control: {
      gaze_mode: glance ? "audience_then_slide" : "audience",
      gaze_target_element_id: glance ? targetElementId : null,
      gaze_target_xy_px: gazeTarget,
      gaze_target_world_xyz_m: gazeTarget ? pixelToPointWorld(gazeTarget, GAZE_TARGET_WORLD_Y_M) : null,
      gaze_direction_bucket: gazeDirectionBucket,
      head_yaw_bucket: headYawBucket(gazeDirectionBucket),
      head_pitch_bucket: headPitchBucket(gazeDirectionBucket),
    },
    point_control: {
      pointing,
      point_target_element_id: pointing ? targetElementId : null,
      point_target_xy_px: pointTarget,
      point_target_world_xyz_m: pointTarget ? pixelToPointWorld(pointTarget, POINT_TARGET_WORLD_Y_M) : null,
      point_direction_bucket: pointDirectionBucket,
      point_hand: pointHandValue,
      point_intensity_bucket: pointIntensity(pointing, gestureBucketValue),
    },
    screen_constraints: screenConstraints(cue),
    blend: {
      fade_in_sec: 0.15,
      fade_out_sec: 0.15,
    },
  };

  return { request, segment };
}

function placementReason(anchorBucket, cue) {
  if (anchorBucket === "bottom_right") {
    return "Selected right-side presenter placement from slide motion planning; content focus remains readable while the instructor can point or glance toward slide elements.";
  }
  if (anchorBucket === "bottom_left") {
    return "Selected left-side presenter placement from slide motion planning; content focus remains readable while the instructor can point or glance toward slide elements.";
  }
  return "Selected centered lower presenter placement from slide motion planning.";
}

function markdownReport({ job, motionRequests, avatarPlan, outputPaths }) {
  const pointCount = avatarPlan.segments.filter((segment) => segment.point_control.pointing).length;
  const glanceCount = avatarPlan.segments.filter((segment) => segment.gaze_control.gaze_mode !== "audience").length;
  const motionTypes = [...new Set(motionRequests.requests.map((request) => request.motion_type))].sort();
  return [
    "# AI-1 Slide Video Controls Report",
    "",
    `- Job: \`${job.job_id}\``,
    `- Slide: \`${job.selector.school}/${job.selector.course}/${job.selector.session}/${job.selector.topic}/${job.slide_id}\``,
    `- Motion requests: ${motionRequests.requests.length}`,
    `- Avatar plan segments: ${avatarPlan.segments.length}`,
    `- Motion types: ${motionTypes.map((item) => `\`${item}\``).join(", ")}`,
    `- Pointing segments: ${pointCount}`,
    `- Gaze/glance segments: ${glanceCount}`,
    `- Motion requests file: \`${relativeProjectPath(outputPaths.motionRequests)}\``,
    `- Avatar plan file: \`${relativeProjectPath(outputPaths.avatarPlan)}\``,
    "",
  ].join("\n");
}

export async function buildSlideVideoControlsForJob({ job, options = {} }) {
  const promptVersion = String(options.promptVersion || AI1_PROMPT_VERSION);
  const motionPath = absoluteProjectPath(job.motion_manifest_file);
  const topicDir = path.dirname(path.dirname(motionPath));
  const layoutPath = path.join(topicDir, "layout.manifest.json");
  const scriptPath = path.join(topicDir, "script.manifest.json");
  const alignmentPath = absoluteProjectPath(job.resolved_alignment_file);

  const required = [
    ["motion_manifest_file", motionPath],
    ["layout.manifest.json", layoutPath],
    ["script.manifest.json", scriptPath],
    ["resolved_alignment_file", alignmentPath],
  ];
  for (const [label, filePath] of required) {
    if (!await fileExists(filePath)) {
      throw new Error(`Missing required AI-1 input ${label}: ${filePath}`);
    }
  }

  const [motionManifest, layoutManifest, scriptManifest, alignmentManifest] = await Promise.all([
    readJson(motionPath),
    readJson(layoutPath),
    readJson(scriptPath),
    readJson(alignmentPath),
  ]);
  const slide = motionManifest.slide || {};
  const cues = asArray(slide.cues);
  if (!cues.length) {
    throw new Error(`Motion manifest has no cues for ${job.job_id}.`);
  }

  const built = cues.map((cue, index) => buildSegmentControls({ cue, index, cueCount: cues.length, promptVersion }));
  const requestByKey = new Map();
  for (const { request } of built) {
    if (!requestByKey.has(request.motion_key)) {
      requestByKey.set(request.motion_key, request);
    }
  }
  const promptByKey = new Map();
  for (const request of requestByKey.values()) {
    const canonicalPrompt = await canonicalPromptForRequest(request, options);
    promptByKey.set(request.motion_key, canonicalPrompt);
  }
  const requests = built.map(({ request }) => ({
    ...request,
    canonical_prompt: promptByKey.get(request.motion_key),
  }));

  const motionRequests = {
    schema_version: AI1_CONTROL_SCHEMA_VERSION,
    slide_id: job.slide_id,
    selector: job.selector,
    prompt_version: promptVersion,
    fps: Number(options.fps || 30),
    viewport: { ...VIEWPORT },
    camera_reference: JSON.parse(JSON.stringify(CAMERA_REFERENCE)),
    source_files: {
      slide_video_job: job.job_file || "",
      motion_manifest: relativeProjectPath(motionPath),
      layout_manifest: relativeProjectPath(layoutPath),
      script_manifest: relativeProjectPath(scriptPath),
      alignment_manifest: relativeProjectPath(alignmentPath),
    },
    requests,
  };

  const avatarPlan = {
    schema_version: AI1_CONTROL_SCHEMA_VERSION,
    slide_id: job.slide_id,
    selector: job.selector,
    fps: Number(options.fps || 30),
    viewport: { ...VIEWPORT },
    camera_reference: JSON.parse(JSON.stringify(CAMERA_REFERENCE)),
    render_policy: {
      output_mode: "transparent_webm",
      background: "transparent",
      render_avatar_only: true,
      render_slide_in_blender: false,
      camera_mode: "fixed_orthographic",
      avatar_height_fraction: CAMERA_REFERENCE.target_character_height_fraction,
      target_character_height_fraction: CAMERA_REFERENCE.target_character_height_fraction,
      default_anchor: anchorToBucket(slide.carry_pose_in?.screen_anchor || "right_bottom"),
      allow_body_overflow_px: 120,
      allow_hand_overflow_px: 0,
      clamp_mode: "hands_and_body",
      depth_policy: DEPTH_POLICY,
      max_depth_y_drift_m: MAX_DEPTH_Y_DRIFT_M,
      audio_separate: true,
      hy_motion_optional: true,
    },
    safe_areas: safeAreas(),
    source_summary: {
      job_id: job.job_id,
      duration_sec: Number(job.duration_sec || slide.duration || 0),
      timing_source: job.timing_source || slide.timing_source || "",
      layout_slide_type: asArray(layoutManifest.slides).find((item) => item.slide_id === job.slide_id)?.slide_type || "",
      script_segment_count: asArray(asArray(scriptManifest.slides).find((item) => item.slide_id === job.slide_id)?.segments).length,
      alignment_segment_count: asArray(asArray(alignmentManifest.slides).find((item) => item.slide_id === job.slide_id)?.segments).length,
    },
    segments: built.map(({ segment }) => ({
      ...segment,
      canonical_prompt_ref: promptByKey.get(segment.motion_key) ? `motion_requests:${segment.motion_key}` : "",
    })),
  };

  const outputPaths = controlsPathsForJob(job);
  return {
    motionRequests,
    avatarPlan,
    report: markdownReport({ job, motionRequests, avatarPlan, outputPaths }),
    outputPaths,
  };
}

export function validateSlideVideoControls({ motionRequests, avatarPlan }) {
  const errors = [];
  const requests = asArray(motionRequests?.requests);
  const segments = asArray(avatarPlan?.segments);
  const keys = new Set(requests.map((request) => request.motion_key));
  if (motionRequests?.schema_version !== AI1_CONTROL_SCHEMA_VERSION) errors.push("motion_requests schema_version must be 1.0.");
  if (avatarPlan?.schema_version !== AI1_CONTROL_SCHEMA_VERSION) errors.push("avatar_plan schema_version must be 1.0.");
  if (!requests.length) errors.push("motion_requests.requests must not be empty.");
  if (!segments.length) errors.push("avatar_plan.segments must not be empty.");

  for (const request of requests) {
    if (/^walk_(forward|backward|toward_camera|away_from_camera|in_place)$/i.test(request.motion_type) || request.motion_type === "walk_slow") {
      errors.push(`motion request ${request.request_id} uses disallowed depth-changing walk motion_type ${request.motion_type}.`);
    }
    if (request.depth_policy !== DEPTH_POLICY) {
      errors.push(`motion request ${request.request_id} must use depth_policy ${DEPTH_POLICY}.`);
    }
    for (const key of [
      "motion_type",
      "duration_bucket",
      "energy_bucket",
      "gesture_bucket",
      "direction_bucket",
      "steps_bucket",
      "canonical_prompt",
      "hash_source",
      "motion_key",
    ]) {
      if (request[key] == null || request[key] === "") errors.push(`motion request ${request.request_id} missing ${key}.`);
    }
  }

  for (const segment of segments) {
    if (!keys.has(segment.motion_key)) errors.push(`avatar segment ${segment.segment_id} has no matching motion request.`);
    for (const key of [
      "t0",
      "t1",
      "motion_key",
      "avatar_base_screen_xy_px",
      "avatar_base_world_xyz_m",
      "root_anchor_bucket",
      "avatar_height_fraction",
      "body_control",
      "gaze_control",
      "point_control",
      "screen_constraints",
    ]) {
      if (segment[key] == null || segment[key] === "") errors.push(`avatar segment ${segment.segment_id} missing ${key}.`);
    }
    if (segment.screen_constraints?.keep_depth_y_fixed !== true) {
      errors.push(`avatar segment ${segment.segment_id} must keep depth Y fixed.`);
    }
    if (segment.screen_constraints?.max_depth_y_drift_m > MAX_DEPTH_Y_DRIFT_M) {
      errors.push(`avatar segment ${segment.segment_id} exceeds max Y depth drift.`);
    }
    if (segment.screen_constraints?.allow_hand_overflow_px !== 0 && segment.screen_constraints?.visibility_mode !== "partial_offscreen_allowed") {
      errors.push(`avatar segment ${segment.segment_id} allows hand overflow in normal mode.`);
    }
  }

  const forbiddenPattern = /(shoulder|elbow|wrist|finger|hip|foot).*rotation|joint|curve/i;
  const serialized = JSON.stringify({ motionRequests, avatarPlan });
  if (forbiddenPattern.test(serialized)) errors.push("Control artifacts include forbidden exact joint/curve language.");
  for (const request of requests) {
    if (request.hash_source && /[.!?]|\s{2,}|welcome|project|robot|proposal|safety|course/i.test(request.hash_source.replace(AI1_PROMPT_VERSION, ""))) {
      errors.push(`hash_source appears to contain raw narration or slide text: ${request.hash_source}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function writeSlideVideoControls({ job, motionRequests, avatarPlan, report, outputPaths, overwrite = false }) {
  if (!overwrite) {
    for (const filePath of [outputPaths.motionRequests, outputPaths.avatarPlan]) {
      if (await fileExists(filePath)) {
        throw new Error(`Refusing to overwrite existing controls without --overwrite: ${relativeProjectPath(filePath)}`);
      }
    }
  }
  await writeJson(outputPaths.motionRequests, motionRequests);
  await writeJson(outputPaths.avatarPlan, avatarPlan);
  await mkdir(path.dirname(outputPaths.report), { recursive: true });
  await writeFile(outputPaths.report, report, "utf8");
}

export const __test = {
  buildHashSource,
  normalizedMotionKey,
  fallbackCanonicalPrompt,
  buildSegmentControls,
  screenConstraints,
};
