# 3D Coordinate Systems and Vectors

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You can plot points (x, y) in the 2D Cartesian plane and find the distance between them using the Pythagorean theorem.

**Learning Objectives:**
- Plot points in three-dimensional space using ordered triples and the right-hand rule
- Calculate distances between points in ℝ³ using the distance formula
- Interpret equations in x, y, z as surfaces in ℝ³
- Apply vector addition and scalar multiplication geometrically and algebraically
- Analyze the relationship between coordinate planes and projections of points

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 64w)
⚠️ **Narration too short (<60w):** [4, 6, 9]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 17 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s4:57w', 's6:58w', 's9:58w']
✅ **visual_specs**: all split slides have visual_spec
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
| 1 | hook | 🟢 | ◧ |  | 61w | 10w | Why 3D Coordinates? |
| 2 | 🎛core | 🟢 | ◧ |  | 62w | 11w | The Right‑Hand Rule |
| 3 | 🎛core | 🟢 | ◧ |  | 72w | 7w | Distance in ℝ³ |
| 4 | pause_and_try | 🟢 | ◧ | ⏸️ | 57w⚠️ | 8w | Your Turn: Distance from Origin |
| 5 | practice | 🟢 | ◧ |  | 64w | 3w | Distance from Origin – Solution |
| 6 | 🎛core | 🟢 | ◧ |  | 58w⚠️ | 6w | Midpoint in ℝ³ |
| 7 | misconception | 🟢 | ◧ |  | 67w | 6w | Common Mistake: Points vs. Vectors |
| 8 | 🎛core | 🟢 | ◧ |  | 68w | 3w | Vector Magnitude |
| 9 | 🎛visual_lab | 🟡 | ◧ |  | 58w⚠️ | 5w | Vector Addition & Scalar Multiplication |
| 10 | practice | 🟢 | ⬛⬛ |  | 67w | 7w | Example 1: Warm‑Up – Plot & Distance |
| 11 | practice | 🟢 | ⬛⬛ |  | 62w | 3w | Example 2: Standard – Distance Between Two Points |
| 12 | pause_and_try | 🟡 | ◧ | ⏸️ | 62w | 9w | Your Turn: Tricky Points on an Axis |
| 13 | practice | 🟡 | ⬛⬛ |  | 65w | 4w | Example 3: Tricky – Solution |
| 14 | practice | 🟢 | ⬛⬛ |  | 60w | 7w | Example 4: Edge Case – Zero Vector |
| 15 | 🎛practice | 🟡 | ◧ |  | 77w | 11w | Example 5: Application – A Surface in 3D |
| 16 | challenge | 🔴 | ◧ |  | 68w | 4w | [Challenge – Optional] Proving the Distance Formula |
| 17 | summary | 🟢 | ⬛⬛ |  | 67w | 5w | What You've Learned |

---

### Slide 1 · [HOOK]
**Why 3D Coordinates?**  ·  `split_left_right`

**On-screen text** `[10w]`
Wind velocities over the Atlantic: magnitude and direction in 3D.

**LEFT** `[text]`

Weather forecasters track wind over the Atlantic using 3D velocity vectors. Each vector has magnitude (speed) and direction — a perfect introduction to **3D coordinates and vectors**.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a 3D coordinate system. Draw several arrows of varying lengths pointing in different directions to represent wind velocity vectors. Use blue arrows over a map-like grid (x-y plane). Label the axes x (east), y (north), z (up). Show 3D wind pattern effect.

**Teacher Narration** `[61w]`
> When meteorologists track wind patterns, they don't just say 'wind is strong'. They need to know the wind's speed and direction at every point in a three-dimensional volume. That's exactly what vectors are for: a compact way to describe magnitude and direction. Over the next twenty minutes, we'll build the tools to handle this — starting with the coordinate system itself.

---

### Slide 2 · [CORE] 🎛 *[1 controls]*
**The Right‑Hand Rule**  ·  `split_left_right`

**On-screen text** `[11w]`
Right‑hand rule: fingers → x, curl → y, thumb → z.

**LEFT** `[concept]`

Use your **right hand**:
1. Point fingers along **+x**.
2. Curl them toward **+y**.
3. Your thumb points to **+z**.

This defines a **right-handed coordinate system** – the standard in math and physics.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D axes with labeled x (red), y (green), z (blue) axes. Overlay a translucent right-hand silhouette with fingers pointing along x, curling toward y, thumb pointing up along z. Tick marks every 1 unit. Axes range from -3 to 3.

