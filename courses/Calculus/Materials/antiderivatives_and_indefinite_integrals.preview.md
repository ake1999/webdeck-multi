# Antiderivatives and Indefinite Integrals

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You should know how to differentiate polynomial, trigonometric, exponential, and logarithmic functions.

**Learning Objectives:**
- Calculate antiderivatives using the power rule and standard formulas
- Interpret the indefinite integral as a family of functions
- Apply constant multiple and sum rules to integrate expressions
- Solve initial value problems to find specific functions

---

## v3.1 Production Readiness

✅ **Interactive moments:** 4 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 78w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 15 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 4 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ |  | 87w | 13w | From Speedometer to Road Trip |
| 2 | 🎛core | 🟢 | ◧ |  | 89w | 13w | Definition of Indefinite Integral |
| 3 | 🎛core | 🟢 | ◧ | ⏸️ | 103w | 14w | Power Rule for Integration |
| 4 | core | 🟢 | ◧ |  | 71w | 14w | Constant Multiple and Sum Rules |
| 5 | practice | 🟢 | ⬛⬛ |  | 75w | 6w | Example 1: Warm-Up — Direct Power Rule |
| 6 | practice | 🟢 | ⬛⬛ |  | 82w | 12w | Example 2: Standard — Polynomial with Sum Rule |
| 7 | practice | 🟡 | ⬛⬛ | ⏸️ | 70w | 10w | Example 3: Tricky — Negative Exponents |
| 8 | pause_and_try | 🟡 | ◧ | ⏸️ | 71w | 10w | Pause and Try: Predict the Integral of 1/x |
| 9 | practice | 🟢 | ⬛⬛ |  | 73w | 13w | Example 4: Edge Case — Integral of 1/x |
| 10 | practice | 🟢 | ⬛⬛ |  | 84w | 11w | Example 5: Application — Initial Value Problem |
| 11 | misconception | 🟢 | ◧ |  | 77w | 14w | Common Mistake: Forgetting +C or Misusing Power Rule |
| 12 | 🎛visual_lab | 🟢 | ◧ |  | 79w | 13w | Visual Lab: Explore the Family of Antiderivatives |
| 13 | challenge | 🔴 | ◧ |  | 65w | 12w | [Challenge – Optional] Why Antiderivatives Differ by a Constant |
| 14 | practice | 🟢 | ⬛⬛ | ⏸️ | 76w | 7w | Quick Check: MCQ — Test Your Understanding |
| 15 | summary | 🟢 | ⬛⬛ |  | 69w | 16w | Key Takeaways |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**From Speedometer to Road Trip**  ·  `split_left_right`

**On-screen text** `[13w]`
A speedometer gives velocity. Antidifferentiation recovers position — up to a constant shift.

**LEFT** `[text]`

If I hand you a speedometer reading at every moment, can you reconstruct the entire road trip? You'd know the shape of the journey, but not where you started. That missing starting point is the constant of integration.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two panels: top panel shows a family of position curves (parabolas with different vertical shifts), bottom panel shows the shared velocity curve (linear). Animate a car moving along one position curve while the velocity graph highlights the corresponding point. Use a slider to shift the position curve up/down (changing initial displacement). The student should see that all curves have the same shape and the same derivative (velocity).

*Interactive Controls:*
  - 🎛 Slider for initial displacement C from -30 to 30

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

t = np.linspace(0, 10, 500)
v = 2*t + 3  # linear velocity

def position(t, C):
    return t**2 + 3*t + C

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(8, 6), sharex=True)
plt.subplots_adjust(bottom=0.25)

C_init = 0
line1, = ax1.plot(t, position(t, C_init), 'b-', label='Position')
ax1.set_ylabel('Position (m)')
ax1.set_ylim(-20, 100)
ax1.grid(True)
ax1.legend()

line2, = ax2.plot(t, v, 'r-', label='Velocity')
ax2.set_xlabel('Time (s)')
ax2.set_ylabel('Velocity (m/s)')
ax2.grid(True)
ax2.legend()

ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 'Initial displacement C', -30, 30, valinit=C_init)

