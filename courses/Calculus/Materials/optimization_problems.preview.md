# Optimization Problems: From Word Problems to Calculus Solutions

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should be comfortable with derivatives, critical points, and the Closed Interval Method for absolute extrema on closed intervals.

**Learning Objectives:**
- Formulate real-world word problems as mathematical optimization problems by identifying objective functions and constraints
- Apply the six-step problem-solving framework to convert word problems into single-variable functions
- Analyze functions to find absolute maximum and minimum values using critical points and domain analysis
- Interpret optimization results in the context of the original problem, including appropriate units
- Construct constraint equations from geometric or physical relationships to reduce multivariable problems to single-variable functions

---

## v3.1 Production Readiness

✅ **Interactive moments:** 5 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 92w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
⚠️ **visual_labs**: 0 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 5 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ |  | 86w | 15w | Why Optimization Matters |
| 2 | core | 🟢 | ⬛⬛ |  | 97w | 16w | The Six-Step Framework |
| 3 | core | 🟢 | ◧ |  | 99w | 14w | Core Equations & Notation |
| 4 | core | 🟢 | ◧ |  | 90w | 15w | First Derivative Test for Open Intervals |
| 5 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 75w | 13w | Pause: Try the Farmer Problem |
| 6 | practice | 🟢 | ⬛⬛ |  | 103w | 9w | Farmer Problem Solution |
| 7 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 84w | 21w | Pause: Box with Square Base |
| 8 | practice | 🟢 | ⬛⬛ |  | 81w | 12w | Box Problem Solution |
| 9 | misconception | 🟢 | ◧ |  | 84w | 14w | Common Mistake: Wrong Side Count |
| 10 | 🎛practice | 🟡 | ◧ |  | 108w | 20w | Tricky Example: Box with Different Material Costs |
| 11 | practice | 🟡 | ◧ |  | 96w | 11w | Edge Case: Point on a Line Closest to Origin |
| 12 | 🎛practice | 🟡 | ◧ |  | 107w | 23w | Application: Lifeguard Problem (Snell's Law) |
| 13 | challenge | 🔴 | ⬛⬛ |  | 91w | 20w | [Challenge – Optional] Proof of the First Derivative Test for Absolute Extrema |
| 14 | summary | 🟢 | ⬛⬛ |  | 87w | 11w | Summary: Optimization Problem-Solving |

---

### Slide 1 · [HOOK] 🎛 *[2 controls]*
**Why Optimization Matters**  ·  `split_left_right`

**On-screen text** `[15w]`
Optimization turns real-life constraints into math problems. Explore how changing one variable affects the outcome.

**LEFT** `[text]`

Everyday decisions: Maximize area with limited fencing. Minimize cost for a fixed volume. Find fastest travel path. These are **optimization problems**.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a rectangle with one side along a river (top side no fence). Show width x and length y. As user moves a slider (width from 0 to 1200), the rectangle updates and the area is displayed as a number. Also show a small dot on the area vs width curve. Label axes: Width (ft), Area (sq ft). Use matplotlib with interactivity (ipywidgets Slider).

*Interactive Controls:*
  - 🎛 Slider for width from 1 to 1199 in steps of 10
  - 🎛 Display of computed area and rectangle shape

```python
import numpy as np
import matplotlib.pyplot as plt
from ipywidgets import interactive, FloatSlider
import ipywidgets as widgets

def update_plot(width):
    plt.clf()
    # Rectangle coordinates
    x_rect = [0, width, width, 0, 0]
    y_rect = [0, 0, 2400-2*width, 2400-2*width, 0]
    plt.figure(figsize=(6,4))
    plt.plot(x_rect, y_rect, 'b-', linewidth=2)
    plt.fill(x_rect, y_rect, alpha=0.3, color='skyblue')
    plt.plot([0, 2400], [0,0], 'k--', label='river')  # river line
    plt.xlim(0,1300)
    plt.ylim(0,2500)
    plt.xlabel('Width (ft)')
    plt.ylabel('Length (ft)')
    area = width*(2400-2*width)
    plt.title(f'Width = {width:.1f} ft, Area = {area:.0f} sq ft')
    plt.legend()
    plt.gca().set_aspect('equal')
    plt.show()

width_slider = FloatSlider(min=1, max=1199, step=10, value=600, description='Width')
interactive(update_plot, width=width_slider)
```

**Teacher Narration** `[86w]`
> Imagine you have 2400 feet of fencing and want to make a rectangular pen next to a river. You don't need fence along the river. How do you choose the width and length to get the biggest area? That's an optimization problem. The secret is to write down what you want to maximize—area—and the constraint—the fixed amount of fencing. Then you use calculus to find the best dimensions. This kind of problem appears everywhere: business, engineering, even medicine. Let's learn a systematic way to solve them.

**Student Prompt:** Predict: What do you think is the optimal width for the pen?

---

### Slide 2 · [CORE]
**The Six-Step Framework**  ·  `full_width`

**On-screen text** `[16w]`
Six steps: 1) Understand  2) Diagram  3) Notation  4) Objective  5) Constraint  6) Reduce & Solve