*Interactive Controls:*
  - 🎛 Toggle: show/hide right hand silhouette

**Teacher Narration** `[62w]`
> There's no universal 'up' in space, so mathematicians agreed on a standard orientation. Hold your right hand flat with fingers pointing along the positive x-axis. Now curl your fingers towards the positive y-axis. Your thumb automatically points in the positive z direction. This is the right-hand rule. Use it every time you set up a 3D coordinate system — it guarantees consistency.

---

### Slide 3 · [CORE] 🎛 *[1 controls]*
**Distance in ℝ³**  ·  `split_left_right`

**On-screen text** `[7w]`
Distance = √[(Δx)² + (Δy)² + (Δz)²]

**LEFT** `[formula_block]`

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Two points P1 = (1,2,3) and P2 = (4,5,6) in 3D space. Draw dashed lines from each point to the coordinate planes to show projections. Draw a solid line between P1 and P2. Label the differences Δx, Δy, Δz along the axes. Axes from 0 to 7. Use distinct colors for each axis.

*Interactive Controls:*
  - 🎛 Drag: move P1 and P2 to see distance update live

**Teacher Narration** `[72w]`
> The distance formula is the direct generalization from the Pythagorean theorem. In 2D we had a flat right triangle. In 3D, we apply the theorem twice: first to find the diagonal on the xy-plane, then combine that with the vertical difference. The result: square the differences in all three coordinates, sum them, and take the square root. This formula works for any two points in space, not just those near the origin.

---

### Slide 4 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Your Turn: Distance from Origin**  ·  `split_left_right`

**On-screen text** `[8w]`
Pause: d from (0,0,0) to (3,–2,4) = ?

**LEFT** `[text]`

Find the distance from the origin (0,0,0) to the point (3, –2, 4).

**Pause the video now and calculate.**

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D axes with origin O labeled and point (3,-2,4) marked as a red dot. Connecting dashed line from O to point. Coordinates displayed. No distance value shown.

**Teacher Narration** `[57w ⚠️ **TOO SHORT: 57w < 60w min**]`
> Here's a quick check. Take a moment to apply the distance formula from the origin to this point. The origin has coordinates (0,0,0). Write down your answer before moving on – I'll reveal the solution next. This is a straightforward application, but it's good practice to get comfortable with the formula before we tackle more complex problems.

**Student Prompt:** Calculate the distance. What did you get?

---

### Slide 5 · [PRACTICE]
**Distance from Origin – Solution**  ·  `split_left_right`

**On-screen text** `[3w]`
√29 ≈ 5.385

**LEFT** `[steps]`

1. Differences: Δx=3, Δy=–2, Δz=4
2. Squares: 9, 4, 16
3. Sum: 9+4+16 = 29
4. Square root: √29

**Answer: d = √29**

**RIGHT** `[visual_spec]`

*Visual Spec:* Same 3D plot as previous slide, but now show the distance label '√29' on the connecting line. Highlight the three squares 9, 4, 16 with different colors near the axes.

**Teacher Narration** `[64w]`
> Let's check. We subtract zero from each coordinate, giving differences 3, -2, and 4. Squaring gives 9, 4, and 16. Sum is 29. Take the square root – that's √29. So the point is about 5.385 units from the origin. If you got that, you're on the right track. Notice how the negative sign disappears when squared, which is why distance is always positive.

---

### Slide 6 · [CORE] 🎛 *[1 controls]*
**Midpoint in ℝ³**  ·  `split_left_right`

**On-screen text** `[6w]`
Midpoint = average of corresponding coordinates.

**LEFT** `[formula_block]`

$$\text{Midpoint} = \left(\frac{x_1 + x_2}{2},\;\frac{y_1 + y_2}{2},\;\frac{z_1 + z_2}{2}\right)$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Two points A(2,-1,5) and B(-4,3,-1) with their midpoint M = (-1,1,2) shown as a green diamond. Dashed lines connect A to M and M to B. Axes labeled. Show coordinates of all three points.

*Interactive Controls:*
  - 🎛 Drag: move A and B to see midpoint update

