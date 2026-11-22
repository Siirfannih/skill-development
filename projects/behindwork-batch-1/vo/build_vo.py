"""Rakit track VO satu episode: beat TTS (dipangkas hening tepi) + quote cut suara asli, jeda tetap.

Pakai: python build_vo.py <spec.json> <out_dir>
spec.json:
  {"beats": [{"id": "01", "file": "vo_01.mp3"},
             {"id": "06", "quote": "footage.mp4", "segments": [[3.95, 5.20], [7.00, 11.20]]}, ...],
   "gap": 0.30, "gap_quote": 0.35, "target_lufs": -16}
Keluaran: vo_full.wav (48 kHz mono), vo_beats.json (id, mulai, selesai di track), laporan level.
Level: TTS dinormalisasi gain linear ke target; quote cut hanya dinaikkan bila lebih pelan dari TTS
(suara asli tidak pernah diturunkan, Lantai E23). Tanpa limiter atau kompresor.
"""
import json, subprocess, sys, tempfile
from pathlib import Path
import numpy as np, soundfile as sf

SR = 48000


def load(path, ss=None, to=None):
    tmp = tempfile.mktemp(suffix=".wav")
    cmd = ["ffmpeg", "-v", "error", "-y"] + (["-ss", str(ss), "-to", str(to)] if ss is not None else []) + ["-i", str(path), "-vn", "-ac", "1", "-ar", str(SR), tmp]
    subprocess.run(cmd, check=True)
    a, _ = sf.read(tmp, dtype="float32")
    return a


def trim(a, thr_db=-50, pad=0.04):
    env = np.abs(a)
    idx = np.where(env > 10 ** (thr_db / 20))[0]
    if not len(idx):
        return a
    s, e = max(0, idx[0] - int(pad * SR)), min(len(a), idx[-1] + int(pad * SR))
    return a[s:e]


def fade(a, ms=8):
    n = int(ms / 1000 * SR)
    a = a.copy(); a[:n] *= np.linspace(0, 1, n); a[-n:] *= np.linspace(1, 0, n)
    return a


def lufs(a):
    tmp = tempfile.mktemp(suffix=".wav"); sf.write(tmp, a, SR)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", tmp, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    line = [l for l in r.splitlines() if l.strip().startswith("I:")][-1]
    return float(line.split()[1])


def main():
    spec = json.load(open(sys.argv[1])); out = Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
    base = Path(sys.argv[1]).parent
    gap, gq, tgt = spec.get("gap", 0.30), spec.get("gap_quote", 0.35), spec.get("target_lufs", -16)
    parts = []
    for b in spec["beats"]:
        if "quote" in b:
            # segmen [mulai, selesai] atau [mulai, selesai, "tawa"]: segmen tawa menyambung tanpa jeda ke segmen sebelumnya
            # dan diberi gain sendiri (puncak tawa tidak menahan gain suara pembicara).
            chunks = []
            for sg in b["segments"]:
                s0, e0 = sg[0], sg[1]; kind = sg[2] if len(sg) > 2 else "suara"
                x = load(base / b["quote"], s0, e0)
                if kind != "tawa" and chunks:
                    chunks.append((np.zeros(int(0.12 * SR), np.float32), "jeda"))
                chunks.append((x, kind))
            parts.append((b["id"], chunks, True))
        else:
            parts.append((b["id"], fade(trim(load(base / b["file"]))), False))
    tts = np.concatenate([a for _, a, q in parts if not q])
    g_tts = 10 ** ((tgt - lufs(tts)) / 20)
    g_tts = min(g_tts, 10 ** (-1.5 / 20) / float(np.abs(tts).max()))
    rep = {"tts_lufs_asal": round(lufs(tts), 1), "gain_tts_db": round(float(20 * np.log10(g_tts)), 2)}
    track, beats, t = [], [], 0.0
    for i, (bid, a, q) in enumerate(parts):
        if q:
            speech = np.concatenate([x for x, k in a if k == "suara"])
            lq = lufs(speech); g = max(1.0, 10 ** ((tgt - lq) / 20))
            g = min(g, max(1.0, 10 ** (-1.5 / 20) / float(np.abs(speech).max())))  # puncak suara <= -1,5 dBFS: gain diturunkan, bukan dilimit
            out_chunks = []
            for x, k in a:
                gk = g if k != "tawa" else min(g, 10 ** (-3.0 / 20) / float(np.abs(x).max()))
                out_chunks.append(fade(x * gk, 12) if k != "jeda" else x)
            a = np.concatenate(out_chunks)
            rep[f"quote_{bid}_lufs_asal"] = round(lq, 1); rep[f"quote_{bid}_gain_db"] = round(float(20 * np.log10(g)), 2); rep[f"quote_{bid}_lufs_hasil"] = round(lufs(speech * g), 1)
        else:
            a = a * g_tts
        if i:
            gp = gq if (q or parts[i - 1][2]) else gap
            track.append(np.zeros(int(gp * SR), np.float32)); t += gp
        beats.append({"id": bid, "mulai": round(t, 3), "selesai": round(t + len(a) / SR, 3), "quote": q})
        track.append(a.astype(np.float32)); t += len(a) / SR
    full = np.concatenate(track)
    rep["puncak_dbfs"] = round(float(20 * np.log10(np.abs(full).max())), 2); rep["durasi"] = round(len(full) / SR, 2); rep["lufs_akhir"] = round(lufs(full), 1)
    sf.write(out / "vo_full.wav", full, SR)
    json.dump({"beats": beats, "laporan": rep}, open(out / "vo_beats.json", "w"), indent=1)
    print(json.dumps(rep, indent=1))


if __name__ == "__main__":
    main()
