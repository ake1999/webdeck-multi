# One-Sided Limits and Limits at Infinity

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should already understand the intuitive definition of a two-sided limit; this lecture explores the formal one-sided versions and extends the idea to infinity.

**Learning Objectives:**
- Calculate one-sided limits from graphs and algebraic expressions
- Interpret the relationship between left-hand and right-hand limits for determining limit existence
- Apply limit laws to evaluate limits at infinity for rational and algebraic functions
- Analyze horizontal asymptotes using limits at positive and negative infinity
- Determine when infinite limits exist as extended limits

---

## v3.1 Production Readiness

✅ **Interactive moments:** 4 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 73w)
⚠️ **Narration too short (<60w):** [4]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s4:47w']
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 4 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | hook | 🟢 | ◧ |  | 79w | 14w | Two Paths, One Destination? |
| 2 | core | 🟢 | ◧ |  | 76w | 10w | One-Sided Limits |
| 3 | 🎛practice | 🟢 | ◧ |  | 62w | 17w | Warm-Up: Reading One-Sided Limits from a Graph |
| 4 | pause_and_try | 🟢 | ◧ | ⏸️ | 47w⚠️ | 10w | Your Turn: Will the Two-Sided Limit Exist? |
| 5 | core | 🟢 | ◧ |  | 74w | 11w | Two-Sided Limit Existence Condition |
| 6 | practice | 🟡 | ◧ | ⏸️ | 68w | 9w | Standard Algebraic Example: Absolute Value |
| 7 | core | 🟢 | ◧ |  | 71w | 7w | Limits at Infinity (Horizontal Asymptotes) |
| 8 | 🎛misconception | 🟡 | ◧ |  | 79w | 17w | Common Pitfall: Infinite Limits |
| 9 | core | 🟢 | ◧ |  | 69w | 12w | Infinite Limits (Vertical Asymptotes) |
| 10 | practice | 🟡 | ⬛⬛ |  | 73w | 15w | Edge Case: Limits at Infinity with Different Degrees |
| 11 | 🎛practice | 🟡 | ◧ |  | 73w | 7w | Application: Profit Model |
| 12 | challenge | 🔴 | ⬛⬛ |  | 116w | 14w | [Challenge – Optional] Proof: Relationship Between One-Sided and Two-Sided Limits |
| 13 | 🎛visual_lab | 🟢 | ◧ |  | 78w | 17w | Interactive Lab: Explore One-Sided Limits |
| 14 | summary | 🟢 | ⬛⬛ |  | 63w | 16w | Summary: Key Takeaways |

---

### Slide 1 · [HOOK]
**Two Paths, One Destination?**  ·  `split_left_right`

**On-screen text** `[14w]`
Left trail: 5000 ft. Right trail: 2000 ft. Does the lookout have one elevation?

**LEFT** `[text]`

Imagine hiking to a mountain lookout. The left trail leads to 5000 ft elevation; the right trail to 2000 ft. Does the lookout have a single elevation? 

**No** – it depends on your direction. This is exactly how one-sided limits can disagree.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a coordinate plane with x from 0 to 4, y from 0 to 5. Plot left branch as solid blue line from x=0 to x=2 (open circle at (2,2)). Plot right branch as solid red line from x=2 (open circle at (2,3)) to x=4. Add dashed vertical line at x=2. Add text annotations: near (1.5,2) 'Left limit = 2' and near (2.5,3.5) 'Right limit = 3'. Title: 'One-Sided Limits Can Disagree'.

```python
import numpy as np; import matplotlib.pyplot as plt; x_left = np.linspace(0,2,100); x_right = np.linspace(2,4,100); plt.plot(x_left, x_left, 'b-', label='Left branch f(x)=x'); plt.plot(x_right, x_right+1, 'r-', label='Right branch f(x)=x+1'); plt.plot(2,2,'bo',fillstyle='none'); plt.plot(2,3,'ro',fillstyle='none'); plt.axvline(2, color='gray', linestyle='--'); plt.text(1.5,2, 'Left limit = 2', fontsize=12); plt.text(2.5,3.5, 'Right limit = 3', fontsize=12); plt.legend(); plt.xlabel('x'); plt.ylabel('y'); plt.show()
```

