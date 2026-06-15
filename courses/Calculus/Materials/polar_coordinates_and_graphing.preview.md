# Polar Coordinates and Graphing

**Category:** vectors_3d_geometry  |  **Level:** First-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** Comfort with unit circle, standard angles, and basic sine/cosine values.

**Learning Objectives:**
- Convert between polar and Cartesian coordinates using trigonometric relationships
- Plot points and graph curves in the polar coordinate system
- Recognize standard polar equations (circles, lines, cardioids, rose curves)
- Analyze symmetry properties to efficiently sketch polar graphs
- Apply polar coordinates to represent curves that are difficult in Cartesian form

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 80w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 18 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
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
| 1 | hook | 🟢 | ◧ |  | 78w | 10w | Why Polar Coordinates? |
| 2 | core | 🟢 | ◧ |  | 77w | 18w | Intuition & Metaphor |
| 3 | core | 🟢 | ◧ |  | 73w | 8w | Polar → Cartesian Formulas |
| 4 | practice | 🟢 | ◧ |  | 75w | 8w | Example: Plot and Convert (Warm-up) |
| 5 | core | 🟢 | ◧ |  | 73w | 9w | Cartesian → Polar Formulas |
| 6 | practice | 🟡 | ⬛⬛ |  | 81w | 7w | Example: Cartesian to Polar (Standard) |
| 7 | misconception | 🟢 | ◧ |  | 77w | 9w | The Quadrant Trap |
| 8 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 64w | 6w | Quick Check: Quadrant of a Polar Point |
| 9 | core | 🟢 | ◧ |  | 72w | 14w | Standard Polar Equations: Circles and Lines |
| 10 | core | 🟢 | ◧ |  | 71w | 10w | Circle Through the Origin |
| 11 | challenge | 🔴 | ⬛⬛ |  | 111w | 6w | [Challenge – Optional] Proof: Circle from r = 2a cosθ |
| 12 | 🎛visual_lab | 🟢 | ◧ |  | 76w | 9w | Interactive: Explore Limaçon Curves |
| 13 | core | 🟡 | ◧ |  | 77w | 11w | Limaçon Family: Classification |
| 14 | practice | 🟡 | ⬛⬛ |  | 97w | 10w | Example: Graph r = 1 + 2 cosθ (Tricky) |
| 15 | practice | 🟡 | ◧ |  | 91w | 11w | Edge Case: r = 2 sinθ — Why θ in [0,π] suffices |
| 16 | practice | 🟢 | ◧ |  | 80w | 9w | Application: Radar Tracking |
| 17 | 🎛core | 🟢 | ◧ |  | 80w | 14w | Symmetry for Efficient Graphing |
| 18 | summary | 🟢 | ⬛⬛ |  | 82w | 6w | Summary: Polar Coordinates |

---

### Slide 1 · [HOOK]
**Why Polar Coordinates?**  ·  `split_left_right`

**On-screen text** `[10w]`
Cartesian: (3,4)   Polar: (5,53°)
Some curves are simpler in polar.

**LEFT** `[text]`

Cartesian: "3 blocks east, 4 north" → $(3,4)$.
Polar: "5 miles from tower, 53° from east" → $(5,53°)$.
Some curves are far simpler in polar: circle $r=a$, spiral $r=\theta$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two side-by-side subplots: left shows a Cartesian grid with point (3,4) labeled; right shows a polar grid (concentric circles and rays) with point (5,53°) also shown with a dashed line indicating distance and angle. Point coordinates displayed in both systems.

**Teacher Narration** `[78w]`
> Think of how you give directions. Cartesian coordinates are like a city grid: 'Go three blocks east, then four north.' Polar coordinates are like radar: 'You are five miles from the tower, at an angle of 53 degrees from due east.' Both are valid, but some curves — like circles centered at the origin or spirals — are beautifully simple in polar, but messy in Cartesian. In this lecture we'll learn how to use this alternative coordinate system.

---

### Slide 2 · [CORE]
**Intuition & Metaphor**  ·  `split_left_right`

