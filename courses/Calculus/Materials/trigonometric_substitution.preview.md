# Trigonometric Substitution

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should know basic Pythagorean identities, integration of trig functions, and u-substitution.

**Learning Objectives:**
- Identify which trigonometric substitution to apply based on the radical form
- Evaluate integrals involving sqrt(a^2 - x^2), sqrt(a^2 + x^2), and sqrt(x^2 - a^2)
- Convert trigonometric expressions back to algebraic form using reference triangles
- Simplify resulting trigonometric integrals using identities and algebraic manipulation
- Apply trigonometric substitution to solve definite integrals with appropriate limit adjustments

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 82w)
⚠️ **Narration too short (<60w):** [14]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 3 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s14:59w']
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
| 1 | 🎛hook | 🟢 | ◧ |  | 76w | 15w | Why Trig Substitution? |
| 2 | core | 🟢 | ◧ |  | 84w | 12w | The Three Core Patterns |
| 3 | practice | 🟢 | ⬛⬛ | ⏸️ | 71w | 13w | Warm-Up Example: ∫ dx / √(9 – x²) |
| 4 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 100w | 11w | Pause & Try: ∫ dx/√(25 – x²) |
| 5 | practice | 🟡 | ⬛⬛ |  | 80w | 13w | Standard Example: ∫ √(9 – x²)/x² dx |
| 6 | misconception | 🟢 | ◧ |  | 74w | 13w | Common Mistake: Forgetting the Absolute Value |
| 7 | practice | 🟡 | ◧ |  | 86w | 10w | Tricky Example: ∫ dx / (x² + 4)^{3/2} |
| 8 | 🎛visual_lab | 🟢 | ◧ |  | 92w | 11w | Visualizing the Substitution: Circle and Angle |
| 9 | practice | 🟡 | ⬛⬛ |  | 93w | 8w | Edge Case: ∫ dx / [x² √(x² – 9)] (x > 3) |
| 10 | 🎛visual_lab | 🟢 | ◧ |  | 73w | 9w | Pattern 2 Visual: tan Substitution |
| 11 | 🎛core | 🟢 | ◧ |  | 96w | 10w | The Reference Triangle Method |
| 12 | practice | 🟡 | ⬛⬛ |  | 104w | 15w | Application: Definite Integral with Completing the Square |
| 13 | 🎛visual_lab | 🟡 | ◧ |  | 72w | 11w | Visualizing the Definite Integral: Area of a Quarter Circle |
| 14 | core | 🟢 | ◧ |  | 59w⚠️ | 9w | Summary Table |
| 15 | challenge | 🔴 | ⬛⬛ |  | 76w | 13w | [Challenge – Optional] Why the Restrictions? |
| 16 | summary | 🟢 | ⬛⬛ |  | 78w | 7w | What You Learned |

---

### Slide 1 · [HOOK] 🎛 *[2 controls]*
**Why Trig Substitution?**  ·  `split_left_right`

**On-screen text** `[15w]`
Trig substitution: replace x with a trig function to simplify radicals like √(a² – x²).

**LEFT** `[concept]`

Some integrals with square roots are impossible with algebraic methods alone. Trigonometric substitution rewrites the radical using Pythagorean identities, unlocking the integral.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a semicircle of radius a. Overlay a right triangle with angle θ, opposite x, adjacent √(a² - x²). Show the substitution x = a sin θ as an animation: as θ changes, the triangle updates and the radical simplifies to a cos θ.

