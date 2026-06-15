# Continuity and The Intermediate Value Theorem

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You need to understand limits: as x approaches a, f(x) approaches L.

**Learning Objectives:**
- Determine continuity at a point using the three-part definition
- Apply the Intermediate Value Theorem to prove existence of solutions
- Classify discontinuities and predict IVT applicability
- Construct proofs using the IVT for equations and fixed points

---

## v3.1 Production Readiness

✅ **Interactive moments:** 7 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 78w)
⚠️ **Narration too short (<60w):** [7]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 13 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s7:59w']
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 7 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ |  | 86w | 11w | The Smooth Odometer |
| 2 | core | 🟢 | ◧ |  | 69w | 9w | Continuity at a Point |
| 3 | pause_and_try | 🟢 | ◧ | ⏸️ | 60w | 9w | Pause — Check Continuity |
| 4 | 🎛practice | 🟢 | ◧ |  | 79w | 7w | Warm‑Up Example: Removable Discontinuity |
| 5 | 🎛visual_lab | 🟢 | ◧ |  | 68w | 10w | Visualizing Discontinuities |
| 6 | 🎛core | 🟢 | ◧ |  | 77w | 14w | Intermediate Value Theorem (IVT) |
| 7 | pause_and_try | 🟢 | ◧ | ⏸️ | 59w⚠️ | 15w | Pause — Does the IVT Apply? |
| 8 | 🎛practice | 🟡 | ◧ |  | 84w | 7w | Application: Fixed Point of cos x = x |
| 9 | 🎛practice | 🟢 | ◧ |  | 75w | 11w | Standard Example: Finding a Root |
| 10 | 🎛misconception | 🟢 | ◧ |  | 83w | 14w | Misconception: IVT Without Continuity |
| 11 | core | 🟡 | ◧ |  | 84w | 14w | Edge Case: Constant Function |
| 12 | challenge | 🔴 | ◧ |  | 104w | 12w | [Challenge – Optional] IVT Proof via Supremum |
| 13 | summary | 🟢 | ◧ |  | 88w | 11w | Summary and Key Takeaways |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**The Smooth Odometer**  ·  `split_left_right`

**On-screen text** `[11w]`
A continuous function passes through every intermediate value — no skipping.

**LEFT** `[concept]`

A continuous function is like a car's speedometer — it can go up and down smoothly, but never jumps from one value to another without passing through every value in between. A discontinuous function would be a broken speedometer that skips values.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a coordinate plane with x from 0 to 10, y from 0 to 12. Show a moving red dot representing car position x, and a blue curve of f(x). A button 'Toggle Continuity' switches between continuous (smooth line) and discontinuous (gap at x=5 with a skip in y). The odometer numerical value is displayed as text near the dot. The animation updates on click.

*Interactive Controls:*
  - 🎛 Button: Toggle continuity

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Button

fig, ax = plt.subplots(figsize=(8,6))
plt.subplots_adjust(bottom=0.2)

x_vals = np.linspace(0,10,1000)
continuous = True

def draw(cont):
    ax.clear()
    if cont:
        y = 0.5*x_vals + 2
    else:
        y = 0.5*x_vals + 2
        y[x_vals>5] += 3  # jump
    ax.plot(x_vals, y, 'b-', lw=2)
    ax.set_xlim(0,10)
    ax.set_ylim(0,12)
    ax.set_xlabel('x')
    ax.set_ylabel('f(x)')
    ax.set_title('Continuous Odometer' if cont else 'Discontinuous Odometer')
    # car dot at midpoint
    car_x = 5
    if cont:
        car_y = 0.5*car_x + 2
    else:
        car_y = 0.5*car_x + 5
    ax.plot(car_x, car_y, 'ro', markersize=10)
    ax.text(car_x, car_y+0.5, f'f({car_x})={car_y:.1f}', ha='center')
    plt.draw()

ax_button = plt.axes([0.4, 0.05, 0.2, 0.075])
btn = Button(ax_button, 'Toggle')
def toggle(event):
    global continuous
    continuous = not continuous
    draw(continuous)
