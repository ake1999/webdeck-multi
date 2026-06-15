# L'Hôpital's Rule

**Category:** general_mathematics  |  **Level:** First-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** Students should be comfortable with limits, derivatives, and basic limit laws.

**Learning Objectives:**
- Recognize indeterminate forms 0/0, ∞/∞, 0·∞, ∞−∞, and powers 0^0, ∞^0, 1^∞.
- Apply L'Hôpital's Rule to evaluate limits involving 0/0 and ∞/∞.
- Transform indeterminate products, differences, and powers into L'Hôpital-suitable forms.
- Apply the rule repeatedly when necessary.
- Interpret the geometric intuition behind L'Hôpital's Rule.

---

## v3.1 Production Readiness

✅ **Interactive moments:** 4 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 80w)
⚠️ **Narration too short (<60w):** [6, 14]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 4 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s6:55w', 's14:54w']
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
| 1 | hook | 🟢 | ◧ |  | 76w | 8w | When Limits Play Hide-and-Seek |
| 2 | 🎛visual_lab | 🟢 | ◧ |  | 72w | 13w | A Race Between Functions |
| 3 | core | 🟢 | ⬛⬛ |  | 73w | 11w | The Formula and Conditions |
| 4 | practice | 🟢 | ◧ | ⏸️ | 78w | 7w | Example 1: Warm-Up — Direct Application |
| 5 | 🎛practice | 🟡 | ◧ |  | 89w | 8w | Example 2: Standard — Repeated Application |
| 6 | core | 🟢 | ⬛⬛ |  | 55w⚠️ | 11w | Extending to One-Sided and Infinite Limits |
| 7 | core | 🟡 | ◧ |  | 81w | 10w | Transforming $0 \cdot \infty$ Forms |
| 8 | 🎛practice | 🟡 | ◧ | ⏸️ | 87w | 10w | Example 3: Tricky — $0 \cdot \infty$ (Common Pitfall) |
| 9 | misconception | 🟢 | ⬛⬛ |  | 83w | 13w | Common Pitfall: Applying When Not Indeterminate |
| 10 | core | 🟡 | ◧ |  | 84w | 9w | Transforming $\infty - \infty$ Forms |
| 11 | practice | 🟡 | ⬛⬛ |  | 88w | 13w | Example 4: Edge Case — $\infty - \infty$ with Trig |
| 12 | core | 🔴 | ⬛⬛ |  | 88w | 17w | [Challenge – Optional] Transforming Indeterminate Powers: $0^0$, $\infty^0$, $1^\infty$ |
| 13 | practice | 🔴 | ⬛⬛ | ⏸️ | 88w | 12w | [Challenge – Optional] Example 5: Application — $1^\infty$ Form |
| 14 | 🎛pause_and_try | 🔴 | ◧ |  | 54w⚠️ | 7w | [Challenge – Optional] Pause and Try |
| 15 | challenge | 🔴 | ⬛⬛ |  | 97w | 12w | [Challenge – Optional] Proof Sketch (Special Case) |
| 16 | summary | 🟢 | ⬛⬛ |  | 80w | 12w | Summary & Pro Tips |

---

### Slide 1 · [HOOK]
**When Limits Play Hide-and-Seek**  ·  `split_left_right`

**On-screen text** `[8w]`
$\lim_{x\to0}\frac{\sin x}{x}=?$ Both approach 0. Direct substitution fails.

**LEFT** `[concept]`

Consider $\displaystyle \lim_{x \to 0} \frac{\sin x}{x}$.

Both numerator and denominator → 0. Plugging $x=0$ gives $0/0$, meaningless. Yet we know the answer is 1. How can we resolve such limits when direct substitution fails?

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=sin x (blue solid line) and g(x)=x (red solid line) on the domain [-0.5, 0.5] with y-axis range [-0.2, 0.5]. Add a horizontal dashed line at y=1 representing the limit. Label axes: 'x' and 'y'. Title: 'Limit of sin x / x near 0'. Include an annotation at x=0 showing the ratio approaches 1. Use numpy and matplotlib.