*Interactive Controls:*
  - 🎛 Slider for angle θ from 0 to π/2
  - 🎛 Button to animate

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.animation import FuncAnimation; fig, ax = plt.subplots(); ax.set_xlim(-1.5, 1.5); ax.set_ylim(-0.2, 1.2); ax.set_aspect('equal'); theta = 0; line, = ax.plot([], [], 'o-', lw=2); def init(): line.set_data([], []); return line; def update(t): global theta; theta = t; x = np.sin(t); y = np.cos(t); line.set_data([0, x, x, 0], [0, 0, y, 0]); return line; ani = FuncAnimation(fig, update, frames=np.linspace(0, np.pi/2, 30), init_func=init, blit=True); plt.show()
```

**Teacher Narration** `[76w]`
> Have you ever faced an integral with a square root that just won't simplify? That's where trigonometric substitution comes in. It uses the Pythagorean identities to turn messy radicals into clean trig functions. For example, if you set x = a sin θ, then √(a² – x²) becomes a cos θ, which is much easier to integrate. In this lecture, you'll learn the three core patterns and see how this technique unlocks entire families of integrals.

---

### Slide 2 · [CORE]
**The Three Core Patterns**  ·  `split_left_right`

**On-screen text** `[12w]`
Three patterns: sin when –, tan when +, sec when – inside.

**LEFT** `[formula_block]`

**Pattern 1:** √(a² – x²) → $x = a\sin\theta$

**Pattern 2:** √(a² + x²) → $x = a\tan\theta$

**Pattern 3:** √(x² – a²) → $x = a\sec\theta$

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw three right triangles side by side. For pattern1: label opposite x, hypotenuse a, adjacent √(a² – x²). For pattern2: opposite x, adjacent a, hypotenuse √(a² + x²). For pattern3: adjacent a, hypotenuse x, opposite √(x² – a²). Animate highlighting of the radical side.

```python
import matplotlib.pyplot as plt; fig, axes = plt.subplots(1,3, figsize=(10,4)); sides = [([0,1,1,0],[0,0,1,0]), ([0,1,1,0],[0,0,1,0]), ([0,1,1,0],[0,0,1,0])]; labels = [['$x$','$a$','$\sqrt{a^2-x^2}$'],['$x$','$\sqrt{a^2+x^2}$','$a$'],['$\sqrt{x^2-a^2}$','$x$','$a$']]; for i,ax in enumerate(axes): ax.plot(sides[i][0], sides[i][1], 'k-'); ax.text(0.5, -0.1, labels[i][0], ha='center'); ax.text(1.05, 0.5, labels[i][1], va='center'); ax.text(0.5, 1.05, labels[i][2], ha='center'); ax.axis('off'); plt.tight_layout(); plt.show()
```

**Teacher Narration** `[84w]`
> There are exactly three forms that trigger trigonometric substitution. If you see √(a² – x²), use x = a sin θ. If you see √(a² + x²), use x = a tan θ. And if you see √(x² – a²), use x = a sec θ. Each substitution turns the radical into a simple trig function. Notice that the sign inside the square root tells you which identity to apply: minus, plus, or minus again with the variable first. We'll practice each with examples.

---

### Slide 3 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Warm-Up Example: ∫ dx / √(9 – x²)**  ·  `full_width`

**On-screen text** `[13w]`
∫ dx/√(9–x²) → x=3 sin θ → ∫ dθ → arcsin(x/3) + C

**FULL WIDTH** `[steps]`

1. Let $x = 3\sin\theta$, $dx = 3\cos\theta\,d\theta$.
2. √(9–x²) = 3 cos θ.
3. Integral becomes ∫ (3 cos θ dθ) / (3 cos θ) = ∫ dθ = θ + C.
4. Back-substitute: θ = arcsin(x/3).
5. Answer: $\arcsin(x/3) + C$.

**Teacher Narration** `[71w]`
> Let's start with a straightforward example. The radical is √(9 – x²), so a = 3 and we set x = 3 sin θ. Then dx is 3 cos θ dθ and the denominator becomes 3 cos θ. Everything cancels, leaving ∫ dθ, which is θ + C. Finally we replace θ with arcsin(x/3). And that's it — the integral is arcsin(x/3) plus constant. Notice this matches the derivative of arcsin.

**Student Prompt:** Try: ∫ dx/√(16 – x²). What substitution and answer do you expect?

---

### Slide 4 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause & Try: ∫ dx/√(25 – x²)**  ·  `split_left_right`

**On-screen text** `[11w]`
∫ dx/√(25 – x²) → ? → answer: arcsin(x/5) + C

**LEFT** `[text]`

Use the pattern: √(a² – x²) → x = a sin θ. Apply it to ∫ dx/√(25 – x²). Write the substitution, simplify, and find the antiderivative. Then click to reveal answer.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a triangle with angle θ, opposite labeled x, hypotenuse labeled 5, adjacent labeled √(25–x²). Highlight the substitution x = 5 sin θ.

*Interactive Controls:*
  - 🎛 Button: reveal answer

```python
import matplotlib.pyplot as plt; fig, ax = plt.subplots(); ax.plot([0,4,4,0],[0,0,3,0], 'k-'); ax.text(2, -0.3, '$\sqrt{25-x^2}$', ha='center'); ax.text(4.3, 1.5, '$x$'); ax.text(2, 1.8, '$5$'); ax.text(1, 0.2, '$\theta$'); ax.axis('equal'); ax.axis('off'); plt.show()
```

**Teacher Narration** `[100w]`
> Pause the video now and try this integral on your own. Use the pattern we just learned: a is the number under the square root, which here is 5. Set x = 5 sin θ, find dx, simplify the radical, and integrate. Once you have your answer, press the button to check. This exercise reinforces the substitution mechanics and helps you build confidence before moving to more complex examples. The key is to recognize that the radical √(25 – x²) matches pattern 1, so the substitution is x = 5 sin θ, leading to an answer of arcsin(x/5) + C.

**Student Prompt:** Substitute and integrate. Then click to reveal.

---

### Slide 5 · [PRACTICE] 🟡
**Standard Example: ∫ √(9 – x²)/x² dx**  ·  `full_width`

**On-screen text** `[13w]`
∫ √(9–x²)/x² dx → x=3 sin θ → –√(9–x²)/x – arcsin(x/3) + C

**FULL WIDTH** `[steps]`

1. $x = 3\sin\theta$, $dx = 3\cos\theta\,d\theta$, $\sqrt{9-x^2}=3\cos\theta$.
2. Integral → ∫ (3 cos θ)/(9 sin²θ) * 3 cos θ dθ = ∫ cot²θ dθ.
3. $\cot^2\theta = \csc^2\theta - 1$ → $\int(\csc^2\theta-1)d\theta = -\cot\theta - \theta + C$.
4. Triangle: $\cot\theta = \sqrt{9-x^2}/x$, $\theta = \arcsin(x/3)$.
5. Answer: $-\frac{\sqrt{9-x^2}}{x} - \arcsin(x/3) + C$.

**Teacher Narration** `[80w]`
> Now a more typical exam problem. The radical √(9 – x²) tells us to set x = 3 sin θ. After substitution, the integral becomes ∫ cot²θ dθ. Using the identity cot²θ = csc²θ – 1, we integrate to –cot θ – θ + C. To convert back, draw the triangle: sin θ = x/3, so cot θ = adjacent/opposite = √(9–x²)/x. Thus the final answer is –√(9–x²)/x – arcsin(x/3) + C. Notice how the triangle is crucial for back-substitution.

---

### Slide 6 · [MISCONCEPTION]
**Common Mistake: Forgetting the Absolute Value**  ·  `split_left_right`

**On-screen text** `[13w]`
Always check θ range so √(a²–x²) = a cos θ without absolute value.

**LEFT** `[concept]`

**Wrong approach:** When using $x = a\sin\theta$, some students forget the restriction $-\pi/2 \le \theta \le \pi/2$. Without it, $\sqrt{a^2 - x^2} = a|\cos\theta|$, not $a\cos\theta$. The restriction ensures $\cos\theta \ge 0$, so absolute value is unnecessary.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot cos θ from -π to π. Shade region where cos θ ≥ 0, highlight [-π/2, π/2] in green. Show that outside this interval, cos θ is negative and you would need absolute value.

```python
import numpy as np; import matplotlib.pyplot as plt; theta = np.linspace(-np.pi, np.pi, 400); plt.plot(theta, np.cos(theta), 'b-'); plt.axvline(-np.pi/2, color='gray', linestyle='--'); plt.axvline(np.pi/2, color='gray', linestyle='--'); plt.fill_between(theta, 0, np.cos(theta), where=(theta>=-np.pi/2)&(theta<=np.pi/2), alpha=0.3, color='green'); plt.xlabel('θ'); plt.ylabel('cos θ'); plt.ylim(-1.5, 1.5); plt.show()
```

**Teacher Narration** `[74w]`
> Here's a mistake many students make. When you substitute x = a sin θ, the radical becomes √(a² cos²θ) = a|cos θ|. If you don't restrict θ, you get an absolute value that complicates integration. But by choosing θ between –π/2 and π/2, cos θ is nonnegative, so |cos θ| = cos θ. That's why the substitution comes with a domain restriction — it makes the algebra clean. Always state the restriction before substituting.

---

### Slide 7 · [PRACTICE] 🟡
**Tricky Example: ∫ dx / (x² + 4)^{3/2}**  ·  `split_left_right`

**On-screen text** `[10w]`
∫ dx/(x²+4)^{3/2} → x=2 tan θ → x/(4√(x²+4)) + C

**LEFT** `[steps]`

1. $x=2\tan\theta$, $dx=2\sec^2\theta\,d\theta$, $x^2+4=4\sec^2\theta$.
2. $(x^2+4)^{3/2} = 8\sec^3\theta$ (note: $4^{3/2}=8$).
3. Integral = ∫ (2 sec²θ dθ)/(8 sec³θ) = (1/4)∫ cos θ dθ = (1/4) sin θ + C.
4. Triangle: sin θ = x/√(x²+4).
5. Answer: x / (4√(x²+4)) + C.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw right triangle with angle θ, opposite side labeled x, adjacent side labeled 2, hypotenuse labeled √(x²+4). Highlight sin θ = opposite/hypotenuse.

```python
import matplotlib.pyplot as plt; fig, ax = plt.subplots(); ax.plot([0,4,4,0],[0,0,3,0], 'k-'); ax.text(2, -0.3, '$2$', ha='center'); ax.text(4.3, 1.5, '$x$'); ax.text(2, 1.8, '$\sqrt{x^2+4}$'); ax.text(1, 0.2, '$\theta$'); ax.axis('equal'); ax.axis('off'); plt.show()
```

**Teacher Narration** `[86w]`
> This problem is trickier because of the 3/2 power. First, complete the substitution: x = 2 tan θ, so x²+4 = 4 sec²θ. Raising to the 3/2 power gives (4 sec²θ)^(3/2) = 4^(3/2) * sec³θ = 8 sec³θ. That's a common mistake point: 4^(3/2) means square root of 4, then cube — that is 2^3 = 8. After simplifying, the integral reduces to (1/4)∫ cos θ dθ, giving (1/4) sin θ + C. Back-substitute using the triangle, and the answer is x / (4√(x²+4)) + C.

---

### Slide 8 · [VISUAL_LAB] 🎛 *[2 controls]*
**Visualizing the Substitution: Circle and Angle**  ·  `split_left_right`

**On-screen text** `[11w]`
Drag θ to see x and √(a²–x²) change on the circle.

**LEFT** `[concept]`

The substitution $x = a\sin\theta$ maps the interval $[-a, a]$ on the x-axis to $[-\pi/2, \pi/2]$ on the $\theta$-axis. The radical $\sqrt{a^2 - x^2}$ becomes $a\cos\theta$, the y-coordinate on the circle.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a circle of radius a. Draw radius at angle θ. Show point on circle: (a cos θ, a sin θ) but labeled as (√(a²-x²), x). Display corresponding x and radical value. Slider for θ updates the point and labels.

*Interactive Controls:*
  - 🎛 Slider for θ from -π/2 to π/2
  - 🎛 Display: current x and √(a²-x²)

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider; a=3; fig, ax = plt.subplots(); plt.subplots_adjust(bottom=0.2); theta0 = 0; ax.plot(np.cos(np.linspace(0,2*np.pi,400))*a, np.sin(np.linspace(0,2*np.pi,400))*a, 'b-'); point, = ax.plot([0, a*np.cos(theta0)], [0, a*np.sin(theta0)], 'ro-'); ax.set_xlim(-a-1, a+1); ax.set_ylim(-a-1, a+1); ax.set_aspect('equal'); axhline = ax.axhline(0, color='gray'); axvline = ax.axvline(0, color='gray'); ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03]); slider = Slider(ax_slider, 'θ', -np.pi/2, np.pi/2, valinit=theta0); def update(val): theta = slider.val; x = a*np.sin(theta); rad = a*np.cos(theta); point.set_data([0, rad], [0, x]); ax.set_title(f'x = {x:.2f}, √(a²-x²) = {rad:.2f}'); fig.canvas.draw_idle(); slider.on_changed(update); plt.show()
```

