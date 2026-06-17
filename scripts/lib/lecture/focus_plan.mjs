import { plainTextForSpeech } from "./utils.mjs";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

const GENERIC_FOCUS_WORDS = new Set([
  "formula",
  "formulas",
  "graph",
  "graphs",
  "function",
  "functions",
  "input",
  "inputs",
  "analysis",
  "calculus",
  "lesson",
  "unit",
  "review",
  "learning",
  "objectives",
]);

const LOW_PRIORITY_TYPES = new Set([
  "title",
  "subtitle",
  "meta",
  "lead",
  "hud",
  "question",
]);

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "to", "of", "in", "on", "for", "with", "from", "by",
  "is", "are", "was", "were", "be", "this", "that", "we", "you", "our", "their", "its",
  "will", "can", "should", "then", "after", "before", "into", "one", "two", "three",
]);

const PHRASE_ALIASES = [
  ["function families", ["families", "family", "classify"]],
  ["domains and ranges", ["domains", "ranges", "domain and range"]],
  ["graph movement", ["transformations", "transformation", "shifts", "stretches"]],
  ["composition restrictions", ["composition restrictions", "composition", "compositions"]],
  ["piecewise boundaries", ["piecewise boundaries", "piecewise analysis", "piecewise"]],
  ["limits and continuity", ["limits and continuity", "limits", "continuity"]],
  ["preliminaries", ["preliminary", "preliminaries"]],
];

