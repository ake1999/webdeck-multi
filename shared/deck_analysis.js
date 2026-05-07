function round(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

function rectToBbox(rect, originRect) {
  const x1 = round(rect.left - originRect.left);
  const y1 = round(rect.top - originRect.top);
  const x2 = round(rect.right - originRect.left);
  const y2 = round(rect.bottom - originRect.top);
  return [x1, y1, x2, y2];
}

function bboxAnchor(bbox) {
  return [
    round((bbox[0] + bbox[2]) / 2),
    round((bbox[1] + bbox[3]) / 2),
  ];
}

function intersects(a, b) {
  if (!a || !b) return false;
  return !(a[2] <= b[0] || a[0] >= b[2] || a[3] <= b[1] || a[1] >= b[3]);
}

function chooseSafeZone(candidate, elements, slideHeight, padding) {
  let top = candidate[1];

  elements.forEach((element) => {
    if (!element.visible || !intersects(candidate, element.bbox)) return;
    top = Math.max(top, element.bbox[3] + padding);
  });

  const adjusted = [candidate[0], round(top), candidate[2], candidate[3]];
  const width = adjusted[2] - adjusted[0];
  const height = adjusted[3] - adjusted[1];

  if (width < 120 || height < slideHeight * 0.18) return null;
  return adjusted;
}

export function computeSafeZones({ slideWidth, slideHeight, elements, padding = 24 }) {
  const bottomBandTop = round(slideHeight * 0.56);
  const leftCandidate = [0, bottomBandTop, round(slideWidth * 0.24), slideHeight];
  const rightCandidate = [
    round(slideWidth * 0.76),
    bottomBandTop,
    slideWidth,
    slideHeight,
  ];

  return {
    avatar_safe_left: chooseSafeZone(leftCandidate, elements, slideHeight, padding),
    avatar_safe_right: chooseSafeZone(rightCandidate, elements, slideHeight, padding),
  };
}

function elementLabel(element) {
  return (
    element.dataset.elementLabel ||
    element.dataset.elementId ||
    element.getAttribute("aria-label") ||
    element.textContent ||
    ""
  )
    .replace(/\s+/g, " ")
    .trim();
}

export function collectSlideLayout(slideEl, options = {}) {
  const slideRect = options.slideRect || slideEl.getBoundingClientRect();
  const slideId = slideEl.dataset.slideId || options.slideId || "";
  const slideType = slideEl.dataset.slideType || options.slideType || "";

  const elements = Array.from(slideEl.querySelectorAll("[data-element-id]"))
    .filter((element) => element !== slideEl)
    .map((element, order) => {
      const rect = element.getBoundingClientRect();
      const visible =
        rect.width > 0 &&
        rect.height > 0 &&
        window.getComputedStyle(element).display !== "none" &&
        window.getComputedStyle(element).visibility !== "hidden";

      const bbox = rectToBbox(rect, slideRect);

      return {
        id: element.dataset.elementId || "",
        type: element.dataset.elementType || "element",
        parent_id: element.dataset.parentElementId || "",
        label: elementLabel(element),
        order,
        bbox,
        anchor: bboxAnchor(bbox),
        visible,
      };
    });

  return {
    slide_id: slideId,
    slide_type: slideType,
    bbox: rectToBbox(slideRect, slideRect),
    elements,
    zones: computeSafeZones({
      slideWidth: round(slideRect.width),
      slideHeight: round(slideRect.height),
      elements,
    }),
  };
}

export async function waitForDeckAssets(rootEl, options = {}) {
  const timeoutMs = options.timeoutMs || 8000;
  const deadline = Date.now() + timeoutMs;

  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {}
  }

  const mediaElements = Array.from(rootEl.querySelectorAll("img, video, iframe"));

  await Promise.allSettled(
    mediaElements.map((element) => {
      if (element.tagName === "IMG") {
        if (element.complete && element.naturalWidth > 0) return Promise.resolve();
      }

      if (element.tagName === "VIDEO") {
        if (element.readyState >= 1) return Promise.resolve();
      }

      return new Promise((resolve) => {
        const cleanup = () => {
          element.removeEventListener("load", onDone);
          element.removeEventListener("error", onDone);
          element.removeEventListener("loadeddata", onDone);
          clearTimeout(timer);
          resolve();
        };

        const onDone = () => cleanup();
        const remaining = Math.max(0, deadline - Date.now());
        const timer = window.setTimeout(cleanup, remaining);

        element.addEventListener("load", onDone, { once: true });
        element.addEventListener("error", onDone, { once: true });
        element.addEventListener("loadeddata", onDone, { once: true });
      });
    }),
  );
}

export function clearDebugOverlay(overlayRoot) {
  if (!overlayRoot) return;
  overlayRoot.innerHTML = "";
}

function appendOverlayBox(overlayRoot, bbox, className, label = "", scale = 1) {
  const box = document.createElement("div");
  box.className = className;
  box.style.left = `${bbox[0] / scale}px`;
  box.style.top = `${bbox[1] / scale}px`;
  box.style.width = `${(bbox[2] - bbox[0]) / scale}px`;
  box.style.height = `${(bbox[3] - bbox[1]) / scale}px`;

  if (label) {
    const tag = document.createElement("div");
    tag.className = "deck-debug-tag";
    tag.textContent = label;
    box.appendChild(tag);
  }

  overlayRoot.appendChild(box);
}

export function renderDebugOverlay({ overlayRoot, layout }) {
  clearDebugOverlay(overlayRoot);
  if (!overlayRoot || !layout) return;
  const scale = layout.scale || 1;

  appendOverlayBox(
    overlayRoot,
    layout.bbox,
    "deck-debug-box deck-debug-box--slide",
    `slide: ${layout.slide_id}`,
    scale,
  );

  layout.elements.forEach((element) => {
    appendOverlayBox(
      overlayRoot,
      element.bbox,
      "deck-debug-box deck-debug-box--element",
      `${element.id} (${element.type})`,
      scale,
    );

    const anchor = document.createElement("div");
    anchor.className = "deck-debug-anchor";
    anchor.style.left = `${element.anchor[0] / scale}px`;
    anchor.style.top = `${element.anchor[1] / scale}px`;
    overlayRoot.appendChild(anchor);
  });

  Object.entries(layout.zones || {}).forEach(([zoneId, bbox]) => {
    if (!bbox) return;
    appendOverlayBox(
      overlayRoot,
      bbox,
      "deck-debug-box deck-debug-box--zone",
      zoneId,
      scale,
    );
  });
}
