# Formal Definition Of The Derivative

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 88%

> **Prerequisite:** You should understand the concept of a limit, including one-sided limits, and basic algebraic manipulation such as factoring and rationalizing.

**Learning Objectives:**
- Calculate the derivative of a function at a point using the limit definition
- Interpret the derivative as instantaneous rate of change and slope of the tangent line
- Apply the definition to determine where a function is differentiable
- Analyze edge cases where the derivative fails to exist

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 87w)
⚠️ **Narration too short (<60w):** [11]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 15 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s11:0w']
✅ **visual_specs**: all split slides have visual_spec
❌ **field_completeness**: incomplete: ["s11: ['right', 'on_screen_text', 'teacher_narration', 'difficulty']"]
✅ **interactive_moments**: 3 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | hook | 🟢 | ◧ |  | 94w | 17w | Instantaneous Speed: The 0/0 Problem |
| 2 | core | 🟢 | ◧ |  | 83w | 21w | The Formal Definition of the Derivative |
| 3 | practice | 🟢 | ⬛⬛ | ⏸️ | 92w | 16w | Warm-Up Example: Linear Function |
| 4 | core | 🟢 | ◧ |  | 96w | 19w | Alternative Notation: Derivative as a Function |
| 5 | practice | 🟢 | ⬛⬛ | ⏸️ | 97w | 14w | Standard Example: Quadratic Function |
| 6 | 🎛visual_lab | 🟢 | ◧ | ⏸️ | 96w | 14w | Visualizing Secant Lines Approaching Tangent |
| 7 | misconception | 🟢 | ◧ |  | 96w | 16w | Common Misconception: Plugging h = 0 Directly |
| 8 | challenge | 🔴 | ◧ |  | 68w | 14w | [Challenge – Optional] Derivative of a Constant Function |
| 9 | practice | 🟡 | ⬛⬛ |  | 104w | 17w | Tricky Example: Absolute Value Function |
| 10 | 🎛pause_and_try | 🔴 | ◧ | ⏸️ | 65w | 15w | [Challenge – Optional] Pause and Predict: Wild Function at x=0 |
| 11 | practice |  | ⬛⬛ |  | 0w⚠️ | 0w | [Challenge – Optional] Solution: Squeeze Theorem in Action |
| 12 | practice | 🟢 | ⬛⬛ |  | 101w | 11w | Application: Instantaneous Velocity |
| 13 | 🎛visual_lab | 🟡 | ◧ |  | 94w | 13w | Graphical Differentiability Explorer |
| 14 | core | 🟢 | ◧ |  | 109w | 18w | Pro Tips for Using the Derivative Definition |
| 15 | summary | 🟢 | ⬛⬛ |  | 109w | 8w | Quick Check and Summary |

---

### Slide 1 · [HOOK]
**Instantaneous Speed: The 0/0 Problem**  ·  `split_left_right`

**On-screen text** `[17w]`
How can we measure speed at an instant? Distance = 0, time = 0 → 0/0 undefined.

**LEFT** `[concept]`

Your speedometer shows speed *right now*. But speed = distance/time. At a single instant, distance and time are both zero — you get 0/0. How does your car know how fast you're going?

**RIGHT** `[visual_spec]`

*Visual Spec:* A single graph of speed vs time (smooth curve). A point is highlighted at t=2, speed=20. A sequence of secant lines from t=2 to t=3, t=2.5, t=2.1, etc., appear and get closer to the tangent line at t=2. The tangent line is dashed in green. No animation needed, just a static illustration of three secant lines approaching the tangent.

**Teacher Narration** `[94w]`
> Think about driving a car. Your speedometer tells you your speed right now — not your average over the last hour. But speed is distance divided by time. At a single instant, you've traveled zero distance in zero time. That gives zero divided by zero, which is undefined. So how did engineers solve this? They measure average speed over tiny intervals: one second, then 0.1 seconds, then 0.001 seconds. As the interval shrinks, the averages approach a specific number. That number is your instantaneous speed. The derivative is the mathematical way to do this.

---

### Slide 2 · [CORE]
**The Formal Definition of the Derivative**  ·  `split_left_right`

**On-screen text** `[21w]`
Derivative = limit of average rates of change as interval shrinks to zero. $$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

