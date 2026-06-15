# Review of Functions and Graphs

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 92%

> **Prerequisite:** Assumes familiarity with Cartesian coordinates, the concept of a function as a mapping from inputs to outputs, and basic algebra including solving equations and inequalities.

**Learning Objectives:**
- Identify and classify essential function families (linear, quadratic, power, polynomial, rational, trigonometric, exponential, logarithmic).
- Apply transformations (shifts, reflections, stretches) to graph functions from parent graphs.
- Calculate domains, ranges, and compositions of functions systematically.
- Interpret function behavior from graphs including symmetry and asymptotes.
- Analyze piecewise functions and determine their properties algebraically and graphically.

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 82w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
⚠️ **visual_labs**: 0 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
⚠️ **visual_specs**: missing on slides: [8]
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
| 1 | hook | 🟢 | ◧ |  | 93w | 15w | Functions Are Like Vending Machines |
| 2 | core | 🟢 | ◧ |  | 74w | 12w | Function Families at a Glance |
| 3 | 🎛core | 🟢 | ◧ | ⏸️ | 85w | 15w | Vertical and Horizontal Shifts |
| 4 | 🎛core | 🟢 | ◧ |  | 83w | 8w | Stretches and Reflections |
| 5 | misconception | 🟢 | ◧ | ⏸️ | 97w | 23w | Common Mistake: Horizontal Shift Direction |
| 6 | 🎛core | 🟢 | ◧ |  | 87w | 14w | Composition of Functions |
| 7 | core | 🟢 | ◧ | ⏸️ | 75w | 9w | Even and Odd Functions |
| 8 | practice | 🟢 | ◧ |  | 71w | 9w | Example 1: Domain and Range (Warm-Up) |
| 9 | practice | 🟢 | ◧ |  | 77w | 10w | Example 2: Transformation Sequence (Standard) |
| 10 | practice | 🟡 | ⬛⬛ |  | 69w | 8w | Example 3: Composition Domain (Tricky) |
| 11 | practice | 🟡 | ◧ |  | 78w | 15w | Example 4: Even or Odd? (Edge Case) |
| 12 | practice | 🟡 | ⬛⬛ |  | 107w | 12w | Example 5: Piecewise Function (Application) |
| 13 | challenge | 🔴 | ⬛⬛ |  | 75w | 12w | [Challenge – Optional] Product of Even and Odd Functions |
| 14 | summary | 🟢 | ⬛⬛ |  | 71w | 10w | Key Takeaways |

---

### Slide 1 · [HOOK]
**Functions Are Like Vending Machines**  ·  `split_left_right`

**On-screen text** `[15w]`
Function: each input → exactly one output. Domain: all possible inputs. Range: all possible outputs.

**LEFT** `[concept]`

Each button (input $x$) gives exactly one snack (output $f(x)$). The domain is the set of working buttons; the range is the snacks available. Transformations move the whole machine without changing the snacks.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a simple vending machine: a rectangle with buttons labeled 1,2,3 and a dispenser slot. Next to each button, show the output snack: Button 1 → chips, Button 2 → chocolate, etc. Below, show a coordinate plane with a few point mappings (e.g., (1, chips), (2, chocolate)). Add arrows connecting button numbers to snacks. Use a cartoon style with labels.

**Teacher Narration** `[93w]`
> Think of a function like a vending machine. You press a button, say number 3, and you always get the same snack—no surprises. The domain is the set of buttons that actually work; some might be missing or broken. The range is the set of snacks you can actually get. Now imagine you can move that vending machine across the room, flip it upside down, or stretch it taller. That's exactly what function transformations do: the relationship between button and snack stays the same, but the graph shifts or stretches in predictable ways.

---

### Slide 2 · [CORE]
**Function Families at a Glance**  ·  `split_left_right`

**On-screen text** `[12w]`
Eight core function families: linear, quadratic, power, polynomial, rational, trig, exponential, logarithmic.

**LEFT** `[formula_block]`

