# Curl and Divergence

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You need partial derivatives and vector fields: F(x,y,z)=Pi+Qj+Rk.

**Learning Objectives:**
- Calculate curl and divergence of vector fields using the del operator
- Interpret curl as rotation and divergence as expansion/contraction in fluid flow
- Apply identities curl(grad f)=0 and div(curl F)=0 to analyze fields
- Determine whether a field can be conservative or the curl of another field
- Connect curl and divergence to physical intuition about fluid motion

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
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
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
| 1 | hook | 🟢 | ◧ |  | 75w | 6w | Why Curl and Divergence Matter |
| 2 | core | 🟢 | ◧ |  | 78w | 12w | Definition: Curl |
| 3 | core | 🟢 | ◧ |  | 73w | 12w | Definition: Divergence |
| 4 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 71w | 14w | Pause: Compute Curl of a Simple Field |
| 5 | practice | 🟢 | ⬛⬛ |  | 65w | 8w | Example 1: Warm-Up Curl (Solution) |
| 6 | core | 🟢 | ◧ |  | 72w | 10w | Key Identity: Curl of a Gradient |
| 7 | challenge | 🔴 | ⬛⬛ |  | 72w | 5w | [Challenge – Optional] Proof: curl(grad f)=0 |
| 8 | core | 🟢 | ◧ |  | 66w | 15w | Key Identity: Divergence of a Curl |
| 9 | practice | 🟡 | ⬛⬛ |  | 66w | 13w | Example 2: Impossibility of Curl Representation (Tricky) |
| 10 | core | 🟢 | ◧ |  | 77w | 12w | The Laplacian |
| 11 | practice | 🟡 | ⬛⬛ |  | 74w | 4w | Example 3: Laplacian of a Simple Function (Edge Case) |
| 12 | misconception | 🟢 | ⬛⬛ |  | 70w | 9w | Common Mistake: Sign Errors in Curl |
| 13 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 61w | 6w | Pause: Predict Divergence of a Fluid Field |
| 14 | practice | 🟡 | ⬛⬛ |  | 61w | 13w | Example 4: Fluid Flow Analysis (Application) |
| 15 | 🎛visual_lab | 🟢 | ◧ |  | 70w | 9w | Visual Lab: Explore Curl & Divergence in 2D |
| 16 | summary | 🟢 | ⬛⬛ |  | 77w | 10w | Summary: Key Takeaways |

---

### Slide 1 · [HOOK]
**Why Curl and Divergence Matter**  ·  `split_left_right`

**On-screen text** `[6w]`
Curl: rotation. Divergence: expansion or compression.

**LEFT** `[text]`

Ever wondered why water swirls down a drain, or how air flows around a wing? **Curl** measures local rotation; **divergence** measures how much a field spreads or converges.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two simple 2D vector field sketches: left a rotating field F=(-y,x), arrows circling; right a radial field F=(x,y), arrows pointing outward. Use gray background, arrows in blue (curl) and red (divergence). Add labels 'Rotation → nonzero curl' and 'Expansion → positive divergence'.

**Teacher Narration** `[75w]`
> Imagine you drop a tiny paddlewheel into a flowing river. If the wheel spins, the river has nonzero curl at that point. Now imagine a tiny inflatable balloon in the flow. If the balloon expands, the fluid is diverging outward; if it shrinks, divergence is negative. These two operations tell us the local behavior of any vector field, from fluid velocity to electromagnetic fields. Today we'll learn how to compute them and what they mean.

---

### Slide 2 · [CORE]
**Definition: Curl**  ·  `split_left_right`

**On-screen text** `[12w]`
Curl = cross product of del with F. Result is a vector.

**LEFT** `[formula_block]`

$$\text{curl }\mathbf{F} = \nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ P & Q & R \end{vmatrix}$$ $$= \left(\frac{\partial R}{\partial y}-\frac{\partial Q}{\partial z}\right)\mathbf{i} +\left(\frac{\partial P}{\partial z}-\frac{\partial R}{\partial x}\right)\mathbf{j} +\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)\mathbf{k}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Show 3x3 determinant with colors: first row (i, j, k) in red, second row (∂/∂x, ∂/∂y, ∂/∂z) in green, third row (P, Q, R) in blue. Arrows from each term to the corresponding partial derivative pair. Include small coordinate axes to indicate direction. Use a cool, clean design.

