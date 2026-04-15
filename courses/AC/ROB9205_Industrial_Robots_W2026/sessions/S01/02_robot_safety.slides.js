export const topicMeta = {
  id: "02_robot_safety",
  title: "Robot Safety",
  duration: 60 // or whatever feels right
};

const slidesData = [
  // ---------- Page 1 ----------
  {
    type: "title",
    hud: "Robot Safety",
    title: "Robot Safety for Us",
    subtitle: "Robot Safety",
    meta: "ROB9205 --  INDUSTRIAL ROBOTS",
    notes:
      "Welcome everyone. Before we touch any robot, we’re going to set one standard for this lab: safety comes first, every time. Today’s topic is Robot Safety for Us; what we do, how we behave, and what we do in an emergency. If you remember one thing: your goal is to leave the lab with the same number of fingers and the same health you came in with.",
  },

  // ---------- Page 2 ----------
  {
    type: "bullets",
    hud: "Robot Safety",
    title: "Safety: Why is it so important?",
    bullets: [
      "Industrial Robots are powerful tools",
      "Extremely useful in automation",
      "Extremely dangerous if improperly handled",
      "Impacts between humans and robots can break bones",
      "Even small industrial robots can crush you if you give it leverage",
      "There exists extensive safety measures in industry but accidents still occur",
    ],
    notes:
      "Industrial robots are fantastic tools; fast, precise, and incredibly useful for automation. But that same power makes them dangerous if we treat them casually. A collision isn’t a small bump; it can break bones. And even a small robot can pin you if it gets leverage; especially if you’re between the robot and something fixed. Industry has many safety systems, but accidents still happen; usually because of human behavior, bad habits, or skipping steps. In this course, we build good habits from day one.",
  },

  // ---------- Page 3 ----------
  {
    type: "bullets",
    hud: "Robot Safety",
    title: "Safety: Why is it so important?",
    lead: "What we will be doing",
    bullets: [
      "… many robot accidents do not occur under normal operating conditions but, instead during programming, program touch-up or refinement, maintenance, repair, testing, setup, or adjustment.",
    ],
    notes:
      "This point is critical: most robot accidents do not happen during normal production runs. They happen when people are close to the robot; programming, touch-up, maintenance, repair, testing, setup, or adjustments. That’s exactly what we do in a teaching lab. So we assume risk is higher during our work, and we manage it by roles, communication, and strict procedure. If you ever feel rushed or uncertain, you stop and you ask; no exceptions.",
  },

  // Engagement (NOT from quiz)
  {
    type: "mcq",
    hud: "Robot Safety",
    title: "Quick question (class discussion)",
    question: "When do many robot accidents happen (according to the slide)?",
    questionSay:
      "Quick question. When do many robot accidents happen according to the slide?",
    options: [
      { choice: "A", label: "Only during normal operating conditions" },
      {
        choice: "B",
        label:
          "During programming, touch-up, maintenance, testing, setup, or adjustment",
      },
      { choice: "C", label: "Only when the robot is powered off" },
      { choice: "D", label: "Only when the robot is behind a fence" },
    ],
    correct: "B",
    explain:
      "Most accidents do not occur under normal operation, but during programming/touch-up/maintenance/testing/setup/adjustment.",
    notes:
      "Let’s use this question to wake up our ‘safety brain.’ The correct answer is B. I want you to connect that to our lab reality: we will be doing programming, touch-up, and setup frequently; meaning we have to be more disciplined than a typical production operator. Think: slower, more careful, more communication.",
  },

  // ---------- Page 4 ----------
  {
    type: "two-col",
    hud: "Robot Safety",
    title: "Safety: Emergency Stops",
    left: {
      bullets: [
        "Before working with any robot, you must know the location of the emergency stops.",
        "If an emergency occurs, the robot behaves unexpectedly, the robot impacts an obstacle, or anything else dangerous, press the button.",
      ],
    },
    right: {
      html: `
        <figure class="media">
          <img src="./media/robot_safety_estop.png" alt="E-Stop" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Source: Robot Safety.pdf (E-Stop image).
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Now; Emergency Stops. Before you run anything, you must physically identify the E-stops in your area. Not ‘I think it’s over there’; you point to it. If anything looks unsafe; unexpected motion, collision risk, someone stepping into the work area; hit the E-stop. You will never be penalized for stopping the robot for safety. In fact, I prefer a ‘false alarm’ over a real injury. Today in the lab we’ll assign one person as the E-stop person; your safety driver.",
  },

  // ---------- Page 5 ----------
  {
    type: "bullets",
    hud: "Robot Safety",
    title: "Safety: Safe Behaviour around Robots",
    bullets: [
      "Always give the robot or automated system a visual inspection before startup for any potential for collisions or other safety hazards.",
      "Keep the entire robot or automated system area free of clutter and debris.",
      "Remove any dangly jewelry before working on the robot.",
      "Do not wear loose or flowing clothing while working on the robot.",
      "Do not enter the working radius of the robot while the robot is in operation.",
      "Do not play fight with the robot.",
      "No playing, pushing or shoving while the robot is in operation.",
      "Do not attempt to perform any type of surgical operations on humans with the robot arm (yes, this is actually in many user’s manuals).",
      "No food or drink near the robot",
    ],
    notes:
      "These are the behaviors that keep you safe. First: a visual inspection before startup; look for anything that could cause a collision, a snag, or a surprise. Second: no clutter. Cables, tools, parts, even backpacks; keep them out of the robot area. Third: clothing and jewelry; anything loose can get caught, and that becomes a pulling hazard. Fourth: never enter the working radius while the robot is running. And finally: no horseplay. No pushing, no joking around the robot. The robot doesn’t know it’s a joke; and it won’t stop because you’re laughing. Also: no food and drink near equipment. Spills ruin hardware and create electrical risk.",
  },

  // Engagement (NOT from quiz)
  {
    type: "bullets",
    hud: "Robot Safety",
    title: "Quick check (pair activity)",
    lead: "In pairs, point to the lab and answer:",
    bullets: [
      "Where is the working radius (work envelope) for our robot cell?",
      "What would count as “clutter and debris” around our setup today?",
      "Name two things you should remove or avoid wearing before working on the robot.",
    ],
    notes:
      "Quick pair activity. You have about one minute. Physically point to the work envelope; the area the robot can reach. Then identify what counts as clutter for today’s setup. And finally, name two wearable items that are not acceptable near the robot. The goal is to make these checks automatic before every lab.",
  },

  // ---------- Page 6 ----------
  {
    type: "bullets",
    hud: "Robot Safety",
    title: "Safety: Safe Behaviour around Robots",
    bullets: [
      "ALWAYS WORK IN GROUPS",
      "Always have one person on the emergency stop",
      "The emergency stop will stop the robot from moving when pressed.",
      "Always double check connections",
      "Never use the robot if there is unexplained behaviour",
    ],
    notes:
      "This is our operating rule in this lab: always work in groups. One person operates, one person is ready on the E-stop, and others observe and communicate. If you’re alone, you’re missing a safety layer. Also, we double check connections; loose cables, wrong ports, damaged connectors can cause unpredictable behavior. And the last point is non-negotiable: if the robot is doing something unexplained, you stop. You don’t ‘see what happens’ and you don’t ‘try again’; you stop and we diagnose safely.",
  },

  // Engagement (NOT from quiz)
  {
    type: "mcq",
    hud: "Robot Safety",
    title: "Role check",
    question: "During programming/touch-up work, what is a safe team setup?",
    questionSay:
      "Role check. During programming or touch-up work, what is a safe team setup?",
    options: [
      { choice: "A", label: "Work alone to avoid distractions" },
      {
        choice: "B",
        label:
          "One person operates while another is ready on the emergency stop",
      },
      {
        choice: "C",
        label: "Everyone stands inside the working radius to watch closely",
      },
      {
        choice: "D",
        label: "No need to check connections if the program ran once",
      },
    ],
    correct: "B",
    explain:
      "The slide states: ALWAYS WORK IN GROUPS and always have one person on the emergency stop.",
    notes:
      "Correct answer is B. In a real workplace, roles exist for a reason. In our lab, this prevents the most common accidents; someone too close, someone distracted, or someone surprised by motion. I want you to build the habit: operator speaks before motion, E-stop person confirms ready, and everyone else stays out of the envelope.",
  },

  // ---------- Page 7 ----------
  {
    type: "bullets",
    hud: "Robot Safety",
    title: "Safety: Preventative Maintenance",
    bullets: [
      "Make sure the robot is properly bolted down and that the bolts have not loosened",
      "Make sure that there are no obstacles in the robot’s working radius",
      "Make sure that all cables are properly connected, that none are loose or damaged",
      "On power up, ensure that the controller turns on",
      "On power up, ensure that the motor or arm power turns on",
      "On power up, ensure that any fans are working properly",
      "On power up, ensure that there are no funny noises coming from the controller or arm motors",
      "On power up, ensure that there are no unusual vibrations coming from the robot arm",
    ],
    notes:
      "Preventative maintenance is mostly good observation. Before you start, check the robot is stable and properly bolted down. Clear the work envelope. Inspect cables; no loose connectors, no damaged insulation, no strain on cords. During power-up, you confirm the controller turns on, arm power comes on, and fans work. Listen for abnormal sounds; grinding, buzzing, clicking; and watch for unusual vibration. If something sounds or feels wrong, you stop and report it. This is how technicians protect equipment and people.",
  },

  // ---------- Page 8 ----------
  {
    type: "two-col",
    hud: "Robot Safety",
    title: "Safety: Safety Measures",
    left: { lead: "Infrared Safety Light Curtains", bullets: [] },
    right: {
      html: `
        <figure class="media">
          <img src="./media/robot_safety_p08.png" alt="Infrared Safety Light Curtains diagram" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Source: Robot Safety.pdf, page 8.
          </figcaption>
        </figure>
      `,
    },
    notes:
      "Here’s an example of an engineered safety control: infrared light curtains. There’s a transmitter and a receiver creating a ‘wall’ of invisible beams. If anything breaks that beam; like a hand entering the cell; the system can trigger a stop. The key idea is layered safety: rules help, but physical safeguards reduce risk even when humans make mistakes.",
  },

  // ---------- Page 9 ----------
  {
    type: "two-col",
    hud: "Robot Safety",
    title: "Safety: Safety Measures",
    left: { lead: "Workcell barriers / guarded areas", bullets: [] },
    right: {
      html: `
        <figure class="media">
          <img src="./media/robot_safety_p09.png" alt="Robot workcell illustration with safety barrier" class="fit-contain"/>
          <figcaption class="muted" style="font-size:14px; margin-top:8px;">
            Source: Robot Safety.pdf, page 9.
          </figcaption>
        </figure>
      `,
    },
    notes:
      "This is what a guarded workcell looks like. Barriers, fencing, and controlled access keep people out of the robot’s danger zone during operation. In our lab we may not have a full industrial cell, but the principle is identical: define the envelope, keep people out during motion, and control access with clear procedures and an E-stop person.",
  },

  // ---------- Page 10 ----------
  {
    type: "bullets",
    hud: "Robot Safety",
    title: "Other Safety Measures",
    bullets: [
      "Signs: Signs change the behaviour of users to avoid dangerous behaviours. The signs should be flashy and eye catching",
      "Taped Off Regions: The area the robot can reach should be taped off to inform those around it that the area should not be entered when the robot is on.",
    ],
    notes:
      "Signs and taped regions are simple, but effective. Signs remind you of hazards and change behavior; especially for visitors or people unfamiliar with the cell. Taped regions mark the robot’s reach so everyone can see the boundary at a glance. In our lab, treat tape like a wall when the robot is on. If you need to cross it, robot motion must be stopped first.",
  },

  // Engagement (NOT from quiz)
  {
    type: "bullets",
    hud: "Robot Safety",
    title: "Mini-scenario (class discussion)",
    lead: "A robot is powered on, but the tape boundary is unclear or missing.",
    bullets: [
      "What should the group do before running the robot?",
      "Who should you inform?",
      "How do you prevent someone else from stepping into the working radius?",
    ],
    notes:
      "Let’s think like technicians. If the boundary is unclear, you don’t run. You stop, you define the envelope, and you make it visible; tape, cones, signage; whatever the lab uses. You inform me or the lab supervisor so we keep standards consistent. And you prevent accidental entry by assigning a spotter and controlling the area before any motion begins.",
  },

  // ---------- Page 11 ----------
  {
    type: "bullets",
    hud: "Robot Safety",
    title: "Human Impact",
    bullets: [
      "Unfortunately there may come a time when the robot collides with one of us in this class",
      "If this happens, press the E-Stop and help release the person if they are being pinched or pinned. (This may involve limping the robot arm, or releasing the robot brakes. Take your time to figure this out before moving the person.)",
      "Tell your Professor immediately – if you are dealing with the casualty and the Professor is not right at hand, send someone else for the professor.",
      "If there is an obvious injury, get someone to dial ‘5000’ on the Emergency Phone at the front of the lab. Tell them you need First Aid, and give them the lab number – T221",
    ],
    notes:
      "We need to be realistic: collisions can happen. If it happens, the first action is always E-stop; stop motion. Then assess: is the person pinned or being pinched? If they are, you carefully release them. Do not rush; do not yank them out. You may need to limp the arm or release brakes; only do what you’re trained to do, and keep calm. Notify me immediately. If I’m not right there, one person stays with the casualty and another person comes to get me. If there’s an obvious injury, call 5000 on the emergency phone and give them the lab number, T221.",
  },

  // ---------- Page 12 ----------
  {
    type: "bullets",
    hud: "Robot Safety",
    title: "Human Impact",
    lead: "In summary, in case of emergency:",
    bullets: [
      "Press the E-stop.",
      "Keep calm.",
      "Send someone to get help.",
      "If someone is pinned, move the robot by hand to release them.",
      "Reassure the injured person.",
      "Inform the instructors.",
    ],
    notes:
      "This is the emergency sequence I want you to memorize. Press the E-stop. Keep calm; panic causes mistakes. Send someone to get help right away. If someone is pinned, release them carefully, and only in a controlled way. Reassure the injured person and keep them still if needed. Then inform the instructors so we can follow the proper reporting and medical process. We’ll also physically locate the emergency phone so you know exactly where it is.",
  },

  // -------------------------------------------------------------------
  // Small crossover reminders from Electrical Safety + Safety Manuals
  // (Not phrased like quiz items; no quiz question text used)
  // -------------------------------------------------------------------

  {
    type: "bullets",
    hud: "Robot Safety",
    title: "Crossover: Electrical safety in a robot lab",
    lead: "Robots are mechanical hazards AND electrical hazards.",
    bullets: [
      "It’s the current through your body that causes the injury; voltage drives current and time matters.",
      "Shock severity depends on conditions (skin condition, wetness, contact area, and the path through the body).",
      "Arc flash is a major danger: extreme heat, pressure wave, blinding light, flying debris/projectiles, and fumes.",
    ],
    notes:
      "Quick crossover reminder: robot labs are not only mechanical hazards. We also work around electricity; controllers, power supplies, cabinets, wiring. It’s the current through the body that causes injury, and time matters. Conditions like wet skin or damaged skin increase risk, and the path through the body is important. And arc flash is its own category of danger; heat, pressure wave, bright light, debris, fumes; meaning you can be injured even without touching conductors. So we treat electrical areas with the same respect we treat robot motion.",
  },

  {
    type: "bullets",
    hud: "Robot Safety",
    title: "Crossover: Safe work approach (lab mindset)",
    bullets: [
      "Assume a circuit is live until proven otherwise.",
      "Avoid working live unless trained and required ;  if it must be done, plan hazards, PPE, and steps first.",
      "Use a safe verification approach to confirm “dead” before touching (meter check → target check → meter check again).",
      "Use lockout/tagout principles when equipment is being serviced or left for another person/shift.",
    ],
    notes:
      "Here’s the lab mindset I expect: assume live until you prove it’s dead. We avoid live work unless there’s a justified reason and the proper training, planning, and PPE are in place. If you need to verify a circuit is dead, do it safely; check your meter on a known live source, check the target, and then check the meter again. That way you don’t trust a broken meter. And when equipment is being serviced or handed over, we use lockout and tagout principles so nobody energizes something while another person is working on it.",
  },

  // Engagement (NOT from quiz)
  {
    type: "mcq",
    hud: "Robot Safety",
    title: "Scenario question (stay alert)",
    question:
      "You need to touch wiring inside a control cabinet. What is the safest first mindset before you put your hands in?",
    questionSay:
      "Scenario question. You need to touch wiring inside a control cabinet. What is the safest first mindset before you put your hands in?",
    options: [
      {
        choice: "A",
        label: "Assume it is safe because the robot is not moving",
      },
      { choice: "B", label: "Assume it is live until proven otherwise" },
      { choice: "C", label: "Assume low voltage cannot hurt you" },
      { choice: "D", label: "Assume insulation always protects you" },
    ],
    correct: "B",
    explain:
      "Good lab mindset: assume live until proven otherwise, then verify safely.",
    notes:
      "Correct answer is B. ‘Robot not moving’ does not mean ‘safe to touch wiring.’ The safe default is: assume live until proven otherwise. Then you verify properly. This mindset prevents most electrical accidents because it forces you to slow down, test, and plan instead of guessing.",
  },
];

export default slidesData;
