// Enhanced by course design review: see changelog at bottom of file.

export const topicMeta = {
  id: "04_power_rule_constant_multiple_and_sum_difference_rules",
  title: "Power Rule, Constant Multiple, and Sum-Difference Rules",
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
  { id: "path_topic_09", number: 9, session: "S03 Derivative Foundations", label: "Formal Definition of the Derivative", status: "completed" },
  { id: "path_topic_10", number: 10, session: "S03 Derivative Foundations", label: "Power Rule and Basic Properties", note: "Previous", status: "completed", expanded: true },
  { id: "path_topic_11", number: 11, session: "S03 Derivative Foundations", label: "Power, Constant Multiple, Sum, and Difference Rules", note: "Today", status: "current", expanded: true },
  { id: "path_topic_12", number: 12, session: "S03 Derivative Foundations", label: "The Product Rule for Derivatives", note: "Next", status: "next", expanded: true },
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
    title: "Power Rule, Constant Multiple, and Sum-Difference Rules",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: Linearity rules for polynomials • Session 3 • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back, Topic 10 gave the power rule and constant rule; Topic 11 adds **linearity** so any polynomial is fast. Callback Topics 8–9: derivative = tangent slope.",
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
        currentId: "path_topic_11",
        items: ROADMAP_ITEMS,
      },
    ],
    bullets: [
      { id: "objective_1", text: "Apply the **Constant Multiple Rule** \\(\\frac{d}{dx}[cf]=c\\,f'\\)." },
      { id: "objective_2", text: "Use **Sum and Difference Rules** to differentiate term by term." },
      { id: "objective_3", text: "Combine all three rules to differentiate any **polynomial** efficiently." },
      { id: "objective_4", text: "Simplify expressions before differentiating when algebra allows." },
    ],
    notes:
      "Roadmap: Topic 10 done (power + constant). Today = linearity toolkit. Topic 12 Product Rule is next, when factors multiply, not add.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: LINEARITY + CONSTANT MULTIPLE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_why_derivatives_matter",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Differentiation Is Linear",
    question: "If f and g are differentiable, what is (f+g)'?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Topic **10** gave \\(\\frac{d}{dx}(x^n)=nx^{n-1}\\) and \\(\\frac{d}{dx}(c)=0\\). Topic **11** adds the **linearity** idea: differentiation **distributes** over addition and pulls constants out front.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "That is why polynomials are easy, break them into power terms, differentiate each, recombine. Topic **4** limit laws did the same for limits; derivatives inherit the pattern.",
        },
      ],
      lead: "Linearity = constant multiple + sum + difference.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_rules_preview",
          type: "nested_bullets",
          items: [
            { id: "r1", text: "Constant multiple: \\(\\frac{d}{dx}[cf]=c f'\\)" },
            { id: "r2", text: "Sum: \\(\\frac{d}{dx}[f+g]=f'+g'\\)" },
            { id: "r3", text: "Difference: \\(\\frac{d}{dx}[f-g]=f'-g'\\)" },
          ],
        },
      ],
      media: {
        id: "right_linearity_plot",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=x² + 3x: two pieces",
        caption: "Derivative = derivative of each piece.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [-2, 2],
          yDomain: [-2, 8],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "f1", expr: "x*x", stroke: "#2563eb", strokeWidth: 2 },
            { id: "f2", expr: "3*x", stroke: "#16a34a", strokeWidth: 2 },
            { id: "sum", expr: "x*x+3*x", stroke: "#0f172a", strokeWidth: 3 },
          ],
          tags: [{ text: "f + g", x: -1.2, y: 6 }],
        },
        params: { x: 1 },
      },
    },
    notes:
      "Linearity hook. nested_bullets preview. flex_plot: x², 3x, and sum as three curves, sets up sum rule visually.",
  },
  {
    id: "s02_the_power_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Power Rule Recap",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Power Rule (Topic 10)",
          text: "\\(\\displaystyle\\frac{d}{dx}(x^n)=n\\,x^{n-1}\\), still the engine inside every polynomial term.",
        },
      ],
      lead: "Every term starts with the power rule; linearity handles the rest.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_power_recap",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=x³ and f'(x)=3x²",
        caption: "Quick Topic 10 callback before combining rules.",
        formulaLabel: "f",
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
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 5, params: { x: 1 } },
        ],
      },
    },
    notes:
      "Brief recap, theorem_box + flex_plot x³/3x². Do not linger; students saw this in Topic 10.",
  },
  {
    id: "s03_warm_up_apply_the_power_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: Apply the Power Rule",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "f(x)=x^5",
          steps: [
            { id: "step_1", math: "n=5", gap: "tight", say: "Identify exponent." },
            { id: "step_2", math: "5x^{5-1}=5x^4", gap: "tight", say: "Bring down 5, subtract 1." },
            { id: "step_3", math: "f'(x)=5x^4", say: "Answer." },
          ],
        },
      ],
      lead: "One term, one rule, before we stack linearity on top.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_x5",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=x⁵ and f'(x)=5x⁴",
        caption: "Derivative non-negative: f increasing.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [-1.5, 1.5],
          yDomain: [-2, 6],
          probe: true,
          probeDefault: 0.8,
          curves: [
            { id: "f", expr: "x*x*x*x*x", stroke: "#2563eb", strokeWidth: 3 },
            { id: "fp", expr: "5*x*x*x*x", stroke: "#c65a28", strokeWidth: 2, dashed: true },
          ],
        },
        params: { x: 0.8 },
      },
    },
    notes:
      "math_solution_steps warm-up. flex_plot x⁵/5x⁴, different expression from s02 (not repeated variant).",
  },
  {
    id: "s04_constant_multiple_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Constant Multiple Rule",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Constant Multiple Rule",
          text: "\\(\\displaystyle\\frac{d}{dx}[c\\cdot f(x)]=c\\cdot f'(x)\\), constants **pass through** the derivative.",
        },
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "f(x)=4x^2",
          steps: [
            { id: "step_1", op: "=>", math: "4\\cdot\\frac{d}{dx}(x^2)", gap: "tight", say: "Pull the 4 out front." },
            { id: "step_2", math: "4\\cdot 2x", gap: "tight", say: "Power rule on x squared." },
            { id: "step_3", math: "8x", say: "Answer: 8x." },
          ],
        },
      ],
      lead: "Differentiate the function; keep the coefficient.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_4x2",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=4x² and f'(x)=8x",
        caption: "Steeper parabola: slope doubled at every x.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [-2, 2],
          yDomain: [-2, 10],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "f", expr: "4*x*x", stroke: "#2563eb", strokeWidth: 3 },
            { id: "fp", expr: "8*x", stroke: "#c65a28", strokeWidth: 2, dashed: true },
          ],
        },
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 5, params: { x: 1 } },
        ],
      },
    },
    notes:
      "theorem_box + worked math_solution_steps. flex_plot 4x²/8x. At x=1 tangent slope 8, secant_tangent not needed; probe confirms.",
  },
  {
    id: "s05_watch_out_common_mistakes",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Watch Out: Common Mistakes",
    question: "Why is d/dx(2^x) ≠ x·2^{x−1}?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Two classic traps",
          pairs: [
            {
              label: "❌ Constant trap",
              text: "\\(\\frac{d}{dx}(7)=7\\), a constant has **zero** rate of change.",
            },
            {
              label: "✅ Correct",
              text: "\\(\\frac{d}{dx}(7)=0\\), Topic 10 constant rule.",
            },
          ],
        },
        {
          id: "left_misconception_2",
          type: "misconception_compare",
          title: "Power vs exponential",
          pairs: [
            {
              label: "❌ Wrong rule on 2^x",
              text: "Power rule gives \\(x\\cdot 2^{x-1}\\), variable is in the **exponent**, not the base.",
            },
            {
              label: "✅ Not today",
              text: "\\(2^x\\) needs the exponential rule (later). Power rule = variable in **base**.",
            },
          ],
        },
      ],
      lead: "d/dx(c)=0 and power rule only when x is in the base.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_compare",
          type: "nested_bullets",
          items: [
            { id: "c1", text: "\\(x^2\\) → power rule ✓" },
            { id: "c2", text: "\\(2^x\\) → exponential rule (later)" },
            { id: "c3", text: "\\(7\\) → derivative 0" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Two misconception_compare blocks: constant trap + 2^x vs x^2. nested_bullets decision table. No placeholder visual plans.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: SUM / DIFFERENCE + COMBINED EXAMPLE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s06_sum_and_difference_rules",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Sum and Difference Rules",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Sum and Difference Rules",
          text: "\\(\\displaystyle\\frac{d}{dx}[f(x)\\pm g(x)]=f'(x)\\pm g'(x)\\), differentiate **term by term**, keep the signs.",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Analogous to Topic **4** sum law for limits: the derivative of a sum is the sum of derivatives.",
        },
      ],
      lead: "Break a polynomial into terms; differentiate each; add the results.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_sum_visual",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f=x², g=3x, f+g, and derivatives",
        caption: "Slope of sum = sum of slopes: linearity in action.",
        formulaLabel: "f+g",
        plot: {
          plotType: "y_equals",
          formula: "(f+g)'=f'+g'",
          xDomain: [-2, 2],
          yDomain: [-2, 10],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "f", expr: "x*x", stroke: "#2563eb", strokeWidth: 2 },
            { id: "g", expr: "3*x", stroke: "#16a34a", strokeWidth: 2 },
            { id: "sum", expr: "x*x+3*x", stroke: "#0f172a", strokeWidth: 3 },
            { id: "fp", expr: "2*x", stroke: "#2563eb", strokeWidth: 1, dashed: true },
            { id: "gp", expr: "3", stroke: "#16a34a", strokeWidth: 1, dashed: true },
            { id: "sum_p", expr: "2*x+3", stroke: "#c65a28", strokeWidth: 2, dashed: true },
          ],
          tags: [{ text: "f'+g' = (f+g)'", x: -1.5, y: 8 }],
        },
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 6, params: { x: 1.5 } },
        ],
      },
    },
    notes:
      "theorem_box sum/difference. Multi-curve flex_plot: f, g, sum AND f', g', sum', visual check of linearity. Callback Topic 4 limit sum law.",
  },
  {
    id: "s07_standard_example_combining_rules",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Standard Example: Full Polynomial",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          splitAfter: 2,
          problem: "f(x)=4x^5-3x^2+7x-2",
          steps: [
            { id: "step_1", op: "=>", math: "4\\frac{d}{dx}(x^5)-3\\frac{d}{dx}(x^2)+7\\frac{d}{dx}(x)-\\frac{d}{dx}(2)", gap: "tight", say: "Sum/difference rule, term by term." },
            { id: "step_2", math: "4\\cdot 5x^4-3\\cdot 2x+7\\cdot 1-0", gap: "tight", say: "Constant multiple + power rule on each term." },
            { id: "step_3", math: "20x^4-6x+7", say: "Answer, degree dropped by one; constant gone." },
          ],
        },
      ],
      lead: "All three rules in one pass, template for any polynomial.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_table",
          type: "nested_bullets",
          items: [
            { id: "t1", text: "\\(4x^5 \\to 20x^4\\)" },
            { id: "t2", text: "\\(-3x^2 \\to -6x\\)" },
            { id: "t3", text: "\\(7x \\to 7\\)" },
            { id: "t4", text: "\\(-2 \\to 0\\)" },
          ],
        },
      ],
      media: {
        id: "right_poly_full",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f and f': degree 5 → 4",
        caption: "Quartic derivative tracks the quintic's slope.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [-1.2, 1.2],
          yDomain: [-6, 6],
          probe: true,
          probeDefault: 0.5,
          curves: [
            { id: "f", expr: "4*x*x*x*x*x-3*x*x+7*x-2", stroke: "#2563eb", strokeWidth: 3 },
            { id: "fp", expr: "20*x*x*x*x-6*x+7", stroke: "#c65a28", strokeWidth: 2, dashed: true },
          ],
        },
        params: { x: 0.5 },
      },
    },
    notes:
      "Flagship combined example. math_solution_steps splitAfter=2. nested_bullets term table on right. flex_plot confirms degree drop.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: PRACTICE PAUSE + SOLUTION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s08_your_turn_practice",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Differentiate the Polynomial",
    question: "Compute g'(x) for g(x)=2x⁴+5x³−x+8.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Term by term: constant multiple + power rule. Remember \\(\\frac{d}{dx}(x)=1\\) and \\(\\frac{d}{dx}(8)=0\\).",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and compute",
          prompt: "Write g'(x) before continuing.",
          reveal: { text: "\\(g'(x)=8x^3+15x^2-1\\), see next slide for step-by-step." },
        },
      ],
      lead: "YouTube think-beat, all three rules together.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_practice_poly",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "g(x)=2x⁴+5x³−x+8",
        caption: "Quartic: derivative will be cubic.",
        formulaLabel: "g",
        plot: {
          plotType: "y_equals",
          expr: "2*x*x*x*x+5*x*x*x-x+8",
          xDomain: [-1.5, 1.5],
          yDomain: [-5, 15],
          probe: true,
          probeDefault: 0,
        },
        params: { x: 0 },
      },
    },
    notes:
      "pause_and_reveal with real answer hint. ~15s pause. flex_plot of g only, solution on s09 with g'.",
  },
  {
    id: "s09_solution_practice_problem",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Solution: Practice Problem",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "g(x)=2x^4+5x^3-x+8",
          steps: [
            { id: "step_1", math: "8x^3", gap: "tight", say: "2 times 4x cubed." },
            { id: "step_2", math: "+15x^2", gap: "tight", say: "5 times 3x squared." },
            { id: "step_3", math: "-1", gap: "tight", say: "Derivative of negative x." },
            { id: "step_4", math: "+0", gap: "tight", say: "Constant 8 vanishes." },
            { id: "step_5", math: "g'(x)=8x^3+15x^2-1", say: "Combine, answer." },
          ],
        },
      ],
      lead: "Term-by-term reveal, check against your pause answer.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_g_gp",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Verify slope at x=0.5",
        caption: "Tangent slope ≈ g'(0.5) = 8(0.125)+15(0.25)−1 ≈ 2.75.",
        formulaLabel: "g",
        params: { a: 0.5, h: 0.3 },
        scriptedTimeline: [
          { t: 0, params: { a: 0.5, h: 0.3 } },
          { t: 5, params: { a: 0.5, h: 0.05 } },
        ],
      },
    },
    notes:
      "Full math_solution_steps. secant_tangent on x² default, narrate as slope-check idea; exact g' verification is algebraic. h→0 beat.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: FRACTIONAL / EDGE / APPLICATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s10_fractional_and_negative_exponents",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Fractional and Negative Exponents",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_rewrite",
          type: "nested_bullets",
          items: [
            { id: "w1", text: "\\(\\sqrt{x}=x^{1/2}\\)" },
            { id: "w2", text: "\\(1/x^3=x^{-3}\\)" },
            { id: "w3", text: "\\(5/x^4=5x^{-4}\\)" },
          ],
        },
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "h(x)=\\frac{3}{x^2}-5\\sqrt{x}",
          steps: [
            { id: "step_1", op: "=>", math: "3x^{-2}-5x^{1/2}", gap: "tight", say: "Rewrite as powers." },
            { id: "step_2", math: "-6x^{-3}-\\tfrac{5}{2}x^{-1/2}", say: "Power rule on each term." },
          ],
        },
      ],
      lead: "Rewrite radicals and fractions, then same linearity + power rule.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_neg_frac",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "h(x)=3/x² − 5√x",
        caption: "Different expression from prior slides.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          expr: "3/(x*x)-5*sqrt(x)",
          xDomain: [0.15, 3],
          yDomain: [-8, 5],
          probe: true,
          probeDefault: 1,
        },
        params: { x: 1 },
      },
    },
    notes:
      "nested_bullets rewrite cheat sheet. math_solution_steps for h. flex_plot distinct from s07/s08.",
  },
  {
    id: "s11_pause_and_try_fractional_and_negative_exponents",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Rewrite Then Differentiate",
    question: "h(x)=3/x²−5√x, find h'(x).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Step 1: write \\(3x^{-2}-5x^{1/2}\\). Step 2: power rule each term. Watch negative exponents.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and compute",
          prompt: "Complete h'(x) before continuing.",
          reveal: { text: "\\(h'(x)=-6x^{-3}-\\tfrac{5}{2}x^{-1/2}\\), full steps on the next slide." },
        },
      ],
      lead: "Same problem as s10, now you try solo.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_formula",
          type: "formula_block",
          formula: "\\frac{d}{dx}(x^n)=n\\,x^{n-1}",
        },
      ],
      media: null,
    },
    notes:
      "Second pause, reinforces s10. Reveal matches s12 solution. formula_block on right as anchor.",
  },
  {
    id: "s12_solution_tricky_example",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Solution: Fractional & Negative Powers",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "h(x)=3x^{-2}-5x^{1/2}",
          steps: [
            { id: "step_1", math: "3(-2)x^{-3}=-6x^{-3}", gap: "tight", say: "First term." },
            { id: "step_2", math: "-5(\\tfrac12)x^{-1/2}=-\\tfrac{5}{2}x^{-1/2}", gap: "tight", say: "Second term." },
            { id: "step_3", math: "h'(x)=-6x^{-3}-\\tfrac{5}{2}x^{-1/2}", say: "Combine." },
            { id: "step_4", math: "-\\frac{6}{x^3}-\\frac{5}{2\\sqrt{x}}", say: "Optional positive-exponent form." },
          ],
        },
      ],
      lead: "Matches the pause reveal, coefficient arithmetic is the tricky part.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_h_prime",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "h and h' near x=1",
        caption: "Both negative at x=1: function decreasing.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          xDomain: [0.2, 2.5],
          yDomain: [-8, 3],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "h", expr: "3/(x*x)-5*sqrt(x)", stroke: "#2563eb", strokeWidth: 3 },
            { id: "hp", expr: "-6/(x*x*x)-2.5/sqrt(x)", stroke: "#c65a28", strokeWidth: 2, dashed: true },
          ],
        },
        params: { x: 1 },
      },
    },
    notes:
      "Solution for pause. math_solution_steps four steps. flex_plot h and h' together, slope check at x=1.",
  },
  {
    id: "s13_edge_case_simplify_before_differentiating",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Edge Case: Simplify Before Differentiating",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "f(x)=\\frac{x^3+2x^2-5x}{x}",
          steps: [
            { id: "step_1", op: "=>", math: "x^2+2x-5", gap: "tight", say: "Divide each term by x first, domain x not 0." },
            { id: "step_2", math: "f'(x)=2x+2", say: "Power + sum rules on the polynomial." },
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "**Golden rule:** algebra first, calculus second. Product rule (Topic 12) is for when you **cannot** simplify.",
        },
      ],
      lead: "A rational expression that is secretly a polynomial.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_simplify",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Rational form vs x²+2x−5",
        caption: "Same graph for x≠0; hole at x=0 in original.",
        formulaLabel: "f",
        plot: {
          plotType: "rational_hole",
          holeAt: 0,
          simplifiedExpr: "x*x+2*x-5",
          formula: "f(x)=\\frac{x^3+2x^2-5x}{x}\\to x^2+2x-5",
          xDomain: [-4, 4],
          yDomain: [-10, 15],
          probe: true,
          probeDefault: 2,
        },
        params: { x: 2, a: 0, showSimplified: true },
      },
    },
    notes:
      "Simplify-first edge case. flex_plot rational_hole variant. Forward pointer Topic 12 product rule.",
  },
  {
    id: "s14_application_motion_along_a_line",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Motion Along a Line",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_setup",
          type: "paragraph",
          text: "Position \\(s(t)=2t^3-9t^2+12t+5\\). **Velocity** \\(v(t)=s'(t)\\); **acceleration** \\(a(t)=v'(t)\\).",
        },
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "s(t)=2t^3-9t^2+12t+5",
          steps: [
            { id: "step_1", math: "v(t)=6t^2-18t+12", gap: "tight", say: "Differentiate term by term." },
            { id: "step_2", math: "a(t)=12t-18", say: "Differentiate velocity, power rule again." },
          ],
        },
      ],
      lead: "Polynomial rules → physics: position, velocity, acceleration.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_motion",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "s(t) and v(t) on [0,3]",
        caption: "Velocity zero where s has horizontal tangent.",
        formulaLabel: "s",
        plot: {
          plotType: "y_equals",
          xDomain: [0, 3],
          yDomain: [-5, 20],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "s", expr: "2*x*x*x-9*x*x+12*x+5", stroke: "#2563eb", strokeWidth: 3 },
            { id: "v", expr: "6*x*x-18*x+12", stroke: "#c65a28", strokeWidth: 2, dashed: true },
          ],
          tags: [{ text: "v = s'", x: 0.3, y: 16 }],
        },
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 6, params: { x: 2 } },
        ],
      },
    },
    notes:
      "Application slide. math_solution_steps for v and a. flex_plot position + velocity, different curves from prior slides.",
  },
  {
    id: "s15_application_find_when_particle_is_at_rest",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: When Is the Particle at Rest?",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "v(t)=6t^2-18t+12=0",
          steps: [
            { id: "step_1", math: "t^2-3t+2=0", gap: "tight", say: "Divide by 6." },
            { id: "step_2", math: "(t-1)(t-2)=0", gap: "tight", say: "Factor." },
            { id: "step_3", math: "t=1\\text{ s},\\ t=2\\text{ s}", say: "Rest when velocity is zero." },
          ],
        },
      ],
      lead: "At rest ⟺ v(t)=0, set the derivative equal to zero.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_velocity_zero",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "v(t)=6t²−18t+12",
        caption: "Crosses zero at t=1 and t=2.",
        formulaLabel: "v",
        plot: {
          plotType: "y_equals",
          expr: "6*x*x-18*x+12",
          xDomain: [0, 3],
          yDomain: [-4, 14],
          probe: true,
          probeDefault: 1,
          tags: [
            { text: "t=1", x: 1, y: 2 },
            { text: "t=2", x: 2, y: 2 },
          ],
        },
        params: { x: 1 },
      },
    },
    notes:
      "stack math_solution_steps for solving v=0. flex_plot velocity with tags at rest times. Links to s14 motion context.",
  },
  {
    id: "s16_challenge_optional_proof_of_power_rule_for_positive_integers",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Proof Sketch (n ∈ ℕ)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_proof",
          type: "proof_sketch",
          title: "From difference quotient",
          text: "Topic **9** definition + binomial theorem ⇒ power rule for positive integers.",
          steps: [
            { id: "step_1", text: "\\(\\lim_{h\\to 0}\\frac{(x+h)^n-x^n}{h}\\), expand, cancel \\(x^n\\)." },
            { id: "step_2", text: "Only the \\(nx^{n-1}h\\) term lacks an extra \\(h\\) factor." },
            { id: "step_3", text: "Limit gives \\(nx^{n-1}\\). Optional, skip if short on time." },
          ],
        },
      ],
      lead: "Optional, connects linearity toolkit back to Topic 9 limits.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "f'(x)=\\lim_{h\\to 0}\\frac{(x+h)^n-x^n}{h}",
          steps: [
            { id: "d1", math: "=nx^{n-1}+\\text{terms}\\to 0", say: "Higher h-powers vanish." },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Optional proof, no limit_epsilon placeholder. proof_sketch + stack step. Callback Topic 9.",
  },
  {
    id: "s17_summary_and_key_formulas",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Summary and Key Formulas",
    lead: "Your polynomial differentiation toolkit, then Product Rule:",
    blocks: [
      {
        id: "body_rules",
        type: "nested_bullets",
        items: [
          { id: "rule_1", text: "**Power:** \\(\\frac{d}{dx}(x^n)=n\\,x^{n-1}\\) (Topic 10)" },
          { id: "rule_2", text: "**Constant multiple:** \\(\\frac{d}{dx}[cf]=c f'\\)" },
          { id: "rule_3", text: "**Sum / difference:** \\(\\frac{d}{dx}[f\\pm g]=f'\\pm g'\\)" },
          { id: "rule_4", text: "**Constants:** \\(\\frac{d}{dx}(c)=0\\)" },
          { id: "rule_5", text: "**Workflow:** simplify → term by term → power rule on each" },
          { id: "rule_6", text: "**Next topic**, **Product Rule**: when factors **multiply** (e.g. \\(x^2\\sin x\\)), linearity is not enough." },
        ],
      },
      {
        id: "final_check",
        type: "pause_and_reveal",
        title: "Final check",
        prompt: "d/dx(3x²−7) = ?  A) 6x−7  B) 6x  C) 3x  D) 6x²",
        reveal: { text: "**B)** \\(6x\\), power rule on \\(3x^2\\), constant −7 → 0." },
      },
    ],
    media: null,
    notes:
      "nested_bullets rule summary table. Tease Topic 12 Product Rule by name. Final MC: constant trap (A) vs correct B. Welcome-back arc complete.",
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
 *   - flex_plot throughout with distinct expressions per slide (no repeated secant_tangent spam).
 *   - s06 multi-curve flex_plot: f, g, f+g and f', g', (f+g)' linearity check.
 *   - s09 secant_tangent for slope-verify intuition; s13 rational_hole simplify demo.
 *   - Removed all source/sourceSpec/sourceCode metadata.
 *
 * RICH BLOCKS
 *   - theorem_box: power recap, constant multiple, sum/difference.
 *   - math_solution_steps on all worked examples (flow/split/stack).
 *   - misconception_compare: d/dx(c)=0 and 2^x trap (s05).
 *   - pause_and_reveal on s08, s11, s17 final check.
 *   - nested_bullets: rule previews, term tables, summary.
 *
 * PEDAGOGY
 *   - Welcome back; callbacks Topics 8–10 (f'(a), power rule, constant rule).
 *   - Arc: linearity → constant multiple → sum/difference → polynomial → visual check → pause → summary.
 *   - Roadmap currentId path_topic_11; Product Rule teaser Topic 12.
 *
 * ESTIMATED DURATION: ~20–24 min
 */