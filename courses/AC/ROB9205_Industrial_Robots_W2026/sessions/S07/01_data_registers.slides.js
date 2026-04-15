// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S07/01_data_registers_lab7.slides.js
// Session S07 — FANUC Data Registers (R) + Position Registers (PR) — Lab 7
//
// ✅ REQUIRED LOCAL MEDIA (put into ./media and use THESE names)
// 1) DATA Registers lecture (page 4 image)  -> ./media/data_registers_p04_types.png
// 2) DATA Registers lecture (page 5 image)  -> ./media/data_registers_p05_insert.png
// 3) DATA Registers lecture (page 6 image)  -> ./media/data_registers_p06_use.png
//
// NOTE: Keep these filenames stable so the deck always loads images.

export const topicMeta = {
  id: "01_data_registers",
  title: "FANUC Data Registers (R) + Position Registers (PR) — Lab 7",
  duration: 120,
};

const A = (relPath) => new URL(relPath, import.meta.url).href;

const slidesData = [
  // 0 — TITLE
  {
    type: "title",
    hud: "Lab 7",
    title: "DATA Registers (R) + Position Registers (PR)",
    subtitle: "How they work • how to use them • Lab 7 workflow",
    meta: "Instructor: Ali Karimzadeh • ROB9205 Industrial Robots",
    notes:
      "Goal: students can store numbers, do arithmetic, use IF/loops, capture timer, and do basic PR add/sub.",
  },

  // 1 — LEARNING GOALS
  {
    type: "bullets",
    hud: "Goals",
    title: "By the end of today, you can…",
    bullets: [
      "Explain what a **Data Register R[n]** is (a numeric variable)",
      "Insert register instructions on the pendant (fast workflow)",
      "Do arithmetic: **+ − × ÷**, and understand **MOD** vs **DIV**",
      "Use registers for **loops** and **IF conditions**",
      "Capture **TIMER** values into a register",
      "Understand **Position Registers PR[n]** and do **PR addition/subtraction**",
    ],
  },

  // 2 — WHAT ARE DATA REGISTERS
  {
    type: "bullets",
    hud: "Theory",
    title: "What is a Data Register (R[n])?",
    bullets: [
      "A **data register** is a general-purpose storage location (a **variable**) for numbers",
      "Stores **integers** or **real (decimal)** values",
      "Used for: program logic, calculations, counting, decisions, motion-related numbers",
      "Most controllers provide up to **200** registers: `R[1] … R[200]`",
    ],
  },

  // 3 — KEY POINTS (from lecture slide 3)
  {
    type: "bullets",
    hud: "Key Points",
    title: "Key points you should remember",
    bullets: [
      "**Storage & access:** registers are global inside the controller → any program can read/write them",
      "**Programming:** use them to store intermediate results (like a calculator memory)",
      "**Control flow:** use in **IF** statements and **loops** (count cycles, limit retries, etc.)",
      "**Applications:** palletizing, sorting, quality checks, counters, simple decision logic",
    ],
  },

  // 4 — TYPES OF REGISTERS (use lecture p4 image)
  {
    type: "two-col",
    hud: "Types",
    title: "3 common register types you will see",
    left: {
      bullets: [
        "**Data Registers (R[n])** → store numbers (int/real)",
        "**Position Registers (PR[n])** → store positions (Cartesian or Joint)",
        "**Pallet Registers (PL[n])** → palletizing position data",
        "Today: focus on **R** and **PR** (Lab 7)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/data_registers_p04_types.png"),
        source: "Data Registers Types",
      },
    },
  },

  // 5 — WHERE YOU VIEW REGISTERS (double display)
  {
    type: "bullets",
    hud: "Pendant",
    title: "Best pendant setup: **Double Display**",
    lead: "You want to see your program (left) and registers (right) at the same time.",
    bullets: [
      "1) Open any program (or create a new one with a few taught points)",
      "2) Press **SHIFT + DISPLAY** → choose **Double Display**",
      "3) Press **DISP** to change what each side shows",
      "4) Left screen: your **program**",
      "5) Right screen: press **DATA** → open **Registers**",
    ],
  },

  // 6 — INSERT REGISTER INSTRUCTION (use lecture p5 image)
  {
    type: "two-col",
    hud: "Pendant",
    title: "How to INSERT a register instruction (fast)",
    left: {
      bullets: [
        "1) Move cursor where you want the line",
        "2) Press **NEXT**",
        "3) Press **INST**",
        "4) Select **Registers**",
        "5) Select `R[ ]`",
        "6) Select the **statement** (Assign, +, −, ×, ÷, MOD, DIV…)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/data_registers_p05_insert.png"),
        source: "Data Registers Insert",
      },
    },
  },

  // 7 — ANATOMY OF R[i] = (value)
  {
    type: "bullets",
    hud: "Syntax",
    title: "R instruction anatomy: `R[i] = (value)`",
    lead: "Think: left side is where you store; right side is what you read/compute.",
    bullets: [
      "`R[i]` = target register number (usually `1…200`)",
      "Right side can be:",
      "• a **constant** (ex: `50`, `12.5`)",
      "• another register `R[j]`",
      "• elements like `PR[i,j]` (position register element)",
      "• signals: `DI`, `DO`, `AI`, `AO`, `GI`, `GO`, `RI`, `RO`, etc.",
      "• timer values: `TIMER[i]` (useful in Lab 7)",
    ],
  },

  // 8 — BASIC ARITHMETIC (split into two slides to keep short)
  {
    type: "bullets",
    hud: "Math",
    title: "Basic arithmetic with registers (core patterns)",
    bullets: [
      "```text\nR[1] = 50      ;  (assign)\nR[2] = R[1]+25 ;  (add)\nR[3] = R[2]-10 ;  (subtract)\n```",
      "```text\nR[4] = R[2]*2  ;  (multiply)\nR[5] = R[4]/3  ;  (divide)\n```",
      "Use registers like scratchpad memory: compute step-by-step",
    ],
  },

  // 9 — RULES / RESTRICTIONS (important)
  {
    type: "bullets",
    hud: "Rules",
    title: "Rules that cause the most errors",
    bullets: [
      "**Rule 1:** Up to **five operators** on one line (long expressions can fail)",
      "**Rule 2:** You can mix `+` with `-` on one line",
      "**Rule 3:** You can mix `*` with `/` on one line",
      "**Rule 4:** You **cannot** mix `{+,-}` with `{*,/}` on the same line",
      "If you need both: split into two lines using a temporary register",
    ],
  },

  // 10 — QUIZ (mixing operators)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: why does this fail?",
    question:
      "Student writes: `R[2] = R[3] + R[4] * R[5]` and the controller rejects it. Best explanation + fix?",
    options: [
      {
        choice: "A",
        label:
          "It fails because `R[4]` must be a constant. Fix: replace R[4] with 4.",
      },
      {
        choice: "B",
        label:
          "It fails because you mixed `+` with `*` on one line. Fix: `R[9]=R[4]*R[5]` then `R[2]=R[3]+R[9]`.",
      },
      {
        choice: "C",
        label:
          "It fails because registers cannot be used in math. Fix: use PR instead.",
      },
      {
        choice: "D",
        label:
          "It fails because `R[2]` must be > R[3]. Fix: swap the numbers.",
      },
    ],
    correct: "B",
    explain:
      "FANUC register math has operator mixing restrictions. Use a temp register to split the expression.",
  },

  // 11 — MOD vs DIV
  {
    type: "bullets",
    hud: "Math",
    title: "MOD vs DIV (useful for indexing + patterns)",
    lead: "Two different questions: remainder vs integer-division.",
    bullets: [
      "**DIV** = integer part of division (quotient without decimals)",
      "**MOD** = remainder part (what is left after dividing)",
      "Example (concept): 17 DIV 5 = 3, and 17 MOD 5 = 2",
      "Lab manual shows integer-division idea as:",
      "```text\nR[i] = ( x - (x MOD y) ) / y\n```",
    ],
  },

  // 12 — QUIZ (MOD/DIV for pallet pattern)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: pick MOD or DIV",
    question:
      "You want to cycle through 4 positions repeatedly: 0,1,2,3,0,1,2,3… using a counter `R[1]` that keeps increasing. Which gives the repeating index?",
    options: [
      { choice: "A", label: "`R[2] = R[1] DIV 4`" },
      { choice: "B", label: "`R[2] = R[1] * 4`" },
      { choice: "C", label: "`R[2] = R[1] / 4` (real division)" },
      { choice: "D", label: "`R[2] = R[1] MOD 4`" },
    ],
    correct: "D",
    explain:
      "MOD gives the repeating remainder (0..3). DIV gives the growing block number (0,0,0,0,1,1,1,1...).",
  },

  // 13 — HOW TO USE REGISTERS (use lecture p6 image)
  {
    type: "two-col",
    hud: "Use Cases",
    title: "How registers are used in real programs",
    left: {
      bullets: [
        "1) **Math calculations** (store intermediate results)",
        "2) Store motion-related numbers (speed/offset values)",
        "3) **Loop counters** (repeat N times safely)",
        "4) **IF logic** (decisions based on measurements)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/data_registers_p06_use.png"),
        source: "Data Registers Use",
      },
    },
  },

  // 14 — LOOP TEMPLATE (clear)
  {
    type: "bullets",
    hud: "Loops",
    title: "Loop counter pattern (very common)",
    lead: "Goal: repeat a block 10 times, then continue.",
    bullets: [
      "```text\nR[5]=0\nLBL[1]\nR[5]=R[5]+1\nIF R[5] < 10, JMP LBL[1]\n```",
      "Read it as: initialize → do work → increment → if not done, jump back",
      "Lab habit: use a counter to limit retries (safe automation)",
    ],
  },

  // 15 — QUIZ (off-by-one loop)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: off-by-one check",
    question:
      "If you want the loop body to run exactly 10 times, which condition is correct (assuming you increment first)?",
    options: [
      { choice: "A", label: "`IF R[5] <= 10, JMP LBL[1]`" },
      { choice: "B", label: "`IF R[5] > 10, JMP LBL[1]`" },
      { choice: "C", label: "`IF R[5] < 10, JMP LBL[1]`" },
      { choice: "D", label: "`IF R[5] = 10, JMP LBL[1]`" },
    ],
    correct: "C",
    explain:
      "With increment-first, values go 1..10. When it becomes 10, `< 10` is false, so it stops after 10 runs.",
  },

  // 16 — IF LOGIC (decision)
  {
    type: "bullets",
    hud: "Logic",
    title: "Using registers in IF decisions",
    lead: "Registers often store measurements, counters, or computed thresholds.",
    bullets: [
      "Example idea (pseudo):",
      "```text\nIF R[1] > 100 THEN\n  CALL ALARM_PROGRAM\nENDIF\n```",
      "Use cases: too many failures → stop; part count reached → change routine; sensor reading out of range → alarm",
    ],
  },

  // 17 — TIMER CAPTURE (Lab 7 step)
  {
    type: "bullets",
    hud: "Lab 7",
    title: "Lab Task: capture TIMER into a register",
    lead: "Goal: measure how long part of your program took.",
    bullets: [
      "Insert these lines (in this order):",
      "```text\nTIMER[1]=RESET\nTIMER[1]=START\n...\nR[10]=TIMER[1]\n```",
      "Tip: on the value selection screen, go to next page and choose **TIMER**",
      "Timer overflow flag is cleared when you do `TIMER[i]=RESET`",
    ],
  },

  // 18 — QUIZ (timer mistake)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: why is my timer always 0?",
    question:
      "Student runs the program and `R[10]` is always 0. Most likely mistake?",
    options: [
      { choice: "A", label: "They forgot `TIMER[1]=START` before reading it" },
      { choice: "B", label: "They used `R[10]=R[1]` by accident" },
      { choice: "C", label: "They must use PR instead of R" },
      { choice: "D", label: "They must increase speed override" },
    ],
    correct: "A",
    explain:
      "If the timer never starts (or is reset after start), the value you capture will be 0 or near 0.",
  },

  // 19 — INDIRECT ADDRESSING (advanced but useful)
  {
    type: "bullets",
    hud: "Advanced",
    title: "Advanced: indirect register addressing (powerful)",
    lead: "This lets a register choose which register to read/write.",
    bullets: [
      "Examples (concept):",
      "```text\nR[R[4]] = R[1] + 1\nR[1]    = RI[3]\nR[R[4]] = AI[R[1]]\n```",
      "Use carefully: it’s powerful, but debugging is harder",
      "Lab advice: start with direct `R[10]`, `R[11]` first — then go indirect if needed",
    ],
  },

  // 20 — POSITION REGISTERS (PR)
  {
    type: "bullets",
    hud: "PR",
    title: "Position Registers (PR[n]) — what they store",
    bullets: [
      "A **Position Register** holds a robot pose",
      "Typical data: **X, Y, Z, W, P, R** (Cartesian) or joint values",
      "Common sources you can load from:",
      "`LPOS` (current Cartesian position) • `JPOS` (current joint position)",
      "Controllers commonly provide up to **100 PRs**: `PR[1] … PR[100]`",
    ],
  },

  // 21 — PR INSTRUCTIONS + LIMITATION
  {
    type: "bullets",
    hud: "PR",
    title: "PR instructions (important limitation)",
    lead: "PR format is similar to R instructions, but PR math is more limited in Lab 7.",
    bullets: [
      "Load position:",
      "```text\nPR[1] = LPOS\n```",
      "PR arithmetic (Lab note): **addition and subtraction** are used with PRs",
      "Example from lab manual:",
      "```text\nPR[3] = PR[3] + LPOS\n```",
    ],
  },

  // 22 — QUIZ (PR vs R)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: choose R or PR",
    question:
      "You need to store a number of completed cycles (0,1,2,3...). Which register type is correct?",
    options: [
      { choice: "A", label: "PR[n] (Position Register)" },
      { choice: "B", label: "PL[n] (Pallet Register)" },
      { choice: "C", label: "R[n] (Data Register)" },
      { choice: "D", label: "UFRAME[n]" },
    ],
    correct: "C",
    explain:
      "Cycle counts are numbers → Data Register `R[n]`. PR is for position/pose data.",
  },

  // 23 — LAB 7 CHECKLIST
  {
    type: "bullets",
    hud: "Checklist",
    title: "Lab 7 checklist (what you must demonstrate)",
    bullets: [
      "Set Double Display: program left, registers right",
      "Insert at least one arithmetic line using **R[ ]**",
      "Demonstrate a loop or IF using an **R** value",
      "Capture **TIMER[1]** into `R[10]` and verify it changes",
      "Bonus practice: create a **PR** line (load `LPOS`, then do a PR add/sub)",
    ],
  },

  // 24 — WRAP-UP
  {
    type: "bullets",
    hud: "Wrap",
    title: "Wrap-up (fast self-check)",
    bullets: [
      "What is `R[n]` used for?",
      "Why can `R[3] + R[4] * R[5]` fail on one line?",
      "When do you use **MOD** vs **DIV**?",
      "What does `PR[1] = LPOS` do?",
      "What line captures time into a register?",
    ],
  },
];

export default slidesData;
