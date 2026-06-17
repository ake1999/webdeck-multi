# Calculus Course Authoring Guide (For Agents)

This document is the shared playbook for hand-enhancing Arian University calculus
topics. Read it together with `AGENTS.md`, `.agents/project-map.md`, and
`docs/project_handoff_for_new_chat.md`.

**Reference topics (gold standard as of June 2026, v3 math_solution_steps pass):**

| Topic | Session | Slides | Plan |
|-------|---------|--------|------|
| 1 Review of Functions | S01 | `01_review_of_functions_and_graphs.slides.js` | `01_review_of_functions_and_graphs.lecture.plan.json` |
| 2 Trigonometry Review | S01 | `02_trigonometry_and_graphing_review.slides.js` | `02_trigonometry_and_graphing_review.lecture.plan.json` |
| 3 Intuitive Limit | S02 | `01_the_intuitive_concept_of_a_limit.slides.js` | `01_the_intuitive_concept_of_a_limit.lecture.plan.json` |
| 4 Limit Laws | S02 | `02_limit_laws_and_algebraic_evaluation.slides.js` | `02_limit_laws_and_algebraic_evaluation.lecture.plan.json` |
| 5 One-Sided & Infinity | S02 | `03_one_sided_limits_and_limits_at_infinity.slides.js` | `.lecture.plan.json` |
| 6 Squeeze Theorem | S02 | `04_the_squeeze_theorem.slides.js` | `.lecture.plan.json` |
| 7 Continuity & IVT | S02 | `05_continuity_and_the_intermediate_value_theorem.slides.js` | `.lecture.plan.json` |
| 22 Antiderivatives | S05 | `01_antiderivatives_and_indefinite_integrals.slides.js` | `.lecture.plan.json` |
| 23 Riemann Sums | S05 | `02_approximating_area_with_riemann_sums.slides.js` | `.lecture.plan.json` |
| 24 Definite Integral | S05 | `03_the_definite_integral.slides.js` | `.lecture.plan.json` |
| 25 FTC | S05 | `04_the_fundamental_theorem_of_calculus.slides.js` | `.lecture.plan.json` |
| 26 Substitution | S05 | `05_integration_by_substitution.slides.js` | `.lecture.plan.json` |

When in doubt, copy patterns from Topic 4 for limit topics, Topic 1 for
function/graph topics, and Topics 22–26 for integration (Riemann widget,
antiderivative families, FTC, u-sub).

---

## 1. Topic file triplet

Every production topic under `courses/AU/ARIAN_Calculus_1/sessions/<Sx>/` should
eventually have:

```
NN_<material_slug>.slides.js          — browser deck source (hand-enhanced)
NN_<material_slug>.lecture.plan.json  — narration / pedagogy / generation hints
```

**Naming rule (required):** `NN` is the two-digit topic order **within that
session** (`01`, `02`, …). The filename stem, `topicMeta.id`, `topic_id` in the
plan, and `topic.id` in `shared/course_catalog.js` must all match (e.g.
`02_limit_laws_and_algebraic_evaluation`). URL `topic=` uses the same stem.
Material JSON keeps the unprefixed slug only:
`courses/Calculus/Materials/<material_slug>.json`. Use `shared/topic_naming.js`
(`materialSlugFromTopicId`, `prefixedTopicId`) when converting or loading.

Optional upstream:

```
courses/Calculus/Materials/<material_slug>.json   — material adapter input
```

**Workflow**

1. Run `node scripts/convert_calculus_material.mjs` (or topic-specific convert)
   to get a baseline `*.slides.js` + plan from material JSON.
2. Hand-enhance slides: widgets, rich blocks, roadmap, welcome-back copy.
3. Align `*.lecture.plan.json` with slide IDs, `must_cover`, `must_say`, and
   step-level narration targets.
4. Run tests (see §8) before calling a topic done.

**Do not** regenerate duplicate slide files for the same topic unless the user
asks. Preserve stable slide `id` values — generation timelines and layout
manifests depend on them.

---

## 1b. Session 05 (Integration Foundations) arc

Topics 22–26 close Calculus 1. Keep this narrative thread:

| # | Topic | Role in arc |
|---|-------|-------------|
| 22 | Antiderivatives | Reverse differentiation; **+C** family; power/sum rules; IVP |
| 23 | Riemann sums | Slice-and-sum; left/right/midpoint; σ notation; bracket exact area |
| 24 | Definite integral | Limit definition; **net area**; signed regions |
| 25 | FTC | Part 1 (derivative of integral) + Part 2 (evaluate via antiderivative) |
| 26 | Substitution | Chain rule in reverse; **u** and **du**; definite limits in **u** |