**LEFT** `[formula_block]`

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of a curve y = f(x). A point (a, f(a)) is marked in red. A second point (a+h, f(a+h)) slides along the curve. The secant line through these two points is shown. As h decreases, the secant line approaches the tangent line at (a, f(a)). Show this as a series of static frames: h = 1, 0.5, 0.1, 0.01. The tangent line is dashed green. Labels: slope of secant = (f(a+h)-f(a))/h, slope of tangent = f'(a).

**Teacher Narration** `[83w]`
> The derivative formalizes the idea of instantaneous rate of change. It is the limit of average rates of change as the interval shrinks to zero. The fraction in the formula is the slope of a secant line through two points on the graph. As h approaches zero, the secant line approaches the tangent line, and its slope becomes the derivative. You cannot plug h equal to zero directly because you get zero over zero. The limit must be evaluated by algebraic simplification first.

---

### Slide 3 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Warm-Up Example: Linear Function**  ·  `full_width`

**On-screen text** `[16w]`
Find f'(2) for f(x)=3x+1. Step by step: substitute, simplify numerator, cancel h, evaluate limit = 3.

**FULL WIDTH** `[steps]`

**Example:** Find $f'(2)$ for $f(x) = 3x+1$.

| Step | Calculation |
|------|-------------|
| 1 | $f'(2) = \lim_{h\to0} \frac{f(2+h)-f(2)}{h}$ |
| 2 | $= \lim_{h\to0} \frac{[3(2+h)+1] - [3(2)+1]}{h}$ |
| 3 | $= \lim_{h\to0} \frac{6+3h+1 - 6 -1}{h} = \lim_{h\to0} \frac{3h}{h}$ |
| 4 | $= \lim_{h\to0} 3 = 3$ |

The derivative is constant 3. Linear functions have the same slope everywhere.

**Teacher Narration** `[92w]`
> Let's see the definition in action with a simple linear function. We want the derivative at a equals 2. Write the definition, substitute the function into numerator, simplify. The 6 and 1 cancel, leaving 3h over h. Since h is nonzero in the limit, we cancel it and get the limit of 3, which is 3. The derivative of a linear function is its slope, constant everywhere. Now try a similar one on your own: find f prime of 1 for f of x equals 4x minus 7. You should get 4.

**Student Prompt:** Try it: Find $f'(1)$ for $f(x)=4x-7$ using the definition. Answer: $4$.

---

### Slide 4 · [CORE]
**Alternative Notation: Derivative as a Function**  ·  `split_left_right`

**On-screen text** `[19w]`
Three notations: f'(x), dy/dx, and limit as x→a. dy/dx is NOT a fraction; it's a symbol for the limit.

**LEFT** `[formula_block]`

$$f'(x) = \lim_{h \to 0} \frac{f(x+h)-f(x)}{h}$$

$$\frac{dy}{dx} = \lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x}$$

Also: $$f'(a) = \lim_{x \to a} \frac{f(x)-f(a)}{x-a}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Two graphs side by side. Left: derivative as function – label: f'(x) gives slope at any point. Right: alternative form: points (x, f(x)) and (a, f(a)) on curve, secant line between them as x approaches a.

**Teacher Narration** `[96w]`
> We can also think of the derivative as a function that gives the slope at any point, not just at one specific point. That is f prime of x. Leibniz notation writes it as dy over dx, but remember, this is a single symbol representing the limit of a fraction, not a real fraction. Do not try to cancel the d's. There is also an alternative definition where we use x approaching a instead of h approaching 0. This form is useful when the algebra works out nicely, like when you factor a difference of squares.

---

### Slide 5 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Standard Example: Quadratic Function**  ·  `full_width`

**On-screen text** `[14w]`
Find f'(x) for f(x)=x^2: expand, cancel x^2, factor h, cancel h, limit = 2x.

**FULL WIDTH** `[steps]`

**Example:** Find $f'(x)$ for $f(x) = x^2$.

