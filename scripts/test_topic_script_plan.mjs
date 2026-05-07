#!/usr/bin/env node

import assert from "node:assert/strict";
import {
  buildTopicPlanContext,
  deterministicTopicScriptPlan,
  normalizeTopicScriptPlanPayload,
  topicPlanCacheIdentity,
  validateTopicScriptPlan,
} from "./lib/lecture/topic_script_plan.mjs";
import { buildScriptWriterRequestContext } from "./lib/lecture/script_providers/llm_local.mjs";

const descriptor = {
  school: "AC",
  course: "ROB9205_Industrial_Robots_W2026",
  session: "S01",
  topic: "demo_topic",
};
const runtime = {
  topicId: "demo_topic",
  slides: [
    { slideId: "intro", type: "title" },
    { slideId: "middle", type: "bullets" },
    { slideId: "closing", type: "bullets" },
  ],
};
const slidesData = [
  { title: "Welcome", subtitle: "Demo" },
  { title: "Core idea", bullets: [{ text: "One important point" }] },
  { title: "Wrap up", bullets: [{ text: "Remember the checklist" }] },
];
const authoring = {
  topicPedagogy: {
    topic_goal: "Teach the demo topic as one connected lesson.",
    topic_takeaways: ["Remember the core idea."],
  },
  slidePlansById: {
    intro: { slide_role: "intro", delivery_goal: "Open the class." },
    middle: { slide_role: "definition", delivery_goal: "Explain the core idea." },
    closing: { slide_role: "exit_check", delivery_goal: "Close the topic." },
  },
};
const layoutManifest = {
  slides: [
    { slide_id: "intro", bbox: [0, 0, 1920, 1080], elements: [{ id: "title", type: "title", bbox: [10, 10, 100, 80] }] },
    { slide_id: "middle", bbox: [0, 0, 1920, 1080], elements: [{ id: "bullet_1", type: "bullet", bbox: [10, 100, 400, 150] }] },
    { slide_id: "closing", bbox: [0, 0, 1920, 1080], elements: [{ id: "bullet_1", type: "bullet", bbox: [10, 100, 400, 150] }] },
  ],
};

const context = buildTopicPlanContext({ descriptor, runtime, slidesData, authoring, layoutManifest });
assert.equal(context.slides.length, 3);
assert.equal(context.slides[0].position, "first");
assert.equal(context.slides[2].position, "final");

const deterministic = deterministicTopicScriptPlan(context);
const validated = validateTopicScriptPlan(deterministic, ["intro", "middle", "closing"]);
assert.equal(validated.valid, true);
assert.equal(validated.normalized.slides[1].slide_id, "middle");

const bad = validateTopicScriptPlan({ ...deterministic, slides: deterministic.slides.slice(0, 2) }, ["intro", "middle", "closing"]);
assert.equal(bad.valid, false);
assert.match(bad.errors.join(" "), /Missing topic plan entry/);

const repaired = normalizeTopicScriptPlanPayload({
  opening_intent: "Open from the LLM.",
  closing_intent: "Close from the LLM.",
  lesson_arc: ["LLM arc."],
  slides: [
    {
      slide_id: "middle",
      speaking_goal: "LLM middle goal.",
      bridge_in: "LLM bridge in.",
      bridge_out: "LLM bridge out.",
      key_terms_introduced: ["middle term"],
      likely_callbacks: ["intro"],
      student_memory: "Remember the middle.",
    },
    {
      slide_id: "middle",
      speaking_goal: "Duplicate should be ignored.",
      bridge_in: "Duplicate.",
      bridge_out: "Duplicate.",
      key_terms_introduced: [],
      likely_callbacks: [],
      student_memory: "Duplicate.",
    },
  ],
}, context, { promptVersion: "script_topic_plan_v1", model: "test", provider: "llm_local_topic_plan" });
assert.equal(repaired.slides.length, 3);
assert.equal(repaired.slides[1].speaking_goal, "LLM middle goal.");
assert.match(repaired.generation_warnings.join(" "), /duplicate/i);
assert.match(repaired.generation_warnings.join(" "), /missing/i);

const identityA = topicPlanCacheIdentity({
  descriptor,
  model: "mistral-nemo:latest",
  promptVersion: "script_topic_plan_v1",
  context,
});
const identityB = topicPlanCacheIdentity({
  descriptor,
  model: "mistral-nemo:latest",
  promptVersion: "script_topic_plan_v1",
  context: { ...context, topic: { ...context.topic, title: "Changed" } },
});
assert.notEqual(identityA.context_hash, identityB.context_hash);

const requestContext = buildScriptWriterRequestContext({
  descriptor,
  runtime,
  slidesData,
  index: 1,
  slide: runtime.slides[1],
  rawSlide: slidesData[1],
  planSlide: authoring.slidePlansById.middle,
  authoring,
  layoutSlide: layoutManifest.slides[1],
  targetQueue: [{ id: "bullet_1", type: "bullet", label: "One important point" }],
  slideDefaults: {
    voice: { tone: "clear_teacher", energy: 0.58, pace: 0.96 },
    attention_mode: "slide_focus",
  },
  topicScriptPlan: deterministic,
  continuityContext: {
    previous_slide_summary: "Welcome: opened the topic.",
    last_spoken_excerpt: "Today we begin the demo topic.",
    prior_topic_memory: [{ slide_id: "intro", student_memory: "The class has started." }],
    next_slide_intent: "Close the topic.",
  },
});

assert.equal(requestContext.slide.position, "middle");
assert.equal(requestContext.topic_script_plan.current_slide_plan.slide_id, "middle");
assert.equal(requestContext.continuity.previous_slide_summary, "Welcome: opened the topic.");
assert.equal(requestContext.continuity.last_spoken_excerpt, "Today we begin the demo topic.");
assert.equal(requestContext.continuity.next_slide_intent, "Close the topic.");

console.log("topic script plan tests passed");
