# Implicit Differentiation

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 92%

> **Prerequisite:** The chain rule: if y = f(g(x)), then dy/dx = f'(g(x)) · g'(x).

**Learning Objectives:**
- Differentiate equations where y is not isolated
- Apply the chain rule to y‑terms automatically
- Solve for dy/dx using algebraic manipulation
- Find tangent lines to implicitly defined curves
- Compute higher‑order derivatives implicitly

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
⚠️ **Narration overlong  (>120w):** [8]  (avg 99w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 15 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
⚠️ **visual_specs**: missing on slides: [7, 11, 13]
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 3 interactive moment(s) (min 3)
⚠️ **narration_overlong**: too long: ['s8:122w']
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | hook | 🟢 | ◧ |  | 94w | 20w | Explicit vs. Implicit – The Mountain Trail |
| 2 | core | 🟢 | ◧ |  | 98w | 18w | The One New Rule |
| 3 | practice | 🟢 | ◧ | ⏸️ | 100w | 19w | Warm‑Up: The Circle |
| 4 | core | 🟡 | ◧ |  | 102w | 16w | The Formula: Implicit Function Theorem |
| 5 | practice | 🟢 | ⬛⬛ |  | 102w | 15w | Standard Example: Folium of Descartes |
| 6 | misconception | 🟢 | ◧ |  | 93w | 13w | Common Mistake: Forgetting dy/dx |
| 7 | 🎛pause_and_try | 🟡 | ◧ | ⏸️ | 79w | 11w | Try This: Second Derivative |
| 8 | practice | 🟡 | ⬛⬛ |  | 122w⚠️ | 12w | Second Derivative – Solution |
| 9 | challenge | 🔴 | ◧ |  | 97w | 21w | [Challenge – Optional] Edge Case: Self‑Intersection |
| 10 | practice | 🟢 | ◧ |  | 101w | 14w | Application: Derivative of Inverse Sine |
| 11 | 🎛visual_lab | 🟢 | ◧ |  | 83w | 15w | Interactive: Tangent on a Circle |
| 12 | core | 🟢 | ◧ |  | 111w | 12w | Pro Tips |
| 13 | 🎛practice | 🟢 | ◧ | ⏸️ | 98w | 18w | Quick Check 1 |
| 14 | practice | 🟢 | ◧ |  | 93w | 8w | Quick Check 2 |
| 15 | summary | 🟢 | ⬛⬛ |  | 105w | 14w | Summary: Implicit Differentiation |

---

### Slide 1 · [HOOK]
**Explicit vs. Implicit – The Mountain Trail**  ·  `split_left_right`

**On-screen text** `[20w]`
Explicit: y = √(25 – x²). Implicit: x² + y² = 25. Implicit differentiation finds slope without solving for y.

**LEFT** `[text]`

**Explicit:** $y = \sqrt{25 - x^2}$ — we know exactly what $y$ equals.

**Implicit:** $x^2 + y^2 = 25$ — $y$ is hidden inside the equation.

Implicit differentiation finds the slope anywhere *without* solving for $y$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a full 2D plot of the circle x^2 + y^2 = 25 with axes from -6 to 6. Color the circle as a hiking trail. Mark two points: (3,4) and (-3,4). Add a dashed tangent line at (3,4) with slope -3/4. Use a subtle terrain gradient background. Label: 'Implicit: x² + y² = 25'.

**Teacher Narration** `[94w]`
> Imagine you’re on a mountain trail that follows the circle x² plus y² equals 25. If you know exactly what y is in terms of x, you can differentiate directly. But what if the equation just ties x and y together without isolating either? That’s an implicit equation. The good news is you don’t need to solve for y. Implicit differentiation gives you the slope anywhere on the trail, using only the relationship between x and y. Today we’ll learn that technique, and it all starts with one simple twist on the chain rule.

---

### Slide 2 · [CORE]
**The One New Rule**  ·  `split_left_right`

**On-screen text** `[18w]`
d/dx[y^n] = n y^{n-1} · dy/dx. Four steps: differentiate both sides, multiply y-terms by dy/dx, isolate dy/dx, divide.

**LEFT** `[concept]`

When we differentiate a $y$‑term with respect to $x$, we treat $y$ as a function of $x$. Therefore:

$$\frac{d}{dx}[y^n] = n\,y^{n-1}\cdot\frac{dy}{dx}$$

**Procedure:**
1. Differentiate both sides with respect to $x$.
2. Every time you differentiate a $y$‑term, multiply by $\frac{dy}{dx}$ (chain rule).
3. Collect all $\frac{dy}{dx}$ terms on one side.
4. Factor out $\frac{dy}{dx}$ and divide.

**RIGHT** `[visual_spec]`

*Visual Spec:* A simple animation: first show y² as a box labelled 'y(x)'. A chain of arrows: d/dx outer → 2y, then d/dx inner → dy/dx. Combine as 2y·dy/dx. Use bright colors and arrows. No axes needed.

**Teacher Narration** `[98w]`
> This is the only new rule you need today. When we differentiate a y‑term, we apply the chain rule just as if y were a nested function. For example, the derivative of y squared is 2y times dy over dx. The procedure is always the same: differentiate both sides of the equation with respect to x. Whenever you touch a y, tag on dy over dx. Then move all the dy over dx terms to one side, factor, and solve. Everything else you already know – product rule, quotient rule – still applies. Let’s see it in action.

---

### Slide 3 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Warm‑Up: The Circle**  ·  `split_left_right`

**On-screen text** `[19w]`
Example: x² + y² = 25 → dy/dx = –x/y. At (3,4) slope = –3/4 (tangent perpendicular to radius).

**LEFT** `[steps]`

**Find $\frac{dy}{dx}$ for $x^2 + y^2 = 25$**

| Step | Action | Result |
|------|--------|--------|
| 1 | Differentiate both sides | $2x + 2y\frac{dy}{dx} = 0$ |
| 2 | Isolate $\frac{dy}{dx}$ term | $2y\frac{dy}{dx} = -2x$ |
| 3 | Solve for $\frac{dy}{dx}$ | $\frac{dy}{dx} = -\frac{x}{y}$ |

At $(3,4)$: slope $= -\frac{3}{4}$.
Radius slope $= \frac{4}{3}$ → tangent is perpendicular. ✅

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the circle x²+y²=25. Show point (3,4) in red. Draw the tangent line y = -3/4 x + 25/4 in dashed red. Also draw the radius from (0,0) to (3,4) in blue. Label slopes: radius 4/3, tangent -3/4. Show a small right angle symbol where radius meets tangent.

**Teacher Narration** `[100w]`
> Let’s start with a simple circle. Differentiating x squared gives 2x. Differentiating y squared gives 2y times dy over dx. The derivative of the constant 25 is 0. Now isolate the dy over dx term: bring 2x to the other side and divide by 2y. We get dy over dx equals negative x over y. At the point (3,4), the slope is negative 3 quarters. Notice the radius from the origin to (3,4) has slope 4 thirds. The tangent is perpendicular – a nice sanity check. This result in terms of both x and y is typical for implicit differentiation.

**Student Prompt:** Before revealing the slope at (3,4), what do you expect? (Hint: radius slope = 4/3)

---

### Slide 4 · [CORE] 🟡 *(skip if time-limited)*
**The Formula: Implicit Function Theorem**  ·  `split_left_right`

**On-screen text** `[16w]`
dy/dx = –F_x / F_y  (if F_y ≠ 0). Derived by differentiating F(x, y(x)) = 0.

**LEFT** `[formula_block]`

For $F(x,y)=0$:

$$\frac{dy}{dx} = -\frac{F_x}{F_y} \quad (F_y \neq 0)$$

- $F_x$ = partial derivative w.r.t. $x$
- $F_y$ = partial derivative w.r.t. $y$

**Why?** Differentiate $F(x, y(x)) = 0$ using chain rule:
$F_x \cdot 1 + F_y \cdot \frac{dy}{dx} = 0$

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a smooth curve F(x,y)=0. At a point on the curve, show two arrows: one horizontal labelled F_x, one vertical labelled F_y. The ratio -F_x/F_y gives the slope of the tangent line. Use a simple coordinate plane with axes x and y, the curve in black, and the tangent line in red.

**Teacher Narration** `[102w]`
> There’s a neat formula that summarizes implicit differentiation. If we rewrite any implicit equation as F of x,y equals 0, then the derivative dy over dx is negative F_x divided by F_y, provided F_y is not zero. F_x and F_y are partial derivatives – treat the other variable as constant. The derivation is quick: differentiate F of x,y of x with respect to x using the chain rule. You get F_x plus F_y times dy over dx equals zero, then solve. This formula is especially useful when the equation is complicated, though for many problems the step‑by‑step method is just as fast.

---

### Slide 5 · [PRACTICE]
**Standard Example: Folium of Descartes**  ·  `full_width`

**On-screen text** `[15w]`
Folium of Descartes: x³+y³=6xy. At (3,3) slope = –1, tangent: y = –x + 6.

**FULL WIDTH** `[text]`

**Find the tangent line to $x^3 + y^3 = 6xy$ at $(3,3)$**

| Step | Action | Result |
|------|--------|--------|
| 1 | Differentiate both sides | $3x^2 + 3y^2 \frac{dy}{dx} = 6\left(x\frac{dy}{dx} + y\right)$ |
| 2 | Distribute | $3x^2 + 3y^2 \frac{dy}{dx} = 6x\frac{dy}{dx} + 6y$ |
| 3 | Group $\frac{dy}{dx}$ terms | $3y^2\frac{dy}{dx} - 6x\frac{dy}{dx} = 6y - 3x^2$ |
| 4 | Factor $\frac{dy}{dx}$ | $\frac{dy}{dx}(3y^2 - 6x) = 6y - 3x^2$ |
| 5 | Solve for $\frac{dy}{dx}$ | $\frac{dy}{dx} = \frac{6y - 3x^2}{3y^2 - 6x}$ |
| 6 | At $(3,3)$ | $\frac{dy}{dx} = \frac{18 - 27}{27 - 18} = -1$ |
| 7 | Tangent line | $y - 3 = -1(x - 3) \Rightarrow y = -x + 6$ |

**Teacher Narration** `[102w]`
> Now a classic curve: the Folium of Descartes. The equation x cubed plus y cubed equals 6xy looks symmetric. Differentiate term by term – notice that the right side requires the product rule because we have 6 times x times y. After differentiating, group all the dy over dx terms together. Factor and solve. At the point (3,3), the slope comes out as negative one. So the tangent line is y equals negative x plus 6. Always check that the point actually lies on the curve – 27 plus 27 equals 54, and 6 times 3 times 3 is also 54. Good.

**Student Prompt:** Quick check: verify that (3,3) satisfies x³ + y³ = 6xy.

---

### Slide 6 · [MISCONCEPTION]
**Common Mistake: Forgetting dy/dx**  ·  `split_left_right`

**On-screen text** `[13w]`
WRONG: d/dx[y²] = 2y. RIGHT: d/dx[y²] = 2y·dy/dx. Always add dy/dx for y‑terms.

**LEFT** `[text]`

**Wrong:** $\frac{d}{dx}[y^2] = 2y$

**Right:** $\frac{d}{dx}[y^2] = 2y \cdot \frac{dy}{dx}$

**Why it happens:** Students see an ordinary power rule and forget that $y$ is a function of $x$. The chain rule always applies when $y$ depends on $x$.

**Tip:** Every time you write a derivative of a $y$‑term, immediately add $\cdot \frac{dy}{dx}$ as a reflex.

**RIGHT** `[visual_spec]`

*Visual Spec:* Left half: 'WRONG' in red with d/dx[y²] = 2y crossed out. Right half: 'CORRECT' in green with d/dx[y²] = 2y·dy/dx. Below each, a small chain: left chain broken, right chain complete. Use a red X on left, green check on right.

**Teacher Narration** `[93w]`
> This is the number one mistake in implicit differentiation. When you see y squared and you take its derivative with respect to x, it is not simply 2y. Because y itself is a function of x, you must apply the chain rule. The correct derivative is 2y times dy over dx. To avoid this error, get into the habit: every time you finish differentiating a y term, immediately multiply by dy over dx. It’s like an automatic reflex. If you forget, your whole solution will be wrong, so double‑check yourself on every y‑term.

---

### Slide 7 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Try This: Second Derivative**  ·  `split_left_right`

**On-screen text** `[11w]`
Find y'' for x⁴ + y⁴ = 16. Pause and try!

**LEFT** `[text]`

**Find $y''$ if $x^4 + y^4 = 16$**

1. Differentiate implicitly to find $y'$.
2. Differentiate $y'$ to get $y''$.
3. Remember $y$ is still a function of $x$!

Pause the video and attempt this. Then advance to see the solution.

**RIGHT** `[empty]`

*Interactive Controls:*
  - 🎛 Button: Reveal solution

**Teacher Narration** `[79w]`
> Let’s try a second derivative problem. For the curve x to the fourth plus y to the fourth equals 16, find y double prime. Start by finding y prime implicitly. Then differentiate that expression to get y double prime. But be careful – when you differentiate y prime, remember that y still depends on x, so you’ll need the chain rule again. Pause the video now and work through it. When you’re ready, click to reveal the full solution.

**Student Prompt:** Find y'' for x⁴ + y⁴ = 16.

---

### Slide 8 · [PRACTICE] 🟡
**Second Derivative – Solution**  ·  `full_width`

**On-screen text** `[12w]`
y' = –x³/y³. Then y'' = –(3x²·16)/y⁷ = –48x²/y⁷ (using original equation).

**FULL WIDTH** `[text]`

**Given $x^4 + y^4 = 16$**

| Step | Action | Result |
|------|--------|--------|
| 1 | Differentiate implicitly | $4x^3 + 4y^3 y' = 0$ |
| 2 | Solve for $y'$ | $y' = -\dfrac{x^3}{y^3}$ |
| 3 | Differentiate $y'$ (quotient rule) | $y'' = -\dfrac{y^3 \cdot 3x^2 - x^3 \cdot 3y^2 y'}{y^6}$ |
| 4 | Substitute $y'$ | $y'' = -\dfrac{3x^2 y^3 + 3x^3 y^2 \cdot \dfrac{x^3}{y^3}}{y^6}$ |
| 5 | Simplify | $y'' = -\dfrac{3x^2 y^3 + 3x^6 / y}{y^6}$ |
| 6 | Write as single fraction | $y'' = -\dfrac{3x^2 y^4 + 3x^6}{y^7}$ |
| 7 | Use $x^4+ y^4 = 16$ | $y'' = -\dfrac{3x^2 \cdot 16}{y^7} = -\dfrac{48x^2}{y^7}$ |

