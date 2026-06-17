// Generated from courses/Calculus/Materials/review_of_functions_and_graphs.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `npm run convert:calculus-test` or `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "01_review_of_functions_and_graphs",
  title: "Review of Functions and Graphs",
  hudDefault: "Arian University • Calculus 1",
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
    hud: "Arian University • Calculus 1",
    title: "Review of Functions and Graphs",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: Functions and Their Transformations • ~30 min • first-year university / advanced high school",
    notes:
      "Assumes familiarity with Cartesian coordinates, the concept of a function as a mapping from inputs to outputs, and basic algebra including solving equations and inequalities.",
  },
  {
    id: "learning_objectives",
    type: "bullets",
    hud: "Arian University • Calculus 1",
    title: "Learning Objectives",
    lead: "By the end of this lesson you will be able to:",
    blocks: [
      {
        id: "calculus1_roadmap",
        type: "course_path",
        layout: "topic_grid",
        currentId: "path_topic_01",
        items: [
          {
            id: "path_topic_01",
            number: 1,
            session: "S01 Preliminaries",
            label: "Review of Functions and Graphs",
            note: "Today",
            status: "current",
            expanded: true,
          },
          {
            id: "path_topic_02",
            number: 2,
            session: "S01 Preliminaries",
            label: "Trigonometry and Graphing Review",
            note: "Next",
            status: "next",
            expanded: true,
          },
          {
            id: "path_topic_03",
            number: 3,
            session: "S02 Limits and Continuity",
            label: "The Intuitive Concept of a Limit",
            status: "upcoming",
          },
          {
            id: "path_topic_04",
            number: 4,
            session: "S02 Limits and Continuity",
            label: "Limit Laws and Algebraic Evaluation",
            status: "upcoming",
          },
          {
            id: "path_topic_05",
            number: 5,
            session: "S02 Limits and Continuity",
            label: "One-Sided Limits and Limits at Infinity",
            status: "upcoming",
          },
          {
            id: "path_topic_06",
            number: 6,
            session: "S02 Limits and Continuity",
            label: "The Squeeze Theorem",
            status: "upcoming",
          },
          {
            id: "path_topic_07",
            number: 7,
            session: "S02 Limits and Continuity",
            label: "Continuity and the Intermediate Value Theorem",
            status: "upcoming",
          },
          {
            id: "path_topic_08",
            number: 8,
            session: "S03 Derivative Foundations",
            label: "Instantaneous Rate of Change",
            status: "upcoming",
          },
          {
            id: "path_topic_09",
            number: 9,
            session: "S03 Derivative Foundations",
            label: "Formal Definition of the Derivative",
            status: "upcoming",
          },
          {
            id: "path_topic_10",
            number: 10,
            session: "S03 Derivative Foundations",
            label: "Power Rule and Basic Properties",
            status: "upcoming",
          },
          {
            id: "path_topic_11",
            number: 11,
            session: "S03 Derivative Foundations",
            label: "Power, Constant Multiple, Sum, and Difference Rules",
            status: "upcoming",
          },
          {
            id: "path_topic_12",
            number: 12,
            session: "S03 Derivative Foundations",
            label: "The Product Rule for Derivatives",
            status: "upcoming",
          },
          {
            id: "path_topic_13",
            number: 13,
            session: "S03 Derivative Foundations",
            label: "The Chain Rule",
            status: "upcoming",
          },
          {
            id: "path_topic_14",
            number: 14,
            session: "S03 Derivative Foundations",
            label: "Implicit Differentiation",
            status: "upcoming",
          },
          {
            id: "path_topic_15",
            number: 15,
            session: "S04 Applications of Derivatives",
            label: "Related Rates",
            status: "upcoming",
          },
          {
            id: "path_topic_16",
            number: 16,
            session: "S04 Applications of Derivatives",
            label: "Critical Points and Extrema",
            status: "upcoming",
          },
          {
            id: "path_topic_17",
            number: 17,
            session: "S04 Applications of Derivatives",
            label: "Rolle's Theorem and the Mean Value Theorem",
            status: "upcoming",
          },
          {
            id: "path_topic_18",
            number: 18,
            session: "S04 Applications of Derivatives",
            label: "First and Second Derivative Tests",
            status: "upcoming",
          },
          {
            id: "path_topic_19",
            number: 19,
            session: "S04 Applications of Derivatives",
            label: "Optimization Problems",
            status: "upcoming",
          },
          {
            id: "path_topic_20",
            number: 20,
            session: "S04 Applications of Derivatives",
            label: "L'Hopital's Rule",
            status: "upcoming",
          },
          {
            id: "path_topic_21",
            number: 21,
            session: "S04 Applications of Derivatives",
            label: "Newton's Method and Linear Approximations",
            status: "upcoming",
          },
          {
            id: "path_topic_22",
            number: 22,
            session: "S05 Integration Foundations",
            label: "Antiderivatives and Indefinite Integrals",
            status: "upcoming",
          },
          {
            id: "path_topic_23",
            number: 23,
            session: "S05 Integration Foundations",
            label: "Approximating Area with Riemann Sums",
            status: "upcoming",
          },
          {
            id: "path_topic_24",
            number: 24,
            session: "S05 Integration Foundations",
            label: "The Definite Integral",
            status: "upcoming",
          },
          {
            id: "path_topic_25",
            number: 25,
            session: "S05 Integration Foundations",
            label: "The Fundamental Theorem of Calculus",
            status: "upcoming",
          },
          {
            id: "path_topic_26",
            number: 26,
            session: "S05 Integration Foundations",
            label: "Integration by Substitution",
            status: "upcoming",
          },
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
      "Use this slide to frame the lesson promise. Walk through each objective briefly, don't dwell. The six bullets map exactly to the six content blocks that follow, so students can use this as a checklist.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: HOOK + FUNCTION FAMILIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_functions_are_like_vending_machines",
    type: "two-col",
    hud: "Arian University • Calculus 1",
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
      "Think of a function like a vending machine. You press button 3 and you always get the same snack, no surprises. That's the one-input-one-output rule. The domain is the set of buttons that actually work; some might be broken or missing. The range is the set of snacks you can actually get out.\n\nNow imagine you can move that vending machine across the room, flip it upside down, or stretch it taller. That's exactly what function transformations do: the button-to-snack relationship stays the same, but the graph shifts or scales in predictable ways. We'll use this analogy throughout the session.",
  },
  {
    id: "s02_function_families_at_a_glance",
    type: "two-col",
    hud: "Arian University • Calculus 1",
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
      lead: "Eight core **function** families, orientation only; we are not mastering all eight today. Each reappears when the course needs it.",
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
        scriptedTimeline: [
          { t: 0, params: { family: "linear" } },
          { t: 2.5, params: { family: "quadratic" } },
          { t: 5, params: { family: "cubic" } },
          { t: 7.5, params: { family: "sine" } },
          { t: 10, params: { family: "exponential" } },
          { t: 12.5, params: { family: "log" } },
          { t: 15, params: { family: "absolute" } },
          { t: 17.5, params: { family: "tangent" } },
        ],
      },
    },
    notes:
      "Before we transform functions, let's lock in the eight families. Linear functions give straight lines. Quadratics give parabolas. Power functions cover square roots, cube roots, and reciprocals. Polynomials are sums of power functions with non-negative integer exponents. Rational functions are fractions of polynomials, watch for undefined points. Trig functions repeat periodically. Exponentials grow or decay rapidly. Logarithms are inverses of exponentials.\n\nEach family has a signature shape, students who can sketch these from memory will find every subsequent topic easier. Spend a beat on each graph in the gallery and name the key feature: slope for linear, vertex for quadratic, asymptotes for rational and log/exp.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: DOMAIN & RANGE (moved before transformations so students have the
  //            tool they need before composition examples)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s03_domain_and_range_example",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 1: Domain and Range",
    question: "What are the domain and range of \\(f(x)=\\sqrt{x-3}+2\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "f(x)=\\sqrt{x-3}+2",
          steps: [
            {
              id: "step_1",
              math: "x-3 \\ge 0 \\Rightarrow x \\ge 3",
              gap: "tight",
              say: "Restrict the radicand.",
              widgetId: "right_function_analysis",
              widgetParams: { x: 3 },
            },
            {
              id: "step_2",
              math: "\\text{Domain: }[3,\\infty)",
              gap: "tight",
              say: "Domain is all x from 3 onward.",
              widgetId: "right_function_analysis",
              widgetParams: { x: 3 },
            },
            {
              id: "step_3",
              math: "f(3)=\\sqrt{0}+2=2",
              gap: "tight",
              say: "Minimum value at the left endpoint.",
              widgetId: "right_function_analysis",
              widgetParams: { x: 3 },
            },
            {
              id: "step_4",
              math: "x\\to\\infty \\Rightarrow f(x)\\to\\infty",
              gap: "tight",
              say: "As x grows, so does the square root.",
              widgetId: "right_function_analysis",
              widgetParams: { x: 9 },
            },
            {
              id: "step_5",
              math: "\\text{Range: }[2,\\infty)",
              say: "Range starts at the minimum 2.",
              widgetId: "right_function_analysis",
              widgetParams: { x: 9 },
            },
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
        variant: "flex_plot",
        plot: {
          plotType: "y_equals",
          expr: "sqrt(x-3)+2",
          formula: "f(x)=\\sqrt{x-3}+2",
          xDomain: [2, 10],
          yDomain: [1, 5.5],
          probeMin: 3,
          probeMax: 12,
          probeDefault: 3,
          filledPoints: [{ x: 3, y: 2, class: "calculus-point warn" }],
          tags: [
            { text: "endpoint (3, 2)", x: 3.2, y: 1.8, tone: "warn" },
            {
              text: "domain [3,∞)  |  range [2,∞)",
              anchor: "end",
              tone: "accent",
            },
          ],
        },
        title: "Graph of f(x) = √(x−3) + 2",
        caption: "",
        params: { x: 3 },
        scriptedTimeline: [
          { t: 0, params: { x: 3 } },
          { t: 4, params: { x: 7 } },
          { t: 8, params: { x: 12 } },
        ],
      },
    },
    notes:
      "This is the first worked example, and it's intentionally simple, students should get it right. Walk through each row of the table at a relaxed pace.\n\nThe radicand x−3 must be ≥ 0, giving x ≥ 3. That's the domain. At x=3, the square root is zero so f(3)=2, that's the minimum of the range. As x grows without bound, so does the square root, so the range is [2, ∞).\n\nGeneral message to reinforce: every domain problem starts with 'what would break?' For square roots it's a negative under the radical. For fractions it's a zero denominator. For logarithms it's a non-positive argument.\n\nStudent prompt answer: domain [3, ∞), range [2, ∞).",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: TRANSFORMATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s04_vertical_and_horizontal_shifts",
    type: "two-col",
    hud: "Arian University • Calculus 1",
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
          text: "\\(y = f(x) + k\\): **shift up** (\\(k>0\\)) or **down** (\\(k<0\\)). Match the **k** slider on the plot.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "\\(y = f(x - h)\\): **shift right** (\\(h>0\\)) or **left** (\\(h<0\\)). Match the **h** slider on the plot.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Which direction does f(x+2) shift?",
          reveal: {
            text: "LEFT 2 units (set x+2=0 → x=−2).",
          },
        },
      ],
      lead: "**Vertical shift**: add \\(k\\) (v-shift). **Horizontal shift**: \\(f(x-h)\\) (h-shift). Signs are counterintuitive, check one point.",
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
        scriptedTimelines: {
          vertical_k: [
            { t: 0, params: { family: "quadratic", a: 1, b: 1, h: 0, k: 0 } },
            { t: 4, params: { family: "quadratic", a: 1, b: 1, h: 0, k: 3 } },
            { t: 8, params: { family: "quadratic", a: 1, b: 1, h: 0, k: -1 } },
          ],
          horizontal_h: [
            { t: 0, params: { family: "quadratic", a: 1, b: 1, h: 0, k: 0 } },
            { t: 4, params: { family: "quadratic", a: 1, b: 1, h: 2, k: 0 } },
            { t: 8, params: { family: "quadratic", a: 1, b: 1, h: -2, k: 0 } },
          ],
        },
      },
    },
    notes:
      "Vertical shifts are intuitive, adding k lifts or lowers the entire graph. Horizontal shifts are where students consistently make sign errors.\n\nFor y = f(x − h), to produce the same output as f(0), we need x − h = 0, so x = h. The point has moved rightward by h. For y = f(x + h), to produce f(0), we need x = −h, a leftward move. The SIGN inside the parentheses and the DIRECTION of shift are opposite.\n\nThe slider demo on the right is the most powerful thing on this slide. Make h positive and show the parabola moving right. Then make h negative and show it moving left. Ask the student to predict before you move. Repeat for k.\n\nPause prompt answer: f(x+2) shifts LEFT 2.",
  },
  {
    id: "s05_stretches_and_reflections",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Stretches and Reflections",
    question:
      "What happens to the period of \\(\\sin x\\) when you set \\(b=2\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "\\(y = a\\,f(x)\\): **vertical stretch** (\\(|a|>1\\)) or shrink (\\(0<|a|<1\\)); negative \\(a\\) also **reflects** about the x-axis. Use the **a** slider.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "\\(y = f(bx)\\): **horizontal shrink** (\\(|b|>1\\)) or stretch (\\(0<|b|<1\\)); negative \\(b\\) also **reflects** about the y-axis. Use the **b** slider.",
        },
        {
          id: "left_tip",
          type: "paragraph",
          text: "**Period rule for sine:** Period of \\(\\sin(bx)\\) is \\(\\dfrac{2\\pi}{|b|}\\). Doubling **b** (the horizontal factor) halves the period.",
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
        scriptedTimelines: {
          vertical_a: [
            { t: 0, params: { family: "sine", a: 1, b: 1, h: 0, k: 0 } },
            { t: 4, params: { family: "sine", a: 2, b: 1, h: 0, k: 0 } },
            { t: 8, params: { family: "sine", a: -1.5, b: 1, h: 0, k: 0 } },
          ],
          horizontal_b: [
            { t: 0, params: { family: "sine", a: 1, b: 1, h: 0, k: 0 } },
            { t: 4, params: { family: "sine", a: 1, b: 2, h: 0, k: 0 } },
            { t: 8, params: { family: "sine", a: 1, b: 0.5, h: 0, k: 0 } },
          ],
        },
      },
    },
    notes:
      "Walk through the two types of scaling separately before combining them.\n\nVertical (output) scaling: multiplying the whole function by a constant. If |a| > 1, the graph gets taller. If 0 < |a| < 1, it gets shorter. If a < 0, it also flips upside-down across the x-axis.\n\nHorizontal (input) scaling: multiplying x by a constant b. If |b| > 1, the graph compresses horizontally (more oscillations fit in the window). If 0 < |b| < 1, it stretches. If b < 0, it also reflects across the y-axis.\n\nThe scripted timeline demonstrates: first stretch amplitude to 2, then compress period (b=2), then show a negative-a reflection. This sequence is the most natural didactic order.\n\nPause prompt answer: Setting b=2 halves the period from 2π to π, the wave oscillates twice as fast.",
  },
  {
    id: "s06_misconception_horizontal_shift",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Common Mistake: Horizontal Shift Direction",
    question:
      "If we have \\(y = f(x-5)\\), does the graph shift left or right?",
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
              text: "'\\(y = f(x-5)\\) shifts **left** 5 because the minus feels backward.'",
            },
            {
              label: "✅ Correct reasoning",
              text: "\\(y = f(x-5)\\) shifts **right** 5. To get \\(f(0)\\), solve \\(x-5=0 \\Rightarrow x=5\\).",
            },
          ],
        },
        {
          id: "left_rule",
          type: "paragraph",
          text: "**Quick check:** Pick a landmark point and ask where the same output appears on the new graph.",
        },
      ],
      lead: "\\(y = f(x + h)\\) shifts **LEFT** (when \\(h>0\\)). \\(y = f(x - h)\\) shifts **RIGHT**. The sign is always opposite to intuition, use the single-point check and the **h** slider.",
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
        scriptedTimeline: [
          { t: 0, params: { family: "quadratic", a: 1, b: 1, h: 0, k: 0 } },
          { t: 4, params: { family: "quadratic", a: 1, b: 1, h: 5, k: 0 } },
          { t: 8, params: { family: "quadratic", a: 1, b: 1, h: -5, k: 0 } },
        ],
      },
    },
    notes:
      "This is the single most common sign error in the whole transformation topic. Allocate time here.\n\nThe key insight: to reproduce the OUTPUT of the original function, you change the INPUT. For f(x+3), to reproduce f(0) you need x = −3. So the point that was at x=0 has slid to x=−3, a leftward slide of 3 units.\n\nThe graph shows three parabolas side by side. The vertices are at x=0 (original), x=−2 (f(x+2)), and x=+2 (f(x−2)). The colours and labels make it immediately visual.\n\nNote on the scripted timeline fix: the original file animated to h=1.5 on this misconception slide, which would move the parabola right and potentially reinforce the very misconception being addressed. The corrected timeline shows h=−2 first (matching the left-shift example in the text) then h=+2 (right shift), in direct correspondence with the three plotted curves.\n\nPause answer: y=f(x−5) shifts RIGHT 5.",
  },
  {
    id: "s07_transformation_sequence_example",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 2: Transformation Sequence",
    question: "What would happen if we added 3 **before** multiplying by −2?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_order",
          type: "nested_bullets",
          items: [
            {
              id: "o1",
              text: "Horizontal shift (replace \\(x\\) with \\(x \\pm h\\))",
            },
            {
              id: "o2",
              text: "Horizontal stretch / reflect (multiply \\(x\\) by \\(b\\))",
            },
            {
              id: "o3",
              text: "Vertical stretch / reflect (multiply output by \\(a\\))",
            },
            { id: "o4", text: "Vertical shift (add \\(k\\) to output)" },
          ],
        },
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "y=-2(x+1)^2+3",
          steps: [
            {
              id: "left_step_1",
              math: "y=x^2,\\; vertex\\;(0,0)",
              gap: "tight",
              say: "Start with the parent parabola.",
              widgetId: "right_function_transform",
              widgetParams: { family: "quadratic", a: 1, b: 1, h: 0, k: 0 },
            },
            {
              id: "left_step_2",
              math: "x\\mapsto x+1 \\Rightarrow vertex\\;(-1,0)",
              gap: "tight",
              say: "Horizontal shift left 1.",
              widgetId: "right_function_transform",
              widgetParams: { family: "quadratic", a: 1, b: 1, h: -1, k: 0 },
            },
            {
              id: "left_step_3",
              math: "\\times(-2):\\; opens\\;down,\\; twice\\;as\\;tall",
              gap: "tight",
              say: "Vertical stretch by 2 and reflect.",
              widgetId: "right_function_transform",
              widgetParams: { family: "quadratic", a: -2, b: 1, h: -1, k: 0 },
            },
            {
              id: "left_step_4",
              math: "+3 \\Rightarrow vertex\\;(-1,3)",
              say: "Vertical shift up 3.",
              widgetId: "right_function_transform",
              widgetParams: { family: "quadratic", a: -2, b: 1, h: -1, k: 3 },
            },
          ],
        },
      ],
      lead: "Apply transforms in this order:",
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
        params: { family: "quadratic", a: 1, b: 1, h: 0, k: 0 },
      },
    },
    notes:
      "This example is the payoff for the previous two slides. Students apply all three transformation types in sequence.\n\nEmphasize ORDER: horizontal shift first, then vertical scaling/reflection, then vertical shift. If you scale before shifting vertically, the +3 would get multiplied by −2 and become −6, giving a completely different function.\n\nWalk through each step in the scripted timeline so students can see the graph morph one transformation at a time. Pause at each step and confirm the vertex coordinates match the formula.\n\nPause prompt answer: If we add 3 first (giving x²+3) then multiply by −2, we get −2(x+1)²−6, not −2(x+1)²+3. The vertex would be at (−1,−6) instead of (−1,3). The order of operations changes the result!",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: COMPOSITION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s08_composition_of_functions",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Composition of Functions",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_pipeline",
          type: "paragraph",
          text: "**Pipeline:** \\(x \\xrightarrow{\\,g\\,} g(x) \\xrightarrow{\\,f\\,} f(g(x))\\). Read \\(f \\circ g\\) **right to left**, inner \\(g\\) first, then outer \\(f\\).",
        },
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "\\((f \\circ g)(x) = f(g(x))\\), apply \\(g\\) first, then feed the result into \\(f\\).",
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
        title: "Composition pipeline: x → g(x) → f(g(x))",
        caption: "f(x)=√x, g(x)=x+1",
        params: { x: 0 },
        scriptedTimeline: [
          { t: 0, params: { x: 0 } },
          { t: 4, params: { x: 3 } },
          { t: 8, params: { x: -1 } },
        ],
      },
    },
    notes:
      "Composition is the idea of 'plugging one function into another.' The diagram on the right is the key visual, three boxes in a pipeline, connected by arrows. Emphasise that the ORDER matters: f∘g is read right-to-left (g first, then f), which trips up students who read left-to-right.\n\nFor the domain, both filters must pass: x must be in g's domain, AND g(x) must be in f's domain. In the example, g has no restriction (all reals work), but f=√ requires a non-negative input. So g(x)=x+1 ≥ 0 → x ≥ −1.\n\nMove the slider to x=−1 last to show the boundary point clearly. Then briefly mention this foundation will appear again as the chain rule in differentiation.",
  },
  {
    id: "s09_composition_domain_tricky",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 3: Composition with a Hole in the Domain",
    question: "What is the domain of \\((f\\circ g)(x)\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_steps",
          type: "example_solution",
          title: "Find \\((f\\circ g)(x)\\) and its domain",
          text: "\\(f(x)=\\dfrac{1}{x-1},\\quad g(x)=\\sqrt{x}\\).",
          steps: [
            {
              id: "step_1",
              text: "**Substitute:** \\(f(g(x))=f(\\sqrt{x})\\), apply \\(g\\) first.",
              widgetId: "body_function_analysis",
              widgetParams: { x: 0.5 },
            },
            {
              id: "step_2",
              text: "**Simplify:** \\(\\dfrac{1}{\\sqrt{x}-1}\\).",
              widgetId: "body_function_analysis",
              widgetParams: { x: 0.5 },
            },
            {
              id: "step_3",
              text: "**Inner domain:** \\(x\\ge0\\) (\\(\\sqrt{x}\\) needs a non-negative input).",
              widgetId: "body_function_analysis",
              widgetParams: { x: 0 },
            },
            {
              id: "step_4",
              text: "**Outer filter:** \\(\\sqrt{x}\\neq1 \\Rightarrow x\\neq1\\) (denominator cannot be 0).",
              widgetId: "body_function_analysis",
              widgetParams: { x: 1 },
            },
            {
              id: "step_5",
              text: "**Domain:** \\([0,1)\\cup(1,\\infty)\\).",
              widgetId: "body_function_analysis",
              widgetParams: { x: 2 },
            },
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
        variant: "flex_plot",
        plot: {
          plotType: "y_equals",
          expr: "1/(sqrt(x)-1)",
          formula:
            "(f\\circ g)(x)=\\frac{1}{\\sqrt{x}-1}\\qquad x\\ge0,\\;x\\ne1",
          xDomain: [-0.4, 4],
          yDomain: [-6, 6],
          excludeNear: 1,
          probeMin: 0,
          probeMax: 4,
          probeDefault: 0,
          vLines: [{ x: 1 }],
          tags: [
            { text: "domain [0,1) U (1,∞)", anchor: "end", tone: "accent" },
            { text: "vertical break at x=1", x: 1, y: -4, tone: "warn" },
          ],
        },
        title: "Graph of 1/(√x − 1) with domain highlighted",
        caption: "",
        params: { x: 0 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.5 } },
          { t: 4, params: { x: 1 } },
          { t: 8, params: { x: 3 } },
        ],
      },
    },
    notes:
      "This example deliberately has TWO domain restrictions, a non-negative requirement from the square root AND a zero-denominator exclusion from the rational part. Students who only apply one filter will get the wrong domain.\n\nStep 3: g(x)=√x requires x ≥ 0.\nStep 4: f(u)=1/(u−1) is undefined when u=1, so √x ≠ 1, meaning x ≠ 1.\nCombined: x ≥ 0 and x ≠ 1, written [0,1)∪(1,∞).\n\nIn the widget, move the slider to x=1 so students see the function blow up (vertical asymptote), then to x=0.5 and x=3 to show valid regions.\n\nPause prompt (reverse composition): (g∘f)(x) = g(f(x)) = √(1/(x−1)). Inner domain: x ≠ 1. Outer: 1/(x−1) ≥ 0 → x > 1. Combined domain: (1, ∞).",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 5: EVEN & ODD SYMMETRY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s10_even_and_odd_functions",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Even and Odd Functions",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "**Even:** \\(f(-x)=f(x)\\) for all \\(x\\) in the domain, symmetric about the **y-axis**.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "**Odd:** \\(f(-x)=-f(x)\\) for all \\(x\\), symmetric about the **origin** (180° rotational symmetry).",
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
          id: "left_preview",
          type: "paragraph",
          text: "**Later in calculus:** even symmetry halves integration work on symmetric intervals; odd symmetry cancels net area.",
        },
      ],
      lead: "**Even**: y-axis mirror. **Odd**: 180° origin rotation. Test: compute \\(f(-x)\\) and compare.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_function_analysis",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "symmetry_even_odd",
          formula: "\\text{even: }f(-a)=f(a)\\qquad\\text{odd: }g(-a)=-g(a)",
          evenExpr: "x*x/2",
          oddExpr: "x*x*x/4",
          xDomain: [-3, 3],
          yDomain: [-5, 5],
          probeParam: "a",
          probeMin: 0.5,
          probeMax: 2.6,
          probeDefault: 1.5,
          probeLabel: "a",
          tags: [
            {
              text: "gray even: mirror y-axis",
              x: -2.8,
              y: 4.5,
              tone: "muted",
            },
            {
              text: "orange odd: origin symmetry",
              anchor: "end",
              tone: "accent",
            },
          ],
        },
        title: "Even vs. odd symmetry side by side",
        caption: "",
        params: { a: 1.5 },
        scriptedTimeline: [
          { t: 0, params: { a: 1.5 } },
          { t: 5, params: { a: 2.0 } },
          { t: 9, params: { a: 0.8 } },
        ],
      },
    },
    notes:
      "The visual should carry most of the load here. For the even function (parabola), the two coloured dots are at the same height on opposite sides of the y-axis, mirror symmetry. For the odd function (cubic), the two dots are at opposite heights AND opposite sides, rotational symmetry about the origin.\n\nKey practical value (hint at calculus): for even functions, ∫₋ₐᵃ f(x)dx = 2∫₀ᵃ f(x)dx. For odd functions, ∫₋ₐᵃ f(x)dx = 0. This will save enormous computation in integration.\n\nPause answer: sin(−x) = −sin(x), so sine is odd.",
  },
  {
    id: "s11_even_odd_worked_example",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 4: Classify a Rational Function",
    question: "Is \\(h(x)=\\dfrac{x^3}{x^2+1}\\) even, odd, or neither?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "h(x)=\\frac{x^3}{x^2+1}",
          steps: [
            {
              id: "step_1",
              math: "h(-x)=\\frac{(-x)^3}{(-x)^2+1}=\\frac{-x^3}{x^2+1}",
              gap: "tight",
              say: "Substitute −x and simplify.",
              widgetId: "right_function_analysis",
              widgetParams: { a: 2 },
            },
            {
              id: "step_2",
              math: "h(x)=\\frac{x^3}{x^2+1}",
              gap: "tight",
              say: "Compare to the original formula.",
              widgetId: "right_function_analysis",
              widgetParams: { a: 1.5 },
            },
            {
              id: "step_3",
              math: "h(-x)=-h(x)",
              gap: "tight",
              say: "Sign flips: odd function.",
              widgetId: "right_function_analysis",
              widgetParams: { a: 2.5 },
            },
            {
              id: "step_4",
              math: "\\text{odd power} \\div \\text{even power} \\Rightarrow \\text{odd}",
              say: "Numerator flips sign; denominator does not.",
              widgetId: "right_function_analysis",
              widgetParams: { a: 3 },
            },
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
        variant: "flex_plot",
        plot: {
          plotType: "odd_symmetry",
          expr: "x*x*x/(x*x+1)",
          formula: "h(x)=\\frac{x^3}{x^2+1}\\qquad h(-x)=-h(x)",
          xDomain: [-4, 4],
          yDomain: [-4, 4],
          probeParam: "a",
          probeMin: 0.5,
          probeMax: 3.2,
          probeDefault: 2,
          tags: [
            { text: "origin symmetry → odd", anchor: "end", tone: "accent" },
          ],
        },
        title: "h(x) = x³/(x²+1): odd symmetry",
        caption: "",
        params: { a: 2 },
        scriptedTimeline: [
          { t: 0, params: { a: 2 } },
          { t: 5, params: { a: 1 } },
          { t: 9, params: { a: 3 } },
        ],
      },
    },
    notes:
      "This example pairs nicely with the previous slide, students just learned the concept, now they apply the algebraic test to a less-obvious function.\n\nThe trick: identify the parity of numerator and denominator separately. Numerator x³ is odd (odd power → sign flips). Denominator x²+1 is even (even power → no sign change; constant also even). Odd ÷ even = odd. So the function is odd.\n\nThe dashed line through the origin on the graph is a nice visual, it emphasises that for an odd function, the points (a, f(a)) and (−a, f(−a)) are always directly across the origin from each other.\n\nPause answer: h(x)=x³/(x²+1). h(−x)=−h(x) → ODD.",
  },
  {
    id: "s13_challenge_product_even_odd",
    type: "two-col",
    hud: "Arian University • Calculus 1",
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
          id: "body_proof",
          type: "example_solution",
          title: "Proof sketch",
          text: "\\(h(x)=f(x)g(x)\\), with \\(f\\) even and \\(g\\) odd.",
          steps: [
            {
              id: "step_1",
              text: "\\(h(-x)=f(-x)\\cdot g(-x)\\)",
            },
            {
              id: "step_2",
              text: "\\(f(-x)=f(x)\\) and \\(g(-x)=-g(x)\\)",
            },
            {
              id: "step_3",
              text: "\\(h(-x)=f(x)\\cdot(-g(x))=-f(x)g(x)=-h(x)\\)",
            },
            {
              id: "step_4",
              text: "Therefore \\(h\\) is **odd** (even × odd = odd).",
            },
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
        variant: "flex_plot",
        plot: {
          plotType: "odd_symmetry",
          expr: "x*(x*x+1)/3",
          formula: "h(-x)=f(-x)g(-x)=f(x)(-g(x))=-h(x)",
          xDomain: [-3, 3],
          yDomain: [-5, 5],
          probeParam: "a",
          probeMin: 0.5,
          probeMax: 2.2,
          probeDefault: 1.2,
          probe: false,
          tags: [
            {
              text: "f even, g odd => h=fg odd",
              anchor: "end",
              tone: "accent",
            },
          ],
        },
        title: "x²·x³ = x⁵: even × odd = odd",
        caption: "",
        params: { a: 1.2 },
        scriptedTimeline: [
          { t: 0, params: { a: 1.2 } },
          { t: 5, params: { a: 1.6 } },
          { t: 9, params: { a: 0.8 } },
        ],
      },
    },
    notes:
      "Light challenge slide, the proof is genuinely one-step once students know the definitions. The value is the abstract reasoning practice, not computational complexity.\n\nThe graph reinforces concretely: x²·x³ = x⁵, and x⁵ is visibly an odd function (origin symmetry).\n\nFollow-up drill (give answers if time): \n• odd × odd: h(-x) = f(-x)g(-x) = (−f(x))(−g(x)) = f(x)g(x) = h(x) → EVEN\n• even × even: h(-x) = f(-x)g(-x) = f(x)g(x) = h(x) → EVEN\n\nPause answer: odd × odd = even.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 6: PIECEWISE FUNCTIONS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s12_piecewise_functions",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 5: Piecewise Functions",
    question:
      "What is \\(f(1.5)\\)? And is this function continuous everywhere?",
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
              text: "\\(f(-1) = (-1)^2 = 1\\) , uses piece 1 since \\(-1<0\\).",
              widgetParams: { x: -1 },
            },
            {
              id: "step_eval2",
              text: "\\(f(0)=1\\), piece 2 includes \\(x=0\\); piece 1 has open dot \\((0,0)\\).",
              widgetParams: { x: 0 },
            },
            {
              id: "step_eval3",
              text: "\\(f(1.5) = 2(1.5)+1 = 4\\) , uses piece 2.",
              widgetParams: { x: 1.5 },
            },
            {
              id: "step_eval4",
              text: "\\(f(2)=5\\), closed dot on piece 2; open dot \\((2,3)\\) for piece 3.",
              widgetParams: { x: 2 },
            },
            {
              id: "step_eval5",
              text: "\\(f(3) = 5-3 = 2\\) , uses piece 3.",
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
        variant: "flex_plot",
        plot: {
          plotType: "piecewise",
          formula:
            "f(x)=\\begin{cases}x^2,&x<0\\2x+1,&0\\le x\\le2\\5-x,&x>2\\end{cases}",
          xDomain: [-3, 4],
          yDomain: [-0.5, 6],
          probeMin: -2.5,
          probeMax: 3.5,
          probeDefault: 1.5,
          branches: [
            {
              expr: "x*x",
              xMin: -3,
              xMax: 0,
              openAtEnd: true,
              stroke: "#64748b",
              strokeWidth: 3,
            },
            { expr: "2*x+1", xMin: 0, xMax: 2, stroke: "#c65a28" },
            {
              expr: "5-x",
              xMin: 2,
              xMax: 4,
              openAtStart: true,
              stroke: "#2563eb",
              strokeWidth: 3,
            },
          ],
          openPoints: [
            { x: 0, y: 0, class: "calculus-point open muted" },
            { x: 2, y: 3, class: "calculus-point open blue" },
          ],
          filledPoints: [
            { x: 0, y: 1 },
            { x: 2, y: 5 },
          ],
          tags: [
            {
              text: "hollow = excluded | filled = included",
              anchor: "end",
              tone: "muted",
            },
          ],
        },
        title: "Piecewise function with open/closed dots",
        caption: "",
        params: { x: 1.5 },
        scriptedTimeline: [
          { t: 0, params: { x: -1 } },
          { t: 3, params: { x: 0 } },
          { t: 6, params: { x: 1.5 } },
          { t: 9, params: { x: 3 } },
        ],
      },
    },
    notes:
      "The key skill here is always 'which piece do I use?', students must check the condition on x before evaluating.\n\nCritical notation: open circles (hollow dots) mean the endpoint is NOT included; closed circles (filled dots) mean it IS included. Walk through each boundary carefully.\n\nAt x=0: piece 1 (x<0) does NOT include x=0, so there's an open circle at (0,0). Piece 2 DOES include x=0 (because 0≤x≤2), giving f(0)=1. Since the left limit (0) ≠ the function value (1), there is a jump discontinuity at x=0.\n\nAt x=2: piece 2 includes x=2 with f(2)=5. Piece 3 (x>2) starts with an open circle at (2,3). Since the left value (5) ≠ the right limit (3), there is a jump at x=2 too.\n\nNote: The original narration said 'continuous at x=0'. This was incorrect and has been fixed. The function has jump discontinuities at both x=0 and x=2.\n\nPause answers: f(1.5) = 2(1.5)+1 = 4. The function is NOT continuous, it has jumps at x=0 and x=2.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s14_key_takeaways",
    type: "text",
    hud: "Arian University • Calculus 1",
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
            text: "**Function families** (see s02 gallery), linear, quadratic, power, polynomial, rational, trig, exponential, logarithmic.",
          },
          {
            id: "bullet_2",
            text: "**Domain & range** (Example 1, s03), radicands ≥ 0, denominators ≠ 0, log arguments > 0.",
          },
          {
            id: "bullet_3",
            text: "**Transformations** (s04–s07), horizontal shift → horizontal stretch → vertical stretch → vertical shift. Horizontal sign is **opposite** to intuition.",
          },
          {
            id: "bullet_4",
            text: "**Composition** (Examples 2–3, s08–s09), inner then outer; domain must pass **both** filters.",
          },
          {
            id: "bullet_5",
            text: "**Even / odd** (s10–s11), test \\(f(-x)\\); odd integrals over \\([-a,a]\\) vanish.",
          },
          {
            id: "bullet_6",
            text: "**Piecewise** (Example 5, s12), pick the correct piece; open vs. closed dots mark jumps.",
          },
        ],
      },
    ],
    media: null,
    notes:
      "Close the session by mapping each takeaway back to a specific example from the video. For instance: 'We saw that domain trick in Example 3 with the composition.' This reinforces that the summary bullets are not abstract, they each have a concrete moment in the session.\n\nTeaser for next session: these tools underpin limits and derivatives. When you see lim_{x→a} f(g(x)), you'll need composition. When you differentiate f(g(x)), you'll need the chain rule, which is just composition again. Even/odd will save you half the work on definite integrals over symmetric intervals.",
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
 *   - s12 (Piecewise): Original notes stated "continuous at x=0", INCORRECT.
 *     The function has a jump at x=0 (left limit = 0, function value = 1) and a
 *     second jump at x=2 (left value = 5, right limit = 3). Both jumps now
 *     documented in notes and added to student question.
 *
 * SCRIPTED TIMELINE FIX (s06 / misconception slide)
 *   - Original: animated to h=1.5, k=1, which moves the parabola right and
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
 * flex_plot migration (2026-06-16): function_analysis variants → declarative plot specs.
 *
 * Footer / density pass (2026-06-17)
 *   - s10: removed pause_and_reveal ("Pause and test") and footer question;
 *     left column is definitions + examples only.
 *   - s07: nested_bullets order list without manual step numbers.
 *
 * Topic 01 UX pass (2026-06-17, page-number refs)
 *   - Page 4 (families): gallery restored; cosine→power mini plot; exp/log
 *     use per-family mini-plot domains.
 *   - Page 13: footer question matches h(x)=x³/(x²+1).
 *   - Page 10 (composition): pipeline readout box under plot (x, g(x), f∘g).
 *   - Page 11 (composition domain): example_solution (fits slide; mixed text).
 *   - Page 14 (challenge proof): example_solution like page 15 piecewise.
 *
 * Topic 01 slide sync pass (2026-06-17)
 *   - s02: eight-family scriptedTimeline (incl. log, rational, trig); gallery
 *     highlights active family via params.family.
 *   - s03, s09, s13: math_table / example_solution → math_solution_steps with
 *     widgetId + widgetParams on paired plots.
 *   - s05: scriptedTimelines split vertical_a / horizontal_b (mirror s04 k/h).
 *   - s06: misconception + timeline aligned to f(x−5), h=±5.
 *   - s07, s11: transformation / odd-classification as math_solution_steps.
 *   - s08: composition_sqrt variant for live x → g(x) → f(g(x)) readout.
 *   - s11: probe enabled on odd_symmetry plot.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