```python
import numpy as np; import matplotlib.pyplot as plt; x = np.linspace(-0.5, 0.5, 400); y_sin = np.sin(x); y_x = x; plt.figure(); plt.plot(x, y_sin, 'b', label='sin x'); plt.plot(x, y_x, 'r', label='x'); plt.axhline(1, color='gray', linestyle='--', label='limit 1'); plt.xlim(-0.5, 0.5); plt.ylim(-0.2, 0.5); plt.xlabel('x'); plt.ylabel('y'); plt.title('Limit of sin x / x near 0'); plt.legend(); plt.grid(True); plt.show()
```

**Teacher Narration** `[76w]`
> Think about the limit of sin x over x as x approaches zero. If we try to plug in zero, we get zero divided by zero, which is undefined. Yet we know the answer is one from earlier work or from the squeeze theorem. But what happens when the functions are more complicated, like exponentials or logarithms? L'Hôpital's rule gives us a systematic way to handle such indeterminate forms by comparing their instantaneous rates of change.

---

### Slide 2 · [VISUAL_LAB] 🎛 *[2 controls]*
**A Race Between Functions**  ·  `split_left_right`

**On-screen text** `[13w]`
Compare $f$ and $g$ near $x=a$. The ratio of derivatives reveals the limit.

**LEFT** `[concept]`

When two functions both approach 0 or ∞, who wins? Their *instantaneous rates of change* — derivatives — decide. L'Hôpital's Rule says: $\displaystyle \lim_{x\to a} \frac{f(x)}{g(x)} = \lim_{x\to a} \frac{f'(x)}{g'(x)}$, provided the right limit exists and the original form is $0/0$ or $\infty/\infty$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Interactive matplotlib animation. Left panel: f(x)=sin x (blue), g(x)=x (red) on [-1, 1]. Right panel: plot f(x)/g(x) vs x (green) and f'(x)/g'(x) (orange) on same domain. A vertical line marker shows current x position. Slider: 'x' from -1 to 1, step 0.01. On slider change, update vertical lines, highlight tangent lines at f and g at that x, and update text display showing f(x), g(x), f'(x), g'(x), ratio f/g, ratio f'/g'. Use matplotlib.widgets.Slider.

