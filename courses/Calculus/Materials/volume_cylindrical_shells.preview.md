# Volume by Cylindrical Shells

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You should already know how to set up disk/washer integrals for solids of revolution.

**Learning Objectives:**
- Calculate volumes of solids of revolution using the cylindrical shell method
- Determine when to use shells versus washers/disks based on the axis of rotation and region shape
- Apply the shell method to rotations about vertical lines other than the y‑axis
- Analyze complex regions where solving for the opposite variable is difficult or impossible
- Set up integrals for rotation about the x‑axis using shells with the appropriate variable

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 88w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 15 slides (target 12–18)
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
| 1 | 🎛hook | 🟢 | ◧ |  | 102w | 16w | Why Another Method? |
| 2 | 🎛core | 🟢 | ◧ | ⏸️ | 108w | 16w | Intuition & Metaphor |
| 3 | 🎛core | 🟢 | ◧ |  | 88w | 9w | Shell Formula – Rotation About the y‑axis |
| 4 | practice | 🟢 | ⬛⬛ | ⏸️ | 82w | 7w | Example 1: Warm‑Up |
| 5 | 🎛core | 🟢 | ◧ |  | 99w | 9w | Shell Formula – Rotation About the x‑axis |
| 6 | practice | 🟢 | ◧ |  | 88w | 9w | Example 2: Standard |
| 7 | misconception | 🟢 | ◧ | ⏸️ | 92w | 14w | Common Mistake: Radius ≠ x Always |
| 8 | practice | 🟡 | ⬛⬛ |  | 101w | 7w | Example 3: Tricky (Rotation about x=2) |
| 9 | practice | 🟡 | ◧ |  | 75w | 9w | Example 4: Edge Case – Rotation About x‑axis |
| 10 | 🎛visual_lab | 🟢 | ◧ |  | 66w | 9w | Interactive: Build a Shell |
| 11 | 🎛challenge | 🔴 | ◧ |  | 73w | 10w | [Challenge – Optional] Proof of the Shell Formula |
| 12 | practice | 🟡 | ⬛⬛ | ⏸️ | 96w | 7w | Example 5: Application – Where Shells Beat Washers |
| 13 | core | 🟢 | ◧ |  | 77w | 17w | Shells vs Washers: Decision Guide |
| 14 | core | 🟢 | ◧ |  | 80w | 13w | Pro Tips & Common Traps |
| 15 | summary | 🟢 | ⬛⬛ |  | 87w | 13w | What You Should Know |

---

### Slide 1 · [HOOK] 🎛 *[3 controls]*
**Why Another Method?**  ·  `split_left_right`

**On-screen text** `[16w]`
If solving for x in terms of y is hard, try slicing parallel to the axis.

**LEFT** `[text]`

Sometimes slicing perpendicular to the axis of rotation forces you to solve a difficult equation. The shell method slices **parallel** to the axis, creating thin cylindrical layers—like unrolling a paper towel.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a 3D cylindrical shell with inner radius r_inner, outer radius r_outer, and height h. Use mpl_toolkits.mplot3d. Show a semi-transparent blue inner cylinder, red outer cylinder, and green top/bottom rings. Label the radius and height. Title: 'Cylindrical Shell: a thin layer'.

*Interactive Controls:*
  - 🎛 Slider for inner radius from 0.5 to 3.0
  - 🎛 Slider for outer radius from inner+0.1 to 4.0
  - 🎛 Slider for height from 0.5 to 5.0

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')

r_inner = 1.0
r_outer = 1.3
height = 2.0
theta = np.linspace(0, 2*np.pi, 100)

# Inner cylinder
x_in = r_inner * np.outer(np.cos(theta), np.ones(2))
y_in = r_inner * np.outer(np.sin(theta), np.ones(2))
z_in = np.outer(np.ones(100), [0, height])
ax.plot_surface(x_in, y_in, z_in, alpha=0.4, color='blue')

# Outer cylinder
x_out = r_outer * np.outer(np.cos(theta), np.ones(2))
y_out = r_outer * np.outer(np.sin(theta), np.ones(2))
z_out = np.outer(np.ones(100), [0, height])
ax.plot_surface(x_out, y_out, z_out, alpha=0.4, color='red')

