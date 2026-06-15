# The Multivariable Chain Rule

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should be comfortable with the single-variable Chain Rule and basic partial differentiation.

**Learning Objectives:**
- Calculate derivatives of composite multivariable functions using tree diagrams and the Chain Rule
- Apply the Chain Rule to find partial derivatives when variables depend on multiple parameters
- Interpret the gradient as a tool for implicit differentiation and tangent planes
- Analyze relationships between dependent and independent variables through dependency graphs
- Solve real-world problems involving rates of change in multivariable systems

---

## v3.1 Production Readiness

✅ **Interactive moments:** 8 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 76w)
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
✅ **interactive_moments**: 8 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ |  | 75w | 16w | How fast does the temperature change as you hike? |
| 2 | core | 🟢 | ◧ |  | 74w | 15w | Tree Diagrams: One Independent Variable |
| 3 | practice | 🟢 | ⬛⬛ | ⏸️ | 71w | 14w | Warm‑Up: Direct Application |
| 4 | 🎛core | 🟢 | ◧ |  | 77w | 14w | Multiple Independent Variables |
| 5 | 🎛practice | 🟡 | ◧ |  | 77w | 14w | Standard Example: Spherical Coordinates |
| 6 | misconception | 🟡 | ◧ |  | 85w | 18w | Watch Out: Forgetting a Path! |
| 7 | core | 🟢 | ◧ |  | 74w | 9w | General Chain Rule Formula |
| 8 | 🎛practice | 🟡 | ◧ | ⏸️ | 79w | 18w | Tricky Example: Polar Coordinates Again |
| 9 | 🎛core | 🟢 | ◧ |  | 77w | 9w | Implicit Differentiation (Two Variables) |
| 10 | practice | 🟡 | ⬛⬛ |  | 77w | 9w | Edge Case: Implicit Differentiation with Folium of Descartes |
| 11 | 🎛core | 🟡 | ◧ |  | 74w | 12w | Implicit Differentiation (Three Variables) |
| 12 | 🎛practice | 🟢 | ◧ | ⏸️ | 76w | 14w | Real‑World Application: Bug on a Metal Plate |
| 13 | 🎛challenge | 🔴 | ◧ |  | 85w | 15w | [Challenge – Optional] Gradient and the Chain Rule |
| 14 | summary | 🟢 | ⬛⬛ |  | 69w | 15w | Summary |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**How fast does the temperature change as you hike?**  ·  `split_left_right`

**On-screen text** `[16w]`
You're hiking. Temperature depends on position. Position changes with time. How fast does the temperature change?

**LEFT** `[concept]`

You're hiking a mountain. Temperature $T$ depends on latitude $x$, longitude $y$, altitude $z$. Your position changes with time $t$. How does $T$ change?

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a 3D surface representing a mountain (smooth hills). Overlay a serpentine trail in a bright colour. Animate a red dot moving along the trail. Show temperature labels at the dot (numerical value). Use matplotlib 3D. Axes: x, y, altitude. Title: 'Temperature changes along trail'. The dot position should update with a slider for time t from 0 to 10. Use ipywidgets or matplotlib slider.

*Interactive Controls:*
  - 🎛 Slider for time t from 0 to 2π

```python
import numpy as np, matplotlib.pyplot as plt, ipywidgets as widgets
from mpl_toolkits.mplot3d import Axes3D
x = np.linspace(-3,3,100); y = np.linspace(-3,3,100); X,Y = np.meshgrid(x,y)
Z = 5*np.exp(-0.2*X**2 - 0.2*Y**2) + 2
fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d')
ax.plot_surface(X, Y, Z, alpha=0.6, cmap='viridis')
# parametric trail
t_vals = np.linspace(0, 2*np.pi, 200)
trail_x = 2*np.cos(t_vals)
trail_y = 2*np.sin(t_vals)
trail_z = 5*np.exp(-0.2*trail_x**2 - 0.2*trail_y**2) + 2
ax.plot(trail_x, trail_y, trail_z, 'r-', lw=2)
point, = ax.plot([], [], [], 'ro', markersize=8)
def update(t):
    ti = int(t/ (2*np.pi/200))
    point.set_data([trail_x[ti]], [trail_y[ti]])
    point.set_3d_properties([trail_z[ti]])
widgets.interact(update, t=(0,2*np.pi,0.1))
```

**Teacher Narration** `[75w]`
> Imagine you're a climate scientist hiking in the mountains. The temperature depends on where you are: your latitude, longitude, and altitude. But you're moving, so all three coordinates change over time. The question we want to answer today is: how fast does the temperature change as you hike? This problem naturally leads us to the multivariable chain rule, which tells us how to combine all these effects together. Let's build that rule step by step.

