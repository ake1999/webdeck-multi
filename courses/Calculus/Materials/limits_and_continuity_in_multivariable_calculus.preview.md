# Limits and Continuity in Multivariable Calculus

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You should be comfortable with single-variable limits including the Squeeze Theorem and epsilon-delta definition.

**Learning Objectives:**
- Calculate limits using direct substitution, limit laws, and the Squeeze Theorem
- Interpret the epsilon-delta definition for functions of two variables
- Determine when a limit does not exist by testing multiple paths
- Analyze continuity of multivariable functions including piecewise definitions

---

## v3.1 Production Readiness

✅ **Interactive moments:** 15 / 3 required
⚠️ **Narration overlong  (>120w):** [7, 11, 12]  (avg 102w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 15 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
✅ **visual_specs**: all split slides have visual_spec
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 15 interactive moment(s) (min 3)
⚠️ **narration_overlong**: too long: ['s7:122w', 's11:123w', 's12:134w']
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | 🎛hook | 🟢 | ◧ | ⏸️ | 106w | 12w | The Infinite Path Problem |
| 2 | 🎛core | 🟢 | ◧ |  | 86w | 13w | Definition of a Limit (Intuitive) |
| 3 | 🎛visual_lab | 🟢 | ◧ |  | 101w | 23w | Epsilon-Delta: The Rigorous Definition |
| 4 | 🎛core | 🟢 | ◧ |  | 85w | 15w | Limit Laws for Multivariable Functions |
| 5 | 🎛practice | 🟢 | ◧ |  | 79w | 15w | Warm-Up Example: Direct Substitution |
| 6 | 🎛practice | 🟢 | ◧ | ⏸️ | 109w | 13w | Standard Example: Showing a Limit Does Not Exist |
| 7 | 🎛misconception | 🟡 | ◧ |  | 122w⚠️ | 18w | Misconception: Two Paths Are Not Enough to Prove Existence |
| 8 | 🎛core | 🟢 | ◧ |  | 103w | 23w | The Squeeze Theorem for Multivariable Functions |
| 9 | 🎛visual_lab | 🟢 | ◧ |  | 105w | 19w | Squeeze Theorem Interactive Lab |
| 10 | 🎛practice | 🟡 | ◧ |  | 114w | 20w | Tricky Example: Piecewise Continuity |
| 11 | 🎛practice | 🟡 | ◧ |  | 123w⚠️ | 16w | Application: Using Limit Laws |
| 12 | 🎛challenge | 🔴 | ⬛⬛ |  | 134w⚠️ | 17w | [Challenge – Optional] Proof: Different Paths ⇒ Limit DNE |
| 13 | 🎛pause_and_try | 🟡 | ◧ | ⏸️ | 60w | 14w | Pause and Predict: Does This Limit Exist? |
| 14 | 🎛core | 🟢 | ◧ |  | 96w | 19w | Answer: Limit Does Not Exist |
| 15 | 🎛summary | 🟢 | ⬛⬛ |  | 105w | 12w | Summary and Key Takeaways |

---

### Slide 1 · [HOOK] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**The Infinite Path Problem**  ·  `split_left_right`

**On-screen text** `[12w]`
Infinitely many paths. Limit exists only if all converge to same value.

**LEFT** `[text]`

In single-variable calculus, a limit approaches from two directions. Here, infinitely many paths in the plane approach a point. For the limit to exist, **all** paths must give the same value.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the surface f(x,y) = xy/(x^2+y^2) on domain x∈[-2,2], y∈[-2,2] (avoid origin near). Add two parametric curves: γ1(t)=(t,0) and γ2(t)=(t,t). Color surface coolwarm, curves red and blue. Show that along γ1 the function stays 0, along γ2 it approaches 0.5. Include a legend and labels.

*Interactive Controls:*
  - 🎛 Slider: path slope m from -5 to 5 updates the second curve y=mx

```python
import numpy as np; import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; fig = plt.figure(); ax = fig.add_subplot(111, projection='3d'); x = np.linspace(-2,2,150); y = np.linspace(-2,2,150); X,Y = np.meshgrid(x,y); Z = X*Y/(X**2+Y**2+1e-10); Z[np.abs(X)<1e-6] = np.nan; Z[np.abs(Y)<1e-6] = np.nan; ax.plot_surface(X,Y,Z, cmap='coolwarm', alpha=0.7); t = np.linspace(-2,2,100); ax.plot(t, np.zeros_like(t), np.zeros_like(t), color='red', lw=3, label='y=0 (limit 0)'); ax.plot(t, t, t**2/(2*t**2+1e-10), color='blue', lw=3, label='y=x (limit 0.5)'); ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z'); ax.set_title('Different paths → different limits'); ax.legend(); plt.show()
```

**Teacher Narration** `[106w]`
> Welcome. In single-variable calculus, you only had to worry about approaching a point from the left or the right. Here, as you approach a point in the plane, you have infinitely many directions to come from: along lines, curves, any path you can draw. For the limit to exist, the function must approach the same number no matter which path you take. Look at this surface: along the red path the function stays at zero, but along the blue path it climbs to one half. This means the limit at the origin does not exist. Throughout this lesson, we'll build tools to handle this new challenge.

**Student Prompt:** What do you think the limit is along the curve y = x²? Try to guess before we move on.

---

### Slide 2 · [CORE] 🎛 *[1 controls]*
**Definition of a Limit (Intuitive)**  ·  `split_left_right`

**On-screen text** `[13w]`
The limit L must be the same along every possible path approaching (a,b).

**LEFT** `[formula_block]`

$$\lim_{(x,y)\to (a,b)} f(x,y) = L$$
means: as $(x,y)$ gets arbitrarily close to $(a,b)$ along *any* path in the domain, $f(x,y)$ gets arbitrarily close to $L$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a 2D coordinate plane with point (a,b) marked red. Draw 5 different paths (straight lines from different directions, a spiral, a parabola) all ending at (a,b). For each path show a small arrow indicating direction. Put text labels: 'along each path, f→L'. Use matplotlib with arrows and dashed curves.

*Interactive Controls:*
  - 🎛 Button: highlight a random path and show its limit value

```python
import matplotlib.pyplot as plt; fig, ax = plt.subplots(); ax.scatter(0,0, color='red', s=100, label='(a,b)'); t = np.linspace(0,1,100); # paths: ax.plot(t,0.5*t, label='line 1'); ax.plot(-t,0.8*t, label='line 2'); ax.plot(0.3*t, -t, label='line 3'); ax.plot(t*np.cos(t*10), t*np.sin(t*10), label='spiral'); ax.plot(t, t**2, label='parabola'); ax.set_xlim(-1,1); ax.set_ylim(-1,1); ax.legend(); ax.set_aspect('equal'); plt.show()
```

**Teacher Narration** `[86w]`
> Let's formalize the intuition. The notation lim as (x,y) approaches (a,b) of f(x,y) equals L means that no matter which way you travel toward the point (a,b)—whether along a straight line, a parabola, or a spiral—the function values get closer and closer to a single number L. This is the fundamental idea. In the diagram, each colored path represents a different direction, and they all must lead to the same destination L. If even one path gives a different limit, the overall limit does not exist.

---

### Slide 3 · [VISUAL_LAB] 🎛 *[2 controls]*
**Epsilon-Delta: The Rigorous Definition**  ·  `split_left_right`

**On-screen text** `[23w]`
For any epsilon, we can find a delta such that all points within delta of (a,b) map to values within epsilon of L.

**LEFT** `[formula_block]`

$$\forall \varepsilon > 0, \exists \delta > 0 \text{ such that }\\ 0 < \sqrt{(x-a)^2+(y-b)^2} < \delta \;\Longrightarrow\; |f(x,y)-L| < \varepsilon$$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of f(x,y)=x^2+y^2 on [-2,2]^2. Plot surface. Add horizontal plane at z = L+ε and L-ε (orange) for the epsilon band. In the xy-plane, draw a δ-disk (blue circle) centered at (a,b). Use sliders for ε (range 0.1 to 1.0) and δ (range 0.1 to 1.0). When ε changes, recompute δ so that all points inside δ-disk map into ε-band (for this function, δ = sqrt(ε) because f is x^2+y^2 and L=0). Animate: highlight the disk and band. User can adjust ε and see the required δ update automatically.

*Interactive Controls:*
  - 🎛 Slider: epsilon from 0.1 to 1.0
  - 🎛 Slider: delta from 0.1 to 1.0 (manual override)

```python
import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; from matplotlib.widgets import Slider; import numpy as np; fig = plt.figure(figsize=(10,8)); ax = fig.add_subplot(111, projection='3d'); x = np.linspace(-2,2,200); y = np.linspace(-2,2,200); X,Y = np.meshgrid(x,y); Z = X**2+Y**2; surf = ax.plot_surface(X,Y,Z, alpha=0.5, cmap='viridis'); epsilon = 0.5; z_band = epsilon*np.ones_like(X); band = ax.plot_surface(X,Y,z_band, alpha=0.2, color='orange'); delta = np.sqrt(epsilon); theta = np.linspace(0,2*np.pi,100); x_disk = delta*np.cos(theta); y_disk = delta*np.sin(theta); z_disk = np.zeros_like(x_disk); disk_line, = ax.plot(x_disk, y_disk, z_disk, 'b-', lw=2); ax.set_xlim(-2,2); ax.set_ylim(-2,2); ax.set_zlim(0,4); ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z = f(x,y)'); ax_slider = plt.axes([0.2, 0.02, 0.6, 0.03]); slider = Slider(ax_slider, 'epsilon', 0.1, 1.0, valinit=0.5); def update(val): global epsilon; epsilon = val; z_band = epsilon*np.ones_like(X); band.remove(); band = ax.plot_surface(X,Y,z_band, alpha=0.2, color='orange'); delta = np.sqrt(epsilon); x_disk = delta*np.cos(theta); y_disk = delta*np.sin(theta); disk_line.set_data(x_disk, y_disk); disk_line.set_3d_properties(np.zeros_like(x_disk)); fig.canvas.draw_idle(); slider.on_changed(update); plt.show()
```

**Teacher Narration** `[101w]`
> The formal definition goes like this: for any desired closeness epsilon (how close you want the function values to be to the limit), we need to find a delta (a radius around the point in the domain) such that every point within that delta—except the point itself—gives a function value within epsilon of L. In this interactive demo, you control epsilon. As you increase epsilon, the orange band gets thicker, and the required delta—computed here as the square root of epsilon—grows. Try it yourself and see how the blue disk expands to guarantee all those points land inside the epsilon band.

**Student Prompt:** What happens to delta if you cut epsilon in half? Does it shrink by half or less?

---

### Slide 4 · [CORE] 🎛 *[1 controls]*
**Limit Laws for Multivariable Functions**  ·  `split_left_right`

**On-screen text** `[15w]`
All the familiar limit laws from single-variable calculus extend naturally to two (or more) variables.

**LEFT** `[formula_block]`

If $\lim f$ and $\lim g$ exist, then:
- $\lim (f\pm g) = \lim f \pm \lim g$
- $\lim (f\cdot g) = \lim f \cdot \lim g$
- $\lim \frac{f}{g} = \frac{\lim f}{\lim g}$ (if $\lim g \neq 0$)

**RIGHT** `[visual_spec]`

*Visual Spec:* Create a flowchart using matplotlib patches: two rounded boxes labeled 'lim f = A' and 'lim g = B' with arrows pointing to three operation boxes: 'sum', 'product', 'quotient', each outputting 'A+B', 'AB', 'A/B' respectively. Use black text on white background.

*Interactive Controls:*
  - 🎛 Button: click to show an example calculation for each law

```python
import matplotlib.pyplot as plt; import matplotlib.patches as mpatches; fig, ax = plt.subplots(figsize=(6,4)); ax.axis('off'); # draw boxes: b1 = mpatches.FancyBboxPatch((0.1,0.7), 0.3,0.2, boxstyle='round', edgecolor='black', facecolor='lightblue'); ax.add_patch(b1); ax.text(0.25,0.8, 'lim f = A', ha='center'); b2 = mpatches.FancyBboxPatch((0.1,0.1), 0.3,0.2, boxstyle='round', edgecolor='black', facecolor='lightgreen'); ax.add_patch(b2); ax.text(0.25,0.2, 'lim g = B', ha='center'); # arrows: ax.annotate('', xy=(0.5,0.8), xytext=(0.4,0.8), arrowprops=dict(arrowstyle='->')); ax.annotate('', xy=(0.5,0.2), xytext=(0.4,0.2), arrowprops=dict(arrowstyle='->')); # operation boxes: ops = ['A+B','A·B','A/B']; colors=['#ff9999','#99ff99','#9999ff']; for i,op in enumerate(ops): y = 0.35 + i*0.2; rect = mpatches.FancyBboxPatch((0.55, y-0.08), 0.3,0.16, boxstyle='round', edgecolor='black', facecolor=colors[i]); ax.add_patch(rect); ax.text(0.7, y, op, ha='center'); ax.plot([0.4,0.55], [0.8,0.35+0.2*0], 'k-'); ax.plot([0.4,0.55], [0.2,0.35+0.2*1], 'k-'); ax.plot([0.4,0.55], [0.2,0.35+0.2*2], 'k-'); plt.show()
```

**Teacher Narration** `[85w]`
> Good news: the limit laws you already know for single-variable functions work exactly the same way here, provided the individual limits exist. The limit of a sum is the sum of the limits, the limit of a product is the product of the limits, and for quotients, we just need the denominator's limit to be nonzero. This means we can break complicated multivariable limits into simpler pieces, compute each part, and combine the results. Let's see a quick example of how to use these laws.

---

### Slide 5 · [PRACTICE] 🎛 *[1 controls]*
**Warm-Up Example: Direct Substitution**  ·  `split_left_right`

**On-screen text** `[15w]`
Polynomials are continuous everywhere. Direct substitution works when the function is continuous at the point.

**LEFT** `[steps]`

**Problem:** $\lim_{(x,y)\to (2,3)} (x^2 + 2xy - y)$

1. Recognize polynomial → continuous on $\mathbb{R}^2$
2. Direct substitution: $x=2, y=3$
3. Compute: $2^2 + 2(2)(3) - 3 = 4 + 12 - 3 = 13$

**RIGHT** `[visual_spec]`

*Visual Spec:* Generate a contour plot of f(x,y)=x^2+2xy-y on x∈[0,4], y∈[1,5]. Mark the point (2,3) with a red dot and label '13'. Use contour levels that show increasing value toward that point. Add colorbar.

*Interactive Controls:*
  - 🎛 Slider: change the point (a,b) and see the computed limit update

```python
import numpy as np; import matplotlib.pyplot as plt; x = np.linspace(0,4,100); y = np.linspace(1,5,100); X,Y = np.meshgrid(x,y); Z = X**2 + 2*X*Y - Y; fig,ax = plt.subplots(); cf = ax.contourf(X,Y,Z, levels=20, cmap='viridis'); ax.scatter(2,3, color='red', s=100, label='(2,3)'); ax.annotate('13', xy=(2,3), xytext=(2.5,3.5), arrowprops=dict(arrowstyle='->')); ax.set_xlabel('x'); ax.set_ylabel('y'); plt.colorbar(cf); ax.legend(); plt.show()
```

**Teacher Narration** `[79w]`
> Let's start with the simplest case. We want the limit of this polynomial as (x,y) approaches (2,3). Since polynomials are continuous everywhere, we can simply plug in the coordinates. That gives 4 plus 12 minus 3 equals 13. No need for epsilon-delta or path analysis here. This is your warm-up: whenever you see a polynomial or a rational function where the denominator is not zero at the point, just substitute. The limit equals the function value at that point.

---

### Slide 6 · [PRACTICE] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Standard Example: Showing a Limit Does Not Exist**  ·  `split_left_right`

**On-screen text** `[13w]`
If two different paths give different limits, the overall limit does not exist.

**LEFT** `[steps]`

**Problem:** Show $\lim_{(x,y)\to(0,0)}\frac{xy}{x^2+y^2}$ DNE.

- Along $y=0$: $\frac{x\cdot0}{x^2+0}=0$
- Along $y=x$: $\frac{x^2}{x^2+x^2} = \frac{1}{2}$
- Two different values → limit DNE

**RIGHT** `[visual_spec]`

*Visual Spec:* Same plot as slide 1, but now also show the path y=2x etc. Use a slider to change the slope m of the second line y=mx and show the resulting limit value m/(1+m^2). Highlight the surface and the curve.

*Interactive Controls:*
  - 🎛 Slider: slope m from -5 to 5

```python
import numpy as np; import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; from matplotlib.widgets import Slider; fig = plt.figure(); ax = fig.add_subplot(111, projection='3d'); x = np.linspace(-2,2,150); y = np.linspace(-2,2,150); X,Y = np.meshgrid(x,y); Z = X*Y/(X**2+Y**2+1e-10); Z[np.abs(X)<1e-6] = np.nan; Z[np.abs(Y)<1e-6] = np.nan; surf = ax.plot_surface(X,Y,Z, cmap='coolwarm', alpha=0.7); m = 1; t = np.linspace(-2,2,100); line, = ax.plot(t, m*t, m*t**2/((1+m**2)*t**2+1e-10), 'r-', lw=3); ax.set_xlim(-2,2); ax.set_ylim(-2,2); ax.set_zlim(-1,1); ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z'); ax_slider = plt.axes([0.2,0.02,0.6,0.03]); slider = Slider(ax_slider, 'slope m', -5, 5, valinit=1); def update(val): m = slider.val; t = np.linspace(-2,2,100); line.set_data(t, m*t); line.set_3d_properties(m*t**2/((1+m**2)*t**2+1e-10)); fig.canvas.draw_idle(); slider.on_changed(update); plt.show()
```

**Teacher Narration** `[109w]`
> Now for a classic example. We want the limit of f(x,y) equals xy over x-squared plus y-squared as we approach the origin. Let's test paths. Along the x-axis, y equals 0, the function is 0, so the limit along that path is 0. Along the line y equals x, the function simplifies to x-squared over 2x-squared, which approaches one half. Since we found two paths that give different limits, the overall limit cannot exist. Use the slider to explore other line paths—you'll see that the limit depends on the slope, confirming the limit DNE. This is the standard technique to disprove a limit: find two paths with different results.

**Student Prompt:** Try y = x^2. What limit do you get along that parabola?

---

### Slide 7 · [MISCONCEPTION] 🟡 🎛 *[1 controls]*
**Misconception: Two Paths Are Not Enough to Prove Existence**  ·  `split_left_right`

**On-screen text** `[18w]`
Testing only linear paths is never enough to prove a limit exists. You must consider all possible curves.

**LEFT** `[text]`

**Common mistake:** Showing the limit is 0 along both the x-axis and y-axis does *not* prove the limit is 0. You must check *all* paths—including curves.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two 3D subplots. Left: f(x,y)=xy/(x^2+y^2) with paths y=0, x=0 giving 0, but y=x gives 0.5. Right: f(x,y)=x^2y/(x^2+y^2) with paths y=0, x=0, y=x all giving 0. Mark the origin. Use colors to distinguish paths.

*Interactive Controls:*
  - 🎛 Button: toggle between the two functions to compare path behavior

```python
import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; fig = plt.figure(figsize=(12,5)); # left ax1 = fig.add_subplot(121, projection='3d'); x = np.linspace(-1,1,100); y = np.linspace(-1,1,100); X,Y = np.meshgrid(x,y); Z1 = X*Y/(X**2+Y**2+1e-10); Z1[np.abs(X)<1e-6]=np.nan; Z1[np.abs(Y)<1e-6]=np.nan; ax1.plot_surface(X,Y,Z1, alpha=0.5, cmap='coolwarm'); t = np.linspace(-1,1,50); ax1.plot(t, np.zeros_like(t), np.zeros_like(t), 'r-', lw=2); ax1.plot(np.zeros_like(t), t, np.zeros_like(t), 'b-', lw=2); ax1.plot(t, t, t**2/(2*t**2+1e-10), 'g-', lw=2); ax1.set_title('Limit DNE: paths differ'); ax1.set_zlim(-1,1); # right ax2 = fig.add_subplot(122, projection='3d'); Z2 = X**2*Y/(X**2+Y**2+1e-10); Z2[np.abs(X)<1e-6]=np.nan; Z2[np.abs(Y)<1e-6]=np.nan; ax2.plot_surface(X,Y,Z2, alpha=0.5, cmap='coolwarm'); ax2.plot(t, np.zeros_like(t), np.zeros_like(t), 'r-', lw=2); ax2.plot(np.zeros_like(t), t, np.zeros_like(t), 'b-', lw=2); ax2.plot(t, t, t**3/(2*t**2+1e-10), 'g-', lw=2); ax2.set_title('Limit exists (0): all paths match'); ax2.set_zlim(-0.5,0.5); plt.tight_layout(); plt.show()
```

**Teacher Narration** `[122w ⚠️ **OVERLONG: 122w > 120w max**]`
> Here's a trap many students fall into. You check the x-axis, limit zero. Check the y-axis, limit zero. So you think the limit is zero. But as we just saw with xy over x-squared plus y-squared, the limit along y equals x is not zero. So the limit does not exist. On the right, I've shown a different function, x-squared y over x-squared plus y-squared. Here, all three paths give zero. Does that prove the limit is zero? Not yet—but in this case, it actually is zero. How can we be sure? We need a more powerful tool, like the Squeeze Theorem, which is coming next. Remember: disproving a limit requires only one counterexample path; proving a limit requires a universal argument.

**Student Prompt:** Can you think of a curve that might give a different limit for the function on the right? Try y = x^3.

---

### Slide 8 · [CORE] 🎛 *[1 controls]*
**The Squeeze Theorem for Multivariable Functions**  ·  `split_left_right`

**On-screen text** `[23w]`
If you can trap a function between two others that both approach the same limit, then your function must also approach that limit.

**LEFT** `[formula_block]`

If $g(x,y) \leq f(x,y) \leq h(x,y)$ near $(a,b)$ and $\lim g = \lim h = L$, then $\lim f = L$.

**RIGHT** `[visual_spec]`

*Visual Spec:* 2D plot with x-axis as distance from (a,b) along a radial direction, y-axis as function value. Draw three curves: lower bound g (blue), f (red), upper bound h (green). All three meet at the same point on the y-axis, representing the limit. Use a shaded region between g and h to show the squeeze.

*Interactive Controls:*
  - 🎛 Slider: adjust the squeeze bounds and see the effect on f

```python
import numpy as np; import matplotlib.pyplot as plt; r = np.linspace(0,2,100); L = 0; g = -r**2; h = r**2; f = r*np.sin(1/r) # example that squeezes; fig, ax = plt.subplots(); ax.plot(r, g, 'b-', label='g(r) = -r^2'); ax.plot(r, h, 'g-', label='h(r) = r^2'); ax.fill_between(r, g, h, alpha=0.2, color='gray'); ax.plot(r, f, 'r--', label='f(r) = r sin(1/r)'); ax.set_xlabel('distance from (a,b)'); ax.set_ylabel('function value'); ax.axhline(L, color='black', linestyle=':'); ax.legend(); plt.show()
```

**Teacher Narration** `[103w]`
> The Squeeze Theorem is your best friend when direct substitution gives an indeterminate form like 0 over 0, and you can't easily use limit laws. The idea is simple: if you can find a lower bound g and an upper bound h that both approach the same number L near your point, and your function f is sandwiched between them, then f must also approach L. In single-variable calculus, you used this with sine of one over x. In multivariable, the same principle works. The key is to find bounds that are easy to evaluate and that both go to the same limit.

---

### Slide 9 · [VISUAL_LAB] 🎛 *[2 controls]*
**Squeeze Theorem Interactive Lab**  ·  `split_left_right`

**On-screen text** `[19w]`
The function is trapped between -|x| and |x|, both of which go to 0. Therefore the limit is 0.

**LEFT** `[text]`

**Example:** $\displaystyle \lim_{(x,y)\to(0,0)} \frac{x^3}{x^2+y^2}$

Bound: $\left|\frac{x^3}{x^2+y^2}\right| = |x|\cdot\frac{x^2}{x^2+y^2} \leq |x|$

Since $|x|\to 0$, the squeeze gives limit = 0.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x,y)=x^3/(x^2+y^2+1e-10) on domain [-1,1]x[-1,1]. Add surfaces z=|x| (upper bound, transparent green) and z=-|x| (lower bound, transparent blue). Highlight that the function lies between them. Include a slider to rotate the view.

