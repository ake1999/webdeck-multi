// shared/deck.js
// Slide deck engine:
// - Home button (icon)
// - Export to PDF (only on slide 1)
// - TTS (Piper or browser), reads titles + bullets, and quizzes (title/question/options)
// - Piper voice dropdown (GET /voices -> list) and sends &voice=... to /tts
// - Notes mode reads slide notes
// - Highlights the currently read element

import { renderSlide } from "./deck_render.js";

export function initDeck(config) {
  const {
    slidesData = [],
    hudDefault = "ROB9205 — INDUSTRIAL ROBOTS",
    hudPrefix = "",
    email = "karimza@algonquincollege.com",
    logoSrc = null,
    homeHref = "../index.html",

    // TTS config
    ttsBackend = "piper", // "piper" | "browser"
    ttsEndpoint = "/tts", // used when ttsBackend="piper"
    voicesEndpoint = "/voices", // returns {voices:[...]}

    theme = "ac",
  } = config || {};

  // ---------- DOM references ----------
  const slidesRoot = document.getElementById("slidesRoot");
  const hudLabel = document.getElementById("hudLabel");
  const counter = document.getElementById("counter");
  const deckScale = document.getElementById("deckScale");
  const deck = document.getElementById("deck");

  const homeBtn = document.getElementById("homeBtn");
  const emailLink = document.getElementById("emailLink");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pdfBtn = document.getElementById("pdfBtn");

  const ttsPlay = document.getElementById("ttsPlay");
  const ttsPause = document.getElementById("ttsPause");
  const ttsStop = document.getElementById("ttsStop");
  const ttsPrev = document.getElementById("ttsPrev");
  const ttsNext = document.getElementById("ttsNext");
  const ttsRate = document.getElementById("ttsRate");
  const ttsMode = document.getElementById("ttsMode");
  const ttsVoice = document.getElementById("ttsVoice"); // browser OR piper list

  if (!slidesRoot) {
    console.error("deck.js: missing #slidesRoot");
    return;
  }

  if (deck) {
    deck.classList.add(`theme-${theme}`);
  }

  const usePiper = ttsBackend === "piper";

  // ---------- Set globals ----------
  if (homeBtn) {
    homeBtn.href = homeHref;

    // small home icon
    homeBtn.textContent = "⌂";
    homeBtn.title = "Home";
    homeBtn.setAttribute("aria-label", "Home");
    homeBtn.style.width = "36px";
    homeBtn.style.height = "36px";
    homeBtn.style.padding = "0";
    homeBtn.style.display = "inline-flex";
    homeBtn.style.alignItems = "center";
    homeBtn.style.justifyContent = "center";
    homeBtn.style.fontSize = "18px";
    homeBtn.style.lineHeight = "1";
  }

  if (emailLink) {
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = email;
  }

  // Hide email label to save space
  const emailLabel = document.querySelector(".email-label");
  if (emailLabel) emailLabel.style.display = "none";

  if (logoSrc) {
    const logo = document.getElementById("logo");
    if (logo) {
      logo.src = logoSrc;
      logo.style.display = "block";
    }
  }

  // ---------- Build slides from data ----------
  slidesRoot.innerHTML = "";
  slidesData.forEach((s, idx) => slidesRoot.appendChild(renderSlide(s, idx)));

  const slides = Array.from(slidesRoot.querySelectorAll(".slide"));
  let currentSlide = 0;

  // ---------- Counter + HUD ----------
  function updateCounter() {
    if (counter) counter.textContent = `${currentSlide + 1} / ${slides.length}`;
  }

  function updateHud() {
    if (!hudLabel) return;
    const hud = slides[currentSlide]?.dataset.hud || hudDefault;
    hudLabel.textContent = hudPrefix ? `${hudPrefix}${hud}` : hud;
  }

  // ---------- PDF button only on first slide ----------
  function updateTopButtons() {
    if (!pdfBtn) return;
    pdfBtn.style.display = currentSlide === 0 ? "inline-flex" : "none";
  }

  // ---------- Fit-to-screen scaling ----------
  function fitToScreen() {
    if (!deck || !deckScale) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale =
      Math.min(vw / deck.offsetWidth, vh / deck.offsetHeight) * 0.96;
    deckScale.style.setProperty("--deck-scale", String(scale));
  }

  // ---------- MCQ reset ----------
  function resetMCQ(slideEl) {
    if (!slideEl) return;
    slideEl.querySelectorAll(".mcq").forEach((mcq) => {
      mcq.dataset.answered = "false";
      const feedback = mcq.querySelector(".feedback");
      if (feedback) {
        feedback.classList.remove("visible");
        feedback.textContent = "";
      }
      mcq.querySelectorAll(".option-btn").forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove("correct", "wrong");
      });
    });
  }

  // ---------- TTS state ----------
  let speaking = false;
  let paused = false;
  let speakQueue = []; // array of {el?, text}
  let speakIndex = 0;

  function clearHighlight() {
    slidesRoot
      .querySelectorAll(".tts-active")
      .forEach((el) => el.classList.remove("tts-active"));
  }

  // Build reading order:
  // - Notes mode: slide notes only
  // - Bullets mode:
  //   1) title (h1/h2 if has data-say)
  //   2) quiz question + options (if exists)
  //   3) [data-say] bullets/items
  function buildSpeakQueueForSlide(slideEl) {
    clearHighlight();
    const mode = ttsMode?.value || "bullets";
    const items = [];

    if (mode === "notes") {
      const notes = (slideEl.dataset.notes || "").trim();
      if (notes) items.push({ el: null, text: notes });
      return items;
    }

    // 1) title first (only if explicitly marked)
    const titleEl = slideEl.querySelector("h1[data-say], h2[data-say]");
    if (titleEl) {
      const t = (
        titleEl.getAttribute("data-say") ||
        titleEl.textContent ||
        ""
      ).trim();
      if (t) items.push({ el: titleEl, text: t });
    }

    // 2) quiz: question then options in order
    const quizQ = slideEl.querySelector(".quiz-question[data-say]");
    if (quizQ) {
      const t = (
        quizQ.getAttribute("data-say") ||
        quizQ.textContent ||
        ""
      ).trim();
      if (t) items.push({ el: quizQ, text: t });

      const opts = Array.from(
        slideEl.querySelectorAll(".option-btn[data-say]"),
      );
      for (const opt of opts) {
        const ot = (
          opt.getAttribute("data-say") ||
          opt.textContent ||
          ""
        ).trim();
        if (ot) items.push({ el: opt, text: ot });
      }
    }

    // 3) then: all bullets / other data-say (BUT avoid reading quiz elements twice)
    const sayEls = Array.from(slideEl.querySelectorAll("[data-say]"))
      .filter((el) => !el.classList.contains("option-btn"))
      .filter((el) => !el.classList.contains("quiz-question"))
      .filter((el) => el.tagName !== "H1" && el.tagName !== "H2"); // title already handled

    for (const el of sayEls) {
      const txt = (el.getAttribute("data-say") || el.textContent || "").trim();
      if (txt) items.push({ el, text: txt });
    }

    // fallback: if nothing has data-say, read li
    if (!items.length) {
      const lis = Array.from(slideEl.querySelectorAll("li"));
      for (const li of lis) {
        const txt = (li.textContent || "").trim();
        if (txt) items.push({ el: li, text: txt });
      }
    }

    return items;
  }

  // ---------- Piper voices (from server /voices) ----------
  let selectedPiperVoice = localStorage.getItem("piperVoice") || "";

  async function populatePiperVoices() {
    if (!ttsVoice) return;

    ttsVoice.disabled = false;
    ttsVoice.innerHTML = `<option value="">Default (server)</option>`;

    try {
      const res = await fetch(voicesEndpoint, { cache: "no-store" });
      if (!res.ok) throw new Error("GET /voices failed");
      const data = await res.json();
      const voices = Array.isArray(data.voices) ? data.voices : [];

      for (const v of voices) {
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent = v;
        ttsVoice.appendChild(opt);
      }

      if (selectedPiperVoice && voices.includes(selectedPiperVoice)) {
        ttsVoice.value = selectedPiperVoice;
      } else {
        selectedPiperVoice = "";
        ttsVoice.value = "";
        localStorage.setItem("piperVoice", "");
      }
    } catch (e) {
      console.warn("Could not load Piper voices:", e?.message || e);
      selectedPiperVoice = "";
      localStorage.setItem("piperVoice", "");
      ttsVoice.value = "";
    }
  }

  // ---------- Browser voices ----------
  function populateBrowserVoices() {
    if (!ttsVoice) return;
    if (!("speechSynthesis" in window)) return;

    const voices = window.speechSynthesis.getVoices() || [];
    const current = ttsVoice.value;

    const sorted = voices.slice().sort((a, b) => {
      const ae = (a.lang || "").toLowerCase().startsWith("en");
      const be = (b.lang || "").toLowerCase().startsWith("en");
      if (ae !== be) return (be ? 1 : 0) - (ae ? 1 : 0);
      return (a.name || "").localeCompare(b.name || "");
    });

    ttsVoice.innerHTML = "";
    const optAuto = document.createElement("option");
    optAuto.value = "";
    optAuto.textContent = "Auto voice";
    ttsVoice.appendChild(optAuto);

    for (const v of sorted) {
      const opt = document.createElement("option");
      opt.value = v.name;
      opt.textContent = `${v.name} (${v.lang})`;
      ttsVoice.appendChild(opt);
    }

    if (current) {
      const match = Array.from(ttsVoice.options).find(
        (o) => o.value === current,
      );
      if (match) ttsVoice.value = current;
    }
  }

  // ---------- Voice dropdown setup ----------
  if (ttsVoice) {
    if (usePiper) {
      populatePiperVoices();
    } else {
      populateBrowserVoices();
      if (typeof window.speechSynthesis !== "undefined") {
        window.speechSynthesis.onvoiceschanged = populateBrowserVoices;
      }
    }

    ttsVoice.addEventListener("change", () => {
      if (usePiper) {
        selectedPiperVoice = ttsVoice.value || "";
        localStorage.setItem("piperVoice", selectedPiperVoice);
      }
      stopTTS();
    });
  }

  // ---------- Piper backend ----------
  const piperAudio = new Audio();
  piperAudio.preload = "auto";

  let piperObjUrl = null;
  let piperAbort = null;
  let piperWatchdog = null;

  function piperStop() {
    try {
      if (piperAbort) piperAbort.abort();
    } catch {}
    piperAbort = null;

    if (piperWatchdog) {
      clearInterval(piperWatchdog);
      piperWatchdog = null;
    }

    try {
      piperAudio.onended = null;
      piperAudio.onerror = null;
      piperAudio.pause();
      piperAudio.currentTime = 0;
      piperAudio.src = "";
    } catch {}

    if (piperObjUrl) {
      try {
        URL.revokeObjectURL(piperObjUrl);
      } catch {}
      piperObjUrl = null;
    }
  }

  async function piperSpeak(text, onEnd) {
    piperStop();

    const controller = new AbortController();
    piperAbort = controller;

    const voiceParam = selectedPiperVoice
      ? `&voice=${encodeURIComponent(selectedPiperVoice)}`
      : "";

    const url =
      `${ttsEndpoint}?text=${encodeURIComponent(text)}${voiceParam}` +
      `&cb=${Date.now()}_${Math.random().toString(16).slice(2)}`;

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        cache: "no-store",
      });
      if (!res.ok) throw new Error(await res.text());

      const blob = await res.blob();
      piperObjUrl = URL.createObjectURL(blob);

      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        piperStop();
        onEnd && onEnd();
      };

      piperAudio.onended = finish;
      piperAudio.onerror = finish;

      // watchdog for Firefox sometimes missing "ended"
      piperWatchdog = setInterval(() => {
        try {
          if (!speaking) return;
          if (paused) return;
          if (!piperAudio.src) return;
          if (!isFinite(piperAudio.duration) || piperAudio.duration <= 0)
            return;

          if (piperAudio.currentTime >= piperAudio.duration - 0.05) finish();

          if (
            piperAudio.paused === true &&
            piperAudio.currentTime > 0 &&
            piperAudio.currentTime >= piperAudio.duration - 0.2
          ) {
            finish();
          }
        } catch {}
      }, 150);

      piperAudio.src = piperObjUrl;
      piperAudio.load();
      await piperAudio.play();
    } catch (e) {
      if (e && (e.name === "AbortError" || controller.signal.aborted)) return;

      console.error("Piper failed:", e?.message || e);

      // fallback to browser if available
      if ("speechSynthesis" in window) {
        browserSpeak(text, onEnd);
        return;
      }

      speaking = false;
      paused = false;
      clearHighlight();
      alert(
        "Piper TTS failed. Check serve_deck.py terminal for errors, then reload.",
      );
    }
  }

  // ---------- Browser backend ----------
  function browserStop() {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }

  function browserSpeak(text, onEnd) {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = Number(ttsRate?.value || 1);

    if (ttsVoice && ttsVoice.value) {
      const voices = window.speechSynthesis.getVoices() || [];
      const v = voices.find((x) => x.name === ttsVoice.value);
      if (v) u.voice = v;
    }

    u.onend = () => onEnd && onEnd();
    u.onerror = () => onEnd && onEnd();
    window.speechSynthesis.speak(u);
  }

  // ---------- High-level TTS controls ----------
  function stopTTS() {
    speaking = false;
    paused = false;
    speakQueue = [];
    speakIndex = 0;
    clearHighlight();

    piperStop();
    browserStop();
  }

  function speakItem(i) {
    if (!speakQueue.length) return;
    speakIndex = Math.max(0, Math.min(i, speakQueue.length - 1));

    const { el, text } = speakQueue[speakIndex];
    clearHighlight();
    if (el) el.classList.add("tts-active");

    const onEnd = () => {
      if (!speaking) return;
      const next = speakIndex + 1;
      if (next < speakQueue.length) speakItem(next);
      else {
        speaking = false;
        paused = false;
        clearHighlight();
      }
    };

    if (usePiper) piperSpeak(text, onEnd);
    else browserSpeak(text, onEnd);
  }

  function playTTS() {
    if (paused) {
      if (usePiper) {
        try {
          piperAudio.play();
        } catch {}
      } else {
        try {
          window.speechSynthesis.resume();
        } catch {}
      }
      paused = false;
      speaking = true;
      return;
    }

    stopTTS();
    const slideEl = slides[currentSlide];
    speakQueue = buildSpeakQueueForSlide(slideEl);
    if (!speakQueue.length) return;

    speaking = true;
    speakItem(0);
  }

  function pauseTTS() {
    if (!speaking) return;
    if (usePiper) {
      try {
        piperAudio.pause();
      } catch {}
    } else {
      try {
        window.speechSynthesis.pause();
      } catch {}
    }
    paused = true;
  }

  function prevTTS() {
    if (!speakQueue.length) return playTTS();
    piperStop();
    browserStop();
    speaking = true;
    paused = false;
    speakItem(speakIndex - 1);
  }

  function nextTTS() {
    if (!speakQueue.length) return playTTS();
    piperStop();
    browserStop();
    speaking = true;
    paused = false;
    speakItem(speakIndex + 1);
  }

  // ---------- Slide navigation ----------
  function showSlide(index) {
    if (!slides.length) return;

    slides[currentSlide].classList.remove("active");
    resetMCQ(slides[currentSlide]);
    stopTTS();

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    updateCounter();
    updateHud();
    updateTopButtons();
  }

  function changeSlide(dir) {
    showSlide(currentSlide + dir);
  }

  // ---------- Event listeners ----------
  if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      changeSlide(1);
    }
    if (e.key === "ArrowLeft") changeSlide(-1);
    if (e.key.toLowerCase() === "h" && homeBtn) homeBtn.click();
  });

  // MCQ click handler (delegated)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".option-btn");
    if (!btn) return;

    const mcq = btn.closest(".mcq");
    if (!mcq) return;
    if (mcq.dataset.answered === "true") return;

    mcq.dataset.answered = "true";
    const correct = mcq.getAttribute("data-correct");
    const explain = mcq.getAttribute("data-explain") || "";
    const choice = btn.getAttribute("data-choice");

    const buttons = Array.from(mcq.querySelectorAll(".option-btn"));
    buttons.forEach((b) => (b.disabled = true));

    if (choice === correct) btn.classList.add("correct");
    else {
      btn.classList.add("wrong");
      const correctBtn = buttons.find(
        (b) => b.getAttribute("data-choice") === correct,
      );
      if (correctBtn) correctBtn.classList.add("correct");
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

  // ---------- PDF page numbers (print-only) ----------
  function addPrintPageNumbers() {
    slides.forEach((s, i) => {
      let el = s.querySelector(".print-page-number");
      if (!el) {
        el = document.createElement("div");
        el.className = "print-page-number";
        s.appendChild(el);
      }
      el.textContent = `${i + 1} / ${slides.length}`;
    });
  }

  function removePrintPageNumbers() {
    slides.forEach((s) => {
      const el = s.querySelector(".print-page-number");
      if (el) el.remove();
    });
  }

  function exportPDF() {
    addPrintPageNumbers();
    document.body.classList.add("print-mode");
    setTimeout(() => window.print(), 50);
  }
  if (pdfBtn) pdfBtn.addEventListener("click", exportPDF);

  window.addEventListener("afterprint", () => {
    removePrintPageNumbers();
    document.body.classList.remove("print-mode");
    slides.forEach((s, i) => s.classList.toggle("active", i === currentSlide));
  });

  // ---------- TTS control events ----------
  if (ttsPlay) ttsPlay.addEventListener("click", playTTS);
  if (ttsPause) ttsPause.addEventListener("click", pauseTTS);
  if (ttsStop) ttsStop.addEventListener("click", stopTTS);
  if (ttsPrev) ttsPrev.addEventListener("click", prevTTS);
  if (ttsNext) ttsNext.addEventListener("click", nextTTS);

  if (ttsMode) ttsMode.addEventListener("change", () => stopTTS());

  window.addEventListener("resize", fitToScreen);

  // ---------- Init ----------
  fitToScreen();
  slides.forEach((s, i) => s.classList.toggle("active", i === 0));
  showSlide(0);
}
