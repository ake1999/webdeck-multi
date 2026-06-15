# Integration by Substitution

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** Understand the chain rule and basic indefinite integrals.

**Learning Objectives:**
- Identify when an integral is suitable for substitution
- Apply the substitution method step-by-step
- Execute the complete process: choose u, find du, rewrite, integrate, back-substitute
- Evaluate integrals requiring creative substitutions

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 76w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 13 slides (target 12–18)
✅ **required_types**: hook + core + summary present
⚠️ **visual_labs**: 0 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
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
| 1 | hook | 🟢 | ◧ |  | 78w | 17w | Why Substitution? |
| 2 | core | 🟢 | ◧ |  | 70w | 14w | Chain Rule in Reverse |
| 3 | core | 🟢 | ◧ |  | 65w | 16w | The Substitution Rule |
| 4 | 🎛practice | 🟢 | ◧ |  | 72w | 5w | Warm-Up Example |
| 5 | core | 🟢 | ◧ |  | 72w | 9w | The Substitution Algorithm |
| 6 | practice | 🟡 | ⬛⬛ |  | 74w | 9w | Standard Example |
| 7 | misconception | 🟢 | ◧ | ⏸️ | 82w | 13w | Common Mistake: Forgetting the Constant Factor |
| 8 | practice | 🟡 | ⬛⬛ |  | 80w | 11w | Tricky Example: Signs and Constants |
| 9 | 🎛practice | 🟡 | ◧ |  | 76w | 17w | Edge Case: No Obvious Composite |
| 10 | core | 🟢 | ◧ |  | 79w | 12w | Definite Integrals and Substitution |
| 11 | practice | 🟡 | ◧ |  | 90w | 11w | Application Example: Exponential Integral |
| 12 | 🎛challenge | 🔴 | ◧ | ⏸️ | 76w | 14w | [Challenge – Optional] Nested Substitution |
| 13 | summary | 🟢 | ⬛⬛ |  | 74w | 11w | Key Takeaways |

---

### Slide 1 · [HOOK]
**Why Substitution?**  ·  `split_left_right`

**On-screen text** `[17w]`
Integration by substitution is like translating a recipe: replace a complicated expression with a simpler temporary variable.

**LEFT** `[text]`

**Metaphor: The Language Translator**

- French recipe → English translation → cook → translate back
- Integration by substitution works the same: translate a complicated integral into a simpler one.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a diagram with three columns: left column '∫ f(g(x))g'(x) dx' with a label 'Foreign language'; middle column '∫ f(u) du' with label 'Translation (u-substitution)'; right column 'F(u)+C → F(g(x))+C' with label 'Back translation'. Use arrows between columns. Color the middle column green. Include small icons: a book for translation steps.

**Teacher Narration** `[78w]`
> Imagine you have a recipe written in French. You don't speak French, but you notice certain phrases repeat. You translate those phrases into English, cook the dish, and then translate the dish name back. Integration by substitution works exactly the same way. The complicated integral is a foreign language. We translate by letting u equal the troublesome part, integrate in the simpler 'language' of u, and then back-substitute to x. This is the core idea we'll develop today.

---

### Slide 2 · [CORE]
**Chain Rule in Reverse**  ·  `split_left_right`

**On-screen text** `[14w]`
Substitution undoes the chain rule: if the integrand is f'(g(x))·g'(x), set u = g(x).

**LEFT** `[formula_block]`

**Chain Rule (Differentiation):**
$$\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$$

**Reverse (Integration):**
$$\int f'(g(x)) \cdot g'(x) \, dx = f(g(x)) + C$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Show two side-by-side panels. Left panel: a function f(g(x)) with an arrow splitting into f'(g(x)) and g'(x). Right panel: the integral sign showing the reverse process. Use arrows to indicate forward and backward. Use colors: blue for outer, red for inner.

