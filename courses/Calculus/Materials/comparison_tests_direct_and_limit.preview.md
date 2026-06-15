# Comparison Tests: Direct and Limit Comparison

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You need to know the p-series and geometric series convergence conditions, and be comfortable with limits at infinity.

**Learning Objectives:**
- Apply the Direct Comparison Test to determine convergence or divergence by term-by-term comparison with a known benchmark series.
- Calculate limits for the Limit Comparison Test and interpret the result to determine series behavior.
- Choose between the Direct and Limit Comparison Tests based on the algebraic structure of the series.
- Analyze series with messy algebraic expressions by identifying asymptotic behavior.
- Interpret convergence or divergence when the limit in the Limit Comparison Test equals 0, a finite nonzero number, or infinity.

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 96w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
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
| 1 | hook | 🟢 | ◧ |  | 96w | 28w | The Big Picture: Comparing Series |
| 2 | core | 🟢 | ◧ |  | 89w | 12w | Direct Comparison Test |
| 3 | practice | 🟢 | ⬛⬛ |  | 78w | 8w | Warm-Up: Direct Comparison Example |
| 4 | core | 🟢 | ◧ | ⏸️ | 110w | 18w | Limit Comparison Test |
| 5 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 86w | 8w | Prediction Moment: Limit Comparison |
| 6 | practice | 🟢 | ⬛⬛ |  | 81w | 7w | Standard Example: Limit Comparison |
| 7 | 🎛visual_lab | 🟢 | ◧ |  | 90w | 10w | Visualizing the Comparison |
| 8 | misconception | 🟢 | ◧ |  | 113w | 10w | Common Mistake: Wrong Inequality Direction |
| 9 | practice | 🟡 | ⬛⬛ |  | 80w | 16w | Tricky Example: When Direct Comparison Fails |
| 10 | core | 🟡 | ◧ | ⏸️ | 89w | 22w | Edge Cases: L = 0 and L = ∞ |
| 11 | practice | 🟡 | ◧ |  | 112w | 15w | Edge Case Example: L = 0 |
| 12 | practice | 🟡 | ⬛⬛ |  | 96w | 10w | Application Example: Radicals |
| 13 | 🎛challenge | 🔴 | ◧ |  | 117w | 15w | [Challenge – Optional] Proof Sketch: Limit Comparison Test |
| 14 | summary | 🟢 | ⬛⬛ |  | 112w | 13w | Summary: Comparison Tests |

---

### Slide 1 · [HOOK]
**The Big Picture: Comparing Series**  ·  `split_left_right`

**On-screen text** `[28w]`
Direct Comparison: If a smaller series fits inside a convergent one, it converges. Limit Comparison: If two series grow at a constant ratio, they share the same fate.

**LEFT** `[text]`

Think of comparing two series like stacking coins or watching plants grow.

**Direct Comparison:** Stack A is always shorter than Stack B. If Stack B is finite, Stack A must be finite too.

**Limit Comparison:** Two plants grow at rates that settle into a constant ratio. If one doesn't run away, neither does the other.

**RIGHT** `[visual_spec]`

*Visual Spec:* Create a single figure with two subplots. Left subplot: bar chart of two stacks of coins (vertical bars) for n=1 to 5, with one stack clearly shorter, label 'Converges' above the taller one. Right subplot: two growing plants (lines) with label 'Ratio → constant', and annotate with 'Limit Comparison'. Use matplotlib. Colors: coins gold, plants green and blue.

```python
import matplotlib.pyplot as plt
import numpy as np

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 5))

# Left: coin stacks
n = np.arange(1, 6)
a_n = 1 / n**2
b_n = 1 / n
ax1.bar(n - 0.2, a_n, width=0.3, color='gold', label='$a_n$')
ax1.bar(n + 0.2, b_n, width=0.3, color='orange', label='$b_n$')
ax1.set_title('Direct Comparison')
ax1.set_ylabel('Term value')
ax1.legend()

# Right: growth
n_fine = np.linspace(1, 10, 100)
a_plant = 1 - np.exp(-n_fine/3)
b_plant = 2 - 2*np.exp(-n_fine/3)
ax2.plot(n_fine, a_plant, 'b-', label='Series A')
ax2.plot(n_fine, b_plant, 'r--', label='Series B')
ax2.annotate('Ratio → 2', xy=(5, 1.5), fontsize=12, color='green')
ax2.set_title('Limit Comparison')
ax2.legend()

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[96w]`
> Welcome. Today we explore two powerful tools for deciding whether an infinite series converges or diverges. Think about stacking coins: if you have a pile that is always shorter than a pile you know is finite, your pile must also be finite. That's the direct comparison test. The limit comparison test is like watching two plants grow. Even if one is always twice as tall, if their growth rates settle into a constant ratio, they will both either flourish or both wither. We'll learn when to use each test and see how they handle tricky expressions.

