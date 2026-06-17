import {
  cleanNarrationSeed,
  defaultAttentionMode,
  defaultVoiceForSlide,
  ensureSentence,
  hasCodeFence,
  plainTextForSpeech,
  plainTextSummary,
  summarizeMediaLabel,
} from "./utils.mjs";
import {
  applyTtsNormalizationToScriptManifest,
  attachTtsTextToSegment,
} from "./tts_normalization.mjs";
import { getCourseConfig } from "../../../shared/course_catalog.js";
import { getCourseTerminology } from "../../../shared/course_labels.js";
import {
  extractExplicitLecturePlanNarrationSource,
  extractLecturePlanGuidanceSource,
  extractLegacyNarrationSource,
  extractSlidesAuthoredNarrationSource,
  normalizeNarrationSourceToRawSegments,
} from "./script_providers/deterministic.mjs";
import { extractScriptOverrideSource } from "./script_providers/script_override.mjs";
import {
  allowLlmLocal,
  allowScriptFallback,
  allowScriptOverrides,
  defaultScriptProvider,
  generateLlmLocalSegmentsWithCache,
  normalizeScriptProviderMode,
} from "./script_provider.mjs";
import { SCRIPT_WRITER_PROMPT_VERSION } from "./llm_schema.mjs";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function pickDefined(source, keys) {
  const picked = {};
  keys.forEach((key) => {
    if (source?.[key] != null && source[key] !== "") {
      picked[key] = source[key];
    }
  });
  return picked;
}

function normalizePhrase(value) {
  return plainTextSummary(value).toLowerCase();
}

function mergeVoiceDefaults(slideType, options, authoring, planSlide) {
  const topicDefaults = authoring?.topicDefaults || {};
  const styleKey = planSlide?.voice_style || topicDefaults.voice_style || options.voiceStyle || "";
  const stylePreset = styleKey
    ? authoring?.voiceStyles?.[styleKey] || {}
    : {};

  const merged = {
    ...defaultVoiceForSlide(slideType, options.voice),
    ...(authoring?.avatarProfile?.voice?.defaults || {}),
    ...pickDefined(topicDefaults, ["tone", "energy", "pace", "pitch", "instruction"]),
    ...pickDefined(stylePreset, ["tone", "energy", "pace", "pitch", "instruction"]),
    ...pickDefined(planSlide, ["tone", "energy", "pace", "pitch", "instruction"]),
    ...pickDefined(options, ["providerVoice"]),
  };

  if (styleKey) merged.voice_style = styleKey;
  if (options.voiceName && !merged.provider_voice) {
    merged.provider_voice = options.voiceName;
  }

  return merged;
}

function emphasisWordsForSegment(segmentText, planSlide) {
  const emphasisWords = asArray(planSlide?.emphasis_words).filter(Boolean);
  if (!emphasisWords.length) return [];
  const segmentKey = normalizePhrase(segmentText);
  return emphasisWords.filter((word) => segmentKey.includes(normalizePhrase(word)));
}

function addTarget(queue, availableIds, entry) {
  if (!entry?.id) return;
  if (!availableIds.has(entry.id)) return;
  queue.push(entry);
}

function buildLayoutContext(layoutSlide) {
  const elementsById = new Map();
  const childrenByParentId = new Map();

  asArray(layoutSlide?.elements).forEach((element) => {
    elementsById.set(element.id, element);
    if (!element.parent_id) return;
    const bucket = childrenByParentId.get(element.parent_id) || [];
    bucket.push(element);
    childrenByParentId.set(element.parent_id, bucket);
  });

  return {
    elementsById,
    childrenByParentId,
    availableIds: new Set(["slide", ...elementsById.keys()]),
  };
}

function preferredTargetId(layoutContext, id, options = {}) {
  if (!id) return "slide";
  if (!layoutContext.availableIds.has(id)) return "slide";
  if (!options.preferChild) return id;

  const children = layoutContext.childrenByParentId.get(id) || [];
  const preferred = children.find((element) => ["code", "math"].includes(element.type));
  return preferred?.id || id;
}

