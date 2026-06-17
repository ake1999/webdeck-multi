import path from "node:path";
import { readFile, stat, writeFile } from "node:fs/promises";
import { buildTopicRuntime, stripRichText } from "../../../shared/deck_model.js";
import { loadTopicModule } from "../catalog.mjs";
import { projectRoot } from "../export_runtime.mjs";
import { cleanNarrationSeed, plainTextForSpeech, plainTextSummary } from "./utils.mjs";
import { LECTURE_PLAN_SCHEMA_VERSION, relativeContractPath } from "./contracts.mjs";
import { buildTopicPedagogyProfile, getTopicSlideOverride } from "./plan_profiles.mjs";

const VOICE_STYLE_PRESETS = {
  clear_teacher: { tone: "clear_teacher", energy: 0.58, pace: 0.96 },
  serious_clear: { tone: "serious_clear", energy: 0.5, pace: 0.92 },
  compare_explain: { tone: "compare_explain", energy: 0.6, pace: 0.95 },
  energetic_demo: { tone: "energetic_demo", energy: 0.66, pace: 0.98 },
  calm_recap: { tone: "calm_recap", energy: 0.48, pace: 0.92 },
};

const GENERIC_NARRATION_SEED_PATTERNS = [
  /^explain .* as a short teaching sequence/i,
  /^use the visual on .* to guide attention/i,
  /^introduce .* clearly, explain the main goal/i,
  /^ask the question on .* give students/i,
  /^explain the paragraph content on /i,
  /^this slide focuses on /i,
];

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function uniqueStrings(...groups) {
  return [...new Set(groups.flat().map((item) => String(item || "").trim()).filter(Boolean))];
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function splitSentences(value) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function trimNarrationSeed(value) {
  const normalized = cleanNarrationSeed(value);
  if (!normalized) return "";
  const sentences = splitSentences(normalized);
  return (sentences.slice(0, 2).join(" ") || normalized).trim();
}

function rawTitle(rawSlide, slide) {
  return stripRichText(String(rawSlide?.title || rawSlide?.question || slide.slideId || "this slide")).trim();
}

function normalizeKey(value) {
  return stripRichText(String(value || "")).replace(/\s+/g, " ").trim().toLowerCase();
}

function mediaKinds(rawSlide) {
  const kinds = [];
  if (rawSlide?.media?.kind) kinds.push(String(rawSlide.media.kind).toLowerCase());
  for (const column of [rawSlide?.left, rawSlide?.right]) {
    const kind = column?.media?.kind;
    if (kind) kinds.push(String(kind).toLowerCase());
  }
  return kinds;
}

function hasMediaDemo(rawSlide) {
  return mediaKinds(rawSlide).some((kind) => ["image", "video", "iframe", "widget", "calculus_widget", "gallery"].includes(kind));
}

function hasInteractiveMedia(rawSlide) {
  return mediaKinds(rawSlide).some((kind) => ["iframe", "widget", "calculus_widget", "video"].includes(kind));
}

function hasVisualMedia(rawSlide) {
  return mediaKinds(rawSlide).some((kind) => ["image", "gallery", "video", "iframe", "widget", "calculus_widget"].includes(kind));
}

function mediaLabel(rawSlide) {
  if (rawSlide?.media) {
    const media = rawSlide.media;
    const label = plainTextForSpeech(media.caption || media.title || media.source || media.alt || media.widget || media.src || "");
    if (label) return label;
  }
  for (const column of [rawSlide?.left, rawSlide?.right]) {
    const media = column?.media;
    if (!media) continue;
    const label = plainTextForSpeech(media.caption || media.title || media.sourceSpec || media.source || media.alt || media.widget || media.src || "");
    if (label) return label;
  }
  return "";
}

function collectBulletTexts(rawSlide) {
  const items = [];
  for (const bullet of asArray(rawSlide?.bullets)) {
    items.push(plainTextForSpeech(typeof bullet === "string" ? bullet : bullet?.text));
  }
  for (const column of [rawSlide?.left, rawSlide?.right]) {
    for (const bullet of asArray(column?.bullets)) {
      items.push(plainTextForSpeech(typeof bullet === "string" ? bullet : bullet?.text));
    }
  }
  return items.filter(Boolean);
}

function blockTexts(blocks) {
  const items = [];
  for (const block of asArray(blocks)) {
    items.push(plainTextForSpeech(block.title || ""));
    items.push(plainTextForSpeech(block.text || block.content || block.formula || block.prompt || ""));
    for (const item of asArray(block.items)) items.push(plainTextForSpeech(item.text || item.say || ""));
    for (const step of asArray(block.steps)) items.push(plainTextForSpeech(step.text || step.say || ""));
    for (const pair of asArray(block.pairs)) items.push(plainTextForSpeech(`${pair.label || ""} ${pair.text || ""}`));
    if (block.reveal?.text) items.push(plainTextForSpeech(block.reveal.text));
    for (const row of asArray(block.rows)) {
      if (Array.isArray(row)) items.push(plainTextForSpeech(row.join(" ")));
    }
  }
  return items.filter(Boolean);
}

function collectParagraphTexts(rawSlide) {
  const items = [];
  for (const paragraph of asArray(rawSlide?.paragraphs)) {
    items.push(plainTextForSpeech(typeof paragraph === "string" ? paragraph : paragraph?.text));
  }
  for (const column of [rawSlide?.left, rawSlide?.right]) {
    for (const paragraph of asArray(column?.paragraphs)) {
      items.push(plainTextForSpeech(typeof paragraph === "string" ? paragraph : paragraph?.text));
    }
  }
  return items.filter(Boolean);
}

function collectContentTexts(rawSlide) {
  return uniqueStrings(
    collectBulletTexts(rawSlide),
    collectParagraphTexts(rawSlide),
    blockTexts(rawSlide?.blocks),
    blockTexts(rawSlide?.left?.blocks),
    blockTexts(rawSlide?.right?.blocks),
    rawSlide?.question ? [plainTextForSpeech(rawSlide.question)] : [],
    rawSlide?.explain ? [plainTextForSpeech(rawSlide.explain)] : [],
  );
}

function courseFamily(descriptor) {
  if (descriptor.school === "AU" || /^ARIAN_Calculus_/i.test(String(descriptor.course || ""))) return "calculus";
  return descriptor.school === "AC" ? "industrial_robotics" : "mobile_robotics";
}

function avatarProfileForDescriptor(descriptor) {
  return courseFamily(descriptor) === "calculus"
    ? "shared/arian.avatar.profile.json"
    : "shared/avatar.profile.json";
}

function referenceAssetsForDescriptor(descriptor) {
  return courseFamily(descriptor) === "calculus"
    ? "shared/arian.reference_assets.json"
    : "shared/reference_assets.json";
}

function isFirstVideoInCourse(descriptor) {
  return descriptor.school === "AU"
    && descriptor.course === "ARIAN_Calculus_1"
    && descriptor.session === "S01"
    && descriptor.topic === "01_review_of_functions_and_graphs";
}

function keySignals(rawSlide, slide, descriptor) {
  const title = rawTitle(rawSlide, slide);
  const key = normalizeKey(`${title} ${rawSlide?.hud || ""} ${rawSlide?.subtitle || ""}`);
  const topicKey = normalizeKey(descriptor.topic);
  return { title, key, topicKey };
}

function isLearningObjectiveSlide(rawSlide, slide) {
  const key = normalizeKey(`${rawTitle(rawSlide, slide)} ${rawSlide?.lead || ""}`);
  return /learning objectives?|objectives?|what you will learn|by the end/.test(key);
}

function inferSlideRole({ rawSlide, slide, descriptor, index, total }) {
  const { key, topicKey } = keySignals(rawSlide, slide, descriptor);
  if (index === 0 && slide.type === "title") return "intro";
  if (/today|route|agenda|roadmap|why do we learn|why this matters|five quick questions|lab intro|expectations/.test(key)) return "setup";
  if (/safety|warning|hazard|danger|lockout|unsafe|caution/.test(key) || topicKey.includes("safety")) return "caution";
  if (/summary|recap|checklist|one-slide memory|remember|takeaways|session .* checklist/.test(key)) {
    return /checklist|remember|memory/.test(key) || index >= total - 2 ? "exit_check" : "recap";
  }
  if (slide.type === "mcq" || /practice|quick practice|quiz|self-check|check your understanding|what would you choose|pick|decide|predict/.test(key)) {
    return index >= total - 2 ? "exit_check" : "practice";
  }
  if (
    / vs |versus|difference|trade-off|best at what|which is better|compare|comparison|common confusion|when .* enough|accuracy vs repeatability vs precision|reach vs workspace|open vs closed loop/.test(key)
    || (topicKey.includes("manipulator") && /(cartesian|cylindrical|spherical|scara|articulated|delta|type \d+)/.test(key))
  ) {
    return "comparison";
  }
  if (
    hasInteractiveMedia(rawSlide)
    || /interactive|demo|live tf tree|echo a specific transform|visualizing the robot|joint motion|slam|real robot demo/.test(key)
  ) {
    return "demo";
  }
  if (
    /intuition|mental model|workspace shapes|how to read|who is where|visualization pipeline/.test(key)
    || (slide.type === "two-col" && hasVisualMedia(rawSlide))
  ) {
    return "intuition";
  }
  if (
    /install|clone|build|step \d+|find |create |register |launch |guide|filesystem|terminal|dependencies|tools we need|dualboot|lab guide|project ideas/.test(key)
  ) {
    return /project ideas/.test(key) ? "practice" : "reference";
  }
  if (
    /what is|what it really means|definition|why .* uses it|why .* standard|= |degrees of freedom|dof|payload|tf2|xacro|urdf|links \+ joints|common joint types|components|data registers|branching instructions|nav2 overview/.test(key)
  ) {
    return "definition";
  }
  if (slide.type === "title") return "setup";
  if (index <= 2) return "setup";
  return "definition";
}

function inferImportance({ role, rawSlide, slide, descriptor, index, total }) {
  const { key } = keySignals(rawSlide, slide, descriptor);
  if (index === 0) return "high";
  if (/common confusion|quick practice|checklist|one-slide memory|who is where|mental model|what it really means/.test(key)) return "high";
  if (["comparison", "demo", "practice", "caution", "exit_check"].includes(role)) return "high";
  if (role === "definition" && index <= Math.floor(total / 2)) return "high";
  if (role === "reference" && /install|clone|register|step \d+|find /.test(key)) return "medium";
  if (role === "reference") return "low";
  if (role === "setup" && index <= 2) return "high";
  if (role === "recap") return "high";
  return "medium";
}

function inferTeacherStrategy(role) {
  if (role === "comparison") return "compare_then_summarize";
  if (role === "caution") return "cautionary_explanation";
  if (role === "practice") return "guided_practice";
  if (role === "recap" || role === "exit_check") return "recap_and_reinforce";
  if (role === "intuition" || role === "demo") return "intuitive_visual_explanation";
  return "define_then_example";
}

function inferVoiceStyle({ role, rawSlide, slide }) {
  if (role === "caution") return "serious_clear";
  if (role === "recap" || role === "exit_check") return "calm_recap";
  if (role === "comparison") return "compare_explain";
  if (role === "demo" || (role === "practice" && (hasInteractiveMedia(rawSlide) || slide.type === "mcq"))) return "energetic_demo";
  return "clear_teacher";
}

function inferAttentionMode({ role, rawSlide, slide }) {
  if (role === "demo") return "hybrid_focus";
  if (role === "intuition" && hasVisualMedia(rawSlide)) return "hybrid_focus";
  if (role === "comparison" && hasVisualMedia(rawSlide)) return "hybrid_focus";
  if (slide.type === "two-col" && hasVisualMedia(rawSlide)) return "hybrid_focus";
  return "slide_focus";
}

function sceneRuleForIndustrial(key) {
  if (/frame|coordinate|user frame|tool frame|world frame/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "preferred",
      scene_hint: "Bring a moving base, car, or robot frame on screen so the attached coordinate frame visibly moves with the object.",
      prop_suggestions: ["car", "coordinate frame", "robot arm"],
    };
  }
  if (/reach|workspace|cartesian|gantry|cylindrical|spherical|polar|scara|articulated|delta|manipulator/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "preferred",
      scene_hint: "Use a simplified robot silhouette and workspace volume so students can see how geometry shapes where the robot can work.",
      prop_suggestions: ["robot arm", "workspace volume", "robot silhouette"],
    };
  }
  if (/payload|gripper|tool|eoat|end effector/.test(key)) {
    return {
      scene_policy: "minimal",
      object_policy: "suggested",
      scene_hint: "Briefly show the tool, part, and mounting hardware together at the wrist so the full payload is visually obvious.",
      prop_suggestions: ["end effector", "part", "mounting bracket"],
    };
  }
  if (/sensor|photoelectric|inductive|capacitive|laser|beam|proximity/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "suggested",
      scene_hint: "Bring a sensor beam and part into the scene long enough to show what is actually being detected or missed.",
      prop_suggestions: ["sensor beam", "conveyor", "part"],
    };
  }
  return null;
}

