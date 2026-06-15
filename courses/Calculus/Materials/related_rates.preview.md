# Related Rates

**Category:** general_mathematics  |  **Level:** first-year university / advanced high school  |  **Duration:** ~20 min  |  **V3.1 Score:** 88%

> **Prerequisite:** Implicit differentiation and the chain rule are essential prerequisites – variables are functions of time.

**Learning Objectives:**
- Calculate rates of change in geometric and physical systems using implicit differentiation with respect to time
- Interpret related rates problems by identifying known and unknown rates, and constructing appropriate equations
- Apply the chain rule to relate the rates of change of multiple variables that depend on a common time variable
- Analyze complex word problems to extract the correct geometric or physical relationships before differentiating
- Solve optimization-in-reverse problems where rates of change are given and unknown rates must be determined

---

## v3.1 Production Readiness

✅ **Interactive moments:** 3 / 3 required
⚠️ **Narration overlong  (>120w):** [8, 10]  (avg 111w)
✅ **Narration too short (<60w):** none
✅ **Screen density (>40w):** none
✅ **Challenge labels:** all correct

---

## Validation  (13 checks)
✅ **structure**: lecture_meta + slides present
✅ **slide_count**: 14 slides (target 12–18)
✅ **required_types**: hook + core + summary present
⚠️ **visual_labs**: 0 visual_lab slide(s) (min 1)
✅ **challenge_slides**: 2 challenge slide(s) (min 1)
✅ **narration_quality**: all ≥60w
⚠️ **visual_specs**: missing on slides: [6, 11]
✅ **field_completeness**: all required fields present
✅ **interactive_moments**: 3 interactive moment(s) (min 3)
⚠️ **narration_overlong**: too long: ['s8:148w', 's10:153w']
✅ **on_screen_density**: all ≤40w
✅ **challenge_labels**: all challenge slides labeled correctly
✅ **code_separation**: no Python code in student-facing text

---

## Slide Overview

| # | Type | Diff | Layout | Pause | Narr | Screen | Title |
|---|------|------|--------|-------|------|--------|-------|
| 1 | hook | 🟢 | ◧ |  | 108w | 26w | The Spider Web of Change |
| 2 | core | 🟢 | ◧ |  | 114w | 26w | The Fundamental Strategy |
| 3 | 🎛practice | 🟢 | ◧ |  | 103w | 12w | Warm-Up: Expanding Square |
| 4 | core | 🟢 | ◧ |  | 98w | 21w | The Pythagorean Model |
| 5 | pause_and_try | 🟢 | ◧ | ⏸️ | 92w | 14w | Pause & Try: Sliding Ladder |
| 6 | practice | 🟢 | ◧ |  | 109w | 12w | Sliding Ladder: Solution |
| 7 | core | 🟢 | ◧ |  | 97w | 13w | The Similar Triangles Technique |
| 8 | 🎛practice | 🟡 | ◧ | ⏸️ | 148w⚠️ | 15w | Tricky: Conical Tank |
| 9 | challenge | 🔴 | ◧ |  | 113w | 17w | [Challenge – Optional] The Moment the Ladder Hits the Ground |
| 10 | 🎛practice | 🟡 | ◧ | ⏸️ | 153w⚠️ | 16w | Application: Radar Gun & Speeding |
| 11 | misconception | 🟢 | ◧ |  | 115w | 15w | Common Mistake: Substituting Before Differentiating |
| 12 | challenge | 🔴 | ◧ |  | 113w | 16w | [Challenge – Optional] Theorem Proof (Lightweight) |
| 13 | summary | 🟢 | ⬛⬛ |  | 92w | 13w | Pro Tips & Recap |
| 14 | summary | 🟢 | ⬛⬛ |  | 98w | 13w | Learning Objectives — Achieved |

---

### Slide 1 · [HOOK]
**The Spider Web of Change**  ·  `split_left_right`

**On-screen text** `[26w]`
Blow up a balloon: all sizes change at linked rates. Tug a spider web: the whole shape distorts. Related rates is the math of those links.

**LEFT** `[text]`

Blow up a balloon: radius, area, volume all change at different but linked rates. Tug one strand of a spider web and the whole web distorts. **Related rates** is the mathematics of those links.

**RIGHT** `[visual_spec]`

*Visual Spec:* Animated 3D sphere (balloon). As time progresses, radius grows from 1 to 5 units. Two small plots below: left plot shows radius r(t) (blue) and volume V(t) (red) vs time; right plot shows dr/dt (green) and dV/dt (orange). A vertical line marks the current time. Colors: balloon surface light blue, plots with matching colors. Axis labels: t (s), r (m), V (m³). Title: 'Balloon Inflation – All rates linked.' Highlight that dV/dt is constant (air inflow), dr/dt slows as r increases.

