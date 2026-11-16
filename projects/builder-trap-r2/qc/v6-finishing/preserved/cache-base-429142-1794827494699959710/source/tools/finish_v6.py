#!/usr/bin/env python3
"""Project-scoped v6 acceptance and rendering; canonical FAIL stays FAIL."""
from __future__ import annotations

import argparse
import copy
import fcntl
import hashlib
import importlib.util
import json
import math
import os
from pathlib import Path
import re
import subprocess
import sys
import time

P = Path(__file__).resolve().parents[1]
ROOT = P.parents[1]
V = P / "edit/v6"
R = P / "remotion"
QC = P / "qc"
Q = QC / "v6-finishing"
G = ROOT / "claude/motion-graphic/scripts/gate"
J = ROOT / "claude/motion-graphic/scripts/juri"
PY = Path("/home/irfan/work/mg-venv/bin/python")
TMP = Path("/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/tmp/finishing-v6")
FPS, N, SAMPLES = 30, 2493, 3988800
MEDIA = {".mp4", ".wav", ".mp3", ".jpg", ".jpeg", ".png", ".svg", ".woff", ".woff2", ".ttf", ".otf"}


class Blocked(RuntimeError):
    pass


def need(condition, message):
    if not condition:
        raise Blocked(message)


def read(path):
    return json.loads(Path(path).read_text())


