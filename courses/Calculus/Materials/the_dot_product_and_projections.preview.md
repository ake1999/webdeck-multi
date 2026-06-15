# The Dot Product and Projections

**Category:** vectors_3d_geometry  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 96%

> **Prerequisite:** You already know vector addition, scalar multiplication, and magnitude from previous lessons.

**Learning Objectives:**
- Calculate dot products of vectors in 2D and 3D, and interpret the sign and magnitude
- Apply the dot product to find angles between vectors and determine orthogonality
- Compute scalar and vector projections of one vector onto another
- Analyze geometric relationships using dot product properties and projections

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
✅ **Narration overlong  (>120w):** none  (avg 70w)
⚠️ **Narration too short (<60w):** [6]
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 15 slides (target 12–18)
✅ **required_types**: hook + core + summary present
✅ **visual_labs**: 1 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 1 challenge slide(s) (min 1)
⚠️ **narration_quality**: too short: ['s6:45w']
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
| 1 | hook | 🟢 | ◧ |  | 84w | 10w | Why the Dot Product? |
| 2 | core | 🟢 | ◧ |  | 70w | 9w | The Dot Product Definition |
| 3 | practice | 🟢 | ⬛⬛ |  | 63w | 4w | Warm‑Up Example |
| 4 | core | 🟢 | ◧ |  | 72w | 9w | Dot Product and Angle |
| 5 | core | 🟢 | ◧ |  | 73w | 8w | Orthogonality Condition |
| 6 | 🎛pause_and_try | 🟢 | ◧ | ⏸️ | 45w⚠️ | 5w | Pause and Predict |
| 7 | practice | 🟢 | ⬛⬛ |  | 62w | 7w | Solution Revealed |
| 8 | core | 🟢 | ◧ |  | 71w | 9w | Scalar Projection (Component) |
| 9 | core | 🟢 | ◧ |  | 71w | 12w | Vector Projection |
| 10 | misconception | 🟢 | ◧ |  | 75w | 6w | Common Mistake: Wrong Denominator |
| 11 | 🎛visual_lab | 🟡 | ◧ |  | 74w | 10w | Interactive Projection Lab |
| 12 | core | 🟢 | ◧ |  | 73w | 9w | Properties of the Dot Product |
| 13 | 🎛challenge | 🔴 | ⬛⬛ |  | 69w | 7w | [Challenge – Optional] Deriving the Angle Formula |
| 14 | practice | 🟡 | ⬛⬛ |  | 78w | 8w | Application: Work Done by a Force |
| 15 | summary | 🟢 | ◧ |  | 70w | 5w | What You Learned Today |

---

### Slide 1 · [HOOK]
**Why the Dot Product?**  ·  `split_left_right`

**On-screen text** `[10w]`
Dot product: how much one vector acts in another’s direction.

**LEFT** `[text]`

Imagine pushing a box at an angle. Only part of your force moves it forward. The dot product tells you exactly how much $\mathbf{a}$ goes in the direction of $\mathbf{b}$.

**RIGHT** `[visual_spec]`

*Visual Spec:* A 2D diagram showing a force vector F (arrow at 45° from horizontal) pushing a block on the floor. A dashed line drops from the tip of F to the horizontal axis, showing the horizontal component F_x. Label: 'F ⋅ i = |F| cos θ'.

**Teacher Narration** `[84w]`
> Picture this: you’re pushing a heavy box across a rough floor. You push at an angle, so some of your effort goes sideways or downward. Only the part that points along the floor actually moves the box. The dot product is the mathematical tool that measures exactly that — how much of one vector acts in the direction of another. Push straight along the floor: you get the maximum. Push straight down: zero. Push backwards: even negative. That’s the key intuition we’ll build today.

---

### Slide 2 · [CORE]
**The Dot Product Definition**  ·  `split_left_right`

**On-screen text** `[9w]`
Multiply matching components, then add. Result: a single number.

**LEFT** `[formula_block]`

$$ \mathbf{a} \cdot \mathbf{b} = a_1 b_1 + a_2 b_2 + a_3 b_3 $$

