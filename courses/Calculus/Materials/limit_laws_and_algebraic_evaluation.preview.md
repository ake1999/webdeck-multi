# Limit Laws and Algebraic Evaluation

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You should be comfortable with the definition of a limit and have experience with basic function algebra.

**Learning Objectives:**
- Calculate limits of polynomial, rational, and root functions using the Limit Laws
- Apply algebraic techniques (factoring, rationalizing) to evaluate limits that initially yield indeterminate forms
- Analyze when a limit does not exist and justify using one-sided limits or infinite behavior
- Interpret limit statements graphically and algebraically to determine function behavior near a point

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 79w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
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
| 1 | hook | 🟢 | ⬛⬛ |  | 90w | 15w | Why Limit Laws Are Like Building Blocks |
| 2 | 🎛core | 🟢 | ◧ |  | 116w | 9w | The Eleven Limit Laws at a Glance |
| 3 | 🎛core | 🟢 | ◧ |  | 93w | 9w | Proof Intuition: The Sum Law |
| 4 | 🎛visual_lab | 🟢 | ◧ | ⏸️ | 78w | 11w | Interactive: Explore the Product and Quotient Laws |
| 5 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 74w | 4w | Quick Check: Sum Law in Action |
| 6 | practice | 🟢 | ⬛⬛ |  | 85w | 7w | Example 1 (Warm-Up): Direct Substitution |
| 7 | practice | 🟢 | ⬛⬛ |  | 60w | 10w | Example 2 (Standard): Quotient with Non-Zero Denominator |
| 8 | 🎛misconception | 🟢 | ◧ |  | 89w | 13w | Misconception: Cancelling Factors Too Early |
| 9 | practice | 🟢 | ⬛⬛ |  | 72w | 7w | Example 3 (Standard): Factoring to Resolve 0/0 |
| 10 | 🎛pause_and_try | 🟡 | ◧ | ⏸️ | 61w | 11w | Pause: Try Factoring Yourself |
| 11 | practice | 🟡 | ⬛⬛ |  | 66w | 8w | Example 4 (Tricky): Rationalizing |
| 12 | challenge | 🔴 | ⬛⬛ |  | 76w | 9w | [Challenge – Optional] Example 5: Combined Techniques |
| 13 | core | 🟢 | ◧ |  | 82w | 8w | Putting It All Together: Direct Substitution with Piecewise |
| 14 | summary | 🟢 | ⬛⬛ |  | 61w | 9w | Summary: Key Takeaways |

---

### Slide 1 · [HOOK]
**Why Limit Laws Are Like Building Blocks**  ·  `full_width`

**On-screen text** `[15w]`
Limit Laws are LEGO bricks for calculus: combine known part limits to compute the whole.

**FULL WIDTH** `[text]`

Think of limit laws as LEGO bricks: if you know the size of each brick (simple function limit) and the rules for connecting them (addition, multiplication, division), you can build and evaluate any complicated limit structure without measuring the whole thing.

**Teacher Narration** `[90w]`
> Imagine you're a chef following a recipe. The Limit Laws are like knowing: 'If I know the weight of flour and the weight of sugar separately, then the weight of the mixture is just the sum.' You don't need to weigh the entire bowl — you trust the arithmetic. Similarly, if you know the limit of f of x and the limit of g of x exist, you can combine them algebraically without re-measuring. This idea — that limits respect arithmetic — is the foundation for everything we do today.

---

### Slide 2 · [CORE] 🎛 *[1 controls]*
**The Eleven Limit Laws at a Glance**  ·  `split_left_right`

**On-screen text** `[9w]`
Eleven Limit Laws: break any limit into simple parts.

**LEFT** `[text]`

