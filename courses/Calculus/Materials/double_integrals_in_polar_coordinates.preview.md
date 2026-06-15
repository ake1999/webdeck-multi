# Double Integrals in Polar Coordinates

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should be comfortable with rectangular double integrals and basic polar coordinates (r, θ).

**Learning Objectives:**
- Convert double integrals from rectangular to polar coordinates using x = r cosθ, y = r sinθ
- Calculate double integrals over circular, annular, and sector-shaped regions using dA = r dr dθ
- Determine appropriate bounds for r and θ from geometric descriptions
- Apply polar integration to compute areas, volumes, and physical quantities

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 74w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
⚠️ **visual_specs**: missing on slides: [14]
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
| 1 | hook | 🟢 | ◧ |  | 61w | 7w | Why Polar Coordinates? |
| 2 | core | 🟢 | ◧ |  | 66w | 12w | Polar Coordinate Transformation |
| 3 | core | 🟢 | ◧ |  | 88w | 12w | The Pizza Principle |
| 4 | 🎛core | 🟢 | ◧ |  | 65w | 11w | Interactive: Explore the Polar Area Element |
| 5 | core | 🟢 | ◧ |  | 78w | 8w | Double Integral in Polar Form |
| 6 | practice | 🟢 | ◧ |  | 76w | 8w | Example 1: Area of a Quarter Circle |
| 7 | practice | 🟢 | ◧ |  | 64w | 11w | Example 2: Volume Under a Paraboloid |
| 8 | misconception | 🟢 | ◧ | ⏸️ | 90w | 8w | Common Mistake: Forgetting the r |
| 9 | practice | 🟡 | ◧ |  | 85w | 12w | Example 3: Taming a Singularity |
| 10 | practice | 🟢 | ◧ |  | 76w | 8w | Example 4: Region Between Two Circles |
| 11 | practice | 🟡 | ◧ |  | 80w | 10w | Example 5: Mass of a Circular Plate |
| 12 | 🎛visual_lab | 🟢 | ◧ |  | 67w | 11w | Interactive: Polar Grid Explorer |
| 13 | 🎛visual_lab | 🟢 | ◧ |  | 66w | 6w | Interactive: Volume Under Paraboloid |
| 14 | pause_and_try | 🟡 | ◧ | ⏸️ | 67w | 12w | Pause & Try: Area of a Cardioid Region |
| 15 | challenge | 🔴 | ◧ |  | 77w | 11w | [Challenge – Optional] General Jacobian Derivation |
| 16 | summary | 🟢 | ⬛⬛ |  | 73w | 7w | Key Takeaways |

---

### Slide 1 · [HOOK]
**Why Polar Coordinates?**  ·  `split_left_right`

**On-screen text** `[7w]`
Polar coordinates simplify integrals over circular regions.

**LEFT** `[text]`

Many regions are naturally circular – disks, annuli, sectors. Rectangular integrals become messy; polar coordinates turn them into clean, manageable problems.

**RIGHT** `[visual_spec]`

*Visual Spec:* A simple line drawing of a pizza cut into wedges. Show one wedge highlighted. Label the radial lines and angle. Include text: 'One slice = sector'. Use warm colors: dough yellow, toppings red.

**Teacher Narration** `[61w]`
> Think about computing the area of a pizza slice using rectangular coordinates — you'd need square roots and piecewise functions. Polar coordinates give us a natural language for circles: distance from the center and angle. That's why we use them for problems with rotational symmetry, from finding the mass of a circular plate to calculating electric fields around a charged disk.

---

### Slide 2 · [CORE]
**Polar Coordinate Transformation**  ·  `split_left_right`

**On-screen text** `[12w]`
$x = r\cos\theta$, $y = r\sin\theta$  —  the bridge between coordinate systems.

**LEFT** `[formula_block]`

$$x = r\cos\theta, \quad y = r\sin\theta$$
$$r^2 = x^2 + y^2, \quad \tan\theta = \frac{y}{x}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* A polar coordinate grid: concentric circles for r = 1,2,3 and radial lines for θ = 0°, 30°, 60°, ... 330°. Label a point (r, θ) with its Cartesian coordinates. Use dashed lines to show the right triangle. Axes: x and y, range -3 to 3.

