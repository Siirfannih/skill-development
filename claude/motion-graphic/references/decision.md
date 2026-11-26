# Decision — choosing, deciding, and when to ask

Read when choosing between options (family, text style, technique, transition), when two rules feel like they conflict, or when unsure whether to ask me.

## Contents

1. Who decides what
2. Priority order when rules collide
3. Choosing a visual family
4. Choosing a technique per moment
5. Bringing experience, not templates
6. Cost and credits
7. When to ask

## 1. Who decides what

| Decision | Owner | How |
|---|---|---|
| Goal, message, CTA, final script, final storyboard | Me | Approval gate; wait for the word "final" |
| Family, text style, T/C/X techniques, SFX, timing | Agent | Decide yourself with a written reason in the beat spec |
| Departures from the approved storyboard | Agent, then reported | Record in the departures list on delivery |
| Paid generation (VO, generative SFX, music, AI image/video) | Agent after its gate opens | State the estimated cost before generating |
| New rules in this skill | Me | Proposal via RETRO (`revision-log.md` §20), status "menunggu persetujuan" |

Work already written in a plan I approved counts as approved. Finish it end to end and judge phases internally; do not ask me to judge every phase or send half-finished versions as deliverables.

## 2. Priority order when rules collide

1. My direction on this project (brief, revisions, approved storyboard).
2. Core rules in `SKILL.md`.
3. Story: what makes viewers understand this beat (`direction.md` §6).
4. Quality standard: execution at least on par with the reference.
5. Variety and rhythm (the "≥ 4 types per 30 s" rule, etc.).

If a technique does not fit the story in one beat, swap in another technique of equal quality. Never solve a conflict with rougher execution, and never add a second focus point just to fill a variety quota.

## 3. Choosing a visual family

Choose per act, not per shot (details in `direction.md` §5):

| Act content | Family |
|---|---|
| Problem, character, personal story | A. Collage + character |
| Claim, question, turning point | B. Dark typography |
| Solution, workflow, product, CTA | C. White UI canvas |

Switching families is a story moment, so it always uses an act transition and a silent hinge (`audio.md` §14.4).

## 4. Choosing a technique per moment

Determine the text's **role** first, then its technique. The same role always moves the same way across the video (`typography.md` §8):

| Role | Technique |
|---|---|
| R1 narration | T01 / T19 |
| R2 keyword | T03 / T20 |
| R3 claim | T03 + shake |
| R4 label | T23 / T10 |
| R5 typed UI | T11 |
| R6 hero word | T04 / C05, max 2× per video |

For transitions, start by asking "what object from shot A can be carried into shot B?". If there is one, use X01 (object carry). If not, pick a transition whose direction fits the story (`camera-transition.md` §10).

Write the reason for the choice in one phrase in the beat spec. A choice without a reason is a sign of a template.

## 5. Bringing experience, not templates

Carried over from past projects: gate order, how to measure references, QA methods, proven working tools, error logs.

**Not** carried over unless I ask: palettes, fonts, text styles, characters, mascots, SFX kits, music styles, act structures, and storyboards from other projects. Example: Tuntunly's black/white rules do not apply to Jadisatu.

Reason: old templates make new work feel like a copy and lock decisions before the brief is understood. If an old rule seems relevant, propose it as an option with its reason. Never apply it silently.

## 6. Cost and credits

- Zero paid generation before its gate opens: VO after the final script, music and SFX after the final storyboard (matching the voice lock (`lock suara`) at the Storyboard/block out stage and SFX/music at the Mix stage, `templates/TAHAP.md`).
- State the estimated cost before generating. Generate 1–2 variations, not 4, unless I ask.
- Generate in segments so weak segments can be redone on their own.
- Failure this prevents: VO generated 3 times (±7,300 credits) before the final script.

## 7. When to ask

Ask for ambiguities that change the result significantly, max 3 questions at the start, in one message. Before asking, check whether the answer is in project files, the brief, or memory. If after checking you still do not know or your confidence is low, **do not guess**: ask (core rule 13 in `SKILL.md`). This also applies mid-work, not only at the start.

| Situation | Action |
|---|---|
| Intended reference is uncertain | State in one sentence, in Indonesian, "yang aku tangkap dari referensi ini adalah…" before continuing |
| Product UI is inaccessible | Request a screenshot **before** the storyboard |
| Technical choices (technique, timing, SFX) | Decide yourself, write the reason |
| Script or storyboard gate | Wait for the word "final" |
| Deadline pressure | Split time per gate up front; deadlines are never a reason to skip the script and storyboard gates |
