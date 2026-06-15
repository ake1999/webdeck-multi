# Vector Fields and Line Integrals

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 92%

> **Prerequisite:** You already know scalar line integrals: ∫_C f ds = ∫_a^b f(r(t)) |r'(t)| dt, giving mass or curtain area, and direction does not matter.

**Learning Objectives:**
- Compute line integrals of vector fields along parameterized curves
- Interpret line integrals as work done by a force field along a path
- Distinguish between scalar and vector line integrals
- Analyze how orientation affects the value of a line integral
- Apply the component form for efficient computation

---

## v3.1 Production Readiness

✅ **Interactive moments:** 9 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 76w)
⚠️ **Narration too short (<60w):** [4, 6]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s4:59w', 's6:57w']
⚠️ **visual_specs**: missing on slides: [8]
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 9 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | hook | 🟢 | ◧ |  | 88w | 9w | From Scalar to Vector: Direction Now Matters |
| 2 | 🎛core | 🟢 | ◧ |  | 61w | 12w | Definition of the Vector Line Integral |
| 3 | 🎛practice | 🟢 | ◧ |  | 69w | 7w | Warm-Up: Straight Line |
| 4 | 🎛core | 🟢 | ◧ |  | 59w⚠️ | 11w | Orientation Reversal |
| 5 | core | 🟢 | ◧ |  | 82w | 14w | Component Form |
| 6 | 🎛practice | 🟢 | ◧ |  | 57w⚠️ | 9w | Standard Example: Quarter-Circle |
| 7 | 🎛misconception | 🟡 | ◧ |  | 80w | 8w | Common Mistake: Substituting After Dotting |
| 8 | practice | 🟡 | ◧ | ⏸️ | 86w | 9w | Edge Case: Triangular Path (Non-Conservative) |
| 9 | practice | 🟡 | ⬛⬛ |  | 74w | 10w | Application: Work in a Force Field |
| 10 | 🎛visual_lab | 🟡 | ◧ |  | 81w | 9w | Visual Lab: Field and Path Explorer |
| 11 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 67w | 9w | Pause and Try: Quick Check |
| 12 | 🎛core | 🟢 | ◧ |  | 84w | 9w | Solution: Parameterization Independence |
| 13 | 🎛challenge | 🔴 | ◧ |  | 74w | 12w | [Challenge – Optional] Proof Sketch: Riemann Sum Derivation |
| 14 | summary | 🟢 | ⬛⬛ |  | 101w | 10w | What We Learned Today |

---

### Slide 1 · [HOOK]
**From Scalar to Vector: Direction Now Matters**  ·  `split_left_right`

**On-screen text** `[9w]`
Scalar: ∫ f ds. Vector: ∫ F·dr. Direction matters!

**LEFT** `[text]`

**Scalar line integral** ∫_C f ds — direction irrelevant.

**Vector line integral** ∫_C **F** · d**r** — **direction matters!**

Key shift: we now integrate a **vector field** along a curve, summing tangential component at each step.

**RIGHT** `[visual_spec]`

*Visual Spec:* A 2D diagram showing a curve C (blue arrowed path) in a vector field F (small arrows). At three points along the path, show the vector F and the tangent vector T. Label 'F·T' at each point. Show a shopping cart icon at the start. Title: 'Work = force × displacement in direction of motion'.

**Teacher Narration** `[88w]`
> Welcome. We've seen scalar line integrals: mass of a wire, area of a curtain. But today we introduce something new: integrating a vector field along a curve. The key difference? Direction now matters. Think of pushing a shopping cart. If you push forward, you do positive work; push sideways, most effort wasted; push backward, negative work. The line integral of a vector field captures exactly that: at each tiny step, we take the dot product of the force with your direction of motion, then add it all up.

---

### Slide 2 · [CORE] 🎛 *[1 controls]*
**Definition of the Vector Line Integral**  ·  `split_left_right`

**On-screen text** `[12w]`
∫_C F·dr = ∫_a^b F(r(t))·r′(t) dt. Work = sum of tangential force.

