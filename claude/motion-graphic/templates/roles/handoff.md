# `handoff/` folder scaffold

Copy the needed sections to `projects/<project>/handoff/`. Usage rules: `references/roles.md` §4–5.

## BRIEF.md (Director)
```
# Brief <name> · v<N> · <date>
## Owner's brief (verbatim)
> …
## Locked
- Goal · audience · duration · ratio/fps · CTA
- Style: templates/gaya/<style> (changed tokens: …)
- Sources: footage <path>, script/transcript <path>
## Relevant Floor items
- A5 text from speech · E24 SFX per object · A4 max 2 lines · …
## Assets + licenses
| file | source | license |
## Not allowed
- …
```

## PLAN.json (Director)
`templates/storyboard/beats.json` format plus per beat:
```
{"id":"B03","t":[12.4,15.9],"vo":"…","peran":"explains","adegan":"MP-03","opsi":"A",
 "layar":["San Diego"],"aksi":"…","kamera":"…","keluar":"…",
 "sfx":[{"t":12.4,"peran":"text click","alasan":"word appears"}],
 "lulus_bila":["text ≥ reading time Floor A8","texture follows layer"]}
```

## TASK-rN.md (Director)
```
# TASK r<N> · <one-sentence goal>
Scope: B01–B05 (do not touch other beats)
Allowed to read: templates/gaya/<style>/STYLE.md · references/build.md · <engine>
Required outputs: still per beat (sheet) · silent render <path> · gate outputs: <list>
Fix: F-r<N-1>-02 (B03: graphic text vanishes before sentence ends → hold until 0:06.0)
Do not change: B01, B02 (locked)
Done when: <measurable criteria>
```

## REPORT-rN.md (Builder)
```
# REPORT r<N>
| Beat | Worked on | Evidence (still/render path) | Numbers/gate | Deviated from TASK? reason |
Gate: <verbatim script output>
Open questions: QUESTIONS.md #…
```

## REVIEW-rN.md (Director)
Written after viewing the still/render **before** reading REPORT.
```
| ID | Beat | Finding | Evidence (tc/frame) | Measurable criterion | Devil's advocate | Status |
| F-r<N>-01 | B03 | … | 0:13.2 | … | violates PLAN lulus_bila #1 | KEEP (LOLOS) → TASK r<N+1> |
| F-r<N>-02 | B04 | … | … | … | taste, not in BRIEF | DROP (BUANG) |
```

## QUESTIONS.md (Builder) and DECISIONS.md (Director)
One line per item: `Q-03 · B04 · question · options` → answer from the Director or the owner + source.
