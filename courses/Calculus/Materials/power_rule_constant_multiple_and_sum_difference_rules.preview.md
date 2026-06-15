# Power Rule, Constant Multiple, and Sum-Difference Rules

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You should understand the limit definition of the derivative and be comfortable with basic algebra.

**Learning Objectives:**
- Apply the Power Rule to differentiate x^n for any real n
- Use the Constant Multiple Rule to factor constants out of derivatives
- Combine Sum and Difference Rules with Power Rule to differentiate polynomials efficiently
- Simplify expressions before differentiating to avoid unnecessary work

---

## v3.1 Production Readiness

✅ **Interactive moments:** 5 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 75w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 17 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
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
| 1 | 🎛hook | 🟢 | ◧ |  | 75w | 12w | Why Derivatives Matter |
| 2 | core | 🟢 | ◧ |  | 74w | 11w | The Power Rule |
| 3 | practice | 🟢 | ◧ |  | 75w | 5w | Warm-Up: Apply the Power Rule |
| 4 | core | 🟢 | ◧ |  | 73w | 12w | Constant Multiple Rule |
| 5 | 🎛misconception | 🟢 | ◧ |  | 82w | 20w | Watch Out: Common Mistakes |
| 6 | 🎛core | 🟢 | ◧ |  | 78w | 14w | Sum and Difference Rules |
| 7 | practice | 🟢 | ⬛⬛ |  | 75w | 8w | Standard Example: Combining Rules |
| 8 | pause_and_try | 🟢 | ◧ | ⏸️ | 65w | 5w | Your Turn: Practice |
| 9 | practice | 🟢 | ◧ |  | 74w | 9w | Solution: Practice Problem |
| 10 | 🎛core | 🟡 | ◧ |  | 78w | 14w | Fractional and Negative Exponents |
| 11 | pause_and_try | 🟡 | ◧ | ⏸️ | 67w | 9w | Pause and Try: Fractional and Negative Exponents |
| 12 | practice | 🟡 | ◧ |  | 76w | 9w | Solution: Tricky Example |
| 13 | practice | 🟡 | ◧ |  | 66w | 10w | Edge Case: Simplify Before Differentiating |
| 14 | 🎛visual_lab | 🟢 | ◧ |  | 75w | 10w | Application: Motion Along a Line |
| 15 | practice | 🟢 | ⬛⬛ |  | 77w | 12w | Application: Find When Particle is at Rest |
| 16 | challenge | 🔴 | ◧ |  | 83w | 16w | [Challenge – Optional] Proof of Power Rule for Positive Integers |
| 17 | summary | 🟢 | ⬛⬛ |  | 80w | 10w | Summary and Key Formulas |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**Why Derivatives Matter**  ·  `split_left_right`

**On-screen text** `[12w]`
Derivatives measure instantaneous rate of change. Slope of tangent line = derivative.

**LEFT** `[text]`

The derivative gives us the instantaneous rate of change. It’s the slope of the tangent line at any point on a curve. We’ll learn shortcuts to compute these slopes quickly.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a downward-opening parabola for position vs time (t from 0 to 5). Show a tangent line at a point that can be dragged. On the tangent line, display its slope (velocity). Label axes: Time (s) and Position (m). Use blue for curve, red for tangent.

*Interactive Controls:*
  - 🎛 Slider for time t from 0 to 5, updates tangent line and slope display

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

def s(t):
    return -4.9 * t**2 + 100

def v(t):
    return -9.8 * t

t_vals = np.linspace(0, 5, 100)
s_vals = s(t_vals)

fig, ax = plt.subplots(figsize=(6,4))
plt.subplots_adjust(bottom=0.25)
ax.plot(t_vals, s_vals, 'b-', linewidth=2)
ax.set_xlim(0,5)
ax.set_ylim(0,100)
ax.set_xlabel('Time (s)')
ax.set_ylabel('Position (m)')
ax.grid(alpha=0.3)

