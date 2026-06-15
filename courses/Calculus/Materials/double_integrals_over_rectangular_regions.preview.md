# Double Integrals Over Rectangular Regions

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You should already know single-variable integration and basic antiderivatives.

**Learning Objectives:**
- Calculate double integrals over rectangles using iterated integrals
- Interpret double integrals as volumes under surfaces
- Apply Fubini's Theorem to choose the easiest integration order
- Evaluate average values of functions over rectangular domains

---

## v3.1 Production Readiness

✅ **Interactive moments:** 4 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 77w)
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
✅ **interactive_moments**: 4 interactive moment(s) (min 3)
✅ **narration_overlong**: all ≤120w
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | hook | 🟢 | ◧ |  | 73w | 22w | From Area Under a Curve to Volume Under a Surface |
| 2 | 🎛core | 🟢 | ◧ |  | 77w | 15w | Definition of the Double Integral |
| 3 | core | 🟢 | ◧ |  | 81w | 23w | Fubini’s Theorem: Iterated Integration |
| 4 | 🎛practice | 🟢 | ◧ | ⏸️ | 68w | 12w | Warm-Up Example: Direct Computation |
| 5 | pause_and_try | 🟢 | ◧ | ⏸️ | 71w | 13w | Pause and Predict: Volume Under a Surface |
| 6 | core | 🟢 | ⬛⬛ |  | 86w | 11w | Solution: Volume Under z = x² e^y |
| 7 | core | 🟢 | ◧ |  | 72w | 19w | Volume Interpretation |
| 8 | practice | 🟡 | ⬛⬛ |  | 74w | 13w | Standard Example: Separable Function |
| 9 | core | 🟢 | ◧ |  | 67w | 11w | Average Value of a Function |
| 10 | 🎛practice | 🟡 | ⬛⬛ |  | 77w | 10w | Application Example: Average Temperature |
| 11 | misconception | 🟢 | ⬛⬛ |  | 82w | 20w | Common Mistake: Forgetting the Constant in Inner Integration |
| 12 | practice | 🟡 | ⬛⬛ |  | 75w | 15w | Edge Case Example: Trigonometric Function |
| 13 | challenge | 🔴 | ◧ |  | 85w | 13w | [Challenge – Optional] Lightweight Proof of Fubini's Theorem |
| 14 | 🎛visual_lab | 🟢 | ◧ |  | 83w | 15w | Interactive Lab: Visualizing Riemann Sums |
| 15 | summary | 🟢 | ⬛⬛ |  | 85w | 12w | Summary: Key Takeaways |

---

### Slide 1 · [HOOK]
**From Area Under a Curve to Volume Under a Surface**  ·  `split_left_right`

**On-screen text** `[22w]`
Rainfall varies across a field. How do we find total volume? Think: sum of (rain rate at each point)×(area of small patch).

**LEFT** `[text]`

How would you find the total rainfall over a rectangular field if the rain rate varies at every point?

**RIGHT** `[visual_spec]`

*Visual Spec:* A 2D top-down view of a rectangle (e.g., 4x3) subdivided into small squares. Each square has a small cylinder icon (rain gauge). The squares are color-coded from light blue (low rain) to dark blue (heavy rain) with a gradient. Overlay text: 'Total volume ≈ sum of (rain rate × area)'. Axis labels: x (meters), y (meters). Use matplotlib with pcolormesh and scatter for rain gauge icons.

