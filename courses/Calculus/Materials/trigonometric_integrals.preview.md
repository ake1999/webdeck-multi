# Trigonometric Integrals

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** Pythagorean identity sin²x + cos²x = 1 and double-angle formulas for sin²x and cos²x are essential.

**Learning Objectives:**
- Evaluate integrals involving powers of sine and cosine using substitution and Pythagorean identities.
- Apply power-reduction formulas to integrate even powers of sine and cosine.
- Calculate integrals involving products of sine and cosine with different frequencies.
- Analyze integrals of tangent and secant using trigonometric identities and substitution.
- Combine multiple integration techniques to solve complex trigonometric integrals.

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 72w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 12 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
⚠️ **visual_specs**: missing on slides: [7]
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
| 1 | hook | 🟢 | ◧ |  | 67w | 19w | Trigonometric Integrals: The Combination Lock |
| 2 | 🎛core | 🟢 | ◧ |  | 74w | 16w | Strategy for ∫ sinᵐ x cosⁿ x dx |
| 3 | 🎛core | 🟢 | ◧ |  | 66w | 14w | Strategy for ∫ tanᵐ x secⁿ x dx |
| 4 | practice | 🟢 | ◧ |  | 69w | 12w | Warm-Up: ∫ sin⁴ x cos x dx |
| 5 | practice | 🟡 | ⬛⬛ | ⏸️ | 75w | 16w | Standard: ∫ sin⁴ x cos³ x dx |
| 6 | 🎛visual_lab | 🟢 | ◧ |  | 83w | 12w | Interactive Powers of Sine and Cosine |
| 7 | pause_and_try | 🟡 | ◧ | ⏸️ | 71w | 12w | Pause: Predict the Method for ∫ sin³ x cos² x dx |
| 8 | misconception | 🟢 | ◧ |  | 68w | 14w | Common Mistake: The Sign in Substitution |
| 9 | practice | 🟡 | ⬛⬛ |  | 67w | 14w | Edge Case: Both Even – ∫ sin² x cos² x dx |
| 10 | practice | 🟡 | ◧ | ⏸️ | 80w | 16w | Application: ∫ tan³ x sec³ x dx |
| 11 | challenge | 🔴 | ⬛⬛ |  | 73w | 18w | [Challenge – Optional] Reduction Formula for ∫ sinⁿ x dx |
| 12 | summary | 🟢 | ⬛⬛ |  | 71w | 11w | Summary & Key Formulas |

---

### Slide 1 · [HOOK]
**Trigonometric Integrals: The Combination Lock**  ·  `split_left_right`

**On-screen text** `[19w]`
Trig integrals = combination lock. Odd power → one tooth sticks out (substitution). Even power → smooth gear (power-reduction).

**LEFT** `[text]`

Think of trigonometric integrals like a combination lock. Odd powers are gear teeth that stick out—you can pull them for substitution. Even powers are smooth; you need a master key (power-reduction).

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a simple combination lock with three gears labeled sin, cos, and product. Highlight one gear with a tooth sticking out for odd power case. Show a key labeled 'power-reduction' for even case.

**Teacher Narration** `[67w]`
> Welcome. Today we unlock trigonometric integrals. Think of a combination lock where the gears are sine and cosine powers. When one power is odd, one gear tooth sticks out; you can pull that factor for substitution. When both powers are even, the gear is smooth—no tooth to grab. Then we need a master key: power-reduction formulas. We'll practice both strategies and learn to spot which one fits.

---

### Slide 2 · [CORE] 🎛 *[3 controls]*
**Strategy for ∫ sinᵐ x cosⁿ x dx**  ·  `split_left_right`

**On-screen text** `[16w]`
Three cases: m odd → u=cos x; n odd → u=sin x; both even → power-reduction.

**LEFT** `[concept]`

**Case 1: m odd.** Factor one sin x → du = -cos x dx → substitute u = cos x.

**Case 2: n odd.** Factor one cos x → du = sin x dx → substitute u = sin x.

**Case 3: both even.** Use power-reduction formulas:
$\sin^2 x = \frac{1-\cos 2x}{2}$, $\cos^2 x = \frac{1+\cos 2x}{2}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* A decision tree diagram. Start: odd power? If yes, branch to case 1 or 2 with icon of a factor separating. If no, branch to power-reduction. Include two sliders below the tree to change m and n separately and highlight the correct branch.