**Callbacks:** Topic 22 ↔ derivatives (power rule reverse). Topic 23–24 ↔ limits
(Σ → ∫). Topic 25 bridges 22 and 24. Topic 26 previews Calc 2 techniques.

**Widgets:** `riemann_integral` on sum/definite/FTC hook slides (vary `n`, `method`,
`a`, `b`). `secant_tangent` only when rate-of-change framing helps; prefer
`function_analysis` for antiderivative families when shift matters.

**math_solution_steps:** Use for power-rule integrals, FTC evaluations
\(F(b)-F(a)\), and substitution steps (choose **u** → **du** → integrate → back-sub).

**Do not** teach substitution before FTC Part 2 is solid. Topic 24 may mention
limits in **u** only as a forward pointer.

**Roadmap:** `currentId` = `path_topic_22` … `path_topic_26`; mark Topics 1–21
`completed`; no topics after 26 in Calc 1 catalog.

---

## 2. Course consistency rules

All agents working on AU Calculus 1 should keep these consistent across topics.

### Voice and brand

- Use `shared/arian.avatar.profile.json` — warm, direct, YouTube-friendly.
- **Welcome back** on Topic 2+; do not re-introduce Arian from scratch.
- HUD: `"Arian University • Calculus 1"` on slides.
- `topicMeta.hudDefault` / `hudPrefix` match the personal brand.

### Roadmap (`course_path` block)

- Place on objectives slide (usually slide 2).
- Set `currentId` to the topic being taught (`path_topic_04`, etc.).
- Mark previous topics `status: "done"` or implied complete; mark next topic
  `"next"`; rest `"upcoming"`.
- Session labels must match catalog order in `shared/course_catalog.js`.

### Callbacks and arc

- Each topic plan `teaching_arc` should state entry point, progression, and
  destination.
- `style_notes` should name **previous topic callbacks** (e.g. Topic 4 calls
  back to Topic 3 holes when cancelling factors).
- End slides tease the **next topic** by name.
- `transition_from_previous` / `transition_to_next` in plan entries should
  match slide order.

### Slide density

- Prefer **two-col** slides: left = ideas/steps, right = widget or compact
  reference (formula, bullets, table).
- Use **visual_lab** for student-owned practice (see §3b), not for long
  YouTube narration.
- Avoid walls of prose; use blocks and widgets.

### Punctuation (learner-facing copy)

- Prefer **commas, colons, or periods** over em dashes (`—`) in on-screen slide
  text, captions, objectives, and narration seeds. Em dashes read AI-heavy in
  math education; textbooks rarely use them this often.
- **HUD branding:** `Arian University • Calculus 1` (match the title-card
  subtitle). Do not use `Arian University — Calculus 1`.
- **Math minus:** keep Unicode minus (`−`) inside formulas (e.g. `x−3`). That is
  notation, not punctuation.
- **Subtitle-style titles:** if a title needs two parts, use a colon when the
  first part is a label (`Pythagorean Identity: Proof`) or a comma when a colon
  already appears (`Example 1: Warm-Up, Direct Power Rule`).
- YouTube **pause** slides: `pause_and_reveal` with a real think beat, not
  decorative pauses. See §5b for script and composite-video contract.

### Footer safe zone (AU / themed decks)

Slides reserve bottom space for the **watermark footer** (`--footer-h`, ~90px)
via `padding-bottom` (`--slide-bottom-reserve`). Prefer keeping main content above
that band, but **do not clip** tall blocks (especially `math_solution_steps`).

- Use **flex** body blocks (`two-col`, `visual_lab`) — do not force
  `height: calc(100% - …)` that ignores the reserve.
- If a slide is still too dense after layout, **split** (new slide, `splitAfter`,
  or fewer steps). Otherwise let content **overlap the footer watermark** rather
  than truncating steps.
- **Debug:** open with `?analysis=1` or `?debug=1` — slides that bleed into the
  footer reserve get a red outline (`slide--footer-overflow`) for authoring review.
- CSS variable on themed slides: `--slide-safe-height` ≈ ideal content height.

### Changelog footer

- Add or update the `COURSE DESIGN CHANGELOG` comment at the bottom of
  `*.slides.js` when you change pedagogy, widgets, or block strategy.

---

## 3. Slide types

