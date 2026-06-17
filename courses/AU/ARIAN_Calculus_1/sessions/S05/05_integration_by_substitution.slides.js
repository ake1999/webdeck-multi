// Generated from courses/Calculus/Materials/integration_by_substitution.json
// Enhanced by course design review: see changelog at bottom of file.
// Re-run `node scripts/convert_calculus_material.mjs ...` after editing the source material.

export const topicMeta = {
  id: "05_integration_by_substitution",
  title: "Integration by Substitution",
  hudDefault: "Arian University • Calculus 1",
  hudPrefix: "Arian • ",
  email: "",
  sourceMaterial: "courses/Calculus/Materials/integration_by_substitution.json",
};

const slidesData = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TITLE + OBJECTIVES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic_title",
    type: "title",
    hud: "Arian University • Calculus 1",
    title: "Integration by Substitution",
    subtitle: "Arian University • Calculus 1",
    meta: "Topic 26: final Calc 1 topic • Chain rule in reverse • ~20 min • first-year university / advanced high school",
    notes:
      "Welcome back, Topic 26 closes Calculus 1. FTC Part 2 (Topic 25) gave us F(b)−F(a); today we reverse the chain rule from Topic 13 to integrate composites. Do not re-introduce Arian from scratch.",
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
        currentId: "path_topic_26",
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
          { id: "path_topic_18", number: 18, session: "S04 Applications of Derivatives", label: "First and Second Derivative Tests", status: "completed" },
          { id: "path_topic_19", number: 19, session: "S04 Applications of Derivatives", label: "Optimization Problems", status: "completed" },
          { id: "path_topic_20", number: 20, session: "S04 Applications of Derivatives", label: "L'Hopital's Rule", status: "completed" },
          { id: "path_topic_21", number: 21, session: "S04 Applications of Derivatives", label: "Newton's Method and Linear Approximations", status: "completed" },
          { id: "path_topic_22", number: 22, session: "S05 Integration Foundations", label: "Antiderivatives and Indefinite Integrals", status: "completed" },
          { id: "path_topic_23", number: 23, session: "S05 Integration Foundations", label: "Approximating Area with Riemann Sums", status: "completed" },
          { id: "path_topic_24", number: 24, session: "S05 Integration Foundations", label: "The Definite Integral", status: "completed" },
          { id: "path_topic_25", number: 25, session: "S05 Integration Foundations", label: "The Fundamental Theorem of Calculus", note: "Previous", status: "completed", expanded: true },
          { id: "path_topic_26", number: 26, session: "S05 Integration Foundations", label: "Integration by Substitution", note: "Final topic", status: "current", expanded: true },
        ],
      },
    ],
    bullets: [
      { id: "objective_1", text: "Identify when an integral is suitable for substitution" },
      { id: "objective_2", text: "Apply the substitution method step-by-step" },
      { id: "objective_3", text: "Execute the complete process: choose u, find du, rewrite, integrate, back-substitute" },
      { id: "objective_4", text: "Evaluate integrals requiring creative substitutions" },
    ],
    notes:
      "Roadmap first: Topics 1–25 done; Topic 26 is the **final** Calculus 1 topic. Callback FTC Part 2 and chain rule (Topic 13). Four objectives map to rule → algorithm → examples → definite integrals.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 1: INTUITION + RULES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s01_why_substitution",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Why Substitution?",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_paragraph_1",
          type: "paragraph",
          text: "**Metaphor: The Language Translator**",
        },
        {
          id: "left_bullets_2",
          type: "nested_bullets",
          items: [
            { id: "left_bullet_1", text: "French recipe → English translation → cook → translate back" },
            { id: "left_bullet_2", text: "Complicated integral → simpler **u**-language → integrate → back-substitute to **x**" },
          ],
        },
      ],
      lead: "Substitution translates a hard integral into an easier one, then translates the answer back.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_col_foreign",
          type: "paragraph",
          text: "**Foreign language**, \\(\\int f(g(x))\\,g'(x)\\,dx\\)",
        },
        {
          id: "right_col_translate",
          type: "paragraph",
          text: "**Translation**, \\(u=g(x)\\), \\(du=g'(x)\\,dx\\) → \\(\\int f(u)\\,du\\)",
        },
        {
          id: "right_col_back",
          type: "paragraph",
          text: "**Back translation**, \\(F(u)+C \\Rightarrow F(g(x))+C\\)",
        },
        {
          id: "right_col_note",
          type: "nested_bullets",
          items: [
            { id: "r1", text: "Every **x** must disappear after substitution" },
            { id: "r2", text: "If **x** remains → try a different **u**" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Recipe metaphor. Three-column flow on the right replaces a static diagram. Core idea: temporary variable u simplifies the integral; back-substitution returns to x.",
  },
  {
    id: "s02_chain_rule_in_reverse",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Chain Rule in Reverse",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "**Chain Rule (Differentiation), Topic 13:**",
            "$$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$",
            "**Reverse (Integration):**",
            "$$\\int f'(g(x)) \\cdot g'(x) \\, dx = f(g(x)) + C$$",
          ],
        },
      ],
      lead: "Substitution undoes the chain rule: if the integrand is f'(g(x))·g'(x), set u = g(x).",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_chain_forward",
          type: "nested_bullets",
          items: [
            { id: "f1", text: "**Forward (Topic 13):** differentiate a composition → outer' × inner'" },
            { id: "f2", text: "**Backward (today):** spot outer' × inner' inside an integral → undo" },
            { id: "f3", text: "Let \\(u = g(x)\\) (inner function)" },
            { id: "f4", text: "Then \\(du = g'(x)\\,dx\\) and \\(\\int f'(u)\\,du = f(u)+C\\)" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Callback Topic 13 chain rule explicitly. If integrand has derivative-of-composition structure, u-sub is the reverse move. Foundation for every example today.",
  },
  {
    id: "s03_the_substitution_rule",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Substitution Rule",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "**Indefinite Integral:**",
            "$$\\int f(g(x)) \\cdot g'(x) \\, dx = \\int f(u) \\, du$$",
            "where \\(u = g(x)\\), \\(du = g'(x) \\, dx\\).",
          ],
        },
      ],
      lead: "Rewrite the entire integral in u and du, all x must disappear.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_substitution_map",
          type: "nested_bullets",
          items: [
            { id: "s1", text: "**Choose** \\(u = g(x)\\), usually the \"inside\" of a composite" },
            { id: "s2", text: "**Differentiate** to get \\(du = g'(x)\\,dx\\)" },
            { id: "s3", text: "**Replace** every \\(g(x)\\) with \\(u\\) and every \\(g'(x)\\,dx\\) with \\(du\\)" },
            { id: "s4", text: "**Integrate** in \\(u\\), then **back-substitute**" },
          ],
        },
        {
          id: "right_warning",
          type: "paragraph",
          text: "*Wrong u?* Any leftover **x** means start over with a new choice.",
        },
      ],
      media: null,
    },
    notes:
      "Formal rule. Emphasize: every part of the integrand must convert to u. Wrong u choice is the #1 beginner error, leftover x is the signal.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 2: ALGORITHM + EXAMPLES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s04_warm_up_example",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Warm-Up Example",
    question: "What is the derivative of (x³+1)⁵/5?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          problem: "\\int 3x^2 (x^3 + 1)^4 \\, dx",
          steps: [
            { id: "step_1", op: "=>", math: "u = x^3 + 1", gap: "tight", say: "Choose u as the inside function." },
            { id: "step_2", math: "du = 3x^2\\,dx", gap: "tight", say: "Differentiate u, matches the integrand exactly." },
            { id: "step_3", math: "\\int u^4 \\, du", gap: "tight", say: "Rewrite entirely in u." },
            { id: "step_4", math: "\\frac{1}{5}u^5 + C", gap: "tight", say: "Power rule in u." },
            { id: "step_5", math: "\\frac{1}{5}(x^3+1)^5 + C", say: "Back-substitute u = x³+1." },
          ],
        },
      ],
      lead: "Classic pattern: inner function + its derivative in the integrand.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_check",
          type: "nested_bullets",
          items: [
            { id: "c1", text: "Spot: \\((x^3+1)^4\\) is outer; \\(3x^2\\,dx\\) is \\(du\\)" },
            { id: "c2", text: "**Check:** differentiate \\(\\frac{1}{5}(x^3+1)^5\\) → \\(3x^2(x^3+1)^4\\) ✓" },
          ],
        },
        {
          id: "right_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "Differentiate \\(\\frac{1}{5}(x^3+1)^5\\), does it match the integrand?",
          reveal: { text: "Yes, chain rule gives \\(3x^2(x^3+1)^4\\), exactly our integrand." },
        },
      ],
      media: null,
    },
    notes:
      "Direct hit: du matches exactly. Pause slide asks students to verify by differentiation. This is the template for \"easy\" u-sub.",
  },
  {
    id: "s05_the_substitution_algorithm",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "The Substitution Algorithm",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_checklist",
          type: "nested_bullets",
          items: [
            { id: "alg_1", text: "**1. Choose** \\(u = g(x)\\), the \"inner\" function" },
            { id: "alg_2", text: "**2. Find** \\(du = g'(x)\\,dx\\)" },
            { id: "alg_3", text: "**3. Rewrite** the integral in \\(u\\) and \\(du\\)" },
            { id: "alg_4", text: "**4. Integrate** with respect to \\(u\\)" },
            { id: "alg_5", text: "**5. Back-substitute** \\(u = g(x)\\)" },
          ],
        },
      ],
      lead: "Five steps: choose u, find du, rewrite, integrate, back-substitute.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_guardrail",
          type: "nested_bullets",
          items: [
            { id: "g1", text: "After Step 3: **no x left?** → proceed" },
            { id: "g2", text: "**x still there?** → pick a different \\(u\\)" },
            { id: "g3", text: "**Constant factor off?** → solve for \\(dx\\) (next slide)" },
            { id: "g4", text: "Works for most substitution problems on exams" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Solidify the five-step checklist. Guardrails on the right: leftover x and constant-factor traps. Algorithm is the workflow for s06–s12.",
  },
  {
    id: "s06_standard_example",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Standard Example (Medium)",
    question: "Try setting u = √(2x+1) and verify the result.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\int \\sqrt{2x+1} \\, dx",
          steps: [
            { id: "step_1", op: "=>", math: "u = 2x+1", gap: "tight", say: "Choose u inside the radical." },
            { id: "step_2", math: "du = 2\\,dx \\Rightarrow dx = \\frac{du}{2}", gap: "tight", say: "Solve for dx, constant factor appears." },
            { id: "step_3", math: "\\frac{1}{2}\\int u^{1/2}\\,du", gap: "tight", say: "Substitute and pull out 1/2." },
            { id: "step_4", math: "\\frac{1}{3}u^{3/2} + C", gap: "tight", say: "Power rule on u^{1/2}." },
            { id: "step_5", math: "\\frac{1}{3}(2x+1)^{3/2} + C", say: "Back-substitute u = 2x+1." },
          ],
        },
      ],
      lead: "Radical inside? Let u be the expression under the root.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_alt",
          type: "nested_bullets",
          items: [
            { id: "a1", text: "Alternative: \\(u = \\sqrt{2x+1}\\) also works" },
            { id: "a2", text: "Same answer, shows flexibility in choosing **u**" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Classic exam problem. du = 2 dx forces dx = du/2. Student prompt: try u = √(2x+1) as alternate path.",
  },
  {
    id: "s07_common_mistake_forgetting_the_constant_factor",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Common Mistake: Forgetting the Constant Factor (Pause)",
    question: "What would the correct final answer be?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_misconception",
          type: "misconception_compare",
          title: "Missing the 1/2 factor",
          pairs: [
            {
              label: "❌ Wrong",
              text: "\\(u = x^2\\), \\(du = 2x\\,dx\\) → write \\(\\int \\cos u\\,du = \\sin u + C\\), **forgot** \\(x\\,dx = \\frac{1}{2}du\\)",
            },
            {
              label: "✅ Correct",
              text: "\\(\\frac{1}{2}\\int \\cos u\\,du = \\frac{1}{2}\\sin u + C = \\frac{1}{2}\\sin(x^2) + C\\)",
            },
          ],
        },
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and predict",
          prompt: "\\(\\int x\\cos(x^2)\\,dx\\), what is the correct final answer?",
          reveal: { text: "\\(\\frac{1}{2}\\sin(x^2) + C\\), always solve for the piece that matches \\(dx\\)." },
        },
      ],
      lead: "When du differs from the integrand by a constant factor, adjust before integrating.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_reminder",
          type: "nested_bullets",
          items: [
            { id: "m1", text: "\\(du = 2x\\,dx\\) but integrand has only \\(x\\,dx\\)" },
            { id: "m2", text: "Solve: \\(x\\,dx = \\frac{1}{2}du\\)" },
            { id: "m3", text: "Double-check **every** substitution for constant factors" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Very common mistake, #1 u-sub trap after wrong-u. misconception_compare shows wrong vs correct side by side. Pause reveals ½ sin(x²)+C.",
  },
  {
    id: "s08_tricky_example_signs_and_constants",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Tricky Example: Signs and Constants (Medium)",
    question: "What would the answer be if you forgot the negative sign?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "body_solution",
          type: "math_solution_steps",
          problem: "\\int \\frac{x}{\\sqrt{1-4x^2}} \\, dx",
          steps: [
            { id: "step_1", op: "=>", math: "u = 1-4x^2", gap: "tight", say: "u is inside the square root." },
            { id: "step_2", math: "du = -8x\\,dx \\Rightarrow x\\,dx = -\\frac{1}{8}du", gap: "tight", say: "Negative derivative, track the sign." },
            { id: "step_3", math: "-\\frac{1}{8}\\int u^{-1/2}\\,du", gap: "tight", say: "Substitute with both sign and factor." },
            { id: "step_4", math: "-\\frac{1}{4}\\sqrt{u} + C", gap: "tight", say: "Integrate u^{-1/2}." },
            { id: "step_5", math: "-\\frac{1}{4}\\sqrt{1-4x^2} + C", say: "Back-substitute, negative sign survives." },
          ],
        },
      ],
      lead: "Derivative of 1−4x² is −8x, signs and constants both matter.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_trap",
          type: "nested_bullets",
          items: [
            { id: "t1", text: "Trap: treating \\(du\\) as \\(+8x\\,dx\\)" },
            { id: "t2", text: "Wrong sign → wrong answer (missing minus)" },
            { id: "t3", text: "Always differentiate \\(u\\) carefully before substituting" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Signs + constants together. Student prompt: what if you forgot the negative? Answer would be +¼√(1−4x²)+C, wrong.",
  },
  {
    id: "s09_edge_case_no_obvious_composite",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Edge Case: No Obvious Composite (Medium)",
    question: "Try integrating ∫ e^x / x dx. Does substitution work?",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_solution",
          type: "math_solution_steps",
          problem: "\\int \\frac{\\ln x}{x} \\, dx",
          steps: [
            { id: "step_1", op: "=>", math: "u = \\ln x", gap: "tight", say: "ln x and 1/x appear as a function–derivative pair." },
            { id: "step_2", math: "du = \\frac{1}{x}\\,dx", gap: "tight", say: "Derivative of ln x is 1/x, perfect match." },
            { id: "step_3", math: "\\int u \\, du", gap: "tight", say: "Rewrite in u." },
            { id: "step_4", math: "\\frac{1}{2}(\\ln x)^2 + C", say: "Integrate and back-substitute." },
          ],
        },
      ],
      lead: "No nested composite, but ln x and 1/x form a pair.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_pattern",
          type: "nested_bullets",
          items: [
            { id: "p1", text: "Look for **function + its derivative** in the integrand" },
            { id: "p2", text: "Not only \\(f(g(x))\\cdot g'(x)\\) composites" },
            { id: "p3", text: "\\(\\int e^x/x\\,dx\\), **no** elementary u-sub (preview Calc 2)" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Flexible pattern recognition. ∫ e^x/x dx does NOT yield to elementary substitution, good contrast. Student prompt on e^x/x.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK 3: DEFINITE INTEGRALS + FINALE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "s10_definite_integrals_and_substitution",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Definite Integrals and Substitution",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_formula",
          type: "formula_block",
          formulas: [
            "**Definite Integral Rule:**",
            "$$\\int_a^b f(g(x)) \\cdot g'(x) \\, dx = \\int_{g(a)}^{g(b)} f(u) \\, du$$",
            "**Method A:** Change limits to \\(u\\), integrate, evaluate, done.",
            "**Method B:** Keep \\(x\\) limits, back-substitute, then evaluate.",
            "*Never mix methods!*",
          ],
        },
      ],
      lead: "Change limits to u (recommended) or back-substitute, never mix.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_definite_solution",
          type: "math_solution_steps",
          problem: "\\int_0^1 4x e^{x^2} \\, dx",
          steps: [
            { id: "step_1", op: "=>", math: "u = x^2,\\quad du = 2x\\,dx", gap: "tight", say: "Choose u; note du = 2x dx." },
            { id: "step_2", math: "4x\\,dx = 2\\,du", gap: "tight", say: "Adjust constant: 4x dx = 2 du." },
            { id: "step_3", math: "x=0 \\to u=0,\\quad x=1 \\to u=1", gap: "tight", say: "Transform limits with u = g(x)." },
            { id: "step_4", math: "\\int_0^1 2e^u \\, du", gap: "tight", say: "Definite integral entirely in u." },
            { id: "step_5", math: "2(e-1)", say: "Evaluate: 2e^u from 0 to 1." },
          ],
        },
      ],
      media: null,
    },
    notes:
      "FTC Part 2 (Topic 25) + u-limits. Method A avoids back-substitution. Worked example: limits transform x=0,1 → u=0,1. Answer 2(e−1).",
  },
  {
    id: "s11_application_example_exponential_integral",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "Application Example: Exponential Integral (Medium)",
    question: "",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_context",
          type: "nested_bullets",
          items: [
            { id: "ctx_1", text: "Same integral as previous slide, now see the **area**" },
            { id: "ctx_2", text: "\\(y = 4x e^{x^2}\\) on \\([0,1]\\), probability / physics pattern" },
            { id: "ctx_3", text: "Area = \\(2(e-1) \\approx 3.44\\)" },
          ],
        },
      ],
      lead: "Connect u-substitution to net area under the curve.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [],
      media: {
        id: "right_riemann_integral",
        kind: "calculus_widget",
        widget: "riemann_integral",
        variant: "",
        title: "Area under 4x e^{x²}",
        caption: "Shaded region from x=0 to x=1",
        params: { a: 0, b: 1, n: 12, method: "midpoint" },
        scriptedTimeline: [
          { t: 0, params: { a: 0, b: 1, n: 8, method: "midpoint" } },
          { t: 5, params: { a: 0, b: 1, n: 24, method: "midpoint" } },
          { t: 10, params: { a: 0, b: 1, n: 40, method: "midpoint" } },
        ],
      },
    },
    notes:
      "Visual payoff for s10. Riemann_integral shades area; n increases to show convergence. Links substitution to definite-integral meaning from Topics 23–24.",
  },
  {
    id: "s12_challenge_optional_nested_substitution",
    type: "two-col",
    hud: "Arian University • Calculus 1",
    title: "[Challenge – Optional] Nested Substitution (Pause · Optional · Challenge)",
    question: "Try it yourself before revealing the steps.",
    left: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "left_pause",
          type: "pause_and_reveal",
          title: "Pause and try",
          prompt: "\\(\\int \\frac{e^{\\sqrt{x}}}{\\sqrt{x}}\\,dx\\), hint: \\(u = \\sqrt{x}\\).",
          reveal: { text: "Let \\(u=\\sqrt{x}\\), so \\(x=u^2\\), \\(dx=2u\\,du\\). The \\(u\\) in the denominator cancels." },
        },
        {
          id: "left_solution",
          type: "math_solution_steps",
          problem: "\\int \\frac{e^{\\sqrt{x}}}{\\sqrt{x}} \\, dx",
          steps: [
            { id: "step_1", op: "=>", math: "u = \\sqrt{x},\\quad x = u^2,\\quad dx = 2u\\,du", gap: "tight", say: "Substitute u = √x; solve for x and dx." },
            { id: "step_2", math: "\\int \\frac{e^u}{u} \\cdot 2u\\,du = 2\\int e^u\\,du", gap: "tight", say: "u cancels in numerator and denominator." },
            { id: "step_3", math: "2e^{\\sqrt{x}} + C", say: "Integrate and back-substitute." },
          ],
        },
      ],
      lead: "Challenge: sometimes you must solve for x and dx completely.",
    },
    right: {
      paragraphs: [],
      bullets: [],
      blocks: [
        {
          id: "right_hint",
          type: "nested_bullets",
          items: [
            { id: "h1", text: "Not every integral is \\(f(g(x))g'(x)\\)" },
            { id: "h2", text: "Here \\(u=\\sqrt{x}\\) forces \\(x=u^2\\), \\(dx=2u\\,du\\)" },
            { id: "h3", text: "**Optional**, skip if short on time" },
          ],
        },
      ],
      media: null,
    },
    notes:
      "Optional challenge. Pause before reveal. Nested substitution: solve for x in terms of u. Rewarding when u cancels. Skippable on time-limited recordings.",
  },
  {
    id: "s13_key_takeaways",
    type: "text",
    hud: "Arian University • Calculus 1",
    title: "Key Takeaways: Calculus 1 Finale",
    question: "",
    lead: "",
    blocks: [
      {
        id: "on_screen_text",
        type: "paragraph",
        text: "**You completed Calculus 1!** Substitution reverses the chain rule, the capstone of our integration arc.",
      },
      {
        id: "body_arc",
        type: "nested_bullets",
        items: [
          { id: "arc_1", text: "**Topic 22**, Antiderivatives: reverse differentiation; **+C**" },
          { id: "arc_2", text: "**Topic 23**, Riemann sums: slice, sum, approximate area" },
          { id: "arc_3", text: "**Topic 24**, Definite integral: limit of sums; **net signed area**" },
          { id: "arc_4", text: "**Topic 25**, FTC: \\(F(b)-F(a)\\) evaluates definite integrals fast" },
          { id: "arc_5", text: "**Topic 26**, Substitution: chain rule (Topic 13) in reverse; **u** and **du**" },
        ],
      },
      {
        id: "body_substitution_recap",
        type: "nested_bullets",
        items: [
          { id: "sub_1", text: "Choose \\(u = g(x)\\), find \\(du\\), rewrite, integrate, back-substitute" },
          { id: "sub_2", text: "Watch constant factors and signs when solving for \\(dx\\)" },
          { id: "sub_3", text: "Definite integrals: change **u**-limits or back-sub, never mix" },
          { id: "sub_4", text: "Look for composites **and** function–derivative pairs" },
        ],
      },
      {
        id: "body_celebration",
        type: "paragraph",
        text: "**Congratulations**, 26 topics from limits through integration. **Calc 2 preview:** integration by parts and partial fractions tackle integrals u-sub cannot.",
      },
    ],
    media: null,
    notes:
      "Full integration arc recap Topics 22–26. Celebrate course completion. One-line Calc 2 teaser. Thank students for the journey through Calculus 1.",
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
 *   - Removed placeholder widgets on s01–s05, s07, s09–s10, s12.
 *   - s11: riemann_integral for area under 4x e^{x²} on [0,1].
 *
 * RICH BLOCKS
 *   - math_solution_steps on s04, s06, s08, s09, s10, s12 (u-sub workflow).
 *   - formula_block on s02, s03, s10; nested_bullets algorithm on s05.
 *   - misconception_compare on s07; pause_and_reveal on s04, s07, s12.
 *   - Translator diagram as paragraph/nested_bullets columns (no widget).
 *
 * PEDAGOGY
 *   - Welcome-back; callbacks FTC Part 2 (Topic 25) + chain rule (Topic 13).
 *   - Roadmap currentId path_topic_26, final Calc 1 topic.
 *   - s13: full S05 integration arc recap + course completion celebration.
 *
 * ESTIMATED DURATION: ~20–22 min
 */