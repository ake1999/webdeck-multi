# Triple Integrals in Cylindrical and Spherical Coordinates

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should already know triple integrals in rectangular coordinates and 2D polar coordinates (including the Jacobian factor r).

**Learning Objectives:**
- Convert points and functions between rectangular, cylindrical, and spherical coordinates.
- Set up triple integrals in cylindrical coordinates for regions with rotational symmetry.
- Set up triple integrals in spherical coordinates for regions centered at a point.
- Evaluate triple integrals in cylindrical coordinates for practical volume and mass problems.
- Choose the appropriate coordinate system based on the geometry of the region.

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
⚠️ **Narration overlong  (>120w):** [7]  (avg 103w)
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
⚠️ **narration_overlong**: too long: ['s7:124w']
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | hook | 🟢 | ◧ |  | 88w | 16w | Why Coordinate Systems Matter |
| 2 | core | 🟢 | ◧ | ⏸️ | 108w | 18w | Cylindrical Coordinates (Polar + z) |
| 3 | practice | 🟢 | ◧ |  | 92w | 14w | Warm-Up: Converting a Point to Cylindrical |
| 4 | core | 🟢 | ◧ | ⏸️ | 109w | 21w | Spherical Coordinates (ρ, θ, φ) |
| 5 | practice | 🟡 | ◧ |  | 114w | 16w | Standard Example: Mass of a Cylinder with Paraboloid Cap |
| 6 | misconception | 🟢 | ◧ |  | 96w | 20w | Misconception: Forgetting the Jacobian |
| 7 | practice | 🟡 | ◧ |  | 124w⚠️ | 15w | Tricky Example: Cone Inside a Sphere |
| 8 | 🎛pause_and_try | 🟡 | ◧ | ⏸️ | 89w | 21w | Pause: Set Up a Cone with Flat Top |
| 9 | practice | 🔴 | ⬛⬛ |  | 102w | 15w | [Challenge – Optional] Edge Case: Cone with Flat Top – Solution |
| 10 | practice | 🟡 | ◧ |  | 105w | 14w | Application: Mass of a Spherical Shell |
| 11 | 🎛visual_lab | 🟢 | ◧ |  | 101w | 13w | Interactive: Explore Cylindrical Surfaces |
| 12 | 🎛visual_lab | 🟢 | ◧ |  | 112w | 16w | Interactive: Explore Spherical Surfaces |
| 13 | core | 🟢 | ⬛⬛ | ⏸️ | 103w | 11w | Choosing the Right Coordinate System |
| 14 | summary | 🟢 | ⬛⬛ |  | 99w | 20w | Summary & Key Formulas |

---

### Slide 1 · [HOOK]
**Why Coordinate Systems Matter**  ·  `split_left_right`

**On-screen text** `[16w]`
Spacecraft fuel tank: sphere + cone. Rectangular coordinates = messy splits. Match coordinate system to symmetry.

**LEFT** `[text]`

**Think about this:** You're designing a spherical fuel tank with a conical bottom. Using rectangular coordinates forces you to split the region into many pieces. With the right coordinate system, it becomes a single elegant integral. **Key insight:** Match your coordinate system to the symmetry of your region.

**RIGHT** `[visual_spec]`

*Visual Spec:* A 3D diagram of a sphere with a cone attached at the bottom, labeled 'spacecraft fuel tank'. Axes: x, y, z. Show a small grid on the surface to indicate integration. Use color: sphere in blue, cone in red. Add text: 'Match symmetry → simpler integral'.

**Teacher Narration** `[88w]`
> Imagine you are an engineer designing a spacecraft fuel tank. The tank is a sphere with a conical bottom. To compute its volume, you need a triple integral. If you stubbornly use rectangular coordinates, you will have to split the region into several pieces and handle messy square roots. But if you choose a coordinate system that matches the tank's symmetry, the whole integral becomes clean and manageable. That is the superpower we are developing today: picking the right coordinates transforms a hard problem into an easy one.

---

