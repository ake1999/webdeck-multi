# serve_deck.py
# Run:
#   source ~/piper-env/bin/activate
#   pip install flask
#   python serve_deck.py

from flask import Flask, request, send_from_directory, send_file, jsonify, Response, after_this_request
import subprocess, tempfile, os, traceback, re
from pathlib import Path

APP_ROOT = Path(__file__).resolve().parent

VOICES_ROOT = Path.home() / "piper-voices"
DEFAULT_VOICE = "en_US-lessac-medium"   # your current working one

VOICE_RE = re.compile(r"^[A-Za-z0-9_-]+$")

app = Flask(__name__)

def resolve_voice(voice_id: str | None):
    vid = (voice_id or "").strip() or DEFAULT_VOICE
    if not VOICE_RE.match(vid):
        raise ValueError("Invalid voice id")

    vdir = (VOICES_ROOT / vid).resolve()
    # prevent path traversal
    if VOICES_ROOT.resolve() not in vdir.parents and vdir != VOICES_ROOT.resolve():
        raise ValueError("Invalid voice path")

    model = vdir / "model.onnx"
    config = vdir / "model.onnx.json"
    if not model.exists() or not config.exists():
        raise FileNotFoundError(f"Voice not found or missing files: {vid}")

    return vid, str(model), str(config)

@app.get("/voices")
def voices():
    voices = []
    if VOICES_ROOT.exists():
        for d in sorted(VOICES_ROOT.iterdir()):
            if not d.is_dir():
                continue
            model = d / "model.onnx"
            config = d / "model.onnx.json"
            if model.exists() and config.exists():
                voices.append(d.name)
    return jsonify({"voices": voices, "default": DEFAULT_VOICE})

@app.get("/tts")
def tts():
    text = (request.args.get("text", "") or "").strip()
    if not text:
        return Response("Missing ?text=", status=400)

    if len(text) > 2000:
        text = text[:2000]

    voice_id = request.args.get("voice", "") or DEFAULT_VOICE

    try:
        _, model_path, config_path = resolve_voice(voice_id)
    except Exception as e:
        return Response(f"Bad voice: {e}", status=400)

    fd, wav_path = tempfile.mkstemp(suffix=".wav")
    os.close(fd)

    @after_this_request
    def cleanup(resp):
        try:
            os.remove(wav_path)
        except Exception:
            pass
        resp.headers["Cache-Control"] = "no-store"
        return resp

    try:
        cmd = ["piper", "-m", model_path, "-c", config_path, "-f", wav_path]
        subprocess.run(
            cmd,
            input=(text + "\n").encode("utf-8"),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            check=True,
        )
        return send_file(wav_path, mimetype="audio/wav", conditional=False)

    except subprocess.CalledProcessError as e:
        err = (e.stderr or b"").decode("utf-8", "ignore")
        print("\n=== PIPER ERROR ===\n", err, "\n==================\n")
        return Response("Piper failed:\n" + (err or "unknown error"), status=500)

    except Exception:
        traceback.print_exc()
        return Response("Server error (see terminal traceback).", status=500)

@app.get("/")
def home():
    return send_from_directory(APP_ROOT, "index.html")

@app.get("/<path:filepath>")
def static_files(filepath):
    return send_from_directory(APP_ROOT, filepath)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)

