# The Cross Product

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 100%

> **Prerequisite:** You already know the dot product — a scalar that measures alignment. The cross product yields a vector that measures perpendicularity and area.

**Learning Objectives:**
- Calculate the cross product of two vectors in R³ using the determinant formula
- Interpret the cross product geometrically as a vector orthogonal to both inputs
- Apply the cross product to compute area and test for parallel vectors
- Analyze the algebraic properties, including anti-commutativity

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
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
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
| 1 | 🎛hook | 🟢 | ◧ |  | 88w | 13w | From Scalar to Vector: The Cross Product |
| 2 | 🎛core | 🟢 | ◧ |  | 83w | 9w | Geometric Meaning: Area and Orthogonality |
| 3 | 🎛core | 🟢 | ◧ |  | 73w | 7w | Algebraic Definition |
| 4 | practice | 🟢 | ⬛⬛ |  | 99w | 6w | Warm-Up Example: Direct Computation |
| 5 | 🎛core | 🟢 | ◧ |  | 92w | 11w | The Determinant Method – Easier Computation |
| 6 | practice | 🟢 | ⬛⬛ | ⏸️ | 83w | 11w | Standard Example: Using the Determinant |
| 7 | misconception | 🟡 | ◧ |  | 94w | 14w | Misconception: The J-Component Sign Trap |
| 8 | 🎛visual_lab | 🟢 | ◧ |  | 86w | 14w | Interactive: Adjust Vectors and See Cross Product |
| 9 | core | 🟢 | ◧ |  | 82w | 3w | Right-Hand Rule & Anti-Commutativity |
| 10 | practice | 🟡 | ⬛⬛ | ⏸️ | 79w | 3w | Tricky Example: The Sign Trap in Reverse |
| 11 | challenge | 🔴 | ◧ |  | 81w | 9w | [Challenge – Optional] Proof: Orthogonality |
| 12 | practice | 🟢 | ⬛⬛ |  | 87w | 8w | Edge Case: Parallel Vectors |
| 13 | practice | 🟡 | ⬛⬛ |  | 87w | 7w | Application: Area of a Triangle |
| 14 | core | 🟢 | ◧ |  | 71w | 11w | Algebraic Properties Summary |
| 15 | summary | 🟢 | ⬛⬛ |  | 73w | 12w | What You've Learned |

---

### Slide 1 · [HOOK] 🎛 *[2 controls]*
**From Scalar to Vector: The Cross Product**  ·  `split_left_right`

**On-screen text** `[13w]`
Torque $\mathbf{\tau} = \mathbf{r} \times \mathbf{F}$ gives a vector along the rotation axis.

**LEFT** `[concept]`

Dot product gives a scalar: **how much align**. Cross product gives a **vector**: how much push perpendicular.

**Torque example:** $\mathbf{\tau} = \mathbf{r} \times \mathbf{F}$ — pointing along the rotation axis.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D coordinate system with a rectangle (door) in xz-plane, hinge along z-axis. Arrow r from hinge to hand position (on door edge), arrow F perpendicular to door (in y-direction). Show torque vector τ = r × F pointing up (positive x) with red thick arrow. Label axes x,y,z. Use mplot3d. Show formula τ = r×F on top.

*Interactive Controls:*
  - 🎛 Slider: change force magnitude from 1 to 10
  - 🎛 Toggle: show/hide torque vector label

**Teacher Narration** `[88w]`
> You already know the dot product gives a scalar that tells you how much two vectors align. Now meet its partner: the cross product. Instead of a number, you get a vector. Think of pushing a door open. The force perpendicular to the door creates a torque, and that torque points along the hinge axis. The cross product is exactly that operation: given a position vector and a force, it gives you the torque vector. This is your first real-world glimpse of why we need a vector output.

---

### Slide 2 · [CORE] 🎛 *[2 controls]*
**Geometric Meaning: Area and Orthogonality**  ·  `split_left_right`

**On-screen text** `[9w]`
$\|\mathbf{a} \times \mathbf{b}\| = \|\mathbf{a}\|\|\mathbf{b}\|\sin\theta$  → area of parallelogram.

**LEFT** `[concept]`

Magnitude: $\|\mathbf{a} \times \mathbf{b}\| = \|\mathbf{a}\| \, \|\mathbf{b}\| \, \sin\theta$
= area of parallelogram spanned by $\mathbf{a}$ and $\mathbf{b}$.