```python
import numpy as np, matplotlib.pyplot as plt, matplotlib.animation as animation

fig = plt.figure(figsize=(10,6))
ax1 = fig.add_subplot(121, projection='3d')
ax2 = fig.add_subplot(222)
ax3 = fig.add_subplot(224)

t = np.linspace(0, 5, 200)
r = 1 + t*0.8
V = (4/3)*np.pi*r**3
dr_dt = 0.8 * np.ones_like(t)
dV_dt = 4*np.pi*r**2*dr_dt

# Balloon sphere
def update(frame):
    ax1.clear()
    u = np.linspace(0, 2*np.pi, 30)
    v = np.linspace(0, np.pi, 30)
    x = r[frame]*np.outer(np.cos(u), np.sin(v))
    y = r[frame]*np.outer(np.sin(u), np.sin(v))
    z = r[frame]*np.outer(np.ones(len(u)), np.cos(v))
    ax1.plot_surface(x, y, z, color='lightblue', alpha=0.7)
    ax1.set_xlim(-5,5); ax1.set_ylim(-5,5); ax1.set_zlim(-5,5)
    ax1.set_title(f'Balloon at t={t[frame]:.1f}s')
    
    ax2.clear()
    ax2.plot(t[:frame+1], r[:frame+1], 'b', label='r')
    ax2.plot(t[:frame+1], V[:frame+1], 'r', label='V')
    ax2.legend(); ax2.set_xlabel('t'); ax2.set_ylabel('value')
    ax2.set_title('Radius and Volume')
    
    ax3.clear()
    ax3.plot(t[:frame+1], dr_dt[:frame+1], 'g', label='dr/dt')
    ax3.plot(t[:frame+1], dV_dt[:frame+1], 'orange', label='dV/dt')
    ax3.legend(); ax3.set_xlabel('t'); ax3.set_ylabel('rate')
    ax3.set_title('Rates of Change')
    
    fig.tight_layout()

ani = animation.FuncAnimation(fig, update, frames=len(t), interval=50)
plt.show()
```

**Teacher Narration** `[108w]`
> Imagine blowing up a spherical balloon. As air enters, the radius grows, the surface area expands, the volume increases — all at different rates, but all simultaneously. If you know how fast air enters, you can figure out how fast the radius grows at any instant. The key insight: everything is connected through geometry, and everything changes with respect to the same clock. Think of a spider web. Tug one strand and the whole web distorts. Every point moves at some rate, but those rates are linked by the web's geometry. Related rates gives you one known rate and asks you to find another elsewhere in that web.

---

### Slide 2 · [CORE]
**The Fundamental Strategy**  ·  `split_left_right`

**On-screen text** `[26w]`
Chain Rule for Related Rates: dy/dt = (dy/dx) * (dx/dt). Strategy: 1. Identify variables. 2. Write equation. 3. Differentiate implicitly wrt t. 4. Substitute and solve.

**LEFT** `[formula_block]`

**Chain Rule for Related Rates**

$$\frac{dy}{dt} = \frac{dy}{dx} \cdot \frac{dx}{dt}$$

**General Approach**
1. Identify all changing quantities.
2. Write an equation that relates them.
3. Differentiate implicitly with respect to $t$.
4. Substitute known values and solve for the unknown rate.

**RIGHT** `[visual_spec]`

*Visual Spec:* A simple flowchart with four boxes connected by arrows. Box 1: 'Variables: x(t), y(t), ...' (blue). Box 2: 'Geometric/Physical Relationship: f(x,y)=0' (green). Box 3: 'Differentiate wrt t: chain rule' (orange). Box 4: 'Substitute known rates & instant values → solve' (red). Arrows labeled 'time dependency'. Background white. Font Arial 14. Include small example: circle area A = πr², differentiate: dA/dt = 2πr dr/dt.

**Teacher Narration** `[114w]`
> Here is the engine of every related rates calculation. The chain rule says the rate of change of y with respect to time equals the instantaneous derivative of y with respect to x times the rate of change of x. But we rarely work with a single chain; we have an equation linking several variables. The strategy is always the same: identify the changing quantities, write down the relationship that holds for all time — often a geometric formula — differentiate both sides with respect to t using the chain rule, then plug in the known values at the instant of interest. Do not substitute before differentiating. The relationship must hold for all t.

---

### Slide 3 · [PRACTICE] 🎛 *[2 controls]*
**Warm-Up: Expanding Square**  ·  `split_left_right`

**On-screen text** `[12w]`
A square's side grows at 3 cm/s. When s=5 cm, find dA/dt.

**LEFT** `[steps]`

**Given:** Side length $s$ increases at 3 cm/s. Find $\frac{dA}{dt}$ when $s=5$ cm.

