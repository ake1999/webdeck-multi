# Partial Fractions – Integration of Rational Functions

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You should already know standard integrals of 1/(x-a) and 1/(x^2+a^2), and polynomial long division.

**Learning Objectives:**
- Decompose proper rational functions into sums of simpler partial fractions
- Apply the Heaviside cover-up method for rapid coefficient determination
- Integrate rational functions using logarithms and arctangents
- Handle repeated factors and irreducible quadratics correctly
- Use long division when fractions are improper

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 85w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 15 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
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
| 1 | 🎛hook | 🟢 | ◧ |  | 74w | 17w | Reverse Fraction Addition |
| 2 | 🎛core | 🟢 | ◧ |  | 66w | 16w | Distinct Linear Factors |
| 3 | practice | 🟢 | ⬛⬛ | ⏸️ | 104w | 8w | Warm-Up Example: Distinct Linear |
| 4 | 🎛core | 🟢 | ◧ |  | 67w | 16w | Repeated Linear Factors |
| 5 | practice | 🟡 | ⬛⬛ |  | 115w | 10w | Standard Example: Repeated Factor |
| 6 | 🎛core | 🟢 | ◧ |  | 83w | 13w | Irreducible Quadratic Factors |
| 7 | practice | 🟡 | ⬛⬛ | ⏸️ | 102w | 8w | Edge Case: Irreducible Quadratic |
| 8 | core | 🟢 | ◧ |  | 60w | 18w | The First Step: Is It Proper? |
| 9 | practice | 🟡 | ⬛⬛ |  | 86w | 8w | Tricky Example: Improper Fraction |
| 10 | misconception | 🟢 | ◧ | ⏸️ | 90w | 19w | Common Mistake: Cover-Up on Repeated Factor |
| 11 | practice | 🔴 | ⬛⬛ |  | 100w | 16w | [Challenge – Optional] Application Example: Mixed Factors |
| 12 | 🎛visual_lab | 🟢 | ◧ |  | 74w | 19w | Visualizing the Decomposition |
| 13 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 86w | 7w | Quick Check – Choose the Correct Form |
| 14 | summary | 🟢 | ⬛⬛ |  | 100w | 14w | Summary – Partial Fractions Algorithm |
| 15 | challenge | 🔴 | ◧ |  | 71w | 12w | [Challenge – Optional] Complex Decomposition |

---

### Slide 1 · [HOOK] 🎛 *[2 controls]*
**Reverse Fraction Addition**  ·  `split_left_right`

**On-screen text** `[17w]`
Partial fractions = reverse fraction addition. Break a complex rational function into simple pieces we can integrate.

**LEFT** `[text]`

Think of partial fractions as **un-adding** fractions. Given $\frac{5}{6}$, can we recover $\frac{1}{2}+\frac{1}{3}$? For rational functions, we do the same: break a complicated fraction into simpler pieces we know how to integrate.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show two fraction bars: one whole bar labeled 5/6, then two bars below it labeled 1/2 and 1/3, with a plus sign between them. Use colors: 5/6 bar in blue, 1/2 in red, 1/3 in green. Add arrows indicating decomposition.

*Interactive Controls:*
  - 🎛 Button: reveal next step
  - 🎛 Toggle: show/hide exact value

```python
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(6,4))
ax.barh(0, 5/6, height=0.4, color='blue', edgecolor='black')
ax.text(5/12, 0, '5/6', ha='center', va='center', color='white', fontsize=14)
ax.barh(1.5, 1/2, height=0.4, color='red', edgecolor='black')
ax.text(1/4, 1.5, '1/2', ha='center', va='center', color='white', fontsize=14)
ax.barh(1.5, 1/3, left=0.5, height=0.4, color='green', edgecolor='black')
ax.text(2/3, 1.5, '1/3', ha='center', va='center', color='white', fontsize=14)
ax.set_ylim(-0.5, 2.5)
ax.set_xlim(0, 1)
ax.set_yticks([])
ax.set_xticks([])
ax.set_title('Un-Adding Fractions', fontsize=16)
plt.show()
```

**Teacher Narration** `[74w]`
> Imagine you learned to add fractions like one half plus one third equals five sixths. Partial fractions asks the reverse: given five sixths, can you find those original two fractions? For rational functions, the goal is identical. We will break a complicated rational function into a sum of simpler fractions that we already know how to integrate. Each piece will integrate to a logarithm or an arctangent, which are the building blocks of calculus.

