# Newton's Method and Linear Approximations

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** Recall: the tangent line at x=a has equation y=f(a) + f'(a)(x-a)

**Learning Objectives:**
- Calculate successive approximations to roots of equations using Newton's method
- Interpret the geometric meaning of Newton's method as tangent line iteration
- Apply Newton's method to find roots with specified accuracy (4–6 decimal places)
- Analyze convergence behavior and identify conditions where Newton's method fails
- Construct linear approximations to functions and use them to estimate values

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 84w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
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
| 1 | hook | 🟢 | ◧ |  | 101w | 15w | The Foggy Trail Analogy |
| 2 | core | 🟢 | ◧ |  | 93w | 15w | The Newton Iteration Formula |
| 3 | core | 🟢 | ⬛⬛ |  | 78w | 15w | Derivation in Five Steps |
| 4 | 🎛visual_lab | 🟢 | ◧ | ⏸️ | 72w | 11w | Interactive Visual: Step Through Newton's Method |
| 5 | practice | 🟢 | ⬛⬛ |  | 76w | 12w | Warm-Up: Square Root of 5 |
| 6 | practice | 🟢 | ⬛⬛ |  | 76w | 11w | Standard: Cubic with Linear Term |
| 7 | misconception | 🟡 | ◧ |  | 66w | 14w | Misconception: Division by Zero |
| 8 | practice | 🟡 | ⬛⬛ |  | 81w | 12w | Tricky: Avoiding the Zero-Derivative Trap |
| 9 | 🎛pause_and_try | 🔴 | ◧ | ⏸️ | 84w | 10w | [Challenge – Optional] Pause and Predict: Convergence or Divergence? |
| 10 | core | 🔴 | ⬛⬛ |  | 81w | 17w | [Challenge – Optional] Solution: Cube Root Divergence |
| 11 | practice | 🟡 | ⬛⬛ |  | 96w | 13w | Application: Car Loan Interest Rate |
| 12 | 🎛visual_lab | 🟢 | ◧ | ⏸️ | 87w | 14w | Interactive: Convergence vs Initial Guess |
| 13 | core | 🟡 | ⬛⬛ |  | 84w | 16w | Convergence Behavior: Quadratic Convergence |
| 14 | practice | 🟢 | ⬛⬛ |  | 85w | 8w | Practice Problem Ladder |
| 15 | core | 🟢 | ⬛⬛ |  | 94w | 18w | Pro Tips for Newton's Method |
| 16 | summary | 🟢 | ⬛⬛ |  | 86w | 13w | Summary: Key Takeaways |

---

### Slide 1 · [HOOK]
**The Foggy Trail Analogy**  ·  `split_left_right`

**On-screen text** `[15w]`
Stick = tangent line. Walk to where it hits the river. Repeat. That's Newton's method.

**LEFT** `[text]`

You're on a winding trail in fog. You can't see the river crossing, but you have a straight stick. Lay it along the slope at your feet, extend it to the river, walk there, and repeat. That's Newton's method — each step uses a local linear approximation to leap toward the root.

**RIGHT** `[visual_spec]`

*Visual Spec:* Animated plot of y = (x-2)^3 + 1 from -1 to 4. Mark root near 1. Show x0=0, draw tangent line intersecting x-axis at x1≈0.5, then from x1 draw tangent to x2≈0.8. Animate a stick being laid and a figure moving. Use matplotlib.animation.FuncAnimation with 100 frames, 50 ms interval. The figure walks along the tangent line from (x_n, f(x_n)) to (x_{n+1}, 0) over 30 frames per step, then the stick is drawn as a line segment from (x_n, f(x_n)) to (x_{n+1}, 0) that appears over 10 frames.

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.animation import FuncAnimation

