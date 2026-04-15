// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S07/01_tb3_real_robot_demo.slides.js
// Session S07 — Real TurtleBot3 Demo (Remote PC steps) — teleop → SLAM → save map → (optional) Nav2
// NOTE: Students connect to instructor hotspot. Robot-side bringup already handled by instructor.

export const topicMeta = {
  id: "01_tb3_real_robot_demo",
  title: "Real TurtleBot3 Demo: RViz + Teleop + SLAM + Save Map (+ Nav2 quick look)",
  duration: 120,
};

const slidesData = [
  // 0 — TITLE
  {
    type: "title",
    hud: "Real Robot Demo",
    title: "TurtleBot3 (Real Robot) — End-to-End Demo",
    subtitle: "See the full pipeline: topics → RViz → teleop → SLAM → save map",
    meta: "UOttawa Mobile Robotics • Instructor: Ali Karimzadeh",
    notes:
      "Say: Today is not deep theory. It’s a practical demo so you know what the system looks like in real life.",
  },

  // 1 — Ground rules
  {
    type: "bullets",
    hud: "Rules",
    title: "How today works (important)",
    lead: "We have **one** robot. If your laptop can’t connect, just watch my screen.",
    bullets: [
      "Robot-side commands are already set up by instructor",
      "You will learn the **remote PC workflow** (what you run on a laptop)",
      "Goal: understand the pipeline you will use in simulation later",
      "Source for commands: TurtleBot3 eManual (links on slides)",
    ],
  },

  // 2 — Wi-Fi / network step
  {
    type: "bullets",
    hud: "Network",
    title: "Step 0: Connect to the instructor hotspot",
    lead: "Join the Wi-Fi first so DDS discovery can work.",
    bullets: [
      "Connect to **AWiFi** hotspot (no password)",
      "Open a terminal and confirm you have an IP:",
      "```bash\nip a | grep -A2 \"wlan\" | head\n```",
      "If you are on a VPN → disconnect it (VPN often blocks discovery)",
    ],
  },

  // 3 — ROS env (must match robot)
  {
    type: "bullets",
    hud: "Env",
    title: "Step 1: Set ROS environment on your laptop",
    lead: "These must match the robot settings (Domain ID especially).",
    bullets: [
      "```bash\nsource /opt/ros/humble/setup.bash\n```",
      "```bash\nexport TURTLEBOT3_MODEL=waffle_pi\nexport RMW_IMPLEMENTATION=rmw_fastrtps_cpp\nexport ROS_DOMAIN_ID=30\n```",
      "Sanity check:",
      "```bash\nprintenv ROS_DOMAIN_ID\nprintenv RMW_IMPLEMENTATION\n```",
    ],
  },

  // 4 — Verify you can “see” the robot (topics)
  {
    type: "bullets",
    hud: "Verify",
    title: "Step 2: Verify you can see robot topics",
    lead: "If discovery works, `ros2 topic list` should show many topics.",
    bullets: [
      "List topics (look for `/scan`, `/tf`, `/odom`, etc.):",
      "```bash\nros2 topic list | head -n 30\n```",
      "Quick check: read **one** LiDAR message:",
      "```bash\nros2 topic echo /scan -n 1\n```",
      "If you see data → networking is OK ✅",
    ],
  },

  // 5 — If you cannot see topics (minimal quick fixes)
  {
    type: "bullets",
    hud: "If Stuck",
    title: "If you see **no topics** (fast fixes)",
    lead: "We will not spend long debugging — watch instructor screen if needed.",
    bullets: [
      "Confirm you are on the same Wi-Fi as the instructor laptop",
      "Confirm `ROS_DOMAIN_ID=30` on your laptop (must match robot)",
      "Disable firewall temporarily (common DDS issue):",
      "```bash\nsudo ufw status\nsudo ufw disable\n```",
      "If still nothing: stop here and just follow the demo visually",
    ],
  },

  // 6 — RViz (from eManual)
  {
    type: "bullets",
    hud: "RViz",
    title: "Step 3: Visualize the real robot in RViz",
    lead: "This shows TF frames + robot model + sensor data live.",
    bullets: [
      "Launch RViz (Remote PC):",
      "```bash\nros2 launch turtlebot3_bringup rviz2.launch.py\n```",
      "In RViz, check: **Fixed Frame** is `base_link` (or `map` when SLAM runs)",
      "Source: [TB3 Bringup → RViz](https://emanual.robotis.com/docs/en/platform/turtlebot3/bringup/)",
    ],
  },

  // 7 — What you should see
  {
    type: "two-col",
    hud: "RViz",
    title: "RViz: What you should see (quick checklist)",
    left: {
      bullets: [
        "**Robot model** (waffle_pi)",
        "**LaserScan** points (LiDAR)",
        "**TF** tree is updating",
        "If robot is missing: change **Fixed Frame** and re-add displays",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://emanual.robotis.com/assets/images/platform/turtlebot3/bringup/rviz2.png",
        source: "ROBOTIS eManual — RViz2",
        sourceHref: "https://emanual.robotis.com/docs/en/platform/turtlebot3/bringup/",
      },
    },
  },

  // 8 — Teleop (from eManual)
  {
    type: "bullets",
    hud: "Teleop",
    title: "Step 4: Drive the robot (keyboard teleop)",
    lead: "Teleop is how we explore the environment during mapping.",
    bullets: [
      "Run teleop on your laptop (Remote PC):",
      "```bash\nexport TURTLEBOT3_MODEL=waffle_pi\nros2 run turtlebot3_teleop teleop_keyboard\n```",
      "Keys: `w/x` forward/back • `a/d` turn • `space` stop",
      "Source: [TB3 SLAM → Teleop](https://emanual.robotis.com/docs/en/platform/turtlebot3/slam/)",
    ],
  },

  // 9 — Start SLAM (instructor runs; students observe + optional run)
  {
    type: "bullets",
    hud: "SLAM",
    title: "Step 5: Start SLAM (mapping mode)",
    lead: "Instructor will run SLAM. If your laptop is connected, you can run it too.",
    bullets: [
      "Start SLAM (Remote PC):",
      "```bash\nexport TURTLEBOT3_MODEL=waffle_pi\nros2 launch turtlebot3_cartographer cartographer.launch.py\n```",
      "Then drive slowly using teleop and watch the map grow in RViz",
      "Source: [TB3 SLAM](https://emanual.robotis.com/docs/en/platform/turtlebot3/slam/)",
    ],
  },

  // 10 — Mapping tips (non-deep, practical)
  {
    type: "bullets",
    hud: "SLAM Tips",
    title: "Mapping tips (make the map usable)",
    lead: "Good mapping is about **smooth motion** and **closing loops**.",
    bullets: [
      "Move slowly (avoid sudden spins and fast acceleration)",
      "Scan corners and doorway edges (don’t miss boundaries)",
      "Try to “loop back” to where you started (helps reduce drift)",
      "If map looks stretched: pause, re-scan area, and loop-close again",
    ],
  },

  // 11 — Save the map (from eManual)
  {
    type: "bullets",
    hud: "Map",
    title: "Step 6: Save the map to files (`.pgm` + `.yaml`)",
    lead: "This creates files you can reload later for navigation.",
    bullets: [
      "Save map (Remote PC):",
      "```bash\nros2 run nav2_map_server map_saver_cli -f ~/tb3_map\n```",
      "This saves: `~/tb3_map.pgm` and `~/tb3_map.yaml`",
      "Source: [TB3 SLAM → Save Map](https://emanual.robotis.com/docs/en/platform/turtlebot3/slam/)",
    ],
  },

  // 12 — What is an occupancy grid (simple)
  {
    type: "two-col",
    hud: "Map",
    title: "Occupancy Grid Map (OGM) — what the map means",
    left: {
      bullets: [
        "Saved maps are **2D occupancy grids**",
        "**White** = free space",
        "**Black** = occupied (walls/objects)",
        "**Gray** = unknown (not scanned yet)",
        "This map is used later by **Nav2** for localization + planning",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://emanual.robotis.com/assets/images/platform/turtlebot3/slam/ogm.png",
        source: "ROBOTIS eManual — Occupancy Grid Map",
        sourceHref: "https://emanual.robotis.com/docs/en/platform/turtlebot3/slam/",
      },
    },
  },

  // 13 — Quick look: start navigation (optional)
  {
    type: "bullets",
    hud: "Nav2 (Quick Look)",
    title: "Step 7 (optional): Start navigation using the saved map",
    lead: "We will only do a quick look (deep navigation is next sessions).",
    bullets: [
      "Start Nav2 with a saved map (Remote PC):",
      "```bash\nexport TURTLEBOT3_MODEL=waffle_pi\nros2 launch turtlebot3_navigation2 navigation2.launch.py map:=$HOME/tb3_map.yaml\n```",
      "Then use RViz tools to set pose and goal",
      "Source: [TB3 Navigation](https://emanual.robotis.com/docs/en/platform/turtlebot3/navigation/)",
    ],
  },

  // 14 — RViz: initial pose + goal (from eManual)
  {
    type: "bullets",
    hud: "Nav2 (RViz)",
    title: "RViz navigation tools (what you click)",
    lead: "These clicks are OK for learning — final project must be programmatic.",
    bullets: [
      "Set initial pose: click **2D Pose Estimate**, then click/drag on the map",
      "Send a goal: click **2D Nav Goal**, then click/drag destination",
      "The arrow sets the goal orientation (θ)",
      "Source: [TB3 Navigation → RViz goal](https://emanual.robotis.com/docs/en/platform/turtlebot3/navigation/)",
    ],
  },

  // 15 — “Programmatic hint” (short, not deep)
  {
    type: "bullets",
    hud: "Project Hint",
    title: "Project hint (no deep coding): how to do goals programmatically",
    lead: "Your autonomy layer will send goals without RViz clicking.",
    bullets: [
      "Nav2 provides an action interface (NavigateToPose / FollowWaypoints)",
      "Your node will publish/send a goal pose (x, y, yaw) in the `map` frame",
      "Start with RViz to learn coordinates, then move to code",
      "Next sessions: we’ll show the minimal “send a goal” node pattern",
    ],
  },

  // 16 — MCQ: map files
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: What does `map_saver_cli` create?",
    question: "When you run `ros2 run nav2_map_server map_saver_cli -f ~/tb3_map`, you get…",
    options: [
      { choice: "A", label: "A single `.png` image only" },
      { choice: "B", label: "A `.pgm` image + a `.yaml` metadata file" },
      { choice: "C", label: "A `.bag` recording file only" },
      { choice: "D", label: "A URDF model of the robot" },
    ],
    correct: "B",
    explain: "Map saving produces an occupancy image (`.pgm`) plus config/metadata (`.yaml`).",
  },

  // 17 — Wrap-up commands (single slide)
  {
    type: "bullets",
    hud: "Summary",
    title: "Today’s remote-PC command checklist",
    bullets: [
      "Set env: `export ROS_DOMAIN_ID=30` + `export TURTLEBOT3_MODEL=waffle_pi`",
      "Verify topics: `ros2 topic list` and `ros2 topic echo /scan -n 1`",
      "RViz: `ros2 launch turtlebot3_bringup rviz2.launch.py`",
      "Teleop: `ros2 run turtlebot3_teleop teleop_keyboard`",
      "SLAM: `ros2 launch turtlebot3_cartographer cartographer.launch.py`",
      "Save map: `ros2 run nav2_map_server map_saver_cli -f ~/tb3_map`",
      "Nav2 (optional): `ros2 launch turtlebot3_navigation2 navigation2.launch.py map:=$HOME/tb3_map.yaml`",
    ],
  },
];

export default slidesData;
