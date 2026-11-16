#!/usr/bin/env python3
"""Extract actual encoded repair neighbors and record their derivation."""
import hashlib
import json
from pathlib import Path
import subprocess
import time

from PIL import Image

SESSION = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery')
P = Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2')
Q = P / 'qc/v6-finishing'
BASE = SESSION / 'work/final-native-qa/second-native'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    final = P / 'out/builder-trap-r2_v6.mp4'
    digest = sha(final)
    proof = json.loads((Q / 'final-verification.json').read_text())
    assert proof['project_final_pass'] is True and proof['media_hash'] == digest
    assert digest != '9b10b624b344bba533bf960cd09bbba44248c017712276701de869be32d2596f'
    BASE.mkdir(exist_ok=False)
    command = ['/usr/bin/ffmpeg', '-nostdin', '-v', 'error', '-threads', '2', '-filter_threads', '1',
               '-i', str(final), '-vf', r'select=between(n\,1082\,1084)', '-vsync', '0',
               '-frames:v', '3', '-start_number', '1082', str(BASE / 'native-%04d.png')]
    started = time.time_ns()
    run = subprocess.run(command, capture_output=True)
    error = BASE / 'decode.log'
    error.write_bytes(run.stderr)
    assert run.returncode == 0 and not run.stderr, run.stderr
    frames = []
    assert sorted(p.name for p in BASE.glob('native-*.png')) == [f'native-{f}.png' for f in (1082, 1083, 1084)]
    for frame in (1082, 1083, 1084):
        path = BASE / f'native-{frame}.png'
        with Image.open(path) as image:
            assert image.size == (1920, 1080)
        frames.append({'frame': frame, 'path': str(path), 'sha256': sha(path), 'width': 1920, 'height': 1080})
    assert sha(final) == digest
    info = BASE / 'INFO.md'
    info.write_text('\n'.join([
        '# Actual second native export: repair-neighbor review', '',
        f'Candidate SHA256: {digest}',
        'Three PNGs were decoded from the actual verified1920x1080/30fps final MP4, not standalone source renders.',
        'Inspect ALL three full images at consecutive exact global frames1082,1083,1084.',
        'The first export had one-frame disappearance of the blue handwritten words beside black Selama at1083.',
        'Judge only actual visible handwriting continuity, correct scene/camera/context and any new loss/clipping.',
        'A progressive partial word reveal is intended; the blue handwriting must not disappear between adjacent frames.',
        'Do not infer audio quality, complete2493-frame coverage, numeric correspondence PASS or project SHIP authority.',
        'Return exact frame indices, whether allimages inspected, visible observations and any issue.', '',
    ]) + '\n')
    report = {'schema_version': 1, 'created_ns': time.time_ns(),
              'candidate_path': str(final), 'candidate_sha256': digest,
              'final_verification_sha256': sha(Q / 'final-verification.json'),
              'source_snapshot_sha256': sha(Q / 'source-snapshot.json'), 'creator_sha256': sha(Path(__file__)),
              'decode': {'command': command, 'exit_code': run.returncode, 'started_ns': started,
                         'stderr_path': str(error), 'stderr_sha256': sha(error),
                         'input_sha256_before': digest, 'input_sha256_after': sha(final)},
              'frames': frames, 'info_path': str(info), 'info_sha256': sha(info)}
    path = BASE / 'manifest.json'
    with path.open('x') as handle:
        json.dump(report, handle, indent=2); handle.write('\n')
    print(json.dumps({'manifest': str(path), 'sha256': sha(path), 'candidate_sha256': digest, 'frames': [f['frame'] for f in frames]}))


if __name__ == '__main__':
    main()
