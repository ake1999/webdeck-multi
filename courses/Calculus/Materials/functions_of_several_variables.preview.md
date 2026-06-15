# Functions of Several Variables

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** Familiarity with single-variable functions, graphing, and basic set notation is assumed.

**Learning Objectives:**
- Determine domains and ranges for functions of two or more variables
- Sketch level curves and level surfaces as geometric representations
- Interpret multivariable functions in real-world contexts
- Connect algebraic formulas to geometric visualizations

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 102w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 3 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
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
| 1 | hook | 🟢 | ◧ |  | 83w | 17w | From One Input to Many |
| 2 | core | 🟢 | ◧ |  | 117w | 17w | Function of Two Variables — Definition |
| 3 | core | 🟢 | ◧ |  | 105w | 14w | Functions of Three or More Variables |
| 4 | core | 🟢 | ◧ |  | 108w | 19w | Level Curves: Topographic Maps of z = f(x,y) |
| 5 | core | 🟢 | ◧ |  | 113w | 7w | Level Surfaces: Constant‑Value Layers in ℝ³ |
| 6 | 🎛visual_lab | 🟢 | ⬛⬛ | ⏸️ | 87w | 13w | Interactive: Concentric Spheres Level Surfaces |
| 7 | practice | 🟢 | ⬛⬛ |  | 92w | 7w | Warm‑Up: Finding a Domain (Two Variables) |
| 8 | practice | 🟢 | ⬛⬛ |  | 109w | 13w | Standard: Level Curves of f(x,y)=x/y |
| 9 | misconception | 🟢 | ◧ | ⏸️ | 115w | 11w | ⚠️ Misconception: Forgetting Domain Restrictions |
| 10 | 🎛visual_lab | 🟡 | ⬛⬛ | ⏸️ | 96w | 11w | Interactive: Level Curves Explorer |
| 11 | practice | 🟡 | ⬛⬛ |  | 105w | 11w | Tricky: Level Surfaces with Square Root Restriction |
| 12 | 🎛visual_lab | 🟡 | ⬛⬛ |  | 79w | 10w | Interactive: Level Surfaces of f(x,y,z) = x²+y²+z² |
| 13 | practice | 🔴 | ⬛⬛ |  | 106w | 11w | [Challenge – Optional] Edge Case: Double Cone Level Surface |
| 14 | practice | 🟡 | ⬛⬛ |  | 115w | 20w | Application: Wind‑Chill Index |
| 15 | challenge | 🔴 | ⬛⬛ |  | 109w | 12w | [Challenge – Optional] Proof: Level Surfaces of $x^2+y^2+z^2$ |
| 16 | summary | 🟢 | ⬛⬛ |  | 99w | 11w | Key Takeaways |

---

### Slide 1 · [HOOK]
**From One Input to Many**  ·  `split_left_right`

**On-screen text** `[17w]`
Temperature depends on location: $T=f(x,y)$. Each point gets one temperature — that's a function of two variables.

**LEFT** `[text]`

