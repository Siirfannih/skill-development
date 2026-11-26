# Checking a change

Open when checking that a change works or a translation is equal, and before claiming either. `scripts/` is inside this skill; other paths are from the repo root.

## 1. Which checks

Every change gets the structural checks (§2). A rule, lesson, card, preset status, check or threshold also gets a behavior check (§3); a description a trigger check (§5); a translation an equivalence check (§4). A broken reference, regenerated index or verbatim move needs nothing more.

## 2. Structural

1. `python3 scripts/steward_check.py <repo-root>` (exit 0 clean, 1 errors, 2 warnings with `--strict`). A change adds no finding in the files it touches: compare `--files <touched>` with those files before the change.
2. The unit tests of each touched skill, if any: `python3 -m unittest discover -s claude/<skill>/scripts/tests`. They assert instruction wording, so a rule edit can break them while `steward_check.py` stays green.
3. `python3 tools/peta.py --check` when a file is added, moved, renamed, archived or deleted.

If you touch what a repo check reads (NEGATIF, LANTAI IDs, SUMBER files, cards), run it too; where `tools/doctor.sh` cannot run, run its parts: `python3 tools/sync_negatif.py --check`, `python3 tools/sync_lantai.py --check`, `python3 tools/sumber_cek.py`, `python3 tools/cookbook.py cek`. A check failing before your change is reported as such and fixed separately.

## 3. Behavior check

Does an agent now do the intended thing, and did it not before? A change with no visible difference is a no-op.

1. **Scenario**: the task an agent really faced, with the files it would open and my request as written. It lives in the change report's folder.
2. **Before and after**: run it on the old text and on the new, each with a fresh subagent if you have one (briefed with `brief-gate`). Alone, read only the files the scenario would open (old text via `git show HEAD:<path>`) and write down what you would do before reading on. Label this a self-check: it is weaker evidence, because you know the change.
3. **Pass** = the intended difference appears and nothing that passed now fails. "Looks better" is not a pass.
4. **Already right before**: the change is not needed; record it under "Decided" in the backlog. If I asked for it, apply it anyway and tell me in one sentence.
5. **A rule skipped under pressure**: test with a scenario where the agent must act (options A/B/C, no "ask first") under several pressures at once (deadline, sunk cost, my authority, credits); add each new excuse and its answer to the rule until it holds.
6. **Wording-sensitive changes** (a description, an always-loaded line): three runs per variant; one run can mislead.
7. **Taste outputs** are judged side by side by eye and by the skill's judge. Saved eval cases (`evals/`) are rerun; breaking a passing case rejects the change.

## 4. Translation equivalence

List every item of the original (instruction, condition, number, threshold, exception, pointer, ID) and mark it in the translation as same, shifted, missing or added. Someone other than the translator does this best, when available; alone, do it in a fresh pass that reads only the two files and label it a self-check. Any shift, loss or addition: fix and rerun. A passing translation is Mechanical, except the core files in `references/migration.md` §3. Then confirm every heading and string that another file or script matches still resolves.

## 5. Trigger check for descriptions

Three to five prompts that should open the skill and three to five near-misses sharing its words, phrased as I type (short, mixed languages, substantive tasks). Run each in a fresh session or subagent; alone, judge each against all installed skills' descriptions and label it a self-check. Any miss: revise and rerun the set.

## 6. Evidence before "done"

- Run the command that proves it now and quote its output and exit code; "should pass" or an earlier run is not evidence.
- A subagent's success report is a claim: check `git diff` and rerun its check.
- Branches and worktrees are optional; if you use one, test on its path and run before-runs on `main`.
- An outside review: check each item against the repo, apply or reject each with a reason, drop rewrites nobody asked for.

## 7. Saved eval cases

A real failure can be kept as a case so a later change is checked against it: `claude/<skill>/evals/cases/<id>.json` with `id`, `source` (where the failure was seen), `prompt` (realistic), `files` and two to five checkable `assertions` (for example "emphasis uses accent colour or scale, not a box behind the word"). Rerun a case when the rule it protects changes; a change that breaks a passing case is rejected, or the case is removed with a written reason. Whoever grades it reads only the transcript and the output and marks each assertion pass or fail with evidence: a fresh subagent if you have one, otherwise a self-check.

Trigger evals (`evals/trigger.json`, about 20 prompts, half that should open the skill and half that should not) check a description; `skill-creator`'s `run_loop.py` and `improve_description.py` run them when installed. There is no schedule: run cases when their rule changes.
