# Critical Points and Extrema on an Interval

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** Assume students know how to compute derivatives using power, product, and chain rules, and recognize continuity on closed intervals.

**Learning Objectives:**
- Identify critical numbers by solving f′(x)=0 and checking where f′(x) does not exist
- Apply the Closed Interval Method to determine absolute maximum and minimum values
- Distinguish between local and absolute extrema and their relationships to critical points
- Solve real-world optimization problems using critical point analysis

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 77w)
⚠️ **Narration too short (<60w):** [4, 8]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 3 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 3 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s4:59w', 's8:53w']
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
| 1 | hook | 🟢 | ◧ |  | 64w | 16w | Why Critical Points Matter |
| 2 | 🎛visual_lab | 🟢 | ◧ |  | 83w | 8w | Critical Numbers Defined |
| 3 | core | 🟢 | ◧ |  | 78w | 16w | Fermat's Theorem |
| 4 | practice | 🟢 | ◧ |  | 59w⚠️ | 8w | Warm-Up: Finding Critical Numbers |
| 5 | practice | 🟢 | ◧ |  | 83w | 15w | Standard Example: x³ |
| 6 | misconception | 🟢 | ◧ |  | 78w | 11w | Common Mistake: Every Critical Point is an Extremum |
| 7 | 🎛visual_lab | 🟢 | ◧ |  | 88w | 10w | Closed Interval Method – Interactive |
| 8 | pause_and_try | 🟢 | ◧ | ⏸️ | 53w⚠️ | 8w | Try It: Absolute Extrema of |x−2| |
| 9 | practice | 🟢 | ◧ |  | 72w | 12w | Solution: |x−2| on [0,4] |
| 10 | pause_and_try | 🔴 | ◧ | ⏸️ | 68w | 5w | [Challenge – Optional] Try It: Critical Numbers with DNE |
| 11 | practice | 🔴 | ⬛⬛ |  | 74w | 8w | [Challenge – Optional] Solution: Critical Numbers of f(x)=x^{2/3}(6-x)^{1/3} |
| 12 | pause_and_try | 🟡 | ◧ | ⏸️ | 87w | 12w | Try It: Farmer's Fence Optimization |
| 13 | practice | 🟡 | ◧ |  | 78w | 11w | Solution: Farmer's Fence |
| 14 | 🎛visual_lab | 🟡 | ◧ |  | 71w | 12w | Interactive Lab: Explore the Fence Problem |
| 15 | challenge | 🔴 | ⬛⬛ |  | 98w | 16w | [Challenge – Optional] Proof of Fermat's Theorem |
| 16 | summary | 🟢 | ⬛⬛ |  | 94w | 10w | Summary and Key Takeaways |

---

### Slide 1 · [HOOK]
**Why Critical Points Matter**  ·  `split_left_right`

**On-screen text** `[16w]`
A farmer has 1200 m of fencing for a rectangular pasture along a river. Maximize area.

**LEFT** `[text]`

A farmer has 1200 m of fencing and wants to enclose a rectangular pasture along a river. No fence is needed along the river. What dimensions give the largest area?

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a horizontal axis as the river. Above it, a rectangle with dashed line along river side. Label sides: left and right as x, top as y. Show equation 2x+y=1200 below. Use muted blue for river, green for fence, gray for pasture.

**Teacher Narration** `[64w]`
> Start with a real problem: a farmer with 1200 meters of fence wants to make a rectangular pen along a river. We don't fence the river side. The question: what width and length give the biggest area? To answer this, we need to understand critical points and how to find absolute extrema on an interval. This problem will appear again as our final example.

---

### Slide 2 · [VISUAL_LAB] 🎛 *[2 controls]*
**Critical Numbers Defined**  ·  `split_left_right`

**On-screen text** `[8w]`
f'(c)=0 or f'(c) DNE defines a critical number.

**LEFT** `[formula_block]`

$$c\text{ is a critical number of }f\iff f'(c)=0\text{ or }f'(c)\text{ DNE}$$

**RIGHT** `[python_lab]`