**Everyday examples:**
- Temperature $T$ on a map depends on $(x,y)$ — $T=f(x,y)$.
- Elevation contours on a hiking map.
- Wind-chill index $W = f(T,v)$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a 2D colormap of temperature over a rectangular region (e.g., 0≤x≤10, 0≤y≤6). Use a smooth function like T(x,y)=20 - 0.5*((x-5)^2 + (y-3)^2). Add a colorbar. Show a few labeled (x,y) points. Visually indicate that each point has a single temperature value.

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(0,10,200)
y = np.linspace(0,6,150)
X,Y = np.meshgrid(x,y)
T = 20 - 0.5*((X-5)**2 + (Y-3)**2)
plt.figure(figsize=(6,5))
plt.pcolormesh(X,Y,T, shading='auto', cmap='coolwarm')
plt.colorbar(label='Temperature (°C)')
plt.xlabel('x (km)')
plt.ylabel('y (km)')
plt.title('Temperature Map')
plt.scatter([2,7,4],[4,2,5], color='black', s=50, zorder=5)
plt.show()
```

**Teacher Narration** `[83w]`
> Welcome to multivariable calculus. So far you have studied functions that take a single number and return a single number. But real-world quantities often depend on many factors. Think of a weather map: at every point on the map, defined by its x and y coordinates, there is exactly one temperature. That is a function of two variables. We measure elevation, cost, wind chill — all depend on more than one input. Today we will learn how to describe and visualise such functions.

**Student Prompt:** Can you think of another quantity that depends on two or more variables? Share one example.

---

### Slide 2 · [CORE]
**Function of Two Variables — Definition**  ·  `split_left_right`

**On-screen text** `[17w]`
A function of two variables: each input pair maps to exactly one output. Domain = allowed inputs.

**LEFT** `[formula_block]`

**Definition:** A function $f$ of two variables assigns to each ordered pair $(x,y)$ in a set $D$ a unique real number $f(x,y)$.
- **Domain** $D$: set of all allowed inputs.
- **Range:** $\{f(x,y) \mid (x,y) \in D \}$.
- **Notation:** $z = f(x,y)$.

**Domain restrictions usually come from:**
- Denominator $\neq 0$.
- Radicand $\geq 0$.
- Argument of log $> 0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a 2D region for the domain of f(x,y)=ln(y-x^2). Shade the region where y > x^2. Draw the parabola y=x^2 as a dashed curve. Place a point inside the shaded region and label it 'allowed input (x,y)'. Use x from -3 to 3, y from -2 to 5. Add a contour of the function if helpful.

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(-3,3,400)
y = np.linspace(-2,5,400)
X,Y = np.meshgrid(x,y)
cond = Y > X**2
plt.figure(figsize=(6,5))
plt.contourf(X,Y,cond, levels=[0.5,1], colors=['lightblue'], alpha=0.6)
plt.plot(x, x**2, 'k--', label='y = x^2')
plt.scatter(1,3, color='red', s=50, zorder=5, label='(1,3)')
plt.xlabel('x')
plt.ylabel('y')
plt.xlim(-3,3)
plt.ylim(-2,5)
plt.legend()
plt.title('Domain of f(x,y) = ln(y - x^2): y > x^2')
plt.show()
```

**Teacher Narration** `[117w]`
> Here is the formal definition. A function of two variables takes an ordered pair and returns a single number. We denote it by f of x y. The set of all possible input pairs is called the domain. Often the domain is restricted because we cannot divide by zero, take the square root of a negative number, or take the logarithm of a non-positive argument. For example, look at the function natural log of y minus x squared. The logarithm demands its argument be positive, so we require y greater than x squared. That gives us the region above the parabola. The red dot, (1,3), is inside the domain because 3 minus 1 squared equals 2, positive.

---

### Slide 3 · [CORE]
**Functions of Three or More Variables**  ·  `split_left_right`

**On-screen text** `[14w]`
f(x,y,z) = ln(z−y) requires z > y. Domain: half‑space above plane z = y.

**LEFT** `[text]`

**Definition:** A function $f$ of three variables assigns to each ordered triple $(x,y,z)$ in $D \subseteq \mathbb{R}^3$ a unique number $f(x,y,z)$.

**General:** $f: \mathbb{R}^n \rightarrow \mathbb{R}$, $z = f(x_1, x_2, \dots, x_n)$.

