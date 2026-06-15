# Area Between Curves

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** Understand that the definite integral ∫_a^b f(x)dx gives the signed area between y=f(x) and the x-axis.

**Learning Objectives:**
- Calculate the area of a region bounded by two or more curves using definite integration
- Determine whether to integrate with respect to x or y for computational efficiency
- Set up integrals for regions bounded by curves that intersect at multiple points
- Analyze problems requiring splitting the region into multiple integrals
- Apply the area-between-curves technique to real-world geometric problems

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 65w)
⚠️ **Narration too short (<60w):** [8, 10]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 15 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s8:58w', 's10:48w']
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
| 1 | 🎛hook | 🟢 | ◧ |  | 79w | 9w | From Walls to Calculus |
| 2 | 🎛core | 🟢 | ◧ |  | 82w | 10w | Vertical Slices – Integrating with Respect to x |
| 3 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 64w | 15w | Try It – Warm-Up |
| 4 | 🎛practice | 🟢 | ◧ |  | 63w | 9w | Solution – Warm-Up Example |
| 5 | core | 🟢 | ◧ |  | 72w | 10w | Horizontal Slices – Integrating with Respect to y |
| 6 | practice | 🟢 | ◧ |  | 63w | 9w | Example 2 – Standard Problem |
| 7 | misconception | 🟢 | ◧ |  | 66w | 8w | Common Mistake – Forgetting to Split Regions |
| 8 | pause_and_try | 🟢 | ◧ | ⏸️ | 58w⚠️ | 14w | Try It – Crossing Curves |
| 9 | practice | 🟢 | ◧ |  | 62w | 7w | Solution – Crossing Curves Example |
| 10 | 🎛visual_lab | 🟢 | ◧ |  | 48w⚠️ | 9w | Interactive Lab – Vertical Slices Approximation |
| 11 | 🎛visual_lab | 🟢 | ◧ |  | 61w | 12w | Interactive Lab – Crossing Curves & Splitting |
| 12 | practice | 🟡 | ◧ |  | 60w | 13w | Example 3 – Edge Case (Integrate w.r.t. y) |
| 13 | practice | 🟡 | ◧ |  | 61w | 7w | Example 4 – Application (Park Area) |
| 14 | challenge | 🔴 | ⬛⬛ |  | 67w | 11w | [Challenge – Optional] Proof of the Area Formula |
| 15 | summary | 🟢 | ⬛⬛ |  | 69w | 9w | Summary – Area Between Curves |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**From Walls to Calculus**  ·  `split_left_right`

**On-screen text** `[9w]`
Area between curves = ∫ (top – bottom) dx

**LEFT** `[text]`

Imagine painting a room with a wavy ceiling and a wavy floor. The paint covers the wall between them—not the ceiling, not the floor. The amount you need is the **difference** between the two curves at every point, summed up. This is exactly how we find the area between two curves: take the top function minus the bottom function, integrate over the region.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two wavy curves (ceiling and floor) with vertical hatching between them, labeled 'wall area = top – bottom'. Axes: x (horizontal), y (vertical). Color: ceiling blue, floor green, wall area light yellow. No interactive controls.

*Interactive Controls:*
  - 🎛 Button: reveal next step

**Teacher Narration** `[79w]`
> Think of a room where the ceiling is one curve and the floor is another. When you paint the wall, you don't paint the ceiling area or the floor area – you paint only the space between them. At each horizontal position, the height of the wall is the vertical distance from floor to ceiling. The definite integral lets us add up all those tiny vertical strips to get the total area. That’s the core idea we’ll explore today.

---

### Slide 2 · [CORE] 🎛 *[1 controls]*
**Vertical Slices – Integrating with Respect to x**  ·  `split_left_right`

**On-screen text** `[10w]`
Vertical slices: height = top – bottom, width = dx

**LEFT** `[formula_block]`

$$A = \int_a^b \left[ f_{\text{top}}(x) - f_{\text{bottom}}(x) \right] \, dx$$