*Interactive Controls:*
  - 🎛 Slider for x from -1 to 1
  - 🎛 Toggle: show/hide tangent lines

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider; fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5)); x_vals = np.linspace(-1, 1, 400); f = np.sin(x_vals); g = x_vals; ratio = f / g; ratio[np.abs(g) < 1e-10] = np.nan; f_prime = np.cos(x_vals); g_prime = np.ones_like(x_vals); ratio_deriv = f_prime / g_prime; ax1.plot(x_vals, f, 'b', label='f(x)=sin x'); ax1.plot(x_vals, g, 'r', label='g(x)=x'); line_x, = ax1.plot([0], [0], 'k|', markersize=12, label='x'); ax2.plot(x_vals, ratio, 'g', label='f/g'); ax2.plot(x_vals, ratio_deriv, 'orange', label="f'/g'"); ax2.set_xlim(-1, 1); ax2.set_ylim(-2, 2); line_x2, = ax2.plot([0], [0], 'k|', markersize=12); ax_slider = plt.axes([0.2, 0.02, 0.6, 0.03]); slider = Slider(ax_slider, 'x', -1, 1, valinit=0); def update(val): x0 = slider.val; idx = np.argmin(np.abs(x_vals - x0)); x0 = x_vals[idx]; fx, gx = f[idx], g[idx]; fpx, gpx = f_prime[idx], g_prime[idx]; line_x.set_xdata([x0]); line_x.set_ydata([fx]); line_x2.set_xdata([x0]); line_x2.set_ydata([ratio[idx] if not np.isnan(ratio[idx]) else 0]); ax1.set_title(f'x={x0:.3f}, f/g={fx/gx:.3f}'); ax2.set_title(f"f'/g'={fpx/gpx:.3f}"); fig.canvas.draw_idle(); slider.on_changed(update); plt.tight_layout(); plt.subplots_adjust(bottom=0.15); plt.show()
```

**Teacher Narration** `[72w]`
> Imagine two functions racing toward zero or infinity. The one that wins is determined by how fast each changes near the point of interest. L'Hôpital's rule captures this idea: you can replace the original functions with their derivatives and take the limit. Use the slider to move the vertical line closer to zero. Watch how the ratio of the functions changes, and how the ratio of their derivatives gives the same limit.

**Student Prompt:** Move the slider to x=0.1. What are f/g and f'/g'? Are they close?

---

### Slide 3 · [CORE]
**The Formula and Conditions**  ·  `full_width`

**On-screen text** `[11w]`
L'Hôpital's Rule: $\lim \frac{f}{g} = \lim \frac{f'}{g'}$ if $0/0$ or $\infty/\infty$.

**FULL WIDTH** `[formula_block]`

$$ \lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)} $$

**Conditions:**
1. $\displaystyle \lim_{x \to a} f(x) = 0$ **and** $\displaystyle \lim_{x \to a} g(x) = 0$ (both → 0) **OR** both → $\pm \infty$.
2. The limit on the right exists (or is $\pm \infty$).
3. $g'(x) \neq 0$ near $a$ (except possibly at $a$).

> **Differentiate numerator and denominator separately!** Do NOT use Quotient Rule.

**Teacher Narration** `[73w]`
> Here's the official statement of L'Hôpital's rule. When both functions approach zero or both blow up to infinity, you can compute the limit of their ratio by differentiating the numerator and denominator separately — not using the quotient rule — and then taking the limit of that new ratio. But you must always check that the original limit is actually an indeterminate form. If the conditions aren't satisfied, the rule does not apply.

---

### Slide 4 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Example 1: Warm-Up — Direct Application**  ·  `split_left_right`

**On-screen text** `[7w]`
$\lim_{x\to1}\frac{\ln x}{x-1}$: $0/0$, apply L'Hôpital → $\lim\frac{1/x}{1}=1$.

**LEFT** `[steps]`

**Problem:** $\displaystyle \lim_{x \to 1} \frac{\ln x}{x-1}$

| Step | Action |
|------|--------|
| 1 | Check: $x\to 1$, $\ln x \to 0$, $x-1 \to 0$ → $0/0$ ✓ |
| 2 | Differentiate: $\frac{d}{dx}\ln x = \frac{1}{x}$, $\frac{d}{dx}(x-1)=1$ |
| 3 | New limit: $\lim_{x\to 1} \frac{1/x}{1} = \lim_{x\to 1} \frac{1}{x} = 1$ |
| 4 | Therefore, $\lim_{x\to 1} \frac{\ln x}{x-1} = 1$ |

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=ln x (blue) and g(x)=x-1 (red) on [0.5,1.5]. Label axes. Add an inset showing the ratio ln x/(x-1) approaching 1. Use numpy, matplotlib.

```python
import numpy as np; import matplotlib.pyplot as plt; x = np.linspace(0.5,1.5,400); f = np.log(x); g = x-1; ratio = f/g; ratio[np.abs(g)<1e-10]=1; fig, ax = plt.subplots(); ax.plot(x, f, 'b', label='ln x'); ax.plot(x, g, 'r', label='x-1'); ax.axvline(1, color='gray', linestyle='--', alpha=0.5); ax.legend(); ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_title('Warm-up: (ln x)/(x-1) near 1'); plt.tight_layout(); plt.show()
```

**Teacher Narration** `[78w]`
> Let's start with a warm-up. The limit of ln x over x minus one as x goes to one is of type zero over zero. Differentiate ln x to get one over x, differentiate x minus one to get one. The new limit is one over x, which evaluates to one. So the original limit is one. Try this on your own: find the limit of e to the x minus one over x as x approaches zero.

**Student Prompt:** Try: $\displaystyle \lim_{x \to 0} \frac{e^x - 1}{x}$

---

### Slide 5 · [PRACTICE] 🟡 🎛 *[2 controls]*
**Example 2: Standard — Repeated Application**  ·  `split_left_right`

**On-screen text** `[8w]`
$\lim_{x\to\infty}\frac{e^x}{x^2}$. Repeated L'Hôpital shows $e^x$ dominates any polynomial.

**LEFT** `[steps]`

**Problem:** $\displaystyle \lim_{x \to \infty} \frac{e^x}{x^2}$

| Step | Action |
|------|--------|
| 1 | Check: $e^x \to \infty$, $x^2 \to \infty$ → $\infty/\infty$ ✓ |
| 2 | Apply rule: $\lim \frac{e^x}{2x}$ → still $\infty/\infty$ |
| 3 | Apply again: $\lim \frac{e^x}{2}$ → $\infty$ |
| 4 | Conclusion: $\displaystyle \lim_{x \to \infty} \frac{e^x}{x^2} = \infty$ |

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot e^x (blue) and x^2 (red) for x from 0 to 5. Show ratio e^x/x^2 in green. Add slider 'n' from 1 to 5 to change denominator to x^n, updating plot. Show limit diverges for n≥0. Use numpy, matplotlib, slider.

*Interactive Controls:*
  - 🎛 Slider 'n' for exponent from 0.5 to 5
  - 🎛 Button: reset to default n=2

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider; fig, ax = plt.subplots(); x = np.linspace(0, 5, 400); def update(n): n_val = slider.val; f = np.exp(x); g = x**n_val; ratio = f/g; ax.clear(); ax.plot(x, f, 'b', label='e^x'); ax.plot(x, g, 'r', label=f'x^{n_val}'); ax.plot(x, ratio, 'g', label='ratio'); ax.legend(); ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_title(f'n={n_val}: limit = ∞'); fig.canvas.draw_idle(); ax_slider = plt.axes([0.2, 0.02, 0.6, 0.03]); slider = Slider(ax_slider, 'n', 0.5, 5, valinit=2, valstep=0.5); slider.on_changed(update); update(2); plt.subplots_adjust(bottom=0.15); plt.show()
```

