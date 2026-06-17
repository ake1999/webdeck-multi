export const SCRIPT_WRITER_PROMPT_VERSION = "script_writer_v3";

export const DELIVERY_KINDS = [
  "introduce",
  "explain",
  "compare",
  "recap",
  "demo",
  "quiz_prompt",
  "caution",
];

const ALLOWED_SEGMENT_KEYS = new Set([
  "segment_id",
  "text",
  "target_element",
  "tone",
  "energy",
  "pace",
  "emphasis_words",
  "attention_mode",
  "avatar_behavior_hint",
  "delivery_kind",
]);

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isNumber(value) {
  return Number.isFinite(Number(value));
}

export function buildScriptWriterJsonSchema() {
  return {
    type: "object",
    additionalProperties: false,
    required: ["segments"],
    properties: {
      segments: {
        type: "array",
        minItems: 1,
        maxItems: 8,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["segment_id", "text", "target_element", "tone", "energy", "pace"],
          properties: {
            segment_id: { type: "string", minLength: 1 },
            text: { type: "string", minLength: 1 },
            target_element: { type: "string", minLength: 1 },
            tone: { type: "string", minLength: 1 },
            energy: { type: "number" },
            pace: { type: "number" },
            emphasis_words: {
              type: "array",
              items: { type: "string" },
            },
            attention_mode: { type: "string" },
            avatar_behavior_hint: { type: "string" },
            delivery_kind: {
              type: "string",
              enum: DELIVERY_KINDS,
            },
          },
        },
      },
      generation_warnings: {
        type: "array",
        items: { type: "string" },
      },
    },
  };
}

export function validateScriptWriterPayload(payload) {
  const errors = [];
  if (!isObject(payload)) {
    return {
      valid: false,
      errors: ["Payload must be a JSON object."],
      normalized: null,
    };
  }

  if (!Array.isArray(payload.segments) || !payload.segments.length) {
    return {
      valid: false,
      errors: ["Payload must contain a non-empty segments array."],
      normalized: null,
    };
  }

  const normalizedSegments = payload.segments.map((segment, index) => {
    const location = `segments[${index}]`;
    if (!isObject(segment)) {
      errors.push(`${location} must be an object.`);
      return null;
    }

    Object.keys(segment).forEach((key) => {
      if (!ALLOWED_SEGMENT_KEYS.has(key)) {
        errors.push(`${location}.${key} is not allowed.`);
      }
    });

    for (const key of ["segment_id", "text", "target_element", "tone"]) {
      if (!isNonEmptyString(segment[key])) {
        errors.push(`${location}.${key} must be a non-empty string.`);
      }
    }
    for (const key of ["energy", "pace"]) {
      if (!isNumber(segment[key])) {
        errors.push(`${location}.${key} must be numeric.`);
      }
    }

    if (segment.attention_mode != null && !isNonEmptyString(segment.attention_mode)) {
      errors.push(`${location}.attention_mode must be a non-empty string when present.`);
    }
    if (segment.avatar_behavior_hint != null && !isNonEmptyString(segment.avatar_behavior_hint)) {
      errors.push(`${location}.avatar_behavior_hint must be a non-empty string when present.`);
    }
    if (segment.delivery_kind != null && !DELIVERY_KINDS.includes(segment.delivery_kind)) {
      errors.push(`${location}.delivery_kind must be one of ${DELIVERY_KINDS.join(", ")}.`);
    }
    if (segment.emphasis_words != null && !Array.isArray(segment.emphasis_words)) {
      errors.push(`${location}.emphasis_words must be an array when present.`);
    }

    return {
      segment_id: String(segment.segment_id || "").trim(),
      text: String(segment.text || "").trim(),
      target_element: String(segment.target_element || "").trim(),
      tone: String(segment.tone || "").trim(),
      energy: Number(segment.energy),
      pace: Number(segment.pace),
      emphasis_words: asArray(segment.emphasis_words)
        .map((item) => String(item || "").trim())
        .filter(Boolean),
      ...(isNonEmptyString(segment.attention_mode) ? { attention_mode: segment.attention_mode.trim() } : {}),
      ...(isNonEmptyString(segment.avatar_behavior_hint)
        ? { avatar_behavior_hint: segment.avatar_behavior_hint.trim() }
        : {}),
      ...(DELIVERY_KINDS.includes(segment.delivery_kind) ? { delivery_kind: segment.delivery_kind } : {}),
    };
  }).filter(Boolean);

  if (payload.generation_warnings != null && !Array.isArray(payload.generation_warnings)) {
    errors.push("generation_warnings must be an array when present.");
  }

  return {
    valid: errors.length === 0,
    errors,
    normalized: errors.length
      ? null
      : {
        segments: normalizedSegments,
        generation_warnings: asArray(payload.generation_warnings)
          .map((item) => String(item || "").trim())
          .filter(Boolean),
      },
  };
}
