# The Fundamental Theorem of Calculus – Connecting Integration and Differentiation

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You should be comfortable with Riemann sums and the definition of the definite integral as a limit.

**Learning Objectives:**
- Calculate definite integrals using antiderivatives via FTC Part 2
- Interpret the inverse relationship between differentiation and integration
- Apply FTC Part 1 to differentiate integrals with variable upper limits
- Analyze functions defined by integrals and determine their properties
- Evaluate definite integrals efficiently using endpoint evaluation

---

## v3.1 Production Readiness

✅ **Interactive moments:** 7 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 80w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 7 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ |  | 74w | 10w | From Riemann Sums to a Shortcut |
| 2 | 🎛core | 🟢 | ◧ |  | 72w | 11w | A Simple Analogy: Speedometer and Odometer |
| 3 | 🎛core | 🟢 | ◧ |  | 85w | 16w | FTC Part 1 – Derivative of an Integral |
| 4 | 🎛core | 🟢 | ◧ |  | 72w | 16w | FTC Part 2 – Evaluating Definite Integrals |
| 5 | practice | 🟢 | ⬛⬛ | ⏸️ | 78w | 9w | Warm-up Example: Direct FTC Part 2 |
| 6 | practice | 🟢 | ⬛⬛ |  | 82w | 5w | Standard Example: FTC Part 1 |
| 7 | 🎛misconception | 🟢 | ◧ |  | 79w | 17w | Misconception: Forgetting the Chain Rule in FTC Part 1 |
| 8 | practice | 🟡 | ⬛⬛ |  | 86w | 8w | Tricky Example: FTC Part 1 with Chain Rule |
| 9 | practice | 🟡 | ⬛⬛ |  | 82w | 21w | Edge Case: When the Lower Limit is Variable |
| 10 | practice | 🟡 | ⬛⬛ |  | 85w | 8w | Application: Finding a Function from Its Derivative |
| 11 | practice | 🟡 | ⬛⬛ |  | 70w | 9w | Application: Area Between Curves |
| 12 | 🎛visual_lab | 🟢 | ◧ |  | 79w | 12w | Interactive Visual Lab: Explore FTC Part 2 |
| 13 | pause_and_try | 🟢 | ◧ | ⏸️ | 77w | 11w | Pause and Try: Test Your Understanding |
| 14 | practice | 🟢 | ⬛⬛ |  | 85w | 4w | Solution to Pause Problem |
| 15 | 🎛challenge | 🔴 | ◧ |  | 94w | 18w | [Challenge – Optional] Proof Sketch for FTC Part 1 |
| 16 | summary | 🟢 | ⬛⬛ |  | 82w | 11w | Summary and Key Takeaways |

---

### Slide 1 · [HOOK] 🎛 *[2 controls]*
**From Riemann Sums to a Shortcut**  ·  `split_left_right`

**On-screen text** `[10w]`
Riemann sums are tedious. FTC gives a shortcut using antiderivatives.

**LEFT** `[text]`

**The problem:**

$$\int_a^b f(x)\,dx = \lim_{n\to\infty}\sum_{i=1}^n f(x_i^*)\Delta x$$

Computing this limit directly is tedious. The FTC gives us a fast way.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the function f(x)=x^2 from x=0 to 2. Show a Riemann sum with n rectangles (random sample points). As n increases, the sum approaches the true area. Use a slider to adjust n from 1 to 50. Animate the transition from coarse to fine rectangles. Label the Riemann sum value and the exact area (computed by FTC) as a reference line. Color the rectangles blue with low opacity. Interactive controls: Slider for n, Button to toggle exact area line.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50
  - 🎛 Button to reset slider

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

fig, ax = plt.subplots(figsize=(8,5))
plt.subplots_adjust(bottom=0.25)

x = np.linspace(0, 2, 400)
f = lambda x: x**2
exact_area = 8/3  # ∫0^2 x^2 dx = 8/3
ax.plot(x, f(x), 'k-', linewidth=2, label='$f(x)=x^2$')
ax.axhline(0, color='gray', linewidth=0.5)
ax.set_xlim(-0.1, 2.1)
ax.set_ylim(-0.1, 4.5)
ax.set_title('Riemann Sum Approximation')
ax.legend()

def update_plot(val):
    n = int(slider.val)
    ax.clear()
    ax.plot(x, f(x), 'k-', linewidth=2)
    ax.axhline(0, color='gray', linewidth=0.5)
    dx = 2.0 / n
    xi = np.linspace(0, 2-dx, n) + dx/2  # midpoint rule
    riemann_sum = np.sum(f(xi) * dx)
    for i in range(n):
        ax.bar(xi[i], f(xi[i]), width=dx*0.9, bottom=0, alpha=0.4, color='blue', edgecolor='blue')
    ax.set_xlim(-0.1, 2.1)
    ax.set_ylim(-0.1, 4.5)
    ax.set_title(f'Midpoint Riemann sum with n={n}: {riemann_sum:.4f} (exact: {exact_area:.4f})')
    ax.text(0.1, 4.0, f'Error = {abs(riemann_sum-exact_area):.4f}', fontsize=10, color='red')
    ax.plot(x, f(x), 'k-', linewidth=2)
    ax.legend()
    fig.canvas.draw_idle()