# Initial tangent at t=1
t0 = 1
slope = v(t0)
t_tan = np.linspace(t0-0.5, t0+0.5, 2)
s_tan = s(t0) + slope * (t_tan - t0)
tan_line, = ax.plot(t_tan, s_tan, 'r-', linewidth=2)
point, = ax.plot(t0, s(t0), 'ro', markersize=8)
slope_text = ax.text(0.1, 0.9, f'Slope = {slope:.2f} m/s', transform=ax.transAxes, fontsize=12)

ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
t_slider = Slider(ax_slider, 't', 0, 5, valinit=t0)

def update(val):
    t0 = t_slider.val
    slope = v(t0)
    t_tan = np.linspace(t0-0.5, t0+0.5, 2)
    s_tan = s(t0) + slope * (t_tan - t0)
    tan_line.set_data(t_tan, s_tan)
    point.set_data([t0], [s(t0)])
    slope_text.set_text(f'Slope = {slope:.2f} m/s')
    fig.canvas.draw_idle()

t_slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[75w]`
> Think about a ball dropped from a height. Its position changes with time. The slope of the tangent line at any moment tells us the ball's instantaneous velocity. Today we'll learn simple rules to compute these slopes without limits. Watch how the tangent line steepens as time increases—that's acceleration due to gravity. This visual helps you see the connection between the curve and its slope at every point, making the concept of derivative more intuitive.

**Student Prompt:** Predict: as time increases, does the slope (velocity) become more negative or less negative?

---

### Slide 2 · [CORE]
**The Power Rule**  ·  `split_left_right`

**On-screen text** `[11w]`
Power Rule: d/dx[x^n] = n x^{n-1}. Valid for any real n.

**LEFT** `[formula_block]`

$$\frac{d}{dx}[x^n] = n x^{n-1}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two subplots: left: f(x)=x^3 (blue curve) with tangent lines at x=-2,-1,0,1,2; right: f'(x)=3x^2 (red curve). Use x-range from -2.5 to 2.5. For the left subplot, set y-limits to -10 to 10. For the right subplot, set y-limits to 0 to 12. Highlight that derivative is one degree lower. Add grid. Title: 'Function and its Derivative'.

**Teacher Narration** `[74w]`
> The Power Rule is our first shortcut. It says: bring the exponent down as a coefficient, then decrease the exponent by one. For x cubed, we get 3x squared. Notice the derivative function is one degree lower—a cubic becomes a quadratic. This works for any real exponent: positive, negative, fractional. It's a powerful tool that saves us from using the limit definition every time, and it's the foundation for differentiating all polynomial functions efficiently.

---

### Slide 3 · [PRACTICE]
**Warm-Up: Apply the Power Rule**  ·  `split_left_right`

**On-screen text** `[5w]`
Differentiate f(x)=x^5: n=5 → 5x^4

**LEFT** `[steps]`

**Problem:** Differentiate $f(x) = x^5$

1. Identify $n=5$
2. Multiply by 5: $5x^{?}$
3. Subtract 1 from exponent: $5-1=4$
4. Result: $f'(x)=5x^4$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot x from -2 to 2. Show f(x)=x^5 in blue and f'(x)=5x^4 in red dashed. Set y-limits to -35 to 85 to accommodate both curves. Label axes. Note that derivative is always non-negative (since x^4 >=0). Add grid.

**Teacher Narration** `[75w]`
> Here's a simple start. We bring down the 5 and reduce the exponent from 5 to 4. The derivative is 5x to the fourth. Notice the original function's shape—it's increasing everywhere because its derivative is always positive except at zero. This is a key insight: the sign of the derivative tells us whether the function is increasing or decreasing. For x^5, the derivative is zero only at x=0, where the function has a flat tangent.

---

### Slide 4 · [CORE]
**Constant Multiple Rule**  ·  `split_left_right`

**On-screen text** `[12w]`
Constant Multiple Rule: derivative of constant times function = constant times derivative.

**LEFT** `[formula_block]`

$$\frac{d}{dx}[c \cdot f(x)] = c \cdot f'(x)$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=4x^2 (blue) and f'(x)=8x (red dashed) for x from -3 to 3. Add a point and tangent line at x=1 (slope=8). Display the slope value next to the tangent line. Add grid.

**Teacher Narration** `[73w]`
> When a constant multiplies a function, the constant just tags along. For 4 times x squared, we differentiate x squared to get 2x, then multiply by 4 to get 8x. The constant is a factor that stays unchanged. This works for any constant—positive, negative, fractions, or even pi. It's a simple but powerful rule that lets us handle coefficients without extra work, and it combines naturally with the power rule for efficient differentiation.

---

### Slide 5 · [MISCONCEPTION] 🎛 *[1 controls]*
**Watch Out: Common Mistakes**  ·  `split_left_right`

**On-screen text** `[20w]`
Common mistake: derivative of constant is 0, not the constant itself. Power rule does not apply to functions like 2^x.

**LEFT** `[steps]`

**Wrong:** $\frac{d}{dx}[3x^2] = 3 \cdot 2x = 6x$ is correct, but common errors: 
- Forgetting constant disappears: $\frac{d}{dx}[7] = 7$? **No, it's 0**
- Misapplying to $2^x$: $\frac{d}{dx}[2^x] \neq x \cdot 2^{x-1}$ (power rule only when variable is base)

**RIGHT** `[visual_spec]`

*Visual Spec:* Show two columns: left 'Wrong answer' right 'Correct answer'. For constant: Wrong: '7' → Correct: '0'. For exponential: Wrong: 'x 2^{x-1}' → Correct: '2^x ln 2'. Use arrow toggle button to reveal. Highlight in red the errors.

*Interactive Controls:*
  - 🎛 Button to reveal correct answers

**Teacher Narration** `[82w]`
> Two big traps: first, the derivative of a constant is always zero—constants don't change. Second, the power rule only works when the variable is in the base. For 2 to the x, the base is constant and exponent is variable—that requires a different rule called the exponential rule. We'll cover that later. These mistakes are common, so always check: is the variable in the base? If yes, power rule applies. If the variable is in the exponent, you need a different approach.

**Student Prompt:** Think: why is derivative of 2^x not x·2^{x-1}? What's the difference from x^2?

---

### Slide 6 · [CORE] 🎛 *[1 controls]*
**Sum and Difference Rules**  ·  `split_left_right`

**On-screen text** `[14w]`
Sum Rule: derivative of sum = sum of derivatives. Difference rule: same with minus.

**LEFT** `[formula_block]`

**Sum Rule:** $$\frac{d}{dx}[f(x)+g(x)] = f'(x)+g'(x)$$
**Difference Rule:** $$\frac{d}{dx}[f(x)-g(x)] = f'(x)-g'(x)$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Two subplots: top: f(x)=x^2 (blue), g(x)=3x (green), f+g (black) with tangent lines at a point (shown as dots). Bottom: derivative curves f', g', and f'+g'. Add a slider for x that moves tangent lines on all curves. Show that slope of f+g equals f'+g'.

*Interactive Controls:*
  - 🎛 Slider for x from -3 to 3 that moves tangent lines on function curves and highlights that f'+g' equals derivative of f+g

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

def f(x): return x**2
def g(x): return 3*x
def fp(x): return 2*x
def gp(x): return 3

x_vals = np.linspace(-3,3,100)
yf = f(x_vals)
yg = g(x_vals)
yfg = yf+yg
yfp = fp(x_vals)
ygp = gp(x_vals)
yfp_plus_gp = yfp+ygp

fig, (ax1, ax2) = plt.subplots(2,1,figsize=(6,6))
plt.subplots_adjust(bottom=0.15)

ax1.plot(x_vals,yf,'b',label='f(x)=x^2')
ax1.plot(x_vals,yg,'g',label='g(x)=3x')
ax1.plot(x_vals,yfg,'k',label='f+g')
ax1.set_ylim(-2,15)
ax1.grid(alpha=0.3)
ax1.legend()

ax2.plot(x_vals,yfp,'b--',label="f'=2x")
ax2.plot(x_vals,ygp,'g--',label="g'=3")
ax2.plot(x_vals,yfp_plus_gp,'k--',label="f'+g'")
ax2.grid(alpha=0.3)
ax2.legend()

# tangent lines at initial x0
x0 = 1
tan_f, = ax1.plot([], [], 'b--', linewidth=1)
tan_g, = ax1.plot([], [], 'g--', linewidth=1)
tan_fg, = ax1.plot([], [], 'k--', linewidth=1)

ax_slider = plt.axes([0.2,0.05,0.6,0.03])
s = Slider(ax_slider,'x',-3,3,valinit=x0)

def update(val):
    x0 = s.val
    # update tangent lines
    dx=0.5
    for ax, y_func, slope_func, line in [(ax1, f, fp, tan_f),(ax1, g, gp, tan_g),(ax1, lambda x: f(x)+g(x), lambda x: fp(x)+gp(x), tan_fg)]:
        slope = slope_func(x0)
        x_tan = np.array([x0-dx, x0+dx])
        y_tan = y_func(x0) + slope*(x_tan-x0)
        line.set_data(x_tan, y_tan)
    fig.canvas.draw_idle()

s.on_changed(update)
plt.show()
```

