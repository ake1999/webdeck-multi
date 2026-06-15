# Rolle's Theorem and the Mean Value Theorem

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You need to be comfortable with continuity, differentiability, and the Extreme Value Theorem.

**Learning Objectives:**
- State the hypotheses and conclusions of Rolle's Theorem and the Mean Value Theorem
- Verify that a given function satisfies the hypotheses of these theorems on a specified interval
- Calculate the value(s) of c guaranteed by the Mean Value Theorem for a given function
- Apply the Mean Value Theorem to prove fundamental results about function behavior
- Interpret the geometric meaning of each theorem in terms of tangent and secant lines

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 80w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 16 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
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
| 1 | hook | 🟢 | ◧ |  | 114w | 16w | Why Horizontal Tangents Matter |
| 2 | core | 🟢 | ◧ |  | 71w | 9w | Prerequisites: Continuity & Differentiability |
| 3 | core | 🟢 | ◧ |  | 78w | 10w | Rolle's Theorem |
| 4 | practice | 🟢 | ⬛⬛ |  | 66w | 10w | Example 1: Applying Rolle's Theorem |
| 5 | challenge | 🔴 | ◧ |  | 71w | 12w | [Challenge – Optional] Proof of Rolle's Theorem |
| 6 | core | 🟢 | ◧ |  | 86w | 11w | Mean Value Theorem (MVT) |
| 7 | practice | 🟢 | ⬛⬛ |  | 86w | 12w | Example 2: Typical MVT Problem |
| 8 | misconception | 🟢 | ◧ |  | 77w | 10w | Misconception: When MVT Fails |
| 9 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 69w | 11w | Pause & Try: Find the Point |
| 10 | practice | 🟢 | ⬛⬛ |  | 60w | 10w | Solution: Pause Problem |
| 11 | practice | 🟢 | ⬛⬛ |  | 71w | 13w | Example 3: Edge Case – Constant Function |
| 12 | practice | 🟡 | ◧ |  | 91w | 14w | Example 4: Application – Proving Only One Root |
| 13 | challenge | 🔴 | ◧ |  | 81w | 14w | [Challenge – Optional] Proving a Constant Function |
| 14 | 🎛visual_lab | 🟢 | ⬛⬛ |  | 83w | 11w | Interactive Lab: Rolle's Theorem Exploration |
| 15 | 🎛visual_lab | 🟢 | ⬛⬛ |  | 77w | 15w | Interactive Lab: MVT Exploration |
| 16 | summary | 🟢 | ⬛⬛ |  | 105w | 14w | Summary |

---

### Slide 1 · [HOOK]
**Why Horizontal Tangents Matter**  ·  `split_left_right`

**On-screen text** `[16w]`
Start and end at same height. Smooth road. At some moment you must be driving level.

**LEFT** `[text]`

Imagine a road trip where you start and end at the same elevation. If the road is smooth, at some moment you must be driving perfectly level — instantaneous slope zero.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a smooth curve (e.g., y = x^3 - 12x on [-3,3]) that starts and ends at same y-value. Mark endpoints with red dots. Draw a horizontal tangent line at one interior point (green dashed). Animate a car icon moving along the curve. Show elevation label constant at endpoints. Title: 'Rolle's Theorem – Road Trip Metaphor'.

```python
import numpy as np; import matplotlib.pyplot as plt; x = np.linspace(-3,3,200); y = x**3 - 12*x; plt.plot(x,y); plt.plot([-3,3],[y[0],y[-1]],'ro'); c=0; plt.axhline(y[c], color='green', linestyle='--', xmin=(-3+3)/6, xmax=(3+3)/6); plt.show()
```

**Teacher Narration** `[114w]`
> Imagine you take a road trip from point A to point B, and you start and end at exactly the same elevation. If the road is smooth and continuous, at some moment during the trip you must be driving perfectly horizontal. That is the essence of Rolles Theorem. It says that if a function is continuous, differentiable, and has equal values at the endpoints, then somewhere in between the derivative must be zero. This idea is fundamental in calculus because it connects the global behavior of a function to its local rate of change, and it forms the basis for proving many other important results, like the Mean Value Theorem we will see shortly.

---

