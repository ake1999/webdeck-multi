import { readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../export_runtime.mjs";
import { ensureSentence, plainTextForSpeech } from "./utils.mjs";
import { rebrandSpokenCourseText } from "./course_terminology.mjs";

const PRONUNCIATION_CONFIG_PATH = path.join(projectRoot, "shared/tts_pronunciation.json");

let cachedConfig = null;

function loadPronunciationConfig() {
  if (cachedConfig) return cachedConfig;
  try {
    cachedConfig = JSON.parse(readFileSync(PRONUNCIATION_CONFIG_PATH, "utf8"));
  } catch {
    cachedConfig = { phrase_replacements: [], short_forms: [] };
  }
  return cachedConfig;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildReplacementPattern(entry) {
  const body = escapeRegExp(entry.match);
  const boundary = entry.word_boundary === false ? "" : "\\b";
  const flags = entry.ignore_case ? "gi" : "g";
  return [new RegExp(`${boundary}${body}${boundary}`, flags), String(entry.speak)];
}

function compiledReplacementRules() {
  const config = loadPronunciationConfig();
  const entries = [
    ...asArray(config.phrase_replacements),
    ...asArray(config.short_forms),
  ];
  return entries
    .filter((entry) => entry?.match && entry?.speak)
    .map(buildReplacementPattern);
}

const ROBOTICS_SPOKEN_REPLACEMENTS = [
  [/\bROS\s*2\b/gi, "Ross two"],
  [/\bros2(?=\b|_)/gi, "Ross two"],
  [/(?<![A-Za-z0-9])ros(?=$|[^A-Za-z0-9]|_)/gi, "Ross"],
  [/tf2(?=_|\b)/gi, "T F two"],
  [/\bRViz\b/g, "R Viz"],
  [/\bURDF\b/g, "U R D F"],
  [/\bXacro\b/g, "X macro"],
  [/\bTF2\b/g, "T F two"],
  [/\bTF\b/g, "T F"],
  [/\bCLI\b/g, "C L I"],
  [/\bAPI\b/g, "A P I"],
  [/\bGUI\b/g, "G U I"],
  [/\bPDF\b/g, "P D F"],
  [/\bYAML\b/g, "YAML"],
  [/\bXML\b/g, "X M L"],
  [/\bJSON\b/g, "J SON"],
  [/\bCSV\b/g, "C S V"],
  [/\bUSB\b/g, "U S B"],
  [/\bTCP\b/g, "T C P"],
  [/\bUDP\b/g, "U D P"],
  [/\bIP\b/g, "I P"],
  [/\bQoS\b/g, "quality of service"],
  [/\bsrc\b/g, "source"],
];

const MATH_SYMBOL_REPLACEMENTS = [
  [/∞/g, " infinity "],
  [/∑/g, " sum "],
  [/Σ/g, " sigma "],
  [/∫/g, " integral "],
  [/∂/g, " partial derivative "],
  [/∇/g, " gradient "],
  [/Δ/g, " delta "],
  [/δ/g, " delta "],
  [/θ/g, " theta "],
  [/λ/g, " lambda "],
  [/μ/g, " mu "],
  [/π/g, " pi "],
  [/ω/g, " omega "],
  [/α/g, " alpha "],
  [/β/g, " beta "],
  [/γ/g, " gamma "],
  [/−/g, " minus "],
  [/×/g, " times "],
  [/÷/g, " divided by "],
];

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function applyReplacementRules(text, rules) {
  let next = text;
  for (const [pattern, replacement] of rules) {
    next = next.replace(pattern, replacement);
  }
  return next;
}

function verbalizeInnerExpression(value) {
  return String(value || "")
    .replace(/\s*\+\s*/g, " plus ")
    .replace(/\s*-\s*/g, " minus ")
    .replace(/\s*\/\s*/g, " over ")
    .replace(/\^2\b/g, " squared")
    .replace(/\^3\b/g, " cubed")
    .replace(/\^/g, " to the power of ")
    .trim();
}

function verbalizeCalculusExpressions(value) {
  return String(value || "")
    .replace(/\b([fgh])\s*\(\s*([^)]+?)\s*\)/gi, (_, fn, inner) => (
      `${fn.toLowerCase()} of ${verbalizeInnerExpression(inner)}`
    ))
    .replace(/\b(sine|cosine|tangent)\s*\(\s*([^)]+?)\s*\)/gi, (_, fn, inner) => (
      `${fn.toLowerCase()} of ${verbalizeInnerExpression(inner)}`
    ))
    .replace(/\b(sin|cos|tan)\s*\(\s*([^)]+?)\s*\)/gi, (_, fn, inner) => {
      const spokenFn = fn.toLowerCase() === "sin"
        ? "sine"
        : fn.toLowerCase() === "cos"
          ? "cosine"
          : "tangent";
      return `${spokenFn} of ${verbalizeInnerExpression(inner)}`;
    })
    .replace(/\b([A-Za-z])\s*²\b/g, "$1 squared")
    .replace(/\b([A-Za-z])\s*\^2\b/g, "$1 squared")
    .replace(/\b([A-Za-z])\s*\^3\b/g, "$1 cubed")
    .replace(/\bd\s*([a-z])\b/gi, "d $1")
    .replace(/\bdy\s*\/\s*dx\b/gi, "dy dx")
    .replace(/\b([A-Za-z0-9]+)\s*\/\s*([A-Za-z0-9]+)\b/g, "$1 over $2");
}