**Teacher Narration** `[89w]`
> Now a classic: the limit of e to the x over x squared as x goes to infinity. Both go to infinity, so we apply L'Hôpital. After one application we get e to the x over two x, still infinity over infinity. Apply again, e to the x over two, which goes to infinity. This illustrates a key fact: exponentials grow faster than any polynomial. Use the slider to change the exponent in the denominator, and you'll see that no matter how high the power, the exponential always wins.

**Student Prompt:** What happens if denominator is x^10? Try the slider.

---

### Slide 6 · [CORE]
**Extending to One-Sided and Infinite Limits**  ·  `full_width`

**On-screen text** `[11w]`
L'Hôpital's Rule also works for one-sided limits and limits at $\pm\infty$.

**FULL WIDTH** `[formula_block]`

$$ \lim_{x \to a^+} \frac{f(x)}{g(x)} = \lim_{x \to a^+} \frac{f'(x)}{g'(x)} $$
$$ \lim_{x \to \infty} \frac{f(x)}{g(x)} = \lim_{x \to \infty} \frac{f'(x)}{g'(x)} $$

Same conditions apply: must be $0/0$ or $\infty/\infty$.

**Teacher Narration** `[55w ⚠️ **TOO SHORT: 55w < 60w min**]`
> L'Hôpital's rule is not just for two-sided limits at a finite point. It also works for left- or right-handed limits and for limits at infinity. The same conditions apply: the original limit must be of the form zero over zero or infinity over infinity. The derivatives are taken with respect to x, just as before.

---

### Slide 7 · [CORE] 🟡
**Transforming $0 \cdot \infty$ Forms**  ·  `split_left_right`

**On-screen text** `[10w]`
$0\cdot\infty$: rewrite as quotient ($f/(1/g)$ or $g/(1/f)$) then apply L'Hôpital.

**LEFT** `[formula_block]`

**Strategy:** Rewrite the product as a quotient.
$$ \lim_{x \to a} f(x) g(x) = \lim_{x \to a} \frac{f(x)}{1/g(x)} \ \text{or} \ \lim_{x \to a} \frac{g(x)}{1/f(x)} $$

Choose the version that gives simpler derivatives. Then apply L'Hôpital if the new form is $0/0$ or $\infty/\infty$.

**RIGHT** `[visual_spec]`

*Visual Spec:* On [0.01, 0.5], plot x ln x (blue), ln x / (1/x) (green dashed), x / (1/ln x) (red dotted). All should converge to 0. Use numpy, matplotlib. Label axes.

```python
import numpy as np; import matplotlib.pyplot as plt; x = np.linspace(0.01, 0.5, 400); prod = x * np.log(x); quot1 = np.log(x) / (1/x); quot2 = x / (1/np.log(x)); plt.plot(x, prod, 'b', label='x ln x'); plt.plot(x, quot1, 'g--', label='ln x/(1/x)'); plt.plot(x, quot2, 'r:', label='x/(1/ln x)'); plt.axhline(0, color='gray', linestyle='--'); plt.xlim(0,0.5); plt.ylim(-0.3,0.1); plt.legend(); plt.xlabel('x'); plt.ylabel('y'); plt.title('Transforming 0·∞'); plt.grid(True); plt.show()
```

