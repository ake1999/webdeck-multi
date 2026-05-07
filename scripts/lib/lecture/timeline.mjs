import { defaultAttentionMode, relativeProjectPath, slideAnchor } from "./utils.mjs";
import { compileAvatarAction } from "./avatar.mjs";
import {
  buildManualAlignmentPath,
  buildManualAudioPath,
  relativeContractPath,
} from "./contracts.mjs";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function findSlide(manifest, slideId) {
  return asArray(manifest?.slides).find((slide) => slide.slide_id === slideId) || null;
}

function cueActions(targetElement) {
  if (!targetElement || targetElement === "slide") {
    return [{ type: "clear_highlights" }];
  }
  return [{ type: "highlight", element: targetElement }];
}

function resolveTarget(layoutSlide, targetElement) {
  if (!layoutSlide || !targetElement || targetElement === "slide") {
    return {
      target_element: "slide",
      target_type: "slide",
      anchor: slideAnchor(layoutSlide?.bbox || [0, 0, 0, 0]),
      bbox: layoutSlide?.bbox || [0, 0, 0, 0],
    };
  }

  const element = asArray(layoutSlide.elements).find((item) => item.id === targetElement);
  if (!element) {
    return {
      target_element: "slide",
      target_type: "slide",
      anchor: slideAnchor(layoutSlide?.bbox || [0, 0, 0, 0]),
      bbox: layoutSlide?.bbox || [0, 0, 0, 0],
    };
  }

  return {
    target_element: element.id,
    target_type: element.type,
    anchor: element.anchor,
    bbox: element.bbox,
  };
}

export function compileTimeline({
  descriptor,
  scriptManifest,
  layoutManifest,
  alignmentManifest,
  subtitles,
  outputDir,
  compiledAlignmentPath = "",
  authoring = null,
}) {
  const slides = [];

  asArray(scriptManifest.slides).forEach((slideScript) => {
    const slideLayout = findSlide(layoutManifest, slideScript.slide_id);
    const slideAlignment = findSlide(alignmentManifest, slideScript.slide_id);
    if (!slideLayout || !slideAlignment) return;

    const planSlide = authoring?.slidePlansById?.[slideScript.slide_id] || null;
    const timeline = asArray(slideAlignment.segments).map((segmentAlignment, index) => {
      const segmentScript = asArray(slideScript.segments).find(
        (segment) => segment.segment_id === segmentAlignment.segment_id,
      );
      if (!segmentScript) return null;

      const resolvedTarget = resolveTarget(slideLayout, segmentScript.target_element);
      const cue = {
        cue_id: `cue_${String(index + 1).padStart(2, "0")}`,
        segment_id: segmentScript.segment_id,
        t0: segmentAlignment.t0,
        t1: segmentAlignment.t1,
        speech: segmentScript.text,
        attention_mode: segmentScript.attention_mode || defaultAttentionMode(resolvedTarget.target_type),
        target_element: resolvedTarget.target_element,
        target_type: resolvedTarget.target_type,
        attention_xy: resolvedTarget.anchor,
        target_bbox: resolvedTarget.bbox,
        words: segmentAlignment.words || [],
        alignment_quality: segmentAlignment.alignment_quality || "segment_only",
        actions: cueActions(resolvedTarget.target_element),
      };

      const avatarAction = compileAvatarAction({
        descriptor,
        slideScript,
        slideLayout,
        segmentScript,
        cue,
        planSlide,
        authoring,
      });
      if (avatarAction) {
        cue.actions.push(avatarAction);
      }

      return cue;
    }).filter(Boolean);

    slides.push({
      slide_id: slideScript.slide_id,
      slide_type: slideScript.slide_type,
      audio_file: slideAlignment.audio_file,
      media: {
        audio: {
          compiled: slideAlignment.audio_file,
          manual: relativeContractPath(buildManualAudioPath(descriptor, slideScript.slide_id)),
        },
        alignment: {
          compiled: compiledAlignmentPath,
          manual: relativeContractPath(buildManualAlignmentPath(descriptor)),
        },
      },
      subtitles_file: subtitles.slide_files[slideScript.slide_id] || "",
      duration: slideAlignment.duration,
      zones: slideLayout.zones || {},
      timeline,
    });
  });

  return {
    topic_id: scriptManifest.topic_id,
    selector: {
      school: descriptor.school,
      course: descriptor.course,
      session: descriptor.session,
      topic: descriptor.topic,
    },
    subtitles_topic_file: subtitles.topic_file,
    output_dir: relativeProjectPath(outputDir),
    avatar_profile: authoring?.fileSummary?.avatar_profile || "",
    reference_assets: authoring?.fileSummary?.reference_assets || "",
    autoplay_default: Boolean(authoring?.topicDefaults?.autoplay),
    media_source_default: "compiled",
    slides,
  };
}
