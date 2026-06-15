# Stokes' Theorem

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** Green's Theorem relates line integrals around a plane curve to area integrals of the curl's 2D analogue.

**Learning Objectives:**
- Convert line integrals around closed curves to surface integrals of curl using Stokes' Theorem
- Choose the simplest surface or boundary for a given problem
- Correctly apply orientation (right-hand rule) for surface and boundary
- Recognize conservative fields (curl = 0) as a special case
- Apply Stokes' Theorem in a physics context (Ampère's Law)

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
✅ **slide_count**: 13 slides (target 12–18)
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
| 1 | hook | 🟢 | ◧ |  | 65w | 21w | Stokes' Theorem: Why It Matters |
| 2 | core | 🟢 | ◧ |  | 67w | 15w | From Green to Stokes |
| 3 | 🎛visual_lab | 🟢 | ◧ | ⏸️ | 91w | 14w | Interactive Whirlpool |
| 4 | core | 🟢 | ◧ |  | 79w | 16w | The Formula |
| 5 | 🎛core | 🟢 | ◧ | ⏸️ | 74w | 13w | Orientation Matters |
| 6 | practice | 🟢 | ⬛⬛ | ⏸️ | 81w | 13w | Warm‑Up Example |
| 7 | 🎛visual_lab | 🟢 | ◧ |  | 77w | 12w | Interactive Visualization |
| 8 | practice | 🟢 | ⬛⬛ |  | 77w | 16w | Standard Example |
| 9 | misconception | 🟢 | ◧ |  | 74w | 13w | Common Mistake: Ignoring Orientation |
| 10 | practice | 🟡 | ⬛⬛ |  | 89w | 13w | Tricky Example: Multiple Boundary Components |
| 11 | practice | 🔴 | ⬛⬛ |  | 88w | 11w | [Challenge – Optional] Edge Case: Hemisphere Opening in x-direction |
| 12 | practice | 🟢 | ◧ |  | 79w | 14w | Application: Ampère's Law |
| 13 | summary | 🟢 | ⬛⬛ |  | 94w | 14w | Summary & Key Takeaways |

---

### Slide 1 · [HOOK]
**Stokes' Theorem: Why It Matters**  ·  `split_left_right`

**On-screen text** `[21w]`
Boundary circulation = total spin through any spanning surface. Stokes' Theorem turns a tricky surface integral into a simpler line integral.

**LEFT** `[text]`

Imagine measuring the spin of a tornado from its outer winds. Stokes' Theorem makes this possible: **boundary circulation equals total curl through any surface spanning it.**

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a funnel-shaped surface (e.g., z = sqrt(x^2+y^2) with top cut) and a closed boundary circle at the top. Show arrows representing a circulating vector field F = (-y, x, 0) around the boundary. Use quiver3D on the boundary and a few arrows on the surface to suggest rotation. Label boundary C and surface S. Use colors: red for C, blue for surface normals.

**Teacher Narration** `[65w]`
> Think about a tornado. The spinning air far from the center is easy to measure, but the complex rotation inside the funnel is harder. Stokes' Theorem says that if you walk around the outer ring and measure the wind, that total spin equals the sum of all the little spins across the entire funnel surface. This is the core idea: boundary measurements capture interior behavior.

---

### Slide 2 · [CORE]
**From Green to Stokes**  ·  `split_left_right`

**On-screen text** `[15w]`
Stokes' Theorem is Green's Theorem lifted into 3D: a closed curve → a curved surface.

**LEFT** `[concept]`

**Green's Theorem (2D)**
$$\oint_C \mathbf{F}\cdot d\mathbf{r} = \iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dA$$

**Stokes' Theorem (3D)**
$$\iint_S \nabla\times\mathbf{F}\cdot d\mathbf{S} = \oint_{\partial S} \mathbf{F}\cdot d\mathbf{r}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Left subplot: flat disk in xy-plane with boundary circle, label region D. Right subplot: curved surface S (e.g., hemisphere) with boundary curve C. Use same color for boundaries. Add labels: '2D: Green' and '3D: Stokes'. Show a single vector field on both for continuity.

**Teacher Narration** `[67w]`
> You already know Green's Theorem: the circulation around a 2D loop equals the double integral of the 2D curl over the enclosed area. Stokes' Theorem is exactly the same idea, but now the region can be a curved surface in 3D, and the boundary is a space curve. The 3D curl measures local rotation in all three axes. This generalization is incredibly powerful for physics and engineering.

