# Sequences and Convergence

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** Limits at infinity of functions and basic function notation are assumed.

**Learning Objectives:**
- Define a sequence and determine its terms from an explicit formula or recursive definition
- Calculate limits of sequences using limit laws, the Squeeze Theorem, and properties of geometric sequences
- Analyze convergence and divergence of sequences, including oscillating and unbounded behavior
- Apply the formal epsilon-N definition to prove convergence
- Interpret monotonic sequences and their relationship to convergence

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 78w)
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
| 1 | hook | 🟢 | ◧ |  | 84w | 14w | What Does It Mean for a Sequence to Converge? |
| 2 | core | 🟢 | ◧ |  | 69w | 11w | Definition of a Sequence |
| 3 | 🎛core | 🟢 | ◧ | ⏸️ | 73w | 7w | The Epsilon–N Definition of Convergence |
| 4 | core | 🟢 | ◧ |  | 78w | 11w | Limit Laws for Sequences |
| 5 | core | 🟢 | ◧ |  | 72w | 19w | Squeeze Theorem for Sequences |
| 6 | core | 🟢 | ◧ |  | 78w | 11w | Geometric Sequences: Convergence Rules |
| 7 | core | 🟢 | ◧ |  | 87w | 14w | The Function Limit Theorem |
| 8 | 🎛visual_lab | 🟢 | ◧ | ⏸️ | 74w | 14w | Visual Lab: Explore Convergence with an Epsilon Band |
| 9 | practice | 🟢 | ⬛⬛ |  | 63w | 10w | Warm-Up Example: Direct Limit Calculation |
| 10 | 🎛practice | 🟢 | ◧ |  | 74w | 14w | Standard Example: Using the Squeeze Theorem |
| 11 | misconception | 🟢 | ◧ |  | 75w | 15w | Common Mistake: The Alternating Trap |
| 12 | practice | 🟡 | ◧ |  | 73w | 14w | Edge Case: Geometric with Negative Ratio |
| 13 | challenge | 🔴 | ◧ |  | 93w | 17w | [Challenge – Optional] Recursive Sequence with Fixed Point |
| 14 | practice | 🟡 | ◧ |  | 84w | 20w | Application: Using Function Limit Theorem with L'Hôpital |
| 15 | summary | 🟢 | ⬛⬛ |  | 90w | 13w | Summary and Key Takeaways |

---

### Slide 1 · [HOOK]
**What Does It Mean for a Sequence to Converge?**  ·  `split_left_right`

**On-screen text** `[14w]`
Snapshots of a falling ball: 16, 64, 144, 256, … Do the heights settle?

**LEFT** `[text]`

Think of a ball dropped from a height. Each second you take a photo of its position. The sequence of heights is like our snapshots: 16, 64, 144, 256, … Do these heights eventually settle near a single number? That’s convergence.

**RIGHT** `[visual_spec]`

*Visual Spec:* A vertical axis labeled 'height (ft)' from 0 to 300. Show a ball at positions 16, 64, 144, 256, ... as separate frames (like a flipbook). Use a dashed horizontal line at an arbitrarily large limit (none exists, so the ball keeps falling). Show a text overlay 'No convergence – ball keeps accelerating.' Colors: ball red, axis black.

**Teacher Narration** `[84w]`
> Imagine you drop a ball and take a photo every second. The first photo shows it at 16 feet, the second at 64 feet, the third at 144 feet. Those numbers form a sequence. The big question is: if you keep taking photos forever, do the numbers eventually huddle close to a single value, or do they keep changing? In this case, the ball accelerates, so the heights keep growing. That sequence does not converge. But many sequences do settle. Let’s define this precisely.

---

### Slide 2 · [CORE]
**Definition of a Sequence**  ·  `split_left_right`

**On-screen text** `[11w]`
A sequence is a function with domain ℕ. $$a_n = f(n)$$

**LEFT** `[formula_block]`

$$a_n = f(n), \quad n = 1, 2, 3, \ldots$$ 
A **sequence** is a function whose domain is the positive integers.

**RIGHT** `[visual_spec]`

*Visual Spec:* Stem plot of a_n = (2n+1)/n for n=1 to 20. Red stems with blue markers. Horizontal dashed line at y=2. Title: 'Sequence a_n = (2n+1)/n'. x-axis label: 'n', y-axis label: 'a_n'. Include a legend showing limit=2.

