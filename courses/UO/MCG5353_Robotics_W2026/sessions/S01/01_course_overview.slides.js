export const topicMeta = {
  id: "01_course_overview",
  title: "Robotics Lab - Session 1",
  duration: 110,
  hudDefault: "MCG 5353 - ROBOTICS",
  email: "Ali.Karimzade@uOttawa.ca",
};

function image(id, src, source, alt) {
  return {
    id,
    kind: "image",
    src,
    source,
    alt,
    fit: "contain",
  };
}

function gallery(id, items, source) {
  return {
    id,
    kind: "gallery",
    source,
    items: items.map((item) => ({
      id: item.id,
      src: item.src,
      alt: item.alt,
      fit: item.fit || "contain",
    })),
    fit: "contain",
  };
}

const MEDIA_BASE = "./courses/UO/MCG5353_Robotics_W2026/sessions/S01/media/";

const media = {
  m1_rviz_start: image(
    "m1_rviz_start",
    `${MEDIA_BASE}rviz_start.png`,
    "MoveIt Documentation - MoveIt Quickstart in RViz",
    "Panda robot loaded in RViz with the MotionPlanning plugin",
  ),
  m2_planning_rviz: image(
    "m2_planning_rviz",
    `${MEDIA_BASE}planning.png`,
    "MoveIt Documentation - Visualizing in RViz",
    "Motion plan visualized in RViz",
  ),
  m3_planning_obstacle: image(
    "m3_planning_obstacle",
    `${MEDIA_BASE}planning_around_object.png`,
    "MoveIt Documentation - Planning Around Objects",
    "Manipulator planning around an obstacle",
  ),
  m4_motion_planning_pose_1: image(
    "m4_motion_planning_pose_1",
    `${MEDIA_BASE}motion_planning_api_tutorial_robot_move_arm_1st.png`,
    "MoveIt Documentation - Motion Planning API",
    "Manipulator pose from the MoveIt motion planning API tutorial",
  ),
  m5_motion_planning_pose_2: image(
    "m5_motion_planning_pose_2",
    `${MEDIA_BASE}motion_planning_api_tutorial_robot_move_arm_2nd.png`,
    "MoveIt Documentation - Motion Planning API",
    "Alternative manipulator pose from the MoveIt motion planning API tutorial",
  ),
  m6_setup_assistant: image(
    "m6_setup_assistant",
    `${MEDIA_BASE}setup_assistant_start.png`,
    "MoveIt Documentation - MoveIt Setup Assistant",
    "MoveIt Setup Assistant start screen",
  ),
  m8_virtual_joints: image(
    "m8_virtual_joints",
    `${MEDIA_BASE}setup_assistant_panda_virtual_joints.png`,
    "MoveIt Documentation - MoveIt Setup Assistant",
    "Virtual joints page in the MoveIt Setup Assistant",
  ),
  r1_rqt_graph: image(
    "r1_rqt_graph",
    `${MEDIA_BASE}rqt_graph.png`,
    "ROS 2 Documentation - Understanding topics",
    "rqt_graph showing ROS 2 nodes and topics",
  ),
  r2_rviz_startup: image(
    "r2_rviz_startup",
    `${MEDIA_BASE}initial_startup.png`,
    "ROS 2 Documentation - RViz User Guide",
    "RViz initial startup window",
  ),
  i1_ubuntu_try_install: image(
    "i1_ubuntu_try_install",
    `${MEDIA_BASE}try-or-install-ubuntu.jpeg`,
    "Ubuntu Desktop documentation",
    "Ubuntu installer try or install screen",
  ),
  i2_rufus_usb: image(
    "i2_rufus_usb",
    `${MEDIA_BASE}rufus-detects-usb.png`,
    "Ubuntu Desktop documentation",
    "Rufus detecting a USB device",
  ),
  i3_manual_partitioning: image(
    "i3_manual_partitioning",
    `${MEDIA_BASE}manual-partitioning.png`,
    "Ubuntu Desktop documentation",
    "Ubuntu manual partitioning screen",
  ),
  i4_disk_setup: image(
    "i4_disk_setup",
    `${MEDIA_BASE}disk-setup.jpeg`,
    "Ubuntu Desktop documentation",
    "Ubuntu disk setup page",
  ),
  u1_ubuntu_logo: image(
    "u1_ubuntu_logo",
    `${MEDIA_BASE}ubuntu-logo-2022.svg`,
    "Canonical Ubuntu assets",
    "Ubuntu logo",
  ),
  u2_ros_logo: image(
    "u2_ros_logo",
    `${MEDIA_BASE}ros_logo.svg`,
    "ROS Media and Visual Assets",
    "ROS logo",
  ),
  u3_gazebo_logo: image(
    "u3_gazebo_logo",
    `${MEDIA_BASE}gazebo_logo.svg`,
    "Gazebo media",
    "Gazebo logo",
  ),
};

const softwareStackMedia = gallery(
  "software_stack_logos",
  [
    media.u1_ubuntu_logo,
    media.u2_ros_logo,
    media.u3_gazebo_logo,
  ],
  "Canonical Ubuntu assets; ROS Media and Visual Assets; Gazebo media",
);