| Step | Action |
|------|--------|
| 1 | $A = s^2$ |
| 2 | $\frac{dA}{dt} = 2s \frac{ds}{dt}$ |
| 3 | Substitute $s=5$, $\frac{ds}{dt}=3$ |
| 4 | $\frac{dA}{dt}=2(5)(3)=30$ cm²/s |

**RIGHT** `[visual_spec]`

*Visual Spec:* Left panel: a square drawn with side length s, annotated with s and area A (shaded). Right panel: top plot shows A vs s (parabola) with current point highlighted; bottom plot shows dA/dt vs time (constant 30 after a brief moment). A slider below the plots controls ds/dt from 0.5 to 5 cm/s. A text display shows current s, A, dA/dt. Colors: square outline blue, fill light blue. Plots: A vs s red, dA/dt green. When slider is moved, the square animation updates and the rates recalculate.

*Interactive Controls:*
  - 🎛 Slider: ds/dt from 0.5 to 5 cm/s
  - 🎛 Text display: current dA/dt

```python
import numpy as np, matplotlib.pyplot as plt, matplotlib.widgets as widgets

fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(10,4))
plt.subplots_adjust(bottom=0.25)

s0 = 5
dsdt0 = 3
ax1.set_xlim(0,10); ax1.set_ylim(0,10)
ax1.set_aspect('equal')
sq = plt.Rectangle((0,0), s0, s0, fill=True, alpha=0.3, edgecolor='blue')
ax1.add_patch(sq)
ax1.text(0.2, s0/2, f's={s0}', fontsize=12)
ax1.text(0.2, 0.2, f'A={s0**2}', fontsize=12)

s_vals = np.linspace(0.1,9,200)
A_vals = s_vals**2
ax2.plot(s_vals, A_vals, 'r-', lw=2)
point, = ax2.plot([s0], [s0**2], 'bo', markersize=8)
ax2.set_xlabel('s (cm)'); ax2.set_ylabel('A (cm²)')
ax2.set_title('Area vs side')

ax3.set_xlim(0,10); ax3.set_ylim(0,50)
line_dAdt, = ax3.plot([0,10], [30,30], 'g--', lw=2)
ax3.set_xlabel('time'); ax3.set_ylabel('dA/dt (cm²/s)')
ax3.set_title('Rate of area change')

s_slider_ax = plt.axes([0.2, 0.1, 0.6, 0.03])
s_slider = widgets.Slider(s_slider_ax, 'ds/dt', 0.5, 5, valinit=dsdt0)

def update(val):
    dsdt = s_slider.val
    s = s0  # keep side fixed for this demo; can be extended
    dAdt = 2*s*dsdt
    # update square annotation
    ax1.clear()
    ax1.set_xlim(0,10); ax1.set_ylim(0,10)
    ax1.set_aspect('equal')
    sq = plt.Rectangle((0,0), s, s, fill=True, alpha=0.3, edgecolor='blue')
    ax1.add_patch(sq)
    ax1.text(0.2, s/2, f's={s}', fontsize=12)
    ax1.text(0.2, 0.2, f'A={s**2}', fontsize=12)
    # update point and rate line
    point.set_data([s], [s**2])
    line_dAdt.set_ydata([dAdt, dAdt])
    ax3.set_title(f'dA/dt = {dAdt:.1f} cm²/s')
    fig.canvas.draw_idle()

s_slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[103w]`
> Let's start with a simple warm-up. A square's side length increases at 3 centimetres per second. How fast is the area increasing when the side is 5 centimetres? The area of a square is s squared. Differentiate with respect to time using the chain rule: dA/dt equals 2 s times ds/dt. Now substitute the instant values: s equals 5 and ds/dt equals 3. That gives 2 times 5 times 3 equals 30 square centimetres per second. Notice we differentiated before substituting. The formula dA/dt equals 2 s ds/dt holds for all time — we only evaluate at s equals 5 at the end.

**Student Prompt:** Before I reveal: what step do many students get wrong when starting related rates? (Answer: substituting numbers before differentiating.)

---

### Slide 4 · [CORE]
**The Pythagorean Model**  ·  `split_left_right`

**On-screen text** `[21w]`
Pythagorean relationship: x² + y² = z². Differentiate: 2x dx/dt + 2y dy/dt = 2z dz/dt. Do NOT substitute before differentiating.

**LEFT** `[formula_block]`

$$x(t)^2 + y(t)^2 = z(t)^2$$

Differentiate implicitly:

$$2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 2z\frac{dz}{dt}$$

**Key:** Do NOT substitute known x, y, z before differentiating.
The equation must hold for all $t$.

**RIGHT** `[visual_spec]`

