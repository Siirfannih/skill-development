#!/usr/bin/env python3
"""Terapkan rentang buang ke suara + video wajah (sinkron bibir) dan buat peta waktu lama -> baru (Irfan 15 Nov).

  python3 recut.py cut  --audio suara.wav --video wajah.mp4 --remove potong.json --source-words words.json --out DIR [--fps 30]
  python3 recut.py remap --map DIR/map.json IN.json OUT.json [--keys t,s,e,start,end,mulai] [--fps 30]

cut:
  - rentang dari `cut_check.py --suggest` (sudah didengar/diedit) dibulatkan ke batas frame supaya audio dan video
    tetap sama panjang; rentang yang tumpang tindih digabung;
  - audio: segmen yang disimpan disambung dengan fade maksimal 2 ms keluar/masuk (tanpa overlap, panjang tetap = frame);
  - source-word overlap/duration/50 ms guard and low-energy endpoint validation run before writing output;
  - video: trim/concat ffmpeg dengan batas frame eksak (re-encode, CRF 14); tanpa audio (suara dipakai dari wav);
  - keluar: DIR/suara.wav (float), DIR/wajah.mp4, DIR/map.json {"removed": [[a,b],...], "fps": .., "dur_old", "dur_new"}.
remap:
  - setiap angka di bawah kunci waktu (`t`, `s`, `e`, …; juga list [a, b] di bawah `t`) diganti waktu baru;
    waktu di dalam rentang buang jatuh ke awal rentang itu; kunci `f` dihitung ulang = round(t × fps).
  - Kode adegan yang menulis frame langsung (konstanta) TIDAK ikut: pakai `map.json` di build (mis. fungsi tm()).
"""
import argparse, json, subprocess, sys
import numpy as np
import soundfile as sf


def merged(rem, fps, dur):
    r = sorted([max(0.0, round(a * fps) / fps), min(dur, round(b * fps) / fps)] for a, b, *_ in rem)
    out = []
    for a, b in r:
        if b - a < 1 / fps: continue
        if out and a <= out[-1][1]: out[-1][1] = max(out[-1][1], b)
        else: out.append([a, b])
    return out


def mapper(removed):
    def m(t):
        cut = 0.0
        for a, b in removed:
            if t >= b: cut += b - a
            elif t > a: return round(a - cut, 4)
            else: break
        return round(t - cut, 4)
    return m


def cmd_cut(a):
    x, sr = sf.read(a.audio, always_2d=True, dtype="float32")
    dur = len(x) / sr
    rem = merged(json.load(open(a.remove)), a.fps, dur)
    import importlib.util
    from pathlib import Path
    spec = importlib.util.spec_from_file_location("cut_guard", Path(__file__).resolve().parents[1] / "gate/cut_check.py")
    gate = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(gate)
    validation = gate.validate_cuts(gate.load_words(a.source_words), rem)
    if not validation["pass_"]:
        raise ValueError("Unsafe source cuts: " + "; ".join(validation["failures"]))
    mono = x.mean(1)
    for start, end in rem:
        for timestamp in (start, end):
            sample = round(timestamp * sr)
            window = mono[max(0, sample - round(0.001 * sr)):min(len(mono), sample + round(0.001 * sr))]
            db = 20 * np.log10(np.sqrt(np.mean(window ** 2)) + 1e-9)
            if db > -38:
                raise ValueError(f"Endpoint {timestamp:.6f}s is not low energy ({db:.1f} dBFS); inspect waveform")
    keep, cur = [], 0.0
    for r0, r1 in rem:
        if r0 > cur: keep.append((cur, r0))
        cur = r1
    if cur < dur: keep.append((cur, dur))
    fade = int(0.002 * sr); parts = []
    for k0, k1 in keep:
        seg = x[int(round(k0 * sr)):int(round(k1 * sr))].copy()
        if len(seg) > 2 * fade:
            ramp = np.linspace(0, 1, fade, dtype=np.float32)[:, None]
            if k0 > 0: seg[:fade] *= ramp
            if k1 < dur: seg[-fade:] *= ramp[::-1]
        parts.append(seg)
    y = np.concatenate(parts)
    import os; os.makedirs(a.out, exist_ok=True)
    sf.write(f"{a.out}/suara.wav", y, sr, subtype="FLOAT")
    if a.video:
        frame_keep = [(round(k0 * a.fps), round(k1 * a.fps)) for k0, k1 in keep]
        fl = "".join(f"[0:v]trim=start_frame={f0}:end_frame={f1},setpts=PTS-STARTPTS[v{i}];" for i, (f0, f1) in enumerate(frame_keep))
        fl += "".join(f"[v{i}]" for i in range(len(keep))) + f"concat=n={len(keep)}:v=1:a=0[v]"
        video_out = f"{a.out}/wajah.mp4"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-threads", "2", "-i", a.video, "-threads", "2",
                        "-filter_complex_threads", "1", "-filter_complex", fl, "-map", "[v]", "-an",
                        "-c:v", "libx264", "-threads", "2", "-crf", "14", "-preset", "medium", "-pix_fmt", "yuv420p", video_out], check=True)
        frames = int(subprocess.check_output([
            "ffprobe", "-v", "error", "-count_frames", "-select_streams", "v:0",
            "-show_entries", "stream=nb_read_frames", "-of", "default=nw=1:nk=1", video_out,
        ], text=True).strip())
        expected_frames = round(len(y) / sr * a.fps)
        if frames != expected_frames:
            raise ValueError(f"Video/audio drift: {frames} video frames != {expected_frames} audio frames")
    mp = dict(removed=rem, fps=a.fps, dur_old=round(dur, 4), dur_new=round(len(y) / sr, 4))
    json.dump(mp, open(f"{a.out}/map.json", "w"), indent=0)
    print(f"buang {len(rem)} rentang = {dur - len(y) / sr:.2f} dtk · durasi {dur:.2f} -> {len(y) / sr:.2f} dtk · {a.out}")


def cmd_remap(a):
    mp = json.load(open(a.map)); m = mapper(mp["removed"]); fps = mp.get("fps", a.fps)
    keys = set(a.keys.split(","))
    def walk(o):
        if isinstance(o, dict):
            for k, v in list(o.items()):
                if k in keys and isinstance(v, (int, float)): o[k] = m(float(v))
                elif k in keys and isinstance(v, list) and all(isinstance(z, (int, float)) for z in v): o[k] = [m(float(z)) for z in v]
                else: walk(v)
            if "f" in o and isinstance(o.get("t"), (int, float)): o["f"] = int(round(o["t"] * fps))
        elif isinstance(o, list):
            for v in o: walk(v)
    d = json.load(open(a.inp)); walk(d)
    json.dump(d, open(a.out, "w"), ensure_ascii=False, indent=1)
    print(f"remap {a.inp} -> {a.out}")


ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
sub = ap.add_subparsers(dest="cmd", required=True)
c = sub.add_parser("cut"); c.add_argument("--audio", required=True); c.add_argument("--video"); c.add_argument("--remove", required=True)
c.add_argument("--source-words", required=True)
c.add_argument("--out", required=True); c.add_argument("--fps", type=int, default=30)
r = sub.add_parser("remap"); r.add_argument("--map", required=True); r.add_argument("inp"); r.add_argument("out")
r.add_argument("--keys", default="t,s,e,start,end,mulai"); r.add_argument("--fps", type=int, default=30)
if __name__ == "__main__":
    a = ap.parse_args()
    cmd_cut(a) if a.cmd == "cut" else cmd_remap(a)