**Teacher Narration** `[92w]`
> This interactive visual shows the geometric meaning of the x = a sin θ substitution. The variable θ corresponds to an angle on a circle of radius a. The x-coordinate of the point is a sin θ, and the y-coordinate is a cos θ, which exactly equals √(a² – x²). As you drag the slider from –π/2 to π/2, watch how x and the radical change. Notice that at θ = 0, x = 0 and the radical is a; at θ = π/2, x = a and the radical is 0.

**Student Prompt:** What happens to √(a²–x²) when θ = π/2?

---

### Slide 9 · [PRACTICE] 🟡
**Edge Case: ∫ dx / [x² √(x² – 9)] (x > 3)**  ·  `full_width`

**On-screen text** `[8w]`
∫ dx/(x²√(x²–9)) for x>3 → √(x²–9)/(9x) + C

**FULL WIDTH** `[steps]`

1. $x=3\sec\theta$, $dx=3\sec\theta\tan\theta\,d\theta$, $\sqrt{x^2-9}=3\tan\theta$.
2. Integral = ∫ (3 secθ tanθ dθ) / (9 sec²θ * 3 tanθ) = (1/9)∫ cosθ dθ = (1/9) sinθ + C.
3. Triangle: secθ = x/3 → sinθ = √(x²–9)/x.
4. Answer: √(x²–9)/(9x) + C.