Direction: $\mathbf{a} \times \mathbf{b}$ is perpendicular to both $\mathbf{a}$ and $\mathbf{b}$ (right-hand rule).

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot showing two vectors a (blue) and b (red) from origin, parallelogram shaded green, and cross product c (thick green arrow) orthogonal to both. Show area label with numeric value. Use mplot3d, vectors as quiver, parallelogram as polygon fill with alpha=0.3. Add axis labels. Include angle θ arc between a and b.

*Interactive Controls:*
  - 🎛 Slider: change angle θ between a and b from 0 to 180 degrees
  - 🎛 Toggle: show/hide area value

**Teacher Narration** `[83w]`
> The cross product encodes two geometric facts at once. Its magnitude is the area of the parallelogram formed by the two vectors. That's the sine multiplied by the lengths. If they are parallel, sin0 is zero, so the area is zero. And its direction is perpendicular to both inputs, given by the right-hand rule. This orthogonality is why the cross product is so useful: it gives us a way to construct a vector that is guaranteed to be perpendicular to two known vectors.

---

### Slide 3 · [CORE] 🎛 *[2 controls]*
**Algebraic Definition**  ·  `split_left_right`

**On-screen text** `[7w]`
$\mathbf{a}\times\mathbf{b} = \langle a_2b_3-a_3b_2,\; a_3b_1-a_1b_3,\; a_1b_2-a_2b_1 \rangle$

**LEFT** `[formula_block]`

For $\mathbf{a}=\langle a_1,a_2,a_3\rangle$, $\mathbf{b}=\langle b_1,b_2,b_3\rangle$:

$$\mathbf{a} \times \mathbf{b} = \langle a_2b_3-a_3b_2,\; a_3b_1-a_1b_3,\; a_1b_2-a_2b_1 \rangle$$

Pattern: $x$-component uses $y,z$; $y$-component uses $z,x$ (with a minus); $z$-component uses $x,y$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Three boxes each showing cross-multiplication pattern. Box 1: label 'x-comp', show a2↔b3 (subtract a3↔b2). Box 2: 'y-comp' with minus sign, show a1↔b3 minus a3↔b1. Box 3: 'z-comp', a1↔b2 minus a2↔b1. Use arrows to indicate which coordinates participate. Color code: x: blue, y: red, z: green.

*Interactive Controls:*
  - 🎛 Button: reveal next step in pattern explanation
  - 🎛 Toggle: show/hide color-coded arrows

**Teacher Narration** `[73w]`
> Here's the component formula. It might look messy at first, but there is a pattern. The first component uses the second and third coordinates cross-multiplied, the second component uses the third and first — but with a minus sign — and the third component uses the first and second. I'll show you a much better way to remember this in a moment using a determinant. But first, let's practice with a simple example.

---

### Slide 4 · [PRACTICE]
**Warm-Up Example: Direct Computation**  ·  `full_width`

**On-screen text** `[6w]`
$\mathbf{a}=\langle1,2,3\rangle$, $\mathbf{b}=\langle4,5,6\rangle$ → Answer: $\langle -3,6,-3\rangle$

**FULL WIDTH** `[steps]`

**Problem:** Compute $\mathbf{a}\times\mathbf{b}$ with $\mathbf{a}=\langle 1,2,3\rangle$, $\mathbf{b}=\langle 4,5,6\rangle$.

| Step | Formula | Calculation |
|------|---------|-------------|
| $x$ | $a_2b_3-a_3b_2$ | $2\cdot6-3\cdot5 =12-15=-3$ |
| $y$ | $-(a_1b_3-a_3b_1)$ | $-(1\cdot6-3\cdot4)=-(6-12)=6$ |
| $z$ | $a_1b_2-a_2b_1$ | $1\cdot5-2\cdot4=5-8=-3$ |

**Answer:** $\langle -3,6,-3\rangle$

**Teacher Narration** `[99w]`
> Let's work through our first example step by step. For the x-component, we multiply a2 and b3, then subtract a3 times b2. That gives negative three. The y-component has that important minus sign in front. We compute a1 times b3 minus a3 times b1, which is six minus twelve, a negative six, then the outer minus gives positive six. Finally, the z-component is a1 times b2 minus a2 times b1, five minus eight, negative three. So our cross product is negative three, six, negative three. Notice that the y-component turned out positive, because we applied the minus sign correctly.