**Example:** Temperature on Earth depends on longitude $x$, latitude $y$, and time $t$: $T = f(x,y,t)$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a 3D scatter plot of random points in R^3 that satisfy z > y. Use a transparent half-space to indicate the region. Annotate a few points that are inside and one point that is outside (z ≤ y). Axes labeled x, y, z.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
np.random.seed(42)
pts = np.random.uniform(-2,2,size=(100,3))
cond = pts[:,2] > pts[:,1]
fig = plt.figure(figsize=(6,5))
ax = fig.add_subplot(111, projection='3d')
ax.scatter(pts[cond,0], pts[cond,1], pts[cond,2], c='blue', alpha=0.5, label='inside domain')
ax.scatter(pts[~cond,0], pts[~cond,1], pts[~cond,2], c='red', marker='x', label='outside domain')
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
ax.legend()
ax.view_init(elev=20, azim=30)
plt.title('Domain of f(x,y,z) = ln(z-y) + xy sin z')
plt.show()
```

**Teacher Narration** `[105w]`
> We can extend the idea to three variables – a function that takes a triple and returns a number. For example, temperature at a point on Earth depends on longitude, latitude, and time. The domain is now a region in three‑dimensional space. Consider the function natural log of z minus y plus xy sine z. The logarithm forces z minus y to be positive, so the domain is the set of points where z is greater than y. In the 3D plot, blue points satisfy that condition; red crosses do not. As the number of variables grows, the domain becomes a region in higher‑dimensional space.

---

### Slide 4 · [CORE]
**Level Curves: Topographic Maps of z = f(x,y)**  ·  `split_left_right`

**On-screen text** `[19w]`
Level curves: $f(x,y)=k$. They are the 2D slices of the 3D graph – like elevation contours on a map.

**LEFT** `[formula_block]`

**Definition:** The level curves of $f(x,y)$ are curves in the $xy$-plane given by:
$$f(x,y) = k \quad (k \text{ constant})$$

**Properties:**
- Each curve joins points with the same function value.
- Level curves never intersect (otherwise a point would have two output values).
- They are the projection of horizontal slices of $z=f(x,y)$ onto the $xy$-plane.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a contour plot of f(x,y)=x^2+y^2 on the domain -3≤x≤3, -3≤y≤3. Show contours for k=1,2,3,4 as labeled circles. Use a color map for the function surface in the background. Add a colorbar.

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(-3,3,300)
y = np.linspace(-3,3,300)
X,Y = np.meshgrid(x,y)
Z = X**2 + Y**2
plt.figure(figsize=(6,5))
contour = plt.contour(X,Y,Z, levels=[1,2,3,4], colors='k', linewidths=2)
plt.clabel(contour, inline=1, fontsize=10, fmt='k=%d')
plt.contourf(X,Y,Z, levels=20, cmap='viridis', alpha=0.5)
plt.colorbar(label='f(x,y)')
plt.xlabel('x')
plt.ylabel('y')
plt.axis('equal')
plt.title('Level curves of f(x,y)=x^2+y^2')
plt.show()
```

**Teacher Narration** `[108w]`
> One of the most powerful ways to visualise a function of two variables is through its level curves. A level curve is the set of points in the xy‑plane where the function takes a constant value k. Think of them as elevation contours on a hiking map – each curve connects points of equal height. Here we have the function x squared plus y squared. Its level curves are concentric circles: for k equals one, a circle of radius one; for k equals two, radius root two, and so on. Notice that level curves never cross, because the function cannot have two different values at the same point.

---

### Slide 5 · [CORE]
**Level Surfaces: Constant‑Value Layers in ℝ³**  ·  `split_left_right`

**On-screen text** `[7w]`
Level surfaces: $f(x,y,z)=k$. Concentric spheres for $f=x^2+y^2+z^2$.

**LEFT** `[formula_block]`

**Definition:** The level surfaces of $f(x,y,z)$ are surfaces in $\mathbb{R}^3$ given by:
$$f(x,y,z) = k \quad (k \text{ constant})$$

**Properties:**
- Each point on a level surface yields the same function value.
- Level surfaces never intersect.
- They partition $\mathbb{R}^3$ into layers of constant output.

**RIGHT** `[visual_spec]`

*Visual Spec:* In a 3D plot, draw three transparent spheres centred at the origin with radii 1, sqrt(2), sqrt(3). Use distinct colors (e.g., light red, light blue, light green). Show a color legend indicating corresponding k values. Ensure proper alpha blending for transparency.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(7,6))
ax = fig.add_subplot(111, projection='3d')

# create sphere mesh
u, v = np.mgrid[0:2*np.pi:30j, 0:np.pi:20j]

