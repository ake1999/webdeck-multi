# Improper Integrals: Infinite Area or Finite?

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You should know definite integrals, limits, and basic integration techniques (power rule, substitution).

**Learning Objectives:**
- Define Type I and Type II improper integrals
- Evaluate improper integrals using limits
- Apply the p-integral test for convergence
- Use the comparison test for convergence
- Identify and handle interior singularities

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 71w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 13 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
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
| 1 | hook | 🟢 | ◧ |  | 65w | 9w | Can Infinity Have Finite Area? |
| 2 | 🎛core | 🟢 | ◧ | ⏸️ | 93w | 6w | Type I: Infinite Intervals |
| 3 | practice | 🟢 | ⬛⬛ |  | 77w | 3w | Example 1: Warm-Up — 1/x² |
| 4 | 🎛core | 🟢 | ◧ |  | 71w | 12w | The p-Integral Test |
| 5 | 🎛challenge | 🔴 | ◧ |  | 65w | 10w | [Challenge – Optional] Proof of p-Test |
| 6 | practice | 🟢 | ⬛⬛ |  | 79w | 3w | Example 2: Standard — Type II (1/√x) |
| 7 | 🎛misconception | 🟢 | ◧ | ⏸️ | 68w | 10w | Misconception: Interior Singularity |
| 8 | practice | 🟡 | ⬛⬛ |  | 73w | 7w | Example 3: Tricky — Correct Method |
| 9 | 🎛visual_lab | 🟡 | ◧ | ⏸️ | 66w | 7w | Example 4: Edge Case — 1/(x ln x) |
| 10 | core | 🟢 | ◧ |  | 68w | 12w | The Comparison Test |
| 11 | practice | 🟡 | ⬛⬛ |  | 66w | 4w | Example 5: Application of Comparison |
| 12 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 68w | 5w | Quick Check: Test Yourself |
| 13 | summary | 🟢 | ⬛⬛ |  | 69w | 12w | Summary & Key Takeaways |

---

### Slide 1 · [HOOK]
**Can Infinity Have Finite Area?**  ·  `split_left_right`

**On-screen text** `[9w]`
Which area is finite? Under 1/x² or under 1/x?

**LEFT** `[text]`

Which area is finite?

1. Under $y = \frac{1}{x^2}$ from $1$ to $\infty$?
2. Under $y = \frac{1}{x}$ from $1$ to $\infty$?

**RIGHT** `[visual_spec]`

*Visual Spec:* Two subplots: left shows graph of 1/x^2 from 1 to infinity, shading under curve, area labeled 'Area = 1'. Right shows graph of 1/x from 1 to infinity, shading under curve, area labeled 'Area → ∞'. Both x-axis from 1 to 10, y-axis from 0 to 2.

**Teacher Narration** `[65w]`
> Here's a surprising fact: an infinitely long region can have a finite area. For example, the area under 1 over x squared from 1 to infinity is exactly 1. But the area under 1 over x from 1 to infinity is infinite. Why? The key is how fast the function approaches zero. Today we'll learn how to decide when an improper integral converges or diverges.

---

### Slide 2 · [CORE] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Type I: Infinite Intervals**  ·  `split_left_right`

**On-screen text** `[6w]`
$$\int_a^\infty f(x)\,dx = \lim_{t\to\infty} \int_a^t f(x)\,dx$$

**LEFT** `[concept]`

$$\int_a^\infty f(x)\,dx = \lim_{t \to \infty} \int_a^t f(x)\,dx$$

Replace the infinite bound with a limit.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot y=e^{-x} from 0 to 10. Shaded area from 0 to t. Slider for t (1 to 10). Display area value updating. When t=10, area ≈ 0.99995. Color: blue shading, black curve.

*Interactive Controls:*
  - 🎛 Slider for t from 1 to 10

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(8, 5))
plt.subplots_adjust(bottom=0.25)
x = np.linspace(0, 10, 500)
y = np.exp(-x)
line, = ax.plot(x, y, 'k', lw=2)
ax.set_xlim(0, 10)
ax.set_ylim(0, 1.2)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Area under e^{-x} from 0 to t')