**Student Prompt:** Take a guess: how would you compute dT/dt from the partial derivatives of T and the rates of change of the coordinates?

---

### Slide 2 · [CORE]
**Tree Diagrams: One Independent Variable**  ·  `split_left_right`

**On-screen text** `[15w]`
Tree diagram: sum of products of partial derivatives along each path from z to t.

**LEFT** `[formula_block]`

If $z = f(x,y)$ with $x=g(t), y=h(t)$, then:
$$\frac{dz}{dt} = \frac{\partial z}{\partial x}\frac{dx}{dt} + \frac{\partial z}{\partial y}\frac{dy}{dt}$$

Tree diagram:

    z
   / \
  x   y
  |   |
  t   t


**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a tree diagram with nodes: z at top, x and y in middle, t at bottom. For each branch, show partial derivative label. Include buttons or clickable regions for each path (z→x→t and z→y→t). When a path is clicked, highlight that path in red and display the corresponding product term (e.g., ∂z/∂x * dx/dt). Use matplotlib with event handling (e.g., pick events on annotations) to implement the interactivity.

```python
import matplotlib.pyplot as plt, matplotlib.patches as patches
fig, ax = plt.subplots(figsize=(6,4))
ax.set_xlim(0,10); ax.set_ylim(0,10)
ax.axis('off')
# nodes
ax.annotate('z', (5,9), fontsize=20, ha='center')
ax.annotate('x', (2,5), fontsize=20, ha='center')
ax.annotate('y', (8,5), fontsize=20, ha='center')
ax.annotate('t', (5,1), fontsize=20, ha='center')
# branches
ax.plot([5,2],[8.5,5.5], 'k-', lw=2)
ax.plot([5,8],[8.5,5.5], 'k-', lw=2)
ax.plot([2,5],[4.5,1.5], 'k-', lw=2)
ax.plot([8,5],[4.5,1.5], 'k-', lw=2)
# labels
ax.text(3.5,7.5, '∂z/∂x', fontsize=12, rotation=-30)
ax.text(7.5,7.5, '∂z/∂y', fontsize=12, rotation=30)
ax.text(3.5,3.5, 'dx/dt', fontsize=12, rotation=-30)
ax.text(7.5,3.5, 'dy/dt', fontsize=12, rotation=30)
plt.show()
```

**Teacher Narration** `[74w]`
> The key idea is to draw a dependency tree. z depends on x and y, and each of those depends on t. To find dz/dt, you follow every path from z to t, multiply the partial derivatives along that path, and then add up all the products. This sum gives the total rate of change. Practise with the tree diagram on the right — notice that each branch carries a specific partial derivative label.

---

### Slide 3 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Warm‑Up: Direct Application**  ·  `full_width`

**On-screen text** `[14w]`
Use the Chain Rule: sum partials times parametric derivatives. Evaluate at t=0. Answer: 6.

**FULL WIDTH** `[steps]`

**Problem:** $z = x^2y + 3xy^4$, $x = \sin(2t)$, $y = \cos t$. Find $dz/dt$ at $t=0$.

| Step | Action |
|------|--------|
| 1 | $\partial z/\partial x = 2xy + 3y^4$, $\partial z/\partial y = x^2 + 12xy^3$ |
| 2 | $dx/dt = 2\cos(2t)$, $dy/dt = -\sin t$ |
| 3 | Chain: $dz/dt = (2xy+3y^4)(2\cos 2t) + (x^2+12xy^3)(-\sin t)$ |
| 4 | At $t=0$: $x=0$, $y=1$, so $dz/dt = (0+3)(2) + (0+0)(0) = 6$ |

**Answer:** $\left.\frac{dz}{dt}\right|_{t=0}=6$

**Teacher Narration** `[71w]`
> Let's try a simple example. We have z given in terms of x and y, and both x and y are functions of t. First find the partial derivatives of z, then the ordinary derivatives of x and y with respect to t. Multiply and add. At t=0, x is 0 and y is 1, so most terms vanish, giving 6. This is a straightforward check of the tree diagram method.

**Student Prompt:** Pause the video and try this problem before I reveal the answer.

---

### Slide 4 · [CORE] 🎛 *[2 controls]*
**Multiple Independent Variables**  ·  `split_left_right`

**On-screen text** `[14w]`
For each independent variable, sum products along all paths from z to that variable.

**LEFT** `[formula_block]`

If $z = f(x,y)$ with $x=g(s,t), y=h(s,t)$, then:

$$\frac{\partial z}{\partial s} = \frac{\partial z}{\partial x}\frac{\partial x}{\partial s} + \frac{\partial z}{\partial y}\frac{\partial y}{\partial s}$$

