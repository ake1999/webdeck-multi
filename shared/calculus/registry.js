import { animateParameterState, applyScriptedTimeline } from "./core/state.js";
import { mountFunctionTransformWidget } from "./widgets/function_transform.js";
import { mountFunctionAnalysisWidget } from "./widgets/function_analysis.js";
import { mountLimitEpsilonWidget } from "./widgets/limit_epsilon.js";
import { mountSecantTangentWidget } from "./widgets/secant_tangent.js";
import { mountRiemannIntegralWidget } from "./widgets/riemann_integral.js";
import { mountUnitCircleTrigWidget } from "./widgets/unit_circle_trig.js";

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

function scriptedTimelineTime(cue, localTime) {
  if (!cue || cue.think_pause) return 0;
  return Math.max(0, Number(localTime || 0) - Number(cue.t0 || 0));
}

function resolveScriptedTimeline(spec, cue) {
  const timelines = spec.scriptedTimelines;
  if (timelines && typeof timelines === "object") {
    const key = cue?.widget_timeline_key || cue?.widget_timeline || "";
    if (key && Array.isArray(timelines[key])) return timelines[key];
    const speech = String(cue?.speech || "").toLowerCase();
    if (/k slider|plus k|f of x plus k/i.test(speech) && Array.isArray(timelines.vertical_k)) {
      return timelines.vertical_k;
    }
    if (/h slider|horizontal|x minus h|x plus two/i.test(speech) && Array.isArray(timelines.horizontal_h)) {
      return timelines.horizontal_h;
    }
    if (/a slider|vert|amplitude|multiply.*output/i.test(speech) && Array.isArray(timelines.vertical_a)) {
      return timelines.vertical_a;
    }
    if (/b slider|period|horizontal shrink|multiply.*input/i.test(speech) && Array.isArray(timelines.horizontal_b)) {
      return timelines.horizontal_b;
    }
  }
  return Array.isArray(spec.scriptedTimeline) ? spec.scriptedTimeline : [];
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
  const slideId = root.dataset.slideId || "";
  const widgetId = root.dataset.elementId || spec.id || "";
  let activeCue = null;
  let activeTimeline = resolveScriptedTimeline(spec, null);

  const cueTargetsWidget = (cue) => {
    if (!cue || !widgetId) return false;
    return cue.target_element === widgetId;
  };

  const applyTime = (event) => {
    if (!activeTimeline.length || !mounted.state) return;
    if (slideId && eventSlideId(event) && eventSlideId(event) !== slideId) return;
    if (!cueTargetsWidget(activeCue)) return;
    applyScriptedTimeline(
      mounted.state,
      activeTimeline,
      scriptedTimelineTime(activeCue, eventLocalTime(event)),
    );
  };

  const applyCue = (event) => {
    if (slideId && eventSlideId(event) && eventSlideId(event) !== slideId) return;
    activeCue = event?.detail?.cue || null;
    activeTimeline = resolveScriptedTimeline(spec, activeCue);
    if (!activeTimeline.length || !mounted.state || !cueTargetsWidget(activeCue)) return;
    applyScriptedTimeline(mounted.state, activeTimeline, 0);
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
  window.addEventListener("webdeck:lecture-cue", applyCue);
  window.addEventListener("webdeck:widget-params", applyStepParams);
  root.__calculusWidget = {
    ...mounted,
    destroy() {
      window.removeEventListener("webdeck:lecture-time", applyTime);
      window.removeEventListener("webdeck:lecture-cue", applyCue);
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
registerCalculusWidget("unit_circle_trig", mountUnitCircleTrigWidget);