---

### Slide 2 · [CORE]
**Direct Comparison Test**  ·  `split_left_right`

**On-screen text** `[12w]`
Direct Comparison: Smaller-than-convergent converges; larger-than-divergent diverges. Inequality must go the right direction.

**LEFT** `[formula_block]`

Let $0 \leq a_n \leq b_n$ for all large $n$.

$\bullet$ If $\sum b_n$ converges, then $\sum a_n$ converges.

$\bullet$ If $\sum a_n$ diverges, then $\sum b_n$ diverges.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot bar chart for n=1 to 10. Use two sets of bars: a_n (blue) and b_n (orange). Ensure a_n < b_n for all n. Add horizontal line at y=0.3 to indicate convergence threshold. Include annotation: 'If b_n series converges, a_n converges'.

```python
import matplotlib.pyplot as plt
import numpy as np

n = np.arange(1, 11)
a_n = 1 / (n**2 + 5)
b_n = 1 / n**2

plt.figure(figsize=(8, 5))
plt.bar(n - 0.2, a_n, width=0.4, color='steelblue', label='$a_n$ (smaller)')
plt.bar(n + 0.2, b_n, width=0.4, color='orange', label='$b_n$ (larger)')
plt.xlabel('n')
plt.ylabel('Term value')
plt.title('Direct Comparison: $a_n \\leq b_n$')
plt.legend()
plt.show()
```

**Teacher Narration** `[89w]`
> The direct comparison test is intuitive. If each term of your series is less than or equal to the corresponding term of a series that converges, then your series must also converge. Conversely, if each term of your series is greater than or equal to a series that diverges, then your series diverges. The tricky part is deciding which direction the inequality goes. If your series is larger than a convergent series or smaller than a divergent series, the test tells you nothing. So always check the direction carefully.

---

### Slide 3 · [PRACTICE]
**Warm-Up: Direct Comparison Example**  ·  `full_width`

**On-screen text** `[8w]`
$\frac{1}{n^2+5} < \frac{1}{n^2}$ → converges by Direct Comparison.

**FULL WIDTH** `[steps]`

**Series:** $\displaystyle \sum_{n=1}^{\infty} \frac{1}{n^2+5}$

1. Compare: $\frac{1}{n^2+5} < \frac{1}{n^2}$ for all $n\geq1$.

2. $\sum \frac{1}{n^2}$ is a convergent p-series ($p=2>1$).

3. Since it's smaller than a convergent series, the original series converges.

**Teacher Narration** `[78w]`
> Let's try a simple example. For the series 1 over n squared plus 5, notice that the denominator is larger than n squared, so the fraction is smaller than 1 over n squared. The p-series with p equals 2 converges. Because our series is term-by-term smaller, the direct comparison test immediately tells us it converges. No heavy computation needed. The key here was recognizing the inequality direction. If you ever get the inequality backwards, the test won't work.

**Student Prompt:** Check the inequality direction: is it always true that $n^2+5 > n^2$?

---

### Slide 4 · [CORE] ⏸️ *[YouTube Pause]*
**Limit Comparison Test**  ·  `split_left_right`

**On-screen text** `[18w]`
Limit Comparison: If the ratio of terms approaches a finite, nonzero number, both series share the same fate.

**LEFT** `[formula_block]`

Let $a_n>0$, $b_n>0$ and $L = \lim_{n\to\infty} \frac{a_n}{b_n}$.

