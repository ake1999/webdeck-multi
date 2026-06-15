# The Intuitive Concept of a Limit

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** Familiarity with functions, graphs, and basic algebra.

**Learning Objectives:**
- Calculate limits from graphs, tables, and algebraic expressions
- Interpret the meaning of a limit as the value a function approaches, not necessarily reaches
- Apply one-sided limits to determine if a two-sided limit exists
- Analyze functions at points of discontinuity to determine limit behavior

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 84w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 13 slides (target 12–18)
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
| 1 | hook | 🟢 | ◧ |  | 90w | 22w | What Is a Limit? |
| 2 | core | 🟢 | ◧ |  | 104w | 18w | The Core Definition |
| 3 | 🎛core | 🟢 | ◧ |  | 73w | 12w | One-Sided Limits |
| 4 | core | 🟢 | ◧ |  | 67w | 13w | Limit Existence Condition |
| 5 | 🎛visual_lab | 🟢 | ◧ |  | 96w | 21w | Epsilon-Delta Visualization |
| 6 | pause_and_try | 🟢 | ◧ | ⏸️ | 72w | 14w | Pause: Estimate a Limit from a Table |
| 7 | practice | 🟢 | ⬛⬛ |  | 73w | 9w | Example 2: Limit from a Table (Solution) |
| 8 | misconception | 🟢 | ◧ |  | 79w | 14w | Common Misconception: f(a) Confused with Limit |
| 9 | pause_and_try | 🟢 | ◧ | ⏸️ | 76w | 11w | Pause: Does This Limit Exist? |
| 10 | practice | 🟢 | ◧ |  | 75w | 13w | Example 4: Edge Case – Limit Does Not Exist |
| 11 | 🎛challenge | 🔴 | ◧ |  | 101w | 14w | [Challenge – Optional] Oscillating Function: sin(1/x) |
| 12 | core | 🟢 | ◧ |  | 84w | 12w | Sum Law for Limits |
| 13 | summary | 🟢 | ⬛⬛ |  | 96w | 12w | Summary: Key Ideas |

---

### Slide 1 · [HOOK]
**What Is a Limit?**  ·  `split_left_right`

**On-screen text** `[22w]`
A limit describes the value a function *approaches* as input gets closer to a point — regardless of whether it ever arrives.

**LEFT** `[concept]`

The word *approach* is all you need. When you walk toward a wall, your distance gets arbitrarily close to zero. That’s a limit: the destination a function heads toward, even if it never arrives.

**RIGHT** `[visual_spec]`

*Visual Spec:* Animated number line from 0 to 10. A red dot starts at 10 and moves toward 0 in steps: 5, 2.5, 1.25, ... showing distance decreasing. Label 'distance' and 'limit = 0'. Use a loop with time delay. Show current distance value as it updates.

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

fig, ax = plt.subplots(figsize=(6,2))
ax.set_xlim(0, 12)
ax.set_ylim(-0.5, 0.5)
ax.set_xlabel('distance')
ax.set_yticks([])
ax.axvline(0, color='red', linestyle='--', label='limit = 0')
ax.legend()
point, = ax.plot([], [], 'ro', markersize=10)
text = ax.text(1, 0.2, '', fontsize=12)

def init():
    point.set_data([], [])
    text.set_text('')
    return point, text

def animate(i):
    x = 10 / (2**i)
    point.set_data([x], [0])
    text.set_text(f'distance = {x:.3f}')
    return point, text