function blockLabel(block) {
  const pieces = [
    block?.title,
    block?.text,
    block?.formula,
    block?.prompt,
    block?.problem,
    ...asArray(block?.items).map((item) => item.text || item.say || ""),
    ...asArray(block?.steps).flatMap((item) => {
      const parts = asArray(item?.parts).map((part) => part.math || part.text || "");
      if (parts.length) return [item.math, ...parts, item.say].filter(Boolean);
      return [item.math || item.text || item.say || ""];
    }),
    ...asArray(block?.pairs).map((item) => `${item.label || ""} ${item.text || ""}`),
  ];
  return plainTextSummary(pieces.filter(Boolean).join(" "));
}

function addBlockTargets(push, blocks, layoutContext) {
  asArray(blocks).forEach((block) => {
    push({
      id: block.id,
      type: block.type || "block",
      label: blockLabel(block),
    });
    asArray(block.steps).forEach((step) => {
      const isMathSolution = String(block.type || "").toLowerCase() === "math_solution_steps";
      push({
        id: step.id,
        type: isMathSolution ? "math_solution_step" : "step",
        label: plainTextSummary(isMathSolution ? (step.say || step.math || step.text) : (step.say || step.text)),
      });
    });
    asArray(block.items).forEach((item) => {
      push({
        id: item.id,
        type: "bullet",
        label: plainTextSummary(item.say || item.text),
      });
    });
    asArray(layoutContext.childrenByParentId.get(block.id)).forEach((child) => {
      if (["math", "code", "table_cell", "compare_text", "reveal"].includes(child.type)) {
        push({
          id: child.id,
          type: child.type,
          label: child.label || blockLabel(block),
        });
      }
    });
  });
}

function buildTargetQueue(slide, rawSlide, layoutContext) {
  const queue = [];
  const push = (entry) => addTarget(queue, layoutContext.availableIds, entry);

  push({
    id: slide.titleId,
    type: "title",
    label: plainTextSummary(rawSlide.title),
  });

  if (slide.type === "title") {
    push({
      id: slide.subtitleId,
      type: "subtitle",
      label: plainTextSummary(rawSlide.subtitle),
    });
    push({
      id: slide.metaId,
      type: "meta",
      label: plainTextSummary(rawSlide.meta),
    });
    return queue;
  }

  if (slide.type === "bullets") {
    push({
      id: slide.leadId,
      type: "lead",
      label: plainTextSummary(rawSlide.lead),
    });
    asArray(slide.bullets).forEach((item, index) => {
      push({
        id: preferredTargetId(layoutContext, item.id, {
          preferChild: hasCodeFence(asArray(rawSlide.bullets)[index]?.text || asArray(rawSlide.bullets)[index]),
        }),
        type: "bullet",
        label: plainTextSummary(item.say || item.text),
      });
    });
    return queue;
  }

  if (slide.type === "text") {
    push({
      id: slide.questionId,
      type: "question",
      label: plainTextSummary(rawSlide.questionSay || rawSlide.question),
    });
    push({
      id: slide.leadId,
      type: "lead",
      label: plainTextSummary(rawSlide.lead),
    });
    asArray(slide.paragraphs).forEach((item) => {
      push({
        id: item.id,
        type: "paragraph",
        label: plainTextSummary(item.say || item.text),
      });
    });
    addBlockTargets(push, slide.blocks, layoutContext);
    if (slide.media?.id) {
      push({
        id: slide.media.id,
        type: slide.media.kind || "image",
        label: summarizeMediaLabel(slide.media),
      });
    }
    return queue;
  }

  if (slide.type === "visual_lab") {
    push({
      id: slide.questionId,
      type: "question",
      label: plainTextSummary(rawSlide.questionSay || rawSlide.question),
    });
    push({
      id: slide.leadId,
      type: "lead",
      label: plainTextSummary(rawSlide.lead),
    });
    addBlockTargets(push, slide.blocks, layoutContext);
    if (slide.media?.id) {
      push({
        id: slide.media.id,
        type: slide.media.kind || "widget",
        label: summarizeMediaLabel(slide.media),
      });
    }
    return queue;
  }

  if (slide.type === "two-col") {
    push({
      id: slide.questionId,
      type: "question",
      label: plainTextSummary(rawSlide.questionSay || rawSlide.question),
    });
    [slide.left, slide.right].forEach((column) => {
      if (!column) return;
      push({
        id: column.leadId,
        type: "lead",
        label: plainTextSummary(column.lead),
      });
      asArray(column.bullets).forEach((item) => {
        push({
          id: item.id,
          type: "bullet",
          label: plainTextSummary(item.say || item.text),
        });
      });
      asArray(column.paragraphs).forEach((item) => {
        push({
          id: item.id,
          type: "paragraph",
          label: plainTextSummary(item.say || item.text),
        });
      });
      addBlockTargets(push, column.blocks, layoutContext);
      if (column.media?.id) {
        push({
          id: column.media.id,
          type: column.media.kind || "image",
          label: summarizeMediaLabel(column.media),
        });
      }
    });
    return queue;
  }

  if (slide.type === "mcq") {
    push({
      id: slide.questionId,
      type: "question",
      label: plainTextSummary(rawSlide.questionSay || rawSlide.question),
    });
    asArray(slide.options).forEach((item) => {
      push({
        id: item.id,
        type: "option",
        label: plainTextSummary(item.label),
      });
    });
    push({
      id: slide.feedbackId,
      type: "feedback",
      label: plainTextSummary(rawSlide.explain),
    });
  }

  return queue;
}