**1. Sum Law** – $\lim(f+g)=\lim f + \lim g$
**2. Difference Law** – $\lim(f-g)=\lim f - \lim g$
**3. Constant Multiple Law** – $\lim(cf) = c\lim f$
**4. Product Law** – $\lim(fg) = \lim f \cdot \lim g$
**5. Quotient Law** – $\lim(f/g) = \lim f / \lim g$ (denom. ≠0)
**6. Power Law** – $\lim(f^n) = (\lim f)^n$
**7. Constant Law** – $\lim c = c$
**8. Identity Law** – $\lim x = a$
**9. Power of x** – $\lim x^n = a^n$
**10. Root Law** – $\lim\sqrt[n]{x} = \sqrt[n]{a}$
**11. Root of Function** – $\lim\sqrt[n]{f} = \sqrt[n]{\lim f}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^2 and g(x)=2x+1 on axes with a movable vertical line at x=2. As the line moves, show the values of f(x), g(x), and their sum. The slider changes a. Include labels for L, M, and L+M. Use matplotlib.widgets.Slider.

*Interactive Controls:*
  - 🎛 Slider for a from -2 to 5

```python
%matplotlib widget
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots()
plt.subplots_adjust(bottom=0.25)

x = np.linspace(-2, 5, 400)
a_init = 2
f = lambda x: x**2
g = lambda x: 2*x + 1

line_f, = ax.plot(x, f(x), label='f(x)')
line_g, = ax.plot(x, g(x), label='g(x)')
line_sum, = ax.plot(x, f(x)+g(x), 'k--', label='f+g')
point_f, = ax.plot([], [], 'ro', markersize=8, label='f(a)')
point_g, = ax.plot([], [], 'bo', markersize=8, label='g(a)')
point_sum, = ax.plot([], [], 'ko', markersize=8, label='(f+g)(a)')
ax.axvline(x=a_init, color='gray', linestyle=':', alpha=0.5)
ax.legend()
ax.grid(True, alpha=0.3)

axcolor = 'lightgoldenrodyellow'
ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03], facecolor=axcolor)
slider_a = Slider(ax_slider, 'a', -2, 5, valinit=a_init)

def update(val):
    a = slider_a.val
    point_f.set_data([a], [f(a)])
    point_g.set_data([a], [g(a)])
    point_sum.set_data([a], [f(a)+g(a)])
    # update vertical line
    ax.lines[0].set_xdata([a, a])
    fig.canvas.draw_idle()

slider_a.on_changed(update)
plt.show()
```

**Teacher Narration** `[116w]`
> Here they are: all eleven Limit Laws. You don't need to memorise every single one right now — we'll focus on the most important: Sum, Difference, Constant Multiple, Product, and Quotient. Notice that laws 7 through 11 are really special cases of the first six. For example, the Power Law applied to the identity function gives law 9. The key point is that these laws allow you to compute a limit by breaking it into known pieces. The visual on the right shows the Sum Law: as you drag the slider a, you can see the individual function values and their sum. Notice that the limit of the sum always equals the sum of the limits.

---

### Slide 3 · [CORE] 🎛 *[2 controls]*
**Proof Intuition: The Sum Law**  ·  `split_left_right`

**On-screen text** `[9w]`
Sum Law proof: control each part separately, then combine.

**LEFT** `[concept]`

If $\lim_{x\to a}f(x)=L$ and $\lim_{x\to a}g(x)=M$, then $\lim_{x\to a}(f+g)(x)=L+M$.

**Key idea**: distance from sum to $L+M$ ≤ distance from $f$ to $L$ + distance from $g$ to $M$.

Make each distance $< \epsilon/2$, then sum $< \epsilon$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw two horizontal number lines from -5 to 5. On the first, mark point L at 2 and f(x) near it. On the second, mark M at -1 and g(x) near it. Below, show L+M=1 and the sum f(x)+g(x) inside an epsilon band. Add arrows and labels. Use matplotlib with simple shapes.

*Interactive Controls:*
  - 🎛 Slider: change epsilon band width
  - 🎛 Button: reveal next step