**Teacher Narration** `[78w]`
> Differentiation distributes over addition and subtraction. If you have two functions added, just differentiate each separately and keep the signs. This works for any finite number of terms. So a polynomial with a hundred terms? Just differentiate term by term. The interactive visual shows that the slope of the sum curve exactly equals the sum of the slopes. This linearity property is one of the most useful features of derivatives, making them easy to compute for complex expressions.

---

### Slide 7 · [PRACTICE]
**Standard Example: Combining Rules**  ·  `full_width`

**On-screen text** `[8w]`
Combine Power Rule, Constant Multiple, and Sum/Difference: f'(x)=20x^4-6x+7.

**FULL WIDTH** `[text]`

Differentiate: $f(x) = 4x^5 - 3x^2 + 7x - 2$

| Term | Derivative |
|------|------------|
| $4x^5$ | $4 \cdot 5x^4 = 20x^4$ |
| $-3x^2$ | $-3 \cdot 2x = -6x$ |
| $7x$ | $7 \cdot 1 = 7$ |
| $-2$ | $0$ |

**Result:** $f'(x) = 20x^4 - 6x + 7$

**Teacher Narration** `[75w]`
> Now we put it all together. We have four terms, each handled with the power rule and constant multiple. The derivative of 4x to the fifth is 20x to the fourth. Negative 3x squared becomes negative 6x. For 7x, it's just 7. And the constant minus 2 becomes zero. Always remember: constants vanish. That's why the derivative has one less term. This example shows how the rules work seamlessly together to differentiate any polynomial quickly.