**Linear:** $f(x)=mx+b$<br>**Quadratic:** $f(x)=ax^2+bx+c$<br>**Power:** $f(x)=x^a$ where $a$ is a real constant (e.g., integer, fractional, negative)<br>**Polynomial:** $f(x)=a_n x^n+\dots +a_0$<br>**Rational:** $f(x)=P(x)/Q(x)$<br>**Trigonometric:** $\sin x,\cos x,\tan x$<br>**Exponential:** $f(x)=a^x$<br>**Logarithmic:** $f(x)=\log_a x$

**RIGHT** `[visual_spec]`

*Visual Spec:* Create a 2x4 grid of subplots. Top row: linear (slope 1, intercept 0), quadratic (x^2), power (x^(1/2)), polynomial (x^3). Bottom row: rational (1/x), trigonometric (sin x), exponential (2^x), logarithmic (log_2 x). Each subplot has axes, grid, and title. Use different colors for each curve. x-range about -3 to 3, y-range adjusted to show key shape.

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3, 3, 400)
fig, axes = plt.subplots(2, 4, figsize=(12, 6))
axes[0,0].plot(x, x, 'b')
axes[0,0].set_title('Linear')
axes[0,1].plot(x, x**2, 'r')
axes[0,1].set_title('Quadratic')
axes[0,2].plot(x[x>0], np.sqrt(x[x>0]), 'g')
axes[0,2].set_title('Power (sqrt)')
axes[0,3].plot(x, x**3, 'm')
axes[0,3].set_title('Polynomial (cubic)')
axes[1,0].plot(x[x!=0], 1/x[x!=0], 'c')
axes[1,0].set_ylim(-5,5); axes[1,0].set_title('Rational')
axes[1,1].plot(x, np.sin(x), 'orange')
axes[1,1].set_title('Sine')
axes[1,2].plot(x, 2**x, 'purple')
axes[1,2].set_title('Exponential')
axes[1,3].plot(x[x>0], np.log2(x[x>0]), 'brown')
axes[1,3].set_title('Logarithmic')
for ax in axes.flat: ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[74w]`
> Before we transform functions, let's quickly recall the main families you'll encounter. Linear functions give straight lines. Quadratics give parabolas. Power functions include square roots and cubes. Polynomials are sums of power functions with integer exponents. Rational functions are fractions of polynomials. Trigonometric functions like sine and cosine repeat periodically. Exponential functions grow or decay rapidly. Logarithms are inverses of exponentials. Each family has a distinct shape that we can shift, stretch, and reflect.

---

### Slide 3 · [CORE] ⏸️ *[YouTube Pause]* 🎛 *[3 controls]*
**Vertical and Horizontal Shifts**  ·  `split_left_right`

**On-screen text** `[15w]`
Vertical shift: add c to output. Horizontal shift: subtract c from input. Watch the sign!

**LEFT** `[text]`

$y = f(x) + c$: shift up (c>0) or down (c<0).<br>$y = f(x - c)$: shift right (c>0) or left (c<0).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^2 as a blue parabola. Add two sliders: one for vertical shift (range -3 to 3, step 0.1) and one for horizontal shift (range -3 to 3, step 0.1). The transformed function g(x)= (x - h)^2 + k redraws in red as sliders change. Show the new vertex coordinates. Include a reset button. Title: 'Vertical and Horizontal Shifts'.

*Interactive Controls:*
  - 🎛 Slider for h from -3 to 3
  - 🎛 Slider for k from -3 to 3
  - 🎛 Button: reset to h=0,k=0

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

x = np.linspace(-5, 5, 400)
fig, ax = plt.subplots()
plt.subplots_adjust(bottom=0.25)
ax.grid(True, alpha=0.3)
ax.set_ylim(-2, 10)

h0, k0 = 0, 0
line_f, = ax.plot(x, x**2, 'b', label='f(x)=x^2')
line_g, = ax.plot(x, (x-h0)**2 + k0, 'r', label='g(x)=(x-h)^2+k')
ax.legend()

ax_h = plt.axes([0.2, 0.1, 0.65, 0.03])
ax_k = plt.axes([0.2, 0.05, 0.65, 0.03])
s_h = Slider(ax_h, 'h', -3, 3, valinit=0)
s_k = Slider(ax_k, 'k', -3, 3, valinit=0)

def update(val):
    h = s_h.val
    k = s_k.val
    line_g.set_ydata((x-h)**2 + k)
    ax.set_title(f'Vertex at ({h:.1f}, {k:.1f})')
    fig.canvas.draw_idle()
s_h.on_changed(update)
s_k.on_changed(update)

resetax = plt.axes([0.8, 0.025, 0.1, 0.04])
button = Button(resetax, 'Reset')
def reset(event):
    s_h.reset()
    s_k.reset()
button.on_clicked(reset)

plt.show()
```

