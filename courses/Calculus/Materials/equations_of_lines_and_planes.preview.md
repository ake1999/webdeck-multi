# Equations of Lines and Planes

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 92%

> **Prerequisite:** You need dot product, cross product, and position vectors.

**Learning Objectives:**
- Calculate parametric and symmetric equations of lines in 3D
- Determine whether two lines intersect, are parallel, or are skew
- Derive scalar and vector equations of planes from normal vectors and points
- Compute the line of intersection between two planes and find angles between planes
- Apply dot and cross products to solve geometric problems involving lines and planes

---

## v3.1 Production Readiness

✅ **Interactive moments:** 6 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 66w)
⚠️ **Narration too short (<60w):** [6]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 2 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s6:51w']
⚠️ **visual_specs**: missing on slides: [9]
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
| 1 | 🎛hook | 🟢 | ◧ |  | 79w | 20w | Why Lines and Planes? |
| 2 | 🎛core | 🟢 | ◧ |  | 69w | 15w | Vector and Parametric Equations of a Line |
| 3 | practice | 🟢 | ⬛⬛ | ⏸️ | 73w | 11w | Example 1 (Warm-Up): Find Parametric Equations |
| 4 | 🎛core | 🟢 | ◧ |  | 67w | 26w | Equations of a Plane: Vector and Scalar |
| 5 | practice | 🟡 | ⬛⬛ |  | 61w | 13w | Example 2 (Standard): Plane Through Three Points |
| 6 | 🎛visual_lab | 🟡 | ◧ | ⏸️ | 51w⚠️ | 7w | Interactive Plane Explorer |
| 7 | 🎛core | 🟢 | ◧ |  | 68w | 14w | Distances and Angles |
| 8 | core | 🟡 | ◧ |  | 64w | 8w | Theorem: Line of Intersection of Two Planes |
| 9 | pause_and_try | 🔴 | ◧ | ⏸️ | 66w | 10w | [Challenge – Optional] Example 3 (Tricky): Skew or Intersecting? |
| 10 | misconception | 🟢 | ◧ |  | 60w | 14w | Common Mistake: Stopping After Checking Parallel |
| 11 | practice | 🟡 | ⬛⬛ |  | 72w | 12w | Example 4 (Edge Case): Zero Component in Direction |
| 12 | practice | 🟡 | ⬛⬛ |  | 66w | 13w | Example 5 (Application): Angle Between Two Planes |
| 13 | 🎛visual_lab | 🟡 | ◧ |  | 62w | 9w | Interactive Angle Between Planes |
| 14 | summary | 🟢 | ⬛⬛ |  | 73w | 22w | Summary: Lines and Planes Toolkit |

---

### Slide 1 · [HOOK] 🎛 *[3 controls]*
**Why Lines and Planes?**  ·  `split_left_right`

**On-screen text** `[20w]`
Lines describe motion; planes describe surfaces. Both need a point and a direction (for lines) or a normal (for planes).

**LEFT** `[text]`

Every flight path, laser beam, and architectural roof relies on lines and planes in 3D space. Understanding them means you can describe any straight path or flat surface mathematically.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a 3D scene: a tilted plane with equation 2x+3y+z=6 (using meshgrid), a line through point (1,1,1) with direction vector (3,-1,2), and axes labeled. Make plane semi-transparent with alpha=0.4. Add a small sphere at the point. Title: 'Lines and Planes in 3D'.

*Interactive Controls:*
  - 🎛 Slider: change the line parameter t range
  - 🎛 Toggle: show/hide the plane equation
  - 🎛 Radio: view from different angles (top, side, front)

```python
import numpy as np; import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; fig = plt.figure(figsize=(8,6)); ax = fig.add_subplot(111, projection='3d'); x = np.linspace(-2,4,10); y = np.linspace(-2,4,10); X,Y = np.meshgrid(x,y); Z = 6 - 2*X - 3*Y; ax.plot_surface(X,Y,Z, alpha=0.4, color='cyan'); t = np.linspace(-2,2,10); line_x = 1+3*t; line_y = 1 - t; line_z = 1+2*t; ax.plot(line_x, line_y, line_z, 'r-', linewidth=2); ax.scatter([1],[1],[1], color='k', s=50); ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z'); ax.set_title('Lines and Planes in 3D'); plt.show()
```

