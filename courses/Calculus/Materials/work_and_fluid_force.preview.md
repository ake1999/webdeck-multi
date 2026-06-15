# Work and Fluid Force

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** Recall the definite integral as a limit of Riemann sums: \(\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*)\Delta x\).

**Learning Objectives:**
- Calculate work done by variable forces using definite integrals
- Set up integrals for hydrostatic force on submerged vertical surfaces
- Apply the slice-and-sum method to physical problems
- Analyze real-world scenarios involving pumps, dams, and submerged plates
- Interpret pressure as force per unit area in fluid contexts

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
✅ **slide_count**: 15 slides (target 12–18)
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
| 1 | hook | 🟢 | ◧ |  | 92w | 14w | Intuition: Work as Area Under a Curve |
| 2 | core | 🟢 | ◧ |  | 64w | 12w | Constant Force Work |
| 3 | practice | 🟢 | ◧ |  | 90w | 13w | Warm-Up Example: Lifting a Crate |
| 4 | core | 🟢 | ◧ |  | 79w | 15w | Variable Force Work |
| 5 | misconception | 🟡 | ⬛⬛ |  | 78w | 11w | Common Mistake: Wrong Lift Distance in Pumping |
| 6 | core | 🟢 | ◧ |  | 86w | 16w | Hydrostatic Pressure |
| 7 | core | 🟢 | ◧ |  | 64w | 14w | Hydrostatic Force on a Vertical Surface |
| 8 | 🎛visual_lab | 🟢 | ◧ |  | 67w | 11w | Interactive: Work as Riemann Sum |
| 9 | practice | 🟢 | ◧ |  | 83w | 10w | Example 2: Spring Work (Standard) |
| 10 | practice | 🟡 | ⬛⬛ |  | 89w | 12w | Example 3: Pumping Water (Tricky) |
| 11 | practice | 🟡 | ◧ |  | 77w | 8w | Example 4: Hydrostatic Force on a Rectangle (Edge Case) |
| 12 | challenge | 🔴 | ⬛⬛ |  | 81w | 11w | [Challenge – Optional] Force on a Circular Gate |
| 13 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 63w | 13w | Quick Check: Spring Work |
| 14 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 60w | 12w | Quick Check: Hydrostatic Force |
| 15 | summary | 🟢 | ⬛⬛ |  | 70w | 12w | Summary |

---

### Slide 1 · [HOOK]
**Intuition: Work as Area Under a Curve**  ·  `split_left_right`

**On-screen text** `[14w]`
Work = (force)×(distance) only if force constant. Variable force: sum over many small pieces.

**LEFT** `[text]`

When a force changes, work isn't simply force times distance. Think of paying a worker whose hourly wage varies: you sum rate × time over each small interval. Similarly, work = \(\int f(x)\,dx\).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of force F vs displacement x. Shade area under a curved force function from x=a to x=b. Add small rectangles to hint at Riemann sum. Axes: x (m), F (N). Use blue shaded area, orange rectangles. Include label 'Work = area under F(x)'.

**Teacher Narration** `[92w]`
> Imagine you're paying a worker whose hourly rate changes throughout the day. You can't just multiply one rate by total hours – you need to add up the pay for each period where the rate was constant. Work in physics works the same way: if the force pushing an object changes as it moves, you need to add up force times tiny distances. The integral does exactly that. In this lecture, we'll see how integrals let us compute work for springs, pumping water, and even the force of water against a dam.

---

### Slide 2 · [CORE]
**Constant Force Work**  ·  `split_left_right`

**On-screen text** `[12w]`
Constant force: W = F·d. Force must be in direction of displacement.

**LEFT** `[formula_block]`

$$W = F \cdot d$$ (when force is constant and in direction of motion).

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a crate being lifted vertically. Force arrow upward labeled 'F = mg', displacement arrow upward labeled 'd = height'. Include ground and a hand pulling a rope. Use simple 2D cartoon style.

**Teacher Narration** `[64w]`
> The simplest case is when the force doesn't change. Then work is just force times distance in the direction of the force. For example, lifting a crate straight up against gravity: the force needed is the crate's weight, mg, and the distance is the height you lift it. The unit of work is joules in SI, foot-pounds in imperial. Let's do a quick example.

---

### Slide 3 · [PRACTICE]
**Warm-Up Example: Lifting a Crate**  ·  `split_left_right`

**On-screen text** `[13w]`
Lifting a crate: W = (mg) × height = 50·9.8·3 = 1470 J.

**LEFT** `[steps]`

