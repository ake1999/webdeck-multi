# WebDeck Multi

WebDeck Multi is a browser-based lecture deck system built around structured `*.slides.js` files instead of PowerPoint.

Phase 1 turns the deck into a deterministic, machine-readable presentation system that can later drive:

- script generation
- attention-point generation
- avatar pointing / placement
- TTS alignment
- future scene and video pipelines

Phase 2 adds catalog-wide validation and smoke-export tooling so we can answer:

- which topics are ready for Phase 3 script/timeline work
- which topics have warnings but still export
- which topics are blocked by real errors

## Phase 1 Features

- Stable semantic slide IDs and element IDs
- DOM instrumentation via `data-slide-id`, `data-element-id`, `data-element-type`
- Deterministic fixed-viewport analysis export at `1920x1080`
- Layout manifest generation with element bounding boxes and anchors
- Screenshot export for every slide in a topic
- Runtime control API for slide navigation, highlighting, and overlays
- Optional debug overlay mode for IDs, boxes, anchors, and avatar-safe zones

## Supported Slide Types

Top-level slide types:

- `title`
- `bullets`
- `text`
- `two-col`
- `mcq`

Rich text inside titles, bullets, leads, and paragraphs supports:

- `**bold**`
- `` `inline code` ``
- fenced code blocks
- markdown links
- bare URLs
- KaTeX math

Column/content media kinds:

- `image`
- `video`
- `iframe`
- `widget`
- `gallery`               

## Stable IDs

You can author IDs manually, or let the deck generate them deterministically.

Examples:

```js
{
  id: "nav2_intro",
  type: "bullets",
  title: "Nav2 Overview",
  bullets: [
    { id: "bullet_1", text: "Navigation pipeline overview" },
    { id: "bullet_2", text: "Global plan + local control" }
  ]
}
```

If IDs are omitted, the runtime generates stable semantic IDs from slide content and structure.

Rendered DOM elements expose:

- `data-slide-id`
- `data-element-id`
- `data-element-type`
- `data-parent-element-id` when relevant

## Run The Deck

Start the local static server:

```bash
python3 serve_deck.py
```

Then open:

```text
http://127.0.0.1:8000/
```

## Export Layout Metadata

Generate a layout manifest and screenshots for one topic:

```bash
node scripts/export_layout.mjs \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 02_robot_safety
```

Outputs:

- `generated/layout.manifest.json`
- `generated/screenshots/*.png`

Optional debug screenshots:

```bash
node scripts/export_layout.mjs \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 02_robot_safety \
  --debug-screenshots
```

## Validate The Catalog

Validate one topic:

```bash
node scripts/validate_catalog.mjs \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 02_robot_safety
```

Validate one session:

```bash
node scripts/validate_catalog.mjs \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01
```

Validate one course:

```bash
node scripts/validate_catalog.mjs \
  --school UO \
  --course MCG5138_Autonomous_Mobile_Robots_W2026
```

Validate the full catalog:

```bash
node scripts/validate_catalog.mjs
```

Validation outputs:

- `generated/validation/report.json`
- `generated/validation/report.md`
- `generated/validation/index.html`
- `generated/validation/topics/*.html`
- `generated/validation/exports/...`

Validation statuses:

- `ready`: no blocking errors and no warnings
- `warning`: export works, but the topic has authoring gaps or non-deterministic dependencies
- `blocked`: export failed or the topic has schema / asset / manifest errors

Phase 2 checks include:

- duplicate or missing slide IDs
- duplicate or missing important element IDs
- invalid slide types
- missing local assets
- external/remote media dependencies
- manifest schema and geometry sanity
- screenshot presence
- notes/narration gaps

## Batch Smoke Export

Smoke-export one topic:

```bash
node scripts/smoke_export.mjs \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 02_robot_safety
```

Smoke-export the full catalog:

```bash
node scripts/smoke_export.mjs
```

Smoke-export outputs:

- `generated/smoke/report.json`
- `generated/smoke/report.md`
- `generated/smoke/exports/...`

## Debug Overlay Mode

Open any topic with `debug=1` to draw:

- slide ID
- element IDs
- element bounding boxes
- anchor points
- avatar-safe zones

Example:

```text
http://127.0.0.1:8000/session.html?school=AC&course=ROB9205_Industrial_Robots_W2026&session=S01&topic=02_robot_safety&debug=1
```

