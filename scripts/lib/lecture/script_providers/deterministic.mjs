import {
  bulletLead,
  cleanNarrationSeed,
  defaultAttentionMode,
  ensureSentence,
  extractCodeBlocks,
  hasCodeFence,
  plainTextForSpeech,
  plainTextSummary,
  splitNarrationText,
  summarizeMediaLabel,
  verbalizeCodeBlock,
} from "../utils.mjs";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizePhrase(value) {
  return plainTextSummary(value).toLowerCase();
}

function normalizeCoverageText(value) {
  const text = plainTextForSpeech(value);
  if (!text) return "";
  if (text.split(/\s+/).length <= 3) {
    return ensureSentence(`Make sure you cover ${text.toLowerCase()}`);
  }
  return ensureSentence(text);
}

function compactSegments(segments, maxSegments) {
  if (segments.length <= maxSegments) return segments;
  const head = segments.slice(0, maxSegments - 1);
  const tail = segments.slice(maxSegments - 1);
  head.push({
    ...tail[0],
    target_element: tail[0]?.target_element || "slide",
    text: ensureSentence(tail.map((segment) => segment.text).join(" ")),
  });
  return head;
}

export function lecturePlanHasNarrationGuidance(planSlide) {
  return Boolean(
    Array.isArray(planSlide?.narration)
    || (typeof planSlide?.narration === "string" && planSlide.narration.trim())
    || (typeof planSlide?.narration_seed === "string" && planSlide.narration_seed.trim())
    || asArray(planSlide?.must_cover).length
    || asArray(planSlide?.must_say).length
  );
}

export function extractExplicitLecturePlanNarrationSource(planSlide) {
  if (Array.isArray(planSlide?.narration)) {
    return { kind: "lecture_plan_segments", value: planSlide.narration };
  }

  if (typeof planSlide?.narration === "string" && planSlide.narration.trim()) {
    return { kind: "lecture_plan_text", value: planSlide.narration };
  }

  return null;
}

export function extractLecturePlanGuidanceSource(planSlide) {
  if (!lecturePlanHasNarrationGuidance(planSlide)) return null;

  if (typeof planSlide?.narration_seed === "string" && planSlide.narration_seed.trim()) {
    return { kind: "lecture_plan_guidance", value: planSlide.narration_seed };
  }

  if (asArray(planSlide?.must_cover).length || asArray(planSlide?.must_say).length) {
    return { kind: "lecture_plan_guidance", value: "" };
  }

  return null;
}

export function extractSlidesAuthoredNarrationSource(rawSlide) {
  if (Array.isArray(rawSlide?.narration)) {
    return { kind: "explicit_segments", value: rawSlide.narration };
  }

  if (typeof rawSlide?.narration === "string" && rawSlide.narration.trim()) {
    return { kind: "explicit_text", value: rawSlide.narration };
  }

  if (typeof rawSlide?.narration_seed === "string" && rawSlide.narration_seed.trim()) {
    return { kind: "narration_seed", value: rawSlide.narration_seed };
  }

  if (typeof rawSlide?.teacher_notes === "string" && rawSlide.teacher_notes.trim()) {
    return { kind: "teacher_notes", value: rawSlide.teacher_notes };
  }

  if (rawSlide?.notes && typeof rawSlide.notes === "object" && !Array.isArray(rawSlide.notes)) {
    if (Array.isArray(rawSlide.notes.narration)) {
      return { kind: "explicit_segments", value: rawSlide.notes.narration };
    }
    if (typeof rawSlide.notes.narration === "string" && rawSlide.notes.narration.trim()) {
      return { kind: "explicit_text", value: rawSlide.notes.narration };
    }
    if (typeof rawSlide.notes.narration_seed === "string" && rawSlide.notes.narration_seed.trim()) {
      return { kind: "narration_seed", value: rawSlide.notes.narration_seed };
    }
    if (typeof rawSlide.notes.teacher_notes === "string" && rawSlide.notes.teacher_notes.trim()) {
      return { kind: "teacher_notes", value: rawSlide.notes.teacher_notes };
    }
    if (typeof rawSlide.notes.text === "string" && rawSlide.notes.text.trim()) {
      return { kind: "notes_text", value: rawSlide.notes.text };
    }
  }

  if (typeof rawSlide?.notes === "string" && rawSlide.notes.trim()) {
    return { kind: "notes", value: rawSlide.notes };
  }

  return null;
}

