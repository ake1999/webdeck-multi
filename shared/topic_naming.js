export function sessionTopicNumber(topicId) {
  const match = String(topicId || "").match(/^(\d{2})_/);
  return match ? match[1] : "";
}

export function materialSlugFromTopicId(topicId) {
  return String(topicId || "").replace(/^\d{2}_/, "");
}

export function prefixedTopicId(order, slug) {
  const number = String(Number(order) || 0).padStart(2, "0");
  const normalized = String(slug || "").replace(/^\d{2}_/, "");
  return `${number}_${normalized}`;
}