fig, ax = plt.subplots()
x = np.linspace(-1, 4, 400)
f = lambda x: (x-2)**3 + 1
ax.plot(x, f(x), 'b-', label='f(x)')
ax.axhline(0, color='gray')
# initial guess x0=0
x0 = 0
x1 = 0.5
x2 = 0.8
ax.plot([x0, x0], [0, f(x0)], 'ro')
ax.plot([x0, x1], [f(x0), 0], 'r--')
ax.plot([x1, x1], [0, f(x1)], 'go')
ax.plot([x1, x2], [f(x1), 0], 'g--')
ax.set_xlim(-1,4); ax.set_ylim(-2,6); ax.grid(True)
plt.show()
```

**Teacher Narration** `[101w]`
> Imagine you're hiking on a mountain trail in thick fog. You know somewhere there's a river crossing the trail, but you can't see it. What you can see is the ground under your feet. You have a long straight stick. You lay the stick along the slope of the trail at your feet, extend it straight until it touches the river, then walk to that point. Then you do it again. Each time the stick's intersection moves closer to the actual crossing. That's the heart of Newton's method: using a local tangent line as a proxy to leap toward the root.

---

### Slide 2 · [CORE]
**The Newton Iteration Formula**  ·  `split_left_right`

**On-screen text** `[15w]`
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$ — Each step subtracts the ratio of function to derivative.

**LEFT** `[formula_block]`

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of a smooth function f(x) crossing x-axis. Show point (xn, f(xn)), tangent line with slope f'(xn). Highlight the x-intercept as xn+1. Add a magnified callout showing the right triangle: vertical leg f(xn), horizontal leg f(xn)/f'(xn).

```python
import numpy as np; import matplotlib.pyplot as plt
x = np.linspace(0,2,100)
f = lambda x: x**3 - 2*x + 1
plt.plot(x,f(x))
xn = 0.5; fxn = f(xn); dfxn = 3*xn**2 - 2
xn1 = xn - fxn/dfxn
plt.plot([xn,xn],[0,fxn],'k--')
plt.plot([xn,xn1],[fxn,0],'r-',lw=2)
plt.plot(xn1,0,'ro')
plt.text(xn-0.1,fxn/2,'f(xn)',fontsize=12)
plt.text((xn+xn1)/2,-0.2,'f(xn)/f\'(xn)',fontsize=12)
plt.axhline(0,color='gray')
plt.xlim(0,2); plt.ylim(-1,2)
plt.show()
```

**Teacher Narration** `[93w]`
> Here is the compact formula for one step of Newton's method. Starting from your current guess x_n, you compute the function value and the derivative at that point. Then you subtract the ratio. The ratio f over f prime tells you the horizontal distance from your current point to where the tangent line hits the x-axis. This comes from the right triangle geometry: the vertical leg is f(x_n), the slope is f'(x_n), so the horizontal leg is f(x_n)/f'(x_n). So you're improving your guess by moving along the tangent line down to the axis.

---

### Slide 3 · [CORE]
**Derivation in Five Steps**  ·  `full_width`

**On-screen text** `[15w]`
Tangent line → find x-intercept → solve for x. That's all there is to it.

**FULL WIDTH** `[steps]`

1. Tangent line at (x_n, f(x_n)): $y = f(x_n) + f'(x_n)(x - x_n)$
2. Set $y = 0$ to find x-intercept: $0 = f(x_n) + f'(x_n)(x - x_n)$
3. Solve for $x$: $-f(x_n) = f'(x_n)(x - x_n)$
4. $x - x_n = -f(x_n)/f'(x_n)$
5. $x_{n+1} = x_n - f(x_n)/f'(x_n)$

**Teacher Narration** `[78w]`
> Let's quickly derive the formula. We start with the equation of the tangent line at the current guess. We set y to zero because we want to find where the tangent line crosses the x-axis. Then we solve algebraically for x. After simplifying, we get the Newton iteration. The derivation is just two lines of algebra, but the geometric insight is powerful: you are approximating the curve by a straight line and finding where that line hits zero.

---

### Slide 4 · [VISUAL_LAB] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Interactive Visual: Step Through Newton's Method**  ·  `split_left_right`

**On-screen text** `[11w]`
Try different initial guesses. Each step draws a new tangent line.

**LEFT** `[text]`

Adjust the initial guess and step through iterations. Watch the tangent lines converge to the root.

**RIGHT** `[visual_spec]`

*Visual Spec:* Function f(x) = x^3 - 2x^2 + x - 1. A slider for initial guess from -3 to 3. A button to step forward one iteration. Show current xn and f(xn) in text. Gray x-axis. Red tangent line for current step, previous steps in blue. Mark root with a star after convergence.

*Interactive Controls:*
  - 🎛 Slider for initial guess from -3 to 3
  - 🎛 Button to step through iterations

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider, Button
fig, ax = plt.subplots()
plt.subplots_adjust(bottom=0.3)
x_vals = np.linspace(-3,3,400)
f = lambda x: x**3 - 2*x**2 + x - 1
df = lambda x: 3*x**2 - 4*x + 1
ax.plot(x_vals, f(x_vals), 'k-')
ax.axhline(0, color='gray')
point, = ax.plot([],[], 'ro', markersize=8)
tangent_line, = ax.plot([],[], 'r--')
init_val = 1.0; xn = init_val; step = 0
ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_slider, 'x0', -3, 3, valinit=init_val)
def update(val):
    global xn, step
    xn = slider.val
    step = 0
    plot_step()
slider.on_changed(update)
ax_button = plt.axes([0.8, 0.05, 0.1, 0.04])
button = Button(ax_button, 'Step')
def step_once(event):
    global xn, step
    step += 1
    xn = xn - f(xn)/df(xn)
    plot_step()
button.on_clicked(step_once)
def plot_step():
    point.set_data([xn], [f(xn)])
    # tangent line
    t = np.linspace(xn-1, xn+1, 100)
    yt = f(xn) + df(xn)*(t - xn)
    tangent_line.set_data(t, yt)
    ax.set_title(f'Step {step}, xn = {xn:.4f}')
    plt.draw()
plot_step()
plt.show()
```