```python
import numpy as np
import matplotlib.pyplot as plt
# Create a 4x3 grid
x = np.linspace(0,4,9)
y = np.linspace(0,3,7)
X,Y = np.meshgrid(x,y)
Z = np.sin(X)*np.cos(Y) + 1  # simulate rain intensity
plt.figure(figsize=(6,4))
plt.pcolormesh(X,Y,Z, cmap='Blues')
plt.colorbar(label='Rain rate (mm/h)')
plt.gca().set_aspect('equal')
plt.title('Rainfall over a rectangular field')
plt.xlabel('x (m)')
plt.ylabel('y (m)')
# Add small cylinder icons (simplified as circles) at centers of each cell
centers_x = np.linspace(0.5,3.5,4)
centers_y = np.linspace(0.5,2.5,3)
for cx in centers_x:
    for cy in centers_y:
        plt.plot(cx, cy, 'ko', markersize=6, markerfacecolor='black')
plt.tight_layout()
plt.savefig('rainfall_field.png', dpi=150)
plt.show()
```

**Teacher Narration** `[73w]`
> Imagine you have a rectangular field and rainfall intensity is different at every point. A single rain gauge gives just one number. But to get the total volume of water falling, you need to account for the variation. That's where double integrals come in. Today we'll learn how to compute them over rectangular regions. This idea of summing many small contributions is the foundation of integral calculus, extended from one dimension to two.

---

### Slide 2 · [CORE] 🎛 *[2 controls]*
**Definition of the Double Integral**  ·  `split_left_right`

**On-screen text** `[15w]`
Double integral = limit of Riemann sum: sum of function values times tiny rectangle areas.

**LEFT** `[formula_block]`

$$\iint_R f(x,y)\,dA = \lim_{\|\Delta\|\to 0} \sum_{i=1}^m \sum_{j=1}^n f(x_{ij}^*, y_{ij}^*)\,\Delta A$$

**RIGHT** `[visual_spec]`

*Visual Spec:* An animation that starts with a coarse grid (e.g., 2x2) over the rectangle [0,2]×[0,2] and then progressively refines to 4x4, 8x8, 16x16. At each step, draw 3D bars (prisms) from the xy-plane up to the surface z = f(x,y) = 0.5*x*y + 1. Show the approximate double integral value as sum of volumes. Include a text box updating the approximation and the number of sub-rectangles. Use matplotlib.animation.

*Interactive Controls:*
  - 🎛 Slider for n from 2 to 20 (step 1)
  - 🎛 Show/hide exact value

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
ax.set_xlim(0,2)
ax.set_ylim(0,2)
ax.set_zlim(0,3)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')

def f(x,y):
    return 0.5*x*y + 1

n_frames = [2,4,8,16]

def update(frame):
    ax.clear()
    n = n_frames[frame]
    x = np.linspace(0,2,n+1)
    y = np.linspace(0,2,n+1)
    dx = x[1]-x[0]
    dy = y[1]-y[0]
    x_mid = (x[:-1]+x[1:])/2
    y_mid = (y[:-1]+y[1:])/2
    X,Y = np.meshgrid(x_mid, y_mid)
    Z = f(X,Y)
    # bars
    ax.bar3d(X.ravel()-dx/2, Y.ravel()-dy/2, 0, dx, dy, Z.ravel(), shade=True, alpha=0.7)
    ax.set_xlim(0,2)
    ax.set_ylim(0,2)
    ax.set_zlim(0,3)
    ax.set_title(f'Approximation using {n}x{n} sub-rectangles')
    total = np.sum(Z)*dx*dy
    ax.text2D(0.05,0.95, f'Approx integral: {total:.4f}', transform=ax.transAxes)
    return ax

