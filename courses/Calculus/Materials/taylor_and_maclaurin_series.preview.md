# Taylor and Maclaurin Series

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should already know what a power series is, including radius of convergence and term-by-term differentiation/integration.

**Learning Objectives:**
- Calculate Taylor and Maclaurin series for elementary functions using direct differentiation
- Determine the radius of convergence for Taylor series using the Ratio Test
- Apply Taylor series to evaluate integrals that cannot be expressed in elementary form
- Recognize when a function equals its Taylor series versus when it does not

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 71w)
⚠️ **Narration too short (<60w):** [11]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s11:57w']
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 6 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ |  | 64w | 11w | The Sculptor's Apprentice |
| 2 | 🎛core | 🟢 | ◧ |  | 71w | 14w | Taylor Series Formula |
| 3 | practice | 🟢 | ⬛⬛ | ⏸️ | 71w | 8w | Warm-Up: Maclaurin Series for e^x |
| 4 | practice | 🟢 | ◧ |  | 79w | 15w | Radius of Convergence via Ratio Test |
| 5 | 🎛core | 🟢 | ◧ |  | 71w | 12w | Taylor's Inequality (Error Bound) |
| 6 | practice | 🟡 | ⬛⬛ | ⏸️ | 70w | 10w | Example: sin(x) Maclaurin Series + Proof |
| 7 | 🎛visual_lab | 🟢 | ◧ |  | 64w | 8w | Visualizing Taylor Polynomials for sin(x) |
| 8 | practice | 🟢 | ◧ |  | 78w | 7w | Edge Case: cos(x) by Differentiating sin(x) Series |
| 9 | practice | 🟡 | ⬛⬛ |  | 67w | 12w | Application: ∫ e^{-x²} dx (Impossible Integral) |
| 10 | misconception | 🟡 | ◧ |  | 73w | 11w | When Series Fail: The Flat Function |
| 11 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 57w⚠️ | 8w | Try It: Maclaurin Series for cos(2x) |
| 12 | practice | 🟢 | ⬛⬛ |  | 77w | 8w | Solution: cos(2x) Maclaurin Series |
| 13 | 🎛challenge | 🔴 | ◧ |  | 79w | 11w | [Challenge – Optional] When Does a Function Equal Its Taylor Series? |
| 14 | summary | 🟢 | ⬛⬛ |  | 78w | 16w | Summary: Key Takeaways |

---

### Slide 1 · [HOOK] 🎛 *[1 controls]*
**The Sculptor's Apprentice**  ·  `split_left_right`

**On-screen text** `[11w]`
Each derivative layer adds finer detail. Taylor series unpacks the blueprint.

**LEFT** `[concept]`

**Metaphor:** Carving a statue – each pass adds fine detail. Derivatives at a single point are the blueprint for the whole function.

**RIGHT** `[visual_spec]`

