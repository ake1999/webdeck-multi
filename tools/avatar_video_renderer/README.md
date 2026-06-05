# Avatar Video Renderer

Thin renderer adapter for generated WebDeck avatar-video jobs.

This first milestone intentionally does **not** run ComfyUI, Wav2Lip, or full video rendering. It validates the output contract and prepares the exact output/status paths the web player expects.

## Inputs

Topic job:

```bash
python tools/avatar_video_renderer/render_avatar_video_job.py   --job generated/jobs/avatar_video/UO/MCG5353_Robotics_W2026/S01/01_course_overview.json
```

Batch job:

```bash
python tools/avatar_video_renderer/render_batch.py   --job generated/jobs/avatar_video/batches/UO_MCG5353_Robotics_W2026_all-sessions_all-topics.json
```

Create one tiny transparent placeholder WebM for web-player path testing:

```bash
python tools/avatar_video_renderer/render_batch.py   --job generated/jobs/avatar_video/batches/UO_MCG5353_Robotics_W2026_all-sessions_all-topics.json   --placeholder-first-slide
```

## Outputs

Per slide:

```text
generated/outputs/avatar_video/<school>/<course>/<session>/<topic>/<slide_id>/transparent.webm
generated/outputs/avatar_video/<school>/<course>/<session>/<topic>/<slide_id>/silent_transparent.webm
generated/outputs/avatar_video/<school>/<course>/<session>/<topic>/<slide_id>/alpha_preview_checkerboard.mp4
generated/outputs/avatar_video/<school>/<course>/<session>/<topic>/<slide_id>/debug_with_background.mp4
generated/outputs/avatar_video/<school>/<course>/<session>/<topic>/<slide_id>/mp4_with_audio.mp4
generated/outputs/avatar_video/<school>/<course>/<session>/<topic>/<slide_id>/render_status.json
generated/status/avatar_video/<school>/<course>/<session>/<topic>/<slide_id>.json
```

The renderer must not render slides into avatar videos. `transparent.webm` is only the avatar layer for the web player to place over the slide.

## Config

Copy `config.example.json` to `config.json` for local machine paths. Keep `config.json` out of Git.

Heavy assets and models belong outside the repo or in ignored local folders. Jobs should reference motion IDs, not absolute paths.

## Current Scope

Implemented now:

- reads topic and batch job JSON
- validates screenshot/audio inputs exist
- validates `motion_id` values against `tools/avatar_video/motion_bank.v1.json`
- validates end-only/final-only motion placement
- validates event names and basic event fields
- creates output and status folders
- writes per-slide `render_status.json`
- optionally writes one tiny transparent placeholder WebM and checkerboard preview

Next milestone:

- map motion IDs to local normalized clips
- stitch motion timelines
- apply Wav2Lip last
- replace placeholder alpha with real transparent WebM export and required alpha validation


## One Real Slide Render

Render one real slide using motion-bank stitching, Wav2Lip, and transparent WebM export:

```bash
source /home/monjazeb/miniforge3/etc/profile.d/conda.sh
conda activate webdeck_comfyui
python tools/avatar_video_renderer/render_avatar_video_job.py \
  --job generated/jobs/avatar_video/UO/MCG5353_Robotics_W2026/S01/01_course_overview.json \
  --config tools/avatar_video_renderer/config.json \
  --render-slide-id installer_language_keyboard
conda deactivate
```

By default, the renderer does not pad speech audio. If a slide has a separate pause or waiting motion, keep that as video/action timing in the job instead of rewriting the WAV.

The renderer also preserves source clip framing by default:

```json
"rendering": {
  "avatar_scale": 1.0,
  "avatar_y_offset_px": 0
}
```

Avoid shrinking normalized motion-bank clips here unless you intentionally want an inset avatar. If a source clip has the laptop or table touching the frame edge, shrinking it creates a transparent strip beside that object in the alpha preview, which can look like the right side was cut off. Add safe margins during motion-bank normalization instead.

Current real-render scope:

- large actions from `avatar.motion_plan` are rendered from local motion-bank clips
- idle blocks are filled from renderer-side idle clips
- Wav2Lip runs last so speech audio controls the mouth
- `avatar.events` are validated but not synthesized yet; those will be mapped to generated idle/expression clips in the next milestone
- alpha export uses the configured background-removal method and decoded alpha validation

The `connected_background` alpha method treats `reference_alpha` as a foreground
prior only. It must not force the whole reference pose to stay opaque on every
frame, because motion clips move: a static hard reference mask leaves white
background ghosts where the avatar used to be.
