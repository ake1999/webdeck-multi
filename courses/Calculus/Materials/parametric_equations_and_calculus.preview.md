# Parametric Equations and Calculus

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You need the chain rule and basic differentiation/integration; we will extend them to parametric equations.

**Learning Objectives:**
- Calculate derivatives of parametric curves using the chain rule to find tangent slopes.
- Apply integration techniques to compute arc length of parametric curves.
- Analyze parametric curves for horizontal and vertical tangents, concavity, and critical points.
- Compute areas bounded by parametric curves using parametric integration formulas.
- Interpret parametric representations as particle motion, connecting velocity vectors to geometric properties.

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
⚠️ **Narration overlong  (>120w):** [6]  (avg 94w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 18 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 6 interactive moment(s) (min 3)
⚠️ **narration_overlong**: too long: ['s6:132w']
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ |  | 79w | 11w | The Drone Analogy |
| 2 | 🎛core | 🟢 | ◧ | ⏸️ | 96w | 10w | Derivative: Slope of Tangent |
| 3 | 🎛visual_lab | 🟢 | ◧ |  | 86w | 16w | Explore: Tangent Line Dynamics |
| 4 | misconception | 🟢 | ⬛⬛ |  | 109w | 7w | Common Mistake: Second Derivative |
| 5 | practice | 🟢 | ⬛⬛ | ⏸️ | 89w | 13w | Practice: First Derivative (Warm-Up) |
| 6 | practice | 🟡 | ⬛⬛ |  | 132w⚠️ | 10w | Practice: Second Derivative (Standard) |
| 7 | 🎛core | 🟢 | ◧ |  | 87w | 14w | Arc Length Formula |
| 8 | 🎛visual_lab | 🟡 | ◧ |  | 81w | 12w | Arc Length Approximation |
| 9 | practice | 🟡 | ⬛⬛ |  | 92w | 18w | Practice: Arc Length (Tricky) |
| 10 | 🎛core | 🟢 | ◧ |  | 100w | 17w | Area Under a Parametric Curve |
| 11 | practice | 🟡 | ⬛⬛ |  | 109w | 16w | Practice: Area (Edge Case) |
| 12 | core | 🟡 | ◧ |  | 100w | 13w | Surface Area of Revolution |
| 13 | practice | 🟡 | ⬛⬛ |  | 107w | 12w | Practice: Surface Area (Application) |
| 14 | misconception | 🟢 | ⬛⬛ |  | 96w | 13w | Common Mistake: Forgetting to Check $dx/dt = 0$ |
| 15 | challenge | 🔴 | ◧ |  | 103w | 11w | [Challenge – Optional] Proof of Slope Formula |
| 16 | pause_and_try | 🟢 | ⬛⬛ | ⏸️ | 60w | 14w | Quick Self-Check |
| 17 | practice | 🟢 | ⬛⬛ |  | 86w | 11w | Solution to Self-Check |
| 18 | summary | 🟢 | ⬛⬛ |  | 86w | 11w | Key Takeaways |

---

### Slide 1 · [HOOK] 🎛 *[2 controls]*
**The Drone Analogy**  ·  `split_left_right`

**On-screen text** `[11w]`
Parametric equations: $x(t), y(t)$. Slope = vertical velocity / horizontal velocity.

**LEFT** `[text]`

Instead of a function $y=f(x)$ forcing left-to-right motion, parametric equations give two separate tracking screens: $x(t)$ and $y(t)$. The slope $\frac{dy}{dx}$ becomes a **velocity ratio**.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two subplots: top shows a parametric curve (e.g., x=cos t, y=sin t for t in [0,2π]) with a moving point. Bottom shows separate x(t) and y(t) vs t plots. Animate point moving along parametric curve. Use bold colors: curve in blue, point in red. Add arrows showing velocity components at current point. Timestamps every 1 second.

*Interactive Controls:*
  - 🎛 Slider for t from 0 to 2π
  - 🎛 Toggle: show/hide velocity components

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

t = np.linspace(0, 2*np.pi, 200)
x = np.cos(t)
y = np.sin(t)

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(6, 8))
ax1.plot(x, y, 'b', lw=2)
point, = ax1.plot([], [], 'ro', ms=8)
arrow_x, = ax1.plot([], [], 'r-', lw=1)
arrow_y, = ax1.plot([], [], 'g-', lw=1)
ax1.set_xlim(-1.5, 1.5)
ax1.set_ylim(-1.5, 1.5)
ax1.set_aspect('equal')
ax1.set_title('Parametric curve with velocity components')

