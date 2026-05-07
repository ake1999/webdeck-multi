# Final Slide Video Worker

The slide-video worker is the contract wrapper for the final avatar render stage.

It does not implement the 3D/avatar renderer itself. Instead, it:

1. scans `generated/jobs/slide_video/**/*.json`
2. resolves audio, alignment, slide motion, layout, script, screenshot, and local HY-Motion NPZ assets
3. writes a per-slide render packet under `generated/cache/slide_video_render/`
4. optionally calls an external renderer command
5. verifies `job.output_file`
6. updates `generated/status/**/slide_video/*.job_status.json`

## Local HY-Motion Asset Contract

HY-Motion NPZ files should be copied into:

```text
generated/outputs/motion/hy_motion/npz/<school>/<course>/<session>/<topic>/
```

FBX files are optional and, when available, use:

```text
generated/outputs/motion/hy_motion/fbx/<school>/<course>/<session>/<topic>/
```

The worker treats NPZ as the required motion asset. FBX is not required.

## Sync HY-Motion Outputs

If the ComfyUI output folder is mounted or copied locally, sync NPZ files with:

```bash
npm run sync:hy-motion -- \
  --sourceRoot /path/to/ComfyUI/output \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations
```

Dry run:

```bash
npm run sync:hy-motion -- \
  --sourceRoot /path/to/ComfyUI/output \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations \
  --dryRun
```

Use `--includeFbx` only if FBX export has been verified.

The sync report is written to:

```text
generated/outputs/motion/hy_motion/hy_motion_sync.report.json
generated/outputs/motion/hy_motion/hy_motion_sync.report.md
```

## Build Render Packets / Readiness Check

Without a renderer command, the worker writes render packets and reports whether each slide is ready:

```bash
npm run render:slide-video -- \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations \
  --slideId project_proposal
```

Packets are written to:

```text
generated/cache/slide_video_render/<school>/<course>/<session>/<topic>/<slide_id>.render_packet.json
```

The report is written to:

```text
generated/lectures/slide_video_render.report.json
generated/lectures/slide_video_render.report.md
```

## Run An External Renderer

Set `WEBDECK_SLIDE_VIDEO_RENDERER` or pass `--rendererCommand`.

The command receives the render packet as an argument if no placeholders are used:

```bash
WEBDECK_SLIDE_VIDEO_RENDERER="python /path/to/render_slide.py" \
  npm run render:slide-video -- --slideId project_proposal
```

Command templates can use placeholders:

```bash
npm run render:slide-video -- \
  --slideId project_proposal \
  --rendererCommand "python /path/to/render_slide.py --packet {packet} --output {output}"
```

Environment variables are also provided:

```text
WEBDECK_RENDER_PACKET
WEBDECK_SLIDE_VIDEO_OUTPUT
WEBDECK_SLIDE_VIDEO_MP4
WEBDECK_JOB_FILE
WEBDECK_AUDIO_FILE
WEBDECK_ALIGNMENT_FILE
WEBDECK_MOTION_FILE
WEBDECK_HY_MOTION_NPZ
```

When rendering is enabled, the worker marks the slide-video job `running`, then `done` or `error`.