---

### Slide 8 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Your Turn: Practice**  ·  `split_left_right`

**On-screen text** `[5w]`
Pause and try: differentiate g(x)=2x^4+5x^3-x+8

**LEFT** `[text]`

**Problem:** Differentiate $g(x) = 2x^4 + 5x^3 - x + 8$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot g(x)=2x^4+5x^3-x+8 from x=-3 to 3. Set y-limits to -50 to 250. Show a tangent line at x=0 as a hint. Label the derivative formula not shown.

**Teacher Narration** `[65w]`
> Now it's your turn. Pause the video and try to differentiate this polynomial. Use the power rule for each term, and remember that the derivative of x is 1, and the derivative of the constant 8 is zero. When you're ready, resume to check your answer. This practice will help solidify the rules we've learned, so take your time and work through each term carefully.

**Student Prompt:** Compute g'(x). Hint: term-by-term.

---

### Slide 9 · [PRACTICE]
**Solution: Practice Problem**  ·  `split_left_right`

**On-screen text** `[9w]`
g'(x)=8x^3+15x^2-1. Derivative of -x is -1, constant 8 disappears.

**LEFT** `[steps]`

$g(x) = 2x^4 + 5x^3 - x + 8$

- $\frac{d}{dx}[2x^4] = 2 \cdot 4x^3 = 8x^3$
- $\frac{d}{dx}[5x^3] = 5 \cdot 3x^2 = 15x^2$
- $\frac{d}{dx}[-x] = -1$
- $\frac{d}{dx}[8] = 0$