**Teacher Narration** `[58w ⚠️ **TOO SHORT: 58w < 60w min**]`
> The midpoint is exactly what you'd expect – the average of the coordinates. Take the x-coordinates, average them; same for y and z. The result is the point exactly halfway between the two endpoints. This works no matter where the points are in space. It's a simple but powerful tool for finding centers and balancing points in 3D.

---

### Slide 7 · [MISCONCEPTION]
**Common Mistake: Points vs. Vectors**  ·  `split_left_right`

**On-screen text** `[6w]`
Point $(2,3,1)$ ≠ vector $\langle 2,3,1\rangle$.

**LEFT** `[concept]`

A **point** has coordinates $(a,b,c)$. A **vector** has components $\langle a,b,c\rangle$. They look the same but behave differently:

- Point: a location.
- Vector: a displacement (direction and magnitude).

**Wrong:** Treating a point like a vector when subtracting positions.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show point P(2,3,1) as a dot. Then show an arrow from origin to P labeled as vector ⟨2,3,1⟩. Then show a separate scenario: from P to Q, the vector is Q - P (arrow from P to Q). Highlight that the vector is not the same as the point. Color code: points red, vectors blue.

**Teacher Narration** `[67w]`
> A common point of confusion: writing coordinates with parentheses and vectors with angle brackets. A point is a fixed place – like saying 'room 301'. A vector is a movement – like 'go three steps east, two steps north'. When we find the vector from P to Q, we subtract P from Q, not the other way around. The result is a displacement, not a new point.

---

### Slide 8 · [CORE] 🎛 *[3 controls]*
**Vector Magnitude**  ·  `split_left_right`

**On-screen text** `[3w]`
|⟨a,b,c⟩| = √(a²+b²+c²)

**LEFT** `[formula_block]`

$$|\vec{v}| = \sqrt{a^2 + b^2 + c^2}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Vector v = ⟨2, -3, 6⟩ drawn from origin. Show its length (|v|=7) as a label on the arrow. Dashed lines show the components along each axis. Axis ranges from -3 to 7.

*Interactive Controls:*
  - 🎛 Slider for component a from -5 to 5
  - 🎛 Slider for component b from -5 to 5
  - 🎛 Slider for component c from -5 to 5

**Teacher Narration** `[68w]`
> The magnitude of a vector is its length. It comes directly from the distance formula: if the vector starts at the origin, its tip is the point (a,b,c). So the magnitude is just the distance from origin to that point. For our vector ⟨2, -3, 6⟩, square 2 to get 4, square -3 to get 9, square 6 to get 36, sum to 49, square root gives 7.

---

### Slide 9 · [VISUAL_LAB] 🟡 🎛 *[2 controls]*
**Vector Addition & Scalar Multiplication**  ·  `split_left_right`

**On-screen text** `[5w]`
Add component‑wise; scale each component.

**LEFT** `[steps]`

**Addition:** $\vec{u}+\vec{v} = \langle u_1+v_1, u_2+v_2, u_3+v_3\rangle$

**Scalar multiple:** $c\vec{v} = \langle cv_1, cv_2, cv_3\rangle$

Drag the sliders to explore.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot with two vectors u = ⟨1,2,1⟩ (blue) and v = ⟨3,1,-1⟩ (red), both from origin. Show the sum u+v (green) from origin. Add a scalar multiple slider that multiplies v by c (c from -2 to 2). Show the scaled vector in orange. Display component values. Use mpl_toolkits.mplot3d.

*Interactive Controls:*
  - 🎛 Slider for scalar c from -2 to 2
  - 🎛 Toggle: show/hide sum vector u+v

**Teacher Narration** `[58w ⚠️ **TOO SHORT: 58w < 60w min**]`
> With the interactive plot you can see vector addition and scalar multiplication. Notice that adding u and v gives a new vector whose components are the sums of the original components. Scaling v by a factor c stretches or shrinks it, and if c is negative it reverses direction. Try sliding c and watch the orange vector change.

**Student Prompt:** What happens when c = 0? When c = 1?

---

### Slide 10 · [PRACTICE]
**Example 1: Warm‑Up – Plot & Distance**  ·  `full_width`

**On-screen text** `[7w]`
Plot (2,–3,4). Distance = √29 ≈ 5.385

**FULL WIDTH** `[steps]`

**Problem:** Plot the point (2, –3, 4) and find its distance from the origin.

