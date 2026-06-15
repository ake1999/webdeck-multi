# The Ratio and Root Tests

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** Understand absolute convergence and basic convergence tests (p-series, geometric series, divergence test).

**Learning Objectives:**
- Calculate limits of ratios and nth roots to determine series convergence
- Apply the Ratio Test to series containing factorials and nth powers
- Apply the Root Test to series with terms raised to the nth power
- Interpret the inconclusive case (L = 1) and know when to use alternative tests
- Analyze whether a series converges absolutely, conditionally, or diverges

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 65w)
⚠️ **Narration too short (<60w):** [7]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s7:54w']
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
| 1 | hook | 🟢 | ◧ |  | 77w | 15w | Why Do Some Infinite Sums Converge? |
| 2 | core | 🟢 | ◧ |  | 66w | 15w | The Ratio Test |
| 3 | core | 🟢 | ◧ |  | 66w | 15w | The Root Test |
| 4 | practice | 🟢 | ◧ |  | 73w | 15w | Example 1: Warm-Up – Ratio Test with Factorials |
| 5 | practice | 🟢 | ◧ |  | 68w | 9w | Example 2: Standard – Root Test with nth Powers |
| 6 | misconception | 🟢 | ◧ |  | 66w | 15w | Common Mistake: Forgetting the Absolute Value |
| 7 | 🎛pause_and_try | 🟡 | ◧ | ⏸️ | 54w⚠️ | 11w | Pause and Try – Which Test for $\sum \frac{n!}{n^n}$? |
| 8 | practice | 🟡 | ◧ |  | 61w | 11w | Example 3: Tricky – Factorial vs Exponential (Solution) |
| 9 | practice | 🟡 | ◧ |  | 63w | 15w | Example 4: Edge Case – When Both Tests Fail |
| 10 | practice | 🟡 | ◧ |  | 65w | 13w | Example 5: Application – Alternating Signs and Factorials |
| 11 | 🎛visual_lab | 🟢 | ◧ |  | 65w | 15w | Interactive: Ratio Test Visualizer |
| 12 | 🎛visual_lab | 🟢 | ◧ |  | 61w | 12w | Interactive: Root Test Visualizer |
| 13 | summary | 🟢 | ⬛⬛ |  | 61w | 15w | Summary – When to Use Ratio vs Root |
| 14 | challenge | 🔴 | ◧ |  | 65w | 16w | [Challenge – Optional] Why the Ratio Test Works (Proof Sketch) |

---

### Slide 1 · [HOOK]
**Why Do Some Infinite Sums Converge?**  ·  `split_left_right`

**On-screen text** `[15w]`
Series converge when terms shrink fast enough. Ratio and Root tests measure the 'shrink rate'.

**LEFT** `[text]`

Imagine tracking a bacterial colony: if population shrinks by half daily, it vanishes (converges). If it doubles daily, it explodes (diverges). The Ratio Test measures this daily growth rate; the Root Test checks average growth per step.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two sequences: a_n = (0.5)^n (convergent) and b_n = 2^n (divergent) from n=1 to 20. Use circles for points, different colors. Animate the addition of points one by one. So that around n=10 the red series is near zero and the blue series is huge. Animate with a for loop and pause in matplotlib.

```python
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.animation import FuncAnimation

fig, ax = plt.subplots(figsize=(8, 5))
ax.set_xlim(1, 20)
ax.set_ylim(-1, 20)
ax.axhline(0, color='gray', linestyle='--', alpha=0.5)
ax.set_xlabel('n')
ax.set_ylabel('a_n')
ax.set_title('Convergent vs Divergent Series')

n_vals = np.arange(1, 21)
convergent = 0.5 ** n_vals
divergent = 2 ** n_vals

red_dots, = ax.plot([], [], 'ro', markersize=8, label='Convergent (0.5^n)')
blue_dots, = ax.plot([], [], 'bo', markersize=8, label='Divergent (2^n)')
ax.legend()

def init():
    red_dots.set_data([], [])
    blue_dots.set_data([], [])
    return red_dots, blue_dots

def update(frame):
    red_dots.set_data(n_vals[:frame], convergent[:frame])
    blue_dots.set_data(n_vals[:frame], divergent[:frame])
    return red_dots, blue_dots

ani = FuncAnimation(fig, update, frames=range(1, 21), init_func=init, blit=True, interval=500, repeat=True)
plt.show()
```

