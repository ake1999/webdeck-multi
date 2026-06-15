# The Integral Test and p-Series

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should be comfortable with improper integrals and the definition of series convergence.

**Learning Objectives:**
- Verify the three conditions for applying the Integral Test
- Apply the Integral Test to determine series convergence
- Identify and classify p-series
- Use p-series convergence rules to analyze series
- Estimate series sums using the Integral Test remainder bound

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 65w)
⚠️ **Narration too short (<60w):** [5, 10, 11, 12]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 13 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s5:54w', 's10:55w', 's11:54w', 's12:56w']
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 6 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ |  | 85w | 14w | Surprising Truth About Infinite Sums |
| 2 | 🎛core | 🟢 | ◧ |  | 76w | 18w | p-Series: The Quick Check |
| 3 | 🎛practice | 🟢 | ◧ | ⏸️ | 73w | 7w | Warm-Up Example |
| 4 | 🎛core | 🟢 | ◧ |  | 74w | 9w | The Integral Test Conditions |
| 5 | 🎛visual_lab | 🟢 | ◧ | ⏸️ | 54w⚠️ | 13w | Visual Lab: Integral vs Series |
| 6 | practice | 🟢 | ⬛⬛ |  | 61w | 11w | Example 2: Standard Rational Function |
| 7 | misconception | 🟡 | ◧ |  | 64w | 8w | Misconception: When Decreasing Is Not Obvious |
| 8 | practice | 🟡 | ◧ |  | 69w | 11w | Edge Case: Boundary p-Value |
| 9 | 🎛challenge | 🔴 | ◧ |  | 64w | 22w | [Challenge – Optional] Remainder Estimate |
| 10 | pause_and_try | 🟢 | ◧ | ⏸️ | 55w⚠️ | 9w | Pause: Your Turn |
| 11 | practice | 🟢 | ⬛⬛ |  | 54w⚠️ | 9w | Solution: Your Turn |
| 12 | core | 🟢 | ⬛⬛ |  | 56w⚠️ | 9w | Decision Tree: Which Test to Use? |
| 13 | summary | 🟢 | ⬛⬛ |  | 65w | 12w | Summary and Next Steps |

---

### Slide 1 · [HOOK] 🎛 *[2 controls]*
**Surprising Truth About Infinite Sums**  ·  `split_left_right`

**On-screen text** `[14w]`
The harmonic series diverges even though its terms approach zero. An integral shows why.

**LEFT** `[text]`

**The harmonic series** $\sum_{n=1}^\infty \frac{1}{n}$ diverges even though its terms approach zero. Could a simple integral tell us why?

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot area under curve f(x)=1/x from x=1 to 10, with rectangles of width 1 height 1/n for n=1..10. Use different colors: red for rectangles, blue for curve. Show that the integral diverges (unbounded area) by extending the x-axis to at least 100 and including a text annotation that the area grows without bound as the upper limit increases. X-axis label 'n', y-axis 'value'. Title: 'Harmonic Series: Integral Test Intuition'.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50
  - 🎛 Toggle: show/hide error band

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(1, 100, 2000)
plt.figure(figsize=(6,4))
plt.plot(x, 1/x, 'b-', linewidth=2, label='f(x)=1/x')
for n in range(1,101):
    plt.bar(n, 1/n, width=1, alpha=0.3, color='red', align='edge')
