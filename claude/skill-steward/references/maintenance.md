# Maintenance: the run and its formats

Open for a maintenance run, or to write an inbox note, change report, "Decided" row, provenance line or run report. Indonesian labels are owner-facing.

## 1. A maintenance run

Smallest useful change first. Stop when time runs out, but never leave a change half-applied (park it in `steward/drafts/`). A useful order:

1. Get the latest `main`, note others' unmerged work on `claude/`, carry over reports still waiting for me, and run the structural checks (`references/testing.md` §2).
2. Inbox, oldest first, through SKILL.md §3. A repeat of a "Decided" row without new evidence only adds its date there. Delete each note in the change that settles it.
3. One backlog conflict (`references/conflicts.md`) or one migration batch (`references/migration.md` §3).
4. Retro: the latest DECISIONS.md and your own friction this run (§6); each finding becomes a change or an inbox note.
5. Report to me (§5).

## 2. Inbox note

`steward/inbox/<yyyy-mm-dd>-<slug>.md`, one idea per file. A production session writes only this and DECISIONS.md, so production is never interrupted.

```
# <one-line idea>
Origin: [I] owner correction | [A] agent inference
Project: projects/<project>
What happened: <observed, and what should have happened>
Evidence: <file:line, frame or second, output, or my words>
Suggested lesson: <one line; class from references/placement.md §1 if known>
```

## 3. Change report and "Decided" row

A Behavior or Risky change gets one short report in Indonesian, `steward/changes/<yyyy-mm-dd>-<slug>.md`, which is both the approval request and the record:

```
# <judul singkat>
Masalah: <apa yang salah, atau permintaanku>
Perubahan: <apa yang berubah untuk agen; file>
Bukti: <file:baris, frame, atau kata-kataku>
Hasil cek: <cek struktur, tes, uji perilaku; "self-check" atau "belum diuji" bila begitu>
Dampak: <apa yang agen lakukan berbeda; risikonya>
Level: Behavior | Risky
Persetujuan: menunggu | ya, <di mana> | permintaan langsung
```

Long outputs go in a same-named folder; update `Persetujuan` when I answer. A rejected or unneeded idea becomes a "Decided" row in `steward/backlog.md` (idea, decision, reason, date, origin); only new evidence reopens it.

## 4. Provenance line

One line per Behavior or Risky change in the owning skill's `SUMBER.md` (root `SUMBER.md` for repo-wide files), newest last: `- <yyyy-mm-dd> [I|A] <file §section>: <what changed> (<report slug>)`. `[I]` = I decided, `[A]` = an agent did. Conflicts are settled by these dates and marks (`references/conflicts.md`), so a missing line makes a later conflict undecidable.

## 5. Run report

One message in Indonesian:

```
# Laporan perawatan <yyyy-mm-dd>
## Perlu keputusan
<per laporan perubahan, termasuk yang belum dijawab: masalah, perubahan, dampak, satu pertanyaan ya/tidak>
## Sudah dikerjakan
<satu baris per perubahan Mechanical>
## Catatan
<angka yang memburuk, bila diukur, dengan satu kalimat sebabnya>
```

Optional numbers, when cheap: `steward_check.py --summary` counts, open backlog rows, inbox notes, migration %, corrections per video, preset reuse in the latest project (a falling share means agents rebuild instead of reuse).

## 6. Retro categories

Look for slow navigation (sharper pointer or route), errors a script could catch (build the check), defects the judge or Devil's Advocate missed (clarify one judging item), always-loaded growth (move behind a pointer), expensive reads (narrower route), instructions that changed nothing (delete), a question I was asked twice (its answer belongs in the skill), a branch always or never opened (move it into or out of the entry file), and information out of reach (request access or add a pointer).

## 7. Working alongside others

Pull before you start and before you push; never force-push over someone else's work. If someone changed the same file, keep their version, reapply yours on top and rerun the checks; if that alters a diff I approved, show me again. My own commits stand: reconcile a conflicting rule later or record the conflict for me. Merge two notes on the same subject before working them.
