# Green's Theorem

**Category:** vectors_3d_geometry  |  **Level:** First-year university / Advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should be comfortable with line integrals of vector fields and double integrals.

**Learning Objectives:**
- State Green's Theorem and identify its components
- Apply Green's Theorem to convert line integrals to double integrals
- Compute area using the line integral formula
- Recognize when orientation matters and how to handle it
- Connect Green's Theorem to conservative vector fields

---

## v3.1 Production Readiness

✅ **Interactive moments:** 4 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 96w)
⚠️ **Narration too short (<60w):** [6]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 13 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s6:53w']
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
| 1 | hook | 🟢 | ◧ |  | 106w | 20w | Two Ways to Measure Circulation |
| 2 | core | 🟢 | ◧ |  | 101w | 19w | The Circulation Form of Green's Theorem |
| 3 | 🎛visual_lab | 🟢 | ◧ |  | 78w | 12w | Interactive: Explore Orientation |
| 4 | practice | 🟢 | ◧ |  | 99w | 21w | Example 1: Warm-Up Over a Square |
| 5 | 🎛practice | 🟡 | ◧ |  | 97w | 18w | Example 2: Area of an Ellipse |
| 6 | pause_and_try | 🟢 | ◧ | ⏸️ | 53w⚠️ | 21w | Your Turn: Area of a Circle of Radius 3 |
| 7 | practice | 🟢 | ◧ |  | 102w | 21w | Solution: Area of Circle Radius 3 |
| 8 | practice | 🟡 | ◧ |  | 97w | 14w | Example 3: Region Between a Parabola and a Line |
| 9 | 🎛misconception | 🟢 | ◧ |  | 101w | 17w | Common Mistake: Ignoring Orientation |
| 10 | 🎛challenge | 🔴 | ◧ |  | 98w | 13w | [Challenge – Optional] Area of an Astroid |
| 11 | core | 🟢 | ◧ |  | 95w | 16w | Two Vector Forms of Green's Theorem |
| 12 | challenge | 🔴 | ⬛⬛ |  | 119w | 18w | [Challenge – Optional] Proof Outline for Simple Regions |
| 13 | summary | 🟢 | ⬛⬛ |  | 102w | 13w | Summary: Green's Theorem |

---

### Slide 1 · [HOOK]
**Two Ways to Measure Circulation**  ·  `split_left_right`

**On-screen text** `[20w]`
Green's Theorem: A line integral around a closed curve equals the double integral of the curl over the enclosed region.

**LEFT** `[text]`

Walking along the shore, you feel the water pushing you. This is a line integral around the boundary. Standing in the pond, you measure the spin at every point. That's a double integral of the curl. **Green's Theorem says these two measurements are exactly the same.**

**RIGHT** `[visual_spec]`

*Visual Spec:* Two panels: left panel shows a simple closed curve (e.g., ellipse) with a small person icon walking counterclockwise and force vectors (F) tangent to the curve. Right panel shows the same region filled with small green curl arrows pointing upward (k direction). An equals sign in the middle. Label left: '∮_C F·dr', right: '∬_D (∇×F)·k dA'. Title: 'Green’s Theorem'.

```python
import matplotlib.pyplot as plt
import numpy as np

theta = np.linspace(0, 2*np.pi, 100)
x = 2*np.cos(theta)
y = np.sin(theta)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))

# Left panel: curve with boundary force vectors
ax1.plot(x, y, 'b-', lw=2)
# Sample points with force arrows (F = (-y, x) for rotational field)
for t in np.linspace(0, 2*np.pi, 8)[:-1]:
    x0 = 2*np.cos(t)
    y0 = np.sin(t)
    Fx = -y0
    Fy = x0
    ax1.arrow(x0, y0, 0.3*Fx, 0.3*Fy, head_width=0.1, head_length=0.1, fc='red', ec='red')
ax1.set_xlim(-2.5, 2.5)
ax1.set_ylim(-1.5, 1.5)
ax1.set_aspect('equal')
ax1.set_title('∮_C F·dr')

# Right panel: region with curl arrows (all pointing up = 2D curl = 2)
X, Y = np.meshgrid(np.linspace(-1.8, 1.8, 10), np.linspace(-0.8, 0.8, 5))
curl = 2  # constant for F = (-y, x)
ax2.quiver(X, Y, np.zeros_like(X), curl*np.ones_like(Y), color='green', alpha=0.7)
ax2.plot(x, y, 'b-', lw=2, alpha=0.3)
ax2.set_xlim(-2.5, 2.5)
ax2.set_ylim(-1.5, 1.5)
ax2.set_aspect('equal')
ax2.set_title('∬_D (∇×F)·k dA')

plt.suptitle('Green’s Theorem', fontsize=14)
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[106w]`
> Imagine you are standing at the edge of a pond and you walk all the way around it while measuring how the water pushes you. That is a line integral of the force around the boundary. Now imagine you take a boat to the middle and measure how the water spins at every point inside. That is the double integral of the curl. Green's Theorem tells us that these two numbers are always equal. It is a two-dimensional version of the Fundamental Theorem of Calculus, turning a one-dimensional boundary integral into a two-dimensional interior integral. We will see how powerful this is in just a moment.

