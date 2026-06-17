// Generated from courses/Calculus/Materials/continuity_and_the_intermediate_value_theorem.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "05_continuity_and_the_intermediate_value_theorem",
  title: "Continuity and The Intermediate Value Theorem",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/continuity_and_the_intermediate_value_theorem.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "Continuity and The Intermediate Value Theorem",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic 7 • Session 2 finale: continuity & IVT • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back, Topics 1–6 done (limits, laws, one-sided, squeeze). Topic 7 closes the Session 2 limits arc. Assumes limit intuition, limit laws, and squeeze from prior topics. Do not re-introduce Arian from scratch.",
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
        currentId: "path_topic_07",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", status: "completed" },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", status: "completed" },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", status: "completed" },
          { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", status: "completed" },
          { id: "path_topic_05", number: 5, session: "S02 Limits and Continuity", label: "One-Sided Limits and Limits at Infinity", status: "completed" },
          { id: "path_topic_06", number: 6, session: "S02 Limits and Continuity", label: "The Squeeze Theorem", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_07", number: 7, session: "S02 Limits and Continuity", label: "Continuity and the Intermediate Value Theorem", note: "Today", status: "current", expanded: true },
          { id: "path_topic_08", number: 8, session: "S03 Derivative Foundations", label: "Instantaneous Rate of Change", note: "Next", status: "next", expanded: true },
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
      { id: "objective_1", text: "Determine continuity at a point using the three-part definition." },
      { id: "objective_2", text: "Classify discontinuities and predict when the IVT applies." },
      { id: "objective_3", text: "Apply the IVT to prove existence of roots and fixed points." },
      { id: "objective_4", text: "Construct interval proofs that check continuity before invoking the theorem." },
    ],
    notes:
      "Roadmap first: Topics 1–6 completed, Topic 7 current, Topic 8 (derivatives) next. Four objectives map to definition → discontinuities → IVT → proofs.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: CONTINUITY INTUITION + DEFINITION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_the_smooth_odometer",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Smooth Odometer",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "A **continuous** function is like a working speedometer, the reading can rise and fall smoothly, but it never **jumps** past intermediate values. A **discontinuous** graph skips, like a broken gauge jumping from 37 to 42.",
        },
        {
          id: "left_bridge",
          type: "paragraph",
          text: "Topic 4 gave us holes and algebra; Topic 6 squeezed oscillations. Today we ask: when does the graph **connect** at a point, and when can we guarantee a solution exists?",
        },
      ],
      lead: "Continuous graphs pass through every intermediate height, no skipping.",
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
        title: "Smooth motion: f(x) = x²",
        caption: "Drag x: output changes gradually, no jump.",
        formulaLabel: "f",
        params: { x: 1.2, a: 2 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 5, params: { x: 1.5 } },
          { t: 10, params: { x: 1.95 } },
        ],
      },
    },
    notes:
      "Speedometer metaphor in voice. Widget: smooth parabola, contrast with piecewise jumps on s05. Callback Topic 4 holes and Topic 6 squeeze as setup for 'when graphs behave.'",
  },
  {
    id: "s02_continuity_at_a_point",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Continuity at a Point",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Continuity at x = a",
          text: "\\(f\\) is **continuous at \\(a\\)** iff \\(\\displaystyle\\lim_{x\\to a} f(x) = f(a)\\). Equivalently, all three must hold: **(1)** \\(f(a)\\) is defined, **(2)** the two-sided limit exists, **(3)** they are equal.",
        },
        {
          id: "left_checks",
          type: "nested_bullets",
          items: [
            { id: "c1", text: "Hole only → limit may exist, but \\(f(a)\\) missing → **not continuous**" },
            { id: "c2", text: "Jump → one-sided limits disagree → **not continuous**" },
            { id: "c3", text: "Polynomial at \\(a\\) → all three pass → **continuous**" },
          ],
        },
      ],
      lead: "One compact equation hides three separate checks.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_approach_parabola_continuous",
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
        title: "Polynomial: limit = value at a = 2",
        caption: "Branches meet at y = 4: direct substitution works after Topic 4.",
        formulaLabel: "f",
        params: { x: 1.6, a: 2 },
        scriptedTimeline: [
          { t: 0, params: { x: 1 } },
          { t: 5, params: { x: 1.9 } },
          { t: 10, params: { x: 2 } },
        ],
      },
    },
    notes:
      "theorem_box once, then three-check list. Widget at a=2: f(x)=x², limit 4 equals f(2). Tie to Topic 4 direct substitution bridge.",
  },
  {
    id: "s03_pause_check_continuity",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Check Continuity",
    question: "Is \\(f(x)=\\frac{x^2-1}{x-1}\\) continuous at \\(x=1\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Topic 4 factoring preview: the simplified line is \\(x+1\\), but the **original** is undefined at \\(x=1\\). Run the **three checks** before continuing.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Yes or No, which condition fails first?",
          reveal: { text: "**No**, \\(f(1)\\) is undefined (condition 1 fails). Limit exists (= 2) but that is not enough." },
        },
      ],
      lead: "Predict: hole at x = 1, continuous or not?",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_rational_hole_pause",
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
        title: "Hole at (1, 2): no filled dot",
        caption: "Open circle = excluded; graph still approaches y = 2.",
        formulaLabel: "f",
        params: { x: 0.4, a: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.2 } },
          { t: 5, params: { x: 0.85 } },
          { t: 10, params: { x: 1.15 } },
        ],
      },
    },
    notes:
      "YouTube pause beat. Widget hole at (1,2), no answer text on graph. Reveal names failing condition. Student writes reasoning before slide 4.",
  },
  {
    id: "s04_warm_up_example_removable_discontinuity",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: Removable Discontinuity",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "f(x)=\\frac{x^2-1}{x-1},\\quad x=1",
          steps: [
            { id: "step_1", math: "f(1)=\\frac{0}{0}", gap: "tight", say: "Direct substitution, undefined at the point." },
            { id: "step_2", math: "\\frac{(x-1)(x+1)}{x-1}", gap: "tight", say: "Factor the numerator (Topic 4 pattern)." },
            { id: "step_3", math: "\\lim_{x\\to 1}(x+1)=2", gap: "tight", say: "Cancel for x ≠ 1; limit exists and equals 2." },
            { id: "step_4", math: "\\text{removable hole}", say: "Limit exists but f(1) undefined → not continuous; gap is removable." },
          ],
        },
      ],
      lead: "f(1) undefined, limit = 2 → removable discontinuity (hole).",
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
        title: "Removable hole at (1, 2)",
        caption: "Define f(1) = 2 and the hole closes: graph becomes continuous.",
        formulaLabel: "f",
        params: { x: 0.6, a: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.3 } },
          { t: 5, params: { x: 0.9 } },
          { t: 10, params: { x: 1.2 } },
        ],
      },
    },
    notes:
      "Worked version of pause slide. Factor-cancel-limit workflow from Topic 4. Name 'removable', repair by assigning f(1)=2.",
  },
  {
    id: "s05_visualizing_discontinuities",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Visualizing Discontinuities",
    question: "Drag x across each boundary, where does the graph break?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_types",
          type: "nested_bullets",
          items: [
            { id: "t1", text: "**Removable** (hole), limit exists, \\(f(a)\\) missing or wrong (Topic 4 holes)" },
            { id: "t2", text: "**Jump**, left and right limits differ (Topic 5 one-sided limits)" },
            { id: "t3", text: "**Infinite**, vertical asymptote; output blows up (Topic 5 infinity)" },
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Widget shows **jump** discontinuities at \\(x=0\\) and \\(x=2\\), open vs filled dots tell which endpoint is included.",
        },
      ],
      lead: "Three discontinuity types, IVT needs none of these on the whole interval.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_piecewise",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=\\begin{cases}x^2,&x<0\\2x+1,&0\\le x\\le2\\5-x,&x>2\\end{cases}",
          xDomain: [-3, 4],
          yDomain: [-0.5, 6],
          probeMin: -2.5,
          probeMax: 3.5,
          probeDefault: 1.5,
          branches: [
            { expr: "x*x", xMin: -3, xMax: 0, openAtEnd: true, stroke: "#64748b", strokeWidth: 3 },
            { expr: "2*x+1", xMin: 0, xMax: 2, stroke: "#c65a28" },
            { expr: "5-x", xMin: 2, xMax: 4, openAtStart: true, stroke: "#2563eb", strokeWidth: 3 },
          ],
          openPoints: [
            { x: 0, y: 0, class: "calculus-point open muted" },
            { x: 2, y: 3, class: "calculus-point open blue" },
          ],
          filledPoints: [{ x: 0, y: 1 }, { x: 2, y: 5 }],
          tags: [{ text: "hollow = excluded | filled = included", anchor: "end", tone: "muted" }],
        },
        title: "Piecewise graph with jump breaks",
        caption: "Hollow = excluded | filled = included.",
        formulaLabel: "f",
        params: { x: 1.5 },
        scriptedTimeline: [
          { t: 0, params: { x: -0.5 } },
          { t: 4, params: { x: 0 } },
          { t: 8, params: { x: 1.5 } },
          { t: 12, params: { x: 2.5 } },
        ],
      },
    },
    notes:
      "Callback S01 piecewise notation. Drag x through jumps at 0 and 2. Removable = rational_hole from s04; infinite = recall 1/(x-a) vertical asymptotes from Topic 5.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: IVT + APPLICATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s06_intermediate_value_theorem_ivt",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Intermediate Value Theorem (IVT)",
    question: "Drag N between the endpoint heights, where does the curve cross?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Intermediate Value Theorem",
          text: "If \\(f\\) is **continuous on \\([a,b]\\)** and \\(N\\) is **strictly between** \\(f(a)\\) and \\(f(b)\\), then \\(\\exists\\, c\\in(a,b)\\) with \\(f(c)=N\\). **Existence only**, not uniqueness.",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Continuous on the **closed interval** means no holes, jumps, or asymptotes inside, the graph cannot skip intermediate \\(y\\)-values.",
        },
      ],
      lead: "Continuous on [a,b] ⇒ every intermediate height is hit at least once.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_ivt_demo",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "Continuous curve on [a, b]: slider for N",
        caption: "Orange line at height N; red dot marks a guaranteed crossing c.",
        params: { family: "sine", a: 1, b: 1, h: 0, k: 0 },
        scriptedTimeline: [
          { t: 0, params: { family: "sine", a: 1, b: 1, h: 0, k: 0 } },
          { t: 6, params: { family: "sine", a: 1, b: 1, h: 1.5, k: 1 } },
        ],
      },
    },
    notes:
      "theorem_box statement. Widget: drag N between endpoint values, red c appears. Stress strict between and continuity on whole interval. Multiple c possible.",
  },
  {
    id: "s07_pause_does_the_ivt_apply",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Does the IVT Apply?",
    question: "Prove \\(\\cos x = x\\) has at least one solution in \\([0, \\pi/2]\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Rewrite as a **root-finding** problem: define \\(g(x)=\\cos x - x\\). What are \\(g(0)\\) and \\(g(\\pi/2)\\)? Is \\(g\\) continuous on the interval?",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and design the proof",
          prompt: "Sketch g(0), g(π/2), and the sign-change argument before continuing.",
          reveal: { text: "Hint: \\(g(0)=1>0\\), \\(g(\\pi/2)<0\\), \\(g\\) continuous → IVT gives \\(c\\) with \\(g(c)=0\\)." },
        },
      ],
      lead: "Pause: set up g(x) = cos x − x and check endpoint signs.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cos_fixed_point",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "y = cos x on [0, π/2]",
        caption: "Compare mentally with y = x: do the curves cross?",
        params: { family: "cosine", a: 1, b: 1, h: 0, k: 0 },
        scriptedTimeline: [
          { t: 0, params: { family: "cosine", h: 0, k: 0 } },
          { t: 6, params: { family: "cosine", h: 0.3, k: 0.2 } },
        ],
      },
    },
    notes:
      "Classic fixed-point setup. Pause before full proof on s08. Widget shows cos curve, students imagine intersection with y=x. Do not mark c yet.",
  },
  {
    id: "s08_application_fixed_point_of_cos_x_x",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Fixed Point of cos x = x",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "\\cos x = x\\text{ on }[0,\\pi/2]",
          steps: [
            { id: "step_1", math: "g(x)=\\cos x - x", gap: "tight", say: "Rewrite as g(x) = 0." },
            { id: "step_2", math: "g(0)=1>0", gap: "tight", say: "Evaluate at the left endpoint." },
            { id: "step_3", math: "g(\\pi/2)=-\\pi/2<0", gap: "tight", say: "Evaluate at the right endpoint." },
            { id: "step_4", math: "g\\text{ continuous on }[0,\\pi/2]", gap: "tight", say: "Sum of continuous functions." },
            { id: "step_5", math: "\\exists\\,c:\\ g(c)=0\\Rightarrow\\cos c=c", say: "IVT guarantees a fixed point c ≈ 0.739." },
          ],
        },
      ],
      lead: "Sign change + continuity → IVT guarantees a solution.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cos_fixed_point_solution",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "cos x meets y = x (fixed point)",
        caption: "Intersection c ≈ 0.739: input equals output.",
        params: { family: "cosine", a: 1, b: 1, h: 0, k: 0 },
        scriptedTimeline: [
          { t: 0, params: { family: "cosine", h: 0, k: 0 } },
          { t: 6, params: { family: "cosine", h: 0, k: 0 } },
        ],
      },
    },
    notes:
      "Full proof after pause. Fixed point language: cos c = c. Numerical value ~0.739 optional color.",
  },
  {
    id: "s09_standard_example_finding_a_root",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Standard Example: Finding a Root",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "f(x)=4x^3-6x^2+3x-2\\text{ has a root in }(1,2)",
          steps: [
            { id: "step_1", math: "f(1)=4-6+3-2=-1", gap: "tight", say: "Evaluate at x = 1." },
            { id: "step_2", math: "f(2)=32-24+6-2=12", gap: "tight", say: "Evaluate at x = 2." },
            { id: "step_3", math: "-1<0<12", gap: "tight", say: "Zero lies strictly between endpoint values." },
            { id: "step_4", math: "f\\text{ polynomial}\\Rightarrow\\text{ continuous on }[1,2]", gap: "tight", say: "Continuity check, polynomials are continuous everywhere." },
            { id: "step_5", math: "\\exists\\,c\\in(1,2):\\ f(c)=0", say: "IVT guarantees a root; we need not find c exactly." },
          ],
        },
      ],
      lead: "f(1) < 0 < f(2) and f continuous → root exists in (1, 2).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cubic_ivt",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "Cubic crossing y = 0 on [1, 2]",
        caption: "Green endpoints bracket zero; red marks an approximate root.",
        params: { family: "cubic", a: 1, b: 1, h: 0, k: 0 },
        scriptedTimeline: [
          { t: 0, params: { family: "cubic", h: 0, k: 0 } },
          { t: 6, params: { family: "cubic", h: 0.5, k: -0.5 } },
        ],
      },
    },
    notes:
      "Textbook IVT template: evaluate endpoints, sign change, continuity, conclude. Power of theorem is existence without solving. Root ≈ 1.3.",
  },
  {
    id: "s10_misconception_ivt_without_continuity",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Misconception: IVT Without Continuity",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Continuity on the whole interval",
          pairs: [
            {
              label: "❌ Wrong move",
              text: "\\(f(0)=0\\), \\(f(2)=3\\), \\(N=2\\) between → \"IVT gives \\(c\\) with \\(f(c)=2\\)\" **without checking continuity**.",
            },
            {
              label: "✅ Correct move",
              text: "Spot the **jump at \\(x=1\\)** first. The graph skips \\(y=2\\), no \\(c\\) exists even though endpoints bracket \\(N\\).",
            },
          ],
        },
        {
          id: "left_piecewise",
          type: "formula_block",
          formula: "f(x)=\\begin{cases}x^2,&0\\le x<1\\\\3,&1\\le x\\le2\\end{cases}",
        },
      ],
      lead: "Endpoint bracketing is not enough, verify continuity on all of [a, b].",
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
        title: "Jump discontinuity breaks intermediate values",
        caption: "Horizontal line at y = 2 never meets the graph: IVT hypothesis fails.",
        formulaLabel: "f",
        params: { x: 0.5 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.3 } },
          { t: 5, params: { x: 1.5 } },
          { t: 10, params: { x: 2.5 } },
        ],
      },
    },
    notes:
      "Most common IVT mistake. misconception_compare names trap. Widget: jump, graph skips intermediate y. Always verify continuity on the **entire** closed interval.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: EDGE CASES + SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s11_edge_case_constant_function",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Edge Case: Constant Function",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "**Problem:** \\(f(x)=5\\) on \\([0,10]\\). Is \\(N=5\\) strictly between \\(f(0)\\) and \\(f(10)\\)? **No**, both endpoints equal 5.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "**Lesson:** IVT hypothesis requires \\(N\\) **strictly between** endpoint values. When \\(f(a)=f(b)\\), the theorem says nothing, yet every \\(c\\) satisfies \\(f(c)=5\\). **Hypothesis fails ≠ conclusion false.**",
        },
      ],
      lead: "Equal endpoints → IVT hypothesis not met; conclusion may still hold trivially.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_note",
          type: "paragraph",
          text: "**Visual:** horizontal line \\(y=5\\), no number strictly between 5 and 5, so the 'between' condition is empty.",
        },
      ],
      media: null,
    },
    notes:
      "Distinguish 'theorem does not apply' from 'conclusion is false.' IVT is sufficient, not necessary. Brief slide.",
  },
  {
    id: "s12_challenge_optional_ivt_proof_via_supremum",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Challenge (Optional): IVT Proof via Supremum",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "proof_sketch",
          title: "Proof sketch",
          text: "Rigorous IVT using the least upper bound property.",
          steps: [
            { id: "left_step_1", text: "Let \\(S=\\{x\\in[a,b]: f(x)\\le N\\}\\)." },
            { id: "left_step_2", text: "\\(a\\in S\\) so \\(S\\neq\\emptyset\\); \\(S\\) bounded above by \\(b\\)." },
            { id: "left_step_3", text: "Set \\(c=\\sup S\\)." },
            { id: "left_step_4", text: "If \\(f(c)<N\\), continuity pushes points \\(>c\\) into \\(S\\), contradicts \\(c=\\sup S\\)." },
            { id: "left_step_5", text: "If \\(f(c)>N\\), continuity gives a smaller upper bound, contradiction." },
            { id: "left_step_6", text: "Therefore \\(f(c)=N\\)." },
          ],
        },
      ],
      lead: "Optional, supremum of \\{x : f(x) ≤ N\\} forces f(c) = N.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_note",
          type: "paragraph",
          text: "**Picture:** shade \\(x\\) where \\(f(x)\\le N\\); the supremum \\(c\\) is where the shading stops and continuity pins \\(f(c)=N\\).",
        },
      ],
      media: null,
    },
    notes:
      "Skip if time-limited. For students ready for analysis rigor. Continuity is the engine in both contradiction branches.",
  },
  {
    id: "s13_summary_and_key_takeaways",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways: Session 2 Complete",
    question: "",
    lead: "Continuity and IVT close the limits arc, Session 3 opens derivatives:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Continuity at \\(a\\):** \\(\\lim_{x\\to a}f(x)=f(a)\\), three checks: defined, limit exists, equal." },
          { id: "bullet_2", text: "**Discontinuities:** removable (hole), jump (one-sided mismatch), infinite (asymptote), IVT needs none on \\([a,b]\\)." },
          { id: "bullet_3", text: "**IVT:** continuous on \\([a,b]\\) + \\(N\\) strictly between \\(f(a)\\) and \\(f(b)\\) ⇒ \\(\\exists\\,c\\) with \\(f(c)=N\\) (existence, not uniqueness)." },
          { id: "bullet_4", text: "**Proof template:** define \\(g\\), check endpoint signs, verify continuity, invoke IVT." },
          { id: "bullet_5", text: "**Session 2 arc:** limits (Topic 3) → laws (Topic 4) → one-sided/infinity (Topic 5) → squeeze (Topic 6) → continuity & IVT (Topic 7)." },
          { id: "bullet_6", text: "**Next, Session 3, Topic 8:** Instantaneous Rate of Change, from limits to derivatives." },
        ],
      },
      {
        id: "final_check",
        type: "pause_and_reveal",
        title: "Final check",
        prompt: "Can IVT apply to \\(f(x)=\\begin{cases}x,&x<1\\\\3,&x\\ge1\\end{cases}\\) on \\([0,2]\\) for \\(N=2\\)?",
        reveal: { text: "**No**, jump at \\(x=1\\) breaks continuity; the graph never hits \\(y=2\\)." },
      },
    ],
    media: null,
    notes:
      "Six bullets + final pause (answer: no, jump). Thank students, Session 2 limits arc complete. Teaser Topic 8 derivatives: slopes and instantaneous rate. Warm close.",
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
 *   - Replaced limit_epsilon placeholders with function_analysis variants:
 *     approach_parabola, rational_hole, piecewise, piecewise_limit.
 *   - Kept function_transform for IVT slider demo and application graphs.
 *   - Removed source/sourceSpec/sourceCode/python_code metadata from all blocks.
 *
 * RICH BLOCKS
 *   - theorem_box on continuity definition (s02) and IVT statement (s06).
 *   - math_solution_steps on removable warm-up (s04), fixed point (s08), root (s09).
 *   - misconception_compare on IVT-without-continuity (s10).
 *   - pause_and_reveal on s03, s07, and s13 final check.
 *   - nested_bullets on s02 checks, s05 types, s13 summary.
 *
 * PEDAGOGY
 *   - Welcome-back; roadmap currentId path_topic_07; Topics 1–6 completed.
 *   - Callbacks to Topic 4 limit laws / holes, Topic 5 one-sided & infinity,
 *     Topic 6 squeeze; Session 2 limits arc closes on s13.
 *   - Teaser Session 3 Topic 8 (instantaneous rate of change).
 *
 * ESTIMATED DURATION: ~20–22 min
 *
 * flex_plot migration (2026-06-16): approach_parabola, rational_hole, piecewise,
 * piecewise_limit → declarative plot specs; function_transform IVT slides kept.
 */