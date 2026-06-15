# The Fundamental Theorem for Line Integrals

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You need basic line integrals, partial derivatives, and gradient vectors.

**Learning Objectives:**
- Calculate line integrals of conservative vector fields using potential functions
- Apply the Fundamental Theorem for Line Integrals to evaluate path-independent work
- Determine whether a vector field is conservative using the cross-partial condition
- Interpret path independence in terms of energy conservation

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 74w)
⚠️ **Narration too short (<60w):** [8]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s8:49w']
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
| 1 | hook | 🟢 | ◧ |  | 83w | 14w | The Surprising Fact About Work |
| 2 | core | 🟢 | ◧ |  | 84w | 19w | The Fundamental Theorem for Line Integrals |
| 3 | core | 🟢 | ◧ |  | 80w | 13w | Conservative Vector Fields |
| 4 | practice | 🟢 | ⬛⬛ |  | 102w | 13w | Example 1 – Warm-Up: Direct Application |
| 5 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 61w | 12w | Pause – Which Fields are Conservative? |
| 6 | core | 🟢 | ◧ |  | 69w | 16w | Answer + The Cross-Partial Test |
| 7 | practice | 🟡 | ⬛⬛ |  | 74w | 14w | Example 2 – Standard: Finding a Potential |
| 8 | 🎛pause_and_try | 🟡 | ◧ | ⏸️ | 49w⚠️ | 13w | Pause – Find a Potential Function |
| 9 | core | 🟡 | ◧ |  | 66w | 10w | Answer – Potential Found |
| 10 | misconception | 🟢 | ◧ |  | 96w | 17w | The Simply Connected Trap |
| 11 | practice | 🔴 | ⬛⬛ |  | 63w | 12w | [Challenge – Optional] Example 3 – Tricky: Punctured Plane |
| 12 | practice | 🟡 | ◧ |  | 62w | 12w | Example 4 – Edge Case: 3D Field |
| 13 | 🎛visual_lab | 🟢 | ◧ |  | 69w | 19w | Interactive Lab: Path Independence Visualization |
| 14 | practice | 🟡 | ◧ |  | 70w | 17w | Example 5 – Application: Physics Connection |
| 15 | challenge | 🔴 | ◧ |  | 73w | 12w | [Challenge – Optional] Proof Sketch |
| 16 | summary | 🟢 | ⬛⬛ |  | 81w | 20w | Summary |

---

### Slide 1 · [HOOK]
**The Surprising Fact About Work**  ·  `split_left_right`

**On-screen text** `[14w]`
Work against gravity depends only on height change, not on path length or steepness.

**LEFT** `[text]`

**Climbing a mountain:** Does the work you do against gravity depend on your path or only on how high you climb?

**Answer:** Only the net change in elevation matters. Work against gravity is path-independent.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two hiking trails on a mountain: one steep and straight, one gentle and winding, both from base camp A to summit B. Label elevation difference Δh. Show that the net work is m g Δh regardless of path.

**Teacher Narration** `[83w]`
> Imagine climbing a mountain. Whether you take the steep, direct trail or the long, winding path, the work your muscles do against gravity is the same. The only thing that matters is how much your elevation changes. This surprising fact is the physical intuition behind today's theorem. Think of it this way: gravity is a conservative force, so the work done against it only depends on the vertical displacement, not the horizontal distance traveled. This idea will generalize to any conservative vector field.

---

### Slide 2 · [CORE]
**The Fundamental Theorem for Line Integrals**  ·  `split_left_right`

**On-screen text** `[19w]`
The line integral of a gradient field equals the difference in potential at endpoints – result independent of path.

**LEFT** `[formula_block]`

$$\int_C \nabla f \cdot d\mathbf{r} = f(\mathbf{r}(b)) - f(\mathbf{r}(a))$$

- $C$: piecewise smooth curve, $\mathbf{r}(t)$, $a\leq t\leq b$
- $f$: differentiable scalar potential
- $\nabla f$: gradient of $f$

**RIGHT** `[visual_spec]`

*Visual Spec:* A 2D vector field showing arrows of $\nabla f$ (e.g., $f=x^2+y^2$, so arrows radial outward). Curve C from point A to point B. Highlight that the line integral equals $f(B)-f(A)$ regardless of path shape.

