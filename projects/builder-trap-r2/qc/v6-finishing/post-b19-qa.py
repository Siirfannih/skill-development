from pathlib import Path
import argparse
import fcntl
import importlib.util
import os
import shutil
import subprocess
import time
import traceback
P=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('finish',P/'tools/finish_v6.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
job=dict(pid=os.getpid(),started_ns=time.time_ns(),state='waiting_b19_migration',supervisor_sha256=m.sha(__file__))
path=m.Q/'post-b19-qa-job.json';m.write(path,job)
try:
    os.nice(max(0,10-os.getpriority(os.PRIO_PROCESS,0)))
    while True:
        previous=m.read(m.Q/'b19-migration-job.json')
        if previous['state']=='failed':raise m.Blocked('B19 migration failed: '+previous['error'])
        if previous['state']=='complete':break
        time.sleep(5)
    source=m.accepted_source();work=P/previous['work_root'];source_sha=m.sha(m.Q/'source-snapshot.json')
    job.update(state='waiting_global_lock',source_snapshot_sha256=source_sha);m.write(path,job)
    before=work/'audit-before';shutil.copytree(m.QC/'frame_audit',before)
    old={str(p.relative_to(before)):m.sha(p) for p in before.rglob('*') if p.is_file()}
    with Path('/tmp/remotion-heavy-render.lock').open('a') as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        job.update(state='auditing_all2493_latest_hash');m.write(path,job)
        audit=m.run('b19-latest-audit',[m.PY,P/'tools/finish_v6.py','audit','--stems',m.Q/'stems'])
    after={str(p.relative_to(m.QC/'frame_audit')):m.sha(p) for p in (m.QC/'frame_audit').rglob('*') if p.is_file()}
    changed_sheets=[name for name,value in after.items() if name.endswith('.jpg') and old.get(name)!=value]
    changed_info=[name for name,value in after.items() if name.endswith('/INFO.md') and old.get(name)!=value]
    unchanged_sheets=[name for name,value in after.items() if name.endswith('.jpg') and old.get(name)==value]
    m.write(m.Q/'b19-audit-changes.json',dict(source_snapshot_sha256=source_sha,latest_tool_sha256=m.LATEST_AUDIT_SHA,
                                            audit_provenance_sha256=m.sha(m.Q/'audit-provenance.json'),
                                            old_audit_path=str(before.relative_to(P)),old_hashes=old,new_hashes=after,
                                            changed_sheets=sorted(changed_sheets),changed_info=sorted(changed_info),
                                            unchanged_sheets=sorted(unchanged_sheets),review_decisions_written_by_builder=False))
    job.update(state='audit_stable_starting_derived_draft',changed_sheets=sorted(changed_sheets),changed_info=sorted(changed_info),
               audit_changes_sha256=m.sha(m.Q/'b19-audit-changes.json'));m.write(path,job)
    failed_logs=work/'previous-derived-logs';failed_logs.mkdir()
    for pattern in ('derive-draft*','derived-draft-*'):
        for old_log in (m.Q/'logs').glob(pattern):
            if old_log.is_file():shutil.copy2(old_log,failed_logs/old_log.name)
    derived=m.run('b19-derive-draft',[m.PY,m.Q/'derive-draft-migrated.py'])
    draft=m.read(m.Q/'draft-provenance.json');m.same_hashes(draft['output_hashes'])
    m.need(draft['source_snapshot_sha256']==source_sha,'new draft stale')
    job.update(state='running_actual_sfx_density',draft_sha256=m.sha(m.QC/'draft.mp4'));m.write(path,job)
    density=m.run('sfx-density',[m.PY,m.G/'sfx_density.py',m.QC/'draft.mp4',P/source['cues'],
                                 '--objects',P/source['objects'],'--json',m.Q/'sfx-density.json'])
    m.accepted_source()
    job.update(state='complete',exit_code=0,ended_ns=time.time_ns(),draft_sha256=m.sha(m.QC/'draft.mp4'),
               draft_provenance_sha256=m.sha(m.Q/'draft-provenance.json'),
               density_sha256=m.sha(m.Q/'sfx-density.json'),all2493_frames_audited=True,chunks=9,sheets=84,
               builder_review_verdicts=False,final_rendered=False)
except BaseException as error:
    traceback.print_exc();job.update(state='failed',exit_code=1,ended_ns=time.time_ns(),error=str(error))
finally:m.write(path,job)
raise SystemExit(job['exit_code'])