**Teacher Narration** `[79w]`
> Welcome. Let's start with a story. You're hiking to a mountain lookout. The trail from the left climbs steadily to 5000 feet, but the trail from the right only reaches 2000 feet. When you arrive at the lookout, the elevation you experience depends entirely on which path you took. The lookout doesn't have a single elevation. In calculus, when the left-hand and right-hand limits disagree, the overall limit does not exist. This is the core idea behind one-sided limits.

---

### Slide 2 · [CORE]
**One-Sided Limits**  ·  `split_left_right`

**On-screen text** `[10w]`
$\lim_{x\to a^-} f(x)=L$ left-hand limit. $\lim_{x\to a^+} f(x)=L$ right-hand limit.

**LEFT** `[formula_block]`

$$ \lim_{x \to a^-} f(x) = L \qquad \text{(left-hand limit)} $$

$$ \lim_{x \to a^+} f(x) = L \qquad \text{(right-hand limit)} $$

**RIGHT** `[visual_spec]`

*Visual Spec:* Create a figure with a smooth curve f(x)=x^2 approaching x=2. Animate a point moving along the curve from left towards x=2 (blue) and from right (red). Show the y-value approaching 4. Highlight the point (2,4) with a star. Add labels for a, L. Use 200 frames with interval=100 to slow the animation. The left point starts at x=0.5 and moves right; the right point starts at x=3.5 and moves left. Both points are colored blue (left) and red (right).

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.animation import FuncAnimation; fig, ax = plt.subplots(); x = np.linspace(0,3,100); y = x**2; ax.plot(x,y); point_left, = ax.plot([],[],'bo',markersize=8); point_right, = ax.plot([],[],'ro',markersize=8); def update(frame): t = frame/200; x_left = 0.5 + 1.5*t; x_right = 3.5 - 1.5*t; point_left.set_data([x_left], [x_left**2]); point_right.set_data([x_right], [x_right**2]); return point_left, point_right; ani = FuncAnimation(fig, update, frames=200, interval=100, repeat=True); plt.show()
```

**Teacher Narration** `[76w]`
> We write the left-hand limit with a minus sign superscript next to the a. This means x approaches a from values less than a. The right-hand limit uses a plus sign. Both express the value f(x) approaches as x gets arbitrarily close to a, but only from one direction. Notice: the minus sign does not mean negative; it means from below. The plus sign means from above. These are the building blocks of the two-sided limit.

---

### Slide 3 · [PRACTICE] 🎛 *[2 controls]*
**Warm-Up: Reading One-Sided Limits from a Graph**  ·  `split_left_right`

**On-screen text** `[17w]`
From graph: at x=2, left limit = 2, right limit = 3. Two-sided limit does not exist.

**LEFT** `[steps]`

Use the graph of f with a jump at x=2.

1. **Left-hand limit**: Trace from left – y approaches 2.
2. **Right-hand limit**: Trace from right – y approaches 3.
3. Compare: 2 ≠ 3 → two-sided limit **does not exist**.

**RIGHT** `[visual_spec]`

*Visual Spec:* Same graph as slide 1, but with two buttons: 'Show left approach' and 'Show right approach'. When left button pressed, animate a point moving from left towards x=2 and display 'Left limit = 2'. Right button similarly. Also show text 'Two-sided limit does not exist'.

*Interactive Controls:*
  - 🎛 Button: 'Show left approach'
  - 🎛 Button: 'Show right approach'

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Button; fig, ax = plt.subplots(); x_left = np.linspace(0,2,100); x_right = np.linspace(2,4,100); ax.plot(x_left, x_left, 'b-'); ax.plot(x_right, x_right+1, 'r-'); ax.plot(2,2,'bo',fillstyle='none'); ax.plot(2,3,'ro',fillstyle='none'); ax.axvline(2, color='gray', linestyle='--'); ax.set_xlim(0,4); ax.set_ylim(0,5); text_obj = ax.text(0.5,4.5,''); def show_left(event): text_obj.set_text('Left limit = 2'); fig.canvas.draw(); def show_right(event): text_obj.set_text('Right limit = 3'); fig.canvas.draw(); ax_button_left = plt.axes([0.1,0.05,0.15,0.075]); btn_left = Button(ax_button_left, 'Show left'); btn_left.on_clicked(show_left); ax_button_right = plt.axes([0.3,0.05,0.15,0.075]); btn_right = Button(ax_button_right, 'Show right'); btn_right.on_clicked(show_right); plt.show()
```

