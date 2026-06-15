# Triple Integrals: From Boxes to General Solids

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** Double integrals and iterated integration in 2D.

**Learning Objectives:**
- Set up and evaluate triple integrals over rectangular boxes and general bounded regions
- Interpret triple integrals as volume accumulation in 3D space
- Choose the optimal order of integration to simplify calculations
- Apply triple integrals to compute volumes and center of mass of complex solids

---

## v3.1 Production Readiness

✅ **Interactive moments:** 4 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 66w)
⚠️ **Narration too short (<60w):** [7, 8]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s7:59w', 's8:50w']
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
| 1 | 🎛hook | 🟢 | ◧ |  | 64w | 12w | From Flat to Solid: Why Triple Integrals? |
| 2 | 🎛core | 🟢 | ◧ |  | 76w | 14w | Intuition: Stacking 2D Slices |
| 3 | 🎛core | 🟢 | ◧ |  | 64w | 12w | Definition: Triple Integral over a Box |
| 4 | core | 🟢 | ◧ |  | 77w | 14w | Fubini's Theorem for Triple Integrals |
| 5 | practice | 🟢 | ⬛⬛ |  | 64w | 10w | Example 1 (Warm-Up): Rectangular Box |
| 6 | core | 🟢 | ◧ |  | 73w | 15w | General Regions: Type 1 (z-simple) |
| 7 | practice | 🟢 | ⬛⬛ |  | 59w⚠️ | 10w | Example 2 (Standard): Tetrahedron |
| 8 | 🎛visual_lab | 🟢 | ◧ |  | 50w⚠️ | 12w | Interactive: Tetrahedron Slicing |
| 9 | misconception | 🟡 | ◧ |  | 63w | 14w | Misconception: Choosing the Wrong Order |
| 10 | practice | 🟡 | ⬛⬛ |  | 66w | 12w | Example 3 (Volume): Paraboloid and Plane |
| 11 | practice | 🟡 | ⬛⬛ |  | 67w | 10w | Example 4 (Application): Center of Mass of a Tetrahedron |
| 12 | challenge | 🔴 | ⬛⬛ |  | 63w | 9w | [Challenge – Optional] Proof Sketch of Fubini's Theorem |
| 13 | pause_and_try | 🟢 | ◧ | ⏸️ | 62w | 8w | Check Your Understanding |
| 14 | summary | 🟢 | ⬛⬛ |  | 75w | 12w | Summary: What You've Learned |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**From Flat to Solid: Why Triple Integrals?**  ·  `split_left_right`

**On-screen text** `[12w]`
How much dye? Double integral → surface. Triple integral → whole volume.

**LEFT** `[concept]`

**Swimming Pool Dye Analogy**

Imagine pouring dye into a pool with varying depth. How much dye is needed if concentration changes at every point?
- Double integral: dye over the surface (2D)
- Triple integral: dye through the entire volume (3D)

**RIGHT** `[visual_spec]`

*Visual Spec:* Animate a 3D rectangular box with a vertical gradient from blue to red. Gradually fill it from bottom to top, showing horizontal slices accumulating. Label 'Double integral: area of one slice' vs 'Triple integral: volume of all slices'. Use matplotlib 3D with slider to control fill level.

*Interactive Controls:*
  - 🎛 Slider for fill level from 0 to 1

**Teacher Narration** `[64w]`
> Think about filling a swimming pool with a dye that changes concentration at every point. A double integral would measure the dye spread over the pool's surface, but the pool has depth. To capture the dye throughout the entire water volume, we need three nested summations: that's a triple integral. In this lecture, you'll learn exactly how to set them up and evaluate them.

---

### Slide 2 · [CORE] 🎛 *[1 controls]*
**Intuition: Stacking 2D Slices**  ·  `split_left_right`

**On-screen text** `[14w]`
Triple integral = stack of double integrals. Inner integral through height, outer over projection.

**LEFT** `[concept]`

**Key Insight**

Triple integrals stack double integrals over height.
$$
\iiint_E f(x,y,z) dV = \iint_D \left[ \int_{z_1(x,y)}^{z_2(x,y)} f(x,y,z) dz \right] dA
$$
- Inner: integrate through each vertical rod
- Outer: integrate over the 2D projection

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a 3D solid (e.g., a cylinder) sliced into N thin horizontal disks. Animate adding each slice from bottom to top. Display the cumulative volume. Use a slider for N (number of slices). Color slices alternating for clarity. Axes labels: x, y, z. Title: 'Approximating Volume by Slices'.

