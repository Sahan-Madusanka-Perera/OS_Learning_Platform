# Operating Systems — an interactive course for Sri Lankan A/L ICT

An interactive learning platform covering **Competency 5** of the Sri Lankan G.C.E. Advanced
Level ICT syllabus: *“Uses operating systems to manage the functionality of computers.”*

It takes a student who knows nothing about operating systems through to exam readiness —
35 lessons, 20 interactive simulations, 140 questions across 9 question types, mastery
tracking, spaced repetition and a full diagnostic assessment.

```bash
cd app
npm install
npm run dev      # http://localhost:5173
```

---

## Running it

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Type-check and produce a static build in `app/dist` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run oxlint |

The build output is entirely static — it can be hosted on any static file host, or opened
from a USB stick. There is no backend and no network dependency after the first load.

**Requirements:** Node 20+ and a modern browser.

---

## What a student gets

**A visible path.** The learning path shows every lesson in order, colour-coded by mastery,
with a marker on where they are now. They can always answer “what should I do next?”.

**Simple first, precise second.** Every definition leads with a plain-English sentence and
keeps the examinable wording behind a disclosure. Every abstract idea has an analogy that is
then explicitly mapped back onto the technical concept.

**Things to do, not just read.** Lessons interleave explanation with active recall prompts
(answer before revealing), teach-back activities self-marked against a checklist, interactive
simulations, and quick-check questions.

**Feedback that teaches.** No answer is ever just “correct”. Wrong answers name what was
chosen, what was right, the reasoning, and a remediation line — then schedule the question
for review. Mistakes are framed as information.

**An “I’m confused” escape hatch.** Placed at the points where students actually get lost.
Three escalating layers: a simpler retelling, then a picture in words, then a link back to
the prerequisite lesson.

**Honest mastery.** Mastery is earned from evidence (75%) and engagement (25%) — never from
having visited a page.

---

## Curriculum structure

Derived from the syllabus competency table and the supplied resource, then reorganised into a
teaching order rather than a reference order.

| Module | Syllabus | Lessons | Covers |
| --- | --- | --- | --- |
| 1. Foundations | 5.1 | 4 | Hardware/software, utility software, booting, what an OS is |
| 2. OS functions | 5.1 | 5 | Main functions, evolution, multitasking, classification, user interfaces |
| 3. Files | 5.2 | 4 | Files & types, attributes, directories & paths, physical disk storage |
| 4. Storage | 5.2 | 5 | Allocation methods, file systems & FAT, fragmentation, partitioning & backup, file security |
| 5. Processes | 5.3 | 8 | Program vs process, PCB, seven states, creation/termination, interrupts, schedulers, policies, algorithms |
| 6. Memory | 5.4 | 5 | Need for management, addressing & buses, virtual memory & paging, translation & MMU, page faults & TLB |
| 7. Devices | 5.4 | 4 | I/O management, drivers & drive letters, spooling & buffering, the kernel |

Plus an exam-preparation section (key facts, commonly confused pairs, common mistakes, exam
technique, structured questions) and a final assessment.

Each lesson answers *why does this matter?* before any content, states its objectives, names
its prerequisites, and ends with takeaways and key terms.

---

## Interactive simulations

Twenty, each built because a static diagram could not do the job:

- **Scheduling laboratory** — FCFS, SJF, SRTF, Priority (both forms) and Round Robin. Edit
  arrival times, bursts and priorities; the Gantt chart redraws and every subtraction is
  shown. Verified against every worked example in the syllabus.
- **Address translation lab** — move the page number and offset and watch the offset bits stay
  byte-for-byte identical through translation. Trigger a page fault and service it.
- **Seven-state process diagram** — drivable. Take each transition and read what happened and why.
- **Disk allocation lab** — the same three files laid out under contiguous, linked and indexed
  allocation, with a “disk after months of use” mode that demonstrates external fragmentation.
- **FAT chain explorer** — follow the chain one hop at a time; the block total is computed as you go.
- **Evolution timeline** — CPU activity strips make each generation’s wasted time visible.
- **Boot sequence** — step through all seven stages with a simulated screen.
- **Memory calculator** — move any quantity and watch the powers of two fall out of the others.
- **Internal fragmentation**, **defragmentation**, **context switching**, **spooling vs no
  spooling**, **interrupt causes**, **directory tree & path names**, **directory structures**,
  **memory layout**, **multitasking illusion**, **system layers**, **file types**, **CLI vs GUI**.