function mergeSegmentVoice(segment, slideDefaults) {
  return {
    ...slideDefaults.voice,
    ...pickDefined(segment, ["tone", "energy", "pace", "pitch", "instruction", "voice_style"]),
    ...(segment.voice || {}),
  };
}

function uniqueStrings(values) {
  return [...new Set(asArray(values).map((item) => String(item || "").trim()).filter(Boolean))];
}

function topicPlanEntry(topicScriptPlan, slideId) {
  return asArray(topicScriptPlan?.slides).find((item) => item.slide_id === slideId) || null;
}

function compactSpokenExcerpt(segments, maxChars = 320) {
  const text = asArray(segments).map((segment) => segment.text).filter(Boolean).join(" ");
  if (text.length <= maxChars) return text;
  return text.slice(-maxChars).replace(/^\S+\s+/, "").trim();
}

function acceptedSlideMemory({ slide, rawSlide, segments, topicScriptPlan }) {
  const planEntry = topicPlanEntry(topicScriptPlan, slide.slideId);
  const spoken = asArray(segments).map((segment) => segment.text).filter(Boolean).join(" ");
  return {
    slide_id: slide.slideId,
    title: plainTextSummary(rawSlide?.title || slide.slideId),
    speaking_goal: planEntry?.speaking_goal || "",
    student_memory: planEntry?.student_memory || plainTextSummary(spoken).slice(0, 220),
    spoken_summary: plainTextSummary(spoken).slice(0, 260),
  };
}

function continuityContextForSlide({ index, runtime, topicScriptPlan, acceptedMemories, lastSpokenExcerpt }) {
  const previousMemory = acceptedMemories[acceptedMemories.length - 1] || null;
  const nextSlide = runtime.slides[index + 1] || null;
  const nextPlan = nextSlide ? topicPlanEntry(topicScriptPlan, nextSlide.slideId) : null;
  return {
    slide_position: index === 0 ? "first" : index === runtime.slides.length - 1 ? "final" : "middle",
    previous_slide_summary: previousMemory
      ? `${previousMemory.title}: ${previousMemory.spoken_summary || previousMemory.student_memory}`
      : "",
    last_spoken_excerpt: lastSpokenExcerpt || "",
    prior_topic_memory: acceptedMemories.slice(-6),
    next_slide_intent: nextPlan?.speaking_goal || nextPlan?.bridge_in || "",
  };
}