*Visual Spec:* A right triangle with sides x (horizontal), y (vertical), z (hypotenuse). All sides change with time; animation shows a moving point along each axis. Small arrows along each side indicate direction of change (dx/dt, dy/dt, dz/dt). Labels show current values and rates. At the bottom, the equation 2x*dx/dt+2y*dy/dt=2z*dz/dt is displayed, with terms updating dynamically. The triangle can be dragged (interactive). Colors: x blue, y green, z red, arrows orange.

**Teacher Narration** `[98w]`
> The Pythagorean theorem appears in many related rates problems: ladders, moving cars, radar guns. The fundamental equation is x squared plus y squared equals z squared, where all three sides may be changing. Differentiating implicitly with respect to time gives 2x dx/dt plus 2y dy/dt equals 2z dz/dt. This equation connects the three rates. A common mistake is to plug in the numerical values of x, y, or z before differentiating. Do not do that! The relationship holds for all times; you must differentiate the general form first. Later you substitute the values at the instant of interest.

---

### Slide 5 · [PAUSE_AND_TRY] ⏸️ *[YouTube Pause]*
**Pause & Try: Sliding Ladder**  ·  `split_left_right`

**On-screen text** `[14w]`
10-ft ladder, base slides at 2 ft/s. Find dy/dt when x=6 ft. Try it!

**LEFT** `[text]`

A 10-ft ladder rests against a wall. The base slides away from the wall at 2 ft/s. How fast is the top sliding down when the base is 6 ft from the wall?

**Try it yourself before the solution.** Write down:
- Variables
- Equation
- Differentiate
- Solve

**RIGHT** `[visual_spec]`

*Visual Spec:* Diagram: wall on left, ground on bottom. A ladder of length 10 ft (labeled) leaning against wall. Horizontal distance from wall to base: x (arrow, label 'x=6'). Vertical height from ground to top: y (arrow, label 'y=?'). Right angle at wall-floor corner. Text: 'dx/dt = 2 ft/s' near base. Question mark near top for dy/dt.

**Teacher Narration** `[92w]`
> Here is a classic problem. A 10 foot ladder rests against a vertical wall. The base slides away from the wall at a constant rate of 2 feet per second. We need to find how fast the top of the ladder is sliding down the wall at the moment when the base is 6 feet from the wall. Pause the video now, grab a pen and paper, and try to work it out. Set up the variables, write the equation, differentiate, and solve. I'll show you the full solution in a moment.

**Student Prompt:** Solve for dy/dt: show the equation and the numerical answer.

---

### Slide 6 · [PRACTICE]
**Sliding Ladder: Solution**  ·  `split_left_right`

**On-screen text** `[12w]`
Solution: dy/dt = -1.5 ft/s. The top slides down at 1.5 ft/s.

**LEFT** `[steps]`

| Step | Action |
|------|--------|
| 1 | Variables: $x(t)$ = base distance, $y(t)$ = height |
| 2 | Equation: $x^2 + y^2 = 10^2 = 100$ |
| 3 | Differentiate: $2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0$ |
| 4 | Solve: $\frac{dy}{dt} = -\frac{x}{y}\frac{dx}{dt}$ |
| 5 | Find $y$ when $x=6$: $y = \sqrt{100-36}=8$ ft |
| 6 | Substitute: $\frac{dy}{dt} = -\frac{6}{8}(2) = -1.5$ ft/s |

Negative sign means top moves downward.

**RIGHT** `[empty]`

**Teacher Narration** `[109w]`
> Here is the solution. We defined x as the distance from the wall to the base, y as the height of the top. The ladder length is constant at 10 feet, so the Pythagorean relation gives x squared plus y squared equals 100. Differentiating implicitly yields 2x dx/dt plus 2y dy/dt equals 0. Notice the derivative of the constant 100 is zero. Solve for dy/dt, getting negative x over y times dx/dt. At the instant x equals 6, we find y equals 8 via Pythagoras. Substituting the given dx/dt of 2 gives dy/dt equals negative 1.5 feet per second. The negative sign tells us the top is moving downward.

---

### Slide 7 · [CORE]
**The Similar Triangles Technique**  ·  `split_left_right`

**On-screen text** `[13w]`
Similar triangles: r/h = R/H (constant). Use to eliminate a variable before differentiating.

**LEFT** `[text]`

When a problem involves two changing variables (e.g., radius and height in a cone), use similar triangles to reduce to one variable before differentiating.

**Key idea:** If two triangles have the same angles, their side ratios are equal.

Example: Conical tank with radius $r$ and height $h$. Because the tank is a cone, the ratio $\frac{r}{h}$ is constant: $\frac{r}{h} = \frac{R}{H}$ where $R,H$ are full tank dimensions.

**RIGHT** `[visual_spec]`