function sceneRuleForMobile(key) {
  if (/tf|transform|frame|coordinate/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "preferred",
      scene_hint: "Use a TurtleBot or small car with attached coordinate frames so students can see relative transforms instead of imagining them abstractly.",
      prop_suggestions: ["TurtleBot", "car", "coordinate frame", "TF tree"],
    };
  }
  if (/urdf|xacro|link|joint/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "preferred",
      scene_hint: "Bring in a TurtleBot silhouette with links and joints highlighted so the robot description reads as structure, not just XML.",
      prop_suggestions: ["TurtleBot", "link labels", "joint markers"],
    };
  }
  if (/rviz|visualization|pipeline/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "suggested",
      scene_hint: "Show the robot model, TF, and RViz displays as a simple pipeline so students can connect each layer to the visual outcome.",
      prop_suggestions: ["TurtleBot", "RViz panel", "pipeline arrows"],
    };
  }
  if (/slam|map|lidar|laser|scan|nav2|planner|costmap/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "suggested",
      scene_hint: "Use a map, scan, and robot pose overlay so students can connect localization or planning state to what they see on screen.",
      prop_suggestions: ["map", "laser scan", "costmap", "planner path"],
    };
  }
  if (/launch|node|topic|pubsub/.test(key)) {
    return {
      scene_policy: "minimal",
      object_policy: "suggested",
      scene_hint: "Use a lightweight node-and-topic diagram only long enough to show the system relationships behind the command sequence.",
      prop_suggestions: ["launch graph", "node graph", "topic arrows"],
    };
  }
  return null;
}

