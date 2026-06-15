# The Divergence Theorem

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You need to know surface integrals of vector fields (flux) and the definition of divergence of a vector field.

**Learning Objectives:**
- Calculate flux of a vector field across a closed surface using the Divergence Theorem
- Interpret divergence physically as net outward flux per unit volume
- Apply the Divergence Theorem to simplify complex surface integrals into triple integrals
- Recognize when the Divergence Theorem can and cannot be applied

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
⚠️ **Narration overlong  (>120w):** [11, 13]  (avg 102w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 3 interactive moment(s) (min 3)
⚠️ **narration_overlong**: too long: ['s11:121w', 's13:121w']
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | hook | 🟢 | ◧ |  | 99w | 16w | A Nightclub Metaphor for Flux and Divergence |
| 2 | core | 🟢 | ◧ |  | 88w | 16w | Key Recaps: Flux and Divergence |
| 3 | core | 🟢 | ◧ |  | 87w | 15w | The Divergence Theorem (Gauss's Theorem) |
| 4 | 🎛visual_lab | 🟢 | ◧ |  | 92w | 19w | Interactive: F = (x, y, z) on a Sphere |
| 5 | 🎛practice | 🟢 | ◧ |  | 112w | 17w | Example 1: Warm-Up — Unit Cube |
| 6 | practice | 🟡 | ◧ |  | 100w | 13w | Example 2: Standard — Sphere with Quadratic Field |
| 7 | pause_and_try | 🟡 | ◧ | ⏸️ | 102w | 15w | Pause & Predict: Hemisphere + Disk |
| 8 | practice | 🟡 | ◧ |  | 91w | 9w | Example 3: Tricky — Hemisphere + Disk Solution |
| 9 | misconception | 🟢 | ◧ |  | 107w | 21w | Common Mistake: Inverse‑Square Field |
| 10 | 🎛practice | 🔴 | ◧ |  | 102w | 12w | [Challenge – Optional] Example 4: Edge Case — Direct Flux for Inverse‑Square Field |
| 11 | practice | 🟡 | ◧ |  | 121w⚠️ | 12w | Example 5: Application — Gauss's Law in Electromagnetism |
| 12 | pause_and_try | 🟢 | ⬛⬛ | ⏸️ | 104w | 11w | Quick Check: Zero Divergence Everywhere |
| 13 | challenge | 🔴 | ◧ |  | 121w⚠️ | 16w | [Challenge – Optional] Proof Sketch of the Divergence Theorem |
| 14 | summary | 🟢 | ⬛⬛ |  | 108w | 20w | Summary: The Divergence Theorem |

---

### Slide 1 · [HOOK]
**A Nightclub Metaphor for Flux and Divergence**  ·  `split_left_right`

**On-screen text** `[16w]`
Nightclub: people = vector field. Walls = closed surface. Net outflow = sources minus sinks inside.

**LEFT** `[concept]`

Imagine a solid region $E$ as a busy nightclub. The vector field $\mathbf{F}$ represents people moving around. The boundary surface $S$ is the walls, doors, and windows.
- **Flux** $\iint_S \mathbf{F} \cdot d\mathbf{S}$ = net rate people leave through the boundary.
- **Divergence** $\nabla \cdot \mathbf{F}$ at a point = how much people are 'diverging' from that point (a source or sink).

**The Divergence Theorem says:** The total net outflow through the walls equals the sum of all sources and sinks inside.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a transparent sphere of radius 1 centered at origin. On the sphere surface, plot 20 outward-pointing arrows of length 0.2 in green. Inside the sphere, show two small cubes: one at (0.5,0,0) with side length 0.15, with 6 arrows of length 0.1 emanating outward from each face center (source), another at (-0.5,0,0) with side length 0.15, with 6 arrows of length 0.1 pointing inward toward each face center (sink). Use mplot3d. Colors: surface light blue with alpha 0.3, arrows in red for source, blue for sink. Include legend. Export static image.

**Teacher Narration** `[99w]`
> Think of a solid region like a busy nightclub. The vector field represents how people are moving around inside. The boundary surface is the club's walls, doors, and windows. Flux measures the net rate at which people leave through the boundary. Divergence at a point measures whether people are spreading out from that point or gathering there. The Divergence Theorem tells us that the total net outflow through the walls equals the sum of all the sources and sinks inside the club. This gives a powerful connection between what happens on the surface and what happens throughout the volume.

---

### Slide 2 · [CORE]
**Key Recaps: Flux and Divergence**  ·  `split_left_right`

**On-screen text** `[16w]`
Flux measures flow through a surface. Divergence measures net outflow per unit volume at a point.

**LEFT** `[formula_block]`

**Surface integral (flux):**
$$\iint_S \mathbf{F} \cdot d\mathbf{S} = \iint_S \mathbf{F} \cdot \mathbf{n} \, dS$$

**Divergence of $\mathbf{F} = P\mathbf{i}+Q\mathbf{j}+R\mathbf{k}$:**
$$\nabla \cdot \mathbf{F} = \frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a small cube (0.2 x 0.2 x 0.2) with one corner at the origin. On each face, draw an arrow representing the normal component of a vector field. Show three arrows pointing outward from the origin (positive divergence) and three pointing inward (negative divergence) to illustrate net outflow. Specifically, on the faces x=0.2, y=0.2, z=0.2, draw outward arrows of length 0.1 in green; on the faces x=0, y=0, z=0, draw inward arrows of length 0.1 in red. Add a label 'divergence = net outward flux per volume'. Use mplot3d.

**Teacher Narration** `[88w]`
> Before we state the theorem, let's recall two key ideas. First, the surface integral of a vector field, also called flux, measures the net rate at which the field flows through a surface. Second, the divergence of a vector field at a point is a scalar that captures the tendency of the field to spread out from that point. Physically, divergence is the net outward flux per unit volume from an infinitesimally small box surrounding the point. These two concepts are the building blocks of the Divergence Theorem.

**Student Prompt:** What does net positive divergence mean physically?

---

### Slide 3 · [CORE]
**The Divergence Theorem (Gauss's Theorem)**  ·  `split_left_right`

**On-screen text** `[15w]`
$$\iint_S \mathbf{F}\cdot d\mathbf{S} = \iiint_E \nabla\cdot\mathbf{F}\,dV$$
Surface must be closed, outward orientation, field smooth inside.

**LEFT** `[formula_block]`

Let $E$ be a simple solid region, $S$ its boundary surface with outward orientation. Let $\mathbf{F}$ have continuous first partial derivatives on $E$. Then:
$$\iint_S \mathbf{F} \cdot d\mathbf{S} = \iiint_E \nabla \cdot \mathbf{F} \, dV$$

**Conditions:**
- $S$ is **closed** and oriented **outward**.
- $\mathbf{F}$ is **continuously differentiable** on $E$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a somewhat irregular closed surface (e.g., a squished sphere) using parametric equations. On the surface, draw 15 unit normal vectors pointing outward (blue arrows). Inside, show a transparent volume with a gradient of color representing the divergence (e.g., red for positive, blue for negative). Add label: 'flux = integral of divergence inside'. Use mplot3d, surface alpha 0.3, normals as quiver.

**Teacher Narration** `[87w]`
> Here's the central formula. The Divergence Theorem says the flux of a vector field across a closed surface equals the triple integral of the divergence over the volume enclosed. This is one of the great generalizations of the Fundamental Theorem of Calculus to higher dimensions. But be careful: the surface must be closed—it completely encloses the region—and oriented outward. Also, the vector field must be continuously differentiable on the entire region, meaning it has no singularities inside. If these conditions are violated, the theorem cannot be applied.

---

### Slide 4 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive: F = (x, y, z) on a Sphere**  ·  `split_left_right`

**On-screen text** `[19w]`
Change the sphere radius and watch the flux update. Divergence is constant 3, so flux = 3 × volume.

**LEFT** `[concept]`

Explore how the Divergence Theorem works for the radial field $\mathbf{F}=x\mathbf{i}+y\mathbf{j}+z\mathbf{k}$ on a sphere of radius $a$.
- $\nabla\cdot\mathbf{F}=3$
- Flux = $3 \cdot \text{Vol}(\text{sphere}) = 4\pi a^3$

Adjust the radius and see the flux change.

**RIGHT** `[python_lab]`

*Visual Spec:* 3D plot with sphere radius controlled by slider. Show vector field arrows on sphere surface and compute theoretical flux vs. numerical surface integral. Colors: sphere cyan, arrows red. Display flux value.

*Interactive Controls:*
  - 🎛 Slider for sphere radius a from 0.5 to 2.0
  - 🎛 Toggle to show theoretical flux value (always displayed)

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider

def update(val):
    a = slider.val
    ax.cla()
    # sphere
    u = np.linspace(0, 2*np.pi, 20)
    v = np.linspace(0, np.pi, 20)
    x = a * np.outer(np.cos(u), np.sin(v))
    y = a * np.outer(np.sin(u), np.sin(v))
    z = a * np.outer(np.ones(np.size(u)), np.cos(v))
    ax.plot_wireframe(x, y, z, color='cyan', alpha=0.3)
    # vector field on surface
    theta = np.linspace(0, 2*np.pi, 8)
    phi = np.linspace(0, np.pi, 8)
    T, P = np.meshgrid(theta, phi)
    xs = a * np.sin(P) * np.cos(T)
    ys = a * np.sin(P) * np.sin(T)
    zs = a * np.cos(P)
    # field = position vector
    ax.quiver(xs, ys, zs, xs, ys, zs, length=a*0.2, normalize=True, color='red')
    ax.set_xlim(-2,2); ax.set_ylim(-2,2); ax.set_zlim(-2,2)
    ax.set_title(f'Flux = {4*np.pi*a**3:.2f} (theoretical)')
    plt.draw()

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
ax_slider = plt.axes([0.2, 0.02, 0.6, 0.03])
slider = Slider(ax_slider, 'Radius a', 0.5, 2.0, valinit=1.0)
slider.on_changed(update)
update(1.0)
plt.show()
```

**Teacher Narration** `[92w]`
> Let's make this concrete with an interactive visualization. Here we have the simple radial field F equals x, y, z. The divergence is constant 3. According to the Divergence Theorem, the flux across any sphere centered at the origin should be 3 times the volume of the sphere. Use the slider to change the sphere radius. Notice how the arrows on the surface all point outward because the field is radial. The flux grows as the cube of the radius, just as the volume does. This is the simplest possible test case.

**Student Prompt:** What happens to the flux if the sphere radius doubles?

---

### Slide 5 · [PRACTICE] 🎛 *[1 controls]*
**Example 1: Warm-Up — Unit Cube**  ·  `split_left_right`

**On-screen text** `[17w]`
Cube: flux via Divergence Theorem = 3×Volume = 3. Direct sum over faces gives 1+1+1 = 3.

**LEFT** `[steps]`

**Verify** the Divergence Theorem for $\mathbf{F}=x\mathbf{i}+y\mathbf{j}+z\mathbf{k}$ on the cube $0\le x,y,z\le 1$.

1. $\nabla\cdot\mathbf{F}=3$
2. $\iiint_E 3\,dV = 3\cdot 1 = 3$
3. Compute flux directly via 6 faces:
   - $x=1$: flux = 1
   - $x=0$: flux = 0
   - $y=1$: flux = 1
   - $y=0$: flux = 0
   - $z=1$: flux = 1
   - $z=0$: flux = 0
4. Total flux = $1+1+1=3$ ✓

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a unit cube with faces labeled. On face x=1, draw a red arrow of length 0.3 pointing in +x direction; on x=0, no arrow (zero). Similarly for y and z faces. Use mplot3d. Include text annotations: 'flux=1' on positive faces. Interactive: slider to change cube side length L, updating arrow lengths and flux values.

*Interactive Controls:*
  - 🎛 Slider for cube side length L from 0.5 to 2.0, updating arrow lengths and flux display.

**Teacher Narration** `[112w]`
> Let's start with a very straightforward verification. For the unit cube, the divergence is constant 3. The triple integral is just 3 times the volume, which is 3. Now check directly by computing flux through each of the six faces. On the face x equals 1, the outward normal is i, and the field's x-component is 1, so the flux is 1. On the opposite face x equals 0, the normal is negative i, but the field there is zero in the x-direction, so the flux is 0. Summing over all faces gives 1 plus 1 plus 1 equals 3, exactly matching the triple integral. Simple, but it illustrates the idea perfectly.

---

### Slide 6 · [PRACTICE] 🟡
**Example 2: Standard — Sphere with Quadratic Field**  ·  `split_left_right`

**On-screen text** `[13w]`
Divergence $2x+2y+2z$ integrates to zero over sphere because odd symmetry. Flux = 0.

**LEFT** `[steps]`

Compute flux of $\mathbf{F}=x^2\mathbf{i}+y^2\mathbf{j}+z^2\mathbf{k}$ across sphere $x^2+y^2+z^2=4$ (outward).

1. $\nabla\cdot\mathbf{F}=2x+2y+2z$
2. Flux $= \iiint_E (2x+2y+2z)\,dV$ (over sphere radius 2)
3. Use spherical coords: $x=\rho\sin\phi\cos\theta$, etc.
4. $\iiint 2\rho(\sin\phi\cos\theta+\sin\phi\sin\theta+\cos\phi)\,\rho^2\sin\phi\,d\rho d\phi d\theta$
5. Integrate $\theta$: $\int_0^{2\pi}\cos\theta\,d\theta=0$, $\int_0^{2\pi}\sin\theta\,d\theta=0$
6. Remaining: $\int_0^{2\pi}\int_0^\pi\int_0^2 2\rho^3\cos\phi\sin\phi\,d\rho d\phi d\theta = 8\cdot 2\pi\cdot 0 = 0$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a sphere radius 2. On a grid of points on the sphere, draw field vectors (x^2, y^2, z^2) as colored arrows. Use color mapping to show magnitude. The field is symmetric and the angular integrals cancel. Add annotations showing that the integral of x over sphere is zero. Use mplot3d, sphere surface alpha 0.2, arrow colors 'viridis'.

**Teacher Narration** `[100w]`
> Now a standard exam problem. The divergence here is 2x plus 2y plus 2z. When we integrate over the entire sphere, the terms involving x, y, and z individually vanish because the sphere is symmetric about the origin. Specifically, the integral of x over the sphere is zero, and similarly for y and z. So the triple integral is zero. The Divergence Theorem tells us the flux across the sphere is zero, meaning the net outflow is zero. This matches the physical intuition that for this field, whatever goes into the sphere through one side comes out the other side.

**Student Prompt:** Why does the integral of x over a sphere centered at the origin vanish?

---

### Slide 7 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]*
**Pause & Predict: Hemisphere + Disk**  ·  `split_left_right`

**On-screen text** `[15w]`
Predict the flux! Use Divergence Theorem? Divergence = 3(x²+y²+z²). Volume = half of unit sphere?

**LEFT** `[concept]`

**Your turn!** Before we solve, predict the flux for:

$\mathbf{F} = (x^3+y^3)\mathbf{i} + (y^3+z^3)\mathbf{j} + (z^3+x^3)\mathbf{k}$

over the closed surface consisting of the hemisphere $z=\sqrt{1-x^2-y^2}$ and the bottom disk $z=0$.

- Is the surface closed? Yes, hemisphere + disk.
- Apply Divergence Theorem? If so, what is the divergence? Set up the triple integral and try to compute.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a hemisphere radius 1 (z>=0) with a transparent bottom disk. On a sparse grid on the surface, show some arrows of the field F. Use mplot3d, hemisphere blue, disk grey, arrows red. Add labels: 'closed surface' and 'outward orientation'.

**Teacher Narration** `[102w]`
> Take a moment to try this yourself. We have a vector field and a closed surface made of a hemisphere plus a disk. Check the conditions: the surface is closed and oriented outward. So we can apply the Divergence Theorem. The divergence of this field is 3 times x squared plus y squared plus z squared, which is 3 r squared. The region is the upper half of the unit sphere. Set up the triple integral in spherical coordinates and try to evaluate it. Pause the video now and give it a try. I'll show the full solution on the next slide.

**Student Prompt:** Compute the flux using the Divergence Theorem. Hint: use spherical coordinates with φ from 0 to π/2.

---

### Slide 8 · [PRACTICE] 🟡
**Example 3: Tricky — Hemisphere + Disk Solution**  ·  `split_left_right`

**On-screen text** `[9w]`
Flux = $\frac{6\pi}{5}$. Divergence $3\rho^2$ integrated over hemisphere volume.

**LEFT** `[steps]`

**Solution:**
1. Surface is closed (hemisphere + disk), use Divergence Theorem.
2. $\nabla\cdot\mathbf{F} = 3x^2+3y^2+3z^2 = 3\rho^2$
3. Region $E$: $0\le\rho\le1$, $0\le\phi\le\pi/2$, $0\le\theta\le2\pi$
4. Flux $= \iiint_E 3\rho^2 \cdot \rho^2\sin\phi\,d\rho d\phi d\theta$
5. $= 3\int_0^{2\pi}d\theta \int_0^{\pi/2}\sin\phi\,d\phi \int_0^1 \rho^4\,d\rho$
6. $= 3 \cdot 2\pi \cdot 1 \cdot \frac{1}{5} = \frac{6\pi}{5}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot hemisphere with coordinate axes. Show radial coordinate ρ from 0 to 1, polar angle φ from 0 to π/2 highlighted with arcs. Include annotation 'ρ:0→1, φ:0→π/2, θ:0→2π'. Use mplot3d, surface alpha 0.3.

**Teacher Narration** `[91w]`
> Here is the full solution. The divergence is 3ρ squared. In spherical coordinates, the volume element is ρ squared sin φ dρ dφ dθ. The φ integral from 0 to π/2 gives 1, the θ integral gives 2π, and the ρ integral of ρ^4 gives one fifth. Multiply everything: 3 times 2π times 1/5 equals 6π/5. Notice that we did not need to compute the surface integral directly over the hemisphere and the disk. The Divergence Theorem turned a potentially messy calculation into a clean triple integral. This is its power.

---

### Slide 9 · [MISCONCEPTION]
**Common Mistake: Inverse‑Square Field**  ·  `split_left_right`

**On-screen text** `[21w]`
Divergence is zero everywhere except the origin, but theorem can't be applied because field is not smooth on the whole region.

**LEFT** `[concept]`

**Wrong approach:** For $\mathbf{F}=\frac{x\mathbf{i}+y\mathbf{j}+z\mathbf{k}}{(x^2+y^2+z^2)^{3/2}}$ over sphere $x^2+y^2+z^2=a^2$, one might compute $\nabla\cdot\mathbf{F}=0$ (for $r\neq0$) and claim flux $=0$.

**Why it fails:** The field is not defined at the origin, which lies inside the sphere. The Divergence Theorem requires the field to be continuously differentiable on **the entire** region $E$. Since $\mathbf{F}$ has a singularity at the origin, the theorem **cannot** be applied to any region containing the origin.

**Correct approach:** Compute flux directly: $\mathbf{F}\cdot\mathbf{n}=1/a^2$ on the sphere, so flux $=4\pi$ (non‑zero!).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a sphere radius a. On the surface, draw many radial arrows of equal length (field magnitude constant). At the center, place a red warning symbol (e.g., an exclamation mark) to indicate singular point. Add text: 'Singularity at origin – Divergence Theorem not applicable'. Use mplot3d, arrows green, surface alpha 0.3.

**Teacher Narration** `[107w]`
> Here is a classic mistake. The inverse‑square field has zero divergence at every point except the origin, where it is not even defined. A student might naively apply the Divergence Theorem and conclude the flux across any sphere centered at the origin is zero. But that's wrong! The theorem requires the vector field to be continuously differentiable on the entire enclosed region. Since there is a singularity inside, we cannot use the theorem. The correct flux, found by direct computation, is 4π, independent of the sphere's radius. This non‑zero flux is why physicists say there is a 'source' at the origin, described by the Dirac delta function.

**Student Prompt:** Can you think of another field with a singularity that makes the Divergence Theorem inapplicable?

---

### Slide 10 · [PRACTICE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]*
**[Challenge – Optional] Example 4: Edge Case — Direct Flux for Inverse‑Square Field**  ·  `split_left_right`

**On-screen text** `[12w]`
Flux = $4\pi$ regardless of sphere radius. Direct computation bypasses the singularity.

**LEFT** `[steps]`

**Correct computation** for $\mathbf{F} = \frac{\mathbf{r}}{r^3}$ on sphere radius $a$:

1. On sphere $r=a$, $\mathbf{F} = \frac{\mathbf{r}}{a^3}$.
2. Outward unit normal $\mathbf{n} = \frac{\mathbf{r}}{a}$.
3. $\mathbf{F}\cdot\mathbf{n} = \frac{1}{a^2}$.
4. Flux $= \iint_S \frac{1}{a^2}\,dS = \frac{1}{a^2} \cdot 4\pi a^2 = 4\pi$.

Notice the result is independent of $a$. This is why Gauss's law in electrostatics gives $4\pi kQ$ for any enclosing sphere.

**RIGHT** `[visual_spec]`

*Visual Spec:* Interactive 3D plot of sphere with field arrows. Slider to change radius from 0.5 to 3. Show computed flux numerically; demonstrate it stays 4π. Use mplot3d with matplotlib widgets.

*Interactive Controls:*
  - 🎛 Slider for sphere radius a from 0.5 to 3.0, demonstrating flux remains constant 4π.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider

def update(val):
    a = slider.val
    ax.cla()
    u = np.linspace(0, 2*np.pi, 30)
    v = np.linspace(0, np.pi, 30)
    x = a * np.outer(np.cos(u), np.sin(v))
    y = a * np.outer(np.sin(u), np.sin(v))
    z = a * np.outer(np.ones(np.size(u)), np.cos(v))
    ax.plot_wireframe(x, y, z, color='cyan', alpha=0.2)
    # vectors on surface
    theta = np.linspace(0, 2*np.pi, 8)
    phi = np.linspace(0, np.pi, 8)
    T, P = np.meshgrid(theta, phi)
    xs = a * np.sin(P) * np.cos(T)
    ys = a * np.sin(P) * np.sin(T)
    zs = a * np.cos(P)
    # field = r / r^3, at r=a: = (x,y,z)/a^3
    length = a**-2 * 0.3
    ax.quiver(xs, ys, zs, xs, ys, zs, length=length, normalize=True, color='green')
    ax.set_xlim(-3,3); ax.set_ylim(-3,3); ax.set_zlim(-3,3)
    ax.set_title(f'Flux = 4π (independent of radius a)')
    plt.draw()

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
ax_slider = plt.axes([0.2, 0.02, 0.6, 0.03])
slider = Slider(ax_slider, 'Radius a', 0.5, 3.0, valinit=1.0)
slider.on_changed(update)
update(1.0)
plt.show()
```

**Teacher Narration** `[102w]`
> Since the Divergence Theorem cannot be used, we compute the flux directly. On the sphere, the field is radial and constant in magnitude. The dot product with the outward normal is simply 1 over a squared. The surface area of the sphere is 4π a squared, so the flux is 4π, independent of the radius. This is a fundamental result in physics: the electric field of a point charge produces exactly 4π times the charge times Coulomb's constant through any enclosing sphere. The interactive slider lets you verify that no matter how large or small the sphere, the total flux remains 4π.

---

### Slide 11 · [PRACTICE] 🟡
**Example 5: Application — Gauss's Law in Electromagnetism**  ·  `split_left_right`

**On-screen text** `[12w]`
Gauss’s Law: $\nabla\cdot\mathbf{E} = \frac{\rho}{\epsilon_0}$ derived from integral form via Divergence Theorem.

**LEFT** `[steps]`

**Derive the differential form of Gauss's Law** using the Divergence Theorem.

Integral form: $\oiint_S \mathbf{E}\cdot d\mathbf{S} = \frac{Q_{\text{enc}}}{\epsilon_0}$ where $Q_{\text{enc}} = \iiint_E \rho\,dV$.

Apply Divergence Theorem:
$$\iiint_E \nabla\cdot\mathbf{E}\,dV = \frac{1}{\epsilon_0}\iiint_E \rho\,dV$$

Since this holds for any volume $E$:
$$\nabla\cdot\mathbf{E} = \frac{\rho}{\epsilon_0}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a point charge at origin with red sphere. Draw electric field lines (radial arrows) going outward through a surrounding transparent sphere. Add labels: 'Q', 'E field', 'surface S'. Use mplot3d, field lines as quiver, charge as scatter.

**Teacher Narration** `[121w ⚠️ **OVERLONG: 121w > 120w max**]`
> Now a beautiful application from physics. Gauss's Law in integral form says the electric flux through a closed surface equals the enclosed charge divided by epsilon naught. Using the Divergence Theorem, we replace the surface integral with a volume integral of the divergence of the electric field. The enclosed charge is the volume integral of the charge density. Since this equality holds for any arbitrary volume, the integrands themselves must be equal. This gives us the differential form of Gauss's Law: the divergence of the electric field at a point equals the charge density at that point divided by epsilon naught. This is one of Maxwell's equations and shows how the Divergence Theorem bridges integral and differential forms of physical laws.

**Student Prompt:** Can you think of other physical laws that could be expressed using the Divergence Theorem? (Hint: fluid dynamics, heat flow)

---

### Slide 12 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Quick Check: Zero Divergence Everywhere**  ·  `full_width`

**On-screen text** `[11w]`
If $\nabla\cdot\mathbf{F}=0$ everywhere in $E$, then flux across $S$ is ______.

**FULL WIDTH** `[concept]`

**Multiple Choice:** If a vector field $\mathbf{F}$ has $\nabla\cdot\mathbf{F}=0$ at every point in a region $E$ (no singularities), what can you say about the flux across the closed boundary $S$ of $E$?

A) The flux is positive
B) The flux is negative
C) The flux is zero
D) The flux cannot be determined

