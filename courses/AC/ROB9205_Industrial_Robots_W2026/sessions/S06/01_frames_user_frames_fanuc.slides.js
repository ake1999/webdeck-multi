// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S07/01_frames_user_frames_fanuc.slides.js
// Session S07 — Frames → 2D Translation/Rotation → Transforms → FANUC User Frames → Lab 5
// NOTE: Uses LOCAL images in ./media (extract fanuc_frames_media.zip into ./media)
// NOTE: Uses KaTeX math: use $$...$$ (display) or \( ... \) (inline)

export const topicMeta = {
  id: "01_frames_user_frames_fanuc",
  title: "Frames, Motion, and FANUC User Frames (Lab 5 Prep)",
  duration: 120,
};

const A = (relPath) => new URL(relPath, import.meta.url).href;

const slidesData = [
  // 01 — TITLE
  {
    type: "title",
    hud: "Frames + FANUC",
    title: "Frames, Motion, and FANUC User Frames",
    subtitle: "2D frame intuition → FANUC 3-point UFRAME → Lab 5",
    meta: "Instructor: Ali Karimzadeh • ROB9205 Industrial Robots",
    notes:
      "2D first. Then connect to FANUC user frames and Lab 5. Keep it practical and scenario-driven.",
  },

  // 02 — ROADMAP
  {
    type: "bullets",
    hud: "Roadmap",
    title: "Session Roadmap",
    bullets: [
      "1) Frames (origin + axes)",
      "2) 2D translation and rotation",
      "3) Transform formulas (forward + inverse)",
      "4) Robot frames: Base / Tool / User",
      "5) FANUC user frames (why it saves time)",
      "6) Lab 5: Three-Point method + verification",
    ],
  },

  // 03 — WHAT IS A FRAME (2D)
  {
    type: "two-col",
    hud: "Basics",
    title: "What is a Frame? (start in 2D)",
    left: {
      bullets: [
        "A frame is a **local coordinate system**",
        "It has an **origin** and axes (**X, Y** in 2D)",
        "A point like (2,1) only has meaning **in a frame**",
        "Robotics uses many frames at once (base, tool, user…)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/axes_2d.png"),
        source: "Instructor-generated diagram (original)",
      },
    },
  },

  // 04 — QUIZ (frame meaning)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: frame meaning",
    question:
      "You wrote a point as (200, 50). What is missing to make this meaningful?",
    options: [
      { choice: "A", label: "The robot speed" },
      { choice: "B", label: "The unit (mm vs m) only" },
      { choice: "C", label: "The **frame** (which coordinate system)" },
      { choice: "D", label: "The robot payload" },
    ],
    correct: "C",
    explain:
      "Coordinates must be expressed in a specific frame (World, User, Tool, etc.).",
  },

  // 05 — 3D NOTE (right-handed)
  {
    type: "bullets",
    hud: "3D Note",
    title: "In 3D we add Z (right-handed)",
    lead: "Industrial robots use **right-handed** coordinate systems.",
    bullets: [
      "2D idea stays the same; 3D just adds **Z**",
      "Right-hand rule: curl +X to +Y, thumb points +Z",
      "In FANUC: frames are right-handed (X,Y,Z)",
      "We won’t do heavy 3D derivations today — focus on correct usage",
    ],
  },

  // 06 — MAIN FRAMES (robot)
  {
    type: "two-col",
    hud: "Robot Frames",
    title: "Main frames you must know",
    left: {
      bullets: [
        "**Base frame**: fixed to robot base",
        "**Tool frame (TCP)**: attached to tool tip",
        "**User frame**: attached to table/fixture/part",
        "Same physical point → different numbers in each frame",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/base_tool_user.png"),
        source: "Instructor-generated diagram (original)",
      },
    },
  },

  // 07 — WHY FRAMES (practical)
  {
    type: "bullets",
    hud: "Why",
    title: "Why frames matter (technician reality)",
    bullets: [
      "Wrong frame = robot moves in the **wrong direction**",
      "Wrong TCP = correct direction but **wrong path/height**",
      "Wrong user frame = points look shifted/tilted on the part",
      "Best habit: always check active **UFRAME/UTOOL** before teaching points",
    ],
  },

  // 08 — QUIZ (frame vs tool)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: identify the most likely mistake",
    question:
      "Robot follows the correct XY shape, but the entire path is consistently 5 mm too high everywhere. Most likely issue?",
    options: [
      { choice: "A", label: "User frame X direction (Point 2) is wrong" },
      { choice: "B", label: "User frame plane point (Point 3) is wrong" },
      {
        choice: "C",
        label: "**Tool frame / TCP (UTOOL)** or height touch method is wrong",
      },
      { choice: "D", label: "Speed override is too low" },
    ],
    correct: "C",
    explain:
      "A constant Z offset everywhere is typically TCP/UTOOL or height reference, not a user-frame axis direction.",
  },

  // 09 — WORLD VS USER (your image)
  {
    type: "two-col",
    hud: "Key Idea",
    title: "World vs User: same point, different coordinates",
    left: {
      bullets: [
        "A point can have different numbers in different frames",
        "World might show (350,120,0)",
        "User might show (50,20,0)",
        "**Same physical point** — new reference",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/user_frame.png"),
        source: "Instructor local media — ./media/user_frame.png",
      },
    },
  },

  // 10 — Translation visual
  {
    type: "two-col",
    hud: "2D Motion",
    title: "Pure translation (2D): shift origin, keep axes parallel",
    left: {
      bullets: [
        "Translation = sliding without turning",
        "Axes stay parallel (same orientation)",
        "Only the origin changes: \(t=[t_x,t_y]^T\)",
        "This matches a rigid fixture shift (no rotation)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/translation_only.png"),
        source: "Instructor-generated diagram (original)",
      },
    },
  },

  // 11 — Translation formula (KaTeX)
  {
    type: "bullets",
    hud: "2D Math",
    title: "Translation in 2D (exact)",
    lead: "If axes are parallel, conversion is only an offset.",
    bullets: [
      "$$p_w = p_u + t$$",
      "$$p_w=\\begin{bmatrix}x_w\\\\y_w\\end{bmatrix},\\quad p_u=\\begin{bmatrix}x_u\\\\y_u\\end{bmatrix},\\quad t=\\begin{bmatrix}t_x\\\\t_y\\end{bmatrix}$$",
      "Meaning: add the new frame’s origin shift to get world coordinates.",
    ],
  },

  // 12 — QUIZ (translation scenario)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: fixture shifted",
    question:
      "A fixture moves +10 mm in User X and +0 mm in User Y (no rotation). Your points were taught in that user frame. Best action?",
    options: [
      { choice: "A", label: "Retouch every taught point" },
      {
        choice: "B",
        label: "Update the **User Frame origin** (translation only)",
      },
      { choice: "C", label: "Change robot payload" },
      { choice: "D", label: "Switch to World frame and re-run" },
    ],
    correct: "B",
    explain:
      "A rigid shift is exactly what user frames are for: update the frame (origin), not each point.",
  },

  // 13 — Rotation visual
  {
    type: "two-col",
    hud: "2D Motion",
    title: "Pure rotation (2D): same origin, axes turn by θ",
    left: {
      bullets: [
        "Rotation = turning without sliding",
        "Origin stays fixed",
        "Axes directions change by angle \(\\theta\)",
        "This matches a fixture that is rotated on the table",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/rotation_only.png"),
        source: "Instructor-generated diagram (original)",
      },
    },
  },

  // 14 — Rotation matrix (KaTeX)
  {
    type: "bullets",
    hud: "2D Math",
    title: "Rotation matrix in 2D (exact)",
    bullets: [
      "$$R(\\theta)=\\begin{bmatrix}\\cos\\theta & -\\sin\\theta\\\\ \\sin\\theta & \\cos\\theta\\end{bmatrix}$$",
      "$$p_w = R(\\theta)\\,p_u$$",
      "Interpretation: multiplying by \(R(\\theta)\) rotates coordinates.",
    ],
  },

  // 15 — QUIZ (rotation sign mistake)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: wrong rotation direction",
    question:
      "You rotate a frame +90° about Z, but your result looks like −90° (everything turns the opposite way). Most likely mistake?",
    options: [
      {
        choice: "A",
        label:
          "You used \(R(\\theta)^T\\) when you needed \(R(\\theta)\) (inverse vs forward)",
      },
      { choice: "B", label: "Your TCP is too long" },
      { choice: "C", label: "You used too low speed" },
      { choice: "D", label: "Your fixture is not grounded" },
    ],
    correct: "A",
    explain:
      "For rotations, the inverse is the transpose. Using the inverse flips the direction of rotation.",
  },

  // 16 — Both together (pipeline)
  {
    type: "two-col",
    hud: "Transform",
    title: "Rotation + translation together (real setups)",
    left: {
      bullets: [
        "Most setups have both: rotate then translate",
        "This is the standard frame conversion used in controllers",
        "We call this a **rigid transform**",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/transform_pipeline.png"),
        source: "Instructor-generated diagram (original)",
      },
    },
  },

  // 17 — Forward + inverse (KaTeX)
  {
    type: "bullets",
    hud: "Transform Math",
    title: "Forward + inverse formulas (memorize these)",
    lead: "Forward = User → World. Inverse = World → User.",
    bullets: [
      "$$\\textbf{Forward:}\\quad p_w = R\\,p_u + t$$",
      "$$\\textbf{Inverse:}\\quad p_u = R^T\\,(p_w - t)$$",
      "**Key fact:** \(R^{-1}=R^T\) for rotation matrices (orthonormal).",
      "This is why “undoing” a rotation is easy and stable.",
    ],
  },

  // 18 — QUIZ (mirror / flipped Y)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: Y axis is flipped (mirrored)",
    question:
      "You taught a user frame. Jog +X is correct, but jog +Y goes opposite (mirrored). Most likely cause?",
    options: [
      { choice: "A", label: "TCP (UTOOL) is wrong" },
      {
        choice: "B",
        label:
          "Point 3 was taught on the wrong side (wrong +X–Y plane direction)",
      },
      { choice: "C", label: "Robot battery is low" },
      { choice: "D", label: "Speed override too low" },
    ],
    correct: "B",
    explain:
      "Point 3 defines which side of the X axis is +Y (the plane direction). Wrong side flips Y.",
  },

  // 19 — Homogeneous transform (3D bridge) KaTeX
  {
    type: "bullets",
    hud: "3D Bridge",
    title: "3D uses the same idea (homogeneous transform)",
    lead: "Same idea as 2D, just one more dimension.",
    bullets: [
      "$$T=\\begin{bmatrix}R & t\\\\0 & 1\\end{bmatrix}$$",
      "$$\\begin{bmatrix}p_w\\\\1\\end{bmatrix}=T\\,\\begin{bmatrix}p_u\\\\1\\end{bmatrix}$$",
      "$$T^{-1}=\\begin{bmatrix}R^T & -R^T t\\\\0 & 1\\end{bmatrix}$$",
      "User frames fix **rigid** motion (translation + rotation), not scaling/warping.",
    ],
  },

  // 20 — OPTIONAL interactive app

  {
    type: "two-col",
    hud: "Interactive",
    title: "2D Transform Playground (live numbers)",
    left: {
      lead: "Drag things and watch the math update.",
      bullets: [
        "Drag **User origin** (square) → translation \(t\)",
        "Drag **rotation handle** (circle) → angle \(\\theta\)",
        "Drag **point** (dot) → changes \(p_u\)",
        "Observe live:",
        "**Forward:** \(p_w = R p_u + t\)",
        "**Inverse:** \(p_u = R^T (p_w - t)\)",
        "Same idea in 3D (just add Z)",
      ],
    },
    right: {
      media: {
        kind: "iframe",
        src: A("./media/frame2d_playground.html"),
        source: "Instructor interactive widget — frame2d_playground.html",
      },
    },
  },

  // 21 — FK/IK concept
  {
    type: "two-col",
    hud: "Robot",
    title: "FK vs IK (concept only — why frames matter)",
    left: {
      bullets: [
        "FK: joints → tool pose (where is tool now?)",
        "IK: desired pose → joints (how to reach it?)",
        "Controller uses frames/TCP to define the pose",
        "Wrong UFRAME/UTOOL = controller solves the wrong target",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/fk_ik_concept.png"),
        source: "Instructor-generated diagram (original)",
      },
    },
  },

  // 22 — FANUC user frame meaning
  {
    type: "two-col",
    hud: "FANUC",
    title: "FANUC User Frame = a frame attached to the job",
    left: {
      bullets: [
        "User frame matches the fixture/part orientation",
        "Teach points relative to the job, not the robot base",
        "If fixture moves rigidly, update the frame → points still work",
        "This is why user frames save **hours** of reteaching",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/user_frame.png"),
        source: "Instructor local media — ./media/user_frame.png",
      },
    },
  },

  // 23 — QUIZ (30° surface welding)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: weld line on 30° angled surface",
    question:
      "You must weld a straight line on a surface tilted 30° relative to robot base. Best strategy?",
    options: [
      { choice: "A", label: "Program in World frame; ignore the tilt" },
      {
        choice: "B",
        label:
          "Create a User Frame aligned to the part surface so X/Y follow the seam direction",
      },
      { choice: "C", label: "Increase speed override" },
      { choice: "D", label: "Use Joint motion only" },
    ],
    correct: "B",
    explain:
      "Aligning the user frame to the part makes straight motion and orientation intuitive; controller handles transforms.",
  },

  // 24 — what frames can/cannot fix
  {
    type: "two-col",
    hud: "FANUC",
    title: "What a User Frame can and cannot fix",
    left: {
      bullets: [
        "User frame fixes **rigid** motion only",
        "Rigid = translation + rotation",
        "Not rigid = scale/warp/bad TCP/geometry change",
        "If the part is larger (scale) → frame won’t fix it",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/rigid_vs_not.png"),
        source: "Instructor-generated diagram (original)",
      },
    },
  },

  // 25 — QUIZ (scale change)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: part scaled (not rigid)",
    question:
      "A new batch of parts is ~2% larger (scaled). Can you fix it by updating only the User Frame?",
    options: [
      { choice: "A", label: "Yes, user frames fix any geometry change" },
      { choice: "B", label: "Yes, if you change Point 1 only" },
      {
        choice: "C",
        label: "No, user frames handle rigid transforms, not scaling",
      },
      { choice: "D", label: "Only if you increase CNT" },
    ],
    correct: "C",
    explain:
      "Scaling changes distances between features. User frames only correct rigid shifts/rotations.",
  },

  // 26 — LAB 5 goal
  {
    type: "bullets",
    hud: "Lab 5",
    title: "Lab 5 Goal (what you must do)",
    bullets: [
      "Teach a User Frame aligned with the board/template",
      "Use the **Three-Point** method",
      "Use the required frame number (ex: User 6 in your manual)",
      "Verify +X +Y +Z jog directions before running the program",
    ],
  },

  // 27 — three-point diagram
  {
    type: "two-col",
    hud: "Lab 5",
    title: "Three-Point method: what the 3 points mean",
    left: {
      bullets: [
        "P1: Origin (new zero)",
        "P2: defines +X direction (P1 → P2)",
        "P3: defines which side is +Y (sets plane orientation)",
        "Rule: spread points out for better accuracy",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/three_point_method.png"),
        source: "Instructor-generated diagram (original)",
      },
    },
  },

  // 28 — QUIZ (diagonal +X)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: +X jog moves diagonally",
    question:
      "In User Frame jogging, +X should move along an edge, but it moves diagonally. Best fix?",
    options: [
      {
        choice: "A",
        label:
          "Re-teach Point 2 farther from Point 1 along the intended X direction",
      },
      { choice: "B", label: "Change payload" },
      { choice: "C", label: "Disable collision detection" },
      { choice: "D", label: "Add more program points" },
    ],
    correct: "A",
    explain:
      "Point 2 defines the X axis direction. If it’s off (or too close/noisy), +X becomes rotated/diagonal.",
  },

  // 29 — verify jog (diagram)
  {
    type: "two-col",
    hud: "Lab 5",
    title: "After teaching: fastest verification",
    left: {
      bullets: [
        "Jog +X: should follow template X direction",
        "Jog +Y: should follow template Y direction",
        "Jog +Z: should go up (safe height)",
        "If wrong: re-teach the frame points before running",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/verify_jog.png"),
        source: "Instructor-generated diagram (original)",
      },
    },
  },

  // 30 — pendant workflow
  {
    type: "bullets",
    hud: "Lab 5",
    title: "Pendant workflow (general)",
    bullets: [
      "MENU → SETUP → FRAMES → USER (UFRAME)",
      "Select frame number (ex: 6)",
      "METHOD → Three Point",
      "Record: Origin → X point → XY-plane point",
      "Set active frame and verify jogging directions",
    ],
  },

  // 31 — program habit
  {
    type: "bullets",
    hud: "Lab 5",
    title: "Program habit (must-do every time)",
    bullets: [
      "At start of program set frames explicitly:",
      "```text\nUFRAME_NUM = n\nUTOOL_NUM  = m\n```",
      "Reason: if operator changed active frame, your program still runs correctly",
      "If you forget this, robot can execute points in the wrong frame",
    ],
  },

  // 32 — troubleshooting checklist
  {
    type: "bullets",
    hud: "Troubleshoot",
    title: "Fast troubleshooting checklist (shop flow)",
    bullets: [
      "1) Confirm active **UFRAME_NUM** and **UTOOL_NUM**",
      "2) Jog +X/+Y/+Z in user frame (does it match the part?)",
      "3) If X wrong → re-teach Point 2",
      "4) If Y flipped → re-teach Point 3 (wrong side)",
      "5) If constant Z offset → check TCP / height teaching method",
    ],
  },

  // 33 — Core takeaway
  {
    type: "bullets",
    hud: "Summary",
    title: "Core takeaway (remember forever)",
    bullets: [
      "Frames define meaning of coordinates",
      "User frames make programs reusable when fixtures move rigidly",
      "Math: \(p_w = R p_u + t\) and \(p_u = R^T(p_w - t)\)",
      "Rotation inverse is easy: \(R^{-1}=R^T\)",
      "Lab 5 success = correct 3 points + jog verification",
    ],
  },
];

export default slidesData;
