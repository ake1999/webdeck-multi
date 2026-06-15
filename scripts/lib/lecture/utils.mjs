import path from "node:path";
import { stripRichText } from "../../../shared/deck_model.js";
import { projectRoot } from "../export_runtime.mjs";

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value)));
}

export function ensureSentence(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/[.!?]$/.test(text)) return text;
  return `${text}.`;
}

export function plainTextForSpeech(value) {
  return String(value ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+?)\]\((https?:\/\/[^\s)]+)\)/g, "$1")
    .replace(/`([^`]+?)`/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\bhttps?:\/\/\S+/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SPOKEN_REPLACEMENTS = [
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
  [/\blim\b/gi, "limit"],
  [/\bsqrt\b/gi, "square root"],
  [/\bsin\b/gi, "sine"],
  [/\bcos\b/gi, "cosine"],
  [/\btan\b/gi, "tangent"],
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
];

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
    )
    .replace(/([A-Za-z0-9_]+)\s*\/\s*([A-Za-z0-9_]+)/g, "$1 over $2");
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
    .replace(/\//g, " over ")
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
  for (const [pattern, replacement] of SPOKEN_REPLACEMENTS) {
    text = text.replace(pattern, replacement);
  }
  return ensureSentence(
    spellAcronyms(verbalizeSymbols(verbalizeCommonMath(verbalizeTechnicalPaths(text))))
      .replace(/\s+/g, " ")
      .replace(/\s+([,.!?;:])/g, "$1")
      .trim(),
  );
}

export function extractCodeBlocks(value) {
  const blocks = [];
  const regex = /```(?:[\w+-]+)?\n?([\s\S]*?)```/g;
  let match = regex.exec(String(value || ""));
  while (match) {
    const code = String(match[1] || "").trim();
    if (code) blocks.push(code);
    match = regex.exec(String(value || ""));
  }
  return blocks;
}

export function hasCodeFence(value) {
  return extractCodeBlocks(value).length > 0;
}

function normalizeNarrationText(value) {
  return String(value || "")
    .replace(/^say:\s*/gim, "")
    .replace(/^note:\s*/gim, "")
    .replace(/^teacher notes?:\s*/gim, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function splitLongChunk(chunk, maxWords) {
  const trimmed = chunk.trim();
  if (!trimmed) return [];
  if (trimmed.split(/\s+/).length <= maxWords) return [trimmed];

  const separators = ["; ", ": ", ", "];
  for (const separator of separators) {
    if (!trimmed.includes(separator)) continue;
    const pieces = trimmed
      .split(separator)
      .map((piece) => piece.trim())
      .filter(Boolean);
    if (pieces.length < 2) continue;

    const rebuilt = [];
    let current = "";

    pieces.forEach((piece) => {
      const candidate = current ? `${current}${separator}${piece}` : piece;
      if (candidate.split(/\s+/).length > maxWords && current) {
        rebuilt.push(current.trim());
        current = piece;
      } else {
        current = candidate;
      }
    });

    if (current.trim()) rebuilt.push(current.trim());
    if (rebuilt.length > 1) return rebuilt;
  }

  const words = trimmed.split(/\s+/);
  const chunks = [];
  for (let index = 0; index < words.length; index += maxWords) {
    chunks.push(words.slice(index, index + maxWords).join(" "));
  }
  return chunks;
}

export function splitNarrationText(value, options = {}) {
  const maxSegments = Number(options.maxSegments) || 8;
  const maxWords = Number(options.maxWordsPerSegment) || 28;
  const normalized = normalizeNarrationText(value);
  if (!normalized) return [];

  const chunks = normalized
    .replace(/\n[-*]\s+/g, ". ")
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .flatMap((chunk) => splitLongChunk(chunk, maxWords))
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  if (!chunks.length) return [];
  if (chunks.length <= maxSegments) {
    return chunks.map((chunk) => ensureSentence(chunk));
  }

  const head = chunks.slice(0, maxSegments - 1).map((chunk) => ensureSentence(chunk));
  const tail = ensureSentence(chunks.slice(maxSegments - 1).join(" "));
  return [...head, tail];
}

function verbalizeToken(token) {
  return token
    .replace(/~/g, " tilde ")
    .replace(/\//g, " slash ")
    .replace(/\\/g, " backslash ")
    .replace(/_/g, " underscore ")
    .replace(/#/g, " hash ")
    .replace(/\|/g, " pipe ")
    .replace(/<=/g, " less than or equal to ")
    .replace(/>=/g, " greater than or equal to ")
    .replace(/!=/g, " not equal to ")
    .replace(/==/g, " equals equals ")
    .replace(/=/g, " equals ")
    .replace(/\s+/g, " ")
    .trim();
}

export function verbalizeCodeBlock(code) {
  const lines = String(code || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 6);

  if (!lines.length) return "";

  const spoken = lines.map((line, index) => {
    const prefix = index === 0 ? "First" : index === lines.length - 1 ? "Finally" : "Then";
    return `${prefix}, ${verbalizeToken(line)}.`;
  });

  return `The code block shows this pattern. ${spoken.join(" ")}`.replace(/\s+/g, " ").trim();
}

export function summarizeMediaLabel(media) {
  if (!media) return "";
  return plainTextForSpeech(
    media.caption
      || media.alt
      || media.title
      || media.widget
      || media.sourceSpec
      || media.source
      || media.id
      || "",
  );
}

export function bulletLead(index, total) {
  if (total <= 1) return "The key point is";
  const variants = [
    "The key point is",
    "Next, notice",
    "Also remember",
    "Another important idea is",
    "Finally, remember",
  ];
  return variants[Math.min(index, variants.length - 1)];
}

export function defaultAttentionMode(targetType) {
  if (["image", "gallery", "video", "iframe", "widget", "calculus_widget", "caption"].includes(targetType)) {
    return "hybrid_focus";
  }
  return "slide_focus";
}

export function defaultVoiceForSlide(slideType, overrides = {}) {
  const base = {
    tone: "teacher_clear",
    energy: 0.55,
    pace: 0.97,
  };

  if (slideType === "title") {
    base.energy = 0.58;
    base.pace = 0.95;
  }

  if (slideType === "mcq") {
    base.energy = 0.62;
    base.pace = 0.98;
  }

  if (slideType === "two-col") {
    base.energy = 0.54;
  }

  return {
    ...base,
    ...overrides,
  };
}

export function relativeProjectPath(filePath) {
  return path.relative(projectRoot, filePath).split(path.sep).join("/");
}

export function slideAnchor(bbox) {
  if (!Array.isArray(bbox) || bbox.length !== 4) return [0, 0];
  return [
    Math.round(((bbox[0] + bbox[2]) / 2) * 100) / 100,
    Math.round(((bbox[1] + bbox[3]) / 2) * 100) / 100,
  ];
}

export function cleanNarrationSeed(value) {
  return normalizeNarrationText(value);
}

export function plainTextSummary(value) {
  return stripRichText(String(value || "")).replace(/\s+/g, " ").trim();
}
