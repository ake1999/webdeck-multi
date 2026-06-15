# Quadric Surfaces – 3D Conics & Traces

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You should be comfortable with 2D conic sections: ellipses, parabolas, and hyperbolas.

**Learning Objectives:**
- Classify quadric surfaces by standard equations and geometric properties
- Sketch quadric surfaces using traces in coordinate and parallel planes
- Analyze the effect of signs and coefficients on surface shape
- Apply completing the square to identify shifted quadric surfaces
- Interpret real-world applications of ellipsoids, paraboloids, and hyperboloids

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 80w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
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
| 1 | hook | 🟢 | ◧ |  | 65w | 11w | Why Quadric Surfaces Matter |
| 2 | core | 🟢 | ◧ | ⏸️ | 77w | 14w | The Big Idea: Traces |
| 3 | 🎛visual_lab | 🟢 | ◧ |  | 65w | 16w | Interactive Ellipsoid Explorer |
| 4 | 🎛core | 🟢 | ◧ |  | 70w | 12w | Elliptic Paraboloid |
| 5 | 🎛visual_lab | 🟢 | ◧ | ⏸️ | 80w | 15w | Interactive Hyperbolic Paraboloid |
| 6 | core | 🟢 | ⬛⬛ |  | 75w | 15w | Hyperboloids: One Sheet vs Two Sheets |
| 7 | misconception | 🟢 | ◧ |  | 90w | 13w | Common Mistake: Misidentifying Hyperboloids |
| 8 | practice | 🟢 | ◧ |  | 78w | 11w | Example 1: Warm-Up – Cylinder |
| 9 | practice | 🟢 | ◧ |  | 84w | 9w | Example 2: Standard – Ellipsoid Classification |
| 10 | practice | 🟡 | ◧ | ⏸️ | 99w | 15w | Example 3: Tricky – Hyperboloid of Two Sheets |
| 11 | practice | 🟡 | ◧ |  | 107w | 13w | Example 4: Edge Case – Degenerate Ellipsoid |
| 12 | practice | 🟡 | ◧ |  | 84w | 17w | Example 5: Application – Shifted Paraboloid |
| 13 | challenge | 🔴 | ⬛⬛ |  | 84w | 17w | [Challenge – Optional] Proof: Traces Are Conic Sections |
| 14 | summary | 🟢 | ⬛⬛ |  | 69w | 12w | Summary: Six Basic Quadric Surfaces |

---

### Slide 1 · [HOOK]
**Why Quadric Surfaces Matter**  ·  `split_left_right`

**On-screen text** `[11w]`
Ellipsoid, paraboloid, hyperboloid – real-world 3D shapes from simple quadratic equations.

**LEFT** `[text]`

Ellipsoid (football), paraboloid (satellite dish), hyperboloid (cooling tower) – these 3D surfaces surround us. Quadric surfaces extend 2D conic sections into space.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show three side-by-side labeled images: (left) an American football (ellipsoid), (center) a satellite dish (paraboloid), (right) a hyperbolic cooling tower (hyperboloid of one sheet). Below each, the standard equation in small font. Use to scale. No axes needed.

**Teacher Narration** `[65w]`
> Look around you. The football you throw, the satellite dish on your roof, the cooling towers at a power plant – these are all quadric surfaces. They are the natural 3D extension of the conic sections you already know from 2D. In this lecture, we’ll classify them, sketch them using traces, and see how a single sign change can transform a bowl into a saddle.

---

### Slide 2 · [CORE] ⏸️ *[YouTube Pause]*
**The Big Idea: Traces**  ·  `split_left_right`

**On-screen text** `[14w]`
Traces: slice a 3D surface with a plane. Each slice is a conic section.

**LEFT** `[concept]`

A **quadric surface** is the graph of a second-degree equation in $x, y, z$.

**Traces** are cross-sections where we fix one coordinate (e.g., $z=k$) and look at the resulting 2D curve.

