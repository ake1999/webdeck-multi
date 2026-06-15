# Parametric Surfaces and Surface Integrals

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You already know double integrals over flat regions, parametric curves, and cross products.

**Learning Objectives:**
- Parametrize common surfaces (spheres, cylinders, cones, planes)
- Compute surface area using parametric representations
- Evaluate scalar surface integrals over curved surfaces
- Calculate flux integrals (vector surface integrals) through oriented surfaces
- Apply surface integrals to compute physical quantities like fluid flow

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 70w)
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
⚠️ **visual_specs**: missing on slides: [1]
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
| 1 | hook | 🟢 | ◧ |  | 69w | 16w | Why Surface Integrals? |
| 2 | 🎛core | 🟢 | ◧ |  | 79w | 13w | Parametric Surfaces: The Idea |
| 3 | 🎛visual_lab | 🟢 | ◧ |  | 78w | 16w | Surface Area Element $dS$ |
| 4 | core | 🟢 | ◧ |  | 66w | 11w | Scalar Surface Integral Formula |
| 5 | practice | 🟢 | ⬛⬛ |  | 61w | 17w | Example 1: Surface Area of a Cylinder (Warm-Up) |
| 6 | practice | 🟢 | ⬛⬛ |  | 62w | 17w | Example 2: Scalar Integral Over a Cone (Standard) |
| 7 | core | 🟢 | ◧ |  | 70w | 13w | Vector Surface Integral (Flux) |
| 8 | core | 🟡 | ⬛⬛ | ⏸️ | 77w | 14w | Example 3: Flux Through a Sphere (Tricky) |
| 9 | misconception | 🟡 | ◧ |  | 77w | 19w | Misconception: Orientation Reversal in Flux |
| 10 | practice | 🟢 | ⬛⬛ |  | 61w | 19w | Example 4: Flat Surface (Edge Case) |
| 11 | practice | 🟡 | ⬛⬛ |  | 65w | 18w | Example 5: Flux Through a Cylinder (Application) |
| 12 | 🎛visual_lab | 🟡 | ◧ |  | 70w | 15w | Interactive Flux Visualization |
| 13 | summary | 🟢 | ⬛⬛ |  | 84w | 7w | Summary: Surface Integrals |
| 14 | challenge | 🔴 | ◧ |  | 60w | 14w | [Challenge – Optional] Flux Through a Torus |

---

### Slide 1 · [HOOK]
**Why Surface Integrals?**  ·  `split_left_right`

**On-screen text** `[16w]`
Surface integrals add up quantities on curved surfaces. Scalar: paint thickness. Vector: flow through a net.

**LEFT** `[text]`

**Scalar:** Imagine spray-painting a curved sculpture. The paint thickness $f(x,y,z)$ differs per patch. The total paint is $\iint_S f\,dS$.

**Vector:** Wind blows through a fishing net. The net's orientation matters. Flux $\iint_S \mathbf{F}\cdot d\mathbf{S}$ measures net flow through the surface.

**RIGHT** `[image_description]`

**Teacher Narration** `[69w]`
> Think of spray-painting a curved sculpture. Each area patch receives a certain thickness of paint. To find the total paint used, you integrate that thickness over the curved surface. That's a scalar surface integral. Now imagine wind blowing through a fishing net—how much air passes through depends on the net's orientation. That's a flux integral, a vector surface integral. Both are natural extensions of double integrals to curved surfaces.

---

### Slide 2 · [CORE] 🎛 *[2 controls]*
**Parametric Surfaces: The Idea**  ·  `split_left_right`

**On-screen text** `[13w]`
A parametric surface is a vector function $\mathbf{r}(u,v)$ over a 2D domain $D$.

**LEFT** `[concept]`

A **parametric surface** is a vector function of two parameters:
$$\mathbf{r}(u,v) = (x(u,v), y(u,v), z(u,v))$$
As $(u,v)$ varies over a domain $D$, $\mathbf{r}(u,v)$ traces out the surface.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a sphere of radius 1 using spherical coordinates: r(phi,theta) = (sin(phi)*cos(theta), sin(phi)*sin(theta), cos(phi)). Show the surface as a wireframe with grid lines. Use sliders for phi0 and theta0 to highlight a specific point and show the coordinate curves. Color the point red. Include axis labels x,y,z and title 'Parametric Sphere'. Set phi range 0 to pi, theta 0 to 2pi.

*Interactive Controls:*
  - 🎛 Slider for $\\phi_0$ (0 to pi)
  - 🎛 Slider for $\\theta_0$ (0 to 2pi)

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider

# Create sphere data
phi = np.linspace(0, np.pi, 30)
theta = np.linspace(0, 2*np.pi, 30)
phi, theta = np.meshgrid(phi, theta)
x = np.sin(phi)*np.cos(theta)
y = np.sin(phi)*np.sin(theta)
z = np.cos(phi)

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
ax.plot_surface(x, y, z, alpha=0.6, cmap='viridis', edgecolor='gray', linewidth=0.3)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
ax.set_title('Parametric Sphere')
ax.set_xlim(-1.2,1.2)
ax.set_ylim(-1.2,1.2)
ax.set_zlim(-1.2,1.2)