**Teacher Narration** `[77w]`
> Think about two bacterial colonies. One colony shrinks by half each day — eventually it vanishes. The other doubles each day — it explodes. Infinite series behave in exactly the same way. The Ratio Test compares each term to the previous one, like checking daily population ratios. The Root Test looks at the nth root, revealing the average growth per step. Today we learn how to apply these tests to decide if a series converges or diverges.

---

### Slide 2 · [CORE]
**The Ratio Test**  ·  `split_left_right`

**On-screen text** `[15w]`
Ratio Test: L = lim |a_{n+1}/a_n|. Converges if L<1, diverges if L>1, inconclusive if L=1.

**LEFT** `[formula_block]`

$$
\lim_{n \to \infty} \left| \frac{a_{n+1}}{a_n} \right| = L
$$

**Decision rule:**
- If $L < 1$ → series converges absolutely.
- If $L > 1$ (or $\infty$) → series diverges.
- If $L = 1$ → test is inconclusive (try another test).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two subplots. Left: line graph of |a_{n+1}/a_n| for a convergent series (e.g., a_n=1/2^n) approaching 0.5. Right: diverging series ratios approaching 2. Use markers. Both have green dashed line at y=1. Title 'Ratio Test'.

**Teacher Narration** `[66w]`
> The Ratio Test comes from comparing a series to a geometric series. If the ratio of successive terms approaches a number less than one, the series behaves like a convergent geometric series. If the ratio is greater than one, it diverges. Notice the absolute values – we test for absolute convergence. When L exactly equals one, the test tells us nothing – we need another method.

---

### Slide 3 · [CORE]
**The Root Test**  ·  `split_left_right`

**On-screen text** `[15w]`
Root Test: L = lim |a_n|^{1/n}. Converges if L<1, diverges if L>1, inconclusive if L=1.

**LEFT** `[formula_block]`

$$
\lim_{n \to \infty} \sqrt[n]{|a_n|} = L
$$

**Decision rule:**
- If $L < 1$ → series converges absolutely.
- If $L > 1$ (or $\infty$) → series diverges.
- If $L = 1$ → test is inconclusive (try another test).

**RIGHT** `[visual_spec]`

*Visual Spec:* Same layout as Slide 2 but for root test: plot |a_n|^{1/n} vs n. For convergent: use a_n = ((3n+1)/(4n+1))^n so limit ~0.75. For divergent: a_n = ((4n+1)/(3n+1))^n so limit >1. Use markers. Threshold line at y=1.

**Teacher Narration** `[66w]`
> The Root Test is especially powerful when terms are raised to the nth power. It effectively 'unwraps' the exponent. Like the Ratio Test, it compares to a geometric series. If the limit L is less than one, absolute convergence follows. Be careful: both tests fail when L equals one. However, they are not equivalent – one might give a conclusive answer where the other gives L=1.

---

### Slide 4 · [PRACTICE]
**Example 1: Warm-Up – Ratio Test with Factorials**  ·  `split_left_right`

**On-screen text** `[15w]`
Sum 2^n / n! from 1 to infinity. Ratio = 2/(n+1) → 0. Converges absolutely.

**LEFT** `[steps]`

Test $\sum_{n=1}^{\infty} \frac{2^n}{n!}$.

1. $a_n = \frac{2^n}{n!}$.
2. $|\frac{a_{n+1}}{a_n}| = \frac{2}{n+1}$.
3. $\lim_{n\to\infty} \frac{2}{n+1} = 0 < 1$.
4. Series converges absolutely.

**RIGHT** `[visual_spec]`

*Visual Spec:* Bar chart of a_n = 2^n / n! for n=1..10, values decaying. Second plot: line of ratio = 2/(n+1) for n=1..10 with threshold line at y=1.

