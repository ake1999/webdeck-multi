import { getSlideTypeSet } from "./catalog.mjs";

export const LAYOUT_MANIFEST_SCHEMA_VERSION = "phase1-v1";

export const layoutManifestSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://webdeck.local/schemas/layout.manifest.schema.json",
  title: "WebDeck Layout Manifest",
  description: "Phase 1 deterministic slide layout manifest for AI-directed lecture playback.",
  type: "object",
  required: ["topic_id", "viewport", "slides"],
  additionalProperties: false,
  properties: {
    topic_id: { type: "string", minLength: 1 },
    viewport: {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: { type: "number", exclusiveMinimum: 0 },
    },
    slides: {
      type: "array",
      items: { $ref: "#/$defs/slide" },
    },
  },
  $defs: {
    bbox: {
      type: "array",
      minItems: 4,
      maxItems: 4,
      items: { type: "number" },
    },
    anchor: {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: { type: "number" },
    },
    element: {
      type: "object",
      required: ["id", "type", "parent_id", "label", "order", "bbox", "anchor", "visible"],
      additionalProperties: false,
      properties: {
        id: { type: "string", minLength: 1 },
        type: { type: "string", minLength: 1 },
        parent_id: { type: "string" },
        label: { type: "string" },
        order: { type: "number" },
        bbox: { $ref: "#/$defs/bbox" },
        anchor: { $ref: "#/$defs/anchor" },
        visible: { type: "boolean" },
      },
    },
    zones: {
      type: "object",
      required: ["avatar_safe_left", "avatar_safe_right"],
      additionalProperties: false,
      properties: {
        avatar_safe_left: {
          anyOf: [{ type: "null" }, { $ref: "#/$defs/bbox" }],
        },
        avatar_safe_right: {
          anyOf: [{ type: "null" }, { $ref: "#/$defs/bbox" }],
        },
      },
    },
    slide: {
      type: "object",
      required: ["slide_id", "slide_type", "bbox", "elements", "zones"],
      additionalProperties: false,
      properties: {
        slide_id: { type: "string", minLength: 1 },
        slide_type: { type: "string", minLength: 1 },
        bbox: { $ref: "#/$defs/bbox" },
        elements: {
          type: "array",
          items: { $ref: "#/$defs/element" },
        },
        zones: { $ref: "#/$defs/zones" },
      },
    },
  },
};

function isFiniteNumber(value) {
  return Number.isFinite(value);
}

function isBox(value) {
  return Array.isArray(value) && value.length === 4 && value.every(isFiniteNumber);
}

function isAnchor(value) {
  return Array.isArray(value) && value.length === 2 && value.every(isFiniteNumber);
}

function insideBox(anchor, bbox) {
  return (
    anchor[0] >= bbox[0] &&
    anchor[0] <= bbox[2] &&
    anchor[1] >= bbox[1] &&
    anchor[1] <= bbox[3]
  );
}

function saneBox(bbox) {
  return bbox[2] >= bbox[0] && bbox[3] >= bbox[1];
}

function pushIssue(issues, severity, code, message, location = "", slideId = "") {
  issues.push({ severity, code, message, location, slide_id: slideId });
}