ani = FuncAnimation(fig, animate, frames=range(0, 10), init_func=init, interval=800, repeat=False)
plt.show()
```

**Teacher Narration** `[90w]`
> Welcome to calculus. The word approach is all you need to understand limits conceptually. If you have ever walked toward a wall, you already know what a limit is. Your distance from the wall gets smaller and smaller, approaching zero. That is exactly the idea: a limit tells us the destination a function is heading toward, even if it never actually gets there. In this lesson, we will build on that intuition, learn how to compute limits from graphs, tables, and formulas, and explore cases where limits fail to exist.

---

### Slide 2 · [CORE]
**The Core Definition**  ·  `split_left_right`

**On-screen text** `[18w]`
Limit exists if values get arbitrarily close to L as x approaches a from either side. f(a) irrelevant.

**LEFT** `[formula_block]`

$$\lim_{x \to a} f(x) = L$$

As $x$ gets arbitrarily close to $a$ (from either side), $f(x)$ gets arbitrarily close to $L$.

**Does not require** $f(a)$ to exist or equal $L$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of f(x) = (x^2 - 4)/(x - 2) with a hole at (2,4). x-axis from 0 to 4, y-axis from 0 to 8. Show two arrows approaching the hole from left and right, converging to y=4. Use dashed vertical line at x=2 and horizontal line at y=4 labeled 'L'. Animate arrows if possible.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 4, 400)
x = x[x != 2]
y = (x**2 - 4) / (x - 2)

plt.figure(figsize=(6,4))
plt.plot(x, y, 'b-', linewidth=2, label='f(x) = (x²-4)/(x-2)')
plt.scatter(2, 4, color='red', s=100, facecolors='none', edgecolors='red', linewidth=2, zorder=5)
plt.axvline(2, color='gray', linestyle='--', alpha=0.5)
plt.axhline(4, color='green', linestyle='--', alpha=0.5, label='L = 4')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Limit exists despite hole')
plt.legend()
plt.grid(alpha=0.3)
plt.xlim(0,4)
plt.ylim(0,8)
plt.show()
```

**Teacher Narration** `[104w]`
> Here is the formal idea: the limit of f of x as x approaches a equals L if we can make f of x as close to L as we like by taking x sufficiently close to a. Notice we do not care what happens exactly at x equals a. The function may be undefined or have a different value there. What matters is the behavior nearby. On the right you see a classic example: f of x equals x squared minus 4 over x minus 2. At x equals 2, the function is undefined, but the graph clearly approaches 4 from both sides.

---

### Slide 3 · [CORE] 🎛 *[2 controls]*
**One-Sided Limits**  ·  `split_left_right`

**On-screen text** `[12w]`
Left-hand limit: approach from smaller x. Right-hand limit: approach from larger x.

**LEFT** `[formula_block]`

Left-hand limit: $$\lim_{x \to a^-} f(x)$$
Right-hand limit: $$\lim_{x \to a^+} f(x)$$

$x \to a^-$: from below (smaller values)
$x \to a^+$: from above (larger values)

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of f(x)=|x|/x. x-axis from -2 to 2, y from -2 to 2. For x<0, y=-1 (blue line); for x>0, y=1 (red line). Open circle at (0,0). Arrows approaching 0 from left and right. Animate if possible. Include buttons to toggle left/right limit display.

*Interactive Controls:*
  - 🎛 Button: toggle left limit visibility
  - 🎛 Button: toggle right limit visibility

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Button

fig, ax = plt.subplots(figsize=(6,4))
plt.subplots_adjust(bottom=0.2)

x_left = np.linspace(-2, -0.01, 100)
x_right = np.linspace(0.01, 2, 100)
line_left, = ax.plot(x_left, [-1]*len(x_left), 'b-', lw=2, label='Left: -1')
line_right, = ax.plot(x_right, [1]*len(x_right), 'r-', lw=2, label='Right: 1')
ax.axvline(0, color='gray', ls='--', alpha=0.5)
ax.scatter(0,0, s=100, facecolors='none', edgecolors='black', linewidth=2, zorder=5)
ax.set_xlim(-2,2)
ax.set_ylim(-2,2)
ax.set_xlabel('x')
ax.set_ylabel('f(x) = |x|/x')
ax.set_title('One-sided limits differ')
ax.legend()
ax.grid(alpha=0.3)

# Buttons to toggle visibility
ax_left_button = plt.axes([0.3, 0.05, 0.15, 0.075])
ax_right_button = plt.axes([0.55, 0.05, 0.15, 0.075])
btn_left = Button(ax_left_button, 'Show Left')
btn_right = Button(ax_right_button, 'Show Right')

def toggle_left(event):
    line_left.set_visible(not line_left.get_visible())
    plt.draw()
def toggle_right(event):
    line_right.set_visible(not line_right.get_visible())
    plt.draw()

