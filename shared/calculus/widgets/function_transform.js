import { createSvg, appendCurve, appendGrid, appendPlotTag, clearSvg, plotScales, svgEl } from "../core/svg_plot.js";
import {
  bindControls,
  buildStateFromControls,
  createWidgetShell,
  formatNumber,
  formatSigned,
  renderTex,
  renderWidgetFormula,
  setWidgetReadout,
} from "../core/widget_ui.js";

const FAMILY_SPOTLIGHT_TEX = {
  linear: "f(x)=x",
  quadratic: "f(x)=x^2",
  power: "f(x)=\\sqrt{|x|}",
  polynomial: "f(x)=\\tfrac{x^3}{4}-x",
  rational: "f(x)=\\frac{1}{x}",
  sine: "f(x)=\\sin x",
  cosine: "f(x)=\\cos x",
  tangent: "f(x)=\\tan x",
  exponential: "f(x)=2^x",
  log: "f(x)=\\log_2 x",
  cubic: "f(x)=\\tfrac{x^3}{4}",
  absolute: "f(x)=|x|",
};

const DEFAULT_CONTROLS = [
  { name: "h", label: "h-shift", min: -3, max: 3, step: 0.1, value: 0 },
  { name: "k", label: "v-shift", min: -3, max: 3, step: 0.1, value: 0 },
  { name: "a", label: "a (vert)", min: -3, max: 3, step: 0.1, value: 1 },
  { name: "b", label: "b (horiz)", min: -3, max: 3, step: 0.1, value: 1 },
];

const EVEN_ODD_CONTROLS = [
  { name: "demoX", label: "x", min: 0.4, max: 2.4, step: 0.1, value: 1.2, digits: 1 },
  { name: "family", label: "curve", type: "select", value: "sine", options: [
    { value: "sine", label: "sin (odd)" },
    { value: "cosine", label: "cos (even)" },
  ] },
];

function baseFunction(name = "quadratic") {
  if (name === "linear") return (x) => x;
  if (name === "quadratic") return (x) => x ** 2;
  if (name === "power") return (x) => (x < 0 ? NaN : Math.sqrt(x));
  if (name === "polynomial") return (x) => x ** 3 / 4 - x;
  if (name === "rational") return (x) => (Math.abs(x) < 0.12 ? NaN : 1 / x);
  if (name === "exponential") return (x) => 2 ** x;
  if (name === "log") return (x) => (x <= 0 ? NaN : Math.log2(x));
  if (name === "sine") return (x) => Math.sin(x);
  if (name === "cosine") return (x) => Math.cos(x);
  if (name === "tangent") return (x) => Math.tan(x);
  if (name === "cubic") return (x) => x ** 3 / 4;
  if (name === "absolute") return (x) => Math.abs(x);
  return (x) => x ** 2;
}

function plotDomainsForFamily(family = "quadratic") {
  if (family === "log") return { xDomain: [0.08, 4], yDomain: [-2.2, 3] };
  if (family === "exponential") return { xDomain: [-2, 3], yDomain: [-0.5, 8] };
  if (family === "power") return { xDomain: [0, 4], yDomain: [-0.5, 2.2] };
  if (family === "rational") return { xDomain: [-4, 4], yDomain: [-4, 4] };
  if (family === "tangent") return { xDomain: [-1.35, 1.35], yDomain: [-4, 4] };
  if (family === "sine" || family === "cosine") return { xDomain: [-4, 4], yDomain: [-1.5, 1.5] };
  return { xDomain: [-4, 4], yDomain: [-2, 8] };
}

