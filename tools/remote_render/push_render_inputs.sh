#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE=""
DRY_RUN=0
TRANSPORT="auto"
RENDER_MOUNT_OVERRIDE=""

usage() {
  cat <<'USAGE'
Usage: tools/remote_render/push_render_inputs.sh [--config path] [--transport auto|mount|ssh] [--renderMount path] [--dry-run]

Copies only the renderer inputs needed on the render machine:
  - generated/jobs/slide_video/
  - selected generated/lectures/ files
  - generated/outputs/audio/
  - generated/outputs/alignment/
  - generated/controls/slide_video/ when present
  - avatar_assets/ when present
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --config)
      CONFIG_FILE="${2:?Missing value for --config}"
      shift 2
      ;;
    --dry-run|-n)
      DRY_RUN=1
      shift
      ;;
    --transport)
      TRANSPORT="${2:?Missing value for --transport}"
      shift 2
      ;;
    --renderMount|--render-mount)
      RENDER_MOUNT_OVERRIDE="${2:?Missing value for --renderMount}"
      shift 2
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if [[ -z "$CONFIG_FILE" ]]; then
  if [[ -n "${RENDER_MACHINE_CONFIG:-}" ]]; then
    CONFIG_FILE="$RENDER_MACHINE_CONFIG"
  elif [[ -f "$SCRIPT_DIR/render_machine.config.json" ]]; then
    CONFIG_FILE="$SCRIPT_DIR/render_machine.config.json"
  else
    CONFIG_FILE="$SCRIPT_DIR/render_machine.config.example.json"
  fi
fi

json_value() {
  local key="$1"
  node - "$CONFIG_FILE" "$key" <<'NODE'
const fs = require("fs");
const [,, file, key] = process.argv;
const config = JSON.parse(fs.readFileSync(file, "utf8"));
const value = key.split(".").reduce((acc, part) => acc?.[part], config);
process.stdout.write(value == null ? "" : String(value));
NODE
}

MAIN_REPO="$(json_value main_repo)"
RENDER_USER="$(json_value render_user)"
RENDER_HOST="$(json_value render_host)"
RENDER_REPO="$(json_value render_repo)"
RENDER_MOUNT="${RENDER_MOUNT_OVERRIDE:-$(json_value render_mount)}"
SSH_PORT="$(json_value ssh_port)"

if [[ -z "$RENDER_USER" || -z "$RENDER_HOST" || -z "$RENDER_REPO" ]]; then
  echo "Config must define render_user, render_host, and render_repo." >&2
  exit 2
fi

SSH_PORT="${SSH_PORT:-22}"

if [[ ! -d "$MAIN_REPO" ]]; then
  FALLBACK_REPO="$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel 2>/dev/null || pwd)"
  echo "Warning: config main_repo not found: $MAIN_REPO" >&2
  echo "Using detected repo root: $FALLBACK_REPO" >&2
  MAIN_REPO="$FALLBACK_REPO"
fi

cd "$MAIN_REPO"

detect_mount() {
  if [[ -n "$RENDER_MOUNT" && -d "$RENDER_MOUNT" ]]; then
    printf '%s' "$RENDER_MOUNT"
    return 0
  fi

  local uid_value="${UID:-$(id -u)}"
  local candidate="/run/user/${uid_value}/gvfs/sftp:host=${RENDER_HOST}${RENDER_REPO}"
  if [[ -d "$candidate" ]]; then
    printf '%s' "$candidate"
    return 0
  fi

  return 1
}

if [[ "$TRANSPORT" != "auto" && "$TRANSPORT" != "mount" && "$TRANSPORT" != "ssh" ]]; then
  echo "Invalid --transport: $TRANSPORT. Use auto, mount, or ssh." >&2
  exit 2
fi

MOUNT_PATH=""
if [[ "$TRANSPORT" == "mount" || "$TRANSPORT" == "auto" ]]; then
  if MOUNT_PATH="$(detect_mount)"; then
    TRANSPORT="mount"
  elif [[ "$TRANSPORT" == "mount" ]]; then
    echo "Requested mount transport, but render mount is not available." >&2
    exit 2
  else
    TRANSPORT="ssh"
  fi
fi