### Slide 2 · [CORE] ⏸️ *[YouTube Pause]*
**Cylindrical Coordinates (Polar + z)**  ·  `split_left_right`

**On-screen text** `[18w]`
Cylindrical: (r, θ, z).  dV = r dz dr dθ.  Typically integrate z first, then r, then θ.

**LEFT** `[formula_block]`

$$x = r\cos\theta,\quad y = r\sin\theta,\quad z = z$$
$$dV = r\,dz\,dr\,d\theta$$
$$\iiint_E f\,dV = \int_{\theta=\alpha}^{\beta}\int_{r=g_1(\theta)}^{g_2(\theta)}\int_{z=u_1(r,\theta)}^{u_2(r,\theta)} f(r\cos\theta,r\sin\theta,z)\,r\,dz\,dr\,d\theta$$

**Integration order:** dz (vertical) → dr (radial) → dθ (angular). The factor r is mandatory – it comes from the Jacobian.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of a cylindrical surface (r constant) with labeled axes and coordinates. Show a point on the surface with its cylindrical coordinates (r, θ, z) indicated. Use arrows from the axes to the point. Color: light blue surface, dark blue point, red labels. Include a small animation hint: 'rotate view'.

**Teacher Narration** `[108w]`
> Cylindrical coordinates are just polar coordinates in the xy-plane with the usual z-height. A point is given by how far you are from the z-axis (r), the angle around the z-axis (θ), and the height (z). The volume element gains an extra factor of r because area in the xy-plane is r dr dθ, and then we multiply by dz. Typically we integrate in the order dz first, then dr, then dθ. The z-bounds can depend on r and θ; the r-bounds can depend on θ; the θ-bounds are constants. And remember, that r factor is not optional – forgetting it is the number one mistake students make.

**Student Prompt:** Pause: Why does dV contain r? Think about the Jacobian from 2D polar coordinates.

---

### Slide 3 · [PRACTICE]
**Warm-Up: Converting a Point to Cylindrical**  ·  `split_left_right`

**On-screen text** `[14w]`
Convert (1, 1, √2) to cylindrical. r = √(x²+y²), θ = arctan(y/x), z stays.

**LEFT** `[steps]`

**Convert (1, 1, √2) from rectangular to cylindrical.**

| Step | Action | Result |
|------|--------|--------|
| 1 | $r = \sqrt{x^2+y^2}$ | $r = \sqrt{1^2+1^2} = \sqrt{2}$ |
| 2 | $\theta = \arctan(y/x)$ | $\theta = \arctan(1/1) = \pi/4$ |
| 3 | $z$ unchanged | $z = \sqrt{2}$ |

**Answer: $(\sqrt{2}, \pi/4, \sqrt{2})$**

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D scatter plot showing the rectangular point (1,1,√2) and its cylindrical projection. Draw dashed lines from the point to the axes. Label the point with both coordinate names. Use blue for rectangular axes, red for the new coordinates.

**Teacher Narration** `[92w]`
> Let's practice converting a point. We have (1, 1, √2). First, compute r as the square root of x squared plus y squared. That gives root 2. Next, theta is the arctangent of y over x, which here is pi over 4. And z remains unchanged. So in cylindrical coordinates, the point is (root 2, pi over 4, root 2). Notice the r coordinate is positive; if the point were in a different quadrant, you would have to adjust theta by adding pi. This conversion is the foundation for setting up integrals.

**Student Prompt:** Convert the point (0, 2, 3) to cylindrical coordinates.

---

### Slide 4 · [CORE] ⏸️ *[YouTube Pause]*
**Spherical Coordinates (ρ, θ, φ)**  ·  `split_left_right`

**On-screen text** `[21w]`
Spherical: (ρ, θ, φ).  dV = ρ² sinφ dρ dφ dθ.  φ from 0 to π, θ from 0 to 2π.

**LEFT** `[formula_block]`

$$x = \rho\sin\phi\cos\theta,\quad y = \rho\sin\phi\sin\theta,\quad z = \rho\cos\phi$$
$$\rho^2 = x^2 + y^2 + z^2$$  
$$\cos\phi = z/\rho$$  
$$dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$$