| Step | Action |
|------|--------|
| 1 | Start at origin. Move 2 units along +x. |
| 2 | Move 3 units in negative y (back). |
| 3 | Move 4 units upward (z). |
| 4 | Distance: √(2² + (–3)² + 4²) = √(4+9+16) = √29 |

**Answer:** Point (2,–3,4), distance √29.

**Teacher Narration** `[67w]`
> Let's do a simple warm-up. To plot (2,–3,4), start at the origin. Move 2 units in the positive x direction, then 3 units in the negative y direction – that's backwards – then 4 units up. That's our point. Its distance from origin comes from the distance formula: 2 squared is 4, negative 3 squared is 9, 4 squared is 16, sum 29, square root gives √29.

---

### Slide 11 · [PRACTICE]
**Example 2: Standard – Distance Between Two Points**  ·  `full_width`

**On-screen text** `[3w]`
d = √41

**FULL WIDTH** `[steps]`

**Problem:** Find the distance between P(1, –2, 3) and Q(4, 2, –1).

| Step | Calculation |
|------|-------------|
| 1 | Δx = 4 – 1 = 3 |
| 2 | Δy = 2 – (–2) = 4 |
| 3 | Δz = –1 – 3 = –4 |
| 4 | d² = 3² + 4² + (–4)² = 9 + 16 + 16 = 41 |
| 5 | d = √41 |

**Answer:** √41 ≈ 6.403

**Teacher Narration** `[62w]`
> Here's a standard problem. First, find the differences: x goes from 1 to 4, so Δx=3. y goes from -2 to 2, that's 4. z goes from 3 to -1, that's -4. Square each: 9, 16, 16. Sum is 41. Square root is √41, about 6.403. Always double-check your signs when subtracting negatives. A small sign error can change the entire result.

---

### Slide 12 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]*
**Your Turn: Tricky Points on an Axis**  ·  `split_left_right`

**On-screen text** `[9w]`
Pause: distance from (3,–4,2) to z‑axis points = 5.

**LEFT** `[text]`

Find all points on the **z‑axis** that are 5 units from (3, –4, 2).

**Hint:** Points on the z‑axis have form (0,0,z).

Pause and try before the solution.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D axes with a vertical line drawn along the z-axis (x=0, y=0). Show fixed point P = (3,-4,2) as a red dot. No other points shown.

**Teacher Narration** `[62w]`
> This problem has a common trap. Points on the z-axis have x=0 and y=0, so they look like (0,0,z). We want the distance from each such point to (3,-4,2) to be exactly 5. Write the distance formula, set it equal to 5, and solve for z. Try it now, then check the solution. Think about whether you expect one or two solutions.

**Student Prompt:** How many points satisfy this condition?

---

### Slide 13 · [PRACTICE] 🟡
**Example 3: Tricky – Solution**  ·  `full_width`

**On-screen text** `[4w]`
Only one point: (0,0,2).

**FULL WIDTH** `[steps]`

**Problem:** Find all points on z‑axis 5 units from (3,–4,2).

| Step | Work |
|------|------|
| 1 | Let point = (0,0,z). |
| 2 | Distance eq: √[(3–0)² + (–4–0)² + (2–z)²] = 5 |
| 3 | Square: 9 + 16 + (2–z)² = 25 → 25 + (2–z)² = 25 |
| 4 | Subtract 25: (2–z)² = 0 → z = 2 |

**Answer:** Only one point: (0,0,2).

**Common mistake:** expecting two solutions because the equation looks quadratic.

**Teacher Narration** `[65w]`
> Let's solve. The point is (0,0,z). Plug into distance formula: square root of (9 + 16 + (2-z)²) = 5. Squaring both sides gives 25 + (2-z)² = 25. Subtract 25 gives (2-z)² = 0, so z=2. Only one solution. Why? Because (3,-4,2) is exactly 5 units from (0,0,2) – the distance in the xy-plane is 5 already, so the vertical difference must be zero.

---

### Slide 14 · [PRACTICE]
**Example 4: Edge Case – Zero Vector**  ·  `full_width`

**On-screen text** `[7w]`
Zero vector = ⟨0,0,0⟩, |0| = 0.

**FULL WIDTH** `[steps]`

**Problem:** Find the vector from P(2,–1,3) to Q(2,–1,3) and its magnitude.

| Step | Work |
|------|------|
| 1 | Vector = ⟨2–2, –1–(–1), 3–3⟩ = ⟨0,0,0⟩ |
| 2 | Magnitude = √(0²+0²+0²) = 0 |