**LEFT** `[formula_block]`

$$\int_C \mathbf{F} \cdot d\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t)) \cdot \mathbf{r}'(t)\,dt$$

**Interpretation:** Work = sum of tangential force along the path.

**Order of operations:**
1. Parameterize curve C: **r**(t), a ≤ t ≤ b.
2. Substitute into **F**.
3. Dot with **r**'(t).
4. Integrate.

**RIGHT** `[visual_spec]`

*Visual Spec:* 2D plot of a curve C (r(t) = (cos t, sin t), t from 0 to π/2). Show the vector field F = (−y, x) as small arrows on a grid. At t=0.5, show r(0.5) as a point, r'(0.5) as tangent arrow (blue), F(r(0.5)) as red arrow, and the dot product value labelled. Use animation: slider for t highlights different points and updates arrows. Include a label: 'Work contribution = F·r′ dt'.

*Interactive Controls:*
  - 🎛 Slider for parameter t from 0 to π/2

**Teacher Narration** `[61w]`
> Here's the definition. To compute a vector line integral, we parameterize the curve, substitute into the field, dot with the derivative of the parameterization, and integrate. The result is the total work done by the field along the curve. Notice the dot product ensures only the component of force in the direction of motion contributes. We'll see this in action shortly.

---

### Slide 3 · [PRACTICE] 🎛 *[2 controls]*
**Warm-Up: Straight Line**  ·  `split_left_right`

**On-screen text** `[7w]`
F = ⟨x,y⟩, path: (0,0)→(1,2). Answer: 5/2.

**LEFT** `[steps]`

**Problem:** Compute ∫_C **F**·d**r** where **F**(x,y) = ⟨x, y⟩ and C is the line segment from (0,0) to (1,2).

**Parameterize:** **r**(t) = ⟨t, 2t⟩, 0 ≤ t ≤ 1.

**Substitute:** **F**(**r**(t)) = ⟨t, 2t⟩.

**Dot with r′** = ⟨1,2⟩: ⟨t,2t⟩·⟨1,2⟩ = t + 4t = 5t.

**Integrate:** ∫₀¹ 5t dt = [5t²/2]₀¹ = 5/2.

**RIGHT** `[visual_spec]`

*Visual Spec:* 2D plot of the line from (0,0) to (1,2) with vector field F=<x,y> shown as arrows on grid. Highlight the point at parameter t, and show the tangent vector and field vector at that point. Display the cumulative integral value as t increases from 0 to 1. Use a slider to control t. Show a small table: t, F·r′, integral so far.

*Interactive Controls:*
  - 🎛 Slider for parameter t from 0 to 1
  - 🎛 Button: reset animation

**Teacher Narration** `[69w]`
> Let's try a simple example. Our field is just the radial vector field ⟨x,y⟩. The path is the line from the origin to (1,2). We parameterize as r(t)=⟨t,2t⟩. After substituting and dotting, we get 5t. Integrate from 0 to 1, and we get 5/2. That's the work done by the field along this straight path. Notice the field points outward, same direction as the path, so work is positive.

---

### Slide 4 · [CORE] 🎛 *[2 controls]*
**Orientation Reversal**  ·  `split_left_right`

**On-screen text** `[11w]`
Reversing path flips sign of vector line integral. Scalar: no change.

**LEFT** `[concept]`