---

### Slide 2 · [CORE]
**The Circulation Form of Green's Theorem**  ·  `split_left_right`

**On-screen text** `[19w]`
∮_C P dx + Q dy = ∬_D (∂Q/∂x - ∂P/∂y) dA. Curve C must be positively oriented (counterclockwise).

**LEFT** `[formula_block]`

$$\oint_C P\,dx + Q\,dy = \iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dA$$

- $C$: positively oriented (counterclockwise), piecewise smooth, simple closed curve.
- $D$: region enclosed by $C$.
- $P$ and $Q$ have continuous partial derivatives on an open region containing $D$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Single panel: a closed curve (like an ellipse) with a '+' sign indicating counterclockwise orientation. The interior is shaded light blue. Arrow labels: C (boundary), D (region). A small note: 'Positive orientation = counterclockwise'. The integrand (∂Q/∂x - ∂P/∂y) is shown inside the region.

```python
import matplotlib.pyplot as plt
import numpy as np

theta = np.linspace(0, 2*np.pi, 100)
x = 2*np.cos(theta)
y = np.sin(theta)

fig, ax = plt.subplots(figsize=(6, 6))
ax.fill(x, y, alpha=0.2, color='skyblue', label='Region D')
ax.plot(x, y, 'b-', lw=2, label='Boundary C')
# Draw orientation arrow at top
ax.annotate('', xy=(0, 1.1), xytext=(0.5, 0.8),
            arrowprops=dict(arrowstyle='->', color='red', lw=2))
ax.text(0.2, 1.2, 'Counterclockwise', color='red', fontsize=9)
ax.set_xlim(-2.5, 2.5)
ax.set_ylim(-1.5, 1.5)
ax.set_aspect('equal')
ax.legend()
ax.set_title('Green’s Theorem Setup')
plt.show()
```

**Teacher Narration** `[101w]`
> Here is the standard circulation form. The left side is the line integral of the vector field (P, Q) around the closed curve C. The right side is the double integral over the region D of the two-dimensional curl: ∂Q/∂x minus ∂P/∂y. This quantity measures the local rotation of the field at each point. The theorem requires C to be a simple closed curve, piecewise smooth, and oriented counterclockwise. We will see why orientation matters very soon. The functions P and Q must have continuous partial derivatives on an open region containing D; this ensures the double integral is well defined.

---

### Slide 3 · [VISUAL_LAB] 🎛 *[1 controls]*
**Interactive: Explore Orientation**  ·  `split_left_right`

**On-screen text** `[12w]`
Toggle orientation and watch the sign change. Green's Theorem needs counterclockwise orientation.

**LEFT** `[text]`

Use the toggle to switch between counterclockwise and clockwise orientation. Notice that the sign of the line integral flips. Green's Theorem requires the boundary to be oriented counterclockwise; otherwise you must add a negative sign.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a simple closed curve (e.g., a circle). Show the boundary with arrowheads indicating direction. Provide a toggle button 'Orientation: CCW / CW'. When toggled, reverse the arrow direction and update the sign of the computed line integral value displayed on screen. Also show a small region D shaded inside. Use matplotlib widgets Button. Include a text box showing ∮_C F·dr = ? (value changes sign).

*Interactive Controls:*
  - 🎛 Button: Toggle orientation between counterclockwise and clockwise