**Teacher Narration** `[78w]`
> The curl of a vector field is a vector that points along the axis of local rotation. You compute it just like a cross product, using the del operator as a vector of partial derivatives. The determinant form helps you remember the pattern: the i-component subtracts two partials of R and Q, the j-component subtracts the other way, and the k-component uses Q and P. Notice the minus sign on the j term — that's a common trap.

---

### Slide 3 · [CORE]
**Definition: Divergence**  ·  `split_left_right`

**On-screen text** `[12w]`
Divergence = dot product of del with F. Result is a scalar.

**LEFT** `[formula_block]`

$$\text{div }\mathbf{F} = \nabla \cdot \mathbf{F} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Three partial derivative terms (dP/dx, dQ/dy, dR/dz) converging into a single scalar value. Show small arrows along x,y,z axes with labels. Use a '+' symbol as a junction. Color each term a different shade.

**Teacher Narration** `[73w]`
> Divergence is much simpler: just the sum of three partial derivatives. It tells you how much the field spreads out from a point. If you have a velocity field, positive divergence means fluid is being created (a source); negative divergence means fluid is disappearing (a sink). Remember that divergence is a scalar, not a vector — you'll often see students write it with an arrow, but it's just a number at each point.

---

### Slide 4 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause: Compute Curl of a Simple Field**  ·  `split_left_right`

**On-screen text** `[14w]`
curl F = ?  Components: P = xz, Q = xyz, R = -y².

**LEFT** `[concept]`

Let $\mathbf{F}(x,y,z) = xz\,\mathbf{i} + xyz\,\mathbf{j} - y^2\,\mathbf{k}$.

Find $\text{curl }\mathbf{F}$ before the solution appears.

**RIGHT** `[visual_spec]`

*Visual Spec:* Text area showing the field. After clicking 'Show Solution', reveal a step-by-step table (identical to next slide's left content). Use a simple overlay animation.

*Interactive Controls:*
  - 🎛 Button: Show solution

**Teacher Narration** `[71w]`
> Take two minutes to compute the curl of this field. Identify P, Q, R, then plug into each component formula. The answer is on the next slide — try it before you look! This is a great way to build muscle memory for the determinant expansion. If you get stuck, remember the j-component has a minus sign built in. Once you have your answer, press the button to check your work.

**Student Prompt:** Compute the curl. Then press 'Show solution' to check.

---

### Slide 5 · [PRACTICE]
**Example 1: Warm-Up Curl (Solution)**  ·  `full_width`

**On-screen text** `[8w]`
curl F = (-y(2+x))i + xj + yzk

**FULL WIDTH** `[steps]`

| Step | Action | Result |
|------|--------|--------|
| 1 | Identify components | $P=xz$, $Q=xyz$, $R=-y^2$ |
| 2 | i-component: $\frac{\partial R}{\partial y}-\frac{\partial Q}{\partial z}$ | $(-2y)-(xy) = -y(2+x)$ |
| 3 | j-component: $\frac{\partial P}{\partial z}-\frac{\partial R}{\partial x}$ | $(x)-(0) = x$ |
| 4 | k-component: $\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}$ | $(yz)-(0) = yz$ |

**Result:** $\text{curl }\mathbf{F} = -y(2+x)\,\mathbf{i} + x\,\mathbf{j} + yz\,\mathbf{k}$

**Teacher Narration** `[65w]`
> Here's the full solution. We computed each component step by step. Notice the i-component came from subtracting the two partials. The j-component required careful handling of the sign because the standard formula subtracts the other way. The k-component was straightforward. Now you try a similar one on your own. This step-by-step approach will help you avoid sign errors and build confidence with the curl formula.

---

### Slide 6 · [CORE]
**Key Identity: Curl of a Gradient**  ·  `split_left_right`

**On-screen text** `[10w]`
Any conservative field (gradient of a scalar) has zero curl.

**LEFT** `[formula_block]`