for k, color in zip([1,2,3], ['lightcoral','lightblue','lightgreen']):
    r = np.sqrt(k)
    x = r * np.cos(u) * np.sin(v)
    y = r * np.sin(u) * np.sin(v)
    z = r * np.cos(v)
    ax.plot_surface(x, y, z, color=color, alpha=0.4, edgecolor='gray', linewidth=0.5)

ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
ax.set_title('Level surfaces of f(x,y,z)=x²+y²+z²')
ax.view_init(elev=20, azim=40)
plt.show()
```

**Teacher Narration** `[113w]`
> For functions of three variables, the geometry becomes truly three‑dimensional. A level surface is the set of points in space where the function equals a constant. Take f of x,y,z equals x squared plus y squared plus z squared. When we set this equal to k, we get the equation of a sphere centred at the origin with radius root k. For k equal to one, we have a sphere of radius one; for k equal to two, a slightly larger sphere; for k equal to three, an even larger sphere. All points on a given sphere share the same function value. This idea will help us think about functions in higher dimensions.

---

### Slide 6 · [VISUAL_LAB] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Interactive: Concentric Spheres Level Surfaces**  ·  `full_width`

**On-screen text** `[13w]`
Interactive: move the slider to see how the sphere’s radius changes with $k$.

**FULL WIDTH** `[text]`

Experiment with the level value $k$ to see how the sphere changes radius.

**Controls:**
- **Slider $k$**: range 0.1 to 9, step 0.1.
- **Button**: reset to $k=1$.

**Observations:**
- For $k>0$, you get a sphere; for $k=0$, a single point; $k$ cannot be negative because $x^2+y^2+z^2 \ge 0$.

**Teacher Narration** `[87w]`
> Let’s play with the level surface idea interactively. Here we have a 3D plot of the sphere x squared plus y squared plus z squared equals k, with k controlled by a slider. As you move the slider, the sphere grows or shrinks. When k is near zero, the sphere collapses to a point. Notice that k must be non‑negative because the sum of squares can never be negative. This visual tool helps reinforce the concept that each level surface corresponds to exactly one constant output value.

**Student Prompt:** Predict: What happens if k = 0? (Answer: the sphere becomes a single point at the origin.)

---

### Slide 7 · [PRACTICE]
**Warm‑Up: Finding a Domain (Two Variables)**  ·  `full_width`

**On-screen text** `[7w]`
Domain: inside and on the circle $x^2+y^2=4$.

**FULL WIDTH** `[steps]`

**Problem:** Find the domain of $f(x,y) = \sqrt{4 - x^2 - y^2}$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Radicand $\ge 0$ | $4 - x^2 - y^2 \ge 0$ |
| 2 | Rearrange | $x^2 + y^2 \le 4$ |
| 3 | Interpret | Disk of radius 2 centered at $(0,0)$ |
| 4 | Write domain | $D = \{ (x,y) \mid x^2 + y^2 \le 4 \}$ |

**Visual:** All points inside and on the circle of radius 2.

**Teacher Narration** `[92w]`
> Let’s work through a simple example together. We want the domain of the square root of 4 minus x squared minus y squared. The square root requires its inside to be non‑negative. So we set 4 minus the sum of squares greater than or equal to zero, giving x squared plus y squared less than or equal to 4. This describes a disk of radius two centred at the origin. Every point inside that disk, including the boundary, is a valid input. The function is not defined for points outside the disk.

---

### Slide 8 · [PRACTICE]
**Standard: Level Curves of f(x,y)=x/y**  ·  `full_width`

**On-screen text** `[13w]`
Level curves of $x/y = k$: lines through origin, but $y \neq 0$.

**FULL WIDTH** `[steps]`

**Problem:** Find and sketch level curves of $f(x,y)=x/y$ for $k = -2,-1,0,1,2$.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Set $f(x,y)=k$ | $x/y = k$ |
| 2 | Solve for $x$ | $x = k y$ (lines through origin) |
| 3 | Note restriction | $y \neq 0$ (function undefined when $y=0$) |
| 4 | $k=0$ | $x=0$ (y‑axis, excluding origin) |
| 5 | $k=\pm1$ | $x=y$ and $x=-y$ (diagonals) |
| 6 | $k=\pm2$ | $x=2y$ and $x=-2y$ (steeper lines) |

**Caution:** The origin $(0,0)$ is excluded from all curves.

**Teacher Narration** `[109w]`
> Now a standard problem: level curves of f of x,y equals x over y. We set that equal to constant k, giving x equals k y. These are straight lines through the origin. But there is a critical restriction: the denominator y cannot be zero. So the entire x‑axis is excluded. For k equals zero, the equation becomes x equals zero, which is the y‑axis, but again the origin is not allowed because y would be zero there. For k equals plus or minus one, we get the diagonals; for k equals plus or minus two, steeper lines. Always remember to exclude points where the original function is undefined.

---

### Slide 9 · [MISCONCEPTION] ⏸️ *[YouTube Pause]*
**⚠️ Misconception: Forgetting Domain Restrictions**  ·  `split_left_right`

**On-screen text** `[11w]`
Mistake: forgetting $y\neq0$ causes invalid level curves. Domain first, then sketch.

**LEFT** `[concept]`

**Wrong approach:** A student says the level curves of $f(x,y)=x/y$ are all lines $x=ky$ for $k\in\mathbb{R}$, including $y=0$.

**Why it fails:** The function is not defined when $y=0$. The point $(0,0)$ would appear on $x=0$ if we ignored this, but $f(0,0)$ is undefined. Also, the line $y=0$ itself is not a level curve because it is not in the domain.

**Correct approach:** Always start by finding the domain. Then draw level curves only within that domain.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two subplots side by side. Left: 'Wrong' — shows lines x=ky for k=-2,-1,0,1,2, including the x-axis (y=0) but with a cross at origin. Right: 'Correct' — shows same lines but with y=0 axis removed and a hole at (0,0). Use different colours for each k. Add a note: 'Domain: y ≠ 0'.

```python
import numpy as np
import matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1,2, figsize=(10,4))

