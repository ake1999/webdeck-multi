// Generated from courses/Calculus/Materials/newtons_method_and_linear_approximations.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "07_newtons_method_and_linear_approximations",
  title: "Newton's Method and Linear Approximations",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/newtons_method_and_linear_approximations.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES. Session 4 finale
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "Newton's Method and Linear Approximations",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic 21 • Session 4 finale: Applications of Derivatives • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back, Topic 19 optimization and Topic 20 L'Hôpital are fresh. Topic 21 closes Session 4: tangent lines as local linear models, then Newton iteration for roots. Callback Topic 9 tangent line y=f(a)+f′(a)(x−a). Next session: integration (Topic 22 antiderivatives).",
  },
  {
    id: "learning_objectives",
    type: "bullets",
    hud: "Arian University • Calculus 1",
    title: "Learning Objectives",
    lead: "Session 4 finale, linear models and root-finding close the derivative-applications arc.",
    blocks: [
      {
        id: "calculus1_roadmap",
        type: "course_path",
        layout: "topic_grid",
        currentId: "path_topic_21",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", note: "", status: "completed" },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", note: "", status: "completed" },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", note: "", status: "completed" },
          { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", note: "", status: "completed" },
          { id: "path_topic_05", number: 5, session: "S02 Limits and Continuity", label: "One-Sided Limits and Limits at Infinity", note: "", status: "completed" },
          { id: "path_topic_06", number: 6, session: "S02 Limits and Continuity", label: "The Squeeze Theorem", note: "", status: "completed" },
          { id: "path_topic_07", number: 7, session: "S02 Limits and Continuity", label: "Continuity and the Intermediate Value Theorem", note: "", status: "completed" },
          { id: "path_topic_08", number: 8, session: "S03 Derivative Foundations and Rules", label: "Instantaneous Rate of Change", note: "", status: "completed" },
          { id: "path_topic_09", number: 9, session: "S03 Derivative Foundations and Rules", label: "Formal Definition of the Derivative", note: "", status: "completed" },
          { id: "path_topic_10", number: 10, session: "S03 Derivative Foundations and Rules", label: "Power Rule and Basic Properties of Derivatives", note: "", status: "completed" },
          { id: "path_topic_11", number: 11, session: "S03 Derivative Foundations and Rules", label: "Power, Constant Multiple, Sum, and Difference Rules", note: "", status: "completed" },
          { id: "path_topic_12", number: 12, session: "S03 Derivative Foundations and Rules", label: "The Product Rule for Derivatives", note: "", status: "completed" },
          { id: "path_topic_13", number: 13, session: "S03 Derivative Foundations and Rules", label: "The Chain Rule", note: "", status: "completed" },
          { id: "path_topic_14", number: 14, session: "S03 Derivative Foundations and Rules", label: "Implicit Differentiation", note: "", status: "completed" },
          { id: "path_topic_15", number: 15, session: "S04 Applications of Derivatives", label: "Related Rates", note: "", status: "completed" },
          { id: "path_topic_16", number: 16, session: "S04 Applications of Derivatives", label: "Critical Points and Extrema on an Interval", note: "", status: "completed" },
          { id: "path_topic_17", number: 17, session: "S04 Applications of Derivatives", label: "Rolle's Theorem and the Mean Value Theorem", note: "", status: "completed" },
          { id: "path_topic_18", number: 18, session: "S04 Applications of Derivatives", label: "First and Second Derivative Tests", note: "", status: "completed" },
          { id: "path_topic_19", number: 19, session: "S04 Applications of Derivatives", label: "Optimization Problems", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_20", number: 20, session: "S04 Applications of Derivatives", label: "L'Hopital's Rule", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_21", number: 21, session: "S04 Applications of Derivatives", label: "Newton's Method and Linear Approximations", note: "This topic", status: "current", expanded: true },
          { id: "path_topic_22", number: 22, session: "S05 Integration Foundations", label: "Antiderivatives and Indefinite Integrals", note: "Next", status: "next", expanded: true },
          { id: "path_topic_23", number: 23, session: "S05 Integration Foundations", label: "Approximating Area with Riemann Sums", note: "", status: "upcoming" },
          { id: "path_topic_24", number: 24, session: "S05 Integration Foundations", label: "The Definite Integral", note: "", status: "upcoming" },
          { id: "path_topic_25", number: 25, session: "S05 Integration Foundations", label: "The Fundamental Theorem of Calculus", note: "", status: "upcoming" },
          { id: "path_topic_26", number: 26, session: "S05 Integration Foundations", label: "Integration by Substitution", note: "", status: "upcoming" },
        ],
      },
    ],
    bullets: [
      { id: "objective_1", text: "Build **linear approximations** \\(L(x)=f(a)+f'(a)(x-a)\\) and estimate nearby values." },
      { id: "objective_2", text: "Interpret **Newton's method** as repeated tangent-line root steps." },
      { id: "objective_3", text: "Apply \\(x_{n+1}=x_n-f(x_n)/f'(x_n)\\) to roots with 4–6 decimal accuracy." },
      { id: "objective_4", text: "Diagnose failures: \\(f'(x_n)=0\\), bad \\(x_0\\), or poor local linear fit." },
      { id: "objective_5", text: "Connect Session 4 arc (Topics 15–21) to **integration** in Session 5." },
    ],
    notes:
      "Orient on roadmap, Topics 1–20 done, Topic 21 current, Topic 22 antiderivatives next. Callback optimization + L'Hôpital: derivatives now solve limits and equations numerically.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: LINEAR APPROXIMATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_the_foggy_trail_analogy",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Linear Approximation: The Tangent Line Formula",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Linear approximation at \\(x=a\\)",
          text: "If \\(f\\) is differentiable at \\(a\\), the **linear approximation** (tangent-line model) is \\[L(x)=f(a)+f'(a)(x-a).\\] Near \\(a\\), \\(L(x)\\approx f(x)\\), the tangent is the **best first-order** match to the curve.",
        },
        {
          id: "left_callback",
          type: "paragraph",
          text: "**Callback Topic 9:** same tangent line from the formal derivative. **Callback Topics 19–20:** we already used derivatives for optimization and indeterminate limits, now for quick estimates and root-finding.",
        },
      ],
      lead: "The tangent line is the best **linear** stand-in for \\(f\\) near \\(a\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_secant_tangent",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Secant → tangent at \\(a\\)",
        caption: "Shrink \\(h\\): secant slope → \\(f'(a)\\); green line = \\(L(x)\\).",
        formulaLabel: "f",
        params: { a: 1, h: 0.9 },
        scriptedTimeline: [
          { t: 0, params: { a: 1, h: 1.2 } },
          { t: 5, params: { a: 1, h: 0.35 } },
          { t: 10, params: { a: 1, h: 0.06 } },
        ],
      },
    },
    notes:
      "theorem_box is the must-remember linear approx formula. secant_tangent on f(x)=x²: as h→0, secant becomes tangent, best linear approx near a. Welcome-back tone; do not re-introduce Arian.",
  },
  {
    id: "s02_the_newton_iteration_formula",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Newton's Method: The Iteration Formula",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$",
          ],
        },
        {
          id: "left_analogy",
          type: "paragraph",
          text: "**Foggy-trail picture:** you cannot see the river (root), but you lay a straight stick along the slope at your feet (tangent), walk to where it hits the water (x-intercept), and repeat.",
        },
      ],
      lead: "Each step uses the **tangent line** as a local linear model, then jumps to its x-intercept.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_newton_geometry",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Tangent intercept → \\(x_{n+1}\\)",
        caption: "Vertical leg \\(f(x_n)\\); horizontal leg \\(f(x_n)/f'(x_n)\\).",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          formula: "f(x)=x^3-2*x+1",
          xDomain: [0, 1.6],
          yDomain: [-0.5, 1.2],
          curves: [
            { expr: "x^3-2*x+1", stroke: "#2563eb", strokeWidth: 3 },
          ],
          hLines: [{ y: 0 }],
          filledPoints: [{ x: 0.5, y: 0.125 }],
          tags: [
            { text: "x_n", x: 0.5, y: 0.02 },
            { text: "f(x_n)", x: 0.42, y: 0.08 },
          ],
          probe: true,
          probeDefault: 0.5,
        },
        params: { x: 0.5 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 6, params: { x: 0.72 } },
        ],
      },
    },
    notes:
      "State Newton formula. Right-triangle geometry: subtract f/f′ from x_n to reach tangent x-intercept. flex_plot on cubic crossing axis, unique geometry slide.",
  },
  {
    id: "s03_derivation_in_five_steps",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Derivation: Tangent Intercept → Newton Step",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "\\text{Tangent at }(x_n,f(x_n))\\text{ meets }y=0",
          steps: [
            {
              id: "step_1",
              math: "y = f(x_n) + f'(x_n)(x - x_n)",
              gap: "tight",
              say: "Tangent line equation at the current guess.",
            },
            {
              id: "step_2",
              op: "=>",
              math: "0 = f(x_n) + f'(x_n)(x - x_n)",
              gap: "tight",
              say: "Set y equal to zero for the x-intercept.",
            },
            {
              id: "step_3",
              math: "-f(x_n) = f'(x_n)(x - x_n)",
              gap: "tight",
              say: "Isolate the correction term.",
            },
            {
              id: "step_4",
              math: "x - x_n = -\\frac{f(x_n)}{f'(x_n)}",
              gap: "tight",
              say: "Divide by the derivative slope.",
            },
            {
              id: "step_5",
              math: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}",
              gap: "loose",
              say: "Rename the intercept x_{n+1}.",
            },
          ],
        },
      ],
      lead: "Tangent line → set \\(y=0\\) → solve for \\(x\\). That's Newton's update.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_derivation_plot",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "x-intercept of the tangent",
        caption: "Algebra matches the dashed tangent hitting the axis.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [-0.2, 1.4],
          yDomain: [-0.3, 1.1],
          curves: [
            { expr: "x^3-2*x+1", stroke: "#2563eb", strokeWidth: 3 },
            { expr: "0.125+2.5*(x-0.5)", stroke: "#16a34a", dashed: true, strokeWidth: 2 },
          ],
          hLines: [{ y: 0 }],
          filledPoints: [{ x: 0.5, y: 0.125 }, { x: 0.72, y: 0 }],
          probe: false,
        },
        params: {},
      },
    },
    notes:
      "Reveal derivation steps in order. Same tangent template as linear approx L(x), but solve L(x)=0 for the next root guess. flex_plot: solid curve + dashed tangent to x-intercept.",
  },
  {
    id: "s04_interactive_visual_step_through_newton_s_method",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Linear Approx & Newton Starting Points",
    question: "How far from \\(a\\) can you trust \\(L(x)\\)? Which \\(x_0\\) converges fastest?",
    lead: "Three tabs, linear models at different anchors, then Newton on \\(x^2-2\\).",
    labSiteNote: "On the site, try all three tabs and drag the probe / starting point.",
    labExamples: [
      {
        id: "lab_ex_exp",
        label: "A · e^x at 0",
        formula: "L(x)=1+x",
        steps: [
          { id: "step_1", text: "Curve: f(x)=e^x; tangent at a=0 is L(x)=1+x." },
          { id: "step_2", text: "Drag probe near 0.1, L tracks f closely." },
          { id: "step_3", text: "Move probe to x=2, error grows (not global!)." },
        ],
        params: {
          x: 0.12,
          plot: {
            plotType: "y_equals",
            xDomain: [-0.5, 2.5],
            yDomain: [-0.5, 4],
            curves: [
              { expr: "exp(x)", stroke: "#2563eb", strokeWidth: 3 },
              { expr: "1+x", stroke: "#16a34a", dashed: true, strokeWidth: 2 },
            ],
            filledPoints: [{ x: 0, y: 1 }],
            vLines: [{ x: 0 }],
            probe: true,
            probeDefault: 0.12,
          },
        },
      },
      {
        id: "lab_ex_sqrt",
        label: "B · √x at 4",
        formula: "L(x)=2+\\frac{x-4}{4}",
        steps: [
          { id: "step_1", text: "At a=4: f(4)=2, f′(4)=1/4." },
          { id: "step_2", text: "Use L(4.2)≈2.05 to estimate √4.2." },
          { id: "step_3", text: "Stay near x=4 for best accuracy." },
        ],
        params: {
          x: 4.2,
          plot: {
            plotType: "y_equals",
            xDomain: [2, 6],
            yDomain: [1.5, 2.6],
            curves: [
              { expr: "sqrt(x)", stroke: "#2563eb", strokeWidth: 3 },
              { expr: "2+(x-4)/4", stroke: "#16a34a", dashed: true, strokeWidth: 2 },
            ],
            filledPoints: [{ x: 4, y: 2 }],
            vLines: [{ x: 4 }],
            probe: true,
            probeDefault: 4.2,
          },
        },
      },
      {
        id: "lab_ex_newton",
        label: "C · Newton on x²−2",
        formula: "x_{n+1}=x_n-\\frac{x_n^2-2}{2x_n}",
        steps: [
          { id: "step_1", text: "Try x₀=2, one tangent step lands near √2." },
          { id: "step_2", text: "Try x₀=0.5, still converges, slower start." },
          { id: "step_3", text: "Try x₀=−1, may cycle; good x₀ matters." },
        ],
        params: {
          x: 2,
          plot: {
            plotType: "y_equals",
            xDomain: [-1.5, 2.5],
            yDomain: [-2.5, 3],
            curves: [
              { expr: "x^2-2", stroke: "#2563eb", strokeWidth: 3 },
            ],
            hLines: [{ y: 0 }],
            filledPoints: [{ x: 2, y: 2 }],
            tags: [{ text: "x₀=2", x: 2, y: 2.3 }],
            probe: true,
            probeDefault: 2,
          },
        },
      },
    ],
    blocks: [
      {
        id: "lab_pause",
        type: "pause_and_reveal",
        title: "Pause and predict",
        prompt: "On tab C: will x₀=−1 converge to √2 or wander?",
        reveal: { text: "Often cycles or diverges, Newton needs a sensible starting guess near the root." },
      },
    ],
    media: {
      id: "lab_linear_newton",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "e^x and tangent L(x)=1+x",
      caption: "Switch tabs: each plot is unique.",
      formulaLabel: "f",
      plot: {
        plotType: "y_equals",
        xDomain: [-0.5, 2.5],
        yDomain: [-0.5, 4],
        curves: [
          { expr: "exp(x)", stroke: "#2563eb", strokeWidth: 3 },
          { expr: "1+x", stroke: "#16a34a", dashed: true, strokeWidth: 2 },
        ],
        filledPoints: [{ x: 0, y: 1 }],
        probe: true,
        probeDefault: 0.12,
      },
      params: { x: 0.12 },
    },
    notes:
      "visual_lab with 3 tabs per spec. YouTube: demo tab A (~30s), mention B/C on site. Pause on Newton starting-point sensitivity.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: WORKED EXAMPLES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s05_warm_up_square_root_of_5",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Linear Approx: Estimate e^0.1",
    question: "True value e^0.1 ≈ 1.10517, how close is L(0.1)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f(x)=e^x,\\quad a=0,\\quad \\text{estimate } e^{0.1}",
          steps: [
            {
              id: "step_1",
              math: "f(0)=1,\\quad f'(0)=1",
              gap: "tight",
              say: "Anchor values at zero.",
            },
            {
              id: "step_2",
              math: "L(x)=1+1\\cdot(x-0)=1+x",
              gap: "tight",
              say: "Build the linear approximation.",
            },
            {
              id: "step_3",
              math: "L(0.1)=1+0.1=1.1",
              gap: "tight",
              say: "Plug in the nearby point.",
            },
            {
              id: "step_4",
              math: "e^{0.1}\\approx 1.1052",
              gap: "loose",
              say: "Error about 0.005, excellent near a=0.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and check",
          prompt: "Would L(0.1) still be accurate if we anchored at a=2 instead?",
          reveal: { text: "No, linear approx is only reliable **near** the anchor point a." },
        },
      ],
      lead: "At a=0, e^x looks almost like its tangent line 1+x.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_exp_linear",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "e^x vs L(x)=1+x",
        caption: "Solid = f; dashed = tangent at 0.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [-0.3, 0.5],
          yDomain: [0.85, 1.2],
          curves: [
            { expr: "exp(x)", stroke: "#2563eb", strokeWidth: 3 },
            { expr: "1+x", stroke: "#16a34a", dashed: true, strokeWidth: 2 },
          ],
          filledPoints: [{ x: 0, y: 1 }, { x: 0.1, y: 1.10517 }],
          vLines: [{ x: 0 }],
          probe: true,
          probeDefault: 0.1,
        },
        params: { x: 0.1 },
      },
    },
    notes:
      "First linear approx worked example. math_solution_steps + pause on 'near a' theme. flex_plot zoomed near origin, unique from lab tab A domain.",
  },
  {
    id: "s06_standard_cubic_with_linear_term",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Linear Approx: Estimate √4.2",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f(x)=\\sqrt{x},\\quad a=4,\\quad \\text{estimate } \\sqrt{4.2}",
          steps: [
            {
              id: "step_1",
              math: "f(4)=2,\\quad f'(x)=\\frac{1}{2\\sqrt{x}}\\Rightarrow f'(4)=\\frac{1}{4}",
              gap: "tight",
              say: "Values at the anchor a equals 4.",
            },
            {
              id: "step_2",
              math: "L(x)=2+\\frac{1}{4}(x-4)",
              gap: "tight",
              say: "Tangent line model.",
            },
            {
              id: "step_3",
              math: "L(4.2)=2+\\frac{0.2}{4}=2.05",
              gap: "tight",
              say: "Evaluate at 4.2.",
            },
            {
              id: "step_4",
              math: "\\sqrt{4.2}\\approx 2.0494",
              gap: "loose",
              say: "Error under 0.001, strong local estimate.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Estimate √9.1 using a=9 before revealing steps.",
          reveal: { text: "L(x)=3+(x−9)/(6); L(9.1)≈3.0167 vs √9.1≈3.0166." },
        },
      ],
      lead: "Square roots are a classic linear-approximation calculator trick.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_sqrt_linear",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "√x vs tangent at 4",
        caption: "Probe x=4.2: curves nearly coincide.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [3.5, 5],
          yDomain: [1.85, 2.3],
          curves: [
            { expr: "sqrt(x)", stroke: "#2563eb", strokeWidth: 3 },
            { expr: "2+(x-4)/4", stroke: "#16a34a", dashed: true, strokeWidth: 2 },
          ],
          filledPoints: [{ x: 4, y: 2 }],
          vLines: [{ x: 4 }],
          probe: true,
          probeDefault: 4.2,
        },
        params: { x: 4.2 },
      },
    },
    notes:
      "Second linear approx example (√x at 4). pause_and_reveal stretch problem. flex_plot tight window around x=4.",
  },
  {
    id: "s07_misconception_division_by_zero",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Misconceptions: Far from a & Bad Newton Starts",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Two common traps",
          pairs: [
            {
              label: "❌ Linear approx anywhere",
              text: "Use \\(L(x)=1+x\\) from \\(a=0\\) to estimate \\(e^{2}\\). Error is huge, \\(L\\) only matches \\(f\\) **near** \\(a\\).",
            },
            {
              label: "✅ Linear approx locally",
              text: "Pick \\(a\\) close to your target; check \\(|x-a|\\) is small. Graph \\(f\\) and \\(L\\) together to see the fit.",
            },
            {
              label: "❌ Any Newton start works",
              text: "Blindly apply \\(x_{n+1}=x_n-f/f'\\) with \\(f'(x_n)=0\\) or \\(x_0\\) far from the root → division by zero, cycles, or divergence.",
            },
            {
              label: "✅ Newton with care",
              text: "Sketch \\(f\\); start near a sign change; verify \\(f'(x_n)\\neq 0\\). If one \\(x_0\\) fails, try another.",
            },
          ],
        },
      ],
      lead: "\\(L(x)\\) is local; Newton needs a **good** \\(x_0\\) and nonzero slope.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_far_error",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "e^x vs L(x)=1+x at x=2",
        caption: "Same tangent: terrible fit far from a=0.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [-0.5, 2.5],
          yDomain: [-0.5, 8],
          curves: [
            { expr: "exp(x)", stroke: "#2563eb", strokeWidth: 3 },
            { expr: "1+x", stroke: "#16a34a", dashed: true, strokeWidth: 2 },
          ],
          filledPoints: [{ x: 0, y: 1 }, { x: 2, y: 7.389 }],
          probe: true,
          probeDefault: 2,
        },
        params: { x: 2 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.15 } },
          { t: 5, params: { x: 2 } },
        ],
      },
    },
    notes:
      "misconception_compare covers both linear-approx 'global' trap and Newton starting-point trap. Timeline moves probe from near 0 to x=2 to dramatize error growth.",
  },
  {
    id: "s08_tricky_avoiding_the_zero_derivative_trap",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Newton Warm-Up: Square Root of 5",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f(x)=x^2-5,\\quad x_0=2,\\quad \\text{find } x_2",
          steps: [
            {
              id: "step_1",
              math: "f'(x)=2x",
              gap: "tight",
              say: "Derivative for the iteration.",
            },
            {
              id: "step_2",
              math: "f(2)=-1,\\quad f'(2)=4",
              gap: "tight",
              say: "Evaluate at the start.",
            },
            {
              id: "step_3",
              math: "x_1=2-\\frac{-1}{4}=2.25",
              gap: "tight",
              say: "First Newton step.",
            },
            {
              id: "step_4",
              math: "x_2=2.25-\\frac{0.0625}{4.5}\\approx 2.2361",
              gap: "loose",
              say: "Second step, already four decimals of √5.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and verify",
          prompt: "Plug x₂ back into x²−5, how close to zero?",
          reveal: { text: "f(2.2361)≈0.00006, excellent for two iterations from x₀=2." },
        },
      ],
      lead: "Newton on x²−5 is the Babylonian square-root algorithm in disguise.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_sqrt5_newton",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=x²−5",
        caption: "Root near √5 ≈ 2.236.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [1.5, 2.6],
          yDomain: [-1.5, 2],
          curves: [{ expr: "x^2-5", stroke: "#2563eb", strokeWidth: 3 }],
          hLines: [{ y: 0 }],
          filledPoints: [{ x: 2, y: -1 }, { x: 2.25, y: 0.0625 }],
          probe: true,
          probeDefault: 2.25,
        },
        params: { x: 2.25 },
      },
    },
    notes:
      "Newton warm-up with math_solution_steps. Babylonian method x_{n+1}=(x_n+a/x_n)/2 for √a. pause_and_reveal verification.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: FAILURE MODES + NEWTON DEPTH
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s09_challenge_optional_pause_and_predict_convergence_or_divergence",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Newton Standard: x³+2x−4=0",
    question: "Find x₃ starting from x₁=1.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "x^3+2x-4=0,\\quad x_1=1",
          steps: [
            {
              id: "step_1",
              math: "f'(x)=3x^2+2",
              gap: "tight",
              say: "Differentiate the cubic.",
            },
            {
              id: "step_2",
              math: "x_2=1-\\frac{-1}{5}=1.2",
              gap: "tight",
              say: "First update from x1 equals 1.",
            },
            {
              id: "step_3",
              math: "f(1.2)=0.128,\\quad f'(1.2)=6.32",
              gap: "tight",
              say: "Evaluate at x2.",
            },
            {
              id: "step_4",
              math: "x_3=1.2-\\frac{0.128}{6.32}\\approx 1.1797",
              gap: "loose",
              say: "Third iterate to four decimals.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause first",
          prompt: "Compute x₂ yourself before revealing step 2.",
          reveal: { text: "x₂=1.2, keep 6+ decimals internally during iterations." },
        },
      ],
      lead: "Exam-style Newton: keep extra precision between steps.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cubic_root",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=x³+2x−4",
        caption: "Single real root ≈ 1.18.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [0.5, 1.5],
          yDomain: [-1.2, 0.8],
          curves: [{ expr: "x^3+2*x-4", stroke: "#2563eb", strokeWidth: 3 }],
          hLines: [{ y: 0 }],
          filledPoints: [{ x: 1, y: -1 }, { x: 1.2, y: 0.128 }],
          probe: true,
          probeDefault: 1.18,
        },
        params: { x: 1.18 },
      },
    },
    notes:
      "Standard cubic Newton example with pause before revealing x₂. flex_plot confirms root location.",
  },
  {
    id: "s10_challenge_optional_solution_cube_root_divergence",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Misconception: Division by Zero in Newton",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f(x)=x^3-3x+1,\\quad x_0=1",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "f(1)=-1,\\quad f'(1)=0",
              gap: "tight",
              say: "Derivative vanishes at the guess.",
            },
            {
              id: "step_2",
              math: "x_1=1-\\frac{-1}{0}",
              gap: "tight",
              say: "Formula blows up, horizontal tangent.",
            },
            {
              id: "step_3",
              math: "\\text{No x-intercept}",
              gap: "loose",
              say: "Tangent never crosses the axis; pick a new x0.",
            },
          ],
        },
        {
          id: "left_fix",
          type: "paragraph",
          text: "**Fix:** start at \\(x_0=0\\) instead, then \\(f'(0)=-3\\) and Newton converges toward the root near \\(0.347\\).",
        },
      ],
      lead: "If \\(f'(x_n)=0\\), the tangent is horizontal, Newton stops.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_horizontal_tangent",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Horizontal tangent at x=1",
        caption: "f′(1)=0: no x-intercept.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [-1.5, 2.5],
          yDomain: [-2.5, 3.5],
          curves: [
            { expr: "x^3-3*x+1", stroke: "#2563eb", strokeWidth: 3 },
            { expr: "-1", stroke: "#dc2626", dashed: true, strokeWidth: 2 },
          ],
          hLines: [{ y: 0 }],
          filledPoints: [{ x: 1, y: -1 }],
          vLines: [{ x: 1 }],
          probe: false,
        },
        params: {},
      },
    },
    notes:
      "Division-by-zero trap with math_solution_steps. flex_plot: cubic + dashed horizontal tangent at (1,−1). Forward pointer: try x₀=0 on next mental check.",
  },
  {
    id: "s11_application_car_loan_interest_rate",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Newton Iterations on f(x)=x²−2 (√2)",
    question: "Watch x₀, x₁, x₂ march toward √2 ≈ 1.41421.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f(x)=x^2-2,\\quad x_0=2",
          steps: [
            {
              id: "step_1",
              math: "x_1=2-\\frac{2}{4}=1.5",
              gap: "tight",
              say: "First tangent step from x0 equals 2.",
            },
            {
              id: "step_2",
              math: "x_2=1.5-\\frac{0.25}{3}\\approx 1.4167",
              gap: "tight",
              say: "Second iterate.",
            },
            {
              id: "step_3",
              math: "x_3\\approx 1.4142",
              gap: "loose",
              say: "Already matches √2 to four decimals.",
            },
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "**Real power:** same template solves loan-rate equations and transcendental equations (e.g. \\(\\cos x = x\\)) that have no closed-form root.",
        },
      ],
      lead: "Quadratic convergence: correct digits roughly **double** each step.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_newton_sqrt2",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "x₀ → x₁ → x₂ on x²−2",
        caption: "Probe walks the Newton iterates toward √2.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [1.3, 2.2],
          yDomain: [-0.5, 2.5],
          curves: [{ expr: "x^2-2", stroke: "#2563eb", strokeWidth: 3 }],
          hLines: [{ y: 0 }],
          filledPoints: [
            { x: 2, y: 2 },
            { x: 1.5, y: -0.25 },
            { x: 1.41667, y: 0.0069 },
          ],
          tags: [
            { text: "x₀", x: 2, y: 2.2 },
            { text: "x₁", x: 1.5, y: 0.15 },
            { text: "x₂", x: 1.42, y: 0.15 },
          ],
          probe: true,
          probeDefault: 2,
        },
        params: { x: 2 },
        scriptedTimeline: [
          { t: 0, params: { x: 2 } },
          { t: 4, params: { x: 1.5 } },
          { t: 8, params: { x: 1.4167 } },
          { t: 12, params: { x: 1.4142 } },
        ],
      },
    },
    notes:
      "Core Newton visualization, scriptedTimeline moves probe x₀→x₁→x₂→x₃ on x²−2. Mention car-loan / cos x=x as applications without full loan algebra (time).",
  },
  {
    id: "s12_interactive_convergence_vs_initial_guess",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge] Cube Root: Convergence or Divergence?",
    question: "Will Newton on f(x)=x^{1/3} with x₀=1 converge to 0?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Root at \\(x=0\\), but \\(f'(x)=\\frac{1}{3}x^{-2/3}\\) blows up at 0, the tangent is nearly **vertical** near the root.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Write your prediction: converge to 0, or diverge?",
          reveal: { text: "**Diverges**, iterates bounce: 1 → −2 → 4 → −8 → …" },
        },
      ],
      lead: "Even with a root at 0, Newton can fail when the linear model is poor.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cuberoot",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x)=x^{1/3}",
        caption: "Vertical tangent at 0: poor local linear fit.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          xDomain: [-3, 5],
          yDomain: [-2, 2],
          curves: [{ expr: "x^(1/3)", stroke: "#2563eb", strokeWidth: 3 }],
          hLines: [{ y: 0 }],
          filledPoints: [{ x: 1, y: 1 }, { x: -2, y: -1.26 }],
          probe: true,
          probeDefault: 1,
        },
        params: { x: 1 },
        scriptedTimeline: [
          { t: 0, params: { x: 1 } },
          { t: 5, params: { x: -2 } },
          { t: 10, params: { x: 4 } },
        ],
      },
    },
    notes:
      "Optional challenge pause. Cube-root divergence, vertical tangent at root. Probe timeline 1→−2→4 dramatizes bounce.",
  },
  {
    id: "s13_convergence_behavior_quadratic_convergence",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "[Challenge] Solution: Cube Root Divergence",
    question: "",
    lead: "Confirmed: Newton is not foolproof when \\(f'(r)\\) is 0 or undefined at the root.",
    blocks: [
      {
        id: "body_table",
        type: "math_table",
        headers: ["Step", "x_n", "f(x_n)", "f′(x_n)", "x_{n+1}"],
        rows: [
          ["0", "1", "1", "1/3", "−2"],
          ["1", "−2", "≈ −1.26", "≈ 0.21", "4"],
          ["2", "4", "≈ 1.59", "≈ 0.21", "−8"],
        ],
      },
      {
        id: "body_note",
        type: "paragraph",
        text: "**Lesson:** quadratic convergence needs \\(f'(r)\\neq 0\\) and a starting guess in the basin of attraction. Linear approx fails for the same reason, the tangent is a bad global model.",
      },
    ],
    media: null,
    notes:
      "Reveal after s12 pause. Table shows bouncing sequence. Tie back to linear-approx 'only near a' theme.",
  },
  {
    id: "s14_practice_problem_ladder",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Car Loan Interest Rate",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_setup",
          type: "paragraph",
          text: "**Problem:** \\$18,000 loan, 60 monthly payments of \\$375. Find monthly rate \\(x\\) in \\(48x(1+x)^{60}-(1+x)^{60}+1=0\\).",
        },
        {
          id: "body_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "x_0=0.01\\text{ (1% monthly)}",
          steps: [
            {
              id: "step_1",
              math: "f(0.01)\\approx 0.0553,\\quad f'(0.01)\\approx 31.25",
              gap: "tight",
              say: "Evaluate f and f prime at the guess.",
            },
            {
              id: "step_2",
              math: "x_1=0.01-\\frac{0.0553}{31.25}\\approx 0.00823",
              gap: "tight",
              say: "One Newton step.",
            },
            {
              id: "step_3",
              math: "x\\approx 0.00823\\text{ (0.823% monthly)}",
              gap: "loose",
              say: "Refine with one or two more steps for exams.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and sanity-check",
          prompt: "Is 0.8% monthly plausible for this payment?",
          reveal: { text: "Yes, roughly 10% annual; payment exceeds interest-only on 18k." },
        },
      ],
      lead: "No algebraic solve, Newton handles messy exponentials.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_ladder",
          type: "nested_bullets",
          items: [
            { id: "easy", text: "**Easy:** \\(f(x)=x^3-8\\), \\(x_0=2\\) → \\(x_1=2\\) (already at root)." },
            { id: "med", text: "**Medium:** \\(\\cos x=x\\), \\(x_0=1\\) → \\(x_2\\approx 0.7391\\)." },
            { id: "hard", text: "**Hard:** \\(x^5-x-1=0\\), \\(x_0=1\\) → root \\(\\approx 1.167304\\) (6 decimals)." },
          ],
        },
        {
          id: "ladder_pause",
          type: "pause_and_reveal",
          title: "Practice pause",
          prompt: "Try the medium problem before watching the next slide.",
          reveal: { text: "Cos x − x needs Newton, no closed form; two steps already close." },
        },
      ],
    },
    notes:
      "Real-world loan rate as math_solution_steps. Right column: optional practice ladder with pause. Skim ladder on video; students work medium/hard offline.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: TIPS + SESSION 4 FINALE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s15_pro_tips_for_newton_s_method",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Pro Tips: Linear Approx & Newton",
    question: "",
    lead: "Workflow: build \\(L(x)\\) near \\(a\\) → estimate; or iterate \\(x_{n+1}\\) for roots.",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "tip_1", text: "**Linear approx:** anchor at nearby \\(a\\); report \\(L(x)\\), not \\(f(x)\\), for estimates." },
          { id: "tip_2", text: "**Newton:** compute \\(f(x_n)\\) and \\(f'(x_n)\\) separately; keep 6–8 decimals mid-iteration." },
          { id: "tip_3", text: "**Check:** plug root back into \\(f(x)\\) ≈ 0; plug estimate into \\(f\\) vs \\(L\\) for linear approx." },
          { id: "tip_4", text: "**√a shortcut:** \\(x_{n+1}=\\frac{1}{2}(x_n+a/x_n)\\) (Babylonian / Newton on \\(x^2-a\\))." },
          { id: "tip_5", text: "**Sketch first**, pick \\(a\\) or \\(x_0\\) where the tangent is meaningful (\\(f'\\neq 0\\))." },
        ],
      },
    ],
    media: null,
    notes:
      "Compact exam tips for both techniques. Graph-first advice echoes optimization (Topic 19) habit.",
  },
  {
    id: "s16_summary_key_takeaways",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways: Session 4 Complete",
    question: "What is L(x) at a=0 for f(x)=e^x?",
    lead: "You finished the derivative-applications arc. Session 5 opens **integration**.",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Topic 15, Related rates:** differentiate linked equations as quantities change in time." },
          { id: "bullet_2", text: "**Topics 16–18, Curve shape:** critical points, MVT, and derivative tests locate extrema and concavity." },
          { id: "bullet_3", text: "**Topic 19, Optimization:** model constraints, find max/min on practical domains." },
          { id: "bullet_4", text: "**Topic 20, L'Hôpital:** resolve indeterminate forms with derivatives (callback to limits)." },
          { id: "bullet_5", text: "**Topic 21, Linear approx:** \\(L(x)=f(a)+f'(a)(x-a)\\) estimates values **near** \\(a\\)." },
          { id: "bullet_6", text: "**Topic 21, Newton:** \\(x_{n+1}=x_n-f/f'\\) finds roots fast when \\(x_0\\) and \\(f'\\) cooperate." },
        ],
      },
      {
        id: "body_teaser",
        type: "paragraph",
        text: "**Next, Session 5, Topic 22: Antiderivatives and Indefinite Integrals**, reverse differentiation; families \\(F(x)+C\\); the bridge to area and the Fundamental Theorem of Calculus.",
      },
      {
        id: "final_check",
        type: "pause_and_reveal",
        title: "Final check",
        prompt: "L(x) for e^x at 0, then estimate e^0.05 mentally.",
        reveal: { text: "L(x)=1+x → L(0.05)=1.05 (true e^0.05≈1.0513)." },
      },
    ],
    media: null,
    notes:
      "Session 4 finale recap, six bullets span Topics 15–21. Tease Topic 22 antiderivatives by name. Final pause ties linear approx to e^x. Celebrate completing derivative applications.",
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
 *   - secant_tangent on s01 (tangent as best linear approx near a).
 *   - flex_plot on s02–s03, s05–s12 (unique curve+tangent specs per slide).
 *   - s04 visual_lab: 3 tabs (e^x@0, √x@4, Newton x²−2 starting points).
 *   - s11 scriptedTimeline probe x₀→x₁→x₂ on √2 iteration.
 *   - Removed all source/sourceCode/sourceSpec/python metadata from media.
 *
 * RICH BLOCKS
 *   - theorem_box on s01 (linear approximation L(x)).
 *   - math_solution_steps on s03, s05–s06, s08–s11, s14 (linear + Newton).
 *   - misconception_compare on s07 (far-from-a linear approx + bad Newton x₀).
 *   - pause_and_reveal on s04, s05–s06, s08–s09, s12, s14, s16.
 *
 * PEDAGOGY
 *   - Welcome-back; callbacks Topics 19 (optimization) and 20 (L'Hôpital).
 *   - Roadmap currentId path_topic_21; Topics 1–20 completed.
 *   - Session 4 finale: s16 six bullets Topics 15–21 + Topic 22 antiderivatives teaser.
 *   - Linear approx taught before Newton; both share tangent-line DNA from Topic 9.
 *
 * ESTIMATED DURATION: ~20–22 min
 */