# Slider for phi0
ax_phi = plt.axes([0.2, 0.01, 0.65, 0.03])
slider_phi = Slider(ax_phi, '$\\phi_0$', 0.1, np.pi-0.1, valinit=np.pi/2)
ax_theta = plt.axes([0.2, 0.06, 0.65, 0.03])
slider_theta = Slider(ax_theta, '$\\theta_0$', 0, 2*np.pi, valinit=0)

point_plot, = ax.plot([], [], [], 'ro', markersize=8)
u_curve, = ax.plot([], [], [], 'r-', alpha=0.8, linewidth=2)
v_curve, = ax.plot([], [], [], 'b-', alpha=0.8, linewidth=2)

def update(val):
    phi0 = slider_phi.val
    theta0 = slider_theta.val
    # Point
    x0 = np.sin(phi0)*np.cos(theta0)
    y0 = np.sin(phi0)*np.sin(theta0)
    z0 = np.cos(phi0)
    point_plot.set_data([x0], [y0])
    point_plot.set_3d_properties([z0])
    # u-curve (constant phi)
    u_theta = np.linspace(0, 2*np.pi, 50)
    u_x = np.sin(phi0)*np.cos(u_theta)
    u_y = np.sin(phi0)*np.sin(u_theta)
    u_z = np.full_like(u_theta, np.cos(phi0))
    u_curve.set_data(u_x, u_y)
    u_curve.set_3d_properties(u_z)
    # v-curve (constant theta)
    v_phi = np.linspace(0, np.pi, 50)
    v_x = np.sin(v_phi)*np.cos(theta0)
    v_y = np.sin(v_phi)*np.sin(theta0)
    v_z = np.cos(v_phi)
    v_curve.set_data(v_x, v_y)
    v_curve.set_3d_properties(v_z)
    fig.canvas.draw_idle()

slider_phi.on_changed(update)
slider_theta.on_changed(update)
update(None)
plt.show()
```

**Teacher Narration** `[79w]`
> A parametric surface is like a map from a flat 2D region into 3D space. Each pair of parameters—think of them like coordinates on a stamp—gives one point on the surface. As you vary the parameters, the stamp moves and paints the whole surface. On this sphere, $\phi$ is the polar angle from the north pole and $\theta$ is the azimuth. Use the sliders to see how changing these parameters traces out grid lines and highlights a specific point.

---

### Slide 3 · [VISUAL_LAB] 🎛 *[2 controls]*
**Surface Area Element $dS$**  ·  `split_left_right`

**On-screen text** `[16w]`
Area element: $dS = |\mathbf{r}_u \times \mathbf{r}_v|\,du\,dv$. The cross product magnitude gives the local area scaling.

**LEFT** `[concept]`

At each point, the tangent vectors $\mathbf{r}_u$ and $\mathbf{r}_v$ form a small parallelogram. Its area is:
$$dS = |\mathbf{r}_u \times \mathbf{r}_v|\,du\,dv$$
This is the **surface area element**.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot the saddle surface z = x^2 - y^2 for x,y in [-1,1]. Use sliders to choose a point (u0,v0). Show the point, the two tangent vectors r_u and r_v (red and blue arrows), and the cross product vector n (green arrow, scaled to show direction). Also display the numerical value of |r_u x r_v| as a text annotation.

*Interactive Controls:*
  - 🎛 Slider for $u_0$ (-0.9 to 0.9)
  - 🎛 Slider for $v_0$ (-0.9 to 0.9)

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider

# Surface: r(u,v) = (u, v, u^2 - v^2)
def r(u,v):
    return np.array([u, v, u**2 - v**2])
def ru(u,v):
    return np.array([1, 0, 2*u])
def rv(u,v):
    return np.array([0, 1, -2*v])

# Mesh
u = np.linspace(-1, 1, 20)
v = np.linspace(-1, 1, 20)
U, V = np.meshgrid(u, v)
X = U
Y = V
Z = U**2 - V**2

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
ax.plot_surface(X, Y, Z, alpha=0.4, cmap='coolwarm', edgecolor='gray', linewidth=0.3)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
ax.set_xlim(-1.2,1.2)
ax.set_ylim(-1.2,1.2)
ax.set_zlim(-1.2,1.2)

# Sliders
ax_u = plt.axes([0.2, 0.01, 0.65, 0.03])
slider_u = Slider(ax_u, '$u_0$', -0.9, 0.9, valinit=0.5)
ax_v = plt.axes([0.2, 0.06, 0.65, 0.03])
slider_v = Slider(ax_v, '$v_0$', -0.9, 0.9, valinit=0.5)

# Initial quivers
point = r(0.5,0.5)
ru_vec = ru(0.5,0.5)
rv_vec = rv(0.5,0.5)
cross = np.cross(ru_vec, rv_vec)

quiver_u = ax.quiver(point[0], point[1], point[2], ru_vec[0], ru_vec[1], ru_vec[2], color='red', length=0.3, label='r_u')
quiver_v = ax.quiver(point[0], point[1], point[2], rv_vec[0], rv_vec[1], rv_vec[2], color='blue', length=0.3, label='r_v')
quiver_n = ax.quiver(point[0], point[1], point[2], cross[0], cross[1], cross[2], color='green', length=0.3, label='n = r_u x r_v')
ax.legend()

# Text annotation for magnitude
text = ax.text2D(0.7, 0.9, '', transform=ax.transAxes)

def update(val):
    u0 = slider_u.val
    v0 = slider_v.val
    point = r(u0,v0)
    ru_vec = ru(u0,v0)
    rv_vec = rv(u0,v0)
    cross = np.cross(ru_vec, rv_vec)
    mag = np.linalg.norm(cross)
    # Update quivers: remove old, add new
    global quiver_u, quiver_v, quiver_n
    ax.collections.remove(quiver_u)
    ax.collections.remove(quiver_v)
    ax.collections.remove(quiver_n)
    quiver_u = ax.quiver(point[0], point[1], point[2], ru_vec[0], ru_vec[1], ru_vec[2], color='red', length=0.3)
    quiver_v = ax.quiver(point[0], point[1], point[2], rv_vec[0], rv_vec[1], rv_vec[2], color='blue', length=0.3)
    quiver_n = ax.quiver(point[0], point[1], point[2], cross[0], cross[1], cross[2], color='green', length=0.3)
    text.set_text(f'|r_u x r_v| = {mag:.3f}')
    fig.canvas.draw_idle()

slider_u.on_changed(update)
slider_v.on_changed(update)
update(None)
plt.show()
```

