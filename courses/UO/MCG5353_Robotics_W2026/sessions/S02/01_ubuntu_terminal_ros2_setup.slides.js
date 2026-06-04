export const topicMeta = {
  id: "01_ubuntu_terminal_ros2_setup",
  title: "Session 2 - Ubuntu Terminal + ROS 2 Setup",
  duration: 105,
  hudDefault: "MCG 5353 - ROBOTICS",
  email: "Ali.Karimzade@uOttawa.ca",
};

const MEDIA_BASE = "./courses/UO/MCG5353_Robotics_W2026/sessions/S02/media/";

function codeBlock(body, lang = "bash") {
  return `\`\`\`${lang}\n${body.trim()}\n\`\`\``;
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

const media = {
  terminalControl: image(
    "terminal_control",
    `${MEDIA_BASE}terminal-control.svg`,
    "Course diagram",
    "Terminal window connected to install, build, launch, and debug tasks",
  ),
  linuxPaths: image(
    "linux_paths",
    `${MEDIA_BASE}linux-paths.svg`,
    "Course diagram",
    "Linux path tree for root, home, ros2 workspace, and ROS Humble install",
  ),
  bashrcLoads: image(
    "bashrc_loads",
    `${MEDIA_BASE}bashrc-loads.svg`,
    "Course diagram",
    "A new terminal reading .bashrc to source ROS and load aliases",
  ),
  workspaceFolders: image(
    "workspace_folders",
    `${MEDIA_BASE}workspace-folders.svg`,
    "Course diagram",
    "ROS 2 workspace folder structure showing src, build, install, and log",
  ),
  underlayOverlayStack: image(
    "underlay_overlay_stack",
    `${MEDIA_BASE}underlay-overlay-stack.svg`,
    "Course diagram",
    "Ubuntu, ROS underlay, and workspace overlay stack",
  ),
  colconLoop: image(
    "colcon_loop",
    `${MEDIA_BASE}colcon-loop.svg`,
    "Course diagram",
    "The edit, build, source, run, and debug loop",
  ),
  rosAptSourceCommands: image(
    "ros_apt_source_commands",
    `${MEDIA_BASE}ros-apt-source-commands.svg`,
    "ROS 2 Documentation - Ubuntu install",
    "ROS 2 Humble apt source setup commands",
    "https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html",
  ),
  colconHelperCommands: image(
    "colcon_helper_commands",
    `${MEDIA_BASE}colcon-helper-commands.svg`,
    "ROS 2 Documentation - colcon tutorial",
    "colcon_cd and colcon argcomplete helper commands",
    "https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Colcon-Tutorial.html",
  ),
  ubuntuLogo: image(
    "ubuntu_logo",
    `${MEDIA_BASE}ubuntu-logo-2022.svg`,
    "Canonical Ubuntu assets",
    "Ubuntu logo",
    "https://assets.ubuntu.com/v1/ff6a9a38-ubuntu-logo-2022.svg",
  ),
  rosLogo: image(
    "ros_logo",
    `${MEDIA_BASE}ros_logo.svg`,
    "ROS Media and Visual Assets",
    "ROS logo",
    "https://upload.wikimedia.org/wikipedia/commons/b/bb/Ros_logo.svg",
  ),
  gazeboLogo: image(
    "gazebo_logo",
    `${MEDIA_BASE}gazebo_logo.svg`,
    "Gazebo media",
    "Gazebo logo",
    "https://upload.wikimedia.org/wikipedia/commons/1/13/Gazebo_logo.svg",
  ),
  rvizStartup: image(
    "rviz_startup",
    `${MEDIA_BASE}initial_startup.png`,
    "ROS 2 Documentation - RViz User Guide",
    "RViz initial startup window",
    "https://docs.ros.org/en/humble/Tutorials/Intermediate/RViz/RViz-User-Guide/RViz-User-Guide.html",
  ),
  rqtGraph: image(
    "rqt_graph",
    `${MEDIA_BASE}rqt_graph.png`,
    "ROS 2 Documentation - Understanding topics",
    "rqt_graph showing nodes and topics",
    "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html",
  ),
  rosTopicDiagram: image(
    "ros_topic_pubsub",
    `${MEDIA_BASE}Topic-SinglePublisherandSingleSubscriber.gif`,
    "ROS 2 Documentation - Understanding topics",
    "Single publisher and subscriber topic diagram",
    "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html",
  ),
  rosNodeTopicService: image(
    "ros_node_topic_service",
    `${MEDIA_BASE}Nodes-TopicandService.gif`,
    "ROS 2 Documentation - Understanding nodes",
    "ROS 2 node topic and service diagram",
    "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html",
  ),
  overlay: image(
    "workspace_overlay",
    `${MEDIA_BASE}overlay.png`,
    "ROS 2 Documentation - Creating a workspace",
    "ROS 2 underlay and overlay workspace diagram",
    "https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html",
  ),
  manipulatorPreview: image(
    "manipulator_preview",
    `${MEDIA_BASE}rviz_start.png`,
    "MoveIt Documentation - MoveIt Quickstart in RViz",
    "Panda robot loaded in RViz with the MotionPlanning plugin",
    "https://moveit.picknik.ai/humble/doc/tutorials/quickstart_in_rviz/quickstart_in_rviz_tutorial.html",
  ),
  planningAroundObject: image(
    "planning_around_object",
    `${MEDIA_BASE}planning_around_object.png`,
    "MoveIt Documentation - Planning Around Objects",
    "Manipulator planning around an obstacle in RViz",
    "https://moveit.picknik.ai/humble/doc/tutorials/planning_around_objects/planning_around_objects.html",
  ),
};

const sourceLinks =
  "Sources: [ROS 2 Humble install](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html), [ROS distributions](https://docs.ros.org/en/jazzy/Releases.html), [Gazebo ROS installation](https://gazebosim.org/docs/harmonic/ros_installation/)";

const rosInstallDocsLink =
  "[ROS 2 Humble Ubuntu install docs](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html)";

const rosLocaleUniverseSetup = codeBlock(`
locale
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
locale

sudo apt install software-properties-common
sudo add-apt-repository universe
`);

const rosDesktopInstall = codeBlock(`
sudo apt update
sudo apt upgrade
sudo apt install ros-humble-desktop
sudo apt install ros-dev-tools
`);

const slidesData = [
  {
    id: "title",
    type: "title",
    hud: "Session 2",
    title: "Session 2 - Ubuntu Terminal + ROS 2 Setup",
    subtitle: "Machine readiness for manipulator robotics in simulation",
    meta: "Ubuntu 22.04 + ROS 2 Humble • Ali Karimzadeh • Ali.Karimzade@uOttawa.ca",
    notes:
      "Open by saying that today is the bridge between installation and the manipulator workflow. The goal is not theory first; the goal is a reliable machine and reliable habits.",
  },
  {
    id: "course_reset_manipulators",
    type: "two-col",
    hud: "Course Reset",
    title: "Manipulators In Simulation",
    left: {
      bullets: [
        "This course uses robot manipulators.",
        "We work in simulation first.",
        "The stack is `Ubuntu 22.04 -> ROS 2 Humble -> RViz2 / rqt -> Gazebo -> MoveIt`.",
        "Today is about setup habits and machine readiness.",
      ],
    },
    right: { media: media.manipulatorPreview },
    notes:
      "Keep this short. Students only need the course direction: manipulator systems, simulation-first workflow, and ROS tools that build toward MoveIt later.",
  },
  {
    id: "todays_goal",
    type: "two-col",
    hud: "Today",
    title: "Today's Goal",
    left: {
      lead: "By the end of today, you should be able to:",
      bullets: [
        "Use basic Ubuntu terminal commands without fear.",
        "Install and source ROS 2 Humble correctly.",
        "Create one clean course workspace.",
        "Build with `colcon` and source the overlay.",
        "Verify ROS with talker/listener, `rqt_graph`, and `rviz2`.",
      ],
    },
    right: { media: media.colconLoop },
    notes:
      "This is the contract for the session. It gives students the practical finish line before the next manipulator topics.",
  },
  {
    id: "ubuntu_terminal_why",
    type: "two-col",
    hud: "Terminal",
    title: "Ubuntu Terminal: Why It Matters",
    left: {
      bullets: [
        "The terminal is the main robotics control surface.",
        "You install packages from it.",
        "You build workspaces from it.",
        "You launch ROS systems from it.",
        "You debug nodes, topics, and environment problems from it.",
      ],
    },
    right: { media: media.terminalControl },
    notes:
      "Robotics students do not need to become Linux administrators today. They do need to become comfortable enough that the terminal stops being a blocker.",
  },
  {
    id: "linux_paths",
    type: "two-col",
    hud: "Paths",
    title: "Linux Paths You Must Know",
    left: {
      bullets: [
        "`/` = root of the whole filesystem",
        "`/home/<user>` = your personal files",
        "`~` = shortcut for your home folder",
        "`/opt/ros/humble` = base ROS 2 Humble install",
        "`~/ros2_ws` = our course workspace",
      ],
    },
    right: { media: media.linuxPaths },
    notes:
      "Make sure students can say what each path means. This one slide prevents many later workspace mistakes.",
  },
  {
    id: "terminal_habits",
    type: "bullets",
    hud: "Habits",
    title: "Terminal Habits That Save Time",
    lead: "These tiny habits are worth more than memorizing long command lists.",
    bullets: [
      "`Tab` completes commands, folders, and many package names.",
      "`Up` and `Down` move through command history.",
      "`Ctrl+C` stops a running command or ROS node.",
      "`Ctrl+L` clears the terminal screen.",
      "`<cmd> --help` gives quick command help.",
      "`man <cmd>` opens the manual when one exists.",
    ],
    notes:
      "Have students practice Tab completion and history in class. These habits reduce typing errors immediately.",
  },
  {
    id: "navigation_commands",
    type: "bullets",
    hud: "Commands",
    title: "Navigation Commands",
    lead: "Know where you are before you build or delete anything.",
    bullets: [
      "`pwd` -> print the current folder",
      "`ls` -> list files and folders",
      "`ls -la` -> list hidden files too",
      "`cd <folder>` -> enter a folder",
      "`cd ..` -> go up one folder",
      "`cd ~` -> return to your home folder",
    ],
    notes:
      "The biggest beginner terminal mistake is running a command from the wrong folder. Use pwd often.",
  },
  {
    id: "files_and_folders",
    type: "bullets",
    hud: "Commands",
    title: "Files And Folders",
    lead: "These commands change files, so slow down and read before pressing Enter.",
    bullets: [
      "`mkdir lab1` -> create a folder",
      "`touch notes.txt` -> create an empty file",
      "`cp notes.txt backup.txt` -> copy a file",
      "`mv backup.txt lab1/` -> move or rename",
      "`rm notes.txt` -> delete a file",
      "`rm -r lab1/` -> delete a folder; use this carefully",
    ],
    notes:
      "Say explicitly that rm does not use a friendly recycle bin in the way students may expect. They should check paths first.",
  },
  {
    id: "viewing_editing_text",
    type: "bullets",
    hud: "Text Files",
    title: "Viewing And Editing Text Files",
    lead: "ROS work involves many launch files, config files, and shell startup files.",
    bullets: [
      "`cat file.txt` -> print the whole file",
      "`less file.txt` -> scroll through a file; press `q` to quit",
      "`head file.txt` -> show the first lines",
      "`tail file.txt` -> show the last lines",
      "`tail -f log.txt` -> follow new lines as they appear",
      "`nano file.txt` -> edit in the terminal",
    ],
    notes:
      "Nano is enough for today. Mention Ctrl+O to save and Ctrl+X to exit if you demo it.",
  },
  {
    id: "apt_package_management",
    type: "bullets",
    hud: "APT",
    title: "APT Package Management",
    lead: "`apt` is the standard package manager we will use on Ubuntu.",
    bullets: [
      codeBlock(`
sudo apt update
sudo apt upgrade -y
sudo apt install <pkg>
`),
      "`update` refreshes the package list.",
      "`upgrade` updates installed packages.",
      "`install` downloads a prebuilt package and puts it in system locations.",
      "For ROS apt packages, that usually means files under `/opt/ros/humble`.",
      "Do not paste long install commands unless you trust the source.",
    ],
    notes:
      "Keep the language precise. update does not update the installed software; it updates package information.",
  },
  {
    id: "ros2_version_baseline",
    type: "two-col",
    hud: "Version Baseline",
    title: "ROS 2 Version Baseline",
    left: {
      bullets: [
        "Use `Ubuntu 22.04 LTS` for this course.",
        "Use `ROS 2 Humble` for this course.",
        "Do not switch to `Ubuntu 24.04 / Jazzy` for this class.",
        "Humble is an LTS ROS 2 distribution supported through May 2027.",
        "Humble deb packages target Ubuntu Jammy 22.04.",
        sourceLinks,
      ],
    },
    right: { media: media.rosLogo },
    notes:
      "Students will see newer tutorials online. Tell them newer is not automatically correct for a shared course stack.",
  },
  {
    id: "system_prep_before_ros",
    type: "two-col",
    hud: "System Prep",
    title: "System Prep Before ROS",
    left: {
      lead: "Run a full Ubuntu update before installing ROS packages.",
      bullets: [
        codeBlock(`
sudo apt update
sudo apt upgrade -y
`),
        "Restart if Ubuntu asks you to restart.",
        "A clean base system avoids package conflicts later.",
      ],
    },
    right: { media: media.ubuntuLogo },
    notes:
      "This follows the ROS Humble install guidance. A fresh Ubuntu 22.04 system should be upgraded before ROS install work.",
  },
  {
    id: "ros2_install_docs_part_1",
    type: "two-col",
    hud: "ROS Install",
    title: "ROS 2 Install From The Docs (1/2)",
    left: {
      lead: "Start with the official Humble Ubuntu install page. These commands prepare locale support and enable Ubuntu Universe.",
      bullets: [
        rosLocaleUniverseSetup,
        rosInstallDocsLink,
      ],
    },
    right: { media: media.ubuntuLogo },
    notes:
      "This is the first part of the official Humble Ubuntu install flow: UTF-8 locale and Universe repository. Students should use the docs link if they need to copy the commands.",
  },
  {
    id: "ros2_install_docs_part_2",
    type: "two-col",
    hud: "ROS Install",
    title: "ROS 2 Install From The Docs (2/2)",
    left: {
      lead: "After the apt source is added, install the desktop package set.",
      bullets: [
        rosDesktopInstall,
        "`ros-humble-desktop` includes ROS, RViz, demos, and tutorials.",
        "`ros-dev-tools` gives us tools for building ROS packages.",
        rosInstallDocsLink,
      ],
    },
    right: { media: media.rosAptSourceCommands },
    notes:
      "The long curl command is the official ros2-apt-source install command, wrapped for slide width. The package choice is the official recommended desktop install for this course.",
  },
  {
    id: "source_ros_current_terminal",
    type: "two-col",
    hud: "Environment",
    title: "Source ROS In Current Terminal",
    left: {
      bullets: [
        codeBlock(`
source /opt/ros/humble/setup.bash
which ros2
printenv ROS_DISTRO
`),
        "`which ros2` should point to a ROS executable.",
        "`printenv ROS_DISTRO` should print `humble`.",
        "If `ros2` is missing, your shell environment is not ready.",
      ],
    },
    right: { media: media.rosNodeTopicService },
    notes:
      "This is the current-terminal version. The next slides add the same base source line to .bashrc so new terminals behave correctly.",
  },
  {
    id: "what_bashrc_does",
    type: "two-col",
    hud: ".bashrc",
    title: "What `.bashrc` Does",
    left: {
      bullets: [
        "Every new interactive terminal reads `~/.bashrc`.",
        "We use it to source ROS 2 Humble automatically.",
        "We also add small aliases to reduce repeated typing.",
        "After editing it, run `source ~/.bashrc` or open a new terminal.",
      ],
    },
    right: { media: media.bashrcLoads },
    notes:
      "Explain that .bashrc is powerful but should stay boring. We add only predictable lines.",
  },
  {
    id: "bashrc_part_1",
    type: "bullets",
    hud: ".bashrc",
    title: "`.bashrc` Part 1: ROS + Basic Helpers",
    lead: "Open `.bashrc` with `nano ~/.bashrc` and add this near the end.",
    bullets: [
      codeBlock(`
# --- ROS 2 Humble (base) ---
source /opt/ros/humble/setup.bash

# quick helpers
alias eb='nano ~/.bashrc'
alias sb='source ~/.bashrc'
`),
      "`eb` edits `.bashrc`.",
      "`sb` reloads `.bashrc`.",
      "Keep this block minimal and readable.",
    ],
    notes:
      "This is adapted from the mobile robotics course style but with no TurtleBot-specific lines.",
  },
  {
    id: "create_one_workspace",
    type: "two-col",
    hud: "Workspace",
    title: "Create One Course Workspace",
    left: {
      lead: "A workspace is where ROS packages you build yourself live. Use one workspace for class work: `~/ros2_ws`.",
      bullets: [
        codeBlock(`
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
colcon build --symlink-install
source ~/ros2_ws/install/setup.bash
`),
        "`colcon build` reads packages in `src/` and creates `build/`, `install/`, and `log/`.",
        "Source the overlay so your terminal can find what you just built.",
      ],
    },
    right: { media: media.workspaceFolders },
    notes:
      "One clean workspace prevents most early path confusion. Do not let students scatter packages across home.",
  },
  {
    id: "workspace_folder_structure",
    type: "two-col",
    hud: "Workspace",
    title: "What `colcon build` Creates",
    left: {
      bullets: [
        "`src/` -> source code for packages you write or clone",
        "`build/` -> temporary compile and generation files",
        "`install/` -> finished package output for this workspace",
        "`log/` -> build logs and command history",
        "APT installs prebuilt packages; `colcon` builds your local workspace packages.",
        "You edit in `src/`, build from `~/ros2_ws`, then source `install/setup.bash`.",
      ],
    },
    right: { media: media.workspaceFolders },
    notes:
      "Students should understand that build, install, and log are generated by colcon. They should not place source code directly in those folders.",
  },
  {
    id: "bashrc_part_2",
    type: "bullets",
    hud: ".bashrc",
    title: "`.bashrc` Part 2: Workspace Aliases",
    lead: "Add these below the ROS base block.",
    bullets: [
      codeBlock(`
# --- Course workspace ---
alias ws='cd ~/ros2_ws'
alias src='cd ~/ros2_ws/src'
alias cb='cd ~/ros2_ws && colcon build --symlink-install'
alias si='source ~/ros2_ws/install/setup.bash'
`),
      "`ws` jumps to the workspace root.",
      "`src` jumps to the package folder.",
      "`cb` builds; `si` sources. Keep these separate at first.",
    ],
    notes:
      "The separation is intentional. Students should learn that building and sourcing are different steps.",
  },
  {
    id: "colcon_autocomplete",
    type: "two-col",
    hud: "Colcon",
    title: "Colcon Autocomplete + `colcon_cd`",
    left: {
      bullets: [
        "Add the helper block on the right to `.bashrc`.",
        "`colcon_cd <package>` jumps directly to a package folder.",
        "Tab completion helps complete `colcon` commands and options.",
        "The ROS tutorial uses `_colcon_cd_root=/opt/ros/humble/`.",
        "[ROS 2 colcon tutorial](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Colcon-Tutorial.html)",
      ],
    },
    right: { media: media.colconHelperCommands },
    notes:
      "This matches the documented colcon_cd setup and the user's terminal block. Keep it as the familiar course helper block.",
  },
  {
    id: "underlay_overlay",
    type: "two-col",
    hud: "Overlay",
    title: "Underlay And Overlay",
    left: {
      bullets: [
        "`/opt/ros/humble` is the underlay.",
        "`~/ros2_ws/install` is your overlay.",
        "Source the base first.",
        "Source the workspace second.",
        "If your package is not found after a build, source the overlay again.",
      ],
    },
    right: { media: media.underlayOverlayStack },
    notes:
      "Use one sentence: the underlay is the base ROS installation, and the overlay is what you just built in your workspace.",
  },
  {
    id: "verify_ros_talker_listener",
    type: "bullets",
    hud: "Verify",
    title: "Verify ROS: Talker / Listener",
    lead: "Use two terminals. This confirms that C++ and Python demo nodes can communicate.",
    bullets: [
      "Terminal A:",
      codeBlock(`
ros2 run demo_nodes_cpp talker
`),
      "Terminal B:",
      codeBlock(`
ros2 run demo_nodes_py listener
`),
      "If the listener prints the talker's messages, your base ROS 2 setup works.",
    ],
    notes:
      "Run this live if time allows. If it fails, check source lines before blaming the install.",
  },
  {
    id: "useful_ros_cli_commands",
    type: "two-col",
    hud: "ROS CLI",
    title: "Useful ROS CLI Commands",
    left: {
      bullets: [
        "`ros2 pkg list` -> list installed packages",
        "`ros2 node list` -> list running nodes",
        "`ros2 topic list` -> list active topics",
        "`ros2 topic echo <topic>` -> print topic data",
        "`ros2 interface show <type>` -> inspect message structure",
        "Start with these before changing code.",
      ],
    },
    right: { media: media.rosTopicDiagram },
    notes:
      "The goal is diagnostic reflexes. When a system does not work, first ask what nodes and topics actually exist.",
  },
  {
    id: "rqt_graph_preview",
    type: "two-col",
    hud: "rqt",
    title: "`rqt_graph` Preview",
    left: {
      bullets: [
        codeBlock(`
rqt_graph
`),
        "`rqt_graph` draws nodes and topics visually.",
        "Use it to see who publishes and who subscribes.",
        "Open it early instead of guessing.",
      ],
    },
    right: { media: media.rqtGraph },
    notes:
      "Connect this to future manipulator systems. When many nodes run together, the graph is the fastest first inspection tool.",
  },
  {
    id: "rviz2_preview",
    type: "two-col",
    hud: "RViz2",
    title: "RViz2 Preview",
    left: {
      bullets: [
        codeBlock(`
rviz2
`),
        "RViz2 is visualization, not simulation.",
        "Use it to inspect robot state, frames, markers, and trajectories.",
        "Later, we will use RViz2 with robot arms and MoveIt.",
      ],
    },
    right: { media: media.rvizStartup },
    notes:
      "This distinction matters. Gazebo simulates physics and worlds; RViz visualizes ROS data.",
  },
  {
    id: "gazebo_later_simulation",
    type: "two-col",
    hud: "Gazebo",
    title: "Gazebo For Later Simulation",
    left: {
      bullets: [
        "Gazebo will be our simulation environment later.",
        "For Humble, use the tested course path:",
        codeBlock(`
sudo apt-get install ros-humble-ros-gz
`),
        "Humble's default Gazebo pairing through this path is Fortress.",
        "Do not teach yourself Gazebo from random version-mixed tutorials.",
        "[Gazebo ROS installation matrix](https://gazebosim.org/docs/harmonic/ros_installation/)",
      ],
    },
    right: { media: media.gazeboLogo },
    notes:
      "Keep this as a preview only. The point today is not Gazebo skills; it is keeping the version path consistent.",
  },
  {
    id: "what_not_to_do_today",
    type: "two-col",
    hud: "Guardrails",
    title: "What Not To Do Today",
    left: {
      bullets: [
        "Do not install random newer tutorial stacks.",
        "Do not switch to Ubuntu 24.04 / Jazzy for this course.",
        "Do not force a full MoveIt source build today.",
        "Do not create multiple workspaces while learning.",
        "Do not paste commands you cannot explain at all.",
      ],
    },
    right: { media: media.planningAroundObject },
    notes:
      "This slide is protective. MoveIt is important, but the base stack must be stable first.",
  },
  {
    id: "common_setup_errors",
    type: "bullets",
    hud: "Troubleshooting",
    title: "Common Setup Errors",
    lead: "Most early ROS errors are environment or workspace errors.",
    bullets: [
      "`ros2: command not found` -> ROS base was not sourced.",
      "`package not found` -> package missing, wrong terminal, or overlay not sourced.",
      "Built successfully but old behavior remains -> source the overlay again.",
      "Commands run from the wrong folder -> check `pwd`.",
      "Multiple workspaces sourced in random order -> simplify to one workspace.",
      "Conda/Python conflicts -> avoid mixing conda Python into apt-based ROS terminals.",
    ],
    notes:
      "The debugging order is: check source, check workspace, check package, then investigate deeper.",
  },
  {
    id: "end_checklist",
    type: "bullets",
    hud: "Checklist",
    title: "End Checklist",
    lead: "Before you call your setup ready, all of these should be true.",
    bullets: [
      "Ubuntu is updated.",
      "ROS 2 Humble is installed.",
      "`source /opt/ros/humble/setup.bash` works.",
      "The aliases `eb`, `sb`, `ws`, `src`, `cb`, and `si` are in `.bashrc`.",
      "`~/ros2_ws` builds with `colcon build --symlink-install`.",
      "Talker/listener works.",
      "`rqt_graph` opens.",
      "`rviz2` opens.",
    ],
    notes:
      "This is the readiness checklist. Students should not arrive next time with only a partial setup.",
  },
];

export default slidesData;