```python
import matplotlib.pyplot as plt
import numpy as np

fig, (ax1, ax2, ax3) = plt.subplots(3,1, figsize=(6, 4))

example = {'L':2, 'M':-1, 'f_x':2.3, 'g_x':-0.8}

for ax in [ax1, ax2, ax3]:
    ax.set_xlim(-5,5)
    ax.set_yticks([])
    ax.spines['bottom'].set_position('center')
    ax.spines['left'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['top'].set_visible(False)

# first line: f
ax1.plot([-5,5],[0,0],'k')
ax1.plot(example['L'], 0, 'ro', markersize=8, label='L')
ax1.plot(example['f_x'], 0, 'bo', markersize=8, label='f(x)')
ax1.legend()
ax1.set_title('f(x) near L')

# second line: g
ax2.plot([-5,5],[0,0],'k')
ax2.plot(example['M'], 0, 'ro', markersize=8, label='M')
ax2.plot(example['g_x'], 0, 'bo', markersize=8, label='g(x)')
ax2.legend()
ax2.set_title('g(x) near M')

# third line: sum
ax3.plot([-5,5],[0,0],'k')
LplusM = example['L']+example['M']
fplusg = example['f_x']+example['g_x']
ax3.plot(LplusM, 0, 'ro', markersize=8, label='L+M')
ax3.plot(fplusg, 0, 'bo', markersize=8, label='f(x)+g(x)')
ax3.legend()
ax3.set_title('Sum: f(x)+g(x) near L+M')

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[93w]`
> Why does the Sum Law work? Imagine we want to make the total error smaller than epsilon. If we can make the error in f smaller than half of epsilon, and the error in g smaller than half of epsilon, then the triangle inequality tells us the total error in their sum is less than epsilon. The visual shows this: f of x is close to L, g of x is close to M, and their sum is close to L plus M. This is the core idea behind the rigorous epsilon-delta proof.

---

### Slide 4 · [VISUAL_LAB] ⏸️ *[YouTube Pause]* 🎛 *[3 controls]*
**Interactive: Explore the Product and Quotient Laws**  ·  `split_left_right`

**On-screen text** `[11w]`
Drag a to see limits of products and quotients in action.

**LEFT** `[text]`

Use the controls to see how $f(x)\cdot g(x)$ and $\frac{f(x)}{g(x)}$ behave as $x → a$. Adjust $a$ and the functions to test the laws.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot f(x) and g(x) on the same axes, with separate traces for f*g and f/g (if g≠0). Add sliders for a (from -3 to 3) and for selecting function presets (polynomials, simple trig). Show vertical line at a and dotted horizontal lines at limits. Include buttons to toggle product/quotient display.

*Interactive Controls:*
  - 🎛 Slider for a from -3 to 3
  - 🎛 Radio buttons to select function pair
  - 🎛 Toggle buttons for product/quotient visibility (future)

