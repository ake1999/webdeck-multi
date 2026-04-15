export const topicMeta = {
  id: "01_mobile_robotics_lab_intro_and_expectations",
  title: "Mobile Robotics Lab Introduction & Expectations",
  duration: 45,
};

// Internet media (1 visual per slide; easy to later download into ./media and swap to local paths)
const media = {
  // TurtleBot3 / ROBOTIS
  tb3_house_gazebo: {
    kind: "image",
    src: "https://emanual.robotis.com/assets/images/platform/turtlebot3/simulation/turtlebot3_house.png",
    source:
      "https://emanual.robotis.com/docs/en/platform/turtlebot3/simulation/",
  },
  tb3_gazebo_rviz: {
    kind: "image",
    src: "https://emanual.robotis.com/assets/images/platform/turtlebot3/simulation/turtlebot3_gazebo_rviz.png",
    source:
      "https://emanual.robotis.com/docs/en/platform/turtlebot3/simulation/",
  },
  tb3_components_burger: {
    kind: "image",
    src: "https://emanual.robotis.com/assets/images/platform/turtlebot3/hardware_setup/turtlebot3_burger_components.png",
    source:
      "https://emanual.robotis.com/docs/en/platform/turtlebot3/hardware_setup/",
  },

  // Generic mobile robotics (Wikimedia)
  warehouse_amr: {
    kind: "image",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Amazon_warehouse_robot_2020.JPG/1280px-Amazon_warehouse_robot_2020.JPG",
    source:
      "https://commons.wikimedia.org/wiki/File:Amazon_warehouse_robot_2020.JPG",
  },

  // Logos / icons (Wikimedia)
  ros_logo: {
    kind: "image",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ros_logo.svg/1280px-Ros_logo.svg.png",
    source: "https://commons.wikimedia.org/wiki/File:Ros_logo.svg",
  },
  gazebo_logo: {
    kind: "image",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Gazebo_logo.svg/1280px-Gazebo_logo.svg.png",
    source: "https://commons.wikimedia.org/wiki/File:Gazebo_logo.svg",
  },
  ubuntu_logo: {
    kind: "image",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ubuntu-logo-2022.svg/1280px-Ubuntu-logo-2022.svg.png",
    source: "https://commons.wikimedia.org/wiki/File:Ubuntu-logo-2022.svg",
  },
  git_logo: {
    kind: "image",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/512px-Git-logo.svg.png",
    source: "https://commons.wikimedia.org/wiki/File:Git-logo.svg",
  },

  // ROS docs (official)
  ros_rqt_graph: {
    kind: "image",
    src: "https://docs.ros.org/en/rolling/_images/rqt_graph.png",
    source: "https://docs.ros.org/",
  },
  ros_pubsub_gif: {
    kind: "image",
    src: "https://docs.ros.org/en/rolling/_images/Topic-SinglePublisherandSingleSubscriber.gif",
    source:
      "https://docs.ros.org/en/rolling/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html",
  },
  ros_action_gif: {
    kind: "image",
    src: "https://docs.ros.org/en/foxy/_images/Action-SingleActionClient.gif",
    source:
      "https://docs.ros.org/en/foxy/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html",
  },
  urdf_rviz: {
    kind: "image",
    src: "https://docs.ros.org/en/iron/_images/rviz-urdf.png",
    source:
      "https://docs.ros.org/en/iron/Tutorials/Intermediate/URDF/Using-URDF-with-Robot-State-Publisher.html",
  },

  // Nav2 docs (official)
  nav2_arch: {
    kind: "image",
    src: "https://docs.nav2.org/_images/nav2_architecture.png",
    source: "https://docs.nav2.org/",
  },
  nav2_tf_full_tree: {
    kind: "image",
    src: "https://docs.nav2.org/_images/tf_full_tree.png",
    source:
      "https://docs.nav2.org/setup_guides/transformation/setup_transforms.html",
  },

  // RViz examples (TB4 manual)
  rviz_view_robot: {
    kind: "image",
    src: "https://turtlebot.github.io/turtlebot4-user-manual/software/media/view_robot.png",
    source: "https://turtlebot.github.io/turtlebot4-user-manual/",
  },
  rviz_laserscan: {
    kind: "image",
    src: "https://turtlebot.github.io/turtlebot4-user-manual/software/media/laserscan.png",
    source: "https://turtlebot.github.io/turtlebot4-user-manual/",
  },

  // Kinematics / planning visuals
  diff_drive_kinematics: {
    kind: "image",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Differential_Drive_Kinematics_of_a_Wheeled_Mobile_Robot.svg/512px-Differential_Drive_Kinematics_of_a_Wheeled_Mobile_Robot.svg.png",
    source:
      "https://commons.wikimedia.org/wiki/File:Differential_Drive_Kinematics_of_a_Wheeled_Mobile_Robot.svg",
  },
  costmap_layers: {
    kind: "image",
    src: "https://costmap-namo.github.io/static/images/costmap_layers.png",
    source: "https://costmap-namo.github.io/",
  },

  // SLAM RViz screenshot (external, simple + clear)
  slam_rviz_example: {
    kind: "image",
    src: "https://roboticsbackend.com/wp-content/uploads/2023/05/ros2_nav2_rviz2_default_view-1024x646.png",
    source:
      "https://roboticsbackend.com/ros2-nav2-generate-a-map-with-slam_toolbox/",
  },

  // Dual boot illustration
  dual_boot: {
    kind: "image",
    src: "https://assets.gcore.pro/site-media/uploads/dual_boot_ubuntu_windows_setup_fi_7d2bd16c89.png",
    source: "https://gcore.com/",
  },

  // Floor plan (house navigation story)
  floor_plan: {
    kind: "image",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/CastelloDiManiace_Bronte_Sicily_FloorPlan.svg/500px-CastelloDiManiace_Bronte_Sicily_FloorPlan.svg.png",
    source:
      "https://commons.wikimedia.org/wiki/File:CastelloDiManiace_Bronte_Sicily_FloorPlan.svg",
  },
};