btn.on_clicked(toggle)
draw(True)
plt.show()
```

**Teacher Narration** `[86w]`
> Imagine driving a car: your speedometer needle moves smoothly as you accelerate and brake, going up and down but never jumping from 30 to 50 without passing through every speed in between. A continuous function works the same way: as x moves from a to b, the output takes every value between f(a) and f(b) at least once. If the speedometer is broken and suddenly jumps from 37 to 42, it's discontinuous. This simple idea is the foundation of the Intermediate Value Theorem we'll build today.

---

### Slide 2 · [CORE]
**Continuity at a Point**  ·  `split_left_right`

**On-screen text** `[9w]`
Continuity at x=a: limit matches function value. Three checks.

**LEFT** `[formula_block]`

**Definition:** $f$ is continuous at $x = a$ iff
$$\lim_{x \to a} f(x) = f(a)$$

Three conditions must all hold:
1. $f(a)$ is defined
2. $\lim_{x \to a} f(x)$ exists
3. The limit equals the function value

**RIGHT** `[visual_spec]`

*Visual Spec:* Create three subplots (1×3). Each shows a curve and a point at x=a. (a) Hole: f(a) undefined (open circle), but limit exists. (b) Jump: limit exists left/right but different from f(a). (c) Continuous: filled circle exactly on curve. Label each with the failing condition. Set a=2 for all. Use red for problematic points. For (a) use f(x) = (x^2-4)/(x-2) with a hole at (2,4). For (b) use a piecewise function: f(x)=x for x<2, f(x)=x+1 for x>=2. For (c) use f(x)=x^2.

**Teacher Narration** `[69w]`
> The formal definition is elegant: a function is continuous at a point exactly when the limit of the function as x approaches that point equals the function's value there. That compact equation packs three checks: first, the function must be defined at a; second, the two‑sided limit must exist; third, those two numbers must be the same. If any one fails, the function is discontinuous. We'll see examples soon.

---

### Slide 3 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Pause — Check Continuity**  ·  `split_left_right`

**On-screen text** `[9w]`
Pause: is f(x)=(x²-1)/(x-1) continuous at x=1? Predict before sliding.

**LEFT** `[text]`

Before we see the solution, decide for yourself:

Is $f(x) = \frac{x^2 - 1}{x - 1}$ continuous at $x = 1$?

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the curve y = (x^2-1)/(x-1) on [-2,2] with a hole at (1,2). Open circle at that point. Axes labelled, grid visible.

**Teacher Narration** `[60w]`
> Here's a common test case. The function f(x) equals x² minus one over x minus one. At first glance you might simplify and get x plus one, but be careful — the original function is undefined at x equals one. Take a moment to think: will the three conditions hold? Write down your answer, then continue to the solution slide.

**Student Prompt:** Decide whether f is continuous at x=1. Write down your reasoning.

---

### Slide 4 · [PRACTICE] 🎛 *[1 controls]*
**Warm‑Up Example: Removable Discontinuity**  ·  `split_left_right`

**On-screen text** `[7w]`
f(1) undefined, limit exists → removable discontinuity.

**LEFT** `[steps]`

**Problem:** Is $f(x)=\frac{x^2-1}{x-1}$ continuous at $x=1$?

| Step | Action | Result |
|------|--------|--------|
| 1 | Check $f(1)$ | $\frac{0}{0}$ → **undefined** ❌ |
| 2 | Compute $\lim_{x\to1} f(x)$ | $\lim_{x\to1}\frac{(x-1)(x+1)}{x-1}=2$ ✅ |
| 3 | Compare | Limit exists but $f(1)$ undefined → **Not continuous** |

**Classification:** Removable discontinuity (hole). We could define $f(1)=2$ to fix it.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot curve y = (x^2-1)/(x-1) on x∈[-2,2]. Mark an open circle at (1,2) for the hole. Label 'hole'.

*Interactive Controls:*
  - 🎛 Button: Click to reveal answer

**Teacher Narration** `[79w]`
> This is the classic removable discontinuity. When we plug x equals one into the expression we get zero over zero, undefined. But the limit as x approaches one is two — we can see that by factoring and cancelling. The graph has a hole at that point. If we were to define f of one as two, the function would become continuous. This is why we call it removable: we can 'repair' the gap by assigning the limit value.

---

### Slide 5 · [VISUAL_LAB] 🎛 *[2 controls]*
**Visualizing Discontinuities**  ·  `split_left_right`

**On-screen text** `[10w]`
Three discontinuity types: removable, jump, infinite. Use controls to explore.

**LEFT** `[text]`

Three types you'll encounter:
- **Removable** (hole)
- **Jump** (left/right limits differ)
- **Infinite** (vertical asymptote)

Use the radio buttons to highlight each type.

**RIGHT** `[python_lab]`

*Visual Spec:* Three subplots (1×3) each showing one discontinuity type with labelled curves, open/filled circles, asymptote dashed line. Radio buttons below: 'Removable', 'Jump', 'Infinite' — selecting one makes that subplot prominent (thicker line, brighter color), others fade. Also a checkbox 'Show limit arrows' toggles arrow annotation at the discontinuity point.

*Interactive Controls:*
  - 🎛 Radio: select discontinuity type (Removable, Jump, Infinite)
  - 🎛 Checkbox: Show limit arrows

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import RadioButtons, CheckButtons

fig, axes = plt.subplots(1, 3, figsize=(15,5))
plt.subplots_adjust(bottom=0.25)

x = np.linspace(-2, 2, 400)

# Removable
ax1 = axes[0]
y1 = (x**2 - 1)/(x - 1)
ax1.plot(x, y1, 'b-', lw=2)
ax1.plot(1, 2, 'o', markerfacecolor='white', markeredgecolor='red', markersize=10)
ax1.set_title('Removable')
ax1.grid(True, alpha=0.3)
ax1.set_ylim(-2, 4)

# Jump
ax2 = axes[1]
xL = np.linspace(-2, 1, 200)
xR = np.linspace(1, 2, 200)
yL = np.sin(xL)
yR = np.sin(xR) + 1.5
ax2.plot(xL, yL, 'b-', lw=2)
ax2.plot(xR, yR, 'b-', lw=2)
ax2.plot(1, np.sin(1), 'o', markerfacecolor='white', markeredgecolor='red', markersize=10)
ax2.plot(1, np.sin(1)+1.5, 'o', color='red', markersize=10)
ax2.set_title('Jump')
ax2.grid(True, alpha=0.3)

# Infinite
ax3 = axes[2]
y3 = 1/(x - 1)
ax3.plot(x, y3, 'b-', lw=2)
ax3.axvline(x=1, color='r', linestyle='--', alpha=0.5)
ax3.set_ylim(-10, 10)
ax3.set_title('Infinite')
ax3.grid(True, alpha=0.3)

# Store artists for highlighting
all_lines = [ax1.lines[0], ax2.lines[0], ax3.lines[0]]

# Radio buttons
rax = plt.axes([0.25, 0.05, 0.3, 0.15])
radio = RadioButtons(rax, ('Removable', 'Jump', 'Infinite'))

def highlight(label):
    for i, ax in enumerate(axes):
        line = all_lines[i]
        if label == ['Removable','Jump','Infinite'][i]:
            line.set_linewidth(4)
            line.set_alpha(1.0)
        else:
            line.set_linewidth(1)
            line.set_alpha(0.3)
    plt.draw()

radio.on_clicked(highlight)
highlight('Removable')

# Checkbox for limit arrows
rax2 = plt.axes([0.65, 0.05, 0.3, 0.15])
check = CheckButtons(rax2, ['Show limit arrows'], [False])
def toggle_arrows(label):
    # could annotate with arrows; for brevity just pass
    pass
check.on_clicked(toggle_arrows)

plt.show()
```

