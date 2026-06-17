import { appendCurve, appendPlotTag, clearSvg, createSvg, plotScales, svgEl } from "../core/svg_plot.js";
import {
  bindControls,
  buildStateFromControls,
  createWidgetShell,
  formatNumber,
  renderTex,
  renderWidgetFormula,
} from "../core/widget_ui.js";

const DEFAULT_CONTROLS = [
  { name: "theta", label: "θ", min: 0, max: 2 * Math.PI, step: 0.02, value: Math.PI / 6, digits: 2 },
];

const SPECIAL_ANGLE_CONTROLS = [
  {
    name: "preset",
    label: "angle",
    type: "select",
    value: "pi_over_3",
    options: [
      { value: "pi_over_3", label: "π/3" },
      { value: "pi_over_4", label: "π/4" },
      { value: "five_pi_over_3", label: "5π/3" },
    ],
  },
];

const PRESET_THETA = {
  pi_over_3: Math.PI / 3,
  pi_over_4: Math.PI / 4,
  five_pi_over_3: (5 * Math.PI) / 3,
};

const ASTC_BY_QUADRANT = {
  1: { label: "All", sin: "+", cos: "+", tan: "+" },
  2: { label: "Sin", sin: "+", cos: "-", tan: "-" },
  3: { label: "Tan", sin: "-", cos: "-", tan: "+" },
  4: { label: "Cos", sin: "-", cos: "+", tan: "-" },
};

function normalizeTheta(theta) {
  let value = Number(theta) % (2 * Math.PI);
  if (value < 0) value += 2 * Math.PI;
  return value;
}

function quadrantFromTheta(theta) {
  const t = normalizeTheta(theta);
  if (t < Math.PI / 2) return 1;
  if (t < Math.PI) return 2;
  if (t < (3 * Math.PI) / 2) return 3;
  return 4;
}

function referenceAngle(theta) {
  const t = normalizeTheta(theta);
  const q = quadrantFromTheta(theta);
  if (q === 1) return t;
  if (q === 2) return Math.PI - t;
  if (q === 3) return t - Math.PI;
  return 2 * Math.PI - t;
}

function resolveTheta(params = {}) {
  const variant = params.variant || "projections";
  if (variant === "special_angle" && params.preset && PRESET_THETA[params.preset] != null) {
    return PRESET_THETA[params.preset];
  }
  if (Number.isFinite(Number(params.theta))) {
    return Number(params.theta);
  }
  if (params.preset && PRESET_THETA[params.preset] != null) {
    return PRESET_THETA[params.preset];
  }
  return Math.PI / 6;
}

export function computeUnitCircleTrig(params = {}) {
  const variant = params.variant || "projections";
  const preset = params.preset || "";
  const theta = resolveTheta({ ...params, variant });
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const tan = Math.abs(cos) < 1e-10 ? NaN : sin / cos;
  const quadrant = quadrantFromTheta(theta);
  const ref = referenceAngle(theta);
  const astc = ASTC_BY_QUADRANT[quadrant];

  return {
    variant,
    preset,
    theta,
    cos,
    sin,
    tan,
    quadrant,
    referenceAngle: ref,
    astc,
    point: [cos, sin],
    tex: `\\left(\\cos\\theta,\\sin\\theta\\right)=\\left(${formatNumber(cos, 3)},${formatNumber(sin, 3)}\\right)`,
  };
}

function controlsForVariant(variant) {
  if (variant === "special_angle") return SPECIAL_ANGLE_CONTROLS;
  return DEFAULT_CONTROLS;
}

function circlePoint(cx, cy, radius, theta) {
  return [cx + radius * Math.cos(theta), cy - radius * Math.sin(theta)];
}

function appendCircleAxes(group, cx, cy, radius) {
  group.appendChild(svgEl("line", {
    x1: cx - radius - 14,
    y1: cy,
    x2: cx + radius + 14,
    y2: cy,
    class: "calculus-guide",
  }));
  group.appendChild(svgEl("line", {
    x1: cx,
    y1: cy + radius + 14,
    x2: cx,
    y2: cy - radius - 14,
    class: "calculus-guide",
  }));
}

function appendUnitCircle(group, cx, cy, radius, attrs = {}) {
  group.appendChild(svgEl("circle", {
    cx,
    cy,
    r: radius,
    fill: attrs.fill || "none",
    class: attrs.class || "calculus-curve muted",
    stroke: attrs.stroke || "#64748b",
    "stroke-width": attrs.strokeWidth || 2,
  }));
}