*Interactive Controls:*
  - 🎛 Slider for number of slices from 1 to 50

**Teacher Narration** `[76w]`
> Here's the core intuition: you can think of a solid as a stack of thin horizontal slices. For each (x,y) point, the inner integral adds contributions from z from bottom to top. Then you integrate that over the 2D shadow of the solid. The slider lets you see how more slices give a better approximation of the total volume. This stacking perspective is the foundation for understanding triple integrals as a natural extension of double integrals.

---

### Slide 3 · [CORE] 🎛 *[1 controls]*
**Definition: Triple Integral over a Box**  ·  `split_left_right`

**On-screen text** `[12w]`
Triple integral = limit of triple Riemann sum. Volume $ΔV$ becomes $dV$.

**LEFT** `[formula_block]`

$$
\iiint_B f(x,y,z) dV = \lim_{l,m,n\to\infty} \sum_{i=1}^l \sum_{j=1}^m \sum_{k=1}^n f(x_{ijk}^*,y_{ijk}^*,z_{ijk}^*) \Delta V
$$
- $B = [a,b]\times[c,d]\times[r,s]$
- $\Delta V = \Delta x \Delta y \Delta z$
- Triple sum = 3D Riemann sum

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a rectangular box in 3D. Subdivide into small rectangular boxes. Highlight one small box with its sample point at the center. Use a slider for number of subdivisions in each direction (l=m=n). Show the Riemann sum value and the exact integral (if known) for a simple function like f=1. Use matplotlib. Axes: x,y,z. Title: '3D Riemann Sum'.

*Interactive Controls:*
  - 🎛 Slider for subdivisions from 1 to 10

**Teacher Narration** `[64w]`
> Formally, we partition the box into small sub-boxes, sample the function inside each, multiply by the sub-box volume, and sum. Taking the limit as all three subdivisions go to infinity gives the triple integral. This is the natural 3D extension of the single and double Riemann sums you already know. The slider helps you see how increasing subdivisions improves the approximation of the integral.

---

### Slide 4 · [CORE]
**Fubini's Theorem for Triple Integrals**  ·  `split_left_right`

**On-screen text** `[14w]`
Fubini: Triple integral = three nested single integrals. Any order works on a box.

**LEFT** `[formula_block]`

**Fubini's Theorem (Triple)**

If $f$ is continuous on $B=[a,b]\times[c,d]\times[r,s]$, then
$$
\iiint_B f(x,y,z) dV = \int_r^s \int_c^d \int_a^b f(x,y,z) \,dx\,dy\,dz
$$
- Any order works (6 permutations)
- Innermost limits: constants or functions of outer variables only

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a 3D box with axes labeled. Show arrows indicating the order: first integrate along x (line), then y (plane), then z (volume). Color each integration step differently. Label 'dx', 'dy', 'dz' on arrows. Optionally show a second order (e.g., dz dy dx) for comparison.

**Teacher Narration** `[77w]`
> Fubini's theorem lets us compute a triple integral as three iterated single integrals. For a rectangular box, any order of integration yields the same result. The key is that the innermost limits are constants (or functions of outer variables) and the outermost limits are constants. We'll see that for general regions, we must adapt the limits. This theorem is valid for continuous functions on a rectangular box, which ensures the iterated integrals converge to the same value.

---

### Slide 5 · [PRACTICE]
**Example 1 (Warm-Up): Rectangular Box**  ·  `full_width`

**On-screen text** `[10w]`
Example 1: rectangular box, constant limits. Integrate step by step.

**FULL WIDTH** `[steps]`

**Evaluate** $\iiint_B xyz^2 \,dV$ with $B=[0,1]\times[-1,2]\times[0,3]$.