# Rings
theta_ring = np.linspace(0, 2*np.pi, 50)
for z_level in [0, height]:
    x_ring = np.linspace(r_inner, r_outer, 20)
    T, R = np.meshgrid(theta_ring, x_ring)
    X = R * np.cos(T)
    Y = R * np.sin(T)
    Z = z_level * np.ones_like(X)
    ax.plot_surface(X, Y, Z, alpha=0.3, color='green')

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('Cylindrical Shell (r_inner=1, r_outer=1.3, h=2)')
plt.show()
```

**Teacher Narration** `[102w]`
> Welcome. So far you have used disks and washers to find volumes of revolution. That method works great when you can slice perpendicular to the axis. But what if the region is defined by a function that is difficult to invert? For example the cubic y equals 2x squared minus x cubed. Today we learn a clever alternative: the cylindrical shell method. Think of a roll of paper towels. Each layer is a thin cylindrical shell. The volume of the whole roll is just the sum of the volumes of those shells. That simple idea is the key to our new technique.

---

### Slide 2 · [CORE] ⏸️ *[YouTube Pause]* 🎛 *[3 controls]*
**Intuition & Metaphor**  ·  `split_left_right`

**On-screen text** `[16w]`
Volume of one shell ≈ (circumference) × height × thickness = 2πx · f(x) · Δx

**LEFT** `[concept]`

Take a vertical strip of width $\Delta x$ at position $x$. Rotating it about the y‑axis sweeps out a thin cylindrical shell.
- **Radius** = $x$
- **Height** = $f(x)$
- **Thickness** = $\Delta x$
The shell's volume is approximately $2\pi x \, f(x) \, \Delta x$.

**RIGHT** `[visual_spec]`

*Visual Spec:* 2D plot of a region under y=f(x) with a thin vertical strip shaded. Then an arrow showing rotation about y-axis. Next to it, a 3D sketch of a single cylindrical shell from that strip. Use different colors for radius, height, thickness.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50
  - 🎛 Toggle: show/hide error band
  - 🎛 Button: reveal next step

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 2, 400)
y = x**2

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10,4))

# Left: region with strip
ax1.fill_between(x, y, alpha=0.2)
ax1.plot(x, y, 'b', lw=2)
ax1.axvline(1.2, color='red', lw=3, label='strip at x=1.2')
ax1.set_xlim(0,2)
ax1.set_ylim(0,4)
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.legend()
ax1.set_title('Region with a vertical strip')

# Right: shell representation (3D in 2D schematic)
# We'll just show a rectangle labeled as 'unrolled shell'
rect = plt.Rectangle((0.5,0.5), 2.4, 1.44, edgecolor='red', facecolor='none', lw=2)
ax2.add_patch(rect)
ax2.text(1.7, 1.2, 'circumference = 2πr', ha='center')
ax2.text(1.7, 0.3, 'height = f(x)', ha='center')
ax2.set_xlim(0,3)
ax2.set_ylim(0,3)
ax2.set_aspect('equal')
ax2.set_title('Unrolled shell')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[108w]`
> Imagine a thin vertical strip under the curve. When it rotates around the y-axis, it traces out a cylinder with no top or bottom—a shell. The radius of that shell is the x-coordinate of the strip, the height is the function value, and the thickness is the width of the strip. If we slice that shell open and lay it flat, we get a rectangular sheet. The length of that rectangle is the circumference 2πx, the width is the height f(x), and the thickness is Δx. So the volume of that one shell is just length times width times thickness. That is the heart of the shell method.

**Student Prompt:** Pause and sketch: Imagine a vertical strip at x=0.8 under y = x². What are the radius, height, and approximate volume of the shell it sweeps out?

---

### Slide 3 · [CORE] 🎛 *[3 controls]*
**Shell Formula – Rotation About the y‑axis**  ·  `split_left_right`

**On-screen text** `[9w]`
$V = 2\pi \int_a^b x \, f(x) \, dx$

**LEFT** `[formula_block]`

$$V = 2\pi \int_{a}^{b} \, (\text{radius}) \cdot (\text{height}) \, dx$$

where radius = $x$ (distance from y‑axis) and height = $f(x)$ (top − bottom).

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a region under y=f(x) from x=a to x=b. Highlight one thin vertical strip at position x. Show an arrow indicating rotation about y-axis. Inset: a magnified cylindrical shell with radius x, height f(x), thickness dx. Use color coding: radius in blue, height in red, thickness in green.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50
  - 🎛 Toggle: show/hide error band
  - 🎛 Button: reveal next step

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 2, 400)
y = x**2