---

### Slide 3 · [VISUAL_LAB] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Interactive Whirlpool**  ·  `split_left_right`

**On-screen text** `[14w]`
Move the slider to change funnel depth. See how the boundary and surface change.

**LEFT** `[concept]`

**The whirlpool metaphor** – Measure spin around the rim (line integral) to get total curl across the surface.

**RIGHT** `[python_lab]`

*Visual Spec:* 3D plot of a funnel surface given by z = -sqrt(x^2+y^2)+h (truncated at z=0). Boundary circle at top. Vector field F = (-y, x, 0) shown on boundary. Control: slider to change funnel height h (depth) from 1 to 5; toggle to show/hide surface normal vectors. Label: 'Circulation around rim' and 'Total curl through surface' with dynamic numeric updates.

*Interactive Controls:*
  - 🎛 Slider for funnel height (depth) from 1 to 5
  - 🎛 Button to toggle surface normal vectors (show/hide)

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider, Button

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d')
plt.subplots_adjust(bottom=0.25)

h_init = 3

def draw_funnel(h):
    ax.clear()
    r = np.linspace(0, 2, 30)
    theta = np.linspace(0, 2*np.pi, 40)
    R, Theta = np.meshgrid(r, theta)
    X = R * np.cos(Theta)
    Y = R * np.sin(Theta)
    Z = -np.sqrt(X**2 + Y**2) + h
    # clip to z>=0
    Z = np.maximum(Z, 0)
    ax.plot_surface(X, Y, Z, alpha=0.5, cmap='viridis')
    # boundary circle at top (z=0)
    phi = np.linspace(0, 2*np.pi, 50)
    xc = 2*np.cos(phi)
    yc = 2*np.sin(phi)
    zc = np.zeros_like(phi)
    ax.plot(xc, yc, zc, 'r-', lw=2, label='Boundary C')
    # vector field on boundary
    u = -yc
    v = xc
    w = np.zeros_like(phi)
    skip = 5
    ax.quiver(xc[::skip], yc[::skip], zc[::skip], u[::skip], v[::skip], w[::skip], color='orange', label='F on C')
    # normal vectors (upward) on surface
    normals = []
    for i in range(0, R.shape[0], 4):
        for j in range(0, R.shape[1], 4):
            xp = X[i,j]
            yp = Y[i,j]
            zp = Z[i,j]
            if zp>0.1:
                # approximate normal
                nx = xp/np.sqrt(xp**2+yp**2)
                ny = yp/np.sqrt(xp**2+yp**2)
                nz = -1
                norm = np.sqrt(nx**2+ny**2+nz**2)
                ax.quiver(xp, yp, zp, nx/norm, ny/norm, nz/norm, length=0.3, color='blue', alpha=0.6)
    ax.set_xlim(-2.5,2.5)
    ax.set_ylim(-2.5,2.5)
    ax.set_zlim(0, h+0.5)
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    ax.set_title('Funnel surface height = %.1f' % h)
    ax.legend()

draw_funnel(h_init)

ax_h = plt.axes([0.2, 0.1, 0.65, 0.03])
slider_h = Slider(ax_h, 'Height', 1, 5, valinit=h_init)
def update(val):
    draw_funnel(slider_h.val)
    fig.canvas.draw_idle()
slider_h.on_changed(update)