*Visual Spec:* Plot f(x)=x^3-3x on [-2,2]. Include a dot at x=c with tangent line. Above the plot, display 'f'(c) = ...' and 'Sign: +, -, or 0'. Use a slider to move c. Highlight points where f'(c)=0 (horizontal tangents) and where f'(c) DNE (cusp, vertical tangent) by showing the function graph with those points marked. For demonstration, add a corner point at x=0 of f(x)=|x| to show DNE.

*Interactive Controls:*
  - 🎛 Slider for c from -2 to 2 step 0.01
  - 🎛 Shows tangent line and derivative sign

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots()
plt.subplots_adjust(bottom=0.2)
x_vals = np.linspace(-2, 2, 400)
f = lambda x: x**3 - 3x
y_vals = f(x_vals)
ax.plot(x_vals, y_vals, 'b-', label='f(x)')
ax.axhline(0, color='gray', lw=0.5)
ax.axvline(0, color='gray', lw=0.5)

# initial point
c0 = 1
dot, = ax.plot(c0, f(c0), 'ro', markersize=8)
tangent_x = np.linspace(c0-0.5, c0+0.5, 100)
tangent_y = f(c0) + (3*c0**2 - 3)*(tangent_x - c0)
tangent_line, = ax.plot(tangent_x, tangent_y, 'g--')
derivative_text = ax.text(0.05, 0.95, '', transform=ax.transAxes, verticalalignment='top')

ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_slider, 'c', -2, 2, valinit=c0)

def update(val):
    c = slider.val
    dot.set_data([c], [f(c)])
    df = 3*c**2 - 3
    tangent_line.set_data(np.linspace(c-0.5, c+0.5, 100), f(c) + df*(np.linspace(c-0.5, c+0.5, 100)-c))
    sign = '+' if df > 0 else ('-' if df < 0 else '0')
    derivative_text.set_text(f"f'({c:.2f}) = {df:.2f}  Sign: {sign}")
    fig.canvas.draw_idle()

slider.on_changed(update)
# Add a second function to show DNE? Not in same plot for simplicity.
plt.legend()
plt.show()
```

**Teacher Narration** `[83w]`
> A critical number is any x where the derivative equals zero or does not exist. Why? Because local maxima and minima can only occur where the tangent is horizontal or at a sharp corner, cusp, or vertical tangent. This visual lets you drag point c along the graph and see the tangent line and derivative value. Notice when the derivative is zero, the tangent is horizontal. When it doesn't exist, you might see a break or corner. We'll see both types in examples.

**Student Prompt:** Move the slider to find where f'(c)=0. What are the critical numbers?

---

### Slide 3 · [CORE]
**Fermat's Theorem**  ·  `split_left_right`

**On-screen text** `[16w]`
Every interior local extremum is a critical number. But not every critical number is an extremum.

**LEFT** `[formula_block]`

$$\text{If }f\text{ has a local extremum at }c\text{ (not an endpoint) and }f'(c)\text{ exists, then }f'(c)=0.$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^3-3x on [-2,2] again. Mark the local max at x=-1 and local min at x=1 with horizontal tangent lines. Add annotations: 'Local max f'=0', 'Local min f'=0'. Include a note: 'Converse false (e.g., x=0 for f(x)=x^3)'. Use red for tangents.

**Teacher Narration** `[78w]`
> Fermat's theorem gives a one-way implication: if a function has a local maximum or minimum at an interior point c and the derivative exists there, then the derivative must be zero. That means all local extrema are critical numbers. But the opposite is not true—not every critical number gives a local extremum. Think of the graph of x cubed at zero: derivative zero but no peak or valley. This is why we need tests to classify critical points.

---

### Slide 4 · [PRACTICE]
**Warm-Up: Finding Critical Numbers**  ·  `split_left_right`

**On-screen text** `[8w]`
Polynomial: f'(x)=6x²−18x+12 = 6(x−1)(x−2). Critical numbers at x=1,2.

**LEFT** `[steps]`

Find critical numbers of f(x) = 2x³ − 9x² + 12x + 5.

1. f′(x) = 6x² − 18x + 12
2. Set = 0: 6x² − 18x + 12 = 0
3. Divide by 6: x² − 3x + 2 = 0
4. Factor: (x−1)(x−2)=0
5. Critical numbers: x = 1, x = 2

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=2x^3-9x^2+12x+5 from x=0 to 3. At x=1 and x=2, draw red dashed horizontal tangents. Label points: (1, f(1)=10) and (2, f(2)=9). Include a small box showing derivative expression f'(x)=6x^2-18x+12 and factors.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 3, 400)
f = 2*x**3 - 9*x**2 + 12*x + 5
plt.figure()
plt.plot(x, f, 'b-', label='f(x)')
# tangents
for c in [1,2]:
    fc = f[np.argmin(np.abs(x-c))]
    plt.plot([c-0.4, c+0.4], [fc + (6*c**2-18*c+12)*(-0.4), fc + (6*c**2-18*c+12)*0.4], 'r--', lw=2)
    plt.plot(c, fc, 'ro')
plt.axhline(0, color='gray')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Critical Numbers of f(x)=2x³-9x²+12x+5')
plt.legend()
plt.show()
```

