import { createSvg, appendCurve, appendGrid, appendPlotTag, clearSvg, plotScales, svgEl } from "../core/svg_plot.js";
import { controlsForFlexPlot, drawFlexPlot, resolvePlotSpec } from "../core/plot_spec.js";
import { bindControls, buildStateFromControls, createWidgetShell, formatNumber, renderWidgetFormula } from "../core/widget_ui.js";

const CONTROLS = {
  composition_sqrt: [
    { name: "x", label: "x", min: -1, max: 4, step: 0.05, value: 0 },
  ],
  composition_exclusion: [
    { name: "x", label: "x", min: 0, max: 4, step: 0.05, value: 0 },
  ],
  domain_sqrt_shift: [
    { name: "x", label: "x", min: 3, max: 9, step: 0.05, value: 3 },
  ],
  symmetry_even_odd: [
    { name: "a", label: "a", min: 0.5, max: 2.6, step: 0.05, value: 1.5 },
  ],
  odd_rational: [
    { name: "a", label: "a", min: 0.5, max: 3.2, step: 0.05, value: 2 },
  ],
  product_even_odd: [
    { name: "a", label: "a", min: 0.5, max: 2.2, step: 0.05, value: 1.2 },
  ],
  piecewise: [
    { name: "x", label: "x", min: -2.5, max: 3.5, step: 0.05, value: 1.5 },
  ],
  approach_parabola: [
    { name: "x", label: "x", min: 0, max: 1.95, step: 0.01, value: 0.5 },
  ],
  rational_hole: [
    { name: "x", label: "x", min: 0, max: 3.8, step: 0.02, value: 0.5 },
  ],
  rational_hole_1: [
    { name: "x", label: "x", min: 0.5, max: 1.5, step: 0.001, value: 0.9 },
  ],
  abs_quotient: [
    { name: "x", label: "x", min: -1.8, max: 1.8, step: 0.02, value: -0.6 },
  ],
  piecewise_limit: [
    { name: "x", label: "x", min: 0, max: 4, step: 0.02, value: 1 },
  ],
  sin_reciprocal: [
    { name: "zoom", label: "zoom", min: 0.002, max: 1, step: 0.002, value: 0.3 },
  ],
  limit_sum: [
    { name: "x", label: "x", min: 0, max: 2, step: 0.02, value: 0.5 },
  ],
  limit_laws_sum_demo: [
    { name: "a", label: "a", min: -1, max: 4, step: 0.05, value: 2 },
  ],
  limit_product_quotient: [
    { name: "a", label: "a", min: -2, max: 3, step: 0.05, value: 1 },
  ],
  flex_plot: [],
};

function controlsForVariant(variant, spec = {}) {
  if (variant === "flex_plot") return controlsForFlexPlot(resolvePlotSpec(spec, spec.params || {}), spec);
  return CONTROLS[variant] || CONTROLS.composition_sqrt;
}

function point(svg, scales, xValue, yValue, className = "calculus-point") {
  if (!Number.isFinite(xValue) || !Number.isFinite(yValue)) return null;
  const circle = svgEl("circle", {
    cx: scales.x(xValue),
    cy: scales.y(yValue),
    r: 6,
    class: className,
  });
  svg.appendChild(circle);
  return circle;
}

function openPoint(svg, scales, xValue, yValue, className = "calculus-point open") {
  return point(svg, scales, xValue, yValue, className);
}

function guide(svg, scales, xValue, yValue) {
  if (!Number.isFinite(xValue) || !Number.isFinite(yValue)) return;
  svg.appendChild(svgEl("line", {
    x1: scales.x(xValue),
    y1: scales.y(0),
    x2: scales.x(xValue),
    y2: scales.y(yValue),
    class: "calculus-guide",
  }));
  svg.appendChild(svgEl("line", {
    x1: scales.x(0),
    y1: scales.y(yValue),
    x2: scales.x(xValue),
    y2: scales.y(yValue),
    class: "calculus-guide",
  }));
}

