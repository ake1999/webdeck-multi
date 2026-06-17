import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { adaptCalculusMaterialToDeck } from "../shared/calculus_material_adapter.js";
import { buildTopicRuntime } from "../shared/deck_model.js";
import { valuesAtTimelineTime } from "../shared/calculus/core/state.js";
import { computeFunctionTransform } from "../shared/calculus/widgets/function_transform.js";
import { computeLimitEpsilon } from "../shared/calculus/widgets/limit_epsilon.js";
import { computeSecantTangent } from "../shared/calculus/widgets/secant_tangent.js";
import { computeRiemannIntegral } from "../shared/calculus/widgets/riemann_integral.js";
import { computeUnitCircleTrig } from "../shared/calculus/widgets/unit_circle_trig.js";
import { listCalculusWidgets } from "../shared/calculus/registry.js";
import { compileExpression } from "../shared/calculus/core/plot_spec.js";
import { clippedLinePath, plotScales } from "../shared/calculus/core/svg_plot.js";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function collectBlocksFromSlide(slide) {
  return [
    ...asArray(slide.blocks),
    ...asArray(slide.left?.blocks),
    ...asArray(slide.right?.blocks),
  ];
}

function collectMediaFromSlide(slide) {
  return [
    slide.media,
    slide.left?.media,
    slide.right?.media,
  ].filter(Boolean);
}

function nearlyEqual(actual, expected, tolerance = 1e-9) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `expected ${actual} to be within ${tolerance} of ${expected}`);
}

const material = JSON.parse(
  await readFile("courses/Calculus/Materials/review_of_functions_and_graphs.json", "utf8"),
);

const adapted = adaptCalculusMaterialToDeck(material, {
  schoolName: "Arian University",
  courseTitle: "Calculus 1",
  topic: "01_review_of_functions_and_graphs",
});
const runtime = buildTopicRuntime({
  topicMeta: adapted.topicMeta,
  slidesData: adapted.slidesData,
  topicFallback: "01_review_of_functions_and_graphs",
});

const blocks = runtime.slides.flatMap(collectBlocksFromSlide);
const media = runtime.slides.flatMap(collectMediaFromSlide);

assert.ok(blocks.some((block) => block.type === "formula_block"), "formula blocks should normalize from material");
assert.ok(blocks.some((block) => block.type === "misconception_compare"), "misconception comparison should normalize from mistake text");
assert.ok(blocks.some((block) => block.type === "math_table"), "markdown step tables should become math_table blocks");
assert.ok(blocks.some((block) => block.type === "proof_sketch"), "challenge/theorem step content should become proof_sketch blocks");
assert.ok(blocks.some((block) => block.type === "pause_and_reveal"), "youtube pause prompts should become pause_and_reveal blocks");
assert.ok(media.some((item) => item.kind === "calculus_widget"), "recognized visuals should become calculus widgets");
assert.ok(
  !media.some((item) => item.widget === "riemann_integral" && /vending/i.test(`${item.title || ""} ${item.sourceSpec || ""}`)),
  "concept art rectangles should not be classified as Riemann/integral widgets",
);
assert.ok(
  media.some((item) => item.kind === "calculus_widget" && item.scriptedTimeline?.length >= 2),
  "calculus widgets should carry scripted timelines",
);
assert.ok(
  media.some((item) => item.widget === "function_analysis" && item.variant === "domain_sqrt_shift"),
  "domain/range examples should synthesize function analysis widgets",
);
assert.ok(
  media.some((item) => item.widget === "function_analysis" && item.variant === "product_even_odd"),
  "even/odd product proof slides should synthesize function analysis widgets",
);
assert.ok(
  blocks.some((block) => asArray(block.steps).some((step) => step.widgetParams))
    || blocks.some((block) => asArray(block.rowActions).some((action) => action?.widgetParams)),
  "worked steps or table rows should be able to drive widget parameters",
);

for (const block of blocks) {
  assert.equal(typeof block.id, "string", "normalized blocks must keep targetable ids");
  assert.notEqual(block.id.trim(), "", "normalized block ids must be non-empty");
}

const transformed = computeFunctionTransform({ family: "quadratic", a: 2, b: 1, h: 1, k: 3 });
nearlyEqual(transformed.g(1), 3);
nearlyEqual(transformed.vertex[0], 1);
nearlyEqual(transformed.vertex[1], 3);