- $f_{\text{top}}(x)$: upper curve
- $f_{\text{bottom}}(x)$: lower curve
- $a,b$: left and right intersection points (or given bounds)

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of two curves: f(x)=x (top, blue) and g(x)=x^2 (bottom, red) on [0,1]. Shade region between them. Show a single vertical slice at x=0.6 with an arrow indicating height = f(x)-g(x). Label axes x,y. Add legend. No interactive controls.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50

**Teacher Narration** `[82w]`
> For vertical slices, we think of the region as being built from thin vertical rectangles. At each x, the rectangle's height is the difference between the top function and the bottom function. We multiply that height by a tiny width dx, and then integrate from the leftmost boundary to the rightmost one. The result is the exact area. This approach works well when the region is easily described as a function of x, and the boundaries are vertical lines or intersection points.

---

### Slide 3 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Try It – Warm-Up**  ·  `split_left_right`

**On-screen text** `[15w]`
Pause – set up the area integral for y=x and y=x^2 from 0 to 1

**LEFT** `[text]`

**Problem:** Find the area between $y = x^2$ and $y = x$ from $x=0$ to $x=1$.

1. Which function is on top?
2. Set up the integral.
3. Evaluate it.

Pause the video and try this yourself before we solve it.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of y=x (blue, solid) and y=x^2 (red, dashed) on [0,1] with no shading. Axes: x from 0 to 1, y from 0 to 1. Label curves. No interactive controls.

*Interactive Controls:*
  - 🎛 Button: reveal next step

**Teacher Narration** `[64w]`
> Here's a simple pair of curves. Take a moment to identify which one is above the other on the interval from 0 to 1. Then write down the integral that gives the area between them. Once you have it, evaluate it. Pause the video now, and when you're ready, continue to see the solution. This warm-up will build your confidence for more complex problems.

**Student Prompt:** Set up and evaluate the integral for the area between y=x^2 and y=x from 0 to 1.

---

### Slide 4 · [PRACTICE] 🎛 *[1 controls]*
**Solution – Warm-Up Example**  ·  `split_left_right`

**On-screen text** `[9w]`
A = ∫_0^1 (x – x^2) dx = 1/6

**LEFT** `[steps]`

1. On $[0,1]$, $x \geq x^2$ → top = $x$, bottom = $x^2$.
2. $A = \int_0^1 (x - x^2)\,dx$
3. $\left[\frac{x^2}{2} - \frac{x^3}{3}\right]_0^1$
4. $\frac{1}{2} - \frac{1}{3} = \frac{1}{6}$

Area = $\frac{1}{6}$ square units.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of y=x (blue) and y=x^2 (red) on [0,1]. Shade region between them in green. Add text annotation: 'Area = 1/6' at (0.5,0.3). Axes x,y. Legend. No interactive controls.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50

**Teacher Narration** `[63w]`
> Since the line y=x is above the parabola on this interval, we subtract the lower function from the upper function. The integral is straightforward. The antiderivative comes from the power rule, and evaluating from 0 to 1 gives exactly one sixth. That's the total area between these two curves on the interval. Notice how the definite integral efficiently sums all the vertical slices.

---

### Slide 5 · [CORE]
**Horizontal Slices – Integrating with Respect to y**  ·  `split_left_right`

**On-screen text** `[10w]`
Horizontal slices: width = right – left, height = dy

**LEFT** `[formula_block]`

$$A = \int_c^d \left[ g_{\text{right}}(y) - g_{\text{left}}(y) \right] \, dy$$

- $g_{\text{right}}(y)$: curve on the right
- $g_{\text{left}}(y)$: curve on the left
- $c,d$: lower and upper y-values of intersection

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of two curves that are functions of y: x = y^2 (left) and x = y+2 (right) on y ∈ [-1,2]. Shade region between them. Show a horizontal slice at a specific y, with arrow indicating width = (right – left). Axes x,y. Legend. No interactive controls.

