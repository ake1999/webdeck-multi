# The Squeeze Theorem

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should be comfortable with the definition of a limit, basic limit laws, and the fact that a limit exists when a function approaches a single finite value.

**Learning Objectives:**
- Apply the Squeeze Theorem to evaluate limits of functions trapped between two other functions
- Identify situations requiring the Squeeze Theorem (when direct limit laws fail)
- Construct appropriate bounding functions for oscillatory functions
- Prove limits rigorously using the formal definition

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 83w)
⚠️ **Narration too short (<60w):** [4]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 3 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s4:57w']
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
| 1 | hook | 🟢 | ◧ |  | 78w | 19w | The Cat Between Two Walls |
| 2 | core | 🟢 | ◧ |  | 85w | 27w | The Squeeze Theorem Statement |
| 3 | core | 🟢 | ◧ |  | 87w | 21w | The Zero-Bound Corollary |
| 4 | pause_and_try | 🟢 | ◧ | ⏸️ | 57w⚠️ | 8w | Warm-Up: Try It Yourself |
| 5 | practice | 🟢 | ⬛⬛ |  | 80w | 12w | Solution: Warm-Up Example |
| 6 | 🎛visual_lab | 🟡 | ◧ |  | 88w | 11w | Visual Lab: x sin(1/x) |
| 7 | practice | 🟢 | ⬛⬛ |  | 89w | 11w | Standard Example: x sin(1/x) |
| 8 | misconception | 🟢 | ⬛⬛ |  | 83w | 12w | Misconception: Naive Product Law |
| 9 | pause_and_try | 🟡 | ◧ | ⏸️ | 68w | 10w | Tricky: The Classic sin(x)/x |
| 10 | practice | 🟡 | ⬛⬛ |  | 110w | 19w | Solution: sin(x)/x Squeeze |
| 11 | 🎛visual_lab | 🟡 | ◧ |  | 77w | 12w | Visual Lab: sin(x)/x Squeeze |
| 12 | practice | 🟢 | ⬛⬛ |  | 82w | 18w | Edge Case: Limit at Infinity |
| 13 | practice | 🔴 | ⬛⬛ |  | 99w | 21w | [Challenge – Optional] Multivariable Preview |
| 14 | 🎛visual_lab | 🔴 | ◧ |  | 75w | 17w | [Challenge – Optional] Visual Lab: Multivariable Squeeze |
| 15 | core | 🟡 | ⬛⬛ |  | 83w | 11w | Proof Sketch (Epsilon-Delta) |
| 16 | summary | 🟢 | ◧ |  | 80w | 11w | Summary & Key Takeaways |

---

### Slide 1 · [HOOK]
**The Cat Between Two Walls**  ·  `split_left_right`

**On-screen text** `[19w]`
If f(x) ≤ g(x) ≤ h(x) and lim f = lim h = L, then lim g = L.

**LEFT** `[concept]`

Imagine a cat trapped between two walls that move toward each other. If the walls meet at the same point $L$, the cat is forced to also be at $L$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw two vertical lines (walls) approaching a common vertical line at x=0 from left and right. Animate their positions from x=-2 and x=+2 to x=0. Place a small cat emoji (or dot) between them; it moves to x=0 as walls close. Label L at x=0. Show initial state, then final state. Use matplotlib animation: FuncAnimation with 50 frames, blit=True.

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

fig, ax = plt.subplots(figsize=(6,4))
ax.set_xlim(-3,3)
ax.set_ylim(-1,1)
ax.axhline(0, color='gray', lw=0.5)
line_left, = ax.plot([],[], 'k-', lw=4)
line_right, = ax.plot([],[], 'k-', lw=4)
cat, = ax.plot([],[], 'ro', markersize=10, label='cat')
ax.legend()

def init():
    line_left.set_data([],[])
    line_right.set_data([],[])
    cat.set_data([],[])
    return line_left, line_right, cat

def animate(frame):
    t = frame / 50
    left_x = -2 + 2*t
    right_x = 2 - 2*t
    cat_x = left_x + (right_x - left_x)/2
    line_left.set_data([left_x, left_x], [-1,1])
    line_right.set_data([right_x, right_x], [-1,1])
    cat.set_data([cat_x], [0])
    return line_left, line_right, cat

