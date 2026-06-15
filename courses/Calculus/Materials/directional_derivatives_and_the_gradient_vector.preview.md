# Directional Derivatives and the Gradient Vector

**Category:** vectors_3d_geometry  |  **Level:** First-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 88%

> **Prerequisite:** Partial derivatives and the gradient vector defined as ∇f = ⟨f_x, f_y⟩.

**Learning Objectives:**
- Calculate directional derivatives using the limit definition and the gradient formula
- Interpret the gradient as the direction and magnitude of steepest ascent
- Apply the relationship to optimize rates of change in applied problems
- Analyze functions to find directions of zero change, max increase, and max decrease

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 74w)
⚠️ **Narration too short (<60w):** [7]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 13 slides (target 12–18)
✅ **required_types**: hook + core + summary present
⚠️ **visual_labs**: 0 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s7:58w']
⚠️ **visual_specs**: missing on slides: [6]
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
| 1 | hook | 🟢 | ◧ |  | 63w | 10w | Standing on a Hillside |
| 2 | 🎛core | 🟢 | ◧ |  | 76w | 8w | Limit Definition of Directional Derivative |
| 3 | 🎛core | 🟢 | ◧ | ⏸️ | 69w | 11w | The Gradient Vector |
| 4 | 🎛core | 🟢 | ◧ |  | 76w | 11w | Directional Derivative Formula |
| 5 | 🎛practice | 🟢 | ◧ |  | 71w | 10w | Warm-Up Example Using Limit Definition |
| 6 | practice | 🟡 | ◧ | ⏸️ | 72w | 13w | Standard Example Using Gradient Formula |
| 7 | misconception | 🟢 | ◧ |  | 58w⚠️ | 11w | Misconception: Using Non-Unit Direction Vector |
| 8 | 🎛core | 🟢 | ◧ |  | 85w | 11w | Maximum and Minimum of Directional Derivatives |
| 9 | practice | 🟡 | ◧ | ⏸️ | 78w | 16w | Tricky Example: Direction of Steepest Ascent |
| 10 | 🎛practice | 🟡 | ◧ |  | 88w | 13w | Edge Case: Non-Differentiable Function |
| 11 | practice | 🟡 | ◧ |  | 65w | 12w | Application: Temperature on a Metal Sphere |
| 12 | challenge | 🔴 | ◧ |  | 61w | 7w | [Challenge – Optional] Proof of the Gradient Formula |
| 13 | summary | 🟢 | ⬛⬛ |  | 102w | 18w | Summary of Key Formulas and Facts |

---

### Slide 1 · [HOOK]
**Standing on a Hillside**  ·  `split_left_right`

**On-screen text** `[10w]`
Slope east = f_x, north = f_y. What slope northeast?

**LEFT** `[text]`

You know the slope due east ($f_x$) and due north ($f_y$). What's the slope when you walk northeast? That's a **directional derivative**.

**RIGHT** `[visual_spec]`

*Visual Spec:* Use mpl_toolkits.mplot3d. Import Axes3D. Plot z = -((x-2)^2 + (y-2)^2) + 5 over x,y in [0,4]. Mark point (2,2,5) with a red dot. Draw three arrows from that point: ax.quiver(2,2,5, 1,0,0, color='blue') for east, ax.quiver(2,2,5, 0,1,0, color='green') for north, and ax.quiver(2,2,5, 0.707,0.707,0, color='magenta') for northeast. Label each arrow with partial df/dx, partial df/dy, and D_hat{u}f. Show a colorbar for height.

**Teacher Narration** `[63w]`
> Picture yourself on a smooth hill where you know the slope if you walk exactly east or exactly north. Those are the partial derivatives. But what if you wanted to walk northeast, or any other direction? You would need a directional derivative. Today we'll learn how to compute it and see that the gradient vector holds the key to finding the steepest climb.

---

### Slide 2 · [CORE] 🎛 *[1 controls]*
**Limit Definition of Directional Derivative**  ·  `split_left_right`

**On-screen text** `[8w]`
Directional derivative: limit of difference quotient along u.

**LEFT** `[formula_block]`

$$D_{\mathbf{u}} f(x_0, y_0) = \lim_{h \to 0} \frac{f(x_0 + h a,\, y_0 + h b) - f(x_0, y_0)}{h}$$ where $\mathbf{u} = \langle a, b \rangle$ is a **unit vector**.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot 2D contours of f(x,y)=x^2+y^2. At point (1,2), show arrow of direction u=(0.6,0.8). Draw secant line from (1,2) to (1+ha, 2+hb) as a dashed line. Animate h shrinking from 1 to 0.01. Show the slope value updating. Use matplotlib.animation.FuncAnimation. Label the limit value.