---

### Slide 2 · [CORE] 🎛 *[2 controls]*
**Distinct Linear Factors**  ·  `split_left_right`

**On-screen text** `[16w]`
Each distinct linear factor gets one constant numerator. Use the cover-up method to find constants quickly.

**LEFT** `[formula_block]`

For $\frac{P(x)}{(x-a_1)\cdots(x-a_n)}$ with deg(P) < n:

$$\frac{P(x)}{(x-a_1)\cdots(x-a_n)} = \frac{A_1}{x-a_1} + \cdots + \frac{A_n}{x-a_n}$$

**Heaviside cover-up:**
$$A_k = \left. \frac{P(x)}{Q(x)} \cdot (x-a_k) \right|_{x=a_k}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Show the expression (3x+1)/((x+1)(x-1)) with a hand or overlay covering the (x-1) factor. Then show the evaluation at x=1 giving the coefficient. Use a cartoon hand covering the factor and a magnifying glass over the resulting value.

*Interactive Controls:*
  - 🎛 Button: reveal next step
  - 🎛 Toggle: show/hide exact value

**Teacher Narration** `[66w]`
> When the denominator factors into distinct linear factors, we assign one constant to each factor. The cover-up method is a shortcut: to find A_k, simply cover up that factor in the denominator and evaluate the remaining expression at x equals that factor's root. Let's see it in action with a warm-up example. This technique saves time and reduces algebra errors, making it a favorite for exams.

---

### Slide 3 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Warm-Up Example: Distinct Linear**  ·  `full_width`

**On-screen text** `[8w]`
$\int \frac{3x+1}{x^2-1}\,dx = \ln|x+1| + 2\ln|x-1| + C$

**FULL WIDTH** `[steps]`

**Integrate** $\int \frac{3x+1}{x^2-1}\,dx$

| Step | Action | Result |
|------|--------|--------|
| 1 | Factor denominator | $(x+1)(x-1)$ |
| 2 | Write decomposition | $\frac{A}{x+1}+\frac{B}{x-1}$ |
| 3 | Cover-up for $A$: plug $x=-1$ into $\frac{3x+1}{x-1}$ | $A=1$ |
| 4 | Cover-up for $B$: plug $x=1$ into $\frac{3x+1}{x+1}$ | $B=2$ |
| 5 | Integrate | $\ln\|x+1\|+2\ln\|x-1\|+C$ |

**Teacher Narration** `[104w]`
> Let's work through a complete example. First factor x squared minus one as x plus one times x minus one. Write the decomposition with unknowns A and B. Use the cover-up method: for A, cover up x plus one and evaluate the remaining expression at x equals negative one, giving one. For B, cover up x minus one and evaluate at x equals one, giving two. Now integrate each term: the integral of one over x plus one is natural log absolute value x plus one, and two over x minus one gives two natural log absolute value x minus one. Add the constant.

**Student Prompt:** Try decomposing $\frac{5x-2}{(x+2)(x-3)}$ using cover-up. What are A and B?

---

### Slide 4 · [CORE] 🎛 *[2 controls]*
**Repeated Linear Factors**  ·  `split_left_right`

**On-screen text** `[16w]`
Repeated factor needs ALL powers from 1 to k. Cannot use cover-up. Solve system of equations.

**LEFT** `[formula_block]`

For $(x-a)^k$:

$$\frac{P(x)}{(x-a)^k} = \frac{A_1}{x-a} + \frac{A_2}{(x-a)^2} + \cdots + \frac{A_k}{(x-a)^k}$$

**Cover-up does NOT work here.** Solve by equating coefficients after clearing denominators.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show a vertical stack of terms: (x-a)^1 denominator, (x-a)^2 denominator, up to (x-a)^k. Label each with A1, A2, ..., Ak. Use arrows to indicate that all powers from 1 to k must appear.

*Interactive Controls:*
  - 🎛 Button: reveal next step
  - 🎛 Toggle: show/hide exact value

**Teacher Narration** `[67w]`
> If a linear factor appears raised to a power k, you need k terms: one for each power from 1 to k. A common mistake is to forget the lower powers. The cover-up method does not apply here because plugging in the root would cause division by zero. Instead, clear all denominators by multiplying through by the highest power, then equate coefficients of like powers of x.

---