**Teacher Narration** `[79w]`
> Think about a plane taking off. Its path is a straight line through space. The runway is a flat plane. To describe either mathematically, you need two things: a starting point and a direction. For a line, the direction is a vector along it. For a plane, the direction is a vector perpendicular to it. That perpendicular vector is called the normal. Today we'll see how to write equations for both, and how to compute distances, angles, and intersections.

---

### Slide 2 · [CORE] 🎛 *[3 controls]*
**Vector and Parametric Equations of a Line**  ·  `split_left_right`

**On-screen text** `[15w]`
A line needs a point and a direction. Parameter t moves you along the line.

**LEFT** `[formula_block]`

$$\mathbf{r}(t) = \mathbf{r}_0 + t\mathbf{v}$$
$$x = x_0 + at, \quad y = y_0 + bt, \quad z = z_0 + ct$$
where $\mathbf{v} = \langle a,b,c \rangle$ is direction, $t \in \mathbb{R}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot 3D axes, a line through (1,2,3) with direction (2,-1,4). Show the point as a red dot. Draw an arrow from that point along the direction vector. Label the point 'r0' and the arrow 'v'. Include grid. Use quiver for arrow.

*Interactive Controls:*
  - 🎛 Slider: change the parameter t to move a point along the line
  - 🎛 Toggle: show/hide the direction vector arrow
  - 🎛 Button: reset view to default

```python
import numpy as np; import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; fig = plt.figure(figsize=(8,6)); ax = fig.add_subplot(111, projection='3d'); t = np.linspace(-2,2,10); x = 1+2*t; y = 2 - t; z = 3+4*t; ax.plot(x,y,z, 'b-', linewidth=2); ax.scatter([1],[2],[3], color='r', s=80, label='r0'); ax.quiver(1,2,3,2,-1,4, color='g', length=1, normalize=True, label='v'); ax.set_xlim(-5,5); ax.set_ylim(-5,5); ax.set_zlim(-5,5); ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z'); ax.legend(); ax.set_title('Line: r(t) = r0 + t v'); plt.show()
```

**Teacher Narration** `[69w]`
> We describe a line with a starting point r0 and a direction vector v. As t increases, you move along the line. If t is negative, you go backwards. The parametric equations just break that into x, y, and z components. For example, if v = (2,-1,4), then x increases by 2 each unit of t, y decreases by 1, and z increases by 4. That's the whole line.

---

### Slide 3 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Example 1 (Warm-Up): Find Parametric Equations**  ·  `full_width`

**On-screen text** `[11w]`
Point (1,-2,4) + t * (3,-1,2) → parametric: x=1+3t, y=-2-t, z=4+2t.

**FULL WIDTH** `[steps]`

**Problem:** Line through (1,-2,4) parallel to $\mathbf{v} = \langle 3,-1,2 \rangle$.

| Step | Action |
|------|--------|
| 1 | $\mathbf{r}_0 = \langle 1,-2,4 \rangle$, $\mathbf{v} = \langle 3,-1,2 \rangle$ |
| 2 | $\mathbf{r}(t) = \langle 1,-2,4 \rangle + t \langle 3,-1,2 \rangle$ |
| 3 | $x = 1+3t$, $y = -2 - t$, $z = 4+2t$ |
| 4 | Check: $t=0$ gives (1,-2,4); $t=1$ gives (4,-3,6) |

**Teacher Narration** `[73w]`
> Let's do a simple example. We have a point and a direction vector. The vector equation is just that point plus t times the direction. Then we break it into components. Notice the coefficients of t are exactly the components of v. At t=0 we are at the given point; at t=1 we've moved one step along the line. You can always verify that the line passes through the point by plugging t=0.

**Student Prompt:** Write parametric equations for the line through (0,0,0) with direction (2,-1,5). Pause and try.

---

### Slide 4 · [CORE] 🎛 *[3 controls]*
**Equations of a Plane: Vector and Scalar**  ·  `split_left_right`

**On-screen text** `[26w]`
A plane is defined by a point and a normal vector n. Any point r in the plane satisfies n · (r - r0) = 0.

**LEFT** `[formula_block]`