**Teacher Narration** `[66w]`
> These two formulas are your workhorses. Given an (x, y) point, you can find r using the Pythagorean theorem and theta using the inverse tangent, but careful with quadrants. When you integrate, you'll replace every x and y in the function with these expressions. The integration bounds will be constants or simple functions of theta, much nicer than the awkward expressions you'd get in rectangular coordinates.

---

### Slide 3 · [CORE]
**The Pizza Principle**  ·  `split_left_right`

**On-screen text** `[12w]`
$dA = r\,dr\,d\theta$ — the $r$ accounts for stretching near the edge.

**LEFT** `[text]`

A small polar rectangle: one side $dr$, the other side $r\,d\theta$. Area = $dr \times r\,d\theta = r\,dr\,d\theta$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a zoomed-in polar region with two concentric arcs (r and r+Δr) and two radial lines (θ and θ+Δθ). Shade the tiny 'rectangle'. Label sides: Δr and rΔθ. Use different colors for sides. Add annotation: area ≈ r Δr Δθ.

**Teacher Narration** `[88w]`
> Imagine cutting a pizza into thin wedges, then further slicing each wedge into small radial pieces. A piece near the crust is much larger than one near the center, even though both have the same angular width. That's because the arc length = radius times angle. So a small change in theta gives an arc length of r dθ. Multiply by the radial thickness dr and you get the area: r dr dθ. This r is absolutely essential — forgetting it is the number one mistake students make.

---

### Slide 4 · [CORE] 🎛 *[4 controls]*
**Interactive: Explore the Polar Area Element**  ·  `split_left_right`

**On-screen text** `[11w]`
Explore how changing $r$ and $\theta$ changes the polar rectangle area.

**LEFT** `[text]`

Use the sliders to change $r$ and $\theta$. Observe how the area of the polar rectangle changes.

**RIGHT** `[python_lab]`

*Visual Spec:* An interactive matplotlib plot. Show a polar grid (circles at r=1..5, lines every 30°). Highlight a single polar rectangle defined by sliders for r_start, r_end, theta_start, theta_end. Compute and display area = 0.5*(r_end^2 - r_start^2)*(theta_end - theta_start). Sliders: r_start (0-5), r_end (0-6), theta_start (0-2π), theta_end (0-2π). Update on slider change.

*Interactive Controls:*
  - 🎛 Slider for r_min from 0 to 5
  - 🎛 Slider for r_max from 0 to 6
  - 🎛 Slider for θ_min from 0 to 2π
  - 🎛 Slider for θ_max from 0 to 2π

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider
import matplotlib.patches as patches

fig, ax = plt.subplots(figsize=(6,6), subplot_kw={'projection': 'polar'})
ax.set_title('Polar Rectangle Area')

# Initial rectangle
r0_min, r0_max = 1.0, 2.0
theta0_min, theta0_max = 0.0, np.pi/4

# Plot grid
ax.set_rlim(0, 6)
ax.set_rorigin(0)

# Create rectangle patch
rect = patches.Wedge((0,0), r0_max, theta0_min*180/np.pi, theta0_max*180/np.pi, width=r0_max-r0_min)
ax.add_patch(rect)