fig, ax = plt.subplots(figsize=(8,5))
ax.fill_between(x, y, alpha=0.2, label='region')
ax.plot(x, y, 'b', lw=2)
ax.axvline(1.2, color='red', lw=2, linestyle='--', label='strip at x')
ax.annotate('', xy=(1.2,0), xytext=(0,0), arrowprops=dict(arrowstyle='<->', color='blue'), label='radius x')
ax.text(0.6, -0.3, 'radius = x', color='blue', fontsize=12)
ax.annotate('', xy=(1.2,0), xytext=(1.2,1.44), arrowprops=dict(arrowstyle='<->', color='red'))
ax.text(1.3, 0.7, 'height = f(x)', color='red', fontsize=12, rotation=90)
ax.set_xlim(0,2.5)
ax.set_ylim(-0.5,4)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('One shell: radius x, height f(x)')
ax.legend()
plt.show()
```

**Teacher Narration** `[88w]`
> By adding up all the thin shells from the innermost radius a to the outermost radius b, we get the total volume. The factor 2π comes from the circumference of each shell. So the shell method formula is V equals 2π times the integral of radius times height. For rotation about the y-axis, the radius is simply x, and the height is the function f(x). Notice we integrate with respect to x—no need to solve for x in terms of y. That is the power of this method.

---

### Slide 4 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Example 1: Warm‑Up**  ·  `full_width`

**On-screen text** `[7w]`
$V = 2\pi \int_0^1 x(x^2)\,dx = \frac{\pi}{2}$

**FULL WIDTH** `[steps]`

**Problem:** Rotate the region bounded by $y=x^2$, $y=0$, $x=0$, $x=1$ about the y‑axis.

| Step | Action |
|------|--------|
| 1 | Bounds: $x=0$ to $x=1$ |
| 2 | Radius = $x$, Height = $x^2$ |
| 3 | $V = 2\pi \int_0^1 x \cdot x^2 \, dx = 2\pi \int_0^1 x^3 \, dx$ |
| 4 | $V = 2\pi \left[\frac{x^4}{4}\right]_0^1 = \frac{\pi}{2}$ |

**Teacher Narration** `[82w]`
> Let's try a simple example. The region is a parabola under the curve from x equals 0 to 1. Radius is x, height is x squared. The integral simplifies to 2π times the integral of x cubed from 0 to 1. Antiderivative is x to the fourth over 4, evaluate from 0 to 1 gives one quarter, times 2π gives pi over 2. That's the volume of the solid. Notice we never had to rewrite the function. That's the beauty of shells.

**Student Prompt:** Before we reveal the answer, try setting up the integral yourself.

---

### Slide 5 · [CORE] 🎛 *[3 controls]*
**Shell Formula – Rotation About the x‑axis**  ·  `split_left_right`

**On-screen text** `[9w]`
$V = 2\pi \int_c^d y \, g(y) \, dy$

**LEFT** `[formula_block]`

$$V = 2\pi \int_{c}^{d} \, (\text{radius}) \cdot (\text{height}) \, dy$$

Now radius = $y$ (distance from x‑axis) and height = $g(y)$ (right − left).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of a region bounded by x = g(y). Show a thin horizontal strip at height y, with arrows showing rotation about the x-axis. Inset: cylindrical shell with radius y, height expressed in y, thickness dy.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50
  - 🎛 Toggle: show/hide error band
  - 🎛 Button: reveal next step

```python
import numpy as np
import matplotlib.pyplot as plt

y = np.linspace(0, 2, 400)
x = y**2

fig, ax = plt.subplots(figsize=(8,5))
ax.fill_betweenx(y, 0, x, alpha=0.2, label='region')
ax.plot(x, y, 'b', lw=2)
ax.axhline(1.2, color='red', lw=2, linestyle='--', label='strip at y')
ax.annotate('', xy=(0,1.2), xytext=(0,0), arrowprops=dict(arrowstyle='<->', color='blue'))
ax.text(0.2, 0.6, 'radius = y', color='blue', fontsize=12)
ax.annotate('', xy=(0,1.2), xytext=(1.44,1.2), arrowprops=dict(arrowstyle='<->', color='red'))
ax.text(0.7, 1.3, 'height = g(y)', color='red', fontsize=12)
ax.set_xlim(-0.5,4)
ax.set_ylim(-0.5,2.5)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Rotation about x‑axis: horizontal shell')
ax.legend()
plt.show()
```

**Teacher Narration** `[99w]`
> What if we rotate the region around the x-axis instead? Then the shells are horizontal. The radius becomes the vertical distance from the x-axis, which is y. The height is now measured horizontally from the curve to the y-axis, so we need the function expressed as x equals something in terms of y. We integrate with respect to y from the lowest y to the highest y. The formula looks similar: V equals 2π times the integral of y times g(y) dy. Always remember: the variable of integration matches the axis direction—dx for y‑axis rotation, dy for x‑axis rotation.

---

### Slide 6 · [PRACTICE]
**Example 2: Standard**  ·  `split_left_right`

**On-screen text** `[9w]`
$V = 2\pi \int_1^2 x \cdot \frac{1}{x}\,dx = 2\pi(2-1)=2\pi$

**LEFT** `[steps]`

**Problem:** Rotate the region bounded by $y = \frac{1}{x}$, $y=0$, $x=1$, $x=2$ about the y‑axis.

1. Bounds: $x=1$ to $x=2$
2. Radius = $x$, Height = $\frac{1}{x}$
3. $V = 2\pi \int_1^2 x \cdot \frac{1}{x}\,dx = 2\pi \int_1^2 1\,dx$
4. $V = 2\pi [x]_1^2 = 2\pi$

**RIGHT** `[visual_spec]`

*Visual Spec:* 2D plot of y=1/x from x=1 to 2. Shade region. Indicate a representative vertical strip at some x. Show that height times radius simplifies to constant 1. Side note: comparison with washer method would require solving x=1/y.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0.5, 2.5, 400)
y = 1/x

fig, ax = plt.subplots(figsize=(6,5))
ax.fill_between(x, y, 0, where=(x>=1)&(x<=2), alpha=0.2, label='region')
ax.plot(x, y, 'b', lw=2)
ax.axvline(1.4, color='red', lw=2, linestyle='--', label='strip at x=1.4')
ax.set_xlim(0.5,2.5)
ax.set_ylim(0,2)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('y = 1/x, x in [1,2]')
ax.legend()
plt.show()
```

