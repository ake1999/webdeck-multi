# Double Integrals Over General Regions

**Category:** calculus  |  **Level:** First-year University / Advanced High School  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** Familiarity with double integrals over rectangles and Fubini's Theorem.

**Learning Objectives:**
- Set up double integrals over Type I and Type II regions
- Evaluate iterated integrals with variable limits
- Choose the optimal integration order for a given region
- Decompose complex regions into simpler subregions

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 64w)
⚠️ **Narration too short (<60w):** [2, 9, 11, 16]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 3 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s2:50w', 's9:42w', 's11:50w', 's16:59w']
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
| 1 | hook | 🟢 | ◧ |  | 78w | 13w | From Rectangles to Irregular Shapes |
| 2 | 🎛visual_lab | 🟢 | ◧ |  | 50w⚠️ | 12w | Type I Regions |
| 3 | practice | 🟢 | ◧ | ⏸️ | 77w | 10w | Example 1: [Warm-Up] Area Between Parabolas |
| 4 | 🎛visual_lab | 🟢 | ◧ |  | 60w | 12w | Type II Regions |
| 5 | practice | 🟢 | ◧ | ⏸️ | 68w | 12w | Example 2: [Standard] Volume Under a Surface |
| 6 | misconception | 🟢 | ◧ |  | 67w | 11w | Common Mistake: Variable Limits on Outer Integral |
| 7 | core | 🟢 | ⬛⬛ |  | 74w | 9w | Properties of Double Integrals |
| 8 | challenge | 🔴 | ◧ | ⏸️ | 83w | 10w | [Challenge – Optional] Reversing the Order of Integration |
| 9 | practice | 🟡 | ◧ |  | 42w⚠️ | 12w | Example 3: [Edge Case] Region That Is Both Types |
| 10 | practice | 🟡 | ◧ |  | 60w | 12w | Example 4: [Application] Exponential Integrand |
| 11 | 🎛visual_lab | 🟢 | ◧ |  | 50w⚠️ | 11w | Interactive Region Explorer |
| 12 | pause_and_try | 🟢 | ◧ |  | 60w | 9w | Quick Check MCQ 1 |
| 13 | pause_and_try | 🟢 | ◧ |  | 63w | 9w | Quick Check MCQ 2 |
| 14 | pause_and_try | 🟢 | ◧ |  | 63w | 8w | Quick Check MCQ 3 |
| 15 | summary | 🟢 | ⬛⬛ |  | 70w | 10w | Summary & Key Takeaways |
| 16 | core | 🟢 | ⬛⬛ |  | 59w⚠️ | 6w | Practice Problems (Homework) |

---

### Slide 1 · [HOOK]
**From Rectangles to Irregular Shapes**  ·  `split_left_right`

**On-screen text** `[13w]`
From rectangles to irregular shapes. The key: understand how to describe the region.

**LEFT** `[text]`

Real-world regions are rarely perfect rectangles. Double integrals over general regions let us compute volumes, areas, and averages over any shape you can draw.

**RIGHT** `[visual_spec]`

*Visual Spec:* Create a figure with two subplots. Left: rectangle [0,2]x[0,3] with grid lines. Right: region bounded by y = x^2 and y = 4 - x^2 (from x=-2 to 2), shaded, with one vertical slice line at x=0. Add 'Rectangular' and 'General' titles.

**Teacher Narration** `[78w]`
> Think about calculating the area of a leaf-shaped pond. You can't just use width times height. But if you slice it at each x-position, the height varies. That's the core idea of double integrals over general regions: we integrate first in y between the boundary curves, then in x. This approach extends the rectangular case to any shape you can draw, making it a powerful tool for real-world applications like computing volumes, areas, and averages over irregular domains.

---

### Slide 2 · [VISUAL_LAB] 🎛 *[2 controls]*
**Type I Regions**  ·  `split_left_right`

**On-screen text** `[12w]`
Type I: fix x, y varies between two functions. Integrate dy first.

**LEFT** `[formula_block]`

$$\text{Type I: } D = \{(x,y) \mid a\le x\le b,\; g_1(x)\le y\le g_2(x)\}$$ $$\iint_D f\,dA = \int_a^b \int_{g_1(x)}^{g_2(x)} f(x,y)\,dy\,dx$$

