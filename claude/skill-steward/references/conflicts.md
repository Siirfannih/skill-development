# Conflicts: resolving disagreeing instructions

Open when two instructions disagree, or when working a conflict from `steward/backlog.md`. Paths starting with `references/` are inside this skill; others are relative to the repo root.

1. **Find every copy** in the active repo (outside `archive/`, `_archive/` and other projects' folders), in both languages (`references/glossary.md`). Generator sources (`RUTE` in `tools/peta.py`), validators, docstrings and unit tests asserting wording count too. Label each `file:line` as drift (same behavior), conflict (different behavior) or stale (points at a missing or archived file).
2. **Find the winner**, stopping at the first that settles it: my explicit instruction now; a "Decided" row in the backlog; provenance in the `SUMBER.md` files and `steward/changes/` (the later decision wins, a line that says it reverses an earlier one wins even where old wording survived, and my words `[I]` outweigh an agent's `[A]`). What active files and tools actually do is evidence for the report, not a decision. If nothing settles it, or the winner touches a Risky area, do not guess: ask in a change report with options A/B(/C), each with its reason and impact on agents, and leave both texts.
3. **Apply.** Edit the winner in its single home; remove each losing copy or make it a pointer that says when to open the home; update tests that assert the losing wording. A loser in a file labelled archived: rehome its live parts first (`references/placement.md` §3).
4. **Check**: the losing wording is gone from active files, structural checks pass, and a Behavior or Risky change shows the winning behavior (`references/testing.md` §3).
5. **Approve and record.** The highest level in the change applies (SKILL.md §4); other work continues while a report waits. Once settled: a "Decided" row naming the winning `file:line`, the removed copies and the deciding provenance; delete the open row; add the provenance line (`references/maintenance.md` §4).

A conflict found during other work gets a backlog row; fix it in passing only if it blocks your change.
