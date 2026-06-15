# Trigonometry and Graphing Review

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 88%

> **Prerequisite:** Familiarity with right triangle trigonometry (SOH-CAH-TOA) and radian measure.

**Learning Objectives:**
- Evaluate trigonometric functions for any angle using reference angles and ASTC
- Graph sine, cosine, and tangent functions with transformations (amplitude, period, phase shift)
- Apply the unit circle to determine exact values of trig functions at special angles
- Analyze periodic behavior and symmetry properties of trigonometric functions
- Interpret trigonometric models for real-world periodic phenomena

---

## v3.1 Production Readiness

✅ **Interactive moments:** 4 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 73w)
⚠️ **Narration too short (<60w):** [9]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s9:58w']
✅ **visual_specs**: all split slides have visual_spec
❌ **field_completeness**: incomplete: ["s16: ['right']"]
✅ **interactive_moments**: 4 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ |  | 88w | 13w | The Ferris Wheel Metaphor |
| 2 | core | 🟢 | ◧ |  | 79w | 13w | Unit Circle Definitions |
| 3 | core | 🟢 | ◧ |  | 74w | 15w | Quadrant Signs (ASTC) |
| 4 | core | 🟢 | ◧ |  | 62w | 11w | Reciprocal Identities |
| 5 | core | 🟢 | ⬛⬛ |  | 72w | 13w | Pythagorean Identity – Proof |
| 6 | core | 🟢 | ◧ |  | 73w | 10w | Periodicity |
| 7 | core | 🟢 | ◧ |  | 62w | 10w | Even/Odd Properties |
| 8 | 🎛core | 🟢 | ◧ |  | 78w | 14w | Graphing Transformations |
| 9 | practice | 🟢 | ◧ |  | 58w⚠️ | 3w | Warm‑Up Example: Exact Values at π/3 |
| 10 | practice | 🟢 | ◧ |  | 73w | 13w | Standard Example: Using Reference Angle & ASTC |
| 11 | practice | 🟡 | ◧ |  | 71w | 10w | Tricky Example: Given Sine and Quadrant |
| 12 | misconception | 🟢 | ⬛⬛ |  | 74w | 12w | Common Mistake: Forgetting the Sign |
| 13 | challenge | 🔴 | ◧ |  | 74w | 6w | [Challenge – Optional] Deriving Tangent Period |
| 14 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 66w | 9w | Pause and Try: Predict the Phase Shift |
| 15 | 🎛visual_lab | 🟢 | ◧ |  | 78w | 11w | Interactive Lab: Ferris Wheel Simulation |
| 16 | summary | 🟢 | ⬛⬛ |  | 87w | 10w | Lecture Summary |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**The Ferris Wheel Metaphor**  ·  `split_left_right`

**On-screen text** `[13w]`
A Ferris wheel car's height follows a sine wave; horizontal distance follows cosine.

**LEFT** `[text]`

A Ferris wheel car's height over time follows a smooth up-and-down pattern — that's the **sine function**. The horizontal distance follows **cosine**.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a unit circle on the left half and a graph of sine (red) and cosine (blue) on the right half. Animate a point moving along the circle; its y-coordinate traces the sine wave, x-coordinate traces the cosine wave. Include a slider for angle θ from 0 to 2π. Use matplotlib widgets.Slider. Label axes: θ (radians) on graph x-axis, value on y-axis. Highlight the current point on the circle and the corresponding points on the waves.

*Interactive Controls:*
  - 🎛 Slider for θ from 0 to 2π

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

theta = np.linspace(0, 2*np.pi, 500)
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4), gridspec_kw={'width_ratios': [1, 1]})
plt.subplots_adjust(bottom=0.25)

# Unit circle
ax1.plot(np.cos(theta), np.sin(theta), 'k-', lw=1)
ax1.axhline(0, color='gray', lw=0.5)
ax1.axvline(0, color='gray', lw=0.5)
ax1.set_aspect('equal')
ax1.set_xlim(-1.2, 1.2)
ax1.set_ylim(-1.2, 1.2)
ax1.set_title('Unit Circle')
point, = ax1.plot([], [], 'ro', markersize=8)