**Scalar:** ∫_{-C} f ds = ∫_C f ds (direction doesn't matter).

**Vector:** ∫_{-C} **F**·d**r** = −∫_C **F**·d**r**.

**Why:** Reversing the parameterization changes **r′**(t) to its negative, flipping the sign of the dot product.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two identical curves side by side: left one with arrow from start to end, right one from end to start. Under each, show the line integral value with opposite signs. Use a simple field F=<0,x> and a curve from (0,0) to (2,0) to visually show positive and negative work. Animate flipping the arrow.

*Interactive Controls:*
  - 🎛 Button: reverse path direction
  - 🎛 Label: display ∫ value (sign change)

**Teacher Narration** `[59w ⚠️ **TOO SHORT: 59w < 60w min**]`
> A crucial difference from scalar integrals: if you walk the curve backward, the vector line integral changes sign. Why? Because the tangent vector r′ points in the opposite direction, so each dot product flips sign. The scalar integral only uses the magnitude of r′, so direction doesn't affect it. This orientation dependence is essential for understanding conservative fields later.

---

### Slide 5 · [CORE]
**Component Form**  ·  `split_left_right`

**On-screen text** `[14w]`
Component form: ∫ P dx + Q dy (+ R dz). Use dx=x'dt, etc.

**LEFT** `[formula_block]`

**2D:** If **F** = ⟨P, Q⟩, then

$$\int_C \mathbf{F}\cdot d\mathbf{r} = \int_C P\,dx + Q\,dy$$

**3D:** If **F** = ⟨P, Q, R⟩, then

$$\int_C \mathbf{F}\cdot d\mathbf{r} = \int_C P\,dx + Q\,dy + R\,dz$$

**Use:** dx = x′(t) dt, dy = y′(t) dt, dz = z′(t) dt.

**RIGHT** `[formula_overflow]`

*Visual Spec:* A diagram showing a parameterized curve r(t)=(x(t),y(t),z(t)). Highlight that dx = x'(t)dt, dy = y'(t)dt, dz = z'(t)dt. Connect to integral: ∫ P dx + Q dy + R dz.

**Teacher Narration** `[82w]`
> Often we write the line integral in component form, especially in 2D. If F = ⟨P, Q⟩, then the line integral is ∫ P dx + Q dy. You can compute this by replacing dx and dy with x'(t) dt and y'(t) dt after parameterizing. This is equivalent to the vector form, but sometimes more convenient, especially when the curve is given as a function y=y(x). Just be careful: dx and dy are not independent; they come from the same parameter t.

---

### Slide 6 · [PRACTICE] 🎛 *[2 controls]*
**Standard Example: Quarter-Circle**  ·  `split_left_right`

**On-screen text** `[9w]`
F=⟨x²,−xy⟩, quarter-circle. Answer: −2/3. Negative work: field opposes motion.

**LEFT** `[steps]`

**Problem:** Find work by **F**(x,y)=⟨x²,−xy⟩ along **r**(t)=⟨cos t, sin t⟩, 0≤t≤π/2.

1. **r′**(t)=⟨−sin t, cos t⟩.
2. **F**(**r**(t)) = ⟨cos² t, −cos t sin t⟩.
3. Dot: cos² t·(−sin t) + (−cos t sin t)(cos t) = −2 cos² t sin t.
4. ∫₀^{π/2} −2 cos² t sin t dt.
5. Substitute u=cos t, du=−sin t dt → ∫₁⁰ 2u² du = −2/3.

**RIGHT** `[visual_spec]`

*Visual Spec:* 2D plot from 0 to π/2 on unit circle. Show vector field F=<x^2, -xy> as grid of arrows. Highlight the point on the curve as t varies. Show tangent and field vectors with dot product label. Use slider for t. Display cumulative integral value in real time. Color the curve according to sign of F·r'.

*Interactive Controls:*
  - 🎛 Slider for parameter t from 0 to π/2
  - 🎛 Toggle: show F·r' along curve

**Teacher Narration** `[57w ⚠️ **TOO SHORT: 57w < 60w min**]`
> Now a standard exam problem. The field is ⟨x²,−xy⟩ and the curve is a quarter of the unit circle in the first quadrant. Following our steps: parameterize, substitute, dot, integrate. We get −2/3. The negative sign means the field does negative work—it opposes the motion along this path. Notice the substitution u=cos t simplifies the integral nicely.

---

### Slide 7 · [MISCONCEPTION] 🟡 🎛 *[1 controls]*
**Common Mistake: Substituting After Dotting**  ·  `split_left_right`

**On-screen text** `[8w]`
Always substitute first! F(r(t)), then dot with r′.

**LEFT** `[text]`

**Wrong approach:** Write **F** = ⟨y, z, x⟩, **r′** = ⟨−sin t, cos t, 1⟩, then dot without substituting: y·(−sin t) + z·(cos t) + x·1.

**Why wrong:** Variables x,y,z are still functions of t. You must substitute first.

**Correct:** Replace x=cos t, y=sin t, z=t before dotting.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show two panels: Left panel (wrong) shows the steps without substitution, leading to an incorrect expression. Right panel (correct) shows substitution first, then dot. Use red X on left, green check on right. Include the correct integral: ∫₀^{2π}(−sin² t + t cos t + cos t) dt = −π.

*Interactive Controls:*
  - 🎛 Button: toggle between wrong and correct steps

**Teacher Narration** `[80w]`
> Here's a mistake that trips up many students. Given F=⟨y,z,x⟩ and a helical path, students sometimes dot F with r′ without substituting the parameterization. They treat x, y, z as constants. That's wrong because x, y, z vary with t. You must substitute first: replace x with cos t, y with sin t, z with t. Then compute the dot product. This gives the correct integrand. The wrong approach leads to an expression that doesn't integrate to the right result.

**Student Prompt:** What would the wrong dot product look like before substitution?

---

### Slide 8 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Edge Case: Triangular Path (Non-Conservative)**  ·  `split_left_right`

**On-screen text** `[9w]`
Non-zero closed integral: F = ⟨−y,x⟩ is not conservative.

**LEFT** `[text]`

**Problem:** ∫_C **F**·d**r** with **F**(x,y)=⟨−y, x⟩, closed triangular path: (0,0)→(1,0)→(1,1)→(0,0).

| Segment | Param | Dot | Integral |
|---------|-------|-----|----------|
| C₁: (0,0)→(1,0) | r(t)=⟨t,0⟩, t∈[0,1] | ⟨0,t⟩·⟨1,0⟩=0 | 0 |
| C₂: (1,0)→(1,1) | r(t)=⟨1,t⟩, t∈[0,1] | ⟨−t,1⟩·⟨0,1⟩=1 | 1 |
| C₃: (1,1)→(0,0) | r(t)=⟨1−t,1−t⟩, t∈[0,1] | ⟨t−1,1−t⟩·⟨−1,−1⟩=0 | 0 |

**Total:** 1. Non-zero closed integral → **F** is NOT conservative.

**RIGHT** `[empty]`

**Teacher Narration** `[86w]`
> Here's a deeper example. The field is ⟨−y, x⟩, and the path is a closed triangle. We compute each segment. On the horizontal and diagonal segments, the dot product is zero because the field is perpendicular to the path. On the vertical segment, the field is horizontal and the path is vertical, so the dot product is 1. The total is 1, not zero. This tells us the field is not conservative: for a conservative field, the line integral around any closed curve would be zero.

**Student Prompt:** Predict: Will the closed loop integral be zero or non-zero? Why?

---

### Slide 9 · [PRACTICE] 🟡
**Application: Work in a Force Field**  ·  `full_width`

**On-screen text** `[10w]`
Work = 1 unit. Field helps motion along cubic path.

**FULL WIDTH** `[text]`

**Problem:** Particle moves along **r**(t)=⟨t,t²,t³⟩, 0≤t≤1, under **F**(x,y,z)=⟨yz, xz, xy⟩. Find work.

1. **r′**(t)=⟨1,2t,3t²⟩.
2. **F**(**r**(t)) = ⟨(t²)(t³), (t)(t³), (t)(t²)⟩ = ⟨t⁵, t⁴, t³⟩.
3. Dot: t⁵·1 + t⁴·2t + t³·3t² = t⁵ + 2t⁵ + 3t⁵ = 6t⁵.
4. ∫₀¹ 6t⁵ dt = [t⁶]₀¹ = 1.

**Interpretation:** Positive work → field helps the particle along this path.

**Teacher Narration** `[74w]`
> Let's apply this to a physics problem. A particle moves along a cubic curve in 3D under a force field F = ⟨yz, xz, xy⟩. We parameterize, substitute, dot—everything compacts nicely to 6t⁵. Integrate from 0 to 1, work is 1 unit positive. This field is actually conservative (you might check later), and the work equals the difference in potential energy. But for now, we see the computation works just like the 2D case.

---

### Slide 10 · [VISUAL_LAB] 🟡 🎛 *[4 controls]*
**Visual Lab: Field and Path Explorer**  ·  `split_left_right`

**On-screen text** `[9w]`
Interactive: adjust radius, angle, orientation. See line integral value.

**LEFT** `[text]`

Explore the vector field **F**(x,y)=⟨−y, x⟩ along a circular path. Adjust the radius and observe the line integral value. Check how orientation affects the result.

**RIGHT** `[visual_spec]`

*Visual Spec:* 2D plot with vector field F=<−y,x> as arrows on grid. A circle of radius R (default 1) from angle 0 to 2π. Highligh the point at angle θ, show tangent and field vectors. Display the cumulative integral value. Controls: slider for radius R from 0.5 to 3, slider for angle θ from 0 to 2π (to move point), toggle for orientation (clockwise/counterclockwise), button to compute full integral. Color the path according to sign of F·r′.

*Interactive Controls:*
  - 🎛 Slider for radius from 0.5 to 3
  - 🎛 Slider for angle θ from 0 to 2π
  - 🎛 Radio button: CCW / CW orientation
  - 🎛 Button to compute full closed line integral

**Teacher Narration** `[81w]`
> Let's explore visually. This interactive shows the field F=⟨−y,x⟩ and a circular path. Use the radius slider to change the circle size. Move the angle slider to see the point and arrows. The computed line integral updates as you go. Try toggling orientation: the sign flips. Click 'Compute' to see the full closed integral. For this field, the integral around a circle of radius R (counterclockwise) is 2πR². This is a great way to build intuition before you tackle conservative fields.

**Student Prompt:** Try a radius of 2 and CCW orientation. What is the full closed integral?

---

### Slide 11 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Pause and Try: Quick Check**  ·  `split_left_right`

**On-screen text** `[9w]`
F = ⟨1,0⟩, path r(t)=⟨t²,0⟩, 0≤t≤√2. Compute ∫ F·dr.

**LEFT** `[text]`

**Question:** Compute ∫_C **F**·d**r** where **F**(x,y)=⟨1,0⟩ and C is the curve from (0,0) to (2,0) parameterized by **r**(t)=⟨t²,0⟩, 0≤t≤√2.

A) 0
B) 2
C) √2
D) 4