**Teacher Narration** `[88w]`
> Here we have the hyperbola y equals 1 over x from x equals 1 to 2. Radius is x, height is 1 over x. The product x times 1 over x is just 1! So the integral reduces to 2π times the length of the interval. The volume is 2π. Try to set up the washer method for the same region—you would need to solve for x as 1 over y, then integrate with respect to y. That is doable here, but the shell method is much simpler.

**Student Prompt:** How would you set up the washer integral for this same region?

---

### Slide 7 · [MISCONCEPTION] ⏸️ *[YouTube Pause]*
**Common Mistake: Radius ≠ x Always**  ·  `split_left_right`

**On-screen text** `[14w]`
Radius = distance from **axis of rotation** to the shell. Not always the x-coordinate.

**LEFT** `[concept]`

**Wrong approach:** Using radius = $x$ when rotating about $x=2$.

**Correct:** radius = $|x - \text{axis}| = |x-2|$.

For the region $y = x - x^2$ from $x=0$ to $1$, radius = $2 - x$ (since $x \le 2$).

**RIGHT** `[visual_spec]`

*Visual Spec:* 2D plot of region y=x-x^2. Show the axis x=2 as a vertical dashed line. Mark a strip at x=1.2. Show incorrect radius arrow from axis to strip (length 1.2) and correct radius (length 0.8). Label both. Use red for wrong, green for correct.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 2.5, 400)
y = lambda x: x - x**2

fig, ax = plt.subplots(figsize=(7,5))
ax.axvline(2, color='grey', linestyle='--', lw=2, label='axis x=2')
x_vals = np.linspace(0,1,100)
ax.fill_between(x_vals, y(x_vals), 0, alpha=0.2, label='region')
ax.plot(x, y(x), 'b', lw=2)
# strip at x=1.2
ax.axvline(1.2, color='orange', lw=2, label='strip at x=1.2')
# wrong radius: from (0,0) to (1.2,0)
ax.annotate('', xy=(1.2,0.1), xytext=(0,0.1), arrowprops=dict(arrowstyle='<->', color='red', lw=2))
ax.text(0.6, 0.15, 'wrong: x=1.2', color='red', fontsize=10)
# correct radius: from (1.2,0) to (2,0)
ax.annotate('', xy=(2,0.1), xytext=(1.2,0.1), arrowprops=dict(arrowstyle='<->', color='green', lw=2))
ax.text(1.6, 0.15, 'correct: 2-x=0.8', color='green', fontsize=10)
ax.set_xlim(0,2.5)
ax.set_ylim(-0.2,0.5)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Mistake: using x as radius when axis is at x=2')
ax.legend()
plt.show()
```

**Teacher Narration** `[92w]`
> A very common mistake is to assume the radius is always the x coordinate. That's only true when the axis is the y-axis. Suppose we rotate around the line x equals 2. The radius is the distance from that line to your shell. If your shell is at x equals 1.2, the distance to the line x equals 2 is 0.8, not 1.2. So always ask: what is the axis? Then radius equals absolute value of x minus the axis value. For regions left of the axis, that is axis minus x.

**Student Prompt:** Pause: For a strip at x=0.5 when rotating about x=2, what is the radius?

---

### Slide 8 · [PRACTICE] 🟡
**Example 3: Tricky (Rotation about x=2)**  ·  `full_width`

**On-screen text** `[7w]`
$V = 2\pi \int_0^1 (2-x)(x-x^2)\,dx = \frac{\pi}{2}$

**FULL WIDTH** `[steps]`

**Problem:** Rotate region under $y = x - x^2$ from $x=0$ to $1$ about $x=2$.

| Step | Action |
|------|--------|
| 1 | Intersection: $x-x^2=0 \rightarrow x=0,1$ |
| 2 | Radius = $2 - x$ (since $x \le 2$) |
| 3 | Height = $x - x^2$ |
| 4 | $V = 2\pi \int_0^1 (2-x)(x-x^2)\,dx$ |
| 5 | Expand: $2x - 3x^2 + x^3$ |
| 6 | Integrate: $V = 2\pi \left[ x^2 - x^3 + \frac{x^4}{4} \right]_0^1 = \frac{\pi}{2}$ |

**Teacher Narration** `[101w]`
> Now let's apply the correct radius to a full problem. The region is a simple parabola from 0 to 1. The axis is at x equals 2. We set radius as 2 minus x, height as x minus x squared. Multiply them, expand, integrate term by term. The antiderivative is x squared minus x cubed plus x to the fourth over 4. Evaluate from 0 to 1 gives 1 minus 1 plus one quarter equals one quarter. Multiply by 2π gives pi over 2. Notice that the volume is the same as our warm-up example—interesting coincidence, but the shells are different.

---

### Slide 9 · [PRACTICE] 🟡
**Example 4: Edge Case – Rotation About x‑axis**  ·  `split_left_right`

**On-screen text** `[9w]`
$V = 2\pi \int_0^1 y \cdot y^2\,dy = \frac{\pi}{2}$

**LEFT** `[steps]`

**Problem:** Rotate region under $y = \sqrt{x}$ from $x=0$ to $1$ about the x‑axis.

1. Rewrite: $x = y^2$ 
2. Bounds: $y=0$ to $y=1$
3. Radius = $y$, Height = $y^2$
4. $V = 2\pi \int_0^1 y \cdot y^2\,dy = 2\pi \int_0^1 y^3\,dy = \frac{\pi}{2}$

**RIGHT** `[visual_spec]`

*Visual Spec:* 2D plot of x=y^2. Shade region. Show a thin horizontal strip at y=0.7. Animate rotation about x-axis? Not needed. Show horizontal strip as a rectangle when unrolled. Label radius (vertical) and height (horizontal).

```python
import numpy as np
import matplotlib.pyplot as plt

