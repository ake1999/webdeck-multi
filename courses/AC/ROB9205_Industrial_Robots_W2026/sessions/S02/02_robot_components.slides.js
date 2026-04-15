// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/02_robot_components.slides.js

export const topicMeta = {
  id: "02_robot_components",
  title: "Robot Components: From Joints to Control Loops",
  duration: 60,
};

// Tip: For best reliability (offline + printing), download external images
// into: courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/
// and replace URLs with relative paths like: "./courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/filename.gif"

// Local media expected in: ./courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/
// - harmonic_drives.gif
// - encoders.png


const slidesData = [
  // 0 — TITLE
  {
    type: "title",
    hud: "Robot Components",
    title: "Robot Components",
    subtitle: "What’s inside a robot—and how the parts work together",
    meta: "Instructor: Ali Karimzadeh • Email: karimza@algonquincollege.com",
    notes:
      "Hi everyone. Today we’ll break a robot into its main building blocks: the mechanical structure, joints and links, end effectors, sensors, actuators, and the controller.\n\nThe goal is not to memorize every term—it's to understand the blocks and connections so you can troubleshoot real robots later.",
  },

  // 1 — WHY THIS MATTERS
  {
    type: "bullets",
    hud: "Robot Components",
    title: "Why do we learn components?",
    bullets: [
      "Troubleshooting = knowing the **blocks** and the **connections** between them",
      "Most robot problems show up as: sensing issues, actuation issues, wiring/I/O issues, or software logic mistakes",
      "If you can map the chain (**command → motion → feedback**), you can find where it breaks",
    ],
    notes:
      "When something fails on a robot, the fastest way to debug is to ask:\n- Is the command correct?\n- Did the controller output the signal?\n- Did the actuator move?\n- Did the sensor confirm it?\n\nThis lecture keeps coming back to that chain.",
  },

  // 2 — BIG PICTURE MAP (REAL BLOCK DIAGRAM)
  {
    type: "two-col",
    hud: "Robot Components",
    title: "The robot as a system (the one picture to remember)",
    left: {
      bullets: [
        "Task logic (software) defines **what** the robot should do (task/sequence)",
        "Motion computation (processor) computes **how** to move (paths/joint targets)",
        "Feedback control (controller) continuously **reduces error** to hit the target",
        "Actuators create joint motion (motors, valves, cylinders)",
        "Sensors measure the result and feed it back (**closed-loop** control)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/General_closed_loop_feedback_system.svg",
        source: "Closed-loop feedback (concept diagram).",
      },
    },
    notes:
      "This is the most important slide today.\nEverything we discuss fits into this loop: command → compute → control → motion → measurement → correction.",
  },

  // 3 — TWO MAIN ROBOT BODIES
  {
    type: "two-col",
    hud: "Robot Components",
    title: "Robot body types (most common)",
    left: {
      bullets: [
        "Manipulator = robot arm for positioning/orientation of a tool",
        "Mobile robot = AMR/rover for moving in the environment",
        "Mobile manipulator = mobile base + arm (move + manipulate)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://emanual.robotis.com/assets/images/platform/turtlebot3/manipulation/hardware_setup.png",
        source:
          "https://emanual.robotis.com, Mobile robot example (laser scanner + camera + gripper).",
      },
    },
    notes:
      "When people say 'robot' in factories, they usually mean a manipulator.\nIn warehouses and hospitals, you’ll often see mobile robots.\nMany modern systems combine both.",
  },

  // 4 — LINKS & JOINTS
  {
    type: "two-col",
    hud: "Robot Components",
    title: "Links and joints (simple)",
    left: {
      bullets: [
        "Links = rigid bodies that carry loads (structure of the robot)",
        "Joints = where motion happens (rotation or translation)",
        "Robot arm = a chain of links connected by joints",
        "DOF (degrees of freedom) = number of independent joint motions you can command",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rethink_Robotics_%E2%80%94_Brooks_and_Baxter_(8000143255).jpg",
        source: "Example arm with many joints/links (Baxter).",
      },
    },
    notes:
      "Think of the robot as a chain.\nLinks are the solid pieces.\nJoints are the hinges or sliders.\nDOF is just: how many independent moves the robot can do.",
  },

  // 5 — REVOLUTE (GIF works as image)
  {
    type: "two-col",
    hud: "Joints",
    title: "Joint type #1: Revolute (R) — rotates like a hinge",
    left: {
      bullets: [
        "Rotation around **one axis** (like a door hinge)",
        "Most common joint in industrial robot arms (compact and practical)",
        "Good when you need a large reachable workspace around the robot",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Scharnier%2018.gif",
        source: "Revolute joint motion (hinge GIF).",
      },
    },
    notes:
      "In real industrial arms, revolute joints are the default because they’re compact and give a big workspace.",
  },

  // 6 — PRISMATIC (GIF works as image)
  {
    type: "two-col",
    hud: "Joints",
    title: "Joint type #2: Prismatic (P) — slides like a piston",
    left: {
      bullets: [
        "Translation along **one axis** (straight-line motion)",
        "Very common in Cartesian/gantry robots (X–Y–Z stages)",
        "Great when you want box-shaped, highly repeatable motion",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Linear_table_rail_guide_animated.gif",
        source: "Prismatic joint motion (linear slide GIF).",
      },
    },
    notes:
      "Prismatic joints show up a lot in Cartesian robots and vertical Z motion.\nIf you need precise box-shaped movement, prismatic axes are perfect.",
  },

  // 7 — QUIZ #1 (MCQ — correct schema)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quick quiz #1 (joints)",
    question: "Which joint type is MOST common in a 6-axis industrial arm?",
    questionSay:
      "Quick quiz. Which joint type is most common in a 6-axis industrial arm?",
    options: [
      { choice: "A", label: "Prismatic" },
      { choice: "B", label: "Revolute" },
      { choice: "C", label: "Helical" },
      { choice: "D", label: "Planar" },
    ],
    correct: "B",
    explain:
      "Most 6-axis industrial arms are basically 6 revolute joints. Prismatic joints are more common in Cartesian/gantry systems.",
    notes:
      "Correct answer is B. In industry, a typical 6-axis robot is essentially six revolute joints: base, shoulder, elbow, and a 3-axis wrist.",
  },

  // 8 — OTHER JOINT TYPES
  {
    type: "bullets",
    hud: "Joints",
    title: "Other joint types (less common, but good to know)",
    bullets: [
      "Cylindrical (C) = rotate + slide on the **same axis**",
      "Spherical (S) = 3 rotations at one point (ball-joint idea)",
      "Planar = motion in a plane (x–y) + rotation about z",
      "Helical = rotation + translation are linked (like a screw thread)",
    ],
    notes:
      "You won’t always use these names in industry, but you will see these motions in mechanisms.\nRevolute and prismatic are still the main ones in most robot arms.",
  },

  // 9 — WORKSPACE
  {
    type: "bullets",
    hud: "Joints",
    title: "Workspace (why joint choices matter)",
    bullets: [
      "Workspace = the set of all positions/orientations the robot can reach",
      "Revolute joints → larger, round workspace (reach around obstacles)",
      "Prismatic joints → box-shaped workspace (great for rectangular areas)",
      "Robot choice depends on task geometry: **where do I need to reach?**",
    ],
    notes:
      "If you’re moving in a box-like area, a Cartesian robot makes sense.\nIf you need to reach around objects, arms are better.",
  },

  // 10 — EOAT INTRO
  {
    type: "bullets",
    hud: "EOAT",
    title: "End effector (EOAT) = the robot’s tool",
    bullets: [
      "EOAT = End Of Arm Tooling (the part that touches the work)",
      "Same robot arm + different EOAT = completely different application",
      "In industry, EOAT design often decides **speed**, **reliability**, and **quality**",
    ],
    notes:
      "The robot arm is like the ‘body’—but the end effector is what touches the work.\nMany applications succeed or fail because of EOAT design.",
  },

  // 11 — PARALLEL JAW
  {
    type: "two-col",
    hud: "EOAT",
    title: "Gripper #1: Parallel-jaw (most common)",
    left: {
      bullets: [
        "Strong, simple, reliable open/close gripping",
        "Best for rigid parts with predictable geometry (edges/flats)",
        "Common in labs because it’s versatile and easy to control",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://www.mooreinternational.co.uk/user/products/Other%20Products/Zimmer%20Robot%20Grippers/2-Jaw%20Parallel%20Grippers/GH6000%20Series.png",
        source:
          "https://www.mooreinternational.co.uk Parallel-jaw gripper example.",
      },
    },
    notes:
      "If I had to pick the most common mechanical gripper: parallel-jaw.\nSimple open/close, and it works for many tasks.",
  },

  // 12 — VACUUM
  {
    type: "two-col",
    hud: "EOAT",
    title: "Gripper #2: Vacuum (super common in packaging)",
    left: {
      bullets: [
        "Fast pick-and-place on flat surfaces (boxes, sheets, bags)",
        "Very common on conveyors and in packaging automation",
        "Limitations: porous/rough surfaces, leaks, oily/dusty parts",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://shop.elephantrobotics.com/cdn/shop/products/myCobot-Pro-Vacuum-Suction-Cups-Air-Compressor-for-Robotic-Arm-from-Elephant-Robotics-4_800x.jpg?v=1668423949",
        source: "https://shop.elephantrobotics.com (Vacuum Suction Cups).",
      },
    },
    notes:
      "Vacuum is extremely common in pick-and-place.\nBut if the surface is rough, porous, or oily—vacuum can fail.",
  },

  // 13 — MAGNET
  {
    type: "two-col",
    hud: "EOAT",
    title: "Gripper #3: Magnetic (for steel parts)",
    left: {
      bullets: [
        "Best for steel sheets and ferromagnetic parts (fast handling)",
        "Very fast grip/release and simple mechanical design",
        "Safety note: power loss can cause drop risk (use fail-safe designs)",
      ],
    },
    right: {},
    notes:
      "Magnetic gripping is excellent for steel handling.\nBut we must think about safety—power loss and drop risk.",
  },

  // 14 — DEXTEROUS HAND
  {
    type: "two-col",
    hud: "EOAT",
    title: "Gripper #4: Multi-finger (dexterous, but complex)",
    left: {
      bullets: [
        "More adaptable grasping for irregular objects",
        "Useful for research and special handling tasks",
        "Downside: cost + complexity + often slower and less robust than simple grippers",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Servo-electric_5-Finger_gripping_hand_-_Schunk_SVH.JPG",
        source: "Dexterous hand example (Schunk SVH).",
      },
    },
    notes:
      "Multi-finger hands look impressive, but in industry they’re less common than parallel or vacuum.\nIndustry usually chooses reliability and speed.",
  },

  // 15 — TOOL EOAT
  {
    type: "bullets",
    hud: "EOAT",
    title: "Tool end effectors (very common in industry)",
    bullets: [
      "Welding torch (arc/spot welding) → consistent weld quality and speed",
      "Paint gun (spray painting) → uniform coating and safer working conditions",
      "Screwdriver (assembly) → repeatable torque and fast cycle times",
      "Dispensing (glue / sealant) → controlled bead width and placement",
      "Sanding / polishing / deburring → consistent finish and force",
    ],
    notes:
      "Many industrial robots don’t ‘grab’ parts—they perform a process.\nWelding and painting are classic examples because they are repetitive and hazardous for humans.",
  },

  // 16 — EOAT RULE
  {
    type: "bullets",
    hud: "EOAT",
    title: "EOAT selection (simple rule)",
    bullets: [
      "Pick EOAT based on: object + process + environment (dust, oil, heat, cleanliness)",
      "Ask: Do we need force control? high speed? high reliability? no contamination?",
      "Common failure: great robot arm + wrong EOAT → slipping, dropping, or damaging parts",
    ],
    notes:
      "A strong arm won’t help if the gripper slips or damages parts.\nIn real projects, EOAT is often the hardest practical engineering.",
  },

  // 17 — QUIZ #2 (MCQ — correct schema)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quick quiz #2 (EOAT)",
    question:
      "You must pick 500 flat cardboard boxes from a conveyor—fast. Best EOAT?",
    questionSay:
      "Quick quiz. You need to pick 500 flat cardboard boxes fast from a conveyor. What end effector should you choose?",
    options: [
      { choice: "A", label: "Vacuum cups" },
      { choice: "B", label: "5-finger hand" },
      { choice: "C", label: "Magnetic gripper" },
      { choice: "D", label: "Welding torch" },
    ],
    correct: "A",
    explain:
      "Vacuum is fast and common in packaging. A multi-finger hand is overkill. Magnetic is for steel parts. A welding torch isn’t for gripping.",
    notes:
      "Correct answer is A. Vacuum is the industry default for boxes and flat objects (as long as the surface allows a seal).",
  },

  // 18 — SENSORS INTRO
  {
    type: "bullets",
    hud: "Sensors",
    title: "Sensors: internal vs external",
    bullets: [
      "Internal (proprioceptive): joint position, velocity, torque (robot senses itself)",
      "External (exteroceptive): cameras, LiDAR, proximity sensors (robot senses the world)",
      "Internal sensors are required for stable joint control (servo loop)",
      "External sensors enable autonomy and flexibility when the environment is not fixed",
    ],
    notes:
      "Internal sensors help the robot control itself.\nExternal sensors help the robot understand the environment.\nFactory robots rely heavily on internal sensors; mobile robots rely heavily on external sensors too.",
  },

  // 19 — ENCODERS
  {
    type: "bullets",
    hud: "Sensors",
    title: "Encoders (the #1 sensor in robot joints)",
    bullets: [
      "Encoder measures joint position (angle for revolute, distance for prismatic)",
      "Used for closed-loop control → accuracy and repeatability",
      "Without position feedback, the controller cannot correct error reliably",
    ],
    notes:
      "If the robot doesn’t know where the joint is, it cannot control accurately.\nThat’s why encoders are everywhere in robotic joints.",
  },

  // 20 — ENCODER IMAGE (LOCAL)
  {
    type: "two-col",
    hud: "Sensors",
    title: "How optical encoders measure rotation (basic idea)",
    left: {
      bullets: [
        "A disk has patterns/tick marks and a sensor reads them as the disk turns",
        "As marks pass, the sensor output changes (pulses or codes)",
        "**Incremental**: counts pulses → change in position (relative motion)",
        "**Absolute**: outputs a unique code → true angle at every position",
        "More marks/tracks → higher **resolution** (finer measurement)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "./courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/encoders.png",
        source: "encoders.png (incremental vs absolute concept).",
      },
    },
    notes:
      "Simplest explanation: it’s like counting ticks on a wheel.\nMore ticks means finer resolution and better accuracy.",
  },

  // 21 — INCREMENTAL vs ABSOLUTE
  {
    type: "bullets",
    hud: "Sensors",
    title: "Incremental vs Absolute encoders",
    bullets: [
      "Incremental: measures **change** in position by counting pulses (relative)",
      "Absolute: provides a **position code** (true angle) at each instant",
      "Incremental commonly uses A/B signals (quadrature) to detect **direction**",
      "Most industrial robots prefer Absolute (position is known after power cycle)",
      "Incremental often requires homing on startup (find a reference/index)",
    ],
    notes:
      "Incremental is cheaper but doesn’t know absolute position after power-off.\nAbsolute encoders are common in robot joints because they reduce homing issues.",
  },

  // 22 — QUIZ #3
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quick quiz #3 (encoders)",
    question: "Which encoder type usually needs homing after power-off?",
    questionSay:
      "Quick quiz. After a power-off, which encoder type usually needs homing to recover position?",
    options: [
      { choice: "A", label: "Absolute encoder" },
      { choice: "B", label: "Resolver" },
      { choice: "C", label: "Incremental encoder" },
      { choice: "D", label: "Potentiometer" },
    ],
    correct: "C",
    explain:
      "Incremental encoders track change, not absolute position. After power-off, they don’t know the true position, so systems often home to a reference.",
    notes:
      "Correct answer is C. Incremental encoders need a reference after power cycles; absolute encoders store a unique position code.",
  },

  // 23 — CAMERAS
  {
    type: "two-col",
    hud: "Sensors",
    title: "Cameras (vision makes robots flexible)",
    left: {
      bullets: [
        "2D camera: detection, inspection, guidance (where is the part?)",
        "Depth camera: distance + 3D perception (where is it in 3D?)",
        "Common use: pick parts that are not perfectly located or oriented",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://en.ids-imaging.com/assets/images/q/ids-nxt-industrial-camera-artificial-intelligence-apple-detection-2khhycmndqnz3c3.webp",
        source: "en.ids-imaging.com, Robot vision module over a conveyor.",
      },
    },
    notes:
      "Vision lets robots adapt when the world isn’t perfectly fixed.\nIt’s a big step from pure repeatability to flexible automation.",
  },

  // 24 — LIDAR
  {
    type: "two-col",
    hud: "Sensors",
    title: "LiDAR / laser scanners (common in mobile robots)",
    left: {
      bullets: [
        "Measures distance by scanning with a laser (range measurements)",
        "Used for mapping (SLAM), localization, and obstacle avoidance",
        "In industry, safety laser scanners can create safety zones around machines",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://m.media-amazon.com/images/I/51OQhsl2KhL._AC_SL1000__.jpg",
        source: "https://www.u-buy.com.au, laser scanner.",
      },
    },
    notes:
      "In warehouses and hospitals, LiDAR/laser scanners are a big part of autonomy.\nThey help answer: where am I, and what’s in my way?",
  },

  // 25 — FORCE/TORQUE
  {
    type: "two-col",
    hud: "Sensors",
    title: "Force/Torque sensing (for contact tasks)",
    left: {
      bullets: [
        "Measures forces + torques (often 6-axis) at the wrist or tool",
        "Used for insertion, assembly, polishing, collaboration (safe contact)",
        "Enables compliant motion (adjust force) instead of rigid pushing",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/6-Komponenten-Kraft-Momenten-Sensor.svg",
        source: "6-axis force/torque sensing concept diagram.",
      },
    },
    notes:
      "If the robot must touch something carefully, force feedback matters.\nThis is key for modern assembly and human-robot collaboration.",
  },

  // 26 — QUIZ #4
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quick quiz #4 (sensors)",
    question: "Which sensor is MOST critical for accurate joint control?",
    questionSay:
      "Quick quiz. Which sensor is most critical for accurate joint control in a servo loop?",
    options: [
      { choice: "A", label: "Camera" },
      { choice: "B", label: "Microphone" },
      { choice: "C", label: "GPS" },
      { choice: "D", label: "Encoder" },
    ],
    correct: "D",
    explain:
      "Encoders (or resolvers) provide joint position feedback used in the servo control loop. Cameras help perception, but not the basic joint servo loop.",
    notes:
      "Correct answer is D. Without joint position feedback, the controller cannot correct error accurately.",
  },

  // 27 — ACTUATORS INTRO
  {
    type: "bullets",
    hud: "Actuators",
    title: "Actuators: what makes the robot move?",
    bullets: [
      "Actuators generate motion/force at joints (the “muscles” of the robot)",
      "Electric (most common in industrial arms) → precise servo control",
      "Pneumatic (very common for grippers) → fast on/off motion",
      "Hydraulic → very high force for heavy-duty machines",
    ],
    notes:
      "For industrial robot joints, electric motors dominate.\nPneumatics are everywhere in grippers.\nHydraulics show up when very high forces are needed.",
  },

  // 28 — ELECTRIC ACTUATION
  {
    type: "bullets",
    hud: "Actuators",
    title: "Electric actuation (most common today)",
    bullets: [
      "Uses electric motors + drives (often servo systems with feedback)",
      "Motor drives often use **PWM** switching to control speed/torque efficiently",
      "Advantages: clean (no fluid leaks), reliable, good for precise positioning",
      "Often uses gearboxes for torque + brakes for safe holding if power is lost",
      "Tradeoff: lower stiffness than hydraulics; gearboxes add weight",
    ],
    notes:
      "Electric motors are easy to control precisely using encoders.\nTo get high torque, we add gear reduction, and we add brakes for safe holding if power is lost.",
  },

  // 28b — MOTOR TYPES (OVERVIEW)  [NEW]
  {
    type: "bullets",
    hud: "Actuators",
    title: "Types of electric motors (quick reference)",
    bullets: [
      "**Brushed DC**: simple + cheap, but brushes wear (sparks/heat possible)",
      "**Brushless DC (BLDC)**: efficient + low maintenance, needs electronic drive",
      "**Stepper**: moves in fixed steps; can be open-loop if it doesn’t miss steps",
      "**AC motors**: robust; speed tied to AC frequency unless using a drive (VFD)",
      "**Servo**: motor + sensor + electronics so you can command position/speed/torque",
    ],
    notes:
      "These are the same categories the previous prof highlighted—kept short as a reference.",
  },

  // 28c — BRUSHED DC (WITH IMAGE)  [NEW]
  {
    type: "two-col",
    hud: "Actuators",
    title: "Brushed DC motor (coils + commutator + brushes)",
    left: {
      bullets: [
        "Runs on a **DC** power source (fixed voltage level)",
        "Uses a **commutator + brushes** to switch current in the rotor coils",
        "Pros: cheap, simple to power/control (basic driver can work)",
        "Cons: brushes wear → maintenance; can create heat/sparking",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "./courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/Motor_Commutators.jpg",
        source:
          "Wikimedia Commons: Brushed DC motor assembly (shows rotor/armature and brushes).",
      },
    },
    notes:
      "You asked for an image showing coils/brushes—this one clearly shows the internal parts.",
  },

  // 28d — BLDC + STEPPER  [NEW]
  {
    type: "bullets",
    hud: "Actuators",
    title: "Brushless DC (BLDC) vs Stepper (what to remember)",
    bullets: [
      "**BLDC**: DC supply + electronic commutation (drive required) → efficient and durable",
      "BLDC has less wear (no brushes) and typically runs cooler than brushed DC",
      "**Stepper**: rotates in **fixed steps** (often ~200 steps/rev in common motors)",
      "Stepper can be open-loop if it never misses steps, but torque drops at high speed",
    ],
    notes:
      "Matches the PDF intent but keeps it short for your deck style.",
  },

  // 28e — AC + SERVO  [NEW]
  {
    type: "bullets",
    hud: "Actuators",
    title: "AC motors vs Servo motors (where you’ll see them)",
    bullets: [
      "**AC motors**: robust; often fixed speed unless controlled by a VFD/drive",
      "AC motors tend to require less maintenance than brushed DC in many cases",
      "**Servo motor/system**: motor + sensor (encoder/resolver) + electronics/drive",
      "Servos are common in robot joints because they support accurate **closed-loop** control",
    ],
    notes:
      "This keeps the message consistent: a servo is a controlled motor system, not just a motor.",
  },

  // 29 — PNEUMATICS
  {
    type: "two-col",
    hud: "Actuators",
    title: "Pneumatics (common for simple motions)",
    left: {
      bullets: [
        "Uses pressurized air → cylinders/grippers apply force",
        "Advantages: reliable, inexpensive, simple on/off control",
        "Disadvantages: noisy and needs compressed air supply",
        "Low stiffness (air compresses) → lower accuracy in positioning",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F0c%2F03%2Fce%2F0c03ce58bab8ae3cc46386187885e71b.gif&f=1&nofb=1&ipt=f20d3beb34f7ec58cc18c89579dff69a17a3305197fee9f1cae438fe43033cfb",
        source: "Pneumatic gripper example.",
      },
    },
    notes:
      "If you only need open/close or extend/retract, pneumatics are great.\nBut for accurate positioning, electric servo systems are better.",
  },

  // 30 — HYDRAULICS
  {
    type: "bullets",
    hud: "Actuators",
    title: "Hydraulics (high force, heavy machines)",
    bullets: [
      "Uses pressurized liquid → very high forces and very high stiffness",
      "Advantages: strong for large robots; can maintain position under heavy loads",
      "High power-to-weight ratio (lots of force for the size)",
      "Disadvantages: leaks/maintenance; susceptible to contamination (dirty fluid)",
      "Very low compliance (not “soft”) → safe contact is harder",
    ],
    notes:
      "Hydraulics are powerful, but messy and maintenance-heavy.\nThat’s why many modern robots prefer electric unless they truly need extreme force.",
  },

  // 31 — TRANSMISSIONS
  {
    type: "bullets",
    hud: "Transmissions",
    title: "Transmission: why we need it",
    bullets: [
      "Motor speed is high; joint speed is lower → transmission matches speed/torque",
      "Gear reduction trades speed for torque (very common in robot joints)",
      "Transmission can transmit motion using belts/chains/cables/pulleys/linkages",
      "Some mechanisms convert motion type: rotation → linear (rack/pinion, ball screw)",
    ],
    notes:
      "A motor alone often doesn’t produce enough torque at the joint.\nTransmission systems match the motor to the real load and motion we want.",
  },

  // 32 — RACK & PINION (GIF)
  {
    type: "two-col",
    hud: "Transmissions",
    title: "Example: rotary → linear (rack & pinion)",
    left: {
      bullets: [
        "Motor rotation drives a small gear (pinion)",
        "Pinion teeth push the rack → linear motion",
        "Common when you want strong, simple linear travel from a rotary motor",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rack_and_pinion_animation.gif",
        source: "Rack & pinion motion (GIF).",
      },
    },
    notes: "This is one classic way to convert rotation into linear travel.",
  },

  // 33 — HARMONIC DRIVE (COMPONENTS + EXPLODED VIEW)  [UPDATED: slide 1 of 2]
  {
    type: "two-col",
    hud: "Transmissions",
    title: "Harmonic drive components (exploded view)",
    left: {
      bullets: [
        "Composed of 3 parts: **Wave generator**, **Flex spline**, **Circular spline**",
        "**Wave generator**: elliptical cam + bearing that creates the deformation",
        "**Flex spline**: thin flexible cup with external teeth",
        "**Circular spline**: rigid ring gear with internal teeth",
        "Flex spline has slightly fewer teeth → very high reduction ratio",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://mechanical-engineering.com/wp-content/uploads/2017/09/harmonic-drive-exploded-view.jpg",
        source:
          "Exploded view: mechanical-engineering.com (download to ./media for offline use if needed).",
      },
    },
    notes:
      "Per your request: one harmonic slide focused on components using the exploded view image.",
  },

  // 34 — HARMONIC DRIVE (MOTION + ADV/DISADV)  [UPDATED: slide 2 of 2]
  {
    type: "two-col",
    hud: "Transmissions",
    title: "Harmonic drive motion + pros/cons (why robots use them)",
    left: {
      bullets: [
        "How it works: wave generator deforms the flex spline so teeth engage in two regions",
        "Because tooth counts differ, each wave rotation advances the spline by a small amount",
        "**Advantages**: high reduction ratio, backlash-free, high accuracy, compact/lightweight, quiet",
        "**Disadvantages**: torque ripple, fairly elastic (“springy”), nonlinear behavior under load",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "./courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/harmonic_drives.gif",
        source: "harmonic_drives.gif (motion animation).",
      },
    },
    notes:
      "Per your request: second harmonic slide shows motion (GIF) plus advantages/disadvantages.",
  },

  // 35 — BALL SCREW (GIF)
  {
    type: "two-col",
    hud: "Transmissions",
    title: "Ball screw: turning rotation into linear motion",
    left: {
      bullets: [
        "Motor rotates a screw; nut travels along the screw → linear travel",
        "Common in linear axes, CNC machines, and precision positioning",
        "High efficiency and good repeatability compared to simple lead screws",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/GearBoxRotLinScrew.gif",
        source: "Rotary-to-linear screw motion (GIF).",
      },
    },
    notes:
      "Whenever you see a linear axis moving smoothly and precisely, there’s often a screw mechanism inside converting motor rotation into straight-line motion.",
  },

  // 36 — QUIZ #5
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quick quiz #5 (transmissions)",
    question: "Why do robot wrists often use harmonic drives?",
    questionSay: "Quick quiz. Why do robot wrists often use harmonic drives?",
    options: [
      {
        choice: "A",
        label: "High reduction ratio + low backlash in a compact size",
      },
      { choice: "B", label: "They are the cheapest option" },
      { choice: "C", label: "They work only with hydraulics" },
      { choice: "D", label: "They increase backlash for safety" },
    ],
    correct: "A",
    explain:
      "Harmonic drives give high reduction with low backlash in a compact package. Low backlash helps accuracy, especially in wrist orientation.",
    notes:
      "Correct answer is A. ‘Compact + high ratio + low backlash’ is the whole reason harmonic drives are everywhere in wrists.",
  },

  // 37 — SERVO = MOTOR + SENSOR + CONTROL
  {
    type: "bullets",
    hud: "Control",
    title: "Servo motor (the key idea)",
    bullets: [
      "Servo = motor + sensor (encoder/resolver) + drive/controller working together",
      "You command: position / speed / torque (the system closes the loop)",
      "Feedback compares desired vs measured → corrects error many times per second",
    ],
    notes:
      "A servo is not just a motor.\nIt’s a motor system that reaches a target because it measures itself and corrects errors continuously.",
  },

  // 38 — PWM (GIF)
  {
    type: "two-col",
    hud: "Control",
    title: "PWM (simple explanation)",
    left: {
      bullets: [
        "PWM controls average motor voltage/power by switching ON/OFF very fast",
        "Duty cycle = % time ON (higher duty → more average power)",
        "Motor drives use PWM for efficient speed/torque control",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Pwm_duty_cycle.gif",
        source: "PWM duty cycle animation (GIF).",
      },
    },
    notes:
      "PWM is like turning a switch ON/OFF very fast.\nBy changing how long it stays ON, we control average power to the motor.",
  },

  // 39 — CONTROLLER vs PROCESSOR vs SOFTWARE
  {
    type: "bullets",
    hud: "Control",
    title: "Controller vs Processor vs Software (clear roles)",
    bullets: [
      "Software: task logic (sequence, conditions, safety logic → what to do)",
      "Processor: computes motion targets (paths/trajectories → how to move)",
      "Controller: reduces error using feedback so the joint reaches the target",
      "Actuator/Drive: applies power to produce motion (motor current, valve flow)",
    ],
    notes:
      "If you remember one line:\nThe processor calculates what should happen, but the controller makes sure it actually happens using sensor feedback.",
  },

  // 40 — FEEDBACK LOOP (VISUAL)
  {
    type: "two-col",
    hud: "Control",
    title: "Feedback loop (why robots can be accurate)",
    left: {
      bullets: [
        "Controller compares: desired vs measured (sensor feedback)",
        "Error = desired − measured (difference we want to reduce)",
        "Controller adjusts motor command to reduce error (position/speed/torque)",
        "This repeats many times per second → accuracy despite load/friction changes",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://www.electricalvolt.com/wp-content/uploads/2023/04/p101-1024x505.png",
        source: "https://www.electricalvolt.com Closed-loop control.",
      },
    },
    notes:
      "This is the core of robotics control.\nThe robot is constantly correcting itself.\nThat’s how you get repeatability and accuracy even with friction and load changes.",
  },

  // 41 — QUIZ #6
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quick quiz #6 (control)",
    question: "Which component ensures a joint reaches the correct position?",
    questionSay:
      "Quick quiz. Which component ensures a joint reaches the correct position?",
    options: [
      { choice: "A", label: "Actuator" },
      { choice: "B", label: "Processor" },
      { choice: "C", label: "Controller" },
      { choice: "D", label: "End effector" },
    ],
    correct: "C",
    explain:
      "The actuator produces motion, the processor computes the target, but the controller closes the loop and corrects error to ensure the target is reached.",
    notes:
      "Correct answer is C. The controller is the ‘error fixer’—it compares desired vs measured and adjusts the motor command until the error becomes small.",
  },

  // 42 — SUMMARY
  {
    type: "two-col",
    hud: "Summary",
    title: "What you will see most often (industry reality)",
    left: {
      bullets: [
        "Joints: mostly Revolute joints in 6-axis arms (compact + large workspace)",
        "End effectors: parallel grippers + vacuum + process tools (weld/paint/dispense)",
        "Sensors: encoders in every joint; cameras added for flexibility",
        "Actuation: electric servo joints + pneumatic grippers (common combination)",
        "Transmission: gearboxes and harmonic drives to get torque + accuracy",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "./courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/media/Gemini_Generated_Image_robot_structure.png",
        source: "Gemini Generated. robot structure.",
      },
    },
    notes:
      "If you walk into an industrial robotics lab or factory, these are the most common patterns you’ll see.\nEverything else is a variation or a special case.",
  },

  // 43 — EXIT QUESTIONS
  {
    type: "bullets",
    hud: "Exit",
    title: "Exit questions",
    bullets: [
      "Name 2 joint types and say where each is common (arm vs gantry)",
      "Name 2 EOAT types and say what jobs they fit best",
      "Incremental vs absolute: what is the key difference after power-off?",
      "What is the feedback loop doing (in one sentence)?",
    ],
    notes:
      "Before you leave, try answering these in your own words.\nIf you can explain these simply, you understood today’s lecture very well.",
  },
];

export default slidesData;

