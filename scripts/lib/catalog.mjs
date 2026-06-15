import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { projectRoot } from "./export_runtime.mjs";

const VALID_SLIDE_TYPES = new Set(["title", "bullets", "text", "two-col", "mcq", "visual_lab"]);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeTopicDescriptor(filePath) {
  const relative = path.relative(projectRoot, filePath);
  const parts = relative.split(path.sep);

  if (parts.length < 6) return null;
  if (parts[0] !== "courses" || parts[3] !== "sessions") return null;
  if (!parts.at(-1)?.endsWith(".slides.js")) return null;

  const school = parts[1];
  const course = parts[2];
  const session = parts[4];
  const topic = parts[5].replace(/\.slides\.js$/, "");

  return {
    school,
    course,
    session,
    topic,
    filePath,
    relativePath: relative,
    sessionDir: path.dirname(filePath),
    reviewKey: `${school}__${course}__${session}__${topic}`.replace(/[^a-zA-Z0-9._-]+/g, "_"),
  };
}

export async function discoverTopics() {
  const files = await walk(path.join(projectRoot, "courses"));
  return files
    .map(normalizeTopicDescriptor)
    .filter(Boolean)
    .sort((left, right) =>
      left.school.localeCompare(right.school) ||
      left.course.localeCompare(right.course) ||
      left.session.localeCompare(right.session) ||
      left.topic.localeCompare(right.topic),
    );
}

export function filterTopics(topics, selector = {}) {
  return topics.filter((topic) => {
    if (selector.school && topic.school !== selector.school) return false;
    if (selector.course && topic.course !== selector.course) return false;
    if (selector.session && topic.session !== selector.session) return false;
    if (selector.topic && topic.topic !== selector.topic) return false;
    return true;
  });
}

export function summarizeSelector(selector = {}) {
  const tokens = [
    selector.school || "all-schools",
    selector.course || "all-courses",
    selector.session || "all-sessions",
    selector.topic || "all-topics",
  ];
  return tokens.join("/");
}

export async function loadTopicModule(descriptor) {
  const moduleUrl = pathToFileURL(descriptor.filePath).href;
  const mod = await import(moduleUrl);
  const slidesData = mod.default || [];
  return {
    mod,
    slidesData,
    topicMeta: mod.topicMeta || null,
  };
}

export function getSlideTypeSet() {
  return new Set(VALID_SLIDE_TYPES);
}

export function isValidSlideType(type) {
  return VALID_SLIDE_TYPES.has(type);
}

export async function localFileExists(filePath) {
  return Boolean(await stat(filePath).catch(() => null));
}

export function isRemoteReference(value) {
  return /^https?:\/\//i.test(String(value || ""));
}

export function isFileUrl(value) {
  return /^file:\/\//i.test(String(value || ""));
}

export function isDataUrl(value) {
  return /^(data|blob):/i.test(String(value || ""));
}

export function resolveDeckAssetPath(ref) {
  const value = String(ref || "").trim();
  if (!value) return null;

  if (isRemoteReference(value) || isDataUrl(value)) {
    return {
      kind: "remote",
      original: value,
      resolved: value,
      exists: true,
    };
  }

  if (isFileUrl(value)) {
    const filePath = fileURLToPath(value);
    return {
      kind: "file",
      original: value,
      resolved: filePath,
      exists: null,
    };
  }

  const baseUrl = pathToFileURL(path.join(projectRoot, "session.html"));
  const resolvedUrl = new URL(value, baseUrl);
  const resolvedPath = fileURLToPath(resolvedUrl);

  return {
    kind: "local",
    original: value,
    resolved: resolvedPath,
    exists: null,
  };
}

export function toReviewLabel(descriptor) {
  return `${descriptor.school} / ${descriptor.course} / ${descriptor.session} / ${descriptor.topic}`;
}

export function issueToText(issue) {
  const location = issue.location ? ` (${issue.location})` : "";
  return `${issue.severity.toUpperCase()}: ${issue.code}${location} — ${issue.message}`;
}

export function issueToHtml(issue) {
  const location = issue.location ? ` <span class="loc">${escapeHtml(issue.location)}</span>` : "";
  return `<li class="${escapeHtml(issue.severity)}"><strong>${escapeHtml(issue.severity.toUpperCase())}</strong> ${escapeHtml(issue.code)}${location} - ${escapeHtml(issue.message)}</li>`;
}

export { escapeHtml };