You can also open analysis mode directly:

```text
http://127.0.0.1:8000/session.html?school=AC&course=ROB9205_Industrial_Robots_W2026&session=S01&topic=02_robot_safety&analysis=1
```

Analysis mode hides the interactive chrome and injects the JSON manifest into the page for the exporter to read.

## Runtime Control API

The viewer exposes `window.deckController`:

```js
deckController.goToSlide("nav2_intro");
deckController.nextSlide();
deckController.prevSlide();

deckController.pause();
deckController.resume();

deckController.highlightElement("nav2_intro", "bullet_2");
deckController.clearHighlights();

deckController.showOverlay([
  { id: "focus_box", type: "box", bbox: [980, 150, 1500, 650], label: "diagram_1" }
]);
deckController.clearOverlay();
```

Useful exporter/runtime methods:

- `deckController.waitForSettledState()`
- `deckController.exportLayoutManifest()`
- `deckController.setDebugOverlay(true)`

## Manifest Shape

Example:

```json
{
  "topic_id": "02_robot_safety",
  "viewport": [1920, 1080],
  "slides": [
    {
      "slide_id": "safety_emergency_stops",
      "slide_type": "two-col",
      "bbox": [0, 0, 1920, 1080],
      "elements": [
        {
          "id": "title",
          "type": "title",
          "bbox": [90, 105, 1830, 196.5],
          "anchor": [960, 150.75],
          "visible": true
        },
        {
          "id": "right_image_1",
          "type": "image",
          "bbox": [1277.25, 347.25, 1626.75, 771.75],
          "anchor": [1452, 559.5],
          "visible": true
        }
      ],
      "zones": {
        "avatar_safe_left": [0, 604.8, 460.8, 1080],
        "avatar_safe_right": null
      }
    }
  ]
}
```

The schema is frozen for Phase 1/2 at:

- `schemas/layout.manifest.schema.json`

Required top-level fields:

- `topic_id`
- `viewport`
- `slides[]`

Required slide fields:

- `slide_id`
- `slide_type`
- `bbox`
- `elements[]`
- `zones`

Required element fields:

- `id`
- `type`
- `parent_id`
- `label`
- `order`
- `bbox`
- `anchor`
- `visible`

Required zone fields:

- `avatar_safe_left`
- `avatar_safe_right`

## Build Narrated Lectures

Phase 5 keeps the frozen Phase 4.5 contracts and upgrades script writing from deterministic-first to provider-driven authoring:

- optional `*.lecture.plan.json` authoring per topic
- optional `*.script.override.json` for exact approved wording on selected slides
- optional shared `shared/avatar.profile.json`
- optional shared `shared/reference_assets.json`
- script providers: `deterministic`, `llm_local`, `script_override`, and `auto`
- `qwen3_tts` as the higher-quality local-first provider with `ffmpeg_flite` fallback
- avatar actions in `timeline.json`
- placeholder avatar playback plus exported future render jobs

The core artifact flow is:

`slides.js + layout.manifest.json -> script.manifest.json -> audio/*.wav + tts_alignment.json -> timeline.json + subtitles/*.vtt`

The safest default provider is still local `ffmpeg` + `flite`. Qwen is supported through a Python runner and falls back cleanly when its packages or reference assets are not present.

For script generation, the recommended default is now:

- `auto` for interactive and pilot builds
- `deterministic` for strict fallback-only CI builds

`auto` uses this precedence per slide:

1. `*.script.override.json`
2. explicit `lecture.plan.json` narration
3. `llm_local`
4. lecture-plan guidance such as `narration_seed`, `must_cover`, and `must_say`
5. authored `slides.js` narration / notes
6. deterministic visible-content fallback

Build one narrated topic:

```bash
node scripts/build_lecture.mjs \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 02_robot_safety
```

Or with the package script:

```bash
npm run build:lecture -- \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 02_robot_safety
```

Important options:

- `--provider ffmpeg_flite`
- `--provider qwen3_tts`
- `--voiceName slt`
- `--scriptProvider auto`
- `--scriptProvider deterministic`
- `--scriptProvider llm_local`
- `--scriptProvider script_override`
- `--scriptModel llama3.1:8b`
- `--scriptEndpoint http://127.0.0.1:11434`
- `--scriptPromptVersion script_writer_v1`
- `--scriptTemperature 0.2`
- `--scriptMaxRetries 2`
- `--allowScriptFallback 1`
- `--scriptOverride courses/.../<topic>.script.override.json`
- `--lecturePlan courses/.../<topic>.lecture.plan.json`
- `--avatarProfile shared/avatar.profile.json`
- `--referenceAssets shared/reference_assets.json`
- `--qwenMode clone`
- `--qwenModelId Qwen/Qwen3-TTS-12Hz-0.6B-Base`
- `--qwenReferenceAudio assets/voice/ali_ref_neutral_01.wav`
- `--qwenReferenceText "Hello everyone ..."`
- `--allowProviderFallback 1`
- `--maxSegmentsPerSlide 8`
- `--maxAutoItems 6`
- `--analysisTimeoutMs 180000`

Example Phase 4 pilot build:

```bash
node scripts/build_lecture.mjs \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S02 \
  --topic 03_robot_characteristics_manipulator_types \
  --provider qwen3_tts \
  --allowProviderFallback 1
```

Example deterministic script build:

```bash
npm run build:lecture -- \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S02 \
  --topic 03_robot_characteristics_manipulator_types \
  --scriptProvider deterministic
```

Example local-LLM script build:

```bash
npm run build:lecture -- \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S02 \
  --topic 03_robot_characteristics_manipulator_types \
  --scriptProvider llm_local \
  --scriptModel llama3.1:8b \
  --scriptEndpoint http://127.0.0.1:11434 \
  --allowScriptFallback 1
```

`llm_local` supports Ollama-compatible and OpenAI-compatible local endpoints. The build validates slide JSON output, retries invalid responses, and falls back cleanly when fallback is allowed.

Qwen local install target:

```bash
pip install -U qwen-tts
```

The current provider adapter uses the official local Python package and `Qwen3TTSModel` API for voice cloning and related modes. If Qwen or the reference assets are missing, the build still completes by falling back to `ffmpeg_flite`.

Outputs for each topic are written to:

- `generated/lectures/<school>/<course>/<session>/<topic>/layout.manifest.json`
- `generated/lectures/<school>/<course>/<session>/<topic>/script.manifest.json`
- `generated/lectures/<school>/<course>/<session>/<topic>/audio/*.wav`
- `generated/lectures/<school>/<course>/<session>/<topic>/tts_alignment.json`
- `generated/lectures/<school>/<course>/<session>/<topic>/timeline.json`
- `generated/lectures/<school>/<course>/<session>/<topic>/subtitles/*.vtt`
- `generated/lectures/<school>/<course>/<session>/<topic>/review/script_preview.md`
- `generated/lectures/<school>/<course>/<session>/<topic>/review/index.html`
- `generated/jobs/tts/<school>/<course>/<session>/<topic>/*.json`
- `generated/jobs/avatar/<school>/<course>/<session>/<topic>/*.json`
- `generated/status/<school>/<course>/<session>/<topic>/topic_status.json`
- `generated/status/<school>/<course>/<session>/<topic>/tts/*.job_status.json`
- `generated/status/<school>/<course>/<session>/<topic>/avatar/*.job_status.json`

`script.manifest.json` now records per-slide provenance such as:

- `script_source`
- `provider_used`
- `model_used`
- `prompt_version`
- `fallback_reason`
- `cache_used`

The review page also shows this provenance, plus a pilot comparison view for deterministic vs `llm_local` vs `script_override` when available.

## Phase 4.5 Preparation

Phase 4.5 freezes the pre-generation contract so the render machine can work later without redesigning the deck.

Generate or upgrade lecture plans, build the frozen artifacts, create TTS/avatar jobs, and write readiness status for the full catalog:

```bash
npm run prepare:generation
```

Or for one topic:

```bash
npm run prepare:generation -- \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S02 \
  --topic 03_robot_characteristics_manipulator_types
```

If manual TTS audio/alignment arrives later and you want timing-sensitive artifacts to match it without rerunning the full build, refresh motion artifacts only:

```bash
npm run refresh:motion
```

Or for one topic:

```bash
npm run refresh:motion -- \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations \
  --motionSampleRateFps 6
```