**Teacher Narration** `[62w]`
> Here's a simple graph with a jump at x=2. The left-hand limit is 2, because as you trace the blue curve from the left, the y-values get closer and closer to 2. The right-hand limit is 3. Since they are different, the two-sided limit does not exist. Pay attention: the limit cares about behavior near x=2, not the actual value at x=2.

---

### Slide 4 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Your Turn: Will the Two-Sided Limit Exist?**  ·  `split_left_right`

**On-screen text** `[10w]`
Does $\lim_{x\to 2} f(x)$ exist? Explain why or why not.

**LEFT** `[text]`

For the function shown (jump at x=2), decide whether $\lim_{x\to 2} f(x)$ exists. What is your reasoning?

**RIGHT** `[visual_spec]`

*Visual Spec:* Same graph as slide 3, but without the buttons and with title 'Predict: Does the two-sided limit exist?' No limit labels shown.

**Teacher Narration** `[47w ⚠️ **TOO SHORT: 47w < 60w min**]`
> Take a moment to look at this graph. The left-hand limit is 2, the right-hand limit is 3. Before I reveal the answer, think about what we learned: the two-sided limit exists only if these two are equal. Write down your prediction. I'll give you 10 seconds.

**Student Prompt:** Prediction: Does the two-sided limit exist?

---

### Slide 5 · [CORE]
**Two-Sided Limit Existence Condition**  ·  `split_left_right`

**On-screen text** `[11w]`
$\lim_{x\to a} f(x)=L$ exists iff left and right limits both $=L$.

**LEFT** `[formula_block]`

$$ \lim_{x\to a} f(x) = L \iff \lim_{x\to a^-} f(x) = \lim_{x\to a^+} f(x) = L $$

**RIGHT** `[visual_spec]`

