// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S03/03_robot_characteristics_manipulator_types.slides.js

export const topicMeta = {
  id: "03_robot_characteristics_manipulator_types",
  title: "Robot Characteristics & Manipulator Types",
  duration: 60,
};

// Media note:
// Put these files in:
// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S03/media/
//
// ├── Cartesian-robot.jpg
// ├── cylindrical-robot.jpg
// ├── delta_robot.jpg
// ├── General-SCARA.png
// ├── LBRiiwa.png
// ├── Polar_robot.jpg
// └── robot_characteristics.png
//
// Widget note (RRRRRR only):
// Put the kinematics viewer HTML here (or adjust path):
// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S03/widgets/kinematics_viewer.html
//
// This deck uses "source" INSIDE media blocks (not outside).

const slidesData = [
  // 0 — TITLE
  {
    type: "title",
    hud: "Robot Types & Characteristics",
    title: "Robot Characteristics",
    subtitle: "How to read a robot datasheet + choose the right manipulator",
    meta: "Instructor: Ali Karimzadeh • Email: karimza@algonquincollege.com",
    notes:
      "Hi everyone. Today we’ll learn two practical things: first, the key characteristics you see in robot datasheets—like DoF, payload, reach, workspace, speed, accuracy, and repeatability. Second, the most common manipulator types—Cartesian, cylindrical, spherical/polar, SCARA, articulated, and delta. The goal is that when you see a robot, you can quickly predict what it’s good at.",
  },

  // 1 — WHY THIS MATTERS
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "Why do we learn robot characteristics?",
    bullets: [
      "Because real robots are chosen from datasheets (specs decide the choice)",
      "Wrong choice = slow cell, poor accuracy, poor repeatability, or safety issues",
      "You should be able to answer: “Is this robot suitable for the job?”",
      "This is how you compare ABB / FANUC / KUKA / UR and other brands objectively",
    ],
    notes:
      "In industry, engineers rarely choose robots by ‘looks’. They choose by numbers: payload, reach, repeatability, speed, and workspace. If you know these terms, you can make the right decision quickly.",
  },

  // 2 — TODAY’S ROUTE
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "Today’s route",
    bullets: [
      "Part A: Characteristics (datasheet vocabulary you must understand)",
      "Part B: Manipulator types (workspace shapes + best use cases)",
      "Quick practice: pick a robot type for a task and justify your choice",
    ],
    notes:
      "We’ll keep each concept short. I’ll give you the practical meaning and one example. You don’t need to memorize formulas today—just the idea.",
  },

  // 3 — THE 5 SELECTION QUESTIONS
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "Robot selection = 5 quick questions",
    bullets: [
      "1) What task? (weld, pick, cut, paint, assemble)",
      "2) What payload? (tool + part + cables + brackets)",
      "3) What reach/workspace do we need (and any obstacles)?",
      "4) How fast? (cycle time, acceleration limits)",
      "5) How accurate / repeatable must it be (quality requirement)?",
    ],
    notes:
      "When you choose a robot, you’re basically answering these five questions. If you can answer them, you can narrow down robot choices very quickly.",
  },

  // 4 — DOF INTRO (use your local image)
  {
    type: "two-col",
    hud: "Robot Types & Characteristics",
    title: "Degrees of Freedom (DoF)",
    left: {
      bullets: [
        "DoF: the number of different ways in which the robot can move",
        "Typically equal to the number of actuators (how many independent joints you can command)",
        "Different tasks require different DoF (more DoF = more flexibility, but more complexity/cost)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "./courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/robot_characteristics.png",
        source: "robot_characteristics.png (ROB9205 graphic).",
      },
    },
    notes:
      "DoF is one of the first numbers you see in robot specs. It tells you how freely the robot can position and orient its tool in space.",
  },

  // 5 — WHY 6 DOF IS SPECIAL
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "Why 6 DoF is the ‘standard’ in 3D",
    bullets: [
      "In 3D you often need: position (x,y,z) + orientation (roll,pitch,yaw)",
      "6 DoF are needed for arbitrary tasks in three dimensional space",
      "That’s why most industrial arms are 6-axis articulated manipulators",
    ],
    notes:
      "If you want the tool to reach a point and also point in any direction, you usually need 6 DoF. That’s why 6-axis articulated robots are everywhere in industry.",
  },

  // 6 — WHEN 4 OR 5 DOF IS ENOUGH
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "When 4 or 5 DoF is enough",
    bullets: [
      "For tasks not requiring rotation of the tool about the direction it is pointing (painting, welding), 5 DoF are suitable",
      "For tasks involving moving objects in a plane (electronics assembly), 4 DoF is typically suitable",
      "6 DoF is most useful when approach angles and orientation constraints are complex (tight spaces, varied tool angles)",
    ],
    notes:
      "Not every task needs 6. If you’re working on a flat surface with vertical insertion, 4 DoF can be enough—SCARA is a good example.",
  },

  // 7 — DOF EXAMPLES (FAST)
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "DoF examples (easy)",
    bullets: [
      "SCARA: fast planar work + vertical insertion (often 4 DoF)",
      "Articulated arm: flexible 3D motion (usually 6 DoF)",
      "Gantry/Cartesian: precise XYZ motion (often 3 DoF for positioning)",
    ],
    notes:
      "This is a good mental shortcut: SCARA for fast assembly, articulated for general 3D, Cartesian for straight-line precision in a box-shaped space.",
  },

  // 8 — PAYLOAD INTRO
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "Payload (what it really means)",
    bullets: [
      "Payload: the maximum weight that a robot can carry while performing with the quoted specifications",
      "Payload is not just the part — include tool, cables, brackets, and EOAT hardware",
      "Payload capability changes with reach and speed (dynamic loads matter)",
    ],
    notes:
      "In datasheets, payload is quoted under specific conditions. If you extend the arm far or move faster, the effective payload limit can drop. Always count the whole end-of-arm load.",
  },

  // 9 — PAYLOAD PRACTICE
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "Payload quick practice",
    bullets: [
      "Example: part = 2 kg, gripper = 3 kg, bracket = 1 kg → payload = 6 kg",
      "If you forget cables and brackets, you under-design the cell",
      "Rule: add a safety margin (to reduce overheating, vibration, and wear)",
    ],
    notes:
      "Many real failures happen because the EOAT is heavier than expected. In real applications, a margin saves you from overheating motors and losing accuracy.",
  },

  // 10 — REACH vs WORKSPACE
  {
    type: "two-col",
    hud: "Robot Types & Characteristics",
    title: "Reach vs Workspace (common confusion)",
    left: {
      bullets: [
        "Reach: the maximum distance the robot can extend from the base",
        "Workspace: all the possible positions in space that a robot can place its end effector",
        "Workspace is limited by joint/link lengths, joint limits, and obstacles in the cell",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "./courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/Workspace.png",
        source: "Workspace.png",
      },
    },
    notes:
      "A robot can have a long reach but still a weird workspace shape. Workspace is the real ‘where can I work’ volume.",
  },

  // 11 — WORKSPACE SHAPES (use your local collage)
  {
    type: "two-col",
    hud: "Robot Types & Characteristics",
    title: "Workspace shapes (intuition)",
    left: {
      bullets: [
        "Cartesian: box volume (straight XYZ travel)",
        "Cylindrical: cylinder volume (rotate + extend + lift)",
        "Spherical/polar: spherical sector volume (point + extend)",
        "Articulated: large irregular volume (can wrap around obstacles)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "./courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/robot_characteristics.png",
        source: "robot_characteristics.png (workspace intuition).",
      },
    },
    notes:
      "The workspace shape is a big clue for the robot type. You can often guess the manipulator class just from the workspace envelope.",
  },

  // 12 — WAIST ROTATION
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "Waist rotation (Axis 1) — why it matters",
    bullets: [
      "Waist Rotation: how many degrees the first joint of the robot can rotate",
      "This dictates if the robot can reach behind itself (coverage around the base)",
      "It strongly affects cell layout (where conveyors/fixtures/stations can be placed)",
    ],
    notes:
      "Two robots might have the same reach, but if one has limited waist rotation, it may not cover the same stations in a cell.",
  },

  // 13 — SPEED (WHAT SPEED MEANS)
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "Rotational speeds (what to look at)",
    bullets: [
      "Rotational Speeds: maximum speed a joint can rotate",
      "TCP/tool speed depends on the path, acceleration, payload, and joint limits",
      "Cycle time is what matters in production (speed specs help compare models, not predict exact cycle time)",
    ],
    notes:
      "Speed in a datasheet is not always your real speed. A heavy tool and fast acceleration demands will slow it down. But it’s still useful to compare robot families.",
  },

  // 14 — ROBOT WEIGHT & MOUNTING
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "Robot weight (practical reasons)",
    bullets: [
      "Weight: important to calculate mounting and estimating payload",
      "Mounting location matters: floor, wall, ceiling, pedestal strength and bolts",
      "Vibration affects accuracy and repeatability (rigid mounting improves results)",
    ],
    notes:
      "If the robot is on a weak table, you’ll get vibration and poor results. Robot weight affects installation, safety, and performance.",
  },

  // 15 — ACCURACY vs REPEATABILITY vs PRECISION
  {
    type: "two-col",
    hud: "Robot Types & Characteristics",
    title: "Accuracy vs Repeatability vs Precision",
    left: {
      bullets: [
        "Accuracy: how close the robot gets to the desired position",
        "Repeatability: when commanded to go to the same position multiple times, how much does the position of the end effector change",
        "Precision: how accurately can a robot differentiate positions (e.g., 2.000 mm vs 2.001 mm)",
        "Precision depends strongly on robot sensors (encoders/resolvers, measurement quality)",
      ],
    },
    right: {},
    notes:
      "This is one of the most tested ideas. A robot can be very repeatable but not accurate, and that’s actually common in industry.",
  },

  // 16 — REPEATABLE BUT NOT ACCURATE (EXAMPLE)
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "A robot can be repeatable but not accurate",
    bullets: [
      "Example: the robot always lands 2 mm left of the target point",
      "That is **low accuracy**, but **high repeatability** (same error every time)",
      "Calibration/offsets can improve accuracy; repeatability is mainly about mechanics + control stability",
    ],
    notes:
      "Factories often care more about repeatability because you can teach points or calibrate. If it repeats reliably, you can compensate with offsets.",
  },

  // 17 — WHAT AFFECTS ACCURACY
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "What affects accuracy in real life?",
    bullets: [
      "Stiffness and deflection under load (bending changes the tool position)",
      "Backlash in gearboxes (lost motion during direction changes)",
      "Calibration quality (model errors become position errors)",
      "Temperature and wear over time (changes geometry and friction)",
    ],
    notes:
      "Even if the controller is perfect, real hardware bends and has small gaps. That’s why stiffness and gearbox quality matter.",
  },

  // 18 — TRANSITION TO MANIPULATOR TYPES
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "Manipulator types: how we classify them",
    bullets: [
      "A practical classification is by the type of joints used for the first three joints",
      "The first three joints tend to control the overall placement of the end effector",
      "Different joint choices create different motion styles and workspace shapes",
      "Each manipulator type has unique advantages and disadvantages → that’s why we choose them",
    ],
    notes:
      "Now we shift to robot types. The same specs we discussed—workspace, stiffness, speed—are strongly influenced by manipulator geometry.",
  },

  // 19 — (optional quiz commented out in your original)

  // 20 — TYPE: CARTESIAN (video)
  {
    type: "two-col",
    hud: "Manipulator Types",
    title: "Type 1: Cartesian (Gantry)",
    left: {
      media: {
        kind: "iframe",
        src: "https://www.youtube.com/embed/BuV_ikbM1Vc?autoplay=1&mute=1&loop=1&playlist=BuV_ikbM1Vc&controls=0&modestbranding=1&rel=0",
        source: "YouTube (BuV_ikbM1Vc).",
      },
    },
    right: {
      bullets: [
        "Typical joint pattern: PPP (X-Y-Z)",
        "Workspace: box volume",
        "**Advantages**: stiff, simple equations to determine joint positions, very precise",
        "**Disadvantages**: limited workspace for size (structure grows fast for large areas)",
      ],
    },
    notes:
      "Cartesian robots are basically XYZ stages. They’re common in CNC, 3D printing, and precision moves in a rectangular space.",
  },

  // 21 — CARTESIAN: BEST USES
  {
    type: "bullets",
    hud: "Manipulator Types",
    title: "Cartesian: where you see it most",
    bullets: [
      "CNC / laser cutting / plasma cutting (high stiffness is valuable)",
      "Pick-and-place over a large flat area (simple XY coverage)",
      "Machine tending with linear axes (straight approach into machines)",
      "When forces are high and accuracy must stay stable (less bending than arms)",
    ],
    notes:
      "If you’re cutting metal sheets and forces can disturb the motion, stiffness is a big advantage. That’s why gantry-style systems are common there.",
  },

  // 22 — (optional quiz commented out in your original)

  // 23 — TYPE: CYLINDRICAL (image)
  {
    type: "two-col",
    hud: "Manipulator Types",
    title: "Type 2: Cylindrical",
    left: {
      media: {
        kind: "image",
        src: "./courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/cylindrical-robot.jpg",
        source: "cylindrical-robot.jpg",
      },
    },
    right: {
      bullets: [
        "Typical joint pattern: RPP (rotate + radial + vertical)",
        "Workspace: cylindrical volume",
        "**Advantages**: very stiff in Z and along the length of the horizontal link; simple equations to determine joint positions",
        "**Disadvantages**: limited workspace for size (less coverage compared to articulated for similar footprint)",
      ],
    },
    notes:
      "Cylindrical robots sweep around like a column. Simple and practical for certain handling tasks, but not as flexible as articulated arms.",
  },

  // 24 — TYPE: SPHERICAL / POLAR (image)
  {
    type: "two-col",
    hud: "Manipulator Types",
    title: "Type 3: Spherical (Polar)",
    left: {
      media: {
        kind: "image",
        src: "./courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/Polar_robot.jpg",
        source: "Polar_robot.jpg",
      },
    },
    right: {
      bullets: [
        "Typical joint pattern: RRP (two rotations + extension)",
        "Workspace: spherical sector / shell-like",
        "**Advantages**: stiff in the direction of extension; larger workspace for size",
        "**Disadvantages**: cannot go around obstacles; moderately complicated equations; uncommon in industry",
      ],
    },
    notes:
      "Polar robots point in a direction and extend. They can cover a large region, but their motion can be awkward around obstacles, so they’re less common today.",
  },

  // 25 — (optional quiz commented out in your original)

  // 26 — TYPE: SCARA (video)
  {
    type: "two-col",
    hud: "Manipulator Types",
    title: "Type 4: SCARA",
    left: {
      media: {
        kind: "iframe",
        src: "https://www.youtube.com/embed/XAGNgimLhu8?autoplay=1&mute=1&loop=1&playlist=XAGNgimLhu8&controls=0&modestbranding=1&rel=0",
        source: "YouTube (XAGNgimLhu8).",
      },
    },
    right: {
      bullets: [
        "Typical pattern: RRP (often RRPR with wrist rotation)",
        "Workspace: donut shape in XY + vertical Z",
        "**Advantages**: stiff in the vertical direction; large workspace for size; capable of very rapid motion; lower cost over articulated robots",
        "**Disadvantages**: equations are more complicated than Cartesian; suited for planar tasks",
      ],
    },
    notes:
      "SCARA is designed for speed on a table and vertical insertion. That’s why it’s common in assembly lines for electronics and packaging.",
  },

  // 27 — (optional quiz commented out in your original)

  // 28 — TYPE: ARTICULATED (video)
  {
    type: "two-col",
    hud: "Manipulator Types",
    title: "Type 5: Articulated (6-axis industrial arm)",
    left: {
      media: {
        kind: "iframe",
        src: "https://www.youtube.com/embed/1_2MtGoGu2k?autoplay=1&mute=1&loop=1&playlist=1_2MtGoGu2k&controls=0&modestbranding=1&rel=0",
        source: "YouTube (1_2MtGoGu2k).",
      },
    },
    right: {
      bullets: [
        "Joint pattern: usually RRRRRR (6 revolute joints)",
        "Workspace: large workspace for size; able to reach around obstacles",
        "**Advantages**: capable of rapid motion; most flexible for 3D tasks",
        "**Disadvantages**: complicated equations for determining joint angles (though solved); less stiff than Cartesian/gantry",
      ],
    },
    notes:
      "This is the most common industrial robot type. It’s the general-purpose solution for welding, painting, machine tending, and many material handling tasks.",
  },

  // 29 — WIDGET (RRRRRR ONLY) — ONE SLIDE WIDE
  {
    type: "two-col",
    hud: "Manipulator Types",
    title: "Interactive: 6-axis articulated joint motion (RRRRRR)",
    left: {
      media: {
        kind: "iframe",
        // Adjust path if your widget lives elsewhere:
        src: "./shared/widgets/kin_viewer.html?type=RRRRRR",
        source: "./shared/widgets/kin_viewer.html?type=RRRRRR",
      },
    },
    notes:
      "Live demo: move J1–J3 to see positioning, then J4–J6 to see wrist/orientation. Emphasize: axes are not all parallel—many are perpendicular, which enables full 3D orientation.",
  },

  // 30 — TYPE: PARALLEL / DELTA (image)
  {
    type: "two-col",
    hud: "Manipulator Types",
    title: "Type 6: Parallel robot (Delta)",
    left: {
      media: {
        kind: "image",
        src: "./courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/delta_robot.jpg",
        source: "delta_robot.jpg",
      },
    },
    right: {
      bullets: [
        "Parallel structure: multiple arms support one moving platform",
        "Extremely fast pick-and-place for light payloads",
        "Often mounted overhead above a conveyor (packaging/sorting)",
        "Tradeoff: smaller workspace and limited heavy payload compared to articulated arms",
      ],
    },
    notes:
      "Delta robots are the speed champions. They’re common in packaging and sorting, especially when the payload is light and cycle time is very short.",
  },

  // 31 — QUICK COMPARISON (EASY MEMORY)
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "One-slide memory: who is best at what?",
    bullets: [
      "Cartesian: stiffness + precision in a box space",
      "SCARA: fastest planar assembly + vertical insertion",
      "Articulated: most flexible 3D motion (general-purpose)",
      "Delta: fastest light pick-and-place",
      "Cylindrical/Polar: niche / less common today",
    ],
    notes:
      "If you remember these five lines, you can explain 80% of robot selection logic. Everything else is basically a tradeoff between speed, stiffness, workspace, and flexibility.",
  },

  // 32 — PRACTICE
  {
    type: "bullets",
    hud: "Practice",
    title: "Practice: pick a robot type (and why)",
    bullets: [
      "Case 1: accurately cut a sheet of metal (forces on the robot can cause errors)",
      "Case 2: spray paint large parts from various angles (exact positioning not important)",
    ],
    notes:
      "Case 1: Cartesian/gantry is a strong choice because stiffness matters under cutting forces.\nCase 2: Articulated 6-axis is a strong choice because it can reach large parts and spray from many angles.",
  },

  // 33 — WHAT TO CHECK IN A DATASHEET
  {
    type: "bullets",
    hud: "Robot Types & Characteristics",
    title: "What I want you to check in a datasheet",
    bullets: [
      "DoF (can it do the motion you need?)",
      "Payload (include tool + part + margin)",
      "Reach + workspace (can it physically reach all points?)",
      "Accuracy, repeatability, precision (what does the job truly need?)",
      "Speed (will it meet cycle time?)",
    ],
    notes:
      "This is your real-world checklist. If you do this every time, you’ll avoid most robot selection mistakes.",
  },

  // 34 — EXIT QUESTIONS
  {
    type: "bullets",
    hud: "Exit",
    title: "Exit questions",
    bullets: [
      "In one sentence: difference between reach and workspace?",
      "Accuracy vs repeatability: which is usually better in industrial robots?",
      "Name one task where SCARA is better than a 6-axis arm",
      "Name one task where a Cartesian robot is a better choice",
    ],
    notes:
      "Take one minute and answer these in your own words. If you can explain these four items simply, you understood today’s topic very well.",
  },
];

export default slidesData;