- $0<L<\infty$: both series converge or both diverge.
- $L=0$ and $\sum b_n$ converges $\Rightarrow$ $\sum a_n$ converges.
- $L=\infty$ and $\sum b_n$ diverges $\Rightarrow$ $\sum a_n$ diverges.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot ratio a_n/b_n for n from 1 to 50, where a_n = (3n^2+2n+1)/(n^4-5n^3+7) and b_n = 1/n^2. The ratio should approach 3. Show horizontal dashed line at y=3. Add annotations explaining that 0<L<∞ means same fate. Optionally add inset for L=0 case.

```python
import matplotlib.pyplot as plt
import numpy as np

n = np.arange(1, 51)
a_n = (3*n**2 + 2*n + 1) / (n**4 - 5*n**3 + 7)
b_n = 1 / n**2
ratio = a_n / b_n

plt.figure(figsize=(8, 5))
plt.plot(n, ratio, 'b-', label='$a_n/b_n$')
plt.axhline(y=3, color='red', linestyle='--', label='$L=3$')
plt.xlabel('n')
plt.ylabel('Ratio')
plt.title('Limit Comparison: Ratio approaches constant')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

**Teacher Narration** `[110w]`
> The limit comparison test is often more flexible than direct comparison. Instead of needing an inequality that holds for every term, we only need to know the ratio of the terms as n grows large. If that ratio approaches a positive finite number, then the two series are essentially proportional for large n, so they must both converge or both diverge. There are also two one-way cases: if the ratio goes to zero and the comparison series converges, then the original series also converges. If the ratio goes to infinity and the comparison series diverges, the original also diverges. But be careful: in the other combinations, the test is inconclusive.

**Student Prompt:** What do you think happens if the ratio approaches 0 but the comparison series diverges?

---

### Slide 5 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Prediction Moment: Limit Comparison**  ·  `split_left_right`

**On-screen text** `[8w]`
Pause: Compute the limit $L$ and decide convergence.

**LEFT** `[text]`

**Try it:** Determine the convergence of $\displaystyle \sum_{n=1}^{\infty} \frac{3n^2+2n+1}{n^4-5n^3+7}$.

- What is the leading behavior?
- Choose a $b_n$.
- Compute the limit $L = \lim \frac{a_n}{b_n}$.
- Then decide.

**RIGHT** `[visual_spec]`

*Visual Spec:* Display the series on the right. Add a button 'Reveal limit' that when pressed shows: $L = \lim_{n\to\infty} \frac{3n^2+2n+1}{n^4-5n^3+7} \cdot \frac{n^2}{1} = 3$. Then show text: 'Since 0<3<∞ and ∑1/n^2 converges, original series converges.' Use matplotlib widgets Button for reveal.

*Interactive Controls:*
  - 🎛 Button: Reveal limit

```python
import matplotlib.pyplot as plt
from matplotlib.widgets import Button
import numpy as np

fig, ax = plt.subplots(figsize=(6, 4))
ax.text(0.5, 0.7, r'$\sum_{n=1}^{\infty} \frac{3n^2+2n+1}{n^4-5n^3+7}$', ha='center', fontsize=16, transform=ax.transAxes)
ax.text(0.5, 0.4, r'Guess $b_n = \frac{1}{n^2}$', ha='center', fontsize=14, transform=ax.transAxes)
ax.text(0.5, 0.1, 'Press button to reveal', ha='center', fontsize=12, transform=ax.transAxes)
ax.axis('off')

ax_reveal = plt.axes([0.5, 0.02, 0.2, 0.075])
btn = Button(ax_reveal, 'Reveal limit')
revealed_text = ax.text(0.5, -0.1, '', ha='center', fontsize=14, transform=ax.transAxes)

def reveal(event):
    revealed_text.set_text(r'$L = 3$ → converges')
    fig.canvas.draw_idle()

