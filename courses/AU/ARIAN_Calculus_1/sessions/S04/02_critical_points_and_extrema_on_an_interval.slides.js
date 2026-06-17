// Generated from courses/Calculus/Materials/critical_points_and_extrema_on_an_interval.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "02_critical_points_and_extrema_on_an_interval",
  title: "Critical Points and Extrema on an Interval",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/critical_points_and_extrema_on_an_interval.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "Critical Points and Extrema on an Interval",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic 16 • Session 4: where \\(f'(x)=0\\) finds peaks & valleys • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back, Topic 15 related rates linked changing quantities. Topic 16: find where functions peak and bottom out on an interval using \\(f'(x)=0\\) from Topics 10–13. Do not re-introduce Arian from scratch.",
  },
  {
    id: "learning_objectives",
    type: "bullets",
    hud: "Arian University • Calculus 1",
    title: "Learning Objectives",
    lead: "Welcome back, after related rates, we optimize *values* of \\(f\\). By the end of this topic you will be able to:",
    blocks: [
      {
        id: "calculus1_roadmap",
        type: "course_path",
        layout: "topic_grid",
        currentId: "path_topic_16",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", status: "completed" },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", status: "completed" },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", status: "completed" },
          { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", status: "completed" },
          { id: "path_topic_05", number: 5, session: "S02 Limits and Continuity", label: "One-Sided Limits and Limits at Infinity", status: "completed" },
          { id: "path_topic_06", number: 6, session: "S02 Limits and Continuity", label: "The Squeeze Theorem", status: "completed" },
          { id: "path_topic_07", number: 7, session: "S02 Limits and Continuity", label: "Continuity and the Intermediate Value Theorem", status: "completed" },
          { id: "path_topic_08", number: 8, session: "S03 Derivative Foundations and Rules", label: "Instantaneous Rate of Change", status: "completed" },
          { id: "path_topic_09", number: 9, session: "S03 Derivative Foundations and Rules", label: "Formal Definition of the Derivative", status: "completed" },
          { id: "path_topic_10", number: 10, session: "S03 Derivative Foundations and Rules", label: "Power Rule and Basic Properties of Derivatives", status: "completed" },
          { id: "path_topic_11", number: 11, session: "S03 Derivative Foundations and Rules", label: "Power, Constant Multiple, Sum, and Difference Rules", status: "completed" },
          { id: "path_topic_12", number: 12, session: "S03 Derivative Foundations and Rules", label: "The Product Rule for Derivatives", status: "completed" },
          { id: "path_topic_13", number: 13, session: "S03 Derivative Foundations and Rules", label: "The Chain Rule", status: "completed" },
          { id: "path_topic_14", number: 14, session: "S03 Derivative Foundations and Rules", label: "Implicit Differentiation", status: "completed" },
          { id: "path_topic_15", number: 15, session: "S04 Applications of Derivatives", label: "Related Rates", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_16", number: 16, session: "S04 Applications of Derivatives", label: "Critical Points and Extrema on an Interval", note: "Today", status: "current", expanded: true },
          { id: "path_topic_17", number: 17, session: "S04 Applications of Derivatives", label: "Rolle's Theorem and the Mean Value Theorem", note: "Next", status: "next", expanded: true },
          { id: "path_topic_18", number: 18, session: "S04 Applications of Derivatives", label: "First and Second Derivative Tests", status: "upcoming" },
          { id: "path_topic_19", number: 19, session: "S04 Applications of Derivatives", label: "Optimization Problems", status: "upcoming" },
          { id: "path_topic_20", number: 20, session: "S04 Applications of Derivatives", label: "L'Hopital's Rule", status: "upcoming" },
          { id: "path_topic_21", number: 21, session: "S04 Applications of Derivatives", label: "Newton's Method and Linear Approximations", status: "upcoming" },
          { id: "path_topic_22", number: 22, session: "S05 Integration Foundations", label: "Antiderivatives and Indefinite Integrals", status: "upcoming" },
          { id: "path_topic_23", number: 23, session: "S05 Integration Foundations", label: "Approximating Area with Riemann Sums", status: "upcoming" },
          { id: "path_topic_24", number: 24, session: "S05 Integration Foundations", label: "The Definite Integral", status: "upcoming" },
          { id: "path_topic_25", number: 25, session: "S05 Integration Foundations", label: "The Fundamental Theorem of Calculus", status: "upcoming" },
          { id: "path_topic_26", number: 26, session: "S05 Integration Foundations", label: "Integration by Substitution", status: "upcoming" },
        ],
      },
    ],
    bullets: [
      { id: "objective_1", text: "Find critical numbers: solve \\(f'(x)=0\\) and where \\(f'(x)\\) DNE (Topics 10–13)" },
      { id: "objective_2", text: "Apply the Closed Interval Method for absolute max/min on \\([a,b]\\)" },
      { id: "objective_3", text: "Distinguish local vs absolute extrema; critical ≠ automatic extremum" },
      { id: "objective_4", text: "Solve optimization setups (farmer fence) using critical point analysis" },
    ],
    notes:
      "Roadmap: Topic 15 done, Topic 16 current, Topic 17 MVT next. Callback derivative rules for \\(f'(x)=0\\).",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: HOOK + DEFINITIONS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_why_critical_points_matter",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Why Critical Points Matter",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "A farmer has **1200 m** of fencing for a rectangular pasture along a river (no fence on the river). What dimensions maximize **area**? Answer comes from finding where \\(A'(x)=0\\), we'll close the loop at the end.",
        },
        {
          id: "left_hook",
          type: "paragraph",
          text: "Topic 15 asked *how fast* things change. Topic 16 asks *where* a function hits its highest and lowest values on an interval.",
        },
      ],
      lead: "Real optimization hooks the whole topic, critical numbers are the suspects.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_area_preview",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Area preview: \\(A(x)=1200x-2x^2\\)",
        caption: "Downward parabola: max at the vertex (critical point).",
        formulaLabel: "A",
        plot: {
          plotType: "y_equals",
          formula: "A=1200x-2x^2",
          expr: "1200*x-2*x*x",
          xDomain: [0, 600],
          yDomain: [0, 200000],
          tags: [{ text: "max near x=300", x: 300, y: 180000 }],
          probe: true,
          probeDefault: 300,
        },
        params: { x: 300 },
      },
    },
    notes:
      "Farmer hook returns at s12–s13. flex_plot area parabola preview. Bridge from Topic 15 rates to Topic 16 extrema.",
  },
  {
    id: "s02_critical_numbers_defined",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Critical Numbers Defined",
    question: "Move the probe to find where \\(f'(c)=0\\). What are the critical numbers?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Critical number",
          text: "\\(c\\) is a **critical number** of \\(f\\) iff \\(f'(c)=0\\) or \\(f'(c)\\) does not exist. Use power/product/chain rules (Topics 10–13) to solve \\(f'(x)=0\\).",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Horizontal tangent (\\(f'=0\\)) or corner/cusp/vertical tangent (\\(f'\\) DNE), only places interior extrema can occur.",
        },
      ],
      lead: "\\(f'(c)=0\\) or \\(f'(c)\\) DNE, the derivative toolkit finds candidates.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cubic_critical",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "\\(f(x)=x^3-3x\\): probe critical points",
        caption: "\\(f'(x)=3x^2-3=0\\) at \\(x=\\pm 1\\). Drag probe; read slope.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=x^3-3x",
          expr: "x*x*x-3*x",
          xDomain: [-2.2, 2.2],
          yDomain: [-4, 4],
          vLines: [{ x: -1 }, { x: 1 }],
          tags: [
            { text: "c=-1", x: -1, y: 2.2 },
            { text: "c=1", x: 1, y: -2.2 },
          ],
          probe: true,
          probeDefault: 0.5,
        },
        params: { x: 0.5 },
        scriptedTimeline: [
          { t: 0, params: { x: -1.5 } },
          { t: 5, params: { x: -1 } },
          { t: 10, params: { x: 1 } },
        ],
      },
    },
    notes:
      "theorem_box critical number definition. flex_plot cubic with vLines at ±1. Student prompt: find f'(c)=0.",
  },
  {
    id: "s03_fermat_s_theorem",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Fermat's Theorem",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_fermat",
          type: "theorem_box",
          title: "Fermat's theorem",
          text: "If \\(f\\) has a **local** extremum at interior \\(c\\) and \\(f'(c)\\) exists, then \\(f'(c)=0\\). Converse is **false**, \\(f'(c)=0\\) need not be a max or min.",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Every interior local extremum is a critical number, but critical numbers are only **candidates** until you test them.",
        },
      ],
      lead: "Local max/min ⇒ critical number. Not every critical number is an extremum.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_fermat_graph",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Local max at \\(x=-1\\), min at \\(x=1\\)",
        caption: "Horizontal tangents where \\(f'(x)=3x^2-3=0\\).",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          expr: "x*x*x-3*x",
          xDomain: [-2.2, 2.2],
          yDomain: [-4, 4],
          tags: [
            { text: "local max", x: -1, y: 2 },
            { text: "local min", x: 1, y: -2 },
          ],
          probe: true,
          probeDefault: -1,
        },
        params: { x: -1 },
      },
    },
    notes:
      "Fermat theorem_box + flex_plot local max/min on cubic. Sets up x³ counterexample next.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: EXAMPLES + MISCONCEPTION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s04_warm_up_finding_critical_numbers",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: Finding Critical Numbers",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "f(x)=2x^3-9x^2+12x+5",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "f'(x)=6x^2-18x+12",
              gap: "tight",
              say: "Power rule on the cubic.",
            },
            {
              id: "step_2",
              math: "6(x^2-3x+2)=6(x-1)(x-2)",
              gap: "tight",
              say: "Factor the quadratic derivative.",
            },
            {
              id: "step_3",
              math: "x=1,\\ x=2",
              say: "Critical numbers where f prime equals zero.",
            },
          ],
        },
      ],
      lead: "Polynomials: set \\(f'(x)=0\\) using derivative rules from Topics 10–11.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_warmup_cubic",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "\\(f(x)=2x^3-9x^2+12x+5\\) on \\([0,3]\\)",
        caption: "Horizontal tangents at \\(x=1\\) and \\(x=2\\).",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          expr: "2*x*x*x-9*x*x+12*x+5",
          xDomain: [0, 3],
          yDomain: [0, 14],
          vLines: [{ x: 1 }, { x: 2 }],
          tags: [
            { text: "(1,10)", x: 1, y: 10 },
            { text: "(2,9)", x: 2, y: 9 },
          ],
          probe: true,
          probeDefault: 1,
        },
        params: { x: 1 },
      },
    },
    notes:
      "math_solution_steps warm-up cubic. flex_plot marks critical points at x=1,2.",
  },
  {
    id: "s05_standard_example_x3",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Standard Example: \\(x^3\\) (Pause)",
    question: "Is \\(x=0\\) a local maximum, local minimum, or neither for \\(f(x)=x^3\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "f(x)=x^3",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "f'(x)=3x^2",
              gap: "tight",
              say: "Power rule.",
            },
            {
              id: "step_2",
              math: "f'(x)=0 \\Rightarrow x=0",
              gap: "tight",
              say: "Critical number at zero.",
            },
            {
              id: "step_3",
              math: "f(-1)=-1,\\ f(0)=0,\\ f(1)=1",
              gap: "tight",
              say: "Function increases through zero.",
            },
            {
              id: "step_4",
              math: "\\text{neither local max nor min}",
              say: "Inflection point, critical but not an extremum.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and decide",
          prompt: "Critical number at 0, extremum?",
          reveal: {
            text: "**Neither**, \\(f\\) increases through \\((0,0)\\); \\(f'(0)=0\\) but no peak or valley.",
          },
        },
      ],
      lead: "\\(f'(0)=0\\) but the graph keeps rising, classic counterexample.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_sign_chart",
          type: "formula_block",
          formulas: [
            "\\(f'(x)=3x^2\\geq 0\\), same sign both sides of 0.",
            "\\(f'\\) sign: \\(+\\) on both sides → no direction change.",
          ],
        },
      ],
      media: {
        id: "right_x_cubed",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "\\(f(x)=x^3\\): inflection at 0",
        caption: "Horizontal tangent, but \\(f\\) never turns around.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          expr: "x*x*x",
          xDomain: [-1.6, 1.6],
          yDomain: [-4, 4],
          tags: [{ text: "(0,0) f'=0", x: 0.2, y: 0.5 }],
          probe: true,
          probeDefault: 0,
        },
        params: { x: 0 },
      },
    },
    notes:
      "x³ math_solution_steps + pause_and_reveal. f' sign same on both sides, not an extremum.",
  },
  {
    id: "s06_common_mistake_every_critical_point_is_an_extremum",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Common Mistake: \\(f'\\) Sign vs \\(f\\) Sign",
    question: "What test could you use to decide if a critical point is a local extremum?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Sign confusion",
          pairs: [
            {
              label: "❌ Confusing \\(f'\\) with \\(f\\)",
              text: "\\(f'(x)>0\\) on an interval means \\(f\\) is **increasing**, not that \\(f(x)>0\\). At \\(x=0\\) for \\(f(x)=x^3\\): \\(f(0)=0\\) but \\(f'(0)=0\\).",
            },
            {
              label: "✅ Test \\(f'\\) **sign change**",
              text: "Local max: \\(f'\\) goes \\(+\to 0\to -\\). Local min: \\(-\to 0\to +\\). No sign change ⇒ no extremum (e.g. \\(x^3\\) at 0).",
            },
          ],
        },
        {
          id: "left_tip",
          type: "paragraph",
          text: "Critical number \\(\\neq\\) extremum. Use first-derivative sign chart or second-derivative test (Topic 18 preview).",
        },
      ],
      lead: "Don't confuse **where** \\(f'\\) is positive with **whether** \\(f\\) is positive.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_fp_sign",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "\\(f'(x)=3x^2\\) for \\(f(x)=x^3\\)",
        caption: "\\(f'\\geq 0\\) everywhere: no sign flip at \\(x=0\\).",
        formulaLabel: "f'",
        plot: {
          plotType: "y_equals",
          expr: "3*x*x",
          xDomain: [-1.6, 1.6],
          yDomain: [-0.5, 8],
          tags: [{ text: "f'≥0", x: 1, y: 3 }],
          probe: true,
          probeDefault: 1,
        },
        params: { x: 1 },
      },
    },
    notes:
      "misconception_compare f' sign vs f sign. flex_plot f'(x)=3x² nonnegative. First derivative test teaser.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: CLOSED INTERVAL METHOD
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s07_closed_interval_method_interactive",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Closed Interval Method",
    question: "On \\([-1,4]\\), evaluate candidates: endpoints and critical points in \\((-1,4)\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_evt",
          type: "theorem_box",
          title: "Extreme Value Theorem",
          text: "If \\(f\\) is **continuous** on closed \\([a,b]\\), then \\(f\\) attains an **absolute** maximum and minimum on \\([a,b]\\). They occur at critical numbers in \\((a,b)\\) or at endpoints \\(a,b\\).",
        },
        {
          id: "left_workflow",
          type: "nested_bullets",
          items: [
            { id: "ci_1", text: "Find all \\(c\\) in \\((a,b)\\) with \\(f'(c)=0\\) or \\(f'(c)\\) DNE" },
            { id: "ci_2", text: "Evaluate \\(f\\) at each critical \\(c\\) and at \\(a,\\,b\\)" },
            { id: "ci_3", text: "Largest value = absolute max; smallest = absolute min" },
          ],
        },
      ],
      lead: "EVT guarantees extrema exist; closed interval method finds them.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_quartic_interval",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "\\(f(x)=x^3-3x^2+1\\) on \\([-1,4]\\)",
        caption: "Critical at \\(x=0,2\\): compare \\(f(-1),f(0),f(2),f(4)\\).",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          expr: "x*x*x-3*x*x+1",
          xDomain: [-1.5, 4.5],
          yDomain: [-6, 20],
          vLines: [{ x: 0 }, { x: 2 }],
          tags: [
            { text: "x=0", x: 0, y: 2 },
            { text: "x=2", x: 2, y: -3 },
          ],
          probe: true,
          probeDefault: 3,
        },
        params: { x: 3 },
      },
    },
    notes:
      "theorem_box EVT + nested_bullets closed interval steps. flex_plot cubic with critical markers, different from s02/s03.",
  },
  {
    id: "s08_try_it_absolute_extrema_of_x_2",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Try It: Absolute Extrema of \\(|x-2|\\) (Pause)",
    question: "Pause the video. Find the absolute max and min of \\(f(x)=|x-2|\\) on \\([0,4]\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Find absolute max and min of \\(f(x)=|x-2|\\) on \\([0,4]\\). Remember: corner ⇒ \\(f'\\) DNE.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and try",
          prompt: "List candidates: endpoints and critical numbers.",
          reveal: {
            text: "**Candidates:** \\(x=0,2,4\\). Evaluate all three before deciding.",
          },
        },
      ],
      lead: "Corner at \\(x=2\\), derivative undefined, still a critical number.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_abs_v",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "\\(f(x)=|x-2|\\) on \\([0,4]\\)",
        caption: "V-shape: min at corner \\((2,0)\\).",
        formulaLabel: "f",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=|x-2|",
          xDomain: [0, 4],
          yDomain: [0, 3],
          branches: [
            { expr: "2-x", xMin: 0, xMax: 2, stroke: "#2563eb" },
            { expr: "x-2", xMin: 2, xMax: 4, stroke: "#2563eb" },
          ],
          tags: [{ text: "corner (2,0)", x: 2, y: 0.3 }],
          probe: true,
          probeDefault: 2,
        },
        params: { x: 2 },
      },
    },
    notes:
      "YouTube pause with candidate hint. flex_plot piecewise absolute value.",
  },
  {
    id: "s09_solution_x_2_on_0_4",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Solution: \\(|x-2|\\) on \\([0,4]\\)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "f(x)=|x-2|\\ \\text{on }[0,4]",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "f'(x)\\text{ DNE at }x=2",
              gap: "tight",
              say: "Corner is a critical number.",
            },
            {
              id: "step_2",
              math: "f(0)=2,\\ f(2)=0,\\ f(4)=2",
              gap: "tight",
              say: "Evaluate all candidates.",
            },
            {
              id: "step_3",
              parts: [
                { math: "\\text{abs min}=0\\text{ at }x=2" },
                { math: "\\text{abs max}=2\\text{ at }x=0,4", op: "," },
              ],
              say: "Minimum at critical point; maximum at both endpoints.",
            },
          ],
        },
      ],
      lead: "Absolute max at **endpoints**, always include \\(a\\) and \\(b\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_table",
          type: "math_table",
          headers: ["\\(x\\)", "\\(f(x)\\)"],
          rows: [
            ["0", "2 (max)"],
            ["2", "0 (min)"],
            ["4", "2 (max)"],
          ],
        },
      ],
      media: {
        id: "right_abs_solution",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Candidates marked",
        caption: "Red: max at endpoints; green: min at corner.",
        formulaLabel: "f",
        plot: {
          plotType: "piecewise",
          xDomain: [0, 4],
          yDomain: [0, 3],
          branches: [
            { expr: "2-x", xMin: 0, xMax: 2, stroke: "#2563eb" },
            { expr: "x-2", xMin: 2, xMax: 4, stroke: "#2563eb" },
          ],
          tags: [
            { text: "max", x: 0.3, y: 2.2 },
            { text: "min", x: 2, y: 0.2 },
            { text: "max", x: 3.7, y: 2.2 },
          ],
          probe: true,
          probeDefault: 2,
        },
        params: { x: 2 },
      },
    },
    notes:
      "math_solution_steps closed interval on |x-2|. math_table candidates. Endpoints win the max.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: CHALLENGE + APPLICATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s10_challenge_optional_try_it_critical_numbers_with_dne",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge: Optional] Critical Numbers with DNE (Pause)",
    question: "Pause the video. Compute \\(f'(x)\\) and find all critical numbers.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Find critical numbers of \\(f(x)=x^{2/3}(6-x)^{1/3}\\) on \\([0,6]\\). Expect both \\(f'=0\\) and \\(f'\\) DNE.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and try",
          prompt: "Product + chain rules, watch endpoints.",
          reveal: {
            text: "**Hint:** after simplifying, numerator zero gives \\(x=4\\); denominator zero gives \\(x=0,6\\).",
          },
        },
      ],
      lead: "Optional, fractional powers create vertical tangents at endpoints.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_fractional_cusp",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "\\(f(x)=x^{2/3}(6-x)^{1/3}\\)",
        caption: "Peak interior; steep ends at \\(x=0,6\\).",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          expr: "x^(2/3)*(6-x)^(1/3)",
          xDomain: [0, 6],
          yDomain: [0, 4.5],
          tags: [{ text: "x=4", x: 4, y: 3.3 }],
          probe: true,
          probeDefault: 4,
        },
        params: { x: 4 },
      },
    },
    notes:
      "Optional challenge pause. flex_plot fractional-power curve. Product/chain from Topics 12–13.",
  },
  {
    id: "s11_challenge_optional_solution_critical_numbers_of_f_x_x_2_3_6_x_1_3",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge: Optional] Solution: \\(x^{2/3}(6-x)^{1/3}\\)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "f(x)=x^{2/3}(6-x)^{1/3}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "f'(x)=\\frac{4-x}{3x^{1/3}(6-x)^{2/3}}",
              gap: "tight",
              say: "Product + chain rules; simplify.",
            },
            {
              id: "step_2",
              math: "f'(x)=0 \\Rightarrow x=4",
              gap: "tight",
              say: "Numerator zero.",
            },
            {
              id: "step_3",
              math: "f'(x)\\text{ DNE at }x=0,\\ x=6",
              say: "Denominator zero, vertical tangents; all three are critical.",
            },
          ],
        },
      ],
      lead: "Check **both** \\(f'=0\\) and \\(f'\\) DNE every time.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_fractional_marked",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Critical: \\(0,4,6\\)",
        caption: "Horizontal tangent at 4; vertical at endpoints.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          expr: "x^(2/3)*(6-x)^(1/3)",
          xDomain: [0, 6],
          yDomain: [0, 4.5],
          vLines: [{ x: 4 }],
          tags: [
            { text: "f' DNE", x: 0.3, y: 0.5 },
            { text: "f'=0", x: 4, y: 3.3 },
            { text: "f' DNE", x: 5.5, y: 0.5 },
          ],
          probe: true,
          probeDefault: 4,
        },
        params: { x: 4 },
      },
    },
    notes:
      "Challenge solution math_solution_steps. Mark all three critical numbers on graph.",
  },
  {
    id: "s12_try_it_farmer_s_fence_optimization",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Try It: Farmer's Fence (Pause)",
    question: "Pause the video. Find width \\(x\\) that maximizes area and state dimensions.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "1200 m fence, three sides: width \\(x\\), length \\(y=1200-2x\\). Maximize \\(A(x)=x(1200-2x)\\) on \\(0<x<600\\).",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and optimize",
          prompt: "Find \\(A'(x)=0\\). Do endpoints matter?",
          reveal: {
            text: "**Hint:** \\(A'(x)=1200-4x=0\\Rightarrow x=300\\). Endpoints give area 0.",
          },
        },
      ],
      lead: "Hook from slide 1, close the farmer story with critical points.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_fence_diagram",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Constraint: \\(2x+y=1200\\)",
        caption: "Domain \\(0<x<600\\): parabola opens down.",
        formulaLabel: "A",
        plot: {
          plotType: "y_equals",
          expr: "1200*x-2*x*x",
          xDomain: [0, 600],
          yDomain: [0, 200000],
          probe: true,
          probeDefault: 200,
        },
        params: { x: 200 },
      },
    },
    notes:
      "Farmer pause with A'(x)=0 hint. Same area curve as s01 preview.",
  },
  {
    id: "s13_solution_farmer_s_fence",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Solution: Farmer's Fence",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "A(x)=1200x-2x^2,\\ 0<x<600",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "A'(x)=1200-4x",
              gap: "tight",
              say: "Differentiate area function.",
            },
            {
              id: "step_2",
              math: "A'(x)=0 \\Rightarrow x=300",
              gap: "tight",
              say: "Critical number in domain.",
            },
            {
              id: "step_3",
              math: "y=1200-2(300)=600",
              gap: "tight",
              say: "Length parallel to river.",
            },
            {
              id: "step_4",
              parts: [
                { math: "A(300)" },
                { math: "180{,}000\\ \\text{m}^2", op: "=" },
              ],
              say: "Endpoints approach zero, interior critical point is absolute max.",
            },
          ],
        },
      ],
      lead: "Width **300 m**, length **600 m**, max area **180,000 m²**.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_fence_max",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Vertex at \\((300,180000)\\)",
        caption: "Critical point of \\(A(x)\\) is the absolute maximum on \\((0,600)\\).",
        formulaLabel: "A",
        plot: {
          plotType: "y_equals",
          expr: "1200*x-2*x*x",
          xDomain: [0, 600],
          yDomain: [0, 200000],
          tags: [{ text: "(300,180000)", x: 300, y: 180000 }],
          vLines: [{ x: 300 }],
          probe: true,
          probeDefault: 300,
        },
        params: { x: 300 },
      },
    },
    notes:
      "Farmer solution math_solution_steps. Vertex marked on area parabola.",
  },
  {
    id: "s14_interactive_lab_explore_the_fence_problem",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Critical Points on Three Polynomials",
    question: "Switch tabs, find where \\(f'(x)=0\\) on each graph.",
    lead: "Cubic, quartic, and another cubic, compare critical numbers and horizontal tangents.",
    labSiteNote: "On the site, try all three tabs and drag the probe.",
    labExamples: [
      {
        id: "lab_ex_cubic",
        label: "A · Cubic",
        formula: "f(x)=x^3-3x",
        steps: [
          { id: "step_1", text: "\\(f'(x)=3x^2-3=3(x-1)(x+1)\\)." },
          { id: "step_2", text: "Critical numbers: \\(x=-1,\\,1\\)." },
          { id: "step_3", text: "Local max at \\(-1\\), local min at \\(1\\)." },
        ],
        params: {
          x: -1,
          plot: {
            plotType: "y_equals",
            expr: "x*x*x-3*x",
            xDomain: [-2.2, 2.2],
            yDomain: [-4, 4],
            vLines: [{ x: -1 }, { x: 1 }],
            probeDefault: -1,
          },
        },
      },
      {
        id: "lab_ex_quartic",
        label: "B · Quartic",
        formula: "f(x)=x^4-4x^2",
        steps: [
          { id: "step_1", text: "\\(f'(x)=4x^3-8x=4x(x^2-2)\\)." },
          { id: "step_2", text: "Critical: \\(x=0,\\,\\pm\\sqrt{2}\\)." },
          { id: "step_3", text: "Three critical points, classify with sign chart." },
        ],
        params: {
          x: 0,
          plot: {
            plotType: "y_equals",
            expr: "x*x*x*x-4*x*x",
            xDomain: [-2.5, 2.5],
            yDomain: [-5, 8],
            vLines: [{ x: -1.414 }, { x: 0 }, { x: 1.414 }],
            probeDefault: 0,
          },
        },
      },
      {
        id: "lab_ex_cubic2",
        label: "C · Cubic #2",
        formula: "f(x)=2x^3-9x^2+12x+5",
        steps: [
          { id: "step_1", text: "\\(f'(x)=6x^2-18x+12\\)." },
          { id: "step_2", text: "Critical: \\(x=1,\\,2\\) (warm-up polynomial)." },
          { id: "step_3", text: "Compare \\(f(1)=10\\) vs \\(f(2)=9\\)." },
        ],
        params: {
          x: 1,
          plot: {
            plotType: "y_equals",
            expr: "2*x*x*x-9*x*x+12*x+5",
            xDomain: [-0.5, 3.5],
            yDomain: [0, 14],
            vLines: [{ x: 1 }, { x: 2 }],
            probeDefault: 1,
          },
        },
      },
    ],
    blocks: [],
    media: {
      id: "lab_critical_polynomials",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "Critical-point lab",
      caption: "Drag probe to each horizontal tangent.",
      formulaLabel: "f",
      plot: {
        plotType: "y_equals",
        expr: "x*x*x-3*x",
        xDomain: [-2.2, 2.2],
        yDomain: [-4, 4],
        vLines: [{ x: -1 }, { x: 1 }],
        probe: true,
        probeDefault: -1,
      },
      params: { x: -1 },
    },
    notes:
      "visual_lab replaces fence slider, 3 polynomial tabs for critical exploration. Farmer story completed on s13.",
  },
  {
    id: "s15_challenge_optional_proof_of_fermat_s_theorem",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge: Optional] Proof Sketch: Fermat",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_proof",
          type: "proof_sketch",
          title: "Local max ⇒ \\(f'(c)=0\\)",
          text: "If \\(f\\) has a local max at \\(c\\) and \\(f'(c)\\) exists:",
          steps: [
            { id: "step_1", text: "\\(h>0\\): \\(\\frac{f(c+h)-f(c)}{h}\\leq 0\\Rightarrow f'(c)\\leq 0\\) (right derivative)." },
            { id: "step_2", text: "\\(h<0\\): quotient \\(\\geq 0\\Rightarrow f'(c)\\geq 0\\) (left derivative)." },
            { id: "step_3", text: "Both one-sided limits equal \\(f'(c)\\), so \\(f'(c)=0\\)." },
          ],
        },
      ],
      lead: "Optional, one-sided limits squeeze the derivative to zero.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_fermat_secant",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Secants near a local max",
        caption: "Slopes from right \\(\\leq 0\\); from left \\(\\geq 0\\): squeeze to 0.",
        params: { a: -1, h: 0.4 },
        scriptedTimeline: [
          { t: 0, params: { a: -1, h: 0.5 } },
          { t: 5, params: { a: -1, h: 0.15 } },
        ],
      },
    },
    notes:
      "Optional Fermat proof_sketch. secant_tangent at local max neighborhood (uses x² readout, voice ties to general f).",
  },
  {
    id: "s16_summary_and_key_takeaways",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways: Session 4 Continues",
    question: "",
    lead: "Critical numbers → candidates; closed interval method → absolute extrema:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Critical number:** \\(f'(c)=0\\) or \\(f'(c)\\) DNE, solve with Topics 10–13 rules." },
          { id: "bullet_2", text: "**Fermat:** interior local extremum \\(\\Rightarrow\\) critical; converse false (\\(x^3\\) at 0)." },
          { id: "bullet_3", text: "**EVT + closed interval:** evaluate \\(f\\) at critical points in \\((a,b)\\) **and** endpoints." },
          { id: "bullet_4", text: "**Sign test:** \\(f'\\) sign change classifies extrema, don't confuse \\(f'\\) sign with \\(f\\) sign." },
          { id: "bullet_5", text: "**Application:** farmer fence → \\(A'(x)=0\\) on \\((0,600)\\) gives absolute max." },
          { id: "bullet_6", text: "**Next, Topic 17:** Rolle's Theorem and the Mean Value Theorem, \\(f'(c)=0\\) meets existence theorems." },
        ],
      },
      {
        id: "final_check",
        type: "pause_and_reveal",
        title: "Final check",
        prompt: "On \\([0,3]\\) for \\(f(x)=x^2\\), where is the absolute maximum?",
        reveal: {
          text: "\\(f'(x)=2x=0\\) only at \\(x=0\\). Candidates: \\(f(0)=0\\), \\(f(3)=9\\). **Absolute max \\(=9\\) at \\(x=3\\)** (endpoint).",
        },
      },
    ],
    media: null,
    notes:
      "Six bullets + final pause. Teaser Topic 17 Rolle/MVT. Warm close, Session 4 applications arc.",
  },
];