**Teacher Narration** `[84w]`
> Here is the theorem itself. If you have a gradient field, the line integral from one point to another equals the change in the potential function between those points. That means you never need to parametrize the curve. Just evaluate the potential at the start and finish. This is a huge simplification, similar to how the fundamental theorem of calculus lets you evaluate a definite integral by finding an antiderivative. The key is that the field must be a gradient of some scalar function.

---

### Slide 3 · [CORE]
**Conservative Vector Fields**  ·  `split_left_right`

**On-screen text** `[13w]`
Conservative fields: path-independent work; zero work on closed loops; have a potential function.

**LEFT** `[concept]`

A vector field $\mathbf{F}$ is **conservative** if $\mathbf{F} = \nabla f$ for some scalar potential $f$.

**Equivalent properties:**
1. Line integral depends only on endpoints
2. $\oint_C \mathbf{F}\cdot d\mathbf{r} = 0$ for any closed curve $C$
3. The field is irrotational: $\nabla\times\mathbf{F}=0$ (on simply connected domains)

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a closed curve with $\mathbf{F}$ field. Label net work zero. Below, two different open paths between same endpoints, both giving same line integral value. Colors: green for conservative, red for non-conservative.

**Teacher Narration** `[80w]`
> What exactly is a conservative field? It's a field that can be written as the gradient of a scalar function. For such fields, the work around any closed loop is zero, and the work from one point to another is always the same no matter which path you take. Friction is a non-conservative force – you always lose energy along a closed path. In contrast, gravity and electrostatic forces are conservative, which is why energy conservation holds in those systems.

---

### Slide 4 · [PRACTICE]
**Example 1 – Warm-Up: Direct Application**  ·  `full_width`

**On-screen text** `[13w]`
Example: With f given, line integral equals f(end) – f(start). Only endpoints matter.

**FULL WIDTH** `[steps]`

**Problem:** $f(x,y)=x^2y+3x$, $C$ from $(0,1)$ to $(2,3)$. Evaluate $\int_C \nabla f\cdot d\mathbf{r}$.

| Step | Action | Result |
|------|--------|--------|
| 1 | $f$ given | $f(x,y)=x^2y+3x$ |
| 2 | $f(0,1)$ | $0+0=0$ |
| 3 | $f(2,3)$ | $12+6=18$ |
| 4 | FTLI | $18-0=18$ |

**No curve parametrization needed!**

**Teacher Narration** `[102w]`
> Let's try a quick example. We have a potential function and we want the line integral of its gradient along any curve from (0,1) to (2,3). All we do is plug into the theorem: evaluate f at the end, subtract f at the start. The answer is 18, and we never had to look at the curve. Beautiful, right? This shows the power of the theorem: it reduces a potentially complicated line integral to a simple evaluation of a function at two points. Notice that the path could be any smooth curve connecting these points, and the result would be the same.

---

### Slide 5 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause – Which Fields are Conservative?**  ·  `split_left_right`

**On-screen text** `[12w]`
Which fields are conservative? Compute partial derivatives or look at the plot.

**LEFT** `[text]`

**Check each field:**
A) $\mathbf{F}=y\mathbf{i}+x\mathbf{j}$
B) $\mathbf{F}=x\mathbf{i}+y\mathbf{j}$
C) $\mathbf{F}=y\mathbf{i}-x\mathbf{j}$

Use the cross-partial test: $\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show three small vector fields (quiver plots) for A, B, C. Let student visually check if there is rotation. Use colors: green for zero curl, red for non-zero curl.

*Interactive Controls:*
  - 🎛 Button: Reveal answer

**Teacher Narration** `[61w]`
> Pause the video now. For each of the three vector fields, decide whether it is conservative. Use the cross-partial test, or look at the visual of the field. I'll give you a moment. Remember, a conservative field has no rotation, so the arrows should not form closed loops or swirls. Try to see if you can spot the pattern before computing.

**Student Prompt:** Determine which of A, B, C are conservative.

---

### Slide 6 · [CORE]
**Answer + The Cross-Partial Test**  ·  `split_left_right`

**On-screen text** `[16w]`
Cross-partial test: equal partials = conservative (on simply connected domain). A and B pass, C fails.

**LEFT** `[concept]`

**2D Test:** $\mathbf{F}=P\mathbf{i}+Q\mathbf{j}$ conservative on simply connected domain iff
$$\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$$

**Answers:**
A. $\frac{\partial P}{\partial y}=1$, $\frac{\partial Q}{\partial x}=1$ → conservative
B. $0=0$ → conservative
C. $1 \neq -1$ → NOT conservative

