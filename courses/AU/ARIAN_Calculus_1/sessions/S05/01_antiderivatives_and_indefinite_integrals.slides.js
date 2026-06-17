// Generated from courses/Calculus/Materials/antiderivatives_and_indefinite_integrals.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "01_antiderivatives_and_indefinite_integrals",
  title: "Antiderivatives and Indefinite Integrals",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/antiderivatives_and_indefinite_integrals.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "Antiderivatives and Indefinite Integrals",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic 22 • Session 5: Integration Foundations • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back, we finished derivative applications (Topics 15–21). Topic 22 opens Integration Foundations: reverse differentiation. Callback Topics 10–11 power/sum rules. Assumes comfort differentiating polynomials, trig, exp, log. Do not re-introduce Arian from scratch.",
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
        currentId: "path_topic_22",
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
          { id: "path_topic_21", number: 21, session: "S04 Applications of Derivatives", label: "Newton's Method and Linear Approximations", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_22", number: 22, session: "S05 Integration Foundations", label: "Antiderivatives and Indefinite Integrals", note: "This topic", status: "current", expanded: true },
          { id: "path_topic_23", number: 23, session: "S05 Integration Foundations", label: "Approximating Area with Riemann Sums", note: "Next", status: "next", expanded: true },
          { id: "path_topic_24", number: 24, session: "S05 Integration Foundations", label: "The Definite Integral", status: "upcoming" },
          { id: "path_topic_25", number: 25, session: "S05 Integration Foundations", label: "The Fundamental Theorem of Calculus", status: "upcoming" },
          { id: "path_topic_26", number: 26, session: "S05 Integration Foundations", label: "Integration by Substitution", status: "upcoming" },
        ],
      },
    ],
    bullets: [
      { id: "objective_1", text: "Calculate antiderivatives using the power rule and standard formulas" },
      { id: "objective_2", text: "Interpret the indefinite integral as a family of functions (+C)" },
      { id: "objective_3", text: "Apply constant multiple and sum rules to integrate expressions" },
      { id: "objective_4", text: "Solve initial value problems to find specific functions" },
    ],
    notes:
      "Roadmap first: Topics 1–21 done, Topic 22 current, Topic 23 (Riemann sums) next. Frame Session 5 as reversing the derivative toolkit from Topics 8–14. Four objectives map to definition → rules → examples → IVP.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: INTUITION + DEFINITION + RULES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_from_speedometer_to_road_trip",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "From Speedometer to Road Trip",
    question: "Predict: If you shift the position curve upward by 5 units, what happens to the velocity curve?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "If I hand you a speedometer reading at every moment, can you reconstruct the entire road trip? You'd know the **shape** of the journey, but not where you started. That missing starting point is **+C**, the constant of integration.",
        },
        {
          id: "left_callback",
          type: "paragraph",
          text: "Topics 8–14 taught **differentiation** (velocity from position). Topic 22 runs the process **backward**: antidifferentiation recovers position from velocity, up to a vertical shift.",
        },
      ],
      lead: "A speedometer gives velocity. Antidifferentiation recovers position, **up to a constant shift**.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_antiderivative_family",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "Antiderivative family: same shape, different +C",
        caption: "Drag k: curves shift vertically; slope pattern stays parallel.",
        formulaLabel: "F+C",
        params: { family: "cubic", a: 1, b: 1, h: 0, k: 0 },
        scriptedTimeline: [
          { t: 0, params: { family: "cubic", a: 1, b: 1, h: 0, k: 0 } },
          { t: 5, params: { family: "cubic", a: 1, b: 1, h: 0, k: 1.5 } },
          { t: 10, params: { family: "cubic", a: 1, b: 1, h: 0, k: -2 } },
        ],
      },
    },
    notes:
      "Speedometer hook. Animate k: vertical shift does not change derivative, velocity unchanged. Answer prompt: shifting position up 5 leaves velocity the same. Welcome back to Integration Foundations.",
  },
  {
    id: "s02_definition_of_indefinite_integral",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Definition of Indefinite Integral",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$\\int f(x)\\,dx = F(x) + C \\quad \\text{where} \\quad F'(x) = f(x)$$",
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "**Read it:** “integral of f” = **all** antiderivatives of f, written as one representative \\(F(x)\\) plus the family constant \\(C\\).",
        },
      ],
      lead: "The indefinite integral is the family of ALL functions whose derivative equals f(x).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_c_family",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "+C family for one integrand",
        caption: "Same derivative at every x: only the vertical level changes.",
        formulaLabel: "F+C",
        params: { family: "cubic", a: 1, b: 1, h: 0, k: 0 },
        scriptedTimeline: [
          { t: 0, params: { family: "cubic", a: 1, b: 1, h: 0, k: -2 } },
          { t: 4, params: { family: "cubic", a: 1, b: 1, h: 0, k: 0 } },
          { t: 8, params: { family: "cubic", a: 1, b: 1, h: 0, k: 2 } },
        ],
      },
    },
    notes:
      "Formal definition. Widget: three k values show parallel antiderivative curves, slope field intuition without a dedicated slope-field widget. Emphasize F'(x)=f(x) is the membership test.",
  },
  {
    id: "s03_power_rule_for_integration",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Power Rule for Integration (Pause)",
    question: "Before moving the slider, predict: For n=2, what is the antiderivative formula?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C, \\quad n \\neq -1$$",
          ],
        },
        {
          id: "left_callback",
          type: "paragraph",
          text: "**Reverse of Topic 10:** \\(\\frac{d}{dx}\\left(\\frac{x^{n+1}}{n+1}\\right)=x^n\\). Increase exponent by 1, divide by the new exponent, add \\(C\\).",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "For n=2, write \\(\\int x^2\\,dx\\) before continuing.",
          reveal: { text: "\\(\\int x^2\\,dx = \\frac{x^3}{3} + C\\), exponent 3, divide by 3." },
        },
      ],
      lead: "To integrate a power: increase exponent by 1, then divide by the new exponent.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_check",
          type: "nested_bullets",
          items: [
            { id: "c1", text: "n=2 → \\(\\frac{x^3}{3}+C\\)" },
            { id: "c2", text: "n=3 → \\(\\frac{x^4}{4}+C\\)" },
            { id: "c3", text: "n=-1 → **power rule fails** (later)" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Callback derivative power rule Topic 10. Pause: n=2 gives x³/3+C. Stress n≠−1. No bogus widget, compact reference on right.",
  },
  {
    id: "s04_constant_multiple_and_sum_rules",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Constant Multiple and Sum Rules",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_rules",
          type: "formula_block",
          formulas: [
            "$$\\int c\\,f(x)\\,dx = c\\int f(x)\\,dx$$",
            "$$\\int [f(x) \\pm g(x)]\\,dx = \\int f(x)\\,dx \\pm \\int g(x)\\,dx$$",
          ],
        },
        {
          id: "left_warning",
          type: "paragraph",
          text: "Just like Topics 11–12 for derivatives, but **no product or quotient rule** for integrals. Products need techniques later (Topic 26 substitution, Calc 2).",
        },
      ],
      lead: "Constants factor out, sums break apart. But no product or quotient rule for integrals.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_table",
          type: "math_table",
          headers: ["Formula", "Antiderivative"],
          rows: [
            ["\\(\\int x^n\\,dx\\)", "\\(\\frac{x^{n+1}}{n+1}+C\\), \\(n\\neq -1\\)"],
            ["\\(\\int \\frac{1}{x}\\,dx\\)", "\\(\\ln|x|+C\\)"],
            ["\\(\\int e^x\\,dx\\)", "\\(e^x+C\\)"],
            ["\\(\\int \\sin x\\,dx\\)", "\\(-\\cos x+C\\)"],
            ["\\(\\int \\cos x\\,dx\\)", "\\(\\sin x+C\\)"],
          ],
        },
      ],
      media: null,
    },
    notes:
      "Linearity mirrors derivative sum/constant rules (Topic 11). math_table is the memorization sheet, power, 1/x, exp, sin, cos. Warn: ∫f·g ≠ (∫f)(∫g).",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: WORKED EXAMPLES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s05_example_1_warm_up_direct_power_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 1: Warm-Up, Direct Power Rule",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\int x^7\\,dx",
          steps: [
            { id: "step_1", op: "=>", math: "n=7", gap: "tight", say: "Identify the exponent." },
            { id: "step_2", math: "\\frac{x^{8}}{8} + C", gap: "tight", say: "Power rule: add 1 to exponent, divide by 8." },
            { id: "step_3", math: "\\frac{d}{dx}\\left(\\frac{x^{8}}{8}+C\\right)=x^7", say: "Check by differentiation, recover x⁷." },
          ],
        },
      ],
      lead: "Integrate x⁷ using the power rule, then verify.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_habit",
          type: "nested_bullets",
          items: [
            { id: "h1", text: "Identify \\(n\\)" },
            { id: "h2", text: "Apply \\(\\frac{x^{n+1}}{n+1}+C\\)" },
            { id: "h3", text: "**Differentiate** to check" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Warm-up template. step_1 identify n, step_2 power rule, step_3 verification. Habit: always +C, always check.",
  },
  {
    id: "s06_example_2_standard_polynomial_with_sum_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 2: Standard, Polynomial with Sum Rule",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\int (3x^2 - 4x + 7)\\,dx",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "3\\int x^2\\,dx - 4\\int x\\,dx + 7\\int 1\\,dx",
              gap: "tight",
              say: "Split the sum and pull constants.",
            },
            {
              id: "step_2",
              math: "3\\cdot\\frac{x^3}{3} - 4\\cdot\\frac{x^2}{2} + 7x + C",
              gap: "tight",
              say: "Integrate each term with the power rule.",
            },
            {
              id: "step_3",
              math: "x^3 - 2x^2 + 7x + C",
              say: "Simplify, one +C at the end.",
            },
          ],
        },
      ],
      lead: "Split the polynomial term-by-term; one +C at the end.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_note",
          type: "paragraph",
          text: "**One** arbitrary constant for the whole family, do not write \\(C_1+C_2+\\cdots\\) unless solving an IVP.",
        },
      ],
      media: null,
    },
    notes:
      "Standard polynomial workflow. Sum rule + constant multiple. 3·(x³/3)=x³, −4·(x²/2)=−2x². Single +C.",
  },
  {
    id: "s07_example_3_tricky_negative_exponents",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 3: Tricky, Negative Exponents (Pause · Medium)",
    question: "Before looking at the answer, try integrating 1/x⁴ yourself.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\int \\frac{1}{x^3}\\,dx",
          steps: [
            { id: "step_1", op: "=>", math: "\\int x^{-3}\\,dx", gap: "tight", say: "Rewrite as a negative power." },
            { id: "step_2", math: "\\frac{x^{-2}}{-2} + C", gap: "tight", say: "Power rule, divide by −2, not +2." },
            { id: "step_3", math: "-\\frac{1}{2x^2} + C", say: "Simplify to a cleaner form." },
          ],
        },
      ],
      lead: "Rewrite as x⁻³, watch the sign when n+1 is negative.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_pause",
          type: "pause_and_reveal",
          title: "Pause first",
          prompt: "Try \\(\\int \\frac{1}{x^4}\\,dx\\) before revealing steps.",
          reveal: { text: "\\(\\int x^{-4}\\,dx = \\frac{x^{-3}}{-3}+C = -\\frac{1}{3x^3}+C\\)" },
        },
      ],
      media: null,
    },
    notes:
      "Sign trap: n=−3 → n+1=−2. Common mistake x⁻²/2 without minus. Pause side problem 1/x⁴. Differentiate answer to verify.",
  },
  {
    id: "s08_pause_and_try_predict_the_integral_of_1_x",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause and Try: Predict the Integral of 1/x (Pause · Medium)",
    question: "Write down your guess for ∫ (1/x) dx before continuing.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Try the power rule on \\(\\int \\frac{1}{x}\\,dx = \\int x^{-1}\\,dx\\). What happens to \\(n+1\\)?",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Write your guess for \\(\\int \\frac{1}{x}\\,dx\\), then reveal.",
          reveal: {
            text: "Power rule fails (divide by 0). Think derivatives: \\(\\frac{d}{dx}\\ln|x|=\\frac{1}{x}\\). Answer next slide: \\(\\ln|x|+C\\).",
          },
        },
      ],
      lead: "What is ∫ (1/x) dx? The power rule fails here.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_reciprocal",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "y = 1/x: no power-rule antiderivative",
        caption: "Hyperbola on both sides of the axis: special log rule ahead.",
        formulaLabel: "f",
        params: { family: "rational", a: 1, b: 1, h: 0, k: 0 },
        scriptedTimeline: [
          { t: 0, params: { family: "rational", a: 1, b: 1, h: 0, k: 0 } },
          { t: 6, params: { family: "rational", a: 1, b: 1, h: 0.5, k: 0 } },
        ],
      },
    },
    notes:
      "Real YouTube pause. n=−1 → n+1=0. Callback: derivative of ln|x| is 1/x (Topics 10–14). Do not reveal full answer until s09. Widget shows 1/x graph.",
  },
  {
    id: "s09_example_4_edge_case_integral_of_1_x",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 4: Edge Case, Integral of 1/x",
    question: "Verify by differentiating ln|x| for x>0 and x<0.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\int \\frac{1}{x}\\,dx",
          steps: [
            { id: "step_1", op: "=>", math: "\\ln|x| + C", gap: "tight", say: "Memorize: the one exception to the power rule." },
            { id: "step_2", math: "x>0:\\ \\frac{d}{dx}(\\ln x)=\\frac{1}{x}", gap: "tight", say: "Positive x: plain ln." },
            { id: "step_3", math: "x<0:\\ \\frac{d}{dx}(\\ln(-x))=\\frac{1}{x}", say: "Negative x: ln of positive −x." },
          ],
        },
      ],
      lead: "∫ (1/x) dx = ln|x| + C, the power-rule exception.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_formula",
          type: "formula_block",
          formulas: ["$$\\int \\frac{1}{x}\\,dx = \\ln|x| + C$$"],
        },
      ],
      media: {
        id: "body_function_analysis",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=\\frac{1}{x}",
          xDomain: [-3, 3],
          yDomain: [-4, 4],
          probeMin: -2.5,
          probeMax: 2.5,
          probeDefault: 1.5,
          branches: [
            { expr: "1/x", xMin: -3, xMax: -0.15, stroke: "#2563eb" },
            { expr: "1/x", xMin: 0.15, xMax: 3, stroke: "#c65a28" },
          ],
          vLines: [{ x: 0 }],
          tags: [{ text: "domain excludes x=0", anchor: "end", tone: "muted" }],
        },
        title: "1/x domain excludes zero",
        caption: "Absolute value covers both branches.",
        params: { x: 1.5 },
        scriptedTimeline: [
          { t: 0, params: { x: 1.5 } },
          { t: 5, params: { x: -1.5 } },
        ],
      },
    },
    notes:
      "Critical formula. |x| handles x<0 via ln(−x). Piecewise widget: probe positive and negative x. Never write x⁰/0.",
  },
  {
    id: "s10_example_5_application_initial_value_problem",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 5: Application, Initial Value Problem",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "v(t)=3t^2-2t+1,\\ s(0)=4",
          steps: [
            { id: "step_1", op: "=>", math: "s(t)=\\int (3t^2-2t+1)\\,dt", gap: "tight", say: "Position is antiderivative of velocity." },
            { id: "step_2", math: "s(t)=t^3-t^2+t+C", gap: "tight", say: "Integrate term-by-term." },
            { id: "step_3", math: "s(0)=4 \\Rightarrow C=4", gap: "tight", say: "Plug initial condition." },
            { id: "step_4", math: "s(t)=t^3-t^2+t+4", say: "Specific solution, +C is now fixed." },
          ],
        },
      ],
      lead: "IVP: integrate, then use the initial condition to pin down C.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_bridge",
          type: "paragraph",
          text: "**Bridge:** indefinite integral = family; initial data picks **one** member. Links back to s01 speedometer, now we know the starting position.",
        },
      ],
      media: null,
    },
    notes:
      "Physics application. +C arbitrary until s(0)=4 fixes C=4. Callback s01 road-trip metaphor. This is how families become specific functions.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: MISTAKES. LAB, THEORY. CHECK. RECAP
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s11_common_mistake_forgetting_c_or_misusing_power_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Common Mistake: Forgetting +C or Misusing Power Rule",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Two classic errors",
          pairs: [
            {
              label: "❌ Missing +C",
              text: "\\(\\int x^2\\,dx = \\frac{x^3}{3}\\), only **one** curve, not the whole family.",
            },
            {
              label: "✅ Full family",
              text: "\\(\\int x^2\\,dx = \\frac{x^3}{3} + C\\), infinitely many parallel solutions.",
            },
            {
              label: "❌ Power rule on 1/x",
              text: "\\(\\int \\frac{1}{x}\\,dx = \\frac{x^0}{0}\\), **division by zero**, meaningless.",
            },
            {
              label: "✅ Log rule",
              text: "\\(\\int \\frac{1}{x}\\,dx = \\ln|x| + C\\), the \\(n=-1\\) exception.",
            },
          ],
        },
      ],
      lead: "Forgetting +C loses infinitely many solutions. For 1/x, power rule gives division by zero.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_c_shift",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "Same derivative, different +C",
        caption: "Move k: two valid antiderivatives of the same integrand.",
        formulaLabel: "F+C",
        params: { family: "cubic", a: 1, b: 1, h: 0, k: 0 },
        scriptedTimeline: [
          { t: 0, params: { family: "cubic", a: 1, b: 1, h: 0, k: 0 } },
          { t: 5, params: { family: "cubic", a: 1, b: 1, h: 0, k: 2 } },
        ],
      },
    },
    notes:
      "misconception_compare pairs. Widget: k=0 vs k=2, both antiderivatives of same f, different constants. Exam penalties for missing +C.",
  },
  {
    id: "s12_visual_lab_explore_the_family_of_antiderivatives",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: The +C Family",
    question: "Does changing k change the slope at a fixed x?",
    lead: "k = vertical shift = +C. Short steps left; big plot right.",
    labSiteNote: "Video: demo Example A. Site: try B, C, and **New example**.",
    labExamples: [
      {
        id: "lab_c_neg",
        label: "A · C = −2",
        formula: "F(x)=\\tfrac{x^3}{4}-2",
        steps: [
          { text: "Set k = −2, curve sits below the k=0 case." },
          { text: "Pick an x, slope matches the other family members." },
        ],
        params: { family: "cubic", a: 1, b: 1, h: 0, k: -2 },
      },
      {
        id: "lab_c_zero",
        label: "B · C = 0",
        formula: "F(x)=\\tfrac{x^3}{4}",
        steps: [
          { text: "k = 0, one particular antiderivative." },
          { text: "Compare to A: same shape, different height." },
        ],
        params: { family: "cubic", a: 1, b: 1, h: 0, k: 0 },
      },
      {
        id: "lab_c_pos",
        label: "C · C = +2",
        formula: "F(x)=\\tfrac{x^3}{4}+2",
        steps: [
          { text: "k = +2, still the same derivative pattern." },
          { text: "Answer: slope at fixed x is unchanged by k." },
        ],
        params: { family: "cubic", a: 1, b: 1, h: 0, k: 2 },
      },
    ],
    labGeneratePresets: [
      { label: "k = −1", params: { family: "cubic", a: 1, b: 1, h: 0, k: -1 }, steps: [{ text: "Shift down one unit." }] },
      { label: "k = +1.5", params: { family: "cubic", a: 1, b: 1, h: 0, k: 1.5 }, steps: [{ text: "Shift up 1.5 units." }] },
    ],
    media: {
      id: "lab_c_slider",
      kind: "calculus_widget",
      widget: "function_transform",
      title: "+C lab: vertical shift",
      caption: "k slider = constant of integration.",
      formulaLabel: "F+C",
      params: { family: "cubic", a: 1, b: 1, h: 0, k: -2 },
      scriptedTimeline: [
        { t: 0, params: { family: "cubic", a: 1, b: 1, h: 0, k: -2 } },
        { t: 6, params: { family: "cubic", a: 1, b: 1, h: 0, k: 2 } },
      ],
    },
    notes:
      "Site lab layout: left steps, right plot. Video mentions lab exists; demo tab A only. k encodes +C.",
  },
  {
    id: "s13_challenge_optional_why_antiderivatives_differ_by_a_constant",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Why Antiderivatives Differ by a Constant (Optional · Challenge)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Antiderivatives differ by a constant",
          text: "If \\(F'(x)=G'(x)\\) on an interval, then \\(F(x)=G(x)+C\\).",
        },
        {
          id: "left_proof",
          type: "proof_sketch",
          title: "Proof sketch",
          text: "Let \\(H=F-G\\). Then \\(H'=0\\), so \\(H\\) is constant (MVT from Topic 17).",
          steps: [
            { id: "p1", text: "\\(H'(x)=F'(x)-G'(x)=0\\)" },
            { id: "p2", text: "MVT: \\(H(b)-H(a)=H'(c)(b-a)=0\\)" },
            { id: "p3", text: "So \\(H(b)=H(a)\\), \\(H\\) is constant." },
          ],
        },
      ],
      lead: "If two functions have the same derivative, they differ by a constant.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_shift_pair",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "Vertical shift = constant difference",
        caption: "sin(x) and sin(x)+2 differ by 2 everywhere.",
        formulaLabel: "F+C",
        params: { family: "sine", a: 1, b: 1, h: 0, k: 0 },
        scriptedTimeline: [
          { t: 0, params: { family: "sine", a: 1, b: 1, h: 0, k: 0 } },
          { t: 6, params: { family: "sine", a: 1, b: 1, h: 0, k: 2 } },
        ],
      },
    },
    notes:
      "Optional challenge, skippable if short on time. Callback Topic 17 MVT. theorem_box + proof_sketch. Widget: sine + k shows fixed vertical gap.",
  },
  {
    id: "s14_quick_check_mcq_test_your_understanding",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Quick Check: Final Understanding (Pause)",
    question: "Try to answer all three before revealing.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_questions",
          type: "nested_bullets",
          items: [
            { id: "q1", text: "**Q1:** \\(\\int (4x^3-6x^2+2)\\,dx\\)? A) \\(x^4-2x^3+2x+C\\) B) \\(12x^2-12x+C\\) C) \\(x^4-2x^3+2x\\) D) \\(4x^4-6x^3+2x+C\\)" },
            { id: "q2", text: "**Q2:** \\(\\int \\sqrt{x}\\,dx\\)? A) \\(\\frac{2}{3}x^{3/2}+C\\) B) \\(\\frac{1}{2\\sqrt{x}}+C\\) C) \\(\\frac{3}{2}x^{3/2}+C\\) D) \\(\\frac{2}{3}x^{2/3}+C\\)" },
            { id: "q3", text: "**Q3:** \\(F'(x)=\\frac{1}{x}\\), \\(F(1)=3\\)? A) \\(\\ln x+3\\) B) \\(\\ln|x|+3\\) C) \\(\\ln|x|-3\\) D) \\(\\ln|x|+2\\)" },
          ],
        },
      ],
      lead: "Three quick checks, pause the video and work each one.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_pause",
          type: "pause_and_reveal",
          title: "Reveal answers",
          prompt: "Answer all three, then reveal.",
          reveal: {
            text: "**Q1: A** (term-by-term, +C). **Q2: A** (\\(x^{1/2}\\to\\frac{2}{3}x^{3/2}+C\\)). **Q3: B** (\\(\\ln|x|+C\\), \\(C=3\\)).",
          },
        },
      ],
      media: null,
    },
    notes:
      "pause_and_reveal final check. Q1: watch missing +C trap (C). Q2: sqrt = x^(1/2). Q3: IVP with ln|x|. Ten-second beats per question.",
  },
  {
    id: "s15_key_takeaways",
    type: "bullets",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways",
    lead: "Integration Foundations starts here, Session 5 continues:",
    bullets: [
      { id: "body_bullet_1", text: "**Indefinite integral = family:** \\(\\int f(x)\\,dx = F(x)+C\\) where \\(F'=f\\)." },
      { id: "body_bullet_2", text: "**Power rule (reverse Topic 10):** \\(\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}+C\\), \\(n\\neq -1\\)." },
      { id: "body_bullet_3", text: "**Exception:** \\(\\int \\frac{1}{x}\\,dx = \\ln|x|+C\\)." },
      { id: "body_bullet_4", text: "**Linearity:** constants factor out; sums split (Topic 11 mirror)." },
      { id: "body_bullet_5", text: "**IVP:** use \\(F(a)=b\\) to fix \\(C\\); verify by differentiating." },
      { id: "body_bullet_6", text: "**Next topic, Riemann Sums:** slice area under a curve and sum the pieces (Topic 23)." },
    ],
    blocks: [],
    notes:
      "Recap six bullets. Teaser Topic 23 Riemann sums, from families of antiderivatives to approximating area. Thank students; full generation polish later.",
  },
];