plt.xlabel('n')
plt.ylabel('value')
plt.title('Harmonic Series: Integral Test Intuition')
plt.legend()
plt.grid(alpha=0.3)
plt.text(50, 0.5, 'Area grows without bound', fontsize=12, ha='center')
plt.show()
```

**Teacher Narration** `[85w]`
> Welcome. Today we explore a classic surprise: the harmonic series, summing one over n, diverges. Despite terms shrinking to zero, the total sum grows without bound. The Integral Test will give us a powerful lens to understand this. We'll see that comparing a series to an integral reveals convergence or divergence, and the p-series becomes our first quick-check tool. Think of the integral as measuring the area under the curve, and the series as summing rectangle areas. When the integral diverges, the series does too.

---

### Slide 2 · [CORE] 🎛 *[2 controls]*
**p-Series: The Quick Check**  ·  `split_left_right`

**On-screen text** `[18w]`
p-series: Converges if p > 1, diverges if p ≤ 1. The harmonic series (p=1) is the boundary.

**LEFT** `[concept]`

**Definition:** A p-series is $\sum_{n=1}^\infty \frac{1}{n^p}$

**Convergence Rule:**
- Converges if $p > 1$
- Diverges if $p \leq 1$

Examples:
- $p=2$: converges (sum = $\pi^2/6$)
- $p=1$: diverges (harmonic series)
- $p=0.5$: diverges

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot three curves on same axes: f(x)=1/sqrt(x) (dashed red), f(x)=1/x (solid black), f(x)=1/x^2 (dotted blue) from x=1 to 5. Shade area under each with light color: red for 1/sqrt(x), black for 1/x, blue for 1/x^2. Annotate at x=3: 'p=0.5 diverges', 'p=1 diverges', 'p=2 converges'. Axis labels: x, y. Legend outside plot.

*Interactive Controls:*
  - 🎛 Slider: change parameter p
  - 🎛 Toggle: show/hide exact value

**Teacher Narration** `[76w]`
> The p-series is our fastest tool. When you see a series like one over n to some power, just check that exponent. If p is greater than one, the series converges. If p is one or less, it diverges. Remember the harmonic series at p=1: it's the slowest divergent series you'll encounter. Its terms decrease slowly, and the total sum never reaches a finite limit. This rule comes directly from the Integral Test applied to 1/x^p.

**Student Prompt:** Quick check: Does ∑ 1/n^{0.8} converge?

---

### Slide 3 · [PRACTICE] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Warm-Up Example**  ·  `split_left_right`

**On-screen text** `[7w]`
p = 3/2 > 1 → Converges.

**LEFT** `[steps]`

**Example 1:** Does $\sum_{n=1}^\infty \frac{1}{n^{3/2}}$ converge?

1. Identify $p = \frac{3}{2}$.
2. Compare to 1: $\frac{3}{2} > 1$.
3. Conclusion: Converges (p-series rule).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=1/x^1.5 from x=1 to 10. Fill under curve with light blue. Overlay a rectangle from x=1 to 2 showing one term of the series. X-axis label 'n', y-label 'value'. Title: 'p=1.5: Converges'.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50
  - 🎛 Button: reveal next step

**Teacher Narration** `[73w]`
> Let's start with a straightforward one. Here we have 1 over n to the three-halves. That exponent is 1.5, which is greater than one. According to the p-series rule, this series converges. Quick check: what about 1 over n to the 0.8? That diverges, since 0.8 is less than one. Now let's move to the general test. The visual on the right shows the area under the curve is finite, matching the convergence.

**Student Prompt:** Does ∑ 1/n^{0.8} converge or diverge?

---

### Slide 4 · [CORE] 🎛 *[2 controls]*
**The Integral Test Conditions**  ·  `split_left_right`

**On-screen text** `[9w]`
Continuous, positive, decreasing. Then series and integral share convergence.

**LEFT** `[concept]`

If $f$ is continuous, positive, and decreasing on $[N,\infty)$ and $a_n = f(n)$, then:

$$\sum_{n=N}^\infty a_n \text{ conv.} \iff \int_N^\infty f(x)\,dx \text{ conv.}$$

**Three conditions:**
1. Continuous
2. Positive
3. Decreasing (or eventually decreasing)

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x) = 1/x^2 from 1 to 5. Overlay left rectangles (height f(n)) in red with alpha=0.3 and right rectangles (height f(n+1)) in green with alpha=0.3. X-axis: n, y: f(n). Title: 'Integral Test: Left vs Right Sums'. Legend: 'Left rectangles (overestimate)', 'Right rectangles (underestimate)'.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50
  - 🎛 Toggle: show/hide error band

**Teacher Narration** `[74w]`
> The Integral Test requires three conditions: the function must be continuous, positive, and decreasing on the interval from N onward. If it's eventually decreasing that's fine too. When these hold, the series that takes function values at integers converges exactly when the improper integral of the function converges. The rectangles you see on the right show why: the series sum is trapped between two integrals. This sandwich relationship is the heart of the test.

---

### Slide 5 · [VISUAL_LAB] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Visual Lab: Integral vs Series**  ·  `split_left_right`

**On-screen text** `[13w]`
Move the slider. Does the series sum catch up to the integral area?

**LEFT** `[text]`

Adjust the number of terms $N$ to see how the series sum (rectangles) relates to the integral (area under curve). Cause: The series converges when the integral is finite.

**RIGHT** `[visual_spec]`

*Visual Spec:* Interactive matplotlib plot using ipywidgets. Plot f(x)=1/x^2 from 1 to N+2. For a given N (slider 1 to 30), draw left rectangles (height f(n), width 1, alpha 0.3, red) and right rectangles (height f(n+1), alpha 0.3, green). Shade integral area under curve from 1 to N+2 with light blue. Display numerical values: approximate series sum (∑_{n=1}^N 1/n^2) and integral from 1 to N+2. Title: 'Series sum vs Integral area'. X-axis label 'n', y-label 'f(n)'.

*Interactive Controls:*
  - 🎛 Slider for N from 1 to 30

```python
import numpy as np
import matplotlib.pyplot as plt
from ipywidgets import interact

