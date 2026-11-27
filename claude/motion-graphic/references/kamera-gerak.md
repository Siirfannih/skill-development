# Camera, motion, and transitions

Opened when designing camera, transitions, curves and motion blur (steps 5-6 of the `SKILL.md` workflow), or when motion feels "not smooth" or "choppy". Older `LANTAI.md` items B10-B13b live here with their reasons (original wording: `archive/riwayat/LANTAI.md`). Principle: NEGATIF 10, every movement has a speakable reason. Numbers (30 fps) are starting points from approved references; REF-SPEC and VO tempo win. Check: `scripts/juri/motion_lint.py`. Text motion (T, G codes): `teks.md`.

## Living frame (B10, B11, B12)
- **No flat frames.** Shots over 2 s get deliberate camera movement (slow push, pan, object tracking); informational scenes (UI, checklist) push slowly toward the part being discussed. Static only when the north-star card is, recorded in `RESEP.md`. Reason: a long static frame reads like a slide.
- **One focus object per beat.** The camera follows one object from appearance to finish without returning to the start midway, and obeys speech: arrives at word onset, holds until the next word (keys from the word-timing table), never crops the object in the final framing. Track close while one object moves; break wide only on emphasis or a meaning shift.
- **Elements sit still in their world; the camera moves** past text and objects; text does not drift on its own. Reason: a consistent world makes camera movement feel physical.
- Hold to read 0.8–3 s (≥ 4 s after a UI reveal), then move decisively: push ≥ 10 %, pan ≥ ½ frame, or zoom ≥ 2×. Constant small motion feels weak. Moves inside a shot are slow (3–8 s), cuts between shots fast (2–9 f). Do not repeat the same camera move on two consecutive beats.
- Holds over 1 s stay alive with drift (C19) unless stillness is intentional, e.g. a moment that must be read precisely.

## Curves and timing (B13a)
- Every move has start and end keys and a curve chosen by what it does (`scripts/remotion/curves.ts`): `land` entering from off-frame, `heavy` large objects and camera, `whip` state changes, `reveal` text from mask, `leave` exiting, `drift` holds. Not `Easing.ease`, a generic `inOut(cubic)`, or a jump without a curve. Linear only for drift, loop rotation, and per-frame camera keys whose smoothness sits in the data (Smooth camera); C08 and C12 still ease at entry and exit.
- Duration comes from distance and weight (`dur(px, fps, weight)`), not a 0.4-0.6 s habit. One primary move is followed by unevenly spaced reactions (`react(i)`: 0, 67, 150, 250, 367, 500 ms = 0, 2, 5, 8, 11, 15 f), not `i × constant` stagger.
- Exit takes ±0.65× the entry duration and accelerates. No fade-up or blur-in as a default entrance; blur belongs to fast motion.

| Character | Influence out (first key) | Influence in (last key) | When |
|---|---|---|---|
| Snappy out (most common) | 10–15 % | 85–95 % | text entering, camera landing, panels |
| Smooth in-out | 50–66 % | 50–66 % | drift, gradients |
| Accelerate | 70–85 % | 5–10 % | exit, zoom-through, falling |
| Overshoot | snappy + inertia | | icon/pill pop |

- Web/engine: enter `cubic-bezier(0.16,1,0.3,1)`, exit `cubic-bezier(0.7,0,0.84,0)`. Springs (response, damping ratio), pure functions of time: snappy 0.22/0.8 (pills, buttons), default 0.4/0.86 (cards, panels, camera), heavy 0.5/1.0 (large text, logo), playful 0.5/0.45 (mascot only). Overshoot ≤ 1.05 on UI, none on large text; settle over 6–10 f, never a dead stop.
- One motion register per video (technical, editorial, expressive, calm; "premium" = empty space, one focus, firm hierarchy, calm camera); curves are chosen per move within it.
- Rhythm: one new event every 12–24 f, something new every 2–4 s. The motion apex, not the scene start, hits the beat; sound stays on the grid.

