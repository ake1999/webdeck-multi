# Project Map For Agents

This file is shared memory for future agents. Keep it short and update it when
the architecture changes.

## Pipeline Map

Topic source and lecture plans flow through the existing WebDeck pipeline:

```text
course topic source
-> browser deck runtime/export
-> layout manifest and screenshots
-> professor script manifest
-> audio and alignment
-> timeline
-> motion plan
-> TTS/avatar/slide-video jobs
-> render/review outputs
```

Generated output is disposable. Source lives in `courses/`, `shared/`,
`scripts/`, `tools/`, `schemas/`, `docs/`, and `fixtures/`.

## Main Hubs

Graphify shows vendor code as highly connected, so ignore `shared/vendor/` for
project architecture. The important project-owned hubs are:

- `scripts/lib/lecture/contracts.mjs`: paths, schemas, job/status contracts.
- `scripts/lib/lecture/pipeline.mjs`: orchestrates layout, script, audio,
  timeline, motion, and jobs.
- `scripts/lib/lecture/script_generation.mjs`: builds slide narration
  manifests from authored slides and lecture plans.
- `scripts/lib/lecture/motion_planning.mjs`: maps layout/script/timeline into
  avatar motion plans.
- `scripts/lib/lecture/slide_video_controls.mjs`: creates AI-1/avatar control
  requests for slide video work.
- `shared/deck*.js`, `shared/lecture_player.js`, and `shared/session_loader.js`:
  browser runtime, rendering, layout analysis, and lecture playback.
- `shared/calculus/`: reusable calculus widget runtime. `core/` owns parameter
  state, SVG plot helpers, widget shell/control helpers, and scripted timeline
  interpolation; `widgets/` owns the first native calculus visuals.
- `shared/calculus_material_adapter.js`: maps generated calculus material JSON
  into normal WebDeck slides, rich content blocks, and inline calculus widgets.

## Cleanup Rules

- Preserve generated-output contracts and job schemas.
- Do not move or rename contract-heavy modules unless the task explicitly
  includes compatibility work.
- Keep browser course metadata centralized in `shared/course_catalog.js`.
- Arian University calculus topics load directly from material JSON through
  `shared/calculus_material_adapter.js`; do not generate duplicate
  `*.slides.js` files for the same lectures unless the user asks.
- Prefer adding an adapter for calculus materials over creating a separate
  calculus-only pipeline.
- Prefer native browser SVG/Canvas/Three.js widgets for calculus visuals. Keep
  Python snippets as source/reference metadata unless the user explicitly asks
  for static plot screenshots.
- Do not edit vendored Three.js or KaTeX files unless the task is specifically
  about those libraries.

## Current Calculus State

- `courses/Calculus/Materials/` has 70 lecture JSON files, 70 preview markdown
  files, and 8 `debug_pass1` files.
- `shared/course_catalog.js` exposes Arian University (`AU`) with Calculus 1,
  Calculus 2, and Calculus 3. Topics are grouped by natural module/session.
- `courses/Calculus/lectures.txt` is useful context for module ordering, but
  the browser catalog now maps directly to material JSON filenames.
- The browser runtime has a generic bridge from material JSON into WebDeck
  topic data.
- Generation-side testing uses `scripts/convert_calculus_material.mjs`. The
  package shortcut `npm run convert:calculus-test` creates
  `courses/AU/ARIAN_Calculus_1/sessions/S01/01_review_of_functions_and_graphs.slides.js`
  and the matching `.lecture.plan.json`.
- AU topic filenames are prefixed with session order (`01_`, `02_`, …) so file
  sort order matches teaching order; see `shared/topic_naming.js`.
- AU/calculus plans use `shared/arian.avatar.profile.json`; keep old robotics
  avatar wording out of personal-brand course outputs.
- `llm_local` and topic-script planning accept `--scriptApiKeyFile` and
  `WEBDECK_SCRIPT_API_KEY_FILE` for OpenAI-compatible APIs such as DeepSeek.
  Never store the key in this repo.
- The deck model/render path supports rich blocks including
  `math_solution_steps` (progressive reveal, pipeline-synced step IDs),
  `formula_block`, `derivation_steps`, `theorem_box`, `example_solution`,
  `proof_sketch`, `misconception_compare`, `pause_and_reveal`, `math_table`,
  `paragraph`, `nested_bullets`, and `course_path`.
- `visual_lab` is the full-width slide type for interactive calculus visuals.
- Inline widget media uses `media.kind: "calculus_widget"`. Widgets include
  `function_analysis`, `function_transform`, `limit_epsilon`, `secant_tangent`,
  `riemann_integral`, and `unit_circle_trig`; each uses shared parameter state
  so formula, plot, readout, controls, and scripted playback stay synchronized.
- Agent authoring playbook:
  `docs/calculus_course_authoring_guide.md` (slides.js, lecture.plan.json,
  math steps, widgets, course consistency). Gold references: AU S01/S02 Topics
  1–4 `*.slides.js` + plans.
- Layout export sees widget sub-targets such as `_formula`, `_plot`,
  `_readout`, `_controls`, and per-control IDs. Script/planning code now reads
  block text and calculus widget labels.
- Some unsupported visual specs intentionally remain as `Visual plan`
  paragraphs until a matching native widget exists. Next widget candidates:
  FTC accumulation, parametric path/car, tangent-normal, 3D surfaces/vector
  fields, composition diagrams, even/odd symmetry, piecewise graph builders,
  and series partial sums.
- Focused tests: `npm run test:calculus-widgets`,
  `npm run test:math-solution-steps`, `npm run test:topic-script-plan`,
  `npm run test:slide-video-controls`, and
  focused `npm run validate -- --school AU --course ARIAN_Calculus_1 --session S01 --topic 01_review_of_functions_and_graphs`.