```python
%matplotlib widget
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button, RadioButtons

# Define functions
funcs = {
    'x^2 and x+1': (lambda x: x**2, lambda x: x+1),
    'sin(x) and cos(x)': (np.sin, np.cos),
    'x^3 and x-2': (lambda x: x**3, lambda x: x-2)
}

fig, ax = plt.subplots()
plt.subplots_adjust(bottom=0.35)
x = np.linspace(-3, 3, 400)
a_init = 1.0

f, g = funcs['x^2 and x+1']
f_eval, g_eval = f(x), g(x)
line_f, = ax.plot(x, f_eval, label='f(x)')
line_g, = ax.plot(x, g_eval, label='g(x)')
line_prod, = ax.plot(x, f_eval*g_eval, 'k--', label='f*g', alpha=0.7)
line_quot, = ax.plot(x, f_eval/g_eval, 'r--', label='f/g', alpha=0.7)
point_f, = ax.plot([], [], 'o', color='C0', markersize=8)
point_g, = ax.plot([], [], 'o', color='C1', markersize=8)
point_prod, = ax.plot([], [], 'o', color='k', markersize=8)
point_quot, = ax.plot([], [], 'o', color='r', markersize=8)
ax.axvline(x=a_init, color='gray', ls=':', alpha=0.5)
ax.legend()
ax.grid(True, alpha=0.3)

# Sliders
ax_a = plt.axes([0.2, 0.2, 0.6, 0.03], facecolor='lightgoldenrodyellow')
slider_a = Slider(ax_a, 'a', -3, 3, valinit=a_init)

# Radio for function choice
ax_radio = plt.axes([0.02, 0.5, 0.15, 0.3])
radio = RadioButtons(ax_radio, list(funcs.keys()), active=0)

def update(val):
    a = slider_a.val
    # update points
    fa = f(a); ga = g(a)
    point_f.set_data([a], [fa])
    point_g.set_data([a], [ga])
    point_prod.set_data([a], [fa*ga])
    if ga != 0:
        point_quot.set_data([a], [fa/ga])
        line_quot.set_data(x, f_eval/g_eval)
    else:
        point_quot.set_data([],[])
    # update vertical line
    ax.lines[0].set_xdata([a, a])
    fig.canvas.draw_idle()

def radio_on_clicked(label):
    nonlocal f, g, f_eval, g_eval
    f, g = funcs[label]
    f_eval, g_eval = f(x), g(x)
    line_f.set_ydata(f_eval)
    line_g.set_ydata(g_eval)
    line_prod.set_ydata(f_eval*g_eval)
    line_quot.set_ydata(f_eval/g_eval)
    slider_a.set_val(slider_a.val)  # trigger update
    fig.canvas.draw_idle()

radio.on_clicked(radio_on_clicked)
slider_a.on_changed(update)
plt.show()
```

**Teacher Narration** `[78w]`
> Now let's explore the Product and Quotient Laws interactively. On the right, you see two functions, f and g, and their product and quotient. Drag the slider for a to see how f times g approaches the product of the limits, and f divided by g approaches the quotient — as long as the denominator's limit isn't zero. Try switching the function pair using the radio buttons. This hands-on exploration will build intuition for why these laws work.

**Student Prompt:** Predict: what happens to the quotient when g(x) becomes zero at a?

---

### Slide 5 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Quick Check: Sum Law in Action**  ·  `split_left_right`

**On-screen text** `[4w]`
$\lim_{x→3}f=7$, $\lim_{x→3}g=2$ → $\lim_{x→3}(f+g)=?$

**LEFT** `[text]`

Given $\lim_{x→3}f(x)=7$ and $\lim_{x→3}g(x)=2$, find $\lim_{x→3}[f(x)+g(x)]$.

**RIGHT** `[visual_spec]`

*Visual Spec:* A simple number line with 7 at position 7, 2 at position 2, and 9 at position 9. Arrows show 'L' and 'M' and 'L+M'.

*Interactive Controls:*
  - 🎛 Button: reveal answer

```python
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(4,1))
ax.set_xlim(0, 12)
ax.set_ylim(-0.5, 0.5)
ax.spines['bottom'].set_position('center')
ax.spines['left'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['top'].set_visible(False)
ax.set_yticks([])
ax.plot([0,12],[0,0],'k')
# mark L, M, L+M
ax.plot(7,0,'ro',label='L=7')
ax.plot(2,0,'bo',label='M=2')
ax.plot(9,0,'ko',label='L+M=9')
ax.legend(loc='upper right', fontsize='small')
plt.show()
```

**Teacher Narration** `[74w]`
> Pause the video here and try this quick check yourself. I'll give you a moment. You have two limits: f of x approaches 7 and g of x approaches 2 as x goes to 3. What does the Sum Law tell you about the limit of their sum? Remember, if both limits exist, the limit of the sum is just the sum of the limits. Think about it, then resume to see the answer.

**Student Prompt:** Calculate the limit.

---

### Slide 6 · [PRACTICE]
**Example 1 (Warm-Up): Direct Substitution**  ·  `full_width`

**On-screen text** `[7w]`
$\lim_{x→5}(2x^2 - 3x + 4) = 39$

**FULL WIDTH** `[steps]`

**Problem:** Evaluate $\lim_{x→5}(2x^2 - 3x + 4)$