**Teacher Narration** `[72w]`
> Now let's see it in action. I'll start with an initial guess of 1. Notice the red tangent line. The point where it crosses the x-axis becomes the next guess. I can click step to advance. Already after three steps we are very close to the true root. Try dragging the initial guess slider to different values — see how the method sometimes converges faster or slower depending on where you start.

**Student Prompt:** Predict: for which initial guesses will the method fail?

---

### Slide 5 · [PRACTICE]
**Warm-Up: Square Root of 5**  ·  `full_width`

**On-screen text** `[12w]`
Starting with x0=2, after just two steps we have sqrt(5) ≈ 2.2361.

**FULL WIDTH** `[steps]`

**Problem:** Find $x_2$ for $f(x) = x^2 - 5$ starting with $x_0 = 2$.

| Step | Computation | Result |
|------|-------------|--------|
| 1 | $f'(x) = 2x$ | Derivative |
| 2 | $x_1 = 2 - \frac{-1}{4}$ | $x_1 = 2.25$ |
| 3 | $f(2.25) = 0.0625$, $f'(2.25)=4.5$ | Values |
| 4 | $x_2 = 2.25 - \frac{0.0625}{4.5}$ | $x_2 = 2.2361111$ |

True $\sqrt{5} \approx 2.2360679$. Already accurate to 4 decimal places!

**Teacher Narration** `[76w]`
> Let's work a simple example together. We want to find the square root of 5 using Newton's method. We set up the function f(x) equals x squared minus 5. Starting at x0 equals 2, we compute the derivative 2x. The first step gives 2.25. Then we plug that back in. After just one more step we get 2.236111 — already accurate to four decimal places. The true value is 2.23607. That's the power of Newton's method.

---

### Slide 6 · [PRACTICE]
**Standard: Cubic with Linear Term**  ·  `full_width`

**On-screen text** `[11w]`
Equation: x^3+2x-4=0, start at 1. After three iterations we get 1.1797.

**FULL WIDTH** `[steps]`

**Problem:** $x^3 + 2x - 4 = 0$, $x_1 = 1$, find $x_3$ to four decimal places.

| Step | Computation | Result |
|------|-------------|--------|
| 1 | $f'(x) = 3x^2 + 2$ | Derivative |
| 2 | $x_2 = 1 - \frac{-1}{5}$ | $x_2 = 1.2$ |
| 3 | $f(1.2)=0.128$, $f'(1.2)=6.32$ | Values |
| 4 | $x_3 = 1.2 - \frac{0.128}{6.32}$ | $x_3 = 1.1797$ |

**Answer:** $x_3 \approx 1.1797$

**Teacher Narration** `[76w]`
> Here's a typical exam problem. The function is x cubed plus 2x minus 4. Starting from x1 equals 1, we compute the derivative and get x2 equals 1.2. Then we evaluate the function and derivative at 1.2. Substituting into the formula gives x3 equals 1.1797. Always keep at least six decimal places during calculations for accuracy. You can verify by plugging 1.1797 back into the original equation; you should get a value very close to zero.

