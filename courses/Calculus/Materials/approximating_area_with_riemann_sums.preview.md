# Approximating Area With Riemann Sums

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** Familiarity with sigma notation and function evaluation.

**Learning Objectives:**
- Calculate Riemann sums using left, right, and midpoint sample points for continuous functions on closed intervals
- Interpret the definite integral as the limit of Riemann sums as the number of subintervals approaches infinity
- Apply Riemann sum approximations to estimate areas under curves when exact integration is difficult
- Analyze how the choice of sample points affects approximation accuracy
- Construct Riemann sum expressions in sigma notation

---

## v3.1 Production Readiness

✅ **Interactive moments:** 5 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 70w)
⚠️ **Narration too short (<60w):** [7, 8]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s7:51w', 's8:59w']
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 5 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ |  | 69w | 8w | From Curved Garden Beds to Area |
| 2 | core | 🟢 | ◧ |  | 69w | 10w | What is a Riemann Sum? |
| 3 | core | 🟢 | ◧ |  | 80w | 10w | Left Endpoint Riemann Sum |
| 4 | core | 🟢 | ◧ |  | 69w | 9w | Right Endpoint Riemann Sum |
| 5 | core | 🟢 | ◧ |  | 67w | 9w | Midpoint Riemann Sum |
| 6 | 🎛visual_lab | 🟢 | ⬛⬛ |  | 62w | 11w | Explore Riemann Sums Interactively |
| 7 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 51w⚠️ | 10w | Pause: Which Sum is Larger? |
| 8 | core | 🟢 | ◧ |  | 59w⚠️ | 9w | Answer: Right Sum is Larger |
| 9 | 🎛core | 🟢 | ◧ |  | 68w | 9w | Definite Integral as a Limit |
| 10 | challenge | 🔴 | ⬛⬛ |  | 76w | 10w | [Challenge – Optional] Evaluating the Limit for x² |
| 11 | practice | 🟢 | ◧ |  | 65w | 10w | Example 1: Warm-Up – Square Root |
| 12 | practice | 🟢 | ◧ |  | 77w | 10w | Example 2: Standard – ln x in Sigma |
| 13 | 🎛practice | 🟡 | ◧ |  | 76w | 7w | Example 3: Tricky – sin x and Concavity |
| 14 | practice | 🟢 | ◧ |  | 73w | 9w | Example 4: Edge Case – Constant Function |
| 15 | misconception | 🟢 | ◧ |  | 74w | 9w | Common Mistake: Index Confusion |
| 16 | summary | 🟢 | ⬛⬛ |  | 77w | 7w | Summary: What You've Learned |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**From Curved Garden Beds to Area**  ·  `split_left_right`

**On-screen text** `[8w]`
Slice → approximate rectangle sum → exact integral.

**LEFT** `[text]`

You're a landscape architect. A garden bed has a curved edge. You need its area – but curved edges can't be measured with a ruler. **Slice it into thin vertical strips** – each nearly a rectangle. Sum their areas. More strips → better approximation. Infinitely many strips → exact area.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a smooth curve f(x) = x^2 + 1 on [0,2] with 4 thin vertical rectangles inside. The rectangles are drawn with dashed edges, alternating red and blue, touching the curve at the left endpoint. Below, zoomed inset shows one rectangle with base Δx and height f(x_i^*). Background: subtle grid.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 20

**Teacher Narration** `[69w]`
> Imagine you're a landscape architect designing a curved garden bed. You need the area to order soil, but a curved edge can't be measured with a simple ruler. Here's the big idea: slice the region into thin vertical strips, each nearly a rectangle. Add their areas, and as the strips get thinner and thinner, the approximation becomes exact. This 'slice and sum' strategy is the foundation of integral calculus.

---

### Slide 2 · [CORE]
**What is a Riemann Sum?**  ·  `split_left_right`

**On-screen text** `[10w]`
Riemann sum = sum of rectangle areas: Σ f(x_i^*) Δx

**LEFT** `[formula_block]`

