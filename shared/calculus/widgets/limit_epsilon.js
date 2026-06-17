import { createSvg, appendCurve, appendGrid, appendPlotTag, clearSvg, plotScales, svgEl } from "../core/svg_plot.js";
import { bindControls, buildStateFromControls, createWidgetShell, formatNumber, formatSigned, renderTex } from "../core/widget_ui.js";

const DEFAULT_CONTROLS = [
  { name: "epsilon", label: "ε", min: 0.1, max: 2, step: 0.05, value: 0.5 },
  { name: "x", label: "x", min: -1, max: 3, step: 0.02, value: 1.7 },
];

export function computeLimitEpsilon(params = {}) {
  const a = Number(params.a ?? 1);
  const epsilon = Math.max(0.05, Number(params.epsilon ?? 0.5));
  const x = Number(params.x ?? a + 0.7);
  const L = a ** 2;
  const delta = Math.min(1.2, epsilon / Math.max(0.2, 2 * Math.abs(a) + 1));
  const fx = x ** 2;
  return {
    a,
    epsilon,
    delta,
    x,
    L,
    fx,
    insideDelta: Math.abs(x - a) < delta,
    insideEpsilon: Math.abs(fx - L) < epsilon,
  };
}

export function mountLimitEpsilonWidget(root, spec = {}) {
  const shell = createWidgetShell(root, spec);
  const controls = spec.controls?.length ? spec.controls : DEFAULT_CONTROLS;
  const state = buildStateFromControls({
    a: 1,
    epsilon: 0.5,
    x: 1.7,
    ...(spec.params || {}),
  }, controls);

  bindControls(root, shell.controls, controls, state);
  const svg = createSvg();
  shell.plot.appendChild(svg);

  const unsubscribe = state.subscribe((params) => {
    const model = computeLimitEpsilon(params);
    clearSvg(svg);
    const xPad = Math.max(0.8, Math.abs(model.a) * 0.4 + 0.5);
    const scales = plotScales({
      xDomain: [model.a - xPad, model.a + xPad],
      yDomain: [Math.max(-0.5, model.L - 1.5), model.L + Math.max(2, model.epsilon + 1)],
    });
    appendGrid(svg, scales);

    const bandTop = scales.y(model.L + model.epsilon);
    const bandBottom = scales.y(model.L - model.epsilon);
    svg.appendChild(svgEl("rect", {
      x: scales.paddingLeft ?? scales.padding,
      y: bandTop,
      width: scales.width - (scales.paddingLeft ?? scales.padding) - (scales.paddingRight ?? scales.padding),
      height: Math.max(2, bandBottom - bandTop),
      class: "calculus-band epsilon-band",
    }));
    svg.appendChild(svgEl("rect", {
      x: scales.x(model.a - model.delta),
      y: scales.paddingTop ?? scales.padding,
      width: Math.max(2, scales.x(model.a + model.delta) - scales.x(model.a - model.delta)),
      height: scales.height - (scales.paddingTop ?? scales.padding) - (scales.paddingBottom ?? scales.padding),
      class: "calculus-band delta-band",
    }));

    appendCurve(svg, scales, (x) => x ** 2, { stroke: "#9a341b", strokeWidth: 4 });
    svg.appendChild(svgEl("line", {
      x1: scales.x(model.x),
      y1: scales.y(0),
      x2: scales.x(model.x),
      y2: scales.y(model.fx),
      class: "calculus-guide",
    }));
    svg.appendChild(svgEl("circle", {
      cx: scales.x(model.x),
      cy: scales.y(model.fx),
      r: 6,
      class: model.insideEpsilon ? "calculus-point" : "calculus-point warn",
    }));
    appendPlotTag(svg, `x=${formatNumber(model.x, 2)}, f(x)=${formatNumber(model.fx, 2)}`, {
      x: scales.x(model.x) + 10,
      y: Math.max(26, scales.y(model.fx) - 10),
      tone: model.insideEpsilon ? "accent" : "warn",
    });
    appendPlotTag(svg, `ε=${formatNumber(model.epsilon, 2)}  δ≈${formatNumber(model.delta, 2)}`, {
      x: scales.width - (scales.paddingRight ?? scales.padding),
      y: 24,
      anchor: "end",
      tone: "muted",
    });

    renderTex(shell.formula, `|f(x)-${formatNumber(model.L, 2)}|<${formatNumber(model.epsilon, 2)}\\quad\\text{when}\\quad |x${formatSigned(-model.a, 2, { always: true })}|<${formatNumber(model.delta, 2)}`, true);
    shell.readout.textContent = "";
  });

  return { state, destroy: unsubscribe };
}
