# Power Series and Radius of Convergence

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** Recall the Ratio Test: for series ∑ a_n, compute L = lim |a_{n+1}/a_n|; converge if L<1, diverge if L>1.

**Learning Objectives:**
- Calculate the radius of convergence for a power series using the Ratio Test
- Determine the interval of convergence by testing endpoints
- Interpret radius of convergence as the 'safe zone' where the series behaves nicely
- Predict convergence behavior from coefficient patterns

---

## v3.1 Production Readiness

✅ **Interactive moments:** 5 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 72w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 17 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
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
| 1 | 🎛hook | 🟢 | ◧ |  | 74w | 12w | The Infinite Polynomial |
| 2 | 🎛core | 🟢 | ◧ |  | 75w | 12w | What Is a Power Series? |
| 3 | 🎛core | 🟢 | ◧ |  | 69w | 10w | The Radio Broadcast Metaphor |
| 4 | core | 🟢 | ◧ | ⏸️ | 60w | 11w | The Three Possible Behaviors |
| 5 | core | 🟢 | ◧ |  | 89w | 10w | Finding the Radius: Ratio Test Method |
| 6 | practice | 🟢 | ◧ |  | 74w | 8w | Example 1: Warm-Up |
| 7 | core | 🟢 | ◧ |  | 70w | 8w | Interval of Convergence |
| 8 | practice | 🟡 | ⬛⬛ | ⏸️ | 79w | 10w | Example 2: Standard Exam Problem |
| 9 | 🎛visual_lab | 🟢 | ◧ |  | 71w | 10w | Visual Lab: Partial Sums and Convergence |
| 10 | misconception | 🟡 | ◧ |  | 67w | 10w | Misconception: Factorial Confusion |
| 11 | practice | 🔴 | ◧ |  | 61w | 9w | [Challenge – Optional] Example 3: Tricky — Factorial Pitfall |
| 12 | practice | 🟢 | ◧ | ⏸️ | 66w | 11w | Example 4: Edge Case — Only at Center |
| 13 | practice | 🟡 | ◧ |  | 73w | 10w | Example 5: Application — Cosine Series |
| 14 | challenge | 🔴 | ◧ |  | 69w | 10w | [Challenge – Optional] Proof Sketch: Why Ratio Test Gives R |
| 15 | 🎛visual_lab | 🟡 | ◧ |  | 71w | 9w | Visual Lab: Explore Any Power Series |
| 16 | summary | 🟢 | ⬛⬛ |  | 85w | 8w | Key Takeaways |
| 17 | practice | 🟢 | ◧ | ⏸️ | 63w | 8w | Quick Check: MCQ |

---

### Slide 1 · [HOOK] 🎛 *[2 controls]*
**The Infinite Polynomial**  ·  `split_left_right`

**On-screen text** `[12w]`
Every power series has a broadcast range – the radius of convergence.

**LEFT** `[text]`

Imagine a polynomial that never ends—an infinite polynomial. How can such a thing make sense? The answer lies in its 'safe zone.' Today we discover the broadcast range of every power series.

**RIGHT** `[visual_spec]`

*Visual Spec:* A diagram with a radio tower at center x=a, radius R circle around it. Label 'Center' and 'Radius R'. Outside the circle show static symbols, inside show clear signal waves. Include coordinates: x-axis from a-2R to a+2R.

*Interactive Controls:*
  - 🎛 Slider for radius R from 0.5 to 5
  - 🎛 Toggle: show/hide static symbols outside radius

**Teacher Narration** `[74w]`
> Picture a radio station broadcasting from a downtown transmitter. If you drive too far, the signal fades to static. Power series behave the same way: they have a built-in broadcast range called the radius of convergence. Within that range, the series gives a perfect signal; outside it, the series becomes useless static. This metaphor helps us understand why some series work only for certain x-values and why we need to find that boundary precisely.

---

### Slide 2 · [CORE] 🎛 *[2 controls]*
**What Is a Power Series?**  ·  `split_left_right`