Vector: $\mathbf{n} \cdot (\mathbf{r} - \mathbf{r}_0) = 0$
Scalar: $a(x-x_0)+b(y-y_0)+c(z-z_0)=0$
or $ax+by+cz+d=0$ with $d=-(ax_0+by_0+cz_0)$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a plane (e.g., 2x+3y+z=6) as a surface, point r0=(1,1,1) as a red dot, and a normal arrow from that point (2,3,1). Label 'n' and 'r0'. Use semi-transparent plane.

*Interactive Controls:*
  - 🎛 Slider: change the normal vector components (a, b, c)
  - 🎛 Toggle: show/hide the plane equation on the plot
  - 🎛 Button: reset to default normal

```python
import numpy as np; import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; fig = plt.figure(figsize=(8,6)); ax = fig.add_subplot(111, projection='3d'); x = np.linspace(-2,4,10); y = np.linspace(-2,4,10); X,Y = np.meshgrid(x,y); Z = 6-2*X-3*Y; ax.plot_surface(X,Y,Z, alpha=0.5, color='cyan'); ax.scatter([1],[1],[1], color='r', s=80, label='r0'); ax.quiver(1,1,1,2,3,1, color='k', length=1, normalize=True, label='normal n'); ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z'); ax.legend(); ax.set_title('Plane with Normal Vector'); plt.show()
```

**Teacher Narration** `[67w]`
> For a plane, the key is the normal vector. It's perpendicular to every direction lying in the plane. So if you take any point r on the plane, the vector from r0 to r must be perpendicular to n. That dot product equals zero. Expanding gives the scalar equation, which is a linear equation in x,y,z. The coefficients a,b,c are exactly the components of the normal vector.

---

### Slide 5 · [PRACTICE] 🟡
**Example 2 (Standard): Plane Through Three Points**  ·  `full_width`

**On-screen text** `[13w]`
Three points → two vectors → cross product → normal → scalar equation.

**FULL WIDTH** `[steps]`

**Problem:** Plane through P(1,3,2), Q(3,-1,6), R(5,2,0).

| Step | Action |
|------|--------|
| 1 | Vectors: $\overrightarrow{PQ}=\langle 2,-4,4 \rangle$, $\overrightarrow{PR}=\langle 4,-1,-2 \rangle$ |
| 2 | Normal: $\mathbf{n} = \overrightarrow{PQ} \times \overrightarrow{PR}$ |
| 3 | Compute: $\mathbf{n} = \langle (-4)(-2)-(4)(-1), -[(2)(-2)-(4)(4)], (2)(-1)-(-4)(4) \rangle$ |
| 4 | $\mathbf{n} = \langle 12, 20, 14 \rangle$ (simplify to $\langle 6,10,7 \rangle$) |
| 5 | Scalar eq: $6(x-1)+10(y-3)+7(z-2)=0$ → $6x+10y+7z=50$ |

**Teacher Narration** `[61w]`
> Given three points, we first find two non-parallel vectors in the plane. Then the cross product gives a normal vector. With that normal and any of the three points, we write the scalar equation. Notice we simplified the normal vector by dividing by 2. That's fine because any scalar multiple of a normal is still normal. The final equation is 6x+10y+7z=50.

---

### Slide 6 · [VISUAL_LAB] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[4 controls]*
**Interactive Plane Explorer**  ·  `split_left_right`

**On-screen text** `[7w]`
Slide to change plane. Toggle normal arrow.

**LEFT** `[text]`

Adjust the plane parameters and see how the normal vector and plane change.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D interactive plot using matplotlib widgets: sliders for a, b, c (plane eq: ax+by+cz=1) and a toggle to show/hide normal vector. The plane updates in real time. Initial a=2, b=3, c=1. Use ipywidgets or matplotlib.widgets. For compatibility with JSON, use matplotlib.widgets. Include grid and axes.

*Interactive Controls:*
  - 🎛 Slider for a from 0.1 to 5.0
  - 🎛 Slider for b from 0.1 to 5.0
  - 🎛 Slider for c from 0.1 to 5.0
  - 🎛 Checkbox 'Show normal'

