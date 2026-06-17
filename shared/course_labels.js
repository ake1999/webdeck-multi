export const CLASSROOM_TERMINOLOGY = {
  unit: "Session",
  unitPlural: "Sessions",
  lesson: "Topic",
  lessonPlural: "Topics",
  chooserHint: "Choose a topic to open its slide deck.",
  chooserTitle: "Choose session & topic",
  thisLesson: "This topic",
  prevLesson: "Previous topic",
  nextLesson: "Next topic",
};

export const YOUTUBE_TERMINOLOGY = {
  unit: "Unit",
  unitPlural: "Units",
  lesson: "Lesson",
  lessonPlural: "Lessons",
  chooserHint: "Choose a lesson to open its slide deck.",
  chooserTitle: "Choose a unit & lesson",
  thisLesson: "This lesson",
  prevLesson: "Previous lesson",
  nextLesson: "Next lesson",
};

export function getCourseTerminology(courseConfig) {
  return courseConfig?.terminology || CLASSROOM_TERMINOLOGY;
}

export function buildLessonIndex(courseConfig) {
  const index = new Map();
  let globalNumber = 0;
  (courseConfig?.sessions || []).forEach((session) => {
    (session.topics || []).forEach((topic) => {
      globalNumber += 1;
      index.set(`${session.id}:${topic.id}`, globalNumber);
    });
  });
  return index;
}

export function stripLessonPrefix(label) {
  return String(label || "")
    .replace(/^(?:Topic|Lesson)\s+\d+\s*[—-]\s*/i, "")
    .trim();
}

export function stripUnitPrefix(label) {
  return String(label || "")
    .replace(/^(?:Session|Unit)\s+\d+\s*[—-]\s*/i, "")
    .trim();
}

export function formatUnitLabel(session, unitNumber, terminology = CLASSROOM_TERMINOLOGY) {
  const title = stripUnitPrefix(session?.label || session?.id || "");
  const number = unitNumber ?? (Number(String(session?.id || "").replace(/^S/i, "")) || 0);
  if (!number) return session?.label || "";
  return title
    ? `${terminology.unit} ${number} — ${title}`
    : `${terminology.unit} ${number}`;
}

export function formatLessonLabel(globalNumber, topic, terminology = CLASSROOM_TERMINOLOGY) {
  const title = topic?.title || stripLessonPrefix(topic?.label) || topic?.id || "";
  return `${terminology.lesson} ${globalNumber} — ${title}`;
}

export function rebrandRoadmapSessionLabel(value, terminology = CLASSROOM_TERMINOLOGY) {
  if (!value || terminology.unit === CLASSROOM_TERMINOLOGY.unit) return value;

  const compact = String(value).trim();
  const fromS = compact.match(/^S(\d{1,2})\s+(.*)$/i);
  if (fromS) {
    const rest = fromS[2].trim();
    return rest
      ? `${terminology.unit} ${Number(fromS[1])} — ${rest}`
      : `${terminology.unit} ${Number(fromS[1])}`;
  }

  const fromWord = compact.match(/^(?:Session|Unit)\s+(0?\d+)\s*[—-]\s*(.*)$/i);
  if (fromWord) {
    const rest = fromWord[2].trim();
    return rest
      ? `${terminology.unit} ${Number(fromWord[1])} — ${rest}`
      : `${terminology.unit} ${Number(fromWord[1])}`;
  }

  return compact;
}

export function rebrandRoadmapLessonLabel(item = {}, terminology = CLASSROOM_TERMINOLOGY) {
  const number = item.number ?? item._index + 1;
  const title = item.label || `${terminology.lesson} ${number}`;
  if (terminology.lesson === CLASSROOM_TERMINOLOGY.lesson) return title;

  const stripped = stripLessonPrefix(title);
  if (/^(?:Topic|Lesson)\s+\d+/i.test(title)) {
    return stripped;
  }
  return stripped || title;
}

export function rebrandRoadmapNote(note, terminology = CLASSROOM_TERMINOLOGY) {
  if (!note || terminology.thisLesson === CLASSROOM_TERMINOLOGY.thisLesson) return note;
  return String(note)
    .replace(/this topic/i, terminology.thisLesson)
    .replace(/previous topic/i, "Previous lesson")
    .replace(/next topic/i, "Next lesson");
}