**Teacher Narration** `[59w ⚠️ **TOO SHORT: 59w < 60w min**]`
> Let's start with a simple polynomial. The derivative is a quadratic. Setting it to zero gives two critical numbers. Since polynomials have derivatives everywhere, we only check where the derivative is zero. Notice how the tangent lines at x=1 and x=2 are horizontal. These are candidates for local extrema. We'll check later whether they are actually maxima or minima.

---

### Slide 5 · [PRACTICE]
**Standard Example: x³**  ·  `split_left_right`

**On-screen text** `[15w]`
Derivative zero at x=0, but function increases through it. Not all critical points are extrema.

**LEFT** `[steps]`

f(x) = x³

1. f′(x) = 3x²
2. Set = 0: 3x² = 0 → x = 0 (critical number)
3. Test values around 0:
   f(−1) = −1, f(0)=0, f(1)=1
4. Conclusion: x=0 is NOT a local extremum (inflection point)

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^3 as a solid line. At x=0, draw a horizontal dashed tangent. Add arrows showing function increases from negative to positive. Below the graph, a small sign chart for f': (-) left of 0, 0 at 0, (+) right of 0, indicating inflection.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-1.5, 1.5, 300)
f = x**3
plt.figure()
plt.plot(x, f, 'b-', label='f(x)=x³')
plt.axhline(0, color='gray', lw=0.5)
plt.plot(0, 0, 'ro', markersize=8)
# tangent
plt.plot([-0.5,0.5], [0,0], 'r--', lw=2, label='f\'(0)=0')
plt.legend()
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('f(x)=x³: Critical but not extremum')
plt.show()
```

**Teacher Narration** `[83w]`
> Here's a classic counterexample. The function x cubed has derivative 3x squared, zero at x=0. So zero is a critical number. But if you look at the graph, the function is increasing as it passes through zero—it goes from negative to positive without forming a hill or valley. The horizontal tangent is there, but it's an inflection point, not a local maximum or minimum. This illustrates Fermat's theorem: every local extremum is a critical number, but not every critical number is an extremum.

**Student Prompt:** Is x=0 a local maximum, local minimum, or neither for f(x)=x³?

---

### Slide 6 · [MISCONCEPTION]
**Common Mistake: Every Critical Point is an Extremum**  ·  `split_left_right`

**On-screen text** `[11w]`
Critical number ≠ extremum. Test each candidate with sign of derivative.

**LEFT** `[text]`

**Wrong:** 'f'(c)=0 means f has a local max or min at c.'

**Truth:** A critical point is only a *candidate*. It could be a max, min, or neither. Always use the First Derivative Test or Second Derivative Test to decide.

**RIGHT** `[visual_spec]`

*Visual Spec:* Reuse the x^3 graph but add a large red 'X' over the words 'critical point = extremum'. Next to it, a list: 'Critical point: x=0, f'(0)=0, Test: f(-1)=-1, f(0)=0, f(1)=1 → no extremum.'

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-1.5, 1.5, 300)
f = x**3
plt.figure()
plt.plot(x, f, 'b-', label='f(x)=x³')
plt.plot(0, 0, 'ro', markersize=8)
plt.axhline(0, color='gray')
# Add a text annotation
plt.text(0.5, 1.2, 'Common Mistake: f'(0)=0 → extrema?', fontsize=12, color='red')
plt.text(0.5, 0.8, 'No! Inflection point.', fontsize=12, color='green')
plt.title('Misconception: Every Critical Point is an Extremum')
plt.show()
```