```python
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.widgets import Button

theta = np.linspace(0, 2*np.pi, 200)
r = 1.5
x = r*np.cos(theta)
y = r*np.sin(theta)

fig, ax = plt.subplots(figsize=(6,6))
plt.subplots_adjust(bottom=0.2)

# Initial orientation: CCW (positive)
orientation = 1  # 1 for CCW, -1 for CW
line, = ax.plot(x, y, 'b-', lw=2)
# Arrow at top
arrow = ax.annotate('', xy=(0, r*1.1), xytext=(0.5, r*0.8),
                   arrowprops=dict(arrowstyle='->', color='red', lw=2))
ax.fill(x, y, alpha=0.2, color='lightgreen')
ax.set_xlim(-2, 2)
ax.set_ylim(-2, 2)
ax.set_aspect('equal')
ax.set_title('Orientation: Counterclockwise')
text_val = ax.text(-1.5, -1.5, '∮ F·dr = +3.0', fontsize=12, color='red')

def toggle_orientation(event):
    global orientation
    orientation *= -1
    # Reverse direction of plot? Actually just reverse the arrow and change text
    if orientation == 1:
        ax.set_title('Orientation: Counterclockwise')
        arrow.remove()
        arrow = ax.annotate('', xy=(0, r*1.1), xytext=(0.5, r*0.8),
                           arrowprops=dict(arrowstyle='->', color='red', lw=2))
        text_val.set_text('∮ F·dr = +3.0')
    else:
        ax.set_title('Orientation: Clockwise')
        arrow.remove()
        arrow = ax.annotate('', xy=(0.5, r*0.8), xytext=(0, r*1.1),
                           arrowprops=dict(arrowstyle='->', color='red', lw=2))
        text_val.set_text('∮ F·dr = -3.0')
    plt.draw()

ax_button = plt.axes([0.4, 0.05, 0.2, 0.075])
button = Button(ax_button, 'Toggle Orientation', color='lightblue')
button.on_clicked(toggle_orientation)
plt.show()
```

**Teacher Narration** `[78w]`
> Let's interactively see the effect of orientation. Here we have a simple closed curve. When we toggle from counterclockwise to clockwise, the line integral flips sign. This is because reversing the direction of traversal reverses the sign of the integral. Green's Theorem is stated for counterclockwise orientation. If your curve is clockwise, you must apply a negative sign. This is a very common mistake, so always check orientation first. Play with the toggle and observe the value changing.

**Student Prompt:** What do you think happens to the double integral if we flip the orientation? (Answer: nothing, it is independent of boundary orientation; only the line integral changes sign.)

---

### Slide 4 · [PRACTICE]
**Example 1: Warm-Up Over a Square**  ·  `split_left_right`

**On-screen text** `[21w]`
Example 1: ∮_C y dx + x dy = 0 over unit square. Curl is zero, so double integral is zero.

**LEFT** `[steps]`

**Problem:** Evaluate $\oint_C y\,dx + x\,dy$ where $C$ is the square with vertices $(0,0),(1,0),(1,1),(0,1)$ oriented counterclockwise.

1. Identify $P=y$, $Q=x$.
2. $\frac{\partial Q}{\partial x}=1$, $\frac{\partial P}{\partial y}=1$.
3. $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}=0$.
4. $\iint_D 0\,dA = 0$.
5. Therefore $\oint_C y\,dx + x\,dy = 0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* A square with corners (0,0), (1,0), (1,1), (0,1). Shade the interior. Label boundary C with counterclockwise arrows. Inside, write '∂Q/∂x - ∂P/∂y = 0' in the center. Optionally show a grid with zero curl vectors (all zero).

```python
import matplotlib.pyplot as plt
import numpy as np

# square vertices
verts = [(0,0), (1,0), (1,1), (0,1), (0,0)]
xs, ys = zip(*verts)

fig, ax = plt.subplots(figsize=(5,5))
ax.fill(xs, ys, alpha=0.2, color='lightblue', label='Region D')
ax.plot(xs, ys, 'b-', lw=2, label='Boundary C')
# orientation arrows
ax.annotate('', xy=(0.25,0), xytext=(0,0), arrowprops=dict(arrowstyle='->', color='red', lw=1.5))
ax.annotate('', xy=(1,0.25), xytext=(1,0), arrowprops=dict(arrowstyle='->', color='red', lw=1.5))
ax.annotate('', xy=(0.75,1), xytext=(1,1), arrowprops=dict(arrowstyle='->', color='red', lw=1.5))
ax.annotate('', xy=(0,0.75), xytext=(0,1), arrowprops=dict(arrowstyle='->', color='red', lw=1.5))
ax.text(0.5, 0.5, '∂Q/∂x - ∂P/∂y = 0', ha='center', va='center', fontsize=12, color='green')
ax.set_xlim(-0.2, 1.2)
ax.set_ylim(-0.2, 1.2)
ax.set_aspect('equal')
ax.set_title('Example 1: Square Region')
plt.show()
```