---

### Slide 7 · [MISCONCEPTION] 🟡
**Misconception: Division by Zero**  ·  `split_left_right`

**On-screen text** `[14w]`
If f'(x_n)=0, the tangent is horizontal and never hits the x-axis. Newton's method fails.

**LEFT** `[text]`

**Wrong attempt:** For $f(x)=x^3-3x+1$, starting at $x_0=1$:

$x_1 = 1 - \frac{-1}{0} \Rightarrow$ division by zero!

**Why it fails:** $f'(1)=0$, so the tangent line is horizontal. It never crosses the x-axis. Always check $f'(x_n) \neq 0$ before applying the formula.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^3-3x+1 from -2 to 3. Mark point (1, -1) with a horizontal tangent line (dashed). Extend line to show it remains horizontal, no intersection with x-axis. Highlight the derivative being zero.

```python
import numpy as np; import matplotlib.pyplot as plt
x = np.linspace(-2,3,400)
f = lambda x: x**3 - 3*x + 1
plt.plot(x, f(x)); plt.axhline(0,color='gray')
plt.plot(1, -1, 'ro', markersize=8)
plt.plot([-2,3], [-1,-1], 'r--', lw=2)
plt.text(1.1, -0.8, 'f \'(1)=0', fontsize=12, color='red')
plt.xlim(-2,3); plt.ylim(-3,5)
plt.show()
```

**Teacher Narration** `[66w]`
> A common mistake is to blindly apply the formula without checking the denominator. Here the derivative at x equals 1 is zero, giving a horizontal tangent. That tangent line never intersects the x-axis, so the method breaks down. Always verify that the derivative is nonzero at your current guess. If it is zero, you need to choose a different starting point or use a different method.

---

### Slide 8 · [PRACTICE] 🟡
**Tricky: Avoiding the Zero-Derivative Trap**  ·  `full_width`

**On-screen text** `[12w]`
Starting at x0=0 avoids the derivative zero. Now Newton's method converges quickly.

**FULL WIDTH** `[steps]`

**Problem:** $f(x)=x^3-3x+1$, start with $x_0=0$ instead of 1.

| Step | Computation | Result |
|------|-------------|--------|
| 1 | $f'(x)=3x^2-3$ | Derivative |
| 2 | $x_1=0 - \frac{1}{-3}$ | $x_1=0.3333$ |
| 3 | $f(0.3333)\approx0.0371$, $f'(0.3333)\approx-2.6667$ | Values |
| 4 | $x_2=0.3333 - \frac{0.0371}{-2.6667}$ | $x_2=0.3472$ |

Now the method works because the derivative is not zero at the new guesses.

**Teacher Narration** `[81w]`
> After seeing the division by zero at x equals 1, we can instead start at x equals 0. The derivative there is negative 3, so the update is well-defined. We compute x1 equals 0.3333, then x2 equals 0.3472. The method now converges nicely to the root around 0.3473. The lesson is: if one initial guess fails, try another. A quick graph of the function helps you choose a good starting point where the derivative is nonzero and the function changes sign.

---

### Slide 9 · [PAUSE_AND_TRY] 🔴 *[Challenge – Optional]* ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**[Challenge – Optional] Pause and Predict: Convergence or Divergence?**  ·  `split_left_right`

**On-screen text** `[10w]`
Cube root f(x)=x^(1/3) with root at 0. Will x0=1 converge?

**LEFT** `[text]`

Consider $f(x) = \sqrt[3]{x}$ (cube root). The root is at $x=0$.

If we start at $x_0=1$, will Newton's method converge to 0?

Take a moment to think...

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^(1/3) from -8 to 8. Mark root at 0. Show tangent at x0=1, then subsequent points x1=-2, x2=4, x3=-8. Use arrows to show the sequence bouncing away. Highlight the vertical tangent at 0.

*Interactive Controls:*
  - 🎛 Reveal button to show the answer after prediction

