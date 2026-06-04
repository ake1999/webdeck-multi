import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SCRIPT_WRITER_PROMPT_VERSION,
  buildScriptWriterJsonSchema,
  validateScriptWriterPayload,
} from "../llm_schema.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const promptsDir = path.resolve(__dirname, "..", "prompts");

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeBaseUrl(value) {
  const raw = String(value || "http://127.0.0.1:11434").trim();
  return raw.replace(/\/+$/, "");
}

function normalizeEndpointKind(endpoint) {
  const normalized = normalizeBaseUrl(endpoint);
  if (normalized.includes("/v1") || normalized.endsWith("/chat/completions")) {
    return "openai";
  }
  if (normalized.includes("11434") || normalized.includes("/api")) {
    return "ollama";
  }
  return "openai";
}

function resolvePromptVersion(value) {
  return String(value || SCRIPT_WRITER_PROMPT_VERSION).trim() || SCRIPT_WRITER_PROMPT_VERSION;
}

async function loadPromptBundle(promptVersion) {
  const version = resolvePromptVersion(promptVersion);
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

function compactLayoutTargets(targetQueue) {
  return asArray(targetQueue).map((item) => ({
    id: item.id,
    type: item.type,
    label: item.label || "",
  }));
}

function compactLayoutElements(layoutSlide) {
  return asArray(layoutSlide?.elements).map((element) => ({
    id: element.id,
    type: element.type,
    bbox: element.bbox,
    anchor: element.anchor,
    parent_id: element.parent_id || "",
  }));
}

function compactRawSlide(rawSlide) {
  const out = {
    title: rawSlide?.title || "",
    subtitle: rawSlide?.subtitle || "",
    lead: rawSlide?.lead || "",
    hud: rawSlide?.hud || "",
    type: rawSlide?.type || "",
  };
  if (Array.isArray(rawSlide?.bullets)) {
    out.bullets = rawSlide.bullets.map((item) => (typeof item === "string" ? item : item?.text || item?.say || ""));
  }
  if (Array.isArray(rawSlide?.paragraphs)) {
    out.paragraphs = rawSlide.paragraphs.map((item) => (typeof item === "string" ? item : item?.text || item?.say || ""));
  }
  if (rawSlide?.question) out.question = rawSlide.question;
  if (rawSlide?.correct) out.correct = rawSlide.correct;
  if (rawSlide?.explain) out.explain = rawSlide.explain;
  return out;
}

function topicPlanEntry(topicScriptPlan, slideId) {
  return asArray(topicScriptPlan?.slides).find((item) => item.slide_id === slideId) || null;
}

function compactTopicScriptPlanForSlide(topicScriptPlan, slide, previous, next) {
  if (!isObject(topicScriptPlan)) return null;
  return {
    opening_intent: topicScriptPlan.opening_intent || "",
    closing_intent: topicScriptPlan.closing_intent || "",
    lesson_arc: asArray(topicScriptPlan.lesson_arc),
    current_slide_plan: topicPlanEntry(topicScriptPlan, slide?.slideId),
    previous_slide_plan: previous ? topicPlanEntry(topicScriptPlan, previous.slideId) : null,
    next_slide_plan: next ? topicPlanEntry(topicScriptPlan, next.slideId) : null,
    all_slide_goals: asArray(topicScriptPlan.slides).map((item) => ({
      slide_id: item.slide_id,
      speaking_goal: item.speaking_goal || "",
      student_memory: item.student_memory || "",
    })),
  };
}

export function buildScriptWriterRequestContext({
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
  topicScriptPlan = null,
  continuityContext = null,
}) {
  const previousSlide = index > 0 ? runtime.slides[index - 1] : null;
  const nextSlide = index + 1 < runtime.slides.length ? runtime.slides[index + 1] : null;
  const previous = index > 0 ? slidesData[index - 1] : null;
  const next = index + 1 < slidesData.length ? slidesData[index + 1] : null;
  return {
    topic: {
      topic_id: runtime.topicId,
      selector: {
        school: descriptor.school,
        course: descriptor.course,
        session: descriptor.session,
        topic: descriptor.topic,
      },
      slide_count: runtime.slides.length,
    },
    slide: {
      slide_id: slide.slideId,
      slide_type: slide.type,
      index,
      position: index === 0 ? "first" : index === runtime.slides.length - 1 ? "final" : "middle",
      title: rawSlide?.title || "",
      raw: compactRawSlide(rawSlide),
      previous_title: previous?.title || "",
      next_title: next?.title || "",
    },
    topic_script_plan: compactTopicScriptPlanForSlide(topicScriptPlan, slide, previousSlide, nextSlide),
    continuity: {
      slide_position: index === 0 ? "first" : index === runtime.slides.length - 1 ? "final" : "middle",
      previous_slide_summary: continuityContext?.previous_slide_summary || "",
      last_spoken_excerpt: continuityContext?.last_spoken_excerpt || "",
      prior_topic_memory: asArray(continuityContext?.prior_topic_memory).slice(-6),
      next_slide_intent: continuityContext?.next_slide_intent || "",
    },
    authored_intent: {
      narration_seed: planSlide?.narration_seed || rawSlide?.narration_seed || "",
      must_cover: asArray(planSlide?.must_cover),
      must_say: asArray(planSlide?.must_say),
      emphasis_words: asArray(planSlide?.emphasis_words),
      explicit_narration: Array.isArray(planSlide?.narration)
        ? planSlide.narration
        : typeof planSlide?.narration === "string"
          ? planSlide.narration
          : "",
      slides_authored_narration: Array.isArray(rawSlide?.narration)
        ? rawSlide.narration
        : typeof rawSlide?.narration === "string"
          ? rawSlide.narration
          : "",
      teacher_notes: rawSlide?.teacher_notes || rawSlide?.notes?.teacher_notes || rawSlide?.notes || "",
    },
    topic_pedagogy: {
      teaching_arc: authoring?.topicPedagogy?.teaching_arc || {},
      audience_level: authoring?.topicPedagogy?.audience_level || "",
      topic_goal: authoring?.topicPedagogy?.topic_goal || "",
      topic_takeaways: asArray(authoring?.topicPedagogy?.topic_takeaways),
      style_notes: asArray(authoring?.topicPedagogy?.style_notes),
      transition_style: authoring?.topicPedagogy?.transition_style || "",
      scene_policy_default: authoring?.topicPedagogy?.scene_policy_default || "",
      object_policy_default: authoring?.topicPedagogy?.object_policy_default || "",
    },
    slide_pedagogy: {
      slide_role: planSlide?.slide_role || "",
      importance: planSlide?.importance || "",
      teacher_strategy: planSlide?.teacher_strategy || "",
      explanation_style: planSlide?.explanation_style || "",
      transition_from_previous: planSlide?.transition_from_previous || "",
      transition_to_next: planSlide?.transition_to_next || "",
      likely_student_confusion: asArray(planSlide?.likely_student_confusion),
      delivery_goal: planSlide?.delivery_goal || "",
      story_hint: planSlide?.story_hint || "",
      scene_policy: planSlide?.scene_policy || "",
      object_policy: planSlide?.object_policy || "",
      scene_hint: planSlide?.scene_hint || "",
      prop_suggestions: asArray(planSlide?.prop_suggestions),
      avatar_hint: isObject(planSlide?.avatar_hint) ? planSlide.avatar_hint : {},
    },
    voice_defaults: {
      style: slideDefaults.voice?.voice_style || "",
      tone: slideDefaults.voice?.tone || "",
      energy: Number(slideDefaults.voice?.energy || 0),
      pace: Number(slideDefaults.voice?.pace || 0),
      instruction: slideDefaults.voice?.instruction || "",
    },
    avatar_defaults: {
      character_id: authoring?.avatarProfile?.character_id || "",
      default_anchor: authoring?.avatarProfile?.visual?.default_screen_anchor || "",
      behaviors: isObject(authoring?.avatarProfile?.behaviors) ? authoring.avatarProfile.behaviors : {},
    },
    lecture_defaults: {
      topic_defaults: authoring?.topicDefaults || {},
      slide_plan: planSlide || {},
    },
    layout: {
      slide_bbox: layoutSlide?.bbox || [0, 0, 1280, 720],
      zones: layoutSlide?.zones || {},
      elements: compactLayoutElements(layoutSlide),
      preferred_targets: compactLayoutTargets(targetQueue),
    },
  };
}

function buildMessages({ promptText, exampleText, requestContext, validationErrors = [], previousRaw = "" }) {
  const parts = [
    promptText,
    "",
    "Example JSON:",
    exampleText,
    "",
    "Slide context JSON:",
    JSON.stringify(requestContext, null, 2),
  ];

  if (validationErrors.length) {
    parts.push("");
    parts.push("Your previous response was invalid. Fix these issues exactly:");
    validationErrors.forEach((item) => parts.push(`- ${item}`));
    const position = requestContext?.slide?.position || "";
    if (position && position !== "first") {
      parts.push("- This slide is already inside the same lesson. Remove the words/phrases: today, welcome, hello, last session, continuing from our previous discussion, building on our previous discussion.");
      parts.push("- Start with the actual concept on this slide or a concrete connection to the previous accepted summary; do not use a generic bridge sentence.");
    }
    if (position === "final") {
      parts.push("- This is the final slide. End with a closing reminder, takeaway, or forward handoff; do not introduce the slide as something we are about to cover.");
    }
    if (previousRaw) {
      parts.push("");
      parts.push("Previous invalid response:");
      parts.push(previousRaw);
    }
  }

  return [
    {
      role: "system",
      content: promptText,
    },
    {
      role: "user",
      content: parts.join("\n"),
    },
  ];
}

function extractContentString(payload) {
  if (typeof payload === "string") return payload;
  if (Array.isArray(payload)) {
    return payload.map((item) => {
      if (typeof item === "string") return item;
      if (typeof item?.text === "string") return item.text;
      return "";
    }).join("");
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
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return safeJsonParse(trimmed.slice(firstBrace, lastBrace + 1));
  }

  return null;
}

function capitalizeSentence(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return trimmed;
  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}`;
}

function repairContinuityText(text, position) {
  let next = String(text || "").trim();
  if (!next) return next;

  if (position !== "first") {
    next = next
      .replace(/^continuing from our (previous|last) discussion(?:\s+(about|on)\s+[^,.;]+)?[,;:]?\s*/i, "")
      .replace(/^building on our previous discussion(?:\s+(about|on)\s+[^,.;]+)?[,;:]?\s*/i, "")
      .replace(/^as we continue[,;:]?\s*/i, "");
    next = next
      .replace(/\btoday,?\s+(we('|’)re|we are)\s+going\s+to\s+/ig, "")
      .replace(/\btoday,?\s+(we('|’)re|we are)\s+focusing\s+on\s+/ig, "the focus here is ")
      .replace(/\btoday,?\s+(we('|’)ll|we will)\s+/ig, "we will ")
      .replace(/\btoday,?\s+/ig, "");
  }

  next = next
    .replace(/^\.{3,}\s*/g, "")
    .replace(/\bincluding\.{3,}\s*$/i, "including the required items.")
    .replace(/\.{3,}\s*$/g, ".");

  return capitalizeSentence(next);
}

function wordCount(value) {
  return String(value || "").split(/\s+/).filter(Boolean).length;
}

function isTransitionFragment(value) {
  const text = String(value || "").trim();
  return wordCount(text) <= 5 && /^(first|firstly|next|moving on|last|lastly|finally),?\s+/i.test(text);
}

function lowerFirst(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return trimmed;
  return `${trimmed.charAt(0).toLowerCase()}${trimmed.slice(1)}`;
}

function combineFragment(prefix, fragment) {
  const base = String(prefix || "").trim().replace(/[.:;]\s*$/, "");
  const tail = lowerFirst(String(fragment || "").trim().replace(/^\.{3,}\s*/, ""));
  return capitalizeSentence(`${base} ${tail}`);
}

function bulletForSegment(segment, requestContext) {
  const match = String(segment?.target_element || "").match(/^bullet_(\d+)$/);
  const bullets = asArray(requestContext?.slide?.raw?.bullets);
  if (!match || !bullets.length) return "";
  return String(bullets[Number(match[1]) - 1] || "").trim();
}

function fragmentReplacement(segment, requestContext) {
  const bullet = bulletForSegment(segment, requestContext);
  if (!bullet) return "";
  const cleaned = String(bullet).trim().replace(/\s+/g, " ").replace(/\.$/, "");
  const lower = lowerFirst(cleaned);
  const subject = /^(teaches|provides|describes|explains|lists|offers|includes|shows|gives|sometimes\s+explains)\b/i.test(cleaned)
    ? `it ${lower}`
    : lower;
  if (/^(last|lastly|finally)\b/i.test(segment?.text || "")) return `Finally, ${subject}.`;
  if (/^(next|moving on)\b/i.test(segment?.text || "")) return `Next, ${subject}.`;
  return capitalizeSentence(`${subject}.`);
}

function finalTextHasClosing(text) {
  return /\b(remember|finish|wrap|next class|next time|next session|question|questions|check|takeaway|before you leave|you should|as you work|leave knowing|always keep in mind|before starting|before operating)\b/i
    .test(String(text || ""));
}

export function repairScriptContinuitySegments(segments, requestContext, promptVersion) {
  if (promptVersion !== "script_writer_v2") {
    return { segments: asArray(segments), warnings: [] };
  }
  const position = requestContext?.slide?.position || "";
  const warnings = [];
  const mapped = asArray(segments).map((segment) => {
    const before = String(segment?.text || "");
    const hadLeadingEllipsis = /^\.{3,}\s*/.test(before.trim());
    const after = repairContinuityText(before, position);
    if (after !== before.trim()) warnings.push(`Repaired continuity wording in ${segment?.segment_id || "segment"}.`);
    return {
      segment: {
        ...segment,
        text: after,
      },
      hadLeadingEllipsis,
    };
  });
  const repaired = [];
  for (const item of mapped) {
    if (item.hadLeadingEllipsis && repaired.length) {
      const previous = repaired[repaired.length - 1];
      repaired[repaired.length - 1] = {
        ...previous,
        text: combineFragment(previous.text, item.segment.text),
      };
      warnings.push(`Merged leading-ellipsis fragment into ${previous.segment_id || "previous segment"}.`);
      continue;
    }
    repaired.push(item.segment);
  }

  repaired.forEach((segment, index) => {
    if (!isTransitionFragment(segment.text)) return;
    const replacement = fragmentReplacement(segment, requestContext);
    if (!replacement) return;
    repaired[index] = {
      ...segment,
      text: replacement,
    };
    warnings.push(`Replaced fragmentary transition in ${segment.segment_id || "segment"}.`);
  });

  if (position === "final") {
    const joined = repaired.map((segment) => segment.text).join(" ");
    if (repaired.length && !finalTextHasClosing(joined)) {
      const last = repaired[repaired.length - 1];
      repaired[repaired.length - 1] = {
        ...last,
        text: `${String(last.text || "").replace(/\s+$/, "")} Before you leave, use this as a practical takeaway checkpoint.`,
      };
      warnings.push("Added final-slide closing reminder.");
    }
  }

  return { segments: repaired, warnings };
}

export function validateScriptContinuitySegments(segments, requestContext, promptVersion) {
  if (promptVersion !== "script_writer_v2") return [];
  const errors = [];
  const position = requestContext?.slide?.position || "";
  const firstText = String(segments?.[0]?.text || "").trim();
  const allText = asArray(segments).map((segment) => segment.text).join(" ");
  const titleText = String(requestContext?.slide?.raw?.title || requestContext?.slide?.title || "").trim().toLowerCase();
  const titleAllowsToday = /\btoday\b/.test(titleText);
  const restartPattern = /\b(hello everyone|welcome everyone|last session|continuing from our (previous|last) discussion|building on our previous discussion|let'?s dive right in)\b/i;
  const todayRestartPattern = /\btoday,?\s+(we('|’)re|we are|we('|’)ll|we will|i('|’)m|i am|the goal is|our goal is|we need to|we focus|we are focusing|we want to)\b/i;
  const hasTodayRestart = (value) => todayRestartPattern.test(value) || (!titleAllowsToday && /\btoday\b/i.test(value));
  if (position !== "first" && (/^(hello|welcome)\b/i.test(firstText) || restartPattern.test(firstText))) {
    errors.push("Middle and final slides must not restart the lecture with hello/welcome/today/previous-discussion language; bridge from prior context.");
  }
  if (position !== "first" && hasTodayRestart(firstText)) {
    errors.push("Middle and final slides must not restart the lecture with hello/welcome/today/previous-discussion language; bridge from prior context.");
  }
  if (position !== "first" && (restartPattern.test(allText) || hasTodayRestart(allText))) {
    errors.push("Middle and final slides must not contain hello/welcome/today/previous-discussion restart language.");
  }
  if (/\b(the next key term|once .* is clear|this slide covers)\b/i.test(allText)) {
    errors.push("Avoid generic transition phrases such as next key term, once this is clear, or this slide covers.");
  }
  const fragment = asArray(segments).find((segment) => /\.{3,}\s*$/.test(String(segment?.text || "").trim()));
  if (fragment) {
    errors.push("Do not leave unfinished ellipsis fragments; every spoken segment must be a complete sentence.");
  }
  const leadingFragment = asArray(segments).find((segment) => /^\.{3,}/.test(String(segment?.text || "").trim()));
  if (leadingFragment) {
    errors.push("Do not start a segment with an ellipsis fragment; merge it into the spoken sentence.");
  }
  const shortTransitionFragment = asArray(segments).find((segment) => isTransitionFragment(segment?.text));
  if (shortTransitionFragment) {
    errors.push("Do not split bullet narration into transition fragments such as 'Next, the manual.'; every segment must teach a complete idea.");
  }
  if (position === "final" && /\b(before we move on|as we move on|when we move on|let'?s move on)\b/i.test(allText)) {
    errors.push("The final slide must not end like another middle slide; avoid before-we-move-on language.");
  }
  if (position === "final" && !finalTextHasClosing(allText)) {
    errors.push("The final slide must sound like a closing, reminder, question handoff, or forward handoff.");
  }
  const contentTargets = asArray(requestContext?.layout?.preferred_targets)
    .filter((item) => !["title", "subtitle", "meta"].includes(item.type));
  if (contentTargets.length >= 3 && asArray(segments).length < Math.min(4, contentTargets.length)) {
    errors.push("Content-heavy slides need multiple teachable segments, not a title-only summary.");
  }
  if (contentTargets.length && asArray(segments).every((segment) => String(segment.target_element || "").includes("title"))) {
    errors.push("Content-heavy slides cannot target only the title.");
  }
  return errors;
}

async function postJson(url, payload, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${text.slice(0, 400)}`);
    }
    return safeJsonParse(text) ?? { raw_text: text };
  } finally {
    clearTimeout(timer);
  }
}