# initial t=1
t_init = 1
x_fill = np.linspace(0, t_init, 100)
y_fill = np.exp(-x_fill)
fill = ax.fill_between(x_fill, y_fill, alpha=0.3, color='blue')
area_text = ax.text(0.5, 0.9, f'Area = {np.trapz(y_fill, x_fill):.5f}', fontsize=12)

ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 't', 1, 10, valinit=t_init)

def update(val):
    t = slider.val
    x_fill = np.linspace(0, t, 100)
    y_fill = np.exp(-x_fill)
    area = np.trapz(y_fill, x_fill)
    fill.set_verts([np.column_stack([x_fill, y_fill])])
    area_text.set_text(f'Area = {area:.5f}')
    fig.canvas.draw_idle()

slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[93w]`
> When we write an integral to infinity, we really mean a limit. We integrate to a finite upper limit t, then let t go to infinity. If the limit exists and is finite, the integral converges. Otherwise it diverges. Let's see this visually with e to the minus x. As t increases, the shaded area accumulates and approaches a finite number, which is the value of the improper integral. This visual helps us understand that even though the interval is infinite, the total area can be finite if the function decays quickly enough.

**Student Prompt:** Predict: As t increases, does the shaded area approach a finite number or grow without bound?

---

### Slide 3 · [PRACTICE]
**Example 1: Warm-Up — 1/x²**  ·  `full_width`

**On-screen text** `[3w]`
Evaluate $\int_1^\infty \frac{1}{x^2}\,dx$

**FULL WIDTH** `[steps]`

| Step | Work | Explanation |
|------|------|-------------|
| 1 | $\int_1^\infty \frac{1}{x^2}\,dx = \lim_{t\to\infty} \int_1^t x^{-2}\,dx$ | Convert to limit |
| 2 | $= \lim_{t\to\infty} \left[-x^{-1}\right]_1^t$ | Integrate: $\int x^{-2}dx = -x^{-1}$ |
| 3 | $= \lim_{t\to\infty} \left(-\frac{1}{t} + 1\right)$ | Evaluate bounds |
| 4 | $= 1$ | Limit exists → converges |

**Teacher Narration** `[77w]`
> Let's work through our first example. We start by rewriting as a limit, use the power rule to find the antiderivative, evaluate at the bounds, and then take the limit. As t goes to infinity, 1/t goes to 0, so we get 1. The integral converges to 1. This is a classic example that shows how an infinite region can have a finite area, and it sets the stage for the p-integral test which generalizes this result.

---

### Slide 4 · [CORE] 🎛 *[1 controls]*
**The p-Integral Test**  ·  `split_left_right`

**On-screen text** `[12w]`
For $\int_1^\infty 1/x^p dx$: converges if $p>1$, diverges if $p \le 1$

**LEFT** `[formula_block]`

$$\int_1^\infty \frac{1}{x^p}\,dx \begin{cases} \text{converges if } p > 1 \\ \text{diverges if } p \le 1 \end{cases}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of 1/x^p from 1 to 5 (or 10). Axes: x 0 to 5, y 0 to 3. Four radio buttons for p values. For each p, shade area under curve and display 'Converges' or 'Diverges' based on p-test. Color: curve in black, shade in light red if diverges, light green if converges.

*Interactive Controls:*
  - 🎛 Radio: p = 0.5, 1, 1.5, 2

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import RadioButtons

fig, ax = plt.subplots(figsize=(8, 5))
plt.subplots_adjust(bottom=0.25, left=0.1)
x = np.linspace(1, 5, 400)

# initial p=2
p_init = 2
y_initial = x**(-p_init)
line, = ax.plot(x, y_initial, 'k', lw=2)
fill = ax.fill_between(x, y_initial, alpha=0.3, color='green')
ax.set_xlim(0, 5)
ax.set_ylim(0, 3)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('p-integral test')

# text for status
status_text = ax.text(0.5, 0.9, 'Converges', transform=ax.transAxes, fontsize=12, ha='center')

# radio buttons
rax = plt.axes([0.75, 0.3, 0.15, 0.4])
radio = RadioButtons(rax, ('0.5', '1', '1.5', '2'))

def update(label):
    p = float(label)
    y = x**(-p)
    line.set_ydata(y)
    ax.collections.clear()
    if p > 1:
        color = 'green'
        status_text.set_text('Converges')
    else:
        color = 'red'
        status_text.set_text('Diverges')
    fill = ax.fill_between(x, y, alpha=0.3, color=color)
    fig.canvas.draw_idle()

radio.on_clicked(update)
plt.show()
```

