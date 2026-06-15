# Alternating Series and Absolute Convergence

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** Comparison Test and p-series: ∑ 1/n^p converges if p>1, diverges if p≤1.

**Learning Objectives:**
- Apply the Alternating Series Test to determine convergence of alternating series
- Distinguish between absolute and conditional convergence
- Use the Absolute Convergence Theorem to prove convergence
- Analyze series with irregular sign patterns using absolute convergence
- Evaluate series convergence using the Ratio Test for absolute convergence

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 70w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 15 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 3 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ |  | 68w | 20w | The Bouncing Ball and the Drunkard's Walk |
| 2 | core | 🟢 | ◧ |  | 69w | 10w | Alternating Series Test |
| 3 | practice | 🟢 | ◧ |  | 100w | 10w | Warm-Up Example: Alternating Series Test |
| 4 | practice | 🟡 | ◧ |  | 71w | 11w | Standard Example: Using Calculus to Check Decreasing |
| 5 | pause_and_try | 🟢 | ◧ | ⏸️ | 77w | 14w | Pause: Does This Series Converge? |
| 6 | practice | 🟢 | ◧ |  | 64w | 7w | Solution: ∑ (-1)^n / √n |
| 7 | core | 🟢 | ◧ |  | 70w | 10w | Absolute Convergence |
| 8 | core | 🟢 | ◧ |  | 61w | 8w | Absolute Convergence Implies Convergence Theorem |
| 9 | 🎛visual_lab | 🟢 | ◧ |  | 60w | 11w | Visual Lab: Partial Sums of Alternating Series |
| 10 | 🎛visual_lab | 🟢 | ◧ |  | 66w | 13w | Visual Lab: Absolute vs Conditional Convergence |
| 11 | misconception | 🟡 | ◧ |  | 62w | 12w | Common Mistake: Forgetting to Check Decreasing |
| 12 | practice | 🟡 | ◧ |  | 62w | 10w | Example: Irregular Signs (cos n) - Using Absolute Convergence |
| 13 | practice | 🟡 | ◧ |  | 83w | 10w | Example: Ratio Test for Absolute Convergence |
| 14 | challenge | 🔴 | ◧ |  | 69w | 9w | [Challenge – Optional] Conditional Convergence of ∑ (-1)^n / ln n |
| 15 | summary | 🟢 | ⬛⬛ |  | 68w | 10w | Summary & Key Takeaways |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**The Bouncing Ball and the Drunkard's Walk**  ·  `split_left_right`

**On-screen text** `[20w]`
An alternating series is like a bouncing ball. But some series only converge because the signs cancel. Which are trustworthy?

**LEFT** `[text]`

An alternating series is like a bouncing ball settling to rest. But some series only converge because of careful cancellation - like a drunkard's walk where forward and backward steps happen to balance. Which series are reliable?

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a vertical line representing height. Animate a ball bouncing with each bounce half the previous height. Show a horizontal line at final resting height. Use matplotlib.axes and a slider to control number of bounces (1 to 10).

*Interactive Controls:*
  - 🎛 Slider for number of bounces from 1 to 10

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(6,4))
plt.subplots_adjust(bottom=0.25)
ax.set_ylim(0, 1.1)
ax.set_xlim(0, 10)
ax.set_xlabel('Bounce number')
ax.set_ylabel('Height')

n_max = 10
heights = [1/(2**i) for i in range(n_max)]
line, = ax.stem(range(1, n_max+1), heights, linefmt='-', markerfmt='o', basefmt=' ')
ax.axhline(0, color='gray', linestyle='--')

ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 'Bounces', 1, n_max, valinit=n_max, valstep=1)

def update(val):
    n = int(slider.val)
    h = [1/(2**i) for i in range(n)]
    line.set_data(range(1, n+1), h)
    ax.set_xticks(range(1, n+1))
    plt.draw()

slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[68w]`
> Think of an alternating series as a bouncing ball that gradually settles. The Alternating Series Test tells us when the ball comes to rest: the bounces must get smaller and approach zero. But here's the twist: some series only converge because of careful cancellation between positive and negative terms. If you take all terms as positive, they diverge. That's conditional convergence. Today we'll learn to tell the difference.

**Student Prompt:** If the ball bounces with heights 1, 1/2, 1/3, 1/4, ..., does it ever settle? Why might this be different from heights 1, 1/2, 1/4, 1/8, ...?

---

### Slide 2 · [CORE]
**Alternating Series Test**  ·  `split_left_right`

**On-screen text** `[10w]`
Three conditions: positive terms, decreasing, limit zero → convergence guaranteed.

**LEFT** `[formula_block]`

$$\sum_{n=1}^{\infty} (-1)^{n-1} b_n = b_1 - b_2 + b_3 - b_4 + \cdots$$

**Conditions:**
- $b_n > 0$
- $b_{n+1} \leq b_n$ for all $n$
- $\lim_{n\to\infty} b_n = 0$

If all hold, the series converges.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot b_n = 1/n as blue points for n=1..20. Add red vertical lines for positive terms (upward from x-axis) and green vertical lines for negative terms (downward from x-axis) to show the alternating signs. Label axes: n and b_n. Show a horizontal dashed line at y=0.

**Teacher Narration** `[69w]`
> The Alternating Series Test is our first tool for series with alternating signs. It has three conditions: the terms must be positive, they must be decreasing (or at least non‑increasing), and they must approach zero. If all three hold, the series converges. Notice the test does not tell us the sum, only that it exists. Also important: the error after n terms is at most the first omitted term.

---

### Slide 3 · [PRACTICE]
**Warm-Up Example: Alternating Series Test**  ·  `split_left_right`

**On-screen text** `[10w]`
∑ (-1)^{n+1}/n²: b_n = 1/n², decreasing, limit 0 → converges.

**LEFT** `[steps]`

**Test $\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n^2}$**

1. $b_n = \frac{1}{n^2} > 0$
2. Decreasing: $\frac{1}{(n+1)^2} < \frac{1}{n^2}$ for all $n$
3. $\lim b_n = 0$ → Both conditions satisfied.

**Conclusion:** Converges by Alternating Series Test.

**Absolute convergence:** $\sum \frac{1}{n^2}$ converges (p-series, p=2), so the series converges absolutely.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot partial sums S_n for n=1..20. Show a horizontal line at the limit π²/12 ≈ 0.822. Highlight how even and odd partial sums bracket the limit.

**Teacher Narration** `[100w]`
> Let's test the series ∑ (-1)^{n+1} over n squared. The positive part b_n is 1/n². It's clearly decreasing as n increases, and its limit is zero. Both conditions are satisfied, so the series converges. Later we'll see that this series actually converges absolutely, meaning the series of absolute values also converges. This is a nice example because the absolute series is a convergent p-series, so we get absolute convergence automatically. The partial sums approach π²/12, which is about 0.822. Notice how the even and odd partial sums bracket this limit from below and above, giving us a natural error bound.

---

### Slide 4 · [PRACTICE] 🟡
**Standard Example: Using Calculus to Check Decreasing**  ·  `split_left_right`

**On-screen text** `[11w]`
b_n = n/(n²+1): limit zero, decreasing for n≥2 → AST applies.

**LEFT** `[steps]`

**Test $\sum_{n=1}^{\infty} \frac{(-1)^n n}{n^2+1}$**

1. $b_n = \frac{n}{n^2+1}$
2. $\lim b_n = 0$ (degrees: numerator < denominator)
3. Check decreasing via derivative:
   $f(x)=\frac{x}{x^2+1}$
   $f'(x)=\frac{1-x^2}{(x^2+1)^2}$
   $f'(x)<0$ for $x>1$ → decreasing for $n\ge2$

**Conclusion:** Converges.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x) from x=0 to 10. Mark x=1 with vertical dashed line. Shade region where f'(x)<0. Show points for n=1..10. Set y-axis range from 0 to 0.6. Overlay discrete points at integer x values.

**Teacher Narration** `[71w]`
> Here the decreasing condition isn't obvious. We use calculus: define f(x) = x/(x²+1). Its derivative is (1−x²)/(x²+1)², which is negative for x>1. So the terms b_n are decreasing for n≥2. Since the Alternating Series Test only requires eventual decreasing, the series converges. This example shows how to combine differentiation with the alternating series test. It's a common technique when the terms are rational functions that aren't obviously monotonic from inspection alone.

---

### Slide 5 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Pause: Does This Series Converge?**  ·  `split_left_right`

**On-screen text** `[14w]`
∑ (-1)^n / √n: does it converge? Is it absolute or conditional? Try it.

**LEFT** `[text]`

**Test $\sum_{n=1}^{\infty} \frac{(-1)^n}{\sqrt{n}}$ for convergence.**

Think about the three conditions. Is the series absolutely or conditionally convergent?

**RIGHT** `[visual_spec]`

*Visual Spec:* Simple display: large question mark, series formula, blank space for answer.

**Teacher Narration** `[77w]`
> Take a moment to test this series yourself. Write down the steps: what is b_n? Is it decreasing? Does the limit go to zero? Then think about the absolute series. I'll give you a few seconds to try, then we'll go through the answer. Remember that the absolute series is ∑ 1/√n, which is a p-series with p=1/2. Since p ≤ 1, that absolute series diverges. So if the alternating version converges, it will be conditionally convergent.

**Student Prompt:** Before revealing the answer, try to determine convergence and classify as absolutely or conditionally convergent.

---

### Slide 6 · [PRACTICE]
**Solution: ∑ (-1)^n / √n**  ·  `split_left_right`

**On-screen text** `[7w]`
Converges conditionally: AST works, absolute series diverges.

**LEFT** `[steps]`

1. $b_n = 1/\sqrt{n} > 0$
2. Decreasing? $b_{n+1} < b_n$ since denominator increases.
3. $\lim b_n = 0$ → AST gives convergence.
4. Absolute series: $\sum 1/\sqrt{n}$ = p-series with p=1/2 → diverges.

**Conclusion:** Conditionally convergent.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot partial sums of original series (blue) and absolute partial sums (red) for n=1..50. Show how absolute sum grows without bound while alternating sum stabilizes around -0.6. Set y-axis range from -2 to 5.

**Teacher Narration** `[64w]`
> The series converges by the Alternating Series Test because b_n = 1/√n decreases to zero. But the absolute series ∑ 1/√n is a p-series with p=1/2, which diverges. So this series is conditionally convergent—it converges only because of cancellation. If you rearranged the terms, you could change the sum dramatically. This is a classic example that illustrates the difference between absolute and conditional convergence.

---

### Slide 7 · [CORE]
**Absolute Convergence**  ·  `split_left_right`

**On-screen text** `[10w]`
Absolute convergence: ∑ |a_n| converges. Conditional: converges but not absolute.

**LEFT** `[formula_block]`

A series $\sum a_n$ is **absolutely convergent** if $\sum |a_n|$ converges.

It is **conditionally convergent** if $\sum a_n$ converges but $\sum |a_n|$ diverges.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a large rectangle labeled 'All series'. Inside, a circle labeled 'Convergent'. Inside that, a shaded circle labeled 'Absolutely convergent'. The region in 'Convergent' but outside 'Absolutely convergent' is labeled 'Conditionally convergent'. The 'Absolutely convergent' circle should be about half the diameter of the 'Convergent' circle, centered within it.

**Teacher Narration** `[70w]`
> Absolute convergence is a stronger condition: if the series of absolute values converges, then the original series also converges. Conditional convergence means the series only converges because of sign cancellation. This distinction matters because conditionally convergent series are fragile—rearranging terms can change the sum or even cause divergence. The Riemann rearrangement theorem tells us that conditionally convergent series can be rearranged to converge to any real number or even diverge.

---

### Slide 8 · [CORE]
**Absolute Convergence Implies Convergence Theorem**  ·  `split_left_right`

**On-screen text** `[8w]`
Absolute convergence implies convergence. Proof uses Comparison Test.

**LEFT** `[formula_block]`

**Theorem:** If $\sum |a_n|$ converges, then $\sum a_n$ converges.

**Proof idea:**
- $0 \le a_n + |a_n| \le 2|a_n|$
- $\sum 2|a_n|$ converges → $\sum (a_n+|a_n|)$ converges (Comparison Test)
- Then $\sum a_n = \sum (a_n+|a_n|) - \sum |a_n|$ converges.

**RIGHT** `[visual_spec]`

*Visual Spec:* Flowchart: Start with '∑ |a_n| converges' → '∑ 2|a_n| converges' → '0 ≤ a_n+|a_n| ≤ 2|a_n|' → '∑ (a_n+|a_n|) converges by Comparison' → '∑ a_n = ∑ (a_n+|a_n|) - ∑ |a_n| converges'. Arrange boxes vertically with downward arrows. Use rounded rectangles for boxes and solid arrowheads.

**Teacher Narration** `[61w]`
> This theorem is our safety net. If we can show absolute convergence, we automatically get convergence of the original series. The proof uses a clever inequality: a_n plus its absolute value is always between 0 and 2|a_n|. Since ∑ 2|a_n| converges, the Comparison Test forces ∑ (a_n+|a_n|) to converge, and then the original series is the difference of two convergent series.

---

### Slide 9 · [VISUAL_LAB] 🎛 *[2 controls]*
**Visual Lab: Partial Sums of Alternating Series**  ·  `split_left_right`

**On-screen text** `[11w]`
Slider controls number of terms. Watch partial sums approach ln 2.

**LEFT** `[text]`

Explore how partial sums approach the limit. Use the slider to adjust the number of terms. Observe how the even and odd partial sums bracket the limit.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot partial sums S_n = ∑_{k=1}^n (-1)^{k+1}/k for n from 1 to N (controlled by slider). Show horizontal line at limit ln 2. Indicate whether current partial sum is below or above the limit with color (green if below, red if above).

*Interactive Controls:*
  - 🎛 Slider for number of terms from 1 to 50
  - 🎛 Toggle: show/hide error band (not implemented in code above, but can be added)

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(7,5))
plt.subplots_adjust(bottom=0.25)

N_max = 50
n_vals = np.arange(1, N_max+1)
terms = (-1)**(n_vals+1) / n_vals
partial_sums = np.cumsum(terms)
limit = np.log(2)

line, = ax.plot(n_vals, partial_sums, 'b-o', markersize=3, label='Partial sums')
ax.axhline(limit, color='r', linestyle='--', label='Limit = ln 2')
ax.set_xlabel('n')
ax.set_ylabel('S_n')
ax.legend()
ax.grid(True, alpha=0.3)
ax.set_xlim(1, N_max)
ax.set_ylim(0.5, 0.8)

ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 'Number of terms', 1, N_max, valinit=20, valstep=1)

def update(val):
    N = int(slider.val)
    line.set_data(n_vals[:N], partial_sums[:N])
    ax.set_xlim(1, N if N>1 else 2)
    plt.draw()

slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[60w]`
> This interactive plot shows partial sums of the alternating harmonic series. Notice how they oscillate around the limit ln 2. Even partial sums are below the limit, odd sums are above. As you add more terms, the oscillations shrink. This visualizes why the alternating series test requires the terms to decrease to zero—the swings get smaller, so the sum settles.