$$\frac{\partial z}{\partial t} = \frac{\partial z}{\partial x}\frac{\partial x}{\partial t} + \frac{\partial z}{\partial y}\frac{\partial y}{\partial t}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a tree with z at top, x and y in second layer, s and t at bottom. Branches: z->x, z->y; x->s, x->t; y->s, y->t. Label each branch with corresponding partial derivative. Use distinct colors for paths from z to s (e.g., red) and z to t (blue). The diagram should be clear and symmetrical.

*Interactive Controls:*
  - 🎛 Radio button: show/hide labels for s-paths
  - 🎛 Toggle: highlight all paths to s in red

```python
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(6,5))
ax.set_xlim(0,10); ax.set_ylim(0,10)
ax.axis('off')
# positions
ax.annotate('z', (5,9), fontsize=20, ha='center')
ax.annotate('x', (2,5), fontsize=20, ha='center')
ax.annotate('y', (8,5), fontsize=20, ha='center')
ax.annotate('s', (1,1), fontsize=20, ha='center')
ax.annotate('t', (4,1), fontsize=20, ha='center')
ax.annotate('s', (6,1), fontsize=20, ha='center')
ax.annotate('t', (9,1), fontsize=20, ha='center')
# branches from z
ax.plot([5,2],[8.5,5.5], 'k-', lw=2)
ax.plot([5,8],[8.5,5.5], 'k-', lw=2)
# branches from x
ax.plot([2,1],[4.5,1.5], 'k-', lw=2)
ax.plot([2,4],[4.5,1.5], 'k-', lw=2)
# branches from y
ax.plot([8,6],[4.5,1.5], 'k-', lw=2)
ax.plot([8,9],[4.5,1.5], 'k-', lw=2)
# labels (simplified)
ax.text(3.5,7.5, '∂z/∂x', fontsize=10)
ax.text(6.5,7.5, '∂z/∂y', fontsize=10)
ax.text(0.5,3, '∂x/∂s', fontsize=10)
ax.text(3.5,3, '∂x/∂t', fontsize=10)
ax.text(5.5,3, '∂y/∂s', fontsize=10)
ax.text(8.5,3, '∂y/∂t', fontsize=10)
plt.show()
```

**Teacher Narration** `[77w]`
> Now suppose z still depends on x and y, but x and y each depend on two parameters, say s and t. To find the partial derivative of z with respect to s, you follow every path from z to s — there are two: one through x and one through y. Multiply the partials along each path and add. The same for t. The tree diagram now has four branches at the bottom instead of two.

---

### Slide 5 · [PRACTICE] 🟡 🎛 *[2 controls]*
**Standard Example: Spherical Coordinates**  ·  `split_left_right`

**On-screen text** `[14w]`
Three intermediate variables, three independent. Apply Chain Rule. Answer: ∂w/∂ρ = 2ρ, others 0.

**LEFT** `[steps]`

**Problem:** $w = x^2 + y^2 + z^2$, where $x = \rho\sin\phi\cos\theta$, $y = \rho\sin\phi\sin\theta$, $z = \rho\cos\phi$. Find $\partial w/\partial\rho$, $\partial w/\partial\phi$, $\partial w/\partial\theta$.

**Tree:** $w$ depends on $x,y,z$; each depends on $\rho,\phi,\theta$.

Compute partials of $w$: $\partial w/\partial x = 2x$, etc.

For $\rho$:
$$\frac{\partial w}{\partial\rho} = 2x\sin\phi\cos\theta + 2y\sin\phi\sin\theta + 2z\cos\phi$$
Substitute $x,y,z$ and simplify using trigonometric identities:
$$= 2\rho(\sin^2\phi\cos^2\theta+\sin^2\phi\sin^2\theta+\cos^2\phi) = 2\rho$$

Similarly, $\partial w/\partial\phi=0$, $\partial w/\partial\theta=0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Create a 3D plot showing a point on a sphere. The sphere radius is 1 (for simplicity). Point coordinates (x,y,z) computed from spherical angles phi and theta. Show the vector from origin to point. Allow user to adjust phi (0 to pi) and theta (0 to 2pi) via sliders. Display the partial derivative values? Optional: show a small table of partial derivatives. Use mpl_toolkits.mplot3d and ipywidgets.

*Interactive Controls:*
  - 🎛 Slider for phi from 0 to pi
  - 🎛 Slider for theta from 0 to 2pi