$$S_n = \sum_{i=1}^{n} f(x_i^*) \Delta x$$

- $n$: number of rectangles
- $\Delta x = \frac{b-a}{n}$: width
- $x_i^*$: sample point in $i$th subinterval
- $f(x_i^*)$: height

**RIGHT** `[visual_spec]`

*Visual Spec:* Diagram of a single rectangle between curve f and x-axis, spanning subinterval [x_{i-1}, x_i]. Label: base Δx, height f(x_i^*), and vertical dashed lines at x_{i-1} and x_i. The rectangle is filled light blue. The curve is red. Axes labeled x and y.

**Teacher Narration** `[69w]`
> A Riemann sum gives a concrete way to approximate the area under a curve. We break the interval from a to b into n equal subintervals, each of width Δx. In each subinterval we pick a sample point, say x_i star, and build a rectangle of height f of that point. The total area is the sum of these rectangles. The more rectangles we use, the better the approximation.

---

### Slide 3 · [CORE]
**Left Endpoint Riemann Sum**  ·  `split_left_right`

**On-screen text** `[10w]`
L_n uses left edge of each strip as sample point.

**LEFT** `[steps]`

**Formula:** $$L_n = \sum_{i=1}^{n} f(x_{i-1}) \Delta x$$

**Example:** $\int_0^2 (x^2+1)\,dx$, $n=4$
- $\Delta x = 0.5$
- Left points: $x_0=0$, $x_1=0.5$, $x_2=1$, $x_3=1.5$
- Heights: $f(0)=1$, $f(0.5)=1.25$, $f(1)=2$, $f(1.5)=3.25$
- $L_4 = 0.5 (1 + 1.25 + 2 + 3.25) = 3.75$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^2+1 on [0,2]. Draw 4 rectangles touching the curve at the left endpoints. Each rectangle is outlined in red, filled with transparent red. The first rectangle's height is clearly from the left endpoint. Title: 'Left Endpoint, n=4'. Include grid.

**Teacher Narration** `[80w]`
> The left endpoint Riemann sum uses the left edge of each subinterval as the sample point. Let's compute it for f(x)=x^2+1 from 0 to 2 with just 4 rectangles. The width is 0.5. Our left points are 0, 0.5, 1, and 1.5. Evaluate the function at each, multiply by the width, and add. We get an approximate area of 3.75. Notice that the left endpoints are below the curve for an increasing function, so this sum underestimates the true area.

---

### Slide 4 · [CORE]
**Right Endpoint Riemann Sum**  ·  `split_left_right`

**On-screen text** `[9w]`
R_n uses right edge. For increasing f, R_n overestimates.

**LEFT** `[steps]`

**Formula:** $$R_n = \sum_{i=1}^{n} f(x_i) \Delta x$$

**Example:** Same function & $n$:
- $\Delta x = 0.5$
- Right points: $x_1=0.5$, $x_2=1$, $x_3=1.5$, $x_4=2$
- Heights: $1.25, 2, 3.25, 5$
- $R_4 = 0.5 (1.25 + 2 + 3.25 + 5) = 5.75$

> **Compare:** $L_4=3.75$, $R_4=5.75$. True area lies between.

**RIGHT** `[visual_spec]`

*Visual Spec:* Same as left endpoint but rectangles touch curve at right endpoints. Rectangles outlined blue, filled transparent blue. Title: 'Right Endpoint, n=4'. Include grid and axis labels.

**Teacher Narration** `[69w]`
> Now the right endpoint sum uses the right edge of each strip. For the same function and same number of rectangles, the right endpoints are higher because the function is increasing, so each rectangle overestimates the area. Our sum is 5.75, while the left sum was 3.75. The true area – which we'll compute later – is about 4.67, so the left and right sums bracket the exact answer.

---

### Slide 5 · [CORE]
**Midpoint Riemann Sum**  ·  `split_left_right`

**On-screen text** `[9w]`
Midpoint rule often gives best approximation for same n.

**LEFT** `[steps]`