*Interactive Controls:*
  - 🎛 Slider for h from 0.01 to 1

**Teacher Narration** `[76w]`
> This is the definition that extends the idea of a partial derivative to any direction. The key is that the direction vector u must have length one – we call that a unit vector. As h gets smaller, the ratio gives the instantaneous rate of change just like the ordinary derivative does for single-variable functions. We'll use this definition directly when the function isn't smooth, but most of the time we'll use a much simpler formula.

**Student Prompt:** Why must u be a unit vector? Think about scaling.

---

### Slide 3 · [CORE] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**The Gradient Vector**  ·  `split_left_right`

**On-screen text** `[11w]`
Gradient: ∇f = (f_x, f_y) – a vector at every point.

**LEFT** `[formula_block]`

$$\nabla f(x,y) = \langle f_x(x,y),\, f_y(x,y) \rangle = \frac{\partial f}{\partial x}\mathbf{i} + \frac{\partial f}{\partial y}\mathbf{j}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Use quiver plot over x,y in [-2,2] with np.meshgrid(np.linspace(-2,2,10), np.linspace(-2,2,10)). f = x^2+y^2. Gradient = (2x,2y). Color arrows by magnitude using a colormap (e.g., 'viridis'). Add contour lines to show level sets. Highlight that gradient is perpendicular to contours and points uphill.

*Interactive Controls:*
  - 🎛 Toggle: show/hide contour lines

**Teacher Narration** `[69w]`
> The gradient is a vector that stores all the partial derivatives. It's a vector field, meaning at every point you get a different vector. Notice on the screen that the gradient arrows point directly away from the level curves – uphill. This is no accident: the gradient always points in the direction of steepest ascent, and its length tells you how steep that direction is. We'll prove that soon.

**Student Prompt:** What do you think happens to the gradient at a local maximum?

---

### Slide 4 · [CORE] 🎛 *[2 controls]*
**Directional Derivative Formula**  ·  `split_left_right`

**On-screen text** `[11w]`
D_u f = ∇f · u. Dot product collapses direction information.

**LEFT** `[formula_block]`

$$D_{\mathbf{u}} f(x,y) = \nabla f(x,y) \cdot \mathbf{u}$$ where $\mathbf{u}$ is a unit vector.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x,y)=x^2+y^2. At point (1,2), show gradient vector (2,4). Draw unit vector u at angle θ from x-axis. Compute and display D_u f = grad f · u. Let user adjust θ with a slider from 0 to 2π. Show numeric value of directional derivative. Highlight when D_u f is maximum (aligned with gradient) and zero (perpendicular).

*Interactive Controls:*
  - 🎛 Slider for angle θ from 0 to 2π
  - 🎛 Display: D_u f value

**Teacher Narration** `[76w]`
> This simple formula is the workhorse. Because the directional derivative is the dot product of the gradient with a unit direction vector, you can quickly compute the rate of change in any direction. The dot product also explains why the gradient gives the steepest ascent: the dot product is maximized when the two vectors point in the same direction, and its maximum value is the length of the gradient. Let's test this with the interactive slider.

**Student Prompt:** Adjust the angle slider: when is the directional derivative largest? Zero?

---

### Slide 5 · [PRACTICE] 🎛 *[1 controls]*
**Warm-Up Example Using Limit Definition**  ·  `split_left_right`

**On-screen text** `[10w]`
Compute D_u f using limit. Answer = 22/5 = 4.4

**LEFT** `[steps]`

Find $D_{\mathbf{u}} f(1,2)$ for $f(x,y)=x^2+y^2$, $\mathbf{u}=\langle\frac{3}{5},\frac{4}{5}\rangle$.

**Step 1:** Verify $\|\mathbf{u}\| = 1$.
**Step 2:** Write limit.
**Step 3:** Compute $f(1+\frac{3}{5}h, 2+\frac{4}{5}h)$.
**Step 4:** Expand and simplify.
**Step 5:** Take limit $h\to0$.

Answer: $\frac{22}{5}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Contour plot of f(x,y)=x^2+y^2. Mark (1,2) with a dot. Draw arrow in direction (0.6,0.8). Animate h decreasing from 1 to 0.01 using matplotlib.animation.FuncAnimation, showing the point moving along the line and the computed difference quotient approaching 4.4. Overlay the tangent line at the end.

