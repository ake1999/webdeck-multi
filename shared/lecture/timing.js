function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function findThinkPauseCueAtPlaybackTime(slide, playbackTime) {
  const time = Number(playbackTime || 0);
  return asArray(slide?.timeline).find(
    (cue) => cue.think_pause
      && time >= Number(cue.t0 || 0)
      && time < Number(cue.t1 || 0),
  ) || null;
}

export function playbackTimeFromAudioTime(slide, audioTime) {
  const cues = asArray(slide?.timeline);
  const time = Number(audioTime || 0);
  if (!cues.length) return time;

  const speechCues = cues.filter((cue) => !cue.think_pause);
  if (!speechCues.length) return time;

  let activeCue = speechCues[0];
  for (const cue of speechCues) {
    const audioT0 = Number(cue.audio_t0 ?? cue.t0 ?? 0);
    if (time + 0.001 >= audioT0) activeCue = cue;
  }

  const audioT0 = Number(activeCue.audio_t0 ?? activeCue.t0 ?? 0);
  const playbackT0 = Number(activeCue.t0 ?? 0);
  return playbackT0 + Math.max(0, time - audioT0);
}

export function audioTimeForPlaybackTime(slide, playbackTime) {
  const cues = asArray(slide?.timeline);
  const time = Number(playbackTime || 0);

  const thinkCue = findThinkPauseCueAtPlaybackTime(slide, time);
  if (thinkCue) {
    const priorSpeech = [...cues].reverse().find(
      (cue) => !cue.think_pause && Number(cue.t0 || 0) < Number(thinkCue.t0 || 0),
    );
    if (priorSpeech) {
      return Number(priorSpeech.audio_t1 ?? priorSpeech.audio_t0 ?? priorSpeech.t1 ?? 0);
    }
    return 0;
  }

  const speechCue = [...cues].reverse().find((cue) => !cue.think_pause && time >= Number(cue.t0 || 0));
  if (!speechCue) return time;
  const playbackOffset = time - Number(speechCue.t0 || 0);
  return Number(speechCue.audio_t0 ?? speechCue.t0 ?? 0) + Math.max(0, playbackOffset);
}