**FULL WIDTH** `[steps]`

| Step | Action | Key Question |
|------|--------|--------------|
| 1 | Understand the Problem | What is unknown? What is given? |
| 2 | Draw a Diagram | Label all quantities |
| 3 | Introduce Notation | Assign symbols to all quantities |
| 4 | Write the Objective Function | Expression for quantity to optimize |
| 5 | Write the Constraint Equation | Fixed relationship among variables |
| 6 | Reduce to One Variable & Solve | Use constraint to eliminate variables, then find critical points |

**Teacher Narration** `[97w]`
> There's no magic formula for optimization, but there is a universal process. The hardest part is not the calculus—it's translating English into math. Step one: read the problem until you really understand it. Step two: draw a picture. Step three: give every quantity a symbol. Step four: write what you want to maximize or minimize as a function of those symbols. Step five: capture any fixed relationship in a constraint equation. Step six: use the constraint to eliminate all but one variable, then use single-variable calculus to find the optimum. Let's apply this to a concrete example.

---

### Slide 3 · [CORE]
**Core Equations & Notation**  ·  `split_left_right`

**On-screen text** `[14w]`
Objective function after reduction: Q = f(x). Constraint: relationship among variables. Critical points: f'(x)=0.

**LEFT** `[formula_block]`

**Objective Function (after reduction):**

$$ Q = f(x) $$

where $Q$ is the quantity to optimize, $x$ is the independent variable.

**Constraint Equation:**

$$ g(x_1, x_2, ..., x_n) = \text{constant} $$

**Critical Point Condition:**

$$ f'(x) = 0 \quad \text{or} \quad f'(x) \text{ DNE}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* A simple flowchart diagram: Start box 'Word Problem' -> arrow to 'Objective function Q' and 'Constraint equation' -> arrow to 'Use constraint to eliminate extra variables' -> arrow to 'Q = f(x)' -> arrow to 'Set f'(x)=0' -> arrow to 'Critical points' -> arrow to 'Check endpoints/domain' -> arrow to 'Answer'.

```python
import matplotlib.pyplot as plt
import matplotlib.patches as patches
fig, ax = plt.subplots(figsize=(8,4))
ax.set_xlim(0,10)
ax.set_ylim(0,6)
ax.axis('off')
# Boxes
boxes = [(0.5,4.5,'Word
Problem'), (3,4.5,'Objective
Q'), (3,2.5,'Constraint
equation'), (6,3.5,'Eliminate
variables'), (8,3.5,'f(x)'), (8,1.5,'f\'(x)=0'), (8,0,'Critical
points'), (5,0,'Check domain
& interpret')]
for x,y,text in boxes:
    ax.add_patch(patches.FancyBboxPatch((x,y), 1.5,1, boxstyle="round,pad=0.1", facecolor='lightblue', edgecolor='black'))
    ax.text(x+0.75, y+0.5, text, ha='center', va='center', fontsize=8)
# Arrows
ax.annotate('', xy=(2,5), xytext=(3.3,5), arrowprops=dict(arrowstyle='->'))
ax.annotate('', xy=(3,3), xytext=(3.3,4.5), arrowprops=dict(arrowstyle='->'))
ax.annotate('', xy=(4.5,3.5), xytext=(6,3.5), arrowprops=dict(arrowstyle='->'))
ax.annotate('', xy=(7.5,3.5), xytext=(8,3.5), arrowprops=dict(arrowstyle='->'))
ax.annotate('', xy=(8,3), xytext=(8,2), arrowprops=dict(arrowstyle='->'))
ax.annotate('', xy=(8,1), xytext=(8,0.5), arrowprops=dict(arrowstyle='->'))
ax.annotate('', xy=(6.5,0.5), xytext=(5.5,0.5), arrowprops=dict(arrowstyle='->'))
plt.show()
```