*Visual Spec:* Animate successive Taylor polynomial approximations (T1, T3, T5) to an unknown smooth curve f(x). Show f(x) in black, each polynomial in a different color. As degree increases, polynomial matches more of f(x). Use a small interactive slider to step through polynomial orders 1 to 9. The unknown curve is drawn from a hidden function (e.g. sin(x) + 0.2 x^2) so students can't guess.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 9

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider; x = np.linspace(-3, 3, 400); f = np.sin(x)+0.2*x**2; fig, ax = plt.subplots(); ax.plot(x, f, 'k', lw=2, label='f(x)'); line, = ax.plot([], [], 'r--', lw=1.5, label='T_n'); ax.legend(); ax.set_ylim(-2,3); ax.grid(True); def taylor_approx(n): s=np.zeros_like(x); for k in range(n+1): coeff = (1 if k%4==1 else -1 if k%4==3 else 0)/np.math.factorial(k); s += coeff*x**k; s += 0.2*x**2; return s; def update(val): n=int(val); y=taylor_approx(n); line.set_data(x, y); fig.canvas.draw_idle(); slider = Slider(plt.axes([0.2,0.02,0.6,0.03]), 'n', 1, 9, valinit=1, valstep=1); slider.on_changed(update); update(1); plt.show()
```

**Teacher Narration** `[64w]`
> Imagine carving a statue from marble. You start with a rough block, then add contours, then fine details. A function's derivatives at a single point work the same way: the first derivative gives the slope, the second tells how slope changes, and each higher derivative reveals more delicate features. The Taylor series is the decoder that unpacks all this information into an infinite polynomial.

---

### Slide 2 · [CORE] 🎛 *[1 controls]*
**Taylor Series Formula**  ·  `split_left_right`

**On-screen text** `[14w]`
Taylor series at x=a: sum of nth derivative at a over n! times (x-a)^n.

**LEFT** `[formula_block]`

$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot sin(x) (black) and its Taylor polynomial centered at 0 for degree n (colored). Use a slider to vary n from 0 to 10. Show the polynomial expression. Also show the error as a shaded region. The polynomial should be updated as the slider moves. Use default matplotlib widgets.

*Interactive Controls:*
  - 🎛 Slider for n from 0 to 10

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider; x = np.linspace(-2*np.pi, 2*np.pi, 800); f = np.sin(x); fig, ax = plt.subplots(); ax.plot(x, f, 'k', label='sin(x)'); line, = ax.plot([], [], 'r-', lw=2, label='Taylor'); ax.relim(); ax.autoscale_view(); ax.legend(); ax.set_ylim(-2,2); ax.grid(True); def taylor_series(n): s=np.zeros_like(x); for k in range(n+1): coeff = (1 if k%4==1 else -1 if k%4==3 else 0)/np.math.factorial(k); s += coeff*x**k; return s; def update(val): n=int(val); y=taylor_series(n); line.set_data(x, y); fig.canvas.draw_idle(); slider = Slider(plt.axes([0.2,0.02,0.6,0.03]), 'n', 0, 10, valinit=1, valstep=1); slider.on_changed(update); update(1); plt.show()
```

**Teacher Narration** `[71w]`
> Here is the heart of the lecture. The Taylor series expresses a function as an infinite polynomial centered at a point a. Each coefficient is the nth derivative evaluated at a, divided by n factorial. The factorial in the denominator grows quickly, which helps the series converge for many functions. Use the slider to see how increasing the degree n makes the polynomial hug the sine curve more closely near zero.

---

### Slide 3 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Warm-Up: Maclaurin Series for e^x**  ·  `full_width`

**On-screen text** `[8w]`
Maclaurin series for e^x: ∑_{n=0}^∞ x^n/n!   (all n!)

**FULL WIDTH** `[steps]`

| Step | Action | Result |
|------|--------|--------|
| 1 | All derivatives of e^x are e^x | f^{(n)}(x) = e^x |
| 2 | Evaluate at a=0 | f^{(n)}(0) = 1 |
| 3 | Plug into Maclaurin formula | ∑ x^n / n! |
| 4 | Write first 4 terms | 1 + x + x²/2! + x³/3! + … |

**Teacher Narration** `[71w]`
> Let's start with the simplest example – the exponential function. Because e^x is its own derivative, every derivative at zero equals one. So the Maclaurin series becomes the sum of x to the n over n factorial. This series converges for every real x, as we'll check next. Notice how the factorial denominator ensures that terms become very small for large n, which is why the series converges for all x.

**Student Prompt:** Quick check: What would the series be for e^{2x}?

---

### Slide 4 · [PRACTICE]
**Radius of Convergence via Ratio Test**  ·  `split_left_right`

**On-screen text** `[15w]`
Ratio Test: limit = 0, so series converges for all x. Radius R = ∞.

**LEFT** `[steps]`

