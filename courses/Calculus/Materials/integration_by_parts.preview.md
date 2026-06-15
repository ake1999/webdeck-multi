# Integration By Parts

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You need the product rule for differentiation: $(fg)' = f'g + fg'$.

**Learning Objectives:**
- Apply the integration by parts formula to compute integrals of products
- Select appropriate $u$ and $dv$ using the LIATE rule
- Perform iterative integration by parts for polynomial-exponential combinations
- Solve integrals that reappear after repeated application
- Evaluate definite integrals using integration by parts with limits

---

## v3.1 Production Readiness

✅ **Interactive moments:** 4 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 97w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 13 slides (target 12–18)
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
| 1 | hook | 🟢 | ◧ |  | 111w | 8w | From Product Rule to Integration by Parts |
| 2 | core | 🟢 | ◧ |  | 109w | 12w | The Core Formula |
| 3 | core | 🟢 | ◧ |  | 105w | 15w | Choosing $u$ and $dv$: LIATE |
| 4 | practice | 🟢 | ⬛⬛ |  | 86w | 11w | Example 1: Warm-up – $\int x e^x\,dx$ |
| 5 | 🎛pause_and_try | 🟢 | ⬛⬛ | ⏸️ | 94w | 12w | Example 2: Standard – $\int \ln x\,dx$ |
| 6 | practice | 🟡 | ⬛⬛ |  | 94w | 12w | Example 3: Tricky – $\int x^2 e^x\,dx$ |
| 7 | 🎛practice | 🟡 | ⬛⬛ | ⏸️ | 97w | 15w | Example 4: Edge Case – Circular Integration |
| 8 | practice | 🟡 | ⬛⬛ |  | 82w | 9w | Example 5: Application – Definite Integral (Tabular Method) |
| 9 | 🎛visual_lab | 🟢 | ◧ |  | 96w | 10w | Interactive Visual: $\int_0^b x e^x\,dx$ |
| 10 | misconception | 🟢 | ◧ | ⏸️ | 100w | 15w | Common Mistake: Wrong $u$ Choice |
| 11 | 🎛practice | 🟢 | ⬛⬛ |  | 98w | 12w | Practice Problem Ladder |
| 12 | challenge | 🔴 | ⬛⬛ |  | 99w | 7w | [Challenge – Optional] Proof of the Formula |
| 13 | summary | 🟢 | ⬛⬛ |  | 91w | 16w | Summary: Integration by Parts |

---

### Slide 1 · [HOOK]
**From Product Rule to Integration by Parts**  ·  `split_left_right`

**On-screen text** `[8w]`
Product rule → Integration by Parts. Reverse process.

**LEFT** `[concept]`

Differentiation: $(fg)' = f'g + fg'$

Integration by parts reverses this: $\int u\,dv = uv - \int v\,du$

**RIGHT** `[visual_spec]`

*Visual Spec:* Two connected boxes. Box1: 'Product Rule: (fg)' = f'g + fg'' with right arrow labeled 'integrate' pointing to Box2: 'Integration by Parts: ∫ u dv = uv - ∫ v du'. Box2 also has a left arrow labeled 'differentiate'. Use colors: green for Box1, blue for Box2, arrows in black.

**Teacher Narration** `[111w]`
> Integration by parts is essentially the product rule for derivatives in reverse. If you understand how to differentiate a product, you already have the foundation for this technique. The formula on the right shows how we trade one integral for another. Our goal is to choose u and dv so the new integral is simpler. Think of it as undoing a derivative: just as the product rule breaks a product into a sum, integration by parts reassembles that sum into a product minus another integral. This reversal is powerful because it lets us transform a difficult integral into an easier one, provided we make the right choice for u and dv.

---

### Slide 2 · [CORE]
**The Core Formula**  ·  `split_left_right`

**On-screen text** `[12w]`
Integration by Parts: ∫ u dv = uv - ∫ v du

**LEFT** `[formula_block]`

$$\int u\,dv = uv - \int v\,du$$

**Definite:** $$\int_a^b u\,dv = \left.uv\right|_a^b - \int_a^b v\,du$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of u vs v coordinate plane. Shaded rectangle from origin to (v, u) representing uv. Under the curve v = something? Actually simpler: show two shaded areas: a rectangle uv, and under the curve of v du. Label axes 'u' and 'v'. Use colors: uv area in blue, ∫v du area in red. Formula: uv = area of rectangle = blue + red → ∫ u dv = uv - ∫ v du.