**Teacher Narration** `[73w]`
> Here our series has a factorial in the denominator. Factorials grow faster than exponentials, so the ratio shrinks to zero. We set up the ratio of consecutive terms, cancel carefully, and get a simple limit. The limit is zero, well below one, so the series converges absolutely. This example shows why the Ratio Test is perfect for factorials. It is a good warm-up because the algebra is straightforward and the conclusion is clear.

---

### Slide 5 · [PRACTICE]
**Example 2: Standard – Root Test with nth Powers**  ·  `split_left_right`

**On-screen text** `[9w]`
Sum ((2n+3)/(3n+2))^n. nth root = (2n+3)/(3n+2) → 2/3. Converges.

**LEFT** `[steps]`

Test $\sum_{n=1}^{\infty} \left(\frac{2n+3}{3n+2}\right)^n$.

1. $a_n = \left(\frac{2n+3}{3n+2}\right)^n$.
2. $\sqrt[n]{|a_n|} = \frac{2n+3}{3n+2}$.
3. $\lim_{n\to\infty} \frac{2n+3}{3n+2} = \frac{2}{3} < 1$.
4. Series converges absolutely.

**RIGHT** `[visual_spec]`

*Visual Spec:* Line plot of (2n+3)/(3n+2) for n=1..50. Markers, blue line. Horizontal lines at y=2/3 (dashed purple) and y=1 (dashed green).

**Teacher Narration** `[68w]`
> When you see a term raised to the nth power, the Root Test is often your best friend. We take the nth root, which removes the exponent, leaving a rational function. As n goes to infinity, the limit is 2/3, less than one. So the series converges absolutely. Notice how directly the Root Test gives the answer. This example is a standard application that shows the test's efficiency.

---

### Slide 6 · [MISCONCEPTION]
**Common Mistake: Forgetting the Absolute Value**  ·  `split_left_right`

**On-screen text** `[15w]`
Always use absolute value in Ratio and Root tests. Forgetting it can give wrong conclusions.

**LEFT** `[text]`

For $\sum_{n=1}^{\infty} \frac{(-1)^n}{n^2}$, computing $\frac{a_{n+1}}{a_n}$ without absolute value gives $-\frac{n^2}{(n+1)^2} \to -1$.

**Wrong conclusion:** Since $-1 < 1$, some might think the series converges by Ratio Test.

**Correct:** Always use absolute value. Then limit is $1$, so Ratio Test is inconclusive. Use Alternating Series Test.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two plots: left plot of a_{n+1}/a_n (no abs) approaching -1; right plot of |a_{n+1}/a_n| approaching 1. Both have y=1 line. Emphasize that left is wrong.

**Teacher Narration** `[66w]`
> A frequent error is to omit the absolute value when computing the ratio. For alternating series like this, the ratio without absolute value might be -1, which is less than one in absolute value, but the test requires the absolute value. With absolute value, the limit is 1, which is inconclusive. So you must then use the Alternating Series Test. Always include the absolute value symbols.

---

### Slide 7 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause and Try – Which Test for $\sum \frac{n!}{n^n}$?**  ·  `split_left_right`

**On-screen text** `[11w]`
Sum n!/n^n. Pause: which test? Predict limit. Then click to reveal.

**LEFT** `[text]`

We need to test convergence of $\sum_{n=1}^{\infty} \frac{n!}{n^n}$.

**Your turn:** Decide whether to use Ratio Test or Root Test. Predict the limit.

Click the button to reveal the solution.

**RIGHT** `[visual_spec]`

*Visual Spec:* Use matplotlib Figure with a Button widget. Initially display text 'Choose test'. On button click, clear and display the steps: 'Ratio Test: |a_{n+1}/a_n| = (n/(n+1))^n → 1/e < 1, so converges.'

*Interactive Controls:*
  - 🎛 Button: reveal solution

**Teacher Narration** `[54w ⚠️ **TOO SHORT: 54w < 60w min**]`
> Before we work through, take a moment to decide: for this series with a factorial and n to the n, which test do you think works better? The Ratio Test or the Root Test? Make your prediction, then click the button to see the solution. This pause helps you think critically about test selection.

**Student Prompt:** Which test would you use? Predict the limit L.

