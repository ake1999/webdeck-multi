// courses/UOttawa/MCG5138_AMR_W2026/sessions/SXX/01_ros2_basics_pubsub.slides.js
// ROS 2 Basics — Setup → Workspace → Packages → Nodes → ROS Graph → Comms → Talker/Listener

export const topicMeta = {
  id: "01_ros2_basics_pubsub",
  title: "ROS 2 Basics: Workspace, Packages, Nodes, and Communication",
  duration: 75,
};

const slidesData = [
  // 0 — TITLE
  {
    type: "title",
    hud: "ROS 2 Basics",
    title: "ROS 2 Basics: **Nodes + Communication**",
    subtitle:
      "Setup • Workspace • Packages • ROS Graph • Topics/Services/Actions • Talker/Listener",
    meta: "UOttawa Mobile Robotics • Instructor: Ali Karimzadeh",
    notes:
      "Outcome: students can create a workspace, create a package, understand node/graph/communication, build and run a Python talker/listener, and inspect with ROS CLI.",
  },

  // 1 — ROS 2 in 60 seconds
  {
    type: "bullets",
    hud: "Big Picture",
    title: "ROS 2 in **60 seconds**",
    lead: "ROS 2 helps you build robot software as many small programs that communicate.",
    bullets: [
      "**Node** = a running program (a process).",
      "**Interfaces** = message definitions (msg/srv/action).",
      "**Communication** = Topics / Services / Actions.",
      "ROS tools help you **see the graph** and debug logically.",
      "Docs hub: [ROS 2 Humble Docs](https://docs.ros.org/en/humble/index.html)",
    ],
  },

  // 2 — Setup (minimal, no debugging)
  {
    type: "bullets",
    hud: "Setup",
    title: "Terminal Setup: the **must-do** steps",
    lead: "Every new terminal must know ROS 2 paths (we call this “sourcing”).",
    bullets: [
      "Source ROS 2 (Humble):",
      "```bash\nsource /opt/ros/humble/setup.bash\n```",
      "Quick check:",
      "```bash\nprintenv ROS_DISTRO\nwhich ros2\nros2 node list\n```",
      "Source: [Configuring ROS 2 Environment](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Configuring-ROS2-Environment.html)",
    ],
    notes:
      "Say: If ROS_DISTRO prints humble and which ros2 points to /opt/ros/humble/bin/ros2, we're good.",
  },

  // 3 — Workspace (one slide)
  {
    type: "bullets",
    hud: "Workspace",
    title: "Create **one** workspace: `~/ros2_ws`",
    lead: "Workspace = where you create packages and build them with `colcon`.",
    bullets: [
      "Create folders:",
      "```bash\nmkdir -p ~/ros2_ws/src\n```",
      "Build (even empty, creates install/):",
      "```bash\ncd ~/ros2_ws\ncolcon build --symlink-install\n```",
      "Source overlay (your workspace):",
      "```bash\nsource ~/ros2_ws/install/setup.bash\n```",
      "Source: [Creating a workspace](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html)",
    ],
    notes: "One sentence: /opt/ros is the base (underlay), your ws is overlay.",
  },

  // 4 — What is a package
  {
    type: "bullets",
    hud: "Packages",
    title: "What is a **package**?",
    lead: "Package = the build + share unit in ROS (code + metadata + dependencies).",
    bullets: [
      "A package contains: code, `package.xml`, `setup.py` (Python) or CMake files.",
      "ROS finds executables through the package install + entry points.",
      "We use **Python packages** today: `ament_python` + `rclpy`.",
      "Official: [Creating a package](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html)",
    ],
    notes:
      "Emphasize: package != node. Package is folder/build unit; node is running process.",
  },

  // 5 — Create a Python package (short)
  {
    type: "bullets",
    hud: "Packages",
    title: "Create our class package: `ros_basics`",
    lead: "This package will contain our **talker** and **listener** nodes.",
    bullets: [
      "Commands:",
      "```bash\ncd ~/ros2_ws/src\nros2 pkg create --build-type ament_python ros_basics --dependencies rclpy std_msgs\n```",
      "Check it exists:",
      "```bash\nls ~/ros2_ws/src\n```",
      "Docs: [ros2 pkg create](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Working-with-ROS2-Packages.html)",
    ],
    notes:
      "Explain: std_msgs gives us String message type. rclpy is the python client library.",
  },

  // 6 — Package structure (expanded but still slide-safe)
  {
    type: "bullets",
    hud: "Structure",
    title: "Package structure (where code goes)",
    lead: "Python nodes go inside the inner module folder: `ros_basics/ros_basics/`",
    bullets: [
      "Go to the package root (this folder contains metadata + build files):",
      "```bash\ncd ~/ros2_ws/src/ros_basics\nls\n```",
      "**`package.xml`** → package metadata + **dependencies** (ROS uses this to know what you need).",
      "**`setup.py`** → Python install + **entry points** (`ros2 run ...` comes from here).",
      "**`resource/ros_basics`** → small marker file so ROS can discover the package name (ament indexing).",
      "**`ros_basics/` (inner folder)** → the **Python module**; put your nodes here (`talker.py`, `listener.py`).",
      "**`ros_basics/__init__.py`** → makes the folder a Python package (enables `import ros_basics`).",
      "(Sometimes) **`launch/`** → launch files (we will use later, not today).",
      "(Sometimes) **`config/`** → YAML configs (parameters, tuning values).",
    ],
    notes:
      "Quick rule: package root = build/metadata; inner ros_basics/ folder = Python code. If talker/listener imports fail, they usually placed files in the wrong folder or missed __init__.py.",
  },

  // 7 — Node definition
  {
    type: "bullets",
    hud: "Nodes",
    title: "What is a **node**?",
    lead: "Node = a running process that performs one job and communicates.",
    bullets: [
      "Examples: `camera_node`, `lidar_driver`, `nav2_controller`, `talker`.",
      "A node usually has: **publishers**, **subscriptions**, timers, services, actions.",
      "ROS tools can list nodes and show what they publish/subscribe.",
      "CLI: [Understanding nodes](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html)",
    ],
    notes:
      "Say: 'You build systems by connecting nodes, not by writing one huge program.'",
  },

  // 8 — Quiz: package vs node
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: Package vs Node",
    question: "Which statement is correct?",
    options: [
      {
        choice: "A",
        label: "**Package** is a running process; **node** is a folder.",
      },
      {
        choice: "B",
        label:
          "**Node** is a running process; **package** is the build/share folder unit.",
      },
      { choice: "C", label: "Package and node mean the same thing in ROS 2." },
      {
        choice: "D",
        label: "Node is only for C++; packages are only for Python.",
      },
    ],
    correct: "B",
    explain: "A node is runtime. A package is the build/share unit on disk.",
  },

  // 9 — ROS graph visual (rqt_graph)
  {
    type: "two-col",
    hud: "ROS Graph",
    title: "The **ROS Graph** (visual map of your system)",
    left: {
      bullets: [
        "The ROS graph shows **nodes** and how they connect.",
        "`rqt_graph` draws pub/sub connections (very useful in labs).",
        "We use it to answer: “Who publishes this topic?”",
        "Docs: [Understanding Topics (rqt_graph)](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://docs.ros.org/en/humble/_images/rqt_graph.png",
        source: "ROS 2 docs (rqt_graph.png)",
        sourceHref:
          "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html",
      },
    },
    notes:
      "Explain quickly: circles are nodes; rectangles are topics. Arrows show direction.",
  },

  // 10 — Communication overview (more explanation)
  {
    type: "bullets",
    hud: "Communication",
    title: "Communication types (how nodes talk)",
    lead: "In ROS 2, nodes communicate through **interfaces** (msg/srv/action).",
    bullets: [
      "**Topics** → data stream (publish/subscribe).",
      "**Services** → quick request/response (call-and-reply).",
      "**Actions** → long task (goal + feedback + result + cancel).",
      "Rule of thumb: **stream → topic**, **ask → service**, **long task → action**.",
      "Docs: [Topics, Services, Actions](https://docs.ros.org/en/humble/How-To-Guides/Topics-Services-Actions.html)",
    ],
  },

  // 11 — Topics explanation (deeper, but short)
  {
    type: "bullets",
    hud: "Topics",
    title: "**Topics** (Pub/Sub) — what you must know",
    lead: "Topics are the most common communication type in robotics.",
    bullets: [
      "Publisher sends messages to a named channel like `/chatter` or `/cmd_vel`.",
      "Subscribers receive messages **whenever they arrive** (callbacks).",
      "Publishers and subscribers do **not** need to know each other directly.",
      "**Message type must match** (example: `std_msgs/msg/String`).",
      "Docs: [Understanding Topics](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html)",
    ],
    notes:
      "Explain queue depth=10 in one line: it buffers recent messages if subscriber is slower.",
  },

  // 12 — Topics gif
  {
    type: "two-col",
    hud: "Topics",
    title: "**Topics** = Publish/Subscribe (data stream)",
    left: {
      bullets: [
        "**Many-to-many** (many publishers and subscribers can exist).",
        "Best for continuous data: sensors, state, velocity commands.",
        "CLI tools you’ll use:",
        "```bash\nros2 topic list\nros2 topic echo /chatter\nros2 topic info /chatter\n```",
        "Source: [Understanding topics](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://docs.ros.org/en/humble/_images/Topic-SinglePublisherandSingleSubscriber.gif",
        source: "ROS 2 docs (Topic pub/sub gif)",
        sourceHref:
          "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html",
      },
    },
    notes:
      "Explain: publisher sends messages, subscribers receive. No direct 'reply'.",
  },

  // 13 — Services explanation (more explanation)
  {
    type: "bullets",
    hud: "Services",
    title: "**Services** — when and why",
    lead: "Services are for quick “ask and get an answer” tasks.",
    bullets: [
      "Client sends a request → server replies with a response.",
      "Best when you need a **single result** now (not a stream).",
      "Common examples: reset, clear costmap, trigger something once.",
      "CLI examples:",
      "```bash\nros2 service list\nros2 service type /clear\n```",
      "Docs: [Understanding Services](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html)",
    ],
  },

  // 13b — Services gif (shorter)
  {
    type: "two-col",
    hud: "Services",
    title: "**Services** = Request/Response (call-and-reply)",
    left: {
      bullets: [
        "Client sends a **request**, server returns a **response**.",
        "Use when you need an answer **now** (fast).",
        "CLI tools:",
        "```bash\nros2 service list\nros2 service type /clear\nros2 interface show std_srvs/srv/Empty\n```",
        "Source: [Understanding services](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://docs.ros.org/en/humble/_images/Service-SingleServiceClient.gif",
        source: "ROS 2 docs (Service request/response gif)",
        sourceHref:
          "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html",
      },
    },
    notes: "Key sentence: services are not for continuous streaming.",
  },

  // 14 — Actions explanation (more explanation)
  {
    type: "bullets",
    hud: "Actions",
    title: "**Actions** — when and why",
    lead: "Actions are for tasks that take time and need feedback/cancel.",
    bullets: [
      "Client sends a **goal** → server sends **feedback** → final **result**.",
      "Actions can be **canceled** (important for robots).",
      "Common examples: navigation goal, docking, long manipulation tasks.",
      "Docs: [Understanding Actions](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html)",
    ],
  },

  // 14b — Actions gif (shorter)
  {
    type: "two-col",
    hud: "Actions",
    title: "**Actions** = Goal + Feedback + Result (+ Cancel)",
    left: {
      bullets: [
        "For **long-running** tasks (seconds/minutes).",
        "Client sends a **goal** → server sends **feedback** → final **result**.",
        "Actions are **cancelable**.",
        "Source: [Understanding actions](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://docs.ros.org/en/humble/_images/Action-SingleActionClient.gif",
        source: "ROS 2 docs (Action goal/feedback/result gif)",
        sourceHref:
          "https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html",
      },
    },
    notes: "Example: 'Navigate to this pose' is an action in Nav2.",
  },

  {
    type: "bullets",
    hud: "Interfaces",
    title: "ROS 2 **Interfaces** (Msg / Srv / Action)",
    lead: "Interfaces are the **data contracts** that define what is sent between nodes.",
    bullets: [
      "**Message (`.msg`)** → used by **Topics** (one-way stream). It defines the fields inside each message.",
      "**Service (`.srv`)** → used by **Services** (request/response). It has **Request** fields and **Response** fields.",
      "**Action (`.action`)** → used by **Actions** (goal/feedback/result). It defines **Goal**, **Result**, and **Feedback**.",
      "You can inspect any interface on your system with these CLI commands:",
      "```bash\nros2 interface list\nros2 interface show std_msgs/msg/String\nros2 interface show example_interfaces/srv/AddTwoInts\nros2 interface show example_interfaces/action/Fibonacci\n```",
      "**Key idea:** the interface file defines **what data exists** (types + field names) — your node code only **fills/reads** those fields.",
      "Docs: [Understanding interfaces](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Interfaces/Understanding-ROS2-Interfaces.html)",
    ],
    notes:
      "Explain: This is like a 'struct' or 'schema'. If publisher and subscriber don't use the same message type, they can't talk. Show String has a single field 'data'.",
  },

  // 15 — Comms quiz
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: Pick the right communication",
    question:
      "You want to continuously publish wheel velocities at 20 Hz. What should you use?",
    options: [
      { choice: "A", label: "Topic" },
      { choice: "B", label: "Service" },
      { choice: "C", label: "Action" },
      { choice: "D", label: "Parameter" },
    ],
    correct: "A",
    explain: "Continuous streaming data → Topic (pub/sub).",
  },

  // 16 — Talker/Listener plan
  {
    type: "bullets",
    hud: "Exercise",
    title: "Exercise: **Talker + Listener** (Python pub/sub)",
    lead: "We will create two nodes inside our `ros_basics` package.",
    bullets: [
      "**talker** publishes String messages on topic `chatter`.",
      "**listener** subscribes to `chatter` and prints received messages.",
      "We will then inspect the graph with `ros2 node` and `ros2 topic`.",
      "Official tutorial (full version): [Py Publisher/Subscriber](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html)",
    ],
  },

  // 17 — Create node files (step-by-step)
  {
    type: "bullets",
    hud: "Files",
    title: "Step 1 — Create the node files",
    lead: "Create files inside: `~/ros2_ws/src/ros_basics/ros_basics/`",
    bullets: [
      "Commands:",
      "```bash\ncd ~/ros2_ws/src/ros_basics\nls\n```",
      "Create files:",
      "```bash\ntouch ros_basics/talker.py\ntouch ros_basics/listener.py\n```",
      "Open for editing:",
      "```bash\nnano ros_basics/talker.py\n```",
    ],
    notes:
      "Tell students: use nano or VSCode; just make sure file path is correct.",
  },

  // 18 — Talker code (Part 1: imports + class skeleton)
  {
    type: "bullets",
    hud: "Code",
    title: "Step 2 — `talker.py` (Part 1: imports + node class)",
    lead: "This is the minimum skeleton: imports + Node class.",
    bullets: [
      "Paste this into `talker.py`:",
      "```python\nimport rclpy\nfrom rclpy.node import Node\nfrom std_msgs.msg import String\n\nclass Talker(Node):\n    pass\n```",
      "**Why these lines?** `rclpy` = ROS2 Python; `Node` = base class; `String` = message type.",
    ],
  },

  // 19 — Talker code (Part 2: __init__)
  {
    type: "bullets",
    hud: "Code",
    title: "`talker.py` (Part 2: `__init__` = publisher + timer)",
    lead: "In `__init__`, we create a publisher and a timer callback.",
    bullets: [
      "Replace `pass` with:",
      "```python\n    def __init__(self):\n        super().__init__('talker')\n        self.pub = self.create_publisher(String, 'chatter', 10)\n        self.timer = self.create_timer(0.5, self.on_timer)\n        self.i = 0\n```",
      "**Explanation:** `'talker'` = node name • `'chatter'` = topic • `10` = queue depth • `0.5s` = 2 Hz timer.",
    ],
    notes:
      "Say: queue depth is not 'speed'; it’s buffering if subscriber is slow.",
  },

  // 20 — Talker code (Part 3: timer callback)
  {
    type: "bullets",
    hud: "Code",
    title: "`talker.py` (Part 3: publish in timer callback)",
    lead: "Every timer tick → create msg → publish → log.",
    bullets: [
      "Add this method under `__init__`:",
      "```python\n    def on_timer(self):\n        msg = String()\n        msg.data = f'Hello ROS2 {self.i}'\n        self.pub.publish(msg)\n        self.get_logger().info(f'Publishing: \"{msg.data}\"')\n        self.i += 1\n```",
      "**Key line:** `self.pub.publish(msg)` sends the message on `chatter`.",
    ],
  },

  // 21 — Talker code (Part 4: main + spin)
  {
    type: "bullets",
    hud: "Code",
    title: "`talker.py` (Part 4: `main()` + `spin()`)",
    lead: "`spin()` keeps the node alive and processes callbacks (timers/subscriptions).",
    bullets: [
      "Add at the bottom of file:",
      "```python\ndef main():\n    rclpy.init()\n    node = Talker()\n    rclpy.spin(node)\n    node.destroy_node()\n    rclpy.shutdown()\n\nif __name__ == '__main__':\n    main()\n```",
      "**Why spin?** Without spin, the program would exit immediately.",
    ],
  },

  // 22 — Listener code (Part 1)
  {
    type: "bullets",
    hud: "Code",
    title: "Step 3 — `listener.py` (Part 1: imports + class)",
    lead: "Subscriber node skeleton.",
    bullets: [
      "Open file:",
      "```bash\nnano ros_basics/listener.py\n```",
      "Paste:",
      "```python\nimport rclpy\nfrom rclpy.node import Node\nfrom std_msgs.msg import String\n\nclass Listener(Node):\n    pass\n```",
      "**Same imports** as talker because we use same message type.",
    ],
  },

  // 23 — Listener code (Part 2: subscription + callback + main)
  {
    type: "bullets",
    hud: "Code",
    title: "`listener.py` (Part 2: subscribe + callback)",
    lead: "Subscription calls your callback each time a message arrives.",
    bullets: [
      "Replace `pass`:",
      "```python\n    def __init__(self):\n        super().__init__('listener')\n        self.sub = self.create_subscription(\n            String, 'chatter', self.cb, 10\n        )\n\n    def cb(self, msg: String):\n        self.get_logger().info(f'I heard: \"{msg.data}\"')\n```",
      "**Important:** topic name `'chatter'` must match talker.",
    ],
  },

  // 23 — Listener code (Part 3: subscription + callback + main)
  {
    type: "bullets",
    hud: "Code",
    title: "`listener.py` (Part 3: main)",
    lead: "Subscription calls your callback each time a message arrives.",
    bullets: [
      "add main:",
      "```python\ndef main():\n    rclpy.init()\n    node = Listener()\n    rclpy.spin(node)\n    node.destroy_node()\n    rclpy.shutdown()\n\nif __name__ == '__main__':\n    main()\n```",
    ],
  },

  // 24 — setup.py entry points (short)
  {
    type: "bullets",
    hud: "Build",
    title: "Step 4 — Register executables in `setup.py`",
    lead: "This makes `ros2 run ros_basics talker` work.",
    bullets: [
      "Open `setup.py`:",
      "```bash\nnano ~/ros2_ws/src/ros_basics/setup.py\n```",
      "Find `entry_points` and set:",
      "```python\nentry_points={\n  'console_scripts': [\n    'talker = ros_basics.talker:main',\n    'listener = ros_basics.listener:main',\n  ],\n},\n```",
      "Format: `name = package.module:function`",
    ],
    notes:
      "If it can’t import ros_basics.talker, they placed talker.py in wrong directory.",
  },

  // 25 — Build + source (short)
  {
    type: "bullets",
    hud: "Build",
    title: "Step 5 — Build + source your workspace",
    lead: "After adding code, you must build and source again.",
    bullets: [
      "Commands:",
      "```bash\ncd ~/ros2_ws\ncolcon build --symlink-install\nsource install/setup.bash\n```",
      "Why `--symlink-install`? Edits to Python update faster during development.",
    ],
  },

  // 26 — Run nodes (2 terminals)
  {
    type: "bullets",
    hud: "Run",
    title: "Step 6 — Run (2 terminals)",
    lead: "Terminal A: listener first. Terminal B: talker.",
    bullets: [
      "Terminal A:",
      "```bash\nsource /opt/ros/humble/setup.bash\nsource ~/ros2_ws/install/setup.bash\nros2 run ros_basics listener\n```",
      "Terminal B:",
      "```bash\nsource /opt/ros/humble/setup.bash\nsource ~/ros2_ws/install/setup.bash\nros2 run ros_basics talker\n```",
    ],
  },

  // 27 — Inspect graph and topics (short + useful)
  {
    type: "bullets",
    hud: "Inspect",
    title: "Step 7 — Inspect with ROS CLI (what’s happening?)",
    lead: "These commands confirm the system is connected correctly.",
    bullets: [
      "List nodes and topics:",
      "```bash\nros2 node list\nros2 topic list\n```",
      "Check topic details:",
      "```bash\nros2 topic info /chatter\nros2 topic echo /chatter\n```",
      "Optional graph GUI:",
      "```bash\nrqt_graph\n```",
    ],
    notes: "Say: ros2 topic echo is the fastest ‘sanity check’ for topics.",
  },

  // 28 — Quiz: QoS depth meaning (small but important)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Quiz: What does the `10` mean?",
    question:
      "In `create_publisher(..., 10)` or `create_subscription(..., 10)`, the `10` is best described as…",
    options: [
      { choice: "A", label: "The topic publishing frequency (10 Hz)" },
      { choice: "B", label: "A queue depth (buffer size) for recent messages" },
      { choice: "C", label: "The message size limit (10 bytes)" },
      { choice: "D", label: "The number of nodes allowed to subscribe" },
    ],
    correct: "B",
    explain:
      "It is the QoS history depth (queue size), not the publishing rate.",
  },

  // (Optional) Git — Slide 1 (SHORT)
  {
    type: "bullets",
    hud: "Optional: Git",
    title: "Optional: Save your work with **Git** (local)",
    lead: "Make a **repo folder in `src/`** and put your packages inside.",
    bullets: [
      "Create repo folder:",
      "```bash\nmkdir -p ~/ros2_ws/src/my_ros_repo\ncd ~/ros2_ws/src/my_ros_repo\n```",
      "Create packages inside it:",
      "```bash\nros2 pkg create --build-type ament_python ros_basics --dependencies rclpy std_msgs\n```",
      "Initialize Git + first commit:",
      '```bash\ngit init\ngit add .\ngit commit -m "Initial commit"\n```',
    ],
  },

  // (Optional) Git — Slide 2
  {
    type: "bullets",
    hud: "Optional: GitHub",
    title: "Optional: Push to **GitHub** (submission link)",
    lead: "If you submit a GitHub link, the repo should include your package + a short README.",
    bullets: [
      "Create a new repo on GitHub (website) → copy the repo URL.",
      "Add remote and push (HTTPS example):",
      "```bash\ngit remote add origin https://github.com/<user>/<repo>.git\ngit branch -M main\ngit push -u origin main\n```",
      "If you update later:",
      '```bash\ngit add .\ngit commit -m "Update"\ngit push\n```',
      "Source: [GitHub — Adding a remote](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories) • [GitHub — Push commits](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository)",
    ],
    notes: "Mention: they can also submit a ZIP if they don't want GitHub.",
  },

  {
    type: "bullets",
    hud: "Assignment",
    title: "Assignment: **ROS 2 Action** (Goal → Feedback → Result)",
    lead: "For your final project you must send goal positions, so next session you will practice Actions.",
    bullets: [
      "**Task:** Build a **simple Action Server + Action Client**.",
      "**Behavior required:**",
      "• Client sends a goal with **x, y, z-orientation** (any random values).",
      '• Server immediately responds: **"Got it"** (goal accepted).',
      '• After **5 seconds** → publish feedback: **"Halfway there"**.',
      '• After another **5 seconds** → send result: **"Reached goal"**.',
      "**Submission:**",
      "• A **short video** showing it working on your computer.",
      "• Submit **either** a ZIP of the package **or** a **GitHub repository link**.",
      "Helpful links: [Understanding Actions](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html) • [Writing an Action Server/Client (Python)](https://docs.ros.org/en/humble/Tutorials/Intermediate/Writing-an-Action-Server-Client/Py.html)",
    ],
    notes:
      "Tell them: No robot motion needed. Just implement the action timing + prints. Keep it clean and simple. Show both terminals in the video.",
  },

  // 29 — Wrap-up + what we mention but don’t dive into
  {
    type: "bullets",
    hud: "Summary",
    title: "Wrap-up + Next Topics",
    lead: "Today you learned the **core mental model** of ROS 2.",
    bullets: [
      "✅ Workspace + package creation",
      "✅ Node vs package vs ROS graph",
      "✅ Topics / Services / Actions (what to use when)",
      "✅ Python pub/sub talker + listener built and running",
      "**Next topics (we will teach next):**",
      "• **TF2 + TF Tree** (frames like `map → odom → base_link`)",
      "• **URDF** (robot description used by RViz, TF, simulation)",
      "• **Actions Assignment** (needed for final projects to send goal positions)",
      "Preview links: [TF2 intro](https://docs.ros.org/en/humble/Tutorials/Intermediate/Tf2/Introduction-To-Tf2.html) • [URDF](https://docs.ros.org/en/humble/Tutorials/Intermediate/URDF/URDF-Main.html) • [Actions](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html)",
    ],
    notes:
      "Say: TF2 explains how robots understand position/frames. URDF describes robot model. Actions are how we send goals (like navigation).",
  },
];

export default slidesData;
