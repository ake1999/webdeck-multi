import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "./lib/export_runtime.mjs";

const loaderPath = path.join(projectRoot, "shared/session_loader.js");
const src = readFileSync(loaderPath, "utf8");

assert.ok(!src.includes("calculus_material_adapter"), "session_loader must not import material adapter");
assert.ok(!src.includes("calculus_material_json"), "session_loader must not branch on material JSON");
assert.ok(!src.includes("loadCalculusMaterialTopic"), "session_loader must not fall back to material JSON");
assert.ok(src.includes('.slides.js'), "session_loader should load authored slide modules");
assert.match(src, /school.*\|\|\s*"AU"/, "session_loader should default school to AU");

console.log("session loader contract: ok");