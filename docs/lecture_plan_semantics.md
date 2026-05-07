# Lecture Plan Semantics

The lecture plan files now support a richer pedagogical layer intended to improve:

- authoring review quality
- LLM-based script generation
- TTS delivery guidance
- future scene and object aware lecture video generation

This upgrade does **not** change frozen downstream contracts such as:

- timing math
- playback control
- media source resolution
- `generated/outputs/*`
- job status logic

## Topic-Level Semantics

Each `*.lecture.plan.json` can now describe the topic as a lesson, not just as narration scaffolding.

Important topic-level fields:

- `teaching_arc`
  - `entry_point`
  - `progression`
  - `destination`
  - `tone`
  - `methods`
- `audience_level`
- `topic_goal`
- `topic_takeaways`
- `style_notes`
- `transition_style`
- `scene_policy_default`
- `object_policy_default`
- `topic_defaults`

Use these fields to describe:

- what students should understand by the end
- how the topic should unfold
- what overall teaching tone the topic should have
- how slides should connect to one another
- whether scenes or props are usually useful for this topic

## Slide-Level Semantics

Each slide plan can now describe the pedagogical role of the slide in the lesson.

Important slide-level fields:

- `slide_role`
- `importance`
- `narration_seed`
- `voice_style`
- `tone`
- `energy`
- `pace`
- `attention_mode`
- `scene_policy`
- `object_policy`
- `must_cover`
- `must_say`
- `emphasis_words`
- `transition_from_previous`
- `transition_to_next`
- `likely_student_confusion`
- `teacher_strategy`
- `avatar_hint`
- `scene_hint`
- `prop_suggestions`
- `explanation_style`
- `story_hint`
- `delivery_goal`

These fields are intended to answer:

- what kind of slide this is
- how important it is to the topic
- how the instructor should explain it
- what students are likely to misunderstand
- what transitions should sound like
- when outside props or scene objects would genuinely help

## Controlled Vocabularies

Supported `slide_role` values:

- `intro`
- `setup`
- `definition`
- `intuition`
- `comparison`
- `demo`
- `practice`
- `recap`
- `exit_check`
- `caution`
- `reference`

Supported `importance` values:

- `high`
- `medium`
- `low`

Supported `teacher_strategy` values:

- `define_then_example`
- `compare_then_summarize`
- `intuitive_visual_explanation`
- `cautionary_explanation`
- `guided_practice`
- `recap_and_reinforce`

Supported `scene_policy` values:

- `none`
- `minimal`
- `hybrid`
- `scene_allowed`

Supported `object_policy` values:

- `none`
- `suggested`
- `preferred`

## How The Pipeline Uses These Fields

Today:

- authoring review pages show the richer pedagogical metadata
- `llm_local` script generation receives the topic and slide pedagogy context
- deterministic script fallback uses role and transition guidance to avoid flat bullet reading
- script manifests carry richer lecture-plan metadata for downstream inspection

Later:

- scene and object hints can guide richer video generation
- delivery goals and confusion notes can further improve script quality
- tone, pace, emphasis, and scene hints can support more expressive TTS and avatar planning

## Authoring Guidance

Good lecture plans should read like instructions for a strong instructor:

- lead with what question the slide is answering
- connect each slide to the previous and next idea
- call out what students usually get wrong
- use props only when they improve understanding
- make recap and exit slides reinforce memory, not repeat bullets

The lecture plan should stay pedagogical and semantic.
It should not become a timing file or low-level playback file.