**Teacher Narration** `[72w]`
> Sometimes it's easier to describe the curves as functions of y. In that case, we slice horizontally instead of vertically. The height of each slice is dy, and the width is the distance between the rightmost curve and the leftmost curve. We integrate from the bottom y-coordinate to the top y-coordinate. This method is especially useful when the region is bounded by curves that are easier to express as x = g(y).

---

### Slide 6 · [PRACTICE]
**Example 2 – Standard Problem**  ·  `split_left_right`

**On-screen text** `[9w]`
A = ∫_0^1 (2x – 2x^2) dx = 1/3

**LEFT** `[steps]`

**Find area enclosed by $y = x^2$ and $y = 2x - x^2$.**

1. Intersections: $x^2 = 2x - x^2 \Rightarrow 2x^2 - 2x = 0 \Rightarrow x=0,1$.
2. Test $x=0.5$: $x^2=0.25$, $2x-x^2=0.75$ → top = $2x-x^2$.
3. $A = \int_0^1 [(2x-x^2) - x^2]\,dx = \int_0^1 (2x-2x^2)\,dx$
4. $\left[x^2 - \frac{2x^3}{3}\right]_0^1 = 1 - \frac{2}{3} = \frac{1}{3}$

Area = $\frac{1}{3}$ sq units.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot both parabolas on [0,1]. Shade region between them. Label curves. Add text 'Area = 1/3' at (0.5,0.4). Axes x,y. Legend. No interactive controls.

**Teacher Narration** `[63w]`
> First we find where the curves intersect by setting them equal. That gives x=0 and x=1. Then we test a point in between to decide which curve is on top. Here the downward-opening parabola is above the upward-opening one. We set up the integral, integrate term by term, and evaluate to get one third. This problem reinforces the standard procedure for vertical slices.

---

### Slide 7 · [MISCONCEPTION]
**Common Mistake – Forgetting to Split Regions**  ·  `split_left_right`

**On-screen text** `[8w]`
Must split integrals where the top/bottom relationship changes

**LEFT** `[text]`

**Wrong approach:** For curves that cross, some students write $\int |f-g|\,dx$ without splitting. But if the top curve changes, a single integral of (top–bottom) will **fail** because you use the wrong ordering in parts of the interval.

**Correct:** Always split the integral at each intersection point.

Example: $y=\sin x$ and $y=\cos x$ on $[0,\pi]$ cross at $x=\pi/4$. The top curve switches.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two subplots side by side. Left: wrong approach – shading uses same function order (e.g., sin – cos) over entire [0,π], leading to negative area in [π/4,π] (shown as red hatching). Right: correct approach – split at π/4, shading in green with clear top/bottom labels. Axes x,y. Legend. No interactive controls.

**Teacher Narration** `[66w]`
> A very common error for exams: when two curves cross, you cannot just integrate top minus bottom from start to end. At the crossing, the top and bottom swap. If you don't split the integral, the parts after the crossing will give negative area, which cancels the positive area and produces a wrong result. Always find all intersection points and break the integral into separate pieces.

**Student Prompt:** Why does the simple integral (top – bottom) fail if curves cross inside the region?

---

### Slide 8 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Try It – Crossing Curves**  ·  `split_left_right`

**On-screen text** `[14w]`
Pause – set up area integrals for sin x and cos x on [0,π]

**LEFT** `[text]`

**Problem:** Find the area between $y = \sin x$ and $y = \cos x$ on $[0, \pi]$.

1. Where do they intersect?
2. How many subintervals do you need?
3. Set up the integrals.

Pause and try before seeing the solution.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of sin(x) (blue) and cos(x) (red) on [0,π]. Mark intersection point at (π/4, √2/2) with a dot. No shading. Axes x,y. Legend.

**Teacher Narration** `[58w ⚠️ **TOO SHORT: 58w < 60w min**]`
> This is a classic problem where the curves cross. Look at the graph: identify where sin and cos intersect on the interval. Then decide how many separate integrals you need. Write down the expression for the total area. Pause now and work through it, then we'll check the answer together. This will help you master the splitting technique.

**Student Prompt:** Set up the area integral(s) for y=sin x and y=cos x from 0 to π.