**RIGHT** `[visual_spec]`

*Visual Spec:* Superimpose a green checkmark on A and B, red X on C. Show the partial derivatives numerically on arrows.

**Teacher Narration** `[69w]`
> Here's the answer. Field A has P_y equals Q_x both equal to 1. Field B both zero. But field C has P_y=1 and Q_x=-1, so it's not conservative. The cross-partial test is the quickest way to check in 2D. Notice that for field C, the partial derivatives are not equal, indicating that the field has a rotational component, which means it cannot be the gradient of any scalar function.

---

### Slide 7 · [PRACTICE] 🟡
**Example 2 – Standard: Finding a Potential**  ·  `full_width`

**On-screen text** `[14w]`
To apply FTLI, first find a potential function f such that ∇f = F.

**FULL WIDTH** `[steps]`

**Problem:** $\mathbf{F}=(2x+y)\mathbf{i}+(x+2y)\mathbf{j}$. Find potential $f$ and evaluate $\int_C\mathbf{F}\cdot d\mathbf{r}$ where $C$: $\mathbf{r}(t)=(t^2,t^3)$, $0\le t\le1$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Check conservative | $P_y=1$, $Q_x=1$ ✓ |
| 2 | Integrate $P$ w.r.t. $x$ | $f=x^2+xy+g(y)$ |
| 3 | Differentiate w.r.t. $y$ | $f_y=x+g'(y) = x+2y$ → $g'(y)=2y$ |
| 4 | Integrate $g'(y)$ | $g(y)=y^2+C$ |
| 5 | Potential (C=0) | $f(x,y)=x^2+xy+y^2$ |
| 6 | Endpoints | $(0,0)$ to $(1,1)$ |
| 7 | FTLI | $f(1,1)-f(0,0)=1+1+1=3$ |

**Teacher Narration** `[74w]`
> Now we work an example where we have to find the potential function ourselves. We start by checking the cross-partial test, then integrate P with respect to x, adding an unknown function g(y). Differentiating with respect to y and setting equal to Q tells us g'(y)=2y, so g(y)=y^2. The endpoints are (0,0) and (1,1), so the integral is 3. Easy. Notice that the parametrization of the curve was irrelevant once we found the potential.

---

### Slide 8 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause – Find a Potential Function**  ·  `split_left_right`

**On-screen text** `[13w]`
Find f such that ∇f = F. Then compute f(π/2, 0) – f(0,0).

**LEFT** `[text]`

**Try it:** $\mathbf{F} = (e^x\sin y)\mathbf{i} + (e^x\cos y)\mathbf{j}$

Find a potential function $f$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show the vector field with a few streamlines, and a question mark where the potential would go. Have a hidden equation that reveals on answer button.

*Interactive Controls:*
  - 🎛 Button: Show answer

**Teacher Narration** `[49w ⚠️ **TOO SHORT: 49w < 60w min**]`
> Pause the video and try to find a potential function for this vector field. Remember the procedure: integrate P with respect to x, add g(y), then use f_y = Q to determine g. I'll show the answer in a moment. This is a good practice to solidify the method.

**Student Prompt:** Find a potential function f.

---

### Slide 9 · [CORE] 🟡
**Answer – Potential Found**  ·  `split_left_right`

**On-screen text** `[10w]`
Potential: f(x,y) = e^x sin y. Line integral = 0.

**LEFT** `[steps]`

1. $f_x = e^x\sin y$ → $f = e^x\sin y + g(y)$
2. $f_y = e^x\cos y + g'(y) = e^x\cos y$ → $g'(y)=0$
3. $g(y)=C$, so $f(x,y)=e^x\sin y + C$
4. Choose $C=0$: $f = e^x\sin y$

$\int_C \nabla f\cdot d\mathbf{r} = f(\pi/2,0)-f(0,0) = e^{\pi/2}\cdot0 - 0 = 0$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of f(x,y)=e^x sin y over a small region. Highlight the path from (0,0) to (π/2,0) on the surface and the height difference.

**Teacher Narration** `[66w]`
> Here's the solution. The potential is e^x sin y. The cross-partials are equal, confirming the field is conservative. The line integral from (0,0) to (π/2,0) is just 0. This makes sense because sin y is zero at both endpoints, so the potential difference is zero. Notice that even though the path might be complicated, the integral is simply the difference in the potential at the endpoints.

