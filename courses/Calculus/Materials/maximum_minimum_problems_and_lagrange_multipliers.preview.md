# Maximum Minimum Problems And Lagrange Multipliers

**Category:** calculus  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 88%

> **Prerequisite:** You should be comfortable with gradient vectors, partial derivatives, and unconstrained critical points.

**Learning Objectives:**
- Apply the method of Lagrange multipliers to find extreme values of functions subject to constraints
- Solve systems of equations arising from gradient equality conditions
- Analyze constrained optimization problems with multiple constraints
- Interpret the Lagrange multiplier λ as a rate of change of the optimal value
- Distinguish between boundary and interior critical points in constrained problems

---

## v3.1 Production Readiness

✅ **Interactive moments:** 5 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 84w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 15 slides (target 12–18)
❌ **required_types**: missing types: {'summary'}
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
⚠️ **visual_specs**: missing on slides: [5]
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
| 1 | 🎛hook | 🟢 | ◧ |  | 105w | 18w | Finding the Highest Point on a Trail |
| 2 | 🎛core | 🟢 | ◧ |  | 86w | 12w | Lagrange Multiplier Condition |
| 3 | 🎛practice | 🟢 | ◧ |  | 110w | 8w | Warm‑Up: $f=x^2+y^2$ with $xy=1$ |
| 4 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 74w | 6w | Prediction: What if $xy = -1$? |
| 5 | practice | 🟢 | ◧ |  | 62w | 6w | Solution for $xy=-1$ |
| 6 | misconception | 🟡 | ◧ |  | 95w | 6w | Don't Forget Interior Points! |
| 7 | practice | 🟢 | ⬛⬛ |  | 89w | 8w | Standard: Disk with Interior and Boundary |
| 8 | 🎛visual_lab | 🟡 | ◧ |  | 63w | 12w | Interactive: Disk Example |
| 9 | challenge | 🔴 | ◧ |  | 91w | 10w | [Challenge – Optional] Proof Sketch |
| 10 | practice | 🟡 | ◧ |  | 89w | 15w | Tricky: Closest/Farthest Point on a Sphere |
| 11 | pause_and_try | 🟡 | ◧ | ⏸️ | 75w | 8w | Pause: What if the external point is inside the sphere? |
| 12 | core | 🟡 | ◧ |  | 70w | 5w | Two Constraints: Formula |
| 13 | practice | 🟡 | ⬛⬛ |  | 92w | 12w | Application: Two Constraints Example |
| 14 | misconception | 🔴 | ◧ |  | 72w | 12w | [Challenge – Optional] When Lagrange Fails: ∇g = 0 |
| 15 | summarize | 🟢 | ◧ |  | 85w | 7w | Summary and Key Takeaways |

---

### Slide 1 · [HOOK] 🎛 *[2 controls]*
**Finding the Highest Point on a Trail**  ·  `split_left_right`

**On-screen text** `[18w]`
Hiker: highest elevation on a trail.
At the optimum, trail touches a contour line → ∇f ∥ ∇g.

**LEFT** `[concept]`

A hiker wants the highest elevation **while staying on a narrow trail**. The mountain height is $f(x,y)$, the trail is $g(x,y)=k$.

At the optimum, the trail just touches a contour line – the gradients $\nabla f$ and $\nabla g$ become parallel.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a 3D surface (mountain) with a bright red trail curve. Mark the optimal point where the trail is tangent to a contour line. Show two gradient arrows (one for f, one for g) pointing in the same direction from that point. Use matplotlib 3D. Label axes: x, y, z (height). Add legend.

*Interactive Controls:*
  - 🎛 Slider: change the trail radius to see how the optimal point moves
  - 🎛 Toggle: show/hide contour lines on the mountain surface

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d')

# mountain surface f(x,y)=4 - x^2 - y^2 + some perturbation
x = np.linspace(-2,2,40)
y = np.linspace(-2,2,40)
X,Y = np.meshgrid(x,y)
Z = 4 - 0.5*X**2 - 0.3*Y**2 + 0.1*np.sin(2*X)*np.cos(2*Y)
ax.plot_surface(X,Y,Z, alpha=0.7, cmap='viridis')

# trail: g(x,y)=x^2+y^2=2 (circle)
theta = np.linspace(0,2*np.pi,100)
xt = np.sqrt(2)*np.cos(theta)
yt = np.sqrt(2)*np.sin(theta)
zt = 4 - 0.5*xt**2 - 0.3*yt**2 + 0.1*np.sin(2*xt)*np.cos(2*yt)
ax.plot(xt, yt, zt, 'r-', linewidth=3, label='trail')