function appendAngleArc(group, cx, cy, radius, theta, attrs = {}) {
  const end = circlePoint(cx, cy, radius * 0.34, theta);
  const large = theta > Math.PI ? 1 : 0;
  group.appendChild(svgEl("path", {
    d: `M ${cx + radius * 0.34} ${cy} A ${radius * 0.34} ${radius * 0.34} 0 ${large} 0 ${end[0].toFixed(2)} ${end[1].toFixed(2)}`,
    fill: "none",
    stroke: attrs.stroke || "#c65a28",
    "stroke-width": attrs.strokeWidth || 2,
    class: attrs.class || "calculus-curve",
  }));
}

function appendPointAndRay(group, cx, cy, radius, theta) {
  const [px, py] = circlePoint(cx, cy, radius, theta);
  group.appendChild(svgEl("line", {
    x1: cx,
    y1: cy,
    x2: px,
    y2: py,
    class: "calculus-guide",
    stroke: "#c65a28",
    "stroke-width": 2,
  }));
  group.appendChild(svgEl("circle", {
    cx: px,
    cy: py,
    r: 6,
    class: "calculus-point",
  }));
  return [px, py];
}

/** Tan only: extended ray from origin through the point to a vertical line at x = 1. */
function appendTanExtension(group, cx, cy, radius, model, layout = {}) {
  const tanLineX = layout.tanLineX ?? cx + radius + 52;
  const tanSpan = layout.tanSpan ?? radius + 28;

  group.appendChild(svgEl("line", {
    x1: tanLineX,
    y1: cy - tanSpan,
    x2: tanLineX,
    y2: cy + tanSpan,
    class: "calculus-guide",
    stroke: "#94a3b8",
    "stroke-width": 1.5,
  }));

  if (!Number.isFinite(model.tan) || Math.abs(model.cos) < 0.05) {
    appendPlotTag(group, "tan undef", { x: tanLineX + 8, y: cy, tone: "muted" });
    return;
  }

  const slope = model.sin / model.cos;
  const yAtTanLine = cy - slope * (tanLineX - cx);
  group.appendChild(svgEl("line", {
    x1: cx,
    y1: cy,
    x2: tanLineX,
    y2: yAtTanLine,
    stroke: "#c65a28",
    "stroke-width": 2,
    "stroke-dasharray": "6 4",
  }));
  group.appendChild(svgEl("line", {
    x1: tanLineX - 14,
    y1: yAtTanLine,
    x2: tanLineX + 14,
    y2: yAtTanLine,
    stroke: "#16a34a",
    "stroke-width": 4,
  }));
  appendPlotTag(group, `tan θ=${formatNumber(model.tan, 3)}`, { x: tanLineX + 10, y: yAtTanLine - 6, tone: "accent" });
}

/** Same sin/cos triangle as the Pythagorean slide: cos along x-axis, sin along y-axis. */
function appendSinCosTriangle(group, cx, cy, radius, theta, model, opts = {}) {
  const { showSquared = false, showTan = false, tanLayout = {} } = opts;
  const [px, py] = circlePoint(cx, cy, radius, theta);

  group.appendChild(svgEl("polygon", {
    points: `${cx},${cy} ${px},${cy} ${px},${py}`,
    fill: "rgba(198,90,40,0.12)",
    stroke: "#c65a28",
    "stroke-width": 2,
  }));
  group.appendChild(svgEl("line", {
    x1: px,
    y1: py,
    x2: px,
    y2: cy,
    stroke: "#dc2626",
    "stroke-width": 2,
    "stroke-dasharray": "5 4",
  }));
  group.appendChild(svgEl("line", {
    x1: cx,
    y1: py,
    x2: px,
    y2: py,
    stroke: "#2563eb",
    "stroke-width": 2,
    "stroke-dasharray": "5 4",
  }));

  if (showSquared) {
    appendPlotTag(group, `cos²=${formatNumber(model.cos * model.cos, 3)}`, {
      x: (cx + px) / 2,
      y: cy + 18,
      anchor: "middle",
      tone: "muted",
    });
    appendPlotTag(group, `sin²=${formatNumber(model.sin * model.sin, 3)}`, {
      x: px + 14,
      y: (cy + py) / 2,
      tone: "accent",
    });
  } else {
    group.appendChild(svgEl("text", {
      x: (cx + px) / 2,
      y: cy + 16,
      class: "calculus-mini-label",
      "text-anchor": "middle",
    })).textContent = `cos θ = ${formatNumber(model.cos, 3)}`;
    group.appendChild(svgEl("text", {
      x: px + 12,
      y: (cy + py) / 2,
      class: "calculus-mini-label",
    })).textContent = `sin θ = ${formatNumber(model.sin, 3)}`;
  }

  if (showTan) appendTanExtension(group, cx, cy, radius, model, tanLayout);
  return [px, py];
}