1. **Sum/Difference Law:** $\lim 2x^2 - \lim 3x + \lim 4$
2. **Constant Multiple Law:** $2\lim x^2 - 3\lim x + 4$
3. **Power Law:** $2(5^2) - 3(5) + 4$
4. **Simplify:** $50 - 15 + 4 = 39$

**Teacher Narration** `[85w]`
> Let's walk through a warm-up example. We want the limit of two x squared minus three x plus four as x approaches five. We apply the Sum Law to split into three separate limits. Then the Constant Multiple Law lets us factor out the 2 and the 3. Next, the Power Law gives us the limit of x squared — that's 5 squared equals 25. Finally we simplify to get 39. This is the simplest case: all parts are polynomials and direct substitution works beautifully.

---

### Slide 7 · [PRACTICE]
**Example 2 (Standard): Quotient with Non-Zero Denominator**  ·  `full_width`

**On-screen text** `[10w]`
Check denominator limit ≠ 0 first, then apply Quotient Law.

**FULL WIDTH** `[steps]`

**Problem:** Evaluate $\lim_{x→2}\frac{x^3+2x^2-1}{5-3x}$

1. Check denominator limit: $\lim_{x→2}(5-3x)=5-6=-1\neq0$ ✓
2. Evaluate numerator: $\lim_{x→2}(x^3+2x^2-1)=8+8-1=15$
3. Apply Quotient Law: $\frac{15}{-1}=-15$

**Teacher Narration** `[60w]`
> Now a standard quotient problem. Always check the denominator limit first. Here, the denominator 5 minus 3x approaches -1 as x goes to 2, which is not zero. So the Quotient Law applies directly. The numerator is a polynomial, so we can use the Power and Sum Laws to get 15. Then we divide to get -15. Quick and clean.

---

### Slide 8 · [MISCONCEPTION] 🎛 *[1 controls]*
**Misconception: Cancelling Factors Too Early**  ·  `split_left_right`

**On-screen text** `[13w]`
Don't cancel without acknowledging the hole; limit ≠ function value at the point.

**LEFT** `[concept]`

**Wrong approach for** $\lim_{x→2}\frac{x^2-4}{x-2}$:

Cancel $x-2$ before checking domain → get $x+2$ → limit = 4. **Correct** but the step is invalid: the original function is undefined at $x=2$, not $x+2$.

**Right:** Factor, cancel **after** noting domain restriction, then evaluate limit.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot y=(x^2-4)/(x-2) with a removable discontinuity. Also plot y=x+2 as a dashed line. Mark the hole with an open circle. Show that the two functions are equal except at x=2. The limit exists even though the function is undefined.

*Interactive Controls:*
  - 🎛 Toggle: show/hide simplified function y=x+2

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 4, 400)
x_hole = 2
y = (x**2 - 4) / (x - 2)
y = np.where(x == x_hole, np.nan, y)  # remove point