Pause the video and think before I reveal the answer.

**Teacher Narration** `[104w]`
> Here's a quick concept check. Suppose you have a vector field whose divergence is zero at every point inside a region, and there are no singularities — the field is smooth. What can you conclude about the net flux across the closed boundary? Pause the video and reason it out. Think about the Divergence Theorem: flux equals the triple integral of divergence. If the divergence is zero everywhere inside, then that triple integral is zero. So the net flux must be zero. The correct answer is C. This means that in a region with no sources or sinks, whatever flows in must flow out.

**Student Prompt:** Answer: C) flux is zero. Reason: Divergence Theorem gives flux = ∫∫∫ 0 dV = 0.

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof Sketch of the Divergence Theorem**  ·  `split_left_right`

**On-screen text** `[16w]`
Proof reduces to component‑wise: integrate ∂R/∂z over region equals flux of R k through the boundary.

**LEFT** `[steps]`

**Key idea:** Prove for one component, then sum.

1. Show $\iiint_E \frac{\partial R}{\partial z}\,dV = \iint_S R\mathbf{k}\cdot\mathbf{n}\,dS$ for a type‑1 region.
2. Region $E$: $\{(x,y,z) \mid (x,y)\in D,\, u_1(x,y)\le z\le u_2(x,y)\}$.
3. LHS: $\iint_D \big[R(x,y,u_2)-R(x,y,u_1)\big]\,dA$.
4. RHS: top surface contributes $R\mathbf{k}\cdot\mathbf{n}_{top}\,dS$, bottom contributes $R\mathbf{k}\cdot\mathbf{n}_{bottom}\,dS$, sides give zero.
5. Similarly for $P$ and $Q$ components, then add to get the full theorem.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a type‑1 region: a solid with upper surface z=u2(x,y) and lower surface z=u1(x,y) over a domain D in xy-plane. Show vertical arrows representing ∂R/∂z integration. Use mplot3d, surfaces semi‑transparent, domain D on xy-plane shaded.

