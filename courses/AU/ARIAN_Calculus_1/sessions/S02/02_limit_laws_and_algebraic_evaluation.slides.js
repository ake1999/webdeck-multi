// Generated from courses/Calculus/Materials/limit_laws_and_algebraic_evaluation.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "02_limit_laws_and_algebraic_evaluation",
  title: "Limit Laws and Algebraic Evaluation",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/limit_laws_and_algebraic_evaluation.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "Limit Laws and Algebraic Evaluation",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: Limit laws, 0/0 algebra, direct substitution • Session 2 • ~25 min • first-year university / advanced high school",
    notes:
      "Welcome back, Topic 3 built limit intuition; Topic 4 is the computation toolkit. Assumes comfort with limits and basic algebra. Do not re-introduce Arian from scratch.",
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
        currentId: "path_topic_04",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", status: "completed" },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", status: "completed" },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", note: "Today", status: "current", expanded: true },
          { id: "path_topic_05", number: 5, session: "S02 Limits and Continuity", label: "One-Sided Limits and Limits at Infinity", note: "Next", status: "next", expanded: true },
          { id: "path_topic_06", number: 6, session: "S02 Limits and Continuity", label: "The Squeeze Theorem", status: "upcoming" },
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
      { id: "objective_1", text: "Apply sum, product, quotient, and power laws when individual limits exist." },
      { id: "objective_2", text: "Recognize \\(\\frac{0}{0}\\) and resolve it by factoring or rationalizing." },
      { id: "objective_3", text: "Check quotient-law conditions (denominator limit \\(\\neq 0\\)) before dividing." },
      { id: "objective_4", text: "Finish with direct substitution once the expression is safe to plug in." },
    ],
    notes:
      "Roadmap first: Topic 3 done, this is Topic 4, Topic 5 (one-sided + infinity) is next. Four objectives map to laws → algebra → examples → continuity bridge.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: LAWS + INTUITION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_why_limit_laws_are_like_building_blocks",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Why Limit Laws Are Like Building Blocks",
    question: "If you know two brick sizes, do you need to remeasure the whole wall?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Limit laws are **LEGO bricks**: know each simple limit, know how to combine them (+, −, ×, ÷), and you can evaluate complicated limits **without re-deriving from scratch**.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "Topic 3 asked *what* a limit means. Topic 4 asks *how to compute* one efficiently, limits respect arithmetic when the pieces behave.",
        },
      ],
      lead: "Break a hard limit into easy parts, then recombine.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_limit_laws_sum_demo",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "y_equals",
          formula: "\\lim(f+g)=\\lim f+\\lim g",
          xDomain: [-1, 4.5],
          yDomain: [-1, 14],
          verticalParam: "a",
          verticalDefault: 2,
          verticalMin: -1,
          verticalMax: 4,
          verticalStep: 0.05,
          probe: false,
          curves: [
            { id: "f", expr: "x*x", stroke: "#2563eb", strokeWidth: 3 },
            { id: "g", expr: "2*x+1", stroke: "#c65a28", strokeWidth: 3 },
            { id: "sum", expr: "x*x+2*x+1", stroke: "#16a34a", strokeWidth: 4 },
          ],
          verticalMarkers: ["f", "g", "sum"],
        },
        title: "f(x)=x², g(x)=2x+1: sum law in action",
        caption: "Drag a: each part limit adds to the green sum.",
        formulaLabel: "f+g",
        params: { a: 2 },
        scriptedTimeline: [
          { t: 0, params: { a: 0 } },
          { t: 5, params: { a: 2 } },
          { t: 10, params: { a: 3 } },
        ],
      },
    },
    notes:
      "Chef/recipe metaphor in voice, LEGO on screen. Welcome back, intuition is done, now the toolkit. Animate a to 2: f→4, g→5, sum→9. Limits distribute over addition.",
  },
  {
    id: "s02_the_eleven_limit_laws_at_a_glance",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Eleven Limit Laws at a Glance",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_table",
          type: "math_table",
          headers: ["Law", "Rule"],
          rows: [
            ["Sum", "\\(\\lim(f+g)=\\lim f+\\lim g\\)"],
            ["Difference", "\\(\\lim(f-g)=\\lim f-\\lim g\\)"],
            ["Constant multiple", "\\(\\lim(cf)=c\\lim f\\)"],
            ["Product", "\\(\\lim(fg)=(\\lim f)(\\lim g)\\)"],
            ["Quotient", "\\(\\lim(f/g)=(\\lim f)/(\\lim g)\\) if \\(\\lim g\\neq 0\\)"],
            ["Power", "\\(\\lim(f^n)=(\\lim f)^n\\)"],
            ["Constants", "\\(\\lim c=c,\\;\\lim x=a,\\;\\lim x^n=a^n\\)"],
            ["Roots", "\\(\\lim\\sqrt[n]{f}=\\sqrt[n]{\\lim f}\\) (when defined)"],
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Focus today: **sum, product, quotient**, then **power** on polynomials. Laws 7–11 are shortcuts you already use.",
        },
      ],
      lead: "Eleven laws, six combinators plus constants, identity, powers, roots.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_limit_laws_sum_demo",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "y_equals",
          formula: "\\lim(f+g)=\\lim f+\\lim g",
          xDomain: [-1, 4.5],
          yDomain: [-1, 14],
          verticalParam: "a",
          verticalDefault: 2,
          verticalMin: -1,
          verticalMax: 4,
          verticalStep: 0.05,
          probe: false,
          curves: [
            { id: "f", expr: "x*x", stroke: "#2563eb", strokeWidth: 3 },
            { id: "g", expr: "2*x+1", stroke: "#c65a28", strokeWidth: 3 },
            { id: "sum", expr: "x*x+2*x+1", stroke: "#16a34a", strokeWidth: 4 },
          ],
          verticalMarkers: ["f", "g", "sum"],
        },
        title: "Sum law visual check",
        caption: "Green trace = f+g; limit of sum = sum of limits.",
        formulaLabel: "f+g",
        params: { a: 2 },
        scriptedTimeline: [
          { t: 0, params: { a: 1.5 } },
          { t: 6, params: { a: 2 } },
        ],
      },
    },
    notes:
      "Do not read all eleven verbatim, table is reference. Emphasize quotient condition: denominator limit must not be 0. Widget at a=2: 4+5=9.",
  },
  {
    id: "s03_proof_intuition_the_sum_law",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Proof Intuition: The Sum Law",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_proof",
          type: "proof_sketch",
          title: "Why addition works",
          text: "If \\(f(x)\\to L\\) and \\(g(x)\\to M\\), then \\((f+g)(x)\\to L+M\\).",
          steps: [
            { id: "step_1", text: "Target: make \\(|(f+g)(x)-(L+M)|<\\varepsilon\\)." },
            { id: "step_2", text: "Triangle inequality: error in sum ≤ error in \\(f\\) + error in \\(g\\)." },
            { id: "step_3", text: "Force each part within \\(\\varepsilon/2\\), total within \\(\\varepsilon\\)." },
          ],
        },
      ],
      lead: "Control each part separately; the sum stays inside the combined band.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_derivation",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "f(x)=x^2,\\ g(x)=2x+1,\\ a=2",
          steps: [
            { id: "d1", math: "L=4,\\ M=5", gap: "tight", say: "Limit values at a equals 2." },
            { id: "d2", math: "|f(x)-4|<0.3,\\ |g(x)-5|<0.2", gap: "tight", say: "Error bands on each part." },
            { id: "d3", math: "|(f+g)(x)-9|<0.5", say: "Combined error within 0.5." },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Light proof, connect to Topic 3 epsilon idea. No heavy quantifiers. Triangle inequality is the one line to remember.",
  },
  {
    id: "s04_interactive_explore_the_product_and_quotient_laws",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Product and Quotient Laws",
    question: "Drag a toward 1, do fg and f/g match the product and quotient of the limits?",
    lead: "f(x)=x², g(x)=x+1. Green = product, purple = quotient. Watch g→0 break the quotient.",
    blocks: [
      {
        id: "lab_prompt",
        type: "paragraph",
        text: "**Explore:** At \\(a=1\\), \\(\\lim f=1\\), \\(\\lim g=2\\), so \\(\\lim fg=2\\) and \\(\\lim(f/g)=\\frac{1}{2}\\). Move \\(a\\) so \\(g\\to 0\\), quotient law **stops applying**.",
      },
    ],
    media: {
      id: "lab_product_quotient",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "limit_product_quotient",
      title: "Product & quotient laws",
      caption: "Probe a: purple quotient blows up when g(a) nears 0.",
      formulaLabel: "fg",
      params: { a: 0.5 },
      scriptedTimeline: [
        { t: 0, params: { a: 0.5 } },
        { t: 5, params: { a: 1 } },
        { t: 10, params: { a: -1 } },
      ],
    },
    notes:
      "Full-width lab. Product law always when both limits exist. Quotient needs nonzero denominator limit, drag a to −1 to show warning tag. Student prompt: what happens when g(a)=0?\n\nPause beat optional on quotient breakdown.",
  },
  {
    id: "s05_quick_check_sum_law_in_action",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Sum Law in Action",
    question: "Given \\(\\lim_{x\\to 3} f(x)=7\\) and \\(\\lim_{x\\to 3} g(x)=2\\), find \\(\\lim_{x\\to 3}[f(x)+g(x)]\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "No formulas for \\(f\\) or \\(g\\) needed, only their **limit values** at \\(x=3\\).",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and compute",
          prompt: "Write your answer before continuing.",
          reveal: { text: "\\(\\lim(f+g)=7+2=\\mathbf{9}\\), pure sum law." },
        },
      ],
      lead: "When both limits exist, add them.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_number_line",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "\\lim_{x\\to 3}f(x)=7,\\ \\lim_{x\\to 3}g(x)=2",
          steps: [
            { id: "n1", math: "L=7,\\ M=2", gap: "tight", say: "Separate limit values." },
            { id: "n2", math: "L+M=9", say: "Sum law gives combined limit 9." },
          ],
        },
      ],
      media: null,
    },
    notes:
      "YouTube pause. Ten-second think. Reveal 9. Stress: laws work on **limit values**, not necessarily f(a).",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: DIRECT SUBSTITUTION + QUOTIENT
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s06_example_1_warm_up_direct_substitution",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: Direct Substitution",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to 5}(2x^2-3x+4)",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "2\\lim_{x\\to 5} x^2 - 3\\lim_{x\\to 5} x + 4",
              gap: "tight",
              say: "Split with sum and difference laws, then pull constants.",
            },
            {
              id: "step_2",
              math: "2(25)-3(5)+4",
              gap: "tight",
              say: "Substitute x approaches 5.",
            },
            {
              id: "step_3",
              math: "39",
              say: "Answer: 39.",
            },
          ],
        },
      ],
      lead: "Polynomials love limit laws, split, then plug in.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_laws",
          type: "nested_bullets",
          items: [
            { id: "l1", text: "Sum / difference laws" },
            { id: "l2", text: "Constant multiple law" },
            { id: "l3", text: "Then direct substitution" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Template for 'easy' limits. Name each law as you use it. This is the happy path, no 0/0 yet.",
  },
  {
    id: "s07_example_2_standard_quotient_with_non_zero_denominator",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Quotient Law: Check the Denominator First",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "\\lim_{x\\to 2}\\frac{x^3+2x^2-1}{5-3x}",
          steps: [
            {
              id: "step_1",
              math: "\\lim_{x\\to 2}(5-3x)=-1\\neq 0",
              say: "Check the denominator limit first, it must be nonzero.",
            },
            {
              id: "step_2",
              math: "\\lim_{x\\to 2}(x^3+2x^2-1)=15",
              say: "Evaluate the numerator at 2.",
            },
            {
              id: "step_3",
              math: "\\frac{15}{-1}=-15",
              say: "Apply the quotient law.",
            },
          ],
        },
      ],
      lead: "Quotient law only if the bottom limit is nonzero.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_habit",
          type: "paragraph",
          text: "**Habit:** denominator first. If it were \\(0\\), switch to factoring, one-sided limits, or DNE.",
        },
      ],
      media: null,
    },
    notes:
      "Habit: **denominator first**. If it were 0, we'd need different tools (factor, one-sided, or DNE). Answer −15.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: 0/0 ALGEBRA
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s08_misconception_cancelling_factors_too_early",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Misconception: Cancelling Without the Hole",
    question: "Why can't we just plug \\(x=2\\) into \\((x^2-4)/(x-2)\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Cancel carefully",
          pairs: [
            {
              label: "❌ Sloppy move",
              text: "Cancel \\(x-2\\) silently → treat \\(x+2\\) as the **same function** everywhere.",
            },
            {
              label: "✅ Correct move",
              text: "Note domain \\(x\\neq 2\\), cancel **for \\(x\\neq 2\\)**, then take the limit of the simplified form.",
            },
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Limit can be 4 while \\(f(2)\\) is undefined, Topic 3 again. Algebra fixes the **approach**, not the hole.",
        },
      ],
      lead: "Cancellation is valid on the punctured domain; the hole remains in the original graph.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_rational_hole_simplified",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "rational_hole",
          holeAt: 2,
          simplifiedExpr: "x+2",
          formula: "f(x)=\\frac{x^2-4}{x-2}\\to x+2",
          xDomain: [0, 3.8],
          yDomain: [0, 6.5],
          probeMin: 0,
          probeMax: 3.8,
          probeDefault: 0.5,
          tags: [{ text: "hole at (2, 4), limit = 4", anchor: "end", tone: "muted" }],
        },
        title: "Hole at (2,4) vs dashed y=x+2",
        caption: "Orange = original; gray dashed = simplified line.",
        formulaLabel: "f",
        params: { x: 1, a: 2, showSimplified: true },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5, showSimplified: false } },
          { t: 5, params: { x: 1.8, showSimplified: true } },
        ],
      },
    },
    notes:
      "Callback Topic 3 hole example. Toggle dashed simplified line. Wrong: plug x=2 into original. Right: factor, cancel, limit of x+2 is 4.",
  },
  {
    id: "s09_example_3_standard_factoring_to_resolve_0_0",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Factoring to Resolve 0/0",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to 2}\\frac{x^2-4}{x-2}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\frac{0}{0}",
              gap: "tight",
              say: "Direct substitution gives indeterminate form, we need algebra.",
            },
            {
              id: "step_2",
              math: "\\frac{(x-2)(x+2)}{x-2}",
              gap: "tight",
              say: "Factor the numerator as a difference of squares.",
            },
            {
              id: "step_3",
              math: "\\frac{\\cancel{(x-2)}(x+2)}{\\cancel{(x-2)}}",
              gap: "tight",
              say: "Cancel the common factor for x not equal to 2.",
            },
            {
              id: "step_4",
              math: "4",
              say: "Substitute into the simplified form, answer is 4.",
            },
          ],
        },
      ],
      lead: "0/0 is a signal to factor, cancel, then substitute.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_rational_hole_worked",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "rational_hole",
          holeAt: 2,
          simplifiedExpr: "x+2",
          formula: "f(x)=\\frac{x^2-4}{x-2}\\to x+2",
          xDomain: [0, 3.8],
          yDomain: [0, 6.5],
          probeMin: 0,
          probeMax: 3.8,
          probeDefault: 0.5,
          tags: [{ text: "hole at (2, 4), limit = 4", anchor: "end", tone: "muted" }],
        },
        title: "Graph confirms limit 4",
        formulaLabel: "f",
        params: { x: 1.5, a: 2 },
        scriptedTimeline: [
          { t: 0, params: { x: 1 } },
          { t: 5, params: { x: 1.95 } },
          { t: 10, params: { x: 2.05 } },
        ],
      },
    },
    notes:
      "Worked version of misconception slide. Difference of squares pattern, students will see it constantly.",
  },
  {
    id: "s10_pause_try_factoring_yourself",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Try Factoring Yourself",
    question: "\\(\\displaystyle\\lim_{x\\to 3}\\frac{x^2-9}{x-3}\\), A) 0  B) 3  C) 6  D) DNE",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Same pattern, new numbers: \\(x^2-9=(x-3)(x+3)\\). Pause and pick A–D.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Factor, cancel, substitute, then choose.",
          reveal: { text: "**C) 6**, simplifies to \\(x+3\\), limit at 3 is 6." },
        },
      ],
      lead: "0/0 → factor → cancel → plug in.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_rational_hole_3",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "rational_hole",
          holeAt: 3,
          simplifiedExpr: "x+3",
          formula: "f(x)=\\frac{x^2-9}{x-3}\\to x+3",
          xDomain: [1.5, 4.8],
          yDomain: [0, 8],
          probeMin: 0,
          probeMax: 3.8,
          probeDefault: 0.5,
          tags: [{ text: "hole at (3, 6), limit = 6", anchor: "end", tone: "muted" }],
        },
        title: "Hole at (3, 6)",
        formulaLabel: "f",
        params: { x: 2.2, a: 3 },
        scriptedTimeline: [
          { t: 0, params: { x: 2.2 } },
          { t: 6, params: { x: 2.95 } },
        ],
      },
    },
    notes:
      "YouTube pause MC. Reveal C) 6. Widget hole at (3,6). Quick confidence check before rationalizing.",
  },
  {
    id: "s11_example_4_tricky_rationalizing",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Rationalizing a 0/0 with a Root",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          splitAfter: 3,
          problem: "\\lim_{x\\to 4}\\frac{\\sqrt{x}-2}{x-4}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\frac{0}{0}",
              gap: "tight",
              say: "Direct substitution gives indeterminate form.",
            },
            {
              id: "step_2",
              math: "\\frac{x-4}{(x-4)(\\sqrt{x}+2)}",
              gap: "tight",
              say: "Multiply by the conjugate over itself.",
            },
            {
              id: "step_3",
              math: "\\frac{\\cancel{(x-4)}}{(\\cancel{(x-4)})(\\sqrt{x}+2)}",
              gap: "tight",
              say: "Cancel x minus 4 for x not equal to 4.",
            },
            {
              id: "step_4",
              parts: [
                { math: "\\frac{1}{\\sqrt{x}+2}" },
                { math: "\\frac{1}{4}", op: "=" },
              ],
              say: "Simplify, then substitute x approaches 4, answer is one fourth.",
            },
          ],
        },
      ],
      lead: "When factoring fails, multiply by the **conjugate**.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_conjugate",
          type: "formula_block",
          formula: "(\\sqrt{x}-2)(\\sqrt{x}+2)=x-4",
        },
      ],
      media: null,
    },
    notes:
      "Second main weapon after factoring. Conjugate uses \\((\\sqrt{x}-2)(\\sqrt{x}+2)=x-4\\). Answer 1/4.",
  },
  {
    id: "s12_challenge_optional_example_5_combined_techniques",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Challenge (Optional): Cubes and Squares",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to 1}\\frac{x^3-1}{x^2-1}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\frac{0}{0}",
              gap: "tight",
              say: "Direct substitution gives indeterminate form.",
            },
            {
              id: "step_2",
              math: "\\frac{(x-1)(x^2+x+1)}{(x-1)(x+1)}",
              gap: "tight",
              say: "Factor the cube and the square in numerator and denominator.",
            },
            {
              id: "step_3",
              parts: [
                { math: "\\frac{\\cancel{(x-1)}(x^2+x+1)}{\\cancel{(x-1)}(x+1)}" },
                { math: "\\frac{3}{2}", op: "=" },
              ],
              gap: "tight",
              say: "Cancel, then substitute x approaches 1, answer is three halves.",
            },
          ],
        },
      ],
      lead: "Optional, factor cube and square, cancel, substitute.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_formulas",
          type: "formula_block",
          formula: "x^3-1=(x-1)(x^2+x+1)",
        },
      ],
      media: null,
    },
    notes:
      "Skip if time-limited. Difference of cubes formula. Shows same cancel logic on harder factors.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: CONTINUITY BRIDGE + SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s13_putting_it_all_together_direct_substitution_with_piecewise",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Endgame: Direct Substitution After Algebra",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Continuity link",
          text: "If \\(f\\) is **continuous** at \\(a\\), then \\(\\lim_{x\\to a}f(x)=f(a)\\), direct substitution works. Polynomials and rational functions (where defined) are continuous; holes mean simplify first.",
        },
        {
          id: "left_flow",
          type: "nested_bullets",
          items: [
            { id: "f1", text: "Try laws + direct sub" },
            { id: "f2", text: "Hit \\(\\frac{0}{0}\\)? → factor or rationalize" },
            { id: "f3", text: "Check quotient denominator \\(\\neq 0\\)" },
            { id: "f4", text: "Substitute into simplified form" },
          ],
        },
      ],
      lead: "Limit laws are the path to safe direct substitution.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_continuity_pair",
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
        title: "Polynomial: continuous at x=2",
        caption: "Contrast Topic 3 holes: after algebra, plugging in matches the limit.",
        formulaLabel: "f",
        params: { x: 1.5, a: 2 },
        scriptedTimeline: [
          { t: 0, params: { x: 1 } },
          { t: 5, params: { x: 2 } },
        ],
      },
    },
    notes:
      "Bridge to Topic 7 continuity. Flowchart in bullets. Widget: smooth parabola at a=2, f(2)=4 equals limit. Holes need algebra first.",
  },
  {
    id: "s14_summary_key_takeaways",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways",
    question: "",
    lead: "Your limit-law workflow, Session 2 continues:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Limit laws** split hard limits into sums, products, quotients, powers, when each piece exists." },
          { id: "bullet_2", text: "**Quotient law** needs \\(\\lim g\\neq 0\\); product/sum need both limits to exist." },
          { id: "bullet_3", text: "**\\(\\frac{0}{0}\\)** means factor or rationalize, not 'answer zero.'" },
          { id: "bullet_4", text: "**Cancel with care**, acknowledge the hole; simplify on \\(x\\neq a\\)." },
          { id: "bullet_5", text: "**Direct substitution** is the finish line after algebra." },
          { id: "bullet_6", text: "**Next topic**, One-Sided Limits and Limits at Infinity: boundaries and long-run behavior." },
        ],
      },
      {
        id: "final_check",
        type: "pause_and_reveal",
        title: "Final check",
        prompt: "Which needs algebra? A) \\(\\lim_{x\\to 3}(2x+1)\\) B) \\(\\lim_{x\\to 0}\\frac{x^2+3x}{x}\\) C) \\(\\lim_{x\\to 2}\\frac{x+1}{x-3}\\) D) \\(\\lim_{x\\to 1}(x^2-4)\\)",
        reveal: { text: "**B**, \\(\\frac{0}{0}\\); factor \\(x\\) from numerator." },
      },
    ],
    media: null,
    notes:
      "Six bullets + final MC (answer B). Teaser Topic 5: one-sided limits and infinity. Thank students; generation polish comes later across all 10 topics.",
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
 *   - Added limit_laws_sum_demo, limit_product_quotient; reused rational_hole,
 *     approach_parabola. Removed limit_epsilon placeholders.
 *   - s04 visual_lab for product/quotient; s08 showSimplified dashed line on holes.
 *
 * RICH BLOCKS
 *   - math_table for eleven laws; proof_sketch, misconception_compare,
 *     pause_and_reveal, example_solution, derivation_steps, theorem_box.
 *
 * PEDAGOGY
 *   - Welcome-back after Topic 3; roadmap currentId path_topic_04.
 *   - Topic 5 handoff; 0/0 workflow explicit; optional challenge skippable.
 *
 * ESTIMATED DURATION: ~24–27 min
 *
 * v2 → v3 (math_solution_steps alignment, June 2026)
 *   - All algebraic examples use math_solution_steps (flow/split/stack).
 *   - s03 right numeric snapshot, s05 number-line: derivation_steps → stack math steps.
 *
 * flex_plot migration (2026-06-16): limit_laws_sum_demo, rational_hole, approach_parabola
 * → declarative plot specs; limit_product_quotient kept.
 */