**RIGHT** `[visual_spec]`

*Visual Spec:* Two vectors a = (a1,a2,a3) and b = (b1,b2,b3) shown as arrows from origin. Below, a table with rows: a1·b1, a2·b2, a3·b3, and a sum arrow leading to the scalar result. Use colors to match components.

**Teacher Narration** `[70w]`
> Here’s the definition: multiply the first components together, the second components together, the third components together, and add the three products. That’s it. The result is a scalar — not a vector. So it has no direction, only magnitude and sign. Let’s write it out for a quick warm‑up example. This operation is the foundation for everything else we do today, so make sure you understand it before moving on.

---

### Slide 3 · [PRACTICE]
**Warm‑Up Example**  ·  `full_width`

**On-screen text** `[4w]`
Compute: ⟨2,−3,1⟩ · ⟨4,0,−5⟩

**FULL WIDTH** `[steps]`

**Example**: $\mathbf{a} = \langle 2, -3, 1 \rangle$, $\mathbf{b} = \langle 4, 0, -5 \rangle$

1. Multiply each pair: $2\cdot4 = 8$, $(-3)\cdot0 = 0$, $1\cdot(-5) = -5$
2. Add: $8 + 0 + (-5) = 3$

**Answer**: $\mathbf{a}\cdot\mathbf{b} = 3$

**Teacher Narration** `[63w]`
> Let’s try one together. Vector a: two, negative three, one. Vector b: four, zero, negative five. Multiply component-wise: two times four is eight, negative three times zero is zero, one times negative five is negative five. Now add: eight plus zero minus five gives three. So the dot product is positive three. The positive sign tells us the angle between them is acute.

---

### Slide 4 · [CORE]
**Dot Product and Angle**  ·  `split_left_right`

**On-screen text** `[9w]`
The dot product encodes the cosine of the angle.

**LEFT** `[formula_block]`

$$ \mathbf{a} \cdot \mathbf{b} = |\mathbf{a}|\,|\mathbf{b}|\,\cos\theta $$  where $\theta$ is the angle between them ($0\leq \theta \leq \pi$).

**RIGHT** `[visual_spec]`

*Visual Spec:* Two vectors a and b from the origin, with angle θ labeled between them. A dashed arc shows the angle. Next to it, a right triangle showing the geometric interpretation: |a| cosθ is the adjacent leg.

**Teacher Narration** `[72w]`
> There’s a beautiful relationship: the dot product equals the product of the magnitudes times the cosine of the angle between the vectors. This means we can reverse the formula to find the angle. If the dot product is zero and both vectors are nonzero, then cosine is zero, so the angle is 90 degrees — the vectors are perpendicular. If the dot product is positive, the angle is acute; if negative, obtuse.

---

### Slide 5 · [CORE]
**Orthogonality Condition**  ·  `split_left_right`

**On-screen text** `[8w]`
Zero dot product = perpendicular (for nonzero vectors).

**LEFT** `[formula_block]`

$$ \mathbf{a} \perp \mathbf{b} \quad \iff \quad \mathbf{a}\cdot\mathbf{b}=0 $$ (for nonzero vectors)

**RIGHT** `[visual_spec]`

*Visual Spec:* Two perpendicular vectors a and b in 3D, with a right angle mark at the origin. If possible, show a b = 0 as a floating label.

**Teacher Narration** `[73w]`
> This is one of the most practical uses of the dot product: checking whether two vectors are perpendicular. Compute the dot product – if it’s exactly zero, they’re orthogonal. But careful: the zero vector dotted with anything gives zero, but we don’t call the zero vector perpendicular in the usual sense. Stick to nonzero vectors and you’re safe. This condition is used constantly in geometry, physics, and computer graphics to detect right angles.

---

### Slide 6 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]* 🎛 *[1 controls]*
**Pause and Predict**  ·  `split_left_right`

**On-screen text** `[5w]`
⟨1,0,2⟩ · ⟨−2,3,1⟩ = ?

**LEFT** `[text]`

