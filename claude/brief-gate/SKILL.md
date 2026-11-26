---
name: "brief-gate"
description: "Mandatory gate before you send a task to a subagent, worker or another model (Codex, Gemini, Sonnet). Use when you are about to dispatch work to another agent: check the brief against my original words, run the cold-read test, check the metric, and pilot one agent first."
---

# Brief Gate: check the brief before a subagent runs

## 1. Why this skill exists

The most expensive orchestration mistake for me is not a dumb subagent but **a wrong brief executed faithfully**. A subagent has none of our conversation's context. It has only your brief. If the brief aims at the wrong target, every subagent is wrong from the first step, and I only find out at the end when I check the results.

A real case: I asked for a synthesis of reference videos to extract the **way things move** (animation, transition, kinetic typography) as presets in skill-development. The factory brief instead told subagents to build **whole scenes** (a full editor, wallpaper, UI panels), then judged them by **per-frame similarity to the reference**. As a result, the subagents were busy imitating the scene's skin, and their failures landed in that territory too (placeholders, collisions, reference skin leaking). The subagents were not wrong. The brief and its metric were.

In a long context, you work from your own summary, not from my words. That summary drifts a little at a time. This gate forces you back to my original words before you send a task.

## 2. When it is mandatory

- Before **every** subagent call (Agent tool, Codex worker, another Opus session, Gemini, etc.).
- Before writing a prompt or instruction file another model will read (factory brief, AGENTS.md, a prompt for Codex).
- Before resending a task after I give feedback. This is a weak point, because my feedback changes the goal and the old brief gets carried along.

Scale to cost:
- **Light** (one subagent, read-only, cheap to repeat, for example finding files): steps 3.1 and 3.3 only, one minute is enough.
- **Heavy** (fan-out of ≥3 agents, render, API credits, more than 15 minutes of work, or the result becomes a permanent rule or preset): every step, including the pilot (3.5).

This gate is **not** a reason to stop and ask my permission. A plan I already approved keeps running. This gate is your internal check.

## 3. Gate steps

### 3.1 Take my original words, not your summary
Find my original message for this task (scroll back, STATUS.md, the plan I approved) and quote it as it is. Then write two lines:
- **What transfers:** what concrete thing I want produced (example: "motion parameters: easing, duration, order, stagger").
- **Not:** what is clearly not the goal, even if it looks close (example: "not rebuilding the reference's scene, UI, background or objects").

If you cannot fill the "Not" line, you do not yet understand the task's boundary. Search the material first. If it is still unclear, ask me before fan-out.

### 3.2 Trace the goal chain
These four links must point to the **same** thing:

1. **Goal**: why I need this (example: the model in skill-development does not have to build effects from zero).
2. **Unit of work**: what the subagent builds (a motion primitive, not a scene).
3. **Deliverable**: the shape of the output (a parameterized preset, a demo on a neutral canvas).
4. **Acceptance metric**: how the result is judged.

**The metric is the most dangerous link.** A subagent optimizes what is measured, not what you mean. Ask whether a subagent that maximizes this metric would produce what I want. In the synthesis case, "per-frame structural similarity to the reference" meant "copy its skin". The right metric measures motion: easing curve, duration, stagger offset and direction, compared with measurements from the reference, on a canvas deliberately different from the reference.

### 3.3 Cold-read test
Read the brief as if you were a subagent that knows nothing but that text. Write a 2–3 sentence prediction: "With this brief I will build ___, judge it by ___, and hand over ___." Compare it with 3.1. If they do not match, fix the brief, not the prediction.

For heavy tasks, run this test for real: send the brief to one cheap subagent with the instruction "Do not do the task. Explain what you would build, how you would judge the result, and what questions you have." If its answer drifts from 3.1 or questions come up, the brief has holes.

### 3.4 Check the proven failure patterns
- **Ambiguous verbs** used without a definition (see §4). The subagent will use the common meaning, not mine.
- **The reference made a visual target.** If a subagent is given reference frames as the "goal", it will copy their skin. Give the reference as **measurement material**, and ask for output on a different canvas or context.
- **No "Not" line.** Without a negative boundary, the subagent fills the gap with work that looks diligent.
- **Context that exists only in your head**: file paths, the relevant parts of skill-development, naming conventions, decisions I already made, the blank canvas rule. Write them out explicitly, or give a path to read.
- **No stop condition.** When the subagent must stop and report instead of guessing (access blocked, material missing, measured result far from target).
- **Unclear output format**, so results from different subagents cannot be merged or compared.
- **Your assumptions written as facts** in the brief. Mark them as assumptions, or verify them first.
- **An old brief reused after my feedback** without being rechecked against that feedback.

