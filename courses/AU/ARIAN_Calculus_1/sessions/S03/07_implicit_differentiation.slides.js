// Generated from courses/Calculus/Materials/implicit_differentiation.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "07_implicit_differentiation",
  title: "Implicit Differentiation",
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
    title: "Implicit Differentiation",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic 14 • Session 3 finale: implicit curves & dy/dx • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back, Topics 8–13 built derivatives from definition through power, product, and chain rules. Topic 14 closes Session 3: differentiate when y is not isolated. The only new ingredient is chain rule on y-terms from Topic 13. Do not re-introduce Arian from scratch.",
  },
  {
    id: "learning_objectives",
    type: "bullets",
    hud: "Arian University • Calculus 1",
    title: "Learning Objectives",
    lead: "Welcome back, Session 3 closes here. By the end of this topic you will be able to:",
    blocks: [
      {
        id: "calculus1_roadmap",
        type: "course_path",
        layout: "topic_grid",
        currentId: "path_topic_14",
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
          { id: "path_topic_13", number: 13, session: "S03 Derivative Foundations and Rules", label: "The Chain Rule", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_14", number: 14, session: "S03 Derivative Foundations and Rules", label: "Implicit Differentiation", note: "Today", status: "current", expanded: true },
          { id: "path_topic_15", number: 15, session: "S04 Applications of Derivatives", label: "Related Rates", note: "Next", status: "next", expanded: true },
          { id: "path_topic_16", number: 16, session: "S04 Applications of Derivatives", label: "Critical Points and Extrema on an Interval", status: "upcoming" },
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
      { id: "objective_1", text: "Differentiate equations where \\(y\\) is not isolated" },
      { id: "objective_2", text: "Apply the chain rule to \\(y\\)-terms automatically (Topic 13 callback)" },
      { id: "objective_3", text: "Solve for \\(\\frac{dy}{dx}\\) using algebraic manipulation" },
      { id: "objective_4", text: "Find tangent lines to implicitly defined curves" },
      { id: "objective_5", text: "Compute higher-order derivatives implicitly" },
      { id: "objective_6", text: "Derive and use **inverse trig** derivative formulas via implicit differentiation" },
    ],
    notes:
      "Roadmap first: Topics 8–13 completed, Topic 14 current, Topic 15 Related Rates next. Five objectives map to workflow → examples → tangents → second derivatives.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: EXPLICIT VS IMPLICIT + WORKFLOW
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_explicit_vs_implicit_the_mountain_trail",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Explicit vs. Implicit: The Mountain Trail",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "**Explicit:** \\(y = \\sqrt{25 - x^2}\\), we know exactly what \\(y\\) equals.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "**Implicit:** \\(x^2 + y^2 = 25\\), \\(y\\) is hidden inside the equation.",
        },
        {
          id: "left_paragraph_3",
          type: "paragraph",
          text: "Implicit differentiation finds the **slope** anywhere *without* solving for \\(y\\). Topic 13's chain rule is the engine.",
        },
      ],
      lead: "Explicit isolates \\(y\\); implicit ties \\(x\\) and \\(y\\) together. We can still get \\(dy/dx\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_circle_trail",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Circle trail: \\(x^2+y^2=25\\)",
        caption: "Upper and lower branches: same implicit curve, two explicit graphs.",
        formulaLabel: "y",
        plot: {
          plotType: "piecewise",
          formula: "x^2+y^2=25",
          xDomain: [-6, 6],
          yDomain: [-6, 6],
          branches: [
            { expr: "sqrt(25-x*x)", xMin: -5, xMax: 5, stroke: "#2563eb" },
            { expr: "-sqrt(25-x*x)", xMin: -5, xMax: 5, stroke: "#1d4ed8" },
          ],
          tags: [
            { text: "(3,4)", x: 3, y: 4 },
            { text: "implicit", x: -4.2, y: 4.8 },
          ],
          probe: true,
          probeDefault: 3,
        },
        params: { x: 3 },
        scriptedTimeline: [
          { t: 0, params: { x: 3 } },
          { t: 5, params: { x: -3 } },
        ],
      },
    },
    notes:
      "Mountain-trail metaphor. Explicit vs implicit side by side. Circle on screen, two sqrt branches. Callback: chain rule from Topic 13 will tag every y-term with dy/dx.",
  },
  {
    id: "s02_the_one_new_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The One New Rule",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Chain rule on \\(y\\)-terms",
          text: "Treat \\(y=y(x)\\). Then \\(\\frac{d}{dx}[y^n]=n\\,y^{n-1}\\cdot\\frac{dy}{dx}\\). Every \\(y\\)-factor you differentiate picks up a \\(\\frac{dy}{dx}\\) from Topic 13.",
        },
        {
          id: "left_workflow",
          type: "nested_bullets",
          items: [
            { id: "wf_1", text: "**Differentiate both sides** w.r.t. \\(x\\)." },
            { id: "wf_2", text: "**Treat \\(y\\) as \\(y(x)\\)**, chain rule on every \\(y\\)-term." },
            { id: "wf_3", text: "**Collect** all \\(\\frac{dy}{dx}\\) terms on one side." },
            { id: "wf_4", text: "**Factor and solve** for \\(\\frac{dy}{dx}\\)." },
          ],
        },
        {
          id: "left_sin_xy",
          type: "math_solution_steps",
          problem: "\\sin(xy)=x+y",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\cos(xy)\\left(y + x\\frac{dy}{dx}\\right) = 1 + \\frac{dy}{dx}",
              gap: "tight",
              say: "Chain rule on sin(xy); product rule inside.",
            },
            {
              id: "step_2",
              math: "x\\cos(xy)\\frac{dy}{dx} - \\frac{dy}{dx} = 1 - y\\cos(xy)",
              gap: "tight",
              say: "Move dy/dx terms to one side.",
            },
            {
              id: "step_3",
              math: "\\frac{dy}{dx} = \\frac{1 - y\\cos(xy)}{x\\cos(xy) - 1}",
              say: "Factor dy/dx and divide.",
            },
          ],
        },
      ],
      lead: "One new rule + four-step workflow. Product and chain rules from Topics 12–13 still apply.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_formula",
          type: "formula_block",
          formulas: [
            "$$\\frac{d}{dx}[y^n]=n\\,y^{n-1}\\cdot\\frac{dy}{dx}$$",
            "**Reflex:** finish a \\(y\\)-derivative → multiply by \\(\\frac{dy}{dx}\\).",
          ],
        },
      ],
      media: null,
    },
    notes:
      "theorem_box + workflow nested_bullets. sin(xy)=x+y compact example shows chain + product together. Emphasize Topic 13 callback.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: CORE EXAMPLES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s03_warm_up_the_circle",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: The Circle (Pause)",
    question: "Before revealing the slope at (3,4), what do you expect? (Hint: radius slope = 4/3)",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "x^2+y^2=25",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "2x + 2y\\frac{dy}{dx} = 0",
              gap: "tight",
              say: "Differentiate both sides; chain rule on y squared.",
            },
            {
              id: "step_2",
              math: "2y\\frac{dy}{dx} = -2x",
              gap: "tight",
              say: "Isolate the dy/dx term.",
            },
            {
              id: "step_3",
              math: "\\frac{dy}{dx} = -\\frac{x}{y}",
              gap: "tight",
              say: "Solve for dy/dx.",
            },
            {
              id: "step_4",
              parts: [
                { math: "\\left.\\frac{dy}{dx}\\right|_{(3,4)}" },
                { math: "-\\frac{3}{4}", op: "=" },
              ],
              say: "At (3,4) the slope is negative three quarters.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Radius slope \\(4/3\\), what slope is perpendicular?",
          reveal: {
            text: "**Tangent slope** \\(=-\\frac{3}{4}\\). Radius and tangent are perpendicular.",
          },
        },
      ],
      lead: "\\(x^2+y^2=r^2\\) gives \\(dy/dx=-x/y\\), the circle template.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_circle_tangent",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Circle with probe at (3,4)",
        caption: "Slope \\(-x/y\\) at (3,4) is \\(-3/4\\); radius slope \\(4/3\\).",
        formulaLabel: "y",
        plot: {
          plotType: "piecewise",
          formula: "x^2+y^2=25",
          xDomain: [-6, 6],
          yDomain: [-6, 6],
          branches: [
            { expr: "sqrt(25-x*x)", xMin: -5, xMax: 5, stroke: "#2563eb" },
            { expr: "-sqrt(25-x*x)", xMin: -5, xMax: 5, stroke: "#1d4ed8" },
          ],
          tags: [
            { text: "(3,4)", x: 3, y: 4 },
            { text: "m=-3/4", x: 4.5, y: 2.2 },
          ],
          probe: true,
          probeDefault: 3,
        },
        params: { x: 3 },
        scriptedTimeline: [
          { t: 0, params: { x: 3 } },
          { t: 6, params: { x: 3 } },
        ],
      },
    },
    notes:
      "math_solution_steps for circle. YouTube pause before step_4, predict perpendicular slope. Graph confirms radius ⟂ tangent.",
  },
  {
    id: "s04_the_formula_implicit_function_theorem",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Hyperbola Warm-Up + Implicit Function Theorem (Optional)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "xy=1",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "y + x\\frac{dy}{dx} = 0",
              gap: "tight",
              say: "Product rule on xy; derivative of 1 is zero.",
            },
            {
              id: "step_2",
              math: "x\\frac{dy}{dx} = -y",
              gap: "tight",
              say: "Isolate dy/dx term.",
            },
            {
              id: "step_3",
              math: "\\frac{dy}{dx} = -\\frac{y}{x}",
              say: "Divide, matches quotient rule intuition.",
            },
          ],
        },
        {
          id: "left_ift",
          type: "theorem_box",
          title: "Implicit function theorem (quick form)",
          text: "For \\(F(x,y)=0\\): \\(\\frac{dy}{dx}=-\\frac{F_x}{F_y}\\) when \\(F_y\\neq 0\\). For \\(xy-1=0\\): \\(F_x=y\\), \\(F_y=x\\) ⇒ \\(dy/dx=-y/x\\).",
        },
      ],
      lead: "\\(xy=1\\) uses the product rule; the IFT formula is a shortcut.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_formula",
          type: "formula_block",
          formulas: [
            "$$\\frac{dy}{dx}=-\\frac{F_x}{F_y}\\quad(F_y\\neq 0)$$",
            "Differentiate \\(F(x,y(x))=0\\) → \\(F_x+F_y\\frac{dy}{dx}=0\\).",
          ],
        },
      ],
      media: {
        id: "right_hyperbola",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Hyperbola \\(xy=1\\)",
        caption: "Two branches \\(y=1/x\\): implicit, not a single function.",
        formulaLabel: "y",
        plot: {
          plotType: "piecewise",
          formula: "xy=1",
          xDomain: [-5, 5],
          yDomain: [-5, 5],
          branches: [
            { expr: "1/x", xMin: 0.25, xMax: 5, stroke: "#c65a28" },
            { expr: "1/x", xMin: -5, xMax: -0.25, stroke: "#b45309" },
          ],
          tags: [{ text: "dy/dx = -y/x", x: 2.5, y: 2.8 }],
          probe: true,
          probeDefault: 2,
        },
        params: { x: 2 },
      },
    },
    notes:
      "xy=1 math_solution_steps + flex_plot hyperbola branches. Optional IFT formula as theorem_box, same answer as step-by-step.",
  },
  {
    id: "s05_standard_example_folium_of_descartes",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Standard Example: Folium of Descartes",
    question: "Quick check: verify that (3,3) satisfies \\(x^3+y^3=6xy\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          splitAfter: 4,
          problem: "x^3+y^3=6xy \\text{ at }(3,3)",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "3x^2 + 3y^2\\frac{dy}{dx} = 6\\left(x\\frac{dy}{dx}+y\\right)",
              gap: "tight",
              say: "Differentiate; product rule on 6xy.",
            },
            {
              id: "step_2",
              math: "3y^2\\frac{dy}{dx} - 6x\\frac{dy}{dx} = 6y - 3x^2",
              gap: "tight",
              say: "Collect dy/dx terms.",
            },
            {
              id: "step_3",
              math: "\\frac{dy}{dx}(3y^2-6x) = 6y - 3x^2",
              gap: "tight",
              say: "Factor dy/dx.",
            },
            {
              id: "step_4",
              math: "\\frac{dy}{dx} = \\frac{6y-3x^2}{3y^2-6x}",
              gap: "tight",
              say: "Solve for dy/dx.",
            },
            {
              id: "step_5",
              parts: [
                { math: "\\left.\\frac{dy}{dx}\\right|_{(3,3)}" },
                { math: "-1", op: "=" },
              ],
              gap: "tight",
              say: "Substitute (3,3), slope is negative one.",
            },
            {
              id: "step_6",
              math: "y-3=-1(x-3)\\Rightarrow y=-x+6",
              say: "Tangent line at (3,3).",
            },
          ],
        },
      ],
      lead: "Product rule on \\(6xy\\), then group and solve, classic symmetric curve.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_check",
          type: "paragraph",
          text: "**Check:** \\(27+27=54\\) and \\(6\\cdot3\\cdot3=54\\), \\((3,3)\\) lies on the curve.",
        },
      ],
      media: {
        id: "right_folium_tangent",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Tangent at (3,3)",
        caption: "Folium \\(x^3+y^3=6xy\\); tangent \\(y=-x+6\\) through (3,3).",
        formulaLabel: "tangent",
        plot: {
          plotType: "y_equals",
          formula: "y=-x+6",
          expr: "-x+6",
          xDomain: [0, 6],
          yDomain: [0, 6],
          curves: [
            { expr: "-x+6", stroke: "#dc2626", dashed: true },
          ],
          tags: [{ text: "(3,3) m=-1", x: 3, y: 3 }],
          probe: true,
          probeDefault: 3,
        },
        params: { x: 3 },
      },
    },
    notes:
      "Folium split math_solution_steps. Verify (3,3) on curve. Tangent line on graph. Group-before-factor habit.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: MISTAKES + HIGHER DERIVATIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s06_common_mistake_forgetting_dy_dx",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Common Mistake: Forgetting dy/dx",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Chain rule reflex",
          pairs: [
            {
              label: "❌ Forgetting \\(dy/dx\\)",
              text: "\\(\\frac{d}{dx}[y^2]=2y\\), treats \\(y\\) as a constant.",
            },
            {
              label: "✅ Chain rule on \\(y(x)\\)",
              text: "\\(\\frac{d}{dx}[y^2]=2y\\cdot\\frac{dy}{dx}\\), Topic 13 every time.",
            },
          ],
        },
        {
          id: "left_tip",
          type: "paragraph",
          text: "**Habit:** every time you differentiate a \\(y\\)-term, immediately attach \\(\\cdot\\frac{dy}{dx}\\). One missing factor breaks the whole solution.",
        },
      ],
      lead: "The #1 implicit error: power rule on \\(y\\) without the chain factor.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_reflex",
          type: "nested_bullets",
          items: [
            { id: "r1", text: "\\(y^3\\) → \\(3y^2\\frac{dy}{dx}\\)" },
            { id: "r2", text: "\\(\\sin y\\) → \\(\\cos y\\cdot\\frac{dy}{dx}\\)" },
            { id: "r3", text: "\\(e^y\\) → \\(e^y\\frac{dy}{dx}\\)" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "misconception_compare wrong vs right. Drill the reflex with three quick patterns. Callback Topic 13 chain rule.",
  },
  {
    id: "s07_try_this_second_derivative",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Try This: Second Derivative (Pause)",
    question: "Find \\(y''\\) for \\(x^4+y^4=16\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "**Find \\(y''\\) if \\(x^4+y^4=16\\)**",
        },
        {
          id: "left_bullets",
          type: "nested_bullets",
          items: [
            { id: "left_bullet_1", text: "Differentiate implicitly to find \\(y'\\)." },
            { id: "left_bullet_2", text: "Differentiate \\(y'\\) again, quotient rule + chain rule." },
            { id: "left_bullet_3", text: "\\(y\\) is still a function of \\(x\\) in the second pass!" },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and try",
          prompt: "Work \\(y'\\) first, then differentiate. Reveal when ready.",
          reveal: {
            text: "**Hint:** \\(y'=-x^3/y^3\\). Quotient rule on \\(y'\\), then substitute the original equation to clean up.",
          },
        },
      ],
      lead: "Pause the video, second derivatives need the chain rule twice.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_note",
          type: "formula_block",
          formulas: [
            "First pass: \\(4x^3+4y^3y'=0\\).",
            "Second pass: quotient rule on \\(y'=-x^3/y^3\\).",
          ],
        },
      ],
      media: null,
    },
    notes:
      "Real YouTube pause, hint reveal only, full solution on next slide. Emphasize y still depends on x in second pass.",
  },
  {
    id: "s08_second_derivative_solution",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Second Derivative: Solution",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          splitAfter: 3,
          problem: "x^4+y^4=16",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "4x^3+4y^3y'=0",
              gap: "tight",
              say: "First implicit pass.",
            },
            {
              id: "step_2",
              math: "y'=-\\frac{x^3}{y^3}",
              gap: "tight",
              say: "Solve for y prime.",
            },
            {
              id: "step_3",
              math: "y''=-\\frac{y^3\\cdot 3x^2-x^3\\cdot 3y^2y'}{y^6}",
              gap: "tight",
              say: "Quotient rule on y prime.",
            },
            {
              id: "step_4",
              math: "y''=-\\frac{3x^2y^4+3x^6}{y^7}",
              gap: "tight",
              say: "Substitute y prime and simplify.",
            },
            {
              id: "step_5",
              parts: [
                { math: "y''" },
                { math: "-\\frac{48x^2}{y^7}", op: "=" },
              ],
              say: "Use x^4+y^4=16 to replace y^4+x^4 with 16.",
            },
          ],
        },
      ],
      lead: "Substitute the original equation last to collapse \\(x^4+y^4\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_trick",
          type: "paragraph",
          text: "**Cleanup trick:** after algebra, plug \\(x^4+y^4=16\\) to eliminate mixed powers.",
        },
      ],
      media: null,
    },
    notes:
      "Full second-derivative math_solution_steps with splitAfter. Cleanup using original equation is the key teaching moment.",
  },
  {
    id: "s09_challenge_optional_edge_case_self_intersection",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge: Optional] Edge Case: Self-Intersection",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_setup",
          type: "paragraph",
          text: "**Find \\(\\frac{dy}{dx}\\) at \\((0,0)\\) for \\(x^3+y^3=3xy\\)**",
        },
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "x^3+y^3=3xy",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\frac{dy}{dx}=\\frac{y-x^2}{y^2-x}",
              gap: "tight",
              say: "Same workflow as the folium, solve for dy/dx.",
            },
            {
              id: "step_2",
              math: "\\left.\\frac{dy}{dx}\\right|_{(0,0)}=\\frac{0}{0}",
              gap: "tight",
              say: "Indeterminate, not an algebra mistake.",
            },
            {
              id: "step_3",
              math: "F_y=3y^2-3x=0 \\text{ at }(0,0)",
              say: "IFT fails, multiple tangent directions at the crossing.",
            },
          ],
        },
      ],
      lead: "\\(0/0\\) at \\((0,0)\\) signals geometry, not a wrong derivative.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_self_intersect",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Self-intersection at the origin",
        caption: "Two branches, two slopes: \\(dy/dx\\) is not unique.",
        formulaLabel: "branches",
        plot: {
          plotType: "y_equals",
          formula: "x^3+y^3=3xy",
          xDomain: [-2, 2],
          yDomain: [-2, 2],
          curves: [
            { expr: "x", stroke: "#c65a28" },
            { expr: "-x", stroke: "#2563eb" },
          ],
          tags: [{ text: "(0,0) crossing", x: 0.15, y: 0.15 }],
          probe: true,
          probeDefault: 0.5,
        },
        params: { x: 0.5 },
      },
    },
    notes:
      "Optional challenge. 0/0 means self-intersection, F_y=0 at origin. Graph shows two branches crossing. Beautiful algebra-geometry link.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: APPLICATIONS + LAB
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s10_application_derivative_of_inverse_sine",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Derivative of Inverse Sine",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\frac{d}{dx}[\\sin^{-1}x]",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "y=\\sin^{-1}x \\Rightarrow \\sin y=x",
              gap: "tight",
              say: "Rewrite as an implicit equation.",
            },
            {
              id: "step_2",
              math: "\\cos y\\cdot y'=1",
              gap: "tight",
              say: "Differentiate; chain rule on sin y.",
            },
            {
              id: "step_3",
              math: "y'=\\frac{1}{\\cos y}=\\frac{1}{\\sqrt{1-x^2}}",
              say: "Solve and use sin y equals x.",
            },
          ],
        },
      ],
      lead: "Implicit differentiation derives inverse-trig formulas, no memorization required.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_note",
          type: "formula_block",
          formulas: [
            "$$\\frac{d}{dx}[\\sin^{-1}x]=\\frac{1}{\\sqrt{1-x^2}}$$",
            "Same method works for \\(\\cos^{-1}x\\), \\(\\tan^{-1}x\\), …",
          ],
        },
      ],
      media: {
        id: "right_arcsin",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "\\(\\sin^{-1}x\\) and slope at \\(x=0.5\\)",
        caption: "Slope \\(1/\\sqrt{1-x^2}\\approx 1.155\\) at \\(x=0.5\\).",
        formulaLabel: "y",
        plot: {
          plotType: "y_equals",
          formula: "y=asin(x)",
          expr: "asin(x)",
          xDomain: [-1.1, 1.1],
          yDomain: [-2, 2],
          probe: true,
          probeDefault: 0.5,
        },
        params: { x: 0.5 },
      },
    },
    notes:
      "Inverse sine via implicit diff. math_solution_steps clean three-step proof. flex_plot arcsin with probe at 0.5.",
  },
  {
    id: "s10b_inverse_trig_derivative_sheet",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Inverse Trig Derivatives (Reference Sheet)",
    question: "",
    lead: "Same implicit method as \\(\\sin^{-1}x\\), keep these on one slide:",
    blocks: [
      {
        id: "body_table",
        type: "math_table",
        headers: ["Function", "Derivative (principal branch)"],
        rows: [
          ["\\(\\sin^{-1}x\\)", "\\(\\dfrac{1}{\\sqrt{1-x^2}}\\)"],
          ["\\(\\cos^{-1}x\\)", "\\(-\\dfrac{1}{\\sqrt{1-x^2}}\\)"],
          ["\\(\\tan^{-1}x\\)", "\\(\\dfrac{1}{1+x^2}\\)"],
        ],
      },
      {
        id: "body_pause",
        type: "pause_and_reveal",
        title: "Pause: derive \\(\\tan^{-1}x\\)",
        prompt: "Set \\(y=\\tan^{-1}x\\), rewrite as \\(\\tan y=x\\), differentiate both sides, and solve for \\(y'\\).",
        reveal: {
          text: "\\(\\sec^2 y\\cdot y'=1\\Rightarrow y'=\\cos^2 y=\\frac{1}{1+x^2}\\). The minus on \\(\\cos^{-1}x\\) comes from \\(\\frac{d}{dx}[\\cos y]=-\\sin y\\).",
        },
      },
    ],
    media: null,
    notes:
      "Reference sheet closes the inverse-trig gap. Pause derives tan^{-1}; cos^{-1} is a one-line variant of the sin^{-1} proof on s10.",
  },
  {
    id: "s11_interactive_tangent_on_a_circle",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Tangent Slope on a Circle",
    question: "What happens to the tangent when \\(y=0\\)? Predict first, then drag the probe.",
    lead: "Circle \\(x^2+y^2=25\\), watch slope \\(-x/y\\) update as you move.",
    labSiteNote: "On the site, try all three tabs and drag the probe.",
    labExamples: [
      {
        id: "lab_ex_upper",
        label: "A · Upper branch",
        formula: "y=\\sqrt{25-x^2}",
        steps: [
          { id: "step_1", text: "Set probe on the upper semicircle." },
          { id: "step_2", text: "Read slope \\(-x/y\\) from the readout." },
        ],
        params: { x: 3, plot: { probeDefault: 3 } },
      },
      {
        id: "lab_ex_lower",
        label: "B · Lower branch",
        formula: "y=-\\sqrt{25-x^2}",
        steps: [
          { id: "step_1", text: "Move to the lower branch (negative \\(y\\))." },
          { id: "step_2", text: "Slope sign flips, same formula \\(-x/y\\)." },
        ],
        params: { x: 3, plot: { probeDefault: -3 } },
      },
      {
        id: "lab_ex_vertical",
        label: "C · Near \\(y=0\\)",
        formula: "x^2+y^2=25",
        steps: [
          { id: "step_1", text: "Drag toward \\(y=0\\), slope magnitude blows up." },
          { id: "step_2", text: "Tangent becomes vertical (undefined finite slope)." },
        ],
        params: { x: 4.9, plot: { probeDefault: 4.9 } },
      },
    ],
    blocks: [],
    media: {
      id: "lab_circle_tangent",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "Circle \\(x^2+y^2=25\\)",
      caption: "Slope \\(dy/dx=-x/y\\); radius ⟂ tangent at every point.",
      formulaLabel: "y",
      plot: {
        plotType: "piecewise",
        formula: "x^2+y^2=25",
        xDomain: [-6, 6],
        yDomain: [-6, 6],
        branches: [
          { expr: "sqrt(25-x*x)", xMin: -5, xMax: 5, stroke: "#2563eb" },
          { expr: "-sqrt(25-x*x)", xMin: -5, xMax: 5, stroke: "#1d4ed8" },
        ],
        probe: true,
        probeDefault: 3,
      },
      params: { x: 3 },
    },
    notes:
      "visual_lab, 30s YouTube demo of one tab; site students explore all three. Vertical tangent when y approaches 0. Optional but high value.",
  },
  {
    id: "s12_pro_tips",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pro Tips",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_bullets",
          type: "nested_bullets",
          items: [
            { id: "left_bullet_1", text: "**Product rule:** \\(x^2y\\) → \\(2xy+x^2\\frac{dy}{dx}\\)." },
            { id: "left_bullet_2", text: "**Group first:** collect all \\(\\frac{dy}{dx}\\) before factoring." },
            { id: "left_bullet_3", text: "**Substitute last:** plug in point coordinates after solving." },
            { id: "left_bullet_4", text: "**Chain reflex:** every \\(y\\)-term gets \\(\\cdot\\frac{dy}{dx}\\) (Topic 13)." },
            { id: "left_bullet_5", text: "**Sanity check:** circle \\(x^2+y^2=r^2\\) ⇒ slope \\(-x/y\\) ⟂ radius." },
          ],
        },
      ],
      lead: "Five habits that prevent the common implicit traps.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_summary",
          type: "theorem_box",
          title: "Workflow reminder",
          text: "Differentiate both sides → chain rule on \\(y\\)-terms → collect \\(\\frac{dy}{dx}\\) → factor → solve.",
        },
      ],
      media: null,
    },
    notes:
      "Pro tips nested_bullets + workflow theorem_box echo. Reinforce group-before-factor and substitute-last.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 5: CHECKS + SESSION CLOSE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s13_quick_check_1",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Quick Check 1 (Pause)",
    question: "Predict the correct answer before revealing.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_question",
          type: "paragraph",
          text: "**Q:** If \\(x^2y+y^3=10\\), what is \\(\\frac{dy}{dx}\\) at \\((1,2)\\)?",
        },
        {
          id: "left_options",
          type: "nested_bullets",
          items: [
            { id: "opt_a", text: "A) \\(-\\frac{2}{7}\\)" },
            { id: "opt_b", text: "B) \\(-\\frac{4}{13}\\)" },
            { id: "opt_c", text: "C) \\(\\frac{2}{7}\\)" },
            { id: "opt_d", text: "D) \\(\\frac{4}{13}\\)" },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and solve",
          prompt: "Differentiate, then plug in \\((1,2)\\) after solving for \\(dy/dx\\).",
          reveal: {
            text: "**Answer B:** \\(\\frac{dy}{dx}=-\\frac{2xy}{x^2+3y^2}=-\\frac{4}{13}\\) at \\((1,2)\\).",
          },
        },
      ],
      lead: "Product rule on \\(x^2y\\), chain rule on \\(y^3\\), then evaluate.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: null,
    },
    notes:
      "YouTube pause with real MC reveal. Walkthrough after reveal: 2xy + x²dy/dx + 3y²dy/dx = 0 → dy/dx = -2xy/(x²+3y²).",
  },
  {
    id: "s14_quick_check_2",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Quick Check 2 (Pause)",
    question: "Think about the derivative formula at (0,0) for \\(x^3+y^3=6xy\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_question",
          type: "paragraph",
          text: "**Q:** For \\(x^3+y^3=6xy\\), what is special about \\((0,0)\\)?",
        },
        {
          id: "left_options",
          type: "nested_bullets",
          items: [
            { id: "opt_a", text: "A) The tangent line is horizontal." },
            { id: "opt_b", text: "B) The slope is undefined (vertical tangent)." },
            { id: "opt_c", text: "C) The curve self-intersects there." },
            { id: "opt_d", text: "D) The derivative is undefined because \\(y=0\\)." },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and decide",
          prompt: "Recall the edge-case slide, what does \\(0/0\\) mean here?",
          reveal: {
            text: "**Answer C:** the folium crosses itself at the origin, two branches, two slopes.",
          },
        },
      ],
      lead: "Connect back to the self-intersection challenge.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_folium_origin",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Folium near the origin",
        caption: "Two branches meet at \\((0,0)\\): not a single tangent.",
        formulaLabel: "branches",
        plot: {
          plotType: "y_equals",
          formula: "x^3+y^3=6xy",
          xDomain: [-1.5, 1.5],
          yDomain: [-1.5, 1.5],
          curves: [
            { expr: "x", stroke: "#c65a28" },
            { expr: "-0.5*x", stroke: "#2563eb" },
          ],
          tags: [{ text: "(0,0)", x: 0.1, y: 0.1 }],
          probe: true,
          probeDefault: 0.4,
        },
        params: { x: 0.4 },
      },
    },
    notes:
      "Second quick check with pause_and_reveal. Answer C, self-intersection. Graph reinforces two-branch geometry.",
  },
  {
    id: "s15_summary_implicit_differentiation",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways: Session 3 Complete",
    question: "",
    lead: "Implicit differentiation closes the derivative-rules arc, Session 4 opens applications:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Workflow:** differentiate both sides → treat \\(y=y(x)\\) → chain rule on \\(y\\)-terms → collect \\(\\frac{dy}{dx}\\) → solve." },
          { id: "bullet_2", text: "**Templates:** \\(x^2+y^2=r^2\\Rightarrow dy/dx=-x/y\\); \\(xy=k\\Rightarrow dy/dx=-y/x\\)." },
          { id: "bullet_3", text: "**IFT shortcut:** \\(F(x,y)=0\\Rightarrow dy/dx=-F_x/F_y\\) when \\(F_y\\neq 0\\)." },
          { id: "bullet_4", text: "**#1 trap:** forgetting \\(\\frac{dy}{dx}\\) on \\(y\\)-terms, Topic 13 chain rule every time." },
          { id: "bullet_5", text: "**Session 3 arc:** rate of change (T8) → definition (T9) → power rules (T10–11) → product (T12) → chain (T13) → implicit (T14)." },
          { id: "bullet_6", text: "**Next, Session 4, Topic 15:** Related Rates, differentiating with respect to time." },
        ],
      },
      {
        id: "final_check",
        type: "pause_and_reveal",
        title: "Final check",
        prompt: "Differentiate \\(y^2+x^2=9\\) implicitly. What is \\(\\frac{dy}{dx}\\) at \\((0,3)\\)?",
        reveal: {
          text: "\\(2y\\frac{dy}{dx}+2x=0\\Rightarrow \\frac{dy}{dx}=-\\frac{x}{y}\\). At \\((0,3)\\): **slope \\(=0\\)** (horizontal tangent).",
        },
      },
    ],
    media: null,
    notes:
      "Six bullets + final pause. Thank students, Session 3 derivative foundations complete. Teaser Topic 15 Related Rates. Warm close.",
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
 *   - Replaced secant_tangent placeholders with flex_plot specs:
 *     circle (two sqrt branches), hyperbola xy=1, folium tangent, arcsin, self-intersection.
 *   - s11 → visual_lab with three circle-tangent example tabs.
 *   - Removed source/sourceSpec/sourceCode/python_code metadata from all blocks.
 *
 * RICH BLOCKS
 *   - theorem_box on s02 (chain rule on y-terms) and s04 (IFT); workflow on s12.
 *   - math_solution_steps on s02 sin(xy), s03 circle, s04 xy=1, s05 folium, s08 second
 *     derivative, s09 edge case, s10 inverse sine.
 *   - misconception_compare on s06 (forgetting dy/dx).
 *   - pause_and_reveal on s03, s07, s13, s14, s15 final check.
 *   - nested_bullets workflow (s02), pro tips (s12), session close (s15).
 *
 * PEDAGOGY
 *   - Welcome-back; roadmap currentId path_topic_14; Topics 8–13 completed.
 *   - Callbacks to Topic 13 chain rule and Topics 12 product rule throughout.
 *   - Session 3 arc closes on s15; teaser Session 4 Topic 15 Related Rates.
 *
 * ESTIMATED DURATION: ~20–22 min
 */