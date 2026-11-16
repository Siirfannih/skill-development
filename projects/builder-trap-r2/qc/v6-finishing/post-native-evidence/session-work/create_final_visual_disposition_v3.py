#!/usr/bin/env python3
"""Record bounded acceptance after explicit one-frame repair and actual final review."""
import hashlib
import json
from pathlib import Path
import time

SESSION = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery')
BASE = SESSION / 'work/final-native-qa'
P = Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2')
Q = P / 'qc/v6-finishing'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read(path):
    return json.loads(path.read_text())


def main():
    final = P / 'out/builder-trap-r2_v6.mp4'
    digest = sha(final)
    current = read(Q / 'final-all-frame-correspondence-additive.json')
    historical = read(BASE / 'chatgpt-review.json')
    repair = read(Q / 'single-frame-repair.json')
    first = Path(read(BASE / 'first-attempt-archive.json')['path'])
    second = Path(read(BASE / 'second-attempt-archive.json')['path'])
    assert current['candidate_sha256'] == digest and current['correspondence_pass'] is False
    assert read(Q / 'final-verification.json')['media_hash'] == digest
    assert read(Q / 'final-verification.json')['project_final_pass'] is True
    raw = repair['exact_native_yuv_check']
    assert repair['pass_'] is True and raw['pass_'] is True and raw['changed_indices'] == [183]
    assert raw['unchanged_frames'] == 299 and raw['expected_replacement_matches'] is True
    assert repair['replacement']['global_frame'] == 1083
    chunks = read(Q / 'chunks.json')
    old_chunks = read(first / 'qc/v6-finishing/chunks.json')
    for chunk in chunks:
        assert sha(P / chunk['path']) == chunk['sha256']
        if chunk['start'] != 900:
            assert chunk == next(c for c in old_chunks if c['start'] == chunk['start'])
    assert [c for c in chunks if c['start'] == 900] == [repair['output_chunk']]
    failures = [r['frame'] for r in current['rows'] if r['failures']]
    assert failures == current['failed_frames']
    old = {r['frame']: r for r in historical['flag_dispositions']}
    assert set(failures) <= set(old) - {1083}
    assert all(old[f]['visual_disposition'] == 'resolution_dependent_layout_observation' for f in failures)
    for who in ('chatgpt', 'gemini'):
        review = read(BASE / f'third-native/{who}-review.json')
        assert review['candidate_sha256'] == digest and review['pass_'] is True and review['issues'] == []
    roi = read(BASE / 'third-native/roi-check.json')
    assert roi['candidate_sha256'] == digest and roi['pass_'] is True and roi['controls_pass'] is True
    failed_whole_control = read(BASE / 'rerender-same-resolution-correspondence.json')
    assert failed_whole_control['pass_'] is False
    assert failed_whole_control['known_missing_caption_negative_control']['correspondence_pass'] is True
    dispositions = []
    current_rows = {r['frame']: r for r in current['rows']}
    for frame in failures:
        chunk = next(c for c in chunks if c['start'] <= frame <= c['end'])
        assert chunk['start'] != 900
        dispositions.append({'frame': frame, 'disposition': 'accepted_visual_scope', 'historical_frame': frame,
                             'reason': old[frame]['actual_visual_reason'],
                             'current_numeric_failures_retained': current_rows[frame]['failures'],
                             'historical_visual_disposition': old[frame]['visual_disposition'],
                             'unchanged_chunk': {k: chunk[k] for k in ('path', 'sha256', 'start', 'end')},
                             'transfer_basis': 'This native chunk is byte-identical to the first export chunk whose actual paired images were inspected by both reviewers. Final assembly uses the same frozen FFmpeg command; source chunk identity is exact, not a claim of final pixel equivalence.'})
    roots = [first / 'ATTEMPT.json', second / 'ATTEMPT.json', BASE / 'pairs-manifest.json',
             BASE / 'chatgpt-review.json', BASE / 'gemini-coverage-normalized.json', BASE / 'native-decode-provenance.json',
             BASE / 'repair1083/REVEAL-CORRECTION.md', BASE / 'repair1083/provenance.json',
             BASE / 'repair1083/negative-old-1083-provenance.json',
             BASE / 'second-native/chatgpt-review.json', BASE / 'second-native/gemini-review.json',
             BASE / 'rerender-same-resolution-correspondence.json', Q / 'single-frame-repair.json',
             BASE / 'third-native/manifest.json', BASE / 'third-native/chatgpt-review.json',
             BASE / 'third-native/gemini-review.json', BASE / 'third-native/roi-check.json',
             BASE / 'roi-controls-pre-third.json', BASE / 'roi-good-encoded-controls.json', BASE / 'roi-criteria-v1.json',
             SESSION / 'work/verify_third_native_roi.py', SESSION / 'work/repair_native_chunk.py',
             SESSION / 'work/reports/final-correspondence-criteria-v2.json', SESSION / 'work/verify_final_correspondence.py',
             Q / 'final-all-frame-correspondence-additive.json', Q / 'final-verification.json', Q / 'final-all-frame-scan.json']
    report = {'schema_version': 3, 'created_ns': time.time_ns(), 'authority': 'lead',
              'status': 'ACCEPTED_PROJECT_VISUAL_SCOPE', 'creator_sha256': sha(Path(__file__)),
              'candidate_sha256': digest, 'comparator_sha256': sha(Q / 'final-all-frame-correspondence-additive.json'),
              'comparator_tool_sha256': current['tool_sha256'], 'raw_numeric_correspondence_pass': False,
              'pixel_equivalence_claimed': False, 'global_render_cause': 'unproven',
              'failed_frames': failures, 'frame_dispositions': dispositions, 'unresolved_frames': [],
              'repair_kind': 'single_frame_repair', 'repaired_frame': 1083,
              'whole_frame_missing_caption_negative_control_rejected': False,
              'raw_plane_equality_is_not_rgb_equivalence': True,
              'repair_detail': {'frame': 1083, 'repair_kind': 'single_frame_repair',
                                 'actual_encoded_dual_review_frames': [1082, 1083, 1084],
                                 'source_and_frozen_renderer_changed': False,
                                 'exact_native_yuv_unchanged_frames_in_chunk': 299},
              'proof_bindings': {str(path): sha(path) for path in roots},
              'acceptance_basis': 'Complete actual dual review of the first302flags/407selected frames with independent decode derivation; every current flagged frame lies in one of eight byte-identical native chunks. The repaired ninth chunk preserves299nativeYUVframes exactly and substitutes only verified1083. Fixed pre-third ROI controls reject both real missing-caption examples; actual third encoded1082–1084 pass ROI and dual visual inspection. Frozen final technical verification rerun.',
              'limits': [
                  'The fixed2493vs540 mathematical comparator remains FAIL; all current flags have explicit frame-scoped visual dispositions. No raw report or threshold was changed.',
                  'The first301non1083flagged observations preserve context/content/timing in actual paired review. A native launch-scale layout mechanism was reproduced only at570; a global cause is unproven.',
                  'Exact299preservation refers to native planar YUV sample bytes. Lossless H264 profile and chroma_location center→left differ, so RGB reconstruction equivalence is not claimed. Actual final neighboring caption frames are separately checked.',
                  'The whole160x90 comparison failed to reject a known missing-caption negative control. Its failed sensitivity report is retained; it is not the repaired-caption acceptance basis.',
                  'The added native ROI and dual final review cover1082–1084. Historical native paired review covers407selected frames; full2493-frame visual review pertains to the540reference, supplemented by actual final all-frame decode/blank/seam/correspondence checks.',
                  'This visual disposition does not change raw source/cut/level/order/audio or Module5 results and makes no audio judgement.',
              ]}
    assert sha(final) == digest
    output = Q / 'final-visual-disposition-additive.json'
    with output.open('x') as handle:
        json.dump(report, handle, indent=2, allow_nan=False); handle.write('\n')
    print(json.dumps({'path': str(output), 'sha256': sha(output), 'status': report['status'],
                      'raw_numeric_pass': False, 'separately_disposed_frames': len(failures)}))


if __name__ == '__main__':
    main()