ani = animation.FuncAnimation(fig, animate, frames=50, init_func=init, blit=True)
plt.show()
```

**Teacher Narration** `[78w]`
> Think of a cat hiding between two walls. The cat is your function g of x. The walls are the lower function f and the upper function h. If you push both walls toward each other until they meet at a single point L, the cat has nowhere to go—it must also land at L. This is the intuition behind the Squeeze Theorem. You'll often hear it called the Sandwich Theorem or Pinching Theorem for the same reason.

---

### Slide 2 · [CORE]
**The Squeeze Theorem Statement**  ·  `split_left_right`

**On-screen text** `[27w]`
Conditions: 1) g is squeezed between f and h near a. 2) Both f and h have limit L at a. Conclusion: g also has limit L.

**LEFT** `[formula_block]`

**Theorem (Squeeze Theorem):**
If $f(x) \leq g(x) \leq h(x)$ for all $x$ near $a$ (except possibly at $a$), and
$$\lim_{x\to a} f(x) = \lim_{x\to a} h(x) = L,
$$
then $$\lim_{x\to a} g(x) = L$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot three functions: f(x) = -x^2 + 1 (red dashed), h(x) = x^2 + 1 (green dashed), g(x) = (x^2)*sin(1/x) + 1 (blue) on x in [-1,1]. Mark x=a=0 and L=1 with dotted lines. Show that f and h approach (0,1) while g oscillates between them. Title: 'Squeeze Theorem: g(x) forced to L'.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-1, 1, 1000)
x = x[x != 0]
f = -x**2 + 1
h = x**2 + 1
g = x**2 * np.sin(1/x) + 1

plt.figure(figsize=(6,4))
plt.plot(x, f, 'r--', label='f(x)')
plt.plot(x, h, 'g--', label='h(x)')
plt.plot(x, g, 'b-', lw=1, label='g(x)')
plt.axhline(y=1, color='gray', ls=':', alpha=0.7)
plt.axvline(x=0, color='gray', ls=':', alpha=0.7)
plt.xlim(-1,1)
plt.ylim(0,2)
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.title('Squeeze Theorem Illustration')
plt.grid(alpha=0.3)
plt.show()
```

**Teacher Narration** `[85w]`
> Here's the formal statement. We need two conditions: first, for all x in some open interval around a (but possibly not at a itself), the function g is always between f and h. Second, both the lower and upper functions have the same limit L as x approaches a. Then, and only then, can we guarantee that g also approaches L. Notice it does not matter what g does exactly at a—only near it. The proof follows directly from the epsilon-delta definition of a limit.

---

### Slide 3 · [CORE]
**The Zero-Bound Corollary**  ·  `split_left_right`

**On-screen text** `[21w]`
Instead of sandwiching with two functions, use absolute value: if |g| ≤ M and M → 0, then g → 0.

**LEFT** `[formula_block]`

**Corollary (most common application):**
If $|g(x)| \leq M(x)$ for $x$ near $a$ and $\lim_{x\to a} M(x) = 0$, then $$\lim_{x\to a} g(x) = 0$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two side-by-side graphs: left shows g(x) with bounds -M(x) and M(x); right shows |g(x)| and M(x) both approaching 0. Use simple decaying oscillation for g. Mark limit L=0.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2, 2, 1000)
x = x[x!=0]
M = np.abs(x)
g = x * np.sin(1/x)

fig, (ax1, ax2) = plt.subplots(1,2, figsize=(10,4))

ax1.plot(x, g, 'b-', lw=1, label='g(x)')
ax1.plot(x, M, 'r--', label='M(x)')
ax1.plot(x, -M, 'g--', label='-M(x)')
ax1.set_title('g(x) bounded by -M and M')
ax1.legend()
ax1.grid(alpha=0.3)