**Teacher Narration** `[109w]`
> The formula treats the integral of u dv as the product uv minus the integral of v du. This is only useful if the new integral is easier than the original. A common mistake is to pick u and dv badly, making the new integral harder. Remember, we're trading one differentiation for another: we differentiate u and integrate dv. The key insight is that we want u to become simpler when differentiated, and dv to remain manageable when integrated. For example, if u is a polynomial, its degree drops, which simplifies the integral. If u is a logarithm, it becomes an algebraic function, which is easier to work with.

---

### Slide 3 · [CORE]
**Choosing $u$ and $dv$: LIATE**  ·  `split_left_right`

**On-screen text** `[15w]`
LIATE: choose u earliest in list. L > I > A > T > E.

**LEFT** `[concept]`

**LIATE priority** – choose $u$ as the earliest function type:

- **L**ogarithmic ($\ln x$)
- **I**nverse trig ($\arcsin x$)
- **A**lgebraic ($x^n$)
- **T**rigonometric ($\sin x$)
- **E**xponential ($e^x$)

Functions early in LIATE simplify when differentiated.

**RIGHT** `[visual_spec]`

*Visual Spec:* A 5-layer pyramid, top to bottom: L (ln x icon), I (arcsin x icon), A (x^2 icon), T (sin x icon), E (e^x icon). Each level labeled. Arrow from top to bottom: 'Differentiate u: gets simpler' and arrow from bottom to top: 'Integrate dv: stays manageable'. Colors: L red, I orange, A yellow, T green, E blue.

**Teacher Narration** `[105w]`
> LIATE is a mnemonic to choose u. Pick u as the function type that appears first in LIATE. Why? Differentiating logarithms gives algebraic functions, inverse trig gives rational functions, algebraic powers drop by one, trig cycles, and exponentials never simplify. So you want u to be a function that gets simpler when differentiated. For example, if you have ln x times x^2, choose u = ln x because L comes before A. Differentiating ln x gives 1/x, which is algebraic and simpler. The remaining dv = x^2 dx integrates to x^3/3, which is manageable. This strategy ensures the new integral is easier than the original.

---

### Slide 4 · [PRACTICE]
**Example 1: Warm-up – $\int x e^x\,dx$**  ·  `full_width`

**On-screen text** `[11w]`
∫ x e^x dx = x e^x - e^x + C

**FULL WIDTH** `[steps]`

| Step | Action | Result |
|------|--------|--------|
| 1 | Choose $u$, $dv$ | $u = x$, $dv = e^x\,dx$ |
| 2 | $du$, $v$ | $du = dx$, $v = e^x$ |
| 3 | Apply formula | $x e^x - \int e^x\,dx$ |
| 4 | Integrate | $x e^x - e^x + C$ |

**Answer:** $\boxed{x e^x - e^x + C}$

**Teacher Narration** `[86w]`
> Here we have an algebraic x and an exponential e^x. According to LIATE, algebraic comes before exponential, so u = x and dv = e^x dx. Differentiating x gives 1, which is simpler. Integrating e^x gives e^x, which is easy. The formula leaves us with a simple e^x integral. Always check your answer by differentiating. Notice how the polynomial degree dropped from 1 to 0, making the integral trivial. This is the hallmark of a good u choice: the new integral is simpler than the original.

---

### Slide 5 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Example 2: Standard – $\int \ln x\,dx$**  ·  `full_width`

**On-screen text** `[12w]`
∫ ln x dx = x ln x - x + C

**FULL WIDTH** `[steps]`

Before looking at the solution, think: Which $u$ and $dv$ would you choose?

| Step | Action | Result |
|------|--------|--------|
| 1 | Choose $u$, $dv$ | $u = \ln x$, $dv = dx$ |
| 2 | $du$, $v$ | $du = \frac{1}{x}dx$, $v = x$ |
| 3 | Apply formula | $x\ln x - \int x\cdot\frac{1}{x}\,dx$ |
| 4 | Simplify | $x\ln x - \int 1\,dx$ |
| 5 | Integrate | $x\ln x - x + C$ |

**Answer:** $\boxed{x\ln x - x + C}$

**Teacher Narration** `[94w]`
> At first glance this doesn't look like a product, but we can write it as ∫ (ln x)·1 dx. LIATE puts logarithmic first, so u = ln x and dv = dx. Differentiating ln x gives 1/x, a simple algebraic function. The new integral is ∫ x·(1/x) dx = ∫ 1 dx, which is trivial. This is a classic trick you'll see often. The key is to recognize that any function can be multiplied by 1 to create a product, allowing integration by parts to be applied even when there is no obvious product.

