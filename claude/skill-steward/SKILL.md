---
name: skill-steward
description: "Use when changing the skill-development repo itself: adding, changing, deleting, cleaning up, translating or auditing a skill, rule, reference, guide lesson, cookbook card, preset entry, AGENTS.md or PETA route, or turning a correction into a lasting lesson. Triggers include 'tambah aturan', 'hapus aturan', 'ubah skill', 'rapikan skill-development', 'bersihkan repo', 'terjemahkan ke Inggris'. Not for producing a video or a design."
---

# Skill Steward

## 1. Purpose

skill-development exists so that any model, starting with no idea how I want videos edited, produces work that is accurate to my brief and taste, and spends as few tokens as possible getting there. This skill keeps it that way: every change should make the repo **better at that job and lighter to load**.

Rules are tools, not the goal. A rule earns its place only if a model without it would get something wrong that matters. Prefer one clear principle that a model can apply with judgment over a long procedure it has to obey. When following a rule would clearly make the result worse, say so and do the better thing.

This skill works with **one model and no helpers**. Subagents, a second model, scheduled runs and scripts make the work faster or more reliable when they are available; nothing here depends on them.

## 2. When you are here

- **I ask you for a change** (in any tool). Do what I ask. Never refuse it because a repo rule says otherwise. Use §3 to place it well and keep the repo consistent. If it conflicts with something, tell me in one sentence and resolve it in the same change.
- **Maintenance run**: you were asked, or scheduled, to improve or clean the repo. Work from `steward/backlog.md` and `steward/inbox/`, smallest useful change first.
- **During production** (video, design, script) you notice a lesson. Do not stop production to edit the skills. Write the project-specific decision in `projects/<project>/DECISIONS.md`. If it looks general, add a short note to `steward/inbox/` (what happened, evidence, suggested lesson). Production comes first.

Instruction files are what an agent reads to decide what to do: `AGENTS.md`, `CLAUDE.md`, `PETA.md`, everything under `claude/`, cards, preset registries and templates. Repo state for this skill lives in `steward/`.

## 3. How to change the repo

Scale the effort to the change. A typo needs a commit. A new rule needs thought.

1. **Know the problem.** What went wrong (or what I asked for), with evidence: file and line, a frame, or my words. An idea without evidence goes to `steward/backlog.md` as an idea, not into the skills.
2. **Find what already exists.** Search the repo for instructions on the same subject, in Indonesian and English (`references/glossary.md` has term pairs). Most problems are fixed by editing, merging or deleting an existing instruction, not by adding one.
3. **Choose the home.** Project taste goes in that project. A judgment lesson goes in the owning skill's guidance. A measurable must-never goes in a check script plus one line in the skill's `## Hard rules`. Details: `references/placement.md`.
4. **Write it lean.** One instruction, its reason in one sentence, and how to tell it was followed. Replace the old wording instead of adding beside it. Delete what no longer helps. Style: `references/writing.md`.
5. **Check it.** Always run `scripts/steward_check.py` and the tests of the skill you touched. If the change is meant to change behavior, check that it does: run the failing case again with and without it, using a subagent if you have one, or by doing the task yourself from a fresh read of only the files that task would open. If neither is possible, say the change is untested. See `references/testing.md`.
6. **Approve and record.** See §4. Regenerate generated files (`python3 tools/peta.py`; after card changes `python3 tools/cookbook.py index`). The commit message says what changed for agents and which model made it.

## 4. What needs my yes

| Change | What you do |
|---|---|
| **Mechanical**: no behavior change (broken links, regenerated indexes, formatting, moving text with a pointer, deleting an exact duplicate, a translation checked as equal, except core files) | Do it. List it in your summary to me. |
| **Behavior**: changes what an agent does (add, change or delete a rule, lesson, card or preset; resolve a conflict; archive files agents read) | Write a short change report in Indonesian (problem, change, evidence, check result, impact) to `steward/changes/<slug>.md`, show me, and apply it after my yes. If I asked for it directly, my request is the yes. |
| **Risky**: authority order, NEGATIF absolute items, deleting a whole skill, install/sync/doctor scripts, hooks, CI, anything with credentials, accounts or paid services | Ask me explicitly every time. |

Small operational steps (installing a dev tool on a branch, running tests) need no approval. Never write credentials anywhere in the repo, a report or a log.

## 5. Principles

These came from real failures in this repo. Apply them with judgment.

- **Keep it lean.** Before adding, try deleting or merging. Every line an agent reads costs tokens and attention. A rule that changes nothing when removed should be removed.
- **One concept, one name, one home.** Link to the home instead of copying it. A copy is acceptable only when a script generates it. Unguarded copies drift until they contradict each other.
- **Active or archived, never both.** Archived files live under `archive/`, and agents do not load them. Before archiving, move anything still in use and update the references in the same change.
- **Checks over prose for must-nevers.** If a mistake is measurable, a script catches it more reliably than a sentence does. Do not grow fixed lists (NEGATIF stays at 10 items).
- **Principles over scripts of behavior.** Describe the goal and the reason, so a model can handle cases the rule did not foresee. Reserve mandatory steps for things that break silently when skipped.
- **No names, dates or stories in instructions.** They make one incident look like law. Provenance goes in the skill's `SUMBER.md`.
- **Say when to read.** Every pointer says when to open the file. Mandatory reads at session start must stay small.
- **Works anywhere.** Nothing a production session needs may depend on a specific second model, account, machine or paid tool. Put such things behind "if available".
- **Language.** New instruction files are in English. A small edit to an Indonesian file stays Indonesian. What I read (reports, questions, `DECISIONS.md`) stays Indonesian. Translating existing files: `references/migration.md`.
- **Delegating.** If you hand repo work to a subagent, write a self-contained brief (the `brief-gate` skill shows how).

## 6. References (open only when needed)

| File | Open when |
|---|---|
| `references/placement.md` | unsure where a change belongs, promoting a lesson to a general rule, or archiving/retiring files |
| `references/writing.md` | writing or rewriting instruction text, a description or a card |
| `references/testing.md` | checking that a behavior change works, a translation is equal, or saving an eval case |
| `references/conflicts.md` | two instructions disagree |
| `references/migration.md` | translating an existing file to English |
| `references/glossary.md` | naming a concept or translating a term |
| `references/maintenance.md` | doing a maintenance run, or writing an inbox note or change report |
| `references/attribution.md` | adapting text from an upstream skill repository |