**Integration order:** dρ (radial) → dφ (polar) → dθ (azimuthal). φ goes from 0 (north pole) to π (south pole). θ goes from 0 to 2π.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of a sphere with spherical coordinate grid lines. Show a point on the sphere with ρ, φ, θ labeled. Use arrows from origin to point for ρ, from z-axis to point for φ, and from x-axis in xy-plane for θ. Color: sphere surface in light orange, grid lines in gray, labels in red.

**Teacher Narration** `[109w]`
> Spherical coordinates are like latitude and longitude but with a radial distance. The distance from the origin is ρ. The polar angle φ is measured from the positive z-axis — it goes from zero at the north pole to π at the south pole. The azimuthal angle θ is the same as in cylindrical coordinates, measured from the x-axis in the xy-plane. The volume element now has ρ squared times sine φ. That ρ squared appears because as you go farther out, the surface area of a sphere grows. Again, the integration order is natural: dρ first, then dφ, then dθ. Always check: φ is never more than π.

**Student Prompt:** What is the range of φ? Why does sinφ appear in dV?

---

### Slide 5 · [PRACTICE] 🟡
**Standard Example: Mass of a Cylinder with Paraboloid Cap**  ·  `split_left_right`

**On-screen text** `[16w]`
Mass inside cylinder r=1, below z=4, above z=1-r², density Kr. Set up integral and evaluate fully.

**LEFT** `[steps]`

**Problem:** Find the mass of the solid inside cylinder $x^2+y^2=1$, below $z=4$, above $z=1-x^2-y^2$, density $\rho = K\sqrt{x^2+y^2}$.

**Step 1: Convert to cylindrical.**  
Cylinder: $r=1$. Paraboloid: $z=1-r^2$. Density: $Kr$.

**Step 2: Bounds.**  
$\theta$: $0$ to $2\pi$; $r$: $0$ to $1$; $z$: $1-r^2$ to $4$.

**Step 3: Integrate.**  
$$\text{Mass} = \int_0^{2\pi}\int_0^1\int_{1-r^2}^4 (Kr)\cdot r\,dz\,dr\,d\theta$$
$$= \int_0^{2\pi}\int_0^1 Kr^2(4-(1-r^2))\,dr\,d\theta = \frac{12\pi K}{5}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of the cylinder and paraboloid region, with the solid shaded. Show the cylinder r=1, the paraboloid z=1-r², and the plane z=4. Use different colors for each surface and a semi-transparent fill for the solid region.

**Teacher Narration** `[114w]`
> This problem brings together everything. We have a cylinder of radius 1, a paraboloid bottom, and a flat top at z equals 4. The density is K times the distance from the z-axis. In cylindrical coordinates, the cylinder becomes r equals 1, and the paraboloid becomes z equals 1 minus r squared. The integrand includes the density Kr times the Jacobian r, giving Kr squared. After integrating with respect to z, we get a polynomial in r. The r-integral yields 6K over 5, and the theta integral multiplies by 2 pi, giving 12 pi K over 5. Notice how the Jacobian factor r was essential – without it we would have the wrong answer.

**Student Prompt:** What would happen if we forgot the factor r from dV?

---

### Slide 6 · [MISCONCEPTION]
**Misconception: Forgetting the Jacobian**  ·  `split_left_right`

**On-screen text** `[20w]`
Missing the Jacobian factor? Wrong answer! dV = r dz dr dθ (cylindrical) and ρ² sinφ dρ dφ dθ (spherical).

**LEFT** `[text]`

**Wrong approach:** Using $dV = dz\,dr\,d\theta$ without the $r$ factor.

**Consequence:** Mass computed incorrectly by a factor of $r$ – the integral becomes too small near the origin and too large far away.

**Correct:** Always include $r$ in cylindrical $dV = r\,dz\,dr\,d\theta$ and $\rho^2\sin\phi$ in spherical.

**RIGHT** `[visual_spec]`