ani = FuncAnimation(fig, update, frames=len(n_frames), interval=1000, repeat=True)
plt.show()
```

**Teacher Narration** `[77w]`
> The formal definition of a double integral is a limit of Riemann sums. Just like single integrals, we subdivide the region into small rectangles, multiply the function value at a sample point by the area of that rectangle, sum them up, and take the limit as the rectangles become infinitesimally small. This definition is the foundation, but in practice we rarely compute the limit directly. Instead, we use Fubini's theorem to turn it into iterated single integrals.

---

### Slide 3 · [CORE]
**Fubini’s Theorem: Iterated Integration**  ·  `split_left_right`

**On-screen text** `[23w]`
You can integrate in either order: first with respect to y then x, or first x then y. The result is the same.

**LEFT** `[formula_block]`

$$\iint_R f(x,y)\,dA = \int_a^b \int_c^d f(x,y)\,dy\,dx = \int_c^d \int_a^b f(x,y)\,dx\,dy$$

**RIGHT** `[visual_spec]`

*Visual Spec:* Two side-by-side diagrams. Left: rectangle with vertical lines at x positions, each vertical line has an arrow along y direction representing inner integration. Text: dx, dy order. Right: rectangle with horizontal lines, arrows along x direction. Text: dy, dx order. Use matplotlib. Show a surface (e.g., z=xy) and illustrate slicing in both orders with transparent planes.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig, (ax1, ax2) = plt.subplots(1,2, subplot_kw={'projection':'3d'}, figsize=(10,5))

x = np.linspace(0,2,10)
y = np.linspace(0,3,10)
X,Y = np.meshgrid(x,y)
Z = X*Y

# Left: fix x, integrate y
for i in range(0,10,2):
    ax1.plot([x[i], x[i]], [0,3], [x[i]*0, x[i]*3], color='r', alpha=0.5)
ax1.plot_surface(X,Y,Z, alpha=0.3)
ax1.set_title('Slice by x first, then sum in y')
ax1.set_xlabel('x'); ax1.set_ylabel('y'); ax1.set_zlabel('z')

# Right: fix y, integrate x
for j in range(0,10,2):
    ax2.plot([0,2], [y[j], y[j]], [y[j]*0, y[j]*2], color='b', alpha=0.5)
ax2.plot_surface(X,Y,Z, alpha=0.3)
ax2.set_title('Slice by y first, then sum in x')
ax2.set_xlabel('x'); ax2.set_ylabel('y'); ax2.set_zlabel('z')

plt.tight_layout()
plt.show()
```

**Teacher Narration** `[81w]`
> Fubini's theorem is our computational workhorse. It says that for continuous functions over a rectangle, the double integral equals an iterated single integral. You can choose to integrate with respect to y first, treating x as constant, and then integrate that result with respect to x. Or you can reverse the order. The key is that the inner integral treats the outer variable as a constant. We'll see in examples why picking the right order can save a lot of work.

---

### Slide 4 · [PRACTICE] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Warm-Up Example: Direct Computation**  ·  `split_left_right`

**On-screen text** `[12w]`
Example: ∫∫ (x+2y) dA, R=[0,2]×[1,3] = 20. Try the reverse order yourself.

**LEFT** `[steps]`

**Problem:** Evaluate $\iint_R (x + 2y)\,dA$ where $R = [0,2] \times [1,3]$.  

1. Set up: $\int_{1}^{3} \int_{0}^{2} (x+2y)\,dx\,dy$  
2. Inner integral: $\int_0^2 (x+2y)\,dx = \left[\frac{x^2}{2} + 2yx\right]_0^2 = 2 + 4y$  
3. Outer integral: $\int_1^3 (2+4y)\,dy = [2y+2y^2]_1^3 = (6+18)-(2+2) = 20$  

**Answer:** 20

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D surface plot of z = x+2y over [0,2]×[1,3]. Use a colormap to show height. Add a wireframe box from the surface down to the xy-plane to emphasize volume. Numeric label 'Volume = 20' at top.

*Interactive Controls:*
  - 🎛 Check your answer button

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

x = np.linspace(0,2,30)
y = np.linspace(1,3,30)
X,Y = np.meshgrid(x,y)
Z = X + 2*Y

