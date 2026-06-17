import { YOUTUBE_TERMINOLOGY } from "../../../shared/course_labels.js";

export function resolveCourseTerminology(terminology) {
  return terminology && typeof terminology === "object" ? terminology : null;
}

export function rebrandSpokenCourseText(text, terminology = null) {
  const raw = String(text || "");
  const terms = resolveCourseTerminology(terminology);
  if (!raw || !terms || terms.unit === "Session") return raw;

  const thisLesson = terms.thisLesson || "this lesson";
  return raw
    .replace(/\bfive sessions\b/gi, "five units")
    .replace(/\b(\d+)\s+sessions?\s+total\b/gi, (_, count) => `${count} units total`)
    .replace(/\bSession\s+(\d+)\b/g, (_, number) => `Unit ${number}`)
    .replace(/\bsession-level\b/gi, "unit-level")
    .replace(/\bthis session\b/gi, thisLesson)
    .replace(/\bBy the end of this session\b/gi, `By the end of ${thisLesson}`);
}

export function applyCourseTerminologyToSegment(segment, terminology = YOUTUBE_TERMINOLOGY) {
  if (!segment || typeof segment !== "object") return segment;
  const text = rebrandSpokenCourseText(segment.text, terminology);
  if (text === segment.text) return segment;
  return { ...segment, text };
}

export function applyCourseTerminologyToScriptManifest(manifest, terminology = YOUTUBE_TERMINOLOGY) {
  if (!manifest || typeof manifest !== "object") return manifest;
  if (terminology?.unit === "Session") return manifest;

  const slides = (manifest.slides || []).map((slide) => ({
    ...slide,
    segments: (slide.segments || []).map((segment) => applyCourseTerminologyToSegment(segment, terminology)),
  }));

  return { ...manifest, slides };
}