function finalizeSegments(segments, slide, layoutContext, slideDefaults, planSlide, options) {
  const maxSegments = Number(options.maxSegmentsPerSlide) || 8;
  const finalized = segments
    .map((segment, index) => {
      const text = cleanNarrationSeed(segment.text);
      if (!text) return null;
      const targetElement = layoutContext.availableIds.has(segment.target_element)
        ? segment.target_element
        : "slide";
      const targetType = targetElement === "slide"
        ? "slide"
        : layoutContext.elementsById.get(targetElement)?.type || "element";
      const emphasisWords = uniqueStrings([
        ...asArray(segment.emphasis_words || segment.emphasisWords),
        ...emphasisWordsForSegment(text, planSlide),
      ]);
      const deliveryKind = inferDeliveryKind({
        segment,
        planSlide,
        targetType,
        slide,
        index,
        total: segments.length,
      });
      const avatarBehaviorHint = inferAvatarBehaviorHint({
        segment,
        deliveryKind,
        targetType,
        slide,
        index,
        total: segments.length,
      });
      return attachTtsTextToSegment({
        segment_id: `seg_${String(index + 1).padStart(2, "0")}`,
        text: ensureSentence(text),
        target_element: targetElement,
        attention_mode: segment.attention_mode || slideDefaults.attention_mode || defaultAttentionMode(targetType),
        voice: mergeSegmentVoice(segment, slideDefaults),
        ...(emphasisWords.length ? { emphasis_words: emphasisWords } : {}),
        ...(avatarBehaviorHint ? { avatar_behavior_hint: avatarBehaviorHint } : {}),
        ...(deliveryKind ? { delivery_kind: deliveryKind } : {}),
      });
    })
    .filter(Boolean);

  if (finalized.length <= maxSegments) return finalized;
  const head = finalized.slice(0, maxSegments - 1);
  const tail = finalized.slice(maxSegments - 1);
  head.push(attachTtsTextToSegment({
    ...tail[0],
    segment_id: `seg_${String(maxSegments).padStart(2, "0")}`,
    text: ensureSentence(tail.map((segment) => segment.text).join(" ")),
  }));
  return head;
}

function inferDeliveryKind({ segment, planSlide, targetType, slide, index, total }) {
  if (segment?.delivery_kind) return String(segment.delivery_kind).trim();
  const role = String(planSlide?.slide_role || "").toLowerCase();
  const strategy = String(planSlide?.teacher_strategy || "").toLowerCase();
  const voiceStyle = String(planSlide?.voice_style || segment?.voice?.voice_style || "").toLowerCase();
  if (index === 0 && slide.type === "title") return "introduce";
  if (index === total - 1 && (role.includes("exit") || role.includes("recap"))) return "recap";
  if (role.includes("caution") || segment?.voice?.tone === "serious_clear") return "caution";
  if (strategy.includes("compare") || voiceStyle.includes("compare")) return "compare";
  if (role.includes("demo") || ["image", "iframe", "widget", "calculus_widget", "video"].includes(targetType)) return "demo";
  if (role.includes("practice") || slide.type === "mcq") return "quiz_prompt";
  if (role.includes("recap") || role.includes("exit")) return "recap";
  return "explain";
}

function inferAvatarBehaviorHint({ segment, deliveryKind, targetType, slide, index, total }) {
  if (typeof segment?.avatar_behavior_hint === "string" && segment.avatar_behavior_hint.trim()) {
    return segment.avatar_behavior_hint.trim();
  }
  if (deliveryKind === "introduce" || deliveryKind === "quiz_prompt") return "face_viewer";
  if (deliveryKind === "caution") return "emphasize";
  if (deliveryKind === "compare" || deliveryKind === "recap") return "explain_open_hand";
  if (index === total - 1 && slide.type !== "mcq") return "explain_open_hand";
  if (["title", "slide", "subtitle"].includes(targetType)) return "";
  return "";
}

function warningForFallback(sourceKind) {
  return sourceKind === "generated_content"
    ? "No authored narration was present, so the script was generated from visible slide content."
    : "The authored narration did not produce usable segments, so the script fell back to visible slide content.";
}

function applyNarrationSource({
  narrationSource,
  slide,
  rawSlide,
  layoutContext,
  targetQueue,
  slideDefaults,
  planSlide,
  options,
}) {
  return normalizeNarrationSourceToRawSegments({
    narrationSource,
    slide,
    rawSlide,
    layoutContext,
    targetQueue,
    slideDefaults,
    planSlide,
    options,
    preferredTargetId,
  });
}

function deterministicSourceResult({
  narrationSource,
  slide,
  rawSlide,
  layoutContext,
  targetQueue,
  slideDefaults,
  planSlide,
  options,
}) {
  let rawSegments = applyNarrationSource({
    narrationSource,
    slide,
    rawSlide,
    layoutContext,
    targetQueue,
    slideDefaults,
    planSlide,
    options,
  });
  const generationWarnings = [];

  if (!rawSegments.length) {
    rawSegments = applyNarrationSource({
      narrationSource: { kind: "generated_content", value: "" },
      slide,
      rawSlide,
      layoutContext,
      targetQueue,
      slideDefaults,
      planSlide,
      options,
    });
    generationWarnings.push(warningForFallback(narrationSource.kind));
  }

  return {
    script_source: narrationSource.kind,
    provider_used: "deterministic",
    model_used: "",
    prompt_version: "",
    raw_segments: rawSegments,
    generation_warnings: generationWarnings,
    fallback_reason: "",
    cache_used: false,
  };
}