---

### Slide 5 · [CORE] 🎛 *[2 controls]*
**The Determinant Method – Easier Computation**  ·  `split_left_right`

**On-screen text** `[11w]`
Write $\mathbf{a}\times\mathbf{b}$ as a determinant with $\mathbf{i},\mathbf{j},\mathbf{k}$ in the top row.

**LEFT** `[formula_block]`

Symbolic determinant:

$$\mathbf{a}\times\mathbf{b}= \begin{vmatrix}\mathbf{i}&\mathbf{j}&\mathbf{k}\\ a_1&a_2&a_3\\ b_1&b_2&b_3 \end{vmatrix}$$

Expand: $\mathbf{i}(a_2b_3-a_3b_2)-\mathbf{j}(a_1b_3-a_3b_1)+\mathbf{k}(a_1b_2-a_2b_1)$

**RIGHT** `[visual_spec]`

*Visual Spec:* Show 3x3 determinant with unit vectors in top row, a in second, b in third. Animate cofactor expansion: highlight row1 col1, cross out row1 and col1, show 2x2 determinant for i component; then highlight row1 col2 with minus, cross out row1 col2, show 2x2 for j; then row1 col3 with plus for k. Use colored highlights and text labels. Use matplotlib with text boxes.

*Interactive Controls:*
  - 🎛 Button: step through cofactor expansion one component at a time
  - 🎛 Toggle: show/hide the 2x2 determinant for each component

**Teacher Narration** `[92w]`
> Here's the trick that makes computation much easier: set up a three-by-three determinant with the unit vectors i, j, k in the top row, the components of vector a in the second row, and vector b in the third row. Then expand along the first row just like a regular determinant. The i component comes from the two-by-two determinant in the lower right, the j component has a minus sign and uses the other two columns, and the k component has a plus. This method is less error-prone than memorizing the formula.

---

### Slide 6 · [PRACTICE] ⏸️ *[YouTube Pause]*
**Standard Example: Using the Determinant**  ·  `full_width`

**On-screen text** `[11w]`
$\mathbf{p}\times\mathbf{q} = \langle -10,4,8\rangle$ → orthogonal to both $\mathbf{p}$ and $\mathbf{q}$.

**FULL WIDTH** `[steps]`

**Find a vector perpendicular to both** $\mathbf{p}=\langle 2,-1,3\rangle$ and $\mathbf{q}=\langle 0,4,-2\rangle$.

Set up: $\begin{vmatrix}\mathbf{i}&\mathbf{j}&\mathbf{k}\\2&-1&3\\0&4&-2\end{vmatrix}$

- $\mathbf{i}$: $(-1)(-2)-(3)(4)=2-12=-10$
- $\mathbf{j}$: $-[(2)(-2)-(3)(0)]=-[-4-0]=4$
- $\mathbf{k}$: $(2)(4)-(-1)(0)=8$

**Answer:** $\mathbf{n}=\langle -10,4,8\rangle$

Check: $\mathbf{p}\cdot\mathbf{n}=-20-4+24=0$ ✓  $\mathbf{q}\cdot\mathbf{n}=0+16-16=0$ ✓

**Teacher Narration** `[83w]`
> Now let's find a vector that is perpendicular to two given vectors. We set up the determinant with p in the second row and q in the third row. The i component gives negative ten, the j component gives positive four, and the k component gives eight. We can quickly verify orthogonality by dotting the result with each original vector. Both dot products come out zero, confirming we have a valid perpendicular vector. This method is how you'll compute cross products in practice.

**Student Prompt:** Pause: Before I compute, take a guess: what sign will the j-component have?

---

### Slide 7 · [MISCONCEPTION] 🟡
**Misconception: The J-Component Sign Trap**  ·  `split_left_right`

**On-screen text** `[14w]`
**Common mistake:** Forgetting the minus before the $\mathbf{j}$-component swaps the sign of that component.

**LEFT** `[concept]`

**Wrong approach:** Forgetting the minus on the $\mathbf{j}$-component.

**Example:** $\mathbf{a}=\langle 1,0,0\rangle$, $\mathbf{b}=\langle 0,1,0\rangle$