---

### Slide 10 · [MISCONCEPTION]
**The Simply Connected Trap**  ·  `split_left_right`

**On-screen text** `[17w]`
Equal partials on a punctured plane don't guarantee conservativity. The domain must be simply connected (no holes).

**LEFT** `[concept]`

**Warning:** The cross-partial test is NOT sufficient if the domain is not simply connected (has holes).

Example: $\mathbf{F} = \left(-\frac{y}{x^2+y^2}\right)\mathbf{i} + \left(\frac{x}{x^2+y^2}\right)\mathbf{j}$
- $P_y = Q_x$ everywhere except origin.
- But domain $\mathbb{R}^2\setminus\{(0,0)\}$ has a hole.
- Line integral around unit circle is $2\pi$, not zero!
- No single-valued potential exists globally.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show the vector field around unit circle; note arrows are tangent. Compute circulation = 2π. Show a puncture at origin and label domain not simply connected.

**Teacher Narration** `[96w]`
> Here's a common mistake. The cross-partial test looks perfect – they're equal. But the domain has a hole at the origin. The field is actually the gradient of angle theta, which is not single-valued. The line integral around a closed loop around the hole gives 2π, not zero. Always check that the domain is simply connected before applying the test. This is a subtle but important point: the condition for a field to be conservative is that it is the gradient of a potential, and that potential must be defined and single-valued on the entire domain.

---

### Slide 11 · [PRACTICE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Example 3 – Tricky: Punctured Plane**  ·  `full_width`

**On-screen text** `[12w]`
Example of non-conservative field despite equal cross-partials: circulation around hole is non-zero.

**FULL WIDTH** `[steps]`

**Problem:** $\mathbf{F}=\left(-\frac{y}{x^2+y^2}\right)\mathbf{i}+\left(\frac{x}{x^2+y^2}\right)\mathbf{j}$. Evaluate $\oint_C \mathbf{F}\cdot d\mathbf{r}$ where $C$ is unit circle, counterclockwise.

| Step | Action | Result |
|------|--------|--------|
| 1 | $P_y=Q_x$? | Both equal $\frac{y^2-x^2}{(x^2+y^2)^2}$ |
| 2 | Domain | $\mathbb{R}^2\setminus\{(0,0)\}$ not simply connected |
| 3 | Parametrize $C$ | $x=\cos t,\, y=\sin t,\,0\le t\le2\pi$ |
| 4 | $\mathbf{r}'(t)$ | $(-\sin t,\cos t)$ |
| 5 | $\mathbf{F}(\mathbf{r}(t))$ | $(-\sin t,\cos t)$ |
| 6 | Dot product | $\sin^2 t+\cos^2 t=1$ |
| 7 | Integrate | $\int_0^{2\pi}1\,dt=2\pi$ |

**Key lesson:** The test fails on non-simply connected domains.

**Teacher Narration** `[63w]`
> Let's compute the circulation around the unit circle for this field. Even though the partial derivatives match, the curve encloses the hole. The dot product simplifies nicely to 1, so the integral is 2π. This shows the field is not conservative globally. The simply connected condition is essential. This example highlights why we must always consider the domain when applying the cross-partial test.

---

### Slide 12 · [PRACTICE] 🟡
**Example 4 – Edge Case: 3D Field**  ·  `split_left_right`

**On-screen text** `[12w]`
3D example: use curl test ∇×F=0, find potential, apply FTLI. Result: 52.

**LEFT** `[steps]`

**Problem:** $\mathbf{F}=2xy\,\mathbf{i}+(x^2+2yz)\mathbf{j}+y^2\mathbf{k}$. Evaluate $\int_C\mathbf{F}\cdot d\mathbf{r}$ along line from $(1,0,2)$ to $(3,4,1)$.

1. Check $\nabla\times\mathbf{F}=\mathbf{0}$: all curl components zero.
2. Find $f$: $f_x=2xy \Rightarrow f=x^2y+g(y,z)$
3. $f_y=x^2+g_y = x^2+2yz \Rightarrow g_y=2yz$
4. $\Rightarrow g=y^2z+h(z)$
5. $f_z=y^2+h'(z) = y^2 \Rightarrow h'(z)=0$
6. Potential: $f(x,y,z)=x^2y+y^2z$
7. FTLI: $f(3,4,1)-f(1,0,2)=36+16-0=52$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot using mpl_toolkits.mplot3d showing the vector field as arrows, and the line from (1,0,2) to (3,4,1). Highlight the start and end points, label potential values.

