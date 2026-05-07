#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE=""
SCHOOL=""
COURSE=""
SESSION=""
TOPIC=""
RUN_RENDER=0
DRY_RUN=0
TRANSPORT="auto"
RENDER_MOUNT=""
REMOTE_RENDERER_COMMAND="${WEBDECK_REMOTE_RENDERER_COMMAND:-}"

usage() {
  cat <<'USAGE'
Usage: tools/remote_render/sync_one_topic.sh [options]

Options:
  --config path
  --school value
  --course value
  --session value
  --topic value
  --render
  --rendererCommand value
  --transport auto|mount|ssh
  --renderMount path
  --dry-run

By default this pushes inputs and pulls existing outputs. With --render it also
runs npm run render:slide-video on the render machine for the selected topic.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --config) CONFIG_FILE="${2:?Missing value for --config}"; shift 2 ;;
    --school) SCHOOL="${2:?Missing value for --school}"; shift 2 ;;
    --course) COURSE="${2:?Missing value for --course}"; shift 2 ;;
    --session) SESSION="${2:?Missing value for --session}"; shift 2 ;;
    --topic) TOPIC="${2:?Missing value for --topic}"; shift 2 ;;
    --render) RUN_RENDER=1; shift ;;
    --rendererCommand) REMOTE_RENDERER_COMMAND="${2:?Missing value for --rendererCommand}"; shift 2 ;;
    --transport) TRANSPORT="${2:?Missing value for --transport}"; shift 2 ;;
    --renderMount|--render-mount) RENDER_MOUNT="${2:?Missing value for --renderMount}"; shift 2 ;;
    --dry-run|-n) DRY_RUN=1; shift ;;
    --help|-h) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 2 ;;
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

quote_arg() {
  printf "'%s'" "${1//\'/\'\\\'\'}"
}

SCHOOL="${SCHOOL:-$(json_value default_school)}"
COURSE="${COURSE:-$(json_value default_course)}"
SESSION="${SESSION:-$(json_value default_session)}"
TOPIC="${TOPIC:-$(json_value default_topic)}"
RENDER_USER="$(json_value render_user)"
RENDER_HOST="$(json_value render_host)"
RENDER_REPO="$(json_value render_repo)"
SSH_PORT="$(json_value ssh_port)"
SSH_PORT="${SSH_PORT:-22}"

PUSH_ARGS=(--config "$CONFIG_FILE" --transport "$TRANSPORT")
PULL_ARGS=(--config "$CONFIG_FILE" --transport "$TRANSPORT")
if [[ -n "$RENDER_MOUNT" ]]; then
  PUSH_ARGS+=(--renderMount "$RENDER_MOUNT")
  PULL_ARGS+=(--renderMount "$RENDER_MOUNT")
fi
if [[ "$DRY_RUN" -eq 1 ]]; then
  PUSH_ARGS+=(--dry-run)
  PULL_ARGS+=(--dry-run)
fi

"$SCRIPT_DIR/push_render_inputs.sh" "${PUSH_ARGS[@]}"

if [[ "$RUN_RENDER" -eq 1 ]]; then
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "Dry run: would render topic $SCHOOL/$COURSE/$SESSION/$TOPIC on $RENDER_USER@$RENDER_HOST"
  else
    if [[ "$TRANSPORT" == "mount" ]]; then
      echo "Note: --render still executes on the render machine over SSH; mount transport only affects file sync." >&2
    fi
    CMD="cd $(quote_arg "$RENDER_REPO") && npm run render:slide-video -- --school $(quote_arg "$SCHOOL") --course $(quote_arg "$COURSE") --session $(quote_arg "$SESSION") --topic $(quote_arg "$TOPIC")"
    if [[ -n "$REMOTE_RENDERER_COMMAND" ]]; then
      CMD+=" --rendererCommand $(quote_arg "$REMOTE_RENDERER_COMMAND")"
    fi
    ssh -p "$SSH_PORT" "${RENDER_USER}@${RENDER_HOST}" "$CMD"
  fi
else
  echo "Skipping remote render. Pass --render to run npm run render:slide-video on the render machine."
fi

"$SCRIPT_DIR/pull_render_outputs.sh" "${PULL_ARGS[@]}"
