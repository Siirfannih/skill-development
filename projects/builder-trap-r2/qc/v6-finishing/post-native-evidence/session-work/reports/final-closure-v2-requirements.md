# Final closure v2 — prepared, not executed

Script: `work/build_final_closure_v2.py`
SHA256: `f8292650f53315447a1f5a8356eb04f2fd5f2a8b724e57cbf34bd7a9b86af97b`
V1 remains unchanged, SHA256 `3c66c61f10269a68e26117ac0cf114b4be43602a8a45bacb4f7a82ab60803ee8`.

AST syntax validation and12 bounded function checks passed. The validator rederived all302 failures from the archived fixed-tool2493 rows and rejected altered metrics/failures/criteria, duplicate or unknown frame indexes, omitted neighbor coverage, omitted summary failures, missing actual image reads and wrong leaf hashes. Existing Gemini batch1 coverage and a frozen-tool terminal-quantization control also passed. Closure main has never executed and no acceptance was issued. Results: work/reports/final-closure-v2-helper-checks.json; reproducible checks: work/check_closure_v2_helpers.py. Missing or contradictory inputs raise an error before writing. On success only, it creates `Q/final-export-closure-v2.json` using exclusive creation. Existing closure, frozen source, gates, criteria, readiness, SHIP, and evidence are never written.

## Acceptance contract

The v1 source409, final SHA, frozen identity, codec/audio/seam, runrecord/log, nine contiguous chunks, sidecar and receipt checks are retained. V2 adds independent evidence consistency checks; it does not re-render, decode, listen, or generate a fresh visual judgment.

Current comparator must match the pinned tool and the pre-final `work/reports/final-correspondence-criteria-v2.json`. All2493 indexed rows are checked against the fixed thresholds; row failure arrays, adjacent-neighbor flags, failed-frame summary and pass boolean must agree. Every current failed frame must already belong to the old302 set, excluding repaired1083. A new/unrepaired flag yields HOLD rather than expanding the disposition automatically. Actual raw numeric pass/failure count is preserved in the output.

Historical evidence is bound to archived final9b10 and old comparator366759: exact52-entry archive, native2493 inventory,407 reference hashes,28 paired sheets,21 full pairs, INFO, complete ChatGPT frame/image/flag bindings, and all4 Gemini raw reads/input manifests/text plus normalized exact coverage. Existing raw reports are retained, including their original false completeness fields and genuine1083 issue. The helper independently validates normalization against exact expected basenames or exact absolute paths. Historical decode replay must account for all2493 identical JPEG hashes, exit0 and empty log. Corrected source reveal note is bound; original incorrect percentages are not adopted as new claims.

The same-resolution bridge must identify old/new final SHA and verification receipts, use unchanged criteria/tool, compare all2493 rows, and fail only at deliberate repair1083. All2492 other frames must pass. Corrected native capture1083 must pass; the old missing-caption frame must fail as a negative control. Exactly eight other chunk dictionaries/hashes remain identical; the900–1199 chunk must change. The capture and bridge creator are pinned.

New second-native manifest must bind the current final SHA, final verification and source. Its actual command selects1082–1084, keeps frame rate passthrough, emits exactly three indexed PNGs; exit0/empty stderr and before/after input SHA are required. Actual PNG headers must be1920×1080. Both reviewer wrappers must bind this manifest/candidate, open precisely1082,1083,1084, report all inspected/pass with no issues, and have nonempty scope. Gemini additionally requires exact INFO+three-image tool-read coverage, immutable inputs, no forbidden tools, a response confirming handwriting continuity, and bound raw stream/stderr.

## Lead disposition fields

Path: `Q/final-visual-disposition-additive.json`.

- `authority: "lead"`
- `status: "ACCEPTED_PROJECT_VISUAL_SCOPE"`
- `candidate_sha256`: current final SHA.
- `comparator_sha256`: current raw comparator SHA.
- `comparator_tool_sha256`: dd1c6f2f94e84204b2958f12f3cb1564dd7818517294d9836adb6915a7a7d6c6.
- `raw_numeric_correspondence_pass`: actual comparator boolean, expected false; never rewrite its result.
- `pixel_equivalence_claimed: false`
- `global_render_cause: "unproven"`
- `failed_frames`: exact sorted current comparator failure list.
- `frame_dispositions`: one entry for each failed frame in the same order, with `frame`, `disposition: "accepted_visual_scope"`, `historical_frame` equal to `frame`, and a nonempty factual `reason`.
- `unresolved_frames: []`
- `limits`: nonempty honest caveats.
- `proof_bindings`: absolute path→SHA256 map covering at least all evidence roots below. Additional existing evidence is allowed and checked.

Required evidence roots (paths relative to their named base here; actual JSON must use absolute paths):

1. `Q/preserved/final-native-attempt-9b10-1794837148283348405/ATTEMPT.json`.
2. Session `work/final-native-qa/pairs-manifest.json`.
3. Same folder `chatgpt-review.json`.
4. Same folder `gemini-coverage-normalized.json`.
5. Same folder `native-decode-provenance.json`.
6. Same folder `repair1083/REVEAL-CORRECTION.md`.
7. Same folder `rerender-same-resolution-correspondence.json`.
8. Same folder `second-native/manifest.json`.
9. Same folder `second-native/chatgpt-review.json`.
10. Same folder `second-native/gemini-review.json`.
11. Session `work/reports/final-correspondence-criteria-v2.json`.
12. `Q/final-all-frame-correspondence-additive.json`.
13. `Q/final-verification.json`.
14. `Q/final-all-frame-scan.json`.

The helper includes transitive evidence image/log hashes in its output; the lead disposition need not repeat every individual leaf. All leaves and frozen identities are rehashed before output creation, plus the final video SHA.

## Output semantics

Status is `ACCEPTED_PROJECT_FINAL_EXPORT_WITH_SCOPED_VISUAL_DISPOSITION`. Separate `visual_acceptance` records raw correspondence boolean, actual failed-frame list/count, historical302failures/407reviewed frames,2492same-resolution checks,1083repair, and no pixel-equivalence claim. Canonical/audio-order FAIL remain unchanged. Reasons for render-scale variation are not inferred globally. Human/model visual-review declarations remain review evidence, not a mathematical proof of pixel identity or a physical phone/audio test.

Run only after all actual proofs and the explicit lead disposition exist:

```bash
python3 /home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/build_final_closure_v2.py
```