| Step | Calculation |
|------|-------------|
| 1 | $f'(x) = \lim_{h\to0} \frac{(x+h)^2 - x^2}{h}$ |
| 2 | $= \lim_{h\to0} \frac{x^2 + 2xh + h^2 - x^2}{h}$ |
| 3 | $= \lim_{h\to0} \frac{2xh + h^2}{h}$ |
| 4 | $= \lim_{h\to0} \frac{h(2x+h)}{h}$ |
| 5 | $= \lim_{h\to0} (2x+h) = 2x$ |

Result: $f'(x) = 2x$. Derivative of $x^2$ is $2x$.

**Teacher Narration** `[97w]`
> Now let's do a quadratic. We want f prime of x for f of x equals x squared. Write the definition, expand the square, cancel the x squared terms, factor h out of the numerator, cancel h with the denominator, and then take the limit as h goes to zero. That leaves us with 2x. So the derivative of x squared is 2x. Notice that the cancellation of h is valid only because we are taking a limit; the original expression is undefined at h equals zero, but after simplification, 2x plus h is defined and continuous.

**Student Prompt:** Now find f'(x) for $f(x) = x^2 + 3x$. (Answer: $2x + 3$)

---

### Slide 6 · [VISUAL_LAB] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Visualizing Secant Lines Approaching Tangent**  ·  `split_left_right`

**On-screen text** `[14w]`
Drag slider to change h. Secant slope approaches tangent slope 2a as h shrinks.

**LEFT** `[concept]`

Drag the slider to change $h$. Watch the secant line approach the tangent line as $h \to 0$. The slope of the secant line approaches the derivative $f'(a)$.

**RIGHT** `[python_lab]`

*Visual Spec:* An interactive plot of f(x)=x^2. A point at x=a (default a=1) is shown with a tangent line (green dashed). A second point at x=a+h is shown. A secant line connects them (red). The slope of secant is displayed numerically. A slider allows h to vary from -2 to 2 (excluding 0). The tangent line remains fixed. The secant slope number updates.

*Interactive Controls:*
  - 🎛 Slider for h from -2 to 2
  - 🎛 Toggle: show tangent line (already shown)

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

def f(x):
    return x**2

a = 1.0
fig, ax = plt.subplots(figsize=(6,4))
plt.subplots_adjust(bottom=0.2)
x_vals = np.linspace(-1, 3, 400)
ax.plot(x_vals, f(x_vals), 'b-', label='f(x)=x^2')
ax.axhline(0, color='gray', lw=0.5)
ax.axvline(0, color='gray', lw=0.5)
ax.grid(True, alpha=0.3)

# tangent line at x=a (slope 2a)
tangent_slope = 2*a
tangent_line = lambda x: f(a) + tangent_slope*(x-a)
ax.plot(x_vals, tangent_line(x_vals), 'g--', label='tangent (slope={})'.format(tangent_slope))

# secant initial h=1
h_init = 1.0
secant_point, = ax.plot([a, a+h_init], [f(a), f(a+h_init)], 'ro', markersize=6)
secant_line, = ax.plot([a, a+h_init], [f(a), f(a+h_init)], 'r-', lw=2, label='secant')
slope_text = ax.text(0.5, 6, 'secant slope = {:.3f}'.format((f(a+h_init)-f(a))/h_init), fontsize=12, ha='center')
ax.legend(loc='upper right')
ax.set_ylim(-1, 10)

# slider
ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
h_slider = Slider(ax_slider, 'h', -2.0, 2.0, valinit=h_init, valstep=0.01)

def update(val):
    h = h_slider.val
    if h == 0:
        h = 0.001  # avoid division by zero
    secant_point.set_xdata([a, a+h])
    secant_point.set_ydata([f(a), f(a+h)])
    secant_line.set_xdata([a, a+h])
    secant_line.set_ydata([f(a), f(a+h)])
    slope = (f(a+h)-f(a))/h
    slope_text.set_text('secant slope = {:.3f}'.format(slope))
    fig.canvas.draw_idle()

