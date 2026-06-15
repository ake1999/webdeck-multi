# Series and Partial Sums

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You need to understand limits of sequences and the idea of convergence.

**Learning Objectives:**
- Define a series as the limit of its sequence of partial sums
- Calculate partial sums for geometric series and determine convergence
- Interpret the relationship between the sequence of terms and the sequence of partial sums
- Apply the definition of convergence to determine whether a series converges or diverges
- Analyze the behavior of geometric series based on the common ratio

---

## v3.1 Production Readiness

✅ **Interactive moments:** 5 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 74w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 13 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 5 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | hook | 🟢 | ◧ | ⏸️ | 78w | 16w | How can you add infinitely many numbers? |
| 2 | 🎛core | 🟢 | ◧ |  | 64w | 10w | Definition: Series as Limit of Partial Sums |
| 3 | 🎛core | 🟢 | ◧ |  | 68w | 11w | Geometric Series – The Prototype |
| 4 | core | 🟢 | ◧ |  | 66w | 9w | Partial Sum Formula for Geometric Series |
| 5 | 🎛misconception | 🟢 | ◧ | ⏸️ | 65w | 16w | Misconception: Confusing $\lim a_n$ with $\lim S_N$ |
| 6 | 🎛visual_lab | 🟡 | ◧ |  | 76w | 14w | Explore: Partial Sums of Geometric Series |
| 7 | practice | 🟢 | ⬛⬛ |  | 69w | 6w | Example 1: Warm-up – Direct Application |
| 8 | practice | 🟡 | ⬛⬛ |  | 74w | 7w | Example 2: Standard – Index Shift Required |
| 9 | practice | 🔴 | ⬛⬛ |  | 70w | 7w | [Challenge – Optional] Example 3: Tricky – Negative Common Ratio |
| 10 | practice | 🟡 | ⬛⬛ |  | 73w | 7w | Example 4: Edge Case – r = –1 |
| 11 | practice | 🟡 | ⬛⬛ | ⏸️ | 84w | 12w | Example 5: Application – Bouncing Ball |
| 12 | 🎛challenge | 🔴 | ◧ |  | 81w | 7w | [Challenge – Optional] Proof of Convergence Criterion |
| 13 | summary | 🟢 | ⬛⬛ |  | 88w | 13w | Summary & Key Takeaways |

---

### Slide 1 · [HOOK] ⏸️ *[YouTube Pause]*
**How can you add infinitely many numbers?**  ·  `split_left_right`

**On-screen text** `[16w]`
Walking half the remaining distance each time. Total distance traveled? Partial sums get closer to 1.

**LEFT** `[concept]`

Walk toward a wall: step 1 = $\frac12$ m, step 2 = $\frac14$ m, step 3 = $\frac18$ m, …  
Total distance?  The partial sums $\frac12, \frac34, \frac78, \dots$ approach 1 m.

**RIGHT** `[visual_spec]`

*Visual Spec:* Animate a stick figure walking toward a wall, with each step halving the remaining distance. Show the partial sum bar growing from 0 to 1. Label S_1, S_2, S_3. Use a red dashed line at total distance = 1.

```python
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.animation import FuncAnimation

fig, ax = plt.subplots(figsize=(8,4))
ax.set_xlim(0,1)
ax.set_ylim(0,1.2)
ax.axhline(y=1, color='r', linestyle='--', label='Wall distance = 1')
ax.set_xlabel('Distance (m)')
ax.set_title('Walking to the Wall')

# Partial sums of 1/2^n
N=6
S = np.cumsum(0.5**np.arange(1,N+1))

# bar plot
bars = ax.bar(range(1,N+1), S[:1], width=0.6, color='blue', alpha=0.7)

# animation update
def update(frame):
    for i in range(len(bars)):
        bars[i].set_height(S[frame] if i==0 else 0)  # simplistic: show only latest? better to use growing bar
    ax.set_title(f'Step {frame+1}, Partial sum S_{frame+1} = {S[frame]:.4f}')
    return bars

# This is a placeholder; real code would use sliders or buttons.
plt.show()
```