```python
import numpy as np
import matplotlib.pyplot as plt
n = np.arange(1, 21)
a_n = (2*n+1)/n
plt.figure(figsize=(6,4))
plt.stem(n, a_n, linefmt='r-', markerfmt='bo', basefmt='k-')
plt.axhline(y=2, color='g', linestyle='--', label='Limit = 2')
plt.xlabel('n')
plt.ylabel('a_n')
plt.title('Sequence a_n = (2n+1)/n')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[69w]`
> A sequence is simply a function whose input can only be the positive integers: 1, 2, 3, and so on. We write its nth term as a_n. For example, take the formula a_n equals (2n+1)/n. Plugging n=1 gives 3, n=2 gives 2.5, n=10 gives 2.1. On the right you see the terms plotted. Notice they seem to get closer and closer to 2. That’s the intuitive idea of convergence.

---

### Slide 3 · [CORE] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**The Epsilon–N Definition of Convergence**  ·  `split_left_right`

**On-screen text** `[7w]`
$$\forall \varepsilon>0, \exists N: n>N \Rightarrow |a_n-L|<\varepsilon$$

**LEFT** `[formula_block]`

$$\lim_{n\to\infty} a_n = L \iff \forall \varepsilon>0, \exists N\in\mathbb{N} \text{ s.t. } n>N \implies |a_n-L|<\varepsilon$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a_n = 1/n for n=1 to 50. Draw horizontal band from L-ε to L+ε (L=0). Show ε adjustable with a slider (range 0.01 to 0.5). Highlight terms outside the band in red, inside in green. Show a vertical dashed line at N = ceil(1/ε). The user can change ε and see N move. Title: 'ε-N definition for a_n=1/n'. x-axis: n, y-axis: a_n.

*Interactive Controls:*
  - 🎛 Slider for epsilon (0.01 to 0.5)
  - 🎛 Text display of N value

```python
# See full interactive code in visual_lab slide later; here we describe the animation
```

**Teacher Narration** `[73w]`
> The formal definition says a sequence has limit L if, no matter how tiny a positive epsilon you choose, there is some cutoff index N such that every term after N is within epsilon of L. For a_n equals 1/n, if you pick epsilon = 0.1, then N = 10 works; if epsilon = 0.01, N = 100 works. The slider on the right lets you see how smaller epsilon forces N larger.

**Student Prompt:** Try setting ε = 0.05. What is the smallest N that works for a_n = 1/n?

---

### Slide 4 · [CORE]
**Limit Laws for Sequences**  ·  `split_left_right`

**On-screen text** `[11w]`
Limits behave nicely: sum, product, quotient. But both limits must exist!

**LEFT** `[formula_block]`

If $\lim a_n = L$, $\lim b_n = M$, then: 
$$\lim (a_n\pm b_n)=L\pm M$$ $$\lim (a_n\cdot b_n)=L\cdot M$$ $$\lim \frac{a_n}{b_n}=\frac{L}{M} \;(M\neq 0)$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Three panels. Left: a_n = 3/n + 2 (approaches 2). Middle: b_n = 1 + 1/n (approaches 1). Right: a_n+b_n (approaches 3). Each panel shows stem plots for n=1..30 with horizontal dashed line at the respective limit. Colors: a_n blue, b_n red, sum green.

```python
import numpy as np
import matplotlib.pyplot as plt
n = np.arange(1, 31)
a_n = 3/n + 2
b_n = 1 + 1/n
c_n = a_n + b_n
fig, axes = plt.subplots(1,3, figsize=(12,4))
for ax, seq, L, col, tit in zip(axes, [a_n, b_n, c_n], [2,1,3], ['b','r','g'], ['a_n', 'b_n', 'a_n+b_n']):
    ax.stem(n, seq, linefmt=col+'-', markerfmt=col+'o', basefmt='k-')
    ax.axhline(y=L, color='k', linestyle='--')
    ax.set_title(tit)
    ax.set_xlabel('n')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[78w]`
