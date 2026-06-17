import { createSvg, appendCurve, appendGrid, appendPlotTag, clearSvg, plotScales, svgEl } from "../core/svg_plot.js";
import { bindControls, buildStateFromControls, createWidgetShell, formatNumber, renderTex } from "../core/widget_ui.js";

const DEFAULT_CONTROLS = [
  { name: "a", label: "a", min: 0, max: 3, step: 0.05, value: 0 },
  { name: "b", label: "b", min: 1, max: 4, step: 0.05, value: 3 },
  { name: "n", label: "n", min: 2, max: 40, step: 1, value: 8, digits: 0 },
  { name: "method", label: "method", type: "select", value: "midpoint", options: ["left", "midpoint", "right"] },
];

function f(x) {
  return 0.35 * x ** 2 + 0.45;
}

export function computeRiemannIntegral(params = {}) {
  let a = Number(params.a ?? 0);
  let b = Number(params.b ?? 3);
  if (b <= a + 0.2) b = a + 0.2;
  const n = Math.max(1, Math.round(Number(params.n ?? 8)));
  const method = ["left", "right", "midpoint"].includes(params.method) ? params.method : "midpoint";
  const dx = (b - a) / n;
  const rectangles = Array.from({ length: n }, (_item, index) => {
    const x0 = a + index * dx;
    const x1 = x0 + dx;
    const sample = method === "left" ? x0 : method === "right" ? x1 : (x0 + x1) / 2;
    const height = f(sample);
    return { x0, x1, sample, height, area: height * dx };
  });
  const sum = rectangles.reduce((total, item) => total + item.area, 0);
  return { a, b, n, method, dx, rectangles, sum, f };
}

export function mountRiemannIntegralWidget(root, spec = {}) {
  const shell = createWidgetShell(root, spec);
  const controls = spec.controls?.length ? spec.controls : DEFAULT_CONTROLS;
  const state = buildStateFromControls({
    a: 0,
    b: 3,
    n: 8,
    method: "midpoint",
    ...(spec.params || {}),
  }, controls);
  bindControls(root, shell.controls, controls, state);

  const svg = createSvg();
  shell.plot.appendChild(svg);

  const unsubscribe = state.subscribe((params) => {
    const model = computeRiemannIntegral(params);
    clearSvg(svg);
    const scales = plotScales({ xDomain: [-0.5, 4.5], yDomain: [-0.5, 7] });
    appendGrid(svg, scales);

    model.rectangles.forEach((rect) => {
      const x = scales.x(rect.x0);
      const top = scales.y(rect.height);
      const width = Math.max(1, scales.x(rect.x1) - scales.x(rect.x0));
      const height = scales.y(0) - top;
      svg.appendChild(svgEl("rect", {
        x,
        y: top,
        width,
        height,
        class: "calculus-rectangle",
      }));
    });
    appendCurve(svg, scales, model.f, { stroke: "#9a341b", strokeWidth: 4 });
    appendPlotTag(svg, `${model.method} sum: ${formatNumber(model.sum, 3)}`, {
      x: scales.width - (scales.paddingRight ?? scales.padding),
      y: 24,
      anchor: "end",
      tone: "accent",
    });
    appendPlotTag(svg, `a=${formatNumber(model.a, 2)}  b=${formatNumber(model.b, 2)}  Δx=${formatNumber(model.dx, 2)}`, {
      x: (scales.paddingLeft ?? scales.padding) + 6,
      y: scales.height - 16,
      tone: "muted",
    });

    renderTex(shell.formula, `\\sum_{i=1}^{${model.n}} f(x_i^*)\\Delta x\\approx ${formatNumber(model.sum, 4)}`, true);
    shell.readout.textContent = "";
  });

  return { state, destroy: unsubscribe };
}
