from pathlib import Path
import importlib.util, fcntl, os, time, traceback
P=Path(__file__).resolve().parents[3]
spec=importlib.util.spec_from_file_location("finish_v6",P/"tools/finish_v6.py")
m=importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
T=m.Q/"b25-temporal"
job=dict(pid=os.getpid(), started_ns=time.time_ns(), state="preflight", source_snapshot_sha256=m.sha(m.Q/"source-snapshot.json"), supervisor_sha256=m.sha(__file__), source_frames=[2300,2355], expected_frames=56)
m.write(T/"job.json",job)
try:
    os.nice(max(0,10-os.getpriority(os.PRIO_PROCESS,0)))
    m.accepted_source()
    bundle=m.read(m.Q/"stills-provenance.json")["bundle_manifest"]
    m.same_bundle(bundle)
    target=m.QC/"draft_2300-2355.mp4"
    m.need(not target.exists(),"range output already exists")
    job.update(state="waiting_global_lock")
    m.write(T/"job.json",job)
    with Path("/tmp/remotion-heavy-render.lock").open("a") as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        job.update(state="rendering",lock_acquired_ns=time.time_ns())
        m.write(T/"job.json",job)
        record=m.run("render-b25-range",["bash",m.J/"render.sh",m.P,"draft","Main","2300-2355"])
    probe=m.probe_media(target)
    video=next(row for row in probe["streams"] if row["codec_type"]=="video")
    m.need((video["width"],video["height"],video["avg_frame_rate"],int(video["nb_read_frames"]))==(960,540,"30/1",56),"range dimensions/fps/count mismatch")
    m.need(not any(row["codec_type"]=="audio" for row in probe["streams"]),"range is not muted")
    m.accepted_source()
    m.same_bundle(bundle)
    m.write(T/"range-ffprobe.json",probe)
    provenance=dict(source_snapshot_sha256=job["source_snapshot_sha256"],bundle_manifest=bundle,render=record,output_hashes=m.hashes([target]),source_frame_mapping="decoded n=0..55 maps exactly to source f2300..2355",project_accepted=False,review_status="PENDING_LEAD")
    m.write(T/"range-provenance.json",provenance)
    job.update(state="complete",exit_code=0,ended_ns=time.time_ns(),source_unchanged=True,output=str(target.relative_to(m.P)))
except BaseException as error:
    traceback.print_exc()
    job.update(state="failed",exit_code=1,ended_ns=time.time_ns(),error=str(error))
finally:
    m.write(T/"job.json",job)
raise SystemExit(job["exit_code"])