Let $\mathbf{a} = \langle 1,0,2 \rangle$, $\mathbf{b} = \langle -2,3,1 \rangle$. 

Compute the dot product, then use the angle formula to find $\theta$.

**RIGHT** `[visual_spec]`

*Visual Spec:* A 3D coordinate system with the two vectors drawn from origin, but no angle labels. The dot product and angle values are hidden. Students must compute mentally.

*Interactive Controls:*
  - 🎛 Button: 'Reveal answer' – when clicked, reveals dot product = 0, θ = 90°

**Teacher Narration** `[45w ⚠️ **TOO SHORT: 45w < 60w min**]`
> Try this one on your own before I reveal the answer. Compute the dot product for these two vectors, then determine the angle between them. Pause the video now, work it out, and when you’re ready, press play to see if you got it right.

**Student Prompt:** Compute the dot product and find the angle.

---

### Slide 7 · [PRACTICE]
**Solution Revealed**  ·  `full_width`

**On-screen text** `[7w]`
Dot product = 0 → perpendicular vectors.

**FULL WIDTH** `[steps]`

1. Dot product: $1(-2) + 0(3) + 2(1) = -2 + 0 + 2 = 0$
2. $|\mathbf{a}| = \sqrt{5}$, $|\mathbf{b}| = \sqrt{14}$
3. $\cos\theta = \frac{0}{\sqrt{5}\sqrt{14}} = 0$ → $\theta = \frac{\pi}{2}$

**Answer**: $\mathbf{a}\cdot\mathbf{b}=0$, so $\mathbf{a} \perp \mathbf{b}$.

**Teacher Narration** `[62w]`
> Here’s the solution. The dot product works out to zero: one times negative two is negative two, zero times three is zero, two times one is two, and they sum to zero. So the dot product is zero. Both vectors are nonzero, so they must be perpendicular. The magnitudes weren’t even needed in this case because zero divided by anything is zero.

---

### Slide 8 · [CORE]
**Scalar Projection (Component)**  ·  `split_left_right`

**On-screen text** `[9w]`
Scalar projection = signed length of a onto b.

**LEFT** `[formula_block]`

$$ \text{comp}_{\mathbf{b}} \mathbf{a} = \frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{b}|} = |\mathbf{a}|\cos\theta $$  (signed length of the shadow along b)

**RIGHT** `[visual_spec]`

*Visual Spec:* A diagram: vector a from origin, vector b from origin. A perpendicular dashed line from tip of a onto the line of b, forming a right triangle. Label the adjacent side along b as 'scalar projection'. Show negative case separately with a dashed arrow opposite b.

**Teacher Narration** `[71w]`
> Now we move to projections. The scalar projection tells you how long the shadow of vector a is when you shine a light perpendicular to vector b. The formula is simple: take the dot product of a and b and divide by the length of b. The result can be negative — that means the shadow lands in the opposite direction to b. The magnitude |a|cosθ gives the same signed length.

---

### Slide 9 · [CORE]
**Vector Projection**  ·  `split_left_right`

**On-screen text** `[12w]`
Vector projection = scalar projection times unit vector in direction of b.

**LEFT** `[formula_block]`

$$ \text{proj}_{\mathbf{b}} \mathbf{a} = \left( \frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{b}|^2} \right) \mathbf{b} $$  (the actual shadow vector)

**RIGHT** `[visual_spec]`

*Visual Spec:* Same diagram as previous, but now the shadow is drawn as a vector along b, labeled proj_b a. The perpendicular component is shown as a dashed line from tip of a to tip of projection. Show the scalar factor highlighted.

**Teacher Narration** `[71w]`
> The vector projection gives you the actual shadow as a vector, not just its length. You take the scalar projection and multiply it by the unit vector in the direction of b. That’s equivalent to taking the dot product divided by the squared magnitude of b, then multiplying by b. The result is a vector parallel to b. If the scalar projection is negative, the vector projection points opposite to b.

---

### Slide 10 · [MISCONCEPTION]
**Common Mistake: Wrong Denominator**  ·  `split_left_right`