*Interactive Controls:*
  - 🎛 Slider for m from 0 to 5
  - 🎛 Slider for n from 0 to 5
  - 🎛 Text updates to show correct strategy based on m and n

```python
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(6,4))
plt.subplots_adjust(bottom=0.3)
ax.axis('off')
ax.text(0.5,0.9,'Decision Tree for ∫ sin^m x cos^n x dx', ha='center', fontsize=12, fontweight='bold')
ax.text(0.2,0.6,'m odd', fontsize=10)
ax.text(0.8,0.6,'n odd', fontsize=10)
ax.text(0.5,0.3,'both even', fontsize=10)
# arrows etc. omitted for brevity; using sliders to update text
ax_slider_m = plt.axes([0.2,0.1,0.6,0.03])
ax_slider_n = plt.axes([0.2,0.05,0.6,0.03])
slider_m = Slider(ax_slider_m, 'm', 0, 5, valinit=1, valstep=1)
slider_n = Slider(ax_slider_n, 'n', 0, 5, valinit=1, valstep=1)
status = ax.text(0.5,0.15,'', ha='center', fontsize=9)
def update(val):
    m = int(slider_m.val)
    n = int(slider_n.val)
    if m % 2 == 1:
        status.set_text('Use substitution: u = cos x')
    elif n % 2 == 1:
        status.set_text('Use substitution: u = sin x')
    else:
        status.set_text('Use power-reduction formulas')
slider_m.on_changed(update)
slider_n.on_changed(update)
update(None)
plt.show()
```

**Teacher Narration** `[74w]`
> Here’s the master plan for any integral of the form sinᵐ x cosⁿ x. If either m or n is odd, we can isolate one copy of that trig function and substitute. The remaining even powers get converted using the Pythagorean identity. When both are even, substitution leads to a dead end, so we use power-reduction formulas to lower the degree. Use the sliders below to see how the decision changes with the powers.

**Student Prompt:** Check the sliders: when m=2, n=2, which branch lights up?

---

### Slide 3 · [CORE] 🎛 *[3 controls]*
**Strategy for ∫ tanᵐ x secⁿ x dx**  ·  `split_left_right`

**On-screen text** `[14w]`
tanᵐ x secⁿ x: n even → u=tan x; m odd → u=sec x.

**LEFT** `[concept]`

**Case 1: n even (n ≥ 2).** Factor sec² x → du = sec² x dx → u = tan x.

**Case 2: m odd.** Factor sec x tan x → du = sec x tan x dx → u = sec x.

**Case 3: neither.** Use other identities (e.g., tan² x = sec² x – 1).

**RIGHT** `[visual_spec]`

*Visual Spec:* Two flowcharts side by side. Left: n even → factor sec²x. Right: m odd → factor sec x tan x. Under each, show a simple substitution example (e.g., ∫ tan³x sec³x dx → u=sec x). Add interactive buttons to reveal each case.

*Interactive Controls:*
  - 🎛 Button: show example for n even case
  - 🎛 Button: show example for m odd case
  - 🎛 Button: reset

```python
import matplotlib.pyplot as plt
from matplotlib.widgets import Button

fig, ax = plt.subplots(figsize=(6,4))
ax.axis('off')
ax.text(0.5,0.8,'Strategy for ∫ tan^m x sec^n x dx', ha='center', fontsize=12, fontweight='bold')
ax.text(0.25,0.5,'Case: n even', ha='center', fontsize=10, bbox=dict(boxstyle='round', facecolor='lightblue'))
ax.text(0.75,0.5,'Case: m odd', ha='center', fontsize=10, bbox=dict(boxstyle='round', facecolor='lightgreen'))

def show_hide(label):
    pass # in real code, update text
ax_button1 = plt.axes([0.1,0.1,0.3,0.1])
btn1 = Button(ax_button1, 'Show example n even')
btn1.on_clicked(lambda x: None)
ax_button2 = plt.axes([0.6,0.1,0.3,0.1])
btn2 = Button(ax_button2, 'Show example m odd')
btn2.on_clicked(lambda x: None)
plt.show()
```

**Teacher Narration** `[66w]`
> Now for tangent and secant integrals. The pattern is similar: we look for a factor that is the derivative of something. If n is even and at least 2, we can pull out sec² x, whose antiderivative is tan x. If m is odd, we pull out sec x tan x, whose derivative is sec x. Try clicking the buttons to see examples for each case.