### Slide 2 · [CORE]
**Prerequisites: Continuity & Differentiability**  ·  `split_left_right`

**On-screen text** `[9w]`
Continuous? Differentiable? These are needed. For Rolle's, also f(a)=f(b).

**LEFT** `[concept]`

**Three conditions** for both theorems:
- Continuous on $[a,b]$ (no breaks)
- Differentiable on $(a,b)$ (no corners)
- (Rolle's adds $f(a)=f(b)$)

These guarantee existence of special points.

**RIGHT** `[visual_spec]`

*Visual Spec:* Three subplots in a row: (a) f(x)=x^2 on [-2,2] (smooth, green check), (b) f(x)=1/(x-1) on [0,2] with vertical asymptote at x=1 (jump discontinuity, red X), (c) f(x)=|x| on [-2,2] with sharp corner at x=0 (red X). Each subplot has title indicating the condition violated. Axes ranges: (a) x from -2 to 2, y from 0 to 4; (b) x from 0 to 2, y from -10 to 10; (c) x from -2 to 2, y from 0 to 2. Use matplotlib subplots. Title: 'Hypotheses for Rolle & MVT'.

**Teacher Narration** `[71w]`
> Before we dive into the theorems, recall what continuity and differentiability mean. A function is continuous on a closed interval if its graph has no jumps or holes. It is differentiable on an open interval if the derivative exists at every interior point – no sharp corners or vertical tangents. The Extreme Value Theorem tells us continuous functions achieve max and min on closed intervals. We'll rely on all these ideas.

---

### Slide 3 · [CORE]
**Rolle's Theorem**  ·  `split_left_right`

**On-screen text** `[10w]`
Continuous, differentiable, f(a)=f(b) → at least one horizontal tangent inside.

**LEFT** `[formula_block]`

**Rolle's Theorem**
If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a)=f(b)$, then there exists $c \in (a,b)$ with $f'(c)=0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^2-4x+3 on [1,3]. Mark endpoints (1,0) and (3,0) with red dots. Mark point (2,-1) with green dot (minimum). Draw horizontal dashed line through (2,-1) to show tangent. Label c=2, f'(c)=0. Axes: x from 0 to 4, y from -2 to 4.

```python
import numpy as np; import matplotlib.pyplot as plt; x=np.linspace(0,4,100); f=x**2-4*x+3; plt.plot(x,f); plt.plot([1,3],[0,0],'ro'); plt.plot(2,-1,'go'); plt.axhline(y=-1, color='green', linestyle='--', xmin=0.25, xmax=0.75); plt.text(2,-1.3,'c=2'); plt.show()
```

**Teacher Narration** `[78w]`
> Here is the formal statement of Rolles Theorem. Notice it requires three conditions: continuity on the closed interval, differentiability on the open interval, and equal function values at the endpoints. The conclusion is that there exists some number c strictly between a and b where the derivative is zero. Graphically, the tangent line at that point is horizontal. Take a moment to see the green dot on this parabola – at x equals 2, the slope is zero.

---

### Slide 4 · [PRACTICE]
**Example 1: Applying Rolle's Theorem**  ·  `full_width`

**On-screen text** `[10w]`
Apply each hypothesis. f(x)=x²-4x+3 on [1,3]. Find c where f'(c)=0.

**FULL WIDTH** `[concept]`

**Problem:** Verify Rolle's Theorem for $f(x)=x^2-4x+3$ on $[1,3]$ and find $c$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Check continuity | Polynomial → continuous on $[1,3]$ ✓ |
| 2 | Check differentiability | $f'(x)=2x-4$ exists everywhere → diff. on $(1,3)$ ✓ |
| 3 | Check $f(1)=f(3)$ | $f(1)=0$, $f(3)=0$ → $f(1)=f(3)$ ✓ |
| 4 | Solve $f'(c)=0$ | $2c-4=0 \Rightarrow c=2$ |
| 5 | Verify $c$ in interval | $2\in(1,3)$ ✓ |

**Conclusion:** Rolle's Theorem is satisfied; $c=2$.