export default slidesData;

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * COURSE DESIGN CHANGELOG
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * v1 (hand-enhance, June 2026)
 *
 * WIDGETS
 *   - s01/s02: function_transform family cubic, k slider for +C family (not riemann).
 *   - s08: function_transform rational for 1/x pause.
 *   - s11: function_transform cubic k-shift pairs with misconception_compare.
 *   - s12: visual_lab with function_transform k slider.
 *   - Removed placeholder riemann_integral / secant_tangent on definition and lab slides.
 *
 * RICH BLOCKS
 *   - math_table standard antiderivative formulas on s04.
 *   - math_solution_steps (flow) on s05–s07, s09–s10 (two-col).
 *   - misconception_compare on s11 (+C and 1/x traps).
 *   - pause_and_reveal on s03, s07, s08, s14; theorem_box + proof_sketch on s13.
 *
 * PEDAGOGY
 *   - Welcome back Topic 22; Session 5 Integration Foundations arc.
 *   - Callbacks Topics 8–14 derivatives/power/sum rules; Topic 17 MVT on s13.
 *   - Roadmap currentId path_topic_22; Topic 21 previous, Topic 23 next.
 *   - s15 recap + Riemann sums teaser.
 *
 * ESTIMATED DURATION: ~20–22 min
 *
 * flex_plot migration (2026-06-16): s09 1/x domain slide → piecewise flex_plot
 * (two-branch hyperbola); function_transform +C family slides kept.
 */