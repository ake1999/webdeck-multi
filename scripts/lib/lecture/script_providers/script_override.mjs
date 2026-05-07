export function extractScriptOverrideSource(overrideSlide) {
  if (!overrideSlide || typeof overrideSlide !== "object") return null;

  if (Array.isArray(overrideSlide.segments) && overrideSlide.segments.length) {
    return {
      kind: "script_override_segments",
      value: overrideSlide.segments,
      slide: overrideSlide,
    };
  }

  if (typeof overrideSlide.text === "string" && overrideSlide.text.trim()) {
    return {
      kind: "script_override_text",
      value: overrideSlide.text,
      slide: overrideSlide,
    };
  }

  return null;
}
