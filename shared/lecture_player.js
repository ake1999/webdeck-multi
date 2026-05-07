function rootRelativeUrl(filePath) {
  if (!filePath) return "";
  if (/^https?:\/\//i.test(String(filePath))) return String(filePath);
  const normalized = String(filePath).replace(/^\/+/, "");
  return new URL(normalized, `${window.location.origin}/`).toString();
}

function cloneJson(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeMediaSourceMode(value, fallback = "compiled") {
  const normalized = String(value || fallback).trim().toLowerCase();
  return ["compiled", "manual", "auto"].includes(normalized) ? normalized : fallback;
}

export function buildDefaultTimelinePath(descriptor) {
  const tokens = [
    "generated",
    "lectures",
    descriptor.school,
    descriptor.course,
    descriptor.session,
    descriptor.topic,
    "timeline.json",
  ];
  return tokens.map((token, index) => (index < 2 ? token : encodeURIComponent(token))).join("/");
}

function createUi() {
  const panel = document.createElement("div");
  panel.className = "lecture-player-panel";

  const playBtn = document.createElement("button");
  playBtn.type = "button";
  playBtn.className = "lecture-player-btn";
  playBtn.textContent = "Play";

  const pauseBtn = document.createElement("button");
  pauseBtn.type = "button";
  pauseBtn.className = "lecture-player-btn";
  pauseBtn.textContent = "Pause";

  const restartBtn = document.createElement("button");
  restartBtn.type = "button";
  restartBtn.className = "lecture-player-btn";
  restartBtn.textContent = "Restart";

  const status = document.createElement("div");
  status.className = "lecture-player-status";
  status.textContent = "Lecture not loaded";

  const caption = document.createElement("div");
  caption.className = "lecture-caption-bar";
  caption.textContent = "";

  const avatarLayer = document.createElement("div");
  avatarLayer.className = "lecture-avatar-layer";

  const avatarSlot = document.createElement("div");
  avatarSlot.className = "lecture-avatar-slot";
  avatarLayer.appendChild(avatarSlot);

  panel.append(playBtn, pauseBtn, restartBtn, status);

  const deck = document.getElementById("deck");
  deck?.append(avatarLayer, panel, caption);

  return {
    panel,
    playBtn,
    pauseBtn,
    restartBtn,
    status,
    caption,
    avatarLayer,
    avatarSlot,
  };
}

function buildSlideOffsets(timelineManifest) {
  const offsets = [];
  let cursor = 0;
  for (const slide of asArray(timelineManifest?.slides)) {
    offsets.push(cursor);
    cursor += Number(slide.duration || 0);
  }
  return {
    offsets,
    total: cursor,
  };
}

function applyAlignmentManifest(baseTimeline, alignmentManifest) {
  const aligned = cloneJson(baseTimeline);
  if (!aligned || !alignmentManifest) return aligned;

  for (const slide of asArray(aligned.slides)) {
    const alignedSlide = asArray(alignmentManifest.slides).find((item) => item.slide_id === slide.slide_id);
    if (!alignedSlide) continue;

    slide.duration = Number(alignedSlide.duration || slide.duration || 0);
    slide.audio_file = alignedSlide.audio_file || slide.audio_file || "";

    slide.timeline = asArray(slide.timeline).map((cue) => {
      const segment = asArray(alignedSlide.segments).find((item) => item.segment_id === cue.segment_id);
      if (!segment) return cue;
      return {
        ...cue,
        t0: Number(segment.t0 || cue.t0 || 0),
        t1: Number(segment.t1 || cue.t1 || 0),
        words: asArray(segment.words),
        alignment_quality: segment.alignment_quality || cue.alignment_quality || "segment_only",
      };
    });
  }

  return aligned;
}

function performAction(deckController, slideId, action) {
  if (!action || !deckController) return;

  if (action.type === "highlight") {
    deckController.highlightElement(slideId, action.element);
    return;
  }

  if (action.type === "clear_highlights") {
    deckController.clearHighlights();
    return;
  }

  if (action.type === "overlay") {
    deckController.showOverlay(action.data);
    return;
  }

  if (action.type === "clear_overlay") {
    deckController.clearOverlay();
  }
}

async function fetchJsonNoStore(url) {
  const response = await fetch(rootRelativeUrl(url), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

function mediaLogger(kind, detail) {
  console.info("[lecture-media]", { kind, ...detail });
  window.dispatchEvent(
    new CustomEvent("webdeck:lecture-media-source", {
      detail: {
        kind,
        ...detail,
      },
    }),
  );
}

export function createLecturePlayer({
  deckController,
  gapMs = 350,
  mediaSourceMode = "compiled",
} = {}) {
  if (!deckController) {
    throw new Error("createLecturePlayer requires a deckController instance.");
  }

  const ui = createUi();
  const audio = new Audio();
  audio.preload = "auto";

  let baseTimelineManifest = null;
  let activeTimelineManifest = null;
  let currentSlideIndex = 0;
  let currentCueIndex = -1;
  let rafId = 0;
  let advanceTimer = 0;
  let playing = false;
  let avatarToken = 0;
  let playbackRate = 1;
  let sourceMode = normalizeMediaSourceMode(mediaSourceMode);
  let loadedMedia = {
    audio: null,
    alignment: null,
    avatar: null,
  };

  function slideOffsets() {
    return buildSlideOffsets(activeTimelineManifest);
  }

  function currentSlide() {
    return activeTimelineManifest?.slides?.[currentSlideIndex] || null;
  }

  function setStatus(text) {
    ui.status.textContent = text;
  }

  function setCaption(text) {
    ui.caption.textContent = text || "";
    ui.caption.classList.toggle("visible", Boolean(text));
  }

  function currentAvatarVideo() {
    const media = ui.avatarSlot.querySelector("video");
    return media instanceof HTMLVideoElement ? media : null;
  }

  function currentGlobalTime() {
    const { offsets } = slideOffsets();
    return Number(offsets[currentSlideIndex] || 0) + Number(audio.currentTime || 0);
  }

  function clearAvatar() {
    avatarToken += 1;
    ui.avatarSlot.innerHTML = "";
    ui.avatarLayer.classList.remove("visible");
    ui.avatarLayer.dataset.anchor = "";
    loadedMedia.avatar = null;
  }

  function applyAvatarPlacement(action) {
    const bbox = Array.isArray(action?.placement_bbox) ? action.placement_bbox : null;
    if (!bbox) return;
    ui.avatarSlot.style.left = `${bbox[0]}px`;
    ui.avatarSlot.style.top = `${bbox[1]}px`;
    ui.avatarSlot.style.width = `${bbox[2] - bbox[0]}px`;
    ui.avatarSlot.style.height = `${bbox[3] - bbox[1]}px`;
    ui.avatarLayer.dataset.anchor = action.screen_anchor || "";
  }

  function stopSyncLoop() {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
    if (advanceTimer) {
      window.clearTimeout(advanceTimer);
      advanceTimer = 0;
    }
  }

  function syncCueAtTime(force = false) {
    const slide = currentSlide();
    if (!slide) return;

    const time = Number(audio.currentTime || 0);
    const activeCueIndex = asArray(slide.timeline).reduce((foundIndex, cue, index) => {
      if (time >= Number(cue.t0 || 0)) return index;
      return foundIndex;
    }, -1);

    if (!force && activeCueIndex === currentCueIndex) {
      return;
    }

    currentCueIndex = activeCueIndex;
    deckController.clearHighlights();
    deckController.clearOverlay();

    if (activeCueIndex < 0) {
      setCaption("");
      clearAvatar();
      return;
    }

    const cue = slide.timeline[activeCueIndex];
    setCaption(cue.speech || "");
    clearAvatar();

    const avatarActions = [];
    for (const action of asArray(cue.actions)) {
      if (action?.type === "avatar") {
        avatarActions.push(action);
      } else {
        performAction(deckController, slide.slide_id, action);
      }
    }

    if (avatarActions.length) {
      showAvatar(avatarActions.at(-1)).catch((error) => {
        console.error("Avatar cue failed:", error);
      });
    }

    window.dispatchEvent(
      new CustomEvent("webdeck:lecture-cue", {
        detail: {
          slide_id: slide.slide_id,
          cue,
        },
      }),
    );
  }

  function syncPlaybackLoop() {
    if (!playing) return;
    syncCueAtTime(false);
    rafId = window.requestAnimationFrame(syncPlaybackLoop);
  }

  function resolveAbsoluteTime(seconds) {
    const { offsets, total } = slideOffsets();
    const clamped = Math.max(0, Math.min(Number(seconds || 0), total));
    const slides = asArray(activeTimelineManifest?.slides);
    if (!slides.length) {
      return { slideIndex: 0, localTime: 0 };
    }

    for (let index = 0; index < slides.length; index += 1) {
      const start = Number(offsets[index] || 0);
      const end = start + Number(slides[index].duration || 0);
      if (clamped <= end || index === slides.length - 1) {
        return {
          slideIndex: index,
          localTime: Math.max(0, clamped - start),
        };
      }
    }

    return {
      slideIndex: slides.length - 1,
      localTime: Number(slides.at(-1)?.duration || 0),
    };
  }

  async function loadAudioElement(filePath) {
    const url = rootRelativeUrl(filePath);
    if (!url) {
      throw new Error("No audio path was provided.");
    }

    await new Promise((resolve, reject) => {
      const onLoaded = () => {
        cleanup();
        resolve();
      };
      const onError = () => {
        cleanup();
        reject(new Error(`Failed to load audio ${filePath}`));
      };
      const cleanup = () => {
        audio.removeEventListener("loadedmetadata", onLoaded);
        audio.removeEventListener("error", onError);
      };

      audio.addEventListener("loadedmetadata", onLoaded, { once: true });
      audio.addEventListener("error", onError, { once: true });
      audio.src = url;
      audio.load();
    });
  }

  function slideAudioCandidates(slide) {
    const compiled = slide?.media?.audio?.compiled || slide?.audio_file || "";
    const manual = slide?.media?.audio?.manual || "";
    const mode = sourceMode;

    if (mode === "compiled") {
      return [{ source: "compiled", path: compiled }];
    }
    if (mode === "manual") {
      return [{ source: "manual", path: manual }];
    }
    return [
      { source: "manual", path: manual },
      { source: "compiled", path: compiled },
    ];
  }

  async function resolveAndLoadSlideAudio(slide) {
    const candidates = slideAudioCandidates(slide);
    let lastError = null;

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (!candidate.path) {
        lastError = new Error(`No ${candidate.source} audio path is defined for ${slide.slide_id}.`);
        mediaLogger("audio", {
          mode: sourceMode,
          selected_source: candidate.source,
          selected_path: "",
          status: "missing",
          reason: lastError.message,
        });
        continue;
      }

      try {
        await loadAudioElement(candidate.path);
        audio.playbackRate = playbackRate;
        loadedMedia.audio = {
          mode: sourceMode,
          source: candidate.source,
          path: candidate.path,
        };
        mediaLogger("audio", {
          mode: sourceMode,
          selected_source: candidate.source,
          selected_path: candidate.path,
          status: "loaded",
        });
        return loadedMedia.audio;
      } catch (error) {
        lastError = error;
        const status = sourceMode === "auto" && index < candidates.length - 1 ? "fallback" : "error";
        mediaLogger("audio", {
          mode: sourceMode,
          selected_source: candidate.source,
          selected_path: candidate.path,
          status,
          reason: error?.message || String(error),
        });
      }
    }

    throw lastError || new Error(`Could not resolve audio for slide ${slide?.slide_id || ""}`.trim());
  }

  async function resolveAlignmentForMode() {
    if (!baseTimelineManifest) {
      throw new Error("No timeline has been loaded.");
    }

    const firstSlide = baseTimelineManifest.slides?.[0] || {};
    const compiledPath = firstSlide?.media?.alignment?.compiled || "";
    const manualPath = firstSlide?.media?.alignment?.manual || "";

    if (sourceMode === "compiled") {
      activeTimelineManifest = cloneJson(baseTimelineManifest);
      loadedMedia.alignment = {
        mode: sourceMode,
        source: "compiled",
        path: compiledPath,
      };
      mediaLogger("alignment", {
        mode: sourceMode,
        selected_source: "compiled",
        selected_path: compiledPath,
        status: compiledPath ? "loaded" : "missing",
      });
      return activeTimelineManifest;
    }

    if (sourceMode === "manual") {
      if (!manualPath) {
        loadedMedia.alignment = {
          mode: sourceMode,
          source: "manual",
          path: "",
          error: "No manual alignment path is defined.",
        };
        mediaLogger("alignment", {
          mode: sourceMode,
          selected_source: "manual",
          selected_path: "",
          status: "error",
          reason: "No manual alignment path is defined.",
        });
        throw new Error("No manual alignment path is defined.");
      }
      const alignment = await fetchJsonNoStore(manualPath);
      activeTimelineManifest = applyAlignmentManifest(baseTimelineManifest, alignment);
      loadedMedia.alignment = {
        mode: sourceMode,
        source: "manual",
        path: manualPath,
      };
      mediaLogger("alignment", {
        mode: sourceMode,
        selected_source: "manual",
        selected_path: manualPath,
        status: "loaded",
      });
      return activeTimelineManifest;
    }

    if (manualPath) {
      try {
        const alignment = await fetchJsonNoStore(manualPath);
        activeTimelineManifest = applyAlignmentManifest(baseTimelineManifest, alignment);
        loadedMedia.alignment = {
          mode: sourceMode,
          source: "manual",
          path: manualPath,
        };
        mediaLogger("alignment", {
          mode: sourceMode,
          selected_source: "manual",
          selected_path: manualPath,
          status: "loaded",
        });
        return activeTimelineManifest;
      } catch (error) {
        mediaLogger("alignment", {
          mode: sourceMode,
          selected_source: "manual",
          selected_path: manualPath,
          status: "fallback",
          reason: error?.message || String(error),
        });
      }
    }

    activeTimelineManifest = cloneJson(baseTimelineManifest);
    loadedMedia.alignment = {
      mode: sourceMode,
      source: "compiled",
      path: compiledPath,
    };
    mediaLogger("alignment", {
      mode: sourceMode,
      selected_source: "compiled",
      selected_path: compiledPath,
      status: compiledPath ? "loaded" : "missing",
    });
    return activeTimelineManifest;
  }

  function avatarCandidatesForMode(action) {
    const compiled = asArray(action?.media?.compiled_candidates || action?.asset_candidates);
    const manual = asArray(action?.media?.manual_candidates);

    if (sourceMode === "compiled") return compiled;
    if (sourceMode === "manual") return manual;
    return [...manual, ...compiled];
  }

  function loadAvatarMedia(candidate) {
    return new Promise((resolve, reject) => {
      const src = rootRelativeUrl(candidate?.src || "");
      if (!src) {
        reject(new Error("Empty avatar asset path"));
        return;
      }

      if (candidate.kind === "webm") {
        const video = document.createElement("video");
        video.className = "lecture-avatar-media";
        video.src = src;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.autoplay = true;
        video.playbackRate = playbackRate;
        video.addEventListener("loadeddata", () => resolve(video), { once: true });
        video.addEventListener("error", () => reject(new Error(`Failed to load ${candidate.src}`)), { once: true });
        return;
      }

      const img = document.createElement("img");
      img.className = "lecture-avatar-media";
      img.src = src;
      img.alt = candidate.asset_id || "avatar";
      img.addEventListener("load", () => resolve(img), { once: true });
      img.addEventListener("error", () => reject(new Error(`Failed to load ${candidate.src}`)), { once: true });
    });
  }

  async function showAvatar(action) {
    if (!action || action.clear) {
      clearAvatar();
      return false;
    }

    avatarToken += 1;
    const token = avatarToken;
    applyAvatarPlacement(action);

    const candidates = avatarCandidatesForMode(action);
    let lastError = null;
    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (!candidate?.src) continue;
      try {
        const media = await loadAvatarMedia(candidate);
        if (token !== avatarToken) return false;
        ui.avatarSlot.innerHTML = "";
        ui.avatarSlot.appendChild(media);
        ui.avatarLayer.classList.add("visible");
        loadedMedia.avatar = {
          mode: sourceMode,
          source: candidate.source_kind?.startsWith("manual") ? "manual" : "compiled",
          path: candidate.src,
          kind: candidate.kind,
        };
        mediaLogger("avatar", {
          mode: sourceMode,
          selected_source: loadedMedia.avatar.source,
          selected_path: candidate.src,
          status: "loaded",
        });
        return true;
      } catch (error) {
        lastError = error;
        const strictFailure = sourceMode !== "auto" || index === candidates.length - 1;
        mediaLogger("avatar", {
          mode: sourceMode,
          selected_source: candidate.source_kind?.startsWith("manual") ? "manual" : "compiled",
          selected_path: candidate.src,
          status: strictFailure ? "error" : "fallback",
          reason: error?.message || String(error),
        });
      }
    }

    ui.avatarSlot.innerHTML = "";
    ui.avatarLayer.classList.remove("visible");
    loadedMedia.avatar = {
      mode: sourceMode,
      source: "",
      path: "",
      error: lastError?.message || "No avatar asset could be loaded.",
    };
    if (sourceMode !== "auto") {
      console.error("Strict avatar media resolution failed:", lastError);
    }
    return false;
  }

  async function loadSlide(slideIndex, localTime = 0, autoplay = false) {
    const slide = activeTimelineManifest?.slides?.[slideIndex];
    if (!slide) {
      throw new Error(`Slide index ${slideIndex} is out of range.`);
    }

    currentSlideIndex = slideIndex;
    currentCueIndex = -1;
    setCaption("");
    deckController.clearHighlights();
    deckController.clearOverlay();
    clearAvatar();
    deckController.goToSlide(slide.slide_id, { preserveHighlights: true });
    await deckController.waitForSettledState();

    await resolveAndLoadSlideAudio(slide);
    audio.currentTime = Math.max(0, Math.min(Number(localTime || 0), Number(slide.duration || audio.duration || localTime)));
    syncCueAtTime(true);

    if (autoplay) {
      await audio.play();
      playing = true;
      setStatus(`Playing ${slide.slide_id}`);
      stopSyncLoop();
      syncPlaybackLoop();
    } else {
      audio.pause();
      playing = false;
      setStatus(`Loaded ${slide.slide_id}`);
      stopSyncLoop();
    }

    return slide;
  }

  async function loadAtAbsoluteTime(seconds, autoplay = false) {
    const target = resolveAbsoluteTime(seconds);
    return await loadSlide(target.slideIndex, target.localTime, autoplay);
  }

  async function handleEnded() {
    stopSyncLoop();
    deckController.clearHighlights();
    deckController.clearOverlay();
    clearAvatar();

    if (!activeTimelineManifest) return;
    const nextIndex = currentSlideIndex + 1;
    if (nextIndex >= activeTimelineManifest.slides.length) {
      playing = false;
      deckController.resume();
      setStatus("Lecture finished");
      setCaption("");
      clearAvatar();
      return;
    }

    advanceTimer = window.setTimeout(() => {
      advanceTimer = 0;
      loadSlide(nextIndex, 0, true).catch((error) => {
        playing = false;
        deckController.resume();
        setStatus(`Playback error: ${error?.message || error}`);
      });
    }, gapMs);
  }

  audio.addEventListener("ended", () => {
    handleEnded().catch((error) => {
      playing = false;
      deckController.resume();
      setStatus(`Playback error: ${error?.message || error}`);
    });
  });

  audio.addEventListener("ratechange", () => {
    playbackRate = Number(audio.playbackRate || 1);
    const avatarVideo = currentAvatarVideo();
    if (avatarVideo) {
      avatarVideo.playbackRate = playbackRate;
    }
  });

  async function loadTimeline(timeline) {
    baseTimelineManifest = cloneJson(timeline);
    await resolveAlignmentForMode();
    currentSlideIndex = 0;
    currentCueIndex = -1;
    setCaption("");
    clearAvatar();
    setStatus(`Lecture ready (${activeTimelineManifest?.slides?.length || 0} slides)`);
    window.__lectureTimeline = activeTimelineManifest;
    return activeTimelineManifest;
  }

  async function loadFromUrl(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load timeline: ${response.status} ${response.statusText}`);
    }
    const timeline = await response.json();
    return await loadTimeline(timeline);
  }

  async function play() {
    if (!activeTimelineManifest) {
      throw new Error("No timeline is loaded.");
    }

    deckController.pause();

    if (audio.src && audio.paused && currentSlide()) {
      await audio.play();
      playing = true;
      setStatus(`Playing ${currentSlide().slide_id}`);
      stopSyncLoop();
      syncPlaybackLoop();
      return true;
    }

    return await loadSlide(currentSlideIndex, Number(audio.currentTime || 0), true);
  }

  async function resume() {
    return await play();
  }

  function pause() {
    if (!audio.src) return false;
    audio.pause();
    const avatarVideo = currentAvatarVideo();
    avatarVideo?.pause();
    playing = false;
    stopSyncLoop();
    setStatus(`Paused ${currentSlide()?.slide_id || ""}`.trim());
    return true;
  }

  async function restart() {
    if (!activeTimelineManifest) return false;
    audio.pause();
    audio.currentTime = 0;
    playing = false;
    stopSyncLoop();
    currentSlideIndex = 0;
    return await loadSlide(0, 0, true);
  }

  function stop() {
    audio.pause();
    audio.currentTime = 0;
    playing = false;
    stopSyncLoop();
    currentCueIndex = -1;
    deckController.clearHighlights();
    deckController.clearOverlay();
    clearAvatar();
    deckController.resume();
    setCaption("");
    setStatus("Lecture stopped");
    return true;
  }

  async function seek(seconds) {
    if (!activeTimelineManifest) return false;
    const shouldResume = playing;
    await loadAtAbsoluteTime(seconds, shouldResume);
    return true;
  }

  async function seekBy(deltaSeconds) {
    return await seek(currentGlobalTime() + Number(deltaSeconds || 0));
  }

  function setPlaybackRate(rate) {
    const normalized = Math.max(0.25, Math.min(Number(rate || 1), 3));
    playbackRate = normalized;
    audio.playbackRate = normalized;
    const avatarVideo = currentAvatarVideo();
    if (avatarVideo) {
      avatarVideo.playbackRate = normalized;
    }
    return playbackRate;
  }

  function getPlaybackRate() {
    return playbackRate;
  }

  function getCurrentTime() {
    return currentGlobalTime();
  }

  function getTotalDuration() {
    return slideOffsets().total;
  }

  async function reloadMedia() {
    if (!baseTimelineManifest) return false;
    const time = currentGlobalTime();
    const shouldResume = playing;
    audio.pause();
    stopSyncLoop();
    await resolveAlignmentForMode();
    await loadAtAbsoluteTime(time, shouldResume);
    return true;
  }

  async function setMediaSourceMode(mode) {
    sourceMode = normalizeMediaSourceMode(mode, sourceMode);
    await reloadMedia();
    return sourceMode;
  }

  function getMediaSourceMode() {
    return sourceMode;
  }

  function pauseAudio() {
    audio.pause();
    playing = false;
    stopSyncLoop();
    return true;
  }

  async function resumeAudio() {
    await audio.play();
    playing = true;
    stopSyncLoop();
    syncPlaybackLoop();
    return true;
  }

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    playing = false;
    stopSyncLoop();
    syncCueAtTime(true);
    return true;
  }

  function pauseAvatar() {
    const avatarVideo = currentAvatarVideo();
    avatarVideo?.pause();
    return Boolean(avatarVideo);
  }

  async function resumeAvatar() {
    const avatarVideo = currentAvatarVideo();
    if (!avatarVideo) return false;
    await avatarVideo.play().catch(() => {});
    return true;
  }

  function stopAvatar() {
    clearAvatar();
    return true;
  }

  function getLoadedMedia() {
    return cloneJson(loadedMedia);
  }

  ui.playBtn.addEventListener("click", () => {
    play().catch((error) => {
      setStatus(`Play blocked: ${error?.message || error}`);
    });
  });
  ui.pauseBtn.addEventListener("click", () => {
    pause();
  });
  ui.restartBtn.addEventListener("click", () => {
    restart().catch((error) => {
      setStatus(`Restart failed: ${error?.message || error}`);
    });
  });

  const lectureMediaController = {
    play,
    pause,
    resume,
    stop,
    seek,
    seekBy,
    setPlaybackRate,
    getPlaybackRate,
    getCurrentTime,
    getTotalDuration,
    reloadMedia,
    setMediaSourceMode,
    getMediaSourceMode,
    pauseAudio,
    resumeAudio,
    stopAudio,
    pauseAvatar,
    resumeAvatar,
    stopAvatar,
    getLoadedMedia,
  };

  const player = {
    loadTimeline,
    loadFromUrl,
    play,
    pause,
    resume,
    restart,
    stop,
    isPlaying: () => playing,
    getTimeline: () => activeTimelineManifest,
    getCurrentSlideId: () => currentSlide()?.slide_id || "",
    mediaController: lectureMediaController,
  };

  window.lecturePlayer = player;
  window.__lecturePlayer = player;
  window.lectureMediaController = lectureMediaController;
  window.__lectureMediaController = lectureMediaController;

  return player;
}
