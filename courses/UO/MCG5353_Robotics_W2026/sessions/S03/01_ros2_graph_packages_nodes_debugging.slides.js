export const topicMeta = {
  id: "01_ros2_graph_packages_nodes_debugging",
  title: "Session 3 - ROS 2 Graph, Packages, Nodes, and Debugging",
  duration: 125,
  hudDefault: "MCG 5353 - ROBOTICS",
  email: "Ali.Karimzade@uOttawa.ca",
};

const MEDIA_BASE = "./courses/UO/MCG5353_Robotics_W2026/sessions/S03/media/";

function codeBlock(body, lang = "bash") {
  const normalized = body.replace(/^\n/, "").replace(/\n\s*$/, "");
  return `\`\`\`${lang}\n${normalized}\n\`\`\``;
}

function image(id, src, source, alt, sourceHref = "") {
  return {
    id,
    kind: "image",
    src,
    source,
    sourceHref,
    alt,
    fit: "contain",
  };
}

const docs = {
  nodes:
    "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html",
  topics:
    "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html",
  services:
    "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html",
  actions:
    "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html",
  interfaces:
    "https://docs.ros.org/en/humble/Concepts/Basic/About-Interfaces.html",
  packages:
    "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Working-with-ROS2-Packages.html",
  createPackage:
    "https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html",
  workspace:
    "https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html",
  params:
    "https://docs.ros.org/en/humble/Concepts/Basic/About-Parameters.html",
  rosbag:
    "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Recording-And-Playing-Back-Data/Recording-And-Playing-Back-Data.html",
  launch:
    "https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Launch-Main.html",
  environment:
    "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Configuring-ROS2-Environment.html",
};

const media = {
  rosLogo: image(
    "ros_logo",
    `${MEDIA_BASE}ros_logo.svg`,
    "ROS Media and Visual Assets",
    "ROS logo",
    "https://upload.wikimedia.org/wikipedia/commons/b/bb/Ros_logo.svg",
  ),
  nodeTopicService: image(
    "node_topic_service",
    `${MEDIA_BASE}Nodes-TopicandService.gif`,
    "ROS 2 Documentation - Understanding nodes",
    "ROS node communicating with a topic and a service",
    docs.nodes,
  ),
  topicPubSub: image(
    "topic_pub_sub",
    `${MEDIA_BASE}Topic-SinglePublisherandSingleSubscriber.gif`,
    "ROS 2 Documentation - Understanding topics",
    "Single publisher and subscriber on one topic",
    docs.topics,
  ),
  topicMultiPubSub: image(
    "topic_multi_pub_sub",
    `${MEDIA_BASE}Topic-MultiplePublisherandMultipleSubscriber.gif`,
    "ROS 2 Documentation - Understanding topics",
    "Multiple publishers and subscribers on one topic",
    docs.topics,
  ),
  serviceClient: image(
    "service_client",
    `${MEDIA_BASE}Service-SingleServiceClient.gif`,
    "ROS 2 Documentation - Understanding services",
    "Single service client and service server",
    docs.services,
  ),
  actionClient: image(
    "action_client",
    `${MEDIA_BASE}Action-SingleActionClient.gif`,
    "ROS 2 Documentation - Understanding actions",
    "Single action client and action server",
    docs.actions,
  ),
  rqtGraph: image(
    "rqt_graph",
    `${MEDIA_BASE}rqt_graph.png`,
    "ROS 2 Documentation - Understanding topics",
    "rqt_graph showing nodes and topics",
    docs.topics,
  ),
  rqtGraph2: image(
    "rqt_graph_2",
    `${MEDIA_BASE}rqt_graph2.png`,
    "ROS 2 Documentation - Understanding topics",
    "rqt_graph after publishing to a topic from the command line",
    docs.topics,
  ),
  rqtGraph3: image(
    "rqt_graph_3",
    `${MEDIA_BASE}rqt_graph3.png`,
    "ROS 2 Documentation - Understanding topics",
    "rqt_graph after echoing a topic from the command line",
    docs.topics,
  ),
  rqtUnhide: image(
    "rqt_unhide",
    `${MEDIA_BASE}unhide.png`,
    "ROS 2 Documentation - Understanding topics",
    "rqt_graph option for showing hidden graph items",
    docs.topics,
  ),
  rqtDebug: image(
    "rqt_debug",
    `${MEDIA_BASE}debug.png`,
    "ROS 2 Documentation - Understanding topics",
    "rqt_graph debug view showing CLI tools as graph nodes",
    docs.topics,
  ),
  underlay: image(
    "workspace_underlay",
    `${MEDIA_BASE}underlay.png`,
    "ROS 2 Documentation - Creating a workspace",
    "ROS 2 underlay workspace diagram",
    docs.workspace,
  ),
  overlay: image(
    "workspace_overlay",
    `${MEDIA_BASE}overlay.png`,
    "ROS 2 Documentation - Creating a workspace",
    "ROS 2 underlay and overlay diagram",
    docs.workspace,
  ),
  colconLoop: image(
    "colcon_loop",
    `${MEDIA_BASE}colcon-loop.svg`,
    "Course diagram",
    "Edit, build, source, run, and inspect workflow",
  ),
  manipulatorGraph: image(
    "manipulator_ros_graph",
    `${MEDIA_BASE}manipulator-ros-graph.svg`,
    "Course diagram",
    "Manipulator ROS graph with robot state, TF, RViz, Gazebo, and MoveIt",
  ),
  packageNodeExecutable: image(
    "package_node_executable",
    `${MEDIA_BASE}package-node-executable.svg`,
    "Course diagram",
    "Package, executable, and node relationship",
  ),
  communicationTypes: image(
    "topic_service_action",
    `${MEDIA_BASE}topic-service-action.svg`,
    "Course diagram",
    "Topics, services, and actions compared",
  ),
  rosbagWorkflow: image(
    "rosbag_workflow",
    `${MEDIA_BASE}rosbag-workflow.svg`,
    "Course diagram",
    "Record, inspect, replay, and debug rosbag workflow",
  ),
  packageStructure: image(
    "package_structure",
    `${MEDIA_BASE}package-structure.svg`,
    "Course diagram",
    "Python ROS package folder structure",
  ),
  debuggingLadder: image(
    "debugging_ladder",
    `${MEDIA_BASE}debugging-ladder.svg`,
    "Course diagram",
    "ROS debugging order from environment to graph to code",
  ),
  sourceBeforeAfter: image(
    "source_before_after",
    `${MEDIA_BASE}source-before-after.svg`,
    "Course diagram",
    "Terminal before and after sourcing ROS 2 Humble",
  ),
  rosCliMap: image(
    "ros_cli_map",
    `${MEDIA_BASE}ros-cli-map.svg`,
    "Course diagram",
    "Map of common ros2 command line subcommands",
  ),
  classroomLocalhost: image(
    "classroom_localhost",
    `${MEDIA_BASE}classroom-localhost.svg`,
    "Course diagram",
    "Classroom network isolation with ROS_LOCALHOST_ONLY",
  ),
  moveitPlannedPath: image(
    "moveit_planned_path",
    `${MEDIA_BASE}rviz_plugin_planned_path.png`,
    "MoveIt Documentation - MoveIt Quickstart in RViz",
    "Panda arm planned path visualization in RViz",
    "https://moveit.picknik.ai/humble/doc/tutorials/quickstart_in_rviz/quickstart_in_rviz_tutorial.html",
  ),
};

