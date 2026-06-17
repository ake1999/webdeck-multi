# Webdeck Multi Project Handoff For New Chat

This document is a durable context handoff for continuing the project in a fresh assistant conversation. It summarizes the current goal, project structure, generated contracts, completed work, known gaps, and the next likely implementation steps.

## 2026-06-11 Branch Context

This branch is being reshaped away from university course delivery and toward
personal-brand courses for YouTube and the website. The first target course is
Calculus.

Current calculus source state:

- `courses/Calculus/Materials/` contains 70 lecture JSON files.
- It also contains 70 preview markdown files and 8 `debug_pass1` files.
- `courses/Calculus/lectures.txt` describes the intended module/order source.
- Calculus material JSON is wired into the browser picker under Arian
  University (`AU`) as Calculus 1, Calculus 2, and Calculus 3.
- The browser bridge uses `shared/calculus_material_adapter.js` to convert
  material JSON into WebDeck slide data at runtime.
- A first generation-side test topic has been created from material JSON:
  `courses/AU/ARIAN_Calculus_1/sessions/S01/01_review_of_functions_and_graphs.slides.js`
  and
  `courses/AU/ARIAN_Calculus_1/sessions/S01/01_review_of_functions_and_graphs.lecture.plan.json`.
- Session topic files use `NN_<material_slug>` prefixes (`01_`, `02_`, …) for
  slides and plans; material JSON under `courses/Calculus/Materials/` stays
  unprefixed. See `shared/topic_naming.js`.
- The converter is `scripts/convert_calculus_material.mjs`; the shortcut
  command is `npm run convert:calculus-test`.
- Arian University lecture plans use `shared/arian.avatar.profile.json` for the
  personal-brand calculus voice profile.
- Calculus slide rendering now supports rich content blocks and native inline
  widgets rather than only old bullets/paragraphs. The reusable runtime lives in
  `shared/calculus/`.
- Supported rich block types include `math_solution_steps` (worked algebra with
  progressive reveal and generation-synced step IDs), `formula_block`,
  `derivation_steps`, `theorem_box`, `example_solution`, `proof_sketch`,
  `misconception_compare`, `pause_and_reveal`, `math_table`, `paragraph`,
  `nested_bullets`, and `course_path`.
- `visual_lab` is available for full-width interactive slides.
- Inline widget media uses `media.kind: "calculus_widget"`. Native widgets
  include `function_analysis`, `function_transform`, `limit_epsilon`,
  `secant_tangent`, `riemann_integral`, and `unit_circle_trig`.
- **Agent authoring playbook:** `docs/calculus_course_authoring_guide.md`
  documents slide/plan patterns, `math_solution_steps` rules, widget pairing,
  and AU course consistency. Reference implementations: Topics 1–4 under
  `courses/AU/ARIAN_Calculus_1/sessions/`.
- Widgets use shared parameter state so controls, formula text, numeric
  readout, plot, and `scriptedTimeline` animation remain synchronized. Website
  mode is manually draggable; lecture playback can drive the same parameters
  from timeline events.
- Python snippets in material JSON are preserved as source metadata. They are
  not the primary rendering path for calculus visuals.
- The remaining 69 calculus material JSON files are not yet bulk-converted into
  `courses/AU/.../*.slides.js` modules for generation scripts.
- DeepSeek/OpenAI-compatible script generation can use a runtime key file via
  `--scriptApiKeyFile` or `WEBDECK_SCRIPT_API_KEY_FILE`. The key file is
  expected outside the repo as `dsk.txt`; do not commit or copy it into the
  project.

Current cleanup direction:

- Keep the existing lecture-generation contracts intact.
- Centralize browser course metadata in `shared/course_catalog.js`.
- Use the material adapter for calculus until a deliberate generation-side
  bridge is added.
- Keep durable agent guidance in `AGENTS.md` and `.agents/project-map.md`.
- Treat `graphify-out/` as generated analysis output, not source.

Important worktree note:

- The old robotics/university course files may appear as deleted in `git
  status`. Treat those deletions as user-owned state unless explicitly asked to
  restore them.

## Project Goal

This repo generates lecture experiences from authored web-slide courses.

The intended final pipeline is:

1. Authored slide decks and lecture plans live in `courses/`.
2. The build pipeline generates scripts, layout manifests, timing, screenshots, subtitles, review pages, audio jobs, avatar jobs, slide-video jobs, and motion plans.
3. A local or LAN LLM generates stronger lecture scripts.
4. A Qwen TTS worker generates production slide audio and alignment.
5. A motion/video worker generates one transparent teacher/avatar video per slide.
6. Playback/composition uses the slide content, one audio WAV per slide, and one transparent WEBM per slide.

