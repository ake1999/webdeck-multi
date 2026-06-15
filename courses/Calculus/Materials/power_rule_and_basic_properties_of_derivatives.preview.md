# Power Rule and Basic Properties of Derivatives

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** Comfortable with the limit definition of derivative f'(x)=lim[h→0] (f(x+h)-f(x))/h

**Learning Objectives:**
- Calculate derivatives of power functions using the Power Rule for any real exponent
- Apply the Constant Multiple, Sum, and Difference Rules to differentiate polynomial expressions
- Distinguish between cases where the variable is in the base (Power Rule) versus the exponent (Exponential Rule)
- Interpret derivatives as slopes of tangent lines and rates of change
- Analyze functions by combining derivative rules efficiently

---

## v3.1 Production Readiness

✅ **Interactive moments:** 4 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 75w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 13 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
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
| 1 | 🎛hook | 🟢 | ◧ |  | 69w | 21w | The Power Rule: Your Shortcut to Change |
| 2 | core | 🟢 | ◧ |  | 76w | 16w | The Power Rule — Formula |
| 3 | core | 🟢 | ◧ |  | 61w | 16w | Constant Multiple & Sum/Difference Rules |
| 4 | practice | 🟢 | ⬛⬛ |  | 74w | 10w | Example 1: Warm-Up — Direct Power Rule |
| 5 | practice | 🟢 | ⬛⬛ |  | 81w | 9w | Example 2: Standard Polynomial |
| 6 | 🎛pause_and_try | 🟡 | ◧ | ⏸️ | 92w | 10w | Pause and Predict: Fractional & Negative Exponents |
| 7 | practice | 🟡 | ⬛⬛ |  | 63w | 15w | Example 3: Tricky — Rewriting First |
| 8 | misconception | 🟡 | ◧ |  | 78w | 13w | Common Mistake: Variable in the Wrong Place |
| 9 | practice | 🔴 | ◧ |  | 82w | 17w | [Challenge – Optional] Example 4: Edge Case — Mixed Rules |
| 10 | 🎛visual_lab | 🟡 | ◧ |  | 75w | 12w | Interactive Lab: Explore the Power Rule |
| 11 | practice | 🟡 | ⬛⬛ |  | 71w | 17w | Example 5: Application — Tangent and Normal Lines |
| 12 | 🎛challenge | 🔴 | ◧ |  | 73w | 16w | [Challenge – Optional] Proof for Positive Integers |
| 13 | summary | 🟢 | ◧ |  | 75w | 13w | Key Takeaways |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**The Power Rule: Your Shortcut to Change**  ·  `split_left_right`

**On-screen text** `[21w]`
Power Rule: d/dx (x^n) = n x^(n-1). Drag the slider to see how the slope of the tangent follows the derivative.

**LEFT** `[text]`

The derivative measures how fast a function changes. The Power Rule gives us a lightning-fast way to differentiate $x^n$: bring down the exponent as a coefficient, then lower the exponent by one.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two subplots. Left: f(x)=x^3 in blue, a moving tangent point at x0 (slider-controlled). Right: f'(x)=3x^2 in red. A vertical dashed line connects (x0, f(x0)) to (x0, f'(x0)). Axes: x from -2 to 2, y from -5 to 5. Tangent slope = 3x0^2 displayed as text. Colors: blue for f, red for f', green for tangent.