**Teacher Narration** `[78w]`
> A very common mistake is to assume that whenever the derivative is zero, you've automatically found a max or min. It's not true! The derivative being zero only tells you the tangent is horizontal. You still need to check whether the function changes direction at that point. The graph of x cubed shows that the function continues increasing on both sides. So remember: critical points are suspects, not convicts. We need additional tests—like the first derivative test—to decide.

**Student Prompt:** What test could you use to decide if a critical point is a local extremum?

---

### Slide 7 · [VISUAL_LAB] 🎛 *[3 controls]*
**Closed Interval Method – Interactive**  ·  `split_left_right`

**On-screen text** `[10w]`
Absolute extrema on [a,b] are at critical points or endpoints.

**LEFT** `[steps]`

To find absolute max/min of continuous f on [a,b]:
1. Find critical numbers in (a,b)
2. Evaluate f at critical numbers and endpoints a, b
3. Largest value = absolute max, smallest = absolute min

**RIGHT** `[python_lab]`

*Visual Spec:* Plot f(x)=x^3-3x^2+1 from x=-2 to 5. Include sliders for interval endpoints a and b. Mark the critical points at x=0 and x=2 with vertical dashed lines. On button click, display the absolute max and min values from the candidate set: f(a), f(b), f(0), f(2). Update as a and b change.

*Interactive Controls:*
  - 🎛 Slider a: -2 to 4 step 0.1
  - 🎛 Slider b: -1 to 5 step 0.1
  - 🎛 Button: Update Extrema

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

fig, ax = plt.subplots()
plt.subplots_adjust(bottom=0.3)

x_full = np.linspace(-2, 5, 500)
f = lambda x: x**3 - 3*x**2 + 1
y_full = f(x_full)
ax.plot(x_full, y_full, 'b-', lw=2, alpha=0.5)
# critical points
ax.axvline(0, color='gray', linestyle=':', lw=1, label='Critical x=0')
ax.axvline(2, color='gray', linestyle=':', lw=1, label='Critical x=2')
ax.plot(0, f(0), 'ko')
ax.plot(2, f(2), 'ko')
ax.set_xlim(-2,5)
ax.set_ylim(-5,20)
ax.set_xlabel('x')
ax.set_ylabel('f(x)')
ax.legend(loc='upper left')

# initial interval [0,3] for demo
a_init, b_init = 0, 3
a_line = ax.axvline(a_init, color='red', lw=2, linestyle='--', label='a')
b_line = ax.axvline(b_init, color='green', lw=2, linestyle='--', label='b')
# display values
text_box = ax.text(0.02, 0.95, '', transform=ax.transAxes, verticalalignment='top', bbox=dict(facecolor='white', alpha=0.8))

ax_slider_a = plt.axes([0.15, 0.2, 0.65, 0.03])
ax_slider_b = plt.axes([0.15, 0.15, 0.65, 0.03])
slider_a = Slider(ax_slider_a, 'a', -2, 4, valinit=a_init)
slider_b = Slider(ax_slider_b, 'b', -1, 5, valinit=b_init)