**Teacher Narration** `[85w]`
> Vertical shifts are straightforward: adding a constant moves the graph up or down. Horizontal shifts are trickier. The function y = f(x - c) moves the graph c units to the RIGHT, even though we subtract c. Why? Because to get the same output as before at x = a, we need input a + c. Try moving the sliders on the right. See how the parabola's vertex moves. Notice that a positive h moves the graph right, and a positive k moves it up.

**Student Prompt:** Predict: If we replace x with (x+2), which direction does the graph shift?

---

### Slide 4 · [CORE] 🎛 *[2 controls]*
**Stretches and Reflections**  ·  `split_left_right`

**On-screen text** `[8w]`
Multiply output: vertical stretch/reflection. Multiply input: horizontal stretch/reflection.

**LEFT** `[text]`

$y = c\,f(x)$: vertical stretch (|c|>1) or shrink (0<|c|<1); if c<0, also reflect about x-axis.<br>$y = f(cx)$: horizontal shrink (|c|>1) or stretch (0<|c|<1); if c<0, also reflect about y-axis.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot sin(x) in blue over x in [-2π,2π]. Add sliders for vertical factor a (range -3 to 3, step 0.1) and horizontal factor b (range -3 to 3, step 0.1). Plot a*sin(b*x) in red. Show horizontal asymptote and y-range. Title: 'Stretch and Reflection'.

*Interactive Controls:*
  - 🎛 Slider for vertical factor a from -3 to 3
  - 🎛 Slider for horizontal factor b from -3 to 3

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

x = np.linspace(-2*np.pi, 2*np.pi, 400)
fig, ax = plt.subplots()
plt.subplots_adjust(bottom=0.2)
ax.grid(True, alpha=0.3)
ax.set_ylim(-3, 3)
ax.axhline(0, color='gray')

a0, b0 = 1, 1
line_f, = ax.plot(x, np.sin(x), 'b', label='sin(x)')
line_g, = ax.plot(x, np.sin(b0*x)*a0, 'r', label='a sin(bx)')
ax.legend()

ax_a = plt.axes([0.2, 0.05, 0.65, 0.03])
ax_b = plt.axes([0.2, 0.1, 0.65, 0.03])
s_a = Slider(ax_a, 'Vertical factor a', -3, 3, valinit=1)
s_b = Slider(ax_b, 'Horizontal factor b', -3, 3, valinit=1)

def update(val):
    a = s_a.val
    b = s_b.val
    line_g.set_ydata(np.sin(b*x)*a)
    fig.canvas.draw_idle()
s_a.on_changed(update)
s_b.on_changed(update)