The preferred final media contract is:

```text
one production WAV per slide
one transparent silent WEBM per slide
```

Audio should normally stay separate from the avatar video. This keeps TTS replacement, subtitle timing, and video rerendering simpler.

Frozen downstream contracts should not be casually redesigned:

- `generated/outputs/*`
- playback source modes
- media path resolution
- job status structure
- timing semantics
- compiled/manual/auto media source behavior

## Historical Robotics Pipeline Status

The previous university/robotics version of the project had:

- 23 lecture topics.
- 23 upgraded rich `*.lecture.plan.json` files.
- 619 TTS jobs.
- 619 slide-video jobs.
- 3,784 cue-level avatar jobs.
- 619 production/manual audio WAV files under `generated/outputs/audio`.

Those numbers are useful context for the pipeline's intended scale, but they no
longer describe the current calculus-focused branch state.

Completed major upgrades:

- Phase 6 rich lecture-plan semantics.
- LLM-first script generation with deterministic fallback.
- Optional script override support.
- Production Qwen TTS worker.
- Manual/output alignment support.
- Motion refresh from final manual TTS timing.
- Slide-level motion planning.
- Slide-video render job contracts.
- HY-Motion ComfyUI queue integration.
- HY-Motion `compress12` timing mode.

Main missing production piece:

- The actual avatar/lip-sync renderer implementation. The repo now has a slide-video worker wrapper that resolves contracts, writes render packets, can invoke an external renderer command, verifies outputs, and updates status files.

## Important Commands

Convert the first calculus test topic:

```bash
npm run convert:calculus-test
```

Run focused calculus architecture checks:

```bash
npm run test:calculus-widgets
npm run test:topic-script-plan
npm run test:slide-video-controls
npm run validate -- \
  --school AU \
  --course ARIAN_Calculus_1 \
  --session S01 \
  --topic 01_review_of_functions_and_graphs
```

Build deterministic professor scripts for the calculus test topic:

```bash
npm run build:prof-scripts -- \
  --school AU \
  --course ARIAN_Calculus_1 \
  --session S01 \
  --topic 01_review_of_functions_and_graphs \
  --scriptProvider deterministic \
  --write-report
```

Run an OpenAI-compatible script provider later, after confirming the DeepSeek
endpoint/model:

```bash
npm run build:prof-scripts -- \
  --school AU \
  --course ARIAN_Calculus_1 \
  --session S01 \
  --topic 01_review_of_functions_and_graphs \
  --scriptProvider llm_local \
  --scriptEndpoint <deepseek-openai-compatible-url> \
  --scriptModel <deepseek-model> \
  --scriptApiKeyFile ../dsk.txt \
  --write-report
```

Build lectures:

```bash
npm run build:lecture
```

Prepare generated jobs/artifacts:

```bash
npm run prepare:generation
```

Refresh timing-sensitive artifacts after production TTS:

```bash
npm run refresh:motion
```

Queue HY-Motion jobs to ComfyUI:

```bash
npm run queue:hy-motion
```

Queue one topic to remote ComfyUI with 12-second compressed motion:

```bash
npm run queue:hy-motion -- \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations \
  --timingMode compress12 \
  --comfyUrl http://10.0.0.16:8189
```

Queue all slide-video jobs with `compress12`:

```bash
npm run queue:hy-motion -- \
  --timingMode compress12 \
  --comfyUrl http://10.0.0.16:8189
```

Sync HY-Motion outputs from a local or mounted ComfyUI output folder:

```bash
npm run sync:hy-motion -- \
  --sourceRoot /path/to/ComfyUI/output \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations
```

Build slide-video render packets / readiness report:

```bash
npm run render:slide-video -- \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations \
  --slideId project_proposal
```

Run the slide-video wrapper with an external renderer:

```bash
npm run render:slide-video -- \
  --slideId project_proposal \
  --rendererCommand "python /path/to/render_slide.py --packet {packet} --output {output}"
```

Run Qwen TTS worker:

```bash
python tools/qwen_tts_worker/run_tts_worker.py \
  --config tools/qwen_tts_worker/config.example.json
```

Run Qwen TTS for one school:

```bash
python tools/qwen_tts_worker/run_tts_worker.py \
  --config tools/qwen_tts_worker/config.example.json \
  --school AC
```

Rerun completed TTS jobs:

```bash
python tools/qwen_tts_worker/run_tts_worker.py \
  --config tools/qwen_tts_worker/config.example.json \
  --overwrite
```