function normalizeSpeechText(value) {
  return plainTextForSpeech(value)
    .toLowerCase()
    .replace(/[—–-]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function keywordsFromLabel(label) {
  return normalizeSpeechText(label)
    .split(" ")
    .filter((word) => word.length > 3 && !STOPWORDS.has(word) && !GENERIC_FOCUS_WORDS.has(word));
}

function sessionNumberFromElement(element) {
  const id = String(element.id || "");
  const sessionMatch = id.match(/_session_(\d+)$/);
  if (sessionMatch) return Number(sessionMatch[1]);
  const label = normalizeSpeechText(element.label || "");
  const unitMatch = label.match(/^unit (\d+)/);
  if (unitMatch) return Number(unitMatch[1]);
  const sessionLabel = label.match(/^session (\d+)/);
  if (sessionLabel) return Number(sessionLabel[1]);
  return 0;
}

function buildPhrasesForElement(element) {
  const phrases = new Set();
  const label = normalizeSpeechText(element.label || "");
  const id = String(element.id || "");
  const type = String(element.type || "");

  if (label.length >= 8) {
    phrases.add(label);
  }

  if (type === "bullet" || id.startsWith("objective_")) {
    keywordsFromLabel(element.label).forEach((word) => {
      if (word.length >= 6) phrases.add(word);
    });
  } else {
    keywordsFromLabel(element.label).forEach((word) => phrases.add(word));
  }

  if (element.type === "course_path_session") {
    const number = sessionNumberFromElement(element);
    if (number > 0) {
      phrases.add(`unit ${number}`);
      phrases.add(`session ${number}`);
    }
    const title = label.split(/\s+—\s+|\s+-\s+/).pop()?.trim();
    if (title && title.length >= 8) phrases.add(title);
  }

  if (id.startsWith("path_topic_")) {
    const number = Number(id.replace("path_topic_", ""));
    if (number > 0) phrases.add(`lesson ${number}`);
  }

  if (id.startsWith("objective_")) {
    PHRASE_ALIASES.forEach(([canonical, aliases]) => {
      if (label.includes(canonical) || aliases.some((alias) => label.includes(alias))) {
        phrases.add(canonical);
        aliases.filter((alias) => alias.split(" ").length >= 2 || alias.length >= 12)
          .forEach((alias) => phrases.add(alias));
      }
    });
  }

  return [...phrases]
    .map((phrase) => normalizeSpeechText(phrase))
    .filter((phrase) => phraseAllowedForElement(element, phrase))
    .sort((left, right) => right.length - left.length);
}

function phraseAllowedForElement(element, phrase) {
  const words = phrase.split(" ").filter(Boolean);
  const type = String(element?.type || "");
  const id = String(element?.id || "");

  if (GENERIC_FOCUS_WORDS.has(phrase) || STOPWORDS.has(phrase)) return false;

  if (type === "course_path_session") {
    return words.length >= 2 || phrase.length >= 12;
  }
  if (type === "course_path_item" || type === "course_path_label" || type === "course_path_note") {
    return words.length >= 2 && phrase.length >= 10;
  }
  if (type === "bullet" || id.startsWith("objective_")) {
    return words.length >= 2 || PHRASE_ALIASES.some(([canonical]) => canonical === phrase);
  }
  if (LOW_PRIORITY_TYPES.has(type)) {
    return words.length >= 3 && phrase.length >= 12;
  }
  return phrase.length >= 6;
}

function elementMatchesScope(element, cue, segment) {
  const target = String(segment?.target_element || cue?.target_element || "");
  const id = String(element?.id || "");
  const type = String(element?.type || "");

  if (!target || target === "slide") return true;
  if (target.includes("roadmap") || type === "course_path") {
    return id.includes("roadmap")
      || id.startsWith("path_topic_")
      || type === "course_path_session"
      || type === "course_path_item"
      || type === "course_path_label"
      || type === "course_path_note";
  }
  if (target === "lead" || target.startsWith("objective_") || type === "bullet") {
    if (target.startsWith("objective_")) {
      const targetNum = Number(target.replace("objective_", ""));
      const elementNum = Number(id.replace("objective_", ""));
      if (id.startsWith("objective_") && Number.isFinite(targetNum) && Number.isFinite(elementNum)) {
        return Math.abs(elementNum - targetNum) <= 1;
      }
    }
    return target === id
      || id.startsWith("objective_")
      || type === "bullet"
      || id === "lead";
  }
  if (target.startsWith("left_step_") || target.startsWith("step_")) {
    return id === target || id.startsWith(`${target}_`);
  }
  if (target.endsWith("_pause") || target.includes("_prompt") || target.includes("_reveal")) {
    return id === target
      || id.startsWith(target.replace(/_reveal$/, "").replace(/_prompt$/, "").replace(/_pause$/, ""))
      || type === "prompt"
      || type === "reveal";
  }
  return id === target || id.startsWith(`${target}_`) || type === cue?.target_type;
}

function elementFocusRank(element, segmentTarget) {
  const type = String(element?.type || "");
  const id = String(element?.id || "");
  let rank = 0;
  if (LOW_PRIORITY_TYPES.has(type)) rank -= 40;
  if (id === segmentTarget) rank += 50;
  if (segmentTarget && id.startsWith(`${segmentTarget}_`)) rank += 30;
  if (id.startsWith("objective_") && segmentTarget.startsWith("objective_")) {
    rank += 20 - Math.abs(
      Number(id.replace("objective_", "")) - Number(segmentTarget.replace("objective_", "")),
    ) * 5;
  }
  const bbox = asArray(element?.bbox);
  if (bbox.length >= 2 && Number.isFinite(Number(bbox[1]))) {
    rank += Number(bbox[1]) / 1000;
  }
  return rank;
}

function buildElementMatchers(elements, cue, segment) {
  const segmentTarget = String(segment?.target_element || cue?.target_element || "");
  return asArray(elements)
    .filter((element) => element?.id && element.visible !== false)
    .filter((element) => elementMatchesScope(element, cue, segment))
    .map((element) => ({
      id: element.id,
      type: element.type || "element",
      rank: elementFocusRank(element, segmentTarget),
      phrases: buildPhrasesForElement(element),
    }))
    .filter((matcher) => matcher.phrases.length);
}

function speechFromWords(words) {
  return normalizedWordTokens(words)
    .map((entry) => entry.token)
    .join(" ");
}

function normalizedWordTokens(words) {
  return asArray(words).map((word) => ({
    ...word,
    token: normalizeSpeechText(word.word || ""),
  })).filter((entry) => entry.token);
}

function findPhraseWordTimes(words, phrase) {
  const tokens = normalizeSpeechText(phrase).split(" ").filter(Boolean);
  const entries = normalizedWordTokens(words);
  if (!tokens.length || entries.length < tokens.length) return null;

  for (let index = 0; index <= entries.length - tokens.length; index += 1) {
    let matched = true;
    for (let offset = 0; offset < tokens.length; offset += 1) {
      const spoken = entries[index + offset].token;
      const expected = tokens[offset];
      if (spoken !== expected && !spoken.startsWith(expected) && !expected.startsWith(spoken)) {
        matched = false;
        break;
      }
    }
    if (!matched) continue;
    const start = entries[index];
    const end = entries[index + tokens.length - 1];
    return {
      t0: Number(start.t0 ?? 0),
      t1: Number(end.t1 ?? end.t0 ?? 0),
    };
  }
  return null;
}

function findPhraseMatches(words, speech, phrases, matcher) {
  const matches = [];
  phrases.forEach((phrase) => {
    const timing = findPhraseWordTimes(words, phrase);
    if (!timing) return;
    matches.push({
      phrase,
      ...timing,
      length: phrase.length,
      rank: matcher.rank,
    });
  });
  return matches;
}

function resolveTarget(layoutSlide, targetElement) {
  const element = asArray(layoutSlide?.elements).find((item) => item.id === targetElement);
  if (!element) return null;
  return {
    target_element: element.id,
    target_type: element.type || "element",
    attention_xy: element.anchor,
    target_bbox: element.bbox,
  };
}

function pickBestHitAtTime(hits, moment) {
  const candidates = hits.filter((hit) => moment >= Number(hit.t0 || 0) - 0.05 && moment <= Number(hit.t1 || 0) + 0.2);
  if (!candidates.length) return null;
  candidates.sort((left, right) => {
    if (right.length !== left.length) return right.length - left.length;
    if (right.rank !== left.rank) return right.rank - left.rank;
    return left.t0 - right.t0;
  });
  return candidates[0];
}

export function compileFocusKeyframesForCue(cue, layoutSlide, segmentScript = null) {
  const words = asArray(cue.words);
  if (!words.length) return [];

  const speech = speechFromWords(words)
    || normalizeSpeechText(cue.speech || segmentScript?.text || "");
  if (!speech) return [];

  const matchers = buildElementMatchers(layoutSlide?.elements, cue, segmentScript);
  const cueT0 = Number(cue.audio_t0 ?? cue.t0 ?? 0);
  const cueT1 = Number(cue.audio_t1 ?? cue.t1 ?? cueT0);
  const hits = [];

  matchers.forEach((matcher) => {
    findPhraseMatches(words, speech, matcher.phrases, matcher).forEach((match) => {
      hits.push({
        target_element: matcher.id,
        target_type: matcher.type,
        phrase: match.phrase,
        t0: Number(match.t0 ?? cueT0),
        t1: Number(match.t1 ?? cueT1),
        priority: match.length,
        rank: match.rank,
      });
    });
  });

  if (!hits.length) return [];

  hits.sort((left, right) => {
    if (left.t0 !== right.t0) return left.t0 - right.t0;
    if (right.length !== left.length) return right.length - left.length;
    return right.rank - left.rank;
  });

  const deduped = [];
  hits.forEach((hit) => {
    const previous = deduped[deduped.length - 1];
    if (
      previous
      && previous.target_element === hit.target_element
      && hit.t0 <= previous.t1 + 0.25
      && hit.priority <= previous.priority
    ) {
      previous.t1 = Math.max(previous.t1, hit.t1);
      return;
    }
    const duplicate = deduped.find(
      (entry) => entry.target_element === hit.target_element && Math.abs(entry.t0 - hit.t0) < 0.2,
    );
    if (duplicate) return;
    deduped.push({ ...hit });
  });

  const keyframes = [];
  let cursor = cueT0;
  const defaultTarget = cue.target_element || segmentScript?.target_element || "slide";
  let lastTarget = defaultTarget;

  const sampleTimes = [];
  deduped.forEach((hit) => sampleTimes.push(Number(hit.t0 || 0)));
  sampleTimes.push(cueT1);
  const uniqueTimes = [...new Set(sampleTimes.map((time) => Number(time.toFixed(3))))].sort((a, b) => a - b);

  uniqueTimes.forEach((moment, index) => {
    const nextMoment = uniqueTimes[index + 1] ?? cueT1;
    if (nextMoment <= moment + 0.03) return;

    const best = pickBestHitAtTime(deduped, moment);
    const target = best?.target_element || (moment === cueT0 ? defaultTarget : lastTarget);
    if (!target || target === "slide") return;

    if (moment > cursor + 0.05 && keyframes.length === 0 && defaultTarget && defaultTarget !== "slide") {
      const resolved = resolveTarget(layoutSlide, defaultTarget);
      keyframes.push({
        t0: cursor,
        t1: moment,
        target_element: defaultTarget,
        target_type: resolved?.target_type || cue.target_type || "element",
        match_phrase: "segment_default",
      });
    }

    const resolved = resolveTarget(layoutSlide, target);
    keyframes.push({
      t0: Math.max(cursor, moment),
      t1: nextMoment,
      target_element: target,
      target_type: resolved?.target_type || best?.target_type || cue.target_type || "element",
      match_phrase: best?.phrase || "segment_hold",
    });
    lastTarget = target;
    cursor = Math.max(cursor, nextMoment);
  });

  return keyframes
    .filter((frame) => frame.t1 > frame.t0)
    .map((frame, index, list) => ({
      ...frame,
      t1: index < list.length - 1 ? list[index + 1].t0 : cueT1,
    }));
}

export function enrichTimelineWithFocusPlan({
  timeline = [],
  layoutSlide = null,
  slideScript = null,
} = {}) {
  const segmentsById = new Map(
    asArray(slideScript?.segments).map((segment) => [segment.segment_id, segment]),
  );

  return asArray(timeline).map((cue) => {
    if (cue.think_pause) return cue;
    const segment = segmentsById.get(cue.segment_id) || null;
    const focus_keyframes = compileFocusKeyframesForCue(cue, layoutSlide, segment);
    if (!focus_keyframes.length) return cue;

    const first = focus_keyframes[0];
    const resolved = resolveTarget(layoutSlide, first.target_element);
    return {
      ...cue,
      focus_keyframes,
      focus_element: first.target_element,
      ...(resolved
        ? {
          target_element: first.target_element,
          target_type: resolved.target_type,
          attention_xy: resolved.attention_xy,
          target_bbox: resolved.target_bbox,
        }
        : {}),
    };
  });
}