// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S08/01_nav2_overview_project.slides.js
// Session S08 — Nav2 high-level structure + planner ideas + project bridge to waypoints / keepout / tuning
// NOTE: Slides are intentionally self-explanatory so students can learn from reading alone.
// NOTE: Code is split across slides to stay readable in the deck.

export const topicMeta = {
  id: "01_nav2_overview_project",
  title: "Nav2 Overview: Architecture, Planning, Parameters, and Project Use",
  duration: 120,
};

const slidesData = [
  // 0
  {
    type: "title",
    hud: "Nav2",
    title: "Navigation2 (Nav2) — How the Stack Actually Works",
    subtitle:
      "From saved map → localization → planning → control → multi-goal project behavior",
    meta: "UOttawa Mobile Robotics • Instructor: Ali Karimzadeh",
    notes:
      "Say: This is our last lecture. Today we connect your map, localization, planning, control, and project logic into one complete mental model.",
  },

  // 1
  {
    type: "bullets",
    hud: "Why",
    title: "Why this session matters for your final project",
    lead: "You already know how to make a map. Now you must know how the robot **uses** that map.",
    bullets: [
      "Nav2 is the ROS 2 navigation stack used after you already have a map",
      "Your project needs more than one clicked goal — it needs **programmatic behavior**",
      "Today you learn the structure: navigator, servers, plugins, parameters, costmaps, and filters",
      "Then we connect that structure to **waypoints**, room logic, and restricted areas",
    ],
  },

  // 2
  {
    type: "bullets",
    hud: "Big Picture",
    title: "Where Nav2 fits in the full robot pipeline",
    lead: "Think of Nav2 as the layer that turns map + localization into motion commands.",
    bullets: [
      "1) Build or load a map (`map_server` or SLAM output)",
      "2) Localize the robot in that map (often **AMCL** for a saved static map)",
      "3) Nav2 plans a path and computes safe velocity commands",
      "4) Your application sends one goal or many goals to Nav2",
      "TurtleBot3 flow: map first, then run Navigation2 with the saved `.yaml` map file",
    ],
  },

  // 3
  {
    type: "two-col",
    hud: "Architecture",
    title: "Nav2 architecture: one stack, many cooperating parts",
    left: {
      bullets: [
        "Nav2 is **not** one magic node",
        "The **BT Navigator** coordinates the task",
        "Servers below it do planning, control, smoothing, and behaviors",
        "Costmaps + TF + localization support all of those decisions",
        "This picture is your main mental model for today",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://docs.nav2.org/_images/nav2_architecture.png",
        source: "Nav2 docs — architecture diagram",
        sourceHref: "https://docs.nav2.org/concepts/index.html",
      },
    },
  },

  // 4
  {
    type: "bullets",
    hud: "Core Idea",
    title: "What each major Nav2 part does (Part 1)",
    lead: "Each server has a different job. Confusing them makes debugging and tuning much harder.",
    bullets: [
      "**BT Navigator** = high-level task logic; coordinates the rest of the stack",
      "**Planner Server** = computes a path from current pose to goal using the **global costmap**",
      "**Controller Server** = follows that path and outputs velocity commands using the **local costmap**",
      "**Smoother Server** = improves a rough path before or during execution",
    ],
  },

  // 5
  {
    type: "bullets",
    hud: "Core Idea",
    title: "What each major Nav2 part does (Part 2)",
    lead: "These parts make the system robust enough for real robots, not only demos.",
    bullets: [
      "**Behavior Server** = utility / recovery actions such as spin, backup, wait, drive-on-heading",
      "**Lifecycle Manager** = starts and stops the stack in a controlled order",
      "**Map / Localization** = gives Nav2 the robot pose in the map frame",
      "**Plugins** = the actual algorithms loaded into planner, controller, smoother, and behavior servers",
    ],
  },

  // 6
  {
    type: "two-col",
    hud: "TF",
    title: "Nav2 depends on TF: `map -> odom -> base_link`",
    left: {
      bullets: [
        "The minimum useful mobile robot TF chain is:",
        "`map -> odom -> base_link -> sensor frames`",
        "`map -> odom` = global correction from SLAM / AMCL / localization",
        "`odom -> base_link` = local motion estimate from odometry",
        "If this chain is wrong, Nav2 cannot navigate reliably",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://docs.nav2.org/_images/tf_full_tree.png",
        source: "Nav2 docs — full TF tree",
        sourceHref:
          "https://docs.nav2.org/setup_guides/transformation/setup_transforms.html",
      },
    },
  },

  // 7
  {
    type: "bullets",
    hud: "Localization",
    title: "Saved map navigation: where AMCL fits",
    lead: "For your project, the usual static-map flow is: saved map + AMCL + Nav2.",
    bullets: [
      "SLAM builds the map; **AMCL** localizes the robot inside that saved map",
      "Before sending goals, you must set **2D Pose Estimate** in RViz",
      "This initializes localization so the robot aligns with the map correctly",
      "TurtleBot3 docs explicitly require pose initialization before normal navigation",
    ],
  },

  // 8
  {
    type: "bullets",
    hud: "Costmaps",
    title: "Map vs Costmap: they are not the same thing",
    lead: "Students often think the saved map is the only navigation representation. It is not.",
    bullets: [
      "A saved map is mostly occupancy information: free / occupied / unknown",
      "A **costmap** adds navigation cost information around obstacles",
      "**Global costmap** supports path planning across the environment",
      "**Local costmap** supports short-range safe motion around the robot",
      "Planner uses global costmap; controller uses local costmap",
    ],
  },

  // 9
  {
    type: "bullets",
    hud: "Costmaps",
    title: "Typical costmap layers you should recognize",
    lead: "These are loaded as plugins and combined into the final costmap representation.",
    bullets: [
      "**Static layer** = the saved map or map server data",
      "**Obstacle layer** = current sensor obstacles, such as LaserScan readings",
      "**Inflation layer** = grows cost around obstacles to create a safety margin",
      "These layers explain why the robot avoids walls before physically touching them",
      "Layers are configured in YAML, not hard-coded inside your Python node",
    ],
  },

  // 10
  {
    type: "two-col",
    hud: "Filters",
    title: "Filters: change where the robot may go, not just how it plans",
    left: {
      bullets: [
        "**Filters** are different from normal costmap layers",
        "**Keepout filter** can forbid entry to dangerous or undesirable areas",
        "Useful project examples: table feet, narrow edges, entrance zones",
        "A keepout mask is just another map-like image + YAML metadata",
        "You can enable it in global and/or local costmaps",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://docs.nav2.org/_images/keepout_global.png",
        source: "Nav2 docs — keepout filter result",
        sourceHref:
          "https://docs.nav2.org/tutorials/docs/navigation2_with_keepout_filter.html",
      },
    },
  },

  // 11
  {
    type: "bullets",
    hud: "Keepout",
    title: "Important keepout filter design idea",
    lead: "Where you enable the keepout filter changes the behavior you get.",
    bullets: [
      "Global costmap keepout only → planner avoids those zones in the path",
      "Local costmap keepout only → robot refuses to enter them locally, but path may still cross them",
      "Best safety behavior usually means enabling keepout in **both** global and local costmaps",
      "Keepout is realistic for your project; it is easier than full custom coverage planning",
    ],
  },

  // 12
  {
    type: "bullets",
    hud: "Behavior Trees",
    title:
      "Behavior Trees (BTs): the logic layer on top of planning and control",
    lead: "BTs do not replace planners or controllers. They decide **when** to use them.",
    bullets: [
      "BT Navigator implements tasks like `NavigateToPose` and `NavigateThroughPoses`",
      "A BT may compute a path, follow it, replan, and trigger recovery behaviors if needed",
      "This is why Nav2 is flexible: task logic is separated from low-level motion logic",
      "You do not need to write custom BT XML today — just understand the idea",
    ],
  },

  // 13
  {
    type: "bullets",
    hud: "Planning",
    title: "Planner plugins: what students should care about",
    lead: "In Nav2, the planner is a **plugin** inside the Planner Server — you choose it in YAML.",
    bullets: [
      "For this course, focus on the built-in planner families you can actually configure",
      "**NavFn** = classic grid planner; can use Dijkstra or A*",
      "**Smac 2D** = optimized 2D cost-aware planner for common mobile robots",
      "**Theta Star** = any-angle planner that can produce less grid-like paths",
      "You select the planner by `planner_plugins` and the plugin `type` in `planner_server`",
    ],
  },

  // // 14
  // {
  //   type: "bullets",
  //   hud: "Planning",
  //   title: "NavFn vs Smac 2D vs Theta Star",
  //   lead: "These are the three most useful planner plugins for your current level.",
  //   bullets: [
  //     "**NavFn Planner** = simple and classic; good mental starting point for grid navigation",
  //     "**Smac Planner 2D** = 2D cost-aware planner with modern implementation and good performance",
  //     "**Theta Star Planner** = useful when you want more direct, any-angle path segments",
  //     "For TurtleBot3 indoor navigation, these are more practical than inventing a custom planner",
  //     "If paths look too blocky or too conservative, planner choice can matter a lot",
  //   ],
  // },

  // // 15
  // {
  //   type: "bullets",
  //   hud: "Planning",
  //   title: "Know these too: Smac Hybrid-A* and State Lattice",
  //   lead: "You may not use them now, but you should know why they exist.",
  //   bullets: [
  //     "**Smac Hybrid-A*** = kinematically feasible planner; supports reversing",
  //     "Useful when robot motion constraints matter more than simple 2D grid motion",
  //     "**Smac Lattice** = state-lattice planning with precomputed control sets",
  //     "Useful for more complex vehicle models and motion constraints",
  //     "These are more advanced than the basic TurtleBot3 project path, but important to recognize",
  //   ],
  // },

  // 16
  {
    type: "bullets",
    hud: "Planning",
    title: "How planner plugins are selected in YAML",
    lead: "The Planner Server is the framework. The plugin entry is the actual planning algorithm.",
    bullets: [
      "```yaml\nplanner_server:\n  ros__parameters:\n    planner_plugins: ['GridBased']\n    GridBased:\n      plugin: 'nav2_navfn_planner::NavfnPlanner'\n```",
      "Change the `plugin` string to switch algorithms",
      "Then tune that planner’s own parameters in the same namespace",
      "This is why Nav2 is flexible: same server, different planning algorithm",
    ],
  },

  // 17
  {
    type: "bullets",
    hud: "RViz",
    title: "The most basic Nav2 workflow in RViz",
    lead: "This is the simple interactive version before we move to programmatic goals.",
    bullets: [
      "1) Launch world + Nav2 with a saved map",
      "2) Use **2D Pose Estimate** to initialize AMCL",
      "3) Use **Navigation2 Goal** to send one pose goal",
      "4) Do **not** keep teleop publishing `cmd_vel` while Nav2 is navigating",
      "This is useful for testing, but not enough for your final project",
    ],
  },

  // 18
  {
    type: "bullets",
    hud: "Inspect",
    title: "What you can inspect while Nav2 is running",
    lead: "These commands help you connect the architecture diagram to live ROS entities.",
    bullets: [
      '```bash\nros2 node list | grep -E "bt|planner|controller|behavior|amcl"\n```',
      '```bash\nros2 action list | grep -E "navigate|waypoint"\n```',
      '```bash\nros2 topic list | grep -E "costmap|plan|cmd_vel"\n```',
      "These commands show that Nav2 is a real multi-node system, not one monolithic node",
    ],
  },

  // 19
  {
    type: "bullets",
    hud: "Project Bridge",
    title: "For your project, one clicked goal is not enough",
    lead: "Your robot should move through rooms and tasks programmatically.",
    bullets: [
      "`NavigateToPose` = one goal pose",
      "`NavigateThroughPoses` = one action request containing multiple poses",
      "`FollowWaypoints` = ordered waypoint execution with progress feedback",
      "For room-to-room tasks, waypoint-style execution is usually the easiest starting point",
    ],
  },

  // 20
  {
    type: "bullets",
    hud: "Commander",
    title: "Why we use Nav2 Simple Commander in class",
    lead: "It gives you “navigation as a library” instead of forcing raw action-client boilerplate.",
    bullets: [
      "Simple Commander provides `goToPose()`, `goThroughPoses()`, and `followWaypoints()`",
      "It also gives `setInitialPose()`, `waitUntilNav2Active()`, `getFeedback()`, and `getResult()`",
      "This is ideal for your project because you can focus on robot behavior, not ROS plumbing",
      "We will implement **multiple goal execution** using this API",
    ],
  },

  // 21
  {
    type: "bullets",
    hud: "Package",
    title: "Create a new Python package for your waypoint demo",
    lead: "We will make a small package in your own workspace so the code is easy to build and run.",
    bullets: [
      "```bash\nws\nsrc\nros2 pkg create nav2_waypoint_demo \\\n  --build-type ament_python \\\n  --dependencies rclpy geometry_msgs nav2_simple_commander\n```",
      "This creates `package.xml`, `setup.py`, and the Python module folder for you",
    ],
  },

  // 22
  {
    type: "bullets",
    hud: "Package",
    title: "Create the Python node file",
    lead: "Put the node inside the Python module folder created by `ros2 pkg create`.",
    bullets: [
      "```bash\ncd ~/ros2_ws/src/nav2_waypoint_demo/nav2_waypoint_demo\nnano house_waypoints_demo.py\n```",
      "We will paste the code in the next slides",
      "The module folder already contains `__init__.py`, so Python can import it correctly",
    ],
  },

  // 23
  {
    type: "bullets",
    hud: "Code Demo",
    title: "Python waypoint demo (Part 1/6): imports + helper start",
    lead: "We use `BasicNavigator` from Simple Commander and a helper to make poses cleanly.",
    bullets: [
      "```python\nimport rclpy\nfrom math import sin, cos\nfrom geometry_msgs.msg import PoseStamped\nfrom nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult\n\n\ndef make_pose(nav, x, y, yaw):\n```",
      "The helper takes `nav` so we can timestamp each pose using the navigator clock",
    ],
  },

  // 24
  {
    type: "bullets",
    hud: "Code Demo",
    title: "Python waypoint demo (Part 2/6): finish the pose helper",
    lead: "Yaw in radians becomes quaternion `z` and `w` for flat-ground motion.",
    bullets: [
      "```python\n    p = PoseStamped()\n    p.header.frame_id = 'map'\n    p.header.stamp = nav.get_clock().now().to_msg()\n    p.pose.position.x = x\n    p.pose.position.y = y\n    p.pose.orientation.z = sin(yaw / 2.0)\n    p.pose.orientation.w = cos(yaw / 2.0)\n    return p\n```",
      "For many beginner mobile-robot demos, yaw is the only orientation part we set carefully",
    ],
  },

  // 25
  {
    type: "bullets",
    hud: "Code Demo",
    title: "Python waypoint demo (Part 3/6): start `main()`",
    lead: "Always initialize ROS and create the navigator before sending any goals.",
    bullets: [
      "```python\ndef main():\n    rclpy.init()\n    nav = BasicNavigator()\n\n    initial_pose = make_pose(nav, -1.0, -1.0, 0.0)\n    nav.setInitialPose(initial_pose)\n    nav.waitUntilNav2Active()\n```",
      "The initial pose step is important because AMCL must know where the robot starts in the map",
    ],
  },

  // 26
  {
    type: "bullets",
    hud: "Code Demo",
    title: "Python waypoint demo (Part 4/6): define the waypoint list",
    lead: "These are example poses in the House world. In your project, use your own room points.",
    bullets: [
      "```python\n    waypoints = [\n        make_pose(nav, -0.5, -1.0, 0.0),\n        make_pose(nav,  0.8, -1.0, 0.0),\n        make_pose(nav,  0.8,  0.6, 1.57),\n        make_pose(nav, -0.3,  0.8, 3.14),\n    ]\n```",
      "Each waypoint is a `PoseStamped` in the `map` frame",
    ],
  },

  // 27
  {
    type: "bullets",
    hud: "Code Demo",
    title: "Python waypoint demo (Part 5/6): run and monitor the task",
    lead: "The navigation call is non-blocking, so we poll feedback until it completes.",
    bullets: [
      "```python\n    nav.followWaypoints(waypoints)\n\n    while not nav.isTaskComplete():\n        fb = nav.getFeedback()\n        if fb:\n            print('Current waypoint:', fb.current_waypoint)\n```",
      "This is the simplest bridge from your saved map to multi-room behavior",
    ],
  },

  // 28
  {
    type: "bullets",
    hud: "Code Demo",
    title: "Python waypoint demo (Part 6/6): result handling + shutdown",
    lead: "Always print the result so you know whether the task succeeded or failed.",
    bullets: [
      "```python\n    result = nav.getResult()\n    print('Result:', result)\n    nav.destroyNode()\n    rclpy.shutdown()\n\n\nif __name__ == '__main__':\n    main()\n```",
      "This is enough for a clean first project-style waypoint node",
    ],
  },

  // 29
  {
    type: "bullets",
    hud: "Package",
    title: "Add the console script entry point in `setup.py`",
    lead: "Without the entry point, `ros2 run` will not know how to start your node.",
    bullets: [
      "Open the file:",
      "```bash\ncd ~/ros2_ws/src/nav2_waypoint_demo\nnano setup.py\n```",
      "Inside `entry_points`, add:",
      "```python\n'house_waypoints_demo = nav2_waypoint_demo.house_waypoints_demo:main',\n```",
    ],
  },

  // 30
  {
    type: "bullets",
    hud: "Build",
    title: "Build the package and check the import",
    lead: "Build from the workspace root, then source the overlay before running.",
    bullets: [
      "```bash\ncb\nsource ~/ros2_ws/install/setup.bash\n```",
      "Optional quick import check:",
      "```bash\npython3 -c \"from nav2_simple_commander.robot_navigator import BasicNavigator; print('ok')\"\n```",
      "If the import fails, your Nav2 / `nav2_simple_commander` install is incomplete",
    ],
  },

  // 31
  {
    type: "bullets",
    hud: "Run",
    title: "Run everything end-to-end",
    lead: "These are the three terminals needed for the live demo.",
    bullets: [
      "Terminal 1: `ros2 launch turtlebot3_gazebo turtlebot3_house.launch.py`",
      "Terminal 2:",
      "```bash\nros2 launch turtlebot3_navigation2 navigation2.launch.py \\\n  use_sim_time:=True map:=$HOME/map_toolbox.yaml\n```",
      "Terminal 3: `ros2 run nav2_waypoint_demo house_waypoints_demo`",
      "Before running Terminal 3, make sure Nav2 is active and localization is initialized",
    ],
  },

  // 32
  {
    type: "bullets",
    hud: "Params",
    title: "Where to find parameters to tune",
    lead: "The YAML file is where most of the important navigation behavior is configured.",
    bullets: [
      "Search your workspace source tree first:",
      '```bash\nsrc\nfind . -path "*turtlebot3_navigation2*" -name "*.yaml"\n```',
      "Useful searches:",
      '```bash\ngrep -R "planner_server:" -n .\ngrep -R "xy_goal_tolerance" -n .\n```',
      "If your active package is not in the workspace, check `ros2 pkg prefix turtlebot3_navigation2`",
    ],
  },

  // 33
  {
    type: "bullets",
    hud: "Params",
    title: "Where the main parameter groups usually live",
    lead: "When navigation looks wrong, you must know which YAML section to inspect first.",
    bullets: [
      "`amcl:` → localization behavior on a static saved map",
      "`bt_navigator:` → task logic / BT settings",
      "`planner_server:` → path-generation plugins and related settings",
      "`controller_server:` → path-tracking behavior and checking logic",
      "`global_costmap:` / `local_costmap:` → obstacle representation, inflation, filters",
    ],
  },

  // 34
  {
    type: "bullets",
    hud: "Goal Checker",
    title: "Goal checker parameters you should recognize by name",
    lead: "These are real parameter names you may tune when the robot “almost reaches” the goal but keeps adjusting.",
    bullets: [
      "`xy_goal_tolerance` = how close the robot must be to the goal position in meters",
      "`yaw_goal_tolerance` = how close the robot heading must be to the goal orientation in radians",
      "`path_length_tolerance` = how much remaining path length is still acceptable",
      "`stateful` = keeps the goal check robust after final orientation correction",
      "These live under the selected goal checker plugin inside `controller_server`",
    ],
  },

  // 35
  {
    type: "bullets",
    hud: "Params",
    title: "Other high-value parameters worth understanding first",
    lead: "You do not need every parameter. Start with the ones that strongly affect behavior.",
    bullets: [
      "`inflation_radius` = how far obstacle cost spreads outward for safety margin",
      "`cost_scaling_factor` = how sharply cost decays away from obstacles",
      "`transform_tolerance` = how much TF timing lag the node can tolerate",
      "`robot_radius` or `footprint` = what physical space the robot is assumed to occupy",
      "These directly change whether paths are bold, cautious, or unrealistically tight",
    ],
  },

  // 36
  {
    type: "bullets",
    hud: "Plugins",
    title: "Examples of plugin families you will see in Nav2",
    lead: "Remember: the server is the framework; the plugin is the actual algorithm.",
    bullets: [
      "**Planner plugins** choose how a path is computed, such as NavFn, Smac, or Theta*",
      "**Controller plugins** choose how the robot tracks that path and generates `cmd_vel`",
      "**Behavior plugins** provide extra actions like spin, backup, wait, or drive-on-heading",
      "**Smoother plugins** improve path geometry before following it",
      "**Costmap / filter plugins** change traversability, safety margin, and restricted areas",
    ],
  },

  // 37
  {
    type: "bullets",
    hud: "Coverage",
    title: "What about Complete Coverage Path Planning (CCPP)?",
    lead: "Coverage is real and useful, but it is not the first thing I want you to build this semester.",
    bullets: [
      "Coverage planning exists through the **Coverage Server** in `opennav_coverage`",
      "It is not the basic “just load Nav2 and go” path for beginners",
      "For this course, the practical order is: map → rooms → waypoints → keepout if needed",
      "Coverage can be a bonus extension after your basic waypoint project works reliably",
    ],
  },

  // 38
  {
    type: "bullets",
    hud: "Project Advice",
    title: "Recommended project path from today’s lecture",
    lead: "This is the shortest realistic path from where you are now to a working final project.",
    bullets: [
      "1) Use your saved SLAM map and reliable AMCL localization",
      "2) Define room points or room-entry points in the `map` frame",
      "3) Send multiple goals using **Simple Commander** waypoint logic",
      "4) Add a **keepout filter** later if there are risky areas near furniture or entrances",
      "5) Think about full coverage only after the above pipeline is stable",
    ],
  },

  // 39
  {
    type: "bullets",
    hud: "Summary",
    title: "What you should remember from this final lecture",
    bullets: [
      "Nav2 = BT Navigator + task servers + costmaps + TF + localization + plugins",
      "Planner ≠ controller; path generation and path tracking are different jobs",
      "A saved map is not enough — costmaps and TF make navigation practical",
      "For your project, start with **waypoints**, not manual RViz clicking",
      "Keepout filters are a realistic next feature; full coverage is a later bonus",
    ],
  },

  // 40
  {
    type: "bullets",
    hud: "Docs",
    title: "Reference links for today’s session",
    lead: "These are the main official sources behind this lecture.",
    bullets: [
      "[Nav2 Concepts](https://docs.nav2.org/concepts/index.html)",
      "[Nav2 Configuration Guide](https://docs.nav2.org/configuration/index.html)",
      "[Simple Commander API](https://docs.nav2.org/commander_api/index.html)",
      "[SimpleGoalChecker](https://docs.nav2.org/configuration/packages/nav2_controller-plugins/simple_goal_checker.html)",
      "[TurtleBot3 Nav2 Simulation](https://emanual.robotis.com/docs/en/platform/turtlebot3/nav_simulation/)",
    ],
  },

  // 41
  {
    type: "bullets",
    hud: "Docs",
    title: "More references: planning + filters",
    lead: "Open these when you start tuning or extending your project.",
    bullets: [
      "[NavFn Planner](https://docs.nav2.org/configuration/packages/configuring-navfn.html)",
      "[Smac Planner](https://docs.nav2.org/configuration/packages/configuring-smac-planner.html)",
      "[Theta Star Planner](https://docs.nav2.org/configuration/packages/configuring-thetastar.html)",
      "[Keepout Filter Tutorial](https://docs.nav2.org/tutorials/docs/navigation2_with_keepout_filter.html)",
      "[Keepout Filter Parameters](https://docs.nav2.org/configuration/packages/costmap-plugins/keepout_filter.html)",
    ],
  },
];

export default slidesData;
