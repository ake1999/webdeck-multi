export const topicMeta = {
  id: "01_mobile_robotics_lab_intro_and_expectations",
  title: "Mobile Robotics Lab Introduction & Expectations",
  duration: 45
};

const slidesData = [
  // 1) Title
  {
    type: "title",
    hud: "Mobile Robotics Lab",
    title: "Mobile Robotics Lab — Session 1",
    subtitle: "Simulation-first with TurtleBot3 + Gazebo + ROS 2",
    meta: "University of Ottawa • Lab Orientation + Roadmap",
    notes:
      "Welcome everyone. Today is our kickoff session for the Mobile Robotics Lab. I’ll explain how the lab runs, what we’ll build by the end of the term, the software stack we’ll use, and exactly what you should do this week to get set up. The goal is that you leave today knowing what success looks like and how to get there step by step.",
  },

  // 2) Course overview
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Course overview + how the lab will run",
    left: {
      bullets: [
        "Simulation-first workflow using TurtleBot3 + Gazebo",
        "What you’ll build by the end: SLAM + Navigation + obstacle avoidance",
        "Project-heavy grading (you win by keeping up weekly)",
        "How to succeed: follow labs, practice every week, and document your work",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/tb3_and_gazebo.png" alt="TurtleBot3 + Gazebo screenshot" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: TurtleBot3 photo + Gazebo world screenshot (replace this file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Here’s the big picture. This lab is simulation-first, which means we’ll build and test most of our robotics pipeline inside Gazebo using TurtleBot3. By the end, you should be able to create a map with SLAM, localize, navigate to goals, and handle dynamic obstacles. The project is a big part of your grade, so the best strategy is steady weekly progress. If you follow the lab instructions and practice consistently, the final project becomes very doable.",
  },

  // 3) Why mobile robotics
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Why Mobile Robotics?",
    left: {
      bullets: [
        "Real robots are uncertain: noise, drift, delays, imperfect sensors",
        "We need software architecture to integrate sensing → planning → control",
        "Key skills you’ll gain: debugging, systems thinking, reproducible experiments",
        "Industry relevance: warehouse, delivery, inspection, and service robots",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <video src="./media/mobile_robots_montage.mp4" class="fit-contain" controls muted></video>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: 20–30s montage video of mobile robots (replace this file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Mobile robotics is hard because reality is messy. Wheels slip, sensors are noisy, timing is imperfect, and your robot never behaves exactly like a clean equation. That’s why we focus on architecture: how you connect sensing to planning and planning to control in a reliable way. If you can debug a ROS system, understand your data, and run reproducible experiments, you have skills that directly transfer to real industry applications like warehouses, delivery fleets, and inspection robots.",
  },

  // 4) Delivery model
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Course Delivery Model (Mostly Simulation)",
    left: {
      bullets: [
        "~90% simulation in Gazebo for repeatability + speed",
        "Real robot demo during the term (compare sim vs real)",
        "Same concepts apply in both: TF, sensors, SLAM, navigation",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/sim_vs_real_split.png" alt="Gazebo simulation vs real TurtleBot3" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: Split image “Gazebo sim” vs “real TurtleBot3” (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "We’ll do most work in simulation because it’s faster and repeatable. If something breaks, we can reset instantly. If we want to test a scenario, we can reproduce it. During the term, we’ll also demo the real robot so you can see the gap between sim and reality. The important part is that the core concepts—TF frames, sensor streams, SLAM, and navigation—are the same in both worlds.",
  },

  // 5) Software stack
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Software Stack We Will Use",
    left: {
      bullets: [
        "Ubuntu 22.04 LTS (recommended standard for this course)",
        "ROS 2 (Humble recommended on 22.04)",
        "Gazebo for physics + sensors simulation",
        "RViz2 for visualization + debugging",
        "Extra tools: Git, VS Code, terminal basics",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/stack_diagram.png" alt="Software stack diagram" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: Ubuntu → ROS 2 → Gazebo/RViz → Robot diagram (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "This is the toolchain we’ll standardize on. Ubuntu 22.04 gives us a stable environment for ROS 2 Humble. Gazebo is our simulation engine, and RViz2 is our visualization and debugging tool. Git is how you’ll manage your code and collaborate. VS Code is optional, but it makes development smoother. If your environment matches the course standard, troubleshooting becomes much easier—for you and for me.",
  },

  // 6) Laptop requirements
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Hardware / Laptop Requirements",
    left: {
      bullets: [
        "CPU: modern i5/Ryzen 5 or better (4+ cores recommended)",
        "RAM: 16 GB recommended (8 GB minimum but may struggle)",
        "Storage: 30–50 GB free for Ubuntu + ROS + packages",
        "GPU: optional but helpful (Gazebo can be heavy)",
        "Reliable internet for setup + packages",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/requirements_checklist.png" alt="CPU RAM Disk checklist" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: simple checklist graphic “CPU / RAM / Disk” (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Gazebo and RViz can be demanding, especially when you add SLAM and navigation. If you have 16GB RAM and a decent CPU, you’ll be fine. With 8GB, you might still manage, but expect slower performance and more frustration. Make sure you have enough disk space—ROS installations and simulation assets add up. If you run into performance issues, tell me early so we can adjust your workflow before it becomes a blocker.",
  },

  // 7) Ubuntu overview
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Ubuntu: What It Is (and Why We Use It)",
    left: {
      bullets: [
        "Ubuntu = a Linux distribution (Linux kernel + Ubuntu tools)",
        "Most robotics tools are best supported on Linux",
        "Strong package ecosystem + developer tooling",
        "You’ll learn: terminal, packages, permissions, networking basics",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/ubuntu_terminal.png" alt="Ubuntu logo and terminal screenshot" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: Ubuntu logo + terminal screenshot (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Ubuntu is basically the standard environment for ROS development. You can think of it as a Linux operating system distribution that makes installing and managing developer tools straightforward. Most robotics packages are tested and documented for Ubuntu first, which means fewer surprises. The ‘side benefit’ is you’ll get comfortable with the terminal and the basics of how a real robotics development environment works.",
  },

  // 8) Dual boot plan
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Dual Boot Plan (Windows + Ubuntu)",
    left: {
      bullets: [
        "Recommended approach: Dual boot (keep Windows, add Ubuntu)",
        "Safer than replacing Windows; more stable than many VM setups",
        "Common pitfalls: disk space, secure boot, boot order",
        "We’ll follow a step-by-step lab guide to reduce risk",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/dual_boot_diagram.png" alt="Windows partition and Ubuntu partition diagram" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: partition diagram (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "For most of you, dual boot is the best balance: you keep Windows, and you add Ubuntu for robotics. It’s typically more stable than relying on a VM, especially for Gazebo performance. The common mistakes are not allocating enough disk space, getting stuck with secure boot settings, or messing up boot order. That’s why we’ll follow a very structured guide and a checklist. Don’t rush this—do it carefully.",
  },

  // 9) Setup roadmap
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Setup Roadmap (What You’ll Install First)",
    left: {
      bullets: [
        "Step 1: Ubuntu 22.04 + updates",
        "Step 2: ROS 2 (Humble recommended) + developer tools",
        "Step 3: Gazebo + TurtleBot3 simulation packages",
        "Step 4: RViz2 + Nav2/SLAM dependencies",
        "Step 5: Verify with a “hello robot” simulation run",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/setup_timeline.png" alt="Setup timeline" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: timeline graphic (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "This is the order that prevents headaches. First Ubuntu and system updates. Then ROS 2 plus development tools. Then Gazebo and the TurtleBot3 simulation packages. Finally RViz2 plus navigation and SLAM dependencies. And the most important step: verification. If you can run the ‘hello robot’ simulation successfully, you’re ready for the labs. If you skip verification, you’ll waste time later.",
  },

  // 10) What is ROS 2
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "What Is ROS 2? (Big Picture)",
    left: {
      bullets: [
        "ROS 2 = robotics framework + tools + conventions",
        "Think of it as the “glue” between sensors, algorithms, and actuators",
        "Provides communication, packaging, launch, logging, visualization tools",
        "ROS 2 uses middleware (DDS) to communicate between programs",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/ros_graph.png" alt="ROS nodes and topics diagram" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: ROS graph diagram (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "ROS 2 is not just a library—it’s a whole ecosystem. It gives you patterns and tools for building robot software as a set of communicating modules. Sensors produce data, planning consumes that data, control sends commands, and visualization helps you debug everything. Under the hood, ROS 2 uses DDS middleware so different programs can communicate reliably. Once you understand ROS 2 concepts, you can work on many different robots, not just TurtleBot3.",
  },

  // 11) Middleware details
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "ROS 2 as Middleware (Why It Matters)",
    left: {
      bullets: [
        "Middleware lets modules communicate without tight coupling",
        "Benefits: modularity, reuse, scalability, easier debugging",
        "Communication types: Topics, Services, Actions",
        "Note: mixing ROS 2 distributions is not guaranteed/supported",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/pubsub_diagram.png" alt="Publish/subscribe diagram" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: publish/subscribe diagram or animation (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Middleware is basically the communication backbone. Instead of writing one huge program, we write smaller modules that talk to each other. That’s why ROS systems scale and why debugging becomes realistic: you can inspect topics, services, and actions independently. Also, a key rule: don’t mix ROS distributions casually. If we standardize on Humble, stick to Humble unless the course explicitly tells you otherwise.",
  },

  // 12) Core concepts
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "ROS 2 Core Concepts",
    left: {
      bullets: [
        "Node: a running program (controller, SLAM, navigation)",
        "Topic: continuous data (laser scans, velocity commands)",
        "Service: quick request/response (reset, get map)",
        "Action: goals with feedback (navigate to pose)",
        "Parameters: configuration at runtime",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/ros_concepts.png" alt="Node, topic, service, action diagram" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: concept diagram (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "These five terms show up all semester. A node is a process. Topics are streams, like sensor data coming in continuously. Services are quick request/response calls. Actions are for longer tasks with feedback—navigation is the classic example. Parameters let you tune behavior without rewriting code. If you understand these, you can read most ROS documentation and make progress fast.",
  },

  // 13) Packages/workspaces/colcon
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Packages, Workspaces, and colcon",
    left: {
      bullets: [
        "Package = reusable ROS module (code + config + launch)",
        "Workspace = your development folder (src/build/install)",
        "Build tool: colcon",
        "You will learn: create packages, build, source, run nodes",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/workspace_tree.png" alt="ROS2 workspace folder tree" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: screenshot of workspace folder structure (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "In ROS, your work is organized as packages. A workspace is where those packages live and where you build them. Colcon is the build tool that compiles and installs everything. A very common mistake is forgetting to ‘source’ your workspace after building—when that happens ROS can’t find your packages. We’ll practice the workflow until it becomes automatic.",
  },

  // 14) Launch files
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Launch Files (How We Start Systems)",
    left: {
      bullets: [
        "Robots are systems, not single programs",
        "Launch starts multiple nodes + parameters + remappings",
        "Repeatability: one command runs everything",
        "You’ll write/modify launch files for SLAM + navigation stacks",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/launch_graph.png" alt="Launch system graph" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: example launch system diagram (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Launch files are how we move from ‘I can run a node’ to ‘I can run a robot system.’ In one launch, you might start Gazebo, spawn the robot, start SLAM, start navigation, and open RViz. Launch files also make your experiments repeatable. If your project can be started with one command and works reliably, your demo becomes much easier.",
  },

  // 15) RViz2
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "RViz2 (Your Debugging Superpower)",
    left: {
      bullets: [
        "Visualizes robot model, TF frames, laser scans, maps, planned paths",
        "Answers: “Is my sensor data correct?”",
        "Answers: “Is the robot localized?”",
        "You’ll use RViz every lab",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/rviz_screenshot.png" alt="RViz2 screenshot" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: RViz2 screenshot with map + robot + laser (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "If I had to pick one tool that makes or breaks your success, it’s RViz. RViz lets you see what your robot ‘thinks’ is happening—frames, sensor data, maps, and plans. When something is wrong, don’t guess—look in RViz. We will build the habit of using RViz as our first debugging step.",
  },

  // 16) Gazebo
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Gazebo (Simulation Engine)",
    left: {
      bullets: [
        "Simulates physics, collisions, sensors (LiDAR, camera), robot motion",
        "Fast iteration: test ideas safely + repeatedly",
        "Main lab environment for this course",
        "ROS ↔ Gazebo integration via ROS/Gazebo packages/bridges",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <video src="./media/tb3_in_gazebo.mp4" class="fit-contain" controls muted></video>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: short video of TB3 driving in Gazebo (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Gazebo is our physics-based simulator. It gives us collisions, realistic-ish sensor streams, and repeatability. We’ll use it to test SLAM and navigation without risking hardware damage. Later, when you see the real robot, you’ll recognize the same topics and concepts—just with more noise and more real-world surprises.",
  },

  // 17) TB3 intro
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "TurtleBot3 in Simulation (What We Use)",
    left: {
      bullets: [
        "TurtleBot3 = common learning platform for mobile robotics",
        "Differential-drive base + typical sensors (LiDAR, IMU, odometry)",
        "Course uses a consistent simulation setup for everyone",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/tb3_model_callouts.png" alt="TurtleBot3 model with sensor callouts" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: TB3 model image + sensor callouts (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "TurtleBot3 is used worldwide to teach mobile robotics because it has the right complexity: not too simple, not too advanced. It’s differential drive, so you’ll see real odometry drift. It has the sensor streams we need for SLAM and navigation. The key for our course is consistency—if everyone uses the same setup, we can help each other and debug faster.",
  },

  // 18) Dependencies reality check
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "TurtleBot3 Simulation Dependencies (Reality Check)",
    left: {
      bullets: [
        "You’ll install Gazebo + SLAM + navigation dependencies",
        "ROS↔Gazebo integration details matter (versions + packages)",
        "We will use a course-approved install guide to stay aligned",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/tb3_docs_header.png" alt="TurtleBot3 documentation header screenshot" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: screenshot of TurtleBot3 e-Manual header (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "A quick reality check: the hardest part early on is dependency alignment. TurtleBot3 has official documentation, but it can vary by ROS distribution and Gazebo version. That’s why we will follow the course-approved guide to keep everyone synchronized. When we debug issues, the first question is always: are you on the correct versions and did you follow the standard steps?",
  },

  // 19) Diff-drive basics
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Differential Drive Basics (Robot Motion)",
    left: {
      bullets: [
        "Two driven wheels + caster(s)",
        "Control via linear velocity v and angular velocity ω",
        "Turning is created by wheel speed difference",
        "Odometry drift is normal → motivates SLAM/localization",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/diff_drive_kinematics.png" alt="Differential drive kinematics diagram" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: kinematics diagram with v and ω arrows (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Differential drive means the robot moves because of the left and right wheel speeds. In ROS you often command it using a linear velocity and an angular velocity. The important lesson: odometry will drift, even in simulation. That drift is exactly why we need SLAM or localization—without it, your robot’s belief about its position slowly becomes wrong.",
  },

  // 20) URDF/Xacro
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Robot Description (URDF / Xacro)",
    left: {
      bullets: [
        "URDF describes links + joints (robot structure)",
        "Xacro = templated URDF (cleaner, reusable)",
        "Needed for RViz visualization, TF frame definitions, simulation integration",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/urdf_tree.png" alt="URDF tree diagram" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: robot model render + URDF tree (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "URDF is how ROS understands the robot’s physical structure. RViz uses it to draw the robot. TF uses it to relate frames. Simulation uses it to connect joints and sensors. Xacro is just a convenient way to write URDF with parameters and reusable parts. Even if you don’t write URDF from scratch, you need to understand it enough to diagnose frame and model issues.",
  },

  // 21) TF / TF2
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "TF / TF2 (Coordinate Frames)",
    left: {
      bullets: [
        "Robots have many frames: map, odom, base_link, laser, camera…",
        "TF tracks transformations over time",
        "If TF is wrong → maps, navigation, and sensors look wrong",
        "You will learn to inspect TF trees",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/tf_tree.png" alt="TF tree screenshot" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: TF tree screenshot (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "TF is one of the most important concepts in mobile robotics. Everything depends on knowing where things are relative to each other: the robot base, sensors, the map, and odometry. When TF is broken, you’ll see symptoms like a laser scan floating away, a map rotating strangely, or navigation failing. We will learn how to inspect TF trees and diagnose frame problems early.",
  },

  // 22) Sensors streams
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Sensors & Data Streams",
    left: {
      bullets: [
        "Typical simulated streams: /scan, /odom, /imu, /cmd_vel",
        "Noise and drift exist in sim (and more in real robots)",
        "You’ll learn: visualize, sanity-check, and debug sensor topics",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/scan_points.png" alt="Laser scan points in RViz" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: RViz scan visualization (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "A robot is basically a set of topics. The LiDAR publishes /scan. Odometry publishes /odom. The IMU publishes /imu. And navigation or teleop publishes /cmd_vel. Your job is to build the habit of checking these streams. If something fails, the fastest path is: check topics, check TF, check RViz visuals, and only then start changing parameters or code.",
  },

  // 23) SLAM
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "SLAM: What Problem Are We Solving?",
    left: {
      bullets: [
        "SLAM = Simultaneous Localization and Mapping",
        "Robot builds a map while estimating its pose",
        "Outputs: occupancy grid map + pose estimate",
        "Essential for navigation in unknown environments",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <video src="./media/slam_map_growing.mp4" class="fit-contain" controls muted></video>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: animation of map growing while robot drives (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "SLAM is the moment where mobile robotics feels ‘real.’ The robot moves through an environment, collects sensor data, and builds a map while also estimating where it is. That’s a hard coupled problem. In this course, you’ll use an existing SLAM package, but you’ll learn what inputs it needs, what outputs it produces, and how to debug issues like bad alignment, drifting maps, or incomplete coverage.",
  },

  // 24) Occupancy grid
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Occupancy Grid Maps (Grid Maps)",
    left: {
      bullets: [
        "Map represented as cells: free / occupied / unknown",
        "Resolution trade-off: higher resolution = more detail, more compute",
        "Used by planners + costmaps later",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/occupancy_grid.png" alt="Occupancy grid map example" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: occupancy grid image (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Most navigation stacks use an occupancy grid map. Each cell is either free, occupied, or unknown. The resolution matters: finer grids capture more detail but take more computation and memory. Later, the navigation system will transform this map into costmaps for planning. So when your map quality is poor, your navigation quality usually becomes poor too.",
  },

  // 25) Navigation
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Navigation: From “Where Am I?” to “Go There”",
    left: {
      bullets: [
        "Navigation pipeline: localization + map → planning → control",
        "Global plan: overall route to the goal",
        "Local plan: avoids obstacles and follows the path",
        "We’ll use ROS 2 navigation concepts (Nav2-style architecture)",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/nav_pipeline.png" alt="Navigation pipeline diagram" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: start→goal with global path + local trajectory (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Navigation connects everything: your robot must know where it is, plan a path to a goal, and execute that plan safely. We usually separate this into a global plan and a local plan. Global planning decides the overall route. Local planning handles immediate obstacles and produces smooth motion commands. When navigation fails, we diagnose which stage is failing—localization, planning, or control.",
  },

  // 26) Costmaps
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Costmaps (How Robots “See” Obstacles for Planning)",
    left: {
      bullets: [
        "Costmap layers: static map + obstacle layer + inflation layer",
        "Converts raw sensor data into safe driving space",
        "Tuning parameters strongly affect behavior",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/costmap_layers.png" alt="Costmap layers visualization" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: layered costmap visualization (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Costmaps are one of the biggest ‘tuning’ areas in navigation. The static map provides known obstacles. The obstacle layer inserts what the sensors see right now. Inflation expands obstacles to create a safety buffer. If inflation is too small, you risk collisions. If it’s too large, the robot becomes overly cautious and may get stuck. You’ll learn to tune in a principled way, not by random guessing.",
  },

  // 27) Dynamic obstacle avoidance
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Dynamic Obstacle Avoidance (Local Planning)",
    left: {
      bullets: [
        "Real environments move: people, carts, robots",
        "Local planner reacts to changing obstacles",
        "Goal: reach target safely without getting stuck/oscillating",
        "We’ll evaluate: success rate, smoothness, time, collisions",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <video src="./media/dynamic_obstacles.mp4" class="fit-contain" controls muted></video>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: robot navigating around moving obstacles (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "This is where your project becomes interesting. In dynamic environments, your robot must keep updating its plan as obstacles move. A good system is safe and smooth, not jittery. We’ll talk about metrics: did you reach the goal, how long did it take, was the path smooth, and did you collide. In robotics, performance is not just ‘it worked once’—it’s repeatable behavior under variation.",
  },

  // 28) Main project
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "The Main Project (40%)",
    left: {
      bullets: [
        "Project = 40% of final grade",
        "Target system (simulation): SLAM mapping + navigation to goals + dynamic obstacle avoidance",
        "Achievable if you follow labs + keep up weekly",
        "Demo + report (details in course outline)",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/project_storyboard.png" alt="Project storyboard map-plan-drive-avoid" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: project demo storyboard (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Your project is a big chunk of the grade because it’s where everything comes together. You’ll demonstrate that you can map an environment, navigate to goal poses, and handle obstacles that move. This is absolutely achievable if you follow the labs and keep up weekly. If you fall behind for several weeks, the project becomes stressful—so our plan is to treat milestones as checkpoints, not as optional extras.",
  },

  // 29) Milestones
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Mini-Projects / Milestones (How You Stay on Track)",
    left: {
      bullets: [
        "Milestone 1: TB3 sim + teleop + RViz visualization",
        "Milestone 2: TF + URDF/RViz correctness check",
        "Milestone 3: SLAM map generation + saved map artifact",
        "Milestone 4: navigation to goal poses in known map",
        "Milestone 5: dynamic obstacle scenario test + metrics",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/milestones_progress.png" alt="Milestones progress bar" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: progress bar with 5 checkpoints (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Think of these milestones as your survival strategy. If you can teleop and visualize correctly, you have a working base. If TF and URDF are correct, your coordinate system is healthy. If you can generate and save a map, you’re ready for navigation. If you can navigate in a known map, you’re close to the finish line. Then dynamic obstacles is the final realism layer. Each milestone de-risks the project.",
  },

  // 30) Grading mindset + today/next steps
  {
    type: "two-col",
    hud: "Mobile Robotics Lab",
    title: "Today’s Start + Next Steps",
    left: {
      bullets: [
        "Today: course overview + setup plan + quick TB3 Gazebo/RViz demo",
        "Before next lab: install Ubuntu (dual boot) + ROS 2 + Gazebo + TB3 packages",
        "Run the verification checklist (“hello robot” simulation)",
        "Support: office hours/lab help/discussion channel + troubleshooting guide",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/next_steps_checklist.png" alt="Next steps checklist" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Media idea: checklist slide + short demo clip (replace file).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Here’s what happens next. Today we finish the overview and I’ll show you a quick TurtleBot3 simulation demo so you can see the end-to-end flow. Before the next lab, your main job is setup: Ubuntu dual boot, ROS 2 Humble, Gazebo, and the TurtleBot3 simulation packages. Then you run the verification checklist—if the hello-robot sim runs, you’re ready. If anything blocks you, use the support channels early; don’t wait until the night before a deadline.",
  },
];

export default slidesData;