# Graphs
ax2.plot(theta, np.sin(theta), 'r-', lw=2, label='sin(θ)')
ax2.plot(theta, np.cos(theta), 'b-', lw=2, label='cos(θ)')
ax2.axhline(0, color='gray', lw=0.5)
ax2.set_xlim(0, 2*np.pi)
ax2.set_ylim(-1.2, 1.2)
ax2.set_xlabel('θ (radians)')
ax2.set_ylabel('Value')
ax2.legend()
ax2.grid(True, alpha=0.3)
sin_dot, = ax2.plot([], [], 'ro', markersize=6)
cos_dot, = ax2.plot([], [], 'bo', markersize=6)

# Slider
ax_slider = plt.axes([0.25, 0.1, 0.5, 0.03])
slider = Slider(ax_slider, 'θ', 0, 2*np.pi, valinit=0)

def update(val):
    ang = slider.val
    x = np.cos(ang)
    y = np.sin(ang)
    point.set_data([x], [y])
    sin_dot.set_data([ang], [np.sin(ang)])
    cos_dot.set_data([ang], [np.cos(ang)])
    fig.canvas.draw_idle()

slider.on_changed(update)
update(0)
plt.show()
```

**Teacher Narration** `[88w]`
> Imagine you're on a Ferris wheel. As the wheel rotates, your height above the ground goes up and down smoothly. That up‑and‑down motion over time is exactly what the sine function describes. Your horizontal distance from the center also oscillates, but with a phase shift — that's the cosine. In this lecture we'll explore the mathematics behind these patterns, using the unit circle as our Ferris wheel. By the end you'll be able to evaluate any trig function, graph transformations, and see the beautiful symmetry of these functions.

**Student Prompt:** As you drag the slider, notice how the point on the unit circle corresponds to the height and horizontal distance at the same angle.

---

### Slide 2 · [CORE]
**Unit Circle Definitions**  ·  `split_left_right`

**On-screen text** `[13w]`
$\sin\theta = y$, $\cos\theta = x$, $\tan\theta = \frac{\sin\theta}{\cos\theta}$ on the unit circle.

**LEFT** `[concept]`

For angle $\theta$ in standard position, let the terminal side intersect the unit circle at $(x, y)$. Then:

$$\sin \theta = y, \quad \cos \theta = x, \quad \tan \theta = \frac{y}{x} = \frac{\sin \theta}{\cos \theta}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot unit circle with radius 1 centered at origin. Show an angle θ from positive x-axis (0 to π/2 for a first-quadrant example). Mark the point where the terminal side hits the circle. Draw a vertical dashed line from point to x-axis to show y = sinθ, and horizontal dashed line to y-axis to show x = cosθ. Label the point as (cosθ, sinθ). Include angle arc and label θ. Use different colors for sine (red) and cosine (blue). Show axes and grid. Indicate the quadrant if θ is within a quadrant.

**Teacher Narration** `[79w]`
> This is the core definition. Instead of relying on right triangles, we place the angle on the unit circle. The coordinates of the intersection point are exactly the sine and cosine. Sine is the y-coordinate, cosine the x-coordinate. Tangent is their ratio. This definition works for any angle, even beyond 90 degrees or negative angles. Notice that the radius is 1, so the hypotenuse of any right triangle formed is always 1. That's why the Pythagorean identity follows directly.

---

### Slide 3 · [CORE]
**Quadrant Signs (ASTC)**  ·  `split_left_right`

**On-screen text** `[15w]`
ASTC: All Students Take Calculus – tells which trig functions are positive in each quadrant.

**LEFT** `[text]`

Memorize: **A**ll **S**tudents **T**ake **C**alculus

- Quad I: All positive
- Quad II: Sine positive
- Quad III: Tangent positive
- Quad IV: Cosine positive

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a unit circle divided into four quadrants with shaded colors. In each quadrant, write the functions that are positive: Quad I: 'sin, cos, tan'; Quad II: 'sin'; Quad III: 'tan'; Quad IV: 'cos'. Label the quadrants with roman numerals and angle ranges (0 to π/2, etc.). Use a clear color scheme: green for all positive (Q1), yellow for sine only, orange for tangent only, blue for cosine only. Show the axes and grid lightly.

**Teacher Narration** `[74w]`
> Now that we know the definitions, we need to know the sign of each function in different quadrants. The acronym ASTC helps you remember: first quadrant all positive, second only sine, third only tangent, fourth only cosine. This is crucial when you're given a quadrant condition — it determines the sign of your answer. For example, if an angle is in quadrant III, sine and cosine are negative, so tangent (their ratio) is positive.

---

### Slide 4 · [CORE]
**Reciprocal Identities**  ·  `split_left_right`

**On-screen text** `[11w]`
Cosecant, secant, and cotangent are reciprocals of sine, cosine, and tangent.

**LEFT** `[formula_block]`

$$\csc \theta = \frac{1}{\sin \theta}, \quad \sec \theta = \frac{1}{\cos \theta}, \quad \cot \theta = \frac{1}{\tan \theta} = \frac{\cos \theta}{\sin \theta}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a right triangle with angle θ at the origin. Label opposite, adjacent, hypotenuse. Show how sin = opp/hyp, csc = hyp/opp, etc. Use arrows to indicate reciprocal pairs. Keep it simple; maybe a circular diagram with six trig functions arranged in reciprocal pairs: sin-csc, cos-sec, tan-cot. Use colors to pair them.

**Teacher Narration** `[62w]`
> Don't let the names confuse you. Cosecant is just one over sine, secant is one over cosine, and cotangent is one over tangent. They're often used in calculus and in simplifying trigonometric expressions. Note that these functions are undefined whenever the denominator is zero — so secant is undefined when cosine is zero, which happens at odd multiples of π over 2.

---

### Slide 5 · [CORE]
**Pythagorean Identity – Proof**  ·  `full_width`

**On-screen text** `[13w]`
$\sin^2\theta + \cos^2\theta = 1$ – follows directly from the unit circle equation.

**FULL WIDTH** `[text]`

$$\sin^2 \theta + \cos^2 \theta = 1$$

**Proof:**
1. On unit circle, $x^2 + y^2 = 1$.
2. Let $(\cos\theta, \sin\theta)$ be the point.
3. Substitute: $\cos^2\theta + \sin^2\theta = 1$.

**Teacher Narration** `[72w]`
> This is the most important trigonometric identity. It's a direct consequence of the Pythagorean theorem applied to the unit circle. Any point on the unit circle has coordinates (cosθ, sinθ), and since it's distance 1 from the origin, the squares sum to 1. This identity is always true, for any angle. It allows us to find cosine from sine and vice versa, as long as we know the quadrant for the sign.

---

### Slide 6 · [CORE]
**Periodicity**  ·  `split_left_right`

**On-screen text** `[10w]`
Sine and cosine repeat every $2\pi$; tangent repeats every $\pi$.

**LEFT** `[formula_block]`

$$\sin(\theta + 2\pi) = \sin\theta, \quad \cos(\theta + 2\pi) = \cos\theta, \quad \tan(\theta + \pi) = \tan\theta$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two subplots stacked. Top: sine wave from -2π to 4π, highlight one period of length 2π in a different color. Bottom: tangent function from -2π to 4π, highlight period of length π. Mark vertical asymptotes for tangent with dashed lines. Show key points at multiples of π/2. Label axes and periods.

**Teacher Narration** `[73w]`
> Periodicity is what makes trig functions so useful for modeling cycles. If you add 2π to an angle, you've gone one full revolution around the circle, so sine and cosine repeat. Tangent, however, repeats twice as often – every π radians. This is because tan = sin/cos, and both sin and cos change sign after π, so their ratio remains the same. Always remember: tangent's period is half that of sine and cosine.

---

### Slide 7 · [CORE]
**Even/Odd Properties**  ·  `split_left_right`

**On-screen text** `[10w]`
Sine and tangent are odd, cosine is even. $\sin(-\theta)=-\sin\theta$, $\cos(-\theta)=\cos\theta$.

**LEFT** `[formula_block]`

$$\sin(-\theta) = -\sin\theta, \quad \cos(-\theta) = \cos\theta, \quad \tan(-\theta) = -\tan\theta$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot sine (red) and cosine (blue) from -2π to 2π. Overlay a vertical line at x=0 to show symmetry. For sine, show that the graph is symmetric about the origin (odd function). For cosine, show symmetry about the y-axis (even). Mark a point at θ and -θ to illustrate the property. Use arrows or dashed lines.

**Teacher Narration** `[62w]`
> These symmetry properties are very useful. If you need the sine of a negative angle, it's just the negative of the sine of the positive angle. Cosine of a negative angle is the same as cosine of the positive angle. Tangent inherits oddness from sine. These properties help simplify expressions and also show up in physics when dealing with waves and oscillations.

---

### Slide 8 · [CORE] 🎛 *[4 controls]*
**Graphing Transformations**  ·  `split_left_right`

**On-screen text** `[14w]`
Amplitude = |A|, Period = 2π/|B|, Phase shift = -C/B, Vertical shift = D.

**LEFT** `[formula_block]`

For $y = A\sin(Bx + C) + D$:
- Amplitude $= |A|$
- Period $= \frac{2\pi}{|B|}$
- Phase shift $= -\frac{C}{B}$
- Vertical shift $= D$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a sine wave. Add four sliders: Amplitude (A from -3 to 3), B (0.5 to 4), C (-π to π), D (-3 to 3). The graph updates in real time. Show the parent function y=sin(x) as a dashed gray line for comparison. Label the current period and amplitude on the graph. Use matplotlib widgets.Slider. Title: 'y = A sin(Bx + C) + D'.

*Interactive Controls:*
  - 🎛 Slider for amplitude A from -3 to 3
  - 🎛 Slider for B from 0.5 to 4
  - 🎛 Slider for phase shift C from -π to π
  - 🎛 Slider for vertical shift D from -3 to 3

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

x = np.linspace(-2*np.pi, 2*np.pi, 500)
fig, ax = plt.subplots(figsize=(8,4))
plt.subplots_adjust(bottom=0.3)

parent, = ax.plot(x, np.sin(x), '--', color='gray', alpha=0.5, label='sin(x)')
transformed, = ax.plot(x, np.sin(x), 'r-', lw=2, label='transformed')
ax.set_ylim(-4,4)
ax.axhline(0, color='k', lw=0.5)
ax.grid(True, alpha=0.3)
ax.legend(loc='upper right')
ax.set_title('y = A sin(Bx + C) + D')

# Sliders
ax_A = plt.axes([0.25, 0.2, 0.5, 0.03])
ax_B = plt.axes([0.25, 0.15, 0.5, 0.03])
ax_C = plt.axes([0.25, 0.1, 0.5, 0.03])
ax_D = plt.axes([0.25, 0.05, 0.5, 0.03])
sl_A = Slider(ax_A, 'A', -3, 3, valinit=1)
sl_B = Slider(ax_B, 'B', 0.5, 4, valinit=1)
sl_C = Slider(ax_C, 'C', -np.pi, np.pi, valinit=0)
sl_D = Slider(ax_D, 'D', -3, 3, valinit=0)

def update(val):
    A = sl_A.val
    B = sl_B.val
    C = sl_C.val
    D = sl_D.val
    y = A * np.sin(B * x + C) + D
    transformed.set_ydata(y)
    ax.set_ylim(-4,4)
    fig.canvas.draw_idle()

sl_A.on_changed(update)
sl_B.on_changed(update)
sl_C.on_changed(update)
sl_D.on_changed(update)
plt.show()
```

