const controllers = new WeakMap();

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeTex(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  if (raw.startsWith("$$") && raw.endsWith("$$")) return raw;
  if (raw.startsWith("\\(") && raw.endsWith("\\)")) return raw;
  if (raw.includes("\\begin{") || raw.includes("\\displaystyle")) {
    return `$$${raw}$$`;
  }
  return `$$${raw}$$`;
}

function stepSpeech(step) {
  return String(step?.say || step?.note || step?.text || "").trim();
}

function stepMath(step) {
  return String(step?.math || "").trim();
}

export function formatChainOp(op, fallback = "=") {
  const raw = String(op ?? fallback).trim();
  if (!raw || raw.toLowerCase() === "none") return "";
  const key = raw.toLowerCase();
  if (key === "=>" || key === "implies" || key === "Rightarrow" || key === "\\Rightarrow") return "⇒";
  if (key === "->" || key === "rightarrow" || key === "\\rightarrow") return "→";
  return raw;
}

export function stepLeadingOp(step, blockDefault = "=") {
  if (step?.op === "none" || step?.chainOp === "none") return "";
  return formatChainOp(step.op ?? step.chainOp, blockDefault);
}

export function stepParts(step) {
  const parts = asArray(step?.parts).filter((part) => stepMath(part) || part?.text);
  if (parts.length) {
    return parts.map((part, index) => ({
      math: stepMath(part) || String(part?.text || "").trim(),
      op: index === 0 ? null : formatChainOp(part.op ?? "=", "="),
    }));
  }
  const math = stepMath(step) || String(step?.text || "").trim();
  if (!math) return [];
  return [{ math, op: null }];
}

export function stepLineGap(step) {
  const gap = String(step?.gap ?? step?.lineGap ?? "normal").trim().toLowerCase();
  if (gap === "tight" || gap === "compact" || gap === "small") return "tight";
  if (gap === "loose" || gap === "relaxed" || gap === "large") return "loose";
  return "normal";
}

export function createMathSolutionStepsController(root, options = {}) {
  const steps = Array.from(root.querySelectorAll("[data-math-step-index]"));
  const revealMode = root.dataset.revealMode || "sequential";
  let revealedCount = Number(root.dataset.initialRevealed || 0);

  function applyState() {
    steps.forEach((stepEl, index) => {
      const revealed = revealMode === "all" || index < revealedCount;
      stepEl.classList.toggle("math-solution-step--pending", !revealed);
      stepEl.classList.toggle("math-solution-step--revealed", revealed);
      stepEl.setAttribute("aria-hidden", revealed ? "false" : "true");
    });
    root.dataset.revealedCount = String(revealedCount);
    const splitAt = Number(root.dataset.splitAfter || 0);
    const divider = root.querySelector("[data-split-divider]");
    if (divider && splitAt > 0) {
      divider.classList.toggle("math-solution-split-divider--visible", revealedCount > splitAt);
    }
    const hasMore = revealMode === "sequential" && revealedCount < steps.length;
    const advance = root.querySelector(".math-solution-advance");
    if (advance) {
      advance.hidden = !hasMore;
      advance.disabled = !hasMore;
      advance.style.display = hasMore ? "" : "none";
    }
  }

  function revealThroughIndex(index) {
    if (revealMode !== "sequential") return;
    revealedCount = Math.max(revealedCount, Math.min(steps.length, index + 1));
    applyState();
    root.dispatchEvent(new CustomEvent("math-solution:reveal", {
      bubbles: true,
      detail: {
        slideId: root.dataset.slideId || "",
        blockId: root.dataset.blockId || "",
        revealedCount,
        stepIndex: index,
        stepId: steps[index]?.dataset?.elementId || "",
      },
    }));
  }

  function revealThroughElementId(elementId) {
    if (!elementId) return;
    const index = steps.findIndex((stepEl) => stepEl.dataset.elementId === elementId);
    if (index >= 0) revealThroughIndex(index);
  }

  function revealNext() {
    if (revealedCount >= steps.length) return false;
    revealThroughIndex(revealedCount);
    return true;
  }

  function revealAll() {
    revealedCount = steps.length;
    applyState();
  }

  function reset() {
    revealedCount = Number(root.dataset.initialRevealed || 0);
    applyState();
  }

  function setActiveStep(elementId) {
    steps.forEach((stepEl) => {
      stepEl.classList.toggle(
        "math-solution-step--active",
        Boolean(elementId) && stepEl.dataset.elementId === elementId,
      );
    });
  }

  applyState();

  const controller = {
    root,
    revealNext,
    revealAll,
    reset,
    revealThroughElementId,
    setActiveStep,
    get revealedCount() {
      return revealedCount;
    },
  };

  controllers.set(root, controller);
  return controller;
}

export function getMathSolutionStepsController(root) {
  return controllers.get(root) || null;
}

export function revealMathSolutionStep(slideId, elementId) {
  if (!slideId || !elementId) return false;
  const scope = document.getElementById(`slide__${slideId}`) || document.querySelector(`[data-slide-id="${slideId}"]`);
  if (!scope) return false;

  let revealed = false;
  scope.querySelectorAll(".math-solution-steps").forEach((root) => {
    const controller = getMathSolutionStepsController(root);
    if (!controller) return;
    const before = controller.revealedCount;
    controller.revealThroughElementId(elementId);
    if (controller.revealedCount > before) revealed = true;
    controller.setActiveStep(elementId);
  });
  return revealed;
}

export function revealAllMathSolutionSteps(scopeEl) {
  if (!scopeEl) return;
  scopeEl.querySelectorAll(".math-solution-steps").forEach((root) => {
    const controller = getMathSolutionStepsController(root) || createMathSolutionStepsController(root);
    controller.revealAll();
  });
}

export function bindMathSolutionStepsRoot(root, options = {}) {
  if (!root || root.dataset.mathSolutionBound === "true") {
    return getMathSolutionStepsController(root);
  }
  root.dataset.mathSolutionBound = "true";
  const controller = createMathSolutionStepsController(root, options);

  const advance = root.querySelector(".math-solution-advance");
  if (advance) {
    advance.addEventListener("click", () => {
      const index = controller.revealedCount;
      controller.revealNext();
      const stepEl = root.querySelector(`[data-math-step-index="${index}"]`);
      stepEl?.focus?.();
    });
  }

  return controller;
}

export function mountMathSolutionStepsInteraction(scopeEl = document) {
  scopeEl.querySelectorAll(".math-solution-steps").forEach((root) => {
    bindMathSolutionStepsRoot(root);
  });
}

export { normalizeTex, stepMath, stepSpeech, asArray };