import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "./lib/export_runtime.mjs";
import {
  audioTimeForPlaybackTime,
  findThinkPauseCueAtPlaybackTime,
  playbackTimeFromAudioTime,
} from "../shared/lecture/timing.js";

const timelinePath = path.join(
  projectRoot,
  "generated/lectures/AU/ARIAN_Calculus_1/S01/01_review_of_functions_and_graphs/timeline.json",
);
const timeline = JSON.parse(readFileSync(timelinePath, "utf8"));
const slide = timeline.slides.find((item) => item.slide_id === "topic_title");

assert.ok(slide, "topic_title slide should exist");

const thinkCue = findThinkPauseCueAtPlaybackTime(slide, 15);
assert.equal(thinkCue?.segment_id, "seg_01__think");

assert.equal(audioTimeForPlaybackTime(slide, 15), 10.36);
assert.equal(playbackTimeFromAudioTime(slide, 10.36), 18.36);
assert.equal(playbackTimeFromAudioTime(slide, 22), 30);
assert.equal(audioTimeForPlaybackTime(slide, 30), 22);

const pauseSlide = timeline.slides.find((item) => item.slide_id === "s04_vertical_and_horizontal_shifts");
const pauseThink = findThinkPauseCueAtPlaybackTime(pauseSlide, 50);
assert.equal(pauseThink?.segment_id, "seg_06__think");
assert.equal(audioTimeForPlaybackTime(pauseSlide, 50), 48.48);
assert.equal(playbackTimeFromAudioTime(pauseSlide, 48.48), 56.48);

function thinkPauseDurationSec(slide) {
  return (slide?.timeline || [])
    .filter((cue) => cue.think_pause)
    .reduce((sum, cue) => sum + Math.max(0, Number(cue.t1 || 0) - Number(cue.t0 || 0)), 0);
}

function slideTailPauseSec(slide) {
  const speech = Number(slide?.speech_duration_sec || 0);
  const duration = Number(slide?.duration || 0);
  return Math.max(0, duration - speech - thinkPauseDurationSec(slide));
}

assert.equal(slideTailPauseSec(slide), 0, "topic_title should not add extra end pause");
assert.equal(slideTailPauseSec(pauseSlide), 0, "s04 think-pause gap should not double-count at end");

console.log("playback time mapping: ok");