ax_slider = plt.axes([0.2, 0.1, 0.65, 0.03])
slider = Slider(ax_slider, 'n', 1, 50, valinit=5, valstep=1)
slider.on_changed(update_plot)

ax_button = plt.axes([0.8, 0.05, 0.1, 0.04])
button = Button(ax_button, 'Reset')
def reset(event):
    slider.reset()
button.on_clicked(reset)

update_plot(5)
plt.show()
```

**Teacher Narration** `[74w]`
> Calculating a definite integral by Riemann sums is like counting every step of a journey. It works, but it's painful. The Fundamental Theorem of Calculus gives us a revolutionary shortcut: instead of summing infinitely many tiny rectangles, we can evaluate the antiderivative at just two points. In this lecture, you'll learn this shortcut and why it works. Think of it as a fast-forward button for integration, turning a long process into a simple subtraction.

---

### Slide 2 · [CORE] 🎛 *[2 controls]*
**A Simple Analogy: Speedometer and Odometer**  ·  `split_left_right`

**On-screen text** `[11w]`
Integration accumulates tiny changes; differentiation gives instantaneous rate. They are inverses.

**LEFT** `[concept]`

| Speedometer $v(t)$ | Odometer $s(t)$ |
|-------------------|-----------------|
| instantaneous rate of change | net change in position (displacement) |
| derivative of $s$ | antiderivative of $v$ (with $s(0)=0$) |

**The FTC says:**
$$\int_a^b v(t)\,dt = s(b) - s(a)$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Two-panel plot. Left panel: velocity v(t)=2t (linear). Right panel: position s(t)=t^2. Highlight the area under v(t) from a to b, and the difference s(b)-s(a). Use interactive sliders for a and b. Show that the area equals s(b)-s(a). Colors: v(t) in red, s(t) in blue, area shaded light red. Interactive controls: Slider for a (0 to 5), Slider for b (a+0.1 to 5). Display numeric values for area and s(b)-s(a).

*Interactive Controls:*
  - 🎛 Slider for a from 0 to 5
  - 🎛 Slider for b from a+0.1 to 5

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12,5))
plt.subplots_adjust(bottom=0.25)

t = np.linspace(0, 5, 500)
v = lambda t: 2*t
s = lambda t: t**2

ax1.plot(t, v(t), 'r-', linewidth=2, label='$v(t)=2t$')
ax1.set_xlim(0,5)
ax1.set_ylim(0,12)
ax1.set_xlabel('Time $t$')
ax1.set_ylabel('Velocity $v(t)$')
ax1.set_title('Speedometer: $v(t)$')
ax1.grid(True, alpha=0.3)

ax2.plot(t, s(t), 'b-', linewidth=2, label='$s(t)=t^2$')
ax2.set_xlim(0,5)
ax2.set_ylim(0,30)
ax2.set_xlabel('Time $t$')
ax2.set_ylabel('Position $s(t)$')
ax2.set_title('Odometer: $s(t)$')
ax2.grid(True, alpha=0.3)

def update(val):
    a = slider_a.val
    b = slider_b.val
    if a >= b:
        slider_b.set_val(a+0.1)
        b = a+0.1
    # clear and redraw
    ax1.clear()
    ax2.clear()
    
    ax1.plot(t, v(t), 'r-', linewidth=2)
    ax1.fill_between(t, v(t), where=(t>=a)&(t<=b), alpha=0.3, color='red')
    ax1.set_xlim(0,5)
    ax1.set_ylim(0,12)
    ax1.set_xlabel('Time $t$')
    ax1.set_ylabel('Velocity $v(t)$')
    ax1.set_title(f'Area = ∫_{{{a:.2f}}}^{{{b:.2f}}} v(t) dt = {b**2 - a**2:.2f}')
    ax1.grid(True, alpha=0.3)
    
    ax2.plot(t, s(t), 'b-', linewidth=2)
    ax2.plot([a,a], [0,s(a)], 'k--')
    ax2.plot([b,b], [0,s(b)], 'k--')
    ax2.plot([a,b], [s(a),s(a)], 'g--', linewidth=1)
    ax2.plot([a,b], [s(b),s(b)], 'g--', linewidth=1)
    ax2.fill_between(t, s(t), alpha=0.1, color='blue')
    ax2.set_xlim(0,5)
    ax2.set_ylim(0,30)
    ax2.set_xlabel('Time $t$')
    ax2.set_ylabel('Position $s(t)$')
    ax2.set_title(f's(b)-s(a) = {s(b):.2f} - {s(a):.2f} = {s(b)-s(a):.2f}')
    ax2.grid(True, alpha=0.3)
    ax2.axvline(a, color='red', linestyle='--', label=f'a={a:.2f}')
    ax2.axvline(b, color='green', linestyle='--', label=f'b={b:.2f}')
    ax2.legend()
    fig.canvas.draw_idle()

ax_slider_a = plt.axes([0.2, 0.1, 0.3, 0.03])
ax_slider_b = plt.axes([0.6, 0.1, 0.3, 0.03])
slider_a = Slider(ax_slider_a, 'a', 0, 5, valinit=1)
slider_b = Slider(ax_slider_b, 'b', 0.1, 5, valinit=3)
slider_a.on_changed(update)
slider_b.on_changed(update)

update(None)
plt.show()
```

