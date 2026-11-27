# Migration ledger

Repo state, not an instruction file: translation status of each instruction file. Rules and statuses are in `claude/skill-steward/references/migration.md` §2.

| File | Status | Commit | Dependants updated |
|---|---|---|---|
| `claude/script-workshop/guide/produk/PEMBANDING.md` | en | 1912363e | dependants: none (verified) |
| `claude/script-workshop/guide/produk/FAKTA.md` | en | c4c22576 | dependants: none (verified) |
| `claude/cinedance-block-library/PROMPT-BLOCKING.md` | en | 589ff8ab | dependants: none (verified) |
| `claude/jadisatu-canvas/references/clients.md` | en | e0681bd0 | dependants: none (verified) |
| `claude/motion-graphic/templates/cut-sheet.md` | en | b902aea2 | dependants: PETA.md (regenerated at merge) |
| `claude/motion-graphic/templates/roles/handoff.md` | en | 86553df6 | dependants: PETA.md (regenerated at merge) |
| `claude/motion-graphic/references/kamera-gerak.md` | en | 6ca78608 | dependants: PETA.md (regenerated at merge); size test `test_migrasi_lantai.py:80-81` (≤ 15 KB, passes) |
| `claude/motion-graphic/references/hybrid-motion-standard.md` | en | 599d43c3 | dependants: PETA.md (regenerated at merge) |
| `claude/motion-graphic/references/warna.md` | en | 0abe9258 | dependants: PETA.md (regenerated at merge) |
| `claude/motion-graphic/references/efek-3d.md` | en | ce76dae7 | dependants: PETA.md (regenerated at merge) |
| `claude/motion-graphic/references/revisi.md` | en | 3738fcc3 | dependants: PETA.md (regenerated at merge); size test `test_migrasi_lantai.py:80-81` (≤ 15 KB, passes) |
| `claude/motion-graphic/references/decision.md` | en | 0cd8b63a | dependants: PETA.md (regenerated at merge) |
| `claude/motion-graphic/references/copywriting.md` | en | 299e17c5 | dependants: PETA.md (regenerated at merge) |
| `claude/motion-graphic/references/motion-mechanics.md` | en | f6324c97 | dependants: PETA.md (regenerated at merge) |
| `claude/motion-graphic/references/slop-catalog.md` | en | 91575b60 | dependants: PETA.md (regenerated at merge) |
| `claude/brief-gate/SKILL.md` | en | 06720409 | dependants: none (verified) |
| `claude/video-reference-deconstructor/SKILL.md` | en | 0f156c2b | dependants: none (verified) |


Not in the table: `claude/motion-graphic/templates/roles/konsul.md` was translated in batch 01 (c1232215, b218bbe4) and then archived with the Codex lane (5167b473, now `archive/riwayat/claude/motion-graphic/templates/roles/konsul.md`); archived files get no row. Instruction files not listed are still Indonesian (`id`) and get a row when their translation starts.
