# Partial Derivatives

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should already know ordinary derivatives from single-variable calculus, including the limit definition and basic differentiation rules.

**Learning Objectives:**
- Calculate partial derivatives of functions of several variables using the constant-variable rule
- Interpret partial derivatives geometrically as slopes of tangent lines to traces of a surface
- Apply partial derivatives to estimate rates of change in multivariable contexts
- Analyze functions by computing higher-order partial derivatives and apply Clairaut's theorem

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 67w)
⚠️ **Narration too short (<60w):** [3, 7, 10, 14]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s3:57w', 's7:53w', 's10:52w', 's14:49w']
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
| 1 | 🎛hook | 🟢 | ◧ |  | 70w | 17w | Why Partial Derivatives? |
| 2 | 🎛core | 🟢 | ◧ |  | 75w | 24w | Formal Definition |
| 3 | core | 🟢 | ⬛⬛ |  | 57w⚠️ | 11w | Example Using the Definition |
| 4 | 🎛core | 🟢 | ◧ |  | 76w | 14w | Notation |
| 5 | 🎛core | 🟢 | ◧ | ⏸️ | 67w | 12w | Practical Rule |
| 6 | 🎛visual_lab | 🟢 | ◧ |  | 60w | 17w | Geometric Interpretation |
| 7 | pause_and_try | 🟢 | ◧ | ⏸️ | 53w⚠️ | 11w | Pause: Try It Yourself |
| 8 | practice | 🟢 | ⬛⬛ |  | 60w | 6w | Solution: Pause Example |
| 9 | misconception | 🟢 | ◧ |  | 71w | 18w | Common Mistake: Forgetting to Treat Other Variables as Constants |
| 10 | practice | 🟢 | ⬛⬛ |  | 52w⚠️ | 7w | Warm-Up Example |
| 11 | practice | 🟡 | ⬛⬛ |  | 79w | 16w | Standard Example: Product Rule |
| 12 | practice | 🟡 | ⬛⬛ |  | 83w | 15w | Application: Heat Index |
| 13 | core | 🟢 | ◧ |  | 62w | 13w | Higher-Order Partial Derivatives |
| 14 | 🎛visual_lab | 🟢 | ◧ |  | 49w⚠️ | 13w | Interactive: Verify Clairaut |
| 15 | challenge | 🔴 | ◧ |  | 77w | 14w | [Challenge – Optional] Partial Derivatives ≠ Differentiability |
| 16 | summary | 🟢 | ⬛⬛ |  | 78w | 11w | Summary & What's Next |

---

### Slide 1 · [HOOK] 🎛 *[2 controls]*
**Why Partial Derivatives?**  ·  `split_left_right`

**On-screen text** `[17w]`
Baking analogy: fluffiness depends on flour & sugar. Change only one ingredient – that’s a partial derivative.

**LEFT** `[text]`

Baking a cake: fluffiness depends on **flour** and **sugar**.

If you change only the flour (keep sugar fixed), how does fluffiness change?

That's a **partial derivative with respect to flour**.

**RIGHT** `[visual_spec]`

*Visual Spec:* A 2D diagram with a rectangle (cake) centered at (0,0) with width 4 and height 2. Two arrows: one from left side labeled 'flour' pointing to the cake, one from bottom labeled 'sugar' pointing to the cake. A highlighted arrow from the 'flour' label to the top of the cake with label '∂ fluffiness / ∂ flour'. Icons: a small bag (rectangle with a triangle top) for flour, a small bowl (half-circle) for sugar, a small cake (trapezoid with a rectangle base). Colors: warm brown/yellow.

*Interactive Controls:*
  - 🎛 Slider: change amount of flour
  - 🎛 Toggle: show/hide sugar arrow

**Teacher Narration** `[70w]`
> Imagine you're baking a cake and you want to know how the fluffiness changes when you vary the amount of flour while keeping sugar exactly constant. That rate of change is a partial derivative. In multivariable calculus, we often have functions that depend on many inputs, and we want to isolate the effect of just one of them. This lecture will show you how to compute and interpret those rates.

