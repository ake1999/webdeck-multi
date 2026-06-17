import { YOUTUBE_TERMINOLOGY } from "./course_labels.js";

export const SCHOOL_CATALOG = {
  AC: {
    id: "AC",
    coursesTitle: "Algonquin College — Choose a course",
    coursesSubtitle: "School of Advanced Technology (OTFT / SAT).",
    fallbackSubtitle: "Algonquin College • School of Advanced Technology",
    email: "karimza@algonquincollege.com",
    defaultHud: "ROB9205 — INDUSTRIAL ROBOTS",
    hudPrefix: "Algonquin • ",
    logoSrc: "/shared/media/ac-footer.png",
    theme: "ac",
    courseColor: "#86efac",
  },
  UO: {
    id: "UO",
    coursesTitle: "University of Ottawa — Choose a course",
    coursesSubtitle: "MCG 5138 Autonomous Mobile Robots and MCG 5353 Robotics.",
    fallbackSubtitle: "University of Ottawa",
    email: "Ali.Karimzade@uOttawa.ca",
    defaultHud: "MCG 5138 — AUTONOMOUS MOBILE ROBOTS",
    hudPrefix: "uOttawa • ",
    logoSrc: "/shared/media/uo-footer.png",
    theme: "uo",
    courseColor: "#f97373",
  },
  AU: {
    id: "AU",
    displayName: "Arian University",
    coursesTitle: "Arian University — Choose a course",
    coursesSubtitle: "Personal-brand courses for YouTube and the website.",
    fallbackSubtitle: "Arian University",
    email: "",
    defaultHud: "ARIAN UNIVERSITY",
    hudPrefix: "Arian • ",
    logoSrc: "/shared/media/au-footer.png",
    footerLogoSrc: "/shared/media/au-footer.png",
    homeIconSrc: "/shared/media/au-icon-light.png",
    homeIconDarkSrc: "/shared/media/au-icon-dark.png",
    theme: "arian",
    courseColor: "#c65a28",
  },
};