plt.show()
```

**Teacher Narration** `[83w]`
> Multiplying the output by a constant stretches the graph vertically. If the constant is negative, it also flips the graph across the x-axis. Multiplying the input by a constant shrinks or stretches the graph horizontally. A negative input constant flips across the y-axis. Play with the sliders on the right using the sine wave. Notice how a negative 'a' flips the wave upside down, and increasing 'b' makes the wave oscillate faster. These transformations preserve the overall shape but change scale and orientation.

**Student Prompt:** What happens to the period of sin(x) when you set b=2?

---

### Slide 5 · [MISCONCEPTION] ⏸️ *[YouTube Pause]*
**Common Mistake: Horizontal Shift Direction**  ·  `split_left_right`

**On-screen text** `[23w]`
y = f(x + c) shifts LEFT by c units. y = f(x - c) shifts RIGHT. The sign feels opposite—check with x=0.

**LEFT** `[steps]`

**Wrong thinking:** 'y = f(x+3) shifts right 3 because +3 adds to x.'<br>**Correct:** $y = f(x+3)$ shifts **left** 3 units.<br>**Reason:** To output $f(0)$, we need $x+3=0$, so $x=-3$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^2 in blue. Then plot f(x-2) in green (shifts right 2) and f(x+2) in red (shifts left 2). Label each curve. Add a note: 'x-2 moves point to the right' and 'x+2 moves point to the left'. Highlight the vertex positions: (0,0) for original, (2,0) for green, (-2,0) for red.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 400)
plt.plot(x, x**2, 'b', label='f(x)=x^2')
plt.plot(x, (x-2)**2, 'g', linewidth=2, label='f(x-2): right 2')
plt.plot(x, (x+2)**2, 'r', linewidth=2, label='f(x+2): left 2')
plt.axhline(0, color='gray')
plt.axvline(0, color='gray')
plt.grid(True, alpha=0.3)
plt.legend()
plt.title('Horizontal Shifts: x-2 → right, x+2 → left')
plt.show()
```

**Teacher Narration** `[97w]`
> This is the most common sign error in function transformations. Students often think that adding to x moves the graph to the right because we see a plus sign. But remember: to get the same output as the original at x=0, the new function needs a different input. For y = f(x+3), plugging in x=-3 gives f(0). So the point that was at x=0 moves to x=-3—that's a shift left. Always test with a single point to verify the direction. On the graph you can see that adding inside the parentheses moves the parabola left, not right.

**Student Prompt:** If we have y = f(x-5), does the graph shift left or right?

---

### Slide 6 · [CORE] 🎛 *[1 controls]*
**Composition of Functions**  ·  `split_left_right`

**On-screen text** `[14w]`
Apply g first, then f. Domain: everything that passes through g into f's domain.

**LEFT** `[text]`

$(f \circ g)(x) = f(g(x))$<br>**Domain:** $\{x \in \text{dom}(g) : g(x) \in \text{dom}(f)\}$<br>**Example:** $f(x)=\sqrt{x}, g(x)=x+1$<br>$(f\circ g)(x)=\sqrt{x+1}$, domain $x \geq -1$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show two number lines: top for x, middle for g(x), bottom for f(g(x)). Provide a slider for x from -2 to 3. Update arrows and values. Plot the composite function graph on the side. Use colors to track mapping.

*Interactive Controls:*
  - 🎛 Slider for x from -2 to 3

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(6, 6))
plt.subplots_adjust(bottom=0.15)

x_vals = np.linspace(-2, 3, 100)
y_vals = np.sqrt(x_vals+1)
ax1.plot(x_vals, y_vals, 'b')
ax1.set_ylim(-0.5, 2.5)
ax1.set_title('Composite: f(g(x)) = sqrt(x+1)')
ax1.grid(True, alpha=0.3)

# For slider
ax_x = plt.axes([0.2, 0.05, 0.6, 0.03])
s_x = Slider(ax_x, 'x', -2, 3, valinit=0)

# Show mapping on second axes (just a marker)
point, = ax1.plot([0], [1], 'ro', markersize=10)
def update(val):
    x = s_x.val
    y = np.sqrt(x+1) if x+1>=0 else np.nan
    point.set_data([x], [y])
    fig.canvas.draw_idle()
s_x.on_changed(update)

