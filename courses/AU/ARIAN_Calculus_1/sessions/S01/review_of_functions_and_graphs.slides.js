// Generated from courses/Calculus/Materials/review_of_functions_and_graphs.json
// Enhanced by course design review — see changelog at bottom of file.
// Re-run `npm run convert:calculus-test` or `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "review_of_functions_and_graphs",
  title: "Review of Functions and Graphs",
  hudDefault: "Arian University — Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial:
    "courses/Calculus/Materials/review_of_functions_and_graphs.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University — Calculus 1",
    title: "Review of Functions and Graphs",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: Functions and Their Transformations • ~30 min • first-year university / advanced high school",
    notes:
      "Assumes familiarity with Cartesian coordinates, the concept of a function as a mapping from inputs to outputs, and basic algebra including solving equations and inequalities.",
  },
  {
    id: "learning_objectives",
    type: "bullets",
    hud: "Arian University — Calculus 1",
    title: "Learning Objectives",
    lead: "By the end of this session you will be able to:",
    blocks: [
      {
        id: "calculus1_roadmap",
        type: "course_path",
        layout: "topic_grid",
        currentId: "path_topic_01",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", note: "Today", status: "current", expanded: true },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", note: "Next", status: "next", expanded: true },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", status: "upcoming" },
          { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", status: "upcoming" },
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
      {
        id: "objective_1",
        text: "Identify and classify essential function families (linear, quadratic, power, polynomial, rational, trigonometric, exponential, logarithmic).",
      },
      {
        id: "objective_2",
        text: "Find domains and ranges of functions systematically.",
      },
      {
        id: "objective_3",
        text: "Apply transformations (shifts, reflections, stretches) to graph functions from parent graphs.",
      },
      {
        id: "objective_4",
        text: "Calculate compositions of functions and determine their domains.",
      },
      {
        id: "objective_5",
        text: "Identify even and odd symmetry from a formula or graph.",
      },
      {
        id: "objective_6",
        text: "Analyze piecewise functions algebraically and graphically.",
      },
    ],
    notes:
      "Use this slide to frame the lesson promise. Walk through each objective briefly—don't dwell. The six bullets map exactly to the six content blocks that follow, so students can use this as a checklist.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1 — HOOK + FUNCTION FAMILIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_functions_are_like_vending_machines",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "Functions Are Like Vending Machines",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Each button (**input** \\(x\\)) gives exactly one snack (**output** \\(f(x)\\)). The **domain** is the set of working buttons; the **range** is the snacks available. **Transformations** move the whole machine without changing which button produces which snack.",
        },
      ],
      lead: "**Function**: each **input** → exactly one **output**. **Domain**: all valid inputs. **Range**: all possible outputs.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_image",
        kind: "image",
        src: "courses/AU/ARIAN_Calculus_1/sessions/S01/media/Draw_vending_machine_with_snacks_202606131220.jpeg",
        alt: "Vending machine metaphor diagram",
        caption: "",
        fit: "contain",
      },
    },
    notes:
      "Think of a function like a vending machine. You press button 3 and you always get the same snack—no surprises. That's the one-input-one-output rule. The domain is the set of buttons that actually work; some might be broken or missing. The range is the set of snacks you can actually get out.\n\nNow imagine you can move that vending machine across the room, flip it upside down, or stretch it taller. That's exactly what function transformations do: the button-to-snack relationship stays the same, but the graph shifts or scales in predictable ways. We'll use this analogy throughout the session.",
  },
  {
    id: "s02_function_families_at_a_glance",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "Function Families at a Glance",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "Linear: \\(f(x)=mx+b\\)",
            "Quadratic: \\(f(x)=ax^2+bx+c\\)",
            "Power: \\(f(x)=x^a\\)  (\\(a\\) any real constant)",
            "Polynomial: \\(f(x)=a_n x^n+\\dots +a_0\\)",
            "Rational: \\(f(x)=P(x)/Q(x)\\)",
            "Trigonometric: \\(\\sin x,\\cos x,\\tan x\\)",
            "Exponential: \\(f(x)=a^x\\)",
            "Logarithmic: \\(f(x)=\\log_a x\\)",
          ],
          text: "Linear: \\(f(x)=mx+b\\)\nQuadratic: \\(f(x)=ax^2+bx+c\\)\nPower: \\(f(x)=x^a\\)\nPolynomial: \\(f(x)=a_n x^n+\\dots +a_0\\)\nRational: \\(f(x)=P(x)/Q(x)\\)\nTrigonometric: \\(\\sin x,\\cos x,\\tan x\\)\nExponential: \\(f(x)=a^x\\)\nLogarithmic: \\(f(x)=\\log_a x\\)",
        },
      ],
      lead: "Eight core **function** families — each has a signature graph shape.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_function_transform",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "family_gallery",
        title: "Gallery of eight function graphs",
        caption: "",
        params: {
          family: "linear",
          a: 1,
          b: 1,
          h: 0,
          k: 0,
        },
        source: "Generated from calculus material visual_spec.",
        sourceSpec:
          "Create a 2×4 grid of subplots. Top row: linear (slope 1, intercept 0), quadratic (x²), power (√x), cubic (x³). Bottom row: rational (1/x), sine, exponential (2^x), logarithmic (log₂x). Each subplot: distinct colour, title, grid, clean axes. x-range ≈ −3 to 3 with y-range adjusted per family to show key shape clearly. No interactive controls needed.",
        sourceCode:
          "import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.linspace(-3, 3, 400)\nfig, axes = plt.subplots(2, 4, figsize=(12, 6))\naxes[0,0].plot(x, x, 'b'); axes[0,0].set_title('Linear')\naxes[0,1].plot(x, x**2, 'r'); axes[0,1].set_title('Quadratic')\naxes[0,2].plot(x[x>0], np.sqrt(x[x>0]), 'g'); axes[0,2].set_title('Power (√x)')\naxes[0,3].plot(x, x**3, 'm'); axes[0,3].set_title('Polynomial (x³)')\nxr = x[x!=0]\naxes[1,0].plot(xr, 1/xr, 'c'); axes[1,0].set_ylim(-5,5); axes[1,0].set_title('Rational')\naxes[1,1].plot(x, np.sin(x), 'orange'); axes[1,1].set_title('Sine')\naxes[1,2].plot(x, 2**x, 'purple'); axes[1,2].set_title('Exponential')\naxes[1,3].plot(x[x>0], np.log2(x[x>0]), 'brown'); axes[1,3].set_title('Logarithmic')\nfor ax in axes.flat: ax.grid(True, alpha=0.3)\nplt.tight_layout(); plt.show()",
        scriptedTimeline: [
          { t: 0,  params: { family: "linear",      a: 1,  b: 1, h: 0, k: 0 } },
          { t: 4,  params: { family: "quadratic",   a: 1,  b: 1, h: 0, k: 0 } },
          { t: 8,  params: { family: "exponential", a: 2,  b: 1, h: 0, k: 0 } },
        ],
      },
      source: {
        python_code:
          "import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.linspace(-3, 3, 400)\nfig, axes = plt.subplots(2, 4, figsize=(12, 6))\naxes[0,0].plot(x, x, 'b'); axes[0,0].set_title('Linear')\naxes[0,1].plot(x, x**2, 'r'); axes[0,1].set_title('Quadratic')\naxes[0,2].plot(x[x>0], np.sqrt(x[x>0]), 'g'); axes[0,2].set_title('Power (√x)')\naxes[0,3].plot(x, x**3, 'm'); axes[0,3].set_title('Polynomial (x³)')\nxr = x[x!=0]\naxes[1,0].plot(xr, 1/xr, 'c'); axes[1,0].set_ylim(-5,5); axes[1,0].set_title('Rational')\naxes[1,1].plot(x, np.sin(x), 'orange'); axes[1,1].set_title('Sine')\naxes[1,2].plot(x, 2**x, 'purple'); axes[1,2].set_title('Exponential')\naxes[1,3].plot(x[x>0], np.log2(x[x>0]), 'brown'); axes[1,3].set_title('Logarithmic')\nfor ax in axes.flat: ax.grid(True, alpha=0.3)\nplt.tight_layout(); plt.show()",
      },
    },
    notes:
      "Before we transform functions, let's lock in the eight families. Linear functions give straight lines. Quadratics give parabolas. Power functions cover square roots, cube roots, and reciprocals. Polynomials are sums of power functions with non-negative integer exponents. Rational functions are fractions of polynomials—watch for undefined points. Trig functions repeat periodically. Exponentials grow or decay rapidly. Logarithms are inverses of exponentials.\n\nEach family has a signature shape—students who can sketch these from memory will find every subsequent topic easier. Spend a beat on each graph in the gallery and name the key feature: slope for linear, vertex for quadratic, asymptotes for rational and log/exp.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2 — DOMAIN & RANGE (moved before transformations so students have the
  //            tool they need before composition examples)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s03_domain_and_range_example",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "Example 1: Domain and Range",
    question: "What is the range of \\(f(x)=\\sqrt{x}+1\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "example_solution",
          title: "Solution path",
          text: "Find the domain and range of \\(f(x)=\\sqrt{x-3}+2\\).",
          steps: [],
        },
        {
          id: "left_table",
          type: "math_table",
          headers: ["Step", "Action", "Explanation"],
          rows: [
            ["1", "Restrict radicand", "\\(x-3 \\ge 0 \\Rightarrow x \\ge 3\\)"],
            ["2", "Domain",           "\\([3,\\infty)\\)"],
            ["3", "Min value at \\(x=3\\)", "\\(f(3)=\\sqrt{0}+2=2\\)"],
            ["4", "As \\(x\\to\\infty\\)", "\\(f(x)\\to\\infty\\)"],
            ["5", "Range",            "\\([2,\\infty)\\)"],
          ],
          rowActions: [
            { widgetParams: { x: 3 } },
            { widgetParams: { x: 3 } },
            { widgetParams: { x: 3 } },
            { widgetParams: { x: 9 } },
            { widgetParams: { x: 9 } },
          ],
        },
      ],
      lead: "**Rule:** A square root requires a non-negative radicand. Solve the inequality, then read off the range from the minimum value.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_function_analysis",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "domain_sqrt_shift",
        title: "Graph of f(x) = √(x−3) + 2",
        caption: "",
        params: { x: 3 },
        source: "Synthesized from calculus slide content.",
        sourceSpec:
          "Plot f(x)=sqrt(x-3)+2 for x in [3, 12]. Mark the starting point (3, 2) with a filled dot. Shade the domain on the x-axis in green starting at x=3. Shade the range on the y-axis in blue starting at y=2. Add a moveable point that slides along the curve as the x-slider changes. Grid, axes labels.",
        sourceCode:
          "import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.widgets import Slider\n\nx_vals = np.linspace(3, 14, 300)\ny_vals = np.sqrt(x_vals - 3) + 2\nfig, ax = plt.subplots()\nplt.subplots_adjust(bottom=0.2)\nax.plot(x_vals, y_vals, 'b', linewidth=2)\nax.plot(3, 2, 'ro', markersize=8, label='start (3, 2)')\nax.axvline(3, color='green', linestyle='--', alpha=0.5, label='domain starts x=3')\nax.axhline(2, color='purple', linestyle='--', alpha=0.5, label='range starts y=2')\nax.grid(True, alpha=0.3)\nax.set_title('f(x) = √(x-3) + 2')\nax.legend()\npoint, = ax.plot([3], [2], 'ro', markersize=10)\nax_x = plt.axes([0.2, 0.05, 0.65, 0.03])\ns_x = Slider(ax_x, 'x', 3, 14, valinit=3)\ndef update(val):\n    xv = s_x.val\n    point.set_data([xv], [np.sqrt(xv-3)+2])\n    fig.canvas.draw_idle()\ns_x.on_changed(update)\nplt.show()",
        scriptedTimeline: [
          { t: 0, params: { x: 3  } },
          { t: 4, params: { x: 7  } },
          { t: 8, params: { x: 12 } },
        ],
      },
      source: {
        python_code:
          "import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.widgets import Slider\n\nx_vals = np.linspace(3, 14, 300)\ny_vals = np.sqrt(x_vals - 3) + 2\nfig, ax = plt.subplots()\nplt.subplots_adjust(bottom=0.2)\nax.plot(x_vals, y_vals, 'b', linewidth=2)\nax.plot(3, 2, 'ro', markersize=8, label='start (3, 2)')\nax.axvline(3, color='green', linestyle='--', alpha=0.5)\nax.axhline(2, color='purple', linestyle='--', alpha=0.5)\nax.grid(True, alpha=0.3)\nax.set_title('f(x) = √(x-3) + 2')\nax.legend()\nplt.show()",
      },
    },
    notes:
      "This is the first worked example, and it's intentionally simple—students should get it right. Walk through each row of the table at a relaxed pace.\n\nThe radicand x−3 must be ≥ 0, giving x ≥ 3. That's the domain. At x=3, the square root is zero so f(3)=2—that's the minimum of the range. As x grows without bound, so does the square root, so the range is [2, ∞).\n\nGeneral message to reinforce: every domain problem starts with 'what would break?' For square roots it's a negative under the radical. For fractions it's a zero denominator. For logarithms it's a non-positive argument.\n\nStudent prompt answer: range of sqrt(x)+1 is [1, ∞).",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3 — TRANSFORMATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s04_vertical_and_horizontal_shifts",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "Vertical and Horizontal Shifts",
    question:
      "Predict: If we replace \\(x\\) with \\((x+2)\\), which direction does the graph shift?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "\\(y = f(x) + c\\): **shift up** (\\(c>0\\)) or **down** (\\(c<0\\)).",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "\\(y = f(x - c)\\): **shift right** (\\(c>0\\)) or **left** (\\(c<0\\)).",
        },
        {
          id: "left_tip",
          type: "paragraph",
          text: "**Memory trick:** The sign inside the parentheses is the *opposite* of the shift direction. Verify with a single point: to get the same output as \\(f(0)\\) from \\(f(x-c)\\), set \\(x-c=0\\), so \\(x=c\\) — a rightward move.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Which direction does f(x+2) shift? Think first.",
          reveal: {
            text: "LEFT 2 units. Setting x+2=0 gives x=−2, so the point that was at x=0 is now at x=−2.",
          },
        },
      ],
      lead: "**Vertical shift**: add \\(c\\) to the **output**. **Horizontal shift**: subtract \\(c\\) from the **input**. The signs are counterintuitive—always check with a single point.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_function_transform",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "Interactive shift on f(x)=x²",
        caption: "",
        params: { family: "quadratic", a: 1, b: 1, h: 0, k: 0 },
        source: "Generated from calculus material visual_spec.",
        sourceSpec:
          "Plot f(x)=x² as a dashed blue parabola. The transformed function g(x)=(x−h)²+k redraws in solid red as sliders change. Two sliders: h (horizontal shift, −3 to 3) and k (vertical shift, −3 to 3). Show the vertex coordinates in the title. Include a reset button. Label both curves.",
        sourceCode:
          "import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.widgets import Slider, Button\n\nx = np.linspace(-6, 6, 400)\nfig, ax = plt.subplots()\nplt.subplots_adjust(bottom=0.3)\nax.grid(True, alpha=0.3)\nax.set_ylim(-4, 10)\n\nline_f, = ax.plot(x, x**2, 'b--', label='f(x)=x²')\nline_g, = ax.plot(x, x**2, 'r',   label='g(x)=(x−h)²+k')\nax.legend()\n\nax_h = plt.axes([0.2, 0.12, 0.65, 0.03])\nax_k = plt.axes([0.2, 0.06, 0.65, 0.03])\ns_h = Slider(ax_h, 'h (horiz)', -3, 3, valinit=0)\ns_k = Slider(ax_k, 'k (vert)',  -3, 3, valinit=0)\n\ndef update(val):\n    h, k = s_h.val, s_k.val\n    line_g.set_ydata((x - h)**2 + k)\n    ax.set_title(f'Vertex at ({h:.1f}, {k:.1f})')\n    fig.canvas.draw_idle()\ns_h.on_changed(update)\ns_k.on_changed(update)\n\nreset_ax = plt.axes([0.8, 0.01, 0.1, 0.04])\nbtn = Button(reset_ax, 'Reset')\nbtn.on_clicked(lambda e: [s_h.reset(), s_k.reset()])\nplt.show()",
        scriptedTimeline: [
          { t: 0, params: { family: "quadratic", a: 1, b: 1, h:  0, k: 0 } },
          { t: 5, params: { family: "quadratic", a: 1, b: 1, h:  2, k: 0 } },
          { t: 9, params: { family: "quadratic", a: 1, b: 1, h: -2, k: 3 } },
        ],
      },
      source: {
        python_code:
          "import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.widgets import Slider, Button\n\nx = np.linspace(-6, 6, 400)\nfig, ax = plt.subplots()\nplt.subplots_adjust(bottom=0.3)\nax.grid(True, alpha=0.3)\nax.set_ylim(-4, 10)\n\nline_f, = ax.plot(x, x**2, 'b--', label='f(x)=x²')\nline_g, = ax.plot(x, x**2, 'r',   label='g(x)=(x−h)²+k')\nax.legend()\n\nax_h = plt.axes([0.2, 0.12, 0.65, 0.03])\nax_k = plt.axes([0.2, 0.06, 0.65, 0.03])\ns_h = Slider(ax_h, 'h (horiz)', -3, 3, valinit=0)\ns_k = Slider(ax_k, 'k (vert)',  -3, 3, valinit=0)\n\ndef update(val):\n    h, k = s_h.val, s_k.val\n    line_g.set_ydata((x - h)**2 + k)\n    ax.set_title(f'Vertex at ({h:.1f}, {k:.1f})')\n    fig.canvas.draw_idle()\ns_h.on_changed(update)\ns_k.on_changed(update)\n\nreset_ax = plt.axes([0.8, 0.01, 0.1, 0.04])\nbtn = Button(reset_ax, 'Reset')\nbtn.on_clicked(lambda e: [s_h.reset(), s_k.reset()])\nplt.show()",
      },
    },
    notes:
      "Vertical shifts are intuitive—adding a constant lifts or lowers the entire graph. Horizontal shifts are where students consistently make sign errors.\n\nFor y = f(x − c), to produce the same output as f(0), we need x − c = 0, so x = c. The point has moved rightward by c. For y = f(x + c), to produce f(0), we need x = −c—a leftward move. The SIGN of c and the DIRECTION of shift are opposite.\n\nThe slider demo on the right is the most powerful thing on this slide. Make h positive and show the parabola moving right. Then make h negative and show it moving left. Ask the student to predict before you move. Repeat for k.\n\nPause prompt answer: f(x+2) shifts LEFT 2.",
  },
  {
    id: "s05_stretches_and_reflections",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "Stretches and Reflections",
    question: "What happens to the period of \\(\\sin x\\) when you set \\(b=2\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "\\(y = c\\,f(x)\\): **vertical stretch** (\\(|c|>1\\)) or shrink (\\(0<|c|<1\\)); negative \\(c\\) also **reflects** about the x-axis.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "\\(y = f(cx)\\): **horizontal shrink** (\\(|c|>1\\)) or stretch (\\(0<|c|<1\\)); negative \\(c\\) also **reflects** about the y-axis.",
        },
        {
          id: "left_tip",
          type: "paragraph",
          text: "**Period rule for sine:** Period of \\(\\sin(bx)\\) is \\(\\dfrac{2\\pi}{|b|}\\). Doubling \\(b\\) halves the period.",
        },
      ],
      lead: "Multiply **output** → vertical **stretch/reflection**. Multiply **input** → horizontal **stretch/reflection**. Both can also flip the graph.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_function_transform",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "Interactive stretch/reflection on sin(x)",
        caption: "",
        params: { family: "sine", a: 1, b: 1, h: 0, k: 0 },
        source: "Generated from calculus material visual_spec.",
        sourceSpec:
          "Plot sin(x) in dashed blue over x ∈ [−2π, 2π]. Plot a·sin(b·x) in solid red. Sliders: vertical factor a (−3 to 3, step 0.1) and horizontal factor b (−3 to 3, step 0.1, avoid 0). Show current amplitude and period in the title. Add a reset button.",
        sourceCode:
          "import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.widgets import Slider, Button\n\nx = np.linspace(-2*np.pi, 2*np.pi, 600)\nfig, ax = plt.subplots()\nplt.subplots_adjust(bottom=0.3)\nax.grid(True, alpha=0.3)\nax.set_ylim(-3.5, 3.5)\nax.axhline(0, color='gray', linewidth=0.8)\n\nline_f, = ax.plot(x, np.sin(x),       'b--', label='sin(x)')\nline_g, = ax.plot(x, np.sin(x),       'r',   label='a·sin(b·x)')\nax.legend()\n\nax_a = plt.axes([0.2, 0.12, 0.65, 0.03])\nax_b = plt.axes([0.2, 0.06, 0.65, 0.03])\ns_a = Slider(ax_a, 'a (amplitude)', -3, 3, valinit=1)\ns_b = Slider(ax_b, 'b (freq)',      -3, 3, valinit=1)\n\ndef update(val):\n    a, b = s_a.val, s_b.val\n    bsafe = b if abs(b) > 0.01 else 0.01\n    line_g.set_ydata(a * np.sin(bsafe * x))\n    period = 2 * np.pi / abs(bsafe)\n    ax.set_title(f'Amplitude={a:.1f}  |  Period={period:.2f}')\n    fig.canvas.draw_idle()\ns_a.on_changed(update)\ns_b.on_changed(update)\n\nreset_ax = plt.axes([0.8, 0.01, 0.1, 0.04])\nbtn = Button(reset_ax, 'Reset')\nbtn.on_clicked(lambda e: [s_a.reset(), s_b.reset()])\nplt.show()",
        scriptedTimeline: [
          { t: 0, params: { family: "sine", a:  1,   b: 1,   h: 0, k: 0 } },
          { t: 4, params: { family: "sine", a:  2,   b: 1,   h: 0, k: 0 } },
          { t: 7, params: { family: "sine", a:  2,   b: 2,   h: 0, k: 0 } },
          { t: 10, params: { family: "sine", a: -1.5, b: 0.5, h: 0, k: 0 } },
        ],
      },
      source: {
        python_code:
          "import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.widgets import Slider, Button\n\nx = np.linspace(-2*np.pi, 2*np.pi, 600)\nfig, ax = plt.subplots()\nplt.subplots_adjust(bottom=0.3)\nax.grid(True, alpha=0.3)\nax.set_ylim(-3.5, 3.5)\nax.axhline(0, color='gray', linewidth=0.8)\n\nline_f, = ax.plot(x, np.sin(x), 'b--', label='sin(x)')\nline_g, = ax.plot(x, np.sin(x), 'r',   label='a·sin(b·x)')\nax.legend()\n\nax_a = plt.axes([0.2, 0.12, 0.65, 0.03])\nax_b = plt.axes([0.2, 0.06, 0.65, 0.03])\ns_a = Slider(ax_a, 'a (amplitude)', -3, 3, valinit=1)\ns_b = Slider(ax_b, 'b (freq)', -3, 3, valinit=1)\n\ndef update(val):\n    a, b = s_a.val, s_b.val\n    bsafe = b if abs(b) > 0.01 else 0.01\n    line_g.set_ydata(a * np.sin(bsafe * x))\n    period = 2 * np.pi / abs(bsafe)\n    ax.set_title(f'Amplitude={a:.1f}  |  Period={period:.2f}')\n    fig.canvas.draw_idle()\ns_a.on_changed(update)\ns_b.on_changed(update)\nplt.show()",
      },
    },
    notes:
      "Walk through the two types of scaling separately before combining them.\n\nVertical (output) scaling: multiplying the whole function by a constant. If |a| > 1, the graph gets taller. If 0 < |a| < 1, it gets shorter. If a < 0, it also flips upside-down across the x-axis.\n\nHorizontal (input) scaling: multiplying x by a constant b. If |b| > 1, the graph compresses horizontally (more oscillations fit in the window). If 0 < |b| < 1, it stretches. If b < 0, it also reflects across the y-axis.\n\nThe scripted timeline demonstrates: first stretch amplitude to 2, then compress period (b=2), then show a negative-a reflection. This sequence is the most natural didactic order.\n\nPause prompt answer: Setting b=2 halves the period from 2π to π—the wave oscillates twice as fast.",
  },
  {
    id: "s06_misconception_horizontal_shift",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "Common Mistake: Horizontal Shift Direction",
    question: "If we have \\(y = f(x-5)\\), does the graph shift left or right?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Common misconception",
          pairs: [
            {
              label: "❌ Tempting mistake",
              text: "'\\(y = f(x+3)\\) shifts right 3 because +3 adds to x.'",
            },
            {
              label: "✅ Correct reasoning",
              text: "\\(y = f(x+3)\\) shifts **left** 3. To get \\(f(0)\\), solve \\(x+3=0 \\Rightarrow x=-3\\).",
            },
          ],
        },
        {
          id: "left_rule",
          type: "paragraph",
          text: "**Quick check:** Pick a landmark point and ask where the same output appears on the new graph.",
        },
      ],
      lead: "\\(y = f(x + c)\\) shifts **LEFT**. \\(y = f(x - c)\\) shifts **RIGHT**. The sign is always opposite to intuition—use the single-point check.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_function_transform",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "Three parabolas: original, shifted left, shifted right",
        caption: "",
        params: { family: "quadratic", a: 1, b: 1, h: 0, k: 0 },
        source: "Generated from calculus material visual_spec.",
        sourceSpec:
          "Plot three curves on the same axes: f(x)=x² in dashed blue (vertex at origin), f(x+2)=(x+2)² in solid red with vertex at (−2,0), f(x−2)=(x−2)² in solid green with vertex at (2,0). Label all three curves and mark the three vertices with dots. Add text annotations: 'x+2 → LEFT' in red, 'x−2 → RIGHT' in green. Grid.",
        sourceCode:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-5, 5, 400)\nplt.figure()\nplt.plot(x, x**2,       'b--', linewidth=1.5, label='f(x)=x²  (original)')\nplt.plot(x, (x+2)**2,   'r',   linewidth=2,   label='f(x+2): LEFT 2')\nplt.plot(x, (x-2)**2,   'g',   linewidth=2,   label='f(x−2): RIGHT 2')\nplt.plot(0,  0,  'bo', markersize=8)\nplt.plot(-2, 0,  'ro', markersize=8)\nplt.plot(2,  0,  'go', markersize=8)\nplt.text(-2.3, 0.8, 'x+2 → LEFT',  color='red',   fontsize=9)\nplt.text( 1.7, 0.8, 'x−2 → RIGHT', color='green', fontsize=9)\nplt.axhline(0, color='gray'); plt.axvline(0, color='gray')\nplt.grid(True, alpha=0.3)\nplt.ylim(-1, 10)\nplt.legend()\nplt.title('Horizontal Shifts: the sign is opposite to the direction')\nplt.show()",
        // Fixed: the scripted timeline now actually shows both shifts clearly,
        // not an irrelevant (h=1.5, k=1) animation that contradicts the lesson.
        scriptedTimeline: [
          { t: 0, params: { family: "quadratic", a: 1, b: 1, h:  0, k: 0 } },
          { t: 4, params: { family: "quadratic", a: 1, b: 1, h: -2, k: 0 } },
          { t: 8, params: { family: "quadratic", a: 1, b: 1, h:  2, k: 0 } },
        ],
      },
      source: {
        python_code:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-5, 5, 400)\nplt.figure()\nplt.plot(x, x**2,     'b--', linewidth=1.5, label='f(x)=x²')\nplt.plot(x, (x+2)**2, 'r',   linewidth=2,   label='f(x+2): LEFT 2')\nplt.plot(x, (x-2)**2, 'g',   linewidth=2,   label='f(x−2): RIGHT 2')\nplt.plot(0,0,'bo',markersize=8); plt.plot(-2,0,'ro',markersize=8); plt.plot(2,0,'go',markersize=8)\nplt.axhline(0,color='gray'); plt.axvline(0,color='gray')\nplt.grid(True, alpha=0.3); plt.ylim(-1,10); plt.legend()\nplt.title('Horizontal Shifts')\nplt.show()",
      },
    },
    notes:
      "This is the single most common sign error in the whole transformation topic. Allocate time here.\n\nThe key insight: to reproduce the OUTPUT of the original function, you change the INPUT. For f(x+3), to reproduce f(0) you need x = −3. So the point that was at x=0 has slid to x=−3—a leftward slide of 3 units.\n\nThe graph shows three parabolas side by side. The vertices are at x=0 (original), x=−2 (f(x+2)), and x=+2 (f(x−2)). The colours and labels make it immediately visual.\n\nNote on the scripted timeline fix: the original file animated to h=1.5 on this misconception slide, which would move the parabola right and potentially reinforce the very misconception being addressed. The corrected timeline shows h=−2 first (matching the left-shift example in the text) then h=+2 (right shift), in direct correspondence with the three plotted curves.\n\nPause answer: y=f(x−5) shifts RIGHT 5.",
  },
  {
    id: "s07_transformation_sequence_example",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "Example 2: Transformation Sequence",
    question: "What would happen if we added 3 **before** multiplying by −2?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "example_solution",
          title: "Sketch \\(y=-2(x+1)^2+3\\) from \\(f(x)=x^2\\)",
          text: "",
          steps: [
            {
              id: "left_step_1",
              text: "**Start:** parent \\(y=x^2\\), vertex at \\((0,0)\\).",
              widgetParams: { family: "quadratic", a: 1, b: 1, h: 0, k: 0 },
            },
            {
              id: "left_step_2",
              text: "**Horizontal shift left 1:** replace \\(x\\) with \\((x+1)\\) → vertex moves to \\((-1,0)\\).",
              widgetParams: { family: "quadratic", a: 1, b: 1, h: -1, k: 0 },
            },
            {
              id: "left_step_3",
              text: "**Vertical stretch × 2 and reflect:** multiply output by \\(-2\\) → parabola opens down, twice as tall.",
              widgetParams: { family: "quadratic", a: -2, b: 1, h: -1, k: 0 },
            },
            {
              id: "left_step_4",
              text: "**Vertical shift up 3:** add 3 → vertex at \\((-1, 3)\\).",
              widgetParams: { family: "quadratic", a: -2, b: 1, h: -1, k: 3 },
            },
            {
              id: "left_step_5",
              text: "**x-intercepts:** \\(-2(x+1)^2+3=0 \\Rightarrow x=-1\\pm\\sqrt{3/2}\\approx -1\\pm 1.22\\).",
              widgetParams: { family: "quadratic", a: -2, b: 1, h: -1, k: 3 },
            },
          ],
        },
      ],
      lead: "**Order of operations for transformations:** (1) horizontal shift, (2) horizontal stretch/reflect, (3) vertical stretch/reflect, (4) vertical shift.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_function_transform",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "",
        title: "Step-by-step transformation of y = x²",
        caption: "",
        params: { family: "quadratic", a: -2, b: 1, h: -1, k: 3 },
        source: "Generated from calculus material visual_spec.",
        sourceSpec:
          "Plot f(x)=x² as dashed blue and g(x)=−2(x+1)²+3 as solid red. Mark vertex (−1,3) with a dot. Mark x-intercepts (−1±√1.5, 0) with green dots. Axis of symmetry as dashed vertical at x=−1. Grid and legend.",
        sourceCode:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-4.5, 2.5, 400)\nplt.figure()\nplt.plot(x, x**2, 'b--', linewidth=1.5, label='parent: x²')\nplt.plot(x, -2*(x+1)**2 + 3, 'r', linewidth=2, label='−2(x+1)²+3')\nplt.plot(-1, 3, 'ro', markersize=9, label='vertex (−1, 3)')\nroots = np.array([-1 - np.sqrt(1.5), -1 + np.sqrt(1.5)])\nplt.plot(roots, [0, 0], 'g^', markersize=8, label='x-intercepts')\nplt.axvline(-1, color='gray', linestyle=':', alpha=0.6, label='axis x=−1')\nplt.axhline(0, color='gray', linewidth=0.8)\nplt.ylim(-6, 10); plt.grid(True, alpha=0.3); plt.legend()\nplt.title('Transformed Quadratic')\nplt.show()",
        scriptedTimeline: [
          { t: 0,  params: { family: "quadratic", a:  1, b: 1, h:  0, k: 0 } },
          { t: 3,  params: { family: "quadratic", a:  1, b: 1, h: -1, k: 0 } },
          { t: 6,  params: { family: "quadratic", a: -2, b: 1, h: -1, k: 0 } },
          { t: 9,  params: { family: "quadratic", a: -2, b: 1, h: -1, k: 3 } },
        ],
      },
      source: {
        python_code:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-4.5, 2.5, 400)\nplt.figure()\nplt.plot(x, x**2, 'b--', linewidth=1.5, label='parent: x²')\nplt.plot(x, -2*(x+1)**2 + 3, 'r', linewidth=2, label='−2(x+1)²+3')\nplt.plot(-1, 3, 'ro', markersize=9, label='vertex (−1,3)')\nroots = np.array([-1 - np.sqrt(1.5), -1 + np.sqrt(1.5)])\nplt.plot(roots, [0,0], 'g^', markersize=8, label='x-intercepts')\nplt.axvline(-1, color='gray', linestyle=':')\nplt.axhline(0, color='gray', linewidth=0.8)\nplt.ylim(-6,10); plt.grid(True, alpha=0.3); plt.legend()\nplt.title('Transformed Quadratic')\nplt.show()",
      },
    },
    notes:
      "This example is the payoff for the previous two slides. Students apply all three transformation types in sequence.\n\nEmphasize ORDER: horizontal shift first, then vertical scaling/reflection, then vertical shift. If you scale before shifting vertically, the +3 would get multiplied by −2 and become −6, giving a completely different function.\n\nWalk through each step in the scripted timeline so students can see the graph morph one transformation at a time. Pause at each step and confirm the vertex coordinates match the formula.\n\nPause prompt answer: If we add 3 first (giving x²+3) then multiply by −2, we get −2(x+1)²−6, not −2(x+1)²+3. The vertex would be at (−1,−6) instead of (−1,3). The order of operations changes the result!",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4 — COMPOSITION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s08_composition_of_functions",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "Composition of Functions",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "\\((f \\circ g)(x) = f(g(x))\\) — apply \\(g\\) first, then feed the result into \\(f\\).",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "**Domain of \\(f \\circ g\\):** \\(\\{x \\in \\operatorname{dom}(g) : g(x) \\in \\operatorname{dom}(f)\\}\\).",
        },
        {
          id: "left_paragraph_3",
          type: "paragraph",
          text: "**Two-step check:** (1) \\(x\\) must be valid for \\(g\\). (2) \\(g(x)\\) must be valid for \\(f\\).",
        },
        {
          id: "left_example",
          type: "paragraph",
          text: "**Example:** \\(f(x)=\\sqrt{x},\\; g(x)=x+1\\). Then \\((f\\circ g)(x)=\\sqrt{x+1}\\). Domain: \\(x+1\\ge0 \\Rightarrow x\\ge-1\\), i.e. \\([-1,\\infty)\\).",
        },
      ],
      lead: "Apply \\(g\\) first, then \\(f\\). **Domain**: every \\(x\\) that passes through \\(g\\) and lands inside \\(f\\)'s domain.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_function_analysis",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "composition_sqrt",
        title: "Two-step composition diagram",
        caption: "",
        params: { x: 0 },
        source: "Generated from calculus material visual_spec.",
        sourceSpec:
          "Show a pipeline diagram with three labelled boxes: 'x' → g(x)=x+1 → f(g(x))=√(x+1). Use arrows and colour coding. Below the diagram, show the composite function graph √(x+1) for x ∈ [−1, 5] with a moveable point controlled by a slider. When the slider is at x=−1, mark the endpoint in a different colour to emphasise the domain boundary.",
        sourceCode:
          "import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.widgets import Slider\n\nfig, (ax_diag, ax_graph) = plt.subplots(2, 1, figsize=(6, 7))\nplt.subplots_adjust(bottom=0.15, hspace=0.4)\n\n# Pipeline diagram\nax_diag.axis('off')\nfor label, x_pos in [('x', 0.1), ('g(x)=x+1', 0.45), ('f(g(x))=√(x+1)', 0.85)]:\n    ax_diag.text(x_pos, 0.5, label, ha='center', va='center',\n                 bbox=dict(boxstyle='round', facecolor='lightyellow', edgecolor='gray'),\n                 fontsize=10, transform=ax_diag.transAxes)\nax_diag.annotate('', xy=(0.37, 0.5), xytext=(0.2, 0.5),\n                 xycoords='axes fraction', textcoords='axes fraction',\n                 arrowprops=dict(arrowstyle='->', color='blue', lw=2))\nax_diag.annotate('', xy=(0.73, 0.5), xytext=(0.57, 0.5),\n                 xycoords='axes fraction', textcoords='axes fraction',\n                 arrowprops=dict(arrowstyle='->', color='red', lw=2))\nax_diag.set_title('Composition pipeline', fontsize=11)\n\n# Graph\nx_vals = np.linspace(-1, 6, 300)\ny_vals = np.sqrt(x_vals + 1)\nax_graph.plot(x_vals, y_vals, 'b', linewidth=2)\nax_graph.plot(-1, 0, 'ro', markersize=8, label='domain starts at x=−1')\nax_graph.grid(True, alpha=0.3); ax_graph.legend()\nax_graph.set_title('f(g(x)) = √(x+1)')\n\npoint, = ax_graph.plot([0], [1], 'ro', markersize=10)\nax_x = plt.axes([0.2, 0.05, 0.6, 0.03])\ns_x  = Slider(ax_x, 'x', -1, 6, valinit=0)\ndef update(val):\n    xv = s_x.val\n    yv = np.sqrt(xv + 1) if xv >= -1 else np.nan\n    point.set_data([xv], [yv])\n    ax_graph.set_title(f'x={xv:.2f}  →  g(x)={xv+1:.2f}  →  f(g(x))={yv:.2f}')\n    fig.canvas.draw_idle()\ns_x.on_changed(update)\nplt.show()",
        scriptedTimeline: [
          { t: 0, params: { x:  0 } },
          { t: 4, params: { x:  3 } },
          { t: 8, params: { x: -1 } },
        ],
      },
      source: {
        python_code:
          "import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.widgets import Slider\n\nx_vals = np.linspace(-1, 6, 300)\ny_vals = np.sqrt(x_vals + 1)\nfig, ax = plt.subplots()\nplt.subplots_adjust(bottom=0.15)\nax.plot(x_vals, y_vals, 'b', linewidth=2)\nax.plot(-1, 0, 'ro', markersize=8, label='domain boundary')\nax.grid(True, alpha=0.3); ax.legend()\nax.set_title('f(g(x)) = √(x+1)')\npoint, = ax.plot([0], [1], 'ro', markersize=10)\nax_x = plt.axes([0.2, 0.05, 0.6, 0.03])\ns_x  = Slider(ax_x, 'x', -1, 6, valinit=0)\ndef update(val):\n    xv = s_x.val\n    point.set_data([xv], [np.sqrt(xv+1)])\n    fig.canvas.draw_idle()\ns_x.on_changed(update)\nplt.show()",
      },
    },
    notes:
      "Composition is the idea of 'plugging one function into another.' The diagram on the right is the key visual—three boxes in a pipeline, connected by arrows. Emphasise that the ORDER matters: f∘g is read right-to-left (g first, then f), which trips up students who read left-to-right.\n\nFor the domain, both filters must pass: x must be in g's domain, AND g(x) must be in f's domain. In the example, g has no restriction (all reals work), but f=√ requires a non-negative input. So g(x)=x+1 ≥ 0 → x ≥ −1.\n\nMove the slider to x=−1 last to show the boundary point clearly. Then briefly mention this foundation will appear again as the chain rule in differentiation.",
  },
  {
    id: "s09_composition_domain_tricky",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "Example 3: Composition with a Hole in the Domain",
    question: "What is the domain of \\((g\\circ f)(x)\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_steps",
          type: "example_solution",
          title: "Find \\((f\\circ g)(x)\\) and its domain",
          text: "\\(f(x)=\\dfrac{1}{x-1},\\quad g(x)=\\sqrt{x}\\).",
          steps: [],
        },
        {
          id: "body_table",
          type: "math_table",
          headers: ["Step", "Action", "Why"],
          rows: [
            ["1", "Substitute: \\(f(g(x))=f(\\sqrt{x})\\)", "Apply g first"],
            ["2", "Simplify: \\(\\dfrac{1}{\\sqrt{x}-1}\\)", "Plug √x into f"],
            ["3", "Inner domain: \\(x\\ge0\\)", "√x needs non-negative input"],
            ["4", "Outer: denominator \\(\\neq0\\): \\(\\sqrt{x}\\neq1 \\Rightarrow x\\neq1\\)", "f undefined when denom = 0"],
            ["5", "Domain: \\([0,1)\\cup(1,\\infty)\\)", "Combine both restrictions"],
          ],
          rowActions: [
            { widgetParams: { x: 0.5 } },
            { widgetParams: { x: 0.5 } },
            { widgetParams: { x: 0   } },
            { widgetParams: { x: 1   } },
            { widgetParams: { x: 2   } },
          ],
        },
      ],
      lead: "**Two-step domain check:** inner restriction (√x ≥ 0) AND outer restriction (denominator ≠ 0).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "body_function_analysis",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "composition_exclusion",
        title: "Graph of 1/(√x − 1) with domain highlighted",
        caption: "",
        params: { x: 0 },
        source: "Synthesized from calculus slide content.",
        sourceSpec:
          "Plot h(x)=1/(√x−1) for x ∈ [0, 6], omitting x=1. Show the domain in two segments on the x-axis: [0,1) in green and (1,∞) in blue. Mark x=1 with an open circle on the graph (vertical asymptote). Shade or dashed vertical line at x=1. Grid.",
        sourceCode:
          "import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.widgets import Slider\n\nfig, ax = plt.subplots()\nplt.subplots_adjust(bottom=0.15)\n\nx1 = np.linspace(0, 0.98, 200)\nx2 = np.linspace(1.02, 7, 300)\ny1 = 1 / (np.sqrt(x1) - 1)\ny2 = 1 / (np.sqrt(x2) - 1)\n\nax.plot(x1, y1, 'b', linewidth=2, label='[0,1)')\nax.plot(x2, y2, 'g', linewidth=2, label='(1,∞)')\nax.axvline(1, color='r', linestyle='--', alpha=0.7, label='x=1 excluded')\nax.plot(1, np.nan, 'ro', markersize=8)  # open circle marker\nax.set_ylim(-10, 10)\nax.grid(True, alpha=0.3)\nax.legend()\nax.set_title('1/(√x − 1): domain [0,1)∪(1,∞)')\n\npoint, = ax.plot([0.5], [1/(np.sqrt(0.5)-1)], 'ko', markersize=9)\nax_x = plt.axes([0.2, 0.05, 0.6, 0.03])\ns_x  = Slider(ax_x, 'x', 0, 7, valinit=0.5)\ndef update(val):\n    xv = s_x.val\n    if abs(xv - 1) < 0.04:\n        point.set_data([xv], [np.nan])\n    else:\n        yv = 1/(np.sqrt(max(xv,0)) - 1) if xv >= 0 else np.nan\n        point.set_data([xv], [yv])\n    fig.canvas.draw_idle()\ns_x.on_changed(update)\nplt.show()",
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 4, params: { x: 1   } },
          { t: 8, params: { x: 3   } },
        ],
      },
      source: {
        python_code:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx1 = np.linspace(0, 0.98, 200)\nx2 = np.linspace(1.02, 7, 300)\ny1 = 1/(np.sqrt(x1)-1)\ny2 = 1/(np.sqrt(x2)-1)\nplt.plot(x1, y1, 'b', linewidth=2, label='[0,1)')\nplt.plot(x2, y2, 'g', linewidth=2, label='(1,∞)')\nplt.axvline(1, color='r', linestyle='--', alpha=0.7, label='x=1 excluded')\nplt.ylim(-10,10); plt.grid(True, alpha=0.3); plt.legend()\nplt.title('1/(√x − 1)')\nplt.show()",
      },
    },
    notes:
      "This example deliberately has TWO domain restrictions—a non-negative requirement from the square root AND a zero-denominator exclusion from the rational part. Students who only apply one filter will get the wrong domain.\n\nStep 3: g(x)=√x requires x ≥ 0.\nStep 4: f(u)=1/(u−1) is undefined when u=1, so √x ≠ 1, meaning x ≠ 1.\nCombined: x ≥ 0 and x ≠ 1, written [0,1)∪(1,∞).\n\nIn the widget, move the slider to x=1 so students see the function blow up (vertical asymptote), then to x=0.5 and x=3 to show valid regions.\n\nPause prompt (reverse composition): (g∘f)(x) = g(f(x)) = √(1/(x−1)). Inner domain: x ≠ 1. Outer: 1/(x−1) ≥ 0 → x > 1. Combined domain: (1, ∞).",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 5 — EVEN & ODD SYMMETRY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s10_even_and_odd_functions",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "Even and Odd Functions",
    question: "Is \\(\\sin x\\) even, odd, or neither?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "**Even:** \\(f(-x)=f(x)\\) for all \\(x\\) in the domain — symmetric about the **y-axis**.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "**Odd:** \\(f(-x)=-f(x)\\) for all \\(x\\) — symmetric about the **origin** (180° rotational symmetry).",
        },
        {
          id: "left_paragraph_3",
          type: "paragraph",
          text: "**Test method:** Substitute \\(-x\\) and simplify. If you get \\(f(x)\\) → even. If you get \\(-f(x)\\) → odd. If neither → neither.",
        },
        {
          id: "left_examples",
          type: "paragraph",
          text: "Classic examples: \\(x^2, x^4, \\cos x\\) are **even**. \\(x^3, x^5, \\sin x\\) are **odd**. \\(x^2+x\\) is **neither**.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and test",
          prompt: "Is sin(x) even, odd, or neither?",
          reveal: {
            text: "ODD — because sin(−x) = −sin(x) for all x. The sine graph has 180° rotational symmetry about the origin.",
          },
        },
      ],
      lead: "**Even**: y-axis mirror. **Odd**: 180° origin rotation. To test: compute \\(f(-x)\\) and compare.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_function_analysis",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "symmetry_even_odd",
        title: "Even vs. odd symmetry side by side",
        caption: "",
        params: { a: 1.5 },
        source: "Generated from calculus material visual_spec.",
        sourceSpec:
          "Left subplot: f(x)=x² (even). Mark point (1.5, 2.25) and its mirror (−1.5, 2.25). Draw a vertical dashed line at x=0. Title: 'Even: f(−x)=f(x)'. Right subplot: f(x)=x³ (odd). Mark (1.5, 3.375) and (−1.5, −3.375). Title: 'Odd: f(−x)=−f(x)'. Both subplots: coloured dots, grid, legend.",
        sourceCode:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-3, 3, 400)\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))\na = 1.5\n\nax1.plot(x, x**2, 'b'); ax1.axvline(0, color='gray', linestyle='--')\nax1.plot(a, a**2,   'ro', markersize=9, label=f'({a}, {a**2:.2f})')\nax1.plot(-a, a**2,  'go', markersize=9, label=f'(−{a}, {a**2:.2f})')\nax1.grid(True, alpha=0.3); ax1.legend(); ax1.set_title('Even: f(−x)=f(x)')\n\nax2.plot(x, x**3, 'r'); ax2.axhline(0, color='gray', lw=0.8); ax2.axvline(0, color='gray', lw=0.8)\nax2.plot(a,  a**3,  'ro', markersize=9, label=f'({a}, {a**3:.2f})')\nax2.plot(-a, -a**3, 'go', markersize=9, label=f'(−{a}, {-a**3:.2f})')\nax2.grid(True, alpha=0.3); ax2.legend(); ax2.set_title('Odd: f(−x)=−f(x)')\n\nplt.tight_layout(); plt.show()",
        scriptedTimeline: [
          { t: 0, params: { a: 1.5 } },
          { t: 5, params: { a: 2.0 } },
          { t: 9, params: { a: 0.8 } },
        ],
      },
      source: {
        python_code:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-3, 3, 400)\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))\na = 1.5\nax1.plot(x, x**2, 'b'); ax1.axvline(0, color='gray', linestyle='--')\nax1.plot(a, a**2, 'ro', markersize=9, label=f'({a},{a**2})')\nax1.plot(-a, a**2,'go', markersize=9, label=f'({-a},{a**2})')\nax1.grid(True,alpha=0.3); ax1.legend(); ax1.set_title('Even')\nax2.plot(x, x**3, 'r')\nax2.plot(a, a**3, 'ro', markersize=9, label=f'({a},{a**3:.2f})')\nax2.plot(-a,-a**3,'go', markersize=9, label=f'({-a},{-a**3:.2f})')\nax2.axhline(0,color='gray',lw=0.8); ax2.axvline(0,color='gray',lw=0.8)\nax2.grid(True,alpha=0.3); ax2.legend(); ax2.set_title('Odd')\nplt.tight_layout(); plt.show()",
      },
    },
    notes:
      "The visual should carry most of the load here. For the even function (parabola), the two coloured dots are at the same height on opposite sides of the y-axis—mirror symmetry. For the odd function (cubic), the two dots are at opposite heights AND opposite sides—rotational symmetry about the origin.\n\nKey practical value (hint at calculus): for even functions, ∫₋ₐᵃ f(x)dx = 2∫₀ᵃ f(x)dx. For odd functions, ∫₋ₐᵃ f(x)dx = 0. This will save enormous computation in integration.\n\nPause answer: sin(−x) = −sin(x), so sine is odd.",
  },
  {
    id: "s11_even_odd_worked_example",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "Example 4: Classify a Rational Function",
    question: "Is \\(f(x)=x^2+1\\) even, odd, or neither?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "example_solution",
          title: "Classify \\(h(x)=\\dfrac{x^3}{x^2+1}\\)",
          text: "",
          steps: [
            { id: "step_1", text: "Compute \\(h(-x)=\\dfrac{(-x)^3}{(-x)^2+1}=\\dfrac{-x^3}{x^2+1}\\)." },
            { id: "step_2", text: "Compare to \\(h(x)=\\dfrac{x^3}{x^2+1}\\)." },
            { id: "step_3", text: "Observe: \\(h(-x) = -h(x)\\) → **odd function**." },
            { id: "step_4", text: "**Why?** Numerator: odd power \\((-x)^3=-x^3\\). Denominator: even power \\((-x)^2=x^2\\) — no sign change. Net result: sign of numerator flips, denominator unchanged → \\(-h(x)\\)." },
          ],
        },
      ],
      lead: "**Recipe:** substitute \\(-x\\), simplify using \\((-x)^n = (-1)^n x^n\\), compare to \\(\\pm h(x)\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_function_analysis",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "odd_rational",
        title: "h(x) = x³/(x²+1) — odd symmetry",
        caption: "",
        params: { a: 2 },
        source: "Generated from calculus material visual_spec.",
        sourceSpec:
          "Plot h(x)=x³/(x²+1) over x ∈ [−4, 4]. Mark (2, h(2)) in red and (−2, h(−2)) in green to show h(−2)=−h(2). Draw a dashed line connecting (2, h(2)) through the origin to (−2, h(−2)) to illustrate origin symmetry. Grid, legend, title 'Odd Function: origin symmetry'.",
        sourceCode:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-4, 4, 400)\ny = x**3 / (x**2 + 1)\nplt.figure()\nplt.plot(x, y, 'b', linewidth=2)\na = 2\nya = a**3 / (a**2 + 1)\nplt.plot( a,  ya, 'ro', markersize=9, label=f'({a}, {ya:.3f})')\nplt.plot(-a, -ya, 'go', markersize=9, label=f'(−{a}, {-ya:.3f})')\nplt.plot([-a, 0, a], [-ya, 0, ya], 'k:', alpha=0.5)  # symmetry line through origin\nplt.axhline(0, color='gray', lw=0.8); plt.axvline(0, color='gray', lw=0.8)\nplt.grid(True, alpha=0.3); plt.legend()\nplt.title('Odd Function: x³/(x²+1)')\nplt.show()",
        scriptedTimeline: [
          { t: 0, params: { a: 2   } },
          { t: 5, params: { a: 1   } },
          { t: 9, params: { a: 3   } },
        ],
      },
      source: {
        python_code:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-4, 4, 400)\ny = x**3 / (x**2 + 1)\nplt.figure()\nplt.plot(x, y, 'b', linewidth=2)\na = 2; ya = a**3/(a**2+1)\nplt.plot(a, ya, 'ro', markersize=9, label=f'({a},{ya:.3f})')\nplt.plot(-a, -ya, 'go', markersize=9, label=f'(−{a},{-ya:.3f})')\nplt.axhline(0, color='gray', lw=0.8); plt.axvline(0, color='gray', lw=0.8)\nplt.grid(True, alpha=0.3); plt.legend()\nplt.title('Odd: x³/(x²+1)')\nplt.show()",
      },
    },
    notes:
      "This example pairs nicely with the previous slide—students just learned the concept, now they apply the algebraic test to a less-obvious function.\n\nThe trick: identify the parity of numerator and denominator separately. Numerator x³ is odd (odd power → sign flips). Denominator x²+1 is even (even power → no sign change; constant also even). Odd ÷ even = odd. So the function is odd.\n\nThe dashed line through the origin on the graph is a nice visual—it emphasises that for an odd function, the points (a, f(a)) and (−a, f(−a)) are always directly across the origin from each other.\n\nPause answer: f(x)=x²+1. f(−x)=(−x)²+1=x²+1=f(x) → EVEN.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 6 — PIECEWISE FUNCTIONS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s12_piecewise_functions",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "Example 5: Piecewise Functions",
    question: "What is \\(f(1.5)\\)? And is this function continuous everywhere?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_steps",
          type: "example_solution",
          title: "Evaluate and sketch",
          text: "",
          steps: [
            {
              id: "step_def",
              text: "\\(f(x)=\\begin{cases} x^2, & x<0 \\\\ 2x+1, & 0\\le x\\le2 \\\\ 5-x, & x>2 \\end{cases}\\)",
            },
            {
              id: "step_eval1",
              text: "\\(f(-1) = (-1)^2 = 1\\)  — uses piece 1 since \\(-1<0\\).",
              widgetParams: { x: -1 },
            },
            {
              id: "step_eval2",
              text: "\\(f(0)=1\\) — piece 2 includes \\(x=0\\); piece 1 has open dot \\((0,0)\\).",
              widgetParams: { x: 0 },
            },
            {
              id: "step_eval3",
              text: "\\(f(1.5) = 2(1.5)+1 = 4\\)  — uses piece 2.",
              widgetParams: { x: 1.5 },
            },
            {
              id: "step_eval4",
              text: "\\(f(2)=5\\) — closed dot on piece 2; open dot \\((2,3)\\) for piece 3.",
              widgetParams: { x: 2 },
            },
            {
              id: "step_eval5",
              text: "\\(f(3) = 5-3 = 2\\)  — uses piece 3.",
              widgetParams: { x: 3 },
            },
            {
              id: "step_continuity",
              text: "**Continuity:** jump at \\(x=0\\) and jump at \\(x=2\\). Open/closed dots tell the story.",
            },
          ],
        },
      ],
      lead: "**Rule:** identify which piece applies, evaluate, check open/closed dots at boundaries.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "body_function_analysis",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "piecewise",
        title: "Piecewise function with open/closed dots",
        caption: "",
        params: { x: 1.5 },
        source: "Synthesized from calculus slide content.",
        sourceSpec:
          "Plot the piecewise function: x² for x<0 (open circle at (0,0)), 2x+1 for 0≤x≤2 (closed dot at (0,1) and (2,5)), 5−x for x>2 (open circle at (2,3)). Mark a moveable point that follows the correct piece. Highlight discontinuities. Grid, x and y axes. Moveable x slider from −3 to 4.",
        sourceCode:
          "import numpy as np\nimport matplotlib.pyplot as plt\nfrom matplotlib.widgets import Slider\n\nfig, ax = plt.subplots()\nplt.subplots_adjust(bottom=0.15)\n\nx1 = np.linspace(-3, -0.001, 200)\nx2 = np.linspace(0, 2, 200)\nx3 = np.linspace(2.001, 5, 200)\n\nax.plot(x1, x1**2,       'b', linewidth=2)\nax.plot(x2, 2*x2+1,      'r', linewidth=2)\nax.plot(x3, 5-x3,        'g', linewidth=2)\n\n# Open/closed dots\nax.plot(0, 0,  'bo', markerfacecolor='white', markersize=9, markeredgewidth=2)  # open piece 1\nax.plot(0, 1,  'ro', markersize=9)   # closed piece 2 start\nax.plot(2, 5,  'ro', markersize=9)   # closed piece 2 end\nax.plot(2, 3,  'go', markerfacecolor='white', markersize=9, markeredgewidth=2)  # open piece 3\n\nax.axhline(0, color='gray', lw=0.8); ax.axvline(0, color='gray', lw=0.8)\nax.grid(True, alpha=0.3)\nax.set_title('Piecewise function')\n\ndef f_piecewise(xv):\n    if xv < 0:       return xv**2\n    elif xv <= 2:    return 2*xv + 1\n    else:            return 5 - xv\n\npoint, = ax.plot([1.5], [f_piecewise(1.5)], 'ko', markersize=10)\nax_x = plt.axes([0.2, 0.05, 0.6, 0.03])\ns_x  = Slider(ax_x, 'x', -3, 5, valinit=1.5)\ndef update(val):\n    xv = s_x.val\n    point.set_data([xv], [f_piecewise(xv)])\n    ax.set_title(f'x = {xv:.2f}  →  f(x) = {f_piecewise(xv):.2f}')\n    fig.canvas.draw_idle()\ns_x.on_changed(update)\nplt.show()",
        scriptedTimeline: [
          { t: 0, params: { x: -1  } },
          { t: 3, params: { x:  0  } },
          { t: 6, params: { x:  1.5} },
          { t: 9, params: { x:  3  } },
        ],
      },
      source: {
        python_code:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx1 = np.linspace(-3,-0.001,200); x2 = np.linspace(0,2,200); x3 = np.linspace(2.001,5,200)\nplt.figure()\nplt.plot(x1,x1**2,'b',linewidth=2); plt.plot(x2,2*x2+1,'r',linewidth=2); plt.plot(x3,5-x3,'g',linewidth=2)\nplt.plot(0,0,'bo',markerfacecolor='white',markersize=9,markeredgewidth=2)\nplt.plot(0,1,'ro',markersize=9); plt.plot(2,5,'ro',markersize=9)\nplt.plot(2,3,'go',markerfacecolor='white',markersize=9,markeredgewidth=2)\nplt.axhline(0,color='gray',lw=0.8); plt.axvline(0,color='gray',lw=0.8)\nplt.grid(True,alpha=0.3); plt.title('Piecewise function')\nplt.show()",
      },
    },
    notes:
      "The key skill here is always 'which piece do I use?' — students must check the condition on x before evaluating.\n\nCritical notation: open circles (hollow dots) mean the endpoint is NOT included; closed circles (filled dots) mean it IS included. Walk through each boundary carefully.\n\nAt x=0: piece 1 (x<0) does NOT include x=0, so there's an open circle at (0,0). Piece 2 DOES include x=0 (because 0≤x≤2), giving f(0)=1. Since the left limit (0) ≠ the function value (1), there is a jump discontinuity at x=0.\n\nAt x=2: piece 2 includes x=2 with f(2)=5. Piece 3 (x>2) starts with an open circle at (2,3). Since the left value (5) ≠ the right limit (3), there is a jump at x=2 too.\n\nNote: The original narration said 'continuous at x=0'—this was incorrect and has been fixed. The function has jump discontinuities at both x=0 and x=2.\n\nPause answers: f(1.5) = 2(1.5)+1 = 4. The function is NOT continuous—it has jumps at x=0 and x=2.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // CHALLENGE (OPTIONAL)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s13_challenge_product_even_odd",
    type: "two-col",
    hud: "Arian University — Calculus 1",
    title: "[Challenge – Optional] Product of Even × Odd",
    question: "What is the product of two **odd** functions?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "on_screen_text",
          type: "paragraph",
          text: "**Theorem:** If \\(f\\) is even and \\(g\\) is odd, then \\(h(x)=f(x)g(x)\\) is **odd**.",
        },
        {
          id: "body_table",
          type: "math_table",
          headers: ["Step", "Derivation"],
          rows: [
            ["1", "\\(h(-x)=f(-x)\\cdot g(-x)\\)"],
            ["2", "\\(f(-x)=f(x)\\) and \\(g(-x)=-g(x)\\)"],
            ["3", "\\(h(-x)=f(x)\\cdot(-g(x))=-f(x)g(x)=-h(x)\\)"],
            ["4", "Therefore \\(h\\) is odd. ∎"],
          ],
        },
        {
          id: "follow_up",
          type: "paragraph",
          text: "**Try yourself:** (a) even × even = ? (b) odd × odd = ? (Hint: both give even.)",
        },
      ],
      lead: "Even × odd = odd. The proof is a one-line substitution using the definitions.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "body_function_analysis",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "product_even_odd",
        title: "x²·x³ = x⁵: even × odd = odd",
        caption: "",
        params: { a: 1.2 },
        source: "Synthesized from calculus slide content.",
        sourceSpec:
          "Plot three curves on one set of axes: f(x)=x² (even, dashed blue), g(x)=x³ (odd, dashed red), h(x)=x⁵=f(x)g(x) (solid purple). Mark a point (a, a⁵) and (−a, −a⁵) on h to show odd symmetry. Grid. Title: 'Even × Odd = Odd'.",
        sourceCode:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-2, 2, 400)\nplt.figure()\nplt.plot(x, x**2,       'b--', linewidth=1.5, label='f(x)=x² (even)')\nplt.plot(x, x**3,       'r--', linewidth=1.5, label='g(x)=x³ (odd)')\nplt.plot(x, x**5,       'purple', linewidth=2.5, label='h(x)=x⁵ (odd)')\na = 1.2\nplt.plot( a,  a**5, 'ko', markersize=9, label=f'({a:.1f}, {a**5:.2f})')\nplt.plot(-a, -a**5, 'go', markersize=9, label=f'(−{a:.1f}, {-a**5:.2f})')\nplt.axhline(0, color='gray', lw=0.8); plt.axvline(0, color='gray', lw=0.8)\nplt.ylim(-4, 4); plt.grid(True, alpha=0.3); plt.legend()\nplt.title('Even × Odd = Odd')\nplt.show()",
        scriptedTimeline: [
          { t: 0, params: { a: 1.2 } },
          { t: 5, params: { a: 1.6 } },
          { t: 9, params: { a: 0.8 } },
        ],
      },
      source: {
        python_code:
          "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(-2, 2, 400)\nplt.figure()\nplt.plot(x, x**2, 'b--', linewidth=1.5, label='f(x)=x² (even)')\nplt.plot(x, x**3, 'r--', linewidth=1.5, label='g(x)=x³ (odd)')\nplt.plot(x, x**5, 'purple', linewidth=2.5, label='h(x)=x⁵ (odd)')\nplt.axhline(0,color='gray',lw=0.8); plt.axvline(0,color='gray',lw=0.8)\nplt.ylim(-4,4); plt.grid(True,alpha=0.3); plt.legend()\nplt.title('Even × Odd = Odd')\nplt.show()",
      },
    },
    notes:
      "Light challenge slide—the proof is genuinely one-step once students know the definitions. The value is the abstract reasoning practice, not computational complexity.\n\nThe graph reinforces concretely: x²·x³ = x⁵, and x⁵ is visibly an odd function (origin symmetry).\n\nFollow-up drill (give answers if time): \n• odd × odd: h(-x) = f(-x)g(-x) = (−f(x))(−g(x)) = f(x)g(x) = h(x) → EVEN\n• even × even: h(-x) = f(-x)g(-x) = f(x)g(x) = h(x) → EVEN\n\nPause answer: odd × odd = even.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s14_key_takeaways",
    type: "text",
    hud: "Arian University — Calculus 1",
    title: "Key Takeaways",
    question: "",
    lead: "Everything you need to carry forward into calculus:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          {
            id: "bullet_1",
            text: "**Function families** — linear, quadratic, power, polynomial, rational, trig, exponential, logarithmic. Each has a signature shape; recognise them on sight.",
          },
          {
            id: "bullet_2",
            text: "**Domain & range** — identify restrictions first: radicands ≥ 0, denominators ≠ 0, log arguments > 0.",
          },
          {
            id: "bullet_3",
            text: "**Transformations** — apply in order: (1) horizontal shift, (2) horizontal stretch/reflect, (3) vertical stretch/reflect, (4) vertical shift. The sign of a horizontal shift is OPPOSITE to the direction.",
          },
          {
            id: "bullet_4",
            text: "**Composition** — apply inner function first, then outer. Domain requires BOTH the inner domain AND that the inner output lands in the outer domain.",
          },
          {
            id: "bullet_5",
            text: "**Even / odd symmetry** — test by computing f(−x). Even → y-axis mirror. Odd → origin rotation. Useful shortcut for integrals.",
          },
          {
            id: "bullet_6",
            text: "**Piecewise functions** — always identify the correct piece first, check open vs. closed dots at boundaries, and look for jump discontinuities.",
          },
        ],
      },
    ],
    media: null,
    notes:
      "Close the session by mapping each takeaway back to a specific example from the video. For instance: 'We saw that domain trick in Example 3 with the composition.' This reinforces that the summary bullets are not abstract—they each have a concrete moment in the session.\n\nTeaser for next session: these tools underpin limits and derivatives. When you see lim_{x→a} f(g(x)), you'll need composition. When you differentiate f(g(x)), you'll need the chain rule—which is just composition again. Even/odd will save you half the work on definite integrals over symmetric intervals.",
  },
];