**Teacher Narration** `[71w]`
> The function 1 over x to the p is the benchmark for improper integrals. If p is greater than 1, the function decays fast enough for the area to be finite. If p is 1 or less, the area is infinite. Remember this test — it's your best friend. The radio buttons let you see how the shape of the curve changes with p and whether the area converges or diverges.

---

### Slide 5 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Proof of p-Test**  ·  `split_left_right`

**On-screen text** `[10w]`
Proof: antiderivative is $(t^{1-p}-1)/(1-p)$; limit depends on sign of $1-p$.

**LEFT** `[steps]`

**Proof for $\int_1^\infty x^{-p}\,dx$:**
- $p=1$: $\int_1^t \frac{1}{x}\,dx = \ln t \to \infty$ → diverges
- $p \neq 1$: $\int_1^t x^{-p}\,dx = \frac{t^{1-p} - 1}{1-p}$
  - If $p>1$, $1-p<0$ → $t^{1-p}\to0$, limit = $1/(p-1)$
  - If $p<1$, $1-p>0$ → $t^{1-p}\to\infty$, diverges

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot 1/x^p from 1 to 10. Shading area under curve. Slider for p (0.5 to 2). Display numeric area value. For p>1 area converges to finite number, for p<=1 area diverges. Color: green for converging, red for diverging.

*Interactive Controls:*
  - 🎛 Slider for p from 0.5 to 2

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(8, 5))
plt.subplots_adjust(bottom=0.25)
x = np.linspace(1, 10, 400)

p_init = 1.5
y = x**(-p_init)
line, = ax.plot(x, y, 'k', lw=2)
fill = ax.fill_between(x, y, alpha=0.3, color='green')
ax.set_xlim(0, 10)
ax.set_ylim(0, 2)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('p-integral: area as t→∞')

area_text = ax.text(0.05, 0.9, f'Area = {np.trapz(y, x):.3f}', transform=ax.transAxes, fontsize=12)

ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 'p', 0.5, 2.0, valinit=p_init)

def update(val):
    p = slider.val
    y = x**(-p)
    line.set_ydata(y)
    ax.collections.clear()
    area = np.trapz(y, x)
    color = 'green' if p > 1 else 'red'
    fill = ax.fill_between(x, y, alpha=0.3, color=color)
    area_text.set_text(f'Area ≈ {area:.3f} (p={p:.1f})')
    fig.canvas.draw_idle()

slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[65w]`
> This slide shows the formal proof. The antiderivative is the same for all p except 1. The key is the exponent 1-p. When p is greater than 1, 1-p is negative, so t to a negative power goes to 0. When p is less than 1, t to a positive power goes to infinity. And p equals 1 gives the natural logarithm, which also diverges.

---

### Slide 6 · [PRACTICE]
**Example 2: Standard — Type II (1/√x)**  ·  `full_width`

**On-screen text** `[3w]`
Evaluate $\int_0^1 \frac{1}{\sqrt{x}}\,dx$

**FULL WIDTH** `[steps]`

| Step | Work | Explanation |
|------|------|-------------|
| 1 | $\int_0^1 \frac{1}{\sqrt{x}}\,dx = \lim_{t \to 0^+} \int_t^1 x^{-1/2}\,dx$ | Asymptote at 0 |
| 2 | $= \lim_{t \to 0^+} \left[2x^{1/2}\right]_t^1$ | Integrate: $\int x^{-1/2}dx = 2x^{1/2}$ |
| 3 | $= \lim_{t \to 0^+} (2 - 2\sqrt{t})$ | Evaluate bounds |
| 4 | $= 2$ | Limit exists → converges |

**Teacher Narration** `[79w]`
> Now an example where the function is unbounded at the left endpoint. We approach from the right, integrate from t to 1, then let t go to 0. The antiderivative is 2 root x. At x=1 we get 2, at x=t we get 2 root t, which goes to 0. So the integral converges to 2. This is a Type II improper integral, and the key is to handle the singularity by taking a limit as we approach it.

---

### Slide 7 · [MISCONCEPTION] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Misconception: Interior Singularity**  ·  `split_left_right`

**On-screen text** `[10w]`
Never apply FTC without checking for singularities inside the interval.

**LEFT** `[text]`

**Wrong approach:**
$$\int_{-1}^2 \frac{1}{x^2}\,dx = \left[-\frac{1}{x}\right]_{-1}^2 = -\frac{1}{2} - 1 = -\frac{3}{2}$$

**Why it's wrong:** The function has a vertical asymptote at $x=0$, which is inside the interval. The FTC does not apply.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot 1/x^2 from -1 to 2 with asymptote at 0. Shade region from -1 to 2 in red to indicate infinite area. Add text 'Asymptote at x=0' and 'Area is infinite'. Use dashed vertical line at x=0.

*Interactive Controls:*
  - 🎛 Button: show correct split

```python
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 5))
x = np.linspace(-1, 2, 800)
# Avoid singular point
x_left = np.linspace(-1, -0.01, 200)
x_right = np.linspace(0.01, 2, 300)
y_left = 1/x_left**2
y_right = 1/x_right**2
ax.plot(x_left, y_left, 'b', lw=2)
ax.plot(x_right, y_right, 'b', lw=2)
ax.set_xlim(-1.5, 2.5)
ax.set_ylim(0, 10)
ax.axvline(0, color='red', linestyle='--', lw=2, label='Asymptote at x=0')
ax.fill_between(x_left, y_left, alpha=0.3, color='red')
ax.fill_between(x_right, y_right, alpha=0.3, color='red')
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Area is infinite (diverges)')
ax.legend()
plt.show()
```

**Teacher Narration** `[68w]`
> A common mistake is to treat this as a regular definite integral. But there is a vertical asymptote at x equals 0 inside the interval. The Fundamental Theorem of Calculus does not apply when the function is unbounded on the interval. You must split the integral at the singularity and check each part separately. This is a critical point: always check for interior singularities before applying the FTC.

**Student Prompt:** What goes wrong if you integrate directly?

---

### Slide 8 · [PRACTICE] 🟡
**Example 3: Tricky — Correct Method**  ·  `full_width`

**On-screen text** `[7w]`
Correct: $\int_{-1}^2 1/x^2\,dx$ diverges (right piece diverges).

**FULL WIDTH** `[steps]`

| Step | Work | Explanation |
|------|------|-------------|
| 1 | $\int_{-1}^2 \frac{1}{x^2}\,dx = \int_{-1}^0 + \int_0^2$ | Split at singularity |
| 2 | $\int_0^2 \frac{1}{x^2}\,dx = \lim_{t \to 0^+} \left[-\frac{1}{x}\right]_t^2$ | Evaluate right piece |
| 3 | $= \lim_{t \to 0^+} \left(-\frac{1}{2} + \frac{1}{t}\right) = +\infty$ | Diverges |
| 4 | Since one part diverges, the whole integral diverges. | Conclusion |

**Teacher Narration** `[73w]`
> We split at x=0 into two integrals. The part from 0 to 2 diverges because near 0, 1 over x squared behaves like 1 over x to the power 2, which is greater than 1. The p-test for Type II says diverges if p is greater than or equal to 1. Since one part diverges, the whole integral diverges. This shows the correct method: split at the singularity and evaluate each part separately.

---

### Slide 9 · [VISUAL_LAB] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Example 4: Edge Case — 1/(x ln x)**  ·  `split_left_right`

**On-screen text** `[7w]`
Does $\int_2^\infty \frac{dx}{x\ln x}$ converge? Try p=1.

**LEFT** `[text]`

Investigate:

$$\int_2^\infty \frac{1}{x \ln x}\,dx$$

And more generally:

$$\int_2^\infty \frac{1}{x (\ln x)^p}\,dx$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot 1/(x (ln x)^p) from 2 to 10. Shading area. Slider for p from 0.5 to 2. Display area value and convergence/divergence label. For p>1 area converges (label green), for p<=1 diverges (label red).

*Interactive Controls:*
  - 🎛 Slider for p from 0.5 to 2

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(8, 5))
plt.subplots_adjust(bottom=0.25)
x = np.linspace(2, 10, 400)

p_init = 1.0
y = 1/(x * (np.log(x))**p_init)
line, = ax.plot(x, y, 'k', lw=2)
fill = ax.fill_between(x, y, alpha=0.3, color='red')
ax.set_xlim(0, 10)
ax.set_ylim(0, 0.5)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Area under 1/(x (ln x)^p)')

status_text = ax.text(0.05, 0.9, '', transform=ax.transAxes, fontsize=12)

ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 'p', 0.5, 2.0, valinit=p_init)

def update(val):
    p = slider.val
    y = 1/(x * (np.log(x))**p)
    line.set_ydata(y)
    ax.collections.clear()
    area = np.trapz(y, x)
    if p > 1:
        color = 'green'
        status_text.set_text(f'Converges (area ≈ {area:.3f})')
    else:
        color = 'red'
        status_text.set_text(f'Diverges (area grows, here ≈ {area:.3f})')
    fill = ax.fill_between(x, y, alpha=0.3, color=color)
    fig.canvas.draw_idle()

slider.on_changed(update)
update(p_init)
plt.show()
```

