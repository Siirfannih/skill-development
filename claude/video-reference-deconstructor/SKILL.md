---
name: video-reference-deconstructor
description: Deconstructs a reference video into atomic motion primitives (kinetic typography, visual, camera, transition) that are measured, free of the reference's skin and pass the slot-swap test, for the factory to turn into code presets in skill-development. Use whenever you deconstruct, synthesize or reverse-engineer a reference video (bedah, sintesis), or write a brief for an agent that does it.
---

# Video Reference Deconstructor

## 0. Why this skill exists

My goal: every good reference we have deconstructed becomes a **motion preset** that an editing model can pick up and adapt to its frame, so the model does not write animation from zero in every video.

The failure that keeps repeating, even with Opus: the deconstruction turns into **a template that imitates the reference 1:1**. It has three causes, and this skill prevents all of them:

1. **The wrong unit of work.** The model deconstructs the scene (full UI, background, panels, objects), not the way it moves. → §2 atomic test.
2. **The wrong judging metric.** The result is compared with the reference's look (per-frame similarity, left-right images). The model then optimizes skin similarity. → §6 slot-swap test.
3. **Invented numbers.** Adjectives are banned, and the model replaces them with numbers that look precise but were never measured. → §3 measurement rules.

Three things transfer from a reference: the **mechanic** (how it moves), the **trigger** (when it is used in the story), and **why it works** (why it is effective for the viewer). Its skin never comes along.

## 1. Three layers of every element

| Layer | Treatment | Example |
|---|---|---|
| **Mechanic** | Measure, then make it a parameter | scale change, displacement (% of frame), duration (s), curve type, stagger order and gap, direction, audio sync offset |
| **Trigger + why it works** | Extract, and write it in your own words | "breaks up a static talking head when moving into a new point; works because the scale change signals a chapter without cutting the voice" |
| **Skin** | Discard, then make it a slot | colour hex, font name, mascot, icons, a specific app's UI, text content, distinctive container shapes (purple folder, post card) |

The strongest evidence that a mechanic can be separated from its skin: the mechanic **appears more than once with different skins**, within one reference or across references. Record every appearance.

## 2. Atomic test: one primitive, one mechanic

Before writing a primitive, test: **if one part is removed, does the rest still work on its own?** If yes, split it into two primitives.

- "Talking head enters a container + text flanks it left and right + icons appear in stages with parallax" = **three** primitives, not one.
- A combination that really is good is saved as a **primitive combo** that only references primitive ids. A combo may not carry its own code or skin.
- If your primitive description names objects (UI window, dock, wallpaper, chat panel), recheck it. Objects are slots, not mechanics. If the mechanic cannot be explained without that object, what you are deconstructing is most likely still a scene.

There are four primitive layers: **kinetic typography**, **visual** (surface, background, texture, depth layers), **camera** and **transition**. Audio sync is not a layer of its own. It becomes a parameter inside a primitive (sound offset relative to the motion peak).

## 3. Measurement rules and honest numbers

1. **Measure at the native fps.** Check with `ffprobe`. Extract frames at the native fps over the motion window (30 fps video: 1 frame = 0.033 s; a 0.35 s motion has only ±10 samples). A 2 fps contact sheet is only for the structure map and may not be used to measure motion. Also check for duplicate frames (12/15/24 fps animation in a 30 fps container).
2. **Make sure it really is motion, not a cut.** Track its properties per frame (bounding box width/height, centre position, opacity) with a script, for example a colour-difference mask against the background. If a property jumps a lot within one frame, it is a **cut**, not easing. Do not write a curve for a cut.
3. **Curves from data, not from memory.** Turn the measured path into 0–1 progress, then match it to the nearest curve type. A popular stock Bezier (for example `0.16,1,0.3,1` = easeOutExpo) is a warning sign: if it did not come from a plot, label it `estimated`.
4. **Every number has a label and evidence.** `measured` (from frame tracking; include the script/data path) or `estimated` (from visual observation; include the reason). A primitive with an `estimated` curve has at most the status `teruji-sebagian` (partially tested).
5. **No empty adjectives**: smooth, cinematic, modern, clean, dynamic, premium. Replace them with physical quantities. If a quantity cannot be measured, write "not measurable from this material"; do not invent it.
6. **Do not guess the font or plugin.** Describe its anatomy (neutral grotesk + italic serif as a 1–2 word accent, letter height ±6% of frame).
7. **Honest audio.** Measure first: if the track is silent (≤ −80 dBFS), write `is_silent_stream: true` and do not invent SFX. Record motion that is deliberately left without sound.