*Interactive Controls:*
  - 🎛 Slider: view angle (azimuth) from 0 to 360
  - 🎛 Toggle: show/hide bounding surfaces

```python
import numpy as np; import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; from matplotlib.widgets import Slider; fig = plt.figure(); ax = fig.add_subplot(111, projection='3d'); x = np.linspace(-1,1,100); y = np.linspace(-1,1,100); X,Y = np.meshgrid(x,y); Z = X**3/(X**2+Y**2+1e-10); Z_upper = np.abs(X); Z_lower = -np.abs(X); surf_f = ax.plot_surface(X,Y,Z, cmap='coolwarm', alpha=0.7); surf_u = ax.plot_surface(X,Y,Z_upper, alpha=0.2, color='green'); surf_l = ax.plot_surface(X,Y,Z_lower, alpha=0.2, color='blue'); ax.set_zlim(-1,1); ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z'); # slider for rotation angle ax_angle = plt.axes([0.2,0.02,0.6,0.03]); slider_angle = Slider(ax_angle, 'view angle', 0, 360, valinit=30); def update(angle): ax.view_init(elev=20, azim=angle); fig.canvas.draw_idle(); slider_angle.on_changed(update); plt.show()
```

**Teacher Narration** `[105w]`
> Let's apply the Squeeze Theorem to a concrete function: x-cubed over x-squared plus y-squared. We notice that x-squared over x-squared plus y-squared is always between 0 and 1. So the absolute value of our function is at most the absolute value of x. And as x goes to 0, the bound goes to 0. Hence the limit is 0. In the 3D visualization, you can see the function surface in color, squeezed between the green upper bound and the blue lower bound. Both bounds approach zero at the origin, forcing the function to do the same. Rotate the view to see this from any angle.