**Answer:** Zero vector, magnitude 0.

**Key insight:** The zero vector is the only vector with zero magnitude. It has no direction.

**Teacher Narration** `[60w]`
> Here's an edge case. When the head and tail of a vector are the same point, the vector has zero length. All components are zero. The magnitude is zero. What about its direction? We say the zero vector has no direction – it's the only vector that doesn't point anywhere. This is an important special case you'll encounter in problems.

---

### Slide 15 · [PRACTICE] 🟡 🎛 *[1 controls]*
**Example 5: Application – A Surface in 3D**  ·  `split_left_right`

**On-screen text** `[11w]`
z = 4 – x² – y² → paraboloid opening downward.

**LEFT** `[text]`

Describe and sketch the surface given by $z = 4 - x^2 - y^2$.

- Cross‑sections parallel to xy‑plane: circles $x^2 + y^2 = 4 - z$
- For $z < 4$: circle radius $\sqrt{4-z}$
- At $z=4$: just the point $(0,0,4)$
- $z > 4$: no points
- The surface is a **downward‑opening paraboloid**.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D surface plot of z = 4 - x^2 - y^2 for x,y in [-2.5,2.5]. Use colormap or shading to show height. Include gridlines and axis labels. Highlight the vertex at (0,0,4). Optionally show a couple of horizontal cross-sections as circles.

*Interactive Controls:*
  - 🎛 Slider: show cross‑section at z = c for c from -5 to 4

**Teacher Narration** `[77w]`
> This is a sneak peek at multivariable functions. The equation z = 4 - x² - y² relates the three coordinates. For each (x,y), it gives a z-value. The resulting surface is like a bowl turned upside down – a paraboloid. Horizontal slices are circles that shrink as z increases, until at z=4 the circle becomes a single point at the top. This kind of thinking – fixing one variable – is crucial for understanding 3D shapes.

**Student Prompt:** What shape do you get if you cut the surface with a vertical plane?

---

### Slide 16 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proving the Distance Formula**  ·  `split_left_right`

**On-screen text** `[4w]`
Apply Pythagorean theorem twice.

**LEFT** `[steps]`

**Goal:** Show $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$.

1. Project $P_2$ onto horizontal plane through $P_1$: $Q(x_2,y_2,z_1)$.
2. In $xy$‑plane: $P_1Q$ has length $\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.
3. $QP_2$ is vertical: length $|z_2-z_1|$.
4. $\triangle P_1 Q P_2$ has right angle at $Q$.
5. By Pythagorean theorem: $d^2 = (P_1Q)^2 + (QP_2)^2$.
6. Take square root.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot showing points P1, P2, and Q (the projection). Draw right triangle with right angle at Q. Label legs as Δxy and Δz, and hypotenuse as d. Use dashed lines for projection.

**Teacher Narration** `[68w]`
> This optional proof ties everything together. By projecting one point onto the horizontal plane of the other, we create a right triangle. The horizontal leg uses the 2D distance formula; the vertical leg is just the difference in z. Because they're perpendicular, the Pythagorean theorem gives the full 3D distance. This is elegant and shows why the formula works. It also reinforces the geometric intuition behind the algebra.

---

### Slide 17 · [SUMMARY]
**What You've Learned**  ·  `full_width`

**On-screen text** `[5w]`
Review the five learning objectives.

**FULL WIDTH** `[text]`

**Key formulas & skills:**

- **Distance:** $d = \sqrt{(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2}$
- **Midpoint:** $\left(\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}, \frac{z_1+z_2}{2}\right)$
- **Vector:** $\vec{v} = \langle a,b,c\rangle \;\; |\vec{v}| = \sqrt{a^2+b^2+c^2}$
- **Operations:** component-wise addition and scalar multiplication
- **Surfaces:** equations in $x,y,z$ describe surfaces in $\mathbb{R}^3$

You can now plot points, compute distances, and work with vectors in 3D.

**Teacher Narration** `[67w]`
> Let's quickly recap. You learned the right-hand rule to orient axes. You can now compute distances and midpoints in 3D using simple extensions of 2D formulas. You understand that vectors represent direction and magnitude, and you can add them or multiply by scalars. Finally, you've seen how equations like z = 4 - x² - y² create surfaces. These are the foundations for calculus of several variables.

---
