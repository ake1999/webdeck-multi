// shared/deck_render.js
// Rendering helpers:
// - Stable slide/element metadata in the DOM
// - Rich text support (safe): **bold**, `inline code`, ```code blocks```,
//   auto-linkify URLs, [label](url) links
// - Math support (KaTeX): $$...$$ or \[...\] for display, \( ... \) for inline

import { mountCalculusWidget } from "./calculus/index.js";
import { bindVisualLabSlide, renderVisualLabExampleTabs } from "./visual_lab.js";
import {
  adjustMathSolutionStepSpacing,
  bindMathSolutionStepsRoot,
  normalizeTex,
  stepLeadingOp,
  stepLineGap,
  stepParts,
  stepSpeech,
} from "./math_solution_steps.js";
import { CLASSROOM_TERMINOLOGY, rebrandRoadmapLessonLabel, rebrandRoadmapNote, rebrandRoadmapSessionLabel } from "./course_labels.js";
import { topicNavTargetFromItem } from "./topic_navigation.js";

let deckRenderContext = {
  terminology: CLASSROOM_TERMINOLOGY,
};

export function setDeckRenderContext(context = {}) {
  deckRenderContext = {
    terminology: context.terminology || CLASSROOM_TERMINOLOGY,
  };
}

function applyTopicNavTarget(node, item, index) {
  const { pathId, number } = topicNavTargetFromItem(item, index);
  node.dataset.topicNavTarget = pathId;
  node.dataset.topicGlobalNumber = String(number);
  node.classList.add("course-nav-target");
  node.setAttribute("role", "link");
  node.setAttribute("tabindex", "0");
  node.setAttribute("title", `Open topic ${number}`);
}

function typesetMath(root) {
  if (!window.katex) return;

  root.querySelectorAll("[data-tex]").forEach((el) => {
    const tex = el.dataset.tex || "";
    const displayMode = el.dataset.display === "true";
    try {
      window.katex.render(tex, el, {
        displayMode,
        throwOnError: false,
        strict: "ignore",
        trust: false,
      });
    } catch {
      el.textContent = tex;
    }
  });
}

function applyElementMetadata(element, meta = {}) {
  if (!element || !meta.slideId || !meta.elementId) return element;

  element.dataset.slideId = meta.slideId;
  element.dataset.elementId = meta.elementId;
  element.dataset.elementType = meta.elementType || "element";
  if (meta.parentElementId) {
    element.dataset.parentElementId = meta.parentElementId;
  }
  if (meta.label) {
    element.dataset.elementLabel = meta.label;
  }
  element.id = `${meta.slideId}__${meta.elementId}`;
  return element;
}

function annotateRichArtifacts(root, slideId, parentElementId, counters) {
  root.querySelectorAll("pre.code-block").forEach((block) => {
    if (block.dataset.elementId) return;
    applyElementMetadata(block, {
      slideId,
      parentElementId,
      elementId: `code_${counters.code++}`,
      elementType: "code",
      label: (block.textContent || "").trim().slice(0, 120),
    });
  });

  root.querySelectorAll("[data-tex]").forEach((mathEl) => {
    if (mathEl.dataset.elementId) return;
    applyElementMetadata(mathEl, {
      slideId,
      parentElementId,
      elementId: `math_${counters.math++}`,
      elementType: "math",
      label: (mathEl.dataset.tex || "").trim(),
    });
  });
}

function setRichTextContent(element, text, meta, counters, options = {}) {
  element.innerHTML = richTextToHtml(text, options);
  applyElementMetadata(element, meta);
  annotateRichArtifacts(element, meta.slideId, meta.elementId, counters);
}

function createRichTextElement(tagName, text, meta, counters, options = {}) {
  const element = document.createElement(tagName);
  if (options.className) element.className = options.className;
  if (options.style) element.setAttribute("style", options.style);
  if (options.sayText !== undefined) {
    element.setAttribute("data-say", plainTextForSay(options.sayText));
  }

  setRichTextContent(element, text, meta, counters, options.richTextOptions || {});
  return element;
}

function renderParagraphList(paragraphs, slideId, counters) {
  const fragment = document.createDocumentFragment();

  paragraphs.forEach((paragraph) => {
    const p = createRichTextElement(
      "p",
      paragraph.text,
      {
        slideId,
        elementId: paragraph.id,
        elementType: "paragraph",
        label: plainTextForSay(paragraph.text),
      },
      counters,
      {
        className: "deck-paragraph",
        sayText: paragraph.say || paragraph.text,
      },
    );

    fragment.appendChild(p);
  });

  return fragment;
}

function renderBulletList(items, slideId, counters) {
  const list = document.createElement("ul");
  list.className = "bullets";

  items.forEach((item) => {
    const li = createRichTextElement(
      "li",
      item.text,
      {
        slideId,
        elementId: item.id,
        elementType: "bullet",
        label: plainTextForSay(item.text),
      },
      counters,
      {
        sayText: item.say || item.text,
      },
    );

    if (Array.isArray(item.children) && item.children.length) {
      li.appendChild(renderBulletList(item.children, slideId, counters));
    }

    list.appendChild(li);
  });

  return list;
}

function finalizeSlide(slide, slideData = null) {
  typesetMath(slide);
  slide.querySelectorAll(".math-solution-steps").forEach((root) => {
    bindMathSolutionStepsRoot(root);
    adjustMathSolutionStepSpacing(root);
  });
  if (slideData?.type === "visual_lab") {
    bindVisualLabSlide(slide, slideData);
  }
  return slide;
}

function resolveMathSolutionStepLayout(block) {
  const raw = String(block.stepLayout || block.layout || "flow").toLowerCase();
  if (raw === "stack" || raw === "vertical") return "stack";
  if (raw === "chain" || raw === "horizontal" || raw === "equal" || raw === "compact") return "chain";
  return "flow";
}