> All traces of a quadric surface are conic sections.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of ellipsoid x^2/4 + y^2/9 + z^2/16 = 1. Show three semi-transparent slices: at z=0 (xy-plane), y=0 (xz-plane), x=0 (yz-plane). Each slice is highlighted as a bold ellipse. Use meshgrid and plot_surface for ellipsoid, use contour for traces. Keep axes fixed with labels X, Y, Z. Title: 'Ellipsoid with Traces'. Colors: surface blue, traces red.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
x = np.linspace(-2,2,30)
y = np.linspace(-3,3,30)
X,Y = np.meshgrid(x,y)
Z_sq = 16*(1 - X**2/4 - Y**2/9)
Z_sq = np.maximum(Z_sq,0)
Z = np.sqrt(Z_sq)
ax.plot_surface(X,Y,Z, alpha=0.3, color='blue')
ax.plot_surface(X,Y,-Z, alpha=0.3, color='blue')
# trace z=0
ax.contour(X,Y,Z, levels=[0], colors='red', linewidths=3)
# trace y=0
Y0 = 0
X0 = np.linspace(-2,2,100)
Z0 = np.sqrt(16*(1 - X0**2/4))
ax.plot(X0, Y0*np.ones_like(X0), Z0, 'red', lw=3)
ax.plot(X0, Y0*np.ones_like(X0), -Z0, 'red', lw=3)
# trace x=0
ax.plot(np.zeros(100), np.linspace(-3,3,100), np.sqrt(16*(1 - np.linspace(-3,3,100)**2/9)), 'red', lw=3)
ax.plot(np.zeros(100), np.linspace(-3,3,100), -np.sqrt(16*(1 - np.linspace(-3,3,100)**2/9)), 'red', lw=3)
ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z')
ax.set_title('Ellipsoid with Traces')
plt.show()
```

**Teacher Narration** `[77w]`
> Imagine you have a 3D surface and you slice it with a plane parallel to one of the coordinate planes. The curve you see on that slice is called a trace. For quadric surfaces, every trace is a conic section – an ellipse, parabola, or hyperbola. This fact lets us reconstruct the entire 3D shape from a few well-chosen slices. Pause for a moment and think: if you slice an ellipsoid horizontally, what shape do you expect?

**Student Prompt:** If you slice an ellipsoid horizontally (z = constant), what shape do you expect?

---

### Slide 3 · [VISUAL_LAB] 🎛 *[3 controls]*
**Interactive Ellipsoid Explorer**  ·  `split_left_right`

**On-screen text** `[16w]`
Play with sliders to see how a, b, c stretch the ellipsoid. All traces are ellipses.

**LEFT** `[formula_block]`

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1$$

- $a, b, c$ are semi-axis lengths.
- When $a=b=c$, it's a sphere.
- All traces are ellipses.

Use the sliders to change $a$, $b$, $c$.

**RIGHT** `[python_lab]`

*Visual Spec:* 3D plot of ellipsoid with sliders for a, b, c. Axes labels X, Y, Z. Show surface and update as sliders change. Initial a=2, b=3, c=4. Slider range 0.5 to 5. Add a slider for z-plane to show trace ellipse.

*Interactive Controls:*
  - 🎛 Slider for a from 0.5 to 5.0
  - 🎛 Slider for b from 0.5 to 5.0
  - 🎛 Slider for c from 0.5 to 5.0

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d', position=[0.1,0.2,0.7,0.7])
plt.subplots_adjust(bottom=0.25)

x = np.linspace(-5,5,50)
y = np.linspace(-5,5,50)
X,Y = np.meshgrid(x,y)

a0, b0, c0 = 2, 3, 4
def update_ellipsoid(a,b,c):
    ax.clear()
    Z_sq = c**2*(1 - X**2/a**2 - Y**2/b**2)
    Z_sq = np.maximum(Z_sq,0)
    Z = np.sqrt(Z_sq)
    ax.plot_surface(X,Y,Z, alpha=0.4, color='blue')
    ax.plot_surface(X,Y,-Z, alpha=0.4, color='blue')
    ax.set_xlim(-5,5); ax.set_ylim(-5,5); ax.set_zlim(-5,5)
    ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z')
    ax.set_title(f'Ellipsoid: a={a:.1f}, b={b:.1f}, c={c:.1f}')
    plt.draw()

update_ellipsoid(a0,b0,c0)

axcolor = 'lightgoldenrodyellow'
ax_a = plt.axes([0.2,0.1,0.6,0.03], facecolor=axcolor)
ax_b = plt.axes([0.2,0.06,0.6,0.03], facecolor=axcolor)
ax_c = plt.axes([0.2,0.02,0.6,0.03], facecolor=axcolor)

s_a = Slider(ax_a, 'a', 0.5, 5.0, valinit=a0)
s_b = Slider(ax_b, 'b', 0.5, 5.0, valinit=b0)
s_c = Slider(ax_c, 'c', 0.5, 5.0, valinit=c0)

def update(val):
    a = s_a.val
    b = s_b.val
    c = s_c.val
    update_ellipsoid(a,b,c)

s_a.on_changed(update)
s_b.on_changed(update)
s_c.on_changed(update)
plt.show()
```