**Teacher Narration** `[99w]`
> Regardless of the problem, the structure is always the same. You define a symbol for the quantity you want to maximize or minimize, let's call it Q. Then you express Q in terms of several variables, but a constraint equation ties those variables together. You use that constraint to rewrite Q as a function of just one variable. Then you find the derivative, set it equal to zero, and solve. That gives you the critical points, which are the candidates for the optimum. But you also have to check the domain—the problem might restrict the range of acceptable values.

---

### Slide 4 · [CORE]
**First Derivative Test for Open Intervals**  ·  `split_left_right`

**On-screen text** `[15w]`
Single critical point on open interval: check sign change of derivative to confirm absolute extremum.

**LEFT** `[formula_block]`

**Theorem:** If $f$ is continuous and differentiable on $(a,\infty)$ (except possibly at $c$) and has exactly one critical point $c$, then:

- If $f'(x) < 0$ for $x < c$ and $f'(x) > 0$ for $x > c$ → $f(c)$ is absolute minimum.
- If $f'(x) > 0$ for $x < c$ and $f'(x) < 0$ for $x > c$ → $f(c)$ is absolute maximum.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two subplots: left shows a parabola opening up (minimum at c), right shows parabola opening down (maximum at c). On each, label critical point c, and along x-axis mark intervals with + or - signs indicating sign of f'(x). Also write 'abs min' or 'abs max' near the point.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2, 2, 400)
fig, (ax1, ax2) = plt.subplots(1,2,figsize=(8,4))
# left: minimum at 0
fmin = (x-0)**2 + 1
ax1.plot(x, fmin, 'b')
ax1.scatter([0], [1], color='red', zorder=5)
ax1.text(0, 1.5, 'c', ha='center')
ax1.set_title('Absolute minimum')
ax1.axhline(0, color='gray', linewidth=0.5)
ax1.text(-1, 0.5, '-', fontsize=16)
ax1.text(1, 0.5, '+', fontsize=16)
ax1.set_xlabel('x')
ax1.set_ylabel('f(x)')
# right: maximum at 0
fmax = -(x-0)**2 + 3
ax2.plot(x, fmax, 'b')
ax2.scatter([0], [3], color='red', zorder=5)
ax2.text(0, 3.5, 'c', ha='center')
ax2.set_title('Absolute maximum')
ax2.axhline(0, color='gray', linewidth=0.5)
ax2.text(-1, 2.5, '+', fontsize=16)
ax2.text(1, 2.5, '-', fontsize=16)
ax2.set_xlabel('x')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[90w]`
> Many optimization problems have domains like x greater than zero, which are open intervals. The Closed Interval Method doesn't apply directly. But if the function has only one critical point on that interval, you can use the first derivative test. If the derivative goes from negative to positive at that point, it's an absolute minimum. If it goes from positive to negative, it's an absolute maximum. This works because the function is monotonic on each side of the critical point, so the critical point has to be the global extremum.

---

### Slide 5 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Pause: Try the Farmer Problem**  ·  `split_left_right`

**On-screen text** `[13w]`
Pause: Apply the six steps to the farmer problem. Write down your answer.

**LEFT** `[text]`

**Problem:** A farmer has 2400 ft of fencing to enclose a rectangular field bordering a river (no fence on river side). Find the dimensions that maximize the area.

- Step 1: Understand
- Step 2: Draw
- Step 3: Notation
- Step 4: Objective
- Step 5: Constraint
- Step 6: Reduce and solve

**RIGHT** `[visual_spec]`

*Visual Spec:* Same interactive plot as slide 1 but without showing the solution. Only rectangle and river. Slider for width, but area is not precomputed – just visual. Or show area as they slide but no answer display. Better to leave area blank for prediction. We'll show the rectangle but not compute area. Add a button to reveal answer after pause.

*Interactive Controls:*
  - 🎛 Slider for width
  - 🎛 Button: 'Reveal optimal dimensions' (triggers overlay text)

```python
import numpy as np
import matplotlib.pyplot as plt
from ipywidgets import interactive, FloatSlider, Button, Output
import ipywidgets as widgets

out = Output()
def draw(width):
    plt.clf()
    x = [0, width, width, 0, 0]
    y = [0, 0, 2400-2*width, 2400-2*width, 0]
    plt.figure(figsize=(6,4))
    plt.plot(x, y, 'b-', linewidth=2)
    plt.plot([0, 2400], [0,0], 'k--', label='river')
    plt.xlim(0,1300)
    plt.ylim(0,2500)
    plt.xlabel('Width (ft)')
    plt.ylabel('Length (ft)')
    plt.title(f'Width = {width:.0f}')
    plt.gca().set_aspect('equal')
    plt.show()