plt.show()
```

**Teacher Narration** `[87w]`
> Composition means applying one function after another. The output of the inner function becomes the input of the outer function. For the composite to be defined, every x in the domain must first be in the domain of g, and then g(x) must be in the domain of f. In our example, f(x)=sqrt(x) requires a non-negative input, so g(x)=x+1 must be non-negative. That gives x≥-1. Use the slider to see how a particular x-value maps step by step. This is the foundation for the chain rule later.

---

### Slide 7 · [CORE] ⏸️ *[YouTube Pause]*
**Even and Odd Functions**  ·  `split_left_right`

**On-screen text** `[9w]`
Even: mirror across y-axis. Odd: 180° rotation about origin.

**LEFT** `[text]`

**Even:** $f(-x)=f(x)$ — symmetric about y-axis.<br>**Odd:** $f(-x)=-f(x)$ — symmetric about origin.<br>**Examples:** $x^2$ is even, $x^3$ is odd.

**RIGHT** `[visual_spec]`

*Visual Spec:* Left subplot: plot f(x)=x^2 (even). Highlight a point (a, a^2) and its mirror (-a, a^2). Right subplot: plot f(x)=x^3 (odd). Highlight (a, a^3) and (-a, -a^3). Use distinct colors, grid, legend. Title: 'Even and Odd Symmetry'.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-3, 3, 400)
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))

# Even
y_even = x**2
ax1.plot(x, y_even, 'b')
a = 1.5
ax1.plot(a, a**2, 'ro', label=f'({a},{a**2})')
ax1.plot(-a, a**2, 'go', label=f'({-a},{a**2})')
ax1.axvline(0, color='gray', linestyle='--')
ax1.grid(True, alpha=0.3)
ax1.set_title('Even: f(-x)=f(x)')
ax1.legend()

# Odd
y_odd = x**3
ax2.plot(x, y_odd, 'r')
ax2.plot(a, a**3, 'ro', label=f'({a},{a**3})')
ax2.plot(-a, -a**3, 'go', label=f'({-a},{-a**3})')
ax2.axhline(0, color='gray', linewidth=0.5)
ax2.axvline(0, color='gray', linewidth=0.5)
ax2.grid(True, alpha=0.3)
ax2.set_title('Odd: f(-x)=-f(x)')
ax2.legend()

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[75w]`
> Even and odd symmetries help us understand function behavior quickly. An even function gives the same output for x and negative x—like a parabola opening upward. An odd function gives opposite outputs—like a cubic. This can simplify calculations: for even functions, integrals from -a to a become twice the integral from 0 to a; for odd functions, they cancel to zero. Notice that not all functions are even or odd. We'll see an example shortly.

**Student Prompt:** Is the sine function even, odd, or neither? (Answer: odd, because sin(-x) = -sin(x))

---

### Slide 8 · [PRACTICE]
**Example 1: Domain and Range (Warm-Up)**  ·  `split_left_right`

**On-screen text** `[9w]`
f(x) = sqrt(x-3) + 2. Domain: x≥3. Range: y≥2.

**LEFT** `[steps]`

Find domain and range of $f(x)=\sqrt{x-3}+2$.
| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Restrict radicand | $x-3 \ge 0 \Rightarrow x \ge 3$ |
| 2 | Domain | $[3,\infty)$ |
| 3 | Min value at x=3 | $f(3)=2$ |
| 4 | As x grows | $f(x)\to\infty$ |
| 5 | Range | $[2,\infty)$ |

**RIGHT** `[empty]`

**Teacher Narration** `[71w]`
> Let's start with a quick warm-up. We want the domain and range of this square root function. The radicand must be non-negative, so x-3≥0 gives x≥3. That's the domain. At x=3, f equals the square root of zero plus 2, which is 2. As x increases, the square root grows without bound, so the range starts at 2 and goes to infinity. Always check for restrictions like denominators and even roots.

**Student Prompt:** What is the range of f(x)=sqrt(x)+1?

---

### Slide 9 · [PRACTICE]
**Example 2: Transformation Sequence (Standard)**  ·  `split_left_right`

**On-screen text** `[10w]`
Apply in order: horizontal shift, then stretch/reflect, then vertical shift.

**LEFT** `[steps]`

Start with $f(x)=x^2$. Sketch $y=-2(x+1)^2+3$.
1. **Left 1**: $(x+1)^2$ → vertex at (-1,0)
2. **Stretch & reflect**: -2(x+1)^2 → opens down, taller
3. **Up 3**: +3 → vertex at (-1,3)
4. New vertex: $(-1,3)$; x-intercepts: $x=-1\pm\sqrt{3/2}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^2 in dashed blue. Plot g(x)=-2(x+1)^2+3 in solid red. Mark vertex with a point and label. Show x-intercepts. Use grid, legend. Title: 'Transformation: -2(x+1)^2+3'.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-4, 2, 400)
y_parent = x**2
y_transformed = -2*(x+1)**2 + 3

