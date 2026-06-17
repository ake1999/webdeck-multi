// Generated from courses/Calculus/Materials/the_squeeze_theorem.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "04_the_squeeze_theorem",
  title: "The Squeeze Theorem",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/the_squeeze_theorem.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "The Squeeze Theorem",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: Squeeze bounds, oscillating limits, sin(x)/x • Session 2 • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back after Topic 5 (one-sided limits and infinity). Topic 6 is the rescue tool when limit laws fail on oscillating functions. Assumes limit definition and laws from Topics 3–5.",
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
        currentId: "path_topic_06",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", status: "completed" },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", status: "completed" },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", status: "completed" },
          { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", status: "completed" },
          { id: "path_topic_05", number: 5, session: "S02 Limits and Continuity", label: "One-Sided Limits and Limits at Infinity", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_06", number: 6, session: "S02 Limits and Continuity", label: "The Squeeze Theorem", note: "Today", status: "current", expanded: true },
          { id: "path_topic_07", number: 7, session: "S02 Limits and Continuity", label: "Continuity and the Intermediate Value Theorem", note: "Next", status: "next", expanded: true },
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
      { id: "objective_1", text: "Apply the Squeeze Theorem when \\(f \\leq g \\leq h\\) and both outer limits agree." },
      { id: "objective_2", text: "Spot problems where limit laws fail (oscillation, no individual limit)." },
      { id: "objective_3", text: "Build bounding functions for oscillatory terms, especially \\(|g| \\leq M\\) with \\(M \\to 0\\)." },
      { id: "objective_4", text: "Prove \\(\\displaystyle\\lim_{x\\to 0}\\frac{\\sin x}{x}=1\\) and reuse the template on harder limits." },
    ],
    notes:
      "Roadmap first: Topics 1–5 done, Topic 6 today, Topic 7 continuity next. Four objectives map to statement → warm-up → classic examples → proof recap.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: INTUITION + STATEMENT
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_the_cat_between_two_walls",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Cat Between Two Walls",
    question: "If two walls close on the same point \\(L\\), where must the cat land?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Imagine a cat trapped between two walls that move toward each other. If both walls meet at \\(L\\), the cat is forced to land at \\(L\\) too, even if it wiggles on the way.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "Same picture in calculus: \\(f(x) \\leq g(x) \\leq h(x)\\) near \\(a\\). If \\(\\lim f = \\lim h = L\\), then \\(\\lim g = L\\). Also called the **Sandwich** or **Pinching** Theorem.",
        },
      ],
      lead: "Trap \\(g\\) between two functions whose limits agree, \\(g\\) has no escape.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_squeeze_hook",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Wild oscillation near 0: why we need a squeeze",
        caption: "sin(1/x) with fixed bounds: shrink zoom and watch the wiggle.",
        formulaLabel: "g",
        plot: {
          plotType: "squeeze",
          mid: "sin(1/x)",
          lower: "-1",
          upper: "1",
          formula: "g(x)=\\sin\\!\\left(\\frac{1}{x}\\right)",
          tag: "bounds stay at ±1, no squeeze yet",
        },
        params: { zoom: 0.4 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.5 } },
          { t: 5, params: { zoom: 0.15 } },
          { t: 10, params: { zoom: 0.03 } },
        ],
      },
    },
    notes:
      "Cat-between-walls metaphor on voice. Widget previews oscillation density near 0 from Topic 3 challenge. Do not prove yet, build hunger for bounding functions.",
  },
  {
    id: "s02_the_squeeze_theorem_statement",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Squeeze Theorem Statement",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Squeeze Theorem",
          text: "If \\(f(x) \\leq g(x) \\leq h(x)\\) for all \\(x\\) near \\(a\\) (except possibly at \\(a\\)), and \\(\\displaystyle\\lim_{x\\to a} f(x) = \\lim_{x\\to a} h(x) = L\\), then \\(\\displaystyle\\lim_{x\\to a} g(x) = L\\).",
        },
        {
          id: "left_conditions",
          type: "nested_bullets",
          items: [
            { id: "c1", text: "**Sandwich:** \\(g\\) stays between \\(f\\) and \\(h\\) on a punctured neighborhood." },
            { id: "c2", text: "**Agreement:** outer limits both equal \\(L\\)." },
            { id: "c3", text: "**Conclusion:** \\(g\\) is forced to approach \\(L\\), value at \\(a\\) irrelevant." },
          ],
        },
      ],
      lead: "Two conditions in, one limit out.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_squeeze_statement",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "x sin(1/x) trapped between ±|x|",
        caption: "Gray bounds shrink: orange g has nowhere to go but 0.",
        formulaLabel: "g",
        plot: {
          plotType: "squeeze",
          mid: "x*sin(1/x)",
          lower: "-abs(x)",
          upper: "abs(x)",
          formula: "g(x)=x\\sin\\!\\left(\\frac{1}{x}\\right)",
          tag: "envelope → 0",
        },
        params: { zoom: 0.25 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.4 } },
          { t: 6, params: { zoom: 0.12 } },
          { t: 12, params: { zoom: 0.04 } },
        ],
      },
    },
    notes:
      "Read theorem once, then conditions as checklist. Widget carries oscillation; voice names lower/upper envelopes approaching the same height. Mention epsilon-delta proof comes at s15.",
  },
  {
    id: "s03_the_zero_bound_corollary",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Zero-Bound Corollary",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_corollary",
          type: "theorem_box",
          title: "Zero-bound corollary (most used form)",
          text: "If \\(|g(x)| \\leq M(x)\\) near \\(a\\) and \\(\\displaystyle\\lim_{x\\to a} M(x) = 0\\), then \\(\\displaystyle\\lim_{x\\to a} g(x) = 0\\).",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "From \\(|g| \\leq M\\) you automatically get \\(-M \\leq g \\leq M\\). One shrinking bound is enough, perfect for **bounded oscillation × factor → 0**.",
        },
      ],
      lead: "Bound the absolute value; if the bound goes to 0, so does \\(g\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_squeeze_zero_bound",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Zero-bound squeeze preview",
        caption: "|g| ≤ M(x) with M(x) → 0 forces g → 0.",
        formulaLabel: "g",
        plot: {
          plotType: "squeeze",
          mid: "x*x*sin(1/x)",
          lower: "-x*x",
          upper: "x*x",
          formula: "|g(x)|\\leq x^2",
          tag: "zero-bound corollary",
        },
        params: { zoom: 0.2 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.35 } },
          { t: 5, params: { zoom: 0.1 } },
          { t: 10, params: { zoom: 0.02 } },
        ],
      },
    },
    notes:
      "This is the workhorse inequality. Connect to x² cos(1/x) and x sin(1/x) coming next. Zoom slider = shrinking neighborhood near 0.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: WARM-UP + VISUAL LAB
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s04_warm_up_try_it_yourself",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: Try It Yourself (Pause)",
    question: "Find bounds for \\(g(x)=x^2\\cos(1/x)\\) and predict \\(\\displaystyle\\lim_{x\\to 0} g(x)\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "**Problem:** \\(\\displaystyle\\lim_{x \\to 0} x^2 \\cos\\left(\\frac{1}{x}\\right)\\). Cosine is always in \\([-1,1]\\). Multiply by \\(x^2 \\geq 0\\).",
        },
        {
          id: "left_hints",
          type: "nested_bullets",
          items: [
            { id: "h1", text: "What interval traps \\(\\cos(1/x)\\)?" },
            { id: "h2", text: "Multiply every part by \\(x^2\\)." },
            { id: "h3", text: "What are the limits of your bounds?" },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Write your bounding functions before continuing.",
          reveal: { text: "Try \\(f(x)=-x^2\\), \\(h(x)=x^2\\), both go to 0." },
        },
      ],
      lead: "Pause: bound the cosine, then squeeze.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_squeeze_warmup",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Warm-up oscillation",
        caption: "Before bounds: raw sin(1/x) near 0.",
        formulaLabel: "g",
        plot: {
          plotType: "squeeze",
          mid: "sin(1/x)",
          lower: "-1",
          upper: "1",
          formula: "g(x)=\\sin\\!\\left(\\frac{1}{x}\\right)",
        },
        params: { zoom: 0.3 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.4 } },
          { t: 6, params: { zoom: 0.08 } },
        ],
      },
    },
    notes:
      "Real YouTube pause. Students hunt bounds without seeing full solution. Widget sets mood, curves revealed on s05.\n\nStudent prompt: find f and h with the same limit as g.",
  },
  {
    id: "s05_solution_warm_up_example",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Solution: Warm-Up Example",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to 0}x^2\\cos\\!\\left(\\frac{1}{x}\\right)",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "-1\\leq\\cos\\!\\left(\\frac{1}{x}\\right)\\leq 1",
              gap: "tight",
              say: "Cosine stays between -1 and 1.",
            },
            {
              id: "step_2",
              math: "-x^2\\leq x^2\\cos\\!\\left(\\frac{1}{x}\\right)\\leq x^2",
              gap: "tight",
              say: "Multiply by nonnegative x squared.",
            },
            {
              id: "step_3",
              math: "\\lim_{x\\to 0}(-x^2)=0,\\ \\lim_{x\\to 0}x^2=0",
              gap: "tight",
              say: "Both bounds approach 0.",
            },
            {
              id: "step_4",
              math: "0",
              say: "Squeeze Theorem, limit is 0.",
            },
          ],
        },
      ],
      lead: "Template: bounded factor × term → 0.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_key",
          type: "paragraph",
          text: "**Key idea:** a factor that goes to 0 times a **bounded** oscillating factor always goes to 0.",
        },
      ],
      media: {
        id: "right_squeeze_warmup_sol",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Warm-up squeeze solution",
        caption: "Pair inequalities with the shrinking funnel plot.",
        formulaLabel: "g",
        plot: {
          plotType: "squeeze",
          mid: "x*sin(1/x)",
          lower: "-abs(x)",
          upper: "abs(x)",
          formula: "-|x|\\leq g(x)\\leq |x|",
        },
        params: { zoom: 0.12 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.3 } },
          { t: 5, params: { zoom: 0.06 } },
        ],
      },
    },
    notes:
      "Walk the four-step pipeline. Stress zero-bound corollary pattern. Classic first success before x sin(1/x) lab.",
  },
  {
    id: "s06_visual_lab_x_sin_1_x",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Oscillating Limits Near 0",
    question: "Switch tabs, when do shrinking bounds force the limit to 0?",
    lead: "Three squeeze setups. Left = short steps; right = sin(1/x) zoom lab (34/66 layout).",
    labSiteNote:
      "On YouTube we demo tab A. On the site, try all three tabs and drag **zoom near 0**.",
    labExamples: [
      {
        id: "lab_ex_xsin",
        label: "A · x sin(1/x)",
        formula: "g(x)=x\\sin\\!\\left(\\frac{1}{x}\\right)",
        steps: [
          { id: "step_1", text: "Bound: \\(-|x| \\leq g(x) \\leq |x|\\)." },
          { id: "step_2", text: "Zoom in, oscillations stay inside the funnel." },
          { id: "step_3", text: "Both bounds → 0, so g → 0 by squeeze." },
        ],
        params: {
          zoom: 0.3,
          plot: {
            plotType: "squeeze",
            mid: "x*sin(1/x)",
            lower: "-abs(x)",
            upper: "abs(x)",
            formula: "g(x)=x\\sin\\!\\left(\\frac{1}{x}\\right)",
            tag: "shrinking funnel → limit 0",
          },
        },
      },
      {
        id: "lab_ex_x2cos",
        label: "B · x² cos(1/x)",
        formula: "g(x)=x^2\\cos\\!\\left(\\frac{1}{x}\\right)",
        steps: [
          { id: "step_1", text: "cos(1/x) ∈ [−1, 1]; multiply by x² ≥ 0." },
          { id: "step_2", text: "Squeeze between −x² and x²." },
          { id: "step_3", text: "Tighter zoom, amplitude shrinks faster than |x|." },
        ],
        params: {
          zoom: 0.15,
          plot: {
            plotType: "squeeze",
            mid: "x*x*cos(1/x)",
            lower: "-x*x",
            upper: "x*x",
            formula: "g(x)=x^2\\cos\\!\\left(\\frac{1}{x}\\right)",
            tag: "tighter envelope than |x|",
          },
        },
      },
      {
        id: "lab_ex_sin_only",
        label: "C · sin(1/x) alone",
        formula: "f(x)=\\sin\\!\\left(\\frac{1}{x}\\right)",
        steps: [
          { id: "step_1", text: "No damping factor, outputs stay in [−1, 1]." },
          { id: "step_2", text: "Bounds do NOT shrink to 0, limit DNE." },
          { id: "step_3", text: "Contrast with A and B: need M(x) → 0." },
        ],
        params: {
          zoom: 0.05,
          plot: {
            plotType: "squeeze",
            mid: "sin(1/x)",
            lower: "-1",
            upper: "1",
            formula: "f(x)=\\sin\\!\\left(\\frac{1}{x}\\right)",
            tag: "fixed bounds, squeeze fails",
            yDomain: [-1.4, 1.4],
          },
        },
      },
    ],
    media: {
      id: "lab_squeeze_flex",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "Squeeze plot lab",
      caption: "Tabs swap mid/bound expressions: drag zoom near 0.",
      formulaLabel: "g",
      plot: {
        plotType: "squeeze",
        mid: "x*sin(1/x)",
        lower: "-abs(x)",
        upper: "abs(x)",
        formula: "g(x)=x\\sin\\!\\left(\\frac{1}{x}\\right)",
        useZoom: true,
      },
      params: { zoom: 0.3 },
      scriptedTimeline: [
        { t: 0, params: { zoom: 0.4 } },
        { t: 6, params: { zoom: 0.1 } },
        { t: 12, params: { zoom: 0.02 } },
      ],
    },
    notes:
      "Full-width visual_lab. Tab A is the headline example. Tab C callbacks Topic 3 sin(1/x) DNE, squeeze needs shrinking envelopes.\n\nStudent prompt: drag zoom and describe the funnel.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: STANDARD EXAMPLE + MISCONCEPTION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s07_standard_example_x_sin_1_x",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Standard Example: x sin(1/x)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to 0}x\\sin\\!\\left(\\frac{1}{x}\\right)",
          steps: [
            {
              id: "step_1",
              math: "\\lim_{x\\to 0}\\sin\\!\\left(\\frac{1}{x}\\right)\\ \\text{DNE}",
              say: "Product law fails, sine factor has no limit.",
            },
            {
              id: "step_2",
              op: "=>",
              math: "-1\\leq\\sin\\!\\left(\\frac{1}{x}\\right)\\leq 1",
              gap: "tight",
              say: "Sine is bounded.",
            },
            {
              id: "step_3",
              math: "-|x|\\leq x\\sin\\!\\left(\\frac{1}{x}\\right)\\leq |x|",
              gap: "tight",
              say: "Multiply by x and use |x sin| ≤ |x|.",
            },
            {
              id: "step_4",
              math: "\\lim_{x\\to 0}(-|x|)=0,\\ \\lim_{x\\to 0}|x|=0",
              gap: "tight",
              say: "Outer limits agree at 0.",
            },
            {
              id: "step_5",
              math: "0",
              say: "Squeeze, answer 0.",
            },
          ],
        },
      ],
      lead: "Quintessential squeeze, product law blocked, bounds save the day.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_squeeze_xsin",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Funnel ±|x| traps the oscillation",
        caption: "Tight zoom: amplitude shrinks toward 0.",
        formulaLabel: "g",
        plot: {
          plotType: "squeeze",
          mid: "x*sin(1/x)",
          lower: "-abs(x)",
          upper: "abs(x)",
          formula: "g(x)=x\\sin\\!\\left(\\frac{1}{x}\\right)",
        },
        params: { zoom: 0.18 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.35 } },
          { t: 5, params: { zoom: 0.08 } },
        ],
      },
    },
    notes:
      "Name DNE of sin(1/x) up front. This is the template students should memorize. Tie back to lab tab A.",
  },
  {
    id: "s08_misconception_naive_product_law",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Misconception: Naive Product Law",
    question: "Why is \\(\\lim_{x\\to 0} x\\sin(1/x) \\neq (\\lim x)(\\lim \\sin(1/x))\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Splitting a limit illegally",
          pairs: [
            {
              label: "❌ Naive product law",
              text: "Write \\(\\lim x \\cdot \\lim \\sin(1/x)\\) and say \"0 × bounded = 0\" without checking limits exist.",
            },
            {
              label: "✅ Squeeze approach",
              text: "Bound \\(|x\\sin(1/x)| \\leq |x|\\), send bounds to 0, then apply the Squeeze Theorem.",
            },
          ],
        },
        {
          id: "left_rule",
          type: "paragraph",
          text: "**Rule:** product/quotient laws need **finite limits for each factor**. Oscillation without a limit means: build inequalities instead.",
        },
      ],
      lead: "Getting the right answer for the wrong reason is still wrong.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_squeeze_miscon",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "sin(1/x) alone: no single limit",
        caption: "Product law fails: middle curve never settles.",
        formulaLabel: "g",
        plot: {
          plotType: "squeeze",
          mid: "sin(1/x)",
          lower: "-1",
          upper: "1",
          formula: "\\sin(1/x)\\cdot x\\ \\text{DNE}",
          tag: "cannot split limits",
        },
        params: { zoom: 0.06 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.25 } },
          { t: 6, params: { zoom: 0.04 } },
        ],
      },
    },
    notes:
      "Contrast illegal split vs squeeze. Widget shows why sin(1/x) blocks the product law. Callback Topic 4 laws.\n\nStudent prompt on slide question.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: sin(x)/x CLASSIC
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s09_tricky_the_classic_sin_x_x",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Tricky: The Classic sin(x)/x (Pause)",
    question: "Use unit-circle areas to trap \\(\\sin x / x\\) near 0.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_problem",
          type: "paragraph",
          text: "**Problem:** \\(\\displaystyle\\lim_{x\\to 0}\\frac{\\sin x}{x}\\). Direct substitution gives \\(\\frac{0}{0}\\), need geometry.",
        },
        {
          id: "left_hints",
          type: "nested_bullets",
          items: [
            { id: "h1", text: "For small \\(x>0\\), compare areas: triangle, sector, larger triangle." },
            { id: "h2", text: "Convert area inequalities into bounds on \\(\\sin x / x\\)." },
            { id: "h3", text: "Both bounds should approach the same number." },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and sketch",
          prompt: "Draw the unit-circle picture before the proof.",
          reveal: { text: "Target: \\(\\cos x \\leq \\frac{\\sin x}{x} \\leq \\frac{1}{\\cos x}\\), both outer limits → 1." },
        },
      ],
      lead: "Pause: geometry first, algebra second.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_sinc_pause",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "sin(x)/x preview",
        caption: "Different function: geometric bounds from the unit circle.",
        formulaLabel: "g",
        plot: {
          plotType: "squeeze",
          mid: "sin(x)/x",
          lower: "cos(x)",
          upper: "1/cos(x)",
          formula: "\\frac{\\sin x}{x}",
          tag: "classic squeeze target",
          yDomain: [-0.5, 1.6],
        },
        params: { zoom: 0.35 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.5 } },
          { t: 6, params: { zoom: 0.1 } },
        ],
      },
    },
    notes:
      "Famous limit, worth a real pause. Reveal only the target inequality, not full proof. Widget keeps eyes on approach-to-0 theme.\n\nStudent prompt: find f and h bounding sin(x)/x.",
  },
  {
    id: "s10_solution_sin_x_x_squeeze",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Solution: sin(x)/x Squeeze",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to 0}\\frac{\\sin x}{x}",
          steps: [
            {
              id: "step_1",
              math: "\\frac{1}{2}\\cos x\\sin x\\leq\\frac{1}{2}x\\leq\\frac{1}{2}\\tan x",
              gap: "tight",
              say: "Unit-circle area comparison for 0 < x < π/2.",
            },
            {
              id: "step_2",
              math: "\\cos x\\leq\\frac{x}{\\sin x}\\leq\\frac{1}{\\cos x}",
              gap: "tight",
              say: "Multiply by 2, divide by positive sin x.",
            },
            {
              id: "step_3",
              math: "\\cos x\\leq\\frac{\\sin x}{x}\\leq\\frac{1}{\\cos x}",
              gap: "tight",
              say: "Take reciprocals, inequalities reverse for positive quantities.",
            },
            {
              id: "step_4",
              math: "\\lim_{x\\to 0}\\cos x=1,\\ \\lim_{x\\to 0}\\frac{1}{\\cos x}=1",
              gap: "tight",
              say: "Both outer limits equal 1.",
            },
            {
              id: "step_5",
              math: "1",
              say: "Squeeze Theorem, classic result.",
            },
          ],
        },
      ],
      lead: "Geometry builds the sandwich; limits finish the proof.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_sinc_solution",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "sin(x)/x stabilizes to 1",
        caption: "Outer bounds cos x and sec x both → 1.",
        formulaLabel: "g",
        plot: {
          plotType: "squeeze",
          mid: "sin(x)/x",
          lower: "cos(x)",
          upper: "1/cos(x)",
          formula: "\\lim_{x\\to 0}\\frac{\\sin x}{x}=1",
          yDomain: [-0.5, 1.6],
        },
        params: { zoom: 0.08 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.3 } },
          { t: 5, params: { zoom: 0.05 } },
          { t: 10, params: { zoom: 0.015 } },
        ],
      },
    },
    notes:
      "Walk area chain carefully, reciprocals trip students. Emphasize this limit feeds derivatives later. Tight zoom on widget during final step.",
  },
  {
    id: "s11_visual_lab_sin_x_x_squeeze",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: sin(x)/x Squeeze Check",
    question: "Zoom in, how tight is the band between the bounds?",
    lead: "Three zoom levels for the classic limit. Steps on the left; widget on the right.",
    labSiteNote:
      "Video demos tab B. On the site, compare all tabs and drag **zoom near 0**.",
    labExamples: [
      {
        id: "lab_sinc_wide",
        label: "A · Wide window",
        formula: "\\cos x\\leq\\frac{\\sin x}{x}\\leq\\frac{1}{\\cos x}",
        steps: [
          { id: "step_1", text: "State the geometric bounds from the unit circle." },
          { id: "step_2", text: "Wide zoom, curve still trapped between outer limits." },
          { id: "step_3", text: "Outer functions both approach 1." },
        ],
        params: {
          zoom: 0.5,
          plot: {
            plotType: "squeeze",
            mid: "sin(x)/x",
            lower: "cos(x)",
            upper: "1/cos(x)",
            formula: "\\cos x\\leq\\frac{\\sin x}{x}\\leq\\sec x",
            yDomain: [-0.5, 1.6],
          },
        },
      },
      {
        id: "lab_sinc_mid",
        label: "B · Mid zoom",
        formula: "\\lim_{x\\to 0}\\frac{\\sin x}{x}=1",
        steps: [
          { id: "step_1", text: "Shrink the x-window toward 0." },
          { id: "step_2", text: "Three curves pinch at height 1." },
          { id: "step_3", text: "This is the limit you'll use all semester." },
        ],
        params: {
          zoom: 0.12,
          plot: {
            plotType: "squeeze",
            mid: "sin(x)/x",
            lower: "cos(x)",
            upper: "1/cos(x)",
            formula: "\\lim_{x\\to 0}\\frac{\\sin x}{x}=1",
            yDomain: [-0.5, 1.6],
          },
        },
      },
      {
        id: "lab_sinc_tight",
        label: "C · Tight zoom",
        formula: "\\left|\\frac{\\sin x}{x}-1\\right|\\leq 1-\\cos x",
        steps: [
          { id: "step_1", text: "Tightest zoom, error controlled by 1 − cos x → 0." },
          { id: "step_2", text: "Connect back to zero-bound thinking." },
          { id: "step_3", text: "Memorize: sin x / x → 1." },
        ],
        params: {
          zoom: 0.025,
          plot: {
            plotType: "squeeze",
            mid: "sin(x)/x",
            lower: "cos(x)",
            upper: "2-cos(x)",
            formula: "|\\frac{\\sin x}{x}-1|\\leq 1-\\cos x",
            yDomain: [0.85, 1.2],
          },
        },
      },
    ],
    media: {
      id: "lab_sinc_flex",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "sin(x)/x squeeze lab",
      caption: "Tabs change zoom: watch three curves meet at 1.",
      formulaLabel: "g",
      plot: {
        plotType: "squeeze",
        mid: "sin(x)/x",
        lower: "cos(x)",
        upper: "1/cos(x)",
        formula: "\\frac{\\sin x}{x}",
        useZoom: true,
        yDomain: [-0.5, 1.6],
      },
      params: { zoom: 0.12 },
      scriptedTimeline: [
        { t: 0, params: { zoom: 0.4 } },
        { t: 6, params: { zoom: 0.1 } },
        { t: 12, params: { zoom: 0.02 } },
      ],
    },
    notes:
      "Interactive confirmation of s10. Narrate bounds while zooming. sin(x)/x is the limit that unlocks derivative of sine.\n\nStudent prompt: observe three curves meeting at height 1.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 5: EDGE CASES + PROOF + SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s12_edge_case_limit_at_infinity",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Edge Case: Limit at Infinity",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to\\infty}\\frac{\\sin x}{x}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "-1\\leq\\sin x\\leq 1",
              gap: "tight",
              say: "Sine stays bounded for all x.",
            },
            {
              id: "step_2",
              math: "-\\frac{1}{x}\\leq\\frac{\\sin x}{x}\\leq\\frac{1}{x}",
              gap: "tight",
              say: "Divide by positive x (large x).",
            },
            {
              id: "step_3",
              math: "\\lim_{x\\to\\infty}\\left(-\\frac{1}{x}\\right)=0,\\ \\lim_{x\\to\\infty}\\frac{1}{x}=0",
              gap: "tight",
              say: "Bounds decay to 0.",
            },
            {
              id: "step_4",
              math: "0",
              say: "Squeeze, oscillation damped by growing denominator.",
            },
          ],
        },
      ],
      lead: "Same theorem at infinity, shrinking envelope still wins.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_note",
          type: "paragraph",
          text: "**Link Topic 5:** limits at infinity. Numerator bounded, denominator grows, amplitude \\(\\to 0\\).",
        },
      ],
      media: null,
    },
    notes:
      "Quick edge case after finite squeeze examples. Callback infinity work from Topic 5. No widget needed, inequality is the star.",
  },
  {
    id: "s13_challenge_optional_multivariable_preview",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Multivariable Preview",
    question: "",
    lead: "Optional stretch, same squeeze idea in two variables.",
    blocks: [
      {
        id: "body_solution",
        type: "math_solution_steps",
        problem: "\\lim_{(x,y)\\to(0,0)}\\frac{x^2 y}{x^2+y^2}",
        steps: [
          {
            id: "step_1",
            math: "0\\leq\\frac{x^2}{x^2+y^2}\\leq 1",
            gap: "tight",
            say: "Fraction is always between 0 and 1.",
          },
          {
            id: "step_2",
            math: "\\left|\\frac{x^2 y}{x^2+y^2}\\right|\\leq |y|",
            gap: "tight",
            say: "Multiply by |y|, zero-bound form.",
          },
          {
            id: "step_3",
            math: "\\lim_{(x,y)\\to(0,0)}|y|=0",
            gap: "tight",
            say: "Bound goes to 0 along every approach path.",
          },
          {
            id: "step_4",
            math: "0",
            say: "Squeeze, multivariable limit is 0.",
          },
        ],
      },
    ],
    media: null,
    notes:
      "Skip if time-limited. Shows theorem scales up, bound by a simpler function of one variable going to 0.",
  },
  {
    id: "s14_challenge_optional_visual_lab_multivariable_squeeze",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Multivariable Squeeze Picture",
    question: "How is the surface pinched near the origin?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph",
          type: "paragraph",
          text: "Surface \\(z=\\frac{x^2 y}{x^2+y^2}\\) lies between planes \\(z=-|y|\\) and \\(z=|y|\\). Near \\((0,0)\\) both planes meet at 0, the surface is forced to 0.",
        },
        {
          id: "left_bullets",
          type: "nested_bullets",
          items: [
            { id: "b1", text: "Bound with \\(|y|\\), only one variable in the envelope." },
            { id: "b2", text: "Same logic as \\(|g|\\leq M\\) with \\(M\\to 0\\)." },
            { id: "b3", text: "Optional, skip on a tight recording schedule." },
          ],
        },
      ],
      lead: "2D slice preview, optional challenge visual.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_approach_parabola_mv",
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
        title: "Approach along a smooth path",
        caption: "Stand-in 2D view: imagine planes ±|y| squeezing the surface.",
        formulaLabel: "f",
        params: { x: 0.6 },
        scriptedTimeline: [
          { t: 0, params: { x: 1.2 } },
          { t: 5, params: { x: 1.85 } },
        ],
      },
    },
    notes:
      "Optional 3D idea in 2D widget. Voice describes planes; widget shows approach-to-target behavior. Skippable.",
  },
  {
    id: "s15_proof_sketch_epsilon_delta",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Proof Sketch (Epsilon-Delta)",
    question: "",
    lead: "Three-line proof, squeeze is definition of limit in disguise.",
    blocks: [
      {
        id: "body_steps",
        type: "proof_sketch",
        title: "From outer limits to g",
        text: "Assume \\(f \\leq g \\leq h\\) near \\(a\\) and \\(\\lim f = \\lim h = L\\).",
        steps: [
          {
            id: "body_step_1",
            text: "Given \\(\\varepsilon>0\\): \\(\\exists\\,\\delta_1\\) with \\(|f(x)-L|<\\varepsilon\\) when \\(0<|x-a|<\\delta_1\\); \\(\\exists\\,\\delta_2\\) for \\(h\\) likewise.",
          },
          {
            id: "body_step_2",
            text: "Let \\(\\delta=\\min(\\delta_1,\\delta_2)\\). For \\(0<|x-a|<\\delta\\): \\(L-\\varepsilon<f(x)\\) and \\(h(x)<L+\\epsilon\\).",
          },
          {
            id: "body_step_3",
            text: "Sandwich: \\(L-\\varepsilon<f(x)\\leq g(x)\\leq h(x)<L+\\varepsilon\\), so \\(|g(x)-L|<\\varepsilon\\). QED.",
          },
        ],
      },
    ],
    media: null,
    notes:
      "Tight proof only, no quantifier lecture. Tie back to Topic 3 epsilon bands. Optional speed-read for advanced students.",
  },
  {
    id: "s16_summary_key_takeaways",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Summary & Key Takeaways",
    question: "",
    lead: "When limit laws fail, trap the function and squeeze:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Squeeze Theorem:** \\(f \\leq g \\leq h\\) near \\(a\\) and matching outer limits \\(\\Rightarrow\\) \\(\\lim g\\) equals that common value." },
          { id: "bullet_2", text: "**Zero-bound shortcut:** \\(|g| \\leq M\\) with \\(M \\to 0\\) forces \\(g \\to 0\\), ideal for bounded × vanishing factors." },
          { id: "bullet_3", text: "**Do not split** products when a factor has no limit, build inequalities instead." },
          { id: "bullet_4", text: "**Templates:** \\(x^2\\cos(1/x)\\to 0\\), \\(x\\sin(1/x)\\to 0\\), \\(\\sin x/x\\to 1\\), \\(\\sin x/x\\to 0\\) at infinity." },
          { id: "bullet_5", text: "**Next topic (7):** Continuity and the Intermediate Value Theorem, when limits equal function values and why that matters on intervals." },
        ],
      },
      {
        id: "final_pause",
        type: "pause_and_reveal",
        title: "Pause: preview Topic 7",
        prompt: "Quick check: If \\(f(3)=7\\) and \\(f\\) is continuous at 3, what is \\(\\lim_{x\\to 3} f(x)\\)?",
        reveal: { text: "**7**, continuity means the limit equals the value; Topic 7 makes this precise." },
      },
    ],
    media: null,
    notes:
      "Recap one beat per bullet. Final pause tees up continuity. Thank students for Session 2 Topic 6; Topic 7 closes the limits chapter.",
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
 *   - Replaced limit_epsilon / function_transform / python visual plans with
 *     flex_plot squeeze specs (unique mid/bounds per slide); legacy sin_reciprocal removed.
 *   - s06, s11 → visual_lab 34/66 layout with labExamples (3 tabs each).
 *   - Removed source, sourceSpec, sourceCode, python_code from all media.
 *
 * RICH BLOCKS
 *   - theorem_box on statement + corollary; misconception_compare on s08.
 *   - math_solution_steps on warm-up, standard examples, sin(x)/x, infinity, MV.
 *   - proof_sketch tightened on s15; nested_bullets + pause tease Topic 7 on s16.
 *   - pause_and_reveal on s04, s09, s16.
 *
 * PEDAGOGY
 *   - Welcome-back after Topic 5; roadmap currentId path_topic_06.
 *   - Topic 7 continuity handoff; optional MV challenge skippable.
 *
 * ESTIMATED DURATION: ~20–23 min
 */