width_slider = FloatSlider(min=1, max=1199, step=10, value=600, description='Width')
interactive(draw, width=width_slider)
```

**Teacher Narration** `[75w]`
> Now it's your turn. Take a minute and try to solve the farmer problem on your own. Use the six-step framework. Draw a diagram, label the width and length, write the objective function for area, write the constraint for fencing, then reduce to one variable and find the critical point. When you're ready, I'll show the solution on the next slide. Don't worry if you get stuck — we'll go through it step by step.

**Student Prompt:** What width and length maximize the area?

---

### Slide 6 · [PRACTICE]
**Farmer Problem Solution**  ·  `full_width`

**On-screen text** `[9w]`
Optimal: width=600 ft, length=1200 ft, max area=720,000 sq ft.

**FULL WIDTH** `[text]`

| Step | Action | Result |
|------|--------|--------|
| 1 | Understand | Maximize area with fixed fencing |
| 2 | Draw | Rectangle with river as one side |
| 3 | Notation | Width = $x$, Length = $y$ |
| 4 | Objective | $A = x \cdot y$ |
| 5 | Constraint | $2x + y = 2400$ |
| 6 | Reduce & Solve | $A(x)=x(2400-2x)=2400x-2x^2$, $A'(x)=2400-4x=0 \Rightarrow x=600$, $y=2400-1200=1200$, $A=720000$ sq ft |

**Teacher Narration** `[103w]`
> Here's the full solution. After steps 1 through 5, we have area A equals x times y, and the constraint is 2x plus y equals 2400 feet of fencing. From the constraint, y equals 2400 minus 2x, so A as a function of x is 2400x minus 2x squared. The derivative is 2400 minus 4x. Setting that equal to zero gives x equals 600. Then y equals 1200. The area is 600 times 1200, which is 720,000 square feet. The second derivative is negative, confirming a maximum. Width must be positive and less than 1200, so this critical point is inside the domain.

---

### Slide 7 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Pause: Box with Square Base**  ·  `split_left_right`

**On-screen text** `[21w]`
Pause: Find x that minimizes surface area for volume 32,000 cm³. Use S = x² + 4xh, constraint x²h = 32000.

**LEFT** `[text]`

**Problem:** A box with a square base and open top must have volume 32,000 cm³. Find dimensions that minimize material (surface area).

Apply the six steps again. Try to find the base side length $x$ and height $h$ that minimize $S = x^2 + 4xh$ with constraint $x^2 h = 32,000$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a rectangular prism (box) with square base of side x and height h. As user moves slider for x (from 1 to 100), compute h from constraint and draw the box to scale. Also show a line graph of S(x) with a dot at current x. Mark the critical point region.

*Interactive Controls:*
  - 🎛 Slider for x from 1 to 100
  - 🎛 3D box updates, and a curve of S(x) shows current point

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from ipywidgets import interactive, FloatSlider

def plot_box(x):
    fig = plt.figure(figsize=(8,4))
    ax = fig.add_subplot(121, projection='3d')
    # box dimensions
    h = 32000 / (x**2)
    # vertices
    vertices = np.array([[0,0,0], [x,0,0], [x,x,0], [0,x,0],
                         [0,0,h], [x,0,h], [x,x,h], [0,x,h]])
    edges = [(0,1),(1,2),(2,3),(3,0),
             (4,5),(5,6),(6,7),(7,4),
             (0,4),(1,5),(2,6),(3,7)]
    for i,j in edges:
        ax.plot3D(*zip(vertices[i], vertices[j]), color='b')
    # hide top
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_zlabel('z')
    ax.set_title(f'x={x:.1f}, h={h:.1f}')
    # surface area plot
    ax2 = fig.add_subplot(122)
    xs = np.linspace(1, 100, 400)
    hs = 32000 / (xs**2)
    S = xs**2 + 4*xs*hs
    ax2.plot(xs, S, 'b-')
    ax2.scatter([x], [x**2 + 4*x*h], color='red', zorder=5)
    ax2.set_xlabel('x (cm)')
    ax2.set_ylabel('Surface area (cm²)')
    ax2.set_title('S(x)')
    plt.tight_layout()
    plt.show()

x_slider = FloatSlider(min=1, max=100, step=1, value=40, description='x')
interactive(plot_box, x=x_slider)
```