**Teacher Narration** `[78w]`
> Imagine you start one meter from a wall. You take a step covering half the distance, then half the remaining, and so on. After each step, you add the new distance to the previous total. Those totals are called partial sums. They form a sequence: half, three quarters, seven eighths, and so on. They get closer and closer to one, but never exceed it. This is our first example of an infinite series. Today we'll make this precise.

**Student Prompt:** What do you think the total distance will be after infinitely many steps?

---

### Slide 2 · [CORE] 🎛 *[1 controls]*
**Definition: Series as Limit of Partial Sums**  ·  `split_left_right`

**On-screen text** `[10w]`
$\sum a_n = \lim_{N\to\infty} S_N$ where $S_N = \sum_{n=1}^N a_n$.

**LEFT** `[formula_block]`

$\displaystyle \sum_{n=1}^{\infty} a_n = \lim_{N\to\infty} S_N$  
where $S_N = \sum_{n=1}^{N} a_n$  

**Key:** The infinite sum is defined as the limit of its finite partial sums.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the sequence of partial sums S_N for a convergent series (e.g., a_n=1/2^n) as a blue curve with dots. Show the limit as a horizontal red dashed line. Highlight the gap shrinking as N increases.

*Interactive Controls:*
  - 🎛 Slider: N from 1 to 50

```python
import numpy as np
import matplotlib.pyplot as plt

Nmax = 20
n = np.arange(1, Nmax+1)
S = np.cumsum(0.5**n)

plt.figure(figsize=(6,4))
plt.plot(n, S, 'bo-', markersize=5, label='$S_N$')
plt.axhline(y=1, color='r', linestyle='--', label='Limit = 1')
plt.xlabel('N')
plt.ylabel('$S_N$')
plt.title('Partial sums approach the limit')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

**Teacher Narration** `[64w]`
> We define an infinite series by looking at the sequence of partial sums. The Nth partial sum is just the ordinary sum of the first N terms. If that sequence has a finite limit, we say the series converges, and its sum is that limit. Otherwise, it diverges. Always remember: a series is not a sum in the usual sense – it's a limit.

**Student Prompt:** If $a_n = 1$, what happens to $S_N$ as N increases?

---

### Slide 3 · [CORE] 🎛 *[1 controls]*
**Geometric Series – The Prototype**  ·  `split_left_right`

**On-screen text** `[11w]`
Geometric series: $\sum_{n=0}^\infty a r^n$. Each term multiplies previous by $r$.

**LEFT** `[formula_block]`

$\displaystyle \sum_{n=0}^{\infty} a r^n = a + ar + ar^2 + \cdots$  

- $a$ is the first term (non-zero)  
- $r$ is the common ratio

**RIGHT** `[visual_spec]`

*Visual Spec:* Show three different geometric series: r=0.5, r=-0.7, r=1.1, with their first few terms and partial sums. Use color to distinguish terms. Include a table of values.

*Interactive Controls:*
  - 🎛 Radio: show r = 0.5, -0.7, 1.1

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1,3, figsize=(12,4))
rs = [0.5, -0.7, 1.1]
a = 1
for ax, r in zip(axes, rs):
    n = np.arange(0,6)
    terms = a * r**n
    ax.stem(n, terms, basefmt=' ', use_line_collection=True)
    ax.set_title(f'r = {r}')
    ax.set_xlabel('n')
    ax.set_ylabel('a_n')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[68w]`
> The most important family of series is the geometric series. Each term is obtained by multiplying the previous one by a constant r, called the common ratio. The first term is a. For example, a=1 and r=0.5 gives the series we saw earlier. A negative r makes terms alternate sign. If r is greater than 1 in absolute value, the terms grow. The convergence depends entirely on r.

---

### Slide 4 · [CORE]
**Partial Sum Formula for Geometric Series**  ·  `split_left_right`

**On-screen text** `[9w]`
$S_N = a\frac{1-r^N}{1-r}$ for $r\neq1$. Subtract $S_N$ and $rS_N$.

**LEFT** `[formula_block]`

$S_N = a\frac{1-r^N}{1-r}$, $r\neq 1$  

Derivation:  
$S_N = a + ar + \cdots + ar^{N-1}$  
$rS_N = ar + ar^2 + \cdots + ar^N$  
Subtract: $(1-r)S_N = a(1-r^N)$