---

### Slide 10 · [PRACTICE] 🟡 🎛 *[1 controls]*
**Tricky Example: Piecewise Continuity**  ·  `split_left_right`

**On-screen text** `[20w]`
To check continuity: does the limit equal the function value at the point? If yes, the function is continuous there.

**LEFT** `[steps]`

**Problem:** Is $f(x,y)=\begin{cases} \frac{x^2y}{x^2+y^2}, & (x,y)\neq(0,0) \\ 0, & (x,y)=(0,0) \end{cases}$ continuous at $(0,0)$?

1. Compute limit at $(0,0)$ via squeeze: $\left|\frac{x^2y}{x^2+y^2}\right|\leq |y|$
2. $\lim |y| = 0$, so $\lim f = 0$
3. $f(0,0)=0$, so limit equals value → continuous.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot f(x,y)=x^2y/(x^2+y^2) for (x,y)≠(0,0) with a hole, and add a red dot at (0,0,0). Show that the surface approaches that dot nicely.

*Interactive Controls:*
  - 🎛 Button: toggle the hole to see the surface fill in

```python
import numpy as np; import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; fig = plt.figure(); ax = fig.add_subplot(111, projection='3d'); x = np.linspace(-1,1,150); y = np.linspace(-1,1,150); X,Y = np.meshgrid(x,y); Z = X**2*Y/(X**2+Y**2+1e-10); near_center = (np.sqrt(X**2+Y**2)<0.1); Z[near_center] = np.nan; surf = ax.plot_surface(X,Y,Z, cmap='coolwarm', alpha=0.8); ax.scatter(0,0,0, color='red', s=100, label='f(0,0)=0'); ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z'); ax.set_title('Piecewise function – continuous at origin'); ax.legend(); plt.show()
```