**Teacher Narration** `[81w]`
> What if you have a product where one factor goes to zero and the other goes to infinity? This is an indeterminate form zero times infinity. You cannot apply L'Hôpital directly to a product. Instead, rewrite it as a quotient by putting one factor in the denominator as its reciprocal. For example, x times ln x becomes ln x over one over x. Then it is infinity over infinity, and L'Hôpital can be used. Choose the rewriting that makes differentiation simpler.

---

### Slide 8 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Example 3: Tricky — $0 \cdot \infty$ (Common Pitfall)**  ·  `split_left_right`

**On-screen text** `[10w]`
$\lim_{x\to0^+} x\ln x$: rewrite $\frac{\ln x}{1/x}$, apply L'Hôpital → 0.

**LEFT** `[steps]`

**Problem:** $\displaystyle \lim_{x \to 0^+} x \ln x$

| Step | Action |
|------|--------|
| 1 | Check: $x\to 0$, $\ln x \to -\infty$ → $0\cdot\infty$ ✗ |
| 2 | Rewrite: $x \ln x = \frac{\ln x}{1/x}$ → now $\infty/\infty$ ✓ |
| 3 | Differentiate: $\frac{d}{dx}\ln x = \frac{1}{x}$, $\frac{d}{dx}(1/x) = -\frac{1}{x^2}$ |
| 4 | Apply: $\lim_{x\to 0^+} \frac{1/x}{-1/x^2} = \lim_{x\to 0^+} (-x) = 0$ |
| 5 | Therefore, $\lim_{x\to 0^+} x\ln x = 0$ |

**RIGHT** `[visual_spec]`

*Visual Spec:* Interactive plot: on [0.001, 0.5], plot x ln x (blue). Add slider for x0 from 0.001 to 0.5. At x0, display vertical line and show f(x0)-value. Also show transformation expression and derivative ratio limit. Color: blue. Use numpy, matplotlib, slider.