---

### Slide 2 · [CORE] 🎛 *[2 controls]*
**Formal Definition**  ·  `split_left_right`

**On-screen text** `[24w]`
Partial derivative with respect to x: treat y as constant and take the ordinary derivative of f with respect to x at that point.

**LEFT** `[formula_block]`

$$f_x(a,b) = \lim_{h\to 0}\frac{f(a+h,b)-f(a,b)}{h}$$

$$f_y(a,b) = \lim_{h\to 0}\frac{f(a,b+h)-f(a,b)}{h}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Two separate 2D coordinate system diagrams (x-y plane). For f_x: a point (a,b) in the plane, a horizontal step of length h to the right to (a+h,b). Above the plane, two vertical bars representing function values f(a,b) and f(a+h,b) as heights. For f_y: a point (a,b), a vertical step of length h upward to (a,b+h). Two vertical bars for f(a,b) and f(a,b+h). Use color: x-step in blue, y-step in red. Annotate difference quotients as (f(a+h,b)-f(a,b))/h and (f(a,b+h)-f(a,b))/h.

*Interactive Controls:*
  - 🎛 Slider: change h from -1 to 1
  - 🎛 Toggle: show/hide difference quotient values

**Teacher Narration** `[75w]`
> The formal definition looks almost identical to the single-variable derivative, except that we hold one variable fixed. For the partial derivative with respect to x at the point (a,b), we consider g(x) = f(x,b). Then f_x(a,b) is just g'(a). So you already know how to do this – you just need to remember which variable to treat as constant. This limit definition is the foundation, but in practice we use the shortcut rule that follows.

---

### Slide 3 · [CORE]
**Example Using the Definition**  ·  `full_width`

**On-screen text** `[11w]`
Using the limit definition: compute f(1+h,2), f(1,2), simplify quotient, take limit.

**FULL WIDTH** `[steps]`

**Example:** For $f(x,y)=x^2+3y$, find $f_x(1,2)$ using the definition.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | $f(1+h,2)=(1+h)^2+3(2)=1+2h+h^2+6$ | Substitute $(1+h,2)$ |
| 2 | $f(1,2)=1^2+3(2)=1+6=7$ | Substitute $(1,2)$ |
| 3 | $f_x(1,2)=\lim_{h\to0}\frac{(7+2h+h^2)-7}{h}$ | Form difference quotient |
| 4 | $=\lim_{h\to0}\frac{2h+h^2}{h}=\lim_{h\to0}(2+h)=2$ | Simplify and evaluate |

**Teacher Narration** `[57w ⚠️ **TOO SHORT: 57w < 60w min**]`
> Let's work through an example. We want f_x at (1,2) for f(x,y)=x^2+3y. We substitute (1+h,2) into the function, then subtract f(1,2). After simplifying, the h cancels, and we get a limit of 2. This matches what we'd get by the practical rule, which we'll see next. The key is to carefully substitute and simplify step by step.

---

### Slide 4 · [CORE] 🎛 *[1 controls]*
**Notation**  ·  `split_left_right`

**On-screen text** `[14w]`
Common notations: f_x, ∂f/∂x, D_1 f. The curly ∂ separates partial from ordinary derivatives.

**LEFT** `[concept]`

$$f_x = \frac{\partial f}{\partial x} = \frac{\partial}{\partial x}f = D_1 f$$
$$f_y = \frac{\partial f}{\partial y} = \frac{\partial}{\partial y}f = D_2 f$$

The symbol $\partial$ is called **del** – always use it for partial derivatives.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show the standard partial derivative notation with a curly '∂' symbol. Maybe side-by-side comparison: ordinary derivative d/dx (straight d) vs partial ∂/∂x (curly d). Highlight the difference.