export function extractLegacyNarrationSource(rawSlide, planSlide) {
  return (
    extractExplicitLecturePlanNarrationSource(planSlide)
    || extractLecturePlanGuidanceSource(planSlide)
    || extractSlidesAuthoredNarrationSource(rawSlide)
    || { kind: "generated_content", value: "" }
  );
}

export function normalizeExplicitSegments(segments, targetQueue, slideDefaults, layoutContext, options) {
  return compactSegments(
    asArray(segments)
      .map((segment, index) => {
        const queueTarget = targetQueue[index] || targetQueue.at(-1) || { id: "slide", type: "slide" };
        const explicitTarget = segment.target_element || segment.targetElement || queueTarget.id || "slide";
        const targetElement = layoutContext.availableIds.has(explicitTarget) ? explicitTarget : queueTarget.id || "slide";
        const targetType = targetElement === "slide"
          ? "slide"
          : layoutContext.elementsById.get(targetElement)?.type || queueTarget.type || "element";
        const text = cleanNarrationSeed(segment.text || segment.say || segment.narration || "");
        if (!text) return null;
        return {
          text: ensureSentence(text),
          target_element: targetElement,
          attention_mode: segment.attention_mode
            || segment.attentionMode
            || slideDefaults.attention_mode
            || defaultAttentionMode(targetType),
          voice: {
            ...slideDefaults.voice,
            ...(segment.voice || {}),
          },
          ...(typeof segment.tone === "string" && segment.tone.trim() ? { tone: segment.tone.trim() } : {}),
          ...(Number.isFinite(Number(segment.energy)) ? { energy: Number(segment.energy) } : {}),
          ...(Number.isFinite(Number(segment.pace)) ? { pace: Number(segment.pace) } : {}),
          ...(Array.isArray(segment.emphasis_words) ? { emphasis_words: segment.emphasis_words.filter(Boolean) } : {}),
          ...(typeof segment.avatar_behavior_hint === "string" && segment.avatar_behavior_hint.trim()
            ? { avatar_behavior_hint: segment.avatar_behavior_hint.trim() }
            : {}),
          ...(typeof segment.delivery_kind === "string" && segment.delivery_kind.trim()
            ? { delivery_kind: segment.delivery_kind.trim() }
            : {}),
        };
      })
      .filter(Boolean),
    Number(options.maxSegmentsPerSlide) || 8,
  );
}

export function narrationSegmentsFromText(text, targetQueue, slideDefaults, layoutContext, options) {
  const sentences = splitNarrationText(text, {
    maxSegments: options.maxSegmentsPerSlide,
    maxWordsPerSegment: options.maxWordsPerSegment,
  });

  return sentences.map((sentence, index) => {
    const queueTarget = targetQueue[index] || targetQueue.at(-1) || { id: "slide", type: "slide" };
    const targetType = queueTarget.id === "slide"
      ? "slide"
      : layoutContext.elementsById.get(queueTarget.id)?.type || queueTarget.type || "element";

    return {
      text: ensureSentence(sentence),
      target_element: queueTarget.id || "slide",
      attention_mode: slideDefaults.attention_mode || defaultAttentionMode(targetType),
      voice: slideDefaults.voice,
    };
  });
}

function describeMediaSegment(media, targetId) {
  const label = summarizeMediaLabel(media);
  const kind = String(media?.kind || "image").toLowerCase();
  if (!label) {
    return {
      text: ensureSentence("Use the visual on this slide as the reference for the idea being discussed"),
      target_element: targetId,
    };
  }

  if (kind === "gallery") {
    return {
      text: ensureSentence(`The gallery on this slide gives a visual reference for ${label}`),
      target_element: targetId,
    };
  }

  if (kind === "video") {
    return {
      text: ensureSentence(`The video on this slide demonstrates ${label}`),
      target_element: targetId,
    };
  }

  if (kind === "iframe" || kind === "widget" || kind === "calculus_widget") {
    return {
      text: ensureSentence(`The interactive panel on this slide is meant to explore ${label}`),
      target_element: targetId,
    };
  }

  return {
    text: ensureSentence(`The image on this slide helps illustrate ${label}`),
    target_element: targetId,
  };
}