**Teacher Narration** `[78w]`
> Now we combine everything to graph transformed sine and cosine functions. The amplitude stretches the wave vertically, the period changes how many cycles fit in a unit interval, the phase shift moves it left or right, and the vertical shift moves it up or down. Important: phase shift is -C/B, not just C/B. A positive C inside the function actually shifts the graph to the left. Practice with the sliders to see how each parameter affects the graph.

**Student Prompt:** Try setting A negative. What happens to the graph?

---

### Slide 9 · [PRACTICE]
**Warm‑Up Example: Exact Values at π/3**  ·  `split_left_right`

**On-screen text** `[3w]`
$\sin(\pi/3)=\frac{\sqrt{3}}{2},\ \cos(\pi/3)=\frac12,\ \tan(\pi/3)=\sqrt{3}$.

**LEFT** `[steps]`

Find $\sin(\pi/3)$, $\cos(\pi/3)$, $\tan(\pi/3)$.

1. Recall the point on unit circle at $\pi/3$: $(\frac{1}{2}, \frac{\sqrt{3}}{2})$.
2. $\sin = y = \frac{\sqrt{3}}{2}$.
3. $\cos = x = \frac{1}{2}$.
4. $\tan = \frac{\sin}{\cos} = \sqrt{3}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Unit circle with angle π/3 (60°) shown. Mark the point (1/2, √3/2). Draw the right triangle inside the circle with sides labeled. Indicate the coordinates. Color the point red. Show the angle arc with label 'π/3'. Include axes with labels.