## Important Source Files

Script generation:

```text
scripts/lib/lecture/script_provider.mjs
scripts/lib/lecture/script_providers/deterministic.mjs
scripts/lib/lecture/script_providers/llm_local.mjs
scripts/lib/lecture/script_providers/script_override.mjs
scripts/lib/lecture/prompts/script_writer_v1.md
scripts/lib/lecture/prompts/script_writer_v1.example.json
scripts/lib/lecture/llm_schema.mjs
scripts/lib/lecture/script_generation.mjs
```

Lecture-plan semantics:

```text
scripts/lib/lecture/authoring.mjs
scripts/lib/lecture/contracts.mjs
scripts/lib/lecture/plan_generator.mjs
scripts/lib/lecture/plan_profiles.mjs
docs/lecture_plan_semantics.md
```

TTS worker:

```text
tools/qwen_tts_worker/
```

Motion and slide-video planning:

```text
scripts/lib/lecture/motion_planning.mjs
scripts/lib/lecture/jobs.mjs
scripts/lib/lecture/pipeline.mjs
scripts/refresh_motion.mjs
docs/slide_motion_pipeline.md
```

HY-Motion/ComfyUI integration:

```text
hy_motion_slide_batch_workflow.json
scripts/queue_hy_motion_comfyui.mjs
scripts/sync_hy_motion_outputs.mjs
scripts/render_slide_video.mjs
scripts/lib/lecture/hy_motion_instructions.mjs
scripts/lib/lecture/hy_motion_assets.mjs
docs/hy_motion_comfyui_batch.md
docs/final_slide_video_worker.md
```

Review:

```text
scripts/lib/lecture/review.mjs
```

## Course Source Structure

Course source files live under:

```text
courses/<school>/<course>/sessions/<session>/
```

Lecture plans use names like:

```text
courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S01/02_robot_safety.lecture.plan.json
```

Slide source files use names like:

```text
courses/<school>/<course>/sessions/<session>/<topic>.slides.js
```

Lecture plans now contain rich Phase 6 semantics.

Topic-level fields include:

```text
topic_id
avatar_profile
reference_assets
topic_defaults
teaching_arc
audience_level
topic_goal
topic_takeaways
style_notes
transition_style
scene_policy_default
object_policy_default
```

Slide-level fields include:

```text
slide_ref
slide_role
importance
narration_seed
voice_style
tone
energy
pace
attention_mode
scene_policy
object_policy
must_cover
must_say
emphasis_words
transition_from_previous
transition_to_next
likely_student_confusion
teacher_strategy
avatar_hint
scene_hint
prop_suggestions
explanation_style
story_hint
delivery_goal
```

These fields guide LLM script generation, TTS delivery, motion planning, and future scene/video generation.

## Generated Directory Overview

The generated tree contains several different lanes:

```text
generated/
├── lectures/
├── jobs/
├── outputs/
├── status/
├── cache/
├── validation/
├── smoke/
└── screenshots/
```

The most important lanes are:

- `generated/lectures`: compiled topic workspaces and manifests.
- `generated/jobs`: external worker input jobs.
- `generated/outputs`: manual/production outputs from external workers.
- `generated/status`: per-job status files.

## `generated/lectures`

Path shape:

```text
generated/lectures/<school>/<course>/<session>/<topic>/
```

Example:

```text
generated/lectures/AC/ROB9205_Industrial_Robots_W2026/S01/01_course_intro_and_expectations/
```

Typical contents:

```text
audio/
layout.manifest.json
script.manifest.json
tts_alignment.json
timeline.json
motion.manifest.json
motion/*.motion.json
screenshots/*.png
subtitles/*.vtt
review/index.html
review/script_preview.md
```

### `layout.manifest.json`

Machine-readable slide layout.

Use it for:

- slide viewport
- slide element IDs
- bullet IDs
- title IDs
- image/media/widget IDs
- bounding boxes
- target geometry
- avoiding content occlusion

Example excerpt:

```json
{
  "topic_id": "01_course_intro_and_expectations",
  "viewport": [1920, 1080],
  "slides": [
    {
      "slide_id": "project_proposal",
      "slide_type": "bullets",
      "bbox": [0, 0, 1920, 1080],
      "elements": [
        {
          "id": "title",
          "type": "title",
          "bbox": [90, 105, 1830, 196.5]
        },
        {
          "id": "bullet_1",
          "type": "bullet",
          "bbox": [135, 229.5, 1830, 277.34]
        }
      ]
    }
  ]
}
```