**Teacher Narration** `[114w]`
> Now for a more subtle example. This function is defined piecewise: at the origin it's zero, elsewhere it's x-squared y over x-squared plus y-squared. To check continuity at the origin, we need to see if the limit as we approach the origin equals zero. Using the Squeeze Theorem, we bound the absolute value by the absolute value of y, which goes to zero. So the limit is indeed zero, matching the defined value. The function is continuous at the origin. In the 3D plot, you can see that the surface smoothly meets the red dot at zero. This example shows that even with piecewise definitions, continuity can be established with a simple squeeze estimate.

---

### Slide 11 · [PRACTICE] 🟡 🎛 *[1 controls]*
**Application: Using Limit Laws**  ·  `split_left_right`

**On-screen text** `[16w]`
When the denominator's limit is nonzero, use quotient law to combine limits of numerator and denominator.

**LEFT** `[steps]`

**Problem:** $\lim_{(x,y)\to(1,2)} \frac{x^2y + 3x}{x+1}$

1. Denominator limit: $\lim (x+1)=2 \neq 0$ → quotient law works.
2. Numerator limit: $\lim (x^2y) = 1^2\cdot2=2$, $\lim 3x=3$, sum=5.
3. Quotient: $\frac{5}{2}=2.5$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Contour plot of f(x,y)=(x^2y+3x)/(x+1) on domain [0,2]x[1,3]. Mark point (1,2) with label '2.5'. Use contour colors to show value around that point.