```python
import numpy as np; import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; from matplotlib.widgets import Slider, CheckButtons; fig = plt.figure(figsize=(10,8)); ax = fig.add_subplot(111, projection='3d', position=[0.1,0.2,0.8,0.7]); plt.subplots_adjust(bottom=0.25); x = np.linspace(-2,2,20); y = np.linspace(-2,2,20); X,Y = np.meshgrid(x,y); a0,b0,c0 = 2,3,1; Z0 = (1 - a0*X - b0*Y)/c0; surf = ax.plot_surface(X,Y,Z0, alpha=0.5, color='cyan'); point = np.array([0,0,0]); n = np.array([a0,b0,c0]); quiv = ax.quiver(0,0,0, a0,b0,c0, color='k', length=1, normalize=True); ax.set_xlim(-2,2); ax.set_ylim(-2,2); ax.set_zlim(-2,2); ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z'); ax.set_title('Plane: ax+by+cz=1'); ax_slider_a = plt.axes([0.1,0.1,0.3,0.03]); ax_slider_b = plt.axes([0.1,0.05,0.3,0.03]); ax_slider_c = plt.axes([0.1,0.0,0.3,0.03]); slider_a = Slider(ax_slider_a, 'a', 0.1, 5.0, valinit=a0); slider_b = Slider(ax_slider_b, 'b', 0.1, 5.0, valinit=b0); slider_c = Slider(ax_slider_c, 'c', 0.1, 5.0, valinit=c0); ax_check = plt.axes([0.5,0.05,0.1,0.03]); check = CheckButtons(ax_check, ['Show normal'], [True]); def update(val): a = slider_a.val; b = slider_b.val; c = slider_c.val; Z = (1 - a*X - b*Y)/c; ax.collections.clear(); surf = ax.plot_surface(X,Y,Z, alpha=0.5, color='cyan'); n = np.array([a,b,c]); if check.get_status()[0]: ax.quiver(0,0,0, a,b,c, color='k', length=1, normalize=True); fig.canvas.draw_idle(); slider_a.on_changed(update); slider_b.on_changed(update); slider_c.on_changed(update); check.on_clicked(update); plt.show()
```

**Teacher Narration** `[51w ⚠️ **TOO SHORT: 51w < 60w min**]`
> Use the sliders to change the coefficients of the plane equation. Notice how the plane tilts and the normal vector changes accordingly. The normal always stays perpendicular to the plane. You can also hide the normal to see just the plane. This visualises the connection between a,b,c and the plane's orientation.

**Student Prompt:** Predict: What happens when a=0? What does the plane look like?

---

### Slide 7 · [CORE] 🎛 *[3 controls]*
**Distances and Angles**  ·  `split_left_right`

**On-screen text** `[14w]`
Key formulas: distance from point to line, point to plane, and angle between planes.

**LEFT** `[formula_block]`

Point to line: $D = \frac{|\mathbf{v} \times (\mathbf{r}_1-\mathbf{r}_0)|}{|\mathbf{v}|}$

Point to plane: $D = \frac{|ax_1+by_1+cz_1+d|}{\sqrt{a^2+b^2+c^2}}$

Angle between planes: $\cos\theta = \frac{|\mathbf{n}_1 \cdot \mathbf{n}_2|}{|\mathbf{n}_1||\mathbf{n}_2|}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Three small diagrams: (1) point to line: parallelogram area divided by base; (2) point to plane: perpendicular distance; (3) two planes with normals and angle theta. Use simple 2D/3D sketches. For the purpose of JSON, just a placeholder description.

*Interactive Controls:*
  - 🎛 Slider: change the point position to see distance change
  - 🎛 Toggle: show/hide the perpendicular projection lines
  - 🎛 Button: cycle through the three diagrams

**Teacher Narration** `[68w]`
> These three formulas are workhorses. The distance from a point to a line uses the cross product to find the area of a parallelogram. The distance from a point to a plane uses the dot product to project onto the normal. And the angle between planes is just the acute angle between their normals. Remember to take absolute value in the dot product to get the acute angle.

---

### Slide 8 · [CORE] 🟡
**Theorem: Line of Intersection of Two Planes**  ·  `split_left_right`

**On-screen text** `[8w]`
Intersection line direction = cross product of normals.

**LEFT** `[concept]`

If two non-parallel planes intersect, their intersection is a line with direction $\mathbf{v} = \mathbf{n}_1 \times \mathbf{n}_2$.