k_vals = [-2,-1,0,1,2]
colors = ['red','orange','green','blue','purple']
x_vals = np.linspace(-5,5,300)

for i,k in enumerate(k_vals):
    if k == 0:
        # line x=0
        ax1.plot([0,0], [-5,5], color=colors[i], label=f'k={k}')
        ax2.plot([0,0], [-5,5], color=colors[i], label=f'k={k}')
    else:
        y = x_vals / k if k != 0 else np.zeros_like(x_vals)
        ax1.plot(k*y, y, color=colors[i])
        ax2.plot(k*y, y, color=colors[i])

# wrong: include y=0 line (but actually we already excluded y=0 by k definition? The problem is the line y=0 itself is not a level curve for any k because x/y undefined. So we need to show that y=0 is not present in correct plot.
# Actually the wrong plot includes the line y=0? The student might think that when k=0 the line is x=0 (y-axis) which includes origin, but also think that the x-axis (y=0) could be a level curve for some k? Let's clarify:
# In wrong plot, we can draw a dashed line y=0 and label 'incorrect level curve'.
ax1.plot(x_vals, np.zeros_like(x_vals), 'k--', label='wrong y=0')
ax1.set_title('Wrong: includes y=0 as level curve')
ax1.set_xlim(-5,5)
ax1.set_ylim(-5,5)
ax1.axhline(0, color='gray', lw=0.5)
ax1.axvline(0, color='gray', lw=0.5)
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.legend()