# optimal point (tangency)
opt_x = np.sqrt(2)/np.sqrt(1+0.6/0.5)  # approximate
opt_y = 0.6/0.5 * opt_x
opt_z = 4 - 0.5*opt_x**2 - 0.3*opt_y**2 + 0.1*np.sin(2*opt_x)*np.cos(2*opt_y)
ax.scatter([opt_x],[opt_y],[opt_z], color='black', s=100, label='optimum')

# gradient arrows (simplified direction)
ax.quiver(opt_x, opt_y, opt_z, -opt_x, -0.6*opt_y, 0, length=0.3, color='blue', label='∇f')
ax.quiver(opt_x, opt_y, opt_z, opt_x, opt_y, 0, length=0.3, color='green', label='∇g')

ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('f')
ax.legend()
plt.show()
```

**Teacher Narration** `[105w]`
> Imagine you are a hiker trying to reach the highest point on a mountain, but you must stay exactly on a narrow trail. The mountain height is your function f, and the trail is the constraint curve g equals k. At the very best point along the trail, something special happens: the trail just kisses a contour line of the mountain. That means it does not cross the contour, it runs along it. Since gradients are perpendicular to contour lines, both gradients become parallel. That is the entire idea behind Lagrange multipliers. This geometric insight is the foundation for the algebraic method we will develop.

---

### Slide 2 · [CORE] 🎛 *[2 controls]*
**Lagrange Multiplier Condition**  ·  `split_left_right`

**On-screen text** `[12w]`
∇f = λ ∇g  and constraint g=k.
λ is the Lagrange multiplier.

**LEFT** `[formula_block]`

**Single constraint:**
$$\nabla f = \lambda \nabla g, \quad g(x,y,z)=k$$

**Component form (2D):**
$$f_x = \lambda g_x, \quad f_y = \lambda g_y, \quad g(x,y)=k$$

λ is the **Lagrange multiplier** – it measures how the optimal value changes if the constraint is relaxed.

**RIGHT** `[visual_spec]`

*Visual Spec:* A 2D diagram with a curve g=k, a point P on it, and two parallel arrows representing ∇f and ∇g. Label: '∇f = λ∇g'. Show a small label 'λ scalar'. Use matplotlib 2D.

*Interactive Controls:*
  - 🎛 Slider: change the scalar λ to see how the length of ∇f changes relative to ∇g
  - 🎛 Toggle: show/hide the constraint curve equation

```python
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(5,5))

# constraint curve: circle
theta = np.linspace(0,2*np.pi,100)
r = 2
x = r*np.cos(theta)
y = r*np.sin(theta)
ax.plot(x,y,'k',label='g(x,y)=k')

# point P
P = np.array([1.2,1.6])
ax.scatter(P[0],P[1],color='red',s=50,zorder=5)

# gradient of f (example f = x^2 + y^2 => ∇f = (2x,2y))
grad_f = 2*P
# gradient of g (g = x^2+y^2 => ∇g = (2x,2y)) same direction
grad_g = 2*P
# normalize for display
scale = 0.5
ax.arrow(P[0], P[1], scale*grad_f[0], scale*grad_f[1], head_width=0.2, color='blue', label='∇f')
ax.arrow(P[0], P[1], scale*grad_g[0], scale*grad_g[1], head_width=0.2, color='green', alpha=0.7, label='∇g')