| Step | Action | Intermediate Result |
|------|--------|--------------------|
| 1 | Order: $dx\,dy\,dz$ | $\int_0^3\int_{-1}^2\int_0^1 xyz^2\,dx\,dy\,dz$ |
| 2 | Inner $\int_0^1 xyz^2\,dx$ | $\frac{y z^2}{2}$ |
| 3 | Middle $\int_{-1}^2 \frac{y z^2}{2}\,dy$ | $\frac{3z^2}{4}$ |
| 4 | Outer $\int_0^3 \frac{3z^2}{4}\,dz$ | $\frac{27}{4}$ |

**Answer:** $\frac{27}{4}$

**Teacher Narration** `[64w]`
> Let's start with a simple rectangular box. We choose to integrate with respect to x first, then y, then z. Notice that the limits are all constants because the box is axis-aligned. After integrating in x, we treat y and z as constants. Then integrate in y, then finally in z. The final answer is 27/4. Try a different order to verify Fubini's theorem.

**Student Prompt:** Try computing with order dz dy dx. Do you get the same answer?

---

### Slide 6 · [CORE]
**General Regions: Type 1 (z-simple)**  ·  `split_left_right`

**On-screen text** `[15w]`
General region: integrate z first from bottom to top, then integrate over the 2D shadow.

**LEFT** `[concept]`

**z-simple region:**
$$
E = \{ (x,y,z) \mid (x,y)\in D, \, u_1(x,y) \le z \le u_2(x,y) \}
$$
- $D$ is projection onto $xy$-plane
- First integrate in $z$, then over $D$:
$$
\iiint_E f\,dV = \iint_D \left[ \int_{u_1(x,y)}^{u_2(x,y)} f\,dz \right] dA
$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a 3D solid (e.g., a dome or tetrahedron) with curved boundaries. Show a vertical line from a point (x,y) in D penetrating the solid from bottom surface z=u1 to top surface z=u2. Highlight the projection D in translucent gray on the xy-plane. Use arrows to indicate integration direction. Axes: x,y,z.

**Teacher Narration** `[73w]`
> Most solids are not boxes. We describe them as z-simple: for each (x,y) in the projection D, z varies from a lower surface to an upper surface. The triple integral becomes a double integral over D of the inner z-integral. Always first identify the projection and the bounding surfaces. This approach is analogous to how we handled type I regions in double integrals, but now we have an extra dimension to account for.

---

### Slide 7 · [PRACTICE]
**Example 2 (Standard): Tetrahedron**  ·  `full_width`

**On-screen text** `[10w]`
Example 2: tetrahedron. Integrate z first, then y, then x.

**FULL WIDTH** `[steps]`

**Evaluate** $\iiint_E z\,dV$ where $E$ is tetrahedron bounded by $x=0,y=0,z=0$, and $x+y+z=1$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Region: $0\le z\le 1-x-y$, $(x,y)\in D$ | $D: x\ge0,y\ge0,x+y\le1$ |
| 2 | Setup: $\int_0^1\int_0^{1-x}\int_0^{1-x-y} z\,dz\,dy\,dx$ | |
| 3 | Inner: $\int_0^{1-x-y} z\,dz$ | $\frac{(1-x-y)^2}{2}$ |
| 4 | Middle: $\int_0^{1-x} \frac{(1-x-y)^2}{2}\,dy$ | $\frac{(1-x)^3}{6}$ |
| 5 | Outer: $\int_0^1 \frac{(1-x)^3}{6}\,dx$ | $\frac{1}{24}$ |

**Answer:** $\frac{1}{24}$

**Teacher Narration** `[59w ⚠️ **TOO SHORT: 59w < 60w min**]`
> Now we work with a tetrahedron. The bounds for z are from 0 to the plane 1-x-y. The projection onto the xy-plane is a triangle. We integrate z first, then y up to the line, then x from 0 to 1. Follow the steps carefully; the inner integral yields a quadratic, which simplifies nicely. The final answer is 1/24.

**Student Prompt:** What is the volume of this tetrahedron? (Hint: integrate f=1).

---

### Slide 8 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive: Tetrahedron Slicing**  ·  `split_left_right`

**On-screen text** `[12w]`
Drag the slider to see how the cross-section changes. Toggle the projection.

**LEFT** `[concept]`

Explore the tetrahedron from Example 2.
- Drag the slider to slice at a given $x$.
- Toggle the projection on/off.
- Observe how the cross-section changes.

**RIGHT** `[python_lab]`

