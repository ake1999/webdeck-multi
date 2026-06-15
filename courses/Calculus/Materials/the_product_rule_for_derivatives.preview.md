# The Product Rule For Derivatives

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should be comfortable with the power rule, constant rule, and sum/difference rule for derivatives.

**Learning Objectives:**
- State the product rule formula correctly
- Apply the product rule to products of polynomials, exponentials, and trigonometric functions
- Decide when to use the product rule versus algebraic simplification
- Avoid the common mistake of multiplying derivatives instead of adding two terms

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 68w)
⚠️ **Narration too short (<60w):** [6, 9]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s6:57w', 's9:56w']
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
| 1 | 🎛hook | 🟢 | ◧ |  | 83w | 5w | The Product Rule For Derivatives |
| 2 | 🎛core | 🟢 | ◧ | ⏸️ | 83w | 13w | Prerequisite Check |
| 3 | 🎛misconception | 🟢 | ◧ |  | 76w | 12w | Why Can't We Just Multiply Derivatives? |
| 4 | 🎛core | 🟢 | ◧ |  | 65w | 17w | The Product Rule Formula |
| 5 | practice | 🟢 | ◧ | ⏸️ | 71w | 5w | Example 1: Polynomial × Trigonometric |
| 6 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 57w⚠️ | 8w | Pause and Try: Similar Problem |
| 7 | practice | 🟢 | ◧ |  | 70w | 4w | Example 2: Polynomial × Polynomial |
| 8 | practice | 🟡 | ◧ |  | 66w | 10w | Example 3: Radical × Exponential |
| 9 | practice | 🟢 | ◧ |  | 56w⚠️ | 16w | Example 4: Edge Case – Constant Times Function |
| 10 | practice | 🟡 | ◧ |  | 64w | 10w | Example 5: Application – Bacteria Growth |
| 11 | 🎛visual_lab | 🟢 | ◧ |  | 61w | 18w | Visual Lab: Explore the Product Rule |
| 12 | practice | 🟡 | ⬛⬛ | ⏸️ | 64w | 11w | Practice Problem Ladder |
| 13 | challenge | 🔴 | ◧ |  | 74w | 12w | [Challenge – Optional] Proof of the Product Rule |
| 14 | summary | 🟢 | ◧ |  | 65w | 11w | Key Takeaways |

---

### Slide 1 · [HOOK] 🎛 *[2 controls]*
**The Product Rule For Derivatives**  ·  `split_left_right`

**On-screen text** `[5w]`
State, apply, decide, avoid mistakes.

**LEFT** `[text]`

By the end of this lecture, you will be able to:
- **State** the product rule formula correctly
- **Apply** it to products of polynomials, exponentials, and trigonometric functions
- **Decide** when to use vs. simplify first
- **Avoid** the common mistake of multiplying derivatives

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of f(x)=x^2 (blue), g(x)=sin(x) (green), h(x)=x^2*sin(x) (red) for x in [0,2]. Show tangent line at x=1 with slope h'(1)=1*cos(1)+2*sin(1). Legend and grid.

*Interactive Controls:*
  - 🎛 Slider for x from 0 to 2
  - 🎛 Toggle: show/hide tangent line

**Teacher Narration** `[83w]`
> Welcome. Today we tackle the product rule. You've learned to differentiate sums and differences easily. But what happens when two functions are multiplied? The natural guess is to multiply their derivatives, but that's wrong. Let's see why and learn the correct formula. By the end, you'll handle products of polynomials, exponentials, trig functions, and even apply it to real-world growth problems. The product rule is a fundamental tool that appears in many areas of calculus, so mastering it now will pay off later.

---

### Slide 2 · [CORE] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Prerequisite Check**  ·  `split_left_right`

**On-screen text** `[13w]`
You need these rules before the product rule. Test yourself with the check.

**LEFT** `[concept]`

**Power Rule:** $\frac{d}{dx}[x^n] = nx^{n-1}$

**Constant Rule:** $\frac{d}{dx}[c] = 0$

**Sum/Difference Rule:** $\frac{d}{dx}[f \pm g] = f' \pm g'$

Quick check: Find $\frac{d}{dx}[3x^2 + 5]$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of y=3x^2+5 (blue) and its derivative y=6x (red) for x in [-2,2]. Highlight that constant drops out.

