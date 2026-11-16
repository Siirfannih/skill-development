#!/usr/bin/env python3
"""Gerbang level suara asli (Lantai E23; Irfan 16 Nov): suara asli (narasumber, rekaman sendiri, VO) tidak pernah
diturunkan, di-loudness-kan, atau di-limit. Yang boleh: peredam noise, lalu gain NAIK yang bersih sampai sekitar
-16 LUFS bila sumbernya terlalu pelan atau kalah dari musik/SFX. Musik dan SFX yang menyesuaikan ke suara.

Gagal yang membentuk gerbang ini:
  - sesi lain: loudness global/limiter mix untuk mengejar -14 LUFS -> suara turun ±-17 dB dan "mendem";
  - jensen-pain-suffering v1-v2: limiter master memipihkan hentakan pembicara; v3: gain 0 dB -> -22,8 LUFS, terlalu pelan.

Mengukur stem suara sumber (sebelum proses) vs stem suara sesudah proses (yang masuk mix, tanpa musik/SFX):
  - turun   : loudness hasil < sumber - 0,5 dB                       -> FAIL (suara diturunkan)
  - tekan   : crest factor ucapan turun > 2 dB dari sumber            -> FAIL (kompresor/limiter/loudnorm dinamis)
  - pelan   : hasil < --target - 1 dB (default -16 -> < -17 LUFS)    -> FAIL (naikkan gain bersih; denoise dulu)
  - klip    : puncak sampel hasil > -1 dBFS                            -> FAIL (gain terlalu tinggi; jangan ditutup limiter)
Pakai:
  python3 voice_level.py suara_sumber.wav suara_hasil.wav [--target -16]
Exit 1 bila gagal. Loudness = LUFS integrated (ffmpeg ebur128); crest = puncak - RMS pada jendela 400 ms paling keras
(persentil 95), supaya jeda tidak ikut dihitung.
"""
import argparse, re, subprocess, sys
import numpy as np
import soundfile as sf


def lufs(path):
    out = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-af", "ebur128", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    vals = re.findall(r"I:\s+(-?[0-9.]+|-inf) LUFS", out)
    return float(vals[-1]) if vals and vals[-1] != "-inf" else -120.0


def crest(path):
    x, sr = sf.read(path, always_2d=True)
    x = x.mean(1)
    n = int(0.4 * sr)
    wins = [x[i:i + n] for i in range(0, max(1, len(x) - n), n // 2)]
    rms = np.array([np.sqrt(np.mean(w ** 2)) + 1e-9 for w in wins])
    loud = [w for w, r in zip(wins, rms) if r >= np.percentile(rms, 95) * 0.5]
    vals = [20 * np.log10((np.max(np.abs(w)) + 1e-9) / (np.sqrt(np.mean(w ** 2)) + 1e-9)) for w in loud]
    return float(np.median(vals)), float(20 * np.log10(np.max(np.abs(x)) + 1e-9))


def check(src, out, target=-16.0):
    ls, lo = lufs(src), lufs(out)
    cs, _ = crest(src)
    co, peak = crest(out)
    fails = []
    if lo < ls - 0.5:
        fails.append(f"turun {lo - ls:+.1f} dB (suara asli tidak boleh diturunkan)")
    if cs - co > 2.0:
        fails.append(f"tekan: crest {cs:.1f} -> {co:.1f} dB (kompresor/limiter/loudnorm dinamis pada suara)")
    if lo < target - 1.0:
        fails.append(f"pelan {lo:.1f} LUFS < {target - 1:.0f} (redam noise dulu, lalu gain naik bersih)")
    if peak > -1.0:
        fails.append(f"klip: puncak {peak:.1f} dBFS (turunkan target gain, jangan ditutup limiter)")
    return dict(src_lufs=ls, out_lufs=lo, gain=lo - ls, src_crest=cs, out_crest=co, peak=peak, fails=fails)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("source"); ap.add_argument("processed")
    ap.add_argument("--target", type=float, default=-16.0)
    a = ap.parse_args()
    r = check(a.source, a.processed, a.target)
    print(f"sumber {r['src_lufs']:.1f} LUFS -> hasil {r['out_lufs']:.1f} LUFS (gain {r['gain']:+.1f} dB) · "
          f"crest {r['src_crest']:.1f} -> {r['out_crest']:.1f} dB · puncak {r['peak']:.1f} dBFS")
    print("PASS" if not r["fails"] else "FAIL: " + "; ".join(r["fails"]))
    sys.exit(1 if r["fails"] else 0)


if __name__ == "__main__":
    main()