$g'(x) = 8x^3 + 15x^2 - 1$

**RIGHT** `[visual_spec]`

*Visual Spec:* Two subplots: left: g(x) (blue) with tangent line at x=0.5 showing slope 8*(0.5)^3+15*(0.5)^2-1 = 8*0.125+15*0.25-1 = 1+3.75-1 = 3.75. Right: g'(x)=8x^3+15x^2-1 (red). Mark zero crossing. Add grid.

**Teacher Narration** `[74w]`
> Here's the solution. The derivative of 2x to the fourth is 8x cubed, of 5x cubed is 15x squared, of negative x is just negative 1, and 8 vanishes. So the answer is 8x cubed plus 15x squared minus 1. Check that the derivative graph correctly shows the slopes of the original function. Notice how the derivative is a quadratic, one degree lower than the original quartic, which is a pattern you'll see often.

---

### Slide 10 · [CORE] 🟡 🎛 *[1 controls]*
**Fractional and Negative Exponents**  ·  `split_left_right`

**On-screen text** `[14w]`
Power Rule works for any real n. Rewrite roots and reciprocals as exponents first.

**LEFT** `[text]`

Rewrite before differentiating:
- $\sqrt{x} = x^{1/2}$
- $\frac{1}{x^3} = x^{-3}$
- $\sqrt[3]{x^2} = x^{2/3}$
- $\frac{5}{x^4} = 5x^{-4}$

Then use Power Rule as usual.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot x^n (blue) and n x^{n-1} (red dashed) for a fixed range (x from 0.5 to 2 to avoid negative base issues). Slider for n from -3 to 3 step 0.1. Display formula of derivative. Highlight changes in shape.

*Interactive Controls:*
  - 🎛 Slider for exponent n from -3 to 3, with step 0.1, updates function and derivative graphs

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

def power_func(x, n):
    return x**n
def power_deriv(x, n):
    return n * x**(n-1)

x_vals = np.linspace(0.5, 2, 100)
fig, ax = plt.subplots(figsize=(6,4))
plt.subplots_adjust(bottom=0.25)
n_init = 1
ax.plot(x_vals, power_func(x_vals, n_init), 'b-', label=f'x^{n_init}')
ax.plot(x_vals, power_deriv(x_vals, n_init), 'r--', label=f'{n_init}x^{n_init-1}')
ax.set_ylim(-3, 4)
ax.grid(alpha=0.3)
ax.legend()

ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
n_slider = Slider(ax_slider, 'n', -3, 3, valinit=n_init, valstep=0.1)

def update(val):
    n = n_slider.val
    ax.clear()
    ax.plot(x_vals, power_func(x_vals, n), 'b-', label=f'x^{n:.1f}')
    ax.plot(x_vals, power_deriv(x_vals, n), 'r--', label=f'{n:.1f}x^{n-1:.1f}')
    ax.set_ylim(-3, 4)
    ax.grid(alpha=0.3)
    ax.legend()
    fig.canvas.draw_idle()

