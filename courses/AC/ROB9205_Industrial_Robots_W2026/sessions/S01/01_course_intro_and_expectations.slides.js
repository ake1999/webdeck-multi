export const topicMeta = {
  id: "01_course_intro_and_expectations",
  title: "Course Introduction & Expectations",
  duration: 45 // minutes (just a hint, you can change later)
};

const slidesData = [
  {
    type: "title",
    title: "Welcome to ROB9205",
    subtitle: "Industrial Robot Fundamentals",
    meta: "Instructor: Ali Karimzadeh • Email: karimza@algonquincollege.com • Office Hours: By appointment",
    hud: "S01 • Topic 01 ;  Welcome & Course Overview",
    notes:
      "Welcome everyone to ROB nine two zero five, Industrial Robot Fundamentals. My name is Ali Karimzadeh. You can reach me at dewanj at algonquincollege dot com, and my office hours are by appointment; just email me and we’ll set a time. Today I want to set clear expectations: what you’ll learn, how labs work, how grading works, and most importantly, how we keep safety as the number one priority from day one."
  },

  {
    type: "bullets",
    title: "What you can expect from this course",
    hud: "Course Overview",
    bullets: [
      "Find, learn, and follow relevant safety procedures when handling robot equipment.",
      "Learn the basic terminology of industrial robots.",
      "Understand the dynamics underlying robots.",
      "Understand the major components of a robot and their function.",
      "Think about robot limitations and the considerations needed when automating."
    ],
    notes:
      "Here’s the big picture. First, you’ll learn to find and follow safety procedures; because with robots, safety is not optional. Second, we’ll build your vocabulary so you can speak the language of industrial robotics confidently. Third, we’ll cover the dynamics; what’s happening underneath the motion, not just what buttons to press. Fourth, you’ll learn the main components of a robot system and what each one actually does. And finally, we’ll think like automation technicians: what robots can do well, what they cannot do well, and what you must consider before automating any task."
  },

  {
    type: "bullets",
    title: "What you can expect from this course (continued)",
    hud: "Course Overview",
    bullets: [
      "Gain hands-on experience operating and troubleshooting a robot arm.",
      "Read and use operators’ manuals and technical resources.",
      "Interface robotic systems with external components.",
      "Work independently and learn to operate in a workplace-style environment.",
      "Operate robotic equipment in a safe manner; every time."
    ],
    notes:
      "This course is hands-on. You’ll operate a robot arm, and you’ll also troubleshoot; because real work is not perfect. You’ll learn how to use manuals and technical resources effectively; the manual is not a last resort, it’s the first tool. We’ll also connect robots to external components; inputs, outputs, sensors, and devices; so you learn system thinking. Along the way, I want you to work independently like you would in a workplace: observe, test, document, and then ask for help with specific details. And throughout all of it, we operate safely every single time, even when we’re in a hurry."
  },

  {
    type: "bullets",
    title: "Class expectations",
    hud: "Class Expectations",
    bullets: [
      "Work in groups.",
      "Try to troubleshoot on your own before asking for help.",
      "Be respectful of others and the equipment.",
      "Manage deadlines on your own.",
      "Keep safety a top priority.",
      "Use documentation to understand what the robot is doing and why.",
      "Be specific when asking for help ;  “It is broken” does not help anyone help you.",
      "In short: act like a technician."
    ],
    notes:
      "Let’s be clear about expectations. You will work in groups; because that’s how we can share limited equipment fairly and safely. I expect you to troubleshoot first before calling me over: check connections, check the program, check the obvious failure points. Respect people and respect the equipment; this lab is a shared professional space. Manage your deadlines like a technician would: plan your time and come prepared. Safety is always the top priority. Use documentation to understand the system; don’t guess. And when you ask for help, be specific: tell me what you tried, what you observed, and what error you see. If you remember one sentence from this slide, it’s this: act like a technician."
  },

  {
    type: "bullets",
    title: "Lab behaviour (5% of final grade)",
    hud: "Lab Behaviour",
    bullets: [
      "All students begin the year at 100% for lab behaviour.",
      "To keep 100%:",
      "Complete all labs and receive a sign-off.",
      "Sign-offs require you demonstrate the lab and answer questions about the material.",
      "Deductions may be applied for behaviour unsuitable for technicians."
    ],
    notes:
      "Lab behaviour counts for five percent, and everyone starts at one hundred percent. The way you keep it is simple: complete your labs properly and get your sign-off. A sign-off means you can demonstrate what you did and explain it; because doing a procedure without understanding is not acceptable in industry. If I see behaviour that’s unsafe or unprofessional, deductions happen. This is not meant to scare you; it’s meant to reflect real workplace expectations where safety and professionalism are part of your performance."
  },

  {
    type: "bullets",
    title: "Lab behaviour: what causes deductions",
    hud: "Lab Behaviour",
    bullets: [
      "Breaking safety rules.",
      "Exposing equipment to risks.",
      "Disrespecting lab policies (including running or using your cell phone).",
      "Disrespecting other students or faculty.",
      "Missing reserved time.",
      "Consistently arriving late.",
      "Not arriving prepared for class/lab.",
      "Incorrectly managing lab times.",
      "No food in the lab space.",
      "Leaving early from class."
    ],
    notes:
      "Here are examples of what will cost you marks. Any safety violation is serious. If you put equipment at risk, that’s also serious; these systems are expensive and shared. Lab policies matter: no running, and do not use your phone in a way that distracts you from safe work. Be respectful to classmates and faculty. If you book time and don’t show up, you are taking resources away from others. Chronic lateness, coming unprepared, or mismanaging your lab time creates chaos for your group. No food in the lab, and don’t leave early unless you’ve arranged it. The goal is simple: a safe, focused, professional environment."
  },

  {
    type: "bullets",
    title: "Preparation & in-class points",
    hud: "Preparation",
    bullets: [
      "Every class will have preparation required.",
      "Preparation tasks will be posted in an announcement before class begins.",
      "A-grade points are assigned for each class:",
      "1 point: arriving on time",
      "1 point: staying until the end of class",
      "2–4 points: class preparation",
      "Deductions and bonuses may occur in class for student behaviour."
    ],
    notes:
      "Most classes require preparation, and I’ll post the tasks before class begins. The grading here is straightforward: you earn points by showing up on time, staying to the end, and doing the prep. The prep is where you save time in lab; students who prepare move faster and safer. In class, you may also see deductions or bonuses based on professional behaviour. If you treat this like a job, you’ll do very well."
  },

  {
    type: "bullets",
    title: "Course grading scheme",
    hud: "Grading",
    bullets: [
      "Safety Quiz",
      "Quizzes (10%, 2 × 5%)",
      "Project proposal (3%)",
      "Project update (2%)",
      "Course Project (20%)",
      "Lab behavior (5%)",
      "Lab (20%)",
      "Lab test (10%)",
      "Theory tests (30%, 2 × 15%)"
    ],
    notes:
      "This is the grading breakdown. You’ll have a safety quiz, two quizzes that total ten percent, a project proposal worth three percent, a project update worth two percent, and the course project worth twenty percent. Lab behaviour is five percent, labs are twenty percent, and the hands-on lab test is ten percent. Finally, there are two theory tests worth thirty percent total; two tests at fifteen percent each. If you keep up with weekly work, none of this becomes overwhelming."
  },

  {
    type: "bullets",
    title: "Quizzes and tests",
    hud: "Assessments",
    bullets: [
      "All material is based on in-class lectures, except the robot theory test which focuses on lab material.",
      "Quizzes appear online 5 days prior to a test.",
      "Quizzes act as practice and show the types of questions to expect.",
      "Tests may be online during class time or given as a take-home assignment with a 24-hour deadline."
    ],
    notes:
      "For quizzes and tests, the rule is: if it was taught in lecture, it can be tested. The one exception is the robot theory test, which is more focused on lab material. Quizzes will appear online five days before a test, and they’re there to help you; use them like practice exams. Tests may happen online during class time, or they may be take-home with a 24-hour deadline. Either way, if you do the weekly preparation and attend, you’ll be ready."
  },

  {
    type: "bullets",
    title: "Robot labs",
    hud: "Labs",
    bullets: [
      "There are significantly fewer robots than students ;  labs must be completed in groups of four (same as project groups).",
      "Review lab instructions thoroughly before starting.",
      "Complete labs strictly following the provided guidelines.",
      "Present completed labs to the instructor for approval and sign-off.",
      "As a class, coordinate and schedule appropriate times to prepare labs and/or projects.",
      "A faculty member must be present nearby and comfortable supervising your activities in the lab."
    ],
    notes:
      "Because we have fewer robots than students, labs must be done in groups of four, and that aligns with your project groups. Before you touch anything, read the lab instructions carefully; most mistakes come from skipping steps. Follow the guidelines exactly, complete the lab, and then you’ll present it for sign-off. You’ll also need to coordinate with each other to schedule robot time; this is part of working like a team in industry. Finally, a faculty member must be nearby and comfortable supervising. If there’s no supervision, you do not operate."
  },

  {
    type: "bullets",
    title: "Lab test",
    hud: "Lab Test",
    bullets: [
      "The lab test occurs at the end of the term.",
      "It is a hands-on test.",
      "Each individual works independently to handle a challenge given on the day of the test."
    ],
    notes:
      "Near the end of the term, you’ll have a lab test. It’s hands-on and individual. You’ll be given a task or challenge on the day, and you’ll demonstrate that you can operate safely and correctly without relying on your group. The best way to prepare is to be engaged during every lab and make sure you understand what you’re doing; not just following steps."
  },

  {
    type: "bullets",
    title: "Final project (overview)",
    hud: "Project",
    bullets: [
      "Design a robotics system involving inputs and outputs to solve a problem.",
      "Full details are in “Combined Project Requirements” under the FINAL PROJECT section.",
      "A final project report is required in week 13.",
      "Two steps to project grading:",
      "Maximum grade is based on technical material in assignments.",
      "Final earned percentage depends on the report.",
      "If either the report or demo is missing, you receive 0%."
    ],
    notes:
      "Your final project is about designing a robotics system that uses inputs and outputs to solve a real problem. The full requirements are posted in the FINAL PROJECT section, so read those early. You’ll submit a final report in week thirteen. The grading has an important rule: you earn a maximum grade based on the technical work, and then the report determines what percentage of that maximum you actually receive. If you miss either the report or the demo, the result is zero. So plan your project so you can demonstrate it and document it properly."
  },

  {
    type: "bullets",
    title: "Project proposal",
    hud: "Project",
    bullets: [
      "Due week 3 (online).",
      "Must define the project including:",
      "The problem to be solved",
      "The requirements of the solution",
      "The team members involved",
      "A general overview of the solution approach",
      "Exact description is under FINAL PROJECT section."
    ],
    notes:
      "The project proposal is due online in week three. It should clearly define the problem you’re solving, what the solution must do; your requirements; who is on the team, and your high-level plan for how you’ll build it. Keep it realistic: choose a project you can actually finish and demonstrate. If you follow the template under FINAL PROJECT, you’ll have everything you need."
  },

  {
    type: "bullets",
    title: "Project update (week 9)",
    hud: "Project",
    bullets: [
      "Demonstrate the progress made on your project.",
      "Out of 2:",
      "2 = reasonable progress (~50% done)",
      "1 = moderate progress (30–50% done)",
      "0 = little progress (0–30% done)"
    ],
    notes:
      "In week nine, you’ll give a project update. This is a short progress checkpoint. If you’re roughly fifty percent done, you’ll earn the full two points. If you’re in the thirty to fifty percent range, that’s one point. If you’re below thirty percent, that’s zero. The message is simple: start early, divide tasks, and make steady progress so you’re not rushing at the end."
  },

  {
    type: "bullets",
    title: "Questions?",
    hud: "Q&A",
    bullets: [
      "Ask anytime ;  especially about safety and lab procedures.",
      "If you’re unsure: stop, ask, and verify before proceeding."
    ],
    notes:
      "Before we move on, what questions do you have? I want you to feel comfortable asking questions; especially about safety and lab procedures. If you’re ever unsure in the lab, the correct action is to stop, ask, and verify. Guessing is how accidents happen."
  },

  {
    type: "bullets",
    title: "Where to find information (and who to talk to)",
    hud: "Finding Answers",
    bullets: [
      "Operators: the people already working on equipment often know it best. Be respectful, listen, and remember.",
      "Other technicians: stay engaged with others; their experience can point you in the right direction.",
      "Equipment company contact: suppliers frequently provide support; contact them for significant repair issues.",
      "Internet forums (be careful)."
    ],
    notes:
      "In industry, your job is often to figure things out quickly and safely. Start with the people closest to the equipment: operators usually know the practical details and common issues. Talk to other technicians; experience transfers. If it’s a serious fault, the supplier may be the right contact. Internet forums can help, but be careful: not everything online is correct, and advice may not match your exact model or safety requirements. Always verify with documentation."
  },

  {
    type: "bullets",
    title: "Important documents",
    hud: "Documentation",
    bullets: [
      "User’s Manual (Robot)",
      "Programming Manual (Robot)",
      "Datasheets (Electronic components)"
    ],
    notes:
      "These are the three document types you will use constantly. The user’s manual teaches safe operation, setup, maintenance, and troubleshooting. The programming manual teaches how to command motion and logic correctly. Datasheets tell you how external components behave electrically and how to connect them safely. If you master how to use these documents, you will be effective in lab and in the workplace."
  },

  {
    type: "bullets",
    title: "User’s Manual: what it should contain",
    hud: "Documentation",
    bullets: [
      "Safety concerns, e-stops, and how to reset/recover safely.",
      "Model and manufacturer information.",
      "Technical specifications (robot arm, controller, teach pendant, optional hardware).",
      "Unpacking and setup procedures.",
      "Maintenance section.",
      "Troubleshooting section.",
      "I/O and wiring details."
    ],
    notes:
      "When you open a user’s manual, look for specific sections. Safety comes first: e-stops, recovery steps, and warnings. Then identify the model and manufacturer; because procedures differ across brands. The specs tell you the limits of the robot and controller. Setup matters so you don’t damage equipment. Maintenance and troubleshooting are your best friends during labs. And the I-O and wiring sections matter when we connect external devices. If you can quickly navigate these sections, you save time and avoid mistakes."
  },

  {
    type: "bullets",
    title: "Programming Manual: why it matters",
    hud: "Documentation",
    bullets: [
      "Teaches how to program the robot.",
      "Provides syntax for specifying robot motion.",
      "Describes commands available in the robot.",
      "Sometimes explains how movements are executed (example: approach command in CRS manual).",
      "Understanding robot programming is the minimum required to deploy and troubleshoot robots."
    ],
    notes:
      "The programming manual is where you learn how to control the robot correctly. It gives you the exact syntax for motion and commands. It also explains what each command does, and in some cases, how the robot attempts a movement internally. If you don’t understand programming basics, you can’t troubleshoot properly; you’ll just be guessing. So we will build enough programming understanding that you can deploy a program safely and diagnose problems when something doesn’t behave as expected."
  },

  {
    type: "bullets",
    title: "Datasheets",
    hud: "Documentation",
    bullets: [
      "Usually associated with specific electronic components.",
      "Provide specifications such as:",
      "Input voltage",
      "Maximum current",
      "Communication standards",
      "Often include sample circuits and usage guidance.",
      "Can be long ;  microcontroller datasheets may be hundreds of pages."
    ],
    notes:
      "Datasheets are the truth for electronic components. They tell you what voltage a device expects, how much current it can draw, and how it communicates; like digital I-O, analog signals, or serial protocols. Many include sample circuits that show correct wiring. Some datasheets are long, especially for microcontrollers, but you don’t read them cover to cover; you learn to find the key parts quickly: electrical limits, pinouts, timing, and recommended circuits."
  },

  {
    type: "bullets",
    title: "Other important documents",
    hud: "Documentation",
    bullets: [
      "Operator’s manual",
      "Teach pendant manual",
      "Documentation for individual accessories",
      "Always review relevant documentation before starting up or operating equipment."
    ],
    notes:
      "Finally, remember that there are often multiple documents per system: an operator’s manual, a teach pendant manual, and manuals for accessories like grippers or sensors. The best technicians don’t rely on memory alone; they verify procedures and safety steps before they power up or move a robot. That habit prevents accidents and saves equipment. That’s the mindset I want you to build in this course."
  }
];

export default slidesData;

