// Hand-enhanced, Topic 24: Definite integral definition & net area (Session 05)
// Source material: courses/Calculus/Materials/the_definite_integral.json
// Scope: definition, Riemann limit, net/signed area, properties, symmetry, accumulation.
// FTC and substitution are forward pointers only (Topics 25–26).

export const topicMeta = {
  id: "03_the_definite_integral",
  title: "The Definite Integral",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/the_definite_integral.json",
};

const slidesData = [
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "The Definite Integral",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic 24 • Definite integral & net area • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back to Arian University. Last topic we built Riemann sums, today we take the limit and define the definite integral. You should know antiderivatives and basic limits.",
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
        currentId: "path_topic_24",
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
          { id: "path_topic_19", number: 19, session: "S04 Applications of Derivatives", label: "Optimization Problems", note: "", status: "completed" },
          { id: "path_topic_20", number: 20, session: "S04 Applications of Derivatives", label: "L'Hopital's Rule", note: "", status: "completed" },
          { id: "path_topic_21", number: 21, session: "S04 Applications of Derivatives", label: "Newton's Method and Linear Approximations", note: "", status: "completed" },
          { id: "path_topic_22", number: 22, session: "S05 Integration Foundations", label: "Antiderivatives and Indefinite Integrals", note: "", status: "completed" },
          { id: "path_topic_23", number: 23, session: "S05 Integration Foundations", label: "Approximating Area with Riemann Sums", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_24", number: 24, session: "S05 Integration Foundations", label: "The Definite Integral", note: "This topic", status: "current", expanded: true },
          { id: "path_topic_25", number: 25, session: "S05 Integration Foundations", label: "The Fundamental Theorem of Calculus", note: "Next", status: "next", expanded: true },
          { id: "path_topic_26", number: 26, session: "S05 Integration Foundations", label: "Integration by Substitution", note: "", status: "upcoming" },
        ],
      },
    ],
    bullets: [
      { id: "objective_1", text: "Define the definite integral as the limit of Riemann sums" },
      { id: "objective_2", text: "Interpret the definite integral as net signed area and accumulated change" },
      { id: "objective_3", text: "Apply basic integral properties (additivity, linearity, comparison)" },
      { id: "objective_4", text: "Use even/odd symmetry to simplify integrals on symmetric intervals" },
      { id: "objective_5", text: "Set up accumulation problems as definite integrals of a rate function" },
    ],
    notes:
      "Orient on roadmap: Topic 23 sliced and summed; Topic 24 takes the limit. Callback Riemann sums, left/right/midpoint, Σ notation. Preview Topic 25 FTC as the evaluation shortcut coming next. Do not promise substitution here.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: MOTIVATION + DEFINITION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_from_changing_rates_to_net_change",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "From Changing Rates to Net Change",
    question: "Think of a quantity that changes at a non-constant rate. How would you find the total change?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Water flows into a reservoir at a rate that varies hour by hour. You cannot multiply one rate by the whole day, the rate is not constant. **Add up** every small contribution: that sum is a Riemann sum. Take the limit → **definite integral**.",
        },
      ],
      lead: "Topic 23 sliced the interval; today the slice sum becomes an exact **net change**.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Rate curve → accumulated area",
        caption: "Shaded area under r(t) equals total volume added.",
        params: { a: 0, b: 3, n: 8, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 3, n: 6, method: "midpoint" } },
          { t: 4, params: { a: 0, b: 3, n: 16, method: "midpoint" } },
          { t: 8, params: { a: 0, b: 3, n: 28, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Callback Topic 23: rectangles approximate area under a rate curve. Today we name the exact limit. Reservoir story: area under r(t) = total volume change. Student prompt: name another accumulation situation (distance from velocity, profit from marginal revenue).\n\nStudent prompt: Think of a real-world situation where a quantity changes at a non-constant rate. How would you find the total change?",
  },
  {
    id: "s02_definition_the_definite_integral",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Definition: The Definite Integral",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "$$",
            "\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty} \\sum_{i=1}^n f(x_i^*)\\,\\Delta x",
            "$$",
            "\\(\\Delta x = \\frac{b-a}{n}\\); \\(x_i^*\\) is any sample point in the \\(i\\)th subinterval.",
          ],
          text: "$$\n\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty} \\sum_{i=1}^n f(x_i^*)\\,\\Delta x\n$$\n\\(\\Delta x = \\frac{b-a}{n}\\); \\(x_i^*\\) is any sample point in the \\(i\\)th subinterval.",
        },
      ],
      lead: "∫ is an elongated **S** for sum, the limit of Riemann sums as \\(n\\to\\infty\\).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Riemann sum → definite integral",
        caption: "Increase n: rectangle sum stabilizes.",
        params: { a: 1, b: 3, n: 8, method: "right" },
        scriptedTimeline: [
          { t: 0, params: { a: 1, b: 3, n: 4, method: "right" } },
          { t: 4, params: { a: 1, b: 3, n: 14, method: "right" } },
          { t: 8, params: { a: 1, b: 3, n: 30, method: "right" } },
        ],
      },
    },
    notes:
      "The symbol ∫ is an elongated S for sum. Width Δx, height f(x_i*). As n grows, the sum approaches the exact value. Narrate the widget: start n=4, push to 30, sum converges. Tie back to Topic 23 endpoint choices.",
  },
  {
    id: "s03_warm_up_riemann_sum_computation",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up: Riemann Sum Computation (Pause)",
    question: "Before the final limit, try the sum for n=4 right endpoints. How close to 10?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "Using the **definition**, compute \\(\\int_1^3 (2x+1)\\,dx\\) via a Riemann sum with **right** endpoints.",
        },
        {
          id: "left_solution",
          type: "math_solution_steps",
          problem: "\\int_1^3 (2x+1)\\,dx = \\lim_{n\\to\\infty}\\sum_{i=1}^n f(x_i)\\Delta x",
          steps: [
            { id: "step_1", math: "\\Delta x = \\frac{3-1}{n} = \\frac{2}{n}", gap: "tight", say: "Equal subinterval width." },
            { id: "step_2", math: "x_i = 1 + i\\Delta x = 1 + \\frac{2i}{n}", gap: "tight", say: "Right endpoint of strip i." },
            { id: "step_3", math: "f(x_i) = 2\\left(1+\\frac{2i}{n}\\right)+1 = 3+\\frac{4i}{n}", gap: "tight", say: "Evaluate 2x+1 at right endpoints." },
            { id: "step_4", math: "\\sum_{i=1}^n f(x_i)\\Delta x = \\frac{6}{n}\\sum 1 + \\frac{8}{n^2}\\sum i", gap: "tight", say: "Expand and split the sum." },
            { id: "step_5", math: "= 6 + 4\\cdot\\frac{n+1}{n}", gap: "tight", say: "Use \\(\\sum 1=n\\) and \\(\\sum i=n(n+1)/2\\)." },
            { id: "step_6", math: "10", say: "Limit as n→∞: the 4/n term vanishes." },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Try n=4 right endpoints before revealing the limit.",
          reveal: { text: "n=4 gives sum 9; the limit is **10**, exact net area under 2x+1 on [1,3]." },
        },
      ],
      lead: "Work the algebra once, then trust the limit.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Right-endpoint rectangles on [1, 3]",
        caption: "n=4 → sum 9; increase n toward 10.",
        params: { a: 1, b: 3, n: 4, method: "right" },
        scriptedTimeline: [
          { t: 0, params: { a: 1, b: 3, n: 4, method: "right" } },
          { t: 5, params: { a: 1, b: 3, n: 10, method: "right" } },
          { t: 10, params: { a: 1, b: 3, n: 30, method: "right" } },
        ],
      },
    },
    notes:
      "YouTube pause beat. Walk through steps 1–5 slowly; step_6 is the punchline. Widget confirms n=4 underestimates slightly. Mention Topic 25 will give a faster evaluation route, not today.\n\nStudent prompt: Before looking at the final limit, try computing the sum of the first 4 rectangles using right endpoints. Compare to 10.",
  },
  {
    id: "s04_visualizing_riemann_sums",
    type: "visual_lab",
    hud: "Arian University • Calculus 1",
    title: "Visual Lab: Riemann Sums Converge",
    question: "Set n to 4, then 10, then 30. How does the error change?",
    lead: "Drag n, watch the rectangle sum approach the exact area. This is the limit in the definition.",
    blocks: [
      {
        id: "lab_prompt",
        type: "paragraph",
        text: "With \\(n=4\\) the right-endpoint sum is about **9**; at \\(n=10\\) it is **9.6**; at \\(n=30\\) it is **9.9+**. The exact value is **10**. More rectangles → thinner strips → better fit.",
      },
    ],
    media: {
      id: "lab_riemann_integral",
      kind: "calculus_widget",
      widget: "riemann_integral",
      title: "Convergence lab",
      caption: "Try left, midpoint, and right: all approach the same limit.",
      params: { a: 1, b: 3, n: 4, method: "right" },
      controls: [
        { name: "a", label: "left bound a", min: 0, max: 3, step: 0.05, value: 1 },
        { name: "b", label: "right bound b", min: 1, max: 4, step: 0.05, value: 3 },
        { name: "n", label: "rectangles n", min: 2, max: 40, step: 1, value: 4, digits: 0 },
        { name: "method", label: "sample method", type: "select", value: "right", options: ["left", "midpoint", "right"] },
      ],
      scriptedTimeline: [
        { t: 0, params: { a: 1, b: 3, n: 4, method: "right" } },
        { t: 5, params: { a: 1, b: 3, n: 12, method: "right" } },
        { t: 10, params: { a: 1, b: 3, n: 30, method: "midpoint" } },
      ],
    },
    notes:
      "Full-width lab, let students drive n and method. Name the error shrinking each time. This internalizes Topic 23 → Topic 24 bridge: Σ → ∫.\n\nStudent prompt: Set n to 4, then 10, then 50. How does the error change? Does it get smaller each time?",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: NET AREA. PROPERTIES. GEOMETRY (no FTC)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s05_fundamental_theorem_of_calculus_part_1",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Net Area vs Signed Area",
    question: "A function dips below the x-axis. Do negative strips count as negative area?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "Above the axis: rectangles contribute **positive** area. Below the axis: contributions are **negative**. The definite integral returns **net signed area**, positives minus negatives.",
        },
        {
          id: "left_compare",
          type: "misconception_compare",
          title: "Net vs total",
          pairs: [
            { label: "Net signed area", text: "\\(\\int_a^b f(x)\\,dx\\), cancellations allowed; can be **zero**." },
            { label: "Total geometric area", text: "\\(\\int_a^b |f(x)|\\,dx\\), always \\(\\geq 0\\); no cancellation." },
          ],
        },
      ],
      lead: "∫ counts **signed** strips, not always the total paint needed.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Signed rectangle contributions",
        caption: "Imagine f crossing the axis: below-axis strips subtract.",
        params: { a: 0, b: 3, n: 10, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 3, n: 6, method: "midpoint" } },
          { t: 5, params: { a: 0, b: 3, n: 16, method: "midpoint" } },
          { t: 10, params: { a: 0, b: 3, n: 28, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Key Topic 24 idea: integral ≠ total area unless f keeps one sign. Example sketch: x³−2x on [0,2] has equal above/below parts → net zero. Widget narrate signed strips. Do NOT introduce FTC here, id preserved from material mapping.\n\nStudent prompt: A function dips below the x-axis. Do negative strips count as negative area?",
  },
  {
    id: "s06_fundamental_theorem_of_calculus_part_2",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Properties of Definite Integrals",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_table",
          type: "math_table",
          headers: ["Property", "Formula", "Meaning"],
          rows: [
            ["Additivity", "\\(\\int_a^b f + \\int_b^c f = \\int_a^c f\\)", "Split or join intervals"],
            ["Linearity", "\\(\\int_a^b (cf+g)\\,dx = c\\int_a^b f\\,dx + \\int_a^b g\\,dx\\)", "Constants and sums factor"],
            ["Comparison", "If \\(f(x)\\leq g(x)\\) on \\([a,b]\\), then \\(\\int_a^b f\\,dx \\leq \\int_a^b g\\,dx\\)", "Order of functions preserved"],
            ["Reversal", "\\(\\int_a^b f\\,dx = -\\int_b^a f\\,dx\\)", "Flip bounds → negate"],
            ["Zero width", "\\(\\int_a^a f\\,dx = 0\\)", "No interval → no accumulation"],
          ],
        },
      ],
      lead: "These rules follow from the Riemann-sum definition, no new mystery.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Additivity on subintervals",
        caption: "Sum on [a,b] plus [b,c] matches one integral on [a,c].",
        params: { a: 0, b: 2, n: 8, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 2, n: 6, method: "midpoint" } },
          { t: 5, params: { a: 2, b: 3, n: 6, method: "midpoint" } },
          { t: 10, params: { a: 0, b: 3, n: 14, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Table is the anchor. Narrate additivity with widget timeline: first [0,2], then [2,3], then full [0,3]. Comparison property is intuitive from rectangle heights. Id preserved from material, content re-scoped to properties, not FTC Part 2.",
  },
  {
    id: "s07_standard_example_using_ftc2",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Geometric Area Example (Pause)",
    question: "Sketch a rectangle of height 4 and width 3. What is its area?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_prompt",
          type: "paragraph",
          text: "When \\(f\\) is **constant**, the integral is a rectangle, no antiderivative shortcut needed yet.",
        },
        {
          id: "left_solution",
          type: "math_solution_steps",
          problem: "\\int_0^3 4\\,dx",
          steps: [
            { id: "step_1", math: "f(x)=4", gap: "tight", say: "Constant height on [0,3]." },
            { id: "step_2", math: "\\text{width}=3-0=3", gap: "tight", say: "Interval length is the base." },
            { id: "step_3", math: "\\text{area}=3\\times 4", gap: "tight", say: "Rectangle area = base × height." },
            { id: "step_4", math: "12", say: "Net signed area equals 12 square units." },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Predict the value before step 4 reveals.",
          reveal: { text: "\\(\\int_0^3 4\\,dx = 12\\), pure geometry." },
        },
      ],
      lead: "Constant integrand → rectangle. Topic 25 adds antiderivative evaluation.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Rectangles under a flat top",
        caption: "Equal-height strips: sum = base × height.",
        params: { a: 0, b: 3, n: 6, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 3, n: 4, method: "midpoint" } },
          { t: 5, params: { a: 0, b: 3, n: 12, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Geometric example only, explicitly defer FTC. Triangle variant optional verbal mention. Pause beat on rectangle sketch.\n\nStudent prompt: Sketch the graph of f(x)=4 on [0,3]. Verify the area is 12.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: FORWARD POINTERS (Topics 25–26)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s08_common_mistake_forgetting_to_change_limits_in_substitution",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Coming Next: The Fundamental Theorem of Calculus",
    question: "Why might we want a shortcut instead of Riemann sums every time?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_teaser",
          type: "theorem_box",
          title: "Topic 25 preview",
          text: "If \\(F'(x)=f(x)\\), then \\(\\displaystyle\\int_a^b f(x)\\,dx = F(b)-F(a)\\). Full proof and practice in **The Fundamental Theorem of Calculus**, next topic on the roadmap.",
        },
        {
          id: "left_bullets",
          type: "nested_bullets",
          items: [
            { id: "ptr_1", text: "Part 1: derivative of an accumulation function recovers \\(f\\)." },
            { id: "ptr_2", text: "Part 2: evaluate definite integrals via antiderivatives." },
            { id: "ptr_3", text: "Today you know the **definition**; tomorrow you get the **shortcut**." },
          ],
        },
      ],
      lead: "Riemann sums are honest; FTC makes them practical.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Many rectangles vs one antiderivative",
        caption: "Topic 25 connects area to F(b)−F(a).",
        params: { a: 1, b: 3, n: 20, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 1, b: 3, n: 8, method: "midpoint" } },
          { t: 5, params: { a: 1, b: 3, n: 30, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Forward pointer only, do not teach FTC Part 1/2 here. Motivate: Riemann sums are slow; antiderivatives will evaluate exactly. Id preserved from substitution-mistake slide; content re-scoped per Session 05 arc.\n\nStudent prompt: Why might we want a shortcut instead of Riemann sums every time?",
  },
  {
    id: "s09_tricky_example_substitution_with_limit_change",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Coming Next: Integration by Substitution",
    question: "When you change variables in a definite integral, what must change besides the integrand?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_teaser",
          type: "paragraph",
          text: "**Topic 26** introduces **u-substitution** for definite integrals: choose \\(u=g(x)\\), rewrite \\(du\\), and transform the **limits** to match \\(u\\).",
        },
        {
          id: "left_checklist",
          type: "nested_bullets",
          items: [
            { id: "sub_1", text: "Pick \\(u\\) so \\(du\\) appears in the integrand." },
            { id: "sub_2", text: "Convert \\(x\\)-limits to \\(u\\)-limits, never mix variables." },
            { id: "sub_3", text: "Or keep \\(x\\)-limits and back-substitute after integrating in \\(u\\)." },
          ],
        },
        {
          id: "left_forward",
          type: "paragraph",
          text: "We will work full substitution examples there. For now, remember: a definite integral always tracks **bounds in the same variable** as the differential.",
        },
      ],
      lead: "Substitution is Topic 26, today, just the roadmap flag.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Same area, new variable later",
        caption: "Changing variables will not change the net area: only the bookkeeping.",
        params: { a: 0, b: 2, n: 10, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 2, n: 6, method: "midpoint" } },
          { t: 5, params: { a: 0, b: 2, n: 20, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Brief forward pointer, no worked u-sub example. Name the common trap (keeping x-limits in a u-integral) as something Topic 26 fixes. Id preserved from substitution example slide.\n\nStudent prompt: When you change variables, what must change besides the integrand?",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 4: SYMMETRY. APPLICATION. OPTIONAL. SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s10_symmetry_even_and_odd_functions",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Symmetry: Even and Odd Functions",
    question: "Is sin(x) even or odd? Predict ∫_{−π}^{π} sin(x) dx before computing.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "**Even:** \\(f(-x)=f(x)\\)",
            "$$\\int_{-a}^a f(x)\\,dx = 2\\int_0^a f(x)\\,dx$$",
            "**Odd:** \\(f(-x)=-f(x)\\)",
            "$$\\int_{-a}^a f(x)\\,dx = 0$$",
          ],
          text: "**Even:** \\(f(-x)=f(x)\\)\n$$\\int_{-a}^a f(x)\\,dx = 2\\int_0^a f(x)\\,dx$$\n**Odd:** \\(f(-x)=-f(x)\\)\n$$\\int_{-a}^a f(x)\\,dx = 0$$",
        },
      ],
      lead: "**Even** → double the right half; **odd** → cancellation gives zero.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Symmetric interval strips",
        caption: "Odd functions: left and right contributions cancel.",
        params: { a: 0, b: 2, n: 10, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 2, n: 6, method: "midpoint" } },
          { t: 5, params: { a: 0, b: 2, n: 18, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Keep symmetry rules, major Topic 24 shortcut. sin is odd → integral over [−π,π] is 0. cos is even → double [0,π]. Widget on positive interval for even case narrative.\n\nStudent prompt: Is sin(x) even or odd? What about cos(x)? Use the symmetry rules to predict ∫_{-π}^{π} sin(x) dx.",
  },
  {
    id: "s11_example_even_function_integral",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Example: Even Function Integral",
    question: "Use the odd rule to evaluate ∫_{−3}^{3} x⁵ dx without any computation.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          problem: "\\int_{-2}^2 x^4\\,dx",
          steps: [
            { id: "step_1", math: "f(-x)=(-x)^4=x^4=f(x)", gap: "tight", say: "x⁴ is even." },
            { id: "step_2", math: "=2\\int_0^2 x^4\\,dx", gap: "tight", say: "Double the right half." },
            { id: "step_3", math: "\\text{half-interval area}=\\frac{32}{5}", gap: "tight", say: "Riemann sum or geometry on [0,2] gives 32/5 per half (widget)." },
            { id: "step_4", math: "\\frac{64}{5}", say: "Total net area = 2 × 32/5." },
          ],
        },
      ],
      lead: "\\(\\int_{-2}^2 x^4\\,dx = \\frac{64}{5}\\) using even symmetry.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Equal halves on [−2, 2]",
        caption: "Each half contributes the same signed area.",
        params: { a: 0, b: 2, n: 10, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 2, n: 6, method: "midpoint" } },
          { t: 5, params: { a: 0, b: 2, n: 20, method: "midpoint" } },
        ],
      },
    },
    notes:
      "math_solution_steps on symmetry workflow. Mention x⁵ on [−3,3] is odd → 0 as student prompt answer. Topic 25 will evaluate ∫x⁴ dx faster via FTC.\n\nStudent prompt: Use the odd rule to evaluate ∫_{-3}^{3} x^5 dx without any integration.",
  },
  {
    id: "s12_application_accumulated_water_volume",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application: Accumulated Water Volume",
    question: "If the tank started with 50 gallons, how much is in it after 4 hours?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_setup",
          type: "math_solution_steps",
          problem: "r(t)=10+2\\sin t\\text{ gal/h on }[0,4]",
          steps: [
            { id: "step_1", math: "V=\\int_0^4 r(t)\\,dt", gap: "tight", say: "Total volume added = area under rate curve." },
            { id: "step_2", math: "=\\int_0^4 (10+2\\sin t)\\,dt", gap: "tight", say: "Substitute the rate function." },
            { id: "step_3", math: "\\approx 43.3\\text{ gal}", say: "Riemann sum on the widget approximates; Topic 25 evaluates exactly." },
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "With 50 gal initially: **50 + 43.3 ≈ 93.3 gal** after 4 hours.",
        },
      ],
      lead: "Integral of rate = accumulated change (net volume added).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Area under flow rate ≈ volume",
        caption: "Increase n to refine the accumulation estimate.",
        params: { a: 0, b: 3, n: 12, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 2, n: 8, method: "midpoint" } },
          { t: 5, params: { a: 0, b: 3, n: 16, method: "midpoint" } },
          { t: 10, params: { a: 0, b: 3, n: 28, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Application framing, setup is the learning goal. Use widget Riemann sum as numerical estimate; exact antiderivative evaluation deferred to Topic 25. Tie back to s01 reservoir story.\n\nStudent prompt: If the tank initially had 50 gallons, how much is in the tank after 4 hours? (Hint: initial + accumulated change.)",
  },
  {
    id: "s13_challenge_optional_proof_ftc1_from_the_definition",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Optional] Why Do Riemann Sums Stabilize?",
    question: "As n grows, why should the rectangle sum stop changing much?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_sketch",
          type: "proof_sketch",
          title: "Optional intuition",
          text: "For continuous \\(f\\), thinner Riemann strips make the rectangle sum stabilize.",
          steps: [
            { id: "sk_1", text: "Thinner strips \\(\\Rightarrow\\) sample heights track \\(f\\) more closely on each subinterval." },
            { id: "sk_2", text: "For continuous \\(f\\), the max height error on each strip shrinks as \\(\\Delta x\\to 0\\)." },
            { id: "sk_3", text: "Total error is bounded by (number of strips) × (max strip error) → 0." },
          ],
        },
        {
          id: "left_note",
          type: "paragraph",
          text: "**Skip if short on time.** Topic 25 proves the FTC link between area and antiderivatives.",
        },
      ],
      lead: "Optional challenge, convergence intuition, not a full proof.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        title: "Watch error shrink with n",
        caption: "Drive n up: sum stabilizes.",
        params: { a: 1, b: 3, n: 6, method: "right" },
        scriptedTimeline: [
          { t: 0, params: { a: 1, b: 3, n: 4, method: "right" } },
          { t: 5, params: { a: 1, b: 3, n: 20, method: "right" } },
          { t: 10, params: { a: 1, b: 3, n: 35, method: "right" } },
        ],
      },
    },
    notes:
      "Shortened optional slide, replaced FTC1 proof with Riemann convergence intuition. Mark skippable. Curious students can chase formal analysis later.\n\nStudent prompt: What happens to the approximation error when n becomes very large?",
  },
  {
    id: "s14_summary",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Summary",
    question: "",
    lead: "",
    blocks: [
      {
        id: "on_screen_text",
        type: "paragraph",
        text: "**Key idea:** Definite integral = **limit** of Riemann sums → **net signed area** → properties & symmetry → accumulation.",
      },
      {
        id: "body_paragraph_1",
        type: "paragraph",
        text: "**Key takeaways from this lecture:**",
      },
      {
        id: "body_paragraph_2",
        type: "paragraph",
        text: "**1. Definition:** \\(\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty}\\sum f(x_i^*)\\Delta x\\), Topic 23's sum, taken to the limit.",
      },
      {
        id: "body_paragraph_3",
        type: "paragraph",
        text: "**2. Net area:** Above-axis strips add; below-axis strips subtract. Total geometric area needs \\(|f|\\).",
      },
      {
        id: "body_paragraph_4",
        type: "paragraph",
        text: "**3. Properties:** Additivity, linearity, comparison, reversal, all inherited from sums.",
      },
      {
        id: "body_paragraph_5",
        type: "paragraph",
        text: "**4. Symmetry:** Even → double; odd → zero on symmetric intervals.",
      },
      {
        id: "body_paragraph_6",
        type: "paragraph",
        text: "**5. Applications:** Integral of a rate = accumulated change.",
      },
      {
        id: "body_teaser",
        type: "paragraph",
        text: "**Next up, Topic 25:** The Fundamental Theorem of Calculus connects antiderivatives to definite integrals. Then Topic 26 adds substitution.",
      },
      {
        id: "body_paragraph_8",
        type: "paragraph",
        text: "**Self-check:** Can you define ∫ as a limit? Explain net vs total area? State the even/odd rules?",
      },
    ],
    media: null,
    notes:
      "Recap one beat per bullet. Tease Topic 25 FTC explicitly. Thank students, Session 05 arc continues. No substitution or FTC evaluation promises from this topic.",
  },
];