n_slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[78w]`
> The power rule isn't just for positive whole numbers. It works for any real exponent—negative, fractional, even irrational. The key is to rewrite the function so the variable is in the base. For square root, we write x to the one half. For one over x cubed, we write x to the negative three. Then apply the rule exactly as before. This flexibility makes the power rule incredibly useful for a wide range of functions beyond simple polynomials.

---

### Slide 11 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]*
**Pause and Try: Fractional and Negative Exponents**  ·  `split_left_right`

**On-screen text** `[9w]`
Rewrite: 3/x^2 = 3x^{-2}, sqrt{x} = x^{1/2}. Then differentiate.

**LEFT** `[text]`

**Problem:** Differentiate $h(x) = \frac{3}{x^2} - 5\sqrt{x}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot h(x) from 0.1 to 3. Set y-limits to -10 to 10. Show tangent line at x=1 (slope = -6*1^{-3} - 2.5*1^{-0.5} = -6 - 2.5 = -8.5).

**Teacher Narration** `[67w]`
> Try this one. First rewrite each term as a power of x. Then apply the constant multiple and power rules. Pay attention to the negative exponent. Pause the video and attempt it. When you're ready, I'll show you the solution. This problem tests your ability to handle fractional and negative exponents, which is a key skill for applying the power rule to a broader class of functions.

**Student Prompt:** Compute h'(x). Remember: derivative of x^{-2} is -2x^{-3}.

---

### Slide 12 · [PRACTICE] 🟡
**Solution: Tricky Example**  ·  `split_left_right`

**On-screen text** `[9w]`
h'(x) = -6/x^3 - 5/(2√x). Check for negative exponents.

**LEFT** `[steps]`

$h(x) = 3x^{-2} - 5x^{1/2}$

- $\frac{d}{dx}[3x^{-2}] = 3 \cdot (-2)x^{-3} = -6x^{-3}$
- $\frac{d}{dx}[-5x^{1/2}] = -5 \cdot \frac{1}{2}x^{-1/2} = -\frac{5}{2}x^{-1/2}$

$h'(x) = -6x^{-3} - \frac{5}{2}x^{-1/2}$

Rewritten: $h'(x) = -\frac{6}{x^3} - \frac{5}{2\sqrt{x}}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Two panels: left h(x) with tangent at x=1 showing slope -8.5; right h'(x) as a red dashed curve. Use x-range from 0.1 to 3. Set y-limits to -10 to 10 for both panels. Label axes.

**Teacher Narration** `[76w]`
> After rewriting, we differentiate each term. For 3x to the negative 2, we bring down -2 to get negative 6 x to the negative 3. For minus 5 x to the one-half, the derivative is minus five halves times x to the negative one-half. You can leave it with negative exponents or rewrite with fractions—both are acceptable. The key is to be comfortable with exponent arithmetic, as it's essential for handling these types of functions correctly.

---

### Slide 13 · [PRACTICE] 🟡
**Edge Case: Simplify Before Differentiating**  ·  `split_left_right`

**On-screen text** `[10w]`
Simplify algebraically before differentiating whenever possible. Avoid unnecessary quotient rule.

**LEFT** `[steps]`

**Problem:** Differentiate $f(x) = \frac{x^3 + 2x^2 - 5x}{x}$

**Simplify first:** Divide each term by $x$:
$f(x) = x^2 + 2x - 5$

**Then differentiate:**
$f'(x) = 2x + 2$

If you used quotient rule, you'd get the same but with more work!

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x) = (x^3+2x^2-5x)/x for x!=0 as blue curve; note hole at x=0. Also plot the line x^2+2x-5 (black) that matches for all x≠0. Derivative 2x+2 shown as red dashed. Use x-range from -5 to 5. Set y-limits to -10 to 30.

**Teacher Narration** `[66w]`
> Sometimes a function looks more complicated than it is. Here we have a fraction, but simple division gives a polynomial. Differentiating the simplified version is much easier than using the quotient rule. This is a golden rule: always look for algebraic simplifications before you start taking derivatives. It saves time and reduces errors, especially when dealing with rational expressions that can be simplified to power functions.

---

### Slide 14 · [VISUAL_LAB] 🎛 *[2 controls]*
**Application: Motion Along a Line**  ·  `split_left_right`

**On-screen text** `[10w]`
Velocity = derivative of position. Acceleration = derivative of velocity.

**LEFT** `[text]`

If $s(t)$ is position, then:
- Velocity: $v(t) = s'(t)$
- Acceleration: $a(t) = v'(t) = s''(t)$

**Example:** $s(t)=2t^3 -9t^2+12t+5$

**RIGHT** `[visual_spec]`

*Visual Spec:* Three subplots stacked: top: position s(t) with tangent line; middle: velocity v(t)=6t^2-18t+12; bottom: acceleration a(t)=12t-18. Add a vertical line at a slider-chosen time t. Show numerical values of s, v, a at that time. Highlight when velocity is zero (rest).

*Interactive Controls:*
  - 🎛 Slider for time t from 0 to 3, updates vertical line and numerical values on all three subplots
  - 🎛 Toggle to show/hide tangent line on position graph

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

def s(t): return 2*t**3 - 9*t**2 + 12*t + 5
def v(t): return 6*t**2 - 18*t + 12
def a(t): return 12*t - 18

t_vals = np.linspace(0, 3, 100)
s_vals, v_vals, a_vals = s(t_vals), v(t_vals), a(t_vals)

fig, (ax1, ax2, ax3) = plt.subplots(3,1,figsize=(6,6), sharex=True)
plt.subplots_adjust(bottom=0.15)

ax1.plot(t_vals, s_vals, 'b-', label='position')
ax1.set_ylabel('s(t)')
ax1.grid(alpha=0.3)
ax1.legend(loc='upper left')

ax2.plot(t_vals, v_vals, 'r-', label='velocity')
ax2.axhline(0, color='gray', linestyle='--')
ax2.set_ylabel('v(t)')
ax2.grid(alpha=0.3)
ax2.legend(loc='upper left')

ax3.plot(t_vals, a_vals, 'g-', label='acceleration')
ax3.axhline(0, color='gray', linestyle='--')
ax3.set_xlabel('t (s)')
ax3.set_ylabel('a(t)')
ax3.grid(alpha=0.3)
ax3.legend(loc='upper left')

# vertical line at t=1 (rest point)
t0 = 1
vline1 = ax1.axvline(t0, color='k', linestyle=':', alpha=0.5)
vline2 = ax2.axvline(t0, color='k', linestyle=':', alpha=0.5)
vline3 = ax3.axvline(t0, color='k', linestyle=':', alpha=0.5)

# text boxes for values
val_text = fig.text(0.85, 0.5, f's={s(t0):.1f}\nv={v(t0):.1f}\na={a(t0):.1f}', fontsize=10, bbox=dict(facecolor='white', alpha=0.8))

ax_slider = plt.axes([0.2, 0.03, 0.6, 0.03])
t_slider = Slider(ax_slider, 't', 0, 3, valinit=t0)

def update(val):
    t0 = t_slider.val
    vline1.set_xdata([t0, t0])
    vline2.set_xdata([t0, t0])
    vline3.set_xdata([t0, t0])
    val_text.set_text(f's={s(t0):.1f}\nv={v(t0):.1f}\na={a(t0):.1f}')
    fig.canvas.draw_idle()

t_slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[75w]`
> In physics, these rules have direct meaning. The derivative of position is velocity, and the derivative of velocity is acceleration. For this position function, we get a quadratic velocity and a linear acceleration. The interactive plot lets you see how all three change together. Notice where velocity is zero—those are times when the particle might be changing direction. This application shows why derivatives are so important in understanding motion and change in the real world.