*Visual Spec:* Draw a vertical cone (outline). Shade the lower part representing water. Label full cone radius R, height H. Water cone radius r, height h. Two right triangles formed by cross-section: one for full cone (legs H and R), one for water (legs h and r). Indicate with arrows that the ratios R/H = r/h are equal. Colors: full cone light gray outline, water blue, triangles dashed black.

**Teacher Narration** `[97w]`
> In the conical tank problem, both the radius and the height of the water change as water pours in. That gives us two unknowns. But the geometry of the cone provides a constraint: by similar triangles, the ratio of radius to height is constant and equal to the ratio of the full tank's radius to its height. This allows us to rewrite the volume formula purely in terms of one variable — say height — eliminating the radius. Always look for such geometric constraints. They turn a two-variable problem into a single-variable one, making the differentiation straightforward.

---

### Slide 8 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Tricky: Conical Tank**  ·  `split_left_right`

**On-screen text** `[15w]`
Water pumped into conical tank at 5 ft³/min. Tank: H=12, R=4. Find dh/dt when h=6.

**LEFT** `[steps]`

**Given:** Water pumped into a conical tank (height 12 ft, radius top 4 ft) at 5 ft³/min. Find how fast water level rises when water is 6 ft deep.

| Step | Action |
|------|--------|
| 1 | $V = \frac{1}{3}\pi r^2 h$ (both change) |
| 2 | Similar triangles: $\frac{r}{h} = \frac{4}{12} = \frac{1}{3}$ → $r = h/3$ |
| 3 | $V = \frac{1}{3}\pi (h/3)^2 h = \frac{\pi}{27} h^3$ |
| 4 | $\frac{dV}{dt} = \frac{\pi}{9} h^2 \frac{dh}{dt}$ |
| 5 | Solve: $\frac{dh}{dt} = \frac{9}{\pi h^2}\frac{dV}{dt}$ |
| 6 | Substitute $h=6$, $dV/dt=5$: $\frac{dh}{dt} = \frac{45}{36\pi} = \frac{5}{4\pi} \approx 0.398$ ft/min |

**RIGHT** `[visual_spec]`

*Visual Spec:* Left: cross-section of conical tank (blue water, gray outline). Axis labels: height h, radius r. Slider to vary dV/dt from 1 to 10 ft³/min. As slider moves, water level rises accordingly (simulated). Right panel: graph of h vs time (accumulating) and current dh/dt displayed. Colors: water blue, tank outline black, graph red. Show similar triangle ratios inset.

*Interactive Controls:*
  - 🎛 Slider: dV/dt from 1 to 10 ft³/min
  - 🎛 Text display: current dh/dt

```python
import numpy as np, matplotlib.pyplot as plt, matplotlib.widgets as widgets

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(9,4))
plt.subplots_adjust(bottom=0.25)

# Tank dimensions
H_full = 12.0
R_full = 4.0
h_current = 6.0
dVdt = 5.0

# Draw tank
ax1.set_xlim(-5,5); ax1.set_ylim(0, H_full+1)
ax1.set_aspect('equal')
ax1.axhline(0, color='gray')
# full cone outline
cone_x = np.linspace(-R_full, R_full, 100)
cone_y = H_full * (1 - np.abs(cone_x)/R_full)  # actually linear: y = H*(1 - |x|/R)
# better: use two lines
ax1.plot([-R_full,0], [0, H_full], 'k-', lw=2)
ax1.plot([R_full,0], [0, H_full], 'k-', lw=2)
ax1.fill_betweenx([0, h_current], - (R_full*h_current/H_full), (R_full*h_current/H_full), color='blue', alpha=0.4)
ax1.plot([0,0],[0,H_full], '--', color='gray')
ax1.text(0.5, h_current/2, f'h={h_current:.1f}', fontsize=10)
ax1.set_title('Conical Tank')

ax2.set_xlim(0,10); ax2.set_ylim(0,2)
line_dh, = ax2.plot([0,10], [0.398, 0.398], 'g--')
ax2.set_xlabel('t (min)'); ax2.set_ylabel('dh/dt (ft/min)')
ax2.set_title('Current dh/dt')

dVdt_slider_ax = plt.axes([0.2, 0.1, 0.6, 0.03])
dVdt_slider = widgets.Slider(dVdt_slider_ax, 'dV/dt', 1.0, 10.0, valinit=dVdt)

def update(val):
    dVdt = dVdt_slider.val
    dhdt = (9/(np.pi * h_current**2)) * dVdt
    ax1.clear()
    ax1.set_xlim(-5,5); ax1.set_ylim(0, H_full+1)
    ax1.set_aspect('equal')
    ax1.axhline(0, color='gray')
    ax1.plot([-R_full,0], [0, H_full], 'k-', lw=2)
    ax1.plot([R_full,0], [0, H_full], 'k-', lw=2)
    r_w = R_full * h_current / H_full
    ax1.fill_betweenx([0, h_current], -r_w, r_w, color='blue', alpha=0.4)
    ax1.plot([0,0],[0,H_full], '--', color='gray')
    ax1.text(0.5, h_current/2, f'h={h_current:.1f}', fontsize=10)
    ax1.set_title('Conical Tank')
    line_dh.set_ydata([dhdt, dhdt])
    ax2.set_title(f'dh/dt = {dhdt:.3f} ft/min')
    fig.canvas.draw_idle()

dVdt_slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[148w ⚠️ **OVERLONG: 148w > 120w max**]`
> Now a trickier problem. Water is pumped into a conical tank at 5 cubic feet per minute. The tank is 12 feet tall with a radius of 4 feet at the top. How fast is the water level rising when the water is 6 feet deep? The volume of a cone is one third pi r squared h. Both r and h change. But by similar triangles, the ratio r over h is constant: 4 over 12 equals one third. So r equals h over three. Substituting into the volume formula gives V equals pi over 27 times h cubed. Differentiate with respect to t: dV/dt equals pi over 9 times h squared times dh/dt. Solve for dh/dt, then substitute h equals 6 and dV/dt equals 5. The answer is about 0.398 feet per minute. Notice we used similar triangles to eliminate the radius — a crucial step.

