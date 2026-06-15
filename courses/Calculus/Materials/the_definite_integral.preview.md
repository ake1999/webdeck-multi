# The Definite Integral

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You should already know antiderivatives (indefinite integrals) and the basic limit concept.

**Learning Objectives:**
- Calculate definite integrals using Riemann sums and the Fundamental Theorem of Calculus
- Interpret the definite integral as net area and accumulated change
- Apply the substitution rule to evaluate definite integrals with transformed limits
- Analyze the relationship between the definite integral and antiderivatives
- Evaluate definite integrals in applied contexts including area and accumulation problems

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 76w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
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
| 1 | 🎛hook | 🟢 | ◧ |  | 83w | 20w | From Changing Rates to Net Change |
| 2 | 🎛core | 🟢 | ◧ |  | 80w | 16w | Definition: The Definite Integral |
| 3 | practice | 🟢 | ⬛⬛ | ⏸️ | 72w | 12w | Warm‑Up: Riemann Sum Computation |
| 4 | 🎛visual_lab | 🟢 | ◧ |  | 68w | 13w | Visualizing Riemann Sums |
| 5 | 🎛core | 🟢 | ◧ |  | 71w | 15w | Fundamental Theorem of Calculus – Part 1 |
| 6 | core | 🟢 | ◧ |  | 71w | 12w | Fundamental Theorem of Calculus – Part 2 |
| 7 | practice | 🟢 | ⬛⬛ | ⏸️ | 72w | 10w | Standard Example using FTC2 |
| 8 | misconception | 🟢 | ◧ |  | 81w | 16w | Common Mistake: Forgetting to Change Limits in Substitution |
| 9 | practice | 🟡 | ◧ | ⏸️ | 73w | 10w | Tricky Example: Substitution with Limit Change |
| 10 | 🎛core | 🟢 | ◧ |  | 83w | 12w | Symmetry: Even and Odd Functions |
| 11 | practice | 🟢 | ◧ |  | 63w | 12w | Example: Even Function Integral |
| 12 | practice | 🟡 | ◧ |  | 93w | 11w | Application: Accumulated Water Volume |
| 13 | 🎛challenge | 🔴 | ◧ |  | 85w | 14w | [Challenge – Optional] Proof: FTC1 from the Definition |
| 14 | summary | 🟢 | ⬛⬛ |  | 70w | 15w | Summary |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**From Changing Rates to Net Change**  ·  `split_left_right`

**On-screen text** `[20w]`
A varying rate creates a total change found by adding up all the small contributions — that’s the definite integral.

**LEFT** `[concept]`

Water flows into a reservoir at a rate that varies hour by hour. How do we find the total change in water level from dawn to dusk when the rate isn’t constant?

**RIGHT** `[visual_spec]`

*Visual Spec:* Animate a reservoir silhouette (blue rectangle) whose height changes according to a sinusoidal rate function r(t)=10+2 sin(t) over [0,24]. Below, plot r(t) with shaded area under curve. Use a slider for time to show cumulative volume. Axes: time (hours), rate (gallons per hour). Highlight that total change = area under rate curve.

*Interactive Controls:*
  - 🎛 Slider for time from 0 to 24 hours

```python
import numpy as np, matplotlib.pyplot as plt
from matplotlib.widgets import Slider
fig, (ax1, ax2) = plt.subplots(2,1, gridspec_kw={'height_ratios':[1,2]})
fig.subplots_adjust(bottom=0.25)
t = np.linspace(0,24,500)
r = 10 + 2*np.sin(t)
V = np.cumsum(r)*(t[1]-t[0])
ax2.plot(t, r, 'b-', lw=2)
ax2.set_xlim(0,24)
ax2.set_ylim(5,15)
ax2.set_xlabel('Time (h)')
ax2.set_ylabel('Rate (gal/h)')
ax2.fill(t[0:0], r[0:0], alpha=0.3, color='blue')
ax1.set_xlim(0,24)
ax1.set_ylim(0,2)
ax1.bar(0, 0, width=24, color='blue', alpha=0.5)
ax1.set_ylabel('Water Level (ft)')
ax1.text(12, 1, 'Reservoir', ha='center')
# Slider
ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_slider, 'Time (h)', 0, 24, valinit=0)
def update(val):
    idx = int(val/t[1])
    ax2.collections.clear()
    ax2.fill(t[:idx], r[:idx], alpha=0.3, color='blue')
    ax1.cla()
    height = V[idx]
    ax1.bar(12, height, width=24, color='blue', alpha=0.5)
    ax1.set_xlim(0,24)
    ax1.set_ylim(0, max(V))
    ax1.set_ylabel('Water Level (ft)')
    ax1.text(12, height/2, f'{height:.1f} ft', ha='center')
    fig.canvas.draw_idle()
slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[83w]`
> Imagine you are tracking the water level in a reservoir over a full day. The rate of inflow changes every hour — sometimes it rains, sometimes water is released. You can’t just multiply one rate by the total time because the rate isn’t constant. The definite integral solves this by adding up all the tiny changes over each moment, giving you the net accumulation. This is the central idea we will explore today: the area under a rate curve equals the total change.

**Student Prompt:** Think of a real-world situation where a quantity changes at a non-constant rate. How would you find the total change?

---

### Slide 2 · [CORE] 🎛 *[2 controls]*
**Definition: The Definite Integral**  ·  `split_left_right`

