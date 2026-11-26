# Motion mechanics: camera, transitions, cutout (logic and how they work)

Read when choosing camera moves or transitions, alongside `camera-transition.md`. Each mechanic is written as: **when used → how it works → starting numbers → check**. Frame numbers are measured per frame (30 fps) from references I approved and are starting points, not laws; adjust when VO tempo demands it.

Principle: transitions are **spatial logic** (where the next scene comes from), not effects. Choose a mechanic from the relationship between two scenes.

| Scene A → B relationship | Mechanic |
|---|---|
| B is "inside" A (screen, window, document, photo) | Push-through |
| A turns out to be part of B (the content turns out to be inside the product) | Pull-back reveal |
| Topic shift or energy rise | Whip |
| Opening/closing, entering a world | Depth fly-through |
| Many things → one idea | Orbit gather |
| Accumulation, "so many", fast hook/outro | Flash montage |
| Swap statement in the same world | Swap in place (the word/object is swapped, camera stays put) |

## Push-through
- **When:** the next scene is the contents of an object on screen.
- **How it works:** the camera pushes into the object's surface with acceleration (ease-in). When the object's contents fill the frame, cut to scene B at matching framing. Motion blur only in the last frames before the cut.
- **Starting numbers:** ±12–14 f push, cut at peak speed; last 2–3 f blurred.
- **Check:** end framing of A and start framing of B must align (screen content = frame B).

## Pull-back reveal
- **When:** showing that what was just seen is a screen/product.
- **How it works:** full footage shrinks (ease-out), then a device frame and palette background appear around it.
- **Starting numbers:** ±10–12 f shrink, frame lands 4–6 f afterward.
- **Check:** footage stays sharp while shrinking; the new background is the palette background.

## Whip
- **When:** shifting topics or raising energy.
- **How it works:** strong directional blur for 2–4 f, then hard landing on scene B without long easing.
- **Starting numbers:** 3 f blur.
- **Check:** whip direction matches reading direction or prior motion direction; whoosh SFX peaks at the middle blur frame.

## Depth fly-through
- **When:** opening, closing, or entering the product world.
- **How it works:** objects sit on multiple depth layers. The camera moves forward; front layers move faster than back layers (parallax). Depth of field narrows until the image dissolves into the palette background.
- **Starting numbers:** ±20–25 f; blur rises in the last 6 f.
- **Check:** at least 3 depth layers at different speeds; no white flash covering the frame.

## Orbit gather
- **When:** "many problems/tools → one solution".
- **How it works:** cards/photos enter from frame edges and gather into a ring around small centre text, then the ring slowly rotates while held.
- **Check:** centre text stays small and readable; the ring never covers it.

## Flash montage
- **When:** accumulation or hook/outro rhythm.
- **How it works:** photos switch every 2–3 f within the same colour grade.
- **Check:** max ±1 second per sequence; uniform grade, otherwise it feels random.

## Hold with drift
- During holds, the frame is never fully still: 1–3% scale or slow rotation/orbit, linear is fine.
- Reason: a dead frame feels like a slide. Exception: informational moments that must be read precisely.

## Gradual text appearance
- Words enter one by one, 2–4 f gap, following VO onset.
- New words enter with a subtle tint (accent tint) then settle to text colour over 4–6 f. This gives emphasis without enlarging the font.
- Typing with a cursor is used for calm statements and CTAs.

## Cutout
Separating a subject from its background (rotoscope/matte). Used for function, not decoration.
- **Subject into palette world:** when the footage's original background clashes with the palette or distracts, cut out the subject (hand + phone, person) and place it on the palette background. Footage then belongs to the video's world.
- **Text behind subject:** when the word is the hero and the subject is fairly still. The word sits between background and subject. Conditions: clean matte at hair/hand edges; the word stays readable, with >= 70% of its letters visible.
- **Check:** matte edges checked in a 100% still on the fastest frame; no halo.

## Camera follows meaning
- Camera stays close and tracks when one object moves; breaks wide on emphasis or meaning shift.
- Large motion only on meaning shifts; within one meaning, drift only.

## Timing helper (`scripts/remotion/timing.ts`)
Pure functions of `frame` (no state/Math.random/Date), safe for parallel renders. Import alongside `curves.ts`.
Test: `npx tsx claude/motion-graphic/scripts/tests/test_timing.ts`.

**Block out: one `T = timeline()` at module level.** All timings are written relative here, not scattered frame numbers.
Revising one duration shifts its children automatically. Output is in frames; never call it inside a component (components run every frame).
- Position: empty = timeline end · number = absolute · `"<"` end of previous child · `"<<"` start of previous child · `"label"` · `"+=N"`/`"-=N"` · combined `"<+=4"`, `"hero-=6"`.
- Unknown or duplicate labels throw an error (never fail silently).
```ts
const T = timeline(); T.add("hero", 18); T.add("sub", 14, "<+=4"); T.add("cta", 20, "sub-=6");
const heroIn = move(frame, T.at("hero"), 18, "land"); // T.total = scene duration
```

**Animate: three functions.**
- `stagger(i, n, {from, grid, axis, ease, gap, jitter, seed, start})` -> frame delay of the i-th element. `from`: first|last|center|random|index. `grid: [cols, rows]` from props, `axis: "x"|"y"` for per-column/row. `ease` applies across 0..1 spread (e.g., `CURVE.reveal`). `jitter` is seeded (`seed`), grows with progress.
  Replacement for `i * constant` rejected by `motion_lint.py` (even stagger): `stagger` passes because spread comes from an origin + ease, not a fixed multiple.
```ts
const d = stagger(i, 12, { from: "center", grid: [4, 3], gap: 3, ease: CURVE.reveal, jitter: 1, seed: 7 });
const p = move(frame, T.at("grid") + d, 16, "land");
```
- `dampTrack(keys, frame, fps, response, zeta)` -> spring value chasing `{at, v}` keys (ordered). Position and velocity carry across keys, so target changes never stop-and-start. `response` = period (seconds), `zeta` 1 critical, <1 bouncy, >1 slow. For object-tracking camera, parallax, counters. Cost O(number of keys) per call.
```ts
const x = dampTrack([{ at: 0, v: 0 }, { at: 40, v: 300 }, { at: 90, v: 120 }], frame, fps, 0.5, 0.85);
```
- `vanWijk([x0, y0, w0], [x1, y1, w1], t, rho?)` -> `[x, y, w]` (port of d3 `interpolateZoom`). `w` = viewport width = 1/scale. Long jumps: zoom out first then in, constant perceptual rate. `t` 0..1 receives easing/spring from outside.
```ts
const [cx, cy, w] = vanWijk(a, b, move(frame, T.at("jump"), 40, "heavy")); const scale = W / w;
```

**Limitations**
- `vanWijk`: if the camera uses `coverBox` clamping scale >= 1, the zoom-out arc gets clipped and the path turns into a plain pan. Full benefit only in a 2D world camera without cover clamping. Higher `rho` = stronger arc.
- `dampTrack`: keys must be in ascending order; `frame` before the first key = first key's value.
- `stagger`: output is rounded to frames; `jitter` can swap the order of two adjacent elements if `jitter` > `gap`/2.
- `timeline` only computes positions; it renders nothing and reads no VO (VO timings still enter as numbers/`beats.json`).
- Not yet validated in real renders; numerically tested only.
