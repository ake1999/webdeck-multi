import { createSvg, appendCurve, appendGrid, appendPlotTag, clearSvg, plotScales, svgEl } from "../core/svg_plot.js";
import { bindControls, buildStateFromControls, createWidgetShell, formatNumber, renderTex } from "../core/widget_ui.js";

const CONTROLS = {
  composition_sqrt: [
    { name: "x", label: "input x", min: -1, max: 4, step: 0.05, value: 0 },
  ],
  composition_exclusion: [
    { name: "x", label: "input x", min: 0, max: 4, step: 0.05, value: 0 },
  ],
  domain_sqrt_shift: [
    { name: "x", label: "input x", min: 3, max: 9, step: 0.05, value: 3 },
  ],
  symmetry_even_odd: [
    { name: "a", label: "test point a", min: 0.5, max: 2.6, step: 0.05, value: 1.5 },
  ],
  odd_rational: [
    { name: "a", label: "test point a", min: 0.5, max: 3.2, step: 0.05, value: 2 },
  ],
  product_even_odd: [
    { name: "a", label: "test point a", min: 0.5, max: 2.2, step: 0.05, value: 1.2 },
  ],
  piecewise: [
    { name: "x", label: "input x", min: -2.5, max: 3.5, step: 0.05, value: 1.5 },
  ],
};

function controlsForVariant(variant) {
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

function drawComposition(svg, shell, params) {
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
    x: scales.width - scales.padding,
    y: 24,
    anchor: "end",
    tone: "accent",
  });
  renderTex(shell.formula, `(f\\circ g)(x)=\\sqrt{x+1}\\quad x\\ge -1`, true);
}

function drawDomainSqrt(svg, shell, params) {
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
    x: scales.width - scales.padding,
    y: 24,
    anchor: "end",
    tone: "accent",
  });
  renderTex(shell.formula, `f(x)=\\sqrt{x-3}+2`, true);
}

function drawCompositionExclusion(svg, shell, params) {
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
    y1: scales.padding,
    x2: scales.x(1),
    y2: scales.height - scales.padding,
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
  appendPlotTag(svg, "domain [0,1) U (1,inf)", { x: scales.width - scales.padding, y: 24, anchor: "end", tone: "accent" });
  appendPlotTag(svg, "vertical break at x=1", { x: scales.x(1) + 8, y: scales.height - 24, tone: "warn" });
  renderTex(shell.formula, `(f\\circ g)(x)=\\frac{1}{\\sqrt{x}-1}\\qquad x\\ge0,\\;x\\ne1`, true);
}

function drawSymmetryEvenOdd(svg, shell, params) {
  const a = Math.abs(Number(params.a ?? 1.5));
  const scales = plotScales({ xDomain: [-3, 3], yDomain: [-5, 5] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, (x) => x ** 2 / 2, { stroke: "#64748b", strokeWidth: 3, class: "calculus-curve muted" });
  appendCurve(svg, scales, (x) => x ** 3 / 4, { stroke: "#c65a28", strokeWidth: 4 });
  point(svg, scales, a, a ** 2 / 2);
  point(svg, scales, -a, a ** 2 / 2);
  point(svg, scales, a, a ** 3 / 4, "calculus-point warn");
  point(svg, scales, -a, -(a ** 3 / 4), "calculus-point warn");
  appendPlotTag(svg, "gray even: mirror y-axis", { x: scales.padding + 8, y: 24, tone: "muted" });
  appendPlotTag(svg, "orange odd: origin symmetry", { x: scales.width - scales.padding, y: 24, anchor: "end", tone: "accent" });
  appendPlotTag(svg, `test a=${formatNumber(a, 2)}`, { x: scales.x(a) + 10, y: scales.y(a ** 3 / 4) - 8, tone: "accent" });
  renderTex(shell.formula, `\\text{even: }f(-a)=f(a)\\qquad\\text{odd: }g(-a)=-g(a)`, true);
}

function drawOddRational(svg, shell, params) {
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
  appendPlotTag(svg, "origin symmetry -> odd", { x: scales.width - scales.padding, y: 24, anchor: "end", tone: "accent" });
  renderTex(shell.formula, `h(x)=\\frac{x^3}{x^2+1}\\qquad h(-x)=-h(x)`, true);
}

function drawProductEvenOdd(svg, shell, params) {
  const a = Math.abs(Number(params.a ?? 1.2));
  const h = (x) => x * (x ** 2 + 1) / 3;
  const yValue = h(a);
  const scales = plotScales({ xDomain: [-3, 3], yDomain: [-5, 5] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, h, { stroke: "#c65a28", strokeWidth: 4 });
  point(svg, scales, a, yValue);
  point(svg, scales, -a, -yValue, "calculus-point warn");
  appendPlotTag(svg, "f even, g odd => h=fg odd", { x: scales.width - scales.padding, y: 24, anchor: "end", tone: "accent" });
  appendPlotTag(svg, `h(-a)=-h(a), a=${formatNumber(a, 2)}`, { x: scales.x(a) + 8, y: scales.y(yValue) - 8, tone: "muted" });
  renderTex(shell.formula, `h(-x)=f(-x)g(-x)=f(x)(-g(x))=-h(x)`, true);
}

function piecewiseValue(x) {
  if (x < 0) return x ** 2;
  if (x <= 2) return 2 * x + 1;
  return 5 - x;
}

function drawPiecewise(svg, shell, params) {
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
  appendPlotTag(svg, "hollow = excluded | filled = included", { x: scales.width - scales.padding, y: 24, anchor: "end", tone: "muted" });
  renderTex(shell.formula, `f(x)=\\begin{cases}x^2,&x<0\\\\2x+1,&0\\le x\\le2\\\\5-x,&x>2\\end{cases}`, true);
}

const DRAWERS = {
  composition_sqrt: drawComposition,
  composition_exclusion: drawCompositionExclusion,
  domain_sqrt_shift: drawDomainSqrt,
  symmetry_even_odd: drawSymmetryEvenOdd,
  odd_rational: drawOddRational,
  product_even_odd: drawProductEvenOdd,
  piecewise: drawPiecewise,
};

export function mountFunctionAnalysisWidget(root, spec = {}) {
  const shell = createWidgetShell(root, spec);
  const variant = spec.variant || "composition_sqrt";
  const controls = spec.interactive === false ? [] : (spec.controls?.length ? spec.controls : controlsForVariant(variant));
  const state = buildStateFromControls({ ...(spec.params || {}) }, controls);
  bindControls(root, shell.controls, controls, state);
  const svg = createSvg();
  shell.plot.appendChild(svg);

  const unsubscribe = state.subscribe((params) => {
    clearSvg(svg);
    const draw = DRAWERS[variant] || DRAWERS.composition_sqrt;
    draw(svg, shell, params);
    shell.readout.textContent = "";
  });

  return { state, destroy: unsubscribe };
}
