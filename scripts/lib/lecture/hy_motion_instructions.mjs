function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function round(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(Number(value || 0) * factor) / factor;
}

function anchorSide(anchor = "") {
  if (String(anchor).includes("left")) return "left";
  if (String(anchor).includes("right")) return "right";
  if (String(anchor).includes("center")) return "center";
  return "center";
}

function targetSide(targetBBox, viewportWidth = 1920) {
  if (!Array.isArray(targetBBox) || targetBBox.length !== 4) return "center";
  const centerX = (Number(targetBBox[0]) + Number(targetBBox[2])) / 2;
  if (centerX < viewportWidth * 0.4) return "left";
  if (centerX > viewportWidth * 0.6) return "right";
  return "center";
}

function importanceLabel(importance = 0) {
  if (importance >= 0.9) return "very important";
  if (importance >= 0.72) return "important";
  if (importance >= 0.55) return "main";
  return "secondary";
}

function gesturePhrase(cue) {
  if (cue.pointing_required) return "give a clear point";
  if (cue.behavior === "explain_open_hand") return "use an open-hand explaining gesture";
  if (cue.behavior === "emphasize") return "use a firmer emphasis gesture";
  if (cue.behavior === "face_viewer") return "face the audience with a calm explaining stance";
  return "use relaxed teacher-like explaining gestures";
}

function movementPhrase(cue) {
  if (cue.should_reposition) {
    return `then slowly drift toward the ${anchorSide(cue.next_anchor || cue.preferred_anchor)} side for the next focus`;
  }
  return "stay mostly planted with only small natural shifts";
}

function collectKeyCues(cues) {
  const selected = [];
  const pushUnique = (cue) => {
    if (!cue || selected.some((item) => item.cue_id === cue.cue_id)) return;
    selected.push(cue);
  };

  pushUnique(cues[0]);
  cues.forEach((cue) => {
    if (cue.pointing_required || cue.should_reposition || Number(cue.importance || 0) >= 0.8) {
      pushUnique(cue);
    }
  });
  pushUnique(cues.at(-1));

  return selected.slice(0, 5);
}

export function buildHyMotionInstruction({ slideJob, slideMotion }) {
  const slide = slideMotion?.slide || slideMotion || {};
  const cues = collectKeyCues(asArray(slide.cues));
  const viewport = asArray(slide.viewport);
  const viewportWidth = Number(viewport[0] || slideJob?.viewport?.[0] || 1920);
  const entryPolicy = String(slide.entry_policy || slideJob?.entry_policy || "carry_previous_slide");
  const durationSec = round(slide.duration || slideJob?.duration_sec || 0, 2);

  const entrySentence = entryPolicy === "enter_right"
    ? "Start just off-screen on the right, enter smoothly, and settle into a teacher stance."
    : "Start from the previous slide pose and continue smoothly without a hard reset.";

  const cueSentences = cues.map((cue, index) => {
    const side = targetSide(cue.target_bbox, viewportWidth);
    const targetType = cue.target_type === "slide" ? "slide content" : `${cue.target_type} on the ${side}`;
    return `Beat ${index + 1}: for the ${importanceLabel(Number(cue.importance || 0))} ${targetType}, ${gesturePhrase(cue)}, and ${movementPhrase(cue)}.`;
  });

  const closeSentence = "Keep the torso mostly facing the students, avoid large turns, use slow walking only, and finish in a calm explaining pose ready for the next slide.";

  return [
    "Teacher presenter, fixed camera, natural classroom body language.",
    `Create one continuous motion sequence lasting about ${durationSec} seconds.`,
    entrySentence,
    ...cueSentences,
    closeSentence,
  ].join(" ");
}

export function buildHyMotionOutputSpec({ descriptor, slideId, baseSubdir = "webdeck_hy_motion" }) {
  const suffix = [
    descriptor.school,
    descriptor.course,
    descriptor.session,
    descriptor.topic,
  ].join("/");
  return {
    npz_output_dir: `${baseSubdir}/npz/${suffix}`,
    fbx_output_dir: `${baseSubdir}/fbx/${suffix}`,
    filename_prefix: slideId,
  };
}
