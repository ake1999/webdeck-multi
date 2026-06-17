function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function shiftWords(words, delta) {
  if (!delta) return words;
  return asArray(words).map((word) => ({
    ...word,
    t0: Number(word.t0 || 0) + delta,
    t1: Number(word.t1 || word.t0 || 0) + delta,
  }));
}

function defaultThinkPauseSec(authoring, planSlide) {
  const hinted = Number(planSlide?.interaction_hints?.think_pause_sec);
  if (Number.isFinite(hinted) && hinted > 0) return hinted;
  const contracted = Number(authoring?.playback_contract?.think_pause_sec);
  if (Number.isFinite(contracted) && contracted > 0) return contracted;
  return 8;
}

export function enrichTimelineWithThinkPauses({
  timeline = [],
  slideScript = null,
  planSlide = null,
  authoring = null,
} = {}) {
  const segmentsById = new Map(
    asArray(slideScript?.segments).map((segment) => [segment.segment_id, segment]),
  );
  const pauseSec = defaultThinkPauseSec(authoring, planSlide);
  const enriched = [];
  let shift = 0;

  asArray(timeline).forEach((cue, index) => {
    const segment = segmentsById.get(cue.segment_id);
    const previousCue = enriched[enriched.length - 1] || null;
    const previousSegment = previousCue
      ? segmentsById.get(previousCue.segment_id)
      : null;

    if (
      previousCue
      && previousSegment?.delivery_kind === "quiz_prompt"
      && segment
      && segment.delivery_kind !== "quiz_prompt"
      && !previousCue.think_pause
    ) {
      const thinkT0 = Number(previousCue.t1 || 0) + shift;
      const thinkT1 = thinkT0 + pauseSec;
      enriched.push({
        cue_id: `cue_think_${String(enriched.length + 1).padStart(2, "0")}`,
        segment_id: `${previousCue.segment_id}__think`,
        t0: thinkT0,
        t1: thinkT1,
        speech: "",
        attention_mode: previousCue.attention_mode,
        target_element: previousCue.target_element,
        target_type: previousCue.target_type,
        focus_element: previousCue.focus_element || previousCue.target_element,
        attention_xy: previousCue.attention_xy,
        target_bbox: previousCue.target_bbox,
        words: [],
        alignment_quality: "synthetic",
        delivery_kind: "think_pause",
        think_pause: true,
        actions: [],
      });
      shift += pauseSec;
    }

    const audioT0 = Number(cue.t0 || 0);
    const audioT1 = Number(cue.t1 || audioT0);
    enriched.push({
      ...cue,
      audio_t0: audioT0,
      audio_t1: audioT1,
      t0: audioT0 + shift,
      t1: audioT1 + shift,
      words: shiftWords(cue.words, shift),
      delivery_kind: segment?.delivery_kind || cue.delivery_kind || "",
      focus_element: cue.focus_element || cue.target_element,
    });
  });

  const duration = enriched.length
    ? Number(enriched[enriched.length - 1].t1 || 0)
    : 0;

  return { timeline: enriched, duration, think_pause_sec: pauseSec };
}