**Teacher Narration** `[122w ⚠️ **OVERLONG: 122w > 120w max**]`
> Here’s the full solution. First we differentiate to get 4x cubed plus 4y cubed y prime equals zero, so y prime equals negative x cubed over y cubed. To find y double prime, we differentiate y prime using the quotient rule. Notice we need the derivative of the denominator: y cubed times y prime. After substituting y prime and simplifying, we get an expression with both x and y. The clever trick is to use the original equation x to the fourth plus y to the fourth equals 16 to replace y to the fourth plus x to the fourth with 16. That gives us a clean final answer: y double prime equals negative 48 x squared over y to the seventh.

---

### Slide 9 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Edge Case: Self‑Intersection**  ·  `split_left_right`

**On-screen text** `[21w]`
At (0,0) we get 0/0 – not a mistake, but a sign the curve self‑intersects. F_y = 0 ⇒ multiple branches.

**LEFT** `[text]`

**Find $\frac{dy}{dx}$ at $(0,0)$ for $x^3 + y^3 = 3xy$**

Following the same steps as Example 5, we get:

$$\frac{dy}{dx} = \frac{y - x^2}{y^2 - x}$$

At $(0,0)$: $\frac{0}{0}$ → **indeterminate**.

**Why?** The curve crosses itself at the origin (self‑intersection). The implicit function theorem fails because $F_y = 0$ there.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the curve x³ + y³ = 3xy for x and y in [-2,2]. Use a high sample density to capture the loop. Highlight the origin with a circle. Show two tangent lines crossing at the origin (one with slope ~1, one with slope ~-1) to illustrate the two branches. Label: 'Self‑intersection at (0,0) – dy/dx is not unique.'