function sceneRuleForCalculus(key) {
  if (/riemann|area|integral|washer|shell|volume|surface|arc length/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "suggested",
      scene_hint: "Use a graph with shaded area or sliced regions so students can see the accumulation before naming the formula.",
      prop_suggestions: ["function graph", "shaded area", "slicing controls"],
    };
  }
  if (/limit|continuity|approach|squeeze|asymptote/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "suggested",
      scene_hint: "Use a graph with moving x-values, one-sided approach markers, and a visible target value.",
      prop_suggestions: ["function graph", "approach markers", "parameter slider"],
    };
  }
  if (/derivative|rate|slope|tangent|linear approximation|newton/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "suggested",
      scene_hint: "Use a curve with a movable tangent/secant line so students can watch slope become a derivative.",
      prop_suggestions: ["curve", "tangent line", "secant line", "slope marker"],
    };
  }
  if (/series|sequence|taylor|maclaurin|power series/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "suggested",
      scene_hint: "Use partial sums or approximation curves so students can see convergence as something that changes step by step.",
      prop_suggestions: ["partial sums", "approximation curve", "term slider"],
    };
  }
  if (/vector|gradient|curl|divergence|line integral|surface integral|stokes|green/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "suggested",
      scene_hint: "Use a coordinate grid or vector field so the geometry stays visible while the notation is introduced.",
      prop_suggestions: ["vector field", "coordinate grid", "path marker"],
    };
  }
  if (/function|graph|transform|trigonometry|polar|parametric/.test(key)) {
    return {
      scene_policy: "hybrid",
      object_policy: "suggested",
      scene_hint: "Use a graph with parameters students can imagine sliding, then connect the visual change to the formula.",
      prop_suggestions: ["function graph", "parameter sliders", "highlighted point"],
    };
  }
  return null;
}

function inferSceneObjectPlan({ descriptor, role, rawSlide, slide, topicProfile }) {
  const { key } = keySignals(rawSlide, slide, descriptor);
  if (role === "caution") {
    return {
      scene_policy: "none",
      object_policy: "none",
      scene_hint: "",
      prop_suggestions: [],
    };
  }
  if (role === "reference" && /install|clone|build|step \d+|register/.test(key)) {
    return {
      scene_policy: "none",
      object_policy: "none",
      scene_hint: "",
      prop_suggestions: [],
    };
  }

  const family = courseFamily(descriptor);
  const matched = family === "industrial_robotics"
    ? sceneRuleForIndustrial(key)
    : family === "calculus"
      ? sceneRuleForCalculus(key)
      : sceneRuleForMobile(key);

  if (matched) return matched;

  if (role === "demo" || (role === "intuition" && hasVisualMedia(rawSlide))) {
    return {
      scene_policy: "hybrid",
      object_policy: topicProfile.object_policy_default || "suggested",
      scene_hint: "Use the visual or interactive asset on this slide as the main anchor, then return attention to the slide summary before moving on.",
      prop_suggestions: mediaLabel(rawSlide) ? [mediaLabel(rawSlide)] : [],
    };
  }

  return {
    scene_policy: topicProfile.scene_policy_default || "minimal",
    object_policy: topicProfile.object_policy_default || "none",
    scene_hint: "",
    prop_suggestions: [],
  };
}