For ∑ x^n/n!:
1. a_n = x^n/n!
2. |a_{n+1}/a_n| = |x|/(n+1)
3. Limit as n→∞ = 0
4. Since 0 < 1 for all x, R = ∞.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a horizontal number line from -10 to 10. Shade the entire line in blue to indicate convergence everywhere. Place a point at x=0 labelled 'center a=0'. Add text 'R = ∞' below the line.

```python
import matplotlib.pyplot as plt; fig, ax = plt.subplots(figsize=(6,1.5)); ax.axhline(0, color='gray', lw=0.5); ax.set_xlim(-10,10); ax.set_ylim(-0.5,0.5); ax.plot(0,0,'ko',ms=8); ax.text(0,-0.1,'a=0',ha='center'); ax.axvspan(-10,10,alpha=0.1,color='blue'); ax.text(0,0.2,'R = ∞',ha='center',fontsize=12,fontweight='bold'); ax.axis('off'); plt.show()
```

**Teacher Narration** `[79w]`
> Now we confirm convergence. For the e^x series we apply the Ratio Test. The ratio of successive terms simplifies to x over n+1. As n goes to infinity, the denominator dominates, so the limit is zero for any fixed x. That means the series converges for every real number – the radius of convergence is infinite. This is a key property: the exponential series converges everywhere, which is why we can use it to approximate e^x for any x.

---

### Slide 5 · [CORE] 🎛 *[1 controls]*
**Taylor's Inequality (Error Bound)**  ·  `split_left_right`

**On-screen text** `[12w]`
Error bound: uses the maximum of the (n+1)th derivative on the interval.

**LEFT** `[formula_block]`

$$|R_n(x)| \leq \frac{M}{(n+1)!} |x-a|^{n+1}$$ where $|f^{(n+1)}(t)| \leq M$ for all $t$ between $a$ and $x$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot sin(x) and its 5th-degree Taylor polynomial. Shade the region between the polynomial plus/minus the error bound calculated from M=1. Show how the bound shrinks as n increases. Interactive slider for n from 1 to 9.

