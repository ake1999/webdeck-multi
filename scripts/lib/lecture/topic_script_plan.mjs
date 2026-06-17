import crypto from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { projectRoot } from "../export_runtime.mjs";
import {
  normalizeLlmBaseUrl,
  normalizeLlmEndpointKind,
  plainTextForSpeech,
  plainTextSummary,
} from "./utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const promptsDir = path.resolve(__dirname, "prompts");

export const TOPIC_SCRIPT_PLAN_PROMPT_VERSION = "script_topic_plan_v2";
export const TOPIC_SCRIPT_PLAN_CACHE_SCHEMA_VERSION = "phase7-topic-script-plan-cache-v1";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hashObject(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);
}

function normalizeBoolean(value, fallback = true) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["1", "true", "yes", "on"].includes(normalized)) return true;
    if (["0", "false", "no", "off"].includes(normalized)) return false;
  }
  return fallback;
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

async function loadPromptBundle(promptVersion = TOPIC_SCRIPT_PLAN_PROMPT_VERSION) {
  const version = String(promptVersion || TOPIC_SCRIPT_PLAN_PROMPT_VERSION).trim() || TOPIC_SCRIPT_PLAN_PROMPT_VERSION;
  const promptPath = path.join(promptsDir, `${version}.md`);
  const examplePath = path.join(promptsDir, `${version}.example.json`);
  const [promptText, exampleText] = await Promise.all([
    readFile(promptPath, "utf8"),
    readFile(examplePath, "utf8"),
  ]);
  return {
    version,
    promptText: promptText.trim(),
    exampleText: exampleText.trim(),
  };
}

function blockVisibleText(block) {
  if (!isObject(block)) return [];
  const values = [
    block.title,
    block.text,
    block.content,
    block.formula,
    block.prompt,
    ...asArray(block.items).map((item) => (typeof item === "string" ? item : item?.text || item?.say || "")),
    ...asArray(block.steps).map((step) => (typeof step === "string" ? step : step?.text || step?.say || "")),
    ...asArray(block.pairs).map((pair) => `${pair?.label || ""} ${pair?.text || ""}`),
    block.reveal?.text,
    ...asArray(block.headers),
    ...asArray(block.rows).map((row) => Array.isArray(row) ? row.join(" ") : row),
  ];
  return values.map(plainTextForSpeech).filter(Boolean);
}

function mediaVisibleText(media) {
  if (!isObject(media)) return [];
  return [
    media.caption,
    media.title,
    media.widget,
    media.sourceSpec,
    media.alt,
    media.source,
  ].map(plainTextForSpeech).filter(Boolean);
}

function columnVisibleText(column) {
  if (!isObject(column)) return [];
  return [
    column.lead,
    ...asArray(column.bullets).map((item) => (typeof item === "string" ? item : item?.text || item?.say || "")),
    ...asArray(column.paragraphs).map((item) => (typeof item === "string" ? item : item?.text || item?.say || "")),
    ...asArray(column.blocks).flatMap(blockVisibleText),
    ...mediaVisibleText(column.media),
  ].map(plainTextForSpeech).filter(Boolean);
}

function compactRawSlide(rawSlide) {
  const visibleText = [
    rawSlide?.title,
    rawSlide?.subtitle,
    rawSlide?.lead,
    ...asArray(rawSlide?.bullets).map((item) => (typeof item === "string" ? item : item?.text || item?.say || "")),
    ...asArray(rawSlide?.paragraphs).map((item) => (typeof item === "string" ? item : item?.text || item?.say || "")),
    ...asArray(rawSlide?.blocks).flatMap(blockVisibleText),
    ...mediaVisibleText(rawSlide?.media),
    ...columnVisibleText(rawSlide?.left),
    ...columnVisibleText(rawSlide?.right),
    rawSlide?.question,
    rawSlide?.explain,
  ].map(plainTextForSpeech).filter(Boolean);

  return {
    title: plainTextSummary(rawSlide?.title || rawSlide?.question || ""),
    subtitle: plainTextSummary(rawSlide?.subtitle || ""),
    lead: plainTextSummary(rawSlide?.lead || ""),
    type: rawSlide?.type || "",
    visible_text: visibleText.slice(0, 10),
  };
}

function compactLayoutSlide(layoutSlide) {
  return {
    slide_id: layoutSlide?.slide_id || "",
    bbox: layoutSlide?.bbox || [],
    elements: asArray(layoutSlide?.elements).map((item) => ({
      id: item.id,
      type: item.type,
      bbox: item.bbox,
      anchor: item.anchor,
      parent_id: item.parent_id || "",
    })),
  };
}

