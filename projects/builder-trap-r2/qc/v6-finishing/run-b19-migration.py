from pathlib import Path
import argparse
import fcntl
import importlib.util
import math
import os
import re
import shutil
import time
import traceback
from PIL import Image, ImageDraw

P=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('finish',P/'tools/finish_v6.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
ALIAS=Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/builder-v6')
ap=argparse.ArgumentParser();ap.add_argument('--approval',required=True);args=ap.parse_args()
job=dict(pid=os.getpid(),started_ns=time.time_ns(),state='preflight',supervisor_sha256=m.sha(__file__))
job_path=m.Q/'b19-migration-job.json'
m.write(job_path,job)
try:
    os.nice(max(0,10-os.getpriority(os.PRIO_PROCESS,0)))
    approval=m.read(args.approval)
    m.need(m.sha(P/'tools/finish_v6.py')==approval['changes']['tools/finish_v6.py']['after'],'active tool not approved candidate')
    m.need(ALIAS.resolve()==P.resolve() and ALIAS.stat().st_ino==P.stat().st_ino,'dot-free alias does not resolve exact project')
    job.update(state='sealing_current_source');m.write(job_path,job)
    seal=m.run('b19-source-seal',[m.PY,P/'tools/finish_v6.py','migrate-snapshot','--approval',args.approval])
    source=m.accepted_source();source_sha=m.sha(m.Q/'source-snapshot.json')
    context,_=m.migration_source(source)
    base=context['base']
    work=m.Q/f'b19-migration-{time.time_ns()}';work.mkdir()
    job.update(state='waiting_global_lock',source_snapshot_sha256=source_sha,work_root=str(work.relative_to(P)))
    m.write(job_path,job)
    with Path('/tmp/remotion-heavy-render.lock').open('a') as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        m.need(os.statvfs(P).f_bavail*os.statvfs(P).f_frsize>=1_500_000_000,'less than1.5GB free before migration render')
        job.update(state='building_new_source_bundle');m.write(job_path,job)
        build=m.run('b19-bundle-build',[m.Q/'runtime-bin/npx','remotion','bundle','src/index.ts',
                                      '--out-dir='+str(ALIAS/'qc/.bundle')],cwd=m.R)
        bundle=m.bundle_manifest()
        m.need(m.normalized_bundle(bundle,'file_hashes')['bundle.js'] !=
               m.normalized_bundle(base['original_bundle_manifest'],'file_hashes')['bundle.js'],'new build still contains original429 bundle.js')
        (m.QC/'.bundle_stamp').write_text('Actual successful b19 bundle build '+str(build['ended_ns'])+'\n')
        receipt=work/'new-bundle-build.json'
        m.write(receipt,dict(source_snapshot_sha256=source_sha,input_hashes=source['input_hashes'],bundle_manifest=bundle,build=build))
        receipt_pointer=dict(path=str(receipt.relative_to(P)),sha256=m.sha(receipt))
        preserve=work/'previous-output';preserve.mkdir()
        for filename in ('frames-provenance.json','stills-provenance.json','audit-provenance.json','latest-audit-poststep.json'):
            shutil.copy2(m.Q/filename,preserve/filename)
        old_still=m.QC/'stills/B19.png'
        m.archive_qc(old_still)
        before_log=m.QC/'still.log';offset=before_log.stat().st_size if before_log.exists() else 0
        job.update(state='rendering_still1498');m.write(job_path,job)
        still=m.run('b19-fresh-still',["bash",m.J/'render.sh',ALIAS,'still','Main','B19:1498'])
        m.need('GAGAL still' not in (P/still['log']).read_text(),'canonical B19 still failed')
        errors=before_log.read_bytes()[offset:]
        fresh_errors=work/'still-browser-new.log';fresh_errors.write_bytes(errors)
        m.need(not re.search(rb'404|ERR_FILE_NOT_FOUND|failed to load|font[^\n]*(?:error|failed)',errors,re.I),'fresh still asset/browser error')
        m.fresh(old_still,still['started_ns'])
        with Image.open(old_still) as image:m.need(image.size==(960,540),'fresh B19 still dimensions differ')
        m.same_bundle(bundle);m.accepted_source()
        proof_still=work/'fresh-still-provenance.json'
        m.write(proof_still,dict(source_snapshot_sha256=source_sha,bundle_manifest=bundle,new_bundle_provenance=receipt_pointer,
                                source_frame=1498,render=still,output_hashes=m.hashes([old_still]),browser_errors=m.hashes([fresh_errors])))
        tmp=m.TMP/f'b19-range-{time.time_ns()}';tmp.mkdir()
        stage=work/'fresh-frames1461-1506';stage.mkdir()
        job.update(state='rendering46frames',range=[1461,1506],tmpdir=str(tmp));m.write(job_path,job)
        command=['env','TMPDIR='+str(tmp),m.Q/'runtime-bin/npx','remotion','render',ALIAS/'qc/.bundle','Main',
                 ALIAS/stage.relative_to(P),'--sequence','--image-format=jpeg','--jpeg-quality=85','--scale=0.5',
                 '--concurrency=1','--frames=1461-1506','--log=verbose']
        rendered=m.run('b19-fresh46-frames',command,cwd=m.R)
        paths=sorted(stage.glob('*.jpeg'))
        m.need([int(re.findall(r'\d+',p.stem)[-1]) for p in paths]==list(range(1461,1507)),'fresh frame range incomplete')
        metrics=[]
        for path in paths:
            m.fresh(path,rendered['started_ns'])
            with Image.open(path) as image:
                m.need(image.size==(960,540),'fresh frame dimensions differ')
                extrema=image.convert('RGB').getextrema();m.need(any(a!=b for a,b in extrema),'unexpected blank in fresh B19 range')
            target=m.QC/'frames'/path.name
            shutil.copy2(target,preserve/path.name)
            shutil.copy2(path,target)
            metrics.append(dict(frame=int(re.findall(r'\d+',path.stem)[-1]),staged_sha256=m.sha(path),installed_sha256=m.sha(target)))
        m.same_bundle(bundle);m.accepted_source()
        proof_frames=work/'fresh-frames-provenance.json'
        installed=[m.QC/'frames'/path.name for path in paths]
        m.write(proof_frames,dict(source_snapshot_sha256=source_sha,bundle_manifest=bundle,new_bundle_provenance=receipt_pointer,
                                 source_frames=[1461,1506],render=rendered,output_hashes=m.hashes(installed),
                                 staged_output_hashes=m.hashes(paths),metrics=metrics))
    job.update(state='assembling_explicit_cache_provenance');m.write(job_path,job)
    frames=m.read(P/base['frames_provenance']);stills=m.read(P/base['stills_provenance'])
    common=dict(source_snapshot_sha256=source_sha,bundle_manifest=bundle,
                cache_migration_approval_sha256=source['cache_migration']['approval_sha256'],
                reused_source_snapshot_sha256=m.MIGRATION_BASE_SHA,base_archive_sha256=approval['base_archive_sha256'])
    frames.update(common);frames.update(fresh_render_provenance=dict(path=str(proof_frames.relative_to(P)),sha256=m.sha(proof_frames)),
                                       output_hashes=m.hashes(sorted((m.QC/'frames').glob('*.jpeg'))),
                                       reused_frame_ranges=[[0,1460],[1507,2492]],fresh_frame_range=[1461,1506],
                                       provenance_note='2447 exact cached bytes rendered under429142;46 newly rendered from rebuilt current-source bundle; original full-run and corrected tail records retained')
    m.migrated_render_evidence(source,frames,'frames');m.write(m.Q/'frames-provenance.json',frames)
    still_paths=[m.QC/'stills'/(r['label']+'.png') for r in m.read(m.Q/'plan.json')['stills']]
    canvas=Image.new('RGB',(1920,math.ceil(len(still_paths)/4)*292),'#202020');draw=ImageDraw.Draw(canvas)
    for i,(path,row) in enumerate(zip(still_paths,m.read(m.Q/'plan.json')['stills'])):
        x,y=(i%4)*480,(i//4)*292
        with Image.open(path) as image:canvas.paste(image.convert('RGB').resize((480,270)),(x,y+22))
        draw.text((x+4,y+4),f"{row['label']} f{row['frame']}",fill='white')
    canvas.save(m.Q/'stills-montage.jpg',quality=88)
    stills.update(common);stills.update(fresh_render_provenance=dict(path=str(proof_still.relative_to(P)),sha256=m.sha(proof_still)),
                                       output_hashes=m.hashes([*still_paths,m.Q/'stills-montage.jpg']),
                                       reused_still_count=69,fresh_still=dict(label='B19',frame=1498),
                                       provenance_note='69 exact cached still bytes/mtimes rendered under429142; only B19f1498 newly rendered; montage regenerated')
    m.migrated_render_evidence(source,stills,'stills');m.write(m.Q/'stills-provenance.json',stills)
    m.write(work/'migration-output-proof.json',dict(source_snapshot_sha256=source_sha,base_archive_sha256=approval['base_archive_sha256'],
                                                 cached_frame_hashes=context['cache_frames'],cached_still_hashes=context['cache_stills'],
                                                 fresh_frame_hashes=m.hashes(installed),fresh_still_hashes=m.hashes([old_still]),
                                                 frames_provenance_sha256=m.sha(m.Q/'frames-provenance.json'),
                                                 stills_provenance_sha256=m.sha(m.Q/'stills-provenance.json')))
    m.accepted_source()
    job.update(state='complete',exit_code=0,ended_ns=time.time_ns(),fresh_frames=46,cached_frames=2447,fresh_stills=1,cached_stills=69,
               frames_provenance_sha256=m.sha(m.Q/'frames-provenance.json'),stills_provenance_sha256=m.sha(m.Q/'stills-provenance.json'))
except BaseException as error:
    traceback.print_exc();job.update(state='failed',exit_code=1,ended_ns=time.time_ns(),error=str(error))
finally:m.write(job_path,job)
raise SystemExit(job['exit_code'])