```python
import numpy as np, matplotlib.pyplot as plt, ipywidgets as widgets
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
ax.set_xlim(-1.5,1.5); ax.set_ylim(-1.5,1.5); ax.set_zlim(-1.5,1.5)
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')
# draw sphere
phi = np.linspace(0, np.pi, 30)
theta = np.linspace(0, 2*np.pi, 30)
Phi, Theta = np.meshgrid(phi, theta)
X = np.sin(Phi)*np.cos(Theta)
Y = np.sin(Phi)*np.sin(Theta)
Z = np.cos(Phi)
ax.plot_wireframe(X, Y, Z, alpha=0.2, color='gray')
# initial point
point, = ax.plot([0], [0], [0], 'ro', markersize=8)
def update(phi, theta):
    x = np.sin(phi)*np.cos(theta)
    y = np.sin(phi)*np.sin(theta)
    z = np.cos(phi)
    point.set_data([x], [y])
    point.set_3d_properties([z])
    return point
widgets.interact(update, phi=(0.01,np.pi-0.01,0.1), theta=(0,2*np.pi,0.1))
```

**Teacher Narration** `[77w]`
> Here we have a classic problem: w is the squared distance from the origin, expressed in spherical coordinates. We compute the partial derivative with respect to rho, phi, and theta. The chain rule gives three terms for each derivative because there are three intermediate variables. After substituting and simplifying using trig identities, we find that only the rho derivative is non-zero — confirming that w equals rho squared in spherical coordinates. This is a typical exam problem.

**Student Prompt:** Try to compute ∂w/∂φ yourself before I show the steps.

---

### Slide 6 · [MISCONCEPTION] 🟡
**Watch Out: Forgetting a Path!**  ·  `split_left_right`

**On-screen text** `[18w]`
A common mistake: forgetting that the partial derivatives are evaluated at the current (x,y) which depend on theta.

**LEFT** `[concept]`

**Common mistake:** For $z = f(x,y)$ with $x = r\cos\theta$, $y=r\sin\theta$, a student writes:
$$\frac{\partial z}{\partial \theta} = \frac{\partial z}{\partial x}(-r\sin\theta) + \frac{\partial z}{\partial y}(r\cos\theta)$$
and then treats $\partial z/\partial x$ and $\partial z/\partial y$ as constants, forgetting that they are functions of $x$ and $y$, which themselves depend on $\theta$.

**Correct reasoning:** The formula is correct, but the partials $\partial z/\partial x$ and $\partial z/\partial y$ must be evaluated at $(x,y) = (r\cos\theta, r\sin\theta)$. They are not constants; they implicitly depend on $\theta$ through $x$ and $y$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw the tree: z -> x,y -> r,theta. On the branch from x to theta, label ∂x/∂θ. On the branch from y to theta, label ∂y/∂θ. Highlight that the partial derivatives ∂z/∂x and ∂z/∂y are functions of x and y, which themselves depend on theta. Use an arrow or note: 'Evaluate these at (x,y) = (r cosθ, r sinθ)'.

**Teacher Narration** `[85w]`
> A very common mistake occurs in polar coordinates. The student correctly writes the chain rule formula, but then treats the partial derivatives of z as constants. Remember, ∂z/∂x is itself a function — it depends on x and y, and x and y depend on theta. So when you substitute x = r cosθ and y = r sinθ into the partial derivatives, you are implicitly including the theta dependence. The formula is fine, but you must always evaluate the partials at the correct point.

---

### Slide 7 · [CORE]
**General Chain Rule Formula**  ·  `split_left_right`

**On-screen text** `[9w]`
General formula: sum over all intermediate variables of (∂u/∂xj)(∂xj/∂ti).

**LEFT** `[formula_block]`

**General formula:** If $u$ is a function of $x_1,\dots,x_n$, and each $x_j$ is a function of $t_1,\dots,t_m$, then for each $i$:

$$\frac{\partial u}{\partial t_i} = \sum_{j=1}^n \frac{\partial u}{\partial x_j}\frac{\partial x_j}{\partial t_i}$$

One term for each intermediate variable.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a tree: u at top, then a row of n intermediate nodes (x1 to xn), then a row of m independent nodes (t1 to tm). Label one representative path from u to ti through xj. Show that the sum is over j. Use small dots for omitted nodes. This is abstract but shows pattern.

**Teacher Narration** `[74w]`
> The pattern generalises naturally. If u depends on n intermediate variables, and each of those depends on m independent variables, then for any independent variable ti, the partial derivative is a sum of n terms. Each term is the product of the partial derivative of u with respect to an intermediate variable times the partial derivative of that intermediate variable with respect to ti. The tree diagram helps you keep track of all paths.

---

### Slide 8 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Tricky Example: Polar Coordinates Again**  ·  `split_left_right`

**On-screen text** `[18w]`
Polar coordinates: ∂z/∂r = cosθ ∂z/∂x + sinθ ∂z/∂y. ∂z/∂θ = -r sinθ ∂z/∂x + r cosθ ∂z/∂y.