ax2.plot(x, np.abs(g), 'b-', lw=1, label='|g(x)|')
ax2.plot(x, M, 'r--', label='M(x)')
ax2.set_title('|g(x)| ≤ M(x) -> limit 0')
ax2.legend()
ax2.grid(alpha=0.3)

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[87w]`
> Most of the time you'll use the Squeeze Theorem in this special form. If you can show that the absolute value of your function is less than or equal to some M of x, and that M of x goes to zero, then your function is forced to zero as well. This works because the inequality -M less than or equal to g less than or equal to M follows directly from the absolute value bound. So you only need to find one upper bound, not two.

---

### Slide 4 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Warm-Up: Try It Yourself**  ·  `split_left_right`

**On-screen text** `[8w]`
Pause: Evaluate the limit yourself. Hint: bound cos(1/x).

**LEFT** `[steps]`

**Problem:** Evaluate $$\lim_{x \to 0} x^2 \cos\left(\frac{1}{x}\right)$$

1. What is the range of $\cos(1/x)$?
2. Multiply by $x^2$ (positive near 0). What inequalities do you get?
3. Compute the limits of the bounds.
4. Apply the Squeeze Theorem.

**RIGHT** `[visual_spec]`

*Visual Spec:* Will be shown on solution slide (next). For pause: just axes. (Implementation: use same visual as solution but initially hide curves; reveal on click. For static PDF, include both.)

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-0.5,0.5,1000)
x = x[x!=0]
g = x**2 * np.cos(1/x)
f = -x**2
h = x**2

plt.figure(figsize=(6,4))
plt.plot(x, g, 'b-', label='x^2 cos(1/x)')
plt.plot(x, f, 'r--', label='-x^2')
plt.plot(x, h, 'g--', label='x^2')
plt.axhline(0, color='gray', ls=':')
plt.axvline(0, color='gray', ls=':')
plt.xlim(-0.5,0.5)
plt.ylim(-0.5,0.5)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Warm-Up: Squeeze Theorem')
plt.legend()
plt.grid(alpha=0.3)
plt.show()
```

**Teacher Narration** `[57w ⚠️ **TOO SHORT: 57w < 60w min**]`
> Before I show the solution, try this warm-up problem yourself. Remember that cosine is always between negative one and one. Multiply through by x squared, which is positive. See if you can find two functions that squeeze x squared cosine of one over x. Pause the video now and try it. Then resume to check your answer.

**Student Prompt:** Try to find functions f and h that bound g(x) = x^2 cos(1/x) and have the same limit as x→0.

---

### Slide 5 · [PRACTICE]
**Solution: Warm-Up Example**  ·  `full_width`

**On-screen text** `[12w]`
Key: The product of a function →0 and a bounded function →0.

**FULL WIDTH** `[steps]`

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | $-1 \leq \cos(1/x) \leq 1$ | Cosine always between -1 and 1 |
| 2 | Multiply by $x^2\geq0$: $-x^2 \leq x^2\cos(1/x) \leq x^2$ | Inequality preserved |
| 3 | $\lim_{x\to0}(-x^2)=0$ and $\lim_{x\to0}x^2=0$ | Both bounds go to 0 |
| 4 | By Squeeze Theorem: $\lim_{x\to0}x^2\cos(1/x)=0$ | Result |

**Teacher Narration** `[80w]`
> Let's go through the solution step by step. First, cosine is bounded between negative one and one. Since x squared is always nonnegative, multiplying preserves the inequalities. So g of x is between negative x squared and x squared. Both of those limits are zero as x approaches zero. Therefore, by the Squeeze Theorem, the limit of g is zero. This is a classic application: a term that goes to zero times a bounded oscillating term always goes to zero.

---

### Slide 6 · [VISUAL_LAB] 🟡 🎛 *[2 controls]*
**Visual Lab: x sin(1/x)**  ·  `split_left_right`

**On-screen text** `[11w]`
The amplitude of oscillations shrinks as x→0. Bounds create a funnel.

**LEFT** `[concept]`

Watch how $g(x) = x\sin(1/x)$ oscillates wildly near 0 but stays trapped between $f(x)=-|x|$ and $h(x)=|x|$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot x from -0.5 to 0.5, exclude 0. Show g in blue, -|x| red dashed, |x| green dashed. Add a slider to adjust zoom level: from full view down to ±0.05. Update limits accordingly. Optionally show a toggle to display the funnel shape (shaded region between bounds).

*Interactive Controls:*
  - 🎛 Slider for zoom level from ±0.05 to ±0.5
  - 🎛 Toggle to show/hide shaded region between bounds (optional)

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(7,5))
plt.subplots_adjust(bottom=0.2)

x = np.linspace(-0.5, 0.5, 2000)
x = x[x != 0]
g = x * np.sin(1/x)
lower = -np.abs(x)
upper = np.abs(x)