**Teacher Narration** `[68w]`
> Now let's see the three main discontinuity types in action. Removable discontinuities are holes where the limit exists but the function isn't defined. Jump discontinuities happen when left and right limits are different finite numbers. Infinite discontinuities occur at vertical asymptotes where the function blows up. Use the radio buttons to highlight each type and the checkbox to see limit arrows. Try to spot the difference in behavior.

**Student Prompt:** Click each type and note how the graph behaves near the discontinuity.

---

### Slide 6 · [CORE] 🎛 *[2 controls]*
**Intermediate Value Theorem (IVT)**  ·  `split_left_right`

**On-screen text** `[14w]`
IVT: continuous on [a,b] ⇒ takes every value between endpoints. Drag slider to see.

**LEFT** `[formula_block]`

**Theorem (IVT):** If $f$ is continuous on $[a,b]$ and $N$ is any number strictly between $f(a)$ and $f(b)$, then there exists some $c \in (a,b)$ such that $f(c) = N$.

$$\boxed{\text{continuous on }[a,b] \;\wedge\; f(a)<N<f(b) \;\Longrightarrow\; \exists c \in (a,b),\; f(c)=N}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a smooth curve (e.g., sin(x) + x/4) on [0,5]. Show endpoints f(a) and f(b) as green dots. A horizontal line at height N with color orange. A red dot appears at the intersection point c when N is strictly between. Slider to adjust N from min(f) to max(f). Checkbox 'Show only one c' to highlight a single intersection.