**Teacher Narration** `[72w]`
> Think of a car's speedometer and odometer. The speedometer shows instantaneous velocity, the derivative of position. The odometer shows net change in position, the antiderivative. If you want to know how far you traveled between time a and time b, you could either integrate velocity (area under speedometer) or simply subtract odometer readings. The FTC says these give the same result. This is the core idea: integration and differentiation undo each other.

---

### Slide 3 · [CORE] 🎛 *[1 controls]*
**FTC Part 1 – Derivative of an Integral**  ·  `split_left_right`

**On-screen text** `[16w]`
FTC Part 1: $\frac{d}{dx} \int_a^x f(t) dt = f(x)$ — differentiating an integral returns the integrand.

**LEFT** `[formula_block]`

**FTC Part 1 (theorem):**

If $f$ is continuous on $[a,b]$, then for $x \in (a,b)$,

$$\frac{d}{dx} \int_a^x f(t)\,dt = f(x).$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(t)=cos(t) from t=0 to 2π. Also plot the area function g(x) = ∫_0^x cos(t) dt = sin(x). Show that the slope of g at any point equals f at that point. Use a moving point on g to show tangent line, whose slope is f(x). Interactive controls: Draggable point on g (or slider for x). Display numeric values: g(x), slope (g'(x)), f(x). Show that they are equal.

*Interactive Controls:*
  - 🎛 Slider for x from 0 to 2*pi

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12,5))
plt.subplots_adjust(bottom=0.2)

t = np.linspace(0, 2*np.pi, 500)
f = lambda t: np.cos(t)
g = lambda x: np.sin(x)  # ∫_0^x cos(t) dt

def update(val):
    x = slider.val
    ax1.clear()
    ax2.clear()
    
    # Left: f(t) with area shaded up to x
    ax1.plot(t, f(t), 'b-', linewidth=2, label='$f(t)=\cos(t)$')
    ax1.fill_between(t, f(t), where=(t>=0)&(t<=x), alpha=0.3, color='blue')
    ax1.axvline(x, color='red', linestyle='--', label=f'x={x:.2f}')
    ax1.set_ylim(-1.5,1.5)
    ax1.set_xlim(-0.1,2*np.pi+0.1)
    ax1.set_title('Integrand $f(t)$')
    ax1.set_xlabel('$t$')
    ax1.set_ylabel('$f(t)$')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # Right: g(x) with tangent line
    ax2.plot(t, g(t), 'r-', linewidth=2, label='$g(x)=\int_0^x \cos(t) dt = \sin(x)$')
    ax2.scatter(x, g(x), color='green', s=100, zorder=5)
    # tangent line slope = f(x) = cos(x)
    slope = f(x)
    x_tan = np.linspace(x-0.5, x+0.5, 10)
    y_tan = g(x) + slope*(x_tan - x)
    ax2.plot(x_tan, y_tan, 'g--', linewidth=2, label='tangent at $x$')
    ax2.set_ylim(-1.5,1.5)
    ax2.set_xlim(-0.1,2*np.pi+0.1)
    ax2.set_title('Area function $g(x)$')
    ax2.set_xlabel('$x$')
    ax2.set_ylabel('$g(x)$')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    
    # Display information
    ax1.text(0.2, -1.2, f'g(x) = {g(x):.3f}', fontsize=10, color='red')
    ax1.text(0.2, -1.4, f"g'(x) = {slope:.3f}", fontsize=10, color='green')
    ax1.text(0.2, -1.6, f'f(x) = {f(x):.3f}', fontsize=10, color='blue')
    fig.canvas.draw_idle()

ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_slider, 'x', 0, 2*np.pi, valinit=1, valfmt='%.2f')
slider.on_changed(update)

