import { createSvg, appendCurve, appendGrid, appendPlotTag, clearSvg, plotScales, svgEl } from "../core/svg_plot.js";
import { bindControls, buildStateFromControls, createWidgetShell, formatNumber, formatSigned, renderTex } from "../core/widget_ui.js";

const DEFAULT_CONTROLS = [
  { name: "h", label: "horizontal shift h", min: -3, max: 3, step: 0.1, value: 0 },
  { name: "k", label: "vertical shift k", min: -3, max: 3, step: 0.1, value: 0 },
  { name: "a", label: "vertical factor a", min: -3, max: 3, step: 0.1, value: 1 },
  { name: "b", label: "horizontal factor b", min: -3, max: 3, step: 0.1, value: 1 },
];

function baseFunction(name = "quadratic") {
  if (name === "sine") return (x) => Math.sin(x);
  if (name === "cubic") return (x) => x ** 3 / 4;
  if (name === "absolute") return (x) => Math.abs(x);
  return (x) => x ** 2;
}

export function computeFunctionTransform(params = {}) {
  const a = Number(params.a ?? 1);
  const bRaw = Number(params.b ?? 1);
  const b = Math.abs(bRaw) < 0.05 ? 0.05 * Math.sign(bRaw || 1) : bRaw;
  const h = Number(params.h ?? 0);
  const k = Number(params.k ?? 0);
  const family = params.family || "quadratic";
  const f = baseFunction(family);
  return {
    a,
    b,
    h,
    k,
    family,
    f,
    g: (x) => a * f(b * (x - h)) + k,
    tex: `g(x)=${formatNumber(a, 2)}\\,f\\!\\left(${formatNumber(b, 2)}(x${formatSigned(-h, 2, { always: true })})\\right)${formatSigned(k, 2, { always: true })}`,
    vertex: [h, k],
  };
}

function drawFamilyGallery(svg) {
  clearSvg(svg);
  const width = 640;
  const height = 390;
  const names = [
    ["linear", (x) => x],
    ["quadratic", (x) => x ** 2],
    ["cubic", (x) => x ** 3 / 4],
    ["sine", (x) => Math.sin(x)],
    ["absolute", (x) => Math.abs(x)],
    ["rational", (x) => Math.abs(x) < 0.2 ? NaN : 1 / x],
    ["exponential", (x) => 2 ** x / 3],
    ["log", (x) => x <= 0 ? NaN : Math.log2(x)],
  ];
  names.forEach(([name, fn], index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    const x0 = 12 + col * (width / 4);
    const y0 = 18 + row * (height / 2);
    const group = svgEl("g", { transform: `translate(${x0} ${y0})`, class: "calculus-mini-plot" });
    const scales = plotScales({ width: 140, height: 150, padding: 20, xDomain: [-3, 3], yDomain: [-3, 5] });
    appendGrid(group, scales, { labels: false });
    appendCurve(group, scales, fn, { stroke: "#9a341b", strokeWidth: 2 });
    group.appendChild(svgEl("text", { x: 8, y: 142, class: "calculus-mini-label" })).textContent = name;
    svg.appendChild(group);
  });
}

export function mountFunctionTransformWidget(root, spec = {}) {
  const shell = createWidgetShell(root, spec);
  const variant = spec.variant || spec.plot?.variant || "";
  const controls = variant === "family_gallery" ? [] : (spec.controls?.length ? spec.controls : DEFAULT_CONTROLS);
  const state = buildStateFromControls({
    family: spec.params?.family || spec.plot?.family || "quadratic",
    a: 1,
    b: 1,
    h: 0,
    k: 0,
    ...(spec.params || {}),
  }, controls);

  bindControls(root, shell.controls, controls, state);
  const svg = createSvg();
  shell.plot.appendChild(svg);

  const unsubscribe = state.subscribe((params) => {
    if (variant === "family_gallery") {
      drawFamilyGallery(svg);
      renderTex(shell.formula, "\\text{Core function families have recognizable graph shapes.}", true);
      shell.readout.textContent = "";
      return;
    }

    const model = computeFunctionTransform(params);
    clearSvg(svg);
    const yDomain = model.family === "sine" ? [-4, 4] : [-2, 8];
    const scales = plotScales({ xDomain: [-4, 4], yDomain });
    appendGrid(svg, scales);
    appendCurve(svg, scales, model.f, { stroke: "#64748b", strokeWidth: 2, class: "calculus-curve muted" });
    appendCurve(svg, scales, model.g, { stroke: "#c65a28", strokeWidth: 4 });
    svg.appendChild(svgEl("circle", {
      cx: scales.x(model.vertex[0]),
      cy: scales.y(model.vertex[1]),
      r: 5,
      class: "calculus-point",
    }));
    appendPlotTag(svg, `vertex (${formatNumber(model.vertex[0], 2)}, ${formatNumber(model.vertex[1], 2)})`, {
      x: scales.x(model.vertex[0]) + 10,
      y: Math.max(26, scales.y(model.vertex[1]) - 10),
      tone: "accent",
    });
    appendPlotTag(svg, "gray: parent  •  orange: transformed", {
      x: scales.width - scales.padding,
      y: 24,
      anchor: "end",
      tone: "muted",
    });

    renderTex(shell.formula, model.tex, true);
    shell.readout.textContent = "";
  });

  return { state, destroy: unsubscribe };
}
