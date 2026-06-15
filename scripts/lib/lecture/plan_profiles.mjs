function uniqueStrings(...groups) {
  return [...new Set(groups.flat().map((item) => String(item || "").trim()).filter(Boolean))];
}

function humanizeTopicId(value) {
  return String(value || "")
    .replace(/^\d+_/, "")
    .replaceAll("_", " ")
    .trim();
}

function mergeArc(base = {}, extra = {}) {
  return {
    entry_point: String(extra.entry_point || base.entry_point || "").trim(),
    progression: String(extra.progression || base.progression || "").trim(),
    destination: String(extra.destination || base.destination || "").trim(),
    tone: String(extra.tone || base.tone || "").trim(),
    methods: uniqueStrings(base.methods || [], extra.methods || []),
  };
}

const COURSE_PROFILES = {
  AC: {
    audience_level: "undergraduate industrial robotics students preparing for labs, robot selection, and basic programming decisions",
    style_notes: [
      "Keep the tone practical and shop-floor oriented.",
      "Translate definitions into robot-cell decisions quickly.",
      "Prefer concrete industrial examples over abstract theory when possible.",
    ],
    transition_style: "Move from the industrial question students would ask on the job to the next specification, control, or programming choice they need to make.",
    scene_policy_default: "minimal",
    object_policy_default: "suggested",
    topic_defaults: {
      voice_style: "clear_teacher",
      tone: "clear_teacher",
      energy: 0.58,
      pace: 0.95,
      attention_mode: "slide_focus",
      scene_policy: "minimal",
      avatar_anchor: "right_bottom",
      autoplay: false,
    },
    teaching_arc: {
      entry_point: "Start from a practical industrial question or lab task.",
      progression: "Move from intuition to the technical details students need to make a correct robotics decision.",
      destination: "End with a rule of thumb students can use in lab, on a test, or in robot-cell planning.",
      tone: "practical, steady, instructor-like",
      methods: ["intuition", "compare/contrast", "guided practice", "recap"],
    },
  },
  UO: {
    audience_level: "introductory autonomous mobile robotics students learning ROS 2 through lab-first workflows",
    style_notes: [
      "Keep the tone hands-on and confidence-building.",
      "Connect every concept to what students will debug in a terminal, simulation, or robot lab.",
      "Use visualization and mental models before deep command details.",
    ],
    transition_style: "Move from the mental model to the concrete lab step students will run next, then close each section by explaining what to verify.",
    scene_policy_default: "minimal",
    object_policy_default: "suggested",
    topic_defaults: {
      voice_style: "clear_teacher",
      tone: "clear_teacher",
      energy: 0.58,
      pace: 0.96,
      attention_mode: "slide_focus",
      scene_policy: "minimal",
      avatar_anchor: "right_bottom",
      autoplay: false,
    },
    teaching_arc: {
      entry_point: "Start from the lab outcome students are trying to achieve.",
      progression: "Build the mental model first, then show the commands, files, or tools that make it real.",
      destination: "End with students knowing what success should look like and where they will likely debug first.",
      tone: "supportive, visual, hands-on",
      methods: ["mental model", "guided build", "debugging checkpoints", "recap"],
    },
  },
  AU: {
    audience_level: "first-year university and advanced high-school students learning calculus through visual intuition, formulas, and guided practice",
    topic_takeaways: [
      "Students should connect the visual intuition to the formal calculus statement.",
      "Students should practice reading formulas, graphs, and units together.",
      "Students should leave with one method they can apply to a new problem.",
    ],
    style_notes: [
      "Keep the tone personal, warm, and precise, as if teaching directly to a YouTube viewer.",
      "On the first slide, introduce the instructor as Arian from Arian University once, then move quickly into the mathematical hook.",
      "On learning-objective slides, orient students on the course roadmap/progress visual before listing what the topic covers.",
      "Make the course feel intentionally managed: name where this topic sits, what came immediately before, and what comes next when the roadmap shows it.",
      "Move between graph, formula, and plain-language interpretation instead of staying in only one representation.",
      "Use student-prediction moments before revealing a rule, limit, derivative, or integral conclusion.",
    ],
    transition_style: "Move from a visual question to the formal calculus language, then close with a tiny test students can try immediately.",
    scene_policy_default: "hybrid",
    object_policy_default: "suggested",
    topic_defaults: {
      voice_style: "clear_teacher",
      tone: "clear_teacher",
      energy: 0.6,
      pace: 0.94,
      attention_mode: "hybrid_focus",
      scene_policy: "hybrid",
      avatar_anchor: "right_bottom",
      autoplay: false,
    },
    teaching_arc: {
      entry_point: "Start from a concrete graph, motion, area, or change question students can see.",
      progression: "Build intuition first, introduce notation second, and use guided checks to make the idea feel usable.",
      destination: "End with students able to explain the concept in words and apply it to a nearby problem.",
      tone: "warm, visual, rigorous without intimidation",
      methods: ["visual intuition", "formalize", "guided prediction", "worked reasoning", "recap"],
    },
  },
  "UO/MCG5353_Robotics_W2026": {
    audience_level: "undergraduate mechanical engineering students learning robotics fundamentals, modeling, control, sensing, and robot-system reasoning",
    style_notes: [
      "Keep the tone conceptually clear and engineering-focused.",
      "Connect equations and definitions to robot behavior students can visualize or test.",
      "Move from physical intuition to formal representation before asking students to calculate.",
    ],
    transition_style: "Move from the robot behavior students can picture to the model, equation, or design decision that explains it.",
    scene_policy_default: "minimal",
    object_policy_default: "suggested",
    topic_defaults: {
      voice_style: "clear_teacher",
      tone: "clear_teacher",
      energy: 0.58,
      pace: 0.94,
      attention_mode: "slide_focus",
      scene_policy: "minimal",
      avatar_anchor: "right_bottom",
      autoplay: false,
    },
    teaching_arc: {
      entry_point: "Start from an observable robot behavior, task, or engineering question.",
      progression: "Build intuition first, then introduce the mathematical or computational representation needed to reason precisely.",
      destination: "End with a reusable robotics principle students can apply in analysis, design, or implementation.",
      tone: "clear, rigorous, supportive",
      methods: ["physical intuition", "define then formalize", "worked reasoning", "recap"],
    },
  },
};