# correct: exclude y=0 and origin
# We already plotted lines, but we can add a hole at origin.
ax2.scatter(0,0, facecolors='none', edgecolors='red', s=100, label='hole')
ax2.set_title('Correct: hole at (0,0), no y=0')
ax2.set_xlim(-5,5)
ax2.set_ylim(-5,5)
ax2.axhline(0, color='gray', lw=0.5)
ax2.axvline(0, color='gray', lw=0.5)
ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.legend()

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[115w]`
> A common trap: when finding level curves, students often solve x over y equals k without checking where the function itself exists. They might draw the line y equals zero, thinking it corresponds to some k, but the function is never defined there. In the wrong plot, the dashed line y equals zero appears as a supposed level curve, but it is not. The correct approach is to first find the domain: y not equal to zero. Then draw only those portions of the lines where y is non‑zero. At the origin, we must show a hole because both coordinates are zero, and the function is undefined there. This careful habit will prevent many errors.

**Student Prompt:** On a piece of paper, draw the correct level curves for k=0,1,2 including the hole at origin.

---

### Slide 10 · [VISUAL_LAB] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Interactive: Level Curves Explorer**  ·  `full_width`

**On-screen text** `[11w]`
Interactive: change $k$ to see level curves of $x^2+4y^2$ as ellipses.

**FULL WIDTH** `[text]`

Explore level curves of $f(x,y) = x^2 + 4y^2$. Use the slider to change $k$ and see the corresponding ellipse.

**Controls:**
- **Slider $k$**: 0 to 10, step 0.5.
- **Checkbox**: show/hide the function's 3D surface.

**Notice:** For $k>0$, ellipses become larger; for $k=0$, just a point at origin.

**Teacher Narration** `[96w]`
> Let’s explore level curves interactively. The function here is x squared plus 4 y squared. Initially we see a contour line at k equals one, which is an ellipse. Use the slider to change k: as k increases, the ellipse grows; as k approaches zero, it shrinks to a single point at the origin. The checkbox lets you toggle the background colour map, showing the function values across the plane. Notice how each level curve neatly separates higher from lower values. This tool helps you see the connection between the algebraic equation and the geometric shape.

**Student Prompt:** What shape do you get for k = 0? (Answer: just the origin point.)

---

### Slide 11 · [PRACTICE] 🟡
**Tricky: Level Surfaces with Square Root Restriction**  ·  `full_width`

**On-screen text** `[11w]`
For $f(x,y,z)=\sqrt{x^2+y^2+z^2}$, level surfaces are spheres only for $k \ge 0$.

**FULL WIDTH** `[steps]`

**Problem:** Find level surfaces of $f(x,y,z) = \sqrt{x^2 + y^2 + z^2}$.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Set $f(x,y,z)=k$ | $\sqrt{x^2 + y^2 + z^2} = k$ |
| 2 | Square both sides | $x^2 + y^2 + z^2 = k^2$ |
| 3 | Note $k \ge 0$ | Square root output is non‑negative |
| 4 | $k=0$ | Only $(0,0,0)$ |
| 5 | $k>0$ | Spheres of radius $k$ |
| 6 | $k<0$ | No level surface exists |

**Watch out:** The output range restricts which $k$ are possible.

**Teacher Narration** `[105w]`
> Here is a trickier case. The function f is the square root of the sum of squares. When we set it equal to k, we must remember that the square root can never be negative. So k must be greater than or equal to zero. Squaring both sides gives x squared plus y squared plus z squared equals k squared. For k equals zero, only the origin works. For positive k, we get spheres of radius k, not root k. The key point: the level surface only exists if k lies in the range of the function, which is the set of non‑negative real numbers.

---

### Slide 12 · [VISUAL_LAB] 🟡 🎛 *[3 controls]*
**Interactive: Level Surfaces of f(x,y,z) = x²+y²+z²**  ·  `full_width`

**On-screen text** `[10w]`
Interactive 3D level surface: adjust $k$ to change sphere radius.

**FULL WIDTH** `[text]`

Explore how the level surface changes with k for the sum of squares function.

**Controls:**
- **Slider $k$**: 0.1 to 9.0.
- **Toggle**: show/hide coordinate axes.
- **Button**: reset to k=1.

**Observation:** The sphere radius is $\sqrt{k}$. For k near 0, the sphere is tiny.

**Teacher Narration** `[79w]`
> Now you can interact with the 3D level surface directly. Using the slider, change k and watch the sphere expand or contract. Notice the radius is the square root of k. At k equals 0.1, the sphere is almost a point. The reset button brings you back to k equals one. You can also toggle the axes labels to get a cleaner view. This kind of hands‑on exploration builds strong intuition for how level surfaces behave in three dimensions.

---

### Slide 13 · [PRACTICE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Edge Case: Double Cone Level Surface**  ·  `full_width`

**On-screen text** `[11w]`
Level surface $x^2+y^2-z^2=0$: a double cone. Cross‑section circles expand with $|z|$.

**FULL WIDTH** `[steps]`

**Problem:** Describe the level surface $f(x,y,z)=x^2 + y^2 - z^2 = 0$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Set equal to zero | $x^2 + y^2 - z^2 = 0$ |
| 2 | Rearrange | $x^2 + y^2 = z^2$ |
| 3 | $z=0$ | Only point $(0,0,0)$ |
| 4 | $z=\pm 1$ | Circle radius 1 at heights $\pm 1$ |
| 5 | $z=\pm 2$ | Circle radius 2 at heights $\pm 2$ |
| 6 | Overall | Double cone opening upward and downward |

**Key insight:** Cross‑sections are circles that expand linearly with $|z|$.

**Teacher Narration** `[106w]`
> This is a more challenging edge case. The level surface for k equals zero of the function x squared plus y squared minus z squared is not a sphere but a double cone. At height z equals zero, only the origin satisfies the equation. As we move up or down, the cross‑sections are circles whose radius equals the absolute value of z. So at height z equals one, we have a circle of radius one; at height two, radius two. The resulting shape is a cone that extends both upward and downward, meeting at the origin. This shows how different functions produce very different level surfaces.

**Student Prompt:** What would the level surface look like if we set f(x,y,z)=x^2+y^2-z^2 = 1 instead of 0? (Answer: hyperboloid of one sheet)

---

### Slide 14 · [PRACTICE] 🟡
**Application: Wind‑Chill Index**  ·  `full_width`

**On-screen text** `[20w]`
Wind‑chill: $W = f(T,v)$. For fixed $T$, the level curves $W = k$ give wind speeds that feel the same.

**FULL WIDTH** `[steps]`

**Problem:** Wind‑chill index $W = f(T,v)$ gives perceived temperature based on actual temperature $T$(°F) and wind speed $v$(mph).

**Part A:** Interpret $f(-15,40) = -30$.
| Step | Interpretation |
|------|----------------|
| 1 | When $T = -15°F$ and $v = 40$ mph… |
| 2 | …the perceived temperature is $-30°F$. |
| 3 | Wind makes it feel colder than actual temperature. |

**Part B:** For what $v$ is $f(-20,v) = -30$?
| Step | Action |
|------|--------|
| 1 | This asks: at what wind speed does $-20°F$ feel like $-30°F$? |
| 2 | This is finding a level curve value (fix $T$, treat $f$ as function of $v$). |
| 3 | From wind‑chill table: $v \approx 15$ mph (if given). |

**Connection:** For fixed $T$, $W$ as function of $v$ is decreasing, so solve for $v$.

**Teacher Narration** `[115w]`
> Let's look at a real‑world application. The wind‑chill index tells us how cold it feels when wind is factored in. Part A: f of minus 15 and 40 equals minus 30 means that when the actual temperature is minus 15 and the wind is 40 miles per hour, it feels like minus 30. Part B: We are asked for which wind speed does minus 20 feel like minus 30. This is exactly a level curve problem: we fix T equals minus 20 and find v such that W equals minus 30. Using a wind‑chill table, the answer is about 15 miles per hour. This connects the abstract idea of level curves to a practical question.

**Student Prompt:** If the wind speed increases, does the perceived temperature increase or decrease? (Answer: decrease, because wind‑chill makes it feel colder.)

---

### Slide 15 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof: Level Surfaces of $x^2+y^2+z^2$**  ·  `full_width`

**On-screen text** `[12w]`
Proof that level surfaces are concentric spheres – a foundational geometric fact.

**FULL WIDTH** `[steps]`

**Theorem:** For $f(x,y,z)=x^2+y^2+z^2$, each level surface $f(x,y,z)=k$ (with $k>0$) is a sphere centered at the origin.

**Proof:**
| Step | Derivation | Explanation |
|------|------------|-------------|
| 1 | Set $f(x,y,z)=k$ | $x^2+y^2+z^2 = k$ |
| 2 | If $k>0$, define $r=\sqrt{k}$ | Then $x^2+y^2+z^2 = r^2$ |
| 3 | Recall sphere equation | A sphere centered at $(0,0,0)$ with radius $r$ is $x^2+y^2+z^2 = r^2$ |
| 4 | Conclusion | Level surface is sphere of radius $\sqrt{k}$ |
| 5 | $k=0$ | Only origin: degenerate sphere |
| 6 | $k<0$ | No points because left side is always $\ge 0$ |

**Insight:** Each $k$ gives a different sphere; they are concentric.

**Teacher Narration** `[109w]`
> For those who want a deeper understanding, here is a formal proof. Set f of x,y,z equal to k. For k positive, let r be root k, so the equation becomes x squared plus y squared plus z squared equals r squared. That is precisely the equation of a sphere centered at the origin with radius r. For k equal to zero, only the origin satisfies the equation – a sphere of radius zero. For negative k, there is no solution because the sum of squares is always non‑negative. Thus every level surface is a concentric sphere. This simple but fundamental fact appears again and again in multivariable calculus.

---

### Slide 16 · [SUMMARY]
**Key Takeaways**  ·  `full_width`

**On-screen text** `[11w]`
Summary: domain, level curves, level surfaces. Always start with the domain.

**FULL WIDTH** `[text]`

**What we covered:**
- **Domain** of a multivariable function: intersection of restrictions (denominator, square root, log).
- **Level curves** of $f(x,y)$: curves $f(x,y)=k$ in the $xy$-plane.
- **Level surfaces** of $f(x,y,z)$: surfaces $f(x,y,z)=k$ in $\mathbb{R}^3$.
- **Geometric interpretation**: level curves/surfaces are constant‑value sets that never intersect.

**Three facts to remember:**
1. Domain first: always check where the function is defined.
2. Level curves = topographic slices; level surfaces = 3D constant layers.
3. Different $k$ values give different curves/surfaces – useful for visualisation.

**Teacher Narration** `[99w]`
> Today we learned how to handle functions that depend on two or more variables. The key steps: first find the domain by checking restrictions like denominator non‑zero or radicand non‑negative. Then use level curves for two‑variable functions – they are like contour lines on a map. For three variables, we use level surfaces, which are constant‑value layers in space. Remember that level curves and surfaces never intersect because each point has a single function value. These concepts form the foundation for all of multivariable calculus. Practice with the problems provided and don't forget to always check the domain first.

---