---

### Slide 9 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] The Moment the Ladder Hits the Ground**  ·  `split_left_right`

**On-screen text** `[17w]`
As base reaches 10 ft, y → 0, so dy/dt → -∞. Physical model breaks: ladder detaches.

**LEFT** `[text]`

In the ladder problem, what happens to $\frac{dy}{dt}$ as $x \to 10$ ft?

Recall $\frac{dy}{dt} = -\frac{x}{y}\frac{dx}{dt}$ and $y = \sqrt{100 - x^2}$.

As $x \to 10$, $y \to 0$, so $\frac{dy}{dt} \to -\frac{10}{0}\frac{dx}{dt} \to -\infty$.

**Physical interpretation:** The top's speed becomes infinite — impossible. The model breaks down because the ladder loses contact with the wall before the base reaches 10 ft.

**RIGHT** `[visual_spec]`

*Visual Spec:* Graph: x-axis x from 0 to 10, y-axis dy/dt from 0 to -50. Curve shows dy/dt = -x/sqrt(100-x^2)*dx/dt (with dx/dt=2). As x approaches 10, curve plunges downward. Vertical asymptote at x=10. Label: 'Model fails here'. Inset cartoon: ladder detaching from wall. Colors: curve red, asymptote dashed, cartoon simple.

**Teacher Narration** `[113w]`
> Here is a deeper look at the ladder problem. What happens as the base approaches the full ladder length of 10 feet? The height y goes to zero, and the expression for dy/dt involves division by y. That means the downward speed of the top becomes arbitrarily large, theoretically infinite. But physically that cannot happen. A real ladder would lose contact with the wall long before the base reaches the full length. So our mathematical model has a limitation: it assumes the top stays in contact with the wall, which fails when the ladder becomes nearly horizontal. This is a good reminder that mathematical models have assumptions that can break down at extremes.

**Student Prompt:** Discuss: What physical assumption fails in the ladder model?

---

### Slide 10 · [PRACTICE] 🟡 ⏸️ *[YouTube Pause]* 🎛 *[2 controls]*
**Application: Radar Gun & Speeding**  ·  `split_left_right`

**On-screen text** `[16w]`
Police 50 ft from highway. Radar: ds/dt = -80 ft/s when s=130 ft. Find car speed.

**LEFT** `[steps]`

**Problem:** Police car 50 ft from highway. Radar measures distance decreasing at 80 ft/s when car is 130 ft away. How fast is car traveling?

| Step | Action |
|------|--------|
| 1 | $x$: car's position along highway; $s$: police-to-car distance |
| 2 | Equation: $s^2 = x^2 + 50^2$ |
| 3 | Differentiate: $2s\frac{ds}{dt} = 2x\frac{dx}{dt}$ |
| 4 | Solve: $\frac{dx}{dt} = \frac{s}{x}\frac{ds}{dt}$ |
| 5 | When $s=130$, $x=\sqrt{130^2-50^2}=120$ ft |
| 6 | $\frac{dx}{dt} = \frac{130}{120}(80) \approx 86.67$ ft/s ≈ 59.1 mph |

**Key:** Radar measures rate of change of distance, not car's actual speed.

**RIGHT** `[visual_spec]`

