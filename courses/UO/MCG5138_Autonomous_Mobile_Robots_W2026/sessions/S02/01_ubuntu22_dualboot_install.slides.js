// courses/UOttawa/MobileRobotics_ROS/sessions/S01/01_ubuntu22_dualboot_install.slides.js

export const topicMeta = {
  id: "01_ubuntu22_dualboot_install",
  title: "Ubuntu 22.04 Dual-Boot Installation (Windows)",
  duration: 60,
};

const slidesData = [
  // -4 — TITLE
  {
    type: "title",
    hud: "Ubuntu Install",
    title: "Ubuntu 22.04 Dual Boot (Windows)",
    subtitle: "Step-by-step installation for ROS (we do it together in class)",
    meta: "UOttawa Mobile Robotics • Instructor: Ali Karimzadeh",
    notes:
      "Follow the steps exactly. Stop and ask if anything looks different.",
  },

  // -3 — INSTALL OPTIONS (SHORT)
  {
    type: "bullets",
    hud: "Install Options",
    title: "Ubuntu install options (3 choices)",
    bullets: [
      "**Dual boot**: Windows + Ubuntu on the same machine (best performance for sim)",
      "**Virtual Machine (VM)**: Ubuntu inside Windows/macOS (lowest risk, but slower for Gazebo)",
      "**Replace OS**: Ubuntu only (only if you’re sure you want it)",
    ],
  },

  // -2 — WHAT WE DO IN CLASS + REVERSIBLE IDEA
  {
    type: "bullets",
    hud: "Class Choice",
    title: "What we do in class (and why)",
    bullets: [
      "In class we focus on **dual boot** because ROS + Gazebo runs better",
      "VM is OK for learning commands, but can be slow for simulation",
      "Dual boot is **reversible**: Ubuntu can be removed later (general idea)",
    ],
  },

  // -1 — HOW REMOVAL WORKS (GENERAL, SAFE)
  {
    type: "bullets",
    hud: "Reversible",
    title: "If you want Windows-only later (general idea)",
    bullets: [
      "Ubuntu is installed in its own partitions (in the free space you created)",
      "To remove Ubuntu later: boot Windows → delete Ubuntu partitions → extend Windows partition",
      "Then set Windows Boot Manager as first boot option (BIOS/UEFI)",
      "If the boot menu remains, we handle it as a class/support step (don’t panic)",
    ],
  },

  // 1 — BEFORE WE START (WHAT YOU NEED)
  {
    type: "bullets",
    hud: "Prep",
    title: "Before we start (checklist)",
    bullets: [
      "Laptop plugged in (charger connected)",
      "USB flash drive **8 GB+** (empty if possible)",
      "Download **Ubuntu 22.04 LTS Desktop ISO**",
      "Download **Rufus** (Windows) to make bootable USB",
      "Backup important files (just in case)",
    ],
  },

  // 2 — WINDOWS STEP 1: TURN OFF FAST STARTUP (RECOMMENDED)
  {
    type: "bullets",
    hud: "Windows",
    title: "Windows: turn off Fast Startup (recommended)",
    bullets: [
      "Open **Control Panel** → **Power Options**",
      "Click **Choose what the power buttons do**",
      "Click **Change settings that are currently unavailable**",
      "Uncheck **Turn on fast startup** → Save changes",
    ],
  },

  // 3 — WINDOWS STEP 2: OPEN DISK MANAGEMENT
  {
    type: "bullets",
    hud: "Windows",
    title: "Windows: open Disk Management",
    bullets: [
      "Right-click **Start** button",
      "Click **Disk Management**",
      "Find your main Windows drive (usually **C:**) in the bottom view",
    ],
  },

  // 4 — WINDOWS STEP 3: CREATE UNALLOCATED SPACE (SAFE WAY)
  {
    type: "bullets",
    hud: "Windows",
    title: "Windows: create **Unallocated space** (do this carefully)",
    bullets: [
      "Right-click **(C:)** → choose **Shrink Volume…**",
      "Enter how much to shrink (suggestion: **60000–120000 MB** = 60–120 GB)",
      "Click **Shrink**",
      "Confirm you now see **Unallocated** space (black bar) on the disk",
      "Do **NOT** create a new Windows partition there — leave it Unallocated",
    ],
  },

  // 5 — WINDOWS STEP 4: DOWNLOAD RUFUS + PLUG IN USB
  {
    type: "bullets",
    hud: "USB",
    title: "Make a bootable USB (Rufus) — 준비",
    bullets: [
      "Plug in your USB drive",
      "Open **Rufus**",
      "In Rufus: confirm the correct **Device** (your USB) is selected",
    ],
  },

  // 6 — RUFUS STEP 1: SELECT ISO
  {
    type: "bullets",
    hud: "USB",
    title: "Rufus: select Ubuntu ISO",
    bullets: [
      "Click **SELECT**",
      "Choose your downloaded **Ubuntu 22.04 ISO** file",
      "Rufus will auto-detect settings (we will confirm them next)",
    ],
  },

  // 7 — RUFUS STEP 2: PARTITION SCHEME (MOST IMPORTANT)
  {
    type: "bullets",
    hud: "USB",
    title: "Rufus: choose partition scheme (important)",
    bullets: [
      "If your PC uses **UEFI** (most modern laptops): choose **GPT**",
      "If your PC is older and uses **Legacy BIOS**: choose **MBR**",
      "If you are unsure: choose **GPT** (most students will use GPT/UEFI)",
      "Click **START** → confirm erase warning",
    ],
  },

  // 8 — REBOOT INTO USB (BOOT MENU)
  {
    type: "bullets",
    hud: "Boot",
    title: "Boot from the USB drive",
    bullets: [
      "Restart your computer (USB plugged in)",
      "Open Boot Menu key during startup (common keys: **F12 / ESC / F9 / F10**)",
      "Choose the USB device (often shows as **UEFI: <USB name>**)",
      "You should see the Ubuntu boot screen",
    ],
  },

  // 9 — UBUNTU MENU: TRY VS INSTALL
  {
    type: "bullets",
    hud: "Ubuntu",
    title: "Ubuntu boot menu: choose correctly",
    bullets: [
      "Select **Try Ubuntu** first (recommended)",
      "Once desktop loads, confirm: mouse/keyboard/Wi-Fi work",
      "Then click **Install Ubuntu 22.04 LTS** on the desktop",
    ],
  },

  // 10 — INSTALL STEP 1: LANGUAGE + KEYBOARD
  {
    type: "bullets",
    hud: "Install",
    title: "Installer: language & keyboard",
    bullets: [
      "Choose **English** (or preferred language)",
      "Choose **Keyboard layout** (test in the box)",
      "Click **Continue**",
    ],
  },

  // 11 — INSTALL STEP 2: UPDATES + THIRD-PARTY SOFTWARE
  {
    type: "bullets",
    hud: "Install",
    title: "Installer: updates & third-party software",
    bullets: [
      "Choose **Normal installation**",
      "Check: **Download updates while installing Ubuntu**",
      "Check: **Install third-party software for graphics and Wi-Fi hardware**",
      "Click **Continue**",
    ],
  },

  // 12 — INSTALL STEP 3: INSTALLATION TYPE (THE KEY SCREEN)
  {
    type: "bullets",
    hud: "Install",
    title: "Installer: Installation type (DO NOT pick the wrong one)",
    bullets: [
      "If you see **Install Ubuntu alongside Windows Boot Manager** → you can select it (easy option)",
      "If you want full control (recommended in class): choose **Something else**",
      "Click **Continue**",
    ],
  },

  // 13 — PARTITIONING: FIND THE UNALLOCATED SPACE
  {
    type: "bullets",
    hud: "Partitions",
    title: "Partitioning: find the free space",
    bullets: [
      "In the partition list, look for **Free space** (Unallocated)",
      "Make sure you are NOT selecting Windows partitions",
      "We will create Ubuntu partitions ONLY inside the free space",
    ],
  },

  // 14 — PARTITIONING: CREATE ROOT ( / )
  {
    type: "bullets",
    hud: "Partitions",
    title: "Create the Ubuntu **root** partition ( / )",
    bullets: [
      "Select **Free space** → click **+**",
      "Size: at least **25 GB** (recommend **40–60 GB** if possible)",
      "Type: **Primary**",
      "Location: **Beginning of this space**",
      "Use as: **Ext4 journaling file system**",
      "Mount point: **/**",
      "Click **OK**",
    ],
  },

  // 15 — PARTITIONING: CREATE HOME ( /home )
  {
    type: "bullets",
    hud: "Partitions",
    title: "Create **/home** partition (recommended)",
    bullets: [
      "Select remaining **Free space** → click **+**",
      "Size: use most of the remaining space (leave swap if you want swap)",
      "Use as: **Ext4 journaling file system**",
      "Mount point: **/home**",
      "Click **OK**",
    ],
  },

  // 16 — PARTITIONING: SWAP (OPTIONAL)
  {
    type: "bullets",
    hud: "Partitions",
    title: "Swap area (optional)",
    bullets: [
      "Swap is extra memory on disk when RAM is full (slower than RAM)",
      "If you want swap: select remaining free space → **+**",
      "Use as: **swap area**",
      "Common size: **2–8 GB** (or similar to RAM if you want hibernation)",
      "If you skip swap, Ubuntu can still work (swap file can be used later)",
    ],
  },

  // 17 — PARTITIONING: EFI (IMPORTANT WARNING)
  {
    type: "bullets",
    hud: "Partitions",
    title: "EFI partition (do NOT create a new one if Windows already has it)",
    bullets: [
      "Most Windows UEFI systems already have an **EFI System Partition (ESP)**",
      "If you see a small **FAT32** partition labeled EFI/ESP → keep it (do not format it)",
      "Ubuntu will use the existing EFI partition automatically",
      "Only create EFI if the installer warns you and your disk truly has none",
    ],
  },

  // 18 — DEVICE FOR BOOTLOADER INSTALLATION
  {
    type: "bullets",
    hud: "Partitions",
    title: "Bootloader location (important)",
    bullets: [
      "At the bottom: **Device for boot loader installation**",
      "Choose the main disk (example: **/dev/nvme0n1** or **/dev/sda**)",
      "Do NOT choose a specific partition like /dev/nvme0n1p5",
      "Then click **Install Now**",
    ],
  },

  // 19 — CONFIRM CHANGES
  {
    type: "bullets",
    hud: "Install",
    title: "Confirm changes (last check before writing to disk)",
    bullets: [
      "Confirm Ubuntu partitions are created in **free space** (Ext4 / and /home)",
      "Confirm Windows partitions are untouched",
      "Click **Continue** to begin installation",
    ],
  },

  // 20 — TIMEZONE
  {
    type: "bullets",
    hud: "Install",
    title: "Choose location / timezone",
    bullets: [
      "Select your city/timezone (or click on the map)",
      "Click **Continue**",
    ],
  },

  // 21 — USER ACCOUNT
  {
    type: "bullets",
    hud: "Install",
    title: "Create your Ubuntu user",
    bullets: [
      "Enter name, computer name, username, and password",
      "Choose a password you won’t forget (you’ll use it for installs)",
      "Click **Continue** and wait for installation to finish",
    ],
  },

  // 22 — RESTART + REMOVE USB
  {
    type: "bullets",
    hud: "Finish",
    title: "Restart and boot into Ubuntu",
    bullets: [
      "When prompted: click **Restart Now**",
      "Remove USB when it asks (or after shutdown)",
      "You should see a boot menu where you can choose Ubuntu or Windows",
    ],
  },

  // 23 — FIRST BOOT: UPDATE SYSTEM
  {
    type: "bullets",
    hud: "After Install",
    title: "After first boot: update Ubuntu (do this before ROS)",
    bullets: [
      "Connect to Wi-Fi",
      "Open **Terminal** and run:",
      "sudo apt update",
      "sudo apt upgrade -y",
      "Restart if it asks for it",
    ],
  },

  // 24 — OPTIONAL DRIVER CHECK
  {
    type: "bullets",
    hud: "After Install",
    title: "Optional: drivers (if graphics/Wi-Fi issues)",
    bullets: [
      "Open **Software & Updates** → **Additional Drivers**",
      "Select the recommended driver (if available)",
      "Apply changes and reboot",
    ],
  },
];

export default slidesData;