**LEFT** `[steps]`

**Problem:** Let $z = f(x,y)$ where $x = r\cos\theta$, $y = r\sin\theta$. Express $\partial z/\partial r$ and $\partial z/\partial \theta$ in terms of $\partial z/\partial x$ and $\partial z/\partial y$.

**Solution:**
- $\partial z/\partial r = \cos\theta \frac{\partial z}{\partial x} + \sin\theta \frac{\partial z}{\partial y}$
- $\partial z/\partial \theta = -r\sin\theta \frac{\partial z}{\partial x} + r\cos\theta \frac{\partial z}{\partial y}$

**Note:** The partial derivatives on the right are evaluated at $(r\cos\theta, r\sin\theta)$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a Cartesian plane with a point at (x,y) = (r cosθ, r sinθ). Show the polar grid (circles and rays). Animate changing r and theta with sliders. Colour the point. Show the partial derivative labels as annotations? Possibly show the tangent vectors.

*Interactive Controls:*
  - 🎛 Slider for r from 0.1 to 2
  - 🎛 Slider for theta from 0 to 2π

```python
import numpy as np, matplotlib.pyplot as plt, ipywidgets as widgets
fig, ax = plt.subplots(figsize=(6,6))
ax.set_xlim(-2,2); ax.set_ylim(-2,2)
ax.grid(True)
# polar grid circles
for r in np.linspace(0.5,2,4):
    circle = plt.Circle((0,0), r, fill=False, color='gray', alpha=0.3)
    ax.add_patch(circle)
# rays
for theta in np.linspace(0,2*np.pi,12, endpoint=False):
    ax.plot([0,2*np.cos(theta)], [0,2*np.sin(theta)], color='gray', alpha=0.3)
point, = ax.plot([],[], 'ro', markersize=8)
def update(r, theta):
    x = r*np.cos(theta)
    y = r*np.sin(theta)
    point.set_data([x],[y])
widgets.interact(update, r=(0.1,2,0.1), theta=(0,2*np.pi,0.1))
```

**Teacher Narration** `[79w]`
> Let's revisit polar coordinates with the chain rule. This is a classic 'tricky' example because the formulas are easy to get right, but the evaluation point is subtle. When you see ∂z/∂x on the right side, remember it's the partial derivative of f with respect to its first argument, evaluated at the actual x and y, which are r cosθ and r sinθ. Try adjusting the sliders to see how the partial derivatives might change with r and theta.

**Student Prompt:** Predict: what would ∂z/∂θ be if z = x^2 + y^2? Use the formula and check.

---

### Slide 9 · [CORE] 🎛 *[1 controls]*
**Implicit Differentiation (Two Variables)**  ·  `split_left_right`

**On-screen text** `[9w]`
Implicit differentiation: differentiate F(x,y)=0, solve for dy/dx = -Fx/Fy.

**LEFT** `[formula_block]`

If $F(x,y) = 0$ defines $y$ implicitly as a function of $x$, then

$$\frac{dy}{dx} = -\frac{F_x}{F_y}, \quad F_y \neq 0.$$

**Derivation:** Differentiate both sides of $F(x,y)=0$ with respect to $x$ using the Chain Rule:

$F_x \cdot 1 + F_y \cdot \frac{dy}{dx} = 0 \implies \frac{dy}{dx} = -\frac{F_x}{F_y}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the curve defined by F(x,y)=0 for some simple F (e.g., unit circle x^2+y^2-1=0). Show the tangent line at a movable point. Display the slope computed by formula. Allow user to click/drag a point along the curve and see updated dy/dx and tangent line. Use matplotlib with event handling.

*Interactive Controls:*
  - 🎛 Slider for angle (parameter) to move point along curve

```python
import numpy as np, matplotlib.pyplot as plt
from matplotlib.widgets import Slider
fig, ax = plt.subplots(figsize=(6,6))
theta = np.linspace(0,2*np.pi,400)
x_circ = np.cos(theta)
y_circ = np.sin(theta)
ax.plot(x_circ, y_circ, 'b-', label='x^2+y^2=1')
ax.set_aspect('equal')
ax.set_xlim(-1.5,1.5); ax.set_ylim(-1.5,1.5)
ax.grid(True)
# initial point
pt, = ax.plot([np.cos(0.5)], [np.sin(0.5)], 'ro', markersize=8)
# tangent line (use a small segment)
tangent, = ax.plot([], [], 'k--', lw=2)
def update(t):
    x0 = np.cos(t)
    y0 = np.sin(t)
    pt.set_data([x0],[y0])
    # derivative dy/dx = -x/y
    if abs(y0) > 0.001:
        m = -x0/y0
        # compute line endpoints
        x_vals = np.linspace(x0-0.5, x0+0.5, 100)
        y_vals = y0 + m*(x_vals - x0)
        tangent.set_data(x_vals, y_vals)
    else:
        tangent.set_data([],[])
    fig.canvas.draw_idle()
slider_ax = plt.axes([0.2,0.02,0.6,0.03])
slider = Slider(slider_ax, 'angle', 0, 2*np.pi, valinit=0.5)
slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[77w]`
> The chain rule also gives us a powerful tool for implicit differentiation. If a curve is defined by F(x,y) = 0, we can differentiate both sides with respect to x. The partial derivative of F with respect to x times 1, plus the partial with respect to y times dy/dx equals zero. Solve for dy/dx and you get minus Fx over Fy, provided Fy is not zero. This formula is fast and avoids solving for y explicitly.