*Interactive Controls:*
  - 🎛 Button: reveal answer
  - 🎛 Toggle: show/hide derivative curve

**Teacher Narration** `[83w]`
> Before we dive in, make sure you have these basics down. The power rule, constant rule, and sum rule are your foundation. Try the quick check in your head. The derivative of three x squared plus five is six x, because the derivative of three x squared is six x, and the constant five drops to zero. If you got it right, you are ready. These rules are the building blocks for the product rule, so it's important to be comfortable with them.

**Student Prompt:** Find the derivative of $3x^2 + 5$.

---

### Slide 3 · [MISCONCEPTION] 🎛 *[2 controls]*
**Why Can't We Just Multiply Derivatives?**  ·  `split_left_right`

**On-screen text** `[12w]`
The product of derivatives does NOT equal the derivative of the product.

**LEFT** `[steps]`

Test the incorrect guess: $f(x)=x$, $g(x)=x^2$

- Product: $h(x)=x^3$, correct derivative: $3x^2$
- Wrong: $f'(x)g'(x)=1\cdot 2x = 2x$
- $3x^2 \neq 2x$ → wrong!

**RIGHT** `[visual_spec]`

*Visual Spec:* Two panels: left shows f(x)=x, g(x)=x^2, h(x)=x^3. Right shows correct h'=3x^2 (solid) and wrong f'g'=2x (dashed). Mark the difference at x=1.

*Interactive Controls:*
  - 🎛 Toggle: show/hide wrong derivative
  - 🎛 Button: reset view

**Teacher Narration** `[76w]`
> Many students guess that the derivative of a product is the product of the derivatives. Let's test it with simple functions: f equals x, g equals x squared. Their product is x cubed, whose derivative is three x squared. But if we multiply the derivatives, we get one times two x equals two x. These are not equal. So that guess fails. Let's see the correct formula. This example shows why we need a new rule.

**Student Prompt:** Why is $f'(x)g'(x)$ not equal to $(f(x)g(x))'$?

---

### Slide 4 · [CORE] 🎛 *[2 controls]*
**The Product Rule Formula**  ·  `split_left_right`

**On-screen text** `[17w]`
The product rule is a sum of two terms: $f g' + f' g$. Never $f' g'$.

**LEFT** `[formula_block]`

$$\frac{d}{dx}[f(x)g(x)] = f(x)g'(x) + f'(x)g(x)$$

Memory aid: "First times derivative of second, plus derivative of first times second."

**RIGHT** `[visual_spec]`

*Visual Spec:* Diagram: two functions labeled f and g. Arrows from f to g' and from f' to g, with a plus sign. Color-coded.

*Interactive Controls:*
  - 🎛 Button: highlight first term
  - 🎛 Button: highlight second term

**Teacher Narration** `[65w]`
> The correct product rule is a sum of two terms. Take the first function times the derivative of the second, plus the derivative of the first times the second. This is not a product of derivatives, but a sum of two products. Use the memory aid: 'first times derivative of second, plus derivative of first times second'. This formula is the key to differentiating products.

---

### Slide 5 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Example 1: Polynomial × Trigonometric**  ·  `split_left_right`

**On-screen text** `[5w]`
Warm-up: differentiate $x^2 \sin x$.

**LEFT** `[steps]`

Find $\frac{d}{dx}[x^2 \sin x]$

1. $f=x^2$, $g=\sin x$
2. $f'=2x$, $g'=\cos x$
3. Apply: $x^2 \cos x + 2x \sin x$
4. Answer: $\boxed{x^2\cos x + 2x\sin x}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of f(x)=x^2, g(x)=sin x, h(x)=x^2 sin x. At x=1, tangent to h with slope value. Show two colored vertical bars representing the two terms of the derivative.

**Teacher Narration** `[71w]`
> Let's apply the product rule to a warm-up. Identify f as x squared, g as sine x. Their derivatives are two x and cosine x. Then plug into the formula: f times g prime gives x squared times cosine x, plus f prime times g gives two x times sine x. That's our answer. Notice how both terms survive. Pause the video and try a similar problem on the next slide.

**Student Prompt:** Try it: differentiate $x^3 \cos x$ (answer on next slide)

---

### Slide 6 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause and Try: Similar Problem**  ·  `split_left_right`