**Formula:** $$M_n = \sum_{i=1}^{n} f\!\left(\frac{x_{i-1}+x_i}{2}\right) \Delta x$$

**Example:** Same function & $n$:
- Midpoints: $0.25, 0.75, 1.25, 1.75$
- Heights: $1.0625, 1.5625, 2.5625, 4.0625$
- $M_4 = 0.5 (1.0625 + 1.5625 + 2.5625 + 4.0625) = 4.625$

> True area: $\frac{14}{3} \approx 4.667$ — remarkably close!

**RIGHT** `[visual_spec]`

*Visual Spec:* Same plot with rectangles touching curve at midpoints. Each rectangle is outlined green, filled transparent green. Title: 'Midpoint, n=4'. Show exact area annotation as a horizontal line at y=4.667 for comparison.

**Teacher Narration** `[67w]`
> The midpoint Riemann sum uses the middle of each subinterval. For our increasing function, the midpoint height is much closer to the average height of the curve over that strip. With n=4, the midpoint sum gives 4.625, while the true area – which we can compute exactly as 14/3 or about 4.667 – is only 0.042 away. That's a huge improvement over the left and right sums.

---

### Slide 6 · [VISUAL_LAB] 🎛 *[3 controls]*
**Explore Riemann Sums Interactively**  ·  `full_width`

**On-screen text** `[11w]`
Change n and method. Watch the rectangles and the sum update.

**FULL WIDTH** `[text]`

Use the controls to change the number of rectangles and the sampling method. Observe how the sum changes as n increases.

- **Slider**: $n$ from 1 to 50
- **Radio**: left / right / midpoint
- **Display**: current sum vs. exact integral $\frac{14}{3}$

**Teacher Narration** `[62w]`
> Now you can explore Riemann sums yourself. Use the slider to increase the number of rectangles from 1 to 50, and switch between left, right, and midpoint methods. Watch how the rectangles crowd under the curve and the sum approaches the exact integral of 14 over 3. Notice that midpoint is often more accurate than left or right for the same n.

---

### Slide 7 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause: Which Sum is Larger?**  ·  `split_left_right`

**On-screen text** `[10w]`
Pause: For f(x)=x^2 on [1,3], n=4: which sum is larger?

**LEFT** `[text]`

For $f(x) = x^2$ on $[1,3]$, predict:

**Will the left sum or right sum be larger for n=4?**

Take 15 seconds to think before clicking the button.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of f(x)=x^2 on [1,3] with 4 equal subintervals. No rectangles drawn yet. The curve is a smooth increasing parabola.

*Interactive Controls:*
  - 🎛 Button: Show Answer — reveals left and right rectangle overlays and a numeric comparison

**Teacher Narration** `[51w ⚠️ **TOO SHORT: 51w < 60w min**]`
> Let's test your intuition. For the increasing function x-squared on the interval 1 to 3, with 4 rectangles, which Riemann sum do you think will be larger: the left or the right? Think about how each rectangle's height compares to the curve. I'll give you a moment, then we'll check together.

**Student Prompt:** Pause: Will left sum or right sum be larger for f(x)=x^2 on [1,3] with n=4?

---

### Slide 8 · [CORE]
**Answer: Right Sum is Larger**  ·  `split_left_right`

**On-screen text** `[9w]`
Right sum is larger because the function is increasing.

**LEFT** `[steps]`

**Explanation:** For an increasing function, right endpoints are higher than left endpoints, so $R_n > L_n$.

**Check:**
- $\Delta x = 0.5$
- Left points: $1, 1.5, 2, 2.5$ → $L_4 \approx 5.875$
- Right points: $1.5, 2, 2.5, 3$ → $R_4 \approx 10.875$
- True area $= \frac{26}{3} \approx 8.667$

**RIGHT** `[visual_spec]`

*Visual Spec:* Split visualization: left panel shows left endpoint rectangles (4 rectangles touching curve at left edges), right panel shows right endpoint rectangles. Both curves are f(x)=x^2. Underneath each panel, the computed sum is displayed.