*Visual Spec:* Top-down diagram: straight horizontal highway, police car at point P 50 ft above the highway (y=50). Car at C on highway (x=0 at closest point). Line from P to C labeled s, horizontal distance x. A slider allows moving the car left/right (changing x). As x changes, s updates and ds/dt is displayed (constant -80 ft/s). A calculated speed dx/dt is shown. Colors: car red, police blue, line s dashed black. Real-time annotations: 's = ...', 'ds/dt = -80', 'dx/dt = ...'.

*Interactive Controls:*
  - 🎛 Slider: car position x from -200 to 200 ft
  - 🎛 Text display: current s and dx/dt

```python
import numpy as np, matplotlib.pyplot as plt, matplotlib.widgets as widgets

fig, ax = plt.subplots(figsize=(6,6))
plt.subplots_adjust(bottom=0.2)

ax.set_xlim(-200,200)
ax.set_ylim(-50,100)
# highway
ax.axhline(0, color='gray', lw=2)
ax.text(180, -10, 'Highway', fontsize=10)
# police car at (0,50)
police, = ax.plot(0,50, 'bs', markersize=15, label='Police')
# car at x
x_init = 120
car, = ax.plot(x_init, 0, 'ro', markersize=15, label='Car')
line, = ax.plot([0, x_init], [50, 0], 'k--', lw=2)
s_init = np.sqrt(x_init**2 + 50**2)
text_s = ax.text(0.2, 0.9, f's={s_init:.0f}', transform=ax.transAxes, fontsize=12)
text_dx = ax.text(0.2, 0.8, f'dx/dt=?', transform=ax.transAxes, fontsize=12)
ax.legend()
ax.set_aspect('equal')

x_slider_ax = plt.axes([0.2, 0.05, 0.6, 0.03])
x_slider = widgets.Slider(x_slider_ax, 'Car position x', -200, 200, valinit=x_init)

def update(val):
    x = x_slider.val
    s = np.sqrt(x**2 + 50**2)
    dsdt = -80  # given
    dxdt = (s/x) * dsdt if x != 0 else 0
    car.set_data([x], [0])
    line.set_data([0, x], [50, 0])
    text_s.set_text(f's={s:.0f} ft')
    text_dx.set_text(f'dx/dt = {dxdt:.2f} ft/s')
    fig.canvas.draw_idle()

x_slider.on_changed(update)
plt.show()
```

**Teacher Narration** `[153w ⚠️ **OVERLONG: 153w > 120w max**]`
> Let's apply related rates to a real-world scenario. A police car is parked 50 feet from a straight highway. A radar gun measures the rate at which the distance between the car and the police car is decreasing. At one instant, that rate is 80 feet per second, and the car is 130 feet from the police car. How fast is the car actually traveling along the highway? We set up a right triangle with the fixed perpendicular distance of 50 feet. The distance s is the hypotenuse. Differentiating s squared equals x squared plus 2500 gives 2s ds/dt equals 2x dx/dt. Solve for dx/dt. When s is 130, x is 120 feet. Substituting gives about 86.67 feet per second, which converts to roughly 59 miles per hour. Notice the radar gun measures the rate of change of the distance, not the car's speed along the road — that is a crucial distinction.

---

### Slide 11 · [MISCONCEPTION]
**Common Mistake: Substituting Before Differentiating**  ·  `split_left_right`

**On-screen text** `[15w]`
MISTAKE: Plugging in numbers before differentiating – yields 0=0. Always differentiate the general formula first.

**LEFT** `[text]`

**Wrong approach in ladder problem:**

Substitute $x=6$, $y=8$ into $x^2+y^2=100$ before differentiating:
$$36 + 64 = 100$$
Then differentiate: $0+0 = 0$ — you lose all rates!

**Correct:** Differentiate first:
$$2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0$$
Then substitute values and rates.

**Why it matters:** The equation must hold for *all* times, not just the instant. Differentiating the numerical version gives nonsense.

**RIGHT** `[visual_spec]`

**Teacher Narration** `[115w]`
> This is the most common mistake students make in related rates. They see the numbers from the problem and immediately substitute them into the equation before differentiating. For example, in the ladder problem, x equals 6 and y equals 8. If you substitute first, you get 36 plus 64 equals 100. Differentiating that gives zero equals zero, which tells you nothing about the rates. The correct approach is to keep the variables symbolic: x squared plus y squared equals 100. Differentiate to get 2x dx/dt plus 2y dy/dt equals 0. Only then do you substitute the known values and rates. The equation relates the changing quantities at any moment; you must differentiate the general relationship.

**Student Prompt:** Why is it wrong to substitute numbers before differentiating?

---

### Slide 12 · [CHALLENGE] 🔴 *[Challenge – Optional]* *(skip if time-limited)*
**[Challenge – Optional] Theorem Proof (Lightweight)**  ·  `split_left_right`