**Teacher Narration** `[66w]`
> This integral is on the boundary. It decays faster than 1/x but not fast enough. Using substitution u equals ln x, we get the integral of 1/u du, which diverges like ln(ln t). This reveals a whole family: 1 over x times ln x to the p converges only if p is greater than 1. The slider lets you explore how the area changes with p.

**Student Prompt:** Predict: Does the integral converge when p=1?

---

### Slide 10 · [CORE]
**The Comparison Test**  ·  `split_left_right`

**On-screen text** `[12w]`
Comparison Test: smaller under convergent ceiling converges; larger above divergent floor diverges.

**LEFT** `[text]`

If $0 \le f(x) \le g(x)$ for $x \ge a$, then:

- $\int_a^\infty g$ converges $\Rightarrow$ $\int_a^\infty f$ converges
- $\int_a^\infty f$ diverges $\Rightarrow$ $\int_a^\infty g$ diverges

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of f(x)=1/(x^2+e^{-x}) (blue) and g(x)=1/x^2 (red) from 1 to 5. Shade both areas. Label f as 'smaller function' and g as 'larger function'. Since area under g converges (p=2), area under f must converge.

```python
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 5))
x = np.linspace(1, 5, 400)
f = 1/(x**2 + np.exp(-x))
g = 1/(x**2)
ax.plot(x, f, 'b', lw=2, label='f(x) = 1/(x^2+e^{-x})')
ax.plot(x, g, 'r', lw=2, label='g(x) = 1/x^2')
ax.fill_between(x, f, alpha=0.3, color='blue', label='Area under f')
ax.fill_between(x, g, alpha=0.1, color='red', label='Area under g')
ax.set_xlim(0, 5)
ax.set_ylim(0, 1)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.legend()
ax.set_title('Comparison Test: f ≤ g, so if ∫g converges then ∫f converges')
plt.show()
```

**Teacher Narration** `[68w]`
> When you can't integrate directly, compare your function to a known benchmark. If your function is smaller than something that converges, it must also converge. If it's larger than something that diverges, it must diverge. Be careful: the theorem only works in these two directions. The visual shows how the area under f is less than the area under g, so if g converges, f must also converge.

---

### Slide 11 · [PRACTICE] 🟡
**Example 5: Application of Comparison**  ·  `full_width`

**On-screen text** `[4w]`
Does $\int_1^\infty \frac{1}{x^2+e^{-x}}\,dx$ converge?

**FULL WIDTH** `[steps]`