**Teacher Narration** `[66w]`
> Let's work through a direct example. We take f(x)=x^2-4x+3 on the interval from 1 to 3. First check continuity: it's a polynomial so it's continuous everywhere. Differentiability: the derivative is 2x-4 which exists for all real numbers. Then we check the endpoint values: f(1)=0 and f(3)=0, so they're equal. Finally, set the derivative equal to zero: 2c-4=0 gives c=2, which lies between 1 and 3. Perfect.

---

### Slide 5 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof of Rolle's Theorem**  ·  `split_left_right`

**On-screen text** `[12w]`
Rolle's proof uses EVT and Fermat's Theorem. Cases: constant or interior extremum.

**LEFT** `[steps]`

**Proof outline:**

1. By EVT, $f$ attains max $M$ and min $m$ on $[a,b]$.
2. **Case 1:** $M=m$ → $f$ constant → $f'(c)=0$ for any $c$.
3. **Case 2:** $M>m$. Since $f(a)=f(b)$, at least one extremum occurs at interior $c$.
4. By Fermat's Theorem, $f'(c)=0$.

*Required: Extreme Value Theorem and Fermat's Theorem.*

**RIGHT** `[visual_spec]`

*Visual Spec:* Two subplots: (left) constant function f(x)=c on [a,b] with horizontal line, (right) non-constant function with interior maximum at c, showing horizontal tangent at c. Mark endpoints with red dots, mark interior extremum with green dot. Title: 'Proof of Rolle's Theorem'.

**Teacher Narration** `[71w]`
> This proof is a bit more advanced, but it's a classic. We use the Extreme Value Theorem to guarantee a maximum and minimum. If the function is constant, then the derivative is zero everywhere, done. Otherwise, since the endpoints have the same value, either the maximum or the minimum must occur at some interior point. Then Fermat's Theorem says the derivative at that interior extremum is zero. That's the core logic.

---

### Slide 6 · [CORE]
**Mean Value Theorem (MVT)**  ·  `split_left_right`

**On-screen text** `[11w]`
Continuous, differentiable → some c where instantaneous slope equals average slope.

**LEFT** `[formula_block]`

**Mean Value Theorem**
If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there exists $c \in (a,b)$ with

$$f'(c) = \frac{f(b)-f(a)}{b-a}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^3-2x on [-1,2]. Mark endpoints (-1,1) and (2,4) with red dots. Draw secant line through endpoints (slope 1). At c=1, draw tangent line parallel to secant (same slope). Label c=1, f'(c)=1. Axes: x from -1.5 to 2.5, y from -1 to 5.

```python
import numpy as np; import matplotlib.pyplot as plt; x=np.linspace(-1.5,2.5,200); f=x**3-2*x; plt.plot(x,f); plt.plot([-1,2],[1,4],'ro'); sec_x=np.linspace(-1,2); plt.plot(sec_x, sec_x+2,'r--'); tan_x=np.linspace(0.5,1.5); plt.plot(tan_x, f(1)+(tan_x-1),'g--'); plt.plot(1,f(1),'go'); plt.show()
```

**Teacher Narration** `[86w]`
> The Mean Value Theorem is one of the most important results in calculus. It relaxes the condition of Rolles Theorem; we no longer require equal endpoint values. Instead, it says there is some point c in the interval where the instantaneous rate of change equals the average rate of change over the whole interval. Graphically, the tangent line at c is parallel to the secant line connecting the endpoints. In this example, the secant has slope 1, and at c=1 the tangent also has slope 1.

---

### Slide 7 · [PRACTICE]
**Example 2: Typical MVT Problem**  ·  `full_width`

**On-screen text** `[12w]`
Find c for f(x)=x³-2x on [-1,2]. Average slope = 1. Solve f'(c)=1.

**FULL WIDTH** `[concept]`

**Problem:** Find $c$ for $f(x)=x^3-2x$ on $[-1,2]$.

| Step | Action | Calculation |
|------|--------|-------------|
| 1 | Verify hypotheses | Polynomial → continuous on $[-1,2]$, diff. on $(-1,2)$ ✓ |
| 2 | Compute $f(-1), f(2)$ | $f(-1)=1$, $f(2)=4$ |
| 3 | Average rate | $\frac{4-1}{2-(-1)} = \frac{3}{3}=1$ |
| 4 | Solve $f'(c)=1$ | $f'(x)=3x^2-2$, so $3c^2-2=1 \Rightarrow c^2=1 \Rightarrow c= \pm 1$ |
| 5 | Choose $c$ in $(-1,2)$ | $c=-1$ is endpoint → discard; $c=1$ is valid ✓ |

