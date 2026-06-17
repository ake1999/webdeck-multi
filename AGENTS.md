# Agent Notes

This repository builds browser lecture decks and the generation pipeline around
them. Read this file before editing, then read `.agents/project-map.md`,
`docs/project_handoff_for_new_chat.md`, and
`docs/calculus_course_authoring_guide.md` for calculus topic work.

## Project Shape

- `courses/`, `shared/`, `scripts/`, `tools/`, `schemas/`, `docs/`, and
  `fixtures/` are source.
- `generated/`, `graphify-out/`, `node_modules/`, `build/`, `install/`, `log/`,
  and local caches are disposable output.
- `shared/vendor/` contains vendored libraries. Do not refactor or analyze it
  as project-owned architecture unless the task is specifically about vendor
  assets.

## Contracts To Preserve

- Do not casually change `generated/outputs/*` paths, job status shape,
  timeline semantics, media source resolution, or slide-video/audio separation.
- The preferred production media contract is one slide audio WAV plus one
  silent transparent slide video WEBM per slide.
- Prefer adapters at source/runtime boundaries over a second lecture pipeline.

## Current Branch Direction

- This branch is being reshaped for personal-brand courses, starting with
  calculus.
- `courses/Calculus/Materials/` contains generated calculus source material.
  The browser can open it through Arian University courses using
  `shared/calculus_material_adapter.js`.
- Generation-side calculus tests now exist through
  `scripts/convert_calculus_material.mjs`. The first test topic is generated
  at
  `courses/AU/ARIAN_Calculus_1/sessions/S01/01_review_of_functions_and_graphs.*`
  from `courses/Calculus/Materials/review_of_functions_and_graphs.json`.
- AU session topic files use a two-digit session order prefix:
  `NN_<material_slug>.slides.js` and matching `.lecture.plan.json` (e.g.
  `01_review_of_functions_and_graphs`). Catalog `topic.id`, `topicMeta.id`, and
  `topic_id` in plans must match that stem; material JSON keeps the unprefixed
  slug. Helpers live in `shared/topic_naming.js`.
- **AU / YouTube display naming:** keep internal IDs and URL params as
  `session` + `topic` (and folders under `sessions/Sxx/`). Learner-facing UI
  uses **Unit** (5 thematic arcs) and **Lesson** (26 global episodes for Calc 1)
  via `shared/course_labels.js` and `terminology: YOUTUBE_TERMINOLOGY` on AU
  courses in `shared/course_catalog.js`. Do not rename catalog `id`s or URL
  keys; rebrand at render/chooser boundaries (`sessions.html`, `deck_render.js`
  roadmaps, HUD). Roadmap `path_topic_NN` stays as the global lesson index.
- Calculus decks now have a reusable native browser layer in
  `shared/calculus/`. It supports block rendering plus inline
  `media.kind: "calculus_widget"` widgets; do not replace this with static
  Python plot screenshots as the primary visual path.
- Current rich block types include `math_solution_steps`, `formula_block`,
  `derivation_steps`, `theorem_box`, `example_solution`, `proof_sketch`,
  `misconception_compare`, `pause_and_reveal`, `math_table`, `paragraph`,
  `nested_bullets`, and `course_path`. `visual_lab` uses left steps + right plot
  (§3b in the authoring guide) with optional `labExamples` tabs. See
  `docs/calculus_course_authoring_guide.md` for when to use each block.
- **Worked steps: pick the right block.** Use `math_solution_steps` for
  equation-heavy examples with progressive reveal (domain/range algebra,
  transformation sequence, classify-by-formula). Use `example_solution` for
  proofs, piecewise evaluate-and-sketch, composition walkthroughs with mixed
  prose + formulas, or any slide where all steps should stay visible and
  lecture focus dims non-active lines (~80% opacity). Do not use `math_table`
  for step-by-step examples when either block fits.
- **Slide numbering in conversation:** refer to **deck page order** (title =
  page 1, objectives = page 2, …), not internal slide ids like `s02_…`.
  File ids stay `sNN_` / `NN_` prefixed; page index matches browser counter.
- Current native widgets include `function_analysis` (many variants plus
  configurable `flex_plot` via `shared/calculus/core/plot_spec.js`),
  `function_transform`, `limit_epsilon`, `secant_tangent`, `riemann_integral`,
  and `unit_circle_trig`. Prefer `flex_plot` + `plot` specs for new graphs instead
  of reusing the same hardcoded variant on every slide. Widgets expose formula,
  plot, readout, controls, and optional `scriptedTimeline` elements as layout
  targets.
- **Interactive plot narration:** explain graphs while the plot moves. Pair
  widgets with `scriptedTimeline` (auto-sync during lecture time) and/or
  `widgetParams` on `math_solution_steps` / `example_solution` rows (fires when a
  script segment targets that step id). Scripts use `delivery_kind: demo` on the
  widget media id; plan entries carry `interaction_hints` (`widget_media_id`,
  `step_ids`, `scripted_params`). See authoring guide §5b–§7b.
