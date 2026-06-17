// Generated from courses/Calculus/Materials/trigonometry_and_graphing_review.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `npm run convert:calculus-test` or `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "02_trigonometry_and_graphing_review",
  title: "Trigonometry and Graphing Review",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial:
    "courses/Calculus/Materials/trigonometry_and_graphing_review.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "Trigonometry and Graphing Review",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: Unit circle, ASTC. identities, graphing transformations • ~25 min • first-year university / advanced high school",
    notes:
      "Assumes familiarity with right-triangle SOH-CAH-TOA and radian measure. Welcome students back, Topic 1 covered function families; now trig becomes the periodic toolkit limits and derivatives will lean on.",
  },
  {
    id: "learning_objectives",
    type: "bullets",
    hud: "Arian University • Calculus 1",
    title: "Learning Objectives",
    lead: "By the end of this session you will be able to:",
    blocks: [
      {
        id: "topic_bridge",
        type: "paragraph",
        text: "Together with Topic 1, this completes the visual language Session 2 assumes.",
      },
      {
        id: "calculus1_roadmap",
        type: "course_path",
        layout: "topic_grid",
        currentId: "path_topic_02",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", note: "Today", status: "current", expanded: true },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", note: "Next", status: "next", expanded: true },
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
      { id: "objective_1", text: "Read \\(\\sin\\theta\\), \\(\\cos\\theta\\), and \\(\\tan\\theta\\) from the unit circle." },
      { id: "objective_2", text: "Apply ASTC to determine which trig functions are positive in each quadrant." },
      { id: "objective_3", text: "Use reciprocal and Pythagorean identities, including the ± sign from ASTC." },
      { id: "objective_4", text: "Evaluate any angle using the reference-angle method (quadrant → reference → signs → values)." },
      { id: "objective_5", text: "Graph sine, cosine, and tangent with amplitude, period, phase, and vertical shift, same transformation language as Topic 1." },
      { id: "objective_6", text: "Connect circular motion to periodic graphs, the Ferris wheel model." },
    ],
    notes:
      "Orient on the roadmap first: Topic 1 is done, this is Topic 2 in Session 1, and Session 2 (Limits) is next, the Squeeze Theorem will need \\(\\sin x / x\\). Together with Topic 1, this completes the visual language Session 2 assumes. Walk objectives quickly; each maps to a block in the lecture.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: HOOK + UNIT CIRCLE FOUNDATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_the_ferris_wheel_metaphor",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Ferris Wheel Metaphor",
    question: "As you drag θ, watch height (sine) and horizontal distance (cosine) stay linked.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "On a Ferris wheel, your **height** above center traces a **sine** wave; your **horizontal** distance from center traces **cosine**. Same rotation angle θ, two linked outputs.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "Calculus treats the **unit circle** as the wheel of radius 1. That single picture will carry us through exact values, signs, and graph transformations.",
        },
      ],
      lead: "Circular motion → sine (height) and cosine (horizontal distance).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_unit_circle_ferris",
        kind: "calculus_widget",
        widget: "unit_circle_trig",
        variant: "ferris_link",
        title: "Unit circle linked to sin θ and cos θ waves",
        caption: "Drag θ: the point on the circle, wave dots, and bars move together.",
        params: { theta: 0 },
        scriptedTimeline: [
          { t: 0, params: { theta: 0 } },
          { t: 4, params: { theta: Math.PI / 2 } },
          { t: 8, params: { theta: Math.PI } },
          { t: 12, params: { theta: (3 * Math.PI) / 2 } },
          { t: 16, params: { theta: 2 * Math.PI } },
        ],
      },
    },
    notes:
      "Open the content with motion, not memorization. Ride the Ferris wheel metaphor for 30 seconds, then drag θ once slowly: at π/2 height is max, at π height is 0 but horizontal is −1. Preview that every trig value we compute is a coordinate or ratio on this circle.\n\nStudent prompt: As θ increases, which reaches zero first, sine or cosine?",
  },
  {
    id: "s02_unit_circle_definitions",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Unit Circle Definitions",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Unit circle definitions",
          text: "For angle \\(\\theta\\) in standard position, let the terminal side hit the unit circle at \\((x,y)\\). Then \\(\\cos\\theta = x\\), \\(\\sin\\theta = y\\), and \\(\\tan\\theta = \\frac{y}{x} = \\frac{\\sin\\theta}{\\cos\\theta}\\) when \\(\\cos\\theta \\neq 0\\).",
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "Radius 1 means the hypotenuse is always 1, so the Pythagorean identity \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) is built in.",
        },
      ],
      lead: "\\(\\sin\\theta = y\\), \\(\\cos\\theta = x\\), \\(\\tan\\theta = \\sin\\theta/\\cos\\theta\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_unit_circle_projections",
        kind: "calculus_widget",
        widget: "unit_circle_trig",
        variant: "projections",
        title: "Projections show sin θ and cos θ",
        caption: "Cos along the x-axis, sin along the y-axis: same triangle as the Pythagorean slide.",
        formulaLabel: "\\sin\\theta,\\cos\\theta",
        params: { theta: Math.PI / 6 },
        scriptedTimeline: [
          { t: 0, params: { theta: Math.PI / 6 } },
          { t: 4, params: { theta: Math.PI / 4 } },
          { t: 8, params: { theta: Math.PI / 3 } },
          { t: 12, params: { theta: Math.PI / 2 } },
        ],
      },
    },
    notes:
      "This is the definition that works for every angle, not just acute triangles. Sine is the y-coordinate, cosine the x-coordinate. Tangent is their ratio; undefined when cosine is 0 (odd multiples of π/2).\n\nMove θ through π/6, π/4, π/3 so students see coordinates shrink and grow predictably.",
  },
  {
    id: "s03_quadrant_signs_astc",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Quadrant Signs (ASTC)",
    question: "In Quadrant II, which of sin, cos, tan can be positive?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Memorize: **A**ll **S**tudents **T**ake **C**alculus.",
        },
        {
          id: "left_bullets",
          type: "nested_bullets",
          items: [
            { id: "q1", text: "Quad I, **All** positive (sin, cos, tan)" },
            { id: "q2", text: "Quad II, **S**ine positive only" },
            { id: "q3", text: "Quad III, **T**angent positive only" },
            { id: "q4", text: "Quad IV, **C**osine positive only" },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Quick check",
          prompt: "θ in Quadrant III, is tangent positive or negative?",
          reveal: {
            text: "POSITIVE. sine and cosine are both negative in QIII. so their ratio tan = sin/cos is positive.",
          },
        },
      ],
      lead: "ASTC tells which trig functions are positive in each quadrant.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_unit_circle_astc",
        kind: "calculus_widget",
        widget: "unit_circle_trig",
        variant: "astc",
        title: "ASTC regions on the unit circle",
        caption: "Sin/cos triangle on the circle; extended ray hits the tan line on the right (no tan on other slides).",
        formulaLabel: "\\text{ASTC}",
        params: { theta: Math.PI / 3 },
        scriptedTimeline: [
          { t: 0, params: { theta: Math.PI / 3 } },
          { t: 4, params: { theta: (2 * Math.PI) / 3 } },
          { t: 8, params: { theta: (4 * Math.PI) / 3 } },
          { t: 12, params: { theta: (5 * Math.PI) / 3 } },
        ],
      },
    },
    notes:
      "ASTC is not magic, it is coordinate logic. In QII, x < 0 and y > 0, so only sine (y) is positive. Walk the scripted timeline through all four quadrants.\n\nPause answer (QIII tangent): POSITIVE. sine and cosine are both negative in QIII. so tan = sin/cos is positive.",
  },
  {
    id: "s04_reciprocal_identities",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Reciprocal Identities",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "\\(\\csc\\theta = \\frac{1}{\\sin\\theta}\\)",
            "\\(\\sec\\theta = \\frac{1}{\\cos\\theta}\\)",
            "\\(\\cot\\theta = \\frac{1}{\\tan\\theta} = \\frac{\\cos\\theta}{\\sin\\theta}\\)",
          ],
        },
        {
          id: "left_table",
          type: "math_table",
          headers: ["Pair", "The reciprocal is undefined when…"],
          rows: [
            ["sin ↔ csc", "\\(\\sin\\theta = 0\\)  (csc undefined)"],
            ["cos ↔ sec", "\\(\\cos\\theta = 0\\)  (sec undefined)"],
            ["tan ↔ cot", "\\(\\tan\\theta = 0\\)  (cot undefined)"],
          ],
        },
      ],
      lead: "Cosecant, secant, cotangent are reciprocals, watch denominators.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_unit_circle_recip",
        kind: "calculus_widget",
        widget: "unit_circle_trig",
        variant: "projections",
        title: "sin and cos as reciprocals of csc and sec",
        caption: "Near θ = 0, cos ≈ 1 and sec ≈ 1. Near θ = π/2, sin ≈ 1 and csc ≈ 1.",
        params: { theta: Math.PI / 4 },
        scriptedTimeline: [
          { t: 0, params: { theta: Math.PI / 4 } },
          { t: 5, params: { theta: Math.PI / 2 - 0.15 } },
          { t: 10, params: { theta: 0.15 } },
        ],
      },
    },
    notes:
      "Keep reciprocals mechanical: flip the fraction. Secant blows up where cosine hits zero, that's at odd multiples of π/2. Students will see these vertical asymptotes on tangent/secant graphs later.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: IDENTITIES + GRAPH BEHAVIOR
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s05_pythagorean_identity_proof",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pythagorean Identity: Proof",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_theorem",
          type: "theorem_box",
          title: "Pythagorean identity",
          text: "\\(\\sin^2\\theta + \\cos^2\\theta = 1\\) for every angle θ.",
        },
        {
          id: "left_steps",
          type: "derivation_steps",
          title: "From the unit circle",
          steps: [
            { id: "step_1", text: "On the unit circle, every point satisfies \\(x^2 + y^2 = 1\\)." },
            { id: "step_2", text: "The point at angle θ is \\((\\cos\\theta, \\sin\\theta)\\)." },
            { id: "step_3", text: "Substitute: \\(\\cos^2\\theta + \\sin^2\\theta = 1\\). ∎" },
          ],
        },
        {
          id: "left_warning",
          type: "paragraph",
          text: "**Warning:** \\(\\cos\\theta = \\pm\\sqrt{1 - \\sin^2\\theta}\\). The square root gives ±, **ASTC decides the sign.**",
        },
      ],
      lead: "The unit circle equation IS the Pythagorean identity.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_pythagorean_circle",
        kind: "calculus_widget",
        widget: "unit_circle_trig",
        variant: "pythagorean",
        title: "sin²θ + cos²θ = 1 on the circle",
        caption: "Banner updates live: the sum stays 1 as θ changes.",
        formulaLabel: "\\sin^2\\theta+\\cos^2\\theta",
        params: { theta: Math.PI / 3 },
        scriptedTimeline: [
          { t: 0, params: { theta: Math.PI / 6 } },
          { t: 4, params: { theta: Math.PI / 3 } },
          { t: 8, params: { theta: Math.PI / 4 } },
          { t: 12, params: { theta: (2 * Math.PI) / 3 } },
          { t: 16, params: { theta: (5 * Math.PI) / 4 } },
        ],
      },
    },
    notes:
      "This identity is the bridge from geometry to algebra. When a problem gives sin θ and asks for cos θ, square this identity, then use ASTC for the sign. Emphasize: taking a square root always gives ± until the quadrant decides.",
  },
  {
    id: "s06_periodicity",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Periodicity",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "\\(\\sin(\\theta + 2\\pi) = \\sin\\theta\\)",
            "\\(\\cos(\\theta + 2\\pi) = \\cos\\theta\\)",
            "\\(\\tan(\\theta + \\pi) = \\tan\\theta\\)",
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "One full turn (\\(2\\pi\\)) returns sin and cos. Tangent repeats every \\(\\pi\\) because sin and cos both flip sign, ratio unchanged.",
        },
        {
          id: "left_asymptote",
          type: "paragraph",
          text: "**Tangent:** undefined at \\(\\theta = \\frac{\\pi}{2} + k\\pi\\), these vertical asymptotes appear on the tangent graph.",
        },
      ],
      lead: "Sine & cosine period \\(2\\pi\\); tangent period \\(\\pi\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_period_graphs",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "trig_period",
        title: "Sine period 2π vs tangent period π",
        caption: "Green brackets mark one full period; formulas label the plot.",
        formulaLabel: "\\sin",
        params: { family: "sine" },
        scriptedTimeline: [
          { t: 0, params: { family: "sine" } },
          { t: 8, params: { family: "tangent" } },
        ],
      },
    },
    notes:
      "Periodicity is why reference angles work: every angle is equivalent to one in a single turn. On the tangent graph, point out asymptotes at π/2 + kπ, the denominator cos θ hits zero there.",
  },
  {
    id: "s07_even_odd_properties",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Even / Odd Properties",
    question: "Is cos(−θ) equal to cos θ or −cos θ?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "\\(\\sin(-\\theta) = -\\sin\\theta\\)  (odd)",
            "\\(\\cos(-\\theta) = \\cos\\theta\\)  (even)",
            "\\(\\tan(-\\theta) = -\\tan\\theta\\)  (odd)",
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "What is cos(−π/3)?",
          reveal: {
            text: "\\(\\cos(-\\pi/3) = \\cos(\\pi/3) = \\frac{1}{2}\\), cosine is even, so negating the angle leaves cosine unchanged.",
          },
        },
      ],
      lead: "Sine & tangent are odd; cosine is even.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_symmetry_graphs",
        kind: "calculus_widget",
        widget: "function_transform",
        variant: "even_odd_demo",
        title: "Odd sine vs even cosine",
        caption: "Drag test x: compare f(x) and f(−x) at the marked points.",
        formulaLabel: "f",
        params: { family: "sine", demoX: 1.2 },
        scriptedTimeline: [
          { t: 0, params: { family: "sine", demoX: 0.8 } },
          { t: 5, params: { family: "sine", demoX: 1.6 } },
          { t: 10, params: { family: "cosine", demoX: 1.2 } },
          { t: 15, params: { family: "cosine", demoX: 2.0 } },
        ],
      },
    },
    notes:
      "Symmetry saves work: cos(−θ) needs no sign flip; sin(−θ) flips. These reappear in integration over symmetric intervals.\n\nPause answer: cos(−π/3) = 1/2.",
  },
  {
    id: "s08_graphing_transformations",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Graphing Transformations",
    question: "Try A negative, what happens to the wave?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "For \\(y = A\\sin(Bx + C) + D\\) (same for cosine):",
            "Amplitude \\(= |A|\\)",
            "Period \\(= \\dfrac{2\\pi}{|B|}\\)",
            "Phase shift \\(= -\\dfrac{C}{B}\\)",
            "Vertical shift \\(= D\\)",
          ],
        },
        {
          id: "left_map",
          type: "paragraph",
          text: "Inside the function: \\(Bx + C = B\\left(x + \\frac{C}{B}\\right)\\). Phase shift is **opposite** the sign you'd guess from \\(+C\\).",
        },
      ],
      lead: "Amplitude |A|, period 2π/|B|, phase −C/B, vertical D.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_trig_transform",
        kind: "calculus_widget",
        widget: "function_transform",
        title: "y = A sin(Bx + C) + D: interactive",
        caption: "Gray: parent sin(x). Orange: transformed.",
        formulaLabel: "\\sin",
        params: { family: "sine", a: 1, b: 1, h: 0, k: 0 },
        scriptedTimeline: [
          { t: 0, params: { family: "sine", a: 1, b: 1, h: 0, k: 0 } },
          { t: 4, params: { family: "sine", a: 2, b: 1, h: 0, k: 0 } },
          { t: 8, params: { family: "sine", a: 2, b: 2, h: 0, k: 0 } },
          { t: 12, params: { family: "sine", a: 2, b: 2, h: -0.5, k: 0 } },
          { t: 16, params: { family: "sine", a: 2, b: 2, h: -0.5, k: 1 } },
        ],
      },
    },
    notes:
      "Map widget params: a = A, b = B, h = phase shift (−C/B), k = D. Walk the timeline one parameter at a time: amplitude → period → phase → vertical shift.\n\nStudent prompt: Negative A reflects across the x-axis, amplitude is still |A| = 2.",
  },
  {
    id: "s08b_misconception_phase_shift",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Common Mistake: Phase Shift Direction",
    question: "For \\(y = \\sin(2x + \\pi)\\), does the graph shift right \\(\\pi\\) or left \\(\\pi/2\\)?",
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
              text: "'\\(y = \\sin(2x + \\pi)\\) shifts **right** \\(\\pi\\) because \\(+\\pi\\) adds inside.'",
            },
            {
              label: "✅ Correct reasoning",
              text: "Phase shift \\(= -\\dfrac{C}{B} = -\\dfrac{\\pi}{2}\\) → shifts **left** \\(\\pi/2\\). Factor: \\(2x+\\pi = 2\\left(x+\\frac{\\pi}{2}\\right)\\).",
            },
          ],
        },
        {
          id: "left_rule",
          type: "paragraph",
          text: "**Same rule as Topic 1 horizontal shifts:** the sign inside is **opposite** to the shift direction. Always compute \\(-C/B\\).",
        },
      ],
      lead: "\\(+C\\) inside does **not** mean shift right. Phase shift \\(= -C/B\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_phase_misconception",
        kind: "calculus_widget",
        widget: "function_transform",
        title: "sin(2x + π): phase shift left π/2",
        caption: "Gray: parent sin(x). Orange: sin(2x + π).",
        formulaLabel: "\\sin",
        params: { family: "sine", a: 1, b: 2, h: -Math.PI / 2, k: 0 },
        scriptedTimeline: [
          { t: 0, params: { family: "sine", a: 1, b: 1, h: 0, k: 0 } },
          { t: 4, params: { family: "sine", a: 1, b: 2, h: Math.PI / 2, k: 0 } },
          { t: 8, params: { family: "sine", a: 1, b: 2, h: -Math.PI / 2, k: 0 } },
        ],
      },
    },
    notes:
      "Mirror the Topic 1 horizontal-shift misconception slide. The tempting error is reading +π as a rightward shift. Factor 2x+π = 2(x+π/2) to see the true left shift of π/2.\n\nTimeline: parent → wrong (+π/2 right) → correct (−π/2 left).\n\nPause answer: left π/2, not right π.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: WORKED EXAMPLES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s09_warm_up_example_exact_values_at_3",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: Exact Values at π/3",
    question: "Before I reveal, what are sin, cos, tan at π/6?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          problem: "\\theta=\\frac{\\pi}{3}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\left(\\frac{1}{2},\\frac{\\sqrt{3}}{2}\\right)",
              gap: "tight",
              say: "Locate pi over 3 on the unit circle.",
            },
            {
              id: "step_2",
              parts: [
                { math: "\\sin(\\pi/3)=\\frac{\\sqrt{3}}{2}" },
                { math: "\\cos(\\pi/3)=\\frac{1}{2}", op: "=" },
              ],
              gap: "tight",
              say: "Read sine and cosine from coordinates.",
            },
            {
              id: "step_3",
              math: "\\tan(\\pi/3)=\\sqrt{3}",
              say: "Tangent is sine over cosine.",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Your turn",
          prompt: "π/6 values?",
          reveal: {
            text: "\\(\\sin(\\pi/6) = \\frac{1}{2}\\), \\(\\cos(\\pi/6) = \\frac{\\sqrt{3}}{2}\\), \\(\\tan(\\pi/6) = \\frac{1}{\\sqrt{3}}\\).",
          },
        },
      ],
      lead: "\\(\\sin(\\pi/3)=\\frac{\\sqrt{3}}{2}\\), \\(\\cos(\\pi/3)=\\frac{1}{2}\\), \\(\\tan(\\pi/3)=\\sqrt{3}\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_special_pi3",
        kind: "calculus_widget",
        widget: "unit_circle_trig",
        variant: "special_angle",
        title: "π/3 on the unit circle",
        caption: "Triangle for sin/cos plus tan ray on the right. Use the preset menu to switch angles.",
        params: { preset: "pi_over_3" },
        scriptedTimeline: [
          { t: 0, params: { preset: "pi_over_3" } },
          { t: 6, params: { preset: "pi_over_4" } },
          { t: 12, params: { preset: "five_pi_over_3" } },
        ],
      },
    },
    notes:
      "Memorize the ladder: π/6, π/4, π/3, π/2. This warm-up anchors the reference-angle method coming next.\n\nPause answer: at π/6, sin = 1/2, cos = √3/2, tan = 1/√3.",
  },
  {
    id: "s10_standard_example_using_reference_angle_astc",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Standard Example: Reference Angle & ASTC",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_template",
          type: "nested_bullets",
          items: [
            { id: "t1", text: "**1.** Identify the **quadrant**" },
            { id: "t2", text: "**2.** Find the **reference angle** (acute)" },
            { id: "t3", text: "**3.** Apply **ASTC signs**" },
            { id: "t4", text: "**4.** Read **exact values** from special angles" },
          ],
        },
        {
          id: "left_steps",
          type: "math_solution_steps",
          problem: "\\theta=\\frac{5\\pi}{3}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "\\text{QIV}",
              gap: "tight",
              say: "Angle lies in quadrant four.",
            },
            {
              id: "step_2",
              math: "\\text{ref}=\\frac{\\pi}{3}",
              gap: "tight",
              say: "Reference angle is pi over 3.",
            },
            {
              id: "step_3",
              parts: [
                { math: "\\sin=-\\frac{\\sqrt{3}}{2}" },
                { math: "\\cos=\\frac{1}{2}", op: "=" },
                { math: "\\tan=-\\sqrt{3}", op: "=" },
              ],
              say: "Apply ASTC signs in QIV.",
            },
          ],
        },
      ],
      lead: "QIV + reference π/3 → cos +, sin −, tan −.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_ref_5pi3",
        kind: "calculus_widget",
        widget: "unit_circle_trig",
        variant: "reference_angle",
        title: "5π/3 with reference angle π/3",
        caption: "Blue arc: reference angle. Sin/cos triangle updates as you drag θ.",
        formulaLabel: "\\theta",
        params: { theta: (5 * Math.PI) / 3 },
        scriptedTimeline: [
          { t: 0, params: { theta: Math.PI / 3 } },
          { t: 4, params: { theta: Math.PI / 2 } },
          { t: 8, params: { theta: (5 * Math.PI) / 6 } },
          { t: 12, params: { theta: (5 * Math.PI) / 3 } },
          { t: 16, params: { theta: (11 * Math.PI) / 6 } },
        ],
      },
    },
    notes:
      "Template for 'any angle': (1) quadrant, (2) reference angle, (3) ASTC signs, (4) special values. Students should be able to run this loop without hesitation before limits.",
  },
  {
    id: "s11_tricky_example_given_sine_and_quadrant",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Tricky Example: Given sin θ and Quadrant",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          problem: "\\sin\\theta=-\\frac{2}{7},\\ \\theta\\text{ in QIII}",
          steps: [
            {
              id: "step_1",
              op: "=>",
              math: "1-\\frac{4}{49}=\\frac{45}{49}",
              gap: "tight",
              say: "Substitute sin squared into the Pythagorean identity.",
            },
            {
              id: "step_2",
              math: "\\cos^2\\theta=\\frac{45}{49}",
              gap: "tight",
              say: "So cosine squared is forty-five forty-ninths.",
            },
            {
              id: "step_3",
              math: "\\cos\\theta=\\pm\\frac{\\sqrt{45}}{7}=\\pm\\frac{3\\sqrt{5}}{7}",
              gap: "tight",
              say: "Square root gives plus or minus. Simplify root forty-five as three root five.",
            },
            {
              id: "step_4",
              math: "\\cos\\theta=-\\frac{3\\sqrt{5}}{7}",
              gap: "tight",
              say: "Quadrant three forces cosine negative.",
            },
            {
              id: "step_5",
              math: "\\tan\\theta=\\frac{2\\sqrt{5}}{15}",
              say: "Tangent is sine over cosine; rationalize.",
            },
          ],
        },
      ],
      lead: "Algebra gives ±; ASTC picks the sign.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_q3_circle",
        kind: "calculus_widget",
        widget: "unit_circle_trig",
        variant: "astc",
        title: "QIII: both coordinates negative",
        caption: "sin < 0 and cos < 0 → tan > 0.",
        params: { theta: (4 * Math.PI) / 3 },
        scriptedTimeline: [
          { t: 0, params: { theta: (4 * Math.PI) / 3 } },
          { t: 6, params: { theta: (5 * Math.PI) / 4 } },
        ],
      },
    },
    notes:
      "The trap is stopping at the positive square root. Always write ±, then let the quadrant choose. In QIII both legs are negative, so tangent is positive.",
  },
  {
    id: "s12_common_mistake_forgetting_the_sign",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Common Mistake: Forgetting the Sign",
    question: "Why is cosine negative in QIII? Point to the x-coordinate.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Square-root trap",
          pairs: [
            {
              label: "❌ Tempting mistake",
              text: "\\(\\cos\\theta = \\sqrt{1 - \\sin^2\\theta} = \\frac{3\\sqrt{5}}{7}\\) (always take the positive root).",
            },
            {
              label: "✅ Correct reasoning",
              text: "\\(\\cos\\theta = \\pm\\frac{3\\sqrt{5}}{7}\\). In QIII. \\(x < 0\\) so \\(\\cos\\theta = -\\frac{3\\sqrt{5}}{7}\\).",
            },
          ],
        },
        {
          id: "left_rule",
          type: "paragraph",
          text: "Remember: \\(\\sqrt{x^2} = |x|\\), not \\(x\\). The quadrant tells you which sign \\(x\\) carries.",
        },
      ],
      lead: "Never stop at the positive square root, ASTC chooses the sign.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_mistake_astc",
        kind: "calculus_widget",
        widget: "unit_circle_trig",
        variant: "projections",
        title: "In QIII. cos θ is the negative x-coordinate",
        caption: "The horizontal projection points left of the origin.",
        params: { theta: (4 * Math.PI) / 3 },
        scriptedTimeline: [
          { t: 0, params: { theta: (4 * Math.PI) / 3 } },
          { t: 5, params: { theta: Math.PI } },
          { t: 10, params: { theta: (3 * Math.PI) / 2 } },
        ],
      },
    },
    notes:
      "Name the mistake before students make it a habit. Tie back to the previous example: same numbers, wrong sign = wrong tangent.\n\nStudent prompt: cosine is negative in QIII because the x-coordinate is left of zero.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // CHALLENGE + PAUSE + LAB
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s13_challenge_optional_deriving_tangent_period",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Why Tangent Has Period π",
    question: "Can you explain why sin(θ + π) = −sin θ on the unit circle?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_proof",
          type: "proof_sketch",
          title: "Period π for tangent",
          text: "Adding π rotates to the opposite point: \\((\\cos\\theta, \\sin\\theta) \\mapsto (-\\cos\\theta, -\\sin\\theta)\\).",
          steps: [
            { id: "step_1", text: "\\(\\sin(\\theta+\\pi) = -\\sin\\theta\\), \\(\\cos(\\theta+\\pi) = -\\cos\\theta\\)." },
            { id: "step_2", text: "\\(\\tan(\\theta+\\pi) = \\frac{-\\sin\\theta}{-\\cos\\theta} = \\tan\\theta\\)." },
          ],
        },
      ],
      lead: "Opposite point flips both coordinates, ratio unchanged.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_tangent_period",
        kind: "calculus_widget",
        widget: "function_transform",
        title: "Tangent graph repeats every π",
        caption: "Watch asymptotes at odd multiples of π/2.",
        params: { family: "tangent", a: 1, b: 1, h: 0, k: 0 },
        scriptedTimeline: [
          { t: 0, params: { family: "tangent", a: 1, b: 1, h: 0, k: 0 } },
          { t: 6, params: { family: "tangent", a: 1, b: 1, h: Math.PI / 2, k: 0 } },
        ],
      },
    },
    notes:
      "Optional depth for curious students. The unit-circle picture explains the algebra in one sentence. Shifting tangent by π/2 shows how phase moves asymptotes.\n\nPause answer: θ + π is the antipodal point, so y-coordinate negates.",
  },
  {
    id: "s14_pause_and_try_predict_the_phase_shift",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause and Try: Predict the Phase Shift",
    question: "Pause, compute all four parameters, then continue for the reveal.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_problem",
          type: "paragraph",
          text: "For \\(y = 2\\cos(3x + \\pi) - 1\\), find amplitude, period, phase shift (with direction), and vertical shift.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Reveal when ready",
          prompt: "Phase shift = ?",
          reveal: {
            text: "Amplitude 2 · Period \\(2\\pi/3\\) · Phase shift \\(-\\pi/3\\) (left) · Vertical shift \\(-1\\) (down).",
          },
        },
      ],
      lead: "Read A, B, C, D from \\(y = 2\\cos(3x + \\pi) - 1\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_cos_pause",
        kind: "calculus_widget",
        widget: "function_transform",
        title: "y = 2cos(3x + π) − 1",
        caption: "Gray: cos(x). Orange: transformed.",
        formulaLabel: "\\cos",
        params: { family: "cosine", a: 2, b: 3, h: -Math.PI / 3, k: -1 },
        scriptedTimeline: [
          { t: 0, params: { family: "cosine", a: 1, b: 1, h: 0, k: 0 } },
          { t: 5, params: { family: "cosine", a: 2, b: 3, h: -Math.PI / 3, k: -1 } },
        ],
      },
    },
    notes:
      "YouTube pause moment. C = π inside 3x + π means phase shift −π/3 (left), not +π/3. After students answer, animate from parent cosine to full transform.\n\nReveal: A=2, period 2π/3, phase −π/3 left, vertical −1.",
  },
  {
    id: "s15_interactive_lab_ferris_wheel_simulation",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Interactive Lab: Ferris Wheel ↔ Trig Graphs",
    question: "Set θ through a full turn. How do the sin and cos readouts stay in sync?",
    lead: "Drag θ, the circle, waves, and bars update together. This is the model behind periodic motion in physics and engineering.",
    blocks: [
      {
        id: "lab_prompt",
        type: "paragraph",
        text: "**Explore:** At which angles is height zero? When is horizontal distance maximal? How would doubling the radius (in a real wheel) change amplitude?",
      },
    ],
    media: {
      id: "lab_ferris_full",
      kind: "calculus_widget",
      widget: "unit_circle_trig",
      variant: "ferris_link",
      title: "Ferris wheel lab: full width",
      caption: "θ controls everything: point on circle, wave markers, sin/cos bars.",
      params: { theta: Math.PI / 4 },
      scriptedTimeline: [
        { t: 0, params: { theta: 0 } },
        { t: 3, params: { theta: Math.PI / 2 } },
        { t: 6, params: { theta: Math.PI } },
        { t: 9, params: { theta: (3 * Math.PI) / 2 } },
        { t: 12, params: { theta: 2 * Math.PI } },
      ],
    },
    notes:
      "Full-width lab slide, let students play. Connect back to s01: same widget, now they understand every readout. Radius in a real Ferris wheel scales amplitude; angular speed scales how fast you traverse θ in time (period in a real model).",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s16_lecture_summary",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways",
    question: "",
    lead: "Your trig toolkit before Session 2, Limits and Continuity:",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          {
            id: "bullet_1",
            text: "**Unit circle**, \\(\\cos\\theta = x\\), \\(\\sin\\theta = y\\), \\(\\tan\\theta = y/x\\). One picture for every angle.",
          },
          {
            id: "bullet_2",
            text: "**ASTC + reference angles**, quadrant → sign; acute reference → exact value. Run this loop on any angle.",
          },
          {
            id: "bullet_3",
            text: "**Identities**, reciprocals flip denominators; \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) finds missing values (with ± and ASTC).",
          },
          {
            id: "bullet_4",
            text: "**Graph parameters**, amplitude |A|, period \\(2\\pi/|B|\\), phase \\(-C/B\\), vertical D. Same language as Topic 1 transforms.",
          },
          {
            id: "bullet_5",
            text: "**Symmetry & period**, sine/tangent odd, cosine even; sin/cos period \\(2\\pi\\), tan period \\(\\pi\\).",
          },
          {
            id: "bullet_6",
            text: "**Next session**, limits need trig bounds (hello, Squeeze Theorem). You are ready for \\(\\sin x / x\\) and continuity on periodic graphs.",
          },
        ],
      },
    ],
    media: null,
    notes:
      "Close by naming one moment from each block: Ferris hook, ASTC example, square-root trap, pause cosine problem. Teaser Session 2: the Squeeze Theorem uses \\sin x / x; derivatives of sin and cos come soon after. Thank students for watching, Topic 3 is The Intuitive Concept of a Limit.",
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
 *   - Replaced placeholder function_transform on unit-circle slides with
 *     unit_circle_trig variants: ferris_link, projections, astc, reference_angle,
 *     special_angle.
 *   - Added cosine family to function_transform for symmetry and pause slides.
 *   - s15 converted to visual_lab with full-width ferris_link widget.
 *
 * RICH BLOCKS
 *   - theorem_box, derivation_steps, misconception_compare, pause_and_reveal,
 *     math_table, proof_sketch added across identity and example slides.
 *   - s04 reciprocal: removed visual-plan placeholder; added math_table.
 *
 * SCRIPTED TIMELINES
 *   - Removed bogus h=1.5,k=1 keyframes that animated unrelated parabola shifts.
 *   - s06: sine → tangent; s07: sine → cosine → reflected sine; s08: amplitude,
 *     period, phase, reflection sequence; s14: parent → full cosine transform.
 *
 * PEDAGOGY
 *   - Title/meta: welcome-back framing, ~25 min, limits teaser.
 *   - Objectives: compact roadmap (match Topic 1 style), five clear bullets.
 *   - s16: Key Takeaways with Session 2 handoff (Squeeze Theorem / sin x / x).
 *
 * ESTIMATED DURATION: ~25–28 min
 *
 * v2 → v3 (math_solution_steps alignment, June 2026)
 *   - s09, s10, s11: example_solution → math_solution_steps (flow, merged parts).
 */