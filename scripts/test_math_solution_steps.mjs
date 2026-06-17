#!/usr/bin/env node

import assert from "node:assert/strict";
import {
  formatChainOp,
  normalizeTex,
  stepMath,
  stepParts,
  stepSpeech,
} from "../shared/math_solution_steps.js";
import { generateSegmentsFromContent } from "./lib/lecture/script_providers/deterministic.mjs";

assert.equal(normalizeTex("x^2"), "$$x^2$$");
assert.equal(normalizeTex("$$x^2$$"), "$$x^2$$");
assert.equal(stepMath({ math: "\\frac{0}{0}" }), "\\frac{0}{0}");
assert.equal(stepSpeech({ say: "Factor the numerator." }), "Factor the numerator.");
assert.equal(formatChainOp("=>"), "⇒");
assert.equal(formatChainOp("="), "=");
assert.deepEqual(
  stepParts({
    parts: [
      { math: "a" },
      { math: "b", op: "=" },
    ],
  }),
  [{ math: "a", op: null }, { math: "b", op: "=" }],
);

const layoutContext = {
  elementsById: new Map([
    ["body_solution_problem", { id: "body_solution_problem", type: "math_solution_problem" }],
    ["step_1", { id: "step_1", type: "math_solution_step" }],
    ["step_2", { id: "step_2", type: "math_solution_step" }],
    ["step_3", { id: "step_3", type: "math_solution_step" }],
  ]),
  childrenByParentId: new Map(),
  availableIds: new Set(["slide", "body_solution_problem", "step_1", "step_2", "step_3"]),
};

const slide = {
  type: "text",
  slideId: "s09_example",
  titleId: "title",
  leadId: "lead",
  blocks: [
    {
      id: "body_solution",
      type: "math_solution_steps",
      problem: "\\lim_{x\\to 2}\\frac{x^2-4}{x-2}",
      steps: [
        { id: "step_1", math: "\\frac{0}{0}", say: "Direct substitution gives indeterminate form." },
        { id: "step_2", math: "\\frac{(x-2)(x+2)}{x-2}", say: "Factor the numerator." },
        { id: "step_3", math: "\\frac{\\cancel{(x-2)}(x+2)}{\\cancel{(x-2)}}", say: "Cancel for x not equal to 2." },
      ],
    },
  ],
};

const rawSlide = {
  title: "Factoring to Resolve 0/0",
  lead: "0/0 is a signal to factor, cancel, then substitute.",
};

const segments = generateSegmentsFromContent(
  slide,
  rawSlide,
  layoutContext,
  { attention_mode: "focus", voice: {} },
  { maxSegmentsPerSlide: 12, maxAutoItems: 8 },
  (layoutContext, id) => id,
  null,
);

assert.ok(segments.length >= 4, "math_solution_steps should emit problem + one segment per step");
assert.equal(segments[1].target_element, "body_solution_problem");
assert.equal(segments[2].target_element, "step_1");
assert.match(segments[2].text, /indeterminate/i);
assert.equal(segments[3].target_element, "step_2");
assert.equal(segments[4].target_element, "step_3");
assert.match(segments[4].text, /cancel/i);

console.log("math_solution_steps tests passed");