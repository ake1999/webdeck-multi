# Slide Video Renderer Worker

This worker renders the final transparent teacher/avatar-only video for each slide.

## Contract

The slide-video job remains the entry point. The renderer reads existing files from:

```text
generated/jobs/slide_video/<school>/<course>/<session>/<topic>/<slide_id>.json
```

The generated slide-video job schema is frozen for this stage. Do not add renderer-only fields to generated jobs. Renderer settings belong in:

```text
tools/slide_video_renderer/config.example.json
```

or in a local copied config file on the render machine.

AI-1 controls are a separate derived contract, not a job-schema extension:

```text
generated/controls/slide_video/<school>/<course>/<session>/<topic>/<slide_id>.motion_requests.json
generated/controls/slide_video/<school>/<course>/<session>/<topic>/<slide_id>.avatar_plan.json
```

The renderer should prefer `avatar_plan.json` when present, while still treating the slide-video job as the entry point and source of output/status paths.

## Coordinate Reference

AI-1 avatar plans use a 1920 x 1080 orthographic render reference. Blender must render the transparent avatar only; the slide image is not rendered in Blender and is composited later by the web/video pipeline.

- Blender X is screen left/right; `+X` is screen right.
- Blender Z is screen up/down; `+Z` is screen up.
- Blender Y is depth.
- `-Y` points toward the camera/audience.
- `+Y` points toward the slide/background.

The instructor character is expected to stand with feet around `Z = 0` and face `-Y` by default. The first production camera should be:

```json
{
  "camera_location_world_m": [0.0, -6.0, 1.2375],
  "camera_look_direction": "+Y",
  "camera_up_axis": "+Z",
  "camera_type": "orthographic",
  "orthographic_scale_m": 2.775,
  "character_front_direction": "-Y"
}
```

AI-1 keeps the screen-to-world X/Z mapping unchanged. Gaze and pointing target depths use negative Y values so the screen-space IK targets sit on the camera/audience side of the character:

```text
bottom_world_z = -0.15 m
gaze target Y = -0.40 m
point target Y = -0.25 m
```

Movement across the slide should be lateral X motion. Do not request forward/backward walking, walking toward the camera, walking away from the camera, or walk-in-place as final professor behavior. AI-1 should use fixed-depth professor motions such as `side_step_left`, `side_step_right`, `weight_shift_left`, `weight_shift_right`, `idle_talk`, `explain_small`, `explain_point`, `gesture_emphasis`, and `glance`.

Avatar plans include a `screen_path` and depth constraint fields:

```json
{
  "depth_policy": "keep_y_fixed",
  "max_depth_y_drift_m": 0.05,
  "render_slide_in_blender": false,
  "render_avatar_only": true,
  "background": "transparent"
}
```

## Inputs

For each slide-video job, the renderer should use the paths already referenced by the job:

- `resolved_audio_file`
- `resolved_alignment_file`
- `motion_manifest_file`
- `topic_motion_manifest_file`
- `output_file`
- `secondary_output_files`

It may also read topic artifacts next to the motion files:

- `layout.manifest.json`
- `script.manifest.json`
- `screenshots/<slide_id>.png`
- `generated/controls/slide_video/.../<slide_id>.avatar_plan.json`
- `generated/controls/slide_video/.../<slide_id>.motion_requests.json`

Manual/output alignment should be preferred when available. The config option `prefer_manual_alignment` controls renderer-local behavior only; it must not rewrite jobs.

## Outputs

Audio stays separate. The slide-video renderer must produce a silent transparent `.webm` at the job's `output_file`. It should render transparent PNG frames first when useful, then encode alpha-preserving WebM, for example with VP9 `yuva420p` and `-auto-alt-ref 0`.

The render machine writes:

```text
generated/outputs/slide_video/<school>/<course>/<session>/<topic>/<slide_id>.webm
```

If enabled, it may also write an MP4 proxy to the first path in `secondary_output_files`.

## Status

A status JSON is required for every attempted render:

```text
generated/status/<school>/<course>/<session>/<topic>/slide_video/<slide_id>.job_status.json
```

Allowed states remain:

```text
pending
running
done
error
```

The status file must include the job id, kind `slide_video`, state, contract hash, output file, secondary output files, and `updated_at`.

## HY-Motion

HY-Motion is optional for now. The renderer may use local HY-Motion assets when available and when `use_hy_motion_if_available` is true, but missing HY-Motion files must not invalidate the slide-video job contract.

The basic renderer backend should still be able to render from deterministic slide motion controls in `motion_manifest_file`.

## Local Config

`tools/slide_video_renderer/config.example.json` is renderer metadata only. It defines local implementation choices such as backend, FPS, viewport size, avatar profile path, MP4 proxy behavior, and overwrite policy.

Changing this config must not change generated job files.