def update(N):
    x = np.linspace(1, N+2, 200)
    plt.figure(figsize=(8,5))
    plt.plot(x, 1/x**2, 'b-', label='f(x)=1/x^2')
    # left rectangles
    for n in range(1, N+1):
        plt.bar(n, 1/n**2, width=1, alpha=0.3, color='red', align='edge')
    # right rectangles
    for n in range(1, N+1):
        plt.bar(n, 1/(n+1)**2, width=1, alpha=0.3, color='green', align='edge')
    # fill integral area
    xs = np.linspace(1, N+2, 200)
    plt.fill_between(xs, 0, 1/xs**2, alpha=0.1, color='blue')
    plt.axhline(0, color='gray')
    plt.xlim(0.5, N+2.5)
    plt.ylim(0, max(1, 1/(N+2)**2)+0.2)
    plt.xlabel('n')
    plt.ylabel('f(n)')
    plt.title('Series vs Integral (N='+str(N)+')')
    plt.legend()
    plt.show()

interact(update, N=(1,30,1))
```

**Teacher Narration** `[54w ⚠️ **TOO SHORT: 54w < 60w min**]`
> Drag the slider to increase the number of terms. Watch the left and right rectangles—they sandwich the integral. For this p=2 function, the integral area approaches about 1.64. The series sum also approaches a finite number. This visual tool helps you see why the Integral Test works: the series behavior matches the integral growth.

**Student Prompt:** Predict: What happens to the rectangles if we use f(x)=1/x instead?

---

### Slide 6 · [PRACTICE]
**Example 2: Standard Rational Function**  ·  `full_width`

**On-screen text** `[11w]`
∫ 1/(x²+1) from 1 to ∞ = π/4 → Series converges.

**FULL WIDTH** `[steps]`

**Test $\sum_{n=1}^\infty \frac{1}{n^2+1}$ for convergence.**

| Step | Action |
|------|--------|
| 1 | Set $f(x)=\frac{1}{x^2+1}$ on $[1,\infty)$ |
| 2 | **Check conditions:** |
|    | Continuous? Yes (denom > 0) |
|    | Positive? Yes (numerator > 0) |
|    | Decreasing? $f'(x)=\frac{-2x}{(x^2+1)^2}<0$ for $x>0$ ✅ |
| 3 | Compute $\int_1^\infty \frac{1}{x^2+1}dx = \frac{\pi}{4}$ |
| 4 | **Conclusion:** Series converges (integral finite) |

**Teacher Narration** `[61w]`
> Now a standard example. Our function is rational, clearly continuous and positive for all x≥1. The derivative is negative for positive x, so it's decreasing. The integral of 1 over x^2 plus one is arctan x, which from 1 to infinity evaluates to pi over four—a finite number. So the series converges. Notice we didn't need to compute the sum exactly.

**Student Prompt:** Try: Test ∑ 1/(n²+2n+2). (Hint: complete the square).

---

### Slide 7 · [MISCONCEPTION] 🟡
**Misconception: When Decreasing Is Not Obvious**  ·  `split_left_right`

**On-screen text** `[8w]`
Don't assume decreasing! Derivative shows increase for x<e.

**LEFT** `[text]`

**Avoid the trap: $\sum_{n=2}^\infty \frac{\ln n}{n}$**

Wrong approach: Assume decreasing because $\ln n$ grows slowly.

**Correct:** Check derivative!

$$f(x)=\frac{\ln x}{x},\quad f'(x)=\frac{1-\ln x}{x^2}$$

$$f'(x)<0 \text{ only when } x>e$$

So decreasing on $[3,\infty)$ – still works (eventually decreasing).

Integral: $\int_3^\infty \frac{\ln x}{x}dx = \infty$ → **Diverges**.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=ln x / x from x=1 to 10. Mark vertical line at x=e with dashed line. Shade region from 1 to e where function increases (red) and from e to ∞ where it decreases (green). Title: 'Increasing then Decreasing – Check Derivative'. X-axis label 'x', y-label 'f(x)'.

**Teacher Narration** `[64w]`
> Here's a common mistake: many students see ln x over n and think it's obviously decreasing. But it's not! The derivative reveals that for x between 1 and e, the function actually increases. It only becomes decreasing after e. Fortunately, the Integral Test only requires eventual decreasing—so we start the integral at 3. That integral diverges, so the series diverges. Always compute the derivative.

---

### Slide 8 · [PRACTICE] 🟡
**Edge Case: Boundary p-Value**  ·  `split_left_right`

**On-screen text** `[11w]`
∫ 1/(x ln x) diverges → series diverges. A p=1-like boundary.

**LEFT** `[steps]`

**Test $\sum_{n=2}^\infty \frac{1}{n \ln n}$**

1. $f(x) = \frac{1}{x \ln x}$ on $[2,\infty)$
2. Conditions: continuous, positive, decreasing (check derivative: $f'(x) = -\frac{\ln x+1}{x^2(\ln x)^2}<0$)
3. Integral: $\int_2^\infty \frac{1}{x\ln x}dx = \left|\ln(\ln x)\right|_2^\infty = \infty$
4. **Conclusion:** Diverges (even though terms →0)

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=1/(x ln x) from 2 to 20. Fill area under curve with light red. X-axis label 'x', y-label 'f(x)'. Title: '1/(n ln n): Diverges (p=1 like)'. Annotation: 'Integral diverges like ln(ln x)'.

**Teacher Narration** `[69w]`
> This series looks like it might converge because ln n grows. But use the substitution u equals ln x. The integral becomes du over u, which diverges. This is analogous to the harmonic series but even slower. Students often guess convergence here—wrong! The Integral Test clearly shows divergence. This is a classic exam trap. The key is that the integral diverges logarithmically, so the series sum grows without bound.

---

### Slide 9 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Remainder Estimate**  ·  `split_left_right`

**On-screen text** `[22w]`
Remainder bound: ∫ from n+1 to ∞ ≤ R_n ≤ ∫ from n to ∞. Use to find n for desired error.

**LEFT** `[concept]`

For a convergent series $\sum a_n$ via Integral Test, the remainder $R_n = S - S_n$ satisfies:

$$\int_{n+1}^\infty f(x)dx \leq R_n \leq \int_n^\infty f(x)dx$$

Used to find number of terms for desired accuracy.

**Example:** For $\sum 1/n^3$, find $n$ so $R_n < 0.001$.

- Upper bound: $\int_n^\infty 1/x^3 dx = 1/(2n^2)$
- Solve $1/(2n^2) < 0.001 \implies n > \sqrt{500} \approx 22.36$
- So $n=23$ terms guarantee error < 0.001.

**RIGHT** `[visual_spec]`

*Visual Spec:* Interactive plot: for a given n (slider 1 to 50), show the series sum from n=1 to n, and shade the remainder area from n+1 to ∞. Display numerical values. Use f(x)=1/x^3. Title: 'Remainder Estimate for p=3'. X-axis label 'n', y-axis 'f(n)'.

*Interactive Controls:*
  - 🎛 Slider for N from 1 to 50

```python
import numpy as np
import matplotlib.pyplot as plt
from ipywidgets import interact