const ubuntuRosMedia = gallery(
  "ubuntu_ros_logos",
  [
    media.u1_ubuntu_logo,
    media.u2_ros_logo,
  ],
  "Canonical Ubuntu assets; ROS Media and Visual Assets",
);

function installStep(id, hud, title, bulletTexts, notes) {
  return {
    id,
    type: "bullets",
    hud,
    title,
    bullets: bulletTexts.map((text, index) => ({
      id: `bullet_${index + 1}`,
      text,
    })),
    notes,
  };
}

const ubuntuInstallSlides = [
  {
    id: "installation_paths",
    type: "two-col",
    hud: "Install Path",
    title: "TWO WAYS TO COMPLETE THE INSTALL",
    left: {
      bullets: [
        { id: "bullet_video_path", text: "Option 1: use the video for the general flow" },
        { id: "bullet_slide_path", text: "Option 2: use these slides as the full step-by-step guide" },
        { id: "bullet_course_wins", text: "When the video and course slides differ, follow the course slides" },
        { id: "bullet_screenshots", text: "Screenshots are visual aids; your Ubuntu 22.04 installer may look different" },
      ],
    },
    right: { media: media.i1_ubuntu_try_install },
    notes:
      "Students can either follow the video with the course corrections, or they can use this deck alone. The important point is that Ubuntu 22.04 is the course standard. Current Ubuntu screenshots can still explain the flow, but the exact visual design may not match the 22.04 installer.",
  },
  {
    id: "before_you_start",
    type: "two-col",
    hud: "Before Install",
    title: "BEFORE YOU START",
    left: {
      bullets: [
        { id: "bullet_backup", text: "Backup important files" },
        { id: "bullet_usb_size", text: "Use an 8 GB or larger USB drive" },
        { id: "bullet_download_iso", text: "Download Ubuntu 22.04 LTS Desktop ISO" },
        { id: "bullet_download_rufus", text: "Download Rufus if you are creating the USB from Windows" },
        { id: "bullet_charger", text: "Plug in your charger before starting" },
      ],
    },
    right: { media: media.i2_rufus_usb },
    notes:
      "Before touching partitions, students should back up important files, prepare an 8 GB or larger USB drive, download the Ubuntu 22.04 LTS Desktop ISO, download Rufus on Windows, and plug in the laptop charger.",
  },
  installStep(
    "windows_fast_startup",
    "Windows Prep",
    "WINDOWS STEP 1 - TURN OFF FAST STARTUP",
    [
      "Open Control Panel",
      "Go to Power Options",
      "Click Choose what the power buttons do",
      "Click Change settings that are currently unavailable",
      "Uncheck Turn on fast startup, then save changes",
    ],
    "Fast Startup can leave the Windows filesystem in a state that causes problems for dual boot. Turn it off before shrinking the disk or booting the installer.",
  ),
  installStep(
    "windows_open_disk_management",
    "Windows Prep",
    "WINDOWS STEP 2 - OPEN DISK MANAGEMENT",
    [
      "Right-click the Windows Start button",
      "Click Disk Management",
      "Find your main Windows drive, usually C:",
      "Look at the bottom disk view, not only the top list",
    ],
    "Disk Management is where students create free space for Ubuntu. They should identify the main Windows disk carefully before shrinking anything.",
  ),
  installStep(
    "windows_create_unallocated_space",
    "Windows Prep",
    "WINDOWS STEP 3 - CREATE UNALLOCATED SPACE",
    [
      "Right-click C: and choose Shrink Volume...",
      "Enter the amount to shrink",
      "Recommended range: 60000-120000 MB",
      "Click Shrink",
      "Confirm you now see Unallocated space",
      "Do NOT create a new Windows partition there",
    ],
    "The goal is to create unallocated space for Ubuntu. Students should leave it unallocated. They should not format it in Windows or create a new Windows partition there.",
  ),
  installStep(
    "rufus_plug_usb",
    "USB Installer",
    "RUFUS STEP 1 - PLUG IN USB",
    [
      "Plug in your USB drive",
      "Open Rufus",
      "Confirm the correct Device is selected",
      "Warning: Rufus will erase the selected USB drive",
    ],
    "The most common mistake at this step is selecting the wrong USB device. Students must confirm the device before starting.",
  ),
  installStep(
    "rufus_select_iso",
    "USB Installer",
    "RUFUS STEP 2 - SELECT THE UBUNTU ISO",
    [
      "Click SELECT",
      "Choose the downloaded Ubuntu 22.04 LTS Desktop ISO",
      "Rufus will auto-detect most settings",
      "Do not use a different Ubuntu release for this course",
    ],
    "Students should use Ubuntu 22.04 LTS Desktop, not a newer release and not a server image.",
  ),
  installStep(
    "rufus_partition_scheme",
    "USB Installer",
    "RUFUS STEP 3 - CHOOSE PARTITION SCHEME",
    [
      "For most modern laptops, choose GPT",
      "Target system should be UEFI",
      "Older legacy BIOS systems may need MBR",
      "If you are unsure, most students should choose GPT",
      "Click START and confirm the erase warning",
    ],
    "Most current student laptops use UEFI, so GPT is usually correct. If a student has an older legacy BIOS system, that may be different, but GPT is the default assumption for the course.",
  ),
  installStep(
    "boot_from_usb",
    "Boot Menu",
    "BOOT FROM THE USB DRIVE",
    [
      "Restart the computer with the USB plugged in",
      "Open the boot menu during startup",
      "Common keys: F12, ESC, F9, or F10",
      "Choose the USB device",
      "Prefer the entry that starts with UEFI:",
    ],
    "The exact boot menu key depends on the laptop brand. If students see multiple USB entries, the UEFI entry is usually the right one.",
  ),
  installStep(
    "try_ubuntu_first",
    "Ubuntu Boot",
    "UBUNTU BOOT MENU - TRY FIRST",
    [
      "Choose Try Ubuntu first if available",
      "Check mouse, keyboard, display, and Wi-Fi",
      "Then start Install Ubuntu 22.04 LTS",
      "If the machine behaves strangely, stop and ask before installing",
    ],
    "Trying Ubuntu first gives students a quick hardware check before changing the disk. If Wi-Fi or graphics are badly broken, it is better to notice before installation.",
  ),
  installStep(
    "installer_language_keyboard",
    "Installer",
    "INSTALLER STEP 1 - LANGUAGE AND KEYBOARD",
    [
      "Choose English or your preferred language",
      "Choose the correct keyboard layout",
      "Test the keyboard in the text box",
      "Click Continue",
    ],
    "This is a simple step, but students should test special characters in the keyboard layout because they will need their password and terminal work later.",
  ),
  installStep(
    "installer_updates_third_party",
    "Installer",
    "INSTALLER STEP 2 - UPDATES AND THIRD-PARTY SOFTWARE",
    [
      "Choose Normal installation",
      "Check Download updates while installing Ubuntu",
      "Check Install third-party software if available",
      "This can help graphics and Wi-Fi hardware",
      "Click Continue",
    ],
    "For a robotics laptop, graphics and Wi-Fi matter. The third-party software option can help with hardware support, especially on laptops with proprietary drivers.",
  ),
  installStep(
    "installer_installation_type",
    "Installer",
    "INSTALLER STEP 3 - INSTALLATION TYPE",
    [
      "Read this screen carefully",
      "Best easy path: Install Ubuntu alongside Windows Boot Manager",
      "Manual path: Something else",
      "Do NOT choose Erase disk unless you want to remove Windows",
      "If you are unsure, stop and ask",
    ],
    "This is the screen where a wrong choice can erase Windows. Students should slow down here. Alongside Windows is the easy path if available; Something else gives manual control.",
  ),
  {
    id: "partitioning_recommendation",
    type: "two-col",
    hud: "Partitioning",
    title: "PARTITIONING RECOMMENDATION FOR THIS COURSE",
    left: {
      bullets: [
        { id: "bullet_root_simplest", text: "Simplest acceptable setup: one root partition `/`" },
        { id: "bullet_optional_split", text: "Optional long-term setup: `/` + `/home` + optional swap" },
        { id: "bullet_space_range", text: "If Ubuntu space is 80-120 GB, use roughly:" },
        { id: "bullet_root_size", text: "`/` = 45-60 GB" },
        { id: "bullet_home_remaining", text: "`/home` = the remaining space" },
        { id: "bullet_swap_optional", text: "swap = optional 4-8 GB" },
        { id: "bullet_home_useful", text: "`/home` is useful, but not required for this course" },
      ],
    },
    right: { media: media.i3_manual_partitioning },
    notes:
      "If you reserved around 80 to 120 GB for Ubuntu, my recommendation is to give about 45 to 60 GB to / and give the rest to /home if you want a separate home partition. If you just want one / partition, that is also fully acceptable for this course.",
  },
  installStep(
    "partitioning_find_free_space",
    "Partitioning",
    "MANUAL PARTITIONING - FIND FREE SPACE",
    [
      "Look for Free space in the partition list",
      "This should match the unallocated space made in Windows",
      "Do NOT select Windows partitions",
      "Create Ubuntu partitions only inside the free space",
    ],
    "Manual partitioning is only safe if students can identify the free space they created. Windows partitions should be left alone.",
  ),
  installStep(
    "partitioning_root_only",
    "Partitioning",
    "SIMPLE SETUP - CREATE ROOT PARTITION",
    [
      "Select Free space and click +",
      "Use most or all of the Ubuntu space",
      "Use as: Ext4 journaling file system",
      "Mount point: `/`",
      "This one-partition setup is acceptable for this course",
    ],
    "The simplest acceptable setup is one root partition. It is not the most flexible long-term layout, but it is fully acceptable for this course and avoids unnecessary install complexity.",
  ),
  installStep(
    "partitioning_create_root",
    "Partitioning",
    "OPTIONAL SPLIT SETUP - CREATE `/`",
    [
      "Select Free space and click +",
      "Size: 45-60 GB if you reserved 80-120 GB total",
      "Use as: Ext4 journaling file system",
      "Mount point: `/`",
      "Click OK",
    ],
    "If students want a separate home partition, first create root. For this course, around 45 to 60 GB is a reasonable root size when total Ubuntu space is 80 to 120 GB.",
  ),
  installStep(
    "partitioning_create_home",
    "Partitioning",
    "OPTIONAL SPLIT SETUP - CREATE `/home`",
    [
      "Select remaining Free space and click +",
      "Use most of the remaining space",
      "Use as: Ext4 journaling file system",
      "Mount point: `/home`",
      "Click OK",
    ],
    "A separate home partition is useful because it separates personal files from the root system partition, but it is not required for this course.",
  ),
  installStep(
    "partitioning_swap_optional",
    "Partitioning",
    "OPTIONAL - CREATE SWAP AREA",
    [
      "Swap is extra memory on disk when RAM is full",
      "It is slower than RAM",
      "If you want swap, select remaining free space and click +",
      "Use as: swap area",
      "Common course size: 4-8 GB",
      "Skipping swap is acceptable",
    ],
    "Swap is optional. Students can use a simple root-only setup, or root plus home, without creating a swap partition. Ubuntu can also use a swap file later.",
  ),
  installStep(
    "efi_partition_warning",
    "Partitioning",
    "EFI PARTITION - DO NOT FORMAT WINDOWS EFI",
    [
      "Most Windows UEFI systems already have an EFI System Partition",
      "It is usually a small FAT32 partition",
      "Do not format it",
      "Ubuntu can use the existing EFI partition",
      "Only create a new EFI partition if the disk truly has none",
    ],
    "This is an important warning. On most dual-boot systems, Windows already has an EFI partition. Formatting it can break booting.",
  ),
  installStep(
    "bootloader_location",
    "Partitioning",
    "BOOTLOADER LOCATION",
    [
      "Find Device for boot loader installation",
      "Choose the main disk",
      "Examples: `/dev/nvme0n1` or `/dev/sda`",
      "Do NOT choose a specific partition like `/dev/nvme0n1p5`",
      "Then click Install Now",
    ],
    "The bootloader should go to the main disk, not a specific Ubuntu partition. Device names vary, so students should be careful and ask if unsure.",
  ),
  installStep(
    "confirm_disk_changes",
    "Installer",
    "CONFIRM CHANGES BEFORE WRITING TO DISK",
    [
      "Check that Ubuntu partitions are inside the free space",
      "Check that Windows partitions are untouched",
      "Check that `/` is present",
      "If using `/home`, check that it is present",
      "Click Continue only when the layout is correct",
    ],
    "This is the last checkpoint before the installer writes changes to disk. Students should verify the layout before continuing.",
  ),
  installStep(
    "installer_timezone",
    "Installer",
    "CHOOSE LOCATION AND TIMEZONE",
    [
      "Select your city or timezone",
      "Use the map or search box",
      "Click Continue",
    ],
    "The timezone step is straightforward, but it confirms the installer is now past the dangerous partitioning stage.",
  ),
  installStep(
    "installer_user_account",
    "Installer",
    "CREATE YOUR UBUNTU USER",
    [
      "Enter your name",
      "Enter a computer name",
      "Choose a username",
      "Choose a password you will remember",
      "You will use this password for `sudo` commands",
    ],
    "Students must remember their Ubuntu password. They will need it whenever they install packages or run administrative commands.",
  ),
  installStep(
    "restart_remove_usb",
    "Finish Install",
    "RESTART AND REMOVE THE USB",
    [
      "When prompted, click Restart Now",
      "Remove the USB when the installer asks",
      "If it shuts down first, remove the USB before booting again",
      "You should see a boot menu with Ubuntu and Windows",
    ],
    "After installation, students should remove the USB so the computer boots from the internal disk, not the installer again.",
  ),
  installStep(
    "first_boot_update_system",
    "After Install",
    "AFTER FIRST BOOT - UPDATE UBUNTU",
    [
      "Connect to Wi-Fi",
      "Open Terminal",
      "Run: `sudo apt update`",
      "Run: `sudo apt upgrade -y`",
      "Restart if Ubuntu asks you to restart",
    ],
    "For next session, I do not want to spend the first part of lab waiting for Ubuntu installs to finish. Ubuntu 22.04 must already be installed, booting, updated, and ready.",
  ),
  installStep(
    "optional_driver_check",
    "After Install",
    "OPTIONAL - CHECK DRIVERS",
    [
      "Open Software & Updates",
      "Go to Additional Drivers",
      "Select the recommended driver if one is available",
      "Apply changes",
      "Reboot after driver changes",
    ],
    "This is useful if Wi-Fi or graphics are not working well. Not every machine will show additional drivers, and that is okay.",
  ),
  installStep(
    "must_be_ready_next_session",
    "Next Session",
    "WHAT MUST BE READY FOR NEXT SESSION",
    [
      "Ubuntu 22.04 installed and booting",
      "You can log in",
      "You can connect to Wi-Fi",
      "You can open Terminal",
      "`sudo apt update` has been run",
      "`sudo apt upgrade -y` has been run",
    ],
    "Make the expectation concrete. Next session is not installation day; Ubuntu should already be ready so the class can move into ROS setup and robotics tools.",
  ),
];