*Visual Spec:* Use a smooth function like f(x)=x^2 at x=2. Animate two points (one from left in blue, one from right in red) moving toward (2,4). When they meet, highlight the point and show 'Two-sided limit exists: 4'. Use 200 frames with interval=100. The left point starts at x=0.5 and moves right; the right point starts at x=3.5 and moves left. At frame 100, both points reach x=2 and the text appears.

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.animation import FuncAnimation; fig, ax = plt.subplots(); x = np.linspace(0,3,100); y = x**2; ax.plot(x,y); point_left, = ax.plot([],[],'bo',markersize=8); point_right, = ax.plot([],[],'ro',markersize=8); text_obj = ax.text(1,1,''); def update(frame): t = frame/200; x_left = 0.5 + 1.5*t; x_right = 3.5 - 1.5*t; point_left.set_data([x_left], [x_left**2]); point_right.set_data([x_right], [x_right**2]); if frame >= 100: text_obj.set_text('Two-sided limit exists: 4'); else: text_obj.set_text(''); return point_left, point_right, text_obj; ani = FuncAnimation(fig, update, frames=200, interval=100, repeat=True); plt.show()
```

**Teacher Narration** `[74w]`
> Here is the formal condition. A two-sided limit exists if and only if both one-sided limits exist and they are equal. If either one-sided limit does not exist, or they exist but differ, then the two-sided limit does not exist. This is a fundamental theorem. The animation shows a smooth function where both sides converge to 4 at x=2. When they meet, the two-sided limit exists. Now let's apply this to an algebraic example.

---

### Slide 6 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Standard Algebraic Example: Absolute Value**  ·  `split_left_right`

**On-screen text** `[9w]`
$\lim_{x\to 3^-} \frac{|x-3|}{x-3} = -1$, $\lim_{x\to 3^+} = +1$.

**LEFT** `[steps]`

Evaluate $\lim_{x\to 3^-} \frac{|x-3|}{x-3}$.

1. For $x<3$, $|x-3| = -(x-3)$.
2. Simplify: $\frac{-(x-3)}{x-3} = -1$.
3. Hence $\lim_{x\to 3^-} = -1$.

Now try $\lim_{x\to 3^+} \frac{|x-3|}{x-3}$ (answer: +1).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=|x-3|/(x-3) which is -1 for x<3 and +1 for x>3. Use open circles at (3,-1) and (3,1). Mark the jump.

```python
import numpy as np; import matplotlib.pyplot as plt; x_left = np.linspace(2.5,2.999,100); x_right = np.linspace(3.001,3.5,100); plt.plot(x_left, -np.ones_like(x_left), 'b-'); plt.plot(x_right, np.ones_like(x_right), 'r-'); plt.plot(3,-1,'bo',fillstyle='none'); plt.plot(3,1,'ro',fillstyle='none'); plt.axvline(3, color='gray', linestyle='--'); plt.yticks([-1,0,1]); plt.xlabel('x'); plt.ylabel('f(x)'); plt.show()
```

**Teacher Narration** `[68w]`
> Let's evaluate a tricky one-sided limit algebraically. For x approaching 3 from the left, the numerator |x-3| becomes -(x-3), because the absolute value flips sign for negative arguments. Canceling (x-3) gives -1. So the left-hand limit is -1. For the right-hand limit, x>3 gives |x-3| = x-3, so the function becomes +1. The two-sided limit does not exist because these are different. The graph shows the jump clearly.

**Student Prompt:** Now compute $\lim_{x\to 3^+} \frac{|x-3|}{x-3}$ on your own.

---

### Slide 7 · [CORE]
**Limits at Infinity (Horizontal Asymptotes)**  ·  `split_left_right`

**On-screen text** `[7w]`
$\lim_{x\to\infty} f(x)=L$: horizontal asymptote. $\lim_{x\to -\infty} f(x)=M$.

**LEFT** `[formula_block]`

$$ \lim_{x\to \infty} f(x) = L \qquad \text{(as x grows, f(x) approaches L)} $$

$$ \lim_{x\to -\infty} f(x) = M $$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=2 + (sin x)/x from x=-10 to 10, with horizontal asymptotes at y=2. Show that as x goes to infinity, the function oscillates but gets closer to 2.

```python
import numpy as np; import matplotlib.pyplot as plt; x = np.linspace(-10,10,1000); y = 2 + np.sin(x)/x; plt.plot(x,y); plt.axhline(2, color='k', linestyle='--', label='y=2'); plt.legend(); plt.xlabel('x'); plt.ylabel('f(x)'); plt.title('Horizontal Asymptote at y=2'); plt.show()
```

**Teacher Narration** `[71w]`
> Now we extend limits to infinity. As x becomes very large in the positive direction, some functions settle toward a constant value L. That constant is called a horizontal asymptote. The same can happen as x goes to negative infinity, giving a possibly different constant M. For example, the function 2 + sin(x)/x oscillates but gets arbitrarily close to 2. Not all functions have horizontal asymptotes; sometimes the limit is infinite.

---

### Slide 8 · [MISCONCEPTION] 🟡 🎛 *[2 controls]*
**Common Pitfall: Infinite Limits**  ·  `split_left_right`

**On-screen text** `[17w]`
Many think $\lim_{x\to 0} 1/x^2$ DNE. Actually, extended limit = $\infty$ because both sides go to $\infty$.

**LEFT** `[text]`

**Wrong**: $\lim_{x\to 0} \frac{1}{x^2}$ does not exist because it goes to infinity.

**Correct**: Both sides go to $+\infty$, so the extended limit is $\infty$ (this is an extended real limit, not a standard real limit). Compare with $\lim_{x\to 0} \frac{1}{x}$, where left=$-\infty$, right=$+\infty$ → truly does not exist even as an extended limit.

**RIGHT** `[visual_spec]`

*Visual Spec:* Left graph: 1/x^2, right graph: 1/x. Use buttons to toggle between showing left and right limits. For 1/x^2, show both sides going to +∞. For 1/x, show left goes to -∞, right to +∞. Highlight the difference.

*Interactive Controls:*
  - 🎛 Button: 'Show left limit'
  - 🎛 Button: 'Show right limit'

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Button; fig, (ax1, ax2) = plt.subplots(1,2,figsize=(10,5)); x_left = np.linspace(-2, -0.01, 100); x_right = np.linspace(0.01, 2, 100); ax1.plot(x_left, 1/(x_left**2), 'b-', label='1/x^2'); ax1.plot(x_right, 1/(x_right**2), 'r-'); ax1.set_ylim(0,100); ax1.set_title('1/x^2'); ax1.axvline(0, color='gray'); ax2.plot(x_left, 1/x_left, 'b-', label='1/x'); ax2.plot(x_right, 1/x_right, 'r-'); ax2.set_ylim(-100,100); ax2.axvline(0, color='gray'); ax2.set_title('1/x'); def show_left(event): ax1.set_title('1/x^2: Left limit = +∞'); ax2.set_title('1/x: Left limit = -∞'); fig.canvas.draw(); def show_right(event): ax1.set_title('1/x^2: Right limit = +∞'); ax2.set_title('1/x: Right limit = +∞'); fig.canvas.draw(); ax_button_left = plt.axes([0.1,0.05,0.15,0.075]); btn_left = Button(ax_button_left, 'Show left'); btn_left.on_clicked(show_left); ax_button_right = plt.axes([0.3,0.05,0.15,0.075]); btn_right = Button(ax_button_right, 'Show right'); btn_right.on_clicked(show_right); plt.show()
```