*Interactive Controls:*
  - 🎛 Slider for n from 1 to 9

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider; x=np.linspace(-3,3,400); f=np.sin(x); fig,ax=plt.subplots(); ax.plot(x,f,'k',label='sin(x)'); poly,=ax.plot([],[],'r',lw=2,label='T_n'); bound_plus,=ax.plot([],[],'r--',alpha=0.3); bound_minus,=ax.plot([],[],'r--',alpha=0.3); ax.fill_between([],[],[],alpha=0.1,color='r',label='error bound'); ax.legend(); ax.set_ylim(-2,2); def taylor_sin(n): s=np.zeros_like(x); for k in range((n+1)//2+1): idx=2*k+1; coeff=(-1)**k/np.math.factorial(idx); s+=coeff*x**idx; return s; def update(val): n=int(val); y=taylor_sin(n); poly.set_data(x,y); M=1; err=M*np.abs(x)**(n+1)/np.math.factorial(n+1); bound_plus.set_data(x,y+err); bound_minus.set_data(x,y-err); ax.collections.clear(); ax.fill_between(x,y-err,y+err,alpha=0.1,color='r'); fig.canvas.draw_idle(); slider=Slider(plt.axes([0.2,0.02,0.6,0.03]),'n',1,9,valinit=5,valstep=2); slider.on_changed(update); update(5); plt.show()
```

**Teacher Narration** `[71w]`
> To know how accurate our polynomial approximation is, we use Taylor's Inequality. It bounds the absolute error by the next term's magnitude, but with the derivative replaced by its maximum value between center and the point of interest. For sine and cosine, the derivatives are always bounded by 1, making the bound especially simple. This inequality is crucial because it tells us how many terms we need for a desired accuracy.

---

### Slide 6 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Example: sin(x) Maclaurin Series + Proof**  ·  `full_width`

**On-screen text** `[10w]`
sin(x) = ∑ (-1)^k x^{2k+1} / (2k+1)! for all x.

**FULL WIDTH** `[steps]`

| Step | Result |
|------|--------|
| 1 | Derivatives cycle: sin, cos, -sin, -cos |
| 2 | At 0: 0,1,0,-1,0,… |
| 3 | Series: x - x³/3! + x⁵/5! - x⁷/7! + … |
| 4 | Bound on remainder using M=1 |
| 5 | |R_n| ≤ (|x|^{n+1})/(n+1)! → 0 |
| 6 | Therefore sin(x) equals its series for all x |

**Teacher Narration** `[70w]`
> Now we work through a classic example: the Maclaurin series for sine. The derivatives cycle every four steps. At zero we get a pattern of 0,1,0,-1. Only odd powers survive, alternating signs. With M=1, Taylor's Inequality shows the remainder tends to zero for any fixed x because factorial dominates powers. So the series equals sine everywhere. This is a fundamental series that appears in many applications, from physics to engineering.

**Student Prompt:** Pause and verify the pattern of derivatives for sin(x) at x=0 up to the 5th derivative.

---

### Slide 7 · [VISUAL_LAB] 🎛 *[2 controls]*
**Visualizing Taylor Polynomials for sin(x)**  ·  `split_left_right`

**On-screen text** `[8w]`
Higher-degree polynomials match sine over a wider interval.

**LEFT** `[text]`

Use the sliders to control the degree n and zoom level. Observe how the polynomial matches sine better near the center as n increases.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot sin(x) (black solid) and Taylor polynomial of user-chosen degree n (colored dashed). Two sliders: one for n (0 to 15, step 1), one for x-axis range (from 0.5π to 4π). The polynomial is computed using the Maclaurin series. Show the error (absolute difference) as a shaded area or as a second plot below. Update on slider change.

*Interactive Controls:*
  - 🎛 Slider for n from 0 to 15
  - 🎛 Slider for x-axis zoom (range 0.5π to 4π)

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider; x_full = np.linspace(-4*np.pi, 4*np.pi, 1600); f = np.sin(x_full); fig, (ax1, ax2) = plt.subplots(2,1,figsize=(8,8), gridspec_kw={'height_ratios':[3,1]}); ax1.plot(x_full, f, 'k', lw=2, label='sin(x)'); poly_line, = ax1.plot([], [], 'r--', lw=2, label='T_n'); ax1.legend(); ax1.set_ylim(-2,2); ax1.grid(True); error_line, = ax2.plot([], [], 'g-', lw=1, label='Error'); ax2.set_ylim(0,2); ax2.set_xlabel('$x$'); ax2.set_ylabel('|sin(x) - T_n(x)|'); ax2.grid(True); fig.subplots_adjust(bottom=0.2); def taylor_sin(n): s=np.zeros_like(x_full); for k in range((n+1)//2+1): idx=2*k+1; coeff=(-1)**k/np.math.factorial(idx); s += coeff * x_full**idx; return s; def update(val): n=int(val); y = taylor_sin(n); poly_line.set_data(x_full, y); err = np.abs(f - y); error_line.set_data(x_full, err); ax2.relim(); ax2.autoscale_view(); fig.canvas.draw_idle(); ax_n = plt.axes([0.2, 0.05, 0.6, 0.03]); slider_n = Slider(ax_n, 'n', 0, 15, valinit=5, valstep=1); slider_n.on_changed(update); update(5); plt.show()
```

**Teacher Narration** `[64w]`
> Here's an interactive visualisation. The top panel shows sine in black and its Taylor polynomial in red. Use the top slider to increase the polynomial degree. Watch how the red curve hugs the black curve over a larger region. The bottom panel shows the absolute error – notice it shrinks dramatically as you increase n. The second slider lets you adjust the viewing window.

---

### Slide 8 · [PRACTICE]
**Edge Case: cos(x) by Differentiating sin(x) Series**  ·  `split_left_right`

**On-screen text** `[7w]`
Differentiate series term-by-term; simplify n/n! = 1/(n-1)!.

**LEFT** `[steps]`

1. Start: sin(x) = x - x³/3! + x⁵/5! - …
2. Differentiate term-by-term:
   d/dx sin(x) = 1 - (3x²)/3! + (5x⁴)/5! - …
3. Simplify: 3/3! = 1/2!, 5/5! = 1/4!
4. Result: cos(x) = 1 - x²/2! + x⁴/4! - …

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot cos(x) (black) and its Maclaurin series (red dashed, degree 10) on [-2π,2π]. Also plot the derivative of the sin series (blue dotted) – they should coincide. Highlight the cancellation of factorial in simplification.

```python
import numpy as np; import matplotlib.pyplot as plt; x=np.linspace(-2*np.pi,2*np.pi,600); f=np.cos(x); # cos series up to 10: 1 - x^2/2! + x^4/4! - ... s=np.zeros_like(x); for k in range(6): s += (-1)**k * x**(2*k)/np.math.factorial(2*k); plt.plot(x,f,'k',label='cos(x)'); plt.plot(x,s,'r--',label='Maclaurin (10 terms)'); plt.legend(); plt.grid(); plt.show()
```

**Teacher Narration** `[78w]`
> A powerful trick: if you already know the series for sine, you can differentiate it to get the cosine series. The derivative of x^n is n x^{n-1}. But note the cancellation: n divided by n! equals 1 over (n-1)!. This yields the familiar cosine series with only even powers. This method is often faster than computing derivatives from scratch. It also illustrates how term-by-term differentiation of a power series works, which is a key property of analytic functions.

---

### Slide 9 · [PRACTICE] 🟡
**Application: ∫ e^{-x²} dx (Impossible Integral)**  ·  `full_width`

**On-screen text** `[12w]`
Integral of e^{-x²} from 0 to 1 approximated by series ≈ 0.747.

**FULL WIDTH** `[steps]`

| Step | Result |
|------|--------|
| 1 | Use e^u = ∑ u^n/n! with u = -x² | e^{-x²} = ∑ (-1)^n x^{2n}/n! |
| 2 | Integrate term-by-term on [0,1] | ∫_0^1 x^{2n} dx = 1/(2n+1) |
| 3 | Series: ∑ (-1)^n / [n!(2n+1)] | Alternating |
| 4 | Sum first 5 terms | ≈ 0.7475 |
| 5 | Error bound: next term < 0.001 | So the error is less than 0.001 |

**Teacher Narration** `[67w]`
> Here we see a major application: the function e to the minus x squared has no elementary antiderivative, but we can evaluate its definite integral using series. Substituting u = -x² into the exponential series gives an alternating series. After integrating term by term, we sum the first few terms to get a numerical approximation. The alternating series remainder bound guarantees our accuracy to three decimal places.

---

### Slide 10 · [MISCONCEPTION] 🟡
**When Series Fail: The Flat Function**  ·  `split_left_right`

**On-screen text** `[11w]`
All derivatives zero ≠ function zero! The remainder does not vanish.

**LEFT** `[steps]`

**Wrong intuition:** If all derivatives exist, the function equals its Taylor series.

**Counterexample:** f(x) = e^{-1/x²} for x≠0, f(0)=0.
- f^{(n)}(0) = 0 for all n (proved by showing the limit of the difference quotient exists and equals 0 for each n)
- Maclaurin series: 0 + 0x + 0x² + … = 0
- But f(x) > 0 for x≠0
- Series converges to wrong value!

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x)=e^{-1/x²} for x near zero (e.g., [-2,2]) but with a tiny vertical scale to show the nonzero bump. Use logarithmic scale on y? Or just show that the function is extremely flat near 0 but nonzero. Plot the constant zero series as a horizontal line.