A 50 kg crate is lifted vertically 3 m. Use \(g = 9.8\,\text{m/s}^2\).
1. Force: \(F = mg = 50 \times 9.8 = 490\,\text{N}\).
2. Distance: \(d = 3\,\text{m}\).
3. Work: \(W = 490 \times 3 = 1470\,\text{J}\).

**RIGHT** `[visual_spec]`

*Visual Spec:* Same diagram as slide 2, but add labels: '50 kg', '3 m', and the computed work '1470 J'. Use a dotted arrow showing displacement.

**Teacher Narration** `[90w]`
> We have a 50 kilogram crate being lifted 3 meters straight up. The force we must exert equals the weight, 50 times 9.8 gives 490 newtons. Since the force is constant and the displacement is in the same direction, we multiply: 490 newtons times 3 meters gives 1470 joules. This is the work done against gravity. Notice that the units work out: newtons times meters gives joules. This simple calculation is the foundation for understanding variable force work, where we'll need to sum many such constant-force contributions over tiny intervals.

---

### Slide 4 · [CORE]
**Variable Force Work**  ·  `split_left_right`

**On-screen text** `[15w]`
Variable force: W = ∫ f(x) dx. Work = area under force vs. position curve.

**LEFT** `[formula_block]`

$$W = \int_a^b f(x)\,dx$$ where \(f(x)\) is the force component in the direction of displacement at position \(x\), moving from \(x=a\) to \(x=b\).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a curved force function f(x). Shade the area under the curve from a to b. Add a label: 'Work = area under F(x)'. Use a dashed vertical line at a and b. Color: light blue fill.

**Teacher Narration** `[79w]`
> Now suppose the force changes as the object moves. For example, a spring's force gets stronger the more you stretch it. We can't just multiply one number; we need to integrate. The integral of the force function from start to finish gives the total work. Think of it as adding up force times tiny distance intervals. This is exactly the same as finding the area under the force-versus-position graph, which is a powerful visual way to understand the concept.

---

### Slide 5 · [MISCONCEPTION] 🟡
**Common Mistake: Wrong Lift Distance in Pumping**  ·  `full_width`

**On-screen text** `[11w]`
Misconception: Lift distance = distance from slice to top, not depth.

**FULL WIDTH** `[text]`

**Wrong:** use depth of water slice as the lift distance.
**Correct:** lift distance = distance from slice to top of tank.

Example: slice at height \(y\) (bottom = 0) must be lifted to top at \(H\), so distance = \(H - y\).

**Teacher Narration** `[78w]`
> When pumping water out of a tank, a common error is to think the water at the bottom has to be lifted only the height of the tank. In reality, each slice of water must be lifted to the top, so the distance depends on its position. Water near the bottom travels farther than water near the top. Always set up your coordinate so that the 'lift distance' is the vertical distance from the slice to the outlet.

---

### Slide 6 · [CORE]
**Hydrostatic Pressure**  ·  `split_left_right`

**On-screen text** `[16w]`
Pressure at depth h: P = δh. Force = pressure × area only if pressure constant.

**LEFT** `[formula_block]`

$$P = \rho g h = \delta h$$ where \(\rho\) = density, \(g\) = gravity, \(\delta = \rho g\) = weight density. Pressure increases linearly with depth.

**RIGHT** `[visual_spec]`

*Visual Spec:* Line graph of pressure P vs depth h, through origin. Label axes: 'Depth h (m)', 'Pressure P (Pa)'. Also show a simple cartoon of a swimmer at two different depths, with pressure arrows growing larger at depth.

**Teacher Narration** `[86w]`
> Now we shift to fluids. Water pressure depends only on depth, not on the shape of the container. The deeper you go, the greater the pressure. The formula is density times gravity times depth, or weight density times depth. This linear relationship is key for computing total force on a submerged surface. For example, at a depth of 10 meters in fresh water, the pressure is about 98,000 pascals, which is nearly one atmosphere. This increasing pressure is why dams are built thicker at the bottom.

---

### Slide 7 · [CORE]
**Hydrostatic Force on a Vertical Surface**  ·  `split_left_right`

**On-screen text** `[14w]`
Slice at depth y: force = (δ·depth)·(width·dy). Integrate over y from top to bottom.

**LEFT** `[formula_block]`

$$F = \int_a^b \delta \cdot h(y) \cdot w(y) \, dy$$ where \(h(y)\) is depth at height \(y\), \(w(y)\) is the width of the plate at that height.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a vertical rectangular plate submerged in water. Show a thin horizontal slice at depth y, of thickness dy and width w(y). Label: depth h(y) from the water surface to the slice. Add pressure arrows acting on the slice. Include the water surface line.