**Teacher Narration** `[70w]`
> You already know that the chain rule tells us how to differentiate compositions. Integration by substitution is simply the chain rule done backwards. If you see an integrand that has the structure of an outer derivative times an inner derivative, you can reverse the process. We let u be the inner function. Then the integral becomes f'(u) du, which is straightforward. This is the foundation of every substitution we'll do.

---

### Slide 3 · [CORE]
**The Substitution Rule**  ·  `split_left_right`

**On-screen text** `[16w]`
Substitution formula: rewrite the entire integral in terms of u and du. All x must disappear.

**LEFT** `[formula_block]`

**Indefinite Integral:**
$$\int f(g(x)) \cdot g'(x) \, dx = \int f(u) \, du$$
where $u = g(x)$, $du = g'(x) \, dx$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a large rectangle with the integral on the left, an arrow pointing to the right with 'u = g(x)' written above the arrow, and on the right the new integral ∫ f(u) du. Below, show the differential substitution: 'du = g'(x) dx'. Use color-coded boxes around g(x) and g'(x).

**Teacher Narration** `[65w]`
> Here's the formal rule. You choose u as the inner function g(x). Then you compute du by differentiating u. The key is that every part of the original integral must be replaced with something in u. If any x remains after substitution, you made a wrong choice. This rule is simple but powerful. Practice will help you develop an instinct for picking the right u.

---

### Slide 4 · [PRACTICE] 🎛 *[1 controls]*
**Warm-Up Example**  ·  `split_left_right`

**On-screen text** `[5w]`
Example: ∫3x²(x³+1)⁴ dx. Step-by-step substitution.

**LEFT** `[steps]`

**Evaluate** $\int 3x^2 (x^3 + 1)^4 \, dx$

1. Let $u = x^3 + 1$
2. $du = 3x^2 dx$ (matches exactly)
3. Rewrite: $\int u^4 \, du$
4. Integrate: $\frac{1}{5}u^5 + C$
5. Back-substitute: $\frac{1}{5}(x^3+1)^5 + C$

**RIGHT** `[visual_spec]`

*Visual Spec:* Animate the substitution: start with the original integral, highlight x^3+1 in red, then replace it with u (fade in). Show 3x^2 dx replaced by du in blue. Collapse to ∫ u^4 du. Then show the antiderivative. Use a checkmark at the end. Use matplotlib to draw text with varying colors.

*Interactive Controls:*
  - 🎛 Button: reveal next step

```python
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(6,4))
ax.text(0.1, 0.8, r'$\int 3x^2 (x^3+1)^4 dx$', fontsize=16)
ax.text(0.1, 0.6, r'$u = x^3+1$', color='red', fontsize=14)
ax.text(0.1, 0.4, r'$du = 3x^2 dx$', color='blue', fontsize=14)
ax.text(0.1, 0.2, r'$\int u^4 du = \frac{1}{5}u^5 + C$', fontsize=14)
ax.text(0.1, 0.0, r'$= \frac{1}{5}(x^3+1)^5 + C$', fontsize=14, fontweight='bold')
ax.axis('off')
plt.show()
```

**Teacher Narration** `[72w]`
> Let's work through a direct example. Notice the integrand has the structure of an outer function (the fourth power) and an inner function x³+1. The derivative of the inner function is 3x², which appears exactly. So we set u equal to x³+1. Then du equals 3x² dx. After substitution, we have a simple power rule integral. We integrate, add the constant, and then replace u with x³+1. Check by differentiating to confirm.

**Student Prompt:** What is the derivative of (x³+1)⁵/5?

---

### Slide 5 · [CORE]
**The Substitution Algorithm**  ·  `split_left_right`

**On-screen text** `[9w]`
Five steps: Choose u, find du, rewrite, integrate, back-substitute.

**LEFT** `[steps]`

1. **Choose** $u = g(x)$ (the 'inner' function)
2. **Find** $du = g'(x) dx$
3. **Rewrite** the integral in terms of $u$ and $du$
4. **Integrate** with respect to $u$
5. **Back-substitute** $u = g(x)$