---

### Slide 10 · [PRACTICE] 🟡
**Edge Case: Implicit Differentiation with Folium of Descartes**  ·  `full_width`

**On-screen text** `[9w]`
Example: x^3+y^3=6xy → dy/dx = -(x^2-2y)/(y^2-2x). Undefined when y^2=2x.

**FULL WIDTH** `[steps]`

**Problem:** Find $dy/dx$ if $x^3 + y^3 = 6xy$.

| Step | Action |
|------|--------|
| 1 | Rewrite: $F(x,y)=x^3+y^3-6xy=0$ |
| 2 | $F_x = 3x^2 - 6y$ |
| 3 | $F_y = 3y^2 - 6x$ |
| 4 | $\frac{dy}{dx} = -\frac{3x^2-6y}{3y^2-6x} = -\frac{x^2-2y}{y^2-2x}$ |

**Edge case:** The derivative is undefined when $y^2-2x=0$. At such points the curve has a vertical tangent or is not locally a function.

**Teacher Narration** `[77w]`
> Let's apply implicit differentiation to the folium of Descartes. Write the equation as F=0, compute the partial derivatives, and plug into the formula. The result is a rational expression. Note the edge case: the derivative fails when y squared equals 2x. At those points, the curve either has a vertical tangent or is not locally a function of x. Real-world systems often have such singularities, so knowing where the derivative exists is as important as computing it.

**Student Prompt:** Find dy/dx at the point (3,3). Does it make sense?

---

### Slide 11 · [CORE] 🟡 🎛 *[2 controls]*
**Implicit Differentiation (Three Variables)**  ·  `split_left_right`

**On-screen text** `[12w]`
For F(x,y,z)=0: ∂z/∂x = -Fx/Fz, ∂z/∂y = -Fy/Fz. Generalises the 2D case.

**LEFT** `[formula_block]`

If $F(x,y,z) = 0$ defines $z$ implicitly as a function of $x$ and $y$, then

$$\frac{\partial z}{\partial x} = -\frac{F_x}{F_z}, \qquad \frac{\partial z}{\partial y} = -\frac{F_y}{F_z}$$

provided $F_z \neq 0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the surface of a simple implicit function, e.g., F(x,y,z)=x^2+y^2+z^2-1=0 (sphere). Show the tangent plane at a movable point. Display the partial derivatives ∂z/∂x and ∂z/∂y computed by formula. Allow user to drag a point on the sphere (or use sliders for angles). Use mpl_toolkits.mplot3d and ipywidgets.

*Interactive Controls:*
  - 🎛 Slider for phi
  - 🎛 Slider for theta

```python
import numpy as np, matplotlib.pyplot as plt, ipywidgets as widgets
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
# sphere
phi = np.linspace(0,np.pi,40)
theta = np.linspace(0,2*np.pi,40)
Phi, Theta = np.meshgrid(phi,theta)
X = np.sin(Phi)*np.cos(Theta)
Y = np.sin(Phi)*np.sin(Theta)
Z = np.cos(Phi)
ax.plot_wireframe(X,Y,Z, alpha=0.2)
ax.set_xlim(-1.5,1.5); ax.set_ylim(-1.5,1.5); ax.set_zlim(-1.5,1.5)
point, = ax.plot([1],[0],[0], 'ro', markersize=8)
# tangent plane as a small patch
# Skip plane for brevity; can add later
def update(phi, theta):
    x = np.sin(phi)*np.cos(theta)
    y = np.sin(phi)*np.sin(theta)
    z = np.cos(phi)
    point.set_data([x],[y])
    point.set_3d_properties([z])
widgets.interact(update, phi=(0.01,np.pi-0.01,0.1), theta=(0,2*np.pi,0.1))
```

