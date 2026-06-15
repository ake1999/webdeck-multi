# Demo Video Overlays

Some technical slides can include a real recorded demo after the normal professor/avatar explanation. The demo video is optional and slide-specific.

Create a sidecar next to the slide file:

```text
courses/<school>/<course>/sessions/<session>/<topic>.demo_overlays.json
```

The demo is not a new slide. It is an extra full-slide video sequence on the current slide. The normal professor/avatar explanation plays first, then the avatar should end with a laptop/screen motion, then the full-slide demo covers the slide.

Example:

```json
{
  "schema_version": "webdeck.demo_overlays.v1",
  "slides": [
    {
      "slide_id": "launch_panda",
      "demos": [
        {
          "demo_id": "terminal_launch_demo",
          "order": 1,
          "title": "Launch Panda and inspect RViz",
          "bridge_to_demo": "Let me show this on the machine so you can connect the command to the RViz result.",
          "source_video": "courses/UO/MCG5353_Robotics_W2026/sessions/S04/media/demos/launch_panda_silent.mp4",
          "display_mode": "full_slide",
          "object_fit": "cover",
          "narration": {
            "text": "Now watch the launch step as it happens. First we start the launch file, then we wait for the joint state publisher and RViz windows, and finally we check that Panda is visible with panda link zero as the fixed frame.",
            "segments": [
              {
                "t0": 0.0,
                "t1": 4.0,
                "description": "Terminal command is run.",
                "text": "Here I run the Panda display launch command from the sourced workspace."
              },
              {
                "t0": 4.0,
                "t1": 9.0,
                "description": "RViz and Joint State Publisher GUI open.",
                "text": "The two windows tell us the model visualization pipeline is starting correctly."
              }
            ]
          }
        }
      ]
    }
  ]
}
```

## Fields

- `slide_id`: the existing slide id from the `.slides.js` file.
- `demo_id`: stable id for this recording; it becomes part of output filenames.
- `source_video`: silent recording you provide, usually under `courses/.../media/demos/`.
- `bridge_to_demo`: short instructor handoff idea. Keep the actual spoken bridge in the lecture plan or narration text when rebuilding scripts.
- `display_mode: "full_slide"`: the demo replaces the avatar and covers the slide area.
- `object_fit: "cover"`: fills the slide area. Use `"contain"` if cropping would hide important terminal/RViz details.
- `narration.text`: one complete spoken explanation for the demo.
- `narration.segments[]`: optional timed narration steps. Use these when you know what happens at important moments.
- `t0` / `t1`: approximate source video time for the event. Do not over-script; the narration should stay slightly shorter than the visible action.

If a segment has only `description`, the demo-audio builder uses that description as the spoken line. For better quality, add a natural `text` line too.

When `npm run build:avatar-video-jobs` runs, the job builder adds:

- `slides[].demo_overlays[]` for renderer-side work.
- `slides[].avatar.video_sequence[]` so the web player can play the normal avatar clip first and the full-slide demo second.
- An end-only laptop/screen motion in `slides[].avatar.motion_plan` for slides with demos, usually `type_laptop`, `type_laptop_long`, or `show_computer_screen`.

Build the separate demo narration audio with:

```bash
npm run build:demo-audio -- \
  --school UO \
  --course MCG5353_Robotics_W2026 \
  --session S04 \
  --topic 01_panda_urdf_tf_rviz \
  --provider qwen3_tts \
  --allowProviderFallback 0
```

Then rebuild the avatar-video jobs so the measured demo audio duration is included:

```bash
npm run build:avatar-video-jobs -- \
  --school UO \
  --course MCG5353_Robotics_W2026 \
  --session S04 \
  --topic 01_panda_urdf_tf_rviz
```

Generated default targets:

```text
generated/outputs/demo_audio/<school>/<course>/<session>/<topic>/<slide_id>__<demo_id>.wav
generated/outputs/demo_audio/<school>/<course>/<session>/<topic>/demo_alignment.json
generated/outputs/avatar_video/<school>/<course>/<session>/<topic>/<slide_id>/<demo_id>.full_slide.webm
```

The demo-audio step synthesizes the second voice. The renderer should combine that audio with the silent source demo if needed, and write the full-slide WebM. The web player treats `display_mode: "full_slide"` as a slide-covering video that replaces the avatar while it plays.

## Playback Behavior

- The browser plays the normal slide audio first.
- The avatar overlay video is muted, as usual.
- The full-slide demo starts after the normal slide audio.
- Demo narration audio is a separate audio file and does not need avatar animation.
- The controller counts the demo as part of the same slide duration.
- The page number does not advance until slide audio, demo video, demo audio, and any question pause are done.
- The full-slide demo scales with the deck because it is placed in the same logical slide coordinate layer as the avatar overlay.

## Recommended Recording Pattern

1. Record the demo silently at 1920 x 1080 when possible.
2. Put the file under the topic media folder, for example:

```text
courses/UO/MCG5353_Robotics_W2026/sessions/S04/media/demos/launch_panda_terminal_rviz_silent.mp4
```

3. Add or update the topic sidecar:

```text
courses/UO/MCG5353_Robotics_W2026/sessions/S04/01_panda_urdf_tf_rviz.demo_overlays.json
```

4. Write only important timing points: command runs, RViz opens, Add is clicked, fixed frame is changed, model becomes visible.
5. Keep narration concise. It should explain what students should notice, not describe every mouse movement.
6. Run `build:demo-audio`.
7. Run `build:avatar-video-jobs`.
8. Render the full-slide demo WebM on the video machine.