**Teacher Narration** `[62w]`
> Now for a 3D field. First we check the curl is zero: all three components vanish. Then we find the potential by integrating step by step. The potential is x²y + y²z. Plugging in the endpoints gives 52. The theorem works in any dimension. The process is similar to the 2D case, but we now have an additional function h(z) to determine.

---

### Slide 13 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive Lab: Path Independence Visualization**  ·  `split_left_right`

**On-screen text** `[19w]`
Drag the slider to trace two different paths. Observe that the net work is the same (calculated as f(B)-f(A)=6).

**LEFT** `[text]`

Explore the path independence of a conservative field.
- Two different paths between A and B.
- The work (line integral) is the same for both.
- Use the slider to trace each path.

**RIGHT** `[visual_spec]`

*Visual Spec:* A 2D vector field of F = ∇(x^2+xy) = (2x+y, x). Two curves: straight line from (0,0) to (2,2) and a parabolic curve y=0.5x^2 from (0,0) to (2,2). Slider moves a point along each path. Numeric display of accumulated line integral for each path, showing they are equal (6). Also show potential difference f(2,2)-f(0,0)=6. Color code paths differently.

*Interactive Controls:*
  - 🎛 Slider: Trace progress along paths (0 to 1)
  - 🎛 Button: Reset paths

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

# Define potential and field
x = np.linspace(-0.5, 2.5, 20)
y = np.linspace(-0.5, 2.5, 20)
X, Y = np.meshgrid(x, y)
U = 2*X + Y
V = X

fig, ax = plt.subplots(figsize=(8,6))
plt.subplots_adjust(bottom=0.25)
ax.quiver(X, Y, U, V)

# Straight line param: (t, t)
t_vals = np.linspace(0, 2, 100)
straight_x = t_vals
straight_y = t_vals
ax.plot(straight_x, straight_y, 'r-', lw=2, label='Straight path')

# Parabolic path: (t, 0.5*t^2)
parab_x = t_vals
parab_y = 0.5 * t_vals**2
ax.plot(parab_x, parab_y, 'b-', lw=2, label='Parabolic path')

ax.scatter([0,2], [0,2], color='k', s=50, zorder=5)
ax.text(0,0,'A', fontsize=12, ha='right')
ax.text(2,2,'B', fontsize=12, ha='left')
ax.set_xlim(-0.5, 2.5)
ax.set_ylim(-0.5, 2.5)
ax.set_aspect('equal')
ax.legend()

# Slider to trace paths
ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 'Path progress', 0, 1, valinit=0)

# initial point markers
pt_straight, = ax.plot([], [], 'ro', ms=8)
pt_parab, = ax.plot([], [], 'bo', ms=8)

# Text displays for line integrals
integral_text = ax.text(0.5, -0.2, '', transform=ax.transAxes, ha='center', fontsize=12)

def update(val):
    idx = int(val * (len(t_vals)-1))
    pt_straight.set_data([straight_x[idx]], [straight_y[idx]])
    pt_parab.set_data([parab_x[idx]], [parab_y[idx]])
    # Compute line integral up to that point using potential difference
    # For straight path: f(t,t) = t^2 + t*t = 2t^2
    # For parabolic path: f(t,0.5t^2) = t^2 + t*(0.5t^2) = t^2 + 0.5t^3
    t = t_vals[idx]
    straight_integral = 2*t**2
    parab_integral = t**2 + 0.5*t**3
    integral_text.set_text(f'Straight integral: {straight_integral:.2f}   Parabolic integral: {parab_integral:.2f}')
    fig.canvas.draw_idle()