export function validateLayoutManifest(manifest) {
  const issues = [];
  const validSlideTypes = getSlideTypeSet();

  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    pushIssue(issues, "error", "manifest.invalid_root", "Manifest must be an object.", "manifest");
    return issues;
  }

  if (typeof manifest.topic_id !== "string" || !manifest.topic_id.trim()) {
    pushIssue(issues, "error", "manifest.topic_id", "Manifest topic_id must be a non-empty string.", "manifest.topic_id");
  }

  if (!Array.isArray(manifest.viewport) || manifest.viewport.length !== 2) {
    pushIssue(issues, "error", "manifest.viewport", "Manifest viewport must be a [width, height] tuple.", "manifest.viewport");
  } else if (manifest.viewport.some((value) => !isFiniteNumber(value) || value <= 0)) {
    pushIssue(issues, "error", "manifest.viewport_numbers", "Viewport values must be positive numbers.", "manifest.viewport");
  }

  if (!Array.isArray(manifest.slides)) {
    pushIssue(issues, "error", "manifest.slides", "Manifest slides must be an array.", "manifest.slides");
    return issues;
  }

  const seenSlideIds = new Set();
  const viewportWidth = manifest.viewport?.[0] || 0;
  const viewportHeight = manifest.viewport?.[1] || 0;

  manifest.slides.forEach((slide, slideIndex) => {
    const slideLocation = `slides[${slideIndex}]`;
    const currentSlideId = typeof slide?.slide_id === "string" ? slide.slide_id : "";

    if (typeof slide?.slide_id !== "string" || !slide.slide_id.trim()) {
      pushIssue(issues, "error", "slide.slide_id", "Slide must have a non-empty slide_id.", `${slideLocation}.slide_id`, currentSlideId);
    } else if (seenSlideIds.has(slide.slide_id)) {
      pushIssue(issues, "error", "slide.duplicate_id", `Duplicate slide_id "${slide.slide_id}".`, `${slideLocation}.slide_id`, currentSlideId);
    } else {
      seenSlideIds.add(slide.slide_id);
    }

    if (typeof slide?.slide_type !== "string" || !slide.slide_type.trim()) {
      pushIssue(issues, "error", "slide.slide_type", "Slide must have a non-empty slide_type.", `${slideLocation}.slide_type`, currentSlideId);
    } else if (!validSlideTypes.has(slide.slide_type)) {
      pushIssue(issues, "error", "slide.invalid_type", `Unsupported slide_type "${slide.slide_type}".`, `${slideLocation}.slide_type`, currentSlideId);
    }

    if (!isBox(slide?.bbox) || !saneBox(slide.bbox)) {
      pushIssue(issues, "error", "slide.bbox", "Slide bbox must be a sane [x1, y1, x2, y2] tuple.", `${slideLocation}.bbox`, currentSlideId);
    }

    if (isBox(slide?.bbox) && viewportWidth && viewportHeight) {
      if (slide.bbox[0] !== 0 || slide.bbox[1] !== 0) {
        pushIssue(issues, "warning", "slide.bbox_origin", "Slide bbox should start at [0, 0].", `${slideLocation}.bbox`, currentSlideId);
      }
      if (slide.bbox[2] !== viewportWidth || slide.bbox[3] !== viewportHeight) {
        pushIssue(issues, "warning", "slide.bbox_viewport", "Slide bbox should match the export viewport.", `${slideLocation}.bbox`, currentSlideId);
      }
    }

    if (!Array.isArray(slide?.elements)) {
      pushIssue(issues, "error", "slide.elements", "Slide elements must be an array.", `${slideLocation}.elements`, currentSlideId);
    } else {
      const seenElementIds = new Set();

      slide.elements.forEach((element, elementIndex) => {
        const elementLocation = `${slideLocation}.elements[${elementIndex}]`;

        if (typeof element?.id !== "string" || !element.id.trim()) {
          pushIssue(issues, "error", "element.id", "Element must have a non-empty id.", `${elementLocation}.id`, currentSlideId);
        } else if (seenElementIds.has(element.id)) {
          pushIssue(issues, "error", "element.duplicate_id", `Duplicate element id "${element.id}" within slide.`, `${elementLocation}.id`, currentSlideId);
        } else {
          seenElementIds.add(element.id);
        }

        if (typeof element?.type !== "string" || !element.type.trim()) {
          pushIssue(issues, "error", "element.type", "Element must have a non-empty type.", `${elementLocation}.type`, currentSlideId);
        }

        if (typeof element?.parent_id !== "string") {
          pushIssue(issues, "error", "element.parent_id", "Element parent_id must be a string.", `${elementLocation}.parent_id`, currentSlideId);
        }

        if (typeof element?.label !== "string") {
          pushIssue(issues, "error", "element.label", "Element label must be a string.", `${elementLocation}.label`, currentSlideId);
        }

        if (!isFiniteNumber(element?.order)) {
          pushIssue(issues, "error", "element.order", "Element order must be numeric.", `${elementLocation}.order`, currentSlideId);
        }

        if (!isBox(element?.bbox) || !saneBox(element.bbox)) {
          pushIssue(issues, "error", "element.bbox", "Element bbox must be a sane [x1, y1, x2, y2] tuple.", `${elementLocation}.bbox`, currentSlideId);
        } else {
          if (element.bbox[0] < -1 || element.bbox[1] < -1) {
            pushIssue(issues, "warning", "element.bbox_negative", "Element bbox extends above or left of the slide.", `${elementLocation}.bbox`, currentSlideId);
          }
          if (viewportWidth && element.bbox[2] > viewportWidth + 1) {
            pushIssue(issues, "warning", "element.bbox_overflow_x", "Element bbox extends beyond the viewport width.", `${elementLocation}.bbox`, currentSlideId);
          }
          if (viewportHeight && element.bbox[3] > viewportHeight + 1) {
            pushIssue(issues, "warning", "element.bbox_overflow_y", "Element bbox extends beyond the viewport height.", `${elementLocation}.bbox`, currentSlideId);
          }
        }

        if (!isAnchor(element?.anchor)) {
          pushIssue(issues, "error", "element.anchor", "Element anchor must be a [x, y] tuple.", `${elementLocation}.anchor`, currentSlideId);
        } else if (isBox(element?.bbox) && !insideBox(element.anchor, element.bbox)) {
          pushIssue(issues, "error", "element.anchor_outside_bbox", "Element anchor must stay inside the element bbox.", `${elementLocation}.anchor`, currentSlideId);
        }

        if (typeof element?.visible !== "boolean") {
          pushIssue(issues, "error", "element.visible", "Element visible must be boolean.", `${elementLocation}.visible`, currentSlideId);
        }
      });
    }

    if (!slide?.zones || typeof slide.zones !== "object" || Array.isArray(slide.zones)) {
      pushIssue(issues, "error", "slide.zones", "Slide zones must be an object.", `${slideLocation}.zones`, currentSlideId);
    } else {
      for (const zoneId of ["avatar_safe_left", "avatar_safe_right"]) {
        if (!(zoneId in slide.zones)) {
          pushIssue(issues, "error", "slide.zone_missing", `Missing zone "${zoneId}".`, `${slideLocation}.zones.${zoneId}`, currentSlideId);
          continue;
        }

        const zone = slide.zones[zoneId];
        if (zone !== null && (!isBox(zone) || !saneBox(zone))) {
          pushIssue(issues, "error", "slide.zone_bbox", `Zone "${zoneId}" must be null or a sane bbox.`, `${slideLocation}.zones.${zoneId}`, currentSlideId);
        }
      }

      if (slide.zones.avatar_safe_left == null && slide.zones.avatar_safe_right == null) {
        pushIssue(issues, "warning", "slide.no_safe_zone", "Both avatar safe zones are null.", `${slideLocation}.zones`, currentSlideId);
      }
    }
  });

  return issues;
}
