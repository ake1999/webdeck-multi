# Tangent Planes and Linear Approximations

**Category:** vectors_3d_geometry  |  **Level:** First-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** Recall that for a single-variable function the tangent line gives a linear approximation; here we extend that idea to functions of two variables.

**Learning Objectives:**
- Write the equation of the tangent plane to z = f(x,y) at a point using partial derivatives
- Use the linearization L(x,y) to approximate function values near the point
- Determine differentiability via the error condition or continuity of partial derivatives
- Recognize that existence of partial derivatives does not guarantee differentiability

---

## v3.1 Production Readiness

✅ **Interactive moments:** 4 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 77w)
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
✅ **interactive_moments**: 4 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ |  | 75w | 18w | From Lines to Planes |
| 2 | core | 🟢 | ◧ |  | 98w | 15w | Equation of the Tangent Plane & Linearization |
| 3 | practice | 🟢 | ⬛⬛ |  | 81w | 17w | Warm-Up Example |
| 4 | practice | 🟢 | ⬛⬛ | ⏸️ | 75w | 7w | Standard Example — Linear Approximation |
| 5 | core | 🟢 | ◧ |  | 76w | 12w | Differentiability — The Error Condition |
| 6 | 🎛visual_lab | 🟢 | ◧ |  | 72w | 10w | Interactive: Zoom into the Tangent Plane |
| 7 | 🎛misconception | 🟡 | ◧ | ⏸️ | 72w | 18w | Misconception: Partial Derivatives Exist ⇒ Differentiable? |
| 8 | challenge | 🔴 | ◧ |  | 86w | 13w | [Challenge – Optional] Sufficient Condition: Continuous Partial Derivatives |
| 9 | practice | 🟡 | ⬛⬛ |  | 78w | 15w | Edge Case — Square Root Surface |
| 10 | practice | 🟡 | ⬛⬛ |  | 85w | 16w | Application — Estimating Change with Differentials |
| 11 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 69w | 14w | Pause & Try: Tangent Plane to a Trig Surface |
| 12 | practice | 🟢 | ⬛⬛ |  | 74w | 15w | Solution: Trig Surface |
| 13 | summary | 🟢 | ⬛⬛ |  | 60w | 10w | Summary: Tangent Planes & Linear Approximations |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**From Lines to Planes**  ·  `split_left_right`

**On-screen text** `[18w]`
Zoom into a surface — it becomes a flat plane. The tangent plane is the best linear approximation.

**LEFT** `[text]`

Zoom into a smooth surface — it looks flat, like a plane. That's the **tangent plane**.

Just as a tangent line approximates $y = f(x)$ near $x = a$, a tangent plane approximates $z = f(x,y)$ near $(x_0,y_0).$

**RIGHT** `[visual_spec]`

*Visual Spec:* Animated 3D plot of a paraboloid z = x^2 + y^2. The camera zooms in toward (1,1,2) and the surface becomes indistinguishable from its tangent plane. Show the tangent plane in red, the surface in blue. Axis labels: x, y, z. Limit ranges: from [-2,2] to [0.9,1.1] during zoom.

*Interactive Controls:*
  - 🎛 Slider for zoom level from 2.0 to 0.01

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')

x0, y0 = 1, 1
z0 = 2
fx, fy = 2, 2

def plot_surface(zoom):
    ax.clear()
    lim = zoom
    x = np.linspace(x0 - lim, x0 + lim, 40)
    y = np.linspace(y0 - lim, y0 + lim, 40)
    X, Y = np.meshgrid(x, y)
    Z = X**2 + Y**2
    Z_tan = z0 + fx*(X - x0) + fy*(Y - y0)
    ax.plot_surface(X, Y, Z, alpha=0.7, cmap='viridis')
    ax.plot_surface(X, Y, Z_tan, alpha=0.5, color='red')
    ax.scatter([x0], [y0], [z0], color='black', s=50)
    ax.set_xlim(x0-lim, x0+lim)
    ax.set_ylim(y0-lim, y0+lim)
    ax.set_zlim(z0-2*lim, z0+2*lim)
    ax.set_title(f'Zoom: ±{lim:.2f}')
    fig.canvas.draw_idle()