function describeBulletText(text, index, total) {
  const codeBlocks = extractCodeBlocks(text);
  const plain = plainTextForSpeech(text);
  const lead = bulletLead(index, total);

  if (codeBlocks.length) {
    const intro = plain ? `${lead} ${ensureSentence(plain)}` : "";
    const code = verbalizeCodeBlock(codeBlocks[0]);
    return [intro, code].filter(Boolean).join(" ").trim();
  }

  if (!plain) return ensureSentence("Use this item as a reference point on the slide");
  return ensureSentence(`${lead} ${plain}`);
}

function joinReadable(items) {
  return asArray(items)
    .map((item) => plainTextForSpeech(item))
    .filter(Boolean)
    .slice(0, 4)
    .join(" ");
}

function tableSummary(block) {
  const header = joinReadable(asArray(block?.headers));
  const rows = asArray(block?.rows)
    .slice(0, 2)
    .map((row) => Array.isArray(row) ? row.join(" ") : String(row || ""));
  return [header, joinReadable(rows)].filter(Boolean).join(" ");
}

function blockMainText(block) {
  const parts = [
    block?.title,
    block?.text,
    block?.content,
    block?.formula,
    block?.prompt,
    ...asArray(block?.items).map((item) => item.text || item.say || ""),
    ...asArray(block?.steps).map((step) => step.text || step.say || ""),
    ...asArray(block?.pairs).map((pair) => `${pair.label || ""}: ${pair.text || ""}`),
    block?.reveal?.text,
  ];
  if (block?.type === "math_table") parts.push(tableSummary(block));
  return joinReadable(parts);
}

function describeBlockSegment(block, targetId) {
  const type = String(block?.type || "paragraph").toLowerCase();
  const text = blockMainText(block);
  if (!text) {
    return {
      text: ensureSentence("Use this block as the visible reference for the next idea"),
      target_element: targetId,
    };
  }

  if (type === "formula_block") {
    return {
      text: ensureSentence(`Read this formula as the compact version of the idea: ${text}`),
      target_element: targetId,
    };
  }

  if (type === "derivation_steps") {
    return {
      text: ensureSentence(`Follow the derivation step by step: ${text}`),
      target_element: targetId,
    };
  }

  if (type === "example_solution") {
    return {
      text: ensureSentence(`In this example solution, the important moves are: ${text}`),
      target_element: targetId,
    };
  }

  if (type === "proof_sketch") {
    return {
      text: ensureSentence(`The proof sketch is meant to show the logic, not just the final result: ${text}`),
      target_element: targetId,
    };
  }

  if (type === "theorem_box") {
    return {
      text: ensureSentence(`This theorem box is the statement students should keep in view: ${text}`),
      target_element: targetId,
    };
  }

  if (type === "misconception_compare") {
    return {
      text: ensureSentence(`Compare the tempting mistake with the safer reasoning: ${text}`),
      target_element: targetId,
    };
  }

  if (type === "pause_and_reveal") {
    return {
      text: ensureSentence(`Pause on this prompt before revealing the explanation: ${text}`),
      target_element: targetId,
    };
  }

  if (type === "math_table") {
    return {
      text: ensureSentence(`Use the table to compare the cases: ${text}`),
      target_element: targetId,
    };
  }

  return {
    text: ensureSentence(text),
    target_element: targetId,
  };
}

function appendBlockSegments({ blocks, push, maxItems }) {
  asArray(blocks)
    .slice(0, maxItems)
    .forEach((block) => {
      push(describeBlockSegment(block, block?.id || "slide"));
    });
}

function roleLeadSentence(slide, rawSlide, planSlide) {
  const title = plainTextForSpeech(rawSlide.title || rawSlide.question || slide.slideId);
  if (planSlide?.transition_from_previous) {
    return ensureSentence(planSlide.transition_from_previous);
  }

  switch (planSlide?.slide_role) {
    case "intro":
      return ensureSentence(`Today we are starting ${title}, and this opening slide sets the purpose for the lesson.`);
    case "setup":
      return ensureSentence(`This slide sets up ${title} so students know how the next part of the lesson is going to unfold.`);
    case "definition":
      return ensureSentence(`This slide defines ${title} in the form students will need later in the lesson.`);
    case "intuition":
      return ensureSentence(`This slide builds intuition for ${title} before we rely on the formal wording.`);
    case "comparison":
      return ensureSentence(`This slide compares ${title} so the trade-off is easier to remember.`);
    case "demo":
      return ensureSentence(`This slide uses a visual or interactive example to make ${title} concrete.`);
    case "practice":
      return ensureSentence(`Use this slide as a short practice moment and reason through ${title} before jumping to the answer.`);
    case "recap":
      return ensureSentence(`This slide recaps ${title} and compresses the lesson into a more memorable summary.`);
    case "exit_check":
      return ensureSentence(`This slide is the exit check for ${title}, so students can verify what they now understand.`);
    case "caution":
      return ensureSentence(`This slide treats ${title} as a caution, so students should hear the risk and the safe rule clearly.`);
    case "reference":
      return ensureSentence(`This slide gives the practical reference steps for ${title}.`);
    default:
      return ensureSentence(`This slide focuses on ${title}.`);
  }
}

