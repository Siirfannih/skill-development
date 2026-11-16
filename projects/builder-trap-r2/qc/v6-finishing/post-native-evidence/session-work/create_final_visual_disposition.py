#!/usr/bin/env python3
"""Record the lead's bounded visual disposition without changing numeric results."""
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
    bridge = read(BASE / 'rerender-same-resolution-correspondence.json')
    archive = Path(read(BASE / 'first-attempt-archive.json')['path'])
    assert current['candidate_sha256'] == bridge['new_final_sha256'] == digest
    assert current['correspondence_pass'] is False and bridge['pass_'] is True
    assert bridge['same_index_2492_unaffected_pass'] is True and bridge['unexpected_failed_frames'] == []
    assert bridge['repair_capture_comparison']['correspondence_pass'] is True
    assert bridge['known_missing_caption_negative_control']['correspondence_pass'] is False
    failures = [r['frame'] for r in current['rows'] if r['failures']]
    assert failures == current['failed_frames']
    old = {r['frame']: r for r in historical['flag_dispositions']}
    assert set(failures) <= set(old) - {1083}
    assert all(old[f]['visual_disposition'] == 'resolution_dependent_layout_observation' for f in failures)
    for who in ('chatgpt', 'gemini'):
        review = read(BASE / f'second-native/{who}-review.json')
        assert review['candidate_sha256'] == digest and review['pass_'] is True and review['issues'] == []
    rows = {r['frame']: r for r in bridge['all_frame_comparison']['rows']}
    dispositions = []
    for frame in failures:
        assert not rows[frame]['failures']
        dispositions.append({'frame': frame, 'disposition': 'accepted_visual_scope', 'historical_frame': frame,
                             'reason': old[frame]['actual_visual_reason'],
                             'current_numeric_failures_retained': next(r['failures'] for r in current['rows'] if r['frame'] == frame),
                             'historical_visual_disposition': old[frame]['visual_disposition'],
                             'transfer_basis': 'Same global frame of the actual new1080 export matches the actually dual-reviewed old1080 export under the unchanged codec-tolerant criteria; no pixel-identity claim.',
                             'same_resolution_corr': rows[frame]['corr'], 'same_resolution_mae': rows[frame]['mae']})
    roots = [archive / 'ATTEMPT.json', BASE / 'pairs-manifest.json', BASE / 'chatgpt-review.json',
             BASE / 'gemini-coverage-normalized.json', BASE / 'native-decode-provenance.json',
             BASE / 'repair1083/REVEAL-CORRECTION.md', BASE / 'repair1083/provenance.json',
             BASE / 'rerender-same-resolution-correspondence.json', BASE / 'second-native/manifest.json',
             BASE / 'second-native/chatgpt-review.json', BASE / 'second-native/gemini-review.json',
             SESSION / 'work/reports/final-correspondence-criteria-v2.json',
             SESSION / 'work/verify_final_correspondence.py', SESSION / 'work/verify_rerender_correspondence.py',
             Q / 'final-all-frame-correspondence-additive.json', Q / 'final-verification.json',
             Q / 'final-all-frame-scan.json']
    report = {'schema_version': 1, 'created_ns': time.time_ns(), 'authority': 'lead',
              'status': 'ACCEPTED_PROJECT_VISUAL_SCOPE', 'creator_sha256': sha(Path(__file__)),
              'candidate_sha256': digest, 'comparator_sha256': sha(Q / 'final-all-frame-correspondence-additive.json'),
              'comparator_tool_sha256': current['tool_sha256'], 'raw_numeric_correspondence_pass': False,
              'pixel_equivalence_claimed': False, 'global_render_cause': 'unproven',
              'failed_frames': failures, 'frame_dispositions': dispositions, 'unresolved_frames': [],
              'repaired_frame': {'frame': 1083, 'repair_kind': 'native_rerender_900_1199',
                                 'actual_encoded_dual_review_frames': [1082, 1083, 1084],
                                 'source_and_frozen_renderer_changed': False},
              'proof_bindings': {str(path): sha(path) for path in roots},
              'acceptance_basis': 'Complete actual dual review of the old302flags/407selected frames, independent decode derivation, unchanged2492same-resolution bridge, exact eight reusedchunks, repaired1083 positive/negative control and dual actual encoded neighbor review; frozen final technical verification independently rerun.',
              'limits': [
                  'The fixed2493vs540 mathematical comparator remains FAIL. Every current flag is separately accepted for the stated visual scope; no threshold or raw report was changed.',
                  '301 historical flagged observations preserve context/content/timing in actual paired review. The f570 native launch-scale layout mechanism was reproduced; this does not prove the cause of every other flag.',
                  'The2492same-resolution transfer uses the unchanged160x90 gray codec-tolerant criteria, not pixel identity, exhaustive small-text/chroma review or native-speed playback.',
                  'Historical review covers407 selected actual final frames; the earlier full2493-frame review is of the540 reference. The repaired1082–1084 are separately reviewed from the actual new1080 MP4.',
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