update(None)
plt.show()
```

**Teacher Narration** `[85w]`
> Now let's state Part 1 precisely. If f is continuous, then the function g of x defined as the integral from a constant a to x of f(t) dt is differentiable, and its derivative is f(x). In other words, integrating and then differentiating gives back the original function. The visual shows this: the area function g in red has a tangent line whose slope equals the value of f at that point. Play with the slider to see how the slope of g matches f.

---

### Slide 4 · [CORE] 🎛 *[2 controls]*
**FTC Part 2 – Evaluating Definite Integrals**  ·  `split_left_right`

**On-screen text** `[16w]`
FTC Part 2: $\int_a^b f(x) dx = F(b) - F(a)$ — definite integral via antiderivative difference.

**LEFT** `[formula_block]`

**FTC Part 2 (theorem):**

If $f$ is continuous on $[a,b]$ and $F$ is any antiderivative of $f$ (i.e., $F' = f$), then

$$\int_a^b f(x)\,dx = F(b) - F(a).$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^2 from x=0 to 2. Shade the area under the curve. On the same plot, show the antiderivative F(x)=x^3/3 curve (in a different y-scale or on a second y-axis). Emphasize the difference F(2)-F(0) = 8/3 ≈ 2.667. Add annotations. Interactive controls: Slider for a and b to change limits, show both area and F(b)-F(a).

*Interactive Controls:*
  - 🎛 Slider for a from 0 to 2
  - 🎛 Slider for b from a+0.1 to 2

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(8,5))
plt.subplots_adjust(bottom=0.25)

t = np.linspace(0, 2, 500)
f = lambda t: t**2
F = lambda t: t**3/3

def update(val):
    a = slider_a.val
    b = slider_b.val
    if a >= b:
        slider_b.set_val(a+0.1)
        b = a+0.1
    ax.clear()
    
    ax.plot(t, f(t), 'b-', linewidth=2, label='$f(t)=t^2$')
    ax.fill_between(t, f(t), where=(t>=a)&(t<=b), alpha=0.3, color='blue')
    # Plot antiderivative on secondary y-axis
    ax2 = ax.twinx()
    ax2.plot(t, F(t), 'r-', linewidth=2, linestyle='--', label='$F(t)=t^3/3$')
    ax2.set_ylabel('$F(t)$', color='r')
    ax2.tick_params(axis='y', labelcolor='r')
    
    ax.set_xlim(0,2)
    ax.set_ylim(0,4.5)
    ax.set_xlabel('$x$')
    ax.set_ylabel('$f(x)$')
    ax.set_title(f'Area = ∫_{{{a:.2f}}}^{{{b:.2f}}} t^2 dt = F({b:.2f})-F({a:.2f}) = {F(b)-F(a):.3f}')
    ax.legend(loc='upper left')
    ax2.legend(loc='upper right')
    ax.grid(True, alpha=0.3)
    fig.canvas.draw_idle()

ax_slider_a = plt.axes([0.2, 0.1, 0.3, 0.03])
ax_slider_b = plt.axes([0.6, 0.1, 0.3, 0.03])
slider_a = Slider(ax_slider_a, 'a', 0, 2, valinit=0.5)
slider_b = Slider(ax_slider_b, 'b', 0.1, 2, valinit=1.5)
slider_a.on_changed(update)
slider_b.on_changed(update)

update(None)
plt.show()
```

**Teacher Narration** `[72w]`
> Part 2 is the practical workhorse. It says: to evaluate a definite integral, find any antiderivative of the integrand, then subtract its value at the lower limit from its value at the upper limit. Notice that the constant of integration cancels, so we never need to write it. This is far easier than evaluating a Riemann sum. The visual shows this: the shaded area equals the difference in the antiderivative curve F.

---

### Slide 5 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Warm-up Example: Direct FTC Part 2**  ·  `full_width`

**On-screen text** `[9w]`
Example: $\int_0^1 (3x^2+2x)dx = [x^3+x^2]_0^1 = (1+1)-(0) = 2$

**FULL WIDTH** `[steps]`

**Evaluate $\int_0^1 (3x^2 + 2x)\,dx$**

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Find antiderivative $F(x) = x^3 + x^2$ | Since $F'(x) = 3x^2 + 2x$ |
| 2 | $F(1) = 1^3 + 1^2 = 2$ | Evaluate at upper limit |
| 3 | $F(0) = 0^3 + 0^2 = 0$ | Evaluate at lower limit |
| 4 | $\int_0^1 (3x^2 + 2x)\,dx = F(1)-F(0) = 2$ | Apply FTC Part 2 |

**Teacher Narration** `[78w]`
> Let's begin with a straightforward application of FTC Part 2. We want the definite integral from 0 to 1 of 3x squared plus 2x. First, find an antiderivative. The antiderivative of 3x squared is x cubed, and of 2x is x squared. So F of x equals x cubed plus x squared. Then evaluate at the bounds: F of 1 is 1 plus 1 equals 2, F of 0 is 0. The difference is 2. That's the answer.

**Student Prompt:** Try: Evaluate $\int_0^{\pi/4} \sec^2 x\,dx$

---

### Slide 6 · [PRACTICE]
**Standard Example: FTC Part 1**  ·  `full_width`

**On-screen text** `[5w]`
If $g(x)=\int_0^x \frac{1}{1+t^2}dt$, then $g'(x)=\frac{1}{1+x^2}$.

**FULL WIDTH** `[steps]`

**Find $g'(x)$ if $g(x) = \int_0^x \frac{1}{1+t^2}\,dt$**

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Identify $f(t) = \frac{1}{1+t^2}$ | Continuous for all $t$ |
| 2 | $g'(x) = f(x)$ | By FTC Part 1 |
| 3 | $g'(x) = \frac{1}{1+x^2}$ | Substitute $t=x$ |

**Check:** $g'(2) = \frac{1}{1+4} = \frac{1}{5}$

**Teacher Narration** `[82w]`
> Now apply FTC Part 1 to differentiate an integral with a variable upper limit. The function g of x is defined as the integral from 0 to x of 1 over 1 plus t squared dt. The integrand is continuous, so by Part 1, the derivative is simply the integrand evaluated at x. That gives 1 over 1 plus x squared. For instance, at x equals 2, g prime of 2 is 1/5. Notice we didn't need to find the antiderivative explicitly.

**Student Prompt:** Try: If $g(x) = \int_0^x \sqrt{1+t^3}\,dt$, find $g'(2)$.

---

### Slide 7 · [MISCONCEPTION] 🎛 *[1 controls]*
**Misconception: Forgetting the Chain Rule in FTC Part 1**  ·  `split_left_right`

**On-screen text** `[17w]`
Common mistake: forgetting the chain rule factor. Always apply chain rule when upper limit is a function.

**LEFT** `[text]`