**Teacher Narration** `[65w]`
> Here you can interactively change the semi-axis lengths a, b, c of an ellipsoid. Watch what happens when you make one axis much larger than the others: the ellipsoid becomes a long cigar shape. When all three are equal, you get a sphere. Notice that every horizontal slice is an ellipse – that’s a key property. Spend a moment dragging the sliders to build intuition.

**Student Prompt:** Try setting a = 5, b = 2, c = 1. Describe the shape.

---

### Slide 4 · [CORE] 🎛 *[1 controls]*
**Elliptic Paraboloid**  ·  `split_left_right`

**On-screen text** `[12w]`
Elliptic Paraboloid: bowl shape. Horizontal slices = ellipses. Vertical slices = parabolas.

**LEFT** `[formula_block]`

$$z = \frac{x^2}{a^2} + \frac{y^2}{b^2}$$

- Axis: $z$-axis (variable with first power)
- Horizontal traces: ellipses (for $z>0$)
- Vertical traces: parabolas

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of z = x^2/4 + y^2/9 for x in [-3,3], y in [-3,3]. Show surface as blue mesh. Overlay horizontal trace at z=1 (ellipse) in red. Overlay vertical trace y=0 (parabola) in green. Show axes with labels. Use plot_surface and contour. Title: 'Elliptic Paraboloid'.

