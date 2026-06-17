// Generated from courses/Calculus/Materials/formal_definition_of_the_derivative.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "02_formal_definition_of_the_derivative",
  title: "Formal Definition of the Derivative",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/formal_definition_of_the_derivative.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "Formal Definition of the Derivative",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: f′(a) and the limit definition • Session 3, Derivative Foundations • ~22 min • first-year university / advanced high school",
    notes:
      "Welcome back, Topic 8 built instantaneous rate as a limit of secant slopes. Topic 9 formalizes \\(f'(a)\\), the tangent line, and limit algebra. Assumes Session 2 limit tools.",
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
        currentId: "path_topic_09",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", status: "completed" },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", status: "completed" },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", status: "completed" },
          { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", status: "completed" },
          { id: "path_topic_05", number: 5, session: "S02 Limits and Continuity", label: "One-Sided Limits and Limits at Infinity", status: "completed" },
          { id: "path_topic_06", number: 6, session: "S02 Limits and Continuity", label: "The Squeeze Theorem", status: "completed" },
          { id: "path_topic_07", number: 7, session: "S02 Limits and Continuity", label: "Continuity and the Intermediate Value Theorem", status: "completed" },
          { id: "path_topic_08", number: 8, session: "S03 Derivative Foundations", label: "Instantaneous Rate of Change", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_09", number: 9, session: "S03 Derivative Foundations", label: "Formal Definition of the Derivative", note: "Today", status: "current", expanded: true },
          { id: "path_topic_10", number: 10, session: "S03 Derivative Foundations", label: "Power Rule and Basic Properties", note: "Next", status: "next", expanded: true },
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
      { id: "objective_1", text: "State and use \\(f'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\) (callback to Topic 8)." },
      { id: "objective_2", text: "Write the **tangent line** \\(y=f(a)+f'(a)(x-a)\\) from a known derivative." },
      { id: "objective_3", text: "Compute \\(f'(a)\\) by **canceling \\(h\\)** before evaluating the limit." },
      { id: "objective_4", text: "Decide **differentiability** at corners and other edge cases." },
    ],
    notes:
      "Roadmap: Topic 8 done, Topic 9 today, Topic 10 Power Rule next. Four objectives map to notation → definition → example → edge cases.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: 0/0 HOOK + FORMAL DEFINITION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_instantaneous_speed_the_0_0_problem",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The 0/0 Problem at an Instant",
    question: "Speed = distance/time, but at one instant both are zero. How?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Instantaneous speed needs \\(\\frac{\\Delta s}{\\Delta t}\\) with \\(\\Delta t\\to 0\\), direct substitution gives **0/0**. Topic 8's fix: take a **limit** of average speeds over shrinking intervals.",
        },
      ],
      lead: "The derivative definition is the limit that resolves 0/0.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_secant_zero_problem",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Secants approaching one instant",
        caption: "h → 0: average speed → instantaneous speed.",
        formulaLabel: "s",
        params: { a: 2, h: 1.2 },
        scriptedTimeline: [
          { t: 0, params: { a: 2, h: 1.5 } },
          { t: 5, params: { a: 2, h: 0.5 } },
          { t: 10, params: { a: 2, h: 0.1 } },
          { t: 15, params: { a: 2, h: 0.04 } },
        ],
      },
    },
    notes:
      "Brief callback to Topic 8 speedometer hook. Widget timeline shrinks h at a=2 on x² stand-in curve. Bridge into formal f'(a) on next slide.",
  },
  {
    id: "s02_the_formal_definition_of_the_derivative",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Formal Definition of the Derivative",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Derivative at a point",
          text: "The **derivative of \\(f\\) at \\(x=a\\)** is \\(\\displaystyle f'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\) whenever this limit exists. Then \\(f'(a)\\) equals the **instantaneous rate of change** and the **slope of the tangent** at \\((a,f(a))\\).",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Read \\(f'(a)\\) as \"**f prime of a**.\" Do **not** plug \\(h=0\\) first, simplify, cancel \\(h\\), then evaluate the limit.",
        },
      ],
      lead: "Formal definition, the limit Topic 8 previewed.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_formal_secant",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Difference quotient → f′(a)",
        caption: "Secant slope approaches f′(a) on the readout.",
        formulaLabel: "f",
        params: { a: 1, h: 1 },
        scriptedTimeline: [
          { t: 0, params: { a: 1, h: 1.2 } },
          { t: 4, params: { a: 1, h: 0.45 } },
          { t: 8, params: { a: 1, h: 0.1 } },
          { t: 12, params: { a: 1, h: 0.04 } },
        ],
      },
    },
    notes:
      "theorem_box is the must-remember statement. At a=1 on x², tangent slope → 2. Emphasize limit exists ⇔ differentiable at a.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: NOTATION. TANGENT LINE. WORKED EXAMPLE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s03_warm_up_example_linear_function",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: Linear Function",
    question: "Try: find \\(f'(1)\\) for \\(f(x)=4x-7\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f(x)=3x+1,\\quad f'(2)",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\lim_{h\\to 0}\\frac{[3(2+h)+1]-[3(2)+1]}{h}",
              gap: "tight",
              say: "Substitute into the definition.",
            },
            {
              id: "step_2",
              math: "\\lim_{h\\to 0}\\frac{3h}{h}",
              gap: "tight",
              say: "Simplify the numerator.",
            },
            {
              id: "step_3",
              math: "3",
              say: "Cancel h; limit is the slope 3.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Your turn",
          prompt: "Pause: compute f′(1) for f(x)=4x−7.",
          reveal: { text: "**4**, derivative of a line is its slope everywhere." },
        },
      ],
      lead: "Linear functions: \\(f'(a)\\) equals the slope constant.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_linear_secant",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Secant on a parabola (pattern)",
        caption: "On a line, every secant slope already equals f′.",
        formulaLabel: "f",
        params: { a: 1, h: 0.8 },
        scriptedTimeline: [
          { t: 0, params: { a: 1, h: 1 } },
          { t: 6, params: { a: 1, h: 0.2 } },
        ],
      },
    },
    notes:
      "Quick warm-up with reveal for 4x−7. Linear case confirms definition matches slope. Keep pace brisk, quadratic is the main algebra workout.",
  },
  {
    id: "s04_alternative_notation_derivative_as_a_function",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Notation and the Tangent Line",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "**Point:** \\(f'(a)=\\displaystyle\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\)",
            "**Function:** \\(f'(x)=\\displaystyle\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}\\)",
            "**Leibniz:** \\(\\displaystyle\\frac{dy}{dx}\\) (one symbol, not a fraction to cancel)",
            "**Tangent line at \\(a\\):** \\(y=f(a)+f'(a)(x-a)\\)",
          ],
        },
        {
          id: "left_alt",
          type: "paragraph",
          text: "Alternative form: \\(f'(a)=\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}\\). Use when factoring \\(x-a\\) is cleaner.",
        },
      ],
      lead: "\\(f'(a)\\) is a number; \\(f'(x)\\) is a function; the tangent line uses \\(f'(a)\\) as slope.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_tangent_line",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Tangent at (a, f(a))",
        caption: "Green line: y = f(a) + f′(a)(x − a).",
        formulaLabel: "f",
        params: { a: 2, h: 0.25 },
        scriptedTimeline: [
          { t: 0, params: { a: 2, h: 0.9 } },
          { t: 5, params: { a: 2, h: 0.15 } },
          { t: 10, params: { a: 2, h: 0.05 } },
        ],
      },
    },
    notes:
      "Central notation slide. State tangent line equation explicitly, students need it for applications. Widget at a=2: f(2)=4, f′(2)=4, tangent y=4+4(x−2).",
  },
  {
    id: "s05_standard_example_quadratic_function",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Standard Example: f(x) = x² at a = 2",
    question: "Then find f′(x) for f(x)=x²+3x.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f(x)=x^2,\\quad f'(2)",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\lim_{h\\to 0}\\frac{(2+h)^2-4}{h}",
              gap: "tight",
              say: "Definition at a equals 2.",
            },
            {
              id: "step_2",
              math: "\\lim_{h\\to 0}\\frac{4+4h+h^2-4}{h}",
              gap: "tight",
              say: "Expand the square.",
            },
            {
              id: "step_3",
              math: "\\lim_{h\\to 0}\\frac{4h+h^2}{h}",
              gap: "tight",
              say: "Collect terms.",
            },
            {
              id: "step_4",
              math: "\\lim_{h\\to 0}(4+h)",
              say: "Cancel h.",
            },
            {
              id: "step_5",
              math: "4",
              gap: "loose",
              say: "f prime of 2 is 4.",
            },
          ],
        },
        {
          id: "left_tangent",
          type: "paragraph",
          text: "**Tangent at (2,4):** \\(y=4+4(x-2)\\) simplifies to \\(y=4x-4\\).",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Stretch",
          prompt: "Find f′(x) for f(x)=x²+3x using the same steps.",
          reveal: { text: "**f′(x)=2x+3**, power of h cancels, then h→0." },
        },
      ],
      lead: "Canonical 0/0 → cancel h → evaluate pattern.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_quadratic_at_2",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "f(x)=x², a=2, f′(2)=4",
        caption: "Tangent slope 4 matches the limit work.",
        formulaLabel: "f",
        params: { a: 2, h: 0.35 },
        scriptedTimeline: [
          { t: 0, params: { a: 2, h: 1.1 } },
          { t: 5, params: { a: 2, h: 0.3 } },
          { t: 10, params: { a: 2, h: 0.06 } },
        ],
      },
    },
    notes:
      "Main worked example for the topic. Reveal steps; connect to tangent line y=4+4(x−2). Pause stretch: f′(x)=2x+3 for x²+3x. Widget confirms slope 4 at a=2.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: SECANT LAB + MISCONCEPTION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s06_visualizing_secant_lines_approaching_tangent",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Secant Lines → Tangent",
    question: "What happens when h is negative? Same tangent?",
    lead: "Explore a and h. Demo tab B on video; try all tabs on the site.",
    labSiteNote: "On the site, try negative h and different base points a.",
    labExamples: [
      {
        id: "lab_ex_right",
        label: "A · h > 0",
        formula: "a=1, h=0.8",
        steps: [
          { id: "step_1", text: "Set a = 1, h = 0.8 (right side)." },
          { id: "step_2", text: "Read secant m; compare to tangent m = 2." },
        ],
        params: { a: 1, h: 0.8 },
      },
      {
        id: "lab_ex_shrink",
        label: "B · Shrink h",
        formula: "a=2, h=0.12",
        steps: [
          { id: "step_1", text: "Set a = 2, h = 0.12." },
          { id: "step_2", text: "Secant ≈ tangent; m → 4." },
        ],
        params: { a: 2, h: 0.12 },
      },
      {
        id: "lab_ex_left",
        label: "C · h < 0",
        formula: "a=1, h=-0.5",
        steps: [
          { id: "step_1", text: "Set h negative, secant from the left." },
          { id: "step_2", text: "Still approaches the same tangent." },
        ],
        params: { a: 1, h: -0.5 },
      },
    ],
    blocks: [
      {
        id: "lab_pause",
        type: "pause_and_reveal",
        title: "Pause and predict",
        prompt: "Before shrinking h: will negative h give a different tangent?",
        reveal: { text: "No, same two-sided limit; one tangent slope f′(a)." },
      },
    ],
    media: {
      id: "lab_secant_formal",
      kind: "calculus_widget",
      widget: "secant_tangent",
      title: "f(x) = x²",
      caption: "Blue secant, green tangent: slope readout live.",
      formulaLabel: "f",
      params: { a: 1, h: 1 },
      scriptedTimeline: [
        { t: 0, params: { a: 1, h: 1 } },
        { t: 5, params: { a: 1, h: 0.2 } },
        { t: 10, params: { a: 1, h: -0.35 } },
        { t: 15, params: { a: 2, h: 0.05 } },
      ],
    },
    notes:
      "visual_lab with pause_and_reveal. Timeline includes negative h. Two-sided limit intuition without ε–δ.\n\nStudent prompt: Match secant slope to f′(a) within 0.05.",
  },
  {
    id: "s07_common_misconception_plugging_h_0_directly",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Misconception: Plugging h = 0",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "0/0 is not “DNE”",
          pairs: [
            {
              label: "❌ Tempting mistake",
              text: "Set \\(h=0\\) in \\(\\frac{(a+h)^2-a^2}{h}\\) → \\(\\frac{0}{0}\\) → conclude \\(f'(a)\\) does not exist.",
            },
            {
              label: "✅ Correct reasoning",
              text: "The **limit** allows canceling \\(h\\) first: \\(\\frac{2ah+h^2}{h}=2a+h\\to 2a\\). The expression is undefined at \\(h=0\\), but the **limit** still exists.",
            },
          ],
        },
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f(x)=x^2,\\quad f'(a)\\ \\text{(correct path)}",
          steps: [
            { id: "step_1", op: "=>", math: "\\frac{2ah+h^2}{h}", gap: "tight", say: "After expanding numerator." },
            { id: "step_2", math: "2a+h", say: "Cancel h while h is not zero." },
            { id: "step_3", math: "2a", say: "Now evaluate as h approaches 0." },
          ],
        },
      ],
      lead: "Never plug \\(h=0\\) into the raw quotient, simplify, then take the limit.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cancel_h",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Limit process, not substitution",
        caption: "Shrink h on the graph while canceling h in algebra.",
        formulaLabel: "f",
        params: { a: 1.5, h: 0.6 },
        scriptedTimeline: [
          { t: 0, params: { a: 1.5, h: 1 } },
          { t: 6, params: { a: 1.5, h: 0.15 } },
          { t: 12, params: { a: 1.5, h: 0.04 } },
        ],
      },
    },
    notes:
      "Pair misconception_compare with compact math_solution_steps. Callback to Session 2: limits read nearby behavior, not the point itself.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: OPTIONAL + EDGE CASES + APPLICATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s08_challenge_optional_derivative_of_a_constant_function",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Challenge (Optional): Constant Function",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Derivative of a constant",
          text: "If \\(f(x)=c\\), then \\(f'(x)=0\\) for all \\(x\\): \\(\\displaystyle\\lim_{h\\to 0}\\frac{c-c}{h}=\\lim_{h\\to 0}0=0\\).",
        },
        {
          id: "left_interp",
          type: "paragraph",
          text: "No change in output ⇒ rate of change zero. **Skip** if comfortable, Topic 10 power rule will speed this up.",
        },
      ],
      lead: "Optional proof, numerator identically zero.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_constant_tangent",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "y = c: horizontal tangent",
        caption: "Every secant on a flat line has slope 0.",
        formulaLabel: "f",
        plot: {
          plotType: "y_equals",
          expr: "3",
          formula: "f(x)=c",
          xDomain: [-2, 4],
          yDomain: [0, 6],
          probeMin: -2,
          probeMax: 4,
          probeDefault: 1,
          hLines: [{ y: 3 }],
        },
        params: { x: 1 },
      },
    },
    notes:
      "Optional 30-second slide. flex_plot horizontal line contrasts with secant_tangent (x² only). Forward pointer to power rule.",
  },
  {
    id: "s09_tricky_example_absolute_value_function",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Edge Case: |x| at x = 0",
    question: "Where is |x−2| not differentiable?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f(x)=|x|,\\quad f'(0)",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\lim_{h\\to 0^+}\\frac{|h|}{h}=1",
              gap: "tight",
              say: "Right-hand limit of difference quotient.",
            },
            {
              id: "step_2",
              math: "\\lim_{h\\to 0^-}\\frac{|h|}{h}=-1",
              gap: "tight",
              say: "Left-hand limit.",
            },
            {
              id: "step_3",
              op: "=>",
              math: "\\text{DNE}",
              say: "Unequal one-sided limits, f prime of 0 does not exist.",
            },
          ],
        },
      ],
      lead: "Continuous at 0, but **corner** ⇒ no unique tangent.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_abs_corner",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x) = |x|: corner at 0",
        caption: "Left slope −1, right slope +1.",
        formulaLabel: "f",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=|x|",
          xDomain: [-2.5, 2.5],
          yDomain: [-0.5, 2.5],
          probeMin: -2,
          probeMax: 2,
          probeDefault: -0.8,
          branches: [
            { expr: "-x", xMin: -2, xMax: 0, openAtEnd: true, stroke: "#2563eb" },
            { expr: "x", xMin: 0, xMax: 2, openAtStart: true, stroke: "#c65a28" },
          ],
          filledPoints: [{ x: 0, y: 0 }],
          vLines: [{ x: 0 }],
          tags: [
            { text: "left → −1", x: -1.2, y: 1.2, tone: "muted" },
            { text: "right → +1", x: 0.9, y: 1.2, tone: "muted" },
          ],
        },
        params: { x: -0.8 },
      },
    },
    notes:
      "Callback to Topic 8 |x−2| example. Answer sketch prompt: not differentiable at x=2 for |x−2|. Differentiability ⊃ continuity.",
  },
  {
    id: "s10_challenge_optional_pause_and_predict_wild_function_at_x_0",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Challenge (Optional): Wild Function at 0",
    question: "Does f′(0) exist for f(x)=x² sin(1/x) (f(0)=0)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_piecewise",
          type: "formula_block",
          formulas: [
            "$$f(x)=\\begin{cases}x^2\\sin\\!\\left(\\frac{1}{x}\\right),&x\\neq 0\\\\0,&x=0\\end{cases}$$",
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Will the difference quotient limit exist at 0?",
          reveal: { text: "Yes, next slide uses **squeeze** to get f′(0)=0." },
        },
      ],
      lead: "Optional pause, oscillation bounded by x².",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_wild_function",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "squeeze",
          mid: "x^2*sin(1/x)",
          lower: "-(x*x)",
          upper: "x*x",
          formula: "f(x)=x^2\\sin(1/x)",
          tag: "bounded oscillation near 0",
          tagTone: "muted",
        },
        title: "x² sin(1/x) near 0",
        caption: "Envelope ±x² squeezes to 0.",
        formulaLabel: "f",
        params: { zoom: 0.4 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.45 } },
          { t: 6, params: { zoom: 0.12 } },
        ],
      },
    },
    notes:
      "Optional challenge track. Contrast Topic 8 x sin(1/x) (DNE) vs x² sin(1/x) (exists). Pause before squeeze solution.\n\nStudent prompt: Write the difference quotient at 0.",
  },
  {
    id: "s11_challenge_optional_solution_squeeze_theorem_in_action",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Challenge Solution: Squeeze at 0",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f'(0)=\\lim_{h\\to 0}\\frac{h^2\\sin(1/h)}{h}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\lim_{h\\to 0} h\\sin(1/h)",
              gap: "tight",
              say: "Simplify the quotient.",
            },
            {
              id: "step_2",
              math: "-|h|\\leq h\\sin(1/h)\\leq |h|",
              gap: "tight",
              say: "Bound using sine between minus 1 and 1.",
            },
            {
              id: "step_3",
              op: "=>",
              math: "0",
              say: "Squeeze Theorem, both bounds go to 0.",
            },
          ],
        },
      ],
      lead: "**f′(0)=0**, smooth enough for a horizontal tangent.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_squeeze_confirm",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "squeeze",
          mid: "x^2*sin(1/x)",
          lower: "-(x*x)",
          upper: "x*x",
          formula: "f'(0)=0",
          tag: "squeeze → limit 0",
          tagTone: "accent",
        },
        title: "Squeeze confirms f′(0)=0",
        caption: "Session 2 Squeeze Theorem pays off.",
        formulaLabel: "f",
        params: { zoom: 0.25 },
      },
    },
    notes:
      "Optional solution, callback to Topic 6 Squeeze. Shows continuous + squeeze can yield derivative 0 even with wild oscillation inside.",
  },
  {
    id: "s12_application_instantaneous_velocity",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Dropped Ball Velocity",
    question: "Find v(0) and v(3) for h(t)=100−4.9t².",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          splitAfter: 3,
          problem: "h(t)=100-4.9t^2,\\quad v(2)=h'(2)",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\lim_{t\\to 2}\\frac{h(t)-h(2)}{t-2}",
              gap: "tight",
              say: "Alternative definition with t approaching 2.",
            },
            {
              id: "step_2",
              math: "\\lim_{t\\to 2}\\frac{-4.9(t^2-4)}{t-2}",
              gap: "tight",
              say: "Substitute and factor.",
            },
            {
              id: "step_3",
              math: "\\lim_{t\\to 2}\\frac{-4.9(t-2)(t+2)}{t-2}",
              gap: "tight",
              say: "Difference of squares.",
            },
            {
              id: "step_4",
              math: "\\lim_{t\\to 2}-4.9(t+2)",
              say: "Cancel t minus 2.",
            },
            {
              id: "step_5",
              math: "-19.6",
              gap: "loose",
              say: "Negative, moving downward at 19.6 m/s.",
            },
          ],
        },
      ],
      lead: "Physics: \\(v(t)=h'(t)\\). Pattern gives \\(h'(t)=-9.8t\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_ball_height",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "h(t) = 100 − 4.9t²",
        caption: "Tangent slope negative at t=2: falling.",
        formulaLabel: "h",
        plot: {
          plotType: "y_equals",
          expr: "100-4.9*x^2",
          formula: "h(t)=100-4.9t^2",
          xDomain: [0, 5],
          yDomain: [-20, 110],
          probeMin: 0,
          probeMax: 5,
          probeDefault: 2,
          filledPoints: [{ x: 2, y: 80.4 }],
          tags: [{ text: "v(2)=−19.6 m/s", x: 2.3, y: 60, tone: "accent" }],
        },
        params: { x: 2 },
      },
    },
    notes:
      "Application using x→a form (often cleaner for quadratics). Stretch: v(0)=0, v(3)=−29.4 m/s from h′(t)=−9.8t.",
  },
  {
    id: "s13_graphical_differentiability_explorer",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Differentiability Gallery",
    question: "At x=0, which functions have a finite tangent slope?",
    lead: "Three graphs, smooth, corner, cusp. Try each tab.",
    labSiteNote: "On the site, compare tangent behavior at a = 0 for all three.",
    labExamples: [
      {
        id: "lab_ex_smooth",
        label: "A · x²",
        formula: "smooth",
        steps: [
          { id: "step_1", text: "Probe x², tangent everywhere." },
          { id: "step_2", text: "f′(0)=0 on this parabola." },
        ],
        params: { x: 0 },
        plot: {
          plotType: "y_equals",
          expr: "x*x",
          formula: "f(x)=x^2",
          xDomain: [-2, 2],
          yDomain: [-1, 4],
          probeMin: -2,
          probeMax: 2,
          probeDefault: 0,
        },
      },
      {
        id: "lab_ex_corner",
        label: "B · |x|",
        formula: "corner",
        steps: [
          { id: "step_1", text: "Graph |x| at x=0." },
          { id: "step_2", text: "Corner, no unique tangent." },
        ],
        params: { x: 0 },
        plot: {
          plotType: "piecewise",
          formula: "f(x)=|x|",
          xDomain: [-2, 2],
          yDomain: [-0.5, 2],
          probeMin: -2,
          probeMax: 2,
          probeDefault: 0,
          branches: [
            { expr: "-x", xMin: -2, xMax: 0, openAtEnd: true, stroke: "#2563eb" },
            { expr: "x", xMin: 0, xMax: 2, openAtStart: true, stroke: "#c65a28" },
          ],
          filledPoints: [{ x: 0, y: 0 }],
        },
      },
      {
        id: "lab_ex_cusp",
        label: "C · x^{1/3}",
        formula: "vertical?",
        steps: [
          { id: "step_1", text: "Graph x^{1/3} at x=0." },
          { id: "step_2", text: "Vertical tangent, derivative not finite." },
        ],
        params: { x: 0.4 },
        plot: {
          plotType: "y_equals",
          expr: "x^(1/3)",
          formula: "f(x)=x^{1/3}",
          xDomain: [-2, 2],
          yDomain: [-2, 2],
          probeMin: -2,
          probeMax: 2,
          probeDefault: 0.4,
          tags: [{ text: "steep at 0", x: 0.5, y: 1.2, tone: "warn" }],
        },
      },
    ],
    media: {
      id: "lab_diff_gallery",
      kind: "calculus_widget",
      widget: "function_analysis",
      variant: "flex_plot",
      title: "x²: smooth at 0",
      caption: "Switch tabs to |x| and x^{1/3}.",
      formulaLabel: "f",
      plot: {
        plotType: "y_equals",
        expr: "x*x",
        formula: "f(x)=x^2",
        xDomain: [-2, 2],
        yDomain: [-1, 4],
        probeMin: -2,
        probeMax: 2,
        probeDefault: 0,
      },
      params: { x: 0 },
    },
    notes:
      "visual_lab gallery, narrate tab B (|x|) on video. Differentiability needs a **finite** unique slope; cusp gives vertical tangent (not a derivative in the usual sense).",
  },
  {
    id: "s14_pro_tips_for_using_the_derivative_definition",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pro Tips for the Definition",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_bullets",
          type: "nested_bullets",
          items: [
            { id: "tip_1", text: "**Cancel \\(h\\)** (or \\(x-a\\)) before evaluating, if you cannot, suspect DNE." },
            { id: "tip_2", text: "**Tangent line:** \\(y=f(a)+f'(a)(x-a)\\) once \\(f'(a)\\) is known." },
            { id: "tip_3", text: "**Trap:** in \\(\\frac{f(x)-f(a)}{x-a}\\), subtract \\(f(a)\\), not \\(a\\)." },
            { id: "tip_4", text: "Topic 10 **power rule** checks your limit work, use it after this topic solidifies." },
          ],
        },
      ],
      lead: "Workflow: define → simplify → limit → tangent → (soon) power rule.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_zoom_tangent",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Zoom intuition",
        caption: "Shrink h: curve looks like its tangent.",
        formulaLabel: "f",
        params: { a: 1.2, h: 0.08 },
        scriptedTimeline: [
          { t: 0, params: { a: 1.2, h: 0.9 } },
          { t: 5, params: { a: 1.2, h: 0.2 } },
          { t: 10, params: { a: 1.2, h: 0.05 } },
        ],
      },
    },
    notes:
      "Pro tips before summary. Tease power rule explicitly. Widget shrinking h supports linear approximation intuition.",
  },
  {
    id: "s15_quick_check_and_summary",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Quick Check and Summary",
    question: "",
    lead: "Exit checklist, then Topic 10:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Definition:** \\(f'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\) when the limit exists." },
          { id: "bullet_2", text: "**Tangent:** \\(y=f(a)+f'(a)(x-a)\\), worked at \\(f(x)=x^2\\), \\(a=2\\): slope **4**." },
          { id: "bullet_3", text: "**Edge cases:** |x| at 0, one-sided slopes differ; x² sin(1/x) at 0, squeeze gives **0**." },
          { id: "bullet_4", text: "**Next topic, Power Rule:** \\(\\frac{d}{dx}x^n=nx^{n-1}\\) so you can skip the limit for polynomials." },
        ],
      },
      {
        id: "body_pause",
        type: "pause_and_reveal",
        title: "Quick check",
        prompt: "f(x)=x³, what is f′(2)? (Use definition or guess power rule.)",
        reveal: { text: "**12**, power rule: 3·2² = 12. Topic 10 proves the shortcut." },
      },
    ],
    media: null,
    notes:
      "Close with summary + pause MCQ. Answers for silent check: definition B, f′(2) for x³ is 12, |x| not differentiable at 0. Thank students, Topic 10 Power Rule next.",
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
 *   - secant_tangent on s01–s07, s14 (vary a, h; shrink h→0; negative h in lab).
 *   - s06, s13 → visual_lab with labExamples (3 tabs each).
 *   - flex_plot for constant, |x| corner, squeeze wild function, ball height,
 *     differentiability gallery, unique plot specs per slide.
 *   - Removed limit_epsilon placeholders and all source/python_code metadata.
 *
 * RICH BLOCKS
 *   - theorem_box on s02 (formal definition), s08 (constant).
 *   - misconception_compare on s07; math_solution_steps on s03, s05, s07, s09,
 *     s11, s12.
 *   - pause_and_reveal on s03, s05, s06, s10, s15.
 *
 * PEDAGOGY
 *   - Callback Topic 8 instantaneous ROC; roadmap path_topic_09.
 *   - Arc: f′(a) → definition → tangent line → x² at a=2 → lab → edge cases
 *     → summary tease Power Rule (Topic 10).
 *
 * ESTIMATED DURATION: ~21–24 min
 */