export const COURSE_CATALOG = {
  ROB9205_Industrial_Robots_W2026: {
    school: "AC",
    code: "ROB9205",
    term: "W2026",
    fullId: "ROB9205_Industrial_Robots_W2026",
    title: "Industrial Robots",
    desc: "School of Advanced Technology — Industrial Robot Fundamentals.",
    displayName: "ROB9205 — Industrial Robots (W2026)",
    subtitle: "Algonquin College • School of Advanced Technology",
    color: "#86efac",
    defaultHud: "ROB9205 — INDUSTRIAL ROBOTS",
    sessions: [
      {
        id: "S01",
        label: "Session 01 — Intro & Safety",
        desc: "Course introduction, expectations, and robot safety.",
        topics: [
          {
            id: "01_course_intro_and_expectations",
            label: "Topic 01 — Course intro & expectations",
          },
          {
            id: "02_robot_safety",
            label: "Topic 02 — Robot safety",
          },
        ],
      },
      {
        id: "S02",
        label: "Session 02 — Robot History, components, & Types",
        desc: " Robot History, components, and Types.",
        topics: [
          {
            id: "01_robot_history",
            label: "Topic 01 — Robot History",
          },
          {
            id: "02_robot_components",
            label: "Topic 02 — Robot Components",
          },
          {
            id: "03_robot_characteristics_manipulator_types",
            label: "Topic 03 — Robot Characteristics Manipulator Types",
          },
        ],
      },
      {
        id: "S03",
        label: "Session 03 — Robot components review & Lab 1",
        desc: "Robot components review and Lab 1.",
        topics: [
          {
            id: "01_final_project_ideas",
            label: "Topic 01 — Final Project Ideas (Industrial Automation)",
          },
          {
            id: "02_fanuc_lab_guide",
            label: "Topic 02 — FANUC Lab Guide",
          },
        ],
      },
      {
        id: "S04",
        label: "Session 04 — Control Systems & FANUC Programming",
        desc: "Control Systems review and Lab 2.",
        topics: [
          {
            id: "01_open_vs_closed_loop",
            label: "Topic 01 — Open Loop and Closed Loop Control Systems",
          },
          {
            id: "02_coordinates_motion_termination",
            label: "Topic 02 — FANUC Programming Guide",
          },
        ],
      },
      {
        id: "S05",
        label: "Session 05 — Sensors for Robotics",
        desc: "Types of sensors for Robotics.",
        topics: [
          {
            id: "01_sensors_complete",
            label: "Topic 01 — Sensors for Robotics",
          },
        ],
      },
      {
        id: "S06",
        label: "Session 06 — Frames for Robotics",
        desc: "Frames, user Frames FANUC.",
        topics: [
          {
            id: "01_frames_user_frames_fanuc",
            label: "Topic 01 — Frames, user Frames FANUC",
          },
        ],
      },
      {
        id: "S07",
        label: "Session 07 — FANUC Data Registers",
        desc: "FANUC Data Registers & Position Registers.",
        topics: [
          {
            id: "01_data_registers",
            label: "Topic 01 — FANUC Data Registers",
          },
        ],
      },
      {
        id: "S08",
        label: "Session 08 — FANUC Branching Instructions",
        desc: "FANUC Branching Instructions, Conditionals, and Loops.",
        topics: [
          {
            id: "01_branching_instructions",
            label: "Topic 01 — FANUC Branching Instructions",
          },
        ],
      },
    ],
  },

  MCG5138_Autonomous_Mobile_Robots_W2026: {
    school: "UO",
    code: "MCG5138",
    term: "W2026",
    fullId: "MCG5138_Autonomous_Mobile_Robots_W2026",
    title: "Autonomous Mobile Robots (Lab)",
    desc: "Mobile robotics lab with TurtleBot3 simulation and ROS 2.",
    displayName: "MCG 5138 — Autonomous Mobile Robots (W2026)",
    subtitle: "University of Ottawa • MCG 5138 Autonomous Mobile Robots",
    color: "#f97373",
    defaultHud: "MCG 5138 — AUTONOMOUS MOBILE ROBOTS",
    sessions: [
      {
        id: "S01",
        label: "Session 01 — Lab intro & expectations",
        desc: "Mobile robotics lab overview, expectations, and tooling.",
        topics: [
          {
            id: "01_mobile_robotics_lab_intro_and_expectations",
            label: "Topic 01 — Mobile robotics lab intro & expectations",
          },
        ],
      },
      {
        id: "S02",
        label: "Session 02 — Ubuntu installation",
        desc: "Ubuntu installation + Linux basics.",
        topics: [
          {
            id: "01_ubuntu22_dualboot_install",
            label: "Topic 01 — Ubuntu 22 Dualboot Install",
          },
          {
            id: "02_linux_filesystem_and_terminal_basics",
            label: "Topic 02 — Linux Filesystem And Terminal Basics",
          },
        ],
      },
      {
        id: "S03",
        label: "Session 03 — ROS2 installation",
        desc: "ROS2 installation + Linux basics.",
        topics: [
          {
            id: "01_ros2_humble_install_gazebo_classic_tb3",
            label: "Topic 01 — ROS2 Humble Install",
          },
        ],
      },
      {
        id: "S04",
        label: "Session 04 — ROS2 Basics",
        desc: "ROS2 installation + Linux basics.",
        topics: [
          {
            id: "01_ros2_basics_pubsub",
            label: "Topic 01 — ROS2 Basics PUB/SUB",
          },
        ],
      },
      {
        id: "S05",
        label: "Session 05 — ROS2 Tools",
        desc: "ROS2 Tools",
        topics: [
          {
            id: "01_urdf_rviz_tf2",
            label: "Topic 01 — URDF RVIZ TF2",
          },
        ],
      },
      {
        id: "S06",
        label: "Session 06 — ROS2 Tools 2",
        desc: "ROS2 Tools 2",
        topics: [
          {
            id: "01_launch_params",
            label: "Topic 01 — Launch Params",
          },
        ],
      },
      {
        id: "S07",
        label: "Session 07 — TB3 Demo",
        desc: "TB3 Demo",
        topics: [
          {
            id: "01_tb3_real_robot_demo",
            label: "Topic 01 — TB3 Real Robot Demo",
          },
        ],
      },
      {
        id: "S08",
        label: "Session 08 — TB3 SLAM Simulation",
        desc: "TB3 SLAM Simulation",
        topics: [
          {
            id: "01_tb3_slam_sim",
            label: "Topic 01 — TB3 SLAM Simulation",
          },
        ],
      },
      {
        id: "S09",
        label: "Session 09 — NAV2 Overview",
        desc: "TB3 NAV2 Overview",
        topics: [
          {
            id: "01_nav2_overview_project",
            label: "Topic 01 — NAV2 Overview + project",
          },
        ],
      },
    ],
  },

  MCG5353_Robotics_W2026: {
    school: "UO",
    code: "MCG5353",
    term: "W2026",
    fullId: "MCG5353_Robotics_W2026",
    title: "Robotics",
    desc: "University of Ottawa robotics course deck scaffold.",
    displayName: "MCG 5353 — Robotics (W2026)",
    subtitle: "University of Ottawa • MCG 5353 Robotics",
    color: "#f97373",
    defaultHud: "MCG 5353 — ROBOTICS",
    sessions: [
      {
        id: "S01",
        label: "Session 01 — Manipulator lab intro & install plan",
        desc: "Course framing, Ubuntu setup, ROS 2 tools, MoveIt, IK, and planning.",
        topics: [
          {
            id: "01_course_overview",
            label: "Topic 01 — Robotics lab intro & install plan",
          },
        ],
      },
      {
        id: "S02",
        label: "Session 02 — Ubuntu terminal + ROS 2 setup",
        desc: "Ubuntu terminal habits, ROS 2 Humble setup, .bashrc aliases, colcon, workspace discipline, and verification.",
        topics: [
          {
            id: "01_ubuntu_terminal_ros2_setup",
            label: "Topic 01 — Ubuntu terminal + ROS 2 setup",
          },
        ],
      },
      {
        id: "S03",
        label: "Session 03 — ROS 2 graph + packages + debugging",
        desc: "ROS 2 graph, packages, nodes, topics, services, actions, parameters, rosbag, and manipulator debugging workflow.",
        topics: [
          {
            id: "01_ros2_graph_packages_nodes_debugging",
            label: "Topic 01 — ROS 2 graph + packages + debugging",
          },
        ],
      },
      {
        id: "S04",
        label: "Session 04 — Panda URDF/Xacro + TF + RViz2",
        desc: "Panda robot description resources, URDF/Xacro, robot_description, joint states, TF, RViz2, and visualization debugging.",
        topics: [
          {
            id: "01_panda_urdf_tf_rviz",
            label: "Topic 01 — Panda URDF/Xacro + TF + RViz2",
          },
        ],
      },
    ],
  },

  ARIAN_Calculus_1: {
    school: "AU",
    code: "CALC1",
    term: "Arian",
    fullId: "ARIAN_Calculus_1",
    title: "Calculus 1",
    desc: "Limits, derivatives, applications, and the foundations of integration.",
    displayName: "Calculus 1 — Foundations",
    subtitle: "Arian University • 5 units • 26 lessons",
    color: "#c65a28",
    defaultHud: "ARIAN UNIVERSITY — CALCULUS 1",
    sourceKind: "calculus_material_json",
    materialRoot: "/courses/Calculus/Materials",
    terminology: YOUTUBE_TERMINOLOGY,
    sessions: [
      {
        id: "S01",
        label: "Unit 1 — Preliminaries",
        desc: "Functions, graphs, trigonometry, and transformation language.",
        topics: [
          { id: "01_review_of_functions_and_graphs", label: "Topic 01 — Review of Functions and Graphs", title: "Review of Functions and Graphs" },
          { id: "02_trigonometry_and_graphing_review", label: "Topic 02 — Trigonometry and Graphing Review", title: "Trigonometry and Graphing Review" },
        ],
      },
      {
        id: "S02",
        label: "Unit 2 — Limits and Continuity",
        desc: "The limit idea, limit laws, one-sided behavior, squeeze theorem, and continuity.",
        topics: [
          { id: "01_the_intuitive_concept_of_a_limit", label: "Topic 01 — The Intuitive Concept of a Limit", title: "The Intuitive Concept of a Limit" },
          { id: "02_limit_laws_and_algebraic_evaluation", label: "Topic 02 — Limit Laws and Algebraic Evaluation", title: "Limit Laws and Algebraic Evaluation" },
          { id: "03_one_sided_limits_and_limits_at_infinity", label: "Topic 03 — One-Sided Limits and Limits at Infinity", title: "One-Sided Limits and Limits at Infinity" },
          { id: "04_the_squeeze_theorem", label: "Topic 04 — The Squeeze Theorem", title: "The Squeeze Theorem" },
          { id: "05_continuity_and_the_intermediate_value_theorem", label: "Topic 05 — Continuity and the Intermediate Value Theorem", title: "Continuity and the Intermediate Value Theorem" },
        ],
      },
      {
        id: "S03",
        label: "Unit 3 — Derivative Foundations and Rules",
        desc: "Instantaneous rate of change, derivative definition, and core differentiation rules.",
        topics: [
          { id: "01_instantaneous_rate_of_change", label: "Topic 01 — Instantaneous Rate of Change", title: "Instantaneous Rate of Change" },
          { id: "02_formal_definition_of_the_derivative", label: "Topic 02 — Formal Definition of the Derivative", title: "Formal Definition of the Derivative" },
          { id: "03_power_rule_and_basic_properties_of_derivatives", label: "Topic 03 — Power Rule and Basic Properties of Derivatives", title: "Power Rule and Basic Properties of Derivatives" },
          { id: "04_power_rule_constant_multiple_and_sum_difference_rules", label: "Topic 04 — Power, Constant Multiple, Sum, and Difference Rules", title: "Power, Constant Multiple, Sum, and Difference Rules" },
          { id: "05_the_product_rule_for_derivatives", label: "Topic 05 — The Product Rule for Derivatives", title: "The Product Rule for Derivatives" },
          { id: "06_the_chain_rule", label: "Topic 06 — The Chain Rule", title: "The Chain Rule" },
          { id: "07_implicit_differentiation", label: "Topic 07 — Implicit Differentiation", title: "Implicit Differentiation" },
        ],
      },
      {
        id: "S04",
        label: "Unit 4 — Applications of Derivatives",
        desc: "Related rates, extrema, graphing tests, optimization, L'Hopital, and Newton's method.",
        topics: [
          { id: "01_related_rates", label: "Topic 01 — Related Rates", title: "Related Rates" },
          { id: "02_critical_points_and_extrema_on_an_interval", label: "Topic 02 — Critical Points and Extrema on an Interval", title: "Critical Points and Extrema on an Interval" },
          { id: "03_rolles_theorem_and_the_mean_value_theorem", label: "Topic 03 — Rolle's Theorem and the Mean Value Theorem", title: "Rolle's Theorem and the Mean Value Theorem" },
          { id: "04_first_and_second_derivative_tests", label: "Topic 04 — First and Second Derivative Tests", title: "First and Second Derivative Tests" },
          { id: "05_optimization_problems", label: "Topic 05 — Optimization Problems", title: "Optimization Problems" },
          { id: "06_lhopitals_rule", label: "Topic 06 — L'Hopital's Rule", title: "L'Hopital's Rule" },
          { id: "07_newtons_method_and_linear_approximations", label: "Topic 07 — Newton's Method and Linear Approximations", title: "Newton's Method and Linear Approximations" },
        ],
      },
      {
        id: "S05",
        label: "Unit 5 — Integration Foundations",
        desc: "Antiderivatives, Riemann sums, definite integrals, FTC, and substitution.",
        topics: [
          { id: "01_antiderivatives_and_indefinite_integrals", label: "Topic 01 — Antiderivatives and Indefinite Integrals", title: "Antiderivatives and Indefinite Integrals" },
          { id: "02_approximating_area_with_riemann_sums", label: "Topic 02 — Approximating Area with Riemann Sums", title: "Approximating Area with Riemann Sums" },
          { id: "03_the_definite_integral", label: "Topic 03 — The Definite Integral", title: "The Definite Integral" },
          { id: "04_the_fundamental_theorem_of_calculus", label: "Topic 04 — The Fundamental Theorem of Calculus", title: "The Fundamental Theorem of Calculus" },
          { id: "05_integration_by_substitution", label: "Topic 05 — Integration by Substitution", title: "Integration by Substitution" },
        ],
      },
    ],
  },

  ARIAN_Calculus_2: {
    school: "AU",
    code: "CALC2",
    term: "Arian",
    fullId: "ARIAN_Calculus_2",
    title: "Calculus 2",
    desc: "Applications and techniques of integration, sequences, series, parametric curves, and polar coordinates.",
    displayName: "Calculus 2 — Integration and Series",
    subtitle: "Arian University • YouTube course",
    color: "#c65a28",
    defaultHud: "ARIAN UNIVERSITY — CALCULUS 2",
    sourceKind: "calculus_material_json",
    materialRoot: "/courses/Calculus/Materials",
    terminology: YOUTUBE_TERMINOLOGY,
    sessions: [
      {
        id: "S01",
        label: "Unit 1 — Applications of Integration",
        desc: "Area, volume, arc length, surface area, work, and fluid force.",
        topics: [
          { id: "01_area_between_curves", label: "Topic 01 — Area Between Curves", title: "Area Between Curves" },
          { id: "02_volume_disk_and_washer_methods", label: "Topic 02 — Volume: Disk and Washer Methods", title: "Volume: Disk and Washer Methods" },
          { id: "03_volume_cylindrical_shells", label: "Topic 03 — Volume: Cylindrical Shells", title: "Volume: Cylindrical Shells" },
          { id: "04_arc_length_and_surface_area_of_revolution", label: "Topic 04 — Arc Length and Surface Area of Revolution", title: "Arc Length and Surface Area of Revolution" },
          { id: "05_work_and_fluid_force", label: "Topic 05 — Work and Fluid Force", title: "Work and Fluid Force" },
        ],
      },
      {
        id: "S02",
        label: "Unit 2 — Techniques of Integration",
        desc: "Integration by parts, trig techniques, partial fractions, and improper integrals.",
        topics: [
          { id: "01_integration_by_parts", label: "Topic 01 — Integration by Parts", title: "Integration by Parts" },
          { id: "02_trigonometric_integrals", label: "Topic 02 — Trigonometric Integrals", title: "Trigonometric Integrals" },
          { id: "03_trigonometric_substitution", label: "Topic 03 — Trigonometric Substitution", title: "Trigonometric Substitution" },
          { id: "04_partial_fractions", label: "Topic 04 — Partial Fractions", title: "Partial Fractions" },
          { id: "05_improper_integrals", label: "Topic 05 — Improper Integrals", title: "Improper Integrals" },
        ],
      },
      {
        id: "S03",
        label: "Unit 3 — Sequences and Series",
        desc: "Convergence, partial sums, comparison, alternating, ratio, and root tests.",
        topics: [
          { id: "01_sequences_and_convergence", label: "Topic 01 — Sequences and Convergence", title: "Sequences and Convergence" },
          { id: "02_series_and_partial_sums", label: "Topic 02 — Series and Partial Sums", title: "Series and Partial Sums" },
          { id: "03_the_integral_test_and_p_series", label: "Topic 03 — The Integral Test and p-Series", title: "The Integral Test and p-Series" },
          { id: "04_comparison_tests_direct_and_limit", label: "Topic 04 — Comparison Tests: Direct and Limit", title: "Comparison Tests: Direct and Limit" },
          { id: "05_alternating_series_and_absolute_convergence", label: "Topic 05 — Alternating Series and Absolute Convergence", title: "Alternating Series and Absolute Convergence" },
          { id: "06_the_ratio_and_root_tests", label: "Topic 06 — The Ratio and Root Tests", title: "The Ratio and Root Tests" },
        ],
      },
      {
        id: "S04",
        label: "Unit 4 — Power Series, Parametric, and Polar",
        desc: "Power series, Taylor series, parametric calculus, and polar graphing.",
        topics: [
          { id: "01_power_series_and_radius_of_convergence", label: "Topic 01 — Power Series and Radius of Convergence", title: "Power Series and Radius of Convergence" },
          { id: "02_taylor_and_maclaurin_series", label: "Topic 02 — Taylor and Maclaurin Series", title: "Taylor and Maclaurin Series" },
          { id: "03_parametric_equations_and_calculus", label: "Topic 03 — Parametric Equations and Calculus", title: "Parametric Equations and Calculus" },
          { id: "04_polar_coordinates_and_graphing", label: "Topic 04 — Polar Coordinates and Graphing", title: "Polar Coordinates and Graphing" },
        ],
      },
    ],
  },

  ARIAN_Calculus_3: {
    school: "AU",
    code: "CALC3",
    term: "Arian",
    fullId: "ARIAN_Calculus_3",
    title: "Calculus 3",
    desc: "Vectors, 3D geometry, multivariable derivatives, multiple integrals, and vector calculus.",
    displayName: "Calculus 3 — Multivariable and Vector Calculus",
    subtitle: "Arian University • YouTube course",
    color: "#c65a28",
    defaultHud: "ARIAN UNIVERSITY — CALCULUS 3",
    sourceKind: "calculus_material_json",
    materialRoot: "/courses/Calculus/Materials",
    terminology: YOUTUBE_TERMINOLOGY,
    sessions: [
      {
        id: "S01",
        label: "Unit 1 — Vectors and 3D Geometry",
        desc: "3D coordinates, vectors, dot/cross products, lines, planes, and quadrics.",
        topics: [
          { id: "01_3d_coordinate_systems_and_vectors", label: "Topic 01 — 3D Coordinate Systems and Vectors", title: "3D Coordinate Systems and Vectors" },
          { id: "02_the_dot_product_and_projections", label: "Topic 02 — The Dot Product and Projections", title: "The Dot Product and Projections" },
          { id: "03_the_cross_product", label: "Topic 03 — The Cross Product", title: "The Cross Product" },
          { id: "04_equations_of_lines_and_planes", label: "Topic 04 — Equations of Lines and Planes", title: "Equations of Lines and Planes" },
          { id: "05_quadric_surfaces", label: "Topic 05 — Quadric Surfaces", title: "Quadric Surfaces" },
        ],
      },
      {
        id: "S02",
        label: "Unit 2 — Partial Derivatives",
        desc: "Functions of several variables, limits, partial derivatives, and tangent planes.",
        topics: [
          { id: "01_functions_of_several_variables", label: "Topic 01 — Functions of Several Variables", title: "Functions of Several Variables" },
          { id: "02_limits_and_continuity_in_multivariable_calculus", label: "Topic 02 — Limits and Continuity in Multivariable Calculus", title: "Limits and Continuity in Multivariable Calculus" },
          { id: "03_partial_derivatives", label: "Topic 03 — Partial Derivatives", title: "Partial Derivatives" },
          { id: "04_tangent_planes_and_linear_approximations", label: "Topic 04 — Tangent Planes and Linear Approximations", title: "Tangent Planes and Linear Approximations" },
        ],
      },
      {
        id: "S03",
        label: "Unit 3 — Chain Rule, Gradients, and Optimization",
        desc: "The multivariable chain rule, gradients, directional derivatives, and Lagrange multipliers.",
        topics: [
          { id: "01_the_multivariable_chain_rule", label: "Topic 01 — The Multivariable Chain Rule", title: "The Multivariable Chain Rule" },
          { id: "02_directional_derivatives_and_the_gradient_vector", label: "Topic 02 — Directional Derivatives and the Gradient Vector", title: "Directional Derivatives and the Gradient Vector" },
          { id: "03_maximum_minimum_problems_and_lagrange_multipliers", label: "Topic 03 — Maximum/Minimum Problems and Lagrange Multipliers", title: "Maximum/Minimum Problems and Lagrange Multipliers" },
        ],
      },
      {
        id: "S04",
        label: "Unit 4 — Multiple Integrals",
        desc: "Double and triple integrals in rectangular, general, polar, cylindrical, and spherical coordinates.",
        topics: [
          { id: "01_double_integrals_over_rectangular_regions", label: "Topic 01 — Double Integrals over Rectangular Regions", title: "Double Integrals over Rectangular Regions" },
          { id: "02_double_integrals_over_general_regions", label: "Topic 02 — Double Integrals over General Regions", title: "Double Integrals over General Regions" },
          { id: "03_double_integrals_in_polar_coordinates", label: "Topic 03 — Double Integrals in Polar Coordinates", title: "Double Integrals in Polar Coordinates" },
          { id: "04_triple_integrals", label: "Topic 04 — Triple Integrals", title: "Triple Integrals" },
          { id: "05_triple_integrals_in_cylindrical_and_spherical_coordinates", label: "Topic 05 — Triple Integrals in Cylindrical and Spherical Coordinates", title: "Triple Integrals in Cylindrical and Spherical Coordinates" },
        ],
      },
      {
        id: "S05",
        label: "Unit 5 — Vector Calculus",
        desc: "Vector fields, line integrals, Green's theorem, curl/divergence, Stokes, and divergence theorem.",
        topics: [
          { id: "01_vector_fields_and_line_integrals", label: "Topic 01 — Vector Fields and Line Integrals", title: "Vector Fields and Line Integrals" },
          { id: "02_the_fundamental_theorem_for_line_integrals", label: "Topic 02 — The Fundamental Theorem for Line Integrals", title: "The Fundamental Theorem for Line Integrals" },
          { id: "03_greens_theorem", label: "Topic 03 — Green's Theorem", title: "Green's Theorem" },
          { id: "04_curl_and_divergence", label: "Topic 04 — Curl and Divergence", title: "Curl and Divergence" },
          { id: "05_parametric_surfaces_and_surface_integrals", label: "Topic 05 — Parametric Surfaces and Surface Integrals", title: "Parametric Surfaces and Surface Integrals" },
          { id: "06_stokes_theorem", label: "Topic 06 — Stokes' Theorem", title: "Stokes' Theorem" },
          { id: "07_the_divergence_theorem", label: "Topic 07 — The Divergence Theorem", title: "The Divergence Theorem" },
        ],
      },
    ],
  },
};

export const COURSE_LIST = Object.values(COURSE_CATALOG);

export function getSchoolConfig(school) {
  return SCHOOL_CATALOG[school] || SCHOOL_CATALOG.AC;
}

export function getCourseConfig(courseId) {
  return COURSE_CATALOG[courseId] || null;
}

export function getCoursesBySchool(school) {
  return COURSE_LIST.filter((course) => course.school === school);
}