function appendAstcRegions(group, cx, cy, radius) {
  const regions = [
    { start: 0, end: Math.PI / 2, fill: "rgba(34,197,94,0.12)", label: "All", x: cx + radius * 0.42, y: cy - radius * 0.42 },
    { start: Math.PI / 2, end: Math.PI, fill: "rgba(234,179,8,0.12)", label: "Sin", x: cx - radius * 0.42, y: cy - radius * 0.42 },
    { start: Math.PI, end: (3 * Math.PI) / 2, fill: "rgba(249,115,22,0.12)", label: "Tan", x: cx - radius * 0.42, y: cy + radius * 0.42 },
    { start: (3 * Math.PI) / 2, end: 2 * Math.PI, fill: "rgba(37,99,235,0.12)", label: "Cos", x: cx + radius * 0.42, y: cy + radius * 0.42 },
  ];
  regions.forEach((region) => {
    const start = circlePoint(cx, cy, radius, region.start);
    const end = circlePoint(cx, cy, radius, region.end);
    const large = region.end - region.start > Math.PI ? 1 : 0;
    group.appendChild(svgEl("path", {
      d: `M ${cx} ${cy} L ${start[0].toFixed(2)} ${start[1].toFixed(2)} A ${radius} ${radius} 0 ${large} 0 ${end[0].toFixed(2)} ${end[1].toFixed(2)} Z`,
      fill: region.fill,
      stroke: "none",
    }));
    const label = svgEl("text", {
      x: region.x,
      y: region.y,
      class: "calculus-mini-label",
      "text-anchor": "middle",
    });
    label.textContent = region.label;
    group.appendChild(label);
  });
}

function appendReferenceAngle(group, cx, cy, radius, theta, ref) {
  appendAngleArc(group, cx, cy, radius, theta, { stroke: "#c65a28" });
  if (Math.abs(ref - theta) > 0.02) {
    appendAngleArc(group, cx, cy, radius * 0.55, ref, { stroke: "#2563eb", strokeWidth: 2, class: "calculus-curve muted" });
    const [rx] = circlePoint(cx, cy, radius * 0.55, ref);
    appendPlotTag(group, "ref", { x: rx + 6, y: cy - 6, tone: "muted" });
  }
}

function appendPythagoreanBanner(svg, model) {
  const sin2 = model.sin * model.sin;
  const cos2 = model.cos * model.cos;
  const sum = sin2 + cos2;
  const banner = svgEl("g", { class: "calculus-pythag-banner" });
  banner.appendChild(svgEl("rect", {
    x: 24,
    y: 8,
    width: 592,
    height: 44,
    rx: 8,
    fill: "rgba(198,90,40,0.08)",
    stroke: "rgba(198,90,40,0.35)",
    "stroke-width": 1,
  }));
  const text = svgEl("text", {
    x: 320,
    y: 36,
    class: "calculus-mini-label",
    "text-anchor": "middle",
    "font-size": "13",
  });
  text.textContent = `sin²θ + cos²θ = ${formatNumber(sin2, 3)} + ${formatNumber(cos2, 3)} = ${formatNumber(sum, 3)}`;
  banner.appendChild(text);
  svg.appendChild(banner);
}