**Student Prompt:** Try moving the slider back and forth. What happens if you use terms that do not decrease? (e.g., 1/n instead of 1/n^2?)

---

### Slide 10 · [VISUAL_LAB] 🎛 *[1 controls]*
**Visual Lab: Absolute vs Conditional Convergence**  ·  `split_left_right`

**On-screen text** `[13w]`
Green: absolutely convergent (approaches π²/6). Blue: conditional (approaches ln 2). Red: divergent harmonic.

**LEFT** `[text]`

Compare three series: ∑ 1/n² (absolute convergent), ∑ (-1)^{n+1}/n (conditional convergent), and ∑ 1/n (divergent). Use the button to reset.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot three lines on same axes: absolute convergent (green, ∑ 1/n²), conditional convergent (blue, ∑ (-1)^{n+1}/n), divergent harmonic (red, ∑ 1/n). X-axis: n, Y-axis: partial sum. Show legend. Add a button to reset view. Set y-axis range from 0 to 5. Label lines with colors and series names.

*Interactive Controls:*
  - 🎛 Button: reset view

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Button

fig, ax = plt.subplots(figsize=(7,5))
plt.subplots_adjust(bottom=0.2)

N_max = 100
n = np.arange(1, N_max+1)

abs_conv = np.cumsum(1/n**2)
cond_conv = np.cumsum((-1)**(n+1)/n)
harmonic = np.cumsum(1/n)