function spellAcronyms(value) {
  return String(value || "").replace(/\b[A-Z]{2,}\b/g, (match) => match.split("").join(" "));
}

function verbalizePathPart(value) {
  const normalized = String(value || "")
    .replace(/^~$/, "home")
    .replace(/^\.$/, "current folder")
    .replace(/^\.\.$/, "parent folder")
    .replace(/\./g, " dot ")
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\bws\b/gi, "workspace")
    .replace(/\s+/g, " ")
    .trim();
  return normalized;
}

function verbalizeTechnicalPaths(value) {
  return String(value || "").replace(
    /(^|[\s("'`])((?:~?\/|\.{1,2}\/|[A-Za-z0-9_.-]+\/)[^\s,;:!?]+)/g,
    (match, prefix, token) => {
      const cleaned = String(token).replace(/\.$/, "");
      const parts = cleaned
        .split(/[\\/]+/g)
        .map(verbalizePathPart)
        .filter(Boolean);
      if (!parts.length) return match;
      return `${prefix}${parts.join(" ")}`;
    },
  );
}

function verbalizeCommonMath(value) {
  return String(value || "")
    .replace(
      /\blimit\s+([A-Za-z])\s*(?:->|→)\s*([^\s]+)\s+(sine|cosine|tangent)\s*\(\s*([^)]+?)\s*\)\s*\/\s*([A-Za-z0-9_]+)/gi,
      (_, variable, target, fn, numerator, denominator) => (
        `limit as ${variable} approaches ${target} of ${fn.toLowerCase()} of ${numerator.trim()} over ${denominator}`
      ),
    )
    .replace(
      /\b(sine|cosine|tangent)\s*\(\s*([^)]+?)\s*\)\s*\/\s*([A-Za-z0-9_]+)/gi,
      (_, fn, numerator, denominator) => `${fn.toLowerCase()} of ${numerator.trim()} over ${denominator}`,
    );
}

function verbalizeSymbols(value) {
  return String(value || "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/≤/g, " less than or equal to ")
    .replace(/≥/g, " greater than or equal to ")
    .replace(/≠/g, " not equal to ")
    .replace(/≈/g, " approximately equal to ")
    .replace(/==/g, " equals equals ")
    .replace(/!=/g, " not equal to ")
    .replace(/<=/g, " less than or equal to ")
    .replace(/>=/g, " greater than or equal to ")
    .replace(/->|→/g, " to ")
    .replace(/=>|⇒/g, " implies ")
    .replace(/::/g, " double colon ")
    .replace(/(^|\s)--([A-Za-z][\w-]*)/g, "$1$2 flag ")
    .replace(/(^|\s)-([A-Za-z][\w-]*)/g, "$1$2 flag ")
    .replace(/\s-\s/g, " minus ")
    .replace(/\\/g, " backslash ")
    .replace(/_/g, " ")
    .replace(/~/g, " home ")
    .replace(/\|/g, " pipe ")
    .replace(/#/g, " hash ")
    .replace(/\$/g, " dollar ")
    .replace(/@/g, " at ")
    .replace(/%/g, " percent ")
    .replace(/\+/g, " plus ")
    .replace(/\*/g, " times ")
    .replace(/\^/g, " to the power of ")
    .replace(/=/g, " equals ")
    .replace(/</g, " less than ")
    .replace(/>/g, " greater than ")
    .replace(/\[/g, " left bracket ")
    .replace(/\]/g, " right bracket ")
    .replace(/\{/g, " left brace ")
    .replace(/\}/g, " right brace ")
    .replace(/\(/g, " ")
    .replace(/\)/g, " ")
    .replace(/(?<=[A-Za-z0-9_])\.(?=[A-Za-z_])/g, " dot ");
}

export function ttsTextForSpeech(value) {
  let text = plainTextForSpeech(value);
  text = applyReplacementRules(text, compiledReplacementRules());
  text = applyReplacementRules(text, ROBOTICS_SPOKEN_REPLACEMENTS);
  text = applyReplacementRules(text, MATH_SYMBOL_REPLACEMENTS);
  text = verbalizeCalculusExpressions(text);
  text = verbalizeCommonMath(text);
  text = verbalizeTechnicalPaths(text);
  text = verbalizeSymbols(text);
  text = spellAcronyms(text);
  return ensureSentence(
    text
      .replace(/\s+/g, " ")
      .replace(/\s+([,.!?;:])/g, "$1")
      .trim(),
  );
}

export function attachTtsTextToSegment(segment, terminology = null) {
  const rawText = String(segment?.text || "").trim();
  const displayText = ensureSentence(
    terminology ? rebrandSpokenCourseText(rawText, terminology) : rawText,
  );
  if (!displayText) return null;
  const spokenText = ttsTextForSpeech(displayText);
  return {
    ...segment,
    text: displayText,
    ...(spokenText !== displayText ? { tts_text: spokenText } : {}),
  };
}

export function auditTtsNormalization(manifest) {
  const changes = [];
  for (const slide of asArray(manifest?.slides)) {
    for (const segment of asArray(slide?.segments)) {
      const displayText = ensureSentence(String(segment?.text || "").trim());
      if (!displayText) continue;
      const spokenText = ttsTextForSpeech(displayText);
      if (spokenText === displayText && !segment.tts_text) continue;
      const expected = spokenText !== displayText ? spokenText : "";
      const actual = segment.tts_text || "";
      if (expected !== actual) {
        changes.push({
          slide_id: slide.slide_id,
          segment_id: segment.segment_id,
          display_text: displayText,
          expected_tts_text: expected || displayText,
          previous_tts_text: actual || "",
        });
      }
    }
  }
  return changes;
}

export function applyTtsNormalizationToScriptManifest(manifest, terminology = null) {
  if (!manifest || typeof manifest !== "object") return manifest;
  const slides = asArray(manifest.slides).map((slide) => ({
    ...slide,
    segments: asArray(slide.segments)
      .map((segment) => {
        const rebranded = terminology
          ? { ...segment, text: rebrandSpokenCourseText(segment.text, terminology) }
          : segment;
        return attachTtsTextToSegment(rebranded, terminology);
      })
      .filter(Boolean),
  }));
  const changes = auditTtsNormalization({ ...manifest, slides });
  return {
    ...manifest,
    slides,
    tts_normalization: {
      schema_version: loadPronunciationConfig().schema_version || "tts-pronunciation-v1",
      config_path: "shared/tts_pronunciation.json",
      applied_at: new Date().toISOString(),
      changed_segments: changes.length,
      display_field: "text",
      speech_field: "tts_text",
    },
  };
}