def write(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def sha(path):
    h = hashlib.sha256()
    with Path(path).open("rb") as handle:
        for block in iter(lambda: handle.read(1 << 20), b""):
            h.update(block)
    return h.hexdigest()


def hashes(paths):
    out = {}
    for path in sorted(set(Path(p) for p in paths)):
        need(path.is_file(), f"missing input: {path}")
        out[str(path.relative_to(P)) if path.is_relative_to(P) else str(path)] = sha(path)
    return out


def same_hashes(snapshot):
    changed = []
    for name, expected in snapshot.items():
        path = P / name
        if not path.is_file() or sha(path) != expected:
            changed.append(name)
    need(not changed, "changed or missing inputs: " + ", ".join(changed))


def environment():
    TMP.mkdir(parents=True, exist_ok=True)
    runtime = Q / "runtime-bin"
    runtime.mkdir(parents=True, exist_ok=True)
    wrapper = runtime / "ffmpeg"
    wrapper.write_text('#!/bin/sh\nexec /usr/bin/ffmpeg -threads 2 -filter_threads 1 -filter_complex_threads 1 "$@"\n')
    wrapper.chmod(0o755)
    preload = runtime / "remotion-thread-limits.cjs"
    preload.write_text(
        "const {Config}=require(" + json.dumps(str(R / "node_modules/@remotion/cli/dist/config/index.js")) + ");\n"
        "Config.overrideFfmpegCommand(({args})=>['-threads','2','-filter_threads','1','-filter_complex_threads','1',"
        "...args.slice(0,-1),'-threads','2',args[args.length-1]]);\n")
    env = dict(os.environ, TMPDIR=str(TMP), KONKURENSI="2", PYTHON=str(PY),
               OMP_NUM_THREADS="2", OPENBLAS_NUM_THREADS="2", MKL_NUM_THREADS="2",
               PATH=str(runtime) + os.pathsep + os.environ["PATH"],
               NODE_OPTIONS=(os.environ.get("NODE_OPTIONS", "") + " --require=" + str(preload)).strip())
    return env


def run(name, command, cwd=P, allowed=(0,)):
    log = Q / "logs" / f"{name}.log"
    log.parent.mkdir(parents=True, exist_ok=True)
    started = time.time_ns()
    with log.open("w") as handle:
        result = subprocess.run([str(q) for q in command], cwd=cwd, env=environment(),
                                stdout=handle, stderr=subprocess.STDOUT)
    record = dict(command=[str(q) for q in command], cwd=str(cwd), exit_code=result.returncode,
                  started_ns=started, ended_ns=time.time_ns(), log=str(log.relative_to(P)),
                  log_sha256=sha(log))
    write(Q / "logs" / f"{name}.json", record)
    print(f"{name}: exit {result.returncode} ({log.relative_to(P)})", flush=True)
    need(result.returncode in allowed, f"{name} failed; see {log}")
    return record


def module(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def rounded(x):
    return math.floor(x + 0.5)


def scene_plan():
    knots = read(R / "src/data/knots_v6.json")
    need(knots["dur_frames"] == N, "duration changed")
    points = knots["knots"]
    need(all(a[0] < b[0] and a[1] <= b[1] for a, b in zip(points, points[1:])),
         "scene warp is not monotonic")

    def warp(f):
        x = f / FPS
        if x <= points[0][0]:
            return rounded((points[0][1] + x - points[0][0]) * FPS)
        if x >= points[-1][0]:
            return rounded((points[-1][1] + x - points[-1][0]) * FPS)
        for a, b in zip(points, points[1:]):
            if a[0] <= x < b[0]:
                return rounded((a[1] + (x - a[0]) / (b[0] - a[0]) * (b[1] - a[1])) * FPS)
        raise Blocked("unmapped frame")

    warped = [warp(f) for f in range(N)]
    node_source = """
const fs=require('fs'),path=require('path'),ts=require(process.argv[1]+'/node_modules/typescript');
const file=process.argv[1]+'/src/engine/timewarp.ts';
const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
const mod={exports:{}};
new Function('require','module','exports',js)((name)=>JSON.parse(fs.readFileSync(path.resolve(path.dirname(file),name),'utf8')),mod,mod.exports);
process.stdout.write(JSON.stringify(Array.from({length:2493},(_,f)=>mod.exports.W(f))));
"""
    actual = subprocess.run(["node", "-e", node_source, str(R)], capture_output=True, text=True)
    need(actual.returncode == 0 and json.loads(actual.stdout) == warped,
         "Python cut/still mapping differs from actual TypeScript W on one or more frames")

    def first(old):
        return next((f for f, value in enumerate(warped) if value >= old), N)

    beats = read(R / "src/data/plan.json")["beats"]
    constants = {}
    for beat in beats:
        constants["F_" + beat["id"]] = [rounded(t * FPS) for t in beat["t"]]
    sources = sorted((R / "src/scenes").glob("Act*.text.ts"))
    for path in sources:
        text = path.read_text()
        for name, a, b in re.findall(r"export const (F_\w+)(?:\s*:\s*\[number, number\])?\s*=\s*\[(\d+),\s*(\d+)\]", text):
            constants[name] = [int(a), int(b)]
        for name, value in re.findall(r"export const (F_\w+)\s*=\s*(\d+)\s*;", text):
            constants[name] = int(value)

    def value(expr):
        expr = expr.strip()
        if expr.isdigit():
            return int(expr)
        match = re.fullmatch(r"(F_\w+)(?:\[([01])\])?", expr)
        need(match is not None, "unrecognized scene boundary: " + expr)
        found = constants[match[1]]
        return found[int(match[2])] if match[2] is not None else found

    scenes = []
    for path in sorted((R / "src/scenes").glob("Act*.tsx")):
        for ident, label, a, b in re.findall(r"\{ id: '(S-[^']+)', beats: '([^']+)', from: ([^,]+), to: ([^,]+),", path.read_text()):
            scenes.append(dict(id=ident, beat=label, old=[value(a), value(b)],
                               real=[first(value(a)), first(value(b))]))
    need(len(scenes) >= 26, "scene registry incomplete")
    intervals = []
    for beat in beats:
        ident = beat["id"]
        old = constants["F_" + ident]
        if ident in ("B01", "B02", "B03"):
            old = [rounded(t * FPS) for t in beat["t"]]
            if ident == "B03":
                old[1] = constants["F_ARCH"][1]
        real = [first(old[0]), first(old[1])]
        if ident == "B26":
            real[1] = N
        need(real[0] < real[1], "empty beat: " + ident)
        intervals.append(dict(id=ident, old=old, real=real,
                              still=rounded((real[0] + real[1] - 1) / 2)))
    need(len(intervals) == 26 and intervals[0]["real"][0] == 0 and intervals[-1]["real"][1] == N,
         "beat plan does not cover all 2493 frames")
    # Actual scene entries override rounded PLAN edges in this inherited edit.
    for row in intervals:
        selected = [s for s in scenes if s["beat"] == row["id"]]
        if selected:
            row["real"] = [min(s["real"][0] for s in selected), max(s["real"][1] for s in selected)]
            row["still"] = rounded(sum(row["real"]) / 2 - 0.5)
    intervals[-1]["real"][1] = N
    overrides = {"B08": 440, "B12": 915, "B13": 1032, "B20": 1617}
    for row in intervals:
        if row["id"] in overrides:
            row["still"] = overrides[row["id"]]
        need(row["real"][0] <= row["still"] < row["real"][1], "still outside beat " + row["id"])
    cuts = sorted({0, N} | {s["real"][i] for s in scenes for i in (0, 1)} |
                  {s["real"][i] for s in intervals for i in (0, 1)})
    critical = [433, 442, 445, 448, 451, 454, 457, 460, 466, 473, 476, 486,
                545, 552, 560, 651, 701, 710, 770, 849, 861, 868, 925, 989,
                993, 999, 1000, 1014, 1028, 1051, 1058, 1535, 1555, 1575,
                1594, 1635, 1646, 1650, 1659, 1672, 1688, 2337, 2338, 2339]
    stills = [{"label": row["id"], "frame": row["still"]} for row in intervals]
    stills += [{"label": f"critical-f{f:04d}", "frame": f} for f in critical]
    text = " ".join(f'{row["id"]}:{row["real"][0]}-{row["real"][1]}' for row in intervals) + "\n"
    (P / "handoff/beats_v6_frames.txt").write_text(text)
    write(Q / "cuts_v6.json", cuts)
    result = dict(fps=FPS, frames=N, beats=intervals, scenes=scenes, stills=stills,
                  cuts_exclude_face_source_joins=True,
                  input_hashes=hashes(sources + [R / "src/data/plan.json", R / "src/data/knots_v6.json"] +
                                      [R / "src/engine/timewarp.ts", R / "src/engine/scenes.ts"] +
                                      list((R / "src/scenes").glob("Act*.tsx"))))
    write(Q / "plan.json", result)
    print(f"plan: 26 beats, {len(stills)} stills, {len(cuts)} intentional boundaries", flush=True)
    return result


def voice_check():
    proof = read(V / "adjudications.json")
    contract = read(V / "timing-contract.json")
    verifier = module(V / "verify_adjudications.py", "v6_adjudications")
    failures = verifier.verify(proof)
    write(Q / "adjudication-check.json", dict(artifact_count=len(proof["sha256"]), failures=failures,
                                               evidence_snapshot_pass=not failures,
                                               canonical_pass=False, audio_order_pass=False))
    need(not failures, "adjudication snapshot: " + "; ".join(failures))
    need(len(proof["sha256"]) >= 176, "accepted artifact inventory incomplete")
    need(not proof["pending_user_decisions"], "pending voice decision")
    need(not proof["canonical_pass"] and not proof["audio_order_pass"] and not proof["legacy_order_modified"],
         "project acceptance represented as canonical PASS")
    need(contract["fps"] == FPS and contract["duration_frames"] == N and
         contract["audio_samples"] == SAMPLES and contract["no_time_stretch"], "timing contract mismatch")
    same_hashes(contract["sha256"])
    r032 = proof["r032_exception"]
    need(r032["id"] == "R-032" and r032["raw_removed_window"] == [105.65, 107.15] and
         r032["output_join_frame"] == 2338 and r032["fade_samples"] == 144 and
         r032["canonical_failure"] == "guard Apa@89.823333: <0.05s", "R-032 scope changed")
    need(proof["normal_cut_min_source_guard_ms"] >= 50, "another source guard is unsafe")
    need(proof["voice_level_deviation"]["status"] == "accepted_by_user_R033", "R-033 authority missing")
    provenance = read(V / "voice_clean.provenance.json")
    need(provenance["voice_clean_sha256"] == sha(V / "voice_clean.wav"), "voice provenance stale")
    need(provenance["samples"] == SAMPLES and provenance["frames"] == N and provenance["latency_pass"],
         "voice frame or latency proof failed")
    need(all(row["gain_db"] >= 0 for row in provenance["phrase_gain"]), "a source phrase was attenuated")
    need(all(abs(row["lag_samples"]) <= 48 for row in provenance["measurements_after"]), "voice latency >1 ms")
    import soundfile as sf
    info = sf.info(V / "voice_clean.wav")
    need(info.samplerate == 48000 and info.channels == 1 and info.frames == SAMPLES, "voice file format mismatch")
    negative = []
    for name, mutate in [("changed voice hash", lambda d: d["sha256"].__setitem__("edit/v6/voice_clean.wav", "0" * 64)),
                         ("missing disposition", lambda d: d["canonical_findings_dispositions"].pop())]:
        bad = copy.deepcopy(proof)
        mutate(bad)
        rejected = verifier.verify(bad)
        negative.append(dict(case=name, rejected=bool(rejected), failures=rejected))
    write(Q / "adjudication-negative-checks.json", negative)
    need(all(row["rejected"] for row in negative), "negative adjudication check did not fail closed")
    canonical = Q / "canonical"
    canonical.mkdir(parents=True, exist_ok=True)
    baseline = read(V / "canonical-gates.json")
    recorded = {row["gate"]: row for row in baseline["results"]}
    commands = [
        ("source_guard", [PY, G / "cut_check.py", V / "voice_clean.wav", V / "words_mapped.json",
                          "--source-words", V / "words_source.json", "--map", V / "map.json",
                          "--validation-out", canonical / "source-validation.json"]),
        ("cut_check", [PY, G / "cut_check.py", V / "voice_clean.wav", V / "words_mapped.json",
                       "--suggest", canonical / "suggestions.json"]),
        ("pause_clean", [PY, G / "pause_clean.py", V / "voice_clean.wav", V / "words_mapped.json"]),
        ("voice_level", [PY, G / "voice_level.py", V / "suara.wav", V / "voice_clean.wav"]),
    ]
    before = hashes([V / "adjudications.json", V / "timing-contract.json", V / "voice_clean.wav"])
    results = []
    for name, command in commands:
        record = run("canonical-" + name, command, allowed=(0, 1))
        actual = (P / record["log"]).read_text()
        expected = recorded[name]["stdout"] + recorded[name]["stderr"]
        if name == "cut_check":
            actual = actual.replace(str(canonical / "suggestions.json"), str(V / "canonical-suggestions.json"))
        need(record["exit_code"] == proof["canonical_gate_exits"][name] and actual == expected,
             "new or changed canonical finding: " + name)
        results.append(record)
    source = read(canonical / "source-validation.json")
    need(not source["pass_"] and source["failures"] == [r032["canonical_failure"]], "new source validation failure")
    level_log = (P / results[-1]["log"]).read_text()
    need(len(re.findall(r"^FAIL:", level_log, re.M)) == 1 and
         re.search(r"^FAIL: pelan [-\d.]+ LUFS < -17 \(redam noise dulu, lalu gain naik bersih\)$", level_log, re.M),
         "voice level has a failure outside R-033")
    run("canonical-capture", [PY, V / "capture_cut.py", G / "cut_check.py", canonical / "findings.json",
                              V / "voice_clean.wav", V / "words_mapped.json"], allowed=(1,))
    need(read(canonical / "findings.json") == read(V / "canonical-findings.json"), "full finding inventory changed")
    original_order = P / "audio/ORDER.json"
    order_hash = sha(original_order) if original_order.is_file() else None
    order_result = run("canonical-audio_order", [PY, G / "audio_order.py", "check", "--dir", P / "audio"], allowed=(0, 1))
    need((sha(original_order) if original_order.is_file() else None) == order_hash, "canonical ORDER changed")
    need(order_result["exit_code"] == 1, "canonical audio_order result changed; lead must reevaluate path")
    same_hashes(before)
    result = dict(project_voice_accepted=True, canonical_pass=False, audio_order_pass=False,
                  canonical_results=results, audio_order_result=order_result,
                  artifact_count=len(proof["sha256"]), input_hashes=before,
                  exception_ids=["R-032", "R-033"], order_sha256=order_hash)
    write(Q / "voice-acceptance.json", result)
    return result


def input_files(mix, cues, objects):
    paths = list((R / "src").rglob("*"))
    paths = [path for path in paths if path.is_file()]
    paths += [P / "RESEP.md", P / "DECISIONS.md", QC / "revisi.json", V / "adjudications.json",
              V / "timing-contract.json", V / "voice_clean.provenance.json", V / "voice_clean.wav",
              V / "face_edit_v6.mp4", V / "map.json", V / "words_mapped.json", V / "visual-events.json",
              mix, cues, objects]
    paths += [P / relative for relative in read(V / "adjudications.json")["sha256"]]
    for path in (R / "public").iterdir():
        need(path.exists(), "broken public link: " + str(path))
        if path.name == "v6":
            continue
        if path.is_file() and path.suffix.lower() in MEDIA:
            paths.append(path)
        elif path.is_dir():
            paths += [child for child in path.rglob("*") if child.is_file() and child.suffix.lower() in MEDIA]
    paths += [J / name for name in ("render.sh", "frame_audit.py", "resep_check.py", "motion_lint.py",
                                   "audio_bus_check.py", "balance_check.py")]
    paths += [G / "sfx_density.py", Path(__file__).resolve(),
              Q / "runtime-bin/ffmpeg", Q / "runtime-bin/remotion-thread-limits.cjs"]
    return paths


def basic_visual():
    run("resep", [PY, J / "resep_check.py", P / "RESEP.md"], cwd=ROOT)
    basis = read(QC / "revisi.json")["basis"]
    diff = subprocess.run(["git", "diff", "--name-only", "--relative", basis, "--", "src"],
                          cwd=R, capture_output=True, text=True)
    need(diff.returncode == 0, "revision scope cannot be resolved")
    changed = {R / name for name in diff.stdout.splitlines()}
    # git diff omits new source files; they are part of this revision too.
    new = subprocess.run(["git", "ls-files", "--others", "--exclude-standard", "src"],
                         cwd=R, capture_output=True, text=True)
    need(new.returncode == 0, "new revision files cannot be resolved")
    changed.update(R / name for name in new.stdout.splitlines())
    need(changed, "empty revision motion scope")
    write(Q / "motion-scope.json", dict(basis=basis, files=[str(p.relative_to(P)) for p in sorted(changed)]))
    run("motion-lint", [PY, J / "motion_lint.py", R / "src", "--hanya", *sorted(changed)])
    run("audio-bus", [PY, J / "audio_bus_check.py", R / "src"])
    bus, bad = module(J / "audio_bus_check.py", "audio_bus").check(R / "src")
    need(not bad and len(bus) == 1 and bus[0] == R / "src/Main.tsx", "exactly one root audio bus required")
    text = bus[0].read_text()
    need(len(re.findall(r"<\s*(?:Audio|Html5Audio|OffthreadAudio)\b", text)) == 1, "root has multiple audio tags")
    run("typecheck", ["node", R / "node_modules/typescript/bin/tsc", "--noEmit", "-p", R / "tsconfig.json"])


def snapshot(args):
    voice = voice_check()
    basic_visual()
    mix, cues, objects = [Path(q).resolve() for q in (args.mix, args.cues, args.objects)]
    need(all(q.is_relative_to(P) and q.is_file() for q in (mix, cues, objects)), "audio final files must be inside project")
    import soundfile as sf
    info = sf.info(mix)
    need(info.samplerate == 48000 and info.frames == SAMPLES, "mix is not 83.1 seconds /48k")
    need(sha(V / "voice_clean.wav") == args.voice_sha256, "final VO hash differs from lead/builder signal")
    main = (R / "src/Main.tsx").read_text()
    audio_path = re.search(r"<Audio\s+src=\{staticFile\(['\"]([^'\"]+)['\"]\)\}", main)
    need(audio_path is not None, "root audio source cannot be verified")
    public_audio = R / "public" / audio_path[1]
    need(public_audio.is_file() and sha(public_audio) == sha(mix), "root bus does not use approved final mix")
    wallpaper = R / "public/wall_mac.jpg"
    need(not wallpaper.is_symlink() and sha(wallpaper) == "914c81f22258c49b742d3457bfe20778857ae6bdfdbc5e9830ca0d13166b92f2",
         "desktop wallpaper is not the verified local source-identical copy")
    plan = scene_plan()
    result = dict(schema_version=1, created_ns=time.time_ns(), frames=N, fps=FPS,
                  mix=str(mix.relative_to(P)), cues=str(cues.relative_to(P)), objects=str(objects.relative_to(P)),
                  voice_acceptance_sha256=sha(Q / "voice-acceptance.json"),
                  voice_sha256=args.voice_sha256, canonical_pass=False, audio_order_pass=False,
                  input_hashes=hashes(input_files(mix, cues, objects)),
                  plan_sha256=sha(Q / "plan.json"), still_count=len(plan["stills"]))
    write(Q / "source-snapshot.json", result)
    # render.sh's timestamp scan does not follow public symlink targets. Force a
    # new bundle after the exact accepted media snapshot, without altering source.
    stamp = QC / ".bundle_stamp"
    if stamp.exists():
        os.utime(stamp, ns=(0, 0))
    print("snapshot: audio/source sealed; no canonical ORDER lock created", flush=True)


def accepted_source():
    record = read(Q / "source-snapshot.json")
    same_hashes(record["input_hashes"])
    need(record["voice_acceptance_sha256"] == sha(Q / "voice-acceptance.json"), "voice acceptance changed")
    need(record["plan_sha256"] == sha(Q / "plan.json"), "still/cut plan changed")
    same_hashes(read(Q / "plan.json")["input_hashes"])
    return record


def bundle_manifest(directory=None):
    directory = Path(directory) if directory is not None else QC / ".bundle"
    need(directory.is_dir() and (directory / "bundle.js").is_file(), "render bundle is missing")
    files, inventory, links = [], [], {}

    def visit(path, ancestors):
        name = str(path.relative_to(P)) if path.is_relative_to(P) else str(path)
        if path.is_symlink():
            need(path.exists(), "broken bundle symlink: " + name)
            links[name] = dict(link=os.readlink(path), target=str(path.resolve()))
        inventory.append(name)
        if path.is_file():
            files.append(path)
        elif path.is_dir():
            resolved = path.resolve()
            need(resolved not in ancestors, "cyclic bundle directory: " + name)
            for child in sorted(path.iterdir()):
                visit(child, ancestors | {resolved})
        else:
            raise Blocked("unsupported bundle entry: " + name)

    visit(directory, set())
    return dict(root=str(directory), file_hashes=hashes(files), inventory=inventory, symlinks=links)


def same_bundle(manifest):
    need(bundle_manifest(manifest["root"]) == manifest, "bundle file, symlink target, or asset inventory changed")


def merge_hashes(destination, incoming):
    for name, expected in incoming.items():
        need(name not in destination or destination[name] == expected, "conflicting evidence hash: " + name)
        destination[name] = expected


def archive_qc(path):
    if not path.exists() or (path.is_dir() and not any(path.iterdir())):
        return
    candidates = [path] + ([p for p in path.rglob("*") if p.is_file()] if path.is_dir() else [])
    for i in range(0, len(candidates), 128):
        handles = subprocess.run(["fuser", "-s", *map(str, candidates[i:i + 128])], capture_output=True)
        need(handles.returncode == 1, "QC path has active handles or cannot be checked: " + str(path))
    target = Q / "preserved" / f"{path.name}-{time.time_ns()}"
    target.parent.mkdir(parents=True, exist_ok=True)
    path.rename(target)


def render_qa(mode):
    source = accepted_source()
    plan = read(Q / "plan.json")
    if mode == "stills":
        archive_qc(QC / "stills")
        browser_log = QC / "still.log"
        prior_bytes = browser_log.stat().st_size if browser_log.exists() else 0
        specs = [f'{row["label"]}:{row["frame"]}' for row in plan["stills"]]
        record = run("render-stills", ["bash", J / "render.sh", P, "still", "Main", *specs])
        with browser_log.open("rb") as handle:
            handle.seek(prior_bytes)
            new_browser_errors = handle.read().decode(errors="replace")
        (Q / "logs/still-browser-new.log").write_text(new_browser_errors)
        need(not re.search(r"(?:404|ERR_FILE_NOT_FOUND|failed to load|font[^\n]*(?:error|failed))", new_browser_errors, re.I),
             "still browser reported an asset/font load failure")
        paths = [QC / "stills" / (row["label"] + ".png") for row in plan["stills"]]
        need(all(p.is_file() and p.stat().st_mtime_ns >= record["started_ns"] for p in paths),
             "one or more stills failed or are stale")
        from PIL import Image, ImageDraw
        columns, w, h = 4, 480, 292
        canvas = Image.new("RGB", (columns * w, math.ceil(len(paths) / columns) * h), "#202020")
        draw = ImageDraw.Draw(canvas)
        for i, (path, row) in enumerate(zip(paths, plan["stills"])):
            x, y = (i % columns) * w, (i // columns) * h
            with Image.open(path) as frame:
                need(frame.size == (960, 540), "still has wrong dimensions: " + str(path))
                canvas.paste(frame.convert("RGB").resize((w, 270)), (x, y + 22))
            draw.text((x + 4, y + 4), f'{row["label"]} f{row["frame"]}', fill="white")
        canvas.save(Q / "stills-montage.jpg", quality=88)
        outputs = hashes(paths + [Q / "stills-montage.jpg"])
    elif mode == "draft":
        archive_qc(QC / "draft.mp4")
        with Path("/tmp/remotion-heavy-render.lock").open("a") as lock:
            fcntl.flock(lock, fcntl.LOCK_EX)
            record = run("render-draft", ["bash", J / "render.sh", P, "draft", "Main"])
        draft = probe_media(QC / "draft.mp4")
        video = next(row for row in draft["streams"] if row["codec_type"] == "video")
        need((video["width"], video["height"], video["avg_frame_rate"], int(video["nb_read_frames"])) ==
             (960, 540, "30/1", N), "draft dimensions/fps/frame count mismatch")
        need(not any(row["codec_type"] == "audio" for row in draft["streams"]), "draft is not muted")
        write(Q / "draft-ffprobe.json", draft)
        outputs = hashes([QC / "draft.mp4"])
    else:
        archive_qc(QC / "frames")
        archive_qc(QC / "frame_audit")
        record = run("render-frames", ["bash", J / "render.sh", P, "frames", "Main"])
        frames = list((QC / "frames").glob("*.jpeg"))
        need(len(frames) == N, "frame sequence is incomplete")
        numbers = sorted(int(re.findall(r"\d+", p.stem)[-1]) for p in frames)
        need(numbers == list(range(N)) or numbers == list(range(1, N + 1)), "frame sequence has a gap")
        need(all(p.stat().st_mtime_ns >= record["started_ns"] for p in frames), "sequence contains old frames")
        from PIL import Image
        for path in frames:
            with Image.open(path) as frame:
                need(frame.size == (960, 540), "frame dimensions changed in sequence")
        outputs = hashes(frames)
    text = (P / record["log"]).read_text()
    need(not re.search(r"GAGAL still|(?:status|HTTP)[^\n]*404|ERR_(?:FILE|NAME)_NOT_FOUND", text, re.I),
         "a render asset or still failed")
    accepted_source()
    write(Q / f"{mode}-provenance.json", dict(source_snapshot_sha256=sha(Q / "source-snapshot.json"),
                                              bundle_manifest=bundle_manifest(), render=record, output_hashes=outputs))


def audit(args):
    source = accepted_source()
    frames = read(Q / "frames-provenance.json")
    need(frames["source_snapshot_sha256"] == sha(Q / "source-snapshot.json"), "frames belong to another snapshot")
    same_hashes(frames["output_hashes"])
    stems = Path(args.stems).resolve()
    need(stems.is_relative_to(P), "QA stem directory must be inside project")
    patterns = ("stem_vo*.wav", "stem_music*.wav", "stem_sfx*.wav")
    need(all(len(list(stems.glob(pattern))) == 1 for pattern in patterns), "exactly one QA stem per role required")
    run("frame-audit", [PY, J / "frame_audit.py", QC / "frames", "--src", R / "src", "--fps", str(FPS),
                        "--chunk", "10", "--cuts", Q / "cuts_v6.json", "--cues", P / source["cues"],
                        "--words", V / "words_mapped.json", "--stems", stems, "--out", QC / "frame_audit"])
    chunks = sorted((QC / "frame_audit").glob("c*"))
    sheets = [path for chunk in chunks for path in chunk.glob("s*.jpg")]
    need(len(chunks) == 9 and len(sheets) == 84, "audit does not contain all 83.1 seconds")
    outputs = [QC / "frame_audit/INDEX.md", *sheets, *(chunk / "INFO.md" for chunk in chunks)]
    write(Q / "audit-provenance.json", dict(source_snapshot_sha256=sha(Q / "source-snapshot.json"),
                                             stem_hashes=hashes(list(stems.glob("*.wav"))),
                                             output_hashes=hashes(outputs),
                                             chunks=9, sheets=84, frames=N, verdicts_written_by_builder=False))
    accepted_source()


def fresh(path, since_ns):
    need(path.is_file() and path.stat().st_mtime_ns >= since_ns, "missing/stale QA: " + str(path.relative_to(P)))


def readiness(args):
    source = accepted_source()
    basic_visual()
    evidence, leaves = [], {}
    for role in ("stills", "draft", "frames", "audit"):
        provenance = Q / f"{role}-provenance.json"
        row = read(provenance)
        need(row["source_snapshot_sha256"] == sha(Q / "source-snapshot.json"), f"{role} snapshot stale")
        same_hashes(row["output_hashes"])
        merge_hashes(leaves, row["output_hashes"])
        if role == "audit":
            same_hashes(row["stem_hashes"])
            merge_hashes(leaves, row["stem_hashes"])
        else:
            same_bundle(row["bundle_manifest"])
        evidence.append(provenance)
    since = source["created_ns"]
    stills = [QC / "stills" / (row["label"] + ".png") for row in read(Q / "plan.json")["stills"]]
    need(set((QC / "stills").rglob("*.png")) == set(stills), "unregistered or missing stills in final QA folder")
    for path in stills:
        fresh(path, since)
    oldest = min(p.stat().st_mtime_ns for p in stills)
    fresh(QC / "sanding.jpg", oldest)
    fresh(QC / "JURI.md", (QC / "sanding.jpg").stat().st_mtime_ns)
    juri = (QC / "JURI.md").read_text()
    need(juri.rstrip().splitlines()[-1] == "PUTUSAN: LULUS", "JURI has no final LULUS")
    decisions = re.findall(r"^\| ([RD]-\d+) \|.*\| Aktif \|", (P / "DECISIONS.md").read_text(), re.M)
    need(all(re.search(r"\b" + ident + r"\b", juri) for ident in decisions), "active decision missing in JURI")
    balance = run("balance", [PY, J / "balance_check.py", QC / "stills"], allowed=(0, 1))
    need(balance["exit_code"] == 0 or re.search(r"^KESEIMBANGAN:\s*\S.+", juri, re.M), "unresolved balance failure")
    audit_record = read(Q / "audit-provenance.json")
    verdicts = sorted((QC / "frame_audit").glob("c*/VERDICT.md"))
    need(len(verdicts) == 9 and audit_record["sheets"] == 84, "every-frame review incomplete")
    audit_time = (QC / "frame_audit/INDEX.md").stat().st_mtime_ns
    for path in verdicts:
        fresh(path, audit_time)
        need(path.read_text().rstrip().splitlines()[-1] == "PUTUSAN: LULUS", "unpassed audit: " + str(path))
    review = Path(args.review).resolve()
    data = read(review)
    need(data["source_snapshot_sha256"] == sha(Q / "source-snapshot.json"), "lead review snapshot stale")
    need(data["reviewers"] == ["Gemini", "ChatGPT"] and data["all_sheets_reviewed"] == 84,
         "independent Gemini and ChatGPT every-frame coverage missing")
    required = {"visual_muted", "visual_sfx_no_music", "full_mix", "phone_20_50_100", "delivery_gate"}
    need(set(data["checks"]) == required, "lead review gate inventory incomplete")
    for label, check in data["checks"].items():
        need(check["status"] == "PASS" and check["evidence_hashes"], "review gate failed: " + label)
        same_hashes(check["evidence_hashes"])
        merge_hashes(leaves, check["evidence_hashes"])
    run("sfx-density", [PY, G / "sfx_density.py", QC / "draft.mp4", P / source["cues"],
                        "--objects", P / source["objects"], "--json", Q / "sfx-density.json"])
    accepted_source()
    evidence += [QC / "JURI.md", QC / "sanding.jpg", *verdicts, review, Q / "sfx-density.json",
                 Q / "logs/sfx-density.log", Q / "logs/balance.log", Q / "source-snapshot.json"]
    merge_hashes(leaves, hashes(evidence))
    result = dict(project_ready=True, canonical_pass=False, audio_order_pass=False,
                  exception_ids=["R-032", "R-033"], frames=N, fps=FPS,
                  source_snapshot_sha256=sha(Q / "source-snapshot.json"),
                  evidence_hashes=leaves, review_file=str(review.relative_to(P)),
                  bundle_manifest=read(Q / "frames-provenance.json")["bundle_manifest"])
    write(Q / "readiness.json", result)
    print("readiness: project gates PASS; final still requires lead SHIP bound to this file", flush=True)


def accepted_for_final(ship_path):
    source = accepted_source()
    ready = read(Q / "readiness.json")
    same_hashes(ready["evidence_hashes"])
    need(ready["project_ready"] and ready["source_snapshot_sha256"] == sha(Q / "source-snapshot.json"), "readiness stale")
    same_bundle(ready["bundle_manifest"])
    ship = read(Path(ship_path))
    need(ship["status"] == "SHIP" and ship["authority"] == "lead" and
         ship["readiness_sha256"] == sha(Q / "readiness.json") and ship.get("message", "").strip(),
         "explicit lead SHIP is absent or stale")
    return source


def final(args):
    source = accepted_for_final(args.ship)
    out = P / "out/v6-chunks"
    out.mkdir(parents=True, exist_ok=True)
    chunks = []
    with Path("/tmp/remotion-heavy-render.lock").open("a") as lock:
        print("waiting for global heavy-render lock", flush=True)
        fcntl.flock(lock, fcntl.LOCK_EX)
        for a in range(0, N, 300):
            b = min(N, a + 300) - 1
            target = out / f"f{a:04d}-{b:04d}.mp4"
            sidecar = target.with_suffix(".json")
            if target.exists():
                need(sidecar.is_file(), "existing chunk lacks provenance; inspect before replacement: " + str(target))
                previous = read(sidecar)
                need(previous["source_snapshot_sha256"] == sha(Q / "source-snapshot.json") and
                     previous["readiness_sha256"] == sha(Q / "readiness.json") and
                     previous["chunk"]["sha256"] == sha(target) and previous["chunk"]["start"] == a and
                     previous["chunk"]["end"] == b, "existing chunk does not match approved render")
                chunks.append(previous["chunk"])
                print(f"reuse verified chunk f{a}-{b}", flush=True)
                continue
            need(os.statvfs(P).f_bavail * os.statvfs(P).f_frsize >= 1_500_000_000, "less than1.5GB free before chunk")
            run(f"final-chunk-{a:04d}", ["node", R / "node_modules/@remotion/cli/remotion-cli.js", "render",
                                         QC / ".bundle", "Main", target, "--frames", f"{a}-{b}",
                                         "--concurrency=2", "--muted", "--crf=18", "--log=error"], cwd=R)
            chunk_probe = probe_media(target)
            chunk_video = next(s for s in chunk_probe["streams"] if s["codec_type"] == "video")
            need(int(chunk_video["nb_read_frames"]) == b - a + 1 and
                 (chunk_video["width"], chunk_video["height"], chunk_video["avg_frame_rate"]) == (1920, 1080, "30/1"),
                 "rendered chunk has wrong frame count or format")
            need(not any(s["codec_type"] == "audio" for s in chunk_probe["streams"]), "chunk is not muted")
            accepted_source()
            chunk = dict(path=str(target.relative_to(P)), start=a, end=b, sha256=sha(target), frames=b - a + 1)
            chunks.append(chunk)
            write(sidecar, dict(source_snapshot_sha256=sha(Q / "source-snapshot.json"),
                                readiness_sha256=sha(Q / "readiness.json"), chunk=chunk,
                                crf=18, muted=True, render_log=f"qc/v6-finishing/logs/final-chunk-{a:04d}.json"))
        write(Q / "chunks.json", chunks)
        output = P / "out/builder-trap-r2_v6.mp4"
        need(not output.exists(), "final output already exists; inspect it before replacement")
        inputs = [item for chunk in chunks for item in ("-i", str(P / chunk["path"]))]
        resets = ";".join(f"[{i}:v]setpts=PTS-STARTPTS[c{i}]" for i in range(len(chunks)))
        labels = "".join(f"[c{i}]" for i in range(len(chunks)))
        concat = f"{resets};{labels}concat=n={len(chunks)}:v=1:a=0[v]"
        run("final-concat", ["/usr/bin/ffmpeg", "-nostdin", "-threads", "2", "-filter_threads", "1",
                              "-filter_complex_threads", "1", *inputs, "-i", P / source["mix"],
                              "-filter_complex", concat, "-map", "[v]", "-map", f"{len(chunks)}:a:0",
                              "-c:v", "libx264", "-threads", "2", "-crf", "14", "-preset", "medium",
                              "-pix_fmt", "yuv420p", "-r", "30", "-c:a", "aac", "-b:a", "192k",
                              "-ar", "48000", "-movflags", "+faststart", output])
    verify_final(output, chunks, source, args.ship)


def probe_media(path):
    probe = subprocess.run(["ffprobe", "-v", "error", "-count_frames", "-show_streams", "-show_format", "-of", "json", str(path)],
                           capture_output=True, text=True)
    need(probe.returncode == 0, "ffprobe failed: " + str(path))
    return json.loads(probe.stdout)


def decoded_frames(path, indices):
    import numpy as np
    selected = "+".join(f"eq(n\\,{i})" for i in sorted(indices))
    command = ["/usr/bin/ffmpeg", "-v", "error", "-threads", "2", "-filter_threads", "1", "-i", str(path),
               "-vf", f"select={selected},scale=320:180,format=gray", "-fps_mode", "passthrough", "-an",
               "-f", "rawvideo", "-"]
    decoded = subprocess.run(command, capture_output=True)
    need(decoded.returncode == 0 and not decoded.stderr, "seam frame decode failed: " + str(path))
    pixels = np.frombuffer(decoded.stdout, dtype=np.uint8)
    need(pixels.size == len(indices) * 320 * 180, "seam frame count mismatch")
    return dict(zip(sorted(indices), pixels.reshape((-1, 180, 320))))


def verify_seams(output, chunks):
    import numpy as np
    boundaries = [row["start"] for row in chunks[1:]]
    indices = sorted({f for b in boundaries for f in range(b - 3, b + 3)})
    actual = decoded_frames(output, indices)
    expected = {}
    for chunk in chunks:
        need(sha(P / chunk["path"]) == chunk["sha256"], "chunk changed before seam check")
        local = [f - chunk["start"] for f in indices if chunk["start"] <= f <= chunk["end"]]
        if local:
            expected.update({i + chunk["start"]: frame for i, frame in decoded_frames(P / chunk["path"], local).items()})
    comparisons = []
    for f in indices:
        image = actual[f].astype(np.float32)
        distances = {g: float(np.mean((image - expected[g].astype(np.float32)) ** 2))
                     for g in indices if abs(g - f) <= 1}
        mse = distances[f]
        psnr = 10 * math.log10(255 ** 2 / max(mse, 1e-12))
        best = min(distances, key=distances.get)
        need(psnr >= 34, f"poor seam correspondence at f{f}: {psnr:.2f}dB")
        need(best == f or mse <= distances[best] * 1.10 + 0.05,
             f"possible missing/repeated seam frame f{f}; closest expected f{best}")
        comparisons.append(dict(frame=f, psnr_db=psnr, mse=mse, nearest_expected=best,
                                neighboring_mse=distances))
    result = dict(pass_=True, boundaries=boundaries, checked_frames=len(indices), comparisons=comparisons,
                  method="same-index decoded chunk to reencoded final; ±1 nearest-frame check; 34dB floor",
                  limitation="visually identical adjacent source frames are equivalent; exact chunk counts and normalized concat timestamps also checked")
    write(Q / "seam-verification.json", result)
    return result


def measure_truepeak(path):
    import numpy as np
    command = ["/usr/bin/ffmpeg", "-v", "error", "-threads", "2", "-filter_threads", "1", "-i", str(path),
               "-vn", "-af", "aresample=192000:resampler=soxr:precision=28", "-acodec", "pcm_f32le", "-f", "f32le", "-"]
    peak = 0.0
    log = Q / "logs/final-truepeak-exact.log"
    with log.open("w") as errors:
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=errors, env=environment())
        while True:
            block = process.stdout.read(1 << 20)
            if not block:
                break
            peak = max(peak, float(np.max(np.abs(np.frombuffer(block, dtype="<f4")))))
        code = process.wait()
    need(code == 0 and not log.read_text().strip(), "exact truepeak decode failed")
    result = dict(command=command, exit_code=code, oversample=4, resampler="soxr precision28",
                  peak_linear=peak, truepeak_dbtp=20 * math.log10(max(peak, 1e-30)))
    write(Q / "aac-truepeak.json", result)
    return result


def verify_audio(output, mix):
    import numpy as np
    import soundfile as sf
    from scipy.signal import correlate, correlation_lags
    decoded = TMP / "final-aac-decoded.wav"
    need(not decoded.exists(), "verification temporary file already exists")
    run("final-audio-decode", ["/usr/bin/ffmpeg", "-v", "error", "-threads", "2", "-i", output,
                               "-vn", "-c:a", "pcm_f32le", decoded])
    original, sr = sf.read(mix, always_2d=True)
    actual, ar = sf.read(decoded, always_2d=True)
    need(sr == ar == 48000 and original.shape[1] == actual.shape[1], "AAC channel/sample-rate mismatch")
    need(abs(len(original) - len(actual)) <= 1024, "AAC length differs by more than one codec frame")
    limit = min(len(original), len(actual))
    a, b = original[:limit].mean(1), actual[:limit].mean(1)
    windows = []
    for sec in (1, 18, 34, 55, 78):
        x, y = a[int(sec * sr):int((sec + .5) * sr)], b[int(sec * sr):int((sec + .5) * sr)]
        corr = correlate(y, x, mode="full", method="fft")
        lags = correlation_lags(len(y), len(x), mode="full")
        within = np.abs(lags) <= 96
        lag = int(lags[within][np.argmax(corr[within])])
        coefficient = float(np.corrcoef(x, y)[0, 1])
        need(abs(lag) <= 48 and coefficient >= .98, f"AAC waveform/latency discrepancy around {sec}s")
        windows.append(dict(seconds=[sec, sec + .5], lag_samples=lag, normalized_correlation=coefficient))
    error = a - b
    snr = 10 * math.log10(float(np.dot(a, a)) / max(float(np.dot(error, error)), 1e-300))
    need(snr >= 20, "AAC differs substantially from approved mix")
    result = dict(pass_=True, mix_sha256=sha(mix), decoded_samples=len(actual), windows=windows,
                  snr_db=snr, source_vo_sha256=sha(V / "voice_clean.wav"),
                  note="AAC is lossy; original VO and provenance hashes are unchanged")
    write(Q / "audio-correspondence.json", result)
    decoded.unlink()
    return result


def verify_final(output, chunks, source, ship_path):
    accepted_for_final(ship_path)
    expected_start = 0
    for chunk in chunks:
        path = P / chunk["path"]
        need(chunk["start"] == expected_start and 0 < chunk["end"] - chunk["start"] + 1 <= 300,
             "chunk inventory has a gap or unexpected range")
        sidecar = read(path.with_suffix(".json"))
        need(sidecar["source_snapshot_sha256"] == sha(Q / "source-snapshot.json") and
             sidecar["readiness_sha256"] == sha(Q / "readiness.json") and sidecar["chunk"] == chunk and
             sidecar["muted"] is True and sidecar["crf"] <= 18 and sha(path) == chunk["sha256"],
             "chunk sidecar is absent, stale, or inconsistent")
        expected_start = chunk["end"] + 1
    need(expected_start == N and len(chunks) == 9, "final chunk inventory does not cover2493frames")
    data = probe_media(output)
    video = next(row for row in data["streams"] if row["codec_type"] == "video")
    audio = next(row for row in data["streams"] if row["codec_type"] == "audio")
    need((video["width"], video["height"], video["avg_frame_rate"], int(video["nb_read_frames"])) ==
         (1920, 1080, "30/1", N), "final dimensions/fps/framecount mismatch")
    need(abs(float(video["duration"]) - N / FPS) < 0.0001 and abs(float(audio["duration"]) - N / FPS) <= 0.022,
         "audio/video duration mismatch")
    decode = run("final-decode", ["/usr/bin/ffmpeg", "-v", "error", "-threads", "2", "-i", output, "-f", "null", "-"])
    need(not (P / decode["log"]).read_text().strip(), "final decode reported an error")
    peak = measure_truepeak(output)
    need(peak["truepeak_dbtp"] <= -1.0, "AAC truepeak exceeds−1dBTP")
    seams = verify_seams(output, chunks)
    audio_proof = verify_audio(output, P / source["mix"])
    accepted_for_final(ship_path)
    write(Q / "final-verification.json", dict(media_hash=sha(output), ffprobe=data, chunks=chunks,
                                               decode=decode, aac_truepeak_db=peak["truepeak_dbtp"],
                                               voice_sha256=sha(V / "voice_clean.wav"),
                                               waveform_provenance_unchanged=True,
                                               frame_seams=seams["pass_"], audio_correspondence=audio_proof["pass_"],
                                               canonical_pass=False, audio_order_pass=False,
                                               project_final_pass=True))
    print("final verification: project PASS, 1920x1080 /30fps /2493frames; canonical audio exceptions retained", flush=True)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    sub = ap.add_subparsers(dest="mode", required=True)
    sub.add_parser("plan")
    sub.add_parser("voice-check")
    snap = sub.add_parser("snapshot")
    for name in ("mix", "cues", "objects", "voice-sha256"):
        snap.add_argument("--" + name, required=True)
    for name in ("stills", "draft", "frames"):
        sub.add_parser(name)
    au = sub.add_parser("audit")
    au.add_argument("--stems", required=True)
    rd = sub.add_parser("readiness")
    rd.add_argument("--review", required=True)
    fn = sub.add_parser("final")
    fn.add_argument("--ship", required=True)
    vf = sub.add_parser("verify-final")
    vf.add_argument("--ship", default=str(Q / "SHIP.json"))
    args = ap.parse_args()
    Q.mkdir(parents=True, exist_ok=True)
    if os.getpriority(os.PRIO_PROCESS, 0) < 10:
        os.nice(10 - os.getpriority(os.PRIO_PROCESS, 0))
    if args.mode == "plan":
        scene_plan()
    elif args.mode == "voice-check":
        voice_check()
    elif args.mode == "snapshot":
        snapshot(args)
    elif args.mode in ("stills", "draft", "frames"):
        render_qa(args.mode)
    elif args.mode == "audit":
        audit(args)
    elif args.mode == "readiness":
        readiness(args)
    elif args.mode == "final":
        final(args)
    else:
        source = accepted_for_final(args.ship)
        verify_final(P / "out/builder-trap-r2_v6.mp4", read(Q / "chunks.json"), source, args.ship)


if __name__ == "__main__":
    try:
        main()
    except (Blocked, KeyError, FileNotFoundError) as error:
        print("BLOCKED: " + str(error), file=sys.stderr)
        raise SystemExit(1)
