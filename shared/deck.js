import { getCourseTerminology } from "./course_labels.js";
import { renderSlide, setDeckRenderContext } from "./deck_render.js";
import { revealAllMathSolutionSteps } from "./math_solution_steps.js";
import {
  clearDebugOverlay,
  collectSlideLayout,
  renderDebugOverlay,
  waitForDeckAssets,
} from "./deck_analysis.js";
import { collectWidgetIdsFromSlides, ensureCalculusWidgetsRegistered } from "./calculus/index.js";
import { buildTopicRuntime } from "./deck_model.js";
import { getCourseConfig } from "./course_catalog.js";
import {
  buildSessionTopicUrl,
  findTopicIndex,
  flattenCourseTopics,
  getAdjacentTopic,
  resolveTopicByPathId,
} from "./topic_navigation.js";
import { initDeckColorMode } from "./deck_color_mode.js";

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

function normalizeFocusWord(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
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
    homeIconSrc = "",
    homeIconDarkSrc = "",
    footerLogoSrc = "",
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
  const prevTopicBtn = document.getElementById("prevTopicBtn");
  const nextTopicBtn = document.getElementById("nextTopicBtn");
  const pdfBtn = document.getElementById("pdfBtn");

  if (!slidesRoot || !deck || !deckScale) {
    console.error("deck.js: missing required deck DOM nodes");
    return null;
  }

  deck.classList.add(`theme-${theme}`);
  deck.style.setProperty("--deck-width", `${deckWidth}px`);
  deck.style.setProperty("--deck-height", `${deckHeight}px`);
  if (footerLogoSrc) {
    const footerUrl = String(footerLogoSrc).replace(/["\\\n\r]/g, "");
    deck.style.setProperty("--deck-footer-image", `url("${footerUrl}")`);
  }

  document.body.classList.toggle("analysis-mode", analysisMode);

  function slideBleedsIntoFooterReserve(slideEl) {
    if (!slideEl) return false;
    const reserve = parseFloat(getComputedStyle(slideEl).paddingBottom) || 0;
    if (reserve <= 0) return false;
    const slideRect = slideEl.getBoundingClientRect();
    const safeBottom = slideRect.bottom - reserve;
    return Array.from(slideEl.children).some((child) => {
      const rect = child.getBoundingClientRect();
      return rect.height > 0 && rect.bottom > safeBottom + 1;
    });
  }

  function auditSlideFooterClearance() {
    const mark = analysisMode || debugEnabled;
    document.body.dataset.footerDebug = mark ? "1" : "";
    slides.forEach((slideEl) => {
      const overflow = mark && slideBleedsIntoFooterReserve(slideEl);
      slideEl.classList.toggle("slide--footer-overflow", overflow);
      if (overflow) {
        slideEl.dataset.footerOverflow = "true";
      } else {
        delete slideEl.dataset.footerOverflow;
      }
    });
  }

  if (homeBtn) {
    homeBtn.href = homeHref;
    homeBtn.title = "Home";
    homeBtn.setAttribute("aria-label", "Home");
    if (homeIconSrc) {
      homeBtn.textContent = "";
      homeBtn.classList.add("home-btn--image");

      const lightIcon = document.createElement("img");
      lightIcon.className = "home-btn-icon home-btn-icon--light";
      lightIcon.src = homeIconSrc;
      lightIcon.alt = "";
      lightIcon.decoding = "async";
      homeBtn.appendChild(lightIcon);

      if (homeIconDarkSrc) {
        const darkIcon = document.createElement("img");
        darkIcon.className = "home-btn-icon home-btn-icon--dark";
        darkIcon.src = homeIconDarkSrc;
        darkIcon.alt = "";
        darkIcon.decoding = "async";
        homeBtn.appendChild(darkIcon);
      }
    }
  }

  if (emailLink && email) {
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = email;
  }

  if (emailFooter) {
    emailFooter.hidden = !email;
  }

  if (!ttsEnabled && ttsControls) {
    ttsControls.style.display = "none";
  }

  if (analysisMode && emailFooter) {
    emailFooter.classList.add("analysis-footer");
  }

  const courseCfg = descriptor?.course ? getCourseConfig(descriptor.course) : null;
  const terminology = getCourseTerminology(courseCfg);
  setDeckRenderContext({ terminology });

  if (prevTopicBtn) {
    prevTopicBtn.title = terminology.prevLesson;
    prevTopicBtn.setAttribute("aria-label", terminology.prevLesson);
  }
  if (nextTopicBtn) {
    nextTopicBtn.title = terminology.nextLesson;
    nextTopicBtn.setAttribute("aria-label", terminology.nextLesson);
  }

  void ensureCalculusWidgetsRegistered(collectWidgetIdsFromSlides(runtime.slides));

  slidesRoot.innerHTML = "";
  runtime.slides.forEach((slideData, index) => {
    slidesRoot.appendChild(renderSlide(slideData, index));
  });

  const slides = Array.from(slidesRoot.querySelectorAll(".slide"));
  if (theme === "arian") {
    const watermarkSrc = homeIconSrc || "/shared/media/au-icon-light.png";
    const watermarkUrl = String(watermarkSrc).replace(/["\\\n\r]/g, "");
    deck.style.setProperty("--deck-slide-watermark-image", `url("${watermarkUrl}")`);
    slides.forEach((slideEl) => {
      const layer = document.createElement("div");
      layer.className = "slide-brand-watermark";
      layer.setAttribute("aria-hidden", "true");
      slideEl.insertBefore(layer, slideEl.firstChild);
    });
  }
  const slideIndexById = new Map(runtime.slides.map((slide, index) => [slide.slideId, index]));
  const overlayLayer = createOverlayLayer("deck-overlay-layer", "deckOverlayLayer");
  const debugLayer = createOverlayLayer("deck-debug-layer", "deckDebugLayer");
  deck.appendChild(overlayLayer);
  deck.appendChild(debugLayer);

  let currentSlide = 0;
  let uiPaused = false;
  let debugEnabled = Boolean(startWithDebugOverlay);
  let currentScale = 1;

  const flatTopics = courseCfg ? flattenCourseTopics(courseCfg) : [];
  const currentTopicIndex = flatTopics.length && descriptor
    ? findTopicIndex(flatTopics, {
      session: descriptor.session,
      topicId: runtime.topicId || descriptor.topic || topicId,
    })
    : -1;
  const topicNavEnabled = flatTopics.length > 1 && currentTopicIndex >= 0;
  const topicNavContext = topicNavEnabled
    ? { descriptor, flatTopics, currentIndex: currentTopicIndex }
    : null;

  if (topicNavEnabled) {
    deck.classList.add("deck--topic-nav");
  }

  function updateCounter() {
    if (counter) counter.textContent = `${currentSlide + 1} / ${slides.length}`;
  }

  function updateHud() {
    if (!hudLabel) return;
    const hud = slides[currentSlide]?.dataset.hud || hudDefault;
    hudLabel.textContent = hudPrefix ? `${hudPrefix}${hud}` : hud;
  }

  function updateTopButtons() {
    if (pdfBtn) {
      pdfBtn.style.display = currentSlide === 0 && !analysisMode ? "inline-flex" : "none";
    }

    if (!topicNavContext || analysisMode) {
      if (prevTopicBtn) prevTopicBtn.hidden = true;
      if (nextTopicBtn) nextTopicBtn.hidden = true;
      return;
    }

    const isFirstSlide = currentSlide === 0;
    const isLastSlide = currentSlide === slides.length - 1;
    if (prevTopicBtn) prevTopicBtn.hidden = !isFirstSlide;
    if (nextTopicBtn) nextTopicBtn.hidden = !isLastSlide;
  }

  function updateSlideTypeState() {
    const slideType = slides[currentSlide]?.dataset.slideType || "";
    deck.classList.toggle("is-title-slide", slideType === "title");
    deck.dataset.currentSlideType = slideType;
  }

  function syncPauseState() {
    deck.dataset.runtimePaused = uiPaused ? "true" : "false";
    [prevBtn, nextBtn, prevTopicBtn, nextTopicBtn, pdfBtn].forEach((button) => {
      if (!button) return;
      button.disabled = uiPaused;
    });
  }

  function fitToScreen() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    currentScale = Math.min(vw / deckWidth, vh / deckHeight) * fitPadding;
    deckScale.style.setProperty("--deck-scale", String(currentScale));
    window.dispatchEvent(
      new CustomEvent("webdeck:deck-resize", {
        detail: {
          width: deckWidth,
          height: deckHeight,
          scale: currentScale,
        },
      }),
    );
    auditSlideFooterClearance();
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

    if (typeof slideRef === "string" && slideRef.toLowerCase() === "last") {
      return slides.length ? slides.length - 1 : -1;
    }

    if (!slideRef) return -1;
    return slideIndexById.has(slideRef) ? slideIndexById.get(slideRef) : -1;
  }

  function navigateToTopicTarget(pathId) {
    if (!topicNavContext) return false;
    const entry = resolveTopicByPathId(topicNavContext.flatTopics, pathId);
    if (!entry) return false;
    window.location.href = buildSessionTopicUrl(topicNavContext.descriptor, entry);
    return true;
  }

  function navigateAdjacentTopic(direction) {
    if (!topicNavContext) return false;
    const entry = getAdjacentTopic(
      topicNavContext.flatTopics,
      topicNavContext.currentIndex,
      direction,
    );
    if (!entry) return false;
    const slide = direction === "prev" ? "last" : undefined;
    window.location.href = buildSessionTopicUrl(topicNavContext.descriptor, entry, { slide });
    return true;
  }

  function currentSlideId() {
    return runtime.slides[currentSlide]?.slideId || "";
  }

  function currentSlideElement() {
    return slides[currentSlide] || null;
  }

  function getLogicalSize() {
    return {
      width: deckWidth,
      height: deckHeight,
      scale: currentScale,
    };
  }

  function elementBoxForTarget(slideId, elementId) {
    const target = targetElementFor(slideId, elementId);
    if (!target) return null;
    return elementBoxFromRect(target.getBoundingClientRect(), target, elementId);
  }

  function targetElementFor(slideId, elementId) {
    const slideIndex = findSlideIndex(slideId || currentSlideId());
    const scope = slideIndex >= 0 ? slides[slideIndex] : slides[currentSlide];
    if (!scope || !elementId) return null;

    const escaped = escapeSelectorValue(elementId);
    return scope.querySelector(`[data-element-id="${escaped}"]`)
      || scope.querySelector(`[data-element-type="${escaped}"]`);
  }

  function elementBoxFromRect(rect, target, elementId, extra = {}) {
    const deckRect = deck.getBoundingClientRect();
    const scale = currentScale || 1;

    return {
      left: (rect.left - deckRect.left) / scale,
      top: (rect.top - deckRect.top) / scale,
      width: rect.width / scale,
      height: rect.height / scale,
      right: (rect.right - deckRect.left) / scale,
      bottom: (rect.bottom - deckRect.top) / scale,
      elementId: target.dataset.elementId || elementId,
      elementType: target.dataset.elementType || "",
      label: target.dataset.elementLabel || "",
      ...extra,
    };
  }

  function textNodesForElement(target) {
    const nodes = [];
    const walker = document.createTreeWalker(
      target,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (parent && ["SCRIPT", "STYLE"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      },
    );

    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }
    return nodes;
  }

  function textIndexForNodes(nodes) {
    let cursor = 0;
    return nodes.map((node) => {
      const start = cursor;
      const text = node.nodeValue || "";
      cursor += text.length;
      return {
        node,
        text,
        start,
        end: cursor,
      };
    });
  }

  function rangeForOffsets(indexedNodes, startOffset, endOffset) {
    if (!indexedNodes.length) return null;
    const start = Math.max(0, startOffset);
    const end = Math.max(start, endOffset);
    const startNode = indexedNodes.find((entry) => start >= entry.start && start <= entry.end)
      || indexedNodes[0];
    const endNode = [...indexedNodes].reverse().find((entry) => end >= entry.start && end <= entry.end)
      || indexedNodes[indexedNodes.length - 1];
    if (!startNode || !endNode) return null;

    const range = document.createRange();
    range.setStart(startNode.node, Math.max(0, Math.min(start - startNode.start, startNode.text.length)));
    range.setEnd(endNode.node, Math.max(0, Math.min(end - endNode.start, endNode.text.length)));
    return range;
  }

  function rectsForRange(range, target, elementId, extra = {}) {
    const rects = Array.from(range.getClientRects())
      .filter((rect) => rect.width > 1 && rect.height > 1);
    if (!rects.length) return [];
    return rects.map((rect) => elementBoxFromRect(rect, target, elementId, extra));
  }

  function tokenRangesForIndexedText(indexedNodes) {
    const fullText = indexedNodes.map((entry) => entry.text).join("");
    const ranges = [];
    const pattern = /[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu;
    let match = pattern.exec(fullText);
    while (match) {
      ranges.push({
        text: match[0],
        normalized: normalizeFocusWord(match[0]),
        start: match.index,
        end: match.index + match[0].length,
      });
      match = pattern.exec(fullText);
    }
    return ranges.filter((range) => range.normalized);
  }

  function wordTokenForFocus(tokens, words, wordIndex) {
    const sourceWords = Array.isArray(words) ? words : [];
    const word = sourceWords[wordIndex]?.word || sourceWords[wordIndex]?.text || "";
    const normalized = normalizeFocusWord(word);
    if (!normalized) return null;

    const occurrence = sourceWords
      .slice(0, wordIndex + 1)
      .filter((entry) => normalizeFocusWord(entry?.word || entry?.text || "") === normalized)
      .length;
    let seen = 0;
    for (const token of tokens) {
      if (token.normalized !== normalized) continue;
      seen += 1;
      if (seen === occurrence) return token;
    }

    return tokens.find((token) => token.normalized === normalized) || null;
  }

  function lineForProgress(lineBoxes, progress) {
    if (!lineBoxes.length) return null;
    const ordered = [...lineBoxes].sort((left, right) => {
      if (Math.abs(left.top - right.top) > 3) return left.top - right.top;
      return left.left - right.left;
    });
    const index = Math.max(0, Math.min(
      ordered.length - 1,
      Math.floor(Math.max(0, Math.min(Number(progress || 0), 0.999)) * ordered.length),
    ));
    return ordered[index];
  }

  function groupedLineBoxes(boxes) {
    const sorted = [...boxes].sort((left, right) => {
      if (Math.abs(left.top - right.top) > 3) return left.top - right.top;
      return left.left - right.left;
    });
    const lines = [];
    for (const box of sorted) {
      const line = lines.find((item) => Math.abs(item.top - box.top) <= 4);
      if (!line) {
        lines.push({ ...box });
        continue;
      }
      const left = Math.min(line.left, box.left);
      const top = Math.min(line.top, box.top);
      const right = Math.max(line.right, box.right);
      const bottom = Math.max(line.bottom, box.bottom);
      line.left = left;
      line.top = top;
      line.right = right;
      line.bottom = bottom;
      line.width = right - left;
      line.height = bottom - top;
    }
    return lines;
  }

  function textFocusBoxForTarget(slideId, elementId, options = {}) {
    const target = targetElementFor(slideId, elementId);
    if (!target) return null;

    const nodes = textNodesForElement(target);
    const indexedNodes = textIndexForNodes(nodes);
    if (!indexedNodes.length) return null;

    const fullRange = rangeForOffsets(indexedNodes, 0, indexedNodes.at(-1).end);
    const lineBoxes = fullRange
      ? groupedLineBoxes(rectsForRange(fullRange, target, elementId, { focusMode: "line" }))
      : [];

    const wordIndex = Number(options.wordIndex);
    if (Number.isInteger(wordIndex) && wordIndex >= 0) {
      const token = wordTokenForFocus(
        tokenRangesForIndexedText(indexedNodes),
        options.words,
        wordIndex,
      );
      if (token) {
        const wordRange = rangeForOffsets(indexedNodes, token.start, token.end);
        const wordBoxes = wordRange
          ? rectsForRange(wordRange, target, elementId, { focusMode: "word" })
          : [];
        if (wordBoxes.length) {
          return wordBoxes[0];
        }
      }
    }

    const lineBox = lineForProgress(lineBoxes, options.progress);
    if (lineBox) return lineBox;
    return elementBoxForTarget(slideId, elementId);
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

    updateSlideTypeState();
    updateCounter();
    updateHud();
    updateTopButtons();
    refreshDebug();
    auditSlideFooterClearance();
    window.dispatchEvent(
      new CustomEvent("webdeck:slide-change", {
        detail: {
          slideId: currentSlideId(),
          slideIndex: currentSlide,
        },
      }),
    );

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
      revealAllMathSolutionSteps(slides[index]);
      await nextFrame();
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
    auditSlideFooterClearance();
    return debugEnabled;
  }

  function getFooterOverflowSlideIds() {
    return slides
      .filter((slideEl) => slideEl.dataset.footerOverflow === "true")
      .map((slideEl) => slideEl.dataset.slideId || slideEl.id)
      .filter(Boolean);
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

  if (prevTopicBtn) {
    prevTopicBtn.addEventListener("click", () => {
      if (uiPaused) return;
      navigateAdjacentTopic("prev");
    });
  }

  if (nextTopicBtn) {
    nextTopicBtn.addEventListener("click", () => {
      if (uiPaused) return;
      navigateAdjacentTopic("next");
    });
  }

  slidesRoot.addEventListener("click", (event) => {
    const target = event.target.closest("[data-topic-nav-target]");
    if (!target || !topicNavContext) return;
    event.preventDefault();
    event.stopPropagation();
    navigateToTopicTarget(target.dataset.topicNavTarget);
  });

  slidesRoot.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const target = event.target.closest("[data-topic-nav-target]");
    if (!target || !topicNavContext) return;
    event.preventDefault();
    navigateToTopicTarget(target.dataset.topicNavTarget);
  });

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

  const colorMode = initDeckColorMode({
    deckEl: deck,
    theme,
    homeIconSrc,
    homeIconDarkSrc,
    urlPreference: new URLSearchParams(window.location.search).get("color") || "",
    controlsEl: document.querySelector(".controls"),
  });

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
    getCurrentSlideElement: currentSlideElement,
    getLogicalSize,
    getElementBox: elementBoxForTarget,
    getElementTextFocusBox: textFocusBoxForTarget,
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
    getFooterOverflowSlideIds,
    auditSlideFooterClearance,
    refreshDebugOverlay: refreshDebug,
    waitForSettledState,
    exportLayoutManifest,
    colorMode,
  };

  window.deckController = controller;
  window.__deckController = controller;
  document.body.dataset.deckReady = "true";

  return controller;
}
