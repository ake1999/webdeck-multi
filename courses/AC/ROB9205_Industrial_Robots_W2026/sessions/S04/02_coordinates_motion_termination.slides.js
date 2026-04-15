// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S04/02_coordinates_motion_termination.slides.js
// Topic 2 — Coordinates → Motion Types → Program Line Anatomy → Termination (FINE vs CNT)

export const topicMeta = {
  id: "02_coordinates_motion_termination",
  title: "Coordinates, Motion Types, and Termination (FINE vs CNT)",
  duration: 75,
};

const A = (relPath) => new URL(relPath, import.meta.url).href;

const slidesData = [
  // 1 — TITLE
  {
    type: "title",
    hud: "Topic 02",
    title: "Coordinates + Motion Systems",
    subtitle: "How the robot interprets movement and how your code controls it",
    meta: "Instructor: Ali Karimzadeh • Email: karimza@algonquincollege.com",
    notes:
      "Tell students: this topic is the foundation of safe programming. If you choose the wrong coordinate system or motion type, the robot can move in a completely unexpected way.",
  },

  // 2 — WHY COORDINATE SYSTEMS MATTER (Big idea)
  {
    type: "bullets",
    hud: "Big Idea",
    title: "Why **Coordinate Systems** Matter",
    lead: "In FANUC robotics, coordinate systems are essential for defining how the robot understands and interacts with its environment.",
    bullets: [
      "They provide **reference frames** for positioning and orienting the robot’s tool (end effector).",
      "The **same jog key** can produce different motion depending on your selected coordinate system.",
      "Coordinate systems help you program motion **relative to the robot**, **relative to the cell**, or **relative to the tool**.",
      "Main coordinate systems we use today: **WORLD**, **JOINT**, **TOOL**.",
      "WORLD / Cartesian coordinates can be further classified as: **WORLD**, **USER**, **JGFRAME (JOG FRAME)**.",
    ],
    notes:
      "Emphasize: frame = an origin + 3 axes. The robot’s controller always needs a frame to interpret X/Y/Z and W/P/R. In lab, we will press COORD and show how the motion changes immediately.",
  },

  // 3 — VISUAL: MULTIPLE FRAMES (Online image requested)
  {
    type: "two-col",
    hud: "Frames",
    title: "One Robot, **Multiple Frames**",
    left: {
      lead: "This picture shows why frames exist: the same point can be described in different coordinate systems.",
      bullets: [
        "**WORLD** frame: fixed to the robot base / cell.",
        "**USER** frame: fixed to your table/fixture/workpiece.",
        "**TOOL** frame: fixed to the end effector (TCP).",
        "When you jog, you are telling FANUC: “Move the TCP along **this frame’s** X/Y/Z.”",
      ],
    },
    right: {
      media: {
        kind: "image",
        // User-provided online image
        src: "https://www.ipacv.ro/proiecte/robotstudio/textbooks/file/structura/struct28.gif",
        source:
          "Source: ipacv.ro RobotStudio textbook image (struct28.gif) • https://www.ipacv.ro/proiecte/robotstudio/textbooks/file/structura/struct28.gif",
      },
    },
    notes:
      "Explain: WORLD is like Earth coordinates in the cell; USER is like coordinates on the table; TOOL is like coordinates attached to the gripper. The robot can show the same pose using any of these frames.",
  },

  // 4 — JOINT COORDINATE SYSTEM
  {
    type: "two-col",
    hud: "COORD",
    title: "**JOINT** Coordinate System",
    left: {
      bullets: [
        "**Definition**: Each axis of the robot is controlled independently.",
        "**Use Case**: Direct control of individual robot joints.",
        "**Example**: Maintenance or calibration tasks.",
        "Robot position is shown using **joint angles** (J1…J6).",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/joint_coord_sys.png"),
        source: "joint_coord_sys.png",
      },
    },
    notes:
      "Say: Joint mode is great for ‘freeing’ the robot or adjusting posture, but it is NOT intuitive for moving the tool straight. Warn: the TCP can swing widely even when you move only one joint.",
  },

  // 5 — CARTESIAN / WORLD COORDINATE SYSTEM (keep original content + extra clarity)
  {
    type: "bullets",
    hud: "COORD",
    title: "**CARTESIAN / WORLD** Coordinate System",
    lead: "Cartesian coordinates describe the TCP position using X, Y, Z and orientation using W, P, R.",
    bullets: [
      "**Definition**: A fixed coordinate system used for absolute positioning in the robot workspace.",
      "**Origin**: Located at the **base of the robot** (cell/world reference).",
      "**Axes**: X (forward), Y (left), Z (up).",
      "Moves the robot **Tool Center Point (TCP)** in X/Y/Z and rotates about X (**W**), Y (**P**), Z (**R**).",
      "These coordinates give tool **position & orientation**.",
      "Possible to move robot **linearly** or change **orientation**.",
    ],
    notes:
      "Quick WPR explanation: W≈roll, P≈pitch, R≈yaw (don’t overdo the math). Emphasize: WORLD jog means “move along the cell axes,” not along the tool axes.",
  },

  // 6 — WORLD vs USER vs JGFRAME (explicitly keep the original classification)
  {
    type: "two-col",
    hud: "COORD",
    title: "WORLD → **WORLD / USER / JGFRAME**",
    left: {
      lead: "WORLD or Cartesian coordinates can be further classified as below (FANUC):",
      bullets: [
        "**WORLD**: Fixed to the robot base/cell. Good for general navigation.",
        "**USER**: Fixed to a **workpiece/table/fixture**. Best for programming relative to the part.",
        "**JGFRAME (JOG FRAME)**: A jog-only frame used to make manual jogging convenient in certain setups.",
        "In practice: If your table is rotated, USER frame prevents confusing diagonal moves.",
      ],
    },
    right: {
      media: {
        kind: "image",
        // Reuse the same “frames” visual for reinforcement (students like repetition)
        src: "https://www.ipacv.ro/proiecte/robotstudio/textbooks/file/structura/struct28.gif",
        source:
          "Source: ipacv.ro RobotStudio textbook image (struct28.gif) • https://www.ipacv.ro/proiecte/robotstudio/textbooks/file/structura/struct28.gif",
      },
    },
    notes:
      "Tell students: USER frames are one of the most important productivity tools. When your part is on a rotated fixture, USER frame lets you program in part coordinates. Mention we’ll later define/teach a user frame in lab.",
  },

  // 7 — TOOL COORDINATE SYSTEM (keep original text + extra clarity)
  {
    type: "two-col",
    hud: "COORD",
    title: "**TOOL** Coordinate System",
    left: {
      bullets: [
        "**Definition**: A coordinate system attached to the robot’s end effector or tool.",
        "**Use Case**: Used when programming movements relative to the tool’s orientation.",
        "**Example**: Welding, painting, drilling—where the tool angle matters.",
        "Moves the robot TCP in X/Y/Z and rotates W/P/R **in the selected tool frame**.",
        "**Important**: TOOL mode only makes sense if your **TCP/tool frame is set correctly**.",
      ],
    },
    right: {
      media: {
        kind: "image",
        // If you later add a tool-frame picture, swap this. For now we keep content-heavy.
        src: A("./media/joint_coord_sys.png"),
        source: "",
      },
    },
    notes:
      "Say: If your TCP is wrong, tool jogging is lying to you. Example: drilling—Tool +Z should move along the drill direction even if angled. That’s the power of TOOL coordinates.",
  },

  // 8 — ORIENTATION (W/P/R) + WHAT STUDENTS SEE ON FANUC
  {
    type: "bullets",
    hud: "Pose",
    title: "Pose = **Position + Orientation**",
    lead: "A taught point is not just X/Y/Z — it also stores how the tool is rotated.",
    bullets: [
      "**Position**: X, Y, Z (usually in mm).",
      "**Orientation**: W, P, R (tool rotation angles shown by FANUC).",
      "If you keep X/Y/Z the same but change W/P/R, the tool will stay at the same location but **rotate**.",
      "This is why wrist joints (J4–J6) matter: they control orientation.",
    ],
    notes:
      "Do a quick demo idea: same XYZ different WPR—students can visually see the wrist rotate. Stress: pose must be safe; a wrist flip can hit fixtures.",
  },

  // 9 — MOTION TYPES OVERVIEW (keep original)
  {
    type: "bullets",
    hud: "Motion",
    title: "Motion Types in **FANUC**",
    lead: "FANUC robots use motion types to control how movements are executed during a motion.",
    bullets: [
      "The four types are: **JOINT**, **LINEAR**, **CIRCULAR**, **ARC**.",
      "Understanding differences is crucial for **precise positioning**, **smooth motion**, and **optimized cycle times**.",
      "Think: motion type controls the **path** between points.",
    ],
    notes:
      "Say: Motion type answers ‘How do we travel between points?’ Termination answers ‘What happens as we reach the point?’ Students often mix these up.",
  },

  // 10 — JOINT MOTION (with image)
  {
    type: "two-col",
    hud: "Motion",
    title: "**JOINT (J)** Motion",
    left: {
      bullets: [
        "Moves the robot using the **shortest path in joint space**.",
        "Fastest movement between points where **path accuracy is not critical**.",
        "**Command example**: `J P[x] 100% FINE`",
        "**Pros**: Fast and efficient.",
        "**Cons**: TCP path is **not linear**; the TCP may arc/curve.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/p2p_joint.png"),
        source: "p2p_circular.png",
      },
    },
    notes:
      "Explain: Joint motion optimizes joints, not tool path. Good for ‘air moves.’ Bad when you need a straight approach to a part.",
  },

  // 11 — LINEAR MOTION (with image)
  {
    type: "two-col",
    hud: "Motion",
    title: "**LINEAR (L)** Motion",
    left: {
      bullets: [
        "Moves the robot in a **straight line** from current position to the target (TCP path).",
        "Used when you need **precise path control** (welding, gluing, approach/withdraw).",
        "**Command example**: `L P[x] 500mm/sec FINE`",
        "**Pros**: Maintains a straight path.",
        "**Cons**: Usually slower than joint motion and may fail if geometry is difficult.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/p2p_linear.png"),
        source: "p2p_linear.png",
      },
    },
    notes:
      "Say: Linear motion is the default near the part. If the robot must approach a hole or fixture safely, L is your friend. Mention singularities can cause problems in L.",
  },

  // 12 — CIRCULAR MOTION (with image)
  {
    type: "two-col",
    hud: "Motion",
    title: "**CIRCULAR (C)** Motion",
    left: {
      bullets: [
        "Moves the robot in a **circular arc** defined by points.",
        "Used for curved paths (polishing, contour following, some welding paths).",
        "**Command example**: `C P[x] P[y] 100mm/sec FINE`",
        "**Pros**: Smooth, curved motion.",
        "**Cons**: Requires multiple points to define the arc and good geometry.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/p2p_circular.png"),
        source: "p2p_circular.png",
      },
    },
    notes:
      "Explain: Typically you need a ‘through’ point and an ‘end’ point (implementation depends on setup). Emphasize: circular is about TCP path being an arc.",
  },

  // 13 — ARC MOTION (keep original: ARCPATH)
  {
    type: "bullets",
    hud: "Motion",
    title: "**ARC** Motion (Welding-Oriented)",
    lead: "Arc motion is specialized for arc-welding packages and consistent weld quality.",
    bullets: [
      "Specialized motion for arc welding, maintaining consistent speed and orientation.",
      "Used in welding applications (requires appropriate options/software).",
      "**Command mentioned in the original slides**: `ARCPATH`",
      "**Pros**: Optimized for weld quality and process consistency.",
      "**Cons**: Limited to welding tasks and depends on installed options.",
    ],
    notes:
      "Tell students: We may not use ARCPATH in this course unless the cell has the welding option. But you should know it exists and why it is different.",
  },

  // 14 — SPEED UNITS (extra clarity, but doesn’t remove anything)
  {
    type: "bullets",
    hud: "Syntax",
    title: "Speed Units: **% vs mm/sec vs cm/min**",
    lead: "FANUC uses different speed units depending on motion type.",
    bullets: [
      "**Joint (J)** commonly uses **%** of maximum speed (example: `J P[1] 100% ...`).",
      "**Linear (L)** often uses **mm/sec** or **cm/min** (examples: `500mm/sec`, `1000cm/min`).",
      "**Circular (C)** often uses linear-style units too (example: `100mm/sec`).",
      "Speed is independent from termination: you can have **fast FINE** or **slow CNT** depending on requirements.",
    ],
    notes:
      "Students get confused by units. Make it explicit: J% is not the same as mm/sec. Mention override knob/keys also affect speed during execution.",
  },

  // 15 — PROGRAM STRUCTURE (image)
  {
    type: "two-col",
    hud: "Program",
    title: "Program Line Anatomy: **Motion Instruction**",
    left: {
      lead: "A motion line is built from 4 main parts:",
      bullets: [
        "1) **Motion format**: `J`, `L`, `C`",
        "2) **Target position**: `P[i]` (taught point) or `PR[i]` (position register)",
        "3) **Feedrate**: `J%` or `mm/sec` or `cm/min` (depends on motion type)",
        "4) **Path/termination**: `FINE` or `CNT0…CNT100`",
        "Original reference includes: `P 1…1500` and `PR 1…100` as position data formats.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/program_structure.png"),
        source: "program_structure.png",
      },
    },
    notes:
      "Point out: P[] is a taught point stored in the program; PR[] is a variable you can modify. Explain UF/UT briefly: the same XYZ means different physical locations depending on the active frames.",
  },

  // 16 — POSITION DATA DETAILS (UF/UT, WPR, CONF) — content-heavy
  {
    type: "bullets",
    hud: "Program",
    title: "Inside a Point: **UF/UT + XYZ + WPR + CONF**",
    lead: "A taught point includes both coordinates and configuration data.",
    bullets: [
      "**UF: n** = active **User Frame** number at the time of teaching.",
      "**UT: n** = active **Tool Frame** number at the time of teaching.",
      "**X, Y, Z** = TCP position (typically mm).",
      "**W, P, R** = TCP orientation angles displayed by FANUC.",
      "**CONF** = robot posture / configuration (example format: `N, R, D, F, 0, 0, 0`).",
      "Why CONF matters: the robot can reach the same TCP pose with different elbow/wrist postures; CONF helps FANUC pick the intended solution.",
    ],
    notes:
      "Explain gently: you don’t need to memorize CONF fields today, but you must respect them. If the robot ‘flips’ the wrist unexpectedly, configuration is often involved.",
  },

  // 17 — TEACH PENDANT PROGRAM SCREEN (image)
  {
    type: "two-col",
    hud: "Pendant",
    title: "Reading the Teach Pendant **Program Screen**",
    left: {
      lead: "On the TP screen you can identify quickly:",
      bullets: [
        "**Program being executed** vs **program being edited**.",
        "**Line number** and **current line** (where the cursor is).",
        "**Execution status**: ABORTED / PAUSED / RUNNING.",
        "**Jog type** shown (e.g., JOINT).",
        "**Feedrate override %** (your speed multiplier).",
        "**FBD** indicator: TP forward/backward disabled (start from TP prohibited).",
        "You also see the motion lines like: `J P[1] 100% FINE`, `L P[4] 500mm/sec FINE`, etc.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/program_teach_pendant.png"),
        source: "program_teach_pendant.png",
      },
    },
    notes:
      "Tell students: troubleshooting starts here. If it won’t run, check mode, check alarms, check status, check override, check where the cursor is, and check if FWD is disabled.",
  },

  // 18 — QUICK CHECK MCQ (coordinate systems)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: Coordinate Systems",
    question:
      "You are holding a drill tool angled 30°. You want to jog **straight forward along the drill direction** (the tool’s own +Z). Which coordinate system should you use?",
    options: [
      { choice: "A", label: "WORLD" },
      { choice: "B", label: "JOINT" },
      { choice: "C", label: "TOOL" },
      { choice: "D", label: "USER" },
    ],
    correct: "C",
    explain:
      "In **TOOL** coordinates, X/Y/Z axes are attached to the tool frame. That’s how you move along the tool direction even when it is angled.",
    notes:
      "After answer: remind them USER is for part/table; WORLD is for cell; JOINT is motor-by-motor; TOOL is for tool-direction moves.",
  },

  // 19 — TERMINATION OVERVIEW
  {
    type: "bullets",
    hud: "Termination",
    title: "Motion Termination: **FINE vs CNT**",
    lead: "FANUC robots use termination types to control what happens at the end of a motion instruction.",
    bullets: [
      "Two most common termination types: **FINE** and **CNT**.",
      "**FINE**: robot comes to a **complete stop** at the target before continuing.",
      "**CNT (0–100)**: robot **blends** the motion and does not fully stop at intermediate points.",
      "Understanding the difference improves **accuracy**, **smoothness**, and **cycle time**.",
    ],
    notes:
      "Say: Motion type = path between points. Termination = behavior at the point. You choose both. Example: L move can still be CNT blended.",
  },

  // 20 — FINE (Precision Stopping)
  {
    type: "two-col",
    hud: "Termination",
    title: "**FINE** (Precision Stopping)",
    left: {
      bullets: [
        "**FINE** forces the robot to come to a complete stop at the target position before executing the next instruction.",
        "Ensures maximum accuracy; used when exact positioning is critical.",
        "Common uses: **pick-and-place**, **assembly**, **vision-guided operations**, **stopping at a sensor/fixture**.",
        "Example motion line: `L P[2] 500mm/sec FINE`",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/FINE_CNT.png"),
        source: "FINE_CNT.png",
      },
    },
    notes:
      "Explain: FINE is like ‘hit the exact point.’ Downside: stopping costs time and can cause jerky motion. Use FINE where it matters most—near parts and fixtures.",
  },

  // 21 — FINE pros/cons (keep original)
  {
    type: "bullets",
    hud: "Termination",
    title: "FINE: **Advantages** vs **Disadvantages**",
    bullets: [
      "**Advantages of FINE**",
      "• Ensures precise stopping at the target point.",
      "• Essential for operations requiring exact positioning.",
      "• Required when interacting with fixtures, sensors, vision systems, or precise assembly points.",
      "",
      "**Disadvantages of FINE**",
      "• Can slow down cycle time due to stopping at every programmed point.",
      "• Can cause jerky motion in high-speed applications.",
    ],
    notes:
      "Instructor tip: tell them not to default to FINE everywhere. Use it strategically—final approach and interaction points.",
  },

  // 22 — CNT (Continuous Motion)
  {
    type: "two-col",
    hud: "Termination",
    title: "**CNT** (Continuous / Blended Motion)",
    left: {
      bullets: [
        "**CNT** allows blending by not coming to a complete stop at each programmed point.",
        "Robot starts moving toward the **next** position before fully reaching the current one (smooth transition).",
        "**CNT value (0–100)** determines how much blending occurs.",
        "Common use: travel moves, smooth scanning/painting paths, material handling.",
        "Example: `J P[2] 70% CNT50` or `L P[3] 1000cm/min CNT30`",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/FINE_CNT.png"),
        source: "FINE_CNT.png",
      },
    },
    notes:
      "Explain CNT numbers: bigger = more corner rounding/blending (less exact at the point). Practical rule: CNT for motion efficiency; FINE for precision events.",
  },

  // 23 — CNT pros/cons (keep original)
  {
    type: "bullets",
    hud: "Termination",
    title: "CNT: **Advantages** vs **Disadvantages**",
    bullets: [
      "**Advantages of CNT**",
      "• Improves cycle time by eliminating unnecessary stops.",
      "• Produces smoother motion between waypoints.",
      "• Reduces mechanical stress on robot joints by avoiding sudden stops.",
      "",
      "**Disadvantages of CNT**",
      "• Less accuracy at intermediate positions (robot does not stop exactly at the target point).",
      "• Not ideal for precise operations like welding or assembly where exact stopping is necessary.",
    ],
    notes:
      "Add a warning: if a student uses CNT at a ‘touch’ point (sensor/fixture), the robot might never truly reach it. That’s a common beginner mistake.",
  },

  // 24 — WHEN TO USE FINE vs CNT (table content preserved as readable bullets)
  {
    type: "two-col",
    hud: "Decision",
    title: "When to Use **FINE vs CNT**",
    left: {
      lead: "Use **FINE** when you need precision:",
      bullets: [
        "Precise positioning (pick & place, welding, assembly).",
        "Stopping at a **sensor** or **fixture**.",
        "Vision-guided alignment and measurement.",
      ],
    },
    right: {
      lead: "Use **CNT** when you want smooth, fast motion:",
      bullets: [
        "Path-following (painting, scanning) → **CNT (50–100)**",
        "General material handling / conveyor tracking → **CNT (50–75)**",
        "High-speed motion where intermediate accuracy is not important → **CNT (75–100)**",
      ],
    },
    notes:
      "Tell students: ‘Near the part = FINE, in the air = CNT’ is a good beginner rule. Later they’ll learn to tune CNT values for smoothness vs accuracy.",
  },

  // 25 — QUICK CHECK MCQ (motion type)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: Motion Types",
    question:
      "Which motion type guarantees the TCP follows a **straight line** from the current point to the target point?",
    options: [
      { choice: "A", label: "J (Joint)" },
      { choice: "B", label: "L (Linear)" },
      { choice: "C", label: "C (Circular)" },
      { choice: "D", label: "ARC (ARCPATH)" },
    ],
    correct: "B",
    explain:
      "**Linear (L)** is designed for a straight TCP path. Joint motion is fastest but the TCP path can curve.",
    notes:
      "After answer: ask them ‘When would you NOT use linear?’—example: long travel moves where path isn’t important.",
  },

  // 26 — QUICK CHECK MCQ (termination)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: Termination",
    question:
      "You must hit a fixture point exactly (touch a hard stop) before closing the gripper. Which termination should you choose?",
    options: [
      { choice: "A", label: "CNT100" },
      { choice: "B", label: "CNT50" },
      { choice: "C", label: "FINE" },
      { choice: "D", label: "Any termination is fine" },
    ],
    correct: "C",
    explain:
      "**FINE** forces a full stop at the point, giving maximum positioning accuracy at that target.",
    notes:
      "Reinforce: if they use CNT, the robot may round the corner and never truly reach the exact contact point.",
  },

  // 27 — WRAP-UP (keep it content-rich)
  {
    type: "bullets",
    hud: "Summary",
    title: "Summary: The 4 Knobs You Control",
    lead: "Every motion line is basically choosing these four things:",
    bullets: [
      "1) **Coordinate system** for jogging/teaching (JOINT, WORLD, USER, TOOL, JGFRAME).",
      "2) **Motion type** (`J`, `L`, `C`, ARC/ARCPATH).",
      "3) **Speed** (%, mm/sec, cm/min).",
      "4) **Termination** (**FINE** vs **CNT 0–100**).",
      "If your robot moves unexpectedly, check these first before blaming the robot.",
    ],
    notes:
      "Close with a practical preview: next lab, students will (1) jog in different frames, (2) teach 2–3 points, (3) write J/L moves, (4) try FINE vs CNT and see the difference in smoothness and accuracy.",
  },
];

export default slidesData;