*If any $x$ remains after Step 3, choose a different $u$.*

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a flowchart with 5 boxes arranged vertically, each with an arrow down. Box 1: 'Choose u' in blue. Box 2: 'Find du' in green. Box 3: 'Rewrite integral' in yellow. Box 4: 'Integrate' orange. Box 5: 'Back-substitute' pink. Next to box 3, a red exclamation mark and text 'No x left?'

**Teacher Narration** `[72w]`
> Let's solidify the process into a clear five-step algorithm. First, choose u—usually the inside of a composite function. Second, differentiate to get du. Third, rewrite the whole integral in terms of u. If any x remains, you need to pick a different u. Fourth, integrate with respect to u using basic rules. Finally, back-substitute the original expression for u to get the answer in x. This algorithm works for most substitution problems.

---

### Slide 6 · [PRACTICE] 🟡
**Standard Example**  ·  `full_width`

**On-screen text** `[9w]`
Example: ∫√(2x+1) dx. Use substitution to simplify the radical.

**FULL WIDTH** `[steps]`

**Evaluate** $\int \sqrt{2x+1} \, dx$

| Step | Action |
|------|--------|
| 1 | $u = 2x+1$ |
| 2 | $du = 2\,dx$ → $dx = du/2$ |
| 3 | $\int \sqrt{u} \cdot \frac{du}{2} = \frac{1}{2} \int u^{1/2} du$ |
| 4 | $\frac{1}{2} \cdot \frac{2}{3} u^{3/2} + C = \frac{1}{3} u^{3/2} + C$ |
| 5 | $\frac{1}{3} (2x+1)^{3/2} + C$ |

*Try $u = \sqrt{2x+1}$ for an alternative solution.*

**Teacher Narration** `[74w]`
> Now a classic exam problem. The square root makes it look complicated, but substitution works smoothly. We choose u as the inside of the square root: 2x+1. Then du equals 2 dx, so we solve for dx. After substitution, we have a power of u. Integrate using the power rule, then back-substitute. Notice that we could also set u equal to the entire square root, which leads to the same result. That shows flexibility.

**Student Prompt:** Try setting u = √(2x+1) and verify the result.

---

### Slide 7 · [MISCONCEPTION] ⏸️ *[YouTube Pause]*
**Common Mistake: Forgetting the Constant Factor**  ·  `split_left_right`

**On-screen text** `[13w]`
Beware: When du differs from the integrand by a constant factor, adjust accordingly.

**LEFT** `[text]`

**Wrong approach:**

$$\int x \cos(x^2) \, dx$$
Let $u = x^2$, $du = 2x\,dx$ → $\int \cos u \, du$

**Why it's wrong:**
$du = 2x\,dx$, so $x\,dx = \frac{1}{2} du$.
The correct integral is $\frac{1}{2} \int \cos u \, du$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show two paths. Left path: wrong substitution with red X. Right path: correct substitution with green check. Highlight the factor 1/2 in the correct path. Use arrows to show the step where the mistake occurs (missing factor).

**Teacher Narration** `[82w]`
> A very common mistake is to forget the constant factor that arises when solving for dx. Here, we set u equal to x². Then du equals 2x dx, but our integrand has only x dx. So we must solve for x dx which is du over 2. Many students forget to include the half, leading to an incorrect integral. Always check that you have completely replaced dx, including any constant factors. This mistake is so common that it's worth double-checking every time.

**Student Prompt:** What would the correct final answer be?

---

### Slide 8 · [PRACTICE] 🟡
**Tricky Example: Signs and Constants**  ·  `full_width`

**On-screen text** `[11w]`
Pay attention to signs: derivative of 1−4x² is −8x, not 8x.

**FULL WIDTH** `[steps]`

**Evaluate** $\int \frac{x}{\sqrt{1-4x^2}} \, dx$