y = np.linspace(0, 1.2, 400)
x = y**2

fig, ax = plt.subplots(figsize=(6,5))
ax.fill_betweenx(y, 0, x, where=(y>=0)&(y<=1), alpha=0.2, label='region')
ax.plot(x, y, 'b', lw=2)
ax.axhline(0.7, color='red', lw=2, linestyle='--', label='strip at y=0.7')
ax.annotate('', xy=(0,0), xytext=(0,0.7), arrowprops=dict(arrowstyle='<->', color='blue'))
ax.text(0.1, 0.35, 'radius = y', color='blue', fontsize=12)
ax.annotate('', xy=(0,0.7), xytext=(0.49,0.7), arrowprops=dict(arrowstyle='<->', color='red'))
ax.text(0.25, 0.75, 'height = y^2', color='red', fontsize=12)
ax.set_xlim(-0.1,1.5)
ax.set_ylim(-0.1,1.3)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Rotation about x‑axis: horizontal shell')
ax.legend()
plt.show()
```

**Teacher Narration** `[75w]`
> Here is a rotation about the x-axis using shells. We first rewrite y equals square root of x as x equals y squared. Now the bounds are from y equals 0 to 1. The radius is y, the height is y squared. The integral is 2π times the integral of y cubed dy, giving pi over 2 again. This example highlights that when rotating about the x-axis, you must express functions in terms of y.

**Student Prompt:** Why did we need to rewrite the function? What happens if we try to use dx?

---

### Slide 10 · [VISUAL_LAB] 🎛 *[3 controls]*
**Interactive: Build a Shell**  ·  `split_left_right`

**On-screen text** `[9w]`
Adjust the sliders. For thin shells, volume ≈ 2πrhΔr.

**LEFT** `[text]`

Adjust the inner radius $r_1$, outer radius $r_2$, and height $h$ of a cylindrical shell. Watch how its volume changes.

$V = \pi(r_2^2 - r_1^2)h$ (difference of two cylinders)

But the shell formula gives: $V \approx 2\pi r \, h \, \Delta r$ for thin shells.

**RIGHT** `[python_lab]`

*Visual Spec:* 3D plot of a cylindrical shell with sliders for inner radius (0.5 to 3), outer radius (inner+0.1 to 4), height (0.5 to 5). Display volume value. Use matplotlib.widgets.Slider.

*Interactive Controls:*
  - 🎛 Slider for inner radius from 0.5 to 3.0
  - 🎛 Slider for outer radius from inner+0.1 to 4.0
  - 🎛 Slider for height from 0.5 to 5.0

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider

def update(val):
    r_in = slider_in.val
    r_out = slider_out.val
    h = slider_h.val
    ax.cla()
    # draw shell
    theta = np.linspace(0, 2*np.pi, 100)
    # inner cylinder
    x_in = r_in * np.outer(np.cos(theta), np.ones(2))
    y_in = r_in * np.outer(np.sin(theta), np.ones(2))
    z_in = np.outer(np.ones(100), [0, h])
    ax.plot_surface(x_in, y_in, z_in, alpha=0.4, color='blue')
    # outer cylinder
    x_out = r_out * np.outer(np.cos(theta), np.ones(2))
    y_out = r_out * np.outer(np.sin(theta), np.ones(2))
    z_out = np.outer(np.ones(100), [0, h])
    ax.plot_surface(x_out, y_out, z_out, alpha=0.4, color='red')
    # top and bottom rings
    theta_ring = np.linspace(0, 2*np.pi, 50)
    for z_level in [0, h]:
        radii = np.linspace(r_in, r_out, 20)
        T, R = np.meshgrid(theta_ring, radii)
        X = R * np.cos(T)
        Y = R * np.sin(T)
        Z = z_level * np.ones_like(X)
        ax.plot_surface(X, Y, Z, alpha=0.3, color='green')
    volume = np.pi * (r_out**2 - r_in**2) * h
    ax.set_xlim(-5,5)
    ax.set_ylim(-5,5)
    ax.set_zlim(0,6)
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    ax.set_title(f'Cylindrical Shell\nVolume = {volume:.2f}')
    fig.canvas.draw_idle()

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d')
plt.subplots_adjust(bottom=0.3)

r_in_init, r_out_init, h_init = 1.0, 1.5, 2.0

ax_slider_in = plt.axes([0.2, 0.2, 0.6, 0.03])
slider_in = Slider(ax_slider_in, 'Inner radius', 0.5, 3.0, valinit=r_in_init, valstep=0.1)
ax_slider_out = plt.axes([0.2, 0.15, 0.6, 0.03])
slider_out = Slider(ax_slider_out, 'Outer radius', 0.6, 4.0, valinit=r_out_init, valstep=0.1)
ax_slider_h = plt.axes([0.2, 0.1, 0.6, 0.03])
slider_h = Slider(ax_slider_h, 'Height', 0.5, 5.0, valinit=h_init, valstep=0.1)

slider_in.on_changed(update)
slider_out.on_changed(update)
slider_h.on_changed(update)

update(None)
plt.show()
```

