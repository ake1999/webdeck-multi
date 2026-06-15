import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildTopicRuntime } from "../../shared/deck_model.js";
import {
  buildTopicArtifactDir,
  createExportRuntime,
  parseViewport,
  projectRoot,
} from "./export_runtime.mjs";
import {
  discoverTopics,
  escapeHtml,
  filterTopics,
  isValidSlideType,
  issueToHtml,
  issueToText,
  localFileExists,
  loadTopicModule,
  resolveDeckAssetPath,
  summarizeSelector,
  toReviewLabel,
} from "./catalog.mjs";
import {
  LAYOUT_MANIFEST_SCHEMA_VERSION,
  validateLayoutManifest,
} from "./manifest_schema.mjs";

const VALID_MEDIA_KINDS = new Set(["image", "video", "iframe", "widget", "calculus_widget", "gallery"]);

function pushIssue(issues, severity, code, message, options = {}) {
  issues.push({
    severity,
    code,
    message,
    location: options.location || "",
    slide_id: options.slideId || "",
  });
}

function issueCounts(issues) {
  return issues.reduce(
    (counts, issue) => {
      counts[issue.severity] += 1;
      return counts;
    },
    { error: 0, warning: 0, info: 0 },
  );
}

function issueStatus(issues) {
  const counts = issueCounts(issues);
  if (counts.error > 0) return "blocked";
  if (counts.warning > 0) return "warning";
  return "ready";
}

function relativeProjectPath(filePath) {
  return path.relative(projectRoot, filePath);
}