**Reason:** The line lies in both planes, so its direction is perpendicular to both normals. The cross product gives exactly that direction.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot of two non-parallel planes (e.g., 2x+y+z=3 and x-2y+z=1) intersecting along a red line. Show normals as arrows from a common point. The line is thick and red. Use different colors for planes with alpha. Label axes.

```python
import numpy as np; import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; fig = plt.figure(figsize=(8,6)); ax = fig.add_subplot(111, projection='3d'); x = np.linspace(-3,3,20); y = np.linspace(-3,3,20); X,Y = np.meshgrid(x,y); Z1 = 3 - 2*X - Y; Z2 = (1 - X + 2*Y)/1; ax.plot_surface(X,Y,Z1, alpha=0.4, color='blue'); ax.plot_surface(X,Y,Z2, alpha=0.4, color='green'); # intersection line param: solve equations, find a point and direction; hardcoded direction = cross(n1,n2) = (1*1 - 1*1, 1*? ) better to compute; for demo, use known line: direction = (3, -3, 3)? Actually compute: n1=(2,1,1), n2=(1,-2,1) cross = (1*1 - 1*(-2), 1*1 - 2*1, 2*(-2)-1*1) = (1+2, 1-2, -4-1) = (3,-1,-5). Find a point: set x=0 => y+z=3 and -2y+z=1 => subtract: 3y=2 => y=2/3, z=7/3. So line: (0,2/3,7/3)+t(3,-1,-5). t = np.linspace(-1,1,10); lx = 0+3*t; ly = 2/3 - t; lz = 7/3 -5*t; ax.plot(lx,ly,lz, 'r-', linewidth=3, label='intersection'); ax.quiver(0,2/3,7/3,2,1,1, color='blue', length=1, normalize=True, label='n1'); ax.quiver(0,2/3,7/3,1,-2,1, color='green', length=1, normalize=True, label='n2'); ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z'); ax.legend(); ax.set_title('Intersection of Two Planes'); plt.show()
```

**Teacher Narration** `[64w]`
> When two planes intersect, they meet along a line. Any direction vector of that line must be perpendicular to both normals because the line lies in each plane. The cross product gives us exactly that perpendicular direction. So to find the line of intersection, we take the cross product of the normals as the direction, then find any point that satisfies both plane equations.

---

### Slide 9 · [PAUSE_AND_TRY] 🔴 *[Challenge – Optional]* ⏸️ *[YouTube Pause]*
**[Challenge – Optional] Example 3 (Tricky): Skew or Intersecting?**  ·  `split_left_right`

**On-screen text** `[10w]`
Are these lines parallel, intersecting, or skew? Pause and try.

**LEFT** `[text]`

**Problem:** Determine whether $L_1: x=-6t, y=1+9t, z=-3t$ and $L_2: x=1+2s, y=4-3s, z=s$ are parallel, intersecting, or skew.

Try it now. Pause the video.

**RIGHT** `[empty]`

**Teacher Narration** `[66w]`
> Here's a classic tricky problem. First check direction vectors. v1 = (-6,9,-3), v2 = (2,-3,1). Notice v1 = -3 v2, so they are parallel. That rules out skew and intersecting. But parallel lines could still be coincident. Check if a point on L1 (say t=0 gives (0,1,0)) lies on L2. Solve for s: 0=1+2s → s=-0.5, then y=4-3(-0.5)=5.5, not 1. So they are parallel but distinct.

**Student Prompt:** Pause and solve. Then press play to check.

---

### Slide 10 · [MISCONCEPTION]
**Common Mistake: Stopping After Checking Parallel**  ·  `split_left_right`

**On-screen text** `[14w]`
Parallel ≠ coincident. Always check if a point from one lies on the other.

**LEFT** `[text]`

**Wrong approach:** See direction vectors are multiples → conclude lines are parallel and stop.

**Why wrong:** They may be coincident! Always test if a point of one lies on the other.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot: two lines with same direction but different positions: one through (0,0,0) with dir (1,1,1) in blue, another through (1,0,0) with same dir in red, slightly offset. Show they are distinct. Also show a second pair where they coincide (overlap). Use different line styles.