## 4. Workflow

### Step 1 — Objective data
Analysing a video means four things: listen to the audio, inspect visual frames, inspect motion frames, and take the transcript (`claude/motion-graphic/references/bedah-referensi.md`; tools: `~/.config/skill-development/alat.md`). If one is missing, the analysis is not done: say so, do not infer it. Data: metadata (resolution, native fps, duration, audio status), a 2 fps contact sheet for the map of sections and cuts, cut detection (`select='gt(scene,0.3)',showinfo`), native-fps frame extraction over every motion window you will deconstruct.

### Step 2 — Audit: questions, not answers
For every motion window, answer from the data:
- **Camera:** what moves, the camera or the object? Where to, how far, for how long? Continuous motion or a cut?
- **Kinetic typography:** what is the unit of animation (letter, word, line, pill)? How is emphasis made? Where is the text relative to the subject? How long can the text be read before it changes?
- **Visual:** how many depth planes? In what order do elements appear? What changes when another element moves?
- **Transition:** a cut or motivated? If motivated, what object carries the viewer from scene A to B?
- **Rhythm and audio:** where does sound land relative to the motion peak? Where are the silent pauses?

Do not bring "typical" numbers into this step (for example "hold 3–4 s", "pre-hit −0.05 s"). Numbers like that make you find what you expect. If the repo has comparison numbers (for example `references/camera-transition.md`), open them **after** measurement is done, and only to compare.

### Step 3 — Filter: not everything deserves to be a primitive
A pattern is promoted to a primitive only if:
- it passes the atomic test (§2),
- why it works can be written in one sentence about the viewer, not about the look,
- it can be used in at least two different format contexts (talking head, product demo, faceless essay, and the like),
- it is not in the catalog yet. **Duplicate** = same category and same core mechanic → add it as a variation or parameter range of the existing primitive; do not create a new id.

### Step 4 — Write the primitive and the record
- **A primitive** is written as a factory spec (`claude/motion-graphic/pabrik/spec.schema.json`). Its required contents are in §5.
- **The deconstruction record per video** (chronology, every observation, evidence, labels) is saved as one MD per reference. The record is for audit and R&D and is **not loaded** in editing sessions.
- Do not create new folder structures or indexes outside the factory and the cookbook. One library, one registry.

## 5. Required contents of one primitive

| Content | Description | Factory field |
|---|---|---|
| id | `<lapisan>-<aksi>-<objek-generik>` (layer-action-generic object), example `kamera-cut-ke-wadah-lalu-mundur` | `id`, `komponen_usulan` |
| layer | typography / visual / camera / transition | `kategori` |
| mechanic | a sentence that **does not name reference objects** | `mekanik` |
| parameters | number + `measured`/`estimated` label + safe range | `parameter`, `terukur` |
| trigger | from the *Narrative trigger* vocabulary in `cookbook/CATALOG.md`; if none fits, propose a new term and record it | needs a new field |
| why it works | one sentence about the viewer | needs a new field |
| slots | everything swappable: container, colour, type, content, size | needs a new field |
| do-not-steal | list of reference skin that may not appear (colours, shapes, objects, text) | `kulit` |
| evidence | file + second per observation; sources of other appearances | `bukti` |

If the factory schema does not yet have a field you need (trigger, why it works, slots) or does not yet have the categories `transisi` and `visual`, **extend the schema**. Do not slip them into `ringkas` or `catatan`, because they cannot be checked there.

## 6. Slot-swap test: the condition for a primitive to pass

A primitive passes only if its component is rendered with **two slot fillings different from the reference** (two sets of neutral tokens, other text content, another container) and meets every condition:

1. **Motion matches the spec**: timing difference ≤ 2 frames, path/curve equivalent to the `measured` data. An `estimated` spec → status at most `teruji-sebagian`.
2. **No skin leaks**: no colour close to the reference palette, and no **shape, object, icon or layout** from the do-not-steal list.
3. **The mechanic reads without the skin**: someone who reads the mechanic sentence would recognize the same motion in both demos.

