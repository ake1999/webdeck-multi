import crypto from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "../export_runtime.mjs";
import { SCRIPT_MANIFEST_SCHEMA_VERSION } from "./contracts.mjs";
import { SCRIPT_WRITER_PROMPT_VERSION } from "./llm_schema.mjs";
import {
  generateLocalScriptSegments,
  repairScriptContinuitySegments,
  validateScriptContinuitySegments,
} from "./script_providers/llm_local.mjs";

export const SCRIPT_PROVIDER_MODES = ["deterministic", "llm_local", "script_override", "auto"];
export const SCRIPT_PROVIDER_CACHE_SCHEMA_VERSION = "phase7-script-provider-cache-v2";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hashObject(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);
}

function normalizeBoolean(value, fallback = false) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["1", "true", "yes", "on"].includes(normalized)) return true;
    if (["0", "false", "no", "off"].includes(normalized)) return false;
  }
  return fallback;
}

function cacheContinuityContext(continuityContext) {
  if (!isObject(continuityContext)) return null;
  const { slide_position: _slidePosition, ...rest } = continuityContext;
  return rest;
}

export function defaultScriptProvider() {
  return process.env.CI ? "deterministic" : "auto";
}

export function normalizeScriptProviderMode(value, fallback = defaultScriptProvider()) {
  const normalized = String(value || fallback).trim().toLowerCase();
  return SCRIPT_PROVIDER_MODES.includes(normalized) ? normalized : fallback;
}

export function allowLlmLocal(mode) {
  return mode === "llm_local" || mode === "auto";
}

export function allowScriptOverrides(mode) {
  return mode !== "deterministic";
}

export function allowScriptFallback(value, fallback = true) {
  return normalizeBoolean(value, fallback);
}

export function resolveAllowScriptFallbackDefault({
  scriptProvider = defaultScriptProvider(),
  scriptModel = process.env.WEBDECK_SCRIPT_MODEL || "",
  explicitValue = process.env.WEBDECK_ALLOW_SCRIPT_FALLBACK,
} = {}) {
  if (explicitValue != null && explicitValue !== "") {
    return allowScriptFallback(explicitValue, true);
  }
  const provider = normalizeScriptProviderMode(scriptProvider);
  const hasModel = Boolean(String(scriptModel || "").trim());
  if (hasModel && (provider === "llm_local" || provider === "auto")) {
    return false;
  }
  return true;
}

function cacheDirForSelector(selector, provider) {
  return path.join(
    projectRoot,
    "generated",
    "cache",
    "script_provider",
    provider,
    selector.school,
    selector.course,
    selector.session,
    selector.topic,
  );
}

function cacheIdentity({
  descriptor,
  slideId,
  provider,
  model,
  promptVersion,
  authoredHash,
  layoutHash,
  topicPlanHash = "",
  continuityHash = "",
}) {
  return {
    schema_version: SCRIPT_PROVIDER_CACHE_SCHEMA_VERSION,
    contract_schema_version: SCRIPT_MANIFEST_SCHEMA_VERSION,
    selector: {
      school: descriptor.school,
      course: descriptor.course,
      session: descriptor.session,
      topic: descriptor.topic,
    },
    slide_id: slideId,
    provider,
    model: model || "",
    prompt_version: promptVersion || "",
    authored_hash: authoredHash,
    layout_hash: layoutHash,
    topic_plan_hash: topicPlanHash,
    continuity_hash: continuityHash,
  };
}

async function readJsonIfExists(filePath) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch {
    return null;
  }
}

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function buildScriptRelevantHash({ rawSlide, planSlide, authoring, slideDefaults, overrideSlide }) {
  return hashObject({
    raw_slide: rawSlide,
    plan_slide: planSlide,
    topic_defaults: authoring?.topicDefaults || {},
    voice_defaults: slideDefaults?.voice || {},
    avatar_defaults: authoring?.avatarProfile?.visual || {},
    override_slide: overrideSlide || null,
  });
}

export function buildLayoutRelevantHash(layoutSlide) {
  return hashObject({
    bbox: layoutSlide?.bbox || [],
    zones: layoutSlide?.zones || {},
    elements: asArray(layoutSlide?.elements).map((item) => ({
      id: item.id,
      type: item.type,
      bbox: item.bbox,
      anchor: item.anchor,
      parent_id: item.parent_id || "",
    })),
  });
}

export async function generateLlmLocalSegmentsWithCache({
  descriptor,
  runtime,
  slidesData,
  index,
  slide,
  rawSlide,
  planSlide,
  authoring,
  layoutSlide,
  targetQueue,
  slideDefaults,
  overrideSlide,
  topicScriptPlan = null,
  continuityContext = null,
  options = {},
}) {
  const provider = "llm_local";
  const promptVersion = String(options.scriptPromptVersion || SCRIPT_WRITER_PROMPT_VERSION).trim() || SCRIPT_WRITER_PROMPT_VERSION;
  const model = String(options.scriptModel || "").trim();
  const identity = cacheIdentity({
    descriptor,
    slideId: slide.slideId,
    provider,
    model,
    promptVersion,
    authoredHash: buildScriptRelevantHash({
      rawSlide,
      planSlide,
      authoring,
      slideDefaults,
      overrideSlide,
    }),
    layoutHash: buildLayoutRelevantHash(layoutSlide),
    topicPlanHash: hashObject(topicScriptPlan || null),
    continuityHash: hashObject(cacheContinuityContext(continuityContext)),
  });
  const cacheKey = hashObject(identity);
  const cacheDir = cacheDirForSelector(identity.selector, provider);
  const cachePath = path.join(cacheDir, `${slide.slideId}__${cacheKey}.json`);
  const cached = await readJsonIfExists(cachePath);

  if (
    isObject(cached)
    && cached.cache_key === cacheKey
    && isObject(cached.result)
    && Array.isArray(cached.result.segments)
  ) {
    const validationContext = {
      slide: {
        position: continuityContext?.slide_position || "",
        slide_type: slide.type,
        raw: rawSlide || {},
      },
      layout: {
        preferred_targets: targetQueue,
      },
    };
    const repaired = repairScriptContinuitySegments(
      cached.result.segments,
      validationContext,
      promptVersion,
    );
    const continuityErrors = validateScriptContinuitySegments(
      repaired.segments,
      validationContext,
      promptVersion,
    );
    if (continuityErrors.length) {
      // Treat older or weak cache entries as stale under the current continuity rules.
    } else {
      return {
        ...cached.result,
        segments: repaired.segments,
        generation_warnings: [
          ...asArray(cached.result.generation_warnings),
          ...repaired.warnings,
        ],
        cache_used: true,
        cache_key: cacheKey,
        cache_path: cachePath,
      };
    }
  }

  const result = await generateLocalScriptSegments({
    descriptor,
    runtime,
    slidesData,
    index,
    slide,
    rawSlide,
    planSlide,
    authoring,
    layoutSlide,
    targetQueue,
    slideDefaults,
    topicScriptPlan,
    continuityContext,
    options: {
      ...options,
      scriptPromptVersion: promptVersion,
    },
  });

  await writeJson(cachePath, {
    schema_version: SCRIPT_PROVIDER_CACHE_SCHEMA_VERSION,
    cache_key: cacheKey,
    identity,
    result,
  });

  return {
    ...result,
    cache_used: false,
    cache_key: cacheKey,
    cache_path: cachePath,
  };
}
