from pathlib import Path
import fcntl
import importlib.util
import os
import re
import time
import traceback
from PIL import Image, ImageStat

P = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("finish", P / "tools/finish_v6.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
ALIAS = Path("/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/builder-v6")
job = dict(pid=os.getpid(), started_ns=time.time_ns(), state="preflight",
           source_snapshot_sha256="429142e6d3268f5f01f9d3d08cea627e6ca5a34037f3dc800f9a29c636a2f4af",
           supervisor_sha256=m.sha(__file__), source_frames=[1800, 2492], concurrency=1)
m.write(m.Q / "tail-repair-job.json", job)
try:
    os.nice(max(0, 10 - os.getpriority(os.PRIO_PROCESS, 0)))
    m.need(m.sha(m.Q / "source-snapshot.json") == job["source_snapshot_sha256"], "snapshot changed")
    m.accepted_source()
    head = m.read(m.Q / "first6-preservation.json")
    m.same_hashes(head["hashes"])
    original = m.read(m.Q / "frames-provenance.json")
    bundle = original["bundle_manifest"]
    m.same_bundle(bundle)
    route = m.read(m.Q / "tail-repair-route.json")
    out = P / route["output_root"]
    repairs, newfiles, measurements = [], [], []
    with Path("/tmp/remotion-heavy-render.lock").open("a") as lock:
        job.update(state="waiting_global_lock")
        m.write(m.Q / "tail-repair-job.json", job)
        fcntl.flock(lock, fcntl.LOCK_EX)
        for a, b in [(1800, 2099), (2100, 2399), (2400, 2492)]:
            target = out / f"f{a}-{b}"
            target.mkdir()
            tmp = m.TMP / f"repair-{a}-{b}-{time.time_ns()}"
            tmp.mkdir()
            command = ["env", "TMPDIR=" + str(tmp), m.Q / "runtime-bin/npx", "remotion", "render",
                       ALIAS / "qc/.bundle", "Main", ALIAS / target.relative_to(P), "--sequence",
                       "--image-format=jpeg", "--jpeg-quality=85", "--scale=0.5", "--concurrency=1",
                       f"--frames={a}-{b}", "--log=verbose"]
            job.update(state="rendering_chunk", range=[a, b], chunk_started_ns=time.time_ns())
            m.write(m.Q / "tail-repair-job.json", job)
            record = m.run(f"render-tail-{a}-{b}", command, cwd=m.R)
            paths = sorted(target.glob("*.jpeg"))
            numbers = [int(re.findall(r"\d+", f.stem)[-1]) for f in paths]
            m.need(numbers == list(range(a, b + 1)), "chunk numbering/count mismatch")
            uniform = []
            for path, frame in zip(paths, numbers):
                with Image.open(path) as image:
                    m.need(image.size == (960, 540), "chunk dimensions mismatch")
                    stat = ImageStat.Stat(image)
                    flat = all(lo == hi for lo, hi in stat.extrema)
                    if flat:
                        uniform.append(frame)
                    measurements.append(dict(frame=frame, mean=stat.mean, std=stat.stddev,
                                             uniform=flat, sha256=m.sha(path)))
                m.need(path.stat().st_mtime_ns >= record["started_ns"], "chunk contains stale output")
            m.need(uniform == ([2492] if b == 2492 else []), "unexpected uniform repaired frames: " + str(uniform))
            m.same_hashes(head["hashes"])
            m.accepted_source()
            m.same_bundle(bundle)
            repairs.append(dict(start=a, end=b, render=record, output_hashes=m.hashes(paths),
                                tmpdir=str(tmp), browser_recycled_after_chunk=True))
            newfiles.extend(paths)
            m.write(out / "chunk-provenance.json", dict(source_snapshot_sha256=job["source_snapshot_sha256"],
                                                        bundle_manifest=bundle, repairs=repairs))
            job.update(last_completed_range=[a, b], completed_frames=len(newfiles),
                       last_chunk_seconds=(record["ended_ns"] - record["started_ns"]) / 1e9)
            m.write(m.Q / "tail-repair-job.json", job)
    m.write(out / "actual-frame-metrics.json", dict(measurements=measurements, uniform_exception=[2492],
                                                   exception_authority="Lead: final EndFade alpha1; continuous last15-frame fade must be reviewed",
                                                   last15_fade_frames=[r for r in measurements if r["frame"] >= 2478]))
    job.update(state="exports_complete_hold_for_install", exit_code=0, ended_ns=time.time_ns(),
               output_root=str(out.relative_to(P)), repaired_frames=len(newfiles), first6_unchanged=True)
except BaseException as error:
    traceback.print_exc()
    job.update(state="failed", exit_code=1, ended_ns=time.time_ns(), error=str(error))
finally:
    m.write(m.Q / "tail-repair-job.json", job)
raise SystemExit(job["exit_code"])