ax2.plot(t, x, 'r-', label='x(t)')
ax2.plot(t, y, 'g-', label='y(t)')
line_v, = ax2.plot([], [], 'ko')
ax2.set_xlim(0, 2*np.pi)
ax2.set_ylim(-1.5, 1.5)
ax2.legend()
ax2.set_title('Separate graphs')

def animate(i):
    point.set_data([x[i]], [y[i]])
    vx = -np.sin(t[i])
    vy = np.cos(t[i])
    arrow_x.set_data([x[i], x[i]+vx*0.3], [y[i], y[i]+vy*0.3])
    arrow_y.set_data([x[i], x[i]+vx*0.3], [y[i], y[i]+vy*0.3])
    line_v.set_data([t[i]], [x[i], y[i]])
    return point, arrow_x, arrow_y, line_v

ani = FuncAnimation(fig, animate, frames=len(t), interval=50, blit=True)
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[79w]`
> Imagine you are tracking a drone. A regular function forces the drone to fly strictly left to right. But parametric equations give you two screens: one shows east-west position over time, the other shows north-south. The slope of the flight path is simply the ratio of its upward speed to its forward speed. When the drone goes straight up, forward speed is zero: we get a vertical tangent. When it flies level, upward speed is zero: a horizontal tangent.

---

### Slide 2 · [CORE] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Derivative: Slope of Tangent**  ·  `split_left_right`

**On-screen text** `[10w]`
Slope = ratio of derivatives. Example: $x=t^2$, $y=t^3-3t$ yields $\frac{dy}{dx}=\frac{3t^2-3}{2t}$.

**LEFT** `[formula_block]`

$$\frac{dy}{dx} = \frac{dy/dt}{dx/dt}, \quad \text{provided } \frac{dx}{dt} \neq 0$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the parametric curve for t in [-3,3]: x=t^2, y=t^3-3t. Use blue curve. Mark point at t=2 (x=4, y=2). Draw tangent line with slope 9/4 passing through that point. Show horizontal dashed line at y=2 and vertical at x=4. Label axes x and y. Add text box showing slope value. Use matplotlib.

*Interactive Controls:*
  - 🎛 Slider for t from -3 to 3
  - 🎛 Toggle: show/hide tangent line

**Teacher Narration** `[96w]`
> Here is our first and most important formula. To find the slope of a parametric curve, we do not differentiate y with respect to x directly. Instead, we take the derivative of y with respect to t and divide by the derivative of x with respect to t. For example, if x equals t squared and y equals t cubed minus 3t, then at t=2 we get a slope of 9 over 4. The visual shows the curve and the tangent line at that point. Notice how the tangent line exactly matches the direction of motion.

**Student Prompt:** Before moving on, try finding the slope when t=1 for the same curve. What do you get?

---

### Slide 3 · [VISUAL_LAB] 🎛 *[2 controls]*
**Explore: Tangent Line Dynamics**  ·  `split_left_right`

**On-screen text** `[16w]`
Move the slider to see how the tangent line evolves. Watch for horizontal or vertical tangents.

**LEFT** `[text]`

Use the slider to change parameter $t$. Observe how the tangent line changes. Notice when slope becomes zero (horizontal) or infinite (vertical).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot unit circle for t in [0,2π]. Add a slider for t from 0 to 2π. On the circle, plot the point at the current t and draw the tangent line (computed via dy/dx = -cot t). Show both the slope value and angle relative to horizontal. Use matplotlib.widgets.Slider. Update on slider change. Include a button to reset to t=0.

*Interactive Controls:*
  - 🎛 Slider for t from 0 to 2π
  - 🎛 Reset button

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

t_vals = np.linspace(0, 2*np.pi, 400)
x_vals = np.cos(t_vals)
y_vals = np.sin(t_vals)

fig, ax = plt.subplots()
plt.subplots_adjust(bottom=0.25)
ax.plot(x_vals, y_vals, 'b', lw=2)
ax.set_xlim(-1.5, 1.5)
ax.set_ylim(-1.5, 1.5)
ax.set_aspect('equal')
ax.axhline(0, color='gray', lw=0.5)
ax.axvline(0, color='gray', lw=0.5)
ax.set_title('Tangent line on parametric curve')

point, = ax.plot([], [], 'ro', ms=8)
tangent_line, = ax.plot([], [], 'r-', lw=2)
slope_text = ax.text(0.05, 0.95, '', transform=ax.transAxes, va='top', fontsize=10)

ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
t_slider = Slider(ax_slider, 't', 0.0, 2*np.pi, valinit=0.0)

def update(val):
    t = t_slider.val
    x = np.cos(t)
    y = np.sin(t)
    point.set_data([x], [y])
    # tangent direction: dx = -sin t, dy = cos t
    dx = -np.sin(t)
    dy = np.cos(t)
    # extend line
    s = 0.5
    x_line = [x - s*dx, x + s*dx]
    y_line = [y - s*dy, y + s*dy]
    tangent_line.set_data(x_line, y_line)
    if dx != 0:
        slope = dy/dx
        slope_text.set_text(f'slope = {slope:.3f}')
    else:
        slope_text.set_text('vertical tangent')
    fig.canvas.draw_idle()

t_slider.on_changed(update)

reset_ax = plt.axes([0.8, 0.025, 0.1, 0.04])
button = Button(reset_ax, 'Reset', hovercolor='0.975')
def reset(event):
    t_slider.reset()
button.on_clicked(reset)

update(0)
plt.show()
```