**RIGHT** `[python_lab]`

*Visual Spec:* Plot region D bounded by y=2x^2 and y=1+x^2 from x=-1 to 1. Shade region in light blue. Add a vertical dashed line at current x = x0. Highlight the y-interval [g1(x0), g2(x0)] in yellow. Include a slider for x0 from -1 to 1 and a button to reset x0 to 0. Label axes and curves.

*Interactive Controls:*
  - 🎛 Slider for x from -1 to 1
  - 🎛 Button: reset x to 0

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

fig, ax = plt.subplots(figsize=(7,6))
plt.subplots_adjust(bottom=0.3)

x = np.linspace(-1, 1, 400)
g1 = lambda x: 2*x**2
g2 = lambda x: 1 + x**2
y_low = g1(x)
y_high = g2(x)

ax.fill_between(x, y_low, y_high, alpha=0.3, label='Region D', color='skyblue')
ax.plot(x, y_low, 'b', lw=2, label='$y=2x^2$')
ax.plot(x, y_high, 'r', lw=2, label='$y=1+x^2$')
ax.set_xlim(-1.2, 1.2)
ax.set_ylim(-0.2, 2.5)
ax.set_xlabel('$x$')
ax.set_ylabel('$y$')
ax.legend()
ax.grid(True)

x0_init = 0.0
slice_line, = ax.plot([x0_init, x0_init], [g1(x0_init), g2(x0_init)], 'k--', lw=2)
# highlight fill using polygon
from matplotlib.patches import Polygon
vert = [(x0_init, g1(x0_init)), (x0_init, g2(x0_init))]
patch = ax.add_patch(Polygon(vert, closed=False, color='yellow', alpha=0.6))

ax_slider = plt.axes([0.25, 0.1, 0.5, 0.03])
slider = Slider(ax_slider, 'x', -1.0, 1.0, valinit=x0_init)

ax_button = plt.axes([0.4, 0.05, 0.2, 0.04])
reset_button = Button(ax_button, 'Reset x=0')

def update(val):
    x0 = slider.val
    slice_line.set_data([x0, x0], [g1(x0), g2(x0)])
    patch.set_xy([(x0, g1(x0)), (x0, g2(x0))])
    fig.canvas.draw_idle()

def reset(event):
    slider.reset()
    update(0.0)

slider.on_changed(update)
reset_button.on_clicked(reset)