1. $u = 1-4x^2$ (inside square root)
2. $du = -8x\, dx$ → $x\, dx = -\frac{1}{8} du$
3. $\int \frac{1}{\sqrt{u}} \cdot \left(-\frac{1}{8}\right) du = -\frac{1}{8} \int u^{-1/2} du$
4. $-\frac{1}{8} \cdot 2u^{1/2} + C = -\frac{1}{4} \sqrt{u} + C$
5. $-\frac{1}{4} \sqrt{1-4x^2} + C$

**Teacher Narration** `[80w]`
> This problem tests careful handling of signs. The inside function is 1 minus 4x squared. Its derivative is negative 8x. So when we substitute, we get a negative sign, and we also have a constant factor. Many students drop the negative sign and get the wrong answer. Follow each step methodically: find du correctly, solve for the piece that matches the numerator, and keep track of constants. The final answer has a negative sign because the original derivative was negative.

**Student Prompt:** What would the answer be if you forgot the negative sign?

---

### Slide 9 · [PRACTICE] 🟡 🎛 *[1 controls]*
**Edge Case: No Obvious Composite**  ·  `split_left_right`

**On-screen text** `[17w]`
∫ ln x / x dx: No composite function, but ln x and 1/x form a pair.

**LEFT** `[steps]`

**Evaluate** $\int \frac{\ln x}{x} \, dx$

1. Let $u = \ln x$
2. $du = \frac{1}{x} dx$
3. $\int u \, du$
4. $\frac{1}{2}u^2 + C = \frac{1}{2}(\ln x)^2 + C$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot y = ln(x)/x for x from 0.1 to 5. Show the area under the curve from 1 to e. Indicate the substitution mapping: highlight ln x in red and 1/x dx as its derivative in blue.

*Interactive Controls:*
  - 🎛 Slider: show/hide u-substitution steps

```python
import numpy as np, matplotlib.pyplot as plt
x = np.linspace(0.1,5,400)
y = np.log(x)/x
plt.plot(x,y, label=r'$\frac{\ln x}{x}$', color='purple')
plt.fill_between(x, y, where=(x>=1)&(x<=np.e), alpha=0.3, color='purple')
plt.axvline(1, color='gray', linestyle='--')
plt.axvline(np.e, color='gray', linestyle='--')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.show()
```

**Teacher Narration** `[76w]`
> Here's an integral that doesn't look like a composition at first. But notice that ln x and 1/x appear together, and the derivative of ln x is exactly 1/x. So we set u equal to ln x. Then du is 1/x dx, which matches perfectly. This is a pattern: if you see a function and its derivative in the integrand, substitution works. The key is to be flexible and look for pairs, not just nested functions.

**Student Prompt:** Try integrating ∫ e^x / x dx. Does substitution work?

---

### Slide 10 · [CORE]
**Definite Integrals and Substitution**  ·  `split_left_right`

**On-screen text** `[12w]`
For definite integrals, change limits to u or back-substitute. Never mix methods.

**LEFT** `[formula_block]`

**Definite Integral Rule:**
$$\int_a^b f(g(x)) \cdot g'(x) \, dx = \int_{g(a)}^{g(b)} f(u) \, du$$

**Two Methods:**
- **A:** Change limits to $u$, integrate, done.
- **B:** Keep $x$ limits, integrate in $u$, back-substitute, then evaluate.

*Never mix methods!*

**RIGHT** `[visual_spec]`

*Visual Spec:* Show x-axis with points a and b, below that show u-axis with points g(a) and g(b). Arrows connecting a to g(a), b to g(b). Label the transformation u = g(x).

**Teacher Narration** `[79w]`
> When dealing with definite integrals, substitution works the same way, but you have a choice. The recommended method is to change the limits of integration to u. That way, you never need to return to x. Alternatively, you can keep the original x-limits, find the antiderivative in terms of u, back-substitute to x, and then evaluate at the original limits. Both methods are correct, but never mix them. If you change the limits, use them to evaluate in u.

---