> Just like for functions, if both sequences have finite limits, you can add, multiply, or divide their terms. The limit of the sum is the sum of the limits, and similarly for product and quotient. For example, if a_n approaches 2 and b_n approaches 1, then a_n plus b_n approaches 3. The plots confirm this: the green sequence clearly hovers near 3. Always check that both limits exist first – we cannot apply these laws if either diverges.

---

### Slide 5 · [CORE]
**Squeeze Theorem for Sequences**  ·  `split_left_right`

**On-screen text** `[19w]`
If a_n ≤ b_n ≤ c_n and both outer sequences converge to L, then b_n also converges to L.

**LEFT** `[formula_block]`

If $a_n \le b_n \le c_n$ for large $n$ and $\lim a_n = \lim c_n = L$, then $\lim b_n = L$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot of three sequences: a_n = -1/n (blue dashed), b_n = sin(n)/n (red solid), c_n = 1/n (green dashed). x-axis n from 1 to 50. Show the two outer sequences converge to 0, squeezing the inner one. Highlight the band narrowing. Title: 'Squeeze Theorem: sin(n)/n'. Include legend.

```python
import numpy as np
import matplotlib.pyplot as plt
n = np.arange(1, 51)
a_n = -1/n
b_n = np.sin(n)/n
c_n = 1/n
plt.figure(figsize=(6,4))
plt.plot(n, a_n, 'b--', label='-1/n')
plt.plot(n, c_n, 'g--', label='1/n')
plt.plot(n, b_n, 'r-', label='sin(n)/n')
plt.axhline(y=0, color='k', linestyle=':')
plt.xlabel('n')
plt.ylabel('sequence values')
plt.title('Squeeze Theorem: sin(n)/n')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[72w]`
> Sometimes a sequence is trapped between two others that both converge to the same limit. Then it must also converge to that limit. Classic example: sin(n)/n. Since sine is always between -1 and 1, dividing by n gives -1/n ≤ sin(n)/n ≤ 1/n. Both -1/n and 1/n converge to 0, so squeeze forces sin(n)/n to 0. You can see on the right how the red curve is squeezed between the dashed ones.

---

### Slide 6 · [CORE]
**Geometric Sequences: Convergence Rules**  ·  `split_left_right`

**On-screen text** `[11w]`
Geometric sequence: converges if |r|<1 or r=1. Diverges otherwise, including r=-1.

**LEFT** `[formula_block]`

$$\{r^n\} \text{ converges iff } -1 < r \le 1$$ $$\lim r^n = \begin{cases}0 & |r|<1\\1 & r=1\end{cases}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* 2x2 subplots. Each plots r^n for n=1..15. Cases: r=0.5 (converges to 0), r=1.2 (diverges to infinity), r=-1 (oscillates between -1, 1), r=-0.8 (converges to 0, alternating signs). Each subplot has a horizontal dashed line at 0 or 1 as appropriate. Title each with r value and 'converges' or 'diverges'.

```python
import numpy as np
import matplotlib.pyplot as plt
n = np.arange(1, 16)
fig, axes = plt.subplots(2,2, figsize=(8,6))
values = [0.5, 1.2, -1, -0.8]
labels = ['r=0.5 (CNV)', 'r=1.2 (DIV)', 'r=-1 (DIV)', 'r=-0.8 (CNV)']
for ax, r, lab in zip(axes.ravel(), values, labels):
    seq = r**n
    ax.stem(n, seq, linefmt='r-', markerfmt='ro', basefmt='k-')
    ax.axhline(y=0, color='k', linestyle=':')
    ax.set_title(lab)
    ax.set_xlabel('n')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[78w]`
> Geometric sequences, where each term multiplies by a constant ratio r, are everywhere. Here's the key: if the magnitude of r is less than 1, the terms shrink to zero. If r equals 1, every term is 1, so it converges to 1. But if r is 1.2, the terms grow without bound. And watch out for r equals -1: the terms flip-flop between -1 and 1, never settling – it diverges. The subplots illustrate all four cases.

---

### Slide 7 · [CORE]
**The Function Limit Theorem**  ·  `split_left_right`

**On-screen text** `[14w]`
If the continuous version has a limit at infinity, the discrete sequence inherits it.

**LEFT** `[text]`

