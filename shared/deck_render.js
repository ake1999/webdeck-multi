// shared/deck_render.js
// Rendering helpers:
// - Stable slide/element metadata in the DOM
// - Rich text support (safe): **bold**, `inline code`, ```code blocks```,
//   auto-linkify URLs, [label](url) links
// - Math support (KaTeX): $$...$$ or \[...\] for display, \( ... \) for inline

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

    list.appendChild(li);
  });

  return list;
}

function renderLegacyHtml(html, meta, counters) {
  const wrapper = document.createElement("div");
  wrapper.className = "legacy-html";
  wrapper.innerHTML = html || "";
  applyElementMetadata(wrapper, meta);
  annotateRichArtifacts(wrapper, meta.slideId, meta.elementId, counters);
  return wrapper;
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
      img.src = item.src;
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

  if (!media.src) return null;

  const wrap = document.createElement("div");
  wrap.className = "media-fill";

  const stage = document.createElement("div");
  stage.className = "media-stage";

  const kind = (media.kind || "image").toLowerCase();
  const fit = (media.fit || "contain").toLowerCase();

  let element;

  if (kind === "video") {
    element = document.createElement("video");
    element.src = media.src;
    element.controls = media.controls ?? true;
    element.autoplay = media.autoplay ?? false;
    element.loop = media.loop ?? false;
    element.muted = media.muted ?? false;
    element.playsInline = true;
    if (media.poster) element.poster = media.poster;
  } else if (kind === "iframe" || kind === "widget") {
    element = document.createElement("iframe");
    element.src = media.src;
    element.allow = media.allow || "fullscreen";
    element.title = media.title || media.caption || media.source || media.id;
    element.loading = media.loading || "eager";
    if (media.allowFullscreen !== false) {
      element.setAttribute("allowfullscreen", "");
    }
  } else {
    element = document.createElement("img");
    element.src = media.src;
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
    elementType: kind === "widget" ? "widget" : kind,
    label: media.title || media.caption || media.source || media.alt || media.id,
  });

  stage.appendChild(element);
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
    typesetMath(slide);
    return slide;
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

    if (slideData.lead) {
      slide.appendChild(
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

    slide.appendChild(renderBulletList(slideData.bullets || [], slideId, counters));
    typesetMath(slide);
    return slide;
  }

  if (slideData.type === "text") {
    renderTextSlide(slideData, slide, counters);
    typesetMath(slide);
    return slide;
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

    const grid = document.createElement("div");
    grid.className = "two-col";

    const leftWrap = document.createElement("div");
    const rightWrap = document.createElement("div");

    leftWrap.appendChild(renderColumn(slideData.left, slideId, counters));
    rightWrap.appendChild(renderColumn(slideData.right, slideId, counters));

    grid.appendChild(leftWrap);
    grid.appendChild(rightWrap);
    slide.appendChild(grid);

    typesetMath(slide);
    return slide;
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
    typesetMath(slide);
    return slide;
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
    typesetMath(slide);
    return slide;
  }

  slide.innerHTML = `<h2>Empty slide</h2>`;
  typesetMath(slide);
  return slide;
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