**On-screen text** `[16w]`
The definite integral is the limit of Riemann sums as the number of rectangles approaches infinity.

**LEFT** `[formula_block]`

$$
\int_a^b f(x)\,dx = \lim_{n\to\infty} \sum_{i=1}^n f(x_i^*)\,\Delta x
$$

$\Delta x = \frac{b-a}{n}$, $x_i^*$ is any sample point in the $i$th subinterval.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the function f(x)=2x+1 over [1,3]. Show n rectangles using right endpoints. As n increases via a slider (1 to 50), the rectangles better approximate the area. Overlay the exact area value (10). Label axes: x, y. Highlight the sample points on the curve. Include a radio button to switch between left, right, and midpoint endpoints. Show the computed sum and error compared to exact area.

*Interactive Controls:*
  - 🎛 Slider for number of rectangles n from 1 to 50
  - 🎛 Radio buttons for endpoint choice: left, right, midpoint

```python
import numpy as np, matplotlib.pyplot as plt
from matplotlib.widgets import Slider, RadioButtons

fig, ax = plt.subplots(figsize=(8,4))
plt.subplots_adjust(bottom=0.25)
ax.set_xlim(0.5,3.5)
ax.set_ylim(0,8)
x_vals = np.linspace(1,3,400)
y_vals = 2*x_vals+1
ax.plot(x_vals, y_vals, 'k-', lw=2, label='f(x)=2x+1')
exact_area = 10
ax.axhline(0, color='gray')
n_init = 4
a, b = 1, 3
dx = (b-a)/n_init
x_rect = np.linspace(a+dx, b, n_init)
rects = ax.bar(x_rect, 2*x_rect+1, width=dx, align='edge', edgecolor='black', alpha=0.5, color='steelblue')
sum_text = ax.text(0.5, 7.5, f'Sum = {np.sum(2*x_rect+1)*dx:.2f}', fontsize=10, transform=ax.transData)

def update_sum(n_val, endpoint='right'):
    n = int(n_val)
    dx = (b-a)/n
    if endpoint == 'right':
        xs = np.linspace(a+dx, b, n)
    elif endpoint == 'left':
        xs = np.linspace(a, b-dx, n)
    else:
        xs = np.linspace(a+dx/2, b-dx/2, n)
    heights = 2*xs+1
    ax.clear()
    ax.plot(x_vals, y_vals, 'k-', lw=2)
    ax.bar(xs, heights, width=dx, align='edge', edgecolor='black', alpha=0.5, color='steelblue')
    ax.set_xlim(0.5,3.5)
    ax.set_ylim(0,8)
    ax.axhline(0, color='gray')
    s = np.sum(heights)*dx
    ax.text(0.5, 7.5, f'Sum = {s:.3f}, Error = {abs(s-exact_area):.3f}', fontsize=10)
    fig.canvas.draw_idle()

ax_n = plt.axes([0.2, 0.05, 0.5, 0.03])
slider_n = Slider(ax_n, 'n', 1, 50, valinit=n_init, valstep=1)
slider_n.on_changed(lambda v: update_sum(v, 'right'))

rax = plt.axes([0.01, 0.7, 0.1, 0.2])
radio = RadioButtons(rax, ('right','left','midpoint'))
def radio_func(label):
    update_sum(slider_n.val, label)
radio.on_clicked(radio_func)

plt.show()
```

**Teacher Narration** `[80w]`
> The symbol ∫ is an elongated S for 'sum'. The definite integral adds up infinitely many, infinitely thin rectangles under the curve. The width of each rectangle is Δx, and the height is the function value at some sample point. As the number of rectangles grows, the sum approaches the exact area. Here on the right you can see this approximation in action; use the slider to increase n and watch the sum converge to the exact value of 10.

---

### Slide 3 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Warm‑Up: Riemann Sum Computation**  ·  `full_width`

**On-screen text** `[12w]`
Using the definition: compute $\int_1^3 (2x+1)\,dx$ via Riemann sum with right endpoints.

**FULL WIDTH** `[steps]`

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | $\Delta x = \frac{3-1}{n} = \frac{2}{n}$ | Width of each subinterval |
| 2 | $x_i = 1 + i\Delta x = 1 + \frac{2i}{n}$ | Right endpoint of $i$th subinterval |
| 3 | $f(x_i) = 2(1+\frac{2i}{n}) + 1 = 3 + \frac{4i}{n}$ | Evaluate function at right endpoints |
| 4 | $\sum_{i=1}^n f(x_i)\Delta x = \sum_{i=1}^n \left(3 + \frac{4i}{n}\right)\frac{2}{n} = \frac{6}{n}\sum_{i=1}^n 1 + \frac{8}{n^2}\sum_{i=1}^n i$ | Split the sum |
| 5 | $= \frac{6}{n}\cdot n + \frac{8}{n^2}\cdot\frac{n(n+1)}{2} = 6 + 4\cdot\frac{n+1}{n}$ | Use $\sum 1 = n$ and $\sum i = n(n+1)/2$ |
| 6 | $\int_1^3 (2x+1)\,dx = \lim_{n\to\infty}\left(6 + 4\cdot\frac{n+1}{n}\right) = 6 + 4 = 10$ | Take limit as $n\to\infty$ |

**Result**: $\int_1^3 (2x+1)\,dx = 10$