**Result:** $c=1$.

**Teacher Narration** `[86w]`
> Here's a typical exam-style problem. We need to find all numbers c that satisfy the Mean Value Theorem for f(x)=x cubed minus 2x on the interval from -1 to 2. The function is a polynomial, so it's continuous and differentiable. Compute the average rate of change: f(2)-f(-1) over 2-(-1) equals 3 over 3 equals 1. Set the derivative equal to 1: 3c^2-2=1 gives c^2=1, so c equals plus or minus 1. Only c=1 lies in the open interval; c=-1 is an endpoint and is not allowed.

---

### Slide 8 · [MISCONCEPTION]
**Misconception: When MVT Fails**  ·  `split_left_right`

**On-screen text** `[10w]`
MVT requires differentiability on (a,b). A single corner breaks it.

**LEFT** `[concept]`

**Common mistake:** Assuming MVT applies to $f(x)=|x-1|$ on $[0,2]$.

- Continuous ✓ 
- Not differentiable at $x=1$ (corner) ✗
- MVT does NOT apply.

**Check average slope:** $\frac{1-1}{2-0}=0$. But $f'(x)=\pm 1$ where it exists – never 0.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot |x-1| on [0,2]. Mark corner at (1,0) with a circle. Draw secant line through endpoints (0,1) and (2,1) – horizontal line y=1. Show tangent lines: left side slope -1 (blue), right side slope +1 (red), none horizontal. Highlight that no tangent is parallel to secant.

```python
import numpy as np; import matplotlib.pyplot as plt; x=np.linspace(0,2,200); f=np.abs(x-1); plt.plot(x,f); plt.plot([0,2],[1,1],'r--'); plt.plot(1,0,'o',ms=10); plt.axhline(y=1,color='gray'); plt.show()
```

**Teacher Narration** `[77w]`
> A very common mistake is to forget to check differentiability on the entire open interval. Consider f(x)=absolute value of x-1 on the interval from 0 to 2. This function is continuous everywhere, but it has a corner at x=1. The derivative does not exist there, so the MVT does not apply. Even though the average slope is 0, the derivative is never 0 where it exists. Always check for corners, cusps, or vertical tangents inside the interval.

---

### Slide 9 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause & Try: Find the Point**  ·  `split_left_right`

**On-screen text** `[11w]`
f(x)=x² on [0,2]. Find c where f'(c) equals the average slope.

**LEFT** `[text]`

**Your turn:** For $f(x)=x^2$ on $[0,2]$, find the value of $c$ guaranteed by the MVT.

- Compute average slope.
- Set $f'(c)$ equal to that slope.
- Solve for $c$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=x^2 on [0,2] (blue). Mark endpoints (0,0) and (2,4) in red. Draw secant line through endpoints (dashed red). Do NOT show tangent yet. Label endpoints. Title: 'Find c where tangent is parallel to secant'.

*Interactive Controls:*
  - 🎛 {'type': 'button', 'label': 'Reveal Answer', 'action': 'show_text', 'target': 'c = 1'}

```python
import numpy as np; import matplotlib.pyplot as plt; x=np.linspace(0,2,100); f=x**2; plt.plot(x,f); plt.plot([0,2],[0,4],'ro'); sec_x=np.linspace(0,2); plt.plot(sec_x, 2*sec_x,'r--'); plt.show()
```

**Teacher Narration** `[69w]`
> Pause the video now and try this yourself. For the function f(x) equals x squared on the closed interval from 0 to 2, find the value of c predicted by the Mean Value Theorem. Compute the average rate of change first, then set the derivative equal to that value and solve for c. Once you have your answer, compare it to the next slide where I'll reveal the solution.

**Student Prompt:** Compute average slope, then solve f'(c) = average slope.

---

### Slide 10 · [PRACTICE]
**Solution: Pause Problem**  ·  `full_width`

**On-screen text** `[10w]`
Average slope = 2. f'(x)=2x → 2c=2 → c=1. Verified.

