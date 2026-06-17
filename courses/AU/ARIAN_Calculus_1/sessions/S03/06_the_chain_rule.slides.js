// Generated from courses/Calculus/Materials/the_chain_rule.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "06_the_chain_rule",
  title: "The Chain Rule",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/the_chain_rule.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "The Chain Rule",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: Compositions, outer×inner • Session 3 • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back after Topic 12 (product rule). Topic 13 handles compositions f(g(x)), different trap from products.",
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
        currentId: "path_topic_13",
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
          { id: "path_topic_12", number: 12, session: "S03 Derivative Foundations and Rules", label: "The Product Rule for Derivatives", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_13", number: 13, session: "S03 Derivative Foundations and Rules", label: "The Chain Rule", note: "Today", status: "current", expanded: true },
          { id: "path_topic_14", number: 14, session: "S03 Derivative Foundations and Rules", label: "Implicit Differentiation", note: "Next", status: "next", expanded: true },
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
      { id: "objective_1", text: "Use the **essential derivative formulas** for \\(\\sin, \\cos, \\tan, e^x, \\ln x\\) inside compositions." },
      { id: "objective_2", text: "Differentiate composite functions \\(f(g(x))\\) using the chain rule." },
      { id: "objective_3", text: "Apply the rule to nested compositions, work from the outside in." },
      { id: "objective_4", text: "Identify outer and inner functions systematically on messy expressions." },
      { id: "objective_5", text: "Interpret the chain rule as multiplying rates along a dependency chain." },
    ],
    notes:
      "Roadmap: Topic 12 product rule done, Topic 13 today, Topic 14 implicit next. Four objectives map to composition review → theorem → lab → nested examples.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 0: ESSENTIAL DERIVATIVE FORMULAS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s00_essential_derivative_formulas",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Essential Derivatives (Your Toolkit)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_table",
          type: "math_table",
          headers: ["Function", "Derivative"],
          rows: [
            ["\\(\\sin x\\)", "\\(\\cos x\\)"],
            ["\\(\\cos x\\)", "\\(-\\sin x\\)"],
            ["\\(\\tan x\\)", "\\(\\sec^2 x\\)"],
            ["\\(e^x\\)", "\\(e^x\\)"],
            ["\\(\\ln x\\) (\\(x>0\\))", "\\(\\dfrac{1}{x}\\)"],
          ],
        },
      ],
      lead: "Chain rule problems assume you know these base derivatives cold.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_context",
          type: "paragraph",
          text: "**Where they come from:** polynomials use the power rule (Topics 10–11). The derivative of \\(\\sin x\\) connects to \\(\\displaystyle\\lim_{x\\to 0}\\frac{\\sin x}{x}=1\\) from **Topic 6** (squeeze theorem). Exponential and logarithm rules are standard Calc 1 definitions, you have been using them in product-rule examples; now we make the sheet explicit before compositions.",
        },
        {
          id: "right_callback",
          type: "paragraph",
          text: "**Integration mirror (Topic 22):** these same formulas reverse into antiderivatives, \\(\\int \\cos x\\,dx=\\sin x+C\\), \\(\\int e^x\\,dx=e^x+C\\), etc.",
        },
      ],
      media: {
        id: "right_sin_probe",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "\\(\\sin x\\) and \\(\\cos x\\): slope partners",
        caption: "At each probe, slope of sine equals height of cosine.",
        formulaLabel: "y",
        plot: {
          plotType: "y_equals",
          formula: "y=\\sin x",
          xDomain: [-1.5, 1.5],
          yDomain: [-1.2, 1.2],
          probe: true,
          probeDefault: 0.8,
          curves: [
            { id: "sin", expr: "sin(x)", stroke: "#2563eb", strokeWidth: 4 },
            { id: "cos", expr: "cos(x)", stroke: "#c65a28", strokeWidth: 3, dashed: true },
          ],
        },
        params: { x: 0.8 },
      },
    },
    notes:
      "math_table is the memorization anchor. Callback Topic 6 sin(x)/x. Forward pointer Topic 22 antiderivatives. Widget shows sin/cos partner curves.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: COMPOSITION REVIEW + THEOREM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_why_the_chain_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Composition Review: Why the Chain Rule?",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Topic 12 handled **products** \\(fg\\). Topic 13 handles **compositions** \\(f(g(x))\\), one function applied to another's output.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "**Factory picture:** raw input \\(x\\) → inner machine \\(g\\) → output \\(u=g(x)\\) → outer machine \\(f\\) → final \\(y=f(g(x))\\). How fast does \\(y\\) change when \\(x\\) changes? **Multiply** the rates along the chain.",
        },
        {
          id: "left_example",
          type: "paragraph",
          text: "**Related rates preview:** \\(A=\\pi r^2\\) with \\(r=r(t)\\) gives \\(\\frac{dA}{dt}=\\frac{dA}{dr}\\cdot\\frac{dr}{dt}\\), same logic.",
        },
      ],
      lead: "Compositions nest functions; the chain rule chains their rates.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_composition_review",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Inner g(x)=x², outer sin(u)",
        caption: "Gray = inner, orange = composition sin(x²).",
        formulaLabel: "y",
        plot: {
          plotType: "y_equals",
          formula: "y=\\sin(x^2)",
          xDomain: [-2, 2],
          yDomain: [-1.2, 1.2],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "g", expr: "x*x", stroke: "#64748b", strokeWidth: 3 },
            { id: "y", expr: "sin(x*x)", stroke: "#c65a28", strokeWidth: 4 },
          ],
          verticalMarkers: ["g", "y"],
          tags: [{ text: "u = x²", x: 1.2, y: 0.9 }],
        },
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 5, params: { x: 1.2 } },
        ],
      },
    },
    notes:
      "Composition review + factory metaphor. Callback Topic 12 products vs compositions. Widget: inner parabola, outer sine wrap.",
  },
  {
    id: "s01_the_chain_rule_formula",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Chain Rule Formula",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Chain Rule",
          text: "If \\(f\\) and \\(g\\) are differentiable, then \\(\\displaystyle\\frac{d}{dx}[f(g(x))] = f'(g(x))\\cdot g'(x)\\). Read: derivative of **outer** (evaluated at inner) times derivative of **inner**.",
        },
        {
          id: "left_example",
          type: "paragraph",
          text: "**Quick read:** for \\(\\sin(x^2)\\), outer \\(\\sin\\) gives \\(\\cos(x^2)\\), inner \\(x^2\\) gives \\(2x\\), product \\(2x\\cos(x^2)\\).",
        },
      ],
      lead: "Outer′ at inner × inner′, never stop at outer′ alone.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_chain_formula_plot",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "sin(x²) and 2x cos(x²)",
        caption: "Solid = composition; dashed = derivative.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=\\sin(x^2)",
          xDomain: [-1.8, 1.8],
          yDomain: [-1.2, 1.2],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "h", expr: "sin(x*x)", stroke: "#2563eb", strokeWidth: 4 },
            { id: "hp", expr: "2*x*cos(x*x)", stroke: "#16a34a", strokeWidth: 3, dashed: true },
          ],
        },
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.6 } },
          { t: 6, params: { x: 1.1 } },
        ],
      },
    },
    notes:
      "theorem_box statement. Widget pairs h and h′ for sin(x²). Emphasize multiply, not add (contrast product rule).",
  },
  {
    id: "s02_leibniz_notation",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Leibniz Notation",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$$",
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Let \\(u=g(x)\\), \\(y=f(u)\\). The chain rule looks like **canceling** \\(du\\), a mnemonic, not literal algebra, but it helps you remember to multiply rates.",
        },
      ],
      lead: "Same rule, fraction flavor: multiply along the dependency chain.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_leibniz_plot",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "x → u=x² → y=sin(u)",
        caption: "Three-layer composition: drag probe x.",
        formulaLabel: "y",
        plot: {
          plotType: "y_equals",
          formula: "y=\\sin(x^2)",
          xDomain: [-1.5, 1.5],
          yDomain: [-1, 1],
          probe: true,
          probeDefault: 0.8,
          curves: [
            { id: "u", expr: "x*x", stroke: "#64748b", strokeWidth: 2 },
            { id: "y", expr: "sin(x*x)", stroke: "#c65a28", strokeWidth: 4 },
          ],
          tags: [
            { text: "du/dx = 2x", x: 1, y: -0.7 },
            { text: "dy/du = cos(u)", x: -1, y: 0.8 },
          ],
        },
        params: { x: 0.8 },
      },
    },
    notes:
      "Leibniz form after prime notation. Tags on plot reinforce du/dx and dy/du factors.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: VISUAL LAB + WARM-UP
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s03_warm_up_example",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: (5x − 2)³",
    question: "Try: \\(h(x)=(2x+1)^4\\) before the steps reveal.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "h(x)=(5x-2)^3",
          steps: [
            { id: "step_1", op: "=>", math: "f(u)=u^3,\\ g(x)=5x-2", gap: "tight", say: "Outer power, inner linear." },
            { id: "step_2", math: "f'(u)=3u^2,\\ g'(x)=5", gap: "tight", say: "Differentiate each layer." },
            { id: "step_3", math: "h'(x)=3(5x-2)^2\\cdot 5", gap: "tight", say: "Chain rule multiply." },
            { id: "step_4", math: "15(5x-2)^2", say: "Simplify, generalized power rule." },
          ],
        },
      ],
      lead: "Power of a linear function, the chain rule you'll use daily.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_warmup_power",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "(5x−2)³",
        caption: "Inner linear stretch, outer cubic wrap.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=(5x-2)^3",
          xDomain: [-0.2, 1.4],
          yDomain: [-10, 10],
          probe: true,
          probeDefault: 0.6,
          curves: [
            { id: "g", expr: "5*x-2", stroke: "#64748b", strokeWidth: 3 },
            { id: "h", expr: "(5*x-2)*(5*x-2)*(5*x-2)", stroke: "#c65a28", strokeWidth: 4 },
          ],
          verticalMarkers: ["g", "h"],
        },
        params: { x: 0.6 },
      },
    },
    notes:
      "First worked example. Generalized power rule on step_4.\n\nStudent prompt: Try (2x+1)^4 → 8(2x+1)³.",
  },
  {
    id: "s04_standard_example",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Standard Example: sin(e^{2x})",
    question: "Now try \\(y=\\cos(e^x)\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "y=\\sin(e^{2x})",
          splitAfter: 3,
          steps: [
            { id: "step_1", op: "=>", math: "\\text{layers: }\\sin,\\ e^{(\\cdot)},\\ 2x", gap: "tight", say: "Outside in." },
            { id: "step_2", math: "\\cos(e^{2x})", gap: "tight", say: "Derivative of sine keeps inner." },
            { id: "step_3", math: "\\cdot e^{2x}\\cdot 2", gap: "tight", say: "Derivative of exponential times derivative of 2x." },
            { id: "step_4", math: "2e^{2x}\\cos(e^{2x})", say: "Final factored form." },
          ],
        },
      ],
      lead: "Three layers, multiply a factor for each.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_sin_exp",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "sin(e^{2x})",
        caption: "Exponential inside trig: oscillation with growing period.",
        formulaLabel: "y",
        plot: {
          plotType: "y_equals",
          formula: "y=\\sin(e^{2x})",
          xDomain: [-1, 1.2],
          yDomain: [-1.2, 1.2],
          probe: true,
          probeDefault: 0.4,
          curves: [
            { id: "inner", expr: "exp(2*x)", stroke: "#64748b", strokeWidth: 2 },
            { id: "y", expr: "sin(exp(2*x))", stroke: "#c65a28", strokeWidth: 4 },
          ],
        },
        params: { x: 0.4 },
        scriptedTimeline: [
          { t: 0, params: { x: 0 } },
          { t: 5, params: { x: 0.5 } },
        ],
      },
    },
    notes:
      "Layered composition walkthrough. splitAfter for widget room.\n\nStudent prompt: cos(e^x) → −e^x sin(e^x).",
  },
  {
    id: "s05_pause_try_this",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Try cos(x³) (Pause)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Differentiate \\(h(x)=\\cos(x^3)\\). Outer = cosine, inner = \\(x^3\\).",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Write \\(h'(x)\\) before continuing.",
          reveal: { text: "Hint: \\(f'=-\\sin\\), \\(g'=3x^2\\), multiply them." },
        },
      ],
      lead: "Trig outside, power inside, classic chain-rule test.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_pause_cos",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "cos(x³)",
        caption: "No derivative shown: pencil first.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=\\cos(x^3)",
          xDomain: [-1.4, 1.4],
          yDomain: [-1.2, 1.2],
          probe: true,
          probeDefault: 0.9,
          curves: [{ id: "h", expr: "cos(x*x*x)", stroke: "#2563eb", strokeWidth: 4 }],
        },
        params: { x: 0.9 },
      },
    },
    notes:
      "Pause beat, reveal hint only, full solution on s06.",
  },
  {
    id: "s06_solution_cos_x_3",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Solution: cos(x³)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "h(x)=\\cos(x^3)",
          steps: [
            { id: "step_1", op: "=>", math: "f(u)=\\cos u,\\ g(x)=x^3", gap: "tight", say: "Identify layers." },
            { id: "step_2", math: "f'(u)=-\\sin u,\\ g'(x)=3x^2", gap: "tight", say: "Differentiate each." },
            { id: "step_3", math: "-\\sin(x^3)\\cdot 3x^2", gap: "tight", say: "Multiply." },
            { id: "step_4", math: "-3x^2\\sin(x^3)", say: "Final form." },
          ],
        },
      ],
      lead: "Check your pause answer against these steps.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cos_solution",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "cos(x³) and h′",
        caption: "Missing 3x² factor is the #1 chain-rule error.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=\\cos(x^3)",
          xDomain: [-1.2, 1.2],
          yDomain: [-1.5, 1.5],
          probe: true,
          probeDefault: 0.8,
          curves: [
            { id: "h", expr: "cos(x*x*x)", stroke: "#2563eb", strokeWidth: 4 },
            { id: "hp", expr: "-3*x*x*sin(x*x*x)", stroke: "#16a34a", strokeWidth: 3, dashed: true },
          ],
        },
        params: { x: 0.8 },
      },
    },
    notes:
      "Reveal after pause. Stress 3x² factor on step_3.",
  },
  {
    id: "s07_tricky_example",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Nested Chain: √(tan(x²+1))",
    question: "How many chain-rule applications? (Answer: 3)",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "f(x)=\\sqrt{\\tan(x^2+1)}",
          splitAfter: 3,
          steps: [
            { id: "step_1", op: "=>", math: "f(x)=(\\tan(x^2+1))^{1/2}", gap: "tight", say: "Rewrite root as power." },
            { id: "step_2", math: "\\tfrac12(\\tan(x^2+1))^{-1/2}", gap: "tight", say: "Outer power rule." },
            { id: "step_3", math: "\\cdot\\sec^2(x^2+1)\\cdot 2x", gap: "tight", say: "tan then x²+1 layers." },
            { id: "step_4", math: "\\frac{x\\sec^2(x^2+1)}{\\sqrt{\\tan(x^2+1)}}", say: "Simplified nested result." },
          ],
        },
      ],
      lead: "Work outside in, three layers, three factors.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_nested_sqrt",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "√(tan(x²+1))",
        caption: "Domain where tan > 0: nested structure.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=\\sqrt{\\tan(x*x+1)}",
          xDomain: [-1, 1],
          yDomain: [0, 3],
          probe: true,
          probeDefault: 0.5,
          curves: [{ id: "f", expr: "sqrt(tan(x*x+1))", stroke: "#c65a28", strokeWidth: 4 }],
        },
        params: { x: 0.5 },
      },
    },
    notes:
      "Nested chain pause-worthy example. Count three chain applications.\n\nStudent prompt on slide question.",
  },
  {
    id: "s08_common_mistake_forgetting_the_inner_derivative",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Misconception: Forgetting the Inner Factor",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Stopping at outer′",
          pairs: [
            {
              label: "❌ Chain-rule error",
              text: "\\(\\frac{d}{dx}\\sin(x^2) = \\cos(x^2)\\), stops after differentiating the outer sine.",
            },
            {
              label: "✅ Full chain rule",
              text: "\\(\\frac{d}{dx}\\sin(x^2) = \\cos(x^2)\\cdot 2x\\), multiply by \\(g'(x)=2x\\).",
            },
          ],
        },
        {
          id: "left_rule",
          type: "paragraph",
          text: "**Self-check:** after writing outer′, ask *what is the inner function and what is its derivative?*",
        },
      ],
      lead: "Derivative of sin(x²) is NOT just cos(x²).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_inner_factor",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "sin(x²): wrong vs right slope",
        caption: "Dashed red = forgot 2x; green = full chain rule.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=\\sin(x^2)",
          xDomain: [-1.5, 1.5],
          yDomain: [-1.2, 1.2],
          probe: true,
          probeDefault: 1,
          curves: [
            { id: "h", expr: "sin(x*x)", stroke: "#2563eb", strokeWidth: 3 },
            { id: "wrong", expr: "cos(x*x)", stroke: "#dc2626", strokeWidth: 3, dashed: true },
            { id: "right", expr: "2*x*cos(x*x)", stroke: "#16a34a", strokeWidth: 4 },
          ],
        },
        params: { x: 1 },
      },
    },
    notes:
      "misconception_compare slide. Widget shows wrong outer-only vs correct 2x cos(x²).",
  },
  {
    id: "s09_interactive_chain_rule_visualizer",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Chain Rule Compositions",
    question: "Switch tabs, identify outer, inner, and the extra factor.",
    lead: "Three inner functions. Left = steps; right = composition plot with probe.",
    labSiteNote: "On YouTube we demo tab A. On the site, try all three tabs and drag **probe x**.",
    labExamples: [
      {
        id: "lab_ex_power",
        label: "A · (2x+1)³",
        formula: "h(x)=(2x+1)^3",
        steps: [
          { id: "step_1", text: "Outer \\(u^3\\), inner \\(2x+1\\)." },
          { id: "step_2", text: "\\(h'=3(2x+1)^2\\cdot 2 = 6(2x+1)^2\\)." },
          { id: "step_3", text: "Inner slope 2 is the easy-to-drop factor." },
        ],
        params: {
          x: 0.5,
          plot: {
            plotType: "y_equals",
            formula: "h(x)=(2x+1)^3",
            xDomain: [-1, 1.5],
            yDomain: [-5, 15],
            probe: true,
            curves: [
              { id: "g", expr: "2*x+1", stroke: "#64748b", strokeWidth: 3 },
              { id: "h", expr: "(2*x+1)*(2*x+1)*(2*x+1)", stroke: "#c65a28", strokeWidth: 4 },
            ],
            verticalMarkers: ["g", "h"],
          },
        },
      },
      {
        id: "lab_ex_sin_x2",
        label: "B · sin(x²)",
        formula: "h(x)=\\sin(x^2)",
        steps: [
          { id: "step_1", text: "Outer \\(\\sin\\), inner \\(x^2\\)." },
          { id: "step_2", text: "\\(h'=\\cos(x^2)\\cdot 2x\\)." },
          { id: "step_3", text: "Compare marker height to forgetting \\(2x\\)." },
        ],
        params: {
          x: 1,
          plot: {
            plotType: "y_equals",
            formula: "h(x)=\\sin(x^2)",
            xDomain: [-1.8, 1.8],
            yDomain: [-1.2, 1.2],
            probe: true,
            curves: [
              { id: "g", expr: "x*x", stroke: "#64748b", strokeWidth: 3 },
              { id: "h", expr: "sin(x*x)", stroke: "#c65a28", strokeWidth: 4 },
            ],
            verticalMarkers: ["g", "h"],
          },
        },
      },
      {
        id: "lab_ex_exp_x2",
        label: "C · e^{x²}",
        formula: "h(x)=e^{x^2}",
        steps: [
          { id: "step_1", text: "Outer \\(e^{(\\cdot)}\\), inner \\(x^2\\)." },
          { id: "step_2", text: "\\(h'=e^{x^2}\\cdot 2x\\)." },
          { id: "step_3", text: "Exponential outer copies inner in the exponent." },
        ],
        params: {
          x: 0.9,
          plot: {
            plotType: "y_equals",
            formula: "h(x)=e^{x^2}",
            xDomain: [-1.5, 1.5],
            yDomain: [0, 5],
            probe: true,
            curves: [
              { id: "g", expr: "x*x", stroke: "#64748b", strokeWidth: 3 },
              { id: "h", expr: "exp(x*x)", stroke: "#c65a28", strokeWidth: 4 },
            ],
            verticalMarkers: ["g", "h"],
          },
        },
      },
    ],
    media: {
      id: "lab_chain_flex",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "Chain rule lab",
      caption: "Tabs swap inner functions: drag probe x.",
      formulaLabel: "h",
      plot: {
        plotType: "y_equals",
        formula: "h(x)=(2x+1)^3",
        xDomain: [-1, 1.5],
        yDomain: [-5, 15],
        probe: true,
        probeDefault: 0.5,
        curves: [
          { id: "g", expr: "2*x+1", stroke: "#64748b", strokeWidth: 3 },
          { id: "h", expr: "(2*x+1)*(2*x+1)*(2*x+1)", stroke: "#c65a28", strokeWidth: 4 },
        ],
        verticalMarkers: ["g", "h"],
      },
      params: { x: 0.5 },
      scriptedTimeline: [
        { t: 0, params: { x: 0 } },
        { t: 6, params: { x: 0.8 } },
      ],
    },
    notes:
      "visual_lab per spec: (2x+1)³, sin(x²), e^(x²). Demo tab A on video.\n\nStudent prompt on slide question.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: NESTED PAUSE + MORE EXAMPLES + PROOF + SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s10_pause_apply_the_chain_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Nested Power (3x+1)⁴ (Pause)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Differentiate \\(k(x)=(3x+1)^4\\). Identify outer \\(u^4\\) and inner \\(3x+1\\).",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and compute",
          prompt: "Write \\(k'(x)\\) before the solution slide.",
          reveal: { text: "Pattern: \\(4(3x+1)^3\\cdot 3\\), don't forget the inner coefficient 3." },
        },
      ],
      lead: "Nested chain pause, same template as warm-up, new numbers.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_pause_power",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "(3x+1)⁴",
        caption: "Steep linear inner → rapid growth.",
        formulaLabel: "k",
        plot: {
          plotType: "y_equals",
          formula: "k(x)=(3x+1)^4",
          xDomain: [-0.5, 1.2],
          yDomain: [0, 50],
          probe: true,
          probeDefault: 0.5,
          curves: [{ id: "k", expr: "(3*x+1)*(3*x+1)*(3*x+1)*(3*x+1)", stroke: "#c65a28", strokeWidth: 4 }],
        },
        params: { x: 0.5 },
      },
    },
    notes:
      "Nested chain pause per arc. Reveal hint; full steps on s11.",
  },
  {
    id: "s11_solution_3x_1_4",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Solution: (3x+1)⁴",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "k(x)=(3x+1)^4",
          steps: [
            { id: "step_1", op: "=>", math: "f(u)=u^4,\\ g(x)=3x+1", gap: "tight", say: "Layers." },
            { id: "step_2", math: "f'(u)=4u^3,\\ g'(x)=3", gap: "tight", say: "Derivatives." },
            { id: "step_3", math: "k'(x)=4(3x+1)^3\\cdot 3", gap: "tight", say: "Multiply." },
            { id: "step_4", math: "12(3x+1)^3", say: "Simplified answer." },
          ],
        },
      ],
      lead: "Compare with your pause work.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_solution_power",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "(3x+1)⁴ and 12(3x+1)³",
        caption: "Power decreased by 1; coefficient 12 = 4×3.",
        formulaLabel: "k",
        plot: {
          plotType: "y_equals",
          formula: "k(x)=(3x+1)^4",
          xDomain: [-0.3, 1],
          yDomain: [0, 30],
          probe: true,
          curves: [
            { id: "k", expr: "(3*x+1)*(3*x+1)*(3*x+1)*(3*x+1)", stroke: "#2563eb", strokeWidth: 4 },
            { id: "kp", expr: "12*(3*x+1)*(3*x+1)*(3*x+1)", stroke: "#16a34a", strokeWidth: 3, dashed: true },
          ],
        },
        params: { x: 0.4 },
      },
    },
    notes:
      "Solution after pause. Generalized power rule pattern n·a·(ax+b)^{n-1}.",
  },
  {
    id: "s12_challenge_optional_edge_case_example",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Edge Case at 0",
    question: "Check by differentiating \\(h(x)=x^6\\sin^3(1/x)\\) directly.",
    lead: "Optional, chain rule when the inner function is weird at 0.",
    blocks: [
      {
        id: "body_solution",
        type: "math_solution_steps",
        problem: "h(x)=[g(x)]^3,\\ g(x)=x^2\\sin(1/x)\\ (x\\neq0),\\ g(0)=0",
        steps: [
          { id: "step_1", op: "=>", math: "g'(0)=\\lim_{h\\to0}\\frac{h^2\\sin(1/h)}{h}=0", gap: "tight", say: "Squeeze theorem, Topic 6 callback." },
          { id: "step_2", math: "f(u)=u^3,\\ f'(0)=0", gap: "tight", say: "Outer derivative at 0." },
          { id: "step_3", math: "h'(0)=f'(g(0))\\cdot g'(0)=0", say: "Chain rule still holds." },
        ],
      },
    ],
    media: null,
    notes:
      "Optional edge case, skippable. Callback squeeze theorem from Topic 6.",
  },
  {
    id: "s13_application_exponential_composition",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: e^{cos(3x)}",
    question: "Try: \\(h(x)=e^{\\sin(2x)}\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "h(x)=e^{\\cos(3x)}",
          steps: [
            { id: "step_1", op: "=>", math: "\\text{outer }e^u,\\ \\text{inner }\\cos(3x)", gap: "tight", say: "Layers." },
            { id: "step_2", math: "e^{\\cos(3x)}", gap: "tight", say: "Exponential outer copies exponent." },
            { id: "step_3", math: "\\cdot(-\\sin(3x))\\cdot 3", gap: "tight", say: "Cosine then linear factors." },
            { id: "step_4", math: "-3e^{\\cos(3x)}\\sin(3x)", say: "Final form." },
          ],
        },
      ],
      lead: "Exponential outside, trig inside, three factors.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_exp_trig",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "e^{cos(3x)}",
        caption: "Always-positive outer wraps oscillating inner.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "h(x)=e^{\\cos(3x)}",
          xDomain: [-1, 1],
          yDomain: [0.5, 3],
          probe: true,
          probeDefault: 0.3,
          curves: [{ id: "h", expr: "exp(cos(3*x))", stroke: "#c65a28", strokeWidth: 4 }],
        },
        params: { x: 0.3 },
      },
    },
    notes:
      "Application with exp + trig + linear.\n\nStudent prompt: e^{sin(2x)} → 2e^{sin(2x)}cos(2x).",
  },
  {
    id: "s14_challenge_optional_proof_sketch",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Proof Sketch (Optional)",
    question: "Why can't we assume Δu ≠ 0 for all small h?",
    lead: "Light intuition, chain rule from the limit definition.",
    blocks: [
      {
        id: "body_proof",
        type: "proof_sketch",
        title: "Multiply two rates",
        text: "Let \\(h(x)=f(g(x))\\). With \\(\\Delta u=g(x+h)-g(x)\\):",
        steps: [
          { id: "body_step_1", text: "\\(h'(x)=\\lim_{h\\to0}\\frac{f(u+\\Delta u)-f(u)}{\\Delta u}\\cdot\\frac{\\Delta u}{h}\\) (when \\(\\Delta u\\neq 0\\))." },
          { id: "body_step_2", text: "First factor \\(\\to f'(u)=f'(g(x))\\); second factor \\(\\to g'(x)\\)." },
          { id: "body_step_3", text: "Hence \\(h'(x)=f'(g(x))g'(x)\\). Rigor requires a separate \\(\\Delta u=0\\) case." },
        ],
      },
    ],
    media: null,
    notes:
      "Optional proof_sketch, speed-read for theory-minded students. Mention Δu=0 caveat briefly.",
  },
  {
    id: "s15_summary_key_points",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Summary & Key Takeaways",
    question: "",
    lead: "Chain rule compressed:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Toolkit:** \\(\\sin,\\cos,\\tan, e^x, \\ln x\\) derivatives are assumed in every composition." },
          { id: "bullet_2", text: "**Theorem:** \\(\\frac{d}{dx}f(g(x))=f'(g(x))\\,g'(x)\\), **multiply** layers." },
          { id: "bullet_3", text: "**Leibniz:** \\(\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}\\)." },
          { id: "bullet_4", text: "**Power shortcut:** \\(\\frac{d}{dx}[g(x)]^n=n[g(x)]^{n-1}g'(x)\\)." },
          { id: "bullet_5", text: "**Workflow:** work outside in; never forget inner \\(g'(x)\\)." },
          { id: "bullet_6", text: "**Next topic (14):** Implicit Differentiation, differentiate both sides when \\(y\\) is trapped inside." },
        ],
      },
      {
        id: "final_pause",
        type: "pause_and_reveal",
        title: "Pause: preview Topic 14",
        prompt: "Quick check: derivative of \\(\\sin(x^2)\\), is it \\(\\cos(x^2)\\) alone?",
        reveal: { text: "**No**, multiply by \\(2x\\). Implicit differentiation next handles equations like \\(x^2+y^2=25\\)." },
      },
    ],
    media: null,
    notes:
      "Recap + implicit differentiation tease. Final pause reinforces inner factor. Thank students for Topic 13.",
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
 *   - Replaced composition_sqrt / secant_tangent / python plans with flex_plot
 *     composition graphs, unique inner/outer curves per slide.
 *   - s09 → visual_lab with labExamples: (2x+1)³, sin(x²), e^(x²).
 *   - Removed source, sourceSpec, sourceCode, python_code from all media.
 *
 * RICH BLOCKS
 *   - theorem_box on chain rule statement; misconception_compare on s08.
 *   - math_solution_steps on warm-up, standard, pause solutions, nested, application.
 *   - proof_sketch light on s14; pause_and_reveal on s05, s10, s15.
 *
 * PEDAGOGY
 *   - Welcome-back after Topic 12; roadmap currentId path_topic_13.
 *   - Arc: composition review → theorem → lab → examples → nested pause → implicit tease.
 *
 * ESTIMATED DURATION: ~20–23 min
 */