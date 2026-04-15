// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S05/01_urdf_rviz_tf2.slides.js
// Session — URDF/Xacro → RViz → TF2 (TB3 Waffle Pi) + TF tree PDF

export const topicMeta = {
  id: "01_urdf_rviz_tf2",
  title: "URDF/Xacro + RViz + TF2 Visualization (TurtleBot3 Waffle Pi)",
  duration: 55,
};

const slidesData = [
  // 0 — TITLE
  {
    type: "title",
    hud: "ROS 2 Visualization",
    title: "URDF/Xacro + RViz + TF2 (TB3 Waffle Pi)",
    subtitle: "See the robot model + frames before we start mobile-robot labs",
    meta: "UOttawa Mobile Robotics • Instructor: Ali Karimzadeh",
    notes:
      "Say: Today is about visualization and frames. If you can’t visualize the robot and TF tree, debugging Nav2 later becomes painful.",
  },

  // 1 — Plan
  {
    type: "bullets",
    hud: "Plan",
    title: "Today",
    lead: "We focus on **visualization + frames** (no deep coding today).",
    bullets: [
      "Recap: **workspace + package + nodes + topics**",
      "Robot model files: **URDF** and **Xacro**",
      "Clone + build **TurtleBot3 from source** (reuse later)",
      "Run TB3 launch: **state publisher + RViz2**",
      "TF2 basics: **/tf** + **/tf_static**",
      "Generate TF tree: `frames.pdf`",
    ],
  },

  // 2 — Big picture pipeline
  {
    type: "bullets",
    hud: "Big Idea",
    title: "The visualization pipeline (mental model)",
    bullets: [
      "**URDF/Xacro** describes the robot structure (links + joints)",
      "**robot_state_publisher** publishes the TF frames from the model",
      "**RViz2** uses TF + robot_description to draw the robot",
      "If you see **no robot** in RViz: check **Fixed Frame** + TF",
      "We use **TurtleBot3 Waffle Pi** as our example robot",
    ],
  },

  // 3 — Terminal + aliases
  {
    type: "bullets",
    hud: "Setup",
    title: "Start from a clean terminal (and use aliases)",
    lead: "In **every new terminal**: source ROS 2 first.",
    bullets: [
      "```bash\nsource /opt/ros/humble/setup.bash\n```",
      "If you installed my aliases, you can use:",
      "`ws` (go workspace) • `src` (go src) • `cb` (build) • `sb` (source bashrc)",
      "Sanity check:",
      "```bash\nwhich ros2\nros2 --help | head\n```",
    ],
  },

  // 4 — Install tools (no TB3 apt)
  {
    type: "bullets",
    hud: "Install",
    title: "Install tools we need (once)",
    lead: "We do **NOT** install TB3 via apt — we clone it. We only install tools + deps.",
    bullets: [
      "```bash\nsudo apt update\n```",
      "```bash\nsudo apt install -y \\\n  ros-humble-xacro \\\n  ros-humble-robot-state-publisher \\\n  ros-humble-joint-state-publisher-gui \\\n  ros-humble-tf2-tools graphviz\n```",
      "Sources: [URDF main](https://docs.ros.org/en/humble/Tutorials/Intermediate/URDF/URDF-Main.html) • [TF2 main](https://docs.ros.org/en/humble/Tutorials/Intermediate/Tf2/Tf2-Main.html)",
    ],
    notes: "Graphviz is needed for frames.pdf. Keep it minimal today.",
  },

  // 5 — Clone TurtleBot3 (source)
  {
    type: "bullets",
    hud: "TB3 (Source)",
    title: "Clone TurtleBot3 (we reuse it later in the course)",
    lead: "We clone **ROBOTIS** TurtleBot3 repo on the **humble** branch.",
    bullets: [
      "Go to src (alias):",
      "```bash\nsrc\n```",
      "Clone TB3:",
      "```bash\ngit clone -b humble https://github.com/ROBOTIS-GIT/turtlebot3.git\n```",
      "Source: [ROBOTIS turtlebot3](https://github.com/ROBOTIS-GIT/turtlebot3)",
    ],
  },

  // 6 — rosdep + build
  {
    type: "bullets",
    hud: "Build",
    title: "Install dependencies + build (colcon)",
    lead: "Run these once after cloning.",
    bullets: [
      "Go to workspace (alias):",
      "```bash\nws\n```",
      "Install dependencies:",
      "```bash\nrosdep update\nrosdep install --from-paths src --ignore-src -r -y\n```",
      "Build (alias):",
      "```bash\ncb\n```",
      "Source workspace:",
      "```bash\nsource ~/ros2_ws/install/setup.bash\n```",
    ],
    notes:
      "If students don’t have aliases: cd ~/ros2_ws, etc. Keep moving—no deep debugging today.",
  },

  // 7 — Find TB3 description package + files
  {
    type: "bullets",
    hud: "TB3",
    title: "Find TB3 model files (URDF/Xacro)",
    lead: "The model lives in `turtlebot3_description`.",
    bullets: [
      "Confirm packages exist:",
      "```bash\nros2 pkg list | grep turtlebot3\n```",
      "Find package folder:",
      "```bash\nros2 pkg prefix turtlebot3_description\n```",
      "List URDF folder:",
      "```bash\nls $(ros2 pkg prefix turtlebot3_description)/share/turtlebot3_description/urdf\n```",
    ],
  },

  // 8 — URDF: links + joints (visual) — keep + more explanation
  {
    type: "two-col",
    hud: "URDF",
    title: "URDF = **Links + Joints** (robot structure)",
    left: {
      lead: "URDF is the robot **blueprint**.",
      bullets: [
        "**Link** = rigid body (base, wheel, lidar, camera…) ",
        "**Joint** = connection (fixed / revolute / continuous…) ",
        "URDF forms a **tree** (parent → child links)",
        "Each joint has an **axis** + an **origin** (where it attaches)",
        "TF frames are based on these link/joint relationships",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://articulatedrobotics.xyz/assets/images/urdf-tree-5813d298062dd9937cd2ecf8a5a521ce.png",
        source: "Articulated Robotics — URDF tree",
        sourceHref:
          "https://articulatedrobotics.xyz/tutorials/ready-for-ros/urdf",
      },
    },
  },

  // 9 — Joint types (visual) — keep + more explanation
  {
    type: "two-col",
    hud: "URDF",
    title: "Common joint types (you will see these in TB3)",
    left: {
      lead: "Joint type controls **how a link can move**.",
      bullets: [
        "**fixed**: no motion (sensor mounted to base)",
        "**continuous**: wheel rotation (unlimited revolute)",
        "**revolute**: limited rotation (arms, hinges)",
        "**prismatic**: sliding (linear actuator)",
        "TB3 wheels are usually **continuous** joints",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://articulatedrobotics.xyz/assets/images/urdf-joint-types-47f42d58431145cd194855138c4b4e26.png",
        source: "Articulated Robotics — joint types",
        sourceHref:
          "https://articulatedrobotics.xyz/tutorials/ready-for-ros/urdf",
      },
    },
    notes:
      "Say: the joint definition + joint_state values → robot_state_publisher computes TF for each link.",
  },

  // 10 — Xacro (why TB3 uses it) — existing
  {
    type: "bullets",
    hud: "Xacro",
    title: "Xacro (why TB3 uses it)",
    lead: "Xacro = URDF + **variables/macros** (cleaner + configurable).",
    bullets: [
      "Avoid copy/paste: reusable **macros**",
      "Change one parameter → regenerate robot description",
      "TB3 uses Xacro to handle **variants** (burger/waffle)",
      "Rule: **Xacro → robot_description → TF → RViz**",
    ],
  },

  // 11 — Create Custom Launch File (Part 1)
  {
    type: "bullets",
    hud: "Custom Launch",
    title: "Step 1: Create visualize.launch.py",
    lead: "Create a new launch file in `turtlebot3_description/launch/`",
    bullets: [
      "```bash\nmkdir -p ~/ros2_ws/src/turtlebot3/turtlebot3_description/launch\nnano ~/ros2_ws/src/turtlebot3/turtlebot3_description/launch/visualize.launch.py\n```",
      "We will paste the code in the next slide.",
    ],
  },

  // 12 — Create Custom Launch File (Part 2 - Python Code)
  {
    type: "bullets",
    hud: "Custom Launch",
    title: "Step 2: The Launch Script (Header)",
    bullets: [
      "```python\nimport os\nfrom ament_index_python.packages import get_package_share_directory\nfrom launch import LaunchDescription\nfrom launch.substitutions import Command\nfrom launch_ros.actions import Node\n```",
      "Copy this into your file. More code on next slide...",
    ],
  },

  // 13 — Create Custom Launch File (Part 3 - Logic)
  {
    type: "bullets",
    hud: "Custom Launch",
    title: "Step 3: The Launch Script (Body)",
    bullets: [
      "```python\ndef generate_launch_description():\n    pkg = get_package_share_directory('turtlebot3_description')\n    urdf = os.path.join(pkg, 'urdf', 'turtlebot3_waffle_pi.urdf')\n    return LaunchDescription([\n        Node(package='robot_state_publisher', executable='robot_state_publisher',\n             parameters=[{'robot_description': Command(['xacro ', urdf])}]),\n        Node(package='joint_state_publisher_gui',executable='joint_state_publisher_gui'),\n        Node(package='rviz2', executable='rviz2')\n    ])\n```",
    ],
  },

  // 14 — Update CMakeLists.txt
  {
    type: "bullets",
    hud: "Build",
    title: "Step 4: Register the Launch Folder",
    lead: "Edit `turtlebot3_description/CMakeLists.txt`",
    bullets: [
      "Find the `install(DIRECTORY ...)` section.",
      "Add `launch` to the list of folders:",
      "```cmake\ninstall(DIRECTORY launch meshes rviz urdf\n  DESTINATION share/${PROJECT_NAME})\n```",
      "Save and exit.",
    ],
  },

  // 15 — Build and Run
  {
    type: "bullets",
    hud: "Run",
    title: "Step 5: Build & Launch",
    bullets: [
      "Go to workspace and build:",
      "```bash\nws\ncb --packages-select turtlebot3_description\nsb\n```",
      "Launch the visualization:",
      "```bash\nros2 launch turtlebot3_description visualize.launch.py\n```",
    ],
  },

  // 16 — Troubleshooting RViz
  {
    type: "two-col",
    hud: "RViz",
    title: "Visualizing the Robot",
    left: {
      lead: "If the robot is a red block or invisible:",
      bullets: [
        "1. In RViz, look at **Global Options**.",
        "2. Set **Fixed Frame** to `base_link`.",
        "3. Add **RobotModel** display.",
        "4. Add **TF** display.",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://docs.ros.org/en/humble/_images/rviz.png",
        source: "RViz Visualization",
      },
    },
  },

  // 17 — TF2 concept
  {
    type: "two-col",
    hud: "TF2",
    title: "TF2 = Who is where?",
    left: {
      bullets: [
        "**Frame** = Coordinate system",
        "**Transform** = Pose between frames",
        "`/tf`: Dynamic (wheels moving)",
        "`/tf_static`: Static (lidar position)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://docs.ros.org/en/rolling/Tutorials/images/tf2_frames.png",
      },
    },
  },

  // 14 — Step 5: Generate the Robot Tree (Static)
  {
    type: "bullets",
    hud: "Tree",
    title: "Method A: URDF to Graphviz",
    lead: "This creates a physical map directly from your URDF code.",
    bullets: [
      "Navigate to the URDF folder:",
      "```bash\ncd ~/ros2_ws/src/turtlebot3/turtlebot3_description/urdf/\n```",
      "Convert URDF to PDF:",
      "```bash\nurdf_to_graphiz turtlebot3_waffle_pi.urdf\n```",
      "Open the resulting PDF:",
      "```bash\nxdg-open turtlebot3_waffle_pi.pdf\n```",
    ],
    notes: "Best for verifying your links and joints are logically connected.",
  },

  // 15 — Step 6: Generate the TF Tree (Live)
  {
    type: "bullets",
    hud: "TF2",
    title: "Method B: Live TF Tree",
    lead: "This listens to the active coordinate frames on the /tf topic.",
    bullets: [
      "Run the live listener (requires your launch file to be running):",
      "```bash\nros2 run tf2_tools view_frames\n```",
      "**Wait 5 seconds.** Then check your folder with `ls`.",
      "ROS 2 Humble adds a **timestamp** to the filename:",
      "Example: `xdg-open frames_2026-02-26_19.12.30.pdf`",
    ],
    notes: "If you don't see the file, use 'ls' to find the exact filename.",
  },

  // 17 — Inspecting Live Transforms
  {
    type: "bullets",
    hud: "TF2",
    title: "Step 7: Echo a Specific Transform",
    lead: "Use `tf2_echo` to see the exact XYZ position between two frames.",
    bullets: [
      "Syntax: `ros2 run tf2_ros tf2_echo <parent_frame> <child_frame>`",
      "**Example: Base to Left Wheel**",
      "```bash\nros2 run tf2_ros tf2_echo base_link wheel_left_link\n```",
      "**Example: Base to Lidar**",
      "```bash\nros2 run tf2_ros tf2_echo base_link base_scan\n```",
    ],
    notes: "This is the numerical version of what you see in RViz.",
  },

  // 18 — Reading tf2_echo Output
  {
    type: "two-col",
    hud: "Theory",
    title: "How to read tf2_echo",
    left: {
      lead: "The output shows two main sections:",
      bullets: [
        "**Translation:** The distance in meters [X, Y, Z].",
        "**Rotation:** The orientation in Quaternions or RPY (Roll, Pitch, Yaw).",
        "**Exercise:** Look at the Y-value for the left wheel. Is it positive or negative?",
        "**Exercise:** Move the sliders in the GUI and watch the Rotation values change live!",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://docs.ros.org/en/foxy/_images/tf2_echo.png",
        source: "tf2_echo terminal output example",
      },
    },
  },

  // 19 — Lab Summary Checklist (Updated Index)
  {
    type: "bullets",
    hud: "Summary",
    title: "Session 05 Checklist",
    bullets: [
      "1. Build: `cb --symlink-install --packages-select turtlebot3_description`",
      "2. Launch: `ros2 launch turtlebot3_description visualize.launch.py`",
      "3. RViz: Set **Fixed Frame** to `base_link`.",
      "4. PDF Tree: `urdf_to_graphiz` (static) or `view_frames` (live).",
      "5. Live Echo: `ros2 run tf2_ros tf2_echo base_link wheel_left_link`",
    ],
  },
];

export default slidesData;
