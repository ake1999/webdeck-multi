// Hand-enhanced from courses/Calculus/Materials/lhopitals_rule.json
// See COURSE DESIGN CHANGELOG at bottom.

export const topicMeta = {
  id: "06_lhopitals_rule",
  title: "L'Hôpital's Rule",
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
    title: "L'Hôpital's Rule",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic 20 · Indeterminate forms · ~20 min · first-year university / advanced high school",
    notes:
      "Welcome back, Topic 19 was optimization; Topic 20 handles limits when substitution gives indeterminate forms. Callback Session 2 (Topics 3–6) and Topic 4's 0/0 holes.",
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
        currentId: "path_topic_20",
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
          { id: "path_topic_19", number: 19, session: "S04 Applications of Derivatives", label: "Optimization Problems", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_20", number: 20, session: "S04 Applications of Derivatives", label: "L'Hopital's Rule", note: "This topic", status: "current", expanded: true },
          { id: "path_topic_21", number: 21, session: "S04 Applications of Derivatives", label: "Newton's Method and Linear Approximations", note: "Next", status: "next", expanded: true },
          { id: "path_topic_22", number: 22, session: "S05 Integration Foundations", label: "Antiderivatives and Indefinite Integrals", status: "upcoming" },
          { id: "path_topic_23", number: 23, session: "S05 Integration Foundations", label: "Approximating Area with Riemann Sums", status: "upcoming" },
          { id: "path_topic_24", number: 24, session: "S05 Integration Foundations", label: "The Definite Integral", status: "upcoming" },
          { id: "path_topic_25", number: 25, session: "S05 Integration Foundations", label: "The Fundamental Theorem of Calculus", status: "upcoming" },
          { id: "path_topic_26", number: 26, session: "S05 Integration Foundations", label: "Integration by Substitution", status: "upcoming" },
        ],
      },
    ],
    bullets: [
      { id: "objective_1", text: "Recognize indeterminate forms \\(0/0\\), \\(\\infty/\\infty\\), \\(0\\cdot\\infty\\), \\(\\infty-\\infty\\), and indeterminate powers." },
      { id: "objective_2", text: "Apply L'Hôpital's Rule when the form is genuinely indeterminate." },
      { id: "objective_3", text: "Rewrite products, differences, and powers into quotients suitable for the rule." },
      { id: "objective_4", text: "Apply the rule repeatedly when the derivative ratio stays indeterminate." },
      { id: "objective_5", text: "Connect the rule to derivative rates, who wins the race near the limit point." },
    ],
    notes:
      "Roadmap: Topic 19 optimization done → Topic 20 L'Hopital → Topic 21 Newton. Callback Topic 4 factoring holes and Topic 6 squeeze on sin x / x.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: MOTIVATION + THEOREM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_when_limits_play_hide_and_seek",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "When Limits Play Hide-and-Seek",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Consider \\(\\displaystyle \\lim_{x \\to 0} \\frac{\\sin x}{x}\\). Both parts → 0, so direct substitution gives meaningless \\(0/0\\).",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "Topic 6 squeezed this to 1. Topic 4 factored similar \\(0/0\\) holes. **L'Hôpital** adds a derivative-powered tool when algebra or squeeze is heavy.",
        },
        {
          id: "left_callback",
          type: "nested_bullets",
          items: [
            { id: "cb_1", text: "**Topic 4:** \\(\\frac{x^2-4}{x-2}\\), cancel, then substitute." },
            { id: "cb_2", text: "**Topic 6:** \\(\\frac{\\sin x}{x}\\), trap between \\(\\cos x\\) and \\(\\sec x\\)." },
            { id: "cb_3", text: "**Topic 20:** compare **rates** via \\(f'/g'\\) when the form is \\(0/0\\) or \\(\\infty/\\infty\\)." },
          ],
        },
      ],
      lead: "\\(0/0\\) is a signal, not an answer.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_sinc_squeeze",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "sin(x)/x: squeeze callback (Topic 6)",
        caption: "Zoom toward 0: classic limit = 1.",
        formulaLabel: "g",
        plot: {
          plotType: "squeeze",
          mid: "sin(x)/x",
          lower: "cos(x)",
          upper: "1/cos(x)",
          formula: "\\lim_{x\\to 0}\\frac{\\sin x}{x}=1",
          yDomain: [-0.5, 1.6],
        },
        params: { zoom: 0.15 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.4 } },
          { t: 5, params: { zoom: 0.08 } },
          { t: 10, params: { zoom: 0.02 } },
        ],
      },
    },
    notes:
      "Open with sin/x 0/0. Name Topic 4 holes + Topic 6 squeeze before introducing L'Hopital. flex_plot squeeze, not limit_epsilon.",
  },
  {
    id: "s02_a_race_between_functions",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "A Race Between Functions",
    question: "At x = 0.2, compare f/g and f′/g′ for f = sin x, g = x.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Near \\(a\\), whichever function changes **faster** tends to dominate the ratio. L'Hôpital replaces \\(f/g\\) with \\(f'/g'\\) when the original form is \\(0/0\\) or \\(\\infty/\\infty\\).",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Differentiate numerator and denominator **separately**, not the quotient rule.",
        },
      ],
      lead: "Instantaneous rates decide who wins the ratio.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_race_sin_x",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "sin x vs x near 0",
        caption: "Blue sin x, red x, green sin(x)/x: probe x toward 0.",
        formulaLabel: "f/g",
        plot: {
          plotType: "y_equals",
          formula: "\\frac{\\sin x}{x}\\to 1",
          xDomain: [-1.2, 1.2],
          yDomain: [-0.5, 1.5],
          probe: true,
          probeDefault: 0.3,
          probeMin: 0.05,
          probeMax: 1,
          curves: [
            { id: "sin", expr: "sin(x)", stroke: "#2563eb", strokeWidth: 3 },
            { id: "linear", expr: "x", stroke: "#c65a28", strokeWidth: 3 },
            { id: "ratio", expr: "sin(x)/x", stroke: "#16a34a", strokeWidth: 4 },
          ],
          tags: [{ text: "f′/g′ = cos x → 1", x: 0.5, y: 1.2 }],
        },
        params: { x: 0.3 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.8 } },
          { t: 5, params: { x: 0.2 } },
          { t: 10, params: { x: 0.05 } },
        ],
      },
    },
    notes:
      "Race intuition with flex_plot triple curves. Move probe, ratio and f′/g′ both approach 1.\n\nStudent prompt on slide question.",
  },
  {
    id: "s03_the_formula_and_conditions",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Formula and Conditions",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "L'Hôpital's Rule",
          text: "If \\(\\displaystyle\\lim_{x\\to a}\\frac{f(x)}{g(x)}\\) is \\(0/0\\) or \\(\\infty/\\infty\\), and the limit of the derivative ratio exists (or is \\(\\pm\\infty\\)), then \\(\\displaystyle\\lim_{x\\to a}\\frac{f(x)}{g(x)}=\\lim_{x\\to a}\\frac{f'(x)}{g'(x)}\\).",
        },
        {
          id: "left_conditions",
          type: "nested_bullets",
          items: [
            { id: "c1", text: "**Form check:** both → 0 or both → \\(\\pm\\infty\\), not \\(1/0\\), not \\(0/5\\)." },
            { id: "c2", text: "**Differentiate parts:** \\(f'\\) on top, \\(g'\\) on bottom, never quotient rule." },
            { id: "c3", text: "**Right-hand limit** must exist (finite or infinite)." },
            { id: "c4", text: "\\(g'(x)\\neq 0\\) near \\(a\\) (except possibly at \\(a\\))." },
          ],
        },
      ],
      lead: "Check the form first, the rule is conditional.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_forms",
          type: "math_table",
          headers: ["Form", "L'Hôpital?"],
          rows: [
            ["\\(0/0\\)", "Yes, after check"],
            ["\\(\\infty/\\infty\\)", "Yes, may repeat"],
            ["\\(0\\cdot\\infty\\)", "Rewrite as quotient first"],
            ["\\(\\infty-\\infty\\)", "Combine fractions first"],
            ["\\(1/1\\) at a point", "No, direct substitution"],
          ],
        },
      ],
    },
    notes:
      "theorem_box formal statement + conditions nested_bullets. Table on right for quick form reference.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: CORE EXAMPLES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s04_example_1_warm_up_direct_application",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 1: Warm-Up, Direct Application (Pause)",
    question: "Try: \\(\\displaystyle \\lim_{x \\to 0} \\frac{e^x - 1}{x}\\), A) 0  B) 1  C) e  D) DNE",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to 1}\\frac{\\ln x}{x-1}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\frac{0}{0}",
              gap: "tight",
              say: "At x=1, ln 1 = 0 and x-1 = 0.",
            },
            {
              id: "step_2",
              math: "\\lim_{x\\to 1}\\frac{1/x}{1}",
              gap: "tight",
              say: "Differentiate numerator and denominator separately.",
            },
            {
              id: "step_3",
              math: "1",
              say: "Substitute x=1 into 1/x.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause: your turn",
          prompt: "Evaluate the e^x warm-up before continuing.",
          reveal: {
            text: "**B) 1**, \\(0/0\\) form; derivatives give \\(e^x/1 \\to 1\\).",
          },
        },
      ],
      lead: "Worked: ln x / (x−1). Pause MC: e^x − 1 over x.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_ln_warmup",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "ln x and x − 1 near 1",
        caption: "Both tangent to zero: ratio → 1.",
        formulaLabel: "f,g",
        plot: {
          plotType: "y_equals",
          formula: "\\frac{\\ln x}{x-1}",
          xDomain: [0.4, 1.6],
          yDomain: [-1, 3],
          probe: true,
          probeDefault: 1.1,
          curves: [
            { id: "ln", expr: "log(x)", stroke: "#2563eb", strokeWidth: 3 },
            { id: "linear", expr: "x-1", stroke: "#c65a28", strokeWidth: 3 },
            { id: "ratio", expr: "log(x)/(x-1)", stroke: "#16a34a", strokeWidth: 4 },
          ],
          vLines: [{ x: 1 }],
        },
        params: { x: 1.1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.7 } },
          { t: 5, params: { x: 1.05 } },
        ],
      },
    },
    notes:
      "math_solution_steps for ln example. pause_and_reveal MCQ for e^x-1/x. flex_plot curves near x=1.\n\nStudent prompt on slide question.",
  },
  {
    id: "s05_example_2_standard_repeated_application",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 2: Repeated Application, ∞/∞",
    question: "What if the denominator is x^{10}?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to\\infty}\\frac{e^x}{x^2}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\frac{\\infty}{\\infty}",
              gap: "tight",
              say: "Both blow up, form check passes.",
            },
            {
              id: "step_2",
              math: "\\lim_{x\\to\\infty}\\frac{e^x}{2x}",
              gap: "tight",
              say: "First L'Hôpital, still infinity over infinity.",
            },
            {
              id: "step_3",
              math: "\\lim_{x\\to\\infty}\\frac{e^x}{2}",
              gap: "tight",
              say: "Second application.",
            },
            {
              id: "step_4",
              math: "\\infty",
              say: "Exponential beats any fixed polynomial power.",
            },
          ],
        },
      ],
      lead: "Apply until the ratio is no longer indeterminate.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_exp_vs_poly",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "e^x dominates x^n",
        caption: "Probe large x: green ratio e^x/x² rockets up.",
        formulaLabel: "ratio",
        plot: {
          plotType: "y_equals",
          formula: "\\frac{e^x}{x^2}\\to\\infty",
          xDomain: [0, 6],
          yDomain: [0, 120],
          probe: true,
          probeDefault: 4,
          curves: [
            { id: "exp", expr: "exp(x)", stroke: "#2563eb", strokeWidth: 3 },
            { id: "poly", expr: "x*x", stroke: "#c65a28", strokeWidth: 3 },
            { id: "ratio", expr: "exp(x)/(x*x)", stroke: "#16a34a", strokeWidth: 4 },
          ],
        },
        params: { x: 4 },
        scriptedTimeline: [
          { t: 0, params: { x: 2 } },
          { t: 5, params: { x: 5 } },
        ],
      },
    },
    notes:
      "Repeated L'Hôpital on e^x/x². flex_plot shows exponential winning. Mention x^10 still loses to e^x.\n\nStudent prompt on slide question.",
  },
  {
    id: "s06_extending_to_one_sided_and_infinite_limits",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "One-Sided and Infinite Limits",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$ \\lim_{x \\to a^+} \\frac{f(x)}{g(x)} = \\lim_{x \\to a^+} \\frac{f'(x)}{g'(x)} $$",
            "$$ \\lim_{x \\to \\infty} \\frac{f(x)}{g(x)} = \\lim_{x \\to \\infty} \\frac{f'(x)}{g'(x)} $$",
            "Same **0/0** or **∞/∞** check at the start.",
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Topic 5 taught limits at infinity as a horizontal asymptote question, L'Hôpital is one tool when the form qualifies.",
        },
      ],
      lead: "One-sided and ±∞ limits use the same derivative-ratio idea.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_infinity_limit",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Limit as x → ∞",
        caption: "ln x / x → 0: ∞/∞ with one application.",
        formulaLabel: "f/g",
        plot: {
          plotType: "y_equals",
          formula: "\\frac{\\ln x}{x}\\to 0",
          xDomain: [1, 50],
          yDomain: [0, 1.2],
          probe: true,
          probeDefault: 20,
          curves: [
            { id: "ratio", expr: "log(x)/x", stroke: "#2563eb", strokeWidth: 4 },
          ],
          tags: [{ text: "→ 0 as x → ∞", x: 35, y: 0.08 }],
        },
        params: { x: 20 },
        scriptedTimeline: [
          { t: 0, params: { x: 5 } },
          { t: 5, params: { x: 40 } },
        ],
      },
    },
    notes:
      "Callback Topic 5 infinity limits. flex_plot ln x / x decay, quick ∞/∞ example without new slide ID.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: TRANSFORMATIONS + PITFALLS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s07_transforming_0_cdot_infty_forms",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Transforming $0 \\cdot \\infty$ Forms",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "**Strategy:** rewrite as a quotient.",
            "$$ f\\cdot g = \\frac{f}{1/g} \\quad\\text{or}\\quad \\frac{g}{1/f} $$",
            "Pick the version with **simpler derivatives**, then check for \\(0/0\\) or \\(\\infty/\\infty\\).",
          ],
        },
      ],
      lead: "Products are not L'Hôpital-ready until you divide.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_xlnx_transform",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "x ln x → 0 from the right",
        caption: "Blue product; green = ln x / (1/x) rewrite.",
        formulaLabel: "P",
        plot: {
          plotType: "y_equals",
          formula: "x\\ln x\\to 0",
          xDomain: [0.01, 0.8],
          yDomain: [-0.35, 0.05],
          probe: true,
          probeDefault: 0.15,
          curves: [
            { id: "product", expr: "x*log(x)", stroke: "#2563eb", strokeWidth: 4 },
            { id: "quotient", expr: "log(x)/(1/x)", stroke: "#16a34a", strokeWidth: 3, dashed: true },
          ],
        },
        params: { x: 0.15 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.4 } },
          { t: 5, params: { x: 0.05 } },
        ],
      },
    },
    notes:
      "0·∞ rewrite strategy. flex_plot shows product and quotient forms coinciding.",
  },
  {
    id: "s08_example_3_tricky_0_cdot_infty_common_pitfall",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 3: $0 \\cdot \\infty$ (Pause)",
    question: "Try \\(\\lim_{x\\to\\infty} x e^{-x}\\), A) 0  B) 1  C) ∞  D) −∞",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to 0^+} x\\ln x",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "0\\cdot(-\\infty)",
              gap: "tight",
              say: "Not a quotient yet, rewrite first.",
            },
            {
              id: "step_2",
              math: "\\frac{\\ln x}{1/x}",
              gap: "tight",
              say: "Now infinity over infinity as x→0+.",
            },
            {
              id: "step_3",
              math: "\\lim_{x\\to 0^+}\\frac{1/x}{-1/x^2}",
              gap: "tight",
              say: "L'Hôpital on the quotient.",
            },
            {
              id: "step_4",
              math: "0",
              say: "Simplifies to -x → 0.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause: MC check",
          prompt: "Rewrite x e^{-x} as a quotient, then pick A–D.",
          reveal: {
            text: "**A) 0**, write as \\(x/e^x\\), then \\(0/0\\) style at ∞ gives 1/e^x → 0.",
          },
        },
      ],
      lead: "Worked: x ln x at 0+. Pause: x e^{-x} at ∞.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_xlnx_pause",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "x ln x approaching 0",
        caption: "Probe toward 0+: curve pulls to the axis.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "x\\ln x",
          xDomain: [0.01, 0.6],
          yDomain: [-0.3, 0.02],
          probe: true,
          probeDefault: 0.08,
          curves: [{ id: "prod", expr: "x*log(x)", stroke: "#2563eb", strokeWidth: 4 }],
        },
        params: { x: 0.08 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.3 } },
          { t: 5, params: { x: 0.03 } },
        ],
      },
    },
    notes:
      "math_solution_steps + pause_and_reveal MCQ. flex_plot x ln x.\n\nStudent prompt on slide question.",
  },
  {
    id: "s09_common_pitfall_applying_when_not_indeterminate",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Common Pitfall: Applying When Not Indeterminate",
    question: "Why is L'Hôpital invalid below even though derivatives exist?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Form check vs blind differentiation",
          pairs: [
            {
              label: "❌ Wrong form, still differentiate",
              text: "\\(\\lim_{x\\to 0}\\frac{x^2+1}{\\cos x}=\\frac{1}{1}=1\\), but mis-applying L'Hôpital chases a fake \\(0/0\\) chain to \\(-2\\).",
            },
            {
              label: "✅ Check first",
              text: "Direct substitution: \\(1/1=1\\). Not indeterminate, **stop** or use algebra.",
            },
          ],
        },
        {
          id: "left_rule",
          type: "paragraph",
          text: "L'Hôpital answers **indeterminate** races, not every quotient. Topic 4 holes were \\(0/0\\); this limit is **not**.",
        },
      ],
      lead: "Getting −2 from a limit that equals 1 is a form-check failure.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_not_indeterminate",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "(x²+1)/cos x: well behaved at 0",
        caption: "Limit = 1/1: no hole, no indeterminate form.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "\\frac{x^2+1}{\\cos x}",
          xDomain: [-1.2, 1.2],
          yDomain: [0, 3],
          probe: true,
          probeDefault: 0,
          curves: [{ id: "ratio", expr: "(x*x+1)/cos(x)", stroke: "#c65a28", strokeWidth: 4 }],
          filledPoints: [{ x: 0, y: 1 }],
          tags: [{ text: "f(0)=1, plug in directly", x: 0, y: 1 }],
        },
        params: { x: 0 },
        scriptedTimeline: [
          { t: 0, params: { x: -0.5 } },
          { t: 5, params: { x: 0 } },
        ],
      },
    },
    notes:
      "misconception_compare on non-indeterminate misuse. flex_plot shows continuous limit 1 at 0. Callback Topic 4 hole vs genuine substitution.\n\nStudent prompt on slide question.",
  },
  {
    id: "s10_transforming_infty_infty_forms",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Transforming $\\infty - \\infty$ Forms",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_strategy",
          type: "nested_bullets",
          items: [
            { id: "inf_1", text: "Combine into **one fraction** (common denominator)." },
            { id: "inf_2", text: "Factor dominant terms when \\(x\\to\\infty\\)." },
            { id: "inf_3", text: "Rationalize with conjugates when roots appear." },
            { id: "inf_4", text: "Then check for \\(0/0\\) or \\(\\infty/\\infty\\) and apply L'Hôpital if needed." },
          ],
        },
      ],
      lead: "∞ − ∞ is not arithmetic, convert to a quotient first.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_sec_minus_tan",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "sec x − tan x near π/2",
        caption: "Blue and red blow up; green difference → 0.",
        formulaLabel: "D",
        plot: {
          plotType: "y_equals",
          formula: "\\sec x-\\tan x",
          xDomain: [0.5, 1.5],
          yDomain: [-0.5, 8],
          probe: true,
          probeDefault: 1.4,
          curves: [
            { id: "sec", expr: "1/cos(x)", stroke: "#2563eb", strokeWidth: 3 },
            { id: "tan", expr: "tan(x)", stroke: "#c65a28", strokeWidth: 3 },
            { id: "diff", expr: "1/cos(x)-tan(x)", stroke: "#16a34a", strokeWidth: 4 },
          ],
          tags: [{ text: "difference → 0", x: 1.45, y: 0.2 }],
        },
        params: { x: 1.4 },
        scriptedTimeline: [
          { t: 0, params: { x: 1.0 } },
          { t: 5, params: { x: 1.48 } },
        ],
      },
    },
    notes:
      "∞−∞ strategy bullets. flex_plot sec, tan, and difference, setup for Example 4.",
  },
  {
    id: "s11_example_4_edge_case_infty_infty_with_trig",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 4: $\\infty - \\infty$ with Trig",
    question: "Verify: \\(\\sec x - \\tan x = \\frac{1-\\sin x}{\\cos x}\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to (\\pi/2)^-}(\\sec x-\\tan x)",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\infty-\\infty",
              gap: "tight",
              say: "Both terms blow up, combine first.",
            },
            {
              id: "step_2",
              math: "\\frac{1-\\sin x}{\\cos x}",
              gap: "tight",
              say: "Common denominator over cos x.",
            },
            {
              id: "step_3",
              math: "\\frac{0}{0}",
              gap: "tight",
              say: "Now L'Hôpital applies at π/2 from the left.",
            },
            {
              id: "step_4",
              math: "\\lim\\frac{-\\cos x}{-\\sin x}=\\frac{\\cos x}{\\sin x}",
              gap: "tight",
              say: "Differentiate top and bottom.",
            },
            {
              id: "step_5",
              math: "0",
              say: "cos(π/2)=0, sin(π/2)=1, limit is 0.",
            },
          ],
        },
      ],
      lead: "Algebra first, L'Hôpital second.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_sec_tan_solution",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Combined form (1 − sin x)/cos x",
        caption: "0/0 at π/2: limit 0 confirmed.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          formula: "\\frac{1-\\sin x}{\\cos x}",
          xDomain: [0.8, 1.55],
          yDomain: [-0.5, 3],
          probe: true,
          probeDefault: 1.45,
          curves: [{ id: "combined", expr: "(1-sin(x))/cos(x)", stroke: "#16a34a", strokeWidth: 4 }],
          vLines: [{ x: 1.5708 }],
        },
        params: { x: 1.45 },
        scriptedTimeline: [
          { t: 0, params: { x: 1.2 } },
          { t: 5, params: { x: 1.52 } },
        ],
      },
    },
    notes:
      "math_solution_steps for sec−tan. flex_plot on combined rational trig form.\n\nStudent prompt on slide question.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: CHALLENGE + SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s12_challenge_optional_transforming_indeterminate_powers_0_0_infty_0_1_infty",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Indeterminate Powers",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "Let \\(y = [f(x)]^{g(x)}\\). Take logs:",
            "$$ \\ln y = g(x)\\ln f(x) $$",
            "Evaluate \\(\\lim \\ln y = L\\), then \\(\\lim y = e^L\\).",
            "Forms: \\(0^0\\), \\(\\infty^0\\), \\(1^\\infty\\), all need log transform first.",
          ],
        },
      ],
      lead: "Powers → logs → products → quotients → L'Hôpital → exponentiate.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_power_form",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "(1 + sin 4x)^{cot x} near 0+",
        caption: "Challenge preview: oscillatory base, blow-up exponent.",
        formulaLabel: "y",
        plot: {
          plotType: "y_equals",
          formula: "(1+\\sin 4x)^{1/\\tan x}",
          xDomain: [0.05, 0.8],
          yDomain: [0, 80],
          probe: true,
          probeDefault: 0.2,
          curves: [{ id: "power", expr: "exp(log(1+sin(4*x))/tan(x))", stroke: "#7c3aed", strokeWidth: 4 }],
          tags: [{ text: "limit e^4 (next slide)", x: 0.3, y: 50 }],
        },
        params: { x: 0.2 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 5, params: { x: 0.1 } },
        ],
      },
    },
    notes:
      "Optional challenge block, log transform recipe. flex_plot previews 1^∞ flavor. Skip on time-limited path.",
  },
  {
    id: "s13_challenge_optional_example_5_application_1_infty_form",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Example 5: $1^\\infty$ Form (Pause)",
    question: "Try: \\(\\lim_{x\\to 0} (1+2x)^{1/x}\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          splitAfter: 3,
          problem: "y=(1+\\sin 4x)^{\\cot x}",
          steps: [
            {
              id: "step_1",
              math: "\\ln y=\\cot x\\cdot\\ln(1+\\sin 4x)",
              gap: "tight",
              say: "Log both sides, product form.",
            },
            {
              id: "step_2",
              math: "\\frac{\\ln(1+\\sin 4x)}{\\tan x}",
              gap: "tight",
              say: "Rewrite as 0/0 quotient.",
            },
            {
              id: "step_3",
              math: "\\lim\\frac{4\\cos 4x/(1+\\sin 4x)}{\\sec^2 x}",
              gap: "tight",
              say: "L'Hôpital with chain rule on numerator.",
            },
            {
              id: "step_4",
              math: "4",
              gap: "tight",
              say: "Limit of ln y is 4.",
            },
            {
              id: "step_5",
              math: "e^4",
              say: "Exponentiate, do not forget this step.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause: parallel problem",
          prompt: "Work (1+2x)^{1/x} with the same log recipe.",
          reveal: {
            text: "\\(\\ln y = \\frac{\\ln(1+2x)}{x}\\to 2\\), so the limit is **e²**.",
          },
        },
      ],
      lead: "Rich 1^∞ example, logs, L'Hôpital, then e^L.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_challenge_power",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Log-domain view",
        caption: "Focus on ln y → 4, then exponentiate.",
        formulaLabel: "ln y",
        plot: {
          plotType: "y_equals",
          formula: "\\frac{\\ln(1+\\sin 4x)}{\\tan x}",
          xDomain: [0.05, 0.7],
          yDomain: [-2, 8],
          probe: true,
          probeDefault: 0.15,
          curves: [{ id: "ln_form", expr: "log(1+sin(4*x))/tan(x)", stroke: "#7c3aed", strokeWidth: 4 }],
          filledPoints: [{ x: 0.1, y: 4 }],
        },
        params: { x: 0.15 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.4 } },
          { t: 5, params: { x: 0.08 } },
        ],
      },
    },
    notes:
      "splitAfter math_solution_steps for 1^∞. pause_and_reveal for (1+2x)^{1/x} → e². Optional challenge.\n\nStudent prompt on slide question.",
  },
  {
    id: "s14_challenge_optional_pause_and_try",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Pause and Try",
    question: "Evaluate \\(\\lim_{x\\to 0} (1+2x)^{1/x}\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "**Your turn:** \\(\\displaystyle\\lim_{x\\to 0}(1+2x)^{1/x}\\). Set \\(y=\\cdots\\), take \\(\\ln\\), convert to \\(0/0\\).",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Reveal when ready",
          prompt: "Full log-L'Hôpital-exponentiate pipeline.",
          reveal: {
            text: "**e²**, same pattern as the previous slide with simpler algebra.",
          },
        },
      ],
      lead: "Standalone practice beat for the 1^∞ template.",
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
        title: "(1+2x)^{1/x} stabilizes near e²",
        caption: "Horizontal readout: limit e².",
        formulaLabel: "y",
        plot: {
          plotType: "y_equals",
          formula: "(1+2x)^{1/x}",
          xDomain: [-0.4, 0.4],
          yDomain: [0, 12],
          probe: true,
          probeDefault: 0.1,
          curves: [{ id: "power", expr: "exp(log(1+2*x)/x)", stroke: "#2563eb", strokeWidth: 4 }],
          hLines: [{ y: 7.389 }],
          tags: [{ text: "e^2 ≈ 7.39", x: 0.15, y: 7.389 }],
        },
        params: { x: 0.1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.3 } },
          { t: 5, params: { x: 0.02 } },
        ],
      },
    },
    notes:
      "Optional pause slide with flex_plot e² guide line. pause_and_reveal answer.\n\nStudent prompt on slide question.",
  },
  {
    id: "s15_challenge_optional_proof_sketch_special_case",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Proof Sketch ($0/0$ case)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_proof",
          type: "proof_sketch",
          title: "Difference quotient intuition",
          text: "When \\(f(a)=g(a)=0\\) and \\(g'(a)\\neq 0\\): \\(\\displaystyle\\frac{f(x)}{g(x)}=\\frac{(f(x)-f(a))/(x-a)}{(g(x)-g(a))/(x-a)}\\to\\frac{f'(a)}{g'(a)}\\). Near \\(a\\), \\(f(x)\\approx f'(a)(x-a)\\) and \\(g(x)\\approx g'(a)(x-a)\\), the linear terms decide the ratio.",
        },
        {
          id: "left_callback_hole",
          type: "paragraph",
          text: "Same spirit as Topic 4: cancel the zero at \\(a\\) in a **punctured neighborhood**, then read the limiting slope ratio.",
        },
      ],
      lead: "Proof connects L'Hôpital to the definition of the derivative.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_rational_hole_proof",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Topic 4 callback: hole at a",
        caption: "Orange rational; dashed = limiting slope picture.",
        formulaLabel: "f",
        plot: {
          plotType: "rational_hole",
          holeAt: 2,
          simplifiedExpr: "x+2",
          formula: "f(x)=\\frac{x^2-4}{x-2}",
          xDomain: [0, 3.8],
          yDomain: [0, 6.5],
          probe: true,
          probeDefault: 1.5,
        },
        params: { x: 1.5, a: 2, showSimplified: true },
        scriptedTimeline: [
          { t: 0, params: { x: 1, showSimplified: false } },
          { t: 5, params: { x: 1.95, showSimplified: true } },
        ],
      },
    },
    notes:
      "Optional proof sketch. rational_hole flex_plot callbacks Topic 4 hole at (2,4). Full ∞/∞ proof uses Cauchy MVT.",
  },
  {
    id: "s16_summary_pro_tips",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Summary & Pro Tips",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_recap",
          type: "nested_bullets",
          items: [
            { id: "tip_1", text: "**Check the form**, L'Hôpital only for \\(0/0\\) and \\(\\infty/\\infty\\) after rewrites." },
            { id: "tip_2", text: "**Differentiate parts**, never quotient rule on the original fraction." },
            { id: "tip_3", text: "**Transform** products, differences, and powers before applying." },
            { id: "tip_4", text: "**Algebra first** when factoring (Topic 4) or squeezing (Topic 6) is faster." },
          ],
        },
        {
          id: "left_teaser",
          type: "paragraph",
          text: "**Next:** Topic 21, **Newton's Method and Linear Approximations**, another derivative-powered approximation tool.",
        },
      ],
      lead: "Form → transform → differentiate → repeat if needed.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_table",
          type: "math_table",
          headers: ["Form", "Move"],
          rows: [
            ["\\(0/0\\), \\(\\infty/\\infty\\)", "L'Hôpital on \\(f'/g'\\)"],
            ["\\(0\\cdot\\infty\\)", "Rewrite as quotient"],
            ["\\(\\infty-\\infty\\)", "Common denominator / factor"],
            ["\\(1^\\infty\\), \\(0^0\\)", "\\(\\ln y\\), then exponentiate"],
            ["Not indeterminate", "Direct substitution or Topic 4 algebra"],
          ],
        },
      ],
    },
    notes:
      "Exit recap with form table. Tease Newton's Method. Callback Topics 4 and 6 as preferred tools when they apply.",
  },
];

export default slidesData;

/*
 * COURSE DESIGN CHANGELOG. 06_lhopitals_rule (June 2026 hand-enhance)
 *
 * v1 adapter → v2 hand-enhanced:
 *   - Removed sourceMaterial, python_code, sourceSpec, limit_epsilon, secant_tangent.
 *   - Welcome back; callback Topic 19 optimization; Session 2 Topics 4 (0/0 holes) + 6 (squeeze).
 *   - theorem_box on s03; nested_bullets conditions + form table.
 *   - math_solution_steps on s04, s05, s08, s11, s13 (splitAfter on challenge).
 *   - flex_plot throughout: squeeze sin/x, race curves, exp vs poly, x ln x, sec−tan, powers.
 *   - rational_hole flex_plot on s15 proof, Topic 4 callback.
 *   - misconception_compare on s09 (wrong form vs check first).
 *   - pause_and_reveal MCQ-style on s04, s08, s13, s14.
 *   - Text slides converted to two-col; summary teases Topic 21 Newton.
 */