btn_left.on_clicked(toggle_left)
btn_right.on_clicked(toggle_right)

plt.show()
```

**Teacher Narration** `[73w]`
> Sometimes the function behaves differently depending on which side we approach from. That is why we have one-sided limits. The left-hand limit considers x approaching a from values less than a, and the right-hand limit from values greater. For the absolute value function shown, left limit is negative 1, right limit is positive 1. Because they are different, the two-sided limit does not exist. You can use the buttons to isolate each side.

---

### Slide 4 · [CORE]
**Limit Existence Condition**  ·  `split_left_right`

**On-screen text** `[13w]`
Two-sided limit exists iff left and right limits both exist and are equal.

**LEFT** `[formula_block]`

$$\lim_{x \to a} f(x) = L \quad \iff \quad \lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L$$

Both one-sided limits must exist and be equal for the two-sided limit to exist.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of f(x) = { x+1 for x<2, 4 for x=2, -x+5 for x>2 }. x from 0 to 4, y from 0 to 6. Show left branch approaching (2,3), right branch approaching (2,3). Point at (2,4) as a solid dot. Dashed lines at x=2 and y=3. Left and right arrows converge to y=3.

```python
import numpy as np
import matplotlib.pyplot as plt

x_left = np.linspace(0, 2, 100)
x_right = np.linspace(2, 4, 100)
y_left = x_left + 1
y_right = -x_right + 5

plt.figure(figsize=(6,4))
plt.plot(x_left, y_left, 'b-', lw=2, label='x<2: x+1')
plt.plot(x_right, y_right, 'r-', lw=2, label='x>2: -x+5')
plt.scatter(2, 4, color='green', s=100, zorder=5, label='f(2)=4')
plt.axvline(2, color='gray', ls='--', alpha=0.5)
plt.axhline(3, color='purple', ls='--', alpha=0.5, label='limit = 3')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Limit exists regardless of function value at a')
plt.legend()
plt.grid(alpha=0.3)
plt.xlim(0,4)
plt.ylim(0,6)
plt.show()
```

**Teacher Narration** `[67w]`
> Here is the key condition: for the two-sided limit to exist, the left and right limits must both exist and be exactly the same number. Look at this piecewise function. Even though f of 2 equals 4, both sides approach 3. So the limit is 3. This shows that the function value at the point does not affect the limit. The limit cares only about nearby behavior.

---

### Slide 5 · [VISUAL_LAB] 🎛 *[2 controls]*
**Epsilon-Delta Visualization**  ·  `split_left_right`

**On-screen text** `[21w]`
For any epsilon band around L, we can find a delta band around a so f(x) stays in the epsilon band.

**LEFT** `[concept]`

The formal definition: For any $\varepsilon > 0$, there exists a $\delta > 0$ such that if $0 < |x - a| < \delta$, then $|f(x) - L| < \varepsilon$.

Use the sliders to explore how $\delta$ depends on $\varepsilon$.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot of f(x)=x^2 near a=2 (L=4). Show horizontal band between L-ε and L+ε, vertical band between a-δ and a+δ. Sliders for epsilon (0.1 to 2) and delta (0.01 to 1). The vertical band width should adjust with delta; highlight if condition holds (all points in vertical band stay within horizontal band).

*Interactive Controls:*
  - 🎛 Slider for epsilon from 0.1 to 2
  - 🎛 Slider for delta from 0.01 to 1

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(6,4))
plt.subplots_adjust(bottom=0.25)

x = np.linspace(1.5, 2.5, 400)
y = x**2
a = 2
L = 4

line, = ax.plot(x, y, 'b-', lw=2, label='f(x)=x²')
ax.axvline(a, color='gray', ls='--', alpha=0.5)
ax.axhline(L, color='green', ls='--', alpha=0.7, label='L=4')

# Initial epsilon and delta
eps_init = 0.5
del_init = 0.15

# Horizontal band (epsilon)
band_h = ax.axhspan(L-eps_init, L+eps_init, color='red', alpha=0.2, label=f'ε={eps_init:.2f}')
# Vertical band (delta)
band_v = ax.axvspan(a-del_init, a+del_init, color='purple', alpha=0.2, label=f'δ={del_init:.2f}')

ax.set_xlim(1.5, 2.5)
ax.set_ylim(0, 8)
ax.set_xlabel('x')
ax.set_ylabel('f(x)')
ax.set_title('Epsilon-Delta Definition')
ax.legend(loc='upper left')
ax.grid(alpha=0.3)

# Sliders
ax_eps = plt.axes([0.2, 0.1, 0.6, 0.03])
ax_del = plt.axes([0.2, 0.05, 0.6, 0.03])
slider_eps = Slider(ax_eps, 'ε', 0.1, 2.0, valinit=eps_init)
slider_del = Slider(ax_del, 'δ', 0.01, 1.0, valinit=del_init)

def update(val):
    eps = slider_eps.val
    delta = slider_del.val
    # Update bands
    # Remove old bands and redraw? Simpler: clear and redraw filled regions? Use ax.collections
    # Efficient: update poly vertices
    from matplotlib.patches import Rectangle
    # Remove old rectangles
    for coll in [band_h, band_v]:
        coll.remove()
    band_h = ax.axhspan(L-eps, L+eps, color='red', alpha=0.2)
    band_v = ax.axvspan(a-delta, a+delta, color='purple', alpha=0.2)
    fig.canvas.draw_idle()

slider_eps.on_changed(update)
slider_del.on_changed(update)

plt.show()
```