**On-screen text** `[16w]`
Theorem: ∂F/∂x * dx/dt + ∂F/∂y * dy/dt = 0. Proof: differentiate F(x(t),y(t))=0 with chain rule.

**LEFT** `[text]`

If $x(t), y(t)$ are differentiable and satisfy $F(x,y)=0$, then:

$$\frac{\partial F}{\partial x}\frac{dx}{dt} + \frac{\partial F}{\partial y}\frac{dy}{dt} = 0$$

**Proof:**
1. $F(x(t), y(t)) = 0$ for all $t$
2. Differentiate both sides w.r.t $t$:
   $\frac{d}{dt}F = \frac{\partial F}{\partial x}\frac{dx}{dt} + \frac{\partial F}{\partial y}\frac{dy}{dt} = 0$
3. Thus $\frac{dy}{dt} = -\frac{\partial F/\partial x}{\partial F/\partial y}\frac{dx}{dt}$

This shows the ratio of rates equals the ratio of partial derivatives.

**RIGHT** `[visual_spec]`

*Visual Spec:* Plot a curve F(x,y)=0 (e.g., x²+y²=100) in xy-plane. At a point (x,y) on curve, draw a tangent vector (dx/dt, dy/dt). Show partial derivatives as slopes of grid lines. Annotate: ∂F/∂x and ∂F/∂y as small arrows along axes. Show how the dot product (∂F/∂x, ∂F/∂y)·(dx/dt, dy/dt)=0. Colors: curve blue, tangent vector red, partial derivative arrows green.

**Teacher Narration** `[113w]`
> For those interested in the theory behind related rates, here is a general theorem. Suppose two differentiable functions x and y satisfy an equation F of x and y equals zero for all time. Differentiating both sides with respect to t, using the multivariable chain rule, gives the sum of the partial derivative of F with respect to x times dx/dt plus the partial derivative with respect to y times dy/dt equals zero. This shows that the rates of change are linked by the geometry of the relationship: the ratio of dy/dt to dx/dt is the negative of the ratio of the partial derivatives. This generalises every related rates problem you will see.

---

### Slide 13 · [SUMMARY]
**Pro Tips & Recap**  ·  `full_width`

**On-screen text** `[13w]`
Pro Tips: Draw diagram, differentiate first, use similar triangles, check signs and units.

**FULL WIDTH** `[text]`

**Key Reminders:**
- Draw a picture first. Label variables and constants.
- Write the geometric/physical equation.
- Differentiate implicitly with respect to $t$ before substituting.
- Use similar triangles to eliminate extra variables.
- Always include units in final answer.

**Check Your Work:**
- Is the sign correct? (e.g., negative for decreasing)
- Does the answer make sense physically?
- Are units consistent?

**Teacher Narration** `[92w]`
> Let's quickly review the key strategies. Always draw a picture and label all changing quantities with variables, constants with numbers. Write down the geometric or physical relationship. Then differentiate implicitly with respect to time — never substitute before differentiating. If there are two changing variables, look for a constraint like similar triangles to reduce to one variable. Finally, check that your answer has the correct sign and units. If your answer says the ladder's top is moving upward when the base slides away, you know something is wrong. Trust your physical intuition.

---

### Slide 14 · [SUMMARY]
**Learning Objectives — Achieved**  ·  `full_width`

**On-screen text** `[13w]`
Objectives achieved: calculate rates, interpret problems, apply chain rule, analyze geometry, solve applications.

**FULL WIDTH** `[text]`

You can now:
- **Calculate** rates of change using implicit differentiation with respect to time.
- **Interpret** related rates problems by identifying known and unknown rates.
- **Apply** the chain rule to link rates of multiple variables.
- **Analyze** word problems to extract geometric relationships.
- **Solve** problems like ladder, cone, and radar gun scenarios.

**Key Formulas:**
- Chain rule: $\frac{dy}{dt} = \frac{dy}{dx}\frac{dx}{dt}$
- Pythagorean: $x^2+y^2=z^2$ → $2x\dot{x}+2y\dot{y}=2z\dot{z}$
- Volume of cone: $V=\frac13\pi r^2 h$
- Similar triangles: $\frac{r}{h}=\frac{R}{H}$

**Teacher Narration** `[98w]`
> Congratulations. You have mastered the core techniques of related rates. You can now calculate rates of change in geometric systems by differentiating implicit relationships with respect to time. You can interpret a word problem, identify what is given and what is unknown, and set up the correct equation. You have applied the chain rule in context, used similar triangles to simplify, and even explored the limitations of the ladder model. With these tools, you are ready to tackle a wide class of problems in calculus and physics. Keep practicing the four-step approach: draw, write, differentiate, substitute. Thank you.

---