---

### Slide 8 · [PRACTICE] 🟡
**Example 3: Tricky – Factorial vs Exponential (Solution)**  ·  `split_left_right`

**On-screen text** `[11w]`
Sum n!/n^n. Ratio Test: limit = 1/e < 1. Converges absolutely.

**LEFT** `[steps]`

Test $\sum_{n=1}^{\infty} \frac{n!}{n^n}$.

1. Ratio Test: $a_n = \frac{n!}{n^n}$.
2. $|\frac{a_{n+1}}{a_n}| = \frac{(n+1)!/(n+1)^{n+1}}{n!/n^n} = \left(\frac{n}{n+1}\right)^n$.
3. $\lim_{n\to\infty} \left(\frac{n}{n+1}\right)^n = \frac{1}{e} < 1$.
4. Series converges absolutely.

**RIGHT** `[visual_spec]`

*Visual Spec:* Line plot of ratio (n/(n+1))^n for n=1..30, approaching 1/e. Horizontal line at y=1/e (dashed) and y=1 (dashed).

**Teacher Narration** `[61w]`
> Now we see the solution. The Ratio Test simplifies beautifully, giving (n/(n+1))^n. As n grows, this approaches 1/e, which is about 0.3679, well below 1. So the series converges. The Root Test would be messy because of the factorial. This example reinforces the idea: use the Ratio Test when factorials are present. The limit 1/e is a classic result worth remembering.

---

### Slide 9 · [PRACTICE] 🟡
**Example 4: Edge Case – When Both Tests Fail**  ·  `split_left_right`

**On-screen text** `[15w]`
Sum 1/n^2. Ratio & Root both give L=1 (inconclusive). But p-series test says converges (p=2>1).

**LEFT** `[steps]`

Test $\sum_{n=1}^{\infty} \frac{1}{n^2}$.

1. Ratio: $|\frac{a_{n+1}}{a_n}| = \frac{n^2}{(n+1)^2} \to 1$.
2. Root: $\sqrt[n]{|a_n|} = n^{-2/n} \to 1$.
3. Both inconclusive.
4. Known p-series: $p=2>1$, so converges.

**RIGHT** `[visual_spec]`

*Visual Spec:* Side-by-side subplots: left plot of ratio vs n approaching 1; right plot of nth root (n^{-2/n}) approaching 1. Below, text overlay: 'p-series with p=2>1 → converges'.

**Teacher Narration** `[63w]`
> Even the best tools have limits. For the p-series 1/n^2, both the Ratio and Root Tests give L equals 1, meaning inconclusive. Yet we know from the p-series test that it converges. This is why you need a toolkit of convergence tests. When L equals one, switch to another test like comparison or integral. This example highlights the importance of knowing multiple tests.

---

### Slide 10 · [PRACTICE] 🟡
**Example 5: Application – Alternating Signs and Factorials**  ·  `split_left_right`

**On-screen text** `[13w]`
Sum (-3)^n/n!. Ratio (abs) = 3/(n+1) → 0. Converges absolutely. Related to e^{-3}.

**LEFT** `[steps]`

Test $\sum_{n=1}^{\infty} \frac{(-3)^n}{n!}$.

1. $|\frac{a_{n+1}}{a_n}| = \frac{3}{n+1}$.
2. $\lim_{n\to\infty} \frac{3}{n+1} = 0 < 1$.
3. Series converges absolutely.
4. (Related to Taylor series for $e^{-3}$.)

**RIGHT** `[visual_spec]`

*Visual Spec:* Line plot of absolute ratio 3/(n+1) vs n (converging to 0). Second plot of partial sums S_N vs N, approaching e^{-3} (dashed line).

**Teacher Narration** `[65w]`
> Our last example combines alternating signs from (-3)^n and a factorial. The absolute value removes the sign, and the limit simplifies to 3/(n+1) which goes to zero. So the series converges absolutely. In fact, this is the Taylor series for e to the minus 3 centered at zero. Applications like this show the power of the Ratio Test. It connects abstract series to concrete functions.

---

### Slide 11 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive: Ratio Test Visualizer**  ·  `split_left_right`