*Interactive Controls:*
  - 🎛 Slider for x0 from -2 to 2; updates tangent point and slope display

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider
x = np.linspace(-2,2,400)
f = x**3
df = 3*x**2
fig, (ax1, ax2) = plt.subplots(1,2,figsize=(12,5))
fig.subplots_adjust(bottom=0.25)
line1, = ax1.plot(x, f, 'b-', lw=2)
line2, = ax2.plot(x, df, 'r--', lw=2)
ax1.set_title('f(x) = x³')
ax2.set_title("f'(x) = 3x²")
ax1.axhline(0, color='gray', lw=0.5)
ax2.axhline(0, color='gray', lw=0.5)
x0_init = 0.5
point, = ax1.plot([x0_init], [x0_init**3], 'go', ms=8)
tangent_line, = ax1.plot([], [], 'g-', lw=2)
def update(x0):
    y0 = x0**3
    slope = 3*x0**2
    point.set_data([x0], [y0])
    tx = np.linspace(x0-0.5, x0+0.5, 10)
    ty = y0 + slope*(tx - x0)
    tangent_line.set_data(tx, ty)
    ax1.set_title(f'f(x)=x³, slope = {slope:.2f}')
    return point, tangent_line
ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 'x0', -2.0,  2.0, valinit=x0_init)
slider.on_changed(update)
update(x0_init)
plt.show()
```

**Teacher Narration** `[69w]`
> Welcome. Today we meet the Power Rule — your first big shortcut for derivatives. Instead of using the limit definition every time, this rule lets you differentiate powers in one step. Watch the animation: as you drag the slider, the green tangent line on the left changes slope. That slope is exactly the value of the derivative on the right. The connection will become crystal clear as we practice.

---

### Slide 2 · [CORE]
**The Power Rule — Formula**  ·  `split_left_right`

**On-screen text** `[16w]`
Power Rule: d/dx(x^n) = n x^(n-1) works for all real n. Variable in base, exponent constant.

**LEFT** `[formula_block]`

$$
\frac{d}{dx}(x^n) = n x^{n-1}
$$

For **any real number** $n$. Variable must be in the base, exponent constant.

**RIGHT** `[visual_spec]`

*Visual Spec:* 2x2 grid: top-left (n=2): f(x)=x^2, f'(x)=2x; top-right (n=3): f(x)=x^3, f'(x)=3x^2; bottom-left (n=0.5): f(x)=sqrt(x), f'(x)=0.5*x^{-0.5}; bottom-right (n=-1): f(x)=1/x, f'(x)=-1/x^2. Each subplot shows f in blue, f' in dashed red, axis labels, legend. x-range: [0.5,2] for sqrt case, [-2,2] for others.

**Teacher Narration** `[76w]`
> Here is the rule itself. For any real exponent n, you bring down n as a multiplier, then drop the exponent by one. This works for positive, negative, fractional exponents — everything. Look at the four examples: each derivative curve (dashed red) follows exactly that pattern. Try to verify one in your head: for n = 0.5, the derivative is 0.5 times x to the negative 0.5, which is what you see on the bottom left.

---

### Slide 3 · [CORE]
**Constant Multiple & Sum/Difference Rules**  ·  `split_left_right`

**On-screen text** `[16w]`
Constant Multiple: constants pass through. Sum Rule: differentiate term by term. Derivative of constant = 0.

**LEFT** `[formula_block]`

$$
\frac{d}{dx}[c \cdot f(x)] = c \cdot f'(x)
$$

$$
\frac{d}{dx}[f(x) \pm g(x)] = f'(x) \pm g'(x)
$$

$$
\frac{d}{dx}(c) = 0
$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Diagram drawn with rectangles and arrows: left input 'x^n' enters a machine labeled 'Derivative', output 'n x^{n-1}'. A second machine: input 'c * f(x)' goes into 'Constant Rule' then to 'Derivative', output 'c * f'(x)'. Third: two parallel machines for f and g, outputs combined by plus sign. Simple flat design. Use a 2x2 grid layout: top row shows the first machine, bottom row shows the second and third machines side by side. Each machine is a rectangle (width 120px, height 60px) with rounded corners, light blue background, black border. Arrows are black lines with arrowheads. Input text is left-aligned, output text is right-aligned. Font size 14px for labels, 12px for formulas.

**Teacher Narration** `[61w]`
> These two rules make life easier. The constant multiple rule says you can pull constants out front — treating them as scalars. The sum rule says you can break a function into pieces and differentiate each piece separately. Together with the power rule, you can differentiate any polynomial in seconds. And remember: a constant never changes, so its derivative is zero.

---

### Slide 4 · [PRACTICE]
**Example 1: Warm-Up — Direct Power Rule**  ·  `full_width`

**On-screen text** `[10w]`
f(x)=x^{-3} → f'(x)=-3x^{-4}. Negative exponent: still works the same way.

**FULL WIDTH** `[steps]`

Differentiate $f(x) = x^{-3}$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Identify n = -3 | --- |
| 2 | Apply Power Rule | $-3x^{-3-1} = -3x^{-4}$ |
| 3 | Rewrite (optional) | $-\frac{3}{x^4}$ |

**Teacher Narration** `[74w]`
> Let's start with a simple warm-up. Our function is x to the negative 3. The exponent is -3. Bring it down as a multiplier: -3. Then subtract one from the exponent: -3 - 1 = -4. So the derivative is -3 times x to the negative 4. If you prefer positive exponents, rewrite as -3 over x to the fourth. Notice the derivative is always negative, which confirms the original function is always decreasing.

**Student Prompt:** Try it yourself: differentiate g(x)=x^{1/2}. What do you get?

---

### Slide 5 · [PRACTICE]
**Example 2: Standard Polynomial**  ·  `full_width`

**On-screen text** `[9w]`
Polynomial: differentiate term by term. Degree drops by one.

**FULL WIDTH** `[steps]`

Differentiate $g(x) = 7x^3 - 5x^2 + 4x - 2$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Sum/Difference Rule | $g'(x) = \frac{d}{dx}(7x^3) - \frac{d}{dx}(5x^2) + \frac{d}{dx}(4x) - \frac{d}{dx}(2)$ |
| 2 | Constant Multiple + Power | $= 7\cdot3x^{2} - 5\cdot2x + 4\cdot1 - 0$ |
| 3 | Simplify | $= 21x^2 - 10x + 4$ |

**Teacher Narration** `[81w]`
> Now a standard polynomial. Break it into four terms using the sum and difference rules. For the first term, 7 times x cubed, bring down the 3 to get 21 x squared. Next, derivative of 5 x squared is 10 x. The derivative of 4 x is 4, and the constant -2 becomes 0. Simplify to 21x squared minus 10x plus 4. Notice the original polynomial was degree 3, its derivative is degree 2 — the degree always drops by one.

**Student Prompt:** What is the derivative of h(x) = 2x^4 - x^3 + 7?

---

### Slide 6 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause and Predict: Fractional & Negative Exponents**  ·  `split_left_right`

**On-screen text** `[10w]`
Rewrite as powers: 3x^{-4} + 5x^{1/2} - 2x^{-1/3}. Then differentiate.

**LEFT** `[text]`

Differentiate: $h(x) = \frac{3}{x^4} + 5\sqrt{x} - \frac{2}{x^{1/3}}$.

Hint: Rewrite each term as $x^n$ first.

**RIGHT** `[visual_spec]`

*Visual Spec:* A blank slide with a large question mark and text 'Think before continuing...'

*Interactive Controls:*
  - 🎛 Reveal button: when clicked, shows the solution from slide 7 step by step

**Teacher Narration** `[92w]`
> Here is a trickier expression with fractions and radicals. Before you differentiate, rewrite each term as a power of x. The first term is 3 over x to the fourth, which is 3 times x to the negative 4. The second is 5 times the square root of x, which is 5 times x to the one-half. The third is 2 over x to the one-third, which is 2 times x to the negative one-third. Now pause the video and try to differentiate this yourself. I'll show the solution in a moment.

**Student Prompt:** Pause the video and try to compute h'(x). Write your answer with positive exponents.

---

### Slide 7 · [PRACTICE] 🟡
**Example 3: Tricky — Rewriting First**  ·  `full_width`

**On-screen text** `[15w]`
Step 1: rewrite as powers. Step 2: power rule. Step 3: simplify coefficients and exponents.

**FULL WIDTH** `[steps]`

Differentiate $h(x) = \frac{3}{x^4} + 5\sqrt{x} - \frac{2}{x^{1/3}}$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Rewrite as powers | $3x^{-4} + 5x^{1/2} - 2x^{-1/3}$ |
| 2 | Apply Power Rule to each | $3(-4)x^{-5} + 5(\tfrac12)x^{-1/2} - 2(-\tfrac13)x^{-4/3}$ |
| 3 | Simplify | $-12x^{-5} + \tfrac52 x^{-1/2} + \tfrac23 x^{-4/3}$ |
| 4 | Positive exponents (optional) | $-\frac{12}{x^5} + \frac{5}{2\sqrt{x}} + \frac{2}{3x^{4/3}}$ |

**Teacher Narration** `[63w]`
> Here is the full solution. After rewriting, we apply the power rule to each term. For the first: 3 times negative 4 gives -12, exponent drops to -5. Second: 5 times one-half is five-halves, exponent becomes negative one-half. Third: minus 2 times negative one-third gives positive two-thirds, exponent negative four-thirds. Always simplify coefficients and consider rewriting with positive exponents for the final answer.

---

### Slide 8 · [MISCONCEPTION] 🟡
**Common Mistake: Variable in the Wrong Place**  ·  `split_left_right`

**On-screen text** `[13w]`
Power Rule: variable in base. Exponential Rule: variable in exponent. Know the difference.

**LEFT** `[text]`

**Wrong approach:** Differentiate $\pi^x$ using the Power Rule.

$\frac{d}{dx}(\pi^x) = x \pi^{x-1}$

**Why it's wrong:** The variable is in the exponent, not the base. Use the **Exponential Rule**:

$\frac{d}{dx}(a^x) = a^x \ln a$

**RIGHT** `[visual_spec]`

*Visual Spec:* Two panels side by side, each with a large label. Left panel: green checkmark, 'x^π → π x^{π-1}'. Right panel: red X over 'π^x → x π^{x-1}', correct answer 'π^x ln π' shown in green. Left panel positioned at x=100, y=200, width=300, height=150. Right panel positioned at x=500, y=200, width=300, height=150. Green checkmark: color #00AA00, font size 24px. Red X: color #FF0000, font size 24px. Formula text: font size 18px.

**Teacher Narration** `[78w]`
> This is a classic pitfall. Students often try to apply the Power Rule to something like pi to the x. But look: pi is constant, x is in the exponent. That's an exponential function, not a power function. The Power Rule only works when the variable is in the base. For an exponential function a to the x, the derivative is a to the x times ln a. So always check: where is the variable? Base or exponent?

---

### Slide 9 · [PRACTICE] 🔴 *[Challenge – Optional]*
**[Challenge – Optional] Example 4: Edge Case — Mixed Rules**  ·  `split_left_right`

**On-screen text** `[17w]`
f(x)=x^π + π^x → f'(x)=π x^{π-1} + π^x ln π. Two different rules for two similar-looking terms.

**LEFT** `[steps]`

Differentiate $f(x) = x^{\pi} + \pi^{x}$.

1. First term $x^{\pi}$: Power Rule → $\pi x^{\pi-1}$
2. Second term $\pi^{x}$: Exponential Rule → $\pi^{x} \ln \pi$
3. Sum: $f'(x) = \pi x^{\pi-1} + \pi^{x} \ln \pi$

**RIGHT** `[visual_spec]`

*Visual Spec:* Left subplot: x^π (blue), derivative π x^{π-1} (red dashed). Right subplot: π^x (blue), derivative π^x ln π (red dashed). x-range [0,2], y-range [0,8]. Annotations: 'Power' and 'Exponential' at top.

**Teacher Narration** `[82w]`
> This example tests deep understanding. The first term, x to the pi, has the variable in the base and a constant exponent — so we use the Power Rule: pi times x to the pi minus one. The second term, pi to the x, has the constant in the base and the variable in the exponent — that's the Exponential Rule: pi to the x times ln pi. Combining them, the derivative is a sum of two very different types of terms.

---

### Slide 10 · [VISUAL_LAB] 🟡 🎛 *[2 controls]*
**Interactive Lab: Explore the Power Rule**  ·  `split_left_right`

**On-screen text** `[12w]`
Adjust n and x0. Watch how the function and derivative change together.

**LEFT** `[text]`

Use the sliders to change the exponent $n$ and point $x_0$. Observe how the derivative function changes and how the tangent slope matches $f'(x_0)$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two subplots side by side. Left: f(x)=x^n in blue, tangent line in green at x0. Right: f'(x)=n x^{n-1} in red, vertical dotted line at x0. Sliders: n from -3 to 5 (step 0.1), x0 from -2 to 2 (step 0.05). Display current slope value as text. Update on change.

*Interactive Controls:*
  - 🎛 Slider for exponent n from -3 to 5 (step 0.1)
  - 🎛 Slider for point x0 from -2 to 2 (step 0.05)

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider
x = np.linspace(-2,2,400)
fig, (ax1, ax2) = plt.subplots(1,2,figsize=(12,5))
fig.subplots_adjust(bottom=0.25)
n_init = 3
x0_init = 0.5
def f(x, n): return x**n
def df(x, n): return n * x**(n-1)
line1, = ax1.plot(x, f(x, n_init), 'b-', lw=2)
line2, = ax2.plot(x, df(x, n_init), 'r--', lw=2)
ax1.axhline(0, color='gray', lw=0.5); ax2.axhline(0, color='gray', lw=0.5)
ax1.set_ylim(-5,5); ax2.set_ylim(-5,5)
point, = ax1.plot([x0_init], [f(x0_init, n_init)], 'go', ms=8)
tangent, = ax1.plot([], [], 'g-', lw=2)
slope_text = ax1.text(0.05, 0.95, '', transform=ax1.transAxes, va='top')
def update(vals):
    n = slider_n.val
    x0 = slider_x.val
    y0 = f(x0, n)
    slope = df(x0, n)
    line1.set_ydata(f(x, n))
    line2.set_ydata(df(x, n))
    point.set_data([x0], [y0])
    tx = np.linspace(x0-0.5, x0+0.5, 10)
    ty = y0 + slope*(tx - x0)
    tangent.set_data(tx, ty)
    slope_text.set_text(f'Slope = {slope:.3f}')
    ax1.set_ylim(-max(5, abs(y0*2)), max(5, abs(y0*2)))
    ax2.set_ylim(-max(5, abs(slope*2)), max(5, abs(slope*2)))
ax_slider_n = plt.axes([0.2, 0.1, 0.3, 0.03])
ax_slider_x = plt.axes([0.6, 0.1, 0.3, 0.03])
slider_n = Slider(ax_slider_n, 'n', -3.0, 5.0, valinit=n_init)
slider_x = Slider(ax_slider_x, 'x0', -2.0, 2.0, valinit=x0_init)
slider_n.on_changed(update)
slider_x.on_changed(update)
update(None)
plt.show()
```

