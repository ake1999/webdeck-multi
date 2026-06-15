# First and Second Derivative Tests

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 92%

> **Prerequisite:** You should be comfortable finding derivatives and solving equations.

**Learning Objectives:**
- Identify critical numbers where f'(c)=0 or f'(c) is undefined
- Apply the First Derivative Test to classify local extrema
- Apply the Second Derivative Test to classify critical points
- Determine when each test is appropriate or inconclusive

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
⚠️ **Narration overlong  (>120w):** [8, 12, 14]  (avg 110w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
⚠️ **visual_labs**: 0 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 6 interactive moment(s) (min 3)
⚠️ **narration_overlong**: too long: ['s8:126w', 's12:141w', 's14:132w']
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | hook | 🟢 | ◧ |  | 112w | 31w | Hiking the Derivative Trail |
| 2 | 🎛core | 🟢 | ◧ |  | 103w | 24w | Critical Numbers: The Foundation |
| 3 | 🎛core | 🟢 | ◧ | ⏸️ | 119w | 31w | First Derivative Test – Statement |
| 4 | practice | 🟢 | ⬛⬛ |  | 108w | 14w | Warm-Up Example: f(x) = x² – 6x + 5 |
| 5 | 🎛core | 🟢 | ◧ |  | 99w | 28w | Second Derivative Test – Statement |
| 6 | 🎛practice | 🟢 | ◧ |  | 108w | 15w | Standard Example: f(x) = x³ – 3x² + 1 |
| 7 | misconception | 🟡 | ◧ |  | 93w | 20w | Common Mistake: Forgetting Undefined Derivatives |
| 8 | practice | 🟡 | ◧ | ⏸️ | 126w⚠️ | 27w | Tricky Example: f(x) = x^(2/3)(x-1) |
| 9 | pause_and_try | 🟡 | ⬛⬛ | ⏸️ | 68w | 24w | Pause & Predict: Edge Case |
| 10 | practice | 🟡 | ◧ |  | 117w | 21w | Edge Case: f(x) = x⁴ – 4x³ + 6x² – 4x + 1 |
| 11 | practice | 🟡 | ⬛⬛ |  | 114w | 28w | Application: Profit Optimization |
| 12 | 🎛challenge | 🔴 | ◧ |  | 141w⚠️ | 26w | [Challenge – Optional] Proof Sketch of Both Tests |
| 13 | misconception | 🟢 | ◧ |  | 101w | 22w | Another Mistake: f''(c)=0 Means No Extremum? |
| 14 | 🎛summary | 🟢 | ⬛⬛ | ⏸️ | 132w⚠️ | 33w | Quick Check & Summary |

---

### Slide 1 · [HOOK]
**Hiking the Derivative Trail**  ·  `split_left_right`

**On-screen text** `[31w]`
Hike: slope f'(x) > 0 uphill, < 0 downhill, = 0 at flat spots (summit or valley). Two derivative tests answer: which way before/after? and is trail curving up or down?

**LEFT** `[text]`

**Picture a hike:** Your elevation is $f(x)$, slope is $f'(x)$.

- Uphill: $f'(x) > 0$
- Downhill: $f'(x) < 0$
- Flat spot (summit or valley): $f'(x) = 0$

Two questions: which way before/after? Is the trail curving up or down?

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a simple mountain profile: a cubic function f(x) = -0.1x^3 + 1.5x^2 - 4x + 10 from x=0 to x=12. Mark two flat spots (local max and min) with arrows showing slope signs before and after. Add a hiker icon at the peak. Use green for uphill, red for downhill, blue for flat. Title: 'Hiking the Derivative Trail'.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 12, 400)
f = -0.1*x**3 + 1.5*x**2 - 4*x + 10
plt.figure(figsize=(8,5))
plt.plot(x, f, 'k-', linewidth=2)
# critical points (approx from f'(x)=0)
c_max = 2.76
c_min = 9.57
plt.plot(c_max, -0.1*c_max**3+1.5*c_max**2-4*c_max+10, 'bo', markersize=10)
plt.plot(c_min, -0.1*c_min**3+1.5*c_min**2-4*c_min+10, 'bo', markersize=10)
# arrows for slope before and after each critical point
plt.annotate('', xy=(2.0, -0.1*2.0**3+1.5*2.0**2-4*2.0+10), xytext=(1.5, -0.1*1.5**3+1.5*1.5**2-4*1.5+10),
            arrowprops=dict(facecolor='green', edgecolor='green', shrink=0.1))
plt.annotate('', xy=(3.5, -0.1*3.5**3+1.5*3.5**2-4*3.5+10), xytext=(3.0, -0.1*3.0**3+1.5*3.0**2-4*3.0+10),
            arrowprops=dict(facecolor='red', edgecolor='red', shrink=0.1))
