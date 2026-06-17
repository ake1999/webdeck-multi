import assert from "node:assert/strict";
import { compileExpression, computeFlexPlot, resolvePlotSpec } from "../shared/calculus/core/plot_spec.js";

const parabola = compileExpression("x^2");
assert.equal(parabola(3), 9);

const absQuotient = compileExpression("(x-3)/abs(x-3)");
assert.equal(absQuotient(2), -1);
assert.equal(absQuotient(4), 1);

const squeezeMid = compileExpression("x*sin(1/x)");
assert.ok(Math.abs(squeezeMid(0.1)) < 0.11);

assert.throws(() => compileExpression("process.exit()"), /Unsafe|Unknown/);

const plot = resolvePlotSpec(
  { plot: { plotType: "squeeze", mid: "x*sin(1/x)", lower: "-abs(x)", upper: "abs(x)" } },
  { plot: { mid: "sin(1/x)", lower: "-1", upper: "1" } },
);
assert.equal(plot.mid, "sin(1/x)");

const sample = computeFlexPlot(
  { x: 2, plot: { expr: "x^2", probeDefault: 2 } },
  { plot: { expr: "x^2" } },
);
assert.equal(sample.y, 4);

const hole = computeFlexPlot(
  { x: 1.5, a: 2 },
  { plot: { plotType: "rational_hole", holeAt: 2 } },
);
assert.equal(hole.y, 3.5);

const piece = computeFlexPlot(
  { x: 1 },
  {
    plot: {
      plotType: "piecewise",
      branches: [
        { expr: "x*x", xMin: -3, xMax: 0 },
        { expr: "2*x+1", xMin: 0, xMax: 2 },
      ],
    },
  },
);
assert.equal(piece.y, 3);

console.log("plot_spec tests passed");