**RIGHT** `[visual_spec]`

*Visual Spec:* 2D plot showing the path (a parabola along x-axis from x=0 to x=2, but y=0, so it's just a line segment). Show the constant field F=<1,0> as arrows. Display a slider for t to show point and tangent. Let user guess answer.

*Interactive Controls:*
  - 🎛 Radio buttons for multiple choice A-D
  - 🎛 Button to reveal answer

**Teacher Narration** `[67w]`
> Now a quick check for you. The field is constant ⟨1,0⟩, pointing right. The path goes from (0,0) to (2,0) but parameterized as ⟨t²,0⟩. Pause the video and try to compute the integral. Is it independent of the parameterization? The answer should be the same as the warm-up: the work depends only on start and end for a constant field. I'll give you a moment to think.

**Student Prompt:** Compute the integral. Choose A, B, C, or D. Then unpause to see the solution.

---

### Slide 12 · [CORE] 🎛 *[1 controls]*
**Solution: Parameterization Independence**  ·  `split_left_right`

**On-screen text** `[9w]`
Answer: 2. Parameterization does not affect result (orientation preserved).

**LEFT** `[text]`

**Solution:**
1. Parameterization: **r**(t)=⟨t²,0⟩, **r′**(t)=⟨2t,0⟩.
2. **F**(**r**(t)) = ⟨1,0⟩.
3. Dot: ⟨1,0⟩·⟨2t,0⟩ = 2t.
4. ∫₀^{√2} 2t dt = [t²]₀^{√2} = 2.

**Answer:** B) 2.