function inferLikelyStudentConfusion({ descriptor, role, rawSlide, slide }) {
  const { key, title } = keySignals(rawSlide, slide, descriptor);
  if (/reach.*workspace|workspace.*reach/.test(key)) {
    return [
      "Students often use reach and workspace as if they mean the same thing.",
      "Students may treat the farthest point as if it describes the whole usable operating region.",
    ];
  }
  if (/payload/.test(key)) {
    return [
      "Students often count only the part and forget the tool, bracket, and cables.",
    ];
  }
  if (/accuracy.*repeatability|repeatability.*accuracy|precision/.test(key)) {
    return [
      "Students often collapse accuracy, repeatability, and precision into one vague idea.",
    ];
  }
  if (/dof|degrees of freedom/.test(key)) {
    return [
      "Students may count axes without connecting them to the practical freedom the robot gains.",
    ];
  }
  if (/open.*closed loop|feedback/.test(key)) {
    return [
      "Students often describe feedback correctly in words but still miss what disturbances do to open-loop behavior.",
    ];
  }
  if (/frame|coordinate|user frame|tool frame/.test(key)) {
    return [
      "Students often confuse a change in coordinate description with a physical motion of the robot.",
    ];
  }
  if (/urdf|xacro|link|joint/.test(key)) {
    return [
      "Students may think URDF, Xacro, links, and joints are just file syntax instead of a robot-structure model.",
    ];
  }
  if (/tf|transform|frame/.test(key) && descriptor.school === "UO") {
    return [
      "Students often hear transform vocabulary without forming a clear picture of one frame relative to another.",
    ];
  }
  if (/pubsub|publisher|subscriber|topic/.test(key)) {
    return [
      "Students may memorize ROS 2 terms without seeing the actual data-flow relationship between them.",
    ];
  }
  if (/slam|map|laser|scan/.test(key)) {
    return [
      "Students may watch the map update without understanding which signals are driving the update.",
    ];
  }
  if (role === "practice") {
    return [
      `Students may rush to the answer on ${title} without first stating the reasoning steps.`,
    ];
  }
  if (role === "reference") {
    return [
      "Students may copy steps mechanically and miss the verification point that tells them the step actually worked.",
    ];
  }
  return [];
}

function inferExplanationStyle({ role, rawSlide, slide, descriptor }) {
  const { title } = keySignals(rawSlide, slide, descriptor);
  const family = courseFamily(descriptor);
  if (role === "intro") {
    return `Frame ${title} as the question or capability the rest of the topic is going to answer.`;
  }
  if (role === "setup") {
    return `Use ${title} to orient students, preview the route, and tell them what to listen for next.`;
  }
  if (role === "definition") {
    if (family === "calculus") {
      return `Define ${title} in plain mathematical language, then connect the formula to a graph, example, or student prediction.`;
    }
    return `Define ${title} in plain technical language, then attach one practical robotics consequence or example.`;
  }
  if (role === "intuition") {
    return `Build a picture for ${title} first, then connect that picture back to the formal meaning students must remember.`;
  }
  if (role === "comparison") {
    return `Contrast the alternatives on ${title} explicitly, then end with the simplest decision rule students should keep.`;
  }
  if (role === "demo") {
    return `Teach through the visual or interactive material on ${title} by narrating what students should notice and why it matters.`;
  }
  if (role === "practice") {
    return `Turn ${title} into a guided decision: pause for thought, then reveal the reasoning step by step.`;
  }
  if (role === "recap") {
    return `Use ${title} to compress the lesson into memorable statements, not to reread the slide.`;
  }
  if (role === "exit_check") {
    return `Use ${title} as a final self-check so students leave knowing what they should now be able to explain or do.`;
  }
  if (role === "caution") {
    if (family === "calculus") {
      return `Explain ${title} as a common mathematical trap: name the mistake, show why it happens, and give the safer reasoning habit.`;
    }
    return `Explain ${title} like an operating warning: state the risk, the consequence, and the safe rule.`;
  }
  if (family === "calculus") {
    return `Keep ${title} focused on the visual pattern, the formula, and the reasoning step students can reuse.`;
  }
  return `Keep ${title} efficient and procedural, highlighting only the information students need to act or debug correctly.`;
}

function inferStoryHint({ descriptor, role, rawSlide, slide }) {
  const { key, title } = keySignals(rawSlide, slide, descriptor);
  const family = courseFamily(descriptor);
  if (family === "industrial_robotics") {
    if (role === "comparison" || /manipulator|workspace|payload|sensor/.test(key)) {
      return "Tell it like a real robot-cell decision where the team must justify a choice with specifications and task constraints.";
    }
    if (role === "practice") {
      return "Tell students to imagine they are reviewing a robot cell or lab task and need to defend their answer to a teammate.";
    }
    if (role === "caution") {
      return "Use a believable lab or shop-floor mistake rather than abstract warning language.";
    }
    return `Keep ${title} connected to what an industrial robotics student would actually need in lab or robot selection.`;
  }

  if (family === "calculus") {
    if (role === "practice") {
      return "Tell it like a student prediction moment: pause, make the reasoning visible, then reveal the answer.";
    }
    if (/graph|function|limit|derivative|integral|series|vector/.test(key)) {
      return "Tell it through the object students can see first: a graph, curve, area, slope, sequence, or vector field.";
    }
    return `Keep ${title} connected to a mathematical question students can answer with a graph, formula, or short calculation.`;
  }

  if (/tf|frame|transform|urdf|xacro|rviz/.test(key)) {
    return "Tell it like a debugging moment where the robot is not showing up correctly and students need the right mental model to fix it.";
  }
  if (role === "practice" || role === "reference") {
    return "Frame the slide as a lab workflow students will run themselves, including what they should verify before moving on.";
  }
  return `Keep ${title} connected to the lab workflow students will use later in ROS 2 and mobile robotics.`;
}