def update(val):
    C = slider.val
    line1.set_ydata(position(t, C))
    fig.canvas.draw_idle()

slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[87w]`
> Imagine you're given the speedometer reading of a car at every instant. Can you reconstruct the whole road trip? You can determine the shape of the journey, but you won't know where the car started. That missing starting point, a constant vertical shift, is exactly the constant of integration. In the animation, moving the slider shifts the position curve up or down, but the velocity curve never changes. That's the central idea of indefinite integrals: they give a whole family of functions, all related by a constant.

**Student Prompt:** Predict: If you shift the position curve upward by 5 units, what happens to the velocity curve?

---

### Slide 2 · [CORE] 🎛 *[1 controls]*
**Definition of Indefinite Integral**  ·  `split_left_right`

**On-screen text** `[13w]`
The indefinite integral is the family of ALL functions whose derivative equals f(x).

**LEFT** `[formula_block]`

$$\int f(x)\,dx = F(x) + C \quad \text{where} \quad F'(x) = f(x)$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a slope field for f(x)=x^2 over x in [-3,3], y in [-5,5]. Overlay four antiderivative curves F(x)=x^3/3+C for C=-2,0,2,4 in different colors. Include a legend. Optionally add a slider that changes C and highlights the corresponding antiderivative curve. The student should notice that all curves have the same slope at any given x.

*Interactive Controls:*
  - 🎛 Slider for C from -5 to 5

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

x = np.linspace(-3, 3, 20)
y = np.linspace(-5, 5, 20)
X, Y = np.meshgrid(x, y)
U = np.ones_like(X)
V = X**2
M = np.hypot(U, V)
U = U/M
V = V/M

fig, ax = plt.subplots(figsize=(8,6))
plt.subplots_adjust(bottom=0.2)
ax.quiver(X, Y, U, V, alpha=0.6, width=0.003)

def F(x, C):
    return x**3/3 + C

C_vals = [-2, 0, 2, 4]
colors = ['red', 'green', 'blue', 'purple']
x_plot = np.linspace(-3, 3, 400)
for C, col in zip(C_vals, colors):
    ax.plot(x_plot, F(x_plot, C), color=col, label=f'C = {C}')
ax.set_xlim(-3, 3)
ax.set_ylim(-5, 5)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Slope field of f(x)=x² and antiderivatives')
ax.grid(True, alpha=0.3)
ax.legend()

# Add slider to explore more C values
ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_slider, 'C', -5, 5, valinit=0)
line, = ax.plot([], [], 'orange', lw=3, label='Selected C')
def update(val):
    line.set_data(x_plot, F(x_plot, slider.val))
    fig.canvas.draw_idle()
slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[89w]`
> Formally, we write the indefinite integral of f of x as the antiderivative F(x) plus an arbitrary constant C. This constant represents the infinite family of functions that all have the same derivative — they're just shifted vertically. Look at the slope field on the right: tiny line segments show the slope at each point. Any curve following these slopes is an antiderivative. Notice that the curves are all identical in shape; they only differ by a vertical shift. And crucially, the derivative of each is exactly the same.

---

### Slide 3 · [CORE] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Power Rule for Integration**  ·  `split_left_right`

**On-screen text** `[14w]`
To integrate a power: increase exponent by 1, then divide by the new exponent.

**LEFT** `[formula_block]`

$$\int x^n\,dx = \frac{x^{n+1}}{n+1} + C, \quad n \neq -1$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^3 (dashed) and F(x)=x^4/4 (solid) on the same axes from x=-2 to 2. Label both. Add a text annotation showing the derivative of F equals f. Optionally include a slider to change the exponent n (integer from 1 to 4) and update the plots accordingly, along with the formula.

*Interactive Controls:*
  - 🎛 Slider for exponent n from 1 to 4 (integer step)

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(8,6))
plt.subplots_adjust(bottom=0.25)

x = np.linspace(-2, 2, 400)
n_init = 3
f = lambda x, n: x**n
F = lambda x, n: x**(n+1)/(n+1)