const slidesData = [
  // 1) Title
  {
    type: "title",
    hud: "Mobile Robotics Lab",
    title: "Mobile Robotics Lab — Session 1",
    subtitle: "Simulation-first with TurtleBot3 + Gazebo + ROS 2",
    meta: "Instructor: Ali Karimzadeh • Email: karimza@algonquincollege.com",
    notes:
      "Welcome everyone. Today is our kickoff session for the Mobile Robotics Lab. I’ll explain how the lab runs, what we’ll build by the end of the term, and what you should do this week to get set up. The goal is that you leave today knowing what success looks like and how to get there step by step.",
  },

  // 2) Course overview (less detail)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Course overview + how the lab will run",
    left: {
      bullets: [
        "Simulation-first: TurtleBot3 + Gazebo + ROS 2",
        "End goal: SLAM + Navigation + obstacle avoidance",
        "How to win: keep up weekly + document",
      ],
    },
    right: { media: media.tb3_house_gazebo },
    notes:
      "Big picture: simulation-first so we can iterate fast and debug clearly. By the end, you’ll map an environment with SLAM, navigate to goals, and avoid obstacles. If you keep up weekly, the final project becomes very manageable.",
  },

  // 3) Why mobile robotics (replace montage video with 1 image)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Why Simulation?",
    left: {
      bullets: [
        "Real robots are messy: noise + drift + delays",
        "We need sensing → planning → control as a system",
        "You’ll gain strong debugging + systems skills",
      ],
    },
    right: { media: media.warehouse_amr },
    notes:
      "Mobile robotics is hard because the world isn’t clean. That’s why we focus on how the whole system connects. The core skill is: run it, observe data, find the bottleneck, and fix it.",
  },

  // 4) Delivery model (keep, shorter)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Course Delivery Model (Mostly Simulation)",
    left: {
      bullets: [
        "Mostly simulation for repeatability + speed",
        "One real-robot demo later (compare sim vs real)",
        "Same concepts: TF, sensors, SLAM, navigation",
      ],
    },
    right: { media: media.tb3_gazebo_rviz },
    notes:
      "Simulation helps you learn faster. Later you’ll see the real robot difference, but the concepts and ROS tools remain the same.",
  },

  // 5) Final project story (NEW / stronger notes)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Final Project: House Navigator (40%)", 
    left: {
      bullets: [
        "Robot navigates inside a house-like world (simulation)",
        "Uses SLAM to map while exploring",
        "Moves between rooms + reaches goal poses",
        // "Shows “coverage-style” motion (like cleaning)",
      ],
    },
    right: { media: media.tb3_house_gazebo },
    notes:
      "Your final project is not a real vacuum cleaner—it's TurtleBot3 in simulation—but we’ll treat it like one. The robot should move around rooms to demonstrate floor coverage while mapping and navigating.\n\nCore stack in the project:\n- SLAM (map while exploring)\n- Navigation (reach goals / room waypoints)\n- Obstacle avoidance (don’t crash; handle changes)\n- Some custom work (a small custom package / node / behavior / launch integration)\n\nThe exact “vacuum behavior” can change, but the robotics core is SLAM + Nav + obstacle avoidance + your customization.",
  },

  // 6) Mini-assignments 10% (NEW)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Mini-Assignments (10%): Proof you’re following the lab",
    left: {
      bullets: [
        "Short checkpoints during the term (10%)",
        "Typical: commands + screenshot + 2–3 observations",
        "Goal: steady progress (no last-minute panic)",
      ],
    },
    right: {},
    notes:
      "These are small checkpoints that show you’re keeping up. Usually you’ll submit a short proof: what you ran, what you saw (screenshot), and a couple observations. This keeps you on track for the final project.",
  },

  // 7) Software stack (shorter)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Software Stack We Will Use",
    left: {
      bullets: [
        "Ubuntu 22.04 (recommended standard)",
        "ROS 2 (Humble on 22.04)",
        "Gazebo + RViz2",
        "Git + terminal basics",
      ],
    },
    right: { media: media.ros_logo },
    notes:
      "We standardize the stack to reduce troubleshooting chaos. If everyone is aligned, debugging becomes much easier.",
  },

  // 8) Laptop requirements (shorter)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Hardware / Laptop Requirements",
    left: {
      bullets: [
        "CPU: modern i5/Ryzen 5 (or better)",
        "RAM: 16 GB recommended (8 GB may struggle)",
        "Disk: 40–80 GB free space",
      ],
    },
    right: {},
    notes:
      "Gazebo + RViz can be heavy. If performance is an issue, tell me early—there are ways to reduce load while still meeting course outcomes.",
  },

  // 9) Ubuntu overview (shorter)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Ubuntu: What It Is (and Why We Use It)",
    left: {
      bullets: [
        "Best-supported environment for ROS development",
        "Great tooling + packages",
        "You’ll learn terminal basics naturally",
      ],
    },
    right: { media: media.ubuntu_logo },
    notes:
      "Ubuntu is basically the default environment for ROS. Most docs and packages assume Ubuntu, so we reduce friction by using it.",
  },

  // 10) Dual boot plan
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Dual Boot Plan (Windows + Ubuntu)",
    left: {
      bullets: [
        "Recommended: dual boot for best stability",
        "VM can work, but may be slower for Gazebo",
        "Follow the course install guide (don’t improvise)",
      ],
    },
    right: { media: media.dual_boot },
    notes:
      "Dual boot is usually the best balance: keep Windows, add Ubuntu for robotics. Follow the course guide carefully to avoid common boot issues.",
  },

  // 11) Setup roadmap (compressed + includes verification)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Setup Roadmap (Do this in order)",
    left: {
      bullets: [
        "1) Ubuntu updates",
        "2) ROS 2 + dev tools",
        "3) Gazebo + TurtleBot3 packages",
        "4) Verify: run sim + drive + RViz view",
      ],
    },
    right: { media: media.tb3_gazebo_rviz },
    notes:
      "Verification is the key. If you can launch the sim, drive the robot, and see sensors/TF in RViz, you’re ready for the labs.",
  },

  // 12) What is ROS 2 (shorter)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "What Is ROS 2? (Big Picture)",
    left: {
      bullets: [
        "Framework + tools for building robot systems",
        "Connects sensors → algorithms → actuators",
        "We debug by inspecting the graph + data",
      ],
    },
    right: { media: media.ros_rqt_graph },
    notes:
      "ROS 2 is an ecosystem. You’ll learn the minimum concepts to build and debug a real robot pipeline.",
  },

  // 13) Core concepts (shorter)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "ROS 2 Core Concepts (you’ll use all term)",
    left: {
      bullets: [
        "Node, Topic, Service, Action",
        "Parameters for tuning behavior",
        "Most debugging starts with: topics + TF",
      ],
    },
    right: {},
    notes:
      "If you understand node/topic/service/action and how to inspect them, you can make progress fast in ROS.",
  },

  // 14) Packages/workspaces/colcon (keep but simpler)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Packages, Workspaces, and colcon",
    left: {
      bullets: [
        "Package = reusable module (code + config + launch)",
        "Workspace = where your packages live",
        "colcon builds your workspace",
      ],
    },
    right: {},
    notes:
      "We’ll practice a simple workflow: create package → build → source → run. That loop will become your default habit.",
  },

  // 15) Launch files (shorter)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Launch Files (Start whole systems)",
    left: {
      bullets: [
        "Robots are systems, not one program",
        "Launch starts nodes + params + RViz setups",
        "Good projects start with one command",
      ],
    },
    right: { media: media.ros_rqt_graph },
    notes:
      "Launch files make your system repeatable. If your demo runs from one launch command, life is much easier.",
  },

  // 16) RViz2
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "RViz2 (Your Debugging Superpower)",
    left: {
      bullets: [
        "See TF, LaserScan, map, paths",
        "Answer: “Is data correct?”",
        "Answer: “Is localization working?”",
      ],
    },
    right: { media: media.rviz_view_robot },
    notes:
      "Don’t guess. Look at RViz. RViz shows you what the robot ‘believes’ is happening.",
  },

  // 17) Gazebo
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Gazebo (Simulation Engine)",
    left: {
      bullets: [
        "Physics + collisions + sensors",
        "Fast iteration for learning",
        "Main lab environment",
      ],
    },
    right: { media: media.gazebo_logo },
    notes:
      "Gazebo gives you a safe place to test ideas repeatedly. Later, real robots add more noise—but the same ROS structure applies.",
  },

  // 18) TurtleBot3 intro (merged: intro + dependencies)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "TurtleBot3 in Simulation (What We Use)",
    left: {
      bullets: [
        "Common learning platform worldwide",
        "Differential drive + LiDAR/odom/IMU topics",
        "We follow a course install guide (version alignment)",
      ],
    },
    right: { media: media.tb3_components_burger },
    notes:
      "The toughest early issue is usually dependency/version alignment. Follow the course guide so your setup matches the lab environment.",
  },

  // 19) Diff-drive basics
  // {
  //   type: "two-col",
  //   hud: "Mobile Robotics Lab",
  //   title: "Differential Drive Basics (Robot Motion)",
  //   left: {
  //     bullets: [
  //       "Command using /cmd_vel (v, ω)",
  //       "Wheel slip + drift are normal",
  //       "That’s why we need SLAM/localization",
  //     ],
  //   },
  //   right: { media: media.diff_drive_kinematics },
  //   notes:
  //     "Even in simulation, odometry drifts. So we don’t rely on wheel odom alone—we use SLAM/localization to stay consistent.",
  // },

  // 20) URDF/Xacro
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Robot Description (URDF / Xacro)",
    left: {
      bullets: [
        "URDF: links + joints",
        "Defines frames for TF + visualization",
        "Xacro keeps URDF clean/reusable",
      ],
    },
    right: { media: media.urdf_rviz },
    notes:
      "You don’t need to write URDF from scratch now—but you need to understand it enough to diagnose model/TF issues.",
  },

  // 21) TF / TF2
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "TF / TF2 (Coordinate Frames)",
    left: {
      bullets: [
        "Frames: map, odom, base_link, sensor frames…",
        "TF tracks transforms over time",
        "If TF is wrong → everything looks wrong",
      ],
    },
    right: { media: media.nav2_tf_full_tree },
    notes:
      "TF is a top source of bugs. We’ll learn how to inspect TF trees and fix frame problems early.",
  },

  // 22) Sensors streams (shorter)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Sensors & Data Streams (What You’ll Debug)",
    left: {
      bullets: [
        "Common topics: /scan, /odom, /imu, /cmd_vel",
        "Sanity-check in RViz",
        "Debug order: Topics → TF → RViz → params",
      ],
    },
    right: { media: media.rviz_laserscan },
    notes:
      "Most failures become obvious if you check: are topics alive, are frames correct, does RViz show sensible data?",
  },

  // 23) SLAM (replace local video with image + keep notes)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "SLAM: What Problem Are We Solving?",
    left: {
      bullets: [
        "SLAM = map + pose at the same time",
        "Output: occupancy grid + pose estimate",
        "Better coverage → better map",
      ],
    },
    right: { media: media.slam_rviz_example },
    notes:
      "SLAM is where the robot builds a map while estimating where it is. In this course, you’ll run a SLAM package and learn how to judge map quality and debug common issues.",
  },

  // 24) SLAM video (YouTube link you provided)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "SLAM demo (video)",
    left: {
      bullets: [
        "Watch how mapping grows as the robot explores",
        "Notice: motion + coverage affect map quality",
        "Goal: produce a usable map for navigation",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <iframe
            src="https://www.youtube-nocookie.com/embed/r2EqavRXVo8?rel=0"
            title="SLAM demo"
            style="width:100%; height:360px; border:0; border-radius:12px;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            SLAM demo (YouTube)
          </figcaption>
        </figure>
      `,
    },
    notes:
      "We’ll use this as a visual reference: exploration → scans → map grows. Your project needs the same story: map first, then navigate on it.",
  },

  // 25) Navigation concept
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Navigation: From “Where Am I?” to “Go There”",
    left: {
      bullets: [
        "Pipeline: localization/map → planning → control",
        "Global plan + local obstacle avoidance",
        "We’ll use Nav2-style architecture",
      ],
    },
    right: { media: media.nav2_arch },
    notes:
      "Navigation connects everything. When it fails, we diagnose which stage failed: localization/SLAM, planning, control, or costmaps.",
  },

  // 26) Navigation video (YouTube link you provided)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Navigation demo (video)",
    left: {
      bullets: [
        "Watch goal-setting and path following",
        "Notice reaction near obstacles",
        "Goal: reach poses reliably",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <iframe
            src="https://www.youtube-nocookie.com/embed/tHOp-8d1fAg?rel=0"
            title="Navigation demo"
            style="width:100%; height:360px; border:0; border-radius:12px;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Navigation demo (YouTube)
          </figcaption>
        </figure>
      `,
    },
    notes:
      "This is the vibe of your final demo: map ready, localization stable, goals reached consistently.",
  },

  // 27) Costmaps + obstacle avoidance (keep but shorter)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Obstacle Avoidance (Costmaps)",
    left: {
      bullets: [
        "Static layer (map) + obstacle layer (sensors)",
        "Inflation = safety buffer",
        "Tuning changes behavior a lot",
      ],
    },
    right: { media: media.costmap_layers },
    notes:
      "Costmaps are where a lot of ‘robot personality’ comes from. We’ll tune with a method, not random guessing.",
  },

  // 28) Main project (update notes with vacuum-like + custom packages)
  // {
  //   type: "two-col",
  //   hud: "Mobile Robotics Lab",
  //   title: "The Main Project (40%)",
  //   left: {
  //     bullets: [
  //       "SLAM mapping + navigation + obstacle avoidance",
  //       "House-like world: move between rooms + reach goals",
  //       // "Show coverage-style motion (vacuum-like idea)",
  //       "Include some custom packages/behavior",
  //     ],
  //   },
  //   right: { media: media.tb3_house_gazebo },
  //   notes:
  //     "Project is where everything connects. You’ll demonstrate:\n- SLAM mapping in a house-like environment\n- Navigation between room waypoints / goal poses\n- Obstacle avoidance during motion\n- A small custom package / node / behavior (for example: simple coverage or waypoint routine, or a custom launch + behavior integration)\n\nThe ‘vacuum cleaner’ story is just to make it intuitive: cover rooms while navigating safely.",
  // },

  // 29) Milestones (shorter)
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Milestones (Your roadmap to an easy final demo)",
    left: {
      bullets: [
        "1) Sim + teleop + RViz working",
        "2) TF + model sanity check",
        "3) SLAM map saved",
        "4) Navigate to goals",
        "5) Add obstacles + evaluate",
      ],
    },
    right: {},
    notes:
      "These milestones reduce risk. If you hit them one-by-one, your final demo becomes a combination of things you already verified.",
  },

  // 30) Today + next steps
  // {
  //   type: "two-col",
  //   hud: "Mobile Robotics Lab",
  //   title: "Today’s Start + Next Steps",
  //   left: {
  //     bullets: [
  //       "Today: overview + quick sim/RViz demo",
  //       "This week: install + verify your environment",
  //       "Come early for help if blocked",
  //     ],
  //   },
  //   right: { media: media.rviz_view_robot },
  //   notes:
  //     "Before next lab: get your environment installed and verified. If you get blocked, message early with your OS/ROS distro, the command you ran, and the full error text (plus a screenshot if helpful).",
  // },
];

export default slidesData;
