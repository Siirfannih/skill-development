from pathlib import Path
import importlib.util, fcntl, os, re, time, traceback
from types import SimpleNamespace
from PIL import Image
P=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location("finish_v6",P/"tools/finish_v6.py")
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
ALIAS=Path("/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/builder-v6")
job=dict(pid=os.getpid(),started_ns=time.time_ns(),state="preflight",source_snapshot_sha256="429142e6d3268f5f01f9d3d08cea627e6ca5a34037f3dc800f9a29c636a2f4af",supervisor_sha256=m.sha(__file__),tool_sha256=m.sha(P/"tools/finish_v6.py"),expected_frames=2493,project_alias=str(ALIAS))
m.write(m.Q/"fullframes-job.json",job)
try:
    os.nice(max(0,10-os.getpriority(os.PRIO_PROCESS,0)))
    m.need(m.sha(P/"tools/finish_v6.py")=="ba2cb4330dc2f36f32b8a317476bd1136518cc6d531581c287a0d4217290d2e0","reviewed tool changed")
    m.need(m.sha(m.Q/"source-snapshot.json")==job["source_snapshot_sha256"],"source snapshot changed")
    m.need(ALIAS.resolve()==P and os.stat(ALIAS).st_ino==P.stat().st_ino and os.stat(ALIAS).st_dev==P.stat().st_dev,"alias does not address the exact project inode")
    m.accepted_source()
    bundle=m.read(m.Q/"stills-provenance.json")["bundle_manifest"];m.same_bundle(bundle)
    m.archive_qc(m.QC/"frames");m.archive_qc(m.QC/"frame_audit")
    job.update(state="canonical_frames",frames_started_ns=time.time_ns());m.write(m.Q/"fullframes-job.json",job)
    record=m.run("render-frames",["bash",m.J/"render.sh",ALIAS,"frames","Main"])
    frames=list((m.QC/"frames").glob("*.jpeg"))
    m.need(len(frames)==2493,"frame sequence is incomplete")
    numbers=sorted(int(re.findall(r"\d+",f.stem)[-1]) for f in frames)
    m.need(numbers==list(range(2493)) or numbers==list(range(1,2494)),"frame sequence has a gap")
    m.need(all(f.stat().st_mtime_ns>=record["started_ns"] for f in frames),"sequence contains old frames")
    for path in frames:
        with Image.open(path) as image:m.need(image.size==(960,540),"wrong frame dimensions")
    text=(P/record["log"]).read_text()
    m.need(not re.search(r"GAGAL still|(?:status|HTTP)[^\n]*404|ERR_(?:FILE|NAME)_NOT_FOUND",text,re.I),"render asset failed")
    m.need(ALIAS.resolve()==P and os.stat(ALIAS).st_ino==P.stat().st_ino,"alias changed during render")
    m.accepted_source();m.same_bundle(bundle)
    m.write(m.Q/"frames-provenance.json",dict(source_snapshot_sha256=job["source_snapshot_sha256"],bundle_manifest=bundle,render=record,output_hashes=m.hashes(frames),alias_routing=m.read(m.Q/"frame-alias-route.json"),supervisor_sha256=m.sha(__file__)))
    job.update(state="waiting_audit_lock",frames_ended_ns=time.time_ns(),frames_provenance_sha256=m.sha(m.Q/"frames-provenance.json"));m.write(m.Q/"fullframes-job.json",job)
    with Path("/tmp/remotion-heavy-render.lock").open("a") as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        job.update(state="audit",audit_started_ns=time.time_ns());m.write(m.Q/"fullframes-job.json",job)
        m.audit(SimpleNamespace(stems=str(m.Q/"stems")))
    m.accepted_source();m.same_bundle(bundle)
    job.update(state="complete",exit_code=0,ended_ns=time.time_ns(),source_unchanged=True,frames=2493,chunks=9,sheets=84,audit_provenance_sha256=m.sha(m.Q/"audit-provenance.json"))
except BaseException as error:
    traceback.print_exc();job.update(state="failed",exit_code=1,ended_ns=time.time_ns(),error=str(error))
finally:m.write(m.Q/"fullframes-job.json",job)
raise SystemExit(job["exit_code"])