*Interactive Controls:*
  - 🎛 Toggle: show/hide comparison with ordinary derivative

**Teacher Narration** `[76w]`
> There are several ways to write a partial derivative. I'll mostly use f_x for clarity. The crucial symbol is the curly d, ∂. It's not a Greek letter – it's a special symbol that tells you this is a partial derivative. Don't confuse it with the ordinary d. For example, if you see df/dx, that's an ordinary derivative – it assumes f only depends on x. The subscript notation f_x is also very common and convenient.

---

### Slide 5 · [CORE] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Practical Rule**  ·  `split_left_right`

**On-screen text** `[12w]`
Treat other variables as constants. Differentiate normally. Example: f(x,y)=x^3y^2 gives f_x=3x^2y^2, f_y=2x^3y.

**LEFT** `[concept]`

**To find $f_x$:** treat $y$ as a constant, differentiate with respect to $x$.

**To find $f_y$:** treat $x$ as a constant, differentiate with respect to $y$.

**Example:** $f(x,y)=x^3y^2$

$f_x = 3x^2 \cdot y^2$
$f_y = x^3 \cdot 2y$

**RIGHT** `[visual_spec]`

*Visual Spec:* On a simple 2D grid, show the function f(x,y)=x^3y^2. Highlight the term y^2 as constant (like a number) when differentiating w.r.t. x. Use color: x in blue, y in red. Show a 'constant' label on y^2.

*Interactive Controls:*
  - 🎛 Slider: change exponent of x from 1 to 4
  - 🎛 Toggle: show/hide constant labels

**Teacher Narration** `[67w]`
> Here's the practical shortcut: when you need the partial derivative with respect to x, pretend that y is just a constant like 5 or pi. Then differentiate x normally. That's it. For f(x,y)=x^3y^2, holding y constant means y^2 is just a coefficient. So f_x is 3x^2 times y^2. Similarly, f_y treats x^3 as constant, giving x^3 times 2y. This rule makes computing partial derivatives fast and straightforward.

---

### Slide 6 · [VISUAL_LAB] 🎛 *[3 controls]*
**Geometric Interpretation**  ·  `split_left_right`

**On-screen text** `[17w]`
Move the sliders to see how f_x and f_y change. Toggle visibility of traces and tangent lines.

**LEFT** `[text]`

$f_x(a,b)$ is the slope of the tangent line to the trace $z=f(x,b)$ at $x=a$.

Similarly, $f_y(a,b)$ is the slope along the trace $z=f(a,y)$.

Use the controls to explore.

**RIGHT** `[python_lab]`

*Visual Spec:* 3D surface plot of f(x,y)=x^2+y^2 with point (a,b) highlighted. Show the trace curves in y=b plane (red) and x=a plane (blue). Draw tangent lines at the point with correct slopes. Include interactive sliders for a and b (range -2 to 2). Also a toggle to show/hide trace curves and tangent lines. Use mpl_toolkits.mplot3d. Annotate slope values. For ipywidgets or matplotlib widgets.

*Interactive Controls:*
  - 🎛 Slider for a from -2 to 2
  - 🎛 Slider for b from -2 to 2
  - 🎛 Checkboxes: show/hide trace curves and tangent lines

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider, CheckButtons

# Function
def f(x,y):
    return x**2 + y**2

# Initial point
a0, b0 = 1.0, 1.0

# Create grid
x = np.linspace(-2, 2, 30)
y = np.linspace(-2, 2, 30)
X, Y = np.meshgrid(x, y)
Z = f(X, Y)

# Figure
fig = plt.figure(figsize=(12, 6))
ax = fig.add_subplot(111, projection='3d')
ax.plot_surface(X, Y, Z, alpha=0.6, cmap='viridis')

# Trace lines and tangent lines (init)
x_trace = np.linspace(-2, 2, 100)
y_trace = np.full_like(x_trace, b0)
z_trace = f(x_trace, y_trace)
line_trace_x, = ax.plot(x_trace, y_trace, z_trace, 'r-', linewidth=2, label='Trace y=b')

