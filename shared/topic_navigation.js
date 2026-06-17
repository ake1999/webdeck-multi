export function flattenCourseTopics(courseConfig) {
  const sessions = courseConfig?.sessions || [];
  const topics = [];
  let globalNumber = 0;

  sessions.forEach((session) => {
    (session.topics || []).forEach((topic) => {
      globalNumber += 1;
      topics.push({
        globalNumber,
        pathId: `path_topic_${String(globalNumber).padStart(2, "0")}`,
        sessionId: session.id,
        topicId: topic.id,
        label: topic.label || topic.title || topic.id,
      });
    });
  });

  return topics;
}

export function findTopicIndex(flatTopics, { session, topicId } = {}) {
  if (!Array.isArray(flatTopics) || !session || !topicId) return -1;
  return flatTopics.findIndex(
    (entry) => entry.sessionId === session && entry.topicId === topicId,
  );
}

export function resolveTopicByPathId(flatTopics, pathId) {
  if (!Array.isArray(flatTopics) || !pathId) return null;
  const normalized = String(pathId).trim();
  const byPath = flatTopics.find((entry) => entry.pathId === normalized);
  if (byPath) return byPath;

  const match = normalized.match(/^path_topic_(\d{1,2})$/i);
  if (!match) return null;
  const number = Number(match[1]);
  return flatTopics.find((entry) => entry.globalNumber === number) || null;
}

export function getAdjacentTopic(flatTopics, currentIndex, direction) {
  if (!Array.isArray(flatTopics) || flatTopics.length === 0 || currentIndex < 0) {
    return null;
  }
  const len = flatTopics.length;
  const delta = direction === "next" ? 1 : -1;
  const nextIndex = (currentIndex + delta + len) % len;
  return flatTopics[nextIndex] || null;
}

export function buildSessionTopicUrl(descriptor, topicEntry, options = {}) {
  if (!descriptor || !topicEntry) return "";

  const params = new URLSearchParams({
    school: descriptor.school || "",
    course: descriptor.course || "",
    session: topicEntry.sessionId || "",
    topic: topicEntry.topicId || "",
  });

  const slide = options.slide;
  if (slide != null && slide !== "" && slide !== 0 && slide !== "0") {
    params.set("slide", String(slide));
  }

  const query = params.toString();
  return query ? `session.html?${query}` : "session.html";
}

export function topicNavTargetFromItem(item = {}, index = 0) {
  const pathId = /^path_topic_\d{2}$/i.test(item.id || "") ? item.id : null;
  const number = Number(item.number) || (pathId
    ? Number(String(pathId).replace(/^path_topic_/i, ""))
    : index + 1);
  return {
    pathId: pathId || `path_topic_${String(number).padStart(2, "0")}`,
    number,
  };
}