function generatedContentResult({
  slide,
  rawSlide,
  layoutContext,
  targetQueue,
  slideDefaults,
  planSlide,
  options,
}) {
  const rawSegments = normalizeNarrationSourceToRawSegments({
    narrationSource: { kind: "generated_content", value: "" },
    slide,
    rawSlide,
    layoutContext,
    targetQueue,
    slideDefaults,
    planSlide,
    options,
    preferredTargetId,
  });
  return {
    script_source: "generated_content",
    provider_used: "deterministic",
    model_used: "",
    prompt_version: "",
    raw_segments: rawSegments,
    generation_warnings: [warningForFallback("generated_content")],
    fallback_reason: "",
    cache_used: false,
  };
}

function buildFallbackVariant(result, override = {}) {
  return {
    available: false,
    provider_used: override.provider_used || result?.provider_used || "",
    model_used: override.model_used || result?.model_used || "",
    prompt_version: override.prompt_version || result?.prompt_version || "",
    script_source: override.script_source || result?.script_source || "",
    fallback_reason: override.fallback_reason || result?.fallback_reason || "",
    segments: asArray(override.segments),
    generation_warnings: asArray(override.generation_warnings),
    cache_used: Boolean(override.cache_used),
  };
}

function shouldIncludeComparison(descriptor, options) {
  if (options.forceScriptComparison === true || options.forceScriptComparison === "1") return true;
  return (
    descriptor.school === "AC"
    && descriptor.course === "ROB9205_Industrial_Robots_W2026"
    && descriptor.session === "S02"
    && descriptor.topic === "03_robot_characteristics_manipulator_types"
  );
}

