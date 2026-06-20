export const SVG_NS = "http://www.w3.org/2000/svg";

export function createSvg(width = 640, height = 390) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.classList.add("calculus-plot-svg");
  return svg;
}

export function clearSvg(svg) {
  while (svg.firstChild) svg.removeChild(svg.firstChild);
}

export function scaleLinear([d0, d1], [r0, r1]) {
  const span = d1 - d0 || 1;
  return (value) => r0 + ((Number(value) - d0) / span) * (r1 - r0);
}

export function resolvePlotPadding(scales = {}) {
  const fallback = scales.padding ?? 34;
  return {
    left: scales.paddingLeft ?? scales.paddingX ?? fallback,
    right: scales.paddingRight ?? scales.paddingX ?? fallback,
    top: scales.paddingTop ?? scales.paddingY ?? fallback,
    bottom: scales.paddingBottom ?? scales.paddingY ?? fallback,
  };
}

export function plotScales({
  width = 640,
  height = 390,
  padding = 34,
  paddingX = 18,
  paddingY = 22,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  xDomain = [-4, 4],
  yDomain = [-3, 6],
} = {}) {
  const pad = resolvePlotPadding({
    padding,
    paddingX,
    paddingY,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  });
  return {
    width,
    height,
    padding: pad.left,
    paddingLeft: pad.left,
    paddingRight: pad.right,
    paddingTop: pad.top,
    paddingBottom: pad.bottom,
    x: scaleLinear(xDomain, [pad.left, width - pad.right]),
    y: scaleLinear(yDomain, [height - pad.bottom, pad.top]),
    xDomain,
    yDomain,
  };
}

export function svgEl(tag, attrs = {}) {
  const element = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value == null) return;
    element.setAttribute(key, String(value));
  });
  return element;
}

