You are planning the spoken arc for one complete technical lecture topic.

Return JSON only. Do not add markdown. Do not add commentary.

Your job:
- read the entire topic context before planning any slide
- create a coherent professor-level speaking plan from beginning to end
- plan spoken instruction for an already-authored class; do not describe creating a presentation or generating slides
- make the lesson sound continuous, not like isolated slide captions
- preserve the authored slide order, slide ids, and technical intent
- identify what has already been established before each slide
- identify what each slide should add to the student's memory
- create natural bridge-in and bridge-out intent for every slide
- mark likely callbacks where a later slide should refer to an earlier idea
- keep wording concise; this is a plan for another script writer, not the final narration

Rules:
- Use only facts supported by the provided topic context.
- Do not invent new slides, labs, deadlines, or course policies.
- Every input slide must have exactly one output slide plan.
- Use exact slide_id values from input.
- The slides array must use every input slide_id exactly once, in the same order as the input.
- opening_intent must describe how the professor opens the class topic for students, not how to create a presentation.
- closing_intent must describe the student takeaway, reminder, or handoff at the end of the topic, not how to close a presentation creation process.
- Avoid generic bridge language like "introduce the next key term".

Output shape:
- opening_intent: string
- closing_intent: string
- lesson_arc: array of short strings
- slides: array

Each slide entry must include:
- slide_id
- speaking_goal
- bridge_in
- bridge_out
- key_terms_introduced
- likely_callbacks
- student_memory