---

### Slide 15 · [PRACTICE]
**Application: Find When Particle is at Rest**  ·  `full_width`

**On-screen text** `[12w]`
Set v(t)=0 and solve quadratic. Particle at rest at t=1s and t=2s.

**FULL WIDTH** `[text]`

**Given:** $s(t) = 2t^3 - 9t^2 + 12t + 5$

Find times at which particle is at rest (v=0).

| Step | Action | Result |
|------|--------|--------|
| 1 | Compute velocity | $v(t)=6t^2 -18t+12$ |
| 2 | Set to zero | $6t^2-18t+12=0$ |
| 3 | Divide by 6 | $t^2 -3t+2=0$ |
| 4 | Factor | $(t-1)(t-2)=0$ |
| 5 | Solutions | $t=1$ s, $t=2$ s |

**Teacher Narration** `[77w]`
> A particle is at rest when its velocity is zero. We set the derivative equal to zero and solve for t. Dividing by 6 and factoring gives t=1 and t=2 seconds. At those times, the position graph has horizontal tangents—the particle stops momentarily. You can verify this on the interactive graph by moving the slider to those times. This problem connects differentiation to real-world motion analysis, showing how derivatives help us find critical points in physical systems.

---

### Slide 16 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof of Power Rule for Positive Integers**  ·  `split_left_right`