h_slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[96w]`
> Let's see the geometry in action. I've plotted f of x equals x squared. The green dashed line is the tangent at x equals 1, slope 2. The red line is the secant through the points at x equals a and x equals a plus h. Use the slider to change h. As h gets smaller, the secant line gets closer to the tangent line, and its slope approaches 2. When h is negative, the secant comes from the left side and also approaches the same tangent. This illustrates that the limit exists from both sides.

**Student Prompt:** Before moving the slider, predict: What happens to the secant line when h becomes negative? Does it still approach the tangent?

---

### Slide 7 · [MISCONCEPTION]
**Common Misconception: Plugging h = 0 Directly**  ·  `split_left_right`

**On-screen text** `[16w]`
Plugging h=0 directly gives 0/0 – undefined. The limit requires simplifying first. Cancel h, then evaluate.

**LEFT** `[concept]`

**Wrong approach:** To find $f'(a)$ for $f(x)=x^2$, some students set $h=0$ immediately:
$$\frac{(a+0)^2 - a^2}{0} = \frac{0}{0}$$ undefined. They conclude the derivative does not exist.

**Correct approach:** Cancel $h$ first in the limit expression, then evaluate.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two panels side by side. Left panel shows the wrong step: substituting h=0 leads to 0/0 and a red X. Right panel shows the correct algebraic cancellation: ( (a+h)^2 - a^2 )/h = (a^2+2ah+h^2 - a^2)/h = (2ah+h^2)/h = 2a+h, then limit h→0 = 2a. Highlight that the cancellation is allowed because h ≠ 0 in the limit process.

**Teacher Narration** `[96w]`
> A very common mistake is to try to substitute h equals 0 directly into the difference quotient. For the function x squared, you get 0 over 0, which is undefined, and some students mistakenly think the derivative doesn't exist. But the definition of a limit does not require the expression to be defined at the limit point. We must simplify algebraically before taking the limit. Only after canceling h can we evaluate the limit. Remember: the cancellation is allowed because h gets arbitrarily close to zero but is never equal to zero during the limit process.

---

### Slide 8 · [CHALLENGE] 🔴 *[Challenge – Optional]*
**[Challenge – Optional] Derivative of a Constant Function**  ·  `split_left_right`

**On-screen text** `[14w]`
If f(x)=c, then f(x+h)=c, numerator = 0, limit = 0. Derivative is 0 everywhere.

**LEFT** `[concept]`

**Theorem:** If $f(x)=c$ (constant), then $f'(x)=0$ for all $x$.

| Step | Derivation |
|------|------------|
| 1 | $f'(x) = \lim_{h\to0} \frac{c - c}{h}$ |
| 2 | $= \lim_{h\to0} \frac{0}{h}$ |
| 3 | $= \lim_{h\to0} 0$ (for $h\neq0$, $0/h=0$) |
| 4 | $= 0$ |

Interpretation: A constant function doesn't change, so its rate of change is zero everywhere.

**RIGHT** `[visual_spec]`

*Visual Spec:* Horizontal line y=c. At any point, the tangent line is the line itself, slope 0. Show secant line between two points: slope = (c-c)/(h)=0. The secant is also horizontal.

**Teacher Narration** `[68w]`
> For those who want a quick proof: if a function is constant, its output never changes. The difference quotient numerator is always 0, and the limit of 0 over h as h approaches 0 is just 0. So the derivative of any constant function is zero. This matches intuition: if you're not moving, your speed is zero. You can skip this slide if you're comfortable with that idea.

---

### Slide 9 · [PRACTICE] 🟡
**Tricky Example: Absolute Value Function**  ·  `full_width`

**On-screen text** `[17w]`
Check differentiability of |x| at 0: one-sided limits are 1 and -1, so derivative does not exist.

**FULL WIDTH** `[steps]`

**Example:** Determine if $f(x)=|x|$ is differentiable at $x=0$.

| Step | Calculation |
|------|-------------|
| 1 | $f'(0) = \lim_{h\to0} \frac{|0+h| - |0|}{h} = \lim_{h\to0} \frac{|h|}{h}$ |
| 2 | Right-hand limit ($h\to0^+$): $\frac{|h|}{h} = \frac{h}{h} = 1 \to 1$ |
| 3 | Left-hand limit ($h\to0^-$): $\frac{|h|}{h} = \frac{-h}{h} = -1 \to -1$ |
| 4 | One-sided limits differ: $1 \neq -1$ |
| 5 | Conclusion: $f'(0)$ does not exist. |

The function is continuous at 0 but not differentiable. A sharp corner = no unique tangent.

**Teacher Narration** `[104w]`
> Not all functions have derivatives everywhere. The absolute value function has a corner at x equals 0. To check differentiability, we compute the one-sided limits of the difference quotient. From the right, h is positive, so absolute value of h over h is h over h equals 1. From the left, h is negative, so absolute value of h is negative h, giving negative h over h equals negative 1. Since these limits are not equal, the two-sided limit does not exist, so the derivative does not exist at 0. The function is continuous but not differentiable. Differentiability is a stronger condition than continuity.

**Student Prompt:** Sketch the graph of f(x)=|x-2|. At what point is it not differentiable? (Answer: at x=2)

---

### Slide 10 · [PAUSE_AND_TRY] 🔴 *[Challenge – Optional]* ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**[Challenge – Optional] Pause and Predict: Wild Function at x=0**  ·  `split_left_right`

**On-screen text** `[15w]`
Pause and decide: Is f differentiable at 0? f(x)=x^2 sin(1/x). Think about the limit definition.

**LEFT** `[concept]`

Consider $$f(x) = \begin{cases} x^2 \sin\left(\frac{1}{x}\right), & x \neq 0 \\ 0, & x=0 \end{cases}$$

**Question:** Is $f$ differentiable at $x=0$? Write down your prediction and a reason.

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of f(x)=x^2 sin(1/x) near 0, zooming in. Show oscillations bounded by ±x^2. As x→0, oscillations shrink to 0. The graph looks like it might have a tangent.

*Interactive Controls:*
  - 🎛 Button: reveal solution (triggers slide 11)

**Teacher Narration** `[65w]`
> Here's a more challenging example. The function looks wild near zero, oscillating infinitely often. But the oscillations are multiplied by x squared, which squeezes them to zero. Your task: decide whether the derivative exists at x equals 0. Pause the video, think about the limit definition, and see if the limit of the difference quotient exists. We'll work through the solution on the next slide.

**Student Prompt:** Pause the video. Use the definition to determine if f'(0) exists.

---

### Slide 11 · [PRACTICE]
**[Challenge – Optional] Solution: Squeeze Theorem in Action**  ·  `full_width`

**On-screen text** `[0w]`


**FULL WIDTH** `[steps]`

**Solution:** Compute $f'(0)$ using the definition.

| Step | Calculation |
|------|-------------|
| 1 | $f'(0) = \lim_{h\to0} \frac{h^2 \sin(1/h) - 0}{h} = \lim_{h\to0} h \sin(1/h)$ |
| 2 | Bound: $-1 \leq \sin(1/h) \leq 1$ |
| 3 | Multiply by $h$ (for $h>0$): $-h \leq h\sin(1/h) \leq h$ (for $h<0$, signs reverse but still squeeze) |
| 4 | Squeeze Theorem: both $-|h|$ and $|h|$ approach 0 as $h\to0$ |
| 5 | So $\lim_{h\to0} h\sin(1/h) = 0$ |
| 6 | Conclusion: $f'(0)=0$ exists. |

Even though oscillations are infinite, the $x^2$ factor squeezes them to zero fast enough.

**Teacher Narration** `[0w ⚠️ **TOO SHORT: 0w < 60w min**]`
> 

---

### Slide 12 · [PRACTICE]
**Application: Instantaneous Velocity**  ·  `full_width`

**On-screen text** `[11w]`
Find instantaneous velocity at t=2: h(t)=100-4.9t^2. Compute h'(2) = -19.6 m/s.

**FULL WIDTH** `[steps]`

**Example:** A ball is dropped from 100m. Height $h(t)=100-4.9t^2$. Find velocity at $t=2$ s.

Use alternative definition: $v(2)=h'(2)=\lim_{t\to2} \frac{h(t)-h(2)}{t-2}$

| Step | Calculation |
|------|-------------|
| 1 | $= \lim_{t\to2} \frac{(100-4.9t^2)-(100-4.9\cdot4)}{t-2}$ |
| 2 | $= \lim_{t\to2} \frac{-4.9t^2 + 4.9\cdot4}{t-2}$ |
| 3 | $= \lim_{t\to2} \frac{-4.9(t^2-4)}{t-2}$ |
| 4 | $= \lim_{t\to2} \frac{-4.9(t-2)(t+2)}{t-2}$ |
| 5 | $= \lim_{t\to2} -4.9(t+2)$ |
| 6 | $= -4.9(4) = -19.6$ m/s |

Velocity is $-19.6$ m/s (downward).

**Teacher Narration** `[101w]`
> Let's connect the derivative to physics: velocity is the derivative of position. A ball is dropped from 100 meters. Its height is given by this quadratic. To find the instantaneous velocity at 2 seconds, we use the alternative definition with t approaching 2. After substitution, we factor out -4.9, factor the difference of squares, cancel the t minus 2 factor, and then evaluate the limit. The result is negative 19.6 meters per second, meaning the ball is moving downward. Notice that the velocity increases linearly with time, which matches the derivative function h'(t) = -9.8t, so at t=2 it is -19.6.

**Student Prompt:** Find v(0) and v(3) using the pattern. (Answers: v(0)=0, v(3)=-29.4 m/s)

---

### Slide 13 · [VISUAL_LAB] 🟡 🎛 *[2 controls]*
**Graphical Differentiability Explorer**  ·  `split_left_right`

**On-screen text** `[13w]`
Move point a. Tangent line appears when derivative exists. Try |x| at a=0.

**LEFT** `[concept]`

Select a function and move the point along the curve. Watch the tangent line appear or disappear depending on differentiability.

**RIGHT** `[python_lab]`

*Visual Spec:* Interactive plot with three functions: f(x)=x^2 (smooth), f(x)=|x| (corner), f(x)=x^(1/3) (vertical tangent). A slider moves point a along x-axis. Tangent line appears if derivative exists. Show slope label. For |x| at a=0, tangent disappears. For x^(1/3) at a=0, tangent is vertical (slope infinite) – optionally show a dashed vertical line.

*Interactive Controls:*
  - 🎛 Slider for point a from -2 to 2
  - 🎛 Radio buttons to choose function: x^2, |x|, x^{1/3}

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, RadioButtons

def smooth_func(x):
    return x**2
def corner_func(x):
    return np.abs(x)
def cusp_func(x):
    return np.cbrt(x)

fig, ax = plt.subplots(figsize=(6,4))
plt.subplots_adjust(bottom=0.3, left=0.1, right=0.8)

func_dict = {'x^2 (smooth)': smooth_func, '|x| (corner)': corner_func, 'x^{1/3} (cusp)': cusp_func}
current_func = smooth_func

x_vals = np.linspace(-2, 2, 400)
line_func, = ax.plot(x_vals, smooth_func(x_vals), 'b-', label='f(x)')
ax.axhline(0, color='gray', lw=0.5)
ax.axvline(0, color='gray', lw=0.5)
ax.grid(True, alpha=0.3)
ax.set_ylim(-2, 4)

a_init = 0.0
point, = ax.plot([a_init], [current_func(a_init)], 'ro', markersize=8)
tangent_line = None
tangent_slope_text = ax.text(0.5, 3.5, '', fontsize=12, ha='center')

# slider for a
ax_slider = plt.axes([0.2, 0.15, 0.6, 0.03])
a_slider = Slider(ax_slider, 'a', -2.0, 2.0, valinit=a_init)

# radio buttons for function
ax_radio = plt.axes([0.85, 0.2, 0.15, 0.3])
radio = RadioButtons(ax_radio, ('x^2 (smooth)', '|x| (corner)', 'x^{1/3} (cusp)'))

def update_tangent(a, func):
    global tangent_line
    if tangent_line:
        tangent_line.remove()
    # compute derivative numerically using central difference
    h = 1e-6
    slope = (func(a+h) - func(a-h))/(2*h)
    if np.isfinite(slope):
        # plot tangent line
        xs = np.linspace(a-1, a+1, 100)
        tangent_ys = func(a) + slope*(xs - a)
        tangent_line, = ax.plot(xs, tangent_ys, 'g--', lw=2)
        tangent_slope_text.set_text('slope = {:.3f}'.format(slope))
    else:
        tangent_line = None
        tangent_slope_text.set_text('derivative does not exist')

def update_all(val=None):
    a = a_slider.val
    func = current_func
    point.set_xdata([a])
    point.set_ydata([func(a)])
    line_func.set_ydata(func(x_vals))
    update_tangent(a, func)
    fig.canvas.draw_idle()

radio.on_clicked(lambda label: update_func_dict(label))
def update_func_dict(label):
    global current_func
    current_func = func_dict[label]
    update_all()

a_slider.on_changed(update_all)
update_all()
plt.show()
```