$$\text{curl}(\nabla f) = \mathbf{0}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Show the scalar field f(x,y)=x^2+y^2 as a surface (bowl). Overlay its gradient as arrows pointing outward. Next to it, show the curl as zero vector at three sample points (green dots). Use 3D plot with mplot3d.

**Teacher Narration** `[72w]`
> This is a powerful result: the curl of any gradient field is always zero. Physically, water flowing downhill under gravity has zero curl — no rotation. Mathematically, this comes from the equality of mixed partials. Conversely, if a field has zero curl and its domain is simply connected (meaning it has no holes), then it is conservative (a gradient). But watch out: that last part requires the domain to have no holes.

---

### Slide 7 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof: curl(grad f)=0**  ·  `full_width`

**On-screen text** `[5w]`
curl(∇f)=0 because mixed partials commute.

**FULL WIDTH** `[steps]`

Let $\mathbf{F} = \nabla f = \frac{\partial f}{\partial x}\mathbf{i}+\frac{\partial f}{\partial y}\mathbf{j}+\frac{\partial f}{\partial z}\mathbf{k}$.

Then i-component of curl:
$\frac{\partial}{\partial y}\left(\frac{\partial f}{\partial z}\right)-\frac{\partial}{\partial z}\left(\frac{\partial f}{\partial y}\right)=f_{zy}-f_{yz}=0$
(Clairaut's theorem). Same for j and k components. Hence curl = 0.

**Teacher Narration** `[72w]`
> If you're comfortable with partial derivatives, here's why the identity holds. Each component of curl becomes a difference of two mixed partials of f. By Clairaut's theorem, as long as f has continuous second derivatives, these mixed partials are equal and subtract to zero. This is a clean, rigorous proof — and it's exactly why gradient fields are irrotational. Understanding this proof deepens your intuition for why conservative fields have no rotation.

---

### Slide 8 · [CORE]
**Key Identity: Divergence of a Curl**  ·  `split_left_right`

**On-screen text** `[15w]`
A field that can be written as curl of another field must have zero divergence.

**LEFT** `[formula_block]`

$$\text{div}(\text{curl }\mathbf{F}) = 0$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Left: a pure curl field (like vortex) with div=0 annotation. Right: a field with non-zero divergence (radial) marked 'impossible as curl of some field'. Use arrows in different colors.

**Teacher Narration** `[66w]`
> The second essential identity: divergence of any curl is always zero. This means if a vector field has nonzero divergence anywhere, it can never be written as the curl of another field. This is a quick way to rule out certain physical situations. For example, an electric field with a point charge source has non-zero divergence, so it cannot be the curl of any vector potential.

---

### Slide 9 · [PRACTICE] 🟡
**Example 2: Impossibility of Curl Representation (Tricky)**  ·  `full_width`

**On-screen text** `[13w]`
div F ≠ 0 ⇒ F cannot be curl of another vector field.

**FULL WIDTH** `[steps]`

Show $\mathbf{F}=xz\,\mathbf{i}+xyz\,\mathbf{j}-y^2\,\mathbf{k}$ cannot be written as $\text{curl }\mathbf{G}$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Compute $\text{div }\mathbf{F}$ | From earlier: $\text{div }\mathbf{F} = z(1+x)$ |
| 2 | Note $\text{div }\mathbf{F} \neq 0$ (unless $z=0$ or $x=-1$) | Not identically zero |
| 3 | Assume $\mathbf{F}=\text{curl }\mathbf{G}$ | Then $\text{div }\mathbf{F} = \text{div}(\text{curl }\mathbf{G})=0$ |
| 4 | Contradiction! $\text{div }\mathbf{F}=z(1+x)\neq 0$ | So $\mathbf{F}$ is **not** the curl of any field. |

**Teacher Narration** `[66w]`
> This example shows how to use the identity in a proof. Instead of trying to find a G such that curl G = F (which would lead to a system of PDEs), we simply check divergence. Because div F is not identically zero, it violates the necessary condition that divergence of any curl is zero. So the answer is immediate: no such vector field G exists.

---

### Slide 10 · [CORE]
**The Laplacian**  ·  `split_left_right`

**On-screen text** `[12w]`
Laplacian = divergence of gradient. Measures local curvature of a scalar field.

**LEFT** `[formula_block]`

$$\nabla^2 f = \text{div}(\nabla f) = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} + \frac{\partial^2 f}{\partial z^2}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* A 3D surface plot of f(x,y)=x^2+y^2 with color map showing curvature. Mark points where Laplacian is positive (upward curvature). Add a small grid on the xy-plane.