**On-screen text** `[18w]`
Pole = origin. Polar axis = +x. (r,θ): r = distance, θ = angle. Negative r flips direction.

**LEFT** `[text]`

**Pole** = origin, **polar axis** = positive $x$-axis.

$(r,\theta)$: $r$ = distance from pole, $\theta$ = angle from polar axis.

$r$ can be negative: then point is in opposite direction of $\theta$.

**RIGHT** `[visual_spec]`

*Visual Spec:* A polar grid showing concentric circles labeled with r values and radial lines labeled with angle θ in degrees and radians. Highlight a point with positive r (r=3, θ=π/4) and a separate point with negative r (r=-2, θ=π/6) showing its true location at (2, 7π/6). Include labels: Pole (origin), Polar axis, r, θ.

**Teacher Narration** `[77w]`
> In polar coordinates, we start at the pole — that's the origin — and we have a fixed ray called the polar axis, usually the positive x-axis. A point is given by (r, θ): r tells you how far from the pole, and θ tells you the angle from the polar axis. But here's a twist: r can be negative. If r is negative, you go the opposite direction of θ. We'll see why that matters later.

---

### Slide 3 · [CORE]
**Polar → Cartesian Formulas**  ·  `split_left_right`

**On-screen text** `[8w]`
x = r cosθ, y = r sinθ

**LEFT** `[formula_block]`

$$x = r\cos\theta, \quad y = r\sin\theta$$

**RIGHT** `[visual_spec]`

*Visual Spec:* A right triangle with hypotenuse r, horizontal leg x, vertical leg y, and angle θ at origin. Dashed lines show projection onto axes. Label: x = r cosθ, y = r sinθ. Use standard mathematical orientation (θ from positive x-axis).

**Teacher Narration** `[73w]`
> To convert from polar to Cartesian, we use simple trigonometry. Given r and θ, the x-coordinate is r times the cosine of θ, and the y-coordinate is r times the sine of θ. This is just projecting the radial line onto the axes. Always remember: these formulas work for any r, including negative. If r is negative, your point will end up on the opposite side of the origin from the angle θ.

---

### Slide 4 · [PRACTICE]
**Example: Plot and Convert (Warm-up)**  ·  `split_left_right`

**On-screen text** `[8w]`
Example: Plot (3, π/4) and find Cartesian coordinates.

**LEFT** `[text]`

**Polar point:** $(3, \pi/4)$

1. $r=3$, $\theta=45°$ → ray at $\pi/4$.
2. Move 3 units outward.
3. Convert: $x = 3\cos(\pi/4) = \frac{3\sqrt{2}}{2}$
   $y = 3\sin(\pi/4) = \frac{3\sqrt{2}}{2}$

Result: Cartesian $(\frac{3\sqrt{2}}{2}, \frac{3\sqrt{2}}{2})$ ≈ $(2.12, 2.12)$

**RIGHT** `[visual_spec]`

*Visual Spec:* Left: polar grid with ray at π/4, concentric circles, point at r=3 marked with a dot. Right: Cartesian grid with point (2.12,2.12) marked, axes labeled x and y. Dashed line connects the two representations. Include text: 'Polar (3, π/4) ↔ Cartesian (2.12, 2.12)'.

**Teacher Narration** `[75w]`
> Let's start with a simple example. We have the polar point (3, π/4). First, locate the ray at 45 degrees from the polar axis. Then move outward 3 units along that ray. That's the point. Now convert to Cartesian: x equals 3 times cosine of π/4 which is 3√2/2, y is also 3√2/2. In decimals, about (2.12, 2.12). Notice that the point lies in Quadrant I, which matches the positive x and y we found.

---

### Slide 5 · [CORE]
**Cartesian → Polar Formulas**  ·  `split_left_right`

**On-screen text** `[9w]`
r² = x²+y², tanθ = y/x. Always check quadrant!

**LEFT** `[formula_block]`