export function generateSegmentsFromContent(slide, rawSlide, layoutContext, slideDefaults, options, preferredTargetId, planSlide) {
  const segments = [];
  const push = (segment) => {
    if (!segment?.text) return;
    const target = segment.target_element || "slide";
    const targetType = target === "slide"
      ? "slide"
      : layoutContext.elementsById.get(target)?.type || segment.target_type || "element";
    segments.push({
      text: ensureSentence(segment.text),
      target_element: target,
      attention_mode: segment.attention_mode || slideDefaults.attention_mode || defaultAttentionMode(targetType),
      voice: {
        ...slideDefaults.voice,
        ...(segment.voice || {}),
      },
    });
  };

  if (slide.type === "title") {
    push({
      text: roleLeadSentence(slide, rawSlide, planSlide),
      target_element: slide.titleId || "slide",
    });
    if (rawSlide.subtitle) {
      push({
        text: `The focus is ${plainTextForSpeech(rawSlide.subtitle)}.`,
        target_element: slide.subtitleId || slide.titleId || "slide",
      });
    }
    if (rawSlide.meta) {
      push({
        text: `${plainTextForSpeech(rawSlide.meta)}.`,
        target_element: slide.metaId || "slide",
      });
    }
    return compactSegments(segments, Number(options.maxSegmentsPerSlide) || 8);
  }

  if (slide.type === "bullets") {
    push({
      text: rawSlide.lead
        ? plainTextForSpeech(rawSlide.lead)
        : roleLeadSentence(slide, rawSlide, planSlide),
      target_element: slide.leadId || slide.titleId || "slide",
    });

    asArray(slide.bullets)
      .slice(0, Number(options.maxAutoItems) || 6)
      .forEach((item, index) => {
        push({
          text: describeBulletText(item.say || item.text, index, slide.bullets.length),
          target_element: preferredTargetId(layoutContext, item.id, {
            preferChild: hasCodeFence(item.say || item.text),
          }),
        });
      });

    return compactSegments(segments, Number(options.maxSegmentsPerSlide) || 8);
  }

  if (slide.type === "text") {
    push({
      text: rawSlide.lead
        ? plainTextForSpeech(rawSlide.lead)
        : roleLeadSentence(slide, rawSlide, planSlide),
      target_element: slide.leadId || slide.titleId || "slide",
    });

    asArray(slide.paragraphs)
      .slice(0, Number(options.maxAutoItems) || 6)
      .forEach((paragraph) => {
        push({
          text: plainTextForSpeech(paragraph.say || paragraph.text),
          target_element: paragraph.id,
        });
      });

    appendBlockSegments({
      blocks: slide.blocks,
      push,
      maxItems: Number(options.maxAutoItems) || 6,
    });

    if (slide.media?.id) {
      push(describeMediaSegment(slide.media, slide.media.id));
    }

    return compactSegments(segments, Number(options.maxSegmentsPerSlide) || 8);
  }

  if (slide.type === "visual_lab") {
    push({
      text: rawSlide.lead
        ? plainTextForSpeech(rawSlide.lead)
        : roleLeadSentence(slide, rawSlide, planSlide),
      target_element: slide.leadId || slide.titleId || "slide",
    });

    appendBlockSegments({
      blocks: slide.blocks,
      push,
      maxItems: Number(options.maxAutoItems) || 6,
    });

    if (slide.media?.id) {
      push(describeMediaSegment(slide.media, slide.media.id));
    }

    return compactSegments(segments, Number(options.maxSegmentsPerSlide) || 8);
  }

  if (slide.type === "two-col") {
    push({
      text: roleLeadSentence(slide, rawSlide, planSlide),
      target_element: slide.titleId || "slide",
    });

    [slide.left, slide.right].forEach((column) => {
      if (!column) return;
      if (column.lead) {
        push({
          text: plainTextForSpeech(column.lead),
          target_element: column.leadId || "slide",
        });
      }
      asArray(column.bullets)
        .slice(0, Number(options.maxAutoItems) || 4)
        .forEach((item, index) => {
          push({
            text: describeBulletText(item.say || item.text, index, column.bullets.length),
            target_element: item.id,
          });
        });
      asArray(column.paragraphs)
        .slice(0, Number(options.maxAutoItems) || 4)
        .forEach((paragraph) => {
          push({
            text: plainTextForSpeech(paragraph.say || paragraph.text),
            target_element: paragraph.id,
          });
        });
      appendBlockSegments({
        blocks: column.blocks,
        push,
        maxItems: Number(options.maxAutoItems) || 4,
      });
      if (column.media?.id) {
        push(describeMediaSegment(column.media, column.media.id));
      }
    });

    return compactSegments(segments, Number(options.maxSegmentsPerSlide) || 8);
  }

  if (slide.type === "mcq") {
    push({
      text: planSlide?.transition_from_previous
        ? ensureSentence(planSlide.transition_from_previous)
        : plainTextForSpeech(rawSlide.questionSay || rawSlide.question || rawSlide.title),
      target_element: slide.questionId || slide.titleId || "slide",
    });
    asArray(slide.options).forEach((option) => {
      push({
        text: ensureSentence(`Option ${plainTextForSpeech(option.choice)}: ${plainTextForSpeech(option.label)}`),
        target_element: option.id,
      });
    });
    if (rawSlide.correct && rawSlide.explain) {
      push({
        text: ensureSentence(`The correct answer is ${plainTextForSpeech(rawSlide.correct)}. ${plainTextForSpeech(rawSlide.explain)}`),
        target_element: slide.feedbackId || "slide",
      });
    }
    return compactSegments(segments, Number(options.maxSegmentsPerSlide) || 8);
  }

  push({
    text: roleLeadSentence(slide, rawSlide, planSlide),
    target_element: slide.titleId || "slide",
  });

  return segments;
}

