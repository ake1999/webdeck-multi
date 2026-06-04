# MCG 5353 Slide Authoring Notes

Course deck location:

- School: `UO`
- Course ID: `MCG5353_Robotics_W2026`
- Session: `S01`
- Topic: `01_course_overview`
- Deck path: `courses/UO/MCG5353_Robotics_W2026/sessions/S01/01_course_overview.slides.js`
- Media folder: `courses/UO/MCG5353_Robotics_W2026/sessions/S01/media/`

## Deck File Format

Each topic is a JavaScript module named `<topic>.slides.js`:

```js
export const topicMeta = {
  id: "01_topic_id",
  title: "Human-readable topic title",
  duration: 45,
  hudDefault: "MCG 5353 - ROBOTICS",
  email: "Ali.Karimzade@uOttawa.ca",
};

const slidesData = [
  {
    id: "stable_slide_id",
    type: "bullets",
    hud: "MCG 5353 Robotics",
    title: "Slide title",
    lead: "Optional short lead.",
    bullets: [
      { id: "bullet_1", text: "First point" },
      { id: "bullet_2", text: "Second point" },
    ],
    notes: "Speaker notes for narration and later script generation.",
  },
];

export default slidesData;
```

## Supported Slide Types

- `title`: `title`, optional `subtitle`, optional `meta`
- `bullets`: `title`, optional `lead`, `bullets`
- `text`: `title`, optional `lead`, `paragraphs`
- `two-col`: `title`, `left`, `right`; columns can hold `lead`, `bullets`, `paragraphs`, `media`, or `html`
- `mcq`: `title`, `question`, `options`, `correct`, `explain`

## Authoring Rules To Keep Decks Generation-Ready

- Give every slide a stable `id`.
- Give important bullets, paragraphs, options, and media stable `id` values.
- Add `notes` to every slide, even if brief.
- Prefer structured content over raw `html`.
- Use local media paths when possible. Remote media works, but validation reports it as a dependency.
- Rich text supports `**bold**`, inline code, fenced code blocks, markdown links, bare URLs, and KaTeX math.

## Useful Commands

Validate the new course:

```bash
npm run validate -- --school UO --course MCG5353_Robotics_W2026
```

Open Session 1:

```text
http://127.0.0.1:8000/session.html?school=UO&course=MCG5353_Robotics_W2026&session=S01&topic=01_course_overview
```