$$r^2 = x^2 + y^2, \quad \tan\theta = \frac{y}{x}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* A unit circle with angles labeled at multiples of π/6 and π/4, showing the signs of x and y in each quadrant. Emphasize that tanθ = y/x repeats every π, so you must check quadrant. Include an example: point (-1, √3) with its correct angle 2π/3 and wrong angle -π/3

**Teacher Narration** `[73w]`
> To go from Cartesian to polar, we first find r using the Pythagorean theorem: r squared equals x squared plus y squared. Then we find θ using tangent θ = y over x. But here's the catch: tanθ repeats every π, meaning there are two possible angles. You must check the signs of x and y to determine which quadrant the point lies in. Never just take the inverse tangent without considering quadrant.

---

### Slide 6 · [PRACTICE] 🟡
**Example: Cartesian to Polar (Standard)**  ·  `full_width`

**On-screen text** `[7w]`
Find two polar representations for (-1, √3).

**FULL WIDTH** `[text]`

**Cartesian point:** $(-1, \sqrt{3})$

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | $r = \sqrt{(-1)^2 + (\sqrt{3})^2} = 2$ | Distance from origin |
| 2 | $\tan\theta = \frac{\sqrt{3}}{-1} = -\sqrt{3}$ | Reference angle: $\pi/3$ |
| 3 | Quadrant? $x$ negative, $y$ positive → Quadrant II | |
| 4 | $\theta = \pi - \pi/3 = 2\pi/3$ | In QII |
| 5 | **First representation:** $(2, 2\pi/3)$ | $r>0$ |
| 6 | **Second:** $(-2, 2\pi/3 - \pi) = (-2, -\pi/3)$ | $r<0$, add $\pi$ |

**Teacher Narration** `[81w]`
> Now let's convert the Cartesian point (-1, √3) to polar. First compute r: square root of 1+3 equals 2. Then tanθ equals √3 divided by -1, giving -√3. The reference angle is π/3, but we need to place the point in the correct quadrant. Since x is negative and y positive, we're in Quadrant II, so θ is π minus π/3 equals 2π/3. That gives (2, 2π/3). For a second representation with negative r, subtract π from θ: ( -2, -π/3).

---

### Slide 7 · [MISCONCEPTION]
**The Quadrant Trap**  ·  `split_left_right`

**On-screen text** `[9w]`
⚠️ tan⁻¹(y/x) alone can give wrong quadrant. Check signs!

**LEFT** `[text]`

**Wrong approach:** For $(-1,\sqrt{3})$, compute $\theta = \tan^{-1}(-\sqrt{3}) = -\pi/3$.

**Why it's wrong:** $\tan^{-1}$ returns an angle in $(-\pi/2, \pi/2)$ (QIV or QI). But $(-1,\sqrt{3})$ is in **Quadrant II**.

**Correct:** Quadrant II → $\theta = \pi - \pi/3 = 2\pi/3$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Cartesian grid with point (-1, √3) marked. Draw a ray from origin at angle -π/3 (into QIV) with a red 'X' splat, and a ray at 2π/3 (QII) with a green checkmark. Label the incorrect angle and correct angle. Include warning icon.

**Teacher Narration** `[77w]`
> This is one of the most common mistakes in polar coordinates. When you use the inverse tangent function on a calculator, it always returns an angle between -π/2 and π/2 — that's only Quadrants I and IV. But our point (-1, √3) has a negative x and positive y, so it's in Quadrant II. Using tan⁻¹ blindly would give -π/3, which points to Quadrant IV — completely wrong. Always draw the point or check the quadrant first.

---

### Slide 8 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Quick Check: Quadrant of a Polar Point**  ·  `split_left_right`

**On-screen text** `[6w]`
Which quadrant for polar (-3, π/6)?

**LEFT** `[text]`

**Which quadrant contains the Cartesian point corresponding to the polar coordinates $(-3, \pi/6)$?** 

A) Quadrant I    B) Quadrant II   
C) Quadrant III  D) Quadrant IV

(Pause the video, decide your answer, then click 'Reveal Answer'.)

**RIGHT** `[visual_spec]`

