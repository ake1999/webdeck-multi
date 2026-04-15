// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S08/01_tb3_slam_sim.slides.js
// Session S08 — SLAM in Simulation: Cartographer + SLAM Toolbox + map inspection + save map + Nav2 preview
// NOTE: Students' .bashrc already sets ROS / TB3 / workspace env, so commands stay short.
// NOTE: Keep text light per slide; split ideas across slides instead of crowding.

export const topicMeta = {
  id: "01_tb3_slam_sim",
  title: "SLAM in Simulation: Cartographer + SLAM Toolbox",
  duration: 110,
};

const slidesData = [
  // 0
  {
    type: "title",
    hud: "SLAM Sim",
    title: "SLAM in Simulation: Cartographer + SLAM Toolbox",
    subtitle: "Make maps, inspect /map, tune parameters, save maps, preview Nav2",
    meta: "UOttawa Mobile Robotics • Instructor: Ali Karimzadeh",
    notes:
      "Say: Today they must learn both pipelines, not only one. For the assignment, they should create maps with both methods and compare them.",
  },

  // 1
  {
    type: "bullets",
    hud: "Goals",
    title: "What you must be able to do after this block",
    lead: "For the assignment, you will make and compare maps from **both** SLAM methods.",
    bullets: [
      "Run **Cartographer** in simulation and save a map",
      "Run **SLAM Toolbox** in simulation and save a map",
      "Inspect `/map`, RViz, TF, RobotModel, and LaserScan",
      "Compare setup, tuning style, map quality, and ease of use",
      "Preview how the saved map is used later in **Nav2**",
    ],
  },

  // 2
  {
    type: "bullets",
    hud: "Quick Compare",
    title: "Cartographer vs SLAM Toolbox — very basic difference",
    lead: "Both produce a 2D occupancy map, but the workflow feels different.",
    bullets: [
      "**Cartographer** = default TurtleBot3 sim path; tuning is mainly in a **Lua** file",
      "**SLAM Toolbox** = strong 2D Nav2 workflow; many settings appear as ROS 2 parameters",
      "SLAM Toolbox is easier to inspect with `ros2 param ...` while running",
      "Cartographer is powerful but more configuration-heavy to tune deeply",
      "For your assignment: build with **both**, then research the differences",
    ],
  },

  // 3
  {
    type: "bullets",
    hud: "Start World",
    title: "Step 0: launch one simulation world",
    lead: "Start the Gazebo world once. Then test **one** SLAM package at a time.",
    bullets: [
      "Recommended worlds for mapping: **World** or **House**",
      "Do **not** run Cartographer and SLAM Toolbox at the same time",
      "```bash\nros2 launch turtlebot3_gazebo turtlebot3_world.launch.py\n```",
      "or",
      "```bash\nros2 launch turtlebot3_gazebo turtlebot3_house.launch.py\n```",
    ],
  },

  // 4
  {
    type: "bullets",
    hud: "Cartographer",
    title: "Cartographer workflow (method A)",
    lead: "This is the official default TurtleBot3 SLAM simulation path.",
    bullets: [
      "Terminal 1: Gazebo world is already running",
      "Terminal 2:",
      "```bash\nros2 launch turtlebot3_cartographer cartographer.launch.py use_sim_time:=True\n```",
      "Terminal 3:",
      "```bash\nros2 run turtlebot3_teleop teleop_keyboard\n```",
      "Later, save with `map_saver_cli`",
    ],
  },

  // 5
  {
    type: "bullets",
    hud: "SLAM Toolbox",
    title: "SLAM Toolbox workflow (method B)",
    lead: "This is a clean 2D SLAM workflow and fits well with Nav2.",
    bullets: [
      "Terminal 1: Gazebo world is already running",
      "Terminal 2:",
      "```bash\nros2 launch slam_toolbox online_async_launch.py use_sim_time:=True\n```",
      "Terminal 3:",
      "```bash\nros2 run turtlebot3_teleop teleop_keyboard\n```",
      "Later, save with the same `map_saver_cli` command",
    ],
  },

  // 6
  {
    type: "bullets",
    hud: "RViz",
    title: "Open RViz and add the key displays yourself",
    lead: "Do this for **either** SLAM package so you understand the data flow.",
    bullets: [
      "```bash\nrviz2\n```",
      "Set **Fixed Frame** = `map`",
      "Add displays: **Map**, **TF**, **RobotModel**, **LaserScan**",
      "Map topic = `/map` • LaserScan topic = `/scan`",
      "Healthy SLAM should give `/map` and a `map -> odom` transform",
    ],
  },

  // 7
  {
    type: "two-col",
    hud: "RViz",
    title: "RViz checklist: what each display tells you",
    left: {
      bullets: [
        "**Map** → live occupancy grid",
        "**TF** → frame tree health",
        "**RobotModel** → robot pose/orientation",
        "**LaserScan** → raw LiDAR hits",
        "If map updates but TF is broken, navigation later will fail",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://emanual.robotis.com/assets/images/platform/turtlebot3/quick_start/bringup/run_rviz.jpg",
        source: "ROBOTIS eManual — RViz2 example",
        sourceHref: "https://emanual.robotis.com/docs/en/platform/turtlebot3/bringup/",
      },
    },
  },

  // 8
  {
    type: "bullets",
    hud: "Inspect /map",
    title: "Look inside the `/map` topic",
    lead: "Before treating the map as an image, inspect the actual ROS message.",
    bullets: [
      "```bash\nros2 topic echo /map --once\n```",
      "Look for `info.resolution`, `info.width`, `info.height`, and `info.origin`",
      "The long `data` array stores occupancy values cell-by-cell",
      "`-1` usually means **unknown**",
      "Values near `0` are free; values near `100` are occupied",
    ],
    notes:
      "Say: `/map` is not just a picture. It is a message with metadata plus a big row-major data array. When saved, the PGM is the visual view and YAML stores resolution and origin.",
  },

  // 9
  {
    type: "two-col",
    hud: "Map Data",
    title: "How `/map` becomes the image you save later",
    left: {
      bullets: [
        "`resolution` = meters per grid cell",
        "`width`, `height` = number of cells",
        "`origin` = real pose of cell `(0,0)`",
        "The saved `.pgm` is a picture of those grid values",
        "The `.yaml` stores the metadata Nav2 needs later",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://emanual.robotis.com/assets/images/platform/turtlebot3/slam/platform_cartographer.png",
        source: "ROBOTIS eManual — Occupancy Grid Map",
        sourceHref: "https://emanual.robotis.com/docs/en/platform/turtlebot3/slam/",
      },
    },
  },

  // 10
  {
    type: "bullets",
    hud: "Map Math",
    title: "Map cell to real-world position (important for projects)",
    lead: "If you pick a point from the map image, convert it to the `map` frame.",
    bullets: [
      "Cell center formula:",
      "```text\nx = origin_x + (gx + 0.5) * resolution\ny = origin_y + (gy + 0.5) * resolution\n```",
      "`gx, gy` = grid cell indices",
      "`origin_x, origin_y, resolution` come from the map metadata",
      "If you click directly in RViz, RViz already gives you a pose in the `map` frame",
    ],
    notes:
      "Say: For project code, RViz clicking is easiest because coordinates are already in the map frame. Pixel-to-world conversion is useful when they inspect the saved map image manually.",
  },

  // 11
  {
    type: "bullets",
    hud: "Driving Tips",
    title: "How to move the robot to get a better looking map",
    lead: "Map quality is affected by **how** you drive, not only by the algorithm.",
    bullets: [
      "Move **slowly** and avoid sudden spins",
      "Show the laser clear corners, wall edges, and door frames",
      "Do **loop-backs**: revisit known areas to help loop closure",
      "Avoid clipping furniture tightly; keep a little clearance",
      "If the map stretches badly, stop, rescan calmly, then continue",
    ],
    notes:
      "Say: The robot should not race. Smooth motion gives more stable matching. Corners and door edges are especially valuable because they create distinctive geometry for the SLAM backend.",
  },

  // 12
  {
    type: "bullets",
    hud: "Save Map",
    title: "Save the map from either method",
    lead: "The save command is the same whether you mapped with Cartographer or SLAM Toolbox.",
    bullets: [
      "Cartographer example:",
      "```bash\nros2 run nav2_map_server map_saver_cli -f ~/map_carto\n```",
      "SLAM Toolbox example:",
      "```bash\nros2 run nav2_map_server map_saver_cli -f ~/map_toolbox\n```",
      "This gives you a `.pgm` image and a `.yaml` metadata file",
    ],
  },

  // 13
  {
    type: "bullets",
    hud: "GIMP Tutorial",
    title: "GIMP cleanup tutorial (Part 1): open and edit safely",
    lead: "Use GIMP only for **tiny repairs** like broken wall pixels or isolated noise.",
    bullets: [
      "First make a backup: `map_toolbox.pgm` → `map_toolbox_backup.pgm`",
      "Open GIMP, then open the **`.pgm`** map image file",
      "Zoom in a lot: **400%–1600%** so you can edit individual pixels",
      "Use the **Pencil Tool**, not the Brush tool, for sharp 1-pixel edits",
      "Set brush size to **1 px** and use **black** for occupied, **white** for free",
    ],
    notes:
      "Say: Pencil is better than brush because brush makes soft edges and anti-aliasing. We want crisp map cells, not blurred edges.",
  },

  // 14
  {
    type: "bullets",
    hud: "GIMP Tutorial",
    title: "GIMP cleanup tutorial (Part 2): what to fix, what not to fix",
    lead: "Keep edits minimal so the map still matches the real environment.",
    bullets: [
      "Okay: reconnect a tiny broken wall edge or remove a tiny black/white speck",
      "Not okay: invent new walls, erase real obstacles, or close open doors",
      "Do **not** crop, rotate, resize, blur, or scale the image",
      "Save the edited `.pgm`; keep the YAML matched to the same map geometry",
      "Reload in RViz/Nav2 and verify the robot still aligns with the map",
    ],
    notes:
      "Say: If they change image size or orientation, the YAML metadata may no longer match. This is a last-resort cleanup step, not map redesign.",
  },

  // 15
  {
    type: "bullets",
    hud: "SLAM Toolbox Params",
    title: "How to inspect SLAM Toolbox parameters",
    lead: "SLAM Toolbox exposes many ROS 2 parameters while the node is running.",
    bullets: [
      "```bash\nros2 node list\nros2 param list /slam_toolbox\n```",
      "Inspect one parameter:",
      "```bash\nros2 param get /slam_toolbox resolution\nros2 param describe /slam_toolbox resolution\n```",
      "Focus on the important parameters first, not every solver option",
    ],
    notes:
      "Say: They may see a huge list. That is normal. Many names are internal solver or search settings. Beginners should first learn map resolution, laser range limits, motion update thresholds, loop closure, and transform publishing.",
  },

  // 16
  {
    type: "bullets",
    hud: "SLAM Toolbox Params",
    title: "Important SLAM Toolbox parameters (part 1)",
    lead: "These directly affect map detail, scan use, and update frequency.",
    bullets: [
      "`resolution` → smaller cells = finer detail, more memory/compute",
      "`min_laser_range` → ignore very near noisy returns near the robot body",
      "`max_laser_range` → ignore very far returns that may be weak or unstable",
      "`minimum_travel_distance` → robot must move this far before updating",
      "`minimum_travel_heading` → robot must rotate this much before updating",
    ],
    notes:
      "Say: If `resolution` is too coarse, thin features may vanish. If too fine, the map looks detailed but costs more. Larger travel thresholds reduce update frequency; smaller thresholds create denser updates but can add computation and sometimes noise.",
  },

  // 17
  {
    type: "bullets",
    hud: "SLAM Toolbox Params",
    title: "Important SLAM Toolbox parameters (part 2)",
    lead: "These affect loop closure, TF freshness, and scan processing behavior.",
    bullets: [
      "`map_update_interval` → how often the occupancy map is regenerated",
      "`do_loop_closing` → revisited places can be matched to reduce drift",
      "`scan_topic` → usually `/scan`; wrong topic means no mapping data",
      "`transform_publish_period` → how often `map -> odom` is published",
      "`use_scan_matching` → whether scans are aligned to improve pose estimates",
    ],
    notes:
      "Say: If map updates feel slow in RViz, map update interval may be large. Loop closure is one of the big reasons a map can straighten itself after revisiting an area. If TF is stale, navigation later will feel broken even if the map exists.",
  },

  // 18
  {
    type: "bullets",
    hud: "SLAM Toolbox Tune",
    title: "How to tune SLAM Toolbox live and save your settings",
    lead: "Use CLI first. If your machine has a parameter plugin in `rqt`, you can use that too.",
    bullets: [
      "Optional GUI view:",
      "```bash\nrqt\n```",
      "Live CLI example:",
      "```bash\nros2 param set /slam_toolbox map_update_interval 2.0\n```",
      "Save current values:",
      "```bash\nros2 param dump /slam_toolbox > ~/slam_toolbox_tuned.yaml\n```",
    ],
    notes:
      "Say: In class, CLI is the safest guaranteed path. With rqt, if a parameter or reconfigure-style plugin is installed, they can inspect or change values visually. If a live set is rejected, that parameter may need to be provided at startup from YAML.",
  },

  // 19
  {
    type: "bullets",
    hud: "Cartographer Params",
    title: "How to inspect Cartographer tuning files",
    lead: "For TurtleBot3 in our workspace, Cartographer is mainly tuned from a **Lua** config file.",
    bullets: [
      "Go to your workspace source tree:",
      "```bash\nsrc\nfind . -name turtlebot3_lds_2d.lua\n```",
      "Then open the file you found:",
      "```bash\nnano <path_from_find>\n```",
      "Typical workflow: edit file → relaunch Cartographer → compare maps",
    ],
    notes:
      "Say: We are tuning the copy in `~/ros2_ws/src`, not hunting under `/opt/ros`. That makes their own workspace the source of truth for experiments.",
  },

  // 20
  {
    type: "bullets",
    hud: "Cartographer Params",
    title: "Important Cartographer parameters (part 1)",
    lead: "These are the first TurtleBot3 Cartographer settings worth understanding.",
    bullets: [
      "`min_range` → ignore scans too close to the robot",
      "`max_range` → ignore scans too far away",
      "`missing_data_ray_length` → assumed ray length when no obstacle is hit",
      "`use_imu_data` → use IMU if available and reliable",
      "`use_online_correlative_scan_matching` → stronger local scan matching",
    ],
    notes:
      "Say: `missing_data_ray_length` affects how empty space is represented when the scanner does not get a valid hit. Enabling online correlative scan matching can improve local alignment, but it can also cost more computation.",
  },

  // 21
  {
    type: "bullets",
    hud: "Cartographer Params",
    title: "Important Cartographer parameters (part 2)",
    lead: "These influence filtering, loop closure, and global optimization behavior.",
    bullets: [
      "`motion_filter.max_angle_radians` → skip tiny-angle scan updates",
      "`optimize_every_n_nodes` → how often global optimization runs",
      "`constraint_builder.min_score` → minimum score for accepting a match",
      "`global_localization_min_score` → trust threshold for global matches",
      "Cartographer is powerful, but it is usually less live-friendly than Toolbox",
    ],
    notes:
      "Say: If optimization runs more often, the map may improve sooner but computation rises. If match score thresholds are too low, false matches become more likely; too high and good loop closures may be missed.",
  },

  // 22
  {
    type: "bullets",
    hud: "Tune Strategy",
    title: "How to tune Cartographer vs SLAM Toolbox",
    lead: "Use different habits for the two methods.",
    bullets: [
      "**SLAM Toolbox**: inspect with `ros2 param list/get/describe`, then try live changes",
      "**Cartographer**: edit the `.lua` file, relaunch, drive the same path, compare",
      "Change **one parameter at a time** and keep notes",
      "Save map files with different names so you can compare outputs later",
      "For the assignment, include what you changed and what happened",
    ],
  },

  // 23
  {
    type: "bullets",
    hud: "Nav2 Preview",
    title: "Nav2 preview: run navigation with a saved map",
    lead: "This is only to help you start early. We will explain Nav2 properly next session.",
    bullets: [
      "Launch the world first, then run Nav2 with one saved map:",
      "```bash\nros2 launch turtlebot3_navigation2 navigation2.launch.py \\\n  use_sim_time:=True map:=$HOME/map_toolbox.yaml\n```",
      "Or use your Cartographer YAML instead",
      "In RViz: set **2D Pose Estimate** first, then send a navigation goal",
      "Next session: AMCL, costmaps, planners, controllers, and goal sending",
    ],
  },

  // 24
  {
    type: "bullets",
    hud: "Docs",
    title: "Documentation links you should open while working",
    lead: "These are the main references behind today’s steps and parameter descriptions.",
    bullets: [
      "[TurtleBot3 SLAM Simulation](https://emanual.robotis.com/docs/en/platform/turtlebot3/slam_simulation/)",
      "[TurtleBot3 SLAM + Cartographer tuning notes](https://emanual.robotis.com/docs/en/platform/turtlebot3/slam/)",
      "[Nav2: Navigating while Mapping (SLAM)](https://docs.nav2.org/tutorials/docs/navigation2_with_slam.html)",
      "[slam_toolbox docs (parameters)](https://docs.ros.org/en/humble/p/slam_toolbox/)",
      "[Cartographer ROS tuning guide](https://google-cartographer-ros.readthedocs.io/en/latest/tuning.html)",
    ],
  },
];

export default slidesData;