function inferDeliveryGoal({ role, rawSlide, slide, descriptor, topicProfile }) {
  const { title } = keySignals(rawSlide, slide, descriptor);
  const cleanTopicGoal = String(topicProfile.topic_goal || "").replace(/[.?!]\s*$/, "");
  if (role === "intro" || role === "setup") {
    return `Students should understand how ${title} sets up the lesson and why the topic matters.`;
  }
  if (role === "definition") {
    return `Students should be able to explain ${title} accurately and use it in the next step of the lesson.`;
  }
  if (role === "intuition") {
    return `Students should be able to picture ${title} clearly before the formal details continue.`;
  }
  if (role === "comparison") {
    return `Students should clearly remember the contrast at the center of ${title} and know which side fits which situation.`;
  }
  if (role === "demo") {
    return `Students should understand what to watch for on ${title} and why that visible behavior matters technically.`;
  }
  if (role === "practice") {
    return `Students should be able to answer a similar ${title} question on their own and explain the reasoning.`;
  }
  if (role === "recap" || role === "exit_check") {
    return `Students should leave ${title} with the main takeaways of the topic compressed into usable memory.`;
  }
  if (role === "caution") {
    return `Students should feel the practical consequence of getting ${title} wrong and remember the safe rule.`;
  }
  if (role === "reference") {
    return `Students should know the minimum reliable workflow on ${title} and what to verify before moving on.`;
  }
  return `Students should be able to explain the main idea of ${title} clearly and connect it to ${cleanTopicGoal}.`;
}

function baselineNarrationSeed({ descriptor, rawSlide, slide, role, topicProfile, explanationStyle }) {
  const title = rawTitle(rawSlide, slide);
  const notesSeed = trimNarrationSeed(rawSlide?.notes?.narration_seed || rawSlide?.narration_seed || rawSlide?.teacher_notes || rawSlide?.notes);
  if (notesSeed) return notesSeed;
  const family = courseFamily(descriptor);

  if (role === "intro") {
    if (family === "calculus") {
      const identityBeat = isFirstVideoInCourse(descriptor)
        ? "introduce the instructor once as Arian from Arian University"
        : "use a brief welcome-back line without reintroducing the full channel identity";
      return `Open ${title} with a short mathematical hook, ${identityBeat}, and place this topic inside the Calculus course before moving to objectives.`;
    }
    return `Open ${title} by framing the big question of the topic, why it matters in ${descriptor.school === "AC" ? "robotics practice" : "the ROS 2 lab workflow"}, and what students should be able to do by the end.`;
  }
  if (role === "setup") {
    if (family === "calculus" && isLearningObjectiveSlide(rawSlide, slide)) {
      return `Use ${title} to point first to the course roadmap or progress visual, name the current session and nearby session or topic context, then explain what this topic covers through the learning objectives.`;
    }
    return `Use ${title} to preview the route of the lesson, explain how this section fits the overall teaching arc, and tell students what to listen for next.`;
  }
  if (role === "definition") {
    if (family === "calculus") {
      return `Define ${title} in plain language, connect it to the notation, and show how the idea appears on a graph or in a small example.`;
    }
    return `Define ${title} in plain language, then connect the term to one practical robotics consequence so students do not memorize it in isolation.`;
  }
  if (role === "intuition") {
    return `Build intuition for ${title} using the visual or mental model first, then connect that picture back to the exact technical idea students need.`;
  }
  if (role === "comparison") {
    return `Compare the alternatives or concepts on ${title} clearly, emphasize the trade-off, and end with the decision rule students should remember.`;
  }
  if (role === "demo") {
    return `Teach ${title} through the visual or interactive material, narrating what students should notice, why it matters, and how it connects to the topic goal.`;
  }
  if (role === "practice") {
    return `Turn ${title} into a short guided practice moment: let students think first, then explain the reasoning in a teacher-like way.`;
  }
  if (role === "recap") {
    return `Use ${title} to reinforce the main takeaways of the topic and help students compress the lesson into a few memorable ideas.`;
  }
  if (role === "exit_check") {
    return `Use ${title} as a final self-check so students can tell whether they now understand the core ideas of the topic.`;
  }
  if (role === "caution") {
    if (family === "calculus") {
      return `Treat ${title} as a common reasoning trap: explain the tempting mistake, why it fails, and the safer mathematical habit students should use.`;
    }
    return `Treat ${title} as a practical caution: explain the risk, what students often underestimate, and the safe operating rule they should remember.`;
  }
  return `${explanationStyle} Keep the pacing efficient and procedural rather than reading the slide word for word.`;
}

function limitItems(items, count = 4) {
  return uniqueStrings(items).slice(0, count);
}

function baselineMustCover({ role, rawSlide, topicProfile }) {
  const content = collectContentTexts(rawSlide);
  const items = [];
  if (role === "setup" && isLearningObjectiveSlide(rawSlide, {})) {
    items.push("Point to the course roadmap/progress visual before reading or summarizing the learning objectives.");
    items.push("Use session-level course framing; do not say topic X of Y in spoken roadmap narration.");
    items.push("Name where this topic sits in the course and what this topic covers.");
  }
  items.push(...content.slice(0, role === "reference" ? 4 : 3));

  if (role === "comparison") {
    items.push("State the contrast clearly and finish with the practical decision rule.");
  }
  if (role === "demo") {
    items.push("Tell students exactly what to watch for in the visual or interactive material.");
  }
  if (role === "practice") {
    items.push("Give students a moment to decide before explaining the answer.");
  }
  if (role === "recap" || role === "exit_check") {
    items.push(...asArray(topicProfile.topic_takeaways).slice(0, 2));
  }
  if (role === "caution") {
    items.push("State the consequence of getting this wrong, then give the clear safe rule.");
  }

  return limitItems(items, role === "reference" ? 5 : 4);
}