*Visual Spec:* Side-by-side comparison: left 3D plot shows correct integration with r factor (labeled 'dV = r dz dr dθ'), right plot shows wrong integral (labeled 'dV = dz dr dθ – missing factor'). Use color: correct in green, wrong in red. Animate the volume difference as a shrinking/warping effect.

**Teacher Narration** `[96w]`
> One of the most common mistakes students make is to forget the Jacobian factor when changing coordinates. In cylindrical, that means using dV equals dz dr dθ without the r. But that would treat a small piece of area near the origin the same as one far out, which is not true: in polar coordinates, area elements get larger as r increases. For example, a small change in r near the origin covers less area than the same change near the edge. The correct factor r captures this expansion. Always double-check your volume element before evaluating.

**Student Prompt:** Why does the Jacobian r appear? Think of the area of a small polar rectangle.

---

### Slide 7 · [PRACTICE] 🟡
**Tricky Example: Cone Inside a Sphere**  ·  `split_left_right`

**On-screen text** `[15w]`
Region inside sphere ρ=2, above cone z=√(x²+y²). Cone becomes φ=π/4. Set up integral in spherical.

**LEFT** `[steps]`

**Set up the volume inside sphere $\rho=2$ and above cone $z=\sqrt{x^2+y^2}$.**

**Step 1: Convert surfaces.**  
Cone: $z=\sqrt{x^2+y^2}\Rightarrow \phi=\pi/4$.

**Step 2: Bounds.**  
$\theta$: $0$ to $2\pi$; $\phi$: $0$ to $\pi/4$; $\rho$: $0$ to $2$.

**Step 3: Integral.**  
$$V = \int_0^{2\pi}\int_0^{\pi/4}\int_0^2 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of a sphere of radius 2 with a cone inside (opening upward, vertex at origin). Shade the region inside the sphere and above the cone. Mark the angle φ=π/4 on the cone surface. Use colors: sphere transparent blue, cone transparent red, region green.

**Teacher Narration** `[124w ⚠️ **OVERLONG: 124w > 120w max**]`
> Now a classic problem: the region inside a sphere of radius 2 and above a cone. In spherical coordinates, the sphere is simply ρ equals 2. The cone z equals the square root of x squared plus y squared becomes an equation in ρ and φ. Using z equals ρ cos φ and the radial distance in the xy-plane is ρ sin φ, we get ρ cos φ equals ρ sin φ, which simplifies to tan φ equals 1, so φ equals pi over 4. That's beautiful – the cone is a constant-phi surface. So the bounds are: θ from 0 to 2π, φ from 0 to pi/4, and ρ from 0 to 2. The integral is set up with ρ squared sin φ.

**Student Prompt:** What would the φ bounds be if the region were outside the cone?

---

### Slide 8 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause: Set Up a Cone with Flat Top**  ·  `split_left_right`

**On-screen text** `[21w]`
Pause: cone height h, base radius R, vertex at origin. Set up in spherical. Hint: ρ upper bound depends on φ.

**LEFT** `[text]`

**Try it:** Set up the volume integral for a cone of height $h$ and base radius $R$, with vertex at the origin, in **spherical coordinates**.

**Hint:** The top is the plane $z = h$, not a sphere. Find the bounds on $\rho$ in terms of $\phi$.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of a cone with vertex at origin, height h, base radius R. Label h, R, and the angle φ₀ at the base. Show a horizontal plane at z=h cutting the cone. The cone surface and top plane should be distinct colors.

*Interactive Controls:*
  - 🎛 Button: reveal bounds

**Teacher Narration** `[89w]`
> I want you to pause and try setting up the volume integral for this cone. The vertex is at the origin, height h, base radius R. The top is the flat plane z equals h. In spherical coordinates, the cone wall is a constant-phi surface, but the top is not a constant-rho surface. Think about the maximum rho you can have for a given phi. If you get stuck, click the button to reveal the bounds. This is a common edge case that tests your understanding of spherical coordinates.

**Student Prompt:** Set up the integral. What is the upper limit for ρ as a function of φ?

---