Judging pass/fail by comparing the demo's look with the reference's look is **forbidden**: SSIM or edge correlation against reference frames, reference-left candidate-right images, or the question "what makes the candidate look cheaper than the reference". All of these measure skin similarity and push toward cloning. The reference is used only as **motion measurement material**. The vision judge sees the candidate only, together with the spec and the do-not-steal list.

## 7. When it is done through subagents

Before sending a deconstruction or synthesis task to a subagent, run the `brief-gate` skill. The brief must contain:
- **Unit of work**: one atomic primitive per subagent, not one scene or one video.
- **Not**: does not rebuild the reference's UI, background, objects or shot order.
- **Material**: native-fps frames + measurement data. Reference frames are given as **measurement material, not a visual target**.
- **How it is judged**: the §6 slot-swap test, written out in full.
- **Stop and report if**: the motion cannot be measured from the material, or the mechanic cannot be explained without naming reference objects.

Pilot one primitive until it passes the §6 test before splitting many primitives across many subagents.

## 8. When primitives are used in an editing session

1. Match every script beat with a trigger in the registry. Load only the primitives you need.
2. Fill every slot from the active project's theme. Check the do-not-steal list before rendering.
3. **Re-sequencing ban**: do not use three or more primitives from one reference in the same order as in that reference. Mixing sources is not required; every primitive still needs a visual reason in its beat.
4. Building motion from zero is allowed only when no primitive fits. Record the reason, then add it as a candidate to the factory queue.

## 9. Example: from an invented claim to a measured primitive

Source: `indiavideomotion.mp4` (1276×718, 30 fps), 0.00–1.37 s. Per-frame bounding box tracking (colour-difference mask against the background `#FBF9FC`).

**Old claim (failed):** "Full-bleed talking head shrinks `1.0x → 0.42x` in `0.35s` (`expo-out`) into `slot:container_metaphor`, text flanks left and right, supporting elements stagger 0.08s."
- Never measured, and the data contradicts it: there is no shrinking animation.
- Three mechanics merged into one.

**Data:**
| t (s) | container width (fraction of frame) | note |
|---|---|---|
| 0.000–0.600 | 1.000 | full-bleed |
| 0.633 | 0.578 | jump within 1 frame → **cut** |
| 0.667 → 1.367 | 0.569 → 0.531 | continuous decrease of ±8% over 0.70 s, centre fixed at 0.50 |

**The correct primitive (one of three separate ones):**
- id: `kamera-cut-ke-wadah-lalu-mundur`
- mechanic: cut from a full-bleed subject to the subject inside a container ±0.58 of frame width in the centre, then the container keeps shrinking slowly by ±8% over ±0.7 s while supporting elements build up around it.
- parameters: starting width 0.578 (`measured`), decrease of 0.047 over 0.70 s (`measured`); pull-back curve shape `estimated` (nearly linear trend with deceleration, not yet fitted).
- trigger: break up a talking head when entering a definition/opening point.
- why it works: the cut to a container gives a "new frame" at once without waiting for an animation, and the slow pull-back makes the empty space feel prepared for the information to come.
- slots: container shape, radius, background, supporting elements.
- do-not-steal: lavender background, purple timeline bar, the text "you're a video editor", timeline layout below the container.
- split off from this primitive: (a) the timeline bar built up in stages = a visual primitive, (b) text with a highlight beside the container = a typography primitive. The container shape also appears differently at 7.0 s (post card), 8.0 s (folder) and 15.0 s (circle). The cut-to-container pattern needs measuring at each appearance before it is called recurring.

## 10. Gate before saving

- [ ] Native fps recorded; motion measured at native fps, not from the 2 fps sheet.
- [ ] Every motion checked as not a cut; no curve for a cut.
- [ ] Every number labelled `measured`/`estimated` and has evidence.
- [ ] No empty adjectives.
- [ ] The primitive passes the atomic test; the mechanic sentence names no reference objects.
- [ ] The trigger uses the CATALOG vocabulary; why it works is written about the viewer.
- [ ] Not a duplicate of an existing primitive (category + core mechanic).
- [ ] The §6 slot-swap test passed with two slot fillings; no judging of look similarity against the reference.
- [ ] The deconstruction record per video is saved as its own MD and is not loaded in editing sessions.