plt.annotate('', xy=(8.5, -0.1*8.5**3+1.5*8.5**2-4*8.5+10), xytext=(8.0, -0.1*8.0**3+1.5*8.0**2-4*8.0+10),
            arrowprops=dict(facecolor='red', edgecolor='red', shrink=0.1))
plt.annotate('', xy=(10.5, -0.1*10.5**3+1.5*10.5**2-4*10.5+10), xytext=(10.0, -0.1*10.0**3+1.5*10.0**2-4*10.0+10),
            arrowprops=dict(facecolor='green', edgecolor='green', shrink=0.1))
plt.axhline(0, color='gray', linestyle='--')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Hiking the Derivative Trail')
plt.grid(alpha=0.3)
plt.show()
```

**Teacher Narration** `[112w]`
> Imagine you're hiking a mountain trail. Your elevation is f of x, and the steepness of the trail is the derivative f prime of x. When you're walking uphill, the slope is positive. Downhill, it's negative. And when you reach a summit or a valley, the trail flattens out momentarily — the derivative is zero. The two derivative tests we're about to learn answer two questions. The first derivative test asks: which way were you walking just before and just after the flat spot? The second derivative test asks: is the trail curving upward like a smile, or downward like a frown at that flat spot? Let's build up to both tests.

---

### Slide 2 · [CORE] 🎛 *[2 controls]*
**Critical Numbers: The Foundation**  ·  `split_left_right`

**On-screen text** `[24w]`
Critical number c: f'(c)=0 or undefined. Candidates for local extrema. Example: x^3 has f'(0)=0 but no extremum – not all critical points are max/min.

**LEFT** `[concept]`

**Definition:** $c$ is a *critical number* of $f$ if $c$ is in the domain and either $f'(c) = 0$ or $f'(c)$ does not exist.

Candidates for local extrema, but not guaranteed. Example: $f(x)=x^3$ has $f'(0)=0$ but no extremum.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show two panels: left panel: graph of f(x)=x^3 with point at (0,0) and horizontal tangent line (dashed) but neither max nor min; right panel: graph of f(x)=x^2 with point at (0,0) and tangent line, clearly a minimum. Use colors: blue curve, red tangent, green point. Title: 'Critical Numbers – Not All Are Extrema'.

*Interactive Controls:*
  - 🎛 Slider: change function between x^3, x^2, x^4, -x^2
  - 🎛 Toggle: show tangent line at critical point

```python
import numpy as np
import matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1,2, figsize=(10,4))
x = np.linspace(-2,2,400)

# x^3
ax1.plot(x, x**3, 'b-')
ax1.plot(0, 0, 'go', markersize=10)
ax1.plot([-1,1], [0,0], 'r--', linewidth=2)
ax1.set_title('f(x)=x^3: no extremum')
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.grid(alpha=0.3)
ax1.set_aspect('equal')