**Teacher Narration** `[97w]`
> Sometimes implicit differentiation gives 0 over 0. That does not mean you made an error. It indicates a genuine geometric singularity. For the curve x cubed plus y cubed equals 3xy, at the origin the derivative formula becomes 0 over 0. Look at the graph – the curve actually crosses itself at the origin. There are two different tangent lines, so the derivative is not uniquely defined. The implicit function theorem requires F_y not equal to zero; here F_y equals 0 at that point. This is a beautiful example of how algebra can tell us about geometry.

---

### Slide 10 · [PRACTICE]
**Application: Derivative of Inverse Sine**  ·  `split_left_right`

**On-screen text** `[14w]`
d/dx[sin⁻¹ x] = 1/√(1−x²). Derived by writing x = sin y and implicit diff.

**LEFT** `[steps]`

**Prove $\frac{d}{dx}[\sin^{-1} x] = \frac{1}{\sqrt{1-x^2}}$**

| Step | Action | Result |
|------|--------|--------|
| 1 | Let $y = \sin^{-1} x$ | $y \in [-\pi/2, \pi/2]$ |
| 2 | Rewrite as $\sin y = x$ | Implicit equation |
| 3 | Differentiate w.r.t. $x$ | $\cos y \cdot y' = 1$ |
| 4 | Solve for $y'$ | $y' = \dfrac{1}{\cos y}$ |
| 5 | Use $\cos y = \sqrt{1-\sin^2 y} = \sqrt{1-x^2}$ | $y' = \dfrac{1}{\sqrt{1-x^2}}$ |

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot y = sin⁻¹ x for x in [-1,1], y in [-π/2, π/2]. At x=0.5, draw the tangent line with slope 1/√(1-0.25)=1/√0.75≈1.155. Show the right triangle with opposite side x, hypotenuse 1, adjacent side √(1-x²). Label the triangle angles.