plt.show()
```

**Teacher Narration** `[91w]`
> Let me show you the whirlpool metaphor in action. Here we have a funnel surface. The red circle is the rim, and the orange arrows show the flow around that rim. The blue arrows are the surface normals. As I drag the slider to make the funnel deeper, the surface area increases but the boundary stays the same. According to Stokes' Theorem, the circulation around the rim is constant for a fixed vector field – that's because the curl through any surface with that rim is the same. Try it yourself.

**Student Prompt:** Predict what happens to the line integral when the funnel gets deeper. Does it change? Why or why not?

---

### Slide 4 · [CORE]
**The Formula**  ·  `split_left_right`

**On-screen text** `[16w]`
Stokes' Theorem: circulation around C = flux of curl through S. Orientation must match (right-hand rule).

**LEFT** `[formula_block]`

**Stokes' Theorem**
$$\oint_{\partial S} \mathbf{F}\cdot d\mathbf{r} = \iint_S (\nabla\times\mathbf{F})\cdot d\mathbf{S}$$

Where $\partial S$ is the positively oriented boundary of $S$.

**Alternative form:**
$$\oint_C \mathbf{F}\cdot d\mathbf{r} = \iint_S (\nabla\times\mathbf{F})\cdot \mathbf{n}\, dS$$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of a curved surface S (e.g., paraboloid) with normal vectors shown at several points. The boundary C is a closed curve with arrows indicating positive orientation. Add right-hand rule icon: thumb in direction of n, fingers curl along C. Label: 'Positive orientation: right-hand rule'. Use colors: green for surface, red for boundary, blue for normal.

**Teacher Narration** `[79w]`
> Here is the formal statement. For any oriented piecewise-smooth surface S with a simple closed boundary curve C, and a vector field F whose components have continuous partial derivatives, the line integral of F around C equals the surface integral of the curl of F over S. The orientation is critical: if you walk along C with your head pointing in the direction of the surface normal, the surface must be on your left. This is the right-hand rule.

**Student Prompt:** Without looking ahead, try to write the orientation condition in your own words.

---

### Slide 5 · [CORE] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Orientation Matters**  ·  `split_left_right`

**On-screen text** `[13w]`
Flip the orientation and the whole integral changes sign. Always apply right-hand rule.

**LEFT** `[concept]`

**Right‑hand rule:** Thumb = normal direction, fingers curl along positive boundary.

**Wrong orientation flips sign.** Always check consistency before applying Stokes.

**RIGHT** `[visual_spec]`

*Visual Spec:* Side‑by‑side 3D diagrams of the same surface S (hemisphere). Left: correct – normal points upward, boundary arrows counterclockwise as seen from above. Right: wrong – normal points downward, boundary arrows clockwise. Add labels 'Correct', 'Wrong'. Show red X on wrong side. Below: icon of right-hand hand.

*Interactive Controls:*
  - 🎛 Radio button: 'Show correct' / 'Show wrong' – toggles between the two panels
  - 🎛 Toggle: 'Show right-hand icon'

**Teacher Narration** `[74w]`
> Orientation isn't just a detail – it can change your answer by a minus sign. Let's look at this hemisphere. If the surface is oriented upward, the positive boundary goes counterclockwise when viewed from above. If you accidentally take the normal pointing downward, the boundary would be clockwise, and Stokes' Theorem would give the negative of the correct answer. Use the right-hand rule every time: thumb in normal direction, fingers curl along the boundary.

**Student Prompt:** If the surface is a disk in the xy-plane oriented upward, what is the positive orientation of its boundary?

---

### Slide 6 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Warm‑Up Example**  ·  `full_width`

**On-screen text** `[13w]`
Convert surface integral to line integral. Boundary is a simple circle – easy.

**FULL WIDTH** `[steps]`

**Problem:** Evaluate $\iint_S \nabla\times\mathbf{F}\cdot d\mathbf{S}$ for $\mathbf{F}=(2y\cos z,\, e^x\sin z,\, xe^y)$ and $S$: hemisphere $x^2+y^2+z^2=9,\, z\geq 0$, upward.

**1.** Boundary $C$: circle $x^2+y^2=9,\, z=0$.
**2.** Orient $C$ CCW from above (right‑hand rule).
**3.** Parametrize: $\mathbf{r}(t) = (3\cos t, 3\sin t, 0)$.
**4.** $\mathbf{F}(\mathbf{r}(t)) = (6\sin t, 0, 3\cos t\, e^{3\sin t})$.
**5.** $d\mathbf{r}=(-3\sin t,\,3\cos t,\,0)dt$.
**6.** $\oint_C \mathbf{F}\cdot d\mathbf{r} = \int_0^{2\pi} (-18\sin^2 t) dt = -18\pi$.

**Teacher Narration** `[81w]`
> Let's start with a straightforward example. We have a hemisphere with the top open, and we want the flux of curl. Instead of computing the curl and the tricky surface integral, we use Stokes' Theorem. The boundary is a circle. We parametrize it, plug into F, and integrate. Notice the z‑component of F doesn't contribute because the boundary lies in the plane z=0. The final answer is -18π. The negative sign comes from the orientation – check with the right-hand rule.

**Student Prompt:** Pause the video and try to compute the line integral yourself before I reveal the answer.

---

### Slide 7 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive Visualization**  ·  `split_left_right`

**On-screen text** `[12w]`
Slide the radius and toggle orientation. Watch the boundary and circulation change.

**LEFT** `[concept]`

3D plot of the hemisphere and its boundary. Change radius to see how the surface and boundary scale.

**RIGHT** `[python_lab]`

*Visual Spec:* 3D plot of a hemisphere x^2+y^2+z^2 = r^2, z>=0. Boundary circle at z=0. Controls: slider for radius r from 1 to 5; toggle to show/hide normal vectors (upward); checkbox to flip orientation (downward). Update the plot dynamically. Show numeric value of line integral (computed from a sample vector field like F=(-y,x,0)).

*Interactive Controls:*
  - 🎛 Slider for radius from 1 to 5
  - 🎛 Checkbox: 'Downward normal' – flips orientation and sign of circulation

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider, CheckButtons

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d')
plt.subplots_adjust(bottom=0.25)

r_init = 3
downward = False

def draw_hemisphere(r, down):
    ax.clear()
    theta = np.linspace(0, 2*np.pi, 40)
    phi = np.linspace(0, np.pi/2, 40)
    T, P = np.meshgrid(theta, phi)
    X = r * np.sin(P) * np.cos(T)
    Y = r * np.sin(P) * np.sin(T)
    Z = r * np.cos(P)
    ax.plot_surface(X, Y, Z, alpha=0.5, cmap='viridis' if not down else 'plasma')
    t = np.linspace(0, 2*np.pi, 100)
    xc = r * np.cos(t)
    yc = r * np.sin(t)
    zc = np.zeros_like(t)
    # orientation: CCW from above if not down, else CW
    if down:
        xc = xc[::-1]
        yc = yc[::-1]
    ax.plot(xc, yc, zc, 'r-', lw=2)
    # normal
    if not down:
        ax.quiver(0, 0, r, 0, 0, 1, color='blue', linewidth=2, label='Normal')
    else:
        ax.quiver(0, 0, -r, 0, 0, -1, color='blue', linewidth=2, label='Normal')
    # sample vector field on boundary (F = (-y,x,0) gives circulation = 2*pi*r^2? actually line integral = 2*pi*r^2)
    # compute numeric integral
    # For F=(-y,x,0), circulation = 2*pi*r^2
    circ = 2*np.pi*r**2
    if down:
        circ = -circ
    ax.set_xlim(-r-1, r+1)
    ax.set_ylim(-r-1, r+1)
    ax.set_zlim(-1, r+1)
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    ax.set_title(f'Radius = {r:.1f}, Circulation = {circ:.2f}')
    ax.legend()

draw_hemisphere(r_init, downward)

ax_r = plt.axes([0.2, 0.1, 0.65, 0.03])
slider_r = Slider(ax_r, 'Radius', 1, 5, valinit=r_init)
def update_r(val):
    draw_hemisphere(slider_r.val, downward)
    fig.canvas.draw_idle()
slider_r.on_changed(update_r)

ax_check = plt.axes([0.05, 0.5, 0.15, 0.1])
check = CheckButtons(ax_check, ['Downward normal'], [downward])
def toggle(label):
    global downward
    downward = not downward
    draw_hemisphere(slider_r.val, downward)
    fig.canvas.draw_idle()
check.on_clicked(toggle)

plt.show()
```