```python
import numpy as np; import matplotlib.pyplot as plt; def f(x): return np.exp(-1/x**2) if x!=0 else 0; x = np.linspace(-2,2,1000); y = np.array([f(xi) for xi in x]); plt.plot(x,y,'b',label='f(x)'); plt.axhline(0,color='r',linestyle='--',label='Maclaurin series (0)'); plt.legend(); plt.ylim(-0.1,1.1); plt.grid(); plt.show()
```

**Teacher Narration** `[73w]`
> Here's a warning: having all derivatives is not enough. The function e to the minus one over x squared, completed to zero at the origin, has every derivative at zero equal to zero. Its Maclaurin series is identically zero, yet the function itself is positive for any nonzero x. The series converges to the wrong function because the remainder never goes to zero. This is why we need Taylor's Inequality to prove equality.

---

### Slide 11 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Try It: Maclaurin Series for cos(2x)**  ·  `split_left_right`

**On-screen text** `[8w]`
Write the series for cos(2x). Use substitution u=2x.

**LEFT** `[text]`

**Task:** Find the Maclaurin series for cos(2x).

**Hint:** Start with the known series for cos(u) and substitute u=2x.

**RIGHT** `[visual_spec]`

*Visual Spec:* Initially show a question mark. After clicking 'Reveal answer', display the series: ∑_{n=0}^∞ (-1)^n 2^{2n} x^{2n} / (2n)!. Also show the first few expanded terms.

