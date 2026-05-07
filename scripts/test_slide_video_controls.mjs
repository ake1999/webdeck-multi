#!/usr/bin/env node

import assert from "node:assert/strict";
import {
  durationBucket,
  energyBucket,
  pixelToBaseWorld,
  pixelToPointWorld,
  pixelToWorldX,
  pixelToWorldZ,
  directionBucketFromVector,
  __test,
} from "./lib/lecture/slide_video_controls.mjs";

function approx(actual, expected, tolerance = 0.002) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `Expected ${actual} ~= ${expected}`);
}

approx(pixelToWorldX(0), -2.467);
approx(pixelToWorldX(960), 0);
approx(pixelToWorldX(1920), 2.467);
approx(pixelToWorldX(-120), -2.775);
approx(pixelToWorldX(2040), 2.775);
approx(pixelToWorldZ(1022), 0);
approx(pixelToWorldZ(1080), -0.15);
approx(pixelToWorldZ(0), 2.625);

assert.deepEqual(pixelToBaseWorld([1740, 1030]), [2.004, 0, 0]);
assert.deepEqual(pixelToBaseWorld([1350, 1030]), [1.002, 0, 0]);
assert.deepEqual(pixelToPointWorld([780, 260], -0.25), [-0.462, -0.25, 1.957]);
assert.deepEqual(pixelToPointWorld([780, 260], -0.40), [-0.462, -0.4, 1.957]);

assert.equal(durationBucket(2.9), "3s");
assert.equal(durationBucket(4.5), "5s");
assert.equal(durationBucket(12), "8s");
assert.equal(energyBucket(0.5, 0.5), "calm");
assert.equal(energyBucket(0.58, 0.5), "normal");
assert.equal(energyBucket(0.8, 0.85), "emphatic");

assert.equal(directionBucketFromVector(-500, -500), "up_left");
assert.equal(directionBucketFromVector(500, -500), "up_right");
assert.equal(directionBucketFromVector(500, 500), "down_right");
assert.equal(directionBucketFromVector(20, 20), "center");

const hashSource = __test.buildHashSource({
  promptVersion: "kimodo_instructor_v001",
  motionType: "explain_point",
  durationBucketValue: "5s",
  energyBucketValue: "calm",
  gestureBucketValue: "light",
  directionBucketValue: "in_place",
  stepsBucketValue: 0,
  bodyFacingBucketValue: "slightly_left",
  gazeDirectionBucket: "up_left",
  pointDirectionBucket: "up_left",
  depthPolicy: "keep_y_fixed",
});
assert.equal(hashSource, "kimodo_instructor_v001|explain_point|5s|calm|light|in_place|0|slightly_left|gaze_up_left|point_up_left|keep_y_fixed");
assert.match(__test.normalizedMotionKey(hashSource), /^[a-f0-9]{12}$/);

const prompt = __test.fallbackCanonicalPrompt({
  motion_type: "explain_point",
  point_direction_bucket: "up_left",
});
assert.match(prompt, /middle-aged male professional instructor/i);
assert.match(prompt, /Avoid/i);
assert.doesNotMatch(prompt, /pixel|coordinate|camera/i);

const sideStepPrompt = __test.fallbackCanonicalPrompt({
  motion_type: "side_step_right",
  direction_bucket: "right",
  steps_bucket: 2,
});
assert.match(sideStepPrompt, /lateral steps to the right/i);
assert.match(sideStepPrompt, /not walking forward or backward/i);

const sideStepControls = __test.buildSegmentControls({
  cue: {
    cue_id: "cue_01",
    segment_id: "seg_01",
    t0: 0,
    t1: 5,
    duration: 5,
    should_reposition: true,
    preferred_anchor: "right_bottom",
    center_xy: [1350, 800],
    next_center_xy: [1600, 800],
    target_element: "slide",
    target_type: "slide",
  },
  index: 0,
  cueCount: 1,
  promptVersion: "kimodo_instructor_v001",
});
assert.equal(sideStepControls.request.motion_type, "side_step_right");
assert.equal(sideStepControls.request.direction_bucket, "right");
assert.equal(sideStepControls.request.depth_policy, "keep_y_fixed");
assert.equal(sideStepControls.request.gaze_direction_bucket, "center");
assert.equal(sideStepControls.segment.screen_path.path_type, "linear");
assert.deepEqual(sideStepControls.segment.screen_path.from_avatar_base_world_xyz_m, [1.002, 0, 0]);
assert.deepEqual(sideStepControls.segment.screen_path.to_avatar_base_world_xyz_m, [1.644, 0, 0]);
assert.equal(sideStepControls.segment.screen_constraints.keep_depth_y_fixed, true);

console.log("slide video controls tests passed");
