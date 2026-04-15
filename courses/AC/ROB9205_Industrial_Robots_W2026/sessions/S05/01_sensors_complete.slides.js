// courses/AC/ROB9205_Industrial_Robots_W2026/sessions/S02/01_sensors_complete.slides.js

export const topicMeta = {
  id: "01_sensors_complete",
  title: "Sensors for Robotics (I + II)",
  duration: 120,
};

const A = (relPath) => new URL(relPath, import.meta.url).href;

const slidesData = [
  // =========================
  // SENSORS I (Sensors.pdf)
  // =========================

  // 1 — TITLE
  {
    type: "title",
    hud: "Sensors I",
    title: "Sensors for Robotics",
    subtitle: "Characteristics, PNP/NPN, and Common Sensor Types",
    meta: "Instructor: Ali Karimzadeh • ROB9205 Industrial Robots",
    notes:
      "Keep the original flow; I only improved readability and added a few light explanation + quiz slides",
  },

  // 2 — WELCOME QUOTE (bulleted for readability)
  {
    type: "bullets",
    hud: "Welcome",
    title: "Welcome",
    bullets: [
      "“One can state, without exaggeration, that the **observation** of and the",
      "search for **similarities** and **differences** are the basis of all human knowledge”",
      "Alfred Nobel",

      "Sensors are how robots **observe** and **compare**",
    ],
  },

  // 3 — FURTHER RESOURCES (same content + clickable links)
  {
    type: "bullets",
    hud: "Resources",
    title: "Further Resources",
    lead: "The following resources were used in the development of the slides and can be used to find further information",
    bullets: [
      "**Introduction to Mechatronics and Measurement Systems** by David G Alciatore and Michael B Histand",
      "**Introduction to Robotics: Analysis, Control and Applications** by Saeed B Niku",
      "**Medical Instrumentation: Application and Design** by John G Webster",

      "[Omega: Thermocouple vs RTD](https://www.omega.co.uk/temperature/z/thermocouple-rtd.html)",
      "[Midori: Difference between Potentiometer and Encoder](https://www.midoriamerica.com/news/the-difference-pot-and-encoder/)",
    ],
  },

  // 4 — OUTLINE
  {
    type: "bullets",
    hud: "Outline",
    title: "Outline",
    bullets: [
      "**Introduction** to sensors",
      "**Characteristics** of sensors",
      "**Transistor based** sensors: PNP vs NPN",
      "**Types** of sensors",
    ],
  },

  // + (ADDED) — STRUCTURE / CATEGORIZATION (light, helps students)
  {
    type: "bullets",
    hud: "Structure",
    title: "A Simple **Sensor Map**",
    lead: "Same sensors, clearer structure",
    bullets: [
      "**Proprioceptive** (Internal) sensors measure the **robot itself**",
      "Examples: **encoders**, **Hall sensors**, **strain gauges**",

      "**Exteroceptive** (External) sensors measure the **environment**",
      "Examples: **proximity**, **ultrasonic**, **LiDAR**, **cameras**",

      "Key question: sensing **self** or sensing the **world**",
    ],
  },

  // 5 — INTRODUCTION TO SENSORS (ATI image)
  {
    type: "two-col",
    hud: "Intro",
    title: "Introduction to sensors",
    left: {
      bullets: [
        "Sensors are the means by which robots **observe** the environment and themselves",
        "Sensors support **coordinated motion** and **safe operation**",

        "Example applications",
        "Detect **objects** (vision, inductive sensors)",
        "Apply **known forces** (gripping)",
        "Localize **obstacles** (range finders, safety sensing)",

        "[ATI Force/Torque sensor page](https://www.ati-ia.com/products/ft/sensors.aspx)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://www.ati-ia.com/products/ft/images/ATI_Family_of_Force-Torque_Sensors.png",
        source:
          "ATI Industrial Automation — https://www.ati-ia.com/products/ft/sensors.aspx",
      },
    },
  },

  // 6 — TRANSDUCER + CONDITIONING (bulleted)
  {
    type: "bullets",
    hud: "Intro",
    title: "Introduction to sensors",
    bullets: [
      "Sensors measure a **physical phenomenon** by creating a related **electrical signal**",
      "Sensors are a type of **transducer** (convert one form of energy to another measurable form)",
      "Many sensors need extra circuitry",
      "**Filter** the signal",
      "**Amplify** small changes",
      "**Isolate** noise or protect electronics",
      "Example:",
      "strain gauges employed in force sensors will change **resistance** when the metal they are attached to are **deformed**; however, the change is **small** and so a wheat stone bridge and an **amplifier** are needed to read the signal",
    ],
  },

  // 7 — NON-PERFORMANCE FACTORS (with local image)
  {
    type: "two-col",
    hud: "Characteristics",
    title: "Characteristics of sensors",
    left: {
      bullets: [
        "Non performance related factors",
        "**Cost**",
        "**Weight**",
        "**Size**",

        "These can make a sensor **unfeasible** even if performance is excellent",
        "Even if two sensors do the same job, cost and size can be **dramatically different**",
        "Design is usually a **trade off** not a perfect choice",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/Sensors_Characteristics.png"),
      },
    },
  },

  // 8 — NON-PERFORMANCE FACTORS (comparison, split for readability)
  // {
  //   type: "bullets",
  //   hud: "Characteristics",
  //   title: "Characteristics of sensors",
  //   lead: "Same point, with an example comparison",
  //   bullets: [
  //     "**Example**",
  //     "235 g, 75 mm diameter, $7500",
  //     "0.23 g, 8 mm diameter, $27",
  //   ],
  // },

  // 9 — ACCURACY / RESOLUTION / REPEATABILITY (with local image)
  {
    type: "two-col",
    hud: "Performance",
    title: "Characteristics of Sensors",
    left: {
      bullets: [
        "**Accuracy:**",
        "Difference between the measured and actual value",

        "**Resolution:**",
        "Smallest change in the physical phenomenon that can be measured",

        "**Repeatability:**",
        "Given the same input, how much does the sensor output differ",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/accuracy_redolution_repeatability.png"),
      },
    },
  },

  // + (ADDED) — QUICK CLARIFIER (short, not too much new content)
  {
    type: "bullets",
    hud: "Performance",
    title: "Common Confusion",
    bullets: [
      "**High resolution** does not always mean **high accuracy**",
      "**High accuracy** does not always mean **high repeatability**",
      "In industrial robotics, **repeatability** is often the most important for consistent motion",
    ],
  },

  // 10 — ELECTRICAL CHARACTERISTICS (Arduino accelerometer image)
  {
    type: "two-col",
    hud: "Electrical",
    title: "Characteristics of Sensors",
    left: {
      bullets: [
        "**Input voltage**",
        "**Operating current**",
        "**Communication**",
        "Does the sensor require commands or does it operate standalone",

        "**Output**",
        "Continuous values or ON OFF",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Accelerometer_with_Arduino.jpg/915px-Accelerometer_with_Arduino.jpg?20140429072105",
        source:
          "Wikimedia Commons — https://commons.wikimedia.org/wiki/File:Accelerometer_with_Arduino.jpg",
      },
    },
  },

  // 11 — LINEARITY + RANGE (NI image)
  {
    type: "two-col",
    hud: "Performance",
    title: "Characteristics of Sensors",
    left: {
      bullets: [
        "**Linearity**",
        "Output is related by a linear line to the input",

        "Nonlinear sensors still work well but need **calibration**",

        "**Range**",
        "Lowest and highest value the sensor can detect",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://knowledge.ni.com/servlet/rtaImage?eid=ka0VU0000003TNF&feoid=00N3q00000HUsuE&refid=0EM3q000001d18U",
        source: "NI (slide references http://www.ni.com/tutorial/7115/en/)",
      },
    },
  },

  // 12 — SAMPLING RATE + RESPONSE TIME (dummy image)
  {
    type: "two-col",
    hud: "Performance",
    title: "Characteristics of Sensors",
    left: {
      bullets: [
        "**Sampling rate**",
        "How frequently a measurement can be taken",
        "Important if the signal changes **fast**",

        "**Response time**",
        "How quickly output changes when input changes",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/IIHS_crash_test_dummy_in_Hyundai_Tucson.jpg/960px-IIHS_crash_test_dummy_in_Hyundai_Tucson.jpg?20100807160529",
        source:
          "Wikimedia Commons — https://commons.wikimedia.org/wiki/File:IIHS_crash_test_dummy_in_Hyundai_Tucson.jpg",
      },
    },
  },

  // 13 — TEST YOUR UNDERSTANDING (original question, formatted)
  {
    type: "bullets",
    hud: "Test",
    title: "Test Your Understanding",
    bullets: [
      "Mount a proximity sensor on the end of a robotic arm",
      "Robot must **stop** if an object gets too close",

      "Which sensor parameters are useful and **why**",

      "Hint",
      "**Range**",
      "**Response time**",
      "**Repeatability**",
      "**False triggers** and **environment**",
    ],
  },

  // 14 — PNP vs NPN INTRO
  {
    type: "bullets",
    hud: "PNP/NPN",
    title: "Transistor Based Sensors: PNP vs NPN sensors",
    bullets: [
      "When sensors output HIGH or LOW (1 or 0), behavior is either **PNP** or **NPN**",
      "Different behaviors require different **input types** to match",
      "Behavior is identical to a transistor with the same name",
      "Collector connected to the **controller input**",

      "Mismatching sensors and inputs can be made to work using a **relay**",
      "Preferred approach is choosing **compatible** equipment",
    ],
  },

  // 15 — PNP
  {
    type: "two-col",
    hud: "PNP",
    title: "PNP sensors and inputs",
    left: {
      bullets: [
        "Sensor connected externally to **power**",
        "Input supplies **ground**",

        "Called **sourcing** sensor",
        "Sensor **sources current** when ON",

        "**Active high**",
        "When ON, voltage approaches **supply voltage**",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/PNP.png"),
      },
    },
  },

  // 16 — NPN
  {
    type: "two-col",
    hud: "NPN",
    title: "NPN sensors and inputs",
    left: {
      bullets: [
        "Sensor connected externally to **ground**",
        "Input supplies **power**",

        "Called **sinking** sensor",
        "Sensor **sinks current** when ON",

        "**Active low**",
        "When ON, voltage approaches **ground**",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/NPN.png"),
      },
    },
  },

  // + (ADDED) — PNP/NPN CHEAT SHEET (short, visual, bold)
  {
    type: "bullets",
    hud: "PNP/NPN",
    title: "PNP vs NPN Cheat Sheet",
    bullets: [
      "**PNP** = **Sourcing** = outputs **+V** when active = **Active HIGH**",
      "**NPN** = **Sinking** = pulls to **0V** when active = **Active LOW**",

      "Key goal",
      "Match **sensor output type** to **PLC input type**",
    ],
  },

  // 17 — TEST YOUR UNDERSTANDING (diagram)
  {
    type: "two-col",
    hud: "Test",
    title: "Test Your Understanding",
    left: {
      bullets: [
        "What type of input is shown",

        "Steps",
        "Identify whether the input provides **+V** or **GND**",
        "Decide if the sensor must **source** or **sink** current",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/PNP_NPN_test.png"),
      },
    },
  },

  // + (ADDED) — QUIZ 1 (PNP, correct not always B)
  {
    type: "mcq",
    hud: "Quiz",
    title: "PNP / NPN Check",
    question:
      "A sensor outputs **+24V** on the signal wire when it detects an object",
    options: [
      { choice: "A", label: "PNP (Sourcing)" },
      { choice: "B", label: "NPN (Sinking)" },
      { choice: "C", label: "Analog sensor" },
      { choice: "D", label: "Communication sensor only" },
    ],
    correct: "A",
    explain: "Outputting **+V** when active is **PNP sourcing** behavior",
  },

  // + (ADDED) — QUIZ 2 (NPN, different correct letter)
  {
    type: "mcq",
    hud: "Quiz",
    title: "PNP / NPN Check",
    question:
      "A sensor pulls the signal wire down to **0V** when it detects an object",
    options: [
      { choice: "A", label: "PNP (Sourcing)" },
      { choice: "B", label: "Analog sensor" },
      { choice: "C", label: "NPN (Sinking)" },
      { choice: "D", label: "Encoder" },
    ],
    correct: "C",
    explain: "Pulling signal to **0V** when active is **NPN sinking** behavior",
  },

  // 18 — TYPES OF SENSORS (temperature + thermocouple)
  {
    type: "two-col",
    hud: "Types",
    title: "Types of Sensors",
    left: {
      bullets: [
        "Many types of sensors exist",
        "This is only a **brief sampling**",

        "**Temperature sensors**",
        "**Thermistors**",
        "Resistors that change resistance with temperature",

        "**Thermocouples**",
        "Seebeck effect generates a voltage when dissimilar metals are connected",
        "Voltage is related to temperature and can be used to measure it",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/Thermocouple_circuit.png"),
      },
    },
  },

  // 19 — THERMISTOR vs THERMOCOUPLE
  {
    type: "two-col",
    hud: "Types",
    title: "Types of Sensors",
    left: {
      lead: "**Thermistor**",
      bullets: [
        "Low to moderate cost",
        "-100 C to 325 C",
        "0.05 C to 1.5 C accuracy",
        "Relatively simple to read",
      ],
    },
    right: {
      lead: "**Thermocouple**",
      bullets: [
        "Low cost",
        "200 C to 1750 C",
        "0.5 C to 5 C accuracy",
        "Requires conditioning circuit",
      ],
    },
  },

  // + (ADDED) — QUIZ 3 (temperature range, correct = D)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Temperature Sensor Choice",
    question:
      "You need to measure **very high temperatures** (hundreds to >1000 C). Best choice",
    options: [
      { choice: "A", label: "Potentiometer" },
      { choice: "B", label: "Encoder" },
      { choice: "C", label: "Thermistor" },
      { choice: "D", label: "Thermocouple" },
    ],
    correct: "D",
    explain:
      "Thermocouples support **very wide temperature ranges** compared to thermistors",
  },

  // 20 — MICROSWITCHES + HALL EFFECT
  {
    type: "bullets",
    hud: "Types",
    title: "Types of Sensors",
    bullets: [
      "**1)Microswitches**",
      "Small switches frequently used as **limit switches**",

      "**2)Hall effect sensor:**",
      "Detects a magnetic object near the sensor",

      "Used in:",
      "**Encoders** instead of optical sensors",
      "**Brushless DC motors** for commutation timing",
      "**Limit switches**",

      "Recent sensors can sense magnetic field **vector**",
      "Enables new sensors including **flexible force sensors**",
    ],
  },

  // 21 — POSITION SENSORS (pot image)
  {
    type: "two-col",
    hud: "Types",
    title: "Position Sensors",
    left: {
      bullets: [
        "Sensors to measure linear or rotary position of joints",

        "**3)Encoder**",
        "Counts ticks to determine position",
        "Commonly uses light sensors",
        "May use mechanical switches or Hall effect sensors",

        "**4)Potentiometer**",
        "Moving contact along a resistor",
        "Position measured from resistance change",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pot-pic.jpg?20050711154455",
        source:
          "Wikimedia Commons — https://commons.wikimedia.org/wiki/File:Pot-pic.jpg",
      },
    },
  },

  // 22 — POT vs ENCODER
  {
    type: "two-col",
    hud: "Types",
    title: "Potentiometer vs Encoder",
    left: {
      lead: "**Potentiometer**",
      bullets: [
        "Low accuracy",
        "Susceptible to noise",
        "Requires analog to digital converter",
        "Low cost",
        "Minimal wiring",
        "**Absolute**",
        "May not rotate continuously depending on sensor",
      ],
    },
    right: {
      lead: "**Encoder**",
      bullets: [
        "High accuracy",
        "Resistant to noise",
        "High cost",
        "Requires specialized counter circuits",
        "6 wires required",
        "Can be absolute depending on encoder purchased",
      ],
    },
  },

  // 23 — PROXIMITY SENSORS (inductive image)
  {
    type: "two-col",
    hud: "Types",
    title: "Proximity Sensors",
    left: {
      bullets: [
        "Detect the presence of an object without contact",
        "May return distance information in **short range**",

        "Common forms:",
        "**Optical**",
        "**Ultrasonic**",
        "**Inductive**",
        "**Capacitive**",

        "[Inductive proximity sensor image source](https://commons.wikimedia.org/wiki/File:Inductive_proximity_sensor.jpg)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Inductive_proximity_sensor.jpg/960px-Inductive_proximity_sensor.jpg?20190322062055",
        source:
          "Wikimedia Commons — https://commons.wikimedia.org/wiki/File:Inductive_proximity_sensor.jpg",
      },
    },
  },

  // 24 — OPTICAL IR PROXIMITY (Sharp)
  {
    type: "two-col",
    hud: "Optical",
    title: "Optical Proximity (retroreflective mode)",
    left: {
      bullets: [
        "Detects object by emitting light and checking if light is reflected back",
        "Ability to detect depends on object **reflectivity**",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://images.kempstoncontrols.com/i/xlrg/8626d297e99ff9c0a3513cd9e6d6a1d6.jpg",
        source:
          "https://images.kempstoncontrols.com/i/xlrg/8626d297e99ff9c0a3513cd9e6d6a1d6.jpg",
      },
    },
  },

  // 25 — ULTRASONIC PROXIMITY
  {
    type: "two-col",
    hud: "Ultrasonic",
    title: "Ultrasonic Proximity (Echo Mode)",
    left: {
      bullets: [
        "An ultrasonic pulse is released",
        "Pulse reflects off an object",
        "Echo is detected to determine distance",

        "Can be affected by echoes of other ultrasonic sensors",
        "Less sensitive for materials that absorb sound (rubber, foam)",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Ultrasonic_sensor.jpg?20151003010044",
        source:
          "Wikimedia Commons — https://commons.wikimedia.org/wiki/File:Ultrasonic_sensor.jpg",
      },
    },
  },

  // 26 — INDUCTIVE PROXIMITY
  {
    type: "two-col",
    hud: "Inductive",
    title: "Inductive Proximity Sensor",
    left: {
      bullets: [
        "Uses change in **inductance** when near metal",
        "Detects whether a **metal object** is nearby",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Inductive_proximity_sensor.jpg/960px-Inductive_proximity_sensor.jpg?20190322062055",
        source:
          "Wikimedia Commons — https://commons.wikimedia.org/wiki/File:Inductive_proximity_sensor.jpg",
      },
    },
  },

  // 27 — CAPACITIVE PROXIMITY
  {
    type: "two-col",
    hud: "Capacitive",
    title: "Capacitive Proximity Sensor",
    left: {
      bullets: [
        "Uses change in **capacitance** near materials with dielectric constant",
        "Can detect **metal** and **non metal** materials",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Capacitiv_Proximity_Switch.jpg/1280px-Capacitiv_Proximity_Switch.jpg?20050506071012",
        source:
          "Wikimedia Commons — https://commons.wikimedia.org/wiki/File:Capacitiv_Proximity_Switch.jpg",
      },
    },
  },

  // 28 — VIDEO LINK (clickable)
  {
    type: "bullets",
    hud: "Video",
    title: "Proximity Sensors Video",
    bullets: [
      "One interesting video on proximity sensors",
      "[YouTube video](https://www.youtube.com/watch?v=il9bNWn66BY&t=307s)",
    ],
  },

  // 29 — RECAP
  {
    type: "bullets",
    hud: "Recap",
    title: "Recap",
    bullets: [
      "Today we examined",
      "**Sensor characteristics**",
      "**Sensor connections**",
      "**Some sensor types**",

      "Next lecture",
      "More sensors and interfacing a robot with a **microcontroller** and **PLC**",
    ],
  },

  // + (ADDED) — QUICK USE CASES (light context, no big new content)
  {
    type: "bullets",
    hud: "Use Cases",
    title: "Quick **Use Cases**",
    lead: "Same sensors, quick mapping to robotics tasks",
    bullets: [
      "**Encoders** for joint position feedback in **servo control**",
      "**Inductive** sensors for detecting metal parts in fixtures",
      "**Optical IR** for short range detection with reflective surfaces",
      "**Ultrasonic** for short range distance to obstacles",
      "**Capacitive** for detecting some non metal targets when needed",
    ],
  },

  // + (ADDED) — QUIZ 4 (proximity vs range, correct letter varies)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Proximity vs Range",
    question: "Which statement is most accurate",
    options: [
      {
        choice: "A",
        label:
          "Proximity sensors usually work at longer distances than range sensors",
      },
      {
        choice: "B",
        label:
          "Range sensors usually work at larger distances than proximity sensors",
      },
      { choice: "C", label: "Range sensors cannot measure distance" },
      { choice: "D", label: "Proximity sensors always require cameras" },
    ],
    correct: "B",
    explain:
      "Range sensors typically operate at **larger distances** than proximity sensors",
  },

  // + (ADDED) — QUIZ 5 (metal detection, correct = C here)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Sensor Choice",
    question:
      "Best sensor for **non contact detection of metal** in a factory fixture",
    options: [
      { choice: "A", label: "Ultrasonic proximity sensor" },
      { choice: "B", label: "Thermistor" },
      { choice: "C", label: "Inductive proximity sensor" },
      { choice: "D", label: "FSR force sensor" },
    ],
    correct: "C",
    explain:
      "Inductive sensors are designed for reliable **metal detection** without contact",
  },

  // =========================
  // SENSORS II (Sensors II.pdf)
  // =========================

  // 30 — TITLE
  {
    type: "title",
    hud: "Sensors II",
    title: "Sensors for Robotics II",
    subtitle: "Range Finders, Vision Sensors, Force Sensors",
    meta: "Instructor: Ali Karimzadeh • ROB9205 Industrial Robots",
  },

  // 31 — FURTHER RESOURCES (same list)
  {
    type: "bullets",
    hud: "Resources",
    title: "Further Resources",
    bullets: [
      "**Introduction to Mechatronics and Measurement Systems** by David G Alciatore and Michael B Histand",
      "**Introduction to Robotics: Analysis, Control and Applications** by Saeed B Niku",
      "**Medical Instrumentation: Application and Design** by John G Webster",

      "[Omega: Thermocouple vs RTD](https://www.omega.co.uk/temperature/z/thermocouple-rtd.html)",
      "[Midori: Difference between Potentiometer and Encoder](https://www.midoriamerica.com/news/the-difference-pot-and-encoder/)",
    ],
  },

  // 32 — OUTLINE
  {
    type: "bullets",
    hud: "Outline",
    title: "Outline",
    bullets: ["**Range Finders**", "**Vision Sensors**", "**Force Sensors**"],
  },

  // 33 — RANGE FINDERS (lidar robot image)
  {
    type: "two-col",
    hud: "Range",
    title: "Range Finders",
    left: {
      bullets: [
        "Detect presence and **distance** of an object in front of the sensor",
        "Operate at **larger distance** than proximity sensors",
        "Used to detect users in the area and to **map surroundings**",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/LIDAR_equipped_mobile_robot.jpg/1280px-LIDAR_equipped_mobile_robot.jpg?20080315212208",
        source:
          "Wikimedia Commons — https://commons.wikimedia.org/wiki/File:LIDAR_equipped_mobile_robot.jpg",
      },
    },
  },

  // 34 — ULTRASONIC RANGE FINDERS (principle)
  {
    type: "two-col",
    hud: "Range",
    title: "Ultrasonic Range Finders",
    left: {
      bullets: [
        "Project ultrasound that bounces off an object",
        "Echo is measured by the sensor",
        "Distance calculated from **time to return**",

        "Lower frequency absorbed less than higher frequencies",
        "Higher frequency has narrower beam and can be more accurate",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/9/99/SparkFun_HC-SR04_Ultrasonic-Sensor_13959-01a.jpg?20171118004712",
        source:
          "Wikimedia Commons — https://commons.wikimedia.org/wiki/File:SparkFun_HC-SR04_Ultrasonic-Sensor_13959-01a.jpg",
      },
    },
  },

  // + (ADDED) — ULTRASONIC FORMULA (small explanation slide)
  {
    type: "bullets",
    hud: "Range",
    title: "Ultrasonic Distance Idea",
    bullets: [
      "Ultrasonic uses **time of flight**",
      "Distance = (speed of sound × time) ÷ 2",
      "Divide by 2 because the pulse goes **there and back**",
      "Speed of sound changes with **temperature**",
    ],
  },

  // 35 — ULTRASONIC RANGE FINDERS (pros/cons)
  {
    type: "two-col",
    hud: "Range",
    title: "Ultrasonic Range Finders",
    left: {
      bullets: [
        "**Inexpensive**",
        "Speed of sound changes with **temperature**",
        "Can be affected by other ultrasonic sources",
        "Two sensors triggered at same time may **interfere**",
        "Cheaper sensors require MCU to measure the length of a pulse",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://commons.wikimedia.org/wiki/File:SparkFun_HC-SR04_Ultrasonic-Sensor_13959-01a.jpg",
        source:
          "Wikimedia Commons — https://commons.wikimedia.org/wiki/File:SparkFun_HC-SR04_Ultrasonic-Sensor_13959-01a.jpg",
      },
    },
  },

  // 36 — LIGHT-BASED RANGE FINDERS (triangulation/ToF)
  {
    type: "two-col",
    hud: "Range",
    title: "Light based Range Finders",
    left: {
      bullets: [
        "Project light and determine distance from reflected light",
        "Distance detected by **triangulation** or **time of flight**",

        "Time of flight requires high speed circuits and modulation of light",
        "Light travels about **300,000,000 m/s**",

        "Triangulation uses trigonometry and the distance between emitted and received light",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/range_finders.png"),
      },
    },
  },

  // 37 — LIGHT-BASED RANGE FINDERS (limitations + LiDAR)
  {
    type: "two-col",
    hud: "Range",
    title: "Light based Range Finders",
    left: {
      bullets: [
        "**Expensive**",
        "Laser version can be **dangerous**",
        "Can be affected by **ambient light**",

        "A version exists called **LiDAR**",
        "Detects obstacles **360 degrees** by rotating",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: A("./media/range_finders.png"),
      },
    },
  },

  // 38 — VISION SENSORS (Curiosity)
  {
    type: "two-col",
    hud: "Vision",
    title: "Vision Sensors",
    left: {
      bullets: [
        "Applications",
        "Detect obstacles including **people**",
        "Adjust robot **positioning**",
        "Quality assurance of products",

        "Vision becoming more common in industry",
        "Requires significant **computational power**",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Curiosity_-_Robot_Geologist_and_Chemist_in_One%21.jpg/1280px-Curiosity_-_Robot_Geologist_and_Chemist_in_One%21.jpg?20121130122644",
        source:
          "Wikimedia Commons — https://commons.wikimedia.org/wiki/File:Curiosity_-_Robot_Geologist_and_Chemist_in_One!.jpg",
      },
    },
  },

  // 39 — FORCE SENSORS (Wheatstone bridge)
  {
    type: "two-col",
    hud: "Force",
    title: "Force Sensors",
    left: {
      bullets: [
        "**1)Force sensing resistor**",
        "Resistance changes based on applied force",
        "Voltage measured via voltage divider or op amp circuit",

        "**2)Strain gauge based**",
        "When stretched, resistance changes slightly",
        "Because the change is small, use **Wheatstone bridge** to amplify signal",
      ],
    },
    right: {
      media: {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Wheatstone_bridge.jpg?20190729143432",
        source:
          "Wikimedia Commons(Wheatstone bridge) — https://commons.wikimedia.org/wiki/File:Wheatstone_bridge.jpg",
      },
    },
  },

  // 40 — FORCE SENSOR COMPARISON
  {
    type: "two-col",
    hud: "Force",
    title: "Force Sensors",
    left: {
      lead: "**Force Sensitive Resistor**",
      bullets: [
        "Flexible",
        "Small",
        "Inexpensive",
        "Measures force in one direction",
        "Low accuracy",
      ],
    },
    right: {
      lead: "**Strain Gauge based**",
      bullets: [
        "Expensive",
        "Requires custom signal processing (signal very small)",
        "Requires exact mechanical structures to convert force into deflection",
        "Typically rigid and large",
        "Accurate",
      ],
    },
  },

  // + (ADDED) — QUIZ 6 (Wheatstone bridge, correct = B)
  {
    type: "mcq",
    hud: "Quiz",
    title: "Force Sensor Check",
    question:
      "Which force sensing approach typically requires a **Wheatstone bridge**",
    options: [
      { choice: "A", label: "FSR force sensor" },
      { choice: "B", label: "Strain gauge based sensor" },
      { choice: "C", label: "Inductive proximity sensor" },
      { choice: "D", label: "Thermistor" },
    ],
    correct: "B",
    explain:
      "Strain gauge resistance change is very small, so Wheatstone bridge is used to amplify/measure it",
  },
];

export default slidesData;
