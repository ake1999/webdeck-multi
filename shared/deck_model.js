function stripRichText(value) {
  return String(value ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\\\[[\s\S]*?\\\]/g, " ")
    .replace(/\\\([\s\S]*?\\\)/g, " ")
    .replace(/\[([^\]]+?)\]\((https?:\/\/[^\s)]+)\)/g, "$1")
    .replace(/`([^`]+?)`/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\bhttps?:\/\/\S+/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value, fallback = "item") {
  const plain = stripRichText(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");

  const slug = plain
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return slug || fallback;
}

function createUniqifier() {
  const seen = new Map();
  return (value, fallback = "item") => {
    const base = slugify(value, fallback);
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}_${count + 1}`;
  };
}

function normalizeList(items, prefix) {
  return (items || []).map((item, index) => {
    if (typeof item === "string") {
      return {
        id: `${prefix}_${index + 1}`,
        text: item,
        say: "",
      };
    }

    return {
      ...item,
      id: item.id || `${prefix}_${index + 1}`,
      text: item.text || "",
      say: item.say || "",
    };
  });
}

function normalizeMedia(media, prefix) {
  if (!media) return null;

  const kind = (media.kind || "image").toLowerCase();
  const normalized = {
    ...media,
    kind,
    id: media.id || `${prefix}_${kind === "gallery" ? "gallery" : kind}_1`,
  };

  if (kind === "gallery") {
    normalized.items = (media.items || []).map((item, index) => ({
      ...item,
      id: item.id || `${normalized.id}_item_${index + 1}`,
    }));
  }

  return normalized;
}

function normalizeColumn(column, prefix) {
  if (!column) return null;

  return {
    ...column,
    leadId: column.lead ? column.leadId || `${prefix}_lead` : "",
    htmlId: column.html ? column.htmlId || `${prefix}_legacy_html` : "",
    bullets: normalizeList(column.bullets, `${prefix}_bullet`),
    paragraphs: normalizeList(column.paragraphs, `${prefix}_paragraph`),
    media: normalizeMedia(column.media, prefix),
  };
}

function deriveSlideSeed(slide, index) {
  return (
    slide.id ||
    slide.slideId ||
    slide.title ||
    slide.question ||
    slide.hud ||
    `${slide.type || "slide"}_${index + 1}`
  );
}

export function normalizeSlidesData(slidesData, options = {}) {
  const topicId = options.topicId || "topic";
  const uniqifySlideId = createUniqifier();

  return (slidesData || []).map((slide, index) => {
    const slideId =
      slide.id ||
      slide.slideId ||
      uniqifySlideId(deriveSlideSeed(slide, index), `slide_${index + 1}`);

    const normalized = {
      ...slide,
      id: slide.id || slideId,
      slideId,
      topicId,
      slideIndex: index,
      slideType: slide.type || "unknown",
    };

    if (normalized.type === "title") {
      normalized.titleId = normalized.title ? "title" : "";
      normalized.subtitleId = normalized.subtitle ? "subtitle" : "";
      normalized.metaId = normalized.meta ? "meta" : "";
      return normalized;
    }

    if (normalized.type === "bullets") {
      normalized.titleId = normalized.title ? "title" : "";
      normalized.leadId = normalized.lead ? "lead" : "";
      normalized.bullets = normalizeList(normalized.bullets, "bullet");
      return normalized;
    }

    if (normalized.type === "text") {
      normalized.titleId = normalized.title ? "title" : "";
      normalized.leadId = normalized.lead ? "lead" : "";
      normalized.paragraphs = normalizeList(normalized.paragraphs, "paragraph");
      return normalized;
    }

    if (normalized.type === "two-col") {
      normalized.titleId = normalized.title ? "title" : "";
      normalized.left = normalizeColumn(normalized.left, "left");
      normalized.right = normalizeColumn(normalized.right, "right");
      return normalized;
    }

    if (normalized.type === "mcq") {
      normalized.titleId = normalized.title ? "title" : "";
      normalized.questionId = normalized.question ? "question" : "";
      normalized.feedbackId = "feedback";
      normalized.options = (normalized.options || []).map((option, optionIndex) => {
        const choiceSeed = option.choice || optionIndex + 1;
        return {
          ...option,
          id: option.id || `option_${slugify(choiceSeed, String(optionIndex + 1))}`,
        };
      });
      return normalized;
    }

    normalized.htmlId = normalized.html ? "legacy_html" : "";
    return normalized;
  });
}

export function buildTopicRuntime({ topicMeta = null, slidesData = [], topicFallback = "" }) {
  const topicId = topicMeta?.id || slugify(topicFallback || topicMeta?.title || "topic", "topic");
  return {
    topicId,
    topicMeta,
    slides: normalizeSlidesData(slidesData, { topicId }),
  };
}

export { stripRichText, slugify };