### Slide 5 · [PRACTICE] 🟡
**Standard Example: Repeated Factor**  ·  `full_width`

**On-screen text** `[10w]`
$\int \frac{x^2+3x+1}{(x-1)^3}\,dx = \ln|x-1| - \frac{5}{x-1} - \frac{5}{2(x-1)^2} + C$

**FULL WIDTH** `[steps]`

**Integrate** $\int \frac{x^2+3x+1}{(x-1)^3}\,dx$

| Step | Action | Result |
|------|--------|--------|
| 1 | Write decomposition | $\frac{A}{x-1}+\frac{B}{(x-1)^2}+\frac{C}{(x-1)^3}$ |
| 2 | Multiply by $(x-1)^3$ | $x^2+3x+1 = A(x-1)^2+B(x-1)+C$ |
| 3 | Expand & equate | $A=1,\;B=5,\;C=5$ |
| 4 | Integrate | $\ln|x-1| - \frac{5}{x-1} - \frac{5}{2(x-1)^2} + C$ |

**Teacher Narration** `[115w]`
> Here we have a cubic denominator with a factor to the third power. Set up three terms: A over x minus one, B over the square, C over the cube. Multiply both sides by x minus one cubed, expand, and equate coefficients. Solving gives A equals one, B equals five, C equals five. Now integrate term by term: the first gives natural log, the second gives minus five over x minus one, and the third gives minus five over two times x minus one squared. Notice the pattern: the antiderivative of one over x minus a to the n is minus one over (n minus 1) times (x minus a) to the n minus one.

---

### Slide 6 · [CORE] 🎛 *[2 controls]*
**Irreducible Quadratic Factors**  ·  `split_left_right`

**On-screen text** `[13w]`
Irreducible quadratic → linear numerator Ax+B. Complete the square to prepare for arctan.

**LEFT** `[formula_block]`

For an irreducible quadratic $x^2+px+q$ (discriminant < 0):

$$\frac{P(x)}{x^2+px+q} = \frac{Ax+B}{x^2+px+q}$$

**Numerator must be linear!**

Strategy: Complete the square, then split using $u = x+\frac{p}{2}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show graph of y = x^2+4x+5 and its completed square version (x+2)^2+1. Show how the shift u = x+2 transforms the integral into arctan form.

