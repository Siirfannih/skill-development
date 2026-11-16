from pathlib import Path
import fcntl
import importlib.util
import json
import math
import os
import re
import subprocess
import time
import traceback

P = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("finish_v6", P / "tools/finish_v6.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
EXPECTED_SOURCE = m.sha(m.Q / "source-snapshot.json")
SOURCE = m.accepted_source()
APPROVAL = m.read(P / SOURCE["cache_migration"]["approval_path"])
EXPECTED_TOOL = APPROVAL["changes"]["tools/finish_v6.py"]["after"]
job = dict(pid=os.getpid(), started_ns=time.time_ns(), state="preflight",
           source_snapshot_sha256=EXPECTED_SOURCE, supervisor_sha256=m.sha(__file__))
job_path = m.Q / "derived-draft-job.json"
m.write(job_path, job)


def compare_frames(draft, ordered, env):
    import numpy as np
    size=960*540*3
    base=['/usr/bin/ffmpeg','-v','error','-threads','2','-filter_threads','1']
    actual_command=base+['-i',str(draft),'-map','0:v:0','-an','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1']
    reference_command=base+['-framerate','30','-start_number','0','-i',str(m.Q/'draft-frame-order/f%04d.jpeg'),
                            '-frames:v','2493','-an','-fps_mode','passthrough','-pix_fmt','rgb24','-threads','2','-f','rawvideo','pipe:1']
    actual_log=m.Q/'logs/derived-draft-correspondence.log';reference_log=m.Q/'logs/derived-draft-reference.log'
    started=time.time_ns();rows=[];total_signal=total_error=0.
    with actual_log.open('wb') as err,reference_log.open('wb') as referr:
        actual_proc=subprocess.Popen(actual_command,cwd=P,env=env,stdout=subprocess.PIPE,stderr=err)
        reference_proc=subprocess.Popen(reference_command,cwd=P,env=env,stdout=subprocess.PIPE,stderr=referr)
        try:
            for index,path in enumerate(ordered):
                a=actual_proc.stdout.read(size);r=reference_proc.stdout.read(size)
                m.need(len(a)==len(r)==size,f'actual/reference decode ended before frame{index}')
                reference=np.frombuffer(r,dtype=np.uint8).astype(np.float64)
                actual=np.frombuffer(a,dtype=np.uint8).astype(np.float64)
                error=reference-actual;signal_energy=float(np.dot(reference,reference));error_energy=float(np.dot(error,error))
                centered_ref=reference-reference.mean();centered_actual=actual-actual.mean()
                ref_energy=float(np.dot(centered_ref,centered_ref));actual_energy=float(np.dot(centered_actual,centered_actual))
                correlation=(1. if a==r else float(np.dot(centered_ref,centered_actual)/math.sqrt(ref_energy*actual_energy))
                             if ref_energy and actual_energy else None)
                rows.append(dict(frame=index,source=str(path.relative_to(P)),normalized_pixel_correlation=correlation,
                                 exact_rgb_equal=a==r,rmse=math.sqrt(error_energy/size),
                                 snr_db=10*math.log10(signal_energy/error_energy) if error_energy>0 and signal_energy>0 else None,
                                 psnr_db=10*math.log10(255**2*size/error_energy) if error_energy>0 else None))
                total_signal+=signal_energy;total_error+=error_energy
                if index%300==0:job.update(state='correspondence',compared_frames=index+1);m.write(job_path,job)
            m.need(actual_proc.stdout.read(1)==reference_proc.stdout.read(1)==b'','actual/reference contains extra frames')
            actual_code=actual_proc.wait();reference_code=reference_proc.wait()
        finally:
            for process in (actual_proc,reference_proc):
                process.stdout.close()
                if process.poll() is None:process.terminate();process.wait()
    m.need(actual_code==reference_code==0 and not actual_log.read_text().strip() and not reference_log.read_text().strip(),
           'actual/reference ffmpeg decode error')
    record=dict(command=actual_command,reference_command=reference_command,cwd=str(P),exit_code=actual_code,
                reference_exit_code=reference_code,started_ns=started,ended_ns=time.time_ns(),
                log=str(actual_log.relative_to(P)),log_sha256=m.sha(actual_log),
                reference_log=str(reference_log.relative_to(P)),reference_log_sha256=m.sha(reference_log))
    m.write(m.Q/'logs/derived-draft-correspondence.json',record)
    failures=[row['frame'] for row in rows if row['normalized_pixel_correlation'] is None or row['normalized_pixel_correlation']<.99]
    correlations=[row['normalized_pixel_correlation'] for row in rows if row['normalized_pixel_correlation'] is not None]
    proof=dict(frames=len(rows),threshold=.99,metric='Pearson correlation of all RGB values per frame; both reference JPEG and actual H264 decoded by same FFmpeg RGB pipeline',
               constant_frame_rule='Exact RGB bytes score1; unequal zero-variance frames fail undefined',
               minimum_normalized_pixel_correlation=min(correlations),exact_rgb_equal_frames=sum(row['exact_rgb_equal'] for row in rows),
               aggregate_snr_db=10*math.log10(total_signal/total_error) if total_error else None,
               lossless_rgb_correspondence=total_error==0,failed_frames=failures,technical_pass=not failures and len(rows)==2493,
               decoder=record,frame_metrics=rows)
    m.write(m.Q/'draft-frame-correspondence.json',proof)
    m.need(proof['technical_pass'],'draft frame correspondence below.99')
    return proof


try:
    os.nice(max(0, 10 - os.getpriority(os.PRIO_PROCESS, 0)))
    env = m.environment()
    for key in ("OMP_NUM_THREADS", "OPENBLAS_NUM_THREADS", "MKL_NUM_THREADS"):
        os.environ[key] = "2"
    m.need(m.sha(P / "tools/finish_v6.py") == EXPECTED_TOOL, "reviewed tool changed")
    m.need(m.sha(m.Q / "source-snapshot.json") == EXPECTED_SOURCE, "source snapshot changed")
    m.accepted_source()
    frames_path = m.Q / "frames-provenance.json"
    frames = m.read(frames_path)
    m.need(frames["source_snapshot_sha256"] == EXPECTED_SOURCE, "frame export source mismatch")
    m.same_hashes(frames["output_hashes"])
    m.same_bundle(frames["bundle_manifest"])
    m.migrated_render_evidence(SOURCE, frames, "frames")
    for previous in (m.QC/"draft.mp4", m.Q/"draft-frame-order", m.Q/"draft-frame-order.json",
                     m.Q/"draft-frame-correspondence.json", m.Q/"draft-provenance.json"):
        m.archive_qc(previous)
    ordered = sorted((m.QC / "frames").glob("*.jpeg"),
                     key=lambda path: int(re.findall(r"\d+", path.stem)[-1]))
    numbers = [int(re.findall(r"\d+", path.stem)[-1]) for path in ordered]
    m.need(numbers in (list(range(2493)), list(range(1, 2494))), "frame sequence gap")
    m.need(set(m.hashes(ordered)) == set(frames["output_hashes"]), "unregistered frame in export")
    order_dir = m.Q / "draft-frame-order"
    order_dir.mkdir(exist_ok=True)
    m.need(not list(order_dir.iterdir()), "draft ordering directory already populated")
    manifest = []
    for index, path in enumerate(ordered):
        link = order_dir / f"f{index:04d}.jpeg"
        link.symlink_to(path.resolve())
        manifest.append(dict(frame=index, link=str(link.relative_to(P)),
                             source=str(path.relative_to(P)), sha256=m.sha(path)))
    m.write(m.Q / "draft-frame-order.json", dict(source_snapshot_sha256=EXPECTED_SOURCE,
                                                frames_provenance_sha256=m.sha(frames_path),
                                                frames=manifest))
    draft = m.QC / "draft.mp4"
    m.need(not draft.exists(), "draft output already exists; inspect before replacement")
    job.update(state="waiting_global_lock", frames=2493)
    m.write(job_path, job)
    with Path("/tmp/remotion-heavy-render.lock").open("a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        job.update(state="encoding")
        m.write(job_path, job)
        encode = m.run("derive-draft", ["/usr/bin/ffmpeg", "-v", "error", "-threads", "2",
                                       "-filter_threads", "1", "-filter_complex_threads", "1",
                                       "-framerate", "30", "-start_number", "0", "-i",
                                       order_dir / "f%04d.jpeg", "-map", "0:v:0", "-an",
                                       "-frames:v", "2493", "-c:v", "libx264", "-crf", "0",
                                       "-preset", "medium", "-pix_fmt", "yuvj420p", "-color_range", "pc", "-r", "30",
                                       "-threads", "2", "-movflags", "+faststart", draft])
        probe = m.probe_media(draft)
        video = next(row for row in probe["streams"] if row["codec_type"] == "video")
        m.need((video["width"], video["height"], video["avg_frame_rate"], int(video["nb_read_frames"])) ==
               (960, 540, "30/1", 2493), "draft dimensions/fps/count mismatch")
        m.need(abs(float(video["duration"]) - 83.1) < 0.0001, "draft duration mismatch")
        m.need(not any(row["codec_type"] == "audio" for row in probe["streams"]), "draft is not muted")
        m.write(m.Q / "draft-ffprobe.json", probe)
        proof = compare_frames(draft, ordered, env)
    m.accepted_source()
    m.same_hashes(frames["output_hashes"])
    m.same_bundle(frames["bundle_manifest"])
    evidence = [draft, m.Q / "draft-ffprobe.json", m.Q / "draft-frame-order.json",
                m.Q / "draft-frame-correspondence.json", P / encode["log"],
                m.Q / "logs/derive-draft.json", m.Q / "logs/derived-draft-correspondence.log",
                m.Q / "logs/derived-draft-correspondence.json", m.Q / "logs/derived-draft-reference.log", Path(__file__)]
    m.write(m.Q / "draft-provenance.json", dict(source_snapshot_sha256=EXPECTED_SOURCE,
                                               cache_migration_approval_sha256=SOURCE["cache_migration"]["approval_sha256"],
                                               bundle_manifest=frames["bundle_manifest"],
                                               render=encode, output_hashes=m.hashes(evidence),
                                               derived_from_frames_provenance_sha256=m.sha(frames_path),
                                               canonical_frame_export=frames["render"],
                                               fresh_b19_frame_provenance=frames["fresh_render_provenance"],
                                               full_canonical_draft_status="INTERRUPTED_EXIT143_NO_COMPLETED_OUTPUT",
                                               derivation="Muted fullrange H.264 CRF0 encoded from all2493 validated JPEG85 exports,2447 cache+46 new, numeric source order; lossless YUV preserves nearblack correspondence",
                                               authority="Lead approved derivation after foreground SIGTERM; all 84 QA sheets remain mandatory",
                                               correspondence_threshold=0.99))
    job.update(state="complete", exit_code=0, ended_ns=time.time_ns(), frames=2493,
               minimum_pixel_correlation=proof["minimum_normalized_pixel_correlation"],
               aggregate_snr_db=proof["aggregate_snr_db"], draft_sha256=m.sha(draft),
               draft_provenance_sha256=m.sha(m.Q / "draft-provenance.json"))
except BaseException as error:
    traceback.print_exc()
    job.update(state="failed", exit_code=1, ended_ns=time.time_ns(), error=str(error))
finally:
    m.write(job_path, job)
raise SystemExit(job["exit_code"])
