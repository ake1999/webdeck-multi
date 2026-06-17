#!/usr/bin/env node
/**
 * Replace em dashes (—) with comma, colon, or period in AU Calculus 1 sources.
 * Does NOT touch Unicode math minus (−).
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(
  process.cwd(),
  "courses/AU/ARIAN_Calculus_1"
);

const EXT = new Set([".slides.js", ".lecture.plan.json"]);

function walk(dir, out = []) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if ([...EXT].some((e) => ent.name.endsWith(e))) out.push(p);
  }
  return out;
}

function fixEmDashes(text) {
  let s = text;

  s = s.replaceAll("Arian University — Calculus 1", "Arian University • Calculus 1");
  s = s.replaceAll(
    "Enhanced by course design review — see",
    "Enhanced by course design review: see"
  );

  s = s.replace(/(\/\/ BLOCK \d+) — /g, "$1: ");
  s = s.replace(/(\/\/ [A-Z][A-Z /]+) — /g, "$1: ");

  s = s.replace(
    /(title|caption|meta|formulaLabel):\s*"([^"]*) — ([^"]*)"/g,
    (_m, key, a, b) => {
      const sep = a.includes(":") ? ", " : ": ";
      return `${key}: "${a}${sep}${b}"`;
    }
  );

  s = s.replace(/([^\s—])(—)([a-z])/g, "$1, $3");
  s = s.replace(/([^\s—])(—)([A-Z])/g, "$1. $3");

  s = s.replace(/ — /g, ", ");

  s = s.replace(/\b(POSITIVE|NEGATIVE|LEFT|RIGHT|ODD|EVEN), /g, "$1. ");
  s = s.replace(/\b([A-Z]{4,}), /g, "$1. ");

  return s;
}

const files = walk(ROOT);
let changed = 0;
for (const file of files) {
  const before = readFileSync(file, "utf8");
  const after = fixEmDashes(before);
  if (after !== before) {
    writeFileSync(file, after, "utf8");
    changed++;
  }
}

console.log(`Updated ${changed} of ${files.length} Calculus 1 files.`);