**Teacher Narration** `[79w]`
> Here's a concept that trips up many students. The limit of 1 over x squared as x goes to 0. Some say it doesn't exist because it blows up. But both sides approach positive infinity, so we say the extended limit is infinity. Compare with 1 over x. On the left it goes to negative infinity, on the right to positive infinity. Those are different, so even the extended limit does not exist. Always check both one-sided infinite limits.

---

### Slide 9 · [CORE]
**Infinite Limits (Vertical Asymptotes)**  ·  `split_left_right`

**On-screen text** `[12w]`
$\lim_{x\to a} f(x) = \infty$ means unbounded growth. Not a real number.

**LEFT** `[formula_block]`

$$ \lim_{x\to a} f(x) = \infty \quad \text{or} \quad \lim_{x\to a} f(x) = -\infty $$

(Extended limit – not a real number, but conveys unbounded growth.)

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=1/(x-2)^2. Show vertical asymptote at x=2. Animate approach from left and right, both going to +∞.

```python
import numpy as np; import matplotlib.pyplot as plt; x_left = np.linspace(1.5,1.99,100); x_right = np.linspace(2.01,2.5,100); y_left = 1/(x_left-2)**2; y_right = 1/(x_right-2)**2; plt.plot(x_left, y_left, 'b-'); plt.plot(x_right, y_right, 'r-'); plt.axvline(2, color='k', linestyle='--'); plt.ylim(0,100); plt.xlabel('x'); plt.ylabel('f(x)'); plt.title('Vertical Asymptote at x=2'); plt.show()
```

**Teacher Narration** `[69w]`
> When a function grows without bound near x=a, we say the limit is infinity or negative infinity. This is an extended limit; it's not a real number. It simply tells us the function increases beyond any bound. For example, 1 over (x-2) squared has a vertical asymptote at x=2. Both sides go to positive infinity, so the extended limit is infinity. We'll use this notation to describe vertical asymptotes.

---

### Slide 10 · [PRACTICE] 🟡
**Edge Case: Limits at Infinity with Different Degrees**  ·  `full_width`

**On-screen text** `[15w]`
$\lim_{x\to \infty} \frac{2x^3 - 5x}{3x^2 + 1} = \infty$. Use degree rule for rational functions.

**FULL WIDTH** `[steps]`

Evaluate $\lim_{x\to \infty} \frac{2x^3 - 5x}{3x^2 + 1}$.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Compare degrees: numerator 3 > denominator 2 | Numerator grows faster. |
| 2 | Divide numerator and denominator by $x^2$ | $\frac{2x - 5/x}{3 + 1/x^2}$ |
| 3 | As $x\to\infty$, $5/x\to 0$, $1/x^2\to 0$ | |
| 4 | Result: $\frac{2x}{3} \to \infty$ | Limit is $\infty$. |

