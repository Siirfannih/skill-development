---
name: director-pass
description: "Run before any storyboard, design or animation code. Makes you direct the piece instead of executing the brief line by line: separate measuring from directing, write a Gap & Friction report, set aside the first visual association for abstract ideas, and audit your own plan against six defects."
---

# Director pass: direct first, then draw

DRAFT under test (27 Nov 2026). Not yet approved by the owner.

Why this exists: a capable model that is handed a brief and a long rule list tends to comply. It illustrates each line literally, copies what the reference shows instead of why it shows it, and stays silent about weak spots in the brief. The owner wants a director who thinks, not a polite executor. The four steps below are short on purpose. They do not replace NEGATIF [mutlak] or the owner's gates.

## 1. Two passes, two hats

**Pass 1, mechanic.** Take the reference apart: frames, motion, transcript, measurements. Write only raw data (REF-SPEC and its numbers). No opinions, no design ideas.

**Pass 2, director and critic.** Start it as a separate turn (or a fresh subagent). Read only the script, the goal of the video, the audience and the Pass 1 summary. Do not discuss technique yet. Read the narration as a whole and ask what the video is promising and to whom.

For every element the reference repeats (a face, a character, a colour world, a kind of shot), answer two questions in writing: what job does it do in their story, and does that job exist in our script? An element moves over only when its job does. Example: a product video ends on a person smiling at a laptop because its promise is "this makes your work easier"; the person is the promise made visible, not a style.

## 2. Gap & Friction report (gate)

No storyboard panel and no animation code before `projects/<project>/GAP.md` exists with three posts filled:

- **Narrative-visual disconnect.** Which script lines are abstract and at risk of a literal picture.
- **Reference gap.** What the reference does not contain but this video needs for its message to land.
- **Owner blind spots, at least two.** Where the brief or the owner's own assumptions may leave the viewer confused, bored or without context.

Each point cites the line it is about, says what the viewer would feel, and proposes a fix. A point without a cited line does not count toward the two. If you looked and found fewer, say what you checked rather than inventing one.

The gate is the report, not a wait. If the owner asked to go straight to storyboard, write the report first, apply your proposed fixes as defaults, mark them in `DECISIONS.md`, and continue.

## 3. Set aside the first association

When the script names an abstract idea (agent, workflow, system, growth, AI, quality):

1. Write the first picture that comes to mind. Set it aside: it is the picture every other video already used.
2. Say what the thing does in this script, as a verb. Draw the mechanism, not the object.
3. Produce two candidates of different form (not two cards), taken from the mechanism and from this project's own world: its real product, its real screens, a real anchor you looked up.
4. Keep the one that still carries the line when the on-screen text is deleted.

The second cliché is still a cliché: a cursor, a node graph or a flow line is also a first association in AI videos. A drawn object or character needs a named real anchor (what it was drawn from, and where that is stored).

## 4. Inversion audit before you hand over

Check the plan against these defects and repair what you find. List what you repaired in `GAP.md`.

1. The picture only repeats the noun the voice-over says.
2. More than about 4 seconds with no change in shot scale, light-dark value or rhythm.
3. A transition that happens without a change of idea in the narration.
4. More than one element wants to lead a beat (a hierarchy problem; motion will not fix it).
5. The board, viewed at thumbnail size, reads as rows of the same layout.
6. An asset that does not fit the kind of video: for motion graphics, an asset you cannot redraw and animate (a raw photo) is a reference to redraw from, not the thing on screen. Before fetching anything, list per beat: asset, type, job in the beat, how it will move.

## Before you finish

| Check | Where it shows |
|---|---|
| Pass 2 ran as its own turn and answered "what job, does it exist here" | `GAP.md` top section |
| Three posts filled, two blind spots with cited lines | `GAP.md` |
| Each abstract line has a set-aside first picture and a chosen mechanism | storyboard table, `metafora` |
| Six defects checked, repairs listed | `GAP.md` end |

Sources of the shape: role casting and "more than one lead is a hierarchy problem" after emilkowalski/skills (MIT); claim plus reason plus finish table after jakubkrehel/skills (MIT); "search for the subject's physical object, not the category" after pbakaus/impeccable (Apache-2.0).