line_f, = ax.plot(x, f(x, n_init), 'r--', label='f(x)')
line_F, = ax.plot(x, F(x, n_init), 'b-', label='F(x) antiderivative')
ax.axhline(0, color='gray', lw=0.5)
ax.axvline(0, color='gray', lw=0.5)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_ylim(-4, 4)
ax.grid(True, alpha=0.3)
ax.legend()

text = ax.text(0.5, 3, f'n = {n_init}', fontsize=12)

ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 'Exponent n', 1, 4, valinit=n_init, valstep=1)

def update(val):
    n = int(slider.val)
    line_f.set_ydata(f(x, n))
    line_F.set_ydata(F(x, n))
    text.set_text(f'n = {n}')
    fig.canvas.draw_idle()

slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[103w]`
> The power rule for integration is the reverse of the power rule for differentiation. If the derivative of x to the n plus 1 over n plus 1 is x to the n, then conversely, the antiderivative of x to the n must be x to the n plus 1 over n plus 1. But remember: n cannot be negative one, because we'd be dividing by zero. We'll handle that special case later. In the animation, slide the exponent and watch how both the function and its antiderivative change. Check that the derivative of the blue curve always matches the red dashed curve.

**Student Prompt:** Before moving the slider, predict: For n=2, what is the antiderivative formula?

---

### Slide 4 · [CORE]
**Constant Multiple and Sum Rules**  ·  `split_left_right`

**On-screen text** `[14w]`
Constants factor out, sums break apart. But no product or quotient rule for integrals.

**LEFT** `[text]`

$$\int c\,f(x)\,dx = c\int f(x)\,dx$$

$$\int [f(x) \pm g(x)]\,dx = \int f(x)\,dx \pm \int g(x)\,dx$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two functions f(x)=x^2, g(x)=2x, and their sum h(x)=x^2+2x over x in [-1,3]. Shade the area under each from x=0 to x=2. Show three separate shaded regions (for f, g, and f+g). Add labels. The visual demonstrates that the integral of the sum equals the sum of the integrals.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-1, 3, 400)
f = x**2
g = 2*x
h = f + g

fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(8, 10), sharex=True)

ax1.plot(x, f, 'b-', label='f(x)=x²')
ax1.fill_between(x, f, where=(x>=0)&(x<=2), alpha=0.3, color='blue')
ax1.set_ylabel('y')
ax1.set_title('f(x)')
ax1.grid(True, alpha=0.3)
ax1.legend()

ax2.plot(x, g, 'r-', label='g(x)=2x')
ax2.fill_between(x, g, where=(x>=0)&(x<=2), alpha=0.3, color='red')
ax2.set_ylabel('y')
ax2.set_title('g(x)')
ax2.grid(True, alpha=0.3)
ax2.legend()

ax3.plot(x, h, 'g-', label='f(x)+g(x)')
ax3.fill_between(x, h, where=(x>=0)&(x<=2), alpha=0.3, color='green')
ax3.set_xlabel('x')
ax3.set_ylabel('y')
ax3.set_title('f(x)+g(x)')
ax3.grid(True, alpha=0.3)
ax3.legend()

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[71w]`
> Just like with derivatives, constants pull out in front of the integral, and the integral of a sum is the sum of the integrals. This makes integrating polynomials straightforward: handle each term separately. But a major difference from differentiation is that there is no product rule or quotient rule for integration. You can't just integrate a product by taking the product of the integrals. We'll need special techniques for products later.

---

### Slide 5 · [PRACTICE]
**Example 1: Warm-Up — Direct Power Rule**  ·  `full_width`

**On-screen text** `[6w]`
Integrate x^7 using the power rule.

**FULL WIDTH** `[steps]`

**Problem:** $\int x^7\,dx$

| Step | Action |
|------|--------|
| 1 | Identify $n=7$ |
| 2 | Apply power rule: $\frac{x^{8}}{8} + C$ |
| 3 | Simplify: $\frac{x^{8}}{8} + C$ |

**Check:** $\frac{d}{dx}\left(\frac{x^{8}}{8} + C\right) = x^7$ ✓

