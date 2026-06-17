import assert from "node:assert/strict";
import { getCourseConfig } from "../shared/course_catalog.js";
import {
  buildSessionTopicUrl,
  findTopicIndex,
  flattenCourseTopics,
  getAdjacentTopic,
  resolveTopicByPathId,
  topicNavTargetFromItem,
} from "../shared/topic_navigation.js";

const course = getCourseConfig("ARIAN_Calculus_1");
const flat = flattenCourseTopics(course);

assert.equal(flat.length, 26);
assert.equal(flat[0].topicId, "01_review_of_functions_and_graphs");
assert.equal(flat[25].pathId, "path_topic_26");

const idx = findTopicIndex(flat, {
  session: "S03",
  topicId: "01_instantaneous_rate_of_change",
});
assert.equal(idx, 7);
assert.equal(flat[idx].globalNumber, 8);

const pathEntry = resolveTopicByPathId(flat, "path_topic_15");
assert.equal(pathEntry.topicId, "01_related_rates");
assert.equal(pathEntry.sessionId, "S04");

const descriptor = {
  school: "AU",
  course: "ARIAN_Calculus_1",
  session: "S01",
  topic: "01_review_of_functions_and_graphs",
};

assert.equal(
  buildSessionTopicUrl(descriptor, flat[1]),
  "session.html?school=AU&course=ARIAN_Calculus_1&session=S01&topic=02_trigonometry_and_graphing_review",
);
assert.equal(
  buildSessionTopicUrl(descriptor, flat[25], { slide: "last" }),
  "session.html?school=AU&course=ARIAN_Calculus_1&session=S05&topic=05_integration_by_substitution&slide=last",
);

const prevFromFirst = getAdjacentTopic(flat, 0, "prev");
assert.equal(prevFromFirst.pathId, "path_topic_26");

const nextFromLast = getAdjacentTopic(flat, 25, "next");
assert.equal(nextFromLast.pathId, "path_topic_01");

const target = topicNavTargetFromItem({ id: "path_topic_08", number: 8 }, 0);
assert.equal(target.pathId, "path_topic_08");
assert.equal(target.number, 8);

console.log("topic_navigation tests passed");