REMOTE="${RENDER_USER}@${RENDER_HOST}:${RENDER_REPO}"
RSYNC_RSH="ssh -p ${SSH_PORT}"
DRY_ARGS=()
if [[ "$DRY_RUN" -eq 1 ]]; then
  DRY_ARGS+=(--dry-run)
fi

if [[ "$TRANSPORT" == "mount" ]]; then
  echo "Pushing render inputs from $MAIN_REPO to mounted render repo $MOUNT_PATH"
  if [[ "$DRY_RUN" -eq 0 ]]; then
    mkdir -p \
      "$MOUNT_PATH/generated/jobs/slide_video" \
      "$MOUNT_PATH/generated/lectures" \
      "$MOUNT_PATH/generated/outputs/audio" \
      "$MOUNT_PATH/generated/outputs/alignment" \
      "$MOUNT_PATH/generated/controls/slide_video"
  fi

  rsync -avz --mkpath "${DRY_ARGS[@]}" \
    generated/jobs/slide_video/ \
    "$MOUNT_PATH/generated/jobs/slide_video/"

  rsync -avz --mkpath "${DRY_ARGS[@]}" \
    --include='*/' \
    --include='motion/*.motion.json' \
    --include='layout.manifest.json' \
    --include='script.manifest.json' \
    --include='screenshots/*.png' \
    --exclude='*' \
    generated/lectures/ \
    "$MOUNT_PATH/generated/lectures/"

  rsync -avz --mkpath "${DRY_ARGS[@]}" \
    generated/outputs/audio/ \
    "$MOUNT_PATH/generated/outputs/audio/"

  rsync -avz --mkpath "${DRY_ARGS[@]}" \
    generated/outputs/alignment/ \
    "$MOUNT_PATH/generated/outputs/alignment/"

  if [[ -d generated/controls/slide_video ]]; then
    rsync -avz --mkpath "${DRY_ARGS[@]}" \
      generated/controls/slide_video/ \
      "$MOUNT_PATH/generated/controls/slide_video/"
  else
    echo "Warning: generated/controls/slide_video/ does not exist locally; skipping AI-1 controls sync." >&2
  fi

  if [[ -d avatar_assets ]]; then
    rsync -avz --mkpath "${DRY_ARGS[@]}" \
      avatar_assets/ \
      "$MOUNT_PATH/avatar_assets/"
  else
    echo "Warning: avatar_assets/ does not exist locally; skipping avatar asset sync." >&2
  fi

  exit 0
fi

echo "Pushing render inputs from $MAIN_REPO to ${RENDER_USER}@${RENDER_HOST}:${RENDER_REPO}"

rsync -avz --mkpath "${DRY_ARGS[@]}" -e "$RSYNC_RSH" \
  generated/jobs/slide_video/ \
  "${REMOTE}/generated/jobs/slide_video/"

rsync -avz --mkpath "${DRY_ARGS[@]}" -e "$RSYNC_RSH" \
  --include='*/' \
  --include='motion/*.motion.json' \
  --include='layout.manifest.json' \
  --include='script.manifest.json' \
  --include='screenshots/*.png' \
  --exclude='*' \
  generated/lectures/ \
  "${REMOTE}/generated/lectures/"

rsync -avz --mkpath "${DRY_ARGS[@]}" -e "$RSYNC_RSH" \
  generated/outputs/audio/ \
  "${REMOTE}/generated/outputs/audio/"

rsync -avz --mkpath "${DRY_ARGS[@]}" -e "$RSYNC_RSH" \
  generated/outputs/alignment/ \
  "${REMOTE}/generated/outputs/alignment/"

if [[ -d generated/controls/slide_video ]]; then
  rsync -avz --mkpath "${DRY_ARGS[@]}" -e "$RSYNC_RSH" \
    generated/controls/slide_video/ \
    "${REMOTE}/generated/controls/slide_video/"
else
  echo "Warning: generated/controls/slide_video/ does not exist; skipping AI-1 controls sync." >&2
fi

if [[ -d avatar_assets ]]; then
  rsync -avz --mkpath "${DRY_ARGS[@]}" -e "$RSYNC_RSH" \
    avatar_assets/ \
    "${REMOTE}/avatar_assets/"
else
  echo "Warning: avatar_assets/ does not exist; skipping avatar asset sync." >&2
fi