*Interactive Controls:*
  - 🎛 Button: play animation

**Teacher Narration** `[71w]`
> Let's work through the definition step by step. First, always check that the direction vector is a unit vector – it is. Then we substitute into the limit. After expanding and simplifying, we get a cancellation that leaves us with 22/5. Notice that this is exactly the dot product of the gradient at that point (which is (2,4)) with the unit vector (3/5,4/5) – that's also 22/5. So the formula works.

---

### Slide 6 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Standard Example Using Gradient Formula**  ·  `split_left_right`

**On-screen text** `[13w]`
Gradient at (1,2): ⟨-3,13⟩. Normalize v to u. Dot = -61/5 ≈ -12.2

**LEFT** `[steps]`

Find $D_{\mathbf{u}} f(1,2)$ for $f(x,y)=x^3-3xy+4y^2$ in direction $\mathbf{v}=\langle 3,-4\rangle$.

| Step | Action | Explanation |
|------|--------|-------------|
|1| $f_x=3x^2-3y$, $f_y=-3x+8y$ | Partial derivatives |
|2| At (1,2): $f_x=-3$, $f_y=13$ | Evaluate |
|3| $\nabla f(1,2)=\langle-3,13\rangle$ | Gradient |
|4| Normalize $\mathbf{v}$: $\|\mathbf{v}\|=5$, $\mathbf{u}=\langle\frac{3}{5},-\frac{4}{5}\rangle$ | Unit vector |
|5| $D_{\mathbf{u}} f = (-3)(3/5)+(13)(-4/5) = -61/5$ | Dot product |

Answer: $\boxed{-\frac{61}{5}}$

**RIGHT** `[empty]`

**Teacher Narration** `[72w]`
> Here we use the gradient formula. Notice that the direction is given as <3, -4>, which is not a unit vector. A common mistake is to use this vector directly. The correct procedure is first to compute its magnitude – 5 – and then divide to get a unit vector. Only then do we take the dot product with the gradient. The result, -12.2, means the function is decreasing in that direction.

**Student Prompt:** What would the answer be if you forgot to normalize? Would it be too large or too small?

---

### Slide 7 · [MISCONCEPTION]
**Misconception: Using Non-Unit Direction Vector**  ·  `split_left_right`

**On-screen text** `[11w]`
Using v directly gives answer 5 times too large. Always normalize!

**LEFT** `[text]`

**Wrong approach:** $D_{\mathbf{v}} f(1,2) = \nabla f \cdot \mathbf{v} = (-3)(3)+13(-4) = -9-52 = -61$

**Why wrong:** The definition requires a unit vector. Using $\mathbf{v}$ gives a scaled version. The correct answer is $-61/5$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw coordinate axes. At origin, draw vector v=(3,-4) in red with magnitude 5. Draw u=(0.6,-0.8) in blue with magnitude 1. Label each. Show that dot product with v is 5 times larger than with u. Add text: 'Dot product ∇f·v = 5 × (∇f·u)'. Highlight that u must be unit.

**Teacher Narration** `[58w ⚠️ **TOO SHORT: 58w < 60w min**]`
> This is the most common mistake students make. The gradient formula only works when the direction vector is a unit vector. If you use a vector of length 5, you get a result that's 5 times the true directional derivative. Always check that your direction vector has length 1. If not, normalize it before taking the dot product.

---

### Slide 8 · [CORE] 🎛 *[2 controls]*
**Maximum and Minimum of Directional Derivatives**  ·  `split_left_right`

**On-screen text** `[11w]`
D_u f ranges from -‖∇f‖ to +‖∇f‖. Max = steepest ascent.

**LEFT** `[formula_block]`

$$\max D_{\mathbf{u}} f = \|\nabla f\| \quad (\text{when } \mathbf{u} \parallel \nabla f)$$
$$\min D_{\mathbf{u}} f = -\|\nabla f\| \quad (\text{when } \mathbf{u} \text{ opposite to } \nabla f)$$
All other directions give values between $-\|\nabla f\|$ and $\|\nabla f\|$.

**RIGHT** `[visual_spec]`

*Visual Spec:* For f(x,y)=x^2+y^2 at (1,2), compute gradient (2,4) with angle arctan(4/2)≈63.4°. Plot D_u f as a function of angle θ from 0 to 2π using polar coordinates. Mark max, min, and zero crossings. Use slider to highlight a specific angle and show corresponding u vector on the contour plot.