- **`scriptedTimelines` (plural):** when one slide narrates two control stories
  (e.g. vertical **k** vs horizontal **h**, or amplitude **a** vs period **b**),
  put keyed timelines on the widget (`vertical_k`, `horizontal_h`, `vertical_a`,
  `horizontal_b`). `shared/calculus/registry.js` picks the key from cue speech
  when `widget_timeline_key` is absent.
- **Function families gallery (Topic 1 page 4):** keep
  `function_transform` variant `family_gallery` (grid of mini plots), not
  single-plot spotlight. Exponential and logarithmic cells need
  per-family mini-plot domains in `function_transform.js` (`miniGalleryDomains`);
  cosine slot was replaced with **power** (√x). Timeline highlights families via
  `params.family` while the full grid stays visible.
- **Composition widget (Topic 1 page 10):** use `function_analysis` variant
  `composition_sqrt`; live pipeline values belong in
  `shell.readout` (box under plot): `x`, `g(x)`, `(f∘g)(x)` updating with the
  **x** slider. Do not rely on `flex_plot` for this readout (it clears readout).
- **Pause beats:** use `pause_and_reveal` only for real prediction moments (not
  decorative filler). Script splits quiz (`delivery_kind: quiz_prompt`, targets
  prompt id) from reveal (targets reveal element). The composite video inserts a
  **silent think beat** between them; TTS does not speak the answer in the quiz
  segment. Avatar head/body shifts under plots are video-only, not spoken.
  Think-pause duration is mapped in `shared/lecture_player.js`
  (`playbackTimeFromAudioTime`, `slideQuestionPauseSeconds`) so progress bars do
  not double-count silent tails at slide end.
- **Lecture-mode step UX:** `math_solution_steps` keeps **Next step →** visible
  in lecture mode until all steps are revealed (then hidden). Non-active
  revealed lines dim to ~**80%** opacity; active target stays full opacity.
  Step line spacing auto-tightens from rendered math height
  (`adjustMathSolutionStepSpacing`); problem line uses minimal KaTeX margins.
- **Focus (interim):** `scripts/lib/lecture/focus_plan.mjs` word heuristics are
  secondary. Next direction: script/plan **action DSL** → alignment → timeline
  cues (`focus`, `widget_set`, `reveal_step`) with element dimming, not orange
  underline. Do not expand heuristic focus until that lands.
- Lecture plans may include `playback_contract` and per-slide `interaction_hints`;
  generation uses `script_writer_v3` + `llm_local` with those hints in context.
- **TTS vs transcript text:** `segment.text` and subtitle VTT cues keep written copy
  (e.g. `Arian`). TTS uses `segment.tts_text` when present, built by
  `scripts/lib/lecture/tts_normalization.mjs` from `shared/tts_pronunciation.json`
  plus math/symbol verbalization. Script generation applies this pass automatically;
  re-run `npm run normalize:script-tts` on existing manifests before `build:audio`.
- Arian University lecture plans use `shared/arian.avatar.profile.json` so the
  personal-brand calculus voice does not inherit old robotics wording.
- The historical robotics/university course pipeline is useful reference, but
  many old course source files may be deleted in the worktree. Treat those
  deletions as user-owned state unless explicitly asked to restore them.

## Before Editing

- Check `git status --short`; the worktree may be intentionally dirty.
- Keep generated files out of Git unless the user explicitly asks otherwise.
- For Graphify refreshes, use `graphify update .`; do not commit
  `graphify-out/`.
- For calculus architecture checks, run `npm run test:calculus-widgets`,
  `npm run test:math-solution-steps`, and the topic-script / slide-video-control
  tests.
- Hand-enhanced AU topics should follow `docs/calculus_course_authoring_guide.md`
  for slide/plan consistency, `math_solution_steps` usage, widget pairing,
  `pause_and_reveal` quiz/reveal splits, and `interaction_hints` on dense
  visual slides.
- **`nested_bullets` ordered lists:** default is `<ol>` (`ordered !== false`).
  Do not prefix items with `**1.**` / `**2.**` (duplicates markers). Use
  `ordered: false` only for bullet dots. Keep left-column lists short on dense
  two-col slides to avoid footer overlap.
- **Slide copy punctuation:** prefer commas, colons, or periods over em dashes
  (`—`) in learner-facing text and narration seeds. Use `Arian University •
  Calculus 1` for HUD branding (not `—`). Keep Unicode math minus (`−`) in
  formulas; do not confuse it with an em dash.
- Do not commit API keys. The user's DeepSeek key is expected outside the repo
  in `dsk.txt`; pass it only at runtime with `--scriptApiKeyFile` or
  `WEBDECK_SCRIPT_API_KEY_FILE`.