**Teacher Narration** `[99w]`
> This first example is very simple. We have the vector field (y, x) and the boundary of the unit square. The partial derivatives are both 1, so the curl is zero. Therefore the double integral is zero, and by Green's Theorem the line integral must also be zero. You could compute the line integral directly along the four edges and verify it adds to zero, but Green's Theorem gives the answer instantly. This illustrates that if the curl is zero everywhere, the circulation around any closed curve is zero. That is exactly the condition for a conservative vector field.

---

### Slide 5 · [PRACTICE] 🟡 🎛 *[1 controls]*
**Example 2: Area of an Ellipse**  ·  `split_left_right`

**On-screen text** `[18w]`
Area of ellipse = πab using A = ½ ∮ x dy – y dx. Parametrize then integrate.

**LEFT** `[steps]`

**Problem:** Find the area of ellipse $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$ using Green's Theorem.

1. Use $A = \frac12\oint_C x\,dy - y\,dx$.
2. Parametrize: $x=a\cos t$, $y=b\sin t$, $0\le t \le 2\pi$.
3. $dx=-a\sin t\,dt$, $dy=b\cos t\,dt$.
4. $x\,dy - y\,dx = (a\cos t)(b\cos t\,dt) - (b\sin t)(-a\sin t\,dt) = ab(\cos^2t+\sin^2t)\,dt = ab\,dt$.
5. $A = \frac12\int_0^{2\pi} ab\,dt = \frac12 ab \cdot 2\pi = \pi ab$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot ellipse x=a cos t, y=b sin t. Animate the point moving around as t increases, showing the radial line sweeping area. Display the intermediate expression x dy - y dx = ab dt on screen. At the end show the area πab. Use a slider for t to control point position.

*Interactive Controls:*
  - 🎛 Slider for parameter t from 0 to 2π, updating point position on ellipse

```python
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.widgets import Slider

a, b = 2, 1
t = np.linspace(0, 2*np.pi, 400)
x_ell = a*np.cos(t)
y_ell = b*np.sin(t)

fig, ax = plt.subplots(figsize=(6,6))
plt.subplots_adjust(bottom=0.2)
ax.plot(x_ell, y_ell, 'b-', lw=2)
ax.set_xlim(-2.5, 2.5)
ax.set_ylim(-1.5, 1.5)
ax.set_aspect('equal')
ax.grid(True)
ax.set_title('Ellipse Area via Green\'s Theorem')

# Initial point at t=0
point, = ax.plot([a], [0], 'ro', markersize=8)
line_to_origin, = ax.plot([0, a], [0, 0], 'r-', lw=1)
text_area = ax.text(0, -1.2, f'Area = π·{a}·{b} = {np.pi*a*b:.2f}', fontsize=12,
                   ha='center')

def update(val):
    t_val = val
    x0 = a*np.cos(t_val)
    y0 = b*np.sin(t_val)
    point.set_data([x0], [y0])
    line_to_origin.set_data([0, x0], [0, y0])
    fig.canvas.draw_idle()

ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_slider, 't', 0, 2*np.pi, valinit=0)
slider.on_changed(update)

plt.show()
```

**Teacher Narration** `[97w]`
> Now we use Green's Theorem to compute the area of an ellipse. The area formula A equals one half of the line integral of x dy minus y dx is a direct corollary. We paramatrize the ellipse with cosine and sine. Compute the differentials, substitute, simplify using the Pythagorean identity, and integrate from 0 to 2π. The result is pi a b, exactly the area. This is much easier than a double integral, especially because the ellipse boundary has a simple parametric form. The slider lets you see how the radial vector sweeps area as t increases.

---

### Slide 6 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Your Turn: Area of a Circle of Radius 3**  ·  `split_left_right`

**On-screen text** `[21w]`
Use A = ½ ∮ x dy – y dx to compute area of circle radius 3. Pause and try now.

**LEFT** `[text]`

**Using the area formula $A = \frac12\oint_C x\,dy - y\,dx$, find the area of a circle of radius 3.**

Hint: Parametrize the circle as $x=3\cos t,\ y=3\sin t$, $0\le t \le 2\pi$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Simple circle of radius 3, center at (0,0). Boundary labeled C. Inside the circle a large '?'. Leave space for answer.

