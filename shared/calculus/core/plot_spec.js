import { appendCurve, appendGrid, appendPlotTag, clippedLinePath, plotScales, sampleFunction, svgEl } from "./svg_plot.js";
import { formatNumber } from "./widget_ui.js";

const MATH_IDENTIFIERS = new Set([
  "abs", "sin", "cos", "tan", "sqrt", "exp", "log", "pi", "e",
]);

function normalizeExpression(expr) {
  let source = String(expr ?? "").trim();
  if (!source) return "NaN";
  source = source.replace(/\^/g, "**");
  while (/\|([^|]+)\|/.test(source)) {
    source = source.replace(/\|([^|]+)\|/g, "abs($1)");
  }
  source = source.replace(/(\d)([a-z(])/gi, "$1*$2");
  source = source.replace(/\)([a-z\d(])/gi, ")*$1");
  source = source.replace(/\bpi\b/gi, "PI");
  source = source.replace(/\be\b/g, "E");
  return source;
}

function assertSafeExpression(expr) {
  const raw = String(expr ?? "").trim();
  if (!raw) return;
  const stripped = raw.replace(/\|/g, "");
  if (!/^[0-9x+\-*/^().,\s_a-zA-Z]+$/.test(stripped)) {
    throw new Error(`Unsafe plot expression: ${raw}`);
  }
  const tokens = stripped.match(/[a-zA-Z_][a-zA-Z0-9_]*/g) || [];
  tokens.forEach((token) => {
    if (token !== "x" && !MATH_IDENTIFIERS.has(token.toLowerCase())) {
      throw new Error(`Unknown identifier in plot expression: ${token}`);
    }
  });
}

export function compileExpression(expr) {
  assertSafeExpression(expr);
  const source = normalizeExpression(expr);
  const fn = new Function(
    "x",
    "abs",
    "sin",
    "cos",
    "tan",
    "sqrt",
    "exp",
    "log",
    "PI",
    "E",
    `"use strict"; return (${source});`,
  );
  return (x) => {
    try {
      const value = fn(
        x,
        Math.abs,
        Math.sin,
        Math.cos,
        Math.tan,
        Math.sqrt,
        Math.exp,
        Math.log,
        Math.PI,
        Math.E,
      );
      return Number.isFinite(value) ? value : NaN;
    } catch {
      return NaN;
    }
  };
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function holeList(plot = {}) {
  const holes = asArray(plot.holes).length
    ? plot.holes
    : plot.excludeNear != null
      ? [plot.excludeNear]
      : [];
  return holes.map((hole) => Number(hole)).filter(Number.isFinite);
}

function withHoles(fn, holes = [], epsilon = 0.03) {
  if (!holes.length) return fn;
  return (x) => {
    for (const hole of holes) {
      if (Math.abs(x - hole) < epsilon) return NaN;
    }
    return fn(x);
  };
}

function rationalHoleValue(x, a) {
  if (Math.abs(x - a) < 0.0008) return NaN;
  return (x * x - a * a) / (x - a);
}

function piecewiseValueAt(x, plot = {}) {
  for (const branch of asArray(plot.branches)) {
    const xMin = Number(branch.xMin ?? branch.from);
    const xMax = Number(branch.xMax ?? branch.to);
    if (!Number.isFinite(xMin) || !Number.isFinite(xMax)) continue;
    if (x < xMin || x > xMax) continue;
    if (branch.openAtStart && Math.abs(x - xMin) < 1e-9) return NaN;
    if (branch.openAtEnd && Math.abs(x - xMax) < 1e-9) return NaN;
    return compileExpression(branch.expr)(x);
  }
  return NaN;
}

function probeExpression(plot = {}, params = {}) {
  if (plot.probeExpr) return plot.probeExpr;
  if (plot.plotType === "piecewise" && asArray(plot.branches).length) {
    return null;
  }
  const primary = curveList(plot)[0];
  return primary?.expr ?? null;
}

function probeYAt(x, plot = {}, params = {}) {
  if (plot.plotType === "rational_hole") {
    const a = Number(params[plot.holeParam || "a"] ?? plot.holeAt ?? 2);
    return rationalHoleValue(x, a);
  }
  if (plot.plotType === "piecewise") {
    return piecewiseValueAt(x, plot);
  }
  const expr = probeExpression(plot, params);
  if (!expr) return NaN;
  const holes = holeList(plot);
  return withHoles(compileExpression(expr), holes)(x);
}

function approachAt(plot = {}, params = {}) {
  const param = plot.approachParam || "a";
  const a = Number(params[param] ?? plot.approachAt);
  return Number.isFinite(a) ? a : NaN;
}

function curveList(plot = {}) {
  if (asArray(plot.curves).length) {
    return plot.curves.map((curve, index) => ({
      id: curve.id || `curve_${index + 1}`,
      expr: curve.expr ?? curve.y ?? "0",
      stroke: curve.stroke || curve.color || "#c65a28",
      strokeWidth: curve.strokeWidth || curve.width || 3,
      dashed: Boolean(curve.dashed),
      className: curve.class || curve.className || "calculus-curve",
    }));
  }
  if (plot.expr || plot.y) {
    return [{
      id: "f",
      expr: plot.expr || plot.y,
      stroke: plot.stroke || "#c65a28",
      strokeWidth: plot.strokeWidth || 4,
      dashed: false,
      className: "calculus-curve",
    }];
  }
  return [];
}

export function resolvePlotSpec(spec = {}, params = {}) {
  const base = spec.plot && typeof spec.plot === "object" ? spec.plot : {};
  const patch = params.plot && typeof params.plot === "object" ? params.plot : {};
  const plot = { ...base, ...patch };
  if (!plot.plotType) plot.plotType = base.plotType || patch.plotType || "y_equals";
  return plot;
}

export function controlsForFlexPlot(plot = {}, spec = {}) {
  if (asArray(spec.controls).length) return spec.controls;
  if (asArray(plot.controls).length) return plot.controls;

  const controls = [];
  if (plot.plotType === "squeeze" || plot.zoomParam || plot.useZoom) {
    controls.push({
      name: plot.zoomParam || "zoom",
      label: plot.zoomLabel || "zoom",
      min: plot.zoomMin ?? 0.002,
      max: plot.zoomMax ?? 1,
      step: plot.zoomStep ?? 0.002,
      value: plot.zoomDefault ?? 0.3,
    });
  }
  const symmetryPlot = plot.plotType === "symmetry_even_odd" || plot.plotType === "odd_symmetry";
  if (plot.probe !== false || symmetryPlot) {
    const probeName = plot.probeParam || (symmetryPlot ? "a" : "x");
    const [xMin = -2, xMax = 2] = plot.xDomain || [-2, 2];
    controls.push({
      name: probeName,
      label: plot.probeLabel || (symmetryPlot ? "a" : "x"),
      min: plot.probeMin ?? (symmetryPlot ? 0.5 : xMin),
      max: plot.probeMax ?? (symmetryPlot ? 2.6 : xMax),
      step: plot.probeStep ?? 0.02,
      value: plot.probeDefault ?? (symmetryPlot ? 1.5 : (xMin + xMax) / 2),
    });
  }
  if (plot.verticalParam || plot.verticalAt != null) {
    const [xMin = -2, xMax = 2] = plot.xDomain || [-2, 2];
    controls.push({
      name: plot.verticalParam || "a",
      label: plot.verticalLabel || "a",
      min: plot.verticalMin ?? xMin,
      max: plot.verticalMax ?? xMax,
      step: plot.verticalStep ?? 0.05,
      value: plot.verticalDefault ?? plot.verticalAt ?? 0,
    });
  }
  return controls;
}

function appendGuideLines(svg, scales, plot = {}) {
  asArray(plot.vLines).forEach((line) => {
    const x = Number(line.x ?? line.at);
    if (!Number.isFinite(x)) return;
    svg.appendChild(svgEl("line", {
      x1: scales.x(x),
      y1: scales.paddingTop ?? scales.padding,
      x2: scales.x(x),
      y2: scales.height - (scales.paddingBottom ?? scales.padding),
      class: line.class || "calculus-guide",
    }));
  });
  asArray(plot.hLines).forEach((line) => {
    const y = Number(line.y ?? line.at);
    if (!Number.isFinite(y)) return;
    svg.appendChild(svgEl("line", {
      x1: scales.paddingLeft ?? scales.padding,
      y1: scales.y(y),
      x2: scales.width - (scales.paddingRight ?? scales.padding),
      y2: scales.y(y),
      class: line.class || "calculus-guide",
    }));
  });
}

function appendMarkers(svg, scales, plot = {}) {
  asArray(plot.openPoints).forEach((point) => {
    const x = Number(point.x);
    const y = Number(point.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    const circle = svgEl("circle", {
      cx: scales.x(x),
      cy: scales.y(y),
      r: 6,
      class: point.class || "calculus-point open",
    });
    svg.appendChild(circle);
  });
  asArray(plot.filledPoints).forEach((point) => {
    const x = Number(point.x);
    const y = Number(point.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    const circle = svgEl("circle", {
      cx: scales.x(x),
      cy: scales.y(y),
      r: 6,
      class: point.class || "calculus-point",
    });
    svg.appendChild(circle);
  });
}

function drawYEquals(svg, scales, plot, params) {
  const holes = holeList(plot);
  curveList(plot).forEach((curve) => {
    const fn = withHoles(compileExpression(curve.expr), holes);
    appendCurve(svg, scales, fn, {
      stroke: curve.stroke,
      strokeWidth: curve.strokeWidth,
      class: curve.className,
      dashed: curve.dashed,
    });
  });
}

function drawRationalHole(svg, scales, plot, params) {
  const a = Number(params[plot.holeParam || "a"] ?? plot.holeAt ?? 2);
  const showSimplified = params.showSimplified === true || plot.showSimplified === true;
  const limitY = Number(plot.limitY ?? 2 * a);
  const fn = (x) => rationalHoleValue(x, a);
  if (showSimplified && plot.simplifiedExpr) {
    appendCurve(svg, scales, compileExpression(plot.simplifiedExpr), {
      stroke: "#64748b",
      strokeWidth: 3,
      class: "calculus-curve muted",
    });
  }
  appendCurve(svg, scales, fn, { stroke: "#c65a28", strokeWidth: 4 });
  appendGuideLines(svg, scales, {
    vLines: [{ x: a }, ...asArray(plot.vLines)],
    hLines: [{ y: limitY }, ...asArray(plot.hLines)],
  });
  appendMarkers(svg, scales, {
    openPoints: [{ x: a, y: limitY, class: "calculus-point open warn" }, ...asArray(plot.openPoints)],
    filledPoints: plot.filledPoints,
  });
}

function drawSymmetryEvenOdd(svg, scales, plot, params) {
  const a = Math.abs(Number(params[plot.probeParam || "a"] ?? plot.probeDefault ?? 1.5));
  const evenExpr = plot.evenExpr || "x*x/2";
  const oddExpr = plot.oddExpr || "x*x*x/4";
  appendCurve(svg, scales, compileExpression(evenExpr), {
    stroke: "#64748b",
    strokeWidth: 3,
    class: "calculus-curve muted",
  });
  appendCurve(svg, scales, compileExpression(oddExpr), { stroke: "#c65a28", strokeWidth: 4 });
  const evenFn = compileExpression(evenExpr);
  const oddFn = compileExpression(oddExpr);
  appendMarkers(svg, scales, {
    filledPoints: [
      { x: a, y: evenFn(a) },
      { x: -a, y: evenFn(-a) },
      { x: a, y: oddFn(a), class: "calculus-point warn" },
      { x: -a, y: oddFn(-a), class: "calculus-point warn" },
    ],
  });
}

function drawOddSymmetry(svg, scales, plot, params) {
  const a = Math.abs(Number(params[plot.probeParam || "a"] ?? plot.probeDefault ?? 2));
  const expr = plot.expr || plot.curves?.[0]?.expr || "0";
  const fn = compileExpression(expr);
  appendCurve(svg, scales, fn, { stroke: "#c65a28", strokeWidth: 4 });
  const yValue = fn(a);
  appendMarkers(svg, scales, {
    filledPoints: [
      { x: a, y: yValue },
      { x: -a, y: -yValue, class: "calculus-point warn" },
    ],
  });
}

function drawVerticalMarkers(svg, scales, plot, params) {
  const a = Number(params[plot.verticalParam || "a"] ?? plot.verticalAt);
  if (!Number.isFinite(a)) return;
  const markers = asArray(plot.verticalMarkers);
  curveList(plot).forEach((curve, index) => {
    const id = curve.id;
    if (markers.length && !markers.includes(id)) return;
    const y = withHoles(compileExpression(curve.expr), holeList(plot))(a);
    if (!Number.isFinite(y)) return;
    const tone = index === curveList(plot).length - 1 ? "calculus-point open" : index === 1 ? "calculus-point warn" : "calculus-point";
    appendMarkers(svg, scales, {
      filledPoints: [{ x: a, y, class: tone }],
    });
  });
}

function drawPiecewise(svg, scales, plot) {
  asArray(plot.branches).forEach((branch) => {
    const fn = compileExpression(branch.expr);
    const xMin = Number(branch.xMin ?? branch.from);
    const xMax = Number(branch.xMax ?? branch.to);
    const samples = sampleFunction(fn, [xMin, xMax], branch.samples || 120)
      .filter(([x]) => x >= xMin && x <= xMax);
    const path = clippedLinePath(samples, scales);
    if (!path) return;
    svg.appendChild(svgEl("path", {
      d: path,
      fill: "none",
      stroke: branch.stroke || "#c65a28",
      "stroke-width": branch.strokeWidth || 4,
      class: branch.class || "calculus-curve",
    }));
    if (branch.openAtStart) {
      const y = fn(xMin);
      if (Number.isFinite(y)) {
        svg.appendChild(svgEl("circle", {
          cx: scales.x(xMin),
          cy: scales.y(y),
          r: 6,
          class: "calculus-point open",
        }));
      }
    }
    if (branch.openAtEnd) {
      const y = fn(xMax);
      if (Number.isFinite(y)) {
        svg.appendChild(svgEl("circle", {
          cx: scales.x(xMax),
          cy: scales.y(y),
          r: 6,
          class: "calculus-point open",
        }));
      }
    }
  });
}

function drawSqueeze(svg, scales, plot, params) {
  const zoom = Math.max(0.002, Number(params[plot.zoomParam || "zoom"] ?? plot.zoomDefault ?? 0.3));
  const xMin = Number(plot.xMin ?? zoom / 80);
  const xMax = Number(plot.xMax ?? zoom);
  const mid = compileExpression(plot.mid || plot.midExpr || "0");
  const lower = compileExpression(plot.lower || plot.lowerExpr || "0");
  const upper = compileExpression(plot.upper || plot.upperExpr || "0");
  const localScales = plotScales({
    xDomain: [xMin, xMax],
    yDomain: plot.yDomain || [-1.4, 1.4],
  });
  appendGrid(svg, localScales);
  appendCurve(svg, localScales, lower, { stroke: "#64748b", strokeWidth: 2, class: "calculus-curve muted" });
  appendCurve(svg, localScales, upper, { stroke: "#64748b", strokeWidth: 2, class: "calculus-curve muted" });
  appendCurve(svg, localScales, mid, { stroke: "#c65a28", strokeWidth: 3 });
  svg.appendChild(svgEl("line", {
    x1: localScales.x(0),
    y1: localScales.padding,
    x2: localScales.x(0),
    y2: localScales.height - localScales.padding,
    class: "calculus-guide",
  }));
  appendPlotTag(svg, `x∈(0, ${formatNumber(xMax, 3)})`, {
    x: localScales.width - localScales.padding,
    y: 24,
    anchor: "end",
    tone: "accent",
  });
  if (plot.tag) {
    appendPlotTag(svg, plot.tag, {
      x: localScales.padding + 8,
      y: localScales.height - 18,
      tone: plot.tagTone || "muted",
    });
  }
  return localScales;
}

export function drawFlexPlot(svg, shell, params, spec = {}) {
  const plot = resolvePlotSpec(spec, params);
  const hideLabels = params.hideLabels === true || plot.hideLabels === true;

  if (plot.plotType === "squeeze") {
    drawSqueeze(svg, shell, plot, params);
    const formula = plot.formula || spec.formulaTex;
    if (formula && shell?.formula) {
      shell.formula.dataset.tex = formula;
    }
    return;
  }

  const scales = plotScales({
    xDomain: plot.xDomain || [-2, 4],
    yDomain: plot.yDomain || [-2, 6],
  });
  appendGrid(svg, scales);

  if (plot.plotType === "rational_hole") {
    drawRationalHole(svg, scales, plot, params);
  } else if (plot.plotType === "symmetry_even_odd") {
    drawSymmetryEvenOdd(svg, scales, plot, params);
  } else if (plot.plotType === "odd_symmetry") {
    drawOddSymmetry(svg, scales, plot, params);
  } else if (plot.plotType === "piecewise") {
    drawPiecewise(svg, scales, plot);
  } else {
    drawYEquals(svg, scales, plot, params);
  }

  if (plot.plotType !== "rational_hole") {
    appendGuideLines(svg, scales, plot);
  }

  const approachA = approachAt(plot, params);
  if (plot.approachLimit && Number.isFinite(approachA)) {
    const limitExpr = plot.limitExpr || plot.expr || curveList(plot)[0]?.expr || "x*x";
    const limitY = compileExpression(limitExpr)(approachA);
    svg.appendChild(svgEl("line", {
      x1: scales.x(approachA),
      y1: scales.paddingTop ?? scales.padding,
      x2: scales.x(approachA),
      y2: scales.height - (scales.paddingBottom ?? scales.padding),
      class: "calculus-guide",
    }));
    if (Number.isFinite(limitY)) {
      svg.appendChild(svgEl("line", {
        x1: scales.paddingLeft ?? scales.padding,
        y1: scales.y(limitY),
        x2: scales.width - (scales.paddingRight ?? scales.padding),
        y2: scales.y(limitY),
        class: "calculus-guide",
      }));
      appendMarkers(svg, scales, {
        openPoints: [{ x: approachA, y: limitY, class: "calculus-point open warn" }],
      });
    }
  }

  const verticalAt = Number(
    params[plot.verticalParam || "a"] ?? plot.verticalAt ?? plot.a,
  );
  if (Number.isFinite(verticalAt) && !plot.approachLimit) {
    svg.appendChild(svgEl("line", {
      x1: scales.x(verticalAt),
      y1: scales.paddingTop ?? scales.padding,
      x2: scales.x(verticalAt),
      y2: scales.height - (scales.paddingBottom ?? scales.padding),
      class: "calculus-guide",
    }));
  }

  if (plot.plotType !== "rational_hole" && plot.plotType !== "symmetry_even_odd" && plot.plotType !== "odd_symmetry") {
    appendMarkers(svg, scales, plot);
  }

  if (asArray(plot.verticalMarkers).length) {
    drawVerticalMarkers(svg, scales, plot, params);
  }

  const probeParam = plot.probeParam || "x";
  const probeX = Number(params[probeParam] ?? plot.probeDefault);
  if (Number.isFinite(probeX) && plot.probe !== false && plot.plotType !== "symmetry_even_odd") {
    const probeY = probeYAt(probeX, plot, params);
    if (Number.isFinite(probeY)) {
      svg.appendChild(svgEl("line", {
        x1: scales.x(probeX),
        y1: scales.y(0),
        x2: scales.x(probeX),
        y2: scales.y(probeY),
        class: "calculus-guide",
      }));
      svg.appendChild(svgEl("line", {
        x1: scales.x(0),
        y1: scales.y(probeY),
        x2: scales.x(probeX),
        y2: scales.y(probeY),
        class: "calculus-guide",
      }));
      const circle = svgEl("circle", {
        cx: scales.x(probeX),
        cy: scales.y(probeY),
        r: 6,
        class: probeX < (verticalAt || approachA || 0) ? "calculus-point" : "calculus-point warn",
      });
      svg.appendChild(circle);
      if (!hideLabels) {
        appendPlotTag(svg, `${probeParam}=${formatNumber(probeX, 2)}, y=${formatNumber(probeY, 2)}`, {
          x: scales.x(probeX) + 8,
          y: Math.max(28, scales.y(probeY) - 10),
          tone: "accent",
        });
      }
    } else if (hideLabels && Math.abs(probeX) < 0.05 && asArray(plot.branches).some((b) => b.expr === "-1" || b.expr === "1")) {
      appendPlotTag(svg, "?", { x: scales.x(0), y: scales.y(0.6), tone: "warn" });
    }
  }

  if (params.emphasizeMisconception && plot.plotType === "piecewise" && !hideLabels) {
    appendPlotTag(svg, "f(2)=4 ≠ limit", {
      x: scales.x(2) + 10,
      y: scales.y(4) - 8,
      tone: "warn",
    });
  }

  if (!hideLabels) {
    asArray(plot.tags).forEach((tag) => {
      appendPlotTag(svg, tag.text || tag, {
        x: tag.x != null ? scales.x(tag.x) : scales.width - (scales.paddingRight ?? scales.padding),
        y: tag.y != null ? scales.y(tag.y) : 24,
        anchor: tag.anchor || (tag.x == null ? "end" : "start"),
        tone: tag.tone || "muted",
      });
    });
  }

  if (plot.formula && shell?.formula) {
    shell.formula.dataset.tex = plot.formula;
  }
}

export function computeFlexPlot(params = {}, spec = {}) {
  const plot = resolvePlotSpec(spec, params);
  const probeParam = plot.probeParam || "x";
  const x = Number(params[probeParam] ?? plot.probeDefault ?? 0);
  const y = probeYAt(x, plot, params);
  return { plotType: plot.plotType, x, y };
}