This updates subtitles, `timeline.json`, avatar jobs, motion manifests, slide-video jobs, and review output using manual alignment when available.

For HY-Motion text-to-motion generation from the slide-video jobs, use the ComfyUI batch queue:

```bash
npm run queue:hy-motion -- \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations \
  --dryRun
```

Then remove `--dryRun` to actually queue prompts into ComfyUI. The queue reads `generated/jobs/slide_video/...`, builds a slide-specific motion instruction from the motion plan, and saves NPZ/FBX motion assets in the ComfyUI output folder. See:

- `docs/hy_motion_comfyui_batch.md`

Re-check readiness without rebuilding:

```bash
npm run check:generation
```

Phase 4.5 output contracts:

- `generated/outputs/audio/<school>/<course>/<session>/<topic>/<slide_id>.wav`
- `generated/outputs/alignment/<school>/<course>/<session>/<topic>/tts_alignment.json`
- `generated/outputs/renders/<school>/<course>/<session>/<topic>/<slide_id>__<cue_id>.webm`
- `generated/outputs/renders/<school>/<course>/<session>/<topic>/<slide_id>__<cue_id>.png`
- `generated/status/catalog_summary.json`

The runtime and review pages are wired to these manual-drop locations already. If you copy externally generated media into those paths later, the deck can pick them up immediately.

## Lecture Playback

Open a topic with the compiled lecture timeline:

```text
http://127.0.0.1:8000/session.html?school=AC&course=ROB9205_Industrial_Robots_W2026&session=S01&topic=02_robot_safety&lecture=1
```

To request automatic start on load:

```text
http://127.0.0.1:8000/session.html?school=AC&course=ROB9205_Industrial_Robots_W2026&session=S01&topic=02_robot_safety&lecture=1&autoplay=1
```

Strict media source modes:

- `mediaSource=compiled`
  compiled assets only, never falls back to manual outputs
- `mediaSource=manual`
  manual-drop outputs only, never falls back to compiled assets
- `mediaSource=auto`
  manual when present, otherwise compiled

Example:

```text
http://127.0.0.1:8000/session.html?school=AC&course=ROB9205_Industrial_Robots_W2026&session=S02&topic=03_robot_characteristics_manipulator_types&lecture=1&mediaSource=manual
```

The deck injects `window.lecturePlayer`, `window.lectureMediaController`, and uses `window.deckController` underneath for:

- narrated slide-to-slide playback
- element highlighting from timeline cues
- caption text for the current segment
- placeholder avatar playback from timeline avatar actions
- strict compiled/manual/auto media selection with source logging
- manual-drop audio and avatar/render playback
- pause / restart controls in the viewer

Media controller API:

```js
lectureMediaController.play();
lectureMediaController.pause();
lectureMediaController.resume();
lectureMediaController.stop();

await lectureMediaController.seek(42);
await lectureMediaController.seekBy(-5);

lectureMediaController.setPlaybackRate(1.1);
lectureMediaController.getCurrentTime();
lectureMediaController.getTotalDuration();

await lectureMediaController.reloadMedia();
await lectureMediaController.setMediaSourceMode("auto");
lectureMediaController.getLoadedMedia();
```

## Pilot Topics

Phase 3 was exercised on these warning-only topics:

- `AC / ROB9205_Industrial_Robots_W2026 / S01 / 02_robot_safety`
- `AC / ROB9205_Industrial_Robots_W2026 / S02 / 02_robot_components`
- `AC / ROB9205_Industrial_Robots_W2026 / S08 / 01_branching_instructions`
- `AC / ROB9205_Industrial_Robots_W2026 / S02 / 03_robot_characteristics_manipulator_types` for the Phase 4 Qwen/avatar pilot

## Notes

- The viewer server is now a plain static Python server. Flask and Piper are not required for Phase 1.
- Phase 4 adds a real `qwen3_tts` adapter, but the current environment still needs `qwen-tts`, `torch`, and your reference assets before the higher-quality path can run for real.
- Avatar render clips are silent by contract. Narration audio always stays the master playback source.
- Placeholder avatar mode supports transparent PNG states and transparent `WEBM` clips through the same timeline/actions/job format.
- Existing legacy raw-HTML slides were converted to structured media where possible so the exporter can analyze them cleanly.
- Many older decks still use remote images. The exporter works best when those assets are reachable or localized.