**Teacher Narration** `[59w ⚠️ **TOO SHORT: 59w < 60w min**]`
> If you predicted right sum larger, you're correct. For an increasing function, right endpoints are always higher than left endpoints, so each rectangle is taller. That gives a larger total – here, 10.875 versus 5.875. The true area is 26 over 3, about 8.667, so left underestimates and right overestimates. This bracketing property is very useful for error bounds.

---

### Slide 9 · [CORE] 🎛 *[2 controls]*
**Definite Integral as a Limit**  ·  `split_left_right`

**On-screen text** `[9w]`
Definite integral = limit of Riemann sums as n→∞.

**LEFT** `[formula_block]`

$$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*) \Delta x$$

**Key idea:** The exact area is the limit of Riemann sums as the number of rectangles approaches infinity (or equivalently, as the width of each rectangle approaches zero).

**Important:** For continuous functions on [a,b], this limit exists and is independent of the choice of sample points.

**RIGHT** `[visual_spec]`

*Visual Spec:* Animated concept: as n increases from 2 to 50 (represented by a slider), the rectangles under f(x)=x^2+1 get thinner and the total sum converges. A dashed horizontal line shows the exact integral value 14/3. The error bar below shows the difference shrinking.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 100
  - 🎛 Checkbox to show/hide error band

**Teacher Narration** `[68w]`
> The definite integral is defined as the limit of Riemann sums as the number of rectangles goes to infinity, making each rectangle infinitely thin. For any continuous function on [a,b], this limit exists and, remarkably, does not depend on which sample points we choose. This is a powerful result: it means we can use any convenient sampling method and still get the same exact answer in the limit.

---

### Slide 10 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Evaluating the Limit for x²**  ·  `full_width`

**On-screen text** `[10w]`
Step-by-step limit computation for ∫ x² from 1 to 3.

**FULL WIDTH** `[steps]`

**Problem:** Show $\int_1^3 x^2\,dx = \frac{26}{3}$ using right endpoint Riemann sums.

| Step | Derivation |
|------|------------|
| 1 | $\Delta x = \frac{2}{n}$ |
| 2 | $x_i = 1 + \frac{2i}{n}$ |
| 3 | $R_n = \sum_{i=1}^n \left(1+\frac{2i}{n}\right)^2\cdot\frac{2}{n}$ |
| 4 | Expand: $= \frac{2}{n}\sum_{i=1}^n \left(1 + \frac{4i}{n} + \frac{4i^2}{n^2}\right)$ |
| 5 | Use sum formulas: $\frac{2}{n}\left[n + \frac{4}{n}\cdot\frac{n(n+1)}{2} + \frac{4}{n^2}\cdot\frac{n(n+1)(2n+1)}{6}\right]$ |
| 6 | Simplify: $2 + \frac{4(n+1)}{n} + \frac{4(n+1)(2n+1)}{3n^2}$ |
| 7 | $\lim_{n\to\infty} R_n = 2 + 4 + \frac{8}{3} = \frac{26}{3}$ |
| 8 | Check: $\int_1^3 x^2\,dx = \left[\frac{x^3}{3}\right]_1^3 = \frac{27}{3} - \frac{1}{3} = \frac{26}{3}$ ✓ |

**Teacher Narration** `[76w]`
> For those who want to see the algebra in action, here's the full derivation for the integral of x-squared from 1 to 3 using right endpoint sums. We write the Riemann sum, expand, use formulas for sum of i and i-squared, simplify, and then take the limit as n goes to infinity. The result matches the antiderivative method exactly. This is an optional challenge slide – the main lesson does not require following every algebra step.

---

### Slide 11 · [PRACTICE]
**Example 1: Warm-Up – Square Root**  ·  `split_left_right`

**On-screen text** `[10w]`
Warm-up: R₄ for √x from 0 to 4 gives 6.146.

**LEFT** `[steps]`