plt.show()
```

**Teacher Narration** `[50w ⚠️ **TOO SHORT: 50w < 60w min**]`
> For a Type I region, we fix an x position and slice vertically. The y coordinate runs from the bottom curve to the top curve. The outer integration then adds up all these vertical slices. Notice how the inner limits are functions of x, while the outer limits are constants.

---

### Slide 3 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Example 1: [Warm-Up] Area Between Parabolas**  ·  `split_left_right`

**On-screen text** `[10w]`
Find area between y=2x² and y=1+x². Steps: intersect, describe, integrate.

**LEFT** `[steps]`

**Problem:** Find the area between $y = 2x^2$ and $y = 1 + x^2$.

**Step 1:** Intersection: $2x^2 = 1 + x^2 \Rightarrow x = \pm 1$

**Step 2:** Type I: $-1 \le x \le 1$, $2x^2 \le y \le 1+x^2$

**Step 3:** $A = \int_{-1}^1 \int_{2x^2}^{1+x^2} 1\,dy\,dx$

**Step 4:** Inner: $(1+x^2) - (2x^2) = 1 - x^2$

**Step 5:** Outer: $\int_{-1}^1 (1-x^2)\,dx = \frac{4}{3}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Create a matplotlib plot: curves y=2x^2 and y=1+x^2 from x=-1.2 to 1.2. Fill region between them with light green. Mark intersection points with red dots. Label axes. Add text showing area = 4/3.

**Teacher Narration** `[77w]`
> Try this problem on your own before we work through it. The region is bounded by two parabolas. First find where they intersect by setting the equations equal. You'll get x equals plus or minus one. The region is clearly Type I: for any x between minus one and one, y goes from the lower parabola to the upper one. The integral then becomes straightforward: inner integral of dy gives the vertical height, outer gives the sum.

**Student Prompt:** Sketch the region. What type is it? Set up the iterated integral.

---

### Slide 4 · [VISUAL_LAB] 🎛 *[2 controls]*
**Type II Regions**  ·  `split_left_right`

**On-screen text** `[12w]`
Type II: fix y, x varies between two functions. Integrate dx first.

**LEFT** `[formula_block]`

$$\text{Type II: } D = \{(x,y) \mid c\le y\le d,\; h_1(y)\le x\le h_2(y)\}$$ $$\iint_D f\,dA = \int_c^d \int_{h_1(y)}^{h_2(y)} f(x,y)\,dx\,dy$$

**RIGHT** `[python_lab]`

*Visual Spec:* Plot the same region but described as Type II: from y=0 to y=2, x between left and right curves (solve x in terms of y). For region between y=2x^2 and y=1+x^2, solving: x=±√(y/2) and x=±√(y-1). But this region is simpler as Type I; for this demo, use a region like triangle with vertices (0,0),(2,0),(0,1) to show Type II nicely. Let's use triangle: y from 0 to 1, x from 0 to 2(1-y). Plot region, horizontal slice at y0, shade x-interval. Slider for y, reset button.

*Interactive Controls:*
  - 🎛 Slider for y from 0 to 1
  - 🎛 Button: reset y to 0.5

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

fig, ax = plt.subplots(figsize=(7,6))
plt.subplots_adjust(bottom=0.3)

# Triangle region: y in [0,1], x in [0, 2(1-y)]
y_vals = np.linspace(0, 1, 200)
x_low = np.zeros_like(y_vals)
x_high = 2*(1 - y_vals)
ax.fill_betweenx(y_vals, x_low, x_high, alpha=0.3, color='lightcoral', label='Region D')
ax.plot(x_high, y_vals, 'b', lw=2, label='$x=2(1-y)$')
ax.plot(x_low, y_vals, 'k', lw=1)
ax.set_xlim(-0.2, 2.5)
ax.set_ylim(-0.2, 1.2)
ax.set_xlabel('$x$')
ax.set_ylabel('$y$')
ax.legend()
ax.grid(True)

y0_init = 0.5
slice_line, = ax.plot([0, 2*(1-y0_init)], [y0_init, y0_init], 'k--', lw=2)
# highlight fill
from matplotlib.patches import Polygon
patch = ax.add_patch(Polygon([(0, y0_init), (2*(1-y0_init), y0_init)], closed=False, color='yellow', alpha=0.6))

ax_slider = plt.axes([0.25, 0.1, 0.5, 0.03])
slider = Slider(ax_slider, 'y', 0.0, 1.0, valinit=y0_init)

ax_button = plt.axes([0.4, 0.05, 0.2, 0.04])
reset_button = Button(ax_button, 'Reset y=0.5')

def update(val):
    y0 = slider.val
    slice_line.set_data([0, 2*(1-y0)], [y0, y0])
    patch.set_xy([(0, y0), (2*(1-y0), y0)])
    fig.canvas.draw_idle()

def reset(event):
    slider.reset()
    update(0.5)

slider.on_changed(update)
reset_button.on_clicked(reset)

plt.show()
```

**Teacher Narration** `[60w]`
> Type II regions flip the perspective. Now we fix a y value and slice horizontally. The x coordinate runs from the left boundary to the right boundary, both expressed as functions of y. This is especially useful when the region is naturally described by y ranges and the boundary curves are easier to write as x equals something in y.

---

### Slide 5 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Example 2: [Standard] Volume Under a Surface**  ·  `split_left_right`

**On-screen text** `[12w]`
Volume above same region. Set up iterated integral, evaluate inner then outer.

**LEFT** `[steps]`

**Problem:** $\iint_D (x+2y)\,dA$, same region $y=2x^2$, $y=1+x^2$.

**Step 1:** Region: $-1\le x\le1$, $2x^2\le y\le1+x^2$

**Step 2:** $\int_{-1}^1 \int_{2x^2}^{1+x^2} (x+2y)\,dy\,dx$