**Teacher Narration** `[93w]`
> This edge case uses the third pattern: √(x² – a²) with a = 3. Because x > 3, we use the interval where sec θ ≥ 1, which is 0 ≤ θ < π/2. After substitution, many factors cancel, leaving (1/9)∫ cos θ dθ. Back-substitute using the triangle: sec θ = x/3, so cos θ = 3/x, but we need sin θ. From the triangle, sin θ = √(x² – 9)/x. The final answer is √(x² – 9)/(9x) + C. Notice how the domain condition ensured all square roots simplified without absolute values.

---

### Slide 10 · [VISUAL_LAB] 🎛 *[2 controls]*
**Pattern 2 Visual: tan Substitution**  ·  `split_left_right`

**On-screen text** `[9w]`
Drag x to see the triangle update for √(a²+x²).

**LEFT** `[concept]`

For $x = a\tan\theta$, the radical $\sqrt{a^2 + x^2}$ becomes $a\sec\theta$. The relationship comes from $1+\tan^2\theta = \sec^2\theta$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a right triangle with angle θ, opposite side labeled x, adjacent side labeled a, hypotenuse labeled √(a²+x²). Add a slider that changes x, which updates the triangle and the value of θ. Show the trigonometric ratios.

*Interactive Controls:*
  - 🎛 Slider for x from 0.1 to 5
  - 🎛 Display: current hypotenuse length

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider; a=3; fig, ax = plt.subplots(); plt.subplots_adjust(bottom=0.2); x0=2; line, = ax.plot([0,4,4,0],[0,0,3,0], 'k-'); ax.text(2, -0.3, '$a$', ha='center'); ax.text(4.3, 1.5, '$x$'); ax.text(2, 1.8, '$\sqrt{a^2+x^2}$'); ax.text(1, 0.2, '$\theta$'); ax.axis('equal'); ax.axis('off'); ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03]); slider = Slider(ax_slider, 'x', 0.1, 5, valinit=x0); def update(val): x = slider.val; hyp = np.sqrt(a*a + x*x); # redraw triangle with new vertices line.set_data([0, hyp, hyp, 0], [0, 0, x, 0]); ax.texts = []; ax.text(2, -0.3, f'$a$', ha='center'); ax.text(hyp+0.3, x/2, f'$x={x:.2f}$'); ax.text(hyp/2, x/2+0.3, f'$\sqrt{{a^2+x^2}}={hyp:.2f}$'); ax.text(1, 0.2, f'$\theta$'); fig.canvas.draw_idle(); slider.on_changed(update); plt.show()
```

**Teacher Narration** `[73w]`
> Now let's visualize the tan substitution pattern. Here, x = a tan θ. The radical √(a² + x²) becomes the hypotenuse of a right triangle with legs a and x. As you drag the slider to change x, the triangle scales and the angle θ adjusts. Notice that the hypotenuse is always √(a² + x²), which equals a sec θ. This triangle is your go-to tool for converting back from θ to x.

**Student Prompt:** What is sec θ in terms of a and x?

---

### Slide 11 · [CORE] 🎛 *[3 controls]*
**The Reference Triangle Method**  ·  `split_left_right`

**On-screen text** `[10w]`
Use a triangle to convert trig functions back to x.

**LEFT** `[concept]`

After integrating in θ, convert back to x using a right triangle. Label the sides according to the substitution: for $x = a\sin\theta$, opposite = x, hypotenuse = a, adjacent = √(a² – x²). Then read off any trig function of θ.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a right triangle with angle θ. Have three buttons: 'Pattern 1', 'Pattern 2', 'Pattern 3'. Clicking each updates the side labels and the expression for sin, cos, tan in terms of x and a.

*Interactive Controls:*
  - 🎛 Button: Pattern 1
  - 🎛 Button: Pattern 2
  - 🎛 Button: Pattern 3

```python
import matplotlib.pyplot as plt; from matplotlib.widgets import Button; fig, ax = plt.subplots(); ax.plot([0,4,4,0],[0,0,3,0], 'k-'); ax.text(2, -0.3, '?', ha='center'); ax.text(4.3, 1.5, '?'); ax.text(2, 1.8, '?'); ax.text(1, 0.2, '$\theta$'); ax.axis('equal'); ax.axis('off'); def set_pattern(p): if p==1: ax.texts[0].set_text('$\sqrt{a^2-x^2}$'); ax.texts[1].set_text('$x$'); ax.texts[2].set_text('$a$'); elif p==2: ax.texts[0].set_text('$a$'); ax.texts[1].set_text('$x$'); ax.texts[2].set_text('$\sqrt{a^2+x^2}$'); elif p==3: ax.texts[0].set_text('$a$'); ax.texts[1].set_text('$\sqrt{x^2-a^2}$'); ax.texts[2].set_text('$x$'); fig.canvas.draw_idle(); ax_button1 = plt.axes([0.1, 0.05, 0.2, 0.05]); btn1 = Button(ax_button1, 'Pattern 1'); btn1.on_clicked(lambda e: set_pattern(1)); ax_button2 = plt.axes([0.35, 0.05, 0.2, 0.05]); btn2 = Button(ax_button2, 'Pattern 2'); btn2.on_clicked(lambda e: set_pattern(2)); ax_button3 = plt.axes([0.6, 0.05, 0.2, 0.05]); btn3 = Button(ax_button3, 'Pattern 3'); btn3.on_clicked(lambda e: set_pattern(3)); plt.show()
```

**Teacher Narration** `[96w]`
> After substitution and integration, you'll have an answer in terms of θ, but you need it in terms of x. The fastest way is to draw a right triangle based on your substitution. For example, if you used x = a sin θ, label the opposite side as x and the hypotenuse as a. Then the adjacent side is √(a² – x²). Now you can read off any trig ratio: sin θ = x/a, cos θ = √(a² – x²)/a, tan θ = x/√(a² – x²). Click the buttons to see the triangle for each pattern.

---

### Slide 12 · [PRACTICE] 🟡
**Application: Definite Integral with Completing the Square**  ·  `full_width`

**On-screen text** `[15w]`
∫₀² √(4x–x²) dx → complete square → u = x–2 → sin sub → π

**FULL WIDTH** `[steps]`

Evaluate $\int_0^2 \sqrt{4x - x^2}\,dx$
1. Complete square: $4x - x^2 = 4 - (x-2)^2$.
2. Let $u = x-2$, limits: u from -2 to 0. Integral = $\int_{-2}^0 \sqrt{4-u^2}\,du$.
3. $u=2\sin\theta$, $du=2\cos\theta\,d\theta$, limits: θ from -π/2 to 0.
4. Integral = $4\int_{-\pi/2}^0 \cos^2\theta\,d\theta = 2\int_{-\pi/2}^0 (1+\cos2\theta)d\theta$.
5. = $2[\theta + \frac12\sin2\theta]_{-\pi/2}^0 = \pi$.

**Teacher Narration** `[104w]`
> This definite integral combines completing the square with trig substitution. First, rewrite 4x – x² as 4 – (x – 2)², then let u = x – 2. Now the integral is from u = –2 to 0 of √(4 – u²) du, which matches pattern 1 with a = 2. Substituting u = 2 sin θ changes the limits: when u = –2, θ = –π/2; when u = 0, θ = 0. The integral becomes 4∫ cos²θ dθ from –π/2 to 0. Using the half-angle identity, we integrate and get π. Notice how completing the square was necessary to see the pattern.

---

### Slide 13 · [VISUAL_LAB] 🟡 🎛 *[1 controls]*
**Visualizing the Definite Integral: Area of a Quarter Circle**  ·  `split_left_right`

**On-screen text** `[11w]`
∫₀² √(4x – x²) dx = area under circle = π

**LEFT** `[concept]`

The integral $\int_0^2 \sqrt{4x - x^2}\,dx$ represents the area of a quarter circle of radius 2. After completing the square, it becomes $\int_{-2}^0 \sqrt{4-u^2}\,du$, which is a quarter circle area $= \pi$.

**RIGHT** `[visual_spec]`

*Visual Spec:* First plot f(x)=√(4x-x²) from 0 to 2, shade area under curve. Then show the shifted function g(u)=√(4-u²) from -2 to 0. Finally show that this is a quarter circle of radius 2, and compute the area as π/4 * 4? Actually quarter circle area = (1/4)*π*4 = π. Overlay the circle.

*Interactive Controls:*
  - 🎛 Button: show circle overlay

```python
import numpy as np; import matplotlib.pyplot as plt; x = np.linspace(0,2,400); y = np.sqrt(4*x - x**2); fig, (ax1, ax2) = plt.subplots(1,2, figsize=(10,4)); ax1.plot(x, y, 'b-'); ax1.fill_between(x, 0, y, alpha=0.3); ax1.set_title('Original'); u = np.linspace(-2,0,400); v = np.sqrt(4 - u**2); ax2.plot(u, v, 'b-'); ax2.fill_between(u, 0, v, alpha=0.3); ax2.set_title('Shifted'); plt.tight_layout(); plt.show()
```

**Teacher Narration** `[72w]`
> This visual shows why the definite integral equals π. The original function √(4x – x²) is the top half of a circle shifted to the right. After completing the square and shifting, we get the familiar quarter circle of radius 2 from u = –2 to 0. The area of that quarter circle is (1/4)π(2)² = π. So trigonometric substitution not only computes the integral but also reveals the geometry behind it.

**Student Prompt:** What is the geometric shape of √(4x – x²)?

---

### Slide 14 · [CORE]
**Summary Table**  ·  `split_left_right`

**On-screen text** `[9w]`
Three patterns: sin, tan, sec. Always draw the triangle.

**LEFT** `[formula_block]`

| Radical | Substitution | dx | Simplified |
|---------|-------------|----|------------|
| √(a²–x²) | x=a sinθ | a cosθ dθ | a cosθ |
| √(a²+x²) | x=a tanθ | a sec²θ dθ | a secθ |
| √(x²–a²) | x=a secθ | a secθ tanθ dθ | a tanθ |

**RIGHT** `[visual_spec]`

*Visual Spec:* Three mini triangles arranged vertically, each representing one pattern, with sides labeled in terms of a and x.

**Teacher Narration** `[59w ⚠️ **TOO SHORT: 59w < 60w min**]`
> Here's a quick reference table. For √(a² – x²) use sin, for √(a² + x²) use tan, for √(x² – a²) use sec. The differential dx and simplified radical are shown in the table. Memorize these three substitutions — they are the key to solving these integrals. And remember, the triangle is always there to help you convert back.

---

### Slide 15 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Why the Restrictions?**  ·  `full_width`

**On-screen text** `[13w]`
Restrictions avoid absolute values. Each pattern chooses where the trig function is positive.

**FULL WIDTH** `[concept]`

The restrictions on θ ensure the square root simplifies without absolute values. For $x = a\sin\theta$ on $[-\pi/2,\pi/2]$, $\cos\theta \ge 0$. For $x = a\tan\theta$ on $(-\pi/2,\pi/2)$, $\sec\theta > 0$. For $x = a\sec\theta$ on $[0,\pi/2)$, $\tan\theta \ge 0$.

**Teacher Narration** `[76w]`
> Why do we restrict θ? Suppose you used x = a sin θ without restriction. Then √(a²–x²) = a|cos θ|, which splits the integral into cases. By choosing θ in the range where cos θ ≥ 0, we avoid that. Similarly, for tan substitution we need sec θ positive, and for sec substitution we need tan θ positive. These restrictions are part of the substitution, not an afterthought. Understanding this deepens your grasp of the method.

---

### Slide 16 · [SUMMARY]
**What You Learned**  ·  `full_width`

**On-screen text** `[7w]`
Trig substitution: three patterns, triangle back-substitution, practice!

**FULL WIDTH** `[concept]`

**Learning Objectives Check:**
- Identify the correct substitution from the radical form.
- Execute substitutions with dx and simplification.
- Use reference triangles to convert back to x.
- Handle definite integrals with limit changes.
- Avoid mistakes (absolute value, exponent arithmetic).

**Teacher Narration** `[78w]`
> Congratulations! You now understand trigonometric substitution. You can identify which pattern to use based on the radical, perform the substitution, simplify using identities, and convert back using a reference triangle. You've also seen how to handle definite integrals and common pitfalls. Practice with different examples to solidify your skill. Remember: when in doubt, draw the triangle. This technique is a powerful tool for integrals involving square roots, and mastering it will serve you well in calculus and beyond.

---
