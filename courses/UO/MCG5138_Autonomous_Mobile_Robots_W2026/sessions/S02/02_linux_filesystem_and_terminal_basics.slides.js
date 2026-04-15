// courses/UOttawa/MobileRobotics_ROS/sessions/S01/02_linux_filesystem_and_terminal_basics.slides.js
// Separate deck: file system + commands + small quizzes (action-level).

export const topicMeta = {
  id: "02_linux_filesystem_and_terminal_basics",
  title: "Linux File System + Terminal Basics (for ROS)",
  duration: 35,
};

const slidesData = [
  // 0 — TITLE
  {
    type: "title",
    hud: "Linux Basics",
    title: "Linux File System + Terminal Basics",
    subtitle: "The minimum commands you need to be productive in ROS",
    meta: "UOttawa Mobile Robotics • Instructor: Ali Karimzadeh",
  },

  // 1 — THE 3 PATHS YOU MUST KNOW
  {
    type: "bullets",
    hud: "File System",
    title: "Three paths you must know",
    bullets: [
      "**/** = root (top of the whole system)",
      "**/home/<user>** = your personal files and projects",
      "**~** = shortcut for your home folder",
      "Typical ROS workspace location: **~/ros2_ws**",
    ],
  },

  // 2 — COMMON SYSTEM FOLDERS (SHORT)
  {
    type: "bullets",
    hud: "File System",
    title: "Common folders you will see",
    bullets: [
      "**/bin**: basic system commands",
      "**/etc**: configuration files",
      "**/usr**: most programs and libraries",
      "**/opt**: optional installs (sometimes large tools)",
      "**/var/log**: logs (good for debugging)",
      "**/media**: USB drives usually appear here",
    ],
  },

  // 3 — TERMINAL HABITS (SAVE TIME)
  {
    type: "bullets",
    hud: "Terminal",
    title: "Terminal habits that save time",
    bullets: [
      "**Tab** = auto-complete (use it constantly)",
      "**↑ / ↓** = command history",
      "**man <cmd>** = manual (example: **man cd**) — note: cd is a shell builtin",
      "**<cmd> --help** = quick help (example: **ls --help**)",
    ],
  },

  // 4 — NAVIGATION (ACTION SLIDE)
  {
    type: "bullets",
    hud: "Commands",
    title: "Navigation (do these now)",
    bullets: [
      "**pwd** → show current folder",
      "**ls** → list files",
      "**cd <folder>** → enter a folder",
      "**cd ..** → go up one folder",
      "**cd ~** → go home",
    ],
  },

  // 5 — FILES & FOLDERS (ACTION SLIDE)
  {
    type: "bullets",
    hud: "Commands",
    title: "Files & folders (do these now)",
    bullets: [
      "**mkdir lab1** → create a folder",
      "**touch hello.txt** → create a file",
      "**cp hello.txt copy.txt** → copy a file",
      "**mv copy.txt lab1/** → move into folder",
      "**rm hello.txt** → delete a file (careful)",
      "**rm -r lab1/** → delete a folder (very careful)",
    ],
  },

  // 6 — VIEW FILE CONTENT (VERY USEFUL)
  {
    type: "bullets",
    hud: "Commands",
    title: "Viewing text files (useful in ROS)",
    bullets: [
      "**cat file.txt** → print the whole file",
      "**less file.txt** → scroll through a file (q to quit)",
      "**head file.txt** → first lines",
      "**tail file.txt** → last lines",
    ],
  },

  // 7 — INSTALLING SOFTWARE (APT)
  {
    type: "bullets",
    hud: "Commands",
    title: "Installing software with apt (Ubuntu)",
    bullets: [
      "**sudo apt update** → refresh package list",
      "**sudo apt upgrade -y** → upgrade installed packages",
      "**sudo apt install <pkg>** → install a package",
      "Example: **sudo apt install tree** then run **tree**",
    ],
  },

  // 8 — NETWORKING (ROS NEEDS IT)
  {
    type: "bullets",
    hud: "Commands",
    title: "Networking basics (ROS uses networking)",
    bullets: [
      "**ping google.com** → check internet (Ctrl+C to stop)",
      "**ip a** → see IP address and interfaces",
      "**ssh user@ip** → connect to another machine (RPi/robot)",
    ],
  },

  // 9 — EDITING FILES (SIMPLE)
  {
    type: "bullets",
    hud: "Commands",
    title: "Editing files quickly",
    bullets: [
      "**nano file.txt** → simple terminal editor (Ctrl+O save, Ctrl+X exit)",
      "**gedit file.txt** → graphical editor (if desktop available)",
    ],
  },

  // 10 — MINI PRACTICE (2–3 MIN)
  {
    type: "bullets",
    hud: "Practice",
    title: "Mini practice (do it now)",
    bullets: [
      "1) **cd ~**",
      "2) **mkdir ros_practice**",
      "3) **cd ros_practice**",
      "4) **touch notes.txt**",
      "5) **ls**",
      "6) **nano notes.txt** (write 1 line, save, exit)",
      "7) **cat notes.txt**",
    ],
  },

  // 11 — QUIZ 1
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quick quiz #1",
    question: "What does **~** mean in Linux?",
    options: [
      { choice: "A", label: "The root folder /" },
      { choice: "B", label: "Your home folder (/home/username)" },
      { choice: "C", label: "A USB drive folder" },
      { choice: "D", label: "The Downloads folder only" },
    ],
    correct: "B",
    explain: "**~** is a shortcut for your home directory.",
  },

  // 12 — QUIZ 2
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quick quiz #2",
    question: "Which command shows your current folder?",
    options: [
      { choice: "A", label: "ls" },
      { choice: "B", label: "pwd" },
      { choice: "C", label: "mkdir" },
      { choice: "D", label: "rm" },
    ],
    correct: "B",
    explain: "**pwd** prints the current working directory.",
  },

  // 13 — QUIZ 3
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quick quiz #3",
    question: "Which command installs a package on Ubuntu?",
    options: [
      { choice: "A", label: "sudo apt install <pkg>" },
      { choice: "B", label: "sudo rm install <pkg>" },
      { choice: "C", label: "sudo cd install <pkg>" },
      { choice: "D", label: "sudo ls install <pkg>" },
    ],
    correct: "A",
    explain: "**sudo apt install <pkg>** installs a package using Ubuntu’s package manager.",
  },

  // 14 — WRAP UP
  {
    type: "bullets",
    hud: "Wrap-up",
    title: "Ready for ROS",
    bullets: [
      "Know: **/**, **/home**, **~**",
      "Use: **cd, ls, pwd, mkdir, touch, cp, mv, rm**",
      "Update/install with: **sudo apt update**, **sudo apt install**",
      "Next: ROS 2 Humble install + first nodes",
    ],
  },
];

export default slidesData;