**Teacher Narration** `[75w]`
> Now you can explore the Power Rule interactively. Drag the top slider to change the exponent n — see how the curve and its derivative transform. Drag the bottom slider to move the point x0; the green tangent line on the left tracks the curve, and its slope is exactly the derivative value shown on the right. Try n equal to 2, 1, 0.5, or -1. Notice what happens when n equals 0 or 1.

**Student Prompt:** Try n = 0. What happens? Try n = 1. Why does the derivative become a constant?

---

### Slide 11 · [PRACTICE] 🟡
**Example 5: Application — Tangent and Normal Lines**  ·  `full_width`

**On-screen text** `[17w]`
Tangent: y = (3/2)x - 1/2. Normal: y = -(2/3)x + 5/3. They are perpendicular at (1,1).

**FULL WIDTH** `[steps]`

Find tangent & normal lines to $y = x\sqrt{x}$ at $(1,1)$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Rewrite: $y = x \cdot x^{1/2} = x^{3/2}$ | |
| 2 | Power Rule: $y' = \frac{3}{2}x^{1/2}$ | |
| 3 | Slope at x=1: $\frac{3}{2}(1)^{1/2} = \frac{3}{2}$ | |
| 4 | Tangent: $y - 1 = \frac{3}{2}(x-1)$ → $y=\frac{3}{2}x - \frac{1}{2}$ |
| 5 | Normal slope: $m_\perp = -\frac{2}{3}$ | |
| 6 | Normal: $y - 1 = -\frac{2}{3}(x-1)$ → $y=-\frac{2}{3}x + \frac{5}{3}$ |