line_g, = ax.plot(x, g, 'b-', lw=1, label='x sin(1/x)')
line_lower, = ax.plot(x, lower, 'r--', lw=2, label='-|x|')
line_upper, = ax.plot(x, upper, 'g--', lw=2, label='|x|')
ax.axhline(0, color='gray', ls=':', alpha=0.5)
ax.axvline(0, color='gray', ls=':', alpha=0.5)
ax.set_xlim(-0.5, 0.5)
ax.set_ylim(-0.5, 0.5)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Squeeze Theorem: x sin(1/x)')
ax.legend()
ax.grid(alpha=0.3)

# Zoom slider axis and slider
axzoom = plt.axes([0.2, 0.05, 0.6, 0.03])
zoom_slider = Slider(axzoom, 'Zoom (x-range)', 0.05, 0.5, valinit=0.5, valstep=0.01)

def update(val):
    zoom = zoom_slider.val
    ax.set_xlim(-zoom, zoom)
    ax.set_ylim(-zoom, zoom)
    fig.canvas.draw_idle()

zoom_slider.on_changed(update)

plt.show()
```

**Teacher Narration** `[88w]`
> Here's a visual look at the function x times sine of one over x. Notice how it oscillates infinitely often as we get close to zero, but the amplitude of those oscillations decreases. That's because the factor x is squeezing the sine wave. The red and green dashed lines are minus the absolute value of x and plus the absolute value of x. They form a funnel that traps our function. Use the slider to zoom in toward zero and see how the oscillations get smaller and smaller.

**Student Prompt:** Drag the zoom slider to see what happens near x=0.

---

### Slide 7 · [PRACTICE]
**Standard Example: x sin(1/x)**  ·  `full_width`

**On-screen text** `[11w]`
Product Limit Law fails because limit of sin(1/x) does not exist.

**FULL WIDTH** `[steps]`

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Recognize $\lim_{x\to0}\sin(1/x)$ DNE | Oscillates infinitely often |
| 2 | Bound: $-1 \leq \sin(1/x) \leq 1$ | Sine is bounded |
| 3 | Use absolute value: $|x\sin(1/x)| \leq |x|$ | So $-|x| \leq g(x) \leq |x|$ |
| 4 | $\lim_{x\to0}(-|x|)=0$, $\lim_{x\to0}|x|=0$ | Both bounds go to 0 |
| 5 | By Squeeze Theorem: $\lim_{x\to0}x\sin(1/x)=0$ | Result |

**Teacher Narration** `[89w]`
> Now we solve the classic example. The limit of sine of one over x does not exist—it oscillates too wildly. So we cannot use the Product Limit Law to break this apart. Instead we bound. Since sine is always between negative one and one, the absolute value of x sine is at most the absolute value of x. That gives us the two bounds. Both negative absolute x and positive absolute x have limit zero, so our function is squeezed to zero. This is the quintessential Squeeze Theorem problem.

---

### Slide 8 · [MISCONCEPTION]
**Misconception: Naive Product Law**  ·  `full_width`

**On-screen text** `[12w]`
⚠️ Common Mistake: Splitting a limit when one part has no limit.

**FULL WIDTH** `[steps]`

**Wrong approach:** Write $$\lim_{x\to0} x\sin(1/x) = \lim_{x\to0}x \cdot \lim_{x\to0}\sin(1/x)$$ and conclude "0 times something bounded = 0".

**Why it's wrong:** The Product Limit Law requires both limits to exist individually. The limit of $\sin(1/x)$ does **not** exist. Therefore the law does not apply.

**Correct approach:** Use the Squeeze Theorem as shown earlier.

**Teacher Narration** `[83w]`
> Many students try to shortcut this problem by writing the limit of x times the limit of sine one over x. They think since x goes to zero and sine is bounded, the answer must be zero. But the limit laws require both factors to have limits. Sine of one over x has no limit—it oscillates. So you cannot split it. The Squeeze Theorem is the proper tool. Remember: you can only use product law when each limit exists as a finite number.

**Student Prompt:** Why is it incorrect to say lim x sin(1/x) = (lim x)(lim sin(1/x))?

---

### Slide 9 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]*
**Tricky: The Classic sin(x)/x**  ·  `split_left_right`

**On-screen text** `[10w]`
Pause: Try to find bounding functions for sin(x)/x using geometry.

**LEFT** `[steps]`

**Problem:** Evaluate $$\lim_{x\to0}\frac{\sin x}{x}$$ using the Squeeze Theorem.

Hint: Use geometry. For $0<x<\pi/2$, consider areas in a unit circle.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw unit circle centered at origin. Mark point (1,0) and angle x (small). Draw the triangle formed by origin, (1,0), and (cos x, sin x). Draw sector arc. Draw larger triangle from origin to (1,0) to (1, tan x). Shade areas. Label areas: triangle OAB (small), sector OAB, triangle OAD (large). Show inequality: (1/2)cos x sin x ≤ (1/2)x ≤ (1/2)tan x.

```python
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6,6))
ax.set_aspect('equal')
ax.set_xlim(-0.5,1.5)
ax.set_ylim(-0.5,1.5)