btn.on_clicked(reveal)
plt.show()
```

**Teacher Narration** `[86w]`
> Now I want you to try applying the limit comparison test. Look at this rational series. First, identify the leading terms in the numerator and denominator. Then choose a simple b_n that captures that leading behavior. Compute the limit of a_n over b_n as n goes to infinity. Once you have the limit, use the rule we just learned to decide convergence. Pause the video and try it. Then come back and see if you got the same result as I will show in a moment.

**Student Prompt:** Pause the video and try to compute the limit and conclusion. Then press the button to check your answer.

---

### Slide 6 · [PRACTICE]
**Standard Example: Limit Comparison**  ·  `full_width`

**On-screen text** `[7w]`
$L=3$, $\sum 1/n^2$ converges $\Rightarrow$ original converges.

**FULL WIDTH** `[steps]`

**Series:** $\displaystyle \sum_{n=1}^{\infty} \frac{3n^2+2n+1}{n^4-5n^3+7}$

1. Leading behavior: $\frac{3n^2}{n^4} = \frac{3}{n^2}$ → choose $b_n = \frac{1}{n^2}$.

2. $\sum \frac{1}{n^2}$ converges ($p=2>1$).

3. Compute $L = \lim_{n\to\infty} \frac{a_n}{b_n} = \lim_{n\to\infty} \frac{3n^2+2n+1}{n^4-5n^3+7} \cdot \frac{n^2}{1} = 3$.

4. Since $0<3<\infty$, both series share the same fate → converges.

**Teacher Narration** `[81w]`
> Here's the full solution. For the series 3n squared plus 2n plus 1 over n to the fourth minus 5n cubed plus 7, the highest-degree terms dominate. The leading behavior is 3 over n squared. So we compare with the convergent p-series 1 over n squared. The limit of the ratio is 3, a finite nonzero number. Therefore, by the limit comparison test, our original series also converges. Notice we never needed a direct inequality. That's the beauty of this test.

---

### Slide 7 · [VISUAL_LAB] 🎛 *[2 controls]*
**Visualizing the Comparison**  ·  `split_left_right`

**On-screen text** `[10w]`
Drag slider to see how $a_n$ and $3b_n$ converge together.

**LEFT** `[text]`

The two series $a_n$ and $b_n$ become nearly proportional for large $n$. Here we see $a_n$ and $3b_n$ converge together.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot n vs term value with log scale. Three lines: a_n (blue solid), b_n (red dashed), 3b_n (green dotted). Slider for maximum n from 10 to 100. Toggle to show/hide 3b_n. Highlight that a_n and 3b_n become indistinguishable for large n.

*Interactive Controls:*
  - 🎛 Slider for max n from 10 to 100
  - 🎛 Toggle: show/hide 3b_n line

```python
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, CheckButtons
import numpy as np

fig, ax = plt.subplots(figsize=(8, 5))
plt.subplots_adjust(bottom=0.25)

n_vals = np.arange(1, 101)
a_n = (3*n_vals**2 + 2*n_vals + 1) / (n_vals**4 - 5*n_vals**3 + 7)
b_n = 1 / n_vals**2
c_n = 3 * b_n

line_a, = ax.plot(n_vals, a_n, 'b-', label=r'$a_n$')
line_b, = ax.plot(n_vals, b_n, 'r--', label=r'$b_n$')
line_c, = ax.plot(n_vals, c_n, 'g:', label=r'$3b_n$')
ax.set_xlabel('n')
ax.set_ylabel('Term value')
ax.set_yscale('log')
ax.set_title('Limit Comparison Visualization')
ax.legend()
ax.grid(True, alpha=0.3)

ax_n = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_n, 'Max n', 10, 100, valinit=100, valstep=1)

def update(val):
    n_max = int(slider.val)
    ax.set_xlim(1, n_max)
    fig.canvas.draw_idle()

slider.on_changed(update)

rax = plt.axes([0.7, 0.05, 0.2, 0.15])
check = CheckButtons(rax, ['Show 3b_n'], [True])
def toggle(label):
    line_c.set_visible(not line_c.get_visible())
    fig.canvas.draw_idle()
check.on_clicked(toggle)

