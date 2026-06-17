// Enhanced by course design review: see changelog at bottom of file.

export const topicMeta = {
  id: "03_power_rule_and_basic_properties_of_derivatives",
  title: "Power Rule and Basic Properties of Derivatives",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
};

const ROADMAP_ITEMS = [
  { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", status: "completed" },
  { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", status: "completed" },
  { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", status: "completed" },
  { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", status: "completed" },
  { id: "path_topic_05", number: 5, session: "S02 Limits and Continuity", label: "One-Sided Limits and Limits at Infinity", status: "completed" },
  { id: "path_topic_06", number: 6, session: "S02 Limits and Continuity", label: "The Squeeze Theorem", status: "completed" },
  { id: "path_topic_07", number: 7, session: "S02 Limits and Continuity", label: "Continuity and the Intermediate Value Theorem", status: "completed" },
  { id: "path_topic_08", number: 8, session: "S03 Derivative Foundations", label: "Instantaneous Rate of Change", status: "completed" },
  { id: "path_topic_09", number: 9, session: "S03 Derivative Foundations", label: "Formal Definition of the Derivative", note: "Previous", status: "completed", expanded: true },
  { id: "path_topic_10", number: 10, session: "S03 Derivative Foundations", label: "Power Rule and Basic Properties", note: "Today", status: "current", expanded: true },
  { id: "path_topic_11", number: 11, session: "S03 Derivative Foundations", label: "Power, Constant Multiple, Sum, and Difference Rules", note: "Next", status: "next", expanded: true },
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
];

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "Power Rule and Basic Properties of Derivatives",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: Power rule, constants, tangent slope • Session 3 • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back, Topic 9 gave f'(a) via the difference quotient; Topic 10 is your first differentiation shortcut. Do not re-introduce Arian from scratch.",
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
        currentId: "path_topic_10",
        items: ROADMAP_ITEMS,
      },
    ],
    bullets: [
      { id: "objective_1", text: "Apply the **Power Rule** \\(\\frac{d}{dx}(x^n)=nx^{n-1}\\) for real exponents." },
      { id: "objective_2", text: "Recognize that \\(\\frac{d}{dx}(c)=0\\), constants do not change." },
      { id: "objective_3", text: "Connect \\(f'(a)\\) from Topic 9 to the **slope of the tangent** at \\(x=a\\)." },
      { id: "objective_4", text: "Differentiate simple power expressions without returning to the limit definition." },
    ],
    notes:
      "Roadmap: Topics 8–9 done (rate of change + formal definition). Today = power rule basics. Topic 11 next (linearity rules for full polynomials).",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: DEFINITION RECAP + POWER RULE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_the_power_rule_your_shortcut_to_change",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "From f'(a) to a Shortcut",
    question: "Topic 9: what limit defines f'(a)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Topic **8** built rate-of-change intuition; Topic **9** formalized it: \\(f'(a)=\\displaystyle\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\), the **difference quotient** shrinking to the **tangent slope**.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "For \\(f(x)=x^2\\), that limit gives \\(f'(a)=2a\\). Topic 10 asks: can we skip the limit when the function is a power of \\(x\\)?",
        },
      ],
      lead: "Recall f'(a); today we earn a faster rule for x^n.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_secant_tangent",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "f(x)=x²: secant → tangent at a",
        caption: "Shrink h: secant slope (blue) → tangent slope (green) = f'(a)=2a.",
        formulaLabel: "f",
        params: { a: 1, h: 1 },
        scriptedTimeline: [
          { t: 0, params: { a: 1, h: 1 } },
          { t: 5, params: { a: 1, h: 0.3 } },
          { t: 10, params: { a: 1.5, h: 0.05 } },
        ],
      },
    },
    notes:
      "Callback Topics 8–9. secant_tangent on x²: animate h→0, readout matches 2a. Bridge: limits gave f'(a); power rule will generalize.",
  },
  {
    id: "s02_the_power_rule_formula",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Power Rule",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Power Rule",
          text: "For any real number \\(n\\): \\(\\displaystyle\\frac{d}{dx}(x^n)=n\\,x^{n-1}\\). Variable in the **base**, exponent **constant**.",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "**Bring down** \\(n\\) as a coefficient, then **lower** the exponent by one. Works for positive, negative, and fractional \\(n\\).",
        },
      ],
      lead: "d/dx(x^n) = n·x^(n−1), the headline rule of Topic 10.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_power_cubic",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=x³ and f'(x)=3x²",
        caption: "Blue = f; dashed orange = derivative: one degree lower.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=x^3,\\ f'(x)=3x^2",
          xDomain: [-2, 2],
          yDomain: [-5, 8],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "f", expr: "x*x*x", stroke: "#2563eb", strokeWidth: 3 },
            { id: "fp", expr: "3*x*x", stroke: "#c65a28", strokeWidth: 2, dashed: true },
          ],
          tags: [{ text: "n=3 → n−1=2", x: 0.5, y: 5.5 }],
        },
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 5, params: { x: 1 } },
          { t: 10, params: { x: -1 } },
        ],
      },
    },
    notes:
      "theorem_box states the rule. flex_plot: x³ and 3x² on same axes, degree drops by one. Probe x=1: slope 3 matches f'(1).",
  },
  {
    id: "s03_constant_multiple_sum_difference_rules",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Derivative of a Constant",
    question: "What is d/dx(7)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Constant rule",
          text: "\\(\\displaystyle\\frac{d}{dx}(c)=0\\) for any constant \\(c\\). A flat line has **zero slope** everywhere.",
        },
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "The constant trap",
          pairs: [
            {
              label: "❌ Common error",
              text: "\\(\\frac{d}{dx}(7)=7\\), treating the constant like \\(x^0\\) without dropping the exponent.",
            },
            {
              label: "✅ Correct",
              text: "\\(\\frac{d}{dx}(7)=0\\), constants never change, so rate of change is zero.",
            },
          ],
        },
      ],
      lead: "Before polynomials: constants differentiate to zero.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_constant_line",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=7: horizontal line",
        caption: "Slope 0 everywhere; derivative is the x-axis.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=7,\\ f'(x)=0",
          xDomain: [-3, 3],
          yDomain: [-2, 10],
          curves: [
            { id: "f", expr: "7", stroke: "#2563eb", strokeWidth: 3 },
            { id: "fp", expr: "0", stroke: "#c65a28", strokeWidth: 2, dashed: true },
          ],
          tags: [{ text: "m = 0", x: -1.5, y: 7.8 }],
        },
        params: { x: 1 },
      },
    },
    notes:
      "misconception_compare: d/dx(7)=7 trap. flex_plot horizontal line + zero derivative. Sum/constant-multiple rules come in Topic 11.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: WORKED EXAMPLES + PAUSE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s04_example_1_warm_up_direct_power_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: Direct Power Rule",
    question: "Try: differentiate g(x)=x^{1/2}.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "f(x)=x^{-3}",
          steps: [
            { id: "step_1", math: "n=-3", gap: "tight", say: "Identify the exponent." },
            { id: "step_2", math: "-3x^{-3-1}=-3x^{-4}", gap: "tight", say: "Bring down n, subtract one from exponent." },
            { id: "step_3", math: "-\\frac{3}{x^4}", say: "Optional rewrite with positive exponent." },
          ],
        },
      ],
      lead: "Negative exponent, same bring-down, drop-by-one pattern.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_checklist",
          type: "nested_bullets",
          items: [
            { id: "c1", text: "Identify \\(n\\)" },
            { id: "c2", text: "Multiply by \\(n\\)" },
            { id: "c3", text: "Exponent → \\(n-1\\)" },
          ],
        },
      ],
      media: {
        id: "right_power_neg",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=x^{-3}",
        caption: "Decreasing for x>0: derivative always negative.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          expr: "x^(-3)",
          xDomain: [0.4, 3],
          yDomain: [-5, 12],
          probe: true,
          probeDefault: 1,
        },
        params: { x: 1 },
      },
    },
    notes:
      "math_solution_steps flow. Negative n works identically. Student prompt: g(x)=x^{1/2} → (1/2)x^{-1/2}.",
  },
  {
    id: "s05_example_2_standard_polynomial",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Power Plus Constant",
    question: "What is h'(x) if h(x)=2x^4+7?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "g(x)=3x^4-5",
          steps: [
            { id: "step_1", op: "=>", math: "\\frac{d}{dx}(3x^4)+\\frac{d}{dx}(-5)", gap: "tight", say: "Differentiate each piece separately." },
            { id: "step_2", math: "3\\cdot 4x^3+0", gap: "tight", say: "Power rule on x^4; constant rule on -5." },
            { id: "step_3", math: "12x^3", say: "Answer: 12x cubed." },
          ],
        },
      ],
      lead: "Power rule on the power term; constant vanishes.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_poly_simple",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "g(x)=3x⁴−5 and g'(x)=12x³",
        caption: "Cubic derivative: degree dropped by one.",
        formulaLabel: "g",
        plot: {
          plotType: "y_equals",
          xDomain: [-1.5, 1.5],
          yDomain: [-8, 8],
          probe: true,
          probeDefault: 0.8,
          curves: [
            { id: "g", expr: "3*x*x*x*x-5", stroke: "#2563eb", strokeWidth: 3 },
            { id: "gp", expr: "12*x*x*x", stroke: "#16a34a", strokeWidth: 2, dashed: true },
          ],
        },
        params: { x: 0.8 },
      },
    },
    notes:
      "Simple two-term example before Topic 11 sum rule deep dive. Constant -5 → 0. flex_plot confirms degree drop.",
  },
  {
    id: "s06_pause_and_predict_fractional_negative_exponents",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Differentiate a Power",
    question: "Differentiate \\(g(x)=x^{1/2}\\). A) \\(\\tfrac{1}{2}x^{1/2}\\)  B) \\(\\tfrac{1}{2}x^{-1/2}\\)  C) \\(2x^{1/2}\\)  D) \\(0\\)",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Square root = \\(x^{1/2}\\). Apply the power rule: bring down \\(\\tfrac{1}{2}\\), subtract 1 from the exponent.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and compute",
          prompt: "Write your answer before continuing.",
          reveal: { text: "**B)** \\(\\displaystyle g'(x)=\\tfrac{1}{2}x^{-1/2}=\\frac{1}{2\\sqrt{x}}\\)" },
        },
      ],
      lead: "Fractional exponent, same rule, careful arithmetic.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_hint",
          type: "formula_block",
          formula: "\\frac{d}{dx}(x^n)=n\\,x^{n-1}",
        },
      ],
      media: {
        id: "right_sqrt",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "g(x)=√x on [0,4]",
        caption: "Positive slope: derivative positive for x>0.",
        formulaLabel: "g",
        plot: {
          plotType: "y_equals",
          expr: "sqrt(x)",
          xDomain: [0, 4],
          yDomain: [-0.5, 2.5],
          probe: true,
          probeDefault: 1,
        },
        params: { x: 1 },
      },
    },
    notes:
      "YouTube pause ~10s. Reveal B. Trap A: forgot to subtract 1 from exponent. sqrt graph as visual anchor.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: EDGE CASES + MISCONCEPTIONS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s07_example_3_tricky_rewriting_first",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Edge Case: What About n = 0?",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "f(x)=x^0=1",
          steps: [
            { id: "step_1", op: "=>", math: "0\\cdot x^{-1}=0", gap: "tight", say: "Power rule with n=0 gives coefficient 0." },
            { id: "step_2", math: "\\frac{d}{dx}(1)=0", say: "Matches the constant rule, a flat line." },
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "**n = 1:** \\(f(x)=x\\) → \\(f'(x)=1\\cdot x^0=1\\). The derivative of \\(x\\) is the constant 1.",
        },
      ],
      lead: "n=0 and n=1 are quick checks that the rule still behaves.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_n0_n1",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=1 (n=0) and f(x)=x (n=1)",
        caption: "Flat → slope 0; line y=x → slope 1.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [-2, 2],
          yDomain: [-1, 3],
          curves: [
            { id: "f0", expr: "1", stroke: "#2563eb", strokeWidth: 3 },
            { id: "f1", expr: "x", stroke: "#c65a28", strokeWidth: 3 },
          ],
          tags: [
            { text: "x^0 → f'=0", x: -1.2, y: 1.3 },
            { text: "x^1 → f'=1", x: -1.2, y: -0.5 },
          ],
        },
        params: { x: 1 },
      },
    },
    notes:
      "Edge n=0: x^0=1, derivative 0. n=1: derivative 1. flex_plot overlays both. Sets up lab on varying n.",
  },
  {
    id: "s08_common_mistake_variable_in_the_wrong_place",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Misconception: Forgetting to Drop the Exponent",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Exponent drop",
          pairs: [
            {
              label: "❌ Forgot to subtract 1",
              text: "\\(\\frac{d}{dx}(x^5)=5x^5\\), brought down 5 but left exponent at 5.",
            },
            {
              label: "✅ Power rule",
              text: "\\(\\frac{d}{dx}(x^5)=5x^4\\), coefficient \\(n\\), exponent \\(n-1\\).",
            },
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "**Checklist:** (1) multiply by \\(n\\), (2) **subtract 1** from the exponent. Both steps, every time.",
        },
      ],
      lead: "The #1 power-rule typo: bring down n but forget n−1.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_table",
          type: "nested_bullets",
          items: [
            { id: "t1", text: "\\(x^2 \\to 2x\\)" },
            { id: "t2", text: "\\(x^5 \\to 5x^4\\)" },
            { id: "t3", text: "\\(x^{-2} \\to -2x^{-3}\\)" },
            { id: "t4", text: "\\(x^{1/3} \\to \\tfrac{1}{3}x^{-2/3}\\)" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "misconception_compare: 5x^5 vs 5x^4. nested_bullets quick reference table. No widget, table is the visual.",
  },
  {
    id: "s09_challenge_optional_example_4_edge_case_mixed_rules",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Fractional & Negative Powers",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          splitAfter: 2,
          problem: "h(x)=\\frac{3}{x^4}+5\\sqrt{x}",
          steps: [
            { id: "step_1", op: "=>", math: "3x^{-4}+5x^{1/2}", gap: "tight", say: "Rewrite radicals and fractions as powers." },
            { id: "step_2", math: "3(-4)x^{-5}+5(\\tfrac12)x^{-1/2}", gap: "tight", say: "Power rule on each term." },
            { id: "step_3", math: "-12x^{-5}+\\tfrac{5}{2}x^{-1/2}", say: "Simplify coefficients." },
            { id: "step_4", math: "-\\frac{12}{x^5}+\\frac{5}{2\\sqrt{x}}", say: "Optional positive-exponent form." },
          ],
        },
      ],
      lead: "Optional, rewrite first, then power rule term by term.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_frac_neg",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "h(x)=3/x⁴ + 5√x",
        caption: "Rewrite as powers before differentiating.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          expr: "3/(x*x*x*x)+5*sqrt(x)",
          xDomain: [0.2, 2.5],
          yDomain: [-2, 8],
          probe: true,
          probeDefault: 1,
        },
        params: { x: 1 },
      },
    },
    notes:
      "Optional challenge. splitAfter=2 for four steps. Callback pause from s06 fractional pattern at harder scale.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: LAB + APPLICATION + SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s10_interactive_lab_explore_the_power_rule",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: How Slope Changes with n",
    question: "Try n=0 and n=1, what happens to f'(x)?",
    lead: "Each tab is a different exponent, f and f' on the same axes.",
    labSiteNote: "On the site, switch tabs and drag the probe.",
    labExamples: [
      {
        id: "lab_n2",
        label: "A · n = 2",
        formula: "f(x)=x^2,\\ f'(x)=2x",
        steps: [
          { text: "Quadratic f, linear derivative." },
          { text: "At x=1, tangent slope = 2." },
        ],
        params: {
          plot: {
            plotType: "y_equals",
            xDomain: [-2, 2],
            yDomain: [-1, 5],
            probe: true,
            probeDefault: 1,
            curves: [
              { id: "f", expr: "x*x", stroke: "#2563eb", strokeWidth: 3 },
              { id: "fp", expr: "2*x", stroke: "#c65a28", strokeWidth: 2, dashed: true },
            ],
          },
        },
      },
      {
        id: "lab_n3",
        label: "B · n = 3",
        formula: "f(x)=x^3,\\ f'(x)=3x^2",
        steps: [
          { text: "Cubic f, quadratic derivative." },
          { text: "Degree always drops by one." },
        ],
        params: {
          plot: {
            plotType: "y_equals",
            xDomain: [-2, 2],
            yDomain: [-5, 8],
            probe: true,
            probeDefault: 1,
            curves: [
              { id: "f", expr: "x*x*x", stroke: "#2563eb", strokeWidth: 3 },
              { id: "fp", expr: "3*x*x", stroke: "#c65a28", strokeWidth: 2, dashed: true },
            ],
          },
        },
      },
      {
        id: "lab_n_half",
        label: "C · n = ½",
        formula: "f(x)=\\sqrt{x},\\ f'(x)=\\tfrac{1}{2}x^{-1/2}",
        steps: [
          { text: "Fractional n, same rule." },
          { text: "Probe x=1: slope = ½." },
        ],
        params: {
          plot: {
            plotType: "y_equals",
            xDomain: [0.1, 4],
            yDomain: [-0.5, 3],
            probe: true,
            probeDefault: 1,
            curves: [
              { id: "f", expr: "sqrt(x)", stroke: "#2563eb", strokeWidth: 3 },
              { id: "fp", expr: "0.5/sqrt(x)", stroke: "#c65a28", strokeWidth: 2, dashed: true },
            ],
          },
        },
      },
    ],
    media: {
      id: "lab_power_rule",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "Power rule lab",
      caption: "Tab switches the exponent: different curve each time.",
      formulaLabel: "f",
      plot: {
        plotType: "y_equals",
        xDomain: [-2, 2],
        yDomain: [-1, 5],
        probe: true,
        probeDefault: 1,
        curves: [
          { id: "f", expr: "x*x", stroke: "#2563eb", strokeWidth: 3 },
          { id: "fp", expr: "2*x", stroke: "#c65a28", strokeWidth: 2, dashed: true },
        ],
      },
      params: { x: 1 },
    },
    notes:
      "visual_lab: three tabs, three different flex_plot expressions (NOT same variant repeated). Demo tab A on video. n=0 → f'=0, n=1 → f'=1.",
  },
  {
    id: "s11_example_5_application_tangent_and_normal_lines",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Tangent Line via Power Rule",
    question: "Slopes multiply to −1 for perpendicular lines?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          splitAfter: 3,
          problem: "y=x\\sqrt{x}\\text{ at }(1,1)",
          steps: [
            { id: "step_1", op: "=>", math: "y=x^{3/2}", gap: "tight", say: "Rewrite x times root x as a single power." },
            { id: "step_2", math: "y'=\\tfrac{3}{2}x^{1/2}", gap: "tight", say: "Power rule: bring down three halves." },
            { id: "step_3", math: "m=\\tfrac{3}{2}(1)^{1/2}=\\tfrac{3}{2}", gap: "tight", say: "Slope at x equals 1." },
            { id: "step_4", math: "y-\\!1=\\tfrac{3}{2}(x-1)", say: "Tangent line in point-slope form." },
            { id: "step_5", math: "m_\\perp=-\\tfrac{2}{3}", say: "Normal slope is negative reciprocal." },
          ],
        },
      ],
      lead: "Power rule → slope → tangent and normal lines.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_tangent_app",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "y=x^{3/2} with tangent at (1,1)",
        caption: "Slope 3/2 at the point of tangency.",
        formulaLabel: "y",
        plot: {
          plotType: "y_equals",
          expr: "x*sqrt(x)",
          xDomain: [0, 2.5],
          yDomain: [-0.5, 3],
          probe: true,
          probeDefault: 1,
          tags: [{ text: "(1,1) slope = 3/2", x: 1.1, y: 2.2 }],
        },
        params: { x: 1 },
      },
    },
    notes:
      "Application tying power rule to geometry. splitAfter=3 for five steps. Check (3/2)(-2/3)=-1 for normal.",
  },
  {
    id: "s12_challenge_optional_proof_for_positive_integers",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Why the Power Rule Works (n ∈ ℕ)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_proof",
          type: "proof_sketch",
          title: "Binomial limit sketch",
          text: "Starting from Topic 9's definition for \\(f(x)=x^n\\):",
          steps: [
            { id: "step_1", text: "Expand \\((x+h)^n\\), every term after the linear one has a factor of \\(h\\)." },
            { id: "step_2", text: "Divide by \\(h\\), let \\(h\\to 0\\), only \\(\\binom{n}{1}x^{n-1}h\\) survives." },
            { id: "step_3", text: "Result: \\(n x^{n-1}\\). Optional, skip if time is short." },
          ],
        },
      ],
      lead: "Optional proof, connects back to the difference quotient.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_limit",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "f'(x)=\\lim_{h\\to 0}\\frac{(x+h)^n-x^n}{h}",
          steps: [
            { id: "d1", math: "=\\binom{n}{1}x^{n-1}+\\text{(terms with }h\\text{)}", gap: "tight", say: "After expansion and cancellation." },
            { id: "d2", math: "=nx^{n-1}", say: "Only the linear term survives the limit." },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Optional challenge. proof_sketch + stack math steps, no limit_epsilon placeholder. Callback Topic 9 limit definition.",
  },
  {
    id: "s13_key_takeaways",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways",
    lead: "Topic 10 in one glance, then Topic 11 extends to full polynomials:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Power Rule:** \\(\\frac{d}{dx}(x^n)=n\\,x^{n-1}\\), bring down \\(n\\), subtract 1 from exponent." },
          { id: "bullet_2", text: "**Constant rule:** \\(\\frac{d}{dx}(c)=0\\), flat lines have zero slope." },
          { id: "bullet_3", text: "**Topic 9 link:** \\(f'(a)\\) = tangent slope; power rule computes it fast." },
          { id: "bullet_4", text: "**Edge cases:** \\(n=0\\Rightarrow f'=0\\); \\(n=1\\Rightarrow f'=1\\)." },
          { id: "bullet_5", text: "**Next topic**, Constant Multiple, Sum, and Difference Rules: differentiate any polynomial term by term." },
        ],
      },
      {
        id: "final_check",
        type: "pause_and_reveal",
        title: "Final check",
        prompt: "d/dx(x⁴) = ?  A) 4x⁴  B) 4x³  C) x³  D) 4",
        reveal: { text: "**B)** \\(4x^3\\), multiply by 4, exponent becomes 3." },
      },
    ],
    media: null,
    notes:
      "nested_bullets summary + final MC (answer B). Tease Topic 11 linearity rules. Thank students; welcome-back arc complete for power-rule basics.",
  },
];

export default slidesData;

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * COURSE DESIGN CHANGELOG
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * v1 hand-enhance (June 2026)
 *
 * WIDGETS
 *   - secant_tangent on s01 (Topic 8–9 callback); flex_plot on s02–s07, s09–s11.
 *   - visual_lab s10: three tabs with distinct plot curves (n=2, 3, ½).
 *   - Removed all source/sourceSpec/sourceCode metadata from media blocks.
 *
 * RICH BLOCKS
 *   - theorem_box: power rule (s02), constant rule (s03).
 *   - math_solution_steps on all worked examples (flow/split/stack).
 *   - misconception_compare: d/dx(c)=0 trap (s03), exponent-drop trap (s08).
 *   - pause_and_reveal on s06 pause + s13 final check.
 *   - nested_bullets: power-rule checklist (s04), summary (s13).
 *
 * PEDAGOGY
 *   - Welcome back; callbacks Topics 8–9 (difference quotient, f'(a)).
 *   - Arc: definition recap → power rule → constants → examples → pause → n=0 → summary.
 *   - Roadmap currentId path_topic_10; Topic 11 handoff.
 *
 * ESTIMATED DURATION: ~18–22 min
 */