*Interactive Controls:*
  - 🎛 Slider: change the point (a,b) and see the computed limit update

```python
import numpy as np; import matplotlib.pyplot as plt; x = np.linspace(0,2,100); y = np.linspace(1,3,100); X,Y = np.meshgrid(x,y); Z = (X**2*Y + 3*X)/(X+1); fig,ax = plt.subplots(); cf = ax.contourf(X,Y,Z, levels=20, cmap='plasma'); ax.scatter(1,2, color='red', s=100); ax.annotate('2.5', xy=(1,2), xytext=(1.2,2.2), arrowprops=dict(arrowstyle='->')); ax.set_xlabel('x'); ax.set_ylabel('y'); plt.colorbar(cf); plt.show()
```

**Teacher Narration** `[123w ⚠️ **OVERLONG: 123w > 120w max**]`
> Here's a practical application where we combine several limit laws. We want the limit of a rational function as (x,y) approaches (1,2). First check the denominator: the limit of x plus 1 as x goes to 1 is 2, which is not zero. So we can apply the quotient law. Next, compute the numerator limit: use sum and product laws. The limit of x-squared y is 1 squared times 2 equals 2, and the limit of 3x is 3. So the numerator limit is 5. The quotient gives 5 over 2, or 2.5. Since all individual limits exist and denominator is nonzero, the limit exists and equals 2.5. This is typical of many practical limit calculations: just break it down law by law.

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Proof: Different Paths ⇒ Limit DNE**  ·  `full_width`