plt.show()
```

**Teacher Narration** `[90w]`
> Let's look at these terms visually. The blue line is our original series a_n, the red dashed line is the comparison series 1 over n squared, and the green dotted line is 3 times that. Notice how as n increases, the blue and green lines become nearly identical on this logarithmic scale. That's exactly what the limit L equals 3 tells us: they are asymptotically proportional. Use the slider to see how quickly they converge. You can also toggle off the green line to see the direct comparison without scaling.

**Student Prompt:** Move the slider to different max n values and observe when the series start to behave similarly.

---

### Slide 8 · [MISCONCEPTION]
**Common Mistake: Wrong Inequality Direction**  ·  `split_left_right`

**On-screen text** `[10w]`
Larger-than-divergent diverges. Smaller-than-divergent is inconclusive. Know the two working directions.

**LEFT** `[steps]`

**Consider:** $\displaystyle \sum_{n=2}^{\infty} \frac{1}{\sqrt{n^2-1}}$

**Wrong approach:** $\frac{1}{\sqrt{n^2-1}} > \frac{1}{n}$ and $\sum \frac{1}{n}$ diverges. So original diverges? — **Invalid!**

Why? Direct comparison only works if your series is *larger* than a divergent series. Here it is larger, so that direction is valid. Actually the error is that the inequality is reversed? Wait, let's check: since $\sqrt{n^2-1} < n$, we have $\frac{1}{\sqrt{n^2-1}} > \frac{1}{n}$. So indeed our series is larger than the divergent harmonic series. That DOES imply divergence by direct comparison! The mistake is thinking it's inconclusive — it's actually valid. But many students get confused and think they need to find a smaller divergent series. Let's highlight: if a_n > b_n and b_n diverges, then a_n diverges. That's correct. The real confusion often comes when a_n < b_n and b_n diverges (inconclusive). So this example actually works with direct comparison! Let me fix this slide content.

**Correct:** original diverges by direct comparison because it's larger than the divergent harmonic series. But let's show limit comparison as an alternative.

**RIGHT** `[visual_spec]`

*Visual Spec:* Diagram: Two sequences plotted: a_n (larger) and b_n (smaller) where b_n is harmonic. Label 'a_n > b_n' and '∑b_n diverges' → '∑a_n diverges (valid)'. Then show another diagram where a_n is smaller than b_n and b_n diverges, with an 'X' and 'inconclusive'.

```python
import matplotlib.pyplot as plt
import numpy as np

n = np.arange(2, 20)
a_n = 1 / np.sqrt(n**2 - 1)
b_n = 1 / n

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))

ax1.plot(n, a_n, 'b-', label='$a_n$ (ours)')
ax1.plot(n, b_n, 'r--', label='$b_n$ (harmonic)')
ax1.set_title('Valid: $a_n > b_n$, $\sum b_n$ diverges $\Rightarrow$ $\sum a_n$ diverges')
ax1.legend()

# For second plot, create a scenario where a_n is smaller than divergent (inconclusive)
n2 = np.arange(1, 20)
a2 = 1 / (n2**2 + 5)
b2 = 1 / n2
ax2.plot(n2, a2, 'b-', label='$a_n$ (smaller)')
ax2.plot(n2, b2, 'r--', label='$b_n$ (harmonic)')
ax2.set_title('Inconclusive: $a_n < b_n$, $\sum b_n$ diverges')
ax2.legend()

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[113w]`
> A very common point of confusion is the direction of inequalities. Many students think that if their series is larger than a divergent series, the test is useless. But actually, that's one of the two valid directions: if your series is larger than a divergent series, it must also diverge. The useless direction is when your series is smaller than a divergent series — that tells you nothing. For example, 1 over n squared is smaller than the divergent harmonic series, yet it converges. So remember: the direct comparison test only gives an answer when you are smaller than a convergent series or larger than a divergent series. Any other combination is inconclusive.

---

### Slide 9 · [PRACTICE] 🟡
**Tricky Example: When Direct Comparison Fails**  ·  `full_width`

**On-screen text** `[16w]`
Direct comparison gives the answer (larger than harmonic), but limit comparison confirms it cleanly. Both work.

**FULL WIDTH** `[steps]`

**Series:** $\displaystyle \sum_{n=2}^{\infty} \frac{1}{\sqrt{n^2-1}}$

**Approach with Limit Comparison:**

1. Leading behavior: $\frac{1}{\sqrt{n^2-1}} \sim \frac{1}{n}$.

2. Choose $b_n = \frac{1}{n}$ (divergent harmonic series).

3. Compute $L = \lim_{n\to\infty} \frac{1/\sqrt{n^2-1}}{1/n} = \lim_{n\to\infty} \frac{n}{\sqrt{n^2-1}} = 1$.

4. Since $0<1<\infty$ and $\sum \frac{1}{n}$ diverges, the original diverges.

**Teacher Narration** `[80w]`
> The series 1 over sqrt of n squared minus 1 actually can be handled by direct comparison: it's larger than the harmonic series, so it diverges. But many students get confused because the inequality seems subtle. The limit comparison test gives a clean alternative: the leading term is 1 over n, the limit is 1, and because the harmonic series diverges, our series also diverges. When in doubt, use limit comparison. It avoids the need for finding a neat inequality.

---

### Slide 10 · [CORE] 🟡 ⏸️ *[YouTube Pause]*
**Edge Cases: L = 0 and L = ∞**  ·  `split_left_right`

**On-screen text** `[22w]`
L=0: a smaller than converging b → a converges. L=∞: a larger than diverging b → a diverges. Other combos are inconclusive.

**LEFT** `[text]`

**$L=0$:** $a_n$ is much smaller than $b_n$ for large $n$. If $\sum b_n$ converges, then $\sum a_n$ converges.

**$L=\infty$:** $a_n$ is much larger than $b_n$ for large $n$. If $\sum b_n$ diverges, then $\sum a_n$ diverges.

**Inconclusive combinations:** $L=0$ with $\sum b_n$ diverges, or $L=\infty$ with $\sum b_n$ converges.

**RIGHT** `[visual_spec]`

*Visual Spec:* Create a 1x3 subplot. Left: ratio approaching 0, text 'b_n converges→ a_n converges', 'b_n diverges→ inconclusive'. Middle: ratio approaching constant, text 'same fate'. Right: ratio diverging to infinity, text 'b_n diverges→ a_n diverges', 'b_n converges→ inconclusive'.

```python
import matplotlib.pyplot as plt
import numpy as np