```python
import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; import numpy as np; fig = plt.figure(figsize=(8,6)); ax = fig.add_subplot(111, projection='3d'); t = np.linspace(0,2,10); # parallel distinct: L1: (0,0,0)+t(1,1,1); L2: (1,0,0)+t(1,1,1); ax.plot(t,t,t, 'b-', label='L1'); ax.plot(1+t, t, t, 'r--', label='L2'); # coincident: L3: (2,2,2)+t(1,1,1) same as L1 shifted; ax.plot(2+t,2+t,2+t, 'g:', label='L3 (coincident)'); ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z'); ax.legend(); ax.set_title('Parallel vs Coincident Lines'); plt.show()
```

**Teacher Narration** `[60w]`
> A very common mistake: you find the direction vectors are parallel and assume the lines are parallel (and maybe stop there). But they might be the same line! Always test by plugging a point from one line into the parametric equations of the other. If you find a consistent parameter value, they are coincident. Otherwise, they are parallel but distinct.

---

### Slide 11 · [PRACTICE] 🟡
**Example 4 (Edge Case): Zero Component in Direction**  ·  `full_width`

**On-screen text** `[12w]`
Zero component in direction → coordinate constant. Symmetric eq: keep constant separate.

**FULL WIDTH** `[steps]`

**Problem:** Write symmetric equations for line through (2,-1,3) with direction $\mathbf{v}=\langle 0,4,-2 \rangle$.

| Step | Action |
|------|--------|
| 1 | Parametric: $x=2$, $y=-1+4t$, $z=3-2t$ |
| 2 | Solve for t: $t = \frac{y+1}{4} = \frac{3-z}{2}$ |
| 3 | $x=2$ stands alone. Symmetric: $x=2,\ \frac{y+1}{4} = \frac{3-z}{2}$ |

**Teacher Narration** `[72w]`
> What if a component of the direction vector is zero? That coordinate doesn't change as t varies. In our example, x is always 2. So in symmetric form, we cannot have a denominator of zero. Instead, we write x=2 as a separate equation and the other two ratios equal to each other. Always handle zero components this way. This is a common edge case that tests your understanding of the parametric form.

---

### Slide 12 · [PRACTICE] 🟡
**Example 5 (Application): Angle Between Two Planes**  ·  `full_width`

**On-screen text** `[13w]`
Angle between planes = acute angle between normals. Use absolute value in cosine.

**FULL WIDTH** `[steps]`

**Problem:** Acute angle between planes $2x-y+2z=5$ and $x+2y-2z=8$.

| Step | Action |
|------|--------|
| 1 | Normals: $\mathbf{n}_1=\langle 2,-1,2 \rangle$, $\mathbf{n}_2=\langle 1,2,-2 \rangle$ |
| 2 | Dot: $\mathbf{n}_1\cdot\mathbf{n}_2=2-2-4=-4$ |
| 3 | Magnitudes: $|\mathbf{n}_1|=3$, $|\mathbf{n}_2|=3$ |
| 4 | $\cos\theta = \frac{|-4|}{3\cdot3} = \frac{4}{9}$ |
| 5 | $\theta = \cos^{-1}(4/9) \approx 63.6^\circ$ |

**Teacher Narration** `[66w]`
> This is a common application. The angle between two planes is defined as the acute angle between them, which is the same as the acute angle between their normals. We compute the dot product, magnitudes, then take the absolute value in the cosine formula. Without the absolute value, we would get the obtuse angle (116.4°). Always use absolute value to ensure you get the acute angle.

---

### Slide 13 · [VISUAL_LAB] 🟡 🎛 *[2 controls]*
**Interactive Angle Between Planes**  ·  `split_left_right`

**On-screen text** `[9w]`
Drag slider to rotate plane. The displayed angle updates.

**LEFT** `[text]`

Rotate one plane relative to another and see the angle between them update.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot with two planes, one fixed (normal n1), the other rotates around the intersection line. Use sliders to change the rotation angle. Show normals and display the angle text. Use matplotlib.widgets.

*Interactive Controls:*
  - 🎛 Slider for θ from -80° to 80°
  - 🎛 Output: displayed angle