**Teacher Narration** `[86w]`
> Now you can explore how the tangent line changes as you move along the curve. For the unit circle, the slope formula gives minus cotangent of t. Slide the parameter and watch the line rotate. Notice when the slope becomes zero, the line is horizontal – that happens at t equals 0 and pi. When the slope is undefined, the line is vertical – at t equals pi over 2 and 3 pi over 2. This interactive tool helps you build intuition for the ratio formula.

**Student Prompt:** Set t to pi/4. What is the slope? Does the tangent line match your expectation?

---

### Slide 4 · [MISCONCEPTION]
**Common Mistake: Second Derivative**  ·  `full_width`

**On-screen text** `[7w]`
Wrong: $\frac{d^2y}{dt^2} / \frac{d^2x}{dt^2}$ is not $\frac{d^2y}{dx^2}$.

**FULL WIDTH** `[text]`

A common error is thinking $\frac{d^2y}{dx^2} = \frac{d^2y/dt^2}{d^2x/dt^2}$. This is **wrong** because derivatives do not divide that way.

Correct formula: $\frac{d^2y}{dx^2} = \frac{d}{dt}\left(\frac{dy}{dx}\right) \Big/ \frac{dx}{dt}$.

**Teacher Narration** `[109w]`
> Many students try to compute the second derivative by taking second derivatives of x and y separately and dividing them. That is not correct. The second derivative is found by first computing the slope function, then differentiating it with respect to t, and finally dividing by dx over dt. Let me show you why the wrong formula fails. Suppose x equals t squared and y equals t cubed. Then the wrong formula gives 6t over 2, which is 3t, but the correct answer from our formula is actually 3 over 4t. So the wrong formula is off by a factor involving the first derivative. Always use the chain-rule approach.

---

### Slide 5 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Practice: First Derivative (Warm-Up)**  ·  `full_width`

**On-screen text** `[13w]`
Step-by-step: differentiate x and y separately, then divide. At t=1 slope = -1/6.

**FULL WIDTH** `[text]`

**Example 1:** Find $\frac{dy}{dx}$ for $x = t^2+4t$, $y = 2-t$ at $t = 1$.

| Step | Action | Result |
|------|--------|--------|
| 1 | $dx/dt$ | $2t+4$ |
| 2 | $dy/dt$ | $-1$ |
| 3 | Ratio | $\frac{-1}{2t+4}$ |
| 4 | Evaluate at $t=1$ | $-\frac{1}{6}$ |