ax.set_aspect('equal')
ax.legend()
ax.set_xlim(-3,3); ax.set_ylim(-3,3)
plt.show()
```

**Teacher Narration** `[86w]`
> Here is the formal condition. For a function f subject to a single constraint g equals k, at any local extremum the gradient of f must be parallel to the gradient of g. That is, there exists a scalar λ such that ∇f equals λ times ∇g. We then solve the component equations together with the constraint. The number λ tells you how sensitive the optimal value is to changes in the constraint – a large λ means small changes in k greatly affect the optimum.

---

### Slide 3 · [PRACTICE] 🎛 *[2 controls]*
**Warm‑Up: $f=x^2+y^2$ with $xy=1$**  ·  `split_left_right`

**On-screen text** `[8w]`
Min f=2 at (1,1) and (−1,−1). No maximum.

**LEFT** `[text]`

**Goal:** Find extreme values of $f(x,y)=x^2+y^2$ on the hyperbola $xy=1$.

**Key steps:**
1. ∇f = ⟨2x,2y⟩, ∇g = ⟨y,x⟩
2. Set $2x=λy$, $2y=λx$, $xy=1$
3. Multiply first by x: $2x^2=λxy=λ$
4. Multiply second by y: $2y^2=λxy=λ → x^2=y^2$
5. $x=±y$; from $xy=1$ only $x=y$ works → $(1,1),(-1,-1)$
6. $f=2$ at both. No maximum (unbounded).

**RIGHT** `[visual_spec]`

*Visual Spec:* Same as v2 slide 4 but with both optima marked. Use mpl_toolkits.mplot3d. Surface f(x,y)=x^2+y^2, red curve for xy=1, two black dots at (1,1,2) and (-1,-1,2). Add gradient arrows at one optimum.

*Interactive Controls:*
  - 🎛 Slider: change the constraint constant k to see how the optimum value changes
  - 🎛 Toggle: show/hide the gradient arrows at the optimum point

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d')

x = np.linspace(-2,2,50)
y = np.linspace(-2,2,50)
X,Y = np.meshgrid(x,y)
Z = X**2 + Y**2
ax.plot_surface(X,Y,Z, alpha=0.6, cmap='viridis')

# constraint xy=1
t = np.linspace(0.1,2,100)
t = np.concatenate([t, np.linspace(-2,-0.1,100)])
xc = t
yc = 1/t
zc = xc**2 + yc**2
ax.plot(xc,yc,zc,'r-',linewidth=3,label='xy=1')

# optima
ax.scatter([1,-1],[1,-1],[2,2],color='black',s=100,zorder=10)

# gradient at (1,1)
ax.quiver(1,1,2,2,2,0,color='blue',length=0.3)

ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('f')
ax.legend()
plt.show()
```

**Teacher Narration** `[110w]`
> Let's walk through a basic problem. We want the extreme values of the distance-squared from the origin, but we have to stay on the hyperbola xy equals 1. Set up the Lagrange equations — two gradient equations plus the constraint. Multiplying by x and y cleverly uses the constraint to eliminate λ. This gives x squared equals y squared, so x equals plus or minus y. Only x equals y gives real points on the constraint. So we get two points each giving the value 2. As x goes to zero along the hyperbola, y goes to infinity, so f becomes arbitrarily large — no maximum. The minimum is 2.

---

### Slide 4 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Prediction: What if $xy = -1$?**  ·  `split_left_right`

**On-screen text** `[6w]`
Try: $f=x^2+y^2$, $xy=-1$.
Pause and solve.

**LEFT** `[text]`

**Your turn:** Find the extreme values of $f(x,y)=x^2+y^2$ on $xy=-1$.

Start with the same gradients. The only change is the constraint.

**Pause and solve** before clicking the reveal.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot as before, but replace constraint curve with xy=-1. Only show plot without markers initially? Actually just show the surface and constraint, no labels for optimum.

