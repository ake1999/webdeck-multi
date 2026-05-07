import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { relativeProjectPath } from "./utils.mjs";

function formatVttTimestamp(totalSeconds) {
  const milliseconds = Math.max(0, Math.round(Number(totalSeconds || 0) * 1000));
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const millis = milliseconds % 1000;
  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":") + `.${String(millis).padStart(3, "0")}`;
}

function buildSlideVtt(slideScript, slideAlignment) {
  const lines = ["WEBVTT", ""];

  (slideAlignment.segments || []).forEach((segmentAlignment, index) => {
    const scriptSegment = (slideScript.segments || []).find(
      (segment) => segment.segment_id === segmentAlignment.segment_id,
    );
    lines.push(String(index + 1));
    lines.push(
      `${formatVttTimestamp(segmentAlignment.t0)} --> ${formatVttTimestamp(segmentAlignment.t1)}`,
    );
    lines.push((scriptSegment?.text || "").trim());
    lines.push("");
  });

  return `${lines.join("\n")}\n`;
}

function buildTopicVtt(scriptManifest, alignmentManifest) {
  const lines = ["WEBVTT", ""];
  let offset = 0;
  let cueIndex = 1;

  (alignmentManifest.slides || []).forEach((slideAlignment) => {
    const slideScript = (scriptManifest.slides || []).find(
      (slide) => slide.slide_id === slideAlignment.slide_id,
    );

    (slideAlignment.segments || []).forEach((segmentAlignment) => {
      const scriptSegment = (slideScript?.segments || []).find(
        (segment) => segment.segment_id === segmentAlignment.segment_id,
      );
      lines.push(String(cueIndex));
      lines.push(
        `${formatVttTimestamp(offset + segmentAlignment.t0)} --> ${formatVttTimestamp(offset + segmentAlignment.t1)}`,
      );
      lines.push((scriptSegment?.text || "").trim());
      lines.push("");
      cueIndex += 1;
    });

    offset += Number(slideAlignment.duration || 0);
  });

  return `${lines.join("\n")}\n`;
}

export async function writeSubtitles({
  scriptManifest,
  alignmentManifest,
  subtitlesDir,
}) {
  await mkdir(subtitlesDir, { recursive: true });
  const slideFiles = {};

  for (const slideAlignment of alignmentManifest.slides || []) {
    const slideScript = (scriptManifest.slides || []).find(
      (slide) => slide.slide_id === slideAlignment.slide_id,
    );
    if (!slideScript) continue;
    const subtitlePath = path.join(subtitlesDir, `${slideAlignment.slide_id}.vtt`);
    await writeFile(subtitlePath, buildSlideVtt(slideScript, slideAlignment), "utf8");
    slideFiles[slideAlignment.slide_id] = relativeProjectPath(subtitlePath);
  }

  const topicSubtitlePath = path.join(subtitlesDir, `${scriptManifest.topic_id}.vtt`);
  await writeFile(topicSubtitlePath, buildTopicVtt(scriptManifest, alignmentManifest), "utf8");

  return {
    topic_file: relativeProjectPath(topicSubtitlePath),
    slide_files: slideFiles,
  };
}