**On-screen text** `[17w]`
A rigorous proof that path divergence implies no limit. Understand the logic, but don't memorize every detail.

**FULL WIDTH** `[steps]`

**Theorem:** If along two paths the limits differ, then the overall limit does not exist.

Assume $\lim f = L$ exists. Then for any $\varepsilon>0$, $\exists \delta$ s.t. within $\delta$ of $(a,b)$, $|f-L|<\varepsilon$.

Path 1: $\lim_{path1} f = L_1$ → $\exists \delta_1$ s.t. along path1, $|f-L_1|<\varepsilon$.
Path 2: $\lim_{path2} f = L_2$ → $\exists \delta_2$ s.t. along path2, $|f-L_2|<\varepsilon$.

Take $\delta = \min(\delta_1,\delta_2)$, $\varepsilon = |L_1-L_2|/3$.
Choose points on each path within $\delta$.

Then $|L_1-L_2| \leq |L_1-f|+|f-L_2| < 2\varepsilon$ and also $|L_1-L_2| \leq |L_1-L|+|L-L_2| < 2\varepsilon$, but $2\varepsilon = \frac{2}{3}|L_1-L_2| < |L_1-L_2|$, contradiction. Hence no single $L$ can satisfy all paths.

**Teacher Narration** `[134w ⚠️ **OVERLONG: 134w > 120w max**]`
> For those who want a deeper understanding: here's the full proof that if two paths give different limits, the overall limit cannot exist. The idea is a contradiction argument. Suppose the overall limit L exists. Then we can get very close to L along any path near the point. But if path 1 goes to a different number L1, and we pick a point very close to the origin along path 1, the function must be both close to L and close to L1, forcing L and L1 to be close. By choosing epsilon as one third of the distance between L1 and L2, we derive a contradiction. This is the formal justification for the path test we've been using. Key takeaway: trying all paths is necessary because a single path can't guarantee existence.