**Teacher Narration** `[75w]`
> Let's start with a simple application of the power rule. The integrand is x to the seventh. We increase the exponent by one to get x to the eighth, then divide by the new exponent, eight. Add the constant of integration. To verify, differentiate your answer: the derivative of x to the eighth over eight is x to the seventh, and the derivative of a constant is zero. So we get back the original function.

---

### Slide 6 · [PRACTICE]
**Example 2: Standard — Polynomial with Sum Rule**  ·  `full_width`

**On-screen text** `[12w]`
Integrate a polynomial term-by-term using the sum rule and constant multiple rule.

**FULL WIDTH** `[steps]`

**Problem:** $\int (3x^2 - 4x + 7)\,dx$

| Step | Action |
|------|--------|
| 1 | Split sum: $\int 3x^2\,dx - \int 4x\,dx + \int 7\,dx$ |
| 2 | Factor constants: $3\int x^2\,dx - 4\int x\,dx + 7\int 1\,dx$ |
| 3 | Integrate each: $3\left(\frac{x^3}{3}\right) - 4\left(\frac{x^2}{2}\right) + 7x + C$ |
| 4 | Simplify: $x^3 - 2x^2 + 7x + C$ |

**Check:** $\frac{d}{dx}(x^3 - 2x^2 + 7x + C) = 3x^2 - 4x + 7$ ✓

**Teacher Narration** `[82w]`
> Now we integrate a polynomial. Use the sum rule to split into three separate integrals. Then factor out the constants: three, negative four, and seven. Now integrate each using the power rule. The antiderivative of x squared is x cubed over three, multiplied by three gives just x cubed. For negative four x, the antiderivative of x is x squared over two, times negative four gives negative two x squared. The constant seven integrates to seven x. Don't forget the plus C.

---

### Slide 7 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Example 3: Tricky — Negative Exponents**  ·  `full_width`

**On-screen text** `[10w]`
Integrate 1/x^3 as a negative power. Watch the sign carefully.

**FULL WIDTH** `[steps]`

**Problem:** $\int \frac{1}{x^3}\,dx$

| Step | Action |
|------|--------|
| 1 | Rewrite: $\int x^{-3}\,dx$ |
| 2 | Apply power rule: $\frac{x^{-2}}{-2} + C$ |
| 3 | Simplify: $-\frac{1}{2x^2} + C$ |

**Common mistake:** Writing $\frac{x^{-2}}{2} + C$ (missing sign).

**Teacher Narration** `[70w]`
> Tricky: we can write one over x cubed as x to the negative three. Then apply the power rule: increase exponent by one to get negative two, divide by negative two. That gives negative x to the negative two over two, or negative one over two x squared. The most common mistake here is forgetting the negative sign from dividing by a negative number. Always check by differentiating your answer.

**Student Prompt:** Before looking at the answer, try integrating 1/x^4 yourself.

---

### Slide 8 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]*
**Pause and Try: Predict the Integral of 1/x**  ·  `split_left_right`

**On-screen text** `[10w]`
What is ∫ (1/x) dx? The power rule fails here.

**LEFT** `[text]`

What do you think $\int \frac{1}{x}\,dx$ is? Try using the power rule. What happens?

**RIGHT** `[visual_spec]`

*Visual Spec:* Simple plot of the function 1/x over positive and negative x, with axes labeled. No solution shown. This is a pause slide for prediction.

**Teacher Narration** `[71w]`
> Pause for a moment. Try to integrate one over x using the power rule. What goes wrong? Notice that if n equals negative one, then n plus one is zero, and we cannot divide by zero. So the power rule does not apply. There is a special antiderivative for this function. Think back to derivatives: what function gives one over x when differentiated? We'll reveal the answer on the next slide.

**Student Prompt:** Write down your guess for ∫ (1/x) dx before continuing.

---

### Slide 9 · [PRACTICE]
**Example 4: Edge Case — Integral of 1/x**  ·  `full_width`

**On-screen text** `[13w]`
∫ (1/x) dx = ln|x| + C. The power rule fails for n=-1.