export function buildTopicPlanContext({
  descriptor,
  runtime,
  slidesData,
  authoring = null,
  layoutManifest = null,
}) {
  const layoutById = new Map(asArray(layoutManifest?.slides).map((item) => [item.slide_id, item]));
  const slides = asArray(runtime?.slides).map((slide, index) => {
    const rawSlide = slidesData[index] || {};
    const planSlide = authoring?.slidePlansById?.[slide.slideId] || null;
    return {
      index,
      position: index === 0 ? "first" : index === asArray(runtime?.slides).length - 1 ? "final" : "middle",
      slide_id: slide.slideId,
      slide_type: slide.type,
      raw: compactRawSlide(rawSlide),
      slide_plan: {
        slide_role: planSlide?.slide_role || "",
        importance: planSlide?.importance || "",
        teacher_strategy: planSlide?.teacher_strategy || "",
        explanation_style: planSlide?.explanation_style || "",
        delivery_goal: planSlide?.delivery_goal || "",
        transition_from_previous: planSlide?.transition_from_previous || "",
        transition_to_next: planSlide?.transition_to_next || "",
        must_cover: asArray(planSlide?.must_cover),
        must_say: asArray(planSlide?.must_say),
        likely_student_confusion: asArray(planSlide?.likely_student_confusion),
      },
      layout: compactLayoutSlide(layoutById.get(slide.slideId)),
    };
  });

  return {
    topic: {
      topic_id: runtime?.topicId || descriptor.topic,
      selector: {
        school: descriptor.school,
        course: descriptor.course,
        session: descriptor.session,
        topic: descriptor.topic,
      },
      title: runtime?.topicTitle || descriptor.topic,
    },
    topic_pedagogy: {
      teaching_arc: authoring?.topicPedagogy?.teaching_arc || {},
      audience_level: authoring?.topicPedagogy?.audience_level || "",
      topic_goal: authoring?.topicPedagogy?.topic_goal || "",
      topic_takeaways: asArray(authoring?.topicPedagogy?.topic_takeaways),
      style_notes: asArray(authoring?.topicPedagogy?.style_notes),
      transition_style: authoring?.topicPedagogy?.transition_style || "",
    },
    slides,
  };
}

function buildTopicPlanJsonSchema(slideIds) {
  return {
    type: "object",
    additionalProperties: false,
    required: ["opening_intent", "closing_intent", "lesson_arc", "slides"],
    properties: {
      opening_intent: { type: "string", minLength: 1 },
      closing_intent: { type: "string", minLength: 1 },
      lesson_arc: {
        type: "array",
        minItems: 1,
        maxItems: 10,
        items: { type: "string" },
      },
      slides: {
        type: "array",
        minItems: slideIds.length,
        maxItems: slideIds.length,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "slide_id",
            "speaking_goal",
            "bridge_in",
            "bridge_out",
            "key_terms_introduced",
            "likely_callbacks",
            "student_memory",
          ],
          properties: {
            slide_id: { type: "string", enum: slideIds },
            speaking_goal: { type: "string", minLength: 1 },
            bridge_in: { type: "string", minLength: 1 },
            bridge_out: { type: "string", minLength: 1 },
            key_terms_introduced: {
              type: "array",
              items: { type: "string" },
            },
            likely_callbacks: {
              type: "array",
              items: { type: "string" },
            },
            student_memory: { type: "string", minLength: 1 },
          },
        },
      },
    },
  };
}

function buildTopicOverviewJsonSchema() {
  return {
    type: "object",
    additionalProperties: false,
    required: ["opening_intent", "closing_intent", "lesson_arc"],
    properties: {
      opening_intent: { type: "string", minLength: 1 },
      closing_intent: { type: "string", minLength: 1 },
      lesson_arc: {
        type: "array",
        minItems: 1,
        maxItems: 10,
        items: { type: "string" },
      },
    },
  };
}

function buildSingleSlidePlanJsonSchema() {
  return {
    type: "object",
    additionalProperties: false,
    required: [
      "speaking_goal",
      "bridge_in",
      "bridge_out",
      "key_terms_introduced",
      "likely_callbacks",
      "student_memory",
    ],
    properties: {
      speaking_goal: { type: "string", minLength: 1 },
      bridge_in: { type: "string", minLength: 1 },
      bridge_out: { type: "string", minLength: 1 },
      key_terms_introduced: {
        type: "array",
        items: { type: "string" },
      },
      likely_callbacks: {
        type: "array",
        items: { type: "string" },
      },
      student_memory: { type: "string", minLength: 1 },
    },
  };
}