**Student Prompt:** Pause the video and try to choose u and dv for ∫ ln x dx using LIATE.

---

### Slide 6 · [PRACTICE] 🟡
**Example 3: Tricky – $\int x^2 e^x\,dx$**  ·  `full_width`

**On-screen text** `[12w]`
∫ x^2 e^x dx = e^x(x^2 - 2x + 2) + C

**FULL WIDTH** `[steps]`

**First application:** $u=x^2$, $dv=e^x dx$ → $du=2x dx$, $v=e^x$ → $x^2 e^x - \int 2x e^x dx$

**Second application:** $\int x e^x dx = x e^x - e^x + C_1$

**Combine:** $x^2 e^x - 2(x e^x - e^x + C_1) = e^x(x^2 - 2x + 2) + C$

**Answer:** $\boxed{e^x (x^2 - 2x + 2) + C}$

**Teacher Narration** `[94w]`
> Every time we apply integration by parts to a polynomial times exponential, the polynomial's degree drops by one. We can repeat until it becomes a constant. Here, x^2 becomes 2x after one application, then x becomes 1 after the second. The final answer is e^x times a quadratic. Be careful to multiply the second result by the factor of 2 from the first step. This iterative process is systematic: keep applying integration by parts until the polynomial term vanishes, then combine all the terms. The tabular method, which we'll see later, streamlines this process.

---

### Slide 7 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Example 4: Edge Case – Circular Integration**  ·  `full_width`

**On-screen text** `[15w]`
∫ e^x sin x dx = ½ e^x (sin x - cos x) + C

**FULL WIDTH** `[steps]`

**Evaluate:** $\int e^x \sin x\,dx$

1. $u=e^x$, $dv=\sin x dx$ → $du=e^x dx$, $v=-\cos x$ → $-e^x\cos x + \int e^x\cos x dx$
2. Again $u=e^x$, $dv=\cos x dx$ → $du=e^x dx$, $v=\sin x$ → $e^x\sin x - \int e^x\sin x dx$
3. Let $I = \int e^x\sin x dx$. Then $I = -e^x\cos x + e^x\sin x - I + C_1$
4. Solve: $2I = e^x(\sin x - \cos x) + C_1$ → $I = \frac{1}{2}e^x(\sin x - \cos x) + C$

**Answer:** $\boxed{\frac{1}{2}e^x(\sin x - \cos x) + C}$

**Teacher Narration** `[97w]`
> After two applications, the original integral reappears. Don't panic. Treat it like an algebraic equation: set I = integral, combine like terms, and solve for I. This works whenever you have a product of an exponential and a sine or cosine. The key is to always pick u = e^x in both steps, so the pattern repeats exactly. This technique is called circular integration because the integral cycles back to itself. It's a powerful method for integrals that don't simplify directly but instead return to the original form, allowing you to solve for the unknown integral algebraically.

**Student Prompt:** Pause and predict what happens after two applications of integration by parts on ∫ e^x sin x dx.

---

### Slide 8 · [PRACTICE] 🟡
**Example 5: Application – Definite Integral (Tabular Method)**  ·  `full_width`

**On-screen text** `[9w]`
∫₀^{π/2} x² cos x dx = π²/4 - 2

**FULL WIDTH** `[steps]`

**Evaluate:** $\int_0^{\pi/2} x^2 \cos x\,dx$

**Tabular setup:**
| Sign | Differentiate $u$ | Integrate $dv$ |
|------|-------------------|----------------|
| $+$ | $x^2$ | $\cos x$ |
| $-$ | $2x$ | $\sin x$ |
| $+$ | $2$ | $-\cos x$ |
| $-$ | $0$ | $-\sin x$ |

**Antiderivative:** $x^2\sin x + 2x\cos x - 2\sin x$

**Evaluate:** $\left[x^2\sin x + 2x\cos x - 2\sin x\right]_0^{\pi/2} = \left(\frac{\pi^2}{4} - 2\right) - 0 = \boxed{\frac{\pi^2}{4} - 2}$

**Teacher Narration** `[82w]`
> The tabular method is a fast way to handle multiple applications. You systematically differentiate the polynomial until it reaches zero, integrate the other function, and alternate signs. Then multiply diagonally and sum. For definite integrals, evaluate the antiderivative at the limits. This is much cleaner than repeated integration by parts. The tabular method works best when one function is a polynomial that eventually becomes zero after repeated differentiation. It organizes the steps neatly, reducing the chance of sign errors or missed terms.