const TOPIC_PROFILES = {
  "01_course_intro_and_expectations": {
    topic_goal: "Align students on how the industrial robotics course works, what the labs expect, and what successful participation looks like.",
    topic_takeaways: [
      "Students should know how lectures, labs, and evaluation fit together.",
      "Students should understand the level of professionalism expected in robotics labs.",
      "Students should leave knowing the habits that will help them succeed in the course.",
    ],
    teaching_arc: {
      entry_point: "Start by framing the course as applied robotics training, not just a sequence of slides.",
      progression: "Move through expectations, course structure, lab behavior, and how students should approach the semester.",
      destination: "Students should finish with a clear picture of the course rhythm and the mindset needed for safe, effective labs.",
      tone: "welcoming, practical, expectation-setting",
      methods: ["overview", "examples", "norm-setting", "recap"],
    },
    style_notes: [
      "Be encouraging but clear about responsibility.",
      "Translate logistics into why they matter for lab quality and teamwork.",
    ],
    transition_style: "Move from why the course matters to how students will work, then to how they will be evaluated and supported.",
    object_policy_default: "none",
  },
  "02_robot_safety": {
    topic_goal: "Make students treat robot safety as an operating discipline rather than a checklist they memorize once.",
    topic_takeaways: [
      "Students should recognize the main sources of industrial robot risk.",
      "Students should understand how safeguarding, procedures, and behavior work together.",
      "Students should leave with a few non-negotiable habits they can apply in lab immediately.",
    ],
    teaching_arc: {
      entry_point: "Start from the idea that industrial robots are powerful, predictable machines only when the human system around them is disciplined.",
      progression: "Move from hazard recognition to safeguards, procedures, and concrete lab behavior.",
      destination: "Students should be able to explain what makes a robot cell safe and what unsafe behavior looks like.",
      tone: "serious, clear, non-dramatic",
      methods: ["hazard framing", "cause-and-effect", "lab examples", "recap"],
    },
    style_notes: [
      "Use firm language when explaining consequences.",
      "Keep props minimal so the instructor presence stays central.",
    ],
    transition_style: "Escalate from what can go wrong to what prevents it, then reinforce the operating rules students must carry into lab.",
    scene_policy_default: "none",
    object_policy_default: "none",
    topic_defaults: {
      voice_style: "serious_clear",
      tone: "serious_clear",
      energy: 0.5,
      pace: 0.92,
      attention_mode: "slide_focus",
      scene_policy: "none",
      avatar_anchor: "right_bottom",
      autoplay: false,
    },
  },
  "01_robot_history": {
    topic_goal: "Show how industrial robots evolved so students understand why modern architectures, applications, and design trade-offs look the way they do.",
    topic_takeaways: [
      "Students should connect major robot milestones to manufacturing needs.",
      "Students should see how robot capability expanded with better control, sensing, and mechanics.",
      "Students should leave understanding that robot design choices follow application pressure, not fashion.",
    ],
    teaching_arc: {
      entry_point: "Start from the question of why robots appeared in manufacturing at all.",
      progression: "Move chronologically, but keep tying each milestone to a technical or economic need.",
      destination: "Students should finish with a usable story of how industrial robotics developed into current robot families.",
      tone: "story-driven, practical, lightly comparative",
      methods: ["timeline", "cause-and-effect", "compare/contrast", "recap"],
    },
    style_notes: [
      "Tell history as engineering motivation, not trivia.",
      "Use transitions that connect each era to the next capability jump.",
    ],
    transition_style: "Each slide should answer what changed, why it changed, and what new capability that unlocked.",
  },
  "02_robot_components": {
    topic_goal: "Help students see an industrial robot as a coordinated system of mechanical, electrical, sensing, and control components.",
    topic_takeaways: [
      "Students should identify the main subsystems inside a robot cell.",
      "Students should understand how controllers, actuators, sensors, and end effectors interact.",
      "Students should be able to explain how component choices affect robot behavior in practice.",
    ],
    teaching_arc: {
      entry_point: "Start by treating the robot as a system rather than just an arm.",
      progression: "Move through the main components, then connect each one to its practical role in the cell.",
      destination: "Students should leave with a whole-system mental model they can reuse in later control, sensing, and programming topics.",
      tone: "clear, system-level, practical",
      methods: ["define then example", "system walkthrough", "visual intuition", "recap"],
    },
    style_notes: [
      "Keep linking parts back to their practical function.",
      "Use visuals to show how energy, signals, and motion move through the system.",
    ],
  },
  "03_robot_characteristics_manipulator_types": {
    topic_goal: "Teach students to read robot specifications like engineers and to match manipulator families to real task constraints.",
    topic_takeaways: [
      "Students should distinguish key datasheet terms such as payload, reach, workspace, accuracy, and repeatability.",
      "Students should understand how manipulator geometry changes workspace and best-fit applications.",
      "Students should be able to justify a robot choice using task, workspace, and performance trade-offs.",
    ],
    teaching_arc: {
      entry_point: "Start from a realistic robot-selection decision instead of starting with vocabulary in isolation.",
      progression: "Move through the specification terms students need first, then compare manipulator families by workspace and use case.",
      destination: "Students should finish able to explain both what the main specs mean and which manipulator type fits a given task.",
      tone: "practical, decision-oriented, visually intuitive",
      methods: ["guided selection", "compare/contrast", "visual intuition", "practice", "recap"],
    },
    style_notes: [
      "Make the slide-to-slide flow feel like the next question an engineer asks while reading a datasheet.",
      "Use clear contrast wording when comparing reach, workspace, accuracy, and manipulator families.",
      "Bring in spatial props only when they materially improve intuition.",
    ],
    transition_style: "Treat the lesson like a robot-selection walkthrough: define the metric, remove a likely confusion, then use it to compare manipulator options.",
    scene_policy_default: "minimal",
    object_policy_default: "suggested",
  },
  "01_final_project_ideas": {
    topic_goal: "Help students move from vague project enthusiasm to scoped, feasible industrial robotics project concepts.",
    topic_takeaways: [
      "Students should understand what makes a project feasible within the course timeline.",
      "Students should be able to connect a project idea to task, risk, resources, and evaluation.",
      "Students should leave with criteria for improving or rejecting a weak project idea.",
    ],
    teaching_arc: {
      entry_point: "Start from the excitement of project ideas, then immediately connect that excitement to scope and feasibility.",
      progression: "Move through candidate themes, evaluation criteria, and examples of stronger versus weaker project framing.",
      destination: "Students should finish with a realistic lens for selecting and refining their final project idea.",
      tone: "encouraging, practical, coaching-oriented",
      methods: ["project framing", "compare/contrast", "guided decision", "recap"],
    },
    style_notes: [
      "Sound supportive, but keep feasibility standards clear.",
      "Emphasize decisions, trade-offs, and scope boundaries.",
    ],
    object_policy_default: "none",
  },
  "02_fanuc_lab_guide": {
    topic_goal: "Give students a reliable mental and procedural map for working through the Fanuc lab safely and efficiently.",
    topic_takeaways: [
      "Students should know the order of the main Fanuc lab steps.",
      "Students should know what to verify before moving to the next step.",
      "Students should understand the common procedural mistakes that slow labs down.",
    ],
    teaching_arc: {
      entry_point: "Start from the lab workflow students are about to perform.",
      progression: "Move step by step through setup, execution, and checks without drifting into unnecessary theory.",
      destination: "Students should finish with a practical sequence they can follow during the lab.",
      tone: "procedural, calm, confidence-building",
      methods: ["guided walkthrough", "checkpoints", "caution", "recap"],
    },
    style_notes: [
      "Keep explanations efficient and action-oriented.",
      "Use caution language around steps students often rush.",
    ],
    transition_style: "Move from one lab checkpoint to the next, always explaining what students should confirm before continuing.",
    scene_policy_default: "none",
    object_policy_default: "none",
    topic_defaults: {
      voice_style: "serious_clear",
      tone: "serious_clear",
      energy: 0.52,
      pace: 0.92,
      attention_mode: "slide_focus",
      scene_policy: "none",
      avatar_anchor: "right_bottom",
      autoplay: false,
    },
  },
  "01_open_vs_closed_loop": {
    topic_goal: "Build a strong intuition for why feedback changes control quality and when open-loop control stops being trustworthy.",
    topic_takeaways: [
      "Students should distinguish open-loop and closed-loop control clearly.",
      "Students should understand why disturbance rejection and correction require feedback.",
      "Students should be able to explain when open-loop control is acceptable and when it is risky.",
    ],
    teaching_arc: {
      entry_point: "Start from the everyday question of whether the system knows what actually happened.",
      progression: "Define the two control styles, compare them, and then connect them to robotics consequences.",
      destination: "Students should finish with a practical test for deciding whether feedback matters in a given system.",
      tone: "conceptual, comparative, example-driven",
      methods: ["definition", "compare/contrast", "examples", "recap"],
    },
    style_notes: [
      "Keep returning to the question of disturbance and correction.",
      "Use simple examples before formal robotics wording.",
    ],
  },
  "02_coordinates_motion_termination": {
    topic_goal: "Help students understand how coordinate choices, motion commands, and termination settings shape actual robot movement.",
    topic_takeaways: [
      "Students should distinguish common coordinate systems used in robot programming.",
      "Students should understand what motion termination changes physically.",
      "Students should be able to predict when a motion command will look smooth, slow, or precise.",
    ],
    teaching_arc: {
      entry_point: "Start from the programmer's question: why did the robot move that way?",
      progression: "Move from coordinate frames to motion semantics to termination behavior.",
      destination: "Students should finish with a stronger mental model for reading and writing motion instructions.",
      tone: "practical, motion-aware, visual",
      methods: ["visual intuition", "compare/contrast", "lab interpretation", "recap"],
    },
    style_notes: [
      "Use movement language students can picture physically.",
      "Make the connection between programming terms and visible robot behavior explicit.",
    ],
  },
  "01_sensors_complete": {
    topic_goal: "Teach students to choose industrial sensors by matching sensing principle to the real detection problem.",
    topic_takeaways: [
      "Students should compare the main industrial sensor families and their trade-offs.",
      "Students should understand how material, range, environment, and mounting affect sensor choice.",
      "Students should be able to justify a sensor selection for a practical cell scenario.",
    ],
    teaching_arc: {
      entry_point: "Start from the practical detection question rather than from sensor names alone.",
      progression: "Define the sensor families, compare how they behave, then test that knowledge on applications.",
      destination: "Students should finish able to explain which sensing principle fits a given manufacturing situation and why.",
      tone: "practical, comparative, application-driven",
      methods: ["classification", "compare/contrast", "application examples", "guided practice"],
    },
    style_notes: [
      "Use material-and-environment trade-offs often.",
      "Keep reminding students that the best sensor is context dependent.",
    ],
  },
  "01_frames_user_frames_fanuc": {
    topic_goal: "Make frames feel intuitive so students can understand and use user frames confidently in Fanuc programming.",
    topic_takeaways: [
      "Students should understand that a frame changes how motion is described, not where the robot physically is.",
      "Students should distinguish world, tool, and user frames.",
      "Students should be able to explain why user frames simplify programming relative to part geometry.",
    ],
    teaching_arc: {
      entry_point: "Start from the confusion students usually feel when the same point can be described in different frames.",
      progression: "Build intuition first, then connect frames to Fanuc programming practice.",
      destination: "Students should finish able to explain and use user frames as a practical programming tool.",
      tone: "visual, intuitive, confidence-building",
      methods: ["mental model", "visual intuition", "Fanuc application", "recap"],
    },
    style_notes: [
      "Use moving-object examples to make frame attachment intuitive.",
      "Pause often to separate physical motion from coordinate description.",
    ],
    scene_policy_default: "minimal",
    object_policy_default: "preferred",
  },
  "01_data_registers": {
    topic_goal: "Show students how data registers make robot programs flexible, parameterized, and easier to debug.",
    topic_takeaways: [
      "Students should understand what data registers store and why that matters.",
      "Students should see how registers connect to offsets, logic, and reusable programs.",
      "Students should be able to explain when using a register is better than hard-coding a value.",
    ],
    teaching_arc: {
      entry_point: "Start from the limitation of hard-coded robot programs.",
      progression: "Introduce data registers as programmable memory, then connect them to practical uses in Fanuc code.",
      destination: "Students should finish seeing registers as a tool for flexibility rather than just another syntax item.",
      tone: "practical, programming-oriented, explanatory",
      methods: ["problem framing", "define then example", "guided code reading", "recap"],
    },
    style_notes: [
      "Explain what changes when a value moves from code into a register.",
      "Keep examples concrete and parameter-driven.",
    ],
  },
  "01_branching_instructions": {
    topic_goal: "Teach students how branching turns a linear robot program into decision-making logic that reacts to conditions.",
    topic_takeaways: [
      "Students should distinguish unconditional flow from condition-based flow.",
      "Students should understand how branching supports error handling, sensing, and process variation.",
      "Students should be able to read and reason about simple Fanuc branching logic.",
    ],
    teaching_arc: {
      entry_point: "Start from the question of what a robot program should do when the world does not match the happy path.",
      progression: "Introduce the branching tools, show how they change flow, then practice reading decisions in context.",
      destination: "Students should finish with a mental model for when and why branching is necessary.",
      tone: "logic-oriented, practical, guided",
      methods: ["problem framing", "flow comparison", "guided practice", "recap"],
    },
    style_notes: [
      "Keep pointing back to real triggers for branches: sensors, errors, and process choices.",
      "Slow down enough that students can follow the flow change mentally.",
    ],
  },
  "01_mobile_robotics_lab_intro_and_expectations": {
    topic_goal: "Orient students to the mobile robotics lab environment, expectations, and the workflow they will reuse across the semester.",
    topic_takeaways: [
      "Students should know how the lab is organized and what success looks like each week.",
      "Students should understand the expectations for preparation, teamwork, and debugging.",
      "Students should leave seeing the course as a build-up toward working mobile robot systems.",
    ],
    teaching_arc: {
      entry_point: "Start from the lab experience students are about to enter.",
      progression: "Move through course rhythm, working norms, tools, and the kinds of outcomes students will build toward.",
      destination: "Students should finish with a clear picture of how to participate effectively in the lab.",
      tone: "welcoming, structured, confidence-building",
      methods: ["overview", "expectation setting", "workflow framing", "recap"],
    },
    object_policy_default: "none",
  },
  "01_ubuntu22_dualboot_install": {
    topic_goal: "Help students install Ubuntu safely and understand why the Linux environment matters for the rest of the ROS 2 workflow.",
    topic_takeaways: [
      "Students should know the key preparation and risk points of dual-boot installation.",
      "Students should understand why a clean Ubuntu environment helps later robotics tooling.",
      "Students should know the checkpoints to verify before and after installation.",
    ],
    teaching_arc: {
      entry_point: "Start from the practical goal of building a reliable development machine.",
      progression: "Walk through preparation, installation, and verification with clear caution points.",
      destination: "Students should finish able to execute the install carefully or identify where they need help before proceeding.",
      tone: "procedural, careful, supportive",
      methods: ["step-by-step", "caution", "checkpoints", "recap"],
    },
    style_notes: [
      "Keep the pacing calm and careful.",
      "Treat risky steps explicitly and avoid rushing past verification.",
    ],
    transition_style: "Move from preparation to installation to post-install checks, always stating what must be verified before the next step.",
    scene_policy_default: "none",
    object_policy_default: "none",
    topic_defaults: {
      voice_style: "serious_clear",
      tone: "serious_clear",
      energy: 0.5,
      pace: 0.92,
      attention_mode: "slide_focus",
      scene_policy: "none",
      avatar_anchor: "right_bottom",
      autoplay: false,
    },
  },
  "02_linux_filesystem_and_terminal_basics": {
    topic_goal: "Give students enough filesystem and terminal fluency that later ROS 2 labs feel manageable instead of overwhelming.",
    topic_takeaways: [
      "Students should understand the basic filesystem layout and navigation commands they will keep using.",
      "Students should be able to move, inspect, and manage files confidently from the terminal.",
      "Students should leave with better debugging habits for path and shell issues.",
    ],
    teaching_arc: {
      entry_point: "Start from the idea that the terminal is the everyday control panel for the robotics workflow.",
      progression: "Introduce the filesystem mental model, then build command confidence through examples and checks.",
      destination: "Students should finish more comfortable navigating and reasoning about their Linux workspace.",
      tone: "supportive, practical, skill-building",
      methods: ["mental model", "guided examples", "practice", "recap"],
    },
    style_notes: [
      "Avoid sounding like a cheat sheet; explain why each command matters.",
      "Use repetition strategically to build confidence.",
    ],
  },
  "01_ros2_humble_install_gazebo_classic_tb3": {
    topic_goal: "Help students build a working ROS 2 Humble plus Gazebo plus TurtleBot3 environment and understand the purpose of each layer.",
    topic_takeaways: [
      "Students should know the main installation steps and dependencies.",
      "Students should understand what ROS 2, Gazebo, and TurtleBot3 each contribute.",
      "Students should know what to verify when the environment is built correctly.",
    ],
    teaching_arc: {
      entry_point: "Start from the full environment students need to run before later labs make sense.",
      progression: "Move through installation and setup, while connecting each tool to the role it will play later.",
      destination: "Students should finish with both a working environment and a better mental model of the software stack.",
      tone: "procedural, motivating, lab-oriented",
      methods: ["stack overview", "step-by-step", "verification", "recap"],
    },
    style_notes: [
      "Keep the procedure moving, but pause on why the pieces belong together.",
      "Treat verification steps as important, not optional.",
    ],
    scene_policy_default: "none",
    object_policy_default: "none",
  },
  "01_ros2_basics_pubsub": {
    topic_goal: "Build a clear mental model of ROS 2 nodes, topics, publishers, and subscribers before students start wiring systems together.",
    topic_takeaways: [
      "Students should understand ROS 2 as message-passing between nodes.",
      "Students should distinguish the roles of publishers, subscribers, and topics.",
      "Students should be able to trace a simple ROS 2 data flow verbally.",
    ],
    teaching_arc: {
      entry_point: "Start from the basic question of how different parts of a robot software system communicate.",
      progression: "Define the core pub-sub objects, show the data flow, then reinforce it with examples and checks.",
      destination: "Students should finish with a working communication mental model they can reuse in every later ROS topic.",
      tone: "clear, system-level, confidence-building",
      methods: ["mental model", "definition", "examples", "recap"],
    },
    style_notes: [
      "Keep the data-flow picture alive throughout the lesson.",
      "Repeat the publisher-topic-subscriber relationship until it feels stable.",
    ],
  },
  "01_urdf_rviz_tf2": {
    topic_goal: "Help students understand how robot description, visualization, and transforms fit together so later debugging feels intuitive instead of mysterious.",
    topic_takeaways: [
      "Students should connect URDF/Xacro, robot_state_publisher, RViz, and TF2 into one pipeline.",
      "Students should understand links, joints, and transform trees as visual reasoning tools.",
      "Students should be able to verify a robot model and inspect transforms with the right tools.",
    ],
    teaching_arc: {
      entry_point: "Start from the visualization outcome students want to see, then explain the chain of files and publishers that makes it appear.",
      progression: "Move from the model description, to launch and visualization, to TF inspection and debugging.",
      destination: "Students should finish able to explain where the robot model in RViz comes from and how to inspect the transform tree behind it.",
      tone: "visual, debugging-oriented, confidence-building",
      methods: ["mental model", "guided build", "visual intuition", "debugging checkpoints", "recap"],
    },
    style_notes: [
      "Keep returning to the visualization pipeline so commands do not feel isolated.",
      "Use scene/object hints only where they clarify frames, links, joints, or transform relationships.",
    ],
    transition_style: "Each section should feel like the next layer of the visualization stack: describe the robot, launch it, inspect it, then debug the transforms behind it.",
    scene_policy_default: "minimal",
    object_policy_default: "suggested",
  },
  "01_launch_params": {
    topic_goal: "Teach students how launch files and parameters help organize ROS 2 systems cleanly and make experiments easier to repeat.",
    topic_takeaways: [
      "Students should understand what a launch file solves that manual terminal commands do not.",
      "Students should understand how parameters change node behavior without editing source code.",
      "Students should be able to explain how launch structure improves repeatability and debugging.",
    ],
    teaching_arc: {
      entry_point: "Start from the pain of manually starting many nodes and editing code just to change a setting.",
      progression: "Introduce launch files and parameters as tools for structure, then show how they fit real workflows.",
      destination: "Students should finish with a practical reason to use launch and parameters instead of treating them as extra syntax.",
      tone: "organizing, practical, workflow-focused",
      methods: ["problem framing", "define then example", "workflow comparison", "recap"],
    },
    style_notes: [
      "Keep the workflow benefit obvious.",
      "Tie each abstraction back to repeatability and easier debugging.",
    ],
  },
  "01_tb3_real_robot_demo": {
    topic_goal: "Connect the simulation-first course material to the behavior and constraints students see on the real TurtleBot3 platform.",
    topic_takeaways: [
      "Students should understand what transfers cleanly from simulation to the real robot and what does not.",
      "Students should see the importance of calibration, sensing limits, and operating discipline on hardware.",
      "Students should leave with a stronger mental bridge between software commands and physical robot behavior.",
    ],
    teaching_arc: {
      entry_point: "Start from the excitement of seeing the real robot move, then immediately connect that excitement to disciplined observation.",
      progression: "Move through hardware realities, demonstrations, and the differences between simulated and real behavior.",
      destination: "Students should finish with a better sense of what changes when the robot leaves simulation and enters the real lab.",
      tone: "engaging, practical, observation-driven",
      methods: ["demo", "compare/contrast", "lab intuition", "recap"],
    },
    style_notes: [
      "Keep energy slightly higher on real-robot demonstrations.",
      "Always connect the visible behavior back to a software or sensing reason.",
    ],
    scene_policy_default: "minimal",
    object_policy_default: "suggested",
  },
  "01_tb3_slam_sim": {
    topic_goal: "Help students understand the SLAM loop in simulation well enough to interpret mapping behavior instead of treating it like magic.",
    topic_takeaways: [
      "Students should understand the roles of motion, sensing, and map updates in SLAM.",
      "Students should know what good versus bad mapping behavior looks like in simulation.",
      "Students should be able to explain the conditions that help or hurt SLAM quality.",
    ],
    teaching_arc: {
      entry_point: "Start from the visible mapping result students want to achieve.",
      progression: "Explain the SLAM loop, show what inputs matter, then connect that to simulation behavior and checks.",
      destination: "Students should finish able to narrate what the SLAM system is doing as the map is built.",
      tone: "visual, systems-oriented, exploratory",
      methods: ["mental model", "visual intuition", "demo", "recap"],
    },
    style_notes: [
      "Keep the mapping loop visible in the narration.",
      "Use map and scan visuals to ground the explanation.",
    ],
    scene_policy_default: "minimal",
    object_policy_default: "suggested",
  },
  "01_nav2_overview_project": {
    topic_goal: "Give students a high-level navigation architecture map and connect it to the project work they will complete.",
    topic_takeaways: [
      "Students should understand the major Nav2 components and what each contributes.",
      "Students should know how localization, planning, control, and behavior trees fit together.",
      "Students should leave seeing the project as an integration task rather than isolated commands.",
    ],
    teaching_arc: {
      entry_point: "Start from the end-to-end navigation outcome students want to achieve.",
      progression: "Move through the Nav2 architecture from inputs to decisions to motion, then connect that structure to the course project.",
      destination: "Students should finish with a system map they can use while building and debugging their project.",
      tone: "system-level, integrative, forward-looking",
      methods: ["architecture overview", "component roles", "project framing", "recap"],
    },
    style_notes: [
      "Keep the big picture visible even when naming components.",
      "Treat the project as the synthesis point for the course.",
    ],
    scene_policy_default: "minimal",
    object_policy_default: "suggested",
  },
};