*Visual Spec:* Polar grid with ray at π/6 (pointing into QI) shown as a dashed line. A short text: 'Negative r: point lies opposite to θ' with an arrow showing direction 7π/6. Later, after reveal, show correct point in QIII.

*Interactive Controls:*
  - 🎛 Button: Reveal Answer

**Teacher Narration** `[64w]`
> Here's a quick check for you. Pause the video and think: the polar coordinates are (-3, π/6). Remember, r is negative, so the point lies in the opposite direction of the given angle. π/6 is in Quadrant I, so the opposite direction is π/6 plus π equals 7π/6, which is in Quadrant III. When you're ready, click the reveal button to see the answer.

**Student Prompt:** Pause and decide: which quadrant contains (-3, π/6)?

---

### Slide 9 · [CORE]
**Standard Polar Equations: Circles and Lines**  ·  `split_left_right`

**On-screen text** `[14w]`
r = a → circle radius |a|. θ = α → line through origin.

**LEFT** `[text]`

**Circle centered at origin:** $r = a$ (radius $|a|$)

**Line through origin:** $\theta = \alpha$ (angle $\alpha$ from polar axis)

**RIGHT** `[visual_spec]`

*Visual Spec:* Two side-by-side polar plots: left shows a circle of radius 3 (r=3) with concentric circles for reference; right shows a line at angle π/4 (θ=π/4) extending in both directions with negative r portion shown as dashed line beyond origin.

**Teacher Narration** `[72w]`
> Now let's look at two of the simplest polar equations. r equals a constant a gives a circle centered at the origin with radius the absolute value of a. Theta equals a constant alpha gives a line through the origin at that fixed angle. But careful: because r can be any real number, that line extends in both directions, not just as a ray. These are building blocks for more complex curves.

---

### Slide 10 · [CORE]
**Circle Through the Origin**  ·  `split_left_right`

**On-screen text** `[10w]`
r = 2a cosθ → circle radius |a|, center (a,0).

**LEFT** `[text]`

**Polar equation:** $r = 2a\cos\theta$

**Cartesian form:** $(x-a)^2 + y^2 = a^2$

A circle of radius $|a|$ centered at $(a,0)$.

Similarly, $r = 2a\sin\theta$ gives circle centered at $(0,a)$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Polar plot of r = 4 cosθ (a=2) showing a circle of radius 2 with center at (2,0) in Cartesian coordinates. Label the pole, the center, and the point (4,0) where r is maximum. Indicate that r=0 at θ=π/2.

**Teacher Narration** `[71w]`
> This is an important family: r equals 2a cosθ. In Cartesian, it becomes (x minus a) squared plus y squared equals a squared — a circle of radius |a| centered at (a, 0). It passes through the origin because when θ equals π/2, r equals 0. Similarly, r equals 2a sinθ gives a circle centered at (0, a). These often show up in physics problems involving circular motion through a point.

---

### Slide 11 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof: Circle from r = 2a cosθ**  ·  `full_width`

**On-screen text** `[6w]`
Prove r=2a cosθ is a circle.

**FULL WIDTH** `[text]`

**Goal:** Show $r = 2a\cos\theta$ is a circle radius $|a|$ centered at $(a,0)$.

| Step | Derivation | Explanation |
|------|------------|-------------|
| 1 | $r = 2a\cos\theta$ | Given |
| 2 | Multiply by $r$: $r^2 = 2a r\cos\theta$ | Use $r^2 = x^2+y^2$, $x=r\cos\theta$ |
| 3 | $x^2 + y^2 = 2a x$ | Substitute |
| 4 | $x^2 - 2ax + y^2 = 0$ | Rearrange |
| 5 | $(x^2 - 2ax + a^2) + y^2 = a^2$ | Complete square |
| 6 | $(x-a)^2 + y^2 = a^2$ | Circle equation |