---

### Slide 13 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause and Predict: Does This Limit Exist?**  ·  `split_left_right`

**On-screen text** `[14w]`
Before we analyze, take a moment to predict: does this limit exist at (0,0)?

**LEFT** `[formula_block]`

$$\lim_{(x,y)\to(0,0)} \frac{x^2 y^2}{x^4 + y^4}$$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of f(x,y)=x^2*y^2/(x^4+y^4) on [-1,1]^2. Use a colormap but do not highlight any paths. Show the surface only. Add a text overlay 'Does the limit exist?'

*Interactive Controls:*
  - 🎛 Button: reveal answer (shows path analysis)

```python
import numpy as np; import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; fig = plt.figure(); ax = fig.add_subplot(111, projection='3d'); x = np.linspace(-1,1,150); y = np.linspace(-1,1,150); X,Y = np.meshgrid(x,y); Z = X**2*Y**2/(X**4+Y**4+1e-10); surf = ax.plot_surface(X,Y,Z, cmap='viridis', alpha=0.8); ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z'); ax.set_title('Does the limit exist?'); plt.show()
```

**Teacher Narration** `[60w]`
> Now here's a challenge for you. Look at this function: x-squared y-squared over x to the fourth plus y to the fourth. The graph looks smooth at first glance. But does this limit exist as we approach the origin? Pause the video now, think about what paths you'd test, and make a prediction. We'll come back and analyze it together.