**Teacher Narration** `[84w]`
> Here's another classic problem: a box with a square base and open top must hold 32,000 cubic centimeters. We want to use as little material as possible—that is, minimize the surface area. The surface area consists of the base, which is x squared, plus four sides, each of area x times h. The volume constraint is x squared h equals 32,000. Eliminate h and you get a function of x. Try to find the critical point. I'll show the solution in the next slide.

**Student Prompt:** What is the optimal base side length?

---

### Slide 8 · [PRACTICE]
**Box Problem Solution**  ·  `full_width`

**On-screen text** `[12w]`
Optimal: base side 40 cm, height 20 cm, min area 4800 cm².

**FULL WIDTH** `[text]`

**Solution:**
- $h = \frac{32000}{x^2}$
- $S(x) = x^2 + 4x \cdot \frac{32000}{x^2} = x^2 + \frac{128000}{x}$
- $S'(x) = 2x - \frac{128000}{x^2} = 0 \Rightarrow 2x^3 = 128000 \Rightarrow x = 40$ cm
- $h = 32000/40^2 = 20$ cm
- Check: $S''(x) = 2 + \frac{256000}{x^3} > 0$ at $x=40$ → minimum
- Minimum surface area: $40^2 + 4\cdot40\cdot20 = 1600+3200 = 4800$ cm²

**Teacher Narration** `[81w]`
> Here's the solution. We eliminate h using the volume constraint, getting S of x equals x squared plus 128,000 over x. The derivative is 2x minus 128,000 over x squared. Setting that equal to zero gives x cubed equals 64,000, so x equals 40 centimeters. Then h is 32,000 divided by 1,600, which is 20 centimeters. The second derivative is positive, confirming a minimum. So the optimal box is 40 by 40 by 20 centimeters, using 4,800 square centimeters of material.

---

### Slide 9 · [MISCONCEPTION]
**Common Mistake: Wrong Side Count**  ·  `split_left_right`

**On-screen text** `[14w]`
Don't miscount faces! 'Open top' means no top face. Draw the net to verify.

**LEFT** `[text]`

**Wrong approach:** For the box with square base, some students forget the open top and include 6 faces. Or they forget there are 4 sides of size $x \times h$.

**Correct:** $S = x^2 + 4xh$ (base + 4 sides, no top).

**Why they get it wrong:** They don't read 'open top' or miscount faces. Always draw and label each face.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw the 2D net of a box: a square base with four rectangles attached. One net (wrong) includes a top square crossed out. The other (correct) omits the top. Label each face 'base' or 'side'. Use color coding.

```python
import matplotlib.pyplot as plt
import matplotlib.patches as patches

fig, (ax1, ax2) = plt.subplots(1,2,figsize=(8,4))
ax1.set_aspect('equal')
ax2.set_aspect('equal')
# Wrong net (6 faces)
ax1.add_patch(patches.Rectangle((0,0), 2,2, facecolor='lightgray', edgecolor='black'))
ax1.add_patch(patches.Rectangle((0,2), 2,1, facecolor='lightblue', edgecolor='black'))
ax1.add_patch(patches.Rectangle((0,-1), 2,1, facecolor='lightblue', edgecolor='black'))
ax1.add_patch(patches.Rectangle((2,0), 1,2, facecolor='lightblue', edgecolor='black'))
ax1.add_patch(patches.Rectangle((-1,0), 1,2, facecolor='lightblue', edgecolor='black'))
ax1.add_patch(patches.Rectangle((-1,2), 1,2, facecolor='lightgreen', edgecolor='black'))  # top?
ax1.text(-0.5,2.5, 'TOP?', color='red', fontsize=12, weight='bold')
ax1.set_xlim(-2,4)
ax1.set_ylim(-2,4)
ax1.set_title('Wrong: includes top', color='red')
ax1.axis('off')

# Correct net (5 faces)
ax2.add_patch(patches.Rectangle((0,0), 2,2, facecolor='lightgray', edgecolor='black'))
ax2.add_patch(patches.Rectangle((0,2), 2,1, facecolor='lightblue', edgecolor='black'))
ax2.add_patch(patches.Rectangle((0,-1), 2,1, facecolor='lightblue', edgecolor='black'))
ax2.add_patch(patches.Rectangle((2,0), 1,2, facecolor='lightblue', edgecolor='black'))
ax2.add_patch(patches.Rectangle((-1,0), 1,2, facecolor='lightblue', edgecolor='black'))
ax2.text(0.5, -0.5, '', color='green')
ax2.set_xlim(-2,4)
ax2.set_ylim(-2,4)
ax2.set_title('Correct: open top', color='green')
ax2.axis('off')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[84w]`
> One of the most common mistakes in optimization is miscounting the number of sides. For a box with an open top, there are five faces: the base and four sides, not six. Always draw a clear diagram or a net. In the problem we just did, if you included the top, you'd get the wrong function and a different answer. So take the time to visualize the shape. Check the problem statement carefully for words like 'open top', 'no lid', or 'without a top'.