**Teacher Narration** `[101w]`
> Implicit differentiation gives us a powerful tool for deriving inverse trigonometric derivatives. Let y equals inverse sine of x. Rewrite as x equals sine of y. Differentiate both sides with respect to x – the left side is 1, the right side is cosine y times y prime. So y prime equals 1 over cosine y. Since cosine y is the square root of 1 minus sine squared y, and sine y is x, we get 1 over the square root of 1 minus x squared. This method works for all inverse trig functions, and it’s much cleaner than memorizing formulas.

---

### Slide 11 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive: Tangent on a Circle**  ·  `split_left_right`

**On-screen text** `[15w]`
Drag the slider to move a point on the circle. Watch the tangent line update.

**LEFT** `[text]`

**Explore the circle $x^2 + y^2 = 25$**

Use the slider to move a point on the circle. The tangent line updates automatically.

Notice:
- The slope is $–x/y$ at any point.
- The radius and tangent are always perpendicular.

**RIGHT** `[python_lab]`

*Interactive Controls:*
  - 🎛 Slider: θ from 0 to 2π
  - 🎛 Button: Show/Hide Tangent

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

fig, ax = plt.subplots(figsize=(6,6))
plt.subplots_adjust(bottom=0.25)
ax.set_xlim(-6,6); ax.set_ylim(-6,6)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.set_title('Circle: x² + y² = 25')