**Teacher Narration** `[94w]`
> This interactive tool lets you explore differentiability visually. Use the radio buttons to switch between three functions: a smooth parabola, a corner from absolute value, and a cusp from cube root. Move the slider to change the point a. For the parabola, a tangent line always appears. For the absolute value at x equals 0, the tangent disappears because the derivative does not exist. For the cube root, at x equals 0 the tangent is vertical, which is not a derivative in the usual sense. This shows that differentiability requires a unique, finite slope.

**Student Prompt:** Test each function at x=0. What happens? Why?

---

### Slide 14 · [CORE]
**Pro Tips for Using the Derivative Definition**  ·  `split_left_right`

**On-screen text** `[18w]`
Pro tips: cancel h, use power rule to verify, avoid common trap, think of derivative as linear approximation.

**LEFT** `[concept]`

- **Factor and cancel $h$** before evaluating. If you can't cancel $h$, the derivative likely doesn't exist.
- Use the power rule $\frac{d}{dx}x^n = nx^{n-1}$ to check your limit work.
- **Trap:** In the alternative definition $f'(a)=\lim_{x\to a}\frac{f(x)-f(a)}{x-a}$, remember to subtract $f(a)$ not $a$.
- The derivative is the slope of the best linear approximation. Zoom in close enough and a differentiable function looks like a straight line.