*Interactive Controls:*
  - 🎛 Button: reveal the solution points on the plot
  - 🎛 Toggle: show/hide the gradient arrows at the solution points

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
x = np.linspace(-2,2,50)
y = np.linspace(-2,2,50)
X,Y = np.meshgrid(x,y)
Z = X**2+Y**2
ax.plot_surface(X,Y,Z, alpha=0.6, cmap='viridis')
# constraint xy=-1
t = np.linspace(0.1,2,100); t = np.concatenate([t, np.linspace(-2,-0.1,100)])
xc = t; yc = -1/t; zc = xc**2+yc**2
ax.plot(xc,yc,zc,'r-',linewidth=3)
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('f')
plt.show()
```

**Teacher Narration** `[74w]`
> Now I want you to try a small variation. The function is still the distance squared from the origin, but this time the constraint is xy equals negative 1. Pause the video now and try to find the extreme values using the same Lagrange method. After you've attempted it, resume to see the solution. This exercise will help you see how the sign of the constraint constant affects the location of the optimum points.

**Student Prompt:** Find the extreme values of f(x,y)=x^2+y^2 subject to xy=-1.

---

### Slide 5 · [PRACTICE]
**Solution for $xy=-1$**  ·  `split_left_right`

**On-screen text** `[6w]`
Minimum 2 at (1,−1) and (−1,1).

**LEFT** `[text]`

Following same steps:
- Gradient equations unchanged.
- Multiplying gives $x^2 = y^2$ and $λ = 2x^2$.
- From xy=-1, $x=y$ gives $x^2=-1$ impossible.
- $x=-y$ gives $-x^2 = -1$ → $x=±1$, $y=∓1$.
- Points: (1,-1), (-1,1). f=2.
- Again no maximum.

**Minimum 2 at (1,-1) and (-1,1).**

**RIGHT** `[visual_spec]`

```python
Same as slide 4 right but add two black dots at (1,-1,2) and (-1,1,2).
```

**Teacher Narration** `[62w]`
> Here is the solution. The only difference is that now x equals negative y works because xy equals negative 1. We get the points (1,-1) and (-1,1) again giving f equals 2. The same minimum value, just different locations. Did you get it? Notice the method is essentially the same — the algebra branches depending on the sign of the constraint constant.

---

### Slide 6 · [MISCONCEPTION] 🟡
**Don't Forget Interior Points!**  ·  `split_left_right`

**On-screen text** `[6w]`
Interior matters! Lagrange only for boundary.

**LEFT** `[text]`

**Wrong approach:** Use Lagrange on the boundary only, ignore interior.

**Example:** $f=x^2+2y^2$ on $x^2+y^2\le 1$.
- Interior: ∇f=0 at (0,0), f=0. (Critical point!)
- Boundary: Lagrange gives candidates.
- Must compare ALL candidates to find global max/min.

**Why it fails:** Lagrange only finds extrema *on* the constraint. If the domain has interior, check critical points inside too.

**RIGHT** `[visual_spec]`

*Visual Spec:* Contour plot of f(x,y)=x^2+2y^2 over the unit disk. Highlight the interior point (0,0) with a marker, and the four boundary points from Lagrange (1,0),(-1,0),(0,1),(0,-1). Use different colors. Add labels with f-values.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-1.2,1.2,200)
y = np.linspace(-1.2,1.2,200)
X,Y = np.meshgrid(x,y)
Z = X**2 + 2*Y**2

fig, ax = plt.subplots(figsize=(6,6))
cp = ax.contourf(X, Y, Z, levels=20, cmap='viridis', alpha=0.6)
plt.colorbar(cp)

# disk boundary
theta = np.linspace(0,2*np.pi,100)
ax.plot(np.cos(theta), np.sin(theta), 'k', linewidth=2)

# interior candidate
ax.scatter(0,0, color='red', s=80, label='interior (0,0) f=0')
# boundary candidates
ax.scatter([1,-1,0,0], [0,0,1,-1], color='blue', s=80, label='Lagrange candidates')
ax.legend()
ax.set_aspect('equal')
ax.set_xlim(-1.2,1.2)
ax.set_ylim(-1.2,1.2)
plt.show()
```

**Teacher Narration** `[95w]`
> A very common mistake is to only apply Lagrange multipliers to the boundary of a closed domain, forgetting that the extremum could be inside. For example, suppose we want the extreme values of f equals x squared plus 2 y squared on the closed disk of radius 1. If you just use Lagrange on the circle, you get boundary points but you miss the interior critical point at (0,0) where the gradient is zero. That point gives f equals 0, which turns out to be the minimum. So remember: always check interior critical points separately.

---

### Slide 7 · [PRACTICE]
**Standard: Disk with Interior and Boundary**  ·  `full_width`

**On-screen text** `[8w]`
Min f=0 at (0,0); Max f=2 at (0,±1).

**FULL WIDTH** `[text]`

**Problem:** Find max/min of $f(x,y)=x^2+2y^2$ on $x^2+y^2\le 1$.

| Step | Action | Result |
|------|--------|--------|
| 1 | Interior: ∇f=0 | (0,0) → f=0 |
| 2 | Boundary: Lagrange | 2x=λ·2x, 4y=λ·2y, x²+y²=1 |
| 3 | Case x=0 → y=±1 | f=2 |
| 4 | Case λ=1 → y=0 → x=±1 | f=1 |
| 5 | Compare all: 0,1,2 | **Min 0, Max 2** |

**Teacher Narration** `[89w]`
> Now let's solve the complete problem. First find interior critical points by setting the gradient to zero. That gives the origin with f equals 0. Then apply Lagrange on the boundary circle. The system splits into cases. When x equals 0, we get points (0,1) and (0,-1) with f equals 2. When λ equals 1, we get y equals 0 and points (1,0) and (-1,0) with f equals 1. Comparing all candidate values, the minimum is 0 at the interior point, and the maximum is 2 on the boundary.

---

### Slide 8 · [VISUAL_LAB] 🟡 🎛 *[2 controls]*
**Interactive: Disk Example**  ·  `split_left_right`

**On-screen text** `[12w]`
Adjust the constraint radius to see its effect on the candidate points.

**LEFT** `[text]`

Interact with the 3D plot. Use the slider to change λ (not the Lagrange multiplier but a parameter) to see where the constraint circle intersects the surface. Toggle contour lines to see the geometry.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the surface f= x^2+2y^2 and the constraint cylinder x^2+y^2=1 in 3D. Add a slider to change the radius of the cylinder from 0.5 to 1.5. Add a toggle to show/hide contour lines on surface. Mark candidates with dots. Use matplotlib widgets (Slider, CheckButtons).