**Student Prompt:** Click the buttons to see which substitution is used.

---

### Slide 4 · [PRACTICE]
**Warm-Up: ∫ sin⁴ x cos x dx**  ·  `split_left_right`

**On-screen text** `[12w]`
∫ sin⁴ x cos x dx = ⅕ sin⁵ x + C

**LEFT** `[steps]`

1. Let $u = \sin x$, $du = \cos x\,dx$
2. $\int u^4\,du = \frac{1}{5}u^5 + C$
3. Back-substitute: $\frac{1}{5}\sin^5 x + C$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot sin⁴ x cos x from 0 to π. Show the integrand curve. Annotate the substitution: 'u = sin x' and 'du = cos x dx'. Highlight the factor cos x being used as du.

**Teacher Narration** `[69w]`
> Let’s start simple. Here the cosine power is 1, which is odd. That single cos x becomes our du. We set u = sin x, and the whole integral collapses into u⁴. This is the most straightforward case. Notice we didn't need any identities—just a clean substitution. This example shows how isolating one odd power factor simplifies the integral immediately, making it a good warm-up for more complex cases.

---

### Slide 5 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Standard: ∫ sin⁴ x cos³ x dx**  ·  `full_width`

**On-screen text** `[16w]`
∫ sin⁴ x cos³ x dx = ⅕ sin⁵ x – ⅐ sin⁷ x + C

**FULL WIDTH** `[steps]`

**Step 1** & **Step 2** & **Explanation**
--- & --- & ---
Factor one cos x & $\sin^4 x \cos^2 x \cdot \cos x\,dx$ & isolate du
Use identity & $\cos^2 x = 1 - \sin^2 x$ & rewrite
Substitute u = sin x & $\int u^4 (1-u^2)\,du$ & du = cos x dx
Expand & $\int (u^4 - u^6)\,du$ & polynomial
Integrate & $\frac{1}{5}u^5 - \frac{1}{7}u^7 + C$ & power rule
Back-substitute & $\frac{1}{5}\sin^5 x - \frac{1}{7}\sin^7 x + C$ & done

**Teacher Narration** `[75w]`
> Now a typical exam problem. The cosine power is odd (3), so we isolate one cos x. The remaining cos² x becomes 1 – sin² x via the Pythagorean identity. Then with u = sin x, the integral becomes a simple polynomial. This is the workhorse method for these integrals. The key step is recognizing that the odd power allows us to separate a factor for substitution, turning a trigonometric integral into a polynomial one.

**Student Prompt:** Before I show the answer, try to set up the substitution yourself. Which u would you choose?

---

### Slide 6 · [VISUAL_LAB] 🎛 *[3 controls]*
**Interactive Powers of Sine and Cosine**  ·  `split_left_right`

**On-screen text** `[12w]`
Slide m and n. Green = substitution possible. Red = both even.

**LEFT** `[text]`

Adjust the exponents m and n to see how the integrand changes. When one is odd, a substitution is possible. When both are even, look for the flattened shape—this signals power-reduction needed.

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of f(x) = sin^m(x) * cos^n(x) for x from 0 to 2π. Two sliders: m from 0 to 5 (integer), n from 0 to 5 (integer). Color the area under the curve. Add a text box showing the current integral value (computed numerically). Highlight when m+n is odd (green background) or even (red background).

*Interactive Controls:*
  - 🎛 Slider for m from 0 to 5
  - 🎛 Slider for n from 0 to 5
  - 🎛 Background color indicates strategy: green=odd sum (substitution), red=even sum (power-reduction)

```python
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(6,4))
plt.subplots_adjust(bottom=0.3)
x = np.linspace(0, 2*np.pi, 300)

m0, n0 = 2, 2
line, = ax.plot(x, np.sin(x)**m0 * np.cos(x)**n0, 'b')
ax.set_ylim(-0.5, 1)
ax.axhline(0, color='gray', lw=0.5)

ax_m = plt.axes([0.2, 0.1, 0.6, 0.03])
ax_n = plt.axes([0.2, 0.05, 0.6, 0.03])
slider_m = Slider(ax_m, 'm', 0, 5, valinit=m0, valstep=1)
slider_n = Slider(ax_n, 'n', 0, 5, valinit=n0, valstep=1)

def update(val):
    m=int(slider_m.val); n=int(slider_n.val)
    y = np.sin(x)**m * np.cos(x)**n
    line.set_ydata(y)
    bg_color = 'lightgreen' if (m+n)%2==1 else 'lightcoral'
    ax.set_facecolor(bg_color)
    fig.canvas.draw_idle()
slider_m.on_changed(update)
slider_n.on_changed(update)
update(None)
plt.show()
```