Coordinate system:

```text
1920 x 1080 px
16:9
fixed camera
```

### `script.manifest.json`

Generated script and delivery metadata.

Use it for:

- spoken text
- segment IDs
- target element references
- attention mode
- tone/energy/pace
- teacher delivery hints
- avatar hints

Example excerpt:

```json
{
  "topic_id": "01_course_intro_and_expectations",
  "slides": [
    {
      "slide_id": "project_proposal",
      "slide_type": "bullets",
      "segments": [
        {
          "segment_id": "seg_01",
          "text": "The project proposal is due online in week three.",
          "target_element": "title",
          "attention_mode": "slide_focus",
          "voice": {
            "tone": "clear_teacher",
            "energy": 0.58,
            "pace": 0.96
          }
        }
      ]
    }
  ]
}
```

### `tts_alignment.json`

Compiled fallback alignment.

This may be based on fallback local audio. Use production/manual alignment from `generated/outputs/alignment/...` when it exists.

Priority:

```text
1. generated/outputs/alignment/<school>/<course>/<session>/<topic>/tts_alignment.json
2. generated/lectures/<school>/<course>/<session>/<topic>/tts_alignment.json
```

### `timeline.json`

Cue timing and slide actions.

Use it as supporting data for:

- cue timing
- highlights
- avatar behavior
- target element
- target bbox
- attention point

Example cue shape:

```json
{
  "cue_id": "cue_01",
  "segment_id": "seg_01",
  "t0": 0,
  "t1": 9.08,
  "speech": "The project proposal is due online in week three.",
  "attention_mode": "slide_focus",
  "target_element": "title",
  "target_type": "title",
  "attention_xy": [960, 150.75],
  "target_bbox": [90, 105, 1830, 196.5],
  "actions": [
    {
      "type": "highlight",
      "element": "title"
    },
    {
      "type": "avatar",
      "behavior": "idle_talk",
      "screen_anchor": "right_bottom",
      "expression": "friendly_confident",
      "target_element": "title"
    }
  ]
}
```

### `motion.manifest.json`

Topic-level summary of generated slide motion planning.

Use it for overview and topic-level continuity.

### `motion/*.motion.json`

Main deterministic motion-control data for final video.

Path:

```text
generated/lectures/<school>/<course>/<session>/<topic>/motion/<slide_id>.motion.json
```

Example:

```json
{
  "schema_version": "phase7-motion-manifest-v1",
  "topic_id": "01_course_intro_and_expectations",
  "viewport": [1920, 1080],
  "sample_rate_fps": 6,
  "slide": {
    "slide_id": "project_proposal",
    "duration": 40.04,
    "timing_source": "manual",
    "entry_policy": "carry_previous_slide",
    "carry_pose_in": {
      "root_xy": [1689.6, 879.18],
      "screen_anchor": "right_bottom",
      "visibility_mode": "inside"
    },
    "carry_pose_out": {
      "root_xy": [1689.6, 879.18],
      "screen_anchor": "right_bottom",
      "visibility_mode": "inside"
    },
    "cues": [
      {
        "cue_id": "cue_01",
        "segment_id": "seg_01",
        "t0": 0,
        "t1": 9.08,
        "duration": 9.08,
        "speech": "The project proposal is due online in week three.",
        "target_element": "title",
        "target_type": "title",
        "target_bbox": [90, 105, 1830, 196.5],
        "attention_xy": [960, 150.75],
        "attention_mode": "slide_focus",
        "behavior": "idle_talk",
        "expression": "friendly_confident",
        "importance": 0.65,
        "preferred_anchor": "right_bottom",
        "placement_bbox": [1459.2, 678.35, 1920, 1080],
        "visibility_mode": "inside",
        "center_xy": [1689.6, 879.18],
        "should_reposition": false,
        "walk_start_t": 9.08,
        "walk_end_t": 9.08,
        "pointing_required": false,
        "point_target_xy": null,
        "gaze_mode": "viewer_primary",
        "tone": "clear_teacher",
        "energy": 0.58,
        "pace": 0.96,
        "emphasis_words": []
      }
    ],
    "samples": [
      {
        "t": 0,
        "cue_id": "cue_01",
        "segment_id": "seg_01",
        "root_x": 1689.6,
        "root_y": 879.18,
        "body_yaw_deg": -18,
        "head_yaw_deg": -28,
        "gaze_target_xy": [960, 210.26],
        "point_target_xy": null,
        "gesture_mode": "idle_talk",
        "gesture_weight": 0.65,
        "walk_speed_px_s": 0,
        "screen_anchor": "right_bottom",
        "visibility_mode": "inside",
        "expression": "friendly_confident"
      }
    ]
  }
}
```