---

### Slide 9 · [PRACTICE]
**Solution – Crossing Curves Example**  ·  `split_left_right`

**On-screen text** `[7w]`
A = 2√2 ≈ 2.828 square units

**LEFT** `[steps]`

1. Intersection: $\sin x = \cos x \Rightarrow x=\pi/4$.
2. On $[0,\pi/4]$: $\cos x \geq \sin x$ → top=cos, bottom=sin.
   On $[\pi/4,\pi]$: $\sin x \geq \cos x$ → top=sin, bottom=cos.
3. $A = \int_0^{\pi/4} (\cos x - \sin x)\,dx + \int_{\pi/4}^{\pi} (\sin x - \cos x)\,dx$
4. Evaluate: $[\sin x+\cos x]_0^{\pi/4} + [-\cos x-\sin x]_{\pi/4}^{\pi}$
   = $(\sqrt{2}-1)+(1+\sqrt{2}) = 2\sqrt{2}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of sin and cos on [0,π]. Shade region between them using two different colors for the two subintervals. Label each integral. Mark intersection with dashed vertical line. Axes x,y. Legend. No interactive controls.

**Teacher Narration** `[62w]`
> We split at the intersection point π/4. On the first part, cosine is above sine; on the second part, sine is above cosine. After integrating and carefully applying the antiderivatives, the total area comes out to 2√2, which is roughly 2.828 square units. Notice how the absolute value approach would give the same result here, but splitting is safer and more intuitive.

---

### Slide 10 · [VISUAL_LAB] 🎛 *[1 controls]*
**Interactive Lab – Vertical Slices Approximation**  ·  `split_left_right`

**On-screen text** `[9w]`
Riemann sum approximation – drag slider to see convergence

**LEFT** `[text]`

Explore how Riemann sums approximate the area between $y=x$ and $y=x^2$ on $[0,1]$. The slider controls the number of vertical rectangles. Observe the convergence to the exact area $1/6$.

**RIGHT** `[python_lab]`

*Visual Spec:* Interactive plot with slider 'Number of rectangles' ranging from 1 to 50. Display the region shaded, each rectangle drawn. Show numerical approximation and exact value (1/6) for comparison. Use matplotlib and matplotlib.widgets.Slider.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(8,5))
plt.subplots_adjust(bottom=0.2)

x_vals = np.linspace(0,1,400)
f_vals = x_vals
g_vals = x_vals**2
exact = 1/6