**FULL WIDTH** `[steps]`

**Problem:** $\int \frac{1}{x}\,dx$

**Solution:** $\ln|x| + C$

**Why?** $\frac{d}{dx}\ln|x| = \frac{1}{x}$ for $x \neq 0$.
- For $x>0$: $\frac{d}{dx}\ln x = \frac{1}{x}$
- For $x<0$: $\frac{d}{dx}\ln(-x) = \frac{1}{x}$

Absolute value is needed because the domain of 1/x excludes zero.

**Teacher Narration** `[73w]`
> The antiderivative of one over x is the natural logarithm of the absolute value of x, plus C. Why the absolute value? Because the derivative of ln x for positive x is one over x, and the derivative of ln of negative x for negative x is also one over x. So the absolute value covers both cases. This is a critical formula to memorize: it's the one exception to the power rule.

**Student Prompt:** Verify by differentiating ln|x| for x>0 and x<0.

---

### Slide 10 · [PRACTICE]
**Example 5: Application — Initial Value Problem**  ·  `full_width`

**On-screen text** `[11w]`
Given velocity and initial position, find position. The constant becomes specific.

**FULL WIDTH** `[steps]`

**Problem:** A particle moves with velocity $v(t) = 3t^2 - 2t + 1$ m/s. At $t=0$, position $s(0)=4$ m. Find $s(t)$.

| Step | Action |
|------|--------|
| 1 | $s(t) = \int v(t)\,dt$ |
| 2 | Integrate: $s(t) = t^3 - t^2 + t + C$ |
| 3 | Use $s(0)=4$: $0 - 0 + 0 + C = 4$ |
| 4 | So $C=4$, $s(t) = t^3 - t^2 + t + 4$ |

**Crucial:** The constant is no longer arbitrary; it's determined by the initial condition.

**Teacher Narration** `[84w]`
> This is a classic physics application. Position is the antiderivative of velocity. Integrate the velocity function to get t cubed minus t squared plus t plus C. But we need a specific position function. We use the initial condition: at time zero, position is four meters. Plugging in t equals zero gives C equals four. So the position function is t cubed minus t squared plus t plus four. Notice that the constant is no longer arbitrary — it's fixed by the initial condition.

---

### Slide 11 · [MISCONCEPTION]
**Common Mistake: Forgetting +C or Misusing Power Rule**  ·  `split_left_right`

**On-screen text** `[14w]`
Forgetting +C loses infinitely many solutions. For 1/x, power rule gives division by zero.

**LEFT** `[text]`

**Wrong:** $\int x^2\,dx = \frac{x^3}{3}$ (missing $+C$) 

**Wrong:** $\int \frac{1}{x}\,dx = \frac{x^0}{0}$ (division by zero, meaningless)

**Correct:** $\int x^2\,dx = \frac{x^3}{3} + C$

**Correct:** $\int \frac{1}{x}\,dx = \ln|x| + C$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the curves y = x^3/3 and y = x^3/3 + 2 over x in [-2,2]. Also show the derivative f(x)=x^2 as a dashed line. Label that both curves have the same slope at each x but differ by a constant. This visually reinforces why the +C is necessary.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2, 2, 400)
f = x**2
F1 = x**3/3
F2 = x**3/3 + 2