fig = plt.figure(figsize=(7,5))
ax = fig.add_subplot(111, projection='3d')
surf = ax.plot_surface(X,Y,Z, cmap='viridis', edgecolor='none', alpha=0.8)
# draw box from surface to z=0
ax.contourf(X,Y,Z, zdir='z', offset=0, cmap='viridis', alpha=0.3)
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')
ax.set_title('z = x+2y over [0,2]×[1,3]')
ax.text(1,2,20, 'Volume = 20', color='red', fontsize=12, fontweight='bold')
plt.show()
```

**Teacher Narration** `[68w]`
> Let's walk through a straightforward example. We choose to integrate with respect to x first. Treating y as constant, the inner integral gives 2+4y. Then the outer integral yields 20. Notice that if we reversed the order, we would get the same number—that's Fubini in action. Take a moment to verify that the reverse order also gives 20 by doing the calculation in your head or on paper.

**Student Prompt:** Try evaluating with the order dy dx. Do you get the same result?

---

### Slide 5 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Pause and Predict: Volume Under a Surface**  ·  `split_left_right`

**On-screen text** `[13w]`
Compute: V = ∫∫ x² e^y dA over [0,1]×[0,2]. Pause and try it.

**LEFT** `[text]`

**Problem:** Find the volume under $z = x^2 e^y$ over $R = [0,1] \times [0,2]$.  

Set up the iterated integral and compute the inner integral. Pause the video, then try the full calculation.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D surface of z = x^2 e^y. Use coolwarm colormap. Include a flat rectangular base at z=0. Add title 'Volume = ?'

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

x = np.linspace(0,1,30)
y = np.linspace(0,2,30)
X,Y = np.meshgrid(x,y)
Z = X**2 * np.exp(Y)

fig = plt.figure(figsize=(7,5))
ax = fig.add_subplot(111, projection='3d')
surf = ax.plot_surface(X,Y,Z, cmap='coolwarm', alpha=0.8)
ax.contourf(X,Y,Z, zdir='z', offset=0, cmap='coolwarm', alpha=0.3)
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')
ax.set_title('Volume under z = x² e^y')
plt.show()
```

**Teacher Narration** `[71w]`
> Here's a chance to test yourself. The function is x squared times e to the y. The rectangle is from x=0 to 1 and y=0 to 2. Pause the video now, set up the iterated integral, compute the inner integral, then the outer one. When you're ready, resume and I'll show you the solution step by step. This is a good check of your understanding of treating one variable as constant.

**Student Prompt:** Pause the video and evaluate the double integral. What is the volume?

---

### Slide 6 · [CORE]
**Solution: Volume Under z = x² e^y**  ·  `full_width`

**On-screen text** `[11w]`
Volume = (e²−1)/3 ≈ 2.13. Key: factor e^y out of x-integral.

**FULL WIDTH** `[steps]`

**Answer:** Volume = $\frac{e^2-1}{3} \approx 2.13$  

1. Set up: $\int_0^2 \int_0^1 x^2 e^y\,dx\,dy$  
2. Inner: $\int_0^1 x^2 e^y\,dx = e^y \left[\frac{x^3}{3}\right]_0^1 = \frac{e^y}{3}$  
3. Outer: $\int_0^2 \frac{e^y}{3}\,dy = \frac{1}{3}[e^y]_0^2 = \frac{e^2-1}{3}$

**Teacher Narration** `[86w]`
> If you paused and tried it, here's the solution. The inner integral with respect to x treats e to the y as constant, so we get e to the y times the integral of x squared from 0 to 1, which is e to the y over 3. Then the outer integral of e to the y over 3 from 0 to 2 gives (e squared minus 1) over 3. That's about 2.13 cubic units. Notice how factoring out the y-dependent part simplified the inner integration.

---

### Slide 7 · [CORE]
**Volume Interpretation**  ·  `split_left_right`

**On-screen text** `[19w]`
When f(x,y) ≥ 0, the double integral gives the volume of the solid between the surface and the xy-plane.

**LEFT** `[formula_block]`

$$V = \iint_R f(x,y)\,dA, \quad f(x,y) \ge 0$$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of a bumpy surface (e.g., z=4-x^2-y^2) over [0,2]×[0,2] with a translucent solid between surface and plane. Use arrows pointing to the volume.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

