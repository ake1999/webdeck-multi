# Qwen TTS Worker

This package is a self-contained batch worker for the lecture repo’s frozen TTS contract. It reads existing `generated/jobs/tts/.../*.json` slide jobs, synthesizes production-quality lecture audio with `Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice` using the configured CustomVoice speaker, writes slide WAV files into the frozen `generated/outputs/audio/...` tree, updates per-job status files in the frozen `generated/status/...` tree, and merges the slide entry into the frozen topic alignment file at `generated/outputs/alignment/.../tts_alignment.json`.

This worker does **not** redesign the repo, does **not** run a web server, and does **not** change playback/media contracts. It is intended to be copied to the stronger computer and run there as the production TTS path.

## What It Consumes

Frozen input contracts:

- `generated/jobs/tts/<school>/<course>/<session>/<topic>/<slide_id>.json`
- `generated/status/<school>/<course>/<session>/<topic>/tts/<slide_id>.job_status.json`

The worker trusts the explicit output paths already recorded in each TTS job, but it also validates that they still match the frozen contract paths.

## What It Writes

Frozen output/status contracts:

- `generated/outputs/audio/<school>/<course>/<session>/<topic>/<slide_id>.wav`
- `generated/outputs/alignment/<school>/<course>/<session>/<topic>/tts_alignment.json`
- `generated/status/<school>/<course>/<session>/<topic>/tts/<slide_id>.job_status.json`

Per job, the worker:

1. reads one slide job
2. builds one speaking instruction per segment from the existing segment metadata
3. generates one audio segment per segment
4. concatenates the segments into one final slide WAV
5. estimates deterministic word timings from the actual generated segment durations
6. merges that slide into the topic `tts_alignment.json`
7. updates the per-job status file to `running`, `done`, or `error`

## Package Contents

```text
tools/qwen_tts_worker/
├── README.md
├── environment.yml
├── requirements.txt
├── config.example.json
├── setup_conda.sh
├── run_tts_worker.py
├── qwen_backend.py
├── instruction_builder.py
├── audio_utils.py
├── alignment_utils.py
├── status_utils.py
├── contract_utils.py
├── test_one_job.py
└── test_sentence_compare.py
```

## Expected Repo Layout

The worker assumes it is being run against the existing lecture repo layout:

```text
<repo_root>/
├── generated/
│   ├── jobs/tts/<school>/<course>/<session>/<topic>/<slide_id>.json
│   ├── outputs/audio/<school>/<course>/<session>/<topic>/<slide_id>.wav
│   ├── outputs/alignment/<school>/<course>/<session>/<topic>/tts_alignment.json
│   └── status/<school>/<course>/<session>/<topic>/tts/<slide_id>.job_status.json
└── tools/qwen_tts_worker/
```

By default, `config.example.json` sets `"repo_root": "../.."`, which is correct when the package lives inside `tools/qwen_tts_worker/`.

## Ubuntu + Miniconda Setup

These are the exact manual install steps the worker expects.

### 1. Create the environment from `environment.yml`

```bash
cd /path/to/your/repo
conda env create -f tools/qwen_tts_worker/environment.yml
```

If the environment already exists, update it instead:

```bash
conda env update -n qwen-tts-worker -f tools/qwen_tts_worker/environment.yml --prune
```

### 2. Activate the environment

```bash
conda activate qwen-tts-worker
```

### 3. Install PyTorch cu128

```bash
python -m pip install --upgrade pip
python -m pip install --index-url https://download.pytorch.org/whl/cu128 torch torchaudio
```

### 4. Install the worker requirements

```bash
python -m pip install -r tools/qwen_tts_worker/requirements.txt
```

### 5. Run a quick model test

This confirms the model can load and synthesize speech with the configured speaker:

```bash
python tools/qwen_tts_worker/test_sentence_compare.py \
  --config tools/qwen_tts_worker/config.example.json
```

### 6. Run `test_sentence_compare.py`

This produces a few lecture-like sample WAVs in `tools/qwen_tts_worker/test_outputs/` so you can sanity-check the configured voice before batch generation.

```bash
python tools/qwen_tts_worker/test_sentence_compare.py \
  --config tools/qwen_tts_worker/config.example.json
```

### 7. Run `test_one_job.py`

This processes one real frozen TTS job end to end:

```bash
python tools/qwen_tts_worker/test_one_job.py \
  --config tools/qwen_tts_worker/config.example.json \
  --job generated/jobs/tts/AC/ROB9205_Industrial_Robots_W2026/S02/03_robot_characteristics_manipulator_types/payload_what_it_really_means.json
```

### 8. Run the full worker

All jobs:

```bash
python tools/qwen_tts_worker/run_tts_worker.py \
  --config tools/qwen_tts_worker/config.example.json
```

One topic only:

```bash
python tools/qwen_tts_worker/run_tts_worker.py \
  --config tools/qwen_tts_worker/config.example.json \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S02 \
  --topic 03_robot_characteristics_manipulator_types
```

Dry run:

```bash
python tools/qwen_tts_worker/run_tts_worker.py \
  --config tools/qwen_tts_worker/config.example.json \
  --school AC \
  --course ROB9205_Industrial_Robots_W2026 \
  --session S02 \
  --topic 03_robot_characteristics_manipulator_types \
  --dry-run
```