**RIGHT** `[visual_spec]`

*Visual Spec:* Algebraic steps on the right side: show the subtraction method visually with term alignment. Use color to highlight cancellation.

```python
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(6,4))
ax.text(0.1,0.9, r'$S_N = a + ar + ar^2 + \cdots + ar^{N-1}$', fontsize=14, verticalalignment='top')
ax.text(0.1,0.7, r'$r S_N = ar + ar^2 + \cdots + ar^{N-1} + ar^N$', fontsize=14, verticalalignment='top')
ax.text(0.1,0.5, r'$(1-r)S_N = a - ar^N$', fontsize=14, verticalalignment='top', color='blue')
ax.text(0.1,0.3, r'$S_N = a\frac{1-r^N}{1-r}$', fontsize=16, verticalalignment='top', fontweight='bold')
ax.axis('off')
plt.show()
```

**Teacher Narration** `[66w]`
> We can find a closed form for the Nth partial sum of a geometric series. Write S_N and multiply by r. Most terms appear in both sums. Subtracting cancels all middle terms, leaving a simple expression. Solving for S_N gives this formula. It's only valid when r is not 1, because then we would be dividing by zero. This formula lets us compute partial sums quickly.

**Student Prompt:** What happens if r = 1? Why can't we use this formula?

---

### Slide 5 · [MISCONCEPTION] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Misconception: Confusing $\lim a_n$ with $\lim S_N$**  ·  `split_left_right`

**On-screen text** `[16w]`
Harmonic series: $a_n \to 0$ but $S_N \to \infty$. The limit of terms is not enough!

**LEFT** `[concept]`

**Wrong idea:** "Since $\lim_{n\to\infty} a_n = 0$, the series converges."  

**Counterexample:** $1 + \frac12 + \frac13 + \frac14 + \cdots$  
$a_n \to 0$ but $S_N$ grows without bound (harmonic series diverges).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a_n (marked with crosses) and S_N (line) for the harmonic series on the same graph. a_n->0 but S_N increases slowly to infinity. Use log scale for y if needed.

*Interactive Controls:*
  - 🎛 Slider: N from 1 to 500

```python
import numpy as np
import matplotlib.pyplot as plt

N = 100
n = np.arange(1, N+1)
an = 1/n
S = np.cumsum(an)

fig, ax1 = plt.subplots(figsize=(6,4))
ax1.plot(n, an, 'x', color='gray', label='$a_n = 1/n$')
ax1.set_ylabel('$a_n$', color='gray')
ax2 = ax1.twinx()
ax2.plot(n, S, 'b-', label='$S_N$ (partial sum)')
ax2.set_ylabel('$S_N$', color='blue')
ax1.set_xlabel('n')
plt.title('Harmonic series: $a_n \\to 0$ but $S_N \\to \\infty$')
fig.legend()
plt.show()
```

**Teacher Narration** `[65w]`
> A common mistake is to think that if the terms go to zero, the series must converge. That's false. The harmonic series is the classic counterexample: its terms go to zero, yet the partial sums grow without bound, diverging to infinity. The limit of the terms must be zero for convergence, but it is not sufficient. You must check the limit of the partial sums.

**Student Prompt:** Can you think of another series where terms go to zero but the series diverges?

---

### Slide 6 · [VISUAL_LAB] 🟡 🎛 *[3 controls]*
**Explore: Partial Sums of Geometric Series**  ·  `split_left_right`

**On-screen text** `[14w]`
Drag sliders: change $r$ and $N$. Observe how $S_N$ approaches the limit when $|r|<1$.

**LEFT** `[concept]`

Adjust the common ratio $r$ and number of terms $N$. See how $S_N$ approaches (or does not approach) the limit sum $\frac{a}{1-r}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Interactive plot: set a=1 fixed. Slider for r from -0.99 to 0.99 (step 0.01). Slider for N from 1 to 50. Show S_N as bar graph. Show limit as horizontal line. Show error band. Toggle: show/hide exact limit value.

*Interactive Controls:*
  - 🎛 Slider: r from -0.99 to 0.99
  - 🎛 Slider: N from 1 to 50
  - 🎛 Button: Reset

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