x = np.linspace(0,2,30)
y = np.linspace(0,2,30)
X,Y = np.meshgrid(x,y)
Z = 4 - X**2 - Y**2
Z = np.clip(Z, 0, None)  # ensure nonnegative

fig = plt.figure(figsize=(7,5))
ax = fig.add_subplot(111, projection='3d')
ax.plot_surface(X,Y,Z, cmap='plasma', alpha=0.7)
# fill below surface
ax.contourf(X,Y,Z, zdir='z', offset=0, cmap='plasma', alpha=0.2)
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')
ax.set_title('Volume = double integral of height')
ax.text(1,1,2, 'Volume', color='white', fontsize=14, bbox=dict(facecolor='red'))
plt.show()
```

**Teacher Narration** `[72w]`
> Here's an intuitive picture: the double integral of a nonnegative function over a rectangle is exactly the volume of the solid bounded above by the surface and below by the xy-plane. Think of it as stacking infinitesimally thin columns: each column has base area dA and height f(x,y). Summing them all up gives the total volume. If the function is negative somewhere, the integral gives signed volume—positive above the plane, negative below.

---

### Slide 8 · [PRACTICE] 🟡
**Standard Example: Separable Function**  ·  `full_width`

**On-screen text** `[13w]`
Example: ∫∫ x/y² dA over [1,2]×[1,4] = 9/8. Notice the integrand is separable.

**FULL WIDTH** `[steps]`

**Problem:** Evaluate $\iint_R \frac{x}{y^2}\,dA$ with $R = [1,2] \times [1,4]$.  

1. Choose order: $\int_1^4 \int_1^2 \frac{x}{y^2}\,dx\,dy$  
2. Inner: $\int_1^2 \frac{x}{y^2}\,dx = \frac{1}{y^2} \left[\frac{x^2}{2}\right]_1^2 = \frac{3}{2y^2}$  
3. Outer: $\int_1^4 \frac{3}{2y^2}\,dy = \frac{3}{2}[-y^{-1}]_1^4 = \frac{9}{8}$  

**Answer:** $\frac{9}{8}$

**Teacher Narration** `[74w]`
> In this example, the integrand separates into x times 1 over y squared. That means we could compute the double integral as the product of two single integrals: the integral of x from 1 to 2 times the integral of 1 over y squared from 1 to 4. That's (3/2) times (3/4) equals 9/8. This trick works whenever the integrand factors into a product of a function of x and a function of y.

---

### Slide 9 · [CORE]
**Average Value of a Function**  ·  `split_left_right`

**On-screen text** `[11w]`
Average value = (1/Area)×(double integral). Divides total volume by base area.

**LEFT** `[formula_block]`

$$f_{\text{avg}} = \frac{1}{\text{Area}(R)} \iint_R f(x,y)\,dA$$

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot showing a wavy surface (z = sin(x)cos(y) + 2) over [0,2]×[0,2]. Add a transparent horizontal plane at the average height (computed). Use color to differentiate.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

x = np.linspace(0,2,30)
y = np.linspace(0,2,30)
X,Y = np.meshgrid(x,y)
Z = np.sin(X)*np.cos(Y) + 2
area = 4.0
# compute numeric integral using Simpson's rule
from scipy.integrate import simpson
Zint = simpson(simpson(Z, y[:,0], axis=0), x)
Zavg = Zint / area

fig = plt.figure(figsize=(7,5))
ax = fig.add_subplot(111, projection='3d')
ax.plot_surface(X,Y,Z, cmap='viridis', alpha=0.6)
# average plane
Xp,Yp = np.meshgrid([0,2], [0,2])
Zp = Zavg * np.ones_like(Xp)
ax.plot_surface(Xp,Yp,Zp, color='r', alpha=0.4)
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')
ax.set_title(f'Average value ≈ {Zavg:.2f}')
plt.show()
```