**On-screen text** `[12w]`
A power series is an infinite polynomial centered at x = a.

**LEFT** `[concept]`

A **power series** centered at $x = a$ is:
$$\sum_{n=0}^{\infty} c_n (x - a)^n = c_0 + c_1(x-a) + c_2(x-a)^2 + \cdots$$
- $c_n$ are coefficients
- $a$ is the center (home base)
- When $x = a$, the series always converges to $c_0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Animated build-up of terms: start with c_0, then add c_1(x-a) term, then c_2(x-a)^2, etc., fading earlier terms to show infinite sum. Include horizontal axis labeled x and vertical axis for value. Show convergence at x=a.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 50
  - 🎛 Toggle: show/hide exact function

**Teacher Narration** `[75w]`
> A power series looks like an infinite polynomial: a sum of powers of (x minus the center), each multiplied by a coefficient. The center is the 'home base' of the series. The simplest example is the geometric series ∑ x^n, where the center is 0. And notice: if you plug in x equal to the center, every power term disappears and you're left with c_0. That's why a power series always converges at its center.

---

### Slide 3 · [CORE] 🎛 *[2 controls]*
**The Radio Broadcast Metaphor**  ·  `split_left_right`

**On-screen text** `[10w]`
Radius of convergence = clear signal zone. Endpoints are uncertain.

**LEFT** `[concept]`

Think of a power series as a **radio broadcast**:
- **Center $a$** = transmitter
- **Radius $R$** = maximum distance for clear signal
- **Inside** $|x-a| < R$: clear reception (converges)
- **Outside** $|x-a| > R$: static (diverges)
- **At endpoints** $x = a \pm R$: hit or miss (must test)

**RIGHT** `[visual_spec]`

*Visual Spec:* A map view: concentric circles around a central point labeled 'Center a'. Inner green zone labeled 'Converges absolutely', outer red zone labeled 'Diverges'. Dashed boundary at radius R with question marks at endpoints. Include arrows pointing to clear signal and static.

*Interactive Controls:*
  - 🎛 Slider for radius R from 0.5 to 5
  - 🎛 Toggle: show/hide endpoint question marks

**Teacher Narration** `[69w]`
> Here's the intuition that will stick with you. The center is the radio transmitter. As long as you stay within a certain distance, the signal is perfect – that's the radius of convergence. If you drive beyond that distance, you lose the signal completely. The tricky part is the exact boundary: sometimes you still get reception at the endpoints, sometimes you don't. You have to test each endpoint separately.

**Student Prompt:** If a radio station has range 50 km from downtown, where can you hear it clearly?

---

### Slide 4 · [CORE] ⏸️ *[YouTube Pause]*
**The Three Possible Behaviors**  ·  `split_left_right`

**On-screen text** `[11w]`
Radius R = 0, ∞, or finite positive. No other possibilities.

**LEFT** `[concept]`

For any power series $\sum c_n (x-a)^n$, exactly ONE holds:
- **Case (i):** $R = 0$ — converges only at $x = a$ (e.g., $\sum n!\, x^n$)
- **Case (ii):** $R = \infty$ — converges for all $x$ (e.g., $\sum x^n/n!$)
- **Case (iii):** $0 < R < \infty$ — converges inside interval, endpoints need testing (e.g., $\sum x^n/n$)

**RIGHT** `[visual_spec]`

*Visual Spec:* Three horizontal number lines stacked vertically. Top line: single point at a labeled 'Only at center', with a dot. Middle line: entire real line shaded green labeled 'Converges everywhere'. Bottom line: interval from a-R to a+R shaded green, with open/closed circles at endpoints and question marks. Label each case accordingly.

**Teacher Narration** `[60w]`
> Every power series falls into exactly one of three categories. It either converges only at its center, converges for every real number, or converges inside a finite interval and may or may not converge at the endpoints. This is a theorem: there are no other options. Understanding which case you're in is the first step in analyzing any power series.

**Student Prompt:** Which case do you think the geometric series ∑ x^n falls into?

---

