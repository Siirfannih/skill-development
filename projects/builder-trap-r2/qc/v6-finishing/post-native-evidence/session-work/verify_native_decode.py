#!/usr/bin/env python3
import hashlib
import json
from pathlib import Path
import subprocess
import time

BASE = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/final-native-qa')
FINAL = Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2/out/builder-trap-r2_v6.mp4')
EXPECTED = '9b10b624b344bba533bf960cd09bbba44248c017712276701de869be32d2596f'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    manifest_path = BASE/'pairs-manifest.json'
    manifest = json.loads(manifest_path.read_text())
    assert sha(FINAL) == manifest['final_sha256'] == EXPECTED
    assert all(sha(BASE/p) == h for p,h in manifest['native_hashes'].items())
    destination = BASE/f'decode-replay-{time.time_ns()}'
    destination.mkdir()
    command = ['/usr/bin/ffmpeg','-nostdin','-v','error','-threads','2','-filter_threads','1','-i',str(FINAL),
               '-map','0:v:0','-vf','scale=960:540','-q:v','2','-fps_mode','passthrough','-frames:v','2493',
               '-start_number','0',str(destination/'native-%04d.jpeg')]
    log = BASE/'decode-replay.log'
    started = time.time_ns()
    with log.open('x') as handle:
        result = subprocess.run(command,stdout=handle,stderr=subprocess.STDOUT)
    ended = time.time_ns()
    paths = sorted(destination.glob('native-*.jpeg'))
    mismatches = []
    actual = {}
    for path in paths:
        digest = sha(path)
        actual[path.name] = digest
        if digest != manifest['native_hashes'].get('frames/'+path.name):
            mismatches.append(path.name)
    expected_names = [f'native-{i:04d}.jpeg' for i in range(2493)]
    unchanged = sha(FINAL) == EXPECTED and all(sha(BASE/p) == h for p,h in manifest['native_hashes'].items())
    passed = result.returncode == 0 and not log.read_text().strip() and list(actual) == expected_names and not mismatches and unchanged
    proof = {'schema_version':1,'pass_':passed,'method':'Independent repeat of actual final decode; all2493new JPEG bytes must equal the complete previously reviewed native image inventory.',
             'command':command,'exit_code':result.returncode,'started_ns':started,'ended_ns':ended,
             'log_path':str(log),'log_sha256':sha(log),'final_path':str(FINAL),'final_sha256_before':EXPECTED,
             'final_sha256_after':sha(FINAL),'original_native_images_unchanged':unchanged,
             'pairs_manifest_sha256':sha(manifest_path),'decoded_frames':len(paths),'start_number':0,
             'mismatches':mismatches,'decoded_jpeg_sha256_by_name':actual,'replay_directory':str(destination),
             'creator_sha256':sha(Path(__file__))}
    out = BASE/'native-decode-provenance.json'
    with out.open('x') as handle:
        json.dump(proof,handle,indent=2);handle.write('\n')
    print(json.dumps({'path':str(out),'pass_':passed,'exit_code':result.returncode,'frames':len(paths),'mismatches':len(mismatches)}))
    return 0 if passed else 1


if __name__ == '__main__':
    raise SystemExit(main())