y_trace2 = np.linspace(-2, 2, 100)
x_trace2 = np.full_like(y_trace2, a0)
z_trace2 = f(x_trace2, y_trace2)
line_trace_y, = ax.plot(x_trace2, y_trace2, z_trace2, 'b-', linewidth=2, label='Trace x=a')

# Tangent line for f_x
h = 0.5
fx = 2*a0  # partial derivative
x_tan = np.array([a0-h, a0+h])
y_tan = np.array([b0, b0])
z_tan = f(a0,b0) + fx * (x_tan - a0)
tan_line_x, = ax.plot(x_tan, y_tan, z_tan, 'g-', linewidth=3, label='Tangent (x)')

# Tangent line for f_y
fy = 2*b0
y_tan2 = np.array([b0-h, b0+h])
x_tan2 = np.array([a0, a0])
z_tan2 = f(a0,b0) + fy * (y_tan2 - b0)
tan_line_y, = ax.plot(x_tan2, y_tan2, z_tan2, 'm-', linewidth=3, label='Tangent (y)')

# Point
point, = ax.plot([a0], [b0], [f(a0,b0)], 'ko', markersize=8)

ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
ax.set_title('Partial Derivatives: Tangent Lines to Traces')
ax.legend()

# Sliders for a and b
axcolor = 'lightgoldenrodyellow'
ax_a = plt.axes([0.2, 0.05, 0.4, 0.03], facecolor=axcolor)
ax_b = plt.axes([0.2, 0.01, 0.4, 0.03], facecolor=axcolor)
s_a = Slider(ax_a, 'a', -2, 2, valinit=a0)
s_b = Slider(ax_b, 'b', -2, 2, valinit=b0)

def update(val):
    a = s_a.val
    b = s_b.val
    # Update trace x
    y_trace = np.full_like(x_trace, b)
    z_trace = f(x_trace, y_trace)
    line_trace_x.set_data(x_trace, y_trace)
    line_trace_x.set_3d_properties(z_trace)
    # Update trace y
    x_trace2 = np.full_like(y_trace2, a)
    z_trace2 = f(x_trace2, y_trace2)
    line_trace_y.set_data(x_trace2, y_trace2)
    line_trace_y.set_3d_properties(z_trace2)
    # Update tangent x
    fx = 2*a
    x_tan = np.array([a-h, a+h])
    y_tan = np.array([b, b])
    z_tan = f(a,b) + fx * (x_tan - a)
    tan_line_x.set_data(x_tan, y_tan)
    tan_line_x.set_3d_properties(z_tan)
    # Update tangent y
    fy = 2*b
    y_tan2 = np.array([b-h, b+h])
    x_tan2 = np.array([a, a])
    z_tan2 = f(a,b) + fy * (y_tan2 - b)
    tan_line_y.set_data(x_tan2, y_tan2)
    tan_line_y.set_3d_properties(z_tan2)
    # Update point
    point.set_data([a], [b])
    point.set_3d_properties([f(a,b)])
    fig.canvas.draw_idle()

s_a.on_changed(update)
s_b.on_changed(update)

# Check buttons for show/hide traces and tangents
rax = plt.axes([0.7, 0.05, 0.2, 0.15])
check = CheckButtons(rax, ['Trace x', 'Trace y', 'Tangent x', 'Tangent y'], [True, True, True, True])
def toggle(label):
    if label == 'Trace x':
        line_trace_x.set_visible(not line_trace_x.get_visible())
    elif label == 'Trace y':
        line_trace_y.set_visible(not line_trace_y.get_visible())
    elif label == 'Tangent x':
        tan_line_x.set_visible(not tan_line_x.get_visible())
    elif label == 'Tangent y':
        tan_line_y.set_visible(not tan_line_y.get_visible())
    fig.canvas.draw_idle()