If $\lim_{x\to\infty} f(x) = L$ and $a_n = f(n)$, then $\lim_{n\to\infty} a_n = L$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=ln(x)/x for x in [1,20] as a smooth blue curve. Superimpose red dots for integer points (n, ln(n)/n). Show a horizontal dashed line at 0. Both converge to 0. Title: 'Function limit theorem: ln(x)/x and its sequence'.

```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(1, 20, 400)
f = np.log(x)/x
n = np.arange(1, 21)
a_n = np.log(n)/n
plt.figure(figsize=(6,4))
plt.plot(x, f, 'b-', label='ln(x)/x')
plt.stem(n, a_n, linefmt='r-', markerfmt='ro', basefmt='k-', label='sequence')
plt.axhline(y=0, color='k', linestyle=':')
plt.xlabel('x or n')
plt.ylabel('function/sequence')
plt.title('Function Limit Theorem')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[87w]`
> Here's a powerful trick: if you can find a continuous function that matches the sequence at integer points and that function has a limit at infinity, then the sequence has the same limit. For instance, consider a_n equals ln n over n. The continuous function ln x over x also tends to 0 as x grows, which we can prove using L'Hôpital's Rule. The plot shows the smooth curve and the discrete points both heading to zero. This lets us use all our calculus tools on sequences.

---

### Slide 8 · [VISUAL_LAB] ⏸️ *[YouTube Pause]* 🎛 *[3 controls]*
**Visual Lab: Explore Convergence with an Epsilon Band**  ·  `split_left_right`

**On-screen text** `[14w]`
Slide epsilon to see how many terms fall inside the band. Toggle band visibility.

**LEFT** `[text]`

Use the slider to change epsilon and observe how the number of terms inside the band changes. Toggle the band on/off. See the N cutoff marking the first term that stays inside.

**RIGHT** `[python_lab]`

*Visual Spec:* Interactive matplotlib figure with: stem plot of a_n = 2+1/n for n=1..50. Horizontal dashed line at L=2. Slider for epsilon from 0.01 to 0.5. Red shaded band between L-ε and L+ε. A vertical dashed line at N = ceil(1/ε) +1 (adjust appropriately). Toggle button to show/hide the band. Title: 'Convergence of a_n = 2+1/n'. xlabel: n, ylabel: a_n.

*Interactive Controls:*
  - 🎛 Slider: epsilon (0.01 to 0.5)
  - 🎛 Button: Toggle Show/Hide Band
  - 🎛 Automatic update of N cutoff line

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

n = np.arange(1, 51)
a_n = 2 + 1/n
L = 2

fig, ax = plt.subplots(figsize=(8,5))
plt.subplots_adjust(bottom=0.25)

stem_lines = ax.stem(n, a_n, linefmt='b-', markerfmt='bo', basefmt='k-', label='a_n')
limit_line = ax.axhline(y=L, color='g', linestyle='--', label='Limit L=2')
# initial epsilon
epsilon = 0.1
band = ax.fill_between(n, L-epsilon, L+epsilon, color='r', alpha=0.2, label='epsilon band')
n_cutoff = int(np.ceil(1/epsilon)) + 1
cutoff_line = ax.axvline(x=n_cutoff, color='m', linestyle=':', linewidth=2, label='N cutoff')
ax.set_xlim(0, 55)
ax.set_ylim(1.5, 3.5)
ax.set_xlabel('n')
ax.set_ylabel('a_n')
ax.set_title('Convergence of a_n = 2+1/n')
ax.legend(loc='upper right')

ax_epsilon = plt.axes([0.15, 0.1, 0.65, 0.03], facecolor='lightgoldenrodyellow')
slider_eps = Slider(ax_epsilon, 'epsilon', 0.01, 0.5, valinit=epsilon, valstep=0.01)

ax_toggle = plt.axes([0.8, 0.1, 0.1, 0.04])
btn_toggle = Button(ax_toggle, 'Toggle Band')
band_visible = True

def update(val):
    global epsilon, n_cutoff
    epsilon = slider_eps.val
    # update band
    ax.collections.clear()
    band = ax.fill_between(n, L-epsilon, L+epsilon, color='r', alpha=0.2, label='epsilon band')
    # update cutoff
    n_cutoff = int(np.ceil(1/epsilon)) + 1
    cutoff_line.set_xdata([n_cutoff, n_cutoff])
    # update legend
    ax.legend()
    fig.canvas.draw_idle()