**On-screen text** `[6w]`
Denominator must be |b|², not |b|.

**LEFT** `[text]`

**Wrong**: $\text{proj}_{\mathbf{b}} \mathbf{a} = \left( \frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{b}|} \right) \mathbf{b}$ 

**Correct**: The denominator is $|\mathbf{b}|^2$, not $|\mathbf{b}|$.

**RIGHT** `[visual_spec]`

*Visual Spec:* Two side-by-side diagrams: left shows the WRONG projection (too long by factor |b|), right shows the correct projection. Highlight the error with red 'X' and correct with green check.

**Teacher Narration** `[75w]`
> A very common error: forgetting the square. If you divide by |b| instead of |b|², you get a vector that’s too long by a factor of |b|. Why does the square appear? Because the projection must be parallel to b, and we need to rescale the unit vector appropriately. Remember: the scalar projection uses |b|, but to turn that into a vector we multiply by the unit vector b/|b|, giving an overall factor of 1/|b|².

---

### Slide 11 · [VISUAL_LAB] 🟡 🎛 *[6 controls]*
**Interactive Projection Lab**  ·  `split_left_right`

**On-screen text** `[10w]`
Play with the sliders. Watch dot product and projections update.

**LEFT** `[text]`

Adjust the components of $\mathbf{a}$ and $\mathbf{b}$ with the sliders. Watch how the dot product, scalar projection, and vector projection change in real time.

**RIGHT** `[python_lab]`

*Visual Spec:* Interactive 3D plot with mpl_toolkits.mplot3d. Show vectors a (blue), b (red), and proj_b a (green). Dashed line from tip of a to tip of projection. Display dot product, scalar projection, and vector projection as text annotations. Sliders for a=(ax,ay,az) and b=(bx,by,bz) over range -3 to 3. The plot updates in real-time as sliders are moved. Sliders are arranged in two columns: left column for a_x, a_y, a_z; right column for b_x, b_y, b_z. Each slider has a label and range -3 to 3.

*Interactive Controls:*
  - 🎛 Slider for a_x from -3 to 3
  - 🎛 Slider for a_y from -3 to 3
  - 🎛 Slider for a_z from -3 to 3
  - 🎛 Slider for b_x from -3 to 3
  - 🎛 Slider for b_y from -3 to 3
  - 🎛 Slider for b_z from -3 to 3

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider

fig = plt.figure(figsize=(12, 8))
ax = fig.add_subplot(111, projection='3d')
plt.subplots_adjust(bottom=0.4)

init_a = np.array([2, 1, 1])
init_b = np.array([1, 2, 1])

def compute_and_plot(a, b):
    ax.clear()
    dot = np.dot(a, b)
    norm_b = np.linalg.norm(b)
    if norm_b == 0:
        sc_proj = 0
        vec_proj = np.zeros(3)
        # Optionally display a warning
        ax.text2D(0.5, 0.95, 'Warning: b is zero vector', transform=ax.transAxes, ha='center', color='red')
    else:
        sc_proj = dot / norm_b
        vec_proj = (dot / (norm_b**2)) * b
    
    # Plot vectors from origin
    ax.quiver(0, 0, 0, a[0], a[1], a[2], color='blue', label=f'a = {a}', linewidth=2)
    ax.quiver(0, 0, 0, b[0], b[1], b[2], color='red', label=f'b = {b}', linewidth=2)
    ax.quiver(0, 0, 0, vec_proj[0], vec_proj[1], vec_proj[2],
              color='green', label=f'proj_b a = {vec_proj}', linewidth=2)
    # Dashed perpendicular line
    ax.plot([a[0], vec_proj[0]], [a[1], vec_proj[1]], [a[2], vec_proj[2]],
            'k--', alpha=0.5)
    
    ax.set_xlim(-3, 3)
    ax.set_ylim(-3, 3)
    ax.set_zlim(-3, 3)
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    ax.legend()
    ax.set_title(f'Dot: {dot:.2f} | Scalar proj: {sc_proj:.2f}')
    fig.canvas.draw_idle()

compute_and_plot(init_a, init_b)