```python
import matplotlib.pyplot as plt
import numpy as np

theta = np.linspace(0, 2*np.pi, 200)
r = 3
x = r*np.cos(theta)
y = r*np.sin(theta)

fig, ax = plt.subplots(figsize=(6,6))
ax.plot(x, y, 'b-', lw=2, label='Circle radius 3')
ax.fill(x, y, alpha=0.1, color='lightblue')
ax.text(0, 0, '?', fontsize=30, ha='center', va='center', color='red')
ax.set_xlim(-4, 4)
ax.set_ylim(-4, 4)
ax.set_aspect('equal')
ax.set_title('Find the area using Green\'s Theorem')
plt.show()
```

**Teacher Narration** `[53w ⚠️ **TOO SHORT: 53w < 60w min**]`
> Pause the video here and try this problem yourself. You already have the area formula and you know the paramatrization of a circle. Compute the line integral and see what you get. Remember to integrate from 0 to 2π. When you have your answer, resume the video and we will check it together.

**Student Prompt:** Compute the area of a circle of radius 3 using the line integral formula.

---

### Slide 7 · [PRACTICE]
**Solution: Area of Circle Radius 3**  ·  `split_left_right`

**On-screen text** `[21w]`
Area = 9π. Confirm your result: ½ ∮ x dy – y dx = ½ ⋅ 9 ⋅ 2π = 9π.

**LEFT** `[steps]`

1. Parametrize: $x=3\cos t,\ y=3\sin t$, $0\le t\le 2\pi$.
2. $dx=-3\sin t\,dt$, $dy=3\cos t\,dt$.
3. $x\,dy - y\,dx = 9\cos^2t\,dt + 9\sin^2t\,dt = 9\,dt$.
4. $A = \frac12\int_0^{2\pi} 9\,dt = \frac12 \cdot 9 \cdot 2\pi = 9\pi$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Circle radius 3 with area 9π printed in center. The boundary is traced with a moving point to reinforce paramatrization.

```python
import matplotlib.pyplot as plt
import numpy as np

theta = np.linspace(0, 2*np.pi, 200)
r = 3
x = r*np.cos(theta)
y = r*np.sin(theta)

fig, ax = plt.subplots(figsize=(6,6))
ax.plot(x, y, 'b-', lw=2)
ax.fill(x, y, alpha=0.1, color='lightblue')
ax.text(0, 0, 'Area = 9π', fontsize=20, ha='center', va='center', color='green')
ax.set_xlim(-4, 4)
ax.set_ylim(-4, 4)
ax.set_aspect('equal')
ax.set_title('Solution: Area = 9π')
plt.show()
```

**Teacher Narration** `[102w]`
> Let's check your work. With the paramatrization x equals 3 cos t, y equals 3 sin t, differentials are as shown. The expression x dy minus y dx simplifies to 9 dt. Integrating from 0 to 2π gives 18π, and half of that is 9π, which is exactly the area of a circle of radius 3. If you got that, perfect. If you made a mistake, maybe you forgot the factor one half or miscomputed the differentials. Remember: The area formula always includes the one half. This is a quick way to compute area of any region with a simple boundary paramatrization.

---

### Slide 8 · [PRACTICE] 🟡
**Example 3: Region Between a Parabola and a Line**  ·  `split_left_right`

**On-screen text** `[14w]`
Example 3: ∮_C (3y)dx + (2x)dy = -1/6 over region between y=x² and y=x.

**LEFT** `[steps]`

**Problem:** $\oint_C (3y)\,dx + (2x)\,dy$, C boundary of region between $y=x^2$ and $y=x$ in first quadrant, positively oriented.

1. $P=3y,\ Q=2x$, so $\frac{\partial Q}{\partial x}=2,\ \frac{\partial P}{\partial y}=3$, curl $=2-3=-1$.
2. Region D: $0\le x\le 1,\ x^2\le y\le x$.
3. Double integral: $\iint_D (-1)\,dA = -\int_0^1\int_{x^2}^x 1\,dy\,dx$.
4. Inner: $x - x^2$; outer: $\int_0^1 (x - x^2)\,dx = \left[\frac{x^2}{2} - \frac{x^3}{3}\right]_0^1 = \frac16$.
5. Result: $-\frac16$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot curves y=x^2 (red dashed) and y=x (blue solid). Shaded region between them. Outline boundary C with arrowheads showing counterclockwise direction: go up along y=x, then back along y=x^2. Label points (0,0) and (1,1). Display the curl value -1 inside.

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 1, 200)
y1 = x**2
y2 = x