Video renderer should use:

- `slide.duration` for expected slide video duration.
- `slide.cues[]` for semantic beats.
- `slide.samples[]` as a 6 fps control track.
- `root_x/root_y` for avatar root placement.
- `body_yaw_deg/head_yaw_deg` for facing.
- `gaze_target_xy` for eyes/head.
- `point_target_xy` for pointing.
- `gesture_mode` and `gesture_weight` for body gesture style.
- `placement_bbox` for safe avatar area.
- `target_bbox` for the active slide content to avoid blocking.

### `screenshots/*.png`

Rendered slide screenshots.

Use for:

- visual preview
- occlusion checking
- optional background reference
- debugging final video placement

The final transparent avatar video should not bake in the screenshot unless intentionally producing a preview.

### `audio/*.wav`

Compiled fallback audio. This is usually low-quality local fallback audio. Prefer production audio from `generated/outputs/audio/...`.

### `subtitles/*.vtt`

Subtitles generated from alignment. After `refresh:motion`, these should follow production/manual timing if available.

### `review/`

Human review pages and script previews.

## `generated/jobs`

External worker job inputs live here.

```text
generated/jobs/
├── tts/
├── avatar/
└── slide_video/
```

### `generated/jobs/tts`

Production TTS jobs.

Path shape:

```text
generated/jobs/tts/<school>/<course>/<session>/<topic>/<slide_id>.json
```

Example fields:

```json
{
  "kind": "tts",
  "job_id": "01_course_intro_and_expectations__project_proposal",
  "topic_id": "01_course_intro_and_expectations",
  "slide_id": "project_proposal",
  "audio_output_file": "generated/outputs/audio/AC/.../project_proposal.wav",
  "alignment_output_file": "generated/outputs/alignment/AC/.../tts_alignment.json",
  "segments": [
    {
      "segment_id": "seg_01",
      "text": "The project proposal is due online in week three.",
      "tone": "clear_teacher",
      "energy": 0.58,
      "pace": 0.96,
      "emphasis_words": [],
      "target_element": "title",
      "attention_mode": "slide_focus"
    }
  ],
  "contract_hash": "..."
}
```

The Qwen TTS worker reads this and writes production audio/alignment.

### `generated/jobs/avatar`

Older cue-level avatar jobs.

Path shape:

```text
generated/jobs/avatar/<school>/<course>/<session>/<topic>/<slide_id>__<cue_id>.json
```

Example fields:

```json
{
  "kind": "avatar",
  "slide_id": "project_proposal",
  "cue_id": "cue_01",
  "behavior": "idle_talk",
  "expression": "friendly_confident",
  "duration_sec": 9.08,
  "background": "transparent",
  "contains_audio": false,
  "screen_anchor": "right_bottom",
  "target_element": "title",
  "output_file": "generated/outputs/renders/AC/.../project_proposal__cue_01.webm"
}
```

These are still valid but are not the preferred new video pipeline. The preferred pipeline uses one slide-video job per slide.

### `generated/jobs/slide_video`

Primary final video-generation jobs.

Path shape:

```text
generated/jobs/slide_video/<school>/<course>/<session>/<topic>/<slide_id>.json
```

Example:

```json
{
  "schema_version": "phase7-slide-video-job-v1",
  "kind": "slide_video",
  "job_id": "01_course_intro_and_expectations__project_proposal",
  "selector": {
    "school": "AC",
    "course": "ROB9205_Industrial_Robots_W2026",
    "session": "S01",
    "topic": "01_course_intro_and_expectations"
  },
  "topic_id": "01_course_intro_and_expectations",
  "slide_id": "project_proposal",
  "duration_sec": 40.04,
  "timing_source": "manual",
  "viewport": [1920, 1080],
  "sample_rate_fps": 6,
  "fixed_camera": true,
  "background": "transparent",
  "contains_audio": false,
  "audio": {
    "preferred": "generated/outputs/audio/AC/.../project_proposal.wav",
    "manual": "generated/outputs/audio/AC/.../project_proposal.wav",
    "compiled": "generated/outputs/audio/AC/.../project_proposal.wav"
  },
  "alignment": {
    "preferred": "generated/outputs/alignment/AC/.../tts_alignment.json",
    "manual": "generated/outputs/alignment/AC/.../tts_alignment.json",
    "compiled": "generated/lectures/AC/.../tts_alignment.json"
  },
  "resolved_audio_file": "generated/outputs/audio/AC/.../project_proposal.wav",
  "resolved_alignment_file": "generated/outputs/alignment/AC/.../tts_alignment.json",
  "motion_manifest_file": "generated/lectures/AC/.../motion/project_proposal.motion.json",
  "topic_motion_manifest_file": "generated/lectures/AC/.../motion.manifest.json",
  "entry_policy": "carry_previous_slide",
  "carry_pose_in": {
    "root_xy": [1689.6, 879.18],
    "screen_anchor": "right_bottom",
    "visibility_mode": "inside"
  },
  "output_file": "generated/outputs/slide_video/AC/.../project_proposal.webm",
  "secondary_output_files": [
    "generated/outputs/slide_video/AC/.../project_proposal.mp4"
  ],
  "contract_hash": "10cb66bcbfb61cc0"
}
```