function drawFamilySpotlight(svg, shell, params, spec = {}) {
  const family = params.family || "linear";
  const f = baseFunction(family);
  const { xDomain, yDomain } = plotDomainsForFamily(family);
  clearSvg(svg);
  const scales = plotScales({ xDomain, yDomain });
  appendGrid(svg, scales);
  appendCurve(svg, scales, f, { stroke: "#c65a28", strokeWidth: 4, samples: 240 });
  appendPlotTag(svg, family, {
    x: (scales.paddingLeft ?? scales.padding) + 8,
    y: 28,
    tone: "accent",
  });
  renderWidgetFormula(
    shell,
    spec,
    FAMILY_SPOTLIGHT_TEX[family] || "f(x)",
    { fallback: "f" },
  );
  setWidgetReadout(shell.readout, family);
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

function miniGalleryDomains(name) {
  if (name === "exponential") return { xDomain: [-1, 2.2], yDomain: [-0.2, 4.5] };
  if (name === "log") return { xDomain: [0.12, 3], yDomain: [-1.8, 2.2] };
  if (name === "power") return { xDomain: [0, 3], yDomain: [-0.2, 2] };
  if (name === "tangent") return { xDomain: [-1.2, 1.2], yDomain: [-3.5, 3.5] };
  if (name === "rational") return { xDomain: [-3, 3], yDomain: [-3.5, 3.5] };
  return { xDomain: [-3, 3], yDomain: [-3, 5] };
}

function drawFamilyGallery(svg, highlightFamily = "") {
  clearSvg(svg);
  const width = 640;
  const height = 390;
  const active = String(highlightFamily || "").trim().toLowerCase();
  const names = [
    ["linear", (x) => x],
    ["quadratic", (x) => x ** 2],
    ["cubic", (x) => x ** 3 / 4],
    ["sine", (x) => Math.sin(x)],
    ["power", (x) => (x < 0 ? NaN : Math.sqrt(x))],
    ["tangent", (x) => Math.tan(x)],
    ["absolute", (x) => Math.abs(x)],
    ["rational", (x) => (Math.abs(x) < 0.2 ? NaN : 1 / x)],
    ["exponential", (x) => 2 ** x],
    ["log", (x) => (x <= 0 ? NaN : Math.log2(x))],
  ];
  names.forEach(([name, fn], index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    const x0 = 12 + col * (width / 4);
    const y0 = 18 + row * (height / 2);
    const isActive = !active || name === active;
    const group = svgEl("g", {
      transform: `translate(${x0} ${y0})`,
      class: `calculus-mini-plot${isActive && active ? " calculus-mini-plot--active" : ""}${!isActive && active ? " calculus-mini-plot--dim" : ""}`,
      opacity: !active || isActive ? 1 : 0.28,
    });
    const { xDomain, yDomain } = miniGalleryDomains(name);
    const scales = plotScales({ width: 140, height: 150, padding: 20, xDomain, yDomain });
    appendGrid(group, scales, { labels: false });
    appendCurve(group, scales, fn, {
      stroke: isActive && active ? "#c65a28" : "#9a341b",
      strokeWidth: isActive && active ? 3 : 2,
    });
    if (isActive && active) {
      group.appendChild(svgEl("rect", {
        x: 2,
        y: 2,
        width: 136,
        height: 146,
        rx: 8,
        fill: "none",
        stroke: "#c65a28",
        "stroke-width": 2.5,
        opacity: 0.9,
      }));
    }
    const label = group.appendChild(svgEl("text", {
      x: 8,
      y: 142,
      class: `calculus-mini-label${isActive && active ? " calculus-mini-label--active" : ""}`,
    }));
    label.textContent = name;
    svg.appendChild(group);
  });
}

function appendPeriodBracket(svg, scales, x0, x1, y, label) {
  const xa = scales.x(x0);
  const xb = scales.x(x1);
  const yp = scales.y(y);
  svg.appendChild(svgEl("line", {
    x1: xa,
    y1: yp,
    x2: xb,
    y2: yp,
    stroke: "#16a34a",
    "stroke-width": 3,
  }));
  svg.appendChild(svgEl("line", { x1: xa, y1: yp - 6, x2: xa, y2: yp + 6, stroke: "#16a34a", "stroke-width": 2 }));
  svg.appendChild(svgEl("line", { x1: xb, y1: yp - 6, x2: xb, y2: yp + 6, stroke: "#16a34a", "stroke-width": 2 }));
  appendPlotTag(svg, label, { x: (xa + xb) / 2, y: yp - 12, anchor: "middle", tone: "accent" });
}

function drawTrigPeriod(svg, shell, params, spec) {
  const family = params.family || "sine";
  const fn = baseFunction(family);
  const isTan = family === "tangent";
  const xMin = isTan ? -Math.PI : -Math.PI;
  const xMax = isTan ? 2 * Math.PI : 2 * Math.PI;
  const scales = plotScales({ xDomain: [xMin, xMax], yDomain: isTan ? [-4, 4] : [-1.4, 1.4] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, fn, { stroke: "#c65a28", strokeWidth: 4, samples: 240 });

  if (isTan) {
    appendPeriodBracket(svg, scales, 0, Math.PI, 2.8, "period π");
    appendPeriodBracket(svg, scales, Math.PI, 2 * Math.PI, 2.2, "period π");
    appendPlotTag(svg, "tan(θ+π) = tan θ", { x: (scales.paddingLeft ?? scales.padding) + 8, y: 28, tone: "accent" });
    renderWidgetFormula(shell, spec, "\\tan(\\theta+\\pi)=\\tan\\theta", { fallback: "\\tan" });
  } else {
    appendPeriodBracket(svg, scales, 0, 2 * Math.PI, 1.15, "period 2π");
    appendPlotTag(svg, "sin(θ+2π) = sin θ", { x: (scales.paddingLeft ?? scales.padding) + 8, y: 28, tone: "accent" });
    appendPlotTag(svg, "cos(θ+2π) = cos θ", { x: (scales.paddingLeft ?? scales.padding) + 8, y: 48, tone: "muted" });
    renderWidgetFormula(shell, spec, "\\sin(\\theta+2\\pi)=\\sin\\theta", { fallback: "\\sin" });
  }
  shell.readout.textContent = isTan ? "tangent repeats every π" : "sine & cosine repeat every 2π";
}

function drawEvenOddDemo(svg, shell, params, spec) {
  const family = params.family || "sine";
  const demoX = Number(params.demoX ?? 1.2);
  const fn = baseFunction(family);
  const scales = plotScales({ xDomain: [-Math.PI, Math.PI], yDomain: [-1.4, 1.4] });
  appendGrid(svg, scales);
  appendCurve(svg, scales, fn, { stroke: "#c65a28", strokeWidth: 4, samples: 200 });

  svg.appendChild(svgEl("line", {
    x1: scales.x(0),
    y1: scales.paddingTop ?? scales.padding,
    x2: scales.x(0),
    y2: scales.height - (scales.paddingBottom ?? scales.padding),
    class: "calculus-guide",
    stroke: "#94a3b8",
    "stroke-width": 1.5,
    "stroke-dasharray": "4 4",
  }));

  const ya = fn(demoX);
  const yb = fn(-demoX);
  const points = [
    { x: demoX, y: ya, label: `f(${formatNumber(demoX, 1)})` },
    { x: -demoX, y: yb, label: `f(${formatSigned(-demoX, 1)})` },
  ];
  points.forEach((pt) => {
    svg.appendChild(svgEl("circle", {
      cx: scales.x(pt.x),
      cy: scales.y(pt.y),
      r: 7,
      class: "calculus-point",
    }));
    appendPlotTag(svg, `${pt.label}=${formatNumber(pt.y, 3)}`, {
      x: scales.x(pt.x) + (pt.x >= 0 ? 10 : -10),
      y: scales.y(pt.y) - 12,
      anchor: pt.x >= 0 ? "start" : "end",
      tone: "accent",
    });
  });

  if (family === "cosine") {
    appendPlotTag(svg, "even: f(−x) = f(x)", { x: scales.width / 2, y: 24, anchor: "middle", tone: "accent" });
    renderWidgetFormula(shell, spec, "\\cos(-\\theta)=\\cos\\theta", { fallback: "\\cos" });
  } else {
    appendPlotTag(svg, "odd: f(−x) = −f(x)", { x: scales.width / 2, y: 24, anchor: "middle", tone: "accent" });
    renderWidgetFormula(shell, spec, "\\sin(-\\theta)=-\\sin\\theta", { fallback: "\\sin" });
  }
  shell.readout.textContent = `x=${formatNumber(demoX, 1)}  f(x)=${formatNumber(ya, 3)}  f(−x)=${formatNumber(yb, 3)}`;
}

export function mountFunctionTransformWidget(root, spec = {}) {
  const shell = createWidgetShell(root, spec);
  const variant = spec.variant || spec.plot?.variant || "";
  const controls = variant === "family_gallery" || variant === "family_spotlight"
    ? (Array.isArray(spec.controls) ? spec.controls : [])
    : variant === "even_odd_demo"
      ? (spec.controls?.length ? spec.controls : EVEN_ODD_CONTROLS)
      : variant === "trig_period"
        ? []
        : (spec.controls?.length ? spec.controls : DEFAULT_CONTROLS);
  const state = buildStateFromControls({
    family: spec.params?.family || spec.plot?.family || "quadratic",
    a: 1,
    b: 1,
    h: 0,
    k: 0,
    demoX: 1.2,
    ...(spec.params || {}),
  }, controls);

  bindControls(root, shell.controls, controls, state);
  const svg = createSvg();
  shell.plot.appendChild(svg);

  const unsubscribe = state.subscribe((params) => {
    if (variant === "family_gallery") {
      clearSvg(svg);
      const highlightFamily = params.family || params.highlightFamily || "";
      drawFamilyGallery(svg, highlightFamily);
      renderWidgetFormula(shell, spec, "\\text{function families}", { fallback: "f" });
      setWidgetReadout(shell.readout, highlightFamily || "");
      return;
    }

    if (variant === "family_spotlight") {
      drawFamilySpotlight(svg, shell, params, spec);
      return;
    }

    if (variant === "trig_period") {
      clearSvg(svg);
      drawTrigPeriod(svg, shell, params, spec);
      return;
    }

    if (variant === "even_odd_demo") {
      clearSvg(svg);
      drawEvenOddDemo(svg, shell, params, spec);
      return;
    }

    const model = computeFunctionTransform(params);
    clearSvg(svg);
    const { xDomain, yDomain } = plotDomainsForFamily(model.family);
    const scales = plotScales({ xDomain, yDomain });
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
      x: scales.width - (scales.paddingRight ?? scales.padding),
      y: 24,
      anchor: "end",
      tone: "muted",
    });

    const shortByFamily = {
      sine: "\\sin",
      cosine: "\\cos",
      tangent: "\\tan",
      quadratic: "f",
    };
    renderWidgetFormula(shell, spec, model.tex, {
      fallback: shortByFamily[model.family] || "f",
    });
    shell.readout.textContent = "";
  });

  return { state, destroy: unsubscribe };
}