**On-screen text** `[15w]`
Explore the Ratio Test. Adjust the base and see if the ratio limit crosses 1.

**LEFT** `[concept]`

Explore the Ratio Test by adjusting parameters. See how the ratio of terms behaves and whether it crosses the threshold L=1.

**RIGHT** `[python_lab]`

*Visual Spec:* Two plots: top shows series terms a_n = a^n / n! for n up to N, bottom shows ratio |a_{n+1}/a_n|. Use sliders for base a (0.5 to 5) and max n (1 to 30). Highlight threshold at 1.

*Interactive Controls:*
  - 🎛 Slider for base a from 0.5 to 5
  - 🎛 Slider for max n from 1 to 30

```python
import matplotlib.pyplot as plt
import numpy as np
from math import factorial
from matplotlib.widgets import Slider

# Initialize
n_max = 20
base = 2.0
n_vals = np.arange(1, n_max+1)
terms = [base**n / factorial(n) for n in n_vals]
ratios = terms[1:] / terms[:-1]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
plt.subplots_adjust(bottom=0.3)

ax1.plot(n_vals, terms, 'b-o')
ax1.axhline(0, color='gray', ls='--')
ax1.set_xlabel('n'); ax1.set_ylabel('a_n')
ax1.set_title('Series terms')

line2, = ax2.plot(n_vals[1:], ratios, 'r-o')
ax2.axhline(1, color='green', ls='--', label='L=1')
ax2.set_xlabel('n'); ax2.set_ylabel('|a_{n+1}/a_n|')
ax2.set_title('Ratio Test')
ax2.legend()

# Sliders
ax_slider_a = plt.axes([0.2, 0.15, 0.6, 0.03])
slider_a = Slider(ax_slider_a, 'base a', 0.5, 5.0, valinit=base)

ax_slider_n = plt.axes([0.2, 0.07, 0.6, 0.03])
slider_n = Slider(ax_slider_n, 'max n', 1, 30, valinit=n_max, valstep=1)

def update(val):
    a = slider_a.val
    N = int(slider_n.val)
    n_vals = np.arange(1, N+1)
    terms = [a**n / factorial(n) for n in n_vals]
    ratios = np.array(terms[1:]) / np.array(terms[:-1])
    ax1.clear(); ax1.plot(n_vals, terms, 'b-o'); ax1.axhline(0, color='gray', ls='--'); ax1.set_xlabel('n'); ax1.set_title('Series terms')
    ax2.clear(); ax2.plot(n_vals[1:], ratios, 'r-o'); ax2.axhline(1, color='green', ls='--', label='L=1'); ax2.set_xlabel('n'); ax2.set_title('Ratio Test'); ax2.legend()
    fig.canvas.draw_idle()

slider_a.on_changed(update)
slider_n.on_changed(update)

plt.show()
```

**Teacher Narration** `[65w]`
> Now you can explore the Ratio Test interactively. Slide the base a and see how the ratio of terms changes. When the limit stays below one, the series converges. If it goes above, it diverges. Notice that for a^n/n!, the ratio is |a|/(n+1) which tends to 0, so the Ratio Test always gives L=0, confirming convergence for any a. Try other series if you want.

**Student Prompt:** Try base a=2 and see the ratio. Now try a=3. What happens to the limit? Pause and predict.

---

### Slide 12 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive: Root Test Visualizer**  ·  `split_left_right`

**On-screen text** `[12w]`
Explore the Root Test. Change coefficients and see the nth root limit.

**LEFT** `[concept]`

Explore the Root Test by adjusting the coefficients inside the nth power. Watch the nth root converge to a limit.

**RIGHT** `[python_lab]`

*Visual Spec:* Single plot of nth root = (p*n+q)/(r*n+s) vs n with sliders for p,q,r,s, and threshold lines at limit and 1.

*Interactive Controls:*
  - 🎛 Slider for numerator coefficient p
  - 🎛 Slider for denominator coefficient r