**Step 3:** Inner: $[xy+y^2]_{2x^2}^{1+x^2} = 1+x+2x^2 - x^3 - 3x^4$

**Step 4:** Outer: $\int_{-1}^1 (1+x+2x^2 - x^3 - 3x^4)\,dx = \frac{32}{15}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Use matplotlib 3D: plot the surface z=x+2y over the region D defined by x from -1 to 1, y from 2x^2 to 1+x^2. Shade the surface. Optionally show vertical walls at the boundary. Label axes. Add text with answer 32/15.

**Teacher Narration** `[68w]`
> Now we integrate a function, not just area. The setup is the same region, but instead of integrating 1, we integrate x plus 2y. Work through the inner integral carefully: treat x as constant, integrate in y. After simplifying, you'll get a polynomial in x. The outer integral from minus one to one benefits from symmetry: odd powers integrate to zero. The final answer is 32 over 15.

**Student Prompt:** Set up the iterated integral and evaluate it. Use symmetry to simplify the outer integral.

---

### Slide 6 · [MISCONCEPTION]
**Common Mistake: Variable Limits on Outer Integral**  ·  `split_left_right`

**On-screen text** `[11w]`
Outer limits must be constants! Inner limits depend on outer variable.

**LEFT** `[text]`

**Wrong approach:** For Type I, writing $\int_{g_1(x)}^{g_2(x)} \int_a^b f(x,y)\,dx\,dy$ or putting $x$ limits that depend on $y$

**Why it fails:** The outer integral must have constant limits. Variable outer limits would make the result a function, not a number.

**Correct:** Outer limits are constants; inner limits are functions of the outer variable.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the region from Example 1. Overlay both a correct vertical slice (solid) and an incorrect horizontal slice (dashed) that extends outside the region. Add labels 'Valid vertical slice' and 'Invalid horizontal slice for Type I'.

**Teacher Narration** `[67w]`
> A very common mistake is to swap the order without thinking. If you try to integrate dx first when the region is Type I, the x limits would need to be functions of y, but the region's x range is constant only after integrating y. Always check: the outer integral's limits must be numerical constants. This is why sketching the region and identifying its type is crucial.

**Student Prompt:** Why is $\int_{g_1(x)}^{g_2(x)} \int_a^b f\,dx\,dy$ usually incorrect for a Type I region?

---

### Slide 7 · [CORE]
**Properties of Double Integrals**  ·  `full_width`

**On-screen text** `[9w]`
Key properties: linearity, additivity, area formula, monotonicity, triangle inequality.

**FULL WIDTH** `[formula_block]`

**Linearity:** $\iint_D (f+g)\,dA = \iint_D f\,dA + \iint_D g\,dA$, $\iint_D cf\,dA = c\iint_D f\,dA$

**Additivity (splitting):** If $D = D_1\cup D_2$ with disjoint interiors, $\iint_D f = \iint_{D_1}f + \iint_{D_2}f$

**Area:** $A(D) = \iint_D 1\,dA$

**Monotonicity:** If $f\ge g$ on $D$, then $\iint_D f \ge \iint_D g$

**Absolute value:** $\left|\iint_D f\,dA\right| \le \iint_D |f|\,dA$

**Teacher Narration** `[74w]`
> These properties are direct extensions of the rectangular case. The additivity property is especially powerful: if your region is too complicated to describe as a single Type I or Type II, you can split it into simpler pieces, evaluate each, and add. Remember, the pieces should only meet at boundaries—no overlap, or you'll double count. This approach is essential for handling complex shapes in real-world applications like computing volumes or averages over irregular domains.

---

### Slide 8 · [CHALLENGE] 🔴 *[Challenge – Optional]* ⏸️ *[YouTube Pause]* *(skip if time-limited)*
**[Challenge – Optional] Reversing the Order of Integration**  ·  `split_left_right`

**On-screen text** `[10w]`
Reversing order can make impossible integrals possible. Sketch, redraw, swap.

**LEFT** `[steps]`

**Problem:** $\int_0^1 \int_y^1 \sin(x^2)\,dx\,dy$

**Why direct fails:** $\sin(x^2)$ has no elementary antiderivative in $x$.

**Solution:** Reverse order.

