export function selectorFromDescriptor(descriptor = {}) {
  return {
    school: descriptor.school || "AU",
    course: descriptor.course || "",
    session: descriptor.session || "",
    topic: descriptor.topic || "",
  };
}

export function encodePathTokens(tokens) {
  return tokens.map((token, index) => (index < 2 ? token : encodeURIComponent(token))).join("/");
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

export function buildAvatarOutputRoot(selector) {
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

export function buildAlignmentPath(selector) {
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