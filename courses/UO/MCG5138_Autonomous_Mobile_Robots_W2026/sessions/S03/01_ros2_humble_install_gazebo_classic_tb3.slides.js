// courses/uOttawa/MCG5138_Autonomous_Mobile_Robots_W2026/sessions/S01/01_ros2_humble_install_gazebo_classic_tb3.slides.js
// Topic — ROS 2 Humble + Gazebo Classic (11) + TurtleBot3 (student-ready setup)
// Renderer supports: **bold**, `inline code`, ```code blocks```, clickable URLs, [label](url)

export const topicMeta = {
  id: "01_ros2_humble_install_gazebo_classic_tb3",
  title: "ROS 2 Humble Setup (Ubuntu 22.04) + Gazebo Classic + TurtleBot3",
  duration: 45,
};

const slidesData = [
  // 0 — TITLE
  {
    type: "title",
    hud: "Setup",
    title: "ROS 2 **Humble** + **Gazebo Classic** + **TurtleBot3**",
    subtitle: "Student-ready installation (Ubuntu 22.04)",
    meta: "UOttawa Mobile Robotics • Instructor: Ali Karimzadeh",
    notes:
      "Goal: everyone ends with ROS2 Humble working. We keep it reproducible and source-backed.",
  },

  // 1 — LEARNING GOALS
  {
    type: "bullets",
    hud: "Goals",
    title: "What Students Will Have Working",
    lead: "By the end, your machine can run **ROS 2 demos** and a **TurtleBot3 simulation in Gazebo Classic**.",
    bullets: [
      "**ROS 2 Humble Desktop** installed (RViz + demos).",
      "**One workspace**: `~/ros2_ws` (no multiple workspaces yet).",
      "**Gazebo Classic (Gazebo 11)** installed and verified.",
      // "**TurtleBot3** classic simulation launches successfully.",
      "Every step includes a **clickable source link** so students know *why* we do it this way.",
    ],
  },

  // 2 — ROS 1 vs ROS 2 (small theory)
  {
    type: "two-col",
    hud: "Concepts",
    title: "ROS 2 Basics",
    left: {
      lead: "Why ROS 2 (and why **Humble**)?",
      bullets: [
        "**ROS 2** uses DDS middleware → better for **multi-robot**, **QoS**, and modern networking concepts.",
        "**Humble** is an **LTS** release → stable target for a course/labs.",
        "We target **Ubuntu 22.04 (Jammy)** because Humble deb packages are built for it.",
        "Official install page: [ROS 2 Humble — Ubuntu (deb packages)](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Ros_logo.svg",
        source: "ROS logo (Wikimedia Commons)",
        sourceHref:
          "https://upload.wikimedia.org/wikipedia/commons/b/bb/Ros_logo.svg",
      },
    },
  },

  // 3 — Gazebo naming clarity (small theory)
  {
    type: "two-col",
    hud: "Simulation",
    title: "Gazebo Names: **Classic** vs **Ignition** vs **Gazebo Sim**",
    left: {
      lead: "Students get confused because the names changed over time.",
      bullets: [
        "**Gazebo Classic** = older Gazebo line (ex: **Gazebo 11**) → what we use for classic TB3 examples.",
        "**Ignition** = older transition name for the newer Gazebo line.",
        "**Gazebo Sim** = modern Gazebo line (often used with `ros_gz`).",
        "Note: Gazebo Classic reached **EOL in Jan 2025** (still runnable for legacy labs).",
        "EOL note (official): [classic.gazebosim.org](https://classic.gazebosim.org/)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://images.seeklogo.com/logo-png/31/1/gazebo-logo-png_seeklogo-317144.png",
        source: "Gazebo logo",
        sourceHref:
          "https://images.seeklogo.com/logo-png/31/1/gazebo-logo-png_seeklogo-317144.png",
      },
    },
  },

  // 4 — STEP 0: system prep
  {
    type: "bullets",
    hud: "Step 0",
    title: "Step 0 — System Prep (Recommended)",
    lead: "Do this once so APT installs are clean.",
    bullets: [
      "Commands:",
      "```bash\nsudo apt update\nsudo apt upgrade -y\n```",
      "Source: [ROS install guide — Ubuntu (deb packages)](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html)",
    ],
  },

  // 5 — STEP 1: Locale
  {
    type: "bullets",
    hud: "Step 1",
    title: "Step 1 — Set Locale (UTF-8)",
    lead: "ROS docs recommend a UTF-8 locale (avoids weird tool behavior).",
    bullets: [
      "Commands:",
      "```bash\nlocale  # check for UTF-8\nsudo apt update && sudo apt install locales\nsudo locale-gen en_US en_US.UTF-8\nsudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8\nexport LANG=en_US.UTF-8\nlocale  # verify\n```",
      "Source: [ROS Humble — Set locale](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html#id2)",
    ],
  },

  // 6 — STEP 2: Setup sources
  {
    type: "bullets",
    hud: "Step 2",
    title: "Step 2 — Setup ROS 2 APT Sources (Official Method)",
    lead: "This configures the ROS 2 repository via **ros2-apt-source** (official docs).",
    bullets: [
      "Commands (Universe repo):",
      "```bash\nsudo apt install software-properties-common\nsudo add-apt-repository universe\n```",
      "Commands (ros2-apt-source):",
      '```bash\nsudo apt update && sudo apt install curl -y\nexport ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F\\" \'{print $4}\')\ncurl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"\nsudo dpkg -i /tmp/ros2-apt-source.deb\n```',
      "Source: [ROS Humble — Setup Sources](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html#setup-sources)",
    ],
    notes:
      "Tell students: this is the official way on Humble docs; it installs keys + repo config and updates automatically when the package updates.",
  },

  // 7 — STEP 3: Install ROS
  {
    type: "bullets",
    hud: "Step 3",
    title: "Step 3 — Install ROS 2 Humble Desktop + Dev Tools",
    lead: "Desktop install includes **RViz + demos** (best for teaching).",
    bullets: [
      "Commands:",
      "```bash\nsudo apt update\nsudo apt upgrade -y\nsudo apt install ros-humble-desktop\nsudo apt install ros-dev-tools\n```",
      "Source: [ROS Humble — Install ROS 2 packages](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html#install-ros-2-packages)",
    ],
  },

  // 8 — STEP 4: Environment setup
  {
    type: "bullets",
    hud: "Step 4",
    title: "Step 4 — Source ROS in Every Terminal",
    lead: "Without this, `ros2` won’t be available in new terminals.",
    bullets: [
      "Commands (current terminal):",
      "```bash\nsource /opt/ros/humble/setup.bash\n```",
      "Optional (auto-source on every terminal):",
      '```bash\necho "source /opt/ros/humble/setup.bash" >> ~/.bashrc\nsource ~/.bashrc\n```',
      "Source: [ROS Humble — Environment setup](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html#environment-setup)",
    ],
  },

  // 9 — Verify with demos
  {
    type: "bullets",
    hud: "Verify",
    title: "Verify ROS 2 Works (Talker / Listener)",
    lead: "This confirms both **C++** and **Python** stacks are working.",
    bullets: [
      "Terminal A:",
      "```bash\nsource /opt/ros/humble/setup.bash\nros2 run demo_nodes_cpp talker\n```",
      "Terminal B:",
      "```bash\nsource /opt/ros/humble/setup.bash\nros2 run demo_nodes_py listener\n```",
      "Quick check (use this instead of `ros2 --version`):",
      "```bash\nprintenv ROS_DISTRO\nwhich ros2\n```",
      "Source: [ROS Humble — Try some examples](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html#try-some-examples)",
    ],
  },

  // 10 — Workspace
  {
    type: "bullets",
    hud: "Workspace",
    title: "Create ONE Workspace: `~/ros2_ws`",
    lead: "Course standard: one workspace only (less confusion).",
    bullets: [
      "Commands:",
      "```bash\nmkdir -p ~/ros2_ws/src\ncd ~/ros2_ws\ncolcon build --symlink-install\nsource ~/ros2_ws/install/setup.bash\n```",
      "**Rule:** source base ROS first, then source the workspace overlay.",
    ],
  },

  {
    type: "bullets",
    hud: "QoL",
    title: "Student `.bashrc` (Part 1): **Auto-source ROS** + simple helpers",
    lead: "Keep it minimal so nothing breaks. We add convenience without magic.",
    bullets: [
      "Edit `.bashrc`: `nano ~/.bashrc`",
      "Add this block at the end:",
      "```bash\n# --- ROS 2 Humble (base) ---\nsource /opt/ros/humble/setup.bash\n\n# quick helpers\nalias eb='nano ~/.bashrc'\nalias sb='source ~/.bashrc'\n```",
      "Reload: `source ~/.bashrc`",
      "Source (official): [ROS Humble — Environment setup](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html#environment-setup)",
    ],
  },

  {
    type: "bullets",
    hud: "QoL",
    title: "Student `.bashrc` (Part 2): **Workspace aliases** + TB3 model",
    lead: "We use **one** workspace: `~/ros2_ws`.",
    bullets: [
      "Add these to `.bashrc` (same block or below):",
      "```bash\n# --- Course workspace ---\nalias ws='cd ~/ros2_ws'\nalias src='cd ~/ros2_ws/src'\nalias cb='cd ~/ros2_ws && colcon build --symlink-install'\n\n# TB3 model for sim\nexport TURTLEBOT3_MODEL=waffle\n```",
      "**Important rule:** after building, you must source the overlay manually:",
      "```bash\nsource ~/ros2_ws/install/setup.bash\n```",
      "Why: overlay changes as you build; students should learn this step.",
    ],
  },

  // 12 — Gazebo Classic install
  {
    type: "bullets",
    hud: "Gazebo",
    title: "Install **Gazebo Classic (11)** + ROS Plugins",
    lead: "This is the classic simulator path we use for legacy TB3 labs.",
    bullets: [
      "Commands:",
      "```bash\nsudo apt update\nsudo apt install gazebo libgazebo-dev\nsudo apt install ros-humble-gazebo-ros-pkgs\n```",
      "Verify:",
      "```bash\nwhich gazebo\ngazebo --version\n```",
      "ROS tutorial page (Gazebo with ROS 2): [docs.ros.org Gazebo tutorials](https://docs.ros.org/en/humble/Tutorials/Advanced/Simulators/Gazebo/Simulation-Gazebo.html)",
    ],
  },

  // 13 — TurtleBot3 classic simulation (source-based, one workspace)
  // {
  //   type: "bullets",
  //   hud: "TB3",
  //   title: "TurtleBot3 Sim (Part 1): **Clone + rosdep**",
  //   lead: "We keep everything inside the same `~/ros2_ws` workspace.",
  //   bullets: [
  //     "Reference: [GazeboSim tutorial using TB3 example](https://gazebosim.org/docs/latest/migrating_gazebo_classic_ros2_packages/)",
  //     "Commands:",
  //     "```bash\nsource /opt/ros/humble/setup.bash\nmkdir -p ~/ros2_ws/src\ncd ~/ros2_ws/src\n\ngit clone -b humble-devel https://github.com/ROBOTIS-GIT/turtlebot3_simulations/\n```",
  //     "Install dependencies (first time only on a machine):",
  //     "```bash\nsudo apt install -y python3-rosdep\nsudo rosdep init\nrosdep update\n```",
  //   ],
  // },

  // {
  //   type: "bullets",
  //   hud: "TB3",
  //   title: "TurtleBot3 Sim (Part 2): **Build + Run (Gazebo Classic)**",
  //   lead: "If this launches, your setup is ready for labs.",
  //   bullets: [
  //     "Install package dependencies + build:",
  //     "```bash\ncd ~/ros2_ws\nrosdep install --from-paths src -i -y\ncolcon build --symlink-install\nsource ~/ros2_ws/install/setup.bash\n```",
  //     "Run Gazebo Classic sim:",
  //     "```bash\nexport TURTLEBOT3_MODEL=waffle\nros2 launch turtlebot3_gazebo empty_world.launch.py\n```",
  //     "Quick checks (optional): `ros2 node list`, `ros2 topic list`",
  //   ],
  // },

  // 14 — Optional: colcon helpers (only if available)
  {
    type: "bullets",
    hud: "QoL",
    title: "Optional: `colcon_cd` + Autocomplete",
    lead: "Add this to your `.bashrc` so these tools work in every new terminal.",
    bullets: [
      // "Open your config: `eb` (or `nano ~/.bashrc`)",
      "```bash\n# --- Colcon Helpers ---\n# colcon_cd: jump to package folders quickly\nif [ -f /usr/share/colcon_cd/function/colcon_cd.sh ]; then\n  source /usr/share/colcon_cd/function/colcon_cd.sh\n  export _colcon_cd_root=/opt/ros/humble/\nfi\n\n# Autocomplete: tab-completion for colcon commands\nif [ -f /usr/share/colcon_argcomplete/hook/colcon-argcomplete.bash ]; then\n  source /usr/share/colcon_argcomplete/hook/colcon-argcomplete.bash\nfi\n```",
      "**Usage:** You can now type `colcon_cd my_package_name` to jump straight to its folder!",
    ],
  },

  // 15 — Uninstall / reset (for “fresh install”)
  {
    type: "bullets",
    hud: "Reset",
    title: "Fresh Start: Uninstall ROS 2 Humble",
    lead: "If your environment gets messy, use these commands to wipe ROS 2 clean.",
    bullets: [
      "**1. Remove ROS packages:**",
      "```bash\nsudo apt remove --purge ros-humble-* -y\nsudo apt autoremove -y\n```",
      "**2. Remove repo config & cleanup:**",
      "```bash\nsudo apt remove ros2-apt-source -y\nsudo apt update\n```",
      "**3. Manual Cleanup:**",
      "Run `eb` (or `nano ~/.bashrc`) and delete the `source` and `export` lines you added.",
      "Source: [ROS Humble — Uninstall](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html#uninstall)",
    ],
  },

  // 16 — Wrap-up cheat sheet
  {
    type: "bullets",
    hud: "Summary",
    title: "Cheat Sheet (What Students Must Remember)",
    lead: "We minimize memorization. These are the only essentials early on:",
    bullets: [
      "**1)** Source ROS: `source /opt/ros/humble/setup.bash`",
      "**2)** Build workspace: `cb` (our alias) or `colcon build --symlink-install`",
      "**3)** Source overlay after build: `source ~/ros2_ws/install/setup.bash`",
      "**4)** Run nodes: `ros2 run ...`",
      // "**5)** Launch sim: `ros2 launch turtlebot3_gazebo empty_world.launch.py`",
      "Main source: [ROS Humble Ubuntu install](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html)",
    ],
  },
];

export default slidesData;