*Interactive Controls:*
  - 🎛 Slider for angle θ from 0 to 360
  - 🎛 Display: D_u f at chosen angle

**Teacher Narration** `[85w]`
> Because the directional derivative is the dot product of the gradient with a unit vector, its extreme values come from the geometry of the dot product. The maximum occurs when u points in the same direction as the gradient – that's the direction of steepest ascent. The minimum occurs when u points opposite. And for any other direction, the value lies between these two extremes. This is a powerful result: just by knowing the gradient, you know the fastest rate of increase and its direction.

**Student Prompt:** What is the directional derivative when u is perpendicular to the gradient?

---

### Slide 9 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Tricky Example: Direction of Steepest Ascent**  ·  `split_left_right`

**On-screen text** `[16w]`
Gradient at (2,1) = ⟨4,-2⟩. Unit direction = ⟨2/√5, -1/√5⟩. Max rate = 2√5 ≈ 4.47

**LEFT** `[steps]`

For $f(x,y)=x^2 - y^2$ at $(2,1)$:

a) Direction of steepest ascent
b) Maximum rate of change

1. $f_x = 2x$, $f_y = -2y$
2. At (2,1): $\nabla f = \langle 4, -2 \rangle$
3. Direction: $\mathbf{u} = \frac{\nabla f}{\|\nabla f\|} = \langle \frac{2}{\sqrt{5}}, -\frac{1}{\sqrt{5}} \rangle$
4. Max rate: $\|\nabla f\| = \sqrt{20} = 2\sqrt{5}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f = x^2 - y^2 over x in [0,4], y in [-2,3] using np.meshgrid(np.linspace(0,4,20), np.linspace(-2,3,20)). Mark point (2,1). Draw gradient vector (4,-2) in red, and the unit vector (0.894,-0.447) in green. Also draw opposite direction in blue. Label each. Use contour lines to show that gradient is perpendicular to level curves.

**Teacher Narration** `[78w]`
> This function is a saddle shape. At the point (2,1), the gradient points partly in the positive x direction and partly in the negative y direction. To find the direction of steepest ascent, we simply take the gradient and normalize it to a unit vector. The magnitude of the gradient tells us the maximum rate of change, which is about 4.47. Notice that the gradient is perpendicular to the contour line through the point – that's always true.

**Student Prompt:** What is the direction of steepest descent?

---

### Slide 10 · [PRACTICE] 🟡 🎛 *[2 controls]*
**Edge Case: Non-Differentiable Function**  ·  `split_left_right`

**On-screen text** `[13w]`
Cusp at origin → gradient undefined. Limit definition shows DNE (different left/right limits).

**LEFT** `[steps]`

Find $D_{\mathbf{u}} f(0,0)$ for $f(x,y)=\sqrt{x^2+y^2}$, $\mathbf{u}=\langle \frac{1}{\sqrt{2}},\frac{1}{\sqrt{2}} \rangle$.

$f_x$ and $f_y$ are undefined at (0,0) (cusp). Must use limit definition:

$D_{\mathbf{u}} f(0,0) = \lim_{h\to0} \frac{f(h/\sqrt{2},h/\sqrt{2}) - 0}{h}$

$= \lim_{h\to0} \frac{|h|}{h}$ which does not exist.

Answer: The directional derivative does not exist.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of cone z=sqrt(x^2+y^2). Zoom into origin. Show a line along u direction from origin. Draw secant lines for h>0 (slope 1) and h<0 (slope -1). Animate h approaching 0 from both sides using matplotlib.animation.FuncAnimation. Show that the limit is different from left and right.

*Interactive Controls:*
  - 🎛 Button: play animation from positive h
  - 🎛 Button: play animation from negative h

**Teacher Narration** `[88w]`
> This is an important edge case. The function is the distance to the origin – it's shaped like a cone. At the tip, there's a cusp, so the partial derivatives don't exist. We cannot use the gradient formula. Falling back to the limit definition, we find that the limit from the right gives 1, and from the left gives -1. Because the two-sided limit doesn't agree, the directional derivative does not exist. This shows that the gradient formula only works when the function is differentiable at that point.

---

### Slide 11 · [PRACTICE] 🟡
**Application: Temperature on a Metal Sphere**  ·  `split_left_right`