const EXEMPLAR_SLIDE_OVERRIDES = {
  "03_robot_characteristics_manipulator_types": {
    "Robot Characteristics": {
      slide_role: "intro",
      importance: "high",
      teacher_strategy: "define_then_example",
      explanation_style: "Frame the lesson as a real robot-selection conversation, not a list of datasheet terms.",
      transition_from_previous: "Open by telling students they are about to learn how engineers read robot specifications and compare manipulator families.",
      transition_to_next: "Use the next slide to justify why specification literacy matters before introducing the actual metrics.",
      likely_student_confusion: [
        "Students often think robot choice is mostly about brand or payload, instead of a combination of task, workspace, accuracy, and speed.",
      ],
      story_hint: "Tell it like a real robot-selection meeting where someone needs to justify a purchase to a team.",
      delivery_goal: "Students should feel that every specification in this lesson answers a practical design question.",
      must_say: [
        "This topic is really about learning how to predict what a robot will be good at before you ever see it move.",
      ],
    },
    "Why do we learn robot characteristics?": {
      slide_role: "setup",
      importance: "high",
      teacher_strategy: "define_then_example",
      explanation_style: "Keep this grounded in industrial consequences such as wrong robot sizing, wasted money, or unsafe cell layouts.",
      transition_from_previous: "Move from the course framing into the practical reason this vocabulary matters in industry.",
      transition_to_next: "Once the stakes are clear, the next slide can give students a quick map of the lesson.",
      likely_student_confusion: [
        "Students may think characteristics are only for exams, not for real selection and integration work.",
      ],
      delivery_goal: "Students should believe this vocabulary will help them make better engineering decisions.",
      must_say: [
        "Robot characteristics are the language engineers use to avoid buying the wrong robot for the job.",
      ],
    },
    "Reach vs Workspace (common confusion)": {
      slide_role: "comparison",
      importance: "high",
      teacher_strategy: "compare_then_summarize",
      scene_policy: "hybrid",
      object_policy: "preferred",
      scene_hint: "Show a robot arm extending to one farthest point, then reveal the full operating volume so reach and workspace are visually separated.",
      prop_suggestions: ["robot arm", "reach arc", "workspace volume"],
      explanation_style: "Contrast the one-number reach idea with the full 3D operating region students must design around.",
      transition_from_previous: "Shift from single specifications to the spatial idea students confuse most often during robot selection.",
      transition_to_next: "After separating reach from workspace, keep the spatial intuition going by comparing common workspace shapes.",
      likely_student_confusion: [
        "Students often use reach and workspace as if they mean the same thing.",
        "Students may think the farthest point automatically describes every usable point the robot can access.",
      ],
      story_hint: "Tell students about a cell that fit the reach spec on paper but still failed because the usable workspace was wrong.",
      delivery_goal: "Students should clearly remember that reach is a maximum distance, while workspace is the whole usable region.",
      must_say: [
        "Reach is one maximum distance; workspace is the full region where the robot can actually operate.",
      ],
      emphasis_words: ["reach", "workspace", "usable region"],
    },
    "Workspace shapes (intuition)": {
      slide_role: "intuition",
      importance: "high",
      teacher_strategy: "intuitive_visual_explanation",
      scene_policy: "hybrid",
      object_policy: "preferred",
      scene_hint: "Fade in box, cylinder, and spherical-shell volumes one at a time so students can connect manipulator geometry to workspace shape.",
      prop_suggestions: ["box volume", "cylinder volume", "spherical shell"],
      delivery_goal: "Students should be able to picture how robot geometry creates a characteristic workspace shape.",
      likely_student_confusion: [
        "Students often memorize manipulator names without connecting them to the shape of space they serve well.",
      ],
    },
    "Payload (what it really means)": {
      slide_role: "definition",
      importance: "high",
      teacher_strategy: "define_then_example",
      scene_policy: "minimal",
      object_policy: "suggested",
      scene_hint: "Briefly show a gripper, part, bracket, and cable bundle accumulating at the wrist to make total payload concrete.",
      prop_suggestions: ["end effector", "part", "cable bundle"],
      likely_student_confusion: [
        "Students often count only the part and forget the tool, bracket, and cables.",
      ],
      must_say: [
        "Payload is not just the part; it is everything the wrist has to carry.",
      ],
      emphasis_words: ["payload", "tool", "part", "cables"],
    },
    "Accuracy vs Repeatability vs Precision": {
      slide_role: "comparison",
      importance: "high",
      teacher_strategy: "compare_then_summarize",
      explanation_style: "Separate the terms carefully and anchor each one to what students would see physically on the shop floor.",
      transition_from_previous: "Move from mechanical specifications into the quality vocabulary that students often mix together.",
      transition_to_next: "Use the next slide to prove that a robot can still be consistent while being wrong.",
      likely_student_confusion: [
        "Students often use accuracy, repeatability, and precision interchangeably.",
      ],
      delivery_goal: "Students should leave able to define all three terms without collapsing them together.",
      must_say: [
        "Repeatability means landing in the same place again and again. Accuracy means landing where you intended.",
      ],
      emphasis_words: ["accuracy", "repeatability", "precision"],
    },
    "Manipulator types: how we classify them": {
      slide_role: "comparison",
      importance: "high",
      teacher_strategy: "compare_then_summarize",
      scene_policy: "hybrid",
      object_policy: "preferred",
      scene_hint: "Bring robot silhouettes onto the screen one by one and tie each family to its characteristic motion pattern and workspace.",
      prop_suggestions: ["Cartesian silhouette", "cylindrical silhouette", "SCARA silhouette", "articulated arm", "delta robot"],
      delivery_goal: "Students should see manipulator type as geometry plus best-fit task, not just a name to memorize.",
      story_hint: "Present the slide like a sorting decision: which family would you shortlist first for each kind of task?",
      must_say: [
        "Manipulator type is really a shortcut for workspace shape, motion freedom, and the tasks the robot handles best.",
      ],
    },
    "Interactive: 6-axis articulated joint motion (RRRRRR)": {
      slide_role: "demo",
      importance: "high",
      teacher_strategy: "intuitive_visual_explanation",
      scene_policy: "scene_allowed",
      object_policy: "preferred",
      scene_hint: "Use the articulated arm model to step through what each joint contributes before zooming back out to the full pose flexibility.",
      prop_suggestions: ["articulated arm", "joint labels", "wrist orientation axes"],
      transition_from_previous: "Shift from static classification to the motion students need to actually see to understand.",
      transition_to_next: "Once students have seen the articulated arm move, connect that flexibility to the manipulator family comparison.",
      likely_student_confusion: [
        "Students may see six joints moving but still not understand what extra flexibility the wrist contributes.",
      ],
      delivery_goal: "Students should be able to narrate the difference between large positioning joints and smaller orientation joints.",
    },
    "One-slide memory: who is best at what?": {
      slide_role: "recap",
      importance: "high",
      teacher_strategy: "recap_and_reinforce",
      explanation_style: "Compress the lesson into a memorable decision table and speak like you are helping students build a quick exam-and-lab memory.",
      transition_from_previous: "Use the recap to consolidate the manipulator comparison before the lesson ends.",
      transition_to_next: "Close by pointing students toward the simplest decision rule they should remember after class.",
      delivery_goal: "Students should leave with one quick mental map for matching robot types to tasks.",
      must_say: [
        "Do not memorize manipulator families in isolation. Link each one to workspace shape, strengths, and typical tasks.",
      ],
    },
  },
  "01_urdf_rviz_tf2": {
    "URDF/Xacro + RViz + TF2 (TB3 Waffle Pi)": {
      slide_role: "intro",
      importance: "high",
      teacher_strategy: "define_then_example",
      explanation_style: "Frame the topic as the visualization and frame-debugging foundation students need before later Nav2 work.",
      transition_from_previous: "Open by promising that the lesson will explain where the robot in RViz comes from and how to reason about its frames.",
      transition_to_next: "Use the next slide to give students a clean route through the pipeline before any setup commands appear.",
      delivery_goal: "Students should feel that URDF, RViz, and TF2 belong to one story, not three unrelated tools.",
      must_say: [
        "If you can explain the visualization pipeline, you can debug a surprising amount of ROS 2 behavior later.",
      ],
    },
    "The visualization pipeline (mental model)": {
      slide_role: "intuition",
      importance: "high",
      teacher_strategy: "intuitive_visual_explanation",
      scene_policy: "hybrid",
      object_policy: "preferred",
      scene_hint: "Show the robot description feeding robot_state_publisher, then feeding TF and RViz, so the pipeline reads as one flow.",
      prop_suggestions: ["TurtleBot", "pipeline arrows", "TF tree"],
      likely_student_confusion: [
        "Students often mix up the robot model file, the node that publishes transforms, and the RViz display that visualizes the result.",
      ],
      delivery_goal: "Students should be able to explain the URDF to TF to RViz pipeline in one sentence.",
      must_say: [
        "URDF or Xacro describes the robot, robot_state_publisher turns that structure into transforms, and RViz uses those transforms to visualize the robot.",
      ],
    },
    "URDF = Links + Joints (robot structure)": {
      slide_role: "definition",
      importance: "high",
      teacher_strategy: "define_then_example",
      scene_policy: "hybrid",
      object_policy: "preferred",
      scene_hint: "Bring in a TurtleBot silhouette with links and joints highlighted so students see rigid bodies and connections as separate concepts.",
      prop_suggestions: ["TurtleBot", "link labels", "joint markers"],
      likely_student_confusion: [
        "Students often think links and joints are just XML tags, not physical modeling concepts.",
      ],
      delivery_goal: "Students should clearly understand that links are rigid bodies and joints are the relationships between them.",
      must_say: [
        "Links are the rigid bodies. Joints are the connections that define how those bodies relate or move.",
      ],
    },
    "Xacro (why TB3 uses it)": {
      slide_role: "definition",
      importance: "high",
      teacher_strategy: "define_then_example",
      transition_from_previous: "After students understand the robot structure, show why we do not want to hand-copy that structure for every robot variant.",
      transition_to_next: "Once Xacro makes sense, move into the launch steps that turn the description into something visible.",
      likely_student_confusion: [
        "Students may think Xacro is a completely different model format instead of a convenient way to generate URDF.",
      ],
      delivery_goal: "Students should leave understanding Xacro as a maintainability tool, not an extra hurdle.",
    },
    "Visualizing the Robot": {
      slide_role: "demo",
      importance: "high",
      teacher_strategy: "intuitive_visual_explanation",
      scene_policy: "hybrid",
      object_policy: "suggested",
      scene_hint: "Show the TurtleBot in RViz and point out exactly which frame or display students should inspect first when nothing appears.",
      prop_suggestions: ["TurtleBot", "RViz fixed frame", "display tree"],
      likely_student_confusion: [
        "Students often assume RViz is broken when the real issue is the fixed frame or missing TF.",
      ],
      delivery_goal: "Students should know the first few things to inspect when the model does not appear correctly in RViz.",
    },
    "TF2 = Who is where?": {
      slide_role: "definition",
      importance: "high",
      teacher_strategy: "intuitive_visual_explanation",
      scene_policy: "hybrid",
      object_policy: "preferred",
      scene_hint: "Use a moving car or TurtleBot with attached coordinate frames to show that TF answers where one frame is relative to another.",
      prop_suggestions: ["car", "coordinate frame", "TurtleBot"],
      likely_student_confusion: [
        "Students often hear transform vocabulary without understanding that every transform answers a relative-where question.",
      ],
      delivery_goal: "Students should be able to say TF2 tells us where one frame is relative to another frame.",
      must_say: [
        "TF2 is the system that keeps track of where frames are relative to each other over time.",
      ],
      emphasis_words: ["relative", "frame", "transform"],
    },
    "How to read tf2_echo": {
      slide_role: "intuition",
      importance: "high",
      teacher_strategy: "guided_practice",
      transition_from_previous: "Once students can request a transform, help them read the numbers without treating them as random output.",
      transition_to_next: "Finish by turning the lesson into a checklist students can reuse when they work alone.",
      likely_student_confusion: [
        "Students may see tf2_echo output as raw numbers without understanding which frame pair or direction those numbers describe.",
      ],
      delivery_goal: "Students should be able to say what frame pair tf2_echo is reporting and what the numbers mean physically.",
    },
    "Session 05 Checklist": {
      slide_role: "exit_check",
      importance: "high",
      teacher_strategy: "recap_and_reinforce",
      explanation_style: "Use the checklist as a closure device that turns the whole lesson into a set of confidence checks.",
      transition_from_previous: "Collect the model, visualization, and transform ideas into one final self-check.",
      transition_to_next: "Close by telling students what they should be able to verify on their own before the next session.",
      delivery_goal: "Students should leave knowing what success looks like for this lab session.",
      must_say: [
        "By the end of this session, you should be able to describe the robot, launch the visualization, and inspect the transform tree with purpose.",
      ],
    },
  },
};