*Visual Spec:* Use matplotlib 3D. Plot the tetrahedron with vertices (0,0,0), (1,0,0), (0,1,0), (0,0,1). Add a transparent plane at x = constant using a slider. Show the triangular cross-section in a different color. Toggle button to show/hide the xy-plane projection (the shadow triangle). Slider for x from 0 to 1.

*Interactive Controls:*
  - 🎛 Slider for x slice from 0 to 1
  - 🎛 Button: Toggle projection on/off

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider, Button

fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d', facecolor='white')
ax.set_xlim(0, 1.2)
ax.set_ylim(0, 1.2)
ax.set_zlim(0, 1.2)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('Tetrahedron Slicing')

# Tetrahedron vertices
verts = np.array([[0,0,0],[1,0,0],[0,1,0],[0,0,1]])
# Edges
edges = [
    [verts[0], verts[1]],
    [verts[0], verts[2]],
    [verts[0], verts[3]],
    [verts[1], verts[2]],
    [verts[1], verts[3]],
    [verts[2], verts[3]]
]
for e in edges:
    e = np.array(e)
    ax.plot(e[:,0], e[:,1], e[:,2], 'b-', linewidth=2)

# Projection triangle on xy-plane
proj_x = np.array([0,1,0,0])
proj_y = np.array([0,0,1,0])
proj_z = np.zeros(4)
proj_line, = ax.plot(proj_x, proj_y, proj_z, 'g--', linewidth=1.5, alpha=0.7, label='Projection')

# Initial slice plane
x0 = 0.5
# Cross-section points at x=x0: line from (x0,0,0) to (x0,1-x0,0) and from (x0,0,0) to (x0,0,1-x0) and between them?
# Actually cross-section is triangle with vertices (x0,0,0), (x0,1-x0,0), (x0,0,1-x0)
y_vals = np.linspace(0, 1-x0, 20)
z_vals = np.linspace(0, 1-x0, 20)
Y, Z = np.meshgrid(y_vals, z_vals)
X = x0 * np.ones_like(Y)
# Condition: y+z <= 1-x0
mask = (Y + Z) <= (1 - x0)
X_masked = X[mask]
Y_masked = Y[mask]
Z_masked = Z[mask]
slice_plot = ax.scatter(X_masked, Y_masked, Z_masked, c='r', s=10, alpha=0.8)

# Slider
ax_slider = plt.axes([0.2, 0.02, 0.6, 0.03])
slider = Slider(ax_slider, 'x slice', 0.0, 1.0, valinit=x0, valstep=0.01)

def update(val):
    x0 = slider.val
    # update slice scatter
    global slice_plot
    slice_plot.remove()
    y_vals = np.linspace(0, 1-x0, 20)
    z_vals = np.linspace(0, 1-x0, 20)
    Y, Z = np.meshgrid(y_vals, z_vals)
    X = x0 * np.ones_like(Y)
    mask = (Y + Z) <= (1 - x0)
    X_masked = X[mask]
    Y_masked = Y[mask]
    Z_masked = Z[mask]
    slice_plot = ax.scatter(X_masked, Y_masked, Z_masked, c='r', s=10, alpha=0.8)
    fig.canvas.draw_idle()

slider.on_changed(update)

# Button to toggle projection
ax_button = plt.axes([0.8, 0.02, 0.1, 0.04])
button = Button(ax_button, 'Toggle Proj')
proj_visible = True
def toggle(event):
    global proj_visible
    proj_visible = not proj_visible
    proj_line.set_visible(proj_visible)
    fig.canvas.draw_idle()
button.on_clicked(toggle)