**Student Prompt:** What would be the surface area function if the box had a top?

---

### Slide 10 · [PRACTICE] 🟡 🎛 *[1 controls]*
**Tricky Example: Box with Different Material Costs**  ·  `split_left_right`

**On-screen text** `[20w]`
Cost = base area × $10 + side area × $6. Use volume constraint to eliminate h, then minimize C(w).

**LEFT** `[text]`

**Problem:** Rectangular container, open top, volume 10 m³. Length = 2 × width. Base material $10/m², sides $6/m². Find cheapest dimensions.

Steps:
1. Let width = $w$, length = $2w$, height = $h$
2. Constraint: $2w^2 h = 10$
3. Cost: $C = 10\cdot(2w^2) + 6\cdot(2wh+4wh) = 20w^2 + 36wh$
4. Eliminate $h$: $h = 5/w^2$
5. $C(w) = 20w^2 + 180/w$, $w>0$
6. $C'(w)=40w - 180/w^2=0 \Rightarrow w^3 = 4.5 \Rightarrow w \approx 1.65$ m
7. $h \approx 1.84$ m, length $\approx 3.30$ m

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a rectangular box (not square) with dimensions labeled. Then a graph below of C(w) for w from 0.5 to 5, with a red dot at optimum. Show vertical dashed line at critical point.

*Interactive Controls:*
  - 🎛 Slider for w to explore shape and cost

```python
import numpy as np
import matplotlib.pyplot as plt
from ipywidgets import interactive, FloatSlider

def plot_cost(w):
    fig, (ax1, ax2) = plt.subplots(1,2,figsize=(8,4))
    # box diagram (2D sketch)
    length = 2*w
    h = 5/(w**2)  # from constraint
    ax1.plot([0, w, w, 0, 0], [0, 0, h, h, 0], 'b-')
    ax1.plot([0, 0], [0, h], 'b-')  # back edge
    ax1.plot([w, w], [0, h], 'b-')  # front edge
    ax1.plot([0, length], [h, h], 'b--')  # top back? actually simplify to 2D side view
    # Better: 3D would be complex. Just a 2D side view with labels.
    ax1.set_xlim(-0.5, w+0.5)
    ax1.set_ylim(-0.5, h+0.5)
    ax1.set_aspect('equal')
    ax1.set_xlabel('x')
    ax1.set_ylabel('z')
    ax1.set_title(f'w={w:.2f}, h={h:.2f}')
    # cost curve
    ws = np.linspace(0.5, 5, 400)
    hs = 5/(ws**2)
    costs = 20*ws**2 + 36*ws*hs
    ax2.plot(ws, costs, 'b-')
    ax2.scatter([w], [20*w**2 + 36*w*h], color='red', zorder=5)
    ax2.axvline(w, color='gray', linestyle='--', alpha=0.7)
    ax2.set_xlabel('w (m)')
    ax2.set_ylabel('Cost ($)')
    ax2.set_title('C(w)')
    plt.tight_layout()
    plt.show()

w_slider = FloatSlider(min=0.5, max=5, step=0.1, value=2, description='w')
interactive(plot_cost, w=w_slider)
```

**Teacher Narration** `[108w]`
> This problem adds a twist: different material costs for base and sides. The base costs ten dollars per square meter, the sides six dollars. We still have a volume constraint of 10 cubic meters, and the length is twice the width. The cost function becomes 20 w squared plus 36 w h, and after eliminating h we get 20 w squared plus 180 over w. The derivative gives w cubed equals 4.5, so w is about 1.65 meters. Then h is about 1.84 meters, and length about 3.30 meters. The total cost at optimum is about 163 dollars. Always remember to include the correct areas for each material.

**Student Prompt:** Why is the side area 6wh and not 8wh?

---

### Slide 11 · [PRACTICE] 🟡
**Edge Case: Point on a Line Closest to Origin**  ·  `split_left_right`

**On-screen text** `[11w]`
Closest point: (-0.4, 0.2). Minimizing distance squared avoids square root derivative.

**LEFT** `[text]`

**Problem:** Find the point on line $y = 2x+1$ closest to origin $(0,0)$.