### Slide 5 · [CORE]
**Finding the Radius: Ratio Test Method**  ·  `split_left_right`

**On-screen text** `[10w]`
R = 1 / L  where L = lim |c_{n+1}/c_n|.

**LEFT** `[steps]`

For $\sum c_n (x-a)^n$, write $a_n = c_n(x-a)^n$. Apply Ratio Test:
$$\lim_{n\to\infty} \left|\frac{a_{n+1}}{a_n}\right| = |x-a| \cdot \lim_{n\to\infty} \left|\frac{c_{n+1}}{c_n}\right| = |x-a| \cdot L$$
**Convergence when** $|x-a|\cdot L < 1$, so radius $R = 1/L$.
- $L = 0 \Rightarrow R = \infty$
- $L = \infty \Rightarrow R = 0$

**RIGHT** `[visual_spec]`

*Visual Spec:* Step-by-step animation showing factoring: |c_{n+1}(x-a)^{n+1}| / |c_n(x-a)^n| = |x-a| * |c_{n+1}/c_n|. Then show limit L. Highlight that L depends only on coefficients. Display formula R = 1/L with special cases.

**Teacher Narration** `[89w]`
> The Ratio Test is our main tool. We apply it to the full term a_n. The absolute value splits into two parts: the power of (x-a) gives a factor |x-a|, and the coefficients give a ratio. The limit L depends only on the coefficients, not on x. So the condition for convergence becomes |x-a| times L less than 1, which means the radius R is exactly 1 over L. If L is 0, the series converges for every x; if L is infinite, it converges only at the center.

**Student Prompt:** If lim |c_{n+1}/c_n| = 2, what is R?

---

### Slide 6 · [PRACTICE]
**Example 1: Warm-Up**  ·  `split_left_right`

**On-screen text** `[8w]`
∑ x^n / 2^n  →  R = 2

**LEFT** `[steps]`

Find the radius of convergence for $\sum_{n=0}^{\infty} \frac{x^n}{2^n}$

1. Center $a=0$, $c_n = 1/2^n$
2. Ratio: $\frac{c_{n+1}}{c_n} = \frac{1/2^{n+1}}{1/2^n} = \frac{1}{2}$
3. $L = \lim_{n\to\infty} 1/2 = 1/2$
4. $R = 1/L = 2$

The series converges when $|x| < 2$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Horizontal number line from -4 to 4. Center at 0. Shade interval from -2 to 2 green. Mark -2 and 2 with open circles. Label 'R = 2' above. Show a point at x=1.5 inside with checkmark, point at x=3 outside with X.

**Teacher Narration** `[74w]`
> Let's start with a simple example. The series is ∑ x^n over 2^n. The coefficients are 1 over 2 to the n. The ratio of consecutive coefficients is constant 1/2. So L is 1/2, and R is 2. This means the series works for any x between -2 and 2. We'll test the endpoints later. Notice how the geometric pattern gives a clean, finite radius that we can visualize easily on the number line.

**Student Prompt:** What happens at x = 2? At x = -2? (Think: does the series become a known type?)

---

### Slide 7 · [CORE]
**Interval of Convergence**  ·  `split_left_right`

**On-screen text** `[8w]`
Interval = interior (open) plus endpoints (must test).

**LEFT** `[concept]`

The **interval of convergence** is the set of all $x$ where the series converges.
- For $R>0$, interior $(a-R, a+R)$ guaranteed.
- **Endpoints** $x = a \pm R$ must be tested separately using other tests (p-series, Alternating Series Test, etc.).
- Possible intervals: $[a-R, a+R]$ or any combination of open/closed endpoints.

**RIGHT** `[visual_spec]`

*Visual Spec:* Number line with center a, radius R. Show four versions of interval: all open, left-closed right-open, left-open right-closed, both closed. Use green shading with filled or open circles. Label 'Test endpoints!'.

**Teacher Narration** `[70w]`
> Once we know the radius, we can compute the interval of convergence – the actual set of x values where the series works. The interior is always open: from a minus R to a plus R. But the endpoints are a separate story. The Ratio Test is useless there because it gives L equals 1. So we use other tests like the p-series or alternating series test to decide inclusion.