**Teacher Narration** `[78w]`
> The surface area element is the heart of surface integrals. At each point on the surface, the two partial derivative vectors define a tiny parallelogram. Its area is the magnitude of their cross product. So to integrate a function over the surface, we weight it by this local area factor. Use the sliders to move the point and see how the tangent vectors and the area magnitude change—notice it's not constant on a curved surface like this saddle.

**Student Prompt:** What happens to the area element as you move to the center of the saddle? Why?

---

### Slide 4 · [CORE]
**Scalar Surface Integral Formula**  ·  `split_left_right`

**On-screen text** `[11w]`
Scalar surface integral: integrate the function weighted by the area element.

**LEFT** `[formula_block]`

**Definition:**
$$\iint_S f(x,y,z)\,dS = \iint_D f(\mathbf{r}(u,v))\,|\mathbf{r}_u \times \mathbf{r}_v|\,du\,dv$$

**Special case (graph $z=g(x,y)$):**
$$dS = \sqrt{1 + g_x^2 + g_y^2}\,dx\,dy$$
$$\iint_S f\,dS = \iint_D f(x,y,g(x,y))\sqrt{1+g_x^2+g_y^2}\,dx\,dy$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a flat rectangular domain D in the uv-plane with a grid. Then show the surface S in 3D with a corresponding distorted grid (like a curved rectangle). Highlight one small patch: a rectangle in D maps to a curved parallelogram on S, and label its area as dS = |r_u x r_v| du dv.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(12,5))

# Left: domain D
ax1 = fig.add_subplot(121)
u = np.linspace(0,1,5)
v = np.linspace(0,1,5)
for i in u:
    ax1.plot([i,i], [0,1], 'k-', lw=0.5)
for j in v:
    ax1.plot([0,1], [j,j], 'k-', lw=0.5)
ax1.fill_between([0.4,0.6], 0.4, 0.6, alpha=0.3, color='red')
ax1.text(0.5,0.5, '$du\,dv$', ha='center', va='center')
ax1.set_xlim(0,1); ax1.set_ylim(0,1)
ax1.set_title('Domain $D$')
ax1.set_xlabel('u'); ax1.set_ylabel('v')
ax1.set_aspect('equal')

# Right: surface S (a curved rectangle / saddle mapping)
# Use a parametrization that maps a rectangle to a curved surface: r(u,v) = (u, v, u^2 - v^2) for u,v in [0,1]
u = np.linspace(0,1,10)
v = np.linspace(0,1,10)
U, V = np.meshgrid(u, v)
X = U
Y = V
Z = U**2 - V**2

