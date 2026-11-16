#!/usr/bin/env python3
"""Keep text evidence portable while retaining exact original identities."""
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import time

SESSION = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery')
REPO = Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development')
P = REPO / 'projects/builder-trap-r2'
Q = P / 'qc/v6-finishing'
DEST = Q / 'post-native-evidence'
TEXT = {'.json', '.jsonl', '.py', '.mjs', '.md', '.txt', '.log'}


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    closure_path = Q / 'final-export-closure-v3.json'
    closure = json.loads(closure_path.read_text())
    delivery = Q / 'drive-delivery.json'
    assert delivery.is_file()
    inputs = {Path(k) if Path(k).is_absolute() else P / k: v for k, v in closure['proof_hashes'].items()}
    for path in [closure_path, delivery, Q / 'final-visual-disposition-additive.json', Q / 'single-frame-repair.json']:
        inputs[path] = sha(path)
    helpers = ['build_final_closure.py', 'build_final_closure_v2.py', 'verify_final_correspondence.py',
               'verify_rerender_correspondence.py', 'prepare_second_native_review.py', 'review_second_native_gemini.py',
               'create_final_visual_disposition.py', 'create_final_visual_disposition_v3.py',
               'build_final_closure_v3.py', 'closure_v3_repair_support.py', 'check_closure_v3_helpers.py', 'prepare_third_native_review.py', 'review_third_native_gemini.py',
               'repair_native_chunk.py', 'verify_third_native_roi.py', 'archive_second_native_attempt.py', 'check_closure_v2_helpers.py', 'verify_native_decode.py', 'prepare_final_pairs.py',
               'review_final_pairs_gemini.py', 'archive_first_native_attempt.py', 'package_post_final.py']
    for name in helpers:
        path = SESSION / 'work' / name
        inputs[path] = sha(path)
    native = SESSION / 'work/final-native-qa'
    for folder in ['gemini', 'second-native', 'third-native', 'dom-probe', 'repair1083']:
        for path in (native / folder).iterdir():
            if path.is_file() and path.suffix in TEXT:
                inputs[path] = sha(path)
    run = SESSION / 'work/final-v6/runs/1794838972715352437'
    for path in run.iterdir():
        if path.is_file() and path.suffix in TEXT:
            inputs[path] = sha(path)
    for path in [SESSION / 'work/final-v6/launch_final.py', SESSION / 'work/reports/cache-cleanup-stage5.json', SESSION / 'work/reports/final-v3-adversarial-review.json',
                 *sorted((SESSION / 'work/reports').glob('final-closure-v*-helper-checks.json')),
                 *sorted((SESSION / 'work/reports').glob('final-closure-v*-requirements.md'))]:
        inputs[path] = sha(path)
    tracked_run = subprocess.run(['git', 'ls-tree', '-r', '--name-only', '-z', 'HEAD'], cwd=REPO, capture_output=True)
    assert tracked_run.returncode == 0
    tracked = set(tracked_run.stdout.decode().split('\0'))
    entries, stage = [], set()
    for path, expected in sorted(inputs.items(), key=lambda item: str(item[0])):
        assert sha(path) == expected, path
        record = {'original_path': str(path), 'sha256': expected, 'bytes': path.stat().st_size}
        if path.suffix in TEXT:
            if path.is_relative_to(REPO):
                rel = path.relative_to(REPO)
                target = path if (str(rel) in tracked or path.is_relative_to(Q) or path.is_relative_to(P / 'out/v6-chunks')) else DEST / 'repo-inputs' / rel
            else:
                assert path.is_relative_to(SESSION / 'work'), path
                target = DEST / 'session-work' / path.relative_to(SESSION / 'work')
            if target != path:
                target.parent.mkdir(parents=True, exist_ok=True)
                if target.exists():
                    assert sha(target) == expected, target
                else:
                    shutil.copyfile(path, target)
                assert sha(target) == expected
            record['repository_path'] = str(target.relative_to(REPO))
            stage.add(str(target.relative_to(REPO)))
        else:
            record['repository_path'] = None
            record['retained_as_bound_local_media'] = True
        entries.append(record)
    report = {'schema_version': 1, 'created_ns': time.time_ns(),
              'final_sha256': closure['media']['sha256'], 'closure_sha256': sha(closure_path),
              'text_copy_policy': 'Exact bytes; original absolute paths in captured evidence remain unchanged. Untracked candidate inputs are copied as evidence aliases, preserving their original untracked state. repository_path is an alias, not a replacement proof.',
              'media_policy': 'Large media remain in the protected local evidence paths; only hashes/path inventories are versioned.',
              'entries': entries, 'creator_sha256': sha(Path(__file__))}
    manifest = DEST / 'PORTABLE-PROOF-INDEX.json'
    with manifest.open('x') as handle:
        json.dump(report, handle, indent=2); handle.write('\n')
    stage.add(str(manifest.relative_to(REPO)))
    stage.update('projects/builder-trap-r2/' + n for n in ['STATUS.md', 'DELIVERY-v6.md', 'EVALUASI-v6.md', 'DAILY-v6.md'])
    inventory = SESSION / 'work/reports/post-final-git-paths.json'
    inventory.write_text(json.dumps(sorted(stage), indent=2) + '\n')
    print(json.dumps({'text_paths': len(stage), 'bound_entries': len(entries),
                      'manifest': str(manifest), 'stage_inventory': str(inventory)}))


if __name__ == '__main__':
    main()
