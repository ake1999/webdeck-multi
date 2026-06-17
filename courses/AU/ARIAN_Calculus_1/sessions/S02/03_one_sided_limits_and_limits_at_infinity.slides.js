// Generated from courses/Calculus/Materials/one_sided_limits_and_limits_at_infinity.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "03_one_sided_limits_and_limits_at_infinity",
  title: "One-Sided Limits and Limits at Infinity",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/one_sided_limits_and_limits_at_infinity.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "One-Sided Limits and Limits at Infinity",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: One-sided limits, infinity, asymptotes • Session 2 • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back, Topic 4 gave the computation toolkit; Topic 5 asks which direction you approach from and what happens as x grows without bound. Assumes limit laws and 0/0 algebra. Do not re-introduce Arian from scratch.",
  },
  {
    id: "learning_objectives",
    type: "bullets",
    hud: "Arian University • Calculus 1",
    title: "Learning Objectives",
    lead: "By the end of this session you will be able to:",
    blocks: [
      {
        id: "calculus1_roadmap",
        type: "course_path",
        layout: "topic_grid",
        currentId: "path_topic_05",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", status: "completed" },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", status: "completed" },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", status: "completed" },
          { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_05", number: 5, session: "S02 Limits and Continuity", label: "One-Sided Limits and Limits at Infinity", note: "Today", status: "current", expanded: true },
          { id: "path_topic_06", number: 6, session: "S02 Limits and Continuity", label: "The Squeeze Theorem", note: "Next", status: "next", expanded: true },
          { id: "path_topic_07", number: 7, session: "S02 Limits and Continuity", label: "Continuity and the Intermediate Value Theorem", status: "upcoming" },
          { id: "path_topic_08", number: 8, session: "S03 Derivative Foundations", label: "Instantaneous Rate of Change", status: "upcoming" },
          { id: "path_topic_09", number: 9, session: "S03 Derivative Foundations", label: "Formal Definition of the Derivative", status: "upcoming" },
          { id: "path_topic_10", number: 10, session: "S03 Derivative Foundations", label: "Power Rule and Basic Properties", status: "upcoming" },
          { id: "path_topic_11", number: 11, session: "S03 Derivative Foundations", label: "Power, Constant Multiple, Sum, and Difference Rules", status: "upcoming" },
          { id: "path_topic_12", number: 12, session: "S03 Derivative Foundations", label: "The Product Rule for Derivatives", status: "upcoming" },
          { id: "path_topic_13", number: 13, session: "S03 Derivative Foundations", label: "The Chain Rule", status: "upcoming" },
          { id: "path_topic_14", number: 14, session: "S03 Derivative Foundations", label: "Implicit Differentiation", status: "upcoming" },
          { id: "path_topic_15", number: 15, session: "S04 Applications of Derivatives", label: "Related Rates", status: "upcoming" },
          { id: "path_topic_16", number: 16, session: "S04 Applications of Derivatives", label: "Critical Points and Extrema", status: "upcoming" },
          { id: "path_topic_17", number: 17, session: "S04 Applications of Derivatives", label: "Rolle's Theorem and the Mean Value Theorem", status: "upcoming" },
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
      { id: "objective_1", text: "Read and compute one-sided limits from graphs and algebraic expressions." },
      { id: "objective_2", text: "Decide when a two-sided limit exists by comparing left- and right-hand limits." },
      { id: "objective_3", text: "Evaluate limits at \\(\\pm\\infty\\) for rational functions using the degree rule." },
      { id: "objective_4", text: "Interpret horizontal and vertical asymptotes via extended limits." },
      { id: "objective_5", text: "Distinguish \"DNE\" from \"extended limit is \\(\\infty\\)\" when both sides blow up the same way." },
    ],
    notes:
      "Roadmap first: Topics 1–4 done, Topic 5 today, Topic 6 Squeeze next. Five objectives map to one-sided → existence → infinity → asymptotes → pitfall.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: ONE-SIDED LIMITS + EXISTENCE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_two_paths_one_destination",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Two Paths, One Destination?",
    question: "If the left trail ends at 5000 ft and the right at 2000 ft, is there one lookout elevation?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Hiking metaphor: **direction matters**. In calculus, \\(\\lim_{x\\to a^-} f(x)\\) and \\(\\lim_{x\\to a^+} f(x)\\) can tell different stories, the two-sided limit exists only when they agree.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "Topic 3 introduced approach; Topic 4 let you **compute** limits. Today we add **which side** you approach from.",
        },
      ],
      lead: "Different approach paths → different limit values → two-sided limit may fail.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_piecewise_jump",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=\\begin{cases}x^2,&x<0\\2x+1,&0\\le x\\le2\\5-x,&x>2\\end{cases}",
          xDomain: [-3, 4],
          yDomain: [-0.5, 6],
          probeMin: -2.5,
          probeMax: 3.5,
          probeDefault: 1.5,
          branches: [
            { expr: "x*x", xMin: -3, xMax: 0, openAtEnd: true, stroke: "#64748b", strokeWidth: 3 },
            { expr: "2*x+1", xMin: 0, xMax: 2, stroke: "#c65a28" },
            { expr: "5-x", xMin: 2, xMax: 4, openAtStart: true, stroke: "#2563eb", strokeWidth: 3 },
          ],
          openPoints: [
            { x: 0, y: 0, class: "calculus-point open muted" },
            { x: 2, y: 3, class: "calculus-point open blue" },
          ],
          filledPoints: [{ x: 0, y: 1 }, { x: 2, y: 5 }],
          tags: [{ text: "hollow = excluded | filled = included", anchor: "end", tone: "muted" }],
        },
        title: "Piecewise graph: jump near x = 2",
        caption: "Drag x: left and right branches need not meet at the same height.",
        formulaLabel: "f",
        params: { x: 1.5 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.8 } },
          { t: 5, params: { x: 1.9 } },
          { t: 10, params: { x: 2.3 } },
        ],
      },
    },
    notes:
      "Trail story in voice; piecewise jump on screen. Welcome back, after limit laws, we refine *direction*. Walk x toward 2 from each side: branches target different heights. Core idea: one-sided limits can disagree.",
  },
  {
    id: "s02_one_sided_limits",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "One-Sided Limits",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$ \\lim_{x \\to a^-} f(x) = L \\qquad \\text{(left-hand limit)} $$",
            "$$ \\lim_{x \\to a^+} f(x) = L \\qquad \\text{(right-hand limit)} $$",
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "The minus/plus superscript means **direction**, not sign. \\(x\\to a^-\\): values **less than** \\(a\\). \\(x\\to a^+\\): values **greater than** \\(a\\).",
        },
      ],
      lead: "Notation for approaching \\(a\\) from one side only.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_approach_parabola",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "y_equals",
          expr: "x*x",
          formula: "f(x)=x^2",
          approachLimit: true,
          approachAt: 2,
          approachParam: "a",
          xDomain: [-0.2, 4.6],
          yDomain: [-0.5, 8],
          probeMin: 0,
          probeMax: 1.95,
          probeDefault: 0.5,
        },
        title: "Both sides agree on f(x) = x² at a = 2",
        caption: "Drag x: left and right both head toward L = 4.",
        formulaLabel: "f",
        params: { x: 0.5, a: 2 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 5, params: { x: 1.5 } },
          { t: 10, params: { x: 1.9 } },
          { t: 15, params: { x: 2.1 } },
        ],
      },
    },
    notes:
      "Define notation once. approach_parabola: both sides march to 4 at a=2. Contrast with jump on previous slide, smooth case is the baseline for existence.",
  },
  {
    id: "s03_warm_up_reading_one_sided_limits_from_a_graph",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: Reading One-Sided Limits from a Graph",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "\\text{Jump discontinuity at }x=2",
          steps: [
            { id: "step_1", math: "\\lim_{x\\to 2^-} f(x)=2", gap: "tight", say: "Trace the left branch." },
            { id: "step_2", math: "\\lim_{x\\to 2^+} f(x)=3", gap: "tight", say: "Trace the right branch." },
            { id: "step_3", math: "2\\neq 3 \\Rightarrow \\text{DNE}", say: "Unequal one-sided limits → two-sided limit does not exist." },
          ],
        },
      ],
      lead: "Read each branch separately; compare before claiming a two-sided limit.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_piecewise_read",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=\\begin{cases}x^2,&x<0\\2x+1,&0\\le x\\le2\\5-x,&x>2\\end{cases}",
          xDomain: [-3, 4],
          yDomain: [-0.5, 6],
          probeMin: -2.5,
          probeMax: 3.5,
          probeDefault: 1.5,
          branches: [
            { expr: "x*x", xMin: -3, xMax: 0, openAtEnd: true, stroke: "#64748b", strokeWidth: 3 },
            { expr: "2*x+1", xMin: 0, xMax: 2, stroke: "#c65a28" },
            { expr: "5-x", xMin: 2, xMax: 4, openAtStart: true, stroke: "#2563eb", strokeWidth: 3 },
          ],
          openPoints: [
            { x: 0, y: 0, class: "calculus-point open muted" },
            { x: 2, y: 3, class: "calculus-point open blue" },
          ],
          filledPoints: [{ x: 0, y: 1 }, { x: 2, y: 5 }],
          tags: [{ text: "hollow = excluded | filled = included", anchor: "end", tone: "muted" }],
        },
        title: "Read left vs right at the break",
        caption: "Open/filled dots mark excluded vs included endpoints.",
        formulaLabel: "f",
        params: { x: 1.2 },
        scriptedTimeline: [
          { t: 0, params: { x: 1.2 } },
          { t: 5, params: { x: 1.95 } },
          { t: 10, params: { x: 2.15 } },
        ],
      },
    },
    notes:
      "Graph-reading workflow in three steps. Drag x left of 2, then right of 2. Limit cares about **approach**, not the filled dot value.",
  },
  {
    id: "s04_your_turn_will_the_two_sided_limit_exist",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Will the Two-Sided Limit Exist?",
    question: "Prediction: Does \\(\\lim_{x\\to 2} f(x)\\) exist?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Same jump graph, **no labels yet**. Do the one-sided limits match?",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Write Yes or No with one-sided values.",
          reveal: { text: "**No**, left limit 2, right limit 3; they must be equal." },
        },
      ],
      lead: "Apply the existence test before I reveal.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_piecewise_predict",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=\\begin{cases}x^2,&x<0\\2x+1,&0\\le x\\le2\\5-x,&x>2\\end{cases}",
          xDomain: [-3, 4],
          yDomain: [-0.5, 6],
          probeMin: -2.5,
          probeMax: 3.5,
          probeDefault: 1.5,
          branches: [
            { expr: "x*x", xMin: -3, xMax: 0, openAtEnd: true, stroke: "#64748b", strokeWidth: 3 },
            { expr: "2*x+1", xMin: 0, xMax: 2, stroke: "#c65a28" },
            { expr: "5-x", xMin: 2, xMax: 4, openAtStart: true, stroke: "#2563eb", strokeWidth: 3 },
          ],
          openPoints: [
            { x: 0, y: 0, class: "calculus-point open muted" },
            { x: 2, y: 3, class: "calculus-point open blue" },
          ],
          filledPoints: [{ x: 0, y: 1 }, { x: 2, y: 5 }],
          tags: [{ text: "hollow = excluded | filled = included", anchor: "end", tone: "muted" }],
        },
        title: "Predict from the graph",
        caption: "No limit labels: decide from the branches alone.",
        formulaLabel: "f",
        params: { x: 1.6 },
        scriptedTimeline: [
          { t: 0, params: { x: 1.4 } },
          { t: 6, params: { x: 2.2 } },
        ],
      },
    },
    notes:
      "YouTube pause, ten-second beat. Students cite both one-sided values. Reveal: DNE because 2≠3.\n\nStudent prompt: Prediction: Does the two-sided limit exist?",
  },
  {
    id: "s05_two_sided_limit_existence_condition",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Two-Sided Limit Existence Condition",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$ \\lim_{x\\to a} f(x) = L \\iff \\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x) = L $$",
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "If either one-sided limit fails to exist, or they differ, the two-sided limit **does not exist** (as a real number).",
        },
      ],
      lead: "Existence iff both sides exist and agree.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_approach_agree",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "y_equals",
          expr: "x*x",
          formula: "f(x)=x^2",
          approachLimit: true,
          approachAt: 2,
          approachParam: "a",
          xDomain: [-0.2, 4.6],
          yDomain: [-0.5, 8],
          probeMin: 0,
          probeMax: 1.95,
          probeDefault: 0.5,
        },
        title: "Both sides → L = 4 at a = 2",
        caption: "Horizontal guide at L: branches meet the same target.",
        formulaLabel: "f",
        params: { x: 1.3, a: 2 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.8 } },
          { t: 5, params: { x: 1.95 } },
          { t: 10, params: { x: 2.05 } },
        ],
      },
    },
    notes:
      "State the iff condition. Widget shows agreeing sides on x² at 2. Bridge to algebraic one-sided work next.",
  },
  {
    id: "s06_standard_algebraic_example_absolute_value",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Absolute-Value Quotient (Medium)",
    question: "Now compute \\(\\lim_{x\\to 3^+} \\frac{|x-3|}{x-3}\\) on your own.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "\\lim_{x\\to 3^-}\\frac{|x-3|}{x-3}",
          steps: [
            { id: "step_1", op: "=>", math: "x<3 \\Rightarrow |x-3|=-(x-3)", gap: "tight", say: "Absolute value flips on the left." },
            { id: "step_2", math: "\\frac{-(x-3)}{x-3}=-1", gap: "tight", say: "Cancel the factor." },
            { id: "step_3", math: "\\lim_{x\\to 3^-}=-1", say: "Left-hand limit is −1." },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Your turn",
          prompt: "Find the right-hand limit before continuing.",
          reveal: { text: "\\(\\lim_{x\\to 3^+}=+1\\), for \\(x>3\\), \\(|x-3|=x-3\\). Two-sided limit **DNE**." },
        },
      ],
      lead: "Same jump pattern as \\(|x|/x\\), shifted to \\(x=3\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_abs_quotient",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=\\frac{|x|}{x}",
          xDomain: [-2.2, 2.2],
          yDomain: [-2.2, 2.2],
          probeMin: -1.8,
          probeMax: 1.8,
          probeDefault: -0.6,
          branches: [
            { expr: "-1", xMin: -2, xMax: 0, openAtEnd: true, stroke: "#2563eb" },
            { expr: "1", xMin: 0, xMax: 2, openAtStart: true, stroke: "#c65a28" },
          ],
          openPoints: [{ x: 0, y: 0, class: "calculus-point open" }],
          vLines: [{ x: 0 }],
          tags: [
            { text: "left → −1", x: -1.4, y: -0.4, tone: "muted" },
            { text: "right → +1", x: 0.8, y: 1.3, tone: "muted" },
          ],
        },
        title: "|x|/x: jump at 0 (same idea at 3)",
        caption: "Left plateau −1, right plateau +1.",
        formulaLabel: "f",
        params: { x: -0.5 },
        scriptedTimeline: [
          { t: 0, params: { x: -1.0 } },
          { t: 5, params: { x: -0.1 } },
          { t: 10, params: { x: 0.1 } },
          { t: 15, params: { x: 1.0 } },
        ],
      },
    },
    notes:
      "Walk left limit algebraically; pause for right limit. abs_quotient is the prototype at 0, same sign logic at 3. Topic 3 callback on jump discontinuities.\n\nStudent prompt: Now compute the right-hand limit.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: INFINITY + ASYMPTOTES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s07_limits_at_infinity_horizontal_asymptotes",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Limits at Infinity (Horizontal Asymptotes)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$ \\lim_{x\\to \\infty} f(x) = L \\qquad \\text{(horizontal asymptote } y=L\\text{)} $$",
            "$$ \\lim_{x\\to -\\infty} f(x) = M \\qquad \\text{(may differ from }L\\text{)} $$",
          ],
        },
        {
          id: "left_example",
          type: "paragraph",
          text: "Example: \\(f(x)=2+\\frac{\\sin x}{x}\\) oscillates but \\(\\lim_{x\\to\\infty} f(x)=2\\). Use limit laws from Topic 4 on dominant terms.",
        },
      ],
      lead: "Ask what \\(f(x)\\) approaches as \\(|x|\\) grows, not what happens at one finite point.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_bullets",
          type: "nested_bullets",
          items: [
            { id: "b1", text: "**Horizontal asymptote**, graph settles toward \\(y=L\\) far left/right." },
            { id: "b2", text: "Rational functions: compare **degrees** (degree rule coming next)." },
            { id: "b3", text: "Limit laws still apply when individual limits at \\(\\infty\\) exist." },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Shift from finite \\(a\\) to unbounded \\(x\\). Mention 2+sin(x)/x verbally, oscillation dampens. Callback Topic 4: divide by highest power.",
  },
  {
    id: "s08_common_pitfall_infinite_limits",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Common Pitfall: Infinite Limits (Medium)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Blowing up ≠ always DNE",
          pairs: [
            {
              label: "❌ Too quick",
              text: "\"\\(\\lim_{x\\to 0} \\frac{1}{x^2}\\) DNE because it goes to infinity.\"",
            },
            {
              label: "✅ Precise",
              text: "Both sides → \\(+\\infty\\): write the **extended limit** \\(=\\infty\\). For \\(\\frac{1}{x}\\), left \\(\\to-\\infty\\), right \\(\\to+\\infty\\) → truly **DNE** even as an extended limit.",
            },
          ],
        },
      ],
      lead: "Check **both** one-sided infinite limits before saying DNE.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_formulas",
          type: "formula_block",
          formulas: [
            "\\(\\displaystyle\\lim_{x\\to 0^+}\\frac{1}{x^2}=+\\infty,\\;\\lim_{x\\to 0^-}\\frac{1}{x^2}=+\\infty\\)",
            "\\(\\displaystyle\\lim_{x\\to 0^+}\\frac{1}{x}=+\\infty,\\;\\lim_{x\\to 0^-}\\frac{1}{x}=-\\infty\\)",
          ],
        },
        {
          id: "right_note",
          type: "paragraph",
          text: "Extended limits describe **unbounded growth**, not a real number, but meaningful when both sides agree.",
        },
      ],
      media: null,
    },
    notes:
      "misconception_compare on the 1/x² vs 1/x trap. Students conflate blow-up with DNE. Name extended real limits explicitly.",
  },
  {
    id: "s09_infinite_limits_vertical_asymptotes",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Infinite Limits (Vertical Asymptotes)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$ \\lim_{x\\to a} f(x) = \\infty \\quad \\text{or} \\quad \\lim_{x\\to a} f(x) = -\\infty $$",
            "\\text{Extended limit, conveys unbounded growth near }x=a.",
          ],
        },
        {
          id: "left_example",
          type: "paragraph",
          text: "\\(f(x)=\\frac{1}{(x-2)^2}\\): vertical asymptote at \\(x=2\\); both sides go to \\(+\\infty\\).",
        },
      ],
      lead: "Vertical asymptote = graph shoots up/down at a finite \\(a\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_bullets",
          type: "nested_bullets",
          items: [
            { id: "v1", text: "Check \\(\\lim_{x\\to a^-}\\) and \\(\\lim_{x\\to a^+}\\) separately." },
            { id: "v2", text: "Same signed infinity on both sides → extended limit \\(=\\infty\\) or \\(-\\infty\\)." },
            { id: "v3", text: "Opposite signs → DNE as an extended limit." },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Connect vertical asymptotes to one-sided infinite limits. Example 1/(x−2)²: both sides +∞. Contrast s08 pitfall.",
  },
  {
    id: "s10_edge_case_limits_at_infinity_with_different_degrees",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Edge Case: Degree Rule at Infinity (Medium)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "\\lim_{x\\to \\infty}\\frac{2x^3-5x}{3x^2+1}",
          steps: [
            { id: "step_1", math: "\\deg(\\text{num})=3>\\deg(\\text{den})=2", gap: "tight", say: "Numerator grows faster." },
            { id: "step_2", math: "\\frac{2x-5/x}{3+1/x^2}", gap: "tight", say: "Divide by highest denominator power x²." },
            { id: "step_3", math: "x\\to\\infty:\\;5/x\\to0,\\;1/x^2\\to0", gap: "tight", say: "Small terms vanish." },
            { id: "step_4", math: "\\frac{2x}{3}\\to\\infty", say: "Limit is \\(\\infty\\), no horizontal asymptote." },
          ],
        },
      ],
      lead: "Degree rule shortcut: higher numerator degree → limit \\(\\infty\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_rule",
          type: "nested_bullets",
          items: [
            { id: "r1", text: "\\(\\deg(\\text{num})>\\deg(\\text{den})\\) → \\(\\lim=\\pm\\infty\\)" },
            { id: "r2", text: "\\(\\deg(\\text{num})<\\deg(\\text{den})\\) → \\(\\lim=0\\)" },
            { id: "r3", text: "Equal degrees → ratio of **leading coefficients**" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Worked degree-rule example. Topic 4 habit: divide by highest power. Quick reference bullets on the right.",
  },
  {
    id: "s11_application_profit_model",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Profit Model (Medium)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "P(t)=\\frac{100t}{t+5}\\quad (\\text{thousands }\\$,\\; t\\text{ years})",
          steps: [
            { id: "step_1", math: "\\lim_{t\\to\\infty}P(t)=\\lim_{t\\to\\infty}\\frac{100t}{t+5}", gap: "tight", say: "Long-run profit." },
            { id: "step_2", math: "\\frac{100}{1+5/t}", gap: "tight", say: "Divide numerator and denominator by t." },
            { id: "step_3", math: "5/t\\to0", gap: "tight", say: "Vanishing term." },
            { id: "step_4", math: "P(t)\\to 100", say: "Steady profit ≈ \\$100{,}000/year, horizontal asymptote y = 100." },
          ],
        },
      ],
      lead: "Equal degrees → leading-coefficient ratio gives the asymptote.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_interp",
          type: "nested_bullets",
          items: [
            { id: "i1", text: "**Model:** profit grows then **levels off**." },
            { id: "i2", text: "\\(\\lim_{t\\to\\infty} P(t)=100\\) thousand = **capacity ceiling**." },
            { id: "i3", text: "Same algebra as rational limits at \\(\\infty\\) from Topic 4." },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Business framing. Equal degrees → 100/1. Interpret horizontal asymptote as long-run profit. Callback Topic 4 quotient/degree thinking.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: CHALLENGE. LAB, SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s12_challenge_optional_proof_relationship_between_one_sided_and_two_sided_limits",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Challenge (Optional): One-Sided ⇒ Two-Sided",
    question: "",
    lead: "Optional ε–δ proof, skip if time-limited.",
    blocks: [
      {
        id: "on_screen_text",
        type: "paragraph",
        text: "**Theorem:** If \\(\\lim_{x\\to a^-} f(x)=L\\) and \\(\\lim_{x\\to a^+} f(x)=L\\), then \\(\\lim_{x\\to a} f(x)=L\\).",
      },
      {
        id: "body_steps",
        type: "proof_sketch",
        title: "Proof sketch (ε–δ)",
        steps: [
          { id: "body_step_1", text: "Left limit: given ε, ∃δ₁ with \\(a-\\delta_1<x<a\\Rightarrow|f(x)-L|<\\varepsilon\\)." },
          { id: "body_step_2", text: "Right limit: ∃δ₂ with \\(a<x<a+\\delta_2\\Rightarrow|f(x)-L|<\\varepsilon\\)." },
          { id: "body_step_3", text: "Let \\(\\delta=\\min(\\delta_1,\\delta_2)\\). Then \\(0<|x-a|<\\delta\\) forces \\(|f(x)-L|<\\varepsilon\\)." },
        ],
      },
    ],
    media: null,
    notes:
      "Optional rigor, connects Topic 3 epsilon idea to today's iff condition. Brief if skipping.",
  },
  {
    id: "s13_interactive_lab_explore_one_sided_limits",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Explore One-Sided Limits",
    question: "Drag x across 0, do the plateaus agree?",
    lead: "f(x) = |x|/x: sign function with a jump at 0.",
    labSiteNote: "On YouTube: demo tab A. On the site: try all three tabs and drag x.",
    labExamples: [
      {
        id: "lab_left",
        label: "A · Sign at 0",
        formula: "f(x)=\\frac{|x|}{x}",
        steps: [
          { id: "step_1", text: "Keep x negative, trace the left plateau." },
          { id: "step_2", text: "Left-hand limit = −1." },
        ],
        params: {
          x: -0.8,
          plot: {
            plotType: "piecewise",
            formula: "f(x)=\\frac{|x|}{x}",
            xDomain: [-2, 2],
            yDomain: [-1.6, 1.6],
            branches: [
              { expr: "-1", xMin: -2, xMax: 0, openAtEnd: true, stroke: "#2563eb" },
              { expr: "1", xMin: 0, xMax: 2, openAtStart: true, stroke: "#c65a28" },
            ],
            vLines: [{ x: 0 }],
            tags: [
              { text: "left → −1", x: -1.2, y: -0.35 },
              { text: "right → +1", x: 0.6, y: 1.15 },
            ],
          },
        },
      },
      {
        id: "lab_right",
        label: "B · Jump at 2",
        formula: "f(x)=\\begin{cases}x,&x<2\\\\x+1,&x>2\\end{cases}",
        steps: [
          { id: "step_1", text: "Blue branch from the left, orange from the right." },
          { id: "step_2", text: "Left → 2, right → 3, two-sided limit DNE." },
        ],
        params: {
          x: 1.4,
          plot: {
            plotType: "piecewise",
            formula: "f(x)=\\begin{cases}x,&x<2\\\\x+1,&x>2\\end{cases}",
            xDomain: [0, 4],
            yDomain: [0, 5],
            branches: [
              { expr: "x", xMin: 0, xMax: 2, openAtEnd: true, stroke: "#2563eb" },
              { expr: "x+1", xMin: 2, xMax: 4, openAtStart: true, stroke: "#c65a28" },
            ],
            vLines: [{ x: 2 }],
            tags: [
              { text: "left → 2", x: 1, y: 1.4 },
              { text: "right → 3", x: 2.6, y: 3.4 },
            ],
          },
        },
      },
      {
        id: "lab_predict",
        label: "C · Predict",
        formula: "\\lim_{x\\to 2} f(x)?",
        steps: [
          { id: "step_1", text: "Labels hidden, compare one-sided limits at the jump." },
          { id: "step_2", text: "Answer: **DNE**, 2 ≠ 3." },
        ],
        params: {
          x: 1.8,
          hideLabels: true,
          plot: {
            plotType: "piecewise",
            formula: "f(x)=\\begin{cases}x,&x<2\\\\x+1,&x>2\\end{cases}",
            xDomain: [0, 4],
            yDomain: [0, 5],
            branches: [
              { expr: "x", xMin: 0, xMax: 2, openAtEnd: true, stroke: "#2563eb" },
              { expr: "x+1", xMin: 2, xMax: 4, openAtStart: true, stroke: "#c65a28" },
            ],
            vLines: [{ x: 2 }],
            hideLabels: true,
          },
        },
      },
    ],
    media: {
      id: "lab_one_sided_flex",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "One-sided limit explorer",
      caption: "Each tab loads a different plot spec: drag probe x.",
      formulaLabel: "f",
      plot: {
        plotType: "piecewise",
        formula: "f(x)=\\frac{|x|}{x}",
        xDomain: [-2, 2],
        yDomain: [-1.6, 1.6],
        branches: [
          { expr: "-1", xMin: -2, xMax: 0, openAtEnd: true, stroke: "#2563eb" },
          { expr: "1", xMin: 0, xMax: 2, openAtStart: true, stroke: "#c65a28" },
        ],
        vLines: [{ x: 0 }],
        probe: true,
        probeDefault: -0.6,
      },
      params: { x: -0.6 },
      scriptedTimeline: [
        { t: 0, params: { x: -1.0 } },
        { t: 5, params: { x: -0.1 } },
        { t: 10, params: { x: 0.1 } },
        { t: 15, params: { x: 1.0 } },
      ],
    },
    notes:
      "visual_lab layout: short steps left, abs_quotient right. Demo tab A on video; B/C on site. Same function as Topic 3, now students own the one-sided readout.",
  },
  {
    id: "s14_summary_key_takeaways",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways",
    question: "",
    lead: "Your one-sided + infinity toolkit, Session 2 continues:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**One-sided limits**, \\(\\lim_{x\\to a^-}\\) and \\(\\lim_{x\\to a^+}\\) describe direction; notation is not a sign on \\(a\\)." },
          { id: "bullet_2", text: "**Existence**, two-sided limit exists iff both one-sided limits exist and are **equal**." },
          { id: "bullet_3", text: "**Extended limits**, both sides to the same \\(\\pm\\infty\\) is meaningful; opposite infinities mean DNE." },
          { id: "bullet_4", text: "**Limits at \\(\\infty\\)**, horizontal asymptotes; degree rule for rationals (Topic 4 algebra carries over)." },
          { id: "bullet_5", text: "**Vertical asymptotes**, check one-sided infinite limits at finite \\(a\\)." },
          { id: "bullet_6", text: "**Next topic**, The Squeeze Theorem: trap a limit between two agreeing bounds." },
        ],
      },
      {
        id: "final_check",
        type: "pause_and_reveal",
        title: "Final check",
        prompt: "Which has a two-sided limit? A) \\(\\lim_{x\\to 2} (x^2)\\)  B) \\(\\lim_{x\\to 0} |x|/x\\)  C) \\(\\lim_{x\\to 0} 1/x^2\\)  D) \\(\\lim_{x\\to\\infty} \\frac{2x}{x+1}\\)",
        reveal: { text: "**A and D**, A: both sides agree at 2; D: limit 2 at \\(\\infty\\). B: jump; C: extended limit \\(\\infty\\), not a real number." },
      },
    ],
    media: null,
    notes:
      "Six bullets + final MC (A and D). Teaser Topic 6 Squeeze. Thank students, computation (Topic 4) plus direction (Topic 5) sets up bounding arguments next.",
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
 *   - Replaced all limit_epsilon placeholders with function_analysis variants:
 *     piecewise, approach_parabola, abs_quotient; s13 visual_lab → flex_plot (3 unique plot specs).
 *   - Removed source/sourceSpec/sourceCode/python_code from all media blocks.
 *
 * RICH BLOCKS
 *   - math_solution_steps on s03 warm-up, s06 abs value, s10 degree rule, s11 profit.
 *   - misconception_compare on s08 infinite-limits pitfall.
 *   - pause_and_reveal on s04, s06, s14 final check; nested_bullets on summary.
 *   - proof_sketch on optional s12 challenge.
 *
 * PEDAGOGY
 *   - Welcome-back after Topic 4 limit laws; roadmap currentId path_topic_05.
 *   - Topic 6 Squeeze Theorem teased on summary; callbacks to Topics 3–4.
 *   - s13 converted to visual_lab with labExamples tabs.
 *
 * ESTIMATED DURATION: ~19–22 min
 */