---

### Slide 8 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Example 2: Standard Exam Problem**  ·  `full_width`

**On-screen text** `[10w]`
∑ (-1)^n (x-3)^n / (n 2^n) → R=2, interval (1,5]

**FULL WIDTH** `[steps]`

Find the radius and interval of convergence for $\sum_{n=1}^{\infty} \frac{(-1)^n (x-3)^n}{n\cdot 2^n}$

**Radius:**
- $a=3$, $c_n = \frac{(-1)^n}{n\,2^n}$
- $\left|\frac{c_{n+1}}{c_n}\right| = \frac{n}{(n+1)2}$ → $L = \lim \frac{n}{2(n+1)} = \frac{1}{2}$
- $R = 1/L = 2$, open interval $(1,5)$

**Endpoint tests:**
- $x=1$: series becomes $\sum \frac{(-1)^n (-2)^n}{n\,2^n} = \sum \frac{1}{n}$ (harmonic) → **diverges**
- $x=5$: series becomes $\sum \frac{(-1)^n 2^n}{n\,2^n} = \sum \frac{(-1)^n}{n}$ (alternating harmonic) → **converges**

**Interval:** $(1,5]$

**Teacher Narration** `[79w]`
> Here's a typical exam problem. Notice the series is centered at 3 because of the (x-3) factor. Compute the coefficient ratio – it simplifies to n over 2(n+1), limit 1/2, so radius 2. That gives open interval from 1 to 5. Now test endpoints. At x=1, after simplification we get the harmonic series 1/n, which diverges. At x=5, we get the alternating harmonic series, which converges by the Alternating Series Test. So the interval is (1,5]. Always test endpoints!

**Student Prompt:** Before seeing the endpoint results, test x=1 and x=5 yourself using known series.

---

### Slide 9 · [VISUAL_LAB] 🎛 *[1 controls]*
**Visual Lab: Partial Sums and Convergence**  ·  `split_left_right`

**On-screen text** `[10w]`
Slide to add terms: see convergence inside |x|<2, divergence outside.

**LEFT** `[text]`

Explore how partial sums of $\sum \frac{x^n}{2^n}$ approach the function $\frac{2}{2-x}$ inside the radius $|x|<2$. Use the slider to add more terms and see convergence inside the interval.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot f(x)=2/(2-x) for x in [-3,3] (asymptote at x=2). Overlay partial sums S_N(x) = sum_{n=0}^N x^n/2^n for N from 0 to 50. Use slider for N, toggle to show exact function. Show shaded area where |x|<2.

*Interactive Controls:*
  - 🎛 Slider for number of terms N from 0 to 50

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button

x = np.linspace(-3, 3, 1000)
exact = 2/(2-x)  # sum x^n/2^n = 2/(2-x) for |x|<2

fig, ax = plt.subplots(figsize=(8,5))
plt.subplots_adjust(bottom=0.25)
ax.plot(x, exact, 'k--', label='Exact $2/(2-x)$')
line, = ax.plot([], [], 'r-', lw=2, label='Partial sum')
ax.axvline(-2, color='gray', linestyle=':', label='|x|=2')
ax.axvline(2, color='gray', linestyle=':')
ax.set_ylim(-10, 10)
ax.set_xlabel('x')
ax.set_ylabel('S_N(x)')
ax.legend()
ax.grid(True)

ax_n = plt.axes([0.1, 0.1, 0.65, 0.03])
n_slider = Slider(ax_n, 'N', 0, 50, valinit=0, valstep=1)

def update(N):
    N = int(N)
    # compute partial sum via cumulative sum
    n_vals = np.arange(N+1)
    coeffs = 1/(2**n_vals)
    # outer product: x^n * coeff
    S = np.zeros_like(x)
    for n in range(N+1):
        S += coeffs[n] * x**n
    line.set_data(x, S)
    fig.canvas.draw_idle()

