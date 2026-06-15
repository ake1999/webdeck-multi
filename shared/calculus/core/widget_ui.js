import { clampValue, createParameterState } from "./state.js";

export function formatNumber(value, digits = 3) {
  const number = Number(value);
  if (!Number.isFinite(number)) return (0).toFixed(Math.max(0, digits));
  return number.toFixed(Math.max(0, digits));
}

export function formatSigned(value, digits = 2, { always = false } = {}) {
  const number = Number(value);
  const safe = Number.isFinite(number) ? number : 0;
  const abs = Math.abs(safe).toFixed(Math.max(0, digits));
  if (safe < 0) return `-${abs}`;
  return `${always ? "+" : ""}${abs}`;
}

export function createWidgetShell(root, spec = {}) {
  root.classList.add("calculus-widget");
  root.dataset.widgetName = spec.widget || "";
  root.innerHTML = "";

  const header = document.createElement("div");
  header.className = "calculus-widget-header";
  const title = document.createElement("div");
  title.className = "calculus-widget-title";
  title.textContent = spec.title || spec.caption || "Calculus Lab";
  header.appendChild(title);

  const formula = document.createElement("div");
  formula.className = "calculus-widget-formula";
  annotateChild(root, formula, "formula", "formula", spec.formula?.label || "Formula");

  const body = document.createElement("div");
  body.className = "calculus-widget-body";
  const plot = document.createElement("div");
  plot.className = "calculus-widget-plot";
  annotateChild(root, plot, "plot", "plot", spec.title || spec.widget || "Plot");
  const side = document.createElement("div");
  side.className = "calculus-widget-side";
  const readout = document.createElement("div");
  readout.className = "calculus-widget-readout";
  annotateChild(root, readout, "readout", "readout", "Widget values");
  const controls = document.createElement("div");
  controls.className = "calculus-widget-controls";
  annotateChild(root, controls, "controls", "controls", "Widget controls");

  side.appendChild(readout);
  side.appendChild(controls);
  body.appendChild(plot);
  root.appendChild(header);
  root.appendChild(formula);
  root.appendChild(body);
  root.appendChild(side);

  return { header, title, formula, body, plot, side, readout, controls };
}

export function annotateChild(root, element, suffix, type, label) {
  const slideId = root.dataset.slideId || "";
  const parentId = root.dataset.elementId || "";
  const id = `${parentId}_${suffix}`;
  element.dataset.slideId = slideId;
  element.dataset.parentElementId = parentId;
  element.dataset.elementId = id;
  element.dataset.elementType = type;
  element.dataset.elementLabel = label || id;
  if (slideId) element.id = `${slideId}__${id}`;
  return element;
}

export function renderTex(target, tex, displayMode = false) {
  const value = String(tex || "").trim();
  target.dataset.tex = value;
  target.dataset.display = displayMode ? "true" : "false";
  if (window.katex && value) {
    try {
      window.katex.render(value, target, {
        displayMode,
        throwOnError: false,
        strict: "ignore",
        trust: false,
      });
      return;
    } catch {}
  }
  target.textContent = value;
}

export function buildStateFromControls(params = {}, controls = []) {
  const initial = { ...params };
  controls.forEach((control) => {
    if (!(control.name in initial)) initial[control.name] = control.value ?? control.min ?? 0;
  });
  return createParameterState(initial);
}

export function bindControls(root, controlsEl, controls = [], state) {
  controlsEl.innerHTML = "";
  controlsEl.hidden = !controls.length;
  controls.forEach((control) => {
    const name = control.name;
    if (!name) return;
    const wrap = document.createElement("label");
    wrap.className = "calculus-control";
    annotateChild(root, wrap, `control_${name}`, "control", control.label || name);

    const top = document.createElement("span");
    top.className = "calculus-control-top";
    const label = document.createElement("span");
    label.textContent = control.label || name;
    const valueLabel = document.createElement("span");
    valueLabel.className = "calculus-control-value";
    top.appendChild(label);
    top.appendChild(valueLabel);
    wrap.appendChild(top);

    if (control.type === "select") {
      const select = document.createElement("select");
      (control.options || []).forEach((option) => {
        const item = document.createElement("option");
        item.value = typeof option === "string" ? option : option.value;
        item.textContent = typeof option === "string" ? option : option.label || option.value;
        select.appendChild(item);
      });
      select.value = String(state.get(name) ?? control.value ?? "");
      select.addEventListener("change", () => state.set(name, select.value));
      wrap.appendChild(select);
      state.subscribe((params) => {
        select.value = String(params[name] ?? "");
        valueLabel.textContent = String(params[name] ?? "");
      });
    } else {
      const input = document.createElement("input");
      input.type = "range";
      input.min = String(control.min ?? 0);
      input.max = String(control.max ?? 1);
      input.step = String(control.step ?? 0.1);
      input.value = String(clampValue(state.get(name), control));
      input.addEventListener("input", () => state.set(name, clampValue(input.value, control)));
      wrap.appendChild(input);
      state.subscribe((params) => {
        const next = clampValue(params[name], control);
        input.value = String(next);
        valueLabel.textContent = formatNumber(next, control.digits ?? 2);
      });
    }

    controlsEl.appendChild(wrap);
  });
}

export function setWidgetReadout(readout, text = "") {
  const value = String(text || "").trim();
  readout.textContent = value;
  readout.hidden = !value;
}