ax2 = fig.add_subplot(122, projection='3d')
ax2.plot_surface(X, Y, Z, alpha=0.5, cmap='coolwarm', edgecolor='gray', linewidth=0.3)
# highlight a patch
patch_u = [0.4, 0.6, 0.6, 0.4]
patch_v = [0.4, 0.4, 0.6, 0.6]
patch_x = patch_u
patch_y = patch_v
patch_z = [u**2 - v**2 for u,v in zip(patch_u, patch_v)]
ax2.plot(patch_x, patch_y, patch_z, 'r-', lw=2)
ax2.scatter(patch_x, patch_y, patch_z, color='red')
ax2.text(0.5, 0.5, 0.2, '$dS$', color='red')
ax2.set_xlabel('x'); ax2.set_ylabel('y'); ax2.set_zlabel('z')
ax2.set_title('Surface $S$')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[66w]`
> The scalar surface integral works like a double integral, but instead of $dx\,dy$, we use the surface area element $|\mathbf{r}_u \times \mathbf{r}_v|\,du\,dv$. You first parametrize the surface, then substitute the parametrization into the function, multiply by the cross-product magnitude, and integrate over the parameter domain. There's also a convenient special case when the surface is a graph of a function $z=g(x,y)$; then $dS$ simplifies to $\sqrt{1+g_x^2+g_y^2}\,dx\,dy$.

---

### Slide 5 · [PRACTICE]
**Example 1: Surface Area of a Cylinder (Warm-Up)**  ·  `full_width`

**On-screen text** `[17w]`
Warm-up: Surface area of a cylinder. Step through the parametrization, tangent vectors, cross product, magnitude, then integrate.

**FULL WIDTH** `[steps]`

**Problem:** Find the lateral surface area of the cylinder $x^2+z^2=4$, $0\leq y\leq 3$.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Parametrize: $\mathbf{r}(u,v)=(2\cos u,\,v,\,2\sin u)$, $0\leq u\leq2\pi$, $0\leq v\leq3$ | $u$ = angle, $v$ = height |
| 2 | $\mathbf{r}_u=(-2\sin u,0,2\cos u)$, $\mathbf{r}_v=(0,1,0)$ | Partial derivatives |
| 3 | $\mathbf{r}_u\times\mathbf{r}_v = (-2\cos u,\,0,\,-2\sin u)$ (check determinant) | Cross product |
| 4 | $|\mathbf{r}_u\times\mathbf{r}_v| = \sqrt{4\cos^2 u+4\sin^2 u}=2$ | Constant magnitude |
| 5 | $A = \iint_D 2\,du\,dv = \int_0^{2\pi}\int_0^3 2\,dv\,du = 12\pi$ | Area = $2\pi r h = 12\pi$ ✓ |

**Answer: $12\pi$ square units**

**Teacher Narration** `[61w]`
> Let's start with a simple warm-up: the lateral surface area of a cylinder. We parametrize using angle and height. The partial derivatives lead to a constant cross-product magnitude of 2, which makes sense because the cylinder has uniform curvature. Integrating over the domain gives $12\pi$, exactly $2\pi r h$ as expected. Always check your answer with a known formula when possible.

---

### Slide 6 · [PRACTICE]
**Example 2: Scalar Integral Over a Cone (Standard)**  ·  `full_width`

**On-screen text** `[17w]`
Scalar integral over a cone. The area element $dS = \sqrt{2}\,dx\,dy$ because the cone has constant slope.

**FULL WIDTH** `[steps]`

**Problem:** Evaluate $\iint_S (x^2+y^2)\,dS$ where $S$ is the cone $z=\sqrt{x^2+y^2}$, $0\leq z\leq 4$.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Parametrize as graph: $z=g(x,y)=\sqrt{x^2+y^2}$ over disk $x^2+y^2\leq 16$ | Use $x,y$ as parameters |
| 2 | $g_x = \frac{x}{\sqrt{x^2+y^2}},\; g_y = \frac{y}{\sqrt{x^2+y^2}}$ | Partial derivatives |
| 3 | $dS = \sqrt{1+g_x^2+g_y^2}\,dx\,dy = \sqrt{2}\,dx\,dy$ | Simplifies nicely |
| 4 | $\iint_S (x^2+y^2)\,dS = \sqrt{2}\iint_D (x^2+y^2)\,dx\,dy$ | Set up integral |
| 5 | Convert to polar: $r^2 = x^2+y^2$, $dx\,dy=r\,dr\,d\theta$, $0\leq r\leq 4$, $0\leq\theta\leq2\pi$ | Polar coordinates |
| 6 | $\sqrt{2}\int_0^{2\pi}\int_0^4 r^2\cdot r\,dr\,d\theta = \sqrt{2}\int_0^{2\pi}\left[\frac{r^4}{4}\right]_0^4 d\theta = \sqrt{2}\int_0^{2\pi} 64\,d\theta = 128\pi\sqrt{2}$ | Final answer |

**Answer: $128\pi\sqrt{2}$**

**Teacher Narration** `[62w]`
> This example combines the graph formula with polar coordinates. Notice that the factor $\sqrt{1+g_x^2+g_y^2}$ simplifies to $\sqrt{2}$ everywhere on the cone because the slope is constant. That means the surface area element is simply $\sqrt{2}$ times the projected area element in the plane. Then the integral reduces to a double integral of $r^2$ over a disk, which we evaluate using polar coordinates.

---

### Slide 7 · [CORE]
**Vector Surface Integral (Flux)**  ·  `split_left_right`

**On-screen text** `[13w]`
Flux integral: $\iint_S \mathbf{F}\cdot d\mathbf{S}$. Dot the field with the oriented area element.

**LEFT** `[formula_block]`

**Flux integral:**
$$\iint_S \mathbf{F}\cdot d\mathbf{S} = \iint_D \mathbf{F}(\mathbf{r}(u,v))\cdot (\mathbf{r}_u\times\mathbf{r}_v)\,du\,dv$$

$d\mathbf{S}=\mathbf{n}\,dS$ is the oriented area element.

**Orientation:**
$\mathbf{r}_u\times\mathbf{r}_v$ gives one normal direction. Reversing order gives the opposite. Always verify the desired orientation (outward/inward).

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a surface patch (like a curved rectangle). Draw several vector field arrows in the space around it. On one patch, draw the unit normal vector n (long arrow) perpendicular to the surface. Show that the flux is the dot product of F with n, integrated over the surface.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Simple surface: part of a plane? Use a curved surface: z = 0.2*(x^2+y^2) for x,y in [-1,1]
x = np.linspace(-1,1,10)
y = np.linspace(-1,1,10)
X,Y = np.meshgrid(x,y)
Z = 0.2*(X**2+Y**2)

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
ax.plot_surface(X,Y,Z, alpha=0.4, cmap='viridis', edgecolor='gray')

# Sample points for field and normals
points = np.array([[0.5,0.5,0.1], [-0.5,0.5,0.1], [0.5,-0.5,0.1], [0,0,0]])
for p in points:
    # Field F = (x, y, 0) for illustration
    F = np.array([p[0], p[1], 0])
    ax.quiver(p[0], p[1], p[2], F[0], F[1], F[2], color='blue', alpha=0.7, length=0.3, normalize=True)
    # Normal? For graph z=0.2(x^2+y^2), n = (-gx, -gy, 1) normalized
    gx = 0.4*p[0]; gy = 0.4*p[1]
    n = np.array([-gx, -gy, 1])
    n = n / np.linalg.norm(n)
    ax.quiver(p[0], p[1], p[2], n[0], n[1], n[2], color='red', length=0.5, label='n' if p[0]==0.5 else '')
ax.legend()
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')
plt.show()
```

