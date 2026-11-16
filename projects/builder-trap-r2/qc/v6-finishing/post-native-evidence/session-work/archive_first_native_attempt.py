#!/usr/bin/env python3
import hashlib
import json
from pathlib import Path
import shutil
import time

P = Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2')
Q = P/'qc/v6-finishing'
EXPECTED = '9b10b624b344bba533bf960cd09bbba44248c017712276701de869be32d2596f'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    final = P/'out/builder-trap-r2_v6.mp4'
    assert sha(final) == EXPECTED
    ready = json.loads((Q/'readiness.json').read_text())
    paths = [final, *(Q.glob('final-*.json')),
             *[Q/name for name in ('aac-truepeak.json','audio-correspondence.json','seam-verification.json','chunks.json')],
             *(Q/'logs').glob('final-*.log'), *(Q/'logs').glob('final-*.json')]
    paths = sorted(set(paths))
    # Only the defective native chunk is removed from the resume inventory.
    defective = {P/'out/v6-chunks/f0900-1199.mp4',P/'out/v6-chunks/f0900-1199.json'}
    paths = sorted(set(paths) | defective)
    overlap = set(str(p.relative_to(P)) for p in paths) & set(ready['evidence_hashes'])
    assert not overlap, f'Would move sealed readiness evidence: {overlap}'
    archive = Q/'preserved'/f'final-native-attempt-9b10-{time.time_ns()}'
    archive.mkdir()
    entries = []
    for source in paths:
        assert source.is_file(), source
        rel = source.relative_to(P)
        target = archive/rel
        target.parent.mkdir(parents=True,exist_ok=True)
        digest = sha(source)
        keep_reused_receipt = (source.parent == Q/'logs' and source.name.startswith('final-chunk-')
                               and not source.name.startswith('final-chunk-0900.'))
        if keep_reused_receipt:
            shutil.copy2(source,target)
        else:
            shutil.move(source,target)
        assert sha(target) == digest
        entries.append({'original_path':str(rel),'archived_path':str(target.relative_to(P)),'sha256':digest,
                        'action':'copied_exact_reused_receipt' if keep_reused_receipt else 'moved_exact'})
    for source in sorted((P/'out/v6-chunks').glob('*')):
        if source.suffix not in ('.mp4','.json'):
            continue
        rel = source.relative_to(P)
        target = archive/rel
        target.parent.mkdir(parents=True,exist_ok=True)
        digest = sha(source)
        shutil.copy2(source,target)
        assert sha(target) == digest and sha(source) == digest
        entries.append({'original_path':str(rel),'archived_path':str(target.relative_to(P)),'sha256':digest,'action':'copied_exact_reused_chunk'})
    manifest = {'schema_version':1,'created_ns':time.time_ns(),'authority':'lead',
                'disposition':'REJECT_FOR_DELIVERY_SINGLE_FRAME_HANDWRITING_DROP',
                'reason':'Actual native frame1083 loses blue handwriting despite positive reveal; independently observed by ChatGPT, Gemini and lead. Other301numeric flags reviewed as render-scale observations.',
                'final_sha256':EXPECTED,'defect_frame':1083,'rerender_range':[900,1199],
                'unchanged_source_snapshot_sha256':sha(Q/'source-snapshot.json'),
                'unchanged_readiness_sha256':sha(Q/'readiness.json'),'unchanged_ship_sha256':sha(Q/'SHIP.json'),
                'readiness_evidence_overlap':sorted(overlap),'entries':entries,
                'alias_note':'Historical proof paths remain as captured. This map resolves their original relative paths to preserved exact bytes; active post-render paths will contain a later attempt.',
                'planned_method':'Resume the unchanged frozen native renderer;8remaining current chunks are hash-identical. Inspect repaired1082..1084 and same-resolution correspondence before delivery.'}
    path = archive/'ATTEMPT.json'
    path.write_text(json.dumps(manifest,indent=2)+'\n')
    pointer = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/final-native-qa/first-attempt-archive.json')
    with pointer.open('x') as handle:
        json.dump({'path':str(archive),'manifest':str(path),'sha256':sha(path),'final_sha256':EXPECTED},handle,indent=2)
        handle.write('\n')
    print(json.dumps({'archive':str(archive),'manifest_sha256':sha(path),'entries':len(entries),'remaining_chunks':len(list((P/'out/v6-chunks').glob('*.json')))}))


if __name__ == '__main__':
    main()
