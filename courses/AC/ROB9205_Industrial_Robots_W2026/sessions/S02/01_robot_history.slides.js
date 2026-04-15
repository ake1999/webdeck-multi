export const topicMeta = {
  id: "01_robot_history",
  title: "Robot History: From Imagination to Industry",
  duration: 20, // minutes (15–20 min talk)
};

const slidesData = [
  // 0 — TITLE
  {
    type: "title",
    hud: "S01 • Topic 01 • Robot History",
    title: "Robot History",
    subtitle: "From imagination → industry → robots in our daily world",
    meta: "Instructor: Ali Karimzadeh • Email: karimza@algonquincollege.com",
    notes:
      "Alright everyone—let’s do robot history as a story, not a list of dates.\n\nToday I want you to leave with a way of thinking: when you see a robot, you’ll know what questions to ask—without memorizing a timeline.",
  },

  // 1 — MOVIES vs REALITY (pick ONE image per slide for reliability)
  {
    type: "two-col",
    hud: "Hook",
    title: "When you hear “robot”… what do you picture?",
    left: {
      bullets: [
        "Most people imagine a humanoid (movies)",
        "Real robots are often arms, carts, machines",
        "Robot history starts with a better question:",
        "“What do we even mean by a robot?”",
        "Extra examples: factory welding robots, warehouse mobile robots",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/0/05/HONDA_ASIMO.jpg",
        source: "Wikimedia Commons — Honda ASIMO",
      },
      img_hint:
        "Optional alternate image: 'industrial robot welding BMW Leipzig' Wikimedia Commons",
    },
    notes:
      "When most people hear the word robot, they immediately imagine a humanoid: two arms, two legs, maybe a face. That image comes mostly from movies.\n\nBut in real life, if you walk into a factory or a warehouse, the robots you’ll actually see are usually robot arms, mobile carts, or machines that don’t look human at all.\n\nSo the first question in robot history is not “when was the first robot built?” The first question is:\n\n“What do we even mean by a robot?”",
  },

  // 2 — DEFINITION
  {
    type: "two-col",
    hud: "Definition",
    title: "A practical definition of a robot",
    left: {
      bullets: [
        "Sense → Orient → Decide → Act",
        "Some automatic behavior (not every move from a human)",
        "Programmable: change behavior without rebuilding hardware",
        "Autonomy matters more than appearance",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBhgg1C8Y6NyE5nWuBbh_tFfzrlbonrCeTjSIiiOXlaSOhFgkhtxWeUPWPifP08k1iTp82mYQlrF-FZZ9AMCVcggbYh05SRIVFMvl1SJgE80_tqMT3N0RAfOuPa_kw6sQ06pyyv2f3O3RI7hhK3X4E6twkYuRW8UEuSKKJLeR5gxnL5Cu38T8asARf/s2240/The%20OODA%20loop.png",
        source: "https://blogger.googleusercontent.com",
      },
    },
    notes:
      "A simple way to think about it is this: a robot is a machine that can sense, decide, and act—with at least some level of automatic behavior.\n\nAlso, robots are typically programmable, meaning you can change what they do without rebuilding the machine from scratch.",
  },

  // 3 — AUTONOMY SPECTRUM (image only; video is optional)
  {
    type: "two-col",
    hud: "Autonomy",
    title: "Autonomous robot vs remote-controlled tool",
    left: {
      bullets: [
        "Robot vacuum: senses obstacles, decides, moves, cleans",
        "Remote-controlled device: human does the thinking live",
        "Lesson: “robot-ness” is about autonomy, not shape",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/2/20/IRobot_Roomba_870_%2813058836075%29.jpg",
        source: "Wikimedia Commons — iRobot Roomba",
      },
      img_hint:
        "Optional video slide: https://upload.wikimedia.org/wikipedia/commons/9/9d/Roomba_video.ogv",
    },
    notes:
      "This is why something like a robot vacuum can be a robot: it senses walls and obstacles, it makes decisions, and it moves and cleans—without you controlling every second.\n\nAnd this is also why a purely remote-controlled device is a bit different: if a human is doing the “thinking” in real time, the machine is more like a tool than an autonomous robot.",
  },

  // 4 — MYTHS & FEAR
  {
    type: "two-col",
    hud: "Before Engineering",
    title: "The robot idea is older than robotics",
    left: {
      bullets: [
        "Humans imagined artificial life for centuries",
        "Theme: we create a helper… then fear losing control",
        "Robots were linked to labor, power, and anxiety early on",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Frontispiece_to_Frankenstein_1831.jpg",
        source: "Wikimedia Commons — Frankenstein (1831) illustration",
      },
    },
    notes:
      "Now here’s what’s interesting: the idea of robots is way older than real robotics.\n\nHumans have imagined artificial life for centuries. In old stories and myths—like golems, or Frankenstein-type stories—you see the same theme again and again:\n\nWe create a helper…\nthen we worry we’ve created something we can’t control.\n\nSo even before technology, the robot idea was connected to labor, power, and fear of losing control. That emotional side stays with robotics even today, especially when we talk about AI.",
  },

  // 5 — AUTOMATA
  {
    type: "two-col",
    hud: "Automata",
    title: "Automata: lifelike motion without computers",
    left: {
      bullets: [
        "Pure mechanics: gears, springs, cams",
        "Not “useful robots” yet — but a proof of possibility",
        "Machines can produce lifelike motion",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Vaucanson_duck1.jpg",
        source: "Wikimedia Commons — Vaucanson duck (automaton)",
      },
    },
    notes:
      "But humans didn’t only imagine robots—they also tried to build early “living machines” long before computers existed. These were called automata.\n\nAutomata were mechanical devices powered by gears, springs, cams—pure mechanics. One famous example is Vaucanson’s mechanical duck in the 1700s.\n\nThe point isn’t that it was useful like modern robots. The point is that it proved something: machines can produce lifelike motion. That changed what people believed was possible.",
  },

  // 6 — MECHANICAL TURK
  {
    type: "two-col",
    hud: "Illusion vs Intelligence",
    title: "The Mechanical Turk: a key warning",
    left: {
      bullets: [
        "Looked like a thinking machine",
        "Reality: a hidden human operator",
        "Lesson: appearance ≠ intelligence",
        "Simple-looking systems can be truly robotic (and vice versa)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Turk-engraving4.jpg",
        source: "Wikimedia Commons — Mechanical Turk engraving",
      },
    },
    notes:
      "And then there’s another historical event that teaches a really important lesson—something that still matters today: the Mechanical Turk.\n\nThe Mechanical Turk was presented as a chess-playing machine in the 1700s. People were amazed. It looked like a thinking machine. But later it was revealed: it was a trick—a human chess player was hidden inside.\n\nThe lesson is powerful:\nAppearance does not equal intelligence.\nSomething can look like a robot and not be autonomous. Something can look simple and still be truly robotic.",
  },

  // 7 — R.U.R.
  {
    type: "two-col",
    hud: "Culture",
    title: "The word “robot” enters society (R.U.R.)",
    left: {
      bullets: [
        "Robots as cheap workers (not cute helpers)",
        "Automation, jobs, and fear were there from day one",
        "The word came from a story — not engineering",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/R.U.R._by_Karel_%C4%8Capek_1939.jpg/500px-R.U.R._by_Karel_%C4%8Capek_1939.jpg",
        source: "Wikimedia Commons — R.U.R. cover (1920)",
      },
    },
    notes:
      "Now we jump to the early 1900s, when the word “robot” becomes popular through a play called R.U.R. (Rossum’s Universal Robots) by Karel Čapek.\n\nIn that story, robots are not cute helpers—they’re basically cheap workers, built to replace humans. And the story ends with conflict: robots rise up against humanity.\n\nThis matters because it shows something: the word “robot” was not born inside engineering. It was born inside a story about labor and society.\n\nThat’s why, even today, robots are linked to job fears, automation debates, and ethical concerns.",
  },

  // 8 — WHY FACTORIES FIRST
  {
    type: "two-col",
    hud: "Industry",
    title: "Why robots succeeded first in factories",
    left: {
      bullets: [
        "Industry needed repetitive, dangerous, dirty tasks done consistently",
        "Factories are structured environments",
        "Fixed parts + repeated tasks + controlled space",
        "Safety fences + rules + predictable workflows",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/6/67/BMW_Leipzig_MEDIA_050719_Download_Karosseriebau_max.jpg",
        source: "Wikimedia Commons — Industrial robots in BMW Leipzig body shop",
      },
    },
    notes:
      "So by the time we reach the mid-1900s, the world already has stories about artificial workers, fear about control, and mechanical machines that imitate life.\n\nNow engineering starts catching up—and this is where robot history becomes a story of practical needs.\n\nThe first real reason robots succeeded was not because engineers wanted humanoids. It was because industry needed machines that could do repetitive, dangerous, and dirty tasks consistently.\n\nAnd the best place for early robots was the factory. Why?\n\nBecause factories are structured environments:\nparts are placed in fixed positions,\ntasks repeat thousands of times,\nthe environment is controlled,\nyou can put safety fences and rules around the robot.",
  },

  // 9 — MASTER–SLAVE
  {
    type: "two-col",
    hud: "Teleoperation",
    title: "Master–slave manipulators: extending human skill safely",
    left: {
      bullets: [
        "Human moves the “master”",
        "Remote “slave” copies motion",
        "Used in radiation / hazardous environments",
        "Milestone: robot arm as an extension of capability",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/1/16/Mechanical_Arms_Used_in_Hot_Cells_ORNL_Oak_Ridge_%288740233905%29.jpg",
        source: "Wikimedia Commons — Manipulators in hot cells (ORNL)",
      },
    },
    notes:
      "In the 1940s and 1950s, one big step was the development of master–slave manipulators—teleoperated robot arms.\n\nThe human moves one arm (the “master”), and the remote arm (the “slave”) copies it. These were used in dangerous environments—like places with radiation—where you want human skill but you don’t want to risk human life.\n\nNotice something: these systems are not fully autonomous robots. But they are a major milestone because they show the power of the robot arm as an extension of human capability.",
  },

  // 10 — NUMERICAL CONTROL
  {
    type: "two-col",
    hud: "Programmability",
    title: "Numerical control: motion becomes programmable",
    left: {
      bullets: [
        "Machines follow numeric instructions reliably",
        "Once motion is programmable, robots become realistic tools",
        "Foundation for industrial robot control",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Paper_tape_reader_on_a_CNC_control_001.jpg",
        source: "Wikimedia Commons — Paper tape reader on CNC control",
      },
    },
    notes:
      "Next comes a huge turning point: numerical control in manufacturing—machines controlled by numeric instructions.\n\nOnce industry learns that a machine can follow programmed motion reliably, the idea of a programmable robot becomes much more realistic.",
  },

  // 11 — EARLY INDUSTRIAL ROBOTS
  {
    type: "two-col",
    hud: "Industrial Robots",
    title: "Industrial robots become real tools",
    left: {
      bullets: [
        "Early industrial era: programmable manipulators",
        "Robots succeed because they do real jobs reliably",
        "Not humanoids — arms that move tools and parts",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/UNIMATE_PUMA_200_Robot_Arm_%286202074072%29.jpg",
        source: "Wikimedia Commons — Unimate / PUMA robot arm",
      },
    },
    notes:
      "Now we enter the early industrial robot era: people like George Devol, and later companies like Unimation, and the famous installation for General Motors.\n\nThis is the moment when robots become real industrial tools.\n\nAnd again—this is important—these early industrial robots were mostly manipulators. Robot arms.\n\nNot humanoids. Because arms do real factory jobs.",
  },

  // 12 — WHAT THEY DID
  {
    type: "two-col",
    hud: "Factory Tasks",
    title: "Why robot arms dominated",
    left: {
      bullets: [
        "Welding",
        "Painting",
        "Handling & moving heavy parts",
        "Repetitive pick-and-place",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/6/69/ABB_welding_robot.jpg",
        source: "Wikimedia Commons — ABB welding robot",
      },
    },
    notes:
      "Because arms do real factory jobs:\n\nwelding\npainting\nmoving heavy parts\nrepetitive handling\n\nSo the story so far is:\nThe robot concept starts in imagination,\nThen becomes mechanical imitation (automata),\nThen enters society through labor stories (R.U.R.),\nThen becomes practical in factories through arms.",
  },

  // 13 — SENSING (VISION ERA)
  {
    type: "two-col",
    hud: "Sensing",
    title: "Turning point: from repeaters → adapters",
    left: {
      bullets: [
        "Early robots assumed the world never changes",
        "Sensors (especially vision) enable flexibility",
        "Robots start reacting to the environment",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Shakey_the_Robot_%28developed_between_1966-1972_at_SRI_International%29_-_Computer_History_Museum_%282007-11-10_23.16.01_by_Carlo_Nardone%29.jpg",
        source: "Wikimedia Commons — Shakey the Robot (SRI)",
      },
    },
    notes:
      "Now we reach the next big turning point: sensing.\n\nEarly robots were often “blind” in a sense: they repeated a programmed path assuming the world is always the same. That works in a factory if everything is fixed.\n\nBut once you add sensors—especially vision—robots can start reacting to the environment.\n\nThis is huge because it starts moving robots from “repeat the same motion” to “adjust based on what you see.”",
  },

  // 14 — 6 AXES / 6 DOF
  {
    type: "two-col",
    hud: "Kinematics",
    title: "Why 6-axis arms became the industrial standard",
    left: {
      bullets: [
        "6 axes ≈ 6 degrees of freedom",
        "Position in 3D + orientation of the tool",
        "Flexibility is why 6-axis arms dominate industry",
        "Specialized robots also appear (SCARA, etc.)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/6DOF_en.jpg",
        source: "Wikimedia Commons — Six degrees of freedom diagram",
      },
      img_hint:
        "Optional second image (separate slide if you want): PUMA in manufacturing context (Wikimedia Commons)",
    },
    notes:
      "Then in the 1970s, industrial robots evolve strongly:\n\nmore axes,\nbetter control systems,\nand the modern standard appears: the 6-axis articulated robot arm.\n\nWhy six axes? Because with 6 degrees of freedom, a robot can move its tool in 3D space and also orient it. That flexibility is why 6-axis arms dominate industry.\n\nAround this time you also see specialized robots becoming famous:\nPUMA robots as iconic general-purpose arms,\nSCARA robots built for fast planar assembly tasks, especially electronics.",
  },

  // 15 — SHAPE FOLLOWS JOB (SCARA)
  {
    type: "two-col",
    hud: "Form Follows Function",
    title: "Robot shape follows the job (not the movie)",
    left: {
      bullets: [
        "SCARA: fast assembly on a table (planar tasks)",
        "Articulated: flexible 3D positioning",
        "History lesson: pick the robot to match the task",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/2/2d/KUKA_Industrial_Robot_KR10_SCARA.jpg",
        source: "Wikimedia Commons — KUKA KR10 SCARA",
      },
    },
    notes:
      "This teaches another key lesson of robot history:\nRobot shape follows the job.\nNot the movie.\nNot the fantasy.\nThe job.\n\nIf the job is fast assembly on a table, SCARA is great.\nIf the job is flexible 3D positioning around obstacles, articulated arms are great.",
  },

  // 16 — SPEED SPECIALIZATION (DELTA)
  {
    type: "two-col",
    hud: "Speed",
    title: "1990s: specialization gets extreme (Delta robots)",
    left: {
      bullets: [
        "Delta (parallel) robots: very fast pick-and-place",
        "Packaging & food industries love them",
        "Again: shape follows the job",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Robot_delta_FlexPicker_d%27ABB.png",
        source: "Wikimedia Commons — ABB FlexPicker (delta robot)",
      },
    },
    notes:
      "Now the story shifts again in the 1990s with two trends:\n\nTrend 1: Speed specialization\nDelta robots become important—parallel robots that can do very fast pick-and-place, especially in packaging and food industries.\n\nAgain: shape follows the job.",
  },

  // 17 — COMPUTING TAKES OVER (no media needed)
  {
    type: "bullets",
    hud: "Software Era",
    title: "Computing takes over",
    bullets: [
      "Controllers become more powerful",
      "Robots coordinate (multi-robot workcells)",
      "Robotics becomes more software-driven",
    ],
    notes:
      "Trend 2: Computing takes over\n\nControl systems become more powerful. Robots start coordinating with each other—two robots working as a team. PC-based controllers become common. Robotics becomes more software-driven.",
  },

  // 18 — ROBOTS LEAVE FACTORY (AMRs)
  {
    type: "two-col",
    hud: "Leaving the Factory",
    title: "Robots enter the messy real world",
    left: {
      bullets: [
        "Factories are controlled; the real world is not",
        "Warehouses/hospitals/homes: people move, layouts change",
        "Now the hard problem is perception + navigation",
        "This is where AI matters",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/d/db/Amazon_warehouse_robot_2020.JPG",
        source: "Wikimedia Commons — Warehouse mobile robot",
      },
      img_hint:
        "Optional video slide (separate): Fanuc robot sorting in Amazon fulfillment center (webm on Wikimedia)",
    },
    notes:
      "And this sets up the modern era: robots leaving the factory.\n\nFactories are controlled.\nThe real world is not.\n\nOnce robots go into warehouses, hospitals, homes, streets—everything changes:\npeople move,\nobstacles appear,\nlighting changes,\nobjects are not placed perfectly,\nenvironments are messy.\n\nSo service and mobile robots depend heavily on:\nbetter sensors,\nbetter computing,\nand increasingly AI.\n\nThat’s why robot definitions keep changing. As robots gain more autonomy and intelligence, we keep updating what we mean by “robot” and what we expect from them.",
  },

  // 19 — MODERN CATEGORIES (COBOTS)
  {
    type: "two-col",
    hud: "Today",
    title: "Two modern categories you’ll see everywhere",
    left: {
      bullets: [
        "Collaborative robots (cobots): designed around humans",
        "Autonomous Mobile Robots (AMRs): move through changing environments",
        "Modern robots = software + perception + safety",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/1/16/UR16e_robot_arm.png",
        source: "Wikimedia Commons — Universal Robots UR16e (cobot)",
      },
    },
    notes:
      "And then we reach today’s two very visible modern robot categories:\n\nCollaborative robots (cobots)\nThese are designed around humans—working near humans, force limits, safer interactions, easier programming. Not maximum speed, but safe flexibility.\n\nAutonomous Mobile Robots (AMRs)\nThese robots navigate and move materials in warehouses and hospitals. Their main problem isn’t “move an arm precisely.” Their main problem is “understand and move through a changing environment.”",
  },

  // 20 — HUMANOIDS ARE HARD
  {
    type: "two-col",
    hud: "Humanoids",
    title: "Humanoids: exciting… and very hard",
    left: {
      bullets: [
        "Walking needs balance + continuous control",
        "Unstructured environments are unpredictable",
        "That’s why industry chose reliability first",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Honda_E0_front-left_Honda_Collection_Hall.jpg",
        source: "Wikimedia Commons — Honda E0 early biped robot",
      },
    },
    notes:
      "Then in the 1980s, you start seeing humanoid research become serious—like Honda’s early biped work (E0).\n\nThis is exciting, but it’s also a reminder: humanoids are hard. Walking requires balance, continuous control, and dealing with unpredictable environments.\n\nThat’s why humanoids were not the main industrial path. Industry chose what was reliable and cost-effective.",
  },

  // 21 — WRAP-UP
  {
    type: "bullets",
    hud: "Wrap-up",
    title: "A simple story of robot history",
    bullets: [
      "Imagination → automata → labor stories",
      "Factories first (structured world)",
      "Sensing + computing → adaptable robots",
      "Robots now operate in messy human environments",
    ],
    notes:
      "So if I summarize robot history in a simple story, it’s this:\n\nHumans imagined artificial life long before engineering.\n\nAutomata proved machines can mimic lifelike motion.\n\nThe word “robot” entered society through labor and fear narratives.\n\nRobots became real first in factories because factories are structured.\n\nSensing and computing turned robots from repeaters into adapters.\n\nModern robots are increasingly software + perception systems, operating in messy human environments.",
  },

  // 22 — FINAL QUESTION
  {
    type: "bullets",
    hud: "Takeaway",
    title: "The 4 questions that beat memorizing dates",
    bullets: [
      "What does it sense?",
      "How does it decide?",
      "How does it act?",
      "Structured environment… or messy environment?",
    ],
    notes:
      "And I’ll end with a question that connects history to your future learning:\n\nWhen you see a robot, don’t ask: “Does it look like a robot?”\nAsk:\nWhat does it sense?\nHow does it decide?\nHow does it act?\nAnd what environment is it built for—structured or messy?\n\nIf you can answer those four things, you’ll understand robots better than most people—even without memorizing a single date.",
  },
];

export default slidesData;