**Teacher Narration** `[67w]`
> Just like with single integrals, we can define the average value of a two-variable function over a region. It's the total integral divided by the area of the region. Geometrically, if the function is nonnegative, the average value is the height of a cylinder with base R that has the same volume as the solid under the surface. This is a powerful concept in physics and engineering.

---

### Slide 10 · [PRACTICE] 🟡 🎛 *[1 controls]*
**Application Example: Average Temperature**  ·  `full_width`

**On-screen text** `[10w]`
Average temperature on plate = 20°C. Useful for thermal analysis.

**FULL WIDTH** `[steps]`

**Problem:** The temperature (in °C) on a rectangular plate $R=[0,2]\times[0,3]$ (meters) is $T(x,y)=25+10x-5y^2$. Find the average temperature.

1. Area = $2\times 3 = 6$ m²
2. $\iint_R T\,dA = \int_0^3 \int_0^2 (25+10x-5y^2)\,dx\,dy$
3. Inner: $[25x+5x^2-5y^2x]_0^2 = 70 - 10y^2$
4. Outer: $\int_0^3 (70-10y^2)\,dy = [70y - \frac{10}{3}y^3]_0^3 = 120$
5. $T_{\text{avg}} = 120/6 = 20$ °C

**Teacher Narration** `[77w]`
> Here's a real-world application. A metal plate has temperature varying from 20°C at the coolest corner to 50°C at the hottest. To find the average temperature, we compute the double integral of the temperature over the plate and divide by the area. The result is 20°C. Notice that even though the temperature goes above 20, the average ends up at 20 because the function dips below 20 in some regions (y large). This is the signed-volume interpretation.

---

### Slide 11 · [MISCONCEPTION]
**Common Mistake: Forgetting the Constant in Inner Integration**  ·  `full_width`

**On-screen text** `[20w]`
When integrating with respect to y, treat x as a constant. Do NOT integrate x as if it were y.

**FULL WIDTH** `[steps]`