**Wrong approach:** $\frac{d}{dx} \int_0^{x^2} \cos(t)\,dt = \cos(x^2)$

**Why wrong:** The upper limit is $x^2$, not $x$. FTC Part 1 requires the chain rule:

$$\frac{d}{dx} \int_0^{g(x)} f(t)\,dt = f(g(x)) \cdot g'(x)$$

**Correct answer:** $\cos(x^2) \cdot 2x$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(t)=cos(t). The area function G(x)=∫_0^{x^2} cos(t) dt. Show the incorrect tangent slope (cos(x^2)) vs correct slope (cos(x^2)*2x). Use two subplots: left shows G(x) with both tangent lines; right shows the difference. Highlight the error.

*Interactive Controls:*
  - 🎛 Slider for x from 0.2 to 2.8

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

x = np.linspace(0, 3, 300)
f = lambda t: np.cos(t)
G = lambda x: np.sin(x**2)  # ∫_0^{x^2} cos(t) dt = sin(x^2)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12,5))
plt.subplots_adjust(bottom=0.2)

# Precompute arrays for right panel
wrong_slope_arr = np.cos(x**2)
correct_slope_arr = np.cos(x**2) * 2*x

def update(val):
    x0 = slider.val
    ax1.clear()
    ax2.clear()
    
    # Left: G(x) and tangent lines
    ax1.plot(x, G(x), 'b-', linewidth=2, label='$G(x)=\int_0^{x^2} \cos(t) dt = \sin(x^2)$')
    ax1.scatter(x0, G(x0), color='green', s=100, zorder=5)
    # wrong tangent slope = cos(x0^2)
    wrong_slope = np.cos(x0**2)
    correct_slope = np.cos(x0**2) * 2*x0
    x_tan = np.linspace(x0-0.4, x0+0.4, 10)
    y_wrong = G(x0) + wrong_slope*(x_tan - x0)
    y_correct = G(x0) + correct_slope*(x_tan - x0)
    ax1.plot(x_tan, y_wrong, 'r--', label='wrong: $\cos(x^2)$')
    ax1.plot(x_tan, y_correct, 'g--', label='correct: $\cos(x^2)\cdot 2x$')
    ax1.set_ylim(-1.5,8)
    ax1.set_xlim(0,3)
    ax1.set_title('Tangent lines on $G(x)$')
    ax1.set_xlabel('$x$')
    ax1.set_ylabel('$G(x)$')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # Right: show the difference
    ax2.plot(x, wrong_slope_arr, 'r-', label='wrong $\cos(x^2)$')
    ax2.plot(x, correct_slope_arr, 'g-', label='correct $\cos(x^2)\cdot 2x$')
    ax2.axvline(x0, color='gray', linestyle='--')
    ax2.set_ylim(-3,12)
    ax2.set_xlim(0,3)
    ax2.set_title('Derivative of $G(x)$')
    ax2.set_xlabel('$x$')
    ax2.set_ylabel("$G'(x)$")
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    fig.canvas.draw_idle()

ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_slider, 'x', 0.2, 2.8, valinit=1.5)
slider.on_changed(update)