plt.plot(x, y_parent, 'b--', label='parent: x^2')
plt.plot(x, y_transformed, 'r', linewidth=2, label='transformed')
plt.plot(-1, 3, 'ro', label='vertex (-1,3)')
# x-intercepts
sol = np.array([-1 - np.sqrt(3/2), -1 + np.sqrt(3/2)])
plt.plot(sol, [0,0], 'go', label='x-intercepts')
plt.axhline(0, color='gray')
plt.axvline(-1, color='gray', linestyle='--', alpha=0.5)
plt.grid(True, alpha=0.3)
plt.legend()
plt.title('Transformed Quadratic')
plt.show()
```

**Teacher Narration** `[77w]`
> Now we apply multiple transformations in sequence. Starting from the parent parabola y=x^2, we first replace x with (x+1) to shift left 1 unit. Then we multiply the output by -2 to stretch vertically by factor 2 and reflect across the x-axis. Finally we add 3 to shift up. The order matters: if you applied the vertical shift before the stretch, you'd get a different result. Always apply transformations in this order: horizontal shifts, stretches/reflections, vertical shifts.

**Student Prompt:** What would happen if we added 3 before multiplying by -2?

---

### Slide 10 · [PRACTICE] 🟡
**Example 3: Composition Domain (Tricky)**  ·  `full_width`

**On-screen text** `[8w]`
Composite: 1/(sqrt(x)-1). Domain: x≥0 and x≠1, i.e., [0,1)∪(1,∞).

**FULL WIDTH** `[steps]`

$f(x)=\frac{1}{x-1},\; g(x)=\sqrt{x}$. Find $(f\circ g)(x)$ and its domain.
| Step | Action | Explanation |
|------|--------|-------------|
| 1 | $(f\circ g)(x)=f(g(x))=f(\sqrt{x})$ | |
| 2 | $f(\sqrt{x})=\frac{1}{\sqrt{x}-1}$ | |
| 3 | Inner domain: $x\ge0$ | sqrt requires non-negative |
| 4 | Outer: denominator $\neq0$ | $\sqrt{x}\neq1 \Rightarrow x\neq1$ |
| 5 | Combined domain | $[0,1)\cup(1,\infty)$ |

**Teacher Narration** `[69w]`
> This example shows why composition domains can be tricky. The inner function g(x)=sqrt(x) restricts x to be non-negative. But even after that, the outer function f has a denominator that becomes zero when sqrt(x)=1, so we must exclude x=1. The domain is everything from 0 to infinity except 1. Always check both conditions: inner function's domain and where the outer function is defined for the output of the inner.

**Student Prompt:** What is the domain of (g∘f)(x)? (f(x)=1/(x-1), g(x)=sqrt(x))

---

### Slide 11 · [PRACTICE] 🟡
**Example 4: Even or Odd? (Edge Case)**  ·  `split_left_right`

**On-screen text** `[15w]`
h(-x) = -h(x) for all x → odd function. If not, test a single point.

**LEFT** `[steps]`

Is $h(x)=\frac{x^3}{x^2+1}$ even, odd, or neither?
1. $h(-x)=\frac{(-x)^3}{(-x)^2+1}=\frac{-x^3}{x^2+1}$
2. Compare to $h(x)=\frac{x^3}{x^2+1}$
3. $h(-x)=-h(x)$ → **odd**.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot h(x)=x^3/(x^2+1) over x in [-4,4]. Mark two symmetric points (a, h(a)) and (-a, h(-a)) to show h(-a) = -h(a). Use grid, title 'Odd Function Symmetry'.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-4, 4, 400)
y = x**3/(x**2 + 1)
plt.plot(x, y, 'b')
a = 2
idx = np.argmin(np.abs(x-a))
plt.plot(a, y[idx], 'ro', label=f'({a},{y[idx]:.2f})')
plt.plot(-a, -y[idx], 'go', label=f'({-a},{-y[idx]:.2f})')
plt.axhline(0, color='gray')
plt.axvline(0, color='gray')
plt.grid(True, alpha=0.3)
plt.legend()
plt.title('Odd Function: x³/(x²+1)')
plt.show()
```