# x^2
ax2.plot(x, x**2, 'b-')
ax2.plot(0, 0, 'go', markersize=10)
ax2.plot([-1,1], [0,0], 'r--', linewidth=2)
ax2.set_title('f(x)=x^2: minimum')
ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.grid(alpha=0.3)
ax2.set_aspect('equal')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[103w]`
> Before we can apply any derivative test, we need to find critical numbers. A critical number is a point in the domain where the derivative is zero or does not exist. These are the only places where a function might have a local maximum or minimum. But watch out: not every critical number gives an extremum. The classic example is f of x equals x cubed. At x equals zero, the derivative is zero, but the graph just flattens and continues increasing — it's an inflection point, not a maximum or minimum. Always test critical numbers with a derivative test to be sure.

**Student Prompt:** Find the critical numbers of f(x) = x^2 - 4x + 3.

---

### Slide 3 · [CORE] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**First Derivative Test – Statement**  ·  `split_left_right`

**On-screen text** `[31w]`
First Derivative Test: At critical point c, f' changes from + to - => local max; - to + => local min; no change => no extremum. Test points both sides.

**LEFT** `[formula_block]`

**First Derivative Test**

If $f$ is continuous at critical number $c$:

| Sign change of $f'$ at $c$ | Conclusion |
|:---:|:---:|
| $+ \to -$ | Local maximum |
| $- \to +$ | Local minimum |
| No change | No extremum |

Test points on both sides of $c$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Sign chart: number line with critical point at c. Left side shows f'>0, right side f'<0, and label 'max'. Below the line, a small graph of the function near c showing a peak. Use arrows and colors: green for increasing, red for decreasing. Include an interactive toggle to switch between 'max' and 'min' patterns.

*Interactive Controls:*
  - 🎛 Toggle: switch between max pattern (+ to -) and min pattern (- to +)

```python
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(1,1, figsize=(6,3))
# number line
ax.hlines(0, -2, 2, color='black', linewidth=1)
ax.plot(0, 0, 'ko', markersize=10)
ax.text(0, 0.1, 'c', ha='center', fontsize=12)
# arrows for sign
ax.annotate('f\' > 0', xy=(-1,0), xytext=(-1.5,0.2), arrowprops=dict(facecolor='green', edgecolor='green'), fontsize=10, color='green')
ax.annotate('f\' < 0', xy=(1,0), xytext=(1.5,0.2), arrowprops=dict(facecolor='red', edgecolor='red'), fontsize=10, color='red')
# small graph
xs = np.linspace(-2,2,400)
ys = -xs**2 + 2  # parabola facing down for max
ax.plot(xs, ys*0.3 - 1.5, 'b-', linewidth=2)
ax.set_ylim(-2, 1)
ax.set_title('Sign change + to - => Local max')
ax.axis('off')
plt.show()
```

**Teacher Narration** `[119w]`
> Here's the First Derivative Test in a nutshell. Once you have a critical number c, you check the sign of the derivative just to the left and just to the right of c. If the derivative goes from positive to negative, the function increases up to c and then decreases — that's a local maximum. If it goes from negative to positive, that's a local minimum. If the sign doesn't change, then c is not an extremum. Make sure to test points on both sides, not just one. Testing both sides is essential because the sign on one side alone doesn't tell you whether the function is peaking or troughing — you need the comparison to see the change.

**Student Prompt:** Why must you test points on both sides of the critical number? What could go wrong if you only test one side?

---

### Slide 4 · [PRACTICE]
**Warm-Up Example: f(x) = x² – 6x + 5**  ·  `full_width`

**On-screen text** `[14w]`
f(x)=x²–6x+5. f'(x)=2x-6 => critical x=3. f'(2)=-2 (dec), f'(4)=2 (inc) => local min at (3,-4).

**FULL WIDTH** `[steps]`

| Step | Action | Result |
|:---:|:---|:---|
| 1 | $f'(x) = 2x - 6$ | |
| 2 | Set $f'(x)=0$: $2x-6=0$ | $x=3$ |
| 3 | Test left: $x=2$, $f'(2)=-2 < 0$ | decreasing |
| 4 | Test right: $x=4$, $f'(4)=2 > 0$ | increasing |
| 5 | Sign change: $- \to +$ | **Local min at $x=3$** |
| 6 | Value: $f(3)=9-18+5=-4$ | minimum -4 |

**Teacher Narration** `[108w]`
> Let's try a simple warm-up. f of x equals x squared minus six x plus five. Derivative is two x minus six. Setting it to zero gives x equals three as the only critical number. We test x equals two on the left: the derivative is negative two, so decreasing. On the right, x equals four gives positive two, increasing. The sign change from negative to positive tells us this is a local minimum. The function value at x equals three is minus four. So we have a local minimum at the point three comma minus four. You can check with a quick graph: it's a U-shaped parabola.

**Student Prompt:** Now try f(x) = -x² + 4x - 1. Find its critical number and classify it.

---

### Slide 5 · [CORE] 🎛 *[1 controls]*
**Second Derivative Test – Statement**  ·  `split_left_right`

**On-screen text** `[28w]`
Second Derivative Test: f'(c)=0. If f''(c) > 0 => local min (smile). If f''(c) < 0 => local max (frown). If f''(c)=0 => inconclusive; use first derivative test.

**LEFT** `[formula_block]`

**Second Derivative Test**

Suppose $f'(c)=0$ and $f''$ exists near $c$.

- $f''(c) > 0$ => Local minimum (concave up 😊)
- $f''(c) < 0$ => Local maximum (concave down 😟)
- $f''(c) = 0$ => **Inconclusive** – use first derivative test.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two graphs side by side: left graph shows a concave up parabola with minimum and label 'f''>0'; right graph shows concave down parabola with maximum and label 'f''<0'. Use smile/frown emoji icons above each. Title: 'Second Derivative Test'.

*Interactive Controls:*
  - 🎛 Slider: change second derivative value between -5 and 5 and show how the curvature changes

```python
import numpy as np
import matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1,2, figsize=(8,4))
x = np.linspace(-2,2,400)
# concave up: f(x)=x^2
ax1.plot(x, x**2, 'b-', linewidth=2)
ax1.plot(0,0,'go', markersize=10)
ax1.set_title('f'''>0   Local min 😊', fontsize=12)
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.grid(alpha=0.3)
ax1.set_aspect('equal')
# concave down: f(x)=-x^2
ax2.plot(x, -x**2, 'b-', linewidth=2)
ax2.plot(0,0,'ro', markersize=10)
ax2.set_title('f'''<0   Local max 😟', fontsize=12)
ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.grid(alpha=0.3)
ax2.set_aspect('equal')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[99w]`
> The Second Derivative Test is often faster when you have the second derivative. If f double prime of c is positive, the function is concave up near c — like a smile — so it's a local minimum. If f double prime of c is negative, the function is concave down — like a frown — so it's a local maximum. But be careful: if f double prime of c equals zero, the test gives no information. That's called inconclusive. You then have to fall back to the First Derivative Test. I'll show you an example of that later.

**Student Prompt:** Memory aid: 'Positive second derivative = smile = minimum; negative second derivative = frown = maximum.' Try to remember it.

---

### Slide 6 · [PRACTICE] 🎛 *[1 controls]*
**Standard Example: f(x) = x³ – 3x² + 1**  ·  `split_left_right`

**On-screen text** `[15w]`
f(x)=x³-3x²+1. Critical x=0,2. f''(0)=-6 => local max at (0,1). f''(2)=6 => local min at (2,-3).

**LEFT** `[steps]`

| Step | Action | Result |
|:---:|:---|:---|
| 1 | $f'(x)=3x^2-6x = 3x(x-2)$ | |
| 2 | $f'(x)=0$ | $x=0,\,x=2$ |
| 3 | $f''(x)=6x-6$ | |
| 4 | $f''(0) = -6 < 0$ | **Local max at $x=0$** |
| 5 | $f''(2) = 6 > 0$ | **Local min at $x=2$** |
| 6 | Values: $f(0)=1$, $f(2)=-3$ | |

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of f(x)=x^3-3x^2+1 from x=-1 to x=3. Mark points (0,1) with red circle and label 'max', (2,-3) with green circle and label 'min'. Show tangent lines at those points (horizontal). Include dashed vertical lines at x=0 and x=2. Title: 'Local extrema of f(x)=x^3-3x^2+1'. Interactive toggle to show/hide the second derivative signs.

*Interactive Controls:*
  - 🎛 Toggle: show/hide second derivative signs near each critical point

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-1, 3, 400)
f = x**3 - 3*x**2 + 1
plt.figure(figsize=(8,5))
plt.plot(x, f, 'b-', linewidth=2, label='f(x)=x³−3x²+1')
plt.plot(0, 1, 'ro', markersize=12, label='Local max (0,1)')
plt.plot(2, -3, 'go', markersize=12, label='Local min (2,-3)')
plt.axvline(0, color='gray', linestyle='--')
plt.axvline(2, color='gray', linestyle='--')
plt.axhline(0, color='gray', linestyle='--')
# tangent lines (horizontal)
plt.plot([-0.5,0.5],[1,1],'r--', linewidth=1.5)
plt.plot([1.5,2.5],[-3,-3],'g--', linewidth=1.5)
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Local Extrema of f(x) = x³ − 3x² + 1')
plt.legend()
plt.grid(alpha=0.3)
plt.show()
```

**Teacher Narration** `[108w]`
> Now a standard example that often appears on exams. f of x equals x cubed minus three x squared plus one. Derivative three x squared minus six x factors to three x times x minus two, giving critical numbers zero and two. The second derivative is six x minus six. Plug in zero: negative six, so local maximum at x equals zero with value one. Plug in two: positive six, so local minimum at x equals two with value negative three. You can see the graph: a peak on the left and a valley on the right. This works nicely because the second derivative test gives clear results.

**Student Prompt:** Would the first derivative test have given the same classification? Try to verify mentally.

---

### Slide 7 · [MISCONCEPTION] 🟡
**Common Mistake: Forgetting Undefined Derivatives**  ·  `split_left_right`

**On-screen text** `[20w]`
Common mistake: For f(x)=x^(2/3)(x-1), solving f'(x)=0 gives x=2/5. But x=0 is also critical because f'(0) undefined. Both must be tested!

**LEFT** `[text]`

**Wrong approach:**

For $f(x) = x^{2/3}(x-1)$, only solve $f'(x)=0$.

- $f'(x)=\frac{5x-2}{3x^{1/3}}$
- Setting numerator $5x-2=0$ gives $x=2/5$.
- You stop there and miss $x=0$ where $f'$ is undefined!

**Correct:** $c=0$ is also a critical number because $f'(0)$ does not exist. Both must be tested.

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of f(x)=x^(2/3)*(x-1) from x=-1 to x=3. Show the cusp at x=0 (sharp point) where derivative does not exist. Mark local max at x=0 and local min at x=2/5. Use arrows to indicate the sign change. Include a callout box: 'Critical number because f' undefined'. Title: 'Cusp at x=0 – Missing Critical Number'.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-1, 3, 800)
f = np.sign(x) * (np.abs(x)**(2/3)) * (x-1)
plt.figure(figsize=(8,5))
plt.plot(x, f, 'b-', linewidth=2)
# critical points
plt.plot(0, 0.0, 'ro', markersize=12, label='Local max at x=0 (cusp)')
plt.plot(2/5, (2/5)**(2/3)*((2/5)-1), 'go', markersize=12, label='Local min at x=2/5')
plt.axvline(0, color='gray', linestyle='--')
plt.axvline(2/5, color='gray', linestyle='--')
plt.text(0.7, -0.8, 'f\' undefined at x=0', fontsize=10, bbox=dict(facecolor='yellow', alpha=0.7))
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Don\'t forget critical numbers where f\' is undefined!')
plt.legend()
plt.grid(alpha=0.3)
plt.xlim(-1,3)
plt.ylim(-1.5, 1.5)
plt.show()
```

**Teacher Narration** `[93w]`
> Here's a common pitfall. When finding critical numbers, always check where the derivative does not exist. For this function, the derivative has x to the one-third in the denominator, which is zero at x equals zero. So x equals zero is a critical number even though the derivative is not zero. Many students miss it. The graph shows a sharp cusp at that point. It turns out to be a local maximum. Always ask yourself: is the derivative defined at every point in the domain? If not, include those points as critical numbers.

**Student Prompt:** Find all critical numbers of f(x) = x^(1/3)*(x-4). Check at x=0.

---

### Slide 8 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Tricky Example: f(x) = x^(2/3)(x-1)**  ·  `split_left_right`

**On-screen text** `[27w]`
Critical numbers: x=0 (undefined derivative) and x=2/5. Sign test: + at -1, - at 0.1, + at 1 => local max at 0, local min at 2/5.

**LEFT** `[steps]`

| Step | Action | Result |
|:---:|:---|:---|
| 1 | $f'(x) = \frac{5x-2}{3x^{1/3}}$ | |
| 2 | Numerator $=0$: $x=2/5$ | |
| 3 | Denominator $=0$: $x=0$: $f'(0)$ undefined | |
| 4 | Critical numbers: $x=0$ and $x=2/5$ | |
| 5 | Test intervals: $(-\infty,0)$, $(0,2/5)$, $(2/5,\infty)$ | |
| 6 | Sign of $f'$: + at $x=-1$, - at $x=0.1$, + at $x=1$ | |
| 7 | $+ \to -$ at $x=0$: **Local max** | $f(0)=0$ |
| 8 | $- \to +$ at $x=2/5$: **Local min** | $f(2/5)\approx -0.325$ |

**RIGHT** `[visual_spec]`

*Visual Spec:* Same graph as slide 7 but with added sign chart above the function: number line with +, -, + labels and arrows indicating sign changes. Use green + and red - with background colors on intervals. Mark both critical points with circles. Title: 'Full analysis of f(x)=x^(2/3)(x-1)'.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-1, 3, 800)
f = np.sign(x) * (np.abs(x)**(2/3)) * (x-1)
plt.figure(figsize=(8,6))
# function plot
plt.subplot(2,1,2)
plt.plot(x, f, 'b-', linewidth=2)
plt.plot(0, 0, 'ro', markersize=10, label='Local max')
plt.plot(2/5, (2/5)**(2/3)*((2/5)-1), 'go', markersize=10, label='Local min')
plt.axvline(0, color='gray', linestyle='--')
plt.axvline(2/5, color='gray', linestyle='--')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.legend()
plt.grid(alpha=0.3)
plt.xlim(-1, 3)
# sign chart above
plt.subplot(2,1,1)
plt.hlines(0, -1, 3, color='black')
plt.scatter([0, 0.4], [0,0], color='black', zorder=5)
plt.text(0, 0.1, '0', ha='center')
plt.text(0.4, 0.1, '2/5', ha='center')
plt.text(-0.5, 0.2, '+  f\'>0', color='green')
plt.text(0.2, 0.2, '-  f\'<0', color='red')
plt.text(1.5, 0.2, '+  f\'>0', color='green')
plt.title('Sign chart')
plt.yticks([])
plt.xlim(-1, 3)
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[126w ⚠️ **OVERLONG: 126w > 120w max**]`
> Let's walk through the full analysis for this tricky function. We already found the derivative and identified two critical numbers: x equals zero where derivative is undefined, and x equals two-fifths where the numerator is zero. Now we test a point in each interval. For x less than zero, say x equals minus one, the derivative is positive. Between zero and two-fifths, test x equals 0.1 — the derivative is negative. For x greater than two-fifths, test x equals one — positive again. So the sign changes from positive to negative at x equals zero, giving a local maximum. And from negative to positive at x equals two-fifths, giving a local minimum. This graph has a cusp maximum at zero and a smooth minimum at two-fifths.

**Student Prompt:** Pause and verify the sign of f'(-1) and f'(0.1) yourself using the formula.

---

### Slide 9 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]*
**Pause & Predict: Edge Case**  ·  `full_width`

**On-screen text** `[24w]`
f(x) = x⁴ – 4x³ + 6x² – 4x + 1. Find critical numbers, apply both tests. Predict: local max, local min, or inconclusive?

**FULL WIDTH** `[text]`

**Your turn before the reveal:**

Consider $f(x) = x^4 - 4x^3 + 6x^2 - 4x + 1$.

- Find $f'(x)$ and factor it.
- Find the critical number(s).
- Compute $f''(x)$ at the critical number(s).
- What does the Second Derivative Test say?
- Can you classify the point using the First Derivative Test?

Try to predict the classification before clicking 'Reveal'.

**Teacher Narration** `[68w]`
> Here's a chance to test your understanding before I give you the solution. Look at this polynomial. It looks complicated, but notice it might be a perfect fourth power. Derivative, critical numbers, second derivative. If the second derivative test is inconclusive, what should you do? Pause the video now, work it out, then come back to check your answer. This is a common edge case that quizzes love.

**Student Prompt:** Solve the problem and click 'Reveal' when ready to see the solution on the next slide.

---

### Slide 10 · [PRACTICE] 🟡
**Edge Case: f(x) = x⁴ – 4x³ + 6x² – 4x + 1**  ·  `split_left_right`

**On-screen text** `[21w]`
f'(x)=4(x-1)³ => critical x=1. f''(1)=0 => inconclusive. FDT: f'(0)=-4, f'(2)=4 => sign change - to + => local min at (1,0).

**LEFT** `[steps]`

| Step | Action | Result |
|:---:|:---|:---|
| 1 | $f'(x) = 4(x-1)^3$ (factor) | |
| 2 | Only critical number: $x=1$ | |
| 3 | $f''(x) = 12(x-1)^2$ | |
| 4 | $f''(1) = 0$ => **Inconclusive** | |
| 5 | First Derivative Test: test $x=0$ → $f'(0) = -4 < 0$ (dec) | |
| 6 | Test $x=2$ → $f'(2) = 4 > 0$ (inc) | |
| 7 | Sign change $- \to +$ | **Local minimum at $x=1$** |
| 8 | $f(1) = 0$ | Point (1,0) |

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of f(x)=x^4-4x^3+6x^2-4x+1 from x=0 to x=2. Show the flat point at (1,0) with a horizontal tangent line. Mark the minimum. Add a callout: 'f''(1)=0, but it's a minimum!' Use colors: curve blue, point green, tangent dashed red. Title: 'Second derivative test inconclusive – but first derivative test gives min'.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 2, 400)
f = x**4 - 4*x**3 + 6*x**2 - 4*x + 1
plt.figure(figsize=(8,5))
plt.plot(x, f, 'b-', linewidth=2, label='f(x)')
plt.plot(1, 0, 'go', markersize=12, label='Local min (1,0)')
plt.plot([0.5,1.5],[0,0],'r--', linewidth=1.5)
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Edge case: f\'\'(1)=0 but second derivative test is inconclusive, FDT shows min')
plt.legend()
plt.grid(alpha=0.3)
plt.show()
```

**Teacher Narration** `[117w]`
> Here's the solution to the pause problem. The derivative is four times x minus one cubed, so the only critical number is x equals one. The second derivative is twelve times x minus one squared, which is zero at x equals one. That means the Second Derivative Test gives no information. But we can fall back to the First Derivative Test. Test x equals zero: derivative negative, so decreasing. Test x equals two: derivative positive, increasing. Negative to positive — that's a local minimum! The graph shows a flat but still minimum point. This is a good reminder: inconclusive does not mean no extremum. You must use the first derivative test when the second derivative test fails.

**Student Prompt:** Why does f''(1)=0 still give a minimum? (Hint: look at f' sign change.)

---

### Slide 11 · [PRACTICE] 🟡
**Application: Profit Optimization**  ·  `full_width`

**On-screen text** `[28w]`
Profit P(x)=2x³-15x²+36x-10 on [0,5]. Critical at x=2,3. P''(2)=-6 => local max; P''(3)=6 => local min. Check endpoints: absolute max at x=5 ($45k), absolute min at x=0 (-$10k loss).

**FULL WIDTH** `[steps]`

**Problem:** $P(x) = 2x^3 - 15x^2 + 36x - 10$, $0 \le x \le 5$ (x in hundreds of units, profit in thousands)

| Step | Action | Result |
|:---:|:---|:---|
| 1 | $P'(x)=6x^2-30x+36 = 6(x-2)(x-3)$ | |
| 2 | Critical numbers: $x=2$, $x=3$ | |
| 3 | $P''(x)=12x-30$ | |
| 4 | $P''(2)=-6<0$ => Local max | $P(2)=18$ |
| 5 | $P''(3)=6>0$ => Local min | $P(3)=17$ |
| 6 | Check endpoints: $P(0)=-10$, $P(5)=45$ | |
| 7 | **Absolute max:** $x=5$, $P(5)=45$ (500 units) | Profit $45,000 |
| 8 | **Absolute min:** $x=0$, $P(0)=-10$ (loss) | Loss $10,000 |

**Teacher Narration** `[114w]`
> Let's apply derivative tests to a real-world problem. A company's profit in thousands from selling x hundred units is given by this cubic. First derivative gives critical numbers at x equals 2 and 3. The second derivative tells us x equals 2 is a local maximum with profit 18 thousand, and x equals 3 is a local minimum with profit 17 thousand. But we must check the endpoints of the interval zero to five. At zero units, they lose 10 thousand. At 500 units, profit is 45 thousand. So the absolute maximum profit is at the right endpoint, not at the local interior maximum. Always check endpoints for absolute extrema on a closed interval.

**Student Prompt:** Why is the absolute maximum at the endpoint? What does that tell you about this profit function?

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Proof Sketch of Both Tests**  ·  `split_left_right`

**On-screen text** `[26w]`
Proofs for those interested. FDT: sign change of f' determines max/min. SDT: f''>0 => f' increasing => crosses from - to + => min. f''(c)=0 inconclusive.

**LEFT** `[text]`

**First Derivative Test Proof:**

If $f'$ changes $+$ to $-$ at $c$, then $f$ increases before $c$ and decreases after $c$. Hence $f(c)$ is greater than nearby values → local max. (Analogous for $-$ to $+$.)

**Second Derivative Test Proof:**

If $f'(c)=0$ and $f''(c)>0$, then $f'$ is increasing near $c$. Since $f'(c)=0$, $f'$ is negative just left of $c$ and positive just right → by FDT, local min. The case $f''(c)<0$ gives local max by similar reasoning.

Why $f''(c)=0$ is inconclusive: $f'$ may not change sign (e.g., $x^3$), or may have higher-order behavior.

**RIGHT** `[visual_spec]`

*Visual Spec:* Animated diagram showing the relationship: For FDT, show a number line with + and - signs and the function shape. For SDT, show a zoomed-in view of f' near c: when f''>0, f' crosses zero from negative to positive. Use colored arrows and callouts. Title: 'Proof sketch of derivative tests'.

*Interactive Controls:*
  - 🎛 Slider: adjust f'' at c from negative to positive and see how f' changes slope

```python
import numpy as np
import matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1,2, figsize=(10,4))
# FDT visualization
x = np.linspace(-2,2,400)
ax1.plot(x, -x**2 + 2, 'b-', linewidth=2)
ax1.plot(0,2,'ro')
ax1.annotate('f\' > 0', xy=(-1,1), fontsize=10, color='green')
ax1.annotate('f\' < 0', xy=(1,1), fontsize=10, color='red')
ax1.set_title('FDT: + to - => max')
ax1.grid(alpha=0.3)
# SDT visualization: f' near c
x2 = np.linspace(-2,2,400)
# suppose f'(x)=x => f''(0)=1>0
ax2.plot(x2, x2, 'g-', linewidth=2, label="f'(x)")
ax2.axhline(0, color='gray', linestyle='--')
ax2.plot(0,0,'ro')
ax2.set_title('SDT: f\'(c)=0, f''''>0 => f\' crosses upward => min')
ax2.set_xlabel('x')
ax2.set_ylabel("f'(x)")
ax2.legend(loc='upper left')
ax2.grid(alpha=0.3)
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[141w ⚠️ **OVERLONG: 141w > 120w max**]`
> For those who want a deeper understanding, here's a quick sketch of why both tests work. The First Derivative Test is almost by definition: if the derivative changes from positive to negative, the function goes from increasing to decreasing, so you get a peak. The Second Derivative Test relies on the fact that the second derivative tells you how the first derivative changes. If the first derivative is zero and the second derivative is positive, then near that point the first derivative is increasing. Since it's zero at c, it must be negative just before and positive just after — that's exactly the pattern for a minimum by the First Derivative Test. When the second derivative is zero, the first derivative might not change sign, as in x cubed, or it might have higher-order behavior. That's why the test is inconclusive.

**Student Prompt:** Why does f(x)=x^4 have f''(0)=0 but still a minimum? (Hint: think about f' sign behavior: - then +).

---

### Slide 13 · [MISCONCEPTION]
**Another Mistake: f''(c)=0 Means No Extremum?**  ·  `split_left_right`

**On-screen text** `[22w]`
Myth: f''(c)=0 means no extremum. Counterexample: f(x)=x^4 has f''(0)=0 but FDT shows local min (sign - to +). Inconclusive ≠ no extremum.

**LEFT** `[text]`

**Wrong thought:** "If $f''(c)=0$, there is no local extremum at $c$."

**Counterexample:** $f(x)=x^4$ at $x=0$.
- $f'(0)=0$, $f''(0)=0$ (inconclusive).
- First Derivative Test: $f'(x)=4x^3$. For $x<0$, $f'(x)<0$; for $x>0$, $f'(x)>0$. So $- \to +$ => **local minimum** at $x=0$.

Conclusion: $f''(c)=0$ means we need more information, not that there is no extremum.

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of f(x)=x^4 from x=-2 to x=2. Mark the point (0,0) with a green circle and label 'minimum'. Show the tangent line is horizontal. Add a callout: 'f''(0)=0, but it's still a minimum!' Use bright colors to emphasize the counterexample. Title: 'Myth busted: f''(c)=0 can still be an extremum.'

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2, 2, 400)
f = x**4
plt.figure(figsize=(8,5))
plt.plot(x, f, 'b-', linewidth=2, label='f(x)=x^4')
plt.plot(0, 0, 'go', markersize=12, label='Local min at (0,0)')
plt.plot([-1,1],[0,0],'r--', linewidth=1.5, label='Horizontal tangent')
plt.text(0.5, 1, 'f\'\'(0)=0 but still minimum!', fontsize=12, bbox=dict(facecolor='yellow', alpha=0.7))
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Myth: f\'\'(c)=0 means no extremum. FALSE!')
plt.legend()
plt.grid(alpha=0.3)
plt.show()
```

**Teacher Narration** `[101w]`
> Here's another misconception to watch out for. Some students mistakenly think that if the second derivative is zero, there cannot be an extremum. But that's false. Look at f of x equals x to the fourth. At x equals zero, the first derivative is zero, the second derivative is zero, yet the graph clearly has a minimum. The Second Derivative Test is inconclusive, but the First Derivative Test still works: the derivative changes from negative to positive, confirming a local minimum. So never jump to conclusions when the second derivative is zero — always fall back to the First Derivative Test.

**Student Prompt:** Give another example where f''(c)=0 but there is a local maximum. (Hint: f(x)=-x^4 works.)

---

### Slide 14 · [SUMMARY] ⏸️ *[YouTube Pause]* 🎛 *[3 controls]*
**Quick Check & Summary**  ·  `full_width`

**On-screen text** `[33w]`
Quick Check: 1) f(x)=x³-3x, x=1? 2) f'(2)=0, f''(2)=0? 3) f' signs: + - + at 0 and 2? Summary: FDT checks sign change of f'; SDT uses f''. When SDT inconclusive, use FDT.

**FULL WIDTH** `[text]`

**Three Quick Questions**

1. For $f(x)=x^3-3x$, the point $x=1$ is:
   A) local max   B) local min   C) neither   D) inconclusive

2. If $f'(2)=0$ and $f''(2)=0$, we conclude:
   A) local max   B) local min   C) test inconclusive   D) no extremum

3. A function has critical numbers at 0 and 2. $f'$ is + on (-1,0), - on (0,2), + on (2,3). Then:
   A) max at 0, min at 2   B) min at 0, max at 2   C) both max   D) both min

*(Answers: 1→B, 2→C, 3→A)*

**Key Formulas:**
- First Derivative Test: sign change of $f'$ ⇒ type.
- Second Derivative Test: $f''(c)>0$ ⇒ min; $f''(c)<0$ ⇒ max; $f''(c)=0$ ⇒ inconclusive.

You now have tools to classify critical points efficiently!

**Teacher Narration** `[132w ⚠️ **OVERLONG: 132w > 120w max**]`
> Let's check your understanding with three quick questions. First: for f of x equals x cubed minus three x, the point x equals one. The derivative at one is zero, second derivative at one is six positive, so it's a local minimum. Second: if both first and second derivatives are zero at a point, the test is inconclusive — you need the first derivative test. Third: given the sign pattern plus, minus, plus at critical numbers zero and two: the change from plus to minus at zero means local max, and minus to plus at two means local min. So answer A is correct. Great job! Now you have both derivative tests in your toolbox. Use the second derivative test first for speed, but always fall back to the first when needed.

**Student Prompt:** Review the learning objectives. Can you now: identify critical numbers, apply both tests, and know when to use each?

---
