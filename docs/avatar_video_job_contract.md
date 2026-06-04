# Avatar Video Job Contract

The avatar-video job is the renderer-facing contract for the desktop instructor video.

It describes what each slide needs. The renderer decides implementation details such as alpha export, Wav2Lip, neutral settling, stitching, and exact motion-bank file paths.

## Topic Job

One JSON file is written per topic:

```txt
generated/jobs/avatar_video/<school>/<course>/<session>/<topic>.json
```

Schema:

```json
{
  "schema_version": "webdeck.avatar_video_job.v1",
  "job_id": "UO_MCG5353_Robotics_W2026_S03_01_ros2_graph_packages_nodes_debugging",
  "course_id": "MCG5353_Robotics_W2026",
  "session_id": "S03",
  "topic_id": "01_ros2_graph_packages_nodes_debugging",
  "render": {},
  "defaults": {},
  "slides": []
}
```

Each slide includes:

- `slide_id`
- `duration_sec`
- `slide_assets.screenshot`
- `speech.text`
- `speech.audio`
- `avatar.placement`
- `avatar.motion_plan`
- `avatar.events`

## Render Size And Overlay

Slides remain `1920x1080`.

The avatar video is a separate vertical transparent video. The default render size is:

```txt
896 x 1200
```

The web player composites that video in the bottom-right of the slide and scales it with the slide size. Jobs include:

```json
"render": {
  "resolution": [896, 1200],
  "overlay": {
    "target": "web_slide",
    "anchor": "bottom_right",
    "scale_with_slide": true,
    "reference_slide_resolution": [1920, 1080],
    "reference_scale": 0.42,
    "margin_px": 24
  }
}
```

## Motion Bank

Source metadata lives at:

```txt
tools/avatar_video/motion_bank.v1.json
```

Current motion IDs:

```txt
explaining
idle_at_desk
idle_at_desk_2
idle_thinking_at_desk
key_point
nodding_desk
point_left
point_left_emphasis
point_right
point_slide_right
presenting_concept
wait_audience_response
welcome_audience
see_you_next
show_computer_screen
type_laptop
type_laptop_long
```

End-only clips:

```txt
see_you_next
show_computer_screen
type_laptop
type_laptop_long
```

The generator schedules these only at the end of a slide because they do not return cleanly to neutral, or they are semantically an outro.

## Build Command

For one topic:

```bash
npm run build:avatar-video-jobs -- \
  --school UO \
  --course MCG5353_Robotics_W2026 \
  --session S03 \
  --topic 01_ros2_graph_packages_nodes_debugging
```

For all topics in a course:

```bash
npm run build:avatar-video-jobs -- \
  --school UO \
  --course MCG5353_Robotics_W2026
```

When more than one topic matches, the command also writes:

```txt
generated/jobs/avatar_video/batches/<selector>.json
```

## Required Inputs

The generator requires existing clean-stage artifacts:

- `generated/lectures/<...>/layout.manifest.json`
- `generated/lectures/<...>/script.manifest.json`
- `generated/lectures/<...>/screenshots/*.png`
- `generated/outputs/alignment/<...>/tts_alignment.json`
- `generated/outputs/audio/<...>/<slide_id>.wav`

It fails if required audio or screenshots are missing. It does not invent unrelated audio paths.

## Build Order

Use:

```bash
npm run build:prof-scripts -- ...
npm run build:audio -- ...
npm run build:avatar-video-jobs -- ...
```

Later renderer step:

```bash
avatar_video_job.json -> per-slide mp4/debug/transparent webm outputs
```