# Text for area
area_text = ax.text(0.5, 0.5, '', transform=ax.transAxes, ha='center', va='center', fontsize=12,
                    bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

def update_area(r_min, r_max, theta_min, theta_max):
    area = 0.5 * (r_max**2 - r_min**2) * (theta_max - theta_min)
    area_text.set_text(f'Area = {area:.3f}')
    rect.set_theta1(theta_min*180/np.pi)
    rect.set_theta2(theta_max*180/np.pi)
    rect.set_radius(r_max)
    rect.set_width(r_max - r_min)
    fig.canvas.draw_idle()

update_area(r0_min, r0_max, theta0_min, theta0_max)

# Sliders
axcolor = 'lightgoldenrodyellow'
ax_rmin = plt.axes([0.1, 0.02, 0.3, 0.03], facecolor=axcolor)
ax_rmax = plt.axes([0.5, 0.02, 0.3, 0.03], facecolor=axcolor)
ax_tmin = plt.axes([0.1, 0.07, 0.3, 0.03], facecolor=axcolor)
ax_tmax = plt.axes([0.5, 0.07, 0.3, 0.03], facecolor=axcolor)

s_rmin = Slider(ax_rmin, 'r min', 0, 5, valinit=r0_min)
s_rmax = Slider(ax_rmax, 'r max', 0, 6, valinit=r0_max)
s_tmin = Slider(ax_tmin, 'θ min', 0, 2*np.pi, valinit=theta0_min)
s_tmax = Slider(ax_tmax, 'θ max', 0, 2*np.pi, valinit=theta0_max)

def update(val):
    r_min = s_rmin.val
    r_max = s_rmax.val
    theta_min = s_tmin.val
    theta_max = s_tmax.val
    if r_min < r_max and theta_min < theta_max:
        update_area(r_min, r_max, theta_min, theta_max)

s_rmin.on_changed(update)
s_rmax.on_changed(update)
s_tmin.on_changed(update)
s_tmax.on_changed(update)

plt.show()
```

**Teacher Narration** `[65w]`
> Let's see the polar area element in action. Use the sliders to adjust the inner and outer radii, and the start and end angles. Notice that when you increase r, the area grows even if the angular width stays the same. This is the r factor at work. The area displayed matches the formula we derived. Play with it a little before we move on.

**Student Prompt:** What happens to the area if you double the angular width but keep the radii the same?

---

### Slide 5 · [CORE]
**Double Integral in Polar Form**  ·  `split_left_right`

**On-screen text** `[8w]`
Substitute $x$, $y$, and replace $dA$ with $r\,dr\,d\theta$.

**LEFT** `[formula_block]`

$$\iint_R f(x,y)\,dA = \iint_S f(r\cos\theta, r\sin\theta)\,r\,dr\,d\theta$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a Cartesian region (disk) morphing into a rectangular region in rθ-plane. Arrows indicate mapping. Label: 'Region R in xy' → 'Region S in rθ'. Use colors: blue for disk, green for rectangle.

**Teacher Narration** `[78w]`
> This is the master formula. Whenever you have a double integral over a region that is more naturally described in polar coordinates, you convert the function using x = r cosθ, y = r sinθ, and replace dA with r dr dθ. The integration bounds become bounds on r and θ. A disk of radius R becomes r from 0 to R and θ from 0 to 2π. That's much simpler than the rectangular limits with square roots.

---

### Slide 6 · [PRACTICE]
**Example 1: Area of a Quarter Circle**  ·  `split_left_right`

**On-screen text** `[8w]`
Find area of quarter circle $x\ge0, y\ge0, x^2+y^2\le4$.

**LEFT** `[steps]`

1. Bounds: $0 \leq r \leq 2$, $0 \leq \theta \leq \pi/2$
2. Integral: $\int_0^{\pi/2}\int_0^2 r\,dr\,d\theta$
3. Inner: $\int_0^2 r\,dr = 2$
4. Outer: $\int_0^{\pi/2}2\,d\theta = \pi$

**RIGHT** `[visual_spec]`

*Visual Spec:* A quarter circle in first quadrant, radius 2. Shaded region. Label r=2, θ=π/2. Axes x and y from 0 to 2.

**Teacher Narration** `[76w]`
> Let's start with a warm-up. The region is a quarter circle of radius 2 in the first quadrant. In polar, r goes from 0 to 2, theta from 0 to π/2. We integrate 1 times r dr dθ. The inner integral gives r²/2 evaluated from 0 to 2, which is 2. Then integrate 2 over theta to get π. That matches the geometric area: one quarter of π times 2 squared equals π. Nice and clean.

---

### Slide 7 · [PRACTICE]
**Example 2: Volume Under a Paraboloid**  ·  `split_left_right`

**On-screen text** `[11w]`
Volume under $z = x^2 + y^2$ above the unit disk.

**LEFT** `[steps]`

1. Convert integrand: $x^2 + y^2 = r^2$
2. Bounds: $0 \leq r \leq 1$, $0 \leq \theta \leq 2\pi$
3. Integral: $\int_0^{2\pi}\int_0^1 r^2 \cdot r\,dr\,d\theta = \int_0^{2\pi}\int_0^1 r^3\,dr\,d\theta$
4. Inner: $\frac{1}{4}$
5. Outer: $\frac{\pi}{2}$

**RIGHT** `[visual_spec]`

*Visual Spec:* A 3D plot of paraboloid z = x^2+y^2 over unit disk. Shade the volume region below the surface and above the disk. Use transparency. Axes: x,y from -1 to 1, z from 0 to 1.

**Teacher Narration** `[64w]`
> Now a classic. The paraboloid z = x²+y² over the unit disk. Convert to polar: x²+y² becomes r², and dA becomes r dr dθ. So the integrand is r² times r = r³. Integrate r³ from 0 to 1 gives 1/4, then integrate over theta from 0 to 2π gives π/2. That's the volume. The key step is remembering that extra r from dA.

---

### Slide 8 · [MISCONCEPTION] ⏸️ *[YouTube Pause]*
**Common Mistake: Forgetting the r**  ·  `split_left_right`

**On-screen text** `[8w]`
**Never forget the $r$ in $dA = r\,dr\,d\theta$.**

**LEFT** `[text]`

**Wrong:** $\int_0^{2\pi}\int_0^1 r^2\,dr\,d\theta = \frac{2\pi}{3}$
**Right:** $\int_0^{2\pi}\int_0^1 r^3\,dr\,d\theta = \frac{\pi}{2}$

Without the $r$, the integral overestimates the volume.

**RIGHT** `[visual_spec]`

*Visual Spec:* Horizontal bar chart showing wrong value (2π/3 ≈ 2.09) and correct value (π/2 ≈ 1.57). Label: 'Wrong (forgot r)' in red, 'Correct' in green. Annotate: 'Error: 33% overestimate'.

**Teacher Narration** `[90w]`
> This is the most common error. If you forget the r, you get 2π/3 ≈ 2.09, which is 33% too high. Why? Because the area element in polar is not dr dθ; it's r dr dθ. The r accounts for the fact that a small change in theta sweeps a larger arc when you're far from the origin. Skipping it means you treat all pieces as if they were the same size — they're not. Always double-check: your integrand should have an extra factor of r once you substitute dA.

**Student Prompt:** Why does forgetting the r overestimate the volume?

---

### Slide 9 · [PRACTICE] 🟡
**Example 3: Taming a Singularity**  ·  `split_left_right`

**On-screen text** `[12w]`
$\iint \frac{1}{\sqrt{x^2+y^2}}\,dA$ over unit disk. The $r$ in $dA$ cancels the singularity!

**LEFT** `[steps]`

1. Integrand: $\frac{1}{\sqrt{x^2+y^2}} = \frac{1}{r}$
2. With $dA$: $\frac{1}{r} \cdot r\,dr\,d\theta = 1\,dr\,d\theta$
3. Bounds: $0\leq r\leq 1$, $0\leq \theta\leq 2\pi$
4. Integral: $\int_0^{2\pi}\int_0^1 1\,dr\,d\theta = 2\pi$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D surface plot of z = 1/r over the unit disk, but with the singularity at origin removed. Show the surface rising steeply near origin. Use a cut-out at r=0.1 to show the spike. Color map: 'hot'.

**Teacher Narration** `[85w]`
> This integrand blows up at the origin, so in rectangular coordinates it's unclear if the integral even converges. But polar coordinates save us. The function becomes 1/r, and when we multiply by r dr dθ, the r cancels! We're left with integrating 1 dr dθ over the unit disk. With r from 0 to 1 and θ from 0 to 2π, the integral is 2π. The Jacobian factor r cancels the 1/r, so the integral converges nicely. This is a powerful feature of polar coordinates.

**Student Prompt:** What would happen if the integrand were 1/(x²+y²) instead?

---

### Slide 10 · [PRACTICE]
**Example 4: Region Between Two Circles**  ·  `split_left_right`

**On-screen text** `[8w]`
Area between $x^2+y^2=1$ and $x^2+y^2=4$ in first quadrant.

**LEFT** `[steps]`

1. Bounds: $1 \leq r \leq 2$, $0 \leq \theta \leq \pi/2$
2. Area = $\int_0^{\pi/2}\int_1^2 r\,dr\,d\theta$
3. Inner: $\int_1^2 r\,dr = \frac{3}{2}$
4. Outer: $\frac{3}{2} \cdot \frac{\pi}{2} = \frac{3\pi}{4}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Shaded region between two quarter-circles of radii 1 and 2 in first quadrant. Label radii and angle. Use different shading for the annular region.

**Teacher Narration** `[76w]`
> Now an edge case: an annular sector in the first quadrant. The region is bounded by two circles and two rays. In polar, r goes from 1 to 2, theta from 0 to π/2. Integrate r dr dθ: inner integral gives r²/2 evaluated from 1 to 2, which is (4-1)/2 = 3/2. Multiply by the angular width π/2 to get 3π/4. This matches the geometric area: one quarter of the area between circles pi*(4-1)/4 = 3π/4.

---

### Slide 11 · [PRACTICE] 🟡
**Example 5: Mass of a Circular Plate**  ·  `split_left_right`

**On-screen text** `[10w]`
Mass $M = \iint \rho\,dA$. Plate radius 2, density $\rho=3+x^2+y^2$.

**LEFT** `[steps]`

1. Density: $\rho = 3 + r^2$
2. Bounds: $0 \leq r \leq 2$, $0 \leq \theta \leq 2\pi$
3. Mass = $\int_0^{2\pi}\int_0^2 (3 + r^2) r\,dr\,d\theta$
4. Inner: $\int_0^2 (3r + r^3)\,dr = 6 + 4 = 10$
5. Outer: $10 \cdot 2\pi = 20\pi$

**RIGHT** `[visual_spec]`

*Visual Spec:* A disk of radius 2 colored by density: blue at center (ρ=3) to red at edge (ρ=7). Show colorbar. Indicate mass value.

**Teacher Narration** `[80w]`
> A real application: mass from density. The density varies with distance from the center. Convert to polar: ρ becomes 3 + r². Multiply by r from dA gives (3r + r³). Integrate r from 0 to 2: antiderivative (3r²/2 + r⁴/4) gives 6 + 4 = 10. Then integrate over full circle θ from 0 to 2π to get 20π. The average density is about 5, which makes sense because it ranges from 3 at center to 7 at edge.

---

### Slide 12 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive: Polar Grid Explorer**  ·  `split_left_right`

**On-screen text** `[11w]`
Watch how more subdivisions improve the approximation of the disk area.

**LEFT** `[text]`

Adjust the number of radial divisions and angular wedges. Observe how the polar rectangles fill the disk.

**RIGHT** `[python_lab]`

*Visual Spec:* Animated polar grid on a unit disk. Slider for number of radial divisions (n_r: 1-20) and angular divisions (n_theta: 4-36). As sliders change, redraw grid and highlight one polar rectangle. Show total area approximated by sum of rectangle areas. Update area text.

*Interactive Controls:*
  - 🎛 Slider for number of radial divisions (1-20)
  - 🎛 Slider for number of angular divisions (4-36)

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(6,6), subplot_kw={'projection': 'polar'})
ax.set_title('Polar Grid Explorer')
ax.set_rlim(0, 1)
ax.set_rorigin(0)

# Initial grid
n_r0 = 5
n_theta0 = 8
r = np.linspace(0, 1, n_r0+1)
theta = np.linspace(0, 2*np.pi, n_theta0+1)
R, Theta = np.meshgrid(r, theta)
X = R * np.cos(Theta)
Y = R * np.sin(Theta)

# Plot radial lines
for i in range(n_r0+1):
    ax.plot([0, np.cos(theta[i])], [0, np.sin(theta[i])], color='gray', lw=0.5)
# Plot concentric circles
for j in range(n_r0+1):
    ax.plot(r[j]*np.cos(theta), r[j]*np.sin(theta), color='gray', lw=0.5)

# Highlight one polar rectangle
rect = patches.Rectangle((0,0), 0, 0, color='cyan', alpha=0.3)
ax.add_patch(rect)

area_text = ax.text(0.5, 0.5, '', transform=ax.transAxes, fontsize=12,
                    bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

def update_grid():
    ax.clear()
    ax.set_rlim(0, 1)
    ax.set_rorigin(0)
    ax.set_title('Polar Grid Explorer')
    r = np.linspace(0, 1, n_r+1)
    theta = np.linspace(0, 2*np.pi, n_theta+1)
    for i in range(len(theta)):
        ax.plot([0, r[-1]*np.cos(theta[i])], [0, r[-1]*np.sin(theta[i])], color='gray', lw=0.5)
    for j in range(len(r)):
        ax.plot(r[j]*np.cos(theta), r[j]*np.sin(theta), color='gray', lw=0.5)
    # Highlight a polar rectangle (first one)
    dr = r[1] - r[0]
    dtheta = theta[1] - theta[0]
    rect = patches.Arc((0,0), 2*r[1], 2*r[1], theta1=theta[0]*180/np.pi, theta2=theta[1]*180/np.pi, width=dr, color='cyan', alpha=0.3)
    ax.add_patch(rect)
    area = 0.5*(r[1]**2 - r[0]**2)*dtheta
    area_text.set_text(f'Approx total area = {n_r * n_theta * area:.3f}')
    fig.canvas.draw_idle()

# Sliders
ax_nr = plt.axes([0.1, 0.02, 0.3, 0.03])
ax_nt = plt.axes([0.5, 0.02, 0.3, 0.03])
s_nr = Slider(ax_nr, 'Radial divs', 1, 20, valinit=n_r0, valstep=1)
s_nt = Slider(ax_nt, 'Angular divs', 4, 36, valinit=n_theta0, valstep=1)

def update(val):
    global n_r, n_theta
    n_r = int(s_nr.val)
    n_theta = int(s_nt.val)
    update_grid()

s_nr.on_changed(update)
s_nt.on_changed(update)

plt.show()
```

**Teacher Narration** `[67w]`
> This visual shows how polar rectangles approximate the area of a disk. Use the sliders to increase the number of radial or angular divisions. As you increase both, the sum of the rectangle areas approaches the true area of the disk, which is π. Notice that near the center, the rectangles are tiny — that's the r factor shrinking them. This is why the Jacobian is necessary.

**Student Prompt:** What happens to the total area approximation as you increase both sliders?

---

### Slide 13 · [VISUAL_LAB] 🎛 *[1 controls]*
**Interactive: Volume Under Paraboloid**  ·  `split_left_right`

**On-screen text** `[6w]`
Volume = $\frac{\pi}{2}R^4$. Verify with slider.

**LEFT** `[text]`

Use the slider to change the radius of the disk. See how the volume changes.

**RIGHT** `[python_lab]`

*Visual Spec:* 3D plot of z = r^2 over disk of radius R (slider 0.5 to 3). Show the surface and the base disk. Shade the volume between surface and base. Update volume text. Use alpha for transparency.

*Interactive Controls:*
  - 🎛 Slider for radius from 0.5 to 3.0

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d')
ax.set_xlim(-3, 3)
ax.set_ylim(-3, 3)
ax.set_zlim(0, 9)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
ax.set_title('Volume Under Paraboloid')

# Initial radius
R0 = 1.0
r_vals = np.linspace(0, R0, 30)
theta_vals = np.linspace(0, 2*np.pi, 60)
R, Theta = np.meshgrid(r_vals, theta_vals)
X = R * np.cos(Theta)
Y = R * np.sin(Theta)
Z = R**2

surf = ax.plot_surface(X, Y, Z, cmap='viridis', alpha=0.8)
base = ax.plot_surface(X, Y, np.zeros_like(Z), alpha=0.3, color='gray')

volume_text = ax.text2D(0.5, 0.9, '', transform=ax.transAxes, fontsize=14,
                        bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

def update_plot(R):
    ax.clear()
    ax.set_xlim(-3, 3)
    ax.set_ylim(-3, 3)
    ax.set_zlim(0, 9)
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_zlabel('z')
    ax.set_title('Volume Under Paraboloid')
    r_vals = np.linspace(0, R, 30)
    theta_vals = np.linspace(0, 2*np.pi, 60)
    Rg, Theta = np.meshgrid(r_vals, theta_vals)
    X = Rg * np.cos(Theta)
    Y = Rg * np.sin(Theta)
    Z = Rg**2
    ax.plot_surface(X, Y, Z, cmap='viridis', alpha=0.8)
    ax.plot_surface(X, Y, np.zeros_like(Z), alpha=0.3, color='gray')
    volume = np.pi * R**4 / 2
    volume_text = ax.text2D(0.5, 0.9, f'Volume = {volume:.3f}', transform=ax.transAxes,
                            fontsize=14, bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
    fig.canvas.draw_idle()

ax_slider = plt.axes([0.2, 0.02, 0.6, 0.03])
s_R = Slider(ax_slider, 'Radius', 0.5, 3.0, valinit=R0)

def update(val):
    R = s_R.val
    update_plot(R)

s_R.on_changed(update)

plt.show()
```

**Teacher Narration** `[66w]`
> Now in 3D. This is the volume under the paraboloid z = x²+y² above a disk of adjustable radius. As you drag the slider, the surface expands and the volume changes. The formula we derived gives volume = πR⁴/2. You can check: at R=1, volume is π/2 ≈ 1.57, which matches our earlier calculation. The code displays the correct volume, so you can verify it interactively.

**Student Prompt:** What is the volume when R=2?

---

### Slide 14 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]*
**Pause & Try: Area of a Cardioid Region**  ·  `split_left_right`

**On-screen text** `[12w]`
Set up $\iint 1\,dA$ in polar for the cardioid $r = 1+\cos\theta$.

**LEFT** `[text]`

A region is bounded by $r = 1 + \cos\theta$. Set up the double integral in polar coordinates for its area. Do not evaluate.

**RIGHT** `[image_description]`

**Teacher Narration** `[67w]`
> Here's a challenge to test your understanding. The cardioid is a classic polar curve. Your job is to write a double integral in polar that gives its area. Think about the bounds: r depends on theta, and the curve is traced once as theta goes from 0 to 2π. Pause the video now and try to set it up. I'll give the answer in the next slide.

**Student Prompt:** Write the double integral for the area of the cardioid r = 1 + cosθ.

---

### Slide 15 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] General Jacobian Derivation**  ·  `split_left_right`

**On-screen text** `[11w]`
The $r$ comes from the Jacobian determinant of the polar transformation.

**LEFT** `[text]`

The factor $r$ is the absolute value of the Jacobian determinant of the transformation:

$$J = \det\begin{pmatrix} \frac{\partial x}{\partial r} & \frac{\partial x}{\partial \theta} \\ \frac{\partial y}{\partial r} & \frac{\partial y}{\partial \theta} \end{pmatrix} = r$$

This systematic method extends to any coordinate transformation.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a matrix with cosθ, -r sinθ, sinθ, r cosθ. Compute determinant: cosθ * r cosθ - (-r sinθ)* sinθ = r(cos²θ + sin²θ) = r. Animate the calculation step by step.

**Teacher Narration** `[77w]`
> For those who want a deeper understanding, the factor r in dA is the Jacobian determinant. If you take the partial derivatives of x and y with respect to r and θ, put them in a matrix, and compute its determinant, you get r. This is a general concept: when you change variables in a multiple integral, you multiply by the absolute value of the Jacobian. For polar coordinates, it's r. This derivation unifies all coordinate transformations.

---

### Slide 16 · [SUMMARY]
**Key Takeaways**  ·  `full_width`

**On-screen text** `[7w]`
**Double Integrals in Polar Coordinates – Summary**

**FULL WIDTH** `[text]`

1. $dA = r\,dr\,d\theta$ — remember the $r$!
2. Convert $f(x,y)$ to $f(r\cos\theta, r\sin\theta)$.
3. Bounds: $r$ from inner to outer curve, $\theta$ around the region.
4. Integrate $r$ first, then $\theta$.
5. Polar coordinates tame circular regions and singularities at the origin.

**Teacher Narration** `[73w]`
> Let's recap. The polar area element is r dr dθ, and that r is non-negotiable. When you convert an integral, substitute x and y, replace dA, and use polar bounds. Usually integrate r first, then θ. This approach simplifies problems involving circles, annuli, and sectors, and it can even rescue integrals that blow up at the origin. Practice with the examples we worked through, and you'll be ready for any polar integration problem.

---