**Teacher Narration** `[74w]`
> The implicit differentiation formula extends to three variables. If F(x,y,z) = 0 defines z implicitly as a function of x and y, then the partial derivatives of z are given by similar ratios. The minus sign is crucial, and the denominator Fz must be non-zero. Geometrically, this gives the slope of the tangent plane. The interactive sphere on the right lets you see how these partial derivatives change as you move on the surface.

---

### Slide 12 · [PRACTICE] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Real‑World Application: Bug on a Metal Plate**  ·  `split_left_right`

**On-screen text** `[14w]`
Bug on a metal plate: temperature T(x,y). Find dT/dt along the bug's elliptical path.

**LEFT** `[steps]`

**Problem:** Temperature $T(x,y)=100-x^2-2y^2$ on a metal plate. A bug crawls along $x(t)=2\cos t$, $y(t)=3\sin t$. Find $dT/dt$ at $t=\pi/4$.

**Solution:**
1. $\partial T/\partial x = -2x$, $\partial T/\partial y = -4y$
2. $dx/dt = -2\sin t$, $dy/dt = 3\cos t$
3. Chain: $dT/dt = -2x(-2\sin t) + (-4y)(3\cos t) = 4x\sin t -12y\cos t$
4. At $t=\pi/4$: $x=\sqrt{2}$, $y=3\sqrt{2}/2$
5. $dT/dt = 4\sqrt{2}(\sqrt{2}/2) - 12\cdot 3\sqrt{2}/2 \cdot \sqrt{2}/2 = 4 - 18 = -14$

**RIGHT** `[visual_spec]`

*Visual Spec:* Contour plot of T(x,y) with levels. Overlay the bug's elliptical path. At a selected time, show a red dot representing the bug, and an arrow indicating the direction of motion. Display the computed dT/dt value. Use sliders to move the bug along the path.

*Interactive Controls:*
  - 🎛 Slider for time t to move bug along path
  - 🎛 Toggle: show/hide velocity vector

```python
import numpy as np, matplotlib.pyplot as plt, ipywidgets as widgets
x = np.linspace(-3,3,400); y = np.linspace(-3,3,400)
X,Y = np.meshgrid(x,y)
T = 100 - X**2 - 2*Y**2
fig, ax = plt.subplots(figsize=(6,6))
contour = ax.contourf(X,Y,T, levels=20, cmap='hot')
plt.colorbar(contour, ax=ax)
# path
t_vals = np.linspace(0,2*np.pi,200)
path_x = 2*np.cos(t_vals)
path_y = 3*np.sin(t_vals)
ax.plot(path_x, path_y, 'c-', lw=2, label='bug path')
point, = ax.plot([], [], 'ro', markersize=8)
# velocity arrow
arrow = ax.quiver([],[],[],[], scale_units='xy', scale=0.5, color='green')
def update(t):
    x0 = 2*np.cos(t)
    y0 = 3*np.sin(t)
    dx = -2*np.sin(t)
    dy = 3*np.cos(t)
    point.set_data([x0],[y0])
    arrow.set_offsets([[x0,y0]])
    arrow.set_UVC(dx, dy)
    ax.set_title(f'dT/dt = {4*x0*np.sin(t) - 12*y0*np.cos(t):.2f}')
    fig.canvas.draw_idle()
widgets.interact(update, t=(0,2*np.pi,0.1))
```

**Teacher Narration** `[76w]`
> Let's apply everything to a real-world scenario. A bug crawls on a metal plate with a given temperature distribution. Its path is an ellipse. Using the chain rule, we find that the temperature changes at a rate of -14 degrees per unit time at t equals pi/4. Notice the combination: the temperature decreases because the bug moves toward cooler regions. The interactive contour plot lets you explore how the rate of change varies along the path.

**Student Prompt:** Before I reveal the answer, use the sliders to find where dT/dt is zero. What does that mean physically?

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Gradient and the Chain Rule**  ·  `split_left_right`

**On-screen text** `[15w]`
Chain Rule in gradient form: df/dt = ∇f · r'(t). The dot product reveals alignment.

**LEFT** `[concept]`

The multivariable chain rule has a compact gradient formulation. If $\mathbf{r}(t) = (x(t), y(t), z(t))$ and $f$ is differentiable, then

$$\frac{df}{dt} = \nabla f(\mathbf{r}(t)) \cdot \mathbf{r}'(t)$$

This means the rate of change of $f$ along a path is the dot product of the gradient and the velocity vector.

**Interpretation:** The direction in which $f$ increases fastest is the gradient direction; the dot product measures how much the path aligns with that direction.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a 3D surface (e.g., a saddle). Show a parametric path on the surface. At several points along the path, show the gradient vector (2D projection and 3D arrow) and the velocity vector. The dot product is shown numerically. Allow user to adjust a slider to move along the path and see the instantaneous dot product.