**Teacher Narration** `[89w]`
> Let's work through a warm-up example. We are given x equals t squared plus 4t and y equals 2 minus t. First, differentiate x with respect to t: we get 2t plus 4. Next, differentiate y: we get negative 1. The derivative dy over dx is simply dy over dt divided by dx over dt, which gives negative 1 over 2t plus 4. At t equals 1, that becomes negative 1 over 6. So the slope of the tangent line at that point is negative one-sixth. Simple and direct.

**Student Prompt:** Try this yourself: for the same curve, find the slope at t = 0. Answer should be -1/4.

---

### Slide 6 · [PRACTICE] 🟡
**Practice: Second Derivative (Standard)**  ·  `full_width`

**On-screen text** `[10w]`
Second derivative = derivative of first derivative, divided by dx/dt.

**FULL WIDTH** `[text]`

**Example 2:** Find $\frac{d^2y}{dx^2}$ for $x = t + \sin t$, $y = t - \cos t$.

| Step | Action | Result |
|------|--------|--------|
| 1 | $dx/dt$, $dy/dt$ | $1+\cos t$, $1+\sin t$ |
| 2 | First derivative | $\frac{1+\sin t}{1+\cos t}$ |
| 3 | Differentiate that w.r.t $t$ | $\frac{1+\cos t+\sin t}{(1+\cos t)^2}$ |
| 4 | Divide by $dx/dt$ | $\frac{1+\cos t+\sin t}{(1+\cos t)^3}$ |

**Teacher Narration** `[132w ⚠️ **OVERLONG: 132w > 120w max**]`
> Now a standard problem on second derivatives. We have x equals t plus sine t, and y equals t minus cosine t. First derivatives: dx over dt is 1 plus cosine t, dy over dt is 1 plus sine t. The first derivative dy over dx is the ratio. Next we need to differentiate that ratio with respect to t. Apply the quotient rule. After simplifying using the identity cosine squared plus sine squared equals 1, we get numerator 1 plus cosine t plus sine t over denominator 1 plus cosine t squared. Finally, divide by dx over dt gives the second derivative as 1 plus cosine t plus sine t over 1 plus cosine t cubed. This matches the pattern: differentiate the slope function, then divide by the derivative of x.

---

### Slide 7 · [CORE] 🎛 *[2 controls]*
**Arc Length Formula**  ·  `split_left_right`

**On-screen text** `[14w]`
Arc length = integral of speed (magnitude of velocity). Speed = $\sqrt{(dx/dt)^2 + (dy/dt)^2}$.

**LEFT** `[formula_block]`

$$L = \int_{\alpha}^{\beta} \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2} \, dt$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a parametric curve (e.g., x=5 cos t, y=3 sin t for t in [0,2π]). Overlay a few small chord segments in red to illustrate summing lengths. Show one zoomed segment with dx and dy labeled. Add axis labels. Use matplotlib.

*Interactive Controls:*
  - 🎛 Slider for number of segments n from 4 to 100
  - 🎛 Toggle: show/hide chord segments

**Teacher Narration** `[87w]`
> To find the length of a parametric curve, we integrate the speed of the particle along the curve. That speed is the magnitude of the velocity vector, which is the square root of the sum of the squares of the derivatives. Imagine breaking the curve into tiny segments; each segment's length is approximately speed times a tiny change in t. Adding them up gives the integral. The visual shows the curve and a few approximating chords, highlighting that the exact length is the limit of these sums.

---

### Slide 8 · [VISUAL_LAB] 🟡 🎛 *[2 controls]*
**Arc Length Approximation**  ·  `split_left_right`

**On-screen text** `[12w]`
Slide n to see polygon approach the ellipse. Watch the length converge.

**LEFT** `[text]`

Adjust the number of segments $n$ to see how the polygonal approximation approaches the true arc length. The exact length for this ellipse is about 25.53.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the ellipse (blue curve). Overlay n chord segments in red. Display computed polygonal length and exact length numeric. Slider n from 4 to 100 with step 2. Use matplotlib.widgets. Include a text box showing both lengths.