**Teacher Narration** `[77w]`
> Combining the two operations, we define the Laplacian as the divergence of the gradient. It's a scalar operator that tells you how much the value at a point differs from its average on a small surrounding sphere. In heat flow, the Laplacian describes temperature diffusion. The equation ∇²f = 0 is Laplace's equation, which governs steady-state phenomena like electrostatics. This operator is fundamental in physics and engineering, appearing in the wave equation, heat equation, and Schrödinger equation.

---

### Slide 11 · [PRACTICE] 🟡
**Example 3: Laplacian of a Simple Function (Edge Case)**  ·  `full_width`

**On-screen text** `[4w]`
∇²(x²+y²+z²) = 6 (constant).

**FULL WIDTH** `[steps]`

Find $\nabla^2 f$ for $f(x,y,z)=x^2+y^2+z^2$.

| Step | Action | Result |
|------|--------|--------|
| 1 | First partials | $f_x=2x,\, f_y=2y,\, f_z=2z$ |
| 2 | Second partials | $f_{xx}=2,\, f_{yy}=2,\, f_{zz}=2$ |
| 3 | Sum | $\nabla^2 f = 2+2+2 = 6$ |

Interpretation: constant positive Laplacian means the function curves upward everywhere like a paraboloid.

**Teacher Narration** `[74w]`
> This function is the simplest example of a bowl shape. Its Laplacian is constant 6. Importantly, if the function were x²+y²-z², the Laplacian would be 2+2-2=2, still positive, but the surface is a saddle. So Laplacian doesn't distinguish between bowl and saddle — it only measures average curvature. That nuance is useful for advanced applications. Understanding this helps you interpret the Laplacian as a measure of how much a function deviates from being harmonic.

---

### Slide 12 · [MISCONCEPTION]
**Common Mistake: Sign Errors in Curl**  ·  `full_width`

**On-screen text** `[9w]`
Curl j-component: ∂P/∂z - ∂R/∂x (not the other way).

**FULL WIDTH** `[steps]`

**Wrong approach**: Some students compute the j-component as $\frac{\partial R}{\partial x} - \frac{\partial P}{\partial z}$, forgetting the minus sign in the determinant expansion.

**Correct**: $\mathbf{j}$-component is $\frac{\partial P}{\partial z} - \frac{\partial R}{\partial x}$.

Example: If $\mathbf{F}=z\mathbf{i} - x\mathbf{k}$, then:
- Wrong: j = 0 - 1 = -1
- Right: j = 1 - 0 = 1
**Consequence**: The curl direction reverses.

**Teacher Narration** `[70w]`
> A very common error: students remember the formula for the i and k components but flip the sign in the j component. The determinant expansion gives i( ) - j( ) + k( ), so the j part has a built-in minus sign. To avoid confusion, many textbooks rewrite the j term as ∂P/∂z - ∂R/∂x. Always double-check your signs — a single sign change reverses the direction of rotation.

---

### Slide 13 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause: Predict Divergence of a Fluid Field**  ·  `split_left_right`

**On-screen text** `[6w]`
Is div F = 0 everywhere?

**LEFT** `[concept]`

A fluid has velocity $\mathbf{F} = (x^2 - y^2)\mathbf{i} + 2xy\mathbf{j} + z\mathbf{k}$.

Is the fluid **incompressible**? (div F = 0)

**RIGHT** `[visual_spec]`

*Visual Spec:* Show question. After user clicks 'Check', display: div F = 4x+1 ≠ 0, so compressible. Use a sliding reveal.

*Interactive Controls:*
  - 🎛 Button: Check answer

**Teacher Narration** `[61w]`
> Here's a real fluid flow problem. Incompressible flow means the divergence is zero everywhere — fluid density doesn't change. Compute the divergence of this velocity field. Remember the formula: sum of partial derivatives of each component. Take 30 seconds to try, then press 'Check answer'. This is a good test of your ability to apply the divergence formula quickly and correctly.