**Teacher Narration** `[66w]`
> Let's play with a physical shell. You can adjust the inner radius, outer radius, and height. The volume displayed is the exact volume from the difference of two cylinders. When the shell is very thin, the volume is approximately 2π times the average radius times height times thickness. That approximation becomes exact in the limit—that's the integral. Use the sliders to see how the shape changes.

**Student Prompt:** Set the inner radius to 1, outer radius to 1.1, and height to 2. Compare the exact volume with 2π*1*2*0.1. How close are they?

---

### Slide 11 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Proof of the Shell Formula**  ·  `split_left_right`

**On-screen text** `[10w]`
Proof sketch: Riemann sum of shell volumes → definite integral.

**LEFT** `[steps]`

**Riemann sum derivation:**

1. Partition $[a,b]$ into $n$ subintervals of width $\Delta x$.
2. Sample point $x_i^*$ in the $i$-th subinterval.
3. Shell volume ≈ $2\pi x_i^* f(x_i^*) \Delta x$.
4. Sum: $\sum_{i=1}^n 2\pi x_i^* f(x_i^*) \Delta x$.
5. As $n \to \infty$, $\Delta x \to 0$, sum → $2\pi \int_a^b x f(x)\,dx$.

**RIGHT** `[visual_spec]`

*Visual Spec:* 2D plot of a region with many thin vertical strips. Show the corresponding shells as concentric rings in 3D (optional). Use bar chart of shell volumes as Riemann sum. Animate adding more shells.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50 (to animate increasing number of shells)

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 2, 400)
y = x**2

def riemann_shells(n):
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12,4))
    # left: region with shells
    ax1.fill_between(x, y, alpha=0.1, label='region')
    ax1.plot(x, y, 'b', lw=2)
    a, b = 0, 2
    dx = (b-a)/n
    x_edges = np.linspace(a, b, n+1)
    volumes = []
    for i in range(n):
        xi = (x_edges[i] + x_edges[i+1]) / 2
        hi = xi**2
        vol = 2*np.pi * xi * hi * dx
        volumes.append(vol)
        # draw rectangle representing the shell's cross-section area (circumference * height)
        # but here we just show rectangle representing the unrolled shell area
        ax1.add_patch(plt.Rectangle((x_edges[i], 0), dx, hi, alpha=0.3, edgecolor='red'))
    ax1.set_xlim(0,2.2)
    ax1.set_ylim(0,4.5)
    ax1.set_xlabel('x')
    ax1.set_ylabel('y')
    ax1.set_title(f'Shells: n={n}')
    # right: bar chart of shell volumes
    colors = plt.cm.viridis(np.linspace(0,1,n))
    ax2.bar(range(n), volumes, color=colors, edgecolor='k')
    ax2.set_xlabel('Shell index')
    ax2.set_ylabel('Volume')
    ax2.set_title('Individual shell volumes')
    plt.tight_layout()
    plt.show()

