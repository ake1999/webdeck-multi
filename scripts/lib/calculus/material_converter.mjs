import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { adaptCalculusMaterialToDeck } from "../../../shared/calculus_material_adapter.js";
import { buildTopicRuntime } from "../../../shared/deck_model.js";
import { projectRoot } from "../export_runtime.mjs";
import { generateBaselineLecturePlan } from "../lecture/plan_generator.mjs";
import { validateLecturePlan } from "../lecture/contracts.mjs";

function compactText(value) {
  return String(value ?? "")
    .replace(/<br\s*\/?>/gi, "\n\n")
    .replace(/&nbsp;/gi, " ")
    .replace(/\r\n/g, "\n")
    .replace(/\s+\n/g, "\n")
    .trim();
}

function splitSentences(value, limit = 3) {
  const text = compactText(value).replace(/\n+/g, " ");
  if (!text) return [];
  return text
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function humanizeCourseTitle(course) {
  const value = String(course || "").trim();
  const match = value.match(/calculus[_-]?(\d+)/i);
  if (match) return `Calculus ${match[1]}`;
  return value.replace(/^ARIAN_/, "").replace(/[_-]+/g, " ") || "Calculus";
}

function relativeProjectPath(filePath) {
  return path.relative(projectRoot, filePath).split(path.sep).join("/");
}

function topicReviewKey({ school, course, session, topic }) {
  return `${school}__${course}__${session}__${topic}`.replace(/[^a-zA-Z0-9._-]+/g, "_");
}

function buildDescriptor({ school, course, session, topic, filePath }) {
  return {
    school,
    course,
    session,
    topic,
    filePath,
    relativePath: relativeProjectPath(filePath),
    sessionDir: path.dirname(filePath),
    reviewKey: topicReviewKey({ school, course, session, topic }),
  };
}

function moduleSource({ topicMeta, slidesData, sourcePath }) {
  return [
    `// Generated from ${sourcePath}`,
    "// Re-run `npm run convert:calculus-test` or `node scripts/convert_calculus_material.mjs ...` after editing the source material.",
    "",
    `export const topicMeta = ${JSON.stringify(topicMeta, null, 2)};`,
    "",
    `const slidesData = ${JSON.stringify(slidesData, null, 2)};`,
    "",
    "export default slidesData;",
    "",
  ].join("\n");
}

function sourceSlideIndexForPlan(planIndex) {
  // Adapter inserts a title slide and, when objectives exist, an objectives slide.
  return planIndex - 2;
}

function enrichLecturePlanFromMaterial(plan, material) {
  const meta = material?.lecture_meta || {};
  const objectives = Array.isArray(meta.learning_objectives)
    ? meta.learning_objectives.map(compactText).filter(Boolean)
    : [];

  const enriched = {
    ...plan,
    audience_level: compactText(meta.student_level) || plan.audience_level,
    topic_goal: meta.title
      ? `Teach ${meta.title} with a balance of visual intuition, formal language, and guided student checks.`
      : plan.topic_goal,
    topic_takeaways: objectives.length ? objectives : plan.topic_takeaways,
    style_notes: [
      ...new Set([
        ...(Array.isArray(plan.style_notes) ? plan.style_notes : []),
        "Use graphs, formulas, and plain-language intuition together.",
        "When a slide includes a visual plan or interactive controls, narrate what students should notice before naming the rule.",
      ]),
    ],
  };

  enriched.slides = (Array.isArray(plan.slides) ? plan.slides : []).map((slidePlan, index) => {
    if (index === 0) {
      return {
        ...slidePlan,
        narration_seed: compactText(meta.prerequisite_reminder)
          || slidePlan.narration_seed,
        must_cover: [
          meta.title ? `Course topic: ${meta.title}` : "",
          compactText(meta.topic),
        ].filter(Boolean),
      };
    }

    if (index === 1 && objectives.length) {
      return {
        ...slidePlan,
        narration_seed: `Frame the learning objectives as a promise for what students will be able to do: ${objectives.join(" ")}`,
        must_cover: objectives,
        teacher_strategy: "recap_and_reinforce",
        slide_role: "setup",
      };
    }

    const sourceSlide = material?.slides?.[sourceSlideIndexForPlan(index)];
    if (!sourceSlide) return slidePlan;
    const narration = compactText(sourceSlide.teacher_narration);
    const prompt = compactText(sourceSlide.student_prompt);
    const visible = compactText(sourceSlide.on_screen_text);
    const visualPlan = compactText(sourceSlide.left?.visual_spec || sourceSlide.right?.visual_spec);
    const controls = [
      ...(Array.isArray(sourceSlide.left?.interactive_controls) ? sourceSlide.left.interactive_controls : []),
      ...(Array.isArray(sourceSlide.right?.interactive_controls) ? sourceSlide.right.interactive_controls : []),
    ].map(compactText).filter(Boolean);

    return {
      ...slidePlan,
      narration_seed: narration || slidePlan.narration_seed,
      must_cover: [
        visible,
        ...splitSentences(sourceSlide.left?.content, 2),
        ...splitSentences(sourceSlide.right?.content, 2),
      ].filter(Boolean),
      likely_student_confusion: [
        ...(Array.isArray(slidePlan.likely_student_confusion) ? slidePlan.likely_student_confusion : []),
        prompt ? `Use the prompt to surface this check: ${prompt}` : "",
      ].filter(Boolean),
      prop_suggestions: [
        ...(Array.isArray(slidePlan.prop_suggestions) ? slidePlan.prop_suggestions : []),
        visualPlan ? "function graph" : "",
        controls.length ? "parameter sliders" : "",
      ].filter(Boolean),
      scene_hint: visualPlan
        ? `Convert this visual plan into an actual calculus visual when possible: ${visualPlan}`
        : slidePlan.scene_hint,
    };
  });

  return enriched;
}

async function writeNewFile(filePath, content, { force = false } = {}) {
  const exists = Boolean(await stat(filePath).catch(() => null));
  if (exists && !force) {
    throw new Error(`Refusing to overwrite ${relativeProjectPath(filePath)} without --force.`);
  }
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

export async function convertCalculusMaterialToTopic({
  materialPath,
  school = "AU",
  course = "ARIAN_Calculus_1",
  session = "S01",
  topic = "",
  outputRoot = path.join(projectRoot, "courses"),
  force = false,
  dryRun = false,
} = {}) {
  if (!materialPath) throw new Error("--material is required.");
  const absoluteMaterialPath = path.isAbsolute(materialPath)
    ? materialPath
    : path.resolve(projectRoot, materialPath);
  const material = JSON.parse(await readFile(absoluteMaterialPath, "utf8"));
  const topicId = topic || path.basename(absoluteMaterialPath, ".json");
  const topicDir = path.join(outputRoot, school, course, "sessions", session);
  const slidesPath = path.join(topicDir, `${topicId}.slides.js`);
  const planPath = path.join(topicDir, `${topicId}.lecture.plan.json`);
  const descriptor = buildDescriptor({
    school,
    course,
    session,
    topic: topicId,
    filePath: slidesPath,
  });

  const { slidesData, topicMeta } = adaptCalculusMaterialToDeck(material, {
    school,
    schoolName: "Arian University",
    course,
    courseTitle: humanizeCourseTitle(course),
    session,
    topic: topicId,
    email: "",
  });

  const sourcePath = relativeProjectPath(absoluteMaterialPath);
  const authoredTopicMeta = {
    ...topicMeta,
    id: topicId,
    sourceMaterial: sourcePath,
  };

  const runtime = buildTopicRuntime({
    topicMeta: authoredTopicMeta,
    slidesData,
    topicFallback: topicId,
  });
  const baselinePlan = generateBaselineLecturePlan({
    descriptor,
    runtime,
    slidesData,
  });
  const lecturePlan = enrichLecturePlanFromMaterial(baselinePlan, material);
  const planIssues = validateLecturePlan(lecturePlan);
  const errorIssues = planIssues.filter((issue) => issue.severity === "error");
  if (errorIssues.length) {
    throw new Error(`Generated lecture plan is invalid: ${errorIssues.map((issue) => issue.message).join(" ")}`);
  }

  const files = {
    slides: {
      path: slidesPath,
      content: moduleSource({
        topicMeta: authoredTopicMeta,
        slidesData,
        sourcePath,
      }),
    },
    lecturePlan: {
      path: planPath,
      content: `${JSON.stringify(lecturePlan, null, 2)}\n`,
    },
  };

  if (!dryRun) {
    await writeNewFile(files.slides.path, files.slides.content, { force });
    await writeNewFile(files.lecturePlan.path, files.lecturePlan.content, { force });
  }

  return {
    descriptor,
    sourcePath,
    slidesPath,
    planPath,
    slideCount: slidesData.length,
    planIssueCount: planIssues.length,
    planWarningCount: planIssues.filter((issue) => issue.severity === "warning").length,
    dryRun,
  };
}