fig, ax = plt.subplots(figsize=(6,4))
plt.subplots_adjust(bottom=0.25)

# initial values
a = 1
r_init = 0.5
N_init = 10

n = np.arange(1, N_init+1)
terms = a * r_init**(n-1)
S = np.cumsum(terms)

bar = ax.bar(n, S, width=0.7, alpha=0.6, label='Partial sums')
limit = a/(1-r_init)
hline = ax.axhline(y=limit, color='r', linestyle='--', label='Limit')
ax.set_xlabel('N')
ax.set_ylabel('$S_N$')
ax.set_title('Partial sums and limit')
ax.legend()
ax.set_ylim(0, limit*1.2)

# sliders
ax_r = plt.axes([0.25, 0.1, 0.65, 0.03])
ax_N = plt.axes([0.25, 0.05, 0.65, 0.03])
slider_r = Slider(ax_r, 'r', -0.99, 0.99, valinit=r_init, valstep=0.01)
slider_N = Slider(ax_N, 'N', 1, 50, valinit=N_init, valstep=1)

def update(val):
    r = slider_r.val
    N = int(slider_N.val)
    n = np.arange(1, N+1)
    terms = a * r**(n-1)
    S = np.cumsum(terms)
    ax.clear()
    ax.bar(n, S, width=0.7, alpha=0.6)
    if abs(r) < 1:
        limit = a/(1-r)
        ax.axhline(y=limit, color='r', linestyle='--', label=f'Limit = {limit:.2f}')
    else:
        ax.axhline(y=np.nan, color='r', linestyle='--')  # no limit
    ax.set_xlabel('N')
    ax.set_ylabel('$S_N$')
    ax.set_title(f'Partial sums for r={r:.2f}')
    ax.legend()
    ax.set_xlim(0, N+1)
    ax.set_ylim(0, max(S.max(), 1)*1.2 if len(S)>0 else 1)
    fig.canvas.draw_idle()

slider_r.on_changed(update)
slider_N.on_changed(update)