**Problem:** Approximate $\int_0^4 \sqrt{x}\,dx$ using right endpoints with $n=4$.

1. $\Delta x = \frac{4-0}{4} = 1$
2. Right endpoints: $x_1=1, x_2=2, x_3=3, x_4=4$
3. Heights: $1, \sqrt{2}\approx1.414, \sqrt{3}\approx1.732, 2$
4. $R_4 = 1(1 + 1.414 + 1.732 + 2) = 6.146$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=√x from 0 to 4 with 4 shaded rectangles touching the curve at the right endpoints. The first rectangle is very short, the tallest is at x=4.

**Teacher Narration** `[65w]`
> Let's work a warm-up problem. Approximate the integral of the square root function from 0 to 4 using 4 right endpoint rectangles. Width is 2 minus 0 over 4, that's 1. The right endpoints are 1, 2, 3, and 4. Their square roots are roughly 1, 1.414, 1.732, and 2. Adding and multiplying by 1 gives 6.146. This is a straightforward calculation to build confidence.

---

### Slide 12 · [PRACTICE]
**Example 2: Standard – ln x in Sigma**  ·  `split_left_right`

**On-screen text** `[10w]`
Standard: Write the sum in sigma — careful with indices.

**LEFT** `[steps]`

**Problem:** Write the left endpoint Riemann sum for $\int_1^4 \ln x\,dx$ with $n=6$ in sigma notation.

1. $\Delta x = \frac{4-1}{6} = 0.5$
2. Left endpoints: $x_i = 1 + 0.5i$ for $i=0,1,\ldots,5$
3. $L_6 = \sum_{i=0}^{5} \ln(1 + 0.5i) \cdot 0.5$
4. Or: $L_6 = 0.5\sum_{i=0}^{5} \ln(1 + 0.5i)$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of ln x from 1 to 4 with 6 left endpoint rectangles. The rectangles are thin, showing the left edges. Indices i=0 to 5 labeled on x-axis.

**Teacher Narration** `[77w]`
> Here's a standard exercise: express the left Riemann sum for natural log from 1 to 4 with 6 rectangles in sigma notation. The width is 0.5. Left endpoints are 1 plus 0.5 i, where i runs from 0 to 5. Make sure you don't include i=6 – that would be the right endpoint of the last rectangle. The sum is 0.5 times the sum of ln of 1 plus 0.5 i for i from 0 to 5.

---

### Slide 13 · [PRACTICE] 🟡 🎛 *[1 controls]*
**Example 3: Tricky – sin x and Concavity**  ·  `split_left_right`

**On-screen text** `[7w]`
Tricky: Right sum underestimates concave down function.

**LEFT** `[steps]`

**Problem:** For $f(x)=\sin x$ on $[0,\pi]$, compute $R_4$ and explain why it underestimates.

1. $\Delta x = \frac{\pi}{4}$
2. Right endpoints: $\frac{\pi}{4},\frac{\pi}{2},\frac{3\pi}{4},\pi$
3. Heights: $\frac{\sqrt{2}}{2},1,\frac{\sqrt{2}}{2},0$
4. $R_4 \approx 1.896$
5. True area $= 2$

**Why underestimates?** $\sin x$ is concave down on $[0,\pi]$. For a concave down function, right endpoint rectangles lie below the curve, so the sum underestimates. Additionally, on the second half of the interval where sin is decreasing, the right endpoints are lower than the curve, contributing to the underestimate.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot sin x from 0 to π with 4 right endpoint rectangles. The curve is a bump. The fourth rectangle at x=π has height 0. The rectangles are shaded.

*Interactive Controls:*
  - 🎛 Toggle: show concavity annotation (curvature arrows)

**Teacher Narration** `[76w]`
> This example challenges a common assumption. For sine from 0 to pi, the right sum with 4 rectangles gives about 1.896, which is less than the true area of 2. Wait – you might have thought right sums always overestimate. That's only true for increasing functions. Here sine is increasing then decreasing, but more importantly it's concave down. For a concave down function, the curve lies above the chords, so even right endpoint rectangles can underestimate.