**Teacher Narration** `[78w]`
> To determine if a function is even or odd, we compute f(-x) and compare to f(x) and -f(x). Here we have a rational function with numerator odd and denominator even. The numerator's odd power gives a negative sign, but the denominator's even power drops the sign. The result is that h(-x) = -h(x), so the function is odd. Visualizing the graph confirms the origin symmetry. If a function does not satisfy either condition, it's neither even nor odd.

**Student Prompt:** Is f(x)=x^2+1 even, odd, or neither?

---

### Slide 12 · [PRACTICE] 🟡
**Example 5: Piecewise Function (Application)**  ·  `full_width`

**On-screen text** `[12w]`
Piecewise defined by three rules. Evaluate each piece based on x value.

**FULL WIDTH** `[steps]`

Let $f(x)=\begin{cases} x^2, & x<0 \\ 2x+1, & 0\le x\le2 \\ 5-x, & x>2\end{cases}$

**Evaluate:**
- $f(-1)=(-1)^2=1$
- $f(0)=2(0)+1=1$
- $f(3)=5-3=2$

**Sketch:** For x<0: parabola (open at (0,0)); for [0,2]: line from (0,1) to (2,5); for x>2: line starting at (2,3) open.

**Teacher Narration** `[107w]`
> Piecewise functions are defined by different formulas on different intervals. Here we have three pieces: a parabola for negative x, a line for x from 0 to 2, and another line for x greater than 2. Always check which piece applies to your x. Notice that at x=0, the second piece gives f(0)=1, which matches the limit from the left (since x^2 approaches 0, but there's an open circle). At x=2, the second piece includes the endpoint (2,5) while the third piece starts with an open circle at (2,3). Sketching these pieces together shows a function that is continuous at x=0 but has a jump at x=2.

**Student Prompt:** What is f(1.5)?

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Product of Even and Odd Functions**  ·  `full_width`

**On-screen text** `[12w]`
Proof: h(-x) = f(-x)g(-x) = f(x)(-g(x)) = -h(x). So h is odd.

**FULL WIDTH** `[steps]`

**Theorem:** If f even, g odd, then h(x)=f(x)g(x) is odd.
| Step | Derivation |
|------|------------|
| 1 | $h(-x)=f(-x)g(-x)$ |
| 2 | $f(-x)=f(x)$, $g(-x)=-g(x)$ |
| 3 | $h(-x)=f(x)\cdot(-g(x))=-f(x)g(x)=-h(x)$ |
| 4 | Therefore h is odd. |

**Teacher Narration** `[75w]`
> Here's a lightweight proof that reinforces symmetry ideas. We assume f is even and g is odd, then compute h(-x). Substituting the symmetry properties immediately shows h(-x) = -h(x), which is the definition of an odd function. This result is useful: for example, x^2 (even) multiplied by x^3 (odd) gives x^5, which is odd. The product of two even functions is even, and product of two odd functions is even. Try proving those as practice.

**Student Prompt:** What is the product of two even functions?

---

### Slide 14 · [SUMMARY]
**Key Takeaways**  ·  `full_width`

**On-screen text** `[10w]`
All learning objectives covered: families, transformations, composition, symmetry, piecewise functions.

**FULL WIDTH** `[text]`

1. Function families: linear, quadratic, power, polynomial, rational, trig, exponential, logarithmic – each has a signature graph.
2. Transformations: vertical/horizontal shifts, stretches/reflections – apply in order: shift → stretch/reflect → shift.
3. Composition: always check inner domain and outer domain restrictions.
4. Even functions: symmetric about y-axis; odd: symmetric about origin.
5. Piecewise functions: evaluate piece by piece; be careful at boundaries.

**Teacher Narration** `[71w]`
> Today we've covered the essential building blocks of functions and graphs. You should now be able to recognize the major function families, apply transformations systematically, compose functions and find their domains, identify even and odd symmetry, and work with piecewise definitions. These tools will be used throughout calculus—especially when we talk about limits, derivatives, and integrals. Practice the examples and make sure you can reproduce the transformations with any parent function.

---