const limit = computeLimitEpsilon({ a: 1, epsilon: 0.5, x: 1.1 });
assert.equal(limit.insideDelta, true);
assert.equal(limit.insideEpsilon, true);

const secant = computeSecantTangent({ a: 1, h: 0.1 });
nearlyEqual(secant.slope, 2.1, 1e-10);

const riemann = computeRiemannIntegral({ a: 0, b: 3, n: 6, method: "midpoint" });
assert.equal(riemann.rectangles.length, 6);
assert.equal(riemann.method, "midpoint");
assert.ok(riemann.sum > 0);

nearlyEqual(compileExpression("x*sin(1/x)")(0.2), 0.2 * Math.sin(5), 1e-9);
assert.throws(() => compileExpression("alert(1)"), /Unsafe|Unknown/);

const clippedPath = clippedLinePath([
  [-2, 9],
  [-1, 4],
  [0, 0],
  [1, 4],
  [2, 9],
], plotScales({ xDomain: [-2, 2], yDomain: [-1, 5] }));
assert.ok(clippedPath.includes("M "), "clipped curve should start a visible segment");
assert.ok(!clippedPath.includes("NaN"), "clipped curve should never produce NaN coordinates");

const asymptoteScales = plotScales({ xDomain: [-0.4, 4], yDomain: [-6, 6] });
const asymptotePath = clippedLinePath(
  Array.from({ length: 260 }, (_item, index) => {
    const x = -0.4 + (4.4 * index) / 259;
    if (x < 0) return [x, NaN];
    const denominator = Math.sqrt(x) - 1;
    return [x, Math.abs(denominator) < 0.03 ? NaN : 1 / denominator];
  }),
  asymptoteScales,
);
const boundaryPattern = new RegExp(`${asymptoteScales.y(6).toFixed(2)}|${asymptoteScales.y(-6).toFixed(2)}`, "g");
assert.ok(
  [...asymptotePath.matchAll(boundaryPattern)].length <= 4,
  "clipped asymptotes should touch plot bounds only at exits/entries, not flatten along them",
);

const scriptedValues = valuesAtTimelineTime([
  { t: 0, params: { n: 2, method: "left" } },
  { t: 10, params: { n: 12, method: "right" } },
], 5);
nearlyEqual(scriptedValues.n, 7);
assert.equal(scriptedValues.method, "right");

assert.ok(listCalculusWidgets().includes("unit_circle_trig"), "unit_circle_trig should be registered");

const unitCircle = computeUnitCircleTrig({ theta: Math.PI / 3, variant: "projections" });
nearlyEqual(unitCircle.cos, 0.5);
nearlyEqual(unitCircle.sin, Math.sqrt(3) / 2);
assert.equal(unitCircle.quadrant, 1);

const specialAngle = computeUnitCircleTrig({ variant: "special_angle", preset: "five_pi_over_3" });
nearlyEqual(specialAngle.theta, (5 * Math.PI) / 3);
assert.equal(specialAngle.quadrant, 4);
assert.equal(specialAngle.astc.label, "Cos");

const tangentFamily = computeFunctionTransform({ family: "tangent", a: 1, b: 1, h: 0, k: 0 });
nearlyEqual(tangentFamily.g(Math.PI / 4), 1);

const trigMaterial = JSON.parse(
  await readFile("courses/Calculus/Materials/trigonometry_and_graphing_review.json", "utf8"),
);
const trigVisualText = (trigMaterial.slides || [])
  .flatMap((slide) => [
    slide.title,
    slide.left?.visual_spec,
    slide.left?.content,
    slide.right?.visual_spec,
    slide.right?.content,
    slide.teacher_narration,
  ])
  .concat(trigMaterial.lecture_meta?.learning_objectives || [])
  .join(" ")
  .toLowerCase();
assert.ok(/unit circle|ferris|astc|reference angle|special angle/.test(trigVisualText), "trigonometry material should reference unit-circle visuals");
assert.ok(
  ["ferris_link", "projections", "astc", "reference_angle", "special_angle", "pythagorean"].every((variant) => {
    const model = computeUnitCircleTrig({
      variant,
      theta: Math.PI / 4,
      preset: variant === "special_angle" ? "pi_over_4" : undefined,
    });
    return Number.isFinite(model.sin) && Number.isFinite(model.cos);
  }),
  "unit_circle_trig variants should compute sin/cos for trigonometry review slides",
);

console.log("calculus architecture checks passed");