### Slide 9 · [PRACTICE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Edge Case: Cone with Flat Top – Solution**  ·  `full_width`

**On-screen text** `[15w]`
Cone with flat top: ρ upper bound = h/cosφ. φ₀ = arctan(R/h). Integral set up.

**FULL WIDTH** `[steps]`

**Cone of height h, base radius R, vertex at origin.**

**Step 1: Cone angle.**  $\tan\phi_0 = R/h$ so $\phi_0 = \arctan(R/h)$.

**Step 2: Bounds.**  
$\theta$: $0$ to $2\pi$; $\phi$: $0$ to $\phi_0$; $\rho$: $0$ to $h/\cos\phi$ (from $z = h \Rightarrow \rho\cos\phi = h$).

**Step 3: Integral.**  
$$V = \int_0^{2\pi}\int_0^{\phi_0}\int_0^{h/\cos\phi} \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$$

**Teacher Narration** `[102w]`
> Here is the solution. The cone wall is at constant phi naught, which you get from the ratio of base radius to height. The tricky part is the top: because it is a horizontal plane z equals h, in spherical coordinates we have rho cos phi equals h, so rho equals h over cos phi. That means the upper limit on rho depends on phi – it goes to infinity as phi approaches 90 degrees, but we stop at phi naught. This is a classic edge case where students assume constant rho bounds. Always remember: the top surface determines the ρ bound.

---

### Slide 10 · [PRACTICE] 🟡
**Application: Mass of a Spherical Shell**  ·  `split_left_right`

**On-screen text** `[14w]`
Mass of spherical shell: density δ₀/ρ. Set up triple integral in spherical and evaluate.

**LEFT** `[steps]`

**A spherical shell with inner radius a, outer radius b, density $\delta(\rho) = \delta_0/\rho$.**

**Bounds:**  $\theta$: $0$ to $2\pi$; $\phi$: $0$ to $\pi$; $\rho$: $a$ to $b$.

**Integral:**  
$$M = \int_0^{2\pi}\int_0^{\pi}\int_a^b (\delta_0/\rho)\cdot\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$$
$$= 2\pi\delta_0(b^2 - a^2)$$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D cutaway of a spherical shell with inner radius a and outer radius b. Shade the shell region. Use radial gradient to indicate varying density (darker near center). Label a, b, and a small element dV.

**Teacher Narration** `[105w]`
> This is a realistic application: a spherical shell with density that varies inversely with distance from the center. Spherical coordinates are natural because the bounds are constant: θ from 0 to 2π, φ from 0 to π, ρ from a to b. The integrand becomes density times the Jacobian: δ₀ over ρ times ρ squared sin φ simplifies to δ₀ ρ sin φ. Integration over ρ gives (b² - a²)/2, over φ gives 2, and over θ gives 2π. The final mass is 2π δ₀ times (b² - a²). Notice how the varying density was still easy to handle because it only depended on ρ.

**Student Prompt:** What would the mass be if density were constant?

---

### Slide 11 · [VISUAL_LAB] 🎛 *[3 controls]*
**Interactive: Explore Cylindrical Surfaces**  ·  `split_left_right`

**On-screen text** `[13w]`
Use sliders to see how constant r, θ, z surfaces look in 3D.

**LEFT** `[text]`

Use the sliders to change the values of $r$, $\theta$, and $z$. Observe how the surface changes. Notice that constant $r$ gives a cylinder, constant $\theta$ gives a half-plane, constant $z$ gives a horizontal plane.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot with three sliders: r (0 to 2), theta (0 to 2π), z (-1 to 1). As each slider changes, the corresponding coordinate surface is highlighted: for r, a cylinder; for theta, a vertical half-plane; for z, a horizontal plane. Use transparent meshes with different colors. Include labels and axis lines.

*Interactive Controls:*
  - 🎛 Slider: r from 0.1 to 2.0
  - 🎛 Slider: theta from 0 to 2π
  - 🎛 Slider: z from -1 to 1

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d', position=[0.1, 0.2, 0.8, 0.7])

# Initial values
r0 = 1.0; theta0 = np.pi/4; z0 = 0.5