**FULL WIDTH** `[concept]`

**Solution:**

- $f(0)=0$, $f(2)=4$ → average slope $= \frac{4-0}{2-0}=2$
- $f'(x)=2x$ → set $2c=2 \Rightarrow c=1$
- $c=1$ is in $(0,2)$ ✓

**Check:** At $c=1$, the tangent line slope is exactly 2, parallel to the secant.

**Teacher Narration** `[60w]`
> Here's the solution. The average slope from x=0 to x=2 is 2. The derivative of x squared is 2x. Set that equal to 2 gives x equals 1. And indeed 1 lies in the open interval from 0 to 2. At x=1, the tangent line to the parabola has slope 2, exactly parallel to the secant line we saw earlier.

---

### Slide 11 · [PRACTICE]
**Example 3: Edge Case – Constant Function**  ·  `full_width`

**On-screen text** `[13w]`
Constant function: all tangents are horizontal. Average slope = 0. Any c works.

**FULL WIDTH** `[concept]`

**Problem:** Apply MVT to $f(x)=5$ on $[2,7]$.

- Continuous and differentiable ✓
- Average slope $= \frac{5-5}{7-2}=0$
- $f'(x)=0$ everywhere → any $c$ works!

**Insight:** The theorem holds trivially – every point satisfies the conclusion.

**Teacher Narration** `[71w]`
> What happens when the function is constant? Take f(x)=5 on the interval from 2 to 7. It's clearly continuous and differentiable. The average rate of change is zero because the function never changes. The derivative is zero everywhere, so any point c between 2 and 7 satisfies the conclusion of the MVT. This degenerate case shows that the theorem doesn't guarantee a unique c – it just guarantees at least one.

---

### Slide 12 · [PRACTICE] 🟡
**Example 4: Application – Proving Only One Root**  ·  `split_left_right`

**On-screen text** `[14w]`
Use Rolle's to prove exactly one root. Derivative always positive → can't have two.

**LEFT** `[steps]`

**Problem:** Prove $f(x)=x^3 + x - 1$ has exactly one real root.

| Step | Action |
|------|--------|
| 1 | Show at least one root: $f(0)=-1<0$, $f(1)=1>0$ → IVT gives root in $(0,1)$ |
| 2 | Assume two roots $a<b$ with $f(a)=f(b)=0$ |
| 3 | Apply Rolle's Theorem to $f$ on $[a,b]$ → $\exists c$ with $f'(c)=0$ |
| 4 | But $f'(x)=3x^2+1 > 0$ for all $x$ → contradiction! |
| 5 | Therefore only one root exists. |

**RIGHT** `[visual_spec]`

*Visual Spec:* Two subplots: (top) f(x)=x^3+x-1 on [-1,1] showing one root near 0.7, (bottom) derivative 3x^2+1 always positive. Mark root with green dot. Show that derivative never crosses zero.

```python
import numpy as np; import matplotlib.pyplot as plt; x=np.linspace(-1,1,200); f=x**3+x-1; df=3*x**2+1; fig, (ax1,ax2)=plt.subplots(2,1); ax1.plot(x,f); ax1.axhline(0,color='gray'); root = 0.6823; ax1.plot(root,0,'go'); ax2.plot(x,df); ax2.axhline(0,color='gray'); plt.show()
```

**Teacher Narration** `[91w]`
> Here's a powerful application of Rolles Theorem. We want to prove that the cubic function x cubed plus x minus 1 has exactly one real root. First, the Intermediate Value Theorem shows there is at least one root between 0 and 1 because f(0) is negative and f(1) is positive. Now suppose there were two distinct roots. Then by Rolles Theorem, somewhere between them the derivative would have to be zero. But the derivative is 3x squared plus 1, which is always positive. This contradiction means there cannot be two roots.

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proving a Constant Function**  ·  `split_left_right`

**On-screen text** `[14w]`
Zero derivative everywhere → function is constant. Proof uses MVT between any two points.

**LEFT** `[steps]`

**Theorem:** If $f'(x)=0$ for all $x$ in an interval, then $f$ is constant on that interval.

