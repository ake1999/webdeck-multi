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
  return plainTextForSpeech(media.caption || media.alt || media.source || media.title || media.id || "");
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
  if (["image", "gallery", "video", "iframe", "widget", "caption"].includes(targetType)) {
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