def update(val):
    a = slider_a.val
    b = slider_b.val
    a_line.set_xdata([a, a])
    b_line.set_xdata([b, b])
    # compute candidates
    candidates = [f(a), f(b)]
    for c in [0,2]:
        if a < c < b:
            candidates.append(f(c))
    if candidates:
        maxv = max(candidates)
        minv = min(candidates)
        text_box.set_text(f'Max: {maxv:.2f}\nMin: {minv:.2f}')
    fig.canvas.draw_idle()

slider_a.on_changed(update)
slider_b.on_changed(update)

# Button to show absolute extrema
ax_button = plt.axes([0.4, 0.05, 0.2, 0.06])
button = Button(ax_button, 'Update Extrema')
def on_button_click(event):
    update(None)
button.on_clicked(on_button_click)

update(None)
plt.show()
```

**Teacher Narration** `[88w]`
> The closed interval method is straightforward: for a continuous function on a closed interval, the absolute maximum and minimum must occur either at critical points inside the interval or at the endpoints. You simply list all candidates, plug them into the original function, and pick the largest and smallest values. In this interactive lab, you can adjust the interval endpoints a and b. The function shown is f(x)=x³−3x²+1, which has critical points at x=0 and x=2. Move the sliders to see how the absolute max and min change.

**Student Prompt:** Use the sliders to set a=-1 and b=4. What are the absolute max and min?

---

### Slide 8 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Try It: Absolute Extrema of |x−2|**  ·  `split_left_right`

**On-screen text** `[8w]`
f(x)=|x-2| on [0,4]. Find absolute max and min.

**LEFT** `[text]`

Find the absolute maximum and minimum values of f(x)=|x−2| on the closed interval [0,4].

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=|x-2| from x=0 to 4. Use a solid line. Highlight the corner at (2,0). Mark points (0,2) and (4,2) with open circles. Label the axes.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0,4,300)
f = np.abs(x-2)
plt.figure()
plt.plot(x, f, 'b-', lw=2)
plt.plot([0,4],[2,2], 'ko', markersize=6, label='Endpoints')
plt.plot(2,0, 'ro', markersize=8, label='Critical point (corner)')
plt.axhline(0, color='gray')
plt.legend()
plt.xlabel('x')
plt.ylabel('|x-2|')
plt.title('Pause and find absolute extrema of |x-2| on [0,4]')
plt.show()
```

**Teacher Narration** `[53w ⚠️ **TOO SHORT: 53w < 60w min**]`
> Okay, I want you to pause the video now and try this problem yourself. The function is f(x)=|x−2| on the interval from 0 to 4. Write down the candidate points: critical numbers and endpoints. Then compute the function values. After you have your answer, resume the video and I'll show you the solution.

**Student Prompt:** Pause the video. Find the absolute max and min of f(x)=|x-2| on [0,4].

---

### Slide 9 · [PRACTICE]
**Solution: |x−2| on [0,4]**  ·  `split_left_right`

**On-screen text** `[12w]`
Absolute max 2 at x=0 and 4; absolute min 0 at x=2.

**LEFT** `[steps]`

1. Critical numbers: f'(x) DNE at x=2 (corner). So critical point x=2.
2. Evaluate:
   f(0)=2, f(2)=0, f(4)=2
3. Absolute max = 2 (at x=0 and x=4)
   Absolute min = 0 (at x=2)

**RIGHT** `[visual_spec]`