**Wrong method:** $\int_0^2 \int_1^3 (x+2y)\,dy\,dx = \int_0^2 [x y + y^2]_1^3\,dx$  
But then incorrectly: $[x y + y^2]_1^3 = (3x+9) - (x+1) = 2x+8$ (that's correct).  
But then forgetting to integrate: $\int_0^2 (2x+8)\,dx = [x^2+8x]_0^2 = 4+16=20$ (that's fine).

**Common error:** When computing $\int_1^3 x\,dy$ in the inner integral, some forget $x$ is constant and treat it as variable, e.g., $\int_1^3 x\,dy = \frac{x^2}{2}$? No! $x$ is constant, so $\int_1^3 x\,dy = x\int_1^3 dy = x(3-1)=2x$.

**Teacher Narration** `[82w]`
> A frequent mistake when learning iterated integrals is forgetting which variable is constant. When you integrate first with respect to y, treat x as a constant—just like you would when taking a partial derivative. For example, the integral of x with respect to y from 1 to 3 is x times (3 minus 1) equals 2x, not x squared over 2. Always pause and ask yourself: 'What am I integrating with respect to?' If it's y, then x is just a number.

---

### Slide 12 · [PRACTICE] 🟡
**Edge Case Example: Trigonometric Function**  ·  `full_width`

**On-screen text** `[15w]`
Double integral of sin x cos y over [0,π]×[0,π/2] = 2. Factor product trick works.

**FULL WIDTH** `[steps]`

**Problem:** Evaluate $\iint_R \sin x \cos y\,dA$, $R=[0,\pi]\times[0,\pi/2]$.

1. $\int_0^{\pi/2} \int_0^\pi \sin x \cos y\,dx\,dy$
2. Inner: $\cos y \int_0^\pi \sin x\,dx = \cos y [ -\cos x ]_0^\pi = \cos y (1+1) = 2\cos y$
3. Outer: $\int_0^{\pi/2} 2\cos y\,dy = [2\sin y]_0^{\pi/2} = 2$

**Alternative:** separable product: $(\int_0^\pi \sin x\,dx)(\int_0^{\pi/2} \cos y\,dy) = 2 \times 1 = 2$.

**Teacher Narration** `[75w]`
> This example shows the power of the separable function property. The integrand splits cleanly into sine of x times cosine of y. So the double integral is the product of two single integrals: the integral of sine from 0 to pi (which is 2) times the integral of cosine from 0 to pi/2 (which is 1). That gives 2. This is much faster than doing the iterated integration, though both methods give the same answer.

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Lightweight Proof of Fubini's Theorem**  ·  `split_left_right`

**On-screen text** `[13w]`
Fubini's theorem: integration order can be swapped for continuous functions. Proof by slicing.

**LEFT** `[steps]`

**Idea:** For a continuous $f$ on $R$, define $A(x) = \int_c^d f(x,y)\,dy$. Then the volume $V = \int_a^b A(x)\,dx$ by slicing. Similarly $V = \int_c^d B(y)\,dy$ with $B(y)=\int_a^b f(x,y)\,dx$. Since both equal the same volume, the iterated integrals are equal.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two panel diagram: left shows a 2D rectangle with vertical strips, each strip has area A(x) times dx. Right shows horizontal strips. Use arrows and labels.

```python
import matplotlib.pyplot as plt
import numpy as np

fig, (ax1, ax2) = plt.subplots(1,2, figsize=(8,4))
# left: vertical slices
ax1.set_xlim(0,4); ax1.set_ylim(0,3)
for i in range(0,5):
    ax1.axvline(i, color='gray', lw=0.5)
ax1.fill_between([1,1.5], 0,3, alpha=0.3, color='blue', label='A(x) dx')
ax1.set_title('Vertical slices: A(x)=∫f dy')
ax1.set_xlabel('x'); ax1.set_ylabel('y')
# right: horizontal slices
ax2.set_xlim(0,4); ax2.set_ylim(0,3)
for j in range(0,4):
    ax2.axhline(j, color='gray', lw=0.5)
ax2.fill_between([0,4], 2,2.5, alpha=0.3, color='red', label='B(y) dy')
ax2.set_title('Horizontal slices: B(y)=∫f dx')
ax2.set_xlabel('x'); ax2.set_ylabel('y')
plt.tight_layout()
plt.show()
```

**Teacher Narration** `[85w]`
> For those who want a deeper understanding, here's the intuition behind Fubini's theorem. Imagine slicing the rectangular region into thin vertical strips of width dx. For a fixed x, the inner integral A(x) gives the area of the cross-section of the solid. Then integrating A(x) over x gives the total volume. Similarly, we can slice horizontally. Since both methods compute the same volume, the iterated integrals must be equal. A rigorous proof uses uniform continuity and Riemann sums, but this geometric argument captures the essence.

---

### Slide 14 · [VISUAL_LAB] 🎛 *[3 controls]*
**Interactive Lab: Visualizing Riemann Sums**  ·  `split_left_right`

**On-screen text** `[15w]`
Interactive: move sliders to refine grid. Watch the Riemann sum approach the true double integral.

**LEFT** `[text]`

Adjust the number of subdivisions and see how the Riemann sum approaches the exact double integral.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D surface with growing number of sub-rectangles (bars). Use sliders: n (number of subdivisions in x), m (in y). Show approximation and exact value when toggle is on.

*Interactive Controls:*
  - 🎛 Slider for n (x subdivisions) from 1 to 20
  - 🎛 Slider for m (y subdivisions) from 1 to 20
  - 🎛 Toggle: show exact value (difference label)

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(10,7))
ax = fig.add_subplot(111, projection='3d', position=[0.1, 0.2, 0.7, 0.7])
plt.subplots_adjust(bottom=0.3)

x = np.linspace(0,2,30)
y = np.linspace(0,2,30)
X,Y = np.meshgrid(x,y)
Z = 0.5*X*Y + 1  # function

def update(n,m):
    ax.clear()
    x_edges = np.linspace(0,2,n+1)
    y_edges = np.linspace(0,2,m+1)
    x_mid = (x_edges[:-1]+x_edges[1:])/2
    y_mid = (y_edges[:-1]+y_edges[1:])/2
    dx = x_edges[1]-x_edges[0]
    dy = y_edges[1]-y_edges[0]
    Xm,Ym = np.meshgrid(x_mid,y_mid)
    Zmid = 0.5*Xm*Ym + 1
    ax.bar3d(Xm.ravel()-dx/2, Ym.ravel()-dy/2, 0, dx, dy, Zmid.ravel(), shade=True, alpha=0.6)
    ax.set_xlim(0,2); ax.set_ylim(0,2); ax.set_zlim(0,3)
    total = np.sum(Zmid)*dx*dy
    ax.set_title(f'Riemann sum: {total:.4f}')
    return ax

# initial
update(4,4)

axcolor = 'lightgoldenrodyellow'
ax_n = plt.axes([0.2, 0.1, 0.4, 0.03], facecolor=axcolor)
ax_m = plt.axes([0.2, 0.05, 0.4, 0.03], facecolor=axcolor)
s_n = Slider(ax_n, 'n (x)', 1, 20, valinit=4, valstep=1)
s_m = Slider(ax_m, 'm (y)', 1, 20, valinit=4, valstep=1)

def sliders_on_changed(val):
    n = int(s_n.val)
    m = int(s_m.val)
    update(n,m)
    fig.canvas.draw_idle()

s_n.on_changed(sliders_on_changed)
s_m.on_changed(sliders_on_changed)

plt.show()
```

**Teacher Narration** `[83w]`
> Now you can explore the concept interactively. Use the sliders to increase the number of subdivisions in the x and y directions. As you refine the grid, the Riemann sum—the sum of volumes of the rectangular columns—gets closer and closer to the exact double integral value. This is the visual heart of the definition: the limit of Riemann sums. It's a powerful way to see convergence in action, and you can experiment with different grid sizes to see how quickly the approximation improves.

**Student Prompt:** Try with n=1, m=1. How far is the approximation from the exact value? Then increase to n=20, m=20. Notice the convergence.

---

### Slide 15 · [SUMMARY]
**Summary: Key Takeaways**  ·  `full_width`

**On-screen text** `[12w]`
Recap: double integrals over rectangles, Fubini, volume, average value. Next: general regions.

**FULL WIDTH** `[text]`

**What you learned:**
- Definition of double integral as limit of Riemann sums
- Fubini's Theorem: iterated integration in any order
- Volume interpretation: V = ∬ f dA (f ≥ 0)
- Average value formula: f_avg = (1/Area) ∬ f dA
- Separable functions: ∬ g(x)h(y) dA = (∫ g)(∫ h)
- Common mistake: treat inner variable constant

**Formulas to remember:**
- $\iint_R f\,dA = \int_a^b \int_c^d f\,dy\,dx = \int_c^d \int_a^b f\,dx\,dy$
- $V = \iint_R f\,dA$ (f≥0)
- $f_{\text{avg}} = \frac{1}{\text{Area}(R)} \iint_R f\,dA$

**Teacher Narration** `[85w]`
> Let's quickly review what we covered today. We defined the double integral as a limit of Riemann sums, then discovered Fubini's theorem which lets us compute it as two successive single integrals. We saw how double integrals give volume under a surface, how to compute average values, and we learned the separable function shortcut. A common pitfall is treating the wrong variable as constant during inner integration. In the next lecture, we'll tackle double integrals over more general, non-rectangular regions where the limits become functions.

---