**Teacher Narration** `[70w]`
> The flux integral adds up the component of the vector field that is perpendicular to the surface at each point. It's like measuring how much fluid flows through the surface per unit time. The key difference from scalar integrals is that we use the dot product with the oriented area element $\mathbf{r}_u\times\mathbf{r}_v$, not its magnitude. Orientation matters crucially—if you choose the opposite normal direction, the sign of the flux flips.

---

### Slide 8 · [CORE] 🟡 ⏸️ *[YouTube Pause]*
**Example 3: Flux Through a Sphere (Tricky)**  ·  `full_width`

**On-screen text** `[14w]`
Flux of radial field through a sphere. Note the cross product gives outward normal.

**FULL WIDTH** `[steps]`

**Problem:** Compute $\iint_S \mathbf{F}\cdot d\mathbf{S}$ for $\mathbf{F}=\langle x,y,z\rangle$ over the sphere $x^2+y^2+z^2=a^2$, outward orientation.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Parametrize: $\mathbf{r}(\phi,\theta)=(a\sin\phi\cos\theta,\,a\sin\phi\sin\theta,\,a\cos\phi)$, $0\leq\phi\leq\pi$, $0\leq\theta\leq2\pi$ | Spherical coords |
| 2 | $\mathbf{r}_\phi = (a\cos\phi\cos\theta,\,a\cos\phi\sin\theta,\,-a\sin\phi)$ | Derivative w.r.t. $\phi$ |
| 3 | $\mathbf{r}_\theta = (-a\sin\phi\sin\theta,\,a\sin\phi\cos\theta,\,0)$ | Derivative w.r.t. $\theta$ |
| 4 | $\mathbf{r}_\phi\times\mathbf{r}_\theta = a^2\sin\phi\,(\sin\phi\cos\theta,\,\sin\phi\sin\theta,\,\cos\phi)=a^2\sin\phi\,\hat{\mathbf{r}}$ (outward ✓) | Cross product |
| 5 | $\mathbf{F}(\mathbf{r}) = (a\sin\phi\cos\theta,\,a\sin\phi\sin\theta,\,a\cos\phi)$ | Field on surface |
| 6 | $\mathbf{F}\cdot(\mathbf{r}_\phi\times\mathbf{r}_\theta)= a^3\sin\phi(\sin^2\phi+\cos^2\phi)=a^3\sin\phi$ | Dot product simplifies |
| 7 | $\iint_S \mathbf{F}\cdot d\mathbf{S} = \int_0^{2\pi}\int_0^\pi a^3\sin\phi\,d\phi\,d\theta = 4\pi a^3$ | Integrate |

**Answer: $4\pi a^3$**

**Teacher Narration** `[77w]`
> Here's a classic flux calculation for a radial field out of a sphere. The parametrization uses spherical coordinates. The cross product $\mathbf{r}_\phi\times\mathbf{r}_\theta$ gives a vector of length $a^2\sin\phi$ pointing radially outward. Dotting with the field gives $a^3\sin\phi$, and integrating over the sphere yields $4\pi a^3$. This matches the result from Gauss's divergence theorem, which we'll see later. A common mistake is to use the opposite order of the cross product, which would give $-4\pi a^3$—always check orientation.