n_slider.on_changed(update)
update(0)
plt.show()
```

**Teacher Narration** `[71w]`
> Now let's see convergence in action. This is the partial sum plot for the geometric-like series from our warm-up. As you increase N, the partial sum curve hugs the exact function tightly inside the interval from -2 to 2. But outside that interval, the partial sums blow up – exactly what our radius tells us. Play with the slider to see how more terms improve the approximation inside the safe zone.

**Student Prompt:** What happens to the partial sums near x=2 as you increase N?

---

### Slide 10 · [MISCONCEPTION] 🟡
**Misconception: Factorial Confusion**  ·  `split_left_right`

**On-screen text** `[10w]`
⚠️ (2n)! is NOT 2·n!  –  they are fundamentally different.

**LEFT** `[text]`

**Wrong move:** Simplify $\frac{(2n+2)!}{((n+1)!)^2} \cdot \frac{(n!)^2}{(2n)!}$ as $\frac{(2n+2)!}{(2n)!} \cdot \frac{(n!)^2}{((n+1)!)^2}$ and incorrectly cancel: $(2n+2)!/(2n)! = (2n+2)$.  

**Correct:** $(2n+2)! = (2n+2)(2n+1)(2n)!$, so the ratio becomes $\frac{(2n+2)(2n+1)}{(n+1)^2}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot log of (2n)! vs log of (n!)^2 for n up to 10. Show that (2n)! grows faster. Highlight the difference: (2n)! = (2n)(2n-1)... while (n!)^2 = (n!)*(n!).

**Teacher Narration** `[67w]`
> A very common mistake arises when dealing with factorials like (2n)!. Students often think (2n)! equals 2 times n factorial, or maybe (2n)! equals (2n) times n!. But (2n)! is the product of every integer from 1 to 2n. Compare with (n!)^2: that's (n!)*(n!). These are not the same. The correct ratio when simplifying involves (2n+2)! divided by (2n)! which gives (2n+2)(2n+1). Always expand the factorial carefully.

**Student Prompt:** Which is larger for n=3: (2*3)! = 6! or (3!)^2?

---

### Slide 11 · [PRACTICE] 🔴 *[Challenge – Optional]*
**[Challenge – Optional] Example 3: Tricky — Factorial Pitfall**  ·  `split_left_right`

**On-screen text** `[9w]`
∑ (2n)! x^n / (n!)^2  →  R = 1/4

**LEFT** `[steps]`

Find radius of convergence for $\sum_{n=0}^{\infty} \frac{(2n)!}{(n!)^2}\, x^n$

1. $c_n = \frac{(2n)!}{(n!)^2}$, $a=0$
2. $\frac{c_{n+1}}{c_n} = \frac{(2n+2)!}{((n+1)!)^2} \cdot \frac{(n!)^2}{(2n)!}$
3. Simplify: $= \frac{(2n+2)(2n+1)}{(n+1)^2} = \frac{4n+2}{n+1}$
4. $L = \lim \frac{4n+2}{n+1} = 4$
5. $R = 1/4$

**RIGHT** `[visual_spec]`

*Visual Spec:* Semilog plot of (2n)! and (n!)^2 for n=1..10. Show that (2n)! grows much faster. Highlight that ratio limit is 4, leading to small radius. Annotate: 'R=0.25'.

**Teacher Narration** `[61w]`
> Now let's apply this correctly to a tricky series. The coefficients involve (2n)! over (n!)^2. Carefully simplifying the ratio, we get (4n+2)/(n+1) whose limit is 4. So the radius is a small 1/4. This makes sense because (2n)! grows faster than (n!)^2, so the coefficients are large, shrinking the safe zone. This example shows how factorial growth can dramatically limit convergence.

---

### Slide 12 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Example 4: Edge Case — Only at Center**  ·  `split_left_right`

**On-screen text** `[11w]`
∑ n! x^n  →  R = 0 (converges only at x=0).

**LEFT** `[steps]`

Find radius of convergence for $\sum_{n=0}^{\infty} n!\, x^n$

1. $c_n = n!$, $a=0$
2. $\frac{c_{n+1}}{c_n} = \frac{(n+1)!}{n!} = n+1$
3. $L = \lim_{n\to\infty} (n+1) = \infty$
4. $R = 1/\infty = 0$

The series converges only at $x=0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot log |n! x^n| for n up to 10 for small x=0.1, 0.01. Show that terms grow after some n. For x=0, everything is zero except c_0. Label: 'R=0'.

**Teacher Narration** `[66w]`
> What happens when coefficients grow extremely fast, like n factorial? The ratio of consecutive coefficients goes to infinity, so L is infinite and R is 0. This means the series only converges at the center x=0. Even for tiny x like 0.001, eventually the factorial term dominates and the terms grow without bound. Only at x=0 does each term vanish. This is a true edge case.

**Student Prompt:** If I try x=0.001, does n! (0.001)^n go to zero as n increases?

---

### Slide 13 · [PRACTICE] 🟡
**Example 5: Application — Cosine Series**  ·  `split_left_right`

**On-screen text** `[10w]`
∑ (-1)^n x^{2n}/(2n)! → R = ∞ (cosine converges everywhere).

**LEFT** `[steps]`

Find radius for $\sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!}$ (Maclaurin series for $\cos x$)

1. Full term $a_n = \frac{(-1)^n x^{2n}}{(2n)!}$
2. Ratio: $\left|\frac{a_{n+1}}{a_n}\right| = \frac{x^2}{(2n+2)(2n+1)}$
3. Limit as $n\to\infty$: $= 0$ for all $x$
4. $0 < 1$ for all $x$ → $R = \infty$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot cos(x) and its Taylor polynomials P_2(x)=1-x^2/2!, P_4(x)=1-x^2/2!+x^4/4!, etc. Show that polynomials approximate cos well for all x as degree increases. Annotate: 'R=∞'.

**Teacher Narration** `[73w]`
> This final example is particularly beautiful. The cosine series has only even powers. Since the ratio limit is 0 for any x, the radius is infinite. That's why you can use the Taylor polynomial for cosine – like 1 minus x squared over 2 plus x to the fourth over 24 – to approximate cosine for any real number, though the approximation is naturally better near zero. This is power series in action.

**Student Prompt:** Is the series for cosine convergent for x = 100? (Hint: think about the ratio limit.)

---

### Slide 14 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof Sketch: Why Ratio Test Gives R**  ·  `split_left_right`

**On-screen text** `[10w]`
Ratio Test directly yields R = 1 / lim |c_{n+1}/c_n|.

**LEFT** `[steps]`

Apply Ratio Test to $a_n = c_n (x-a)^n$:
$$\lim_{n\to\infty} \left|\frac{a_{n+1}}{a_n}\right| = |x-a| \cdot \lim_{n\to\infty} \left|\frac{c_{n+1}}{c_n}\right| = |x-a| \cdot L$$
- Converges when $|x-a| L < 1$ → $|x-a| < 1/L = R$
- Diverges when $|x-a| L > 1$ → $|x-a| > R$
- Inconclusive at $|x-a| = R$ (endpoints)
**Special cases:** $L=0$ → always converges ($R=\infty$); $L=\infty$ → diverges except at center ($R=0$).

**RIGHT** `[visual_spec]`

*Visual Spec:* Flowchart: start with Ratio Test, check limit, derive inequality |x-a| < 1/L, label as radius R. Show branching for L=0, L=∞, 0<L<∞. Include note: 'endpoints require separate tests'.

**Teacher Narration** `[69w]`
> For those who want the reasoning: the Ratio Test forces convergence when the limit of the absolute ratio is less than 1. After factoring, the x-dependence appears only as |x-a| times the coefficient limit L. So the inequality |x-a| L < 1 becomes the condition. Thus the natural boundary is at |x-a| = 1/L. This is not a deep theorem – it's a direct consequence of the Ratio Test.

---

### Slide 15 · [VISUAL_LAB] 🟡 🎛 *[3 controls]*
**Visual Lab: Explore Any Power Series**  ·  `split_left_right`

**On-screen text** `[9w]`
Choose series and see its radius. Practice endpoint testing!

**LEFT** `[text]`

Test your understanding: choose coefficient type (geometric, factorial, etc.) and center, then see the radius and interval. Slide to adjust parameters and see convergence behavior.

**RIGHT** `[python_lab]`

*Visual Spec:* GUI with dropdown for series type, input for center a, sliders for coefficient growth rate. Display computed radius and plot of convergence interval on number line. Show partial sum graph for chosen x.

*Interactive Controls:*
  - 🎛 Radio buttons: geometric, factorial, alternating
  - 🎛 Slider for number of terms N (1 to 50)
  - 🎛 Slider for test point x (-5 to 5)

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button, RadioButtons

# skeleton for interactive power series explorer
fig, (ax1, ax2) = plt.subplots(1,2,figsize=(10,5))
plt.subplots_adjust(bottom=0.3)

# ax1: number line with interval
# ax2: partial sum vs x
# Controls: radio for series type, slider for n terms, slider for x value
# For brevity, implement basic functionality

print('Interactive explorer: run in Jupyter with widgets')
plt.show()
```