**Teacher Narration** `[96w]`
> This interactive tool brings the formal epsilon-delta definition to life. Imagine you choose a small epsilon, represented by the red horizontal band around L. The question is: can we find a delta, the purple vertical band around a, such that every x within delta of a gives an f of x within epsilon of L? If we can always do this for any epsilon, the limit exists. Try sliding epsilon to a small value and see if you can adjust delta to satisfy the condition. Notice that as epsilon shrinks, delta may need to shrink too.

**Student Prompt:** What happens to delta when you make epsilon very small, say 0.1?

---

### Slide 6 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Pause: Estimate a Limit from a Table**  ·  `split_left_right`

**On-screen text** `[14w]`
From the table, as x gets closer to 1, f(x) gets closer to ...?

**LEFT** `[steps]`

Consider $f(x) = \frac{x^2 - 1}{x - 1}$ near $x=1$.

| $x$ | $f(x)$ |
|-----|--------|
| 0.9 | 1.9    |
| 0.99| 1.99   |
| 0.999| 1.999 |
| 1.001| 2.001 |
| 1.01 | 2.01   |
| 1.1  | 2.1    |

**Predict:** What is $\lim_{x \to 1} f(x)$?

**RIGHT** `[visual_spec]`

*Visual Spec:* Simple coordinate plane with x from 0.8 to 1.2, y from 1.8 to 2.2. No curve drawn. Dashed vertical line at x=1. Label '?' at (1,2).

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(5,4))
ax.set_xlim(0.8, 1.2)
ax.set_ylim(1.8, 2.2)
ax.axvline(1, color='gray', ls='--', alpha=0.5)
ax.scatter(1, 2, color='red', s=100, facecolors='none', edgecolors='red', linewidth=2)
ax.set_xlabel('x')
ax.set_ylabel('f(x)')
ax.set_title('Estimate the limit')
ax.grid(alpha=0.3)
plt.show()
```

**Teacher Narration** `[72w]`
> Now it is your turn. Look at this table of values for f of x equals x squared minus 1 over x minus 1 near x equals 1. As x approaches 1 from the left with values 0.9, 0.99, 0.999, what do you notice about f of x? And from the right with values 1.001, 1.01, 1.1? Pause the video and try to guess the limit. Then continue to see the answer.

**Student Prompt:** What is the limit? Write your guess.

---

### Slide 7 · [PRACTICE]
**Example 2: Limit from a Table (Solution)**  ·  `full_width`

**On-screen text** `[9w]`
Limit = 2. f(1) undefined (0/0) but limit exists.

**FULL WIDTH** `[steps]`

**Solution:** As $x \to 1$ from either side, $f(x) \to 2$. 

$$\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = 2$$

Notice $f(1)$ is undefined (0/0), but the limit exists. This pattern is fundamental for derivatives.

**Teacher Narration** `[73w]`
> The answer is 2. As x gets closer and closer to 1, f of x gets closer to 2. The table shows that the function values approach 2 from both sides, even though f of 1 is undefined because of division by zero. This is a classic example of a removable discontinuity, and it previews the idea behind derivatives: the slope of a tangent line is a limit of slopes of secant lines.

---

### Slide 8 · [MISCONCEPTION]
**Common Misconception: f(a) Confused with Limit**  ·  `split_left_right`

**On-screen text** `[14w]`
Wrong: f(a) = limit. Right: f(a) can differ from limit. Limit uses nearby behavior.

**LEFT** `[concept]`

**Wrong thinking:** "$f(2)=4$, so the limit at $x=2$ is 4."

**Correct:** Limit looks at nearby values, not at the point.

Example: $$f(x)=\begin{cases} x+1, & x<2 \\ 4, & x=2 \\ -x+5, & x>2 \end{cases}$$

$f(2)=4$, but $\lim_{x\to2}f(x)=3$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Same graph as slide 4 but with annotations: red circle at (2,4) labeled 'f(2)=4 (irrelevant)', green dashed horizontal line at y=3 labeled 'limit = 3'. An arrow from (2,4) pointing to the hole at (2,3).

```python
import numpy as np
import matplotlib.pyplot as plt

