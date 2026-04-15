// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S03/04_final_project_ideas.slides.js

export const topicMeta = {
  id: "01_final_project_ideas",
  title: "Final Project Ideas (Gripper/Vacuum + Conveyor + PLC + RPi)",
  duration: 25,
};

// Notes:
// - Keep language simple: robot = move parts, PLC = run sequence + safety, RPi = sensor reading + decision + dashboard.
// - Tools available: gripper (open/close), vacuum cup (on/off), conveyor belt.
// - If you want images later, add them to:
//   courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S03/media/ and use "./media/..."

const slidesData = [
  // 0 — TITLE
  {
    type: "title",
    hud: "Final Project",
    title: "Final Project Ideas",
    subtitle: "Industrial automation projects with Robot + PLC + Microcontroller",
    meta: "ROB9205 • Instructor: Ali Karimzadeh",
    notes:
      "These ideas are designed to match your lab tools. We’re not doing real welding/painting. We’re building automation cells: move parts + sensors + safe logic + clear results.",
  },

  // 1 — WHY THESE IDEAS ARE DIFFERENT
  {
    type: "bullets",
    hud: "Final Project",
    title: "Important concept (so it’s not confusing)",
    bullets: [
      "Our robot does **material handling**: pick, place, sort, load, unload",
      "In real factories, robots often only send a signal: **Tool ON / Tool OFF**",
      "So we can simulate tools (like welding) using a safe LED + simple fixture",
      "Your grade comes from: repeatable cycle, sensors, safe logic, and clean integration",
    ],
  },

  // 2 — WHO DOES WHAT (VERY CLEAR ROLES)
  {
    type: "bullets",
    hud: "Final Project",
    title: "Roles in the system (simple)",
    bullets: [
      "**Robot**: moves parts (pick → move → place) and runs a repeatable cycle",
      "**PLC**: runs the cell sequence + safety signals (start/stop, interlocks, alarms)",
      "**RPi** (small computer): reads sensors, makes decisions, logs data, web dashboard (optional)",
      "They communicate using simple signals: ON/OFF inputs and outputs (or simple network messages if allowed)",
    ],
  },

  // 3 — SENSOR CHEAT SHEET (SIMPLE WORDS)
  {
    type: "bullets",
    hud: "Final Project",
    title: "Sensor cheat sheet (plain language)",
    bullets: [
      "**Part present sensor**: “Is a part here?” (light beam sensor or proximity sensor)",
      "**Button switch**: “Did the part touch the fixture?” (limit switch = small button)",
      "**Vacuum/Grip OK**: “Did we actually pick the part?” (vacuum pressure switch or gripper detect)",
      "**Distance sensor**: “How far / how high?” (measures a number in cm/mm)",
      "**Camera** (RPi): “What color/label/QR is it?” (pass/fail or category)",
    ],
  },

  // 4 — REQUIREMENTS (SHORT, EASY)
  {
    type: "bullets",
    hud: "Final Project",
    title: "Minimum checklist (you must show these)",
    bullets: [
      "A repeatable cycle (it can run many times with the same steps)",
      "At least **3 sensors** used in the logic (not just decoration)",
      "A clear **Emergency Stop** behavior (safe stop + safe reset plan)",
      "Both **PLC** and **RPi** have a real job (not unused)",
      "Robot uses **9+ meaningful positions** (approach, pick, inspect, place, etc.)",
      "Basic safety thinking (guards, safe zones, do not bypass safety with voice/web)",
    ],
  },

  // 5 — IDEA MENU (SO STUDENTS CAN PICK FAST)
  {
    type: "bullets",
    hud: "Project Ideas",
    title: "Project menu (all fit gripper/vacuum + conveyor)",
    bullets: [
      "Idea 1: Conveyor **sorting** (red/blue or label/QR → Bin A / Bin B)",
      "Idea 2: Conveyor **inspection + reject gate** (pass/fail → accept/reject lane)",
      "Idea 3: **Machine tending simulator** (load → run → unload with handshake)",
      "Idea 4: **Kitting** (build a kit box with correct items and verify)",
      "Idea 5: **Palletizing** (stack in a pattern + count layers)",
      "Idea 6: **Spot welding simulation** (3D printed tool + LED “weld ON/OFF” + cycle logging)",
    ],
  },

  // 6 — IDEA 1 (SORTING)
  {
    type: "bullets",
    hud: "Idea 1",
    title: "Idea 1: Conveyor sorting cell (simple + very strong)",
    bullets: [
      "**Goal**: Parts move on a conveyor, robot sorts them into Bin A / Bin B",
      "**Robot**: pick from pickup point → move to check point → place into correct bin",
      "**Sensors (3+)**: part present at pickup, vacuum/grip OK, camera or color sensor (or distance sensor for size)",
      "**PLC**: starts/stops conveyor, controls stack-light/alarm, handles E-stop logic",
      "**RPi**: reads camera/sensor → decides A/B → shows counter dashboard (optional)",
    ],
  },

  // 7 — IDEA 2 (INSPECTION + REJECT GATE)
  {
    type: "bullets",
    hud: "Idea 2",
    title: "Idea 2: Inspection + reject lane (pass/fail)",
    bullets: [
      "**Goal**: Check each part and send it to ACCEPT or REJECT",
      "**Robot**: pick → hold in front of sensor/camera → place to accept/reject bin",
      "**Sensors (3+)**: part present, vacuum/grip OK, inspection sensor (camera/height/distance/label)",
      "**PLC**: runs conveyor and a simple “reject gate” output (can be a servo/solenoid or even an indicator)",
      "**RPi**: performs the inspection decision + logs failures (timestamp + reason)",
    ],
  },

  // 8 — IDEA 3 (MACHINE TENDING SIM)
  {
    type: "bullets",
    hud: "Idea 3",
    title: "Idea 3: Machine tending simulator (real industry workflow)",
    bullets: [
      "**Goal**: Robot loads a fixture, waits for a ‘machine cycle’, then unloads",
      "**Robot**: pick raw part → place in fixture → signal START → wait → remove part → place in output tray",
      "**Sensors (3+)**: part seated switch in fixture, vacuum/grip OK, machine DONE signal (timer/button/sensor)",
      "**PLC**: runs the handshake states (READY → LOADED → RUNNING → DONE) + safety interlocks",
      "**RPi**: logs cycle time + shows a simple web page (parts/hour, last error)",
    ],
  },

  // 9 — IDEA 4 (KITTING)
  {
    type: "bullets",
    hud: "Idea 4",
    title: "Idea 4: Kitting (build a kit box and verify)",
    bullets: [
      "**Goal**: Fill a kit box with the correct items (A + B + C) and confirm it’s complete",
      "**Robot**: pick items from different locations → place into correct slots in the kit tray",
      "**Sensors (3+)**: slot switches (is slot filled?), part present at pickup, vacuum/grip OK",
      "**PLC**: step-by-step sequence + alarm if a step fails + E-stop behavior",
      "**RPi**: verifies kit is correct and shows status: “Slot 1 OK, Slot 2 OK, Slot 3 OK”",
    ],
  },

  // 10 — IDEA 5 (PALLETIZING)
  {
    type: "bullets",
    hud: "Idea 5",
    title: "Idea 5: Palletizing with a pattern (great for 9+ positions)",
    bullets: [
      "**Goal**: Stack parts into a grid pattern (layer 1, layer 2, …) and count them",
      "**Robot**: pick from conveyor → place to pallet positions (many points) → repeat by layer",
      "**Sensors (3+)**: part present at pickup, vacuum/grip OK, bin/pallet present switch (optional: distance sensor for stack height)",
      "**PLC**: controls conveyor + status lights + stops when pallet is full",
      "**RPi**: counts parts/layers and shows a simple dashboard (and detects timeout/jam)",
    ],
  },

  // 11 — IDEA 6A (SPOT WELD SIM: WHAT IT MEANS)
  {
    type: "bullets",
    hud: "Idea 6",
    title: "Idea 6: Spot welding simulation (safe, but realistic control)",
    bullets: [
      "**Reality**: The robot does NOT generate welding power. It only sends a signal: **WELD ON / WELD OFF**",
      "So we simulate welding with: a **3D printed “weld gun”** + an **LED** at the tool",
      "**LED ON** = welding, **LED OFF** = not welding (same idea as real cells)",
      "The important part is the **sequence + safety + timing + logging**",
    ],
  },

  // 12 — IDEA 6B (SPOT WELD SIM: HOW TO BUILD IT)
  {
    type: "bullets",
    hud: "Idea 6",
    title: "Spot welding simulation (what you actually build)",
    bullets: [
      "**Robot**: move to multiple “weld points” on a fixture (10+ points is easy)",
      "**PLC**: enforces safe conditions (guard closed, E-stop OK) before allowing “weld enable”",
      "**RPi**: logs weld events: point number, time, duration; shows a web page report",
      "**Sensors (3+)**: part present in fixture, tool at home switch, weld-point confirm (can be simple), vacuum/grip OK if handling parts",
      "Optional: add a “quality” rule: if weld time too short/long → FAIL and rework bin",
    ],
  },

  // 13 — OPTIONAL ADVANCED FEATURES (RPi)
  {
    type: "bullets",
    hud: "Bonus",
    title: "Optional advanced features (RPi) — only if your base system works",
    bullets: [
      "Web dashboard: counts, cycle time, last error, pass/fail history",
      "Calendar-based recipe: ‘Today 7–9pm run Product A’ (RPi selects a mode/recipe)",
      "Voice command: ‘Start/Pause/Reset’ (must NOT bypass safety interlocks)",
      "LLM helper: generate a simple recipe description (RPi), but PLC still controls safety",
    ],
  },

  // 14 — HOW TO PRESENT (MAKE IT EASY FOR THEM)
  {
    type: "bullets",
    hud: "Deliverables",
    title: "What I expect in your demo (simple and clear)",
    bullets: [
      "Show the cycle running at least 3 times with the same behavior",
      "Explain your 3+ sensors: what each one proves (part present, picked OK, inspected OK, etc.)",
      "Show PLC states (sequence) and show at least one fault case + recovery",
      "Show RPi output (logs or dashboard) and how it connects to the cell",
      "Show your 9+ robot positions (a screenshot/list is fine)",
    ],
  },
];

export default slidesData;