line_abs, = ax.plot(n, abs_conv, 'g-', label='∑ 1/n² (absolute conv)')
line_cond, = ax.plot(n, cond_conv, 'b-', label='∑ (-1)^{n+1}/n (conditional)')
line_harm, = ax.plot(n, harmonic, 'r--', label='∑ 1/n (divergent)')

ax.legend()
ax.set_xlabel('n')
ax.set_ylabel('Partial sum')
ax.grid(True, alpha=0.3)
ax.set_xlim(1, N_max)
ax.set_ylim(0, 5)

ax_button = plt.axes([0.45, 0.05, 0.1, 0.04])
button = Button(ax_button, 'Reset')
def reset(event):
    ax.set_xlim(1, N_max)
    ax.set_ylim(0, 5)
    plt.draw()
button.on_clicked(reset)

plt.show()
```

**Teacher Narration** `[66w]`
> This plot shows three series side by side. The green line ∑ 1/n² converges to about 1.64. The blue alternating harmonic series converges to ln 2 (about 0.69). The red harmonic series grows without bound—it diverges. The interesting part is that the blue and red series use the same absolute terms 1/n, but the alternating signs make the difference between convergence and divergence. That's conditional convergence.

**Student Prompt:** Why does the green series converge even though all terms are positive? (It's a p-series with p>1.)

---

### Slide 11 · [MISCONCEPTION] 🟡
**Common Mistake: Forgetting to Check Decreasing**  ·  `split_left_right`

**On-screen text** `[12w]`
The terms must be decreasing. A term like 1/(√n+(-1)^n) is NOT decreasing.

**LEFT** `[text]`

**Wrong approach:**
"For $\sum \frac{(-1)^n}{\sqrt{n} + (-1)^n}$, the terms look like $1/\sqrt{n}$ which goes to zero, so it converges."

**Why it's wrong:** The presence of $(-1)^n$ in the denominator breaks the monotonic decrease. The sequence $b_n = 1/(\sqrt{n}+(-1)^n)$ is not decreasing. AST does not apply.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot b_n for n=1..30. Highlight that b_2 > b_1, b_4 > b_3, etc. Use red circles for points that are not decreasing and blue circles for points that are decreasing. Draw arrows (e.g., upward red arrows) to indicate where the sequence increases.

**Teacher Narration** `[62w]`
> A very common mistake is to only check the limit condition and ignore the decreasing condition. Here the terms are 1 over sqrt(n) plus a wobble. Because the denominator alternates between adding and subtracting 1, the terms bounce up and down. They do not satisfy the decreasing condition, so the Alternating Series Test cannot be applied. You must always verify both conditions.

**Student Prompt:** Can you find a different test that might work on this series? (Hint: Try the divergence test first.)

---

### Slide 12 · [PRACTICE] 🟡
**Example: Irregular Signs (cos n) - Using Absolute Convergence**  ·  `split_left_right`

**On-screen text** `[10w]`
Irregular signs? Bound |cos n| ≤ 1, compare to p-series.

**LEFT** `[steps]`

**Test $\sum \frac{\cos n}{n^2}$**

1. Bound absolute value: $|\frac{\cos n}{n^2}| \le \frac{1}{n^2}$
2. $\sum \frac{1}{n^2}$ converges (p-series, p=2)
3. By Comparison Test, $\sum |\frac{\cos n}{n^2}|$ converges.
4. Therefore original series converges absolutely (and hence converges).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot partial sums S_n = ∑_{k=1}^n cos(k)/k^2 for n=1..50. Show it settling. Also plot the absolute partial sums to show they also converge. Use blue for original series and red for absolute series. Set y-axis range from 0 to 1.2. Label both lines.

**Teacher Narration** `[62w]`
> When signs are irregular like cos n, the Alternating Series Test doesn't apply because signs don't alternate in a fixed pattern. Instead, we take absolute values and bound them. Since |cos n| ≤ 1, the absolute series is bounded by ∑ 1/n², which converges. So the original series converges absolutely. This technique works for many series with trigonometric or other oscillating terms.

---

### Slide 13 · [PRACTICE] 🟡
**Example: Ratio Test for Absolute Convergence**  ·  `split_left_right`

**On-screen text** `[10w]`
Ratio test: limit = 1/2 < 1 → absolute convergence.

**LEFT** `[steps]`

**Test $\sum \frac{(-1)^n n}{2^n}$ for absolute convergence**

1. $|a_n| = \frac{n}{2^n}$
2. Compute $\lim \frac{|a_{n+1}|}{|a_n|} = \lim \frac{n+1}{2^{n+1}} \cdot \frac{2^n}{n} = \lim \frac{n+1}{2n} = \frac12$
3. Since $\frac12 < 1$, $\sum |a_n|$ converges.
4. Original series converges absolutely.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot ratio |a_{n+1}|/|a_n| for n=1..20, with a horizontal dashed line at 1/2. Show the limit approaching 0.5. Set y-axis range from 0 to 1. Annotate the limit line with text 'Limit = 1/2'.

**Teacher Narration** `[83w]`
> For series with exponentials or factorials, the Ratio Test is most efficient. Here the absolute terms are n/2^n. The ratio of consecutive terms simplifies to (n+1)/(2n), which has limit 1/2. Since that limit is less than 1, the series of absolute values converges, and thus the original series converges absolutely. This is often faster than the Alternating Series Test. The Ratio Test is particularly useful because it directly tests absolute convergence, and it works well for series where terms involve exponentials or factorials.

---

### Slide 14 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Conditional Convergence of ∑ (-1)^n / ln n**  ·  `split_left_right`

**On-screen text** `[9w]`
[Challenge] ∑ (-1)^n/ln n converges conditionally. Absolute series diverges.

**LEFT** `[steps]`

**Test $\sum_{n=2}^{\infty} \frac{(-1)^n}{\ln n}$**

1. $b_n = 1/\ln n$ positive, decreasing, limit 0 → AST gives convergence.
2. Absolute series: $\sum 1/\ln n$ diverges by comparison to harmonic: $1/\ln n > 1/n$ for $n\ge 3$.
3. Hence conditionally convergent.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot 1/ln n and 1/n for n=2..30. Note that 1/ln n > 1/n, so by Comparison Test the sum 1/ln n diverges. Show partial sums of absolute series growing. Use blue for 1/ln n and red for 1/n. Set y-axis range from 0 to 1.5. For partial sums, plot cumulative sum of 1/ln n in a separate subplot or overlay with y-axis on the right.

**Teacher Narration** `[69w]`
> This series converges by AST because 1/ln n decreases to zero. But the absolute series diverges because 1/ln n is larger than 1/n for large n, and we know the harmonic series diverges. So it's conditionally convergent. This is an example where the series converges very slowly—the limit of ln n to zero is extremely slow. It shows that conditional convergence can happen even with very slowly decaying terms.

**Student Prompt:** Why is it important to know whether a series is conditionally convergent? (Hint: Riemann rearrangement theorem.)

---

### Slide 15 · [SUMMARY]
**Summary & Key Takeaways**  ·  `full_width`

**On-screen text** `[10w]`
AST: check three conditions. Absolute => convergent. Conditional is fragile.

**FULL WIDTH** `[text]`

**Learning Objectives met:**
- Alternating Series Test: three conditions (positive, decreasing, limit zero).
- Absolute convergence: ∑ |a_n| converges → original converges.
- Conditional convergence: converges but not absolute.
- Use Ratio Test or Comparison Test to prove absolute convergence.

**Common Pitfalls:**
- Don't forget to check decreasing condition.
- Absolute vs conditional ≠ convergent vs divergent.
- Absolute convergence is stronger.

**Teacher Narration** `[68w]`
> Today we covered two important concepts: the Alternating Series Test and the distinction between absolute and conditional convergence. Remember that absolute convergence is a stronger condition—it guarantees ordinary convergence and protects against weird behavior when rearranging terms. The Alternating Series Test is simple but you must check both the decreasing and limit conditions. Use the Ratio Test for factorials or exponentials. Keep practicing and you'll master these ideas.

---