fig, ax = plt.subplots(figsize=(6,6))
ax.fill_between(x, y1, y2, alpha=0.2, color='lightgreen', label='Region D')
ax.plot(x, y1, 'r--', lw=2, label='y=x^2')
ax.plot(x, y2, 'b-', lw=2, label='y=x')
# orientation arrows on boundary
ax.annotate('', xy=(0.8, 0.8), xytext=(0.6, 0.6), arrowprops=dict(arrowstyle='->', color='red', lw=1.5))
ax.annotate('', xy=(0.4, 0.16), xytext=(0.2, 0.04), arrowprops=dict(arrowstyle='->', color='red', lw=1.5))
ax.text(0.5, 0.5, 'curl = -1', fontsize=12, ha='center', va='center', color='purple')
ax.set_xlim(0, 1.2)
ax.set_ylim(0, 1.2)
ax.set_aspect('equal')
ax.legend()
ax.set_title('Region: y=x² to y=x')
plt.show()
```

**Teacher Narration** `[97w]`
> In this example the vector field has a constant curl of negative one. The region is bounded by a parabola and a line. Setting up the double integral with x from 0 to 1 and y from x squared to x is straightforward. The inner integral gives x minus x squared, and integrating that from 0 to 1 gives one sixth. Because the curl is negative one, the final answer is negative one sixth. Notice how we did not need to compute four separate line integrals; Green's Theorem turned the boundary problem into a simple area calculation.

---

### Slide 9 · [MISCONCEPTION] 🎛 *[1 controls]*
**Common Mistake: Ignoring Orientation**  ·  `split_left_right`

**On-screen text** `[17w]`
For clockwise curves, Green's Theorem gives the opposite sign. Always add a negative if curve is clockwise.

**LEFT** `[text]`

**Wrong approach:** Student uses Green's Theorem on a clockwise curve without adding a negative sign.

**Correct:** $\oint_C^{clockwise} = -\oint_{-C}^{counterclockwise}$. Always check orientation first.

**Why:** The theorem assumes counterclockwise orientation; a clockwise curve contributes the opposite sign.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a triangle (0,0), (2,0), (1,1). Use a toggle to switch between clockwise and counterclockwise. Show two values: one using Green's directly (wrong if clockwise), and one after applying negative sign (correct). Highlight the error if orientation is wrong.

*Interactive Controls:*
  - 🎛 Button: Toggle orientation between clockwise and counterclockwise

```python
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.widgets import Button

# triangle
verts = np.array([[0,0], [2,0], [1,1], [0,0]])
xv, yv = verts[:,0], verts[:,1]

fig, ax = plt.subplots(figsize=(6,5))
plt.subplots_adjust(bottom=0.25)

line, = ax.plot(xv, yv, 'b-', lw=2)
ax.fill(xv, yv, alpha=0.2, color='lightyellow')
ax.set_xlim(-0.5, 2.5)
ax.set_ylim(-0.5, 1.5)
ax.set_aspect('equal')
ax.set_title('Triangle: Orientation?')

# text for values
correct_text = ax.text(1, 0.7, '', fontsize=10, color='green')
wrong_text = ax.text(1, 0.5, '', fontsize=10, color='red')

orientation = 1  # 1 for CCW, -1 for CW

def compute(orient):
    # for F = (y, x^2) example (not important, just show sign)
    # We'll just use a placeholder value
    return 4.5 * orient

def update_display():
    val = compute(orientation)
    if orientation == 1:
        correct_text.set_text(f'Using Green: +{val:.1f}')
        wrong_text.set_text('')
    else:
        correct_text.set_text(f'Using Green (wrong): {val:.1f}')
        wrong_text.set_text(f'Correct: {-val:.1f} (add negative)')
    plt.draw()

def toggle(event):
    global orientation
    orientation *= -1
    # reverse direction of plot
    if orientation == 1:
        line.set_ydata(yv)
    else:
        line.set_ydata(np.flip(yv))  # simplistic
    update_display()

ax_button = plt.axes([0.4, 0.05, 0.2, 0.075])
button = Button(ax_button, 'Toggle Orientation')
button.on_clicked(toggle)