const slidesData = [
  {
    id: "title",
    type: "title",
    hud: "Session 3",
    title: "Session 3 - ROS 2 Graph, Packages, Nodes, and Debugging",
    subtitle:
      "How robot software is organized, connected, inspected, recorded, and fixed",
    meta: "MCG 5353 Robotics • Ali Karimzadeh • Ali.Karimzade@uOttawa.ca",
    notes:
      "Open by saying that Session 2 made the machine ready. Session 3 makes the ROS system understandable.",
  },
  {
    id: "why_this_session_matters",
    type: "two-col",
    hud: "Big Picture",
    title: "Why This Session Matters",
    left: {
      bullets: [
        "**ROS 2 is the wiring** between robot state, visualization, simulation, and planning.",
        "**Manipulator systems are multi-node systems**; no single file controls everything.",
        "**Debugging starts with observation**: what is running, what is publishing, and what is missing?",
        "**Today is about mental models** you will reuse in RViz2, Gazebo, MoveIt, TF, and IK later.",
      ],
    },
    right: { media: media.manipulatorGraph },
    notes:
      "Tell students that the point is not memorizing every command. The point is knowing where to look first.",
  },
  {
    id: "today_outcomes",
    type: "bullets",
    hud: "Outcomes",
    title: "What You Should Be Able To Do Today",
    lead: "By the end, you should be able to explain and use the basic ROS workflow.",
    bullets: [
      "**Read the ROS graph** with `ros2` commands and `rqt_graph`.",
      "**Create a Python package** and know where node code belongs.",
      "**Build and source** your workspace without guessing.",
      "**Choose the right communication type**: topic, service, or action.",
      "**Record and replay topic data** with `ros2 bag` for debugging.",
      "**Follow a debugging order** before changing random code.",
    ],
    notes:
      "This slide tells students the practical target. It also gives you the lecture map.",
  },
  {
    id: "setup_check",
    type: "bullets",
    hud: "Warm-Up",
    title: "Quick Setup Check",
    lead: "Before learning ROS concepts, make sure your terminal is actually ready.",
    bullets: [
      codeBlock(`
printenv ROS_DISTRO
which ros2
ws
cb
si
ros2 node list
`),
      "**Expected ROS distro**: `humble`.",
      "**Expected workspace habit**: build from `~/ros2_ws`, then source the overlay.",
      "**If a command fails**: check `.bashrc`, source order, and current folder first.",
    ],
    notes:
      "Use this as the first live check. If many students fail here, pause and fix setup habits before moving on.",
  },
  {
    id: "source_before_after",
    type: "two-col",
    hud: "Environment",
    title: "Why Sourcing Matters",
    left: {
      bullets: [
        "**Sourcing teaches the terminal where ROS is installed**.",
        "**Without sourcing**, commands such as `ros2` may not exist in that terminal.",
        "**For this course**, the base source file is `/opt/ros/humble/setup.bash`.",
        "**For new terminals**, we put that source line in `~/.bashrc`.",
        `[ROS 2 environment tutorial](${docs.environment})`,
      ],
    },
    right: { media: media.sourceBeforeAfter },
    notes:
      "This slide answers why source is not optional. New terminals do not automatically know ROS paths unless .bashrc sets them.",
  },
  {
    id: "ros2_manipulator_workflow",
    type: "two-col",
    hud: "Workflow",
    title: "ROS 2 In A Manipulator Workflow",
    left: {
      bullets: [
        "**Robot model** describes links, joints, and frames.",
        "**ROS graph** connects state publishers, controllers, visualization, and planners.",
        "**RViz2** shows robot state, TF, markers, and trajectories.",
        "**Gazebo** simulates the robot and environment.",
        "**MoveIt** adds IK, collision checking, planning scenes, and motion planning.",
      ],
    },
    right: { media: media.manipulatorGraph },
    notes:
      "Keep this as a preview. The focus today is the graph and the tools, not MoveIt configuration.",
  },
  {
    id: "node_definition",
    type: "two-col",
    hud: "Nodes",
    title: "What Is A Node?",
    left: {
      bullets: [
        "**Node = running program** that performs one clear job.",
        "**Examples**: state publisher, controller, planner, camera driver, talker, listener.",
        "**A node can publish, subscribe, offer services, call services, or run actions**.",
        "**Good robot systems use many small nodes** instead of one huge program.",
      ],
    },
    right: { media: media.nodeTopicService },
    notes:
      "Say clearly: package is on disk, executable is something you run, node is the running process.",
  },
  {
    id: "package_executable_node",
    type: "two-col",
    hud: "Packages",
    title: "Package vs Executable vs Node",
    left: {
      bullets: [
        "**Package** = code, metadata, dependencies, launch files, and config files.",
        "**Executable** = a runnable entry point installed from the package.",
        "**Node** = the executable while it is running inside ROS.",
        "**`ros2 run <package> <executable>`** starts one executable from one package.",
      ],
    },
    right: { media: media.packageNodeExecutable },
    notes:
      "This is one of the most important distinctions for beginners. Repeat it using one concrete package example.",
  },
  {
    id: "workspace_recap",
    type: "two-col",
    hud: "Workspace",
    title: "Workspace Recap",
    left: {
      bullets: [
        "**Underlay**: `/opt/ros/humble` gives the base ROS installation.",
        "**Overlay**: `~/ros2_ws/install` gives your local class packages.",
        "**Source order matters**: base first, workspace second.",
        "**One workspace is enough** while learning; avoid confusing overlays.",
      ],
    },
    right: { media: media.overlay },
    notes:
      "Use the underlay/overlay vocabulary, but translate it immediately: base ROS, then your own packages.",
  },
  {
    id: "workspace_layering_rule",
    type: "two-col",
    hud: "Workspace",
    title: "Underlay First, Overlay Second",
    left: {
      bullets: [
        "**Underlay first**: `source /opt/ros/humble/setup.bash` gives the base ROS packages.",
        "**Overlay second**: `source ~/ros2_ws/install/setup.bash` adds your local packages.",
        "**Overlay can override underlay** when package names overlap, so keep names organized.",
        "**If paths feel strange**, open a fresh terminal and source base then overlay again.",
      ],
    },
    right: { media: media.underlay },
    notes:
      "This reinforces that the environment is layered. A fresh terminal is a simple reset when students source things in a confusing order.",
  },
  {
    id: "edit_build_source_run",
    type: "two-col",
    hud: "Workflow",
    title: "The ROS Development Loop",
    left: {
      bullets: [
        "**Edit** files inside `~/ros2_ws/src/<package>`.",
        "**Build** from `~/ros2_ws` using `colcon build --symlink-install`.",
        "**Source** `~/ros2_ws/install/setup.bash` so the terminal sees new output.",
        "**Run and inspect** with `ros2 run`, `ros2 node`, `ros2 topic`, and `rqt_graph`.",
      ],
    },
    right: { media: media.colconLoop },
    notes:
      "Emphasize that build and source are separate steps. Many errors come from skipping source after a build.",
  },
  {
    id: "what_build_means",
    type: "bullets",
    hud: "Build",
    title: "What Does `colcon build` Actually Do?",
    lead: "`colcon` is the build tool that understands a ROS workspace.",
    bullets: [
      "**Find packages**: it looks inside `src/` for packages and dependencies.",
      "**Prepare output**: it creates or updates `build/`, `install/`, and `log/`.",
      "**Install entry points**: it makes Python executables available through `ros2 run`.",
      "**Generate environment files**: it creates `install/setup.bash` for your overlay.",
      "**Important habit**: after a build, run `si` before testing the new version.",
    ],
    notes:
      "This answers the student's natural question: why do we build if Python is not compiled like C++?",
  },
  {
    id: "build_habits",
    type: "bullets",
    hud: "Build",
    title: "Build Habits That Reduce Confusion",
    lead: "Use the smallest build command that matches what you are doing.",
    bullets: [
      codeBlock(`
colcon build --symlink-install
colcon build --symlink-install --packages-select manipulator_basics
colcon build --symlink-install --executor sequential
`),
      "**`--symlink-install`** is helpful for Python-heavy beginner work.",
      "**`--packages-select`** rebuilds one package when you know what changed.",
      "**`--executor sequential`** can help weaker laptops build one package at a time.",
      "**If the terminal gets weird**, open a new one and source again.",
    ],
    notes:
      "This is not deep build theory. It gives students practical commands they can use immediately.",
  },
  {
    id: "package_structure",
    type: "two-col",
    hud: "Package",
    title: "Python Package Structure",
    left: {
      bullets: [
        "**Package root** has `package.xml`, `setup.py`, `resource/`, and the inner Python module folder.",
        "**`package.xml`** lists package metadata and dependencies.",
        "**`setup.py`** tells Python what to install and what executables to expose.",
        "**Inner module folder** contains node files such as `talker.py` and `listener.py`.",
      ],
    },
    right: { media: media.packageStructure },
    notes:
      "Tell students that many package errors are simply files placed in the wrong folder.",
  },
  {
    id: "create_package",
    type: "bullets",
    hud: "Package",
    title: "Create A Class Package",
    lead: "We will use one small Python package to practice the ROS graph.",
    bullets: [
      codeBlock(`
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python \\
  manipulator_basics \\
  --dependencies rclpy std_msgs
`),
      "**`ament_python`** means this is a Python ROS package.",
      "**`rclpy`** is the Python client library for ROS 2.",
      "**`std_msgs`** gives simple message types such as `String`.",
      `[ROS 2 package tutorial](${docs.createPackage})`,
    ],
    notes:
      "Keep the package name manipulator-flavored but the code simple. This is a ROS basics exercise, not arm control yet.",
  },
  {
    id: "communication_overview",
    type: "two-col",
    hud: "Communication",
    title: "How Nodes Communicate",
    left: {
      bullets: [
        "**Topics** are data streams: publish and subscribe.",
        "**Services** are quick request-response calls.",
        "**Actions** are long-running goals with feedback, result, and cancel.",
        "**Interfaces** define the exact data shape for messages, services, and actions.",
      ],
    },
    right: { media: media.communicationTypes },
    notes:
      "Use the rule of thumb: stream -> topic, ask -> service, long task -> action.",
  },
  {
    id: "ros_cli_map",
    type: "two-col",
    hud: "ROS CLI",
    title: "The `ros2` CLI Is A Map, Not A Memory Test",
    left: {
      bullets: [
        "**Start with the object** you want to inspect: package, node, topic, service, action, interface, parameter, or bag.",
        "**Then choose the verb**: list, info, echo, show, call, send_goal, record, play.",
        "**Use `--help`** when you forget the exact pattern.",
        "**Debugging is usually inspection first**, code editing second.",
      ],
    },
    right: { media: media.rosCliMap },
    notes:
      "This slide helps students see the command line as organized families instead of random commands.",
  },
  {
    id: "topics_concept",
    type: "two-col",
    hud: "Topics",
    title: "Topics: Streams Of Data",
    left: {
      bullets: [
        "**Topic = named channel** such as `/chatter`, `/joint_states`, or `/tf`.",
        "**Publisher** sends messages to the topic.",
        "**Subscriber** receives messages from the topic.",
        "**Message type must match** or the connection will not work.",
        "**Callbacks** run when messages arrive in your node.",
      ],
    },
    right: { media: media.topicPubSub },
    notes:
      "The key idea is decoupling: publishers and subscribers do not need to know each other directly.",
  },
  {
    id: "topics_many_to_many",
    type: "two-col",
    hud: "Topics",
    title: "Topics Can Fan Out",
    left: {
      bullets: [
        "**One topic can connect many nodes** at the same time.",
        "**Multiple subscribers** can listen to the same robot state stream.",
        "**Multiple publishers are possible**, but they can confuse debugging if you did not expect them.",
        "**Check publisher counts** with `ros2 topic info <topic>`.",
      ],
    },
    right: { media: media.topicMultiPubSub },
    notes:
      "This is a gentle warning for later: if two nodes publish the same command topic, the robot may seem unpredictable.",
  },
  {
    id: "topic_cli",
    type: "bullets",
    hud: "Topics",
    title: "Topic CLI Commands",
    lead: "Use these commands before you edit code.",
    bullets: [
      codeBlock(`
ros2 topic list
ros2 topic info /chatter
ros2 topic echo /chatter
ros2 topic hz /joint_states
ros2 interface show std_msgs/msg/String
`),
      "**`list`** shows what topics currently exist.",
      "**`info`** shows publisher/subscriber counts and the message type.",
      "**`echo`** prints messages live.",
      "**`hz`** estimates how frequently messages arrive.",
    ],
    notes:
      "Mention that topic names are live; if no node is running, some topics will not exist.",
  },
  {
    id: "manipulator_topics",
    type: "bullets",
    hud: "Manipulator",
    title: "Manipulator Topics You Will See Later",
    lead: "You do not need to master these today, but the names should start becoming familiar.",
    bullets: [
      "**`/joint_states`** carries measured or simulated joint positions and velocities.",
      "**`/tf`** carries changing frame transforms.",
      "**`/tf_static`** carries fixed frame transforms.",
      "**`/robot_description`** often carries the URDF robot model.",
      "**Planning and controller topics** appear when MoveIt and controllers are running.",
    ],
    notes:
      "This connects topics to robot arms without teaching TF or MoveIt deeply yet.",
  },
  {
    id: "rqt_graph",
    type: "two-col",
    hud: "Graph",
    title: "`rqt_graph`: See The ROS Graph",
    left: {
      bullets: [
        "**Graph view** shows nodes and topic connections visually.",
        "**Use it early** when a system does not behave as expected.",
        "**Answer the first question**: is the publisher or subscriber even running?",
        codeBlock(`
rqt_graph
`),
      ],
    },
    right: { media: media.rqtGraph },
    notes:
      "Explain circles and arrows using the screenshot. This is the fastest way to reduce guessing.",
  },
  {
    id: "rqt_graph_hidden_and_cli",
    type: "two-col",
    hud: "Graph",
    title: "Why `rqt_graph` May Look Different",
    left: {
      bullets: [
        "**Hidden items can be filtered out** to keep the graph readable.",
        "**CLI tools can appear as nodes** when they publish, echo, or inspect data.",
        "**A changing graph is normal** because the graph shows what is alive right now.",
        "**Use refresh and filters** before assuming something is broken.",
      ],
    },
    right: { media: media.rqtDebug },
    notes:
      "This is useful in class because students often think their graph is wrong when it is just filtered or changing.",
  },
  {
    id: "rqt_graph_growth",
    type: "two-col",
    hud: "Graph",
    title: "The Graph Grows As You Run Tools",
    left: {
      bullets: [
        "**When you run a publisher**, the graph shows a new node and topic connection.",
        "**When you run `ros2 topic echo`**, the echo command can become another subscriber node.",
        "**This is good news**: the tools are part of the observable ROS system.",
        "**Use the graph as evidence**, not decoration.",
      ],
    },
    right: { media: media.rqtGraph3 },
    notes:
      "Use this to explain why running a debugging command can itself change the graph.",
  },
  {
    id: "classroom_network_note",
    type: "two-col",
    hud: "Network",
    title: "Classroom Note: Strange Cross-Talk",
    left: {
      bullets: [
        "**ROS 2 can discover other ROS systems** on the same network.",
        "**In a classroom**, another laptop may accidentally use the same topic names.",
        "**If I ask for isolation**, use `export ROS_LOCALHOST_ONLY=1` in that terminal.",
        "**Do not use it** when your robot must communicate with another computer.",
        `[ROS 2 environment tutorial](${docs.environment})`,
      ],
    },
    right: { media: media.classroomLocalhost },
    notes:
      "Make this optional. It is a troubleshooting tool, not a default forever setting.",
  },
  {
    id: "services_concept",
    type: "two-col",
    hud: "Services",
    title: "Services: Quick Request And Response",
    left: {
      bullets: [
        "**Service = ask once, get one response**.",
        "**Client** sends a request.",
        "**Server** returns a response.",
        "**Good for discrete tasks** such as reset, save, clear, enable, or compute one answer.",
        "**Not for high-rate streaming**; use topics for that.",
      ],
    },
    right: { media: media.serviceClient },
    notes:
      "Use the mental model of asking a yes/no or compute-this-now question.",
  },
  {
    id: "service_cli",
    type: "bullets",
    hud: "Services",
    title: "Service CLI Commands",
    lead: "Services are visible and testable from the terminal.",
    bullets: [
      codeBlock(`
ros2 service list
ros2 service type /clear
ros2 interface show std_srvs/srv/Empty
ros2 service call /clear std_srvs/srv/Empty
`),
      "**`list`** shows available service names.",
      "**`type`** reveals the service interface.",
      "**`interface show`** shows request and response fields.",
      "**`call`** sends one request from the terminal.",
    ],
    notes:
      "Students may not have /clear unless turtlesim runs. Say commands depend on the nodes currently running.",
  },
  {
    id: "actions_concept",
    type: "two-col",
    hud: "Actions",
    title: "Actions: Long Tasks With Feedback",
    left: {
      bullets: [
        "**Action = goal, feedback, result, and cancel**.",
        "**Client** sends a goal to an action server.",
        "**Server** reports progress while working.",
        "**Client can cancel** if the task is no longer needed.",
        "**Good for robot tasks** that take time to complete.",
      ],
    },
    right: { media: media.actionClient },
    notes:
      "This is the communication pattern students will recognize later in planning and execution workflows.",
  },
  {
    id: "action_cli",
    type: "bullets",
    hud: "Actions",
    title: "Action CLI Commands",
    lead: "Actions are also inspectable from the terminal.",
    bullets: [
      codeBlock(`
ros2 action list
ros2 action info /fibonacci
ros2 interface show example_interfaces/action/Fibonacci
ros2 action send_goal /fibonacci \\
  example_interfaces/action/Fibonacci "{order: 5}"
`),
      "**`list`** shows available action names.",
      "**`info`** shows type and client/server counts.",
      "**`send_goal`** sends a long-running request.",
      "**Feedback** can be printed while the action runs.",
    ],
    notes:
      "Do not worry if /fibonacci is not running. This is the command pattern.",
  },
  {
    id: "why_actions_matter",
    type: "bullets",
    hud: "Manipulator",
    title: "Why Actions Matter For Robot Arms",
    lead: "Manipulator tasks are often too long for simple request-response calls.",
    bullets: [
      "**Planning takes time**: a planner may search, fail, retry, or return a trajectory.",
      "**Execution takes time**: the robot follows a trajectory over several seconds.",
      "**Feedback matters**: the system can report progress while the task is running.",
      "**Cancel matters**: a goal may need to stop if the scene changes or the target is wrong.",
      "**MoveIt and controllers** use this style of long-task thinking.",
    ],
    notes:
      "Keep this conceptual. No MoveIt install or project details here.",
  },
  {
    id: "moveit_preview_planned_path",
    type: "two-col",
    hud: "Manipulator",
    title: "Where This Is Going: Planned Motion",
    left: {
      bullets: [
        "**The same graph ideas appear in MoveIt**: nodes, topics, parameters, services, and actions.",
        "**A planned path is data** that can be visualized, inspected, and later executed.",
        "**RViz2 is the window** where we will inspect robot state and trajectories.",
        "**Today's basics become useful** when the graph gets larger and more realistic.",
      ],
    },
    right: { media: media.moveitPlannedPath },
    notes:
      "This is the motivational manipulator slide. Keep it short and connect it back to ROS graph skills.",
  },
  {
    id: "interfaces",
    type: "bullets",
    hud: "Interfaces",
    title: "Interfaces: The Data Contract",
    lead: "Interfaces define what data is allowed to travel through ROS communication.",
    bullets: [
      "**Message (`.msg`)**: one data structure for a topic.",
      "**Service (`.srv`)**: request fields, then response fields.",
      "**Action (`.action`)**: goal fields, feedback fields, and result fields.",
      "**Use `ros2 interface show`** when you do not know what data to send.",
      codeBlock(`
ros2 interface show sensor_msgs/msg/JointState
ros2 interface show trajectory_msgs/msg/JointTrajectory
`),
    ],
    notes:
      "This is where students learn not to guess YAML payloads or message fields.",
  },
  {
    id: "parameters",
    type: "bullets",
    hud: "Parameters",
    title: "Parameters: Settings Inside Nodes",
    lead: "Parameters are node settings, not streamed robot data.",
    bullets: [
      "**Parameter = named value** stored inside a node.",
      "**Good for settings** such as `use_sim_time`, frame names, gains, speeds, and file paths.",
      "**Not for sensor streams**; use topics for data that changes continuously.",
      "**Can be set at startup** by launch files or sometimes changed while running.",
      `[ROS 2 parameters concept](${docs.params})`,
    ],
    notes:
      "This slide prepares them for launch files, YAML, Gazebo time, and MoveIt configs.",
  },
  {
    id: "parameter_cli",
    type: "bullets",
    hud: "Parameters",
    title: "Parameter CLI Commands",
    lead: "First find the node, then inspect or change its parameters.",
    bullets: [
      codeBlock(`
ros2 node list
ros2 param list
ros2 param get /node_name use_sim_time
ros2 param set /node_name use_sim_time true
ros2 param dump /node_name
`),
      "**`use_sim_time`** is important when a system uses simulated time.",
      "**`dump`** can save current parameters into a YAML-style snapshot.",
      "**Runtime changes may fail** if the node does not allow that parameter change.",
    ],
    notes:
      "Explain that /node_name is a placeholder. They must replace it with a real node name.",
  },
  {
    id: "launch_preview",
    type: "bullets",
    hud: "Launch",
    title: "Launch Files: A Preview",
    lead: "A real robot system usually needs many nodes to start together.",
    bullets: [
      "**Launch file = repeatable startup recipe**.",
      "**Starts multiple nodes** with one command.",
      "**Sets parameters and remaps names** so nodes connect correctly.",
      "**Keeps demos reproducible** because everyone starts the same system.",
      codeBlock(`
ros2 launch <package> <file.launch.py>
`),
      `[ROS 2 launch tutorial](${docs.launch})`,
    ],
    notes:
      "Do not teach full launch syntax today. The point is why launch files exist.",
  },
  {
    id: "rosbag_concept",
    type: "two-col",
    hud: "rosbag",
    title: "ROS Bag: The Flight Recorder",
    left: {
      bullets: [
        "**rosbag records topic messages** into a file on disk.",
        "**Replay lets you debug later** without rerunning the robot or simulator.",
        "**Good for evidence**: save what the system actually published.",
        "**Not magic**: it records topics you choose; it does not record every hidden state automatically.",
      ],
    },
    right: { media: media.rosbagWorkflow },
    notes:
      "This is extremely useful in labs. It turns a one-time failure into data students can inspect.",
  },
  {
    id: "rosbag_commands",
    type: "bullets",
    hud: "rosbag",
    title: "Basic `ros2 bag` Commands",
    lead: "Record only the topics you need at first.",
    bullets: [
      codeBlock(`
ros2 bag record /joint_states /tf /tf_static
ros2 bag record -o arm_debug /joint_states /tf
ros2 bag info arm_debug
ros2 bag play arm_debug
`),
      "**`record`** saves selected topics.",
      "**`-o`** chooses the output bag folder name.",
      "**`info`** summarizes what was recorded.",
      "**`play`** republishes recorded topic data.",
      `[ROS 2 bag tutorial](${docs.rosbag})`,
    ],
    notes:
      "Mention that recording too many high-rate topics can create large files quickly.",
  },
  {
    id: "rosbag_manipulator_debugging",
    type: "bullets",
    hud: "Debug",
    title: "How `rosbag` Helps Manipulator Debugging",
    lead: "A manipulator problem often disappears when you restart. A bag lets you keep the evidence.",
    bullets: [
      "**Joint state problems**: record `/joint_states` to inspect what joints actually published.",
      "**Frame problems**: record `/tf` and `/tf_static` to replay the transform stream.",
      "**Timing problems**: compare message frequency and timestamps.",
      "**Planning problems**: later, record planning scene and trajectory-related topics.",
      "**Team workflow**: share a small bag so another person can reproduce the same data stream.",
    ],
    notes:
      "This is a practical slide. It teaches why rosbag is worth learning early.",
  },
  {
    id: "mini_exercise_overview",
    type: "bullets",
    hud: "Exercise",
    title: "In-Class Exercise: Build A Tiny ROS System",
    lead: "This is the complete path: package -> files -> entry points -> build -> run -> inspect -> record.",
    bullets: [
      "**Step 1**: create the `manipulator_basics` package.",
      "**Step 2**: add `talker.py` and `listener.py` in the inner Python folder.",
      "**Step 3**: edit `setup.py` so `ros2 run` can find both nodes.",
      "**Step 4**: build, source, run, inspect, and record.",
      "**Goal**: understand the loop, not write advanced robot control code yet.",
    ],
    notes:
      "This exercise is intentionally small. It gives students a mental template for later robot nodes.",
  },
  {
    id: "exercise_step_1_create_package",
    type: "bullets",
    hud: "Exercise",
    title: "Step 1: Create The Package",
    lead: "Run this from `~/ros2_ws/src`. If the package already exists, skip this slide and use the existing folder.",
    bullets: [
      codeBlock(`
src
ros2 pkg create --build-type ament_python \\
  manipulator_basics \\
  --dependencies rclpy std_msgs

cd ~/ros2_ws/src/manipulator_basics
ls
`),
      "**`src`** uses your Session 2 alias to jump to `~/ros2_ws/src`.",
      "**Dependencies** are recorded so ROS knows this package uses `rclpy` and `std_msgs`.",
    ],
    notes:
      "This slide gives the exact first steps. The alias src comes from Session 2.",
  },
  {
    id: "exercise_step_1_expected_files",
    type: "two-col",
    hud: "Exercise",
    title: "Step 1 Check: Expected Files",
    left: {
      bullets: [
        "**Package root**: `~/ros2_ws/src/manipulator_basics`.",
        "**Metadata files**: `package.xml`, `setup.py`, and `setup.cfg`.",
        "**Discovery marker**: `resource/manipulator_basics`.",
        "**Python code folder**: `manipulator_basics/` inside the package root.",
      ],
    },
    right: { media: media.packageStructure },
    notes:
      "Use this to check that students are looking at the correct folder before creating node files.",
  },
  {
    id: "exercise_step_2_create_node_files",
    type: "bullets",
    hud: "Exercise",
    title: "Step 2: Create The Node Files",
    lead: "The Python node files go inside the inner package folder.",
    bullets: [
      codeBlock(`
cd ~/ros2_ws/src/manipulator_basics/manipulator_basics
nano talker.py

# after saving talker.py:
nano listener.py
`),
      "**Inner folder rule**: the path repeats the package name once.",
      "**Correct code path**: `manipulator_basics/manipulator_basics/talker.py`.",
      "**Save in nano** with `Ctrl+O`, press Enter, then exit with `Ctrl+X`.",
      "**Do not put node files** directly beside `setup.py`.",
    ],
    notes:
      "This is the exact file placement that beginners often miss.",
  },
  {
    id: "talker_py_part_1",
    type: "bullets",
    hud: "Code",
    title: "`talker.py` Part A: Imports And Node Setup",
    lead: "Paste Part A first. Parts B and C go directly below this in the same file.",
    bullets: [
      codeBlock(`
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class ArmStatusTalker(Node):
    def __init__(self):
        super().__init__("arm_status_talker")
        self.count = 0
`, "python"),
    ],
    notes:
      "This first chunk defines the node class and its node name. The publisher and timer come on the next slide.",
  },
  {
    id: "talker_py_part_2",
    type: "bullets",
    hud: "Code",
    title: "`talker.py` Part B: Publisher And Timer",
    lead: "Paste Part B below `self.count = 0`. Keep this indentation inside the class.",
    bullets: [
      codeBlock(`
        self.pub = self.create_publisher(
            String, "arm_status", 10)
        self.timer = self.create_timer(1.0, self.tick)

    def tick(self):
        msg = String()
        msg.data = f"arm ready: {self.count}"
        self.pub.publish(msg)
        self.get_logger().info(msg.data)
        self.count += 1
`, "python"),
    ],
    notes:
      "Point to the topic name and message type. Those must match the listener later.",
  },
  {
    id: "talker_py_part_3",
    type: "bullets",
    hud: "Code",
    title: "`talker.py` Part C: Main Function",
    lead: "Paste Part C at the left margin, outside the class.",
    bullets: [
      codeBlock(`
def main():
    rclpy.init()
    node = ArmStatusTalker()
    rclpy.spin(node)
    rclpy.shutdown()
`, "python"),
      "**`rclpy.init()`** starts the ROS 2 Python client library.",
      "**`spin(node)`** keeps the node running and processing callbacks.",
      "**`shutdown()`** cleans up when the node stops.",
    ],
    notes:
      "This slide can carry the explanation that the previous code chunks are one file.",
  },
  {
    id: "listener_py_part_1",
    type: "bullets",
    hud: "Code",
    title: "`listener.py` Part A: Subscriber Setup",
    lead: "Paste Part A first. Part B goes directly below this in the same file.",
    bullets: [
      codeBlock(`
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class ArmStatusListener(Node):
    def __init__(self):
        super().__init__("arm_status_listener")
        self.create_subscription(
            String, "arm_status", self.cb, 10)
`, "python"),
    ],
    notes:
      "The listener uses the same message type and topic name as the talker.",
  },
  {
    id: "listener_py_part_2",
    type: "bullets",
    hud: "Code",
    title: "`listener.py` Part B: Callback And Main",
    lead: "Keep `cb()` indented inside the class; keep `main()` at the left margin.",
    bullets: [
      codeBlock(`
    def cb(self, msg):
        self.get_logger().info(f"I heard: {msg.data}")

def main():
    rclpy.init()
    node = ArmStatusListener()
    rclpy.spin(node)
    rclpy.shutdown()
`, "python"),
    ],
    notes:
      "Tie it back to the pub/sub diagram. The topic connects the two nodes.",
  },
  {
    id: "code_takeaways",
    type: "bullets",
    hud: "Code",
    title: "Talker / Listener Takeaways",
    lead: "The code is small, but it contains the core ROS 2 pattern.",
    bullets: [
      "**Same topic name and message type** are required for communication.",
      "**Publisher** creates and sends messages.",
      "**Subscriber callback** receives message objects.",
      "**Timer callback** creates repeated behavior without a manual loop.",
      "**Nodes do not know each other directly**; the topic connects them.",
    ],
    notes:
      "This is the readable summary after the code slides. It keeps the code slides from becoming too crowded.",
  },
  {
    id: "setup_py_entry_points",
    type: "bullets",
    hud: "Package",
    title: "Step 3: Edit `setup.py` Entry Points",
    lead: "Open `~/ros2_ws/src/manipulator_basics/setup.py` and replace the `console_scripts` list with this.",
    bullets: [
      codeBlock(`
entry_points={
    "console_scripts": [
        "talker = manipulator_basics.talker:main",
        "listener = manipulator_basics.listener:main",
    ],
},
`, "python"),
    ],
    notes:
      "Keep this slide sparse so students can copy the block without fighting clutter.",
  },
  {
    id: "entry_points_meaning",
    type: "bullets",
    hud: "Package",
    title: "What The Entry Points Mean",
    lead: "This is the bridge between files on disk and `ros2 run` in the terminal.",
    bullets: [
      "**Left side** is the executable name used by `ros2 run`.",
      "**Right side** is `module.file:function`.",
      "**`talker`** points to `manipulator_basics/talker.py` and its `main()` function.",
      "**`listener`** points to `manipulator_basics/listener.py` and its `main()` function.",
      "**If entry points are wrong**, the package may build but `ros2 run` will fail.",
    ],
    notes:
      "This is one of the common beginner errors. Keep it very explicit.",
  },
  {
    id: "exercise_file_checklist",
    type: "bullets",
    hud: "Exercise",
    title: "Before Building, Check The Files",
    lead: "Most exercise problems are file-location or entry-point problems.",
    bullets: [
      "**Talker file exists**: `~/ros2_ws/src/manipulator_basics/manipulator_basics/talker.py`.",
      "**Listener file exists**: `~/ros2_ws/src/manipulator_basics/manipulator_basics/listener.py`.",
      "**`setup.py` has both entry points**: `talker` and `listener`.",
      "**`package.xml` has dependencies**: `rclpy` and `std_msgs`.",
      "**You are ready to build** only after those four checks pass.",
    ],
    notes:
      "Use this as a pause point before building. It saves time during the live exercise.",
  },
  {
    id: "build_run_exercise",
    type: "bullets",
    hud: "Run",
    title: "Step 4: Build And Source",
    lead: "Build from the workspace root, then source the overlay.",
    bullets: [
      codeBlock(`
ws
colcon build --symlink-install --packages-select manipulator_basics
si

ros2 pkg executables manipulator_basics
`),
      "**Build from `~/ros2_ws`**, not from `src/` and not from the package folder.",
      "**Source after the build** so the terminal can find the new executables.",
      "**Check executables** before running; you should see `talker` and `listener`.",
    ],
    notes:
      "If students get package not found, check source. If executable not found, check setup.py entry points and rebuild.",
  },
  {
    id: "run_exercise_two_terminals",
    type: "bullets",
    hud: "Run",
    title: "Step 5: Run Two Nodes",
    lead: "Each node keeps running, so use two terminals.",
    bullets: [
      "Terminal A:",
      codeBlock(`
si
ros2 run manipulator_basics talker
`),
      "Terminal B:",
      codeBlock(`
si
ros2 run manipulator_basics listener
`),
      "**Expected result**: the listener prints messages from the talker.",
    ],
    notes:
      "The si in each terminal is deliberate. Every terminal needs the workspace overlay.",
  },
  {
    id: "inspect_exercise",
    type: "bullets",
    hud: "Inspect",
    title: "Step 6: Inspect Your Running Nodes",
    lead: "Once the nodes run, prove what is happening.",
    bullets: [
      codeBlock(`
ros2 node list
ros2 node info /arm_status_talker
ros2 topic list
ros2 topic info /arm_status
ros2 topic echo /arm_status
rqt_graph
`),
      "**Do not only trust terminal printouts**; inspect the graph.",
      "**Node info** shows publishers and subscriptions.",
      "**Topic info** confirms the message type and connection counts.",
    ],
    notes:
      "This is where the lecture turns into a debugging habit.",
  },
  {
    id: "record_exercise",
    type: "bullets",
    hud: "Record",
    title: "Step 7: Record Your Topic With `rosbag`",
    lead: "A tiny bag is a good first recording exercise.",
    bullets: [
      codeBlock(`
ros2 bag record -o arm_status_bag /arm_status
ros2 bag info arm_status_bag
ros2 bag play arm_status_bag
`),
      "**Record** while the talker is running.",
      "**Stop recording** with `Ctrl+C`.",
      "**Play back** after stopping the live talker to see recorded data reappear.",
      "**Inspect with `ros2 topic echo`** while playing the bag.",
    ],
    notes:
      "This makes rosbag concrete without requiring a robot model yet.",
  },
  {
    id: "debugging_ladder",
    type: "two-col",
    hud: "Debug",
    title: "A Debugging Order That Works",
    left: {
      bullets: [
        "**Environment first**: is ROS sourced and the right distro active?",
        "**Workspace second**: did you build and source the overlay?",
        "**Graph third**: are the expected nodes and topics visible?",
        "**Interfaces fourth**: do topic names and message types match?",
        "**Code last**: after the system facts are clear, edit the node.",
      ],
    },
    right: { media: media.debuggingLadder },
    notes:
      "This is the habit you want them to leave with. It prevents random guessing.",
  },
  {
    id: "common_errors",
    type: "bullets",
    hud: "Errors",
    title: "Common Errors And What They Mean",
    lead: "Most beginner ROS errors are not deep; they are usually environment, build, or naming errors.",
    bullets: [
      "**`ros2: command not found`** -> base ROS was not sourced.",
      "**`Package not found`** -> wrong workspace, not built, or overlay not sourced.",
      "**`Executable not found`** -> entry point missing or package not rebuilt.",
      "**Topic not visible** -> node is not running or topic name is different.",
      "**No messages received** -> publisher missing, subscriber missing, type mismatch, or QoS issue.",
      "**Python import error** -> file location, package name, or dependency problem.",
    ],
    notes:
      "Ask students to map each error to the debugging ladder.",
  },
  {
    id: "cheat_sheet",
    type: "bullets",
    hud: "Cheat Sheet",
    title: "ROS CLI Cheat Sheet",
    lead: "These commands are enough to begin debugging most small systems.",
    bullets: [
      "**Packages**: `ros2 pkg list`, `ros2 pkg executables <pkg>`",
      "**Nodes**: `ros2 node list`, `ros2 node info /node_name`",
      "**Topics**: `ros2 topic list`, `ros2 topic info <topic>`, `ros2 topic echo <topic>`",
      "**Services**: `ros2 service list`, `ros2 service type <service>`",
      "**Actions**: `ros2 action list`, `ros2 action info <action>`",
      "**Interfaces**: `ros2 interface show <type>`",
      "**Bags**: `ros2 bag record`, `ros2 bag info`, `ros2 bag play`",
    ],
    notes:
      "This slide is meant for students to screenshot or revisit.",
  },
  {
    id: "wrap_up",
    type: "bullets",
    hud: "Wrap-Up",
    title: "What To Remember",
    lead: "The details will become easier with repetition. The mental model matters today.",
    bullets: [
      "**A robot application is a graph** of nodes, topics, services, actions, and parameters.",
      "**A package is not a node**; packages organize code, nodes run code.",
      "**Topics stream data**; services answer quick requests; actions run long goals.",
      "**Build and source deliberately** whenever your workspace changes.",
      "**Inspect before editing**: graph, topics, interfaces, parameters, then code.",
    ],
    notes:
      "Close by saying the next session will use this foundation for robot description, frames, TF, and RViz visualization.",
  },
  {
    id: "bridge_next_session",
    type: "two-col",
    hud: "Next",
    title: "Bridge To The Next Session",
    left: {
      bullets: [
        "**Next topic**: robot description, URDF/Xacro, TF, and RViz2.",
        "**Why today's work matters**: robot models publish topics and transforms through the same graph.",
        "**What to keep practicing**: `ros2 node`, `ros2 topic`, `ros2 interface`, `rqt_graph`, and `ros2 bag`.",
        "**Bring a working terminal** with `ws`, `cb`, `si`, `eb`, and `sb` ready.",
      ],
    },
    right: { media: media.rosLogo },
    notes:
      "This is not a project slide. It simply connects the ROS graph foundation to the next technical topic.",
  },
];