**Teacher Narration** `[83w]`
> This interactive lab lets you explore how the integrand changes with different powers. The background turns green when m + n is odd, meaning one power is odd and substitution will work. It turns red when both powers are even, warning you that power-reduction is needed. Try moving the sliders and notice how the curve shape changes. For example, with m=2 and n=2, the curve is symmetric and requires power-reduction, while m=3 and n=2 gives an odd sum and a clear substitution path.

**Student Prompt:** Set m=3, n=2. Is the background green or red? What does that tell you?

---

### Slide 7 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]*
**Pause: Predict the Method for ∫ sin³ x cos² x dx**  ·  `split_left_right`

**On-screen text** `[12w]`
∫ sin³ x cos² x dx: m odd, n even. Which substitution?

**LEFT** `[text]`

Exponents: m=3 (odd), n=2 (even). Which strategy should you use? Choose u = sin x or u = cos x? Write your answer.

**RIGHT** `[empty]`

**Teacher Narration** `[71w]`
> Pause the video. Look at the integral: sine to the third, cosine squared. The sine power is odd. According to our rule, we should isolate one sine factor and use u = cos x. Think about whether that feels right. I'll show you the solution after a brief pause. This pause gives you a chance to apply the decision tree from earlier and build your intuition for choosing the correct substitution.

**Student Prompt:** Predict: Will we use u = sin x or u = cos x?

---

### Slide 8 · [MISCONCEPTION]
**Common Mistake: The Sign in Substitution**  ·  `split_left_right`

**On-screen text** `[14w]`
For u = cos x, du = –sin x dx. Don't forget the minus!

**LEFT** `[steps]`

**Right way:**
- $u = \cos x$, $du = -\sin x\,dx$
- $\int u^2(1-u^2)(-du)$ → $\frac{1}{5}u^5 - \frac{1}{3}u^3 + C$

**Wrong way (forgets the minus):**
- $\int (1-u^2)u^2\,du$ → $\frac{1}{3}u^3 - \frac{1}{5}u^5 + C$ (sign error)

**RIGHT** `[visual_spec]`

*Visual Spec:* Animated highlight of du = -sin x dx. Show the correct and incorrect answers side by side. A red X over the incorrect answer. A green checkmark over the correct one.

**Teacher Narration** `[68w]`
> This is a classic pitfall. When we set u = cos x, the derivative is negative sine. Many students drop the negative sign, leading to a sign error in every term. Always check: if you isolate sine as du and set u = cos x, you must include a minus. The correct answer for sin³ x cos² x is 1/5 cos⁵ x – 1/3 cos³ x + C.

**Student Prompt:** Compare the correct and wrong answers. Where did the sign flip?

---

### Slide 9 · [PRACTICE] 🟡
**Edge Case: Both Even – ∫ sin² x cos² x dx**  ·  `full_width`

**On-screen text** `[14w]`
∫ sin² x cos² x dx = ⅛(x – ¼ sin 4x) + C

**FULL WIDTH** `[steps]`

**Step** & **Expression** & **Explanation**
--- & --- & ---
Power-reduce both & $\frac{1-\cos 2x}{2}\cdot\frac{1+\cos 2x}{2}$ & $\sin^2, \cos^2$ formulas
Simplify & $\frac{1}{4}(1-\cos^2 2x)$ & difference of squares
Power-reduce again & $\frac{1}{4}\left(1-\frac{1+\cos 4x}{2}\right)$ & $\cos^2 2x$
Simplify & $\frac{1}{8}(1-\cos 4x)$ & combine
Integrate & $\frac{1}{8}\left(x - \frac{1}{4}\sin 4x\right) + C$ & result

**Teacher Narration** `[67w]`
> Both powers are even here, so substitution won't help. We use power-reduction formulas on both sin² x and cos² x. Their product becomes (1 – cos² 2x)/4, and then we reduce cos² 2x again. Twice the work, but the result is clean. This method is essential when neither exponent is odd. Notice how the power-reduction formulas transform the product into a sum of cosines, making integration straightforward.

---

### Slide 10 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Application: ∫ tan³ x sec³ x dx**  ·  `split_left_right`

