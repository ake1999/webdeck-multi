// Hand-enhanced from courses/Calculus/Materials/optimization_problems.json
// See COURSE DESIGN CHANGELOG at bottom.

export const topicMeta = {
  id: "05_optimization_problems",
  title: "Optimization Problems: From Word Problems to Calculus Solutions",
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
    title: "Optimization Problems: From Word Problems to Calculus Solutions",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic 19 · Optimization · ~20 min · first-year university / advanced high school",
    notes:
      "Welcome back, Topic 18 gave you derivative tests for local extrema; Topic 19 applies that toolkit to real constraints. Assumes comfort with critical points and the Closed Interval Method.",
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
        currentId: "path_topic_19",
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
          { id: "path_topic_18", number: 18, session: "S04 Applications of Derivatives", label: "First and Second Derivative Tests", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_19", number: 19, session: "S04 Applications of Derivatives", label: "Optimization Problems", note: "This topic", status: "current", expanded: true },
          { id: "path_topic_20", number: 20, session: "S04 Applications of Derivatives", label: "L'Hopital's Rule", note: "Next", status: "next", expanded: true },
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
      { id: "objective_1", text: "Translate word problems into an **objective function** and **constraint equation**." },
      { id: "objective_2", text: "Follow the five-step optimization workflow from diagram to verified answer." },
      { id: "objective_3", text: "Find absolute extrema using critical points **and** domain endpoints." },
      { id: "objective_4", text: "Interpret results with correct units in the original context." },
      { id: "objective_5", text: "Reduce multivariable setups to a single-variable function before differentiating." },
    ],
    notes:
      "Roadmap: Topic 18 derivative tests → Topic 19 optimization → Topic 20 L'Hopital. Callback first/second derivative tests when verifying maxima and minima.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: HOOK + WORKFLOW LAB
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_why_optimization_matters",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Why Optimization Matters",
    question: "Predict: what width maximizes the fenced area beside a river?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Everyday decisions, **maximize area** with limited fencing, **minimize cost** for fixed volume, **shortest path** problems, all share one pattern: one quantity to optimize, one constraint tying variables together.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "Topic 18 taught *how* to classify critical points. Topic 19 teaches *how to build* the function from English in the first place.",
        },
      ],
      lead: "Real constraints become a single-variable calculus problem.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_farmer_area",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Farmer pen: area vs width",
        caption: "Constraint 2x + y = 2400 ft: drag probe x.",
        formulaLabel: "A",
        plot: {
          plotType: "y_equals",
          formula: "A(x)=x(2400-2x)",
          xDomain: [0, 1200],
          yDomain: [-100000, 800000],
          probe: true,
          probeDefault: 400,
          probeMin: 50,
          probeMax: 1150,
          curves: [
            { id: "area", expr: "x*(2400-2*x)", stroke: "#2563eb", strokeWidth: 4 },
            { id: "constraint_bound", expr: "2400*x-2*x*x", stroke: "#94a3b8", strokeWidth: 2, dashed: true },
          ],
          vLines: [{ x: 600 }],
          filledPoints: [{ x: 600, y: 720000 }],
          tags: [{ text: "max at x = 600 ft", x: 600, y: 720000 }],
        },
        params: { x: 400 },
        scriptedTimeline: [
          { t: 0, params: { x: 200 } },
          { t: 5, params: { x: 600 } },
          { t: 10, params: { x: 900 } },
        ],
      },
    },
    notes:
      "River-side farmer hook. Drag x, area parabola peaks at 600. Do not reveal answer on first pass; let prediction land.\n\nStudent prompt on slide question.",
  },
  {
    id: "s02_the_six_step_framework",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "The Five-Step Optimization Workflow",
    question: "Switch tabs, how does each constraint reshape the objective curve?",
    lead: "Three classic setups. Short workflow on the left; objective + constraint plots on the right.",
    labSiteNote: "On YouTube we demo tab A. On the site, try all three tabs and drag the probe.",
    blocks: [
      {
        id: "body_workflow",
        type: "nested_bullets",
        items: [
          { id: "wf_1", text: "**1. Draw a picture**, label every length, radius, or dimension." },
          { id: "wf_2", text: "**2. Write the constraint**, fixed resource equation (fencing, volume, distance relation)." },
          { id: "wf_3", text: "**3. Write the objective**, quantity to maximize or minimize." },
          { id: "wf_4", text: "**4. Find critical points**, eliminate extra variables, set \\(f'(x)=0\\)." },
          { id: "wf_5", text: "**5. Verify**, compare interior critical values with **endpoints**; interpret with units." },
        ],
      },
    ],
    labExamples: [
      {
        id: "lab_farmer",
        label: "A · River pen",
        formula: "A(x)=x(2400-2x),\\quad 2x+y=2400",
        steps: [
          { id: "step_1", text: "Constraint: 2x + y = 2400 ft (no fence on river)." },
          { id: "step_2", text: "Objective: area A = xy → A(x) = x(2400 − 2x)." },
          { id: "step_3", text: "Parabola opens down, one interior maximum." },
        ],
        params: {
          x: 500,
          plot: {
            plotType: "y_equals",
            formula: "A(x)=x(2400-2x)",
            xDomain: [0, 1200],
            yDomain: [-50000, 750000],
            probe: true,
            probeDefault: 500,
            curves: [{ id: "area", expr: "x*(2400-2*x)", stroke: "#2563eb", strokeWidth: 4 }],
            vLines: [{ x: 600 }],
            filledPoints: [{ x: 600, y: 720000 }],
          },
        },
      },
      {
        id: "lab_box",
        label: "B · Open box",
        formula: "S(x)=x^2+\\frac{128000}{x},\\quad x^2h=32000",
        steps: [
          { id: "step_1", text: "Volume constraint: x²h = 32,000 cm³." },
          { id: "step_2", text: "Surface (open top): S = x² + 4xh." },
          { id: "step_3", text: "After elimination, S(x) has one interior minimum." },
        ],
        params: {
          x: 30,
          plot: {
            plotType: "y_equals",
            formula: "S(x)=x^2+128000/x",
            xDomain: [10, 80],
            yDomain: [4000, 12000],
            probe: true,
            probeDefault: 30,
            curves: [{ id: "surface", expr: "x*x+128000/x", stroke: "#c65a28", strokeWidth: 4 }],
            vLines: [{ x: 40 }],
            filledPoints: [{ x: 40, y: 4800 }],
          },
        },
      },
      {
        id: "lab_cost",
        label: "C · Mixed materials",
        formula: "C(w)=20w^2+\\frac{180}{w},\\quad 2w^2h=10",
        steps: [
          { id: "step_1", text: "Volume: 2w²h = 10 m³; length = 2w." },
          { id: "step_2", text: "Cost: base $10/m², sides $6/m²." },
          { id: "step_3", text: "Minimize C(w) on w > 0, economics classic." },
        ],
        params: {
          x: 2,
          plot: {
            plotType: "y_equals",
            formula: "C(w)=20w^2+180/w",
            xDomain: [0.8, 4],
            yDomain: [100, 350],
            probe: true,
            probeDefault: 2,
            probeMin: 0.8,
            probeMax: 4,
            curves: [{ id: "cost", expr: "20*x*x+180/x", stroke: "#16a34a", strokeWidth: 4 }],
            vLines: [{ x: 1.65 }],
            tags: [{ text: "min ≈ w = 1.65 m", x: 1.65, y: 163 }],
          },
        },
      },
    ],
    media: {
      id: "lab_optimization_flex",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "Objective curves under constraints",
      caption: "Tabs swap problem: probe tracks the active objective.",
      formulaLabel: "Q",
      plot: {
        plotType: "y_equals",
        formula: "A(x)=x(2400-2x)",
        xDomain: [0, 1200],
        yDomain: [-50000, 750000],
        probe: true,
        probeDefault: 500,
        curves: [{ id: "objective", expr: "x*(2400-2*x)", stroke: "#2563eb", strokeWidth: 4 }],
      },
      params: { x: 500 },
      scriptedTimeline: [
        { t: 0, params: { x: 300 } },
        { t: 6, params: { x: 600 } },
      ],
    },
    notes:
      "Five-step nested_bullets + visual_lab with three distinct plot specs. Demo tab A on video; mention B/C exist on site.\n\nStudent prompt on slide question.",
  },
  {
    id: "s03_core_equations_notation",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Core Equations & Notation",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "**Objective (one variable):**",
            "$$ Q = f(x) $$",
            "**Constraint:**",
            "$$ g(x_1, x_2, \\ldots, x_n) = \\text{constant} $$",
            "**Critical points:**",
            "$$ f'(x) = 0 \\quad \\text{or} \\quad f'(x) \\text{ DNE} $$",
          ],
        },
        {
          id: "left_flow",
          type: "nested_bullets",
          items: [
            { id: "flow_1", text: "Word problem → objective + constraint" },
            { id: "flow_2", text: "Eliminate variables → \\(Q = f(x)\\)" },
            { id: "flow_3", text: "\\(f'(x)=0\\) → candidates + **endpoint check**" },
          ],
        },
      ],
      lead: "Same skeleton every time, only the geometry changes.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_objective_constraint",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Constraint eliminates a dimension",
        caption: "Blue = objective A(x); dashed = boundary y = 2400 − 2x.",
        formulaLabel: "A",
        plot: {
          plotType: "y_equals",
          formula: "A(x)=x(2400-2x)",
          xDomain: [0, 1300],
          yDomain: [0, 800000],
          probe: true,
          probeDefault: 600,
          curves: [
            { id: "objective", expr: "x*(2400-2*x)", stroke: "#2563eb", strokeWidth: 4 },
            { id: "length", expr: "2400-2*x", stroke: "#94a3b8", strokeWidth: 3, dashed: true },
          ],
          tags: [{ text: "y from constraint", x: 200, y: 2000 }],
        },
        params: { x: 600 },
        scriptedTimeline: [
          { t: 0, params: { x: 300 } },
          { t: 5, params: { x: 600 } },
        ],
      },
    },
    notes:
      "Formula block + dual-curve flex_plot: objective and constraint-bound length on same axes. Emphasize endpoint/domain language from Topic 16.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: VERIFY EXTREMA + CLASSICS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s04_first_derivative_test_for_open_intervals",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Verifying Extrema: Open Domains & Endpoints",
    question: "When is an interior critical point enough, and when must you check endpoints?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Single critical point on an open interval",
          text: "If \\(f\\) is continuous on \\((a,\\infty)\\) with exactly one critical point \\(c\\): derivative negative before \\(c\\) and positive after → **absolute minimum** at \\(c\\); signs reversed → **absolute maximum**.",
        },
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Interior critical point vs endpoints",
          pairs: [
            {
              label: "❌ Critical point only",
              text: "Find \\(f'(x)=0\\), plug in, stop, ignores domain endpoints where the optimum may live.",
            },
            {
              label: "✅ Critical points + endpoints",
              text: "On \\([0,L]\\) evaluate \\(f\\) at every critical point **and** at \\(x=0\\) and \\(x=L\\); largest/smallest wins.",
            },
          ],
        },
      ],
      lead: "Topic 18 derivative-test signs help on open domains; closed domains need endpoint comparison.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_quadratic_family",
        kind: "calculus_widget",
        widget: "function_transform",
        title: "Parabola family: max vs min",
        caption: "Shift k: watch sign change of slope at the vertex.",
        params: {
          family: "quadratic",
          a: -1,
          b: 0,
          h: 600,
          k: 720000,
        },
        scriptedTimeline: [
          { t: 0, params: { family: "quadratic", a: -1, h: 600, k: 720000 } },
          { t: 5, params: { family: "quadratic", a: 1, h: 40, k: 4800 } },
          { t: 10, params: { family: "quadratic", a: -1, h: 600, k: 720000 } },
        ],
      },
    },
    notes:
      "misconception_compare endpoints vs interior. function_transform quadratic: farmer max (a<0) then box min (a>0). Tie back to Topic 18 first derivative test.\n\nStudent prompt on slide question.",
  },
  {
    id: "s05_pause_try_the_farmer_problem",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Try the Farmer Problem",
    question: "What width and length maximize the area?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "**Problem:** 2400 ft of fencing encloses a rectangle bordering a river (no fence along the river). Maximize **area**.",
        },
        {
          id: "left_workflow_hint",
          type: "nested_bullets",
          items: [
            { id: "hint_1", text: "Draw: width \\(x\\), length \\(y\\), river on one side." },
            { id: "hint_2", text: "Constraint: \\(2x + y = 2400\\)." },
            { id: "hint_3", text: "Objective: \\(A = xy\\). Reduce, differentiate, verify domain \\(0 < x < 1200\\)." },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and solve",
          prompt: "Work the five steps before the next slide.",
          reveal: {
            text: "Target: width 600 ft, length 1200 ft, area 720,000 sq ft, parabola peak at \\(x=600\\).",
          },
        },
      ],
      lead: "Try the full workflow, diagram through verify.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_farmer_pause",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Explore area vs width (no answer label)",
        caption: "Drag x: where does the curve peak?",
        formulaLabel: "A",
        plot: {
          plotType: "y_equals",
          formula: "A(x)=x(2400-2x)",
          xDomain: [0, 1200],
          yDomain: [0, 750000],
          probe: true,
          probeDefault: 450,
          curves: [{ id: "area", expr: "x*(2400-2*x)", stroke: "#2563eb", strokeWidth: 4 }],
        },
        params: { x: 450 },
        scriptedTimeline: [
          { t: 0, params: { x: 250 } },
          { t: 6, params: { x: 800 } },
        ],
      },
    },
    notes:
      "Real pause, no vLine at optimum. Reveal gives dimensions after think beat.\n\nStudent prompt on slide question.",
  },
  {
    id: "s06_farmer_problem_solution",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Farmer Problem Solution",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\text{Maximize } A=xy \\text{ subject to } 2x+y=2400",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "y=2400-2x",
              gap: "tight",
              say: "Solve the fencing constraint for y.",
            },
            {
              id: "step_2",
              math: "A(x)=x(2400-2x)=2400x-2x^2",
              gap: "tight",
              say: "Substitute into the area objective.",
            },
            {
              id: "step_3",
              math: "A'(x)=2400-4x",
              gap: "tight",
              say: "Differentiate, quadratic opens down.",
            },
            {
              id: "step_4",
              math: "2400-4x=0 \\Rightarrow x=600",
              gap: "tight",
              say: "Interior critical point.",
            },
            {
              id: "step_5",
              parts: [
                { math: "y=1200" },
                { math: "A=720000\\text{ ft}^2", op: "," },
              ],
              say: "Back-substitute; second derivative negative confirms maximum.",
            },
          ],
        },
      ],
      lead: "Constraint → single variable → critical point → interpret.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_farmer_solution",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Maximum at x = 600",
        caption: "Vertex matches calculus: domain (0, 1200) keeps it interior.",
        formulaLabel: "A",
        plot: {
          plotType: "y_equals",
          formula: "A(x)=2400x-2x^2",
          xDomain: [0, 1200],
          yDomain: [0, 750000],
          probe: true,
          probeDefault: 600,
          curves: [{ id: "area", expr: "2400*x-2*x*x", stroke: "#2563eb", strokeWidth: 4 }],
          vLines: [{ x: 600 }],
          filledPoints: [{ x: 600, y: 720000 }],
          tags: [{ text: "max area 720,000 ft²", x: 600, y: 720000 }],
        },
        params: { x: 600 },
        scriptedTimeline: [
          { t: 0, params: { x: 300 } },
          { t: 5, params: { x: 600 } },
        ],
      },
    },
    notes:
      "math_solution_steps reveal order: constraint, objective, derivative, solve, interpret. Widget marks optimum.",
  },
  {
    id: "s07_pause_box_with_square_base",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Box with Square Base",
    question: "What base side length minimizes surface area?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "**Problem:** Open-top box with square base, volume **32,000 cm³**. Minimize material = **surface area** \\(S = x^2 + 4xh\\).",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "Constraint: \\(x^2 h = 32{,}000\\). Eliminate \\(h\\) before differentiating.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Sketch S(x) shape, where is the minimum?",
          reveal: {
            text: "Expect a single interior minimum, balance base area vs tall sides.",
          },
        },
      ],
      lead: "Volume fixed → surface area as a function of base side x.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_box_pause",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Surface area S(x) under volume lock",
        caption: "Probe x: curve is not a parabola (rational term 128000/x).",
        formulaLabel: "S",
        plot: {
          plotType: "y_equals",
          formula: "S(x)=x^2+128000/x",
          xDomain: [15, 70],
          yDomain: [4500, 11000],
          probe: true,
          probeDefault: 35,
          curves: [{ id: "surface", expr: "x*x+128000/x", stroke: "#c65a28", strokeWidth: 4 }],
        },
        params: { x: 35 },
        scriptedTimeline: [
          { t: 0, params: { x: 20 } },
          { t: 6, params: { x: 55 } },
        ],
      },
    },
    notes:
      "Pause before solution slide. Mention open top = five faces.\n\nStudent prompt on slide question.",
  },
  {
    id: "s08_box_problem_solution",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Box Problem Solution",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          splitAfter: 3,
          problem: "S(x)=x^2+4xh,\\quad x^2h=32000",
          steps: [
            {
              id: "step_1",
              math: "h=\\frac{32000}{x^2}",
              gap: "tight",
              say: "Isolate height from the volume constraint.",
            },
            {
              id: "step_2",
              math: "S(x)=x^2+\\frac{128000}{x}",
              gap: "tight",
              say: "Surface area as a function of x alone.",
            },
            {
              id: "step_3",
              math: "S'(x)=2x-\\frac{128000}{x^2}",
              gap: "tight",
              say: "Differentiate.",
            },
            {
              id: "step_4",
              math: "2x^3=128000 \\Rightarrow x=40",
              gap: "tight",
              say: "Set derivative equal to zero.",
            },
            {
              id: "step_5",
              parts: [
                { math: "h=20" },
                { math: "S=4800\\text{ cm}^2", op: "," },
              ],
              say: "S double-prime positive at 40, minimum confirmed.",
            },
          ],
        },
      ],
      lead: "Optimal box: 40 × 40 × 20 cm, minimum area 4800 cm².",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_box_solution",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Minimum surface area at x = 40",
        caption: "Cylinder-style tradeoff: wide flat vs tall skinny.",
        formulaLabel: "S",
        plot: {
          plotType: "y_equals",
          formula: "S(x)=x^2+128000/x",
          xDomain: [10, 80],
          yDomain: [4000, 12000],
          probe: true,
          probeDefault: 40,
          curves: [{ id: "surface", expr: "x*x+128000/x", stroke: "#c65a28", strokeWidth: 4 }],
          vLines: [{ x: 40 }],
          filledPoints: [{ x: 40, y: 4800 }],
        },
        params: { x: 40 },
        scriptedTimeline: [
          { t: 0, params: { x: 25 } },
          { t: 5, params: { x: 40 } },
        ],
      },
    },
    notes:
      "splitAfter on math_solution_steps, dense algebra in one block. Widget pins minimum.",
  },
  {
    id: "s09_common_mistake_wrong_side_count",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Common Mistake: Wrong Side Count",
    question: "What is S(x) if the box had a closed top?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Open top vs closed top",
          pairs: [
            {
              label: "❌ Six faces",
              text: "\\(S = 2x^2 + 4xh\\), forgot the problem said **open top**.",
            },
            {
              label: "✅ Five faces",
              text: "\\(S = x^2 + 4xh\\), one base + four sides, no lid.",
            },
          ],
        },
        {
          id: "left_rule",
          type: "paragraph",
          text: "Draw the **net** before writing S. Keywords: *open top*, *no lid*, *without cover*.",
        },
      ],
      lead: "Miscounting faces changes the objective and the optimum.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_surface_compare",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Wrong vs correct surface formulas",
        caption: "Orange = open top; gray dashed = if top included.",
        formulaLabel: "S",
        plot: {
          plotType: "y_equals",
          formula: "S_{\\text{open}}=x^2+128000/x",
          xDomain: [15, 70],
          yDomain: [4500, 14000],
          probe: true,
          probeDefault: 40,
          curves: [
            { id: "open", expr: "x*x+128000/x", stroke: "#c65a28", strokeWidth: 4 },
            { id: "closed", expr: "2*x*x+128000/x", stroke: "#94a3b8", strokeWidth: 3, dashed: true },
          ],
          tags: [{ text: "closed top shifts curve up", x: 50, y: 11000 }],
        },
        params: { x: 40 },
        scriptedTimeline: [
          { t: 0, params: { x: 30 } },
          { t: 5, params: { x: 40 } },
        ],
      },
    },
    notes:
      "misconception_compare on face count. flex_plot overlays open vs closed surface curves.\n\nStudent prompt: closed top gives S = 2x² + 4xh.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: COST. GEOMETRY. APPLICATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s10_tricky_example_box_with_different_material_costs",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Tricky Example: Box with Different Material Costs",
    question: "Why is total side area 6wh and not 8wh?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_problem",
          type: "paragraph",
          text: "**Problem:** Open-top rectangular container, volume 10 m³, length = 2 × width. Base costs **$10/m²**, sides **$6/m²**. Minimize cost.",
        },
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "C=10(2w^2)+6(\\text{side area}),\\quad 2w^2h=10",
          steps: [
            {
              id: "step_1",
              math: "\\text{Sides}=2(wh)+2(2w\\cdot h)+2(wh)=6wh",
              gap: "tight",
              say: "Two widths, two lengths, two heights, open top.",
            },
            {
              id: "step_2",
              math: "C(w)=20w^2+36wh,\\quad h=\\frac{5}{w^2}",
              gap: "tight",
              say: "Cost function with volume constraint.",
            },
            {
              id: "step_3",
              math: "C(w)=20w^2+\\frac{180}{w}",
              gap: "tight",
              say: "Single-variable cost.",
            },
            {
              id: "step_4",
              math: "C'(w)=40w-\\frac{180}{w^2}=0 \\Rightarrow w^3=4.5",
              gap: "tight",
              say: "Critical point solve.",
            },
            {
              id: "step_5",
              math: "w\\approx 1.65\\text{ m},\\ h\\approx 1.84\\text{ m}",
              say: "Interpret dimensions and minimum cost ≈ $163.",
            },
          ],
        },
      ],
      lead: "Revenue/cost classics weight area by price per square meter.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cost_curve",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Cost C(w) with volume constraint baked in",
        caption: "Green curve: minimum near w ≈ 1.65 m.",
        formulaLabel: "C",
        plot: {
          plotType: "y_equals",
          formula: "C(w)=20w^2+180/w",
          xDomain: [0.8, 4],
          yDomain: [120, 320],
          probe: true,
          probeDefault: 2,
          curves: [{ id: "cost", expr: "20*x*x+180/x", stroke: "#16a34a", strokeWidth: 4 }],
          vLines: [{ x: 1.65 }],
          filledPoints: [{ x: 1.65, y: 163 }],
        },
        params: { x: 2 },
        scriptedTimeline: [
          { t: 0, params: { x: 1.2 } },
          { t: 5, params: { x: 1.65 } },
          { t: 10, params: { x: 3 } },
        ],
      },
    },
    notes:
      "Side area 6wh: length 2w gives front/back 2wh each plus two sides 2wh, not 8wh. math_solution_steps + cost flex_plot.\n\nStudent prompt on slide question.",
  },
  {
    id: "s11_edge_case_point_on_a_line_closest_to_origin",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Edge Case: Point on a Line Closest to Origin",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_problem",
          type: "paragraph",
          text: "**Problem:** Closest point on \\(y = 2x + 1\\) to the origin.",
        },
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\min\\ d^2=x^2+(2x+1)^2",
          steps: [
            {
              id: "step_1",
              math: "f(x)=x^2+(2x+1)^2=5x^2+4x+1",
              gap: "tight",
              say: "Minimize distance squared, same minimizer, smoother derivative.",
            },
            {
              id: "step_2",
              math: "f'(x)=10x+4=0 \\Rightarrow x=-\\frac{2}{5}",
              gap: "tight",
              say: "Critical point.",
            },
            {
              id: "step_3",
              math: "y=\\frac{1}{5}",
              gap: "tight",
              say: "Back-substitute into the line.",
            },
            {
              id: "step_4",
              math: "\\left(-\\frac{2}{5},\\frac{1}{5}\\right)",
              say: "Closest point; f double-prime positive, minimum.",
            },
          ],
        },
      ],
      lead: "Skip the square root until the end, optimize \\(d^2\\) instead.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_closest_point",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Closest point on y = 2x + 1",
        caption: "Red marker: perpendicular-ish shortest segment to origin.",
        formulaLabel: "d",
        plot: {
          plotType: "y_equals",
          formula: "y=2x+1",
          xDomain: [-1, 1],
          yDomain: [-1, 3],
          probe: true,
          probeDefault: -0.4,
          curves: [{ id: "line", expr: "2*x+1", stroke: "#2563eb", strokeWidth: 4 }],
          filledPoints: [
            { x: 0, y: 0 },
            { x: -0.4, y: 0.2 },
          ],
          tags: [
            { text: "origin", x: 0, y: 0 },
            { text: "closest (-0.4, 0.2)", x: -0.4, y: 0.2 },
          ],
        },
        params: { x: -0.4 },
        scriptedTimeline: [
          { t: 0, params: { x: -0.8 } },
          { t: 5, params: { x: -0.4 } },
        ],
      },
    },
    notes:
      "Distance minimization via d². flex_plot line + highlighted points. Trick reappears in multivariable calc.",
  },
  {
    id: "s12_application_lifeguard_problem_snell_s_law",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Lifeguard Problem (Snell's Law)",
    question: "If swim speed is much slower than run speed, where does P move?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_problem",
          type: "paragraph",
          text: "Lifeguard at A (beach) must reach swimmer at B (water). Run speed \\(v_1\\), swim \\(v_2\\). Choose shoreline entry point \\(P=(x,0)\\) to **minimize time**.",
        },
        {
          id: "left_bullets",
          type: "nested_bullets",
          items: [
            { id: "lg_1", text: "\\(T(x)=\\frac{\\sqrt{x^2+a^2}}{v_1}+\\frac{\\sqrt{(d-x)^2+b^2}}{v_2}\\)" },
            { id: "lg_2", text: "\\(T'(x)=0\\) yields \\(\\frac{\\sin\\theta_1}{v_1}=\\frac{\\sin\\theta_2}{v_2}\\), **Snell's Law**." },
            { id: "lg_3", text: "Same rule as light refraction, calculus meets physics." },
          ],
        },
      ],
      lead: "Minimize time, not distance, speeds weight each leg.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_lifeguard_time",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Total time T(x) along shore",
        caption: "a=10, b=10, d=20, v₁=5, v₂=2: probe entry point x.",
        formulaLabel: "T",
        plot: {
          plotType: "y_equals",
          formula: "T(x)=\\sqrt{x^2+100}/5+\\sqrt{(20-x)^2+100}/2",
          xDomain: [0, 20],
          yDomain: [4, 12],
          probe: true,
          probeDefault: 10,
          probeMin: 0,
          probeMax: 20,
          curves: [{ id: "time", expr: "sqrt(x*x+100)/5+sqrt((20-x)*(20-x)+100)/2", stroke: "#7c3aed", strokeWidth: 4 }],
          tags: [{ text: "single interior minimum", x: 12, y: 7 }],
        },
        params: { x: 10 },
        scriptedTimeline: [
          { t: 0, params: { x: 5 } },
          { t: 5, params: { x: 14 } },
          { t: 10, params: { x: 10 } },
        ],
      },
    },
    notes:
      "Lifeguard/Snell application. Slower swim → P shifts toward perpendicular from B. flex_plot T(x).\n\nStudent prompt on slide question.",
  },
  {
    id: "s13_challenge_optional_proof_of_the_first_derivative_test_for_absolute_extrema",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Proof of the First Derivative Test for Absolute Extrema",
    question: "Why can't endpoint sign changes fake an interior minimum?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_proof",
          type: "proof_sketch",
          title: "Absolute min on (0, ∞) with one critical point",
          text: "If \\(f'(x)<0\\) for \\(x<c\\) and \\(f'(x)>0\\) for \\(x>c\\), then for \\(x<c\\) MVT gives \\(f(x)>f(c)\\); for \\(x>c\\) similarly \\(f(x)>f(c)\\). Hence \\(f(c)\\) is the global minimum.",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Uses **Mean Value Theorem** (Topic 17) + sign of \\(f'\\) on each side, rigorous justification for skipping endpoint search on open domains with one critical point.",
        },
      ],
      lead: "Optional depth, connects MVT to optimization verification.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_open_interval_min",
        kind: "calculus_widget",
        widget: "function_transform",
        title: "Single valley on (0, ∞)",
        caption: "Derivative negative then positive: one global min.",
        params: { family: "quadratic", a: 1, b: 0, h: 3, k: -2 },
        scriptedTimeline: [
          { t: 0, params: { a: 1, h: 3, k: -2 } },
          { t: 6, params: { a: 1, h: 5, k: -4 } },
        ],
      },
    },
    notes:
      "Optional proof sketch for advanced viewers. Skip if time-limited.\n\nStudent prompt on slide question.",
  },
  {
    id: "s14_summary_optimization_problem_solving",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Summary: Optimization Problem-Solving",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_recap",
          type: "nested_bullets",
          items: [
            { id: "sum_1", text: "**Translate:** diagram → constraint → objective." },
            { id: "sum_2", text: "**Reduce:** one variable, differentiate, solve \\(f'=0\\)." },
            { id: "sum_3", text: "**Verify:** interior critical values **and domain endpoints**." },
            { id: "sum_4", text: "**Interpret:** units, context, sanity-check the shape." },
          ],
        },
        {
          id: "left_teaser",
          type: "paragraph",
          text: "**Next:** Topic 20, **L'Hopital's Rule** for limits that substitution cannot crack.",
        },
      ],
      lead: "Optimization = translate → reduce → differentiate → verify → interpret.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_table",
          type: "math_table",
          headers: ["Objective", "Key takeaway"],
          rows: [
            ["Formulate", "Five-step workflow; draw before you differentiate"],
            ["Reduce", "Constraint eliminates extra variables"],
            ["Extrema", "Critical points + endpoints; Topic 18 tests confirm type"],
            ["Avoid traps", "Count faces; minimize \\(d^2\\) not \\(d\\); weight costs"],
          ],
        },
      ],
    },
    notes:
      "Calm recap. Tease L'Hopital by name. Callback Topics 16–18 (domain, MVT, derivative tests).",
  },
];

export default slidesData;

/*
 * COURSE DESIGN CHANGELOG. 05_optimization_problems (June 2026 hand-enhance)
 *
 * v1 adapter → v2 hand-enhanced:
 *   - Removed sourceMaterial, python_code, sourceSpec metadata.
 *   - Welcome back; callback Topic 18 derivative tests; path_topic_19 current.
 *   - s02 → visual_lab + five-step nested_bullets; three tabs (farmer/box/cost).
 *   - math_solution_steps on s06 farmer, s08 box, s10 cost, s11 closest point.
 *   - flex_plot unique per slide (area, surface, cost, line geometry, lifeguard T).
 *   - function_transform quadratic on s04 (max/min gallery) and s13 optional.
 *   - misconception_compare: s04 endpoints vs interior; s09 open vs closed top.
 *   - pause_and_reveal on s05, s07 with real think beats.
 *   - Text slides converted to two-col where widgets or dense steps appear.
 *   - Summary teases Topic 20 L'Hopital.
 */