### 3.5 Pilot before fan-out
For heavy tasks, run **one** subagent on **one** item first. Open its result yourself and check it against 3.1 and the chain in 3.2, not only against the brief (the brief itself can be wrong). Fan out only after the pilot passes. One wrong pilot is far cheaper than ten wrong subagents.

### 3.6 Keep the gate evidence
Before dispatch, write a short note in the project's STATUS.md (or in chat if there is no project):

```
GATE <task>: owner's words: "..." | transfers: ... | not: ... | metric: ... | cold read: matched/fixed (what) | pilot: passed/not needed
```

This note lets me audit why the brief was written that way if the result misses, and keeps the next session from repeating the same mistake.

## 4. My verb dictionary (my meaning, not the common one)

Write these definitions into the brief every time the word is used:

- **Synthesis / reverse engineering a video** (*sintesis*): extract the *way things move* (animation, transition, kinetic typography: timing, easing, order, stagger, direction, camera) into reusable primitives. **Not** rebuilding the reference's frames, scenes, UI, background or objects.
- **Preset**: a parameterized motion block (text, colour, duration and intensity can be swapped) that the model in skill-development just picks up. One preset, one motion. Not one scene.
- **Imitate / follow a reference** (*tiru / ikuti referensi*): analyze *why* the reference works, then apply its principle with the project's own aesthetics. Not copying its style.
- **Study** (*pelajari*): produce measured findings (numbers, frames, timestamps) that can be checked, not adjective descriptions.
- **Blank canvas**: bring work experience (order, standards, tools); do not bring another project's templates or brand rules.

If you find another of my verbs that a subagent turned out to misunderstand, add it to this list.

## 5. Required contents of a subagent brief

Not a rigid template, but the brief may not be sent while any of these points is empty:

1. **End goal**: one sentence on why this is being done and who uses the result.
2. **Unit of work**: what is built.
3. **Not**: the negative boundary.
4. **Input**: paths or material to read, including only the relevant parts of skill-development.
5. **Output**: format, file location and name.
6. **How it is judged**: the metric or QC you use when accepting the result.
7. **Stop and report if**: the stop conditions.

## 6. When you receive a subagent's result

- Judge it against my original words (3.1) and the goal chain (3.2), not only "matches the brief or not".
- Verify a subagent's claims ("passed QC", "92% similar") with your own measuring tools. Do not pass them raw to me.
- If the result misses, first decide: **was the brief wrong, or the execution?** If the brief, fix the brief and record the pattern in 3.4 or §4. Do not just repeat with the same brief.
- Design suggestions from a subagent still go through a mini proposal (problem, change, preview, principle, viewer journey) before they are applied.

## 7. Signs you are skipping the gate

| Your thought | Reality |
|---|---|
| "The context is clear, I just discussed it." | Clear in your head, not in the brief. The subagent reads only the brief. |
| "The brief is the same as before, just resend it." | After my feedback, the goal changed. Recheck it against that feedback. |
| "The metric is just a helper." | The metric is the real goal for the subagent. |
| "A pilot wastes time, just go parallel." | Ten wrong subagents cost far more time and tokens. |
| "I'll check at the end." | The end is exactly where I always find the mistake. Check now. |

## 8. Example: a synthesis brief, before and after

**Before (failed):** "Study this reference video and build 5 components (UIActionScript, AnchoredCaption, ScaleLadder, WordBeat, WorldStage) that reproduce its look. Compare per frame with the reference using a structural similarity metric, target ≥0.85."
→ Cold read: "I will rebuild the reference scene as completely as possible so the similarity score is high." Does not match my words. The metric measures skin.

**After (passed the gate):** "Goal: the model in skill-development can take ready-to-use motion without building effects from zero. Unit of work: one motion primitive per preset (example: word-beat pop, scale ladder, anchored caption follow). Not: building UI, background, wallpaper, panels or objects from the reference. Input: frames at 8–10 fps over timestamp range X–Y. Measure duration, easing curve, stagger offset and direction. Output: a parameterized preset + a demo on a neutral canvas (plain background, our own dummy text) + a measurement file of reference vs preset. Judged by: timing difference ≤2 frames, equivalent easing curve, no visual element of the reference in the demo. Stop and report if the reference's motion cannot be measured from the available frames."
→ Cold read: "I will measure the motion, then build a motion block that can be used anywhere." Matches.

## 9. Quick check before dispatch

- [ ] My original words are quoted, not your summary.
- [ ] The "Not" line is filled.
- [ ] Goal → unit of work → deliverable → metric point to the same thing.
- [ ] If the subagent maximizes its metric, the result is what I want.
- [ ] The cold read matches (heavy task: tested on a real subagent).
- [ ] Ambiguous verbs are defined (§4).
- [ ] Heavy task: a one-item pilot has passed.
- [ ] The GATE note is written.