riemann_shells(10)
```

**Teacher Narration** `[73w]`
> For those who want a more rigorous derivation, here is the Riemann sum argument. We divide the x-interval into n pieces, pick a sample point in each, and approximate the volume of that shell as 2π times radius times height times thickness. Adding them up and taking the limit gives the integral. This is exactly the same process we used for disks and washers, but now the slices are parallel to the axis.

**Student Prompt:** Why does the factor 2π appear?

---

### Slide 12 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Example 5: Application – Where Shells Beat Washers**  ·  `full_width`

**On-screen text** `[7w]`
$V = 2\pi \int_0^2 x(2x^2-x^3)\,dx = \frac{16\pi}{5}$

**FULL WIDTH** `[steps]`

**Problem:** Rotate region under $y = 2x^2 - x^3$ from $x=0$ to $2$ about the y‑axis.

| Step | Action |
|------|--------|
| 1 | Intercepts: $x^2(2-x)=0 \rightarrow x=0,2$ |
| 2 | Radius = $x$, Height = $2x^2 - x^3$ |
| 3 | $V = 2\pi \int_0^2 x(2x^2 - x^3)\,dx = 2\pi \int_0^2 (2x^3 - x^4)\,dx$ |
| 4 | $V = 2\pi \left[ \frac{x^4}{2} - \frac{x^5}{5} \right]_0^2 = 2\pi(8 - \frac{32}{5}) = \frac{16\pi}{5}$ |

**Why shells?** Washers would require solving $y=2x^2-x^3$ for $x$ in terms of $y$ – a cubic that is messy.

**Teacher Narration** `[96w]`
> This is the classic example from Stewart's calculus. The region is under a cubic from 0 to 2. If we tried to use washers, we would need to solve for x in terms of y – that means solving a cubic equation, which is doable but not fun. With shells, we keep x as the variable and integrate directly. The set-up is straightforward: radius x, height the cubic. The integral simplifies to 2x cubed minus x to the fourth, easy to integrate. The answer is 16π over 5. This is the power of the shell method.

**Student Prompt:** Before seeing the solution, try setting up the integral yourself. How would you set up a washer integral? Why is it harder?

---

### Slide 13 · [CORE]
**Shells vs Washers: Decision Guide**  ·  `split_left_right`

**On-screen text** `[17w]`
Shells: slice parallel to axis. Washers: slice perpendicular. Choose the one that avoids solving a difficult equation.

**LEFT** `[concept]`

| Situation | Preferred Method |
|-----------|------------------|
| Rotation about y‑axis, region defined by $y=f(x)$ | Shells (use $dx$) |
| Rotation about y‑axis, region defined by $x=g(y)$ | Washers (use $dy$) |
| Rotation about x‑axis, region defined by $x=g(y)$ | Shells (use $dy$) |
| Rotation about x‑axis, region defined by $y=f(x)$ | Washers (use $dx$) |

**Tip:** If you can easily express the region in terms of the variable perpendicular to the axis, use washers. Otherwise, use shells.

**RIGHT** `[visual_spec]`

*Visual Spec:* Flowchart: Start -> Rotating about y-axis? -> Yes: Can you solve for x in terms of y easily? -> If yes: Washers; If no: Shells. -> Rotating about x-axis? -> Yes: Can you solve for y in terms of x easily? -> If yes: Washers; If no: Shells. Use boxes and arrows.

```python
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, ax = plt.subplots(figsize=(8,6))
ax.axis('off')

# nodes
nodes = {
    'start': (0.5, 0.9, 'Axis?'),
    'yaxis': (0.3, 0.7, 'Rotating about y-axis?'),
    'xaxis': (0.7, 0.7, 'Rotating about x-axis?'),
    'y_easy': (0.2, 0.5, 'Solve x in y easily?'),
    'x_easy': (0.8, 0.5, 'Solve y in x easily?'),
    'shell_y': (0.2, 0.3, 'Use Shells (dx)'),
    'washer_y': (0.4, 0.3, 'Use Washers (dy)'),
    'shell_x': (0.8, 0.3, 'Use Shells (dy)'),
    'washer_x': (0.6, 0.3, 'Use Washers (dx)')
}

