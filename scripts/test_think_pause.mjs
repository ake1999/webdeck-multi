import assert from "node:assert/strict";
import { enrichTimelineWithThinkPauses } from "./lib/lecture/think_pause.mjs";
import { rebrandSpokenCourseText } from "./lib/lecture/course_terminology.mjs";
import { YOUTUBE_TERMINOLOGY } from "../shared/course_labels.js";

const { timeline, duration } = enrichTimelineWithThinkPauses({
  timeline: [
    {
      cue_id: "cue_01",
      segment_id: "seg_06",
      t0: 39,
      t1: 45,
      target_element: "left_pause",
      speech: "Pause and predict",
    },
    {
      cue_id: "cue_02",
      segment_id: "seg_07",
      t0: 45,
      t1: 53,
      target_element: "left_pause_reveal",
      speech: "It shifts left",
    },
  ],
  slideScript: {
    segments: [
      { segment_id: "seg_06", delivery_kind: "quiz_prompt" },
      { segment_id: "seg_07", delivery_kind: "explain" },
    ],
  },
  planSlide: { interaction_hints: { think_pause_sec: 8 } },
});

assert.equal(timeline.length, 3);
assert.equal(timeline[1].think_pause, true);
assert.equal(timeline[1].t0, 45);
assert.equal(timeline[1].t1, 53);
assert.equal(timeline[2].t0, 53);
assert.equal(timeline[2].audio_t0, 45);
assert.equal(duration, timeline[2].t1);

assert.match(
  rebrandSpokenCourseText("Five sessions total — Session 1", YOUTUBE_TERMINOLOGY),
  /five units total/i,
);
assert.match(
  rebrandSpokenCourseText("Five sessions total — Session 1", YOUTUBE_TERMINOLOGY),
  /Unit 1/,
);

console.log("think pause + course terminology: ok");