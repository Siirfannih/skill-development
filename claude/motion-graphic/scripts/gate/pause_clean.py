#!/usr/bin/env python3
"""Gerbang jeda bersih (Lantai E23, Irfan 13 Nov): saat pembicara berhenti/berpikir, stem suara tidak membawa
dengung kamar, piring, klik, atau room tone kotor yang ikut dikeraskan.

Mengukur stem SUARA (sebelum musik/SFX) di jeda antarkata >= --min-gap dtk, dengan margin [akhir kata + 0,15; awal kata - 0,06]
(ekor kata whisper sering terlalu cepat):
  - lantai : median RMS jeda <= --max-floor dBFS (default -50)
  - selisih: median ucapan - median jeda >= --min-drop dB (default 25)
  - tajam  : tidak ada puncak 10 ms di jeda > lantai jeda + 12 dB dan > -40 dBFS (piring, klik, benturan)

Pakai:
  python3 pause_clean.py stem_suara.wav words.json [--min-gap 0.35] [--max-floor -50] [--min-drop 25]
words.json: list [{"w"|"word", "s"|"start", "e"|"end"}] di timeline yang sama dengan stem. Exit 1 bila gagal.
Gagal yang membentuk gerbang ini: builder-trap-r2 v1 (jeda -31,7 dBFS, hanya 13 dB di bawah ucapan, 10/11 jeda berisi transien).
Perbaikan yang terbukti: projects/builder-trap-r2/audio/voice_clean.py (high-pass 70 Hz, afftdn ringan, jeda diredam -24 dB, ramp 25 ms).
"""
import argparse, json, sys
import numpy as np
import soundfile as sf


def words(path):
    d = json.load(open(path))
    d = d if isinstance(d, list) else (d.get("words") or d.get("segments") or [])
    out = []
    for q in d:
        s = q.get("s", q.get("start")); e = q.get("e", q.get("end"))
        if s is not None and e is not None:
            out.append((float(s), float(e)))
    return sorted(out)


def db(x):
    return 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("stem"); ap.add_argument("words")
    ap.add_argument("--min-gap", type=float, default=0.35)
    ap.add_argument("--max-floor", type=float, default=-50.0)
    ap.add_argument("--min-drop", type=float, default=25.0)
    a = ap.parse_args()
    x, sr = sf.read(a.stem, always_2d=True); x = x.mean(1)
    S = words(a.words)
    P = [(e0 + 0.15, s1 - 0.06) for (s0, e0), (s1, e1) in zip(S, S[1:]) if s1 - e0 >= a.min_gap]
    P = [(p, q) for p, q in P if q - p > 0.05]
    sp = np.median([db(x[int(s * sr):int(e * sr)]) for s, e in S if e - s > 0.1])
    floors, sharp = [], []
    hop = int(0.01 * sr)
    for p, q in P:
        seg = x[int(p * sr):int(q * sr)]
        f = db(seg); floors.append(f)
        fr = np.array([db(seg[i:i + hop]) for i in range(0, max(1, len(seg) - hop), hop)])
        if len(fr):
            pk = fr.max()
            if pk > np.median(fr) + 12 and pk > -40:
                sharp.append((round(p + fr.argmax() * 0.01, 2), round(float(pk), 1)))
    med = float(np.median(floors)) if floors else -120.0
    fails = []
    if med > a.max_floor:
        fails.append(f"lantai jeda {med:.1f} dBFS > {a.max_floor}")
    if sp - med < a.min_drop:
        fails.append(f"jeda hanya {sp - med:.1f} dB di bawah ucapan (min {a.min_drop})")
    if sharp:
        fails.append(f"{len(sharp)} bunyi tajam di jeda: " + ", ".join(f"{t}s {v}dB" for t, v in sharp[:6]))
    print(f"jeda {len(P)} · ucapan median {sp:.1f} dBFS · jeda median {med:.1f} dBFS · selisih {sp - med:.1f} dB")
    print("PASS" if not fails else "FAIL: " + "; ".join(fails))
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