*Interactive Controls:*
  - 🎛 Slider for number of segments n from 4 to 100 (even steps)
  - 🎛 Display of polygon length and exact length

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

t_vals = np.linspace(0, 2*np.pi, 400)
x_exact = 5*np.cos(t_vals)
y_exact = 3*np.sin(t_vals)

def ellipse_arc_length_exact():
    # Use numerical integration for 'exact'
    from scipy.integrate import quad
    def integrand(t):
        dx = -5*np.sin(t)
        dy = 3*np.cos(t)
        return np.sqrt(dx**2 + dy**2)
    L, _ = quad(integrand, 0, 2*np.pi)
    return L

L_exact = ellipse_arc_length_exact()

fig, ax = plt.subplots()
plt.subplots_adjust(bottom=0.25)
ax.plot(x_exact, y_exact, 'b', lw=2, label='Exact curve')
ax.set_xlim(-6, 6)
ax.set_ylim(-4, 4)
ax.set_aspect('equal')
ax.legend()
ax.set_title('Arc Length Approximation')

polygon, = ax.plot([], [], 'r-', lw=1, label='Polygon')
length_text = ax.text(0.05, 0.95, '', transform=ax.transAxes, va='top', fontsize=12)

ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
n_slider = Slider(ax_slider, 'n segments', 4, 100, valinit=4, valstep=2)

def update(val):
    n = int(n_slider.val)
    t_poly = np.linspace(0, 2*np.pi, n+1)
    x_poly = 5*np.cos(t_poly)
    y_poly = 3*np.sin(t_poly)
    polygon.set_data(x_poly, y_poly)
    # compute poly length
    dx = np.diff(x_poly)
    dy = np.diff(y_poly)
    L_poly = np.sum(np.sqrt(dx**2 + dy**2))
    length_text.set_text(f'Poly length: {L_poly:.3f}\nExact: {L_exact:.3f}')
    fig.canvas.draw_idle()