export function injectPlanHints(rawSegments, targetQueue, planSlide) {
  if (!planSlide) return rawSegments;

  const segments = [...rawSegments];
  const existingText = segments.map((segment) => normalizePhrase(segment.text)).join(" ");
  let cursor = segments.length;

  const nextTarget = () => targetQueue[cursor] || targetQueue.at(-1) || { id: "slide", type: "slide" };
  const pushPhrase = (text) => {
    const target = nextTarget();
    cursor += 1;
    segments.push({
      text,
      target_element: target.id || "slide",
    });
  };

  asArray(planSlide.must_cover)
    .map((item) => normalizeCoverageText(item))
    .filter(Boolean)
    .forEach((item) => {
      if (!existingText.includes(normalizePhrase(item))) {
        pushPhrase(item);
      }
    });

  asArray(planSlide.must_say)
    .map((item) => ensureSentence(item))
    .filter(Boolean)
    .forEach((item) => {
      if (!existingText.includes(normalizePhrase(item))) {
        pushPhrase(item);
      }
    });

  return segments;
}

export function normalizeNarrationSourceToRawSegments({
  narrationSource,
  slide,
  rawSlide,
  layoutContext,
  targetQueue,
  slideDefaults,
  planSlide,
  options,
  preferredTargetId,
}) {
  if (!narrationSource) return [];

  let rawSegments = [];

  if (
    narrationSource.kind === "lecture_plan_segments"
    || narrationSource.kind === "explicit_segments"
    || narrationSource.kind === "script_override_segments"
  ) {
    rawSegments = normalizeExplicitSegments(
      narrationSource.value,
      targetQueue,
      slideDefaults,
      layoutContext,
      options,
    );
  } else if (narrationSource.kind === "generated_content") {
      rawSegments = generateSegmentsFromContent(
        slide,
        rawSlide,
        layoutContext,
        slideDefaults,
        options,
        preferredTargetId,
        planSlide,
      );
  } else {
    rawSegments = narrationSegmentsFromText(
      narrationSource.value,
      targetQueue,
      slideDefaults,
      layoutContext,
      options,
    );
  }

  if (String(narrationSource.kind || "").startsWith("script_override")) {
    return rawSegments;
  }

  return injectPlanHints(rawSegments, targetQueue, planSlide);
}