**Degree Rule**: 
- num deg < denom deg → limit 0
- num deg = denom deg → limit = ratio of leading coefficients
- num deg > denom deg → limit = ±∞ (check signs: if leading coefficients have same sign, limit is +∞; if opposite signs, limit is -∞)

**Teacher Narration** `[73w]`
> When evaluating limits at infinity of rational functions, compare the degrees. Here the numerator degree is 3, denominator is 2, so the numerator grows faster. After dividing by the highest denominator power, we get 2x/3, which goes to infinity. The degree rule is a quick shortcut: if numerator degree is larger, limit is infinity. If smaller, limit is zero. If equal, limit is the ratio of leading coefficients. Practice this with several examples.

---

### Slide 11 · [PRACTICE] 🟡 🎛 *[1 controls]*
**Application: Profit Model**  ·  `split_left_right`

**On-screen text** `[7w]`
$P(t)=\frac{100t}{t+5}$. Long-run profit approaches $100,000$ per year.

**LEFT** `[steps]`

Profit $P(t)=\frac{100t}{t+5}$ (thousands $, t years). Find $\lim_{t\to\infty} P(t)$.

- Divide by t: $\frac{100}{1+5/t}$.
- As $t\to\infty$, $5/t \to 0$.
- Limit = $100$ thousand.

Interpretation: Long-run steady profit ≈ $100,000$/year.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot P(t)=100t/(t+5) for t from 0 to 50. Add dashed line at y=100. Use interactive slider for t to show approach to asymptote. Show the current profit value.