**Key point:** The integral value is independent of the parameterization speed, as long as orientation is preserved.

**RIGHT** `[visual_spec]`

*Visual Spec:* 2D plot of path with a moving point. Show a second plot of x vs t to illustrate parameterization. Use slider to control t. Display cumulative integral as t increases.

*Interactive Controls:*
  - 🎛 Slider for parameter t from 0 to √2

**Teacher Narration** `[84w]`
> The integral works out to 2, same as the earlier warm-up with linear parameterization. Even though we used t² for x, the resulting work is still 2. This illustrates that the line integral is independent of how you parameterize the curve, as long as you keep the same orientation. The faster you go changes the tangent length, but the substitution and dot product compensate exactly. This is a fundamental property: the line integral depends only on the curve and the field, not the parameterization.

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[2 controls]* *(skip if time-limited)*
**[Challenge – Optional] Proof Sketch: Riemann Sum Derivation**  ·  `split_left_right`

**On-screen text** `[12w]`
Riemann sum: ∑ F·r′ Δt → ∫. Area under tangent component curve.

**LEFT** `[text]`

**Derivation of ∫_C F·dr = ∫_a^b F(r(t))·r′(t) dt**

Partition [a,b] into n subintervals. On each, displacement ≈ r′(t_i^*)Δt_i. Work ≈ F(r(t_i^*))·r′(t_i^*)Δt_i. Sum → integral as n→∞.