**Teacher Narration** `[72w]`
> Let's work through a concrete Riemann sum. We want the exact area under f(x)=2x+1 from x=1 to 3. We choose right endpoints for convenience. Notice how the n cancels in the limit — that's the power of the definition. After taking the limit, we get 10, which matches what we'll soon find using the Fundamental Theorem. Pause the video if you want to try the algebra yourself before seeing the final limit.

**Student Prompt:** Before looking at the final limit, try computing the sum of the first 4 rectangles using right endpoints. Compare to 10.

---

### Slide 4 · [VISUAL_LAB] 🎛 *[1 controls]*
**Visualizing Riemann Sums**  ·  `split_left_right`

**On-screen text** `[13w]`
Watch the sum converge to 10 as n increases. Try n=10, 20, 50.

**LEFT** `[text]`

As the number of rectangles increases, the Riemann sum approaches the true area. With $n=4$ rectangles the sum is $9$; with $n=10$ it's $9.6$; with $n=50$ it's $9.92$. The exact value is $10$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Same as slide 2 interactive but with added display of exact area line and numerical error. Use the function f(x)=2x+1 from x=1 to 3. Show both the accumulated rectangle area and the true area (10) as a horizontal dashed line on a secondary y-axis. The slider controls n. A text box shows current sum, exact area, and error.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50

```python
import numpy as np, matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, (ax1, ax2) = plt.subplots(2,1, gridspec_kw={'height_ratios':[3,1]}, figsize=(7,6))
plt.subplots_adjust(bottom=0.2)
ax1.set_xlim(0.5,3.5)
ax1.set_ylim(0,8)
x_vals = np.linspace(1,3,400)
y_vals = 2*x_vals+1
ax1.plot(x_vals, y_vals, 'k-', lw=2)
exact_area = 10
ax1.axhline(0, color='gray')
n_init = 4
a, b = 1, 3
dx = (b-a)/n_init
x_rect = np.linspace(a+dx, b, n_init)
rects = ax1.bar(x_rect, 2*x_rect+1, width=dx, align='edge', edgecolor='black', alpha=0.5, color='steelblue')
sum_text = ax2.text(0.5, 0.5, '', fontsize=12, transform=ax2.transAxes)
ax2.set_ylim(0,1)
ax2.axis('off')
ax1.set_ylabel('y')
ax1.set_xlabel('x')

def update(n_val):
    n = int(n_val)
    dx = (b-a)/n
    xs = np.linspace(a+dx, b, n)
    heights = 2*xs+1
    ax1.cla()
    ax1.plot(x_vals, y_vals, 'k-', lw=2)
    ax1.bar(xs, heights, width=dx, align='edge', edgecolor='black', alpha=0.5, color='steelblue')
    ax1.set_xlim(0.5,3.5)
    ax1.set_ylim(0,8)
    ax1.axhline(0, color='gray')
    sum_approx = np.sum(heights)*dx
    ax1.set_title(f'n={n}, Sum={sum_approx:.3f}, Exact={exact_area:.3f}, Error={abs(sum_approx-exact_area):.3f}')
    ax1.set_ylabel('y')
    ax1.set_xlabel('x')
    fig.canvas.draw_idle()

ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider_n = Slider(ax_slider, 'n', 1, 50, valinit=n_init, valstep=1)
slider_n.on_changed(update)
update(n_init)
plt.show()
```

**Teacher Narration** `[68w]`
> Here you can see the approximation improving right before your eyes. With only 4 rectangles, the sum is 9, which is 1 unit off. At n=10, it's 9.6. At n=50, it's 9.92 — very close to the exact area of 10. The rectangles follow the curve more faithfully as n grows. This visual tool helps you internalise that the definite integral is truly a limit of finite sums.

**Student Prompt:** Set n to 4, then 10, then 50. How does the error change? Does it get smaller each time?

---

### Slide 5 · [CORE] 🎛 *[1 controls]*
**Fundamental Theorem of Calculus – Part 1**  ·  `split_left_right`

**On-screen text** `[15w]`
The derivative of the accumulation function recovers the original integrand. Integration and differentiation are inverses.

**LEFT** `[formula_block]`

$$
\frac{d}{dx}\int_a^x f(t)\,dt = f(x)
$$

> If $F(x) = \int_a^x f(t)\,dt$, then $F'(x) = f(x)$.

**Chain rule extension**: If upper limit is $g(x)$, then derivative is $f(g(x))\cdot g'(x)$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(t)=2t+1 from t=1 to 3. Show the accumulation function A(x)=∫_1^x f(t)dt as a shaded area. As a slider moves x from 1 to 3, the shaded area grows. Simultaneously, in a lower panel, plot A(x) vs x and show its tangent line with slope equal to f(x). Highlight that the slope of the tangent matches the height of the original function at that x.

*Interactive Controls:*
  - 🎛 Slider for x from 1 to 3

