// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S06/01_launch_params.slides.js
// Session — ROS 2 Parameters + YAML config + Launch files (Python/XML/YAML)

export const topicMeta = {
  id: "01_launch_params",
  title: "ROS 2 Parameters + YAML + Launch Files (Humble)",
  duration: 55,
};

const slidesData = [
  // 0 — TITLE
  {
    type: "title",
    hud: "ROS 2 Essentials",
    title: "Launch Files + Parameters (YAML) — The Practical Way",
    subtitle:
      "How to run multi-node systems and tune behavior (SLAM/Nav2 later)",
    meta: "UOttawa Mobile Robotics • Instructor: Ali Karimzadeh",
    notes:
      "Say: Students will tune SLAM/Nav2 via params and launch files. Today we build that foundation.",
  },

  // 1 — Why this matters
  {
    type: "bullets",
    hud: "Why",
    title: "Why parameters + launch files matter",
    lead: "Most real ROS systems are **configured**, not hard-coded.",
    bullets: [
      "**Parameters** = settings (numbers/strings/flags) that change node behavior",
      "**Launch** = start many nodes + set params + remap topics + namespaces",
      "SLAM/Nav2 are mainly: **launch + config YAML** (lots of parameters)",
      "Goal: you can reproduce runs reliably (same setup every time)",
      "Docs: [Parameters](https://docs.ros.org/en/humble/Concepts/Basic/About-Parameters.html) • [Launch](https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Launch-Main.html)",
    ],
  },

  // 2 — Parameter concept
  {
    type: "bullets",
    hud: "Params",
    title: "Parameters: what they are (and what they are NOT)",
    lead: "A parameter is a named value stored **inside a node**.",
    bullets: [
      "Good for: `max_speed`, `use_sim_time`, `map_frame`, thresholds, gains…",
      "Not good for: high-rate sensor data → that belongs in **topics**",
      "Parameters can be set at **startup** (recommended) or **runtime** (if node allows)",
      "Types: bool, int, float, string, arrays (YAML-typed)",
      "Key idea: Node behavior = **code + parameter values**",
    ],
  },

  // 3 — CLI toolbox
  {
    type: "bullets",
    hud: "CLI",
    title: "The `ros2 param` toolbox (daily commands)",
    lead: "First: find the node name. Then inspect its parameters.",
    bullets: [
      "```bash\nros2 node list            # see running nodes\nros2 param list           # list parameters of ALL nodes\n```",
      "Get/describe a specific parameter:",
      "```bash\nros2 param get /node_name use_sim_time\nros2 param describe /node_name use_sim_time\n```",
      "Official how-to: [Using ros2 param](https://docs.ros.org/en/humble/How-To-Guides/Using-ros2-param.html)",
    ],
  },

  // 4 — Set + dump
  {
    type: "bullets",
    hud: "CLI",
    title: "Set parameters (runtime) + dump to YAML (snapshot)",
    lead: "Runtime changes work only if the node allows changing that parameter.",
    bullets: [
      "Set a value (YAML typing matters):",
      "```bash\nros2 param set /node_name use_sim_time false\nros2 param set /node_name max_speed 0.25\n```",
      "Dump current params to YAML (shareable config):",
      "```bash\nros2 param dump /node_name > dumped_params.yaml\n```",
      "Tip: If `set` fails, the parameter may be **read-only** or **not declared**.",
    ],
  },

  // 5 — MCQ (fix schema)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: Parameters are stored where?",
    question: "In ROS 2, parameters are primarily stored…",
    options: [
      { choice: "A", label: "In a global server like ROS 1 `roscore`" },
      { choice: "B", label: "Inside each **node** (per-node parameters)" },
      { choice: "C", label: "Inside RViz" },
      { choice: "D", label: "Inside `/tf` transforms" },
    ],
    correct: "B",
    explain:
      "ROS 2 parameters are per-node. There is no global ROS 1-style parameter server by default.",
  },

  // 6 — YAML intro
  {
    type: "bullets",
    hud: "YAML",
    title: "YAML parameter files (the standard way for big configs)",
    lead: "YAML = a readable config format (indentation matters).",
    bullets: [
      "Why YAML: many parameters → easier than 200 CLI `param set` commands",
      "Rule: use **spaces**, not tabs",
      "In ROS 2 YAML, parameters go under the key: **`ros__parameters`**",
      "You address parameters by **node name** (and optional namespace)",
      "Guide: [Migrating YAML param files](https://docs.ros.org/en/humble/How-To-Guides/Migrating-from-ROS1/Migrating-Parameters.html#yaml-file-example)",
    ],
  },

  // 7 — YAML structure example
  {
    type: "bullets",
    hud: "YAML",
    title: "YAML structure (general example)",
    lead: "This file sets params for one node + one global param for all nodes.",
    bullets: [
      "```bash\n# save as: config/demo_params.yaml\n```",
      '```yaml\n/my_node:\n  ros__parameters:\n    use_sim_time: false\n    max_speed: 0.25\n    frame_id: "base_link"\n\n/**:\n  ros__parameters:\n    debug: true\n```',
      "Notes: `/**` is a wildcard → applies to **any node** in any namespace.",
    ],
  },

  // 8 — Load params at startup (recommended)
  {
    type: "bullets",
    hud: "Run",
    title: "Load a YAML params file when starting a node (recommended)",
    lead: "Startup params are reproducible (best for SLAM/Nav2 configs).",
    bullets: [
      "General pattern:",
      "```bash\nros2 run <pkg> <exe> \\\n  --ros-args --params-file /path/to/demo_params.yaml\n```",
      "Example (if you have a node named `my_node` in your package):",
      "```bash\nros2 run my_pkg my_node --ros-args --params-file config/demo_params.yaml\n```",
      "ROS args design: [ROS command line arguments](https://design.ros2.org/articles/ros_command_line_arguments.html)",
    ],
  },

  // 9 — RQT reconfigure intro
  {
    type: "two-col",
    hud: "GUI",
    title: "GUI tuning: `rqt_reconfigure` (live parameter editing)",
    left: {
      lead: "Use this when you want to **tune** and see immediate effects.",
      bullets: [
        "Install (once):",
        "```bash\nsudo apt update\nsudo apt install -y ros-humble-rqt-reconfigure\n```",
        "Run:",
        "```bash\nrqt\n```",
        "In rqt: `Plugins → Configure → Dynamic Reconfigure`",
        "If plugin not shown: `rqt --force-discover`",
        "Docs: [rqt_reconfigure](https://docs.ros.org/en/humble/p/rqt_reconfigure/index.html)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://ftp.osuosl.org/pub/ros/download.ros.org/downloads/se_migration/ros/16454550158805003.png",
        source: "ROS Answers archive — rqt_reconfigure screenshot",
        sourceHref: "https://answers.ros.org/question/396507/",
      },
    },
  },

  // 10 — Practical workflow
  {
    type: "bullets",
    hud: "Workflow",
    title: "A practical tuning workflow (do this in projects)",
    lead: "Tune → test → dump → commit the YAML file.",
    bullets: [
      "1) Start system with a baseline config (launch/YAML)",
      "2) Tune key params live (CLI or `rqt_reconfigure`)",
      "3) Save a snapshot:",
      "```bash\nros2 param dump /node_name > tuned.yaml\n```",
      "4) Put final configs in your package: `config/` folder",
    ],
  },

  // 11 — Launch intro
  {
    type: "bullets",
    hud: "Launch",
    title: "Launch files: what they do",
    lead: "Launch files start and configure **multiple nodes** together.",
    bullets: [
      "Start nodes, set parameters, remap names, set namespaces",
      "Make your system reproducible: **one command** to run everything",
      "You will read many `.launch.py` files in TB3/SLAM/Nav2 stacks",
      "Launch tutorial: [Launch main](https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Launch-Main.html)",
    ],
  },

  // 12 — 3 launch formats
  {
    type: "bullets",
    hud: "Launch",
    title: "Launch file formats (3 types)",
    lead: "ROS 2 supports multiple formats — you will mostly see Python.",
    bullets: [
      "**Python** (`.launch.py`) → most flexible (logic, conditions, loops)",
      "**XML** (`.launch.xml`) → structured, less logic",
      "**YAML** (`.launch.yaml`) → compact configs, limited logic",
      "Docs: [Launch formats](https://docs.ros.org/en/jazzy/Tutorials/Intermediate/Launch/Launch-file-different-formats.html)",
    ],
  },

  // 13 — Why Python is common
  {
    type: "bullets",
    hud: "Launch",
    title: "Why `.launch.py` is the most common",
    lead: "Real robot bringup needs conditional logic.",
    bullets: [
      "Example needs: `use_rviz:=true`, choose `slam:=true/false`, pick map file…",
      "Python launch can: declare args, include other launch files, use if/else",
      "You can list launch arguments with:",
      "```bash\nros2 launch <pkg> <file>.launch.py --show-args\n```",
      "Ref: [Using substitutions / show args](https://docs.ros.org/en/foxy/Tutorials/Intermediate/Launch/Using-Substitutions.html)",
    ],
  },

  // 14 — Minimal Python launch (part 1)
  {
    type: "bullets",
    hud: "Launch (Python)",
    title: "Minimal `.launch.py` (Part 1/2): imports + function",
    lead: "Every Python launch file must return a `LaunchDescription`.",
    bullets: [
      "```python\nfrom launch import LaunchDescription\nfrom launch_ros.actions import Node\n\n\ndef generate_launch_description():\n    # we will add nodes in Part 2\n    return LaunchDescription([\n        # Node(...), Node(...)\n    ])\n```",
      "Key idea: `LaunchDescription([ ...actions... ])`",
    ],
  },

  // 15 — Minimal Python launch (part 2)
  {
    type: "bullets",
    hud: "Launch (Python)",
    title: "Minimal `.launch.py` (Part 2/2): launching nodes + names",
    lead: "Add nodes with `Node(package=..., executable=...)`.",
    bullets: [
      "```python\nreturn LaunchDescription([\n  Node(\n    package='demo_nodes_cpp',\n    executable='talker',\n    name='talker1',\n    output='screen'\n  ),\n  Node(\n    package='demo_nodes_cpp',\n    executable='listener',\n    name='listener1',\n    output='screen'\n  ),\n])\n```",
      "This starts two executables and prints their logs in your terminal.",
    ],
  },

  // 16 — Passing params in launch
  {
    type: "bullets",
    hud: "Launch + Params",
    title: "Passing YAML params from a launch file",
    lead: "This is the most common pattern in SLAM/Nav2 bringup.",
    bullets: [
      "```python\nfrom launch_ros.actions import Node\n\nparams_file = '/path/to/config/demo_params.yaml'\n\nNode(\n  package='my_pkg',\n  executable='my_node',\n  name='my_node',\n  parameters=[params_file],\n  output='screen'\n)\n```",
      "Tip: keep configs in your package: `my_pkg/config/*.yaml`",
    ],
  },

  // 17 — Installing launch + config into your package
  {
    type: "two-col",
    hud: "Packaging",
    title: "Make launch/config discoverable after build",
    left: {
      lead: "If your package is **ament_cmake**:",
      bullets: [
        "Edit `CMakeLists.txt`:",
        "```cmake\ninstall(DIRECTORY launch config\n  DESTINATION share/${PROJECT_NAME})\n```",
        "Then rebuild from workspace root:",
        "```bash\ncd ~/ros2_ws\ncolcon build --symlink-install\nsource install/setup.bash\n```",
      ],
    },
    right: {
      lead: "If your package is **ament_python**:",
      bullets: [
        "In `setup.py` add data_files (concept):",
        "```python\ndata_files=[\n ('share/my_pkg/launch', ['launch/demo.launch.py']),\n ('share/my_pkg/config', ['config/demo_params.yaml'])\n]\n```",
        "Rule: launch + config must be installed to `share/<pkg>/...`",
      ],
    },
  },

  // 18 — Final MCQ (schema-fixed)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: What does `ros__parameters` do?",
    question: "In a ROS 2 YAML file, the key `ros__parameters:` is used to…",
    options: [
      { choice: "A", label: "Declare a new ROS topic" },
      { choice: "B", label: "Start the parameter section for a node" },
      { choice: "C", label: "Enable TF publishing" },
      { choice: "D", label: "Set QoS history depth" },
    ],
    correct: "B",
    explain:
      "`ros__parameters` tells ROS 2 that the nested keys are parameters for that node name/namespace.",
  },

  // 19 — Summary checklist
  {
    type: "bullets",
    hud: "Summary",
    title: "Checklist (you should be able to do this alone)",
    bullets: [
      "Find node + inspect params: `ros2 node list` → `ros2 param list/get/describe`",
      "Set live (if allowed): `ros2 param set /node_name key value`",
      "Save a snapshot: `ros2 param dump /node_name > tuned.yaml`",
      "Write YAML correctly: `<node_name>: ros__parameters: ...` and `/**` wildcard",
      "Create a launch: `generate_launch_description()` → add `Node(...)` actions",
      "Pass YAML from launch: `parameters=[params_file]`",
    ],
  },
];

export default slidesData;