fig, ax = plt.subplots()
ax.plot(x, y, label='$\\frac{x^2-4}{x-2}$')
ax.plot(x, x+2, 'k--', label='$x+2$')
ax.plot(x_hole, x_hole+2, 'o', markerfacecolor='white', markeredgecolor='red', markersize=8)
ax.set_xlim(0,4)
ax.set_ylim(0,6)
ax.grid(True, alpha=0.3)
ax.legend()
plt.show()
```

**Teacher Narration** `[89w]`
> A common mistake is to cancel factors like x minus 2 without thought, then treat the simplified expression as the same function. But the original function is undefined at x equals 2 — you've created a hole. The simplified version x plus 2 is defined everywhere. The limit is still 4, but you must justify cancellation by noting the functions are identical except at the limit point. The graph on the right shows the hole; the limit exists because the function gets arbitrarily close to 4 from both sides.

**Student Prompt:** Why can't we just plug x=2 into (x^2-4)/(x-2)?

---

### Slide 9 · [PRACTICE]
**Example 3 (Standard): Factoring to Resolve 0/0**  ·  `full_width`

**On-screen text** `[7w]`
Indeterminate 0/0? Factor and cancel, then substitute.

**FULL WIDTH** `[steps]`

**Problem:** $\lim_{x→2}\frac{x^2-4}{x-2}$

1. Direct sub → $\frac{0}{0}$ (indeterminate)
2. Factor numerator: $x^2-4 = (x-2)(x+2)$
3. Cancel common factor: $\frac{(x-2)(x+2)}{x-2} = x+2$ for $x\neq2$
4. Now evaluate: $\lim_{x→2}(x+2) = 4$

**Teacher Narration** `[72w]`
> Here's the same problem done correctly. Direct substitution gives zero over zero — an indeterminate form. That means we need algebra. Factor the numerator as difference of squares, cancel with the denominator, and now we have a simple linear function. Its limit as x approaches 2 is 4. Notice we used the fact that the limit doesn't care about what happens exactly at x equals 2; only the behavior near 2 matters.

---

### Slide 10 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause: Try Factoring Yourself**  ·  `split_left_right`

**On-screen text** `[11w]`
$\lim_{x→3}\frac{x^2-9}{x-3} = ?$   A) 0  B) 3  C) 6  D) DNE

**LEFT** `[text]`

**Quick Check:** Evaluate $\lim_{x→3}\frac{x^2-9}{x-3}$.

A) 0 B) 3 C) 6 D) Does not exist

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot y=(x^2-9)/(x-3) with a hole at (3,6). Show vertical dashed line at x=3. Label axes.

*Interactive Controls:*
  - 🎛 Button: reveal answer

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 6, 400)
x_hole = 3
y = (x**2 - 9) / (x - 3)
y = np.where(x == x_hole, np.nan, y)

fig, ax = plt.subplots(figsize=(5,4))
ax.plot(x, y, label='$\\frac{x^2-9}{x-3}$')
ax.plot(x, x+3, 'k--', alpha=0.5, label='$x+3$')
ax.plot(x_hole, x_hole+3, 'o', markerfacecolor='white', markeredgecolor='red', markersize=10)
ax.set_xlim(0,6)
ax.set_ylim(0,8)
ax.axvline(x=3, color='gray', ls=':', alpha=0.5)
ax.grid(True, alpha=0.3)
ax.legend()
plt.show()
```

**Teacher Narration** `[61w]`
> Now it's your turn. Pause the video and try this multiple choice question. The limit of x squared minus 9 over x minus 3 as x approaches 3. The graph on the right shows the function with a hole. Factor the numerator, cancel, and you'll get a simple linear expression. What do you get? I'll check the answer in a moment.

**Student Prompt:** Select the correct answer.

---

### Slide 11 · [PRACTICE] 🟡
**Example 4 (Tricky): Rationalizing**  ·  `full_width`

**On-screen text** `[8w]`
Roots in numerator? Multiply by conjugate to eliminate.

**FULL WIDTH** `[steps]`

**Problem:** $\lim_{x→4}\frac{\sqrt{x}-2}{x-4}$

1. Direct sub → $\frac{0}{0}$
2. Multiply numerator and denominator by conjugate $\sqrt{x}+2$:
   $\frac{(\sqrt{x}-2)(\sqrt{x}+2)}{(x-4)(\sqrt{x}+2)} = \frac{x-4}{(x-4)(\sqrt{x}+2)}$
3. Cancel $x-4$ (for $x\neq4$): $\frac{1}{\sqrt{x}+2}$
4. Now evaluate: $\frac{1}{\sqrt{4}+2} = \frac{1}{4}$

**Teacher Narration** `[66w]`
> When you have a root in the numerator and direct substitution gives zero over zero, try rationalizing. Multiply top and bottom by the conjugate of the numerator. This uses the difference of squares to remove the square root. After cancellation, you get a simple fraction. Substitute x equals 4 into the simplified expression to get one fourth. This technique is powerful for limits involving square roots.

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Example 5: Combined Techniques**  ·  `full_width`

