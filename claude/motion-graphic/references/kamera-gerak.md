# Camera, motion, and transitions

Opened when designing camera movement and transitions (steps 5-6 of the `SKILL.md` workflow). Older `LANTAI.md` items B10-B13b are condensed here with their reasons; the original wording stays in `LANTAI.md` (archive). The principle governing all motion is in NEGATIF 10: every movement has a speakable reason. Mechanical check: `scripts/juri/motion_lint.py`.

## Living frame (B10, B11, B12)
- **No flat frames.** Shots longer than 2 seconds have deliberate camera movement (slow push/zoom for focus, pan, object tracking). Only exempt if the north-star card itself uses a static camera, recorded in `RESEP.md`. Reason: a long static frame reads like a slide.
- **One focus object per beat.** The camera follows one object from appearance to finish and does not return to the start position midway. The camera obeys speech: arrives at word onset, holds until the next word, keyframes come from the word-timing table, and final framing never crops the object.
- **Elements sit still in their world; the camera moves.** When the camera zooms, it passes text and objects; text does not shift along on its own. Reason: a consistent world makes camera movement feel physical.

## Transitions (B13)
- Zero plain crossfades; a fade is not motion. Anything entering arrives from a direction or changes form; fast motion uses motion blur; easing is non-linear. Overlays and gradients enter and exit with motion.
- Motivated exceptions: micro-blend ≤ 4 frames only at the peak of a match-cut/zoom-through (`scale ≥ 3×` or object ≥ 80% of frame), and blur-to-sharp paired with `curves.ts` motion.
- Transition mechanics are chosen from the spatial relationship of the two scenes: B inside A = push-through; A part of B = pull-back; topic shift = whip (`references/motion-mechanics.md`, `references/pacing-map.md`). One signature transition per video; ≥ 4 types per 30 s with no same type back-to-back (`SceneChain`).

## Motion designed per move (B13a)
- Curves are chosen by what the move does from `scripts/remotion/curves.ts`: `land` entering from off-frame, `heavy` large objects and camera, `whip` state changes, `reveal` text from mask, `leave` exiting, `drift` holds. Never `Easing.ease` or `inOut(cubic)`.
- Duration is calculated from distance and weight (`dur(px, fps, weight)`), not a 0.4-0.6 s habit. One primary move is followed by unevenly spaced reactions (`react(i)`: 0, 67, 150, 250, 367, 500 ms), not `i × constant` stagger.
- Exit motion takes ±0.65× the entry duration and accelerates. Holds > 1 s stay alive (drift or camera breathing) unless stillness is intentional. No fade-up or blur-in as a default entrance; blur is for fast motion only.

## Recurring formats (B13b)
Formats that appear repeatedly vary their framing on each appearance (second chart onward: camera tracks a point, close-up, different position, reveal-out). Reason: repeating identical framing reads like a template.