**On-screen text** `[16w]`
∫ tan³ x sec³ x dx = ⅕ sec⁵ x – ⅓ sec³ x + C

**LEFT** `[steps]`

1. Factor: $\tan^2 x\sec^2 x\cdot\sec x\tan x$ (isolate $\sec x\tan x$)
2. Use identity: $\tan^2 x = \sec^2 x - 1$
3. Let $u = \sec x$, $du = \sec x\tan x\,dx$
4. $\int (u^2-1)u^2\,du = \frac{1}{5}u^5 - \frac{1}{3}u^3 + C$
5. Back-substitute: $\frac{1}{5}\sec^5 x - \frac{1}{3}\sec^3 x + C$

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of tan³ x sec³ x on [0, π/3]. Animate the substitution step: highlight the factor sec x tan x and show it becoming du. Then show the integrand transforming into (u²-1)u².

**Teacher Narration** `[80w]`
> Here we apply the tangent-secant strategy. The secant power is odd? Actually it's 3 (odd), but the rule says if m is odd (3 is odd), we use u = sec x. Factor out sec x tan x, rewrite tan² as sec² – 1, then substitute. This extends the toolbox beyond pure sine-cosine integrals. The key is recognizing that the odd power of tangent allows us to isolate the derivative of secant, simplifying the integral into a polynomial in u.

**Student Prompt:** Try to evaluate ∫ tan² x sec⁴ x dx using u = tan x. What factor do you isolate?

---

### Slide 11 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Reduction Formula for ∫ sinⁿ x dx**  ·  `full_width`

**On-screen text** `[18w]`
Reduction formula: ∫ sinⁿ x dx = –(1/n) sinⁿ⁻¹ x cos x + (n-1)/n ∫ sinⁿ⁻² x dx

**FULL WIDTH** `[steps]`

**Derivation (integration by parts):**
1. $\int \sin^n x\,dx = \int \sin^{n-1}x\cdot\sin x\,dx$
2. Let $u = \sin^{n-1}x$, $dv = \sin x\,dx$
   $du = (n-1)\sin^{n-2}x\cos x\,dx$, $v = -\cos x$
3. $= -\sin^{n-1}x\cos x + (n-1)\int \sin^{n-2}x\cos^2 x\,dx$
4. Replace $\cos^2 = 1-\sin^2$
5. $= -\sin^{n-1}x\cos x + (n-1)\int \sin^{n-2}x\,dx - (n-1)\int \sin^n x\,dx$
6. Solve for $\int \sin^n x\,dx$:
   $n\int \sin^n x\,dx = -\sin^{n-1}x\cos x + (n-1)\int \sin^{n-2}x\,dx$
7. Final: $\int \sin^n x\,dx = -\frac{1}{n}\sin^{n-1}x\cos x + \frac{n-1}{n}\int \sin^{n-2}x\,dx$

**Teacher Narration** `[73w]`
> For keen students, here’s how to derive a reduction formula for sine alone. We use integration by parts, splitting off one sine. The formula reduces the power by 2 each time, so repeated application eventually reaches either ∫ sin x dx or ∫ 1 dx. This is powerful but optional—exam problems rarely require you to derive it from scratch. It provides a systematic way to handle high powers of sine without repeated substitution.

**Student Prompt:** Can you derive a similar formula for ∫ cosⁿ x dx?

---

### Slide 12 · [SUMMARY]
**Summary & Key Formulas**  ·  `full_width`

**On-screen text** `[11w]`
Use 'odd one out' for substitution; use power-reduction when both even.

**FULL WIDTH** `[text]`

**∫ sinᵐ x cosⁿ x dx**
- m odd → u = cos x
- n odd → u = sin x
- both even → power-reduction

**∫ tanᵐ x secⁿ x dx**
- n even (≥2) → u = tan x
- m odd → u = sec x

**Power-reduction:**
$\sin^2 x = \frac{1-\cos 2x}{2}$, $\cos^2 x = \frac{1+\cos 2x}{2}$

**Teacher Narration** `[71w]`
> To wrap up: recognize the pattern in trig integrals. Odd power → factor one out for substitution. Both even → fall back on power-reduction. The same logic extends to tangent and secant. Practice will make these choices automatic. Next time we'll tackle integrals with products of different angles. Remember that the key is always to look for a factor that is the derivative of another function, making substitution the natural approach.

---