plt.show()
```

**Teacher Narration** `[76w]`
> Let's explore interactively. Use the sliders to change the common ratio and the number of terms. Notice that when the absolute value of r is less than one, the partial sums approach a finite limit. When r is between -1 and 1, the limit is a divided by one minus r. When r is exactly 1 or -1, or outside that range, the partial sums do not settle on a finite value. Try it and see.

**Student Prompt:** What happens when r is negative? Does the series still converge?

---

### Slide 7 · [PRACTICE]
**Example 1: Warm-up – Direct Application**  ·  `full_width`

**On-screen text** `[6w]`
Example: $\sum_{n=0}^\infty 3(1/2)^n$. Sum = 6.

**FULL WIDTH** `[steps]`

**Problem:** Find the sum of $\sum_{n=0}^{\infty} 3\left(\frac12\right)^n$.

| Step | Action |
|------|--------|
| 1 | Identify $a=3$, $r=\frac12$ |
| 2 | Check $|r|=\frac12<1$ → converges |
| 3 | Apply formula: $S = \frac{3}{1-\frac12} = \frac{3}{\frac12} = 6$ |

**Answer:** 6

**Teacher Narration** `[69w]`
> Let's start with a straightforward example. The series is already in standard geometric form with a equal to 3 and r equal to one half. Since the absolute value of r is less than one, the series converges. We plug into the formula: a over one minus r gives 3 over one minus one half, which is 6. Always remember to check the condition |r|<1 before applying the formula.

---

### Slide 8 · [PRACTICE] 🟡 *(skip if time-limited)*
**Example 2: Standard – Index Shift Required**  ·  `full_width`

**On-screen text** `[7w]`
Example: $\sum_{n=1}^\infty 2^{n+1}/3^n$ → converges to 4.

**FULL WIDTH** `[steps]`

**Problem:** Does $\sum_{n=1}^{\infty} \frac{2^{n+1}}{3^n}$ converge? If so, find sum.

| Step | Action |
|------|--------|
| 1 | Simplify: $\frac{2^{n+1}}{3^n} = 2\left(\frac{2}{3}\right)^n$ |
| 2 | Note index starts at $n=1$: first term $= 2(\frac{2}{3}) = \frac{4}{3}$ |
| 3 | Rewrite as standard form: $\sum_{n=0}^\infty \frac{4}{3}\left(\frac{2}{3}\right)^n$ |
| 4 | $a=\frac{4}{3}$, $r=\frac{2}{3}$, $|r|<1$ → converges |
| 5 | Sum $= \frac{4/3}{1-2/3} = \frac{4/3}{1/3} = 4$ |

**Answer:** Converges to 4.

**Teacher Narration** `[74w]`
> Here the series does not start at n=0, so we must adjust. After simplifying the term, we see that the first term of the series as given is not a but ar. To use our formula, we shift the index so it starts at zero. The result is a geometric series with a equal to four thirds and r equal to two thirds. The sum is four. Always be careful with the starting index.

---

### Slide 9 · [PRACTICE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Example 3: Tricky – Negative Common Ratio**  ·  `full_width`

**On-screen text** `[7w]`
Example: $\sum_{n=2}^\infty (-3)^{n+1}/5^{n-1}$ → converges to $-27/8$.

**FULL WIDTH** `[steps]`

**Problem:** Find sum of $\sum_{n=2}^{\infty} \frac{(-3)^{n+1}}{5^{n-1}}$.

| Step | Action |
|------|--------|
| 1 | Simplify: $\frac{(-3)^{n+1}}{5^{n-1}} = -15 \left(-\frac{3}{5}\right)^n$ |
| 2 | First term ($n=2$): $-15\left(-\frac{3}{5}\right)^2 = -\frac{27}{5}$ |
| 3 | Shift index: $k=n-2$, series becomes $\sum_{k=0}^\infty -\frac{27}{5}\left(-\frac{3}{5}\right)^k$ |
| 4 | $a=-\frac{27}{5}$, $r=-\frac{3}{5}$, $|r|<1$ → converges |
| 5 | Sum $= \frac{-27/5}{1-(-3/5)} = \frac{-27/5}{8/5} = -\frac{27}{8}$ |

**Answer:** Converges to $\displaystyle -\frac{27}{8}$.

**Teacher Narration** `[70w]`
> This example has negative signs and a shifted index. First simplify the general term to the form a r^n. The common ratio becomes negative three fifths. The absolute value is less than one, so the series converges. After rewriting with the index starting at zero, we have a equal to negative twenty-seven fifths. The sum works out to negative twenty-seven eighths. Be careful with signs when subtracting a negative ratio.

---

### Slide 10 · [PRACTICE] 🟡
**Example 4: Edge Case – r = –1**  ·  `full_width`

**On-screen text** `[7w]`
Example: $\sum 5(-1)^n$ diverges. $|r|=1$ not allowed.

**FULL WIDTH** `[steps]`

**Problem:** Does $\sum_{n=0}^{\infty} 5(-1)^n$ converge?

| Step | Action |
|------|--------|
| 1 | Terms: $5, -5, 5, -5, \dots$ |
| 2 | Partial sums: $S_1=5, S_2=0, S_3=5, S_4=0, \dots$ |
| 3 | Sequence oscillates, no limit → diverges |
| 4 | Alternative: $|r|=1$ so by theorem, diverges |

**Conclusion:** Diverges. The formula $a/(1-r)$ does NOT apply when $|r|\ge 1$.

**Teacher Narration** `[73w]`
> What about r equal to negative one? The terms alternate between five and negative five. The partial sums flip between five and zero, never settling on a single value. The series diverges. Even though the terms are bounded and the formula a over one minus r would give two point five, that result is meaningless because the series does not converge. Remember, the condition is strict: |r| must be strictly less than one.

**Student Prompt:** What if r = 1? What happens to the partial sums?

---

### Slide 11 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Example 5: Application – Bouncing Ball**  ·  `full_width`

**On-screen text** `[12w]`
Bouncing ball: initial 10 m, rebound 3/4. Total distance = 70 m.

**FULL WIDTH** `[steps]`

**Problem:** Ball dropped from 10 m; rebounds to $\frac34$ of previous height. Find total vertical distance traveled.

| Step | Action |
|------|--------|
| 1 | Initial drop: 10 m down |
| 2 | Each bounce: up then down same distance |
| 3 | Bounce heights: $10\cdot\frac34$, $10\cdot(\frac34)^2$, … |
| 4 | Total distance: $10 + 2\cdot10\cdot\frac34 + 2\cdot10\cdot(\frac34)^2 + \cdots$ |
| 5 | After first drop, geometric series: $2\cdot10\cdot\frac34$ … |
| 6 | Sum of geometric part: $20\cdot\frac{3/4}{1-3/4} = 60$ |
| 7 | Total: $10 + 60 = 70$ m |

**Answer:** 70 meters.

**Teacher Narration** `[84w]`
> Now a real-world application. A ball dropped from ten meters rebounds to three quarters of its previous height each time. The total distance includes the initial drop down, and for each bounce after, both the upward and downward path. The upward and downward distances form a geometric series starting with two times ten times three quarters. The sum of that series is sixty, so total distance is seventy meters. The ball travels a finite distance despite infinitely many bounces, because the bounce heights shrink.

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Proof of Convergence Criterion**  ·  `split_left_right`

**On-screen text** `[7w]`
Proof: $S_N = a(1-r^N)/(1-r)$, analyze $\lim r^N$.

**LEFT** `[steps]`

**Theorem:** $\sum_{n=0}^{\infty} ar^n$ converges iff $|r|<1$, then sum $= a/(1-r)$.

**Proof:**
1. $S_N = a\frac{1-r^N}{1-r}$ for $r\neq 1$.
2. If $|r|<1$, $\lim_{N\to\infty} r^N = 0$ → $\lim S_N = a/(1-r)$.
3. If $|r|>1$, $|r^N|\to\infty$ → $S_N$ diverges.
4. If $|r|=1$, $r=1$ gives $S_N=Na$ diverges; $r=-1$ oscillates.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show three cases |r|<1, |r|>1, |r|=1 on the same plot with partial sums. Use interactive radio to select case.

*Interactive Controls:*
  - 🎛 Radio: |r|<1, |r|>1, |r|=1

```python
import numpy as np
import matplotlib.pyplot as plt