**Step 1:** Sketch region: $0\le y\le1$, $y\le x\le1$ → Type I: $0\le x\le1$, $0\le y\le x$

**Step 2:** $\int_0^1 \int_0^x \sin(x^2)\,dy\,dx = \int_0^1 x\sin(x^2)\,dx$

**Step 3:** Substitute $u=x^2$: $\frac12\int_0^1\sin u\,du = \frac12(1-\cos1)$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot region: triangle with vertices (0,0), (1,0), (1,1). Show a horizontal slice at y=0.5 (original order) and a vertical slice at x=0.7 (reversed order). Label which order works.

**Teacher Narration** `[83w]`
> This example is a classic. The integral looks innocent, but you cannot find an antiderivative for sine of x squared with respect to x. So we must reverse the order. By sketching the region, we see that the original limits describe a triangle. Describing it as Type I instead of Type II gives an inner integral in y, which is trivial, and the outer becomes x sine x squared, which yields to substitution. The moral: if one order is hard, try the other.

**Student Prompt:** Try to integrate $\sin(x^2)$ with respect to x. What happens? Now set up the reversed order and evaluate.

---

### Slide 9 · [PRACTICE] 🟡
**Example 3: [Edge Case] Region That Is Both Types**  ·  `split_left_right`

**On-screen text** `[12w]`
Triangle: both Type I and Type II. Use whichever gives simpler integrand.

**LEFT** `[steps]`

**Problem:** $\iint_D xy\,dA$, $D$ = triangle with vertices (0,0), (2,0), (0,1).

**Both orders work.**

**Type I:** $0\le x\le2$, $0\le y\le 1 - x/2$
   $\int_0^2 \int_0^{1-x/2} xy\,dy\,dx$

**Type II:** $0\le y\le1$, $0\le x\le 2(1-y)$
   $\int_0^1 \int_0^{2(1-y)} xy\,dx\,dy$

Both yield $\frac16$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Create two subplots. Left: Type I representation with vertical slice line at x=1, highlight y-interval [0,1-1/2]=[0,0.5]. Right: Type II representation with horizontal slice at y=0.5, highlight x-interval [0,2(1-0.5)]=[0,1].

**Teacher Narration** `[42w ⚠️ **TOO SHORT: 42w < 60w min**]`
> Some regions can be described both ways. Here the triangle is simple either way. When this happens, choose the order that makes the integral easier. If you're not sure, try both—they must give the same answer. This builds confidence in your setup.

**Student Prompt:** Set up the integral for this triangle using both orders. Which one looks simpler to you?

---

### Slide 10 · [PRACTICE] 🟡
**Example 4: [Application] Exponential Integrand**  ·  `split_left_right`

**On-screen text** `[12w]`
Application: integrate $e^{x^2}$ over a triangle. Type I order makes it possible.

**LEFT** `[steps]`

**Problem:** $\iint_D e^{x^2}\,dA$, $D$ bounded by $y=x$, $y=0$, $x=1$.

**Step 1:** Region: $0\le x\le1$, $0\le y\le x$ (Type I)

**Step 2:** $\int_0^1 \int_0^x e^{x^2}\,dy\,dx = \int_0^1 x e^{x^2}\,dx$

**Step 3:** $u=x^2 \Rightarrow \frac12\int_0^1 e^u\,du = \frac12(e-1)$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot region: triangle (0,0)-(1,0)-(1,1). Overlay a vertical slice at x=0.7. Add text showing the simplified integral after inner integration.

**Teacher Narration** `[60w]`
> This is a practical example: the function e to the x squared cannot be integrated directly with respect to x. But by integrating in y first, we get a simple factor of x that makes the outer integral solvable via substitution. This technique appears in probability when finding marginal distributions from joint densities, and in physics for moments of inertia.

**Student Prompt:** Why is Type I the natural choice here? Try Type II—what happens?

---

### Slide 11 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive Region Explorer**  ·  `split_left_right`

**On-screen text** `[11w]`
Toggle between slicing modes. See how limits change with slice position.

**LEFT** `[concept]`

Explore both Type I and Type II descriptions for the triangle from Example 3. Switch between vertical and horizontal slicing. Observe how the limits change.