---

### Slide 9 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive Visual: $\int_0^b x e^x\,dx$**  ·  `split_left_right`

**On-screen text** `[10w]`
Drag the slider to see how uv and -∫vdu combine.

**LEFT** `[text]`

Explore how integration by parts splits the area into $uv$ (blue) and $-\int v\,du$ (red).

- Use the slider to change $b$.
- Observe the components.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot of f(x)=x e^x from 0 to b. Shaded area under curve in light grey. Overlay: blue rectangle from 0 to b in height u(b)=b? Actually represent uv term: u=x, dv=e^x dx, so uv = x*e^x evaluated at b? Simpler: show the two components: area under curve ∫ x e^x dx = (b e^b - e^b + 1). The uv term at upper limit is b e^b, at lower limit 0. The -∫v du term is -∫₀^b e^x dx = -(e^b-1). So total = b e^b - e^b +1. Visual: bar chart of uv (blue) and -∫v du (red) stacking to total. Slider for b from 0.5 to 5. Show numerical values.

*Interactive Controls:*
  - 🎛 Slider for b from 0.5 to 5
  - 🎛 Button: reset to b=2

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(8,6))
plt.subplots_adjust(bottom=0.25)

b_init = 2
x = np.linspace(0, 6, 400)
y = x * np.exp(x)

ax.plot(x, y, 'k-', label='f(x)=x e^x')

# Initial shading for b_init
b = b_init
x_shade = x[x <= b]
y_shade = y[x <= b]
ax.fill_between(x_shade, 0, y_shade, alpha=0.3, color='gray', label='area under curve')

# uv term: rectangle from 0 to b with height b? Actually uv evaluated at b is b*e^b, at 0 is 0.
# We'll show a rectangle of width b and height b*e^b? Not intuitive. Better: show bars.
# We'll plot two vertical bars components.

uv_val = b * np.exp(b)
minus_int_vdu = -(np.exp(b) - 1)
components = [uv_val, minus_int_vdu]
labels = ['uv term', '-∫ v du']
colors = ['blue', 'red']

bar_ax = ax.inset_axes([0.02, 0.02, 0.3, 0.3])  # smaller bar chart
bar_ax.bar(labels, components, color=colors, alpha=0.7)
bar_ax.set_ylabel('Value')
bar_ax.set_title('Components')

ax.set_xlim(0, 6)
ax.set_ylim(0, 300)
ax.set_xlabel('x')
ax.set_ylabel('f(x)')
ax.legend()

# Slider
ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 'b', 0.5, 5.0, valinit=b_init)

def update(val):
    b = slider.val
    # update shaded area
    ax.collections.clear()
    x_shade = x[x <= b]
    y_shade = y[x <= b]
    ax.fill_between(x_shade, 0, y_shade, alpha=0.3, color='gray')
    # update bar chart
    uv_val = b * np.exp(b)
    minus_int_vdu = -(np.exp(b) - 1)
    components = [uv_val, minus_int_vdu]
    bar_ax.clear()
    bar_ax.bar(labels, components, color=colors, alpha=0.7)
    bar_ax.set_ylabel('Value')
    bar_ax.set_title('Components')
    fig.canvas.draw_idle()

slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[96w]`
> This interactive graph shows how integration by parts breaks the area under x e^x into two pieces: the blue uv term and the red negative integral of v du. As you increase b, notice how both components grow, but their sum always equals the area. This visual helps you understand why the formula works. The uv term represents the product of the functions at the upper limit, while the -∫v du term accounts for the accumulation of the integral of v du. Together, they reconstruct the original integral, demonstrating the geometric intuition behind the algebraic formula.

**Student Prompt:** Experiment with the slider. At which b does the uv term equal the -∫v du term?

---

### Slide 10 · [MISCONCEPTION] ⏸️ *[YouTube Pause]*
**Common Mistake: Wrong $u$ Choice**  ·  `split_left_right`

**On-screen text** `[15w]`
Wrong: u = e^x leads to higher degree polynomial. Correct: u = x^2 lowers degree.

**LEFT** `[steps]`

**Wrong approach for $\int x^2 e^x\,dx$:**

- Choose $u = e^x$, $dv = x^2 dx$
- $du = e^x dx$, $v = \frac{x^3}{3}$
- Result: $\frac{x^3}{3}e^x - \int \frac{x^3}{3} e^x dx$

Now the polynomial degree increased! This makes the integral harder.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two flowcharts: left flowchart shows wrong choice leading to x^3/3 e^x - ∫ (x^3/3) e^x dx, with increasing degree; right flowchart shows correct choice leading to x^2 e^x - ∫ 2x e^x dx, with decreasing degree. Highlight the polynomial degree changes: wrong: degree 2 → 3; correct: degree 2 → 1. Red X on wrong, green check on correct.

**Teacher Narration** `[100w]`
> Students often pick the exponential as u because they think it's 'harder'. But exponentials never simplify when differentiated. According to LIATE, algebraic comes before exponential, so u should be the polynomial. If you choose incorrectly, the polynomial degree goes up, making the integral worse. Always check that your new integral is simpler, not harder. The wrong choice leads to a cubic term, which is more complicated than the original quadratic. The correct choice reduces the degree, making the integral progressively easier. This is a common pitfall, so always verify your u choice by checking whether the new integral is simpler.

**Student Prompt:** Pause and decide: which u choice makes ∫ x^2 e^x dx easier?

---

### Slide 11 · [PRACTICE] 🎛 *[4 controls]*
**Practice Problem Ladder**  ·  `full_width`

**On-screen text** `[12w]`
Practice: Easy → Medium → Hard → Challenge. Click to reveal answers.

**FULL WIDTH** `[text]`

**Easy:** $\int x \cos x\,dx$

**Medium:** $\int t^2 \ln t\,dt$

**Hard:** $\int e^{2x} \sin(3x)\,dx$

**Challenge:** $\int_0^1 x^3 e^x\,dx$

Try each before clicking reveal.

**Teacher Narration** `[98w]`
> Now you try some on your own. Start with the easy one: ∫ x cos x dx. Use LIATE to choose u and dv. Then move to the medium, which involves a logarithm. The hard one uses circular integration. The challenge applies tabular method. Click the buttons to check your answers after you attempt each. These problems are designed to build your skills progressively. The easy problem reinforces basic LIATE application, the medium introduces a logarithmic u, the hard tests circular integration, and the challenge combines tabular method with definite integrals. Work through each at your own pace.

**Student Prompt:** Work through each problem at your own pace, then reveal the answer.

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof of the Formula**  ·  `full_width`

**On-screen text** `[7w]`
Proof: Product rule → integrate → rearrange.

**FULL WIDTH** `[steps]`

**Proof:**

1. Let $u$ and $v$ be differentiable functions.
2. Product rule: $\frac{d}{dx}(uv) = u\frac{dv}{dx} + v\frac{du}{dx}$
3. Multiply by $dx$: $d(uv) = u\,dv + v\,du$
4. Integrate both sides: $\int d(uv) = \int u\,dv + \int v\,du$
5. By FTC: $uv = \int u\,dv + \int v\,du$
6. Rearranged: $\int u\,dv = uv - \int v\,du$

**Teacher Narration** `[99w]`
> For those curious, here is the formal derivation. Start with the product rule, treat the derivative as a differential, integrate both sides, and rearrange. The integral of a total differential gives back the function by the Fundamental Theorem of Calculus. This proof is short, but it shows why the formula always holds. The key step is recognizing that the differential d(uv) integrates to uv, which is a direct consequence of the FTC. This derivation also highlights that integration by parts is not a new rule but a rearrangement of the product rule, making it a natural extension of differentiation.

---

### Slide 13 · [SUMMARY]
**Summary: Integration by Parts**  ·  `full_width`

**On-screen text** `[16w]`
Formula: ∫ u dv = uv - ∫ v du. LIATE. Check new integral is simpler.

**FULL WIDTH** `[concept]`

**Formula:** $\int u\,dv = uv - \int v\,du$

**Choosing $u$:** LIATE (Log, InvTrig, Alg, Trig, Exp)

**Key strategies:**
- Iterative for $\int x^n e^{ax} dx$
- Circular for $\int e^{ax}\sin(bx) dx$
- Tabular method for efficient multiple applications

**Always check:** New integral should be simpler.

**Teacher Narration** `[91w]`
> Today we learned integration by parts, the reverse of the product rule. The key is picking u and dv wisely using LIATE. You saw four example types: direct application, iterative, circular, and tabular for definite integrals. Remember, if your new integral looks worse, try swapping u and dv. Keep practicing, and this technique will become second nature. The summary mind map on the right organizes these strategies visually, helping you recall which approach to use for different integral forms. With practice, you'll quickly identify the best method for any product integral.

---
