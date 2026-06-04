const DEFAULT_REFERENCE_RESOLUTION = [1920, 1080];
const DEFAULT_AVATAR_RENDER_RESOLUTION = [896, 1200];
const DERIVED_ORDERED_VIDEO_LIMIT = 12;

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

function clampNumber(value, min, max, fallback = min) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(number, max));
}

function normalizeMediaSourceMode(value, fallback = "compiled") {
  const normalized = String(value || fallback).trim().toLowerCase();
  return ["compiled", "manual", "auto"].includes(normalized) ? normalized : fallback;
}

function encodePathTokens(tokens) {
  return tokens.map((token, index) => (index < 2 ? token : encodeURIComponent(token))).join("/");
}

function selectorFromDescriptor(descriptor = {}) {
  return {
    school: descriptor.school || "AC",
    course: descriptor.course || "",
    session: descriptor.session || "",
    topic: descriptor.topic || "",
  };
}

export function buildDefaultTimelinePath(descriptor) {
  const selector = selectorFromDescriptor(descriptor);
  return encodePathTokens([
    "generated",
    "lectures",
    selector.school,
    selector.course,
    selector.session,
    selector.topic,
    "timeline.json",
  ]);
}

export function buildDefaultAvatarVideoJobPath(descriptor) {
  const selector = selectorFromDescriptor(descriptor);
  return encodePathTokens([
    "generated",
    "jobs",
    "avatar_video",
    selector.school,
    selector.course,
    selector.session,
    `${selector.topic}.json`,
  ]);
}

function buildAvatarOutputRoot(selector) {
  return encodePathTokens([
    "generated",
    "outputs",
    "avatar_video",
    selector.school,
    selector.course,
    selector.session,
    selector.topic,
  ]);
}

function buildAlignmentPath(selector) {
  return encodePathTokens([
    "generated",
    "outputs",
    "alignment",
    selector.school,
    selector.course,
    selector.session,
    selector.topic,
    "tts_alignment.json",
  ]);
}

function formatTime(seconds) {
  const clamped = Math.max(0, Number(seconds || 0));
  const minutes = Math.floor(clamped / 60);
  const wholeSeconds = Math.floor(clamped % 60);
  return `${minutes}:${String(wholeSeconds).padStart(2, "0")}`;
}

function createButton({ className = "", text = "", title = "", pressed = null } = {}) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `lecture-player-btn ${className}`.trim();
  button.textContent = text;
  if (title) {
    button.title = title;
    button.setAttribute("aria-label", title);
  }
  if (pressed != null) {
    button.setAttribute("aria-pressed", pressed ? "true" : "false");
    button.classList.toggle("active", Boolean(pressed));
  }
  return button;
}

function createUi() {
  document.body.classList.add("lecture-mode");

  const panel = document.createElement("div");
  panel.className = "lecture-player-panel lecture-player-panel--visible";

  const prevBtn = createButton({ text: "‹", title: "Previous slide" });
  const playBtn = createButton({ text: "Play", title: "Play lecture" });
  const pauseBtn = createButton({ text: "Pause", title: "Pause lecture" });
  const restartBtn = createButton({ text: "Restart", title: "Restart lecture" });
  const nextBtn = createButton({ text: "›", title: "Next slide" });

  const progress = document.createElement("input");
  progress.type = "range";
  progress.className = "lecture-player-progress";
  progress.min = "0";
  progress.max = "0";
  progress.step = "0.05";
  progress.value = "0";
  progress.title = "Lecture progress";

  const time = document.createElement("div");
  time.className = "lecture-player-time";
  time.textContent = "0:00 / 0:00";

  const subtitlesBtn = createButton({
    text: "CC",
    title: "Toggle subtitles",
    pressed: true,
  });
  const audioBtn = createButton({
    text: "Audio",
    title: "Toggle audio",
    pressed: true,
  });

  const volume = document.createElement("input");
  volume.type = "range";
  volume.className = "lecture-player-volume";
  volume.min = "0";
  volume.max = "1";
  volume.step = "0.01";
  volume.value = "1";
  volume.title = "Volume";

  const avatarBtn = createButton({
    text: "Avatar",
    title: "Toggle avatar video",
    pressed: true,
  });
  const autoAdvanceBtn = createButton({
    text: "Auto",
    title: "Toggle automatic slide advance",
    pressed: true,
  });

  const status = document.createElement("div");
  status.className = "lecture-player-status";
  status.textContent = "Teacher not loaded";

  panel.append(
    prevBtn,
    playBtn,
    pauseBtn,
    restartBtn,
    nextBtn,
    progress,
    time,
    subtitlesBtn,
    audioBtn,
    volume,
    avatarBtn,
    autoAdvanceBtn,
    status,
  );

  const caption = document.createElement("div");
  caption.className = "lecture-caption-bar";
  caption.textContent = "";

  const avatarLayer = document.createElement("div");
  avatarLayer.className = "lecture-avatar-layer";

  const avatarSlot = document.createElement("div");
  avatarSlot.className = "lecture-avatar-slot";
  avatarLayer.appendChild(avatarSlot);

  const focusLayer = document.createElement("div");
  focusLayer.className = "lecture-focus-layer";

  const focusTarget = document.createElement("div");
  focusTarget.className = "lecture-focus-target";
  focusLayer.appendChild(focusTarget);

  const deck = document.getElementById("deck");
  deck?.append(focusLayer, avatarLayer, caption, panel);

  return {
    panel,
    prevBtn,
    playBtn,
    pauseBtn,
    restartBtn,
    nextBtn,
    progress,
    time,
    subtitlesBtn,
    audioBtn,
    volume,
    avatarBtn,
    autoAdvanceBtn,
    status,
    caption,
    avatarLayer,
    avatarSlot,
    focusLayer,
    focusTarget,
  };
}