### Slide 11 · [PRACTICE] 🟡
**Application Example: Exponential Integral**  ·  `split_left_right`

**On-screen text** `[11w]`
∫₀¹ 4x e^{x²} dx → change limits, integrate in u, done.

**LEFT** `[steps]`

**Evaluate** $\int_0^1 4x e^{x^2} \, dx$

1. $u = x^2$, $du = 2x\,dx$
2. $4x\,dx = 2\,du$
3. Limits: $x=0\to u=0$, $x=1\to u=1$
4. $\int_0^1 2e^u \, du = 2e^u \big|_0^1 = 2(e-1)$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot y = 4x e^{x^2} for x in [0,1]. Shade the area under the curve. Show in the corner the substitution transformation: u = x^2, and the new integral ∫ 2e^u du from 0 to 1.

```python
import numpy as np, matplotlib.pyplot as plt
x = np.linspace(0,1,200)
y = 4*x*np.exp(x**2)
plt.plot(x,y, color='green', linewidth=2)
plt.fill_between(x, y, alpha=0.3, color='green')
plt.xlabel('x')
plt.ylabel('$4x e^{x^2}$')
plt.title('Area = $2(e-1)$')
plt.grid()
plt.show()
```

**Teacher Narration** `[90w]`
> This is a typical application from probability and physics. The integrand has the form of the derivative of e to the x squared. We set u equal to x squared. Then du equals 2x dx, so we adjust the constant to match the 4x. We change the limits: when x is 0, u is 0; when x is 1, u is 1. Then the integral becomes 2 times e to the u from 0 to 1, which equals 2 times e minus 1. This method is clean and avoids back-substitution.

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* ⏸️ *[YouTube Pause]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Nested Substitution**  ·  `split_left_right`

**On-screen text** `[14w]`
Challenge: ∫ e^{√x} / √x dx. Use u = √x and handle the differential.

**LEFT** `[text]`

**Evaluate** $\int \frac{e^{\sqrt{x}}}{\sqrt{x}} \, dx$

*Hint:* Let $u = \sqrt{x}$, then $x = u^2$, $dx = 2u\,du$.

$\int \frac{e^u}{u} \cdot 2u\,du = 2\int e^u\,du = 2e^u + C = 2e^{\sqrt{x}} + C$

**RIGHT** `[visual_spec]`

*Visual Spec:* Animate the substitution: show 1/√x dx becoming 2 du. Use a nested arrow to indicate that u = √x has derivative 1/(2√x). Show the simplification step by step.

*Interactive Controls:*
  - 🎛 Slider: step through substitution process

**Teacher Narration** `[76w]`
> For those ready for a challenge, try this integral. It requires a substitution that's not immediately obvious. If we let u equal the square root of x, then we need to express dx in terms of du. Since x equals u squared, dx equals 2u du. Then the whole integral simplifies beautifully. This shows that sometimes you need to solve for x and dx completely. It's a tiny trick but very rewarding when you see it.

**Student Prompt:** Try it yourself before revealing the steps.

---

### Slide 13 · [SUMMARY]
**Key Takeaways**  ·  `full_width`

**On-screen text** `[11w]`
Review: substitution reverses the chain rule. Practice with the provided problems.

**FULL WIDTH** `[text]`

**Integration by Substitution**

1. Choose $u = g(x)$ and $du = g'(x)\,dx$.
2. Rewrite the integral entirely in $u$.
3. Integrate, then back-substitute.
4. For definite integrals, change limits or back-substitute – but never mix.
5. Practice makes perfect: look for composite functions or function-derivative pairs.

**Teacher Narration** `[74w]`
> Let's quickly recap. Substitution is the chain rule in reverse. You identify an inner function u, compute du, replace all x's, integrate with respect to u, and then back-substitute. For definite integrals, changing limits avoids extra steps. We saw examples ranging from direct to tricky. The key is practice. Try the take-home problems to build speed and confidence. Remember, if an x remains after substitution, your choice of u was wrong – try again.

---