```python
import numpy as np; import matplotlib.pyplot as plt; from mpl_toolkits.mplot3d import Axes3D; from matplotlib.widgets import Slider; fig = plt.figure(figsize=(8,6)); ax = fig.add_subplot(111, projection='3d'); plt.subplots_adjust(bottom=0.25); x = np.linspace(-2,2,20); y = np.linspace(-2,2,20); X,Y = np.meshgrid(x,y); # plane1: z=0; surf1 = ax.plot_surface(X,Y,0*X, alpha=0.4, color='blue', label='Plane1 (z=0)'); theta0 = 30/180*np.pi; Z2 = -np.tan(theta0)*Y; surf2 = ax.plot_surface(X,Y,Z2, alpha=0.4, color='red', label='Plane2'); # normals: n1=(0,0,1) at (0,0,0); n2=(0, sinθ, cosθ) norm = 1; ax.quiver(0,0,0,0,0,1, color='blue', length=1, normalize=True); quiv2 = ax.quiver(0,0,0,0,np.sin(theta0),np.cos(theta0), color='red', length=1, normalize=True); ax.set_xlim(-2,2); ax.set_ylim(-2,2); ax.set_zlim(-2,2); ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z'); ax.set_title('Angle between planes'); # slider ax_slider = plt.axes([0.1,0.1,0.8,0.03]); slider = Slider(ax_slider, 'θ (deg)', -80, 80, valinit=30); def update(val): theta = slider.val/180*np.pi; # update plane2 Z2 = -np.tan(theta)*Y; ax.collections.clear(); surf1 = ax.plot_surface(X,Y,0*X, alpha=0.4, color='blue'); surf2 = ax.plot_surface(X,Y,Z2, alpha=0.4, color='red'); # update normal n2 = (0, np.sin(theta), np.cos(theta)); ax.quiver(0,0,0,0,0,1, color='blue', length=1, normalize=True); ax.quiver(0,0,0,0,np.sin(theta),np.cos(theta), color='red', length=1, normalize=True); ax.set_title(f'Angle = {abs(slider.val):.1f}°'); fig.canvas.draw_idle(); slider.on_changed(update); plt.show()
```

**Teacher Narration** `[62w]`
> Here you can see two planes intersecting. Use the slider to rotate the red plane. The angle between the planes is the acute angle between their normals, shown in the title. Notice when the planes are almost parallel, the angle is near zero; when perpendicular, near 90 degrees. This interactive tool helps you build intuition for how plane orientation affects the angle.

---

### Slide 14 · [SUMMARY]
**Summary: Lines and Planes Toolkit**  ·  `full_width`

**On-screen text** `[22w]`
Today we built a complete toolkit for lines and planes in 3D. You are ready to solve any geometry problem with these.

**FULL WIDTH** `[text]`

**Key formulas:**

| Concept | Formula |
|---------|---------|
| Vector eq. of line | $\mathbf{r}(t)=\mathbf{r}_0+t\mathbf{v}$ |
| Parametric eq. | $x=x_0+at$, etc. |
| Symmetric eq. | $\frac{x-x_0}{a} = \frac{y-y_0}{b} = \frac{z-z_0}{c}$ |
| Vector eq. of plane | $\mathbf{n}\cdot(\mathbf{r}-\mathbf{r}_0)=0$ |
| Scalar eq. of plane | $ax+by+cz+d=0$ |
| Distance point to line | $D = \frac{|\mathbf{v}\times(\mathbf{r}_1-\mathbf{r}_0)|}{|\mathbf{v}|}$ |
| Distance point to plane | $D = \frac{|ax_1+by_1+cz_1+d|}{\sqrt{a^2+b^2+c^2}}$ |
| Angle between planes | $\cos\theta = \frac{|\mathbf{n}_1\cdot\mathbf{n}_2|}{|\mathbf{n}_1||\mathbf{n}_2|}$ |
| Intersection line dir. | $\mathbf{v} = \mathbf{n}_1 \times \mathbf{n}_2$ |

**Teacher Narration** `[73w]`
> Let's review what we've learned. We started with lines: they need a point and direction. We wrote vector, parametric, and symmetric equations. Then planes: they need a point and a normal vector. We derived the scalar equation. We used cross products to find normals and intersection directions. And we computed distances and angles. You now have a full set of tools for 3D geometry. Practice with the exercises and you'll master this topic.

---
