export const topicMeta = {
  id: "01_panda_urdf_tf_rviz",
  title: "Session 4 - Panda Robot Description, TF, and RViz2",
  duration: 75,
  hudDefault: "MCG 5353 - ROBOTICS",
  email: "Ali.Karimzade@uOttawa.ca",
};

const MEDIA_BASE = "./courses/UO/MCG5353_Robotics_W2026/sessions/S04/media/";

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
  moveitQuickstart:
    "https://moveit.picknik.ai/humble/doc/tutorials/quickstart_in_rviz/quickstart_in_rviz_tutorial.html",
  moveitGettingStarted:
    "https://moveit.picknik.ai/humble/doc/tutorials/getting_started/getting_started.html",
  pandaDescription:
    "https://docs.ros.org/en/humble/p/moveit_resources_panda_description/index.html",
  pandaMoveitConfig:
    "https://docs.ros.org/en/humble/p/moveit_resources_panda_moveit_config/",
  urdf: "https://docs.ros.org/en/humble/Tutorials/Intermediate/URDF/URDF-Main.html",
  urdfStatePublisher:
    "https://docs.ros.org/en/humble/Tutorials/Intermediate/URDF/Using-URDF-with-Robot-State-Publisher.html",
  xacro:
    "https://docs.ros.org/en/humble/Tutorials/Intermediate/URDF/Using-Xacro-to-Clean-Up-a-URDF-File.html",
  tf2: "https://docs.ros.org/en/humble/Tutorials/Intermediate/Tf2/Introduction-To-Tf2.html",
  rviz: "https://docs.ros.org/en/humble/Tutorials/Intermediate/RViz/RViz-User-Guide/RViz-User-Guide.html",
  launch:
    "https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Launch-Main.html",
  rqtGraph:
    "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html",
};

const media = {
  pandaMoveitPreview: image(
    "panda_moveit_preview",
    `${MEDIA_BASE}rviz_start.png`,
    "MoveIt Humble Quickstart in RViz",
    "Panda robot loaded in RViz with the MotionPlanning plugin",
    docs.moveitQuickstart,
  ),
  rqtGraph: image(
    "rqt_graph",
    `${MEDIA_BASE}rqt_graph.png`,
    "ROS 2 Humble Documentation - rqt_graph / Understanding topics",
    "rqt_graph showing nodes and topics",
    docs.rqtGraph,
  ),
  rvizStartup: image(
    "rviz_startup",
    `${MEDIA_BASE}initial_startup.png`,
    "ROS 2 Humble RViz User Guide",
    "RViz initial startup window",
    docs.rviz,
  ),
  urdfFirst: image(
    "urdf_first_robot",
    `${MEDIA_BASE}myfirst.png`,
    "ROS 2 Humble URDF tutorial - first robot model",
    "First URDF robot model from the ROS tutorial",
    docs.urdf,
  ),
  urdfFlexible: image(
    "urdf_flexible",
    `${MEDIA_BASE}flexible.png`,
    "ROS 2 Humble URDF tutorial - movable robot",
    "Movable URDF robot model from the ROS tutorial",
    docs.urdf,
  ),
  urdfVisual: image(
    "urdf_visual_collision",
    `${MEDIA_BASE}visual.png`,
    "ROS 2 Humble URDF tutorial - visual model",
    "URDF visual and collision example model",
    docs.urdf,
  ),
  urdfMaterials: image(
    "urdf_materials",
    `${MEDIA_BASE}materials.png`,
    "ROS 2 Humble URDF/Xacro tutorial",
    "URDF materials example from the ROS tutorial",
    docs.xacro,
  ),
  tfTreeExample: image(
    "tf_tree_example",
    `${MEDIA_BASE}tf_full_tree.png`,
    "Nav2 Documentation - TF frame tree example",
    "Full TF tree example from Nav2 documentation",
    "https://docs.nav2.org/setup_guides/transformation/setup_transforms.html",
  ),
  pandaPipeline: image(
    "panda_pipeline",
    `${MEDIA_BASE}panda-pipeline.svg`,
    "Course diagram",
    "Pipeline from Panda robot description to robot_description, joint states, TF, and RViz",
  ),
  pandaFrameTree: image(
    "panda_frame_tree",
    `${MEDIA_BASE}panda-frame-tree.svg`,
    "Course diagram",
    "Simplified Panda frame tree",
  ),
  urdfLinkJoint: image(
    "urdf_link_joint",
    `${MEDIA_BASE}urdf-link-joint.svg`,
    "Course diagram",
    "URDF parent link, joint, child link, origin, and axis",
  ),
  jointTypes: image(
    "joint_types_manipulator",
    `${MEDIA_BASE}joint-types-manipulator.svg`,
    "Course diagram",
    "Common joint types for manipulator robots",
  ),
  urdfBlocks: image(
    "urdf_blocks",
    `${MEDIA_BASE}urdf-blocks.svg`,
    "Course diagram",
    "URDF visual, collision, and inertial block meanings",
  ),
  xacroStructure: image(
    "xacro_structure",
    `${MEDIA_BASE}xacro-structure.svg`,
    "Course diagram",
    "Panda Xacro and mesh structure",
  ),
  rvizTfDebugFlow: image(
    "rviz_tf_debug_flow",
    `${MEDIA_BASE}rviz-tf-debug-flow.svg`,
    "Course diagram",
    "RViz and TF debugging flow",
  ),
};