function drawFerrisLink(svg, shell, model, spec) {
  const cx = 150;
  const cy = 195;
  const radius = 118;
  const left = svgEl("g", { transform: "translate(0 52)" });
  const right = svgEl("g", { transform: "translate(300 52)" });

  appendUnitCircle(left, cx, cy, radius);
  appendCircleAxes(left, cx, cy, radius);
  appendAngleArc(left, cx, cy, radius, model.theta);
  appendPointAndRay(left, cx, cy, radius, model.theta);
  appendSinCosTriangle(left, cx, cy, radius, model.theta, model);

  const waveScales = plotScales({ width: 340, height: 338, padding: 34, xDomain: [0, 2 * Math.PI], yDomain: [-1.2, 1.2] });
  appendCurve(right, waveScales, Math.sin, { stroke: "#dc2626", strokeWidth: 3, samples: 180 });
  appendCurve(right, waveScales, Math.cos, { stroke: "#2563eb", strokeWidth: 3, samples: 180 });
  const sinX = waveScales.x(model.theta);
  const sinY = waveScales.y(model.sin);
  const cosY = waveScales.y(model.cos);
  right.appendChild(svgEl("line", {
    x1: sinX,
    y1: waveScales.y(0),
    x2: sinX,
    y2: sinY,
    stroke: "#dc2626",
    "stroke-width": 2,
    "stroke-dasharray": "4 4",
  }));
  right.appendChild(svgEl("line", {
    x1: waveScales.x(0),
    y1: cosY,
    x2: sinX,
    y2: cosY,
    stroke: "#2563eb",
    "stroke-width": 2,
    "stroke-dasharray": "4 4",
  }));
  right.appendChild(svgEl("circle", { cx: sinX, cy: sinY, r: 5, class: "calculus-point" }));
  right.appendChild(svgEl("circle", { cx: sinX, cy: cosY, r: 5, class: "calculus-point warn" }));
  appendPlotTag(right, "sin θ", { x: waveScales.padding + 6, y: sinY - 8, tone: "accent" });
  appendPlotTag(right, "cos θ", { x: sinX + 8, y: cosY - 8, tone: "muted" });

  svg.appendChild(left);
  svg.appendChild(right);

  renderWidgetFormula(shell, spec, `\\sin\\theta=${formatNumber(model.sin, 3)},\\;\\cos\\theta=${formatNumber(model.cos, 3)}`, { fallback: "\\sin,\\cos" });
  shell.readout.textContent = `θ=${formatNumber(model.theta, 2)}  sin=${formatNumber(model.sin, 3)}  cos=${formatNumber(model.cos, 3)}`;
}

function drawProjections(svg, shell, model, spec) {
  const cx = 300;
  const cy = 210;
  const radius = 130;
  appendUnitCircle(svg, cx, cy, radius);
  appendCircleAxes(svg, cx, cy, radius);
  appendAngleArc(svg, cx, cy, radius, model.theta);
  appendPointAndRay(svg, cx, cy, radius, model.theta);
  appendSinCosTriangle(svg, cx, cy, radius, model.theta, model);
  appendPlotTag(svg, `(${formatNumber(model.cos, 3)}, ${formatNumber(model.sin, 3)})`, {
    x: cx + model.cos * radius + 12,
    y: cy - model.sin * radius - 12,
    tone: "accent",
  });
  renderWidgetFormula(shell, spec, model.tex, { fallback: "\\sin\\theta,\\cos\\theta" });
  shell.readout.textContent = `θ=${formatNumber(model.theta, 2)}  sin=${formatNumber(model.sin, 3)}  cos=${formatNumber(model.cos, 3)}`;
}

function drawAstc(svg, shell, model, spec) {
  const cx = 300;
  const cy = 210;
  const radius = 130;
  appendAstcRegions(svg, cx, cy, radius);
  appendUnitCircle(svg, cx, cy, radius);
  appendCircleAxes(svg, cx, cy, radius);
  appendAngleArc(svg, cx, cy, radius, model.theta);
  appendPointAndRay(svg, cx, cy, radius, model.theta);
  appendSinCosTriangle(svg, cx, cy, radius, model.theta, model, { showTan: true });
  appendPlotTag(svg, `Q${model.quadrant}: ${model.astc.label}`, { x: cx, y: 58, anchor: "middle", tone: "accent" });
  appendPlotTag(svg, `sin ${model.astc.sin}  cos ${model.astc.cos}  tan ${model.astc.tan}`, {
    x: cx,
    y: 78,
    anchor: "middle",
    tone: "muted",
  });
  renderWidgetFormula(shell, spec, `\\text{ASTC Q${model.quadrant}}`, { fallback: "\\text{ASTC}" });
  shell.readout.textContent = `Q${model.quadrant}  positive: ${model.astc.label}`;
}