```python
import numpy as np, matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, (ax1, ax2) = plt.subplots(2,1, figsize=(7,6))
plt.subplots_adjust(bottom=0.25)
x_vals = np.linspace(1,3,400)
y_vals = 2*x_vals+1
ax1.plot(x_vals, y_vals, 'b-', lw=2)
ax1.set_xlim(1,3)
ax1.set_ylim(0,8)
ax1.set_ylabel('f(t)')
ax1.set_xlabel('t')
ax1.axhline(0, color='gray')
# Accumulation function
xs = np.linspace(1,3,200)
A = (xs**2 + xs) - (1**2+1)  # from antiderivative
ax2.plot(xs, A, 'r-', lw=2)
ax2.set_xlim(1,3)
ax2.set_ylim(0,12)
ax2.set_ylabel('A(x)')
ax2.set_xlabel('x')
ax2.axhline(0, color='gray')
# initial shaded region
x0 = 1
shade = ax1.fill_between(x_vals, 0, y_vals, where=(x_vals<=x0), color='lightblue', alpha=0.5)
point, = ax1.plot(x0, 2*x0+1, 'ro') 
tan_line, = ax2.plot([], [], 'g--', lw=2)
point2, = ax2.plot(x0, A[np.searchsorted(xs, x0)], 'ro')
# slider
ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider_x = Slider(ax_slider, 'x', 1, 3, valinit=1)
def update(val):
    x0 = val
    ax1.collections.clear()
    shade = ax1.fill_between(x_vals, 0, y_vals, where=(x_vals<=x0), color='lightblue', alpha=0.5)
    point.set_data([x0], [2*x0+1])
    # update second plot
    idx = np.searchsorted(xs, x0)
    A0 = A[idx]
    slope = 2*x0+1
    tangent_x = np.linspace(x0-0.2, x0+0.2, 10)
    tangent_y = A0 + slope*(tangent_x - x0)
    tan_line.set_data(tangent_x, tangent_y)
    point2.set_data([x0], [A0])
    ax2.set_title(f'x={x0:.2f}, A(x)={A0:.2f}, A\'(x)={slope:.2f}')
    fig.canvas.draw_idle()
slider_x.on_changed(update)
plt.show()
```

**Teacher Narration** `[71w]`
> The First Fundamental Theorem tells us that if we define a function A(x) as the integral from a constant to x, then the derivative of A is just the original function f. In the visual, as you move the slider, the accumulated area changes, and the slope of the tangent line to A(x) equals the height f(x). This is the inverse relationship: integrate then differentiate, and you're back where you started.

**Student Prompt:** Move the slider to x=2. What is the slope of the tangent line on the lower graph? How does it relate to f(2)?

---

### Slide 6 · [CORE]
**Fundamental Theorem of Calculus – Part 2**  ·  `split_left_right`

**On-screen text** `[12w]`
Evaluate a definite integral by computing F(b) - F(a). No +C needed.

**LEFT** `[formula_block]`

$$
\int_a^b f(x)\,dx = F(b) - F(a)
$$

