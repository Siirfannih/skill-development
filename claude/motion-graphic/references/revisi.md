# Revision = diff, one round

Opened when there is a revision message on a video or storyboard, before the first edit (step 8 of `SKILL.md`). Older `LANTAI` item F27 moved here; step-by-step details per round live in `references/revision-log.md` §0, do not repeat them here.

## Rules
- **One round.** Feedback on render 1 is collected and worked all at once into render 2. Questions on unclear feedback are asked once at the start of the round. Reason: piecemeal revisions cause already-approved scenes to change too.
- **Approved scenes stay untouched.** Only the changed ranges are re-rendered. Within a revised block, only the requested attributes change (colour, font, size, position, timing, motion). Check: `scripts/juri/revisi_cek.py cek` compares every text block and layer against the baseline.
- **Storyboards are also a diff.** "Too plain, improve it more" on an existing storyboard means a diff on the latest version's code: inspect that version first, then change colour or background, relayout, or object content. Never a fresh generator from scratch. Reason: a new generator throws away parts I already approved.
- **Assemble by range.** Each round is assembled by range (`scripts/lego/compose.py --rentang`) with a before/after sheet. Re-locking audio, full-frame audit, and Devil's Advocate run once before the final render, not every round.
- **Revising videos made before new rules.** Write `qc/revisi.json` `{"basis": "<commit of approved version>", "alasan": ...}`. New rules and gates (B13a, A9a, E23/E24, lego) apply only to the changed parts; approved parts are not migrated unless I ask for it. `render.sh final` then runs `motion_lint` only on changed files and `audio_order.py check --warisan`.

## Revision direction: toward the middle, not the opposite extreme
Feedback like "too heavy", "too crowded", "more breathing room", or "bigger" asks for a move toward the middle. Correcting to the opposite pole (heavy -> pale flat white with one speck in a corner, breathing room -> objects shrunk until text is unreadable, sparse frames) only swaps one complaint for another. Before handing over a revision:
1. Pick 3-5 representative frames (bright, dark, dense, emptiest). Per frame: `python3 scripts/banding.py <new.png> --sebelum <old.png> [--target <ref.png>]`. Target = reference frame or the picture I described; without a target, write your estimated target numbers and why.
2. The complained-about metric (luma range, sat p95, focus area) moves toward the requested direction in a moderate step: roughly 30-60% of the distance to target (the "tutup" column). More than ~60% = suspect overcorrection; less than ~30% = revision is barely noticeable.
3. Unmentioned metrics must not worsen: readability and text size (on mobile, 360 px), focus area (do not drop below ~12% without a text band, F3), saturation, and F1 must not trigger. Small text caused by shrinking an object = fail.
4. Record before/after numbers per representative frame in `DECISIONS.md` (metric, old -> new, % closed). Whole storyboard without a reference: `banding.py --seri <folder>`, sparse frames <= 10%.

## After revision, still in force
NEGATIF and the iron law of `SKILL.md` apply to every changed part: inspect changed frames at full resolution (`scripts/lihat.py`) before handing them over.
