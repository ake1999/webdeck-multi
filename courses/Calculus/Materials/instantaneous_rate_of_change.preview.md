# Instantaneous Rate of Change

**Category:** general_mathematics  |  **Level:** First-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should already understand the slope of a secant line and the concept of a limit.

**Learning Objectives:**
- Calculate instantaneous rates of change using the limit definition
- Interpret the derivative as the instantaneous rate of change
- Apply the concept to velocity, marginal cost, and reaction rates
- Distinguish between average and instantaneous rates
- Recognize when a function does not have an instantaneous rate of change

---

## v3.1 Production Readiness

✅ **Interactive moments:** 5 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 71w)
⚠️ **Narration too short (<60w):** [4]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 17 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s4:48w']
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
| 1 | 🎛hook | 🟢 | ◧ |  | 68w | 12w | Speedometer vs. Average Speed |
| 2 | 🎛core | 🟢 | ◧ |  | 60w | 15w | Average Rate of Change |
| 3 | 🎛core | 🟢 | ◧ |  | 61w | 14w | Instantaneous Rate of Change |
| 4 | 🎛visual_lab | 🟢 | ◧ |  | 48w⚠️ | 10w | Secant → Tangent Animation |
| 5 | 🎛core | 🟢 | ◧ |  | 100w | 9w | Alternative Limit Form |
| 6 | core | 🟢 | ⬛⬛ |  | 79w | 11w | Theorem: Instantaneous ROC = Derivative |
| 7 | practice | 🟢 | ◧ |  | 76w | 9w | Example 1: Warm-Up |
| 8 | pause_and_try | 🟢 | ◧ | ⏸️ | 64w | 10w | Pause: Velocity Problem |
| 9 | practice | 🟢 | ⬛⬛ |  | 68w | 8w | Example 2: Velocity Solution |
| 10 | misconception | 🟡 | ◧ |  | 71w | 9w | Common Mistake: Average vs Instantaneous |
| 11 | practice | 🟡 | ◧ |  | 71w | 8w | Example 3: Exponential Growth (Tricky) |
| 12 | pause_and_try | 🟡 | ◧ | ⏸️ | 80w | 13w | Pause: Does This Function Have an Instantaneous Rate? |
| 13 | practice | 🟡 | ◧ |  | 69w | 11w | Example 4: Edge Case – Absolute Value |
| 14 | practice | 🟡 | ◧ |  | 80w | 9w | Example 5: Application – Marginal Cost |
| 15 | core | 🟢 | ◧ |  | 80w | 10w | Recap: Key Formulas |
| 16 | summary | 🟢 | ⬛⬛ |  | 68w | 10w | Summary and Learning Objectives |
| 17 | challenge | 🔴 | ◧ |  | 68w | 14w | [Challenge – Optional] Why Must the Limit Exist? |

---

### Slide 1 · [HOOK] 🎛 *[2 controls]*
**Speedometer vs. Average Speed**  ·  `split_left_right`

**On-screen text** `[12w]`
Speedometer = instantaneous rate. Average speed = secant slope over an interval.

**LEFT** `[concept]`

Your speedometer reads **instantaneous speed** – the rate of change of distance *right now*.

Average speed = $\frac{\text{total distance}}{\text{total time}}$ covers an interval.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a car dashboard with a speedometer needle at 60 mph. Below, a graph of distance vs. time with two points joined by a dashed secant line. Label the secant slope as 'average speed'. Highlight a point on the curve with a tangent line, label 'instantaneous speed'.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50
  - 🎛 Toggle: show tangent line

**Teacher Narration** `[68w]`
> Take a moment to think about your car's speedometer. It tells you your speed at this precise instant, not your average over the last hour. That reading is an instantaneous rate of change. In contrast, if you compute displacement divided by time elapsed, you get an average rate. Today we'll see how the two are connected through limits, and why the speedometer is actually giving you a derivative.

---

### Slide 2 · [CORE] 🎛 *[2 controls]*
**Average Rate of Change**  ·  `split_left_right`

**On-screen text** `[15w]`
Average rate = slope of secant line = change in y over change in x.