# Plot circle
theta = np.linspace(0,2*np.pi,400)
ax.plot(5*np.cos(theta),5*np.sin(theta), 'b-', lw=2, label='Circle')

# Initial point at theta=0
angle0 = 0
x0 = 5*np.cos(angle0)
y0 = 5*np.sin(angle0)
point, = ax.plot(x0,y0,'ro', markersize=8, label='Point')
tang_line, = ax.plot([], [], 'r--', lw=2, label='Tangent')
radius_line, = ax.plot([0,x0],[0,y0], 'g-', lw=1, label='Radius')
ax.legend(loc='upper left')

# Slider for theta
ax_slider = plt.axes([0.25, 0.1, 0.5, 0.03])
theta_slider = Slider(ax_slider, 'θ (rad)', 0, 2*np.pi, valinit=angle0)

# Button to toggle tangent
ax_button = plt.axes([0.5, 0.05, 0.15, 0.04])
show_tang = Button(ax_button, 'Hide Tangent')
tang_visible = True

def update(val):
    global angle0, tang_visible
    angle = theta_slider.val
    x = 5*np.cos(angle)
    y = 5*np.sin(angle)
    point.set_data([x],[y])
    radius_line.set_data([0,x],[0,y])
    # tangent slope = -x/y, unless y=0 (vertical)
    if abs(y) > 1e-10:
        slope = -x/y
        # line through (x,y) with that slope
        xs = np.linspace(x-2,x+2,100)
        ys = y + slope*(xs - x)
        tang_line.set_data(xs, ys)
    else:
        # vertical tangent
        tang_line.set_data([x,x],[-6,6])
    if not tang_visible:
        tang_line.set_data([],[])
    fig.canvas.draw_idle()

