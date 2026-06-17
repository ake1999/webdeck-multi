function pickPreset(presets = [], index = 0) {
  if (!presets.length) return null;
  return presets[index % presets.length];
}

function randomPreset(presets = []) {
  if (!presets.length) return null;
  return presets[Math.floor(Math.random() * presets.length)];
}

function findWidgetMount(slideEl) {
  return slideEl.querySelector(".calculus-widget-mount");
}

function applyExample(slideEl, slideData, example, { announce = true } = {}) {
  const stepsHost = slideEl.querySelector("[data-visual-lab-steps]");
  const formulaHost = slideEl.querySelector("[data-visual-lab-formula]");
  const labelHost = slideEl.querySelector("[data-visual-lab-active-label]");
  const mount = findWidgetMount(slideEl);

  if (stepsHost) {
    stepsHost.innerHTML = "";
    const items = Array.isArray(example?.steps) ? example.steps : [];
    if (items.length) {
      const list = document.createElement("ol");
      list.className = "visual-lab-step-list";
      items.forEach((step, index) => {
        const li = document.createElement("li");
        li.textContent = step.text || step;
        if (step.id) li.dataset.stepId = step.id;
        list.appendChild(li);
      });
      stepsHost.appendChild(list);
    }
  }

  if (formulaHost && example?.formula) {
    formulaHost.dataset.tex = example.formula;
    formulaHost.dataset.display = "true";
    formulaHost.hidden = false;
    if (window.katex) {
      try {
        window.katex.render(example.formula, formulaHost, {
          displayMode: true,
          throwOnError: false,
          strict: "ignore",
          trust: false,
        });
      } catch {
        formulaHost.textContent = example.formula;
      }
    } else {
      formulaHost.textContent = example.formula;
    }
  } else if (formulaHost) {
    formulaHost.hidden = true;
    formulaHost.textContent = "";
  }

  if (labelHost) {
    labelHost.textContent = example?.label ? `Active: ${example.label}` : "";
  }

  const params = example?.params && typeof example.params === "object" ? example.params : {};
  const widget = mount?.__calculusWidget;
  if (widget?.state?.patch) {
    widget.state.patch(params);
  } else if (mount && params && Object.keys(params).length) {
    mount.dataset.pendingLabParams = JSON.stringify(params);
  }

  if (announce) {
    slideEl.dataset.visualLabExampleId = example?.id || "";
  }

  slideEl.querySelectorAll("[data-visual-lab-example]").forEach((button) => {
    const active = button.dataset.visualLabExample === (example?.id || "");
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function waitForWidget(mount, callback, attempts = 40) {
  if (!mount) return;
  if (mount.__calculusWidget?.state?.patch) {
    const pending = mount.dataset.pendingLabParams;
    if (pending) {
      try {
        mount.__calculusWidget.state.patch(JSON.parse(pending));
      } catch {}
      delete mount.dataset.pendingLabParams;
    }
    callback(mount.__calculusWidget);
    return;
  }
  if (attempts <= 0) return;
  window.setTimeout(() => waitForWidget(mount, callback, attempts - 1), 50);
}

export function bindVisualLabSlide(slideEl, slideData = {}) {
  if (!slideEl || slideEl.dataset.visualLabBound === "true") return;
  const examples = Array.isArray(slideData.labExamples) ? slideData.labExamples : [];
  if (!examples.length) return;

  slideEl.dataset.visualLabBound = "true";
  const presets = Array.isArray(slideData.labGeneratePresets) ? slideData.labGeneratePresets : [];
  let presetCursor = 0;

  const activate = (example) => {
    applyExample(slideEl, slideData, example);
    waitForWidget(findWidgetMount(slideEl), () => {});
  };

  const initialId = slideData.labExampleId || examples[0]?.id;
  const initial = examples.find((item) => item.id === initialId) || examples[0];
  activate(initial);

  slideEl.querySelectorAll("[data-visual-lab-example]").forEach((button) => {
    button.addEventListener("click", () => {
      const match = examples.find((item) => item.id === button.dataset.visualLabExample);
      if (match) activate(match);
    });
  });

  const generateButton = slideEl.querySelector("[data-visual-lab-generate]");
  if (generateButton) {
    generateButton.addEventListener("click", () => {
      let preset = null;
      if (slideData.labGenerateMode === "random") {
        preset = randomPreset(presets);
      } else {
        preset = pickPreset(presets, presetCursor);
        presetCursor += 1;
      }
      if (!preset) return;
      activate({
        id: preset.id || `generated_${presetCursor}`,
        label: preset.label || "Generated example",
        formula: preset.formula || "",
        steps: preset.steps || [{ text: "Explore the new settings with the sliders." }],
        params: preset.params || {},
      });
    });
  }
}

export function renderVisualLabExampleTabs(examples = [], { showGenerate = false } = {}) {
  const bar = document.createElement("div");
  bar.className = "visual-lab-example-bar";

  examples.forEach((example) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "visual-lab-example-tab";
    button.dataset.visualLabExample = example.id;
    button.textContent = example.label || example.id;
    button.setAttribute("aria-pressed", "false");
    bar.appendChild(button);
  });

  if (showGenerate) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "visual-lab-example-tab visual-lab-generate-tab";
    button.dataset.visualLabGenerate = "true";
    button.textContent = "New example";
    bar.appendChild(button);
  }

  return bar;
}