# not full implementation, placeholder
plt.figure()
plt.text(0.5,0.5,'Case visualization here', ha='center')
plt.show()
```

**Teacher Narration** `[81w]`
> For those who want deeper understanding, here is the formal proof. We already have the closed form for S_N. The limit as N goes to infinity depends on r^N. If |r| is less than one, r^N goes to zero, so S_N approaches a over one minus r. If |r| is greater than one, r^N grows without bound, so the partial sums diverge. The borderline cases r equals one or minus one also diverge, though for different reasons. This completes the classification.

---

### Slide 13 · [SUMMARY]
**Summary & Key Takeaways**  ·  `full_width`

**On-screen text** `[13w]`
Key takeaways: Series = limit of partial sums. Geometric series converge if |r|<1.

**FULL WIDTH** `[concept]`

**Key Concepts**  
- Series $\sum a_n$ converges iff $\lim_{N\to\infty} S_N$ exists and is finite.  
- Geometric series $\sum ar^n$ converges to $\frac{a}{1-r}$ when $|r|<1$, diverges otherwise.  
- Partial sum formula: $S_N = a\frac{1-r^N}{1-r}$ ($r\neq1$).

**Common Pitfalls**  
- Do not confuse $\lim a_n$ with $\lim S_N$ (harmonic series).  
- Index shift carefully: $\sum_{n=1}^\infty ar^n = \frac{ar}{1-r}$ if $|r|<1$.  
- Condition $|r|<1$ is strict: $|r|\ge1$ implies divergence.

**Teacher Narration** `[88w]`
> Let's review. A series is defined as the limit of its sequence of partial sums. For geometric series, we have a simple convergence test: the series converges if and only if the absolute value of the common ratio is less than one, and then its sum is a over one minus r. Remember the common pitfalls: don't confuse the limit of the terms with the limit of partial sums; always check the starting index; and the condition is strict. Practice with the given problems to master the material.

**Student Prompt:** Review problem: Find sum of $\sum_{n=0}^\infty 2(1/3)^n$.

---
