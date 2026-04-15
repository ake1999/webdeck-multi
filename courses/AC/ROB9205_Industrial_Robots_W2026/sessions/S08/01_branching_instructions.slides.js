// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S08/01_branching_instructions_lab8.slides.js
// Session S08 — FANUC Branching Instructions + Lab 8 (Conditional Branching)
// Sources: "Branching Instructions" (Kinchit Patel) + "Lab 8: Conditional Branch instructions" (Lab Manual)
// NO IMAGES — all code shown in code boxes.

export const topicMeta = {
  id: "01_branching_instructions",
  title: "Branching Instructions (FANUC) + Lab 8: Conditional Branching",
  duration: 120,
};

const slidesData = [
  // 0 — TITLE
  {
    type: "title",
    hud: "Lab 8",
    title: "Branching Instructions (FANUC TP)",
    subtitle: "Unconditional + Conditional branching • WAIT • IF/SELECT • FOR/ENDFOR",
    meta: "Instructor: Ali Karimzadeh • ROB9205 Industrial Robots",
    notes:
      "Goal: students can read branching code confidently and implement Lab 8 tasks safely.",
  },

  // 1 — ROADMAP
  {
    type: "bullets",
    hud: "Roadmap",
    title: "Today",
    lead: "Branching = control program flow (what runs next).",
    bullets: [
      "Why branching matters in robotics",
      "Two types: **Unconditional** vs **Conditional**",
      "Unconditional: `JMP/LBL`, `CALL`, `WAIT (time)`",
      "Conditional: `WAIT (condition)`, `IF`, `SELECT`, `FOR/ENDFOR`",
      "Lab 8 workflow: simulate DI, test WAIT, then IF/SELECT, then FOR loops",
    ],
  },

  // 2 — WHAT IS BRANCHING
  {
    type: "bullets",
    hud: "Concept",
    title: "What is branching?",
    bullets: [
      "Branching lets you execute **different sequences** based on **conditions**",
      "It uses instructions like `IF`, `SELECT`, `ELSE` to control program flow",
      "In real cells, branching is used for:",
      "• part present / no part  • choose bin  • retry logic  • safety interlocks",
    ],
  },

  // 3 — TWO CATEGORIES
  {
    type: "bullets",
    hud: "Map",
    title: "Two categories of branching",
    bullets: [
      "**Unconditional branching** (always changes flow)",
      "• `JMP/LBL`  • `CALL`  • `WAIT (time delay)`",
      "",
      "**Conditional branching** (changes flow only if condition is satisfied)",
      "• `WAIT (condition)`  • `IF`  • `SELECT`  • `FOR/ENDFOR`",
    ],
  },

  // 4 — JMP/LBL CONCEPT
  {
    type: "bullets",
    hud: "Unconditional",
    title: "JMP / LBL (jump inside the same program)",
    bullets: [
      "Use `LBL[n]` to mark a location",
      "Use `JMP LBL[n]` to jump to that location",
      "**Important:** `JMP/LBL` can jump **only within the same program** (not to another program)",
      "Common use: loops, retry blocks, skip sections",
    ],
  },

  // 5 — JMP/LBL EXAMPLE (from lecture)
  {
    type: "bullets",
    hud: "Unconditional",
    title: "Example: loop until counter reaches 10",
    lead: "This increments `R[1]` and loops until `R[1]` is no longer < 10.",
    bullets: [
      "```text\nLBL[1]\nR[1] = R[1] + 1\nIF R[1] < 10 THEN\n  JMP LBL[1]\nENDIF\n```",
      "Tip: initialize `R[1]=0` before the loop if you want exactly 10 iterations",
    ],
  },

  // 6 — QUIZ: JMP LIMITATION
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: JMP/LBL limitation",
    question: "You want to jump from Program A into Program B using `JMP`. What is correct?",
    options: [
      { choice: "A", label: "Valid — `JMP` can jump to any program" },
      { choice: "B", label: "Invalid — use `CALL` to run another program" },
      { choice: "C", label: "Valid only if Program B starts with `LBL[1]`" },
      { choice: "D", label: "Valid only if you use `JMP LBL[999]`" },
    ],
    correct: "B",
    explain: "`JMP/LBL` is for flow inside the **same TP program**. Use `CALL` for other programs/macros.",
  },

  // 7 — CALL CONCEPT
  {
    type: "bullets",
    hud: "Unconditional",
    title: "CALL (run another TP program or macro)",
    bullets: [
      "`CALL` runs another program/subroutine from the current program",
      "You can call **TP programs** and **macros** (ex: a home routine)",
      "**Best practice:** avoid deep nesting (programs calling programs calling programs)",
      "Reason: nested calls make troubleshooting and tracking flow harder",
    ],
  },

  // 8 — CALL EXAMPLE (from lecture)
  {
    type: "bullets",
    hud: "Unconditional",
    title: "Example: call a home routine if condition is met",
    bullets: [
      "```text\nR[3] = R[1] + R[2]\nIF R[3] < 10 THEN\n  CALL ROBOT_HOME\nENDIF\n```",
      "Good use: go home on safety condition, reset cycle, or recovery step",
    ],
  },

  // 9 — WAIT (TIME) CONCEPT
  {
    type: "bullets",
    hud: "WAIT",
    title: "WAIT (time-specified delay)",
    lead: "Stops program execution for a specified time (seconds).",
    bullets: [
      "Two common forms:",
      "```text\nWAIT 10.5 sec\nWAIT R[1]\n```",
      "Use when you need time for: clamp settle, air blow-off, sensor stabilization",
      "Don’t overuse WAIT: it can hide real problems (like missing sensors)",
    ],
  },

  // 10 — WAIT (TIME) EXAMPLE (from lecture)
  {
    type: "bullets",
    hud: "WAIT",
    title: "Example: delay between motions",
    bullets: [
      "```text\nJ P[1] 100% FINE\nL P[2] 100mm/sec FINE\nL P[3] 100mm/sec FINE\nWAIT 0.5 sec\nL P[2] 100mm/sec FINE\n```",
      "Time delay is unconditional: it always waits the same amount (or R value)",
    ],
  },

  // 11 — CONDITIONAL WAIT CONCEPT
  {
    type: "bullets",
    hud: "WAIT",
    title: "WAIT (condition): pause until something becomes true",
    lead: "A conditional wait pauses until a condition is satisfied.",
    bullets: [
      "Example (I/O wait):",
      "```text\nWAIT DI[101] = ON\n```",
      "Example (register wait):",
      "```text\nWAIT R[2] > 1\n```",
      "You can also add timeout handling using `TIMEOUT, LBL[n]` (Lab 8)",
    ],
  },

  // 12 — CONDITIONAL WAIT + TIMEOUT
  {
    type: "bullets",
    hud: "WAIT",
    title: "Conditional WAIT with timeout handling",
    lead: "If the condition is not satisfied before the system wait-timeout, branch to a label.",
    bullets: [
      "```text\nWAIT DI[2] = OFF, TIMEOUT, LBL[1]\n...\nLBL[1]\n! handle timeout (alarm / retry / safe stop)\n```",
      "If you omit the processing part, it can wait indefinitely",
      "Timeout duration is configured in the system setting (Lab manual notes this)",
    ],
  },

  // 13 — EDGE DETECTION (On+ / Off-)
  {
    type: "bullets",
    hud: "WAIT",
    title: "WAIT edge conditions: `On+` and `Off-`",
    lead: "Edge wait is not the same as waiting for ON/OFF level.",
    bullets: [
      "**On+ (rising edge):** condition becomes true when signal changes OFF → ON",
      "**Off- (falling edge):** condition becomes true when signal changes ON → OFF",
      "Use edge waits when you need to detect a **transition** (a moment), not a steady state",
    ],
  },

  // 14 — QUIZ: WAIT LEVEL VS EDGE
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: level vs edge WAIT",
    question: "You want the robot to continue only when a sensor changes from OFF to ON (a rising edge). Best WAIT form?",
    options: [
      { choice: "A", label: "`WAIT DI[101] = ON`" },
      { choice: "B", label: "`WAIT DI[101] On+`" },
      { choice: "C", label: "`WAIT 0.5 sec`" },
      { choice: "D", label: "`WAIT DI[101] <> ON`" },
    ],
    correct: "B",
    explain: "`On+` detects the transition OFF→ON. `= ON` is a level condition (could already be ON).",
  },

  // 15 — LAB 8: SIMULATE DIGITAL INPUTS
  {
    type: "bullets",
    hud: "Lab 8",
    title: "Lab 8: simulate digital inputs (DI) on the pendant",
    lead: "You will use DI simulation to test WAIT and IF logic without wiring.",
    bullets: [
      "```text\n1) SHIFT + DISPLAY  → Double Display\n2) IO  (bottom panel)\n3) F1(TYPE) → select Digital\n4) F3 → switch Input/Output\n5) DI/DO start around 101\n6) Go to DI[101], highlight 'U'\n7) F4 → Simulate\n8) Use ON/OFF keys to toggle\n```",
      "Now you can test: `WAIT DI[101] = ON` safely",
    ],
  },

  // 16 — SAMPLE LAB WAIT PROGRAM
  {
    type: "bullets",
    hud: "Lab 8",
    title: "Sample Lab 8 program (WAIT on DI then move)",
    bullets: [
      "```text\n1: WAIT DI[101] = ON\n2: L P[1] 100mm/sec FINE\n3: L P[2] 100mm/sec FINE\n4: L P[3] 100mm/sec FINE\n5: L P[4] 100mm/sec FINE\n```",
      "Run it twice: once with DI OFF (robot waits), then toggle DI ON (robot proceeds)",
    ],
  },

  // 17 — IF CONCEPT
  {
    type: "bullets",
    hud: "IF",
    title: "IF instruction (conditional compare)",
    bullets: [
      "`IF` executes processing **only if** the condition is true",
      "Two main sources of conditions:",
      "• Register compare: `IF R[i] <value> ...`",
      "• I/O compare: `IF DI[i] = ON ...`",
      "Processing is commonly: `JMP LBL[n]` or `CALL PROGRAM`",
    ],
  },

  // 18 — IF EXAMPLE (from lecture)
  {
    type: "bullets",
    hud: "IF",
    title: "Example: run different actions based on registers",
    bullets: [
      "```text\nIF R[1] > 10 THEN\n  CALL NEW_BIN\nENDIF\n\nIF R[2] < 5 THEN\n  CALL PICK\nENDIF\n```",
      "Note: these are two independent IFs (both could run if both are true)",
    ],
  },

  // 19 — REAL NUMBER COMPARE CAUTION
  {
    type: "bullets",
    hud: "IF",
    title: "Caution: comparing real values with `=`",
    lead: "If the register stores a real/decimal, equality can be unreliable due to rounding.",
    bullets: [
      "Avoid: `IF R[1] = 1.5, ...` for real values",
      "Prefer ranges, for example:",
      "```text\nIF R[1] > 1.49 AND R[1] < 1.51, CALL OK\n```",
      "Or compare against integer values when possible",
    ],
  },

  // 20 — AND / OR RULES
  {
    type: "bullets",
    hud: "Logic",
    title: "Multiple conditions with AND / OR",
    bullets: [
      "You can combine multiple conditions on one line using:",
      "```text\nIF <cond1> AND <cond2>, JMP LBL[3]\nIF <cond1> OR  <cond2>, JMP LBL[3]\n```",
      "Rules from the lab manual:",
      "• up to **five** conditions can be combined on a single line",
      "• mixing AND and OR together is **prohibited** (readability + editing safety)",
    ],
  },

  // 21 — QUIZ: AND/OR MIXING
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: AND/OR mixing",
    question: "Which line is NOT allowed by the controller rules described in the lab manual?",
    options: [
      { choice: "A", label: "`IF DI[101]=ON AND R[1]>5, CALL SUB1`" },
      { choice: "B", label: "`IF R[1]>5 OR R[2]<3, JMP LBL[2]`" },
      { choice: "C", label: "`IF R[1]>5 AND R[2]<3 OR DI[101]=ON, CALL SUB2`" },
      { choice: "D", label: "`IF DI[101]=OFF OR DI[102]=OFF, JMP LBL[9]`" },
    ],
    correct: "C",
    explain:
      "The manual prohibits using AND and OR in combination on the same instruction line. Split into multiple IF lines.",
  },

  // 22 — SELECT CONCEPT
  {
    type: "bullets",
    hud: "SELECT",
    title: "SELECT instruction (switch/case for registers)",
    lead: "SELECT chooses one action based on the value of a register.",
    bullets: [
      "It compares `R[i]` to multiple values and executes the first matching action",
      "Structure:",
      "```text\nSELECT R[i] = 1, <action>\n          = 2, <action>\n          = 3, <action>\n     ELSE, <action>\nENDSELECT\n```",
      "Actions are typically `CALL` or `JMP LBL`",
    ],
  },

  // 23 — SELECT EXAMPLE (from lecture)
  {
    type: "bullets",
    hud: "SELECT",
    title: "Example: choose a bin program based on R[1]",
    bullets: [
      "```text\nSELECT R[1] = 1, CALL BIN_BLUE\n          = 2, CALL BIN_RED\n          = 3, CALL BIN_GREEN\n     ELSE, CALL ROBOT_HOME\nENDSELECT\n```",
      "Use SELECT when you have many mutually-exclusive cases (cleaner than many IF lines)",
    ],
  },

  // 24 — SELECT CAUTION (multiple matches)
  {
    type: "bullets",
    hud: "SELECT",
    title: "Important SELECT caution: first match wins",
    lead: "If more than one line could match, only the first matching line executes.",
    bullets: [
      "Example scenario:",
      "```text\nR[1] = 2\nSELECT R[1] = 1, CALL PROG1\n          = 2, CALL PROG2\n          = 3, CALL PROG3\n          = 2, CALL PROG4\n     ELSE, CALL SUB2\nENDSELECT\n```",
      "Result: `PROG2` runs; `PROG4` does NOT run (even though it matches too)",
    ],
  },

  // 25 — QUIZ: SELECT FIRST MATCH
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: SELECT behavior",
    question:
      "In a SELECT block, `R[1]=2` and you have two cases for `=2`. What happens?",
    options: [
      { choice: "A", label: "Both actions run (top to bottom)" },
      { choice: "B", label: "Only the first matching case runs" },
      { choice: "C", label: "The controller throws an error and stops" },
      { choice: "D", label: "Only the last matching case runs" },
    ],
    correct: "B",
    explain:
      "SELECT executes the first matching statement and skips the rest, even if other cases match.",
  },

  // 26 — FOR/ENDFOR CONCEPT
  {
    type: "bullets",
    hud: "FOR",
    title: "FOR / ENDFOR (repeat a block a fixed number of times)",
    bullets: [
      "FOR repeats instructions between `FOR` and `ENDFOR` a specified number of times",
      "Use cases: repeat same sequence, visit series of points, perform repeated operations",
      "Two directions:",
      "• `TO` (count up) • `DOWNTO` (count down)",
      "Loop counter is usually a register: `R[i]`",
    ],
  },

  // 27 — FOR SYNTAX (TO / DOWNTO)
  {
    type: "bullets",
    hud: "FOR",
    title: "FOR syntax (TO and DOWNTO)",
    bullets: [
      "Count up:",
      "```text\nFOR R[1] = 1 TO 5\n  ...\nENDFOR\n```",
      "Count down:",
      "```text\nFOR R[2] = 5 DOWNTO 1\n  ...\nENDFOR\n```",
      "Initial/target can be Constant, `R[i]`, or `AR[i]` (argument register)",
    ],
  },

  // 28 — FOR EXECUTION RULES (important)
  {
    type: "bullets",
    hud: "FOR",
    title: "When does a FOR loop run (important rules)?",
    bullets: [
      "When `TO` is used: initial value must be **≤** target value",
      "When `DOWNTO` is used: initial value must be **≥** target value",
      "If the condition is not satisfied, the loop runs **0 times** (skips to the line after ENDFOR)",
      "`FOR` statement itself executes once to initialize the loop counter",
    ],
  },

  // 29 — FOR/ENDFOR COUNTER UPDATE
  {
    type: "bullets",
    hud: "FOR",
    title: "What ENDFOR does each cycle",
    bullets: [
      "If `TO` is used: loop counter is **incremented** each iteration",
      "If `DOWNTO` is used: loop counter is **decremented** each iteration",
      "Loop repeats while:",
      "• `TO`: counter < target",
      "• `DOWNTO`: counter > target",
      "Then it exits after the counter reaches the target",
    ],
  },

  // 30 — FOR EXAMPLE (simple)
  {
    type: "bullets",
    hud: "FOR",
    title: "Example: repeat a move sequence 5 times",
    bullets: [
      "```text\nFOR R[1] = 1 TO 5\n  L P[1] 100mm/sec CNT100\n  L P[2] 100mm/sec FINE\n  L P[3] 100mm/sec CNT100\nENDFOR\nL P[4] 100mm/sec CNT100\n```",
      "Note from manual: internal loop delay exists → WAIT is usually not required to “slow down” the loop.",
    ],
  },

  // 31 — FOR/ENDFOR AUTOMATIC PAIRING + ALARM
  {
    type: "bullets",
    hud: "FOR",
    title: "FOR/ENDFOR pairing + common alarm",
    bullets: [
      "FANUC automatically combines the closest FOR with the closest ENDFOR",
      "If you have a FOR without a matching ENDFOR → execution alarm",
      "Example alarm name from manual:",
      "```text\nINTP-670 Need ENDFOR for FOR in line 1\n```",
      "Always ensure number of FOR statements equals number of ENDFOR statements",
    ],
  },

  // 32 — NESTED LOOPS + LIMITS
  {
    type: "bullets",
    hud: "FOR",
    title: "Nested loops (FOR inside FOR)",
    bullets: [
      "You can teach a FOR/ENDFOR inside another FOR/ENDFOR",
      "Up to **10 nested loops** are supported (more can raise an execution alarm)",
      "Important safety note from manual:",
      "**Do not use the same register as loop counters inside the same nested loop**",
    ],
  },

  // 33 — NESTED LOOP EXAMPLE (split)
  {
    type: "bullets",
    hud: "FOR",
    title: "Nested loops example (2 loops)",
    bullets: [
      "```text\nFOR R[1] = 1 TO 5\n  L P[1] 100mm/sec CNT100\n  FOR R[2] = 5 DOWNTO 1\n    L P[2] 100mm/sec FINE\n    L P[3] 100mm/sec CNT100\n  ENDFOR\n  L P[4] 100mm/sec CNT100\nENDFOR\n```",
      "Closest pairing rule: inner FOR pairs with inner ENDFOR first",
    ],
  },

  // 34 — QUIZ: FOR 0 ITERATIONS
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: iteration loop",
    question: "What happens if you run: `FOR R[1] = 10 TO 1` (TO but initial > target)?",
    options: [
      { choice: "A", label: "It runs forever (infinite loop)" },
      { choice: "B", label: "It runs 10 times" },
      { choice: "C", label: "It runs 0 times and skips to after ENDFOR" },
      { choice: "D", label: "It throws an alarm immediately: wrong direction" },
    ],
    correct: "C",
    explain:
      "Rule: with TO, initial must be ≤ target. If not, the loop is not executed and control jumps past ENDFOR.",
  },

  // 35 — LAB 8 PRACTICAL FLOW (step-by-step)
  {
    type: "bullets",
    hud: "Lab 8",
    title: "Lab 8 workflow (recommended order)",
    bullets: [
      "```text\n1) Create/open a program\n2) Add WAIT (time) and test\n3) Add WAIT (DI condition) and test with DI simulation\n4) Add IF compare (register + I/O)\n5) Add SELECT to choose different branches\n6) Add FOR/ENDFOR to repeat a sequence\n```",
      "Do one feature at a time → test → then add the next feature",
    ],
  },

  // 36 — INSERT INSTRUCTIONS (menu reminder)
  {
    type: "bullets",
    hud: "Pendant",
    title: "Where are these instructions on the pendant?",
    bullets: [
      "General flow:",
      "```text\nNEXT → INST → (category)\n```",
      "Categories you will use today:",
      "```text\nWAIT\nIF/SELECT\nFOR/ENDFOR\nJMP/LBL\nCALL\n```",
      "Use Double Display so you can watch registers and I/O while editing/running",
    ],
  },

  // 37 — DESIGN GUIDELINE (good programming hygiene)
  {
    type: "bullets",
    hud: "Best Practice",
    title: "Best practices (keep your program readable)",
    bullets: [
      "Prefer **SELECT** over many IFs when cases are mutually exclusive",
      "Avoid mixing AND/OR in one IF line → split into multiple IF lines",
      "Avoid deep CALL nesting (hard to debug)",
      "Use labels carefully: name/comment blocks so you remember what LBL means",
      "Always consider safety: WAIT for sensors if motion depends on them",
    ],
  },

  // 38 — WRAP-UP / SELF CHECK
  {
    type: "bullets",
    hud: "Wrap",
    title: "Quick self-check",
    bullets: [
      "Can you explain the difference between `WAIT 1.0 sec` and `WAIT DI[101]=ON`?",
      "Can you choose between JMP vs CALL correctly?",
      "Can you write an IF with 2 conditions using AND (no OR)?",
      "Do you understand why SELECT only runs the first matching case?",
      "Can you write a FOR loop with TO and one with DOWNTO?",
    ],
  },

  // 39 — END
  {
    type: "bullets",
    hud: "Q&A",
    title: "Questions?",
    lead: "Bring your pendant screen / code and we’ll debug it together.",
    bullets: [
      "Common issues:",
      "• WAIT condition never becomes true (DI simulation not enabled)",
      "• Missing ENDFOR alarm (INTP-670)",
      "• SELECT doesn’t run the second matching line (first-match behavior)",
      "• AND/OR mix rejected → split into multiple IF lines",
    ],
  },
];

export default slidesData;