- Wrong: $\mathbf{i}(0-0)-\mathbf{j}(1\cdot0-0\cdot0)+\mathbf{k}(1\cdot1-0\cdot0)$  → $\langle 0,0,1\rangle$ *accidentally correct here*
- But for $\mathbf{a}=\langle 1,2,3\rangle$, $\mathbf{b}=\langle 0,1,0\rangle$: wrong would give $\mathbf{j}=-(2\cdot0-3\cdot0)=0$ (correct because j=0), but test with another: $\mathbf{a}=\langle 1,2,3\rangle$, $\mathbf{b}=\langle 1,1,1\rangle$ → correct $\mathbf{j}=-(1\cdot1-3\cdot1)=2$; wrong $\mathbf{j}=+(1\cdot1-3\cdot1)=-2$ → opposite sign!

**Root cause:** The cofactor expansion alternates $+,-,+$ along the top row.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show two determinant expansions side by side. Left: correct with minus sign on j, result vector c. Right: wrong with plus sign on j, result vector d. Use 3D plot to show the two result vectors are opposite in y-direction. Highlight the minus sign in red on the correct version. Use mplot3d, two subplots or overlapped with different colors (green correct, red wrong) and labels.

**Teacher Narration** `[94w]`
> The most common error in computing cross products is forgetting the minus sign on the j-component. The cofactor expansion goes plus, minus, plus along the first row. If you accidentally use a plus for the j-component, your entire y-component will have the opposite sign. Let me show you: compute a cross b for these two vectors using both methods. The correct result has a positive twelve; the wrong one gives negative twelve. That's a huge difference, especially when you use the result to find perpendicular directions. Always remember: i plus, j minus, k plus.

---

### Slide 8 · [VISUAL_LAB] 🎛 *[6 controls]*
**Interactive: Adjust Vectors and See Cross Product**  ·  `split_left_right`

**On-screen text** `[14w]`
Move the sliders to change $\mathbf{a}$ and $\mathbf{b}$. Watch $\mathbf{a}\times\mathbf{b}$ update in real time.

**LEFT** `[concept]`

Use the sliders to change the components of $\mathbf{a}$ and $\mathbf{b}$. Watch how the cross product (green) changes in both magnitude and direction. Notice: when $\mathbf{a}$ and $\mathbf{b}$ are parallel, the cross product becomes zero.

**RIGHT** `[python_lab]`

*Visual Spec:* 3D plot with origin, vectors a (blue), b (red), and cross product c (green). Sliders for a_x, a_y, a_z, b_x, b_y, b_z each from -5 to 5. Also show magnitude of c and dot products a·c and b·c as numeric labels. Update on slider change. Use mpl_toolkits.mplot3d and matplotlib.widgets.Slider. Axes limits fixed at [-6,6].

*Interactive Controls:*
  - 🎛 Slider for a_x from -5 to 5
  - 🎛 Slider for a_y from -5 to 5
  - 🎛 Slider for a_z from -5 to 5
  - 🎛 Slider for b_x from -5 to 5
  - 🎛 Slider for b_y from -5 to 5
  - 🎛 Slider for b_z from -5 to 5

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.widgets import Slider

fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d', position=[0.1,0.2,0.7,0.7])
plt.subplots_adjust(bottom=0.25)

a = np.array([1,2,3])
b = np.array([4,5,6])

# Create sliders for each component
ax_slider_a_x = plt.axes([0.2, 0.15, 0.6, 0.03])
ax_slider_a_y = plt.axes([0.2, 0.11, 0.6, 0.03])
ax_slider_a_z = plt.axes([0.2, 0.07, 0.6, 0.03])
ax_slider_b_x = plt.axes([0.2, 0.03, 0.6, 0.03])
ax_slider_b_y = plt.axes([0.2, -0.01, 0.6, 0.03])
ax_slider_b_z = plt.axes([0.2, -0.05, 0.6, 0.03])

slider_a_x = Slider(ax_slider_a_x, 'a_x', -5, 5, valinit=a[0])
slider_a_y = Slider(ax_slider_a_y, 'a_y', -5, 5, valinit=a[1])
slider_a_z = Slider(ax_slider_a_z, 'a_z', -5, 5, valinit=a[2])
slider_b_x = Slider(ax_slider_b_x, 'b_x', -5, 5, valinit=b[0])
slider_b_y = Slider(ax_slider_b_y, 'b_y', -5, 5, valinit=b[1])
slider_b_z = Slider(ax_slider_b_z, 'b_z', -5, 5, valinit=b[2])