async function resolveRawSegments({
  descriptor,
  runtime,
  slidesData,
  index,
  slide,
  rawSlide,
  planSlide,
  overrideSlide,
  layoutSlide,
  layoutContext,
  targetQueue,
  slideDefaults,
  authoring,
  topicScriptPlan,
  continuityContext,
  options,
}) {
  const providerMode = normalizeScriptProviderMode(options.scriptProvider, defaultScriptProvider());
  const scriptFallbackAllowed = allowScriptFallback(options.allowScriptFallback, true);
  const explicitPlanSource = extractExplicitLecturePlanNarrationSource(planSlide);
  const overrideSource = allowScriptOverrides(providerMode)
    ? extractScriptOverrideSource(overrideSlide)
    : null;
  const guidanceSource = extractLecturePlanGuidanceSource(planSlide);
  const slidesSource = extractSlidesAuthoredNarrationSource(rawSlide);
  const comparison = {};
  let llmAttemptError = "";
  let overrideAttemptError = "";
  let llmVariant = null;

  if (overrideSource) {
    const overrideDefaults = {
      voice: mergeVoiceDefaults(slide.type, options, authoring, {
        ...(planSlide || {}),
        ...(overrideSlide?.voice_style ? { voice_style: overrideSlide.voice_style } : {}),
      }),
      attention_mode: planSlide?.attention_mode
        || authoring?.topicDefaults?.attention_mode
        || null,
    };
    const result = {
      script_source: overrideSource.kind,
      provider_used: "script_override",
      model_used: "",
      prompt_version: "",
      raw_segments: applyNarrationSource({
        narrationSource: overrideSource,
        slide,
        rawSlide,
        layoutContext,
        targetQueue,
        slideDefaults: overrideDefaults,
        planSlide,
        options,
      }),
      generation_warnings: [],
      fallback_reason: "",
      cache_used: false,
      comparison_defaults: overrideDefaults,
    };
    if (result.raw_segments.length) {
      return { result, providerMode, comparison, llmAttemptError };
    }
    overrideAttemptError = "script_override did not produce usable segments.";
    if (providerMode === "script_override" && !scriptFallbackAllowed) {
      throw new Error(`${overrideAttemptError} for ${slide.slideId}`);
    }
  }

  if (explicitPlanSource) {
    const result = deterministicSourceResult({
      narrationSource: explicitPlanSource,
      slide,
      rawSlide,
      layoutContext,
      targetQueue,
      slideDefaults,
      planSlide,
      options,
    });
    return { result, providerMode, comparison, llmAttemptError };
  }

  if (allowLlmLocal(providerMode)) {
    const scriptModel = String(options.scriptModel || "").trim();
    if (scriptModel) {
      try {
        const llmResult = await generateLlmLocalSegmentsWithCache({
          descriptor,
          runtime,
          slidesData,
          index,
          slide,
          rawSlide,
          planSlide,
          authoring,
          layoutSlide,
          targetQueue,
          slideDefaults,
          overrideSlide,
          topicScriptPlan,
          continuityContext,
          options,
        });
        llmVariant = {
          script_source: "llm_local",
          provider_used: llmResult.provider_used,
          model_used: llmResult.model_used,
          prompt_version: llmResult.prompt_version,
          raw_segments: llmResult.segments,
          generation_warnings: llmResult.generation_warnings || [],
          fallback_reason: "",
          cache_used: Boolean(llmResult.cache_used),
        };
        return {
          result: llmVariant,
          providerMode,
          comparison,
          llmAttemptError,
        };
      } catch (error) {
        llmAttemptError = error?.message || String(error);
        if (providerMode === "llm_local" && !scriptFallbackAllowed) {
          throw new Error(`llm_local failed for ${slide.slideId}: ${llmAttemptError}`);
        }
      }
    } else if (providerMode === "llm_local" && !scriptFallbackAllowed) {
      throw new Error(`llm_local requires --scriptModel for slide ${slide.slideId}`);
    } else if (providerMode === "llm_local") {
      llmAttemptError = `No scriptModel was configured for slide ${slide.slideId}.`;
    }
  }

  const fallbackSource = guidanceSource || slidesSource || { kind: "generated_content", value: "" };
  const fallbackResult = fallbackSource.kind === "generated_content"
    ? generatedContentResult({
      slide,
      rawSlide,
      layoutContext,
      targetQueue,
      slideDefaults,
      planSlide,
      options,
    })
    : deterministicSourceResult({
      narrationSource: fallbackSource,
      slide,
      rawSlide,
      layoutContext,
      targetQueue,
      slideDefaults,
      planSlide,
      options,
    });

  if (llmAttemptError) {
    fallbackResult.fallback_reason = llmAttemptError;
    fallbackResult.generation_warnings = uniqueStrings([
      ...fallbackResult.generation_warnings,
      `llm_local fallback: ${llmAttemptError}`,
    ]);
  }
  if (overrideAttemptError) {
    fallbackResult.fallback_reason = fallbackResult.fallback_reason
      ? `${overrideAttemptError}; ${fallbackResult.fallback_reason}`
      : overrideAttemptError;
    fallbackResult.generation_warnings = uniqueStrings([
      ...fallbackResult.generation_warnings,
      overrideAttemptError,
    ]);
  }

  if (llmVariant) {
    comparison.llm_local = llmVariant;
  } else if (allowLlmLocal(providerMode)) {
    comparison.llm_local = {
      script_source: "llm_local",
      provider_used: "llm_local",
      model_used: String(options.scriptModel || "").trim(),
      prompt_version: String(options.scriptPromptVersion || SCRIPT_WRITER_PROMPT_VERSION).trim() || SCRIPT_WRITER_PROMPT_VERSION,
      raw_segments: [],
      generation_warnings: [],
      fallback_reason: llmAttemptError || "llm_local was not selected for this slide.",
      cache_used: false,
    };
  }

  return { result: fallbackResult, providerMode, comparison, llmAttemptError };
}

function finalizeComparisonVariant({
  result,
  slide,
  layoutContext,
  slideDefaults,
  planSlide,
  options,
}) {
  if (!result) return null;
  const finalized = finalizeSegments(
    asArray(result.raw_segments),
    slide,
    layoutContext,
    result.comparison_defaults || slideDefaults,
    planSlide,
    options,
  );
  return {
    available: finalized.length > 0,
    provider_used: result.provider_used || "",
    model_used: result.model_used || "",
    prompt_version: result.prompt_version || "",
    script_source: result.script_source || "",
    fallback_reason: result.fallback_reason || "",
    generation_warnings: asArray(result.generation_warnings),
    cache_used: Boolean(result.cache_used),
    segments: finalized.map((segment) => ({
      segment_id: segment.segment_id,
      text: segment.text,
      ...(segment.tts_text ? { tts_text: segment.tts_text } : {}),
      target_element: segment.target_element,
      tone: segment.voice?.tone || "",
      energy: Number(segment.voice?.energy || 0),
      pace: Number(segment.voice?.pace || 0),
      emphasis_words: asArray(segment.emphasis_words),
    })),
  };
}

