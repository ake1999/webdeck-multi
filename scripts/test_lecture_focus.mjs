import assert from "node:assert/strict";

const VISUAL_FOCUS_TYPES = new Set([
  "widget",
  "calculus_widget",
  "image",
  "gallery",
  "video",
  "iframe",
  "caption",
  "media",
  "plot",
  "visual_lab",
]);

function focusModeForElementType(type) {
  const normalized = String(type || "").toLowerCase();
  if (VISUAL_FOCUS_TYPES.has(normalized)) return "halo";
  if (normalized === "table_cell" || normalized === "table_header") return "cell";
  return "underline";
}

assert.equal(focusModeForElementType("paragraph"), "underline");
assert.equal(focusModeForElementType("step"), "underline");
assert.equal(focusModeForElementType("formula"), "underline");
assert.equal(focusModeForElementType("table_cell"), "cell");
assert.equal(focusModeForElementType("widget"), "halo");
assert.equal(focusModeForElementType("calculus_widget"), "halo");

console.log("lecture focus classification: ok");