# Cylinder (r constant)
theta_vals = np.linspace(0, 2*np.pi, 30)
z_vals = np.linspace(-1, 1, 20)
T, Z = np.meshgrid(theta_vals, z_vals)
X_cyl = r0 * np.cos(T)
Y_cyl = r0 * np.sin(T)
cyl = ax.plot_surface(X_cyl, Y_cyl, Z, alpha=0.3, color='blue')

# Half-plane (theta constant)
r_vals = np.linspace(0, 2, 20)
z_vals2 = np.linspace(-1, 1, 20)
R, Z2 = np.meshgrid(r_vals, z_vals2)
X_plane = R * np.cos(theta0)
Y_plane = R * np.sin(theta0)
plane = ax.plot_surface(X_plane, Y_plane, Z2, alpha=0.3, color='green')

# Horizontal plane (z constant)
R2, T2 = np.meshgrid(r_vals, theta_vals)
X_horiz = R2 * np.cos(T2)
Y_horiz = R2 * np.sin(T2)
Z_horiz = z0 * np.ones_like(X_horiz)
horiz = ax.plot_surface(X_horiz, Y_horiz, Z_horiz, alpha=0.3, color='red')

ax.set_xlim(-2,2); ax.set_ylim(-2,2); ax.set_zlim(-1,1)
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')

def update(val):
    r = slider_r.val
    theta = slider_theta.val
    z = slider_z.val
    # update cylinder
    ax.collections.remove(cyl)
    X_cyl_new = r * np.cos(T)
    Y_cyl_new = r * np.sin(T)
    cyl_new = ax.plot_surface(X_cyl_new, Y_cyl_new, Z, alpha=0.3, color='blue')
    # update plane
    ax.collections.remove(plane)
    X_plane_new = R * np.cos(theta)
    Y_plane_new = R * np.sin(theta)
    plane_new = ax.plot_surface(X_plane_new, Y_plane_new, Z2, alpha=0.3, color='green')
    # update horizontal
    ax.collections.remove(horiz)
    X_horiz_new = R2 * np.cos(T2)
    Y_horiz_new = R2 * np.sin(T2)
    Z_horiz_new = z * np.ones_like(X_horiz_new)
    horiz_new = ax.plot_surface(X_horiz_new, Y_horiz_new, Z_horiz_new, alpha=0.3, color='red')
    fig.canvas.draw_idle()

ax_slider_r = plt.axes([0.1, 0.05, 0.3, 0.03])
slider_r = Slider(ax_slider_r, 'r', 0.1, 2.0, valinit=r0)
ax_slider_theta = plt.axes([0.5, 0.05, 0.3, 0.03])
slider_theta = Slider(ax_slider_theta, r'$\theta$', 0, 2*np.pi, valinit=theta0)
ax_slider_z = plt.axes([0.1, 0.0, 0.3, 0.03])
slider_z = Slider(ax_slider_z, 'z', -1, 1, valinit=z0)

slider_r.on_changed(update)
slider_theta.on_changed(update)
slider_z.on_changed(update)