```python
import numpy as np; import matplotlib.pyplot as plt
x = np.linspace(-8, 8, 400, endpoint=True)
f = lambda x: np.cbrt(x)  # cube root
df = lambda x: (1/3)*(x**(-2/3)) if x!=0 else np.inf
plt.plot(x, f(x))
plt.axhline(0,color='gray')
xn = 1
for i in range(4):
    plt.plot(xn, f(xn), 'ro')
    t = np.linspace(xn-1, xn+1, 100)
    if xn != 0:
        yt = f(xn) + (xn**(-2/3)/3)*(t - xn)
        plt.plot(t, yt, 'r--')
    xn = xn - f(xn)/df(xn) if df(xn) != np.inf else 'stop'
    if isinstance(xn, str): break
plt.xlim(-8,8); plt.ylim(-3,3)
plt.show()
```

**Teacher Narration** `[84w]`
> Here's a more subtle case. The cube root function has a root at zero, but its derivative goes to infinity at zero — the tangent is vertical. Starting from x0 equals 1, compute the first step. See that x1 jumps to negative 2, then x2 to 4, then to negative 8. The method actually diverges, oscillating more and more wildly. Why? Because near the root, the tangent is nearly vertical, so the x-intercept is far away. This illustrates that Newton's method is not foolproof.

**Student Prompt:** Will the method converge or diverge? Write your prediction, then advance the slide.

---

### Slide 10 · [CORE] 🔴 *[Challenge – Optional]*
**[Challenge – Optional] Solution: Cube Root Divergence**  ·  `full_width`

**On-screen text** `[17w]`
Newton's method on cube root: sequence 1, -2, 4, -8, 16, … It diverges instead of converging.

**FULL WIDTH** `[steps]`

**Result:** The sequence $1, -2, 4, -8, 16, \dots$ diverges.

| Step | $x_n$ | $f(x_n)$ | $f'(x_n)$ | $x_{n+1}$ |
|------|-------|----------|-----------|-----------|
| 0 | 1 | 1 | 1/3 | -2 |
| 1 | -2 | $\sqrt[3]{-2}\approx -1.26$ | $(1/3)(-2)^{-2/3}\approx 0.21$ | 4 |
| 2 | 4 | $\sqrt[3]{4}\approx 1.59$ | $(1/3)4^{-2/3}\approx 0.21$ | -8 |

**Why:** The derivative at the root is infinite (vertical tangent). The linear approximation becomes very poor near the root.

**Teacher Narration** `[81w]`
> Here's the confirmed result. Starting at 1, the approximations bounce to negative 2, then 4, then negative 8. The absolute error doubles each step. The reason is the vertical tangent at the root: the linear approximation is not a good proxy for the function near zero. This is an important lesson: Newton's method requires the derivative to be nonzero at the root for quadratic convergence. If the derivative is infinite or zero at the root, convergence may be slow or absent.

---

### Slide 11 · [PRACTICE] 🟡
**Application: Car Loan Interest Rate**  ·  `full_width`

**On-screen text** `[13w]`
Real-world: Car loan rate solver. Newton's method finds the monthly interest rate quickly.

**FULL WIDTH** `[steps]`

**Problem:** $18,000 loan, 60 monthly payments of $375. Find the monthly interest rate $x$.

Equation: $f(x) = 48x(1+x)^{60} - (1+x)^{60} + 1 = 0$

| Step | Action | Result |
|------|--------|--------|
| 1 | $f'(x) = 48(1+x)^{60} + (2880x - 60)(1+x)^{59}$ | Derivative |
| 2 | Start with $x_0 = 0.01$ (1% monthly) | Initial guess |
| 3 | $x_1 = 0.01 - \frac{0.0553}{31.25}$ | $x_1 = 0.00823$ |
| 4 | After few more iterations | $x \approx 0.00823$ (0.823% monthly) |

**Note:** This equation cannot be solved algebraically — Newton's method is essential.

**Teacher Narration** `[96w]`
> Let's see a real application. A car loan of 18,000 dollars repaid over 60 monthly payments of 375 dollars each. The equation relating these involves the term 1 plus x to the 60th power. This is impossible to solve by hand algebraically. We set up the function and its derivative, start with a guess of 1 percent monthly, and apply Newton's method. In just one step we get 0.823 percent. A few more iterations refine it. This is why Newton's method is so powerful: it handles equations with exponentials and radicals that have no closed-form solution.

---

### Slide 12 · [VISUAL_LAB] ⏸️ *[YouTube Pause]* 🎛 *[3 controls]*
**Interactive: Convergence vs Initial Guess**  ·  `split_left_right`