*Interactive Controls:*
  - 🎛 Slider for cylinder radius from 0.5 to 1.5
  - 🎛 Toggle: show/hide contour lines

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider, CheckButtons

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d')
plt.subplots_adjust(bottom=0.25)

x = np.linspace(-1.5,1.5,50)
y = np.linspace(-1.5,1.5,50)
X,Y = np.meshgrid(x,y)
Z = X**2 + 2*Y**2

# initial cylinder radius r=1
def plot_surface(r, show_contour):
    ax.clear()
    ax.plot_surface(X,Y,Z, alpha=0.5, cmap='viridis')
    # cylinder
    theta = np.linspace(0,2*np.pi,50)
    xc = r*np.cos(theta)
    yc = r*np.sin(theta)
    zc = xc**2 + 2*yc**2
    ax.plot(xc, yc, zc, 'r-', linewidth=3, label='constraint')
    if show_contour:
        ax.contour(X,Y,Z, levels=10, offset=0, alpha=0.3)
    ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('f')
    ax.set_zlim(0,4)
    ax.legend()
    plt.draw()

plot_surface(1, False)

ax_slider = plt.axes([0.2, 0.1, 0.6, 0.03])
slider = Slider(ax_slider, 'Radius', 0.5, 1.5, valinit=1)
check_ax = plt.axes([0.7, 0.02, 0.1, 0.1])
check = CheckButtons(check_ax, ['Contours'], [False])

def update(val):
    r = slider.val
    show = check.get_status()[0]
    plot_surface(r, show)
slider.on_changed(update)
def toggle(label):
    r = slider.val
    show = check.get_status()[0]
    plot_surface(r, show)
check.on_clicked(toggle)
plt.show()
```

**Teacher Narration** `[63w]`
> This interactive visual lets you see how the constrained optimization changes with the constraint. The red curve is the boundary of the disk. Use the slider to change the radius. Notice that the candidate points from Lagrange move along the surface. The toggle shows contour lines, which can help you see why the optimum occurs where the constraint is tangent to a contour.

**Student Prompt:** What happens to the maximum value as you increase the radius?

---

### Slide 9 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof Sketch**  ·  `split_left_right`

**On-screen text** `[10w]`
∇f and ∇g both perpendicular to tangent plane → parallel.

**LEFT** `[text]`

**Theorem:** If $f$ has local extremum at $P_0$ on $g=k$ and $\nabla g(P_0)\neq\mathbf{0}$, then $\nabla f(P_0)=\lambda\nabla g(P_0)$.

**Idea:** Let $\mathbf{r}(t)$ be any smooth path on $g=k$ through $P_0$. Then $g(\mathbf{r}(t))=k$, differentiate: $\nabla g\cdot\mathbf{r}'=0$ so $\nabla g$ is perpendicular to the surface. Since $f$ has extremum, $\nabla f$ also perpendicular. Two vectors perpendicular to same plane are parallel.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a smooth surface (part of a sphere) with a point P. Show tangent plane at P. Draw ∇g as an arrow perpendicular to surface, and ∇f as another arrow parallel. Label λ scalar. Use matplotlib 3D.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')

# sphere surface
phi, theta = np.meshgrid(np.linspace(0,np.pi,20), np.linspace(0,2*np.pi,20))
r=2
X = r*np.sin(phi)*np.cos(theta)
Y = r*np.sin(phi)*np.sin(theta)
Z = r*np.cos(phi)
ax.plot_wireframe(X,Y,Z, alpha=0.3)

# point P
P = np.array([1.2,1.6,1.2])
ax.scatter(P[0],P[1],P[2],color='red',s=80)

# tangent plane (small patch)
u = np.linspace(-0.5,0.5,2)
v = np.linspace(-0.5,0.5,2)
U,V = np.meshgrid(u,v)
# tangent vectors: approximate by plane perpendicular to P (since sphere)
n = P / np.linalg.norm(P)  # normal
# create orthonormal basis
e1 = np.array([1,0,0]) if abs(n[0])<0.9 else np.array([0,1,0])
e1 = e1 - np.dot(e1,n)*n
e1 = e1/np.linalg.norm(e1)
e2 = np.cross(n, e1)
plane = P + U[...,None]*e1 + V[...,None]*e2
ax.plot_surface(plane[:,:,0], plane[:,:,1], plane[:,:,2], alpha=0.4, color='gray')

# gradient arrows
ax.quiver(P[0],P[1],P[2], 2*P[0],2*P[1],2*P[2], color='blue', length=0.5, label='∇g')
ax.quiver(P[0],P[1],P[2], 2*P[0],2*P[1],2*P[2], color='green', length=0.5, alpha=0.7, label='∇f parallel')

ax.legend()
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')
plt.show()
```

