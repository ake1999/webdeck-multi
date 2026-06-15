# The Chain Rule

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should already know the power rule, basic trigonometric derivatives, and product and quotient rules.

**Learning Objectives:**
- Calculate derivatives of composite functions using the chain rule
- Apply the chain rule to differentiate functions involving nested compositions
- Analyze complex derivative problems by systematically identifying outer and inner functions
- Interpret the chain rule as a rate of change composition

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 75w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
⚠️ **visual_specs**: missing on slides: [9]
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
| 0 | hook | 🟢 | ◧ |  | 65w | 10w | Why the Chain Rule? |
| 1 | 🎛core | 🟢 | ◧ |  | 64w | 14w | The Chain Rule Formula |
| 2 | core | 🟢 | ◧ |  | 62w | 13w | Leibniz Notation |
| 3 | practice | 🟢 | ⬛⬛ |  | 88w | 2w | Warm-Up Example |
| 4 | practice | 🟢 | ⬛⬛ |  | 97w | 4w | Standard Example |
| 5 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 76w | 2w | Pause: Try This |
| 6 | core | 🟢 | ⬛⬛ |  | 81w | 4w | Solution: $\cos(x^3)$ |
| 7 | practice | 🟡 | ⬛⬛ |  | 71w | 4w | Tricky Example |
| 8 | 🎛misconception | 🟢 | ◧ |  | 96w | 10w | Common Mistake – Forgetting the Inner Derivative |
| 9 | 🎛visual_lab | 🟢 | ◧ |  | 68w | 10w | Interactive Chain Rule Visualizer |
| 10 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 83w | 5w | Pause: Apply the Chain Rule |
| 11 | core | 🟢 | ⬛⬛ |  | 61w | 1w | Solution: $(3x+1)^4$ |
| 12 | practice | 🔴 | ⬛⬛ |  | 76w | 9w | [Challenge – Optional] Edge Case Example |
| 13 | practice | 🟢 | ⬛⬛ |  | 62w | 2w | Application: Exponential Composition |
| 14 | 🎛challenge | 🔴 | ◧ |  | 94w | 9w | [Challenge – Optional] Proof Sketch |
| 15 | summary | 🟢 | ⬛⬛ |  | 60w | 12w | Summary & Key Points |

---

### Slide 0 · [HOOK]
**Why the Chain Rule?**  ·  `split_left_right`

**On-screen text** `[10w]`
Chain rule: multiply the rates of change along the chain.

**LEFT** `[text]`

Imagine a factory with two machines: one squares numbers, the other takes sine. How fast does the final product change when raw material changes? The chain rule answers this. More concretely: How fast does the area of a circle change when its radius changes? The area A = πr² depends on r, and r depends on time t. The chain rule tells us dA/dt = (dA/dr)·(dr/dt).

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a diagram: box labeled 'g(x)=x²' with input x and output u, arrow to box labeled 'f(u)=sin(u)' with output y. Below, show rate labels: dx/dt, du/dx, dy/du. Arrows connecting them to show multiplication.

**Teacher Narration** `[65w]`
> Think of a factory with two machines. The first machine squares the input, the second machine applies sine to the result. If you want to know how fast the final output changes when you change the raw material, you multiply the rate of change of the first machine by the rate of change of the second. This is the core idea of the chain rule.

---

### Slide 1 · [CORE] 🎛 *[1 controls]*
**The Chain Rule Formula**  ·  `split_left_right`

**On-screen text** `[14w]`
Derivative of a composition = derivative of outer (at inner) × derivative of inner.

**LEFT** `[formula_block]`

$$\frac{d}{dx} \bigl[ f(g(x)) \bigr] = f'(g(x)) \cdot g'(x)$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw three vertical layers: bottom: x, middle: g(x), top: f(g(x)). Show arrows from x to g(x) labeled 'g'(x)', from g(x) to f(g(x)) labeled 'f'(g(x))'. Result at top: product.

*Interactive Controls:*
  - 🎛 Toggle: show/hide step labels

**Teacher Narration** `[64w]`
> The chain rule formalizes the factory idea. If we have a composite function f composed with g, the derivative is the derivative of the outer function evaluated at the inner function, multiplied by the derivative of the inner function. For example, for sin(x²), outer is sin, inner is x². So we get cos(x²) times 2x. This formula is the key to handling any composition.

---

### Slide 2 · [CORE]
**Leibniz Notation**  ·  `split_left_right`

**On-screen text** `[13w]`
If y depends on u and u on x, then dy/dx = (dy/du)·(du/dx).

**LEFT** `[formula_block]`

