// shared/deck_render.js
// Rendering helpers:
// - Title say support: titleSay -> puts data-say on h1/h2
// - Media source support: media.source + optional media.sourceHref shown under media
// - Quiz say support: questionSay + option say

export function renderSlide(s, idx){
  const slide = document.createElement("div");
  slide.className = "slide";
  if (idx === 0) slide.classList.add("active");
  slide.dataset.hud = s.hud || "";
  slide.dataset.notes = (s.notes || "").trim();

  if (s.type === "title"){
    const title = s.title || "";
    const titleSay = s.titleSay || title || "";
    slide.innerHTML = `
      <div style="display:flex; flex-direction:column; justify-content:center; height:100%; padding-top:30px;">
        <h1 data-say="${escapeAttr(titleSay)}">${escapeHtml(title)}</h1>
        ${s.subtitle ? `<p style="font-size:28px; color:#64748b; font-weight:500;">${escapeHtml(s.subtitle)}</p>` : ""}
        ${s.meta ? `<p class="muted" style="margin-top:10px;">${escapeHtml(s.meta)}</p>` : ""}
      </div>
    `;
    return slide;
  }

  if (s.type === "bullets"){
    const title = s.title || "";
    const titleSay = s.titleSay || title || "";

    const bullets = (s.bullets || []).map(b => {
      if (typeof b === "string"){
        return `<li data-say="${escapeAttr(b)}">${escapeHtml(b)}</li>`;
      }
      const text = b.text || "";
      const say  = b.say  || b.text || "";
      return `<li data-say="${escapeAttr(say)}">${escapeHtml(text)}</li>`;
    }).join("");

    slide.innerHTML = `
      <h2 data-say="${escapeAttr(titleSay)}">${escapeHtml(title)}</h2>
      ${s.lead ? `<p class="muted" style="margin-bottom:14px;">${escapeHtml(s.lead)}</p>` : ""}
      <ul>${bullets}</ul>
    `;
    return slide;
  }

  if (s.type === "two-col"){
    const title = s.title || "";
    const titleSay = s.titleSay || title || "";

    const h2 = document.createElement("h2");
    h2.textContent = title;
    h2.setAttribute("data-say", titleSay || title);
    slide.appendChild(h2);

    const grid = document.createElement("div");
    grid.className = "two-col";

    const leftWrap = document.createElement("div");
    const rightWrap = document.createElement("div");

    // renderColumn already returns a DIV (DOM element) -> append it
    leftWrap.appendChild(renderColumn(s.left));
    rightWrap.appendChild(renderColumn(s.right));

    grid.appendChild(leftWrap);
    grid.appendChild(rightWrap);

    slide.appendChild(grid);
    return slide;
  }

  if (s.type === "mcq"){
    const title = s.title || "Quick Quiz";
    const titleSay = s.titleSay || title || "Quick Quiz";

    const question = s.question || "";
    const questionSay = s.questionSay || question || "";

    const opts = (s.options || []).map(o => {
      const label = o.label || "";
      const choice = o.choice || "";
      const say = o.say || `${choice}. ${label}`; // helpful default
      return `<button class="option-btn" type="button" data-choice="${escapeAttr(choice)}" data-say="${escapeAttr(say)}">
                <span class="badge">${escapeHtml(choice)}</span> ${escapeHtml(label)}
              </button>`;
    }).join("");

    slide.innerHTML = `
      <h2 data-say="${escapeAttr(titleSay)}">${escapeHtml(title)}</h2>
      <div class="quiz-container mcq"
           data-correct="${escapeAttr(s.correct || "")}"
           data-explain="${escapeAttr(s.explain || "")}">
        <p class="quiz-question" data-say="${escapeAttr(questionSay)}">
          ${escapeHtml(question)}
        </p>
        <div class="options">${opts}</div>
        <div class="feedback" aria-live="polite"></div>
      </div>
    `;
    return slide;
  }

  // fallback raw html
  slide.innerHTML = s.html || `<h2>Empty slide</h2>`;
  return slide;
}

function renderColumn(col){
  const colEl = document.createElement("div");
  colEl.className = "col";

  if (!col) return colEl;

  if (col.lead){
    const lead = document.createElement("div");
    lead.className = "lead";
    lead.textContent = col.lead;
    colEl.appendChild(lead);
  }

  if (Array.isArray(col.bullets) && col.bullets.length){
    const ul = document.createElement("ul");
    ul.className = "bullets";
    col.bullets.forEach(t=>{
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
    colEl.appendChild(ul);
  }

  // ✅ NEW: auto media
  if (col.media){
    const m = renderMedia(col.media);
    if (m) colEl.appendChild(m);
  }

  // (optional) keep your html support too
  if (col.html){
    const box = document.createElement("div");
    box.innerHTML = col.html;
    colEl.appendChild(box);
  }

  return colEl;
}

function renderMedia(media){
  if (!media || !media.src) return null;

  const wrap = document.createElement("div");
  wrap.className = "media-fill";

  const stage = document.createElement("div");
  stage.className = "media-stage";

  const kind = (media.kind || "image").toLowerCase();
  const fit = (media.fit || "contain").toLowerCase(); // contain | cover

  let el;

  if (kind === "video"){
    el = document.createElement("video");
    el.src = media.src;
    el.controls = media.controls ?? true;
    el.autoplay = media.autoplay ?? false;
    el.loop = media.loop ?? false;
    el.muted = media.muted ?? false;
    el.playsInline = true;
  } else if (kind === "iframe" || kind === "widget"){
    el = document.createElement("iframe");
    el.src = media.src;
    el.allow = media.allow || "fullscreen";
  } else {
    // default: image
    el = document.createElement("img");
    el.src = media.src;
    el.alt = media.alt || "";
  }

  if (fit === "cover" && (el.tagName === "IMG" || el.tagName === "VIDEO")){
    el.classList.add("fit-cover");
  }

  stage.appendChild(el);
  wrap.appendChild(stage);

  // caption/source under media
  const srcText = media.source || media.caption;
  const srcHref = media.sourceHref || media.href;

  if (srcText){
    const cap = document.createElement("div");
    cap.className = "media-caption";
    if (srcHref){
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

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}
function escapeAttr(s){
  return escapeHtml(s).replace(/`/g,"&#096;");
}

