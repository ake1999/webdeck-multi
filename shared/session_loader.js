// shared/session_loader.js
// Dynamically loads the correct *.slides.js module based on URL:
//   session.html?school=AC&course=ROB9205_Industrial_Robots_W2026&session=S01&topic=01_course_intro_and_expectations

const SCHOOL_CONFIG = {
  AC: {
    email: "karimza@algonquincollege.com",
    defaultHud: "ROB9205 — INDUSTRIAL ROBOTS",
    hudPrefix: "Algonquin • ",
    logoSrc: "/shared/media/ac-footer.png",
  },
  UO: {
    email: "Ali.Karimzade@uOttawa.ca",
    defaultHud: "MCG 5138 — AUTONOMOUS MOBILE ROBOTS",
    hudPrefix: "uOttawa • ",
    logoSrc: "/shared/media/uo-footer.png",
  },
};

export async function bootSession({ initDeck }) {
  const params = new URLSearchParams(window.location.search);

  const school = params.get("school") || "AC"; // "AC" or "UO"
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

  // 2) Compute module path for the topic slides
  //    Matches your current structure:
  //    /courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S01/01_course_intro_and_expectations.slides.js
  //    /courses/UO/MCG5138_Autonomous_Mobile_Robots_W2026/sessions/S01/01_mobile_robotics_lab_intro_and_expectations.slides.js
  const modulePath =
    `/courses/${encodeURIComponent(school)}/` +
    `${encodeURIComponent(course)}/` +
    `sessions/${encodeURIComponent(session)}/` +
    `${encodeURIComponent(topic)}.slides.js`;

  try {
    // 3) Dynamically import the slides module
    const mod = await import(modulePath);

    const slidesData = mod.default || [];
    const topicMeta = mod.topicMeta || null;

    if (!slidesData.length) {
      showError("Slides loaded, but list is empty.");
      return;
    }

    // 4) Decide theme based on school
    const schoolCfg = SCHOOL_CONFIG[school] || SCHOOL_CONFIG.AC;

    const hudDefault =
      (topicMeta && topicMeta.hudDefault) || schoolCfg.defaultHud;

    const hudPrefix = (topicMeta && topicMeta.hudPrefix) || schoolCfg.hudPrefix;

    const email = (topicMeta && topicMeta.email) || schoolCfg.email;

    const logoSrc =
      topicMeta && topicMeta.logoSrc != null
        ? topicMeta.logoSrc
        : schoolCfg.logoSrc;

    // Update HUD label with topic title if available
    if (hudLabel) {
      hudLabel.textContent =
        (topicMeta && topicMeta.title) ||
        `Session ${session} — ${topic.replace(/_/g, " ")}`;
    }

    // 5) Call the engine
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
      ttsEnabled: false,
      theme: school === "UO" ? "uo" : "ac",
      analysisMode,
      debugOverlay,
      initialSlide,
    });
  } catch (err) {
    console.error("Failed to import slide module:", modulePath, err);
    showError("Could not load the slide module. Check console for details.");
    return null;
  }
}