**LEFT** `[formula_block]`

$$\text{Average ROC} = \frac{\Delta y}{\Delta x} = \frac{f(x_2)-f(x_1)}{x_2-x_1}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a curve y = f(x). Mark two points (x1, f(x1)) and (x2, f(x2)). Draw the secant line between them. Label Δx and Δy. Show the slope formula.

*Interactive Controls:*
  - 🎛 Slider: change parameter a
  - 🎛 Radio: left / right / midpoint endpoints

**Teacher Narration** `[60w]`
> The average rate of change of a function over an interval is simply the slope of the line connecting the two endpoints. This is exactly the difference quotient you've seen before: the change in the function divided by the change in the input. It tells you how much the output changes per unit input on average between x1 and x2.

---

### Slide 3 · [CORE] 🎛 *[2 controls]*
**Instantaneous Rate of Change**  ·  `split_left_right`

**On-screen text** `[14w]`
Limit of secant slopes as interval shrinks to zero = slope of tangent line.

**LEFT** `[formula_block]`

$$\text{Instantaneous ROC at } x=a = \lim_{h \to 0} \frac{f(a+h)-f(a)}{h}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Same curve as previous slide, but now the second point is (a+h, f(a+h)). Show h decreasing towards zero. The secant line approaches the tangent line at x=a. Label the tangent line in red.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50
  - 🎛 Toggle: show/hide error band

**Teacher Narration** `[61w]`
> Now we ask: what is the rate of change exactly at a single point? We can't compute a slope with just one point, so we take a limit. We let the second point get arbitrarily close to the first, and the slopes of the secant lines approach the slope of the tangent line. That limit is the instantaneous rate of change.

---

### Slide 4 · [VISUAL_LAB] 🎛 *[2 controls]*
**Secant → Tangent Animation**  ·  `split_left_right`

**On-screen text** `[10w]`
Use slider to decrease h. Watch secant line approach tangent.

**LEFT** `[text]`

Drag the slider to see how secant lines approach the tangent as $h \to 0$.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot f(x)=x^2 from x=0 to x=4. Mark point a=2. Show secant line through (a, f(a)) and (a+h, f(a+h)). Show h value. As h decreases from 2 to 0.1, secant line rotates towards tangent line. Tangent line shown as dashed red when h is small enough (<0.5). Include slider for h, toggle to show/hide tangent. Use matplotlib widgets.

*Interactive Controls:*
  - 🎛 Slider for h from 0.1 to 2.0
  - 🎛 Checkbox: show/hide tangent line

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, CheckButtons

# Function
def f(x):
    return x**2

# Plot setup
fig, ax = plt.subplots(figsize=(6,4))
plt.subplots_adjust(bottom=0.25)
x_vals = np.linspace(0, 4, 500)
ax.plot(x_vals, f(x_vals), 'b-', lw=2, label='f(x)=x^2')
ax.set_xlabel('x')
ax.set_ylabel('f(x)')
ax.set_title('Secant → Tangent')
ax.grid(True, alpha=0.3)
ax.axhline(0, color='gray', lw=0.5)
ax.axvline(0, color='gray', lw=0.5)
ax.set_ylim(0, 16)

# Initial parameters
a = 2.0
h0 = 2.0

# Points and lines
line_sec, = ax.plot([], [], 'g-', lw=2, label='Secant')
line_tan, = ax.plot([], [], 'r--', lw=2, label='Tangent')
point_a, = ax.plot([a], [f(a)], 'ko', markersize=8)
point_ah, = ax.plot([], [], 'ko', markersize=8)
ax.legend(loc='upper left')

# Update function
def update(h):
    x2 = a + h
    y2 = f(x2)
    # secant line
    sec_x = np.array([a, x2])
    sec_y = np.array([f(a), y2])
    line_sec.set_data(sec_x, sec_y)
    point_ah.set_data([x2], [y2])
    # tangent line (derivative at a = 2a)
    slope = 2*a
    tan_x = np.linspace(a-1, a+1, 100)
    tan_y = slope*(tan_x - a) + f(a)
    # Only show tangent when h < 0.5
    if h < 0.5:
        line_tan.set_data(tan_x, tan_y)
        line_tan.set_visible(True)
    else:
        line_tan.set_visible(False)
    fig.canvas.draw_idle()