**Key insight:** The integral is the limit of Riemann sums of the tangential component times speed.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two panels: Left shows the curve C with partition points and tangent vectors. Right shows a plot of the dot product F·r′ as a function of t, with rectangles approximating the area under the curve. Use slider for number of partitions n. Show the approximate sum converging to the exact integral as n increases.

*Interactive Controls:*
  - 🎛 Slider for number of partitions n from 2 to 50
  - 🎛 Button: animate sequence of n values

**Teacher Narration** `[74w]`
> For those wanting to see why the formula works: think of the integral as a limit of Riemann sums. Split the curve into small pieces, approximate the work on each piece as force dot displacement (tangent times change in parameter). As the pieces get smaller, the approximation becomes exact. This is the same idea as any Riemann integral, just with vector fields. The visualization shows how the sum of rectangles approaches the true integral.

---

### Slide 14 · [SUMMARY]
**What We Learned Today**  ·  `full_width`

**On-screen text** `[10w]`
Summary: Definition, component form, orientation, scalar vs vector, non-conservative fields.

**FULL WIDTH** `[text]`

**Key Formulas and Facts**

- **Definition:** ∫_C F·dr = ∫_a^b F(r(t))·r′(t) dt
- **Component form:** ∫ P dx + Q dy (+ R dz)
- **Orientation:** ∫_{-C} F·dr = −∫_C F·dr
- **Scalar vs vector:** Scalar ignores direction; vector depends on it
- **Non-conservative:** Non-zero closed integral ⇒ field not conservative

**Core Steps**
1. Parameterize curve.
2. Substitute into F.
3. Dot with r′.
4. Integrate.

**Teacher Narration** `[101w]`
> Today we've learned how to compute line integrals of vector fields. We defined the integral as the integral of the dot product of the field with the tangent vector. We saw that orientation matters, unlike scalar line integrals. We practiced with several examples: a straight line, a quarter circle, a tricky helix, a closed triangle, and a physics application. We also clarified a common mistake: always substitute the parameterization before dotting. Finally, we saw that a non-zero closed line integral indicates a non-conservative field. This sets the stage for the next topic: conservative fields and the fundamental theorem for line integrals.

---
