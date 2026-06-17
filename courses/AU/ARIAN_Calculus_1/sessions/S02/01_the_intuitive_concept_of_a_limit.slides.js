// Generated from courses/Calculus/Materials/the_intuitive_concept_of_a_limit.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "01_the_intuitive_concept_of_a_limit",
  title: "The Intuitive Concept of a Limit",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/the_intuitive_concept_of_a_limit.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "The Intuitive Concept of a Limit",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: Limits • Session 2, Limits and Continuity • ~25 min • first-year university / advanced high school",
    notes:
      "Welcome back, Session 1 (functions + trig) is done. Topic 3 opens Session 2 with the word *approach*: limits are where calculus begins. Do not re-introduce Arian from scratch.",
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
        currentId: "path_topic_03",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", status: "completed" },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", note: "Today", status: "current", expanded: true },
          { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", note: "Next", status: "next", expanded: true },
          { id: "path_topic_05", number: 5, session: "S02 Limits and Continuity", label: "One-Sided Limits and Limits at Infinity", status: "upcoming" },
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
      { id: "objective_1", text: "Read limits from graphs, tables, and formulas, approach, not arrival." },
      { id: "objective_2", text: "Compute and interpret one-sided limits; decide when a two-sided limit exists." },
      { id: "objective_3", text: "Separate \\(f(a)\\) from \\(\\lim_{x\\to a} f(x)\\) at holes, jumps, and defined points." },
      { id: "objective_4", text: "Preview the epsilon–delta idea and the sum law as tools for the next topic." },
    ],
    notes:
      "Orient on the roadmap: Topics 1–2 complete, Session 2 starts here. Next topic is Limit Laws, we close with the sum law as a bridge. Four objectives map to the four blocks of the lecture.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: INTUITION + DEFINITION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_what_is_a_limit",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "What Is a Limit?",
    question: "As x creeps toward 2, what happens to f(x) on y = x²?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "The word **approach** is all you need. Walk toward a wall: distance gets arbitrarily close to zero, you may never touch it. A **limit** is the value a function **heads toward** as input nears a point, **even if it never arrives**.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "Calculus is built on that nearby behavior. Today: graphs, tables, one-sided limits, and the formal epsilon–delta picture.",
        },
      ],
      lead: "A limit describes where a function is **going**, not necessarily where it **is**.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_approach_parabola",
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
        title: "x approaches 2 on f(x) = x²",
        caption: "Drag x: watch f(x) close in on 4 while |x − 2| shrinks.",
        formulaLabel: "f",
        params: { x: 0.5, a: 2 },
        scriptedTimeline: [
          { t: 0, params: { x: 0 } },
          { t: 4, params: { x: 1.5 } },
          { t: 8, params: { x: 1.9 } },
          { t: 12, params: { x: 1.99 } },
        ],
      },
    },
    notes:
      "Open Session 2 with motion, not symbols. Welcome back, trig toolkit is loaded; limits ask what happens *near* a point. Drag x toward 2 on the parabola: outputs march toward 4. That is the whole idea in one picture.\n\nStudent prompt: How small can you make |x − 2| while still reading f(x)?",
  },
  {
    id: "s02_the_core_definition",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Core Definition",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Limit (intuitive)",
          text: "\\(\\displaystyle\\lim_{x \\to a} f(x) = L\\) means: as \\(x\\) gets arbitrarily close to \\(a\\) from either side, \\(f(x)\\) gets arbitrarily close to \\(L\\). **We do not require** \\(f(a)\\) to exist or equal \\(L\\).",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Classic removable hole: \\(f(x)=\\frac{x^2-4}{x-2}\\) is undefined at \\(x=2\\), yet the graph approaches \\(L=4\\).",
        },
      ],
      lead: "Nearby values matter; the filled dot (if any) does not define the limit.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_rational_hole",
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
        title: "Hole at (2, 4): limit still 4",
        caption: "Open circle = excluded; branches still meet at y = 4.",
        formulaLabel: "f",
        params: { x: 0.5, a: 2 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 4, params: { x: 1.6 } },
          { t: 8, params: { x: 1.95 } },
          { t: 12, params: { x: 2.05 } },
        ],
      },
    },
    notes:
      "State the definition once, then point at the hole. Algebraically the fraction simplifies to x + 2 except at x = 2. Graphically both sides climb toward 4. Emphasize: undefined at the point ≠ no limit.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: ONE-SIDED LIMITS + EXISTENCE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s03_one_sided_limits",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "One-Sided Limits",
    question: "From which side is f(x) negative 1? Positive 1?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "Left-hand: \\(\\displaystyle\\lim_{x \\to a^-} f(x)\\), \\(x\\) approaches from **below**.",
            "Right-hand: \\(\\displaystyle\\lim_{x \\to a^+} f(x)\\), \\(x\\) approaches from **above**.",
          ],
        },
        {
          id: "left_example",
          type: "paragraph",
          text: "For \\(f(x)=|x|/x\\) at \\(a=0\\): left limit is \\(-1\\), right limit is \\(+1\\). Different sides → different destinations.",
        },
      ],
      lead: "Two one-sided stories can disagree, that is when a two-sided limit fails.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_abs_quotient",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=\\frac{|x|}{x}",
          xDomain: [-2.2, 2.2],
          yDomain: [-2.2, 2.2],
          probeMin: -1.8,
          probeMax: 1.8,
          probeDefault: -0.6,
          branches: [
            { expr: "-1", xMin: -2, xMax: 0, openAtEnd: true, stroke: "#2563eb" },
            { expr: "1", xMin: 0, xMax: 2, openAtStart: true, stroke: "#c65a28" },
          ],
          openPoints: [{ x: 0, y: 0, class: "calculus-point open" }],
          vLines: [{ x: 0 }],
          tags: [
            { text: "left → −1", x: -1.4, y: -0.4, tone: "muted" },
            { text: "right → +1", x: 0.8, y: 1.3, tone: "muted" },
          ],
        },
        title: "f(x) = |x|/x near 0",
        caption: "Drag x left vs right: constant plateaus −1 and +1.",
        formulaLabel: "f",
        params: { x: -0.6 },
        scriptedTimeline: [
          { t: 0, params: { x: -1.2 } },
          { t: 5, params: { x: -0.2 } },
          { t: 10, params: { x: 0.2 } },
          { t: 15, params: { x: 1.2 } },
        ],
      },
    },
    notes:
      "Define one-sided notation with the sign in the exponent. Walk x from negative to positive on |x|/x: left branch flat at −1, right at +1. Open circle at origin, function undefined there, but one-sided limits still make sense.",
  },
  {
    id: "s04_limit_existence_condition",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "When Does a Two-Sided Limit Exist?",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$\\lim_{x \\to a} f(x) = L \\quad\\Longleftrightarrow\\quad \\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L$$",
          ],
        },
        {
          id: "left_paragraph",
          type: "paragraph",
          text: "Piecewise example: branches meet at \\(y=3\\) as \\(x\\to 2\\), but \\(f(2)=4\\). **Limit 3; function value 4**, both true at once.",
        },
      ],
      lead: "Equal one-sided limits ⇔ two-sided limit exists (with that value).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_piecewise_limit",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=\\begin{cases}x+1,&x<2\\4,&x=2\\-x+5,&x>2\\end{cases}",
          xDomain: [0, 4],
          yDomain: [0, 6],
          probeMin: 0,
          probeMax: 4,
          probeDefault: 1,
          branches: [
            { expr: "x+1", xMin: 0, xMax: 2, openAtEnd: true, stroke: "#2563eb" },
            { expr: "-x+5", xMin: 2, xMax: 4, openAtStart: true, stroke: "#c65a28" },
          ],
          filledPoints: [{ x: 2, y: 4 }],
          openPoints: [{ x: 2, y: 3, class: "calculus-point open" }],
          vLines: [{ x: 2 }],
          hLines: [{ y: 3 }],
          tags: [{ text: "limit = 3", anchor: "end", tone: "muted" }],
        },
        title: "Branches agree; dot at (2, 4)",
        caption: "Hollow at (2, 3) shows the approach value; solid dot is f(2).",
        formulaLabel: "f",
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 5, params: { x: 1.8 } },
          { t: 10, params: { x: 2.3 } },
        ],
      },
    },
    notes:
      "This is the existence test students will use all semester. Drag x along each branch toward 2: both heights aim at 3. The solid green dot at (2,4) is f(2), irrelevant to the limit. Preview the misconception slide explicitly.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: EPSILON–DELTA LAB + TABLE PAUSE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s05_epsilon_delta_visualization",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Epsilon–Delta Lab: Making “Approach” Precise",
    question: "Shrink ε, can you choose x close enough so f(x) stays in the red band?",
    lead: "Red band: outputs within ε of L = 4. Purple band: inputs within δ of a = 2. Drag ε and the probe x.",
    blocks: [
      {
        id: "lab_definition",
        type: "paragraph",
        text: "For every \\(\\varepsilon > 0\\) there exists \\(\\delta > 0\\) such that \\(0 < |x-a| < \\delta\\) implies \\(|f(x)-L| < \\varepsilon\\). Today: **build intuition**; Topic 4 adds algebra to compute limits.",
      },
    ],
    media: {
      id: "lab_limit_epsilon",
      kind: "calculus_widget",
      widget: "limit_epsilon",
      title: "f(x) = x² near a = 2, L = 4",
      caption: "ε-band (outputs) and δ-band (inputs): point turns green when inside ε.",
      formulaLabel: "\\varepsilon,\\delta",
      params: { a: 2, epsilon: 0.8, x: 1.4 },
      controls: [
        { name: "epsilon", label: "ε", min: 0.1, max: 2, step: 0.05, value: 0.8 },
        { name: "x", label: "probe x", min: 0.8, max: 3.2, step: 0.02, value: 1.4 },
      ],
      scriptedTimeline: [
        { t: 0, params: { a: 2, epsilon: 0.8, x: 1.4 } },
        { t: 5, params: { a: 2, epsilon: 0.4, x: 1.7 } },
        { t: 10, params: { a: 2, epsilon: 0.15, x: 1.92 } },
        { t: 15, params: { a: 2, epsilon: 0.15, x: 2.08 } },
      ],
    },
    notes:
      "Full-width lab, let the bands carry the formal definition. Start wide ε, move x inside δ, watch the point turn green when |f(x)−4| < ε. Shrink ε: students should feel δ must shrink too. Do not drown in quantifiers; this is the picture proofs will mirror.\n\nStudent prompt: What happens to your usable x-range when ε gets tiny?",
  },
  {
    id: "s06_pause_estimate_a_limit_from_a_table",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Estimate a Limit from a Table",
    question: "What is \\(\\lim_{x\\to 1} \\frac{x^2-1}{x-1}\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Consider \\(f(x)=\\frac{x^2-1}{x-1}\\) near \\(x=1\\). The formula is undefined at \\(x=1\\), read the **table**, not the point.",
        },
        {
          id: "left_table",
          type: "math_table",
          headers: ["\\(x\\)", "\\(f(x)\\)"],
          rows: [
            ["0.9", "1.9"],
            ["0.99", "1.99"],
            ["0.999", "1.999"],
            ["1.001", "2.001"],
            ["1.01", "2.01"],
            ["1.1", "2.1"],
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Write your guess before continuing.",
          reveal: { text: "Both sides march toward **2**, classic removable hole." },
        },
      ],
      lead: "Tables show approach when the graph is hard to sketch quickly.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_rational_hole_1",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "rational_hole",
          holeAt: 1,
          simplifiedExpr: "x+1",
          formula: "f(x)=\\frac{x^2-1}{x-1}\\to x+1",
          xDomain: [0.5, 1.5],
          yDomain: [0, 4],
          probeMin: 0.5,
          probeMax: 1.5,
          probeStep: 0.001,
          probeDefault: 0.9,
          tags: [{ text: "hole at (1, 2), limit = 2", anchor: "end", tone: "muted" }],
        },
        title: "Hole at (1, 2)",
        caption: "Drag x toward 1: outputs stabilize near 2.",
        formulaLabel: "f",
        params: { x: 0.9 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.9 } },
          { t: 4, params: { x: 0.99 } },
          { t: 8, params: { x: 1.01 } },
        ],
      },
    },
    notes:
      "YouTube pause beat. Read the table aloud left then right. Let students shout a number. Widget mirrors the table, x hugging 1 from both sides. This 0/0 pattern returns in derivatives as secant slopes.\n\nReveal after pause: limit = 2.",
  },
  {
    id: "s07_example_2_limit_from_a_table_solution",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Table Example: Solution",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to 1}\\frac{x^2-1}{x-1}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "2",
              gap: "tight",
              say: "Table values approach 2 from both sides.",
            },
            {
              id: "step_2",
              math: "\\frac{(x-1)(x+1)}{x-1}",
              gap: "tight",
              say: "Factor the numerator.",
            },
            {
              id: "step_3",
              math: "\\frac{\\cancel{(x-1)}(x+1)}{\\cancel{(x-1)}}=x+2",
              gap: "tight",
              say: "Cancel the common factor for x not equal to 1.",
            },
            {
              id: "step_4",
              math: "2",
              say: "Limit is 2 even though f(1) is undefined.",
            },
          ],
        },
      ],
      lead: "Limit 2; hole at x = 1, same family as the (2, 4) example.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_rational_hole_1_solution",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "rational_hole",
          holeAt: 1,
          simplifiedExpr: "x+1",
          formula: "f(x)=\\frac{x^2-1}{x-1}\\to x+1",
          xDomain: [0.5, 1.5],
          yDomain: [0, 4],
          probeMin: 0.5,
          probeMax: 1.5,
          probeStep: 0.001,
          probeDefault: 0.9,
          tags: [{ text: "hole at (1, 2), limit = 2", anchor: "end", tone: "muted" }],
        },
        title: "Graph confirms the table",
        caption: "Open circle at (1, 2); line y = x + 2 elsewhere.",
        formulaLabel: "f",
        params: { x: 0.85 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.85 } },
          { t: 5, params: { x: 0.995 } },
          { t: 10, params: { x: 1.005 } },
        ],
      },
    },
    notes:
      "Close the pause crisply: limit 2, hole at 1, algebra x+2. Tie to derivatives, tangent slope will be a limit of difference quotients with the same 0/0 flavor.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: MISCONCEPTION + JUMP DISCONTINUITY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s08_common_misconception_f_a_confused_with_limit",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Misconception: f(a) vs Limit",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Do not conflate value and limit",
          pairs: [
            {
              label: "❌ Tempting mistake",
              text: "\"\\(f(2)=4\\), so the limit at \\(x=2\\) must be 4.\"",
            },
            {
              label: "✅ Correct reasoning",
              text: "Limits read **nearby** inputs. Here both sides approach **3**; the filled dot at 4 is irrelevant.",
            },
          ],
        },
        {
          id: "left_formula",
          type: "formula_block",
          formulas: ["\\(f(2)=4\\), but \\(\\displaystyle\\lim_{x\\to 2} f(x)=3\\)."],
        },
      ],
      lead: "The limit is about approach; f(a) is a single snapshot.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_piecewise_misconception",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=\\begin{cases}x+1,&x<2\\4,&x=2\\-x+5,&x>2\\end{cases}",
          xDomain: [0, 4],
          yDomain: [0, 6],
          probeMin: 0,
          probeMax: 4,
          probeDefault: 1,
          branches: [
            { expr: "x+1", xMin: 0, xMax: 2, openAtEnd: true, stroke: "#2563eb" },
            { expr: "-x+5", xMin: 2, xMax: 4, openAtStart: true, stroke: "#c65a28" },
          ],
          filledPoints: [{ x: 2, y: 4 }],
          openPoints: [{ x: 2, y: 3, class: "calculus-point open" }],
          vLines: [{ x: 2 }],
          hLines: [{ y: 3 }],
          tags: [{ text: "limit = 3", anchor: "end", tone: "muted" }],
        },
        title: "f(2) = 4, limit = 3",
        caption: "Arrow story: branches aim at 3; dot sits at 4.",
        formulaLabel: "f",
        params: { x: 1.7, emphasizeMisconception: true },
        scriptedTimeline: [
          { t: 0, params: { x: 1.2 } },
          { t: 5, params: { x: 1.95 } },
          { t: 10, params: { x: 2.1 } },
        ],
      },
    },
    notes:
      "Name the trap before it sticks. Students see a dot and assume it is the limit. Walk branches toward the hollow at (2,3), then point at the solid dot at 4. This is the single most important conceptual correction in intro limits.",
  },
  {
    id: "s09_pause_does_this_limit_exist",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Does This Limit Exist?",
    question: "Does \\(\\lim_{x\\to 0} |x|/x\\) exist?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "\\(f(x)=|x|/x\\): negative plateaus on the left, positive on the right. **Predict** whether a single two-sided limit exists at 0.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Answer Yes or No, with one-sided values.",
          reveal: { text: "No, left \\(-1\\), right \\(+1\\); unequal one-sided limits." },
        },
      ],
      lead: "Do the one-sided limits agree?",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_abs_question",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=\\frac{|x|}{x}",
          xDomain: [-2.2, 2.2],
          yDomain: [-2.2, 2.2],
          probeMin: -1.8,
          probeMax: 1.8,
          probeDefault: -0.6,
          branches: [
            { expr: "-1", xMin: -2, xMax: 0, openAtEnd: true, stroke: "#2563eb" },
            { expr: "1", xMin: 0, xMax: 2, openAtStart: true, stroke: "#c65a28" },
          ],
          openPoints: [{ x: 0, y: 0, class: "calculus-point open" }],
          vLines: [{ x: 0 }],
          tags: [
            { text: "left → −1", x: -1.4, y: -0.4, tone: "muted" },
            { text: "right → +1", x: 0.8, y: 1.3, tone: "muted" },
          ],
        },
        title: "Jump at x = 0",
        caption: "Question mark at the gap: decide before labels appear.",
        formulaLabel: "f",
        params: { x: -0.4, hideLabels: true },
        scriptedTimeline: [
          { t: 0, params: { x: -0.4, hideLabels: true } },
          { t: 6, params: { x: 0.4, hideLabels: true } },
        ],
      },
    },
    notes:
      "Second YouTube pause. Hide limit labels on the widget, only dashed branches and a question mark. Students must cite one-sided values. After reveal, replay s03 with labels visible on the next slide.",
  },
  {
    id: "s10_example_4_edge_case_limit_does_not_exist",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Jump Discontinuity: Limit DNE",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          problem: "\\lim_{x\\to 0}\\frac{|x|}{x}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\lim_{x\\to 0^-}\\frac{|x|}{x}=-1",
              gap: "tight",
              say: "Left one-sided limit.",
            },
            {
              id: "step_2",
              math: "\\lim_{x\\to 0^+}\\frac{|x|}{x}=1",
              gap: "tight",
              say: "Right one-sided limit.",
            },
            {
              id: "step_3",
              op: "=>",
              math: "\\text{DNE}",
              say: "Since negative 1 does not equal 1, the two-sided limit does not exist.",
            },
          ],
        },
      ],
      lead: "One-sided limits can exist while the two-sided limit fails.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_abs_dne",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=\\frac{|x|}{x}",
          xDomain: [-2.2, 2.2],
          yDomain: [-2.2, 2.2],
          probeMin: -1.8,
          probeMax: 1.8,
          probeDefault: -0.6,
          branches: [
            { expr: "-1", xMin: -2, xMax: 0, openAtEnd: true, stroke: "#2563eb" },
            { expr: "1", xMin: 0, xMax: 2, openAtStart: true, stroke: "#c65a28" },
          ],
          openPoints: [{ x: 0, y: 0, class: "calculus-point open" }],
          vLines: [{ x: 0 }],
          tags: [
            { text: "left → −1", x: -1.4, y: -0.4, tone: "muted" },
            { text: "right → +1", x: 0.8, y: 1.3, tone: "muted" },
          ],
        },
        title: "Left −1, right +1 → DNE",
        caption: "Equal one-sided limits are required for a two-sided limit.",
        formulaLabel: "f",
        params: { x: -0.8 },
        scriptedTimeline: [
          { t: 0, params: { x: -1.1 } },
          { t: 5, params: { x: -0.1 } },
          { t: 10, params: { x: 0.1 } },
          { t: 15, params: { x: 1.1 } },
        ],
      },
    },
    notes:
      "Answer the pause aloud. Emphasize DNE does not mean chaos, each side has a clear constant limit. Jump discontinuities are clean failures of the existence test.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 5: CHALLENGE. SUM LAW, SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s11_challenge_optional_oscillating_function_sin_1_x",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Challenge (Optional): sin(1/x)",
    question: "Zoom in, does the graph settle on one height near 0?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph",
          type: "paragraph",
          text: "\\(f(x)=\\sin(1/x)\\) near \\(x=0\\): oscillations between \\(-1\\) and \\(1\\) get infinitely dense. Different sequences of inputs can approach different values.",
        },
        {
          id: "left_bullets",
          type: "nested_bullets",
          items: [
            { id: "b1", text: "Some inputs give outputs near 0; others near 1." },
            { id: "b2", text: "No single \\(L\\) works, **limit DNE** by oscillation." },
          ],
        },
      ],
      lead: "Optional challenge, wilder than jumps; shows limits can fail even when one-sided paths look tempting.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_sin_reciprocal",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "squeeze",
          mid: "sin(1/x)",
          lower: "-1",
          upper: "1",
          formula: "f(x)=\\sin\\!\\left(\\frac{1}{x}\\right)",
          tag: "oscillations speed up → no single limit",
          tagTone: "warn",
        },
        title: "sin(1/x): zoom near 0",
        caption: "Shrink the window: frequency explodes.",
        formulaLabel: "f",
        params: { zoom: 0.4 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.5 } },
          { t: 6, params: { zoom: 0.1 } },
          { t: 12, params: { zoom: 0.02 } },
        ],
      },
    },
    notes:
      "Skip if time-limited. Zoom slider tells the story, students feel why no approach value works. Contrast with jump case: here one-sided paths do not stabilize either. Sets up why we need theorems like Squeeze later.",
  },
  {
    id: "s12_sum_law_for_limits",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Sum Law for Limits",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Sum law (preview)",
          text: "If \\(\\lim_{x\\to a} f(x)=L\\) and \\(\\lim_{x\\to a} g(x)=M\\), then \\(\\displaystyle\\lim_{x\\to a}[f(x)+g(x)]=L+M\\). **Requires both limits to exist.**",
        },
        {
          id: "left_bridge",
          type: "paragraph",
          text: "Topic 4 (**Limit Laws**) builds a full toolkit from this idea, today we only need the intuition.",
        },
      ],
      lead: "Limits play nicely with addition when each piece has a limit.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_limit_sum",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "y_equals",
          formula: "\\lim(f+g)=\\lim f+\\lim g=3+5=8",
          xDomain: [0, 2],
          yDomain: [0, 11],
          probeMin: 0,
          probeMax: 2,
          probeDefault: 0.5,
          curves: [
            { id: "f", expr: "3+(x-1)^2", stroke: "#2563eb", strokeWidth: 3 },
            { id: "g", expr: "5-(x-1)^2", stroke: "#c65a28", strokeWidth: 3 },
            { id: "sum", expr: "8", stroke: "#16a34a", strokeWidth: 4 },
          ],
          probeExpr: "8",
          hLines: [{ y: 3 }, { y: 5 }, { y: 8 }],
        },
        title: "f → 3, g → 5, so f+g → 8",
        caption: "Blue f, orange g, green sum: all approach 8 at x = 1.",
        formulaLabel: "f+g",
        params: { x: 0.5 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.2 } },
          { t: 5, params: { x: 0.7 } },
          { t: 10, params: { x: 0.95 } },
        ],
      },
    },
    notes:
      "Bridge to next topic. If f hugs 3 and g hugs 5, the green sum hugs 8. Mention product/quotient laws arrive in Limit Laws, do not derive them here.",
  },
  {
    id: "s13_summary_key_ideas",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways",
    question: "",
    lead: "Your limit toolkit, Session 2 has begun:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Approach, not arrival**, \\(\\lim_{x\\to a} f(x)\\) reads nearby behavior; \\(f(a)\\) may differ or be undefined." },
          { id: "bullet_2", text: "**One-sided limits**, \\(\\lim_{x\\to a^-}\\) and \\(\\lim_{x\\to a^+}\\) must match for a two-sided limit." },
          { id: "bullet_3", text: "**Three failure modes**, unequal sides (jump), wild oscillation (sin(1/x)), or no approach value (we will meet more)." },
          { id: "bullet_4", text: "**Tables and holes**, \\((x^2-1)/(x-1)\\to 2\\) previews derivative limits." },
          { id: "bullet_5", text: "**Epsilon–delta**, ε band on outputs, δ band on inputs; shrink ε ⇒ usually shrink δ." },
          { id: "bullet_6", text: "**Next topic**, Limit Laws and Algebraic Evaluation: compute limits without tables every time." },
        ],
      },
    ],
    media: null,
    notes:
      "Recap one beat per bullet, pointing back to the widget moment when possible. Thank students for completing Topic 3 / Session 2 opener. Teaser Topic 4: factor, cancel, and apply laws, less graph dragging, more algebra speed.",
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
 *   - Replaced auto-mapped limit_epsilon placeholders with function_analysis
 *     variants: approach_parabola, rational_hole, rational_hole_1, abs_quotient,
 *     piecewise_limit, sin_reciprocal, limit_sum.
 *   - s05 converted to visual_lab with limit_epsilon at a=2, L=4 (proper domain).
 *   - Removed visual-plan source/python_code metadata from media blocks.
 *
 * RICH BLOCKS
 *   - theorem_box on definition and sum law; misconception_compare on f(a) trap.
 *   - pause_and_reveal on both pause slides; math_table on table pause.
 *   - math_solution_steps on s07 table solution and s10 jump DNE example.
 *
 * v2 → v3 (math_solution_steps alignment, June 2026)
 *   - s07, s10: example_solution → math_solution_steps (flow, pipeline step IDs).
 *
 * PEDAGOGY
 *   - Welcome-back framing: Session 1 complete, Session 2 Limits begins.
 *   - Roadmap currentId path_topic_03; Topic 4 Limit Laws as next handoff.
 *   - ~25 min target; optional sin(1/x) marked skippable.
 *
 * ESTIMATED DURATION: ~24–27 min
 *
 * flex_plot migration (2026-06-16): function_analysis variants → declarative plot
 * specs (rational_hole, piecewise, squeeze, multi-curve sum law); limit_epsilon kept.
 */