**RIGHT** `[python_lab]`

*Visual Spec:* Triangle D: vertices (0,0), (2,0), (0,1). Two modes: Type I (vertical slice) with slider for x; Type II (horizontal slice) with slider for y. Radio button to switch modes. Show the current integration limits (as text) update dynamically. Highlight the active slice.

*Interactive Controls:*
  - 🎛 Radio buttons: Type I / Type II
  - 🎛 Slider for the position of the slice

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, RadioButtons

fig, ax = plt.subplots(figsize=(7,6))
plt.subplots_adjust(bottom=0.35, left=0.1, right=0.8)

# D triangle
y = np.linspace(0,1,200)
x_low = np.zeros_like(y)
x_high = 2*(1-y)
ax.fill_betweenx(y, x_low, x_high, alpha=0.3, color='gray', label='Region D')
ax.plot([0,2],[0,0],'k',lw=1)
ax.plot([0,0],[0,1],'k',lw=1)
ax.plot([0,2],[1,0],'b',lw=2, label='hypotenuse')
ax.set_xlim(-0.2,2.5)
ax.set_ylim(-0.2,1.2)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.grid(True)
ax.legend()

# Initial slice (Type I)
mode = 'Type I'
x0 = 1.0
slice_line, = ax.plot([x0, x0], [0, 1-x0/2], 'k--', lw=2)
text_limits = ax.text(0.5, -0.1, 'x in [0,2], y in [0,1-x/2]', transform=ax.transData, ha='center')

# Slider
ax_slider = plt.axes([0.25, 0.1, 0.5, 0.03])
slider = Slider(ax_slider, 't', 0.0, 1.0, valinit=0.5)

# Radio buttons
ax_radio = plt.axes([0.85, 0.4, 0.15, 0.2])
radio = RadioButtons(ax_radio, ('Type I', 'Type II'))

def update(val):
    t = slider.val
    if mode == 'Type I':
        x_val = 2*t  # map t to x in [0,2]
        y_low = 0
        y_high = 1 - x_val/2
        slice_line.set_data([x_val, x_val], [y_low, y_high])
        text_limits.set_text(f'x={x_val:.2f}, y in [{y_low:.2f},{y_high:.2f}]')
    else:
        y_val = t  # t in [0,1]
        x_low = 0
        x_high = 2*(1-y_val)
        slice_line.set_data([x_low, x_high], [y_val, y_val])
        text_limits.set_text(f'y={y_val:.2f}, x in [{x_low:.2f},{x_high:.2f}]')
    fig.canvas.draw_idle()

def set_mode(label):
    global mode
    mode = label
    update(slider.val)

radio.on_clicked(set_mode)
slider.on_changed(update)
update(0.5)