plt.show()
```

**Teacher Narration** `[101w]`
> Let's interactively explore cylindrical coordinate surfaces. On the right, you have three sliders: r, theta, and z. When you move the r slider, you see a blue cylinder – all points at that distance from the z-axis. When you adjust theta, a green half-plane rotates around the z-axis. And the z slider moves a horizontal red plane up and down. This visualization helps you understand how each coordinate defines a family of surfaces. When setting up a triple integral, your bounds often correspond to these surfaces: for example, a cylinder gives constant r bounds, and a plane gives constant z bounds.

**Student Prompt:** Describe what happens when you set r=0. What surface is that?

---

### Slide 12 · [VISUAL_LAB] 🎛 *[3 controls]*
**Interactive: Explore Spherical Surfaces**  ·  `split_left_right`

**On-screen text** `[16w]`
Use sliders to see spheres, half-planes, and cones – the surfaces of constant ρ, θ, φ.

**LEFT** `[text]`

Use the sliders to change $\rho$, $\theta$, and $\phi$. Constant $\rho$ gives spheres, constant $\theta$ gives half-planes, constant $\phi$ gives cones. Watch how the surfaces deform.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot with three sliders: ρ (0.1 to 3), θ (0 to 2π), φ (0 to π). As each slider changes, the corresponding coordinate surface is highlighted: for ρ, a sphere; for θ, a vertical half-plane; for φ, a cone opening along the z-axis. Use transparent meshes with different colors. Include labels and axis lines.

*Interactive Controls:*
  - 🎛 Slider: ρ from 0.1 to 3.0
  - 🎛 Slider: θ from 0 to 2π
  - 🎛 Slider: φ from 0 to π

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d', position=[0.1, 0.2, 0.8, 0.7])

# Initial values
rho0 = 2.0; theta0 = np.pi/4; phi0 = np.pi/3

# Sphere (ρ constant)
theta_vals = np.linspace(0, 2*np.pi, 30)
phi_vals = np.linspace(0, np.pi, 20)
T, P = np.meshgrid(theta_vals, phi_vals)
X_sphere = rho0 * np.sin(P) * np.cos(T)
Y_sphere = rho0 * np.sin(P) * np.sin(T)
Z_sphere = rho0 * np.cos(P)
sphere = ax.plot_surface(X_sphere, Y_sphere, Z_sphere, alpha=0.2, color='blue')

# Half-plane (θ constant)
rho_vals = np.linspace(0, 3, 20)
phi_vals2 = np.linspace(0, np.pi, 20)
RHO, PHI = np.meshgrid(rho_vals, phi_vals2)
X_plane = RHO * np.sin(PHI) * np.cos(theta0)
Y_plane = RHO * np.sin(PHI) * np.sin(theta0)
Z_plane = RHO * np.cos(PHI)
plane = ax.plot_surface(X_plane, Y_plane, Z_plane, alpha=0.2, color='green')

# Cone (φ constant)
rho_vals2 = np.linspace(0, 3, 20)
theta_vals2 = np.linspace(0, 2*np.pi, 30)
RHO2, THETA2 = np.meshgrid(rho_vals2, theta_vals2)
X_cone = RHO2 * np.sin(phi0) * np.cos(THETA2)
Y_cone = RHO2 * np.sin(phi0) * np.sin(THETA2)
Z_cone = RHO2 * np.cos(phi0)
cone = ax.plot_surface(X_cone, Y_cone, Z_cone, alpha=0.2, color='red')

ax.set_xlim(-3,3); ax.set_ylim(-3,3); ax.set_zlim(-3,3)
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')

def update(val):
    rho = slider_rho.val
    theta = slider_theta.val
    phi = slider_phi.val
    # update sphere
    ax.collections.remove(sphere)
    X_sphere_new = rho * np.sin(P) * np.cos(T)
    Y_sphere_new = rho * np.sin(P) * np.sin(T)
    Z_sphere_new = rho * np.cos(P)
    sphere_new = ax.plot_surface(X_sphere_new, Y_sphere_new, Z_sphere_new, alpha=0.2, color='blue')
    # update plane
    ax.collections.remove(plane)
    X_plane_new = RHO * np.sin(PHI) * np.cos(theta)
    Y_plane_new = RHO * np.sin(PHI) * np.sin(theta)
    Z_plane_new = RHO * np.cos(PHI)
    plane_new = ax.plot_surface(X_plane_new, Y_plane_new, Z_plane_new, alpha=0.2, color='green')
    # update cone
    ax.collections.remove(cone)
    X_cone_new = RHO2 * np.sin(phi) * np.cos(THETA2)
    Y_cone_new = RHO2 * np.sin(phi) * np.sin(THETA2)
    Z_cone_new = RHO2 * np.cos(phi)
    cone_new = ax.plot_surface(X_cone_new, Y_cone_new, Z_cone_new, alpha=0.2, color='red')
    fig.canvas.draw_idle()

ax_slider_rho = plt.axes([0.1, 0.05, 0.3, 0.03])
slider_rho = Slider(ax_slider_rho, r'$\rho$', 0.1, 3.0, valinit=rho0)
ax_slider_theta = plt.axes([0.5, 0.05, 0.3, 0.03])
slider_theta = Slider(ax_slider_theta, r'$\theta$', 0, 2*np.pi, valinit=theta0)
ax_slider_phi = plt.axes([0.1, 0.0, 0.3, 0.03])
slider_phi = Slider(ax_slider_phi, r'$\phi$', 0, np.pi, valinit=phi0)

slider_rho.on_changed(update)
slider_theta.on_changed(update)
slider_phi.on_changed(update)

plt.show()
```