**Teacher Narration** `[71w]`
> Our final example applies derivatives to geometry. First rewrite x sqrt x as x to the 3 halves. Differentiate: bring down 3 halves, exponent becomes 1 half. At x equals 1, the slope is 3 halves. The tangent line uses point-slope form. The normal line is perpendicular, so its slope is the negative reciprocal: negative 2 thirds. Both lines pass through the point (1,1). This is a classic application in calculus.

**Student Prompt:** Check: The slopes multiply to -1? (3/2)*(-2/3) = -1. Yes!

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Proof for Positive Integers**  ·  `split_left_right`

**On-screen text** `[16w]`
The only term without a factor of h survives the limit. That term is n x^{n-1}.

**LEFT** `[steps]`

Prove $\frac{d}{dx}(x^n) = n x^{n-1}$ for $n \in \mathbb{N}$.

1. Use limit definition: $f'(x) = \lim_{h \to 0} \frac{(x+h)^n - x^n}{h}$
2. Binomial expansion: $(x+h)^n = \sum_{k=0}^n \binom{n}{k} x^{n-k}h^k$
3. Subtract $x^n$: $\frac{\binom{n}{1} x^{n-1}h + \binom{n}{2} x^{n-2}h^2 + \dots}{h}$
4. Cancel $h$: $\binom{n}{1} x^{n-1} + \binom{n}{2} x^{n-2}h + \dots + h^{n-1}$
5. As $h \to 0$, all terms but the first vanish → $n x^{n-1}$