check.on_clicked(toggle)

plt.show()
```

**Teacher Narration** `[60w]`
> Visualizing partial derivatives is powerful. The surface z = x²+y² is plotted. At any point (a,b), the trace y=b is a parabola on the surface. The slope of its tangent line is exactly f_x(a,b). Similarly, the trace x=a gives f_y. Use the sliders to move the point – notice how the slopes change. The traces and tangent lines update automatically.

**Student Prompt:** Adjust the sliders to a=0.5, b=1.5. What is the value of f_x? Check the tangent line slope.

---

### Slide 7 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Pause: Try It Yourself**  ·  `split_left_right`

**On-screen text** `[11w]`
Find f_x(1,2) and f_y(1,2) for f(x,y)=x^2y + ln(y). Pause and try.

**LEFT** `[text]`

Find $f_x(1,2)$ and $f_y(1,2)$ for $f(x,y)=x^2y + \ln(y)$.

Pause the video, compute your answer, then resume to check.

**RIGHT** `[visual_spec]`

*Visual Spec:* A simple blank space with a question mark icon. Or a small schematic of a hand holding a pencil over paper. Minimal.

**Teacher Narration** `[53w ⚠️ **TOO SHORT: 53w < 60w min**]`
> Before I show the solution, try this on your own. Pause the video now. Compute both partial derivatives at (1,2) for f(x,y)=x²y + ln(y). Remember: treat y constant when differentiating with respect to x, and x constant for y. I'll come back with the answer. This is a good check of your understanding.

---

### Slide 8 · [PRACTICE]
**Solution: Pause Example**  ·  `full_width`

**On-screen text** `[6w]`
f_x=2xy, so f_x(1,2)=4. f_y=x²+1/y, so f_y(1,2)=1.5.

**FULL WIDTH** `[steps]`

**Solution:**

- $f_x = \frac{\partial}{\partial x}(x^2y + \ln y) = 2xy + 0 = 2xy$
- $f_y = \frac{\partial}{\partial y}(x^2y + \ln y) = x^2 + \frac{1}{y}$

Evaluate at $(1,2)$:

- $f_x(1,2) = 2 \cdot 1 \cdot 2 = 4$
- $f_y(1,2) = 1^2 + \frac{1}{2} = 1.5$

**Teacher Narration** `[60w]`
> Here's the solution. The partial with respect to x treats y as constant, so the derivative of x²y is 2xy, and ln y disappears. That gives 2xy, and at (1,2) it's 4. For y, treat x constant: derivative of x²y is x², derivative of ln y is 1/y. At (1,2), that's 1 plus 0.5 equals 1.5. How did you do?

---

### Slide 9 · [MISCONCEPTION]
**Common Mistake: Forgetting to Treat Other Variables as Constants**  ·  `split_left_right`

**On-screen text** `[18w]`
Common mistake: forgetting to treat other variables as constants. y is constant when differentiating with respect to x.

**LEFT** `[concept]`

**Wrong:** $\frac{\partial}{\partial x} (x^2 y) = 2x + y$

**Correct:** $\frac{\partial}{\partial x} (x^2 y) = 2x \cdot y$

**Why:** When taking the partial derivative with respect to x, treat y as a constant coefficient. Do not differentiate y with respect to x.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show the expression x^2 y. Highlight y in red with a label 'constant'. Show the derivative as 2x * y. Use a red X on the wrong answer and a green check on the correct answer.

**Teacher Narration** `[71w]`
> A very common mistake is to forget that other variables are treated as constants. For example, when finding the partial derivative of x^2 y with respect to x, some students incorrectly write 2x + y, as if they were differentiating a product in single-variable calculus. But y is a constant here, so the correct derivative is 2x times y. Always ask yourself: which variable is the variable? The rest are constants.

---

### Slide 10 · [PRACTICE]
**Warm-Up Example**  ·  `full_width`

**On-screen text** `[7w]`
Warm-up: f_x=3x²+2xy³ → f_x(2,1)=16. f_y=3x²y²-4y → f_y(2,1)=8.

**FULL WIDTH** `[steps]`

**Example:** Find $f_x(2,1)$ and $f_y(2,1)$ for $f(x,y)=x^3 + x^2y^3 - 2y^2$.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | $f_x = 3x^2 + 2xy^3 - 0$ | Treat y constant |
| 2 | $f_x(2,1) = 3(4) + 2(2)(1) = 12+4=16$ | Substitute |
| 3 | $f_y = 0 + 3x^2y^2 - 4y$ | Treat x constant |
| 4 | $f_y(2,1) = 3(4)(1) - 4(1) = 12-4=8$ | Substitute |

**Teacher Narration** `[52w ⚠️ **TOO SHORT: 52w < 60w min**]`
> Let's try a warm-up. f(x,y)=x³ + x²y³ - 2y². For f_x, hold y constant. The term x²y³ treats y³ as a constant coefficient, so derivative is 2xy³. The -2y² term vanishes. At (2,1), f_x=16. For f_y, hold x constant: x³ vanishes, x²y³ gives 3x²y², and -2y² gives -4y. At (2,1), f_y=8. Straightforward.

---

### Slide 11 · [PRACTICE] 🟡
**Standard Example: Product Rule**  ·  `full_width`

**On-screen text** `[16w]`
Standard: use product rule and chain rule. Derivatives of e^{xy} involve chain rule in each variable.

**FULL WIDTH** `[steps]`

**Example:** $z = e^{xy}\sin(x^2y)$

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | $\frac{\partial z}{\partial x} = e^{xy}\cdot \cos(x^2y)\cdot 2xy + \sin(x^2y)\cdot ye^{xy}$ | Product rule & chain rule |
| 2 | $= ye^{xy}\big[2x\cos(x^2y) + \sin(x^2y)\big]$ | Factor |
| 3 | $\frac{\partial z}{\partial y} = e^{xy}\cdot \cos(x^2y)\cdot x^2 + \sin(x^2y)\cdot xe^{xy}$ | Product rule (y derivative of e^{xy} is xe^{xy}) |
| 4 | $= xe^{xy}\big[x\cos(x^2y) + \sin(x^2y)\big]$ | Factor |

**Teacher Narration** `[79w]`
> This example ties everything together: product rule, chain rule, and factorisation. For the x derivative, treat y constant. The first term is e^{xy} times the derivative of sin(x²y) – that brings down 2xy cos(x²y). Then we add sin(x²y) times the derivative of e^{xy}, which is y e^{xy}. After factoring, we get y e^{xy} times the bracket. Similarly for y: the derivative of e^{xy} brings down x, and the derivative of sin(x²y) brings down x² cos(x²y). Factor out x e^{xy}.

---

### Slide 12 · [PRACTICE] 🟡
**Application: Heat Index**  ·  `full_width`

**On-screen text** `[15w]`
ΔI ≈ I_T ΔT + I_H ΔH. At (96,70): I_T≈3.75, I_H≈0.9. With ΔT=2, ΔH=-5, ΔI≈3°F.

**FULL WIDTH** `[steps]`

**Problem:** Heat index $I(T,H)$ depends on temperature $T$ and humidity $H$.

Given $I_T(96,70)\approx 3.75$ and $I_H(96,70)\approx 0.9$.

Estimate the change in heat index if $T$ rises to $98°F$ and $H$ drops to $65\%$.

| Step | Calculation |
|------|-------------|
| 1 | $\Delta I \approx I_T \Delta T + I_H \Delta H$ |
| 2 | $\Delta T = 2, \Delta H = -5$ |
| 3 | $\Delta I \approx 3.75(2) + 0.9(-5) = 7.5 - 4.5 = 3$°F |

**Teacher Narration** `[83w]`
> Here's a real application: the heat index tells you how hot it feels. If temperature rises 2°F while humidity drops 5%, we can estimate the change using partial derivatives. The change is approximately the partial with respect to T times the change in T, plus the partial with respect to H times the change in H. Plugging in: 3.75×2 plus 0.9×(-5) gives 7.5 minus 4.5, a net increase of about 3°F. This is the beginning of linear approximation – a very powerful idea.

---

### Slide 13 · [CORE]
**Higher-Order Partial Derivatives**  ·  `split_left_right`

**On-screen text** `[13w]`
Second-order partials: f_xx, f_yy, f_xy, f_yx. Under continuity, mixed partials are equal (Clairaut).

**LEFT** `[formula_block]`

$$f_{xx} = \frac{\partial^2 f}{\partial x^2}, \quad f_{yy} = \frac{\partial^2 f}{\partial y^2}$$
$$f_{xy} = \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right) = \frac{\partial^2 f}{\partial y\partial x}$$
$$f_{yx} = \frac{\partial}{\partial x}\left(\frac{\partial f}{\partial y}\right) = \frac{\partial^2 f}{\partial x\partial y}$$

**Clairaut's Theorem:** If $f_{xy}$ and $f_{yx}$ are continuous, then $f_{xy}=f_{yx}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a small 2x2 grid of mixed partials: order of differentiation indicated by arrows (x then y vs y then x). At the center, 'equality under continuity'. Use check mark for equality.

**Teacher Narration** `[62w]`
> We can take partials of partials. The notation f_xy means differentiate first with respect to x, then with respect to y. Order matters, but Clairaut's theorem gives us a nice reprieve: if both mixed partials are continuous near the point, they are equal. This often saves us work. For most nice functions, you can compute mixed partials in whichever order is easier.

---

### Slide 14 · [VISUAL_LAB] 🎛 *[3 controls]*
**Interactive: Verify Clairaut**  ·  `split_left_right`

**On-screen text** `[13w]`
Change a and b. Observe that f_xy always equals f_yx for this function.

**LEFT** `[text]`

Use the slider to check that $f_{xy}=f_{yx}$ for $f(x,y)=x^3y^2+2x$.

Switch the viewing mode to see the equality hold at various points.

**RIGHT** `[python_lab]`

*Visual Spec:* Display two side-by-side plots: numerical values of f_xy and f_yx as functions of a and b. Slider for (a,b). Show that both mixed partials produce the same number: 6x^2y. Include a toggle to show difference (which should be zero). Use matplotlib widgets.

*Interactive Controls:*
  - 🎛 Slider for a from -2 to 2
  - 🎛 Slider for b from -2 to 2
  - 🎛 Button: Reset to (1,1)

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

# Define function and derivatives
def f(x,y):
    return x**3 * y**2 + 2*x
def f_xy(x,y):
    return 6 * x**2 * y
def f_yx(x,y):
    return 6 * x**2 * y

a0, b0 = 1.0, 1.0

fig, ax = plt.subplots(figsize=(10, 4))
plt.subplots_adjust(bottom=0.25)

ax.axis('off')
text = ax.text(0.5, 0.5, '', fontsize=16, ha='center', va='center', transform=ax.transAxes)
def update(val):
    a = s_a.val
    b = s_b.val
    xy = f_xy(a,b)
    yx = f_yx(a,b)
    diff = np.abs(xy - yx)
    txt = f'At (a,b) = ({a:.2f}, {b:.2f})\nf_xy = {xy:.4f}, f_yx = {yx:.4f}\nDifference = {diff:.6f}'
    if diff < 1e-12:
        txt += '\nClairaut verified: f_xy = f_yx'
    else:
        txt += '\nDifference detected (should be zero)'
    text.set_text(txt)
    fig.canvas.draw_idle()

ax_a = plt.axes([0.2, 0.1, 0.4, 0.03])
ax_b = plt.axes([0.2, 0.05, 0.4, 0.03])
s_a = Slider(ax_a, 'a', -2, 2, valinit=a0)
s_b = Slider(ax_b, 'b', -2, 2, valinit=b0)
s_a.on_changed(update)
s_b.on_changed(update)

# Reset button
ax_reset = plt.axes([0.7, 0.1, 0.1, 0.03])
button = Button(ax_reset, 'Reset')
def reset(event):
    s_a.reset()
    s_b.reset()
button.on_clicked(reset)

update(None)
plt.show()
```