x = 0.6  # angle in radians
# unit circle
theta = np.linspace(0,x,100)
ax.plot(np.cos(theta), np.sin(theta), 'b-', lw=2)
ax.plot([0,1],[0,0], 'k-', lw=1)
ax.plot([0,np.cos(x)],[0,np.sin(x)], 'k-', lw=1)
ax.plot([1,1],[0,np.tan(x)], 'r--', lw=1)
ax.plot([0,1],[0,0], 'k-', lw=1)
ax.plot([1,0],[0,0], 'k-', lw=1)
# triangle small
ax.fill([0,1,np.cos(x)],[0,0,np.sin(x)], alpha=0.2, color='green', label='small triangle')
# sector (approximate with polygon)
ax.fill([0]+list(np.cos(theta)), [0]+list(np.sin(theta)), alpha=0.2, color='blue', label='sector')
# large triangle
ax.fill([0,1,1],[0,0,np.tan(x)], alpha=0.2, color='red', label='large triangle')
ax.legend()
ax.set_title('Geometric bounds for sin x / x')
ax.grid(alpha=0.3)
plt.show()
```

**Teacher Narration** `[68w]`
> Now for a famous limit that requires a geometric argument. Try to evaluate the limit of sine x over x as x approaches zero using the Squeeze Theorem. The trick is to use area comparisons on the unit circle. For a small positive angle, draw the small triangle, the circular sector, and the larger triangle. Compare their areas. Pause the video and try to derive the inequalities yourself.

**Student Prompt:** Use unit circle geometry to find f(x) and h(x) that bound sin(x)/x near 0.

---

### Slide 10 · [PRACTICE] 🟡
**Solution: sin(x)/x Squeeze**  ·  `full_width`

**On-screen text** `[19w]`
Key: cos x ≤ sin x / x ≤ 1/cos x for x near 0 (x≠0). Both bounds →1.

**FULL WIDTH** `[steps]`

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | For $0<x<\pi/2$, area(small triangle) ≤ area(sector) ≤ area(large triangle) | Geometric comparison |
| 2 | $\frac12\cos x \sin x \leq \frac12 x \leq \frac12 \tan x$ | Areas in terms of trig |
| 3 | Multiply by 2, divide by $\sin x>0$: $\cos x \leq \frac{x}{\sin x} \leq \frac{1}{\cos x}$ | Algebraic manipulation |
| 4 | Reciprocals (reverse inequalities for positive numbers): $\frac{1}{\cos x} \geq \frac{\sin x}{x} \geq \cos x$ | Taking reciprocals reverses the inequalities, yielding $\cos x \leq \frac{\sin x}{x} \leq \frac{1}{\cos x}$ |
| 5 | $\lim_{x\to0}\cos x = 1$ and $\lim_{x\to0}\frac{1}{\cos x} = 1$ | Both bounds approach 1 |
| 6 | By Squeeze Theorem: $\lim_{x\to0}\frac{\sin x}{x} = 1$ | Result |

**Teacher Narration** `[110w]`
> Here's the classic proof. Using the unit circle for a small positive x, the area of the small triangle is one half cosine x sine x, the sector area is one half x, and the large triangle area is one half tangent x. This gives the inequality chain. Multiply by two, divide by sine x, then take reciprocals carefully because all numbers are positive. Finally we get cosine x is less than or equal to sine x over x, which is less than or equal to one over cosine x. As x goes to zero, both cosine and secant approach one, so sine x over x is squeezed to one.

---

### Slide 11 · [VISUAL_LAB] 🟡 🎛 *[2 controls]*
**Visual Lab: sin(x)/x Squeeze**  ·  `split_left_right`

**On-screen text** `[12w]`
Observe: sin(x)/x stays between the two curves; all three meet at x=0.

**LEFT** `[concept]`

Near x=0, sin(x)/x is squeezed between cos(x) and 1/cos(x). Both approach 1, forcing the limit to 1.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot x from -1 to 1 (exclude 0). Show sin(x)/x in blue, cos(x) red dashed, 1/cos(x) green dashed. Include horizontal line at y=1. Add slider to zoom in x-range from ±0.1 to ±1. Also add a checkbox to show/hide the error band (difference between bounds and 1).

*Interactive Controls:*
  - 🎛 Slider to zoom x-range from ±0.1 to ±1
  - 🎛 Checkbox to toggle shaded error band between bounds

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, CheckButtons

fig, ax = plt.subplots(figsize=(7,5))
plt.subplots_adjust(bottom=0.25)

x = np.linspace(-1, 1, 2000)
x = x[x != 0]
sinc = np.sin(x)/x
cosx = np.cos(x)
secx = 1/np.cos(x)

line_sinc, = ax.plot(x, sinc, 'b-', lw=2, label='sin(x)/x')
line_cos, = ax.plot(x, cosx, 'r--', lw=2, label='cos(x)')
line_sec, = ax.plot(x, secx, 'g--', lw=2, label='1/cos(x)')
ax.axhline(1, color='gray', ls=':', alpha=0.5)
ax.axvline(0, color='gray', ls=':', alpha=0.5)
ax.set_xlim(-1,1)
ax.set_ylim(0.5,1.5)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Squeeze Theorem: sin(x)/x')
ax.legend()
ax.grid(alpha=0.3)

# Slider for zoom
axzoom = plt.axes([0.2, 0.1, 0.6, 0.03])
zoom_slider = Slider(axzoom, 'Zoom x-range', 0.1, 1.0, valinit=1.0, valstep=0.05)

# Checkbutton for error band
error_band = None
def toggle_error(label):
    global error_band
    if error_band is None:
        error_band = ax.fill_between(x, cosx, secx, alpha=0.1, color='gray', label='error band')
    else:
        error_band.remove()
        error_band = None
    fig.canvas.draw_idle()

ax_check = plt.axes([0.7, 0.02, 0.25, 0.05])
check = CheckButtons(ax_check, ['Show error band'], [False])
check.on_clicked(toggle_error)

def update(val):
    zoom = zoom_slider.val
    ax.set_xlim(-zoom, zoom)
    fig.canvas.draw_idle()

zoom_slider.on_changed(update)

plt.show()
```