*Interactive Controls:*
  - 🎛 Slider for time index along path

```python
import numpy as np, matplotlib.pyplot as plt, ipywidgets as widgets
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d')
# surface
x = np.linspace(-2,2,40); y = np.linspace(-2,2,40)
X,Y = np.meshgrid(x,y)
Z = X**2 - Y**2
ax.plot_surface(X,Y,Z, alpha=0.6, cmap='viridis')
# path
t_vals = np.linspace(0,2*np.pi,100)
px = 1.5*np.cos(t_vals)
py = 1.5*np.sin(t_vals)
pz = px**2 - py**2
ax.plot(px, py, pz, 'r-', lw=2)
# point and vectors
point, = ax.plot([],[],[], 'ko', markersize=6)
# gradient vector (arrow) - we'll use quiver on 2D? Sorry; for 3D use quiver from mpl_toolkits.mplot3d.art3d
# Simpler: show arrow in 3D using a line
arrow_grad, = ax.plot([],[],[], 'g-', lw=2)
arrow_vel, = ax.plot([],[],[], 'b-', lw=2)
def update(t_index):
    i = int(t_index)
    x0 = px[i]; y0 = py[i]; z0 = pz[i]
    point.set_data([x0],[y0])
    point.set_3d_properties([z0])
    # gradient of f = (2x, -2y)
    grad = np.array([2*x0, -2*y0])
    # velocity (dx, dy, dz = derivative of path)
    dt = 0.1
    dx = px[i+1]-px[i] if i<len(px)-1 else 0
    dy = py[i+1]-py[i] if i<len(py)-1 else 0
    dz = pz[i+1]-pz[i] if i<len(pz)-1 else 0
    vel = np.array([dx, dy, dz])
    # scale grad for display (limit length)
    scale=0.5
    g_end = [x0+scale*grad[0], y0+scale*grad[1], z0]
    arrow_grad.set_data([x0,g_end[0]],[y0,g_end[1]])
    arrow_grad.set_3d_properties([z0,g_end[2]])
    v_end = [x0+0.2*vel[0], y0+0.2*vel[1], z0+0.2*vel[2]]
    arrow_vel.set_data([x0,v_end[0]],[y0,v_end[1]])
    arrow_vel.set_3d_properties([z0,v_end[2]])
    fig.canvas.draw_idle()
widgets.interact(update, t_index=(0,len(px)-2,1))
```

**Teacher Narration** `[85w]`
> For advanced students, the chain rule can be written compactly using the gradient. If r(t) is a path, the derivative of f along that path is the dot product of the gradient of f and the velocity vector. This tells you that the rate of change is largest when the path goes directly uphill — when the velocity is parallel to the gradient. If the path is along a level set, the dot product is zero. This geometric insight is powerful in physics and optimisation.

**Student Prompt:** Using the dot product interpretation, why is dT/dt zero when the bug moves perpendicular to the gradient?

---

### Slide 14 · [SUMMARY]
**Summary**  ·  `full_width`

**On-screen text** `[15w]`
Mastered the multivariable chain rule. You can now handle compositions with any number of variables.

**FULL WIDTH** `[text]`

**Key Formulas:**

1. One independent variable (tree diagram): $\frac{dz}{dt} = \frac{\partial z}{\partial x}\frac{dx}{dt} + \frac{\partial z}{\partial y}\frac{dy}{dt}$

2. Multiple independent variables: $\frac{\partial z}{\partial s} = \sum \frac{\partial z}{\partial x_j}\frac{\partial x_j}{\partial s}$

3. Implicit differentiation (2D): $\frac{dy}{dx} = -\frac{F_x}{F_y}$

4. Implicit differentiation (3D): $\frac{\partial z}{\partial x} = -\frac{F_x}{F_z}, \quad \frac{\partial z}{\partial y} = -\frac{F_y}{F_z}$

5. Gradient form: $\frac{df}{dt} = \nabla f \cdot \mathbf{r}'(t)$

**Learning Objectives Revisited:**
- ✅ Calculate derivatives using tree diagrams
- ✅ Apply chain rule with multiple parameters
- ✅ Interpret gradient for implicit differentiation and tangent planes
- ✅ Analyse dependency graphs
- ✅ Solve real‑world rate problems

**Teacher Narration** `[69w]`
> Today we've covered the multivariable chain rule from several angles: tree diagrams, formulas for one and multiple independent variables, implicit differentiation, and the elegant gradient formulation. Remember that the chain rule is all about summing contributions along all paths in the dependency graph. Practise with the exercises, and especially draw tree diagrams for any composite function you encounter. This skill will be essential in multivariable calculus, physics, and engineering.

---
