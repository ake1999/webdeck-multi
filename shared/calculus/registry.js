import { animateParameterState, applyScriptedTimeline } from "./core/state.js";
import { mountFunctionTransformWidget } from "./widgets/function_transform.js";
import { mountFunctionAnalysisWidget } from "./widgets/function_analysis.js";
import { mountLimitEpsilonWidget } from "./widgets/limit_epsilon.js";
import { mountSecantTangentWidget } from "./widgets/secant_tangent.js";
import { mountRiemannIntegralWidget } from "./widgets/riemann_integral.js";

const registry = new Map();

export function registerCalculusWidget(name, mount) {
  registry.set(name, mount);
}

export function listCalculusWidgets() {
  return [...registry.keys()];
}

function eventSlideId(event) {
  return event?.detail?.slide_id || event?.detail?.slideId || "";
}

function eventLocalTime(event) {
  return Number(event?.detail?.local_time ?? event?.detail?.localTime ?? event?.detail?.time ?? event?.detail?.cue?.t0 ?? 0);
}

export function mountCalculusWidget(root, spec = {}) {
  if (!root || root.dataset.calculusMounted === "true") return null;
  const widgetName = spec.widget || spec.name || "";
  const mount = registry.get(widgetName);
  root.dataset.calculusMounted = "true";

  if (!mount) {
    root.classList.add("calculus-widget", "calculus-widget-missing");
    root.textContent = `Missing calculus widget: ${widgetName || "unknown"}`;
    return null;
  }

  const mounted = mount(root, spec) || {};
  const timeline = Array.isArray(spec.scriptedTimeline) ? spec.scriptedTimeline : [];
  const slideId = root.dataset.slideId || "";
  const widgetId = root.dataset.elementId || spec.id || "";

  const applyTime = (event) => {
    if (!timeline.length || !mounted.state) return;
    if (slideId && eventSlideId(event) && eventSlideId(event) !== slideId) return;
    applyScriptedTimeline(mounted.state, timeline, eventLocalTime(event));
  };

  const applyStepParams = (event) => {
    if (!mounted.state) return;
    const detail = event?.detail || {};
    if (slideId && detail.slideId && detail.slideId !== slideId) return;
    if (detail.widgetId && widgetId && detail.widgetId !== widgetId) return;
    if (!detail.params || typeof detail.params !== "object") return;
    animateParameterState(mounted.state, detail.params, detail.duration ?? 1000);
  };

  window.addEventListener("webdeck:lecture-time", applyTime);
  window.addEventListener("webdeck:lecture-cue", applyTime);
  window.addEventListener("webdeck:widget-params", applyStepParams);
  root.__calculusWidget = {
    ...mounted,
    destroy() {
      window.removeEventListener("webdeck:lecture-time", applyTime);
      window.removeEventListener("webdeck:lecture-cue", applyTime);
      window.removeEventListener("webdeck:widget-params", applyStepParams);
      mounted.destroy?.();
    },
  };
  return root.__calculusWidget;
}

registerCalculusWidget("function_transform", mountFunctionTransformWidget);
registerCalculusWidget("function_analysis", mountFunctionAnalysisWidget);
registerCalculusWidget("limit_epsilon", mountLimitEpsilonWidget);
registerCalculusWidget("secant_tangent", mountSecantTangentWidget);
registerCalculusWidget("riemann_integral", mountRiemannIntegralWidget);
