# WebDeck Multi — Course Slide Engine with TTS

WebDeck Multi is a browser-based slide engine designed for multi-course teaching environments (universities/colleges) with:

- Multiple schools (e.g., AC, UO)
- Multiple courses per school
- Multiple sessions per course
- Multiple topics per session

It supports:

- Browser-based slides
- Text-to-Speech (TTS) via Piper or browser
- PDF export
- Notes for instructors
- Simple MCQs
- Widgets (e.g. 3D kinematics)
- Per-school theming (AC vs uOttawa)
- Git-friendly content (stored as JS instead of PowerPoint)

---

## FEATURES

• Slide Types

- title
- bullets
- two-col
- mcq
- raw html

• TTS

- Piper backend via Flask (/tts)
- Fallback browser speechSynthesis
- Voice selection
- Bullets vs Notes reading modes
- Highlighting during speech

• PDF Export

- Prints one slide per page
- Stable page numbers
- Hidden UI during print
- Footer watermark preserved

• Course Hierarchy
SCHOOL → COURSE → SESSION → TOPIC

• Theming

- Algonquin College (green)
- uOttawa (red)

---

## PROJECT STRUCTURE

root/
├── index.html
├── sessions.html
├── session.html
├── serve_deck.py
├── shared/
│ ├── deck.css
│ ├── deck.js
│ ├── deck_render.js
│ ├── session_loader.js
│ ├── media/
│ │ ├── ac-footer.png
│ │ └── uo-footer.png
│ └── widgets/
│ └── kin_viewer.html
└── courses/
├── AC/
│ └── ROB9205_Industrial_Robots_W2026/
│ └── sessions/
│ └── S01/
│ ├── 01_course_intro_and_expectations.slides.js
│ ├── 02_robot_safety.slides.js
│ └── media/
└── UO/
└── MCG5138_Autonomous_Mobile_Robots_W2026/
└── sessions/
└── S01/
├── 01_mobile_robotics_lab_intro_and_expectations.slides.js
└── media/

---

## CONVENTIONS

Folder names:
Use underscores: ROB9205_Industrial_Robots_W2026

Sessions:
S01, S02, S03 …

Topics:
NN_description.slides.js
e.g. 01_robot_safety.slides.js

Topic metadata (optional):
export const topicMeta = {
id: "...",
title: "...",
duration: 45
};

Slides export:
export default slidesData;

---

## REQUIREMENTS

• Python 3.10+
• Flask (pip install flask)
• Piper installed + voices
• Browser with ES module support

Optional:
• GPU for heavy TTS models

---

## SETUP

Clone:

git clone <repo-url>
cd <repo-folder>

(Optional) venv:

python3 -m venv venv
source venv/bin/activate

Install server deps:

pip install flask

Make sure Piper exists via:

piper --help

Voice directory:

~/piper-voices/<voice-id>/
model.onnx
model.onnx.json

Default voice configured in serve_deck.py:

DEFAULT_VOICE = "en_US-lessac-medium"

---

## RUNNING

Start server:

python serve_deck.py

Open browser:

http://127.0.0.1:8000/

---

## ROUTING

1. Entry:

/

2. Select sessions:

/sessions.html?school=AC&course=ROB9205_Industrial_Robots_W2026

3. Open topic deck:

/session.html?school=AC&course=ROB9205_Industrial_Robots_W2026&session=S01&topic=01_robot_safety

session_loader.js resolves:

/courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S01/01_robot_safety.slides.js

---

## SLIDE TYPES

type: "title"
title
subtitle
meta
notes
hud

type: "bullets"
title
bullets: [string or {text,say}]
notes
hud

type: "two-col"
left {bullets,media,lead,...}
right {bullets,media,lead,...}

type: "mcq"
question
options [{choice,label}]
correct
explain
notes

Fallback:
Provide html string

---

## TTS ENDPOINTS

GET /voices → {voices:[...], default:"..."}

GET /tts?text=Hello&voice=en_US-lessac-medium
→ returns audio/wav

Browser fallback:
speechSynthesis (Chrome, etc.)

---

## KEYBOARD SHORTCUTS

→ or Space: next slide
←: previous slide
H: back to sessions
ESC (future): exit

---

## PDF EXPORT

Button: PDF

Engine switches to print-mode:

• Controls hidden
• Footer preserved
• Page numbers fixed
• One slide per page

User must enable “Background graphics” in PDF dialog.

---

## THEMES

theme-ac
Green accents
Bullet markers green
Footer watermark: ac-footer.png

theme-uo
Red accents
Footer watermark: uo-footer.png

Theme chosen from:

?school=AC → theme-ac
?school=UO → theme-uo

---

## DESIGN GOALS

• Entire course stored in git
• Slides as code (no PowerPoint rot)
• Student PDF export matches web view
• TTS supports accessibility
• Multi-course reuse
• Widgets embed via iframe

---

## LICENSE

MIT License
