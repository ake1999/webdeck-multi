# HY Motion ComfyUI Batch Queue

This repo can now drive HY-Motion generation from the existing slide-video jobs.

## What It Uses

The batch queue reads:

- `generated/jobs/slide_video/<school>/<course>/<session>/<topic>/<slide_id>.json`
- the referenced `generated/lectures/.../motion/<slide_id>.motion.json`

From those files it builds:

- one HY-Motion instruction per slide
- one ComfyUI API prompt per slide
- one NPZ output subdirectory per topic inside the ComfyUI output folder
- one FBX output subdirectory per topic inside the ComfyUI output folder

## Workflow File

The template workflow is:

- `hy_motion_slide_batch_workflow.json`

It now includes:

- `HYMotionSaveNPZ`
- `HYMotionExportFBX`

The batch runner reads the workflow defaults for:

- network model
- LLM model
- quantization
- CPU offload
- CFG scale
- sample count
- default FBX export settings

The runner injects the slide-specific:

- instruction text
- duration
- seed
- output subdirectory
- filename prefix

After a prompt completes, the runner also records expected NPZ/FBX outputs for each part and tries to verify output metadata from ComfyUI history. If `--comfyOutputRoot` points at a local or mounted ComfyUI output folder, it also checks the filesystem.

If a slide is longer than HY-Motion's single-run limit, the queue supports two timing strategies:

- default `chunk` mode: split the slide into sequential parts of at most 12 seconds and write separate motion files such as `slide_id__part_01`
- `compress12` mode: generate one denser 12-second base motion and record a `stretch_factor` so the next animation stage can time-stretch it to the full slide duration

## Run One Topic

```bash
npm run queue:hy-motion -- \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations
```

## Dry Run First

```bash
npm run queue:hy-motion -- \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations \
  --dryRun
```

## Run All Slide Motion Jobs

```bash
npm run queue:hy-motion
```

## Useful Options

- `--workflow hy_motion_slide_batch_workflow.json`
- `--comfyUrl http://127.0.0.1:8188`
- `--outputSubdirBase webdeck_hy_motion`
- `--slideId project_proposal`
- `--pollMs 4000`
- `--timeoutSec 3600`
- `--seedMode hash_per_slide`
- `--seedMode fixed`
- `--timingMode chunk`
- `--timingMode compress12`
- `--comfyOutputRoot /path/to/ComfyUI/output`
- `--skipOutputVerify`

## Output Location

The HY-Motion save/export nodes write into the ComfyUI output folder, under subdirectories like:

```text
webdeck_hy_motion/npz/AC/ROB9205_Industrial_Robots_W2026/S01/01_course_intro_and_expectations/
webdeck_hy_motion/fbx/AC/ROB9205_Industrial_Robots_W2026/S01/01_course_intro_and_expectations/
```

Expected files are one NPZ and one FBX per slide, with the slide ID as the filename prefix.

In `compress12` mode, the queue report records the slide's `stretch_factor` so the later avatar-animation stage can retime the generated motion to the real slide duration.

The local repo contract for synced HY-Motion files is:

```text
generated/outputs/motion/hy_motion/npz/<school>/<course>/<session>/<topic>/
generated/outputs/motion/hy_motion/fbx/<school>/<course>/<session>/<topic>/
```

Sync from a local or mounted ComfyUI output folder with:

```bash
npm run sync:hy-motion -- \
  --sourceRoot /path/to/ComfyUI/output \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations
```

## Notes

- This stage generates reusable motion assets only.
- It does not generate the final avatar video yet.
- The next stage should load the saved NPZ/FBX motion, retarget or animate the avatar, add lip sync, and render the silent transparent slide video.