export default slidesData;

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * COURSE DESIGN CHANGELOG
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * v2 → v3 (course design review, June 2026)
 *
 * SEQUENCE REORDER
 *   - Domain & Range (was Example 1 at slide 8) moved to slide 3, immediately
 *     after Function Families. Students need domain mechanics before composition
 *     examples, and the original order buried this foundational tool mid-session.
 *   - Transformation Misconception slide now follows the two transformation
 *     slides directly (was sandwiched between stretches and composition).
 *
 * NARRATION CORRECTIONS
 *   - s12 (Piecewise): Original notes stated "continuous at x=0" — INCORRECT.
 *     The function has a jump at x=0 (left limit = 0, function value = 1) and a
 *     second jump at x=2 (left value = 5, right limit = 3). Both jumps now
 *     documented in notes and added to student question.
 *
 * SCRIPTED TIMELINE FIX (s06 / misconception slide)
 *   - Original: animated to h=1.5, k=1 — which moves the parabola right and
 *     upward, potentially reinforcing the very misconception being corrected.
 *   - Fixed: t=4 shows h=−2 (left shift, matching the f(x+2) example in text),
 *     t=8 shows h=+2 (right shift, matching f(x−2)).
 *
 * MISSING SOURCE BLOCKS ADDED
 *   - s03 (Domain example): added sourceCode and source.python_code.
 *   - s09 (Composition domain): added sourceCode and source.python_code.
 *   - s12 (Piecewise): added sourceCode and source.python_code.
 *   - s13 (Challenge): added sourceCode and source.python_code.
 *
 * MISSING WIDGET ON DOMAIN EXAMPLE
 *   - Original right side was `content_type: "empty"`. Now has a full
 *     calculus_widget with domain_sqrt_shift variant and scripted timeline.
 *
 * LEARNING OBJECTIVES SLIDE
 *   - `lead` was a copy of the prerequisite note. Now reads as a proper intro:
 *     "By the end of this session you will be able to:".
 *   - Expanded to 6 objectives (added explicit domain/range objective).
 *
 * STRETCHES SLIDE (s05)
 *   - Added period formula note for sine: Period = 2π/|b|.
 *   - sourceCode fixed: added guard for b≈0 to prevent division by zero.
 *   - scriptedTimeline now demonstrates amplitude, then period, then reflection
 *     (the natural pedagogical sequence).
 *
 * PIECEWISE EXAMPLE
 *   - Right-side widget now properly shows open/closed dots at boundaries using
 *     markerfacecolor='white' for open circles.
 *   - Student question extended to also ask about continuity.
 *
 * CHALLENGE SLIDE (s13)
 *   - Added follow-up: odd×odd and even×even questions for self-practice.
 *   - Right-side widget now plots all three curves (f, g, h) for concreteness.
 *
 * SUMMARY SLIDE
 *   - Redundant `on_screen_text` paragraph block removed.
 *   - `lead` added to frame the bullets.
 *   - Expanded to 6 bullets matching the 6 learning objectives.
 *   - Closing narration now includes calculus preview (chain rule, definite
 *     integrals) to motivate students for the next session.
 *
 * ESTIMATED DURATION: ~30 min (was ~20 min, extended by domain/range placement
 *   and the additional piecewise continuity discussion).
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