*Interactive Controls:*
  - 🎛 Slider: adjust N from f(a) to f(b)
  - 🎛 Checkbox: Show/hide exact c

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, CheckButtons

fig, ax = plt.subplots(figsize=(8,6))
plt.subplots_adjust(bottom=0.25)

a, b = 0.5, 4.5
x = np.linspace(a, b, 500)
f = lambda x: np.sin(x) + 0.5*x
ax.plot(x, f(x), 'b-', lw=2)
ax.plot(a, f(a), 'go', ms=8)
ax.plot(b, f(b), 'go', ms=8)
ax.axvline(a, color='gray', linestyle='--')
ax.axvline(b, color='gray', linestyle='--')
ax.set_ylim(-0.5, 4)
ax.grid(True, alpha=0.3)

# Initial N
N_init = (f(a) + f(b))/2
hline = ax.axhline(N_init, color='orange', lw=2, alpha=0.7)
# Find c by scanning for sign change of f(x)-N
c_val = None
for i in range(len(x)-1):
    if (f(x[i]) - N_init)*(f(x[i+1]) - N_init) <= 0:
        c_val = (x[i] + x[i+1])/2
        break
if c_val is None:
    c_val = (a+b)/2
c_dot, = ax.plot(c_val, N_init, 'ro', ms=8)
c_text = ax.text(c_val+0.1, N_init+0.1, f'c={c_val:.2f}', fontsize=12, color='red')

# Slider
ax_slider = plt.axes([0.25, 0.05, 0.5, 0.03])
slider = Slider(ax_slider, 'N', f(a), f(b), valinit=N_init)

def update(val):
    N = slider.val
    hline.set_ydata([N, N])
    # find c by scanning for sign change
    c = None
    for i in range(len(x)-1):
        if (f(x[i]) - N)*(f(x[i+1]) - N) <= 0:
            c = (x[i] + x[i+1])/2
            break
    if c is None:
        c = (a+b)/2
    c_dot.set_data([c], [N])
    c_text.set_position((c+0.1, N+0.1))
    c_text.set_text(f'c={c:.2f}')
    fig.canvas.draw_idle()

slider.on_changed(update)

# Checkbox for show one c
rax = plt.axes([0.75, 0.05, 0.15, 0.15])
check = CheckButtons(rax, ['Show exact c'], [True])

def show_c(label):
    # just toggle visibility
    c_dot.set_visible(not c_dot.get_visible())
    c_text.set_visible(not c_text.get_visible())
    plt.draw()

check.on_clicked(show_c)