# Slider
ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 'h', 0.1, 2.0, valinit=h0, valstep=0.1)
slider.on_changed(update)

# Checkbox for tangent
ax_check = plt.axes([0.02, 0.5, 0.12, 0.1])
check = CheckButtons(ax_check, ['Show Tangent'], [True])
def toggle(label):
    line_tan.set_visible(not line_tan.get_visible())
    fig.canvas.draw_idle()
check.on_clicked(toggle)

# Initial draw
update(h0)
plt.show()
```

**Teacher Narration** `[48w ⚠️ **TOO SHORT: 48w < 60w min**]`
> Here you can see the geometry in action. As you slide h towards zero, the green secant line rotates and eventually aligns with the red dashed tangent line. This is the core visual of the derivative. Notice how the tangent line touches the curve at only one point.

**Student Prompt:** What do you think happens to the secant slope as h approaches 0?

---

### Slide 5 · [CORE] 🎛 *[2 controls]*
**Alternative Limit Form**  ·  `split_left_right`

**On-screen text** `[9w]`
Equivalent: let the second point approach the first directly.

**LEFT** `[formula_block]`

$$\text{Instantaneous ROC} = \lim_{x_2 \to x_1} \frac{f(x_2)-f(x_1)}{x_2-x_1}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Same graph as slide 3, but label x1 and x2. Show the two-point form with arrow from x2 to x1.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50
  - 🎛 Toggle: show tangent line

**Teacher Narration** `[100w]`
> Sometimes it's more convenient to let the second point approach the first directly instead of using h. Both forms are exactly the same. In the h-form we set x2 = a+h; in the two-point form we let x2 approach x1. Use whichever is easier for the calculation. This alternative form is especially useful when the function is given in a way that makes substitution with h messy. For example, if you have a rational function, the two-point form might simplify the algebra. The key idea remains: we are taking the limit of secant slopes as the interval shrinks to zero.

---

### Slide 6 · [CORE]
**Theorem: Instantaneous ROC = Derivative**  ·  `full_width`

**On-screen text** `[11w]`
Instantaneous rate of change = derivative = slope of tangent line.

**FULL WIDTH** `[text]`

**Theorem:** If $f$ is differentiable at $x=a$, then the instantaneous rate of change at $x=a$ equals $f'(a)$.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Start: $\frac{f(a+h)-f(a)}{h}$ | Secant slope over $[a, a+h]$ |
| 2 | Take limit as $h\to 0$ | Shrink interval to a single point |
| 3 | Limit exists $\iff$ $f$ differentiable | Definition of differentiability |
| 4 | This limit is $f'(a)$ | Formal definition of derivative |
| 5 | Therefore, instantaneous ROC $= f'(a)$ | QED |

**Teacher Narration** `[79w]`
> This theorem ties everything together. The instantaneous rate of change, the slope of the tangent line, and the derivative are three names for the same limit. If a function is differentiable at a point, that limit exists and we call it f'(a). This is why finding derivatives is so powerful – it gives us an instantaneous rate. The notation f'(a) is read as 'f prime of a'. It represents the slope of the tangent line at that exact point.

---

### Slide 7 · [PRACTICE]
**Example 1: Warm-Up**  ·  `split_left_right`

**On-screen text** `[9w]`
Answer: Instantaneous rate = 12 (units per unit x).

**LEFT** `[steps]`

Find the instantaneous rate of change of $f(x)=3x^2$ at $x=2$.

1. Write limit: $\lim_{h\to 0}\frac{3(2+h)^2-3(2)^2}{h}$
2. Expand: $\frac{3(4+4h+h^2)-12}{h}$
3. Simplify: $\frac{12+12h+3h^2-12}{h}=\frac{12h+3h^2}{h}$
4. Cancel $h$: $12+3h$
5. Take limit: $\lim_{h\to0}(12+3h)=12$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=3x^2 from x=0 to x=3. Mark point at (2,12). Draw tangent line with slope 12. Show coordinates.

**Teacher Narration** `[76w]`
> Let's work through our first example. We start with the limit definition. Notice how the constant 3 factors out. After expanding and simplifying, the h cancels, leaving 12+3h. As h approaches 0, the rate is 12. The tangent line at x=2 has slope 12. This is a straightforward application. The key step is canceling the h, which is allowed because h is not zero in the limit process. This cancellation is what makes the limit computable.

---

### Slide 8 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Pause: Velocity Problem**  ·  `split_left_right`

**On-screen text** `[10w]`
Pause the video now. Compute v(1) using the limit definition.

**LEFT** `[text]`

A particle moves along a line with $s(t)=t^3-6t^2+9t$ (meters, t in seconds). Find the instantaneous velocity at $t=1$ second.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a number line with particle position labeled. Graph of s(t) from t=0 to t=4. Mark point t=1.

**Teacher Narration** `[64w]`
> Here's a typical exam problem. Position is given by a cubic, and we need the instantaneous rate of change of position – that's velocity. Try to compute it using the h-formula before I show the solution. Give it a shot, then resume the video to check your answer. Remember that velocity is the derivative of the position function s(t) with respect to time t.

**Student Prompt:** Compute the instantaneous velocity at t=1.

---

### Slide 9 · [PRACTICE]
**Example 2: Velocity Solution**  ·  `full_width`

**On-screen text** `[8w]`
Result: instantaneous velocity = 0 m/s at t=1.

**FULL WIDTH** `[steps]`

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | $v(1)=\lim_{h\to 0}\frac{s(1+h)-s(1)}{h}$ | Definition of velocity |
| 2 | $s(1+h)=(1+h)^3-6(1+h)^2+9(1+h)$ | Substitute |
| 3 | Expand: $1+3h+3h^2+h^3 -6(1+2h+h^2)+9+9h$ | Carefully expand |
| 4 | Simplify: $(1-6+9)+(3h-12h+9h)+(3h^2-6h^2)+h^3$ | Group terms |
| 5 | $=4+0h-3h^2+h^3$ | Linear term cancels |
| 6 | $s(1)=4$, numerator: $-3h^2+h^3$ | |
| 7 | Limit: $\lim_{h\to0}\frac{-3h^2+h^3}{h}=\lim_{h\to0}(-3h+h^2)=0$ | Cancel $h$ |

**Answer:** $v(1)=0$ m/s (particle momentarily at rest).

**Teacher Narration** `[68w]`
> After careful expansion, the h terms cancel, leaving only higher powers. The limit evaluates to zero. The particle is at rest at t=1 second – a common point where velocity changes sign. If you got zero, great. If not, check your algebra. Notice that the linear term in h canceled out, which is why the velocity is zero. This often happens at turning points of the position function.

---

### Slide 10 · [MISCONCEPTION] 🟡
**Common Mistake: Average vs Instantaneous**  ·  `split_left_right`

**On-screen text** `[9w]`
Average rate ≠ instantaneous rate, especially for nonlinear functions.

**LEFT** `[text]`

**Wrong approach:** For $P(t)=1000\cdot 2^t$, compute average over $[3,4]$: $\frac{P(4)-P(3)}{1}=8000$ and claim it's the instantaneous rate at $t=3$.

**Why it's wrong:** The function is exponential, not linear. The average over $[3,4]$ is 8000, but the true instantaneous rate is only about 5545. Using an interval of length 1 introduces error.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot P(t)=1000*2^t from t=2 to t=5. Mark points at t=3 and t=4, draw secant line with slope 8000. Draw tangent line at t=3 with slope ~5545. Show both slopes labeled.

**Teacher Narration** `[71w]`
> This is one of the most common mistakes students make. Just because you pick a small interval doesn't mean the average rate equals the instantaneous rate. Here, the function is convex and growing faster as time increases, so the average over [3,4] overestimates the rate at t=3. Never substitute a finite interval for a limit. The correct instantaneous rate is found by taking the limit as the interval shrinks to zero.

---

### Slide 11 · [PRACTICE] 🟡
**Example 3: Exponential Growth (Tricky)**  ·  `split_left_right`

**On-screen text** `[8w]`
Answer: ≈ 5545 bacteria per hour (not 8000!).

**LEFT** `[steps]`

Find instantaneous growth rate of $P(t)=1000\cdot 2^t$ at $t=3$.

1. $\lim_{h\to0}\frac{1000\cdot2^{3+h}-1000\cdot2^3}{h}$
2. $=1000\cdot2^3\cdot\lim_{h\to0}\frac{2^h-1}{h}$
3. Known limit (from prerequisite): $\lim_{h\to0}\frac{2^h-1}{h}=\ln2$
4. So $8000\ln2 \approx 5545$ bacteria/hour.

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of exponential function with tangent line at t=3. Label slope 5545. On the same graph, show the secant from t=3 to t=4 with slope 8000 for comparison.

**Teacher Narration** `[71w]`
> Now we compute the correct instantaneous rate. Notice we factor out 1000*2^3. Then we need the limit of (2^h-1)/h, which is a standard result equal to the natural log of 2. The result, about 5545, is significantly less than the average 8000. This demonstrates the difference between average and instantaneous rates for exponential functions. The natural logarithm ln(2) appears because the derivative of an exponential function a^t is a^t * ln(a).

---

### Slide 12 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]*
**Pause: Does This Function Have an Instantaneous Rate?**  ·  `split_left_right`

**On-screen text** `[13w]`
Pause and try: compute the left and right limits of the difference quotient.

**LEFT** `[text]`

Consider $f(x)=|x-2|$. At $x=2$, does the instantaneous rate of change exist?

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=|x-2| from x=0 to x=4. Highlight the sharp corner at x=2. Draw left-hand and right-hand slopes with dashed lines.

**Teacher Narration** `[80w]`
> Here's a function that has a sharp corner at x=2. The instantaneous rate of change requires the limit of the difference quotient to exist. At a corner, the left and right limits of the slope are different, so the two-sided limit does not exist. Try computing the limit from the left and from the right to see why. Pause the video and try it. This is a classic example of a continuous function that is not differentiable at a point.

**Student Prompt:** Determine if the derivative exists at x=2 for f(x)=|x-2|.

---

### Slide 13 · [PRACTICE] 🟡
**Example 4: Edge Case – Absolute Value**  ·  `split_left_right`

**On-screen text** `[11w]`
Left: -1, Right: +1. Limits differ → derivative does not exist.

**LEFT** `[steps]`

Check left and right limits:
- Right: $\lim_{h\to 0^+}\frac{|2+h-2|-0}{h} = \lim_{h\to0^+}\frac{|h|}{h}=1$
- Left: $\lim_{h\to 0^-}\frac{|2+h-2|}{h} = \lim_{h\to0^-}\frac{-h}{h}=-1$
- Two-sided limit does not exist.

**Conclusion:** No instantaneous rate of change at the corner.

**RIGHT** `[visual_spec]`

*Visual Spec:* Same graph, but now show the two one-sided limits numerically: left slope -1, right slope +1. Animate arrows approaching from left and right.

**Teacher Narration** `[69w]`
> As you saw, the right-hand limit gives +1, while the left-hand gives -1. Since these are different, the two-sided limit does not exist. Therefore the instantaneous rate of change at this sharp corner is not defined. This is why differentiability requires the function to be smooth, without corners or cusps. The absolute value function is continuous at x=2, but it is not differentiable there because the slope changes abruptly.

---

### Slide 14 · [PRACTICE] 🟡
**Example 5: Application – Marginal Cost**  ·  `split_left_right`

**On-screen text** `[9w]`
Marginal cost at 50 units = $30 per unit.

**LEFT** `[steps]`

Cost function $C(x)=500+20x+0.1x^2$ (dollars, x units). Find marginal cost at $x=50$.

1. $C'(50)=\lim_{h\to0}\frac{C(50+h)-C(50)}{h}$
2. $C(50+h)=500+20(50+h)+0.1(50+h)^2$
3. Expand: $=1750+30h+0.1h^2$
4. $C(50)=1750$, numerator: $30h+0.1h^2$
5. Limit: $\lim_{h\to0}(30+0.1h)=30$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot cost function from x=0 to x=100. Draw tangent line at x=50 with slope 30. Label as marginal cost. Show that adding one unit increases cost by about $30.

**Teacher Narration** `[80w]`
> In economics, marginal cost tells you how much total cost rises when you produce one more unit. Here the derivative is 30 dollars per unit. This information helps businesses decide whether to increase production. Notice the linear part gives constant 20, and the quadratic adds 10 at x=50 due to the 0.1*2x term. The marginal cost is the derivative of the cost function, which gives the instantaneous rate of change of cost with respect to the number of units produced.

---

### Slide 15 · [CORE]
**Recap: Key Formulas**  ·  `split_left_right`

**On-screen text** `[10w]`
Three equivalent forms. Remember: instantaneous = derivative = tangent slope.

**LEFT** `[text]`

**Average ROC:** $\frac{f(b)-f(a)}{b-a}$

**Instantaneous ROC:** $\lim_{h\to0}\frac{f(a+h)-f(a)}{h} = f'(a)$

**Alternative:** $\lim_{x\to a}\frac{f(x)-f(a)}{x-a}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Show three formula cards side by side with labels. Use arrows to show equivalence.

**Teacher Narration** `[80w]`
> Let's quickly recap the essential formulas. The average rate of change uses a finite interval. The instantaneous rate is the limit as that interval shrinks to zero. This limit is exactly the derivative. Whether you use h or the two-point form, the result is the same. Keep these in mind for the next lecture. The derivative f'(a) is the slope of the tangent line at x=a, and it represents the instantaneous rate of change of the function at that point.

---

### Slide 16 · [SUMMARY]
**Summary and Learning Objectives**  ·  `full_width`

**On-screen text** `[10w]`
You now understand instantaneous rate of change and its applications.

**FULL WIDTH** `[text]`

✔ Calculated instantaneous rates using the limit definition.
✔ Interpreted derivatives as instantaneous rates of change.
✔ Applied to velocity, marginal cost, and exponential growth.
✔ Distinguished average vs. instantaneous rates.
✔ Recognized that corners cause the derivative to not exist.

**Key takeaway:** The instantaneous rate of change is the limit of average rates – it's the derivative.

**Teacher Narration** `[68w]`
> We've covered a lot today. You should now be able to compute instantaneous rates using limits, interpret them as derivatives, and apply them in physics, economics, and biology. Remember the key distinction: average is over an interval, instantaneous is at a point. Keep practicing with the exercises. The concept of instantaneous rate of change is fundamental to calculus and appears in many real-world contexts, from physics to finance.

---

### Slide 17 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Why Must the Limit Exist?**  ·  `split_left_right`

**On-screen text** `[14w]`
Smoothness needed: left and right limits must match. Not all continuous functions have derivatives.

**LEFT** `[text]`

For a function to have an instantaneous rate of change at $x=a$, it must be **smooth** – the left and right limits of the difference quotient must agree. If they don't (like $|x-2|$), the function is not differentiable there.

**Extension:** Try $f(x)=x\sin(1/x)$ for $x\neq0$, $f(0)=0$. Does the derivative exist at $0$? (Hint: use squeeze theorem.)

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x sin(1/x) near 0. Show oscillations that die out. Label x=0. Show that secant slopes oscillate but do not approach a single value, so derivative does not exist.

**Teacher Narration** `[68w]`
> For the curious, here's a deeper question: not every continuous function has a derivative. The absolute value function is continuous but not differentiable at the corner. In contrast, consider f(x)=x sin(1/x) at 0. The difference quotient is sin(1/h), which oscillates between -1 and 1 and does not approach any limit. So the derivative does not exist at 0, even though the function is continuous. Try proving it yourself.

**Student Prompt:** Try to show that the derivative of f(x)=x sin(1/x) at 0 does not exist because the difference quotient oscillates.

---