*Interactive Controls:*
  - 🎛 Slider: change parameter a
  - 🎛 Toggle: show/hide exact value

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(-5,1,400)
y = x**2 + 4*x + 5
plt.plot(x,y,label='$x^2+4x+5$')
plt.plot(x,(x+2)**2+1, '--', label='$(x+2)^2+1$')
plt.axvline(-2, color='gray', ls='--')
plt.legend()
plt.title('Completing the Square')
plt.show()
```

**Teacher Narration** `[83w]`
> When the denominator is an irreducible quadratic (meaning you cannot factor it over real numbers), the numerator must be a linear expression Ax plus B, not a constant. The integration will involve a natural log from the linear part and an arctangent from the constant part. First complete the square to identify the shift u equals x plus p over 2. Then rewrite the numerator to match the derivative of the denominator or to separate into a u-sub part and an arctan part.

---

### Slide 7 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Edge Case: Irreducible Quadratic**  ·  `full_width`

**On-screen text** `[8w]`
$\int \frac{2x+3}{x^2+4x+5}\,dx = \ln(x^2+4x+5) - \arctan(x+2) + C$

**FULL WIDTH** `[steps]`

**Integrate** $\int \frac{2x+3}{x^2+4x+5}\,dx$

| Step | Action | Result |
|------|--------|--------|
| 1 | Check discriminant | $16-20=-4<0$ → irreducible |
| 2 | Complete square | $(x+2)^2+1$ |
| 3 | Rewrite numerator | $2(x+2)-1$ |
| 4 | Split integral | $\int \frac{2(x+2)}{(x+2)^2+1}\,dx - \int \frac{1}{(x+2)^2+1}\,dx$ |
| 5 | Integrate | $\ln(x^2+4x+5) - \arctan(x+2)+C$ |

**Teacher Narration** `[102w]`
> Notice the discriminant is negative, so the quadratic does not factor. We complete the square to get x plus two squared plus one. Now we need to rewrite the numerator two x plus three in terms of x plus two. Two x plus three equals two times x plus two minus one. The first term two x plus two over the square plus one integrates to natural log of x squared plus four x plus five. The second term minus one over the square plus one integrates to minus arctan of x plus two. The final answer is natural log plus arctangent.

**Student Prompt:** Why did we rewrite the numerator as $2(x+2)-1$? What pattern were we trying to create?

---

### Slide 8 · [CORE]
**The First Step: Is It Proper?**  ·  `split_left_right`

**On-screen text** `[18w]`
Improper fraction (deg num ≥ deg den) → do long division first. Then apply partial fractions to remainder.

**LEFT** `[concept]`

**Always check** if degree(numerator) < degree(denominator). If not, perform **polynomial long division** first.

Example: $\frac{x^3}{x^2+1} = x - \frac{x}{x^2+1}$ after division.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show polynomial long division steps for x^3 divided by x^2+1. Use placeholders: write x^3 + 0x^2 + 0x + 0, divide leading term x^3 / x^2 = x, multiply, subtract, remainder -x.

**Teacher Narration** `[60w]`
> Before you do anything else, check the degrees. If the numerator's degree is greater than or equal to the denominator's degree, the fraction is improper. You must first perform polynomial long division to obtain a polynomial plus a proper fraction. Only the proper fraction part gets decomposed into partial fractions. Skipping this step leads to incorrect forms and wasted time.

---

### Slide 9 · [PRACTICE] 🟡
**Tricky Example: Improper Fraction**  ·  `full_width`

**On-screen text** `[8w]`
$\int \frac{x^3}{x^2+1}\,dx = \frac{x^2}{2} - \frac{1}{2}\ln(x^2+1) + C$

**FULL WIDTH** `[steps]`

**Integrate** $\int \frac{x^3}{x^2+1}\,dx$

| Step | Action | Result |
|------|--------|--------|
| 1 | Check degrees | deg(3) > deg(2) → improper |
| 2 | Long division | $\frac{x^3}{x^2+1} = x - \frac{x}{x^2+1}$ |
| 3 | Integrate | $\frac{x^2}{2} - \frac{1}{2}\ln(x^2+1) + C$ |

**Teacher Narration** `[86w]`
> Here the numerator degree is three, denominator degree is two, so it is improper. Long division: x squared plus one goes into x cubed x times, subtract, remainder minus x. So we have x minus x over x squared plus one. Now we integrate: the antiderivative of x is x squared over two, and the second piece integrates to minus one half natural log of x squared plus one. Notice we did not use any partial fractions because after division only a simple proper fraction remained.

---

### Slide 10 · [MISCONCEPTION] ⏸️ *[YouTube Pause]*
**Common Mistake: Cover-Up on Repeated Factor**  ·  `split_left_right`

**On-screen text** `[19w]`
Cover-up only works for distinct linear factors. For repeated factors, you must include all powers and solve a system.

**LEFT** `[concept]`

**Wrong approach:** Trying to use cover-up for $(x-1)^2$.

Example: $\frac{2x^3-3x+1}{(x-1)^2(x+2)}$

Correct: $\frac{A}{x-1}+\frac{B}{(x-1)^2}+\frac{C}{x+2}$

**Mistake:** Only write $\frac{A}{x-1}+\frac{C}{x+2}$ (missing $(x-1)^2$ term) or try to use cover-up on $(x-1)^2$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show two decomposition forms side by side. Left side: incomplete form with missing term, marked with red X. Right side: correct form with all three terms, marked with green check. Under each, show the resulting integration (wrong form leads to error).

**Teacher Narration** `[90w]`
> A frequent exam mistake: students try to apply the cover-up method to a repeated factor. For example, with denominator x minus one squared times x plus two, they might write only A over x minus one plus C over x plus two, missing the B over x minus one squared term. Or they might try to cover-up on the square and get an incorrect coefficient. Always remember: cover-up is only for distinct linear factors. For repeated factors, you need a full set of terms and must solve by equating coefficients.

**Student Prompt:** Why does plugging x=1 into the cover-up formula fail for the (x-1)^2 factor?

---

### Slide 11 · [PRACTICE] 🔴 *[Challenge – Optional]*
**[Challenge – Optional] Application Example: Mixed Factors**  ·  `full_width`

**On-screen text** `[16w]`
$\int \frac{2x^2 - x + 4}{x^3 + 4x}\,dx = \ln|x| + \frac{1}{2}\ln(x^2+4) - \frac{1}{2}\arctan\left(\frac{x}{2}\right) + C$

**FULL WIDTH** `[steps]`

**Integrate** $\int \frac{2x^2 - x + 4}{x^3 + 4x}\,dx$

| Step | Action | Result |
|------|--------|--------|
| 1 | Factor denominator | $x(x^2+4)$ |
| 2 | Write decomposition | $\frac{A}{x} + \frac{Bx+C}{x^2+4}$ |
| 3 | Multiply & equate | $A=1,\; B=1,\; C=-1$ |
| 4 | Integrate | $\ln|x| + \frac{1}{2}\ln(x^2+4) - \frac{1}{2}\arctan\left(\frac{x}{2}\right) + C$ |

**Teacher Narration** `[100w]`
> This example combines a linear factor x and an irreducible quadratic x squared plus four. Decompose as A over x plus Bx plus C over x squared plus four. After clearing denominators and equating coefficients, we get A equals one, B equals one, C equals negative one. Now integrate: one over x gives natural log absolute x. The term x over x squared plus four gives one half natural log of x squared plus four. The constant minus one over x squared plus four gives minus one half arctan of x over two. Each piece uses a different integration technique.

---

### Slide 12 · [VISUAL_LAB] 🎛 *[4 controls]*
**Visualizing the Decomposition**  ·  `split_left_right`

**On-screen text** `[19w]`
Adjust A, B, C with sliders. When the sum (dashed) matches the original (solid), you have the correct decomposition.

**LEFT** `[text]`

See how the original function (blue) equals the sum of its partial fractions (dotted black). Use the slider to change coefficients and observe the effect.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot f(x) = (2x^2 - x + 4)/(x^3 + 4x) and its decomposition into 1/x and (x-1)/(x^2+4). Use sliders for A, B, C to see how the sum changes. Show original function as solid blue, sum of pieces as dashed black. When coefficients match the correct values, the sum should exactly overlap the original.

*Interactive Controls:*
  - 🎛 Slider for A from 0 to 2 with initial 1
  - 🎛 Slider for B from 0 to 2 with initial 1
  - 🎛 Slider for C from -2 to 0 with initial -1
  - 🎛 Button to reset to correct values (A=1, B=1, C=-1)

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

x = np.linspace(-5,5,400)
# Avoid singularity at 0 and large negative values near 0
x = x[(np.abs(x) > 0.1)]

def original(x):
    return (2*x**2 - x + 4) / (x**3 + 4*x)

def decomposition(x, A, B, C):
    return A/x + (B*x + C)/(x**2+4)

fig, ax = plt.subplots(figsize=(8,5))
plt.subplots_adjust(bottom=0.25)

orig_line, = ax.plot(x, original(x), 'b-', label='Original', lw=2)
decomp_line, = ax.plot(x, decomposition(x,1,1,-1), 'k--', label='Sum (A=1,B=1,C=-1)', lw=2)
ax.set_ylim(-5,5)
ax.axhline(0, color='gray', lw=0.5)
ax.axvline(0, color='gray', lw=0.5)
ax.legend()
ax.set_xlabel('x')
ax.set_ylabel('f(x)')
ax.set_title('Partial Fractions Decomposition')

# Sliders
ax_sliderA = plt.axes([0.25, 0.1, 0.5, 0.03])
ax_sliderB = plt.axes([0.25, 0.06, 0.5, 0.03])
ax_sliderC = plt.axes([0.25, 0.02, 0.5, 0.03])
sliderA = Slider(ax=ax_sliderA, label='A', valmin=0, valmax=2, valinit=1)
sliderB = Slider(ax=ax_sliderB, label='B', valmin=0, valmax=2, valinit=1)
sliderC = Slider(ax=ax_sliderC, label='C', valmin=-2, valmax=0, valinit=-1)

def update(val):
    A = sliderA.val
    B = sliderB.val
    C = sliderC.val
    decomp_line.set_ydata(decomposition(x, A, B, C))
    fig.canvas.draw_idle()

sliderA.on_changed(update)
sliderB.on_changed(update)
sliderC.on_changed(update)

plt.show()
```

