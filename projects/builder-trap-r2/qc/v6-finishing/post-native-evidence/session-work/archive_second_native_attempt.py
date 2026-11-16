#!/usr/bin/env python3
"""Preserve the failed second export and its actual negative-control result."""
import hashlib
import json
from pathlib import Path
import shutil
import time

SESSION = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery')
P = Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2')
Q = P / 'qc/v6-finishing'
EXPECTED = 'd6d4cbcc12943fc6a70e0ea25e878c659ce7bacaf4c45bf8e75134e7c4a51320'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    final = P / 'out/builder-trap-r2_v6.mp4'
    assert sha(final) == EXPECTED
    ready = json.loads((Q / 'readiness.json').read_text())
    paths = sorted(set([final, *(Q.glob('final-*.json')),
                        *[Q / n for n in ('aac-truepeak.json', 'audio-correspondence.json', 'seam-verification.json', 'chunks.json')],
                        *(Q / 'logs').glob('final-*.log'), *(Q / 'logs').glob('final-*.json'),
                        P / 'out/v6-chunks/f0900-1199.mp4', P / 'out/v6-chunks/f0900-1199.json']))
    overlap = set(str(p.relative_to(P)) for p in paths) & set(ready['evidence_hashes'])
    assert not overlap
    archive = Q / 'preserved' / f'final-native-attempt-d6d4-{time.time_ns()}'
    archive.mkdir()
    entries = []
    for source in paths:
        target = archive / source.relative_to(P)
        target.parent.mkdir(parents=True, exist_ok=True)
        digest = sha(source)
        keep = source.parent == Q / 'logs' and source.name.startswith('final-chunk-') and not source.name.startswith('final-chunk-0900.')
        if keep:
            shutil.copy2(source, target)
        else:
            shutil.move(source, target)
        assert sha(target) == digest
        entries.append({'original_path': str(source.relative_to(P)), 'archived_path': str(target.relative_to(P)),
                        'sha256': digest, 'action': 'copied_exact_reused_receipt' if keep else 'moved_exact'})
    for source in sorted((P / 'out/v6-chunks').glob('*')):
        if source.suffix not in ('.mp4', '.json'):
            continue
        target = archive / source.relative_to(P)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        digest = sha(source)
        assert sha(target) == digest
        entries.append({'original_path': str(source.relative_to(P)), 'archived_path': str(target.relative_to(P)),
                        'sha256': digest, 'action': 'copied_exact_reused_chunk'})
    extra = [SESSION / 'work/final-native-qa/rerender-same-resolution-correspondence.json',
             *(SESSION / 'work/final-native-qa/second-native').glob('*')]
    for source in sorted(extra):
        if not source.is_file():
            continue
        target = archive / 'session-work' / source.relative_to(SESSION / 'work')
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        digest = sha(source)
        assert sha(target) == digest
        entries.append({'original_path': str(source), 'archived_path': str(target.relative_to(P)),
                        'sha256': digest, 'action': 'copied_exact_second_review'})
    report = {'schema_version': 1, 'created_ns': time.time_ns(), 'authority': 'lead',
              'disposition': 'REJECT_FOR_DELIVERY_RECURRENT_HANDWRITING_DROP', 'final_sha256': EXPECTED,
              'defect_frame': 1084, 'readiness_evidence_overlap': [], 'entries': entries,
              'reason': 'Both actual encoded image reviewers saw blue handwriting missing at1084. Whole160x90 criteria failed to detect this or the old missing-caption negative control; no false PASS or threshold change.',
              'planned_method': 'Return to first archived chunk; replace only1083 with verified native PNG, lossless native-YUV encoding and exact299unaffected-frame checks; other8chunks identical; unchanged final CLI rerun.'}
    manifest = archive / 'ATTEMPT.json'
    manifest.write_text(json.dumps(report, indent=2) + '\n')
    pointer = SESSION / 'work/final-native-qa/second-attempt-archive.json'
    with pointer.open('x') as handle:
        json.dump({'path': str(archive), 'manifest': str(manifest), 'sha256': sha(manifest),
                   'final_sha256': EXPECTED}, handle, indent=2); handle.write('\n')
    print(json.dumps({'archive': str(archive), 'manifest_sha256': sha(manifest), 'entries': len(entries)}))


if __name__ == '__main__':
    main()