*Interactive Controls:*
  - 🎛 Slider for x from 0.001 to 0.5
  - 🎛 Label showing current value of x ln x

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider; fig, ax = plt.subplots(); x = np.linspace(0.001, 0.5, 400); y = x * np.log(x); line, = ax.plot(x, y, 'b'); ax.axhline(0, color='gray', linestyle='--'); ax.set_xlim(0,0.5); ax.set_ylim(-0.3,0.05); ax.set_xlabel('x'); ax.set_ylabel('x ln x'); ax.set_title('Limit = 0'); ax_slider = plt.axes([0.2, 0.02, 0.6, 0.03]); slider = Slider(ax_slider, 'x0', 0.001, 0.5, valinit=0.01); def update(val): x0 = slider.val; val = x0 * np.log(x0); ax.set_title(f'x = {x0:.4f}, f(x) = {val:.4f}'); fig.canvas.draw_idle(); slider.on_changed(update); plt.subplots_adjust(bottom=0.15); plt.show()
```

**Teacher Narration** `[87w]`
> Here's a classic trap. The limit of x times ln x as x goes to zero from the right is zero times negative infinity. Do not apply L'Hôpital directly — it's not a quotient. So we rewrite as ln x over one over x, which is infinity over infinity. Then differentiate: derivative of ln x is one over x, derivative of one over x is negative one over x squared. The complex fraction simplifies to negative x, whose limit is zero. So the product tends to zero.

**Student Prompt:** Try $\lim_{x\to\infty} x e^{-x}$ (type $0\cdot\infty$).

---

### Slide 9 · [MISCONCEPTION]
**Common Pitfall: Applying When Not Indeterminate**  ·  `full_width`

**On-screen text** `[13w]`
Never apply L'Hôpital to a non-indeterminate form. $\lim_{x\to0}\frac{x^2+1}{\cos x} = 1$, not $-2$.

**FULL WIDTH** `[text]`

**Wrong approach:**

Evaluate $\displaystyle \lim_{x\to 0} \frac{x^2 + 1}{\cos x}$.

Students mistakenly apply L'Hôpital because they see derivatives:
$\lim_{x\to 0} \frac{2x}{-\sin x}$ → still $0/0$ → apply again → $\frac{2}{-\cos x} \to -2$.

**But the original limit is** $\frac{1}{1} = 1$, not $-2$! The form was $1/0$, **not** indeterminate. L'Hôpital does not apply.

> **Always check the form before applying!**

**Teacher Narration** `[83w]`
> Here's a common mistake. A student sees a quotient and immediately differentiates — but the original limit is one divided by one, which is one. It's not zero over zero or infinity over infinity. By wrongly applying L'Hôpital, they get two x over minus sine x, which is still zero over zero, and then they apply again to get negative two, which is wrong. Always check the form first. If it's not zero over zero or infinity over infinity, L'Hôpital does not apply.

**Student Prompt:** Why is it invalid? The derivative condition is satisfied, but the form is wrong.

---

### Slide 10 · [CORE] 🟡
**Transforming $\infty - \infty$ Forms**  ·  `split_left_right`

**On-screen text** `[9w]`
$\infty - \infty$: convert to quotient then use L'Hôpital.

**LEFT** `[text]`

**Strategy:** Convert the difference into a quotient via common denominator, factoring, or rationalization. Then apply L'Hôpital if the resulting form is $0/0$ or $\infty/\infty$.

Common techniques:
- Factor out a common factor
- Combine fractional terms
- Multiply and divide by conjugate

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot sec x (blue) and tan x (red) on [0, π/2) and their difference (green). Horizontal line at 0. Animate approaching π/2. Use numpy, matplotlib.

```python
import numpy as np; import matplotlib.pyplot as plt; x = np.linspace(0, np.pi/2 - 0.01, 400); sec = 1/np.cos(x); tan = np.tan(x); diff = sec - tan; plt.plot(x, sec, 'b', label='sec x'); plt.plot(x, tan, 'r', label='tan x'); plt.plot(x, diff, 'g', label='sec x - tan x'); plt.axhline(0, color='gray', linestyle='--'); plt.legend(); plt.xlabel('x'); plt.ylabel('y'); plt.title('∞-∞ Form: sec x - tan x'); plt.xlim(0, np.pi/2); plt.ylim(-0.5, 10); plt.grid(True); plt.show()
```

**Teacher Narration** `[84w]`
> Another indeterminate form is infinity minus infinity. For example, sec x minus tan x as x approaches pi over two from the left. Both approach infinity, but their difference may have a finite limit. To handle this, rewrite the expression as a single fraction with a common denominator. For sec x minus tan x, write them as one over cos x minus sin x over cos x, giving one minus sin x over cos x. That is zero over zero, so L'Hôpital then applies.

---

### Slide 11 · [PRACTICE] 🟡
**Example 4: Edge Case — $\infty - \infty$ with Trig**  ·  `full_width`

**On-screen text** `[13w]`
$\lim_{x\to\pi/2^-} (\sec x - \tan x) = 0$ after common denominator and L'Hôpital.

**FULL WIDTH** `[steps]`

**Problem:** $\displaystyle \lim_{x \to (\pi/2)^-} (\sec x - \tan x)$

| Step | Action |
|------|--------|
| 1 | Check: $\sec x \to \infty$, $\tan x \to \infty$ → $\infty - \infty$ |
| 2 | Rewrite: $\frac{1}{\cos x} - \frac{\sin x}{\cos x} = \frac{1-\sin x}{\cos x}$ |
| 3 | New form: $\frac{0}{0}$ as $x\to (\pi/2)^-$ ✓ |
| 4 | Differentiate: $\frac{d}{dx}(1-\sin x) = -\cos x$, $\frac{d}{dx}(\cos x) = -\sin x$ |
| 5 | Apply: $\lim_{x\to (\pi/2)^-} \frac{-\cos x}{-\sin x} = \lim \frac{\cos x}{\sin x} = 0$ |

**Teacher Narration** `[88w]`
> Let's work through the edge case. Sec x minus tan x as x approaches pi over two from the left. After writing them over a common denominator, we get one minus sin x over cos x. That's zero over zero. Differentiate numerator to get negative cos x, denominator to get negative sin x. The negatives cancel, and the limit of cos x over sin x at pi over two is zero, because cos is zero and sin is one. So the original infinity minus infinity limit is zero.

**Student Prompt:** Verify the algebra: $\sec x - \tan x = \frac{1-\sin x}{\cos x}$.

---

### Slide 12 · [CORE] 🔴 *[Challenge – Optional]*
**[Challenge – Optional] Transforming Indeterminate Powers: $0^0$, $\infty^0$, $1^\infty$**  ·  `full_width`

**On-screen text** `[17w]`
Indeterminate powers: take ln, get product, then transform to quotient and use L'Hôpital. Exponentiate at the end.

**FULL WIDTH** `[formula_block]`

**Strategy:** Let $y = [f(x)]^{g(x)}$. Take natural log:
$$ \ln y = g(x) \ln f(x) $$
This transforms the power into a product $0\cdot\infty$ (or finite). Evaluate $\lim \ln y = L$, then $\lim y = e^L$.

> **Don't forget to exponentiate at the end!**

**Teacher Narration** `[88w]`
> Sometimes the limit involves a function raised to another function, like one to the power infinity, or zero to the power zero, or infinity to the power zero. These are called indeterminate powers. The trick is to set the expression equal to y, take the natural log of both sides, which brings the exponent down as a product. Now you have a product that can be transformed into a quotient and handled by L'Hôpital. Once you find the limit of ln y, exponentiate to get the original limit.

---

### Slide 13 · [PRACTICE] 🔴 *[Challenge – Optional]* ⏸️ *[YouTube Pause]*
**[Challenge – Optional] Example 5: Application — $1^\infty$ Form**  ·  `full_width`

**On-screen text** `[12w]`
$\lim_{x\to0^+}(1+\sin4x)^{\cot x} = e^4$. Take ln, convert to $0/0$, apply L'Hôpital, exponentiate.

**FULL WIDTH** `[steps]`

**Problem:** $\displaystyle \lim_{x \to 0^+} (1 + \sin 4x)^{\cot x}$

| Step | Action |
|------|--------|
| 1 | Set $y = (1+\sin 4x)^{\cot x}$, so $\ln y = \cot x \ln(1+\sin 4x)$ |
| 2 | Check: $\cot x \to \infty$, $\ln(1+\sin 4x) \to 0$ → $0\cdot\infty$ |
| 3 | Rewrite: $\ln y = \frac{\ln(1+\sin 4x)}{\tan x}$ → $0/0$ ✓ |
| 4 | Differentiate: num: $\frac{4\cos 4x}{1+\sin 4x}$, den: $\sec^2 x$ |
| 5 | Apply: $\lim_{x\to0^+} \frac{4\cos 4x/(1+\sin 4x)}{\sec^2 x} = \frac{4\cdot1/1}{1} = 4$ |
| 6 | Therefore $\lim \ln y = 4$, so $\lim y = e^4$ |

**Teacher Narration** `[88w]`
> Here's a rich application. We have a one-to-the-infinity form. Take y equal to the expression, then ln y equals cot x times ln of one plus sin 4x, which is zero times infinity. Rewrite as ln of one plus sin 4x over tan x. That's zero over zero. Differentiate with the chain rule. After simplifying and plugging in zero, the limit of ln y is four, so the original limit is e to the fourth power. This is a beautiful example that ties together logarithms, L'Hôpital, and exponentials.

**Student Prompt:** Try: $\lim_{x\to 0} (1+2x)^{1/x}$.

---

### Slide 14 · [PAUSE_AND_TRY] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]*
**[Challenge – Optional] Pause and Try**  ·  `split_left_right`

**On-screen text** `[7w]`
Pause and try: $\lim_{x\to0}(1+2x)^{1/x}$. Hint: take ln.

**LEFT** `[text]`

**Your turn:**

Evaluate $\displaystyle \lim_{x\to 0} (1+2x)^{1/x}$.

*Hint: This is a $1^\infty$ form. Set y = ... then take ln.*

**RIGHT** `[visual_spec]`

*Visual Spec:* Empty plot with axes from -0.5 to 0.5 on x, 0 to 10 on y. Title 'Pause and Try: (1+2x)^(1/x)'. After button press, show horizontal line at y=e^2.

*Interactive Controls:*
  - 🎛 Button: Reveal answer e^2

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Button; fig, ax = plt.subplots(); ax.set_xlim(-0.5, 0.5); ax.set_ylim(0, 10); ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_title('(1+2x)^(1/x)'); line_ans, = ax.plot([], [], 'r--', label='limit e^2'); ax.legend(); ax_reveal = plt.axes([0.8, 0.05, 0.15, 0.075]); btn = Button(ax_reveal, 'Reveal'); def reveal(event): x_vals = np.linspace(-0.5, 0.5, 400); y_vals = (1+2*x_vals)**(1/x_vals); y_vals[np.isnan(y_vals)] = np.exp(2); line_ans.set_data(x_vals, np.full_like(x_vals, np.exp(2))); fig.canvas.draw_idle(); btn.on_clicked(reveal); plt.show()
```