*Visual Spec:* On the graph, label each candidate point with its coordinates. Use red text for max: 'max: (0,2)' and 'max: (4,2)'. Use green text for min: 'min: (2,0)'. Add a box showing the candidate list.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0,4,300)
f = np.abs(x-2)
plt.figure()
plt.plot(x, f, 'b-', lw=2)
plt.plot([0,4],[2,2], 'ro', markersize=8)
plt.plot(2,0, 'go', markersize=8)
plt.text(0.2,2.1, 'f(0)=2 (max)', fontsize=11, color='red')
plt.text(3.2,2.1, 'f(4)=2 (max)', fontsize=11, color='red')
plt.text(1.7,0.3, 'f(2)=0 (min)', fontsize=11, color='green')
plt.axhline(0, color='gray')
plt.title('Solution: Absolute max=2, min=0')
plt.show()
```

**Teacher Narration** `[72w]`
> Here's the solution. The absolute value function has a corner at x=2, where the derivative does not exist, so that's a critical number. We also check the endpoints x=0 and x=4. Evaluating gives f(0)=2, f(2)=0, f(4)=2. The smallest value is 0 at the critical point, and the largest value is 2 at both endpoints. Notice that the maximum occurs at endpoints, not at the critical point. That's why we always include endpoints.

---

### Slide 10 · [PAUSE_AND_TRY] 🔴 *[Challenge – Optional]* ⏸️ *[YouTube Pause]*
**[Challenge – Optional] Try It: Critical Numbers with DNE**  ·  `split_left_right`

**On-screen text** `[5w]`
f(x)=x^{2/3}(6-x)^{1/3}. Find all critical numbers.

**LEFT** `[text]`

Find the critical numbers of f(x)=x^{2/3}(6-x)^{1/3}.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the function from x=0 to 6. The graph should increase from 0 to a peak near x=4 then decrease to 0. At x=0 and x=6, the graph appears to have vertical tangents (steep). At x=4, a horizontal tangent. Use different colors to indicate types.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0,6,400)
f = x**(2/3) * (6-x)**(1/3)
plt.figure()
plt.plot(x, f, 'b-', lw=2)
plt.axhline(0, color='gray')
plt.plot(4, f[np.argmin(np.abs(x-4))], 'ro', markersize=8, label='f'(4)=0')
plt.plot(0, 0, 'go', markersize=8, label='f'(0) DNE (vertical)')
plt.plot(6, 0, 'go', markersize=8, label='f'(6) DNE (vertical)')
plt.legend()
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Pause: Find critical numbers of f(x)=x^{2/3}(6-x)^{1/3}')
plt.show()
```

**Teacher Narration** `[68w]`
> Now try a more challenging one. This function has both a derivative that equals zero at one point and derivative that does not exist at two other points. The derivative is quite messy, but you can find it using product and chain rules. Pause the video, compute f'(x), and identify all x where it's zero or undefined. After you've found them, resume and I'll walk through the solution.

**Student Prompt:** Pause the video. Compute f'(x) and find all critical numbers.

---

### Slide 11 · [PRACTICE] 🔴 *[Challenge – Optional]*
**[Challenge – Optional] Solution: Critical Numbers of f(x)=x^{2/3}(6-x)^{1/3}**  ·  `full_width`

**On-screen text** `[8w]`
Critical numbers: x=0,4,6. f'(4)=0; f'(0) and f'(6) DNE.

**FULL WIDTH** `[steps]`

Compute f'(x) = \frac{4-x}{3 x^{1/3}(6-x)^{2/3}}.