slider_eps.on_changed(update)

def toggle_band(event):
    global band_visible
    band_visible = not band_visible
    for coll in ax.collections:
        coll.set_visible(band_visible)
    fig.canvas.draw_idle()

btn_toggle.on_clicked(toggle_band)

plt.show()
```

**Teacher Narration** `[74w]`
> This interactive tool brings the epsilon-N definition to life. You see the sequence a_n equals 2 plus 1 over n. The green line is the limit 2. Use the slider to adjust epsilon – the red band shows the allowed region around the limit. Notice that when epsilon shrinks, the band narrows, and the cutoff N moves to the right. The intuitive idea: for any tolerance, eventually all later terms stay inside the band.

**Student Prompt:** Set epsilon to 0.05. How many terms are outside the band? What is the smallest N such that all later terms are inside?

---

### Slide 9 · [PRACTICE]
**Warm-Up Example: Direct Limit Calculation**  ·  `full_width`

**On-screen text** `[10w]`
Divide by highest power: limit = ratio of leading coefficients.

**FULL WIDTH** `[steps]`

**Problem:** Find $\lim_{n\to\infty} \dfrac{3n^2+1}{2n^2-5}$

| Step | Action | Result |
|------|--------|--------|
| 1 | Divide numerator and denominator by $n^2$ | $\dfrac{3+\frac{1}{n^2}}{2-\frac{5}{n^2}}$ |
| 2 | Let $n\to\infty$; terms with $n$ in denominator → 0 | $\dfrac{3+0}{2-0} = \dfrac{3}{2}$ |
| 3 | Check large n | $a_{100} \approx 1.5025$, $a_{1000} \approx 1.50025$ |

**Teacher Narration** `[63w]`
> Let's start with a straightforward rational sequence. We have (3n²+1)/(2n²-5). The trick is to divide numerator and denominator by the highest power of n, which is n². That gives (3 + 1/n²)/(2 - 5/n²). As n goes to infinity, 1/n² and 5/n² vanish, leaving 3/2. Check with large n: at n=100, the term is about 1.5025; at n=1000, 1.50025 – indeed approaching 1.5.

---

### Slide 10 · [PRACTICE] 🎛 *[1 controls]*
**Standard Example: Using the Squeeze Theorem**  ·  `split_left_right`

**On-screen text** `[14w]`
Use bounds -1 ≤ sin n ≤ 1. Divide by n, squeeze to 0.

**LEFT** `[steps]`

**Problem:** Determine convergence of $a_n = \dfrac{\sin n}{n}$.

1. Bound: $-1 \le \sin n \le 1$.
2. Divide: $-\dfrac{1}{n} \le a_n \le \dfrac{1}{n}$.
3. Both bounds → 0: $\lim (-1/n) = \lim (1/n) = 0$.
4. By Squeeze Theorem, $\lim a_n = 0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Reuse the squeeze plot from slide 5 (a_n = sin(n)/n). Add a button 'Show/hide bounds' that toggles the dashed lines. Highlight that the red curve is trapped.

*Interactive Controls:*
  - 🎛 Button: Show/hide bounds

**Teacher Narration** `[74w]`
> Here's a classic application of the Squeeze Theorem. The sequence sin n over n: you cannot take the limit of sin n directly because it oscillates. But we know sin n is always between -1 and 1. So dividing by n gives -1/n ≤ sin(n)/n ≤ 1/n. Both bounding sequences converge to 0, so the squeezed middle sequence must also converge to 0. That's a neat way to handle oscillating numerators that are bounded.

---

### Slide 11 · [MISCONCEPTION]
**Common Mistake: The Alternating Trap**  ·  `split_left_right`

**On-screen text** `[15w]`
$$a_n = \frac{(-1)^n n}{n+1}$$ Odd terms → -1, even → +1. Different limits means diverges.

**LEFT** `[text]`

**Wrong approach:** '$\frac{(-1)^n n}{n+1}$: since $\frac{n}{n+1} \to 1$, the whole sequence converges to 1.'

**Why it fails:** The factor $(-1)^n$ alternates sign. Odd subsequence → -1, even → 1. Different limits → divergence.

**RIGHT** `[visual_spec]`

*Visual Spec:* Stem plot for n=1..20. Use red stems and markers for odd n, blue for even n. Draw two horizontal dashed lines at y=-1 (red) and y=1 (blue). Title: 'Alternating trap: diverges because subsequences disagree'. Add legend.

```python
import numpy as np
import matplotlib.pyplot as plt
n = np.arange(1, 21)
a_n = ((-1)**n) * n / (n+1)
odd_mask = (n % 2 == 1)
even_mask = (n % 2 == 0)
plt.figure(figsize=(6,4))
plt.stem(n[odd_mask], a_n[odd_mask], linefmt='r-', markerfmt='ro', basefmt='k-', label='odd n')
plt.stem(n[even_mask], a_n[even_mask], linefmt='b-', markerfmt='bs', basefmt='k-', label='even n')
plt.axhline(y=-1, color='r', linestyle='--', alpha=0.7, label='limit -1')
plt.axhline(y=1, color='b', linestyle='--', alpha=0.7, label='limit +1')
plt.xlabel('n')
plt.ylabel('a_n')
plt.title('Alternating trap: diverges')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[75w]`
> A common error is to ignore the alternating sign. You see a_n equals (-1)^n times n/(n+1). The fraction part goes to 1, but the sign flips. If you look at odd n, the term is negative and approaches -1. Even n gives positive approaching +1. A convergent sequence must have every subsequence approach the same limit. Here they don't, so the sequence diverges, even though the absolute values approach 1. Always check for alternating signs!

---

### Slide 12 · [PRACTICE] 🟡
**Edge Case: Geometric with Negative Ratio**  ·  `split_left_right`

**On-screen text** `[14w]`
Even with alternating signs, if |r| < 1 the geometric sequence converges to 0.

**LEFT** `[steps]`

**Problem:** Does $a_n = \left(-\frac{3}{4}\right)^n$ converge?

1. Identify $r = -\frac{3}{4}$, $|r| = \frac{3}{4} < 1$.
2. Geometric theorem: if $|r| < 1$, $\lim r^n = 0$.
3. Even though terms alternate sign, magnitude shrinks to 0.
4. Therefore $\lim a_n = 0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Stem plot of a_n = (-0.75)^n for n=1..15. Red for odd n, blue for even n. Horizontal dashed line at y=0. Title: '(-3/4)^n converges to 0 (alternating signs shrink)'.

```python
import numpy as np
import matplotlib.pyplot as plt
n = np.arange(1, 16)
a_n = (-0.75)**n
odd = n % 2 == 1
plt.figure(figsize=(6,4))
plt.stem(n[odd], a_n[odd], linefmt='r-', markerfmt='ro', basefmt='k-', label='odd')
plt.stem(n[~odd], a_n[~odd], linefmt='b-', markerfmt='bs', basefmt='k-', label='even')
plt.axhline(y=0, color='k', linestyle=':')
plt.legend()
plt.title('(-3/4)^n converges to 0')
plt.xlabel('n')
plt.ylabel('a_n')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[73w]`
> Here's an edge case: a geometric sequence with a negative ratio like -3/4. The terms alternate sign: -0.75, 0.5625, -0.421875, and so on. But the magnitude decreases each step because |r| = 0.75 < 1. The geometric convergence theorem tells us that the limit is 0 regardless of sign. The plot shows the alternating pattern tightening around zero. So sign alone does not cause divergence; what matters is the magnitude of the ratio.

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Recursive Sequence with Fixed Point**  ·  `split_left_right`

**On-screen text** `[17w]`
Assume limit L exists, then substitute into recurrence: L = ½(L + 2/L). Solve L²=2 → L=√2.

**LEFT** `[steps]`

**Problem:** $a_1 = 2$, $a_{n+1} = \frac12\left(a_n + \frac{2}{a_n}\right)$. Find limit if it converges.

1. Assume $\lim a_n = L$ exists.
2. Take limit of recurrence: $L = \frac12(L + 2/L)$.
3. Solve: $2L = L + 2/L \Rightarrow L = 2/L \Rightarrow L^2 = 2 \Rightarrow L = \sqrt{2}$.
4. Verify: $a_2=1.5$, $a_3≈1.4167$, $a_4≈1.4142$ → converges to $\sqrt{2}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Stem plot for n=1..6 of the Babylonian sequence. Include a dashed horizontal line at sqrt(2). Title: 'Babylonian method for sqrt(2) converges quickly'.

```python
import numpy as np
import matplotlib.pyplot as plt
N=6
a = np.zeros(N)
a[0]=2.0
for i in range(1,N):
    a[i]=0.5*(a[i-1]+2/a[i-1])