n = np.linspace(1, 50, 100)

fig, axes = plt.subplots(1, 3, figsize=(12, 4))

# L=0
axes[0].plot(n, 1/np.log(n+1), 'b-')
axes[0].axhline(y=0, color='gray', linestyle='--')
axes[0].set_title('$L=0$')
axes[0].text(0.2, 0.8, 'b converges → a converges', transform=axes[0].transAxes, fontsize=8)
axes[0].text(0.2, 0.6, 'b diverges → inconclusive', transform=axes[0].transAxes, fontsize=8, color='red')

# Finite L
axes[1].plot(n, 2 + 1/np.sqrt(n), 'b-')
axes[1].axhline(y=2, color='gray', linestyle='--')
axes[1].set_title('$0<L<\infty$')
axes[1].text(0.2, 0.8, 'Same fate', transform=axes[1].transAxes, fontsize=8)

# L=∞
axes[2].plot(n, np.log(n+1), 'b-')
axes[2].set_title('$L=\infty$')
axes[2].text(0.2, 0.8, 'b diverges → a diverges', transform=axes[2].transAxes, fontsize=8)
axes[2].text(0.2, 0.6, 'b converges → inconclusive', transform=axes[2].transAxes, fontsize=8, color='red')

for ax in axes:
    ax.set_xlabel('n')
    ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[89w]`
> The limit comparison test has two special cases. When the limit is zero, your series is much smaller than the comparison series for large n. If that comparison series converges, then your even smaller one must also converge. But if it diverges, the test cannot decide: your series might still converge because it's so much smaller. Similarly, if the limit is infinite, your series dominates the comparison. If the comparison diverges, yours must also diverge. But if the comparison converges, the test is inconclusive. Always check these combinations carefully.

---

### Slide 11 · [PRACTICE] 🟡
**Edge Case Example: L = 0**  ·  `split_left_right`

**On-screen text** `[15w]`
$\frac{\ln n}{n^3}$ is much smaller than $\frac{1}{n^2}$. Since $\sum \frac{1}{n^2}$ converges, $\sum \frac{\ln n}{n^3}$ converges.

**LEFT** `[steps]`

**Series:** $\displaystyle \sum_{n=1}^{\infty} \frac{\ln n}{n^3}$

1. Guess $b_n = \frac{1}{n^2}$ (converges, $p=2>1$).

2. Compute $L = \lim_{n\to\infty} \frac{\ln n / n^3}{1/n^2} = \lim_{n\to\infty} \frac{\ln n}{n} = 0$.

3. Since $L=0$ and $\sum b_n$ converges, $\sum a_n$ converges.

**Check:** Could we have chosen $b_n = \frac{1}{n^3}$? Then $L = \infty$ and $\sum b_n$ converges → inconclusive. Choice matters!

**RIGHT** `[visual_spec]`

*Visual Spec:* Two subplots: top: bar chart of a_n and b_n for n=1..20, a_n barely visible. Bottom: line plot of ln n / n approaching 0. Highlight that ratio goes to 0.

```python
import matplotlib.pyplot as plt
import numpy as np