def update(val):
    a[0] = slider_a_x.val
    a[1] = slider_a_y.val
    a[2] = slider_a_z.val
    b[0] = slider_b_x.val
    b[1] = slider_b_y.val
    b[2] = slider_b_z.val
    ax.clear()
    c = np.cross(a,b)
    ax.quiver(0,0,0,a[0],a[1],a[2],color='blue',linewidth=2,label='a')
    ax.quiver(0,0,0,b[0],b[1],b[2],color='red',linewidth=2,label='b')
    ax.quiver(0,0,0,c[0],c[1],c[2],color='green',linewidth=3,label='a×b')
    pts = np.array([[0,0,0],a,a+b,b])
    ax.plot_trisurf(pts[:,0],pts[:,1],pts[:,2],alpha=0.2,color='gray')
    ax.set_xlim(-6,6);ax.set_ylim(-6,6);ax.set_zlim(-6,6)
    ax.set_xlabel('X');ax.set_ylabel('Y');ax.set_zlabel('Z')
    ax.legend()
    ax.set_title(f'||a×b|| = {np.linalg.norm(c):.2f}')
    ax.text2D(0.02,0.98,f'a·c={np.dot(a,c):.2f}\nb·c={np.dot(b,c):.2f}',transform=ax.transAxes,verticalalignment='top')
    fig.canvas.draw_idle()

slider_a_x.on_changed(update)
slider_a_y.on_changed(update)
slider_a_z.on_changed(update)
slider_b_x.on_changed(update)
slider_b_y.on_changed(update)
slider_b_z.on_changed(update)