**Teacher Narration** `[77w]`
> This interactive plot lets you explore the squeezing of sine x over x. The blue curve is our function, the red dashed line is cosine x, and the green dashed line is secant x. Near zero, all three approach one. You can zoom in to see how close they get. Use the check box to shade the region between the bounds—our function lives entirely inside that band. Notice that the bounds themselves tighten as x approaches zero.

**Student Prompt:** Zoom in near x=0 and observe how the three curves converge to 1.

---

### Slide 12 · [PRACTICE]
**Edge Case: Limit at Infinity**  ·  `full_width`

**On-screen text** `[18w]`
The Squeeze Theorem works for limits at infinity too. The oscillating numerator is damped by the growing denominator.

**FULL WIDTH** `[steps]`

**Problem:** Evaluate $$\lim_{x \to \infty} \frac{\sin x}{x}$$

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Bound $-1 \leq \sin x \leq 1$ for all $x$ | Sine is bounded |
| 2 | Divide by $x>0$ (for large $x$): $-\frac1x \leq \frac{\sin x}{x} \leq \frac1x$ | Inequality direction preserved |
| 3 | $\lim_{x\to\infty} (-1/x)=0$ and $\lim_{x\to\infty} (1/x)=0$ | Both bounds → 0 |
| 4 | By Squeeze Theorem: $\lim_{x\to\infty} \frac{\sin x}{x}=0$ | Result |

**Teacher Narration** `[82w]`
> Here's an edge case: limit as x approaches infinity of sine x over x. The concept is the same—we bound the function between negative one over x and one over x. Both of those go to zero as x goes to infinity, so the squeezed function must also go to zero. This shows that even though sine x oscillates forever, dividing by x makes the amplitude decay. The Squeeze Theorem applies to limits at infinity just as it does at finite points.

---

### Slide 13 · [PRACTICE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Multivariable Preview**  ·  `full_width`

**On-screen text** `[21w]`
The Squeeze Theorem extends to multiple variables. Bound by a function that depends on only one variable that goes to zero.

**FULL WIDTH** `[steps]`