const slidesData = [
  {
    id: "title_robotics_lab_session_1",
    type: "title",
    hud: "Robotics Lab",
    title: "ROBOTICS LAB - SESSION 1",
    subtitle: "Simulation-first with Manipulators + ROS 2 + MoveIt | Ubuntu 22.04 + ROS 2 Humble",
    meta: "Ali Karimzadeh | Ali.Karimzade@uOttawa.ca",
    notes:
      "Welcome everyone. This is Session 1 of the robotics lab. The course is simulation-first, and our focus is robot manipulators: robot arms, ROS 2, MoveIt, inverse kinematics, and motion planning. Today I want you to understand what the lab is about, what software stack we will use, and what must be ready before the next session.",
  },
  {
    id: "course_overview_what_changed",
    type: "two-col",
    hud: "Course Overview",
    title: "COURSE OVERVIEW + WHAT CHANGED",
    left: {
      bullets: [
        { id: "bullet_manipulators_not_mobile", text: "This lab is about robot manipulators, not mobile robots" },
        { id: "bullet_simulation_only", text: "We will work completely in simulation" },
        { id: "bullet_robot_arm_dof", text: "We will use 6-DOF and 7-DOF robot arms" },
        { id: "bullet_today_plan", text: "Today: overview, install plan, and ROS 2 big picture" },
      ],
    },
    right: { media: media.m1_rviz_start },
    notes:
      "This is the first framing shift: we are not building a TurtleBot navigation course here. We are using the same strong ROS foundation, but the robot is now a manipulator. That means our central ideas become robot state, frames, inverse kinematics, collision checking, planning scenes, and trajectory planning.",
  },
  {
    id: "why_simulation_for_manipulators",
    type: "two-col",
    hud: "Simulation",
    title: "WHY SIMULATION FOR MANIPULATORS?",
    left: {
      bullets: [
        { id: "bullet_fast_iteration", text: "Faster iteration: test, reset, repeat" },
        { id: "bullet_safer_learning", text: "Safer for learning IK, collisions, and planning" },
        { id: "bullet_debugging", text: "Better for debugging robot state, frames, and trajectories" },
      ],
    },
    right: { media: media.m3_planning_obstacle },
    notes:
      "Manipulator simulation is not just a convenience. It lets us test plans quickly, make mistakes safely, and inspect the system before anything physical is at risk. When you are learning IK, collision checking, and planning, the ability to reset and inspect every state matters a lot.",
  },
  {
    id: "what_you_will_learn",
    type: "two-col",
    hud: "Learning Stack",
    title: "WHAT YOU WILL LEARN",
    left: {
      bullets: [
        { id: "bullet_ros_tools_moveit", text: "ROS 2, RViz2, Gazebo, rqt, and MoveIt" },
        { id: "bullet_urdf_frames", text: "URDF/Xacro, robot frames, and visualization" },
        { id: "bullet_ik_planning", text: "Inverse kinematics and motion planning" },
        { id: "bullet_debug_workflow", text: "How to debug a full manipulator workflow" },
      ],
    },
    right: { media: media.m2_planning_rviz },
    notes:
      "This is the learning stack for the course. The tools are not isolated: URDF gives the robot structure, TF connects frames, RViz2 helps us see the state, MoveIt gives us planning and IK tools, and Gazebo provides simulation. The real goal is that you can debug the whole chain.",
  },
  {
    id: "how_the_lab_will_run",
    type: "two-col",
    hud: "Lab Rhythm",
    title: "HOW THE LAB WILL RUN",
    left: {
      bullets: [
        { id: "bullet_start_install_ros", text: "We start with installation and ROS 2 fundamentals" },
        { id: "bullet_build_to_manipulators", text: "Then we build toward manipulators, IK, and planning" },
        { id: "bullet_final_integration", text: "Most project integration happens in the final sessions" },
        { id: "bullet_start_early", text: "If you wait too long to start, it will be late" },
      ],
    },
    right: { media: media.m4_motion_planning_pose_1 },
    notes:
      "The lab sequence is cumulative. Installation and ROS fundamentals are not separate from the project; they are the foundation for everything later. If you delay setup or skip the early checks, the final sessions become much harder than they need to be.",
  },
  {
    id: "projects_and_workload",
    type: "two-col",
    hud: "Projects",
    title: "PROJECTS AND WORKLOAD",
    left: {
      bullets: [
        { id: "bullet_project_1_guided", text: "Project 1 is a larger guided assignment" },
        { id: "bullet_project_1_two_assignments", text: "Think of Project 1 as the work of two smaller assignments" },
        { id: "bullet_project_2_integration", text: "Project 2 is more like a project: integration and demonstration" },
        { id: "bullet_weekly_progress", text: "The best strategy is steady weekly progress" },
      ],
    },
    right: { media: media.m5_motion_planning_pose_2 },
    notes:
      "Project 1 is guided, but it is not small. It is closer to the work of two smaller assignments. Project 2 is more open-ended and expects integration. The students who do best will not wait for the final sessions; they will build and test every week.",
  },
  {
    id: "software_stack_we_will_use",
    type: "two-col",
    hud: "Software Stack",
    title: "SOFTWARE STACK WE WILL USE",
    left: {
      bullets: [
        { id: "bullet_ubuntu_2204", text: "Ubuntu 22.04 LTS" },
        { id: "bullet_ros_humble", text: "ROS 2 Humble" },
        { id: "bullet_rviz_rqt", text: "RViz2 + rqt" },
        { id: "bullet_gazebo_moveit", text: "Gazebo + MoveIt" },
        { id: "bullet_git_terminal_colcon", text: "Git + terminal + colcon" },
      ],
    },
    right: { media: softwareStackMedia },
    notes:
      "These are the tools we standardize on. The version baseline matters: Ubuntu 22.04, ROS 2 Humble, RViz2, rqt, Gazebo, MoveIt, Git, terminal work, and colcon. Staying consistent avoids unnecessary package and driver problems.",
  },
  {
    id: "laptop_expectations",
    type: "bullets",
    hud: "Laptop",
    title: "LAPTOP EXPECTATIONS",
    bullets: [
      { id: "bullet_16gb_recommended", text: "16 GB RAM is recommended" },
      { id: "bullet_8gb_possible", text: "8 GB RAM can work, but simulation may feel slow" },
      { id: "bullet_storage_free", text: "Aim for 80-120 GB free if possible" },
      { id: "bullet_charger", text: "Bring your charger every lab" },
    ],
    notes:
      "Simulation can be demanding, especially when we run GUI tools and planning components. Sixteen gigabytes of RAM is the comfortable recommendation. Eight can work, but students should expect slower launches and heavier simulation to feel less smooth.",
  },
  {
    id: "why_ubuntu_2204_ros_humble",
    type: "two-col",
    hud: "Version Baseline",
    title: "WHY UBUNTU 22.04 + ROS 2 HUMBLE",
    left: {
      bullets: [
        { id: "bullet_standardized_versions", text: "This course is standardized on Ubuntu 22.04 + ROS 2 Humble" },
        { id: "bullet_use_exact_versions", text: "Use exactly these versions unless I tell you otherwise" },
        { id: "bullet_reduce_package_issues", text: "Consistent versions reduce package and driver problems" },
        { id: "bullet_existing_ubuntu_fine", text: "If you already have Ubuntu 22.04 installed, you are fine" },
      ],
    },
    right: { media: ubuntuRosMedia },
    notes:
      "The version baseline is intentional. ROS 2 Humble is the ROS distribution we will use, and Ubuntu 22.04 is the operating system baseline. Do not install a newer Ubuntu or a different ROS distribution just because a tutorial uses it.",
  },
  {
    id: "ubuntu_install_options",
    type: "two-col",
    hud: "Ubuntu Install",
    title: "UBUNTU INSTALL OPTIONS",
    left: {
      bullets: [
        { id: "bullet_dual_boot_best", text: "Best for this course: dual boot with Ubuntu 22.04" },
        { id: "bullet_vm_light_work", text: "VM is acceptable for light work, but not ideal for heavier simulation" },
        { id: "bullet_ubuntu_only_fine", text: "Ubuntu-only is also fine if you already chose that path" },
        { id: "bullet_follow_guide", text: "Follow the tested course guide instead of improvising" },
      ],
    },
    right: { media: media.i4_disk_setup },
    notes:
      "Dual boot gives the best performance for simulation, which is why it is the best option for this course. A virtual machine can work for lighter command-line practice, but heavier simulation and graphics can become frustrating. Follow the tested course guide instead of mixing random internet steps.",
  },
  {
    id: "use_the_video_but_do_this",
    type: "two-col",
    hud: "Install Guide",
    title: "USE THE VIDEO, BUT DO THIS",
    left: {
      lead: "Video: https://youtu.be/GXxTxBPKecQ?si=bUnOuikwDrJNScA6",
      bullets: [
        { id: "bullet_video_flow", text: "Use the video for the overall flow" },
        { id: "bullet_stay_2204", text: "Stay on Ubuntu 22.04 LTS" },
        { id: "bullet_root_only_ok", text: "The video's simple `/ only` setup is acceptable" },
        { id: "bullet_home_swap_optional", text: "`/home` and swap are optional, not required" },
      ],
    },
    right: { media: media.i1_ubuntu_try_install },
    notes:
      "The video is useful, and I still want you to use it. But for this course, stay on Ubuntu 22.04. Also, if you want the easiest acceptable setup, one root partition is completely fine. A separate /home is optional. Swap is optional. Do not overcomplicate the install if you do not need to.",
  },
  ...ubuntuInstallSlides,
  {
    id: "what_is_ros_2",
    type: "two-col",
    hud: "ROS 2",
    title: "WHAT IS ROS 2?",
    left: {
      bullets: [
        { id: "bullet_middleware", text: "ROS 2 is the middleware and tooling layer for robot systems" },
        { id: "bullet_connects_system", text: "It connects robot state, sensors, planning, and control" },
        { id: "bullet_foundation", text: "We will use it as the foundation for the whole lab" },
      ],
    },
    right: { media: media.r1_rqt_graph },
    notes:
      "ROS 2 is the layer that lets different parts of a robot system communicate and be inspected. For this lab, it is the foundation that connects robot descriptions, state publishers, visualization, planning, and control.",
  },
  {
    id: "ros_2_core_concepts",
    type: "two-col",
    hud: "ROS 2 Concepts",
    title: "ROS 2 CORE CONCEPTS",
    left: {
      bullets: [
        { id: "bullet_nodes_topics_services", text: "You will use nodes, topics, services, actions, and parameters" },
        { id: "bullet_debug_graph_data", text: "Most debugging starts with the graph and the topic data" },
        { id: "bullet_open_rqt_graph", text: "Open rqt_graph early instead of guessing" },
      ],
    },
    right: { media: media.r1_rqt_graph },
    notes:
      "The first ROS debugging habit is to look at the graph. If students cannot see which nodes exist and which topics connect them, they will guess. rqt_graph gives a quick system picture before changing code.",
  },
  {
    id: "packages_workspaces_colcon_launch",
    type: "bullets",
    hud: "ROS 2 Workflow",
    title: "PACKAGES, WORKSPACES, COLCON, AND LAUNCH FILES",
    bullets: [
      { id: "bullet_package", text: "Package = one reusable ROS 2 unit" },
      { id: "bullet_workspace", text: "Workspace = where your packages live" },
      { id: "bullet_colcon", text: "colcon = how we build our workspace" },
      { id: "bullet_launch", text: "launch files = how we start complete systems cleanly" },
    ],
    notes:
      "ROS 2 work is organized around packages inside workspaces. We build with colcon, and we use launch files so that complete systems start consistently instead of relying on several manual terminal commands.",
  },
  {
    id: "rviz2",
    type: "two-col",
    hud: "RViz2",
    title: "RVIZ2",
    left: {
      bullets: [
        { id: "bullet_inspect_state", text: "RViz2 is where you inspect robot state, markers, and trajectories" },
        { id: "bullet_data_correct", text: "It helps you answer: \"Is the data correct?\"" },
        { id: "bullet_robot_behavior", text: "It helps you answer: \"Is the robot doing what I think it is doing?\"" },
      ],
    },
    right: { media: media.r2_rviz_startup },
    notes:
      "RViz2 is not the simulator. It is the visualization and inspection tool. Students should use it to inspect robot state, frames, markers, plans, and trajectories, and to decide whether the data matches what they think the robot is doing.",
  },
  {
    id: "gazebo_for_this_lab",
    type: "two-col",
    hud: "Gazebo",
    title: "GAZEBO FOR THIS LAB",
    left: {
      bullets: [
        { id: "bullet_main_sim", text: "Gazebo is our main simulation environment" },
        { id: "bullet_test_behavior", text: "We will use simulation to test behavior before project integration" },
        { id: "bullet_tested_setup", text: "Follow the tested course guide for the exact Gazebo setup" },
        { id: "bullet_no_random_versions", text: "Do not install random versions because of one blog post" },
      ],
    },
    right: { media: media.u3_gazebo_logo },
    notes:
      "I am saying Gazebo on the slide, not Gazebo Classic. Follow my tested guide for the exact packages. Officially, Humble is paired with Gazebo Fortress, and Gazebo Classic is already end-of-life.",
  },
  {
    id: "robot_description_urdf_xacro_tf",
    type: "two-col",
    hud: "Robot Description",
    title: "ROBOT DESCRIPTION, URDF/XACRO, AND TF",
    left: {
      bullets: [
        { id: "bullet_links_joints_frames", text: "A manipulator starts with links, joints, and frames" },
        { id: "bullet_urdf_structure", text: "URDF describes the robot structure" },
        { id: "bullet_xacro_reusable", text: "Xacro keeps the model clean and reusable" },
        { id: "bullet_tf_frames", text: "TF keeps track of how frames are connected" },
      ],
    },
    right: { media: media.m8_virtual_joints },
    notes:
      "Before planning anything, the robot must be described correctly. Links, joints, and frames define the robot structure. URDF gives the model, Xacro helps keep that model reusable, and TF tells us how all the frames relate while the robot moves.",
  },
  {
    id: "moveit",
    type: "two-col",
    hud: "MoveIt",
    title: "MOVEIT",
    left: {
      bullets: [
        { id: "bullet_manipulation_framework", text: "MoveIt is the manipulation framework we will use" },
        { id: "bullet_ik_planning_scene", text: "It gives us IK, planning scenes, collision checking, and motion planning" },
        { id: "bullet_rviz_projects", text: "We will use it in RViz2 and inside our projects" },
      ],
    },
    right: { media: media.m6_setup_assistant },
    notes:
      "MoveIt is the main manipulation framework for this course. It is where inverse kinematics, planning scenes, collision checking, and motion planning come together. At first we will use it through RViz2; later we will connect it to project code.",
  },
  {
    id: "inverse_kinematics",
    type: "two-col",
    hud: "IK",
    title: "INVERSE KINEMATICS",
    left: {
      bullets: [
        { id: "bullet_ik_question", text: "IK asks: what joint values place the end-effector at a target pose?" },
        { id: "bullet_multiple_solutions", text: "For 6-DOF and 7-DOF arms, more than one valid solution may exist" },
        { id: "bullet_redundancy", text: "In 7-DOF arms, redundancy gives extra freedom" },
        { id: "bullet_debug_ik", text: "We will learn how to use IK and how to debug it" },
      ],
    },
    right: { media: media.m5_motion_planning_pose_2 },
    notes:
      "Inverse kinematics starts with the desired end-effector pose and asks what joint values can reach it. For 6-DOF and 7-DOF arms, the solution may not be unique, and with redundancy we get extra freedom that can be useful or confusing if we do not debug carefully.",
  },
  {
    id: "motion_planning",
    type: "two-col",
    hud: "Planning",
    title: "MOTION PLANNING",
    left: {
      bullets: [
        { id: "bullet_not_only_reach", text: "Motion planning is not only \"reach the goal\"" },
        { id: "bullet_valid_collision_free", text: "It is \"reach the goal with a valid, collision-free trajectory\"" },
        { id: "bullet_planning_scenes", text: "Planning scenes and obstacles matter" },
        { id: "bullet_rviz_to_execution", text: "We will plan in RViz2, then move toward project execution" },
      ],
    },
    right: { media: media.m3_planning_obstacle },
    notes:
      "Planning is more than finding a final pose. The path itself must be valid. It must respect collisions, joint limits, and the planning scene. RViz2 gives us a good first place to see and debug those plans before moving toward project execution.",
  },
  {
    id: "rqt_debugging_workflow",
    type: "two-col",
    hud: "Debugging",
    title: "RQT AND DEBUGGING WORKFLOW",
    left: {
      bullets: [
        { id: "bullet_rqt_graph", text: "Use rqt_graph to inspect the system graph" },
        { id: "bullet_rviz_inspect", text: "Use RViz2 to inspect frames, robot state, and trajectories" },
        { id: "bullet_debug_topics", text: "Debug first: topics" },
        { id: "bullet_debug_tf", text: "Then check: TF" },
        { id: "bullet_debug_model", text: "Then check: model" },
        { id: "bullet_debug_scene", text: "Then check: planning scene" },
        { id: "bullet_graph_before_code", text: "First check the graph before changing code" },
      ],
    },
    right: { media: media.r1_rqt_graph },
    notes:
      "The debugging order matters. Start with topics so you know what data exists. Then check TF, then the model, then the planning scene. If students change code before checking the graph, they often create new problems before they understand the old one.",
  },
  {
    id: "work_outside_class",
    type: "bullets",
    hud: "Work Habits",
    title: "WORK OUTSIDE CLASS",
    bullets: [
      { id: "bullet_six_sessions", text: "We only have about 6 lab sessions" },
      { id: "bullet_home_practice", text: "Some setup and practice must be done at home" },
      { id: "bullet_tested_guide", text: "I will provide a tested step-by-step guide" },
      { id: "bullet_follow_when_assigned", text: "Follow each step when it is assigned, not at the end" },
    ],
    notes:
      "The class time is limited. Some setup and practice has to happen outside class, especially installation and repeated tool practice. The tested guide is there to keep everyone aligned, but it only helps if students follow it when assigned.",
  },
  {
    id: "if_installation_goes_wrong",
    type: "bullets",
    hud: "Install Problems",
    title: "IF INSTALLATION GOES WRONG",
    bullets: [
      { id: "bullet_solve_first", text: "First try to solve machine-specific issues on your own" },
      { id: "bullet_common_blockers", text: "Common blockers: BitLocker, Intel RST/AHCI, Fast Startup, wrong partition choice" },
      { id: "bullet_search_error", text: "Search the exact error before changing random settings" },
      { id: "bullet_email", text: "If you are still stuck, email me: Ali.Karimzade@uOttawa.ca" },
    ],
    notes:
      "Installation problems are often machine-specific. BitLocker, Intel RST or AHCI settings, Fast Startup, and partition choices are common blockers. Students should search the exact error and avoid changing random BIOS or Windows settings without understanding what the change does.",
  },
  {
    id: "final_reminder",
    type: "bullets",
    hud: "Final Reminder",
    title: "FINAL REMINDER",
    bullets: [
      { id: "bullet_next_session_ready", text: "For next session, Ubuntu 22.04 must be ready" },
      { id: "bullet_bring_install", text: "Bring a working install, your charger, and your notes" },
      { id: "bullet_do_not_wait", text: "Do not wait until project time to start putting things together" },
      { id: "bullet_start_early", text: "Start early, test early, and keep up every week" },
    ],
    notes:
      "Close by making the expectation very concrete. Next session is not installation day. Ubuntu 22.04 should be installed, booting, updated, and ready, and students should bring their charger and notes. The habit is start early, test early, and keep up every week.",
  },
];

export default slidesData;