n_slider.on_changed(update)
update(4)
plt.show()
```

**Teacher Narration** `[81w]`
> Here you can see how the arc length integral works. We approximate the ellipse by a polygon with n straight segments. As you increase n, the polygon length gets closer to the exact arc length, which for this ellipse is about 25.53. The slider lets you control n from 4 to 100. Notice that even with 50 segments the approximation is very close. This visual demonstrates that the integral formula is just the limit of summing up many tiny straight-line distances.

**Student Prompt:** Try n=100. How close is the polygonal length to the exact value?

---

### Slide 9 · [PRACTICE] 🟡
**Practice: Arc Length (Tricky)**  ·  `full_width`

**On-screen text** `[18w]`
Tricky because you must factor t out of the square root before substitution. Final answer: (13√13 - 8)/27.

**FULL WIDTH** `[text]`

**Example 3:** Find length of $x=t^2$, $y=t^3$ from $t=0$ to $t=1$.

| Step | Action | Result |
|------|--------|--------|
| 1 | $dx/dt$, $dy/dt$ | $2t$, $3t^2$ |
| 2 | Speed | $\sqrt{4t^2+9t^4}=t\sqrt{4+9t^2}$ |
| 3 | Set up integral | $\int_0^1 t\sqrt{4+9t^2}\,dt$ |
| 4 | $u=4+9t^2$, $du=18t\,dt$ | $\frac{1}{18}\int_4^{13}\sqrt{u}\,du$ |
| 5 | Integrate | $\frac{1}{18}\cdot\frac{2}{3}u^{3/2}\big|_4^{13}$ |
| 6 | Evaluate | $\frac{1}{27}(13^{3/2}-8)$ |

**Teacher Narration** `[92w]`
> This example is a bit tricky because the speed expression contains t squared and t to the fourth. We factor out t squared from the square root, leaving t times the square root of 4 plus 9t squared. Then we use the substitution u equals 4 plus 9t squared. The du absorbs one t. After integrating, we get 1 over 27 times 13 to the 3 halves minus 8. The key skill is recognizing when factoring simplifies the integral. Always look for a factor that matches the derivative of the inner function.

---

### Slide 10 · [CORE] 🎛 *[2 controls]*
**Area Under a Parametric Curve**  ·  `split_left_right`

**On-screen text** `[17w]`
Area = integral of y times x'(t) dt. Sign matters: if curve goes right→left, area becomes negative.

**LEFT** `[formula_block]`

$$A = \int_{\alpha}^{\beta} y(t) \, x'(t) \, dt$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a parametric curve (e.g., x=t^2, y=t from t=0 to t=2). Shade the area under the curve from t=0 to t=2. Overlay a few vertical strips in light gray. Mark a representative strip with height y(t) and width dx. Label axes. Use matplotlib with fill_between between curve and y=0.

*Interactive Controls:*
  - 🎛 Slider for t from 0 to 2
  - 🎛 Toggle: show/hide vertical strips

**Teacher Narration** `[100w]`
> To compute the area under a parametric curve, we use the formula: the integral of y times the derivative of x with respect to t, integrated over the parameter interval. Think of it as: area equals the sum of vertical strips whose height is y of t and whose width is x prime of t times dt. But be careful: if the curve is traced from right to left, then x prime is negative, giving a negative area. In that case you either take absolute value or adjust the limits. The visual shows the area under a simple parabolic curve.

---

### Slide 11 · [PRACTICE] 🟡
**Practice: Area (Edge Case)**  ·  `full_width`

**On-screen text** `[16w]`
Edge case: when curve goes right-to-left, area integral gives negative. Take absolute value or swap limits.

**FULL WIDTH** `[text]`

**Example 4:** Find area under $x = t^2$, $y = t$ from $t=0$ to $t=2$.

- $x'(t) = 2t$
- $A = \int_0^2 (t)(2t)\,dt = \int_0^2 2t^2\,dt = \left[\frac{2}{3}t^3\right]_0^2 = \frac{16}{3}$

Now consider $x = \cos t$, $y = \sin t$ from $t=0$ to $t=\pi/2$ (quarter circle). $x'(t) = -\sin t$, so $A = \int_0^{\pi/2} \sin t (-\sin t)\,dt = -\int_0^{\pi/2} \sin^2 t\,dt = -\frac{\pi}{4}$. The negative sign indicates the curve runs from right to left. The actual area is positive $\pi/4$.

**Teacher Narration** `[109w]`
> Here we have two examples. The first is straightforward: the area under the curve x equals t squared, y equals t from t=0 to 2 is 16 over 3. But the second example reveals an edge case. For the quarter circle from t=0 to pi over 2, the derivative of x is negative sine t, so the integrand becomes negative. The integral gives negative pi over 4. But the geometric area should be positive pi over 4. The negative appears because the curve starts at x=1 and goes leftwards to x=0. To get the actual area, we can take the absolute value or integrate from t=pi/2 to 0 instead.

---

### Slide 12 · [CORE] 🟡
**Surface Area of Revolution**  ·  `split_left_right`

**On-screen text** `[13w]`
Surface area = integral of circumference $2\pi y$ times arc length differential $ds$.

**LEFT** `[formula_block]`

$$S = \int_{\alpha}^{\beta} 2\pi y(t) \, \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2} \, dt$$ 
(rotation about x-axis, $y(t) \ge 0$)

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the curve (e.g., x=t, y=t^2 from t=0 to 2) and its shadow revolution surface (wireframe). Highlight a small band at some t: radius y, width ds. Use 3D axes with mpl_toolkits.mplot3d. Show surface semi-transparent. Add labels for y and ds.

**Teacher Narration** `[100w]`
> If we rotate a parametric curve about the x-axis, we get a surface. The area of that surface is found by integrating the circumference of each circular cross-section, which is 2 pi times the y-coordinate, multiplied by the infinitesimal arc length ds. The formula combines the arc length integrand with an extra factor of 2 pi y. Note that this formula works when y is nonnegative for the entire interval; if the curve dips below the axis, you must use absolute value or split the integral. The visual shows the 3D surface and the thin band that is being summed.

---

### Slide 13 · [PRACTICE] 🟡
**Practice: Surface Area (Application)**  ·  `full_width`

**On-screen text** `[12w]`
Real-world application: manufacturers need this to know how much glaze to use.

**FULL WIDTH** `[text]`

**Example 5:** A vase is formed by rotating $x = t$, $y = t^2$ from $t=0$ to $t=2$ about the x-axis. Find surface area.

- $dx/dt=1$, $dy/dt=2t$ → speed $\sqrt{1+4t^2}$
- $S = \int_0^2 2\pi t^2 \sqrt{1+4t^2}\,dt$
- Substitution: $u=1+4t^2$, $du=8t\,dt$, $t^2=(u-1)/4$, $t\,dt=du/8$
- $S = 2\pi \int_1^{17} \frac{u-1}{4} \sqrt{u} \cdot \frac{du}{8} = \frac{\pi}{16} \int_1^{17} (u^{3/2} - u^{1/2})\,du$
- $S = \frac{\pi}{16} \left[ \frac{2}{5}u^{5/2} - \frac{2}{3}u^{3/2} \right]_1^{17}$
- Final expression: $\frac{\pi}{16}\left(\frac{2}{5}(17^{5/2}-1) - \frac{2}{3}(17^{3/2}-1)\right)$

**Teacher Narration** `[107w]`
> Here is a real-world application. Imagine a vase obtained by rotating the curve x equals t, y equals t squared about the x-axis from t=0 to 2. To find its surface area, we set up the integral with y equals t squared and speed root 1 plus 4t squared. The integration requires a substitution: let u equal 1 plus 4t squared. After careful algebra, we get an expression involving 17 to the 5 halves and 17 to the 3 halves. This is not a simple number, but it is what a manufacturer would compute to determine the amount of glaze or paint needed to coat the vase.

---

### Slide 14 · [MISCONCEPTION]
**Common Mistake: Forgetting to Check $dx/dt = 0$**  ·  `full_width`

**On-screen text** `[13w]`
If $dx/dt=0$, tangent is vertical (if $dy/dt\neq0$). If both zero, check for cusp.

**FULL WIDTH** `[text]`

When finding slope, we assume $dx/dt \neq 0$. If $dx/dt = 0$ and $dy/dt \neq 0$, the tangent is **vertical**. If both are zero, the curve may have a cusp or self-intersection; the formula fails and we need limits.

**Example:** $x = t^3$, $y = t^2$ at $t=0$. Both derivatives zero, but curve has a cusp. The slope from the ratio $dy/dx = 2t/(3t^2) = 2/(3t)$ is undefined at t=0, which correctly indicates the cusp.

**Teacher Narration** `[96w]`
> A common oversight is forgetting the condition that the denominator dx over dt must be nonzero. If dx over dt equals zero but dy over dt does not, the tangent line is vertical. But if both derivatives are zero simultaneously, we have an indeterminate form. The curve might have a cusp, a corner, or a self-intersection. For example, consider x equals t cubed, y equals t squared at t equals 0. Both derivatives vanish. The ratio formula gives 2 over 3t, which blows up, indicating a cusp. So always check the derivatives before applying the formula.

---

### Slide 15 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof of Slope Formula**  ·  `split_left_right`

**On-screen text** `[11w]`
Proof uses the Inverse Function Theorem and chain rule. Optional depth.

**LEFT** `[text]`

**Theorem:** For $x=f(t)$, $y=g(t)$ with $f'(t)\neq0$, $\frac{dy}{dx} = \frac{g'(t)}{f'(t)}$.

**Proof sketch:** If $f'(t_0)\neq0$, by the Inverse Function Theorem, $t=f^{-1}(x)$ locally. Then $y=g(f^{-1}(x))$. Chain rule gives $\frac{dy}{dx} = g'(f^{-1}(x)) \cdot \frac{1}{f'(f^{-1}(x))} = \frac{g'(t)}{f'(t)}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a diagram with three regions: t-parameter line, x-axis, y-axis. Show arrows: from t to x via f, from t to y via g. Then show the composite y = g(f^{-1}(x)). Use LaTeX annotations. Include boxes for functions.

**Teacher Narration** `[103w]`
> For those who want a rigorous proof, here it is. The derivative of x with respect to t is nonzero, so we can invert the function locally: express t as a function of x. Then y becomes a composition of g and the inverse of f. Applying the chain rule gives the derivative of y with respect to x as g prime of t divided by f prime of t. This is why we need the denominator to be nonzero. Feel free to pause and study this diagram. It connects the parametric slope formula to the implicit function theorem and the chain rule.

---

### Slide 16 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Quick Self-Check**  ·  `full_width`

**On-screen text** `[14w]`
Try it now. Find slope at t=π and arc length over half the circle.

**FULL WIDTH** `[text]`

**Question:** For the parametric curve $x = 3 + 2\cos t$, $y = 1 + 2\sin t$ from $t = \pi/2$ to $t = 3\pi/2$, find:
- (a) The slope of the tangent line at $t = \pi$.
- (b) The arc length from $t=\pi/2$ to $t=3\pi/2$.

Pause the video and try these on your own. We'll go through the answer on the next slide.

**Teacher Narration** `[60w]`
> I want you to pause the video and attempt these two questions. The curve is a circle of radius 2, centered at (3,1). First, compute the derivatives, then the slope at the specified t. Second, set up the arc length integral. Remember that the speed is constant for a circle. Give it a try, then resume to check your answers.

**Student Prompt:** Pause and try: (a) slope at t=π? (b) arc length from t=π/2 to 3π/2?

---

### Slide 17 · [PRACTICE]
**Solution to Self-Check**  ·  `full_width`

**On-screen text** `[11w]`
At t=π: vertical tangent. Arc length = 2π (half circle circumference).

**FULL WIDTH** `[text]`

**Answers:**
- (a) $dx/dt = -2\sin t$, $dy/dt = 2\cos t$. At $t=\pi$: $dx/dt=0$, $dy/dt=-2$. Tangent is vertical. Slope undefined (vertical line).
- (b) Speed = $\sqrt{(-2\sin t)^2 + (2\cos t)^2} = 2$. Arc length = $\int_{\pi/2}^{3\pi/2} 2\,dt = 2\pi$. This is half the circumference of a circle radius 2: $\frac{1}{2} \cdot 2\pi \cdot 2 = 2\pi$.

**Teacher Narration** `[86w]`
> Here are the answers. For part (a), at t equals pi, the derivative of x is zero and derivative of y is negative 2, so the tangent is vertical. The slope is undefined. For part (b), the speed simplifies to 2 because it's a circle of radius 2. Integrating from pi over 2 to 3 pi over 2 gives 2 pi, which matches half the circumference of a full circle with radius 2, which is 2 pi. So both answers are consistent. Did you get them?

---

### Slide 18 · [SUMMARY]
**Key Takeaways**  ·  `full_width`

**On-screen text** `[11w]`
Five formulas for parametric calculus. Pay attention to conditions and sign.

**FULL WIDTH** `[text]`

**Formulas:**
- Slope: $\displaystyle \frac{dy}{dx} = \frac{dy/dt}{dx/dt}$ (provided $dx/dt\neq0$)
- Second derivative: $\displaystyle \frac{d^2y}{dx^2} = \frac{d}{dt}\left(\frac{dy}{dx}\right) \Big/ \frac{dx}{dt}$
- Arc length: $L = \int \sqrt{(dx/dt)^2 + (dy/dt)^2}\,dt$
- Area under curve: $A = \int y(t)\,x'(t)\,dt$ (watch sign)
- Surface area (rotation about x-axis): $S = \int 2\pi y(t)\,\sqrt{(dx/dt)^2+(dy/dt)^2}\,dt$

**Common mistakes:** Never compute $dy/dx$ directly; never use $d^2y/dt^2 / d^2x/dt^2$ for second derivative; always check $dx/dt\neq0$.

**Teacher Narration** `[86w]`
> Let's review what we've learned. We have five key formulas: the slope, the second derivative, arc length, area, and surface area. The central idea is to treat derivatives as ratios of velocities and to integrate the speed for length. Remember the common pitfalls: never directly differentiate y with respect to x, never use the wrong second derivative formula, and always check if dx over dt is zero. With these tools, you can analyze any parametric curve. Practice the problems in the description to solidify your understanding.

---