export async function generateScriptManifest({
  descriptor,
  runtime,
  slidesData,
  layoutManifest,
  authoring = null,
  topicScriptPlan = null,
  options = {},
}) {
  const scriptSlides = [];
  const comparisonSlides = [];
  const acceptedMemories = [];
  let lastSpokenExcerpt = "";

  for (const [index, slide] of runtime.slides.entries()) {
    if (options.logScriptProgress !== false) {
      console.error(`Writing script slide ${index + 1}/${runtime.slides.length}: ${slide.slideId}`);
    }
    const rawSlide = slidesData[index] || {};
    const planSlide = authoring?.slidePlansById?.[slide.slideId] || null;
    const overrideSlide = authoring?.scriptOverridesById?.[slide.slideId] || null;
    const layoutSlide = asArray(layoutManifest?.slides).find((item) => item.slide_id === slide.slideId) || {
      slide_id: slide.slideId,
      elements: [],
    };
    const layoutContext = buildLayoutContext(layoutSlide);
    const targetQueue = buildTargetQueue(slide, rawSlide, layoutContext);
    const warnings = [];
    const slideDefaults = {
      voice: mergeVoiceDefaults(slide.type, options, authoring, planSlide),
      attention_mode: planSlide?.attention_mode
        || authoring?.topicDefaults?.attention_mode
        || null,
    };
    const continuityContext = continuityContextForSlide({
      index,
      runtime,
      topicScriptPlan,
      acceptedMemories,
      lastSpokenExcerpt,
    });

    const { result, comparison } = await resolveRawSegments({
      descriptor,
      runtime,
      slidesData,
      index,
      slide,
      rawSlide,
      planSlide,
      overrideSlide,
      layoutSlide,
      layoutContext,
      targetQueue,
      slideDefaults,
      authoring,
      topicScriptPlan,
      continuityContext,
      options,
    });

    const segments = finalizeSegments(
      result.raw_segments,
      slide,
      layoutContext,
      result.comparison_defaults || slideDefaults,
      planSlide,
      options,
    );
    if (!segments.length) {
      segments.push({
        segment_id: "seg_01",
        text: ensureSentence(`This slide covers ${plainTextForSpeech(rawSlide.title || slide.slideId)}.`),
        target_element: slide.titleId || "slide",
        attention_mode: slideDefaults.attention_mode || "slide_focus",
        voice: slideDefaults.voice,
      });
      warnings.push("A fallback segment was inserted because the slide script would otherwise be empty.");
    }

    if (planSlide?.resolved_slide_id !== slide.slideId) {
      warnings.push("Lecture plan entry did not resolve cleanly to this slide, so deck metadata was used as the source of truth.");
    }

    warnings.push(...asArray(result.generation_warnings));

    scriptSlides.push({
      slide_id: slide.slideId,
      slide_type: slide.type,
      script_source: result.script_source,
      provider_used: result.provider_used,
      generation_warnings: uniqueStrings(result.generation_warnings || []),
      cache_used: Boolean(result.cache_used),
      ...(result.model_used ? { model_used: result.model_used } : {}),
      ...(result.prompt_version ? { prompt_version: result.prompt_version } : {}),
      ...(result.fallback_reason ? { fallback_reason: result.fallback_reason } : {}),
      lecture_plan: planSlide
        ? {
          attention_mode: planSlide.attention_mode || authoring?.topicDefaults?.attention_mode || "",
          voice_style: planSlide.voice_style || authoring?.topicDefaults?.voice_style || "",
          slide_role: planSlide.slide_role || "",
          importance: planSlide.importance || "",
          teacher_strategy: planSlide.teacher_strategy || "",
          transition_from_previous: planSlide.transition_from_previous || "",
          transition_to_next: planSlide.transition_to_next || "",
          likely_student_confusion: asArray(planSlide.likely_student_confusion),
          scene_policy: planSlide.scene_policy || "",
          object_policy: planSlide.object_policy || "",
          prop_suggestions: asArray(planSlide.prop_suggestions),
          explanation_style: planSlide.explanation_style || "",
          delivery_goal: planSlide.delivery_goal || "",
          must_cover: asArray(planSlide.must_cover),
          must_say: asArray(planSlide.must_say),
          emphasis_words: asArray(planSlide.emphasis_words),
          ...(planSlide.scene_hint ? { scene_hint: planSlide.scene_hint } : {}),
          ...(planSlide.story_hint ? { story_hint: planSlide.story_hint } : {}),
          avatar_hint: planSlide.avatar_hint || null,
        }
        : null,
      warnings: uniqueStrings(warnings),
      segments,
    });

    acceptedMemories.push(acceptedSlideMemory({
      slide,
      rawSlide,
      segments,
      topicScriptPlan,
    }));
    lastSpokenExcerpt = compactSpokenExcerpt(segments);

    if (shouldIncludeComparison(descriptor, options)) {
      const deterministicVariant = finalizeComparisonVariant({
        result: deterministicSourceResult({
          narrationSource: extractLegacyNarrationSource(rawSlide, planSlide),
          slide,
          rawSlide,
          layoutContext,
          targetQueue,
          slideDefaults,
          planSlide,
          options,
        }),
        slide,
        layoutContext,
        slideDefaults,
        planSlide,
        options,
      });
      const overrideVariant = finalizeComparisonVariant({
        result: overrideSlide
          ? {
            script_source: extractScriptOverrideSource(overrideSlide)?.kind || "script_override",
            provider_used: "script_override",
            model_used: "",
            prompt_version: "",
            raw_segments: applyNarrationSource({
              narrationSource: extractScriptOverrideSource(overrideSlide),
              slide,
              rawSlide,
              layoutContext,
              targetQueue,
              slideDefaults: {
                voice: mergeVoiceDefaults(slide.type, options, authoring, {
                  ...(planSlide || {}),
                  ...(overrideSlide?.voice_style ? { voice_style: overrideSlide.voice_style } : {}),
                }),
                attention_mode: slideDefaults.attention_mode,
              },
              planSlide,
              options,
            }),
          }
          : null,
        slide,
        layoutContext,
        slideDefaults,
        planSlide,
        options,
      });
      const llmVariant = finalizeComparisonVariant({
        result: comparison.llm_local || (result.provider_used === "llm_local" ? result : null),
        slide,
        layoutContext,
        slideDefaults,
        planSlide,
        options,
      });

      comparisonSlides.push({
        slide_id: slide.slideId,
        variants: {
          deterministic: deterministicVariant || buildFallbackVariant(null),
          llm_local: llmVariant || buildFallbackVariant(result, {
            provider_used: "llm_local",
            model_used: String(options.scriptModel || "").trim(),
            prompt_version: String(options.scriptPromptVersion || SCRIPT_WRITER_PROMPT_VERSION).trim() || SCRIPT_WRITER_PROMPT_VERSION,
            script_source: "llm_local",
            fallback_reason: result.provider_used === "llm_local"
              ? ""
              : comparison.llm_local?.fallback_reason || result.fallback_reason || "llm_local was not available for this build.",
          }),
          script_override: overrideVariant || buildFallbackVariant(result, {
            provider_used: "script_override",
            script_source: "script_override",
            fallback_reason: overrideSlide ? "" : "No script override exists for this slide.",
          }),
        },
      });
    }
  }

  const courseTerminology = getCourseTerminology(getCourseConfig(descriptor.course));

  return applyTtsNormalizationToScriptManifest({
    topic_id: runtime.topicId,
    selector: {
      school: descriptor.school,
      course: descriptor.course,
      session: descriptor.session,
      topic: descriptor.topic,
    },
    style: {
      policy: options.scriptPolicy || "teacher_clear_concise",
      max_segments_per_slide: Number(options.maxSegmentsPerSlide) || 8,
      max_words_per_segment: Number(options.maxWordsPerSegment) || 28,
      script_provider_requested: normalizeScriptProviderMode(options.scriptProvider, defaultScriptProvider()),
      topic_plan_used: Boolean(topicScriptPlan),
    },
    authoring: {
      files: authoring?.fileSummary || {},
      warnings: asArray(authoring?.warnings),
    },
    ...(comparisonSlides.length
      ? {
        comparison: {
          pilot_topic: true,
          slides: comparisonSlides,
        },
      }
      : {}),
    slides: scriptSlides,
  }, courseTerminology);
}