function stripQueryHash(value) {
  return String(value || "").replace(/[?#].*$/, "");
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function hasOwnId(node) {
  return Boolean(node && typeof node === "object" && typeof node.id === "string" && node.id.trim());
}

function mediaCaptionId(media) {
  return media?.source || media?.caption ? `${media.id}_caption` : "";
}

function collectBlockIds(blocks, push) {
  asArray(blocks).forEach((block) => {
    push(block?.id);
    push(block?.titleId);
    push(block?.bodyId);
    asArray(block?.items).forEach((item) => {
      push(item?.id);
      collectBlockIds(item?.children, push);
    });
    asArray(block?.steps).forEach((step) => push(step?.id));
    if (block?.reveal) push(block.reveal.id);
  });
}

function collectStructuredElementIds(slide) {
  const ids = [];

  const push = (id) => {
    if (typeof id === "string" && id.trim()) ids.push(id);
  };

  const pushMedia = (media) => {
    if (!media) return;
    push(media.id);
    push(mediaCaptionId(media));
    if (media.kind === "gallery") {
      asArray(media.items).forEach((item) => push(item.id));
    }
  };

  push(slide.titleId);
  push(slide.subtitleId);
  push(slide.metaId);
  push(slide.leadId);
  push(slide.questionId);
  push(slide.feedbackId);
  push(slide.htmlId);

  asArray(slide.bullets).forEach((item) => push(item.id));
  asArray(slide.paragraphs).forEach((item) => push(item.id));
  collectBlockIds(slide.blocks, push);
  pushMedia(slide.media);

  [slide.left, slide.right].forEach((column) => {
    if (!column) return;
    push(column.leadId);
    push(column.htmlId);
    asArray(column.bullets).forEach((item) => push(item.id));
    asArray(column.paragraphs).forEach((item) => push(item.id));
    collectBlockIds(column.blocks, push);
    pushMedia(column.media);
  });

  asArray(slide.options).forEach((item) => push(item.id));
  return ids;
}

function findDuplicateIds(ids) {
  const seen = new Set();
  const duplicates = new Set();

  ids.forEach((id) => {
    if (seen.has(id)) duplicates.add(id);
    seen.add(id);
  });

  return Array.from(duplicates);
}

function walkMedia(node, pathLabel, visit) {
  if (!node || typeof node !== "object") return;

  if (Array.isArray(node)) {
    node.forEach((item, index) => walkMedia(item, `${pathLabel}[${index}]`, visit));
    return;
  }

  if (
    typeof node.kind === "string"
    && (node.src || node.kind === "gallery" || node.kind === "calculus_widget")
  ) {
    visit(node, pathLabel);
  }

  Object.entries(node).forEach(([key, value]) => {
    if (!value || typeof value !== "object") return;
    walkMedia(value, `${pathLabel}.${key}`, visit);
  });
}

async function validateAssetRef({
  value,
  kind,
  issues,
  nondeterminism,
  location,
  slideId,
}) {
  if (!value) {
    pushIssue(issues, "error", "media.missing_src", "Media reference is missing a src value.", {
      location,
      slideId,
    });
    return;
  }

  const resolved = resolveDeckAssetPath(value);
  if (!resolved) {
    pushIssue(issues, "error", "media.unresolvable_ref", "Could not resolve media reference.", {
      location,
      slideId,
    });
    return;
  }

  if (resolved.kind === "remote") {
    let code = "nondeterminism.remote_media";
    let message = `Remote ${kind} dependency requires network access during export.`;

    if (kind === "iframe" || kind === "widget" || kind === "calculus_widget") {
      code = "nondeterminism.external_iframe";
      message = `External ${kind} dependency can change independently of the deck.`;
    }

    if (/youtube(?:-nocookie)?\.com|youtu\.be/i.test(String(value))) {
      code = "nondeterminism.youtube_embed";
      message = "YouTube embed makes the deck dependent on an external runtime.";
    }

    pushIssue(issues, "warning", code, message, {
      location,
      slideId,
    });

    nondeterminism.push({
      kind,
      ref: String(value),
      location,
      slide_id: slideId,
      remote: true,
    });
    return;
  }

  const exists = await localFileExists(resolved.resolved);
  if (!exists) {
    pushIssue(issues, "error", "media.missing_local_asset", `Missing local ${kind} asset: ${resolved.original}`, {
      location,
      slideId,
    });
  }
}

async function validateMediaNode({
  media,
  issues,
  nondeterminism,
  location,
  slideId,
  authoring,
}) {
  const kind = String(media?.kind || "image").toLowerCase();

  if (!VALID_MEDIA_KINDS.has(kind)) {
    pushIssue(issues, "error", "media.invalid_kind", `Unsupported media kind "${kind}".`, {
      location,
      slideId,
    });
    return;
  }

  if (!hasOwnId(media)) {
    authoring.generated_media_ids += 1;
    pushIssue(issues, "info", "authoring.media_generated_id", `Media at ${location} is using a generated ID.`, {
      location,
      slideId,
    });
  }

  if (kind === "gallery") {
    const items = asArray(media.items);
    if (!items.length) {
      pushIssue(issues, "error", "media.empty_gallery", "Gallery media must include at least one item.", {
        location,
        slideId,
      });
      return;
    }

    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      if (!hasOwnId(item)) {
        authoring.generated_gallery_item_ids += 1;
        pushIssue(issues, "info", "authoring.gallery_item_generated_id", `Gallery item ${index + 1} is using a generated ID.`, {
          location: `${location}.items[${index}]`,
          slideId,
        });
      }

      await validateAssetRef({
        value: item?.src,
        kind: "image",
        issues,
        nondeterminism,
        location: `${location}.items[${index}].src`,
        slideId,
      });
    }

    return;
  }

  if (kind === "calculus_widget") {
    if (!String(media.widget || "").trim()) {
      pushIssue(issues, "error", "media.missing_widget", "Calculus widget media must include a widget name.", {
        location: `${location}.widget`,
        slideId,
      });
    }
    return;
  }

  await validateAssetRef({
    value: media.src,
    kind,
    issues,
    nondeterminism,
    location: `${location}.src`,
    slideId,
  });

  if (media.poster) {
    await validateAssetRef({
      value: media.poster,
      kind: "image",
      issues,
      nondeterminism,
      location: `${location}.poster`,
      slideId,
    });
  }
}

function validateNormalizedList({
  rawItems,
  normalizedItems,
  issues,
  authoring,
  slideId,
  listType,
  location,
}) {
  asArray(normalizedItems).forEach((item, index) => {
    const rawItem = asArray(rawItems)[index];
    if (!item?.id) {
      pushIssue(issues, "error", "element.missing_id", `Missing normalized ${listType} ID.`, {
        location: `${location}[${index}]`,
        slideId,
      });
      return;
    }

    if (typeof rawItem === "string" || (rawItem && typeof rawItem === "object" && !hasOwnId(rawItem))) {
      authoring[`generated_${listType}_ids`] += 1;
      pushIssue(issues, "info", `authoring.${listType}_generated_id`, `${listType[0].toUpperCase()}${listType.slice(1)} ${index + 1} is using a generated ID.`, {
        location: `${location}[${index}]`,
        slideId,
      });
    }
  });
}

function validateColumnAuthoring({
  rawColumn,
  normalizedColumn,
  issues,
  authoring,
  slideId,
  location,
}) {
  if (!rawColumn || !normalizedColumn) return;

  validateNormalizedList({
    rawItems: rawColumn.bullets,
    normalizedItems: normalizedColumn.bullets,
    issues,
    authoring,
    slideId,
    listType: "bullet",
    location: `${location}.bullets`,
  });

  validateNormalizedList({
    rawItems: rawColumn.paragraphs,
    normalizedItems: normalizedColumn.paragraphs,
    issues,
    authoring,
    slideId,
    listType: "paragraph",
    location: `${location}.paragraphs`,
  });

  if (rawColumn.html) {
    pushIssue(issues, "warning", "authoring.legacy_html", "Legacy raw HTML reduces downstream structure quality.", {
      location: `${location}.html`,
      slideId,
    });
  }
}

async function validateTopicSource({ descriptor, slidesData, topicMeta }) {
  const issues = [];
  const nondeterminism = [];
  const authoring = {
    missing_slide_ids: 0,
    generated_bullet_ids: 0,
    generated_paragraph_ids: 0,
    generated_media_ids: 0,
    generated_gallery_item_ids: 0,
    generated_option_ids: 0,
    empty_notes: 0,
  };

  if (!topicMeta?.id) {
    pushIssue(issues, "info", "authoring.topic_meta_generated_id", "topicMeta.id is missing, so topic_id falls back to the filename/title slug.", {
      location: "topicMeta.id",
    });
  }

  if (!Array.isArray(slidesData) || !slidesData.length) {
    pushIssue(issues, "error", "topic.empty", "Topic has no slides.", {
      location: descriptor.relativePath,
    });
    return {
      runtime: buildTopicRuntime({ topicMeta, slidesData: [], topicFallback: descriptor.topic }),
      issues,
      nondeterminism,
      authoring,
    };
  }

  const runtime = buildTopicRuntime({
    topicMeta,
    slidesData,
    topicFallback: descriptor.topic,
  });

  const seenSlideIds = new Set();

  for (let slideIndex = 0; slideIndex < runtime.slides.length; slideIndex += 1) {
    const rawSlide = slidesData[slideIndex] || {};
    const slide = runtime.slides[slideIndex];
    const slideId = slide.slideId;
    const slideLocation = `slide:${slideId}`;

    if (seenSlideIds.has(slideId)) {
      pushIssue(issues, "error", "slide.duplicate_id", `Duplicate slide ID "${slideId}" in normalized topic runtime.`, {
        location: `${slideLocation}.id`,
        slideId,
      });
    }
    seenSlideIds.add(slideId);

    if (!rawSlide.id && !rawSlide.slideId) {
      authoring.missing_slide_ids += 1;
      pushIssue(issues, "warning", "authoring.slide_generated_id", "Slide is using a generated slide_id.", {
        location: `${slideLocation}.id`,
        slideId,
      });
    }

    if (!isValidSlideType(rawSlide.type)) {
      pushIssue(issues, "error", "slide.invalid_type", `Unsupported slide type "${rawSlide.type}".`, {
        location: `${slideLocation}.type`,
        slideId,
      });
    }

    if (!String(rawSlide.notes || "").trim()) {
      authoring.empty_notes += 1;
      pushIssue(issues, "warning", "authoring.empty_notes", "Slide notes are empty; later narration/script generation will be weaker.", {
        location: `${slideLocation}.notes`,
        slideId,
      });
    }

    const structuredIds = collectStructuredElementIds(slide);
    const duplicateElementIds = findDuplicateIds(structuredIds);
    duplicateElementIds.forEach((duplicateId) => {
      pushIssue(issues, "error", "element.duplicate_structured_id", `Structured element ID "${duplicateId}" is duplicated within the slide.`, {
        location: `${slideLocation}.elements`,
        slideId,
      });
    });

    if (slide.type === "bullets") {
      validateNormalizedList({
        rawItems: rawSlide.bullets,
        normalizedItems: slide.bullets,
        issues,
        authoring,
        slideId,
        listType: "bullet",
        location: `${slideLocation}.bullets`,
      });
    }

    if (slide.type === "text") {
      validateNormalizedList({
        rawItems: rawSlide.paragraphs,
        normalizedItems: slide.paragraphs,
        issues,
        authoring,
        slideId,
        listType: "paragraph",
        location: `${slideLocation}.paragraphs`,
      });
    }

    if (slide.type === "mcq") {
      asArray(slide.options).forEach((option, optionIndex) => {
        const rawOption = asArray(rawSlide.options)[optionIndex];
        if (!option?.id) {
          pushIssue(issues, "error", "option.missing_id", "MCQ option is missing its normalized ID.", {
            location: `${slideLocation}.options[${optionIndex}]`,
            slideId,
          });
          return;
        }

        if (!hasOwnId(rawOption)) {
          authoring.generated_option_ids += 1;
          pushIssue(issues, "info", "authoring.option_generated_id", `MCQ option ${option.choice || optionIndex + 1} is using a generated ID.`, {
            location: `${slideLocation}.options[${optionIndex}]`,
            slideId,
          });
        }
      });
    }

    if (slide.type === "two-col") {
      validateColumnAuthoring({
        rawColumn: rawSlide.left,
        normalizedColumn: slide.left,
        issues,
        authoring,
        slideId,
        location: `${slideLocation}.left`,
      });

      validateColumnAuthoring({
        rawColumn: rawSlide.right,
        normalizedColumn: slide.right,
        issues,
        authoring,
        slideId,
        location: `${slideLocation}.right`,
      });
    }
  }

  for (let slideIndex = 0; slideIndex < slidesData.length; slideIndex += 1) {
    const rawSlide = slidesData[slideIndex];
    const slideId = runtime.slides[slideIndex]?.slideId || `slide_${slideIndex + 1}`;
    const slideLocation = `slide:${slideId}`;
    const mediaWork = [];

    walkMedia(rawSlide, slideLocation, (media, location) => {
      mediaWork.push(
        validateMediaNode({
          media,
          issues,
          nondeterminism,
          location,
          slideId,
          authoring,
        }),
      );
    });

    await Promise.all(mediaWork);
  }

  return { runtime, issues, nondeterminism, authoring };
}

async function validateExportArtifacts({ manifest, screenshotsDir, issues }) {
  const files = await readdir(screenshotsDir).catch(() => []);
  const screenshotNames = new Set(
    files.filter((entry) => entry.endsWith(".png")),
  );

  if (!manifest?.slides?.length) {
    pushIssue(issues, "error", "export.empty_manifest", "Export manifest has no slides.", {
      location: "manifest.slides",
    });
    return {
      screenshotCount: screenshotNames.size,
      slides: [],
    };
  }

  const slideSummaries = manifest.slides.map((slide) => {
    const expectedName = `${slide.slide_id}.png`;
    if (!screenshotNames.has(expectedName)) {
      pushIssue(issues, "error", "export.missing_screenshot", `Missing screenshot for slide "${slide.slide_id}".`, {
        location: `slide:${slide.slide_id}.screenshot`,
        slideId: slide.slide_id,
      });
    }

    if (!Array.isArray(slide.elements) || !slide.elements.length) {
      pushIssue(issues, "warning", "manifest.no_elements", `Slide "${slide.slide_id}" exported without any detected elements.`, {
        location: `slide:${slide.slide_id}.elements`,
        slideId: slide.slide_id,
      });
    } else if (!slide.elements.some((element) => element.visible)) {
      pushIssue(issues, "warning", "manifest.no_visible_elements", `Slide "${slide.slide_id}" exported without visible elements.`, {
        location: `slide:${slide.slide_id}.elements`,
        slideId: slide.slide_id,
      });
    }

    return {
      slide_id: slide.slide_id,
      slide_type: slide.slide_type,
      element_count: Array.isArray(slide.elements) ? slide.elements.length : 0,
      visible_element_count: Array.isArray(slide.elements)
        ? slide.elements.filter((element) => element.visible).length
        : 0,
      zones: {
        avatar_safe_left: slide.zones?.avatar_safe_left != null,
        avatar_safe_right: slide.zones?.avatar_safe_right != null,
      },
      screenshot: relativeProjectPath(path.join(screenshotsDir, expectedName)),
    };
  });

  return {
    screenshotCount: screenshotNames.size,
    slides: slideSummaries,
  };
}

function classifyReadiness(topics) {
  return {
    ready: topics.filter((topic) => topic.status === "ready").map((topic) => toReviewLabel(topic)),
    warning: topics.filter((topic) => topic.status === "warning").map((topic) => toReviewLabel(topic)),
    blocked: topics.filter((topic) => topic.status === "blocked").map((topic) => toReviewLabel(topic)),
  };
}

function summarizeTopicForJson(topic) {
  return {
    school: topic.school,
    course: topic.course,
    session: topic.session,
    topic: topic.topic,
    topic_id: topic.topic_id,
    status: topic.status,
    ready_for_phase3: topic.status === "ready",
    issue_counts: topic.issue_counts,
    issues: topic.issues,
    authoring_gaps: topic.authoring_gaps,
    non_determinism: topic.non_determinism,
    export: topic.export,
    manifest: topic.manifest,
  };
}

function makeMarkdownReport(report) {
  const lines = [
    "# WebDeck Validation Report",
    "",
    `- Generated: ${report.generated_at}`,
    `- Selector: \`${report.selector}\``,
    `- Manifest schema: \`${report.manifest_schema_version}\``,
    `- Topics scanned: ${report.summary.topics_scanned}`,
    `- Ready: ${report.summary.ready}`,
    `- Warning: ${report.summary.warning}`,
    `- Blocked: ${report.summary.blocked}`,
    "",
    "## Phase 3 Readiness",
    "",
    "### Fully Ready",
  ];

  if (report.readiness.ready.length) {
    report.readiness.ready.forEach((label) => lines.push(`- ${label}`));
  } else {
    lines.push("- None");
  }

  lines.push("", "### With Warnings");
  if (report.readiness.warning.length) {
    report.readiness.warning.forEach((label) => lines.push(`- ${label}`));
  } else {
    lines.push("- None");
  }

  lines.push("", "### Blocked By Errors");
  if (report.readiness.blocked.length) {
    report.readiness.blocked.forEach((label) => lines.push(`- ${label}`));
  } else {
    lines.push("- None");
  }

  lines.push("", "## Topic Details", "");

  report.topics.forEach((topic) => {
    lines.push(`### ${toReviewLabel(topic)}`);
    lines.push("");
    lines.push(`- Status: ${topic.status}`);
    lines.push(`- Slides: ${topic.manifest.slide_count}`);
    lines.push(`- Errors: ${topic.issue_counts.error}`);
    lines.push(`- Warnings: ${topic.issue_counts.warning}`);
    lines.push(`- Info: ${topic.issue_counts.info}`);
    if (topic.export.manifest_path) {
      lines.push(`- Manifest: \`${topic.export.manifest_path}\``);
    }
    if (topic.export.review_page) {
      lines.push(`- Review page: \`${topic.export.review_page}\``);
    }
    if (topic.non_determinism.items.length) {
      lines.push(`- Remote dependencies: ${topic.non_determinism.items.length}`);
    }
    lines.push("");

    if (topic.issues.length) {
      topic.issues.forEach((issue) => lines.push(`- ${issueToText(issue)}`));
    } else {
      lines.push("- No issues.");
    }

    lines.push("");
  });

  return `${lines.join("\n")}\n`;
}

function makeValidationIndex(report) {
  const rows = report.topics.map((topic) => {
    const reviewLink = topic.export.review_page
      ? `<a href="${escapeHtml(path.relative(path.join(projectRoot, "generated", "validation"), path.join(projectRoot, topic.export.review_page)))}">review</a>`
      : "";
    return `<tr>
      <td>${escapeHtml(topic.school)}</td>
      <td>${escapeHtml(topic.course)}</td>
      <td>${escapeHtml(topic.session)}</td>
      <td>${escapeHtml(topic.topic)}</td>
      <td class="${escapeHtml(topic.status)}">${escapeHtml(topic.status)}</td>
      <td>${topic.manifest.slide_count}</td>
      <td>${topic.issue_counts.error}</td>
      <td>${topic.issue_counts.warning}</td>
      <td>${topic.non_determinism.items.length}</td>
      <td>${reviewLink}</td>
    </tr>`;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>WebDeck Validation Review</title>
  <style>
    body { font-family: sans-serif; margin: 24px; background: #f7f7f7; color: #111; }
    table { width: 100%; border-collapse: collapse; background: #fff; }
    th, td { border: 1px solid #ddd; padding: 8px 10px; text-align: left; }
    th { background: #f0f0f0; }
    .ready { color: #0f766e; font-weight: 700; }
    .warning { color: #b45309; font-weight: 700; }
    .blocked { color: #b91c1c; font-weight: 700; }
  </style>
</head>
<body>
  <h1>WebDeck Validation Review</h1>
  <p>Generated: ${escapeHtml(report.generated_at)}</p>
  <p>Ready: ${report.summary.ready} | Warning: ${report.summary.warning} | Blocked: ${report.summary.blocked}</p>
  <table>
    <thead>
      <tr>
        <th>School</th>
        <th>Course</th>
        <th>Session</th>
        <th>Topic</th>
        <th>Status</th>
        <th>Slides</th>
        <th>Errors</th>
        <th>Warnings</th>
        <th>Remote</th>
        <th>Review</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</body>
</html>
`;
}

function makeTopicReviewPage(topic, manifest, reviewFilePath) {
  const slideCards = manifest.slides.map((slide) => {
    const screenshotPath = path.relative(
      path.dirname(reviewFilePath),
      path.join(projectRoot, topic.export.screenshots_dir, `${slide.slide_id}.png`),
    );
    const slideIssues = topic.issues.filter((issue) => issue.slide_id === slide.slide_id);
    const issueList = slideIssues.length
      ? `<ul>${slideIssues.map(issueToHtml).join("")}</ul>`
      : "<p>No slide-specific issues.</p>";

    const elementList = slide.elements.length
      ? `<ul>${slide.elements.map((element) => `<li><code>${escapeHtml(element.id)}</code> ${escapeHtml(element.type)} bbox=${escapeHtml(JSON.stringify(element.bbox))} anchor=${escapeHtml(JSON.stringify(element.anchor))} visible=${escapeHtml(String(element.visible))}</li>`).join("")}</ul>`
      : "<p>No elements exported.</p>";

    return `<section class="slide-card">
      <h2>${escapeHtml(slide.slide_id)} <small>(${escapeHtml(slide.slide_type)})</small></h2>
      <img src="${escapeHtml(screenshotPath)}" alt="${escapeHtml(slide.slide_id)}" />
      <div class="meta">
        <p>Safe zones: left=${slide.zones.avatar_safe_left ? "yes" : "no"} right=${slide.zones.avatar_safe_right ? "yes" : "no"}</p>
      </div>
      <h3>Elements</h3>
      ${elementList}
      <h3>Warnings / Errors</h3>
      ${issueList}
    </section>`;
  }).join("\n");

  const topicIssues = topic.issues.length
    ? `<ul>${topic.issues.map(issueToHtml).join("")}</ul>`
    : "<p>No issues.</p>";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(toReviewLabel(topic))}</title>
  <style>
    body { font-family: sans-serif; margin: 24px; background: #f7f7f7; color: #111; }
    img { max-width: 100%; border: 1px solid #ccc; background: #fff; }
    .slide-card { background: #fff; border: 1px solid #ddd; padding: 16px; margin-bottom: 24px; }
    code { background: #f0f0f0; padding: 1px 4px; }
    .error { color: #b91c1c; }
    .warning { color: #b45309; }
    .info { color: #334155; }
    .loc { color: #64748b; font-family: monospace; }
  </style>
</head>
<body>
  <p><a href="../index.html">Back to validation index</a></p>
  <h1>${escapeHtml(toReviewLabel(topic))}</h1>
  <p>Status: ${escapeHtml(topic.status)} | Errors: ${topic.issue_counts.error} | Warnings: ${topic.issue_counts.warning}</p>
  <h2>Topic Issues</h2>
  ${topicIssues}
  <h2>Slides</h2>
  ${slideCards}
</body>
</html>
`;
}

async function writeValidationArtifacts(report, topicManifests, outputDir) {
  await mkdir(outputDir, { recursive: true });
  await mkdir(path.join(outputDir, "topics"), { recursive: true });

  const jsonPath = path.join(outputDir, "report.json");
  const mdPath = path.join(outputDir, "report.md");
  const htmlPath = path.join(outputDir, "index.html");

  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(mdPath, makeMarkdownReport(report), "utf8");
  await writeFile(htmlPath, makeValidationIndex(report), "utf8");

  for (const topic of report.topics) {
    const manifest = topicManifests.get(topic.export.review_key);
    if (!manifest || !topic.export.review_page) continue;

    const reviewFilePath = path.join(projectRoot, topic.export.review_page);
    await mkdir(path.dirname(reviewFilePath), { recursive: true });
    await writeFile(reviewFilePath, makeTopicReviewPage(topic, manifest, reviewFilePath), "utf8");
  }

  return {
    jsonPath,
    mdPath,
    htmlPath,
  };
}

export async function runCatalogValidation(options = {}) {
  const selector = {
    school: options.school || "",
    course: options.course || "",
    session: options.session || "",
    topic: options.topic || "",
  };
  const outputDir = options.outputDir || path.join(projectRoot, "generated", "validation");
  const exportRoot = path.join(outputDir, "exports");
  const reuseExistingExportsOnly = Boolean(
    options.reuseExistingExportsOnly ||
    options.reuseExistingExports ||
    options.reuse,
  );
  const topics = filterTopics(await discoverTopics(), selector);

  if (!topics.length) {
    throw new Error(`No topics matched selector ${summarizeSelector(selector)}.`);
  }

  const viewport = parseViewport(options.viewport || "1920x1080");
  const runtime = reuseExistingExportsOnly
    ? null
    : await createExportRuntime({ viewport });
  const topicResults = [];
  const topicManifests = new Map();

  try {
    for (const descriptor of topics) {
      const reviewPage = path.join("generated", "validation", "topics", `${descriptor.reviewKey}.html`);
      const topicResult = {
        ...descriptor,
        topic_id: "",
        issues: [],
        issue_counts: { error: 0, warning: 0, info: 0 },
        authoring_gaps: {},
        non_determinism: { count: 0, items: [] },
        export: {
          attempted: true,
          success: false,
          manifest_path: "",
          screenshots_dir: "",
          review_key: descriptor.reviewKey,
          review_page: reviewPage,
        },
        manifest: {
          topic_id: "",
          viewport,
          slide_count: 0,
          slides: [],
        },
        status: "blocked",
      };

      const allIssues = [];

      try {
        const { slidesData, topicMeta } = await loadTopicModule(descriptor);
        const sourceValidation = await validateTopicSource({
          descriptor,
          slidesData,
          topicMeta,
        });

        topicResult.topic_id = sourceValidation.runtime.topicId;
        allIssues.push(...sourceValidation.issues);
        topicResult.authoring_gaps = sourceValidation.authoring;
        topicResult.non_determinism = {
          count: sourceValidation.nondeterminism.length,
          items: sourceValidation.nondeterminism,
        };

        const outDir = buildTopicArtifactDir(exportRoot, descriptor);
        let exported;

        if (reuseExistingExportsOnly) {
          const manifestPath = path.join(outDir, "layout.manifest.json");
          const manifestExists = await readFile(manifestPath, "utf8").catch(() => "");

          if (!manifestExists) {
            throw new Error(`Missing existing manifest artifact at ${relativeProjectPath(manifestPath)}.`);
          }

          exported = {
            descriptor,
            manifest: JSON.parse(manifestExists),
            manifestPath,
            screenshotsDir: path.join(outDir, "screenshots"),
          };
        } else {
          exported = await runtime.exportTopic({
            ...descriptor,
            outDir,
            debugScreenshots: Boolean(options.debugScreenshots),
            viewport,
            analysisTimeoutMs: options.analysisTimeoutMs,
          });
        }

        topicResult.export.success = true;
        topicResult.export.manifest_path = relativeProjectPath(exported.manifestPath);
        topicResult.export.screenshots_dir = relativeProjectPath(exported.screenshotsDir);

        const manifestIssues = validateLayoutManifest(exported.manifest).map((issue) => ({
          ...issue,
          slide_id: issue.slide_id || "",
        }));
        allIssues.push(...manifestIssues);

        const exportArtifactSummary = await validateExportArtifacts({
          manifest: exported.manifest,
          screenshotsDir: exported.screenshotsDir,
          issues: allIssues,
        });

        topicResult.manifest = {
          topic_id: exported.manifest.topic_id,
          viewport: exported.manifest.viewport,
          slide_count: exported.manifest.slides.length,
          slides: exportArtifactSummary.slides,
        };

        topicManifests.set(descriptor.reviewKey, exported.manifest);
      } catch (error) {
        pushIssue(allIssues, "error", "export.failed", error?.message || String(error), {
          location: descriptor.relativePath,
        });
      }

      topicResult.issues = allIssues.sort((left, right) => {
        const order = { error: 0, warning: 1, info: 2 };
        return order[left.severity] - order[right.severity] || left.code.localeCompare(right.code);
      });
      topicResult.issue_counts = issueCounts(topicResult.issues);
      topicResult.status = issueStatus(topicResult.issues);
      topicResults.push(topicResult);
    }
  } finally {
    if (runtime) {
      await runtime.close();
    }
  }

  const summary = {
    topics_scanned: topicResults.length,
    ready: topicResults.filter((topic) => topic.status === "ready").length,
    warning: topicResults.filter((topic) => topic.status === "warning").length,
    blocked: topicResults.filter((topic) => topic.status === "blocked").length,
    issues: topicResults.reduce(
      (counts, topic) => {
        counts.error += topic.issue_counts.error;
        counts.warning += topic.issue_counts.warning;
        counts.info += topic.issue_counts.info;
        return counts;
      },
      { error: 0, warning: 0, info: 0 },
    ),
  };

  const report = {
    generated_at: new Date().toISOString(),
    selector: summarizeSelector(selector),
    viewport,
    manifest_schema_version: LAYOUT_MANIFEST_SCHEMA_VERSION,
    manifest_schema_path: "schemas/layout.manifest.schema.json",
    summary,
    readiness: classifyReadiness(topicResults),
    topics: topicResults.map(summarizeTopicForJson),
  };

  const artifactPaths = await writeValidationArtifacts(report, topicManifests, outputDir);
  return {
    report,
    artifactPaths,
  };
}