---

## Assessment

Nine question types: multiple choice, select-all, true/false, fill in the blank, numeric,
ordering, matching, diagram hotspot, and structured A/L-style questions with mark schemes.

Five difficulty levels, and the reports break results down by level so a student learns *what
kind* of thinking is weak, not just their score:

1. Recognition · 2. Understanding · 3. Application · 4. Reasoning · 5. Exam style

The final assessment builds a balanced 20-question paper, then reports concept understanding,
application and exam readiness separately, plus a per-module breakdown and specific, named
next actions. A timed variant (25 minutes) withholds feedback until the end.

> **On provenance:** all questions are original, written to match the syllabus and its command
> words. None are past-paper questions, and structured questions are labelled
> “A/L-style practice question” throughout.

---

## Mastery and review

**Mastery** (`src/lib/mastery.ts`) combines evidence (75%) and engagement (25%).

Evidence is recency-weighted per question — the most recent attempt counts fully and older
ones decay, so a student who retries and succeeds is not held back by a first mistake. Harder
questions carry more weight, and a coverage factor stops one lucky answer implying mastery.
Six stages: *Not started → Learning → Practicing → Familiar → Proficient → Mastered*. Mastery
requires a high score **and** at least four questions answered **and** ≥85% accuracy.

**Spaced repetition** (`src/lib/srs.ts`) is a deliberately small SM-2 variant: a wrong answer
returns the question today; each correct answer moves it along a 1 → 2 → 4 → 8 → 16 day ladder
until it graduates out of the queue.

---

## Technology choices

**Vite + React 19 + TypeScript.** The app is entirely client-side: no accounts, no server, no
data leaving the device. Next.js would have added a server the product does not need. Vite
builds in under a second and deploys as static files, which matters for students on slow
connections or intermittent electricity.

**Tailwind CSS v4** with a design system defined as CSS custom properties in `src/index.css` —
a fixed rem type scale (no fluid clamping: this is a task surface viewed at consistent DPI), an
OKLCH colour system, spacing, radii, shadows and motion tokens. Theme tokens are semantic
(`--surface-card`, `--text-primary`) so light and dark are one definition, not two codebases,
and Tailwind's `dark:` variant is bound to the same rule so utilities and tokens never disagree.

**A drawn icon set** (`components/ui/Icon.tsx`) — 60 icons on one 24×24 grid at a single 1.5
stroke weight. No emoji anywhere in the interface: emoji render differently on every platform,
carry no consistent weight, and cannot inherit colour or state.

**Motion (Framer Motion)** for animation, with `prefers-reduced-motion` honoured in every
component. Animations exist to show mechanism — a Gantt chart drawing itself, a process token
travelling between states — not for decoration.

**Zustand + persist** for progress in `localStorage`. Small, synchronous, and survives a
refresh. Every read and write is guarded so private-browsing mode degrades rather than crashes.

**No charting or diagram library.** Every visualisation is hand-built SVG and CSS. D3 would
have added ~100 kB to draw rectangles, and hand-built SVG is fully controllable for
accessibility (keyboard-operable hotspots, real `aria` labels).

---

## Architecture

Content is data, not components. A lesson is an ordered list of typed blocks; the renderer maps
each block type to a presentation component. Adding a lesson — or a whole new competency —
means adding data, never rewriting the app.

```
app/src/
├── types/content.ts        # The content model: 19 block types, 9 question types
├── content/
│   ├── course.ts           # Course index + derived lookups (built once at load)
│   ├── glossary.ts         # 136 terms, each with a simple and a technical definition
│   ├── examPrep.ts         # Key facts, confused pairs, mistakes, exam technique
│   ├── modules/            # m1-foundations … m7-devices
│   └── questions/          # Question banks per module + exam bank
├── lib/
│   ├── mastery.ts          # Mastery model
│   ├── srs.ts              # Spaced repetition
│   ├── scheduling.ts       # CPU scheduling simulator (pure functions)
│   ├── search.ts           # Course-wide search index
│   ├── streak.ts           # Study streaks
│   └── inline.tsx          # Inline markup: **bold**, `code`, [[glossary-term]]
├── store/progress.ts       # Persisted progress
├── components/
│   ├── ui/                 # Button, Card, Badge, Progress, Callout, Modal
│   ├── layout/             # Shell, sidebar, search, theme, error boundary
│   ├── learning/           # Blocks, activities, glossary term, lesson renderer
│   ├── quiz/               # Question types, feedback, hotspot diagrams
│   └── viz/                # 20 simulations + a lazy-loading registry
└── pages/                  # Dashboard, path, module, lesson, review, practice,
                            # glossary, notes, exam prep, assessment
```