This should be the first file a final video worker reads.

## `generated/outputs`

External worker outputs live here.

```text
generated/outputs/
├── audio/
├── alignment/
├── renders/
└── slide_video/
```

### `generated/outputs/audio`

Production TTS WAVs.

Path shape:

```text
generated/outputs/audio/<school>/<course>/<session>/<topic>/<slide_id>.wav
```

Use these for lip sync and final playback audio.

### `generated/outputs/alignment`

Production TTS timing.

Path shape:

```text
generated/outputs/alignment/<school>/<course>/<session>/<topic>/tts_alignment.json
```

Example:

```json
{
  "topic_id": "01_course_intro_and_expectations",
  "provider": {
    "id": "qwen3_tts_customvoice_worker",
    "speaker": "Aiden",
    "language": "English"
  },
  "slides": [
    {
      "slide_id": "project_proposal",
      "audio_file": "generated/outputs/audio/AC/.../project_proposal.wav",
      "duration": 40.04,
      "segments": [
        {
          "segment_id": "seg_01",
          "t0": 0,
          "t1": 9.08,
          "alignment_quality": "estimated_word",
          "words": [
            {
              "word": "Welcome",
              "t0": 0,
              "t1": 0.589
            }
          ]
        }
      ]
    }
  ]
}
```

Use this for:

- slide duration
- segment timing
- word timing
- lip sync timing anchors
- cue timing refresh

### `generated/outputs/renders`

Older cue-level avatar outputs.

Path shape:

```text
generated/outputs/renders/<school>/<course>/<session>/<topic>/<slide_id>__<cue_id>.webm
```

This is not the preferred new slide-level video output, but it remains part of the older contract.

### `generated/outputs/slide_video`

Final slide-level transparent avatar videos should be written here.

Path shape:

```text
generated/outputs/slide_video/<school>/<course>/<session>/<topic>/<slide_id>.webm
```

Optional proxy:

```text
generated/outputs/slide_video/<school>/<course>/<session>/<topic>/<slide_id>.mp4
```

Expected output:

- 1920x1080
- transparent background
- fixed camera
- usually silent
- full slide duration
- avatar does not cover important content
- can be composited with slide visuals and audio

## `generated/status`

Per-job statuses live here.

Path shapes:

```text
generated/status/<school>/<course>/<session>/<topic>/tts/<slide_id>.job_status.json
generated/status/<school>/<course>/<session>/<topic>/avatar/<slide_id>__<cue_id>.job_status.json
generated/status/<school>/<course>/<session>/<topic>/slide_video/<slide_id>.job_status.json
```

Allowed states:

```text
pending
running
done
error
```

Expected shape:

```json
{
  "schema_version": "phase7-slide-video-status-v1",
  "job_id": "01_course_intro_and_expectations__project_proposal",
  "kind": "slide_video",
  "state": "done",
  "contract_hash": "10cb66bcbfb61cc0",
  "output_file": "generated/outputs/slide_video/AC/.../project_proposal.webm",
  "secondary_output_files": [
    "generated/outputs/slide_video/AC/.../project_proposal.mp4"
  ],
  "reused": false,
  "updated_at": "2026-05-03T00:00:00.000Z"
}
```

The final video worker should update `slide_video` status files.

## Qwen TTS Worker

Folder:

```text
tools/qwen_tts_worker/
```

Important files:

```text
README.md
environment.yml
requirements.txt
config.example.json
setup_conda.sh
run_tts_worker.py
qwen_backend.py
instruction_builder.py
audio_utils.py
alignment_utils.py
status_utils.py
contract_utils.py
test_one_job.py
test_sentence_compare.py
```

Purpose:

