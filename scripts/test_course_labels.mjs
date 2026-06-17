import assert from "node:assert/strict";
import { getCourseConfig } from "../shared/course_catalog.js";
import {
  buildLessonIndex,
  formatLessonLabel,
  formatUnitLabel,
  getCourseTerminology,
  rebrandRoadmapSessionLabel,
  YOUTUBE_TERMINOLOGY,
} from "../shared/course_labels.js";

const course = getCourseConfig("ARIAN_Calculus_1");
const terms = getCourseTerminology(course);

assert.equal(terms.lesson, "Lesson");
assert.equal(terms.unit, "Unit");

const lessonIndex = buildLessonIndex(course);
assert.equal(lessonIndex.get("S03:06_the_chain_rule"), 13);
assert.equal(lessonIndex.get("S03:05_the_product_rule_for_derivatives"), 12);

assert.equal(
  formatUnitLabel(course.sessions[2], 3, terms),
  "Unit 3 — Derivative Foundations and Rules",
);

const productRule = course.sessions[2].topics[4];
assert.equal(
  formatLessonLabel(12, productRule, terms),
  "Lesson 12 — The Product Rule for Derivatives",
);

assert.equal(
  rebrandRoadmapSessionLabel("S03 Derivative Foundations and Rules", terms),
  "Unit 3 — Derivative Foundations and Rules",
);

assert.equal(
  rebrandRoadmapSessionLabel("Session 02 — Limits and Continuity", terms),
  "Unit 2 — Limits and Continuity",
);

console.log("course_labels tests passed");