function appendSegment(svg, scales, points, attrs = {}) {
  const d = points
    .filter(([xValue, yValue]) => Number.isFinite(xValue) && Number.isFinite(yValue))
    .map(([xValue, yValue], index) => `${index === 0 ? "M" : "L"} ${scales.x(xValue).toFixed(2)} ${scales.y(yValue).toFixed(2)}`)
    .join(" ");
  svg.appendChild(svgEl("path", {
    d,
    fill: "none",
    class: attrs.class || "calculus-curve",
    stroke: attrs.stroke || "#c65a28",
    "stroke-width": attrs.strokeWidth || 4,
  }));
}

function drawComposition(svg, shell, params, spec = {}) {
  const xValue = Number(params.x ?? 0);
  const gx = xValue + 1;
  const yValue = gx >= 0 ? Math.sqrt(gx) : NaN;
  const scales = plotScales({ xDomain: [-1.5, 4], yDomain: [-0.5, 3] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, (x) => (x + 1 >= 0 ? Math.sqrt(x + 1) : NaN), { stroke: "#c65a28", strokeWidth: 4 });
  guide(svg, scales, xValue, yValue);
  point(svg, scales, xValue, yValue);
  appendPlotTag(svg, "domain starts at x=-1", { x: scales.x(-1) + 8, y: scales.y(0) - 8, tone: "muted" });
  appendPlotTag(svg, `x=${formatNumber(xValue, 2)}  g(x)=${formatNumber(gx, 2)}  f(g(x))=${formatNumber(yValue, 2)}`, {
    x: scales.width - (scales.paddingRight ?? scales.padding),
    y: 24,
    anchor: "end",
    tone: "accent",
  });
  renderWidgetFormula(shell, spec, `(f\\circ g)(x)=\\sqrt{x+1}\\quad x\\ge -1`, { fallback: "f" });
}

function drawDomainSqrt(svg, shell, params, spec = {}) {
  const xValue = Number(params.x ?? 3);
  const yValue = Math.sqrt(Math.max(0, xValue - 3)) + 2;
  const scales = plotScales({ xDomain: [2, 10], yDomain: [1, 5.5] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, (x) => (x >= 3 ? Math.sqrt(x - 3) + 2 : NaN), { stroke: "#c65a28", strokeWidth: 4 });
  guide(svg, scales, xValue, yValue);
  point(svg, scales, 3, 2, "calculus-point warn");
  point(svg, scales, xValue, yValue);
  appendPlotTag(svg, "endpoint (3, 2)", { x: scales.x(3) + 10, y: scales.y(2) - 10, tone: "warn" });
  appendPlotTag(svg, "domain [3,inf)  |  range [2,inf)", {
    x: scales.width - (scales.paddingRight ?? scales.padding),
    y: 24,
    anchor: "end",
    tone: "accent",
  });
  renderWidgetFormula(shell, spec, `f(x)=\\sqrt{x-3}+2`, { fallback: "f" });
}

function drawCompositionExclusion(svg, shell, params, spec = {}) {
  const xValue = Number(params.x ?? 0);
  const denominator = Math.sqrt(Math.max(0, xValue)) - 1;
  const yValue = xValue >= 0 && Math.abs(denominator) > 0.03 ? 1 / denominator : NaN;
  const f = (x) => {
    if (x < 0) return NaN;
    const denom = Math.sqrt(x) - 1;
    return Math.abs(denom) < 0.03 ? NaN : 1 / denom;
  };
  const scales = plotScales({ xDomain: [-0.4, 4], yDomain: [-6, 6] });
  appendGrid(svg, scales);
  svg.appendChild(svgEl("line", {
    x1: scales.x(1),
    y1: scales.paddingTop ?? scales.padding,
    x2: scales.x(1),
    y2: scales.height - (scales.paddingBottom ?? scales.padding),
    class: "calculus-guide",
  }));
  appendCurve(svg, scales, f, { stroke: "#c65a28", strokeWidth: 4 });
  if (Number.isFinite(yValue)) {
    guide(svg, scales, xValue, yValue);
    point(svg, scales, xValue, yValue);
    appendPlotTag(svg, `x=${formatNumber(xValue, 2)}, value=${formatNumber(yValue, 2)}`, {
      x: scales.x(xValue) + 8,
      y: Math.max(28, Math.min(scales.height - 18, scales.y(yValue) - 8)),
      tone: "accent",
    });
  } else {
    appendPlotTag(svg, `x=${formatNumber(xValue, 2)} is excluded`, {
      x: scales.x(Math.max(0, Math.min(1, xValue))) + 8,
      y: 46,
      tone: "warn",
    });
  }
  appendPlotTag(svg, "domain [0,1) U (1,inf)", { x: scales.width - (scales.paddingRight ?? scales.padding), y: 24, anchor: "end", tone: "accent" });
  appendPlotTag(svg, "vertical break at x=1", { x: scales.x(1) + 8, y: scales.height - 24, tone: "warn" });
  renderWidgetFormula(shell, spec, `(f\\circ g)(x)=\\frac{1}{\\sqrt{x}-1}\\qquad x\\ge0,\\;x\\ne1`, { fallback: "f" });
}

function drawSymmetryEvenOdd(svg, shell, params, spec = {}) {
  const a = Math.abs(Number(params.a ?? 1.5));
  const scales = plotScales({ xDomain: [-3, 3], yDomain: [-5, 5] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, (x) => x ** 2 / 2, { stroke: "#64748b", strokeWidth: 3, class: "calculus-curve muted" });
  appendCurve(svg, scales, (x) => x ** 3 / 4, { stroke: "#c65a28", strokeWidth: 4 });
  point(svg, scales, a, a ** 2 / 2);
  point(svg, scales, -a, a ** 2 / 2);
  point(svg, scales, a, a ** 3 / 4, "calculus-point warn");
  point(svg, scales, -a, -(a ** 3 / 4), "calculus-point warn");
  appendPlotTag(svg, "gray even: mirror y-axis", { x: (scales.paddingLeft ?? scales.padding) + 8, y: 24, tone: "muted" });
  appendPlotTag(svg, "orange odd: origin symmetry", { x: scales.width - (scales.paddingRight ?? scales.padding), y: 24, anchor: "end", tone: "accent" });
  appendPlotTag(svg, `test a=${formatNumber(a, 2)}`, { x: scales.x(a) + 10, y: scales.y(a ** 3 / 4) - 8, tone: "accent" });
  renderWidgetFormula(shell, spec, `\\text{even: }f(-a)=f(a)\\qquad\\text{odd: }g(-a)=-g(a)`, { fallback: "f" });
}

function drawOddRational(svg, shell, params, spec = {}) {
  const a = Math.abs(Number(params.a ?? 2));
  const f = (x) => x ** 3 / (x ** 2 + 1);
  const yValue = f(a);
  const scales = plotScales({ xDomain: [-4, 4], yDomain: [-4, 4] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, f, { stroke: "#c65a28", strokeWidth: 4 });
  point(svg, scales, a, yValue);
  point(svg, scales, -a, -yValue, "calculus-point warn");
  appendPlotTag(svg, `(${formatNumber(a, 2)}, ${formatNumber(yValue, 2)})`, { x: scales.x(a) + 8, y: scales.y(yValue) - 8, tone: "accent" });
  appendPlotTag(svg, `(-${formatNumber(a, 2)}, -${formatNumber(yValue, 2)})`, { x: scales.x(-a) + 8, y: scales.y(-yValue) - 8, tone: "warn" });
  appendPlotTag(svg, "origin symmetry -> odd", { x: scales.width - (scales.paddingRight ?? scales.padding), y: 24, anchor: "end", tone: "accent" });
  renderWidgetFormula(shell, spec, `h(x)=\\frac{x^3}{x^2+1}\\qquad h(-x)=-h(x)`, { fallback: "f" });
}

function drawProductEvenOdd(svg, shell, params, spec = {}) {
  const a = Math.abs(Number(params.a ?? 1.2));
  const h = (x) => x * (x ** 2 + 1) / 3;
  const yValue = h(a);
  const scales = plotScales({ xDomain: [-3, 3], yDomain: [-5, 5] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, h, { stroke: "#c65a28", strokeWidth: 4 });
  point(svg, scales, a, yValue);
  point(svg, scales, -a, -yValue, "calculus-point warn");
  appendPlotTag(svg, "f even, g odd => h=fg odd", { x: scales.width - (scales.paddingRight ?? scales.padding), y: 24, anchor: "end", tone: "accent" });
  appendPlotTag(svg, `h(-a)=-h(a), a=${formatNumber(a, 2)}`, { x: scales.x(a) + 8, y: scales.y(yValue) - 8, tone: "muted" });
  renderWidgetFormula(shell, spec, `h(-x)=f(-x)g(-x)=f(x)(-g(x))=-h(x)`, { fallback: "f" });
}

function piecewiseValue(x) {
  if (x < 0) return x ** 2;
  if (x <= 2) return 2 * x + 1;
  return 5 - x;
}

function drawPiecewise(svg, shell, params, spec = {}) {
  const xValue = Number(params.x ?? 1.5);
  const yValue = piecewiseValue(xValue);
  const scales = plotScales({ xDomain: [-3, 4], yDomain: [-0.5, 6] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, (x) => (x < 0 ? x ** 2 : NaN), { stroke: "#64748b", strokeWidth: 3 });
  appendSegment(svg, scales, [[0, 1], [2, 5]], { stroke: "#c65a28", strokeWidth: 4 });
  appendCurve(svg, scales, (x) => (x > 2 ? 5 - x : NaN), { stroke: "#2563eb", strokeWidth: 3 });
  openPoint(svg, scales, 0, 0, "calculus-point open muted");
  point(svg, scales, 0, 1);
  point(svg, scales, 2, 5);
  openPoint(svg, scales, 2, 3, "calculus-point open blue");
  point(svg, scales, xValue, yValue);
  appendPlotTag(svg, `f(${formatNumber(xValue, 2)})=${formatNumber(yValue, 2)}`, { x: scales.x(xValue) + 8, y: scales.y(yValue) - 8, tone: "accent" });
  appendPlotTag(svg, "hollow = excluded | filled = included", { x: scales.width - (scales.paddingRight ?? scales.padding), y: 24, anchor: "end", tone: "muted" });
  renderWidgetFormula(shell, spec, `f(x)=\\begin{cases}x^2,&x<0\\\\2x+1,&0\\le x\\le2\\\\5-x,&x>2\\end{cases}`, { fallback: "f" });
}

function rationalHoleValue(x, a) {
  if (Math.abs(x - a) < 0.0008) return NaN;
  return (x * x - a * a) / (x - a);
}

function drawApproachParabola(svg, shell, params, spec = {}) {
  const a = Number(spec.params?.a ?? 2);
  const L = a * a;
  const xValue = Number(params.x ?? 0.5);
  const yValue = xValue * xValue;
  const scales = plotScales({ xDomain: [-0.2, a + 0.6], yDomain: [-0.5, L + 1.5] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, (x) => x * x, { stroke: "#c65a28", strokeWidth: 4 });
  svg.appendChild(svgEl("line", {
    x1: scales.x(a),
    y1: scales.paddingTop ?? scales.padding,
    x2: scales.x(a),
    y2: scales.height - (scales.paddingBottom ?? scales.padding),
    class: "calculus-guide",
  }));
  svg.appendChild(svgEl("line", {
    x1: scales.paddingLeft ?? scales.padding,
    y1: scales.y(L),
    x2: scales.width - (scales.paddingRight ?? scales.padding),
    y2: scales.y(L),
    class: "calculus-guide",
  }));
  guide(svg, scales, xValue, yValue);
  point(svg, scales, xValue, yValue);
  openPoint(svg, scales, a, L, "calculus-point open warn");
  appendPlotTag(svg, `x=${formatNumber(xValue, 2)}  f(x)=${formatNumber(yValue, 2)}`, {
    x: scales.x(xValue) + 8,
    y: Math.max(28, scales.y(yValue) - 10),
    tone: "accent",
  });
  appendPlotTag(svg, `|x-${formatNumber(a, 0)}|=${formatNumber(Math.abs(xValue - a), 2)}`, {
    x: scales.width - (scales.paddingRight ?? scales.padding),
    y: 24,
    anchor: "end",
    tone: "muted",
  });
  renderWidgetFormula(shell, spec, `f(x)=x^2\\qquad x\\to ${formatNumber(a, 0)}\\Rightarrow f(x)\\to ${formatNumber(L, 0)}`, { fallback: "f" });
}

function drawRationalHole(svg, shell, params, spec = {}) {
  const a = Number(spec.params?.a ?? params.a ?? 2);
  const L = rationalHoleValue(a - 0.001, a);
  const xValue = Number(params.x ?? 0.5);
  const yValue = rationalHoleValue(xValue, a);
  const showSimplified = params.showSimplified === true || spec.params?.showSimplified === true;
  const scales = plotScales({ xDomain: [Math.max(0, a - 1.5), a + 1.8], yDomain: [0, L + 2.5] });
  appendGrid(svg, scales);
  if (showSimplified) {
    appendCurve(svg, scales, (x) => x + a, { stroke: "#64748b", strokeWidth: 3, class: "calculus-curve muted" });
  }
  appendCurve(svg, scales, (x) => rationalHoleValue(x, a), { stroke: "#c65a28", strokeWidth: 4 });
  svg.appendChild(svgEl("line", {
    x1: scales.x(a),
    y1: scales.paddingTop ?? scales.padding,
    x2: scales.x(a),
    y2: scales.height - (scales.paddingBottom ?? scales.padding),
    class: "calculus-guide",
  }));
  svg.appendChild(svgEl("line", {
    x1: scales.paddingLeft ?? scales.padding,
    y1: scales.y(L),
    x2: scales.width - (scales.paddingRight ?? scales.padding),
    y2: scales.y(L),
    class: "calculus-guide",
  }));
  openPoint(svg, scales, a, L, "calculus-point open warn");
  if (Number.isFinite(yValue)) {
    guide(svg, scales, xValue, yValue);
    point(svg, scales, xValue, yValue);
    appendPlotTag(svg, `x=${formatNumber(xValue, 2)}, f(x)=${formatNumber(yValue, 2)}`, {
      x: scales.x(xValue) + 8,
      y: Math.max(28, scales.y(yValue) - 10),
      tone: "accent",
    });
  }
  appendPlotTag(svg, `hole at (${formatNumber(a, 0)}, ${formatNumber(L, 0)}) — limit = ${formatNumber(L, 0)}`, {
    x: scales.width - (scales.paddingRight ?? scales.padding),
    y: 24,
    anchor: "end",
    tone: "muted",
  });
  renderWidgetFormula(shell, spec, `f(x)=\\frac{x^2-${a * a}}{x-${a}}\\to x+${a}`, { fallback: "f" });
}

function drawRationalHole1(svg, shell, params, spec = {}) {
  drawRationalHole(svg, shell, params, { ...spec, params: { ...(spec.params || {}), a: 1 } });
}

function drawAbsQuotient(svg, shell, params, spec = {}) {
  const xValue = Number(params.x ?? -0.6);
  const absX = Math.abs(xValue);
  const yValue = absX < 0.02 ? NaN : xValue / absX;
  const hideLabels = params.hideLabels === true || spec.params?.hideLabels === true;
  const scales = plotScales({ xDomain: [-2.2, 2.2], yDomain: [-2.2, 2.2] });
  appendGrid(svg, scales);
  appendSegment(svg, scales, [[-2, -1], [-0.02, -1]], { stroke: "#2563eb", strokeWidth: 4 });
  appendSegment(svg, scales, [[0.02, 1], [2, 1]], { stroke: "#c65a28", strokeWidth: 4 });
  svg.appendChild(svgEl("line", {
    x1: scales.x(0),
    y1: scales.paddingTop ?? scales.padding,
    x2: scales.x(0),
    y2: scales.height - (scales.paddingBottom ?? scales.padding),
    class: "calculus-guide",
  }));
  openPoint(svg, scales, 0, 0, "calculus-point open");
  if (Number.isFinite(yValue)) {
    guide(svg, scales, xValue, yValue);
    point(svg, scales, xValue, yValue, xValue < 0 ? "calculus-point" : "calculus-point warn");
    appendPlotTag(svg, `x=${formatNumber(xValue, 2)}, f(x)=${formatNumber(yValue, 0)}`, {
      x: scales.x(xValue) + 8,
      y: Math.max(28, scales.y(yValue) - 10),
      tone: "accent",
    });
  } else if (hideLabels) {
    appendPlotTag(svg, "?", { x: scales.x(0), y: scales.y(0.6), tone: "warn" });
  }
  if (!hideLabels) {
    appendPlotTag(svg, "left → −1", { x: scales.x(-1.4), y: scales.y(-0.4), tone: "muted" });
    appendPlotTag(svg, "right → +1", { x: scales.x(0.8), y: scales.y(1.3), tone: "muted" });
  }
  renderWidgetFormula(shell, spec, `f(x)=\\frac{|x|}{x}`, { fallback: "f" });
}

function piecewiseLimitValue(x) {
  if (x < 2) return x + 1;
  if (x > 2) return -x + 5;
  return 4;
}

function drawPiecewiseLimit(svg, shell, params, spec = {}) {
  const xValue = Number(params.x ?? 1);
  const yValue = piecewiseLimitValue(xValue);
  const emphasizeMisconception = params.emphasizeMisconception === true || spec.params?.emphasizeMisconception === true;
  const scales = plotScales({ xDomain: [0, 4], yDomain: [0, 6] });
  appendGrid(svg, scales);
  appendSegment(svg, scales, [[0, 1], [2, 3]], { stroke: "#2563eb", strokeWidth: 4 });
  appendSegment(svg, scales, [[2, 3], [4, 1]], { stroke: "#c65a28", strokeWidth: 4 });
  svg.appendChild(svgEl("line", {
    x1: scales.x(2),
    y1: scales.paddingTop ?? scales.padding,
    x2: scales.x(2),
    y2: scales.height - (scales.paddingBottom ?? scales.padding),
    class: "calculus-guide",
  }));
  svg.appendChild(svgEl("line", {
    x1: scales.paddingLeft ?? scales.padding,
    y1: scales.y(3),
    x2: scales.width - (scales.paddingRight ?? scales.padding),
    y2: scales.y(3),
    class: "calculus-guide",
  }));
  point(svg, scales, 2, 4, emphasizeMisconception ? "calculus-point warn" : "calculus-point");
  openPoint(svg, scales, 2, 3, "calculus-point open");
  guide(svg, scales, xValue, yValue);
  point(svg, scales, xValue, yValue);
  appendPlotTag(svg, emphasizeMisconception ? "f(2)=4 ≠ limit" : "f(2)=4, limit=3", {
    x: scales.x(2) + 10,
    y: scales.y(4) - 8,
    tone: emphasizeMisconception ? "warn" : "accent",
  });
  appendPlotTag(svg, `limit = 3`, { x: scales.width - (scales.paddingRight ?? scales.padding), y: 24, anchor: "end", tone: "muted" });
  renderWidgetFormula(shell, spec, `f(x)=\\begin{cases}x+1,&x<2\\\\4,&x=2\\\\-x+5,&x>2\\end{cases}`, { fallback: "f" });
}

function drawSinReciprocal(svg, shell, params, spec = {}) {
  const zoom = Math.max(0.002, Number(params.zoom ?? 0.3));
  const xMin = zoom / 80;
  const scales = plotScales({ xDomain: [0, zoom], yDomain: [-1.4, 1.4] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, (x) => (x > 0 ? Math.sin(1 / x) : NaN), { stroke: "#c65a28", strokeWidth: 2 });
  svg.appendChild(svgEl("line", {
    x1: scales.x(0),
    y1: scales.paddingTop ?? scales.padding,
    x2: scales.x(0),
    y2: scales.height - (scales.paddingBottom ?? scales.padding),
    class: "calculus-guide",
  }));
  appendPlotTag(svg, `zoom x∈(0, ${formatNumber(zoom, 3)})`, {
    x: scales.width - (scales.paddingRight ?? scales.padding),
    y: 24,
    anchor: "end",
    tone: "accent",
  });
  appendPlotTag(svg, "oscillations speed up → no single limit", {
    x: (scales.paddingLeft ?? scales.padding) + 8,
    y: scales.height - 18,
    tone: "warn",
  });
  renderWidgetFormula(shell, spec, `f(x)=\\sin\\!\\left(\\frac{1}{x}\\right)`, { fallback: "f" });
}

function drawLimitSum(svg, shell, params, spec = {}) {
  const a = 1;
  const xValue = Number(params.x ?? 0.5);
  const f = (x) => 3 + (x - a) ** 2;
  const g = (x) => 5 - (x - a) ** 2;
  const scales = plotScales({ xDomain: [0, 2], yDomain: [0, 11] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, f, { stroke: "#2563eb", strokeWidth: 3 });
  appendCurve(svg, scales, g, { stroke: "#c65a28", strokeWidth: 3 });
  appendCurve(svg, scales, (x) => f(x) + g(x), { stroke: "#16a34a", strokeWidth: 4 });
  [3, 5, 8].forEach((level, index) => {
    svg.appendChild(svgEl("line", {
      x1: scales.paddingLeft ?? scales.padding,
      y1: scales.y(level),
      x2: scales.width - (scales.paddingRight ?? scales.padding),
      y2: scales.y(level),
      class: "calculus-guide",
    }));
    appendPlotTag(svg, `${["L=3", "M=5", "L+M=8"][index]}`, {
      x: scales.width - (scales.paddingRight ?? scales.padding),
      y: scales.y(level) - 6,
      anchor: "end",
      tone: index === 2 ? "accent" : "muted",
    });
  });
  guide(svg, scales, xValue, f(xValue) + g(xValue));
  point(svg, scales, xValue, f(xValue) + g(xValue), "calculus-point");
  renderWidgetFormula(shell, spec, `\\lim(f+g)=\\lim f+\\lim g=3+5=8`, { fallback: "f" });
}

function drawLimitLawsSumDemo(svg, shell, params, spec = {}) {
  const a = Number(params.a ?? 2);
  const f = (x) => x * x;
  const g = (x) => 2 * x + 1;
  const L = f(a);
  const M = g(a);
  const scales = plotScales({ xDomain: [-1, 4.5], yDomain: [-1, 14] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, f, { stroke: "#2563eb", strokeWidth: 3 });
  appendCurve(svg, scales, g, { stroke: "#c65a28", strokeWidth: 3 });
  appendCurve(svg, scales, (x) => f(x) + g(x), { stroke: "#16a34a", strokeWidth: 4 });
  svg.appendChild(svgEl("line", {
    x1: scales.x(a),
    y1: scales.paddingTop ?? scales.padding,
    x2: scales.x(a),
    y2: scales.height - (scales.paddingBottom ?? scales.padding),
    class: "calculus-guide",
  }));
  point(svg, scales, a, f(a));
  point(svg, scales, a, g(a), "calculus-point warn");
  point(svg, scales, a, f(a) + g(a), "calculus-point open");
  appendPlotTag(svg, `f→${formatNumber(L, 0)}, g→${formatNumber(M, 0)}, sum→${formatNumber(L + M, 0)}`, {
    x: scales.width - (scales.paddingRight ?? scales.padding),
    y: 24,
    anchor: "end",
    tone: "accent",
  });
  renderWidgetFormula(shell, spec, `\\lim(f+g)=\\lim f+\\lim g`, { fallback: "f+g" });
}

function drawLimitProductQuotient(svg, shell, params, spec = {}) {
  const a = Number(params.a ?? 1);
  const f = (x) => x * x;
  const g = (x) => x + 1;
  const fa = f(a);
  const ga = g(a);
  const prod = fa * ga;
  const quot = Math.abs(ga) > 0.001 ? fa / ga : NaN;
  const scales = plotScales({ xDomain: [-2.5, 3], yDomain: [-4, 10] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, f, { stroke: "#2563eb", strokeWidth: 3 });
  appendCurve(svg, scales, g, { stroke: "#c65a28", strokeWidth: 3 });
  appendCurve(svg, scales, (x) => f(x) * g(x), { stroke: "#16a34a", strokeWidth: 3, class: "calculus-curve" });
  if (Math.abs(g(a)) > 0.001) {
    appendCurve(svg, scales, (x) => (Math.abs(g(x)) > 0.001 ? f(x) / g(x) : NaN), {
      stroke: "#9333ea",
      strokeWidth: 3,
      class: "calculus-curve muted",
    });
  }
  svg.appendChild(svgEl("line", {
    x1: scales.x(a),
    y1: scales.paddingTop ?? scales.padding,
    x2: scales.x(a),
    y2: scales.height - (scales.paddingBottom ?? scales.padding),
    class: "calculus-guide",
  }));
  point(svg, scales, a, fa);
  point(svg, scales, a, ga, "calculus-point warn");
  if (Number.isFinite(prod)) point(svg, scales, a, prod, "calculus-point open");
  if (Number.isFinite(quot)) point(svg, scales, a, quot, "calculus-point open muted");
  appendPlotTag(svg, Number.isFinite(quot)
    ? `fg→${formatNumber(prod, 2)}, f/g→${formatNumber(quot, 2)}`
    : `fg→${formatNumber(prod, 2)}; g→0 blocks quotient`,
    { x: scales.width - (scales.paddingRight ?? scales.padding), y: 24, anchor: "end", tone: Number.isFinite(quot) ? "accent" : "warn" });
  renderWidgetFormula(shell, spec, `\\lim(fg)=\\lim f\\cdot\\lim g\\qquad\\lim\\frac{f}{g}=\\frac{\\lim f}{\\lim g}`, { fallback: "fg" });
}

const DRAWERS = {
  composition_sqrt: drawComposition,
  composition_exclusion: drawCompositionExclusion,
  domain_sqrt_shift: drawDomainSqrt,
  symmetry_even_odd: drawSymmetryEvenOdd,
  odd_rational: drawOddRational,
  product_even_odd: drawProductEvenOdd,
  piecewise: drawPiecewise,
  approach_parabola: drawApproachParabola,
  rational_hole: drawRationalHole,
  rational_hole_1: drawRationalHole1,
  abs_quotient: drawAbsQuotient,
  piecewise_limit: drawPiecewiseLimit,
  sin_reciprocal: drawSinReciprocal,
  limit_sum: drawLimitSum,
  limit_laws_sum_demo: drawLimitLawsSumDemo,
  limit_product_quotient: drawLimitProductQuotient,
  flex_plot: drawFlexPlot,
};

export function mountFunctionAnalysisWidget(root, spec = {}) {
  const shell = createWidgetShell(root, spec);
  const variant = spec.variant || "composition_sqrt";
  const controls = spec.interactive === false
    ? []
    : (spec.controls?.length ? spec.controls : controlsForVariant(variant, spec));
  const state = buildStateFromControls({ ...(spec.params || {}) }, controls);
  bindControls(root, shell.controls, controls, state);
  const svg = createSvg();
  shell.plot.appendChild(svg);

  const unsubscribe = state.subscribe((params) => {
    clearSvg(svg);
    const draw = DRAWERS[variant] || DRAWERS.composition_sqrt;
    draw(svg, shell, params, spec);
    const plot = resolvePlotSpec(spec, params);
    const formula = plot.formula || spec.formulaTex;
    if (formula) {
      renderWidgetFormula(shell, spec, formula, { fallback: spec.formulaLabel || "f" });
    }
    shell.readout.textContent = "";
  });

  return { state, destroy: unsubscribe };
}