**Teacher Narration** `[91w]`
> For those wanting a deeper understanding, here is the intuition behind the proof. Consider any smooth path on the constraint surface through the optimum point. Because the path stays on g equals k, its velocity vector is perpendicular to the gradient of g. Since f has an extremum along that path, its gradient dot the velocity is zero, so ∇f is also perpendicular to every velocity vector. That means both gradients are perpendicular to the same plane — so they must be parallel. This is the geometric heart of the theorem.

---

### Slide 10 · [PRACTICE] 🟡
**Tricky: Closest/Farthest Point on a Sphere**  ·  `split_left_right`

**On-screen text** `[15w]`
Closest and farthest points are opposite ends of a diameter through the external point's projection.

**LEFT** `[text]`

**Problem:** Find points on sphere $x^2+y^2+z^2=4$ closest to and farthest from $(3,1,-1)$.

- Minimize $d^2=(x-3)^2+(y-1)^2+(z+1)^2$.
- Constraint: $g=x^2+y^2+z^2=4$.
- Equate gradients, solve.
- Result: $λ=1\pm\frac{\sqrt{11}}{2}$.
- **Closest:** $(6/\sqrt{11},\,2/\sqrt{11},\,-2/\sqrt{11})$.
- **Farthest:** $(-6/\sqrt{11},\,-2/\sqrt{11},\,2/\sqrt{11})$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Sphere radius 2. Mark external point P=(3,1,-1) outside. Draw line from P to closest point (in green) and from P to farthest point (in red). Use matplotlib 3D. Show coordinate axes.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d')

# sphere
phi, theta = np.meshgrid(np.linspace(0,np.pi,30), np.linspace(0,2*np.pi,30))
r=2
X = r*np.sin(phi)*np.cos(theta)
Y = r*np.sin(phi)*np.sin(theta)
Z = r*np.cos(phi)
ax.plot_wireframe(X,Y,Z, alpha=0.3)

# external point
P = np.array([3,1,-1])
ax.scatter(P[0],P[1],P[2], color='orange', s=100, label='External point')

# closest and farthest
closest = np.array([6/np.sqrt(11), 2/np.sqrt(11), -2/np.sqrt(11)])
farthest = -closest
ax.scatter(closest[0],closest[1],closest[2], color='green', s=100, label='Closest')
ax.scatter(farthest[0],farthest[1],farthest[2], color='red', s=100, label='Farthest')

# lines
ax.plot([P[0],closest[0]],[P[1],closest[1]],[P[2],closest[2]], 'g--')
ax.plot([P[0],farthest[0]],[P[1],farthest[1]],[P[2],farthest[2]], 'r--')