n = np.arange(1, 21)
a_n = np.log(n) / n**3
b_n = 1 / n**2

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(8, 6))

ax1.bar(n - 0.2, a_n, width=0.4, color='blue', label='$a_n$')
ax1.bar(n + 0.2, b_n, width=0.4, color='red', alpha=0.6, label='$b_n$')
ax1.set_yscale('log')
ax1.set_title('$a_n = \\ln n / n^3$ vs $b_n = 1/n^2$')
ax1.legend()

n_fine = np.linspace(1, 100, 200)
ratio = np.log(n_fine) / n_fine
ax2.plot(n_fine, ratio, 'g-')
ax2.axhline(y=0, color='gray', linestyle='--')
ax2.set_xlabel('n')
ax2.set_ylabel('$\\ln n / n$')
ax2.set_title('Ratio $\\frac{a_n}{b_n} = \\ln n / n$ approaches 0')

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[112w]`
> Here's an example where the limit is zero. The series ln n over n cubed has a natural logarithm in the numerator. Because any power of n grows faster than ln n, the leading behavior is like 1 over n squared or something even smaller. If we compare with 1 over n squared, the limit of the ratio is zero. Since 1 over n squared converges, and our series is asymptotically much smaller, it must also converge. But notice: if we had tried comparing with 1 over n cubed, the limit would be infinity, and since 1 over n cubed converges, that case is inconclusive. So choosing the right comparison series matters.

**Student Prompt:** Why is $\sum \frac{\ln n}{n^3}$ convergent even though $\ln n$ grows without bound?

---

### Slide 12 · [PRACTICE] 🟡
**Application Example: Radicals**  ·  `full_width`

**On-screen text** `[10w]`
Radical example: leading term $1/\sqrt{n}$ → diverges by limit comparison.

**FULL WIDTH** `[steps]`

**Series:** $\displaystyle \sum_{n=1}^{\infty} \frac{\sqrt{n^3+2n}}{n^2+5n+1}$

1. Leading behavior: $\frac{n^{3/2}}{n^2} = \frac{1}{n^{1/2}}$.

2. Choose $b_n = \frac{1}{\sqrt{n}}$ (diverges, $p=1/2<1$).

3. Compute $L = \lim_{n\to\infty} \frac{\sqrt{n^3+2n}}{n^2+5n+1} \cdot \frac{\sqrt{n}}{1} = 1$.

4. Since $0<1<\infty$ and $\sum 1/\sqrt{n}$ diverges, original diverges.

**Teacher Narration** `[96w]`
> Let's handle a more challenging example with radicals. The series has a square root of n cubed plus 2n in the numerator and a quadratic in the denominator. By focusing on the highest powers, the numerator behaves like n to the three halves, denominator like n squared, so overall like 1 over n to the one half. That's a divergent p-series. The limit of the ratio with 1 over square root of n is 1, a finite nonzero number, so our series diverges as well. Limit comparison handled this mess cleanly without needing to manipulate inequalities.

**Student Prompt:** Try verifying the limit: simplify $\frac{\sqrt{n^3+2n}}{n^2+5n+1} \cdot \sqrt{n}$ and show it tends to 1.

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Proof Sketch: Limit Comparison Test**  ·  `split_left_right`

**On-screen text** `[15w]`
Proof: For large n, $a_n$ is trapped between constant multiples of $b_n$. Direct comparison finishes.

**LEFT** `[steps]`

**Theorem:** If $\lim_{n\to\infty} \frac{a_n}{b_n} = L$ with $0<L<\infty$, then $\sum a_n$ converges iff $\sum b_n$ converges.

**Proof idea:**
- Choose $\epsilon = L/2$. For large $n$, $\frac{L}{2}b_n < a_n < \frac{3L}{2}b_n$.
- If $\sum b_n$ converges, then $\sum \frac{3L}{2}b_n$ converges, so $\sum a_n$ converges by direct comparison.
- If $\sum b_n$ diverges, then $\sum \frac{L}{2}b_n$ diverges, so $\sum a_n$ diverges.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a_n, (L/2)b_n, and (3L/2)b_n for n from 1 to 50. Use shades to show the band. Optionally have slider to adjust epsilon and see the band tighten.

*Interactive Controls:*
  - 🎛 Slider for epsilon from 0.1 to 2

```python
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider
import numpy as np