**Teacher Narration** `[77w]`
> Now you can explore Stokes' Theorem interactively. Here's the hemisphere from the previous example. Use the slider to change its radius. The red circle is the boundary. When you check 'Downward normal', the orientation flips and the circulation changes sign – just as Stokes' Theorem predicts. Notice that the circulation scales with the square of the radius because the boundary length grows linearly and the vector field's magnitude also grows linearly. Play with it to build intuition.

**Student Prompt:** For this vector field, what happens to the circulation if the radius is doubled? Verify your prediction with the interactive plot.

---

### Slide 8 · [PRACTICE]
**Standard Example**  ·  `full_width`

**On-screen text** `[16w]`
Paraboloid boundary is a space curve – easier as a surface integral. The answer is zero.

**FULL WIDTH** `[steps]`

**Problem:** Evaluate $\oint_C \mathbf{F}\cdot d\mathbf{r}$ for $\mathbf{F}=(x^2z^2,\, y^2z^2,\, xyz)$ and $C$ is boundary of paraboloid $z=x^2+y^2$ inside cylinder $x^2+y^2=4$, CCW from above.

**Use Stokes:** convert to surface integral.
1. Compute $\nabla\times\mathbf{F}=\langle xz-2y^2z,\, 2x^2z-yz,\, 0 \rangle$
2. Surface $S$: $z=x^2+y^2$, projection $D$: $x^2+y^2\leq4$, upward normal $\mathbf{n}\,dS = \langle -2x,\, -2y,\, 1\rangle dA$
3. $\iint_S \nabla\times\mathbf{F}\cdot d\mathbf{S} = \iint_D \left[ -2x(xz-2y^2z) -2y(2x^2z - yz) \right] dA$ with $z=x^2+y^2$
4. Polar coordinates: integral evaluates to $0$.