def update(n):
    ax.clear()
    ax.plot(x_vals, f_vals, 'b', label='y=x')
    ax.plot(x_vals, g_vals, 'r', label='y=x^2')
    dx = 1/n
    approx = 0
    for i in range(n):
        x_left = i*dx
        height = (x_left - x_left**2)
        approx += height*dx
        ax.bar(x_left, height, width=dx, align='edge', alpha=0.3, color='green')
    ax.set_xlim(0,1)
    ax.set_ylim(0,1)
    ax.set_title(f'Approx = {approx:.4f}, Exact = {exact:.4f}')
    ax.legend()
    ax.set_xlabel('x')
    ax.set_ylabel('y')

ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_slider, 'n', 1, 50, valinit=5, valstep=1)
slider.on_changed(update)
update(5)
plt.show()
```

**Teacher Narration** `[48w ⚠️ **TOO SHORT: 48w < 60w min**]`
> This interactive tool shows how we can approximate the area using rectangles. As you increase the number of rectangles, the approximation gets closer to the exact area of one sixth. Notice that the error decreases as the rectangles become thinner. This is the foundation of the definite integral.

**Student Prompt:** Slide the slider from 1 to 50. How does the approximation change? How many rectangles are needed to get within 0.01 of the exact area?

---

### Slide 11 · [VISUAL_LAB] 🎛 *[1 controls]*
**Interactive Lab – Crossing Curves & Splitting**  ·  `split_left_right`

**On-screen text** `[12w]`
Toggle between wrong and correct approach – notice the red negative area

**LEFT** `[text]`

See the effect of splitting the integral for $y=\sin x$ and $y=\cos x$ on $[0,\pi]$. Toggle between a single (incorrect) integral and the correct split integral.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot of sin and cos. Two radio buttons: 'Wrong: single integral (top minus bottom)' and 'Correct: split at π/4'. When wrong selected, shade region using same function order everywhere (show negative area in red). When correct selected, shade with proper split in green. Display computed area.

*Interactive Controls:*
  - 🎛 Radio: Wrong / Correct

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import RadioButtons

fig, ax = plt.subplots(figsize=(8,5))
plt.subplots_adjust(bottom=0.2)

x_vals = np.linspace(0, np.pi, 400)
sin_vals = np.sin(x_vals)
cos_vals = np.cos(x_vals)
ix = np.pi/4

def draw(mode):
    ax.clear()
    ax.plot(x_vals, sin_vals, 'b', label='sin x')
    ax.plot(x_vals, cos_vals, 'r', label='cos x')
    ax.axvline(ix, color='gray', linestyle='--')
    ax.set_xlim(0, np.pi)
    ax.set_ylim(-1.2, 1.2)
    ax.legend()
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    if mode == 'Wrong':
        # Wrong: use sin - cos everywhere => negative after π/4
        mask = np.where(sin_vals >= cos_vals, cos_vals, sin_vals)  # not used, just for example
        # Actually we want to show wrong shading: Fill between using sin - cos but clipped?
        # Simpler: fill between curves but use same order
        ax.fill_between(x_vals, cos_vals, sin_vals, where=(sin_vals >= cos_vals), color='green', alpha=0.3, label='positive area')
        ax.fill_between(x_vals, cos_vals, sin_vals, where=(sin_vals < cos_vals), color='red', alpha=0.3, label='negative area')
        ax.set_title('Wrong: single integral (gives net area)')
    else:
        # Correct split
        mid = int(np.where(x_vals >= ix)[0][0])
        ax.fill_between(x_vals[:mid], cos_vals[:mid], sin_vals[:mid], color='green', alpha=0.3, label='area part 1')
        ax.fill_between(x_vals[mid-1:], sin_vals[mid-1:], cos_vals[mid-1:], color='orange', alpha=0.3, label='area part 2')
        ax.set_title('Correct: split at π/4')

rax = plt.axes([0.7, 0.05, 0.25, 0.15])
radio = RadioButtons(rax, ('Wrong', 'Correct'))
radio.on_clicked(draw)
draw('Wrong')
plt.show()
```

**Teacher Narration** `[61w]`
> Here you can see why splitting is necessary. When we choose the wrong approach, the region after the intersection gets shaded in red because the integral treats that part as negative area. The total net signed area is very different from the true geometric area. Switching to the correct split shows how the two parts combine to give the right area.

**Student Prompt:** Toggle to 'Wrong' – what happens to the computed area? Why does the integral give a smaller value?

---

### Slide 12 · [PRACTICE] 🟡
**Example 3 – Edge Case (Integrate w.r.t. y)**  ·  `split_left_right`

**On-screen text** `[13w]`
A = ∫_{-1}^{2} (y+2 – y^2) dy = 9/2 = 4.5 square units

**LEFT** `[steps]`

**Find area between $x = y^2$ and $x = y+2$.**

1. Curves are functions of $y$ → integrate w.r.t. $y$.
2. Intersection: $y^2 = y+2 \Rightarrow y=-1,2$.
3. Right curve: $x=y+2$; Left curve: $x=y^2$.
4. $A = \int_{-1}^2 [(y+2) - y^2]\,dy$
5. $\left[\frac{y^2}{2}+2y-\frac{y^3}{3}\right]_{-1}^2 = \frac{9}{2}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of x=y^2 (left) and x=y+2 (right) on y ∈ [-1,2]. Shade area between them. Add horizontal slice example. Axes x,y. Label curves. No interactive controls.

