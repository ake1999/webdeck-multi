import { renderSlide } from "./deck_render.js";
import {
  clearDebugOverlay,
  collectSlideLayout,
  renderDebugOverlay,
  waitForDeckAssets,
} from "./deck_analysis.js";
import { buildTopicRuntime } from "./deck_model.js";

function nextFrame() {
  return new Promise((resolve) => window.requestAnimationFrame(() => resolve()));
}

function escapeSelectorValue(value) {
  if (window.CSS?.escape) return window.CSS.escape(value);
  return String(value).replace(/["\\]/g, "\\$&");
}

function createOverlayLayer(className, id) {
  const layer = document.createElement("div");
  layer.className = className;
  layer.id = id;
  return layer;
}

export function initDeck(config) {
  const {
    slidesData = [],
    topicMeta = null,
    topicId = "",
    descriptor = null,
    hudDefault = "ROB9205 — INDUSTRIAL ROBOTS",
    hudPrefix = "",
    email = "karimza@algonquincollege.com",
    homeHref = "../index.html",
    theme = "ac",
    ttsEnabled = false,
    analysisMode = false,
    debugOverlay: startWithDebugOverlay = false,
    initialSlide = null,
    deckWidth = 1280,
    deckHeight = 720,
    fitPadding = analysisMode ? 1 : 0.96,
  } = config || {};

  const runtime = buildTopicRuntime({
    topicMeta,
    slidesData,
    topicFallback: topicId,
  });

  const slidesRoot = document.getElementById("slidesRoot");
  const hudLabel = document.getElementById("hudLabel");
  const counter = document.getElementById("counter");
  const deckScale = document.getElementById("deckScale");
  const deck = document.getElementById("deck");

  const homeBtn = document.getElementById("homeBtn");
  const emailLink = document.getElementById("emailLink");
  const emailFooter = document.querySelector(".email-footer");
  const ttsControls = document.querySelector(".tts-controls");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pdfBtn = document.getElementById("pdfBtn");

  if (!slidesRoot || !deck || !deckScale) {
    console.error("deck.js: missing required deck DOM nodes");
    return null;
  }

  deck.classList.add(`theme-${theme}`);
  deck.style.setProperty("--deck-width", `${deckWidth}px`);
  deck.style.setProperty("--deck-height", `${deckHeight}px`);

  document.body.classList.toggle("analysis-mode", analysisMode);

  if (homeBtn) {
    homeBtn.href = homeHref;
    homeBtn.title = "Home";
    homeBtn.setAttribute("aria-label", "Home");
  }

  if (emailLink) {
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = email;
  }

  if (!ttsEnabled && ttsControls) {
    ttsControls.style.display = "none";
  }

  if (analysisMode && emailFooter) {
    emailFooter.classList.add("analysis-footer");
  }

  slidesRoot.innerHTML = "";
  runtime.slides.forEach((slideData, index) => {
    slidesRoot.appendChild(renderSlide(slideData, index));
  });

  const slides = Array.from(slidesRoot.querySelectorAll(".slide"));
  const slideIndexById = new Map(runtime.slides.map((slide, index) => [slide.slideId, index]));
  const overlayLayer = createOverlayLayer("deck-overlay-layer", "deckOverlayLayer");
  const debugLayer = createOverlayLayer("deck-debug-layer", "deckDebugLayer");
  deck.appendChild(overlayLayer);
  deck.appendChild(debugLayer);

  let currentSlide = 0;
  let uiPaused = false;
  let debugEnabled = Boolean(startWithDebugOverlay);
  let currentScale = 1;

  function updateCounter() {
    if (counter) counter.textContent = `${currentSlide + 1} / ${slides.length}`;
  }

  function updateHud() {
    if (!hudLabel) return;
    const hud = slides[currentSlide]?.dataset.hud || hudDefault;
    hudLabel.textContent = hudPrefix ? `${hudPrefix}${hud}` : hud;
  }

  function updateTopButtons() {
    if (!pdfBtn) return;
    pdfBtn.style.display = currentSlide === 0 && !analysisMode ? "inline-flex" : "none";
  }

  function syncPauseState() {
    deck.dataset.runtimePaused = uiPaused ? "true" : "false";
    [prevBtn, nextBtn, pdfBtn].forEach((button) => {
      if (!button) return;
      button.disabled = uiPaused;
    });
  }

  function fitToScreen() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    currentScale = Math.min(vw / deckWidth, vh / deckHeight) * fitPadding;
    deckScale.style.setProperty("--deck-scale", String(currentScale));
  }

  function resetMCQ(slideEl) {
    if (!slideEl) return;

    slideEl.querySelectorAll(".mcq").forEach((mcq) => {
      mcq.dataset.answered = "false";
      const feedback = mcq.querySelector(".feedback");
      if (feedback) {
        feedback.classList.remove("visible");
        feedback.textContent = "";
      }
      mcq.querySelectorAll(".option-btn").forEach((button) => {
        button.disabled = false;
        button.classList.remove("correct", "wrong");
      });
    });
  }

  function clearHighlights() {
    slidesRoot
      .querySelectorAll(".element-highlight")
      .forEach((element) => element.classList.remove("element-highlight"));
  }

  function findSlideIndex(slideRef) {
    if (typeof slideRef === "number") {
      if (slideRef < 0 || slideRef >= slides.length) return -1;
      return slideRef;
    }

    if (!slideRef) return -1;
    return slideIndexById.has(slideRef) ? slideIndexById.get(slideRef) : -1;
  }

  function currentSlideId() {
    return runtime.slides[currentSlide]?.slideId || "";
  }

  function refreshDebug() {
    if (!debugEnabled) {
      clearDebugOverlay(debugLayer);
      return;
    }

    const layout = collectSlideLayout(slides[currentSlide]);
    renderDebugOverlay({
      overlayRoot: debugLayer,
      layout: {
        ...layout,
        scale: currentScale,
      },
    });
  }

  function showSlide(index, options = {}) {
    if (!slides.length) return false;
    if (!options.force && uiPaused) return false;

    slides[currentSlide].classList.remove("active");
    resetMCQ(slides[currentSlide]);
    if (!options.preserveHighlights) clearHighlights();

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    document.body.dataset.currentSlideId = currentSlideId();

    updateCounter();
    updateHud();
    updateTopButtons();
    refreshDebug();

    return true;
  }

  function goToSlide(slideRef, options = {}) {
    const targetIndex = findSlideIndex(slideRef);
    if (targetIndex < 0) return false;
    return showSlide(targetIndex, { ...options, force: true });
  }

  function nextSlide(options = {}) {
    return showSlide(currentSlide + 1, { ...options, force: true });
  }

  function prevSlide(options = {}) {
    return showSlide(currentSlide - 1, { ...options, force: true });
  }

  function pause() {
    uiPaused = true;
    syncPauseState();
    return true;
  }

  function resume() {
    uiPaused = false;
    syncPauseState();
    return true;
  }

  function highlightElement(slideId, elementId) {
    if (slideId) goToSlide(slideId);
    clearHighlights();

    const scope = slides[currentSlide];
    const target = scope.querySelector(
      `[data-element-id="${escapeSelectorValue(elementId)}"]`,
    );

    if (!target) return false;
    target.classList.add("element-highlight");
    refreshDebug();
    return true;
  }

  function clearOverlay() {
    overlayLayer.innerHTML = "";
  }

  function showOverlay(data) {
    clearOverlay();
    const items = Array.isArray(data) ? data : data?.items || [];

    items.forEach((item, index) => {
      const overlay = document.createElement("div");
      overlay.className = `deck-overlay-item deck-overlay-item--${item.type || "box"}`;
      overlay.dataset.overlayId = item.id || `overlay_${index + 1}`;

      if (Array.isArray(item.bbox)) {
        overlay.style.left = `${item.bbox[0] / currentScale}px`;
        overlay.style.top = `${item.bbox[1] / currentScale}px`;
        overlay.style.width = `${(item.bbox[2] - item.bbox[0]) / currentScale}px`;
        overlay.style.height = `${(item.bbox[3] - item.bbox[1]) / currentScale}px`;
      }

      if (Array.isArray(item.point)) {
        overlay.style.left = `${item.point[0] / currentScale}px`;
        overlay.style.top = `${item.point[1] / currentScale}px`;
      }

      if (item.color) overlay.style.setProperty("--overlay-color", item.color);
      if (item.opacity != null) overlay.style.opacity = String(item.opacity);
      if (item.label) {
        const label = document.createElement("div");
        label.className = "deck-overlay-label";
        label.textContent = item.label;
        overlay.appendChild(label);
      }

      overlayLayer.appendChild(overlay);
    });
  }

  async function waitForSettledState(options = {}) {
    const timeoutMs = Number(options.assetTimeoutMs)
      || (analysisMode ? 2500 : 10000);
    await waitForDeckAssets(slidesRoot, { timeoutMs });
    await nextFrame();
    await nextFrame();
  }

  async function exportLayoutManifest(options = {}) {
    const viewport = options.viewport || [window.innerWidth, window.innerHeight];
    const previousSlide = currentSlide;
    const previousDebugState = debugEnabled;

    debugEnabled = false;
    clearDebugOverlay(debugLayer);

    await waitForSettledState(options);

    const slideLayouts = [];
    for (let index = 0; index < slides.length; index += 1) {
      showSlide(index, { force: true });
      await waitForSettledState(options);
      slideLayouts.push(collectSlideLayout(slides[index]));
    }

    if (options.restoreCurrent !== false) {
      showSlide(previousSlide, { force: true });
      await waitForSettledState(options);
    }

    debugEnabled = previousDebugState;
    refreshDebug();

    return {
      topic_id: runtime.topicId,
      viewport,
      slides: slideLayouts,
    };
  }

  function setDebugOverlay(enabled) {
    debugEnabled = Boolean(enabled);
    refreshDebug();
    return debugEnabled;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (uiPaused) return;
      showSlide(currentSlide - 1, { force: true });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (uiPaused) return;
      showSlide(currentSlide + 1, { force: true });
    });
  }

  document.addEventListener("keydown", (event) => {
    if (uiPaused) return;

    if (event.key === "ArrowRight" || event.key === " ") {
      event.preventDefault();
      showSlide(currentSlide + 1, { force: true });
    }

    if (event.key === "ArrowLeft") {
      showSlide(currentSlide - 1, { force: true });
    }

    if (event.key.toLowerCase() === "h" && homeBtn) {
      homeBtn.click();
    }
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".option-btn");
    if (!button) return;

    const mcq = button.closest(".mcq");
    if (!mcq || mcq.dataset.answered === "true") return;

    mcq.dataset.answered = "true";
    const correct = mcq.getAttribute("data-correct");
    const explain = mcq.getAttribute("data-explain") || "";
    const choice = button.getAttribute("data-choice");

    const buttons = Array.from(mcq.querySelectorAll(".option-btn"));
    buttons.forEach((item) => {
      item.disabled = true;
    });

    if (choice === correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
      const correctButton = buttons.find(
        (item) => item.getAttribute("data-choice") === correct,
      );
      if (correctButton) correctButton.classList.add("correct");
    }

    const feedback = mcq.querySelector(".feedback");
    if (feedback) {
      const ok = choice === correct;
      feedback.textContent = ok
        ? `Correct. ${explain}`
        : `Not quite. Correct answer: ${correct}. ${explain}`;
      feedback.classList.add("visible");
    }
  });

  function addPrintPageNumbers() {
    slides.forEach((slideEl, index) => {
      let pageNumber = slideEl.querySelector(".print-page-number");
      if (!pageNumber) {
        pageNumber = document.createElement("div");
        pageNumber.className = "print-page-number";
        slideEl.appendChild(pageNumber);
      }
      pageNumber.textContent = `${index + 1} / ${slides.length}`;
    });
  }

  function removePrintPageNumbers() {
    slides.forEach((slideEl) => {
      slideEl.querySelector(".print-page-number")?.remove();
    });
  }

  function exportPDF() {
    if (analysisMode || uiPaused) return;
    addPrintPageNumbers();
    document.body.classList.add("print-mode");
    window.setTimeout(() => window.print(), 50);
  }

  if (pdfBtn) pdfBtn.addEventListener("click", exportPDF);

  window.addEventListener("afterprint", () => {
    removePrintPageNumbers();
    document.body.classList.remove("print-mode");
    slides.forEach((slideEl, index) => {
      slideEl.classList.toggle("active", index === currentSlide);
    });
  });

  window.addEventListener("resize", fitToScreen);

  fitToScreen();
  slides.forEach((slideEl, index) => slideEl.classList.toggle("active", index === 0));
  syncPauseState();

  if (initialSlide != null) {
    goToSlide(initialSlide, { preserveHighlights: true });
  } else {
    showSlide(0, { force: true, preserveHighlights: true });
  }

  const controller = {
    topicId: runtime.topicId,
    topicMeta: runtime.topicMeta,
    descriptor,
    slides: runtime.slides,
    getCurrentSlideId: currentSlideId,
    getCurrentSlideIndex: () => currentSlide,
    getSlideIds: () => runtime.slides.map((slide) => slide.slideId),
    goToSlide,
    nextSlide,
    prevSlide,
    pause,
    resume,
    highlightElement,
    clearHighlights,
    showOverlay,
    clearOverlay,
    setDebugOverlay,
    refreshDebugOverlay: refreshDebug,
    waitForSettledState,
    exportLayoutManifest,
  };

  window.deckController = controller;
  window.__deckController = controller;

  return controller;
}