**RIGHT** `[visual_spec]`

*Visual Spec:* A step-by-step animation: start with the limit definition, then show the expansion. Highlight the first term (k=1) in green, and mark higher terms in red with an X that fades out as h->0. Final frame: only green term remains: n x^{n-1}. Frame 1: show limit definition. Frame 2: show binomial expansion with k=1 term in green, k>=2 terms in red. Frame 3: show cancellation of h, k=1 term remains green, red terms fade. Frame 4: final result n x^{n-1} in green. Transition time between frames: 2 seconds.

*Interactive Controls:*
  - 🎛 Step reveal button: advances through the 4 frames of the proof

**Teacher Narration** `[73w]`
> For those who want to see why the Power Rule works, here's a proof for positive integers. Starting from the limit definition, expand (x+h) to the n using the binomial theorem. Subtract x to the n and divide by h. Every term except the first contains a factor of h. As h approaches zero, all those terms vanish, leaving only the coefficient n times x to the n minus 1. Beautiful and rigorous.

---

### Slide 13 · [SUMMARY]
**Key Takeaways**  ·  `split_left_right`

**On-screen text** `[13w]`
Three fundamental rules: Power, Constant Multiple, Sum. Combine them to differentiate any polynomial.

**LEFT** `[text]`

- **Power Rule:** $\frac{d}{dx}(x^n) = n x^{n-1}$ for any real $n$
- **Constant Multiple:** $\frac{d}{dx}[c f(x)] = c f'(x)$
- **Sum/Difference:** $\frac{d}{dx}[f\pm g] = f' \pm g'$
- **Derivative of constant:** 0
- **Rule check:** Variable in base = Power Rule; variable in exponent = Exponential Rule

**RIGHT** `[visual_spec]`

*Visual Spec:* Single panel: background white. Three boxes titled 'Power', 'Constant Multiple', 'Sum'. Under each the formula. Below, a small graph showing f(x)=x^3-2x and f'(x)=3x^2-2, both on same axes, legend.

**Teacher Narration** `[75w]`
> Let's review what we've learned. The Power Rule is your main tool: bring down the exponent, lower it by one. Combine it with the constant multiple and sum rules to handle any polynomial or expression that can be written as powers of x. Always check where the variable lives — base or exponent — to pick the right rule. Practice with the examples we did, and you'll be able to differentiate almost any function quickly.

---