**Teacher Narration** `[111w]`
> For those who want to see the algebraic proof, let's derive it step by step. Start with r equals 2a cosθ. Multiply both sides by r to get r squared equals 2a r cosθ. Now we use the conversion formulas: r squared becomes x squared plus y squared, and r cosθ becomes x. So we have x squared plus y squared equals 2a x. Rearrange to x squared minus 2a x plus y squared equals 0. Complete the square by adding a squared to both sides, giving (x minus a) squared plus y squared equals a squared. That's the standard equation of a circle centered at (a, 0) with radius a.

---

### Slide 12 · [VISUAL_LAB] 🎛 *[3 controls]*
**Interactive: Explore Limaçon Curves**  ·  `split_left_right`

**On-screen text** `[9w]`
Explore r = a + b cosθ with sliders.

**LEFT** `[text]`

**Equation:** $r = a + b\cos\theta$

Use the sliders to adjust $a$ and $b$.

Observe:
- Inner loop when $|a| < |b|$
- Dimple when $|a| > |b|$ but close
- Convex when $|a| \gg |b|$

**RIGHT** `[python_lab]`

*Visual Spec:* A polar plot displaying the limaçon curve. Two sliders: one for a (range -3 to 3, step 0.1, default 1), one for b (range -3 to 3, step 0.1, default 2). The curve updates in real time. Display the current values of a and b. Include a button 'Reset' to set a=1, b=2.

*Interactive Controls:*
  - 🎛 Slider: a from -3 to 3
  - 🎛 Slider: b from -3 to 3
  - 🎛 Button: Reset

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

fig, ax = plt.subplots(subplot_kw={'projection': 'polar'}, figsize=(6,6))
plt.subplots_adjust(bottom=0.3)

theta = np.linspace(0, 2*np.pi, 1000)
a_init, b_init = 1, 2
r = a_init + b_init * np.cos(theta)
line, = ax.plot(theta, r, lw=2)
ax.set_ylim(-3, 3)
ax.grid(True)

ax_a = plt.axes([0.2, 0.15, 0.65, 0.03])
ax_b = plt.axes([0.2, 0.1, 0.65, 0.03])
ax_reset = plt.axes([0.8, 0.025, 0.1, 0.04])

slider_a = Slider(ax_a, 'a', -3, 3, valinit=a_init, valstep=0.1)
slider_b = Slider(ax_b, 'b', -3, 3, valinit=b_init, valstep=0.1)

button_reset = Button(ax_reset, 'Reset')

def update(val):
    a = slider_a.val
    b = slider_b.val
    r = a + b * np.cos(theta)
    line.set_ydata(r)
    ax.set_ylim(-max(abs(a)+abs(b), 1)+0.5, max(abs(a)+abs(b), 1)+0.5)
    fig.canvas.draw_idle()

slider_a.on_changed(update)
slider_b.on_changed(update)

def reset(event):
    slider_a.reset()
    slider_b.reset()

button_reset.on_clicked(reset)