for name, (x, y, text) in nodes.items():
    ax.text(x, y, text, ha='center', va='center', fontsize=10,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightblue', edgecolor='black'))

# arrows
ax.annotate('', xy=(0.3,0.72), xytext=(0.5,0.88), arrowprops=dict(arrowstyle='->', lw=2))
ax.annotate('', xy=(0.7,0.72), xytext=(0.5,0.88), arrowprops=dict(arrowstyle='->', lw=2))
ax.annotate('', xy=(0.2,0.52), xytext=(0.3,0.68), arrowprops=dict(arrowstyle='->', lw=2))
ax.annotate('', xy=(0.8,0.52), xytext=(0.7,0.68), arrowprops=dict(arrowstyle='->', lw=2))
ax.annotate('', xy=(0.2,0.32), xytext=(0.2,0.48), arrowprops=dict(arrowstyle='->', lw=2, color='g'))
ax.annotate('Yes', xy=(0.2,0.4), fontsize=8, color='g')
ax.annotate('', xy=(0.4,0.32), xytext=(0.2,0.48), arrowprops=dict(arrowstyle='->', lw=2, color='r'))
ax.annotate('No', xy=(0.32,0.4), fontsize=8, color='r')
ax.annotate('', xy=(0.8,0.32), xytext=(0.8,0.48), arrowprops=dict(arrowstyle='->', lw=2, color='g'))
ax.annotate('Yes', xy=(0.8,0.4), fontsize=8, color='g')
ax.annotate('', xy=(0.6,0.32), xytext=(0.8,0.48), arrowprops=dict(arrowstyle='->', lw=2, color='r'))
ax.annotate('No', xy=(0.7,0.4), fontsize=8, color='r')

plt.title('Decision Guide: Shells vs Washers', fontsize=14)
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[77w]`
> So when should you use shells instead of washers? Here is a simple decision guide. If you are rotating about the y-axis, ask yourself: can I easily solve for x in terms of y? If yes, washers are fine. If not, shells are the way to go. Similarly for x-axis rotation. The shell method lets you keep the original variable when the region is defined by a function that is easy to evaluate but hard to invert.

---

### Slide 14 · [CORE]
**Pro Tips & Common Traps**  ·  `split_left_right`

**On-screen text** `[13w]`
Remember: radius x axis distance, height the slice length, thickness dx or dy.

**LEFT** `[concept]`

1. **Always ask**: What is the axis of rotation? Radius = distance to axis.
2. **Check variable**: Rotation about y‑axis → $dx$ ; x‑axis → $dy$.
3. **Height**: top minus bottom (for $dx$) or right minus left (for $dy$).
4. **When in doubt**: Try shells. If the integrand becomes messy, washers might be better.
5. **Common trap**: Forgetting to rewrite $x$ as a function of $y$ when rotating about x‑axis.

**RIGHT** `[visual_spec]`

*Visual Spec:* Display two formulas: one for y-axis rotation (V=2π∫x f(x) dx) and one for x-axis rotation (V=2π∫y g(y) dy). Show a small diagram of a shell next to each.

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8,3))
ax.axis('off')
ax.text(0.2, 0.7, '$V = 2\pi \int_a^b x f(x)\,dx$', fontsize=16, verticalalignment='center')
ax.text(0.2, 0.2, '$V = 2\pi \int_c^d y g(y)\,dy$', fontsize=16, verticalalignment='center')
ax.set_title('Cylindrical Shell Method Formulas', fontsize=14)
plt.show()
```

**Teacher Narration** `[80w]`
> Let's summarize with some pro tips. First, always identify the axis of rotation; the radius is the distance from that axis to the shell. Second, the variable of integration matches the axis: dx for y-axis rotation, dy for x-axis rotation. Third, height is top minus bottom if using dx, or right minus left if using dy. Finally, if you ever get stuck, try shells first. They often save you from messy algebra. The formulas on the right are your anchor.

---

### Slide 15 · [SUMMARY]
**What You Should Know**  ·  `full_width`

**On-screen text** `[13w]`
Cylindrical shells: slice parallel to axis. Sum of (circumference × height × thickness).

**FULL WIDTH** `[concept]`

**Learning objectives revisited:**

1. Calculate volumes of revolution using cylindrical shells: $V = 2\pi \int (\text{radius})(\text{height})\,d\text{(parallel variable)}$.
2. Choose shells when the perpendicular slice would require solving a difficult equation.
3. Handle rotations about vertical lines other than the y‑axis by using radius = $|x - c|$.
4. Apply to rotations about the x‑axis by rewriting functions in terms of $y$.
5. Recognize that the method is a Riemann sum of thin cylindrical layers.

**Teacher Narration** `[87w]`
> Great work today. You now have a second powerful tool for computing volumes of revolution. Remember, the shell method excels when the region is defined by a function that is easier to evaluate than to invert. Practice setting up the integrals carefully, especially the radius when rotating about a line other than the axes. With both shells and washers in your toolbox, you can tackle a wide variety of volume problems. In the next lesson, we'll extend these ideas to volumes by slicing with known cross sections.

---
