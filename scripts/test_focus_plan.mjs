import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "./lib/export_runtime.mjs";
import { compileFocusKeyframesForCue } from "./lib/lecture/focus_plan.mjs";

const layoutPath = path.join(
  projectRoot,
  "generated/lectures/AU/ARIAN_Calculus_1/S01/01_review_of_functions_and_graphs/layout.manifest.json",
);
const timelinePath = path.join(
  projectRoot,
  "generated/lectures/AU/ARIAN_Calculus_1/S01/01_review_of_functions_and_graphs/timeline.json",
);

const layout = JSON.parse(readFileSync(layoutPath, "utf8"));
const timeline = JSON.parse(readFileSync(timelinePath, "utf8"));
const slideLayout = layout.slides.find((slide) => slide.slide_id === "learning_objectives");
const slideTimeline = timeline.slides.find((slide) => slide.slide_id === "learning_objectives");
const cue01 = slideTimeline.timeline.find((cue) => cue.cue_id === "cue_01");
const cue03 = slideTimeline.timeline.find((cue) => cue.cue_id === "cue_03");

const roadmapKeyframes = compileFocusKeyframesForCue(cue01, slideLayout);
assert.ok(
  roadmapKeyframes.some((frame) => frame.target_element.includes("session_1")),
  "roadmap segment should focus unit/session 1",
);
assert.ok(
  roadmapKeyframes.some((frame) => frame.target_element.includes("session_2")),
  "roadmap segment should focus unit/session 2",
);

const objectiveKeyframes = compileFocusKeyframesForCue(cue03, slideLayout);
assert.ok(
  objectiveKeyframes.some((frame) => frame.target_element === "objective_1"),
  "objective segment should hit objective_1",
);
assert.ok(
  objectiveKeyframes.some((frame) => frame.target_element === "objective_2"),
  "objective segment should hit objective_2",
);

console.log("focus_plan tests passed", {
  roadmap_frames: roadmapKeyframes.length,
  objective_frames: objectiveKeyframes.length,
});