- run on stronger computer
- read `generated/jobs/tts/**/*.json`
- generate Qwen CustomVoice TTS
- write `generated/outputs/audio/**/*.wav`
- write `generated/outputs/alignment/**/tts_alignment.json`
- update `generated/status/**/tts/*.job_status.json`

Speaker is configurable in:

```text
tools/qwen_tts_worker/config.example.json
```

Current default speaker is `Aiden`.

## HY-Motion And ComfyUI

ComfyUI was run on another machine like:

```bash
cd ~/ComfyUI_motion
source /home/monjazeb/.virtualenvs/comfy_motion/bin/activate
python main.py --listen 0.0.0.0 --port 8189
```

Queue from this repo:

```bash
npm run queue:hy-motion -- \
  --timingMode compress12 \
  --comfyUrl http://10.0.0.16:8189
```

Queue reports:

```text
generated/lectures/hy_motion_queue.report.json
generated/lectures/hy_motion_queue.report.md
```

Remote ComfyUI output paths:

```text
~/ComfyUI_motion/output/webdeck_hy_motion/npz/<school>/<course>/<session>/<topic>/
~/ComfyUI_motion/output/webdeck_hy_motion/fbx/<school>/<course>/<session>/<topic>/
```

Important current finding:

- NPZ output is reliable and should be treated as the primary HY-Motion asset.
- FBX export may be empty or not produced.
- Do not depend on FBX until export is verified.
- The queue runner now records expected NPZ/FBX outputs per part and can check ComfyUI history plus `--comfyOutputRoot` when the ComfyUI output folder is mounted locally.
- Local synced HY-Motion assets use `generated/outputs/motion/hy_motion/npz/<school>/<course>/<session>/<topic>/`.

### HY-Motion Timing Modes

`chunk` mode:

- splits slides into <=12s HY-Motion parts
- uses names like `slide_id__part_01`

`compress12` mode:

- generates one 12-second dense base motion per slide
- records `stretch_factor`
- later video/animation stage must retime it to full slide duration

Queue report example:

```json
{
  "timing_mode": "compress12",
  "jobs": [
    {
      "slide_id": "project_proposal",
      "npz_output_dir": "webdeck_hy_motion/npz/AC/ROB9205_Industrial_Robots_W2026/S01/01_course_intro_and_expectations",
      "parts": [
        {
          "index": 1,
          "total": 1,
          "t0": 0,
          "t1": 40.04,
          "duration_sec": 12,
          "stretch_factor": 3.337,
          "filename_prefix": "project_proposal",
          "seed": 691268165
        }
      ]
    }
  ]
}
```

## Final Video Worker Design

The repo now includes `scripts/render_slide_video.mjs`, exposed as:

```bash
npm run render:slide-video
```

It scans:

```text
generated/jobs/slide_video/**/*.json
```

For each job:

1. Read slide-video job.
2. Read `job.motion_manifest_file`.
3. Read `job.resolved_audio_file`.
4. Read `job.resolved_alignment_file`.
5. Read topic `layout.manifest.json`.
6. Read topic `script.manifest.json`.
7. Read slide screenshot if needed.
8. Locate matching HY-Motion NPZ if available.
9. If using `compress12`, stretch generated motion by `stretch_factor`.
10. Add lip sync from WAV and alignment words.
11. Apply deterministic controls from `motion/*.motion.json`.
12. Keep avatar inside placement/safe areas.
13. Avoid active target bbox and important slide elements.
14. Render transparent silent WebM at 1920x1080.
15. Save to `job.output_file`.
16. Optionally save MP4 proxy to `job.secondary_output_files[0]`.
17. Update `generated/status/.../slide_video/<slide_id>.job_status.json`.

Current implementation status:

- Resolves all required repo contracts.
- Locates local HY-Motion NPZ files under `generated/outputs/motion/hy_motion/npz/...`.
- Writes render packets under `generated/cache/slide_video_render/...`.
- Writes readiness/render reports under `generated/lectures/slide_video_render.report.*`.
- Invokes an external renderer command when `--rendererCommand` or `WEBDECK_SLIDE_VIDEO_RENDERER` is supplied.
- Updates slide-video status files only during actual render runs.
- Does not yet implement the avatar/lip-sync renderer itself.

Most important input priority:

```text
1. generated/jobs/slide_video/<...>/<slide_id>.json
2. job.resolved_audio_file
3. job.resolved_alignment_file
4. job.motion_manifest_file
5. generated/lectures/<...>/layout.manifest.json
6. generated/lectures/<...>/script.manifest.json
7. HY-Motion NPZ output
8. job.output_file
9. generated/status/<...>/slide_video/<slide_id>.job_status.json
```