update(None)
plt.show()
```

**Teacher Narration** `[79w]`
> One of the most common errors in FTC Part 1 is forgetting the chain rule. When the upper limit is not just x but a function of x, you must differentiate that function and multiply. In our example, the upper limit is x squared, so the derivative is cosine of x squared times the derivative of x squared, which is 2x. The graph shows that the wrong tangent line does not match the curve G(x); the correct one does.

---

### Slide 8 · [PRACTICE] 🟡
**Tricky Example: FTC Part 1 with Chain Rule**  ·  `full_width`

**On-screen text** `[8w]`
$h'(x) = \sin((x^3)^2) \cdot 3x^2 = \sin(x^6)\cdot 3x^2$

**FULL WIDTH** `[steps]`

**Find $h'(x)$ if $h(x) = \int_0^{x^3} \sin(t^2)\,dt$**

1. Let $u = x^3$, then $h(x) = \int_0^u \sin(t^2)\,dt$
2. $\frac{dh}{dx} = \frac{dh}{du} \cdot \frac{du}{dx}$ (chain rule)
3. $\frac{dh}{du} = \sin(u^2)$ by FTC Part 1
4. $\frac{du}{dx} = 3x^2$
5. $h'(x) = \sin(x^6) \cdot 3x^2$

**Teacher Narration** `[86w]`
> Here's a trickier version: the upper limit is x cubed. We apply the generalized FTC Part 1. Write u equals x cubed, then h of x becomes the integral from 0 to u of sine of t squared dt. Differentiate using the chain rule: derivative with respect to u gives sine of u squared, times derivative of u with respect to x gives 3x squared. So h prime of x equals sine of x to the sixth times 3x squared. Always remember the chain rule factor.

**Student Prompt:** Try: Find $\frac{d}{dx} \int_0^{x^2} \cos(t^3)\,dt$

---

### Slide 9 · [PRACTICE] 🟡
**Edge Case: When the Lower Limit is Variable**  ·  `full_width`

**On-screen text** `[21w]`
If the integral has the variable in the lower limit, swap limits and apply FTC Part 1 with a sign change.

**FULL WIDTH** `[steps]`

**Find $p'(x)$ if $p(x) = \int_x^5 e^{t^2}\,dt$**

1. Swap limits: $p(x) = -\int_5^x e^{t^2}\,dt$
2. Differentiate: $p'(x) = -\frac{d}{dx}\int_5^x e^{t^2}\,dt$
3. Apply FTC Part 1: $p'(x) = -e^{x^2}$

**Check:** As $x$ increases, the interval $[x,5]$ shrinks, so the area decreases → negative derivative makes sense.

**Teacher Narration** `[82w]`
> What if the variable appears in the lower limit instead of the upper? For p of x equals the integral from x to 5 of e to the t squared dt, we swap the limits and introduce a minus sign. Now it's minus the integral from 5 to x. Differentiate using FTC Part 1, and we get minus e to the x squared. This makes sense: as x increases, the interval gets smaller, so the total area decreases, giving a negative derivative.

**Student Prompt:** Try: Find $\frac{d}{dx} \int_x^2 \ln(t)\,dt$

---

### Slide 10 · [PRACTICE] 🟡
**Application: Finding a Function from Its Derivative**  ·  `full_width`

**On-screen text** `[8w]`
Initial value problems connect FTC to differential equations.

**FULL WIDTH** `[steps]`

**Find $F(x)$ if $F'(x) = 3x^2$ and $F(1) = 5$**

**Method 1 (antiderivative):**
- $F(x) = \int 3x^2\,dx = x^3 + C$
- $F(1) = 1^3 + C = 5 \Rightarrow C=4$
- $F(x) = x^3 + 4$

**Method 2 (FTC Part 2):**
- $F(x) = F(1) + \int_1^x 3t^2\,dt = 5 + [t^3]_1^x = 5 + (x^3-1) = x^3+4$

**Teacher Narration** `[85w]`
> This application shows how FTC helps solve initial value problems. Suppose we know the derivative of a function and its value at one point. We can reconstruct the function. Using indefinite integration, we get a family of antiderivatives differing by a constant. The initial condition picks the specific constant. Alternatively, we can use the definite integral formula from FTC Part 2: F of x equals F of 1 plus the integral from 1 to x of 3t squared dt. Both methods give the same result.

**Student Prompt:** Try: Find $F(x)$ if $F'(x) = \cos x$ and $F(\pi)=0$

---

### Slide 11 · [PRACTICE] 🟡
**Application: Area Between Curves**  ·  `full_width`

**On-screen text** `[9w]`
Area between curves: integrate (top - bottom). Result: 1/6.

**FULL WIDTH** `[steps]`

**Find the area between $y=x^2$ and $y=x$ from $x=0$ to $x=1$**

1. Top: $y=x$, bottom: $y=x^2$ on $[0,1]$
2. Area = $\int_0^1 (x - x^2)\,dx$
3. Antiderivative: $\frac{x^2}{2} - \frac{x^3}{3}$
4. $\left[\frac{x^2}{2} - \frac{x^3}{3}\right]_0^1 = \frac{1}{2} - \frac{1}{3} = \frac{1}{6}$

**Teacher Narration** `[70w]`
> A classic application: area between two curves. From x=0 to 1, the line y=x lies above the parabola y=x squared. So the area is the integral of top minus bottom, from 0 to 1. Integrate x minus x squared. The antiderivative is x squared over 2 minus x cubed over 3. Evaluating at 1 gives 1/2 minus 1/3 equals 1/6. The lower bound gives 0, so the area is 1/6.

**Student Prompt:** Try: Find the area between $y=\sin x$ and $y=0$ from $x=0$ to $x=\pi$.

---

### Slide 12 · [VISUAL_LAB] 🎛 *[5 controls]*
**Interactive Visual Lab: Explore FTC Part 2**  ·  `split_left_right`

**On-screen text** `[12w]`
Explore FTC Part 2 interactively. Change function, bounds, and Riemann sum resolution.

**LEFT** `[text]`

**Use the sliders to change the function and bounds.**

- Choose $f(x)$ from dropdown.
- See the area under $f$ equal to $F(b)-F(a)$.
- Verify that the sum of Riemann rectangles approaches the FTC value.

**What to notice:** The FTC value is exact; the Riemann sum is approximate and improves as $n$ increases.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the selected function f(x) with shading from a to b. On the same plot, show a Riemann sum (midpoint) with n rectangles. Display both the FTC exact value and the Riemann sum. Use dropdown for f: 'x^2', 'sin(x)', 'exp(x)'. Sliders for a, b, n. A toggle to show/hide the antiderivative curve. Colors: f in blue, rectangles in light blue, antiderivative in red dashed. Display numeric values.

*Interactive Controls:*
  - 🎛 Slider for a from 0 to 2
  - 🎛 Slider for b from a+0.1 to 2
  - 🎛 Slider for n from 1 to 50
  - 🎛 Radio button to choose function: x^2, sin(x), exp(x)
  - 🎛 Toggle button to show/hide antiderivative curve

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button, RadioButtons
from math import sin, cos, exp

def f_choice(f_name, t):
    if f_name == 'x^2':
        return t**2
    elif f_name == 'sin(x)':
        return np.sin(t)
    elif f_name == 'exp(x)':
        return np.exp(t)

def F_choice(f_name, t):
    # antiderivatives
    if f_name == 'x^2':
        return t**3/3
    elif f_name == 'sin(x)':
        return -np.cos(t)
    elif f_name == 'exp(x)':
        return np.exp(t)

fig, ax = plt.subplots(figsize=(10,6))
plt.subplots_adjust(left=0.1, bottom=0.3, right=0.8, top=0.9)

t = np.linspace(0, 2, 500)
current_f = 'x^2'

# Radio buttons for function
ax_radio = plt.axes([0.82, 0.4, 0.15, 0.2])
radio = RadioButtons(ax_radio, ('x^2', 'sin(x)', 'exp(x)'))

# Toggle button for antiderivative
ax_button = plt.axes([0.82, 0.2, 0.15, 0.06])
button_toggle = Button(ax_button, 'Hide F')

def update(val):
    a = slider_a.val
    b = slider_b.val
    n = int(slider_n.val)
    f_name = radio.value_selected
    current_f = f_name
    
    ax.clear()
    
    f = lambda t: f_choice(f_name, t)
    F = lambda t: F_choice(f_name, t)
    
    ax.plot(t, f(t), 'b-', linewidth=2, label='f(x)')
    ax.fill_between(t, f(t), where=(t>=a)&(t<=b), alpha=0.2, color='blue')
    
    # Riemann sum (midpoint)
    dx = (b-a)/n
    xi = np.linspace(a+dx/2, b-dx/2, n)
    riemann = np.sum(f(xi))*dx
    for i in range(n):
        ax.bar(xi[i], f(xi[i]), width=dx*0.9, bottom=0, alpha=0.3, color='lightblue', edgecolor='grey')
    
    exact = F(b)-F(a)
    
    # Show antiderivative curve if toggle
    if button_toggle.label.get_text() == 'Hide F':
        ax.plot(t, F(t), 'r--', linewidth=1.5, label='F(x)')
        ax2 = ax.twinx()
        ax2.set_ylabel('F(x)', color='r')
        ax2.tick_params(axis='y', labelcolor='r')
    
    ax.set_xlim(0,2)
    ax.set_ylim(-1, 5)
    ax.set_xlabel('x')
    ax.set_ylabel('f(x)')
    ax.set_title(f'FTC: {exact:.4f}, Riemann (n={n}): {riemann:.4f}, error: {abs(riemann-exact):.4f}')
    ax.legend(loc='upper left')
    ax.grid(True, alpha=0.3)
    fig.canvas.draw_idle()

# Sliders
ax_slider_a = plt.axes([0.2, 0.15, 0.5, 0.03])
ax_slider_b = plt.axes([0.2, 0.1, 0.5, 0.03])
ax_slider_n = plt.axes([0.2, 0.05, 0.5, 0.03])
slider_a = Slider(ax_slider_a, 'a', 0, 2, valinit=0.5)
slider_b = Slider(ax_slider_b, 'b', 0.1, 2, valinit=1.5)
slider_n = Slider(ax_slider_n, 'n', 1, 50, valinit=5, valstep=1)
slider_a.on_changed(update)
slider_b.on_changed(update)
slider_n.on_changed(update)

radio.on_clicked(update)

def toggle_F(event):
    if button_toggle.label.get_text() == 'Hide F':
        button_toggle.label.set_text('Show F')
    else:
        button_toggle.label.set_text('Hide F')
    update(None)
button_toggle.on_clicked(toggle_F)

update(None)
plt.show()
```

