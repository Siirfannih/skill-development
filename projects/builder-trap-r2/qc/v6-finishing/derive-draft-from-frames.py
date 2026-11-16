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
EXPECTED_SOURCE = "429142e6d3268f5f01f9d3d08cea627e6ca5a34037f3dc800f9a29c636a2f4af"
EXPECTED_TOOL = "ba2cb4330dc2f36f32b8a317476bd1136518cc6d531581c287a0d4217290d2e0"
job = dict(pid=os.getpid(), started_ns=time.time_ns(), state="preflight",
           source_snapshot_sha256=EXPECTED_SOURCE, supervisor_sha256=m.sha(__file__))
job_path = m.Q / "derived-draft-job.json"
m.write(job_path, job)


def compare_frames(draft, ordered, env):
    import numpy as np
    from PIL import Image

    command = ["/usr/bin/ffmpeg", "-v", "error", "-threads", "2", "-filter_threads", "1",
               "-i", str(draft), "-map", "0:v:0", "-an", "-fps_mode", "passthrough",
               "-pix_fmt", "rgb24", "-threads", "2", "-f", "rawvideo", "pipe:1"]
    log = m.Q / "logs/derived-draft-correspondence.log"
    started = time.time_ns()
    rows = []
    total_signal, total_error = 0.0, 0.0
    size = 960 * 540 * 3
    with log.open("wb") as stderr:
        proc = subprocess.Popen(command, cwd=P, env=env, stdout=subprocess.PIPE, stderr=stderr)
        try:
            for index, path in enumerate(ordered):
                raw = proc.stdout.read(size)
                m.need(len(raw) == size, f"decoded draft ended before frame {index}")
                with Image.open(path) as image:
                    reference = np.asarray(image.convert("RGB"), dtype=np.float64).ravel()
                actual = np.frombuffer(raw, dtype=np.uint8).astype(np.float64)
                error = reference - actual
                signal_energy = float(np.dot(reference, reference))
                error_energy = float(np.dot(error, error))
                centered_ref = reference - reference.mean()
                centered_actual = actual - actual.mean()
                ref_energy = float(np.dot(centered_ref, centered_ref))
                actual_energy = float(np.dot(centered_actual, centered_actual))
                if error_energy == 0:
                    correlation = 1.0
                elif ref_energy == 0 or actual_energy == 0:
                    correlation = None
                else:
                    correlation = float(np.dot(centered_ref, centered_actual) /
                                        math.sqrt(ref_energy * actual_energy))
                rows.append(dict(frame=index, source=str(path.relative_to(P)),
                                 normalized_pixel_correlation=correlation,
                                 rmse=math.sqrt(error_energy / size),
                                 snr_db=10 * math.log10(signal_energy / error_energy)
                                 if error_energy > 0 and signal_energy > 0 else None,
                                 psnr_db=10 * math.log10(255 ** 2 * size / error_energy)
                                 if error_energy > 0 else None))
                total_signal += signal_energy
                total_error += error_energy
                if index % 300 == 0:
                    job.update(state="correspondence", compared_frames=index + 1)
                    m.write(job_path, job)
            m.need(proc.stdout.read(1) == b"", "decoded draft contains extra frames")
            exit_code = proc.wait()
        finally:
            proc.stdout.close()
            if proc.poll() is None:
                proc.terminate()
                proc.wait()
    record = dict(command=command, cwd=str(P), exit_code=exit_code, started_ns=started,
                  ended_ns=time.time_ns(), log=str(log.relative_to(P)), log_sha256=m.sha(log))
    m.write(m.Q / "logs/derived-draft-correspondence.json", record)
    m.need(exit_code == 0 and not log.read_text().strip(), "draft decode reported an error")
    failures = [row["frame"] for row in rows if row["normalized_pixel_correlation"] is None or
                row["normalized_pixel_correlation"] < 0.99]
    correlations = [row["normalized_pixel_correlation"] for row in rows
                    if row["normalized_pixel_correlation"] is not None]
    proof = dict(frames=len(rows), threshold=0.99, metric="Pearson correlation of all RGB channel values, per frame",
                 constant_frame_rule="Exact pixels score 1; unequal zero-variance frames fail as undefined",
                 minimum_normalized_pixel_correlation=min(correlations) if correlations else None,
                 aggregate_snr_db=10 * math.log10(total_signal / total_error) if total_error else None,
                 failed_frames=failures, technical_pass=not failures and len(rows) == 2493,
                 decoder=record, frame_metrics=rows)
    m.write(m.Q / "draft-frame-correspondence.json", proof)
    m.need(proof["technical_pass"], "one or more draft frames fail correspondence >=0.99")
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
                                       "-frames:v", "2493", "-c:v", "libx264", "-crf", "28",
                                       "-preset", "medium", "-pix_fmt", "yuv420p", "-r", "30",
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
                m.Q / "logs/derived-draft-correspondence.json", Path(__file__)]
    m.write(m.Q / "draft-provenance.json", dict(source_snapshot_sha256=EXPECTED_SOURCE,
                                               bundle_manifest=frames["bundle_manifest"],
                                               render=encode, output_hashes=m.hashes(evidence),
                                               derived_from_frames_provenance_sha256=m.sha(frames_path),
                                               canonical_frame_export=frames["render"],
                                               full_canonical_draft_status="INTERRUPTED_EXIT143_NO_COMPLETED_OUTPUT",
                                               derivation="Muted H.264 CRF28 playback encoded from all 2493 canonical JPEG85 frame exports in numeric source order",
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