**Teacher Narration** `[58w ⚠️ **TOO SHORT: 58w < 60w min**]`
> Let's work through a warm‑up example. The angle π/3 corresponds to 60°. On the unit circle, the coordinates are well‑known: x = 1/2, y = √3/2. So sine is √3/2, cosine is 1/2, and tangent is √3. This comes from a 30‑60‑90 triangle. Memorizing these special angles (0, π/6, π/4, π/3, π/2) will speed up your work tremendously.

**Student Prompt:** What are the exact values for π/4? Try it mentally.

---

### Slide 10 · [PRACTICE]
**Standard Example: Using Reference Angle & ASTC**  ·  `split_left_right`

**On-screen text** `[13w]`
$5\pi/3$ in QIV → reference $\pi/3$. Signs: sin negative, cos positive, tan negative.

**LEFT** `[steps]`

Find $\sin(5\pi/3)$, $\cos(5\pi/3)$, $\tan(5\pi/3)$.

1. Quadrant: $5\pi/3$ is in QIV.
2. Reference angle: $2\pi - 5\pi/3 = \pi/3$.
3. Apply signs: sine negative, cosine positive, tangent negative.
4. Values: $\sin = -\frac{\sqrt{3}}{2}$, $\cos = \frac12$, $\tan = -\sqrt{3}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Unit circle showing angle 5π/3 (300°). Draw the reference angle π/3 as an acute angle to the x-axis. Indicate the quadrant IV. Label the reference angle. Show the reference triangle inside the circle. Mark the point coordinates (1/2, -√3/2). Highlight the negative y-coordinate. Use colors to differentiate.