*Interactive Controls:*
  - 🎛 Button: Reveal answer

```python
import matplotlib.pyplot as plt; from matplotlib.widgets import Button; fig, ax = plt.subplots(); ax.text(0.5,0.5,'?',ha='center',va='center',fontsize=48); ax.axis('off'); def reveal(event): ax.clear(); ax.text(0.5,0.5,'$\sum_{n=0}^\infty \frac{(-1)^n 2^{2n} x^{2n}}{(2n)!}$',ha='center',va='center',fontsize=20,transform=ax.transAxes); ax.axis('off'); fig.canvas.draw_idle(); ax_button = plt.axes([0.4,0.05,0.2,0.075]); btn = Button(ax_button, 'Reveal answer'); btn.on_clicked(reveal); plt.show()
```

**Teacher Narration** `[57w ⚠️ **TOO SHORT: 57w < 60w min**]`
> Pause the video now and try this yourself. Start with the Maclaurin series for cos(u), which you might remember or we can derive quickly. Then substitute u equals 2x. Simplify the powers and factorial. When you're ready, click the button to check your answer. This substitution method is a common technique for finding series of composite functions.

**Student Prompt:** Write the Maclaurin series for cos(2x) using substitution.

---

### Slide 12 · [PRACTICE]
**Solution: cos(2x) Maclaurin Series**  ·  `full_width`

**On-screen text** `[8w]`
cos(2x) = ∑_{n=0}∞ (-1)^n 2^{2n} x^{2n} / (2n)!

**FULL WIDTH** `[steps]`

| Step | Result |
|------|--------|
| 1 | cos(u) = ∑ (-1)^n u^{2n} / (2n)! |
| 2 | Substitute u = 2x | cos(2x) = ∑ (-1)^n (2x)^{2n} / (2n)! |
| 3 | Simplify (2x)^{2n} = 2^{2n} x^{2n} | cos(2x) = ∑ (-1)^n 2^{2n} x^{2n} / (2n)! |
| 4 | First three terms | 1 - (4x²)/2! + (16x⁴)/4! - … = 1 - 2x² + (2x⁴)/3 - … |

**Teacher Narration** `[77w]`
> Here is the complete solution. Starting from the standard series for cosine, we substitute u equals 2x. The key is to square the factor (2x) to the 2n, giving 2 to the 2n times x to the 2n. Notice that the coefficient 2 to the 2n can also be written as 4 to the n, but we keep it as powers of 2 for clarity. This series converges for all x because the original cosine series does.

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] When Does a Function Equal Its Taylor Series?**  ·  `split_left_right`