## Camera moves (C)
| Code | Move | Numbers | When |
|---|---|---|---|
| C01 | Micro zoom on keyword | 1.04–1.16× over 13–25 f, starting on the keyword | almost every shot |
| C02 | Push-in | 100→115 % over 1–2 s | building tension |
| C03 | Push-through screen | ±3× over ±12–14 f, strong ease-in, cut at peak speed, blur only in the last 2–3 f | entering UI |
| C04 | Seam at peak speed | exit ease-in 12–16 f → scene change on the peak frame → expo-out landing 18–22 f, no overshoot | joining 2D scenes |
| C05 | Zoom-through into object | ±2× (or 100→1500 %) over 9–18 f, expo ease-in; new background colour = object colour | into a letter/icon/card |
| C06 | Reveal-out | 3–4× over ±60 f (9 f accel, 50 f decel), then hold ≥ 4 s | detail → context |
| C07 | Whip pan | ±1.2× frame width over 3–10 f, directional blur peaking 2–4 f around the cut, rotation settle 5–8°, hard landing | energy, topic shift |
| C08 | Lateral list truck | constant speed, one item per VO word | list ≥ 4 items |
| C09 | Snap punch-in "you" | 1.8× over 4 f, back over 4 f | addressing the viewer |
| C10 | Drop-settle | vertical entry decaying over 40 f + roll ≤ 6° decaying | new scene drops into place |
| C11 | Glyph anchor | camera pulls back 10× over 88 f, one letter/icon counter-scales | logo born from a letter |
| C12 | Summary dolly | 3D dolly ±8 s past the artefacts | recap |
| C13 | Reverse / over-the-shoulder | behind the character when the action is on what they face | family A |
| C14 | Impact shake | ≤ 12 px, ≤ 6–8 f, decaying, never an endless wiggle | slam / falling object |
| C15 | Snap reflow zoom-out | instant ×0.45 then ×0.6, 2 f each | composition grows |
| C16 | Rotate-settle after cut | −15°→0 over ±6 f | object enters |
| C17 | Rack focus pop-forward | card 1.0→1.25 while background blurs 12–20 px, 8–10 f | focus shifts |
| C18 | Follow | camera parented to the object's null, 3–5 f lag (or `dampTrack`) | ball/cursor |
| C19 | Drift | 1–3 % scale or slow rotation/orbit during holds | holds |
| C20 | Cut zoom | cut to the same subject 2–5× closer on the same eyeline, 4–8 f momentum; 1 per 6–10 s, on a downbeat | editorial |
| C21 | Blur-in UI landing | UI layer lands from full blur → sharp over 12 f at the end of a zoom-through | landing on UI |

Direction: in a 2D world content moves left (forward); vertical moves are reserved for changing world/family. AE rig: null `CAM` at centre, all content parented to it except BG and UI overlay; zoom to point P = anchor CAM at P, position centre, animate Scale. Real depth: 3D layers + 2-node camera (background Z +800, object 0, text −200).

## Transitions (B13)
Transitions are spatial logic (where the next scene comes from), not effects. Zero plain crossfades: anything entering arrives from a direction or changes form, overlays and gradients included. Exceptions: a micro-blend ≤ 4 f at the peak of a match-cut/zoom-through (`scale ≥ 3×` or object ≥ 80 % of frame), and blur-to-sharp paired with `curves.ts` motion. Every transition has a sound. When and how strong a move lands comes from `pacing-map.md`; which mechanic comes from the table below.

| Scene A → B | Mechanic |
|---|---|
| B is inside A (screen, window, photo) | push-through (C03/X04); end framing of A = start framing of B |
| A is part of B (content inside the product) | pull-back reveal: sharp footage shrinks ±10–12 f, device frame + palette background land 4–6 f later |
| Topic shift, energy rise | whip (C07/X06) in reading or prior-motion direction; whoosh peaks mid-blur |
| Opening/closing, entering a world | depth fly-through: ≥ 3 parallax layers, ±20–25 f, blur rises in the last 6 f into the palette background; no white flash |
| Many things → one idea | orbit gather: cards from the edges ring a small centre text that stays readable; ring rotates slowly on hold |
| Accumulation, fast hook/outro | flash montage: photos every 2–3 f, one grade, ≤ ±1 s |
| Swap statement, same world | swap in place; camera stays |