ax.legend()
ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')
plt.show()
```

**Teacher Narration** `[89w]`
> Here is a classic geometry problem. Find the points on a sphere nearest to and farthest from a given external point. We minimize the squared distance because it has the same optimum as distance. Setting up the Lagrange equations leads to a system where x, y, z are all proportional to the corresponding components of the external point. The algebra yields two opposite points on the sphere. The closest point lies along the line from the sphere's center to the external point, and the farthest is the opposite point.

---

### Slide 11 · [PAUSE_AND_TRY] 🟡 ⏸️ *[YouTube Pause]*
**Pause: What if the external point is inside the sphere?**  ·  `split_left_right`

**On-screen text** `[8w]`
Pause: Consider point (1,0,0) inside sphere radius 2.

**LEFT** `[text]`

**Think:** If the point $(3,1,-1)$ were inside the sphere (radius > distance from origin), would the closest point still be along that line? Would there be a farthest? Predict before proceeding.

**RIGHT** `[visual_spec]`

*Visual Spec:* Simple diagram: sphere radius 2, a point inside near origin. No code needed, just image description.

**Teacher Narration** `[75w]`
> Pause the video for a moment. Suppose the external point is inside the sphere, for example (1,0,0) inside a sphere of radius 2. What would be the closest and farthest points on the sphere? Would the closest still be along the line through the center? Would the farthest be the opposite point? Think about the geometry and then resume. This thought experiment helps solidify your understanding of how the Lagrange method works in different scenarios.

**Student Prompt:** If the point is inside the sphere, how do the closest and farthest points change?

---

### Slide 12 · [CORE] 🟡
**Two Constraints: Formula**  ·  `split_left_right`

**On-screen text** `[5w]`
∇f = λ∇g + μ∇h

**LEFT** `[formula_block]`

**Two constraints:**
$$\nabla f = \lambda \nabla g + \mu \nabla h$$
$$g(x,y,z)=k,\quad h(x,y,z)=c$$

Now the gradient of f is a **linear combination** of the two constraint gradients.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of a plane and a cylinder intersecting in a curve. At a point on that curve, show three arrows: ∇g (normal to plane), ∇h (normal to cylinder), and ∇f as linear combination (in the plane spanned by them). Use different colors. Animate or static.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d')

# plane: x - y + z = 1
x = np.linspace(-2,2,10)
y = np.linspace(-2,2,10)
X,Y = np.meshgrid(x,y)
Z = 1 - X + Y
ax.plot_surface(X,Y,Z, alpha=0.4, color='cyan')

# cylinder: x^2 + y^2 = 1
theta = np.linspace(0,2*np.pi,50)
z_cyl = np.linspace(-2,2,10)
T, Z_cyl = np.meshgrid(theta, z_cyl)
Xc = np.cos(T)
Yc = np.sin(T)
ax.plot_surface(Xc,Yc,Z_cyl, alpha=0.3, color='orange')

# point on intersection (approximate)
P = np.array([0.6, 0.8, 1 - 0.6 + 0.8])
ax.scatter(P[0],P[1],P[2], color='red', s=80)

# gradients
# ∇g = (1,-1,1) normal to plane
# ∇h = (2x,2y,0)
grad_g = np.array([1,-1,1])
grad_h = np.array([2*P[0], 2*P[1], 0])
ax.quiver(P[0],P[1],P[2], grad_g[0], grad_g[1], grad_g[2], color='blue', length=0.3, label='∇g')
ax.quiver(P[0],P[1],P[2], grad_h[0], grad_h[1], grad_h[2], color='green', length=0.3, label='∇h')
# ∇f as combination (arbitrary example)
grad_f = 0.5*grad_g + 0.3*grad_h
ax.quiver(P[0],P[1],P[2], grad_f[0], grad_f[1], grad_f[2], color='red', length=0.3, label='∇f = λ∇g+μ∇h')

ax.set_xlabel('x'); ax.set_ylabel('y'); ax.set_zlabel('z')
ax.legend()
plt.show()
```

**Teacher Narration** `[70w]`
> When there are two constraints, the intersection is typically a curve. At an optimum on that curve, the gradient of f must lie in the plane spanned by the gradients of the two constraints. That is, ∇f is a linear combination with coefficients λ and μ. The method now gives five equations: one vector equation (three components) plus the two constraint equations. We solve for x, y, z, λ, μ.

---

### Slide 13 · [PRACTICE] 🟡
**Application: Two Constraints Example**  ·  `full_width`

**On-screen text** `[12w]`
Max f = 3+√29 ≈ 8.385, Min f = 3-√29 ≈ -2.385.

**FULL WIDTH** `[text]`

**Problem:** Maximize $f=x+2y+3z$ on intersection of plane $x-y+z=1$ and cylinder $x^2+y^2=1$.

| Step | Action | Detail |
|------|--------|--------|
| 1 | Set ∇f = λ∇g + μ∇h | ∇f=⟨1,2,3⟩, ∇g=⟨1,-1,1⟩, ∇h=⟨2x,2y,0⟩ |
| 2 | Write components | 1=λ+2μx, 2=-λ+2μy, 3=λ |
| 3 | From z: λ=3 | Substitute |
| 4 | Solve for x,y in μ | x=-1/μ, y=5/(2μ) |
| 5 | Use cylinder | x²+y²=1 → μ²=29/4 → μ=±√29/2 |
| 6 | Find points | (x,y,z) from μ signs |
| 7 | Evaluate f | Max: 3+√29, Min: 3-√29 |

**Teacher Narration** `[92w]`
> Here is a full problem with two constraints. The function is linear, the constraints are a plane and a cylinder. Using the two-constraint formula, we set up the equations. Notice from the z-component we immediately get λ equals 3. Then we solve for x and y in terms of μ using the plane constraint? Actually we used the cylinder and the equations from x and y. Plugging into the cylinder gives μ squared. Taking both signs yields two points, one giving the maximum, the other the minimum on the ellipse of intersection.

---

### Slide 14 · [MISCONCEPTION] 🔴 *[Challenge – Optional]*
**[Challenge – Optional] When Lagrange Fails: ∇g = 0**  ·  `split_left_right`

**On-screen text** `[12w]`
If ∇g=0 at the candidate, Lagrange theorem does not apply. Check separately!

**LEFT** `[text]`