export function buildTopicPedagogyProfile(descriptor) {
  const courseProfile =
    COURSE_PROFILES[`${descriptor.school}/${descriptor.course}`] ||
    COURSE_PROFILES[descriptor.course] ||
    COURSE_PROFILES[descriptor.school] ||
    COURSE_PROFILES.AC;
  const topicProfile = TOPIC_PROFILES[descriptor.topic] || {};
  const topicLabel = humanizeTopicId(descriptor.topic);
  return {
    audience_level: String(topicProfile.audience_level || courseProfile.audience_level || "").trim(),
    topic_goal: String(topicProfile.topic_goal || `Help students understand ${topicLabel} in a way they can explain, apply, and build on later.`).trim(),
    topic_takeaways: uniqueStrings(
      courseProfile.topic_takeaways || [],
      topicProfile.topic_takeaways || [
        `Students should be able to explain the core idea behind ${topicLabel}.`,
        `Students should know how ${topicLabel} connects to later labs, scripts, or robotics decisions.`,
      ],
    ),
    style_notes: uniqueStrings(courseProfile.style_notes || [], topicProfile.style_notes || []),
    transition_style: String(topicProfile.transition_style || courseProfile.transition_style || "").trim(),
    scene_policy_default: String(topicProfile.scene_policy_default || courseProfile.scene_policy_default || "minimal").trim(),
    object_policy_default: String(topicProfile.object_policy_default || courseProfile.object_policy_default || "none").trim(),
    topic_defaults: {
      ...(courseProfile.topic_defaults || {}),
      ...(topicProfile.topic_defaults || {}),
    },
    teaching_arc: mergeArc(courseProfile.teaching_arc, topicProfile.teaching_arc),
  };
}

export function getTopicSlideOverride(topicId, slideTitle) {
  const topicOverrides = EXEMPLAR_SLIDE_OVERRIDES[topicId] || {};
  return topicOverrides[String(slideTitle || "").trim()] || null;
}