x_left = np.linspace(0, 2, 100)
x_right = np.linspace(2, 4, 100)
y_left = x_left + 1
y_right = -x_right + 5

plt.figure(figsize=(6,4))
plt.plot(x_left, y_left, 'b-', lw=2, label='x<2: x+1')
plt.plot(x_right, y_right, 'r-', lw=2, label='x>2: -x+5')
plt.scatter(2, 4, color='green', s=150, zorder=5, label='f(2)=4 (not limit)')
plt.axhline(3, color='purple', ls='--', lw=2, label='limit = 3')
plt.annotate('', xy=(2, 3), xytext=(2, 4),
             arrowprops=dict(arrowstyle='->', connectionstyle='arc3', color='red', lw=2))
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Misconception: f(a) ≠ limit')
plt.legend()
plt.grid(alpha=0.3)
plt.xlim(0,4)
plt.ylim(0,6)
plt.show()
```

**Teacher Narration** `[79w]`
> A very common mistake is to think that the limit equals the function value at the point. That is false. The limit is about what the function approaches near the point, not what it equals at the point. Look at this piecewise function. At x equals 2, the function value is 4, but the limit is 3 because both sides approach 3. The function value at the point does not matter for the limit. This is a critical insight.

---

### Slide 9 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Pause: Does This Limit Exist?**  ·  `split_left_right`

**On-screen text** `[11w]`
Left side approaches -1, right side approaches 1. Do they agree?

**LEFT** `[concept]`

Consider $f(x) = \frac{|x|}{x}$ near $x=0$.

Left side: values negative (close to -1)
Right side: values positive (close to 1)

**Predict:** Does $\lim_{x \to 0} \frac{|x|}{x}$ exist?

**RIGHT** `[visual_spec]`

*Visual Spec:* Same as slide 3 but only axes without curves? Or show curves but with question marks. Better: display the two constant lines with dotted continuation to 0, but a question mark at x=0. No labels for left/right limits yet.

```python
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6,4))
ax.set_xlim(-2,2)
ax.set_ylim(-2,2)
ax.axhline(0, color='gray')
ax.axvline(0, color='gray')
# Draw dashed lines indicating possible limits
ax.plot([-2, -0.01], [-1, -1], 'b--', lw=1.5)
ax.plot([0.01, 2], [1, 1], 'r--', lw=1.5)
ax.scatter(0,0, s=150, facecolors='none', edgecolors='black', linewidth=2, zorder=5)
ax.text(0, 0.5, '?', fontsize=24, ha='center')
ax.set_xlabel('x')
ax.set_ylabel('f(x)')
ax.set_title('Does the limit exist at x=0?')
ax.grid(alpha=0.3)
plt.show()
```

**Teacher Narration** `[76w]`
> Let's test another function: the absolute value of x divided by x. For x negative, the absolute value is negative x, so the function equals negative 1. For x positive, it equals positive 1. As x approaches 0 from the left, the function is constantly negative 1. From the right, it is constantly positive 1. Pause the video and decide: does the two-sided limit exist? Think about whether the left and right limits are the same.

**Student Prompt:** Does the limit exist? Answer: Yes or No, and why.

---

### Slide 10 · [PRACTICE]
**Example 4: Edge Case – Limit Does Not Exist**  ·  `split_left_right`

**On-screen text** `[13w]`
Left limit = -1, right limit = 1. They differ → limit DNE.

**LEFT** `[steps]`

**Solution:**

1. Left: $\lim_{x\to0^-} \frac{|x|}{x} = -1$
2. Right: $\lim_{x\to0^+} \frac{|x|}{x} = 1$
3. Since $-1 \neq 1$, the two-sided limit **does not exist**.

**RIGHT** `[visual_spec]`

*Visual Spec:* Same graph as slide 3, but add text labels: '-1 (left limit)' on left side, '1 (right limit)' on right side. Add a red X over the limit notation at the top.

```python
import numpy as np
import matplotlib.pyplot as plt

