#!/usr/bin/env python3
"""Use the unchanged pre-final criteria to audit the second native attempt."""
import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import time

import numpy as np

SESSION = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery')
BASE = SESSION/'work/final-native-qa'
P = Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2')
Q = P/'qc/v6-finishing'
TOOL = SESSION/'work/verify_final_correspondence.py'
PIN = 'dd1c6f2f94e84204b2958f12f3cb1564dd7818517294d9836adb6915a7a7d6c6'
OLD_SHA = '9b10b624b344bba533bf960cd09bbba44248c017712276701de869be32d2596f'
CAPTURE_SHA = '8615c60df90efab60a34e993dfecbb101dc5ad1189d024c577f9f6496685f4bb'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read(path):
    return json.loads(path.read_text())


def main():
    assert sha(TOOL) == PIN
    spec = importlib.util.spec_from_file_location('fixed_correspondence_v2',TOOL)
    fixed = importlib.util.module_from_spec(spec);spec.loader.exec_module(fixed)
    archive = Path(read(BASE/'first-attempt-archive.json')['path'])
    old = archive/'out/builder-trap-r2_v6.mp4'
    new = P/'out/builder-trap-r2_v6.mp4'
    assert sha(old) == OLD_SHA
    new_sha = sha(new)
    old_receipt = read(archive/'qc/v6-finishing/final-verification.json')
    new_receipt = read(Q/'final-verification.json')
    assert old_receipt['media_hash'] == OLD_SHA and new_receipt['media_hash'] == new_sha
    assert old_receipt['project_final_pass'] is True and new_receipt['project_final_pass'] is True
    old_scan = read(archive/'qc/v6-finishing/final-all-frame-scan.json')
    new_scan = read(Q/'final-all-frame-scan.json')
    assert fixed.terminal_fade_evidence(old_scan,old_receipt,OLD_SHA)
    assert fixed.terminal_fade_evidence(new_scan,new_receipt,new_sha)
    _, old_probe = fixed.probe(old,(1920,1080),2493)
    _, new_probe = fixed.probe(new,(1920,1080),2493)
    previous, old_decode = fixed.decode(old,old_probe,2493)
    current, new_decode = fixed.decode(new,new_probe,2493)
    compared = fixed.compare(previous,current,2493,terminal_fade_verified=True)
    unexpected = [f for f in compared['failed_frames'] if f != 1083]
    kept = []
    for path in sorted((P/'out/v6-chunks').glob('*.json')):
        side = read(path);start=side['chunk']['start']
        if start == 900:
            continue
        old_path = archive/path.relative_to(P)
        chunk_path = P/side['chunk']['path']
        assert sha(path) == sha(old_path)
        assert sha(chunk_path) == sha(archive/chunk_path.relative_to(P)) == side['chunk']['sha256']
        kept.append(side['chunk'])
    assert len(kept) == 8
    capture = BASE/'repair1083/native-1083.png'
    assert sha(capture) == CAPTURE_SHA
    # Both are actual native-resolution sources. Only the known missing caption frame is checked against this fresh native capture.
    command = ['/usr/bin/ffmpeg','-nostdin','-v','error','-threads','2','-filter_threads','1','-i',str(capture),
               '-vf','scale=160:90:flags=area:in_range=full:out_range=full,format=gray',
               '-frames:v','1','-f','rawvideo','-']
    run = subprocess.run(command,capture_output=True)
    assert run.returncode == 0 and not run.stderr
    target = np.frombuffer(run.stdout,dtype=np.uint8).reshape(1,90,160)
    repair = fixed.compare(target,current[1083:1084],1,start_frame=1083)
    negative = fixed.compare(target,previous[1083:1084],1,start_frame=1083)
    report = {'schema_version':1,'created_ns':time.time_ns(),'reference_tool_sha256':PIN,
              'creator_sha256':sha(Path(__file__)),'old_final_path':str(old),'old_final_sha256':OLD_SHA,
              'new_final_path':str(new),'new_final_sha256':new_sha,
              'old_verification_sha256':sha(archive/'qc/v6-finishing/final-verification.json'),
              'new_verification_sha256':sha(Q/'final-verification.json'),
              'old_decode':old_decode,'new_decode':new_decode,'old_probe':old_probe,'new_probe':new_probe,
              'fixed_criteria':fixed.CRITERIA,'all_frame_comparison':compared,
              'expected_repair_frame':1083,'unexpected_failed_frames':unexpected,
              'unchanged_eight_chunks':kept,'same_index_2492_unaffected_pass':not unexpected,
              'repair_native_capture_path':str(capture),'repair_native_capture_sha256':CAPTURE_SHA,
              'repair_capture_decode_command':command,'repair_capture_comparison':repair,
              'known_missing_caption_negative_control':negative,
              'pass_':not unexpected and repair['correspondence_pass'] and not negative['correspondence_pass'],
              'raw540_numeric_result_not_overridden':True,
              'limits':'Same-resolution codec-tolerant comparison, not pixel identity. Only1083 is a deliberate repair; separate dual visual inspection and the retained301render-scale dispositions remain required.'}
    assert sha(old) == OLD_SHA and sha(new) == new_sha and sha(capture) == CAPTURE_SHA
    output = BASE/'rerender-same-resolution-correspondence.json'
    with output.open('x') as handle:
        json.dump(report,handle,indent=2,allow_nan=False);handle.write('\n')
    print(json.dumps({'path':str(output),'pass_':report['pass_'],'unexpected_failed_frames':unexpected,
                      'repair_capture_pass':repair['correspondence_pass'],'same_index_2492_pass':not unexpected}))
    return 0 if report['pass_'] else 1


if __name__ == '__main__':
    raise SystemExit(main())