ax_slider = plt.axes([0.2, 0.01, 0.6, 0.03])
slider = Slider(ax_slider, 'Zoom level', 0.01, 2.0, valinit=2.0)
slider.on_changed(plot_surface)
plot_surface(2.0)
plt.show()
```

**Teacher Narration** `[75w]`
> Think about standing on a smooth hill. When you look at your feet, the ground seems flat. That flat patch is the tangent plane. Today we'll learn how to compute it and use it to approximate function values near a point. The key idea: zoom in enough and the surface is indistinguishable from its tangent plane. This concept is fundamental to understanding how functions behave locally, and it will help us solve many practical problems.

---

### Slide 2 · [CORE]
**Equation of the Tangent Plane & Linearization**  ·  `split_left_right`

**On-screen text** `[15w]`
Tangent plane uses partial derivatives as slopes. Linearization L(x,y) is the height of that plane.

**LEFT** `[formula_block]`

**Tangent plane** at $(x_0,y_0,z_0)$:

$$z - z_0 = f_x(x_0,y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0)$$

**Linearization** (same plane solved for $z$):

$$L(x,y) = f(x_0,y_0) + f_x(x_0,y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0)$$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of the surface z = sin(x)cos(y) over [-2,2]x[-2,2] with its tangent plane at (0,0,0). Highlight the point and the slopes in x and y directions. Show f_x and f_y as slopes of the plane along x and y axes.

**Teacher Narration** `[98w]`
> The equation of the tangent plane looks like a linear function in both x and y. The coefficients are the partial derivatives evaluated at the point. We call L(x,y) the linearization — it's the function that gives the height of the plane. For points near (x0,y0), L(x,y) approximates f(x,y). This is a direct extension of the tangent line from single-variable calculus: instead of one slope, we have two slopes, one for each direction. The plane is the best flat approximation to the surface at that point, and it allows us to make quick estimates of function values nearby.

---

### Slide 3 · [PRACTICE]
**Warm-Up Example**  ·  `full_width`

**On-screen text** `[17w]`
Example: z = 2x² + y² at (1,1,3). Tangent plane: z = 4x + 2y - 3.

**FULL WIDTH** `[text]`

Find the tangent plane to $z = 2x^2 + y^2$ at $(1, 1, 3)$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Compute $f_x, f_y$ | $f_x = 4x,\; f_y = 2y$ |
| 2 | Evaluate at $(1,1)$ | $f_x = 4,\; f_y = 2$ |
| 3 | Use formula $z - z_0 = f_x(x-x_0) + f_y(y-y_0)$ | $z - 3 = 4(x-1) + 2(y-1)$ |
| 4 | Simplify | $z = 4x + 2y - 3$ |

**Teacher Narration** `[81w]`
> Let's try a straightforward example. We take partial derivatives, plug in the point, and then write the equation. Notice the linearization L(x,y) would be the right-hand side: L(x,y) = 4x + 2y - 3. This plane touches the surface exactly at (1,1,3). This is a simple but important first step in understanding how linearization works. The process is mechanical: compute the partials, evaluate them, and substitute into the formula. Once you master this, you can handle more complex functions with confidence.

**Student Prompt:** Check: What would L(x,y) be for this function? Answer: L(x,y) = 4x + 2y - 3.

---

### Slide 4 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Standard Example — Linear Approximation**  ·  `full_width`

**On-screen text** `[7w]`
f(x,y)=x e^{xy} at (1,0). L(x,y)=x+y. Approx  f(1.1,-0.1)≈1.

**FULL WIDTH** `[text]`

Find $L(x,y)$ for $f(x,y) = x e^{xy}$ at $(1,0)$ and approximate $f(1.1, -0.1)$.

| Step | Action | Result |
|------|--------|--------|
| 1 | $f(1,0) = 1 \cdot e^0 = 1$ | $z_0 = 1$ |
| 2 | $f_x = e^{xy} + xy e^{xy}$, $f_x(1,0) = 1 + 0 = 1$ | |
| 3 | $f_y = x^2 e^{xy}$, $f_y(1,0) = 1$ | |
| 4 | $L(x,y) = 1 + 1(x-1) + 1(y-0) = x + y$ | |
| 5 | Approx: $f(1.1, -0.1) \approx L(1.1, -0.1) = 1.1 - 0.1 = 1$ | Actual $\approx 0.9854$, error $\approx 0.0146$ |

**Teacher Narration** `[75w]`
> This is a typical problem. We compute the function value, both partial derivatives at the point, then assemble L. The approximation error is small — about 1.5 percent. That's the power of linearization: a simple plane captures the function's behavior near the point. Notice how the linearization L(x,y)=x+y is much simpler than the original function, yet it gives a very good estimate. This technique is especially useful when the exact calculation is difficult or time-consuming.

**Student Prompt:** Try: Find L for f(x,y)=sin(xy) at (0,π) and approximate f(0.1,π). Answer: L = πx, approx 0.314.

---

### Slide 5 · [CORE]
**Differentiability — The Error Condition**  ·  `split_left_right`

**On-screen text** `[12w]`
Differentiability means linear approximation error vanishes faster than distance from the point.

**LEFT** `[concept]`

$f$ is differentiable at $(a,b)$ if
$$\Delta z = f_x(a,b)\Delta x + f_y(a,b)\Delta y + \varepsilon_1\Delta x + \varepsilon_2\Delta y$$
where $\varepsilon_1,\varepsilon_2 \to 0$ as $(\Delta x,\Delta y) \to (0,0)$.

**Interpretation:** The error in the linear approximation goes to zero faster than the distance from the point.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of error/distance ratio against distance δ for the function f(x,y)=x^2+y^2 at (0,0). The ratio goes to 0 as δ→0. Show a line y=δ as the ratio. Use blue curve with points, dashed line at 0.

```python
import numpy as np
import matplotlib.pyplot as plt
delta = np.linspace(0.001, 1, 100)
error_ratio = delta  # for f(x,y)=x^2+y^2 along diagonal
plt.figure(figsize=(6,4))
plt.plot(delta, error_ratio, 'b-', linewidth=2)
plt.axhline(y=0, color='gray', linestyle='--')
plt.xlabel('Distance δ from (0,0)')
plt.ylabel('|Error| / δ')
plt.title('Differentiability: Error/Distance → 0')
plt.grid(True)
plt.show()
```

**Teacher Narration** `[76w]`
> This definition formalizes 'locally linear.' We split the change in f into a linear part plus a remainder. The remainder must shrink faster than the input change. If that holds, the function is differentiable. Graphically, as we zoom in, the surface and the tangent plane become indistinguishable. The ratio of the error to the distance from the point must approach zero, which is a precise mathematical condition that captures the idea of a good linear approximation.

---

### Slide 6 · [VISUAL_LAB] 🎛 *[1 controls]*
**Interactive: Zoom into the Tangent Plane**  ·  `split_left_right`

**On-screen text** `[10w]`
Zoom slider: surface and tangent plane merge at high zoom.

**LEFT** `[text]`

Use the slider to zoom in on the surface $z = x^2 + y^2$ at $(1,1,2)$. Observe when the surface and the tangent plane become indistinguishable.

**RIGHT** `[visual_spec]`

*Visual Spec:* Interactive 3D plot with slider for zoom level. Show paraboloid and tangent plane in red. Slider ranges from 2.0 to 0.01. Updated automatically.

*Interactive Controls:*
  - 🎛 Slider for zoom level: 2.0 to 0.01

**Teacher Narration** `[72w]`
> Now you can experiment. Start with the wide view — you clearly see the surface curving away. As you zoom in, the red plane and blue surface kiss. This is the geometric meaning of differentiability. The slider lets you control the zoom level, so you can see exactly when the surface becomes flat. This hands-on exploration helps build intuition for why the tangent plane is such a powerful tool in multivariable calculus.

**Student Prompt:** Predict: At what zoom level do they become indistinguishable? Try it!

---

### Slide 7 · [MISCONCEPTION] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Misconception: Partial Derivatives Exist ⇒ Differentiable?**  ·  `split_left_right`

**On-screen text** `[18w]`
Partial derivatives exist, but function is NOT differentiable at (0,0). The tangent plane fails to approximate along y=x.

**LEFT** `[concept]`

**Wrong idea:** If $f_x$ and $f_y$ exist at a point, then $f$ is differentiable there.

**Counterexample:** $f(x,y) = (x^3 + y^3)^{1/3}$ at $(0,0)$.

- $f_x(0,0)=1$, $f_y(0,0)=1$ exist.
- But along $y=x$, $\Delta f = \sqrt[3]{2} t$, linear approx would be $2t$. Error ratio does NOT go to 0.

**Conclusion:** Existence of partial derivatives is not enough; they must be 'good' (continuous) to guarantee differentiability.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of f(x,y) = (x^3+y^3)^(1/3). At (0,0) show the tangent plane z = x + y. Highlight the line y=x where the function differs from the plane. Show vertical error bars or a cross-section along y=x with the plane and actual curve.

*Interactive Controls:*
  - 🎛 Toggle: show/hide error along y=x

**Teacher Narration** `[72w]`
> Many students think 'partial derivatives exist' equals differentiable. That's false. This function f has partial derivatives of 1 at (0,0), but the surface has a ridge along the line y=x. The linear approximation error does not shrink faster than distance — a classic counterexample. This shows that differentiability is a stronger condition than just having partial derivatives. The partial derivatives must also be well-behaved near the point, typically meaning they are continuous.

**Student Prompt:** Check f(x,y)=|x|+|y| at (0,0). Are partials defined? Differentiable?

---

### Slide 8 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Sufficient Condition: Continuous Partial Derivatives**  ·  `split_left_right`

**On-screen text** `[13w]`
Continuous partials ⇒ differentiable. Safe to use tangent plane formula in most problems.

**LEFT** `[concept]`

**Theorem:** If $f_x$ and $f_y$ exist near $(a,b)$ and are continuous at $(a,b)$, then $f$ is differentiable at $(a,b)$.

This is a **sufficient** condition (not necessary). Most functions we encounter satisfy it, so we can safely use the tangent plane formula.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D surface plot of z = sin(x)cos(y) over [-2,2]x[-2,2] with a small neighborhood around (0,0) highlighted. Indicate that continuity of partial derivatives forces the error to be small. Use a 2D contour map to show the partials change smoothly.

**Teacher Narration** `[86w]`
> This is a theorem that gives us peace of mind. If the partial derivatives are continuous near the point, then we know the linear approximation works. In practice, nearly every function we work with — polynomials, exponentials, trig — has continuous partials, so we're safe. The continuity ensures that the partial derivatives don't change abruptly, which would cause the linear approximation to fail. This theorem is a sufficient condition, meaning it guarantees differentiability, but it is not necessary: some functions are differentiable even without continuous partials.

---

### Slide 9 · [PRACTICE] 🟡
**Edge Case — Square Root Surface**  ·  `full_width`

**On-screen text** `[15w]`
f(x,y) = sqrt(xy) at (1,1). Tangent plane: z = (x+y)/2. Differentiable due to continuous partials.

**FULL WIDTH** `[text]`

Find the tangent plane to $f(x,y) = \sqrt{xy}$ at $(1,1,1)$ and discuss differentiability.

| Step | Action | Result |
|------|--------|--------|
| 1 | Compute partials | $f_x = \frac{y}{2\sqrt{xy}},\; f_y = \frac{x}{2\sqrt{xy}}$ |
| 2 | Evaluate at (1,1) | $f_x = \frac12,\; f_y = \frac12$ |
| 3 | Tangent plane equation | $z-1 = \frac12(x-1) + \frac12(y-1)$ or $z = \frac{x+y}{2}$ |
| 4 | Differentiability? | Partial derivatives are continuous for $xy>0$. At (1,1) they are continuous, so $f$ is differentiable there. |

**Teacher Narration** `[78w]`
> This function is only defined where xy is non-negative. At (1,1) the partial derivatives exist and are continuous near the point, so the function is differentiable. The tangent plane is z equals half the sum of x and y. Always check the domain! This example shows that even with a restricted domain, differentiability can still hold. The key is that the partial derivatives are continuous in a neighborhood around the point, which ensures the linear approximation is valid.

**Student Prompt:** What if we tried point (0,1)? The partial derivative would be undefined — not differentiable there.

---

### Slide 10 · [PRACTICE] 🟡
**Application — Estimating Change with Differentials**  ·  `full_width`

**On-screen text** `[16w]`
differential df = f_x dx + f_y dy estimates Δf. Example: error 0.07 out of 1.97.

**FULL WIDTH** `[text]`

Use the linearization to estimate the change in $f(x,y) = x^2 + 3xy$ from $(2,1)$ to $(2.1, 1.2)$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Compute partials at (2,1) | $f_x = 4+3=7,\; f_y = 3x=6$ |
| 2 | Differential $df = f_x dx + f_y dy$ | $df = 7(0.1) + 6(0.2) = 0.7 + 1.2 = 1.9$ |
| 3 | Actual change: $f(2.1,1.2) - f(2,1)$ | $= (4.41 + 3*2.1*1.2) - (4+6) = 4.41+7.56-10 = 1.97$ |
| 4 | Approximation error | $1.97 - 1.9 = 0.07$ (small) |

**Teacher Narration** `[85w]`
> This shows a practical use: we can estimate how much a function changes when both inputs change slightly. The differential df uses the tangent plane's slopes. In this example the error is only about 3.5 percent of the actual change — very good for a linear estimate. This technique is widely used in engineering and physics for quick approximations. The differential is essentially the change in the linearization, and it provides a simple way to estimate the effect of small changes in the input variables.

---

### Slide 11 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause & Try: Tangent Plane to a Trig Surface**  ·  `split_left_right`

**On-screen text** `[14w]`
Pause: Compute tangent plane to f(x,y)=cos(x+y) at (0, π/2). Use L to approximate f(0.1,1.6).

**LEFT** `[text]`

Find the equation of the tangent plane to $f(x,y) = \cos(x+y)$ at $(0, \pi/2, 0)$. Then use $L(x,y)$ to approximate $f(0.1, 1.6)$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Placeholder for interactive reveal. Show the surface z = cos(x+y) with tangent plane at the point. Student can toggle visibility of the tangent plane.

*Interactive Controls:*
  - 🎛 Button: reveal answer

**Teacher Narration** `[69w]`
> Give it a try. Compute the partial derivatives, evaluate at the point, write the tangent plane equation, then linearize. After you've attempted, click reveal to check your answer. This is a good test of your understanding because the function involves a trigonometric expression. Remember to evaluate the partial derivatives carefully at the given point. The linearization will be a simple linear function that approximates the cosine near that point.

**Student Prompt:** Try solving before clicking reveal.

---

### Slide 12 · [PRACTICE]
**Solution: Trig Surface**  ·  `full_width`

**On-screen text** `[15w]`
Solution: L(x,y) = -x - y + π/2. Approx -0.1292, actual -0.1288, error very small.

**FULL WIDTH** `[text]`

**Revealed solution:**

$f(x,y) = \cos(x+y)$

$f_x = -\sin(x+y)$, $f_y = -\sin(x+y)$

At $(0, \pi/2)$: $f = \cos(\pi/2) = 0$, $f_x = -1$, $f_y = -1$

Tangent plane: $z - 0 = -1(x-0) -1\left(y-\frac{\pi}{2}\right)$ i.e. $z = -x - y + \frac{\pi}{2}$

Linearization: $L(x,y) = -x - y + \frac{\pi}{2}$

Approximation: $f(0.1, 1.6) \approx -0.1 - 1.6 + \frac{\pi}{2} = -1.7 + 1.5708 = -0.1292$

Actual: $\cos(1.7) \approx -0.1288$, error $\approx 0.0004$

**Teacher Narration** `[74w]`
> The linearization gave a very close approximation. Because the function is smooth and the point is not near a cusp, the linear approximation works beautifully. This is typical for well-behaved functions. The small error demonstrates the power of linearization for making quick and accurate estimates. The error is only about 0.0004, which is remarkably small for a linear approximation. This shows that even for trigonometric functions, the tangent plane provides an excellent local approximation.

---

### Slide 13 · [SUMMARY]
**Summary: Tangent Planes & Linear Approximations**  ·  `full_width`

**On-screen text** `[10w]`
Review: tangent plane formula, linearization, differentiability condition. Use zoom intuition.

**FULL WIDTH** `[text]`

**Key formulas:**

- Tangent plane: $z - z_0 = f_x(x_0,y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0)$
- Linearization: $L(x,y) = f(x_0,y_0) + f_x(x_0,y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0)$
- Differentiability requires error to vanish faster than distance; continuous partials suffice.

**Key insight:** Near a point, a differentiable surface is essentially flat — the tangent plane is the best linear approximation.

**Teacher Narration** `[60w]`
> Today we learned how to find the tangent plane using partial derivatives, how to linearize a function, and what differentiability means for functions of two variables. Remember: continuous partial derivatives guarantee differentiability, but existence alone is not enough. Practice by working through the exercises in your textbook. This knowledge will be essential for understanding more advanced topics in multivariable calculus.

---