update_display()
plt.show()
```

**Teacher Narration** `[101w]`
> This is one of the most common mistakes students make. They apply Green's Theorem without checking orientation. If the curve is given as clockwise, the line integral on the left side should be the negative of the counterclockwise integral. The double integral on the right does not know about orientation. So you must attach a negative sign. In the interactive, toggle the orientation and see how the computed value changes. The wrong approach would just use the double integral directly and get the wrong sign. Always ask yourself: is my curve positively oriented? If not, add a factor of negative one.

---

### Slide 10 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Area of an Astroid**  ·  `split_left_right`

**On-screen text** `[13w]`
Astroid area = 3πa²/8. Advanced example: use trig identities to simplify the integral.

**LEFT** `[steps]`

**Problem:** Use Green's Theorem to find area of astroid $x^{2/3}+y^{2/3}=a^{2/3}$.

1. Parametrize: $x=a\cos^3 t$, $y=a\sin^3 t$, $0\le t\le 2\pi$.
2. $dx=-3a\cos^2 t\sin t\,dt$, $dy=3a\sin^2 t\cos t\,dt$.
3. $x\,dy - y\,dx = 3a^2\cos^2 t\sin^2 t(\cos^2 t+\sin^2 t)\,dt = 3a^2\cos^2 t\sin^2 t\,dt$.
4. Use identity: $\cos^2 t\sin^2 t = \frac14\sin^2(2t) = \frac18(1-\cos4t)$.
5. $A = \frac12\int_0^{2\pi} 3a^2 \cdot \frac18(1-\cos4t)\,dt = \frac{3a^2}{16}\int_0^{2\pi}(1-\cos4t)\,dt = \frac{3a^2}{16}\cdot 2\pi = \frac{3\pi a^2}{8}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Astroid curve x = a*cos^3 t, y = a*sin^3 t. Use slider for t to move point along curve. Show area calculation step by step. Final area displayed: (3π a^2)/8.

*Interactive Controls:*
  - 🎛 Slider for parameter t from 0 to 2π, updating point on astroid

```python
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.widgets import Slider

a = 2
t_vals = np.linspace(0, 2*np.pi, 400)
x_ast = a*np.cos(t_vals)**3
y_ast = a*np.sin(t_vals)**3

fig, ax = plt.subplots(figsize=(6,6))
plt.subplots_adjust(bottom=0.2)
ax.plot(x_ast, y_ast, 'm-', lw=2)
ax.set_xlim(-2.5, 2.5)
ax.set_ylim(-2.5, 2.5)
ax.set_aspect('equal')
ax.grid(True)
ax.set_title('Astroid: x^⅔ + y^⅔ = a^⅔')

# initial point at t=0
point, = ax.plot([a], [0], 'ro', markersize=8)
text_area = ax.text(0, -2.2, f'Area = (3π·{a}²)/8 = {3*np.pi*a**2/8:.2f}', ha='center', fontsize=12)

def update(val):
    t_val = val
    x0 = a*np.cos(t_val)**3
    y0 = a*np.sin(t_val)**3
    point.set_data([x0], [y0])
    fig.canvas.draw_idle()

ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_slider, 't', 0, 2*np.pi, valinit=0)
slider.on_changed(update)

plt.show()
```

**Teacher Narration** `[98w]`
> This is a more challenging example. The astroid has a star like shape with cusps. Its paramatrization uses powers of cosine and sine. The algebra becomes heavy, but with trigonometric identities we can simplify. The key step is rewriting cos squared t sin squared t as one minus cosine 4t over eight. Then the integral of cosine 4t over a full period is zero, leaving a constant. The final area is three pi a squared over eight. This shows how powerful the area formula is: even a complicated shape has a neat area formula derived through Green's Theorem.

---

### Slide 11 · [CORE]
**Two Vector Forms of Green's Theorem**  ·  `split_left_right`

**On-screen text** `[16w]`
Two forms: circulation (curl) and flux (divergence). Both are special cases of the generalized Stokes theorem.

**LEFT** `[formula_block]`

**Circulation (Curl) Form:**
$$\oint_C \mathbf{F} \cdot d\mathbf{r} = \iint_D (\nabla \times \mathbf{F}) \cdot \mathbf{k}\,dA$$

**Flux (Divergence) Form:**
$$\oint_C \mathbf{F} \cdot \mathbf{n}\,ds = \iint_D \nabla \cdot \mathbf{F}\,dA$$

- $\mathbf{n}$ is the outward unit normal.
- The flux form is the 2D version of the Divergence Theorem.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two small diagrams side by side. Left diagram: curve with tangential arrow (F·dr) shown. Right diagram: same curve with outward normal arrows (F·n ds). Both with region D inside. Labels: 'Circulation' and 'Flux'.

```python
import matplotlib.pyplot as plt
import numpy as np

theta = np.linspace(0, 2*np.pi, 100)
x = np.cos(theta)
y = np.sin(theta)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))

# Left: circulation with tangential vectors
ax1.plot(x, y, 'b-', lw=1.5)
for t in np.linspace(0, 2*np.pi, 8)[:-1]:
    dx = -np.sin(t)
    dy = np.cos(t)
    ax1.arrow(np.cos(t), np.sin(t), dx*0.2, dy*0.2, head_width=0.1, head_length=0.1, fc='red', ec='red')
