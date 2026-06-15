export function toFiniteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function clampValue(value, control = {}) {
  const raw = toFiniteNumber(value, toFiniteNumber(control.value, 0));
  const min = Number.isFinite(Number(control.min)) ? Number(control.min) : -Infinity;
  const max = Number.isFinite(Number(control.max)) ? Number(control.max) : Infinity;
  const step = Number.isFinite(Number(control.step)) && Number(control.step) > 0
    ? Number(control.step)
    : 0;
  const clamped = Math.max(min, Math.min(max, raw));
  if (!step || !Number.isFinite(min)) return clamped;
  return Math.round((clamped - min) / step) * step + min;
}

export function createParameterState(initial = {}) {
  let params = { ...initial };
  const listeners = new Set();

  const notify = () => {
    const snapshot = { ...params };
    listeners.forEach((listener) => listener(snapshot));
  };

  return {
    get(name) {
      return params[name];
    },
    snapshot() {
      return { ...params };
    },
    set(name, value) {
      if (params[name] === value) return;
      params = { ...params, [name]: value };
      notify();
    },
    patch(nextValues = {}) {
      let changed = false;
      const next = { ...params };
      Object.entries(nextValues).forEach(([key, value]) => {
        if (next[key] !== value) {
          next[key] = value;
          changed = true;
        }
      });
      if (!changed) return;
      params = next;
      notify();
    },
    subscribe(listener) {
      listeners.add(listener);
      listener({ ...params });
      return () => listeners.delete(listener);
    },
  };
}

function normalizeTimelinePoint(point = {}) {
  return {
    t: toFiniteNumber(point.t ?? point.time ?? point.sec, 0),
    params: point.params || point.values || {},
  };
}

export function valuesAtTimelineTime(timeline = [], timeSec = 0) {
  const points = timeline
    .map(normalizeTimelinePoint)
    .filter((point) => point.params && typeof point.params === "object")
    .sort((left, right) => left.t - right.t);

  if (!points.length) return {};
  const time = toFiniteNumber(timeSec, 0);
  if (time <= points[0].t) return { ...points[0].params };
  if (time >= points.at(-1).t) return { ...points.at(-1).params };

  const beforeIndex = points.findIndex((point, index) => {
    const next = points[index + 1];
    return next && time >= point.t && time <= next.t;
  });
  const before = points[Math.max(0, beforeIndex)];
  const after = points[Math.max(0, beforeIndex + 1)];
  if (!before || !after) return {};

  const span = Math.max(0.001, after.t - before.t);
  const ratio = (time - before.t) / span;
  const keys = new Set([...Object.keys(before.params), ...Object.keys(after.params)]);
  const values = {};
  keys.forEach((key) => {
    const a = before.params[key];
    const b = after.params[key];
    if (Number.isFinite(Number(a)) && Number.isFinite(Number(b))) {
      values[key] = Number(a) + (Number(b) - Number(a)) * ratio;
    } else {
      values[key] = ratio < 0.5 ? a : b;
    }
  });
  return values;
}

export function applyScriptedTimeline(state, timeline = [], timeSec = 0) {
  const values = valuesAtTimelineTime(timeline, timeSec);
  if (Object.keys(values).length) state.patch(values);
  return values;
}

export function animateParameterState(state, targetValues = {}, durationMs = 1000) {
  if (!state || !targetValues || typeof targetValues !== "object") return () => {};
  const startValues = state.snapshot ? state.snapshot() : {};
  const target = { ...targetValues };
  const duration = Math.max(0, Number(durationMs) || 0);
  const startedAt = performance.now();
  let frame = 0;
  let cancelled = false;

  const step = (now) => {
    if (cancelled) return;
    const ratio = duration ? Math.min(1, (now - startedAt) / duration) : 1;
    const eased = 1 - (1 - ratio) ** 3;
    const next = {};
    Object.entries(target).forEach(([key, end]) => {
      const start = startValues[key];
      if (Number.isFinite(Number(start)) && Number.isFinite(Number(end))) {
        next[key] = Number(start) + (Number(end) - Number(start)) * eased;
      } else {
        next[key] = ratio < 0.5 ? start : end;
      }
    });
    state.patch(next);
    if (ratio < 1) frame = requestAnimationFrame(step);
  };

  frame = requestAnimationFrame(step);
  return () => {
    cancelled = true;
    if (frame) cancelAnimationFrame(frame);
  };
}