where $F$ is any antiderivative of $f$ (i.e., $F' = f$). 

**Note:** The constant of integration $+C$ cancels out, so you can ignore it when evaluating definite integrals.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two panels side by side. Left: the original function f(x) = 2x+1 from x=1 to 3, with shaded area. Right: its antiderivative F(x)=x^2+x, with points at x=1 and x=3. Annotate the difference F(3)-F(1) with a bracket. Show that this difference equals the shaded area. Use arrows to connect the two panels.

```python
import numpy as np, matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1,2, figsize=(10,4))
x = np.linspace(1,3,400)
f = 2*x+1
F = x**2 + x
ax1.plot(x, f, 'b-', lw=2)
ax1.fill_between(x, 0, f, alpha=0.3, color='blue', label='Area = ?')
ax1.set_xlim(1,3)
ax1.set_ylim(0,8)
ax1.set_xlabel('x')
ax1.set_ylabel('f(x)')
ax1.set_title('f(x)=2x+1')
ax1.legend()
ax2.plot(x, F, 'r-', lw=2)
ax2.plot([1,1], [0, F[0]], 'k--')
ax2.plot([3,3], [0, F[-1]], 'k--')
ax2.scatter([1,3], [F[0], F[-1]], color='red', zorder=5)
ax2.annotate(f'F(1)={F[0]:.0f}', xy=(1, F[0]), xytext=(1.1, F[0]-2), arrowprops=dict(arrowstyle='->'))
ax2.annotate(f'F(3)={F[-1]:.0f}', xy=(3, F[-1]), xytext=(2.5, F[-1]+2), arrowprops=dict(arrowstyle='->'))
ax2.annotate('F(3)-F(1)=10', xy=(2, (F[0]+F[-1])/2), ha='center', fontsize=12, fontweight='bold')
ax2.set_xlim(1,3)
ax2.set_ylim(0,14)
ax2.set_xlabel('x')
ax2.set_ylabel('F(x)')
ax2.set_title('Antiderivative F(x)=x²+x')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[71w]`
> The Second Fundamental Theorem gives us the practical method: to evaluate a definite integral, find any antiderivative F, compute its value at the upper limit, subtract its value at the lower limit. The constant of integration cancels out, so we can safely omit it. In the diagram, the area under f from 1 to 3 is exactly F(3) minus F(1), which equals 10. This is a huge shortcut over Riemann sums.

**Student Prompt:** Why does the constant of integration cancel? Try evaluating an antiderivative with a +C and see what happens.

---

### Slide 7 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Standard Example using FTC2**  ·  `full_width`

**On-screen text** `[10w]`
$\int_0^2 (x^3-2x)\,dx = 0$. Positive and negative areas cancel exactly.

**FULL WIDTH** `[steps]`

**Example**: Evaluate $\int_0^2 (x^3 - 2x)\,dx$ using FTC2.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | $F(x) = \frac{x^4}{4} - x^2$ | Antiderivative: $\frac{x^4}{4}$ from $x^3$, $-x^2$ from $-2x$ |
| 2 | $F(2) = \frac{16}{4} - 4 = 0$ | Upper limit value |
| 3 | $F(0) = 0 - 0 = 0$ | Lower limit value |
| 4 | $\int_0^2 (x^3-2x)\,dx = F(2)-F(0) = 0-0 = 0$ | Net area is zero; positive and negative parts cancel |

**Key insight**: The integrand is odd about $x=1$ on $[0,2]$, so the area above and below the x‑axis cancel.

**Teacher Narration** `[72w]`
> Here's a nice application of FTC2. The integral of x³ minus 2x from 0 to 2 gives zero. Why? Because the area above the x-axis between 0 and about 1.4 equals the area below it from 1.4 to 2. Graphically, the function is symmetric about the point x=1, so the net signed area is zero. This cancellation is a key phenomenon — the definite integral always gives net area, not total area.

**Student Prompt:** Sketch the graph of f(x)=x³-2x on [0,2]. Verify that the area above equals the area below.

---

### Slide 8 · [MISCONCEPTION]
**Common Mistake: Forgetting to Change Limits in Substitution**  ·  `split_left_right`

**On-screen text** `[16w]`
Always change the limits when substituting in a definite integral — never keep the old limits!

**LEFT** `[text]`

**Wrong approach**: When using $u = \sin x$ in $\int_0^{\pi/2} \sin x \cos x \,dx$, a student writes:

$$\int_0^{\pi/2} u\,du = \left[\frac{u^2}{2}\right]_0^{\pi/2} = \frac{1}{2}\left(\frac{\pi}{2}\right)^2$$

**This is wrong!** Why? The limits are still in $x$, but the integral is now in $u$. You must transform the limits: $x = 0 \rightarrow u = \sin 0 = 0$, $x = \pi/2 \rightarrow u = 1$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show two number lines side by side: one for x from 0 to π/2, one for u from 0 to 1. Arrows connect x=0 to u=0 and x=π/2 to u=1. Overlay a red cross over the wrong limits (π/2) on the u-axis, and a green check over the correct limits (0 and 1). Add a animated rectangle that fills the area under u from 0 to 1.

```python
import numpy as np, matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

fig, (ax1, ax2) = plt.subplots(1,2, figsize=(8,4))
ax1.set_xlim(-0.5, 2.5)
ax1.set_ylim(-0.2, 1.2)
ax1.axhline(0, color='gray')
ax1.scatter([0, np.pi/2], [0,0], color='black', zorder=5)
ax1.text(0, -0.05, '0', ha='center')
ax1.text(np.pi/2, -0.05, 'π/2', ha='center')
ax1.set_title('x-axis')
ax1.axis('off')
ax2.set_xlim(-0.5, 2.5)
ax2.set_ylim(-0.2, 1.2)
ax2.axhline(0, color='gray')
ax2.scatter([0,1], [0,0], color='green', s=100, zorder=5)
ax2.scatter([np.pi/2], [0], color='red', s=100, zorder=5)
ax2.text(0, -0.05, '0 (correct)', ha='center', color='green')
ax2.text(1, -0.05, '1 (correct)', ha='center', color='green')
ax2.text(np.pi/2, -0.05, 'π/2 (wrong!)', ha='center', color='red')
ax2.set_title('u-axis')
ax2.annotate('', xy=(np.pi/2, 0), xytext=(1,0), arrowprops=dict(arrowstyle='->', color='red', lw=2))
ax1.annotate('', xy=(np.pi/2,0.05), xytext=(np.pi/2,0.3), fontsize=12, fontweight='bold', ha='center')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[81w]`
> One of the most common errors in definite integrals occurs during substitution. A student correctly lets u equal sine of x and writes du equals cosine x dx. But then they forget to change the limits. They still use the x-limits 0 and π/2 for the u integral. That gives a completely wrong answer. The correct limits after substitution are u from sin 0 equals 0 to sin π/2 equals 1. Always write down the new limits immediately after the substitution.

**Student Prompt:** What would you get if you incorrectly used the old limits? Why is it obviously wrong?

---

### Slide 9 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Tricky Example: Substitution with Limit Change**  ·  `split_left_right`

**On-screen text** `[10w]`
$\int_0^{\pi/2} \sin x \cos x\,dx = \frac12$  (after transforming limits).

**LEFT** `[steps]`

**Evaluate** $\int_0^{\pi/2} \sin x \cos x \,dx$

1. Let $u = \sin x \Rightarrow du = \cos x\,dx$
2. New limits: $x=0 \rightarrow u=0$, $x=\pi/2 \rightarrow u=1$
3. Integral becomes $\int_0^1 u\,du = \left[\frac{u^2}{2}\right]_0^1 = \frac12$

**Answer**: $\frac{1}{2}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=sin(x)cos(x) over [0,π/2]. Shade the area under the curve. Display the transformation: left panel shows f(x) with x-axis, right panel shows g(u)=u with u-axis from 0 to 1. Draw a curved arrow from the left graph to the right, labelled 'u=sin x'. Highlight that the area under u from 0 to 1 equals 0.5.

```python
import numpy as np, matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1,2, figsize=(10,4))
x = np.linspace(0, np.pi/2, 400)
f = np.sin(x)*np.cos(x)
ax1.plot(x, f, 'b-', lw=2)
ax1.fill_between(x, 0, f, alpha=0.3, color='blue')
ax1.set_xlim(0, np.pi/2)
ax1.set_ylim(0, 0.6)
ax1.set_xlabel('x')
ax1.set_ylabel('sin x cos x')
ax1.set_title('Original integral')
u_vals = np.linspace(0,1,400)
g = u_vals
ax2.plot(u_vals, g, 'r-', lw=2)
ax2.fill_between(u_vals, 0, g, alpha=0.3, color='red')
ax2.set_xlim(0,1)
ax2.set_ylim(0,1)
ax2.set_xlabel('u')
ax2.set_ylabel('u')
ax2.set_title('Integral after u-sub')
ax2.text(0.5, 2.5, 'Area = 0.5', transform=ax2.transData, fontsize=12, ha='center')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[73w]`
> Now let's apply the correct substitution. We set u equal to sine x. Then du equals cosine x dx, and the limits change accordingly: 0 becomes sine of 0 equals 0, and π/2 becomes sine of π/2 equals 1. The integral simplifies to the integral of u du from 0 to 1, which is 1/2. Notice how the substitution turned a product into a simple power — that's the power of the method.

**Student Prompt:** Suppose you used u = cos x instead. Would you get the same answer? Try it and check.

---

### Slide 10 · [CORE] 🎛 *[1 controls]*
**Symmetry: Even and Odd Functions**  ·  `split_left_right`

**On-screen text** `[12w]`
Even → double the right half; Odd → zero over symmetric interval.

**LEFT** `[formula_block]`

**Even function**: $f(-x)=f(x)$
$$
\int_{-a}^a f(x)\,dx = 2\int_0^a f(x)\,dx
$$

**Odd function**: $f(-x)=-f(x)$
$$
\int_{-a}^a f(x)\,dx = 0
$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two functions on the same axes: f(x)=x^4 (even) and g(x)=x^3 (odd) over [-2,2]. Include radio buttons to select which function to view. Show the area under the even function as two equal halves in different colors, and for the odd function show the left and right areas with opposite signs to illustrate cancellation. Display the net integral value below.

*Interactive Controls:*
  - 🎛 Radio buttons to switch between even and odd function display

```python
import numpy as np, matplotlib.pyplot as plt
from matplotlib.widgets import RadioButtons

fig, ax = plt.subplots(figsize=(7,4))
plt.subplots_adjust(bottom=0.2)
ax.set_xlim(-2.5, 2.5)
ax.set_ylim(-5, 20)
ax.axhline(0, color='gray')
ax.axvline(0, color='gray')
x = np.linspace(-2,2,400)
# even function
y_even = x**4
# odd function
y_odd = x**3
line_even, = ax.plot(x, y_even, 'b-', lw=2, label='x^4 (even)')
fill_even = ax.fill_between(x, 0, y_even, alpha=0.3, color='blue', label='Area = 2∫₀² x⁴ dx')
fill_odd_left = ax.fill_between(x, 0, y_odd, where=(x<0), alpha=0.3, color='red')
fill_odd_right = ax.fill_between(x, 0, y_odd, where=(x>=0), alpha=0.3, color='red')
line_odd, = ax.plot(x, y_odd, 'g-', lw=2, label='x^3 (odd)', visible=False)
fill_odd_left.set_visible(False)
fill_odd_right.set_visible(False)
line_even.set_visible(True)
fill_even.set_visible(True)
area_text = ax.text(0, 18, 'Even: ∫ x⁴ dx = 2∫₀² x⁴ dx = 12.8', ha='center', fontsize=10)

rax = plt.axes([0.01, 0.7, 0.15, 0.2])
radio = RadioButtons(rax, ('Even', 'Odd'))
def switch(label):
    if label == 'Even':
        line_even.set_visible(True)
        fill_even.set_visible(True)
        line_odd.set_visible(False)
        fill_odd_left.set_visible(False)
        fill_odd_right.set_visible(False)
        area_text.set_text('Even: ∫ x⁴ dx = 2∫₀² x⁴ dx = 12.8')
    else:
        line_even.set_visible(False)
        fill_even.set_visible(False)
        line_odd.set_visible(True)
        fill_odd_left.set_visible(True)
        fill_odd_right.set_visible(True)
        area_text.set_text('Odd: ∫ x³ dx = 0 (areas cancel)')
    fig.canvas.draw_idle()
radio.on_clicked(switch)
ax.legend(loc='upper left')
plt.show()
```

**Teacher Narration** `[83w]`
> Symmetry can save you a lot of work. If a function is even, meaning f of negative x equals f of x, then the integral from negative a to a is just twice the integral from 0 to a. If a function is odd, meaning f of negative x equals negative f of x, then the integral over a symmetric interval is zero. The graph on the right lets you toggle between the two cases. Notice that the odd function's areas cancel perfectly.

**Student Prompt:** Is sin(x) even or odd? What about cos(x)? Use the symmetry rules to predict ∫_{-π}^{π} sin(x) dx.

---

### Slide 11 · [PRACTICE]
**Example: Even Function Integral**  ·  `split_left_right`

**On-screen text** `[12w]`
$\int_{-2}^2 x^4\,dx = \frac{64}{5}$ (use even symmetry to compute only one half).

**LEFT** `[steps]`

**Evaluate** $\int_{-2}^2 x^4\,dx$ using symmetry.

1. $f(x)=x^4$ is even: $f(-x)=f(x)$.
2. $\int_{-2}^2 x^4\,dx = 2\int_0^2 x^4\,dx$
3. Antiderivative: $F(x)=\frac{x^5}{5}$
4. $2\left[\frac{x^5}{5}\right]_0^2 = 2\cdot\frac{32}{5} = \frac{64}{5}$

**Check**: Direct FTC2 gives same result: $\frac{32}{5} - (-\frac{32}{5}) = \frac{64}{5}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^4 over [-2,2]. Fill the area from 0 to 2 in one color (e.g., blue) and from -2 to 0 in a second color (e.g., light blue) to show they are equal. Annotate each half area as 32/5. Display total = 64/5. Include a dashed vertical line at x=0.

```python
import numpy as np, matplotlib.pyplot as plt

x = np.linspace(-2,2,400)
y = x**4
fig, ax = plt.subplots(figsize=(7,4))
ax.plot(x, y, 'b-', lw=2)
ax.fill_between(x, 0, y, where=(x>=0), alpha=0.3, color='blue', label='Right half')
ax.fill_between(x, 0, y, where=(x<0), alpha=0.3, color='cyan', label='Left half')
ax.axvline(0, color='gray', linestyle='--')
ax.set_xlim(-2.5,2.5)
ax.set_ylim(0,20)
ax.set_xlabel('x')
ax.set_ylabel('x⁴')
ax.text(1, 10, '32/5', fontsize=12, ha='center')
ax.text(-1, 10, '32/5', fontsize=12, ha='center')
ax.text(0, 18, 'Total = 64/5', fontsize=12, ha='center', fontweight='bold')
ax.legend()
plt.show()
```

**Teacher Narration** `[63w]`
> Here we see the symmetry shortcut in action. The function x to the fourth is even, so the integral from -2 to 2 is twice the integral from 0 to 2. Computing half the interval gives 32/5, so the full integral is 64/5. This is much easier than evaluating from -2 to 2 directly. Always check for symmetry before diving into the computation.

**Student Prompt:** Use the odd rule to evaluate ∫_{-3}^{3} x^5 dx without any integration.

---

### Slide 12 · [PRACTICE] 🟡
**Application: Accumulated Water Volume**  ·  `split_left_right`

**On-screen text** `[11w]`
Total volume = ∫₀⁴ (10+2 sin t) dt ≈ 43.3 gallons.

**LEFT** `[steps]`

**Problem**: Water flows into a tank at rate $r(t)=10+2\sin t$ gal/hour for $0\le t\le 4$. Find total volume in first 4 hours.

1. Volume = $\int_0^4 r(t)\,dt = \int_0^4 (10+2\sin t)\,dt$
2. Antiderivative: $10t - 2\cos t$
3. Evaluate: $[10t - 2\cos t]_0^4 = (40 - 2\cos 4) - (0 - 2\cos 0)$
4. $= 40 - 2\cos 4 + 2 = 42 - 2\cos 4$
5. Approx: $\cos 4 \approx -0.653$, so volume $\approx 43.306$ gallons.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot r(t)=10+2 sin(t) over [0,4]. Shade the area under the curve from 0 to 4. Display the approximate area value 43.3. Add a horizontal line at y=10 for reference. Annotate that the area equals volume. Include a label 'Volume ≈ 43.3 gal'.

```python
import numpy as np, matplotlib.pyplot as plt

t = np.linspace(0,4,500)
r = 10 + 2*np.sin(t)
fig, ax = plt.subplots(figsize=(7,4))
ax.plot(t, r, 'b-', lw=2)
ax.fill_between(t, 0, r, alpha=0.3, color='blue')
ax.axhline(10, color='gray', linestyle='--', alpha=0.5)
ax.set_xlim(0,4)
ax.set_ylim(0,14)
ax.set_xlabel('Time (h)')
ax.set_ylabel('Rate (gal/h)')
ax.text(2, 2, 'Volume ≈ 43.3 gal', fontsize=12, ha='center', 
        bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))
ax.set_title('Flow rate into tank')
plt.show()
```

**Teacher Narration** `[93w]`
> Let's see a real use of the definite integral: accumulation. The rate of water flow into a tank is given by r of t equals 10 plus 2 sine t gallons per hour. To find the total volume added in the first 4 hours, we integrate the rate from 0 to 4. The antiderivative is 10t minus 2 cosine t. Evaluating gives 42 minus 2 times cosine of 4. Cosine of 4 radians is approximately -0.653, so the total is about 43.3 gallons. The area under the rate curve represents the accumulated volume.

**Student Prompt:** If the tank initially had 50 gallons, how much is in the tank after 4 hours? (Hint: initial + accumulated change.)

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Proof: FTC1 from the Definition**  ·  `split_left_right`

**On-screen text** `[14w]`
The difference quotient of F becomes f(x) as h → 0. This proves FTC1.

**LEFT** `[text]`

**Proof sketch**: Let $F(x)=\int_a^x f(t)\,dt$. Then

$$
F'(x) = \lim_{h\to0}\frac{F(x+h)-F(x)}{h} = \lim_{h\to0}\frac{1}{h}\int_x^{x+h} f(t)\,dt.
$$

By the Mean Value Theorem for integrals, there exists $c\in[x,x+h]$ such that $\int_x^{x+h} f(t)\,dt = f(c)\cdot h$. Hence $F'(x) = \lim_{h\to0} f(c) = f(x)$ (since $c\to x$).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(t)=2t+1. Show the accumulation function F(x) (integral from a to x). Place two vertical lines at x and x+h to show a thin strip. As a slider decreases h from 1 to 0.01, the strip becomes thinner, and the secant line between (x, F(x)) and (x+h, F(x+h)) approaches the tangent line at x. Display the slope values.

*Interactive Controls:*
  - 🎛 Slider for h from 0.01 to 1

```python
import numpy as np, matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, (ax1, ax2) = plt.subplots(2,1, figsize=(7,7))
plt.subplots_adjust(bottom=0.25)
x_vals = np.linspace(1,3,400)
y_vals = 2*x_vals+1
ax1.plot(x_vals, y_vals, 'b-', lw=2)
ax1.set_xlim(1,3)
ax1.set_ylim(0,8)
ax1.set_ylabel('f(t)')
ax1.axhline(0, color='gray')
# accumulation function
xs = np.linspace(1,3,400)
F = (xs**2 + xs) - 2  # antiderivative F(x)=x^2+x-2
ax2.plot(xs, F, 'r-', lw=2)
ax2.set_xlim(1,3)
ax2.set_ylim(0,12)
ax2.set_ylabel('F(x)')
ax2.axhline(0, color='gray')

# initial values
x0 = 1.5
h_init = 0.5
strip = ax1.fill_between([x0, x0+h_init], 0, [2*point+1 for point in [x0, x0+h_init]], alpha=0.3, color='yellow')
point1, = ax1.plot(x0, 2*x0+1, 'ro')
point2, = ax1.plot(x0+h_init, 2*(x0+h_init)+1, 'ro')
F0 = F[np.searchsorted(xs, x0)]
Fh = F[np.searchsorted(xs, x0+h_init)]
secant, = ax2.plot([x0, x0+h_init], [F0, Fh], 'g--', lw=2)
pointF1, = ax2.plot(x0, F0, 'ro')
pointF2, = ax2.plot(x0+h_init, Fh, 'ro')
slope_text = ax2.text(0.5, 0.9, 'Slope = ' + str( (Fh-F0)/h_init ), transform=ax2.transAxes, fontsize=10)

slider_ax = plt.axes([0.2, 0.05, 0.6, 0.03])
slider_h = Slider(slider_ax, 'h', 0.01, 1, valinit=h_init)

def update(val):
    h = val
    ax1.collections.clear()
    strip = ax1.fill_between([x0, x0+h], 0, [2*point+1 for point in [x0, x0+h]], alpha=0.3, color='yellow')
    point1.set_data([x0], [2*x0+1])
    point2.set_data([x0+h], [2*(x0+h)+1])
    # accumulation
    idx0 = np.searchsorted(xs, x0)
    idxh = np.searchsorted(xs, x0+h)
    F0 = F[idx0]
    Fh = F[idxh]
    secant.set_data([x0, x0+h], [F0, Fh])
    pointF1.set_data([x0], [F0])
    pointF2.set_data([x0+h], [Fh])
    slope = (Fh - F0)/h
    slope_text.set_text(f'Slope = {slope:.3f}')
    fig.canvas.draw_idle()

slider_h.on_changed(update)
plt.show()
```

**Teacher Narration** `[85w]`
> For the curious: here's why FTC1 is true. The derivative of F at x is the limit of [F(x+h)-F(x)] over h. That difference is the integral of f from x to x+h divided by h. By the Mean Value Theorem for integrals, that average value equals f of some point c in the interval. As h goes to zero, c is forced to x, so the limit is f(x). Use the slider to see how the secant slope approaches the exact derivative as h shrinks.

**Student Prompt:** What happens to the secant line when h becomes very small? How does the slope change?

---

### Slide 14 · [SUMMARY]
**Summary**  ·  `full_width`

**On-screen text** `[15w]`
Definite integral = limit of sums → FTC shortcuts → substitution → symmetry → applications.

**FULL WIDTH** `[text]`

**Key takeaways from this lecture:**

**1. Definite integral as net area:** $\int_a^b f(x)\,dx$ = limit of Riemann sums.

**2. FTC Part 1:** $\frac{d}{dx}\int_a^x f(t)\,dt = f(x)$ (differentiation undoes integration).

**3. FTC Part 2:** $\int_a^b f(x)\,dx = F(b)-F(a)$ (evaluation shortcut).

**4. Substitution rule:** Change limits when changing variable.

**5. Symmetry:** Even → double; Odd → zero.

**6. Application:** Integral of rate = accumulated change.

**Revisit objectives:** Can you now calculate definite integrals using Riemann sums and FTC? Interpret them as net area? Apply substitution correctly?

**Teacher Narration** `[70w]`
> Let's recap what we've covered. We started with the definition of the definite integral as the limit of Riemann sums. Then we introduced the Fundamental Theorem, which gives us practical ways to evaluate integrals using antiderivatives. We learned the substitution rule, remembering always to change the limits. Symmetry can simplify calculations, and we saw an application in accumulation. Review your notes and try the extra problems on the course page.

---