function cleanString(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizeStringArray(values, limit = 8) {
  return asArray(values).map(cleanString).filter(Boolean).slice(0, limit);
}

function deterministicSlidePlan(contextSlide, index, total) {
  const title = contextSlide.raw.title || contextSlide.slide_id;
  const role = contextSlide.slide_plan.slide_role || contextSlide.slide_type || "lesson";
  const mustCover = asArray(contextSlide.slide_plan.must_cover).slice(0, 3);
  const goal = contextSlide.slide_plan.delivery_goal
    || contextSlide.slide_plan.explanation_style
    || `Explain ${title} in the context of the lesson.`;
  return {
    slide_id: contextSlide.slide_id,
    speaking_goal: cleanString(goal),
    bridge_in: index === 0
      ? `Open the topic by framing why ${title} matters.`
      : cleanString(contextSlide.slide_plan.transition_from_previous || `Connect the previous idea to ${title}.`),
    bridge_out: index === total - 1
      ? `Close by summarizing what students should remember from ${title}.`
      : cleanString(contextSlide.slide_plan.transition_to_next || `Use ${title} to set up the next slide.`),
    key_terms_introduced: normalizeStringArray([...mustCover, title], 6),
    likely_callbacks: normalizeStringArray([role, title], 4),
    student_memory: cleanString(`Students should remember how ${title} supports the topic goal.`),
  };
}

export function deterministicTopicScriptPlan(context) {
  const slides = asArray(context?.slides);
  const firstTitle = slides[0]?.raw?.title || slides[0]?.slide_id || "the topic";
  const lastTitle = slides[slides.length - 1]?.raw?.title || slides[slides.length - 1]?.slide_id || "the final slide";
  const takeaways = normalizeStringArray(context?.topic_pedagogy?.topic_takeaways, 6);
  return {
    schema_version: "phase7-topic-script-plan-v1",
    prompt_version: "deterministic_topic_plan",
    model_used: "deterministic_topic_plan",
    opening_intent: cleanString(context?.topic_pedagogy?.topic_goal || `Open by explaining why ${firstTitle} matters.`),
    closing_intent: cleanString(`Close by connecting ${lastTitle} back to the topic goal.`),
    lesson_arc: takeaways.length ? takeaways : [
      `Start with ${firstTitle}.`,
      "Build the required vocabulary and examples.",
      `End with ${lastTitle}.`,
    ],
    slides: slides.map((slide, index) => deterministicSlidePlan(slide, index, slides.length)),
    generation_warnings: ["Used deterministic topic plan fallback."],
  };
}

export function validateTopicScriptPlan(payload, expectedSlideIds) {
  const errors = [];
  if (!isObject(payload)) {
    return { valid: false, errors: ["Topic script plan must be an object."], normalized: null };
  }
  for (const key of ["opening_intent", "closing_intent"]) {
    if (!cleanString(payload[key])) errors.push(`${key} must be a non-empty string.`);
  }
  if (!Array.isArray(payload.lesson_arc) || !payload.lesson_arc.length) {
    errors.push("lesson_arc must be a non-empty array.");
  }
  if (!Array.isArray(payload.slides)) {
    errors.push("slides must be an array.");
  }

  const byId = new Map();
  asArray(payload.slides).forEach((slide, index) => {
    if (!isObject(slide)) {
      errors.push(`slides[${index}] must be an object.`);
      return;
    }
    const slideId = cleanString(slide.slide_id);
    if (!slideId) errors.push(`slides[${index}].slide_id must be non-empty.`);
    if (byId.has(slideId)) errors.push(`Duplicate topic plan slide_id ${slideId}.`);
    byId.set(slideId, slide);
    for (const key of ["speaking_goal", "bridge_in", "bridge_out", "student_memory"]) {
      if (!cleanString(slide[key])) errors.push(`${slideId || `slides[${index}]`}.${key} must be non-empty.`);
    }
    for (const key of ["key_terms_introduced", "likely_callbacks"]) {
      if (slide[key] != null && !Array.isArray(slide[key])) errors.push(`${slideId || `slides[${index}]`}.${key} must be an array.`);
    }
  });

  for (const slideId of expectedSlideIds) {
    if (!byId.has(slideId)) errors.push(`Missing topic plan entry for slide ${slideId}.`);
  }

  if (errors.length) return { valid: false, errors, normalized: null };

  return {
    valid: true,
    errors: [],
    normalized: {
      schema_version: "phase7-topic-script-plan-v1",
      opening_intent: cleanString(payload.opening_intent),
      closing_intent: cleanString(payload.closing_intent),
      lesson_arc: normalizeStringArray(payload.lesson_arc, 10),
      slides: expectedSlideIds.map((slideId) => {
        const slide = byId.get(slideId);
        return {
          slide_id: slideId,
          speaking_goal: cleanString(slide.speaking_goal),
          bridge_in: cleanString(slide.bridge_in),
          bridge_out: cleanString(slide.bridge_out),
          key_terms_introduced: normalizeStringArray(slide.key_terms_introduced, 8),
          likely_callbacks: normalizeStringArray(slide.likely_callbacks, 8),
          student_memory: cleanString(slide.student_memory),
        };
      }),
      generation_warnings: normalizeStringArray(payload.generation_warnings, 8),
    },
  };
}

export function normalizeTopicScriptPlanPayload(payload, context, { promptVersion = "", model = "", provider = "" } = {}) {
  const expectedSlideIds = asArray(context?.slides).map((slide) => slide.slide_id);
  const deterministic = deterministicTopicScriptPlan(context);
  const warnings = [];
  const baseById = new Map(deterministic.slides.map((slide) => [slide.slide_id, slide]));
  const seen = new Set();

  if (!isObject(payload)) {
    warnings.push("LLM topic plan was not an object; used deterministic scaffold.");
  }

  asArray(payload?.slides).forEach((slide, index) => {
    if (!isObject(slide)) {
      warnings.push(`Ignored non-object slide plan at index ${index}.`);
      return;
    }
    const slideId = cleanString(slide.slide_id);
    if (!expectedSlideIds.includes(slideId)) {
      warnings.push(`Ignored topic plan entry with unknown slide_id ${slideId || "(missing)"}.`);
      return;
    }
    if (seen.has(slideId)) {
      warnings.push(`Ignored duplicate topic plan entry for ${slideId}.`);
      return;
    }
    seen.add(slideId);
    const fallback = baseById.get(slideId);
    baseById.set(slideId, {
      slide_id: slideId,
      speaking_goal: cleanString(slide.speaking_goal) || fallback.speaking_goal,
      bridge_in: cleanString(slide.bridge_in) || fallback.bridge_in,
      bridge_out: cleanString(slide.bridge_out) || fallback.bridge_out,
      key_terms_introduced: normalizeStringArray(slide.key_terms_introduced, 8).length
        ? normalizeStringArray(slide.key_terms_introduced, 8)
        : fallback.key_terms_introduced,
      likely_callbacks: normalizeStringArray(slide.likely_callbacks, 8).length
        ? normalizeStringArray(slide.likely_callbacks, 8)
        : fallback.likely_callbacks,
      student_memory: cleanString(slide.student_memory) || fallback.student_memory,
    });
  });

  const missing = expectedSlideIds.filter((slideId) => !seen.has(slideId));
  if (missing.length) {
    warnings.push(`Filled ${missing.length} missing topic plan slide entries from deterministic scaffold.`);
  }

  return {
    schema_version: "phase7-topic-script-plan-v1",
    opening_intent: cleanString(payload?.opening_intent) || deterministic.opening_intent,
    closing_intent: cleanString(payload?.closing_intent) || deterministic.closing_intent,
    lesson_arc: normalizeStringArray(payload?.lesson_arc, 10).length
      ? normalizeStringArray(payload.lesson_arc, 10)
      : deterministic.lesson_arc,
    slides: expectedSlideIds.map((slideId) => baseById.get(slideId)),
    generation_warnings: normalizeStringArray([
      ...asArray(payload?.generation_warnings),
      ...warnings,
    ], 20),
    ...(promptVersion ? { prompt_version: promptVersion } : {}),
    ...(model ? { model_used: model } : {}),
    ...(provider ? { provider_used: provider } : {}),
  };
}

function extractContentString(payload) {
  if (typeof payload === "string") return payload;
  if (Array.isArray(payload)) {
    return payload.map((item) => (typeof item === "string" ? item : item?.text || "")).join("");
  }
  return "";
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function maybeJsonFragment(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return null;
  const direct = safeJsonParse(trimmed);
  if (direct) return direct;
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) return safeJsonParse(trimmed.slice(firstBrace, lastBrace + 1));
  return null;
}

function severeTopicPlanRepairWarnings(warnings) {
  return normalizeStringArray(warnings, 50).filter((warning) => (
    /not an object/i.test(warning)
    || /unknown slide_id/i.test(warning)
    || /duplicate topic plan entry/i.test(warning)
    || /missing topic plan slide entries/i.test(warning)
    || /deterministic scaffold/i.test(warning)
  ));
}

function semanticTopicPlanWarnings(plan) {
  const warnings = [];
  const opening = cleanString(plan?.opening_intent);
  const closing = cleanString(plan?.closing_intent);
  const badPresentationPhrases = /create (a )?presentation|creating (a )?presentation|presentation creation|given slides data|generate slides/i;
  if (badPresentationPhrases.test(opening)) {
    warnings.push("opening_intent describes presentation creation instead of teaching students.");
  }
  if (badPresentationPhrases.test(closing)) {
    warnings.push("closing_intent describes presentation creation instead of a student takeaway.");
  }
  return warnings;
}

async function readApiKey(options = {}) {
  const direct = String(options.scriptApiKey || process.env.WEBDECK_SCRIPT_API_KEY || "").trim();
  if (direct) return direct;
  const keyFile = String(options.scriptApiKeyFile || process.env.WEBDECK_SCRIPT_API_KEY_FILE || "").trim();
  if (!keyFile) return "";
  return (await readFile(keyFile, "utf8")).trim();
}

function authHeaders(apiKey) {
  return apiKey ? { authorization: `Bearer ${apiKey}` } : {};
}

async function postJson(url, payload, timeoutMs, headers = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const text = await response.text();
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${text.slice(0, 400)}`);
    return safeJsonParse(text) ?? { raw_text: text };
  } finally {
    clearTimeout(timer);
  }
}

async function callOllamaJson({ endpoint, model, temperature, systemPrompt, userPrompt, schema, timeoutMs }) {
  const response = await postJson(endpoint.endsWith("/api/chat") ? endpoint : `${endpoint}/api/chat`, {
    model,
    stream: false,
    format: schema,
    options: { temperature },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  }, timeoutMs);
  const content = extractContentString(response?.message?.content || response?.response || "");
  return maybeJsonFragment(content);
}

async function callOpenAiCompatibleJson({ endpoint, model, temperature, systemPrompt, userPrompt, timeoutMs, apiKey }) {
  const url = endpoint.endsWith("/chat/completions")
    ? endpoint
    : endpoint.includes("/v1")
      ? `${endpoint}/chat/completions`
      : `${endpoint}/v1/chat/completions`;
  const response = await postJson(url, {
    model,
    temperature,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  }, timeoutMs, authHeaders(apiKey));
  const content = extractContentString(response?.choices?.[0]?.message?.content || response?.output_text || "");
  return maybeJsonFragment(content);
}

async function callJsonByEndpoint({ endpointKind, endpoint, model, temperature, systemPrompt, userPrompt, schema, timeoutMs, apiKey }) {
  return endpointKind === "ollama"
    ? callOllamaJson({ endpoint, model, temperature, systemPrompt, userPrompt, schema, timeoutMs })
    : callOpenAiCompatibleJson({ endpoint, model, temperature, systemPrompt, userPrompt, timeoutMs, apiKey });
}

async function callOllama({ endpoint, model, temperature, promptBundle, context, timeoutMs, slideIds }) {
  const response = await postJson(endpoint.endsWith("/api/chat") ? endpoint : `${endpoint}/api/chat`, {
    model,
    stream: false,
    format: buildTopicPlanJsonSchema(slideIds),
    options: { temperature },
    messages: [
      { role: "system", content: promptBundle.promptText },
      {
        role: "user",
        content: [
          promptBundle.promptText,
          "",
          "Example JSON:",
          promptBundle.exampleText,
          "",
          "Required slide_id order:",
          JSON.stringify(slideIds),
          "",
          "The slides array must contain exactly these slide_id values once each, in this exact order.",
          "",
          "Topic context JSON:",
          JSON.stringify(context, null, 2),
        ].join("\n"),
      },
    ],
  }, timeoutMs);
  return extractContentString(response?.message?.content || response?.response || "");
}

async function callOpenAiCompatible({ endpoint, model, temperature, promptBundle, context, timeoutMs, apiKey }) {
  const url = endpoint.endsWith("/chat/completions")
    ? endpoint
    : endpoint.includes("/v1")
      ? `${endpoint}/chat/completions`
      : `${endpoint}/v1/chat/completions`;
  const response = await postJson(url, {
    model,
    temperature,
    messages: [
      { role: "system", content: promptBundle.promptText },
      {
        role: "user",
        content: [
          promptBundle.promptText,
          "",
          "Example JSON:",
          promptBundle.exampleText,
          "",
          "Required slide_id order:",
          JSON.stringify(asArray(context?.slides).map((slide) => slide.slide_id)),
          "",
          "The slides array must contain exactly these slide_id values once each, in this exact order.",
          "",
          "Topic context JSON:",
          JSON.stringify(context, null, 2),
        ].join("\n"),
      },
    ],
  }, timeoutMs, authHeaders(apiKey));
  return extractContentString(response?.choices?.[0]?.message?.content || response?.output_text || "");
}

function compactSlidesForOverview(context) {
  return asArray(context?.slides).map((slide) => ({
    index: slide.index,
    position: slide.position,
    slide_id: slide.slide_id,
    slide_type: slide.slide_type,
    title: slide.raw?.title || slide.slide_id,
    lead: slide.raw?.lead || "",
    visible_text: asArray(slide.raw?.visible_text).slice(0, 5),
    slide_role: slide.slide_plan?.slide_role || "",
    delivery_goal: slide.slide_plan?.delivery_goal || "",
  }));
}

function compactSlideForPlanning(slide) {
  return {
    index: slide.index,
    position: slide.position,
    slide_id: slide.slide_id,
    slide_type: slide.slide_type,
    raw: slide.raw,
    slide_plan: slide.slide_plan,
    layout: {
      bbox: slide.layout?.bbox || [],
      elements: asArray(slide.layout?.elements).slice(0, 18),
    },
  };
}

function normalizeTopicOverviewPayload(payload, context, { promptVersion = "", model = "", provider = "" } = {}) {
  const deterministic = deterministicTopicScriptPlan(context);
  return {
    schema_version: "phase7-topic-script-plan-v1",
    opening_intent: cleanString(payload?.opening_intent) || deterministic.opening_intent,
    closing_intent: cleanString(payload?.closing_intent) || deterministic.closing_intent,
    lesson_arc: normalizeStringArray(payload?.lesson_arc, 10).length
      ? normalizeStringArray(payload.lesson_arc, 10)
      : deterministic.lesson_arc,
    ...(promptVersion ? { prompt_version: promptVersion } : {}),
    ...(model ? { model_used: model } : {}),
    ...(provider ? { provider_used: provider } : {}),
  };
}

function normalizeSingleSlidePlanPayload(payload, contextSlide) {
  return {
    slide_id: contextSlide.slide_id,
    speaking_goal: cleanString(payload?.speaking_goal),
    bridge_in: cleanString(payload?.bridge_in),
    bridge_out: cleanString(payload?.bridge_out),
    key_terms_introduced: normalizeStringArray(payload?.key_terms_introduced, 8),
    likely_callbacks: normalizeStringArray(payload?.likely_callbacks, 8),
    student_memory: cleanString(payload?.student_memory),
  };
}

function validateSingleSlidePlanPayload(plan) {
  const errors = [];
  for (const key of ["speaking_goal", "bridge_in", "bridge_out", "student_memory"]) {
    if (!cleanString(plan[key])) errors.push(`${key} must be a non-empty string`);
  }
  return errors;
}

async function buildPerSlideTopicPlanWithLlm({
  context,
  promptBundle,
  endpointKind,
  endpoint,
  model,
  temperature,
  timeoutMs,
  maxRetries,
  reason,
  apiKey,
}) {
  console.error(`Topic plan one-shot response needed repair; using per-slide LLM planner. Reason: ${reason}`);
  const systemPrompt = [
    "You are planning spoken instruction for a technical course.",
    "Return JSON only.",
    "The deck already exists. Do not discuss creating slides or creating a presentation.",
    "Write like a professor planning what students should understand.",
  ].join(" ");

  const overviewPayload = await callJsonByEndpoint({
    endpointKind,
    endpoint,
    model,
    temperature,
    schema: buildTopicOverviewJsonSchema(),
    timeoutMs,
    apiKey,
    systemPrompt,
    userPrompt: [
      "Create only the topic-level speaking overview for this class topic.",
      "Do not include per-slide plans in this response.",
      "opening_intent should be how the professor opens the topic for students.",
      "closing_intent should be the takeaway, reminder, or handoff at the end.",
      "",
      "Topic context JSON:",
      JSON.stringify({
        topic: context.topic,
        topic_pedagogy: context.topic_pedagogy,
        slides: compactSlidesForOverview(context),
      }, null, 2),
    ].join("\n"),
  });
  if (!isObject(overviewPayload)) {
    throw new Error("Per-slide planner could not get a valid topic overview JSON response.");
  }
  const overview = normalizeTopicOverviewPayload(overviewPayload, context, {
    promptVersion: promptBundle.version,
    model,
    provider: "llm_local_topic_plan_per_slide",
  });
  const overviewWarnings = semanticTopicPlanWarnings(overview);
  if (overviewWarnings.length) {
    throw new Error(`Per-slide planner produced invalid topic overview: ${overviewWarnings.join(" ")}`);
  }

  const slides = [];
  const priorMemory = [];
  const allSlides = asArray(context?.slides);
  for (let index = 0; index < allSlides.length; index += 1) {
    const currentSlide = allSlides[index];
    console.error(`Planning slide ${index + 1}/${allSlides.length}: ${currentSlide.slide_id}`);
    const previousSlide = allSlides[index - 1] || null;
    const nextSlide = allSlides[index + 1] || null;
    let accepted = null;
    let lastErrors = [];

    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
      const payload = await callJsonByEndpoint({
        endpointKind,
        endpoint,
        model,
        temperature,
        schema: buildSingleSlidePlanJsonSchema(),
        timeoutMs,
        apiKey,
        systemPrompt,
        userPrompt: [
          "Create the speaking plan for exactly one slide.",
          "Do not output slide_id; the caller already owns slide order.",
          "Do not copy the same text into multiple fields.",
          "Do not describe creating a presentation.",
          "Use bridge_in and bridge_out as intent, not final narration.",
          "",
          "Topic overview JSON:",
          JSON.stringify({
            opening_intent: overview.opening_intent,
            closing_intent: overview.closing_intent,
            lesson_arc: overview.lesson_arc,
          }, null, 2),
          "",
          "Planning context JSON:",
          JSON.stringify({
            previous_slide: previousSlide ? compactSlideForPlanning(previousSlide) : null,
            current_slide: compactSlideForPlanning(currentSlide),
            next_slide: nextSlide ? compactSlideForPlanning(nextSlide) : null,
            prior_student_memory: priorMemory.slice(-6),
          }, null, 2),
          lastErrors.length ? `\nPrevious attempt errors: ${lastErrors.join("; ")}` : "",
        ].join("\n"),
      });

      if (!isObject(payload)) {
        lastErrors = ["Response was not a JSON object"];
        continue;
      }

      const normalized = normalizeSingleSlidePlanPayload(payload, currentSlide);
      lastErrors = validateSingleSlidePlanPayload(normalized);
      if (!lastErrors.length) {
        accepted = normalized;
        break;
      }
    }

    if (!accepted) {
      throw new Error(`Per-slide planner failed for ${currentSlide.slide_id}: ${lastErrors.join("; ")}`);
    }

    slides.push(accepted);
    priorMemory.push({
      slide_id: accepted.slide_id,
      student_memory: accepted.student_memory,
    });
  }

  return {
    ...overview,
    slides,
    generation_warnings: normalizeStringArray([
      `Recovered topic plan with per-slide LLM planner after one-shot issue: ${reason}`,
    ], 20),
    prompt_version: promptBundle.version,
    model_used: model,
    provider_used: "llm_local_topic_plan_per_slide",
    endpoint_kind: endpointKind,
  };
}

function cacheDirForSelector(selector) {
  return path.join(
    projectRoot,
    "generated",
    "cache",
    "script_provider",
    "llm_local_topic_plan",
    selector.school,
    selector.course,
    selector.session,
    selector.topic,
  );
}

export function topicPlanCacheIdentity({ descriptor, model, promptVersion, context, topicPlanMode = "" }) {
  return {
    schema_version: TOPIC_SCRIPT_PLAN_CACHE_SCHEMA_VERSION,
    selector: {
      school: descriptor.school,
      course: descriptor.course,
      session: descriptor.session,
      topic: descriptor.topic,
    },
    model: model || "",
    prompt_version: promptVersion || "",
    topic_plan_mode: topicPlanMode || "",
    context_hash: hashObject(context),
  };
}

export async function getTopicScriptPlanWithCache({
  descriptor,
  runtime,
  slidesData,
  authoring,
  layoutManifest,
  options = {},
}) {
  const model = String(options.scriptModel || "").trim();
  const promptVersion = String(options.topicPlanPromptVersion || TOPIC_SCRIPT_PLAN_PROMPT_VERSION).trim() || TOPIC_SCRIPT_PLAN_PROMPT_VERSION;
  const context = buildTopicPlanContext({ descriptor, runtime, slidesData, authoring, layoutManifest });
  const slideIds = context.slides.map((slide) => slide.slide_id);
  const allowFallback = normalizeBoolean(options.allowScriptFallback, true);
  const topicPlanMode = String(options.topicPlanMode || (allowFallback ? "one_shot" : "per_slide")).trim().toLowerCase();
  const identity = topicPlanCacheIdentity({ descriptor, model, promptVersion, context, topicPlanMode });
  const cacheKey = hashObject(identity);
  const cachePath = path.join(cacheDirForSelector(identity.selector), `${cacheKey}.json`);
  const cached = await readJsonIfExists(cachePath);

  if (cached?.cache_key === cacheKey && isObject(cached?.result?.plan)) {
    return {
      ...cached.result,
      cache_used: true,
      cache_key: cacheKey,
      cache_path: cachePath,
    };
  }

  if (!model) {
    if (!allowFallback) throw new Error("Topic script plan requires --scriptModel when script fallback is disabled.");
    const plan = deterministicTopicScriptPlan(context);
    return {
      provider_used: "deterministic_topic_plan",
      model_used: "",
      prompt_version: plan.prompt_version,
      endpoint_kind: "",
      plan,
      generation_warnings: plan.generation_warnings,
      cache_used: false,
      cache_key: cacheKey,
      cache_path: cachePath,
    };
  }

  const promptBundle = await loadPromptBundle(promptVersion);
  const endpoint = normalizeLlmBaseUrl(options.scriptEndpoint);
  const endpointKind = normalizeLlmEndpointKind(endpoint);
  const timeoutMs = Number(options.topicPlanTimeoutMs || options.scriptTimeoutMs || 180000);
  const temperature = Number(options.topicPlanTemperature ?? options.scriptTemperature ?? 0.15);
  const apiKey = endpointKind === "openai" ? await readApiKey(options) : "";

  if (topicPlanMode === "per_slide") {
    const plan = await buildPerSlideTopicPlanWithLlm({
      context,
      promptBundle,
      endpointKind,
      endpoint,
      model,
      temperature,
      timeoutMs,
      maxRetries: Number(options.topicPlanMaxRetries ?? options.scriptMaxRetries ?? 2),
      reason: "no-fallback direct per-slide planning mode",
      apiKey,
    });
    const validated = validateTopicScriptPlan(plan, slideIds);
    if (!validated.valid) throw new Error(`topic_script_plan failed: ${validated.errors.join(" ")}`);
    const result = {
      provider_used: plan.provider_used,
      model_used: model,
      prompt_version: promptBundle.version,
      endpoint_kind: endpointKind,
      plan,
      generation_warnings: plan.generation_warnings,
    };
    await writeJson(cachePath, {
      schema_version: TOPIC_SCRIPT_PLAN_CACHE_SCHEMA_VERSION,
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

  try {
    const rawText = endpointKind === "ollama"
      ? await callOllama({ endpoint, model, temperature, promptBundle, context, timeoutMs, slideIds })
      : await callOpenAiCompatible({ endpoint, model, temperature, promptBundle, context, timeoutMs, apiKey });
    const parsed = maybeJsonFragment(rawText);
    if (!isObject(parsed)) throw new Error("LLM topic plan response was not valid JSON.");
    const repairedPlan = normalizeTopicScriptPlanPayload(parsed, context, {
      promptVersion: promptBundle.version,
      model,
      provider: "llm_local_topic_plan",
    });
    const severeRepairs = [
      ...severeTopicPlanRepairWarnings(repairedPlan.generation_warnings),
      ...semanticTopicPlanWarnings(repairedPlan),
    ];
    if (severeRepairs.length) {
      repairedPlan.generation_warnings = normalizeStringArray([
        ...asArray(repairedPlan.generation_warnings),
        ...semanticTopicPlanWarnings(repairedPlan),
      ], 20);
      if (!allowFallback) {
        const plan = await buildPerSlideTopicPlanWithLlm({
          context,
          promptBundle,
          endpointKind,
          endpoint,
          model,
          temperature,
          timeoutMs,
          maxRetries: Number(options.topicPlanMaxRetries ?? options.scriptMaxRetries ?? 2),
          reason: severeRepairs.join(" "),
          apiKey,
        });
        const validated = validateTopicScriptPlan(plan, slideIds);
        if (!validated.valid) throw new Error(validated.errors.join(" "));
        const result = {
          provider_used: plan.provider_used,
          model_used: model,
          prompt_version: promptBundle.version,
          endpoint_kind: endpointKind,
          plan,
          generation_warnings: plan.generation_warnings,
        };
        await writeJson(cachePath, {
          schema_version: TOPIC_SCRIPT_PLAN_CACHE_SCHEMA_VERSION,
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
    }
    const validated = validateTopicScriptPlan(repairedPlan, slideIds);
    if (!validated.valid) throw new Error(validated.errors.join(" "));
    const plan = {
      ...repairedPlan,
      prompt_version: promptBundle.version,
      model_used: model,
      provider_used: "llm_local_topic_plan",
      endpoint_kind: endpointKind,
    };
    const result = {
      provider_used: "llm_local_topic_plan",
      model_used: model,
      prompt_version: promptBundle.version,
      endpoint_kind: endpointKind,
      plan,
      generation_warnings: repairedPlan.generation_warnings,
    };
    await writeJson(cachePath, {
      schema_version: TOPIC_SCRIPT_PLAN_CACHE_SCHEMA_VERSION,
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
  } catch (error) {
    if (!allowFallback) throw new Error(`topic_script_plan failed: ${error?.message || error}`);
    const plan = deterministicTopicScriptPlan(context);
    return {
      provider_used: "deterministic_topic_plan",
      model_used: "",
      prompt_version: plan.prompt_version,
      endpoint_kind: "",
      plan,
      generation_warnings: [`topic_script_plan fallback: ${error?.message || error}`],
      cache_used: false,
      cache_key: cacheKey,
      cache_path: cachePath,
    };
  }
}

export const __test = {
  buildTopicPlanJsonSchema,
  hashObject,
};