**Example:** Minimize $f(x,y)=x$ on $y^2+x^4-x^3=0$ (piriform curve).

- Lagrange: ∇f=⟨1,0⟩, ∇g=⟨4x³-3x²,2y⟩.
- Equations: 1=λ(4x³-3x²), 0=λ·2y.
- From 0=2λy: either λ=0 or y=0.
- λ=0 impossible (1=0). So y=0.
- Then constraint: x⁴-x³=0 → x=0 or x=1.
- At x=1: ∇g=⟨1,0⟩, fine.
- At x=0: ∇g=⟨0,0⟩! **Lagrange fails** because ∇g=0.
- Actual minimum is at (0,0): f=0 (smallest x on curve).

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot the curve over x in [0,1.2]. Show cusp at (0,0) where the gradient is zero. Mark Lagrange candidate at (1,0) and actual min at (0,0). Use different colors for curve branches (y positive and negative).

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0,1.2,200)
y_sq = x**3 - x**4  # y^2
valid = y_sq >= 0
x_valid = x[valid]
y_sq_valid = y_sq[valid]
y_pos = np.sqrt(y_sq_valid)
y_neg = -np.sqrt(y_sq_valid)

fig, ax = plt.subplots(figsize=(6,6))
ax.plot(x_valid, y_pos, 'b', label='y>0')
ax.plot(x_valid, y_neg, 'b', label='y<0')
ax.scatter([1],[0], color='red', s=80, label='Lagrange candidate')
ax.scatter([0],[0], color='green', s=80, label='Actual min (∇g=0)')
ax.axvline(0, color='gray', linestyle='--')
ax.set_xlabel('x'); ax.set_ylabel('y')
ax.set_title('Piriform curve: y² + x⁴ - x³ = 0')
ax.legend()
plt.axis('equal')
plt.show()
```

**Teacher Narration** `[72w]`
> A critical edge case: Lagrange multipliers require that the gradient of the constraint is not zero at the optimum. If it is zero, the method fails. Here, the piriform curve has a cusp at the origin, where the gradient vanishes. The Lagrange equations lead to a contradiction at that point, so we would miss the true minimum. Always check whether ∇g is zero on the constraint surface; those points are candidates too.

---

### Slide 15 · [SUMMARIZE]
**Summary and Key Takeaways**  ·  `split_left_right`

**On-screen text** `[7w]`
∇f = λ∇g   |   λ = sensitivity

**LEFT** `[text]`

**Lagrange Multiplier Method**
1. For one constraint: ∇f = λ∇g.
2. For multiple constraints: ∇f = Σ λ_i ∇g_i.
3. Check interior points if domain has interior.
4. Check if ∇g=0 on the constraint — Lagrange may miss those.
5. Lagrange gives candidates, but doesn't distinguish max/min — compare values.

λ measures sensitivity: how much the optimum changes when constraint is relaxed.

**RIGHT** `[visual_spec]`

*Visual Spec:* A 2D schematic: a few contour lines of f, the constraint curve g=k, a point where they are tangent, with ∇f and ∇g parallel arrows. Below, a small table listing λ= sensitivity. Use matplotlib.

```python
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(6,4))

# contour circles
r = [0.5,1,1.5,2,2.5]
for ri in r:
    circle = plt.Circle((0,0), ri, fill=False, color='blue', alpha=0.5)
    ax.add_patch(circle)

# constraint ellipse
theta = np.linspace(0,2*np.pi,100)
a=1.2; b=0.8
xe = a*np.cos(theta)
ye = b*np.sin(theta)+0.2
ax.plot(xe, ye, 'k', linewidth=2, label='g=k')

# tangent point
P = np.array([0.6,0.6])
ax.scatter(P[0],P[1],color='red',s=50)
ax.arrow(P[0],P[1],1.2,0.8, head_width=0.1, color='blue', label='∇f')
ax.arrow(P[0],P[1],1.2,0.8, head_width=0.1, color='green', alpha=0.7, label='∇g')

ax.set_aspect('equal')
ax.legend()
ax.set_xlim(-3,3)
ax.set_ylim(-3,3)
plt.show()
```

**Teacher Narration** `[85w]`
> Let's review the key ideas. Lagrange multipliers solve constrained optimization by equating gradients. With one constraint, ∇f must be parallel to ∇g. With more constraints, it's a linear combination. Always remember to check interior critical points when the domain is closed and bounded, and watch out for points where the constraint gradient vanishes. The multiplier λ itself tells you how sensitive the optimal value is to the constraint constant. This method is a cornerstone of multivariable calculus and appears everywhere in physics, economics, and engineering.

---