**Teacher Narration** `[73w]`
> This is a classic problem that combines two powerful techniques. First find the quadrant: 5π/3 is between 3π/2 and 2π, so it's quadrant IV. The reference angle is the acute distance to the x-axis: 2π minus 5π/3 gives π/3. Now use the exact values from the previous example, but adjust signs using ASTC. In quadrant IV, only cosine is positive, so sine is negative and tangent is negative. That gives us the answers.

---

### Slide 11 · [PRACTICE] 🟡
**Tricky Example: Given Sine and Quadrant**  ·  `split_left_right`

**On-screen text** `[10w]`
Given $\sin\theta=-2/7$ in QIII. $\cos\theta = -3\sqrt{5}/7$, $\tan\theta = 2\sqrt{5}/15$.

**LEFT** `[steps]`

Given $\sin\theta = -\frac{2}{7}$, $\theta$ in QIII. Find $\cos\theta$ and $\tan\theta$.

1. Use $\sin^2\theta + \cos^2\theta = 1$.
2. $\cos^2\theta = 1 - \frac{4}{49} = \frac{45}{49}$.
3. $\cos\theta = \pm\frac{3\sqrt{5}}{7}$.
4. In QIII, cosine is negative → $\cos\theta = -\frac{3\sqrt{5}}{7}$.
5. $\tan\theta = \frac{\sin\theta}{\cos\theta} = \frac{-2/7}{-3\sqrt{5}/7} = \frac{2}{3\sqrt{5}} = \frac{2}{3\sqrt{5}} \cdot \frac{\sqrt{5}}{\sqrt{5}} = \frac{2\sqrt{5}}{15}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a unit circle with a generic angle in quadrant III. Draw a right triangle with vertical side of length 2/7 (since sin = -2/7, but absolute value). Label the opposite side as 2/7. Use Pythagorean theorem to find adjacent: sqrt(45)/7. Show that both sides are negative in QIII. Mark the point coordinates as (-(3√5)/7, -2/7).