One explicit job:

```bash
python tools/qwen_tts_worker/run_tts_worker.py \
  --config tools/qwen_tts_worker/config.example.json \
  --job generated/jobs/tts/AC/ROB9205_Industrial_Robots_W2026/S02/03_robot_characteristics_manipulator_types/payload_what_it_really_means.json
```

## Convenience Setup Script

You can also run the helper script instead of the manual environment steps:

```bash
bash tools/qwen_tts_worker/setup_conda.sh
```

It will:

1. create or update the `qwen-tts-worker` env from `environment.yml`
2. activate it
3. install PyTorch cu128
4. install `requirements.txt`
5. print the next test commands

## Configuration

Start by copying and editing:

```bash
cp tools/qwen_tts_worker/config.example.json tools/qwen_tts_worker/config.local.json
```

Important fields:

- `repo_root`
  Relative to the config file location. The example uses `../..` because the config lives two levels below the repo root.
- `model_name`
  Defaults to `Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice`.
- `speaker`
  Defaults to `Aiden` in the example, but it is configurable.
- `jobs_root`
  Where frozen TTS job files live.
- `outputs_audio_root`
  Root for frozen slide WAV outputs.
- `outputs_alignment_root`
  Root for frozen topic alignment outputs.
- `status_root`
  Root for frozen per-job status files.
- `pause_between_segments_ms`
  Short silence inserted between synthesized segments, except after the final segment.
- `save_debug_segment_wavs`
  If `true`, the worker also writes per-segment debug WAVs next to the final slide WAV.

## CLI Reference

`run_tts_worker.py` supports:

- `--config <path>`
- `--school <school>`
- `--course <course>`
- `--session <session>`
- `--topic <topic>`
- `--job <path>`
- `--dry-run`
- `--overwrite`
- `--max-jobs <N>`
- `--log-level DEBUG|INFO|WARNING|ERROR`

Behavior rules:

- jobs are processed sequentially
- one model load is reused across the whole batch
- the worker skips completed jobs with matching `contract_hash` unless `--overwrite` is set
- one failed job does **not** stop the entire batch
- startup/model/config failures are fatal and stop the worker immediately

## Alignment Behavior

The worker keeps the current repo alignment contract:

- top-level keys stay `topic_id`, `provider`, `slides`
- per slide keys stay `slide_id`, `audio_file`, `duration`, `segments`, `provider`
- per segment timing is based on the **actual generated segment durations**
- `words[]` are deterministic estimated timings using the same length-weighting idea already used in the repo

The worker updates alignment by **merge-by-topic**:

- it reads the current `tts_alignment.json` if it exists
- it replaces only the finished slide entry
- it preserves the other completed slides for that topic
- it writes the merged topic alignment file atomically

## Instruction Mapping

The worker does not use an LLM for speaking instructions. It deterministically maps segment metadata into a natural speaking instruction string for the configured voice.

Supported speaking styles:

- `clear_teacher`
- `serious_clear`
- `compare_explain`
- `energetic_demo`
- `calm_recap`
- `caution`
- `quiz_prompt`
- `explain`

Real-job alias handling:

- `clear_explain -> explain`

The mapping uses:

1. `delivery_kind`
2. `tone`
3. `voice_style`
4. fallback to `clear_teacher`

Then it layers in:

- energy band
- pace band
- emphasis words
- light attention guidance

It never speaks internal element IDs aloud.

## Troubleshooting

### `ModuleNotFoundError: No module named 'qwen_tts'`

Install the worker requirements:

```bash
conda activate qwen-tts-worker
python -m pip install -r tools/qwen_tts_worker/requirements.txt
```

### PyTorch CUDA wheel does not install

Make sure you used the cu128 index:

```bash
python -m pip install --index-url https://download.pytorch.org/whl/cu128 torch torchaudio
```

If your stronger machine needs a different CUDA wheel set, swap the index URL accordingly.

### `soundfile` fails to import

On some Ubuntu systems you may need:

```bash
sudo apt-get install libsndfile1
```

### Worker says the job path does not match the frozen contract

That means the worker found a TTS job JSON outside the expected `generated/jobs/tts/...` selector tree, or the JSON’s internal contract paths no longer match the Phase 4.5 frozen layout. The worker refuses to write outputs in that case by design.

### Worker skips jobs that you want to regenerate

Use:

```bash
python tools/qwen_tts_worker/run_tts_worker.py \
  --config tools/qwen_tts_worker/config.example.json \
  --overwrite
```

### Alignment merge fails because the existing JSON is bad

Fix or remove the corrupted `generated/outputs/alignment/.../tts_alignment.json` file and rerun the affected job(s).

### I want to test contract handling without generating audio

Use dry run:

```bash
python tools/qwen_tts_worker/run_tts_worker.py \
  --config tools/qwen_tts_worker/config.example.json \
  --dry-run
```

## Optional Follow-Up Integration

This package is designed to work on its own. If you later want to invoke it automatically from the main repo, you can add a higher-level orchestration wrapper in the repo root, but that is intentionally out of scope here.