const slideOrder = [
  "title",
  "why_this_session_matters",
  "today_outcomes",
  "ros2_manipulator_workflow",
  "setup_check",
  "source_before_after",
  "workspace_recap",
  "workspace_layering_rule",
  "edit_build_source_run",
  "what_build_means",
  "build_habits",
  "package_executable_node",
  "package_structure",
  "create_package",
  "node_definition",
  "communication_overview",
  "ros_cli_map",
  "interfaces",
  "topics_concept",
  "topics_many_to_many",
  "topic_cli",
  "manipulator_topics",
  "rqt_graph",
  "rqt_graph_hidden_and_cli",
  "rqt_graph_growth",
  "classroom_network_note",
  "services_concept",
  "service_cli",
  "actions_concept",
  "action_cli",
  "why_actions_matter",
  "moveit_preview_planned_path",
  "parameters",
  "parameter_cli",
  "launch_preview",
  "rosbag_concept",
  "rosbag_commands",
  "rosbag_manipulator_debugging",
  "mini_exercise_overview",
  "exercise_step_1_create_package",
  "exercise_step_1_expected_files",
  "exercise_step_2_create_node_files",
  "talker_py_part_1",
  "talker_py_part_2",
  "talker_py_part_3",
  "listener_py_part_1",
  "listener_py_part_2",
  "code_takeaways",
  "setup_py_entry_points",
  "entry_points_meaning",
  "exercise_file_checklist",
  "build_run_exercise",
  "run_exercise_two_terminals",
  "inspect_exercise",
  "record_exercise",
  "debugging_ladder",
  "common_errors",
  "cheat_sheet",
  "wrap_up",
  "bridge_next_session",
];

const slidesById = new Map(slidesData.map((slide) => [slide.id, slide]));
const orderedSlidesData = slideOrder.map((id) => {
  const slide = slidesById.get(id);
  if (!slide) {
    throw new Error(`Missing slide in slideOrder: ${id}`);
  }
  return slide;
});

if (orderedSlidesData.length !== slidesData.length) {
  throw new Error("slideOrder must include every Session 3 slide exactly once.");
}

export default orderedSlidesData;