Set numerator=0 → x=4.
Denominator=0 → x=0 and x=6 (points where f'(x) DNE).

All three are critical numbers:
x=0 (vertical tangent),
x=4 (horizontal tangent),
x=6 (vertical tangent).

**Teacher Narration** `[74w]`
> After simplifying the derivative, we get f'(x) = (4−x) / [3 x^{1/3} (6−x)^{2/3}]. The derivative equals zero when the numerator is zero, so x=4. The derivative does not exist when the denominator is zero, which happens at x=0 and x=6. So all three are critical numbers. At x=4, the tangent is horizontal. At x=0 and x=6, the graph has vertical tangents. This example shows that we must always check both conditions for critical numbers.

---

### Slide 12 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]*
**Try It: Farmer's Fence Optimization**  ·  `split_left_right`

**On-screen text** `[12w]`
Maximize A(x)=x(1200−2x) for 0 < x < 600. Find x and y.

**LEFT** `[text]`

A farmer has 1200 m of fencing and wants to enclose a rectangular field along a river (no fence on river side). Maximize area A = x(1200−2x).

**RIGHT** `[visual_spec]`

*Visual Spec:* Same as slide 1 diagram but with labeling: river at bottom, left and right sides x, top side y=1200-2x. Include area formula A = x(1200-2x). Show domain: 0 < x < 600.

**Teacher Narration** `[87w]`
> This is the problem from the beginning of the lecture. We have 1200 m of fence for three sides. Let x be the width perpendicular to the river, so the length parallel to the river is 1200 minus 2x. The area function A(x) equals x times 1200 minus 2x. We need to find x that gives the maximum area. Pause the video, find the critical point of A, then evaluate to get the maximum area. Also think about the domain and whether endpoints could give larger area.

**Student Prompt:** Pause the video. Find the width x that maximizes the area and state the dimensions.

---

### Slide 13 · [PRACTICE] 🟡
**Solution: Farmer's Fence**  ·  `split_left_right`

**On-screen text** `[11w]`
Maximum area 180,000 m² at width 300 m, length 600 m.

**LEFT** `[steps]`

1. A(x)=1200x−2x², domain (0,600)
2. A'(x)=1200−4x=0 → x=300
3. Endpoints: A→0 as x→0⁺ or x→600⁻
4. A(300)=300×600=180,000 m²
5. Optimal: width 300 m, length 600 m

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the quadratic function. Show vertex at x=300. Label coordinates. Indicate that at x=0 and x=600, area is zero.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 600, 400)
A = 1200*x - 2*x**2
plt.figure()
plt.plot(x, A, 'b-', lw=2)
plt.plot(300, 180000, 'ro', markersize=8, label='Max area')
plt.text(300, 180000, ' (300, 180000)', fontsize=11)
plt.xlabel('Width x (m)')
plt.ylabel('Area (m²)')
plt.title('Area function A(x)=1200x-2x²')
plt.legend()
plt.grid(True)
plt.show()
```

**Teacher Narration** `[78w]`
> The area function is a downward-opening parabola, so its only critical point is the vertex. A'(x)=1200−4x=0 gives x=300. The endpoints give area approaching zero, so the maximum is at the critical point. The optimal dimensions are width 300 meters and length 600 meters, giving an area of 180,000 square meters. This is a typical optimization problem: we used the constraint to write area in terms of one variable, found the critical number, and checked endpoints to confirm maximum.

---

### Slide 14 · [VISUAL_LAB] 🟡 🎛 *[2 controls]*
**Interactive Lab: Explore the Fence Problem**  ·  `split_left_right`

**On-screen text** `[12w]`
Drag the slider to find the width that gives the largest area.

**LEFT** `[text]`

Use the slider to change width x. The area and the rectangle diagram update. Find the width that gives the maximum area.

**RIGHT** `[python_lab]`

*Visual Spec:* Two subplots: top shows rectangle with river (dimensions change with x), bottom shows area curve A(x) with a moving point. Slider for x from 0 to 600. Display current area value. A button to show optimal point.

*Interactive Controls:*
  - 🎛 Slider for width x from 0 to 600 step 1
  - 🎛 Button: Show Optimum (sets x=300)

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button
from matplotlib.patches import Rectangle

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(6, 8))
plt.subplots_adjust(bottom=0.2, hspace=0.4)

# Rectangle diagram
x_init = 300
y_init = 1200 - 2*x_init
rect = Rectangle((0,0), x_init, y_init, linewidth=2, edgecolor='black', facecolor='lightgreen', alpha=0.5)
ax1.add_patch(rect)
ax1.set_xlim(0, 700)
ax1.set_ylim(0, 700)
ax1.set_aspect('equal')
ax1.set_title('Pasture Layout')
ax1.text(x_init/2, -30, f'Width x={x_init} m', ha='center')
ax1.text(x_init/2, y_init+20, f'Length y={y_init} m', ha='center')

# Area curve
x_vals = np.linspace(0, 600, 400)
A_vals = 1200*x_vals - 2*x_vals**2
ax2.plot(x_vals, A_vals, 'b-', lw=2)
point, = ax2.plot(x_init, 1200*x_init - 2*x_init**2, 'ro', markersize=8)
ax2.set_xlabel('Width x (m)')
ax2.set_ylabel('Area (m²)')
ax2.set_title('Area vs Width')
ax2.grid(True)

# Slider
ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_slider, 'Width x', 0, 600, valinit=x_init)

def update(val):
    x = slider.val
    y = 1200 - 2*x
    rect.set_width(x)
    rect.set_height(y)
    ax1.cla()
    ax1.add_patch(rect)
    ax1.set_xlim(0, 700)
    ax1.set_ylim(0, 700)
    ax1.set_aspect('equal')
    ax1.set_title('Pasture Layout')
    ax1.text(x/2, -30, f'Width x={x:.0f} m', ha='center')
    ax1.text(x/2, y+20, f'Length y={y:.0f} m', ha='center')
    area = 1200*x - 2*x**2
    point.set_data([x], [area])
    fig.canvas.draw_idle()

slider.on_changed(update)

# Button to show optimum
ax_button = plt.axes([0.4, 0.1, 0.2, 0.06])
button = Button(ax_button, 'Show Optimum')
def show_opt(event):
    slider.set_val(300)
button.on_clicked(show_opt)

plt.show()
```