$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Show x → u → y with arrows. Under each arrow write du/dx and dy/du. Text below: 'Multiply the rates'.

**Teacher Narration** `[62w]`
> Leibniz notation makes the chain rule look like fractions, which is very intuitive. If y is a function of u, and u is a function of x, then the derivative of y with respect to x is the product of the derivative y with respect to u times the derivative u with respect to x. This emphasizes that we are chaining rates.

---

### Slide 3 · [PRACTICE]
**Warm-Up Example**  ·  `full_width`

**On-screen text** `[2w]`
Differentiate $h(x)=(5x-2)^3$

**FULL WIDTH** `[steps]`

| Step | Action | Result |
|------|--------|--------|
| 1 | Identify outer $f(u)=u^3$, inner $g(x)=5x-2$ | |
| 2 | $f'(u)=3u^2$ | |
| 3 | $g'(x)=5$ | |
| 4 | Apply chain rule | $h'(x)=3(5x-2)^2 \cdot 5$ |
| 5 | Simplify | $h'(x)=15(5x-2)^2$ |

**Teacher Narration** `[88w]`
> Let's start with a simple warm-up. The function (5x-2)³. The outer function is something cubed, the inner is 5x-2. Differentiate the outer: 3 times the inner squared, then multiply by the derivative of the inner, which is 5. That gives 15 times (5x-2) squared. This is a straightforward application of the chain rule, and it shows how the derivative of a power of a linear function works. Notice that the exponent decreases by one, and we multiply by the original exponent and the coefficient of the inner function.

**Student Prompt:** Try: $h(x)=(2x+1)^4$; answer: $8(2x+1)^3$

---

### Slide 4 · [PRACTICE]
**Standard Example**  ·  `full_width`

**On-screen text** `[4w]`
Differentiate $y = \sin(e^{2x})$

**FULL WIDTH** `[steps]`

| Step | Action | Result |
|------|--------|--------|
| 1 | Identify layers: $\sin$, $e$, $2x$ | |
| 2 | Derivative of $\sin$: $\cos(e^{2x})$ | |
| 3 | Derivative of $e^{2x}$: $e^{2x}\cdot 2$ | |
| 4 | Multiply: $\cos(e^{2x})\cdot e^{2x}\cdot 2$ | |
| 5 | Final: $2e^{2x}\cos(e^{2x})$ | |

**Teacher Narration** `[97w]`
> Now a slightly more layered example: sin of e to the 2x. Work from the outside. Derivative of sine is cosine, leaving the inner function e^(2x) untouched. Then we need the derivative of e^(2x), which is e^(2x) times the derivative of 2x, which is 2. Multiply them all together to get 2e^(2x) cos(e^(2x)). This example shows how the chain rule applies to a composition of three functions: sine, exponential, and linear. Each layer contributes a factor, and we multiply them all together. The key is to work systematically from the outermost function inward, never forgetting any layer.

**Student Prompt:** Now try $y = \cos(e^{x})$; answer: $-e^{x}\sin(e^{x})$

---

### Slide 5 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause: Try This**  ·  `split_left_right`

**On-screen text** `[2w]`
Differentiate $\cos(x^3)$

**LEFT** `[text]`

