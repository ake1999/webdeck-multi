// Generated from courses/Calculus/Materials/the_product_rule_for_derivatives.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "05_the_product_rule_for_derivatives",
  title: "The Product Rule For Derivatives",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/the_product_rule_for_derivatives.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "The Product Rule For Derivatives",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: Product rule, fg′ + f′g • Session 3 • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back after Topics 10–11 (power rule and sum/difference rules). Topic 12 handles genuine products, sums are easy, products are not.",
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
        currentId: "path_topic_12",
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
          { id: "path_topic_11", number: 11, session: "S03 Derivative Foundations and Rules", label: "Power, Constant Multiple, Sum, and Difference Rules", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_12", number: 12, session: "S03 Derivative Foundations and Rules", label: "The Product Rule for Derivatives", note: "Today", status: "current", expanded: true },
          { id: "path_topic_13", number: 13, session: "S03 Derivative Foundations and Rules", label: "The Chain Rule", note: "Next", status: "next", expanded: true },
          { id: "path_topic_14", number: 14, session: "S03 Derivative Foundations and Rules", label: "Implicit Differentiation", status: "upcoming" },
          { id: "path_topic_15", number: 15, session: "S04 Applications of Derivatives", label: "Related Rates", status: "upcoming" },
          { id: "path_topic_16", number: 16, session: "S04 Applications of Derivatives", label: "Critical Points and Extrema on an Interval", status: "upcoming" },
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
      { id: "objective_1", text: "State the product rule \\((fg)' = fg' + f'g\\) correctly." },
      { id: "objective_2", text: "State and apply the **quotient rule** for \\(\\frac{f}{g}\\) when simplification is not enough." },
      { id: "objective_3", text: "Apply product and quotient rules to polynomials, exponentials, and trigonometric expressions." },
      { id: "objective_4", text: "Decide when to simplify first versus using product or quotient rules." },
      { id: "objective_5", text: "Avoid the trap of multiplying derivatives: \\((fg)' \\neq f'g'\\)." },
    ],
    notes:
      "Roadmap first: Topics 10–11 done (power + sum rules), Topic 12 today, Topic 13 chain rule next. Four objectives map to counterexample → theorem → worked examples → recap.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: WHY THE PRODUCT RULE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_the_product_rule_for_derivatives",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Why the Product Rule?",
    question: "If \\(f(x)=x^2\\) and \\(g(x)=\\sin x\\), can we differentiate \\(h(x)=f(x)g(x)\\) with sum rules alone?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Topics 10–11 gave you the **power rule** and **sum/difference rule**. Those handle \\(f+g\\) and \\(cf\\), but \\(fg\\) is a new animal.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "The tempting guess \\((fg)' = f'g'\\) fails on simple examples. Today we learn the correct **sum of two products** formula and when to use it.",
        },
      ],
      lead: "Sums split easily; products need their own rule.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_product_hook",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Three curves: f, g, and fg",
        caption: "Blue f, orange g, green product: drag probe x.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=x^2\\sin x",
          xDomain: [0, 2.2],
          yDomain: [-0.5, 5],
          probe: true,
          probeDefault: 1,
          probeMin: 0.2,
          probeMax: 2,
          curves: [
            { id: "f", expr: "x*x", stroke: "#2563eb", strokeWidth: 3 },
            { id: "g", expr: "sin(x)", stroke: "#c65a28", strokeWidth: 3 },
            { id: "h", expr: "x*x*sin(x)", stroke: "#16a34a", strokeWidth: 4 },
          ],
          verticalMarkers: ["f", "g", "h"],
        },
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 5, params: { x: 1 } },
          { t: 10, params: { x: 1.6 } },
        ],
      },
    },
    notes:
      "Welcome-back energy. Callback Topics 10–11. Widget shows f, g, fg at probe, green is NOT f′g′. Sets up counterexample on s03.",
  },
  {
    id: "s02_prerequisite_check",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Prerequisite Check (Pause)",
    question: "Find \\(\\displaystyle\\frac{d}{dx}[3x^2 + 5]\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_rules",
          type: "nested_bullets",
          items: [
            { id: "r1", text: "**Power rule (Topic 10):** \\(\\frac{d}{dx}[x^n] = nx^{n-1}\\)" },
            { id: "r2", text: "**Constant rule:** \\(\\frac{d}{dx}[c] = 0\\)" },
            { id: "r3", text: "**Sum rule (Topic 11):** \\(\\frac{d}{dx}[f \\pm g] = f' \\pm g'\\)" },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and compute",
          prompt: "Differentiate \\(3x^2 + 5\\) before continuing.",
          reveal: { text: "\\(\\displaystyle\\frac{d}{dx}[3x^2 + 5] = 6x\\), constant drops, power rule on \\(3x^2\\)." },
        },
      ],
      lead: "Quick check: you still have power and sum rules from Topics 10–11.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_prereq_plot",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=3x²+5 and f′(x)=6x",
        caption: "Parabola shifts up 5; slope line ignores the constant.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=3x^2+5",
          xDomain: [-2, 2],
          yDomain: [-2, 18],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "f", expr: "3*x*x+5", stroke: "#2563eb", strokeWidth: 4 },
            { id: "fp", expr: "6*x", stroke: "#dc2626", strokeWidth: 3, dashed: true },
          ],
        },
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: -1 } },
          { t: 5, params: { x: 1 } },
        ],
      },
    },
    notes:
      "Real YouTube pause. Reveal 6x. Widget pairs f and f′, constant term invisible in derivative.\n\nStudent prompt: Find the derivative of \\(3x^2 + 5\\).",
  },
  {
    id: "s03_why_can_t_we_just_multiply_derivatives",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Why Can't We Just Multiply Derivatives?",
    question: "Why is \\(f'(x)g'(x)\\) not equal to \\((f(x)g(x))'\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Multiplying derivatives vs. product rule",
          pairs: [
            {
              label: "❌ Naive guess",
              text: "Take \\(f(x)=x\\), \\(g(x)=x^2\\). Product \\(h(x)=x^3\\) has \\(h'(x)=3x^2\\), but \\(f'g' = 1 \\cdot 2x = 2x\\).",
            },
            {
              label: "✅ Correct idea",
              text: "\\((fg)'\\) is a **sum** of two terms, each factor's change affects the product. We'll formalize on the next slide.",
            },
          ],
        },
        {
          id: "left_counter",
          type: "math_solution_steps",
          problem: "h(x)=x\\cdot x^2=x^3",
          stepLayout: "flow",
          steps: [
            { id: "step_1", math: "h'(x)=3x^2", gap: "tight", say: "Power rule on the product." },
            { id: "step_2", op: "=>", math: "f'g'=1\\cdot 2x=2x", gap: "tight", say: "Multiplying derivatives gives 2x." },
            { id: "step_3", math: "3x^2\\neq 2x", say: "Guess fails, need product rule." },
          ],
        },
      ],
      lead: "The product of derivatives is NOT the derivative of the product.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_counter_plot",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "h′=3x² vs wrong f′g′=2x",
        caption: "Solid green = correct; dashed red = f′g′ trap.",
        formulaLabel: "h′",
        plot: {
          plotType: "y_equals",
          formula: "h'(x)=3x^2",
          xDomain: [0, 2],
          yDomain: [0, 12],
          probe: true,
          probeDefault: 1,
          verticalParam: "a",
          verticalAt: 1,
          curves: [
            { id: "h", expr: "x*x*x", stroke: "#64748b", strokeWidth: 2 },
            { id: "correct", expr: "3*x*x", stroke: "#16a34a", strokeWidth: 4 },
            { id: "wrong", expr: "2*x", stroke: "#dc2626", strokeWidth: 3, dashed: true },
          ],
          verticalMarkers: ["correct", "wrong"],
        },
        params: { x: 1, a: 1 },
        scriptedTimeline: [
          { t: 0, params: { a: 0.5 } },
          { t: 6, params: { a: 1 } },
        ],
      },
    },
    notes:
      "misconception_compare + compact math_solution_steps. Widget marks gap at x=1. Callback: sum rules do NOT distribute over products.\n\nStudent prompt on slide question.",
  },
  {
    id: "s04_the_product_rule_formula",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Product Rule Formula",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Product Rule",
          text: "If \\(f\\) and \\(g\\) are differentiable, then \\(\\displaystyle\\frac{d}{dx}[f(x)g(x)] = f(x)g'(x) + f'(x)g(x)\\). Equivalently: \\((fg)' = fg' + f'g\\).",
        },
        {
          id: "left_aid",
          type: "nested_bullets",
          items: [
            { id: "m1", text: "**Memory aid:** first \\(\\times\\) derivative of second, **plus** derivative of first \\(\\times\\) second." },
            { id: "m2", text: "**Never** write \\(f'g'\\), it's a **sum**, not a product of derivatives." },
          ],
        },
      ],
      lead: "Two terms add; each captures how one factor changing affects the product.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_formula",
          type: "formula_block",
          formulas: [
            "$$(fg)' = \\underbrace{f\\,g'}_{\\text{first}\\times\\text{second'}} + \\underbrace{f'\\,g}_{\\text{first'}\\times\\text{second}}$$",
          ],
        },
      ],
      media: {
        id: "right_product_terms",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "fg′ and f′g at a probe point",
        caption: "Green = product; markers show each term's contribution height.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=x^2\\sin x",
          xDomain: [0, 2],
          yDomain: [-0.5, 4.5],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "fgp", expr: "x*x*cos(x)", stroke: "#2563eb", strokeWidth: 3 },
            { id: "fpg", expr: "2*x*sin(x)", stroke: "#c65a28", strokeWidth: 3 },
            { id: "h", expr: "x*x*sin(x)", stroke: "#16a34a", strokeWidth: 2 },
          ],
          verticalMarkers: ["fgp", "fpg"],
        },
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.6 } },
          { t: 5, params: { x: 1 } },
        ],
      },
    },
    notes:
      "theorem_box is the formal statement. Right plot previews fg′ and f′g curves, sum gives slope of h. Read memory aid once.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: WORKED EXAMPLE + PAUSE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s05_example_1_polynomial_trigonometric",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Worked Example: x² sin x",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\frac{d}{dx}[x^2\\sin x]",
          steps: [
            { id: "step_1", op: "=>", math: "f=x^2,\\ g=\\sin x", gap: "tight", say: "Identify factors." },
            { id: "step_2", math: "f'=2x,\\ g'=\\cos x", gap: "tight", say: "Differentiate each." },
            { id: "step_3", math: "x^2\\cos x + 2x\\sin x", gap: "tight", say: "Apply fg′ + f′g." },
            { id: "step_4", math: "x^2\\cos x + 2x\\sin x", gap: "loose", say: "Both terms survive, final answer." },
          ],
        },
      ],
      lead: "Template walkthrough: label f and g, then plug into the theorem.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_worked_x2sin",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f, g, and fg at probe x",
        caption: "Drag x: green product, blue/orange factors.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=x^2\\sin x",
          xDomain: [0, 2.2],
          yDomain: [-0.5, 5],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "f", expr: "x*x", stroke: "#2563eb", strokeWidth: 3 },
            { id: "g", expr: "sin(x)", stroke: "#c65a28", strokeWidth: 3 },
            { id: "h", expr: "x*x*sin(x)", stroke: "#16a34a", strokeWidth: 4 },
          ],
          verticalMarkers: ["f", "g", "h"],
        },
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.8 } },
          { t: 5, params: { x: 1.2 } },
        ],
      },
    },
    notes:
      "Main worked example per arc. Reveal steps in order step_1..step_4. Widget confirms three curves at probe.",
  },
  {
    id: "s06_pause_and_try_similar_problem",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause and Try: x³ cos x (Pause)",
    question: "Differentiate \\(x^3 \\cos x\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "**Your turn:** \\(h(x)=x^3\\cos x\\). Set \\(f=x^3\\), \\(g=\\cos x\\), find \\(f'\\) and \\(g'\\), then apply \\((fg)' = fg' + f'g\\).",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Write \\(h'(x)\\) before revealing.",
          reveal: { text: "\\(h'(x)=x^3(-\\sin x)+3x^2\\cos x = -x^3\\sin x + 3x^2\\cos x\\)" },
        },
      ],
      lead: "Same pattern, polynomial times trig.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_pause_x3cos",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "h(x)=x³ cos x only",
        caption: "Product curve: no derivative shown yet.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=x^3\\cos x",
          xDomain: [-1.5, 1.5],
          yDomain: [-2, 2],
          probe: true,
          probeDefault: 0.8,
          curves: [{ id: "h", expr: "x*x*x*cos(x)", stroke: "#16a34a", strokeWidth: 4 }],
        },
        params: { x: 0.8 },
      },
    },
    notes:
      "Real pause beat. Reveal full answer on continue. No derivative on plot until student tries.\n\nStudent prompt: Differentiate \\(x^3 \\cos x\\).",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: MORE EXAMPLES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s07_example_2_polynomial_polynomial",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 2: Polynomial × Polynomial",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "h(x)=(3x^2+2x)(x^3-5)",
          splitAfter: 3,
          steps: [
            { id: "step_1", op: "=>", math: "f=3x^2+2x,\\ g=x^3-5", gap: "tight", say: "Identify factors." },
            { id: "step_2", math: "f'=6x+2,\\ g'=3x^2", gap: "tight", say: "Differentiate each." },
            { id: "step_3", math: "(3x^2+2x)(3x^2)+(6x+2)(x^3-5)", gap: "tight", say: "Apply product rule." },
            { id: "step_4", math: "15x^4+8x^3-30x-10", gap: "tight", say: "Expand and combine." },
            { id: "step_5", math: "15x^4+8x^3-30x-10", say: "Matches expanding first, then power rule." },
          ],
        },
      ],
      lead: "Expand or product-rule, both routes should agree.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_poly_poly",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "h and h′",
        caption: "Solid = product; dashed = derivative polynomial.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=(3x^2+2x)(x^3-5)",
          xDomain: [-1.5, 2],
          yDomain: [-15, 10],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "h", expr: "(3*x*x+2*x)*(x*x*x-5)", stroke: "#2563eb", strokeWidth: 4 },
            { id: "hp", expr: "15*x*x*x*x+8*x*x*x-30*x-10", stroke: "#dc2626", strokeWidth: 3, dashed: true },
          ],
        },
        params: { x: 1 },
      },
    },
    notes:
      "splitAfter keeps widget visible. Verification beat on step_5, expand-first check from material.",
  },
  {
    id: "s08_example_3_radical_exponential",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 3: Radical × Exponential",
    question: "Try: differentiate \\(x^{1/3} e^x\\) (answer in practice ladder).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\frac{d}{dt}[\\sqrt{t}\\,e^t]",
          steps: [
            { id: "step_1", op: "=>", math: "f=t^{1/2},\\ g=e^t", gap: "tight", say: "Rewrite radical as power." },
            { id: "step_2", math: "f'=\\tfrac12 t^{-1/2},\\ g'=e^t", gap: "tight", say: "Power rule + exponential." },
            { id: "step_3", math: "t^{1/2}e^t+\\tfrac12 t^{-1/2}e^t", gap: "tight", say: "Product rule." },
            { id: "step_4", math: "e^t\\left(\\sqrt{t}+\\frac{1}{2\\sqrt{t}}\\right)", say: "Factor for cleaner form." },
          ],
        },
      ],
      lead: "Rewrite radicals as powers before differentiating.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_sqrt_exp",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "√t · eᵗ",
        caption: "Domain t > 0: watch both factors grow.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(t)=\\sqrt{t}\\,e^t",
          xDomain: [0.1, 2],
          yDomain: [0, 8],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "f", expr: "sqrt(t)", stroke: "#2563eb", strokeWidth: 3 },
            { id: "g", expr: "exp(t)", stroke: "#c65a28", strokeWidth: 3 },
            { id: "h", expr: "sqrt(t)*exp(t)", stroke: "#16a34a", strokeWidth: 4 },
          ],
          verticalMarkers: ["f", "g", "h"],
        },
        params: { x: 1 },
      },
    },
    notes:
      "Fractional exponent care. Factor step shows exam-ready form.\n\nStudent prompt on slide question.",
  },
  {
    id: "s09_example_4_edge_case_constant_times_function",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Edge Case: Constant × Function",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "g(x)=5x^3",
          steps: [
            { id: "step_1", op: "=>", math: "f=5,\\ g=x^3", gap: "tight", say: "Constant factor." },
            { id: "step_2", math: "f'=0,\\ g'=3x^2", gap: "tight", say: "Constant derivative is zero." },
            { id: "step_3", math: "5\\cdot 3x^2 + 0\\cdot x^3 = 15x^2", gap: "tight", say: "f′g term vanishes." },
            { id: "step_4", math: "15x^2", say: "Matches constant-multiple rule, use that shortcut." },
          ],
        },
      ],
      lead: "Product rule still works, but constant-multiple rule is faster.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_constant_multiple",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "5x³ and 15x²",
        caption: "Product rule agrees with constant-multiple rule.",
        formulaLabel: "g",
        plot: {
          plotType: "y_equals",
          formula: "g(x)=5x^3",
          xDomain: [-2, 2],
          yDomain: [-20, 20],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "g", expr: "5*x*x*x", stroke: "#2563eb", strokeWidth: 4 },
            { id: "gp", expr: "15*x*x", stroke: "#16a34a", strokeWidth: 3, dashed: true },
          ],
        },
        params: { x: 1 },
      },
    },
    notes:
      "Edge case: f′g = 0. Reinforce Topic 11 constant-multiple rule as preferred shortcut.",
  },
  {
    id: "s10_example_5_application_bacteria_growth",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Bacteria Growth",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "N(t)=(t^2+1)e^{0.1t}",
          splitAfter: 3,
          steps: [
            { id: "step_1", op: "=>", math: "f=t^2+1,\\ g=e^{0.1t}", gap: "tight", say: "Model factors." },
            { id: "step_2", math: "f'=2t,\\ g'=0.1e^{0.1t}", gap: "tight", say: "Derivatives." },
            { id: "step_3", math: "N'(t)=(t^2+1)(0.1e^{0.1t})+2t\\,e^{0.1t}", gap: "tight", say: "Product rule." },
            { id: "step_4", math: "N'(t)=e^{0.1t}[0.1(t^2+1)+2t]", gap: "tight", say: "Factor e^{0.1t}." },
            { id: "step_5", math: "N'(3)\\approx 9.45", say: "Evaluate at t=3 hours." },
          ],
        },
      ],
      lead: "Real model: polynomial growth modulated by exponential.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_bacteria",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Population N(t)",
        caption: "Probe near t=3: tangent slope ≈ growth rate.",
        formulaLabel: "N",
        plot: {
          plotType: "y_equals",
          formula: "N(t)=(t^2+1)e^{0.1t}",
          xDomain: [0, 5],
          yDomain: [0, 35],
          probe: true,
          probeDefault: 3,
          probeMin: 0,
          probeMax: 5,
          curves: [{ id: "N", expr: "(t*t+1)*exp(0.1*t)", stroke: "#16a34a", strokeWidth: 4 }],
          tags: [{ text: "t=3 → N′≈9.45", x: 3, y: 12 }],
        },
        params: { x: 3 },
        scriptedTimeline: [
          { t: 0, params: { x: 1 } },
          { t: 5, params: { x: 3 } },
        ],
      },
    },
    notes:
      "Application slide, rate of change at t=3. Move probe to 3 during narration.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: LAB + PRACTICE + PROOF + SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s11_visual_lab_explore_the_product_rule",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Explore the Product Rule",
    question: "How do fg′ and f′g combine at your probe point?",
    lead: "Three product pairs. Left = short steps; right = flex_plot with probe slider.",
    labSiteNote: "On YouTube we demo tab A. On the site, try all tabs and drag **probe x**.",
    labExamples: [
      {
        id: "lab_ex_x2sin",
        label: "A · x² sin x",
        formula: "h(x)=x^2\\sin x",
        steps: [
          { id: "step_1", text: "Blue = \\(x^2\\), orange = \\(\\sin x\\), green = product." },
          { id: "step_2", text: "Drag probe, read heights at the vertical markers." },
          { id: "step_3", text: "Slope of green ≈ blue·cos x + orange·2x." },
        ],
        params: {
          x: 1,
          plot: {
            plotType: "y_equals",
            formula: "h(x)=x^2\\sin x",
            xDomain: [0, 2.2],
            yDomain: [-0.5, 5],
            probe: true,
            probeDefault: 1,
            curves: [
              { id: "f", expr: "x*x", stroke: "#2563eb", strokeWidth: 3 },
              { id: "g", expr: "sin(x)", stroke: "#c65a28", strokeWidth: 3 },
              { id: "h", expr: "x*x*sin(x)", stroke: "#16a34a", strokeWidth: 4 },
            ],
            verticalMarkers: ["f", "g", "h"],
          },
        },
      },
      {
        id: "lab_ex_xexp",
        label: "B · x eˣ",
        formula: "h(x)=x e^x",
        steps: [
          { id: "step_1", text: "\\(f=x\\), \\(g=e^x\\), both factors vary." },
          { id: "step_2", text: "\\(h'=e^x + x e^x = e^x(1+x)\\)." },
          { id: "step_3", text: "Watch green outpace blue as x grows." },
        ],
        params: {
          x: 0.8,
          plot: {
            plotType: "y_equals",
            formula: "h(x)=x e^x",
            xDomain: [-1, 2],
            yDomain: [-1, 8],
            probe: true,
            curves: [
              { id: "f", expr: "x", stroke: "#2563eb", strokeWidth: 3 },
              { id: "g", expr: "exp(x)", stroke: "#c65a28", strokeWidth: 3 },
              { id: "h", expr: "x*exp(x)", stroke: "#16a34a", strokeWidth: 4 },
            ],
            verticalMarkers: ["f", "g", "h"],
          },
        },
      },
      {
        id: "lab_ex_lin_trig",
        label: "C · (x+1) cos x",
        formula: "h(x)=(x+1)\\cos x",
        steps: [
          { id: "step_1", text: "Polynomial × trig, classic product-rule shape." },
          { id: "step_2", text: "\\(h'=(x+1)(-\\sin x)+\\cos x\\)." },
          { id: "step_3", text: "Oscillation modulated by linear growth." },
        ],
        params: {
          x: 1.2,
          plot: {
            plotType: "y_equals",
            formula: "h(x)=(x+1)\\cos x",
            xDomain: [-2, 3],
            yDomain: [-3, 4],
            probe: true,
            curves: [
              { id: "f", expr: "x+1", stroke: "#2563eb", strokeWidth: 3 },
              { id: "g", expr: "cos(x)", stroke: "#c65a28", strokeWidth: 3 },
              { id: "h", expr: "(x+1)*cos(x)", stroke: "#16a34a", strokeWidth: 4 },
            ],
            verticalMarkers: ["f", "g", "h"],
          },
        },
      },
    ],
    media: {
      id: "lab_product_flex",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "Product rule lab",
      caption: "Tabs swap f and g: drag probe x.",
      formulaLabel: "h",
      plot: {
        plotType: "y_equals",
        formula: "h(x)=x^2\\sin x",
        xDomain: [0, 2.2],
        yDomain: [-0.5, 5],
        probe: true,
        probeDefault: 1,
        curves: [
          { id: "f", expr: "x*x", stroke: "#2563eb", strokeWidth: 3 },
          { id: "g", expr: "sin(x)", stroke: "#c65a28", strokeWidth: 3 },
          { id: "h", expr: "x*x*sin(x)", stroke: "#16a34a", strokeWidth: 4 },
        ],
        verticalMarkers: ["f", "g", "h"],
      },
      params: { x: 1 },
      scriptedTimeline: [
        { t: 0, params: { x: 0.5 } },
        { t: 6, params: { x: 1.2 } },
      ],
    },
    notes:
      "visual_lab 34/66 layout. Tab A matches s05 worked example. Narrate one tab on video; site gets all three.\n\nStudent prompt on slide question.",
  },
  {
    id: "s11b_the_quotient_rule_formula",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Quotient Rule",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Quotient Rule",
          text: "If \\(f\\) and \\(g\\) are differentiable and \\(g(x)\\neq 0\\), then \\(\\displaystyle\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right]=\\frac{f'(x)g(x)-f(x)g'(x)}{[g(x)]^2}\\). Read: **low** \\(d\\)-**high** minus **high** \\(d\\)-**low**, over **low squared**.",
        },
        {
          id: "left_notes",
          type: "nested_bullets",
          items: [
            { id: "n1", text: "**Partner to product rule:** every quotient is a product \\(f\\cdot g^{-1}\\), but the quotient form is faster on fractions." },
            { id: "n2", text: "**Not L'Hôpital** (Topic 20), that rule is for **limits**, not for differentiating a quotient at a point." },
            { id: "n3", text: "**Simplify first** (Topic 11) when you can, e.g. \\(\\frac{x^3+2x}{x}\\) becomes a polynomial before you differentiate." },
          ],
        },
      ],
      lead: "Fractions need their own rule, minus sign in the numerator, square in the denominator.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_formula",
          type: "formula_block",
          formulas: [
            "$$\\left(\\frac{f}{g}\\right)'=\\frac{f'g-fg'}{g^2}$$",
            "Order matters: **\\(f'g\\)** first, then subtract **\\(fg'\\)**.",
          ],
        },
      ],
      media: {
        id: "right_quotient_rational",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Rational \\(h(x)=\\frac{x^2+1}{x-2}\\)",
        caption: "Quotient rule handles true fractions; probe away from the vertical asymptote.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=\\frac{x^2+1}{x-2}",
          expr: "(x*x+1)/(x-2)",
          xDomain: [-2, 4],
          yDomain: [-8, 12],
          probe: true,
          probeDefault: 3,
          verticalAsymptotes: [2],
        },
        params: { x: 3 },
      },
    },
    notes:
      "theorem_box + formula_block. Stress minus sign and g² denominator. Callback Topic 11 simplify-first. Distinguish from L'Hôpital early.",
  },
  {
    id: "s11c_quotient_rule_example",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Worked Example: \\(\\frac{e^x}{x^2+1}\\)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\frac{d}{dx}\\left[\\frac{e^x}{x^2+1}\\right]",
          steps: [
            { id: "step_1", op: "=>", math: "f=e^x,\\ g=x^2+1", gap: "tight", say: "Label high and low." },
            { id: "step_2", math: "f'=e^x,\\ g'=2x", gap: "tight", say: "Derivatives, exponential and power rule." },
            { id: "step_3", math: "\\frac{e^x(x^2+1)-e^x(2x)}{(x^2+1)^2}", gap: "tight", say: "Quotient rule: f′g − fg′ over g²." },
            { id: "step_4", math: "\\frac{e^x(x^2-2x+1)}{(x^2+1)^2}=\\frac{e^x(x-1)^2}{(x^2+1)^2}", say: "Factor e^x and recognize a perfect square." },
          ],
        },
      ],
      lead: "Exponential over polynomial, classic quotient-rule shape.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_exp_quotient",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "\\(h(x)=e^x/(x^2+1)\\)",
        caption: "Green curve: exponential growth modulated by the denominator.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=\\frac{e^x}{x^2+1}",
          expr: "exp(x)/(x*x+1)",
          xDomain: [-2, 2.5],
          yDomain: [-0.5, 8],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "f", expr: "exp(x)", stroke: "#64748b", strokeWidth: 2 },
            { id: "g", expr: "x*x+1", stroke: "#c65a28", strokeWidth: 2 },
            { id: "h", expr: "exp(x)/(x*x+1)", stroke: "#16a34a", strokeWidth: 4 },
          ],
        },
        params: { x: 1 },
      },
    },
    notes:
      "math_solution_steps walkthrough. Uses e^x derivative (full table in Topic 13). Factor final form for elegance.",
  },
  {
    id: "s12_practice_problem_ladder",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Practice Problem Ladder (Pause)",
    question: "",
    lead: "Work top to bottom before checking answers.",
    blocks: [
      {
        id: "body_ladder",
        type: "nested_bullets",
        items: [
          { id: "p1", text: "**Easy:** \\(\\frac{d}{dx}[2x(x^2+1)]\\)" },
          { id: "p2", text: "**Medium:** \\(\\frac{d}{dx}[x^{1/3} e^x]\\)" },
          { id: "p3", text: "**Hard:** \\(\\frac{d}{dx}[(x^2+1)\\sin x\\,e^x]\\), product rule twice." },
          { id: "p4", text: "**Quotient:** \\(\\frac{d}{dx}\\left[\\frac{\\sin x}{x^2+1}\\right]\\)" },
          { id: "p5", text: "**Challenge:** \\(\\frac{d}{dx}[x\\sin x\\cos x]\\), three factors, two applications." },
        ],
      },
      {
        id: "body_pause",
        type: "pause_and_reveal",
        title: "Pause: attempt all four",
        prompt: "Pause the video and try every problem before revealing hints.",
        reveal: {
          text: "Patterns: label factors, differentiate each, add fg′ + f′g. For three factors, group two first or apply twice.",
        },
      },
    ],
    media: null,
    notes:
      "Practice ladder pause, no widget needed. Encourage pencil work. Skippable if time-limited.",
  },
  {
    id: "s13_challenge_optional_proof_of_the_product_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Proof Sketch",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_proof",
          type: "proof_sketch",
          title: "From the limit definition",
          text: "Start with \\((fg)'(x)=\\lim_{h\\to0}\\frac{f(x+h)g(x+h)-f(x)g(x)}{h}\\).",
          steps: [
            { id: "body_step_1", text: "Add and subtract \\(f(x)g(x+h)\\) inside the numerator." },
            { id: "body_step_2", text: "Split into \\(\\frac{f(x+h)-f(x)}{h}\\cdot g(x+h)+f(x)\\cdot\\frac{g(x+h)-g(x)}{h}\\)." },
            { id: "body_step_3", text: "Take limits: \\(f'(x)g(x)+f(x)g'(x)\\) using continuity of \\(g\\)." },
          ],
        },
      ],
      lead: "Optional, the add-and-subtract trick explains why it's a sum.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_note",
          type: "paragraph",
          text: "**Area picture:** rectangle area \\(f(x)g(x)\\). A change \\(\\Delta x\\) adds strips \\(f'(x)g(x)\\,\\Delta x\\) and \\(f(x)g'(x)\\,\\Delta x\\), two contributions, one plus sign.",
        },
      ],
      media: null,
    },
    notes:
      "Optional proof_sketch, skippable on tight schedule. Tie add/subtract to two-term formula.",
  },
  {
    id: "s14_key_takeaways",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Summary & Key Takeaways",
    question: "",
    lead: "Product rule in one breath:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Product rule:** \\((fg)' = fg' + f'g\\), a **sum**, never \\(f'g'\\)." },
          { id: "bullet_2", text: "**Quotient rule:** \\(\\left(\\frac{f}{g}\\right)'=\\frac{f'g-fg'}{g^2}\\), minus sign and \\(g^2\\) denominator." },
          { id: "bullet_3", text: "**When to use:** genuine products or irreducible fractions; **simplify first** when algebra allows." },
          { id: "bullet_4", text: "**Workflow:** label factors or high/low → differentiate each → apply the matching rule." },
          { id: "bullet_5", text: "**Next topic (13):** The Chain Rule, derivatives of **compositions** \\(f(g(x))\\), plus the essential \\(\\sin, e^x, \\ln x\\) formulas." },
        ],
      },
      {
        id: "final_pause",
        type: "pause_and_reveal",
        title: "Pause: preview Topic 13",
        prompt: "Quick check: Is \\((x^2)'\\cdot(\\sin x)'\\) the derivative of \\(x^2\\sin x\\)?",
        reveal: { text: "**No**, use \\((fg)'=fg'+f'g\\). Compositions like \\(\\sin(x^2)\\) need the **chain rule** next." },
      },
    ],
    media: null,
    notes:
      "Recap + chain-rule tease. Final pause contrasts product vs composition traps. Thank students for Topic 12.",
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
 *   - Replaced function_transform / secant_tangent / python visual plans with
 *     flex_plot y_equals specs, unique curves + verticalMarkers per slide.
 *   - s11 → visual_lab 34/66 layout with labExamples (3 product pairs).
 *   - Removed source, sourceSpec, sourceCode, python_code from all media.
 *
 * RICH BLOCKS
 *   - theorem_box on s04; misconception_compare on s03.
 *   - math_solution_steps on counterexample, worked examples, application.
 *   - proof_sketch tightened on s13; pause_and_reveal on s02, s06, s12, s14.
 *
 * PEDAGOGY
 *   - Welcome-back after Topics 10–11; roadmap currentId path_topic_12.
 *   - Arc: why needed → theorem → x² sin x → pause → more examples → chain tease.
 *
 * ESTIMATED DURATION: ~20–22 min
 */