**Student Prompt:** Would the flux be positive or negative if we used $\mathbf{r}_\theta\times\mathbf{r}_\phi$? Try to reason before the next slide.

---

### Slide 9 · [MISCONCEPTION] 🟡
**Misconception: Orientation Reversal in Flux**  ·  `split_left_right`

**On-screen text** `[19w]`
Misconception: The order of the cross product determines the orientation of the flux normal. Always check outward vs inward.

**LEFT** `[text]`

**Wrong approach:** Using $\mathbf{r}_\theta\times\mathbf{r}_\phi$ instead of $\mathbf{r}_\phi\times\mathbf{r}_\theta$.

**Result:** The normal flips direction. For the sphere, $\mathbf{r}_\theta\times\mathbf{r}_\phi = -a^2\sin\phi\,\hat{\mathbf{r}}$, which points **inward**.

**Consequence:** The flux becomes $-4\pi a^3$, but the problem asked for outward orientation.

**Why it happens:** The order of cross product determines the sign. Always verify by checking the direction of the resulting vector against a known reference (e.g., outward from origin).

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a sphere wireframe. On one point, show both normals: a green arrow pointing outward (r_phi x r_theta) and a red arrow pointing inward (r_theta x r_phi). Label them. Add a note: 'Outward : correct, Inward : wrong.'

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

phi = np.linspace(0, np.pi, 20)
theta = np.linspace(0, 2*np.pi, 20)
Phi, Theta = np.meshgrid(phi, theta)
R = 1
x = R*np.sin(Phi)*np.cos(Theta)
y = R*np.sin(Phi)*np.sin(Theta)
z = R*np.cos(Phi)

fig = plt.figure(figsize=(6,6))
ax = fig.add_subplot(111, projection='3d')
ax.plot_wireframe(x, y, z, alpha=0.5, color='gray')