**On-screen text** `[11w]`
Analytic ⇔ remainder → 0. Not all smooth functions are analytic.

**LEFT** `[concept]`

A function is **analytic** at a if its Taylor series converges to f(x) in some open interval around a.
- Polynomials, e^x, sin, cos are analytic everywhere.
- The function e^{-1/x²} is not analytic at 0.

**Key condition:** The remainder R_n(x) must tend to 0 as n→∞ for all x in the interval.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two side-by-side plots: left shows sin(x) with Taylor polynomials converging; right shows flat function with Taylor polynomial stuck at zero. Animate increasing degree for both. Show that the flat function never catches up.

*Interactive Controls:*
  - 🎛 Slider for degree n from 0 to 15

```python
import numpy as np; import matplotlib.pyplot as plt; from matplotlib.widgets import Slider; x = np.linspace(-2,2,400); f_analytic = np.sin(x); def f_flat(x): return np.exp(-1/x**2) if x!=0 else 0; f_non = np.vectorize(f_flat)(x); fig, (ax1, ax2) = plt.subplots(1,2,figsize=(10,4)); ax1.plot(x,f_analytic,'k',label='sin(x)'); poly1,=ax1.plot([],[],'r--',label='T_n'); ax1.set_ylim(-1.5,1.5); ax1.legend(); ax1.set_title('Analytic at 0'); ax2.plot(x,f_non,'k',label='e^{-1/x^2}'); poly2,=ax2.plot([],[],'r--',label='T_n=0'); ax2.set_ylim(-0.1,1.1); ax2.legend(); ax2.set_title('Not analytic at 0'); def update(n): n=int(n); y1=np.zeros_like(x); for k in range((n+1)//2+1): idx=2*k+1; y1+=(-1)**k*x**idx/np.math.factorial(idx); poly1.set_data(x,y1); poly2.set_data(x,np.zeros_like(x)); fig.canvas.draw_idle(); slider = Slider(plt.axes([0.2,0.02,0.6,0.03]),'n',0,15,valinit=3,valstep=1); slider.on_changed(update); update(3); plt.show()
```

**Teacher Narration** `[79w]`
> For advanced students, here is the deeper story. A function is called analytic at a point if its Taylor series not only converges, but actually equals the function in some interval. All the common functions like exponentials, sine and cosine are analytic everywhere. But the flat function we saw earlier is smooth yet not analytic at zero – its series sum is zero but the function is not. The deciding factor is whether the remainder term goes to zero.

---

### Slide 14 · [SUMMARY]
**Summary: Key Takeaways**  ·  `full_width`

**On-screen text** `[16w]`
Taylor series: blueprint of a function. Use derivatives at one point to build an infinite polynomial.

**FULL WIDTH** `[text]`

**Formulas to remember:**
- Taylor series: ∑ f^{(n)}(a)/n! (x-a)^n
- Maclaurin (a=0): ∑ f^{(n)}(0)/n! x^n
- Taylor's Inequality: |R_n| ≤ M/(n+1)! |x-a|^{n+1}

**Common series:**
- e^x = ∑ x^n/n!
- sin(x) = ∑ (-1)^k x^{2k+1}/(2k+1)!
- cos(x) = ∑ (-1)^k x^{2k}/(2k)!

**Beware:** Not every smooth function equals its Taylor series!

**Teacher Narration** `[78w]`
> Let's wrap up. Today you learned the Taylor and Maclaurin series formulas, how to compute them for elementary functions, and how to determine their radius of convergence using the Ratio Test. You also saw a powerful application: evaluating impossible integrals by turning them into series. Finally, you learned that not every smooth function is analytic – the remainder must vanish. Keep these key series in mind: exponentials and trig functions. They are the building blocks for many others.

---