**Proof:**
1. Take any two points $a<b$ in the interval.
2. Apply MVT to $f$ on $[a,b]$: there exists $c$ with $f'(c)=\frac{f(b)-f(a)}{b-a}$.
3. Since $f'(c)=0$, we have $f(b)-f(a)=0$, so $f(b)=f(a)$.
4. Therefore $f$ is constant.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a constant function f(x)=k on [a,b] with horizontal line. Mark two arbitrary points a and b with red dots. Show that the secant line is horizontal (slope 0). Title: 'Proving a Constant Function'.

**Teacher Narration** `[81w]`
> This is another classic application of the Mean Value Theorem. Suppose a function has derivative zero at every point in an interval. To prove it must be constant, pick any two points a and b. The MVT tells us that somewhere between them, the derivative equals the difference quotient. Since the derivative is zero everywhere, the difference quotient must be zero, meaning f(b) equals f(a). Since a and b were arbitrary, all function values are equal, so the function is constant.

---

### Slide 14 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive Lab: Rolle's Theorem Exploration**  ·  `full_width`

**On-screen text** `[11w]`
Drag slider a. Function f(x)=x²-4x+3. When f(a)=f(b), horizontal tangent at x=2.

**FULL WIDTH** `[text]`

Use the sliders to change the interval $[a,b]$ for $f(x)=x^2 - 4x + 3$. Observe that when $f(a)=f(b)$, a horizontal tangent appears at $x=2$.

**Teacher Narration** `[83w]`
> Now let's explore Rolles Theorem interactively. The function shown is x squared minus 4x plus 3. Use the slider to change the left endpoint a. The right endpoint b is automatically set so that f(a) equals f(b). You'll see the endpoints marked in red. No matter what a you choose, the function always has a horizontal tangent at x equals 2, shown by the green dashed line. This visual reinforces that if endpoints are equal, there must be a point with zero slope.

**Student Prompt:** Try moving the slider to a = 0.5. Where is the horizontal tangent?

---

### Slide 15 · [VISUAL_LAB] 🎛 *[2 controls]*
**Interactive Lab: MVT Exploration**  ·  `full_width`

**On-screen text** `[15w]`
Drag the point c. Tangent slope changes. Find where it equals the secant slope (2).

**FULL WIDTH** `[text]`

Move the point $c$ along the curve. The tangent slope changes. Find where it matches the secant slope.

**Teacher Narration** `[77w]`
> This interactive lab lets you explore the Mean Value Theorem. We have the parabola f(x)=x-squared on the interval from 0 to 2. The secant line connecting the endpoints has slope 2. Drag the point c along the curve and watch the tangent line change. When the tangent slope equals the secant slope, you've found the c guaranteed by the MVT – it should be at x=1. See how the tangent line turns green when the slopes match.

**Student Prompt:** Drag c until the tangent turns green. What is the slope value?

---

### Slide 16 · [SUMMARY]
**Summary**  ·  `full_width`

**On-screen text** `[14w]`
Rolle's: endpoints equal → horiz. tangent. MVT: instant slope = average slope. Check diff'ability!

**FULL WIDTH** `[text]`

**Key formulas:**

- **Rolle's Theorem:** $f$ continuous on $[a,b]$, diff. on $(a,b)$, $f(a)=f(b)$ ⇒ $\exists c$ with $f'(c)=0$.
- **Mean Value Theorem:** $f$ continuous on $[a,b]$, diff. on $(a,b)$ ⇒ $\exists c$ with $f'(c) = \frac{f(b)-f(a)}{b-a}$.

**Applications:**
- Prove number of roots (using Rolle's)
- Prove constant function (using MVT)
- Bound function changes

**Key caution:** Always check differentiability on the open interval!

**Teacher Narration** `[105w]`
> Let's quickly summarise what we've learned. Rolles Theorem says that if a function is continuous, differentiable, and has equal endpoints, then somewhere the derivative is zero. The Mean Value Theorem generalizes this: if the function is continuous and differentiable, then at some point the instantaneous slope equals the average slope over the interval. These theorems are not just abstract; we can use them to prove how many roots an equation has, or that a function is constant if its derivative is always zero. Always remember to check that the function is differentiable on the entire open interval – a single corner can break the theorem.

---