**On-screen text** `[8w]`
Pause the video and differentiate $x^3 \cos x$.

**LEFT** `[text]`

Find $\frac{d}{dx}[x^3 \cos x]$

**RIGHT** `[visual_spec]`

*Visual Spec:* Blank axes with only the function x^3 cos x plotted for x in [-1.5,1.5]. No derivative shown.

*Interactive Controls:*
  - 🎛 Button: Reveal answer

**Teacher Narration** `[57w ⚠️ **TOO SHORT: 57w < 60w min**]`
> Now it's your turn. Pause the video and try to differentiate x cubed times cosine x. Set up f and g, find their derivatives, and apply the product rule. When you're ready, click the button to reveal the answer. See if you got it right. This is a good way to build confidence with the product rule.

**Student Prompt:** Differentiate $x^3 \cos x$.

---

### Slide 7 · [PRACTICE]
**Example 2: Polynomial × Polynomial**  ·  `split_left_right`

**On-screen text** `[4w]`
Standard example: differentiate $(3x^2+2x)(x^3-5)$.

**LEFT** `[steps]`

Find $h'(x)$ if $h(x) = (3x^2+2x)(x^3-5)$

1. $f=3x^2+2x$, $g=x^3-5$
2. $f'=6x+2$, $g'=3x^2$
3. Apply: $(3x^2+2x)(3x^2)+(6x+2)(x^3-5)$
4. Simplify: $15x^4+8x^3-30x-10$

Verification by expansion: $3x^5+2x^4-15x^2-10x$, derivative: $15x^4+8x^3-30x-10$ ✓

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of h(x) and its derivative. Show that the derivative matches result from expanding product.

**Teacher Narration** `[70w]`
> Now a standard example with two polynomials. Identify f and g as the two factors. Compute their derivatives. Then plug into the product rule. You get a sum of two products. Expand and combine like terms. The final answer is fifteen x to the fourth plus eight x cubed minus thirty x minus ten. As a check, you could expand the product first and differentiate term by term to confirm.

---

### Slide 8 · [PRACTICE] 🟡
**Example 3: Radical × Exponential**  ·  `split_left_right`

**On-screen text** `[10w]`
Tricky: differentiate $\sqrt{t} \cdot e^t$. Remember to rewrite the radical.

**LEFT** `[steps]`

Find $\frac{d}{dt}[\sqrt{t} \cdot e^t]$

1. Rewrite: $f=t^{1/2}$, $g=e^t$
2. $f'=\frac12 t^{-1/2}$, $g'=e^t$
3. Apply: $t^{1/2} e^t + \frac12 t^{-1/2} e^t$
4. Factor: $e^t t^{-1/2}(t+\frac12) = e^t\left(\sqrt{t}+\frac{1}{2\sqrt{t}}\right)$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of sqrt(t)*e^t for t in [0.1,2]. Tangent at t=1 with slope. Two dashed lines showing the two component terms of the derivative.

**Teacher Narration** `[66w]`
> Now a trickier example involving a radical. Always rewrite radicals as powers: square root of t is t to the one-half. Then differentiate using the power rule for the radical part. The exponential stays the same. The product rule gives two terms. You can factor out e to the t and something with t to combine into a cleaner form. Be careful with the fractional exponent.

**Student Prompt:** Try: differentiate $x^{1/3} e^x$ (answer in practice ladder)

---

### Slide 9 · [PRACTICE]
**Example 4: Edge Case – Constant Times Function**  ·  `split_left_right`

**On-screen text** `[16w]`
Edge case: derivative of constant times function. Use product rule but constant multiple rule is simpler.

**LEFT** `[steps]`

Find $g'(x)$ if $g(x)=5x^3$

1. $f=5$, $g=x^3$
2. $f'=0$, $g'=3x^2$
3. Apply: $5\cdot3x^2 + 0\cdot x^3 = 15x^2$

Key: The $f'g$ term vanishes because $f'=0$. This matches the constant multiple rule.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of 5x^3 and its derivative 15x^2. Annotation highlighting that product rule gives same as constant multiple rule.

**Teacher Narration** `[56w ⚠️ **TOO SHORT: 56w < 60w min**]`
> What if one factor is a constant? The product rule still applies. Take f as the constant five, g as x cubed. f prime is zero, so the second term vanishes, leaving five times three x squared equals fifteen x squared. This matches the constant multiple rule. But it's overkill—use the constant multiple rule when possible.