**On-screen text** `[16w]`
For integer n, binomial expansion shows all terms with h vanish except the linear term nx^{n-1}h.

**LEFT** `[steps]`

Prove $\frac{d}{dx}[x^n] = nx^{n-1}$ for $n \in \mathbb{N}$

1. Limit definition: $\lim_{h\to0} \frac{(x+h)^n - x^n}{h}$
2. Binomial: $(x+h)^n = \sum_{k=0}^n \binom{n}{k} x^{n-k} h^k$
3. Subtract $x^n$, divide by h:
$\frac{(x+h)^n - x^n}{h} = \sum_{k=1}^n \binom{n}{k} x^{n-k} h^{k-1}$
4. As $h\to0$, only $k=1$ term survives:
$\binom{n}{1} x^{n-1} = n x^{n-1}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Visually show expansion of (x+h)^3 as a cube with side x+h, volume decomposition: x^3 + 3x^2h + 3xh^2 + h^3. Highlight the 3x^2h term as the linear part. Animate with h shrinking to emphasize the limit.

**Teacher Narration** `[83w]`
> This is an optional challenge for those who want to see why the power rule works. We start with the limit definition, expand (x+h) to the n using the binomial theorem, and notice that after subtracting x to the n and dividing by h, every term except the first contains a factor of h. As h approaches zero, those terms vanish, leaving n x to the n minus one. The same rule holds for any real exponent, but the proof is more advanced.

---

### Slide 17 · [SUMMARY]
**Summary and Key Formulas**  ·  `full_width`

**On-screen text** `[10w]`
Three core rules: Power, Constant Multiple, Sum/Difference. Simplify before differentiating.

**FULL WIDTH** `[text]`

**Power Rule:** $$\frac{d}{dx}[x^n] = n x^{n-1}$$
**Constant Multiple Rule:** $$\frac{d}{dx}[c\cdot f(x)] = c\cdot f'(x)$$
**Sum/Difference Rules:** $$\frac{d}{dx}[f\pm g] = f' \pm g'$$
**Simplify First** – avoid quotient rule by dividing.

**Application:** Velocity = derivative of position; Acceleration = derivative of velocity.

**Teacher Narration** `[80w]`
> Let's recap. The power rule lets us differentiate any x to the n by bringing down the exponent and reducing it by one. The constant multiple rule says constants just ride along. The sum and difference rules mean we can differentiate term by term. Combine these to handle any polynomial or power function. And always check if you can simplify algebraically first—it can save you a lot of work. These skills will be the foundation for all future differentiation techniques.

---