**Teacher Narration** `[79w]`
> This interactive lab lets you see FTC Part 2 in action. Choose a function from the radio buttons, adjust the bounds a and b with sliders, and control the number of Riemann rectangles. The blue shaded area is the exact integral given by the FTC. The light blue rectangles show the Riemann sum approximation. Notice that as n increases, the Riemann sum converges to the exact value. You can also toggle the antiderivative curve to see F of x.

**Student Prompt:** Set a=0.5, b=1.5, and choose sin(x). Increase n to 30. How close is the Riemann sum to the FTC value?

---

### Slide 13 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Pause and Try: Test Your Understanding**  ·  `split_left_right`

**On-screen text** `[11w]`
Pause and try: Find g'(x) if g(x) = ∫_0^{x^2} 1/(1+t^2) dt.

**LEFT** `[text]`

**Question:**

If $g(x) = \int_0^{x^2} \frac{1}{1+t^2}\,dt$, find $g'(x)$.

Take a moment to solve it yourself.

**RIGHT** `[visual_spec]`

*Visual Spec:* Simple graphic: a question mark and a clock icon to indicate pause.

**Teacher Narration** `[77w]`
> Let's pause here. I want you to try this problem on your own before I reveal the answer. Use the generalized FTC Part 1 with chain rule. Remember: the upper limit is x squared. Pause the video now, work it out, then come back to check your answer. This is a great chance to test your understanding of the chain rule extension. If you get stuck, think about how we handled the similar example with sine earlier.

**Student Prompt:** Find g'(x). Write your answer, then unpause to see the solution.

---

### Slide 14 · [PRACTICE]
**Solution to Pause Problem**  ·  `full_width`

**On-screen text** `[4w]`
Answer: $g'(x) = \frac{2x}{1+x^4}$

**FULL WIDTH** `[steps]`

**Find $g'(x)$ if $g(x) = \int_0^{x^2} \frac{1}{1+t^2}\,dt$**