**Teacher Narration** `[71w]`
> Here we need to find cosine from sine using the Pythagorean identity. Squaring gives 4/49, so cos²θ is 45/49. Taking square root gives ±3√5/7. But we must use the quadrant: quadrant III has both sine and cosine negative. So cosine is negative. Then tangent, being sine over cosine, becomes positive because a negative divided by a negative is positive. This is a classic pitfall: forgetting the sign of the square root.

---

### Slide 12 · [MISCONCEPTION]
**Common Mistake: Forgetting the Sign**  ·  `full_width`

**On-screen text** `[12w]`
Never forget: $\sqrt{x^2} = |x|$ — the sign depends on the quadrant.

**FULL WIDTH** `[text]`

**Wrong approach:** Take $\cos\theta = \sqrt{\frac{45}{49}} = \frac{3\sqrt{5}}{7}$ (positive).

**Why it's wrong:** In QIII, cosine is negative. The square root gives a positive number, but the coordinate value must reflect the quadrant.

**Correct:** Use $\pm$ and choose the sign based on ASTC.

**Teacher Narration** `[74w]`
> A very common mistake is to take the positive square root of cos²θ and forget the sign. Remember that the square root of a number is defined as the nonnegative root, but the actual cosine value can be negative. Always write $\cos\theta = \pm \sqrt{1-\sin^2\theta}$ and then use the quadrant to decide the sign. This is true for any identity that involves a square root. The same caution applies when finding sine from cosine.

**Student Prompt:** Why is cosine negative in quadrant III? Look at the unit circle.

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Deriving Tangent Period**  ·  `split_left_right`

**On-screen text** `[6w]`
Proof: $\tan(\theta+\pi) = \frac{-\sin\theta}{-\cos\theta} = \tan\theta$.

**LEFT** `[text]`

Prove: $\tan(\theta+\pi) = \tan\theta$ for all $\theta$ where defined.

$$\tan(\theta+\pi) = \frac{\sin(\theta+\pi)}{\cos(\theta+\pi)} = \frac{-\sin\theta}{-\cos\theta} = \tan\theta$$

Uses: $\sin(\theta+\pi) = -\sin\theta$, $\cos(\theta+\pi) = -\cos\theta$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Left: unit circle with two angles: θ in QI (small acute) and θ+π in QIII. Show that the point for θ+π is the opposite point on the circle. Label both points with coordinates. Right: tangent graph from -π to 2π, highlighting period π and showing that the value repeats after π. Use arrows.

**Teacher Narration** `[74w]`
> Here's a deeper look at why tangent has period π. Adding π to an angle sends you to the opposite point on the unit circle. Both sine and cosine change sign, but their ratio stays the same because a negative divided by a negative is positive. This is a nice proof using the unit circle and the sine/cosine addition formulas. It also explains why the tangent graph has vertical asymptotes and repeats so quickly.

**Student Prompt:** Can you prove that $\sin(\theta+\pi) = -\sin\theta$ using the unit circle?

---

### Slide 14 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause and Try: Predict the Phase Shift**  ·  `split_left_right`

**On-screen text** `[9w]`
Find amplitude, period, phase shift, vertical shift for $y=2\cos(3x+\pi)-1$.

**LEFT** `[text]`