ax1.set_title('Circulation: F·dr')
ax1.set_xlim(-1.5,1.5)
ax1.set_ylim(-1.5,1.5)
ax1.set_aspect('equal')

# Right: flux with outward normals
ax2.plot(x, y, 'b-', lw=1.5)
for t in np.linspace(0, 2*np.pi, 8)[:-1]:
    nx = np.cos(t)
    ny = np.sin(t)
    ax2.arrow(np.cos(t), np.sin(t), nx*0.2, ny*0.2, head_width=0.1, head_length=0.1, fc='green', ec='green')
ax2.set_title('Flux: F·n ds')
ax2.set_xlim(-1.5,1.5)
ax2.set_ylim(-1.5,1.5)
ax2.set_aspect('equal')

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[95w]`
> Green's Theorem can be written in two vector forms. The circulation form uses the tangential component of the vector field along the boundary, and the curl inside. This is the version we have been using. The flux form uses the normal component of the field across the boundary, and the divergence inside. This is sometimes called the divergence form or normal form. It is actually the two dimensional version of the Divergence Theorem, which we will encounter in three dimensions. Both forms are equivalent; choosing one depends on whether you are measuring circulation or flux.

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof Outline for Simple Regions**  ·  `full_width`

**On-screen text** `[18w]`
Proof splits into two line integrals, each using the Fundamental Theorem of Calculus along vertical or horizontal slices.

**FULL WIDTH** `[text]`

For a region that is both Type I and Type II, we prove Green's Theorem in two parts:

**Part 1:** $\oint_C P\,dx = -\iint_D \frac{\partial P}{\partial y} dA$
- Write D as $a\le x\le b,\ g_1(x)\le y\le g_2(x)$.
- Double integral: $-\int_a^b \int_{g_1(x)}^{g_2(x)} \frac{\partial P}{\partial y} dy\,dx = -\int_a^b [P(x,g_2(x))-P(x,g_1(x))]\,dx$.
- Line integral: break C into bottom (y=g1) and top (y=g2) curves, with opposite orientations; the vertical sides contribute zero. The sum matches.

**Part 2:** $\oint_C Q\,dy = \iint_D \frac{\partial Q}{\partial x} dA$ by describing D as Type II.

Adding gives the full theorem.

**Teacher Narration** `[119w]`
> For those who want a deeper understanding, here is an outline of the proof. We treat the P dx part and the Q dy part separately. For the P part, we view the region as Type I: bounded above and below by functions of x. The double integral of negative partial P partial dy becomes an iterated integral. Using the Fundamental Theorem of Calculus on the inner integral gives a difference of P evaluated on the top and bottom boundaries. Those are exactly the contributions from the line integral along those curves. The vertical sides contribute nothing because dx is zero. Similarly, for the Q part we view the region as Type II. Adding the two gives Green's Theorem.

---

### Slide 13 · [SUMMARY]
**Summary: Green's Theorem**  ·  `full_width`

**On-screen text** `[13w]`
Green's Theorem: boundary integral ↔ interior integral. Check orientation. Area as line integral.

**FULL WIDTH** `[text]`

**Key Formulas:**
- Circulation: $\oint_C P\,dx+Q\,dy = \iint_D (\partial Q/\partial x - \partial P/\partial y)\,dA$
- Area: $A = \frac12\oint_C x\,dy - y\,dx$
- Vector forms: $\oint_C \mathbf{F}\cdot d\mathbf{r} = \iint_D (\nabla\times\mathbf{F})\cdot\mathbf{k}\,dA$, $\oint_C \mathbf{F}\cdot\mathbf{n}\,ds = \iint_D \nabla\cdot\mathbf{F}\,dA$

**Key Takeaways:**
1. Relates line integrals to double integrals.
2. Orientation must be counterclockwise (add negative if not).
3. Area formula is a powerful application.
4. Connects to divergence and curl.

**Teacher Narration** `[102w]`
> Let's quickly recap what we've learned. Green's Theorem gives us a way to convert a line integral around a closed curve into a double integral over the enclosed region. The formula involves the two-dimensional curl. We also saw the area corollary, which allows us to compute area by integrating along the boundary. Orientation is critical: always use counterclockwise or add a negative sign. We also looked at two vector forms: one for circulation and one for flux. Green's Theorem is a fundamental result that connects line and double integrals and is a stepping stone to Stokes' and Divergence theorems in three dimensions.

---
