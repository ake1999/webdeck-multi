# Clean Generated Artifact Structure

This repo keeps source and course authoring in Git, and treats `generated/` as disposable build output.

## Source Snapshot

Before the first generated-artifact cleanup, the source-only snapshot was committed and tagged:

- commit: `fb14ab1`
- tag: `v2.1`
- message: `v2.1 source snapshot before generated cleanup`

No files under `generated/` are tracked by Git.

## What Stays In Source

- root app files
- `courses/`
- `shared/`
- `scripts/`
- `schemas/`
- `docs/`
- `tools/`
- `fixtures/`
- `package*.json`

Small generated-style test fixtures that need to be tracked should live under `fixtures/`, not under `generated/`.

## Ignored Local Output

`.gitignore` excludes:

- `generated/`
- `node_modules/`
- `__pycache__/`
- `.codex/`
- local renderer config files

## Canonical Generated Homes

Professor scripts:

- `generated/lectures/<school>/<course>/<session>/<topic>/script.topic_plan.json`
- `generated/lectures/<school>/<course>/<session>/<topic>/script.manifest.json`

Audio and alignment:

- `generated/outputs/audio/<school>/<course>/<session>/<topic>/<slide_id>.wav`
- `generated/outputs/alignment/<school>/<course>/<session>/<topic>/tts_alignment.json`

Motion and AI-1 controls:

- `generated/lectures/<school>/<course>/<session>/<topic>/motion.manifest.json`
- `generated/lectures/<school>/<course>/<session>/<topic>/motion/*.motion.json`
- `generated/jobs/slide_video/<school>/<course>/<session>/<topic>/*.json`
- `generated/controls/slide_video/<school>/<course>/<session>/<topic>/*.motion_requests.json`
- `generated/controls/slide_video/<school>/<course>/<session>/<topic>/*.avatar_plan.json`

Renderer outputs:

- `generated/outputs/slide_video/`
- `generated/outputs/renders/`
- `generated/status/`

## Clean Build Order

Use the staged commands for production:

```bash
npm run build:prof-scripts -- --school AC --course ROB9205_Industrial_Robots_W2026 --session S01 --topic 01_course_intro_and_expectations --scriptProvider llm_local --scriptModel mistral-nemo:latest --scriptEndpoint http://10.0.0.16:11434 --scriptPromptVersion script_writer_v2 --allowScriptFallback 0
npm run build:audio -- --school AC --course ROB9205_Industrial_Robots_W2026 --session S01 --topic 01_course_intro_and_expectations --provider ffmpeg_flite
npm run refresh:motion -- --school AC --course ROB9205_Industrial_Robots_W2026 --session S01 --topic 01_course_intro_and_expectations
npm run build:slide-video-controls -- --school AC --course ROB9205_Industrial_Robots_W2026 --session S01 --topic 01_course_intro_and_expectations --overwrite
```

`build:lecture` remains available as a legacy all-in-one command, but production should prefer the staged commands.

## Optional Diagnostics

Verbose reports and secondary artifacts are off by default in the staged flow:

- `build:prof-scripts --write-report`
- `build:audio --write-report`
- `refresh:motion --write-report`
- `refresh:motion --write-subtitles`
- `refresh:motion --write-timeline`
- `refresh:motion --write-review`

Use these only when reviewing/debugging a topic.

## Repeat Cleanup

Preview the cleanup set:

```bash
npm run clean:generated
```

Apply the cleanup:

```bash
npm run clean:generated -- --confirm
```

The command preserves video-generation artifacts and removes regenerable script/audio/TTS diagnostics according to this document.