Differentiate $h(x) = \cos(x^3)$

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a question mark inside a box. Text: 'Write your answer, then press play.' Dimensions: 400x300 pixels. Background: light gray (#f0f0f0). Box border: 2px solid #333. Question mark in bold 48pt font. No animation.

*Interactive Controls:*
  - 🎛 Button: Show Answer

**Teacher Narration** `[76w]`
> Pause the video now and try to differentiate cos of x cubed. Use the chain rule. Remember to identify the outer function cosine and the inner function x cubed. Write down your answer, then press play to see the solution. This is a good test of your understanding because it combines a trigonometric outer function with a power inner function. Take your time and check that you have multiplied by the derivative of the inner function.

---

### Slide 6 · [CORE]
**Solution: $\cos(x^3)$**  ·  `full_width`

**On-screen text** `[4w]`
$h'(x) = -3x^2 \sin(x^3)$

**FULL WIDTH** `[steps]`

| Step | Action | Result |
|------|--------|--------|
| 1 | Outer: $f(u)=\cos u$, inner: $g(x)=x^3$ | |
| 2 | $f'(u) = -\sin u$ | |
| 3 | $g'(x) = 3x^2$ | |
| 4 | $h'(x) = -\sin(x^3) \cdot 3x^2$ | |
| 5 | Simplify: $h'(x) = -3x^2\sin(x^3)$ | |

**Teacher Narration** `[81w]`
> Here's the solution. The outer function is cosine, its derivative is negative sine. The inner function is x cubed, derivative 3x squared. Multiply them to get negative 3x squared times sine of x cubed. Check your answer against this. If you got it right, you are on the right track. If not, review the steps: identify the outer and inner functions, differentiate each, and multiply. The most common mistake here is forgetting the factor 3x², so make sure you included it.

---

### Slide 7 · [PRACTICE] 🟡
**Tricky Example**  ·  `full_width`

**On-screen text** `[4w]`
Differentiate $f(x) = \sqrt{\tan(x^2+1)}$

**FULL WIDTH** `[steps]`

| Step | Action | Result |
|------|--------|--------|
| 1 | Rewrite: $f(x) = (\tan(x^2+1))^{1/2}$ | |
| 2 | Outer: $u^{1/2}$, Inner: $\tan(x^2+1)$ | |
| 3 | Derivative of outer: $\frac{1}{2}u^{-1/2}$ | |
| 4 | Derivative of inner: $\sec^2(x^2+1)\cdot 2x$ | |
| 5 | Multiply: $\frac{1}{2}(\tan(x^2+1))^{-1/2}\cdot \sec^2(x^2+1)\cdot 2x$ | |
| 6 | Simplify: $\frac{x\sec^2(x^2+1)}{\sqrt{\tan(x^2+1)}}$ | |

**Teacher Narration** `[71w]`
> This one is trickier because it has three layers: square root, tangent, and x squared plus one. Rewrite the square root as a power of one half. Then differentiate outward: one half times the tangent raised to negative one half, times the derivative of tangent, which is secant squared, times the derivative of x squared plus one, which is 2x. Simplify to get x secant squared over square root of tangent.

**Student Prompt:** How many times did we use the chain rule? (Answer: 3)

---

### Slide 8 · [MISCONCEPTION] 🎛 *[1 controls]*
**Common Mistake – Forgetting the Inner Derivative**  ·  `split_left_right`

**On-screen text** `[10w]`
Derivative of sin(x²) is NOT just cos(x²). Multiply by 2x.

**LEFT** `[text]`

**Wrong:** $\frac{d}{dx}\sin(x^2) = \cos(x^2)$ 
**Why wrong:** Forgets to multiply by $g'(x)=2x$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show left side: cos(x²) with a red X. Then show correct: cos(x²) · 2x with green check. Animate arrow showing the missing 2x factor.

*Interactive Controls:*
  - 🎛 Button: reveal correct step

**Teacher Narration** `[96w]`
> One of the most common mistakes is forgetting the derivative of the inner function. Students see sin(x²) and immediately write cos(x²), but that's incomplete. The chain rule requires us to multiply by g prime of x, which in this case is 2x. Always check: did you include the factor from the inner derivative? This mistake is so common that it has its own name: the 'chain rule error.' To avoid it, always pause after differentiating the outer function and ask yourself: what is the inner function, and what is its derivative? Then multiply by that derivative.

---

### Slide 9 · [VISUAL_LAB] 🎛 *[3 controls]*
**Interactive Chain Rule Visualizer**  ·  `split_left_right`

**On-screen text** `[10w]`
Use sliders to see how h(x)=sin(x^n) and its tangent change.

**LEFT** `[text]`

Explore how the composition $h(x)=f(g(x))$ changes with $x$. Adjust sliders to change $x$ and the inner exponent.

**RIGHT** `[python_lab]`

*Interactive Controls:*
  - 🎛 Slider for x from -2 to 2
  - 🎛 Slider for n from 1 to 4 (inner exponent)
  - 🎛 Button: Show/Hide tangent line

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

# Default functions
def g(x, n):
    return x**n
def f(u):
    return np.sin(u)
def h(x, n):
    return f(g(x, n))

x_vals = np.linspace(-2, 2, 400)
n0 = 2

fig, ax = plt.subplots(figsize=(8,5))
plt.subplots_adjust(bottom=0.35)

# Plot composition
line, = ax.plot(x_vals, h(x_vals, n0), 'g-', lw=2, label='h(x)=sin(x^n)')
ax.axhline(0, color='gray', lw=0.5)
ax.axvline(0, color='gray', lw=0.5)
ax.set_xlim(-2, 2)
ax.set_ylim(-1.5, 1.5)
ax.set_xlabel('x')
ax.set_ylabel('h(x)')
ax.legend(loc='upper right')
ax.grid(True, alpha=0.3)

# Slider for x (marker point)
ax_x = plt.axes([0.2, 0.2, 0.6, 0.03])
slider_x = Slider(ax_x, 'x', -2, 2, valinit=0)

# Slider for n
ax_n = plt.axes([0.2, 0.15, 0.6, 0.03])
slider_n = Slider(ax_n, 'n (inner exponent)', 1, 4, valinit=n0, valstep=1)

# Toggle for tangent line
ax_toggle = plt.axes([0.2, 0.05, 0.15, 0.04])
button_toggle = Button(ax_toggle, 'Show Tangent')
show_tangent = False
tangent_line, = ax.plot([], [], 'r--', lw=1.5)

def update(val):
    x0 = slider_x.val
    n = int(slider_n.val)
    line.set_ydata(h(x_vals, n))
    # Update tangent if visible
    if show_tangent:
        # Compute derivative at x0: h'(x) = cos(x^n) * n*x^(n-1)
        if x0 != 0:
            slope = np.cos(x0**n) * n * x0**(n-1)
            intercept = h(x0, n) - slope * x0
            x_tan = np.linspace(x0-0.5, x0+0.5, 100)
            y_tan = slope * x_tan + intercept
            tangent_line.set_data(x_tan, y_tan)
        else:
            tangent_line.set_data([], [])
    fig.canvas.draw_idle()

slider_x.on_changed(update)
slider_n.on_changed(update)

def toggle_tangent(event):
    global show_tangent
    show_tangent = not show_tangent
    if show_tangent:
        button_toggle.label.set_text('Hide Tangent')
    else:
        button_toggle.label.set_text('Show Tangent')
    update(None)

button_toggle.on_clicked(toggle_tangent)

plt.show()
# Note: This code uses matplotlib.widgets which may require %matplotlib widget in Jupyter.
```

**Teacher Narration** `[68w]`
> Let's now explore the chain rule interactively. This visualization shows the composition sin(x^n) where you can adjust the exponent n and the point x. The green curve is the composite function. Use the sliders to change x and the inner exponent. Toggle the tangent line to see the slope at that point. Notice how the slope changes with both x and n, illustrating the chain rule in action.

**Student Prompt:** Set n=2 and move x. What do you notice about the slope near x=0?

---

### Slide 10 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause: Apply the Chain Rule**  ·  `split_left_right`

**On-screen text** `[5w]`
Try it: $k(x) = (3x+1)^4$

**LEFT** `[text]`

Differentiate $k(x) = (3x+1)^4$

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a countdown from 10 to 0, then a 'Show Answer' button placeholder.

*Interactive Controls:*
  - 🎛 Button: Show Answer

**Teacher Narration** `[83w]`
> Here's another chance to practice before I reveal the answer. Pause the video, differentiate (3x+1) raised to the fourth power. Identify the outer and inner functions, apply the chain rule, and simplify. When you're ready, press play to check your answer. This problem is similar to the warm-up but with a different coefficient. It will help reinforce the pattern: derivative of a power of a linear function is the exponent times the power decreased by one, times the coefficient of the inner function.

---

### Slide 11 · [CORE]
**Solution: $(3x+1)^4$**  ·  `full_width`

**On-screen text** `[1w]`
$k'(x)=12(3x+1)^3$

**FULL WIDTH** `[steps]`

| Step | Action | Result |
|------|--------|--------|
| 1 | Outer: $f(u)=u^4$, Inner: $g(x)=3x+1$ | |
| 2 | $f'(u)=4u^3$ | |
| 3 | $g'(x)=3$ | |
| 4 | $k'(x)=4(3x+1)^3 \cdot 3$ | |
| 5 | Simplify: $k'(x)=12(3x+1)^3$ | |

**Teacher Narration** `[61w]`
> The answer is 12 times (3x+1) cubed. Outer derivative: 4 times the inner cubed. Inner derivative: 3. Multiply to get 12. If you got that, great! If not, review the steps and try again. Notice the pattern: the derivative of (ax+b)^n is n*a*(ax+b)^(n-1). This is a useful shortcut for linear inner functions, but always remember it comes from the chain rule.

---

### Slide 12 · [PRACTICE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Edge Case Example**  ·  `full_width`

**On-screen text** `[9w]`
Edge: $g(x)=x^2\sin(1/x)$ for $x\neq0$, $g(0)=0$. Find $h'(0)$ for $h(x)=[g(x)]^3$.

**FULL WIDTH** `[steps]`

| Step | Action | Result |
|------|--------|--------|
| 1 | $h(x)=f(g(x))$, $f(u)=u^3$, $g(0)=0$ | |
| 2 | $g'(0)=\lim_{h\to0}\frac{h^2\sin(1/h)-0}{h}=0$ | squeeze theorem |
| 3 | $f'(0)=3\cdot0^2=0$ | |
| 4 | $h'(0)=f'(g(0))\cdot g'(0)=0\cdot0=0$ | chain rule holds |

**Teacher Narration** `[76w]`
> This edge case shows that the chain rule works even when the inner function is weird. Here g of x is x squared times sine of 1 over x for non-zero x, and 0 at 0. Using the squeeze theorem, we find g prime of 0 is 0. Then f prime of g of 0 is f prime of 0, which is also 0. So h prime of 0 is 0, consistent with the chain rule.

**Student Prompt:** Check by directly differentiating $h(x)=x^6\sin^3(1/x)$ and taking the limit.

---

### Slide 13 · [PRACTICE]
**Application: Exponential Composition**  ·  `full_width`

**On-screen text** `[2w]`
Differentiate $h(x)=e^{\cos(3x)}$

**FULL WIDTH** `[steps]`

| Step | Action | Result |
|------|--------|--------|
| 1 | $h(x)=e^{\cos(3x)}$ | |
| 2 | Derivative of $e^u$: $e^u$ evaluated at $u=\cos(3x)$ gives $e^{\cos(3x)}$ | keep inner |
| 3 | Derivative of $\cos(3x)$: $-\sin(3x)\cdot3$ | |
| 4 | $h'(x)=e^{\cos(3x)}\cdot(-\sin(3x))\cdot3$ | |
| 5 | Simplify: $-3e^{\cos(3x)}\sin(3x)$ | |

**Teacher Narration** `[62w]`
> This example combines exponential, trigonometric, and linear functions. The outer is e to the something. Its derivative is itself times the derivative of the exponent. The exponent is cosine of 3x. Derivative of cosine is negative sine of 3x times the derivative of 3x, which is 3. Multiply everything to get negative 3 times e to the cos 3x times sin 3x.

**Student Prompt:** Try $h(x)=e^{\sin(2x)}$; answer: $2e^{\sin(2x)}\cos(2x)$

---

### Slide 14 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Proof Sketch**  ·  `split_left_right`

**On-screen text** `[9w]`
Proof of the chain rule using the limit definition.

**LEFT** `[text]`

$$h'(x)=\lim_{h\to0}\frac{f(g(x+h))-f(g(x))}{h}$$
Let $\Delta u=g(x+h)-g(x)$. Then:
$$h'(x)=\lim_{h\to0}\frac{f(u+\Delta u)-f(u)}{\Delta u}\cdot\frac{\Delta u}{h}$$
As $h\to0$, $\Delta u\to0$, so first limit $\to f'(u)$, second $\to g'(x)$. Hence $h'(x)=f'(g(x))g'(x)$.

**Note:** This proof assumes $\Delta u \neq 0$ for small $h$. If $\Delta u = 0$, the expression is undefined; the standard fix uses a separate case or Carathéodory's lemma to handle that situation rigorously.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a graph with x-axis, g(x) curve, f(g(x)) curve. Animate a small h moving, showing Δu and the secant slopes approaching the derivatives.

*Interactive Controls:*
  - 🎛 Slider: h from -0.1 to 0.1 showing secant line approaching tangent

**Teacher Narration** `[94w]`
> For those interested in the theory, here's a lightweight proof. We start with the definition of the derivative for the composition. By introducing the change in the inner function, we can rewrite the difference quotient as a product of two rates. As h approaches zero, the inner change goes to zero, and the two factors approach the derivatives of f and g respectively. This yields the chain rule. However, this proof assumes Δu is never zero for small h, which may not hold. A rigorous proof handles that case separately or uses Carathéodory's lemma.

**Student Prompt:** Why can't we assume Δu ≠ 0? How is that case handled?

---

### Slide 15 · [SUMMARY]
**Summary & Key Points**  ·  `full_width`

**On-screen text** `[12w]`
Summary: Chain rule formula, Leibniz form, generalized power rule, and three tips.

**FULL WIDTH** `[text]`

**Chain Rule:** $\frac{d}{dx}f(g(x)) = f'(g(x))\,g'(x)$
**Leibniz:** $\frac{dy}{dx}=\frac{dy}{du}\frac{du}{dx}$
**Generalized Power Rule:** $\frac{d}{dx}[g(x)]^n = n[g(x)]^{n-1}g'(x)$

**Tips:**
- Work from the outside in.
- Always multiply by the derivative of the inner function.
- For multiple layers, apply chain rule repeatedly.

**Teacher Narration** `[60w]`
> Today we learned the chain rule, a fundamental tool for differentiating compositions. We saw it in both prime notation and Leibniz notation. The generalized power rule is a handy special case. Remember: work from the outside in, always include the derivative of the inner function, and apply the rule repeatedly for nested compositions. Practice with the examples to build confidence.

---