---

### Slide 10 · [PRACTICE] 🟡
**Example 5: Application – Bacteria Growth**  ·  `split_left_right`

**On-screen text** `[10w]`
Real-world application: bacteria growth. Find rate of change at t=3.

**LEFT** `[steps]`

Population $N(t) = (t^2+1)e^{0.1t}$. Find rate at $t=3$.

1. $f=t^2+1$, $g=e^{0.1t}$
2. $f'=2t$, $g'=0.1e^{0.1t}$
3. $N'(t) = (t^2+1)(0.1e^{0.1t}) + (2t)(e^{0.1t})$
4. Factor: $e^{0.1t}[0.1(t^2+1)+2t]$
5. At $t=3$: $e^{0.3}[0.1(10)+6] = 7e^{0.3} \approx 9.45$ bacteria/hour.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of N(t) for t in [0,5]. Mark point at t=3 with tangent line. Show slope value 9.45.

**Teacher Narration** `[64w]`
> Let's look at a real-world application. A bacteria population is modeled by the product of a polynomial and an exponential. The rate of change is the derivative, found using the product rule. At t equals three hours, the derivative gives approximately nine point four five bacteria per hour. The product rule lets us handle such combined models. This shows how calculus applies to biology.

---

### Slide 11 · [VISUAL_LAB] 🎛 *[3 controls]*
**Visual Lab: Explore the Product Rule**  ·  `split_left_right`

**On-screen text** `[18w]`
Explore the product rule interactively. Adjust the point and see how the derivative is built from two parts.

**LEFT** `[text]`

Drag the slider to change the point x. The red curve is $h(x)=f(x)g(x)$. The dashed line is the tangent with slope $h'(x)=f(x)g'(x)+f'(x)g(x)$. Toggle to see the two contributions separately.

**RIGHT** `[python_lab]`

*Visual Spec:* Interactive plot: slider for x from 0 to 2, toggles to show contributions of f'g and fg'. Functions: f(x)=x^2, g(x)=sin(x). Axis ranges: x in [0,2], y in [-2,5]. Layout: slider at bottom, checkboxes on right.

*Interactive Controls:*
  - 🎛 Slider for x from 0 to 2
  - 🎛 Checkbox: Show f*g' contribution
  - 🎛 Checkbox: Show f'*g contribution

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, CheckButtons

# Define functions
f = lambda x: x**2
g = lambda x: np.sin(x)
f_prime = lambda x: 2*x
g_prime = lambda x: np.cos(x)
product = lambda x: f(x)*g(x)

x_vals = np.linspace(0, 2, 400)

fig, ax = plt.subplots(figsize=(8, 6))
plt.subplots_adjust(left=0.1, bottom=0.25)

# Plot product
line_product, = ax.plot(x_vals, product(x_vals), 'r-', label='h(x)=f(x)g(x)')
line_tangent, = ax.plot([], [], 'r--', lw=2, label='Tangent')
point, = ax.plot([], [], 'ro', markersize=8)

# Contribution lines (initially invisible)
line_fg_prime, = ax.plot([], [], 'g--', lw=1, alpha=0.6, label='f * g\'')
line_f_prime_g, = ax.plot([], [], 'b--', lw=1, alpha=0.6, label='f\' * g')

ax.set_ylim(-2, 5)
ax.legend(loc='upper left')
ax.grid(True, alpha=0.3)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Product Rule Visual')

# Slider
ax_slider = plt.axes([0.1, 0.1, 0.65, 0.03])
slider = Slider(ax_slider, 'x', 0, 2, valinit=1)

# Toggles
ax_check = plt.axes([0.8, 0.3, 0.15, 0.1])
check = CheckButtons(ax_check, ['Show fg\'', 'Show f\'g'], [False, False])

