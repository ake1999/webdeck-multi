// Generated from courses/Calculus/Materials/instantaneous_rate_of_change.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "01_instantaneous_rate_of_change",
  title: "Instantaneous Rate of Change",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/instantaneous_rate_of_change.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "Instantaneous Rate of Change",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: Derivative intuition • Session 3, Derivative Foundations • ~22 min • first-year university / advanced high school",
    notes:
      "Welcome back, Session 2 (limits through IVT, Topic 7) is complete. Topic 8 opens Session 3: derivatives begin as *rates at a point*. Do not re-introduce Arian from scratch.",
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
        currentId: "path_topic_08",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", status: "completed" },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", status: "completed" },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", status: "completed" },
          { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", status: "completed" },
          { id: "path_topic_05", number: 5, session: "S02 Limits and Continuity", label: "One-Sided Limits and Limits at Infinity", status: "completed" },
          { id: "path_topic_06", number: 6, session: "S02 Limits and Continuity", label: "The Squeeze Theorem", status: "completed" },
          { id: "path_topic_07", number: 7, session: "S02 Limits and Continuity", label: "Continuity and the Intermediate Value Theorem", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_08", number: 8, session: "S03 Derivative Foundations", label: "Instantaneous Rate of Change", note: "Today", status: "current", expanded: true },
          { id: "path_topic_09", number: 9, session: "S03 Derivative Foundations", label: "Formal Definition of the Derivative", note: "Next", status: "next", expanded: true },
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
      { id: "objective_1", text: "Compute instantaneous rates from the **limit of difference quotients** (callback to Session 2 limits)." },
      { id: "objective_2", text: "Interpret instantaneous rate as **tangent slope** and preview \\(f'(a)\\)." },
      { id: "objective_3", text: "Apply the idea to **velocity** and **marginal cost**." },
      { id: "objective_4", text: "Distinguish **average** vs **instantaneous** rates on nonlinear graphs." },
      { id: "objective_5", text: "Recognize when no instantaneous rate exists (**corners**, unequal one-sided slopes)." },
    ],
    notes:
      "Orient on roadmap: Topics 1–7 done; Session 3 starts here. Next topic formalizes \\(f'(a)\\). Five objectives map to hook → limit → lab → apps → corner case.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: SPEEDOMETER HOOK + AVERAGE ROC
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_speedometer_vs_average_speed",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Speedometer vs. Average Speed",
    question: "Why can a speedometer read 60 mph when you traveled 0 miles in 0 seconds?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Your speedometer shows **instantaneous speed**, how fast distance is changing **right now**, not over the last hour.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "**Average speed** over \\([t_1,t_2]\\) is a **secant slope**: \\(\\frac{s(t_2)-s(t_1)}{t_2-t_1}\\). Session 2 limits will let us shrink that interval to a single instant.",
        },
      ],
      lead: "Speedometer = instantaneous rate. Trip average = secant **slope** over an interval.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_secant_tangent_hook",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Distance graph: secant vs tangent",
        caption: "Blue secant = average over h; green tangent = instantaneous at a.",
        formulaLabel: "s",
        params: { a: 1, h: 1.2 },
        scriptedTimeline: [
          { t: 0, params: { a: 1, h: 1.5 } },
          { t: 5, params: { a: 1, h: 0.6 } },
          { t: 10, params: { a: 1, h: 0.15 } },
          { t: 15, params: { a: 1, h: 0.05 } },
        ],
      },
    },
    notes:
      "Open with the speedometer puzzle, 0/0 at an instant. Widget uses \\(f(x)=x^2\\) as a stand-in distance curve: wide secant (average) vs tangent (instant). Narrate h shrinking on the timeline.\n\nStudent prompt: Which line better matches 'right now'?",
  },
  {
    id: "s02_average_rate_of_change",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Average Rate of Change",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$\\text{Average ROC} = \\frac{\\Delta y}{\\Delta x} = \\frac{f(x_2)-f(x_1)}{x_2-x_1}$$",
            "Geometrically: **slope of the secant** through \\((x_1,f(x_1))\\) and \\((x_2,f(x_2))\\).",
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Set \\(x_2=a+h\\). Then average ROC \\(=\\frac{f(a+h)-f(a)}{h}\\), the **difference quotient** you will limit next.",
        },
      ],
      lead: "Average rate = **slope** of secant line = change in \\(y\\) over change in \\(x\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_secant_average",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Secant slope readout",
        caption: "Large h → secant is a coarse average; read m on the tag.",
        formulaLabel: "f",
        params: { a: 2, h: 1.4 },
        scriptedTimeline: [
          { t: 0, params: { a: 2, h: 1.4 } },
          { t: 5, params: { a: 2, h: 0.9 } },
          { t: 10, params: { a: 2, h: 0.5 } },
        ],
      },
    },
    notes:
      "State the average ROC formula once. Point at P and Q on the widget, secant slope is the number in the readout. This is *not* instantaneous yet; it needs a limit.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: INSTANTANEOUS AS LIMIT + LAB
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s03_instantaneous_rate_of_change",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Instantaneous Rate of Change",
    question: "What happens to the secant slope as \\(h \\to 0\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$\\text{Instantaneous ROC at } x=a = \\lim_{h \\to 0} \\frac{f(a+h)-f(a)}{h}$$",
          ],
        },
        {
          id: "left_bridge",
          type: "paragraph",
          text: "Same difference quotient, now take the **limit** Session 2 taught you. When it exists, the value equals the **tangent slope** at \\(x=a\\).",
        },
      ],
      lead: "**Limit** of secant slopes as the interval shrinks → **tangent** slope.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_secant_limit",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "h → 0 on f(x) = x²",
        caption: "Watch secant m approach tangent m = 2a.",
        formulaLabel: "f",
        params: { a: 2, h: 1 },
        scriptedTimeline: [
          { t: 0, params: { a: 2, h: 1.2 } },
          { t: 4, params: { a: 2, h: 0.5 } },
          { t: 8, params: { a: 2, h: 0.12 } },
          { t: 12, params: { a: 2, h: 0.04 } },
        ],
      },
    },
    notes:
      "This is the bridge from limits to derivatives. Timeline drives h from 1.2 down to 0.04 at a=2; secant slope should march toward 4 (=2a). Emphasize: we never plug h=0, we take a limit.",
  },
  {
    id: "s04_secant_tangent_animation",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Secant → Tangent",
    question: "Shrink h, when does the secant line match the tangent?",
    lead: "Three presets: wide, mid, and tiny h. On YouTube, demo tab B; on the site, try all tabs.",
    labSiteNote: "On the site, switch tabs and drag h toward 0 yourself.",
    labExamples: [
      {
        id: "lab_ex_wide",
        label: "A · Wide h",
        formula: "h=1.5",
        steps: [
          { id: "step_1", text: "Set a = 2, h = 1.5." },
          { id: "step_2", text: "Read secant slope m, far from tangent m = 4." },
        ],
        params: { a: 2, h: 1.5 },
      },
      {
        id: "lab_ex_mid",
        label: "B · Mid h",
        formula: "h=0.35",
        steps: [
          { id: "step_1", text: "Set h = 0.35 at a = 2." },
          { id: "step_2", text: "Secant rotates closer; compare to green tangent." },
        ],
        params: { a: 2, h: 0.35 },
      },
      {
        id: "lab_ex_tiny",
        label: "C · Tiny h",
        formula: "h=0.06",
        steps: [
          { id: "step_1", text: "Set a = 1, h = 0.06." },
          { id: "step_2", text: "Secant ≈ tangent, limit idea in one picture." },
        ],
        params: { a: 1, h: 0.06 },
      },
    ],
    media: {
      id: "lab_secant_tangent",
      kind: "calculus_widget",
      widget: "secant_tangent",
      title: "f(x) = x²: difference quotient",
      caption: "Blue secant, green tangent, live slope readout.",
      formulaLabel: "f",
      params: { a: 2, h: 1 },
      scriptedTimeline: [
        { t: 0, params: { a: 2, h: 1.5 } },
        { t: 5, params: { a: 2, h: 0.4 } },
        { t: 10, params: { a: 2, h: 0.08 } },
        { t: 15, params: { a: 1, h: 0.05 } },
      ],
    },
    notes:
      "Full-width lab, let the plot carry the story. Demo tab B on video (~30s): h shrinks, secant aligns with tangent. Site students cycle A/B/C.\n\nStudent prompt: At what h is secant slope within 0.1 of tangent slope?",
  },
  {
    id: "s05_alternative_limit_form",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Alternative Limit Form",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$\\lim_{h \\to 0} \\frac{f(a+h)-f(a)}{h} = \\lim_{x \\to a} \\frac{f(x)-f(a)}{x-a}$$",
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Equivalent limits, pick whichever simplifies the algebra. Both are limits of **secant slopes** as the second point approaches the first.",
        },
      ],
      lead: "h-form vs two-point form, same instantaneous rate.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_secant_two_point",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "x₂ = a + h approaching a",
        caption: "Q slides toward P as h → 0.",
        formulaLabel: "f",
        params: { a: 1.5, h: 0.8 },
        scriptedTimeline: [
          { t: 0, params: { a: 1.5, h: 1.1 } },
          { t: 5, params: { a: 1.5, h: 0.35 } },
          { t: 10, params: { a: 1.5, h: -0.25 } },
          { t: 15, params: { a: 1.5, h: 0.06 } },
        ],
      },
    },
    notes:
      "Brief notation slide, do not linger. Show negative h on timeline: secant from the left still approaches the same tangent. Sets up velocity example using either form.",
  },
  {
    id: "s06_theorem_instantaneous_roc_derivative",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Instantaneous ROC = Derivative",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Instantaneous rate of change",
          text: "If \\(f\\) is **differentiable** at \\(x=a\\), the instantaneous rate of change at \\(a\\) is \\(\\displaystyle\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}=f'(a)\\). Geometrically: \\(f'(a)\\) is the **slope of the tangent line** at \\((a,f(a))\\).",
        },
        {
          id: "left_names",
          type: "nested_bullets",
          items: [
            { id: "n1", text: "**Three names, one limit:** instantaneous ROC, derivative, tangent slope." },
            { id: "n2", text: "Topic 9 next: formal \\(f'(a)\\) notation and tangent line equation." },
          ],
        },
      ],
      lead: "When the limit exists, we name it \\(f'(a)\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_theorem_secant",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Limit → f′(a)",
        caption: "Secant m → tangent m = f′(a) on the readout.",
        formulaLabel: "f",
        params: { a: 2, h: 0.5 },
        scriptedTimeline: [
          { t: 0, params: { a: 2, h: 1 } },
          { t: 6, params: { a: 2, h: 0.2 } },
          { t: 12, params: { a: 2, h: 0.05 } },
        ],
      },
    },
    notes:
      "theorem_box is the formal anchor. Tie readout: secant slope approaches tangent slope 4 at a=2 on x². Preview Topic 9 for full definition slide.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: WORKED EXAMPLES + VELOCITY PAUSE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s07_example_1_warm_up",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 1: Warm-Up",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f(x)=3x^2,\\quad \\text{instantaneous ROC at } x=2",
          problemSay: "Find the instantaneous rate of change of 3x squared at x equals 2.",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\lim_{h\\to 0}\\frac{3(2+h)^2-3(2)^2}{h}",
              gap: "tight",
              say: "Write the limit definition at a equals 2.",
            },
            {
              id: "step_2",
              math: "\\lim_{h\\to 0}\\frac{3(4+4h+h^2)-12}{h}",
              gap: "tight",
              say: "Expand the square in the numerator.",
            },
            {
              id: "step_3",
              math: "\\lim_{h\\to 0}\\frac{12h+3h^2}{h}",
              gap: "tight",
              say: "Collect like terms.",
            },
            {
              id: "step_4",
              math: "\\lim_{h\\to 0}(12+3h)",
              say: "Cancel h, valid because h is not zero in the limit process.",
            },
            {
              id: "step_5",
              math: "12",
              gap: "loose",
              say: "Answer: instantaneous rate is 12.",
            },
          ],
        },
      ],
      lead: "Answer: instantaneous rate = **12** (tangent slope at \\(x=2\\)).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_warmup_pattern",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Same limit pattern (widget: x²)",
        caption: "Geometry on x²; algebra above is for 3x².",
        formulaLabel: "f",
        params: { a: 2, h: 0.3 },
        scriptedTimeline: [
          { t: 0, params: { a: 2, h: 0.8 } },
          { t: 5, params: { a: 2, h: 0.2 } },
          { t: 10, params: { a: 2, h: 0.05 } },
        ],
      },
    },
    notes:
      "First full limit computation. Reveal steps one at a time. Callback: same 0/0 → cancel h pattern as removable holes in Session 2. Widget shows shrinking secant geometry; answer 12 is from algebra.",
  },
  {
    id: "s08_pause_velocity_problem",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Velocity Problem",
    question: "Find \\(v(1)\\) for \\(s(t)=t^3-6t^2+9t\\).",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "A particle moves with \\(s(t)=t^3-6t^2+9t\\) meters (\\(t\\) in seconds). **Instantaneous velocity** at \\(t=1\\) is \\(s'(1)=\\lim_{h\\to 0}\\frac{s(1+h)-s(1)}{h}\\).",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and compute",
          prompt: "Use the h-formula. Write your answer before continuing.",
          reveal: { text: "Expand carefully, the linear **h** term cancels; expect **0 m/s**." },
        },
      ],
      lead: "Velocity = instantaneous rate of change of position.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_position_graph",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "s(t) near t = 1",
        caption: "Flat tangent at t = 1 → velocity 0.",
        formulaLabel: "s",
        plot: {
          plotType: "y_equals",
          expr: "x^3-6*x^2+9*x",
          formula: "s(t)=t^3-6t^2+9t",
          xDomain: [-0.2, 4.2],
          yDomain: [-2, 8],
          probeMin: 0,
          probeMax: 4,
          probeDefault: 0.6,
          tags: [{ text: "t=1: slope 0", x: 1, y: 4, tone: "muted" }],
        },
        params: { x: 0.6 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.3 } },
          { t: 5, params: { x: 0.9 } },
          { t: 10, params: { x: 1.1 } },
        ],
      },
    },
    notes:
      "YouTube pause beat. Give 20–30 seconds. Graph hints at a flat spot near t=1. Do not reveal 0 until after pause.\n\nStudent prompt: Is the particle moving at t=1?",
  },
  {
    id: "s09_example_2_velocity_solution",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 2: Velocity Solution",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          splitAfter: 3,
          problem: "v(1)=\\lim_{h\\to 0}\\frac{s(1+h)-s(1)}{h}",
          steps: [
            {
              id: "step_1",
              math: "s(1)=4",
              gap: "tight",
              say: "Evaluate position at t equals 1.",
            },
            {
              id: "step_2",
              math: "s(1+h)=(1+h)^3-6(1+h)^2+9(1+h)",
              gap: "tight",
              say: "Substitute into the numerator.",
            },
            {
              id: "step_3",
              math: "4+0h-3h^2+h^3",
              gap: "tight",
              say: "Expand and group; linear h term cancels.",
            },
            {
              id: "step_4",
              math: "\\frac{-3h^2+h^3}{h}",
              gap: "tight",
              say: "Form the difference quotient.",
            },
            {
              id: "step_5",
              math: "-3h+h^2",
              say: "Cancel h.",
            },
            {
              id: "step_6",
              math: "0",
              gap: "loose",
              say: "Limit is zero, momentarily at rest.",
            },
          ],
        },
      ],
      lead: "**Answer:** \\(v(1)=0\\) m/s, turning-point behavior on the graph.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_velocity_confirm",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Graph confirms v(1) = 0",
        caption: "Horizontal tangent at (1, 4).",
        formulaLabel: "s",
        plot: {
          plotType: "y_equals",
          expr: "x^3-6*x^2+9*x",
          formula: "s(t)=t^3-6t^2+9t",
          xDomain: [0, 3.5],
          yDomain: [-1, 7],
          probeMin: 0,
          probeMax: 3.5,
          probeDefault: 1,
          filledPoints: [{ x: 1, y: 4 }],
          tags: [{ text: "v(1)=0", anchor: "end", tone: "accent" }],
        },
        params: { x: 1 },
      },
    },
    notes:
      "Close the pause crisply. splitAfter keeps dense algebra readable. Emphasize: zero velocity ≠ particle always at rest, only at t=1.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: AVERAGE VS INSTANTANEOUS + EXPONENTIAL
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s10_common_mistake_average_vs_instantaneous",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Misconception: Average vs Instantaneous",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Do not confuse average with instantaneous",
          pairs: [
            {
              label: "❌ Tempting mistake",
              text: "For \\(P(t)=1000\\cdot 2^t\\), use average over \\([3,4]\\): \\(\\frac{P(4)-P(3)}{1}=8000\\) and call that the rate at \\(t=3\\).",
            },
            {
              label: "✅ Correct reasoning",
              text: "Instantaneous rate requires a **limit** as the interval shrinks. On a convex exponential, the secant **overestimates** the tangent slope at \\(t=3\\) (~5545, not 8000).",
            },
          ],
        },
      ],
      lead: "A finite interval, even length 1, is still an **average**, not a limit.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_exponential_secant",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "P(t) = 1000·2ᵗ",
        caption: "Secant [3,4] steeper than tangent at t=3.",
        formulaLabel: "P",
        plot: {
          plotType: "y_equals",
          expr: "1000*2^x",
          formula: "P(t)=1000\\cdot 2^t",
          xDomain: [2, 5],
          yDomain: [0, 18000],
          probeMin: 2,
          probeMax: 5,
          probeDefault: 3,
          curves: [
            { id: "growth", expr: "1000*2^x", stroke: "#2563eb", strokeWidth: 3 },
          ],
          filledPoints: [
            { x: 3, y: 8000 },
            { x: 4, y: 16000 },
          ],
          tags: [
            { text: "secant slope 8000", x: 3.4, y: 12000, tone: "warn" },
            { text: "tangent ≈ 5545", x: 2.6, y: 6000, tone: "muted" },
          ],
        },
        params: { x: 3 },
      },
    },
    notes:
      "Name the trap before it sticks. Walk the misconception_compare pairs. Graph shows why secant from t=3 to t=4 is too steep for the instantaneous rate at t=3.",
  },
  {
    id: "s11_example_3_exponential_growth_tricky",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 3: Exponential Growth",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "P(t)=1000\\cdot 2^t,\\quad \\text{instantaneous growth at } t=3",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\lim_{h\\to 0}\\frac{1000\\cdot 2^{3+h}-1000\\cdot 2^3}{h}",
              gap: "tight",
              say: "Difference quotient at t equals 3.",
            },
            {
              id: "step_2",
              math: "8000\\lim_{h\\to 0}\\frac{2^h-1}{h}",
              gap: "tight",
              say: "Factor out 1000 times 2 cubed.",
            },
            {
              id: "step_3",
              math: "8000\\ln 2",
              say: "Standard limit: 2^h minus 1 over h approaches ln 2.",
            },
            {
              id: "step_4",
              math: "\\approx 5545",
              gap: "loose",
              say: "About 5545 bacteria per hour, not 8000.",
            },
          ],
        },
      ],
      lead: "Correct instantaneous rate ≈ **5545**/hr (vs average 8000 on \\([3,4]\\)).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_exponential_tangent",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "Tangent vs secant at t = 3",
        caption: "Instantaneous slope ≈ 5545 < secant 8000.",
        formulaLabel: "P",
        plot: {
          plotType: "y_equals",
          expr: "1000*2^x",
          formula: "P(t)=1000\\cdot 2^t",
          xDomain: [2.2, 4.5],
          yDomain: [4000, 17000],
          probeMin: 2.2,
          probeMax: 4.5,
          probeDefault: 3,
          vLines: [{ x: 3 }],
          tags: [{ text: "t=3", x: 3.1, y: 5000, tone: "accent" }],
        },
        params: { x: 3 },
      },
    },
    notes:
      "Correct computation after the misconception slide. Mention ln 2 as a known limit (preview chain rule / exp derivatives later). Contrast 5545 vs 8000 one more time.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 5: CORNER CASE + APPLICATIONS + SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s12_pause_does_this_function_have_an_instantaneous_rate",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Rate at a Corner?",
    question: "Does instantaneous ROC exist at \\(x=2\\) for \\(f(x)=|x-2|\\)?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Continuous functions can fail to have an instantaneous rate at a **corner**. Compute one-sided limits of \\(\\frac{f(2+h)-f(2)}{h}\\).",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Left slope? Right slope? Does a two-sided limit exist?",
          reveal: { text: "Left **−1**, right **+1**, unequal ⇒ no instantaneous rate (derivative DNE)." },
        },
      ],
      lead: "Differentiability needs a **single** tangent slope, not two competing secant stories.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_abs_corner_pause",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "f(x) = |x − 2|",
        caption: "Sharp corner at x = 2: no unique tangent.",
        formulaLabel: "f",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=|x-2|",
          xDomain: [0, 4],
          yDomain: [-0.5, 2.5],
          probeMin: 0,
          probeMax: 4,
          probeDefault: 1.2,
          branches: [
            { expr: "-(x-2)", xMin: 0, xMax: 2, openAtEnd: true, stroke: "#2563eb" },
            { expr: "x-2", xMin: 2, xMax: 4, openAtStart: true, stroke: "#c65a28" },
          ],
          filledPoints: [{ x: 2, y: 0 }],
          vLines: [{ x: 2 }],
          tags: [
            { text: "left slope −1", x: 0.8, y: 1.4, tone: "muted" },
            { text: "right slope +1", x: 3.2, y: 1.4, tone: "muted" },
          ],
        },
        params: { x: 1.2 },
        scriptedTimeline: [
          { t: 0, params: { x: 0.8 } },
          { t: 6, params: { x: 1.95 } },
          { t: 12, params: { x: 2.15 } },
        ],
      },
    },
    notes:
      "Second YouTube pause. Probe walks left branch then right branch toward the corner. Students must cite one-sided difference-quotient limits.\n\nStudent prompt: Continuous at x=2, but differentiable?",
  },
  {
    id: "s13_example_4_edge_case_absolute_value",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Edge Case: |x − 2| at the Corner",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          problem: "f(x)=|x-2|,\\quad \\text{instantaneous ROC at } x=2",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\lim_{h\\to 0^+}\\frac{|h|}{h}=1",
              gap: "tight",
              say: "Right-hand difference quotient.",
            },
            {
              id: "step_2",
              math: "\\lim_{h\\to 0^-}\\frac{|h|}{h}=-1",
              gap: "tight",
              say: "Left-hand difference quotient.",
            },
            {
              id: "step_3",
              op: "=>",
              math: "\\text{DNE}",
              say: "One-sided limits differ, no instantaneous rate at the corner.",
            },
          ],
        },
      ],
      lead: "Unequal one-sided slopes ⇒ **no** derivative at \\(x=2\\) (callback to one-sided limits, Topic 5).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_abs_corner_solution",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "No single tangent at x = 2",
        caption: "V-shape: left line slope −1, right line slope +1.",
        formulaLabel: "f",
        plot: {
          plotType: "piecewise",
          formula: "f(x)=|x-2|",
          xDomain: [-0.5, 4.5],
          yDomain: [-0.5, 2.5],
          probeMin: 0,
          probeMax: 4,
          probeDefault: 1.5,
          branches: [
            { expr: "-(x-2)", xMin: 0, xMax: 2, openAtEnd: true, stroke: "#2563eb" },
            { expr: "x-2", xMin: 2, xMax: 4, openAtStart: true, stroke: "#c65a28" },
          ],
          filledPoints: [{ x: 2, y: 0 }],
          vLines: [{ x: 2 }],
        },
        params: { x: 1.5 },
      },
    },
    notes:
      "Answer the pause aloud. DNE does not mean messy, each side has a clear slope. Smoothness (no corners) is required for instantaneous ROC.",
  },
  {
    id: "s14_example_5_application_marginal_cost",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Marginal Cost",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          stepLayout: "flow",
          splitAfter: 3,
          problem: "C(x)=500+20x+0.1x^2,\\quad \\text{marginal cost at } x=50",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\lim_{h\\to 0}\\frac{C(50+h)-C(50)}{h}",
              gap: "tight",
              say: "Marginal cost is instantaneous rate of change of cost.",
            },
            {
              id: "step_2",
              math: "C(50+h)=1750+30h+0.1h^2",
              gap: "tight",
              say: "Expand C of 50 plus h.",
            },
            {
              id: "step_3",
              math: "C(50)=1750",
              gap: "tight",
              say: "Baseline cost at 50 units.",
            },
            {
              id: "step_4",
              math: "\\frac{30h+0.1h^2}{h}",
              gap: "tight",
              say: "Difference quotient.",
            },
            {
              id: "step_5",
              math: "30+0.1h",
              say: "Cancel h.",
            },
            {
              id: "step_6",
              math: "30",
              gap: "loose",
              say: "Marginal cost $30 per additional unit at x=50.",
            },
          ],
        },
      ],
      lead: "Marginal cost at 50 units = **$30**/unit.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_marginal_cost",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        title: "C(x) with tangent at x = 50",
        caption: "Slope of tangent ≈ 30: cost of one more unit.",
        formulaLabel: "C",
        plot: {
          plotType: "y_equals",
          expr: "500+20*x+0.1*x^2",
          formula: "C(x)=500+20x+0.1x^2",
          xDomain: [0, 100],
          yDomain: [0, 3500],
          probeMin: 0,
          probeMax: 100,
          probeDefault: 50,
          filledPoints: [{ x: 50, y: 1750 }],
          tags: [{ text: "marginal ≈ $30", x: 55, y: 2000, tone: "accent" }],
        },
        params: { x: 50 },
      },
    },
    notes:
      "Economics application, marginal cost = derivative of cost. Walk the limit steps; answer $30 is the tangent slope at production level 50.",
  },
  {
    id: "s15_recap_key_formulas",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Recap: Key Formulas",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formulas",
          type: "formula_block",
          formulas: [
            "**Average:** \\(\\displaystyle\\frac{f(b)-f(a)}{b-a}\\)",
            "**Instantaneous (h-form):** \\(\\displaystyle\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}=f'(a)\\)",
            "**Instantaneous (two-point):** \\(\\displaystyle\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}\\)",
          ],
        },
        {
          id: "left_reminder",
          type: "paragraph",
          text: "Instantaneous = **limit** of averages = **tangent slope** = **derivative** when the limit exists.",
        },
      ],
      lead: "Three equivalent views of the same idea.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_recap_secant",
        kind: "calculus_widget",
        widget: "secant_tangent",
        title: "Secant → tangent recap",
        caption: "Shrink h one last time.",
        formulaLabel: "f",
        params: { a: 1.5, h: 0.4 },
        scriptedTimeline: [
          { t: 0, params: { a: 1.5, h: 1 } },
          { t: 5, params: { a: 1.5, h: 0.25 } },
          { t: 10, params: { a: 1.5, h: 0.06 } },
        ],
      },
    },
    notes:
      "Compress formulas, one beat each. Widget timeline is the visual memory hook. Bridge to Topic 9: next we formalize \\(f'(a)\\) and the tangent line equation.",
  },
  {
    id: "s16_summary_and_learning_objectives",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways",
    question: "",
    lead: "Your instantaneous-rate toolkit, Session 3 has begun:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Average vs instantaneous**, secant slope over an interval vs limit as \\(h\\to 0\\)." },
          { id: "bullet_2", text: "**Limit definition**, same machinery as Session 2; difference quotients often give \\(0/0\\) before canceling \\(h\\)." },
          { id: "bullet_3", text: "**Applications**, velocity \\(s'(t)\\), marginal cost \\(C'(x)\\), growth rates." },
          { id: "bullet_4", text: "**Corners**, \\(|x-2|\\) at \\(x=2\\): one-sided slopes differ ⇒ no instantaneous rate." },
          { id: "bullet_5", text: "**Next topic**, Formal Definition of the Derivative: \\(f'(a)\\), tangent line \\(y=f(a)+f'(a)(x-a)\\), and more limit algebra." },
        ],
      },
    ],
    media: null,
    notes:
      "Recap one beat per bullet. Thank students for completing Topic 8. Teaser Topic 9 by name, formal derivative notation and tangent line equation.",
  },
  {
    id: "s17_challenge_optional_why_must_the_limit_exist",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Challenge (Optional): x sin(1/x)",
    question: "Does \\(f'(0)\\) exist for \\(f(x)=x\\sin(1/x)\\) (\\(f(0)=0\\))?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph",
          type: "paragraph",
          text: "Not every continuous function has a derivative. Corners fail via **unequal one-sided slopes**. For \\(f(x)=x\\sin(1/x)\\), the difference quotient at \\(0\\) is \\(\\sin(1/h)\\), which **oscillates**, no single limit.",
        },
        {
          id: "left_hint",
          type: "paragraph",
          text: "**Extension:** Compare with \\(x^2\\sin(1/x)\\) in Topic 9, squeeze theorem can give derivative **0** there.",
        },
      ],
      lead: "Optional, shows why the **limit** in the definition must exist as a single number.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_x_sin_reciprocal",
        kind: "calculus_widget",
        widget: "function_analysis",
        variant: "flex_plot",
        plot: {
          plotType: "squeeze",
          mid: "x*sin(1/x)",
          lower: "-abs(x)",
          upper: "abs(x)",
          formula: "f(x)=x\\sin\\!\\left(\\frac{1}{x}\\right)",
          tag: "oscillating secant slopes → f′(0) DNE",
          tagTone: "warn",
        },
        title: "x sin(1/x) near 0",
        caption: "Zoom in: oscillations never settle on one slope.",
        formulaLabel: "f",
        params: { zoom: 0.35 },
        scriptedTimeline: [
          { t: 0, params: { zoom: 0.5 } },
          { t: 6, params: { zoom: 0.15 } },
          { t: 12, params: { zoom: 0.04 } },
        ],
      },
    },
    notes:
      "Skip if time-limited. Contrast with |x−2| corner (clean ±1 slopes) vs wild oscillation (no approach value). Forward pointer to squeeze example in Topic 9.\n\nStudent prompt: Write the difference quotient at 0, what happens as h→0?",
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
 *   - secant_tangent on s01–s06, s07, s15, s17 (vary a, h; timelines shrink h→0).
 *   - s04 → visual_lab with labExamples (3 tabs: wide / mid / tiny h).
 *   - flex_plot for position s(t), exponential P(t), |x−2| corner, marginal C(x),
 *     optional x sin(1/x) squeeze, unique plot specs per slide.
 *   - Removed all source/sourceSpec/sourceCode/python_code metadata.
 *
 * RICH BLOCKS
 *   - theorem_box on s06; misconception_compare on s10.
 *   - math_solution_steps (flow, step ids) on s07, s09, s11, s13, s14.
 *   - pause_and_reveal with real reveals on s08, s12.
 *
 * PEDAGOGY
 *   - Welcome-back: Session 2 complete (IVT); Session 3 derivatives open.
 *   - Roadmap currentId path_topic_08; Topic 9 formal derivative as next.
 *   - Arc: speedometer → average → limit → lab → apps → corner DNE → summary.
 *
 * ESTIMATED DURATION: ~21–24 min
 */