plt.figure(figsize=(8,6))
plt.plot(x, F1, 'b-', label='F(x)=x³/3 (C=0)')
plt.plot(x, F2, 'r-', label='F(x)=x³/3+2 (C=2)')
plt.plot(x, f, 'g--', alpha=0.7, label='f(x)=x² (derivative)')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Two Antiderivatives of x²: Missing +C loses the red curve')
plt.grid(True, alpha=0.3)
plt.legend()
plt.axhline(0, color='gray', lw=0.5)
plt.axvline(0, color='gray', lw=0.5)
plt.show()
```

**Teacher Narration** `[77w]`
> Two common errors to avoid. First: never forget the plus C. If you do, you're only giving one particular antiderivative instead of the whole family. In the graph, if you forget plus C, you'd only get the blue curve, but the red curve is equally valid. Second: don't try to force the power rule on one over x. It leads to division by zero, which is meaningless. That function has its own special rule with natural log.

---

### Slide 12 · [VISUAL_LAB] 🎛 *[2 controls]*
**Visual Lab: Explore the Family of Antiderivatives**  ·  `split_left_right`

**On-screen text** `[13w]`
Explore how changing C shifts the antiderivative vertically, while n changes the shape.

**LEFT** `[text]`

Adjust the constant C and exponent n to see how the antiderivative family changes. The derivative (slope) stays the same at each x.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot both f(x) (dashed) and F(x) (solid) for n from -3 to 4 (excluding -1). Two sliders: one for C (range -5 to 5), one for n (range -3 to 4 step 0.5, but skip -1 with validation). When n=-1, display a warning and show the 1/x case separately. Also show the derivative check: the slope of F at a point equals f at that point, visualized by a tangent line at a movable x position.

*Interactive Controls:*
  - 🎛 Slider for exponent n from -3 to 4 (step 0.5, with validation for n=-1)
  - 🎛 Slider for constant C from -5 to 5

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(8,6))
plt.subplots_adjust(bottom=0.3)

x = np.linspace(-3, 3, 400)
n_init = 2
C_init = 1

f = lambda x, n: x**n
F = lambda x, n, C: (x**(n+1))/(n+1) + C if n != -1 else np.log(np.abs(x)) + C

# Handle n=-1 separately for F (log domain issues)
def safe_F(x, n, C):
    if n == -1:
        return np.where(x != 0, np.log(np.abs(x)) + C, np.nan)
    else:
        return (x**(n+1))/(n+1) + C

line_f, = ax.plot(x, f(x, n_init), 'r--', label='f(x)=x^n', lw=2)
line_F, = ax.plot(x, safe_F(x, n_init, C_init), 'b-', label='F(x)+C', lw=2)
ax.set_ylim(-5, 5)
ax.axhline(0, color='gray')
ax.axvline(0, color='gray')
ax.grid(True, alpha=0.3)
ax.legend()

# Slider for n
ax_n = plt.axes([0.2, 0.15, 0.6, 0.03])
slider_n = Slider(ax_n, 'n', -3, 4, valinit=n_init, valstep=0.5)

# Slider for C
ax_C = plt.axes([0.2, 0.1, 0.6, 0.03])
slider_C = Slider(ax_C, 'C', -5, 5, valinit=C_init)

def update(val):
    n = slider_n.val
    C = slider_C.val
    # Update f
    line_f.set_ydata(f(x, n))
    # Update F: if n=-1, show log; else power rule
    line_F.set_ydata(safe_F(x, n, C))
    ax.set_title(f'n = {n:.1f}, C = {C:.1f}')
    fig.canvas.draw_idle()

slider_n.on_changed(update)
slider_C.on_changed(update)

plt.show()
```

**Teacher Narration** `[79w]`
> Here you can experiment with the power rule. Use the slider for n to change the exponent. Watch how the function and its antiderivative change shape. When n is negative one, notice the function becomes one over x and the antiderivative switches to log. The second slider adjusts C, shifting the antiderivative vertically. This confirms that the constant does not affect the derivative: the slope of F at any x depends only on n and x, not on C.

**Student Prompt:** Try setting n=3. Then move the C slider. Does the slope of F change at any x?

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Why Antiderivatives Differ by a Constant**  ·  `split_left_right`

**On-screen text** `[12w]`
If two functions have the same derivative, they differ by a constant.

**LEFT** `[text]`

**Theorem:** If $F'(x)=G'(x)$ for all $x$ in an interval, then $F(x)=G(x)+C$.

*Proof:* Let $H(x)=F(x)-G(x)$. Then $H'(x)=0$, so $H$ is constant.