| Code | Transition | Numbers | When |
|---|---|---|---|
| X01 | Object carry / match shape | object A morphs into object B (circle → screen, tick → play button) | highest class, try first |
| X02 | Mask from shape | a shape in A becomes the window that opens B | elegant world change |
| X03 | Layered colour flood | clicked element spills colour; companion layer leads, main follows 3–4 f | chapter change |
| X04 | Zoom-through / dive | C05/C03 into the element that becomes the next background | into UI |
| X05 | Layered zoom-through to shape | 3–5 brand-shape layers, ≥ 3× each, 3–9 f each, 20–25 f total; one riser + thud on landing | brand reveal |
| X06 | Whip | C07, cut inside the blur | energy |
| X07 | Seam / cut on motion | C04; vertical for world change (ease-in 7–12 f → cut → expo-out 13–14 f) | joining |
| X08 | Shape wipe | brand shape covers 100 % from an edge, 5–9 f ease-out | fast topic change |
| X09 | Layered wipe | 2 shape layers (A then B, 3 f gap), 9–10 f, the shape continues into the layout | into a white canvas |
| X10 | Foreground wipe | blurred near-lens object crosses in 9 f hiding the cut, or covers the lens ≤ 4 f | family A |
| X11 | Pixel block mosaic | ±60 px blocks in brand colour, build 3 f → break 2–3 f | pixel-world chapter divider |
| X12 | Exposure flash / negative | up 1 f, down 3–4 f; full white/negative flash 1–2× per video, on the outgoing frame (never inverting the new shot's face) | accent |
| X13 | Frame-in-frame | frame shrinks into a card in a dark room, 8 f | meta moment |
| X14 | Bloom match | object glows to fill the frame 8 f, same object in the same screen position | logo |
| X15 | Mask shrink to logo | scene shrinks into the brand shape, 8 f | closing |
| X16 | Card flip | 3D Rotation Y 8–12 f | UI card change |
| X17 | Hard cut on beat | only at act boundaries, on the downbeat + impact SFX | accent |

- Variety follows REF-SPEC; default without a reference: ≥ 4 types per 30 s, never the same type back-to-back (`SceneChain`), one signature transition per video. Blur-in-place as a transition at most once per video.
- Direction is consistent with the story (forward = right/inward).
- Trigger at the end of a VO phrase (2–6 f after the last syllable); the new scene lands on the first word of the next phrase (−3…+3 f). A scene's pre-roll never cuts an unfinished wipe.

## Recurring formats (B13b)
Formats that appear repeatedly vary their framing each time (second chart onward: camera tracks a point, close-up, different position, reveal-out). Reason: identical framing reads like a template.

## Cutout
For function, not decoration. **Subject into palette world**: when the footage background clashes or distracts, cut out the subject (hand + phone, person) onto the palette background. **Text behind subject**: the word is the hero and the subject fairly still; clean matte at hair/hand edges, ≥ 70 % of letters visible. Check edges on a 100 % still of the fastest frame; no halo. Tools: `persepsi.md`.

## Motion blur
Fast motion gets a short, clean trail: smear p90 ≈ 1–1.6 px at 640 width, blur ≤ 2–3 frames, no ghost copies.

| Setting | Value |
|---|---|
| Shutter angle | 200° |
| Shutter phase | −100° (−angle/2) |
| Samples per frame | 16 final (adaptive cap 24); 4–6 only for drafts, because low samples make rows of copies, not smooth blur |

- AE: `layer.motionBlur = true` on every moving text and object layer, not only on the comp. A 2D camera made with a **Transform** effect on an adjustment layer: turn off "Use Composition's Shutter Angle" (`ADBE Geometry2-0009` = 0) and set the effect's own shutter (`ADBE Geometry2-0010`) to the same angle, because layer motion blur does not see motion coming from an effect.
- Remotion: `@remotion/motion-blur` `<CameraMotionBlur shutterAngle={200} samples={16}>` or your own ≥ 16 subframes. Version 4.0.380 miscounts frames inside `<Sequence from>` (RETRO); test inside a Sequence first.

## Smooth camera
Camera keys with per-key easing stop and start at every key (one measured case: p95 speed 234 px/f vs a 140 reference, 27 stop-starts). Instead:
1. Compute the camera pose **per frame**: focus point (cx, cy), **log(scale)** (zoom in log space feels constant), roll, yaw/pitch.
2. Smooth with a **gaussian, σ = 0.12 s** (3.6 f), per segment; the filter never crosses a HOLD or a cut.
3. Write it back as per-frame keys with LINEAR interpolation (Remotion: store the array, read `array[frame]`).
4. Depth of field: focus distance = camera-to-point-of-interest distance; not on flat UI stages.

Measure, do not guess: `scripts/bedah-kamera.py video.mp4 out.csv` (ORB + RANSAC at 640×360, speeds as 1080p px/frame; needs `opencv-python`, `numpy`) reports zoom, shift, rotation, cuts, speed, acceleration, jerk, stop-starts. Compare reference and render; starting target p95 speed ≤ 160 px/f, no stop-start inside one move.

## AE text recipes
- T01 word rise in AE: baseline mask −size·1.25 to +size·0.32, feather [0, 2]; per-word Position 3D [0, size·1.05 + 24, 0] → 0; selector Words, Ramp Up, Ease High 100 / Low 0 (each word lands on its own); offset −100 → 100 over 10 f + (word−1)·3 f, influence 18 / 92 (fast start, soft landing). Words start fully under the mask, so nothing peeks. Exit: second animator up past the mask in 6 f (influence 80 / 10). Remotion: one-line `overflow: hidden` wrapper, each word `translateY` 105 % + 24 px → 0 with its own `Easing.bezier(0.16, 1, 0.3, 1)`, 3 f apart.
- T15 smear exit: over ±5 f, scale X ×1.6 and Y ×0.96, shift −140 px, opacity → 0, Directional Blur 0 → 90; the blur comes from the motion, not blur in place. Remotion: `scaleX(1.6)` + directional `filter: blur()` 4–6 f.

## Timing helper (`scripts/remotion/timing.ts`)
Pure functions of `frame`, safe for parallel renders; import alongside `curves.ts`. The position syntax and parameters are documented in the file; test: `npx tsx claude/motion-graphic/scripts/tests/test_timing.ts` (numerically tested only, not yet validated in real renders).
- `timeline()`: one `T` at module level so all timings are relative and revising one duration shifts its children; never call it inside a component; it reads no VO (VO timings enter as numbers/`beats.json`). Unknown or duplicate labels throw.
- `stagger(i, n, {...})`: delay from an origin + ease + seeded jitter; the replacement for `i × constant`, which `motion_lint.py` rejects. `jitter` > `gap`/2 can swap two neighbours.
- `dampTrack(keys, frame, fps, response, zeta)`: spring chasing ascending `{at, v}` keys with velocity carried across keys, so target changes never stop-and-start (tracking camera, parallax, counters).
- `vanWijk(a, b, t)`: long camera jumps zoom out then in at a constant perceptual rate; a `coverBox` camera clamping scale ≥ 1 clips the arc into a plain pan.
```ts
const T = timeline(); T.add("hero", 18); T.add("sub", 14, "<+=4");
const heroIn = move(frame, T.at("hero"), 18, "land");
const [cx, cy, w] = vanWijk(a, b, move(frame, T.at("jump"), 40, "heavy")); const scale = W / w;
```