x_left = np.linspace(-2, -0.01, 100)
x_right = np.linspace(0.01, 2, 100)

plt.figure(figsize=(6,4))
plt.plot(x_left, [-1]*len(x_left), 'b-', lw=2, label='Left: -1')
plt.plot(x_right, [1]*len(x_right), 'r-', lw=2, label='Right: 1')
plt.axvline(0, color='gray', ls='--', alpha=0.5)
plt.scatter(0,0, s=100, facecolors='none', edgecolors='black', linewidth=2)
plt.text(-1.5, -0.5, 'Left limit = -1', fontsize=12, color='blue')
plt.text(0.8, 1.2, 'Right limit = 1', fontsize=12, color='red')
plt.text(0.5, -1.8, 'Two-sided limit DNE', fontsize=14, color='red', fontweight='bold')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Limit Does Not Exist (DNE)')
plt.legend()
plt.grid(alpha=0.3)
plt.xlim(-2,2)
plt.ylim(-2,2)
plt.show()
```

**Teacher Narration** `[75w]`
> The answer is that the limit does not exist. The left-hand limit is negative 1, the right-hand limit is positive 1. Since they are not equal, there is no single value that the function approaches. This is a classic example of a jump discontinuity where the one-sided limits exist but are different. Remember that the function does not have to be complicated for a limit to fail; a simple piecewise constant function can do it.

---

### Slide 11 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Oscillating Function: sin(1/x)**  ·  `split_left_right`

**On-screen text** `[14w]`
sin(1/x) oscillates infinitely often as x→0. Cannot settle near one value → limit DNE.

**LEFT** `[concept]`

Consider $f(x) = \sin\left(\frac{1}{x}\right)$ near $x=0$.

- Approaches 0 for some sequences (e.g., $x_n = 1/(\pi n)$)
- Approaches 1 for other sequences (e.g., $x_n = 1/(\pi/2 + 2\pi n)$)
- Oscillates infinitely often near 0.

**Conclusion:** Limit does not exist.

**RIGHT** `[visual_lab]`

*Visual Spec:* Plot sin(1/x) for x from -1 to 1. Use slider to zoom in near 0. Initially show x from 0.01 to 1. Slider for upper bound of x (1.0 to 0.001). Show that as you zoom in, oscillations become more rapid. Also show two points: one at x=1/(pi n) which gives 0, another at x=1/(pi/2+2pi n) which gives 1.

*Interactive Controls:*
  - 🎛 Slider to zoom in on x near 0 (change upper x limit)

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, ax = plt.subplots(figsize=(6,4))
plt.subplots_adjust(bottom=0.2)

x_min = 0.01
x_max = 1.0
x = np.linspace(x_min, x_max, 1000)
y = np.sin(1/x)

line, = ax.plot(x, y, 'b-', lw=1)
ax.set_xlim(0, 1)
ax.set_ylim(-1.5, 1.5)
ax.set_xlabel('x')
ax.set_ylabel('sin(1/x)')
ax.set_title('Oscillating near 0')
ax.grid(alpha=0.3)

ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_slider, 'Zoom (x_max)', 0.001, 1.0, valinit=1.0)

def update(val):
    new_max = slider.val
    x_new = np.linspace(new_max/100, new_max, 1000)
    y_new = np.sin(1/x_new)
    line.set_data(x_new, y_new)
    ax.set_xlim(0, new_max)
    fig.canvas.draw_idle()

slider.on_changed(update)

plt.show()
```