Do not use compiled fallback audio/timing if manual/output audio and alignment exist.

## Final Video Rendering Requirements

For every slide output:

- Resolution: `1920x1080`.
- Ratio: `16:9`.
- Camera: fixed.
- Background: transparent.
- Audio: usually silent.
- Duration: exactly `job.duration_sec`.
- Placement: follow motion samples and placement boxes.
- Occlusion: avoid active target boxes and important slide content.
- Face direction: usually face students, not the slide.
- Motion: slow walking only, no abrupt resets.
- Slide continuity: respect `entry_policy`, `carry_pose_in`, and `carry_pose_out`.
- First slide may enter from right.
- Next slide should start from previous slide final pose when practical.

## Known Strengths

- Strong generated contracts exist for script, layout, timing, TTS, motion, and slide-video jobs.
- Production audio and fallback compiled audio are separated cleanly.
- Manual/output alignment can drive refreshed timing.
- Slide-video jobs provide one clean handoff per slide.
- Motion files already include root, gaze, gesture, and positioning controls.
- HY-Motion can be queued remotely.
- `compress12` avoids the HY-Motion 12-second max duration problem.

## Known Weaknesses And Gaps

- Final slide-video worker wrapper exists, but the actual avatar/lip-sync renderer command is not implemented in this repo yet.
- HY-Motion FBX export is unreliable or empty.
- NPZ outputs are currently on the remote ComfyUI machine until copied or synced back.
- Queue runner can record/verify outputs, but actual remote filesystem verification needs `--comfyOutputRoot` or a mounted/copyable output folder.
- A local NPZ sync helper exists, but it expects a local/mounted source folder rather than doing SSH/SCP itself.
- Lip sync stage is not implemented yet.
- Background removal/alpha render/upscale stage is not implemented yet.
- `compress12` retiming quality needs testing in the final renderer.
- Slide-video status files are updated only when the worker runs an actual renderer command.
- Playback integration should be tested once slide-video outputs exist.

## Recommended Next Steps

1. Mount or copy the remote ComfyUI output folder locally, then run `npm run sync:hy-motion` for the queued topic.

2. Run `npm run render:slide-video` for one slide to confirm the render packet is ready once the NPZ is synced.

3. Implement or connect the actual renderer command.
   - Input: render packet from `generated/cache/slide_video_render/...`
   - Output: `generated/outputs/slide_video/**/*.webm`
   - Status: `generated/status/**/slide_video/*.job_status.json`

4. Add lip sync.
   - Use `resolved_audio_file`.
   - Use `resolved_alignment_file`.
   - Generate mouth/viseme animation.

5. Add transparent render/upscale.
   - Render full-slide transparent WebM.
   - Optionally produce MP4 preview.

6. Test one slide end to end.
   - Good test slide: `project_proposal`.

7. Test one full topic.
   - Good test topic:
     ```text
     AC/ROB9205_Industrial_Robots_W2026/S01/01_course_intro_and_expectations
     ```

8. Scale to all AC, then UO.

## Best Files For A Fresh Assistant To Read First

```text
docs/project_handoff_for_new_chat.md
docs/lecture_plan_semantics.md
docs/slide_motion_pipeline.md
docs/hy_motion_comfyui_batch.md
docs/final_slide_video_worker.md
scripts/refresh_motion.mjs
scripts/queue_hy_motion_comfyui.mjs
scripts/sync_hy_motion_outputs.mjs
scripts/render_slide_video.mjs
scripts/lib/lecture/motion_planning.mjs
scripts/lib/lecture/hy_motion_instructions.mjs
scripts/lib/lecture/hy_motion_assets.mjs
scripts/lib/lecture/jobs.mjs
tools/qwen_tts_worker/README.md
hy_motion_slide_batch_workflow.json
generated/jobs/slide_video/AC/ROB9205_Industrial_Robots_W2026/S01/01_course_intro_and_expectations/project_proposal.json
generated/lectures/AC/ROB9205_Industrial_Robots_W2026/S01/01_course_intro_and_expectations/motion/project_proposal.motion.json
generated/lectures/AC/ROB9205_Industrial_Robots_W2026/S01/01_course_intro_and_expectations/layout.manifest.json
generated/lectures/AC/ROB9205_Industrial_Robots_W2026/S01/01_course_intro_and_expectations/script.manifest.json
generated/outputs/alignment/AC/ROB9205_Industrial_Robots_W2026/S01/01_course_intro_and_expectations/tts_alignment.json
generated/lectures/hy_motion_queue.report.json
```