**On-screen text** `[12w]`
Gradient ⟨2,2,2⟩. Direction unit ⟨1/√5, 2/√5, 0⟩. Dot = 6/√5 ≈ 2.683

**LEFT** `[steps]`

$T(x,y,z)=x^2+y^2+z^2$. Find rate of change at $(1,1,1)$ toward $(2,3,1)$.

1. $\nabla T = \langle 2x, 2y, 2z \rangle$
2. At (1,1,1): $\nabla T = \langle 2,2,2 \rangle$
3. Direction $\mathbf{v} = \langle 1,2,0 \rangle$, $\|\mathbf{v}\| = \sqrt{5}$, $\mathbf{u} = \langle 1/\sqrt{5}, 2/\sqrt{5}, 0 \rangle$
4. $D_{\mathbf{u}}T = 2\cdot\frac{1}{\sqrt{5}} + 2\cdot\frac{2}{\sqrt{5}} + 2\cdot0 = \frac{6}{\sqrt{5}}$

Answer: $\boxed{\frac{6}{\sqrt{5}}}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot sphere surface with color mapping for T = x^2+y^2+z^2. Mark point (1,1,1) in red. Draw vector from (1,1,1) to (2,3,1) in yellow. Show gradient vector at (1,1,1) in green. Display numeric calculation. Use opacity to see interior.

**Teacher Narration** `[65w]`
> Directional derivatives extend naturally to three dimensions. Here we have a temperature function on a metal sphere. At the point (1,1,1), we want the rate of change as we move towards (2,3,1). We compute the gradient, find the direction vector, normalize it, and take the dot product. The result tells us the temperature is increasing at about 2.68 units per unit distance in that direction.

**Student Prompt:** In which direction from (1,1,1) would the temperature increase most rapidly?

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof of the Gradient Formula**  ·  `split_left_right`

**On-screen text** `[7w]`
Chain rule on g(t)=f(x0+ta, y0+tb) yields g'(0)=∇f·u.

**LEFT** `[text]`

**Theorem:** If $f$ is differentiable at $(x_0,y_0)$, then $D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u}$.

**Idea:** Define $g(t)=f(x_0+ta, y_0+tb)$. Then $g'(0)=D_{\mathbf{u}}f$. By the chain rule: $g'(t)=f_x x'(t) + f_y y'(t) = f_x a + f_y b$. Evaluate at $t=0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot contour map with point (x0,y0) and line along u. Draw the 1D graph of g(t) vs t below. Show that g'(0) gives the directional derivative. Animate the relationship between the 2D point and the 1D function.

**Teacher Narration** `[61w]`
> For those who want a deeper understanding, here's the proof. We create a single-variable function g that tracks f along the line in direction u. Its derivative at t=0 is exactly the directional derivative. Using the chain rule, g'(t) equals the dot product of the gradient evaluated at the moving point with the direction vector. Evaluating at t=0 gives the result.

---

### Slide 13 · [SUMMARY]
**Summary of Key Formulas and Facts**  ·  `full_width`

**On-screen text** `[18w]`
Directional derivative = dot product of gradient and unit direction. Gradient points uphill. Max rate = gradient magnitude.

**FULL WIDTH** `[text]`

1. **Directional derivative (limit):** $D_{\mathbf{u}}f(x_0,y_0) = \lim_{h\to0} \frac{f(x_0+ha,y_0+hb)-f(x_0,y_0)}{h}$
2. **Gradient:** $\nabla f = \langle f_x, f_y \rangle$
3. **Directional derivative (formula):** $D_{\mathbf{u}}f = \nabla f \cdot \mathbf{u}$, requires $\|\mathbf{u}\|=1$ and $f$ differentiable.
4. **Max & min:** $\max D_{\mathbf{u}}f = \|\nabla f\|$, $\min D_{\mathbf{u}}f = -\|\nabla f\|$.
5. **Zero change:** $D_{\mathbf{u}}f = 0$ when $\mathbf{u} \perp \nabla f$.

**Teacher Narration** `[102w]`
> Let's wrap up what we've learned. The directional derivative gives the rate of change in any direction. The gradient packages the partial derivatives and points in the direction of steepest ascent. To compute a directional derivative, take the dot product of the gradient with a unit vector in the desired direction. Remember to always normalize your direction vector and check that the function is differentiable. These tools are essential for optimization and modeling in multivariable calculus. Understanding these concepts deeply will help you in fields like machine learning, physics, and engineering, where finding the direction of fastest change is a fundamental task.

---