plt.show()
```

**Teacher Narration** `[50w ⚠️ **TOO SHORT: 50w < 60w min**]`
> Let's explore the tetrahedron interactively. Drag the slider to slice the tetrahedron at a given x-coordinate. Notice how the cross-section shrinks as x increases. Toggle the projection to see the triangular shadow on the xy-plane. This visualization helps you understand how the limits in the triple integral correspond to geometry.

**Student Prompt:** At x=0.5, what are the y and z limits of the cross-section?

---

### Slide 9 · [MISCONCEPTION] 🟡
**Misconception: Choosing the Wrong Order**  ·  `split_left_right`

**On-screen text** `[14w]`
Wrong: always dz dy dx. Better: choose order where innermost variable has simplest bounds.

**LEFT** `[concept]`

**Common mistake:** automatically using $dz\,dy\,dx$ without checking simpler orders.

**Example:** $\iiint_E x\,dV$, $E$ bounded by $x=0,y=0,z=0$, $2x+3y+4z=12$.
- **Wrong:** $\int_0^6\int_0^{(12-2x)/3}\int_0^{(12-2x-3y)/4} x\,dz\,dy\,dx$ (messy)
- **Better:** Integrate $x$ first: $\int_0^3\int_0^{(12-4z)/3}\int_0^{(12-3y-4z)/2} x\,dx\,dy\,dz$ (simpler)

**Why it works:** The plane $2x+3y+4z=12$ gives $x$ as a simple linear function of $y,z$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Split panel: left side shows the wrong order (dz dy dx) with convoluted limits highlighted in red. Right side shows the better order (dx dy dz) with simple linear limits highlighted in green. Below, show the projection shapes: on left, projection onto xy-plane; on right, projection onto yz-plane. Annotate with arrows indicating integration direction.

**Teacher Narration** `[63w]`
> A common mistake is to blindly use dz dy dx without thinking. Here, integrating x first is much simpler because the plane equation gives x directly as a linear function of y and z. The wrong order makes you work with nested radicals and complicated limits. Always examine which variable has the simplest bounds—often the one that appears linearly in a bounding surface.

**Student Prompt:** Which order of integration would you try first for this region?

---

### Slide 10 · [PRACTICE] 🟡
**Example 3 (Volume): Paraboloid and Plane**  ·  `full_width`

**On-screen text** `[12w]`
Volume by triple integral: integrate f=1, use polar coordinates for circular symmetry.

**FULL WIDTH** `[steps]`

**Find volume** of solid bounded by $z=x^2+y^2$ and $z=4$.

| Step | Action | Expression |
|------|--------|------------|
| 1 | Volume $= \iiint_E 1\,dV$ | $\iint_D \int_{x^2+y^2}^4 dz\, dA$ |
| 2 | Projection $D$: $x^2+y^2 \le 4$ | circle radius 2 |
| 3 | Inner: $\int_{x^2+y^2}^4 dz = 4 - (x^2+y^2)$ | height |
| 4 | Switch to polar: $r,\theta$ | $\int_0^{2\pi}\int_0^2 (4-r^2) r\,dr\,d\theta$ |
| 5 | Evaluate | $8\pi$ |

**Answer:** $8\pi$

**Teacher Narration** `[66w]`
> When the integrand is 1, the triple integral gives the volume. Here the solid lies between a paraboloid and a plane. The inner z-integral gives the height of the solid at each point. Because the projection is a disk, we switch to polar coordinates to simplify the double integral. The final volume is 8π, which matches what you'd get from the disk method in Calculus II.

**Student Prompt:** What would the volume be if the upper plane were z=8 instead? (Answer: 16π?)

---

### Slide 11 · [PRACTICE] 🟡
**Example 4 (Application): Center of Mass of a Tetrahedron**  ·  `full_width`

**On-screen text** `[10w]`
Center of mass = (M_x/M, M_y/M, M_z/M). Symmetry simplifies calculations.

**FULL WIDTH** `[steps]`

**Find center of mass** of tetrahedron from Example 2 (density $\rho=1$).

| Quantity | Integral | Value |
|----------|----------|-------|
| Mass $M$ | $\iiint_E 1\,dV$ | $\frac{1}{6}$ |
| $M_z$ | $\iiint_E z\,dV$ | $\frac{1}{24}$ |
| $M_x$ | $\iiint_E x\,dV$ | $\frac{1}{24}$ (by symmetry) |
| $M_y$ | $\iiint_E y\,dV$ | $\frac{1}{24}$ (by symmetry) |

**Center of mass:** $(\bar{x},\bar{y},\bar{z}) = (1/4,1/4,1/4)$

**Teacher Narration** `[67w]`
> Triple integrals are used in physics to find the center of mass. For constant density, the center of mass is the centroid. We already computed the integral of z in Example 2, which gives M_z. By symmetry of the tetrahedron, the x and y moments are the same. The mass is just the volume, which is 1/6. So each coordinate of the center of mass is 1/4.

**Student Prompt:** If the density were not constant, say ρ = x, would symmetry still hold?

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof Sketch of Fubini's Theorem**  ·  `full_width`

**On-screen text** `[9w]`
Proof: nested Riemann sums → iterated integrals. Requires continuity.

**FULL WIDTH** `[steps]`

**Sketch for continuous $f$ on box $B=[a,b]\times[c,d]\times[r,s]$:**

1. Partition each axis: $\Delta x = (b-a)/l$, $\Delta y = (d-c)/m$, $\Delta z = (s-r)/n$.
2. Riemann sum: $\sum_{i=1}^l \sum_{j=1}^m \sum_{k=1}^n f(x_i^*,y_j^*,z_k^*) \Delta x \Delta y \Delta z$.
3. Fix $y_j^*,z_k^*$, sum over i: $\to \int_a^b f(x,y_j^*,z_k^*) dx$ as $l\to\infty$.
4. Then sum over j: $\to \int_c^d \left[\int_a^b f(x,y,z_k^*) dx\right] dy$.
5. Finally sum over k: $\to \int_r^s \left[\int_c^d \int_a^b f(x,y,z) dx\,dy\right] dz$.
6. Continuity ensures convergence to the triple integral.

**Teacher Narration** `[63w]`
> For those interested, here's a sketch of Fubini's theorem. We start with the triple Riemann sum and fix two variables, turning the inner sum into an integral over x. Then we integrate over y, and finally over z. The continuity of f guarantees that these limits can be interchanged and that the iterated integrals converge to the same value as the triple integral.

---

### Slide 13 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Check Your Understanding**  ·  `split_left_right`

**On-screen text** `[8w]`
Pause and decide: Which integral gives the volume?

**LEFT** `[concept]`

**Which integral setup correctly represents the volume of the tetrahedron bounded by $x=0,y=0,z=0$, $x+y+z=1$?**

A) $\int_0^1\int_0^1\int_0^1 dz\,dy\,dx$

B) $\int_0^1\int_0^{1-x}\int_0^{1-x-y} dz\,dy\,dx$

C) $\int_0^1\int_0^{1-z}\int_0^{1-y-z} dx\,dy\,dz$

D) Both B and C

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a 3D tetrahedron with vertices (0,0,0), (1,0,0), (0,1,0), (0,0,1). Show the plane x+y+z=1. Mark the axes. Optionally, shade the projection triangle on the xy-plane. No interactivity needed.

**Teacher Narration** `[62w]`
> Here's a quick test. Carefully look at the tetrahedron and its bounding planes. Which setup correctly captures the variable limits? Pause the video now and think about it. [pause] The correct answer is both B and C, because the region can be described in two different orders of integration. Option A has constant limits, which would give a cube, not a tetrahedron.

**Student Prompt:** Which integral setup correctly represents the volume of the tetrahedron?

---

### Slide 14 · [SUMMARY]
**Summary: What You've Learned**  ·  `full_width`

**On-screen text** `[12w]`
Triple integrals extend double integrals to 3D. Master the set-up, then evaluate.

**FULL WIDTH** `[concept]`

**Learning Objectives Revisited**

✅ Set up and evaluate triple integrals over rectangular boxes and general regions
✅ Interpret triple integrals as accumulation over 3D volume
✅ Choose optimal order of integration
✅ Apply triple integrals to compute volumes and center of mass

**Key Formulas**
- Triple integral: $\iiint f dV$
- Fubini: $\int_r^s\int_c^d\int_a^b f\,dx\,dy\,dz$
- Type 1 region: $\iint_D\int_{u_1}^{u_2} f\,dz\,dA$
- Volume: $\iiint_E 1\,dV$
- Center of mass: $(\bar{x},\bar{y},\bar{z}) = (M_x/M, M_y/M, M_z/M)$

**Teacher Narration** `[75w]`
> Congratulations! You've learned the core concept of triple integrals. You can set them up over boxes and general regions, choose the best order of integration, and apply them to compute volumes and physical quantities like center of mass. This powerful tool will appear again when we study cylindrical and spherical coordinates. Keep practicing with the examples provided. Remember that the key to success is carefully identifying the region and choosing the simplest order of integration.

---