n=np.arange(1,N+1)
plt.figure(figsize=(6,4))
plt.stem(n, a, linefmt='b-', markerfmt='bo', basefmt='k-', label='a_n')
plt.axhline(y=np.sqrt(2), color='r', linestyle='--', label='sqrt(2)')
plt.legend()
plt.title('Babylonian sequence converges to sqrt(2)')
plt.xlabel('n')
plt.ylabel('a_n')
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[93w]`
> This is a classic recursive sequence known as the Babylonian method for square roots. It starts at 2 and each term is the average of the previous term and 2 divided by that term. If the sequence converges to some L, then taking limits on both sides gives L = half of L plus 2 over L. Solving that yields L squared equals 2, so L is the square root of 2. The numerical values confirm it: after just four steps, we already have 1.4142, which is very close to the true value.

---

### Slide 14 · [PRACTICE] 🟡
**Application: Using Function Limit Theorem with L'Hôpital**  ·  `split_left_right`

**On-screen text** `[20w]`
Use L'Hôpital on the continuous function: limit of ln x / x = 0, so sequence also tends to 0.

**LEFT** `[steps]`

**Problem:** $\lim_{n\to\infty} \dfrac{\ln n}{n}$.

1. Define $f(x) = \frac{\ln x}{x}$ for $x>0$.
2. Since $f(n)=a_n$, if $\lim_{x\to\infty} f(x)$ exists, sequence inherits it.
3. Compute $\lim_{x\to\infty} \frac{\ln x}{x}$ using L'Hôpital: $\lim \frac{1/x}{1} = 0$.
4. Therefore $\lim_{n\to\infty} \frac{\ln n}{n} = 0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Same plot as slide 7, but with a text box: 'Limit = 0' and an annotation showing L'Hôpital step: 'ln x / x → (1/x) / 1 → 0'.

**Teacher Narration** `[84w]`
> This problem shows a powerful bridge: we can use L'Hôpital's Rule on a continuous version of the sequence. The function ln x over x has the indeterminate form infinity over infinity at infinity. Differentiating numerator and denominator gives 1/x over 1, which goes to 0. Since the continuous function tends to 0, the discrete sequence ln n over n also tends to 0. The numeric check confirms: at n=10000, the term is about 0.0009. This technique is extremely useful for sequences with transcendental functions.

---

### Slide 15 · [SUMMARY]
**Summary and Key Takeaways**  ·  `full_width`

**On-screen text** `[13w]`
Main tools: definition, limit laws, squeeze, geometric rule, function limit theorem, fixed-point method.

**FULL WIDTH** `[text]`

**Recap of learning objectives:**

1. **Definition:** A sequence is a function on ℕ.
2. **Convergence:** $\lim a_n = L$ means terms eventually stay arbitrarily close to $L$.
3. **Limit laws:** Sum, product, quotient of convergent sequences converge accordingly.
4. **Squeeze theorem:** Trap sequence between two convergent ones.
5. **Geometric sequences:** Converge if $|r|<1$ (to 0) or $r=1$ (to 1).
6. **Function limit theorem:** Continuous limit implies discrete limit.
7. **Recursive sequences:** Find fixed point by assuming limit exists.

**Pro tip:** For rational functions, compare degrees to find limit instantly.

**Teacher Narration** `[90w]`
> Let's review. A sequence is just a function on the natural numbers. It converges if its terms approach a single value. We have several tools: limit laws for combining known limits, the squeeze theorem for trapped sequences, the special behavior of geometric sequences, and the function limit theorem that lets us borrow calculus tools like L'Hôpital. For recursive sequences, if you think it converges, you can solve for the limit by assuming it exists. Always check edge cases: alternating signs, negative ratios, and unbounded growth. Good luck with your practice!

---
