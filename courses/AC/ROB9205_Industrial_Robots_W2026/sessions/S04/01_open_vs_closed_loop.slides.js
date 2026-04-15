// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S04/01_open_vs_closed_loop.slides.js
// Topic — Open-loop vs Closed-loop Control Systems (rebuilt in Ali's deck format)
// Local media required:
// ./media/open_loop.png
// ./media/close_loop.png
// ./media/ctrl_types.png

export const topicMeta = {
  id: "01_open_vs_closed_loop",
  title: "Open-loop vs Closed-loop Control Systems",
  duration: 45,
};

const A = (relPath) => new URL(relPath, import.meta.url).href;

const slidesData = [
  // 1 — TITLE (updated for your course, but keeps the original intent)
  {
    type: "title",
    hud: "Topic",
    title: "Control Systems",
    subtitle: "Open-loop vs Closed-loop Control Systems!",
    meta: "Instructor: Ali Karimzadeh • Email: karimza@algonquincollege.com • Office Hours: By appointment",
    notes:
      "Welcome students and set expectations: this topic is control basics. We’ll connect it directly to robotics: robot servos are closed-loop; some timed processes are open-loop. Tell them: if they understand feedback, they understand why robots are accurate.",
  },

  // 2 — COVER / CONTEXT SLIDE (original deck had a robot-factory image here)
  {
    type: "bullets",
    hud: "Context",
    title: "Industrial Robots are **Control Systems**",
    lead: "Everything we do with robots depends on how the controller makes decisions: **open-loop** or **closed-loop**.",
    bullets: [
      "In industry, **accuracy** and **repeatability** usually require **feedback**.",
      "Many everyday machines are **open-loop** because they are **simpler** and **cheaper**.",
      "Today: define both systems, study diagrams, and compare **advantages / disadvantages**.",
    ],
    notes:
      "Original slide had an automotive robot-line photo. Tell students: robots in factories rely on closed-loop servo control. Then transition: let’s define open vs closed loop formally.",
  },

  // 3 — OPEN AND CLOSED LOOP (intro paragraph preserved, but broken into bullets)
  {
    type: "bullets",
    hud: "Intro",
    title: "**OPEN AND CLOSED LOOP**",
    lead: "A control system can be described simply as: **input → control system → output**.",
    bullets: [
      "Control systems are increasingly important in modern civilization and technology.",
      "Even if a real system is complex, we can model it as:",
      "• **Input (objective)** → **Control system** → **Output (result)**",
      "Many day-to-day activities are affected by some type of control system.",
      "There are **two main branches** of control systems:",
    ],
    notes:
      "Explain: we simplify reality with block diagrams. Tell them we’ll use boxes/arrows all semester. Ask: ‘What is an input and output for an air conditioner?’",
  },

  // 4 — CLASSIFICATION (with ctrl_types.png) — keep YOUR changes
  {
    type: "two-col",
    hud: "Classification",
    title: "What you can expect from this course",
    left: {
      bullets: [
        "**Open-loop systems** and **Closed-loop systems**",
        "This is the high-level **classification** we will use today.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/Gemini_Generated_ctrl_types.png"),
        source: "Gemini Generated",
      },
    },
    notes:
      "Explain: this is the tree. Everything today is under open-loop or closed-loop. Ask: ‘Can you think of one example for each?’ Let them answer before showing the formal diagrams.",
  },

  // 5 — OPEN LOOP SYSTEMS (definition + diagram) — break into bullets, bold key ideas
  {
    type: "two-col",
    hud: "Open-loop",
    title: "**OPEN LOOP SYSTEMS**",
    left: {
      lead: "Key idea: **no self-correction**.",
      bullets: [
        "A control system that **cannot adjust itself** to changes is an **open-loop** control system.",
        "In general, many **manual control systems** behave like open-loop systems.",
        "The block diagram of an open-loop control system is shown here.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/open_loop.png"),
        source: "",
      },
    },
    notes:
      "Point to the diagram: r(t) → controller → plant → c(t). Emphasize: **NO feedback arrow** returning. That’s the defining feature. Then connect: a timer-based device is open-loop.",
  },

  // 6 — OPEN LOOP SIGNAL DEFINITIONS (break long paragraph into bullets)
  {
    type: "bullets",
    hud: "Open-loop",
    title: "Open-loop: Signals and Meaning",
    lead: "In the open-loop diagram, the signals mean:",
    bullets: [
      "**r(t)** = input (reference) signal.",
      "**u(t)** = control / actuating signal (what controller sends to plant).",
      "**c(t)** = output signal.",
      "For a **constant input**, the output remains unaltered (no automatic correction).",
      "If there is a discrepancy, an **operator must manually** change the input.",
      "Open-loop is suited when:",
      "• There is **tolerance** for fluctuation, and",
      "• Parameter variation can be handled regardless of environmental conditions.",
    ],
    notes:
      "Explain slowly: If something goes wrong, the system does not correct itself. A human must change the input. Ask: ‘Why might we accept this?’ Answer: cheaper/simpler; output may be hard to measure.",
  },

  // 7 — PRACTICAL EXAMPLES OF OPEN LOOP (set 1 preserved, highlight key phrases)
  {
    type: "bullets",
    hud: "Examples",
    title: "PRACTICAL EXAMPLES OF **OPEN LOOP** CONTROL SYSTEM",
    lead: "Open-loop = it runs **regardless of output quality**.",
    bullets: [
      "**Electric Hand Drier**: hot air comes out regardless of **how dry** your hand is.",
      "**Automatic Washing Machine**: runs for preset time regardless of whether washing is complete.",
      "**Bread Toaster**: runs for adjusted time regardless of whether toasting is complete.",
    ],
    notes:
      "Turn each example into a quick discussion: ‘What is missing?’ **Feedback**. Dryer does not measure dryness; washer doesn’t measure cleanliness; toaster doesn’t measure toast color.",
  },

  // 8 — PRACTICAL EXAMPLES OF OPEN LOOP (set 2 preserved, highlight key phrases)
  {
    type: "bullets",
    hud: "Examples",
    title: "PRACTICAL EXAMPLES OF **OPEN LOOP** CONTROL SYSTEM",
    bullets: [
      "**Automatic Tea/Coffee Maker**: functions for pre-adjusted time only.",
      "**Timer Based Clothes Drier**: dries for pre-adjusted time regardless of dryness level.",
      "**Light Switch**: lamp glows whenever switch is on regardless of whether light is required.",
      "**Stereo Volume**: adjusted manually regardless of output volume level.",
    ],
    notes:
      "Ask students: which of these could be upgraded into closed-loop? Example: dryer with humidity sensor; light with brightness sensor; stereo with automatic level control (in some systems).",
  },

  // 9 — OPEN LOOP ADV / DISADV (make key words bold)
  {
    type: "two-col",
    hud: "Open-loop",
    title: "Open-loop: **Advantages** vs **Disadvantages**",
    left: {
      lead: "**Advantages of Open Loop Control System**",
      bullets: [
        "a) **Simple** in construction and design",
        "b) **Economical**",
        "c) **Easy** to maintain",
        "d) Generally **stable**",
        "e) Convenient when output is **difficult to measure**",
      ],
    },
    right: {
      lead: "**Disadvantages of Open Loop Control System**",
      bullets: [
        "a) **Inaccurate**",
        "b) **Unreliable**",
        "c) Output changes cannot be **corrected automatically**",
      ],
    },
    notes:
      "Underline the tradeoff: simplicity vs accuracy. This sets up closed-loop: it improves accuracy but costs complexity.",
  },

  // 10 — CLOSED LOOP SYSTEMS (break the long paragraph into bullets; keep all content)
  {
    type: "two-col",
    hud: "Closed-loop",
    title: "**CLOSED LOOP SYSTEMS**",
    lead: "Key idea: **feedback** makes the system self-correcting.",
    left: {
      bullets: [
        "A system that can respond to changes and make corrections by itself is a **closed-loop** control system.",
        "Main difference vs open-loop: presence of **feedback action**.",
        "**Signals (as used in the original explanation):**",
        "**r(t)** = input signal (reference).",
        "**e(t)** = error signal (from comparator/error detector).",
        "**u(t)** or **m(t)** = control/manipulated signal (from controller).",
        "**b(t)** = feedback signal.",
        "**c(t)** = controlled output.",
      ],
    },
    right: {
      bullets: [
        "**How it works:**",
        "Output is fed back to a **comparator (error detector)**.",
        "Comparator compares output with reference input **r(t)** to produce **e(t)**.",
        "Controller adjusts input (e.g., air conditioner control signal **u(t)**) based on the error.",
        "This continues until the error is **nullified** (approximately zero).",
        "Both **manual** and **automatic** controls can be implemented in closed-loop systems.",
      ],
    },
    notes:
      "Don’t rush this slide. Explain the ‘error’ idea: desired - actual. Then: controller changes input to reduce error. Use the air conditioner example verbally: setpoint vs measured temperature.",
  },

  // 11 — CLOSED LOOP DIAGRAM (with close_loop.png) — break bullets + bold key words
  {
    type: "two-col",
    hud: "Closed-loop",
    title: "**CLOSED LOOP SYSTEMS** (Block Diagram)",
    left: {
      lead: "Closed-loop = **measure output** + **compare** + **correct**.",
      bullets: [
        "Closed-loop differs from open-loop by the presence of **feedback**.",
        "Key signals:",
        "• **r(t)** reference input",
        "• **e(t)** error signal",
        "• **u(t)/m(t)** control/manipulated signal",
        "• **c(t)** output",
        "• **b(t)** feedback signal",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/close_loop.png"),
        source: "",
      },
    },
    notes:
      "Walk through the loop: r(t) enters comparator; comparator outputs e(t); controller produces u(t); plant produces c(t); feedback produces b(t); b(t) goes back to comparator. Then ask: ‘Where is the decision-making happening?’ At the controller based on error.",
  },

  // 12 — PRACTICAL EXAMPLES OF CLOSED LOOP (preserved, highlight measurement)
  {
    type: "bullets",
    hud: "Examples",
    title: "PRACTICAL EXAMPLES OF **CLOSED LOOP** CONTROL SYSTEM",
    lead: "Closed-loop = it uses a **measurement** of output to correct itself.",
    bullets: [
      "1) **Automatic Electric Iron**: heating controlled by output **temperature** of the iron.",
      "2) **Servo Voltage Stabilizer**: operates depending upon output **voltage**.",
      "3) **Water Level Controller**: input water controlled by reservoir **water level**.",
      "4) **Missile + Radar Tracking**: direction controlled by comparing target and missile position.",
      "5) **Air Conditioner**: functions depending upon room **temperature**.",
      "6) **Car Cooling System**: operates depending upon the temperature it controls.",
    ],
    notes:
      "For each example, ask: what is the sensor/measurement? Iron: thermostat; stabilizer: voltage measurement; tank: level sensor; AC: thermostat; car cooling: temperature sensor. Keep it simple: closed-loop = measure output and adjust.",
  },

  // 13 — CLOSED LOOP ADVANTAGES (bold key terms)
  {
    type: "bullets",
    hud: "Closed-loop",
    title: "Advantages of **CLOSED LOOP** Control System",
    bullets: [
      "a) More **accurate** even in the presence of **non-linearity**.",
      "b) Errors are corrected due to feedback → **high accuracy**. Bandwidth range is **large**.",
      "c) Facilitates **automation**.",
      "d) Sensitivity can be made small to make system more **stable**.",
      "e) Less affected by **noise**.",
    ],
    notes:
      "Explain in plain terms: accuracy improves because errors get corrected. Automation becomes possible because the system can self-correct. Mention: sensors bring information, and information enables control.",
  },

  // 14 — CLOSED LOOP DISADVANTAGES (bold key terms)
  {
    type: "bullets",
    hud: "Closed-loop",
    title: "Disadvantages of **CLOSED LOOP** Control System",
    bullets: [
      "a) **Costlier**",
      "b) More **complicated** to design",
      "c) Requires more **maintenance**",
      "d) Feedback can lead to **oscillatory response**",
      "e) Overall gain is **reduced** due to feedback",
      "f) **Stability** is a major problem → more care is needed for a stable design",
    ],
    notes:
      "Key teaching: feedback is powerful but can cause oscillations if poorly designed. Relate to a thermostat that turns on/off too aggressively causing temperature swings (simple intuition).",
  },

  // 15 — COMPARISON (two-col as requested)
  {
    type: "two-col",
    hud: "Compare",
    title: "**Open-loop vs Closed-loop** (Comparison)",
    left: {
      lead: "**Open-loop control system**",
      bullets: [
        "**1.** Inaccurate",
        "**2.** Unreliable",
        "**3.** Stable",
        "**4.** Bandwidth is small",
        "**5.** System is affected by noise",
        "**6.** Cheap",
        "**7.** Simple in construction",
        "**8.** Requires less maintenance",
        "**9.** Overall gain is high",
      ],
    },
    right: {
      lead: "**Closed-loop control system**",
      bullets: [
        "**1.** Accurate",
        "**2.** Reliable",
        "**3.** Unstable (can be stabilized using feedback or by reducing sensitivity)",
        "**4.** Bandwidth is large",
        "**5.** System is less affected by noise",
        "**6.** Costly",
        "**7.** Complex construction (more components)",
        "**8.** Requires more maintenance",
        "**9.** Overall gain is reduced due to feedback",
      ],
    },
    notes:
      "Tell them: this is the tradeoff summary slide. If they remember only one thing: open-loop is simple/cheap but inaccurate; closed-loop is accurate/robust but complex and must be designed for stability.",
  },

  // 16 — MCQ: IDENTIFY FEEDBACK
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: Feedback",
    question:
      "Which feature **must** exist for a system to be called **closed-loop**?",
    options: [
      { choice: "A", label: "A controller block" },
      { choice: "B", label: "A plant block" },
      { choice: "C", label: "A feedback path that measures the output" },
      { choice: "D", label: "A timer" },
    ],
    correct: "C",
    explain:
      "Closed-loop control requires **feedback**: output is measured and compared to the reference to form an error signal.",
    notes:
      "After they answer, point to the closed-loop diagram: show the feedback arrow. Then connect to robots: encoders measure position continuously (feedback).",
  },

  // 17 — MCQ: OPEN OR CLOSED
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: Open-loop or Closed-loop?",
    question:
      "A bread toaster runs for a fixed time and stops, regardless of the toast color. What type of control is this?",
    options: [
      { choice: "A", label: "Open-loop" },
      { choice: "B", label: "Closed-loop" },
      { choice: "C", label: "Both" },
      { choice: "D", label: "Neither" },
    ],
    correct: "A",
    explain:
      "This is **open-loop** because the toaster does not measure the output (toast color) and does not correct itself.",
    notes:
      "Ask follow-up: what sensor would make it closed-loop? Answer: color sensor / temperature sensor / smoke sensor, etc.",
  },

  // 18 — MCQ: ROBOT CONNECTION
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: Robots",
    question:
      "Industrial robots typically use encoders to measure joint position and correct motion in real time. This is an example of:",
    options: [
      { choice: "A", label: "Open-loop control" },
      { choice: "B", label: "Closed-loop control" },
      { choice: "C", label: "No control system" },
      { choice: "D", label: "Only manual control" },
    ],
    correct: "B",
    explain:
      "Encoders provide **feedback**, so the controller can correct errors continuously → **closed-loop**.",
    notes:
      "Bridge to next topics: servo motors + encoders + controller = closed-loop. This is why robots can repeat positions accurately.",
  },

  // 19 — QUESTIONS
  {
    type: "bullets",
    hud: "Q&A",
    title: "Questions?",
    bullets: [
      "Ask about anything unclear: **signals**, **diagrams**, **examples**, or the **comparison**.",
    ],
    notes:
      "Open the floor. If quiet, ask: ‘Give me one open-loop example from your daily life’ and ‘Give me one closed-loop example.’",
  },
];

export default slidesData;