| Type | When to use |
|------|-------------|
| `title` | Topic open; subtitle + meta line with duration/audience |
| `bullets` | Objectives, recap, exit checklist; can host `course_path` in `blocks` |
| `text` | Single-column when no right visual is needed (rare for calculus) |
| `two-col` | **Default workhorse** — steps left, widget/formula right |
| `visual_lab` | Interactive lab — **left** short steps, **right** large plot (§3b) |
| `mcq` | Optional checks; pair with `pause_and_reveal` for YouTube pauses |

### 3b. `visual_lab` layout and pedagogy

**Problem we solved:** stacking instructions above a full-width widget shrinks the
plot. Labs now use a **34% / 66%** split (like two-col, but tuned for labs).

| Zone | Content |
|------|---------|
| **Left** (`lead`, `blocks`, `labExamples` steps) | 2–4 short bullet steps, optional formula, example tabs |
| **Right** (`media` or `right.media`) | Widget plot + existing sliders/readout (unchanged widget chrome) |

**YouTube vs site**

- On **YouTube**: mention the lab exists, demo **one** example tab (~30s), move on.
- On the **site**: students switch tabs, drag sliders, use **New example**.

**Three examples per lab (recommended)**

```javascript
{
  type: "visual_lab",
  title: "Lab: Explore Riemann Sums",
  lead: "Short hook — one sentence.",
  labSiteNote: "On the site, try all three tabs and New example.",
  labExamples: [
    {
      id: "lab_ex_left",
      label: "A · Left",
      formula: "L_4",
      steps: [
        { id: "step_1", text: "Set method = left, n = 4." },
        { id: "step_2", text: "Watch sum vs exact area." },
      ],
      params: { a: 0, b: 2, n: 4, method: "left" },  // patches widget state
    },
    // ... Example B, C
  ],
  labGeneratePresets: [  // optional pool for "New example" button
    { label: "Dense midpoint", params: { n: 24, method: "midpoint" }, steps: [{ text: "…" }] },
  ],
  labGenerateMode: "cycle",  // or "random"
  media: { kind: "calculus_widget", widget: "riemann_integral", params: { … } },
}
```

**Rules**

- Put **at most 3–4 short steps** on the left per active example; math in
  `formula` if needed.
- Do **not** put long prose or worked solutions in labs — use `two-col` +
  `math_solution_steps` for teaching slides.
- Labs may appear on **several slides** (one concept per lab) or **one slide**
  with `labExamples` tabs.
- Widget `params` on each example patch the mounted widget when the tab is clicked.
- Implementation: `shared/visual_lab.js` + `.visual-lab-layout` in `deck.css`.

**Reference labs:** S05 `02_…` s06 (Riemann), `01_…` s12 (+C family), `04_…` s12 (FTC).

### Two-col shape

```javascript
{
  id: "s09_example_factoring",
  type: "two-col",
  title: "...",
  left: {
    lead: "One sentence hook.",
    paragraphs: [],
    bullets: [],
    blocks: [ /* math_solution_steps, misconception_compare, etc. */ ],
  },
  right: {
    paragraphs: [],
    bullets: [],
    blocks: [],        // optional small formula_block
    media: { /* calculus_widget */ },
  },
  notes: "Speaker notes for recording.",
}
```

**Right column priority:** widget/graph > `formula_block` > `nested_bullets` >
`paragraph`. Do not cram steps on the right if the slide already has a widget —
use internal step split (§4.5) or a second slide instead.

---

## 4. `math_solution_steps` — primary worked-example block

Use this instead of `example_solution` or `derivation_steps` for **algebraic
limit/derivative work** where math should dominate and steps reveal progressively.

Implementation: `shared/math_solution_steps.js` + `shared/deck_render.js`.
Pipeline: deterministic scripts emit **one segment per step** targeting `step.id`.

### 4.1 Minimal shape

```javascript
{
  id: "body_solution",
  type: "math_solution_steps",
  problem: "\\lim_{x\\to 2}\\frac{x^2-4}{x-2}",
  steps: [
    {
      id: "step_1",
      op: "=>",
      math: "\\frac{0}{0}",
      gap: "tight",
      say: "Direct substitution gives indeterminate form.",
    },
    {
      id: "step_2",
      math: "\\frac{(x-2)(x+2)}{x-2}",
      gap: "tight",
      say: "Factor the numerator.",
    },
    {
      id: "step_3",
      math: "\\frac{\\cancel{(x-2)}(x+2)}{\\cancel{(x-2)}}",
      say: "Cancel for x not equal to 2.",
    },
    {
      id: "step_4",
      math: "4",
      say: "Answer is 4.",
    },
  ],
}
```