- Distance $d = \sqrt{x^2 + y^2} = \sqrt{x^2+(2x+1)^2}$.
- Minimize $d^2$: $f(x)=5x^2+4x+1$.
- $f'(x)=10x+4=0 \Rightarrow x = -2/5$.
- $y = 2(-2/5)+1 = 1/5$.
- Point: $(-0.4, 0.2)$.
- Check $f''(x)=10>0$ → minimum.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot line from x=-1 to x=1. Mark origin (0,0) with a dot. On the line, mark the point ( -0.4, 0.2 ) with a red dot. Draw a dashed line from origin to that point. Show the distance formula. Annotate the coordinates.

```python
import numpy as np
import matplotlib.pyplot as plt

x_vals = np.linspace(-1,1,200)
y_vals = 2*x_vals+1
plt.figure(figsize=(6,6))
plt.plot(x_vals, y_vals, 'b-', label='y=2x+1')
plt.scatter(0,0, color='black', zorder=5, label='Origin')
plt.scatter(-0.4,0.2, color='red', zorder=5, s=80, label='Closest point')
plt.plot([0,-0.4],[0,0.2], 'r--', linewidth=1.5, label='Distance')
plt.xlim(-1,1)
plt.ylim(-1,3)
plt.axhline(0, color='gray')
plt.axvline(0, color='gray')
plt.grid(True, alpha=0.3)
plt.legend()
plt.gca().set_aspect('equal')
plt.title('Closest point on line to origin')
plt.xlabel('x')
plt.ylabel('y')
plt.show()
```

**Teacher Narration** `[96w]`
> This is an edge case because the objective is distance, which involves a square root. To avoid the messy derivative, we minimize the squared distance instead. Since the square root function is increasing, minimizing the square is equivalent. The squared distance is x squared plus (2x+1) squared, which simplifies to 5x squared plus 4x plus 1. The derivative is 10x plus 4, giving x equals negative two-fifths. That's the point negative 0.4, 0.2. Always check second derivative or use monotonicity to confirm it's a minimum. This trick of minimizing the square works for any distance optimization.

---

### Slide 12 · [PRACTICE] 🟡 🎛 *[2 controls]*
**Application: Lifeguard Problem (Snell's Law)**  ·  `split_left_right`

**On-screen text** `[23w]`
Minimize total travel time by choosing entry point x. The optimal satisfies Snell's Law: sin θ1 / v1 = sin θ2 / v2.

**LEFT** `[text]`

**Problem:** Lifeguard at point A (beach) must reach swimmer at B (water). Run speed $v_1$, swim speed $v_2$. Shoreline is straight line. Find entry point P that minimizes time.

- Coordinates: A = (0, a), B = (d, -b).
- P = (x, 0) on shoreline, $0 \le x \le d$.
- Time: $T(x)=\frac{\sqrt{x^2+a^2}}{v_1} + \frac{\sqrt{(d-x)^2+b^2}}{v_2}$.
- Set $T'(x)=0$ leads to $\frac{\sin\theta_1}{v_1} = \frac{\sin\theta_2}{v_2}$ (Snell's Law).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot beach as x-axis from -1 to d+1. Mark A at (0, a) with 'A', B at (d, -b) with 'B'. Let a=10, b=10, d=20. Draw the two line segments from A to P and P to B. Show labels for distances. As user drags point P (slider for x), update both the path and the time displayed. Also show a graph of T(x) with dot at current x. Use ipywidgets. Add a dashed perpendicular line at P to emphasize angles.

*Interactive Controls:*
  - 🎛 Slider for x from 0 to d, with step 0.5
  - 🎛 Two plots update: path diagram and time curve