```python
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.widgets import Slider

n_max = 50
p,q,r,s = 2,3,3,2

fig, ax = plt.subplots(figsize=(8,4))
plt.subplots_adjust(bottom=0.35)

n = np.arange(1, n_max+1)
root = (p*n+q)/(r*n+s)
line, = ax.plot(n, root, 'b-', label='nth root')
ax.axhline(1, color='green', ls='--', label='L=1')
ax.axhline(p/r, color='purple', ls='--', label='Limit')
ax.set_xlabel('n'); ax.set_ylabel('|a_n|^{1/n}')
ax.set_title('Root Test')
ax.legend()

ax_slider_p = plt.axes([0.2, 0.2, 0.6, 0.03])
ax_slider_r = plt.axes([0.2, 0.14, 0.6, 0.03])
slider_p = Slider(ax_slider_p, 'num coeff p', 1, 10, valinit=p)
slider_r = Slider(ax_slider_r, 'denom coeff r', 1, 10, valinit=r)

def update(val):
    p = slider_p.val
    r = slider_r.val
    root = (p*n+q)/(r*n+s)
    line.set_ydata(root)
    ax.set_ylim(min(root)-0.5, max(root)+0.5)
    # update limit line
    ax.lines[2].set_ydata(np.full(n_max, p/r))
    fig.canvas.draw_idle()

slider_p.on_changed(update)
slider_r.on_changed(update)

plt.show()
```

**Teacher Narration** `[61w]`
> Similarly, here you can adjust the coefficients inside the nth power term. Watch the nth root stabilize to a limit. If the limit is less than one, the series converges; greater than one, diverges. This visual helps you see why the Root Test works: it unwraps the exponent and reveals the underlying growth rate. Experiment with different values to build intuition.

**Student Prompt:** Set numerator coefficient to 2 and denominator to 3. What's the limit? Now try 3 and 2. What happens?

---

### Slide 13 · [SUMMARY]
**Summary – When to Use Ratio vs Root**  ·  `full_width`

**On-screen text** `[15w]`
Ratio Test: factorials, exponentials. Root Test: nth powers. Both inconclusive at L=1. Try other tests.

**FULL WIDTH** `[text]`

| Test | Best for | Notes |
|------|----------|-------|
| Ratio | Factorials, products, exponentials | Cancels factorials neatly |
| Root | nth powers | Unwraps exponent |
| Both | All series | Inconclusive at L=1; try other tests |

**Key idea:** Both test absolute convergence by comparing to geometric series.

**Teacher Narration** `[61w]`
> Today we learned two powerful convergence tests. The Ratio Test compares successive terms, ideal for factorials. The Root Test unwraps exponents, perfect for nth powers. Both test for absolute convergence and fail when L equals one. Practice with the problems in the description. Next time we'll cover the strategy of choosing among all convergence tests. Remember to always use absolute values.

---

### Slide 14 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Why the Ratio Test Works (Proof Sketch)**  ·  `split_left_right`

**On-screen text** `[16w]`
If L<1, pick r between L and 1. Tail bounded by geometric series. So converges absolutely.

**LEFT** `[steps]`

**Assume $\lim |a_{n+1}/a_n| = L < 1$.**

1. Choose $r$ with $L < r < 1$.
2. For $n \geq N$, $|a_{n+1}| < r |a_n|$.
3. By induction, $|a_{N+k}| < r^k |a_N|$.
4. Tail $\sum_{k=0}^\infty |a_{N+k}| < |a_N| \sum r^k$ (convergent geometric series).
5. So original series converges absolutely by comparison.

Similar argument for $L > 1$ leads to divergence.

**RIGHT** `[visual_spec]`

*Visual Spec:* Flowchart: start with |a_{n+1}| < r|a_n|, then show |a_{N+1}| < r|a_N|, |a_{N+2}| < r^2|a_N|, etc. Then a box: 'Tail bounded by geometric series $|a_N| \sum r^k$'. Then arrow to 'Converges'.

**Teacher Narration** `[65w]`
> For those interested, here's why the Ratio Test works. If L is less than one, we can pick a number r strictly between L and one. For large enough n, the ratio stays below r. Then by repeatedly applying the inequality, the tail of the series is bounded by a geometric series with ratio r, which converges. Similar reasoning applies for L greater than one.

---
