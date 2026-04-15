// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S01/01_fanuc_complete_lab_guide.slides.js

export const topicMeta = {
  id: "01_fanuc_lab_guide",
  title: "Lab 1: FANUC 200iD Hardware & Safety",
  duration: 90,
};

const A = (relPath) => new URL(relPath, import.meta.url).href;

const slidesData = [
  // 1 — TITLE
  {
    type: "title",
    hud: "Lab 01",
    title: "FANUC LR Mate 200iD",
    subtitle: "Safety, Hardware Anatomy, and Manual Operation",
    meta: "Instructor: Ali Karimzadeh • Email: karimza@algonquincollege.com",
    notes: "Welcome to Lab 1. Safety is our first priority today.",
  },

  // 2 — QUICK REVIEW: ROBOT CLASSIFICATIONS (Using Gallery)
  {
    type: "two-col",
    hud: "Review",
    title: "Quick Review: **Robot Design**",
    left: {
      lead: "Industrial robots are classified by their physical structure:",
      bullets: [
        "**Articulated**: Like a human arm (our Fanuc).",
        "**SCARA**: Horizontal movement, very fast.",
        "**Delta**: Parallel links for pick-and-place.",
        "**Cartesian**: Linear X-Y-Z movement.",
      ],
    },
    right: {
      media: {
        kind: "gallery",
        layout: "stack",
        items: [
          { src: A("./media/design_articulated.jpg"), caption: "Articulated" },
          { src: A("./media/design_scara.png"), caption: "SCARA" },
          { src: A("./media/design_delta.jpg"), caption: "Delta" },
          { src: A("./media/design_cartesian.png"), caption: "Cartesian" },
        ],
      },
    },
  },

  // 3 — THE GOLDEN RULES OF SAFETY
  {
    type: "bullets",
    hud: "SAFETY",
    title: "The **Big Three** Safety Rules",
    lead: "Violation of these rules results in immediate dismissal from the lab.",
    bullets: [
      "**Stay Outside**: Never enter the reach of the robot while it is moving.",
      "**One Controller**: The person holding the Teach Pendant is the ONLY person allowed inside the safety zone.",
      "**E-Stop Awareness**: Always know where the nearest Emergency Stop is before turning the power on.",
    ],
    notes:
      "Remind students: The robot is stronger than you and cannot feel your presence.",
  },

  // 4 — THE MECHANICAL UNIT (AXES)
  {
    type: "two-col",
    hud: "Anatomy",
    title: "The Mechanical Unit: **6 Axes**",
    left: {
      bullets: [
        "**Major Axes (J1, J2, J3)**: These position the robot in space.",
        "**Minor Axes (J4, J5, J6)**: These orient the wrist and the tool.",
        "Each axis is driven by an **AC Servo Motor**.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/axes_funuc.png"),
        source: "Fanuc Axis Identification",
      },
    },
  },

  // 5 — HOW IT MOVES: FEEDBACK LOOP
  {
    type: "two-col",
    hud: "Theory",
    title: "Servos & **Encoders**",
    left: {
      lead: "How does the robot know exactly where it is?",
      bullets: [
        "**Servo Motor**: Converts electrical energy into precise motion.",
        "**Pulse Coder (Encoder)**: Attached to the motor; it counts rotations.",
        "**Closed-Loop**: The controller constantly compares where the robot *is* vs. where it *should be*.",
      ],
    },
    right: {
      media: {
        kind: "gallery",
        layout: "stack",
        items: [
          { src: A("./media/servo_motor.jpg"), caption: "Fanuc Servo Motor" },
          { src: A("./media/encoders.jpg"), caption: "Optical Encoder Disc" },
        ],
      },
    },
  },

  // 6 — THE BRAIN: R-30iB CONTROLLER
  {
    type: "two-col",
    hud: "Hardware",
    title: "The **R-30iB Mate** Controller",
    left: {
      bullets: [
        "**Main Breaker**: Main power switch.",
        "**Mode Switch**: T1 (Manual), T2 (Fast Manual), and AUTO.",
        "**Operator Panel**: Contains the physical E-Stop and the Start button.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/Controller_unit_guide.png"),
        source: "Controller Front Panel",
      },
    },
  },

  // 7 — INSIDE THE BRAIN
  {
    type: "two-col",
    hud: "Hardware",
    title: "Inside the **Controller**",
    left: {
      bullets: [
        "**Servo Amplifiers**: The 'muscles' that send high voltage to motors.",
        "**E-Stop Unit**: A hardware-based safety circuit that bypasses software.",
        "**Main Board**: The CPU that calculates kinematics and path planning.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/funuc_controler_inside.jpg"),
        source: "Internal Electronics Architecture",
      },
    },
  },

  // 8 — THE iPendant (Front)
  {
    type: "two-col",
    hud: "Interface",
    title: "The **Teach Pendant** (iPendant)",
    left: {
      bullets: [
        "**USB Port**: Used for backing up programs.",
        "**On/Off Switch**: Must be **ON** for manual movement (T1 mode).",
        "**Display**: 7-inch color screen showing status and code.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/teach_Pendant_unit.jpg"),
        source: "Fanuc iPendant Interface",
      },
    },
  },

  // 9 — THE DEADMAN SWITCH (Position Logic)
  {
    type: "two-col",
    hud: "Safety",
    title: "The **3-Position** Deadman Switch",
    left: {
      lead: "Located on the back of the pendant. Logic:",
      bullets: [
        "**Released (Pos 1)**: Robot is OFF.",
        "**Middle (Pos 2)**: Robot is ENABLED (Jogging allowed).",
        "**Fully Squeezed (Pos 3)**: Robot is OFF (Emergency Panic).",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/teach_Pendant_unit.jpg"),
        source: "Fanuc iPendant Interface",
      },
    },
    notes:
      "Students often squeeze too hard when they panic. Remind them to find the 'soft middle'.",
  },

  // 10 — KEYPAD ANATOMY
  {
    type: "two-col",
    hud: "Interface",
    title: "Navigating the **Keypad**",
    left: {
      bullets: [
        "**COORD**: Changes how the robot moves (Joint, World, Tool).",
        "**RESET**: Clears error messages.",
        "**SHIFT**: Must be held with other keys to perform actions.",
        "**+/- Override**: Changes jogging speed.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/teach_pendant_keys.jpg"),
        source: "Key Groupings",
      },
    },
  },

  // 11 — PROCEDURE: STARTUP
  {
    type: "bullets",
    hud: "Procedure",
    title: "**Startup** Checklist",
    lead: "Follow these steps in order every time you start the lab:",
    bullets: [
      "1. Turn **Main Breaker** on the controller to the ON position.",
      "2. Turn the **Pendant Switch** to ON.",
      "3. Release all **E-Stops** (Twist to release).",
      "4. Press **RESET** on the pendant (Red 'Fault' LED should go out).",
      "5. Set override speed to **10%** using the keys.",
    ],
  },

  // 12 — PROCEDURE: JOGGING (MOVEMENT)
  {
    type: "two-col",
    hud: "Procedure",
    title: "The **Jogging Handshake**",
    left: {
      lead: "To move the robot manually, you must do the following simultaneously:",
      bullets: [
        "1. Grip the **Deadman** switch in the middle position.",
        "2. Hold the **SHIFT** key.",
        "3. Press and hold a **Blue Jog Key** (J1-J6).",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/Jog_keys.jpg"),
        source: "Manual Jog Interface",
      },
    },
  },

  // 13 — COORDINATE SYSTEMS
  {
    type: "two-col",
    hud: "Operation",
    title: "Understanding **COORD** Modes",
    left: {
      bullets: [
        "**JOINT**: Moves one motor at a time (e.g., only rotate base).",
        "**WORLD**: Moves in a straight line relative to the center of the robot base.",
        "**Press the COORD key** to toggle between these modes.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/reference_frames.png"), // Suggested online asset for clarity
        source: "World vs Joint Movement",
      },
    },
  },

  // 14 — SOFTWARE STATUS
  {
    type: "two-col",
    hud: "Interface",
    title: "Reading the **Screen**",
    left: {
      bullets: [
        "**Status Bar**: Shows active mode (T1/AUTO) and speed percentage.",
        "**Software LEDs**: **BUSY** (working), **STEP** (single line mode), **FAULT** (error active).",
      ],
    },
    right: {
      media: {
        kind: "gallery",
        layout: "stack",
        items: [
          { src: A("./media/Status_window.jpg"), caption: "Status Bar" },
          {
            src: A("./media/Description_of_software_LEDs.png"),
            caption: "LED Indicators",
          },
        ],
      },
    },
  },

  // 15 — PROCEDURE: RUNNING A PROGRAM (T1)
  {
    type: "two-col",
    hud: "Procedure",
    title: "Testing a **Program**",
    left: {
      lead: "Before running in Auto, we test in T1 mode:",
      bullets: [
        "1. Select your program from the **SELECT** menu.",
        "2. Press **STEP** to toggle 'Step Mode' (one line at a time).",
        "3. Hold **Deadman + SHIFT**.",
        "4. Press **FWD** to execute the highlighted line.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/program_run_keys.jpg"),
        source: "Execution Keys",
      },
    },
  },

  // 16 — PROCEDURE: RUNNING A PROGRAM (AUTO)  [NEW]
  {
    type: "two-col",
    hud: "Procedure",
    title: "Running a Program in **AUTO** Mode",
    left: {
      lead: "AUTO mode is for production/continuous execution. In AUTO, the teach pendant is **OFF** and programs start from the controller panel.",
      bullets: [
        "1. In T1, **select** the program and confirm it runs safely in **STEP** first.",
        "2. Turn the controller key to **AUTO** (mode selector).",
        "3. Release all **E-Stops** (controller and teach pendant).",
        "4. On the pendant, switch the enable key to **OFF** (pendant is unavailable in AUTO).",
        "5. If you see an alarm, press **RESET**.",
        "6. Make sure you are at the **first line** of the program (cursor at top) and speed is set appropriately.",
        "7. Press **START** on the controller operator panel to run.",
        "8. Stay ready at the **Emergency Stop** during the run.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/Controller_unit_guide.png"),
        source: "Controller Front Panel (Mode selector, START, E-Stop).",
      },
    },
    notes:
      "This follows the lab manual flow: AUTO mode disables pendant operation and runs from the controller START button. Remind students: ALWAYS validate in T1 step mode first, then switch to AUTO.",
  },

  // 17 — QUIZ: SAFETY
  {
    type: "mcq",
    hud: "Quiz",
    title: "Safety Check",
    question:
      "You are jogging the robot and it starts moving toward a table. You panic and **squeeze the Deadman switch as hard as you can**. What happens?",
    options: [
      { choice: "A", label: "The robot speeds up." },
      { choice: "B", label: "The robot stops immediately." },
      { choice: "C", label: "The robot ignores the squeeze and continues." },
      { choice: "D", label: "The pendant turns off." },
    ],
    correct: "B",
    explain:
      "The 3-position deadman is designed to trigger an E-stop if you either release it OR squeeze it too hard in a panic.",
  },

  // 18 — QUIZ: HARDWARE
  {
    type: "mcq",
    hud: "Quiz",
    title: "Hardware Check",
    question:
      "Which axis is responsible for rotating the entire robot base left and right?",
    options: [
      { choice: "A", label: "Joint 6" },
      { choice: "B", label: "Joint 3" },
      { choice: "C", label: "Joint 1" },
      { choice: "D", label: "Joint 4" },
    ],
    correct: "C",
    explain: "Joint 1 is the base axis for positioning the arm's orientation.",
  },
];

export default slidesData;