```python
import numpy as np
import matplotlib.pyplot as plt
from ipywidgets import interactive, FloatSlider

def update_lifeguard(x, a=10, b=10, d=20, v1=5, v2=2):
    fig, (ax1, ax2) = plt.subplots(1,2,figsize=(10,4))
    # left: diagram
    ax1.plot([-1, d+1], [0,0], 'k-', linewidth=2)
    ax1.scatter([0], [a], color='blue', s=100, zorder=5, label='A (beach)')
    ax1.scatter([d], [-b], color='red', s=100, zorder=5, label='B (water)')
    ax1.scatter([x], [0], color='green', s=80, zorder=5, label='P (entry)')
    ax1.plot([0, x], [a, 0], 'b--')
    ax1.plot([x, d], [0, -b], 'r--')
    ax1.plot([x, x], [0, -1], 'g:', linewidth=1)  # perpendicular
    ax1.set_xlim(-2, d+2)
    ax1.set_ylim(-b-2, a+2)
    ax1.set_aspect('equal')
    ax1.set_xlabel('Distance along shore')
    ax1.set_ylabel('Distance perpendicular')
    ax1.legend()
    ax1.set_title(f'x = {x:.2f}')
    # right: time graph
    xs = np.linspace(0, d, 200)
    times = np.sqrt(xs**2 + a**2)/v1 + np.sqrt((d-xs)**2 + b**2)/v2
    ax2.plot(xs, times, 'b-')
    ax2.scatter([x], [np.sqrt(x**2+a**2)/v1 + np.sqrt((d-x)**2+b**2)/v2], color='red', zorder=5)
    ax2.set_xlabel('x')
    ax2.set_ylabel('Time')
    ax2.set_title('Total time T(x)')
    plt.tight_layout()
    plt.show()

x_slider = FloatSlider(min=0, max=20, step=0.5, value=10, description='Entry point x')
interactive(update_lifeguard, x=x_slider)
```

**Teacher Narration** `[107w]`
> This is a real-world application that connects to physics. A lifeguard runs on sand at speed v1 and swims at speed v2. The total time is the sum of distances divided by speeds. After taking the derivative and setting it to zero, we get a relationship that involves the angles the path makes with the perpendicular to the shoreline. That relationship is exactly Snell's Law of refraction: sine of angle one over speed one equals sine of angle two over speed two. Light follows the same principle when it bends between media. Play with the slider to see how the time changes and find the optimal point.

**Student Prompt:** What happens to the optimal entry point if the swim speed is much slower than run speed?

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof of the First Derivative Test for Absolute Extrema**  ·  `full_width`

**On-screen text** `[20w]`
Proof: For any x ≠ c, f(x) > f(c) using MVT and sign of derivative. Hence f(c) is absolute min.

**FULL WIDTH** `[text]`

**Theorem:** If $f$ is continuous on $(0,\infty)$ and has exactly one critical point $c$, and $f'(x)<0$ for $x<c$ and $f'(x)>0$ for $x>c$, then $f(c)$ is the absolute minimum.

**Proof:**
- For $x<c$, by the Mean Value Theorem there exists $u$ in $(x,c)$ such that $f(c)-f(x)=f'(u)(c-x)$. Since $f'(u)<0$ and $c-x>0$, we have $f(c)-f(x)<0$, so $f(x) > f(c)$.
- For $x>c$, similarly $f(x)-f(c)=f'(v)(x-c)$ with $v$ in $(c,x)$ and $f'(v)>0$, so $f(x) > f(c)$.
- Hence $f(c) \le f(x)$ for all $x$, so absolute minimum.

The maximum case follows by reversing signs.

**Teacher Narration** `[91w]`
> For those who want a deeper understanding, here's the proof. The key is the Mean Value Theorem. If the derivative is negative before the critical point and positive after, then the function is decreasing up to c and increasing after. By the MVT, any point to the left has f(x) greater than f(c), and any point to the right also has f(x) greater than f(c). So f(c) is the smallest value in the entire domain. This rigorous argument justifies why we can trust a single critical point as the global extremum.

**Student Prompt:** Why must we also check that the derivative doesn't change sign at the endpoints of the domain?

---

### Slide 14 · [SUMMARY]
**Summary: Optimization Problem-Solving**  ·  `full_width`

**On-screen text** `[11w]`
Optimization = translate → reduce → differentiate → verify → interpret.

**FULL WIDTH** `[text]`

| Learning Objective | Key Takeaway |
|--------------------|--------------|
| Formulate word problems | Use six-step framework: Understand, Diagram, Notation, Objective, Constraint, Reduce & Solve |
| Reduce multivariable to single variable | Eliminate extra variables using constraint equation |
| Find absolute extrema | Use critical points: f'(x)=0, then check domain and first derivative test |
| Interpret results | Include units and verify that the answer makes sense in the original context |
| Avoid common mistakes | Always draw and label all parts; do not forget sides; minimize squared distances when possible |

**Teacher Narration** `[87w]`
> Let's recap. Optimization problems are all about translating a real-world situation into a mathematical function. The six-step framework ensures you don't miss any constraints. The calculus part is straightforward — derivatives and critical points. The real challenge is setting up the problem correctly. Remember to check the domain, use the first derivative test on open intervals, and always interpret your answer in the context of the problem. With practice, you'll develop an intuition for what to maximize or minimize and how to reduce the number of variables.

---
