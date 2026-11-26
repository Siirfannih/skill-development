# Migrating existing files to English

Open when translating an existing Indonesian instruction file. A translation changes the language only; what agents do stays identical.

## 1. Rules

1. **Glossary first**: every term is in `references/glossary.md` before you translate; add missing ones in a separate commit.
2. **A translation never changes a rule.** A wrong or conflicting rule is translated faithfully and fixed in its own change (add it to the backlog); mixing the two makes the equivalence check meaningless.
3. **One whole file at a time**, replacing the Indonesian at the same path. No half-translated file and no parallel copies, which drift until they disagree.
4. **IDs, file names, paths and machine strings stay** (`TKS-04`, `guide/teks/`, frontmatter keys, `<!-- … -->` markers, JSON keys, `[mutlak]`). Headings and labels are translated, so their dependants move with them.
5. **Update dependants in the same commit.** Grep the file name followed by `§`, its section names, and each distinctive heading or label in `tools/` and `claude/*/scripts/`. Known readers: `tools/peta.py`, `tools/cookbook.py`, `tools/sync_negatif.py`, `claude/motion-graphic/scripts/juri/resep_check.py`, `claude/motion-graphic/scripts/juri/tahap.py`. A script edit only swaps literal strings and its tests still pass; anything more is a separate Behavior change.
6. **Guarded copies move together.** NEGATIF: translate `claude/_bersama/NEGATIF.md`, then `python3 tools/sync_negatif.py --tulis`. PETA.md: translate the route text in `tools/peta.py` and regenerate; never hand-edit PETA.md.
7. **Owner-facing text stays Indonesian:** DECISIONS.md, change reports, inbox questions, on-screen text. Inside an instruction file, keep Indonesian only where the language itself is the point:
   - Indonesian output samples whose wording is what the rule is about: a cliché or rhythm the rule bans or praises, real product copy such as a live tagline. Add an English gloss once;
   - literal values that a script matches (for example `Aktif` in `tools/tanya-claude.sh`). Keep them in backticks, or make the script accept both languages in a separate Behavior change.
   Everything else is illustration and is translated for meaning, including examples of how I phrase feedback or a brief. Models interpret meaning; these are examples, not fixed vocabulary. A translation never adds an example or a banned word that the source did not have.
8. **Verify**: equivalence (`references/testing.md` §4), `python3 tools/peta.py` run, structural checks green; results in the commit message or change report.
9. **Skip files about to change** (SARINGAN.md, PENDING.md, EVALS-DESIGN.md, motion-graphic's LANTAI.md and MOTION-CORE.md, anything a backlog item will rewrite): settle the item first.

## 2. Ledger

`steward/migration-ledger.md` has one row per instruction file (SKILL.md §2): `| File | Status | Commit | Dependants updated |`, status `id`, `in-progress` (a draft in `steward/drafts/` has not replaced the file yet) or `en`. New files are born English and enter as `en`. A commit cannot hold its own hash, so fill that cell in the next one. Migration % = `en` rows ÷ all rows.

## 3. Order

1. Files nothing references and no script reads (leaf references, templates).
2. Then by rising number of files that reference them.
3. Then files a script reads, with that script's string updates.
4. Last, the core files every session reads: `AGENTS.md`, PETA (through `tools/peta.py`), NEGATIF, `claude/motion-graphic/SKILL.md`. A slip there reaches everyone, so each is a Behavior change applied after my yes, with the equivalence result in its report. The authority order and NEGATIF [mutlak] items are Risky.