**Teacher Narration** `[60w]`
> When the given equations are solved for x in terms of y, it's natural to integrate with respect to y. The right curve minus the left curve gives the width of each horizontal slice. The bounds come from the y-values of the intersection points. This is much cleaner than rewriting as functions of x, which would require two separate curves.

---

### Slide 13 · [PRACTICE] 🟡
**Example 4 – Application (Park Area)**  ·  `split_left_right`

**On-screen text** `[7w]`
A = 72 square units (using symmetry)

**LEFT** `[steps]`

**A park is bounded by $y=12-x^2$ and $y=x^2-6$.**

1. Intersections: $12-x^2 = x^2-6 \Rightarrow x=\pm3$.
2. Top: $12-x^2$, Bottom: $x^2-6$.
3. $A = \int_{-3}^3 [(12-x^2)-(x^2-6)]\,dx = \int_{-3}^3 (18-2x^2)\,dx$
4. Symmetry: $A=2\int_0^3 (18-2x^2)\,dx$
5. $2[18x - \frac{2x^3}{3}]_0^3 = 2[54-18] = 72$.

Area = 72 square units.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of two parabolas on [-4,4]. Shade region between them. Label curves. Mark intersection points at x=-3 and x=3. Axes x,y. Legend. No interactive controls.

**Teacher Narration** `[61w]`
> This example shows an application to a real geometric shape – a park. The region is symmetric about the y-axis, so we can double the integral from 0 to 3 instead of negative to positive. That simplifies the arithmetic. Always look for symmetry to reduce work. The final area is 72 square units. This technique is especially useful for symmetric regions.

---

### Slide 14 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof of the Area Formula**  ·  `full_width`

**On-screen text** `[11w]`
Area = ∫ upper – lower follows from Riemann sum definition

**FULL WIDTH** `[concept]`

**Theorem:** If $f$ and $g$ are continuous on $[a,b]$ with $f(x) \geq g(x)$ for all $x \in [a,b]$, then the area of the region bounded by $y=f(x)$, $y=g(x)$, $x=a$, and $x=b$ is $A = \int_a^b [f(x)-g(x)]\,dx$.

**Proof sketch:**
1. Partition $[a,b]$ into $n$ subintervals of width $\Delta x = (b-a)/n$.
2. On the $i$th subinterval, choose sample point $x_i^*$.
3. Height of rectangle = $f(x_i^*) - g(x_i^*)$, area = $[f(x_i^*) - g(x_i^*)]\Delta x$.
4. Total approximate area = $\sum_{i=1}^n [f(x_i^*) - g(x_i^*)]\Delta x$.
5. Take limit $n\to\infty$: $A = \lim_{n\to\infty}\sum [f-g]\Delta x = \int_a^b [f(x)-g(x)]\,dx$.

**Teacher Narration** `[67w]`
> For those interested in a more rigorous justification, we can derive the formula from the definition of the definite integral. We approximate the region with thin rectangles whose height is the difference between the functions, then let the width approach zero. The Riemann sum becomes the integral we use. This solidifies why the formula works. The key condition is that f and g are continuous on [a,b].

---

### Slide 15 · [SUMMARY]
**Summary – Area Between Curves**  ·  `full_width`

**On-screen text** `[9w]`
Two formulas, multiple strategies – practice to build intuition

**FULL WIDTH** `[text]`

**Key formulas:**
- Vertical slices: $A = \int_a^b (f_{\text{top}} - f_{\text{bottom}})\,dx$
- Horizontal slices: $A = \int_c^d (g_{\text{right}} - g_{\text{left}})\,dy$
- Multiple regions: split integrals at intersection points.

**Strategies:**
- Always find intersection points first.
- Test which function is on top.
- Look for symmetry to simplify.
- Choose the integration variable that makes algebra easiest.

**Teacher Narration** `[69w]`
> Today we've seen that finding the area between curves is essentially a subtraction problem: top minus bottom for vertical slices, or right minus left for horizontal slices. The key steps are identifying intersection points, determining which curve is on top, and splitting the integral if necessary. Don't forget the option to integrate with respect to y when that simplifies the equations. Practice with the provided examples to build confidence.

---