For $y = 2\cos(3x + \pi) - 1$, find:
- Amplitude
- Period
- Phase shift (state direction)
- Vertical shift

Try it before I reveal.

**RIGHT** `[visual_spec]`

*Visual Spec:* Display the function y = 2cos(3x+π)-1. Provide a 'Reveal answer' button. When clicked, show: Amplitude = 2, Period = 2π/3, Phase shift = -π/3 (left), Vertical shift = -1 (down). Use matplotlib widgets.Button. Also show a graph of the function with the parent cos(x) dashed for comparison. The graph should appear after clicking.

*Interactive Controls:*
  - 🎛 Button: Reveal Answer

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Button

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(6,5))
plt.subplots_adjust(bottom=0.2)

# Top part: function display
ax1.text(0.5, 0.5, 'y = 2cos(3x + π) - 1', fontsize=16, ha='center', va='center', transform=ax1.transAxes)
ax1.axis('off')

# Bottom graph (initially empty)
ax2.set_xlim(-2*np.pi, 2*np.pi)
ax2.set_ylim(-4, 4)
ax2.grid(True, alpha=0.3)
ax2.axhline(0, color='k', lw=0.5)
ax2.set_title('Graph will appear after reveal')

# Button
ax_button = plt.axes([0.4, 0.05, 0.2, 0.075])
button = Button(ax_button, 'Reveal Answer')

def reveal(event):
    ax2.clear()
    x = np.linspace(-2*np.pi, 2*np.pi, 500)
    ax2.plot(x, np.cos(x), '--', color='gray', alpha=0.5, label='cos(x)')
    ax2.plot(x, 2*np.cos(3*x + np.pi) - 1, 'b-', lw=2, label='transformed')
    ax2.legend()
    ax2.axhline(0, color='k', lw=0.5)
    ax2.grid(True, alpha=0.3)
    ax2.set_ylim(-4,4)
    ax2.set_title('Amplitude=2, Period=2π/3, Phase shift=-π/3 (left), Vertical shift=-1')
    fig.canvas.draw_idle()