**Problem:** Evaluate $$\lim_{(x,y)\to(0,0)} \frac{x^2 y}{x^2 + y^2}$$

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Note $0 \leq \frac{x^2}{x^2+y^2} \leq 1$ for all $(x,y)\neq(0,0)$ | Key bound |
| 2 | Multiply: $\left|\frac{x^2 y}{x^2+y^2}\right| \leq |y|$ | So $-|y| \leq g(x,y) \leq |y|$ |
| 3 | As $(x,y)\to(0,0)$, $|y|\to0$ | Bound goes to zero |
| 4 | By Squeeze Theorem: limit = 0 | Result |

**Teacher Narration** `[99w]`
> As a preview of multivariable calculus, let's evaluate a limit of a function of two variables. The function is x squared y over x squared plus y squared. The trick is to notice that x squared over x squared plus y squared is always between zero and one. Therefore the absolute value of our function is less than or equal to the absolute value of y. As both x and y go to zero, y goes to zero, so by the Squeeze Theorem the function also goes to zero. This is optional but shows how powerful the theorem is.

---

### Slide 14 · [VISUAL_LAB] 🔴 *[Challenge – Optional]* 🎛 *[2 controls]* *(skip if time-limited)*
**[Challenge – Optional] Visual Lab: Multivariable Squeeze**  ·  `split_left_right`

**On-screen text** `[17w]`
The surface is pinched between two planes that meet at the origin, forcing the limit to 0.

**LEFT** `[concept]`

Surface $z = \frac{x^2 y}{x^2+y^2}$ is squeezed between planes $z = -|y|$ and $z = |y|$ near the origin.

**RIGHT** `[visual_spec]`

*Visual Spec:* Use mpl_toolkits.mplot3d. Plot surface z = x^2 y/(x^2+y^2) for x,y in [-1,1] (avoid origin). Also plot two transparent planes: z = |y| (red) and z = -|y| (blue). Add interactive controls: slider to adjust zoom (limits) and button to toggle visibility of planes.

*Interactive Controls:*
  - 🎛 Slider to adjust axis limits (zoom) from 0.2 to 1.0
  - 🎛 Checkbox to show/hide bounding planes

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider, CheckButtons

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
plt.subplots_adjust(bottom=0.25)

# create grid
x_vals = np.linspace(-1, 1, 50)
y_vals = np.linspace(-1, 1, 50)
X, Y = np.meshgrid(x_vals, y_vals)
Z = np.where(X**2+Y**2>0, X**2*Y/(X**2+Y**2), 0)
Y_abs = np.abs(Y)

# plot surface
surf = ax.plot_surface(X, Y, Z, cmap='viridis', alpha=0.8, label='f')
# plot bounds
plane_upper = ax.plot_surface(X, Y, Y_abs, alpha=0.2, color='red', label='|y|')
plane_lower = ax.plot_surface(X, Y, -Y_abs, alpha=0.2, color='blue', label='-|y|')
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
ax.set_title('Multivariable Squeeze')

# initial view
ax.view_init(elev=25, azim=-60)

# slider for zoom
ax_zoom = plt.axes([0.2, 0.1, 0.6, 0.03])
zoom_slider = Slider(ax_zoom, 'Zoom (axis limit)', 0.2, 1.0, valinit=1.0)

def update(val):
    lim = zoom_slider.val
    ax.set_xlim(-lim, lim)
    ax.set_ylim(-lim, lim)
    ax.set_zlim(-lim, lim)
    fig.canvas.draw_idle()

zoom_slider.on_changed(update)

# checkboxes for planes
ax_check = plt.axes([0.7, 0.02, 0.25, 0.05])
check = CheckButtons(ax_check, ['Show bounds'], [True])
plane_visible = True
def toggle_planes(label):
    global plane_visible
    plane_visible = not plane_visible
    plane_upper.set_visible(plane_visible)
    plane_lower.set_visible(plane_visible)
    fig.canvas.draw_idle()

check.on_clicked(toggle_planes)

