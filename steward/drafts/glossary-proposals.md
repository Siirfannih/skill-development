# Glossary Proposals (terms recurring in `claude/**` not yet in `glossary.md`)

Proposed English terms kept consistent across Batch 01 and ready to be reviewed for `claude/skill-steward/references/glossary.md`.

| Indonesian | Proposed English | Meaning (one line) | Files |
|---|---|---|---|
| babak | act (story act) | Major narrative division of a video (problem, turning point, solution, CTA) | `references/decision.md`, `references/slop-catalog.md`, `claude/_bersama/NEGATIF.md` |
| engsel senyap | silent hinge | Brief silent audio pause marking a transition between acts or visual families | `references/decision.md`, `references/audio.md` |
| frame jarang | sparse frame | Frame with focus area < ~12% and no text edge band, reading as empty | `references/revisi.md`, `references/slop-catalog.md` |
| koreksi berlebihan | overcorrection | Revision shifting > ~60% of the distance to target or degrading other metrics | `references/revisi.md`, `references/slop-catalog.md` |
| uji juling | squint test | Visual hierarchy check done squinted/blurred to verify dominant focus | `references/slop-catalog.md`, `claude/vibedesign/DESIGN-CORE.md` |
| uji baca keras | read-aloud test | Reading VO copy aloud in one breath to check natural cadence and register | `references/copywriting.md` |
| tahan dengan drift | hold with drift | Sustained hold with 1–3% slow scale or orbit so the frame stays alive | `references/motion-mechanics.md`, `references/kamera-gerak.md` |
| lembar sanding | side-by-side sheet | Composite image placing a candidate still next to its north-star/reference frame | `claude/motion-graphic/SKILL.md`, `scripts/juri/sandingkan.py` |
| sup material | material soup | Mixing multiple unsystematic shadow, light, sheen, or glass blur styles in one video | `references/slop-catalog.md`, `claude/_bersama/NEGATIF.md` |
| gradien ragu-ragu | indecisive gradient | Low-luma-range (< ±35) radial/blob colour wash without crisp tonal zones | `references/slop-catalog.md`, `claude/_bersama/NEGATIF.md` |
| warna nyasar | stray colour | Rendered colour cluster ≥ 0.5% area with ΔE2000 > 12 outside the active palette | `references/warna.md`, `scripts/warna/cek-warna.mjs` |
| warna nanggung | muddy colour | Rendered region ≥ 3% in OKLCH chroma 0.03–0.08 and lightness 0.45–0.75 outside palette | `references/warna.md`, `scripts/warna/cek-warna.mjs` |
| ekor kata | word tail | Trailing phoneme energy decay (40–150 ms) at the end of a spoken audio cut | `references/audio.md`, `scripts/audio/vo_echo.py`, `scripts/audio/recut.py` |
| lane | lane | Active business or ops workstream (Behindwork, Jadisatu, Tuntunly, Siirfan) | `claude/script-workshop/guide/produk/PEMBANDING.md`, `ops-report` |
| pintu | entry door | Canonical opening document/skill an agent loads first for a session type | `AGENTS.md`, `PETA.md`, `claude/motion-graphic/SKILL.md` |
| kerangka | scaffold | Copyable empty document/folder structure filled per project | `templates/roles/handoff.md`, `scripts/ref_spec.py` |
| serah terima | handoff | Structured Director-to-builder task, report, and review exchange | `templates/roles/handoff.md`, `references/roles.md` |
| oklusi | occlusion | Foreground layer covering text or a key subject | `references/warna.md`, `claude/motion-graphic/pabrik/` |
| peta potong | cut map | `CUT-MAP` mapping source timestamps to output timeline cuts | `templates/cut-sheet.md`, `references/selects-editor.md` |