button.on_clicked(reveal)
plt.show()
```

**Teacher Narration** `[66w]`
> Now it's your turn. Pause the video and try to find the four parameters for this transformed cosine function. Use the formulas we learned: amplitude is the absolute value of the coefficient, period is 2π over the B value, phase shift is -C/B, and vertical shift is the constant at the end. When you're ready, click the button to check your work and see the graph.

**Student Prompt:** Calculate amplitude, period, phase shift, vertical shift. Then press reveal.

---

### Slide 15 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive Lab: Ferris Wheel Simulation**  ·  `split_left_right`

**On-screen text** `[11w]`
Adjust radius and speed. Watch how height and horizontal distance oscillate.

**LEFT** `[text]`

Explore how height and horizontal distance change as the wheel rotates. Adjust the wheel's radius and rotation speed.

**RIGHT** `[visual_spec]`

*Visual Spec:* Create a simulation of a Ferris wheel with a passenger car. The wheel is a circle of radius R. The car's vertical position (height) and horizontal position are plotted in real time. Add two sliders: radius R (from 1 to 5) and angular speed ω (from 0.5 to 3). Show the wheel and the height vs. angle graph. Use a red dot for the car. Label the height and horizontal distance on the graph. Use FuncAnimation or slider to update. The x-axis of the graph is angle (0 to 2π), y-axis is position. Display both sin and cos curves for reference.

*Interactive Controls:*
  - 🎛 Slider for radius R from 1 to 5
  - 🎛 Slider for angular speed ω from 0.5 to 3

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider
from matplotlib.animation import FuncAnimation

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10,5))
plt.subplots_adjust(bottom=0.3)

# Ferris wheel
ax1.set_xlim(-6, 6)
ax1.set_ylim(-6, 6)
ax1.set_aspect('equal')
ax1.grid(True, alpha=0.3)
ax1.set_title('Ferris Wheel')
wheel, = ax1.plot([], [], 'k-', lw=2, alpha=0.5)
cabin, = ax1.plot([], [], 'ro', markersize=10)

# Graph
ax2.set_xlim(0, 2*np.pi)
ax2.set_ylim(-6, 6)
ax2.grid(True, alpha=0.3)
ax2.set_title('Position vs Angle')
ax2.set_xlabel('Angle (radians)')
ax2.set_ylabel('Position')
line_height, = ax2.plot([], [], 'r-', lw=2, label='height')
line_horiz, = ax2.plot([], [], 'b-', lw=2, label='horizontal')
ax2.legend()

# Sliders
ax_R = plt.axes([0.25, 0.15, 0.5, 0.03])
ax_w = plt.axes([0.25, 0.1, 0.5, 0.03])
sl_R = Slider(ax_R, 'Radius', 1, 5, valinit=3)
sl_w = Slider(ax_w, 'Speed', 0.5, 3, valinit=1)

# Data storage
theta_data = np.linspace(0, 2*np.pi, 300)
current_theta = 0

def init():
    wheel.set_data([], [])
    cabin.set_data([], [])
    line_height.set_data([], [])
    line_horiz.set_data([], [])
    return wheel, cabin, line_height, line_horiz

def update(frame):
    global current_theta
    R = sl_R.val
    w = sl_w.val
    current_theta = (current_theta + w * 0.05) % (2*np.pi)
    
    # Wheel circle
    wheel_x = R * np.cos(theta_data)
    wheel_y = R * np.sin(theta_data)
    wheel.set_data(wheel_x, wheel_y)
    
    # Cabin
    cabin_x = R * np.cos(current_theta)
    cabin_y = R * np.sin(current_theta)
    cabin.set_data([cabin_x], [cabin_y])
    
    # Graph: height = R*sin(θ), horizontal = R*cos(θ)
    angles = np.linspace(0, 2*np.pi, 300)
    heights = R * np.sin(angles)
    horizontals = R * np.cos(angles)
    line_height.set_data(angles, heights)
    line_horiz.set_data(angles, horizontals)
    
    return wheel, cabin, line_height, line_horiz

def on_slider_change(val):
    pass

sl_R.on_changed(on_slider_change)
sl_w.on_changed(on_slider_change)

ani = FuncAnimation(fig, update, init_func=init, frames=None, interval=50, blit=True)
plt.show()
```

**Teacher Narration** `[78w]`
> This interactive simulation brings the Ferris wheel metaphor to life. The red dot represents a passenger car. Your height above the center follows a sine wave, and your horizontal distance follows a cosine wave. Changing the radius scales the amplitude. Changing the speed changes how fast you rotate, which affects the period. Play with the sliders to see the connection between the circular motion and the sinusoidal graphs. This is exactly how trigonometric functions model real periodic phenomena.

**Student Prompt:** Set radius to 4 and speed to 2. How do the graphs change?

---

### Slide 16 · [SUMMARY]
**Lecture Summary**  ·  `full_width`

**On-screen text** `[10w]`
Unit circle, ASTC, identities, periodicity, symmetry, transformations. Practice makes perfect.

**FULL WIDTH** `[text]`

**Key Concepts Covered:**
- Unit circle: $\sin\theta = y$, $\cos\theta = x$
- Quadrant signs: ASTC
- Reciprocal and Pythagorean identities
- Periodicity: $\sin$, $\cos$ period $2\pi$; $\tan$ period $\pi$
- Even/odd: $\sin$ odd, $\cos$ even
- Graphing: $y = A\sin(Bx+C)+D$

**Next Steps:** Practice with different quadrants and transformations.

**Teacher Narration** `[87w]`
> Let's recap what we've learned. We started with the unit circle definitions that connect coordinates to sine and cosine. We used ASTC to determine signs in each quadrant. We covered reciprocal identities and the crucial Pythagorean identity. We saw how periodic behavior allows us to reduce any angle to a reference angle. We explored even/odd symmetries. And finally we learned to graph transformed functions by adjusting amplitude, period, phase shift, and vertical shift. Keep practicing with different angles and parameters to build intuition. Thank you for watching.

---
