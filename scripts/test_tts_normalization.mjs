#!/usr/bin/env node

import assert from "node:assert/strict";
import {
  applyTtsNormalizationToScriptManifest,
  attachTtsTextToSegment,
  ttsTextForSpeech,
} from "./lib/lecture/tts_normalization.mjs";

assert.equal(
  ttsTextForSpeech("Hi, I'm Arian, and welcome to Arian University."),
  "Hi, I'm Ahreean, and welcome to Ahreean University.",
);

assert.match(
  ttsTextForSpeech("The integral ∫ f(x) dx means area under f of x."),
  /integral.*f of x/i,
);

const segment = attachTtsTextToSegment({
  segment_id: "seg_01",
  text: "Hi, I'm Arian from Arian University.",
});
assert.equal(segment.text, "Hi, I'm Arian from Arian University.");
assert.equal(segment.tts_text, "Hi, I'm Ahreean from Ahreean University.");

const manifest = applyTtsNormalizationToScriptManifest({
  topic_id: "demo",
  slides: [
    {
      slide_id: "intro",
      segments: [
        {
          segment_id: "seg_01",
          text: "Hi, I'm Arian, and sin(x)/x matters here.",
        },
      ],
    },
  ],
});

assert.equal(manifest.slides[0].segments[0].text, "Hi, I'm Arian, and sin(x)/x matters here.");
assert.ok(manifest.slides[0].segments[0].tts_text.includes("Ahreean"));
assert.equal(manifest.tts_normalization.display_field, "text");
assert.equal(manifest.tts_normalization.speech_field, "tts_text");

console.log("tts normalization tests passed");