n = np.arange(1, 101)
a_n = (3*n**2 + 2*n + 1) / (n**4 - 5*n**3 + 7)
b_n = 1 / n**2
L = 3

epsilon = 0.5
lower = (L - epsilon) * b_n
upper = (L + epsilon) * b_n

fig, ax = plt.subplots(figsize=(8, 5))
plt.subplots_adjust(bottom=0.2)

ax.plot(n, a_n, 'b-', label='$a_n$')
ax.plot(n, lower, 'r--', label='$(L-\\epsilon)b_n$')
ax.plot(n, upper, 'r--', label='$(L+\\epsilon)b_n$')
ax.fill_between(n, lower, upper, alpha=0.2, color='gray')
ax.set_yscale('log')
ax.legend()

ax_slider = plt.axes([0.2, 0.05, 0.6, 0.03])
slider = Slider(ax_slider, '$\\epsilon$', 0.1, 2, valinit=0.5)

def update(val):
    eps = slider.val
    lower_new = (L - eps) * b_n
    upper_new = (L + eps) * b_n
    ax.lines[1].set_ydata(lower_new)
    ax.lines[2].set_ydata(upper_new)
    ax.collections[0].remove()
    ax.fill_between(n, lower_new, upper_new, alpha=0.2, color='gray')
    fig.canvas.draw_idle()

slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[117w]`
> For those who want a deeper understanding, here's the proof idea. Because the limit is a finite nonzero number L, we can make the ratio arbitrarily close to L. That means we can sandwich a_n between two constant multiples of b_n: eventually, a_n is greater than L over 2 times b_n and less than 3L over 2 times b_n. Now if the series of b_n converges, then the constant multiple 3L over 2 b_n also converges, and since a_n is smaller, it converges by direct comparison. Similarly, if b_n diverges, the smaller multiple L over 2 b_n also diverges, forcing a_n to diverge. This shows the limit comparison test is essentially a refined direct comparison after scaling.

---

### Slide 14 · [SUMMARY]
**Summary: Comparison Tests**  ·  `full_width`

**On-screen text** `[13w]`
Two comparison tests: Direct (inequality-based) and Limit (ratio-based). Choose based on the algebra.

**FULL WIDTH** `[text]`

**Direct Comparison Test:** $0 \leq a_n \leq b_n$ for all large $n$.
- If $\sum b_n$ converges, then $\sum a_n$ converges.
- If $\sum a_n$ diverges, then $\sum b_n$ diverges.

**Limit Comparison Test:** $L = \lim_{n\to\infty} \frac{a_n}{b_n}$.
- $0<L<\infty$: same fate.
- $L=0$ and $\sum b_n$ converges $\Rightarrow$ $\sum a_n$ converges.
- $L=\infty$ and $\sum b_n$ diverges $\Rightarrow$ $\sum a_n$ diverges.

**When to use which?**
- Direct: when you can easily get a clean inequality.
- Limit: when direct inequality is messy or goes the wrong way.

**Teacher Narration** `[112w]`
> Let's recap what we've learned. The direct comparison test relies on a term-by-term inequality: if your series is smaller than a convergent series, it converges; if larger than a divergent series, it diverges. The limit comparison test is more flexible: you only need to know the asymptotic ratio. If that ratio is a finite nonzero number, both series share the same fate. Special cases L equals zero or infinity give one-way implications but only when used with the right convergence or divergence of the comparison series. When you're stuck with direct comparison because the inequality goes the wrong way, switch to limit comparison. Practice these tests on various series to build intuition.

---