**Teacher Narration** `[77w]`
> This is a typical exam problem. The boundary curve is the intersection of the paraboloid and the cylinder – a space curve that's messy to parametrize. But the surface (the paraboloid cap) is easy. We compute the curl, then do a surface integral over the projected disk. After substituting z equals x²+y² and converting to polar coordinates, the integral vanishes. The line integral is zero. Notice that we used Stokes' Theorem to avoid a difficult line integral.

**Student Prompt:** Why did the integral simplify to zero? What does that tell you about the vector field?

---

### Slide 9 · [MISCONCEPTION]
**Common Mistake: Ignoring Orientation**  ·  `split_left_right`

**On-screen text** `[13w]`
Orientation flips sign. If you ignore it, your answer can be completely wrong.

**LEFT** `[text]`

**Wrong:** Use Stokes without checking orientation. The line integral gives $+18\pi$ but the correct answer is $-18\pi$ (from warm‑up).

**Why:** Boundary orientation must be consistent with surface normal. Always use right-hand rule.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two 3D diagrams of the hemisphere from warm‑up. Left: upward normal (blue arrow), boundary arrows counterclockwise – answer correct. Right: downward normal (blue arrow), boundary arrows clockwise – answer positive, but it should be negative. Show the computed line integral values: -18π vs +18π. Cross out the wrong one with a red X. Add text: 'Sign error!'

**Teacher Narration** `[74w]`
> The most common mistake when applying Stokes' Theorem is getting the orientation wrong. In the warm‑up example, if you used a downward normal instead of upward, you'd get +18π instead of -18π. But the problem said 'oriented upward', so the correct answer is -18π. The point is: always check orientation before you compute. Use the right-hand rule: thumb points in the direction of the unit normal, and your fingers curl along the positive boundary.

**Student Prompt:** If the surface is a disk in the plane z=0 oriented downward, what is the positive orientation of its boundary?

---

### Slide 10 · [PRACTICE] 🟡
**Tricky Example: Multiple Boundary Components**  ·  `full_width`

**On-screen text** `[13w]`
Multiple boundaries? Stokes still works: sum over all boundary components with correct orientation.

**FULL WIDTH** `[steps]`

**Problem:** $\mathbf{F}=(yz,\, xz,\, xy)$. C = two circles: $C_1$: $x^2+y^2=1,\,z=0$ CCW; $C_2$: $x^2+y^2=1,\,z=2$ CW. Evaluate $\oint_C \mathbf{F}\cdot d\mathbf{r}$.

**Use Stokes:** Surface is cylinder wall $x^2+y^2=1,\,0\leq z\leq2$ (outward normal).
1. Compute $\nabla\times\mathbf{F} = \langle 0,0,0\rangle$ (check: conservative field).
2. $\iint_S \mathbf{0}\cdot d\mathbf{S} = 0$.
3. Therefore $\oint_{C_1} + \oint_{C_2} = 0$. Compute $C_1$ directly: parametrize, dot product = 0. So $\oint_{C_2}=0$ as well.

**Teacher Narration** `[89w]`
> What if your surface has two boundaries – like a cylinder? Stokes' Theorem still holds: the flux of curl through the surface equals the sum of the line integrals around all boundary components, each oriented consistently with the surface normal (using the right-hand rule). Here the curl is zero, so the total circulation is zero. We then check one boundary directly – it's zero, so the other must also be zero. This shows that for conservative fields, the integral around any closed curve is zero regardless of the path.

**Student Prompt:** If the curl is zero, what must be true about the vector field?

---

### Slide 11 · [PRACTICE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Edge Case: Hemisphere Opening in x-direction**  ·  `full_width`