function buildSlideOffsets(timelineManifest) {
  const offsets = [];
  let cursor = 0;
  for (const slide of asArray(timelineManifest?.slides)) {
    offsets.push(cursor);
    cursor += Number(slide.duration || slide.duration_sec || 0);
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

function normalizedSegment(segment, index) {
  return {
    segment_id: segment.segment_id || `seg_${String(index + 1).padStart(2, "0")}`,
    t0: Number(segment.t0 || 0),
    t1: Number(segment.t1 || segment.t0 || 0),
    speech: segment.text || segment.speech || "",
    target_element: segment.target_element || segment.element || "",
    delivery_kind: segment.delivery_kind || "",
    avatar_behavior_hint: segment.avatar_behavior_hint || "",
    actions: asArray(segment.actions),
  };
}

function normalizeExplicitVideoSequence(sequence) {
  return asArray(sequence)
    .map((entry, index) => {
      const src = typeof entry === "string" ? entry : entry?.src || entry?.path || entry?.url || "";
      if (!src) return null;
      return {
        order: Number(entry?.order ?? index + 1),
        src,
        start_sec: Number(entry?.start_sec || 0),
        duration_sec: entry?.duration_sec == null ? null : Number(entry.duration_sec),
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.order - right.order);
}

function normalizeAvatarVideoJob(job) {
  const selector = selectorFromDescriptor(job.selector || {
    school: job.school,
    course: job.course_id,
    session: job.session_id,
    topic: job.topic_id,
  });
  const referenceResolution = asArray(job.render?.overlay?.reference_slide_resolution).length === 2
    ? job.render.overlay.reference_slide_resolution
    : DEFAULT_REFERENCE_RESOLUTION;
  const renderResolution = asArray(job.render?.resolution).length === 2
    ? job.render.resolution
    : DEFAULT_AVATAR_RENDER_RESOLUTION;
  const avatarOutputRoot = buildAvatarOutputRoot(selector);

  const slides = asArray(job.slides).map((slide, index) => {
    const speechSegments = asArray(slide.speech?.segments).map(normalizedSegment);
    const lastSegmentEnd = speechSegments.reduce((max, segment) => Math.max(max, Number(segment.t1 || 0)), 0);
    const audioDuration = Number(slide.speech?.audio_duration_sec || lastSegmentEnd || 0);
    const duration = Number(slide.duration_sec || audioDuration || lastSegmentEnd || 0);

    return {
      slide_id: slide.slide_id,
      slide_index: Number(slide.slide_index ?? index),
      duration,
      duration_sec: duration,
      audio_file: slide.speech?.audio || "",
      media: {
        audio: {
          compiled: slide.speech?.audio || "",
          manual: slide.speech?.audio || "",
        },
      },
      speech: {
        text: slide.speech?.text || "",
        audio: slide.speech?.audio || "",
        audio_duration_sec: audioDuration,
        segments: speechSegments.map((segment) => ({
          segment_id: segment.segment_id,
          text: segment.speech,
          t0: segment.t0,
          t1: segment.t1,
          target_element: segment.target_element,
          delivery_kind: segment.delivery_kind,
          avatar_behavior_hint: segment.avatar_behavior_hint,
        })),
      },
      timeline: speechSegments,
      avatar: {
        ...(slide.avatar || {}),
        placement: slide.avatar?.placement || {},
        video_sequence: normalizeExplicitVideoSequence(slide.avatar?.video_sequence),
        derived_output_root: `${avatarOutputRoot}/${encodeURIComponent(slide.slide_id)}`,
      },
      reference_resolution: referenceResolution,
      avatar_render_resolution: renderResolution,
      source_schema: job.schema_version,
    };
  });

  return {
    schema_version: "webdeck.lecture_playback.v1",
    source_schema: job.schema_version,
    selector,
    topic_id: job.topic_id || selector.topic,
    reference_resolution: referenceResolution,
    avatar_render_resolution: renderResolution,
    render: job.render || {},
    defaults: job.defaults || {},
    slides,
  };
}

function applyAlignmentToPlaybackManifest(playbackManifest, alignmentManifest) {
  if (!playbackManifest || !alignmentManifest) return playbackManifest;
  const updated = cloneJson(playbackManifest);

  for (const slide of asArray(updated.slides)) {
    const alignedSlide = asArray(alignmentManifest.slides).find((item) => item.slide_id === slide.slide_id);
    if (!alignedSlide) continue;

    const previousSpeechDuration = Number(slide.speech?.audio_duration_sec || 0);
    const previousPause = Math.max(0, Number(slide.duration || 0) - previousSpeechDuration);
    const alignedDuration = Number(alignedSlide.duration || previousSpeechDuration || slide.duration || 0);

    slide.audio_file = alignedSlide.audio_file || slide.audio_file || "";
    slide.speech.audio = alignedSlide.audio_file || slide.speech.audio || "";
    slide.speech.audio_duration_sec = alignedDuration;
    slide.duration = alignedDuration + previousPause;
    slide.duration_sec = slide.duration;
    slide.media.audio.compiled = slide.audio_file;
    slide.media.audio.manual = slide.audio_file;

    slide.timeline = asArray(slide.timeline).map((cue) => {
      const alignedSegment = asArray(alignedSlide.segments)
        .find((segment) => segment.segment_id === cue.segment_id);
      if (!alignedSegment) return cue;
      return {
        ...cue,
        t0: Number(alignedSegment.t0 ?? cue.t0 ?? 0),
        t1: Number(alignedSegment.t1 ?? cue.t1 ?? 0),
        words: asArray(alignedSegment.words),
        alignment_quality: alignedSegment.alignment_quality || cue.alignment_quality || "",
      };
    });

    slide.speech.segments = asArray(slide.speech.segments).map((segment) => {
      const alignedSegment = asArray(alignedSlide.segments)
        .find((item) => item.segment_id === segment.segment_id);
      if (!alignedSegment) return segment;
      return {
        ...segment,
        t0: Number(alignedSegment.t0 ?? segment.t0 ?? 0),
        t1: Number(alignedSegment.t1 ?? segment.t1 ?? 0),
        words: asArray(alignedSegment.words),
      };
    });
  }

  return updated;
}

function normalizeTimelineManifest(timeline) {
  const normalized = cloneJson(timeline);
  normalized.source_schema = timeline?.schema_version || "legacy_timeline";
  normalized.slides = asArray(normalized.slides).map((slide, index) => ({
    ...slide,
    slide_index: Number(slide.slide_index ?? index),
    duration: Number(slide.duration || slide.duration_sec || 0),
    timeline: asArray(slide.timeline).map((cue, cueIndex) => ({
      ...cue,
      segment_id: cue.segment_id || `cue_${cueIndex + 1}`,
      t0: Number(cue.t0 || 0),
      t1: Number(cue.t1 || cue.t0 || 0),
      speech: cue.speech || cue.text || "",
      target_element: cue.target_element || cue.element || "",
    })),
  }));
  return normalized;
}

function setToggleButton(button, enabled) {
  button.classList.toggle("active", Boolean(enabled));
  button.setAttribute("aria-pressed", enabled ? "true" : "false");
}

function isTextLikeElementType(type) {
  return [
    "title",
    "subtitle",
    "lead",
    "meta",
    "paragraph",
    "bullet",
    "question",
    "option",
    "math",
  ].includes(String(type || "").toLowerCase());
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
  let completionTimer = 0;
  let controlsHideTimer = 0;
  let playing = false;
  let avatarToken = 0;
  let playbackRate = 1;
  let sourceMode = normalizeMediaSourceMode(mediaSourceMode);
  let subtitlesEnabled = true;
  let avatarEnabled = true;
  let autoAdvanceEnabled = true;
  let audioEnabled = true;
  let progressDragging = false;
  let activeFocus = null;
  let activeAvatarVideo = null;
  let avatarSequenceDone = true;
  let audioDoneForSlide = true;
  let questionPauseDone = true;
  let postAudioPauseStartMs = 0;
  let postAudioPauseBaseSec = 0;
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

  function slideLocalTime() {
    const slide = currentSlide();
    if (!slide) return 0;
    if (postAudioPauseStartMs) {
      const elapsed = (performance.now() - postAudioPauseStartMs) / 1000;
      return Math.min(Number(slide.duration || 0), postAudioPauseBaseSec + elapsed);
    }
    return Number(audio.currentTime || 0);
  }

  function currentGlobalTime() {
    const { offsets } = slideOffsets();
    return Number(offsets[currentSlideIndex] || 0) + slideLocalTime();
  }

  function currentAvatarVideo() {
    return activeAvatarVideo instanceof HTMLVideoElement ? activeAvatarVideo : null;
  }

  function setStatus(text) {
    ui.status.textContent = text;
  }

  function setCaption(text) {
    ui.caption.textContent = text || "";
    ui.caption.classList.toggle("visible", Boolean(text) && subtitlesEnabled);
  }

  function clearFocus() {
    activeFocus = null;
    ui.focusTarget.className = "lecture-focus-target";
    ui.focusTarget.style.opacity = "0";
  }

  function wordIndexAtTime(cue, time) {
    const words = asArray(cue?.words);
    if (!words.length) return -1;
    let activeIndex = -1;
    for (let index = 0; index < words.length; index += 1) {
      const word = words[index];
      const t0 = Number(word.t0 ?? cue.t0 ?? 0);
      const t1 = Number(word.t1 ?? word.t0 ?? cue.t1 ?? t0);
      if (time >= t0 && time <= t1) return index;
      if (time >= t0) activeIndex = index;
    }
    return activeIndex;
  }

  function cueProgress(cue, time) {
    const t0 = Number(cue?.t0 || 0);
    const t1 = Number(cue?.t1 || t0);
    if (t1 <= t0) return 0;
    return Math.max(0, Math.min((Number(time || 0) - t0) / (t1 - t0), 1));
  }

  function showFocusForTarget(slideId, elementId, context = {}) {
    if (!elementId || elementId === "slide") {
      clearFocus();
      return false;
    }

    const baseBox = deckController.getElementBox?.(slideId, elementId);
    if (!baseBox) {
      clearFocus();
      return false;
    }

    const textLike = isTextLikeElementType(baseBox.elementType);
    const wordIndex = wordIndexAtTime(context.cue, context.time);
    const progress = cueProgress(context.cue, context.time);
    const box = textLike && deckController.getElementTextFocusBox
      ? deckController.getElementTextFocusBox(slideId, elementId, {
        progress,
        wordIndex,
        words: asArray(context.cue?.words),
      }) || baseBox
      : baseBox;
    if (!box) {
      clearFocus();
      return false;
    }

    activeFocus = { slideId, elementId, context };
    const left = Math.max(0, box.left - (textLike ? 2 : 0));
    const top = Math.max(0, textLike ? box.top + box.height - 5 : box.top);
    const width = Math.max(textLike ? 16 : 20, box.width + (textLike ? 4 : 0));
    const height = textLike ? 6 : Math.max(20, box.height);

    ui.focusTarget.className = `lecture-focus-target ${textLike ? "lecture-focus-target--underline" : "lecture-focus-target--halo"}`;
    ui.focusTarget.dataset.focusMode = box.focusMode || (textLike ? "line" : "box");
    ui.focusTarget.style.left = `${left}px`;
    ui.focusTarget.style.top = `${top}px`;
    ui.focusTarget.style.width = `${width}px`;
    ui.focusTarget.style.height = `${height}px`;
    ui.focusTarget.style.setProperty("--focus-shift", `${Math.round(progress * 100)}%`);
    ui.focusTarget.style.opacity = "1";
    return true;
  }

  function refreshFocus() {
    if (!activeFocus) return;
    showFocusForTarget(activeFocus.slideId, activeFocus.elementId, activeFocus.context || {});
  }

  function showFocusForCue(slide, cue, time) {
    return showFocusForTarget(slide.slide_id, cue?.target_element, {
      cue,
      time,
    });
  }

  function updateProgressUi() {
    const total = getTotalDuration();
    const current = currentGlobalTime();
    ui.progress.max = String(Math.max(0, total));
    if (!progressDragging) ui.progress.value = String(Math.max(0, Math.min(current, total)));
    ui.time.textContent = `${formatTime(current)} / ${formatTime(total)}`;
  }

  function revealControls({ pin = false } = {}) {
    ui.panel.classList.add("lecture-player-panel--visible");
    ui.panel.classList.toggle("lecture-player-panel--pinned", Boolean(pin));
    if (controlsHideTimer) window.clearTimeout(controlsHideTimer);
    controlsHideTimer = window.setTimeout(() => {
      if (!playing || ui.panel.matches(":hover") || ui.panel.classList.contains("lecture-player-panel--pinned")) return;
      ui.panel.classList.remove("lecture-player-panel--visible");
    }, 2400);
  }

  function setAudioEnabled(enabled) {
    audioEnabled = Boolean(enabled);
    audio.muted = !audioEnabled;
    setToggleButton(ui.audioBtn, audioEnabled);
    return audioEnabled;
  }

  function setSubtitlesEnabled(enabled) {
    subtitlesEnabled = Boolean(enabled);
    setToggleButton(ui.subtitlesBtn, subtitlesEnabled);
    setCaption(ui.caption.textContent || "");
    return subtitlesEnabled;
  }

  function setAutoAdvance(enabled) {
    autoAdvanceEnabled = Boolean(enabled);
    setToggleButton(ui.autoAdvanceBtn, autoAdvanceEnabled);
    return autoAdvanceEnabled;
  }

  function clearAvatar() {
    avatarToken += 1;
    if (activeAvatarVideo) {
      activeAvatarVideo.pause();
      activeAvatarVideo.removeAttribute("src");
      activeAvatarVideo.load();
    }
    activeAvatarVideo = null;
    ui.avatarSlot.innerHTML = "";
    ui.avatarLayer.classList.remove("visible");
    ui.avatarLayer.dataset.anchor = "";
    loadedMedia.avatar = null;
  }

  function logicalPlacementForSlide(slide) {
    const placement = slide?.avatar?.placement || {};
    const [referenceWidth, referenceHeight] = asArray(slide?.reference_resolution).length === 2
      ? slide.reference_resolution
      : DEFAULT_REFERENCE_RESOLUTION;
    const [renderWidth, renderHeight] = asArray(slide?.avatar_render_resolution).length === 2
      ? slide.avatar_render_resolution
      : DEFAULT_AVATAR_RENDER_RESOLUTION;
    const logicalSize = deckController.getLogicalSize?.() || { width: 1280, height: 720 };
    const scaleX = Number(logicalSize.width || 1280) / Number(referenceWidth || 1920);
    const scaleY = Number(logicalSize.height || 720) / Number(referenceHeight || 1080);
    const avatarScale = Number(placement.scale || activeTimelineManifest?.render?.overlay?.reference_scale || 0.42);
    const referenceAvatarWidth = Number(placement.width || renderWidth * avatarScale);
    const referenceAvatarHeight = Number(placement.height || renderHeight * avatarScale);
    const marginPx = Number(placement.margin_px ?? activeTimelineManifest?.render?.overlay?.margin_px ?? 24);
    const referenceX = Number.isFinite(Number(placement.x))
      ? Number(placement.x)
      : Number(referenceWidth) - referenceAvatarWidth - marginPx;
    const referenceY = Number.isFinite(Number(placement.y))
      ? Number(placement.y)
      : Number(referenceHeight) - referenceAvatarHeight - marginPx;

    return {
      left: referenceX * scaleX,
      top: referenceY * scaleY,
      width: referenceAvatarWidth * scaleX,
      height: referenceAvatarHeight * scaleY,
      anchor: placement.anchor || "bottom_right",
    };
  }

  function applyAvatarPlacement(slide) {
    const placement = logicalPlacementForSlide(slide);
    ui.avatarSlot.style.left = `${placement.left}px`;
    ui.avatarSlot.style.top = `${placement.top}px`;
    ui.avatarSlot.style.width = `${placement.width}px`;
    ui.avatarSlot.style.height = `${placement.height}px`;
    ui.avatarLayer.dataset.anchor = placement.anchor;
  }

  function applyLegacyAvatarPlacement(action) {
    const bbox = Array.isArray(action?.placement_bbox) ? action.placement_bbox : null;
    if (!bbox) return;
    ui.avatarSlot.style.left = `${bbox[0]}px`;
    ui.avatarSlot.style.top = `${bbox[1]}px`;
    ui.avatarSlot.style.width = `${bbox[2] - bbox[0]}px`;
    ui.avatarSlot.style.height = `${bbox[3] - bbox[1]}px`;
    ui.avatarLayer.dataset.anchor = action.screen_anchor || "";
  }

  function markAvatarSequenceDone() {
    avatarSequenceDone = true;
    maybeCompleteSlide();
  }

  function setAvatarEnabled(enabled) {
    avatarEnabled = Boolean(enabled);
    setToggleButton(ui.avatarBtn, avatarEnabled);
    if (!avatarEnabled) {
      clearAvatar();
      avatarSequenceDone = true;
      maybeCompleteSlide();
      return avatarEnabled;
    }

    const slide = currentSlide();
    if (slide) {
      startAvatarSequence(slide, slideLocalTime(), playing);
    }
    return avatarEnabled;
  }

  function loadVideoElement(candidate) {
    return new Promise((resolve, reject) => {
      const src = rootRelativeUrl(candidate?.src || "");
      if (!src) {
        reject(new Error("Empty avatar video path"));
        return;
      }

      const video = document.createElement("video");
      video.className = "lecture-avatar-media";
      video.src = src;
      video.muted = true;
      video.loop = false;
      video.controls = false;
      video.playsInline = true;
      video.preload = "auto";
      video.playbackRate = playbackRate;

      const cleanup = () => {
        video.removeEventListener("loadeddata", onLoaded);
        video.removeEventListener("error", onError);
      };
      const onLoaded = () => {
        cleanup();
        resolve(video);
      };
      const onError = () => {
        cleanup();
        reject(new Error(`Failed to load ${candidate.src}`));
      };

      video.addEventListener("loadeddata", onLoaded, { once: true });
      video.addEventListener("error", onError, { once: true });
      video.load();
    });
  }

  async function showAvatarVideo({ token, slide, candidate, onEnded, autoplay }) {
    try {
      const video = await loadVideoElement(candidate);
      if (token !== avatarToken || !avatarEnabled) return false;

      applyAvatarPlacement(slide);
      activeAvatarVideo = video;
      ui.avatarSlot.innerHTML = "";
      ui.avatarSlot.appendChild(video);
      ui.avatarLayer.classList.add("visible");
      loadedMedia.avatar = {
        path: candidate.src,
        kind: "webm",
        source: candidate.source || "avatar_video",
      };
      mediaLogger("avatar", {
        selected_path: candidate.src,
        status: "loaded",
        source: candidate.source || "avatar_video",
      });

      video.addEventListener("ended", () => {
        if (token !== avatarToken) return;
        onEnded?.();
      }, { once: true });

      if (autoplay && playing) {
        await video.play().catch(() => {});
      }
      return true;
    } catch (error) {
      mediaLogger("avatar", {
        selected_path: candidate?.src || "",
        status: "missing",
        reason: error?.message || String(error),
      });
      return false;
    }
  }

  function playExplicitAvatarSequence({ token, slide, sequence, index, autoplay }) {
    if (token !== avatarToken) return;
    if (index >= sequence.length) {
      markAvatarSequenceDone();
      return;
    }

    showAvatarVideo({
      token,
      slide,
      candidate: {
        ...sequence[index],
        source: "explicit_sequence",
      },
      autoplay,
      onEnded: () => playExplicitAvatarSequence({
        token,
        slide,
        sequence,
        index: index + 1,
        autoplay: true,
      }),
    }).then((loaded) => {
      if (token !== avatarToken) return;
      if (!loaded) {
        playExplicitAvatarSequence({
          token,
          slide,
          sequence,
          index: index + 1,
          autoplay,
        });
      }
    });
  }

  function playDerivedOrderedAvatar({ token, slide, index, autoplay }) {
    if (token !== avatarToken) return;
    if (index > DERIVED_ORDERED_VIDEO_LIMIT) {
      markAvatarSequenceDone();
      return;
    }

    const root = slide.avatar?.derived_output_root || "";
    const src = `${root}/${String(index).padStart(3, "0")}.transparent.webm`;
    showAvatarVideo({
      token,
      slide,
      candidate: {
        src,
        source: "derived_ordered",
      },
      autoplay,
      onEnded: () => playDerivedOrderedAvatar({
        token,
        slide,
        index: index + 1,
        autoplay: true,
      }),
    }).then((loaded) => {
      if (token !== avatarToken || loaded) return;
      if (index === 1) {
        playDerivedSingleAvatar({ token, slide, autoplay });
      } else {
        markAvatarSequenceDone();
      }
    });
  }

  function playDerivedSingleAvatar({ token, slide, autoplay }) {
    if (token !== avatarToken) return;
    const root = slide.avatar?.derived_output_root || "";
    const src = `${root}/transparent.webm`;
    showAvatarVideo({
      token,
      slide,
      candidate: {
        src,
        source: "derived_single",
      },
      autoplay,
      onEnded: markAvatarSequenceDone,
    }).then((loaded) => {
      if (token !== avatarToken) return;
      if (!loaded) markAvatarSequenceDone();
    });
  }

  function startAvatarSequence(slide, localTime = 0, autoplay = false) {
    clearAvatar();
    if (!avatarEnabled || !slide?.avatar) {
      avatarSequenceDone = true;
      return;
    }

    avatarToken += 1;
    const token = avatarToken;
    avatarSequenceDone = false;
    applyAvatarPlacement(slide);

    const sequence = normalizeExplicitVideoSequence(slide.avatar.video_sequence);
    if (sequence.length) {
      const startIndex = sequence.findIndex((entry) => Number(entry.start_sec || 0) >= Number(localTime || 0));
      playExplicitAvatarSequence({
        token,
        slide,
        sequence,
        index: startIndex < 0 ? 0 : startIndex,
        autoplay,
      });
      return;
    }

    playDerivedOrderedAvatar({
      token,
      slide,
      index: 1,
      autoplay,
    });
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

  function clearCompletionTimers() {
    if (completionTimer) {
      window.clearTimeout(completionTimer);
      completionTimer = 0;
    }
    postAudioPauseStartMs = 0;
    postAudioPauseBaseSec = 0;
  }

  function slideQuestionPauseSeconds(slide) {
    const interaction = slide?.avatar?.interaction;
    if (interaction?.type === "answer_pause") {
      return Math.max(0, Number(interaction.duration_sec || 0));
    }
    const speechDuration = Number(slide?.speech?.audio_duration_sec || audio.duration || 0);
    return Math.max(0, Number(slide?.duration || 0) - speechDuration);
  }

  function maybeCompleteSlide() {
    if (!playing) return;
    if (!audioDoneForSlide || !questionPauseDone || !avatarSequenceDone) return;

    stopSyncLoop();
    const nextIndex = currentSlideIndex + 1;
    const isFinal = !activeTimelineManifest || nextIndex >= asArray(activeTimelineManifest.slides).length;

    if (!autoAdvanceEnabled || isFinal) {
      playing = false;
      currentAvatarVideo()?.pause();
      revealControls({ pin: true });
      setStatus(isFinal ? "Lecture finished" : "Slide finished");
      if (isFinal) {
        deckController.resume();
        setCaption("");
        clearFocus();
      }
      return;
    }

    setStatus("Advancing");
    advanceTimer = window.setTimeout(() => {
      advanceTimer = 0;
      loadSlide(nextIndex, 0, true).catch((error) => {
        playing = false;
        deckController.resume();
        revealControls({ pin: true });
        setStatus(`Playback error: ${error?.message || error}`);
      });
    }, gapMs);
  }

  function handleAudioEnded() {
    audioDoneForSlide = true;
    const slide = currentSlide();
    const pauseSeconds = slideQuestionPauseSeconds(slide);
    if (pauseSeconds > 0) {
      questionPauseDone = false;
      postAudioPauseBaseSec = Number(slide?.speech?.audio_duration_sec || audio.duration || audio.currentTime || 0);
      postAudioPauseStartMs = performance.now();
      if (slide?.avatar?.interaction?.type === "answer_pause") {
        showFocusForTarget(slide.slide_id, "question");
        setStatus(`Waiting ${formatTime(pauseSeconds)}`);
      }
      completionTimer = window.setTimeout(() => {
        completionTimer = 0;
        postAudioPauseStartMs = 0;
        questionPauseDone = true;
        maybeCompleteSlide();
      }, pauseSeconds * 1000);
    } else {
      questionPauseDone = true;
    }
    maybeCompleteSlide();
  }

  function syncCueAtTime(force = false) {
    const slide = currentSlide();
    if (!slide) return;

    const time = slideLocalTime();
    const cues = asArray(slide.timeline);
    const activeCueIndex = cues.reduce((foundIndex, cue, index) => {
      if (time >= Number(cue.t0 || 0)) return index;
      return foundIndex;
    }, -1);

    if (!force && activeCueIndex === currentCueIndex) {
      if (activeCueIndex >= 0) {
        showFocusForCue(slide, cues[activeCueIndex], time);
      }
      return;
    }

    currentCueIndex = activeCueIndex;
    deckController.clearHighlights();
    deckController.clearOverlay();

    if (activeCueIndex < 0) {
      setCaption("");
      clearFocus();
      return;
    }

    const cue = cues[activeCueIndex];
    setCaption(cue.speech || "");
    showFocusForCue(slide, cue, time);

    const avatarActions = [];
    for (const action of asArray(cue.actions)) {
      if (action?.type === "avatar") {
        avatarActions.push(action);
      } else {
        performAction(deckController, slide.slide_id, action);
      }
    }

    if (avatarActions.length && activeTimelineManifest?.source_schema !== "webdeck.avatar_video_job.v1") {
      showLegacyAvatarAction(avatarActions.at(-1)).catch((error) => {
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
    updateProgressUi();
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
    const compiled = slide?.media?.audio?.compiled || slide?.audio_file || slide?.speech?.audio || "";
    const manual = slide?.media?.audio?.manual || slide?.speech?.audio || "";
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
        audio.muted = !audioEnabled;
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

    audio.removeAttribute("src");
    audio.load();
    loadedMedia.audio = {
      mode: sourceMode,
      source: "",
      path: "",
      error: lastError?.message || "No audio could be loaded.",
    };
    return null;
  }

  async function resolveAlignmentForMode() {
    if (!baseTimelineManifest) {
      throw new Error("No timeline has been loaded.");
    }

    const firstSlide = baseTimelineManifest.slides?.[0] || {};
    const compiledPath = firstSlide?.media?.alignment?.compiled || "";
    const manualPath = firstSlide?.media?.alignment?.manual || "";

    if (sourceMode === "compiled") {
      activeTimelineManifest = normalizeTimelineManifest(baseTimelineManifest);
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
      activeTimelineManifest = normalizeTimelineManifest(applyAlignmentManifest(baseTimelineManifest, alignment));
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
        activeTimelineManifest = normalizeTimelineManifest(applyAlignmentManifest(baseTimelineManifest, alignment));
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

    activeTimelineManifest = normalizeTimelineManifest(baseTimelineManifest);
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

  function loadLegacyAvatarMedia(candidate) {
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

  async function showLegacyAvatarAction(action) {
    if (!action || action.clear) {
      clearAvatar();
      return false;
    }

    avatarToken += 1;
    const token = avatarToken;
    applyLegacyAvatarPlacement(action);
    const candidates = avatarCandidatesForMode(action);
    let lastError = null;
    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (!candidate?.src) continue;
      try {
        const media = await loadLegacyAvatarMedia(candidate);
        if (token !== avatarToken) return false;
        ui.avatarSlot.innerHTML = "";
        ui.avatarSlot.appendChild(media);
        ui.avatarLayer.classList.add("visible");
        if (media instanceof HTMLVideoElement) activeAvatarVideo = media;
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

    loadedMedia.avatar = {
      mode: sourceMode,
      source: "",
      path: "",
      error: lastError?.message || "No avatar asset could be loaded.",
    };
    return false;
  }

  async function loadSlide(slideIndex, localTime = 0, autoplay = false) {
    const slide = activeTimelineManifest?.slides?.[slideIndex];
    if (!slide) {
      throw new Error(`Slide index ${slideIndex} is out of range.`);
    }

    stopSyncLoop();
    clearCompletionTimers();
    currentSlideIndex = slideIndex;
    currentCueIndex = -1;
    audioDoneForSlide = false;
    questionPauseDone = slideQuestionPauseSeconds(slide) <= 0;
    setCaption("");
    clearFocus();
    deckController.clearHighlights();
    deckController.clearOverlay();
    clearAvatar();
    deckController.goToSlide(slide.slide_id, { preserveHighlights: true });
    await deckController.waitForSettledState();

    const audioMeta = await resolveAndLoadSlideAudio(slide);
    const audioDuration = Number(audio.duration || slide.speech?.audio_duration_sec || slide.duration || 0);
    const safeLocalTime = Math.max(0, Math.min(Number(localTime || 0), audioDuration || Number(slide.duration || 0)));
    if (audioMeta) {
      audio.currentTime = safeLocalTime;
      audioDoneForSlide = audioDuration > 0 && safeLocalTime >= audioDuration - 0.05;
    } else {
      audioDoneForSlide = true;
      questionPauseDone = true;
    }

    startAvatarSequence(slide, safeLocalTime, autoplay && Boolean(audioMeta));
    syncCueAtTime(true);
    updateProgressUi();

    if (autoplay && audioMeta) {
      deckController.pause();
      playing = true;
      await audio.play();
      currentAvatarVideo()?.play().catch(() => {});
      setStatus(`Playing ${slide.slide_id}`);
      revealControls();
      syncPlaybackLoop();
    } else {
      audio.pause();
      currentAvatarVideo()?.pause();
      playing = false;
      setStatus(audioMeta ? `Loaded ${slide.slide_id}` : `Missing audio for ${slide.slide_id}`);
      revealControls({ pin: !audioMeta });
    }

    return slide;
  }

  async function loadAtAbsoluteTime(seconds, autoplay = false) {
    const target = resolveAbsoluteTime(seconds);
    return await loadSlide(target.slideIndex, target.localTime, autoplay);
  }

  audio.addEventListener("ended", handleAudioEnded);

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
    clearFocus();
    clearAvatar();
    updateProgressUi();
    setStatus(`Teacher ready (${activeTimelineManifest?.slides?.length || 0} slides)`);
    window.__lectureTimeline = activeTimelineManifest;
    return activeTimelineManifest;
  }

  async function loadAvatarVideoJob(job) {
    baseTimelineManifest = normalizeAvatarVideoJob(job);
    const alignmentPath = buildAlignmentPath(baseTimelineManifest.selector);
    try {
      const alignment = await fetchJsonNoStore(alignmentPath);
      baseTimelineManifest = applyAlignmentToPlaybackManifest(baseTimelineManifest, alignment);
      loadedMedia.alignment = {
        mode: "avatar_video_job",
        source: "canonical_alignment",
        path: alignmentPath,
      };
      mediaLogger("alignment", {
        mode: "avatar_video_job",
        selected_source: "canonical_alignment",
        selected_path: alignmentPath,
        status: "loaded",
      });
    } catch (error) {
      loadedMedia.alignment = {
        mode: "avatar_video_job",
        source: "speech_segments",
        path: "",
        warning: error?.message || String(error),
      };
      mediaLogger("alignment", {
        mode: "avatar_video_job",
        selected_source: "speech_segments",
        selected_path: alignmentPath,
        status: "fallback",
        reason: error?.message || String(error),
      });
    }
    activeTimelineManifest = cloneJson(baseTimelineManifest);
    currentSlideIndex = 0;
    currentCueIndex = -1;
    setCaption("");
    clearFocus();
    clearAvatar();
    updateProgressUi();
    setStatus(`Teacher ready (${activeTimelineManifest?.slides?.length || 0} slides)`);
    window.__lectureTimeline = activeTimelineManifest;
    window.__avatarVideoJob = job;
    return activeTimelineManifest;
  }

  async function loadManifest(manifest) {
    if (manifest?.schema_version === "webdeck.avatar_video_job.v1") {
      return await loadAvatarVideoJob(manifest);
    }
    return await loadTimeline(manifest);
  }

  async function loadFromUrl(url) {
    const manifest = await fetchJsonNoStore(url);
    return await loadManifest(manifest);
  }

  async function play() {
    if (!activeTimelineManifest) {
      throw new Error("No lecture media has been loaded.");
    }

    deckController.pause();

    if (audio.src && audio.paused && currentSlide() && !audioDoneForSlide) {
      await audio.play();
      currentAvatarVideo()?.play().catch(() => {});
      playing = true;
      setStatus(`Playing ${currentSlide().slide_id}`);
      revealControls();
      stopSyncLoop();
      syncPlaybackLoop();
      return true;
    }

    const localTime = audioDoneForSlide ? 0 : slideLocalTime();
    return await loadSlide(currentSlideIndex, localTime, true);
  }

  async function resume() {
    return await play();
  }

  function pause() {
    if (!audio.src && !currentAvatarVideo()) return false;
    audio.pause();
    currentAvatarVideo()?.pause();
    playing = false;
    stopSyncLoop();
    setStatus(`Paused ${currentSlide()?.slide_id || ""}`.trim());
    revealControls({ pin: true });
    updateProgressUi();
    return true;
  }

  async function restart() {
    if (!activeTimelineManifest) return false;
    audio.pause();
    audio.currentTime = 0;
    playing = false;
    stopSyncLoop();
    clearCompletionTimers();
    currentSlideIndex = 0;
    return await loadSlide(0, 0, true);
  }

  function stop() {
    audio.pause();
    audio.currentTime = 0;
    playing = false;
    stopSyncLoop();
    clearCompletionTimers();
    currentCueIndex = -1;
    deckController.clearHighlights();
    deckController.clearOverlay();
    clearFocus();
    clearAvatar();
    deckController.resume();
    setCaption("");
    setStatus("Teacher stopped");
    revealControls({ pin: true });
    updateProgressUi();
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

  async function goToRelativeSlide(delta) {
    if (!activeTimelineManifest) return false;
    const slides = asArray(activeTimelineManifest.slides);
    const target = Math.max(0, Math.min(slides.length - 1, currentSlideIndex + Number(delta || 0)));
    return await loadSlide(target, 0, playing);
  }

  function setPlaybackRate(rate) {
    const normalized = clampNumber(rate, 0.25, 3, 1);
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
    if (baseTimelineManifest.source_schema === "webdeck.avatar_video_job.v1") {
      activeTimelineManifest = cloneJson(baseTimelineManifest);
    } else {
      await resolveAlignmentForMode();
    }
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
    updateProgressUi();
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
    updateProgressUi();
    return true;
  }

  function pauseAvatar() {
    currentAvatarVideo()?.pause();
    return Boolean(currentAvatarVideo());
  }

  async function resumeAvatar() {
    const avatarVideo = currentAvatarVideo();
    if (!avatarVideo) return false;
    await avatarVideo.play().catch(() => {});
    return true;
  }

  function stopAvatar() {
    clearAvatar();
    avatarSequenceDone = true;
    maybeCompleteSlide();
    return true;
  }

  function getLoadedMedia() {
    return cloneJson(loadedMedia);
  }

  ui.playBtn.addEventListener("click", () => {
    play().catch((error) => {
      setStatus(`Play blocked: ${error?.message || error}`);
      revealControls({ pin: true });
    });
  });
  ui.pauseBtn.addEventListener("click", () => {
    pause();
  });
  ui.restartBtn.addEventListener("click", () => {
    restart().catch((error) => {
      setStatus(`Restart failed: ${error?.message || error}`);
      revealControls({ pin: true });
    });
  });
  ui.prevBtn.addEventListener("click", () => {
    goToRelativeSlide(-1).catch((error) => setStatus(`Previous failed: ${error?.message || error}`));
  });
  ui.nextBtn.addEventListener("click", () => {
    goToRelativeSlide(1).catch((error) => setStatus(`Next failed: ${error?.message || error}`));
  });
  ui.subtitlesBtn.addEventListener("click", () => {
    setSubtitlesEnabled(!subtitlesEnabled);
    revealControls({ pin: !playing });
  });
  ui.audioBtn.addEventListener("click", () => {
    setAudioEnabled(!audioEnabled);
    revealControls({ pin: !playing });
  });
  ui.avatarBtn.addEventListener("click", () => {
    setAvatarEnabled(!avatarEnabled);
    revealControls({ pin: !playing });
  });
  ui.autoAdvanceBtn.addEventListener("click", () => {
    setAutoAdvance(!autoAdvanceEnabled);
    revealControls({ pin: !playing });
  });
  ui.volume.addEventListener("input", () => {
    audio.volume = clampNumber(ui.volume.value, 0, 1, 1);
    if (audio.volume > 0 && !audioEnabled) setAudioEnabled(true);
    revealControls();
  });
  ui.progress.addEventListener("pointerdown", () => {
    progressDragging = true;
    revealControls({ pin: true });
  });
  ui.progress.addEventListener("input", () => {
    ui.time.textContent = `${formatTime(Number(ui.progress.value || 0))} / ${formatTime(getTotalDuration())}`;
  });
  ui.progress.addEventListener("change", () => {
    progressDragging = false;
    seek(Number(ui.progress.value || 0)).catch((error) => setStatus(`Seek failed: ${error?.message || error}`));
    revealControls({ pin: !playing });
  });
  ui.progress.addEventListener("pointerup", () => {
    progressDragging = false;
  });

  const deckElement = document.getElementById("deck");
  deckElement?.addEventListener("mousemove", (event) => {
    const rect = deckElement.getBoundingClientRect();
    const nearBottom = event.clientY > rect.bottom - Math.min(160, rect.height * 0.24);
    if (nearBottom || !playing) revealControls({ pin: !playing });
    else revealControls();
  });
  ui.panel.addEventListener("mouseenter", () => revealControls({ pin: true }));
  ui.panel.addEventListener("mouseleave", () => {
    ui.panel.classList.remove("lecture-player-panel--pinned");
    revealControls();
  });

  window.addEventListener("webdeck:deck-resize", () => {
    const slide = currentSlide();
    if (slide && currentAvatarVideo()) applyAvatarPlacement(slide);
    refreshFocus();
  });

  window.addEventListener("webdeck:slide-change", () => {
    if (!playing) {
      clearFocus();
      clearAvatar();
    }
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
    setAudioEnabled,
    setSubtitlesEnabled,
    setAvatarEnabled,
    setAutoAdvance,
    getLoadedMedia,
  };

  const player = {
    loadTimeline,
    loadAvatarVideoJob,
    loadManifest,
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

  revealControls({ pin: true });
  return player;
}