**Teacher Narration** `[64w]`
> To find the total force on a vertical surface like a dam gate, we slice it into thin horizontal strips. Each strip is at a constant depth, so pressure is constant across its area. Force on the strip is pressure times area. Then we integrate from the top to the bottom. The width function w(y) describes how wide the plate is at each depth.

---

### Slide 8 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive: Work as Riemann Sum**  ·  `split_left_right`

**On-screen text** `[11w]`
Explore Riemann sums for spring work. Change n and rectangle type.

**LEFT** `[text]`

Adjust the number of rectangles \(n\) to see how the Riemann sum approximates the area under the force curve \(F = 200x\) (a spring). Compare with the exact integral.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot of F=200x from x=0 to x=0.5. Show rectangles approximating the area. Use a slider for n from 1 to 50. Use radio buttons to select left, right, or midpoint sums. Display exact work value and Riemann sum approximation. Highlight difference in a label. Figure size: 10x6 inches. Colors: blue line (#0000FF), orange bars (#FFA500), green text (#008000), red text (#FF0000), purple text (#800080). Font sizes: title 14, labels 12, annotations 12. Slider positioned at [0.25, 0.1, 0.5, 0.03]. Radio buttons positioned at [0.7, 0.05, 0.2, 0.15].

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50
  - 🎛 Radio buttons: left, right, midpoint

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, RadioButtons

# Spring force: F = 200x
k = 200
x_vals = np.linspace(0, 0.5, 1000)
F_vals = k * x_vals

fig, ax = plt.subplots(figsize=(10, 6))
plt.subplots_adjust(bottom=0.25)
ax.plot(x_vals, F_vals, 'b-', linewidth=2, label='F = 200x')
ax.set_xlabel('Displacement x (m)')
ax.set_ylabel('Force F (N)')
ax.set_title('Work as Area Under Force-Displacement Curve')
ax.grid(True, alpha=0.3)
ax.legend()

# Initial n
n_init = 10
dx = 0.5 / n_init
x_rect = np.linspace(0, 0.5, n_init)
F_rect = k * x_rect
rects = ax.bar(x_rect, F_rect, width=dx, alpha=0.3, color='orange', label='Riemann sum')

# Exact value
exact = 0.5 * k * (0.5**2 - 0**2)  # 25
ax.text(0.35, 80, f'Exact work: {exact:.2f} J', fontsize=12, color='green')

# Slider
ax_slider = plt.axes([0.25, 0.1, 0.5, 0.03])
n_slider = Slider(ax_slider, 'n', 1, 50, valinit=n_init, valstep=1)

# Radio buttons
ax_radio = plt.axes([0.7, 0.05, 0.2, 0.15])
radio = RadioButtons(ax_radio, ('left', 'right', 'midpoint'))

def update(val):
    n = int(n_slider.val)
    dx = 0.5 / n
    if radio.value_selected == 'left':
        pts = np.linspace(0, 0.5 - dx, n)
    elif radio.value_selected == 'right':
        pts = np.linspace(dx, 0.5, n)
    else:
        pts = np.linspace(dx/2, 0.5 - dx/2, n)
    F_pts = k * pts
    ax.clear()
    ax.plot(x_vals, F_vals, 'b-', linewidth=2, label='F = 200x')
    rects = ax.bar(pts, F_pts, width=dx, alpha=0.3, color='orange', label=f'{radio.value_selected} sum, n={n}')
    approx = np.sum(F_pts) * dx
    ax.set_xlabel('Displacement x (m)')
    ax.set_ylabel('Force F (N)')
    ax.set_title('Work as Area Under Force-Displacement Curve')
    ax.grid(True, alpha=0.3)
    ax.legend()
    ax.text(0.35, 80, f'Exact work: {exact:.2f} J', fontsize=12, color='green')
    ax.text(0.35, 70, f'Approx: {approx:.2f} J', fontsize=12, color='red')
    ax.text(0.35, 60, f'Error: {abs(approx-exact):.4f} J', fontsize=12, color='purple')
    fig.canvas.draw_idle()

n_slider.on_changed(update)
radio.on_clicked(update)

plt.show()
```

**Teacher Narration** `[67w]`
> Let's see how Riemann sums approximate the work done by a spring. Here force F equals 200x, and we want the area under the curve from x=0 to x=0.5. Use the slider to increase the number of rectangles. Watch the approximation get closer to the exact value shown in the label. Try different rectangle types – left, right, or midpoint – and notice how the error changes.

---

### Slide 9 · [PRACTICE]
**Example 2: Spring Work (Standard)**  ·  `split_left_right`

**On-screen text** `[10w]`
Spring: k=200 N/m, W = ∫200x dx = 21 J.

**LEFT** `[steps]`

A force of 30 N stretches a spring 0.15 m. Find work to stretch from 0.2 m to 0.5 m.
1. Hooke's Law: \(F = kx\). \(k = 30/0.15 = 200\) N/m.
2. Work: \(W = \int_{0.2}^{0.5} 200x\,dx = 100[x^2]_{0.2}^{0.5}\).
3. \(W = 100(0.25 - 0.04) = 21\) J.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot F=200x from x=0 to x=0.6. Shade the region between x=0.2 and x=0.5. Label the exact work '21 J' inside the shaded area. Add a dashed vertical line at x=0.2 and x=0.5.

**Teacher Narration** `[83w]`
> A spring requires a 30 newton force to stretch 0.15 meters. From Hooke's law, the spring constant k is 200 newtons per meter. To find work stretching from 0.2 to 0.5 meters beyond natural length, we integrate kx from 0.2 to 0.5. The antiderivative is 100x^2, and evaluating gives 21 joules. Notice that the work is the area of a trapezoid under the force curve, which is a nice geometric check: the average force is 70 newtons, times 0.3 meters gives 21 joules.

---

### Slide 10 · [PRACTICE] 🟡
**Example 3: Pumping Water (Tricky)**  ·  `full_width`

**On-screen text** `[12w]`
Pumping: work = ∫ ρgπr²(H-y) dy. Each slice lift distance = H-y.

**FULL WIDTH** `[steps]`

Tank: radius 2 m, height 5 m, full water. Density ρ=1000 kg/m³, g=9.8 m/s². Set y=0 at bottom, y=5 at top.
1. Slice at height y: volume dV = π·2² dy = 4π dy.
2. Mass: dm = ρ dV = 1000·4π dy.
3. Force (weight): dF = dm·g = 39200π dy.
4. Lift distance: (5 - y) m.
5. Work on slice: dW = dF·(5-y) = 39200π (5-y) dy.
6. Total: W = ∫₀⁵ 39200π (5-y) dy = 39200π [5y - y²/2]₀⁵ = 39200π·12.5 = 490000π ≈ 1,539,379 J.

**Teacher Narration** `[89w]`
> This problem is tricky because the lift distance varies with height. We set coordinates with y=0 at the bottom. Each thin horizontal slice of water at height y has volume 4π dy. Its weight is 39200π dy newtons. To pump it to the top at y=5, it must be lifted 5-y meters. So the work on this slice is weight times lift distance. Integrating from 0 to 5 gives about 1.54 million joules. Remember: the slice near the bottom has a larger lift distance than one near the top.

---

### Slide 11 · [PRACTICE] 🟡
**Example 4: Hydrostatic Force on a Rectangle (Edge Case)**  ·  `split_left_right`

**On-screen text** `[8w]`
Rectangular plate: F = δ·w·(b²-a²)/2 = 411,600 N.

**LEFT** `[steps]`

Plate: 4 m wide, 3 m tall, top 2 m below surface. Weight density δ = 9800 N/m³. Set y=0 at surface, positive down. Plate extends from y=2 to y=5.
1. Width constant: w(y)=4 m.
2. Force: F = ∫₂⁵ δ·y·4 dy = 4δ [y²/2]₂⁵.
3. Compute: 4·9800·(25/2 - 4/2) = 39200·10.5 = 411,600 N.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw water surface at y=0. Rectangle from y=2 to y=5, width 4. Show a horizontal slice at depth y, thickness dy. Label depth y. Indicate pressure arrows on slice.

**Teacher Narration** `[77w]`
> Now a rectangular plate submerged vertically. Its top is two meters below the surface, bottom at five meters. Width is constant four meters. The depth variable y goes from 2 to 5. Force is weight density times y times width, integrated. Because width is constant, we pull it out. The result is 411,600 newtons. This is a large force, equivalent to the weight of about 42 metric tons, which shows why dams need to be so strong.

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Force on a Circular Gate**  ·  `full_width`

**On-screen text** `[11w]`
Circular gate: use symmetry. ∫√(r²-y²)dy = area of semicircle = πr²/2.

**FULL WIDTH** `[text]`

**Setup:** Circular gate radius 2 ft, center 5 ft below surface. Weight density δ = 62.5 lb/ft³.
Use coordinates with origin at circle center. Depth at y (positive upward) = 5 - y. Width w(y) = 2√(4 - y²).

Force: 
$$F = \int_{-2}^{2} \delta (5-y) \cdot 2\sqrt{4-y^2}\,dy$$
$$= 2\delta \left[ 5 \int_{-2}^{2} \sqrt{4-y^2}\,dy - \int_{-2}^{2} y\sqrt{4-y^2}\,dy \right]$$
Second integral = 0 (odd function). First integral = area of semicircle radius 2 = 2π.
So \(F = 2\delta \cdot 5 \cdot 2\pi = 20\pi \delta = 1250\pi \approx 3927\) lb.

**Teacher Narration** `[81w]`
> This is a more challenging example requiring geometric insight. The circular gate has its center at 5 feet depth. We place coordinates at the center for simplicity. The width at each height y is given by the circle equation. Splitting the integral, the term with y integrates to zero because it's an odd function over a symmetric interval. The remaining integral is the area of a semicircle, which we know without doing trig substitution. The final force is about 3927 pounds.

---

### Slide 13 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Quick Check: Spring Work**  ·  `split_left_right`

**On-screen text** `[13w]`
Pause: Find work from 0.3 to 0.7 m for spring with k=50 N/m.

**LEFT** `[text]`

A spring requires 10 N to stretch 0.2 m. How much work is done stretching it from 0.3 m to 0.7 m?

Options:
A) 5 J
B) 10 J
C) 20 J
D) 40 J

**Pause the video, solve, then click the button to reveal the answer.**

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph of F = kx (with k unknown) showing shaded area from x=0.3 to x=0.7. Add label 'k = ?' and axes. Do not show solution.

*Interactive Controls:*
  - 🎛 Button: Show Answer (reveals answer and explanation on click)

**Teacher Narration** `[63w]`
> Pause the video now and attempt this spring problem. Use the formula for work with constant k. First find k from the given data: a force of 10 newtons stretches the spring 0.2 meters, so k = 10/0.2 = 50 newtons per meter. Then integrate kx from 0.3 to 0.7 meters. After you've tried, press the button to see the answer and explanation.

**Student Prompt:** Compute W = ?

---

### Slide 14 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Quick Check: Hydrostatic Force**  ·  `split_left_right`

**On-screen text** `[12w]`
Pause: Compute force on rectangle 2×4 m, top at 1 m depth.

**LEFT** `[text]`

A vertical rectangular plate 2 m wide and 4 m tall is submerged so its top is 1 m below the water surface. Water weight density δ = 9800 N/m³. Find the hydrostatic force on one side.

Options:
A) 156,800 N
B) 235,200 N
C) 313,600 N
D) 392,000 N

**Pause and solve, then click to reveal.**

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw water surface at y=0, rectangle from y=1 to y=5, width 2. Show a horizontal slice. Label depths. No numbers.

*Interactive Controls:*
  - 🎛 Button: Show Answer (reveals answer and explanation on click)

**Teacher Narration** `[60w]`
> Another pause moment. Compute the hydrostatic force on this rectangular plate. Remember to set up your limits from y=1 to y=5 and integrate. The width is constant at 2 meters, and the depth at any y is just y. So the integral is δ times 2 times the integral of y from 1 to 5. Reveal the answer when ready.

**Student Prompt:** F = ?

---

### Slide 15 · [SUMMARY]
**Summary**  ·  `full_width`

**On-screen text** `[12w]`
Work = ∫F dx. Fluid force = ∫δ·depth·width dy. Slice and integrate.

**FULL WIDTH** `[text]`

**Key Formulas**
- Work (constant force): $W = Fd$
- Work (variable force): $W = \int_a^b F(x)\,dx$
- Hydrostatic pressure: $P = \delta h$
- Hydrostatic force: $F = \int_a^b \delta \cdot h(y) \cdot w(y)\,dy$

**Learning Objectives Revisited**
- Calculate work by variable forces using integrals.
- Set up integrals for hydrostatic force on submerged vertical surfaces.
- Apply the slice-and-sum method to physical problems.
- Analyze real-world scenarios (springs, pumps, dams, gates).
- Interpret pressure as force per unit area.

**Teacher Narration** `[70w]`
> Today we've seen how the definite integral is the workhorse for computing work and fluid forces. Remember the key idea: slice the object into pieces where the force or pressure is approximately constant, compute the contribution of each slice, and integrate. Practice with the examples and check your understanding with the problems. The same slice-and-sum approach will appear again in other applications like center of mass and moments of inertia.

---