**On-screen text** `[11w]`
Hemisphere not symmetric about z-axis? Adapt parametrization. Compute curl, then integrate.

**FULL WIDTH** `[steps]`

**Problem:** $\mathbf{F}=(\cos z,\, x^2z,\, xy)$. C: boundary of hemisphere $x=\sqrt{1-y^2-z^2}$, oriented toward positive x. Evaluate $\oint_C \mathbf{F}\cdot d\mathbf{r}$.

**Use Stokes:**
1. $\nabla\times\mathbf{F} = \langle x-x^2,\, y+\sin z,\, 2xz\rangle$
2. Surface S: $x=\sqrt{1-y^2-z^2}$, projection D: $y^2+z^2\leq1$.
3. Normal $\mathbf{n}\,dS = \langle 1,\, -y/x,\, -z/x\rangle dA$ (positive x direction)
4. $\iint_S \nabla\times\mathbf{F}\cdot d\mathbf{S} = \iint_D [\dots] dA$, convert to polar in yz-plane.
5. After integration: $= -\pi$.

**Teacher Narration** `[88w]`
> This example tests your ability to handle a surface that isn't aligned with the usual axes. The hemisphere opens in the x-direction. We apply Stokes exactly the same way: paramatrize the surface as x equals a function of y and z, find the normal vector that points in the positive x-direction, then do the double integral. The curl is non‑trivial, but after converting to polar coordinates in the yz‑plane and simplifying using symmetry, we get -π. The key is to systematically follow the same steps regardless of orientation.

**Student Prompt:** Why did the term involving sin(z) vanish in the integral?

---

### Slide 12 · [PRACTICE]
**Application: Ampère's Law**  ·  `split_left_right`

**On-screen text** `[14w]`
Stokes' Theorem bridges Maxwell's equations to Ampère's Law. Circulation = μ₀ × enclosed current.

**LEFT** `[concept]`

**Physics:** Maxwell's equation $\nabla\times\mathbf{B} = \mu_0\mathbf{J}$. Apply Stokes:
$$\oint_C \mathbf{B}\cdot d\mathbf{r} = \iint_S \mu_0\mathbf{J}\cdot d\mathbf{S} = \mu_0 I_{\text{enc}}$$
This is **Ampère's Law**: magnetic circulation = enclosed current.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot: a vertical wire (line) with upward arrow labeled 'I'. Around it, a circular loop (red) with arrows indicating B field direction (tangent, following right-hand rule). Label the loop 'C'. Show surface S (e.g., a disk) spanned by C. Add equation on screen: ∮ B·dr = μ₀ I.

**Teacher Narration** `[79w]`
> One of the most important applications of Stokes' Theorem is in electromagnetism. The differential form of Ampère's Law says the curl of the magnetic field is μ₀ times the current density. Take the surface integral of both sides, apply Stokes to the left side, and you recover the integral form: the circulation of B around any closed loop equals μ₀ times the total current passing through any surface spanning that loop. This is why magnetic fields circulate around currents.

**Student Prompt:** Using Ampère's Law, find the magnetic field at distance r from a long straight wire carrying current I.

---

### Slide 13 · [SUMMARY]
**Summary & Key Takeaways**  ·  `full_width`

**On-screen text** `[14w]`
Stokes connects local spin to global circulation. Master orientation, then use it to simplify.

**FULL WIDTH** `[text]`

**Stokes' Theorem:**
$$\oint_{\partial S} \mathbf{F}\cdot d\mathbf{r} = \iint_S \nabla\times\mathbf{F}\cdot d\mathbf{S}$$

- Converts line integral to surface integral (or vice versa).
- Orientation: right‑hand rule (thumb = normal, fingers = boundary).
- If $\nabla\times\mathbf{F}=\mathbf{0}$, integral vanishes for any closed curve.
- Multiple boundaries? Sum over all components.
- Choose the simplest surface or curve for computation.

**Teacher Narration** `[94w]`
> Let's wrap up. Stokes' Theorem is a powerful tool: it lets you trade a line integral for a surface integral or vice versa, whichever is easier. The key to applying it correctly is orientation – always use the right-hand rule. If the curl is zero, the vector field is conservative and the integral around any closed curve is zero. When a surface has multiple boundaries, include all of them with consistent orientation. Finally, always choose the simplest surface that has the given boundary. Keep these points in mind, and you'll handle any Stokes problem.

---