# Sliders
axcolor = 'lightgoldenrodyellow'
ax_a0 = plt.axes([0.15, 0.25, 0.3, 0.03], facecolor=axcolor)
ax_a1 = plt.axes([0.15, 0.20, 0.3, 0.03], facecolor=axcolor)
ax_a2 = plt.axes([0.15, 0.15, 0.3, 0.03], facecolor=axcolor)
ax_b0 = plt.axes([0.55, 0.25, 0.3, 0.03], facecolor=axcolor)
ax_b1 = plt.axes([0.55, 0.20, 0.3, 0.03], facecolor=axcolor)
ax_b2 = plt.axes([0.55, 0.15, 0.3, 0.03], facecolor=axcolor)

s_a0 = Slider(ax_a0, 'a_x', -3, 3, valinit=init_a[0])
s_a1 = Slider(ax_a1, 'a_y', -3, 3, valinit=init_a[1])
s_a2 = Slider(ax_a2, 'a_z', -3, 3, valinit=init_a[2])
s_b0 = Slider(ax_b0, 'b_x', -3, 3, valinit=init_b[0])
s_b1 = Slider(ax_b1, 'b_y', -3, 3, valinit=init_b[1])
s_b2 = Slider(ax_b2, 'b_z', -3, 3, valinit=init_b[2])

def update(val):
    a = np.array([s_a0.val, s_a1.val, s_a2.val])
    b = np.array([s_b0.val, s_b1.val, s_b2.val])
    compute_and_plot(a, b)

s_a0.on_changed(update)
s_a1.on_changed(update)
s_a2.on_changed(update)
s_b0.on_changed(update)
s_b1.on_changed(update)
s_b2.on_changed(update)