Lesson content uses a three-token inline syntax — `**bold**`, `` `code` `` and
`[[term-id|label]]` for glossary links — parsed at render time. Deliberately not full Markdown,
so lessons stay consistent.

---

## Design system

The type scale runs 12 → 38px in fixed rem steps. Its floor is deliberately 12px rather than the
9–10px a dense dashboard would use, because the stated usage scene includes shared low-end phones
and being projected in a classroom — the same reasoning raised the de-emphasis floor on dimmed UI
from 22% to 45% opacity, which is the difference between "receding" and "invisible from the back
of a room".

Prose is capped at 62ch, which lands real text at ~69 characters per line.

Motion is state-carrying only: the Gantt chart draws left-to-right because the timeline *is* a
sequence, the process token travels because the transition *is* the lesson, feedback springs in
because something just changed. There are no scroll-triggered entrance animations — content that
depends on an IntersectionObserver to become visible is content that can fail to appear.

## Accessibility

- Semantic landmarks, one `h1` per page, no skipped heading levels, and a skip link
- Every control has an accessible name; every input has a label
- Diagram hotspot questions are keyboard-operable, not mouse-only
- Ordering questions use arrow buttons rather than drag-only interaction
- Text contrast passes WCAG AA in both themes, verified by walking **every rendered text
  node** on every route and compositing the real painted background through translucent
  ancestors — not by sampling a few elements
- Colour-filled graphics that carry white labels (Gantt bars, memory segments, disk maps) are
  chosen at the palette step where the label clears 4.5:1, so they stay readable when projected
- Focus is visible everywhere and trapped inside modals
- `prefers-reduced-motion` is respected in every animated component
- Overlays are portalled to `<body>` with `position: fixed`, so a glossary
  definition opened from inside a scrolling table or an `overflow-hidden` panel
  is never clipped; placement flips above the trigger near the viewport bottom
  and clamps to the edges on narrow screens
- Theme follows the system preference until the reader chooses otherwise

---

## Performance

Route- and visualisation-level code splitting: a student reading Module 1 never downloads the
paging simulator. Production bundle ≈ 130 kB gzipped for the main chunk, with individual
simulations at 2–4 kB each. Content is loaded eagerly and deliberately — search, mastery and
the dashboard all need the full course — which makes navigation between lessons instant and the
whole app usable offline after first load.

---

## Testing

- `app/src/lib/scheduling.ts` reproduces every worked example in the syllabus exactly — all six
  algorithms match the published Gantt charts and averages
- Content integrity is checked programmatically: every quick-check question id, glossary
  reference, prerequisite link and visualisation id resolves
- Mastery, spaced repetition, streak and answer-matching logic covered by unit tests
- All 35 lessons verified rendering in-browser with no console errors, no horizontal overflow
  and no missing visualisations, at both mobile (400 px) and desktop widths

---

## Known limitations

- **Progress is per-browser.** There are no accounts, so a student switching device or clearing
  site data starts again. The store is structured so a backend could be added behind the same
  interface without touching the UI.
- **Teach-back activities are self-marked** against a checklist rather than AI-graded. This was
  deliberate: unreliable automated marking of free text would teach students the wrong thing,
  and self-marking against named criteria is itself good revision.
- **Structured questions are self-marked** against a published mark scheme, for the same reason.
- **English only.** The content model separates copy from presentation, so a Sinhala translation
  would mean adding a locale layer to `content/`, not rewriting components.
- **No past-paper questions.** None were provided, and fabricating them would be dishonest.
  All practice questions are original and labelled as such.
- **Two visualisations are read-only on very small screens** (the scheduler table and the
  seven-state diagram scroll horizontally rather than reflowing).
