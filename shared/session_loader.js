// shared/session_loader.js
// Dynamically loads the correct *.slides.js module based on URL:
//   session.html?school=AC&course=ROB9205_Industrial_Robots_W2026&session=S01&topic=01_course_intro_and_expectations

import {
  getCourseConfig,
  getSchoolConfig,
} from "./course_catalog.js";
import {
  buildLessonIndex,
  formatLessonLabel,
  getCourseTerminology,
} from "./course_labels.js";
import { adaptCalculusMaterialToDeck } from "./calculus_material_adapter.js";
import { materialSlugFromTopicId } from "./topic_naming.js";

export async function bootSession({ initDeck }) {
  const params = new URLSearchParams(window.location.search);

  const school = params.get("school") || "AC"; // "AC", "UO", or "AU"
  const course = params.get("course") || "";
  const session = params.get("session") || "";
  const topic = params.get("topic") || "";
  const analysisMode = params.get("analysis") === "1";
  const debugOverlay = params.get("debug") === "1";
  const initialSlide = params.get("slide") || null;

  const hudLabel = document.getElementById("hudLabel");
  const slidesRoot = document.getElementById("slidesRoot");

  // Small helper to show an error nicely
  function showError(msg) {
    if (hudLabel) hudLabel.textContent = "Error loading topic";
    if (slidesRoot) {
      slidesRoot.innerHTML = "";

      const wrapper = document.createElement("div");
      wrapper.style.padding = "32px";
      wrapper.style.fontSize = "18px";
      wrapper.style.lineHeight = "1.5";

      const title = document.createElement("strong");
      title.textContent = msg;
      wrapper.appendChild(title);
      wrapper.appendChild(document.createElement("br"));
      wrapper.appendChild(document.createElement("br"));

      const label = document.createElement("div");
      label.textContent = "URL parameters:";
      wrapper.appendChild(label);

      [
        `school=${school}`,
        `course=${course}`,
        `session=${session}`,
        `topic=${topic}`,
      ].forEach((entry) => {
        const code = document.createElement("code");
        code.textContent = entry;
        wrapper.appendChild(code);
        wrapper.appendChild(document.createElement("br"));
      });

      slidesRoot.appendChild(wrapper);
    }
  }

  // 1) Ensure we have all required query params
  if (!course || !session || !topic) {
    showError("Missing school / course / session / topic in URL.");
    return;
  }

  const schoolCfg = getSchoolConfig(school);
  const courseCfg = getCourseConfig(course) || {};

  // Matches the authored deck structure:
  // /courses/AU/ARIAN_Calculus_1/sessions/S01/01_review_of_functions_and_graphs.slides.js
  const modulePath =
    `/courses/${encodeURIComponent(school)}/` +
    `${encodeURIComponent(course)}/` +
    `sessions/${encodeURIComponent(session)}/` +
    `${encodeURIComponent(topic)}.slides.js`;

  function initLoadedSlides({ slidesData, topicMeta, runtimeCfg }) {
    const hudDefault =
      (topicMeta && topicMeta.hudDefault) || runtimeCfg.defaultHud;

    const hudPrefix = (topicMeta && topicMeta.hudPrefix) || runtimeCfg.hudPrefix;

    const email = (topicMeta && topicMeta.email) || runtimeCfg.email;

    const logoSrc =
      topicMeta && topicMeta.logoSrc != null
        ? topicMeta.logoSrc
        : runtimeCfg.logoSrc;

    if (hudLabel) {
      const terminology = getCourseTerminology(courseCfg);
      const lessonIndex = buildLessonIndex(courseCfg || {});
      const globalNumber = lessonIndex.get(`${session}:${topic}`);
      const catalogTopic = courseCfg?.sessions
        ?.find((item) => item.id === session)
        ?.topics
        ?.find((item) => item.id === topic);
      const lessonTitle = catalogTopic
        ? formatLessonLabel(globalNumber, catalogTopic, terminology)
        : topic.replace(/_/g, " ");
      hudLabel.textContent = (topicMeta && topicMeta.title)
        ? (globalNumber
          ? `${terminology.lesson} ${globalNumber} — ${topicMeta.title}`
          : topicMeta.title)
        : lessonTitle;
    }

    return initDeck({
      slidesData,
      topicMeta,
      topicId: topicMeta?.id || topic,
      descriptor: {
        school,
        course,
        session,
        topic,
      },
      hudDefault,
      hudPrefix,
      email,
      homeHref: `sessions.html?school=${encodeURIComponent(school)}&course=${encodeURIComponent(course)}`,
      homeIconSrc: topicMeta?.homeIconSrc || runtimeCfg.homeIconSrc || "",
      homeIconDarkSrc: topicMeta?.homeIconDarkSrc || runtimeCfg.homeIconDarkSrc || "",
      footerLogoSrc: topicMeta?.footerLogoSrc || runtimeCfg.footerLogoSrc || logoSrc || "",
      ttsEnabled: false,
      theme: runtimeCfg.theme || (school === "UO" ? "uo" : "ac"),
      analysisMode,
      debugOverlay,
      initialSlide,
    });
  }

  async function loadCalculusMaterialTopic() {
    const materialRoot = courseCfg.materialRoot || "/courses/Calculus/Materials";
    const materialSlug = materialSlugFromTopicId(topic);
    const materialPath = `${materialRoot.replace(/\/+$/, "")}/${encodeURIComponent(materialSlug)}.json`;
    const response = await fetch(materialPath);
    if (!response.ok) {
      throw new Error(`Could not fetch calculus material ${materialPath}: HTTP ${response.status}`);
    }
    const material = await response.json();
    return adaptCalculusMaterialToDeck(material, {
      school,
      schoolName: schoolCfg.displayName || "Arian University",
      course,
      courseTitle: courseCfg.title || courseCfg.displayName || "Calculus",
      session,
      topic,
      topicTitle: courseCfg.sessions
        ?.find((item) => item.id === session)
        ?.topics
        ?.find((item) => item.id === topic)
        ?.title,
    });
  }

  if (courseCfg.sourceKind === "calculus_material_json") {
    try {
      const mod = await import(modulePath);
      const slidesData = mod.default || [];
      const topicMeta = mod.topicMeta || null;
      if (slidesData.length) {
        return initLoadedSlides({
          slidesData,
          topicMeta,
          runtimeCfg: {
            ...schoolCfg,
            ...courseCfg,
          },
        });
      }
    } catch {
      // No finalized authored deck yet; fall back to adapting the material JSON.
    }

    try {
      const { slidesData, topicMeta } = await loadCalculusMaterialTopic();
      return initDeck({
        slidesData,
        topicMeta,
        topicId: topicMeta?.id || topic,
        descriptor: {
          school,
          course,
          session,
          topic,
        },
        hudDefault: topicMeta?.hudDefault || courseCfg.defaultHud || schoolCfg.defaultHud,
        hudPrefix: topicMeta?.hudPrefix || schoolCfg.hudPrefix,
        email: topicMeta?.email || schoolCfg.email,
        homeHref: `sessions.html?school=${encodeURIComponent(school)}&course=${encodeURIComponent(course)}`,
        homeIconSrc: courseCfg.homeIconSrc || schoolCfg.homeIconSrc || "",
        homeIconDarkSrc: courseCfg.homeIconDarkSrc || schoolCfg.homeIconDarkSrc || "",
        footerLogoSrc: courseCfg.footerLogoSrc || topicMeta?.footerLogoSrc || schoolCfg.footerLogoSrc || "",
        ttsEnabled: false,
        theme: schoolCfg.theme || "ac",
        analysisMode,
        debugOverlay,
        initialSlide,
      });
    } catch (err) {
      console.error("Failed to load calculus material topic:", err);
      showError("Could not load the calculus material JSON. Check console for details.");
      return null;
    }
  }

  try {
    // 3) Dynamically import the slides module
    const mod = await import(modulePath);

    const slidesData = mod.default || [];
    const topicMeta = mod.topicMeta || null;

    if (!slidesData.length) {
      showError("Slides loaded, but list is empty.");
      return;
    }

    return initLoadedSlides({
      slidesData,
      topicMeta,
      runtimeCfg: {
        ...schoolCfg,
        ...courseCfg,
      },
    });
  } catch (err) {
    console.error("Failed to import slide module:", modulePath, err);
    showError("Could not load the slide module. Check console for details.");
    return null;
  }
}
