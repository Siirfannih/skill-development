# Revision = diff, one round

Opened when a revision message arrives on a video or storyboard, before the first edit (Deliver step of the `SKILL.md` workflow; older `LANTAI` item F27). Record first, then work: without this order, fixing one complaint easily changes approved scenes.

## Rules
- **One round.** Feedback on render 1 is collected and worked at once into render 2; more rounds only when the user asks. Unclear feedback is asked about once, at the start. Reason: piecemeal revisions change approved scenes too.
- **Approved parts stay untouched.** Only changed ranges are re-rendered; inside a revised block only the requested attributes change (colour, font, size, position, timing, motion). What the user did not mention counts as approved.
- **Storyboards are a diff too.** "Too plain, improve it" means a diff on the latest version's code (colour, background, relayout, object content), never a fresh generator that throws away approved parts.
- **Videos made before newer rules.** Write `qc/revisi.json` `{"basis": "<approved commit>", "alasan": ...}`; newer rules and gates (B13a, A9a, E23/E24, lego) apply only to changed parts, approved parts are not migrated unless asked. `render.sh final` then lints only changed files and runs `audio_order.py check --warisan`.
- If the frames show no measurable problem with what the user named, say so with the numbers; do not substitute a different change to look responsive.

## Order before the first edit
1. **Ledger.** Each point = one `DECISIONS.md` row (see Ledger): the user's words verbatim + scope. A complaint about one block applies to that block. Other blocks breaking the same written rule go in as a `usul` row (rule path:line + blocks), offered in chat, worked only after the user picks. Scope inside the video is written back, not asked; whether it applies to other videos is never asked (`../../skill-steward/references/placement.md` §1).
2. **Write back the delta** in one sentence: what changes, what is guaranteed not to (`S08-B03: change X. The rest stays.`). If a scene is lengthened, cut, or moved, compare the base speech → visual map with the new one: a sentence losing an approved visual without a ledger row fails; compress the new scene instead of shifting old visuals (`alur-teknis.md` §4).
3. **Lock the base.** `scripts/juri/revisi_cek.py mulai projects/<proyek> --basis <approved commit> --alasan "…"`, fill `boleh_berubah` with ledger IDs, and `scripts/baseline_lock.py approve` the untouched scenes. Archive the approved master.
4. **Re-read in full** NEGATIF (`SKILL.md`), the project's north-star card, and the docstrings of the juri scripts that measure the complaint.
5. **Fix at the level complained about**: that block's data (position, hold, size), not a shared component or rule. Text-motion changes stay within the complained style/scene and are checked per KT before rendering (full display time, exit after the last word, no stacking in one lane); stills every 2 s cannot judge motion. Your own audit or Devil's Advocate findings on other blocks are `usul` rows, offered with their card, never installed in a video the user has seen.
6. **Fast round.** `revisi_cek.py cek` passes (each text block and layer vs the base; a change without an `Irfan`/`usul-dipilih` row is restored). Render only changed layers, assemble their range (`scripts/lego/compose.py lego/lego.json --rentang <start> <end>`, ±1 s), send that clip + before/after stills. Full master, audio re-lock (stale during revision is fine), full-frame audit, and Devil's Advocate run once when the user says revision is done (`cookbook/README.md` §Juri 6–7). Report "ready for review" + measured numbers.

Test: every changed layer points to one ledger row; anything that does not is restored to the base.

**Apply the reason, not the example.** When the user gives a reason ("stock b-roll = filler, so text goes centre"), the example is an illustration: tabulate every shot × the reason's condition (stock / meaningful / speaker) and apply it to every shot that meets it; exceptions need a written composition reason.

## Ledger and scene locks
**Ledger: `DECISIONS.md` in the project folder, append-only.** One row per decision; old rows are never edited or deleted, a changed decision is marked in "Menggantikan" on a new row.
```
| ID | Tanggal jam | Sumber | Kata Irfan (verbatim) | Cakupan | Status | Menggantikan |
|---|---|---|---|---|---|---|
| D-014 | 2026-10-25 08:16 | Irfan | "real footage itu bagian dari Apple style" | S12 NPNP | terkunci | D-009 |
| D-015 | 2026-10-25 09:02 | usul | — (usul Sutradara: kata hero koral, kartu 07 k3) | S12 kata hero | ditawarkan | |
```
- **Cakupan** is specific (`S08-B03 kartu tujuan`); "all" only when the user said all. A short comment never grows into a global ban ("UI kurang elegan" on S09 is about S09). Unsure: restate the scope in one sentence and ask.
- **Sumber**: `Irfan` (the owner asked; the value `revisi_cek.py` expects), `usul` (a model idea, audit and Devil's Advocate included), or `usul-dipilih` (the owner picked it; quote the answer). TASK and `qc/cakupan-revisi.json` cite only `Irfan` and `usul-dipilih` rows; proposals are welcome in chat, never installed silently.
- Words verbatim (a paraphrase may sit beside them). Cite the ledger ID before changing anything; no ID = ask first.

**Scene lock = baseline frames.** Scenes the user approved are locked with `scripts/baseline_lock.py`:
```bash
python3 scripts/baseline_lock.py approve render.mp4 S08 12.0,13.5,15.2 --dir locks --note "D-014"
python3 scripts/baseline_lock.py check render_baru.mp4 --dir locks --shift S08=+2.3   # before sending
python3 scripts/baseline_lock.py unlock S08 --dir locks --note "D-020"               # only with a ledger ID
```
`check` exits 1 when a locked scene changed by more than 0.5 % of pixels; such a render is not sent.

**Words only the user writes.** The model writes "ready for review"; "final", "locked", "approved", and "creative PASS" appear only in the ledger as the user's quotes. A passed technical gate is written "technical QA passed", not "done".

**One version scheme.** `<proyek>-r<n>` for full renders and `<adegan>-r<n>` for scenes, counting up for the whole project even when the pipeline changes. Never restart at "v1": a repeated label can point to a different render.

Old revision logs are history (`../SUMBER.md` §Log revisi); `DECISIONS.md` is the only logbook; general lessons go to `steward/inbox/`.

## Revision direction: toward the middle, not the opposite extreme
"Too heavy", "too crowded", "more room", or "bigger" asks for a move toward the middle; jumping to the opposite pole (heavy → pale white with one speck; room → objects shrunk until text is unreadable) swaps one complaint for another. Before handing over:
1. Pick 3-5 representative frames (bright, dark, dense, emptiest). Per frame: `python3 scripts/banding.py <new.png> --sebelum <old.png> [--target <ref.png>]`. Target = reference frame or the picture the user described; without one, write your estimated target numbers and why.
2. The complained-about metric (luma range, sat p95, focus area) moves roughly 30-60 % of the distance to target (the "tutup" column). More than ~60 % suggests overcorrection; less than ~30 % is barely noticeable.
3. Unmentioned metrics do not get worse: readability and text size on a 360 px phone, focus area (not below ~12 % without a text band, F3), saturation, and F1 must not trigger. Small text caused by shrinking an object is a fail.
4. Record before/after numbers per frame in `DECISIONS.md`, in Indonesian (ukuran, lama → baru, % tutup). A whole storyboard without a reference: `banding.py --seri <folder>`, sparse frames ≤ 10 %.

## After revision, still in force
NEGATIF and the iron law of `SKILL.md` apply to every changed part: inspect changed frames at full resolution (`scripts/lihat.py`) before handing them over.
