import { readFile } from "node:fs/promises";
import path from "node:path";
import { buildTtsJobPath } from "./contracts.mjs";
import { buildTtsJobRecord } from "./jobs.mjs";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function words(value) {
  return String(value || "").split(/\s+/).filter(Boolean);
}

export const STAGE_DIRECTION_PATTERNS = [
  /^open with\b/i,
  /^use the roadmap\b/i,
  /^point to the\b/i,
  /^then keep the\b/i,
  /^students should listen\b/i,
  /^the session will stay\b/i,
  /^use session-level\b/i,
  /^name where this topic\b/i,
  /^series anchor:/i,
  /\bdo not say\b/i,
  /\btopic x of y\b/i,
  /\bout loud; the numbered\b/i,
  /^preliminaries of the calculus\b/i,
  /^introduce arian university once\b/i,
];

export const GENERIC_TRANSITION_PATTERNS = [
  /next key term/gi,
  /once .* is clear/gi,
  /this slide covers/gi,
  /use .* to introduce/gi,
  /carry this idea forward/gi,
];

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

export function looksLikeStageDirection(text) {
  const value = String(text || "").trim();
  if (!value) return false;
  return STAGE_DIRECTION_PATTERNS.some((pattern) => pattern.test(value));
}

export function genericPhraseCount(value) {
  const text = String(value || "").toLowerCase();
  return GENERIC_TRANSITION_PATTERNS.reduce(
    (total, pattern) => total + asArray(text.match(pattern)).length,
    0,
  );
}

