# Remote Render Sync

These scripts move only the files needed for slide-avatar rendering between the main repo machine and a render machine.

They are intentionally one-way by lane:

- push sends generated render inputs to the render machine
- pull brings back only renderer outputs, statuses, and controls
- pull never overwrites local source files, jobs, lectures, audio, alignment, or avatar assets

## Setup

Copy the example config and edit paths if needed:

```bash
cp tools/remote_render/render_machine.config.example.json tools/remote_render/render_machine.config.json
```

Check SSH:

```bash
ssh -p 22 monjazeb@10.0.0.16 'hostname && pwd'
```

The intended setup is passwordless SSH or a stable key loaded in `ssh-agent`.

If SSH asks for a password every time, install a key once:

```bash
ssh-copy-id -p 22 monjazeb@10.0.0.16
```

Then verify non-interactive access:

```bash
ssh -o BatchMode=yes -p 22 monjazeb@10.0.0.16 'true'
```

If the render repo is already mounted through GNOME/GVFS SFTP, the scripts can use it for file transfer:

```text
/run/user/1000/gvfs/sftp:host=10.0.0.16/home/monjazeb/Projects/webdeck
```

The example config includes this as `render_mount`. With `--transport auto`, push/pull will use the mounted path when it exists and fall back to SSH rsync otherwise. Use `--transport mount` to require the mount.

## Push Inputs

```bash
tools/remote_render/push_render_inputs.sh
```

Force the GVFS/SFTP mount:

```bash
tools/remote_render/push_render_inputs.sh --transport mount
```

Dry run:

```bash
tools/remote_render/push_render_inputs.sh --dry-run
```

This pushes:

```text
generated/jobs/tts/
generated/jobs/slide_video/
generated/jobs/avatar_video/
generated/lectures/ layout/script/motion/screenshot files only
generated/outputs/audio/
generated/outputs/alignment/
generated/controls/slide_video/ when present
avatar_assets/ when present
```

## Pull Outputs

```bash
tools/remote_render/pull_render_outputs.sh
```

Force the GVFS/SFTP mount:

```bash
tools/remote_render/pull_render_outputs.sh --transport mount
```

This pulls only:

```text
generated/outputs/slide_video/
generated/status/
generated/controls/slide_video/
```

## Sync One Slide

Push inputs, optionally render one slide remotely, then pull outputs:

```bash
tools/remote_render/sync_one_slide.sh \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations \
  --slideId project_proposal \
  --render
```

Pass a renderer command when the remote repo needs one:

```bash
tools/remote_render/sync_one_slide.sh \
  --slideId project_proposal \
  --render \
  --rendererCommand "python /path/to/render_slide.py --packet {packet} --output {output}"
```

## Sync One Topic

```bash
tools/remote_render/sync_one_topic.sh \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S01 \
  --topic 01_course_intro_and_expectations \
  --render
```

Without `--render`, the sync scripts only push inputs and pull any existing outputs.

`--transport mount` affects file transfer only. Running the renderer remotely with `--render` still needs SSH command execution, or you can run `npm run render:slide-video` directly on the render machine and then use `pull_render_outputs.sh --transport mount`.

## Config

The default lookup order is:

1. `RENDER_MACHINE_CONFIG`
2. `tools/remote_render/render_machine.config.json`
3. `tools/remote_render/render_machine.config.example.json`

You can also pass `--config path`.