**Student Prompt:** Compute div F and decide if the fluid is incompressible.

---

### Slide 14 · [PRACTICE] 🟡
**Example 4: Fluid Flow Analysis (Application)**  ·  `full_width`

**On-screen text** `[13w]`
div F = 4x+1 ≠ 0, curl F = 4y k ≠ 0.

**FULL WIDTH** `[steps]`

For $\mathbf{F} = (x^2-y^2)\mathbf{i} + 2xy\mathbf{j} + z\mathbf{k}$:

| Property | Compute | Result | Conclusion |
|----------|---------|--------|------------|
| Divergence | $\partial P/\partial x = 2x$, $\partial Q/\partial y = 2x$, $\partial R/\partial z = 1$ | $\text{div }\mathbf{F}=4x+1$ | compressible (not incompressible) |
| Curl (z-component) | $\partial Q/\partial x - \partial P/\partial y = 2y - (-2y)=4y$ | $\text{curl }\mathbf{F}=4y\,\mathbf{k}$ | rotational (not irrotational) |

So the fluid has both nonzero divergence and nonzero curl.

**Teacher Narration** `[61w]`
> Putting it all together: we computed both divergence and curl for this velocity field. It's neither incompressible nor irrotational. In fluid dynamics, divergence relates to density changes; curl relates to vorticity. This field has both a source/sink-like behavior along x and a rotation around the z-axis depending on y. Understanding both properties gives a complete picture of the local flow behavior.

---

### Slide 15 · [VISUAL_LAB] 🎛 *[1 controls]*
**Visual Lab: Explore Curl & Divergence in 2D**  ·  `split_left_right`

**On-screen text** `[9w]`
Change a to see curl vary. Divergence stays zero.

**LEFT** `[concept]`

Adjust the parameter $a$ in the field $\mathbf{F} = (-y, ax)$ and observe how curl and divergence change.

- Curl (z-component) = $a + 1$ (constant over domain)
- Divergence = $0$ always

**RIGHT** `[visual_spec]`

*Visual Spec:* Create a 2D quiver plot using matplotlib. Define mesh grid. Vary a from 0 to 2 with an integer slider. Show the vector field arrows. Display the computed curl and divergence as text on the plot. Use interactive slider widget. Colors: curl value colorbar (if varying). Ensure fixed aspect ratio. Include axis labels and grid.

*Interactive Controls:*
  - 🎛 Slider: a from 0 to 2, step 0.1

**Teacher Narration** `[70w]`
> Now let's play with an interactive example. The field F = (-y, ax) is designed so that the divergence is always zero, but the curl changes with parameter a. When a = -1, curl is zero and the field has no rotation. Slide a to see how the curl magnitude increases and the flow becomes more rotational. Notice that divergence is constant zero — the field never spreads or contracts.

**Student Prompt:** Observe how the vector field rotates as you change a.

---

### Slide 16 · [SUMMARY]
**Summary: Key Takeaways**  ·  `full_width`

**On-screen text** `[10w]`
Curl: rotation. Divergence: expansion. Both essential for analyzing vector fields.

**FULL WIDTH** `[text]`

**Formulas:**
- $\text{curl }\mathbf{F} = \nabla \times \mathbf{F}$ (vector)
- $\text{div }\mathbf{F} = \nabla \cdot \mathbf{F}$ (scalar)
- $\text{curl}(\nabla f) = \mathbf{0}$
- $\text{div}(\text{curl }\mathbf{F}) = 0$
- $\nabla^2 f = \text{div}(\nabla f)$

**Interpretation:**
- Curl → rotation (paddle wheel)
- Divergence → expansion/contraction (inflatable sphere)
- If curl=0 and domain simply connected → conservative field
- If div≠0 → cannot be the curl of another field

**Teacher Narration** `[77w]`
> Today we learned that curl measures local rotation (like a paddlewheel) and divergence measures expansion (like a balloon). We saw the key identities: curl of a gradient is zero, divergence of a curl is zero. These give us powerful constraints: if a field has zero curl and is defined on a simply connected region, it's conservative. If it has nonzero divergence, it can't be the curl of another field. Use these tools to analyze any vector field.

---