function baselineMustSay({ descriptor, rawSlide, slide, role }) {
  const { key } = keySignals(rawSlide, slide, descriptor);
  if (courseFamily(descriptor) === "calculus" && role === "intro") {
    return isFirstVideoInCourse(descriptor)
      ? ["Hi, I'm Arian, and welcome to Arian University."]
      : ["Welcome back to Arian University."];
  }
  if (/reach.*workspace|workspace.*reach/.test(key)) {
    return ["Reach is one maximum distance. Workspace is the full usable region."];
  }
  if (/payload/.test(key)) {
    return ["Payload is everything the robot wrist has to carry, not just the part."];
  }
  if (/accuracy.*repeatability|repeatability.*accuracy|precision/.test(key)) {
    return ["Repeatability is consistency. Accuracy is closeness to the intended target."];
  }
  if (/open.*closed loop|feedback/.test(key)) {
    return ["Closed-loop control can correct itself because it measures what actually happened."];
  }
  if (/tf2|transform/.test(key) && descriptor.school === "UO") {
    return ["TF2 keeps track of where one frame is relative to another frame over time."];
  }
  if (/urdf|links \+ joints/.test(key)) {
    return ["Links are rigid bodies, and joints define how those bodies connect or move."];
  }
  if (/xacro/.test(key)) {
    return ["Xacro helps us generate robot descriptions cleanly instead of copying large URDF blocks by hand."];
  }
  if (role === "caution") {
    return ["Do not treat this as optional; treat it as an operating rule."];
  }
  return [];
}

function inferEmphasisWords({ descriptor, rawSlide, slide }) {
  const { key } = keySignals(rawSlide, slide, descriptor);
  if (/reach.*workspace|workspace.*reach/.test(key)) return ["reach", "workspace", "usable region"];
  if (/payload/.test(key)) return ["payload", "tool", "part"];
  if (/accuracy.*repeatability|repeatability.*accuracy|precision/.test(key)) return ["accuracy", "repeatability", "precision"];
  if (/tf2|transform/.test(key)) return ["frame", "relative", "transform"];
  if (/urdf|xacro|link|joint/.test(key)) return ["URDF", "link", "joint"];
  if (/open.*closed loop|feedback/.test(key)) return ["feedback", "disturbance", "correction"];
  return [];
}

function inferAvatarHint({ role, attentionMode }) {
  if (role === "intro") {
    return { preferred_behavior: "face_viewer", preferred_anchor: "right_bottom" };
  }
  if (role === "recap" || role === "exit_check") {
    return { preferred_behavior: "face_viewer", preferred_anchor: "center_bottom" };
  }
  if (role === "comparison") {
    return { preferred_behavior: "explain_open_hand", preferred_anchor: "right_bottom" };
  }
  if (role === "demo" || attentionMode === "hybrid_focus") {
    return { preferred_behavior: "point_left_mid", preferred_anchor: "right_bottom" };
  }
  if (role === "caution") {
    return { preferred_behavior: "face_viewer", preferred_anchor: "right_bottom" };
  }
  return { preferred_behavior: "idle_talk", preferred_anchor: "right_bottom" };
}

function transitionFromPrevious({ index, slideInfo, previousInfo, topicProfile }) {
  if (index === 0) {
    return `Open by framing the topic goal: ${topicProfile.topic_goal}`;
  }
  if (!previousInfo) {
    return `Bridge into ${slideInfo.title} using the lesson flow: ${topicProfile.transition_style}`;
  }
  if (slideInfo.role === "comparison") {
    return `Move from ${previousInfo.title} into a direct contrast so students can see the trade-off rather than treating the ideas separately.`;
  }
  if (slideInfo.role === "demo") {
    return `Shift from explanation into a visual or interactive view of ${slideInfo.title} so students can watch the concept, not just hear it.`;
  }
  if (slideInfo.role === "practice") {
    return `Turn the previous explanation into a decision on ${slideInfo.title} and let students test whether they can reason with the idea.`;
  }
  if (slideInfo.role === "recap" || slideInfo.role === "exit_check") {
    return `Use ${slideInfo.title} to consolidate what the last few slides have built up and turn it into memory.`;
  }
  if (slideInfo.role === "reference") {
    return `After the concept slide, move into the concrete workflow or command sequence students will actually run.`;
  }
  if (slideInfo.role === "definition") {
    return `Use ${slideInfo.title} to introduce the next key term students need before the lesson can move forward.`;
  }
  if (slideInfo.role === "intuition") {
    return `Pause the formal explanation and build a picture students can carry into the next technical slide.`;
  }
  return `Bridge from ${previousInfo.title} into ${slideInfo.title} so the lesson feels like one continuous explanation rather than isolated slides.`;
}

function transitionToNext({ index, slideInfo, nextInfo, topicProfile }) {
  if (!nextInfo) {
    return `Close by restating the destination of the topic: ${topicProfile.teaching_arc.destination}`;
  }
  if (slideInfo.role === "comparison") {
    return `Use the next slide to show the consequence of this contrast in a more concrete example or visual.`;
  }
  if (slideInfo.role === "definition") {
    return `Once ${slideInfo.title} is clear, use the next slide to apply or test the term instead of leaving it abstract.`;
  }
  if (slideInfo.role === "demo") {
    return `After the visual explanation, step back out and explain the decision rule or takeaway students should keep.`;
  }
  if (slideInfo.role === "practice") {
    return `Use the next slide to generalize the reasoning students just practiced.`;
  }
  if (slideInfo.role === "reference") {
    return `After the procedure, remind students what successful output or behavior they should expect next.`;
  }
  if (nextInfo.role === "recap" || nextInfo.role === "exit_check") {
    return `The next slide should compress the lesson into a quick memory or self-check.`;
  }
  return `Carry this idea forward into ${nextInfo.title} so students feel the lesson progressing intentionally toward the topic goal.`;
}