plt.show()
```

**Teacher Narration** `[50w ⚠️ **TOO SHORT: 50w < 60w min**]`
> Now you can explore the same region with both slicing strategies. Switch between Type I and Type II, and drag the slider to see how the limits of integration change. This hands-on experience will solidify your understanding of why we need both types and how to choose which to use.

**Student Prompt:** Switch to Type II mode. For y = 0.3, what are the x limits?

---

### Slide 12 · [PAUSE_AND_TRY]
**Quick Check MCQ 1**  ·  `split_left_right`

**On-screen text** `[9w]`
Select the correct Type I description of the region.

**LEFT** `[text]`

Which describes the region bounded by $y=x^2$ and $y=4$ as a Type I region?

A) $0\le x\le2$, $x^2\le y\le4$

B) $-2\le x\le2$, $x^2\le y\le4$

C) $0\le y\le4$, $-\sqrt{y}\le x\le\sqrt{y}$

D) $-2\le x\le2$, $0\le y\le x^2$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot y=x^2 from x=-2.5 to 2.5, and y=4 as a horizontal line. Fill region between them (from x=-2 to 2). Label intersection points. Add a vertical dashed line at x=1 to illustrate Type I.

**Teacher Narration** `[60w]`
> Take a moment to visualize the region. The parabola opens upward and meets the line y=4 at x equals minus two and plus two. For a Type I description, the outer integral runs between these constant x limits, and for each x, y goes from the lower boundary (the parabola) to the upper boundary (the line). Which choice matches that?

**Student Prompt:** Before clicking, sketch the region in your mind. Which choice gives the correct Type I limits?

---

### Slide 13 · [PAUSE_AND_TRY]
**Quick Check MCQ 2**  ·  `split_left_right`

**On-screen text** `[9w]`
Which statement about Type I integrals is always true?

**LEFT** `[text]`

When evaluating $\iint_D f\,dA$ over a Type I region, which is TRUE?

A) The outer integral always has variable limits

B) The inner integral limits are functions of the outer variable

C) The order of integration doesn't matter for any region

D) You must always integrate with respect to y first

**RIGHT** `[visual_spec]`

*Visual Spec:* Same region as before with labels 'a' and 'b' on x-axis, and 'y=g1(x)' and 'y=g2(x)' on the y boundaries. Emphasize that a and b are numbers.

**Teacher Narration** `[63w]`
> This tests your understanding of the structure. Remember: the outer integral's limits must be constants; the inner limits are functions of the outer variable. For a Type I region you integrate dy first, but that's not always the case—you can have Type II where dx comes first. Think about the definition. This distinction is crucial for correctly setting up integrals over general regions.

**Student Prompt:** Recall the definition of a Type I region. How are the limits structured?

---

### Slide 14 · [PAUSE_AND_TRY]
**Quick Check MCQ 3**  ·  `split_left_right`

**On-screen text** `[8w]`
Compute this iterated integral. Which answer is correct?

**LEFT** `[text]`

Evaluate $\int_0^1 \int_0^{x} (x+y)\,dy\,dx$

A) $\frac12$

B) $\frac23$

C) $\frac56$

D) $1$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the triangular region under y=x from x=0 to 1. Indicate that the inner integral is dy first. Emphasize that x is treated as constant in the inner integration.

**Teacher Narration** `[63w]`
> Work through this step by step: the inner integral treats x as constant. Integrate x plus y with respect to y from 0 to x. That gives x times y plus y squared over 2, evaluated at y equals x and 0. You get three x squared over 2. Then integrate that from 0 to 1. Check your calculation against the four options.

**Student Prompt:** Try the integral yourself. What is the inner integral first? Then integrate in x.

---

### Slide 15 · [SUMMARY]
**Summary & Key Takeaways**  ·  `full_width`

**On-screen text** `[10w]`
Summary: Region type determines integration order. Sketch, set limits, evaluate.

**FULL WIDTH** `[text]`

**Remember:**
- Type I: $\int_a^b \int_{g_1(x)}^{g_2(x)} f\,dy\,dx$
- Type II: $\int_c^d \int_{h_1(y)}^{h_2(y)} f\,dx\,dy$
- Always sketch the region first.
- Use properties to split complex regions.
- If one order leads to a dead end, try reversing.

**Teacher Narration** `[70w]`
> Today we learned how to handle double integrals over general regions. The key step is always to sketch the region and decide if it's Type I, Type II, or needs splitting. Then set up the iterated integral with the inner limits as functions of the outer variable. Remember the properties—especially additivity—and don't be afraid to reverse order when you hit a wall. Practice with the homework problems to build fluency.

---

### Slide 16 · [CORE] *(skip if time-limited)*
**Practice Problems (Homework)**  ·  `full_width`

**On-screen text** `[6w]`
Homework: three problems at increasing difficulty.

**FULL WIDTH** `[text]`

**Warm-up:** 1. $\iint_D (2x - y)\,dA$, $D$ bounded by $y=x^2$, $y=x^3$

**Standard:** 2. Area between $y=\sin x$, $y=\cos x$, $x=0$, $x=\pi/4$

**Challenge:** 3. $\iint_D e^{y^2}\,dA$, $D$ triangle bounded by $y=x$, $y=1$, $x=0$

**Teacher Narration** `[59w ⚠️ **TOO SHORT: 59w < 60w min**]`
> Here are additional problems to practice. The warm-up is similar to what we did. The standard problem asks for area, which means integrating 1. The challenge problem requires reversing the order of integration to handle e to the y squared. Good luck! These exercises will help you build confidence in setting up and evaluating double integrals over general regions.

---