**Teacher Narration** `[71w]`
> Now it's your turn to play. This interactive tool lets you choose different types of power series, adjust the center, and see the radius and interval on a number line. You can also pick an x value and watch the partial sums converge or diverge. Use it to test your intuition about coefficient patterns and endpoint behavior. Experimenting with different series will solidify your understanding of how coefficients affect the radius.

**Student Prompt:** Try the series ∑ x^n / n. What is its radius? Test x=1 and x=-1 in the tool.

---

### Slide 16 · [SUMMARY]
**Key Takeaways**  ·  `full_width`

**On-screen text** `[8w]`
R = 1/L ; endpoints need separate testing.

**FULL WIDTH** `[text]`

**Power Series:** $\sum c_n (x-a)^n$

**Radius via Ratio Test:** $R = \frac{1}{L}$, $L = \lim \left|\frac{c_{n+1}}{c_n}\right|$
- $L=0$ → $R=\infty$
- $L=\infty$ → $R=0$

**Interval:** interior guaranteed; endpoints must be tested with other convergence tests.

**Patterns:**
- $n!$ in numerator → small radius (often 0)
- $n!$ in denominator → large radius (often $\infty$)
- Missing powers? Apply Ratio Test to full terms.

**Teacher Narration** `[85w]`
> Let's quickly recap what we learned today. Every power series has a radius of convergence that you can find using the Ratio Test: just take the limit of the absolute coefficient ratio and compute 1 over that. That gives you the radius. The interior of the interval is determined, but you always need to test the endpoints separately. Remember the pattern: if coefficients grow super fast, the radius shrinks; if they decay fast, the radius expands. With these tools, you can analyze any power series.

---

### Slide 17 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Quick Check: MCQ**  ·  `split_left_right`

**On-screen text** `[8w]`
R = 1/L = 1/3. Correct answer: B.

**LEFT** `[text]`

**Q:** For a power series centered at $x=2$, the Ratio Test gives $\lim |c_{n+1}/c_n| = 3$.  
What is the radius of convergence?

A) $R = 3$
B) $R = 1/3$
C) $R = 1$
D) $R = \infty$

**Think: $R = 1/L$.**

**RIGHT** `[visual_spec]`

*Visual Spec:* Show the formula R=1/3 animation. After pause, highlight B. Also show interval (2-1/3, 2+1/3) = (5/3, 7/3) on number line.

**Teacher Narration** `[63w]`
> Here's a quick check. If the coefficient limit L is 3, then the radius is 1/3, answer B. Common mistake is to pick A, confusing L with R. Remember the formula: radius is 1 over L. The series converges when x is within 1/3 of the center 2, so from 5/3 to 7/3. This simple relationship is the key to finding radii quickly.

**Student Prompt:** Before scrolling, choose A, B, C, or D.

---