*Interactive Controls:*
  - 🎛 Slider: t from 0 to 50

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider; fig, ax = plt.subplots(); t = np.linspace(0,50,500); P = 100*t/(t+5); ax.plot(t,P, 'b-'); ax.axhline(100, color='k', linestyle='--', label='Asymptote y=100'); ax.set_xlim(0,50); ax.set_ylim(0,110); ax.legend(); current_val = ax.text(30,50, 't=0, P=0'); def update(val): t_val = val; P_val = 100*t_val/(t_val+5); current_val.set_text(f't={t_val:.1f}, P={P_val:.2f}'); fig.canvas.draw(); ax_slider = plt.axes([0.2,0.05,0.6,0.03]); slider = Slider(ax_slider, 't', 0, 50, valinit=0, valstep=0.1); slider.on_changed(update); plt.show()
```

**Teacher Narration** `[73w]`
> Here's a realistic business application. A company's profit in thousands of dollars after t years is given by P(t). We want the long-term profit as t goes to infinity. Divide numerator and denominator by t. As t becomes very large, 5 over t goes to zero, leaving 100. So the profit approaches $100,000 per year. This horizontal asymptote represents the steady-state profit. Use the slider to see how quickly it approaches the asymptote.

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof: Relationship Between One-Sided and Two-Sided Limits**  ·  `full_width`

**On-screen text** `[14w]`
If both one-sided limits equal L, then the two-sided limit equals L (ε-δ proof).

**FULL WIDTH** `[steps]`

**Theorem**: If $\lim_{x\to a^-} f(x) = L$ and $\lim_{x\to a^+} f(x) = L$, then $\lim_{x\to a} f(x) = L$.

**Proof (ε-δ)**:
1. For any ε>0, ∃δ₁>0 such that a-δ₁ < x < a ⇒ |f(x)-L|<ε.
2. Similarly ∃δ₂>0 such that a < x < a+δ₂ ⇒ |f(x)-L|<ε.
3. Choose δ = min(δ₁, δ₂).
4. If 0<|x-a|<δ, then either x is in (a-δ, a) or (a, a+δ).
5. In both cases, |f(x)-L|<ε. Hence limit exists and equals L.

**Teacher Narration** `[116w]`
> This challenge slide shows the formal epsilon-delta proof that connects one-sided and two-sided limits. The idea is that if we can find deltas for each side, the smaller delta works for both sides simultaneously. This proof is optional but deepens your understanding of limit definitions. If you are comfortable with epsilon-delta, this is a nice argument to know. The epsilon-delta definition is a rigorous way to define limits: for any positive epsilon, there exists a positive delta such that if x is within delta of a (but not equal to a), then f(x) is within epsilon of L. This proof shows that if the one-sided limits both equal L, then the two-sided limit also equals L.

---

### Slide 13 · [VISUAL_LAB] 🎛 *[3 controls]*
**Interactive Lab: Explore One-Sided Limits**  ·  `split_left_right`

**On-screen text** `[17w]`
Move the slider to see the jump at x=1. Left limit = -1, right limit = +1.

**LEFT** `[text]`

Use the controls to explore the function $f(x)=\frac{x-1}{|x-1|}$ at x=1. Move the slider to see left and right approach. Notice the jump.

**RIGHT** `[python_lab]`

*Visual Spec:* Plot f(x) = (x-1)/|x-1|, which is +1 for x>1, -1 for x<1. Include a slider to move a point along the graph from left or right. Buttons to show left limit, right limit, and reset.

*Interactive Controls:*
  - 🎛 Slider: move x from 0 to 2
  - 🎛 Button: 'Left limit'
  - 🎛 Button: 'Right limit'

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider, Button; fig, ax = plt.subplots(); x_left = np.linspace(0,0.999,100); x_right = np.linspace(1.001,2,100); ax.plot(x_left, -np.ones_like(x_left), 'b-', linewidth=2); ax.plot(x_right, np.ones_like(x_right), 'r-', linewidth=2); ax.plot(1, -1, 'bo', fillstyle='none', markersize=10); ax.plot(1, 1, 'ro', fillstyle='none', markersize=10); ax.axvline(1, color='gray', linestyle='--'); ax.set_ylim(-2,2); point, = ax.plot([], [], 'ko', markersize=12); text_obj = ax.text(0.5,1.5,''); def update(val): x_val = val; if x_val < 1: y_val = -1; else: y_val = 1; point.set_data([x_val], [y_val]); text_obj.set_text(f'x={x_val:.2f}, f(x)={y_val}'); fig.canvas.draw(); ax_slider = plt.axes([0.2,0.1,0.6,0.03]); slider = Slider(ax_slider, 'x', 0, 2, valinit=0.5, valstep=0.01); slider.on_changed(update); def show_left(event): text_obj.set_text('Left limit = -1'); fig.canvas.draw(); ax_btn_left = plt.axes([0.1,0.05,0.15,0.075]); btn_left = Button(ax_btn_left, 'Left limit'); btn_left.on_clicked(show_left); def show_right(event): text_obj.set_text('Right limit = +1'); fig.canvas.draw(); ax_btn_right = plt.axes([0.3,0.05,0.15,0.075]); btn_right = Button(ax_btn_right, 'Right limit'); btn_right.on_clicked(show_right); plt.show()
```

**Teacher Narration** `[78w]`
> Let's play with an interactive lab. The function f(x) equals x-1 divided by the absolute value of x-1. It's +1 for x greater than 1 and -1 for x less than 1. Use the slider to move a point along the graph. Press the buttons to see the left and right limits. Notice that the two-sided limit does not exist because the left and right limits are different. This lab lets you see the jump discontinuity in action.

---

### Slide 14 · [SUMMARY]
**Summary: Key Takeaways**  ·  `full_width`

**On-screen text** `[16w]`
Master one-sided limits to understand when limits exist. Use degree rule for rational functions at infinity.

**FULL WIDTH** `[text]`

**One-Sided Limits**: $\lim_{x\to a^-} f(x)$ and $\lim_{x\to a^+} f(x)$

**Existence Condition**: Two-sided limit exists iff both one-sided limits exist and are equal.

**Infinite Limits**: Both sides go to same infinity → extended limit exists.

**Limits at Infinity**: Horizontal asymptotes; degree rule for rational functions.

**Common Mistake**: Not all infinite limits 'does not exist' equally – check both sides.

**Teacher Narration** `[63w]`
> Today we covered one-sided limits, the condition for two-sided limit existence, infinite limits and their extended meaning, and limits at infinity. Remember that if both one-sided limits approach the same infinity, we say the extended limit is that infinity. Also, the degree rule is a quick tool for rational functions at infinity. Practice these concepts with the provided examples. Thank you for watching.

---
