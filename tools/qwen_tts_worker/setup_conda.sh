#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/environment.yml"
REQ_FILE="${SCRIPT_DIR}/requirements.txt"
ENV_NAME="${ENV_NAME:-qwen-tts-worker}"

if ! command -v conda >/dev/null 2>&1; then
  echo "conda was not found in PATH. Install Miniconda first, then rerun this script." >&2
  exit 1
fi

CONDA_BASE="$(conda info --base)"
# shellcheck source=/dev/null
source "${CONDA_BASE}/etc/profile.d/conda.sh"

if conda env list | awk '{print $1}' | grep -qx "${ENV_NAME}"; then
  echo "[setup] Updating existing conda env: ${ENV_NAME}"
  conda env update -n "${ENV_NAME}" -f "${ENV_FILE}" --prune
else
  echo "[setup] Creating conda env from ${ENV_FILE}"
  conda env create -f "${ENV_FILE}"
fi

echo "[setup] Activating ${ENV_NAME}"
conda activate "${ENV_NAME}"

echo "[setup] Upgrading pip"
python -m pip install --upgrade pip

echo "[setup] Installing PyTorch cu128 wheels"
python -m pip install --index-url https://download.pytorch.org/whl/cu128 torch torchaudio

echo "[setup] Installing worker requirements"
python -m pip install -r "${REQ_FILE}"

cat <<EOF

[setup] Done.

Next steps:
  1. conda activate ${ENV_NAME}
  2. python ${SCRIPT_DIR}/test_sentence_compare.py --config ${SCRIPT_DIR}/config.example.json
  3. python ${SCRIPT_DIR}/test_one_job.py --config ${SCRIPT_DIR}/config.example.json --job generated/jobs/tts/AC/ROB9205_Industrial_Robots_W2026/S02/03_robot_characteristics_manipulator_types/payload_what_it_really_means.json
  4. python ${SCRIPT_DIR}/run_tts_worker.py --config ${SCRIPT_DIR}/config.example.json

EOF