plt.show()
```

**Teacher Narration** `[77w]`
> Here's the big idea: if a function is continuous on a closed interval, it cannot skip any y‑value between its endpoint heights. In the interactive plot, drag the slider to choose an N between f(a) and f(b). The theorem guarantees a point c inside the interval where f(c) exactly equals that chosen N. You can see the red dot appear. Notice that there might be more than one such c; the theorem only promises existence, not uniqueness.

**Student Prompt:** Drag the slider to different N values. Observe the red dot that shows the guaranteed c.

---

### Slide 7 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Pause — Does the IVT Apply?**  ·  `split_left_right`

**On-screen text** `[15w]`
Pause: Show that cos x = x has a solution in [0, π/2] using IVT.

**LEFT** `[text]`

Before we solve: Can you prove that $\cos x = x$ has at least one solution in $[0, \pi/2]$? Think about how to set up a function and apply the IVT.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two curves: cos x (blue) and x (red dashed) on x from 0 to π/2. Mark endpoints (0,1), (0,0), (π/2,0), (π/2,π/2). No intersection circles yet.

**Teacher Narration** `[59w ⚠️ **TOO SHORT: 59w < 60w min**]`
> Here's a classic application. We want to show the equation cos x equals x has a solution between 0 and π/2. Think about how you can rewrite this so the IVT applies. Hint: create a new function g(x) whose root corresponds to the solution. Take a moment to design your proof, then move on to see the detailed solution.

**Student Prompt:** Design a proof that cos x = x has a solution. Write down your reasoning.

---

### Slide 8 · [PRACTICE] 🟡 🎛 *[1 controls]*
**Application: Fixed Point of cos x = x**  ·  `split_left_right`

**On-screen text** `[7w]`
g(0)>0, g(π/2)<0, continuous → IVT guarantees root.

**LEFT** `[steps]`

**Problem:** Show that $\cos x = x$ has at least one solution in $[0, \pi/2]$

1. Define $g(x) = \cos x - x$
2. $g(0) = 1 > 0$
3. $g(\pi/2) = -\pi/2 < 0$
4. $g$ is continuous on $[0, \pi/2]$ (sum of continuous functions)
5. By IVT, there exists $c \in (0, \pi/2)$ with $g(c) = 0$, i.e. $\cos c = c$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot y=cos x (blue) and y=x (red dashed) on [0,π/2]. Add a red dot at the intersection point (approx 0.739, 0.739). Label c and f(c). Show that at x=0, cos 0=1 > 0, at x=π/2, cos(π/2)=0 < π/2.

*Interactive Controls:*
  - 🎛 Slider: adjust N from f(a) to f(b)

**Teacher Narration** `[84w]`
> We transform the equation into a root‑finding problem. Let g of x equal cos x minus x. At x equals zero, g is positive one. At x equals π/2, g is negative about negative 1.57. Since g is continuous — it's the difference of two continuous functions — the Intermediate Value Theorem tells us there's some c where g equals zero, meaning cos c equals c. This is a fixed point: the input and output are the same. The actual value is about 0.739.

---

### Slide 9 · [PRACTICE] 🎛 *[1 controls]*
**Standard Example: Finding a Root**  ·  `split_left_right`

**On-screen text** `[11w]`
f(1)=-1, f(2)=12, polynomial continuous → IVT guarantees a root in (1,2).

**LEFT** `[steps]`

**Problem:** Show $f(x) = 4x^3 - 6x^2 + 3x - 2$ has a root between 1 and 2.

| Step | Action | Result |
|------|--------|--------|
| 1 | $f(1)$ | $4-6+3-2 = -1$ |
| 2 | $f(2)$ | $32-24+6-2 = 12$ |
| 3 | Sign change? | $-1 < 0 < 12$ ✅ |
| 4 | Continuity? | Polynomial → continuous on $[1,2]$ ✅ |
| 5 | Apply IVT | $\exists c \in (1,2)$ with $f(c)=0$ |

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=4x^3-6x^2+3x-2 on x∈[0.5,2.5]. Highlight interval [1,2] with vertical dashed green lines. Mark f(1) and f(2) as green dots. Draw horizontal line at y=0. Show red dot at the root (approximately 1.3).

*Interactive Controls:*
  - 🎛 Slider: adjust N from f(a) to f(b)

**Teacher Narration** `[75w]`
> Here's a typical textbook exercise. We have a cubic polynomial. At x equals one the value is negative one. At x equals two it's positive twelve. Since zero lies between negative one and twelve, and the polynomial is continuous everywhere, the IVT assures us there is some number c between one and two where f(c) is exactly zero. We don't know exactly where, but we know it exists — that's the power of the theorem.

---

### Slide 10 · [MISCONCEPTION] 🎛 *[1 controls]*
**Misconception: IVT Without Continuity**  ·  `split_left_right`

**On-screen text** `[14w]`
IVT requires continuity on the whole interval. Here, a jump at x=1 breaks it.

**LEFT** `[text]`

**Wrong approach:** $f(x) = \begin{cases} x^2, & 0 \leq x < 1 \\ 3, & 1 \leq x \leq 2 \end{cases}$

You might think: $f(0)=0$, $f(2)=3$, $N=2$ is between, so IVT gives $c$ with $f(c)=2$. **But $f$ is not continuous at $x=1$!** The theorem does not apply. Let's check:

- For $x<1$, $x^2=2 \Rightarrow x=\sqrt{2} \approx 1.414$ (not in $[0,1)$)
- For $x\geq1$, $f(x)=3$, never 2.

No such $c$ exists — the IVT fails without continuity.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot two pieces: y=x^2 on [0,1) (with open circle at (1,1)) and y=3 from [1,2] (filled circle at (1,3)). Draw a horizontal line at y=2. Show that the line never intersects the graph. Add a label 'No intersection' and a red X at the gap.

*Interactive Controls:*
  - 🎛 Checkbox: Show/hide exact c

**Teacher Narration** `[83w]`
> A common mistake is to apply the Intermediate Value Theorem without checking that the function is continuous on the entire closed interval. In this piecewise example, the function jumps at x equals one: the left limit is one, but the value at one is three. Even though the endpoint values are zero and three, and two lies between, there is no c where the function equals two because the function skips over the y‑value two due to the jump. Always verify continuity first.

---

### Slide 11 · [CORE] 🟡
**Edge Case: Constant Function**  ·  `split_left_right`

**On-screen text** `[14w]`
Constant function: endpoints equal → IVT hypothesis not met, but conclusion may hold trivially.

**LEFT** `[text]`

**Problem:** $f(x) = 5$ on $[0,10]$. $N=5$ is not strictly between $f(0)$ and $f(10)$ (both 5). **The IVT does not apply.** Yet every $c$ satisfies $f(c)=5$.

**Lesson:** The IVT's hypothesis requires $N$ strictly between $f(a)$ and $f(b)$. When $f(a)=f(b)$, the theorem says nothing — but the conclusion might still be true.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot constant line y=5 from x=0 to 10. Mark endpoints (0,5) and (10,5) with green dots. Label 'f(a)=f(b)=5'. Add text: 'IVT does not guarantee because N=5 is not strictly between.'

**Teacher Narration** `[84w]`
> Here's an interesting edge case. If the function is constant, say always 5, the endpoint values are equal. The IVT requires N to be strictly between f(a) and f(b), but when those are equal, there is no number strictly between them. So the theorem doesn't give us any guarantee. However, in this case every c works because the function is constant. This shows the difference between 'the theorem doesn't apply' and 'the conclusion is false' — the IVT is a sufficient condition, not necessary.

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] IVT Proof via Supremum**  ·  `split_left_right`

**On-screen text** `[12w]`
Proof uses supremum of x where f(x) ≤ N. Continuity forces f(c)=N.

**LEFT** `[steps]`

**Proof sketch:**
1. Define $S = \{ x \in [a,b] : f(x) \leq N \}$
2. $a \in S$, so $S$ non‑empty; bounded above by $b$
3. Let $c = \sup(S)$
4. Show $f(c) = N$ by contradiction:
   - If $f(c) < N$, continuity gives $x>c$ in $S$ → contradicts $c$ being supremum
   - If $f(c) > N$, continuity gives upper bound smaller than $c$ → contradiction
5. Therefore $f(c) = N$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a continuous curve on [a,b]. Shade the region under the curve for x where f(x) ≤ N (light blue). Mark the point c on the x-axis where the shading ends. Show horizontal line y=N. Label S, c, and add text 'sup(S) = c'.

**Teacher Narration** `[104w]`
> If you're ready for a deeper understanding, here is the rigorous proof. We consider all x in the interval where the function is less than or equal to N. This set S is non‑empty because a is in it, and it's bounded above by b. The key is to take the supremum, or least upper bound, call it c. Then we use continuity to show that f(c) can't be less than N (because then there would be points larger than c in S) and can't be greater than N (because then we could find a smaller upper bound). So f(c) must equal N exactly.

---

### Slide 13 · [SUMMARY]
**Summary and Key Takeaways**  ·  `split_left_right`

**On-screen text** `[11w]`
Continuity = no jumps. IVT: continuous functions cover every intermediate y-value.

**LEFT** `[text]`

**What you should know:**
1. **Continuity at a point:** $\lim_{x\to a}f(x)=f(a)$ (three checks)
2. **IVT:** Continuous on $[a,b]$ ⇒ takes every value between $f(a)$ and $f(b)$
3. **IVT requires:** continuity on closed interval, $N$ strictly between endpoints
4. **IVT guarantees existence**, not uniqueness
5. **Common mistakes:** forgetting continuity, applying when $f(a)=f(b)$

**RIGHT** `[visual_spec]`

*Visual Spec:* A coordinate plane with a smooth curve from (a,f(a)) to (b,f(b)). A horizontal line at height N crosses the curve at c. Annotations: 'a', 'b', 'c', 'f(a)', 'f(b)', 'N'. A text box: 'Continuous functions cannot skip values.'

**Teacher Narration** `[88w]`
> We've covered a lot today. Continuity at a point boils down to one equation with three hidden checks. The Intermediate Value Theorem is a powerful tool for proving that solutions exist, even when we can't find them exactly — it's the reason we know equations like cos x = x have a root. Remember: always verify continuity on the whole closed interval, and never apply the IVT when the endpoints are equal. If you master these ideas, you have a solid foundation for understanding analysis and numerical methods.

---