function applySlideOverride(slidePlan, override) {
  if (!override) return slidePlan;
  return {
    ...slidePlan,
    ...override,
    avatar_hint: {
      ...(slidePlan.avatar_hint || {}),
      ...(override.avatar_hint || {}),
    },
    must_cover: uniqueStrings(slidePlan.must_cover, override.must_cover),
    must_say: uniqueStrings(slidePlan.must_say, override.must_say),
    emphasis_words: uniqueStrings(slidePlan.emphasis_words, override.emphasis_words),
    prop_suggestions: uniqueStrings(slidePlan.prop_suggestions, override.prop_suggestions),
    likely_student_confusion: uniqueStrings(slidePlan.likely_student_confusion, override.likely_student_confusion),
  };
}

function buildSlidePlan({ descriptor, rawSlide, slide, index, total, topicProfile }) {
  const role = inferSlideRole({ rawSlide, slide, descriptor, index, total });
  const importance = inferImportance({ role, rawSlide, slide, descriptor, index, total });
  const voiceStyle = inferVoiceStyle({ role, rawSlide, slide });
  const preset = VOICE_STYLE_PRESETS[voiceStyle] || VOICE_STYLE_PRESETS.clear_teacher;
  const attentionMode = inferAttentionMode({ role, rawSlide, slide });
  const scenePlan = inferSceneObjectPlan({ descriptor, role, rawSlide, slide, topicProfile });
  const explanationStyle = inferExplanationStyle({ role, rawSlide, slide, descriptor });
  const deliveryGoal = inferDeliveryGoal({ role, rawSlide, slide, descriptor, topicProfile });
  const slidePlan = {
    slide_ref: {
      index,
      source_title: rawTitle(rawSlide, slide),
    },
    slide_role: role,
    importance,
    narration_seed: baselineNarrationSeed({ descriptor, rawSlide, slide, role, topicProfile, explanationStyle }),
    voice_style: voiceStyle,
    tone: preset.tone,
    energy: preset.energy,
    pace: preset.pace,
    attention_mode: attentionMode,
    scene_policy: scenePlan.scene_policy,
    object_policy: scenePlan.object_policy,
    must_cover: baselineMustCover({ role, rawSlide, topicProfile }),
    must_say: baselineMustSay({ descriptor, rawSlide, slide, role }),
    emphasis_words: inferEmphasisWords({ descriptor, rawSlide, slide }),
    transition_from_previous: "",
    transition_to_next: "",
    likely_student_confusion: inferLikelyStudentConfusion({ descriptor, role, rawSlide, slide }),
    teacher_strategy: inferTeacherStrategy(role),
    avatar_hint: inferAvatarHint({ role, attentionMode }),
    prop_suggestions: scenePlan.prop_suggestions,
    explanation_style: explanationStyle,
    story_hint: inferStoryHint({ descriptor, role, rawSlide, slide }),
    delivery_goal: deliveryGoal,
  };
  if (scenePlan.scene_hint) {
    slidePlan.scene_hint = scenePlan.scene_hint;
  }
  return applySlideOverride(slidePlan, getTopicSlideOverride(topicProfile.topic_id, slidePlan.slide_ref.source_title));
}

export function generateBaselineLecturePlan({
  descriptor,
  runtime,
  slidesData,
}) {
  const pedagogy = {
    topic_id: runtime.topicId,
    ...buildTopicPedagogyProfile(descriptor),
  };

  const roughSlides = runtime.slides.map((slide, index) => buildSlidePlan({
    descriptor,
    rawSlide: slidesData[index] || {},
    slide,
    index,
    total: runtime.slides.length,
    topicProfile: pedagogy,
  }));

  const slides = roughSlides.map((slidePlan, index) => {
    const previousInfo = index > 0 ? roughSlides[index - 1] : null;
    const nextInfo = index + 1 < roughSlides.length ? roughSlides[index + 1] : null;
    return {
      ...slidePlan,
      transition_from_previous: slidePlan.transition_from_previous || transitionFromPrevious({
        index,
        slideInfo: { title: slidePlan.slide_ref.source_title, role: slidePlan.slide_role },
        previousInfo: previousInfo ? { title: previousInfo.slide_ref.source_title, role: previousInfo.slide_role } : null,
        topicProfile: pedagogy,
      }),
      transition_to_next: slidePlan.transition_to_next || transitionToNext({
        index,
        slideInfo: { title: slidePlan.slide_ref.source_title, role: slidePlan.slide_role },
        nextInfo: nextInfo ? { title: nextInfo.slide_ref.source_title, role: nextInfo.slide_role } : null,
        topicProfile: pedagogy,
      }),
    };
  });

  return {
    schema_version: LECTURE_PLAN_SCHEMA_VERSION,
    topic_id: runtime.topicId,
    avatar_profile: avatarProfileForDescriptor(descriptor),
    reference_assets: referenceAssetsForDescriptor(descriptor),
    teaching_arc: pedagogy.teaching_arc,
    audience_level: pedagogy.audience_level,
    topic_goal: pedagogy.topic_goal,
    topic_takeaways: pedagogy.topic_takeaways,
    style_notes: pedagogy.style_notes,
    transition_style: pedagogy.transition_style,
    scene_policy_default: pedagogy.scene_policy_default,
    object_policy_default: pedagogy.object_policy_default,
    topic_defaults: {
      voice_style: "clear_teacher",
      tone: "clear_teacher",
      energy: 0.58,
      pace: 0.96,
      attention_mode: "slide_focus",
      scene_policy: pedagogy.scene_policy_default || "minimal",
      avatar_anchor: "right_bottom",
      autoplay: false,
      ...(pedagogy.topic_defaults || {}),
    },
    slides,
  };
}

