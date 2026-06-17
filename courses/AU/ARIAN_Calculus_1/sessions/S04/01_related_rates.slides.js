// Generated from courses/Calculus/Materials/related_rates.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "01_related_rates",
  title: "Related Rates",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/related_rates.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "Related Rates",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic 15 • Session 4 opens: changing-world problems • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back, Session 3 complete (Topics 8–14). Derivatives now solve *changing world* problems: quantities linked through geometry and differentiated with respect to time. Callback implicit diff (Topic 14) + chain rule (Topic 13). Do not re-introduce Arian from scratch.",
  },
  {
    id: "learning_objectives",
    type: "bullets",
    hud: "Arian University • Calculus 1",
    title: "Learning Objectives",
    lead: "Welcome back, Session 3 is done. Derivatives now answer *how fast* linked quantities change. By the end of this topic you will be able to:",
    blocks: [
      {
        id: "calculus1_roadmap",
        type: "course_path",
        layout: "topic_grid",
        currentId: "path_topic_15",
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
          { id: "path_topic_14", number: 14, session: "S03 Derivative Foundations and Rules", label: "Implicit Differentiation", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_15", number: 15, session: "S04 Applications of Derivatives", label: "Related Rates", note: "Today", status: "current", expanded: true },
          { id: "path_topic_16", number: 16, session: "S04 Applications of Derivatives", label: "Critical Points and Extrema on an Interval", note: "Next", status: "next", expanded: true },
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
      { id: "objective_1", text: "Calculate rates of change in geometric systems using implicit differentiation w.r.t. \\(t\\)" },
      { id: "objective_2", text: "Identify known and unknown rates and build the linking equation" },
      { id: "objective_3", text: "Apply the chain rule (Topic 13) to variables that share a clock" },
      { id: "objective_4", text: "Extract geometric relationships from word problems before differentiating" },
      { id: "objective_5", text: "Solve classic scenarios: square, balloon, ladder, shadow, cone, radar" },
    ],
    notes:
      "Roadmap: Topics 8–14 done, Topic 15 current, Topic 16 Critical Points next. Session 4 opens applications arc.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: HOOK + STRATEGY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_the_spider_web_of_change",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Spider Web of Change",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Blow up a balloon: radius, area, and volume change at **linked** rates. Tug one strand of a spider web and the whole shape distorts. **Related rates** is the math of those links, one known rate, find another.",
        },
        {
          id: "body_balloon",
          type: "math_solution_steps",
          problem: "V=\\frac{4}{3}\\pi r^3,\\ \\frac{dV}{dt}=100\\ \\text{cm}^3/\\text{min}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\frac{dV}{dt}=4\\pi r^2\\frac{dr}{dt}",
              gap: "tight",
              say: "Differentiate volume w.r.t. time; chain rule on r of t.",
            },
            {
              id: "step_2",
              math: "\\frac{dr}{dt}=\\frac{dV/dt}{4\\pi r^2}",
              gap: "tight",
              say: "Solve for dr/dt.",
            },
            {
              id: "step_3",
              parts: [
                { math: "\\left.\\frac{dr}{dt}\\right|_{r=5}" },
                { math: "\\frac{1}{\\pi}\\ \\text{cm/min}", op: "=" },
              ],
              say: "At r equals 5, radius grows one over pi cm per minute.",
            },
          ],
        },
      ],
      lead: "Session 4: derivatives meet the *changing world*. Everything shares the same clock \\(t\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_balloon_rates",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Balloon: \\(r(t)\\) and \\(V(r)\\) linked",
        caption: "Use \\(x\\) as time proxy: \\(r\\) grows linearly; \\(V=\\frac{4}{3}\\pi r^3\\) curves up.",
        formulaLabel: "rates",
        plot: {
          plotType: "y_equals",
          formula: "r(t)\\ \\&\\ V(r)",
          xDomain: [0, 5],
          yDomain: [0, 550],
          curves: [
            { id: "r", expr: "1+0.8*x", stroke: "#2563eb", strokeWidth: 3 },
            { id: "V", expr: "(4/3)*pi*(1+0.8*x)^3", stroke: "#dc2626", strokeWidth: 3 },
          ],
          tags: [
            { text: "r(t) linear", x: 3.5, y: 4.2 },
            { text: "V grows faster", x: 2, y: 420 },
          ],
          probe: true,
          probeDefault: 2.5,
        },
        params: { x: 2.5 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 6, params: { x: 3 } },
        ],
      },
    },
    notes:
      "Spider-web metaphor + balloon math_solution_steps. Callback Topics 13–14: chain rule on r(t). Graph: r linear, V cubic in time proxy.",
  },
  {
    id: "s02_the_fundamental_strategy",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Fundamental Strategy",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Chain rule for time",
          text: "If \\(y=y(x(t))\\), then \\(\\frac{dy}{dt}=\\frac{dy}{dx}\\cdot\\frac{dx}{dt}\\). In related rates, **every** variable is a function of \\(t\\); differentiate the linking equation implicitly w.r.t. \\(t\\).",
        },
        {
          id: "left_workflow",
          type: "nested_bullets",
          items: [
            { id: "wf_1", text: "**Draw & label**, sketch geometry; mark constants vs \\(x(t),y(t),\\ldots\\)" },
            { id: "wf_2", text: "**Write the link**, geometric/physical equation valid for all \\(t\\)" },
            { id: "wf_3", text: "**Differentiate w.r.t. \\(t\\)**, chain rule on every variable (Topic 13)" },
            { id: "wf_4", text: "**Substitute & solve**, plug known rates and instant values **last**" },
          ],
        },
      ],
      lead: "Four-step workflow + chain rule for time. Differentiate the **general** equation first.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_formula",
          type: "formula_block",
          formulas: [
            "$$\\frac{dy}{dt}=\\frac{dy}{dx}\\cdot\\frac{dx}{dt}$$",
            "Circle area: \\(A=\\pi r^2\\Rightarrow \\frac{dA}{dt}=2\\pi r\\frac{dr}{dt}\\).",
          ],
        },
      ],
      media: {
        id: "right_area_rate",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Area rate: \\(dA/dt=2\\pi r\\,dr/dt\\)",
        caption: "Probe \\(r\\): steeper \\(A\\) curve when \\(r\\) is larger.",
        formulaLabel: "A",
        plot: {
          plotType: "y_equals",
          formula: "A=\\pi r^2",
          expr: "pi*x*x",
          xDomain: [0, 6],
          yDomain: [0, 120],
          tags: [{ text: "dA/dt ∝ r", x: 4.2, y: 90 }],
          probe: true,
          probeDefault: 3,
        },
        params: { x: 3 },
      },
    },
    notes:
      "theorem_box chain-rule-for-time + nested_bullets 4-step workflow. Circle area flex_plot on right as template.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: WARM-UPS + PYTHAGOREAN
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s03_warm_up_expanding_square",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: Expanding Square",
    question: "Before I reveal: what step do many students get wrong when starting related rates?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "A=s^2,\\ \\frac{ds}{dt}=3\\ \\text{cm/s},\\ s=5\\ \\text{cm}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\frac{dA}{dt}=2s\\frac{ds}{dt}",
              gap: "tight",
              say: "Differentiate A equals s squared w.r.t. time.",
            },
            {
              id: "step_2",
              math: "\\frac{dA}{dt}=2(5)(3)",
              gap: "tight",
              say: "Substitute s equals 5 and ds/dt equals 3.",
            },
            {
              id: "step_3",
              math: "30\\ \\text{cm}^2/\\text{s}",
              say: "Area increases thirty square cm per second.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Which mistake is most common on slide 1?",
          reveal: {
            text: "**Substituting numbers before differentiating.** Keep \\(A=s^2\\) symbolic until after the derivative.",
          },
        },
      ],
      lead: "Side grows at 3 cm/s. When \\(s=5\\) cm, how fast is area increasing?",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_square_area",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Area vs side: \\(A=s^2\\)",
        caption: "Parabola: at \\(s=5\\), slope \\(dA/ds=2s=10\\); times \\(ds/dt=3\\) gives 30.",
        formulaLabel: "A",
        plot: {
          plotType: "y_equals",
          formula: "A=s^2",
          expr: "x*x",
          xDomain: [0, 9],
          yDomain: [0, 80],
          tags: [{ text: "(5,25)", x: 5, y: 25 }],
          vLines: [{ x: 5 }],
          probe: true,
          probeDefault: 5,
        },
        params: { x: 5 },
      },
    },
    notes:
      "math_solution_steps warm-up + pause_and_reveal on common mistake. flex_plot A=s² with probe at s=5.",
  },
  {
    id: "s04_the_pythagorean_model",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Pythagorean Model",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$x(t)^2+y(t)^2=z(t)^2$$",
            "$$2x\\frac{dx}{dt}+2y\\frac{dy}{dt}=2z\\frac{dz}{dt}$$",
            "**Rule:** differentiate first, do **not** plug in \\(x,y,z\\) before the derivative.",
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Ladders, radar, shadows, any right triangle with changing sides uses this template (Topic 14 implicit diff on \\(t\\)).",
        },
      ],
      lead: "Pythagorean link + implicit differentiation w.r.t. \\(t\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_ladder_triangle",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Ladder triangle: \\(x^2+y^2=100\\)",
        caption: "Hypotenuse fixed at 10 ft: base \\(x\\), height \\(y=\\sqrt{100-x^2}\\).",
        formulaLabel: "y",
        plot: {
          plotType: "y_equals",
          formula: "y=\\sqrt{100-x^2}",
          expr: "sqrt(100-x*x)",
          xDomain: [0, 10],
          yDomain: [0, 11],
          tags: [
            { text: "x (base)", x: 6, y: 1.5 },
            { text: "y (height)", x: 2, y: 8.5 },
          ],
          probe: true,
          probeDefault: 6,
        },
        params: { x: 6 },
        scriptedTimeline: [
          { t: 0, params: { x: 3 } },
          { t: 5, params: { x: 6 } },
          { t: 10, params: { x: 8 } },
        ],
      },
    },
    notes:
      "Pythagorean formula_block + ladder triangle flex_plot. Sets up pause ladder on s05.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: LADDER
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s05_pause_try_sliding_ladder",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause & Try: Sliding Ladder (Pause)",
    question: "Solve for dy/dt: show the equation and the numerical answer.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "A **10-ft** ladder rests against a wall. The base slides away at **2 ft/s**. How fast is the top sliding **down** when the base is **6 ft** from the wall?",
        },
        {
          id: "left_checklist",
          type: "nested_bullets",
          items: [
            { id: "c1", text: "Variables: \\(x(t)\\) base distance, \\(y(t)\\) height" },
            { id: "c2", text: "Equation: \\(x^2+y^2=100\\)" },
            { id: "c3", text: "Differentiate w.r.t. \\(t\\), then substitute" },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and try",
          prompt: "Work it on paper, reveal when ready.",
          reveal: {
            text: "**Hint:** \\(2x\\dot{x}+2y\\dot{y}=0\\). At \\(x=6\\), \\(y=8\\). Expect a **negative** \\(\\dot{y}\\) (top moves down).",
          },
        },
      ],
      lead: "Classic ladder, pause the video and run the four-step workflow.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_ladder_pause",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Ladder at \\(x=6\\) ft",
        caption: "\\(dx/dt=2\\) ft/s given; find \\(dy/dt\\).",
        formulaLabel: "y",
        plot: {
          plotType: "y_equals",
          formula: "y=\\sqrt{100-x^2}",
          expr: "sqrt(100-x*x)",
          xDomain: [0, 10],
          yDomain: [0, 11],
          tags: [
            { text: "x=6", x: 6, y: 1.2 },
            { text: "y=8", x: 1.5, y: 8 },
          ],
          vLines: [{ x: 6 }],
          probe: true,
          probeDefault: 6,
        },
        params: { x: 6 },
      },
    },
    notes:
      "Real YouTube pause with checklist + hint reveal. Same ladder geometry as s04, frozen at x=6.",
  },
  {
    id: "s06_sliding_ladder_solution",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Sliding Ladder: Solution",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          splitAfter: 3,
          problem: "x^2+y^2=100,\\ \\frac{dx}{dt}=2\\ \\text{ft/s},\\ x=6",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "2x\\frac{dx}{dt}+2y\\frac{dy}{dt}=0",
              gap: "tight",
              say: "Differentiate Pythagorean relation w.r.t. time.",
            },
            {
              id: "step_2",
              math: "\\frac{dy}{dt}=-\\frac{x}{y}\\frac{dx}{dt}",
              gap: "tight",
              say: "Solve for dy/dt.",
            },
            {
              id: "step_3",
              math: "y=\\sqrt{100-36}=8",
              gap: "tight",
              say: "Find y when x equals 6.",
            },
            {
              id: "step_4",
              parts: [
                { math: "\\frac{dy}{dt}" },
                { math: "-\\frac{6}{8}(2)=-1.5\\ \\text{ft/s}", op: "=" },
              ],
              say: "Top slides down at one and a half ft per second.",
            },
          ],
        },
      ],
      lead: "Negative sign means the top moves **downward**, trust the geometry.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_sign",
          type: "paragraph",
          text: "**Sign check:** base moves away ⇒ height decreases ⇒ \\(\\frac{dy}{dt}<0\\).",
        },
      ],
      media: {
        id: "right_ladder_solution",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Solution point \\((6,8)\\)",
        caption: "Ladder length 10 ft: rates linked by \\(2x\\dot{x}+2y\\dot{y}=0\\).",
        formulaLabel: "y",
        plot: {
          plotType: "y_equals",
          expr: "sqrt(100-x*x)",
          xDomain: [0, 10],
          yDomain: [0, 11],
          tags: [{ text: "(6,8) dy/dt=-1.5", x: 6, y: 8 }],
          probe: true,
          probeDefault: 6,
        },
        params: { x: 6 },
      },
    },
    notes:
      "Full ladder math_solution_steps with splitAfter. Sign interpretation on right.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: SIMILAR TRIANGLES + SHADOW + CONE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s07_the_similar_triangles_technique",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Similar Triangles + Moving Shadow",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "When two variables share the same angles (cone, lamp shadow), **ratios are constant**, eliminate one variable before differentiating.",
        },
        {
          id: "body_shadow",
          type: "math_solution_steps",
          problem: "\\text{Lamp }15\\text{ ft, person }6\\text{ ft, }\\frac{dx}{dt}=5\\text{ ft/s}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "s=\\frac{L}{L-h}\\,x=\\frac{15}{9}\\,x=\\frac{5}{3}x",
              gap: "tight",
              say: "Similar triangles: shadow length s in terms of distance x.",
            },
            {
              id: "step_2",
              math: "\\frac{ds}{dt}=\\frac{5}{3}\\frac{dx}{dt}",
              gap: "tight",
              say: "Differentiate w.r.t. time.",
            },
            {
              id: "step_3",
              parts: [
                { math: "\\left.\\frac{ds}{dt}\\right|_{x=10}" },
                { math: "\\frac{25}{3}\\ \\text{ft/s}", op: "=" },
              ],
              say: "Shadow tip moves twenty-five thirds ft per second when person is 10 ft from lamp.",
            },
          ],
        },
      ],
      lead: "Cone tanks and lamp-post shadows both use \\(\\frac{r}{h}=\\text{constant}\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_ratio",
          type: "formula_block",
          formulas: [
            "Cone: \\(\\dfrac{r}{h}=\\dfrac{R}{H}\\Rightarrow r=\\dfrac{R}{H}h\\)",
            "Shadow: \\(s=\\dfrac{L}{L-h}\\,x\\)",
          ],
        },
      ],
      media: {
        id: "right_shadow_line",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Shadow length \\(s=\\frac{5}{3}x\\)",
        caption: "Linear link from similar triangles: differentiate before substituting \\(x=10\\).",
        formulaLabel: "s",
        plot: {
          plotType: "y_equals",
          formula: "s=\\frac{5}{3}x",
          expr: "(5/3)*x",
          xDomain: [0, 14],
          yDomain: [0, 24],
          tags: [{ text: "x=10 → s=50/3", x: 10, y: 16.7 }],
          probe: true,
          probeDefault: 10,
        },
        params: { x: 10 },
      },
    },
    notes:
      "Similar triangles for cone + shadow math_solution_steps. flex_plot shadow linear relation.",
  },
  {
    id: "s08_tricky_conical_tank",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Tricky: Conical Tank (Pause · Medium)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          splitAfter: 3,
          problem: "H=12,\\ R=4,\\ \\frac{dV}{dt}=5\\ \\text{ft}^3/\\text{min},\\ h=6",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "V=\\frac{1}{3}\\pi r^2 h,\\ \\frac{r}{h}=\\frac{1}{3}",
              gap: "tight",
              say: "Volume of cone; similar triangles give r equals h over 3.",
            },
            {
              id: "step_2",
              math: "V=\\frac{\\pi}{27}h^3",
              gap: "tight",
              say: "Substitute r to get V in one variable.",
            },
            {
              id: "step_3",
              math: "\\frac{dV}{dt}=\\frac{\\pi}{9}h^2\\frac{dh}{dt}",
              gap: "tight",
              say: "Differentiate w.r.t. time.",
            },
            {
              id: "step_4",
              parts: [
                { math: "\\frac{dh}{dt}" },
                { math: "\\frac{5}{4\\pi}\\approx 0.398\\ \\text{ft/min}", op: "=" },
              ],
              say: "Water level rises about 0.398 ft per minute when h equals 6.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and estimate",
          prompt: "Before step 4: is \\(dh/dt\\) closer to 0.2 or 0.5 ft/min?",
          reveal: {
            text: "**About 0.4 ft/min**, one variable (\\(h\\)) after similar triangles is the key simplification.",
          },
        },
      ],
      lead: "Water in at 5 ft³/min. How fast does depth rise when \\(h=6\\) ft?",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cone_volume",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Cone volume: \\(V=\\frac{\\pi}{27}h^3\\)",
        caption: "Cubic in depth: steepening fill rate as \\(h\\) grows.",
        formulaLabel: "V",
        plot: {
          plotType: "y_equals",
          formula: "V=\\frac{\\pi}{27}h^3",
          expr: "(pi/27)*x*x*x",
          xDomain: [0, 12],
          yDomain: [0, 220],
          tags: [{ text: "h=6", x: 6, y: 28 }],
          vLines: [{ x: 6 }],
          probe: true,
          probeDefault: 6,
        },
        params: { x: 6 },
      },
    },
    notes:
      "Cone math_solution_steps with similar-triangle reduction + pause_and_reveal. flex_plot V vs h.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 5: CHALLENGE + APPLICATIONS + MISTAKES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s09_challenge_optional_the_moment_the_ladder_hits_the_ground",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge: Optional] Ladder Hits the Ground",
    question: "Discuss: What physical assumption fails in the ladder model?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_setup",
          type: "paragraph",
          text: "As \\(x\\to 10\\), \\(y\\to 0\\) and \\(\\frac{dy}{dt}=-\\frac{x}{y}\\frac{dx}{dt}\\to -\\infty\\). The math blows up, the **model** assumes the top stays on the wall.",
        },
        {
          id: "body_blowup",
          type: "math_solution_steps",
          problem: "\\frac{dy}{dt}=-\\frac{x}{\\sqrt{100-x^2}}\\cdot 2",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "x=9.5 \\Rightarrow y\\approx 3.12",
              gap: "tight",
              say: "Near the ground, y is tiny.",
            },
            {
              id: "step_2",
              math: "\\frac{dy}{dt}\\approx -6.1\\ \\text{ft/s}",
              gap: "tight",
              say: "Already very fast downward.",
            },
            {
              id: "step_3",
              math: "x\\to 10^- \\Rightarrow \\frac{dy}{dt}\\to -\\infty",
              say: "Model breaks, ladder detaches in reality.",
            },
          ],
        },
      ],
      lead: "Optional, when assumptions fail, calculus still teaches us where.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_ladder_blowup",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "\\(dy/dt\\) vs base distance \\(x\\)",
        caption: "Magnitude grows without bound as \\(x\\to 10\\): not physical.",
        formulaLabel: "dy/dt",
        plot: {
          plotType: "y_equals",
          formula: "dy/dt=-2x/\\sqrt{100-x^2}",
          expr: "-2*x/sqrt(100-x*x)",
          xDomain: [0, 9.6],
          yDomain: [-40, 2],
          tags: [{ text: "model fails", x: 9.2, y: -25 }],
          probe: true,
          probeDefault: 8,
        },
        params: { x: 8 },
      },
    },
    notes:
      "Optional challenge. flex_plot dy/dt blow-up. Physical assumption: top stays in contact with wall.",
  },
  {
    id: "s10_application_radar_gun_speeding",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Radar Gun & Speeding (Pause · Medium)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          splitAfter: 3,
          problem: "s^2=x^2+50^2,\\ \\frac{ds}{dt}=-80\\ \\text{ft/s},\\ s=130",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "2s\\frac{ds}{dt}=2x\\frac{dx}{dt}",
              gap: "tight",
              say: "Differentiate Pythagorean link w.r.t. time.",
            },
            {
              id: "step_2",
              math: "\\frac{dx}{dt}=\\frac{s}{x}\\frac{ds}{dt}",
              gap: "tight",
              say: "Solve for road speed dx/dt.",
            },
            {
              id: "step_3",
              math: "x=\\sqrt{130^2-50^2}=120",
              gap: "tight",
              say: "Find x when s equals 130.",
            },
            {
              id: "step_4",
              parts: [
                { math: "\\frac{dx}{dt}" },
                { math: "\\frac{130}{120}(-80)\\approx -86.67\\ \\text{ft/s}\\approx 59\\ \\text{mph}", op: "=" },
              ],
              say: "Radar measures closing speed along hypotenuse, not highway speed.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Is highway speed larger or smaller than 80 ft/s?",
          reveal: {
            text: "**Larger**, \\(|dx/dt|=\\frac{s}{x}|ds/dt|>80\\) when \\(s>x\\).",
          },
        },
      ],
      lead: "Police 50 ft from highway, radar gives \\(ds/dt\\), not \\(dx/dt\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_radar_triangle",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Right triangle: \\(s^2=x^2+2500\\)",
        caption: "At \\(s=130\\), \\(x=120\\): car speed along highway exceeds radar rate.",
        formulaLabel: "s",
        plot: {
          plotType: "y_equals",
          formula: "s=\\sqrt{x^2+2500}",
          expr: "sqrt(x*x+2500)",
          xDomain: [0, 200],
          yDomain: [0, 220],
          tags: [{ text: "(120,130)", x: 120, y: 130 }],
          probe: true,
          probeDefault: 120,
        },
        params: { x: 120 },
      },
    },
    notes:
      "Radar math_solution_steps + pause. flex_plot hypotenuse vs highway distance.",
  },
  {
    id: "s11_common_mistake_substituting_before_differentiating",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Common Mistake: Substituting Before Differentiating",
    question: "Why is it wrong to substitute numbers before differentiating?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Differentiate first",
          pairs: [
            {
              label: "❌ Substitute first",
              text: "Plug \\(x=6,y=8\\) into \\(x^2+y^2=100\\) **before** differentiating → \\(36+64=100\\), then \\(\\frac{d}{dt}(100)=0\\). **All rates vanish.**",
            },
            {
              label: "✅ Differentiate first",
              text: "Keep \\(x^2+y^2=100\\), get \\(2x\\frac{dx}{dt}+2y\\frac{dy}{dt}=0\\), **then** substitute \\(x,y\\) and known rates.",
            },
          ],
        },
        {
          id: "left_tip",
          type: "paragraph",
          text: "The equation must hold for **all** \\(t\\), not just the instant. Topic 14 implicit diff on \\(t\\) needs symbols until the last step.",
        },
      ],
      lead: "The #1 related-rates trap, numbers too early kill the rates.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_workflow",
          type: "nested_bullets",
          items: [
            { id: "r1", text: "Symbolic equation → differentiate w.r.t. \\(t\\)" },
            { id: "r2", text: "Algebra for the unknown rate" },
            { id: "r3", text: "Substitute numeric values **last**" },
          ],
        },
      ],
      media: {
        id: "right_ladder_rates",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Ladder: keep \\(x,y\\) symbolic",
        caption: "Instant \\((6,8)\\) is for substitution **after** \\(2x\\dot{x}+2y\\dot{y}=0\\).",
        formulaLabel: "y",
        plot: {
          plotType: "y_equals",
          expr: "sqrt(100-x*x)",
          xDomain: [0, 10],
          yDomain: [0, 11],
          probe: true,
          probeDefault: 6,
        },
        params: { x: 6 },
      },
    },
    notes:
      "misconception_compare wrong vs right. Callback Topic 14. Ladder flex_plot reminder.",
  },
  {
    id: "s12_challenge_optional_theorem_proof_lightweight",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge: Optional] IFT for Related Rates",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Implicit link \\(F(x,y)=0\\)",
          text: "If \\(x(t),y(t)\\) satisfy \\(F(x,y)=0\\), then \\(\\frac{\\partial F}{\\partial x}\\frac{dx}{dt}+\\frac{\\partial F}{\\partial y}\\frac{dy}{dt}=0\\). For \\(x^2+y^2=100\\): \\(2x\\dot{x}+2y\\dot{y}=0\\).",
        },
        {
          id: "body_ift",
          type: "math_solution_steps",
          problem: "F(x,y)=x^2+y^2-100",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "F_x=2x,\\ F_y=2y",
              gap: "tight",
              say: "Partial derivatives of F.",
            },
            {
              id: "step_2",
              math: "2x\\frac{dx}{dt}+2y\\frac{dy}{dt}=0",
              gap: "tight",
              say: "Chain rule on F of x of t, y of t.",
            },
            {
              id: "step_3",
              math: "\\frac{dy}{dt}=-\\frac{F_x}{F_y}\\frac{dx}{dt}=-\\frac{x}{y}\\frac{dx}{dt}",
              say: "Same ladder formula from Topic 14 IFT.",
            },
          ],
        },
      ],
      lead: "Optional, every related-rates problem is implicit differentiation in disguise.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_circle_constraint",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Constraint \\(x^2+y^2=100\\)",
        caption: "Motion stays on the circle: rates perpendicular to gradient \\((2x,2y)\\).",
        formulaLabel: "y",
        plot: {
          plotType: "piecewise",
          formula: "x^2+y^2=100",
          xDomain: [-11, 11],
          yDomain: [-11, 11],
          branches: [
            { expr: "sqrt(100-x*x)", xMin: -10, xMax: 10, stroke: "#2563eb" },
            { expr: "-sqrt(100-x*x)", xMin: -10, xMax: 10, stroke: "#1d4ed8" },
          ],
          probe: true,
          probeDefault: 6,
        },
        params: { x: 6 },
      },
    },
    notes:
      "Optional IFT / multivariable chain rule. Links to Topic 14. Circle flex_plot constraint curve.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 6: LAB + SESSION CLOSE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s13_pro_tips_recap",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Three Related-Rates Templates",
    question: "On the site, try all three tabs, same workflow, different geometry.",
    lead: "Square area, circle area, cone volume, patch the plot and run the four steps.",
    labSiteNote: "On the site, try all three tabs and drag the probe.",
    labExamples: [
      {
        id: "lab_ex_square",
        label: "A · Square",
        formula: "A=s^2",
        steps: [
          { id: "step_1", text: "Link: \\(A=s^2\\)." },
          { id: "step_2", text: "Differentiate: \\(dA/dt=2s\\,ds/dt\\)." },
          { id: "step_3", text: "At \\(s=5\\), \\(ds/dt=3\\) → \\(dA/dt=30\\)." },
        ],
        params: {
          x: 5,
          plot: {
            plotType: "y_equals",
            expr: "x*x",
            formula: "A=s^2",
            xDomain: [0, 9],
            yDomain: [0, 80],
            probeDefault: 5,
          },
        },
      },
      {
        id: "lab_ex_circle",
        label: "B · Circle area",
        formula: "A=\\pi r^2",
        steps: [
          { id: "step_1", text: "Link: \\(A=\\pi r^2\\)." },
          { id: "step_2", text: "Differentiate: \\(dA/dt=2\\pi r\\,dr/dt\\)." },
          { id: "step_3", text: "Radius rate scales with circumference." },
        ],
        params: {
          x: 4,
          plot: {
            plotType: "y_equals",
            expr: "pi*x*x",
            formula: "A=\\pi r^2",
            xDomain: [0, 7],
            yDomain: [0, 160],
            probeDefault: 4,
          },
        },
      },
      {
        id: "lab_ex_cone",
        label: "C · Cone",
        formula: "V=\\frac{\\pi}{27}h^3",
        steps: [
          { id: "step_1", text: "Similar triangles: \\(r=h/3\\)." },
          { id: "step_2", text: "\\(V=\\frac{\\pi}{27}h^3\\)." },
          { id: "step_3", text: "\\(dV/dt=\\frac{\\pi}{9}h^2\\,dh/dt\\)." },
        ],
        params: {
          x: 6,
          plot: {
            plotType: "y_equals",
            expr: "(pi/27)*x*x*x",
            formula: "V=\\frac{\\pi}{27}h^3",
            xDomain: [0, 12],
            yDomain: [0, 220],
            probeDefault: 6,
          },
        },
      },
    ],
    blocks: [],
    media: {
      id: "lab_related_rates",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "Related-rates lab",
      caption: "Switch tabs: square, circle, cone.",
      formulaLabel: "f",
      plot: {
        plotType: "y_equals",
        expr: "x*x",
        formula: "A=s^2",
        xDomain: [0, 9],
        yDomain: [0, 80],
        probe: true,
        probeDefault: 5,
      },
      params: { x: 5 },
    },
    notes:
      "visual_lab, 30s YouTube demo of one tab; site students explore all three. Square / circle / cone templates.",
  },
  {
    id: "s14_learning_objectives_achieved",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways: Session 4 Underway",
    question: "",
    lead: "Related rates turns derivative rules into *changing-world* answers:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Workflow:** draw → link → differentiate w.r.t. \\(t\\) → substitute last (Topics 13–14)." },
          { id: "bullet_2", text: "**Templates:** \\(A=s^2\\), \\(V=\\frac{4}{3}\\pi r^3\\), \\(x^2+y^2=z^2\\), similar triangles, cone volume." },
          { id: "bullet_3", text: "**#1 trap:** substituting numbers before differentiating, use `misconception_compare` habit." },
          { id: "bullet_4", text: "**Signs & units:** negative \\(dy/dt\\) means decreasing; include units in final answers." },
          { id: "bullet_5", text: "**Session 4 arc:** related rates (T15) → critical points & extrema (T16) → MVT & optimization ahead." },
          { id: "bullet_6", text: "**Next, Topic 16:** Critical Points and Extrema on an Interval, where \\(f'(x)=0\\) finds peaks and valleys." },
        ],
      },
      {
        id: "final_check",
        type: "pause_and_reveal",
        title: "Final check",
        prompt: "A square has \\(ds/dt=4\\). When \\(s=3\\), what is \\(dA/dt\\)?",
        reveal: {
          text: "\\(dA/dt=2s\\,ds/dt=2(3)(4)=\\mathbf{24}\\) square units per second.",
        },
      },
    ],
    media: null,
    notes:
      "Six bullets + final pause. Teaser Topic 16 Critical Points. Thank students, Session 4 applications arc continues.",
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
 *   - Replaced placeholders/visual plans with unique flex_plot specs per slide:
 *     balloon r-V, square A=s², ladder triangle, shadow line, cone V(h), radar,
 *     ladder blow-up, circle constraint.
 *   - s13 → visual_lab with square / circle / cone tabs.
 *   - Removed source/sourceSpec/sourceCode/python_code from all blocks/media.
 *
 * RICH BLOCKS
 *   - theorem_box chain-rule-for-time on s02; optional IFT on s12.
 *   - nested_bullets 4-step workflow on s02; misconception_compare on s11.
 *   - math_solution_steps: balloon s01, square s03, ladder s06, shadow s07,
 *     cone s08, radar s10, optional blow-up s09, IFT s12.
 *   - pause_and_reveal on s03, s05, s08, s10, s14 final check.
 *
 * PEDAGOGY
 *   - Welcome-back; Session 3 complete; derivatives solve changing-world problems.
 *   - Roadmap currentId path_topic_15; callbacks Topics 13–14.
 *   - s14 session close + teaser Topic 16 Critical Points.
 *
 * ESTIMATED DURATION: ~20–22 min
 */