### 4.2 Field reference

| Field | Purpose |
|-------|---------|
| `problem` | Top line (limit/expression). Rendered as display math. |
| `problemSay` | Optional narration override for problem line |
| `stepLayout` | `"flow"` (default), `"stack"`, or `"chain"` — see §4.3 |
| `chainOp` | Default operator between parts (`"="`) |
| `splitAfter` | After N steps, continue in a **right lane** inside the block |
| `startVisible` | Number of steps visible on load (usually `0`) |
| `advanceLabel` | Button text (default `"Next step →"`) |

**Per step:**

| Field | Purpose |
|-------|---------|
| `id` | **Required for generation.** Stable cue target (`step_1`, `step_2`, …) |
| `math` | LaTeX (no delimiters; renderer wraps in `$$`) |
| `say` | Short voice line for scripts/TTS (not shown on slide in `flow` mode) |
| `op` / `chainOp` | Leading operator: `"="`, `"=>"` (⇒), `"->"`, `"none"` |
| `gap` | Line spacing: `"tight"`, `"normal"`, `"loose"` |
| `parts` | Merge multiple math chunks in **one reveal** — see §4.4 |

**Cancellation:** use `\\cancel{...}` in LaTeX. KaTeX renders it natively — do
not add custom macros.

### 4.3 Layout modes

| Mode | Use when |
|------|----------|
| `flow` | **Default.** Problem on top; each step on its own row with leading `=` or `⇒`. Fits ~4 steps comfortably in a two-col left column. |
| `stack` | Vertical lines **without** leading operators — e.g. quotient-law checklist (denominator check, numerator, apply law). |
| `chain` | Compact horizontal wrap — only when expressions are short and you explicitly want a chained row. |

**Do not** force an entire solution onto one line. Use `flow` and let lines wrap
naturally. Use `gap: "tight"` on dense lines; `gap: "loose"` before the final
answer.

### 4.4 Merged steps (`parts`)

Reveal two math expressions together on one row (e.g. simplify then substitute):

```javascript
{
  id: "step_4",
  parts: [
    { math: "\\frac{1}{\\sqrt{x}+2}" },
    { math: "\\frac{1}{4}", op: "=" },
  ],
  say: "Simplify, then substitute — answer is one fourth.",
}
```

- Still **one** reveal click and **one** narration segment.
- Inner `op` appears between parts; the row still gets a leading `op` from the
  step (default `=`).

### 4.5 Two-lane split (`splitAfter`)

When a solution has more than ~4 steps, split **inside the block**:

```javascript
{
  type: "math_solution_steps",
  splitAfter: 3,
  problem: "...",
  steps: [ /* step_1..step_5 */ ],
}
```

- Steps `1..splitAfter` → left lane.
- Steps `splitAfter+1..end` → right lane **inside the same block**.
- When the first right-lane step reveals, a **vertical divider** appears between
  lanes.
- Reveal order remains global: step 1, 2, 3, 4, 5…

Use this when the slide's outer right column already has a widget. Do **not** put
overflow steps in the slide right column if a widget lives there — use
`splitAfter` instead.

If the slide has **no** widget, you may instead put a second
`math_solution_steps` block on the slide right column with `continuation: true`
(future pattern) or keep everything in one block with `splitAfter`.

### 4.6 Operator conventions

| Situation | Operator |
|-----------|----------|
| Problem → first result (especially 0/0) | `op: "=>"` |
| Algebra manipulation on same goal | `op: "="` (default) |
| Logical “therefore” step | `op: "=>"` |
| Checklist lines (stack layout) | no operator (`stack` mode) |

### 4.7 Placement rules

1. **Problem line** always visible; steps hidden until revealed.
2. Put `math_solution_steps` in **left** column when right has a widget.
3. Cap at ~4–5 flow lines in left column before `splitAfter` or a new slide.
4. Keep `say` short; math carries the visual weight.
5. Final answer: prefer a short `math` (`"4"`, `"\\frac{3}{2}"`) not a sentence.
6. Pair with `rational_hole` / `approach_parabola` widgets when graph confirms
   the limit.

### 4.8 Plan.json alignment

For slides with `math_solution_steps`, plan entries should:

- `must_cover` mention step concepts in reveal order.
- Optionally reference step IDs in narration seeds for generation prep.
- Deterministic provider targets: `{blockId}_problem`, then `step_1`, `step_2`, …
- When steps drive a plot, add `interaction_hints` with `widget_media_id`,
  `step_ids`, and `scripted_params` (see §7b).

Example narration seed:

```text
Direct sub gives 0/0 on step_1. Factor on step_2. Cancel on step_3. Answer 4 on step_4.
```

### 4.10 `widgetParams` — sync steps with the plot

Attach `widgetParams` to individual steps when revealing algebra should move a
probe, slider, or variant on the paired widget (piecewise evaluation, symmetry
check, transform gallery).

```javascript
{
  id: "step_eval3",
  math: "f(1.5)=2",
  widgetParams: { x: 1.5 },
}
```

**Rules**

- Param keys must match widget controls (`x`, `a`, `h`, `k`, `family`, …). Check
  `CONTROLS` in the widget file before authoring.
- One param patch per step is enough; repeat only when the plot state should
  hold across consecutive steps.
- Scripts must **target the step id** in the same segment that discusses that
  evaluation so lecture playback fires `webdeck:widget-params`.
- Speak like a professor pointing at the graph, not like UI instructions ("drag
  the slider" → "watch the probe at x equals 1.5").
- Prefer `widgetParams` on steps for **discrete** plot jumps; use
  `scriptedTimeline` on the widget for **continuous** motion during one beat.

### 4.9 Anti-patterns

- ❌ English-heavy `example_solution` prose for limit algebra — use `math_solution_steps`
- ❌ More than 6–7 reveal steps on one slide without split or new slide
- ❌ Duplicate full limit expression in every step — show the **delta** per step
- ❌ Cancelling without `\\cancel{}` when students need to see the strike-through
- ❌ Reusing `step_1` IDs across slides in the same topic (IDs are per-slide for cues but keep naming consistent)
- ❌ Changing step IDs after layout export / audio generation without regenerating

---

## 5. Other rich blocks

| Block | Use when |
|-------|----------|
| `formula_block` | Single key formula on the right column or inline |
| `theorem_box` | Formal statement students must remember |
| `math_table` | Law summaries (eleven limit laws), comparison tables |
| `misconception_compare` | Wrong vs right side-by-side (cancellation traps) |
| `pause_and_reveal` | YouTube think-pause with MC or short reveal (§5b) |
| `proof_sketch` | Light proof intuition (not full epsilon proofs) |
| `derivation_steps` | Non-algebraic narrative steps (still prose-first) |
| `example_solution` | Legacy prose solutions — prefer `math_solution_steps` for computation |
| `nested_bullets` | Short reminders (law names, workflow checklist) |
| `paragraph` | One or two sentences when bullets are too heavy |

### `nested_bullets` and ordered lists

`nested_bullets` renders as an **ordered list** (`<ol>`, class `calculus-step-list`)
by default (`ordered` is true unless you set `ordered: false`).

- **Do not** prefix item text with `**1.**`, `**2.**`, etc. The browser adds
  step numbers; manual prefixes duplicate markers (e.g. `1. 1.`).
- Use plain step text; bold only the label inside a step when helpful
  (`**Horizontal shift:** replace …`).
- Set `ordered: false` only when you want bullet dots (`<ul>`) instead of numbers.
- Keep lists **short** on two-col left columns (4–5 items max). Dense ordered
  lists plus a widget often bleed into the footer watermark; split or trim
  before adding `pause_and_reveal` on the same slide.
- `example_solution.steps` and `math_solution_steps` always use ordered lists;
  same rule: no manual `1.` / `2.` prefixes in step text.
- `course_path` — roadmap grid on objectives slide (usually inside a `bullets`
  slide `blocks` array).

### 5b. `pause_and_reveal` — quiz, silent beat, reveal

Use when students should **predict** before you confirm (horizontal-shift trap,
limit guess, symmetry check). Do not add pauses on every slide; skip them when
the left column is already dense (definitions + examples).

**Slide shape**

```javascript
{
  id: "left_pause",
  type: "pause_and_reveal",
  title: "Pause and predict",
  prompt: "Which direction does f(x+2) shift?",
  reveal: { text: "LEFT 2 units (set x+2=0 → x=−2)." },
}
```

- Give the block a stable `id` (e.g. `left_pause`) for layout targets.
- Keep `prompt` short; put the worked answer in `reveal.text`.
- Pair with a widget on the right when the prediction is visual (shifts,
  probes, symmetry).

**Plan alignment**

- Set `slide_role: "pause"` (or `hook` / `intuition` when appropriate).
- `narration_seed` should name the prediction, not the answer.
- Add a `style_notes` line or topic-level `playback_contract.pause_audio` so
  generation knows think beats are silent.

**Script generation (`script_writer_v3`)**

1. **Quiz segment** — `delivery_kind: quiz_prompt`, `target_element` = prompt id
   (e.g. `left_pause` or prompt sub-element). Ask the prediction only.
2. **Reveal segment** — later segment, `target_element` = reveal element. State
   the answer with one concrete test point or graph feature.
3. **Never** speak the reveal answer in the quiz segment.

**Composite video / audio**

- TTS runs on spoken segments only.
- The avatar composite inserts a **silent think beat** (waiting animation, no
  speech) between quiz and reveal.
- Do not invent spoken filler for that gap; silence is intentional.

**When to omit**

- Optional challenge slides that are already proof-heavy (table + plot).
- Slides where a pause would crowd the footer safe zone.

---

## 6. Calculus widgets (`media.kind: "calculus_widget"`)

Native widgets live in `shared/calculus/`. **Do not** use static Python plot
screenshots as the primary visual path.

### Registered widgets

| Widget | Typical use |
|--------|-------------|
| `function_analysis` | Most graph demos — see variants below |
| `function_transform` | Shifts, stretches, trig period, even/odd gallery |
| `limit_epsilon` | Formal ε–δ (when needed) |
| `secant_tangent` | Secant → tangent slope |
| `riemann_integral` | Riemann sums / area |
| `unit_circle_trig` | Trig review, special angles |

### `function_analysis` variants (common)

`approach_parabola`, `rational_hole`, `rational_hole_1`, `limit_laws_sum_demo`,
`limit_product_quotient`, `piecewise`, `piecewise_limit`, `domain_sqrt_shift`,
`composition_sqrt`, `symmetry_even_odd`, `product_even_odd`, `abs_quotient`,
`sin_reciprocal`, `limit_sum`, …

Check `shared/calculus/widgets/function_analysis.js` `CONTROLS` for param names
before authoring `params` and `scriptedTimeline`.

### Widget media shape

```javascript
{
  id: "right_rational_hole",
  kind: "calculus_widget",
  widget: "function_analysis",
  variant: "rational_hole",
  title: "Hole at (2,4)",
  caption: "Orange = original; dashed = simplified.",
  formulaLabel: "f",
  params: { x: 1.5, a: 2, showSimplified: true },
  scriptedTimeline: [
    { t: 0, params: { x: 1 } },
    { t: 5, params: { x: 1.95 } },
  ],
}
```

**Rules**

- Always set unique `id` (layout + narration targets).
- `scriptedTimeline` keys match control names (`x`, `a`, `showSimplified`, …).
- Narration should **call the parameter** then let timeline move it.
- `visual_lab` slides: widget in `media` (right pane); steps in `labExamples` or
  compact `blocks`/`lead` on the left.
- Widget sub-elements export as `_formula`, `_plot`, `_readout`, `_controls` for
  fine-grained cues.

### 6c. Interactive narration during playback

Lecture mode should feel **active**: the plot or step state changes when the
instructor names the rule, not only after the slide ends.

| Mechanism | Slide source | Runtime | Script target |
|-----------|--------------|---------|---------------|
| `scriptedTimeline` | widget `params` keyframes at `t` seconds | `webdeck:lecture-time` → widget params | widget media id, `delivery_kind: demo` |
| `widgetParams` on steps | per-step patch on `math_solution_steps` | `webdeck:widget-params` on step cue | step id (e.g. `step_3`) |
| Step reveal | hidden steps in `math_solution_steps` | `revealMathSolutionStep` on cue | step id |

**Authoring checklist**

1. Right column: widget with unique `id` and meaningful `params` default.
2. Left column: `math_solution_steps` or compact bullets; optional
   `widgetParams` on steps that match spoken evaluations.
3. Plan entry: `interaction_hints` with `widget_media_id`, optional `step_ids`,
   optional `scripted_params` list.
4. `narration_seed` / `scene_hint`: name which control moves when (probe `x`,
   shift `h`, toggle `showSimplified`).
5. Generation: `script_writer_v3` — professor explains the graph while targeting
   the widget or step; no crew directions.

**Anti-patterns**

- ❌ Static plot for a whole example slide when probe motion would teach the idea
- ❌ `widgetParams` keys that do not exist on the widget
- ❌ Speaking the reveal answer inside a `pause_and_reveal` quiz segment
- ❌ Narrating avatar head motion or "wait while I think" during silent beats

### 6b. `flex_plot` — configurable graphs (prefer over repeating variants)

Plots are **drawn in the browser**, not baked images. When a slide needs a new
graph, use `variant: "flex_plot"` and a `plot` spec instead of reusing the same
hardcoded variant (`approach_parabola`, `abs_quotient`, `sin_reciprocal`, …) on
every slide.

Implementation: `shared/calculus/core/plot_spec.js` + `function_analysis` drawer
`flex_plot`.

```javascript
{
  kind: "calculus_widget",
  widget: "function_analysis",
  variant: "flex_plot",
  title: "Jump at x = 2",
  formulaLabel: "f",
  plot: {
    plotType: "piecewise",          // y_equals | piecewise | squeeze
    formula: "f(x)=\\begin{cases}x,&x<2\\\\x+1,&x>2\\end{cases}",
    xDomain: [0, 4],
    yDomain: [0, 5],
    branches: [
      { expr: "x", xMin: 0, xMax: 2, openAtEnd: true, stroke: "#2563eb" },
      { expr: "x+1", xMin: 2, xMax: 4, openAtStart: true, stroke: "#c65a28" },
    ],
    vLines: [{ x: 2 }],
    tags: [{ text: "left → 2", x: 1, y: 1.4 }],
    probe: true,
    probeDefault: 1.4,
  },
  params: { x: 1.4 },
}
```

**Plot types**

| `plotType` | Use when | Key fields |
|------------|----------|------------|
| `y_equals` | Single or multiple curves from expressions | `curves[]` or `expr`, `xDomain`, `yDomain`, optional `verticalAt` / `a` |
| `piecewise` | Jumps, sign functions, one-sided demos | `branches[]` with `expr`, `xMin`, `xMax`, `openAtStart` / `openAtEnd` |
| `squeeze` | Squeeze theorem labs | `mid`, `lower`, `upper`, `zoom` param; optional `yDomain`, `tag` |

**Expression syntax (safe subset)**

- Variable: `x` only.
- Operators: `+ - * / ^` (power).
- Functions: `abs`, `sin`, `cos`, `tan`, `sqrt`, `exp`, `log`, `pi`.
- Examples: `x^2`, `x*sin(1/x)`, `(x-3)/abs(x-3)`, `sin(x)/x`, `-abs(x)`.

**Rules — avoid duplicate graphs**

1. **Do not** put the same variant on consecutive slides unless pedagogy requires
   identical visuals (rare).
2. **Prefer `flex_plot`** when the story needs a different formula, jump location,
   or squeeze bounds — change `plot`, not the whole widget file.
3. **`visual_lab` tabs:** each `labExamples[].params` may include a full `plot`
   object; tabs swap expressions without new variants.
4. **Keep named variants** (`limit_product_quotient`, `riemann_integral`,
   `limit_epsilon`) when the widget encodes **interaction logic** beyond a simple
   curve (multi-function law demos, area strips, ε–δ bands).
5. **Legacy variants** remain valid; migrate to `flex_plot` when hand-enhancing
   topics that repeat `sin_reciprocal` / `abs_quotient` / `approach_parabola`.
6. **Footer / labs:** lab plot panes use `overflow: visible` — tall plots may
   overlap the watermark; never clip steps or graph bottoms (see §2 footer note).

**Tests:** `npm run test:plot-spec` after editing `plot_spec.js`.

---

## 7. `*.lecture.plan.json` patterns

Schema: `phase6-lecture-plan-v2`.

Top-level fields agents should maintain:

| Field | Purpose |
|-------|---------|
| `teaching_arc` | Entry, progression, destination, methods |
| `topic_goal` / `topic_takeaways` | Outcomes for script generation |
| `style_notes` | Brand, callbacks, pause policy, widget narration |
| `topic_defaults` | Voice, energy, pace, attention_mode |
| `avatar_profile` | `shared/arian.avatar.profile.json` |
| `slides[]` | Per-slide pedagogy — aligned by `slide_ref.index` to `slidesData` order |

Per-slide plan entry:

| Field | Purpose |
|-------|---------|
| `slide_role` | `intro`, `setup`, `hook`, `definition`, `intuition`, `example`, `pause`, `recap`, … |
| `narration_seed` | Seed text for LLM/deterministic scripts |
| `must_cover` / `must_say` | Non-negotiable content |
| `transition_from_previous` / `transition_to_next` | Bridge sentences |
| `avatar_hint` | Anchor and behavior on dense visual slides |
| `prop_suggestions` | Widget names for motion planning |
| `interaction_hints` | Widget id, step ids, params to move during narration (§7b) |
| `scene_hint` / `delivery_goal` | One-line cue for script writer and motion planner |

**Index alignment:** `slide_ref.index` 0 = first slide in `slidesData`. If you
insert a slide, reindex plan entries.

### 7b. `playback_contract` and `interaction_hints`

Top-level `playback_contract` (optional but recommended on hand-enhanced topics)
documents generation/runtime expectations:

```json
{
  "playback_contract": {
    "widget_sync": "scriptedTimeline + lecture-time/cue drives sliders; step targets fire widgetParams",
    "pause_audio": "think beats are silent in the composite; only quiz and reveal segments carry speech",
    "avatar_motion": "placement/head clips are video-only overlays, omitted from TTS"
  }
}
```

Mirror the same ideas in `style_notes` so `script_writer_v3` sees them in plan
context.

Per-slide `interaction_hints` tell the LLM which elements to demo:

```json
{
  "interaction_hints": {
    "widget_media_id": "right_function_transform",
    "step_ids": ["step_1", "step_2", "step_3"],
    "scripted_params": ["h", "k"]
  }
}
```

- `widget_media_id` — layout target for `delivery_kind: demo`.
- `step_ids` — `math_solution_steps` rows to target in order.
- `scripted_params` — control names the narration should name aloud.

**Gold reference:** Topic 01 plan entries for transforms (s04), composition,
symmetry, challenge, and piecewise slides.

---

## 8. Generation pipeline sync

```
*.slides.js  →  layout export  →  script manifest  →  audio / timeline  →  avatar / slide video
```

Contracts to preserve:

- Element IDs in DOM: `{slideId}__{elementId}` (e.g. `s09_example__step_3`).
- `math_solution_step` elements are text-like for lecture focus underline.
- Lecture player calls `revealMathSolutionStep` when a cue targets a step — steps
  reveal through that index automatically.
- Layout export calls `revealAllMathSolutionSteps` so hidden steps still get
  bboxes for generation.
- `shared/calculus/registry.js` listens for `webdeck:lecture-time` (widget
  `scriptedTimeline`) and `webdeck:widget-params` (step `widgetParams`).
- Pause slides: composite video owns the silent think beat; audio WAVs are per
  spoken segment only.
- Preferred script prompt for AU calculus: `script_writer_v3` with
  `llm_local` and `allowScriptFallback 0` when a model endpoint is configured.

**Tests to run after topic edits:**

```bash
npm run test:math-solution-steps
npm run test:calculus-widgets
npm run test:topic-script-plan    # if plan structure changed
```

---

## 9. Quick decision tree

```
Worked limit/derivative algebra?
  → math_solution_steps (flow, left col, widget right)

Need graph confirmation?
  → function_analysis on two-col right; visual_lab only for student practice labs

Comparing common mistake?
  → misconception_compare + optional rational_hole widget

Listing laws or cases?
  → math_table

Formal statement?
  → theorem_box or formula_block

YouTube pause?
  → pause_and_reveal (plan slide_role: pause; quiz segment + silent beat + reveal)

Plot should move while explaining?
  → scriptedTimeline on widget and/or widgetParams on steps + interaction_hints

Topic open?
  → title + bullets with course_path (currentId set)

Topic close?
  → bullets recap + teaser next topic + optional pause_and_reveal final check
```

---

## 10. When material JSON and slides disagree

Material JSON in `courses/Calculus/Materials/` is the **content source**.
Hand-enhanced `*.slides.js` is the **presentation source** for AU.

- Adapter output is a starting point, not final quality.
- Preserve slide `id` values when enhancing.
- If material adds a visual spec with no widget yet, use a short `paragraph`
  “Visual plan: …” until a native widget exists — do not block the topic on
  screenshots.

---

*Last updated: June 2026 — reflects `math_solution_steps` flow/split/merge layout,
`pause_and_reveal` quiz/reveal contract, and interactive widget/step narration
(`scriptedTimeline`, `widgetParams`, `interaction_hints`, `playback_contract`).
Topics 1–4 v3; Session 05 Topics 22–26 v1 hand-enhanced (integration arc).*