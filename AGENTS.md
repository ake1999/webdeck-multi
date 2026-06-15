# Agent Notes

This repository builds browser lecture decks and the generation pipeline around
them. Read this file before editing, then read `.agents/project-map.md` and
`docs/project_handoff_for_new_chat.md` for the current branch context.

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
  `courses/AU/ARIAN_Calculus_1/sessions/S01/review_of_functions_and_graphs.*`
  from `courses/Calculus/Materials/review_of_functions_and_graphs.json`.
- Calculus decks now have a reusable native browser layer in
  `shared/calculus/`. It supports block rendering plus inline
  `media.kind: "calculus_widget"` widgets; do not replace this with static
  Python plot screenshots as the primary visual path.
- Current rich block types include `formula_block`, `derivation_steps`,
  `theorem_box`, `example_solution`, `proof_sketch`,
  `misconception_compare`, `pause_and_reveal`, `math_table`, `paragraph`, and
  `nested_bullets`. `visual_lab` is the full-width interactive slide type.
- Current native widgets are `function_transform`, `limit_epsilon`,
  `secant_tangent`, and `riemann_integral`. Widgets expose formula, plot,
  readout, controls, and optional `scriptedTimeline` elements as layout
  targets.
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
- For calculus architecture checks, run `npm run test:calculus-widgets` plus
  the existing topic-script and slide-video-control tests.
- Do not commit API keys. The user's DeepSeek key is expected outside the repo
  in `dsk.txt`; pass it only at runtime with `--scriptApiKeyFile` or
  `WEBDECK_SCRIPT_API_KEY_FILE`.
