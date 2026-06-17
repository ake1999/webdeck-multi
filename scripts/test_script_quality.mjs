#!/usr/bin/env node

import assert from "node:assert/strict";
import {
  looksLikeStageDirection,
  shouldRequireProductionScripts,
  validateProductionScripts,
} from "./lib/lecture/script_quality.mjs";
import { ttsTextForSpeech } from "./lib/lecture/utils.mjs";

assert.equal(
  looksLikeStageDirection("Open with the counterintuitive horizontal-shift question, then anchor Review of Functions and Graphs."),
  true,
);
assert.equal(
  looksLikeStageDirection("Hi, I'm Arian, and welcome to Arian University. This is Calculus 1."),
  false,
);

assert.equal(
  shouldRequireProductionScripts({ scriptProvider: "deterministic" }),
  false,
);
assert.equal(
  shouldRequireProductionScripts({ scriptProvider: "llm_local" }),
  true,
);
assert.equal(
  shouldRequireProductionScripts({ scriptProvider: "auto", scriptModel: "deepseek-v4-flash" }),
  true,
);

const goodManifest = {
  slides: [
    {
      slide_id: "topic_title",
      script_source: "llm_local",
      provider_used: "llm_local",
      segments: [
        {
          segment_id: "seg_01",
          text: "Hi, I'm Arian, and welcome to Arian University. Quick prediction: why does f of x plus two move the graph left?",
        },
      ],
    },
    {
      slide_id: "closing",
      script_source: "llm_local",
      provider_used: "llm_local",
      segments: [
        {
          segment_id: "seg_01",
          text: "Remember these three toolkit skills, and you'll read every later limit graph with confidence.",
        },
      ],
    },
  ],
};

assert.deepEqual(validateProductionScripts(goodManifest), []);

const badManifest = {
  slides: [
    {
      slide_id: "topic_title",
      script_source: "lecture_plan_guidance",
      provider_used: "lecture_plan_guidance",
      segments: [
        {
          segment_id: "seg_01",
          text: "Use the roadmap first at the session level.",
        },
      ],
    },
  ],
};

assert.ok(validateProductionScripts(badManifest).length >= 2);

assert.equal(
  ttsTextForSpeech("Hi, I'm Arian, and welcome to Arian University."),
  "Hi, I'm Ah-ree-an, and welcome to Ah-ree-an University.",
);

console.log("script quality tests passed");