**Teacher Narration** `[74w]`
> Let's see partial fractions visually. The blue curve is the original rational function. The black dashed curve is the sum of the three pieces. Use the sliders to change the coefficients A, B, and C. Notice how the sum changes. Only when A equals one, B equals one, and C equals negative one does the dashed line perfectly overlay the blue curve. This visual confirmation reinforces why we need to find the correct coefficients.

**Student Prompt:** Set the sliders to A=0.5, B=1.5, C=0. What do you observe? Why can't these coefficients produce the original function?

---

### Slide 13 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Quick Check – Choose the Correct Form**  ·  `split_left_right`

**On-screen text** `[7w]`
Pause: Choose the correct form for $\frac{5x+3}{(x-2)^2(x+1)}$

**LEFT** `[text]`

**Q:** Which decomposition is correct for $\frac{5x+3}{(x-2)^2(x+1)}$?

A) $\frac{A}{x-2} + \frac{B}{(x-2)^2} + \frac{C}{x+1}$

B) $\frac{A}{x-2} + \frac{B}{x+1}$

C) $\frac{A}{x-2} + \frac{Bx+C}{(x-2)^2} + \frac{D}{x+1}$

D) $\frac{Ax+B}{(x-2)^2} + \frac{C}{x+1}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Initially show the four options. On click or after 10 seconds, highlight option A in green with a checkmark. Option B and D have red X marks because they miss the lower power or wrong numerator form. Option C has unnecessary quadratic numerator for repeated linear factor.