plt.show()
```

**Teacher Narration** `[74w]`
> Now for the hands-on part. You can drag the sliders to change the components of vectors a and b. The 3D plot updates instantly: the projection of a onto b appears in green, and the dashed line shows the perpendicular component. See what happens when you make the vectors perpendicular – the dot product hits zero and the projection shrinks to nothing. Try making a and b point in opposite directions; the projection flips.

**Student Prompt:** Try making vectors perpendicular. What happens to the projection?

---

### Slide 12 · [CORE]
**Properties of the Dot Product**  ·  `split_left_right`

**On-screen text** `[9w]`
Dot product behaves like ordinary multiplication (but no associativity).

**LEFT** `[formula_block]`

$$
\begin{aligned}
\mathbf{a}\cdot\mathbf{a} &= |\mathbf{a}|^2 \\
\mathbf{a}\cdot\mathbf{b} &= \mathbf{b}\cdot\mathbf{a} \\
\mathbf{a}\cdot(\mathbf{b}+\mathbf{c}) &= \mathbf{a}\cdot\mathbf{b} + \mathbf{a}\cdot\mathbf{c} \\
(c\mathbf{a})\cdot\mathbf{b} &= c(\mathbf{a}\cdot\mathbf{b}) = \mathbf{a}\cdot(c\mathbf{b})
\end{aligned}
$$

**RIGHT** `[visual_spec]`

*Visual Spec:* A simple visual showing commutative property: a·b and b·a yield same scalar. Use two arrows labeled a and b and an equals sign between the two dot products.

**Teacher Narration** `[73w]`
> These properties make the dot product easy to work with. It’s commutative, distributive over addition, and compatible with scalar multiplication. But note: there’s no associative law because the dot product of a scalar with a vector is undefined. Also, a·a gives the squared magnitude, which is handy for computing lengths. For example, if you know the dot product of a vector with itself, you can find its length by taking the square root.

---

### Slide 13 · [CHALLENGE] 🔴 *[Challenge – Optional]* 🎛 *[1 controls]* *(skip if time-limited)*
**[Challenge – Optional] Deriving the Angle Formula**  ·  `full_width`

**On-screen text** `[7w]`
Proof: Law of Cosines + component expansion.

**FULL WIDTH** `[steps]`

Use the Law of Cosines on the triangle formed by $\mathbf{a}$, $\mathbf{b}$, and $\mathbf{a}-\mathbf{b}$:
$$|\mathbf{a}-\mathbf{b}|^2 = |\mathbf{a}|^2 + |\mathbf{b}|^2 - 2|\mathbf{a}||\mathbf{b}|\cos\theta$$

Also compute directly:
$$|\mathbf{a}-\mathbf{b}|^2 = (a_1-b_1)^2 + (a_2-b_2)^2 + (a_3-b_3)^2 = |\mathbf{a}|^2 + |\mathbf{b}|^2 - 2\mathbf{a}\cdot\mathbf{b}$$

Equate the two expressions and cancel $|\mathbf{a}|^2 + |\mathbf{b}|^2$:
$$-2|\mathbf{a}||\mathbf{b}|\cos\theta = -2\mathbf{a}\cdot\mathbf{b} \\ \Rightarrow \mathbf{a}\cdot\mathbf{b} = |\mathbf{a}||\mathbf{b}|\cos\theta$$

**Teacher Narration** `[69w]`
> This derivation is optional, but it’s a beautiful connection between algebra and geometry. Start with the triangle formed by a, b, and a minus b. Law of Cosines gives one expression. Meanwhile, expand the squared magnitude of a minus b in components. You get a second expression involving the dot product. Equating them, the magnitude terms cancel, leaving the angle formula. Try it step by step with the button.

---

### Slide 14 · [PRACTICE] 🟡
**Application: Work Done by a Force**  ·  `full_width`

**On-screen text** `[8w]`
Work = F·d. Scalar projection shows effective force.

**FULL WIDTH** `[steps]`

**Problem**: A constant force $\mathbf{F} = \langle 3, 4 \rangle$ N moves an object along displacement $\mathbf{d} = \langle 2, 1 \rangle$ m. Compute the work done.

1. Work = $\mathbf{F} \cdot \mathbf{d}$.
2. $\mathbf{F}\cdot\mathbf{d} = 3(2) + 4(1) = 6 + 4 = 10$ J.

**Answer**: 10 joules.

Also find the scalar projection of $\mathbf{F}$ onto $\mathbf{d}$: $\frac{10}{\sqrt{5}} \approx 4.47$ N (the magnitude of the component of F along d).

**Teacher Narration** `[78w]`
> Let’s see the dot product in physics: work done by a constant force. Force vector F is three newtons right, four newtons up. Displacement d is two meters right, one meter up. The dot product gives the work: three times two plus four times one equals ten joules. If we also compute the scalar projection of F onto d, we get about four point four seven newtons — that’s the magnitude of the component of F along d.

---

### Slide 15 · [SUMMARY]
**What You Learned Today**  ·  `split_left_right`

**On-screen text** `[5w]`
Key formulas and concepts summarized.

**LEFT** `[text]`

- Dot product: $\mathbf{a}\cdot\mathbf{b} = a_1b_1 + a_2b_2 + a_3b_3$
- Angle: $\mathbf{a}\cdot\mathbf{b} = |\mathbf{a}||\mathbf{b}|\cos\theta$
- Orthogonality: $\mathbf{a}\perp\mathbf{b} \iff \mathbf{a}\cdot\mathbf{b}=0$
- Scalar projection: $\text{comp}_{\mathbf{b}}\mathbf{a} = \frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{b}|}$
- Vector projection: $\text{proj}_{\mathbf{b}}\mathbf{a} = \left(\frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{b}|^2}\right)\mathbf{b}$

**RIGHT** `[visual_spec]`

*Visual Spec:* A single composite diagram: a vector a, b, and the projection. Show the dot product scalar next to an equal sign with magnitude product times cosine. Key formulas displayed as callouts.

**Teacher Narration** `[70w]`
> Today we covered the dot product from definition to applications. You learned how to compute it, how it relates to the angle between vectors, and how to use it for orthogonality and projections. Practice these skills by revisiting the interactive lab and trying different vector pairs. In the next lesson, we’ll extend these ideas to cross products and areas. Make sure you are comfortable with these concepts before moving on.

---
