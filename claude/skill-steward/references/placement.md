# Placement: where a change lives

Open when unsure where a change belongs, or when archiving or retiring files. `scripts/` and `references/` are inside this skill; other paths are from the repo root.

## 1. Classes

| Class | Test | Home |
|---|---|---|
| Project taste | right here, could be wrong in another style (position, colour, pacing, one session's way of working) | `projects/<project>/DECISIONS.md` |
| Judgment lesson | wrong in any style, needs weighing context | one ID'd item in "How to decide" of the owning skill's `guide/<domain>/GUIDE.md` |
| Hard law | wrong in any style and measurable pass/fail | a check in the owning skill's scripts plus one line in its `## Hard rules` |
| Mechanical | a fixed pattern: location, format, frontmatter, size, stale reference, sync | a check, not prose: `scripts/steward_check.py`, a `tools/` script, or the skill's own script |
| Structure | how instructions are changed, placed, tested, translated; routes; indexes | this skill or `steward/`; routes in `tools/peta.py`; AGENTS.md only as §5 allows |

How to tell:
- Between two classes, take the lower (taste, then lesson, then law). Style-dependent numbers (ease, type size, zoom) are taste: right in one style, a defect in the next.
- Rewrite the candidate without project nouns (objects become roles). If it stops being true, it is taste.
- My correction that is wrong in any style is enough evidence for a lesson. A lesson an agent inferred itself should be seen more than once, ideally in different projects, before it becomes general: one incident is often one project's taste.
- In non-video skills, "style" is whatever the output may legitimately vary.
- An existing instruction on the subject is the home: edit it in place.
- NEGATIF holds exactly 10 items (`tools/sync_negatif.py` fails otherwise); a new hard law becomes a check.

## 2. IDs

Lessons and hard laws carry `<CODE>-<NN>`; each code belongs to one skill. motion-graphic: TKS, GRK, SFX, AUD, VIS, QC. vibedesign: HRK, TIP, KMP, KRK, PSN, WRN, HND, plus floor items TKS-01, KRK-02. A new code is three capital letters no skill uses (grep `claude/`, then add it here). Take the next unused number; never reuse or renumber an ID, because SUMBER.md and evals cite them. Outside its own skill, qualify an ID (`vibedesign:TKS-01`), since TKS exists in both skills.

## 3. Active and archived

A file is archived when it lives under `archive/` (or `_archive/`, until merged), active anywhere else; a banner does not archive it. Archived files are never routed, installed or cited as rules.

To archive a file (Behavior when agents read it, Risky for a whole skill): grep its name, headings and IDs in the active repo and scripts; rehome each live rule (§1) and drop unused ones; repoint every reference and script that reads it in the same change; `git mv` it to the same path under `archive/`; record the moves in SUMBER.md; verify with `steward_check.py` and `python3 tools/peta.py`. To retire one lesson, delete it in place; its ID and reason go to SUMBER.md.

## 4. The steward folder

| Path | Holds |
|---|---|
| `steward/inbox/` | notes on possible general lessons (`references/maintenance.md` §2) |
| `steward/changes/` | change reports, each with an optional same-named folder for long outputs |
| `steward/backlog.md` | open conflicts and ideas by impact, and a "Decided" section: idea → decision → reason |
| `steward/migration-ledger.md` | translation status per file (`references/migration.md` §2) |
| `steward/drafts/` | work not yet applied, such as translation drafts |

Lessons that wait for my answer live as notes in `steward/inbox/`; the old PENDING.md queue and its questions are archived in `archive/riwayat/`.

## 5. What AGENTS.md may contain

It loads into every session, so it stays ≤ ~2000 tokens and holds only entry content: what the repo is, session start and health check, the route entry into PETA.md, the content authority order, where corrections go, that instruction changes follow skill-steward, and how to push without overwriting others. Everything else lives in the owning skill.

## 6. Promoting a lesson to a general rule

One incident is written only to `projects/<project>/DECISIONS.md`, never straight into a guide, card or hard-rules section. A candidate lesson or law passes these in order and stops at the first miss:
1. A class of failure, not one event: group incidents by failure mechanism. Two different objects can be one class; ten similar complaints can still be one project's taste.
2. No project nouns (names, brands, files, objects, script lines, coordinates): objects become roles.
3. Wrong in any style; otherwise it is taste (§1).
4. Mechanical: it states a number, threshold or way to count. "Smoother" or "tidier" is rejected.
5. A gate exists: a script with its fail condition, or "show frame X and the reason".
6. Not a duplicate: when a similar item exists, edit that item by ID.
7. A hard law also appears in two different projects, does not misfire on frames I already approved, and I approve its wording.

A lesson that passes goes to the home chosen in §1; one that fails stays in the project or waits in `steward/inbox/` for a second case. Change a lesson by ID as a small diff; a bulk rewrite of a guide compresses it and silently drops items.