def plot_remainder(N):
    x = np.linspace(1, 20, 400)
    plt.figure(figsize=(8,5))
    plt.plot(x, 1/x**3, 'b-', label='f(x)=1/x^3')
    # shade remainder area from N+1 to ∞ (approximate to 20)
    xs = np.linspace(N+1, 20, 100)
    plt.fill_between(xs, 0, 1/xs**3, alpha=0.3, color='orange', label='Remainder bound area')
    # bars for terms
    for n in range(1, N+1):
        plt.bar(n, 1/n**3, width=0.8, alpha=0.5, color='blue', align='center')
    plt.xlabel('n')
    plt.ylabel('value')
    plt.title('Remainder: n='+str(N)+', bound=1/('+str(2*N**2)+')')
    plt.legend()
    plt.show()

interact(plot_remainder, N=(1,50,1))
```

**Teacher Narration** `[64w]`
> For those wanting more depth: once we know a series converges, we often need to approximate the sum. The Integral Test provides a remainder estimate. The true sum after n terms is between two integrals. For p-series, we can solve for the number of terms needed to guarantee a given error. In the example, 23 terms give error less than one thousandth. That's efficient!

**Student Prompt:** Try for ∑ 1/n^4: find n such that error < 0.0001.

---

### Slide 10 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Pause: Your Turn**  ·  `split_left_right`

**On-screen text** `[9w]`
Pause the video and try this problem yourself first.

**LEFT** `[text]`

**Problem:** Determine whether $\sum_{n=1}^\infty \frac{1}{n^2 + 2n + 2}$ converges using the Integral Test.

Hint: Complete the square: $n^2 + 2n + 2 = (n+1)^2 + 1$

**RIGHT** `[visual_spec]`

*Visual Spec:* Empty plot with axes from 0 to 10, labeled x and y, with a text annotation: 'Your turn: compute the integral'.

**Teacher Narration** `[55w ⚠️ **TOO SHORT: 55w < 60w min**]`
> Now it's your turn. Pause the video and try to determine convergence using the Integral Test. Remember to check the three conditions: continuous, positive, decreasing. Then compute the integral. After you've tried, resume to see the solution. This problem is a good test of your ability to handle a quadratic denominator by completing the square.

**Student Prompt:** Test ∑ 1/(n²+2n+2) for convergence. Hint: complete the square.

---

### Slide 11 · [PRACTICE]
**Solution: Your Turn**  ·  `full_width`

**On-screen text** `[9w]`
∫ π/2 – arctan 2 ≈ 0.46365 → Converges.

**FULL WIDTH** `[steps]`

**Solution:**

1. $f(x) = \frac{1}{(x+1)^2+1}$ on $[1,\infty)$.
2. Conditions: continuous (denom >0), positive, decreasing ($f'(x) = -\frac{2(x+1)}{((x+1)^2+1)^2}<0$).
3. Integral: $\int_1^\infty \frac{1}{(x+1)^2+1}dx$.
   Let $u = x+1$, $du = dx$ → $\int_2^\infty \frac{1}{u^2+1}du = \left[\arctan u\right]_2^\infty = \frac{\pi}{2} - \arctan 2$ (finite).
4. Conclusion: **Series converges**.

**Teacher Narration** `[54w ⚠️ **TOO SHORT: 54w < 60w min**]`
> Here's the full solution. After completing the square, we see the integral becomes arctan of u from 2 to infinity. That's a finite number, so the series converges. Good job if you got that. The key was recognizing the quadratic structure and applying the substitution. This technique will be useful for many similar problems.

---

### Slide 12 · [CORE]
**Decision Tree: Which Test to Use?**  ·  `full_width`

**On-screen text** `[9w]`
Quick flowchart: p-series? No? Check conditions for Integral Test.

**FULL WIDTH** `[text]`

**Flowchart:**


Is it a p-series (1/n^p)?
  ├─ Yes → Check p > 1?
  │       ├─ Yes → Converges
  │       └─ No → Diverges
  └─ No → Can we use Integral Test?
          ├─ Conditions: Continuous, Positive, Decreasing?
          │   ├─ All yes → Apply Integral Test
          │   └─ Any no → Try another test (e.g., Comparison, Ratio)
          └─ Result: Converges if integral converges


**Teacher Narration** `[56w ⚠️ **TOO SHORT: 56w < 60w min**]`
> This flowchart summarizes our approach. First check if the series is a p-series. If not, see if the Integral Test applies. If the function is not decreasing, you'll need other tests like comparison. For today's lecture, keep this in mind as your first two options. Having a systematic approach prevents mistakes and saves time on exams.

---

### Slide 13 · [SUMMARY]
**Summary and Next Steps**  ·  `full_width`

**On-screen text** `[12w]`
p-series: p>1 converges. Integral Test: check conditions. Remainder bound. Next: Comparison Tests.

**FULL WIDTH** `[text]`

**Key Takeaways:**

1. **p-Series:** $\sum 1/n^p$ converges iff $p > 1$.
2. **Integral Test:** Requires continuous, positive, decreasing $f$; series converges iff $\int f$ converges.
3. **Remainder Estimate:** $\int_{n+1}^\infty f \leq R_n \leq \int_n^\infty f$ (for convergent series).
4. Always check conditions before applying a test.

**Next lecture:** Comparison Tests.

**Teacher Narration** `[65w]`
> Today we learned two powerful tools: the p-series for quick classification, and the Integral Test for a broader class of series. Remember the three conditions and the remainder bound for approximation. In the next lecture, we'll use comparison tests to handle series that don't match a p-series but can be bounded by one. Thank you for watching. Practice with the examples provided to build confidence.

---