---

### Slide 14 · [PRACTICE]
**Example 4: Edge Case – Constant Function**  ·  `split_left_right`

**On-screen text** `[9w]`
Edge: Constant f → any Riemann sum is exact.

**LEFT** `[steps]`

**Problem:** Approximate $\int_2^5 7\,dx$ using midpoint rule with $n=3$.

1. $\Delta x = \frac{5-2}{3} = 1$
2. Midpoints: $2.5, 3.5, 4.5$
3. $f(x)=7$ constant → all heights are 7
4. $M_3 = 1(7+7+7) = 21$
5. Exact: $7(5-2) = 21$

> **Key insight:** Any Riemann sum for a constant function gives the exact area immediately.

**RIGHT** `[visual_spec]`

*Visual Spec:* Horizontal line y=7 from x=2 to 5. Three rectangles (1 wide each) fill perfectly under the line. The area is a simple rectangle of width 3, height 7.

**Teacher Narration** `[73w]`
> Edge cases help solidify understanding. For a constant function, every rectangle has the same height. So left, right, or midpoint sums all give the same result, and that result is exactly the area – 7 times the width, which is 21. This shows that Riemann sums are not just approximations: they can be exact when the function is flat. It also reminds us that the approximation error comes from variation in the function.

---

### Slide 15 · [MISCONCEPTION]
**Common Mistake: Index Confusion**  ·  `split_left_right`

**On-screen text** `[9w]`
Mistake: Don't use xi for left sum. Use x_{i-1}.

**LEFT** `[steps]`

**Wrong approach:** A student writes the left endpoint sum for $\int_0^2 x^2\,dx$ with $n=4$ as:

$$\sum_{i=1}^{4} f(x_i)\Delta x$$

using $x_i = 0.5i$. This is actually the **right** endpoint sum!

**Correct:** For left endpoints, use $i=0$ to $3$ or $x_{i-1}$ with $i=1$ to $4$.

**Reminder:**
- Left: $i=0$ to $n-1$ (or $x_{i-1}$)
- Right: $i=1$ to $n$ (or $x_i$)

**RIGHT** `[visual_spec]`

*Visual Spec:* Two side-by-side plots: left panel shows the *wrong* sum (using xi for left) – rectangles touch right edges; right panel shows the correct left sum. Each plot has the computed sum labeled.

**Teacher Narration** `[74w]`
> A very common mistake is mixing up indices. Here a student uses i from 1 to 4 with x_i for a left sum – that gives right endpoints. The correct left sum uses i from 0 to 3, or equivalently x_{i-1} when i goes from 1 to 4. Always double-check: if the sample point is the left edge, the index starts one before the right index. This small slip can change your entire approximation.

---

### Slide 16 · [SUMMARY]
**Summary: What You've Learned**  ·  `full_width`

**On-screen text** `[7w]`
Riemann sums → limit → definite integral.

**FULL WIDTH** `[text]`

**Core Ideas:**
- Riemann sums approximate area by summing rectangles: $S_n = \sum f(x_i^*)\Delta x$
- Left, right, and midpoint are common choices for $x_i^*$
- The definite integral $\int_a^b f\,dx$ is the limit of Riemann sums as $n\to\infty$
- For increasing functions: left sum < integral < right sum
- Error typically decreases as $n$ increases

**You should now be able to:**
- Compute left, right, and midpoint sums for any continuous function
- Write Riemann sums in sigma notation
- Interpret the integral as a limit
- Recognize how function behavior (monotonicity, concavity) affects approximation accuracy

**Teacher Narration** `[77w]`
> Let's review what we've covered. Riemann sums give us a way to approximate area by adding up rectangles. We saw three common sampling methods: left, right, and midpoint. The definite integral is the limit of these sums as n approaches infinity. For monotonic functions, left and right sums bracket the true value. The more rectangles, the better the approximation. You're now equipped to compute Riemann sums and understand how the integral is built from the ground up.

---
