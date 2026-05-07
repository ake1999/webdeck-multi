#!/usr/bin/env python3
"""Lightweight static server for the WebDeck project.

Phase 1 no longer depends on Flask or Piper. This script keeps the familiar
`python3 serve_deck.py` workflow while serving the deck as a plain static app.
"""

from __future__ import annotations

import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


APP_ROOT = Path(__file__).resolve().parent


class DeckRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(APP_ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, format: str, *args) -> None:  # noqa: A003
        print(f"[webdeck] {self.address_string()} - {format % args}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Serve the WebDeck app locally.")
    parser.add_argument("--host", default="0.0.0.0", help="Host interface to bind")
    parser.add_argument("--port", default=8000, type=int, help="Port to listen on")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    server = ThreadingHTTPServer((args.host, args.port), DeckRequestHandler)
    print(f"Serving WebDeck from {APP_ROOT}")
    print(f"Open http://127.0.0.1:{args.port}/")

    try:
      server.serve_forever()
    except KeyboardInterrupt:
      print("\nStopping server...")
    finally:
      server.server_close()


if __name__ == "__main__":
    main()