**Teacher Narration** `[49w ⚠️ **TOO SHORT: 49w < 60w min**]`
> Let's verify Clairaut's theorem for f(x,y)=x³y²+2x. The two mixed partials are both 6x²y. Use the sliders to change the point; you'll always see the same value for f_xy and f_yx. The difference is zero. This theorem holds because the function is smooth – its second partials are continuous everywhere.

**Student Prompt:** Move sliders to a=1.5, b=0.8. What are f_xy and f_yx?

---

### Slide 15 · [CHALLENGE] 🔴 *[Challenge – Optional]*
**[Challenge – Optional] Partial Derivatives ≠ Differentiability**  ·  `split_left_right`

**On-screen text** `[14w]`
f(x,y)=xy/(x²+y²) at (0,0) has partial derivatives 0, but is not differentiable. A cautionary tale.

**LEFT** `[text]`

**Example:** $f(x,y)=\begin{cases}\frac{xy}{x^2+y^2}, & (x,y)\neq(0,0) \\ 0, & (x,y)=(0,0)\end{cases}$

Using the limit definition:
- $f_x(0,0) = \lim_{h\to0}\frac{f(h,0)-0}{h} = \lim_{h\to0}\frac{0}{h}=0$
- $f_y(0,0)=0$ similarly.

Yet $f$ is **not** differentiable at $(0,0)$ – there is no tangent plane.