**Why $H'=0$ implies $H$ constant?**
By the Mean Value Theorem, for any $a<b$, there exists $c$ in $(a,b)$ such that $H'(c)=\frac{H(b)-H(a)}{b-a}$. Since $H'(c)=0$, we get $H(b)=H(a)$. So $H$ is constant.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two functions that are vertical shifts of each other, e.g., sin(x) and sin(x)+1. At a point, show the difference H(x) = constant, and note that its derivative is zero. Use an animation to emphasize that the vertical gap is fixed.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 4*np.pi, 400)
F = np.sin(x)
G = np.sin(x) + 2
H = G - F  # constant = 2

plt.figure(figsize=(8,6))
plt.plot(x, F, 'b-', label='F(x) = sin(x)')
plt.plot(x, G, 'r-', label='G(x) = sin(x) + 2')
plt.plot(x, H, 'g--', label='H(x) = G(x)-F(x) = 2')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Two functions differing by a constant: their difference is constant')
plt.grid(True, alpha=0.3)
plt.legend()
# Add horizontal line at y=2 for clarity
plt.axhline(y=2, color='green', alpha=0.5)
plt.show()
```

**Teacher Narration** `[65w]`
> This is the theoretical justification for the plus C. Suppose F and G are both antiderivatives of the same function f. Then their difference H has derivative f minus f equals zero. By the Mean Value Theorem, a function whose derivative is everywhere zero must be constant. Therefore F and G differ by a constant. This is why the indefinite integral includes an additive constant.

---

### Slide 14 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Quick Check: MCQ — Test Your Understanding**  ·  `full_width`

**On-screen text** `[7w]`
Three multiple-choice questions to check your understanding.

**FULL WIDTH** `[text]`

**Q1:** Which is $\int (4x^3 - 6x^2 + 2)\,dx$ ?

A) $x^4 - 2x^3 + 2x + C$
B) $12x^2 - 12x + C$
C) $x^4 - 2x^3 + 2x$
D) $4x^4 - 6x^3 + 2x + C$

---

**Q2:** What is $\int \sqrt{x}\,dx$ ?

A) $\frac{2}{3}x^{3/2} + C$
B) $\frac{1}{2\sqrt{x}} + C$
C) $\frac{3}{2}x^{3/2} + C$
D) $\frac{2}{3}x^{2/3} + C$

---

**Q3:** If $F'(x)=\frac{1}{x}$ and $F(1)=3$, then $F(x)=$ ?

A) $\ln x + 3$
B) $\ln|x| + 3$
C) $\ln|x| - 3$
D) $\ln|x| + 2$

*Answers: Q1:A, Q2:A, Q3:B*

**Teacher Narration** `[76w]`
> Pause the video and try these three quick questions. For Q1, integrate term by term: 4x^3 gives x^4, -6x^2 gives -2x^3, 2 gives 2x, plus C. That's option A. Option C is missing the constant. For Q2, rewrite sqrt(x) as x to the 1/2, apply the power rule to get two-thirds x to the 3/2. For Q3, the antiderivative of 1/x is ln|x| plus C. Use the condition F(1)=3: ln(1) is 0, so C=3, giving ln|x|+3.

**Student Prompt:** Try to answer all three before revealing the answers.

---

### Slide 15 · [SUMMARY]
**Key Takeaways**  ·  `full_width`

**On-screen text** `[16w]`
Summary of key ideas: indefinite integral as antiderivative family, power rule, exception, linearity, and initial conditions.

**FULL WIDTH** `[text]`

1. **Indefinite integral as family:** $\int f(x)\,dx = F(x)+C$.
2. **Power rule:** $\int x^n\,dx = \frac{x^{n+1}}{n+1}+C$ for $n\neq -1$.
3. **Exception:** $\int \frac{1}{x}\,dx = \ln|x|+C$.
4. **Linearity:** Constants factor out, sums split.
5. **Initial value problems:** Use $F(a)=b$ to find $C$.
6. **Verify by differentiation.**

**Teacher Narration** `[69w]`
> Let's recap. The indefinite integral is the family of all antiderivatives, written with a plus C. The power rule works for all powers except negative one, where we use natural log. Integration is linear: constants can be pulled out, sums can be split. Given an initial condition, we can determine the specific constant. Always check your answer by differentiating. These tools form the foundation for all of integral calculus.

---