1. Let $u = x^2$, then $g(x) = \int_0^u \frac{1}{1+t^2}\,dt$
2. Use chain rule: $\frac{dg}{dx} = \frac{dg}{du} \cdot \frac{du}{dx}$
3. $\frac{dg}{du} = \frac{1}{1+u^2}$ (FTC Part 1)
4. $\frac{du}{dx} = 2x$
5. $g'(x) = \frac{1}{1+(x^2)^2} \cdot 2x = \frac{2x}{1+x^4}$

**Teacher Narration** `[85w]`
> Here's the solution. We set u equal to x squared. Then by the chain rule, the derivative of g with respect to x equals the derivative with respect to u times du over dx. By FTC Part 1, dg over du is 1 over 1 plus u squared. That becomes 1 over 1 plus x to the fourth. Then multiply by the derivative of u, which is 2x. So the final answer is 2x over 1 plus x to the fourth. Did you get it?

---

### Slide 15 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Proof Sketch for FTC Part 1**  ·  `split_left_right`

**On-screen text** `[18w]`
For small h, the integral from x to x+h is approximately f(x)*h. The limit as h→0 gives g'(x)=f(x).

**LEFT** `[text]`

**Proof idea:** Use the definition of derivative.

$$g'(x) = \lim_{h\to 0} \frac{g(x+h)-g(x)}{h} = \lim_{h\to 0} \frac{1}{h} \int_x^{x+h} f(t)\,dt$$

By continuity, for small $h$, $f(t) \approx f(x)$ on $[x,x+h]$, so the integral $\approx f(x)\cdot h$. The limit gives $f(x)$.

**Rigorous version uses the Extreme Value Theorem and Squeeze Theorem.**

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(t) and highlight the area from x to x+h. Superimpose a rectangle of height f(x) and width h. Show that as h→0, the shaded area approaches the rectangle. Use animation to shrink h.

*Interactive Controls:*
  - 🎛 Slider for h from 0.01 to 0.5

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

t = np.linspace(0, 2, 500)
f = lambda t: t**2 + 1

fig, ax = plt.subplots(figsize=(8,5))
plt.subplots_adjust(bottom=0.25)

def update(val):
    h = slider.val
    x0 = 1.0
    ax.clear()
    
    ax.plot(t, f(t), 'b-', linewidth=2, label='f(t)')
    # shade area from x to x+h
    ax.fill_between(t, f(t), where=(t>=x0)&(t<=x0+h), alpha=0.3, color='blue')
    # rectangle of height f(x0) width h
    ax.add_patch(plt.Rectangle((x0,0), h, f(x0), alpha=0.2, color='red', label='f(x)·h rectangle'))
    ax.set_xlim(0.8, 1.5)
    ax.set_ylim(0, 4)
    ax.axvline(x0, color='green', linestyle='--', label='x')
    ax.legend()
    ax.set_title(f'h = {h:.3f}, ∫ f(t)dt ≈ {np.trapezoid(f(t[(t>=x0)&(t<=x0+h)]), t[(t>=x0)&(t<=x0+h)]):.4f}, f(x)*h = {f(x0)*h:.4f}')
    ax.grid(True, alpha=0.3)
    fig.canvas.draw_idle()

ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 'h', 0.01, 0.5, valinit=0.3)
slider.on_changed(update)

update(None)
plt.show()
```

**Teacher Narration** `[94w]`
> For those who want the mathematical proof, here's the intuition. The derivative of g at x is the limit of (g(x+h)-g(x))/h. That difference is the integral from x to x+h. For small h, because f is continuous, the values of f on that tiny interval are all close to f(x). So the integral is approximately f(x) times h. In the limit, that approximation becomes exact, so g prime of x equals f of x. Full rigor uses the Extreme Value Theorem and Squeeze Theorem. If you're interested in the details, check the supplementary materials.

---

### Slide 16 · [SUMMARY]
**Summary and Key Takeaways**  ·  `full_width`

**On-screen text** `[11w]`
FTC Part 1 & 2: differentiation and integration are inverse processes.

**FULL WIDTH** `[text]`

**Fundamental Theorem of Calculus**

1. **Part 1:** $\frac{d}{dx} \int_a^x f(t)\,dt = f(x)$
   - Derivative of an integral returns the integrand.
   - Use chain rule if upper limit is a function.

2. **Part 2:** $\int_a^b f(x)\,dx = F(b) - F(a)$
   - Definite integral = antiderivative difference.
   - No constant of integration needed.

3. **Applications:**
   - Area between curves
   - Initial value problems
   - Relating differentiation and integration

**Remember:** Always check continuity of $f$ before applying FTC. If $f$ is not continuous on $[a,b]$, the theorem may fail.

**Teacher Narration** `[82w]`
> Let's summarize the Fundamental Theorem of Calculus. Part 1 tells us that differentiating an integral gives back the original function. Part 2 gives us an efficient way to evaluate definite integrals using antiderivatives. These two parts together show that integration and differentiation are inverse operations. We also saw applications to area between curves and initial value problems. Always check that the integrand is continuous on the interval before applying FTC. With this tool, you can solve many calculus problems much more quickly.

**Student Prompt:** Which part of the FTC would you use to differentiate a function defined by an integral? (Answer: Part 1)

---