**Student Prompt:** Test the path y = x and the path y = 0. What do you get? What about y = x^2?

---

### Slide 14 · [CORE] 🎛 *[1 controls]*
**Answer: Limit Does Not Exist**  ·  `split_left_right`

**On-screen text** `[19w]`
Even though many paths give 0, the path y = x gives 1/2, so the limit does not exist.

**LEFT** `[steps]`

**Path analysis:**
- Along $y=0$: $\frac{x^2\cdot0}{x^4+0}=0$
- Along $x=0$: $0$
- Along $y=x$: $\frac{x^4}{x^4+x^4} = \frac{1}{2}$
- Along $y=x^2$: $\frac{x^2\cdot x^4}{x^4+x^8} \approx \frac{x^6}{x^4}=x^2\to 0$ (as $x\to0$)

Different paths give 0 and 1/2 → limit DNE.

**RIGHT** `[visual_spec]`

*Visual Spec:* Same plot as before, now add three curves: y=0 (red), x=0 (blue), y=x (green). Show that the green curve reaches 0.5 at the origin, while red and blue go to 0. Add text annotation showing the values.

*Interactive Controls:*
  - 🎛 Button: toggle path labels on/off

```python
import numpy as np; import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; fig = plt.figure(); ax = fig.add_subplot(111, projection='3d'); x = np.linspace(-1,1,150); y = np.linspace(-1,1,150); X,Y = np.meshgrid(x,y); Z = X**2*Y**2/(X**4+Y**4+1e-10); surf = ax.plot_surface(X,Y,Z, cmap='viridis', alpha=0.6); t = np.linspace(-1,1,100); ax.plot(t, np.zeros_like(t), np.zeros_like(t), 'r-', lw=3, label='y=0: 0'); ax.plot(np.zeros_like(t), t, np.zeros_like(t), 'b-', lw=3, label='x=0: 0'); ax.plot(t, t, t**4/(2*t**4+1e-10), 'g-', lw=3, label='y=x: 0.5'); ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z'); ax.legend(); ax.set_title('Limit DNE'); plt.show()
```

**Teacher Narration** `[96w]`
> Here's the analysis. Along the x-axis and y-axis, the function is zero. Along the parabola y equals x-squared, the function also tends to zero because higher powers in the numerator make it small. However, along the line y equals x, the function simplifies to one half. Since we have found at least one path that gives a different limit, the overall limit does not exist. This example is a caution: you can't just check a few paths. The line y equals x seems innocent but it reveals the discontinuity. Always be thorough when testing for existence.

---

### Slide 15 · [SUMMARY] 🎛 *[1 controls]*
**Summary and Key Takeaways**  ·  `full_width`

**On-screen text** `[12w]`
Master these tools to confidently analyze limits and continuity of multivariable functions.

**FULL WIDTH** `[text]`

**Key Concepts:**
1. Limits in multivariable calculus require path independence.
2. Epsilon-delta definition: for any ε>0, there exists δ>0.
3. Limit laws extend from single-variable.
4. Squeeze Theorem: bound a function between two that converge to the same limit.
5. To show a limit DNE: find two paths with different limits.
6. Continuity: limit equals function value.

**Common Pitfalls:**
- Checking only linear paths is insufficient.
- Assuming existence because limits along axes match.
- Forgetting to verify denominator limit ≠0 for quotient law.

**Teacher Narration** `[105w]`
> Let's wrap up. We've learned that the fundamental idea of a limit extends to multiple variables, but with a crucial twist: we must consider infinitely many paths. The epsilon-delta definition gives us a rigorous foundation, while limit laws let us compute efficiently. The Squeeze Theorem is your go-to tool for tricky limits at points where substitution fails. To show a limit does not exist, you only need one path that gives a different value. Finally, continuity simply requires the limit to equal the function's value. If you keep these ideas in mind, you'll be able to handle any multivariable limit problem you encounter. Good luck!

---