function planRefKey(slidePlan = {}) {
  const ref = slidePlan.slide_ref || {};
  if (ref.slide_id) return `slide_id:${ref.slide_id}`;
  if (Number.isInteger(ref.index)) return `index:${ref.index}`;
  if (ref.source_title) return `title:${normalizeKey(ref.source_title)}`;
  return "";
}

function mergeTopicDefaults(existingDefaults = {}, baselineDefaults = {}) {
  return {
    ...baselineDefaults,
    ...existingDefaults,
  };
}

function looksGenericNarrationSeed(value) {
  const text = String(value || "").trim();
  if (!text) return true;
  return GENERIC_NARRATION_SEED_PATTERNS.some((pattern) => pattern.test(text));
}

function looksGenericDeliveryGoal(value) {
  const text = String(value || "").trim();
  if (!text) return true;
  return /^Students should be able to explain the main idea of .* clearly and connect it to /i.test(text);
}

function mergeStringList(existingValue, baselineValue) {
  return uniqueStrings(baselineValue, existingValue);
}

function mergeTeachingArc(existingArc = {}, baselineArc = {}) {
  return {
    ...baselineArc,
    ...(isObject(existingArc) ? existingArc : {}),
    methods: mergeStringList(existingArc?.methods, baselineArc?.methods),
  };
}

function mergeSlidePlan(existingSlide = {}, baselineSlide = {}) {
  const merged = {
    ...baselineSlide,
    ...existingSlide,
    slide_ref: {
      ...(baselineSlide.slide_ref || {}),
      ...(existingSlide.slide_ref || {}),
    },
    avatar_hint: {
      ...(baselineSlide.avatar_hint || {}),
      ...(existingSlide.avatar_hint || {}),
    },
    must_cover: mergeStringList(existingSlide.must_cover, baselineSlide.must_cover),
    must_say: mergeStringList(existingSlide.must_say, baselineSlide.must_say),
    emphasis_words: mergeStringList(existingSlide.emphasis_words, baselineSlide.emphasis_words),
    prop_suggestions: mergeStringList(existingSlide.prop_suggestions, baselineSlide.prop_suggestions),
    likely_student_confusion: mergeStringList(existingSlide.likely_student_confusion, baselineSlide.likely_student_confusion),
  };

  if (looksGenericNarrationSeed(existingSlide.narration_seed)) {
    merged.narration_seed = baselineSlide.narration_seed;
  }
  if (looksGenericDeliveryGoal(existingSlide.delivery_goal)) {
    merged.delivery_goal = baselineSlide.delivery_goal;
  }
  if (!merged.scene_hint) {
    delete merged.scene_hint;
  }
  if (!merged.story_hint) {
    delete merged.story_hint;
  }

  return merged;
}

function mergeLecturePlans(existingPlan, baselinePlan) {
  if (!existingPlan) return baselinePlan;

  const existingByKey = new Map();
  for (const slide of asArray(existingPlan.slides)) {
    const key = planRefKey(slide);
    if (key) existingByKey.set(key, slide);
  }

  const slides = baselinePlan.slides.map((baselineSlide) => {
    const candidates = [
      planRefKey(baselineSlide),
      baselineSlide.slide_ref?.source_title ? `title:${normalizeKey(baselineSlide.slide_ref.source_title)}` : "",
    ].filter(Boolean);
    const existingSlide = candidates.map((key) => existingByKey.get(key)).find(Boolean) || null;
    return mergeSlidePlan(existingSlide || {}, baselineSlide);
  });

  return {
    ...baselinePlan,
    ...existingPlan,
    schema_version: LECTURE_PLAN_SCHEMA_VERSION,
    teaching_arc: mergeTeachingArc(existingPlan.teaching_arc, baselinePlan.teaching_arc),
    audience_level: String(existingPlan.audience_level || baselinePlan.audience_level || "").trim(),
    topic_goal: String(existingPlan.topic_goal || baselinePlan.topic_goal || "").trim(),
    topic_takeaways: mergeStringList(existingPlan.topic_takeaways, baselinePlan.topic_takeaways),
    style_notes: mergeStringList(existingPlan.style_notes, baselinePlan.style_notes),
    transition_style: String(existingPlan.transition_style || baselinePlan.transition_style || "").trim(),
    scene_policy_default: String(existingPlan.scene_policy_default || baselinePlan.scene_policy_default || "minimal").trim(),
    object_policy_default: String(existingPlan.object_policy_default || baselinePlan.object_policy_default || "none").trim(),
    topic_defaults: mergeTopicDefaults(existingPlan.topic_defaults, baselinePlan.topic_defaults),
    slides,
  };
}

export async function ensureLecturePlanFile(descriptor, options = {}) {
  const lecturePlanPath = descriptor.filePath.replace(/\.slides\.js$/, ".lecture.plan.json");
  const existing = await stat(lecturePlanPath).catch(() => null);
  const existingPlan = existing
    ? JSON.parse(await readFile(lecturePlanPath, "utf8"))
    : null;

  const { slidesData, topicMeta } = await loadTopicModule(descriptor);
  const runtime = buildTopicRuntime({
    topicMeta,
    slidesData,
    topicFallback: descriptor.topic,
  });
  const plan = generateBaselineLecturePlan({
    descriptor,
    runtime,
    slidesData,
  });
  const mergedPlan = options.force
    ? plan
    : mergeLecturePlans(existingPlan, plan);
  const nextJson = `${JSON.stringify(mergedPlan, null, 2)}\n`;
  const previousJson = existingPlan ? `${JSON.stringify(existingPlan, null, 2)}\n` : "";

  if (nextJson !== previousJson) {
    await writeFile(lecturePlanPath, nextJson, "utf8");
  }
  return {
    path: relativeContractPath(lecturePlanPath),
    plan: mergedPlan,
    reused: existing && nextJson === previousJson,
  };
}

export function defaultLecturePlanPath(descriptor) {
  return relativeContractPath(path.resolve(projectRoot, descriptor.filePath.replace(/\.slides\.js$/, ".lecture.plan.json")));
}