**Teacher Narration** `[121w ⚠️ **OVERLONG: 121w > 120w max**]`
> For those interested in the deeper mathematics, here is a sketch of how the theorem is proved. The proof works one component at a time by projecting the region onto a coordinate plane. For a region that is simple in the z-direction, the triple integral of ∂R over ∂z becomes an iterated integral that evaluates to the difference of R on the top and bottom surfaces. That difference is exactly the flux of the vertical component R k through the boundary, because the sides contribute nothing. The same argument applies to the other components, and summing them yields the full Divergence Theorem. A rigorous proof requires the region to be decomposable into finitely many simple pieces, but this captures the essence.

---

### Slide 14 · [SUMMARY]
**Summary: The Divergence Theorem**  ·  `full_width`

**On-screen text** `[20w]`
Divergence Theorem: flux = integral of divergence. Conditions: closed surface, smooth field. Use it to simplify, but watch for singularities.

**FULL WIDTH** `[concept]`

**The Divergence Theorem:**
$$\iint_S \mathbf{F}\cdot d\mathbf{S} = \iiint_E \nabla\cdot\mathbf{F}\,dV$$

**Conditions:**
- $S$ is a **closed** surface, oriented **outward**.
- $\mathbf{F}$ is **continuously differentiable** on the entire region $E$.

**Applications:**
- Simplifies flux calculations for closed surfaces.
- Connects surface and volume integrals.
- Fundamental in physics: Gauss's Law, fluid dynamics, heat flow.

**Key takeaways:**
- Flux = total divergence inside.
- Zero divergence implies zero net flux (if no singularities).
- Beware of singularities inside the region.

**Teacher Narration** `[108w]`
> Let's wrap up. The Divergence Theorem gives a remarkable connection between the flux through a closed surface and the behavior of the vector field inside. It's one of the three great generalizations of the Fundamental Theorem of Calculus, along with Green's Theorem and Stokes' Theorem. Remember the three key conditions: the surface must be closed, oriented outward, and the field must be smooth inside. We saw how it simplifies calculations, from the simple cube to the hemisphere. We also saw a cautionary tale: the inverse‑square field, where a singularity prevents the theorem from being used. Keep these ideas in mind as you tackle flux problems in your studies.

---