# Update function
def update(val):
    a = slider.val
    h_a = product(a)
    h_prime_a = f(a)*g_prime(a) + f_prime(a)*g(a)
    # tangent line
    tangent_x = np.linspace(a-0.3, a+0.3, 10)
    tangent_y = h_prime_a*(tangent_x - a) + h_a
    line_tangent.set_data(tangent_x, tangent_y)
    # point
    point.set_data([a], [h_a])
    # contributions: horizontal lines at the point showing the two term values
    x_local = np.linspace(0.1, 2, 100)
    fg_prime_val = f(a)*g_prime(a)
    f_prime_g_val = f_prime(a)*g(a)
    # draw horizontal lines at the contribution values
    line_fg_prime.set_data([a-0.3, a+0.3], [fg_prime_val, fg_prime_val])
    line_f_prime_g.set_data([a-0.3, a+0.3], [f_prime_g_val, f_prime_g_val])
    fig.canvas.draw_idle()

slider.on_changed(update)

# Toggle visibility
def toggle_contributions(label):
    if label == 'Show fg\'':
        line_fg_prime.set_visible(not line_fg_prime.get_visible())
    elif label == 'Show f\'g':
        line_f_prime_g.set_visible(not line_f_prime_g.get_visible())
    fig.canvas.draw_idle()

check.on_clicked(toggle_contributions)

update(1)
plt.show()
```

**Teacher Narration** `[61w]`
> This interactive lab lets you explore the product rule visually. The red curve is the product of two functions. Drag the slider to change the point. The tangent line shows the derivative. Use the toggles to see how the two contributions—f times g prime and f prime times g—add up to give the total slope. This makes the formula come alive.

**Student Prompt:** Move the slider and observe how the two contributions sum to the derivative.

---

### Slide 12 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Practice Problem Ladder**  ·  `full_width`

**On-screen text** `[11w]`
Practice problems from easy to challenge. Attempt all before checking answers.

**FULL WIDTH** `[]`



**Teacher Narration** `[64w]`
> Here's a ladder of practice problems. Start with the easy one: derivative of two x times x squared plus one. Then move to medium, hard, and challenge. For the challenge, you need to apply product rule twice because there are three factors. Pause the video and try them all before clicking 'Show Answers'. Working through these will solidify your understanding of the product rule.

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof of the Product Rule**  ·  `split_left_right`

**On-screen text** `[12w]`
Optional: Proof using limit definition. The 'add and subtract' trick is key.

**LEFT** `[steps]`

Start from limit definition:

$(fg)'(x) = \lim_{h\to0} \frac{f(x+h)g(x+h)-f(x)g(x)}{h}$

Add and subtract $f(x)g(x+h)$:

$= \lim_{h\to0} \frac{[f(x+h)-f(x)]g(x+h) + f(x)[g(x+h)-g(x)]}{h}$

Split limit:

$= \lim_{h\to0} \frac{f(x+h)-f(x)}{h} \cdot \lim_{h\to0} g(x+h) + f(x) \cdot \lim_{h\to0} \frac{g(x+h)-g(x)}{h}$

Since $g$ continuous: $= f'(x)g(x) + f(x)g'(x)$

**RIGHT** `[visual_spec]`

*Visual Spec:* Diagram: rectangle of area f(x)g(x). As x increases by h, new strips represent f'(x)g(x)h and f(x)g'(x)h. Color-coded.

**Teacher Narration** `[74w]`
> This slide is optional for those interested in the proof. It starts from the limit definition of derivative. The clever trick is to add and subtract f of x times g of x plus h. This breaks the change into two parts that look like the product rule. Then we take limits. The key insight: the change in the product is approximately the change in f times g plus change in g times f.

---

### Slide 14 · [SUMMARY]
**Key Takeaways**  ·  `split_left_right`

**On-screen text** `[11w]`
Remember: product rule = sum of two products. Never multiply derivatives.

**LEFT** `[text]`

1. **Formula:** $(fg)' = fg' + f'g$
2. **When to use:** genuine products of functions
3. **When not to use:** constants (use constant multiple), expandable products (expand first)
4. **Common mistake:** writing $f'g'$ instead of sum

**RIGHT** `[visual_spec]`

*Visual Spec:* Boxed formula with arrows for the two parts. Checkmark for correct, X for wrong.

**Teacher Narration** `[65w]`
> Let's summarize. The product rule says the derivative of a product is the first times derivative of the second, plus derivative of the first times the second. Use it when you have a genuine product of two variable expressions. Avoid the common mistake of multiplying derivatives. Next up, the chain rule for compositions. The product rule is a powerful tool that you will use frequently.

---