*Interactive Controls:*
  - 🎛 Button: 'Reveal Answer' – shows correct option A highlighted green

**Teacher Narration** `[86w]`
> Take a moment to think about this question. The denominator has one repeated linear factor x minus two squared and one distinct linear factor x plus one. Remember the rules: repeated factor needs ALL powers from one to k, each with a constant numerator. Distinct linear factor gets its own constant. Option A is correct: three terms, each with constant numerators. Option B is missing the squared term. Option C uses an unnecessary linear numerator for the repeated factor. Option D misses the linear term entirely.

**Student Prompt:** Select the correct option before clicking Reveal.

---

### Slide 14 · [SUMMARY]
**Summary – Partial Fractions Algorithm**  ·  `full_width`

**On-screen text** `[14w]`
Summary algorithm: Check properness → Factor → Write form → Find coefficients → Integrate.

**FULL WIDTH** `[text]`

**Step 1:** Check if proper (deg num < deg den). If not, long division.

**Step 2:** Factor denominator completely over real numbers.

**Step 3:** For each factor write:
- $(x-a)$ → $\frac{A}{x-a}$
- $(x-a)^k$ → $\frac{A_1}{x-a}+\cdots+\frac{A_k}{(x-a)^k}$
- $x^2+px+q$ (irreducible) → $\frac{Ax+B}{x^2+px+q}$

**Step 4:** Find coefficients (cover-up for distinct linear; solve system otherwise).

**Step 5:** Integrate each piece: $\ln$, $\arctan$, or power rule for $1/(x-a)^k$.

**Teacher Narration** `[100w]`
> Let's quickly recap the complete algorithm. First, always check if the fraction is proper. If not, do long division. Second, factor the denominator completely over the real numbers. Third, for each factor, write the appropriate decomposition form using constant numerators for linear factors and linear numerators for irreducible quadratics. Fourth, find the coefficients using the cover-up method for distinct linear factors, or by solving a system of equations for repeated and quadratic factors. Finally, integrate each term using logarithms, arctangents, or the power rule for negative powers. Practice this algorithm on a few problems and you will master partial fractions.

---

### Slide 15 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Complex Decomposition**  ·  `split_left_right`

**On-screen text** `[12w]`
Repeated quadratics need terms for each power. Integration may involve trigonometric substitution.

**LEFT** `[concept]`

For repeated irreducible quadratics $(x^2+1)^2$, the form is:

$$\frac{Ax+B}{x^2+1} + \frac{Cx+D}{(x^2+1)^2}$$

**Integrals**:
- First term: $\frac{A}{2}\ln(x^2+1)+B\arctan x$
- Second term: use substitution $x=\tan\theta$

**RIGHT** `[visual_spec]`

*Visual Spec:* Show graph of integrand with denominator (x^2+1)^2 and its antiderivative involving arctan and rational function.

**Teacher Narration** `[71w]`
> If you encounter a repeated irreducible quadratic, such as x squared plus one squared, you need two terms: one linear numerator over x squared plus one, and another linear numerator over the square. The integration of the second term is more involved and often requires a trigonometric substitution or a recursive formula. This is an optional deeper topic, but it shows that the pattern holds: each power needs its own term.

---