update(None)
plt.show()
```

**Teacher Narration** `[86w]`
> Now let's play. These sliders let you change the components of vectors a and b. Watch how the green cross product vector responds. Notice how its magnitude equals the area of the gray parallelogram. When you make the two vectors parallel, the parallelogram collapses to a line and the cross product becomes zero. Also keep an eye on the dot products in the corner — they stay exactly zero, proving the cross product is always perpendicular to both inputs. This is your chance to build intuition.

**Student Prompt:** Try making a and b parallel. What do you observe?

---

### Slide 9 · [CORE]
**Right-Hand Rule & Anti-Commutativity**  ·  `split_left_right`

**On-screen text** `[3w]`
$\mathbf{a}\times\mathbf{b} = -(\mathbf{b}\times\mathbf{a})$

**LEFT** `[concept]`

**Right-hand rule:** Curl fingers from $\mathbf{a}$ to $\mathbf{b}$, thumb points along $\mathbf{a}\times\mathbf{b}$.

**Anti-commutativity:** $\mathbf{a}\times\mathbf{b} = -(\mathbf{b}\times\mathbf{a})$

Swapping the inputs reverses direction.

**RIGHT** `[visual_spec]`

*Visual Spec:* 3D plot showing a and b from origin, with a curved arrow from a to b indicating curl direction, and a thick thumb arrow for cross product. On the bottom, show a smaller version with a and b swapped, resulting in opposite cross product. Use distinct colors: original a blue, b red, cross product green; swapped a' red, b' blue, cross product' orange. Add text labels.

**Teacher Narration** `[82w]`
> Direction matters. The right-hand rule tells you which way the cross product points. Curl the fingers of your right hand from vector a to vector b, and your thumb points in the direction of a cross b. If you swap the order, your thumb flips to the opposite direction. That's anti-commutativity: a cross b equals negative b cross a. This is completely different from the dot product where order doesn't matter. Remember this property, because it shows up often in physics applications.

---

### Slide 10 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]*
**Tricky Example: The Sign Trap in Reverse**  ·  `full_width`

**On-screen text** `[3w]`
$\mathbf{b}\times\mathbf{a} = -(\mathbf{a}\times\mathbf{b})$

**FULL WIDTH** `[steps]`

**Compute $\mathbf{b}\times\mathbf{a}$** for $\mathbf{a}=\langle1,0,-2\rangle$, $\mathbf{b}=\langle3,-1,4\rangle$.

First compute $\mathbf{a}\times\mathbf{b}$: $\langle -2,-10,-1\rangle$

Now $\mathbf{b}\times\mathbf{a}$:
- $\mathbf{i}$: $(-1)(-2)-(4)(1)=2-4=-2$
- $\mathbf{j}$: $-[(3)(-2)-(4)(1)]=-[-6-4]=10$
- $\mathbf{k}$: $(3)(0)-(-1)(1)=1$

Result: $\langle -2,10,1\rangle = -\langle2,-10,-1\rangle = -(\mathbf{a}\times\mathbf{b})$ ✓

**Teacher Narration** `[79w]`
> Let's test anti-commutativity. We already computed a cross b for these vectors a moment ago. Now compute b cross a by swapping the rows in our determinant. Notice the i component came out the same, but the j and k components changed sign. The final result is exactly the negative of a cross b. If you ever get a cross product and suspect you reversed the order, just flip the sign. This is a great check for your computations.

**Student Prompt:** Before computing, predict: will $\mathbf{b}\times\mathbf{a}$ point in the opposite direction to $\mathbf{a}\times\mathbf{b}$?

---

### Slide 11 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Proof: Orthogonality**  ·  `split_left_right`

**On-screen text** `[9w]`
Proof by algebra: every term cancels with its opposite.

**LEFT** `[concept]`

**Theorem:** $\mathbf{a}\times\mathbf{b}$ is orthogonal to both $\mathbf{a}$ and $\mathbf{b}$.

**Proof:** Let $\mathbf{c}=\mathbf{a}\times\mathbf{b}$.
Compute $\mathbf{a}\cdot\mathbf{c} = a_1(a_2b_3-a_3b_2) + a_2(a_3b_1-a_1b_3) + a_3(a_1b_2-a_2b_1)$.
Group terms: $a_1a_2b_3 - a_1a_3b_2 + a_2a_3b_1 - a_1a_2b_3 + a_1a_3b_2 - a_2a_3b_1 = 0$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Show the expanded dot product terms with color-coded pairs that cancel. Each pair (e.g., a1a2b3 and -a1a2b3) flashes and then fades to zero. Use animated text with matplotlib or description for coding agent: 'Six terms arranged in a circle, each term has a matching opposite term that cancels.'

**Teacher Narration** `[81w]`
> For those who enjoy proofs, let's show why the cross product is always orthogonal. Write c equals a cross b, then take the dot product with a. Expand everything out — there are six terms. They pair up and cancel to zero. For example, a1a2b3 appears with a plus and a minus. The same happens for all pairs. The dot product is zero, so c is orthogonal to a. The same argument works for b. This is clean and satisfying algebra.

---

### Slide 12 · [PRACTICE]
**Edge Case: Parallel Vectors**  ·  `full_width`

**On-screen text** `[8w]`
Parallel vectors → cross product = zero vector.

**FULL WIDTH** `[steps]`

**Compute $\mathbf{a}\times\mathbf{b}$** with $\mathbf{a}=\langle2,-4,6\rangle$, $\mathbf{b}=\langle-1,2,-3\rangle$.

Check parallelism: $\frac{2}{-1}=\frac{-4}{2}=\frac{6}{-3}=-2$ → $\mathbf{a} = -2\mathbf{b}$.

Cross product:
- $\mathbf{i}$: $(-4)(-3)-(6)(2) = 12-12=0$
- $\mathbf{j}$: $-[(2)(-3)-(6)(-1)] = -[(-6+6)]=0$
- $\mathbf{k}$: $(2)(2)-(-4)(-1) = 4-4=0$

Result: $\langle0,0,0\rangle$ — the zero vector.

**Teacher Narration** `[87w]`
> Here's an edge case that often surprises students. If the two vectors are parallel — meaning one is a scalar multiple of the other — the cross product is the zero vector. Let's verify with these vectors: a is exactly negative two times b. Every component of the cross product becomes zero because the sine of the angle is zero. This makes perfect geometric sense: if the vectors are parallel, the parallelogram has no area, so the cross product magnitude is zero, and the direction is undefined.

---

### Slide 13 · [PRACTICE] 🟡
**Application: Area of a Triangle**  ·  `full_width`

**On-screen text** `[7w]`
Area of triangle = $\frac{1}{2}\|\overrightarrow{PQ} \times \overrightarrow{PR}\|$

**FULL WIDTH** `[steps]`

**Find area of triangle** with vertices $P(1,0,2), Q(3,-1,4), R(0,2,1)$.

1. Vectors from $P$:
   - $\overrightarrow{PQ} = \langle2,-1,2\rangle$
   - $\overrightarrow{PR} = \langle-1,2,-1\rangle$

2. Cross product:
   - $\mathbf{i}$: $(-1)(-1)-(2)(2)=1-4=-3$
   - $\mathbf{j}$: $-[(2)(-1)-(2)(-1)]=-[-2+2]=0$
   - $\mathbf{k}$: $(2)(2)-(-1)(-1)=4-1=3$

Result: $\langle -3,0,3\rangle$

3. Parallelogram area: $\|\langle -3,0,3\rangle\| = \sqrt{9+0+9}=3\sqrt{2}$

4. Triangle area = half of that = $\frac{3\sqrt{2}}{2}$.

**Teacher Narration** `[87w]`
> Here's a key application: finding the area of a triangle in 3D. Pick one vertex, then form two edge vectors to the other two vertices. The cross product magnitude gives the area of the parallelogram spanned by these two vectors. Since a triangle is exactly half of that parallelogram, we take half. For this triangle, the cross product is negative three, zero, three. Its length is three root two. Half of that is three root two over two. This technique is essential for surface integrals and graphics.

---

### Slide 14 · [CORE]
**Algebraic Properties Summary**  ·  `split_left_right`

**On-screen text** `[11w]`
Summary of cross product algebra: anti-commutative, distributive, scalar multiplication, parallel test.

**LEFT** `[concept]`

**Key properties:**

- Anti-commutativity: $\mathbf{a}\times\mathbf{b} = -(\mathbf{b}\times\mathbf{a})$
- Distributivity: $\mathbf{a}\times(\mathbf{b}+\mathbf{c}) = \mathbf{a}\times\mathbf{b}+\mathbf{a}\times\mathbf{c}$
- Scalar multiplication: $(k\mathbf{a})\times\mathbf{b}=k(\mathbf{a}\times\mathbf{b})$
- Parallel test: $\mathbf{a}\times\mathbf{b}=0$ iff $\mathbf{a}\parallel\mathbf{b}$ (including zero vector)
- Self: $\mathbf{a}\times\mathbf{a}=\mathbf{0}$

**RIGHT** `[visual_spec]`

*Visual Spec:* Show each property as a labeled box with a small diagram. Anti-commutativity: two arrows swapping with opposite colors. Distributivity: three vectors sum. Scalar: stretched vector. Parallel: two collinear vectors with zero cross. Self: vector crossing itself with zero. Use matplotlib with text annotations.

**Teacher Narration** `[71w]`
> Let's collect the algebraic properties you need to remember. The cross product is anti-commutative, so order matters. It distributes over addition, so you can expand like normal. Scalars can be pulled out. The cross product is zero exactly when the vectors are parallel, which includes the case when one is zero. And of course, any vector crossed with itself is zero. These properties will make computations much faster in the future.

---

### Slide 15 · [SUMMARY]
**What You've Learned**  ·  `full_width`

**On-screen text** `[12w]`
Cross product: vector perpendicular to two vectors, magnitude = area of parallelogram.

**FULL WIDTH** `[concept]`

**Learning objectives achieved:**

✅ Calculate cross product via determinant formula
✅ Interpret geometrically: magnitude = area, direction = orthogonal
✅ Apply to find perpendicular vectors and triangle area
✅ Use properties: anti-commutativity, parallel test

**Key formulas:**
$$\mathbf{a}\times\mathbf{b} = \begin{vmatrix}\mathbf{i}&\mathbf{j}&\mathbf{k}\\a_1&a_2&a_3\\b_1&b_2&b_3\end{vmatrix}$$
$$\|\mathbf{a}\times\mathbf{b}\| = \|\mathbf{a}\|\|\mathbf{b}\|\sin\theta$$

**Teacher Narration** `[73w]`
> We've covered a lot today. You can now compute the cross product using the determinant method. You understand that its magnitude gives the area of the parallelogram, and its direction follows the right-hand rule. You've applied it to find perpendicular vectors and the area of a triangle. And you know the key algebraic properties, especially anti-commutativity. The cross product is a fundamental tool for 3D geometry, physics, and multivariable calculus. Great work today.

---