function renderMathSolutionSteps(block, slideId, counters) {
  const wrapper = document.createElement("div");
  wrapper.className = "content-block content-block--math_solution_steps math-solution-steps-shell";
  applyElementMetadata(wrapper, {
    slideId,
    elementId: block.id,
    elementType: "math_solution_steps",
    label: plainTextForSay(block.title || block.problem || "Math solution"),
  });

  if (block.title) {
    wrapper.appendChild(createRichTextElement(
      "div",
      block.title,
      {
        slideId,
        parentElementId: block.id,
        elementId: block.titleId || `${block.id}_title`,
        elementType: "math_solution_steps_title",
        label: plainTextForSay(block.title),
      },
      counters,
      { className: "content-block-title math-solution-title", sayText: block.title },
    ));
  }

  const steps = asArray(block.steps);
  const stepLayout = resolveMathSolutionStepLayout(block);
  const chainOp = block.chainOp || "=";
  const splitAfter = Number(block.splitAfter ?? block.leftSteps ?? 0);
  const useSplit = splitAfter > 0 && steps.length > splitAfter;
  const lanes = useSplit
    ? [
      { key: "left", steps: steps.slice(0, splitAfter), startIndex: 0 },
      { key: "right", steps: steps.slice(splitAfter), startIndex: splitAfter },
    ]
    : [{ key: "single", steps, startIndex: 0 }];

  const board = document.createElement("div");
  board.className = `math-solution-steps math-solution-steps--${stepLayout}`;
  if (useSplit) {
    board.classList.add("math-solution-steps--split");
    board.dataset.splitAfter = String(splitAfter);
  }
  board.dataset.revealMode = block.revealMode || "sequential";
  board.dataset.initialRevealed = String(Number(block.startVisible ?? 0));
  board.dataset.slideId = slideId;
  board.dataset.blockId = block.id;
  board.dataset.stepLayout = stepLayout;
  board.setAttribute("role", "group");
  board.setAttribute("aria-label", plainTextForSay(block.title || "Step-by-step solution"));

  if (block.problem) {
    const problem = createRichTextElement(
      "div",
      normalizeTex(block.problem),
      {
        slideId,
        parentElementId: block.id,
        elementId: block.problemId || `${block.id}_problem`,
        elementType: "math_solution_problem",
        label: plainTextForSay(block.problem),
      },
      counters,
      { className: "math-solution-problem", sayText: block.problemSay || block.problem },
    );
    board.appendChild(problem);
  }

  const columns = document.createElement("div");
  columns.className = useSplit
    ? "math-solution-columns"
    : "math-solution-columns math-solution-columns--single";
  board.appendChild(columns);

  lanes.forEach((lane) => {
    if (useSplit && lane.key === "right") {
      const divider = document.createElement("div");
      divider.className = "math-solution-split-divider";
      divider.dataset.splitDivider = "true";
      divider.setAttribute("aria-hidden", "true");
      columns.appendChild(divider);
    }

    const laneEl = document.createElement("div");
    laneEl.className = `math-solution-lane math-solution-lane--${lane.key}`;
    if (stepLayout === "chain") {
      laneEl.classList.add("math-solution-chain");
    }
    columns.appendChild(laneEl);

    lane.steps.forEach((step, laneIndex) => {
      const index = lane.startIndex + laneIndex;
      const stepId = step.id || `${block.id}_step_${index + 1}`;
      const parts = stepParts(step);
      const stepEl = document.createElement("div");
      stepEl.className = "math-solution-step";
      stepEl.dataset.mathStepIndex = String(index);
      stepEl.dataset.authoredGap = stepLineGap(step);
      stepEl.dataset.lineGap = stepLineGap(step);
      applyElementMetadata(stepEl, {
        slideId,
        parentElementId: block.id,
        elementId: stepId,
        elementType: "math_solution_step",
        label: plainTextForSay(stepSpeech(step) || parts.map((part) => part.math).join(" ") || `Step ${index + 1}`),
      });
      stepEl.setAttribute("aria-label", `Step ${index + 1}`);

      const leadingOp = (stepLayout === "flow" || stepLayout === "chain")
        ? stepLeadingOp(step, chainOp)
        : "";
      if (leadingOp) {
        const opEl = document.createElement("span");
        opEl.className = "math-solution-chain-op math-solution-chain-op--leading";
        opEl.textContent = leadingOp;
        opEl.setAttribute("aria-hidden", "true");
        stepEl.appendChild(opEl);
      }

      const body = document.createElement("div");
      body.className = parts.length > 1
        ? "math-solution-step-body math-solution-step-body--merged"
        : "math-solution-step-body";
      stepEl.appendChild(body);

      parts.forEach((part, partIndex) => {
        if (part.op) {
          const innerOp = document.createElement("span");
          innerOp.className = "math-solution-chain-op math-solution-chain-op--inner";
          innerOp.textContent = part.op;
          innerOp.setAttribute("aria-hidden", "true");
          body.appendChild(innerOp);
        }

        const mathLine = createRichTextElement(
          "div",
          normalizeTex(part.math),
          {
            slideId,
            parentElementId: stepId,
            elementId: parts.length === 1
              ? `${stepId}_math`
              : `${stepId}_math_${partIndex + 1}`,
            elementType: "math",
            label: plainTextForSay(part.math),
          },
          counters,
          {
            className: "math-solution-math",
            sayText: partIndex === 0 ? (step.say || step.note || part.math) : part.math,
          },
        );
        body.appendChild(mathLine);
      });

      const note = stepSpeech(step);
      if (stepLayout === "stack" && note && parts.length) {
        stepEl.appendChild(createRichTextElement(
          "div",
          note,
          {
            slideId,
            parentElementId: stepId,
            elementId: `${stepId}_note`,
            elementType: "paragraph",
            label: plainTextForSay(note),
          },
          counters,
          { className: "math-solution-note", sayText: note },
        ));
      }

      attachWidgetParams(stepEl, slideId, step);
      laneEl.appendChild(stepEl);
    });
  });

  const advance = document.createElement("button");
  advance.type = "button";
  advance.className = "math-solution-advance";
  advance.textContent = block.advanceLabel || "Next step →";
  board.appendChild(advance);

  wrapper.appendChild(board);
  return wrapper;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function renderBlockList(items, slideId, counters, ordered = false) {
  const list = document.createElement(ordered ? "ol" : "ul");
  list.className = ordered ? "calculus-step-list" : "bullets";
  items.forEach((item) => {
    const li = createRichTextElement(
      "li",
      item.text,
      {
        slideId,
        elementId: item.id,
        elementType: ordered ? "step" : "bullet",
        label: plainTextForSay(item.text),
      },
      counters,
      {
        sayText: item.say || item.text,
      },
    );
    attachWidgetParams(li, slideId, item);
    if (Array.isArray(item.children) && item.children.length) {
      li.appendChild(renderBlockList(item.children, slideId, counters, false));
    }
    list.appendChild(li);
  });
  return list;
}

function attachWidgetParams(element, slideId, source = {}) {
  const params = source.widgetParams || source.paramsOnClick;
  if (!element || !params || typeof params !== "object") return;
  element.classList.add("widget-step-trigger");
  element.dataset.widgetParams = JSON.stringify(params);
  if (source.widgetId) element.dataset.widgetId = source.widgetId;
  element.tabIndex = 0;
  element.setAttribute("role", "button");
  element.setAttribute("aria-label", `${element.dataset.elementLabel || "Step"}: show this state on the plot`);

  const activate = () => {
    window.dispatchEvent(new CustomEvent("webdeck:widget-params", {
      detail: {
        slideId,
        widgetId: source.widgetId || "",
        params,
        duration: source.duration ?? 1000,
      },
    }));
  };

  element.addEventListener("click", activate);
  element.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    activate();
  });
}