function restartLanguagePattern() {
  return /\b(hello everyone|welcome everyone|last session|continuing from our (previous|last) discussion|building on our previous discussion|let'?s dive right in)\b/i;
}

function finalTextHasClosing(text) {
  return /\b(remember|finish|wrap|next class|next time|next session|question|questions|check|takeaway|before you leave|you should|as you work|leave knowing|always keep in mind|before starting|before operating)\b/i
    .test(String(text || ""));
}

function isTransitionFragment(value) {
  const text = String(value || "").trim();
  return words(text).length <= 5 && /^(first|firstly|next|moving on|last|lastly|finally),?\s+/i.test(text);
}

export function validateProductionScripts(scriptManifest, options = {}) {
  const issues = [];
  const slides = asArray(scriptManifest?.slides);
  const requireLlm = normalizeBoolean(options.requireLlm, true);
  const requireYoutubeRetention = normalizeBoolean(
    options.requireYoutubeRetention ?? options.requireCoachStyle,
    true,
  );

  if (!slides.length) {
    issues.push("script.manifest.json has no slides.");
    return issues;
  }

  slides.forEach((slide) => {
    if (requireLlm) {
      if (slide.script_source === "lecture_plan_guidance") {
        issues.push(`${slide.slide_id}: script_source is lecture_plan_guidance (author notes were spoken, not LLM speech).`);
      } else if (slide.provider_used !== "llm_local") {
        issues.push(`${slide.slide_id}: provider_used is ${slide.provider_used || "missing"}, expected llm_local.`);
      }
      if (slide.fallback_reason) {
        issues.push(`${slide.slide_id}: fallback_reason is present: ${slide.fallback_reason}`);
      }
    }

    asArray(slide.segments).forEach((segment) => {
      if (looksLikeStageDirection(segment?.text)) {
        issues.push(`${slide.slide_id}: segment ${segment.segment_id || "unknown"} sounds like a stage direction: "${String(segment.text).slice(0, 80)}..."`);
      }
    });
  });

  if (requireYoutubeRetention) {
    const allText = slides.flatMap((slide) => asArray(slide.segments).map((segment) => segment.text)).join(" ");
    const genericCount = genericPhraseCount(allText);
    if (genericCount > Math.max(2, Math.ceil(slides.length * 0.08))) {
      issues.push(`spoken script contains too many generic transition phrases: ${genericCount}`);
    }

    const firstText = asArray(slides[0]?.segments).map((segment) => segment.text).join(" ");
    const lastText = asArray(slides[slides.length - 1]?.segments).map((segment) => segment.text).join(" ");
    if (!/\b(welcome|today|we('|’)re|we are|this (course|session|topic|lesson)|quick prediction|here's|let me)\b/i.test(firstText)) {
      issues.push(`${slides[0].slide_id}: opening does not hook or orient like a strong YouTube calculus lesson.`);
    }
    if (!finalTextHasClosing(lastText)) {
      issues.push(`${slides[slides.length - 1].slide_id}: final slide does not close with a takeaway or handoff.`);
    }
    if (/\b(before we move on|as we move on|when we move on|let'?s move on)\b/i.test(lastText)) {
      issues.push(`${slides[slides.length - 1].slide_id}: final slide sounds like a middle slide.`);
    }
  }

  slides.forEach((slide) => {
    const slideWords = words(asArray(slide.segments).map((segment) => segment.text).join(" ")).length;
    if (slideWords < 12) issues.push(`${slide.slide_id}: script is very short (${slideWords} words).`);
    asArray(slide.segments).forEach((segment) => {
      if (/\.{3,}\s*$/.test(String(segment?.text || "").trim())) {
        issues.push(`${slide.slide_id}: segment ${segment.segment_id || "unknown"} ends with an unfinished ellipsis.`);
      }
      if (isTransitionFragment(segment?.text)) {
        issues.push(`${slide.slide_id}: segment ${segment.segment_id || "unknown"} is a transition fragment instead of a complete idea.`);
      }
    });
    if (slide !== slides[0] && restartLanguagePattern().test(asArray(slide.segments).map((segment) => segment.text).join(" "))) {
      issues.push(`${slide.slide_id}: script restarts the lecture mid-topic.`);
    }
  });

  return issues;
}

export async function validateTtsJobsMatchManifest({
  descriptor,
  scriptManifest,
  alignmentManifest,
  providerId = "qwen3_tts",
  options = {},
}) {
  const issues = [];

  for (const slide of asArray(scriptManifest?.slides)) {
    const slideAlignment = asArray(alignmentManifest?.slides).find((item) => item.slide_id === slide.slide_id);
    const expectedJob = buildTtsJobRecord({
      descriptor,
      scriptManifest,
      slide,
      slideAlignment,
      alignmentManifest,
      providerId,
      options,
    });
    const jobPath = buildTtsJobPath(descriptor, slide.slide_id);
    let existing = null;
    try {
      existing = JSON.parse(await readFile(jobPath, "utf8"));
    } catch {
      issues.push(`${slide.slide_id}: missing TTS job at ${path.basename(jobPath)}`);
      continue;
    }

    if (existing.contract_hash !== expectedJob.contract_hash) {
      const existingPreview = asArray(existing.segments)[0]?.text || "";
      const expectedPreview = asArray(expectedJob.segments)[0]?.text || "";
      issues.push(
        `${slide.slide_id}: TTS job is stale (contract_hash ${existing.contract_hash} != ${expectedJob.contract_hash}). `
        + `Job starts: "${String(existingPreview).slice(0, 60)}..." Manifest starts: "${String(expectedPreview).slice(0, 60)}..."`,
      );
    }
  }

  return issues;
}

export function shouldRequireProductionScripts(options = {}) {
  if (options.skipProductionScriptCheck) return false;
  if (options.requireProductionScripts === false) return false;
  if (options.requireProductionScripts === true) return true;
  const provider = String(options.scriptProvider || "").trim().toLowerCase();
  if (provider === "deterministic" || provider === "script_override") return false;
  if (provider === "llm_local") return true;
  if (provider === "auto") return Boolean(String(options.scriptModel || "").trim());
  return false;
}

export function assertProductionScriptsReady(scriptManifest, options = {}) {
  const issues = validateProductionScripts(scriptManifest, {
    ...options,
    requireLlm: options.requireLlm ?? shouldRequireProductionScripts(options),
  });
  if (issues.length) {
    throw new Error(
      `Script manifest failed production quality checks:\n${issues.map((issue) => `- ${issue}`).join("\n")}\n`
      + "Regenerate with build:prof-scripts using --scriptProvider llm_local, --allowScriptFallback 0, and a configured model.",
    );
  }
}