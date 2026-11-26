# Glossary Proposals (terms recurring in `claude/**` not yet in `glossary.md`)

Proposed English terms kept consistent across Batch 01 and ready to be reviewed for `claude/skill-steward/references/glossary.md`. That glossary file does not exist on this branch (it lives in the skill-steward package), so the decided entries are recorded here and copied into it when the package lands. Decisions follow `EQ-group3.md` Part B: 15 accepted, 3 changed, 1 rejected.

| Indonesian | Proposed English | Meaning (one line) | Files | Decision |
|---|---|---|---|---|
| babak | act | Major narrative division of a video (problem, turning point, solution, CTA). Also covers *bab* in "transisi bab" (act transition). Write "act", not "story act" | `references/decision.md`, `references/slop-catalog.md`, `claude/_bersama/NEGATIF.md` | accept |
| engsel senyap | silent hinge | Brief silent audio pause marking a transition between acts or visual families | `references/decision.md`, `references/audio.md` | accept |
| frame jarang | sparse frame | Frame with focus area < ~12% and no text edge band, reading as empty | `references/revisi.md`, `references/slop-catalog.md` | accept |
| koreksi berlebihan | overcorrection | Answering feedback with its opposite pole; measured as the complained metric moving > ~60% of the distance to target, or another metric worsening | `references/revisi.md`, `references/slop-catalog.md` | accept (meaning reworded: concept first, then the measure) |
| uji juling | squint test | Visual hierarchy check done squinted/blurred to verify dominant focus | `references/slop-catalog.md`, `claude/vibedesign/DESIGN-CORE.md` | accept |
| uji dibaca keras | read-aloud test | Reading VO copy aloud in one breath to check natural cadence and register | `references/copywriting.md` | change (Indonesian key corrected from "uji baca keras", which occurs nowhere; source term is "uji dibaca keras", `copywriting.md:33`) |
| tahan dengan drift | hold with drift | Sustained hold with 1–3% slow scale or orbit so the frame stays alive | `references/motion-mechanics.md`, `references/kamera-gerak.md` | accept |
| lembar sanding | side-by-side sheet | Composite image placing a candidate still next to its north-star/reference frame; a production QC aid, not a pass/fail method for primitives (the deconstructor bans reference-left/candidate-right judging) | `claude/motion-graphic/SKILL.md`, `scripts/juri/sandingkan.py` | accept (meaning extended) |
| sup material | material soup | Mixing multiple unsystematic shadow, light, sheen, or glass blur styles in one video | `references/slop-catalog.md`, `claude/_bersama/NEGATIF.md` | accept |
| gradien ragu-ragu | indecisive gradient | Low-luma-range (< ±35) radial/blob colour wash with saturation p95 < 0.15 and no crisp tonal zones | `references/slop-catalog.md`, `claude/_bersama/NEGATIF.md` | accept (saturation threshold added to meaning) |
| warna nyasar | stray colour | Rendered colour cluster ≥ 0.5% area with ΔE2000 > 12 outside the active palette. The machine marker `warna-nyasar` (cek-warna.mjs `jenis`) stays | `references/warna.md`, `scripts/warna/cek-warna.mjs` | accept |
| warna nanggung | muddy colour | Rendered region ≥ 3% in OKLCH chroma 0.03–0.08 and lightness 0.45–0.75 outside palette. The machine marker `warna-nanggung` stays | `references/warna.md`, `scripts/warna/cek-warna.mjs` | accept |
| ekor kata | word tail | Trailing phoneme energy decay (40–150 ms) at the end of a spoken audio cut | `references/audio.md`, `scripts/audio/vo_echo.py`, `scripts/audio/recut.py` | accept |
| lane | lane | Active business or ops workstream (Behindwork, Jadisatu, Tuntunly, Siirfan) | `claude/script-workshop/guide/produk/PEMBANDING.md`, `ops-report` | accept |
| pintu | entry point | Canonical opening document/skill an agent loads first for a session type; covers both "pintu masuk" and "satu pintu cek NEGATIF" | `AGENTS.md`, `PETA.md`, `claude/motion-graphic/SKILL.md` | change (entry door → entry point; "entry door" is not idiomatic) |
| kerangka | skeleton | Copyable empty document/folder structure filled per project | `templates/roles/handoff.md`, `scripts/ref_spec.py` | change (scaffold → skeleton, to match the code flag `board.py --skeleton` and "kerangka tersisa → FAIL") |
| serah terima | handoff | Structured Director-to-builder task, report, and review exchange; also the folder name `handoff/` | `templates/roles/handoff.md`, `references/roles.md` | accept |
| oklusi | occlusion | Foreground layer covering text or a key subject | `references/warna.md`, `claude/motion-graphic/pabrik/` | reject (plain technical word with no project-specific meaning) |
| peta potong | cut map | `CUT-MAP` mapping source timestamps to output timeline cuts; the marker `CUT-MAP` stays | `templates/cut-sheet.md`, `references/selects-editor.md` | accept |

Missing proposals noted by the review, not yet decided: `tanda` → sign (slop sign, 60 catalog rows) and `kata yatim` → orphan word. The word "card" now covers both the cookbook `kartu` and a UI/visual card (S-V4, S-V10); a qualifier ("UI card") would help.

Follow-ups: the `templates/roles/handoff.md` title now says "folder skeleton" (86553df6); `references/roles.md` (Indonesian) defines the review status values `LOLOS/BUANG`, which `handoff.md` keeps as `LOLOS (keep)` / `BUANG (drop)`; use the same pairing when roles.md and eval `mg-051` are translated.