function renderMathTable(block, slideId, counters) {
  const table = document.createElement("table");
  const firstHeader = Array.isArray(block.headers) ? plainTextForSay(block.headers[0] || "") : "";
  table.className = /^steps?$/i.test(firstHeader) ? "math-table math-table--step-column" : "math-table";
  applyElementMetadata(table, {
    slideId,
    elementId: block.id,
    elementType: "math_table",
    label: block.title || "Math table",
  });

  if (Array.isArray(block.headers) && block.headers.length) {
    const thead = document.createElement("thead");
    const row = document.createElement("tr");
    block.headers.forEach((header, index) => {
      const th = createRichTextElement(
        "th",
        header,
        {
          slideId,
          parentElementId: block.id,
          elementId: `${block.id}_header_${index + 1}`,
          elementType: "table_header",
          label: plainTextForSay(header),
        },
        counters,
      );
      row.appendChild(th);
    });
    thead.appendChild(row);
    table.appendChild(thead);
  }

  const tbody = document.createElement("tbody");
  (block.rows || []).forEach((cells, rowIndex) => {
    const row = document.createElement("tr");
    const rowAction = Array.isArray(block.rowActions) ? block.rowActions[rowIndex] : null;
    attachWidgetParams(row, slideId, rowAction || {});
    cells.forEach((cell, colIndex) => {
      const td = createRichTextElement(
        "td",
        cell,
        {
          slideId,
          parentElementId: block.id,
          elementId: `${block.id}_r${rowIndex + 1}_c${colIndex + 1}`,
          elementType: "table_cell",
          label: plainTextForSay(cell),
        },
        counters,
      );
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  return table;
}

function blockTitle(block, fallback = "") {
  return block.title || fallback;
}

function segmentPath(from, to) {
  const dx = Math.max(40, Math.abs(to.x - from.x) * 0.45);
  return `M ${from.x} ${from.y} C ${from.x + dx} ${from.y}, ${to.x - dx} ${to.y}, ${to.x} ${to.y}`;
}

function verticalSegmentPath(from, to) {
  const dy = Math.max(32, Math.abs(to.y - from.y) * 0.38);
  return `M ${from.x} ${from.y} C ${from.x} ${from.y + dy}, ${to.x} ${to.y - dy}, ${to.x} ${to.y}`;
}

function coursePathPoints(count, orientation = "horizontal") {
  const total = Math.max(1, count);
  if (orientation === "vertical") {
    if (total === 1) return [{ x: 500, y: 430 }];
    return Array.from({ length: total }, (_item, index) => {
      const y = 76 + index * (708 / (total - 1));
      const x = index % 2 === 0 ? 420 : 570;
      return { x, y };
    });
  }
  if (total === 1) return [{ x: 500, y: 108 }];
  return Array.from({ length: total }, (_item, index) => {
    const x = 76 + index * (848 / (total - 1));
    const wave = index % 2 === 0 ? 82 : 140;
    return { x, y: wave };
  });
}

function renderCoursePathBody(block, slideId, counters) {
  const items = Array.isArray(block.items) ? block.items : [];
  if (block.layout === "topic_grid") {
    return renderCourseTopicGrid(block, items, slideId, counters);
  }
  const orientation = block.orientation === "vertical" ? "vertical" : "horizontal";
  const stage = document.createElement("div");
  stage.className = `course-path-stage course-path-stage--${orientation}`;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "course-path-svg");
  svg.setAttribute("viewBox", orientation === "vertical" ? "0 0 1000 860" : "0 0 1000 220");
  svg.setAttribute("aria-hidden", "true");

  const points = coursePathPoints(items.length, orientation);
  points.slice(0, -1).forEach((point, index) => {
    const nextPoint = points[index + 1];
    const nextStatus = items[index + 1]?.status || "upcoming";
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", orientation === "vertical" ? verticalSegmentPath(point, nextPoint) : segmentPath(point, nextPoint));
    path.setAttribute("class", `course-path-curve course-path-curve--${nextStatus}`);
    svg.appendChild(path);
  });
  stage.appendChild(svg);

  items.forEach((item, index) => {
    const point = points[index];
    const status = item.status || (item.id === block.currentId ? "current" : "upcoming");
    const node = document.createElement("div");
    node.className = `course-path-node course-path-node--${status}`;
    node.style.left = `${point.x / 10}%`;
    node.style.top = orientation === "vertical" ? `${point.y / 8.6}%` : `${point.y / 2.2}%`;
    applyElementMetadata(node, {
      slideId,
      parentElementId: block.id,
      elementId: item.id || `${block.id}_item_${index + 1}`,
      elementType: "course_path_item",
      label: plainTextForSay([item.label, item.note].filter(Boolean).join(": ")),
    });
    applyTopicNavTarget(node, item, index);

    const marker = document.createElement("div");
    marker.className = "course-path-marker";
    marker.textContent = status === "completed" ? "✓" : String(index + 1);
    node.appendChild(marker);

    node.appendChild(createRichTextElement(
      "div",
      item.label || `Step ${index + 1}`,
      {
        slideId,
        parentElementId: item.id || block.id,
        elementId: `${item.id || `${block.id}_item_${index + 1}`}_label`,
        elementType: "course_path_label",
        label: plainTextForSay(item.label || ""),
      },
      counters,
      { className: "course-path-label", sayText: item.say || item.label || "" },
    ));

    if (item.note) {
      node.appendChild(createRichTextElement(
        "div",
        item.note,
        {
          slideId,
          parentElementId: item.id || block.id,
          elementId: `${item.id || `${block.id}_item_${index + 1}`}_note`,
          elementType: "course_path_note",
          label: plainTextForSay(item.note),
        },
        counters,
        { className: "course-path-note", sayText: item.note },
      ));
    }
    stage.appendChild(node);
  });

  return stage;
}

function renderCourseTopicGrid(block, items, slideId, counters) {
  const stage = document.createElement("div");
  stage.className = "course-topic-grid";

  const grouped = [];
  items.forEach((item, index) => {
    const session = item.session || "";
    let group = grouped[grouped.length - 1];
    if (!group || group.session !== session) {
      group = { session, items: [] };
      grouped.push(group);
    }
    group.items.push({ ...item, _index: index });
  });

  const terminology = deckRenderContext.terminology || CLASSROOM_TERMINOLOGY;

  grouped.forEach((group, groupIndex) => {
    const section = document.createElement("div");
    section.className = "course-topic-session";

    const sessionLabel = rebrandRoadmapSessionLabel(
      group.session || `${terminology.unit} ${groupIndex + 1}`,
      terminology,
    );

    const heading = createRichTextElement(
      "div",
      sessionLabel,
      {
        slideId,
        parentElementId: block.id,
        elementId: `${block.id}_session_${groupIndex + 1}`,
        elementType: "course_path_session",
        label: plainTextForSay(sessionLabel),
      },
      counters,
      { className: "course-topic-session-title", sayText: sessionLabel },
    );
    section.appendChild(heading);

    const track = document.createElement("div");
    track.className = "course-topic-track";

    group.items.forEach((item) => {
      const status = item.status || (item.id === block.currentId ? "current" : "upcoming");
      const expanded = Boolean(item.expanded || status === "current");
      const node = document.createElement("div");
      node.className = [
        "course-topic-item",
        `course-topic-item--${status}`,
        expanded ? "course-topic-item--expanded" : "course-topic-item--compact",
      ].join(" ");
      applyElementMetadata(node, {
        slideId,
        parentElementId: block.id,
        elementId: item.id || `${block.id}_topic_${item._index + 1}`,
        elementType: "course_path_item",
        label: plainTextForSay([item.number || item._index + 1, item.label, item.note].filter(Boolean).join(": ")),
      });
      applyTopicNavTarget(node, item, item._index);

      const marker = document.createElement("span");
      marker.className = "course-topic-number";
      marker.textContent = String(item.number || item._index + 1);
      node.appendChild(marker);

      if (expanded) {
        const textWrap = document.createElement("span");
        textWrap.className = "course-topic-copy";
        const lessonLabel = rebrandRoadmapLessonLabel(item, terminology);
        textWrap.appendChild(createRichTextElement(
          "span",
          lessonLabel,
          {
            slideId,
            parentElementId: item.id || block.id,
            elementId: `${item.id || `${block.id}_topic_${item._index + 1}`}_label`,
            elementType: "course_path_label",
            label: plainTextForSay(lessonLabel),
          },
          counters,
          { className: "course-topic-label", sayText: item.say || lessonLabel || "" },
        ));
        const lessonNote = rebrandRoadmapNote(item.note, terminology);
        if (lessonNote) {
          textWrap.appendChild(createRichTextElement(
            "span",
            lessonNote,
            {
              slideId,
              parentElementId: item.id || block.id,
              elementId: `${item.id || `${block.id}_topic_${item._index + 1}`}_note`,
              elementType: "course_path_note",
            label: plainTextForSay(lessonNote),
          },
          counters,
          { className: "course-topic-note", sayText: lessonNote },
          ));
        }
        node.appendChild(textWrap);
      }

      track.appendChild(node);
    });

    section.appendChild(track);
    stage.appendChild(section);
  });

  return stage;
}

function renderBlock(block, slideId, counters) {
  if (!block) return null;

  if (block.type === "math_table") {
    return renderMathTable(block, slideId, counters);
  }

  const wrapper = document.createElement("div");
  const type = block.type || "paragraph";
  wrapper.className = `content-block content-block--${type}`;
  applyElementMetadata(wrapper, {
    slideId,
    elementId: block.id,
    elementType: type,
    label: plainTextForSay(block.title || block.text || block.formula || type),
  });

  const title = blockTitle(block, {
    formula_block: "Formula",
    derivation_steps: "Derivation",
    theorem_box: "Theorem",
    example_solution: "Example",
    math_solution_steps: "Solution",
    proof_sketch: "Proof sketch",
    misconception_compare: "Compare",
    pause_and_reveal: "Pause",
    nested_bullets: "",
    course_path: "",
    paragraph: "",
  }[type] || "");

  if (title) {
    wrapper.appendChild(
      createRichTextElement(
        "div",
        title,
        {
          slideId,
          parentElementId: block.id,
          elementId: block.titleId || `${block.id}_title`,
          elementType: `${type}_title`,
          label: plainTextForSay(title),
        },
        counters,
        { className: "content-block-title", sayText: title },
      ),
    );
  }

  if (type === "formula_block") {
    const formulas = Array.isArray(block.formulas) && block.formulas.length
      ? block.formulas
      : [block.formula ? `$$${block.formula}$$` : block.text].filter(Boolean);
    formulas.forEach((formula, index) => {
      wrapper.appendChild(
        createRichTextElement(
          "div",
          formula,
          {
            slideId,
            parentElementId: block.id,
            elementId: formulas.length === 1
              ? block.bodyId || `${block.id}_body`
              : `${block.id}_formula_${index + 1}`,
            elementType: "formula",
            label: plainTextForSay(formula),
          },
          counters,
          { className: "formula-block-body", sayText: block.say || formula },
        ),
      );
    });
    return wrapper;
  }

  if (type === "math_solution_steps") {
    return renderMathSolutionSteps(block, slideId, counters);
  }

  if (type === "derivation_steps" || type === "example_solution" || type === "proof_sketch") {
    if (block.text) {
      wrapper.appendChild(
        createRichTextElement(
          "p",
          block.text,
          {
            slideId,
            parentElementId: block.id,
            elementId: block.bodyId || `${block.id}_body`,
            elementType: `${type}_body`,
            label: plainTextForSay(block.text),
          },
          counters,
          { className: "deck-paragraph", sayText: block.say || block.text },
        ),
      );
    }
    if (Array.isArray(block.steps) && block.steps.length) {
      wrapper.appendChild(renderBlockList(block.steps, slideId, counters, true));
    }
    return wrapper;
  }

  if (type === "theorem_box") {
    if (block.text) {
      wrapper.appendChild(
        createRichTextElement(
          "p",
          block.text,
          {
            slideId,
            parentElementId: block.id,
            elementId: block.bodyId || `${block.id}_body`,
            elementType: "theorem_statement",
            label: plainTextForSay(block.text),
          },
          counters,
          { className: "deck-paragraph", sayText: block.say || block.text },
        ),
      );
    }
    return wrapper;
  }

  if (type === "misconception_compare") {
    const compare = document.createElement("div");
    compare.className = "misconception-compare-grid";
    const pairs = block.pairs || [
      { label: "Tempting mistake", text: block.wrong || "" },
      { label: "Safer reasoning", text: block.correct || block.text || "" },
    ];
    pairs.forEach((pair, index) => {
      const panel = document.createElement("div");
      panel.className = index === 0 ? "compare-panel compare-panel--wrong" : "compare-panel compare-panel--right";
      panel.appendChild(createRichTextElement(
        "div",
        pair.label || (index === 0 ? "Mistake" : "Correction"),
        {
          slideId,
          parentElementId: block.id,
          elementId: `${block.id}_compare_${index + 1}_label`,
          elementType: "compare_label",
          label: pair.label || "",
        },
        counters,
        { className: "compare-label" },
      ));
      panel.appendChild(createRichTextElement(
        "p",
        pair.text || "",
        {
          slideId,
          parentElementId: block.id,
          elementId: `${block.id}_compare_${index + 1}`,
          elementType: "compare_text",
          label: plainTextForSay(pair.text || ""),
        },
        counters,
        { className: "deck-paragraph", sayText: pair.say || pair.text || "" },
      ));
      compare.appendChild(panel);
    });
    wrapper.appendChild(compare);
    return wrapper;
  }

  if (type === "pause_and_reveal") {
    const details = document.createElement("details");
    details.className = "pause-reveal";
    const summary = createRichTextElement(
      "summary",
      block.prompt || block.text || "Pause and predict",
      {
        slideId,
        parentElementId: block.id,
        elementId: block.promptId || block.bodyId || `${block.id}_prompt`,
        elementType: "prompt",
        label: plainTextForSay(block.prompt || block.text),
      },
      counters,
      { sayText: block.say || block.prompt || block.text },
    );
    details.appendChild(summary);
    if (block.reveal?.text) {
      details.appendChild(createRichTextElement(
        "div",
        block.reveal.text,
        {
          slideId,
          parentElementId: block.id,
          elementId: block.reveal.id || `${block.id}_reveal`,
          elementType: "reveal",
          label: plainTextForSay(block.reveal.text),
        },
        counters,
        { className: "reveal-body", sayText: block.reveal.say || block.reveal.text },
      ));
    }
    wrapper.appendChild(details);
    return wrapper;
  }

  if (type === "nested_bullets") {
    const ordered = block.ordered !== false;
    wrapper.appendChild(renderBlockList(block.items, slideId, counters, ordered));
    return wrapper;
  }

  if (type === "course_path") {
    wrapper.appendChild(renderCoursePathBody(block, slideId, counters));
    return wrapper;
  }

  if (block.text) {
    wrapper.appendChild(
      createRichTextElement(
        "p",
        block.text,
        {
          slideId,
          parentElementId: block.id,
          elementId: block.bodyId || `${block.id}_body`,
          elementType: "paragraph",
          label: plainTextForSay(block.text),
        },
        counters,
        { className: "deck-paragraph", sayText: block.say || block.text },
      ),
    );
  }

  return wrapper;
}

function renderBlocks(blocks, slideId, counters) {
  const fragment = document.createDocumentFragment();
  (blocks || []).forEach((block) => {
    const rendered = renderBlock(block, slideId, counters);
    if (rendered) fragment.appendChild(rendered);
  });
  return fragment;
}

function renderLegacyHtml(html, meta, counters) {
  const wrapper = document.createElement("div");
  wrapper.className = "legacy-html";
  wrapper.innerHTML = html || "";
  applyElementMetadata(wrapper, meta);
  annotateRichArtifacts(wrapper, meta.slideId, meta.elementId, counters);
  return wrapper;
}

function resolveMediaSrc(src) {
  const value = String(src || "").trim();
  if (!value) return "";
  if (/^(?:[a-z]+:|\/\/|\/|\.\/|\.\.\/|#)/i.test(value)) return value;
  return `/${value}`;
}

function renderSlideQuestion(slide, slideEl, counters) {
  if (!slide.question) return;
  slideEl.appendChild(
    createRichTextElement(
      "div",
      slide.question,
      {
        slideId: slide.slideId,
        elementId: slide.questionId || "question",
        elementType: "question",
        label: plainTextForSay(slide.question),
      },
      counters,
      {
        className: "slide-question",
        sayText: slide.questionSay || slide.question,
      },
    ),
  );
}

function renderMedia(media, meta, counters) {
  if (!media) return null;

  if ((media.kind || "").toLowerCase() === "gallery") {
    const items = Array.isArray(media.items) ? media.items : [];
    if (!items.length) return null;

    const wrap = document.createElement("div");
    wrap.className = "media-fill";

    const stage = document.createElement("div");
    stage.className = "media-stage gallery-stack";
    applyElementMetadata(stage, {
      slideId: meta.slideId,
      parentElementId: meta.parentElementId,
      elementId: media.id,
      elementType: "gallery",
      label: media.caption || media.source || media.id,
    });

    const fitDefault = (media.fit || "contain").toLowerCase();

    items.forEach((item) => {
      if (!item?.src) return;

      const img = document.createElement("img");
      img.src = resolveMediaSrc(item.src);
      img.alt = item.alt || item.caption || "";
      img.className = ((item.fit || fitDefault) + "").toLowerCase() === "cover"
        ? "fit-cover stacked-media"
        : "fit-contain stacked-media";

      applyElementMetadata(img, {
        slideId: meta.slideId,
        parentElementId: media.id,
        elementId: item.id,
        elementType: "image",
        label: item.caption || item.alt || item.id,
      });

      stage.appendChild(img);
    });

    wrap.appendChild(stage);

    const srcText = media.source || media.caption;
    const srcHref = media.sourceHref || media.href;
    if (srcText) {
      const cap = document.createElement("div");
      cap.className = "media-caption";
      applyElementMetadata(cap, {
        slideId: meta.slideId,
        parentElementId: media.id,
        elementId: `${media.id}_caption`,
        elementType: "caption",
        label: srcText,
      });

      if (srcHref) {
        const a = document.createElement("a");
        a.href = srcHref;
        a.target = "_blank";
        a.rel = "noreferrer";
        a.textContent = srcText;
        cap.appendChild(document.createTextNode("Source: "));
        cap.appendChild(a);
      } else {
        cap.textContent = `Source: ${srcText}`;
      }
      wrap.appendChild(cap);
    }

    return wrap;
  }

  const kind = (media.kind || "image").toLowerCase();
  if (!media.src && kind !== "calculus_widget") return null;

  const wrap = document.createElement("div");
  wrap.className = "media-fill";

  const stage = document.createElement("div");
  stage.className = "media-stage";

  const fit = (media.fit || "contain").toLowerCase();

  let element;

  if (kind === "calculus_widget") {
    element = document.createElement("div");
    element.className = "calculus-widget-mount";
  } else if (kind === "video") {
    element = document.createElement("video");
    element.src = resolveMediaSrc(media.src);
    element.controls = media.controls ?? true;
    element.autoplay = media.autoplay ?? false;
    element.loop = media.loop ?? false;
    element.muted = media.muted ?? false;
    element.playsInline = true;
    if (media.poster) element.poster = media.poster;
  } else if (kind === "iframe" || kind === "widget") {
    element = document.createElement("iframe");
    element.src = resolveMediaSrc(media.src);
    element.allow = media.allow || "fullscreen";
    element.title = media.title || media.caption || media.source || media.id;
    element.loading = media.loading || "eager";
    if (media.allowFullscreen !== false) {
      element.setAttribute("allowfullscreen", "");
    }
  } else {
    element = document.createElement("img");
    element.src = resolveMediaSrc(media.src);
    element.alt = media.alt || media.caption || "";
    element.loading = media.loading || "eager";
  }

  if (element.tagName === "IMG" || element.tagName === "VIDEO") {
    element.classList.add(fit === "cover" ? "fit-cover" : "fit-contain");
  }

  applyElementMetadata(element, {
    slideId: meta.slideId,
    parentElementId: meta.parentElementId,
    elementId: media.id,
    elementType: kind === "widget" || kind === "calculus_widget" ? "widget" : kind,
    label: media.title || media.caption || media.source || media.alt || media.id,
  });

  stage.appendChild(element);
  wrap.appendChild(stage);

  if (kind === "calculus_widget") {
    const enqueue = window.queueMicrotask || ((fn) => window.setTimeout(fn, 0));
    enqueue(() => mountCalculusWidget(element, media));
  }

  const srcText = kind === "calculus_widget" ? "" : (media.source || media.caption);
  const srcHref = media.sourceHref || media.href;
  if (srcText) {
    const cap = document.createElement("div");
    cap.className = "media-caption";
    applyElementMetadata(cap, {
      slideId: meta.slideId,
      parentElementId: media.id,
      elementId: `${media.id}_caption`,
      elementType: "caption",
      label: srcText,
    });

    if (srcHref) {
      const a = document.createElement("a");
      a.href = srcHref;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.textContent = srcText;
      cap.appendChild(document.createTextNode("Source: "));
      cap.appendChild(a);
    } else {
      cap.innerHTML = richTextToHtml(`Source: ${srcText}`);
    }
    wrap.appendChild(cap);
  }

  return wrap;
}

function renderColumn(column, slideId, counters) {
  const columnEl = document.createElement("div");
  columnEl.className = "col";

  if (!column) return columnEl;

  if (column.lead) {
    const lead = createRichTextElement(
      "div",
      column.lead,
      {
        slideId,
        elementId: column.leadId,
        elementType: "lead",
        label: plainTextForSay(column.lead),
      },
      counters,
      {
        className: "lead",
        sayText: column.lead,
      },
    );
    columnEl.appendChild(lead);
  }

  if (Array.isArray(column.paragraphs) && column.paragraphs.length) {
    columnEl.appendChild(renderParagraphList(column.paragraphs, slideId, counters));
  }

  if (Array.isArray(column.blocks) && column.blocks.length) {
    columnEl.appendChild(renderBlocks(column.blocks, slideId, counters));
  }

  if (Array.isArray(column.bullets) && column.bullets.length) {
    columnEl.appendChild(renderBulletList(column.bullets, slideId, counters));
  }

  if (column.media) {
    const media = renderMedia(column.media, {
      slideId,
      parentElementId: "",
    }, counters);
    if (media) columnEl.appendChild(media);
  }

  if (column.html) {
    columnEl.appendChild(
      renderLegacyHtml(
        column.html,
        {
          slideId,
          elementId: column.htmlId,
          elementType: "legacy_html",
          label: column.htmlId,
        },
        counters,
      ),
    );
  }

  return columnEl;
}

function renderTextSlide(slide, slideEl, counters) {
  if (slide.title) {
    slideEl.appendChild(
      createRichTextElement(
        "h2",
        slide.title,
        {
          slideId: slide.slideId,
          elementId: slide.titleId,
          elementType: "title",
          label: plainTextForSay(slide.title),
        },
        counters,
        {
          sayText: slide.titleSay || slide.title,
        },
      ),
    );
  }

  renderSlideQuestion(slide, slideEl, counters);

  if (slide.lead) {
    slideEl.appendChild(
      createRichTextElement(
        "p",
        slide.lead,
        {
          slideId: slide.slideId,
          elementId: slide.leadId,
          elementType: "lead",
          label: plainTextForSay(slide.lead),
        },
        counters,
        {
          className: "muted",
          style: "margin-bottom:14px;",
          sayText: slide.lead,
        },
      ),
    );
  }

  if (Array.isArray(slide.paragraphs) && slide.paragraphs.length) {
    slideEl.appendChild(renderParagraphList(slide.paragraphs, slide.slideId, counters));
  }

  if (Array.isArray(slide.blocks) && slide.blocks.length) {
    slideEl.appendChild(renderBlocks(slide.blocks, slide.slideId, counters));
  }

  if (slide.media) {
    const media = renderMedia(slide.media, {
      slideId: slide.slideId,
      parentElementId: "",
    }, counters);
    if (media) slideEl.appendChild(media);
  }
}

export function renderSlide(slideData, idx) {
  const slide = document.createElement("div");
  const slideId = slideData.slideId || slideData.id || `slide_${idx + 1}`;
  const counters = { code: 1, math: 1 };

  slide.className = "slide";
  if (idx === 0) slide.classList.add("active");
  slide.dataset.hud = slideData.hud || "";
  slide.dataset.notes = (slideData.notes || "").trim();
  slide.dataset.slideId = slideId;
  slide.dataset.slideType = slideData.slideType || slideData.type || "unknown";
  slide.id = `slide__${slideId}`;

  if (slideData.type === "title") {
    const wrap = document.createElement("div");
    wrap.style.display = "flex";
    wrap.style.flexDirection = "column";
    wrap.style.justifyContent = "center";
    wrap.style.height = "100%";
    wrap.style.paddingTop = "30px";

    if (slideData.title) {
      wrap.appendChild(
        createRichTextElement(
          "h1",
          slideData.title,
          {
            slideId,
            elementId: slideData.titleId,
            elementType: "title",
            label: plainTextForSay(slideData.title),
          },
          counters,
          {
            sayText: slideData.titleSay || slideData.title,
          },
        ),
      );
    }

    if (slideData.subtitle) {
      wrap.appendChild(
        createRichTextElement(
          "p",
          slideData.subtitle,
          {
            slideId,
            elementId: slideData.subtitleId,
            elementType: "subtitle",
            label: plainTextForSay(slideData.subtitle),
          },
          counters,
          {
            style: "font-size:28px; color:#64748b; font-weight:500;",
            sayText: slideData.subtitle,
          },
        ),
      );
    }

    if (slideData.meta) {
      wrap.appendChild(
        createRichTextElement(
          "p",
          slideData.meta,
          {
            slideId,
            elementId: slideData.metaId,
            elementType: "meta",
            label: plainTextForSay(slideData.meta),
          },
          counters,
          {
            className: "muted",
            style: "margin-top:10px;",
            sayText: slideData.meta,
          },
        ),
      );
    }

    slide.appendChild(wrap);
    return finalizeSlide(slide, slideData);
  }

  if (slideData.type === "bullets") {
    if (slideData.title) {
      slide.appendChild(
        createRichTextElement(
          "h2",
          slideData.title,
          {
            slideId,
            elementId: slideData.titleId,
            elementType: "title",
            label: plainTextForSay(slideData.title),
          },
          counters,
          {
            sayText: slideData.titleSay || slideData.title,
          },
        ),
      );
    }

    renderSlideQuestion(slideData, slide, counters);

    const hasBlocks = Array.isArray(slideData.blocks) && slideData.blocks.length;
    const body = hasBlocks ? document.createElement("div") : slide;
    if (hasBlocks) {
      body.className = "bullets-with-blocks";
    }

    const main = hasBlocks ? document.createElement("div") : body;
    if (hasBlocks) {
      main.className = "bullets-main";
      body.appendChild(main);
    }

    if (slideData.lead) {
      main.appendChild(
        createRichTextElement(
          "p",
          slideData.lead,
          {
            slideId,
            elementId: slideData.leadId,
            elementType: "lead",
            label: plainTextForSay(slideData.lead),
          },
          counters,
          {
            className: "muted",
            style: "margin-bottom:14px;",
            sayText: slideData.lead,
          },
        ),
      );
    }

    main.appendChild(renderBulletList(slideData.bullets || [], slideId, counters));

    if (hasBlocks) {
      const side = document.createElement("div");
      side.className = "bullets-side";
      side.appendChild(renderBlocks(slideData.blocks, slideId, counters));
      body.appendChild(side);
      slide.appendChild(body);
    }

    return finalizeSlide(slide, slideData);
  }

  if (slideData.type === "text") {
    renderTextSlide(slideData, slide, counters);
    return finalizeSlide(slide, slideData);
  }

  if (slideData.type === "visual_lab") {
    slide.classList.add("visual-lab-slide");
    if (slideData.title) {
      slide.appendChild(
        createRichTextElement(
          "h2",
          slideData.title,
          {
            slideId,
            elementId: slideData.titleId,
            elementType: "title",
            label: plainTextForSay(slideData.title),
          },
          counters,
          {
            sayText: slideData.titleSay || slideData.title,
          },
        ),
      );
    }

    renderSlideQuestion(slideData, slide, counters);

    const layout = document.createElement("div");
    layout.className = "visual-lab-layout";

    const side = document.createElement("div");
    side.className = "visual-lab-side col";

    const leftSource = slideData.left && typeof slideData.left === "object"
      ? slideData.left
      : {
        lead: slideData.lead,
        blocks: slideData.blocks,
      };

    if (leftSource.lead) {
      side.appendChild(
        createRichTextElement(
          "p",
          leftSource.lead,
          {
            slideId,
            elementId: slideData.leadId || "visual_lab_lead",
            elementType: "lead",
            label: plainTextForSay(leftSource.lead),
          },
          counters,
          {
            className: "muted visual-lab-lead",
            sayText: leftSource.lead,
          },
        ),
      );
    }

    const labExamples = Array.isArray(slideData.labExamples) ? slideData.labExamples : [];
    if (labExamples.length) {
      const tabs = renderVisualLabExampleTabs(labExamples, {
        showGenerate: Boolean(slideData.labGeneratePresets?.length),
      });
      side.appendChild(tabs);

      const activeLabel = document.createElement("div");
      activeLabel.className = "visual-lab-active-label";
      activeLabel.dataset.visualLabActiveLabel = "true";
      side.appendChild(activeLabel);

      const formula = document.createElement("div");
      formula.className = "visual-lab-formula";
      formula.dataset.visualLabFormula = "true";
      formula.hidden = true;
      side.appendChild(formula);

      const stepsHost = document.createElement("div");
      stepsHost.className = "visual-lab-steps";
      stepsHost.dataset.visualLabSteps = "true";
      side.appendChild(stepsHost);
    }

    if (Array.isArray(leftSource.blocks) && leftSource.blocks.length) {
      side.appendChild(renderBlocks(leftSource.blocks, slideId, counters));
    }

    if (slideData.labSiteNote) {
      side.appendChild(
        createRichTextElement(
          "p",
          slideData.labSiteNote,
          {
            slideId,
            elementId: "visual_lab_site_note",
            elementType: "lab_note",
            label: plainTextForSay(slideData.labSiteNote),
          },
          counters,
          {
            className: "visual-lab-site-note",
            sayText: slideData.labSiteNote,
          },
        ),
      );
    }

    const plotPane = document.createElement("div");
    plotPane.className = "visual-lab-plot-pane col";

    const mediaSpec = slideData.media
      || (slideData.right && slideData.right.media)
      || null;

    if (mediaSpec) {
      const media = renderMedia(mediaSpec, {
        slideId,
        parentElementId: "",
      }, counters);
      if (media) plotPane.appendChild(media);
    }

    layout.appendChild(side);
    layout.appendChild(plotPane);
    slide.appendChild(layout);

    return finalizeSlide(slide, slideData);
  }

  if (slideData.type === "two-col") {
    if (slideData.title) {
      slide.appendChild(
        createRichTextElement(
          "h2",
          slideData.title,
          {
            slideId,
            elementId: slideData.titleId,
            elementType: "title",
            label: plainTextForSay(slideData.title),
          },
          counters,
          {
            sayText: slideData.titleSay || slideData.title,
          },
        ),
      );
    }

    renderSlideQuestion(slideData, slide, counters);

    const grid = document.createElement("div");
    grid.className = "two-col";

    const leftWrap = document.createElement("div");
    const rightWrap = document.createElement("div");

    leftWrap.appendChild(renderColumn(slideData.left, slideId, counters));
    rightWrap.appendChild(renderColumn(slideData.right, slideId, counters));

    grid.appendChild(leftWrap);
    grid.appendChild(rightWrap);
    slide.appendChild(grid);

    return finalizeSlide(slide, slideData);
  }

  if (slideData.type === "mcq") {
    if (slideData.title) {
      slide.appendChild(
        createRichTextElement(
          "h2",
          slideData.title,
          {
            slideId,
            elementId: slideData.titleId,
            elementType: "title",
            label: plainTextForSay(slideData.title),
          },
          counters,
          {
            sayText: slideData.titleSay || slideData.title,
          },
        ),
      );
    }

    const quiz = document.createElement("div");
    quiz.className = "quiz-container mcq";
    quiz.dataset.correct = slideData.correct || "";
    quiz.dataset.explain = slideData.explain || "";

    if (slideData.question) {
      quiz.appendChild(
        createRichTextElement(
          "p",
          slideData.question,
          {
            slideId,
            elementId: slideData.questionId,
            elementType: "question",
            label: plainTextForSay(slideData.question),
          },
          counters,
          {
            className: "quiz-question",
            sayText: slideData.questionSay || slideData.question,
          },
        ),
      );
    }

    const options = document.createElement("div");
    options.className = "options";

    (slideData.options || []).forEach((option) => {
      const button = document.createElement("button");
      button.className = "option-btn";
      button.type = "button";
      button.dataset.choice = option.choice || "";
      button.setAttribute("data-say", plainTextForSay(option.say || `${option.choice}. ${option.label}`));

      applyElementMetadata(button, {
        slideId,
        elementId: option.id,
        elementType: "option",
        label: plainTextForSay(option.label || option.choice || option.id),
      });

      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = option.choice || "";
      button.appendChild(badge);

      const body = document.createElement("span");
      body.innerHTML = richTextToHtml(option.label || "");
      annotateRichArtifacts(body, slideId, option.id, counters);
      button.appendChild(body);

      options.appendChild(button);
    });

    quiz.appendChild(options);

    const feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.setAttribute("aria-live", "polite");
    applyElementMetadata(feedback, {
      slideId,
      elementId: slideData.feedbackId,
      elementType: "feedback",
      label: "Quiz feedback",
    });
    quiz.appendChild(feedback);

    slide.appendChild(quiz);
    return finalizeSlide(slide, slideData);
  }

  if (slideData.html) {
    slide.appendChild(
      renderLegacyHtml(
        slideData.html,
        {
          slideId,
          elementId: slideData.htmlId || "legacy_html",
          elementType: "legacy_html",
          label: slideData.htmlId || "legacy_html",
        },
        counters,
      ),
    );
    return finalizeSlide(slide, slideData);
  }

  slide.innerHTML = `<h2>Empty slide</h2>`;
  return finalizeSlide(slide, slideData);
}

// --- Rich text helpers (SAFE) ---
function richTextToHtml(text, opts = {}) {
  const allowBlocks = opts.allowBlocks !== false;
  const linkify = opts.linkify !== false;

  let raw = String(text ?? "");

  const codeBlocks = [];
  if (allowBlocks) {
    raw = raw.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, _lang, code) => {
      const index = codeBlocks.length;
      const token = `@@CB${index}@@`;
      const body = escapeHtml(code).replace(/\n$/, "");
      codeBlocks.push(
        `<pre class="code-block" style="margin:10px 0; padding:12px 14px; border-radius:12px; background:rgba(2,6,23,.06); overflow:auto;"><code style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size:0.95em; line-height:1.35;">${body}</code></pre>`,
      );
      return token;
    });
  }

  const mathBlocks = [];

  raw = raw.replace(/\$\$([\s\S]+?)\$\$/g, (_match, tex) => {
    const index = mathBlocks.length;
    const token = `@@MB${index}@@`;
    mathBlocks.push({ tex: String(tex).trim(), display: true });
    return token;
  });

  raw = raw.replace(/\\\[([\s\S]+?)\\\]/g, (_match, tex) => {
    const index = mathBlocks.length;
    const token = `@@MB${index}@@`;
    mathBlocks.push({ tex: String(tex).trim(), display: true });
    return token;
  });

  raw = raw.replace(/\\\(([\s\S]+?)\\\)/g, (_match, tex) => {
    const index = mathBlocks.length;
    const token = `@@MB${index}@@`;
    mathBlocks.push({ tex: String(tex).trim(), display: false });
    return token;
  });

  const markdownLinks = [];
  raw = raw.replace(
    /\[([^\]]+?)\]\((https?:\/\/[^\s)]+)\)/g,
    (_match, label, url) => {
      const index = markdownLinks.length;
      const token = `@@LK${index}@@`;
      markdownLinks.push({ label: String(label ?? ""), url: String(url ?? "") });
      return token;
    },
  );

  const inlineCodes = [];
  raw = raw.replace(/`([^`]+?)`/g, (_match, code) => {
    const index = inlineCodes.length;
    const token = `@@IC${index}@@`;
    const body = escapeHtml(code);
    inlineCodes.push(
      `<code class="code-inline" style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size:0.95em; padding:2px 7px; border-radius:8px; background:rgba(2,6,23,.08);">${body}</code>`,
    );
    return token;
  });

  let html = escapeHtml(raw);

  if (linkify) {
    const urlRe = /\bhttps?:\/\/[^\s<>()]+[^\s<>().,;:"')\]]/g;
    html = html.replace(urlRe, (url) => {
      const href = escapeAttr(url);
      return `<a class="auto-link" href="${href}" target="_blank" rel="noreferrer" style="color:#2563eb; text-decoration:underline;">${url}</a>`;
    });
  }

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  html = html.replace(/@@IC(\d+)@@/g, (_match, index) => inlineCodes[Number(index)] ?? "");

  html = html.replace(/@@LK(\d+)@@/g, (_match, index) => {
    const item = markdownLinks[Number(index)];
    if (!item) return "";
    const href = escapeAttr(item.url);
    const label = formatInline(item.label);
    return `<a class="auto-link" href="${href}" target="_blank" rel="noreferrer" style="color:#2563eb; text-decoration:underline;">${label}</a>`;
  });

  html = html.replace(/@@CB(\d+)@@/g, (_match, index) => codeBlocks[Number(index)] ?? "");

  html = html.replace(/@@MB(\d+)@@/g, (_match, index) => {
    const item = mathBlocks[Number(index)];
    if (!item) return "";
    const texAttr = escapeAttr(item.tex);
    return item.display
      ? `<div class="math-block" data-tex="${texAttr}" data-display="true"></div>`
      : `<span class="math-inline" data-tex="${texAttr}" data-display="false"></span>`;
  });

  return html;
}

function formatInline(text) {
  let raw = String(text ?? "");

  const inlineCodes = [];
  raw = raw.replace(/`([^`]+?)`/g, (_match, code) => {
    const index = inlineCodes.length;
    const token = `@@IC${index}@@`;
    const body = escapeHtml(code);
    inlineCodes.push(
      `<code class="code-inline" style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size:0.95em; padding:2px 7px; border-radius:8px; background:rgba(2,6,23,.08);">${body}</code>`,
    );
    return token;
  });

  let html = escapeHtml(raw);
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/@@IC(\d+)@@/g, (_match, index) => inlineCodes[Number(index)] ?? "");
  return html;
}

function plainTextForSay(text) {
  return String(text ?? "")
    .replace(/\[([^\]]+?)\]\((https?:\/\/[^\s)]+)\)/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$\$[\s\S]*?\$\$/g, "")
    .replace(/`([^`]+?)`/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\bhttps?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(text) {
  return String(text).replace(
    /[&<>"']/g,
    (match) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[match],
  );
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/`/g, "&#096;");
}