**Teacher Narration** `[54w ⚠️ **TOO SHORT: 54w < 60w min**]`
> Now it's your turn. Pause the video and try this problem: find the limit of one plus two x raised to the power one over x as x approaches zero. This is a one-to-the-infinity form. Use the natural log method we just learned. When you're ready, click the reveal button to see the answer.

**Student Prompt:** Evaluate $\lim_{x\to 0} (1+2x)^{1/x}$.

---

### Slide 15 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof Sketch (Special Case)**  ·  `full_width`

**On-screen text** `[12w]`
Proof: use difference quotient. Near $a$, $f(x)\approx f'(a)(x-a)$, so ratio $\approx f'(a)/g'(a)$.

**FULL WIDTH** `[text]`

**Theorem (L'Hôpital, $0/0$ case):** If $f$ and $g$ are differentiable near $a$, $f(a)=g(a)=0$, $g'(a)\neq 0$, and $f',g'$ continuous at $a$, then
$$ \lim_{x\to a} \frac{f(x)}{g(x)} = \frac{f'(a)}{g'(a)} = \lim_{x\to a} \frac{f'(x)}{g'(x)} $$

**Proof sketch:**
$\displaystyle \frac{f(x)}{g(x)} = \frac{f(x)-f(a)}{g(x)-g(a)} = \frac{\frac{f(x)-f(a)}{x-a}}{\frac{g(x)-g(a)}{x-a}} \to \frac{f'(a)}{g'(a)}$.

Geometrically: near $a$, $f(x)\approx f'(a)(x-a)$, $g(x)\approx g'(a)(x-a)$, so their ratio $\approx f'(a)/g'(a)$.

**Teacher Narration** `[97w]`
> For those interested in a proof, here is the intuition for the special case where f and g both vanish at a, and g prime of a is nonzero. Write f over g as the difference from a divided by the difference from a. Factor x minus a in numerator and denominator. The ratio of the difference quotients approaches the ratio of derivatives. Using continuity of the derivatives, the limit at a is the same as the limit of f prime over g prime. The full proof for infinity over infinity uses the Cauchy Mean Value Theorem.

---

### Slide 16 · [SUMMARY]
**Summary & Pro Tips**  ·  `full_width`

**On-screen text** `[12w]`
L'Hôpital's Rule summary: check form, differentiate separately, handle special forms via transformation.

**FULL WIDTH** `[text]`

**Key Formulas:**
- $\displaystyle \lim\frac{f}{g} = \lim\frac{f'}{g'}$ (for $0/0$ or $\infty/\infty$)
- $0\cdot\infty$ → rewrite as quotient
- $\infty-\infty$ → combine into a single quotient
- Indeterminate powers: take $\ln$, then L'Hôpital, then exponentiate

**Pro Tips:**
1. Always check the form first.
2. For $0\cdot\infty$, put $\ln$ or $\sin$ in numerator for simpler derivatives.
3. Never differentiate using Quotient Rule — differentiate numerator and denominator separately.
4. When algebra works (factoring), it's often faster than L'Hôpital.

**Teacher Narration** `[80w]`
> Let's review what we've learned. L'Hôpital's rule is a powerful tool for evaluating limits that are indeterminate. Always check that you have zero over zero or infinity over infinity. For other indeterminate forms like zero times infinity, infinity minus infinity, or powers, transform them into a suitable quotient first. Remember to differentiate numerator and denominator separately, and never use L'Hôpital on a limit that is not indeterminate. With practice, you'll develop an intuition for when and how to apply it.

---