const slidesData = [
  {
    id: "title",
    type: "title",
    hud: "Session 4",
    title: "Session 4 - Panda Robot Description, TF, and RViz2",
    subtitle: "URDF/Xacro -> robot_description -> joint states -> TF -> RViz2",
    meta: "MCG 5353 Robotics • Ali Karimzadeh • Ali.Karimzade@uOttawa.ca",
    notes:
      "Open by saying this is the first session where the course robot becomes visible. We are not doing motion planning yet; we are building the model and frame foundation.",
  },
  {
    id: "why_panda_today",
    type: "two-col",
    hud: "Why Panda",
    title: "Why We Start With Panda",
    left: {
      bullets: [
        "**Panda is the official MoveIt Humble tutorial robot**.",
        "**It is a 7-DOF manipulator**, so it prepares students for redundancy and null-space ideas later.",
        "**The same names will return**: `panda_link0`, `panda_arm`, `robot_description`, `/joint_states`, and `/tf`.",
        "**Today is model + frames**, not motion planning yet.",
      ],
    },
    right: { media: media.pandaMoveitPreview },
    notes:
      "Make the reason explicit: students are not learning a throwaway robot. This is the robot they will use in MoveIt.",
  },
  {
    id: "today_goal",
    type: "bullets",
    hud: "Goal",
    title: "What Must Work By The End",
    lead: "By the end of this lab, your machine should show Panda in RViz2 and you should know what data made it appear.",
    bullets: [
      "**Install/check** Panda description resources and visualization tools.",
      "**Find and inspect** Panda URDF/Xacro, meshes, and MoveIt config folders.",
      "**Launch** `robot_state_publisher`, Joint State Publisher GUI, and `rviz2`.",
      "**Move joints** with sliders and watch RViz update.",
      "**Inspect** `/joint_states`, `/tf`, `/tf_static`, and the ROS graph.",
      "**Generate** a TF tree with `tf2_tools view_frames`.",
    ],
    notes:
      "This is a hands-on checklist. If students can do these things, Session 5 MoveIt will feel much less mysterious.",
  },
  {
    id: "central_pipeline",
    type: "two-col",
    hud: "Pipeline",
    title: "The Central Pipeline",
    left: {
      bullets: [
        "**URDF/Xacro** describes the Panda links, joints, and geometry.",
        "**`robot_description`** carries the processed robot model.",
        "**Joint State Publisher GUI** publishes slider-controlled joint values as `/joint_state_publisher`.",
        "**`robot_state_publisher`** computes TF frames from the model and joint states.",
        "**RViz2** uses TF and RobotModel display to draw Panda.",
      ],
    },
    right: { media: media.pandaPipeline },
    notes:
      "This is the one diagram to keep returning to. Almost every bug today is one broken step in this pipeline.",
  },
  {
    id: "session3_connection",
    type: "two-col",
    hud: "ROS Graph",
    title: "Connection To Session 3",
    left: {
      bullets: [
        "**Nodes** today: `robot_state_publisher`, `joint_state_publisher`, `rviz2`.",
        "**Topics** today: `/joint_states`, `/tf`, `/tf_static`.",
        "**Parameters** today: `robot_description`.",
        "**Debugging tool** today: `rqt_graph` plus ROS CLI commands.",
      ],
    },
    right: { media: media.rqtGraph },
    notes:
      "This helps students see that Session 3 was not abstract. These are the exact graph tools they now use on a robot model.",
  },
  {
    id: "setup_check",
    type: "bullets",
    hud: "Warm-Up",
    title: "Start From A Clean Terminal",
    lead: "Use the aliases from Session 2, but still check the environment first.",
    bullets: [
      codeBlock(`
printenv ROS_DISTRO
which ros2
ws
si
ros2 pkg list | awk 'NR <= 10'
`),
      "**Expected distro**: `humble`.",
      "**Expected workspace**: `~/ros2_ws`.",
      "**If package commands fail**, source `/opt/ros/humble/setup.bash` and your workspace overlay again.",
    ],
    notes: "Do this live before installing or launching anything.",
  },
  {
    id: "install_tools",
    type: "bullets",
    hud: "Install",
    title: "Install Tools And Panda Resources",
    lead: "Run this once. Some packages may already be installed.",
    bullets: [
      codeBlock(`
sudo apt update
sudo apt install -y \\
  ros-humble-xacro \\
  ros-humble-robot-state-publisher \\
  ros-humble-joint-state-publisher-gui \\
  ros-humble-tf2-tools graphviz \\
  ros-humble-moveit-resources-panda-description \\
  ros-humble-moveit-resources-panda-moveit-config
`),
    ],
    notes:
      "If the exact apt package names fail on a student's machine, use the course guide or tested install script. The concept is still the same.",
  },
  {
    id: "install_tools_meaning",
    type: "bullets",
    hud: "Install",
    title: "What These Packages Give Us",
    lead: "Each package supports one piece of today's visualization pipeline.",
    bullets: [
      "**Description package** gives the Panda URDF model and meshes.",
      "**MoveIt config package** gives Panda MoveIt configuration files for later.",
      "**Graphviz** is needed when `view_frames` creates a PDF frame tree.",
      "**`robot_state_publisher`** converts model + joint states into TF.",
      "**Joint State Publisher GUI** gives sliders for manual joint-state testing.",
      "**`xacro`** is useful for robot descriptions that are written as Xacro files.",
    ],
    notes:
      "Use this to connect the install command back to the pipeline instead of treating it as a black box.",
  },
  {
    id: "check_panda_packages",
    type: "bullets",
    hud: "Packages",
    title: "Check That Panda Packages Exist",
    lead: "Before creating a launch file, confirm that ROS can find the Panda resources.",
    bullets: [
      codeBlock(`
ros2 pkg list | grep moveit_resources_panda

ros2 pkg prefix --share moveit_resources_panda_description
ros2 pkg prefix --share moveit_resources_panda_moveit_config
`),
      "**If both prefix commands return paths**, the packages are visible.",
      "**If a package is not found**, install it or source the workspace that contains it.",
    ],
    notes:
      "This is a direct package visibility check. It avoids debugging a launch file when the actual problem is missing packages.",
  },
  {
    id: "panda_resource_folders",
    type: "two-col",
    hud: "Panda Files",
    title: "What Is Inside The Panda Resources?",
    left: {
      bullets: [
        "**`panda_description`** contains `urdf/` and `meshes/`.",
        "**`panda.urdf`** is the installed model we will launch today.",
        "**Visual meshes** make the robot look like Panda in RViz.",
        "**Collision meshes** are important later for MoveIt planning.",
        "**`panda_moveit_config`** contains Xacro, SRDF, planning config, and launch files for later.",
      ],
    },
    right: { media: media.xacroStructure },
    notes:
      "Use this as the folder mental model before students inspect with ls.",
  },
  {
    id: "inspect_panda_files",
    type: "bullets",
    hud: "Panda Files",
    title: "Inspect The Panda Files",
    lead: "Use package-prefix paths instead of guessing where ROS installed the package.",
    bullets: [
      codeBlock(`
PANDA_DESC=$(ros2 pkg prefix --share moveit_resources_panda_description)
echo $PANDA_DESC
ls $PANDA_DESC
ls $PANDA_DESC/urdf
ls $PANDA_DESC/meshes

less $PANDA_DESC/urdf/panda.urdf
`),
      "**Use `q` to exit `less`**.",
      "**Do not edit installed resource files**; inspect them only.",
    ],
    notes: "This gives students a safe way to explore installed ROS packages.",
  },
  {
    id: "urdf_big_picture",
    type: "two-col",
    hud: "URDF",
    title: "URDF Big Picture",
    left: {
      bullets: [
        "**URDF is the robot structure file**.",
        "**A robot model is a tree** of links connected by joints.",
        "**Each joint gives a transform** from parent link to child link.",
        "**RViz needs this model** before it can draw a RobotModel.",
        `[ROS 2 URDF tutorial](${docs.urdf})`,
      ],
    },
    right: { media: media.urdfFirst },
    notes:
      "Keep this conceptual. Students should not think URDF is motion planning; it is the model description.",
  },
  {
    id: "links_and_joints",
    type: "two-col",
    hud: "URDF",
    title: "Links And Joints",
    left: {
      bullets: [
        "**Link** = rigid body such as a base, arm segment, wrist, hand, or finger.",
        "**Joint** = relationship between a parent link and child link.",
        "**Origin** = where the joint frame is placed relative to the parent.",
        "**Axis** = direction of joint motion for rotating or sliding joints.",
        "**Panda has a chain** from `panda_link0` through the wrist and hand.",
      ],
    },
    right: { media: media.urdfLinkJoint },
    notes:
      "This slide is the foundation for TF. A joint is not just a motor; it defines a frame relationship.",
  },
  {
    id: "panda_frame_names",
    type: "two-col",
    hud: "Frames",
    title: "Panda Frame Names To Recognize",
    left: {
      bullets: [
        "**Base frame**: `panda_link0`.",
        "**Arm links**: `panda_link1` through `panda_link8`.",
        "**Hand frame**: `panda_hand`.",
        "**Finger links**: `panda_leftfinger` and `panda_rightfinger`.",
        "**MoveIt planning group later**: `panda_arm`.",
      ],
    },
    right: { media: media.pandaFrameTree },
    notes:
      "Students do not need to memorize every frame today, but panda_link0 and panda_arm should be familiar.",
  },
  {
    id: "joint_types",
    type: "two-col",
    hud: "Joints",
    title: "Joint Types In Robot Models",
    left: {
      bullets: [
        "**Fixed joints** attach things that do not move.",
        "**Revolute joints** rotate within limits; Panda arm joints use this idea.",
        "**Continuous joints** rotate without limits; common in wheels.",
        "**Prismatic joints** slide linearly; useful for grippers and rails.",
        "**Joint type controls what sliders or planners can move**.",
      ],
    },
    right: { media: media.jointTypes },
    notes:
      "Use Panda as the manipulator example and mention that finger motion is a good place to see prismatic-style thinking.",
  },
  {
    id: "movable_robot_model",
    type: "two-col",
    hud: "URDF",
    title: "Joint Values Make The Model Move",
    left: {
      bullets: [
        "**URDF gives structure**, but not the current pose by itself.",
        "**`/joint_states` gives current joint values**.",
        "**`robot_state_publisher` combines both** to compute link transforms.",
        "**Moving a slider changes joint states**, which changes TF and RViz.",
      ],
    },
    right: { media: media.urdfFlexible },
    notes:
      "This is the most important idea before launching Joint State Publisher GUI.",
  },
  {
    id: "visual_collision_inertial",
    type: "two-col",
    hud: "URDF",
    title: "Visual, Collision, And Inertial Blocks",
    left: {
      bullets: [
        "**Visual** is what RViz draws.",
        "**Collision** is what collision checkers and planners use.",
        "**Inertial** is mass and inertia for physics simulation.",
        "**A nice-looking robot can still have bad collision geometry**.",
        "**MoveIt cares deeply about collision geometry later**.",
      ],
    },
    right: { media: media.urdfBlocks },
    notes:
      "This prepares students for MoveIt collision checking without teaching planning yet.",
  },
  {
    id: "visual_collision_example",
    type: "two-col",
    hud: "URDF",
    title: "Visual Geometry Is Not Always Collision Geometry",
    left: {
      bullets: [
        "**Visual geometry** can be detailed and pretty.",
        "**Collision geometry** is often simpler for faster checking.",
        "**Do not debug planning from visuals alone**.",
        "**Later in MoveIt**, red collision states come from collision models, not just what looks close.",
      ],
    },
    right: { media: media.urdfVisual },
    notes:
      "Use the official URDF image to show that URDF has layers of meaning.",
  },
  {
    id: "xacro_why",
    type: "two-col",
    hud: "Xacro",
    title: "Why Xacro Exists",
    left: {
      bullets: [
        "**Xacro is URDF with variables and macros**.",
        "**It reduces copy-paste** in long robot descriptions.",
        "**It helps manage meshes and package paths**.",
        "**Today we launch an installed `panda.urdf`**, but many real robot packages store the source model as Xacro.",
        "**The Panda MoveIt config package includes Xacro files** we will use later with MoveIt.",
        `[ROS 2 Xacro tutorial](${docs.xacro})`,
      ],
    },
    right: { media: media.urdfMaterials },
    notes:
      "Students do not need to write advanced Xacro today. They need to understand why the file is not plain URDF.",
  },
  {
    id: "xacro_to_robot_description",
    type: "bullets",
    hud: "Xacro",
    title: "From Robot Model To `robot_description`",
    lead: "For today's installed Panda description, we can pass the URDF file text into `robot_state_publisher`.",
    bullets: [
      codeBlock(`
PANDA_DESC=$(ros2 pkg prefix --share moveit_resources_panda_description)
cp $PANDA_DESC/urdf/panda.urdf /tmp/panda.urdf
head /tmp/panda.urdf
`),
      "**URDF input**: XML robot model with links, joints, visuals, collisions, and inertials.",
      "**Launch file use**: store that output in the `robot_description` parameter.",
      "**Later MoveIt use**: Xacro files can generate the same kind of URDF string dynamically.",
    ],
    notes:
      "This is a safe command-line preview before students see the launch file. The apt package provides panda.urdf in the description package.",
  },
  {
    id: "tf2_big_picture",
    type: "two-col",
    hud: "TF2",
    title: "TF2: The Robot Frame System",
    left: {
      bullets: [
        "**TF answers pose questions**: where is one frame relative to another?",
        "**`/tf`** carries changing transforms.",
        "**`/tf_static`** carries fixed transforms.",
        "**RViz uses TF** to know where every link should appear.",
        "**MoveIt uses frames** to interpret end-effector goals later.",
      ],
    },
    right: { media: media.tfTreeExample },
    notes:
      "The Nav2 tree is not Panda, but it is a strong visual for what a TF tree means.",
  },
  {
    id: "today_nodes",
    type: "bullets",
    hud: "Launch",
    title: "Nodes We Will Launch Today",
    lead: "Our class launch file starts three important tools.",
    bullets: [
      "**`robot_state_publisher`** reads `robot_description` and `/joint_states`, then publishes TF.",
      "**`joint_state_publisher_gui` executable** opens sliders; the node appears as `/joint_state_publisher`.",
      "**`rviz2`** visualizes RobotModel and TF.",
      "**This is not MoveIt yet**; it is the model and frame foundation.",
    ],
    notes: "This slide turns the pipeline into actual nodes.",
  },
  {
    id: "create_lab_package",
    type: "bullets",
    hud: "Hands-On",
    title: "Step 1: Create A Class Launch Package",
    lead: "We create our own small package so we do not edit installed Panda files.",
    bullets: [
      codeBlock(`
src
ros2 pkg create --build-type ament_cmake mcg5353_panda_viz

cd ~/ros2_ws/src/mcg5353_panda_viz
`),
      "**Do not add runtime tools as CMake dependencies here**.",
      "**This package only installs a launch file**, so the CMake side should stay simple.",
    ],
    notes:
      "This creates the wrapper package. The next slide creates the launch folder and explains why.",
  },
  {
    id: "create_lab_package_check",
    type: "bullets",
    hud: "Hands-On",
    title: "Step 1 Check: Package Folder",
    lead: "Now create folders for launch files and saved RViz configs.",
    bullets: [
      codeBlock(`
cd ~/ros2_ws/src/mcg5353_panda_viz
mkdir -p launch rviz
ls
`),
      "**This package stores our launch file**.",
      "**The `rviz/` folder stores saved RViz layouts**.",
      "**The Panda model still comes from the MoveIt resources package**.",
      "**Expected files/folders**: `package.xml`, `CMakeLists.txt`, `launch/`, and `rviz/`.",
    ],
    notes:
      "This is the cleanest hands-on setup: students create only the wrapper package.",
  },
  {
    id: "package_xml_runtime_dependencies",
    type: "bullets",
    hud: "Hands-On",
    title: "Step 1B: Add Runtime Dependencies",
    lead: "Edit `package.xml` so the launch package records what it needs at runtime.",
    bullets: [
      codeBlock(`
cd ~/ros2_ws/src/mcg5353_panda_viz
nano package.xml
`),
      "Add these before `</package>`:",
      codeBlock(
        `
<exec_depend>launch</exec_depend>
<exec_depend>launch_ros</exec_depend>
<exec_depend>robot_state_publisher</exec_depend>
<exec_depend>joint_state_publisher_gui</exec_depend>
<exec_depend>rviz2</exec_depend>
<exec_depend>moveit_resources_panda_description</exec_depend>
`,
        "xml",
      ),
      "**Runtime dependency** means needed when launching, not needed for CMake to compile.",
    ],
    notes:
      "This avoids a common build error: GUI/runtime packages do not all provide CMake config files.",
  },
  {
    id: "create_launch_file",
    type: "bullets",
    hud: "Hands-On",
    title: "Step 2: Create The Launch File",
    lead: "Create one launch file that starts the model pipeline.",
    bullets: [
      codeBlock(`
cd ~/ros2_ws/src/mcg5353_panda_viz
nano launch/display_panda.launch.py
`),
      "**Save in nano** with `Ctrl+O`, Enter, then `Ctrl+X`.",
      "**The next slides give the full launch file in copy-safe pieces**.",
    ],
    notes:
      "Pause here before code. Make sure everyone is editing the correct file.",
  },
  {
    id: "launch_file_header",
    type: "bullets",
    hud: "Launch Code",
    title: "Launch File Part A: Imports",
    lead: "Paste this at the top of `display_panda.launch.py`.",
    bullets: [
      codeBlock(
        `
from launch import LaunchDescription
from launch.substitutions import Command, PathJoinSubstitution
from launch_ros.actions import Node
from launch_ros.substitutions import FindPackageShare
`,
        "python",
      ),
      "**`FindPackageShare`** finds installed ROS package resources.",
      "**`Command`** reads the URDF file text so it can become a ROS parameter.",
    ],
    notes:
      "These imports are practical. Do not over-teach launch Python internals yet.",
  },
  {
    id: "launch_file_xacro_path",
    type: "bullets",
    hud: "Launch Code",
    title: "Launch File Part B: Find Panda URDF",
    lead: "Paste this below the imports.",
    bullets: [
      codeBlock(
        `
def generate_launch_description():
    panda_urdf = PathJoinSubstitution([
        FindPackageShare("moveit_resources_panda_description"),
        "urdf",
        "panda.urdf",
    ])
`,
        "python",
      ),
      "**This avoids hard-coded absolute paths**.",
      "**If the package is not sourced or installed**, this line cannot find the Panda model.",
    ],
    notes:
      "The indentation is important: panda_urdf is inside generate_launch_description.",
  },
  {
    id: "launch_file_robot_description",
    type: "bullets",
    hud: "Launch Code",
    title: "Launch File Part C: Create `robot_description`",
    lead: "Paste this inside `generate_launch_description()` below `panda_urdf`.",
    bullets: [
      codeBlock(
        `
    robot_description = {
        "robot_description": Command(["cat ", panda_urdf])
    }
`,
        "python",
      ),
      "**`cat` reads the installed Panda URDF file**.",
      "**The file text becomes the `robot_description` parameter**.",
      "**This parameter is what `robot_state_publisher` needs**.",
    ],
    notes: "Make sure students preserve the indentation.",
  },
  {
    id: "launch_file_robot_state_publisher",
    type: "bullets",
    hud: "Launch Code",
    title: "Launch File Part D: Robot State Publisher",
    lead: "Paste this below `robot_description`.",
    bullets: [
      codeBlock(
        `
    robot_state_publisher = Node(
        package="robot_state_publisher",
        executable="robot_state_publisher",
        parameters=[robot_description],
        output="screen",
    )
`,
        "python",
      ),
      "**This node publishes TF for the Panda links**.",
      "**It needs both the model and joint states**.",
    ],
    notes: "This node is the bridge from robot model to TF.",
  },
  {
    id: "launch_file_gui_rviz",
    type: "bullets",
    hud: "Launch Code",
    title: "Launch File Part E: Joint State GUI",
    lead: "Paste this below the robot state publisher block.",
    bullets: [
      codeBlock(
        `
    joint_state_publisher_gui = Node(
        package="joint_state_publisher_gui",
        executable="joint_state_publisher_gui",
        output="screen",
    )
`,
        "python",
      ),
      "**The GUI publishes `/joint_states`** from slider values.",
    ],
    notes: "Explain that this is why the sliders appear.",
  },
  {
    id: "launch_file_rviz",
    type: "bullets",
    hud: "Launch Code",
    title: "Launch File Part F: RViz2",
    lead: "Paste this below the joint state GUI block.",
    bullets: [
      codeBlock(
        `

    rviz = Node(
        package="rviz2",
        executable="rviz2",
        output="screen",
    )
`,
        "python",
      ),
      "**RViz opens with an empty/default config**, then we add displays manually.",
    ],
    notes:
      "RViz is intentionally launched without a config so students learn Fixed Frame, RobotModel, and TF display setup.",
  },
  {
    id: "launch_file_return",
    type: "bullets",
    hud: "Launch Code",
    title: "Launch File Part G: Return The Nodes",
    lead: "Paste this at the end of `generate_launch_description()`.",
    bullets: [
      codeBlock(
        `
    return LaunchDescription([
        robot_state_publisher,
        joint_state_publisher_gui,
        rviz,
    ])
`,
        "python",
      ),
      "**This is the startup recipe**.",
      "**One launch command will start all three nodes**.",
    ],
    notes: "This completes the launch file.",
  },
  {
    id: "register_launch_folder",
    type: "bullets",
    hud: "Build",
    title: "Step 3: Minimal `CMakeLists.txt`",
    lead: "Replace the file with this launch-only version.",
    bullets: [
      codeBlock(
        `
cmake_minimum_required(VERSION 3.8)
project(mcg5353_panda_viz)

find_package(ament_cmake REQUIRED)

install(DIRECTORY launch rviz DESTINATION share/\${PROJECT_NAME})

ament_package()
`,
        "cmake",
      ),
    ],
    notes:
      "Only ament_cmake belongs in find_package for this wrapper package. Runtime tools stay in package.xml as exec_depend entries.",
  },
  {
    id: "check_lab_package",
    type: "bullets",
    hud: "Check",
    title: "Before Building, Check Your Files",
    lead: "Do this quick check before building.",
    bullets: [
      codeBlock(`
cd ~/ros2_ws/src/mcg5353_panda_viz
find . -maxdepth 2 -type f | sort
`),
      "**Expected**: `package.xml`, `CMakeLists.txt`, `launch/display_panda.launch.py`, and `rviz/`.",
      "**If the launch file is missing**, you probably saved it in the wrong folder.",
      "**If CMakeLists was not edited**, the package may build but launch may fail.",
    ],
    notes:
      "This is a practical pause point. It prevents avoidable build confusion.",
  },
  {
    id: "build_lab_package",
    type: "bullets",
    hud: "Build",
    title: "Step 4: Build And Source",
    lead: "Build only this package, then source the workspace overlay.",
    bullets: [
      codeBlock(`
ws
cb --packages-select mcg5353_panda_viz
si

ros2 pkg prefix --share mcg5353_panda_viz
ls $(ros2 pkg prefix --share mcg5353_panda_viz)/launch
`),
      "**Build from the workspace root**.",
      "**Source after building** so `ros2 launch` sees the installed launch file.",
      "**Check the installed launch and RViz folders** before running.",
    ],
    notes:
      "The cb alias can accept extra arguments because it expands to colcon build.",
  },
  {
    id: "launch_panda",
    type: "bullets",
    hud: "Run",
    title: "Step 5: Launch Panda In RViz2",
    lead: "This starts the three-node visualization pipeline.",
    bullets: [
      codeBlock(`
ros2 launch mcg5353_panda_viz display_panda.launch.py
`),
      "**Expected windows**: Joint State Publisher GUI and RViz2.",
      "**Expected terminal output**: robot_state_publisher reports segments/joints.",
      "**If RViz opens empty**, that is normal; we still need to add displays.",
    ],
    notes: "Tell students not to panic if RViz is empty at first.",
  },
  {
    id: "rviz_setup_fixed_frame",
    type: "two-col",
    hud: "RViz2",
    title: "Step 6: Configure RViz2",
    left: {
      bullets: [
        "**Set Fixed Frame** to `panda_link0`.",
        "**Add RobotModel display** to draw Panda.",
        "**Add TF display** to see frames.",
        "**Optional**: add Grid for orientation.",
        "**If RobotModel is red or missing**, check TF and `robot_description`.",
      ],
    },
    right: { media: media.rvizStartup },
    notes:
      "The MoveIt quickstart also sets Fixed Frame to /panda_link0 for Panda. Here we do the same base idea without MotionPlanning yet.",
  },
  {
    id: "save_rviz_config",
    type: "bullets",
    hud: "RViz2",
    title: "Step 6B: Save The RViz Setup",
    lead: "After Panda looks correct in RViz, save that layout inside your package.",
    bullets: [
      "In RViz2:",
      "**File -> Save Config As**",
      "Save to this exact path:",
      codeBlock(`
~/ros2_ws/src/mcg5353_panda_viz/rviz/panda_display.rviz
`),
      "**This saves the Fixed Frame, RobotModel display, TF display, and layout**.",
      "**Do not save it in `/opt/ros/...`**; save it in your workspace package.",
    ],
    notes:
      "This is the moment when the manual RViz setup becomes reusable. Students should save only after RobotModel and TF look correct.",
  },
  {
    id: "launch_with_saved_rviz",
    type: "bullets",
    hud: "Launch Code",
    title: "Step 6C: Add The RViz Config Path",
    lead: "Paste this inside `generate_launch_description()` below `robot_description`.",
    bullets: [
      codeBlock(
        `
    rviz_config = PathJoinSubstitution([
        FindPackageShare("mcg5353_panda_viz"),
        "rviz",
        "panda_display.rviz",
    ])
`,
        "python",
      ),
      "**This points the launch file** to your saved RViz layout.",
      "**The config file must be installed** through the `rviz/` folder rule in `CMakeLists.txt`.",
    ],
    notes:
      "This slide teaches where the RViz config path enters the launch file.",
  },
  {
    id: "launch_with_saved_rviz_node",
    type: "bullets",
    hud: "Launch Code",
    title: "Step 6D: Use The Config In RViz2",
    lead: "Replace the old RViz node with this version.",
    bullets: [
      codeBlock(
        `
    rviz = Node(
        package="rviz2",
        executable="rviz2",
        arguments=["-d", rviz_config],
        output="screen",
    )
`,
        "python",
      ),
      "**`-d` tells RViz2** which config file to open.",
      "**Expected result**: RViz opens with RobotModel, TF, and your saved layout.",
    ],
    notes:
      "Keep this as the RViz node replacement only. The rebuild command goes on the next slide.",
  },
  {
    id: "rebuild_saved_rviz_launch",
    type: "bullets",
    hud: "Build",
    title: "Step 6E: Rebuild And Launch Again",
    lead: "Rebuild because the launch file and RViz config are installed package resources.",
    bullets: [
      codeBlock(`
ws
cb --packages-select mcg5353_panda_viz
si
ros2 launch mcg5353_panda_viz display_panda.launch.py
`),
      "**Expected result**: RViz opens already showing Panda, RobotModel, and TF.",
    ],
    notes: "This completes the saved RViz config workflow.",
  },
  {
    id: "move_sliders",
    type: "bullets",
    hud: "Joints",
    title: "Step 7: Move Panda Joints",
    lead: "Use the Joint State Publisher GUI sliders and watch the robot update in RViz.",
    bullets: [
      "**Move one joint at a time** so you can connect slider, joint, link, and frame.",
      "**Watch `/joint_states` change** when a slider moves.",
      "**Watch TF update** as `robot_state_publisher` recomputes link transforms.",
      "**Remember**: the GUI is not a controller; it is a visualization/debugging tool.",
    ],
    notes:
      "This is a key learning moment. The students see the pipeline move live.",
  },
  {
    id: "inspect_nodes",
    type: "bullets",
    hud: "Inspect",
    title: "Inspect The Running Nodes",
    lead: "Use Session 3 commands on the real model pipeline.",
    bullets: [
      codeBlock(`
ros2 node list
ros2 node info /robot_state_publisher
ros2 node info /joint_state_publisher
`),
      "**The GUI executable appears as the `/joint_state_publisher` node** in the ROS graph.",
      "**Node info** shows publishers, subscriptions, and parameters.",
    ],
    notes: "If node names differ, use ros2 node list and adapt the command.",
  },
  {
    id: "inspect_joint_states",
    type: "bullets",
    hud: "Inspect",
    title: "Inspect `/joint_states`",
    lead: "Move a slider while this command runs.",
    bullets: [
      codeBlock(`
ros2 topic list
ros2 topic info /joint_states
ros2 topic echo /joint_states
`),
      "**`/joint_states` contains joint names, positions, velocities, and efforts**.",
      "**If this topic is missing**, the GUI is not running or not publishing.",
      "**If names look unfamiliar**, compare them with Panda joint names in the URDF.",
    ],
    notes: "This connects GUI movement to actual ROS data.",
  },
  {
    id: "inspect_tf",
    type: "bullets",
    hud: "Inspect",
    title: "Inspect `/tf` And `/tf_static`",
    lead: "These topics carry frame relationships.",
    bullets: [
      codeBlock(`
ros2 topic info /tf
ros2 topic info /tf_static
ros2 topic echo /tf --once
ros2 topic echo /tf_static --once
`),
      "**`/tf` changes** as movable joints change.",
      "**`/tf_static` stays fixed** for static relationships.",
      "**RViz depends on TF** to place every robot link correctly.",
    ],
    notes: "This makes TF less abstract.",
  },
  {
    id: "view_frames",
    type: "bullets",
    hud: "TF2",
    title: "Generate A TF Tree",
    lead: "Use `view_frames` to create a frame-tree report.",
    bullets: [
      codeBlock(`
ros2 run tf2_tools view_frames
ls
`),
      "**Expected output**: a file such as `frames.pdf`.",
      "**The PDF shows parent-child frame relationships**.",
      "**If the tree is tiny or empty**, check that the launch is still running.",
      "**Open the PDF manually** or run `xdg-open frames.pdf` if your desktop supports it.",
    ],
    notes: "This command is one of the most useful TF debugging habits.",
  },
  {
    id: "tf_tree_visual",
    type: "two-col",
    hud: "TF2",
    title: "How To Read A TF Tree",
    left: {
      bullets: [
        "**Tree direction matters**: parent frame -> child frame.",
        "**For Panda**, you should see a chain from the base toward wrist/hand/fingers.",
        "**Missing branch** usually means missing joint state or missing model data.",
        "**Wrong fixed frame in RViz** can make a correct tree look broken.",
      ],
    },
    right: { media: media.tfTreeExample },
    notes:
      "Use the Nav2 image as a general example, then relate it back to Panda.",
  },
  {
    id: "rqt_graph_pipeline",
    type: "two-col",
    hud: "Graph",
    title: "Use `rqt_graph` On The Panda Pipeline",
    left: {
      bullets: [
        codeBlock(`
rqt_graph
`),
        "**Look for the data path** from GUI to joint states to robot state publisher.",
        "**RViz subscribes** to model/TF-related data to visualize the robot.",
        "**If the graph is confusing**, hide debug nodes or refresh the graph.",
      ],
    },
    right: { media: media.rqtGraph },
    notes: "Use this to connect visual graph debugging back to Session 3.",
  },
  {
    id: "record_model_data",
    type: "bullets",
    hud: "rosbag",
    title: "Optional: Record The Model Data",
    lead: "A small bag can capture the joint and TF data you generate with sliders.",
    bullets: [
      codeBlock(`
ros2 bag record -o panda_model_debug /joint_states /tf /tf_static
ros2 bag info panda_model_debug
`),
      "**Record while moving sliders**.",
      "**Use bags when a frame or joint problem is hard to reproduce**.",
      "**Do not record everything**; start with the topics you need.",
    ],
    notes: "This is a short optional exercise if time allows.",
  },
  {
    id: "rviz_debug_flow",
    type: "two-col",
    hud: "Debug",
    title: "Debug Panda In This Order",
    left: {
      bullets: [
        "**Environment**: ROS sourced, package visible.",
        "**Launch file**: installed and found by `ros2 launch`.",
        "**Nodes**: all three nodes are alive.",
        "**Model**: `robot_description` exists.",
        "**Data**: `/joint_states`, `/tf`, `/tf_static` exist.",
        "**RViz**: Fixed Frame is `panda_link0` and displays are added.",
      ],
    },
    right: { media: media.rvizTfDebugFlow },
    notes:
      "This slide should prevent random debugging. It is the order to follow when RViz is blank.",
  },
  {
    id: "common_errors",
    type: "bullets",
    hud: "Errors",
    title: "Common Errors Today",
    lead: "Most errors come from package visibility, launch-file installation, or RViz configuration.",
    bullets: [
      "**`package not found`** -> package not installed, not built, or workspace not sourced.",
      "**`launch file not found`** -> missing CMake install rule or overlay not sourced.",
      "**CMake `find_package` error** -> remove runtime GUI/tool packages from `CMakeLists.txt`.",
      "**URDF/model path error** -> check `ros2 pkg prefix --share moveit_resources_panda_description`.",
      "**No robot in RViz** -> add RobotModel and set Fixed Frame to `panda_link0`.",
      "**Sliders do nothing** -> check `/joint_states` and `robot_state_publisher`.",
      "**TF tree missing links** -> check model loading and joint state publishing.",
    ],
    notes: "This is the practical troubleshooting slide.",
  },
  {
    id: "moveit_preview",
    type: "two-col",
    hud: "MoveIt",
    title: "How This Connects To MoveIt",
    left: {
      bullets: [
        "**MoveIt starts from the same robot model**.",
        "**The MoveIt RViz plugin uses `robot_description`** and Panda planning configuration.",
        "**The official quickstart sets Fixed Frame to `panda_link0`**.",
        "**The planning group becomes `panda_arm`**.",
        "**Next time**, we use the same Panda model for interactive planning.",
      ],
    },
    right: { media: media.pandaMoveitPreview },
    notes:
      "This is the bridge to Session 5. Do not teach planning deeply today.",
  },
  {
    id: "end_checklist",
    type: "bullets",
    hud: "Checklist",
    title: "End Checklist",
    lead: "Before leaving, your setup should pass these checks.",
    bullets: [
      "**Panda resources visible**: `ros2 pkg prefix --share moveit_resources_panda_description` works.",
      "**Class package builds**: `cb --packages-select mcg5353_panda_viz` succeeds.",
      "**Launch works**: `ros2 launch mcg5353_panda_viz display_panda.launch.py` starts RViz and GUI.",
      "**RViz shows Panda** with Fixed Frame `panda_link0`.",
      "**RViz config saved**: `rviz/panda_display.rviz` exists in your package.",
      "**Launch uses the saved config**: RViz opens already configured after rebuild/source.",
      "**Slider motion updates Panda** in RViz.",
      "**`/joint_states`, `/tf`, and `/tf_static` are inspectable**.",
      "**`view_frames` creates a frame tree report**.",
    ],
    notes: "This is the completion definition for the session.",
  },
  {
    id: "wrap_up",
    type: "bullets",
    hud: "Wrap-Up",
    title: "What To Remember",
    lead: "Today was not about planning yet. It was about making the robot model real in ROS.",
    bullets: [
      "**URDF/Xacro describes structure**: links, joints, geometry, and frames.",
      "**`robot_description` is the model parameter** that other tools consume.",
      "**`/joint_states` gives the current joint values**.",
      "**TF gives frame relationships** so RViz can place every link.",
      "**RViz is the first place to debug the robot model** before MoveIt.",
    ],
    notes:
      "Close by emphasizing that MoveIt will be much easier if students understand these pieces.",
  },
];

export default slidesData;
