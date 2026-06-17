// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing source material.

export const topicMeta = {
  id: "04_first_and_second_derivative_tests",
  title: "First and Second Derivative Tests",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "First and Second Derivative Tests",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic 18 · Derivative Tests · Session 4: Applications of Derivatives · ~20 min",
    notes:
      "Welcome back, Topic 17 (MVT) linked average slope to an interior tangent. Today we **classify** critical points: is a flat spot a peak, valley, or neither? Teaser: Topic 19 optimization.",
  },
  {
    id: "learning_objectives",
    type: "bullets",
    hud: "Arian University • Calculus 1",
    title: "Learning Objectives",
    lead: "By the end of this topic you will be able to:",
    blocks: [
      {
        id: "calculus1_roadmap",
        type: "course_path",
        layout: "topic_grid",
        currentId: "path_topic_18",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", status: "completed" },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", status: "completed" },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", status: "completed" },
          { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", status: "completed" },
          { id: "path_topic_05", number: 5, session: "S02 Limits and Continuity", label: "One-Sided Limits and Limits at Infinity", status: "completed" },
          { id: "path_topic_06", number: 6, session: "S02 Limits and Continuity", label: "The Squeeze Theorem", status: "completed" },
          { id: "path_topic_07", number: 7, session: "S02 Limits and Continuity", label: "Continuity and the Intermediate Value Theorem", status: "completed" },
          { id: "path_topic_08", number: 8, session: "S03 Derivative Foundations", label: "Instantaneous Rate of Change", status: "completed" },
          { id: "path_topic_09", number: 9, session: "S03 Derivative Foundations", label: "Formal Definition of the Derivative", status: "completed" },
          { id: "path_topic_10", number: 10, session: "S03 Derivative Foundations", label: "Power Rule and Basic Properties", status: "completed" },
          { id: "path_topic_11", number: 11, session: "S03 Derivative Foundations", label: "Power, Constant Multiple, Sum, Difference", status: "completed" },
          { id: "path_topic_12", number: 12, session: "S03 Derivative Foundations", label: "The Product Rule", status: "completed" },
          { id: "path_topic_13", number: 13, session: "S03 Derivative Foundations", label: "The Chain Rule", status: "completed" },
          { id: "path_topic_14", number: 14, session: "S03 Derivative Foundations", label: "Implicit Differentiation", status: "completed" },
          { id: "path_topic_15", number: 15, session: "S04 Applications", label: "Related Rates", status: "completed" },
          { id: "path_topic_16", number: 16, session: "S04 Applications", label: "Critical Points and Extrema", status: "completed" },
          { id: "path_topic_17", number: 17, session: "S04 Applications", label: "Rolle's Theorem and the MVT", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_18", number: 18, session: "S04 Applications", label: "First and Second Derivative Tests", note: "Today", status: "current", expanded: true },
          { id: "path_topic_19", number: 19, session: "S04 Applications", label: "Optimization Problems", note: "Next", status: "next", expanded: true },
          { id: "path_topic_20", number: 20, session: "S04 Applications", label: "L'Hopital's Rule", status: "upcoming" },
          { id: "path_topic_21", number: 21, session: "S04 Applications", label: "Newton's Method and Linear Approximations", status: "upcoming" },
          { id: "path_topic_22", number: 22, session: "S05 Integration Foundations", label: "Antiderivatives and Indefinite Integrals", status: "upcoming" },
          { id: "path_topic_23", number: 23, session: "S05 Integration Foundations", label: "Approximating Area with Riemann Sums", status: "upcoming" },
          { id: "path_topic_24", number: 24, session: "S05 Integration Foundations", label: "The Definite Integral", status: "upcoming" },
          { id: "path_topic_25", number: 25, session: "S05 Integration Foundations", label: "The Fundamental Theorem of Calculus", status: "upcoming" },
          { id: "path_topic_26", number: 26, session: "S05 Integration Foundations", label: "Integration by Substitution", status: "upcoming" },
        ],
      },
    ],
    bullets: [
      { id: "objective_1", text: "Find **critical numbers** where \\(f'(c)=0\\) or \\(f'(c)\\) is undefined." },
      { id: "objective_2", text: "Apply the **First Derivative Test** (sign chart) to classify local extrema." },
      { id: "objective_3", text: "Apply the **Second Derivative Test** when \\(f''(c)\\neq 0\\)." },
      { id: "objective_4", text: "Know when the second test is **inconclusive** and fall back to the first." },
    ],
    notes:
      "Roadmap: Topic 17 MVT done; Topic 18 today; Topic 19 optimization next. Callback Topic 16 critical-point list + Topic 17 f′(c)=0.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: INTUITION + CRITICAL NUMBERS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_hiking_the_derivative_trail",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Hiking the Derivative Trail",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "**Elevation** \\(f(x)\\), **steepness** \\(f'(x)\\). Uphill \\(f'>0\\), downhill \\(f'<0\\), flat summit/valley \\(f'=0\\).",
        },
        {
          id: "left_bullets",
          type: "nested_bullets",
          items: [
            { id: "b1", text: "**First test:** does \\(f'\\) change sign at the flat spot?" },
            { id: "b2", text: "**Second test:** does the trail **curve up** (\\(f''>0\\)) or **down** (\\(f''<0\\))?" },
          ],
        },
      ],
      lead: "Two tests answer: which way before/after? and how does the trail bend?",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_hike_profile",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Mountain profile: max and min",
        caption: "Flat spots at critical x-values; probe the slope.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=-0.1*x^3+1.5*x^2-4*x+10",
          xDomain: [0, 12],
          yDomain: [2, 12],
          probe: true,
          probeDefault: 2.8,
          curves: [{ id: "f", expr: "-0.1*x^3+1.5*x^2-4*x+10", stroke: "#2563eb", strokeWidth: 4 }],
          filledPoints: [
            { x: 2.76, y: 8.24 },
            { x: 9.57, y: 5.89 },
          ],
          tags: [
            { text: "local max", x: 2.5, y: 9.5 },
            { text: "local min", x: 9.2, y: 6.8 },
          ],
        },
        params: { x: 2 },
        scriptedTimeline: [
          { t: 0, params: { x: 1 } },
          { t: 6, params: { x: 2.8 } },
          { t: 12, params: { x: 9.5 } },
        ],
      },
    },
    notes:
      "Hiking metaphor opens the topic. flex_plot cubic profile with approximate critical points marked. Sets up both tests.",
  },
  {
    id: "s02_critical_numbers_the_foundation",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Critical Numbers: The Foundation",
    question: "Find the critical numbers of f(x) = x² − 4x + 3.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_def",
          type: "paragraph",
          text: "**Critical number** \\(c\\): in domain and \\(f'(c)=0\\) **or** \\(f'(c)\\) undefined. Candidates for extrema, **not guaranteed** (e.g. \\(x^3\\) at 0).",
        },
        {
          id: "left_workflow",
          type: "nested_bullets",
          items: [
            { id: "w1", text: "① Find all \\(c\\) with \\(f'(c)=0\\) or \\(f'\\) undefined." },
            { id: "w2", text: "② Build a **sign chart** for \\(f'\\) on intervals between critical numbers." },
            { id: "w3", text: "③ Classify with FDT or SDT." },
          ],
        },
      ],
      lead: "Topic 16 listed candidates, today we classify them.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_critical_compare",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "x³ vs x² at x=0",
        caption: "Both have f′(0)=0; only x² is an extremum.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=x^3",
          xDomain: [-1.8, 1.8],
          yDomain: [-3, 3],
          curves: [
            { id: "cubic", expr: "x^3", stroke: "#c65a28", strokeWidth: 4 },
            { id: "quad", expr: "x^2", stroke: "#2563eb", strokeWidth: 3, dashed: true },
          ],
          filledPoints: [{ x: 0, y: 0 }],
          tags: [
            { text: "x³, inflection, not extremum", x: -1.2, y: 2 },
            { text: "x², minimum", x: 0.5, y: 2.2 },
          ],
        },
        params: { x: 0.6 },
      },
    },
    notes:
      "nested_bullets sign-chart workflow preview. flex_plot contrasts x³ inflection vs x² minimum. Callback Topic 16.\n\nStudent prompt on slide question.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: FIRST DERIVATIVE TEST
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s03_first_derivative_test_statement",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "First Derivative Test",
    question: "Why test both sides of c?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "First Derivative Test",
          text: "If \\(f\\) is continuous at critical number \\(c\\): \\(f'\\) changes \\(+\\to-\\) ⇒ **local max**; \\(-\\to+\\) ⇒ **local min**; **no sign change** ⇒ **not an extremum**. Test one point on **each side** of \\(c\\).",
        },
        {
          id: "left_workflow",
          type: "nested_bullets",
          items: [
            { id: "s1", text: "Mark critical numbers on a number line." },
            { id: "s2", text: "Pick test values in each open interval." },
            { id: "s3", text: "Record \\(f'\\) sign: \\(+\\) increasing, \\(-\\) decreasing." },
            { id: "s4", text: "Read sign **changes** at each \\(c\\)." },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause",
          prompt: "Why is one-sided testing risky?",
          reveal: { text: "One sign alone does not tell peak vs valley, you need the **change** across \\(c\\)." },
        },
      ],
      lead: "Sign chart of f′ classifies each critical point.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_fdt_sign",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f, f′: local max pattern",
        caption: "Orange f′ crosses + to − at the peak.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=-x^2+4",
          xDomain: [-2.5, 2.5],
          yDomain: [-1, 5],
          curves: [
            { id: "f", expr: "-x^2+4", stroke: "#2563eb", strokeWidth: 4 },
            { id: "fp", expr: "-2*x", stroke: "#c65a28", strokeWidth: 3 },
          ],
          vLines: [{ x: 0 }],
          filledPoints: [{ x: 0, y: 4 }],
          tags: [{ text: "f': + → −", x: 0.4, y: 2.5 }],
        },
        params: { x: 0.8 },
        scriptedTimeline: [
          { t: 0, params: { x: -1.2 } },
          { t: 6, params: { x: 0 } },
          { t: 12, params: { x: 1.2 } },
        ],
      },
    },
    notes:
      "theorem_box FDT + nested_bullets sign-chart workflow. flex_plot f and f′ on −x²+4. pause_and_reveal on one-sided trap.\n\nStudent prompt on slide question.",
  },
  {
    id: "s04_warm_up_example_f_x_x2_6x_5",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: f(x) = x² − 6x + 5",
    question: "Try f(x) = −x² + 4x − 1 on your own.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f(x)=x^2-6x+5",
          steps: [
            { id: "step_1", op: "=>", math: "f'(x)=2x-6", gap: "tight", say: "Differentiate." },
            { id: "step_2", math: "2x-6=0 \\Rightarrow x=3", gap: "tight", say: "Critical number." },
            { id: "step_3", math: "f'(2)=-2<0,\\ f'(4)=2>0", gap: "tight", say: "Sign test both sides." },
            { id: "step_4", math: "-\\to+ \\Rightarrow \\text{local min at }x=3", gap: "tight", say: "FDT conclusion." },
            { id: "step_5", math: "f(3)=-4", gap: "loose", say: "Minimum value." },
          ],
        },
      ],
      lead: "Full sign-chart workflow on a simple parabola.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_warmup_plot",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f, f′, f″ at x=3",
        caption: "Blue f, orange f′, green f″: minimum where f′ flips − to +.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=x^2-6*x+5",
          xDomain: [0, 6],
          yDomain: [-6, 6],
          curves: [
            { id: "f", expr: "x^2-6*x+5", stroke: "#2563eb", strokeWidth: 4 },
            { id: "fp", expr: "2*x-6", stroke: "#c65a28", strokeWidth: 3 },
            { id: "fpp", expr: "2", stroke: "#16a34a", strokeWidth: 2, dashed: true },
          ],
          vLines: [{ x: 3 }],
          filledPoints: [{ x: 3, y: -4 }],
        },
        params: { x: 3 },
      },
    },
    notes:
      "math_solution_steps warm-up. flex_plot shows f, f′, f″ together (f″=2>0 confirms min). Unique curves per slide rule.\n\nStudent prompt on slide question.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: SECOND DERIVATIVE TEST
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s05_second_derivative_test_statement",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Second Derivative Test",
    question: "Memory aid: smile = min, frown = max.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Second Derivative Test",
          text: "Suppose \\(f'(c)=0\\) and \\(f''\\) exists near \\(c\\). \\(f''(c)>0\\) ⇒ **local min** (concave up); \\(f''(c)<0\\) ⇒ **local max** (concave down); \\(f''(c)=0\\) ⇒ **inconclusive**, use the First Derivative Test.",
        },
        {
          id: "left_aid",
          type: "nested_bullets",
          items: [
            { id: "a1", text: "😊 \\(f''>0\\), bowl shape, **minimum**." },
            { id: "a2", text: "😟 \\(f''<0\\), dome shape, **maximum**." },
            { id: "a3", text: "Topic 17 link: \\(f''\\) measures how \\(f'\\) itself is changing." },
          ],
        },
      ],
      lead: "Faster when f″(c) is clearly positive or negative.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_sdt_concavity",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Concave up vs concave down",
        caption: "Probe near 0: x² smiles, −x² frowns.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=x^2",
          xDomain: [-2, 2],
          yDomain: [-2, 4],
          curves: [
            { id: "up", expr: "x^2", stroke: "#16a34a", strokeWidth: 4 },
            { id: "down", expr: "-x^2+2", stroke: "#dc2626", strokeWidth: 3, dashed: true },
          ],
          filledPoints: [
            { x: 0, y: 0 },
            { x: 0, y: 2 },
          ],
          tags: [
            { text: "f''>0 min", x: -1.4, y: 2.5 },
            { text: "f''<0 max", x: 0.4, y: 3.2 },
          ],
        },
        params: { x: 0.5 },
        scriptedTimeline: [
          { t: 0, params: { x: -0.8 } },
          { t: 6, params: { x: 0 } },
          { t: 12, params: { x: 0.8 } },
        ],
      },
    },
    notes:
      "theorem_box SDT + MVT Topic 17 callback in nested_bullets. flex_plot smile/frown pair, distinct from s04 triple plot.\n\nStudent prompt on slide question.",
  },
  {
    id: "s06_standard_example_f_x_x3_3x2_1",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Standard Example: f(x) = x³ − 3x² + 1",
    question: "Would FDT agree with these SDT conclusions?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          splitAfter: 3,
          problem: "f(x)=x^3-3x^2+1",
          steps: [
            { id: "step_1", op: "=>", math: "f'(x)=3x^2-6x=3x(x-2)", gap: "tight", say: "Factor derivative." },
            { id: "step_2", math: "x=0,\\ x=2", gap: "tight", say: "Critical numbers." },
            { id: "step_3", math: "f''(x)=6x-6", gap: "tight", say: "Second derivative." },
            { id: "step_4", math: "f''(0)=-6<0 \\Rightarrow \\text{local max}", gap: "tight", say: "SDT at 0." },
            { id: "step_5", math: "f''(2)=6>0 \\Rightarrow \\text{local min}", gap: "loose", say: "SDT at 2." },
          ],
        },
      ],
      lead: "Exam classic, two critical points, clear f″ signs.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cubic_triple",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f, f′, f″ together",
        caption: "Three colors: classify 0 as max, 2 as min.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=x^3-3*x^2+1",
          xDomain: [-0.8, 3.2],
          yDomain: [-4, 3],
          curves: [
            { id: "f", expr: "x^3-3*x^2+1", stroke: "#2563eb", strokeWidth: 4 },
            { id: "fp", expr: "3*x^2-6*x", stroke: "#c65a28", strokeWidth: 3 },
            { id: "fpp", expr: "6*x-6", stroke: "#16a34a", strokeWidth: 2 },
          ],
          vLines: [{ x: 0 }, { x: 2 }],
          filledPoints: [
            { x: 0, y: 1 },
            { x: 2, y: -3 },
          ],
        },
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: -0.3 } },
          { t: 6, params: { x: 1 } },
          { t: 12, params: { x: 2.5 } },
        ],
      },
    },
    notes:
      "Standard cubic with splitAfter solution. flex_plot f/f′/f″ unique expressions. FDT would give same signs: +− at 0, −+ at 2.\n\nStudent prompt on slide question.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: PITFALLS + TRICKY EXAMPLES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s07_common_mistake_forgetting_undefined_derivatives",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Mistake: Missing Undefined f′",
    question: "Find critical numbers of f(x) = x^(1/3)(x−4). Check x=0.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Solve f′(x)=0 only?",
          pairs: [
            {
              label: "❌ Incomplete",
              text: "For \\(f(x)=x^{2/3}(x-1)\\), solving \\(5x-2=0\\) gives \\(x=\\frac{2}{5}\\) and **stops**.",
            },
            {
              label: "✅ Complete",
              text: "Also include \\(x=0\\) where \\(x^{1/3}\\) in the denominator makes \\(f'\\) **undefined**, still a critical number.",
            },
          ],
        },
      ],
      lead: "Critical numbers = zeros **and** undefined points of f′.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cusp",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Cusp at x=0",
        caption: "f, f′ on x^(2/3)(x−1): vertical tangent behavior.",
        formulaLabel: "f",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=x^{2/3}(x-1)",
          xDomain: [-1.2, 2.5],
          yDomain: [-1.2, 1.2],
          branches: [
            { expr: "-abs(x)^(2/3)*(x-1)", xMin: -1.2, xMax: 0, openAtEnd: true, stroke: "#2563eb", strokeWidth: 4 },
            { expr: "x^(2/3)*(x-1)", xMin: 0, xMax: 2.5, openAtStart: true, stroke: "#2563eb", strokeWidth: 4 },
          ],
          curves: [
            { id: "fp", expr: "(5*x-2)/(3*x^(1/3))", stroke: "#c65a28", strokeWidth: 2, dashed: true },
          ],
          vLines: [{ x: 0 }, { x: 0.4 }],
          filledPoints: [{ x: 0, y: 0 }],
          tags: [{ text: "f' undefined", x: 0.55, y: 0.7 }],
        },
        params: { x: 0.8 },
      },
    },
    notes:
      "misconception_compare for missing cusp critical numbers. flex_plot cusp graph, different from prior slides.\n\nStudent prompt on slide question.",
  },
  {
    id: "s08_tricky_example_f_x_x_2_3_x_1",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Tricky Example: x^(2/3)(x−1)",
    question: "Verify f′(−1) and f′(0.1) yourself.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          splitAfter: 4,
          problem: "f(x)=x^{2/3}(x-1)",
          steps: [
            { id: "step_1", op: "=>", math: "f'(x)=\\frac{5x-2}{3x^{1/3}}", gap: "tight", say: "Quotient form." },
            { id: "step_2", math: "5x-2=0 \\Rightarrow x=\\tfrac{2}{5}", gap: "tight", say: "Numerator zero." },
            { id: "step_3", math: "x=0:\\ f'\\text{ undefined}", gap: "tight", say: "Denominator zero." },
            { id: "step_4", math: "\\text{Critical: }0,\\ \\tfrac{2}{5}", gap: "tight", say: "Both must be tested." },
            { id: "step_5", math: "f'(-1)>0,\\ f'(0.1)<0,\\ f'(1)>0", gap: "tight", say: "Sign tests." },
            { id: "step_6", math: "+\\to-\\Rightarrow\\max\\text{ at }0;\\ -\\to+\\Rightarrow\\min\\text{ at }\\tfrac{2}{5}", gap: "loose", say: "FDT conclusions." },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause",
          prompt: "Predict signs before the reveal.",
          reveal: { text: "Pattern **+ − +** → local max at 0 (cusp), local min at 2/5." },
        },
      ],
      lead: "Full sign-chart workflow with an undefined-derivative critical point.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_tricky_sign",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Sign chart + graph",
        caption: "Intervals (+), (−), (+) between 0 and 2/5.",
        formulaLabel: "f",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=x^{2/3}(x-1)",
          xDomain: [-1, 2.2],
          yDomain: [-0.5, 0.6],
          branches: [
            { expr: "-abs(x)^(2/3)*(x-1)", xMin: -1, xMax: 0, openAtEnd: true, stroke: "#2563eb", strokeWidth: 4 },
            { expr: "x^(2/3)*(x-1)", xMin: 0, xMax: 2.2, openAtStart: true, stroke: "#2563eb", strokeWidth: 4 },
          ],
          vLines: [{ x: 0 }, { x: 0.4 }],
          filledPoints: [
            { x: 0, y: 0 },
            { x: 0.4, y: -0.32 },
          ],
          tags: [
            { text: "+", x: -0.6, y: 0.35 },
            { text: "−", x: 0.2, y: -0.2 },
            { text: "+", x: 1.2, y: 0.35 },
          ],
        },
        params: { x: -0.5 },
      },
    },
    notes:
      "Full curve-sketch workflow via math_solution_steps + sign chart on flex_plot. pause_and_reveal mid-slide.\n\nStudent prompt on slide question.",
  },
  {
    id: "s09_pause_predict_edge_case",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause & Predict: Edge Case",
    question: "Work it out before the next slide.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "\\(f(x)=(x-1)^4\\). Find critical numbers, compute \\(f''\\), predict classification.",
        },
        {
          id: "left_checklist",
          type: "nested_bullets",
          items: [
            { id: "c1", text: "Factor \\(f'\\), how many critical points?" },
            { id: "c2", text: "What is \\(f''(1)\\)?" },
            { id: "c3", text: "If SDT fails, which test do you use?" },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause",
          prompt: "Predict: max, min, or inconclusive?",
          reveal: { text: "**SDT inconclusive** at x=1 (f''(1)=0), fall back to **FDT**: sign − to + ⇒ **local min**." },
        },
      ],
      lead: "Quiz-favorite: f″(c)=0 does not mean 'no extremum.'",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_pause_edge",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "(x−1)⁴: flat but curving up",
        caption: "Looks flat at x=1; probe left vs right of 1.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=(x-1)^4",
          xDomain: [-0.5, 2.5],
          yDomain: [-0.2, 2.5],
          probe: true,
          probeDefault: 1.2,
          curves: [{ id: "f", expr: "(x-1)^4", stroke: "#2563eb", strokeWidth: 4 }],
          vLines: [{ x: 1 }],
          filledPoints: [{ x: 1, y: 0 }],
        },
        params: { x: 0.3 },
      },
    },
    notes:
      "Pause slide before edge-case solution. pause_and_reveal with SDT/FDT preview. flex_plot (x−1)⁴ distinct from x⁴ expanded form on next slide.",
  },
  {
    id: "s10_edge_case_f_x_x4_4x3_6x2_4x_1",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Edge Case: (x−1)⁴ expanded",
    question: "Why does f''(1)=0 still give a minimum?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          splitAfter: 3,
          problem: "f(x)=x^4-4x^3+6x^2-4x+1",
          steps: [
            { id: "step_1", op: "=>", math: "f(x)=(x-1)^4", gap: "tight", say: "Recognize perfect fourth power." },
            { id: "step_2", math: "f'(x)=4(x-1)^3 \\Rightarrow x=1", gap: "tight", say: "One critical number." },
            { id: "step_3", math: "f''(x)=12(x-1)^2,\\ f''(1)=0", gap: "tight", say: "SDT inconclusive." },
            { id: "step_4", math: "f'(0)=-4<0,\\ f'(2)=4>0", gap: "tight", say: "FDT sign test." },
            { id: "step_5", math: "-\\to+ \\Rightarrow \\text{local min at }(1,0)", gap: "loose", say: "Final classification." },
          ],
        },
      ],
      lead: "Inconclusive SDT → mandatory FDT fallback.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_edge_plot",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f, f′, f″ near x=1",
        caption: "f″ touches 0; f′ still changes sign.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=x^4-4*x^3+6*x^2-4*x+1",
          xDomain: [-0.3, 2.3],
          yDomain: [-0.5, 2],
          curves: [
            { id: "f", expr: "x^4-4*x^3+6*x^2-4*x+1", stroke: "#2563eb", strokeWidth: 4 },
            { id: "fp", expr: "4*(x-1)^3", stroke: "#c65a28", strokeWidth: 3 },
            { id: "fpp", expr: "12*(x-1)^2", stroke: "#16a34a", strokeWidth: 2 },
          ],
          vLines: [{ x: 1 }],
          filledPoints: [{ x: 1, y: 0 }],
        },
        params: { x: 0.4 },
      },
    },
    notes:
      "Expanded polynomial form solution. flex_plot triple with factored f′, f″ expressions. Emphasize inconclusive ≠ no extremum.\n\nStudent prompt on slide question.",
  },
  {
    id: "s11_application_profit_optimization",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Profit on [0,5]",
    question: "Why is absolute max at the endpoint x=5?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          splitAfter: 3,
          problem: "P(x)=2x^3-15x^2+36x-10,\\ 0\\le x\\le 5",
          steps: [
            { id: "step_1", op: "=>", math: "P'(x)=6(x-2)(x-3)", gap: "tight", say: "Critical numbers 2 and 3." },
            { id: "step_2", math: "P''(2)=-6<0,\\ P''(3)=6>0", gap: "tight", say: "Local max at 2, min at 3." },
            { id: "step_3", math: "P(2)=18,\\ P(3)=17", gap: "tight", say: "Interior values." },
            { id: "step_4", math: "P(0)=-10,\\ P(5)=45", gap: "tight", say: "Endpoint check, Topic 16 callback." },
            { id: "step_5", math: "\\text{Absolute max at }x=5", gap: "loose", say: "Closed interval needs endpoints." },
          ],
        },
      ],
      lead: "Derivative tests find local extrema; **endpoints** decide absolute ones.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_profit",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "P(x) on [0,5]",
        caption: "Interior local max < endpoint value at x=5.",
        formulaLabel: "P",
        plot: {
          plotType: "y_equals",
          formula: "P(x)=2*x^3-15*x^2+36*x-10",
          xDomain: [-0.3, 5.3],
          yDomain: [-15, 50],
          curves: [{ id: "P", expr: "2*x^3-15*x^2+36*x-10", stroke: "#2563eb", strokeWidth: 4 }],
          filledPoints: [
            { x: 0, y: -10 },
            { x: 2, y: 18 },
            { x: 3, y: 17 },
            { x: 5, y: 45 },
          ],
          vLines: [{ x: 2 }, { x: 3 }],
        },
        params: { x: 4 },
      },
    },
    notes:
      "Real-world closed-interval workflow. math_solution_steps includes endpoint check. Callback Topic 16 absolute extrema.\n\nStudent prompt on slide question.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 5: LAB, PROOFS. RECAP
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s12_challenge_optional_proof_sketch_of_both_tests",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Increasing, Decreasing & Concavity",
    question: "Match f′ sign and f″ sign to the graph shape.",
    lead: "Three functions, read f, f′, f″ together. Demo tab B on video.",
    labSiteNote: "Site: try all tabs; drag probe x across each critical point.",
    labExamples: [
      {
        id: "lab_inc_dec",
        label: "A · x³−3x",
        formula: "f'(x)=3x^2-3",
        steps: [
          { text: "Find where f′ is + vs −." },
          { text: "Critical at x=±1, classify with sign chart." },
        ],
        params: {
          plot: {
            formula: "f(x)=x^3-3*x",
            xDomain: [-2.2, 2.2],
            yDomain: [-4, 4],
            curves: [
              { id: "f", expr: "x^3-3*x", stroke: "#2563eb", strokeWidth: 4 },
              { id: "fp", expr: "3*x^2-3", stroke: "#c65a28", strokeWidth: 3 },
            ],
            vLines: [{ x: -1 }, { x: 1 }],
          },
          x: 0,
        },
      },
      {
        id: "lab_concave",
        label: "B · x³−3x²+1",
        formula: "f''(x)=6x-6",
        steps: [
          { text: "Watch f″ sign at x=0 and x=2." },
          { text: "SDT: f″(0)<0 max, f″(2)>0 min." },
        ],
        params: {
          plot: {
            formula: "f(x)=x^3-3*x^2+1",
            xDomain: [-0.8, 3.2],
            yDomain: [-4, 3],
            curves: [
              { id: "f", expr: "x^3-3*x^2+1", stroke: "#2563eb", strokeWidth: 4 },
              { id: "fp", expr: "3*x^2-6*x", stroke: "#c65a28", strokeWidth: 3 },
              { id: "fpp", expr: "6*x-6", stroke: "#16a34a", strokeWidth: 2 },
            ],
            vLines: [{ x: 0 }, { x: 2 }],
          },
          x: 1,
        },
      },
      {
        id: "lab_flat_min",
        label: "C · (x−1)⁴",
        formula: "f''(1)=0",
        steps: [
          { text: "SDT inconclusive at x=1." },
          { text: "Use f′ sign: − then + ⇒ minimum." },
        ],
        params: {
          plot: {
            formula: "f(x)=(x-1)^4",
            xDomain: [-0.5, 2.5],
            yDomain: [-0.2, 2.5],
            curves: [
              { id: "f", expr: "(x-1)^4", stroke: "#2563eb", strokeWidth: 4 },
              { id: "fp", expr: "4*(x-1)^3", stroke: "#c65a28", strokeWidth: 3 },
              { id: "fpp", expr: "12*(x-1)^2", stroke: "#16a34a", strokeWidth: 2 },
            ],
            vLines: [{ x: 1 }],
          },
          x: 0.4,
        },
      },
    ],
    media: {
      id: "lab_deriv_tests",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "f · f′ · f″ lab",
      caption: "Multi-curve plot: classify from signs.",
      formulaLabel: "f",
      plot: {
        plotType: "y_equals",
        formula: "f(x)=x^3-3*x^2+1",
        xDomain: [-0.8, 3.2],
        yDomain: [-4, 3],
        probe: true,
        probeDefault: 1,
        curves: [
          { id: "f", expr: "x^3-3*x^2+1", stroke: "#2563eb", strokeWidth: 4 },
          { id: "fp", expr: "3*x^2-6*x", stroke: "#c65a28", strokeWidth: 3 },
          { id: "fpp", expr: "6*x-6", stroke: "#16a34a", strokeWidth: 2 },
        ],
      },
      params: { x: 1 },
    },
    notes:
      "visual_lab replaces optional proof slide id, proof ideas moved to speaker notes. Three tabs: inc/dec, concavity SDT, inconclusive edge. Demo tab B ~30s.\n\nStudent prompt on slide question.",
  },
  {
    id: "s13_another_mistake_f_c_0_means_no_extremum",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Myth: f''(c)=0 ⇒ No Extremum",
    question: "Counterexample with a local max? Try f(x)=−x⁴.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_proof_sketch",
          type: "proof_sketch",
          title: "Why both tests work (sketch)",
          steps: [
            { id: "ps1", text: "**FDT:** \\(f'\\) +→− means \\(f\\) rose then fell ⇒ peak at \\(c\\)." },
            { id: "ps2", text: "**SDT:** \\(f''(c)>0\\) ⇒ \\(f'\\) increasing through 0 ⇒ − then + ⇒ valley." },
            { id: "ps3", text: "**Myth bust:** \\(f(x)=x^4\\) has \\(f''(0)=0\\) but FDT still shows a **minimum**." },
          ],
        },
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Inconclusive ≠ none",
          pairs: [
            {
              label: "❌ Wrong",
              text: "\\(f''(c)=0\\) means **no** local extremum.",
            },
            {
              label: "✅ Right",
              text: "SDT silent, run **FDT**. \\(x^4\\) at 0 is a min; \\(-x^4\\) at 0 is a max.",
            },
          ],
        },
      ],
      lead: "When f″ is zero, the first test still decides.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_x4_myth",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=x⁴: minimum at 0",
        caption: "f, f′, f″ all flat-looking at 0; f′ still changes − to +.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=x^4",
          xDomain: [-1.5, 1.5],
          yDomain: [-0.3, 2.5],
          curves: [
            { id: "f", expr: "x^4", stroke: "#2563eb", strokeWidth: 4 },
            { id: "fp", expr: "4*x^3", stroke: "#c65a28", strokeWidth: 3 },
            { id: "fpp", expr: "12*x^2", stroke: "#16a34a", strokeWidth: 2 },
          ],
          filledPoints: [{ x: 0, y: 0 }],
        },
        params: { x: 0.7 },
      },
    },
    notes:
      "proof_sketch light + misconception_compare on f''=0 myth. flex_plot x⁴ triple, distinct from (x−1)⁴ slides.\n\nStudent prompt: −x⁴ gives max with same SDT issue.",
  },
  {
    id: "s14_quick_check_summary",
    type: "bullets",
    hud: "Arian University • Calculus 1",
    title: "Quick Check & Summary",
    question: "Can you run the full workflow on a new function?",
    lead: "Three checks, then the workflow cheat sheet:",
    bullets: [
      { id: "q1", text: "**1.** \\(f(x)=x^3-3x\\) at \\(x=1\\): SDT says **local min** (\\(f''(1)=6>0\\))." },
      { id: "q2", text: "**2.** \\(f'(2)=f''(2)=0\\): SDT **inconclusive**, use FDT." },
      { id: "q3", text: "**3.** \\(f'\\) signs \\(+, -, +\\) at \\(0, 2\\): **max at 0**, **min at 2**." },
    ],
    blocks: [
      {
        id: "workflow_recap",
        type: "nested_bullets",
        items: [
          { id: "r1", text: "Find critical numbers (\\(f'=0\\) or undefined)." },
          { id: "r2", text: "Try **SDT** when \\(f''(c)\\neq 0\\)." },
          { id: "r3", text: "Else **FDT** sign chart on \\(f'\\)." },
          { id: "r4", text: "**Next:** Topic 19, Optimization Problems." },
        ],
      },
      {
        id: "body_pause",
        type: "pause_and_reveal",
        title: "Exit check",
        prompt: "Answers: 1→B min, 2→C inconclusive, 3→A max at 0 min at 2.",
        reveal: {
          text: "Keep both tests: SDT for speed, FDT when SDT fails or f′ is undefined at c.",
        },
      },
    ],
    notes:
      "Quick check answers woven into bullets. nested_bullets workflow recap + Topic 19 teaser. pause_and_reveal exit. Callback Topic 17 MVT optional.",
  },
];

export default slidesData;

/*
 * COURSE DESIGN CHANGELOG. Topic 18 (v1 hand-enhanced, June 2026)
 *   - Welcome back + Topic 17 MVT callback; path_topic_18 roadmap.
 *   - Removed source metadata; normal JS style.
 *   - theorem_box on s03 FDT, s05 SDT; proof_sketch light on s13.
 *   - nested_bullets sign-chart workflow on s02, s03, s14.
 *   - misconception_compare on s07 (undefined f′), s13 (f''=0 myth).
 *   - math_solution_steps on s04, s06, s08, s10, s11 (curve-sketch workflow).
 *   - flex_plot multi-curve f/f′/f″, unique expressions per slide (not copy-paste).
 *   - s12 → visual_lab with 3 tabs (inc/dec, concavity SDT, inconclusive edge).
 *   - pause_and_reveal on s03, s08, s09, s14 practice/exit slides.
 *   - Callbacks: Topic 16 critical points + closed-interval endpoints; Topic 17 f′ behavior.
 *   - s14 recap + Topic 19 optimization teaser.
 */