# Point at phi=pi/4, theta=pi/4
phi0, theta0 = np.pi/4, np.pi/4
point = np.array([R*np.sin(phi0)*np.cos(theta0), R*np.sin(phi0)*np.sin(theta0), R*np.cos(phi0)])
# r_phi x r_theta (outward)
r_phi = np.array([R*np.cos(phi0)*np.cos(theta0), R*np.cos(phi0)*np.sin(theta0), -R*np.sin(phi0)])
r_theta = np.array([-R*np.sin(phi0)*np.sin(theta0), R*np.sin(phi0)*np.cos(theta0), 0])
n_out = np.cross(r_phi, r_theta)
n_out = n_out / np.linalg.norm(n_out) * 0.3
n_in = -n_out
ax.quiver(point[0], point[1], point[2], n_out[0], n_out[1], n_out[2], color='green', length=0.3, label='Outward (correct)')
ax.quiver(point[0], point[1], point[2], n_in[0], n_in[1], n_in[2], color='red', length=0.3, label='Inward (wrong)')
ax.legend()
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')
plt.show()
```

**Teacher Narration** `[77w]`
> A very common mistake is to pick the wrong order when computing the cross product for flux integrals. In the sphere example, if you swap $\phi$ and $\theta$ in the cross product, you get the inward normal instead of outward. The answer changes sign. To avoid this, always check—literally—whether your normal vector points in the intended direction. For a sphere centered at the origin, the outward normal should be a positive scalar multiple of the position vector.

---

### Slide 10 · [PRACTICE]
**Example 4: Flat Surface (Edge Case)**  ·  `full_width`

**On-screen text** `[19w]`
Edge case: flat surface in xy-plane. The surface integral becomes a double integral of $z=0$, so result is 0.

**FULL WIDTH** `[steps]`

**Problem:** Evaluate $\iint_S z\,dS$ where $S$ is the part of the plane $z=0$ bounded by $x^2+y^2=1$.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Parametrize as graph: $z=0$, domain $x^2+y^2\leq 1$ | Flat surface in xy-plane |
| 2 | $g_x=0$, $g_y=0$ | Partial derivatives zero |
| 3 | $dS = \sqrt{1+0+0}\,dx\,dy = dx\,dy$ | Area element = standard area |
| 4 | $\iint_S z\,dS = \iint_D 0\cdot dx\,dy = 0$ | Integrand is zero everywhere |

**Answer: $0$**

$\boxed{0}$

**Why it matters:** When the surface lies in a coordinate plane, surface integrals reduce to standard double integrals. Here $z=0$ makes the integral vanish.

**Teacher Narration** `[61w]`
> This example looks trivial, but it demystifies an edge case. When your surface is flat and lies in a coordinate plane, the surface area element $dS$ reduces to the standard area element. Here $z$ is zero on the entire surface, so the integral is zero. This shows that surface integrals are consistent with ordinary double integrals when the surface is planar.

---

### Slide 11 · [PRACTICE] 🟡
**Example 5: Flux Through a Cylinder (Application)**  ·  `full_width`

**On-screen text** `[18w]`
Flux through a cylinder: the field is radial in xy-plane, dot product gives constant 4, integral yields $24\pi$.

**FULL WIDTH** `[steps]`

**Problem:** Compute $\iint_S \mathbf{F}\cdot d\mathbf{S}$ for $\mathbf{F}=\langle x,y,0\rangle$ over the lateral surface of $x^2+y^2=4$, $0\leq z\leq 3$, outward orientation.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Parametrize: $\mathbf{r}(u,v)=(2\cos u,\,2\sin u,\,v)$, $0\leq u\leq2\pi$, $0\leq v\leq3$ | Standard cylinder |
| 2 | $\mathbf{r}_u=(-2\sin u,\,2\cos u,\,0)$, $\mathbf{r}_v=(0,0,1)$ | Partial derivatives |
| 3 | $\mathbf{r}_u\times\mathbf{r}_v = (2\cos u,\,2\sin u,\,0)$ (outward ✓) | Cross product |
| 4 | $\mathbf{F}(\mathbf{r}) = (2\cos u,\,2\sin u,\,0)$ | Field on surface |
| 5 | $\mathbf{F}\cdot(\mathbf{r}_u\times\mathbf{r}_v)=4\cos^2 u+4\sin^2 u = 4$ | Dot product |
| 6 | $\iint_S \mathbf{F}\cdot d\mathbf{S} = \int_0^{2\pi}\int_0^3 4\,dv\,du = 24\pi$ | Final answer |

**Answer: $24\pi$**

**Teacher Narration** `[65w]`
> Another important example: flux through a cylinder. The field $\langle x,y,0\rangle$ points radially outward in the horizontal plane, but it has no vertical component. The cross product gives an outward radial vector of length 2. Dot multiplying yields 4, constant across the entire lateral surface. So the flux is just 4 times the surface area of the cylinder's lateral side, which is $2\pi(2)(3)=12\pi$, giving $24\pi$.

---

### Slide 12 · [VISUAL_LAB] 🟡 🎛 *[2 controls]*
**Interactive Flux Visualization**  ·  `split_left_right`

**On-screen text** `[15w]`
Explore flux through a cylinder with adjustable radius and height. See the field and normals.

**LEFT** `[text]`

Explore flux through a cylinder. Adjust the radius and height, and see how the dot product changes across the surface.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot a cylinder with parametric radius R and height H. Show a few sample points on the lateral surface with the vector field F = (x,y,0) as blue arrows and the outward normal as red arrows. Include sliders for R (1 to 5) and H (1 to 5). Add a text display showing the total flux computed analytically (2*pi*R^2*H? Wait: For F=(x,y,0), flux = 2*pi*R^2*H? Actually from earlier example: R=2, H=3 gave 24pi = 2*pi*R*H * (R? Let's recalc: F=(x,y,0) on cylinder x^2+y^2=R^2: F.n = (R cos u, R sin u, 0) dot (R cos u, R sin u,0) (since cross product magnitude R and direction outward) = R^2 cos^2 u + R^2 sin^2 u = R^2. Then flux = int_0^{2pi} int_0^H R^2 dv du = 2pi H R^2. So flux = 2pi H R^2. So correct. Use sliders to change R and H, update the plot and show the computed flux value.

*Interactive Controls:*
  - 🎛 Slider for radius (1 to 5)
  - 🎛 Slider for height (1 to 5)

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider, Button

# Initial parameters
R0, H0 = 2, 3

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')

def draw_cylinder(R, H):
    ax.clear()
    u = np.linspace(0, 2*np.pi, 30)
    v = np.linspace(0, H, 20)
    U, V = np.meshgrid(u, v)
    X = R*np.cos(U)
    Y = R*np.sin(U)
    Z = V
    ax.plot_surface(X, Y, Z, alpha=0.4, cmap='viridis', edgecolor='gray')
    # Sample points for vectors
    us = np.linspace(0, 2*np.pi, 8)[:-1]
    vs = np.linspace(0, H, 4)
    for u0 in us:
        for v0 in vs:
            p = np.array([R*np.cos(u0), R*np.sin(u0), v0])
            # Field F = (x,y,0)
            F = np.array([p[0], p[1], 0])
            ax.quiver(p[0], p[1], p[2], F[0], F[1], F[2], color='blue', alpha=0.6, length=0.5)
            # Outward normal: from cross product of r_u and r_v
            ru = np.array([-R*np.sin(u0), R*np.cos(u0), 0])
            rv = np.array([0,0,1])
            n = np.cross(ru, rv)
            n = n / np.linalg.norm(n) * 0.5
            ax.quiver(p[0], p[1], p[2], n[0], n[1], n[2], color='red', alpha=0.8)
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_zlabel('z')
    ax.set_xlim(-R-1, R+1)
    ax.set_ylim(-R-1, R+1)
    ax.set_zlim(0, H+1)
    # Compute flux analytically: 2*pi*H*R^2
    flux = 2*np.pi*H*R**2
    ax.set_title(f'Flux = {flux:.2f}')
    fig.canvas.draw_idle()

draw_cylinder(R0, H0)

# Sliders
ax_R = plt.axes([0.2, 0.01, 0.65, 0.03])
slider_R = Slider(ax_R, 'Radius', 1, 5, valinit=R0)
ax_H = plt.axes([0.2, 0.06, 0.65, 0.03])
slider_H = Slider(ax_H, 'Height', 1, 5, valinit=H0)

def update(val):
    R = slider_R.val
    H = slider_H.val
    draw_cylinder(R, H)

slider_R.on_changed(update)
slider_H.on_changed(update)
plt.show()
```

