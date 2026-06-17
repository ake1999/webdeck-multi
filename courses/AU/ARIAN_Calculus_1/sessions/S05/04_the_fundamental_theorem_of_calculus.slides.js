// Generated from courses/Calculus/Materials/the_fundamental_theorem_of_calculus.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "04_the_fundamental_theorem_of_calculus",
  title: "The Fundamental Theorem of Calculus – Connecting Integration and Differentiation",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/the_fundamental_theorem_of_calculus.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "The Fundamental Theorem of Calculus – Connecting Integration and Differentiation",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: FTC Part 1 & 2 • Session 5 • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back, Topic 22 gave antiderivatives, Topic 24 defined the definite integral as a limit of sums. Topic 25 is the bridge: FTC turns tedious Riemann limits into endpoint evaluation. Do not re-introduce Arian from scratch.",
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
        currentId: "path_topic_25",
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
          { id: "path_topic_15", number: 15, session: "S04 Applications of Derivatives", label: "Related Rates", status: "completed" },
          { id: "path_topic_16", number: 16, session: "S04 Applications of Derivatives", label: "Critical Points and Extrema on an Interval", status: "completed" },
          { id: "path_topic_17", number: 17, session: "S04 Applications of Derivatives", label: "Rolle's Theorem and the Mean Value Theorem", status: "completed" },
          { id: "path_topic_18", number: 18, session: "S04 Applications of Derivatives", label: "First and Second Derivative Tests", status: "completed" },
          { id: "path_topic_19", number: 19, session: "S04 Applications of Derivatives", label: "Optimization Problems", status: "completed" },
          { id: "path_topic_20", number: 20, session: "S04 Applications of Derivatives", label: "L'Hopital's Rule", status: "completed" },
          { id: "path_topic_21", number: 21, session: "S04 Applications of Derivatives", label: "Newton's Method and Linear Approximations", status: "completed" },
          { id: "path_topic_22", number: 22, session: "S05 Integration Foundations", label: "Antiderivatives and Indefinite Integrals", status: "completed" },
          { id: "path_topic_23", number: 23, session: "S05 Integration Foundations", label: "Approximating Area with Riemann Sums", status: "completed" },
          { id: "path_topic_24", number: 24, session: "S05 Integration Foundations", label: "The Definite Integral", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_25", number: 25, session: "S05 Integration Foundations", label: "The Fundamental Theorem of Calculus", note: "This topic", status: "current", expanded: true },
          { id: "path_topic_26", number: 26, session: "S05 Integration Foundations", label: "Integration by Substitution", note: "Next", status: "next", expanded: true },
        ],
      },
    ],
    bullets: [
      { id: "objective_1", text: "Evaluate definite integrals via FTC Part 2: \\(F(b)-F(a)\\)" },
      { id: "objective_2", text: "Interpret differentiation and integration as inverse processes" },
      { id: "objective_3", text: "Apply FTC Part 1 when the upper limit is a function (chain rule)" },
      { id: "objective_4", text: "Analyze functions defined by integrals and spot common traps" },
      { id: "objective_5", text: "Use FTC in area and initial-value applications" },
    ],
    notes:
      "Roadmap first: callback Topics 22 (antiderivatives) and 24 (definite integral). Topic 26 substitution is next, preview only after Part 2 is solid.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: HOOK + INTUITION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_from_riemann_sums_to_a_shortcut",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "From Riemann Sums to a Shortcut",
    question: "Topic 24 defined the definite integral as a limit of sums, why do we need a shortcut?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_problem",
          type: "paragraph",
          text: "**The problem (Topic 24):** $$\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty}\\sum_{i=1}^n f(x_i^*)\\Delta x$$",
        },
        {
          id: "left_tease",
          type: "paragraph",
          text: "Computing this **limit** directly is tedious, like counting every step of a journey. The FTC gives a **fast-forward button**: evaluate an antiderivative at just **two endpoints**.",
        },
      ],
      lead: "Riemann sums are correct but painful. FTC teases the antiderivative shortcut.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_hook",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Rectangles → exact area",
        caption: "Increase n: sum converges, but FTC skips the limit entirely.",
        params: { a: 0, b: 3, n: 8, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 3, n: 4, method: "midpoint" } },
          { t: 4, params: { a: 0, b: 3, n: 12, method: "midpoint" } },
          { t: 8, params: { a: 0, b: 3, n: 28, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Callback Topic 23–24 Riemann definition. Widget: coarse rectangles then fine, sum approaches area, but we will not compute limits by hand anymore. Tease Part 2.",
  },
  {
    id: "s02_a_simple_analogy_speedometer_and_odometer",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "A Simple Analogy: Speedometer and Odometer",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_table",
          type: "math_table",
          headers: ["Speedometer \\(v(t)\\)", "Odometer \\(s(t)\\)"],
          rows: [
            ["instantaneous rate", "net displacement"],
            ["derivative of \\(s\\)", "antiderivative of \\(v\\) (with \\(s(0)=0\\))"],
          ],
        },
        {
          id: "left_ftc",
          type: "formula_block",
          formula: "\\int_a^b v(t)\\,dt = s(b) - s(a)",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Area under velocity = odometer difference. Integration **accumulates**; differentiation gives **instantaneous rate**, they undo each other.",
        },
      ],
      lead: "Integrate velocity (area) or subtract odometer readings, FTC says both match.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_secant_tangent",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Rate vs accumulated change",
        caption: "Slope of position ≈ height of velocity at each instant.",
        params: { a: 1, h: 0.5 },
        scriptedTimeline: [
          { t: 0, params: { a: 0.5, h: 1 } },
          { t: 5, params: { a: 1.5, h: 0.3 } },
          { t: 9, params: { a: 2.5, h: 0.15 } },
        ],
      },
    },
    notes:
      "Car metaphor: speedometer = derivative, odometer = antiderivative. Example v(t)=2t, s(t)=t². Area ∫₀³ 2t dt = 9 = s(3)-s(0). Sets up inverse relationship before formal statements.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: FTC PART 1 & PART 2
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s03_ftc_part_1_derivative_of_an_integral",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "FTC Part 1 – Derivative of an Integral",
    question: "Move the probe, does the tangent slope on \\(g(x)\\) match \\(f(x)\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "FTC Part 1",
          text: "If \\(f\\) is continuous on \\([a,b]\\), then for \\(x \\in (a,b)\\), \\(\\displaystyle\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)\\). **General form:** if the upper limit is \\(g(x)\\), then \\(\\displaystyle\\frac{d}{dx}\\int_a^{g(x)} f(t)\\,dt = f(g(x))\\cdot g'(x)\\).",
        },
      ],
      lead: "Differentiate an accumulation function, get the integrand back (chain rule when needed).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_secant_tangent",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Area function \\(g(x)\\): slope equals \\(f(x)\\)",
        caption: "Tangent slope on accumulation = integrand height.",
        params: { a: 1, h: 0.4 },
        scriptedTimeline: [
          { t: 0, params: { a: 0.8, h: 0.6 } },
          { t: 5, params: { a: 1.5, h: 0.25 } },
          { t: 9, params: { a: 2.2, h: 0.12 } },
        ],
      },
    },
    notes:
      "Formal Part 1. g(x)=∫ₐˣ f(t)dt differentiable, g'(x)=f(x). Widget: moving point, slope of g matches f. Preview chain-rule extension for s07–s08.",
  },
  {
    id: "s04_ftc_part_2_evaluating_definite_integrals",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "FTC Part 2 – Evaluating Definite Integrals",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "FTC Part 2",
          text: "If \\(f\\) is continuous on \\([a,b]\\) and \\(F\\) is **any** antiderivative of \\(f\\) (\\(F'=f\\)), then \\(\\displaystyle\\int_a^b f(x)\\,dx = F(b) - F(a)\\). The constant \\(+C\\) cancels, never needed in definite integrals.",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Callback Topic 22: find \\(F\\), then subtract endpoints. Shaded area = \\(F(b)-F(a)\\).",
        },
      ],
      lead: "The workhorse: definite integral = antiderivative difference at the bounds.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Shaded area = \\(F(b)-F(a)\\)",
        caption: "Drag bounds: rectangles approximate; FTC gives the exact value.",
        params: { a: 0.5, b: 2.5, n: 10, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0.5, b: 2, n: 6, method: "midpoint" } },
          { t: 4, params: { a: 0.5, b: 2.5, n: 14, method: "midpoint" } },
          { t: 8, params: { a: 1, b: 3, n: 24, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Part 2 is practical evaluation. +C cancels. Example ∫₀² x² dx = [x³/3]₀² = 8/3. Widget shows area under curve matching endpoint difference.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: WORKED EXAMPLES (PART 2 & PART 1)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s05_warm_up_example_direct_ftc_part_2",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-up: Direct FTC Part 2",
    question: "Try: Evaluate \\(\\int_0^{\\pi/4} \\sec^2 x\\,dx\\)",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\int_0^1 (3x^2 + 2x)\\,dx",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "F(x)=x^3+x^2",
              gap: "tight",
              say: "Find an antiderivative, reverse power rule from Topic 22.",
            },
            {
              id: "step_2",
              math: "F(1)=2,\\quad F(0)=0",
              gap: "tight",
              say: "Evaluate at upper and lower limits.",
            },
            {
              id: "step_3",
              math: "2",
              say: "FTC Part 2: F(1)-F(0)=2.",
            },
          ],
        },
      ],
      lead: "Find \\(F\\), plug in bounds, subtract, no Riemann sum required.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_bracket",
          type: "formula_block",
          formula: "\\left[x^3+x^2\\right]_0^1 = (1+1)-(0) = 2",
        },
      ],
      media: null,
    },
    notes:
      "Straightforward Part 2. Antiderivative x³+x². Student prompt: ∫₀^{π/4} sec²x dx = [tan x]₀^{π/4} = 1.",
  },
  {
    id: "s06_standard_example_ftc_part_1",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Standard Example: FTC Part 1",
    question: "Try: If \\(g(x) = \\int_0^x \\sqrt{1+t^3}\\,dt\\), find \\(g'(2)\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "g(x)=\\int_0^x \\frac{1}{1+t^2}\\,dt,\\quad \\text{find } g'(x)",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "f(t)=\\frac{1}{1+t^2}",
              gap: "tight",
              say: "Identify the integrand, continuous everywhere.",
            },
            {
              id: "step_2",
              math: "g'(x)=f(x)",
              gap: "tight",
              say: "FTC Part 1: derivative returns the integrand.",
            },
            {
              id: "step_3",
              parts: [
                { math: "g'(x)=\\frac{1}{1+x^2}" },
                { math: "g'(2)=\\frac{1}{5}", op: "=" },
              ],
              say: "Substitute t=x; check at x=2 gives one fifth.",
            },
          ],
        },
      ],
      lead: "Upper limit is plain \\(x\\), no chain rule factor needed.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_note",
          type: "paragraph",
          text: "No need to find \\(\\arctan t\\) explicitly, Part 1 differentiates **through** the integral.",
        },
      ],
      media: null,
    },
    notes:
      "Classic Part 1: g'(x)=1/(1+x²). At x=2, g'(2)=1/5. Contrast with Part 2 where we need an antiderivative.",
  },
  {
    id: "s07_misconception_forgetting_the_chain_rule_in_ftc_part_1",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Misconception: Forgetting the Chain Rule in FTC Part 1",
    question: "Upper limit is \\(x^2\\), not \\(x\\), what factor do students drop?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Chain rule trap",
          pairs: [
            {
              label: "❌ Forgot \\(g'(x)\\)",
              text: "\\(\\displaystyle\\frac{d}{dx}\\int_0^{x^2}\\cos(t)\\,dt = \\cos(x^2)\\), treats \\(x^2\\) as if it were \\(x\\).",
            },
            {
              label: "✅ General FTC Part 1",
              text: "\\(\\displaystyle\\frac{d}{dx}\\int_0^{g(x)} f(t)\\,dt = f(g(x))\\cdot g'(x) = \\cos(x^2)\\cdot 2x\\).",
            },
          ],
        },
        {
          id: "left_rule",
          type: "formula_block",
          formula: "\\frac{d}{dx}\\int_a^{g(x)} f(t)\\,dt = f(g(x))\\cdot g'(x)",
        },
      ],
      lead: "When the upper limit is a function, multiply by its derivative.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_secant_tangent",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Wrong tangent vs correct tangent on \\(G(x)\\)",
        caption: "Slope \\(\\cos(x^2)\\) alone misses the \\(2x\\) chain factor.",
        params: { a: 1.5, h: 0.2 },
        scriptedTimeline: [
          { t: 0, params: { a: 1, h: 0.5 } },
          { t: 5, params: { a: 1.5, h: 0.2 } },
        ],
      },
    },
    notes:
      "Most common Part 1 error. G(x)=∫₀^{x²} cos t dt. Wrong tangent does not match curve. Callback Topic 13 chain rule.",
  },
  {
    id: "s08_tricky_example_ftc_part_1_with_chain_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Tricky Example: FTC Part 1 with Chain Rule",
    question: "Try: Find \\(\\frac{d}{dx} \\int_0^{x^2} \\cos(t^3)\\,dt\\)",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "h(x)=\\int_0^{x^3} \\sin(t^2)\\,dt,\\quad \\text{find } h'(x)",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "u=x^3",
              gap: "tight",
              say: "Let u be the upper limit.",
            },
            {
              id: "step_2",
              math: "h'(x)=\\sin(u^2)\\cdot 3x^2",
              gap: "tight",
              say: "FTC Part 1 on u, times du/dx by chain rule.",
            },
            {
              id: "step_3",
              math: "3x^2\\sin(x^6)",
              say: "Substitute u=x³, answer is 3x² sin(x⁶).",
            },
          ],
        },
      ],
      lead: "Upper limit \\(x^3\\) → factor \\(3x^2\\) from \\(g'(x)\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_template",
          type: "formula_block",
          formula: "h'(x)=f(g(x))\\cdot g'(x)=\\sin((x^3)^2)\\cdot 3x^2",
        },
      ],
      media: null,
    },
    notes:
      "Worked chain-rule case. u=x³, dh/du=sin(u²), du/dx=3x². Student try: ∫₀^{x²} cos(t³) dt → cos(x⁶)·2x.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: EDGE CASES & APPLICATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s09_edge_case_when_the_lower_limit_is_variable",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Edge Case: Variable Lower Limit",
    question: "Try: Find \\(\\frac{d}{dx} \\int_x^2 \\ln(t)\\,dt\\)",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "p(x)=\\int_x^5 e^{t^2}\\,dt,\\quad \\text{find } p'(x)",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "p(x)=-\\int_5^x e^{t^2}\\,dt",
              gap: "tight",
              say: "Swap limits, introduces a minus sign.",
            },
            {
              id: "step_2",
              math: "p'(x)=-e^{x^2}",
              say: "FTC Part 1 on the swapped form.",
            },
            {
              id: "step_3",
              math: "\\text{Check: interval }[x,5]\\text{ shrinks as }x\\uparrow",
              say: "Negative derivative matches shrinking area, makes sense.",
            },
          ],
        },
      ],
      lead: "Variable in the **lower** limit? Swap limits, then apply Part 1.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_rule",
          type: "paragraph",
          text: "**Habit:** \\(\\displaystyle\\frac{d}{dx}\\int_{g(x)}^b f(t)\\,dt = -f(g(x))\\cdot g'(x)\\) when \\(g(x)\\) is the lower limit.",
        },
      ],
      media: null,
    },
    notes:
      "Swap ∫_x^5 to -∫_5^x. p'(x)=-e^{x²}. Interval shrinks → negative rate. Sign matters.",
  },
  {
    id: "s10_application_finding_a_function_from_its_derivative",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Initial Value Problem",
    question: "Try: Find \\(F(x)\\) if \\(F'(x) = \\cos x\\) and \\(F(\\pi)=0\\)",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "F'(x)=3x^2,\\ F(1)=5",
          steps: [
            { id: "step_1", math: "F(x)=x^3+C", gap: "tight", say: "Method 1: antiderivative family." },
            { id: "step_2", math: "1+C=5\\Rightarrow C=4", gap: "tight", say: "Initial condition pins C." },
            { id: "step_3", math: "F(x)=x^3+4", gap: "tight", say: "Particular solution." },
            { id: "step_4", math: "F(x)=5+\\int_1^x 3t^2\\,dt=x^3+4", say: "Method 2: FTC Part 2 from anchor point." },
          ],
        },
      ],
      lead: "IVP: indefinite integral + condition, or definite integral from a known point.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_bridge",
          type: "paragraph",
          text: "FTC Part 2 rebuilds \\(F(x)\\) from \\(F(a)\\) plus accumulated change, a preview of differential-equation thinking.",
        },
      ],
      media: null,
    },
    notes:
      "Two methods agree: F(x)=x³+4. Method 2 uses F(1)+∫₁ˣ 3t² dt. Connects Topics 22 and 25.",
  },
  {
    id: "s11_application_area_between_curves",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Area Between Curves",
    question: "Try: Area between \\(y=\\sin x\\) and \\(y=0\\) on \\([0,\\pi]\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\text{Area between }y=x\\text{ and }y=x^2\\text{ on }[0,1]",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\int_0^1 (x-x^2)\\,dx",
              gap: "tight",
              say: "Top minus bottom on the interval.",
            },
            {
              id: "step_2",
              math: "\\left[\\frac{x^2}{2}-\\frac{x^3}{3}\\right]_0^1",
              gap: "tight",
              say: "Antiderivative via power rule.",
            },
            {
              id: "step_3",
              math: "\\frac{1}{6}",
              say: "FTC Part 2: 1/2 - 1/3 = 1/6.",
            },
          ],
        },
      ],
      lead: "Area = \\(\\int (\\text{top}-\\text{bottom})\\,dx\\), then FTC Part 2.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Shaded region between curves",
        caption: "Net area under top − bottom.",
        params: { a: 0, b: 1, n: 12, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 1, n: 8, method: "midpoint" } },
          { t: 5, params: { a: 0, b: 1, n: 20, method: "midpoint" } },
        ],
      },
    },
    notes:
      "y=x above y=x² on [0,1]. ∫₀¹(x-x²)dx = 1/6. Student try: ∫₀^π sin x dx = 2.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 5: LAB + PAUSE PAIR + OPTIONAL PROOF + SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s12_interactive_visual_lab_explore_ftc_part_2",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Area = \\(F(b)-F(a)\\)",
    question: "How close is the Riemann sum when n grows?",
    lead: "Rectangles approximate; FTC Part 2 gives the exact antiderivative difference.",
    labSiteNote: "On site: try all three examples and generate new intervals.",
    labExamples: [
      {
        id: "lab_coarse",
        label: "A · Coarse",
        formula: "n=4",
        steps: [
          { text: "a=0.5, b=2, n=4, rough approximation." },
          { text: "Read the sum label on the plot." },
        ],
        params: { a: 0.5, b: 2, n: 4, method: "midpoint" },
      },
      {
        id: "lab_medium",
        label: "B · Medium",
        formula: "n=16",
        steps: [
          { text: "Same interval, n=16, error shrinks." },
          { text: "FTC value is the target, not the rectangle count." },
        ],
        params: { a: 0.5, b: 2, n: 16, method: "midpoint" },
      },
      {
        id: "lab_fine",
        label: "C · Fine",
        formula: "n=32",
        steps: [
          { text: "n=32, sum nearly matches FTC." },
          { text: "Key: area = F(b)−F(a), not a hand limit." },
        ],
        params: { a: 0.5, b: 2, n: 32, method: "midpoint" },
      },
    ],
    labGeneratePresets: [
      { label: "Narrow [1,2]", params: { a: 1, b: 2, n: 12, method: "midpoint" }, steps: [{ text: "Shorter interval, new area scale." }] },
      { label: "Left sum", params: { a: 0, b: 3, n: 10, method: "left" }, steps: [{ text: "Compare left vs midpoint at same n." }] },
    ],
    media: {
      id: "lab_riemann_ftc",
      kind: "calculus_widget",
      widget: "riemann_integral",
      title: "Riemann sum vs FTC",
      caption: "Big plot right; sliders stay on the widget.",
      params: { a: 0.5, b: 2, n: 4, method: "midpoint" },
      scriptedTimeline: [
        { t: 0, params: { a: 0.5, b: 2, n: 4, method: "midpoint" } },
        { t: 6, params: { a: 0.5, b: 2, n: 32, method: "midpoint" } },
      ],
    },
    notes:
      "Lab layout: demo Example A on YouTube; B/C for site. Riemann ≈ area; FTC = exact F(b)-F(a). Callback Topics 23–24.",
  },
  {
    id: "s13_pause_and_try_test_your_understanding",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Test Your Understanding",
    question: "Find \\(g'(x)\\). Write your answer, then unpause for the solution.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_question",
          type: "paragraph",
          text: "If \\(g(x) = \\displaystyle\\int_0^{x^2} \\frac{1}{1+t^2}\\,dt\\), find \\(g'(x)\\).",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and compute",
          prompt: "Use generalized FTC Part 1 + chain rule before continuing.",
          reveal: {
            text: "Think: \\(f(g(x))\\cdot g'(x)\\) with \\(g(x)=x^2\\), \\(f(t)=1/(1+t^2)\\).",
          },
        },
      ],
      lead: "Chain rule + Part 1, same pattern as s07–s08.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_hint",
          type: "paragraph",
          text: "**Hint:** Let \\(u=x^2\\). What is \\(du/dx\\)?",
        },
      ],
      media: null,
    },
    notes:
      "YouTube pause beat. Do not reveal answer, s14 delivers full solution. Callback s08 sine example pattern.",
  },
  {
    id: "s14_solution_to_pause_problem",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Solution to Pause Problem",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "g(x)=\\int_0^{x^2} \\frac{1}{1+t^2}\\,dt",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "u=x^2",
              gap: "tight",
              say: "Upper limit is a function, set u=x².",
            },
            {
              id: "step_2",
              math: "g'(x)=\\frac{1}{1+u^2}\\cdot 2x",
              gap: "tight",
              say: "FTC Part 1 times chain rule.",
            },
            {
              id: "step_3",
              math: "\\frac{2x}{1+x^4}",
              say: "Substitute u²=x⁴, final answer 2x/(1+x⁴).",
            },
          ],
        },
      ],
      lead: "Answer: \\(g'(x)=\\dfrac{2x}{1+x^4}\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_check",
          type: "paragraph",
          text: "Did you get \\(\\dfrac{2x}{1+x^4}\\)? Same template as s08, only the integrand changed.",
        },
      ],
      media: null,
    },
    notes:
      "Reveal after pause. g'(x)=1/(1+x⁴)·2x. Pair with s13, pause then payoff.",
  },
  {
    id: "s15_challenge_optional_proof_sketch_for_ftc_part_1",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Proof Sketch for FTC Part 1",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_proof",
          type: "proof_sketch",
          title: "Why \\(g'(x)=f(x)\\)",
          text: "Let \\(g(x)=\\int_a^x f(t)\\,dt\\). Use the definition of derivative.",
          steps: [
            { id: "step_1", text: "\\(g'(x)=\\lim_{h\\to 0}\\dfrac{1}{h}\\int_x^{x+h} f(t)\\,dt\\)" },
            { id: "step_2", text: "For small \\(h\\), \\(f(t)\\approx f(x)\\) on \\([x,x+h]\\) by continuity." },
            { id: "step_3", text: "Integral \\(\\approx f(x)\\cdot h\\) → limit gives \\(f(x)\\). Rigorous version uses EVT + Squeeze." },
          ],
        },
      ],
      lead: "Optional, small interval area ≈ \\(f(x)\\cdot h\\); shrink \\(h\\) to zero.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Tiny interval \\([x,x+h]\\) ≈ rectangle height \\(f(x)\\)",
        caption: "Shrink the interval: rectangle matches shaded area.",
        params: { a: 1, b: 1.3, n: 3, method: "left" },
        scriptedTimeline: [
          { t: 0, params: { a: 1, b: 1.5, n: 3, method: "left" } },
          { t: 5, params: { a: 1, b: 1.2, n: 2, method: "left" } },
          { t: 9, params: { a: 1, b: 1.05, n: 2, method: "left" } },
        ],
      },
    },
    notes:
      "Skip if time-limited. Proof intuition: Δg ≈ f(x)Δx. Widget: narrow interval looks like f(x)·h rectangle.",
  },
  {
    id: "s16_summary_and_key_takeaways",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Summary and Key Takeaways",
    question: "Which FTC part differentiates a function defined by an integral?",
    lead: "FTC closes the integration arc, next up: harder antiderivatives.",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Part 1:** \\(\\dfrac{d}{dx}\\int_a^x f(t)\\,dt = f(x)\\), differentiate through the integral; chain rule when the limit is \\(g(x)\\)." },
          { id: "bullet_2", text: "**Part 2:** \\(\\int_a^b f(x)\\,dx = F(b)-F(a)\\), evaluate definite integrals without Riemann limits." },
          { id: "bullet_3", text: "**Inverse link:** integration and differentiation undo each other (speedometer ↔ odometer)." },
          { id: "bullet_4", text: "**Trap:** forgetting \\(g'(x)\\) when the upper limit is not plain \\(x\\)." },
          { id: "bullet_5", text: "**Next topic (26):** Integration by Substitution, chain rule in reverse for harder integrals." },
        ],
      },
      {
        id: "final_check",
        type: "pause_and_reveal",
        title: "Final check",
        prompt: "Evaluate \\(\\int_0^2 x^2\\,dx\\) mentally, what is \\(F(b)-F(a)\\)?",
        reveal: { text: "\\([x^3/3]_0^2 = 8/3\\), FTC Part 2 in one line." },
      },
    ],
    media: null,
    notes:
      "Recap both parts. Tease Topic 26 substitution by name. Final check: ∫₀² x² dx = 8/3. Thank students; continuity check: f must be continuous on [a,b].",
  },
];

export default slidesData;

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * COURSE DESIGN CHANGELOG
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * v1 (course design review, June 2026)
 *
 * WIDGETS
 *   - riemann_integral on s01 hook, s04 Part 2, s11 area app, s12 visual_lab,
 *     s15 proof sketch; secant_tangent on s02 analogy, s03 Part 1, s07 misconception.
 *   - Removed python sourceCode/sourceSpec bloat from media blocks.
 *
 * RICH BLOCKS
 *   - theorem_box on s03 (Part 1) and s04 (Part 2).
 *   - math_solution_steps on s05–s08, s09–s11, s14 pause solution.
 *   - misconception_compare on s07 chain-rule trap.
 *   - pause_and_reveal pair s13 (question) + s14 (solution); final check on s16.
 *   - proof_sketch on optional s15.
 *
 * PEDAGOGY
 *   - Welcome-back; callbacks Topics 22 (antiderivatives) and 24 (definite integral).
 *   - Roadmap currentId path_topic_25; Topic 26 substitution teased in s16 only.
 *   - s12 visual_lab: area = F(b)-F(a) via Riemann convergence.
 *
 * ESTIMATED DURATION: ~20–22 min
 */