export default slidesData;

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * COURSE DESIGN CHANGELOG
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * v1 → v2 (course design review, June 2026)
 *
 * WIDGETS
 *   - Unique flex_plot per slide: area preview, cubic, quartic interval, |x-2|
 *     piecewise, fractional cusp, farmer parabola.
 *   - s14 → visual_lab with cubic / quartic / warm-up cubic tabs.
 *   - s15 secant_tangent for Fermat proof sketch.
 *   - Removed source/sourceSpec/sourceCode/python_code from all blocks/media.
 *
 * RICH BLOCKS
 *   - theorem_box: critical number s02, Fermat s03, EVT s07.
 *   - math_solution_steps: warm-up s04, x³ s05, |x-2| s09, challenge s11,
 *     farmer s12–s13.
 *   - misconception_compare s06 (f' sign vs f sign).
 *   - pause_and_reveal on s05, s08, s10, s12, s16 final check.
 *   - nested_bullets closed interval workflow s07.
 *
 * PEDAGOGY
 *   - Welcome-back after Topic 15; callbacks f'(x)=0 from Topics 10–13.
 *   - Roadmap currentId path_topic_16; teaser Topic 17 MVT.
 *   - Farmer hook opens s01, closes s12–s13.
 *
 * ESTIMATED DURATION: ~20–22 min
 */