plt.show()
```

**Teacher Narration** `[75w]`
> Here's the 3D visualisation of the multivariable example. The colorful surface is our function. The red and blue semi-transparent planes are the bounds plus and minus the absolute value of y. You can see that near the origin the surface is squeezed between these two planes. Use the zoom slider to look closer, and toggle the planes off to see the surface alone. Notice that wherever you approach the origin, the surface goes to zero.

**Student Prompt:** Rotate the plot and zoom in to see the squeeze near the origin.

---

### Slide 15 · [CORE] 🟡
**Proof Sketch (Epsilon-Delta)**  ·  `full_width`

**On-screen text** `[11w]`
The Squeeze Theorem follows directly from the definition of a limit.

**FULL WIDTH** `[steps]`

**Proof:** Given $\epsilon>0$, since $\lim f = L$, $\exists \delta_1>0$ such that $0<|x-a|<\delta_1$ implies $|f(x)-L|<\epsilon$, i.e. $L-\epsilon < f(x) < L+\epsilon$.

Similarly, $\exists \delta_2>0$ such that $0<|x-a|<\delta_2$ implies $|h(x)-L|<\epsilon$, i.e. $L-\epsilon < h(x) < L+\epsilon$.

Let $\delta = \min(\delta_1,\delta_2)$. For $0<|x-a|<\delta$:
$$L-\epsilon < f(x) \leq g(x) \leq h(x) < L+\epsilon$$
Hence $|g(x)-L|<\epsilon$. QED.

**Teacher Narration** `[83w]`
> For completeness, here's a quick proof using epsilon and delta. Because both f and h approach L, for any epsilon we can find delta one and delta two such that f and h are within epsilon of L. Taking the smaller delta, we guarantee that for x within that delta, f is above L minus epsilon and h is below L plus epsilon. Since g is trapped between them, g must also be within epsilon of L. That's all there is to it.

---

### Slide 16 · [SUMMARY]
**Summary & Key Takeaways**  ·  `split_left_right`

**On-screen text** `[11w]`
Mastered: Squeeze Theorem – when direct limits fail, bound and squeeze.

**LEFT** `[concept]`

**Squeeze Theorem:** If $f \leq g \leq h$ near $a$ and $\lim f = \lim h = L$, then $\lim g = L$.

**Zero-Bound Corollary:** If $|g| \leq M$ and $M\to0$, then $g\to0$.

**When to use:** When direct limit laws fail (e.g., oscillating functions).

**Key examples today:**
- $x^2\cos(1/x), x\sin(1/x)$ → 0
- $\sin x/x$ → 1
- $\sin x/x$ as $x\to\infty$ → 0
- Multivariable limits

**RIGHT** `[visual_spec]`

*Visual Spec:* Create a 2x2 grid of small plots: (1) x^2 cos(1/x) with -x^2 and x^2, (2) x sin(1/x) with -|x| and |x|, (3) sin(x)/x with cos(x) and 1/cos(x), (4) multivariable surface with planes. Each with title and axis labels.

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2,2, figsize=(10,8))

# plot 1
x = np.linspace(-0.5,0.5,1000); x=x[x!=0]
ax=axes[0,0]; ax.plot(x, x**2*np.cos(1/x), 'b', lw=1); ax.plot(x, -x**2, 'r--'); ax.plot(x, x**2, 'g--')
ax.set_title('x^2 cos(1/x)'); ax.grid(alpha=0.3)

# plot 2
ax=axes[0,1]; ax.plot(x, x*np.sin(1/x), 'b', lw=1); ax.plot(x, -np.abs(x), 'r--'); ax.plot(x, np.abs(x), 'g--')
ax.set_title('x sin(1/x)'); ax.grid(alpha=0.3)

# plot 3
x = np.linspace(-1,1,1000); x=x[x!=0]
ax=axes[1,0]; ax.plot(x, np.sin(x)/x, 'b', lw=2); ax.plot(x, np.cos(x), 'r--'); ax.plot(x, 1/np.cos(x), 'g--')
ax.set_title('sin(x)/x'); ax.grid(alpha=0.3); ax.set_ylim(0,1.5)

# plot 4: no 3D, just 2D projection? Use simple f(x)=0 along line y=x? Better leave as text.
ax=axes[1,1]; ax.text(0.5,0.5,'Multivariable:\nsqueezed by |y|', ha='center', va='center', fontsize=12)
ax.set_title('Multivariable preview')

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[80w]`
> Let's recap what we've learned. The Squeeze Theorem is your go-to tool when limit laws break down, especially with oscillating functions. Remember the zero-bound corollary: if you can bound the absolute value of your function by something that goes to zero, you're done. We saw several examples: x squared cos one over x, x sin one over x, the classic sin x over x, and even a multivariable limit. Keep these examples in mind as templates for your own problems.

---