export function linePath(points = []) {
  return points
    .filter((point) => point && Number.isFinite(point[0]) && Number.isFinite(point[1]))
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point[0].toFixed(2)} ${point[1].toFixed(2)}`)
    .join(" ");
}

export function sampleFunction(fn, xDomain = [-4, 4], count = 220) {
  const [min, max] = xDomain;
  return Array.from({ length: count }, (_item, index) => {
    const x = min + ((max - min) * index) / Math.max(1, count - 1);
    return [x, fn(x)];
  });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function ySide(value, [min, max]) {
  if (!Number.isFinite(value)) return null;
  if (value < min) return -1;
  if (value > max) return 1;
  return 0;
}

export function clippedLinePath(samples = [], scales) {
  const yDomain = scales.yDomain || [-Infinity, Infinity];
  const [minY, maxY] = yDomain;
  let hasOpenSubpath = false;
  let path = "";

  const append = (command, xValue, yValue) => {
    path += `${path ? " " : ""}${command} ${scales.x(xValue).toFixed(2)} ${scales.y(yValue).toFixed(2)}`;
    hasOpenSubpath = true;
  };

  const boundaryPoint = (from, to, boundary) => {
    const [x0, y0] = from;
    const [x1, y1] = to;
    const ratio = (boundary - y0) / ((y1 - y0) || 1);
    return [x0 + (x1 - x0) * clamp(ratio, 0, 1), boundary];
  };

  let previous = null;
  samples.forEach((current) => {
    const [xValue, yValue] = current;
    const side = ySide(yValue, yDomain);
    if (side == null) {
      previous = null;
      hasOpenSubpath = false;
      return;
    }

    if (!previous) {
      if (side === 0) append("M", xValue, yValue);
      previous = current;
      return;
    }

    const previousSide = ySide(previous[1], yDomain);
    if (previousSide == null) {
      if (side === 0) append("M", xValue, yValue);
      previous = current;
      return;
    }

    if (previousSide === 0 && side === 0) {
      if (!hasOpenSubpath) append("M", previous[0], previous[1]);
      append("L", xValue, yValue);
    } else if (previousSide === 0 && side !== 0) {
      const boundary = side < 0 ? minY : maxY;
      const [clipX, clipY] = boundaryPoint(previous, current, boundary);
      if (!hasOpenSubpath) append("M", previous[0], previous[1]);
      append("L", clipX, clipY);
      hasOpenSubpath = false;
    } else if (previousSide !== 0 && side === 0) {
      const boundary = previousSide < 0 ? minY : maxY;
      const [clipX, clipY] = boundaryPoint(previous, current, boundary);
      append("M", clipX, clipY);
      append("L", xValue, yValue);
    }

    previous = current;
  });

  return path;
}

function ensurePlotBackground(svg, scales) {
  const { width, height } = scales;
  let bg = svg.querySelector(".calculus-plot-bg");
  if (!bg) {
    bg = svgEl("rect", {
      class: "calculus-plot-bg",
      x: 0,
      y: 0,
      width,
      height,
    });
    svg.insertBefore(bg, svg.firstChild);
    return;
  }
  bg.setAttribute("width", String(width));
  bg.setAttribute("height", String(height));
}

export function appendGrid(svg, scales, options = {}) {
  const { x, y, width, height, xDomain, yDomain } = scales;
  const pad = resolvePlotPadding(scales);
  ensurePlotBackground(svg, scales);
  const grid = svgEl("g", { class: "calculus-grid" });
  const xStart = Math.ceil(xDomain[0]);
  const xEnd = Math.floor(xDomain[1]);
  const yStart = Math.ceil(yDomain[0]);
  const yEnd = Math.floor(yDomain[1]);

  for (let value = xStart; value <= xEnd; value += 1) {
    grid.appendChild(svgEl("line", {
      x1: x(value),
      y1: pad.top,
      x2: x(value),
      y2: height - pad.bottom,
    }));
  }
  for (let value = yStart; value <= yEnd; value += 1) {
    grid.appendChild(svgEl("line", {
      x1: pad.left,
      y1: y(value),
      x2: width - pad.right,
      y2: y(value),
    }));
  }
  svg.appendChild(grid);

  const axes = svgEl("g", { class: "calculus-axes" });
  if (xDomain[0] <= 0 && xDomain[1] >= 0) {
    axes.appendChild(svgEl("line", { x1: x(0), y1: pad.top, x2: x(0), y2: height - pad.bottom }));
  }
  if (yDomain[0] <= 0 && yDomain[1] >= 0) {
    axes.appendChild(svgEl("line", { x1: pad.left, y1: y(0), x2: width - pad.right, y2: y(0) }));
  }
  svg.appendChild(axes);

  if (options.labels !== false) {
    svg.appendChild(svgEl("text", {
      x: width - pad.right + 8,
      y: y(0) + 4,
      class: "calculus-axis-label",
    })).textContent = "x";
    svg.appendChild(svgEl("text", {
      x: x(0) + 6,
      y: pad.top - 8,
      class: "calculus-axis-label",
    })).textContent = "y";
  }
}

export function appendCurve(svg, scales, fn, attrs = {}) {
  const samples = sampleFunction(fn, scales.xDomain, attrs.samples || 260);
  const path = svgEl("path", {
    d: clippedLinePath(samples, scales),
    fill: "none",
    class: attrs.class || "calculus-curve",
    stroke: attrs.stroke || "currentColor",
    "stroke-width": attrs.strokeWidth || 3,
  });
  svg.appendChild(path);
  return path;
}

export function appendPlotTag(svg, text, { x = 46, y = 25, anchor = "start", tone = "default" } = {}) {
  const label = String(text || "").trim();
  if (!label) return null;
  const width = Math.max(76, Math.min(320, label.length * 7.6 + 20));
  const height = 26;
  const left = anchor === "end" ? x - width : x;
  const group = svgEl("g", { class: `calculus-plot-tag calculus-plot-tag--${tone}` });
  group.appendChild(svgEl("rect", {
    x: left,
    y: y - height + 5,
    width,
    height,
    rx: 7,
    ry: 7,
  }));
  group.appendChild(svgEl("text", {
    x: left + 9,
    y,
    class: "calculus-plot-tag-text",
  })).textContent = label;
  svg.appendChild(group);
  return group;
}