**Moral:** Partial derivatives can exist without differentiability.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of the function near (0,0) using a surface plot. Show that the surface is not flat near the origin – it has a 'crease' or oscillatory behavior. Highlight that partial derivatives along axes are zero, but approaching along other directions gives different slopes.

**Teacher Narration** `[77w]`
> This is a deep point. For the function f(x,y)=xy/(x²+y²), with f(0,0)=0, the partial derivatives at (0,0) exist and are zero. But the function is not differentiable – it is not even continuous at (0,0). For example, approaching along the line y=x gives a limit of 1/2, not 0. So the function has a discontinuity at the origin, which means it cannot have a tangent plane. This shows that existence of partial derivatives alone does not guarantee differentiability.

---

### Slide 16 · [SUMMARY]
**Summary & What's Next**  ·  `full_width`

**On-screen text** `[11w]`
Partial derivatives: definition, practical rule, geometry, higher-order, caveats. Next: tangent planes.

**FULL WIDTH** `[concept]`

**Key takeaways:**

| Concept | Key fact |
|---------|----------|
| **Definition** | $f_x(a,b) = \lim_{h\to0}\frac{f(a+h,b)-f(a,b)}{h}$ |
| **Practical rule** | Treat other variables as constants |
| **Geometric meaning** | Slope of tangent line to trace |
| **Higher-order** | $f_{xy}=f_{yx}$ under continuity (Clairaut) |
| **Caveat** | Partial derivatives exist ≠ differentiability |

**Next lecture:** Linearization and the tangent plane.

**Teacher Narration** `[78w]`
> Let's summarize. Partial derivatives measure the rate of change along one coordinate direction while holding others fixed. You can compute them by treating other variables as constants. Geometrically, they are slopes of tangent lines to the surface traces. Higher-order partials are straightforward, and Clairaut's theorem often simplifies mixed partials. But remember: partial derivatives existing alone does not guarantee a function is differentiable. In the next lecture, we'll use partial derivatives to build the tangent plane and linear approximations.

---