async function callOllama({ endpoint, model, temperature, messages, timeoutMs }) {
  const schema = buildScriptWriterJsonSchema();
  const url = endpoint.endsWith("/api/chat") ? endpoint : `${endpoint}/api/chat`;
  const response = await postJson(url, {
    model,
    stream: false,
    format: schema,
    options: {
      temperature,
    },
    messages,
  }, timeoutMs);

  return extractContentString(response?.message?.content || response?.response || "");
}

async function callOpenAiCompatible({ endpoint, model, temperature, messages, timeoutMs }) {
  const url = endpoint.endsWith("/chat/completions")
    ? endpoint
    : endpoint.includes("/v1")
      ? `${endpoint}/chat/completions`
      : `${endpoint}/v1/chat/completions`;

  const response = await postJson(url, {
    model,
    temperature,
    messages,
  }, timeoutMs);

  return extractContentString(response?.choices?.[0]?.message?.content || response?.output_text || "");
}

export async function generateLocalScriptSegments({
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
  topicScriptPlan = null,
  continuityContext = null,
  options = {},
}) {
  const model = String(options.scriptModel || "").trim();
  if (!model) {
    throw new Error("No script model was configured for llm_local.");
  }

  const promptBundle = await loadPromptBundle(options.scriptPromptVersion);
  const endpoint = normalizeBaseUrl(options.scriptEndpoint);
  const endpointKind = normalizeEndpointKind(endpoint);
  const timeoutMs = Number(options.scriptTimeoutMs || 60000);
  const maxRetries = Math.max(0, Number(options.scriptMaxRetries ?? 3));
  const temperature = Number(options.scriptTemperature ?? 0.2);
  const requestContext = buildScriptWriterRequestContext({
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
  });

  let previousRaw = "";
  let validationErrors = [];
  let lastError = "";

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    const messages = buildMessages({
      promptText: promptBundle.promptText,
      exampleText: promptBundle.exampleText,
      requestContext,
      validationErrors,
      previousRaw,
    });

    try {
      const rawText = endpointKind === "ollama"
        ? await callOllama({ endpoint, model, temperature, messages, timeoutMs })
        : await callOpenAiCompatible({ endpoint, model, temperature, messages, timeoutMs });

      previousRaw = rawText;
      const parsed = maybeJsonFragment(rawText);
      const validated = validateScriptWriterPayload(parsed);
      if (validated.valid) {
        const repaired = repairScriptContinuitySegments(
          validated.normalized.segments,
          requestContext,
          promptBundle.version,
        );
        const continuityErrors = validateScriptContinuitySegments(
          repaired.segments,
          requestContext,
          promptBundle.version,
        );
        if (continuityErrors.length) {
          validationErrors = continuityErrors;
          lastError = continuityErrors.join(" ");
          continue;
        }
        return {
          provider_used: "llm_local",
          model_used: model,
          prompt_version: promptBundle.version,
          endpoint_kind: endpointKind,
          segments: repaired.segments,
          generation_warnings: [
            ...asArray(validated.normalized.generation_warnings),
            ...repaired.warnings,
          ],
        };
      }

      validationErrors = validated.errors;
      lastError = validated.errors.join(" ");
    } catch (error) {
      lastError = error?.message || String(error);
      validationErrors = [lastError];
    }
  }

  throw new Error(lastError || "llm_local did not return valid segment JSON.");
}
