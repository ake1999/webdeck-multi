import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { escapeHtml } from "../catalog.mjs";
import { projectRoot } from "../export_runtime.mjs";
import { relativeProjectPath } from "./utils.mjs";

function playbackLink(descriptor) {
  const params = new URLSearchParams({
    school: descriptor.school,
    course: descriptor.course,
    session: descriptor.session,
    topic: descriptor.topic,
    lecture: "1",
  });
  return `session.html?${params.toString()}`;
}

function listText(items) {
  const values = (Array.isArray(items) ? items : []).map((item) => String(item || "").trim()).filter(Boolean);
  return values.join(" | ");
}

function htmlMeta(label, value, className = "meta") {
  if (value == null || value === "") return "";
  return `<div class="${escapeHtml(className)}"><strong>${escapeHtml(label)}:</strong> ${value}</div>`;
}

export async function writeLectureReview({
  descriptor,
  scriptManifest,
  alignmentManifest,
  timelineManifest,
  motionManifest,
  motionArtifacts,
  screenshotsDir,
  reviewDir,
  avatarJobs,
  slideVideoJobs,
  authoring,
}) {
  await mkdir(reviewDir, { recursive: true });
  const mediaSourceMode = timelineManifest.media_source_default || "compiled";
  const topicPedagogy = authoring?.topicPedagogy || {};

  const fileExists = async (relativePath) => {
    if (!relativePath) return false;
    const absolutePath = path.isAbsolute(relativePath)
      ? relativePath
      : path.join(projectRoot, relativePath);
    return Boolean(await stat(absolutePath).catch(() => null));
  };

  const resolveAudioSource = async (slideTimeline) => {
    const compiled = slideTimeline?.media?.audio?.compiled || slideTimeline?.audio_file || "";
    const manual = slideTimeline?.media?.audio?.manual || "";
    if (mediaSourceMode === "manual") {
      return await fileExists(manual) ? `manual: ${manual}` : "manual: missing";
    }
    if (mediaSourceMode === "auto") {
      if (await fileExists(manual)) return `manual: ${manual}`;
      return await fileExists(compiled) ? `compiled: ${compiled}` : "compiled: missing";
    }
    return await fileExists(compiled) ? `compiled: ${compiled}` : "compiled: missing";
  };

  const resolveAvatarSource = async (avatarAction) => {
    if (!avatarAction) return "";
    const compiledCandidates = avatarAction.media?.compiled_candidates || avatarAction.asset_candidates || [];
    const manualCandidates = avatarAction.media?.manual_candidates || [];
    const candidates = mediaSourceMode === "manual"
      ? manualCandidates
      : mediaSourceMode === "auto"
        ? [...manualCandidates, ...compiledCandidates]
        : compiledCandidates;

    for (const candidate of candidates) {
      if (await fileExists(candidate.src)) {
        const source = candidate.source_kind?.startsWith("manual") ? "manual" : "compiled";
        return `${source}: ${candidate.src}`;
      }
    }

    if (mediaSourceMode === "manual") return "manual: missing";
    if (mediaSourceMode === "auto") return "auto: no candidate currently exists";
    return "compiled: missing";
  };

  const markdownLines = [
    "# WebDeck Lecture Review",
    "",
    `- Topic: \`${descriptor.school} / ${descriptor.course} / ${descriptor.session} / ${descriptor.topic}\``,
    `- Playback: \`${playbackLink(descriptor)}\``,
    `- Lecture plan: \`${scriptManifest.authoring?.files?.lecture_plan || "none"}\``,
    `- Script override: \`${scriptManifest.authoring?.files?.script_override || "none"}\``,
    `- Avatar profile: \`${timelineManifest.avatar_profile || "none"}\``,
    `- Reference assets: \`${timelineManifest.reference_assets || "none"}\``,
    `- Motion manifest: \`${motionArtifacts?.topic_manifest || "none"}\``,
    `- Slide video jobs: \`${slideVideoJobs?.dir || "none"}\``,
    `- Media source default: \`${mediaSourceMode}\``,
    `- Audience level: ${topicPedagogy.audience_level || ""}`,
    `- Topic goal: ${topicPedagogy.topic_goal || ""}`,
    `- Topic takeaways: ${listText(topicPedagogy.topic_takeaways)}`,
    `- Style notes: ${listText(topicPedagogy.style_notes)}`,
    `- Transition style: ${topicPedagogy.transition_style || ""}`,
    `- Scene policy default: \`${topicPedagogy.scene_policy_default || ""}\``,
    `- Object policy default: \`${topicPedagogy.object_policy_default || ""}\``,
    "",
  ];

  if (topicPedagogy.teaching_arc?.entry_point || topicPedagogy.teaching_arc?.progression || topicPedagogy.teaching_arc?.destination) {
    markdownLines.push("## Topic Teaching Arc");
    markdownLines.push("");
    markdownLines.push(`- Entry point: ${topicPedagogy.teaching_arc?.entry_point || ""}`);
    markdownLines.push(`- Progression: ${topicPedagogy.teaching_arc?.progression || ""}`);
    markdownLines.push(`- Destination: ${topicPedagogy.teaching_arc?.destination || ""}`);
    markdownLines.push(`- Tone: ${topicPedagogy.teaching_arc?.tone || ""}`);
    markdownLines.push(`- Methods: ${listText(topicPedagogy.teaching_arc?.methods)}`);
    markdownLines.push("");
  }

  const htmlParts = [
    "<!doctype html>",
    "<html lang=\"en\">",
    "<head>",
    "<meta charset=\"utf-8\" />",
    `<title>${escapeHtml(descriptor.topic)} lecture review</title>`,
    "<style>",
    "body{font-family:system-ui,-apple-system,Segoe UI,Arial,sans-serif;margin:24px;background:#f8fafc;color:#0f172a;}",
    "a{color:#0f766e;text-decoration:none;} a:hover{text-decoration:underline;}",
    ".top{margin-bottom:24px;padding:16px 18px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;}",
    ".slide{display:grid;grid-template-columns:minmax(280px,420px) 1fr;gap:18px;margin-bottom:18px;padding:18px;background:#fff;border:1px solid #e2e8f0;border-radius:18px;align-items:start;}",
    ".slide img{width:100%;border:1px solid #cbd5e1;border-radius:12px;background:#fff;}",
    ".seg{padding:10px 12px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;margin-bottom:10px;}",
    ".comparison-grid{display:grid;grid-template-columns:repeat(3,minmax(220px,1fr));gap:12px;}",
    ".comparison-card{padding:12px;border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc;}",
    ".meta{font-size:13px;color:#475569;margin-bottom:8px;}",
    ".warn{color:#9a3412;}",
    ".pedagogy{margin-top:14px;padding-top:14px;border-top:1px solid #e2e8f0;}",
    "code{background:#e2e8f0;padding:1px 5px;border-radius:6px;}",
    "</style>",
    "</head>",
    "<body>",
    `<div class="top"><h1 style="margin:0 0 8px 0;">Lecture Review</h1><div><strong>Topic:</strong> ${escapeHtml(descriptor.school)} / ${escapeHtml(descriptor.course)} / ${escapeHtml(descriptor.session)} / ${escapeHtml(descriptor.topic)}</div><div><strong>Playback:</strong> <a href="/${escapeHtml(playbackLink(descriptor))}">Open narrated deck</a></div><div><strong>Lecture plan:</strong> <code>${escapeHtml(scriptManifest.authoring?.files?.lecture_plan || "none")}</code></div><div><strong>Script override:</strong> <code>${escapeHtml(scriptManifest.authoring?.files?.script_override || "none")}</code></div><div><strong>Avatar profile:</strong> <code>${escapeHtml(timelineManifest.avatar_profile || "none")}</code></div><div><strong>Avatar jobs:</strong> <code>${escapeHtml(avatarJobs?.dir || "none")}</code></div><div><strong>Motion manifest:</strong> <code>${escapeHtml(motionArtifacts?.topic_manifest || "none")}</code></div><div><strong>Slide video jobs:</strong> <code>${escapeHtml(slideVideoJobs?.dir || "none")}</code></div><div><strong>Media source default:</strong> <code>${escapeHtml(mediaSourceMode)}</code></div><div class="pedagogy"><h2 style="margin:0 0 10px 0;font-size:18px;">Topic Pedagogy</h2>${htmlMeta("Audience level", escapeHtml(topicPedagogy.audience_level || ""))}${htmlMeta("Topic goal", escapeHtml(topicPedagogy.topic_goal || ""))}${htmlMeta("Topic takeaways", `<code>${escapeHtml(listText(topicPedagogy.topic_takeaways))}</code>`)}${htmlMeta("Style notes", `<code>${escapeHtml(listText(topicPedagogy.style_notes))}</code>`)}${htmlMeta("Transition style", escapeHtml(topicPedagogy.transition_style || ""))}${htmlMeta("Scene policy default", `<code>${escapeHtml(topicPedagogy.scene_policy_default || "")}</code>`)}${htmlMeta("Object policy default", `<code>${escapeHtml(topicPedagogy.object_policy_default || "")}</code>`)}${htmlMeta("Teaching arc entry", escapeHtml(topicPedagogy.teaching_arc?.entry_point || ""))}${htmlMeta("Teaching arc progression", escapeHtml(topicPedagogy.teaching_arc?.progression || ""))}${htmlMeta("Teaching arc destination", escapeHtml(topicPedagogy.teaching_arc?.destination || ""))}${htmlMeta("Teaching arc tone", escapeHtml(topicPedagogy.teaching_arc?.tone || ""))}${htmlMeta("Teaching arc methods", `<code>${escapeHtml(listText(topicPedagogy.teaching_arc?.methods))}</code>`)}</div></div>`,
  ];

  (scriptManifest.authoring?.warnings || []).forEach((warning) => {
    markdownLines.push(`- Authoring warning: ${warning}`);
  });
  if ((scriptManifest.authoring?.warnings || []).length) {
    markdownLines.push("");
  }

  for (const slideScript of scriptManifest.slides || []) {
    const slideAlignment = (alignmentManifest.slides || []).find(
      (slide) => slide.slide_id === slideScript.slide_id,
    );
    const slideTimeline = (timelineManifest.slides || []).find(
      (slide) => slide.slide_id === slideScript.slide_id,
    );
    const slideMotion = (motionManifest?.slides || []).find(
      (slide) => slide.slide_id === slideScript.slide_id,
    );
    const slideMotionFile = (motionArtifacts?.slide_files || []).find(
      (item) => item.slide_id === slideScript.slide_id,
    );
    const planSlide = authoring?.slidePlansById?.[slideScript.slide_id] || null;
    const screenshotPath = relativeProjectPath(path.join(screenshotsDir, `${slideScript.slide_id}.png`));
    const resolvedAudio = await resolveAudioSource(slideTimeline);

    markdownLines.push(`## ${slideScript.slide_id}`);
    markdownLines.push("");
    markdownLines.push(`- Screenshot: \`${screenshotPath}\``);
    markdownLines.push(`- Script source: \`${slideScript.script_source}\``);
    markdownLines.push(`- Provider used: \`${slideScript.provider_used || ""}\``);
    markdownLines.push(`- Model used: \`${slideScript.model_used || ""}\``);
    markdownLines.push(`- Prompt version: \`${slideScript.prompt_version || ""}\``);
    markdownLines.push(`- Fallback reason: \`${slideScript.fallback_reason || ""}\``);
    if (planSlide?.slide_role) {
      markdownLines.push(`- Slide role: \`${planSlide.slide_role}\``);
    }
    if (planSlide?.importance) {
      markdownLines.push(`- Importance: \`${planSlide.importance}\``);
    }
    if (planSlide?.teacher_strategy) {
      markdownLines.push(`- Teacher strategy: \`${planSlide.teacher_strategy}\``);
    }
    if (planSlide?.explanation_style) {
      markdownLines.push(`- Explanation style: ${planSlide.explanation_style}`);
    }
    if (planSlide?.narration_seed) {
      markdownLines.push(`- Narration seed: ${planSlide.narration_seed}`);
    }
    if (slideScript.lecture_plan?.voice_style) {
      markdownLines.push(`- Voice style: \`${slideScript.lecture_plan.voice_style}\``);
    }
    if (slideScript.lecture_plan?.attention_mode) {
      markdownLines.push(`- Attention mode: \`${slideScript.lecture_plan.attention_mode}\``);
    }
    if (planSlide?.must_cover?.length) {
      markdownLines.push(`- Must cover: ${listText(planSlide.must_cover)}`);
    }
    if (planSlide?.must_say?.length) {
      markdownLines.push(`- Must say: ${listText(planSlide.must_say)}`);
    }
    markdownLines.push(`- Tone / energy / pace: \`${planSlide?.tone || slideScript.lecture_plan?.voice_style || ""}\` / \`${String(planSlide?.energy ?? "")}\` / \`${String(planSlide?.pace ?? "")}\``);
    if (planSlide?.transition_from_previous) {
      markdownLines.push(`- Transition from previous: ${planSlide.transition_from_previous}`);
    }
    if (planSlide?.transition_to_next) {
      markdownLines.push(`- Transition to next: ${planSlide.transition_to_next}`);
    }
    if (planSlide?.likely_student_confusion?.length) {
      markdownLines.push(`- Likely student confusion: ${listText(planSlide.likely_student_confusion)}`);
    }
    markdownLines.push(`- Scene / object policy: \`${planSlide?.scene_policy || ""}\` / \`${planSlide?.object_policy || ""}\``);
    if (planSlide?.scene_hint) {
      markdownLines.push(`- Scene hint: ${planSlide.scene_hint}`);
    }
    if (planSlide?.prop_suggestions?.length) {
      markdownLines.push(`- Prop suggestions: ${listText(planSlide.prop_suggestions)}`);
    }
    if (planSlide?.story_hint) {
      markdownLines.push(`- Story hint: ${planSlide.story_hint}`);
    }
    if (planSlide?.delivery_goal) {
      markdownLines.push(`- Delivery goal: ${planSlide.delivery_goal}`);
    }
    markdownLines.push(`- Compiled audio path: \`${slideTimeline?.media?.audio?.compiled || ""}\``);
    markdownLines.push(`- Manual audio path: \`${slideTimeline?.media?.audio?.manual || ""}\``);
    markdownLines.push(`- Current resolved audio source: \`${resolvedAudio}\``);
    if (slideMotion) {
      markdownLines.push(`- Motion file: \`${slideMotionFile?.path || ""}\``);
      markdownLines.push(`- Slide video output: \`${slideMotion?.media?.output_video || ""}\``);
      markdownLines.push(`- Entry policy: \`${slideMotion.entry_policy || ""}\``);
      markdownLines.push(`- Motion samples: \`${String((slideMotion.samples || []).length)} @ ${String(motionManifest?.sample_rate_fps || 6)} fps\``);
    }
    if (slideScript.warnings?.length) {
      slideScript.warnings.forEach((warning) => markdownLines.push(`- Warning: ${warning}`));
    }
    markdownLines.push("");

    htmlParts.push("<section class=\"slide\">");
    htmlParts.push(
      `<div><img src="/${escapeHtml(screenshotPath)}" alt="${escapeHtml(slideScript.slide_id)} screenshot" /></div>`,
    );
    htmlParts.push("<div>");
    htmlParts.push(`<h2 style="margin:0 0 10px 0;">${escapeHtml(slideScript.slide_id)}</h2>`);
    htmlParts.push(`<div class="meta">Source: <code>${escapeHtml(slideScript.script_source)}</code></div>`);
    htmlParts.push(`<div class="meta">Provider: <code>${escapeHtml(slideScript.provider_used || "")}</code></div>`);
    htmlParts.push(`<div class="meta">Model: <code>${escapeHtml(slideScript.model_used || "")}</code></div>`);
    htmlParts.push(`<div class="meta">Prompt version: <code>${escapeHtml(slideScript.prompt_version || "")}</code></div>`);
    if (planSlide?.slide_role) {
      htmlParts.push(`<div class="meta">Slide role: <code>${escapeHtml(planSlide.slide_role)}</code> | importance: <code>${escapeHtml(planSlide.importance || "")}</code> | strategy: <code>${escapeHtml(planSlide.teacher_strategy || "")}</code></div>`);
    }
    if (slideScript.fallback_reason) {
      htmlParts.push(`<div class="meta warn">Fallback reason: ${escapeHtml(slideScript.fallback_reason)}</div>`);
    }
    if (planSlide?.explanation_style) {
      htmlParts.push(`<div class="meta">Explanation style: ${escapeHtml(planSlide.explanation_style)}</div>`);
    }
    if (planSlide?.narration_seed) {
      htmlParts.push(`<div class="meta">Narration seed: ${escapeHtml(planSlide.narration_seed)}</div>`);
    }
    if (slideScript.lecture_plan?.voice_style) {
      htmlParts.push(`<div class="meta">Voice style: <code>${escapeHtml(slideScript.lecture_plan.voice_style)}</code></div>`);
    }
    if (slideScript.lecture_plan?.attention_mode) {
      htmlParts.push(`<div class="meta">Attention mode: <code>${escapeHtml(slideScript.lecture_plan.attention_mode)}</code></div>`);
    }
    if (planSlide?.must_cover?.length) {
      htmlParts.push(`<div class="meta">Must cover: <code>${escapeHtml(listText(planSlide.must_cover))}</code></div>`);
    }
    if (planSlide?.must_say?.length) {
      htmlParts.push(`<div class="meta">Must say: <code>${escapeHtml(listText(planSlide.must_say))}</code></div>`);
    }
    htmlParts.push(`<div class="meta">Tone / energy / pace: <code>${escapeHtml(String(planSlide?.tone || slideScript.lecture_plan?.voice_style || ""))}</code> / <code>${escapeHtml(String(planSlide?.energy ?? ""))}</code> / <code>${escapeHtml(String(planSlide?.pace ?? ""))}</code></div>`);
    if (planSlide?.transition_from_previous) {
      htmlParts.push(`<div class="meta">Transition from previous: ${escapeHtml(planSlide.transition_from_previous)}</div>`);
    }
    if (planSlide?.transition_to_next) {
      htmlParts.push(`<div class="meta">Transition to next: ${escapeHtml(planSlide.transition_to_next)}</div>`);
    }
    if (planSlide?.likely_student_confusion?.length) {
      htmlParts.push(`<div class="meta">Likely confusion: <code>${escapeHtml(listText(planSlide.likely_student_confusion))}</code></div>`);
    }
    htmlParts.push(`<div class="meta">Scene / object policy: <code>${escapeHtml(planSlide?.scene_policy || "")}</code> / <code>${escapeHtml(planSlide?.object_policy || "")}</code></div>`);
    if (planSlide?.scene_hint) {
      htmlParts.push(`<div class="meta">Scene hint: ${escapeHtml(planSlide.scene_hint)}</div>`);
    }
    if (planSlide?.prop_suggestions?.length) {
      htmlParts.push(`<div class="meta">Prop suggestions: <code>${escapeHtml(listText(planSlide.prop_suggestions))}</code></div>`);
    }
    if (planSlide?.story_hint) {
      htmlParts.push(`<div class="meta">Story hint: ${escapeHtml(planSlide.story_hint)}</div>`);
    }
    if (planSlide?.delivery_goal) {
      htmlParts.push(`<div class="meta">Delivery goal: ${escapeHtml(planSlide.delivery_goal)}</div>`);
    }
    htmlParts.push(`<div class="meta">Audio compiled: <code>${escapeHtml(slideTimeline?.media?.audio?.compiled || "")}</code></div>`);
    htmlParts.push(`<div class="meta">Audio manual: <code>${escapeHtml(slideTimeline?.media?.audio?.manual || "")}</code></div>`);
    htmlParts.push(`<div class="meta">Resolved audio (${escapeHtml(mediaSourceMode)}): <code>${escapeHtml(resolvedAudio)}</code></div>`);
    if (slideMotion) {
      htmlParts.push(`<div class="meta">Motion file: <code>${escapeHtml(slideMotionFile?.path || "")}</code></div>`);
      htmlParts.push(`<div class="meta">Slide video output: <code>${escapeHtml(slideMotion?.media?.output_video || "")}</code></div>`);
      htmlParts.push(`<div class="meta">Entry policy: <code>${escapeHtml(slideMotion.entry_policy || "")}</code> | motion samples <code>${escapeHtml(String((slideMotion.samples || []).length))}</code> @ <code>${escapeHtml(String(motionManifest?.sample_rate_fps || 6))} fps</code></div>`);
    }
    (slideScript.warnings || []).forEach((warning) => {
      htmlParts.push(`<div class="meta warn">${escapeHtml(warning)}</div>`);
    });

    for (const segment of slideScript.segments || []) {
      const aligned = (slideAlignment?.segments || []).find(
        (item) => item.segment_id === segment.segment_id,
      );
      const cue = (slideTimeline?.timeline || []).find(
        (item) => item.segment_id === segment.segment_id,
      );
      markdownLines.push(
        `- ${segment.segment_id} [${aligned?.t0 ?? "?"} → ${aligned?.t1 ?? "?"}] target=\`${segment.target_element}\`: ${segment.text}`,
      );
      const avatarAction = (cue?.actions || []).find((action) => action.type === "avatar");
      const resolvedAvatar = await resolveAvatarSource(avatarAction);
      const tone = segment.voice?.tone || "";
      const pace = segment.voice?.pace ?? "";
      const energy = segment.voice?.energy ?? "";
      const emphasis = (segment.emphasis_words || []).join(", ");
      htmlParts.push("<div class=\"seg\">");
      htmlParts.push(
        `<div class="meta"><code>${escapeHtml(segment.segment_id)}</code> ${escapeHtml(String(aligned?.t0 ?? "?"))} → ${escapeHtml(String(aligned?.t1 ?? "?"))} | target <code>${escapeHtml(segment.target_element)}</code> | cue <code>${escapeHtml(cue?.cue_id || "")}</code></div>`,
      );
      htmlParts.push(
        `<div class="meta">Tone <code>${escapeHtml(String(tone))}</code> | energy <code>${escapeHtml(String(energy))}</code> | pace <code>${escapeHtml(String(pace))}</code></div>`,
      );
      if (emphasis) {
        htmlParts.push(`<div class="meta">Emphasis: <code>${escapeHtml(emphasis)}</code></div>`);
      }
      if (segment.delivery_kind) {
        htmlParts.push(`<div class="meta">Delivery kind: <code>${escapeHtml(segment.delivery_kind)}</code></div>`);
      }
      if (segment.avatar_behavior_hint) {
        htmlParts.push(`<div class="meta">Avatar hint: <code>${escapeHtml(segment.avatar_behavior_hint)}</code></div>`);
      }
      if (avatarAction) {
        markdownLines.push(`  Avatar compiled: \`${avatarAction.media?.compiled_render || ""}\``);
        markdownLines.push(`  Avatar manual webm: \`${avatarAction.media?.manual_render_webm || ""}\``);
        markdownLines.push(`  Avatar manual png: \`${avatarAction.media?.manual_render_png || ""}\``);
        markdownLines.push(`  Resolved avatar source: \`${resolvedAvatar}\``);
        htmlParts.push(
          `<div class="meta">Avatar: <code>${escapeHtml(avatarAction.behavior)}</code> at <code>${escapeHtml(avatarAction.screen_anchor)}</code> via <code>${escapeHtml(avatarAction.behavior_source || "heuristic")}</code></div>`,
        );
        htmlParts.push(`<div class="meta">Avatar compiled: <code>${escapeHtml(avatarAction.media?.compiled_render || "")}</code></div>`);
        htmlParts.push(`<div class="meta">Avatar manual webm: <code>${escapeHtml(avatarAction.media?.manual_render_webm || "")}</code></div>`);
        htmlParts.push(`<div class="meta">Avatar manual png: <code>${escapeHtml(avatarAction.media?.manual_render_png || "")}</code></div>`);
        htmlParts.push(`<div class="meta">Resolved avatar (${escapeHtml(mediaSourceMode)}): <code>${escapeHtml(resolvedAvatar)}</code></div>`);
      }
      htmlParts.push(`<div>${escapeHtml(segment.text)}</div>`);
      htmlParts.push("</div>");
    }

    markdownLines.push("");
    htmlParts.push("</div>");
    htmlParts.push("</section>");
  }

  if (Array.isArray(scriptManifest.comparison?.slides) && scriptManifest.comparison.slides.length) {
    markdownLines.push("## Script Provider Comparison");
    markdownLines.push("");
    htmlParts.push("<section class=\"slide\" style=\"grid-template-columns:1fr;\">");
    htmlParts.push("<div>");
    htmlParts.push("<h2 style=\"margin:0 0 10px 0;\">Pilot Script Comparison</h2>");
    htmlParts.push("<div class=\"meta\">Deterministic vs llm_local vs script_override</div>");

    for (const comparisonSlide of scriptManifest.comparison.slides) {
      htmlParts.push("<div class=\"seg\" style=\"background:#fff;\">");
      htmlParts.push(`<div class="meta"><strong>${escapeHtml(comparisonSlide.slide_id)}</strong></div>`);
      htmlParts.push("<div class=\"comparison-grid\">");
      markdownLines.push(`- ${comparisonSlide.slide_id}`);
      for (const providerKey of ["deterministic", "llm_local", "script_override"]) {
        const variant = comparisonSlide.variants?.[providerKey];
        if (!variant) continue;
        markdownLines.push(`  - ${providerKey}: source=\`${variant.script_source || ""}\` provider=\`${variant.provider_used || ""}\` fallback=\`${variant.fallback_reason || ""}\``);
        htmlParts.push("<div class=\"comparison-card\">");
        htmlParts.push(
          `<div class="meta" style="margin-top:10px;"><strong>${escapeHtml(providerKey)}</strong> | source <code>${escapeHtml(variant.script_source || "")}</code> | provider <code>${escapeHtml(variant.provider_used || "")}</code> | model <code>${escapeHtml(variant.model_used || "")}</code> | prompt <code>${escapeHtml(variant.prompt_version || "")}</code>${variant.cache_used ? " | cache <code>hit</code>" : ""}</div>`,
        );
        if (variant.fallback_reason) {
          htmlParts.push(`<div class="meta warn">${escapeHtml(variant.fallback_reason)}</div>`);
        }
        if (!variant.available) {
          htmlParts.push("<div class=\"meta\">No variant output for this slide.</div>");
          continue;
        }
        for (const segment of variant.segments || []) {
          htmlParts.push(
            `<div class="meta"><code>${escapeHtml(segment.segment_id)}</code> target <code>${escapeHtml(segment.target_element || "")}</code> | tone <code>${escapeHtml(String(segment.tone || ""))}</code> | energy <code>${escapeHtml(String(segment.energy ?? ""))}</code> | pace <code>${escapeHtml(String(segment.pace ?? ""))}</code></div>`,
          );
          htmlParts.push(`<div>${escapeHtml(segment.text)}</div>`);
        }
        htmlParts.push("</div>");
      }
      htmlParts.push("</div>");
      htmlParts.push("</div>");
    }

    htmlParts.push("</div>");
    htmlParts.push("</section>");
  }

  htmlParts.push("</body></html>");

  const mdPath = path.join(reviewDir, "script_preview.md");
  const htmlPath = path.join(reviewDir, "index.html");
  await writeFile(mdPath, `${markdownLines.join("\n")}\n`, "utf8");
  await writeFile(htmlPath, htmlParts.join(""), "utf8");

  return {
    markdown: relativeProjectPath(mdPath),
    html: relativeProjectPath(htmlPath),
  };
}
