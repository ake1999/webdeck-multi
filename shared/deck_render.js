// shared/deck_render.js
// Rendering helpers:
// - Title say support: titleSay -> puts data-say on h1/h2
// - Media source support: media.source + optional media.sourceHref shown under media
// - Quiz say support: questionSay + option say
// - ✅ Rich text support (safe): **bold**, `inline code`, ```code blocks```, auto-linkify URLs, [label](url) links
// - ✅ Math support (KaTeX): $$...$$ or \[...\] for display, \( ... \) for inline
//
// NOTE: KaTeX must be loaded in session.html:
//   <link rel="stylesheet" href="./shared/vendor/katex/katex.min.css" />
//   <script src="./shared/vendor/katex/katex.min.js"></script>

function typesetMath(root) {
  // KaTeX is loaded via <script ...katex.min.js> and attaches to window.katex
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
      el.textContent = tex; // fallback
    }
  });
}

export function renderSlide(s, idx) {
  const slide = document.createElement("div");
  slide.className = "slide";
  if (idx === 0) slide.classList.add("active");
  slide.dataset.hud = s.hud || "";
  slide.dataset.notes = (s.notes || "").trim();

  if (s.type === "title") {
    const title = s.title || "";
    const titleSay = s.titleSay || title || "";

    slide.innerHTML = `
      <div style="display:flex; flex-direction:column; justify-content:center; height:100%; padding-top:30px;">
        <h1 data-say="${escapeAttr(plainTextForSay(titleSay))}">${richTextToHtml(title)}</h1>
        ${
          s.subtitle
            ? `<p style="font-size:28px; color:#64748b; font-weight:500;">${richTextToHtml(
                s.subtitle,
              )}</p>`
            : ""
        }
        ${
          s.meta
            ? `<p class="muted" style="margin-top:10px;">${richTextToHtml(s.meta)}</p>`
            : ""
        }
      </div>
    `;
    typesetMath(slide);
    return slide;
  }

  if (s.type === "bullets") {
    const title = s.title || "";
    const titleSay = s.titleSay || title || "";

    const bullets = (s.bullets || [])
      .map((b) => {
        if (typeof b === "string") {
          return `<li data-say="${escapeAttr(
            plainTextForSay(b),
          )}">${richTextToHtml(b)}</li>`;
        }
        const text = b.text || "";
        const say = b.say || b.text || "";
        return `<li data-say="${escapeAttr(
          plainTextForSay(say),
        )}">${richTextToHtml(text)}</li>`;
      })
      .join("");

    slide.innerHTML = `
      <h2 data-say="${escapeAttr(plainTextForSay(titleSay))}">${richTextToHtml(title)}</h2>
      ${
        s.lead
          ? `<p class="muted" style="margin-bottom:14px;" data-say="${escapeAttr(
              plainTextForSay(s.lead),
            )}">${richTextToHtml(s.lead)}</p>`
          : ""
      }
      <ul>${bullets}</ul>
    `;
    typesetMath(slide);
    return slide;
  }

  if (s.type === "two-col") {
    const title = s.title || "";
    const titleSay = s.titleSay || title || "";

    const h2 = document.createElement("h2");
    h2.innerHTML = richTextToHtml(title);
    h2.setAttribute("data-say", plainTextForSay(titleSay || title));
    slide.appendChild(h2);

    const grid = document.createElement("div");
    grid.className = "two-col";

    const leftWrap = document.createElement("div");
    const rightWrap = document.createElement("div");

    leftWrap.appendChild(renderColumn(s.left));
    rightWrap.appendChild(renderColumn(s.right));

    grid.appendChild(leftWrap);
    grid.appendChild(rightWrap);

    slide.appendChild(grid);
    typesetMath(slide);
    return slide;
  }

  if (s.type === "mcq") {
    const title = s.title || "Quick Quiz";
    const titleSay = s.titleSay || title || "Quick Quiz";

    const question = s.question || "";
    const questionSay = s.questionSay || question || "";

    const opts = (s.options || [])
      .map((o) => {
        const label = o.label || "";
        const choice = o.choice || "";
        const say = o.say || `${choice}. ${label}`; // helpful default (plain)
        return `<button class="option-btn" type="button"
                  data-choice="${escapeAttr(choice)}"
                  data-say="${escapeAttr(plainTextForSay(say))}">
                  <span class="badge">${escapeHtml(choice)}</span> ${richTextToHtml(label)}
                </button>`;
      })
      .join("");

    slide.innerHTML = `
      <h2 data-say="${escapeAttr(plainTextForSay(titleSay))}">${richTextToHtml(title)}</h2>
      <div class="quiz-container mcq"
           data-correct="${escapeAttr(s.correct || "")}"
           data-explain="${escapeAttr(s.explain || "")}">
        <p class="quiz-question" data-say="${escapeAttr(plainTextForSay(questionSay))}">
          ${richTextToHtml(question)}
        </p>
        <div class="options">${opts}</div>
        <div class="feedback" aria-live="polite"></div>
      </div>
    `;
    typesetMath(slide);
    return slide;
  }

  // fallback raw html
  slide.innerHTML = s.html || `<h2>Empty slide</h2>`;
  typesetMath(slide);
  return slide;
}

function renderColumn(col) {
  const colEl = document.createElement("div");
  colEl.className = "col";

  if (!col) return colEl;

  if (col.lead) {
    const lead = document.createElement("div");
    lead.className = "lead";
    lead.innerHTML = richTextToHtml(col.lead);
    colEl.appendChild(lead);
  }

  if (Array.isArray(col.bullets) && col.bullets.length) {
    const ul = document.createElement("ul");
    ul.className = "bullets";

    col.bullets.forEach((b) => {
      const li = document.createElement("li");

      if (typeof b === "string") {
        li.innerHTML = richTextToHtml(b);
        li.setAttribute("data-say", plainTextForSay(b));
      } else {
        const text = b.text || "";
        const say = b.say || b.text || "";
        li.innerHTML = richTextToHtml(text);
        li.setAttribute("data-say", plainTextForSay(say));
      }

      ul.appendChild(li);
    });

    colEl.appendChild(ul);
  }

  // ✅ auto media
  if (col.media) {
    const m = renderMedia(col.media);
    if (m) colEl.appendChild(m);
  }

  // (optional) keep html support too
  if (col.html) {
    const box = document.createElement("div");
    box.innerHTML = col.html;
    colEl.appendChild(box);
  }

  return colEl;
}

function renderMedia(media) {
  if (!media) return null;

  // --- Gallery support ---
  if ((media.kind || "").toLowerCase() === "gallery") {
    const items = Array.isArray(media.items) ? media.items : [];
    if (!items.length) return null;

    const wrap = document.createElement("div");
    wrap.className = "media-fill";

    const stage = document.createElement("div");
    stage.className = "media-stage gallery-stack";

    const fitDefault = (media.fit || "contain").toLowerCase();

    items.forEach((it) => {
      if (!it || !it.src) return;

      const img = document.createElement("img");
      img.src = it.src;
      img.alt = it.alt || "";

      const fit = ((it.fit || fitDefault) + "").toLowerCase();
      img.className = fit === "cover" ? "fit-cover" : "fit-contain";
      img.classList.add("stacked-media");

      stage.appendChild(img);
    });

    wrap.appendChild(stage);

    // Caption/Source (same as single)
    const srcText = media.source || media.caption;
    const srcHref = media.sourceHref || media.href;

    if (srcText) {
      const cap = document.createElement("div");
      cap.className = "media-caption";
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

  // --- existing single-media support (image/video/iframe) ---
  if (!media.src) return null;

  const wrap = document.createElement("div");
  wrap.className = "media-fill";

  const stage = document.createElement("div");
  stage.className = "media-stage";

  const kind = (media.kind || "image").toLowerCase();
  const fit = (media.fit || "contain").toLowerCase(); // contain | cover

  let el;

  if (kind === "video") {
    el = document.createElement("video");
    el.src = media.src;
    el.controls = media.controls ?? true;
    el.autoplay = media.autoplay ?? false;
    el.loop = media.loop ?? false;
    el.muted = media.muted ?? false;
    el.playsInline = true;
  } else if (kind === "iframe" || kind === "widget") {
    el = document.createElement("iframe");
    el.src = media.src;
    el.allow = media.allow || "fullscreen";
  } else {
    el = document.createElement("img");
    el.src = media.src;
    el.alt = media.alt || "";
  }

  if (el.tagName === "IMG" || el.tagName === "VIDEO") {
    if (fit === "cover") el.classList.add("fit-cover");
    else el.classList.add("fit-contain");
  }

  stage.appendChild(el);
  wrap.appendChild(stage);

  const srcText = media.source || media.caption;
  const srcHref = media.sourceHref || media.href;

  if (srcText) {
    const cap = document.createElement("div");
    cap.className = "media-caption";
    if (srcHref) {
      const a = document.createElement("a");
      a.href = srcHref;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.textContent = srcText;
      cap.appendChild(document.createTextNode("Source: "));
      cap.appendChild(a);
    } else {
      // If source text itself contains a URL, make it clickable automatically
      cap.innerHTML = richTextToHtml(`Source: ${srcText}`);
    }
    wrap.appendChild(cap);
  }

  return wrap;
}

// --- Rich text helpers (SAFE) ---
// Supports:
// - **bold**
// - `inline code`  -> small boxed commands
// - ```code blocks``` -> boxed multi-line blocks
// - [label](https://url) and bare https://url auto-linkify
// - ✅ KaTeX math placeholders: $$...$$ or \[...\] (display), \( ... \) (inline)
function richTextToHtml(text, opts = {}) {
  const allowBlocks = opts.allowBlocks !== false;
  const linkify = opts.linkify !== false;

  let raw = String(text ?? "");

  // 1) Extract fenced code blocks first (protect from linkify/bold parsing)
  const codeBlocks = [];
  if (allowBlocks) {
    raw = raw.replace(/```(\w+)?\n([\s\S]*?)```/g, (_m, _lang, code) => {
      const i = codeBlocks.length;
      const token = `@@CB${i}@@`;
      const body = escapeHtml(code).replace(/\n$/, "");
      codeBlocks.push(
        `<pre class="code-block" style="margin:10px 0; padding:12px 14px; border-radius:12px; background:rgba(2,6,23,.06); overflow:auto;"><code style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size:0.95em; line-height:1.35;">${body}</code></pre>`,
      );
      return token;
    });
  }

  // 1.5) Extract TeX math (safe delimiters)
  // Display: $$...$$ or \[...\]
  // Inline:  \( ... \)
  const mathBlocks = [];

  raw = raw.replace(/\$\$([\s\S]+?)\$\$/g, (_m, tex) => {
    const i = mathBlocks.length;
    const token = `@@MB${i}@@`;
    mathBlocks.push({ tex: String(tex).trim(), display: true });
    return token;
  });

  raw = raw.replace(/\\\[([\s\S]+?)\\\]/g, (_m, tex) => {
    const i = mathBlocks.length;
    const token = `@@MB${i}@@`;
    mathBlocks.push({ tex: String(tex).trim(), display: true });
    return token;
  });

  raw = raw.replace(/\\\(([\s\S]+?)\\\)/g, (_m, tex) => {
    const i = mathBlocks.length;
    const token = `@@MB${i}@@`;
    mathBlocks.push({ tex: String(tex).trim(), display: false });
    return token;
  });

  // 2) Extract markdown links [label](url)
  const mdLinks = [];
  raw = raw.replace(
    /\[([^\]]+?)\]\((https?:\/\/[^\s)]+)\)/g,
    (_m, label, url) => {
      const i = mdLinks.length;
      const token = `@@LK${i}@@`;
      mdLinks.push({ label: String(label ?? ""), url: String(url ?? "") });
      return token;
    },
  );

  // 3) Extract inline code `...`
  const inlineCodes = [];
  raw = raw.replace(/`([^`]+?)`/g, (_m, code) => {
    const i = inlineCodes.length;
    const token = `@@IC${i}@@`;
    const body = escapeHtml(code);
    inlineCodes.push(
      `<code class="code-inline" style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size:0.95em; padding:2px 7px; border-radius:8px; background:rgba(2,6,23,.08);">${body}</code>`,
    );
    return token;
  });

  // 4) Escape the remaining text
  let s = escapeHtml(raw);

  // 5) Auto-linkify bare URLs (only if enabled)
  if (linkify) {
    const urlRe = /\bhttps?:\/\/[^\s<>()]+[^\s<>().,;:"')\]]/g;
    s = s.replace(urlRe, (url) => {
      const href = escapeAttr(url);
      return `<a class="auto-link" href="${href}" target="_blank" rel="noreferrer" style="color:#2563eb; text-decoration:underline;">${url}</a>`;
    });
  }

  // 6) Bold **...**
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // 7) Restore inline codes
  s = s.replace(/@@IC(\d+)@@/g, (_m, n) => inlineCodes[Number(n)] ?? "");

  // 8) Restore markdown links
  s = s.replace(/@@LK(\d+)@@/g, (_m, n) => {
    const item = mdLinks[Number(n)];
    if (!item) return "";
    const href = escapeAttr(item.url);
    const labelHtml = formatInline(item.label);
    return `<a class="auto-link" href="${href}" target="_blank" rel="noreferrer" style="color:#2563eb; text-decoration:underline;">${labelHtml}</a>`;
  });

  // 9) Restore code blocks
  s = s.replace(/@@CB(\d+)@@/g, (_m, n) => codeBlocks[Number(n)] ?? "");

  // 9.5) Restore math placeholders (KaTeX typesets later in typesetMath)
  s = s.replace(/@@MB(\d+)@@/g, (_m, n) => {
    const it = mathBlocks[Number(n)];
    if (!it) return "";
    const texAttr = escapeAttr(it.tex);
    return it.display
      ? `<div class="math-block" data-tex="${texAttr}" data-display="true"></div>`
      : `<span class="math-inline" data-tex="${texAttr}" data-display="false"></span>`;
  });

  return s;
}

// Inline formatter for link labels etc. (safe): **bold** + `inline code` only (no linkify, no blocks)
function formatInline(text) {
  let raw = String(text ?? "");

  const inlineCodes = [];
  raw = raw.replace(/`([^`]+?)`/g, (_m, code) => {
    const i = inlineCodes.length;
    const token = `@@IC${i}@@`;
    const body = escapeHtml(code);
    inlineCodes.push(
      `<code class="code-inline" style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size:0.95em; padding:2px 7px; border-radius:8px; background:rgba(2,6,23,.08);">${body}</code>`,
    );
    return token;
  });

  let s = escapeHtml(raw);
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/@@IC(\d+)@@/g, (_m, n) => inlineCodes[Number(n)] ?? "");
  return s;
}

// Used for data-say so TTS doesn't speak formatting markers / URLs or TeX.
function plainTextForSay(text) {
  return String(text ?? "")
    .replace(/\[([^\]]+?)\]\((https?:\/\/[^\s)]+)\)/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$\$[\s\S]*?\$\$/g, "") // strip TeX
    .replace(/`([^`]+?)`/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\bhttps?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// --- Escaping helpers ---
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[m],
  );
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/`/g, "&#096;");
}
