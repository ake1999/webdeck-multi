# Slide Motion Pipeline

This repo now generates a slide-level motion-planning layer for fixed-camera avatar rendering.

## Purpose

The motion layer is meant for an external animation workflow that:

1. loads one slide audio track
2. loads one slide motion plan
3. generates body motion + lip sync
4. renders one silent transparent slide video
5. writes the final file to the generated output contract path

This does not replace the existing playback/runtime pipeline. It adds an external-render planning layer on top of the existing lecture manifests.

## Generated Files

Per topic:

- `generated/lectures/<school>/<course>/<session>/<topic>/motion.manifest.json`

Per slide:

- `generated/lectures/<school>/<course>/<session>/<topic>/motion/<slide_id>.motion.json`

Per slide render job:

- `generated/jobs/slide_video/<school>/<course>/<session>/<topic>/<slide_id>.json`

Suggested slide video output:

- `generated/outputs/slide_video/<school>/<course>/<session>/<topic>/<slide_id>.webm`

The `.webm` target is the preferred transparent output. The matching `.mp4` path is a convenience secondary output path, not the preferred alpha-preserving format.

Synced HY-Motion NPZ assets live at:

- `generated/outputs/motion/hy_motion/npz/<school>/<course>/<session>/<topic>/`

FBX assets are optional:

- `generated/outputs/motion/hy_motion/fbx/<school>/<course>/<session>/<topic>/`

## Refresh After Manual TTS Returns

When higher-quality manual TTS audio and `generated/outputs/alignment/.../tts_alignment.json` arrive later, you do not need to rerun the full lecture build just to fix motion timing.

Use:

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

This refreshes:

- `generated/lectures/.../subtitles/*.vtt`
- `generated/lectures/.../timeline.json`
- `generated/lectures/.../motion.manifest.json`
- `generated/lectures/.../motion/*.motion.json`
- `generated/jobs/avatar/.../*.json`
- `generated/jobs/slide_video/.../*.json`
- `generated/lectures/.../review/*`

It prefers manual alignment when available and otherwise falls back to compiled timing.

## Inputs Used By The Planner

The planner combines:

- `layout.manifest.json`
- `script.manifest.json`
- `timeline.json`
- slide-level lecture-plan pedagogy
- compiled/manual audio and alignment path contracts

## Planner Model

The planner assumes:

- fixed camera
- one rendered video per slide
- slow walking only
- carry pose across slides
- first slide enters from the right
- lookahead repositioning near the end of a cue when the next focus needs a better screen position
- head/body should stay biased toward students rather than fully turning away

## External Renderer Expectations

An external renderer should:

1. prefer manual audio/alignment if available
2. otherwise fall back to compiled audio/alignment
3. use the motion samples as low-rate control data
4. retime/interpolate internally to the final animation frame rate
5. add lip sync from the selected slide audio
6. render silent transparent output

The repo-side worker wrapper is:

```bash
npm run render:slide-video
```

Without a renderer command, it writes per-slide render packets and a readiness report. With `--rendererCommand` or `WEBDECK_SLIDE_VIDEO_RENDERER`, it invokes the external renderer and updates slide-video status files.

## Recommended Render Order

1. motion planning
2. animation generation
3. lip sync
4. background removal / alpha output
5. optional upscale
