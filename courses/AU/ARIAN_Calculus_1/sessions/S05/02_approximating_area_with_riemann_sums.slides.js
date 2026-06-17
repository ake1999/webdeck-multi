// Generated from courses/Calculus/Materials/approximating_area_with_riemann_sums.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "02_approximating_area_with_riemann_sums",
  title: "Approximating Area With Riemann Sums",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/approximating_area_with_riemann_sums.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "Approximating Area With Riemann Sums",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic: Left / right / midpoint sums, σ notation, limit definition • Session 5 • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back, Topic 22 gave antiderivatives (∫ f = F + C). Topic 23 asks the forward question: how do we *define* area under a curve before we can integrate? Assumes sigma notation and function evaluation.",
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
        currentId: "path_topic_23",
        items: [
          { id: "path_topic_01", number: 1, session: "S01 Preliminaries", label: "Review of Functions and Graphs", status: "completed" },
          { id: "path_topic_02", number: 2, session: "S01 Preliminaries", label: "Trigonometry and Graphing Review", status: "completed" },
          { id: "path_topic_03", number: 3, session: "S02 Limits and Continuity", label: "The Intuitive Concept of a Limit", status: "completed" },
          { id: "path_topic_04", number: 4, session: "S02 Limits and Continuity", label: "Limit Laws and Algebraic Evaluation", status: "completed" },
          { id: "path_topic_05", number: 5, session: "S02 Limits and Continuity", label: "One-Sided Limits and Limits at Infinity", status: "completed" },
          { id: "path_topic_06", number: 6, session: "S02 Limits and Continuity", label: "The Squeeze Theorem", status: "completed" },
          { id: "path_topic_07", number: 7, session: "S02 Limits and Continuity", label: "Continuity and the Intermediate Value Theorem", status: "completed" },
          { id: "path_topic_08", number: 8, session: "S03 Derivative Foundations", label: "Instantaneous Rate of Change", status: "completed" },
          { id: "path_topic_09", number: 9, session: "S03 Derivative Foundations", label: "Formal Definition of the Derivative", status: "completed" },
          { id: "path_topic_10", number: 10, session: "S03 Derivative Foundations", label: "Power Rule and Basic Properties", status: "completed" },
          { id: "path_topic_11", number: 11, session: "S03 Derivative Foundations", label: "Power, Constant Multiple, Sum, Difference Rules", status: "completed" },
          { id: "path_topic_12", number: 12, session: "S03 Derivative Foundations", label: "The Product Rule for Derivatives", status: "completed" },
          { id: "path_topic_13", number: 13, session: "S03 Derivative Foundations", label: "The Chain Rule", status: "completed" },
          { id: "path_topic_14", number: 14, session: "S03 Derivative Foundations", label: "Implicit Differentiation", status: "completed" },
          { id: "path_topic_15", number: 15, session: "S04 Applications of Derivatives", label: "Related Rates", status: "completed" },
          { id: "path_topic_16", number: 16, session: "S04 Applications of Derivatives", label: "Critical Points and Extrema", status: "completed" },
          { id: "path_topic_17", number: 17, session: "S04 Applications of Derivatives", label: "Rolle's Theorem and the Mean Value Theorem", status: "completed" },
          { id: "path_topic_18", number: 18, session: "S04 Applications of Derivatives", label: "First and Second Derivative Tests", status: "completed" },
          { id: "path_topic_19", number: 19, session: "S04 Applications of Derivatives", label: "Optimization Problems", status: "completed" },
          { id: "path_topic_20", number: 20, session: "S04 Applications of Derivatives", label: "L'Hopital's Rule", status: "completed" },
          { id: "path_topic_21", number: 21, session: "S04 Applications of Derivatives", label: "Newton's Method and Linear Approximations", status: "completed" },
          { id: "path_topic_22", number: 22, session: "S05 Integration Foundations", label: "Antiderivatives and Indefinite Integrals", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_23", number: 23, session: "S05 Integration Foundations", label: "Approximating Area with Riemann Sums", note: "Today", status: "current", expanded: true },
          { id: "path_topic_24", number: 24, session: "S05 Integration Foundations", label: "The Definite Integral", note: "Next", status: "next", expanded: true },
          { id: "path_topic_25", number: 25, session: "S05 Integration Foundations", label: "The Fundamental Theorem of Calculus", status: "upcoming" },
          { id: "path_topic_26", number: 26, session: "S05 Integration Foundations", label: "Integration by Substitution", status: "upcoming" },
        ],
      },
    ],
    bullets: [
      { id: "objective_1", text: "Compute **left**, **right**, and **midpoint** Riemann sums on \\([a,b]\\) with equal subintervals." },
      { id: "objective_2", text: "Write sums in **sigma notation** and track sample-point indices carefully." },
      { id: "objective_3", text: "Explain how \\(n\\) and the sampling method affect approximation error." },
      { id: "objective_4", text: "Interpret \\(\\int_a^b f(x)\\,dx\\) as the **limit** of Riemann sums as \\(n\\to\\infty\\)." },
      { id: "objective_5", text: "Bracket exact area for monotone functions: \\(L_n < \\text{area} < R_n\\) when \\(f\\) is increasing." },
    ],
    notes:
      "Roadmap first: Topic 22 reverse differentiation, Topic 23 slice-and-sum, Topic 24 definite integral next. Callback: antiderivatives answer 'what function has this derivative?', Riemann sums answer 'what is the area?'",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: SLICE. SUM, THREE METHODS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_from_curved_garden_beds_to_area",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "From Curved Garden Beds to Area",
    question: "How do you measure area when the boundary is curved?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Topic 22 reversed differentiation. Now the **forward** problem: a curved garden edge, you cannot measure it with a ruler. **Slice** into thin vertical strips (nearly rectangles), **sum** their areas, let strips get thinner → exact area.",
        },
        {
          id: "left_paragraph_2",
          type: "paragraph",
          text: "This slice-and-sum strategy is the geometric heart of the **definite integral** (Topic 24). Today we approximate; next topic we name the limit.",
        },
      ],
      lead: "Slice → rectangle sum → limit → integral.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_garden",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Four rectangles under an increasing curve",
        caption: "Drag n: more strips hug the curve. Widget uses a sample curve; our worked example is f(x)=x²+1.",
        params: { a: 0, b: 2, n: 4, method: "left" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 2, n: 4, method: "left" } },
          { t: 5, params: { a: 0, b: 2, n: 12, method: "left" } },
          { t: 10, params: { a: 0, b: 2, n: 24, method: "left" } },
        ],
      },
    },
    notes:
      "Landscape architect hook. Point at rectangles: base Δx, height f(x_i^*). Animate n 4→24. Tie back to Topic 22: antiderivatives are the reverse direction.",
  },
  {
    id: "s02_what_is_a_riemann_sum",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "What is a Riemann Sum?",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$S_n = \\sum_{i=1}^{n} f(x_i^*) \\Delta x$$",
            "- \\(n\\): number of subintervals (rectangles)",
            "- \\(\\Delta x = \\dfrac{b-a}{n}\\): equal width",
            "- \\(x_i^*\\): sample point in the \\(i\\)th subinterval",
            "- \\(f(x_i^*)\\): rectangle height",
          ],
        },
      ],
      lead: "A Riemann sum adds rectangle areas: \\(\\sum f(x_i^*)\\Delta x\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_definition",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "One strip: base Δx, height f(x_i^*)",
        caption: "Midpoint sampling: switch method on the next slides.",
        params: { a: 0, b: 2, n: 8, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 2, n: 4, method: "midpoint" } },
          { t: 5, params: { a: 0, b: 2, n: 16, method: "midpoint" } },
          { t: 10, params: { a: 0, b: 2, n: 32, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Formalize the garden picture. Partition [a,b] into n equal pieces. Choice of x_i^* (left, right, midpoint) changes the sum. More rectangles → better approximation.",
  },
  {
    id: "s03_left_endpoint_riemann_sum",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Left Endpoint Riemann Sum",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "f(x)=x^2+1,\\ [0,2],\\ n=4\\ \\text{ (left)}",
          steps: [
            { id: "step_1", math: "L_n=\\sum_{i=1}^{n}f(x_{i-1})\\Delta x", say: "Left endpoint formula, height at the left edge." },
            { id: "step_2", math: "\\Delta x=\\frac{2-0}{4}=0.5", gap: "tight", say: "Equal width on [0,2]." },
            { id: "step_3", math: "x_0,\\ldots,x_3:\\ 0,\\ 0.5,\\ 1,\\ 1.5", gap: "tight", say: "Left sample points (not x_4)." },
            { id: "step_4", math: "f(0)=1,\\ f(0.5)=1.25,\\ f(1)=2,\\ f(1.5)=3.25", gap: "tight", say: "Evaluate heights." },
            { id: "step_5", math: "L_4=0.5(1+1.25+2+3.25)=3.75", say: "For increasing f, left sum underestimates area." },
          ],
        },
      ],
      lead: "L_n uses the **left** edge of each strip as the sample point.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_left",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Left endpoints, n=4",
        caption: "Rectangles touch the curve at left edges: watch the readout.",
        params: { a: 0, b: 2, n: 4, method: "left" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 2, n: 4, method: "left" } },
          { t: 6, params: { a: 0, b: 2, n: 10, method: "left" } },
        ],
      },
    },
    notes:
      "Walk through numeric sum on f(x)=x²+1, [0,2], n=4. L₄=3.75. True area 14/3≈4.667, left is low because f is increasing. Widget: method=left, n=4.",
  },
  {
    id: "s04_right_endpoint_riemann_sum",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Right Endpoint Riemann Sum",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "f(x)=x^2+1,\\ [0,2],\\ n=4\\ \\text{ (right)}",
          steps: [
            { id: "step_1", math: "R_n=\\sum_{i=1}^{n}f(x_i)\\Delta x", say: "Right endpoint formula, height at the right edge." },
            { id: "step_2", math: "\\Delta x=0.5", gap: "tight", say: "Same partition as the left sum." },
            { id: "step_3", math: "x_1,\\ldots,x_4:\\ 0.5,\\ 1,\\ 1.5,\\ 2", gap: "tight", say: "Right sample points." },
            { id: "step_4", math: "f(0.5)=1.25,\\ f(1)=2,\\ f(1.5)=3.25,\\ f(2)=5", gap: "tight", say: "Heights at right edges, taller for increasing f." },
            { id: "step_5", math: "R_4=0.5(1.25+2+3.25+5)=5.75", say: "Compare: L₄=3.75 < 14/3 < R₄=5.75." },
          ],
        },
      ],
      lead: "R_n uses the **right** edge, for increasing f, R_n overestimates.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_right",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Right endpoints, n=4",
        caption: "Taller rectangles → larger sum than left.",
        params: { a: 0, b: 2, n: 4, method: "right" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 2, n: 4, method: "right" } },
          { t: 6, params: { a: 0, b: 2, n: 10, method: "right" } },
        ],
      },
    },
    notes:
      "Same function and n. R₄=5.75 > L₄=3.75. Bracketing property for increasing f: true area lies between. Widget method=right.",
  },
  {
    id: "s05_midpoint_riemann_sum",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Midpoint Riemann Sum",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "f(x)=x^2+1,\\ [0,2],\\ n=4\\ \\text{ (midpoint)}",
          steps: [
            { id: "step_1", math: "M_n=\\sum_{i=1}^{n}f\\!\\left(\\frac{x_{i-1}+x_i}{2}\\right)\\Delta x", say: "Midpoint formula, sample at strip center." },
            { id: "step_2", math: "\\Delta x=0.5", gap: "tight", say: "Same Δx as before." },
            { id: "step_3", math: "\\text{midpoints:}\\ 0.25,\\ 0.75,\\ 1.25,\\ 1.75", gap: "tight", say: "Center of each subinterval." },
            { id: "step_4", math: "f(0.25)=1.0625,\\ldots,f(1.75)=4.0625", gap: "tight", say: "Heights closer to average curve height." },
            { id: "step_5", math: "M_4=0.5(1.0625+1.5625+2.5625+4.0625)=4.625", say: "True area 14/3≈4.667, only 0.042 off!" },
          ],
        },
      ],
      lead: "Midpoint rule often gives the best approximation for the same n.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_mid",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Midpoints, n=4",
        caption: "Heights at strip centers: error shrinks vs left/right.",
        params: { a: 0, b: 2, n: 4, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 2, n: 4, method: "midpoint" } },
          { t: 6, params: { a: 0, b: 2, n: 12, method: "midpoint" } },
        ],
      },
    },
    notes:
      "M₄=4.625 vs exact 14/3. Huge improvement over L₄ and R₄ for same n. Widget method=midpoint.",
  },
  {
    id: "s06_explore_riemann_sums_interactively",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Lab: Explore Riemann Sums",
    question: "Switch examples, when does the sum stabilize?",
    lead: "Three quick setups. Use the sliders on the plot; steps stay short on the left.",
    labSiteNote:
      "On YouTube we preview one example. On the site, try all three tabs and **New example** for extra practice.",
    labExamples: [
      {
        id: "lab_ex_left",
        label: "A · Left",
        formula: "L_4\\text{ on }[0,2]",
        steps: [
          { id: "step_1", text: "Set method = left, n = 4." },
          { id: "step_2", text: "Underestimate for increasing f, sum below exact area." },
          { id: "step_3", text: "Increase n, watch the sum climb toward the limit." },
        ],
        params: { a: 0, b: 2, n: 4, method: "left" },
      },
      {
        id: "lab_ex_mid",
        label: "B · Midpoint",
        formula: "M_{12}\\text{ on }[0,2]",
        steps: [
          { id: "step_1", text: "Switch to midpoint, n = 12." },
          { id: "step_2", text: "Midpoint usually beats left/right at the same n." },
          { id: "step_3", text: "Push n toward 30, error shrinks fast." },
        ],
        params: { a: 0, b: 2, n: 12, method: "midpoint" },
      },
      {
        id: "lab_ex_right",
        label: "C · Right",
        formula: "R_8\\text{ on }[1,3]",
        steps: [
          { id: "step_1", text: "Move interval to [1,3], method = right, n = 8." },
          { id: "step_2", text: "For increasing f, right endpoints overestimate." },
          { id: "step_3", text: "Compare left vs right on the same n mentally." },
        ],
        params: { a: 1, b: 3, n: 8, method: "right" },
      },
    ],
    labGeneratePresets: [
      {
        id: "gen_mid_dense",
        label: "Dense midpoint",
        formula: "M_{24}",
        steps: [{ text: "Midpoint with n = 24, near-limit approximation." }],
        params: { a: 0, b: 2, n: 24, method: "midpoint" },
      },
      {
        id: "gen_wide",
        label: "Wide interval",
        formula: "[0,3]",
        steps: [{ text: "Wider base, same recipe, new area scale." }],
        params: { a: 0, b: 3, n: 10, method: "midpoint" },
      },
      {
        id: "gen_coarse",
        label: "Coarse left",
        formula: "L_3",
        steps: [{ text: "Only 3 strips, see a rough underestimate." }],
        params: { a: 0, b: 2, n: 3, method: "left" },
      },
    ],
    labGenerateMode: "cycle",
    media: {
      id: "lab_riemann_explore",
      kind: "calculus_widget",
      widget: "riemann_integral",
      title: "Riemann sum explorer",
      caption: "Plot + sliders: left column = short steps only.",
      params: { a: 0, b: 2, n: 4, method: "left" },
      scriptedTimeline: [
        { t: 0, params: { a: 0, b: 2, n: 4, method: "left" } },
        { t: 6, params: { a: 0, b: 2, n: 16, method: "midpoint" } },
      ],
    },
    notes:
      "Site lab: mention three tabs briefly on video, demo Example A only. Students practice B/C and New example on site. Left = steps; right = big plot.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: PREDICTION. LIMIT DEFINITION. OPTIONAL CHALLENGE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s07_pause_which_sum_is_larger",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Pause: Which Sum is Larger?",
    question: "For f(x)=x² on [1,3] with n=4, is L₄ or R₄ larger?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "f(x)=x² is **increasing** on [1,3]. Each right endpoint is higher than the matching left endpoint on the same strip.",
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Left or right, write your guess before continuing.",
          reveal: { text: "Think monotonicity: for increasing f, right heights beat left heights on every strip." },
        },
      ],
      lead: "Increasing function + partition → compare endpoint heights.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_pause",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "f(x)=x² on [1,3], n=4",
        caption: "Four strips on an increasing curve: predict before the next slide.",
        params: { a: 1, b: 3, n: 4, method: "left" },
        scriptedTimeline: [
          { t: 0, params: { a: 1, b: 3, n: 4, method: "left" } },
        ],
      },
    },
    notes:
      "YouTube pause, 15 seconds. Do not reveal the numeric answer here. Widget shows left sum on [1,3] as a hint picture only. Student prompt on screen.",
  },
  {
    id: "s08_answer_right_sum_is_larger",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Answer: Right Sum is Larger",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "f(x)=x^2,\\ [1,3],\\ n=4",
          steps: [
            { id: "step_1", math: "\\Delta x=0.5", say: "Width on [1,3] with n=4." },
            { id: "step_2", math: "L_4\\approx 5.875", gap: "tight", say: "Left points 1, 1.5, 2, 2.5, underestimate." },
            { id: "step_3", math: "R_4\\approx 10.875", gap: "tight", say: "Right points 1.5, 2, 2.5, 3, overestimate." },
            { id: "step_4", math: "R_4>L_4;\\ \\text{true area}=\\frac{26}{3}\\approx 8.667", say: "Bracket: L₄ < area < R₄ for increasing f." },
          ],
        },
      ],
      lead: "**Right** sum wins, increasing f makes right endpoints taller.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_answer",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Left vs right on [1,3]",
        caption: "Timeline: left panels → right panels, watch the sum jump.",
        params: { a: 1, b: 3, n: 4, method: "left" },
        scriptedTimeline: [
          { t: 0, params: { a: 1, b: 3, n: 4, method: "left" } },
          { t: 5, params: { a: 1, b: 3, n: 4, method: "right" } },
        ],
      },
    },
    notes:
      "Reveal: R₄ > L₄. True area 26/3 between them. Bracketing is useful for error bounds. Widget flips left→right.",
  },
  {
    id: "s09_definite_integral_as_a_limit",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Definite Integral as a Limit",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*) \\Delta x$$",
            "**Key idea:** Exact area = limit of Riemann sums as \\(n\\to\\infty\\) (equivalently \\(\\Delta x\\to 0\\)).",
            "**Remark:** For continuous \\(f\\) on \\([a,b]\\), the limit exists and is **independent** of left / right / midpoint choice.",
          ],
        },
      ],
      lead: "The definite integral **is** the limit of Riemann sums, Topic 24 makes this precise.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_limit",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "n → many rectangles",
        caption: "Watch the sum readout stabilize as n grows.",
        params: { a: 0, b: 2, n: 8, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 2, n: 4, method: "midpoint" } },
          { t: 4, params: { a: 0, b: 2, n: 16, method: "midpoint" } },
          { t: 8, params: { a: 0, b: 2, n: 32, method: "midpoint" } },
          { t: 12, params: { a: 0, b: 2, n: 40, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Limit definition, bridge to Topic 24. Continuous f ⇒ limit exists, sample-point independent. Widget n 4→40. Callback to limits from Session 2: Σ → ∫.",
  },
  {
    id: "s10_challenge_optional_evaluating_the_limit_for_x2",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Optional Challenge: Limit of Rₙ for x²",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "optional_note",
          type: "paragraph",
          text: "**Optional / skip if short on time.** Shows the limit definition in full algebra for \\(\\int_1^3 x^2\\,dx\\).",
        },
        {
          id: "challenge_steps",
          type: "math_solution_steps",
          stepLayout: "flow",
          splitAfter: 2,
          problem: "R_n=\\sum_{i=1}^n\\left(1+\\frac{2i}{n}\\right)^2\\cdot\\frac{2}{n}",
          steps: [
            { id: "c1", math: "\\Delta x=\\frac{2}{n},\\ x_i=1+\\frac{2i}{n}", say: "Right endpoints on [1,3]." },
            { id: "c2", math: "R_n=\\frac{2}{n}\\sum_{i=1}^n\\left(1+\\frac{4i}{n}+\\frac{4i^2}{n^2}\\right)", say: "Expand the square inside the sum." },
            { id: "c3", math: "\\lim_{n\\to\\infty}R_n=2+4+\\frac{8}{3}=\\frac{26}{3}", say: "Σi and Σi² formulas → matches antiderivative check." },
          ],
        },
      ],
      lead: "Extra practice: right sums → limit = 26/3.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_challenge",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Right sums approaching the limit",
        caption: "Optional visual: main lesson does not require this algebra.",
        params: { a: 1, b: 3, n: 6, method: "right" },
        scriptedTimeline: [
          { t: 0, params: { a: 1, b: 3, n: 4, method: "right" } },
          { t: 6, params: { a: 1, b: 3, n: 20, method: "right" } },
        ],
      },
    },
    notes:
      "Skippable challenge. Three-step sketch instead of 8-row table. Full Σi, Σi² expansion can be homework. Result 26/3 matches FTC later.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: WORKED EXAMPLES + PITFALLS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s11_example_1_warm_up_square_root",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 1: Warm-Up, Square Root",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "\\int_0^4\\sqrt{x}\\,dx\\ \\text{approx with }R_4",
          steps: [
            { id: "step_1", math: "\\Delta x=\\frac{4-0}{4}=1", say: "Four equal strips on [0,4]." },
            { id: "step_2", math: "\\text{right endpoints: }1,\\ 2,\\ 3,\\ 4", gap: "tight", say: "Sample at right edges." },
            { id: "step_3", math: "\\sqrt{1},\\ \\sqrt{2}\\approx 1.414,\\ \\sqrt{3}\\approx 1.732,\\ 2", gap: "tight", say: "Heights grow, concave down but still increasing here." },
            { id: "step_4", math: "R_4\\approx 1+1.414+1.732+2=6.146", say: "Straightforward numeric sum." },
          ],
        },
      ],
      lead: "Warm-up: right endpoints on √x, build calculator confidence.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_sqrt",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Right sum on a growing curve",
        caption: "Widget curve differs from √x: focus on the rectangle recipe.",
        params: { a: 0, b: 4, n: 4, method: "right" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 4, n: 4, method: "right" } },
        ],
      },
    },
    notes:
      "R₄≈6.146 for ∫₀⁴√x dx. Short warm-up before sigma notation example.",
  },
  {
    id: "s12_example_2_standard_ln_x_in_sigma",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 2: Standard, ln x in Sigma",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "L_6\\text{ for }\\int_1^4\\ln x\\,dx",
          steps: [
            { id: "step_1", math: "\\Delta x=\\frac{4-1}{6}=0.5", say: "Six equal subintervals." },
            { id: "step_2", math: "x_i=1+0.5i,\\ i=0,1,\\ldots,5", gap: "tight", say: "Left endpoints, stop at i=5, not i=6." },
            { id: "step_3", math: "L_6=0.5\\sum_{i=0}^{5}\\ln(1+0.5i)", say: "Sigma form of the left sum." },
          ],
        },
      ],
      lead: "Write the left sum in σ, index range is the trap.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_formula",
          type: "formula_block",
          formulas: [
            "$$L_6 = \\sum_{i=0}^{5} \\ln(1+0.5i)\\cdot 0.5$$",
            "Equivalent: \\(L_6 = 0.5\\displaystyle\\sum_{i=0}^{5}\\ln(1+0.5i)\\)",
          ],
        },
      ],
      media: null,
    },
    notes:
      "Standard sigma exercise. i=0..5 for left, not 1..6. i=6 would be a right endpoint.",
  },
  {
    id: "s13_example_3_tricky_sin_x_and_concavity",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 3: Tricky, sin x and Concavity",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "R_4\\text{ for }f(x)=\\sin x\\text{ on }[0,\\pi]",
          steps: [
            { id: "step_1", math: "\\Delta x=\\frac{\\pi}{4}", say: "Four strips on one hump." },
            { id: "step_2", math: "\\text{right points: }\\frac{\\pi}{4},\\ \\frac{\\pi}{2},\\ \\frac{3\\pi}{4},\\ \\pi", gap: "tight", say: "Right endpoints, last height is 0." },
            { id: "step_3", math: "R_4\\approx 1.896", gap: "tight", say: "Numeric sum, **less** than true area 2." },
            { id: "step_4", math: "\\text{concave down} \\Rightarrow\\text{ curve above chords}", say: "Right sum need not overestimate, monotonicity rule fails." },
          ],
        },
      ],
      lead: "Tricky: right sum **underestimates** here, concavity beats monotonicity.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_note",
          type: "paragraph",
          text: "sin x on [0,π] rises then falls and is **concave down**. Do not assume 'right = overestimate' without checking shape.",
        },
      ],
      media: null,
    },
    notes:
      "Challenges 'right always overestimates' myth. R₄≈1.896 < 2. Concavity + decreasing tail on second half.",
  },
  {
    id: "s14_example_4_edge_case_constant_function",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example 4: Edge Case, Constant Function",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_steps",
          type: "math_solution_steps",
          stepLayout: "stack",
          problem: "\\int_2^5 7\\,dx\\ \\text{with }M_3",
          steps: [
            { id: "step_1", math: "\\Delta x=\\frac{5-2}{3}=1", say: "Three unit-width strips." },
            { id: "step_2", math: "\\text{midpoints: }2.5,\\ 3.5,\\ 4.5", gap: "tight", say: "Midpoint rule." },
            { id: "step_3", math: "f(x)=7\\Rightarrow M_3=1(7+7+7)=21", gap: "tight", say: "Every height is 7." },
            { id: "step_4", math: "7(5-2)=21", say: "Exact, any Riemann sum is exact for constant f." },
          ],
        },
      ],
      lead: "Edge case: flat f → every sampling method hits the exact area.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_insight",
          type: "paragraph",
          text: "Approximation error comes from **variation** in f. No variation → no error, even at small n.",
        },
      ],
      media: null,
    },
    notes:
      "M₃=21 exactly. Left/right/midpoint all agree on constants. Error is about non-constant behavior.",
  },
  {
    id: "s15_common_mistake_index_confusion",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Common Mistake: Index Confusion",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Left sum index trap",
          pairs: [
            {
              label: "❌ Tempting mistake",
              text: "Label it 'left sum' but write \\(\\displaystyle\\sum_{i=1}^{4} f(x_i)\\Delta x\\) with \\(x_i=0.5i\\) on [0,2].",
            },
            {
              label: "✅ Correct reasoning",
              text: "That sum uses **right** endpoints. Left: \\(\\sum_{i=0}^{3} f(x_i)\\Delta x\\) or \\(\\sum_{i=1}^{4} f(x_{i-1})\\Delta x\\).",
            },
          ],
        },
        {
          id: "left_reminder",
          type: "paragraph",
          text: "**Cheat sheet:** Left → \\(i=0\\ldots n-1\\) or \\(x_{i-1}\\); Right → \\(i=1\\ldots n\\) or \\(x_i\\).",
        },
      ],
      lead: "One index slip swaps left for right, always match words to sample points.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_index",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Left vs wrong-index 'left'",
        caption: "Timeline: correct left → would-be right mislabeled as left.",
        params: { a: 0, b: 2, n: 4, method: "left" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 2, n: 4, method: "left" } },
          { t: 6, params: { a: 0, b: 2, n: 4, method: "right" } },
        ],
      },
    },
    notes:
      "misconception_compare with concrete formulas. Widget flips left→right to show visual difference. Very common exam mistake.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s16_summary_what_you_ve_learned",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Summary: What You've Learned",
    question: "",
    lead: "Riemann sums → limit → definite integral (Topic 24):",
    blocks: [
      {
        id: "body_bullets",
        type: "nested_bullets",
        items: [
          { id: "bullet_1", text: "**Recipe:** partition \\([a,b]\\), pick sample points, sum \\(f(x_i^*)\\Delta x\\)." },
          { id: "bullet_2", text: "**Three rules:** left \\(x_{i-1}\\), right \\(x_i\\), midpoint \\(\\frac{x_{i-1}+x_i}{2}\\)." },
          { id: "bullet_3", text: "**Increasing f:** \\(L_n < \\text{area} < R_n\\), bracket the truth." },
          { id: "bullet_4", text: "**Limit:** \\(\\int_a^b f = \\lim_{n\\to\\infty}\\sum f(x_i^*)\\Delta x\\) for nice \\(f\\)." },
          { id: "bullet_5", text: "**Indices:** left uses \\(i=0\\ldots n-1\\); right uses \\(i=1\\ldots n\\)." },
          { id: "bullet_6", text: "**Next topic, The Definite Integral (Topic 24):** net area, signed regions, and making \\(\\int_a^b f(x)\\,dx\\) a number you can compute." },
        ],
      },
      {
        id: "final_check",
        type: "pause_and_reveal",
        title: "Final check",
        prompt: "f increasing on [a,b], same n: which is largest, Lₙ, Mₙ, or Rₙ?",
        reveal: { text: "**Rₙ** is largest; **Lₙ** is smallest; **Mₙ** is usually closest to the true area." },
      },
    ],
    media: null,
    notes:
      "Six bullets + final pause. Tease Topic 24 definite integral and net area. Thank students, FTC (Topic 25) will connect back to Topic 22 antiderivatives.",
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
 *   - riemann_integral on s01–s09, s10, s11, s15; s06 → visual_lab with full-width
 *     explorer. Vary n, method (left/right/midpoint), a, b per slide.
 *   - Removed function_transform / function_analysis placeholders and visual_plan
 *     stubs where a widget now carries the lesson.
 *
 * RICH BLOCKS
 *   - math_solution_steps (stack/flow) on s03–s05, s08, s10–s14 numeric examples.
 *   - misconception_compare on s15 (concrete index formulas).
 *   - pause_and_reveal pair s07–s08; final check on s16.
 *   - formula_block on s02, s09, s12 right column.
 *
 * PEDAGOGY
 *   - Welcome-back + Topic 22 antiderivative callback; roadmap currentId path_topic_23.
 *   - Canonical example f(x)=x²+1 on [0,2], n=4 throughout Block 1.
 *   - s10 optional challenge trimmed to 3-step sketch; slide id preserved.
 *   - s16 teases Topic 24 (Definite Integral).
 *
 * ESTIMATED DURATION: ~18–22 min (optional s10 skippable)
 */