**On-screen text** `[9w]`
Factor difference of cubes and squares, cancel, then substitute.

**FULL WIDTH** `[steps]`

**Problem:** $\lim_{x→1}\frac{x^3-1}{x^2-1}$

1. Direct sub → $\frac{0}{0}$
2. Factor numerator: $x^3-1=(x-1)(x^2+x+1)$
3. Factor denominator: $x^2-1=(x-1)(x+1)$
4. Cancel $(x-1)$: $\frac{x^2+x+1}{x+1}$ for $x\neq1$
5. Evaluate: $\frac{1+1+1}{2}=\frac{3}{2}$

**Teacher Narration** `[76w]`
> This challenge example combines factoring techniques. We have a cubic in the numerator and a quadratic in the denominator. Use the difference of cubes formula: x cubed minus 1 equals (x-1)(x squared plus x plus 1). The denominator is difference of squares. Cancel the common factor x minus 1, and you're left with a rational expression. Plug in x equals 1 to get three halves. This problem shows you need to recognize cube factorizations as well.

---

### Slide 13 · [CORE]
**Putting It All Together: Direct Substitution with Piecewise**  ·  `split_left_right`

**On-screen text** `[8w]`
Continuity: $\lim_{x→a}f(x)=f(a)$ when $f$ is continuous at $a$.

**LEFT** `[text]`

Many functions we encounter are **continuous** at the point of interest, meaning $\lim_{x→a}f(x)=f(a)$. For polynomials, rational functions (where defined), and root functions, direct substitution works.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two subplots: left shows a polynomial (y=x^2) with a filled circle at a point; right shows a rational function with a hole (removable discontinuity).

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-3, 3, 400)
f1 = x**2
f2 = (x**2 - 1)/(x - 1)
f2 = np.where(x == 1, np.nan, f2)

fig, (ax1, ax2) = plt.subplots(1,2, figsize=(8,4))

ax1.plot(x, f1)
ax1.plot(2,4,'ro')
ax1.set_title('Polynomial: continuous')
ax1.grid()

ax2.plot(x, f2, label='$(x^2-1)/(x-1)$')
ax2.plot(1,2,'o', markerfacecolor='white', markeredgecolor='red', markersize=10)
ax2.set_title('Rational: removable discontinuity')
ax2.grid()

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[82w]`
> The ultimate goal of using limit laws is to reach a point where you can simply plug in the value — that's called direct substitution. Most of the functions you'll encounter in calculus, like polynomials, rational functions where the denominator isn't zero, and root functions, are continuous. The graph shows a continuous polynomial on the left and a rational function with a hole on the right. The hole means it's not continuous, but after algebraic simplification we can still use direct substitution.

---

### Slide 14 · [SUMMARY]
**Summary: Key Takeaways**  ·  `full_width`

**On-screen text** `[9w]`
Summary: Use laws, watch for 0/0, simplify, then substitute.

**FULL WIDTH** `[text]`

1. **Limit Laws** allow us to break limits into simpler parts.
2. **Indeterminate form** $\frac{0}{0}$ requires algebraic manipulation: factoring, rationalizing, or simplifying.
3. **Direct substitution** works for continuous functions (polynomials, etc.) after any needed algebra.
4. **Check conditions** – denominator limit ≠ 0 for Quotient Law, both limits exist for Sum/Product.

**Final Check:** Which limit requires algebra?
A) $\lim_{x→3}(2x+1)$ B) $\lim_{x→0}\frac{x^2+3x}{x}$ C) $\lim_{x→2}\frac{x+1}{x-3}$ D) $\lim_{x→1}(x^2-4)$
Answer: B

**Teacher Narration** `[61w]`
> Let's recap. The Limit Laws are your toolkit. When you get an indeterminate form, that's a signal to use algebra. Factoring and rationalizing are your main weapons. Remember that direct substitution is the final step, not the first. Test yourself with the final multiple choice: only option B gives zero over zero and needs factoring. Good luck with your practice problems!

---