**On-screen text** `[14w]`
Choose a function and initial guess. The method might converge (green) or diverge (red).

**LEFT** `[text]`

Use the dropdown to choose a function and the slider to pick an initial guess. See if Newton's method converges (green) or diverges (red).

**RIGHT** `[visual_spec]`

*Visual Spec:* Dropdown: functions with names. Slider: x0 from -5 to 5. Button: 'Run 10 iterations'. Plot: function line, initial guess point, subsequent points connected with arrows. Text showing convergence status and final iterate.

*Interactive Controls:*
  - 🎛 Radio buttons to select function
  - 🎛 Slider for initial guess
  - 🎛 Button to run 10 iterations

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider, Button, RadioButtons
fig, ax = plt.subplots()
plt.subplots_adjust(bottom=0.4)
x_vals = np.linspace(-5,5,400)
funcs = {'x^2-2': lambda x: x**2-2, 'x^3-2x-5': lambda x: x**3-2*x-5, 'cos(x)-x': lambda x: np.cos(x)-x}
derivs = {'x^2-2': lambda x: 2*x, 'x^3-2x-5': lambda x: 3*x**2-2, 'cos(x)-x': lambda x: -np.sin(x)-1}
cur_func_name = 'x^2-2'
ax_slider = plt.axes([0.2, 0.25, 0.6, 0.03])
slider = Slider(ax_slider, 'x0', -5, 5, valinit=1)
ax_radio = plt.axes([0.05, 0.05, 0.15, 0.15])
radio = RadioButtons(ax_radio, list(funcs.keys()))
ax_button = plt.axes([0.7, 0.05, 0.2, 0.04])
button = Button(ax_button, 'Run 10 iter')
line, = ax.plot([],[], 'r-', lw=2)
points, = ax.plot([],[], 'go', markersize=8)
final_text = ax.text(0.5,0.9,'', transform=ax.transAxes)
def run(event):
    cur_func = funcs[cur_func_name]
    cur_deriv = derivs[cur_func_name]
    x0 = slider.val
    xn = x0
    n=10
    xs = [xn]
    for i in range(n):
        if cur_deriv(xn) == 0:
            break
        xn = xn - cur_func(xn)/cur_deriv(xn)
        xs.append(xn)
    # plot function
    x_plt = np.linspace(min(-5, min(xs)-1), max(5, max(xs)+1), 400)
    y_plt = cur_func(x_plt)
    line.set_data(x_plt, y_plt)
    points.set_data(xs, [cur_func(x) for x in xs])
    # check convergence
    if abs(xs[-1] - xs[-2]) < 1e-6:
        final_text.set_text(f'Converged to {xs[-1]:.6f}')
        points.set_color('green')
    else:
        final_text.set_text('Diverged or not converged')
        points.set_color('red')
    ax.set_xlim(min(x_plt), max(x_plt)); ax.set_ylim(min(y_plt)-1, max(y_plt)+1)
    ax.axhline(0, color='gray')
    plt.draw()
button.on_clicked(run)
def radio_on(label):
    global cur_func_name
    cur_func_name = label
    run(None)