**Teacher Narration** `[112w]`
> Now let's explore spherical coordinates. The sliders control ρ, θ, and φ. Constant ρ gives a sphere – all points at that distance from the origin. Constant θ gives a half-plane through the z-axis, just like in cylindrical. Constant φ gives a cone that opens up or down. Notice that when φ is π over 2, the cone becomes the xy-plane. These surfaces are the building blocks for setting up bounds: if a region is bounded by a sphere, you get constant ρ bounds; if bounded by a cone from the origin, you get constant φ bounds. This visual helps you see why spherical coordinates simplify problems with spherical or conical symmetry.

**Student Prompt:** What happens to the cone surface when φ approaches 0 or π?

---

### Slide 13 · [CORE] ⏸️ *[YouTube Pause]*
**Choosing the Right Coordinate System**  ·  `full_width`

**On-screen text** `[11w]`
Match symmetry: cylinder → cylindrical; sphere/cone → spherical; paraboloid → cylindrical.

**FULL WIDTH** `[text]`

| Region Shape | Best System | Why? |
|--------------|-------------|------|
| Cylinder | Cylindrical | r constant on side |
| Cone (vertex at origin) | Spherical | φ constant on surface |
| Sphere | Spherical | ρ constant |
| Paraboloid | Cylindrical | z function of r only |
| Plane | Rectangular or Cylindrical | depends on orientation |
| Spherical shell | Spherical | ρ bounds constant |

**Teacher Narration** `[103w]`
> Here is a quick reference guide for choosing a coordinate system. If your region is a cylinder, a paraboloid, or anything with rotational symmetry around the z-axis, use cylindrical. If your region is a sphere, a spherical shell, or a cone with vertex at the origin, use spherical. Planes can often be handled in any system, but if the plane is horizontal, cylindrical and rectangular are similar; if the plane goes through the origin, spherical may be simpler. The goal is to make at least one set of bounds constant. When in doubt, draw the region and see which surfaces appear naturally constant.

**Student Prompt:** Which system would you use for an ice cream cone (sphere on top of a cone)?

---

### Slide 14 · [SUMMARY]
**Summary & Key Formulas**  ·  `full_width`

**On-screen text** `[20w]`
Cylindrical: dV = r dz dr dθ. Spherical: dV = ρ² sinφ dρ dφ dθ. Match symmetry to the region.

**FULL WIDTH** `[text]`

**Cylindrical:** $(r,\theta,z)$, $dV = r\,dz\,dr\,d\theta$  
**Spherical:** $(\rho,\theta,\phi)$, $dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$  

**Common mistakes:** forgetting Jacobian, misranging φ (0 to π only), using constant ρ when top is a plane.

**Choosing system:** match symmetry – rotational → cylindrical; spherical/conical → spherical.

**Teacher Narration** `[99w]`
> Today we learned how to transform triple integrals into cylindrical and spherical coordinates. The key takeaway is to always include the Jacobian factor: r in cylindrical, ρ squared sin φ in spherical. Remember that φ goes from 0 to π, not 2π. When setting bounds, think about which coordinate is constant on each boundary surface. And choose the coordinate system that makes the region's natural symmetry your friend. With these tools, you can handle a wide variety of problems – from spacecraft fuel tanks to spherical shells with variable density. Keep practicing, and soon it will become second nature.

**Student Prompt:** Review the learning objectives. Can you do each one?

---