**RIGHT** `[visual_spec]`

*Visual Spec:* A graph of a smooth function with a zoomed-in window showing it becoming linear. Label: 'Zoom in: function looks like its tangent line'.

**Teacher Narration** `[109w]`
> Here are some pro tips to help you work with the definition. First, always try to factor and cancel h before evaluating the limit. The h in the denominator is your target. If you can't cancel it, the derivative probably doesn't exist. Second, you can use the power rule as a quick check: the derivative of x to the n is n times x to the n minus 1. Third, a common trap in the alternative definition is to subtract a instead of f of a in the numerator. And finally, think of the derivative as the slope of the best straight-line approximation to the function at that point.

---

### Slide 15 · [SUMMARY]
**Quick Check and Summary**  ·  `full_width`

**On-screen text** `[8w]`
Quick Check: three MCQs. Answers: B, C, B.

**FULL WIDTH** `[concept]`

**Three quick multiple-choice questions:**
1. Which is the correct definition of $f'(a)$?
   - A) $\lim_{h\to a}\frac{f(a+h)-f(a)}{h}$
   - B) $\lim_{h\to0}\frac{f(a+h)-f(a)}{h}$
   - C) $\lim_{h\to0}\frac{f(a)-f(a+h)}{h}$
   - D) $\lim_{h\to0}\frac{f(a+h)-f(h)}{a}$

2. If $f(x)=x^3$, then $f'(2)=$ ?
   - A) 6
   - B) 8
   - C) 12
   - D) 24

3. At $x=0$, which function is NOT differentiable?
   - A) $f(x)=x^2$
   - B) $f(x)=|x|$
   - C) $f(x)=x^2\sin(1/x)$ (with $f(0)=0$)
   - D) $f(x)=5$

Answers: 1:B, 2:C (power rule gives 3*(4)=12), 3:B (corner).

**Teacher Narration** `[109w]`
> Let's do a quick check. First question: the correct definition is B, because h approaches 0 and numerator is f(a+h)-f(a). Second: derivative of x cubed is 3x squared, so at x equals 2 it's 12. Third: absolute value is not differentiable at 0 because the one-sided limits differ. If you got these right, you're on track. If not, review the slides on the definition and the absolute value example. Today we learned that the derivative is the limit of average rates of change, how to compute it algebraically, and that some continuous functions are not differentiable. Keep practicing the limit definition, and you'll build a strong foundation for calculus.

---