**Teacher Narration** `[70w]`
> This interactive lab lets you explore the flux of the radial field $\langle x,y,0\rangle$ through a cylinder. As you change the radius and height, watch how the flux value updates. The blue arrows show the field, the red arrows show the outward normals. Notice that the dot product is constant because both the field and the normal are radial and aligned. The flux formula $2\pi HR^2$ matches the displayed value.

**Student Prompt:** What happens to the flux if you double the radius? Why?

---

### Slide 13 · [SUMMARY]
**Summary: Surface Integrals**  ·  `full_width`

**On-screen text** `[7w]`
Summary of key formulas and learning goals.

**FULL WIDTH** `[text]`

**Key Formulas:**
- Surface area element: $dS = |\mathbf{r}_u\times\mathbf{r}_v|\,du\,dv$
- Scalar surface integral: $\iint_S f\,dS = \iint_D f(\mathbf{r})\,|\mathbf{r}_u\times\mathbf{r}_v|\,du\,dv$
- Scalar integral (graph $z=g$): $\iint_S f\,dS = \iint_D f(x,y,g)\sqrt{1+g_x^2+g_y^2}\,dx\,dy$
- Flux (vector) integral: $\iint_S \mathbf{F}\cdot d\mathbf{S} = \iint_D \mathbf{F}\cdot (\mathbf{r}_u\times\mathbf{r}_v)\,du\,dv$

**Always check orientation** for flux integrals—it determines the sign.

**Learning objectives revisited:**
- Parametrize surfaces (sphere, cylinder, cone, plane, graph)
- Compute surface area and scalar surface integrals
- Evaluate flux integrals through closed surfaces
- Apply to physical situations (fluid flow, paint thickness)

**Teacher Narration** `[84w]`
> Let's quickly recap what we've learned. Surface integrals extend double integrals to curved surfaces. The area element $dS$ is the magnitude of the cross product of the tangent vectors. For scalar integrals, we weight the function by this area. For flux integrals, we dot the vector field with the oriented area element—the cross product itself, not its magnitude. Always check orientation. You should now be able to parametrize surfaces, compute surface area, evaluate scalar and vector surface integrals, and apply them in physical examples.

---

### Slide 14 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Flux Through a Torus**  ·  `split_left_right`

**On-screen text** `[14w]`
[Challenge – Optional] Flux of vertical field through a torus using parametric surface integral.

**LEFT** `[text]`

**Problem:** Compute the flux of $\mathbf{F} = \langle 0,0,z \rangle$ outward through the torus parametrized by
$$\mathbf{r}(\phi,\theta)=((R+r\cos\phi)\cos\theta,\,(R+r\cos\phi)\sin\theta,\,r\sin\phi)$$
for $0\leq\phi,\theta\leq2\pi$.

**Hint:** The outward normal can be found by computing $\mathbf{r}_\phi\times\mathbf{r}_\theta$; it should point away from the tube axis. Then compute the dot product and integrate.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a torus with parameters R=3, r=1. Show a few arrows of the field F=(0,0,z) as vertical blue arrows. On a patch, show the outward normal in red. Label the parameters.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

R, r = 3, 1
phi = np.linspace(0, 2*np.pi, 30)
theta = np.linspace(0, 2*np.pi, 20)
Phi, Theta = np.meshgrid(phi, theta)
X = (R + r*np.cos(Phi)) * np.cos(Theta)
Y = (R + r*np.cos(Phi)) * np.sin(Theta)
Z = r*np.sin(Phi)

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
ax.plot_surface(X, Y, Z, alpha=0.5, cmap='cool', edgecolor='gray')

# Sample points for vectors
phi_s = np.linspace(0, 2*np.pi, 6)[:-1]
theta_s = np.linspace(0, 2*np.pi, 4)
for p in phi_s:
    for t in theta_s:
        x = (R + r*np.cos(p)) * np.cos(t)
        y = (R + r*np.cos(p)) * np.sin(t)
        z = r*np.sin(p)
        # Field F = (0,0,z)
        ax.quiver(x,y,z, 0,0,z, color='blue', length=0.5, normalize=False)
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')
ax.set_title('Challenge: Flux through a torus')
plt.show()
```

**Teacher Narration** `[60w]`
> For those ready for a deeper challenge, try computing the flux of the vertical field $\langle 0,0,z\rangle$ through a torus. You'll need to compute the cross product carefully. The outward normal on a torus points away from the tube axis. This is a good test of your understanding of parametric surfaces and orientation. The answer is zero—do you see why?

**Student Prompt:** Try to compute the integral and see if the answer is zero. Why would it be zero?

---