**Teacher Narration** `[101w]`
> Here is a more exotic example: f of x equals sine of 1 over x. As x approaches 0, the argument 1 over x becomes huge, so sine oscillates between negative 1 and 1 infinitely many times. No matter how close you get to 0, the function keeps jumping. You can zoom in with the slider and see that the oscillations become so rapid that the function never approaches a single number. Therefore, the limit does not exist. This function is important because it shows that even a continuous-looking graph can fail to have a limit if it oscillates too much.

**Student Prompt:** Adjust the slider. What do you notice about the frequency of oscillation as you zoom in?

---

### Slide 12 · [CORE]
**Sum Law for Limits**  ·  `split_left_right`

**On-screen text** `[12w]`
Limit of a sum = sum of limits, provided each limit exists.

**LEFT** `[formula_block]`

If $\lim_{x\to a} f(x) = L$ and $\lim_{x\to a} g(x) = M$, then

$$\lim_{x\to a} [f(x) + g(x)] = L + M$$

**Applies only if both individual limits exist.**

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two functions: f(x) approaching 3 at x=1 (blue) and g(x) approaching 5 at x=1 (red). Third plot of f+g approaching 8 (green). Use dashed lines at y=3,5,8. Animate if possible.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 2, 400)
f = 3 + (x-1)**2  # example approaching 3 at x=1
g = 5 - (x-1)**2  # approaching 5
sum_fg = f + g

plt.figure(figsize=(6,4))
plt.plot(x, f, 'b-', lw=2, label='f(x) → 3')
plt.plot(x, g, 'r-', lw=2, label='g(x) → 5')
plt.plot(x, sum_fg, 'g-', lw=2, label='f(x)+g(x) → 8')
plt.axhline(3, color='blue', ls='--', alpha=0.5)
plt.axhline(5, color='red', ls='--', alpha=0.5)
plt.axhline(8, color='green', ls='--', alpha=0.5)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Sum Law: limit of sum = sum of limits')
plt.legend()
plt.grid(alpha=0.3)
plt.xlim(0,2)
plt.ylim(0,12)
plt.show()
```

**Teacher Narration** `[84w]`
> Now that we have a solid intuition for limits, we can start building algebraic tools. The sum law says that the limit of a sum is the sum of the limits, as long as both limits exist. This is intuitive: if f gets close to L and g gets close to M, their sum gets close to L plus M. The graph shows two functions approaching 3 and 5 respectively, and their sum approaching 8. This law is a workhorse for computing limits algebraically.

---

### Slide 13 · [SUMMARY]
**Summary: Key Ideas**  ·  `full_width`

**On-screen text** `[12w]`
Limits are about approach, not arrival. One-sided limits must agree. f(a) irrelevant.

**FULL WIDTH** `[concept]`

1. A limit describes the value a function **approaches**, not necessarily reaches.
2. One-sided limits: $\lim_{x\to a^-}$ and $\lim_{x\to a^+}$.
3. Two-sided limit exists iff one-sided limits exist and are equal.
4. $f(a)$ can differ from $\lim_{x\to a}f(x)$.
5. Limits can be found from graphs, tables, or algebra.
6. Limits fail if one-sided limits differ or function oscillates.
7. Sum law: $\lim (f+g) = \lim f + \lim g$ when both exist.

**Teacher Narration** `[96w]`
> Let's recap. The most important idea is that a limit is the value a function approaches, regardless of what happens at the point itself. We learned about one-sided limits and that for a two-sided limit to exist, the left and right must agree. We saw examples where the limit exists despite a hole, where it fails because of a jump, and even where it fails due to wild oscillation. Finally, we introduced the sum law, which is one of several algebraic limit laws. In the next lesson, we will use these laws to compute limits analytically.

---