**Teacher Narration** `[71w]`
> Now you can explore the fence problem interactively. Drag the slider for width x, and watch how the rectangle changes and the point moves along the area curve. You'll see that area increases up to a maximum and then decreases. Use the 'Show Optimum' button to jump to the optimal width of 300 meters. This lab reinforces how the critical number we found algebraically corresponds to the peak of the parabola.

**Student Prompt:** Move the slider to approximately what width gives the maximum area? Then click 'Show Optimum' to check.

---

### Slide 15 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof of Fermat's Theorem**  ·  `full_width`

**On-screen text** `[16w]`
Proof: one-sided limits of difference quotient give f'(c) ≤ 0 and f'(c) ≥ 0, so f'(c)=0.

**FULL WIDTH** `[steps]`

Assume f has local max at c, f'(c) exists.

For h>0 small, f(c+h) ≤ f(c) ⇒ (f(c+h)-f(c))/h ≤ 0.
Take limit h→0⁺: f'(c) ≤ 0.

For h<0 small, f(c+h) ≤ f(c) ⇒ (f(c+h)-f(c))/h ≥ 0 (because h negative).
Take limit h→0⁻: f'(c) ≥ 0.

Since f'(c) exists, the one-sided limits equal f'(c). Thus f'(c) ≤ 0 and f'(c) ≥ 0 ⇒ f'(c)=0.

**Teacher Narration** `[98w]`
> Here's a compact proof of Fermat's theorem for those who want the theoretical foundation. If f has a local maximum at c, then near c the function values are less than or equal to f(c). For a small positive h, the difference quotient is non-positive because numerator is ≤0 and denominator is positive. So the right-hand derivative is ≤0. For negative h, the quotient is non-negative, so the left-hand derivative is ≥0. Since the derivative exists, both one-sided limits equal f'(c), so f'(c) must be both ≤0 and ≥0, hence zero. The proof for a minimum is symmetric.

---

### Slide 16 · [SUMMARY]
**Summary and Key Takeaways**  ·  `full_width`

**On-screen text** `[10w]`
Critical numbers → candidates. Closed Interval Method → absolute extrema.

**FULL WIDTH** `[text]`

**Critical numbers:** f'(c)=0 or DNE.
**Closed Interval Method:** Evaluate f at critical numbers in (a,b) and at a,b. Largest = absolute max, smallest = absolute min.
**Remember:** Critical numbers are candidates, not guarantees. Always check endpoints for absolute extrema.

**Teacher Narration** `[94w]`
> Let's recap. Critical numbers are points where the derivative is zero or undefined. They are the only possible locations for interior local extrema, but they don't guarantee one. To find absolute extrema on a closed interval, we use the closed interval method: list all critical numbers inside the interval and include the endpoints, evaluate the function at each, and pick the largest and smallest. Always remember to check endpoints—many students forget. This lecture's examples covered polynomials, absolute value, and a function with vertical tangents. The application showed how critical points solve real-world optimization problems.

---