export default slidesData;

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * COURSE DESIGN CHANGELOG
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * v1 (hand-enhance, June 2026, Topic 24 scope pass)
 *
 * SCOPE
 *   - Material JSON mixed FTC + substitution; re-scoped to definition & net area only.
 *   - s05–s09 restructured: net/signed area, properties table, geometry example,
 *     forward pointers to Topics 25–26 (ids preserved).
 *
 * WIDGETS
 *   - riemann_integral on all teaching slides; s04 → visual_lab convergence lab.
 *   - Removed python_code / sourceSpec bloat from media blocks.
 *   - Scripted timelines vary a, b, n, method per slide beat.
 *
 * RICH BLOCKS
 *   - s03, s07, s11, s12: math_solution_steps (Riemann limit, rectangle, symmetry, accumulation).
 *   - s06: math_table (additivity, linearity, comparison, reversal).
 *   - s05: misconception_compare (net vs total area).
 *   - s08: theorem_box FTC preview; s09: nested_bullets substitution preview.
 *   - s13: shortened proof_sketch (convergence intuition, not FTC1 proof).
 *
 * PEDAGOGY
 *   - Welcome back; callback Topic 23 Riemann sums; roadmap currentId path_topic_24.
 *   - Objectives scoped to definition, net area, properties, symmetry, accumulation.
 *   - s14 summary teases Topic 25 FTC / Topic 26 substitution.
 *
 * ESTIMATED DURATION: ~20–22 min
 */