radio.on_clicked(radio_on)
plt.show()
```

**Teacher Narration** `[87w]`
> Now you can explore convergence behavior yourself. Select a function from the dropdown. Use the slider to choose a starting guess, then click the button to run ten iterations. The points will be colored green if they approach a root closely, red if they diverge or get stuck. Try x squared minus 2 starting at 2 — it converges quickly to the square root of 2. Now try the cubic function starting around 1.5. You'll see that a poor initial guess can lead to divergence or cycling.

**Student Prompt:** Which initial guesses cause divergence for the cubic function?

---

### Slide 13 · [CORE] 🟡
**Convergence Behavior: Quadratic Convergence**  ·  `full_width`

**On-screen text** `[16w]`
Quadratic convergence: correct digits double each step. But check f'(r) ≠ 0 and guess close enough.

**FULL WIDTH** `[text]`

**Quadratic convergence:**
- If error at step $n$ is $|r - x_n| \approx 10^{-k}$, then error at step $n+1$ is $|r - x_{n+1}| \approx 10^{-2k}$.
- This means number of correct digits approximately doubles each step.

**Conditions for quadratic convergence:**
- $f$ is twice differentiable near root $r$.
- $f(r)=0$ and $f'(r) \neq 0$.
- Initial guess $x_0$ is close enough to $r$.

**Failure modes:**
- $f'(x_n)=0$ : horizontal tangent.
- $f'(r)=0$ : multiple roots (convergence linear).
- Derivative undefined at root (e.g., cube root).
- Initial guess too far, leading to divergence.

**Teacher Narration** `[84w]`
> When the stars align, Newton's method converges quadratically. That means if you have two correct decimal places at one iteration, you'll have about four at the next, then eight, then sixteen. This is extremely fast. The conditions are that the function is smooth, the derivative at the root is nonzero, and your initial guess is in the 'basin of attraction'. When these fail, convergence may be slower or not happen at all. Knowing these conditions helps you diagnose problems and choose better starting points.

---

### Slide 14 · [PRACTICE] *(skip if time-limited)*
**Practice Problem Ladder**  ·  `full_width`

**On-screen text** `[8w]`
Try these: easy, medium, hard, challenge. Answers provided.

**FULL WIDTH** `[text]`

**Easy:** $f(x)=x^3-8$, $x_0=2$. Find $x_1$.
- $x_1 = 2$ (already at root!)

**Medium:** $f(x)=\cos x - x$, $x_0=1$. Find $x_2$.
- $x_1\approx0.7504$, $x_2\approx0.7391$

**Hard:** $f(x)=x^5 - x - 1 = 0$, $x_0=1$. Find root to 6 decimal places.
- $x\approx1.167304$

**Challenge:** Use Newton's method to find $\sqrt[5]{100}$ correct to 6 decimals.
- $x\approx2.511886$

**Teacher Narration** `[85w]`
> Here's a ladder of problems to test your understanding. The easy one simply checks that you know the formula: starting at the root gives no change. The medium uses the equation cos x equals x — a transcendental equation that you can only solve numerically. The hard and challenge require multiple iterations to reach six decimal places. I strongly recommend you work through at least the medium and hard ones on paper or with a calculator. Attempt the challenge if you want to go further.

---

### Slide 15 · [CORE]
**Pro Tips for Newton's Method**  ·  `full_width`

**On-screen text** `[18w]`
Tips: separate f and f' calculations, keep extra decimals, verify by substitution, use Babylonian shortcut for square roots.

**FULL WIDTH** `[text]`

• **Exam speed:** Compute $f(x_n)$ and $f'(x_n)$ separately before dividing.
• **Precision:** Keep 6-8 decimal places during iteration; round only the final answer.
• **Verification:** After finding an approximate root, plug back into the original equation to check.
• **Shortcut for $\sqrt{a}$:** $x_{n+1} = \frac{1}{2}\left(x_n + \frac{a}{x_n}\right)$ — the Babylonian method.
• **Check:** Graph the function first to choose a good initial guess.

**Teacher Narration** `[94w]`
> Here are some practical tips. When you're in an exam, work step by step and write down the function value and derivative separately before dividing. This reduces errors. Keep a few extra decimals along the way; only round at the very end. Always check your answer by substituting back into the original equation — it should be close to zero. There's a neat shortcut for square roots: the iteration simplifies to the average of x_n and a divided by x_n. And finally, a quick sketch of the function helps you avoid bad initial guesses.

---

### Slide 16 · [SUMMARY]
**Summary: Key Takeaways**  ·  `full_width`

**On-screen text** `[13w]`
Remember: formula, tangent line idea, quadratic convergence, failure modes, and check your work.

**FULL WIDTH** `[text]`

**Newton's Method:** $x_{n+1} = x_n - f(x_n)/f'(x_n)$

**Geometric Idea:** Use tangent lines to approximate the curve and find where they cross the x-axis.

**Convergence:** Quadratic if $f'(r)\neq0$ and initial guess is close.

**Failures:** $f'(x_n)=0$, vertical tangent at root, poor initial guess.

**Always:** Check derivative, keep extra precision, verify result.

**Teacher Narration** `[86w]`
> Let's recap what we've covered. Newton's method is a powerful iterative technique for solving equations numerically. The formula is simple: each new guess is the old guess minus the ratio of the function to its derivative. Geometrically, we are following tangent lines to the x-axis. The method converges quadratically if the conditions are right, but it can fail if the derivative is zero or if the initial guess is too far off. Always check your derivative and your result. Now go practice with the take-home problems.

---
