import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "../export_runtime.mjs";
import { relativeProjectPath } from "./utils.mjs";

export const LOCAL_HY_MOTION_ROOT = path.join(projectRoot, "generated", "outputs", "motion", "hy_motion");

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function normalizeSlash(value) {
  return String(value || "").replaceAll("\\", "/").replace(/^\/+/, "").replace(/\/+$/, "");
}

export function selectorSuffix(selector = {}) {
  return [
    selector.school,
    selector.course,
    selector.session,
    selector.topic,
  ].map((part) => String(part || "")).filter(Boolean).join("/");
}

export function splitContractPath(value) {
  return normalizeSlash(value).split("/").filter(Boolean);
}

export function localHyMotionDir({ root = LOCAL_HY_MOTION_ROOT, kind, selector }) {
  return path.join(root, kind, ...splitContractPath(selectorSuffix(selector)));
}

export function localHyMotionContractDir({ root = LOCAL_HY_MOTION_ROOT, kind, selector }) {
  return relativeProjectPath(localHyMotionDir({ root, kind, selector }));
}

export function buildExpectedHyMotionOutput({ outputDir, filenamePrefix, ext }) {
  const cleanPrefix = String(filenamePrefix || "").trim();
  const cleanExt = String(ext || "").replace(/^\./, "").toLowerCase();
  const cleanOutputDir = normalizeSlash(outputDir);

  return {
    output_dir: cleanOutputDir,
    filename_prefix: cleanPrefix,
    ext: cleanExt,
    candidate_filenames: [
      `${cleanPrefix}.${cleanExt}`,
      `${cleanPrefix}_00000_.${cleanExt}`,
      `${cleanPrefix}_00001_.${cleanExt}`,
      `${cleanPrefix}_00001.${cleanExt}`,
    ],
  };
}

export function buildExpectedHyMotionOutputs({ npzOutputDir, fbxOutputDir, filenamePrefix }) {
  return {
    npz: buildExpectedHyMotionOutput({
      outputDir: npzOutputDir,
      filenamePrefix,
      ext: "npz",
    }),
    fbx: buildExpectedHyMotionOutput({
      outputDir: fbxOutputDir,
      filenamePrefix,
      ext: "fbx",
    }),
  };
}

export function hyMotionOutputDirToPath(root, outputDir) {
  return path.join(root, ...splitContractPath(outputDir));
}

async function dirExists(dirPath) {
  const info = await stat(dirPath).catch(() => null);
  return Boolean(info?.isDirectory());
}

function extensionMatches(fileName, ext) {
  return path.extname(fileName).toLowerCase() === `.${String(ext || "").toLowerCase().replace(/^\./, "")}`;
}

export function matchesHyMotionAsset(fileName, expected) {
  if (!expected) return false;
  const base = path.basename(String(fileName || ""));
  if (!extensionMatches(base, expected.ext)) return false;
  const stem = base.slice(0, -path.extname(base).length);
  return stem === expected.filename_prefix || stem.startsWith(`${expected.filename_prefix}_`);
}

export async function findMatchingAssetsInDir(dirPath, expected) {
  if (!await dirExists(dirPath)) return [];

  const entries = await readdir(dirPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && matchesHyMotionAsset(entry.name, expected))
    .map((entry) => path.join(dirPath, entry.name))
    .sort((left, right) => path.basename(left).localeCompare(path.basename(right)));
}

function outputDirMatches(actualSubfolder, expectedOutputDir) {
  const actual = normalizeSlash(actualSubfolder);
  const expected = normalizeSlash(expectedOutputDir);
  return actual === expected || actual.endsWith(`/${expected}`) || expected.endsWith(`/${actual}`);
}

function normalizeHistoryFile(file) {
  const filename = String(file.filename || "").trim();
  if (!filename) return null;
  return {
    filename,
    subfolder: normalizeSlash(file.subfolder || path.dirname(filename)),
    type: String(file.type || "output"),
  };
}

export function collectHistoryOutputFiles(historyEntry) {
  const files = [];
  const seen = new Set();

  const pushFile = (candidate) => {
    const normalized = normalizeHistoryFile(candidate);
    if (!normalized) return;
    const key = `${normalized.type}:${normalized.subfolder}:${normalized.filename}`;
    if (seen.has(key)) return;
    seen.add(key);
    files.push(normalized);
  };

  const visit = (value) => {
    if (value == null) return;
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (typeof value === "string") {
      if (/\.(npz|fbx)$/i.test(value)) {
        pushFile({
          filename: path.basename(value),
          subfolder: path.dirname(normalizeSlash(value)).replace(/^\.$/, ""),
        });
      }
      return;
    }
    if (typeof value !== "object") return;

    if (typeof value.filename === "string") pushFile(value);
    Object.values(value).forEach(visit);
  };

  visit(historyEntry?.outputs || historyEntry);
  return files.sort((left, right) =>
    `${left.subfolder}/${left.filename}`.localeCompare(`${right.subfolder}/${right.filename}`),
  );
}

export function matchHistoryAssets(historyFiles, expected) {
  return asArray(historyFiles)
    .filter((file) =>
      matchesHyMotionAsset(file.filename, expected)
      && outputDirMatches(file.subfolder, expected.output_dir),
    )
    .sort((left, right) => left.filename.localeCompare(right.filename));
}

export async function findLocalExpectedAssets({ root, expectedOutputs }) {
  if (!root) return { npz: [], fbx: [] };

  const result = {};
  for (const kind of ["npz", "fbx"]) {
    const expected = expectedOutputs?.[kind];
    if (!expected) {
      result[kind] = [];
      continue;
    }
    const dirPath = hyMotionOutputDirToPath(root, expected.output_dir);
    const files = await findMatchingAssetsInDir(dirPath, expected);
    result[kind] = files.map((filePath) => ({
      file: filePath,
      relative_file: path.isAbsolute(filePath) && filePath.startsWith(projectRoot)
        ? relativeProjectPath(filePath)
        : filePath,
    }));
  }
  return result;
}

export async function verifyHyMotionOutputs({ historyEntry, comfyOutputRoot = "", expectedOutputs }) {
  const historyFiles = collectHistoryOutputFiles(historyEntry);
  const historyMatches = {
    npz: matchHistoryAssets(historyFiles, expectedOutputs?.npz),
    fbx: matchHistoryAssets(historyFiles, expectedOutputs?.fbx),
  };
  const localMatches = await findLocalExpectedAssets({
    root: comfyOutputRoot,
    expectedOutputs,
  });

  const npzFound = Boolean(historyMatches.npz.length || localMatches.npz.length);
  const fbxFound = Boolean(historyMatches.fbx.length || localMatches.fbx.length);
  const missingOutputs = [];
  if (!npzFound) missingOutputs.push("npz");
  if (!fbxFound) missingOutputs.push("fbx");

  return {
    expected_outputs: expectedOutputs,
    history_outputs: {
      files: historyFiles,
      npz: historyMatches.npz,
      fbx: historyMatches.fbx,
    },
    local_outputs: localMatches,
    npz_found: npzFound,
    fbx_found: fbxFound,
    missing_outputs: missingOutputs,
  };
}
