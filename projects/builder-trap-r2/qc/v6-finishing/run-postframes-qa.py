from pathlib import Path
import importlib.util, fcntl, os, subprocess, time, traceback
P=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location("finish_v6",P/"tools/finish_v6.py")
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
job=dict(pid=os.getpid(),started_ns=time.time_ns(),state="waiting_fullframes_and_audit",source_snapshot_sha256="429142e6d3268f5f01f9d3d08cea627e6ca5a34037f3dc800f9a29c636a2f4af",supervisor_sha256=m.sha(__file__))
m.write(m.Q/"postframes-job.json",job)
try:
    os.nice(max(0,10-os.getpriority(os.PRIO_PROCESS,0)))
    while True:
        status=m.read(m.Q/"fullframes-job.json")
        m.need(status["pid"]==1025306,"unexpected frame supervisor")
        m.need(status["state"]!="failed","canonical frame/audit failed: "+status.get("error",""))
        if status["state"]=="complete":break
        time.sleep(5)
    m.need(m.sha(m.Q/"source-snapshot.json")==job["source_snapshot_sha256"],"source snapshot changed")
    m.accepted_source()
    command=[str(m.PY),str(m.Q/"derive-draft-from-frames.py")]
    log=m.Q/"derived-draft-supervisor.log"
    with log.open("w") as stdout:
        proc=subprocess.Popen(command,cwd=P,env=m.environment(),stdin=subprocess.DEVNULL,stdout=stdout,stderr=subprocess.STDOUT)
        job.update(state="derived_draft",derived_pid=proc.pid,derived_started_ns=time.time_ns(),command=command)
        m.write(m.Q/"postframes-job.json",job)
        code=proc.wait()
    job.update(derived_exit_code=code,derived_log_sha256=m.sha(log))
    m.write(m.Q/"postframes-job.json",job)
    m.need(code==0,"JPEG-derived draft or correspondence failed")
    source=m.accepted_source()
    job.update(state="waiting_density_lock");m.write(m.Q/"postframes-job.json",job)
    with Path("/tmp/remotion-heavy-render.lock").open("a") as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        job.update(state="actual_sfx_density");m.write(m.Q/"postframes-job.json",job)
        density=m.run("sfx-density",[m.PY,m.G/"sfx_density.py",m.QC/"draft.mp4",P/source["cues"],"--objects",P/source["objects"],"--json",m.Q/"sfx-density.json"])
    m.accepted_source();m.same_bundle(m.read(m.Q/"frames-provenance.json")["bundle_manifest"])
    job.update(state="complete",exit_code=0,ended_ns=time.time_ns(),source_unchanged=True,frames=2493,chunks=9,sheets=84,draft_provenance_sha256=m.sha(m.Q/"draft-provenance.json"),density=density,final_render_started=False)
except BaseException as error:
    traceback.print_exc();job.update(state="failed",exit_code=1,ended_ns=time.time_ns(),error=str(error))
finally:m.write(m.Q/"postframes-job.json",job)
raise SystemExit(job["exit_code"])