def toggle_tang(event):
    global tang_visible
    tang_visible = not tang_visible
    show_tang.label.set_text('Show Tangent' if not tang_visible else 'Hide Tangent')
    update(0)

theta_slider.on_changed(update)
show_tang.on_clicked(toggle_tang)

plt.show()
```

**Teacher Narration** `[83w]`
> Now you can explore the circle interactively. Use the slider to move a point around the circle. The tangent line updates automatically based on the formula dy over dx equals negative x over y. You’ll see that the radius and tangent are always perpendicular – a nice geometric check. You can also hide the tangent line if you want to test your prediction first. Play with it for a moment and confirm that the slope is negative x over y at every point.

**Student Prompt:** What happens to the tangent when y=0? Predict first, then use the slider to check.

---

### Slide 12 · [CORE]
**Pro Tips**  ·  `split_left_right`

**On-screen text** `[12w]`
Five pro tips: prod rule, group, sub last, chain reflex, sanity check.

**LEFT** `[text]`

1. **Product rule:** For $x^2 y$, derivative = $2x\cdot y + x^2\cdot\frac{dy}{dx}$.
2. **Group first:** Collect all $\frac{dy}{dx}$ terms before factoring.
3. **Substitute last:** Plug in point coordinates after solving.
4. **Chain reflex:** Every $y$‑term gets $\cdot\frac{dy}{dx}$.
5. **Sanity check:** For a circle $x^2+y^2=r^2$, slope $= -x/y$ ⟂ radius.

**RIGHT** `[visual_spec]`

*Visual Spec:* Create a simple diagram of two interlocking gears labelled 'x' and 'y'. A small chain connects them. Above the gears, text: 'Chain Rule → dy/dx'. Use clean vector style.

**Teacher Narration** `[111w]`
> Here are five tips to keep you on track. First, when you see products like x squared y, remember the product rule – you differentiate x squared times y plus x squared times dy over dx. Second, always group the dy over dx terms on the same side before factoring – it prevents sign errors. Third, substitute the point coordinates only after solving for dy over dx; substituting too early can hide cancellations. Fourth, develop the reflex: every time you differentiate a y term, immediately add times dy over dx. And fifth, use a sanity check – for a circle, the tangent slope should be negative reciprocal of the radius slope.

---

### Slide 13 · [PRACTICE] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Quick Check 1**  ·  `split_left_right`

**On-screen text** `[18w]`
x²y + y³ = 10, find dy/dx at (1,2). Choose: A) –2/7, B) –4/13, C) 2/7, D) 4/13.

**LEFT** `[text]`

**Q: If $x^2 y + y^3 = 10$, what is $\frac{dy}{dx}$ at $(1,2)$?**

A) $-\frac{2}{7}$

B) $-\frac{4}{13}$

C) $\frac{2}{7}$

D) $\frac{4}{13}$

Try to solve, then advance for the answer.

**RIGHT** `[empty]`

*Interactive Controls:*
  - 🎛 Radio: A, B, C, D (select & reveal)

**Teacher Narration** `[98w]`
> Let’s test our understanding. For the equation x squared y plus y cubed equals 10, we want dy over dx at the point one, two. Differentiate: derivative of x squared y is 2x y plus x squared dy over dx, and derivative of y cubed is 3y squared dy over dx. The derivative of 10 is zero. Collect terms, factor, and you get dy over dx equals negative 2x y over x squared plus 3y squared. At one comma two that’s negative 4 over 1 plus 12, which is negative 4 over 13. The correct answer is B.

**Student Prompt:** Predict the correct answer before revealing.

---

### Slide 14 · [PRACTICE]
**Quick Check 2**  ·  `split_left_right`

**On-screen text** `[8w]`
x³+y³=6xy at (0,0): options A-D. Which is correct?

**LEFT** `[text]`

**Q: For $x^3 + y^3 = 6xy$, what is special about $(0,0)$?**

A) The tangent line is horizontal.

B) The slope is undefined (vertical tangent).

C) The curve self‑intersects there.

D) The derivative is undefined because $y=0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Zoomed plot of x³+y³=6xy for x,y in [-1,1]. Show the two branches crossing at origin. Label the origin. Use red arrows to indicate two different tangent directions.

**Teacher Narration** `[93w]`
> Our second quick check is about the Folium of Descartes at the origin. Four options: horizontal tangent, vertical tangent, self‑intersection, or derivative undefined because y is zero. Remember our earlier edge case: when we computed the derivative formula at the origin we got 0 over 0. That signals a self‑intersection, not a vertical asymptote. The correct answer is C: the curve crosses itself there. The other options are common misconceptions – a horizontal tangent would require a finite zero slope, vertical would be infinite, and y being zero is not the root cause.

**Student Prompt:** Think about the derivative formula at (0,0) for x³+y³=6xy.

---

### Slide 15 · [SUMMARY]
**Summary: Implicit Differentiation**  ·  `full_width`

**On-screen text** `[14w]`
4 steps: differentiate, add dy/dx, group, solve. Formula: dy/dx = –F_x/F_y. Watch for 0/0.

**FULL WIDTH** `[text]`

**The 4‑Step Process**
1. Differentiate both sides w.r.t. $x$.
2. Multiply by $\frac{dy}{dx}$ for every $y$‑term (chain rule!).
3. Collect all $\frac{dy}{dx}$ terms on one side.
4. Factor and divide.

**Key Formula:** For $F(x,y)=0$, $\frac{dy}{dx} = -\frac{F_x}{F_y}$ (when $F_y \neq 0$).

**Applications:** tangent lines, higher‑order derivatives, inverse trig derivatives.

**Common Pitfalls:** forgetting $\frac{dy}{dx}$, substituting too early, 0/0 as a singularity.

**Learning Objectives Achieved:** ✅ Differentiation ✓ Chain rule ✓ Solve for dy/dx ✓ Tangent lines ✓ Higher‑order derivatives

**Teacher Narration** `[105w]`
> Let’s recap. Implicit differentiation is a four‑step process: differentiate both sides with respect to x, multiply by dy over dx for every y term, group all the dy over dx terms on one side, then factor and divide. The key formula dy over dx equals negative F_x over F_y gives a quick alternative. We’ve seen applications from tangent lines to the Folium of Descartes, to second derivatives, and even deriving inverse trig formulas. Remember the common pitfalls: forgetting the dy over dx, substituting coordinates too early, and getting 0 over 0 which may indicate a self‑intersection. You’re now ready to handle any implicit differentiation problem!

---