*Interactive Controls:*
  - 🎛 Slider for a from 0.5 to 3 (added in next slide's lab)

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
x = np.linspace(-3,3,30)
y = np.linspace(-3,3,30)
X,Y = np.meshgrid(x,y)
Z = X**2/4 + Y**2/9
ax.plot_surface(X,Y,Z, alpha=0.5, color='blue')
# trace at z=1
ax.contour(X,Y,Z, levels=[1], colors='red', linewidths=3)
# trace y=0
x0 = np.linspace(-3,3,100)
z0 = x0**2/4
ax.plot(x0, np.zeros_like(x0), z0, 'green', lw=3)
ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z')
ax.set_title('Elliptic Paraboloid')
plt.show()
```

**Teacher Narration** `[70w]`
> The elliptic paraboloid looks like a bowl or a satellite dish. The equation z equals x squared over a squared plus y squared over b squared. Because z is alone, the axis is the z-axis. If you slice horizontally at a fixed positive z, you get an ellipse. If you slice vertically with x or y fixed, you get a parabola opening upward. This surface is symmetric about the z-axis.

---

### Slide 5 · [VISUAL_LAB] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Interactive Hyperbolic Paraboloid**  ·  `split_left_right`

**On-screen text** `[15w]`
Saddle surface: one direction curves up, the other down. Trace at z=0 gives two lines.

**LEFT** `[formula_block]`

$$z = \frac{x^2}{a^2} - \frac{y^2}{b^2}$$

- Saddle shape
- Horizontal traces: hyperbolas
- Vertical traces: parabolas (one up, one down)
- Minus sign creates the saddle.

**RIGHT** `[python_lab]`

*Visual Spec:* 3D plot of z = x^2/a^2 - y^2/b^2 with sliders for a and b. Initial a=1, b=1. Range 0.5 to 3. Show surface and trace at z=0 (two lines). Axes labels.

*Interactive Controls:*
  - 🎛 Slider for a from 0.5 to 3.0
  - 🎛 Slider for b from 0.5 to 3.0

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d', position=[0.1,0.2,0.7,0.7])
plt.subplots_adjust(bottom=0.2)

x = np.linspace(-3,3,40)
y = np.linspace(-3,3,40)
X,Y = np.meshgrid(x,y)

a0, b0 = 1, 1
def update_saddle(a,b):
    ax.clear()
    Z = X**2/a**2 - Y**2/b**2
    ax.plot_surface(X,Y,Z, alpha=0.6, cmap='coolwarm')
    ax.contour(X,Y,Z, levels=[0], colors='black', linewidths=3)
    ax.set_xlim(-3,3); ax.set_ylim(-3,3); ax.set_zlim(-3,3)
    ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z')
    ax.set_title(f'Hyperbolic Paraboloid: a={a:.1f}, b={b:.1f}')
    plt.draw()

update_saddle(a0,b0)

ax_a = plt.axes([0.2,0.1,0.6,0.03], facecolor='lightgoldenrodyellow')
ax_b = plt.axes([0.2,0.05,0.6,0.03], facecolor='lightgoldenrodyellow')
s_a = Slider(ax_a, 'a', 0.5, 3.0, valinit=a0)
s_b = Slider(ax_b, 'b', 0.5, 3.0, valinit=b0)
def update(val):
    update_saddle(s_a.val, s_b.val)
s_a.on_changed(update)
s_b.on_changed(update)
plt.show()
```

**Teacher Narration** `[80w]`
> Now we have the hyperbolic paraboloid – the saddle. The key is the minus sign: one squared term is subtracted. This creates a surface that curves upward along the x-direction and downward along the y-direction. The trace at z equals zero is two intersecting lines. Use the sliders to see how changing a and b affects the shape. Notice that vertical traces are parabolas – one opening up, one opening down. This surface is not a bowl; it’s a saddle.

**Student Prompt:** Before moving on, predict: what shape do you get if you slice the saddle with a horizontal plane at z=1? At z=-1?

---

### Slide 6 · [CORE]
**Hyperboloids: One Sheet vs Two Sheets**  ·  `full_width`

**On-screen text** `[15w]`
One sheet: connected, like a cooling tower. Two sheets: two separate bowls. Count minus signs!

**FULL WIDTH** `[text]`

| Surface | Equation | Axis | Traces |
|---------|----------|------|--------|
| **Hyperboloid of One Sheet** | $\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 1$ | $z$ | Horizontal: ellipses; Vertical: hyperbolas |
| **Hyperboloid of Two Sheets** | $-\frac{x^2}{a^2} - \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1$ | $z$ | Horizontal: ellipses only for $|z|>c$; Vertical: hyperbolas |

> The sign of the constant and the number of negative terms determine one sheet (connected) vs two sheets (separate).

**Teacher Narration** `[75w]`
> Hyperboloids come in two flavors. One sheet: the surface is connected like a cooling tower. Two sheets: you get two separate bowls, one above and one below. The key difference: in the one-sheet equation, exactly one term has a minus sign. In the two-sheet equation, two terms have minus signs. Also, for the two-sheet hyperboloid, horizontal slices only exist when |z| is larger than c. This is an important detail to remember when identifying surfaces.

---

### Slide 7 · [MISCONCEPTION]
**Common Mistake: Misidentifying Hyperboloids**  ·  `split_left_right`

**On-screen text** `[13w]`
Don't just count minus signs: find the axis first! Positive term = axis.

**LEFT** `[concept]`

**Wrong approach:** See one minus sign and immediately call it a hyperboloid of one sheet.

**Why it fails:** The equation $z^2 - x^2 - y^2 = 1$ has the positive term on $z$. This is actually **two sheets** (axis = z).

**Correct method:** Find the variable with *positive* coefficient. That's the axis. Count minus signs to decide one or two sheets.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two 3D plots side by side. Left: hyperboloid of two sheets (z^2 - x^2 - y^2 =1). Right: hyperboloid of one sheet (x^2 + y^2 - z^2 =1). Both with axes labels. Use distinct colors (red for two sheets, blue for one sheet). Title each. Show the difference visually.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
fig, (ax1, ax2) = plt.subplots(1,2, subplot_kw={'projection':'3d'}, figsize=(12,6))

# Two sheets: z^2 - x^2 - y^2 = 1 -> z = +/- sqrt(1 + x^2 + y^2)
x = np.linspace(-3,3,30)
y = np.linspace(-3,3,30)
X,Y = np.meshgrid(x,y)
Z = np.sqrt(1 + X**2 + Y**2)
ax1.plot_surface(X,Y,Z, alpha=0.6, color='red')
ax1.plot_surface(X,Y,-Z, alpha=0.6, color='red')
ax1.set_title('Two Sheets')
ax1.set_xlabel('X'); ax1.set_ylabel('Y'); ax1.set_zlabel('Z')

# One sheet: x^2 + y^2 - z^2 = 1 -> z^2 = x^2 + y^2 - 1
Z_sq = X**2 + Y**2 - 1
Z_sq = np.maximum(Z_sq,0)
Z = np.sqrt(Z_sq)
ax2.plot_surface(X,Y,Z, alpha=0.6, color='blue')
ax2.plot_surface(X,Y,-Z, alpha=0.6, color='blue')
ax2.set_title('One Sheet')
ax2.set_xlabel('X'); ax2.set_ylabel('Y'); ax2.set_zlabel('Z')
plt.show()
```

**Teacher Narration** `[90w]`
> A very common mistake: students see one minus sign and assume it's a one-sheet hyperboloid. But look at the equation carefully. In z squared minus x squared minus y squared equals 1, the z squared term is positive, meaning the axis is the z-axis. And since there are two minus signs, this is actually a hyperboloid of two sheets. The correct method is: first identify which variable has the positive coefficient – that's the axis. Then count the number of minus signs: one gives one sheet, two gives two sheets.

**Student Prompt:** Identify: Is $x^2 - y^2 - z^2 = 1$ a one-sheet or two-sheet hyperboloid? (Answer: x positive, so axis x, two minus signs → two sheets)

---

### Slide 8 · [PRACTICE]
**Example 1: Warm-Up – Cylinder**  ·  `split_left_right`

**On-screen text** `[11w]`
Missing variable? That's a cylinder! Traces are identical along that axis.

**LEFT** `[steps]`

**Problem:** Sketch $x^2 + z^2 = 4$ in $\mathbb{R}^3$.

1. Missing $y$ → cylinder parallel to $y$-axis
2. For any fixed $y=k$, the trace is $x^2 + z^2 = 4$ (circle radius 2)
3. Surface: all circles stacked along $y$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of cylinder x^2 + z^2 = 4 for y in [-2,2]. Use parametric plot: for a circle in xz-plane, extrude along y. Use plot_surface with meshgrid over theta and y. Show axes and label X, Y, Z. Title: 'Cylinder: x^2 + z^2 = 4'.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
theta = np.linspace(0, 2*np.pi, 50)
y = np.linspace(-2,2,50)
Theta, Y = np.meshgrid(theta, y)
X = 2 * np.cos(Theta)
Z = 2 * np.sin(Theta)
ax.plot_surface(X, Y, Z, alpha=0.5, color='green')
ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z')
ax.set_title('Cylinder: x^2 + z^2 = 4')
plt.show()
```

**Teacher Narration** `[78w]`
> Let's start with a warm-up. If an equation is missing a variable, the surface is a cylinder whose rulings are parallel to that axis. Here x squared plus z squared equals 4 has no y. That means no matter what y you choose, the cross-section is always the same circle. So the surface is a cylinder extending along the y-axis. This is a good reminder that when a variable is absent, the shape is uniform in that direction.

---

### Slide 9 · [PRACTICE]
**Example 2: Standard – Ellipsoid Classification**  ·  `split_left_right`

**On-screen text** `[9w]`
Divide, identify coefficients, find intercepts, sketch. Ellipsoid: all positive.

**LEFT** `[steps]`

**Problem:** Classify and sketch $4x^2 + 9y^2 + z^2 = 36$.

1. Divide by 36: $\frac{x^2}{9} + \frac{y^2}{4} + \frac{z^2}{36} = 1$
2. All coefficients positive → ellipsoid
3. Intercepts: $(\pm 3,0,0), (0,\pm 2,0), (0,0,\pm 6)$
4. Traces are ellipses

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of the ellipsoid. Show axes with ticks at intercepts. Use semi-transparent surface. Title: 'Ellipsoid: x^2/9 + y^2/4 + z^2/36 = 1'.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
x = np.linspace(-3,3,30)
y = np.linspace(-2,2,30)
X,Y = np.meshgrid(x,y)
Z_sq = 36*(1 - X**2/9 - Y**2/4)
Z_sq = np.maximum(Z_sq,0)
Z = np.sqrt(Z_sq)
ax.plot_surface(X,Y,Z, alpha=0.5, color='blue')
ax.plot_surface(X,Y,-Z, alpha=0.5, color='blue')
ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z')
ax.set_title('Ellipsoid')
plt.show()
```

**Teacher Narration** `[84w]`
> For this standard example, we first write the equation in the form with 1 on the right. After dividing by 36, we see x squared over 9 plus y squared over 4 plus z squared over 36 equals 1. All coefficients are positive, so it's an ellipsoid. The intercepts are at plus or minus 3 on the x-axis, plus or minus 2 on the y-axis, and plus or minus 6 on the z-axis. The traces are all ellipses. This is your basic ellipsoid classification.

---

### Slide 10 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Example 3: Tricky – Hyperboloid of Two Sheets**  ·  `split_left_right`

**On-screen text** `[15w]`
Axis: variable with positive coefficient. Two minus signs → two sheets. No trace for |z|<c.

**LEFT** `[steps]`

**Problem:** Identify $z^2 - 4x^2 - y^2 = 4$.

1. Divide by 4: $\frac{z^2}{4} - x^2 - \frac{y^2}{4} = 1$
2. Positive term on $z$ → axis is $z$
3. Two minus signs → hyperboloid of two sheets
4. Traces exist for $|z| > 2$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of z^2/4 - x^2 - y^2/4 = 1. Show the two sheets in different colors (top sheet red, bottom sheet blue). Show a horizontal plane at z=3 to demonstrate that a trace exists (ellipse). Use transparency. Title: 'Hyperboloid of Two Sheets'.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
x = np.linspace(-3,3,30)
y = np.linspace(-3,3,30)
X,Y = np.meshgrid(x,y)
# for z >= 2
Z = np.sqrt(4*(1 + X**2 + Y**2/4))
ax.plot_surface(X,Y,Z, alpha=0.6, color='red')
ax.plot_surface(X,Y,-Z, alpha=0.6, color='blue')
# trace at z=3
ax.contour(X,Y,Z, levels=[3], colors='green', linewidths=3)
ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z')
ax.set_title('Hyperboloid of Two Sheets')
plt.show()
```

**Teacher Narration** `[99w]`
> This problem looks simple but is often done wrong. The equation z squared minus 4x squared minus y squared equals 4. After dividing by 4, the positive term is on z, so the axis is the z-axis. There are two minus signs, so it's a hyperboloid of two sheets. Notice that horizontal slices only exist when the absolute value of z is greater than 2. Below that, the right side becomes negative and there is no real trace. This is a crucial check: if you try to take a trace at z equals 1, you'd get a negative number.

**Student Prompt:** Before we solve: Identify the surface: $9y^2 - x^2 - z^2 = 9$. (Pause and think)

---

### Slide 11 · [PRACTICE] 🟡
**Example 4: Edge Case – Degenerate Ellipsoid**  ·  `split_left_right`

**On-screen text** `[13w]`
Non-negative sum equals zero → only the origin satisfies it. A degenerate quadric.

**LEFT** `[steps]`

**Problem:** Classify $x^2 + 4y^2 + z^2 = 0$.

1. All terms non-negative, sum = 0
2. Only solution: $x=0, y=0, z=0$
3. Surface: a single point (the origin)
4. Compared to $x^2 + 4y^2 + z^2 = 1$ (standard ellipsoid), the constant zero collapses it to a point.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot with axes and a single large dot at origin, labeled (0,0,0). No surface. Axes labels X, Y, Z. Title: 'Degenerate Ellipsoid: single point'.

```python
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
ax.scatter([0],[0],[0], s=100, color='red')
ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z')
ax.set_title('Degenerate Ellipsoid: Single Point')
ax.set_xlim(-1,1); ax.set_ylim(-1,1); ax.set_zlim(-1,1)
plt.show()
```

**Teacher Narration** `[107w]`
> This is an edge case. The equation x squared plus 4y squared plus z squared equals zero. Since each term is greater than or equal to zero, the only way their sum can be zero is if each term is zero individually. That means x equals 0, y equals 0, and z equals 0. So the entire surface is just a single point at the origin. This is called a degenerate quadric surface. If the constant on the right were 1, you'd have a normal ellipsoid. But here it's zero, so it collapses to a point. This illustrates how the constant term can drastically change the surface.

---

### Slide 12 · [PRACTICE] 🟡
**Example 5: Application – Shifted Paraboloid**  ·  `split_left_right`

**On-screen text** `[17w]`
Complete the square to find the shift. Vertex at (1, -2, 0) – elliptic paraboloid opening up.

**LEFT** `[steps]`

**Problem:** Identify $x^2 + y^2 - 2x + 4y - z + 5 = 0$.

1. Complete squares: $(x-1)^2 + (y+2)^2 - z = 0$
2. Solve for $z$: $z = (x-1)^2 + (y+2)^2$
3. This is an elliptic paraboloid with vertex at $(1, -2, 0)$ opening upward.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of z = (x-1)^2 + (y+2)^2. Show surface, mark vertex with a red dot at (1,-2,0). Axes labels. Title: 'Shifted Elliptic Paraboloid'.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
x = np.linspace(-2,4,30)
y = np.linspace(-5,1,30)
X,Y = np.meshgrid(x,y)
Z = (X-1)**2 + (Y+2)**2
ax.plot_surface(X,Y,Z, alpha=0.6, color='orange')
ax.scatter([1],[-2],[0], color='red', s=100)
ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z')
ax.set_title('Shifted Elliptic Paraboloid')
plt.show()
```

**Teacher Narration** `[84w]`
> Real-world problems rarely come in standard forms. Here we have an equation with linear terms in x and y. By completing the square for both x and y, we rewrite it as z equals x minus 1 squared plus y plus 2 squared. That's the standard equation of an elliptic paraboloid, but shifted so the vertex is at (1, -2, 0) instead of the origin. This is a powerful technique: whenever you see mixed linear and quadratic terms, completing the square reveals the translation.

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof: Traces Are Conic Sections**  ·  `full_width`

**On-screen text** `[17w]`
Set z=k → 2D equation in x,y. Always quadratic → conic section. The constant k controls existence.

**FULL WIDTH** `[text]`

For an ellipsoid $\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1$, set $z=k$:

1. $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 - \frac{k^2}{c^2}$
2. If $|k|<c$, RHS positive → ellipse
3. If $|k|=c$, RHS = 0 → single point (degenerate)
4. If $|k|>c$, RHS negative → no real trace

> General principle: substituting a constant into a second-degree 3D equation always yields a second-degree 2D equation, i.e., a conic section.

**Teacher Narration** `[84w]`
> For those who want a deeper look: why are traces always conic sections? Because the original equation is quadratic in x, y, z. When we fix one variable, say z equals k, we get a quadratic equation in x and y. In 2D, a quadratic equation always represents a conic section – ellipse, parabola, hyperbola, or degenerate cases. For the ellipsoid, the constant determines whether the trace is an ellipse, a point, or nothing at all. This same reasoning works for every quadric surface.

---

### Slide 14 · [SUMMARY]
**Summary: Six Basic Quadric Surfaces**  ·  `full_width`

**On-screen text** `[12w]`
Six surfaces. Master traces, identifying axis, and completing squares. You've got this!

**FULL WIDTH** `[text]`

| Surface | Equation | Axis | Horizontal Traces |
|---------|----------|------|-------------------|
| Ellipsoid | $\frac{x^2}{a^2}+\frac{y^2}{b^2}+\frac{z^2}{c^2}=1$ | any | ellipses |
| Elliptic Paraboloid | $z=\frac{x^2}{a^2}+\frac{y^2}{b^2}$ | $z$ | ellipses ($z>0$) |
| Hyperbolic Paraboloid | $z=\frac{x^2}{a^2}-\frac{y^2}{b^2}$ | $z$ | hyperbolas |
| Elliptic Cone | $\frac{z^2}{c^2}=\frac{x^2}{a^2}+\frac{y^2}{b^2}$ | $z$ | ellipses |
| Hyperboloid of One Sheet | $\frac{x^2}{a^2}+\frac{y^2}{b^2}-\frac{z^2}{c^2}=1$ | $z$ | ellipses |
| Hyperboloid of Two Sheets | $-\frac{x^2}{a^2}-\frac{y^2}{b^2}+\frac{z^2}{c^2}=1$ | $z$ | ellipses (for $|z|>c$) |

**Key Skills:** Use traces, complete the square, identify axis by positive term.

**Teacher Narration** `[69w]`
> Let's quickly recap. We have six basic quadric surfaces: ellipsoid, elliptic paraboloid, hyperbolic paraboloid, cone, and two types of hyperboloids. The key tools are: using traces to understand the shape, identifying the axis by finding the variable with the positive coefficient, and completing the square to handle shifts. Practice with the examples we did, and you'll be able to classify any quadric surface you encounter. Thank you for watching!

---
