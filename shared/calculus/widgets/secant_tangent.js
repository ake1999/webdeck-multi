import { createSvg, appendCurve, appendGrid, appendPlotTag, clearSvg, plotScales, svgEl } from "../core/svg_plot.js";
import { bindControls, buildStateFromControls, createWidgetShell, formatNumber, renderTex } from "../core/widget_ui.js";

const DEFAULT_CONTROLS = [
  { name: "a", label: "a", min: -2.5, max: 2.5, step: 0.05, value: 1 },
  { name: "h", label: "h", min: -2, max: 2, step: 0.02, value: 1 },
];

export function computeSecantTangent(params = {}) {
  const a = Number(params.a ?? 1);
  const rawH = Number(params.h ?? 1);
  const h = Math.abs(rawH) < 0.02 ? 0.02 * Math.sign(rawH || 1) : rawH;
  const f = (x) => x ** 2;
  const slope = (f(a + h) - f(a)) / h;
  const tangentSlope = 2 * a;
  return {
    a,
    h,
    f,
    x0: a,
    y0: f(a),
    x1: a + h,
    y1: f(a + h),
    slope,
    tangentSlope,
  };
}

export function mountSecantTangentWidget(root, spec = {}) {
  const shell = createWidgetShell(root, spec);
  const controls = spec.controls?.length ? spec.controls : DEFAULT_CONTROLS;
  const state = buildStateFromControls({ a: 1, h: 1, ...(spec.params || {}) }, controls);
  bindControls(root, shell.controls, controls, state);

  const svg = createSvg();
  shell.plot.appendChild(svg);

  const unsubscribe = state.subscribe((params) => {
    const model = computeSecantTangent(params);
    clearSvg(svg);
    const scales = plotScales({ xDomain: [-3, 3], yDomain: [-1, 8] });
    appendGrid(svg, scales);
    appendCurve(svg, scales, model.f, { stroke: "#9a341b", strokeWidth: 4 });

    const lineY = (x) => model.y0 + model.slope * (x - model.x0);
    const tanY = (x) => model.y0 + model.tangentSlope * (x - model.x0);
    appendCurve(svg, scales, lineY, { stroke: "#2563eb", strokeWidth: 3, class: "calculus-curve secant" });
    appendCurve(svg, scales, tanY, { stroke: "#16a34a", strokeWidth: 2, class: "calculus-curve tangent" });
    [
      [model.x0, model.y0],
      [model.x1, model.y1],
    ].forEach(([x, y]) => {
      svg.appendChild(svgEl("circle", {
        cx: scales.x(x),
        cy: scales.y(y),
        r: 6,
        class: "calculus-point",
      }));
    });
    appendPlotTag(svg, `P (${formatNumber(model.x0, 2)}, ${formatNumber(model.y0, 2)})`, {
      x: scales.x(model.x0) + 10,
      y: Math.max(26, scales.y(model.y0) - 10),
      tone: "accent",
    });
    appendPlotTag(svg, `Q (${formatNumber(model.x1, 2)}, ${formatNumber(model.y1, 2)})`, {
      x: scales.x(model.x1) + 10,
      y: Math.max(50, scales.y(model.y1) - 10),
      tone: "default",
    });
    appendPlotTag(svg, `secant m=${formatNumber(model.slope, 2)}  •  tangent m=${formatNumber(model.tangentSlope, 2)}`, {
      x: scales.width - (scales.paddingRight ?? scales.padding),
      y: 24,
      anchor: "end",
      tone: "muted",
    });

    renderTex(shell.formula, `\\frac{f(a+h)-f(a)}{h}=${formatNumber(model.slope, 3)}\\rightarrow f'(a)=${formatNumber(model.tangentSlope, 3)}`, true);
    shell.readout.textContent = "";
  });

  return { state, destroy: unsubscribe };
}