slider.on_changed(update)
update(0)
plt.show()
```

**Teacher Narration** `[69w]`
> Use this interactive lab to see path independence in action. Drag the slider to move along two different paths from A to B. You'll see that the accumulated work is the same for both, because the field is conservative. The number at the bottom shows the potential difference. This visual demonstration reinforces the idea that the line integral depends only on the endpoints, not on the specific path taken.

**Student Prompt:** Explore: Try different path shapes (conceptually). Notice that the integral value never changes.

---

### Slide 14 · [PRACTICE] 🟡
**Example 5 – Application: Physics Connection**  ·  `split_left_right`

**On-screen text** `[17w]`
Physics: Work done by conservative force = change in potential energy. Result: e + 1 + π²/2.

**LEFT** `[steps]`

**Problem:** A particle moves in force field $\mathbf{F} = (e^x\sin y + 2x)\mathbf{i} + (e^x\cos y + 4y)\mathbf{j}$. Find work from $(0,0)$ to $(1,\pi/2)$ along any path.

1. Check conservative: $P_y = e^x\cos y = Q_x$ ✓
2. Find potential:
   - $f_x = e^x\sin y + 2x \Rightarrow f = e^x\sin y + x^2 + g(y)$
   - $f_y = e^x\cos y + g'(y) = e^x\cos y + 4y \Rightarrow g'(y)=4y$
   - $g(y)=2y^2$
3. $f(x,y) = e^x\sin y + x^2 + 2y^2$
4. Work = $f(1,\pi/2)-f(0,0) = e\cdot 1 + 1 + 2(\pi/2)^2 - 0 = e + 1 + \frac{\pi^2}{2}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the potential surface f(x,y)=e^x sin y + x^2 + 2y^2 over [0,1]x[0,π/2]. Mark the start and end points. Show the work equals the height difference.

**Teacher Narration** `[70w]`
> In physics, work done by a conservative force equals the negative change in potential energy. Here our force is conservative, so we find the potential. The work from (0,0) to (1,π/2) is e + 1 + π²/2. Notice we didn't need the path – only endpoints. This is the power of the theorem. This connection between mathematics and physics is a beautiful example of how abstract concepts have real-world applications.

---

### Slide 15 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof Sketch**  ·  `split_left_right`

**On-screen text** `[12w]`
Proof uses the chain rule and the 1D Fundamental Theorem of Calculus.

**LEFT** `[steps]`

**Goal:** If $\mathbf{F}=\nabla f$ on a smooth curve $C$: $\mathbf{r}(t)$, $a\le t\le b$, then $\int_C \mathbf{F}\cdot d\mathbf{r} = f(\mathbf{r}(b))-f(\mathbf{r}(a))$.

**Proof:**
1. $\int_C \mathbf{F}\cdot d\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,dt$
2. $= \int_a^b \nabla f(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,dt$
3. $= \int_a^b \frac{d}{dt} f(\mathbf{r}(t))\,dt$ (chain rule)
4. $= f(\mathbf{r}(b))-f(\mathbf{r}(a))$ (FTC)

The proof reduces the multivariable problem to single-variable calculus.

**RIGHT** `[visual_spec]`

*Visual Spec:* Diagram showing f composes with r(t): t -> r(t) -> f(r(t)). Highlight the derivative chain. Show the unit circle with point moving and the value of f changing.

**Teacher Narration** `[73w]`
> For those who want to see why the theorem is true, here's a short proof. We write the line integral as an integral with respect to t, substitute F = ∇f, then use the chain rule to get the derivative of f along the curve. The fundamental theorem of calculus then gives the difference. Elegant, isn't it? This proof shows how the multivariable theorem is a natural extension of the single-variable fundamental theorem.

---

### Slide 16 · [SUMMARY]
**Summary**  ·  `full_width`

**On-screen text** `[20w]`
Fundamental Theorem for Line Integrals: line integral of a gradient = potential difference. Path independence. Cross-partial test. Simply connected condition.

**FULL WIDTH** `[concept]`

**Key takeaways:**
- **FTLI:** $\int_C \nabla f\cdot d\mathbf{r} = f(\text{end})-f(\text{start})$
- Conservative fields: path-independent, zero circulation on closed loops
- **2D test:** $\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$ (simply connected domain required)
- **3D test:** $\nabla\times\mathbf{F}=0$
- Finding potential: integrate $P$ w.r.t. $x$, add $g(y)$ (and $h(z)$ in 3D), then differentiate to recover $Q$ and $R$
- Watch out: non-simply connected domains can break the test

**Teacher Narration** `[81w]`
> Let's recap what we've learned. The Fundamental Theorem for Line Integrals tells us that the integral of a gradient field depends only on the endpoints. We can test if a field is conservative using the cross-partial test in 2D or the curl in 3D, provided the domain is simply connected. Finding the potential function involves integrating and matching partial derivatives. Remember the trap of the punctured plane – always check the domain. Practice these ideas with the exercises. Thanks for watching!

---