plt.show()
```

**Teacher Narration** `[76w]`
> Now for a hands-on exploration. This interactive tool lets you change the parameters a and b in the limaçon equation r equals a plus b cosθ. Notice what happens when the absolute value of a is less than the absolute value of b: you get an inner loop. When a is much larger than b, the curve becomes convex. Try different values and see how the shape changes. This is a great way to build intuition.

**Student Prompt:** Try a=1, b=2 (inner loop), then a=2, b=1 (dimpled). What happens when a=0?

---

### Slide 13 · [CORE] 🟡
**Limaçon Family: Classification**  ·  `split_left_right`

**On-screen text** `[11w]`
Limaçon types: inner loop, cardioid, dimpled, convex. Compare |a| vs |b|.

**LEFT** `[text]`

**$r = a + b\cos\theta$** (or $\sin\theta$)

- **Inner loop:** $|a| < |b|$
- **Cardioid:** $|a| = |b|$
- **Dimpled:** $2|a| > |b| > |a|$
- **Convex:** $|b| \leq |a|/2$

**RIGHT** `[visual_spec]`

*Visual Spec:* 4 small polar plots arranged in a 2x2 grid. Titles: 'Inner loop (a=1,b=2)', 'Cardioid (a=2,b=2)', 'Dimpled (a=3,b=2)', 'Convex (a=4,b=2)'. Each with the r-axis limit set appropriately.

**Teacher Narration** `[77w]`
> The limaçon family gives a rich variety of shapes. The key ratio is |a| over |b|. When |a| is smaller than |b|, r becomes negative for some θ, creating an inner loop. When they're equal, we get a heart-shaped cardioid. When |a| is a bit larger than |b|, there's a dimple. And when |a| is at least twice |b|, the curve is convex. You can remember this as: small a gives loops, big a gives smooth curves.

---

### Slide 14 · [PRACTICE] 🟡
**Example: Graph r = 1 + 2 cosθ (Tricky)**  ·  `full_width`

**On-screen text** `[10w]`
Graph r = 1 + 2 cosθ. Steps to sketch.

**FULL WIDTH** `[text]`

**Equation:** $r = 1 + 2\cos\theta$  (inner loop)

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | $a=1$, $b=2$; $|a|<|b|$ → inner loop | Type identification |
| 2 | Find $r=0$: $1+2\cos\theta=0 \Rightarrow \cos\theta=-\frac12$ → $\theta=\frac{2\pi}{3},\frac{4\pi}{3}$ | Loop crosses origin |
| 3 | Max $r$: $\cos\theta=1$ → $r=3$ at $\theta=0$ | Rightmost point |
| 4 | Min $r$: $\cos\theta=-1$ → $r=-1$ at $\theta=\pi$ | Leftmost point (inner loop) |
| 5 | Symmetry: $\cos(-\theta)=\cos\theta$ → symmetric about polar axis | Plot $0$ to $\pi$, reflect |
| 6 | Key points: $(3,0), (1,\pi/2), (0,2\pi/3), (-1,\pi), (0,4\pi/3), (1,3\pi/2)$ | Connect smoothly |

**Teacher Narration** `[97w]`
> Let's work through graphing a limaçon with an inner loop: r equals 1 plus 2 cosθ. Since 1 is less than 2, we know there's an inner loop. Find where r equals 0: cosθ equals -1/2 at 2π/3 and 4π/3 — those are where the curve crosses the origin. The maximum r is 3 at θ=0. But notice at θ=π, r becomes -1; that's the leftmost point of the inner loop. Because of symmetry about the polar axis, we only need to plot from 0 to π and reflect. Plot the key points and connect them smoothly.

---

### Slide 15 · [PRACTICE] 🟡
**Edge Case: r = 2 sinθ — Why θ in [0,π] suffices**  ·  `split_left_right`

**On-screen text** `[11w]`
r = 2 sinθ. Why is θ ∈ [0, π] enough?

**LEFT** `[text]`

**Equation:** $r = 2\sin\theta$

This is a circle centered at $(0,1)$ with radius 1.

Check: $r(\theta+\pi) = 2\sin(\theta+\pi) = -2\sin\theta = -r(\theta)$

So $[0,\pi]$ already gives all points; adding $[\pi,2\pi]$ retraces the same circle.

**RIGHT** `[visual_spec]`

*Visual Spec:* Polar plot of r = 2 sinθ, with a moving dot tracing the curve as θ increases from 0 to π. Show the full circle completed at θ=π. A counter shows current θ and r. Optionally, allow continuing to 2π to show retracing.

**Teacher Narration** `[91w]`
> Here's an interesting special case. r equals 2 sinθ gives a circle centered at (0,1) with radius 1. Notice that if we replace θ by θ plus π, r becomes negative of the original. That means every point in the range π to 2π is actually the same as some point already plotted for 0 to π but with opposite sign. So the entire circle is traced exactly once when theta goes from 0 to π. This happens for any equation of the form r equals a sinθ or a cosθ.

---

### Slide 16 · [PRACTICE]
**Application: Radar Tracking**  ·  `split_left_right`

**On-screen text** `[9w]`
Radar: r=10 km, angle 30° from north. Find (x,y).

**LEFT** `[text]`

A radar station tracks a plane at distance 10 km, angle 30° from north.

**Convert to Cartesian (east = +x, north = +y):**

- Angle from east: $\theta = 60° = \pi/3$
- $r = 10$ km
- $x = 10\cos(\pi/3) = 5$ km east
- $y = 10\sin(\pi/3) = 5\sqrt{3} \approx 8.66$ km north

**RIGHT** `[visual_spec]`

*Visual Spec:* A circular radar screen with concentric circles (range rings) and radial lines (bearing). Show a blip at distance 10 km at bearing 60° from east (30° from north). Overlay Cartesian axes with labels: x (east), y (north). Show the Cartesian coordinates (5, 8.66) next to the blip.

**Teacher Narration** `[80w]`
> Here's a real-world example. A radar station reports a plane 10 kilometers away at 30 degrees from north. In polar coordinates, our angle should be measured from the positive x-axis (east), so 30 degrees from north is 60 degrees from east. That gives θ equals π/3. Then x is 10 times cos(π/3) which is 5 kilometers east, and y is 10 times sin(π/3) which is about 8.66 kilometers north. This kind of conversion is essential in navigation, robotics, and physics.

---

### Slide 17 · [CORE] 🎛 *[1 controls]*
**Symmetry for Efficient Graphing**  ·  `split_left_right`

**On-screen text** `[14w]`
Symmetry tests: polar axis, vertical line, pole. Use to cut graphing effort in half.

**LEFT** `[text]`

| Symmetry | Test | Action |
|----------|------|--------|
| Polar axis ($x$-axis) | Replace $\theta$ with $-\theta$; equation unchanged | Plot $[0,\pi]$, reflect |
| Vertical line ($y$-axis) | Replace $\theta$ with $\pi-\theta$; unchanged | Plot $[-\pi/2,\pi/2]$, reflect |
| Pole (origin) | Replace $r$ with $-r$; unchanged | Plot $[0,\pi]$, reflect |

**RIGHT** `[visual_spec]`

*Visual Spec:* Three polar plots of r=1+2cosθ (inner loop). First: with original curve, highlight reflection across horizontal axis. Second: highlight reflection across vertical line. Third: highlight 180° rotation about origin. Use colored dashed lines to show reflected portions.

*Interactive Controls:*
  - 🎛 Toggle: Show/hide symmetry lines

**Teacher Narration** `[80w]`
> Using symmetry can halve your graphing work. There are three types to check. If replacing θ with -θ leaves the equation unchanged, the curve is symmetric about the polar axis (the x-axis). If replacing θ with π-θ does nothing, you have symmetry about the vertical line. And if replacing r with -r gives the same equation, you have symmetry about the pole. Always test for these before plotting — you may only need to plot a fraction of the angles.

---

### Slide 18 · [SUMMARY]
**Summary: Polar Coordinates**  ·  `full_width`

**On-screen text** `[6w]`
Review: conversions, standard curves, symmetry shortcuts.

**FULL WIDTH** `[text]`

**Key Formulas**

| Concept | Formula |
|---------|---------|
| Polar → Cartesian | $x = r\cos\theta$, $y = r\sin\theta$ |
| Cartesian → Polar | $r^2 = x^2+y^2$, $\tan\theta = y/x$ (check quadrant!) |
| Circle centered at origin | $r = a$ |
| Line through origin | $\theta = \alpha$ |
| Circle through origin | $r = 2a\cos\theta$ or $r = 2a\sin\theta$ |
| Limaçon | $r = a + b\cos\theta$ (inner loop if $|a|<|b|$) |

**Symmetry** can reduce graphing work: test $\theta \to -\theta$, $\theta \to \pi-\theta$, $r \to -r$.

**Teacher Narration** `[82w]`
> Let's recap. We learned how to convert between polar and Cartesian coordinates, being careful about the quadrant when finding θ. We saw simple equations for circles and lines, and more interesting families like the circle through the origin and the limaçon. Remember the symmetry tests to save time when graphing. Polar coordinates are a powerful tool for describing anything that involves rotation or circular motion. Next time you see a spiral or a rose curve, you'll know exactly how to handle it.

---