| Step | Work | Explanation |
|------|------|-------------|
| 1 | For $x \ge 1$, $e^{-x}>0$, so $x^2+e^{-x} > x^2$ | Denominator larger |
| 2 | $\frac{1}{x^2+e^{-x}} < \frac{1}{x^2}$ | Smaller function |
| 3 | $\int_1^\infty \frac{1}{x^2}\,dx$ converges (p=2>1) | p-test |
| 4 | By comparison, $\int_1^\infty \frac{1}{x^2+e^{-x}}\,dx$ converges | Smaller under convergent ceiling |

**Teacher Narration** `[66w]`
> We compare to 1 over x squared. Since e to the minus x is positive, the denominator is larger than x squared, so the fraction is smaller. The p-test tells us that 1 over x squared converges, so by the comparison test, our integral also converges. This is a typical application: find a simpler function that bounds yours and use the p-test or another known result.

---

### Slide 12 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Quick Check: Test Yourself**  ·  `split_left_right`

**On-screen text** `[5w]`
Pause and try these questions.

**LEFT** `[text]`

1. Which integral converges?
   A. $\int_1^\infty \frac{1}{\sqrt{x}}\,dx$
   B. $\int_1^\infty \frac{1}{x^{3/2}}\,dx$
   C. $\int_1^\infty \frac{1}{x}\,dx$

2. Value of $\int_0^1 \frac{1}{x^{1/3}}\,dx$?
   A. Diverges   B. $\frac{3}{2}$   C. $3$

3. True/False: $\int_{-2}^3 \frac{1}{x^2}\,dx$ converges.

**RIGHT** `[visual_spec]`

*Visual Spec:* A static display of the three multiple-choice questions. No animation needed. For interactive, use radio buttons and a reveal button.

*Interactive Controls:*
  - 🎛 Radio buttons for each question
  - 🎛 Button: check answers

```python
import ipywidgets as widgets
from IPython.display import display

q1 = widgets.RadioButtons(
    options=['A', 'B', 'C'],
    value='B',
    description='Q1:'
)
q2 = widgets.RadioButtons(
    options=['Diverges', '3/2', '3'],
    value='3/2',
    description='Q2:'
)
q3 = widgets.RadioButtons(
    options=['True', 'False'],
    value='False',
    description='Q3:'
)
button = widgets.Button(description='Check Answers')
output = widgets.Output()

def on_button_clicked(b):
    with output:
        output.clear_output()
        print('Q1: B - converges (p=1.5>1)')
        print('Q2: 3/2 - converges (p=1/3<1)')
        print('Q3: False - diverges (asymptote at x=0)')

button.on_click(on_button_clicked)
display(q1, q2, q3, button, output)
```

**Teacher Narration** `[68w]`
> Take a moment to try these three questions. Pause the video if you need more time. We'll go through the answers: For question 1, only B converges because p=1.5 > 1. For question 2, p=1/3 < 1 so converges to 3/2. For question 3, there's a singularity at 0, so it diverges. These questions test your understanding of the p-test and the importance of checking for interior singularities.

**Student Prompt:** Pause and try these questions.

---

### Slide 13 · [SUMMARY]
**Summary & Key Takeaways**  ·  `full_width`

**On-screen text** `[12w]`
Summary: convert to limit, evaluate, check convergence. Use p-test and comparison test.

**FULL WIDTH** `[text]`

**Three-step process:**
1. Identify Type I (infinite bound) or Type II (unbounded integrand)
2. Convert to a limit
3. Evaluate the limit

**p-test:** $\int_1^\infty 1/x^p\,dx$ converges if $p>1$; $\int_0^1 1/x^p\,dx$ converges if $p<1$

**Comparison test:** $0 \le f \le g$; if $\int g$ converges then $\int f$ converges; if $\int f$ diverges then $\int g$ diverges

**Always check for interior singularities!**

**Teacher Narration** `[69w]`
> Today we learned that improper integrals are limits of definite integrals. Type I with infinite intervals and Type II with unbounded integrands. The p-test tells us when 1 over x to the p converges. Always check for interior singularities. The comparison test helps when direct integration is hard. Practice these ideas to build intuition. Remember the three-step process: identify the type, convert to a limit, and evaluate the limit.

---