function drawReferenceAngle(svg, shell, model, spec) {
  const cx = 300;
  const cy = 210;
  const radius = 130;
  appendUnitCircle(svg, cx, cy, radius);
  appendCircleAxes(svg, cx, cy, radius);
  appendReferenceAngle(svg, cx, cy, radius, model.theta, model.referenceAngle);
  appendPointAndRay(svg, cx, cy, radius, model.theta);
  appendSinCosTriangle(svg, cx, cy, radius, model.theta, model);

  appendPlotTag(svg, `θ=${formatNumber(model.theta, 2)}`, { x: cx, y: 54, anchor: "middle", tone: "accent" });
  appendPlotTag(svg, `ref=${formatNumber(model.referenceAngle, 2)}`, { x: cx + radius * 0.45, y: cy + 18, tone: "muted" });
  appendPlotTag(svg, `Q${model.quadrant}`, { x: cx + radius + 70, y: cy, tone: "accent" });

  renderWidgetFormula(shell, spec, `\\text{ref}=${formatNumber(model.referenceAngle, 3)}`, { fallback: "\\theta" });
  shell.readout.textContent = `θ=${formatNumber(model.theta, 2)}  ref=${formatNumber(model.referenceAngle, 2)}  Q${model.quadrant}`;
}

function drawSpecialAngle(svg, shell, model, spec) {
  const cx = 300;
  const cy = 210;
  const radius = 130;
  appendUnitCircle(svg, cx, cy, radius);
  appendCircleAxes(svg, cx, cy, radius);
  appendAngleArc(svg, cx, cy, radius, model.theta);
  appendPointAndRay(svg, cx, cy, radius, model.theta);
  appendSinCosTriangle(svg, cx, cy, radius, model.theta, model, { showTan: true });
  appendPlotTag(svg, model.preset ? model.preset.replaceAll("_", " ") : "special angle", {
    x: cx,
    y: 54,
    anchor: "middle",
    tone: "accent",
  });
  renderWidgetFormula(shell, spec, `\\sin\\theta=${formatNumber(model.sin, 3)},\\;\\cos\\theta=${formatNumber(model.cos, 3)}`, { fallback: "\\sin\\theta" });
  shell.readout.textContent = `exact values at θ=${formatNumber(model.theta, 3)}`;
}

function drawPythagorean(svg, shell, model, spec) {
  const cx = 300;
  const cy = 228;
  const radius = 120;
  appendPythagoreanBanner(svg, model);
  appendUnitCircle(svg, cx, cy, radius);
  appendCircleAxes(svg, cx, cy, radius);
  appendAngleArc(svg, cx, cy, radius, model.theta);
  appendPointAndRay(svg, cx, cy, radius, model.theta);
  appendSinCosTriangle(svg, cx, cy, radius, model.theta, model, { showSquared: true });
  renderWidgetFormula(shell, spec, `\\sin^2\\theta+\\cos^2\\theta=1`, { fallback: "\\sin^2\\theta+\\cos^2\\theta" });
  shell.readout.textContent = `${formatNumber(model.sin * model.sin, 3)} + ${formatNumber(model.cos * model.cos, 3)} = ${formatNumber(1, 3)}`;
}

const DRAWERS = {
  ferris_link: drawFerrisLink,
  projections: drawProjections,
  astc: drawAstc,
  reference_angle: drawReferenceAngle,
  special_angle: drawSpecialAngle,
  pythagorean: drawPythagorean,
};

export function mountUnitCircleTrigWidget(root, spec = {}) {
  const shell = createWidgetShell(root, spec);
  const variant = spec.variant || spec.plot?.variant || "projections";
  const controls = spec.interactive === false ? [] : (spec.controls?.length ? spec.controls : controlsForVariant(variant));
  const state = buildStateFromControls({
    theta: Math.PI / 6,
    preset: "pi_over_3",
    variant,
    ...(spec.params || {}),
  }, controls);

  bindControls(root, shell.controls, controls, state);

  const svg = createSvg();
  shell.plot.appendChild(svg);

  const unsubscribe = state.subscribe((params) => {
    clearSvg(svg);
    const model = computeUnitCircleTrig({ ...params, variant });
    const draw = DRAWERS[variant] || DRAWERS.projections;
    draw(svg, shell, model, spec);
  });

  return { state, destroy: unsubscribe };
}