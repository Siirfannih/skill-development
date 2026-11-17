#!/usr/bin/env python3
"""Gerbang level suara asli (Lantai E23): suara asli (narasumber, rekaman sendiri, VO) tidak pernah
diturunkan, di-loudness-kan, atau di-limit. Yang boleh: peredam noise, lalu gain NAIK yang bersih sampai sekitar
-16 LUFS bila sumbernya terlalu pelan atau kalah dari musik/SFX. Musik dan SFX yang menyesuaikan ke suara.

Yang dijaga: loudness global/limiter yang menurunkan suara sampai "mendem", limiter master yang memipihkan hentakan
pembicara, dan gain 0 dB pada sumber yang terlalu pelan.

Mengukur stem suara sumber (sebelum proses) vs stem suara sesudah proses (yang masuk mix, tanpa musik/SFX):
  - turun   : loudness hasil < sumber - 0,5 dB                       -> FAIL (suara diturunkan)
  - tekan   : crest factor ucapan turun > 2 dB dari sumber            -> FAIL (kompresor/limiter/loudnorm dinamis)
  - pelan   : hasil < --target - 1 dB (default -16 -> < -17 LUFS)    -> FAIL (naikkan gain bersih; denoise dulu)
  - klip    : puncak sampel hasil > -1 dBFS                            -> FAIL (gain terlalu tinggi; jangan ditutup limiter)
  - terima : `--terima-pelan "<alasan>"` (Putusan Sutradara 16 Nov) membebaskan HANYA kegagalan `pelan`, bila alasan tertulis ADA,
             hasil >= LUFS sumber - 0,5 (tidak turun), tidak klip (puncak <= -1 dBFS), dan puncak hasil membuktikan gain bersih tidak
             mungkin (headroom ke -1 dBFS < gain yang dibutuhkan untuk mencapai target - 1 LUFS). Alasan + angka dicetak (baris TERIMA-PELAN).
Pakai:
  python3 voice_level.py suara_sumber.wav suara_hasil.wav [--target -16] [--terima-pelan "alasan"]
Exit 1 bila gagal. Loudness = LUFS integrated (ffmpeg ebur128); crest = puncak - RMS pada jendela 400 ms paling keras
(persentil 95), supaya jeda tidak ikut dihitung.
"""
import argparse, json, re, subprocess, sys
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


def check(src, out, target=-16.0, terima_pelan=""):
    ls, lo = lufs(src), lufs(out)
    cs, _ = crest(src)
    co, peak = crest(out)
    fails = []
    if lo < ls - 0.5:
        fails.append(f"turun {lo - ls:+.1f} dB (suara asli tidak boleh diturunkan)")
    if cs - co > 2.0:
        fails.append(f"tekan: crest {cs:.1f} -> {co:.1f} dB (kompresor/limiter/loudnorm dinamis pada suara)")
    accepted = None
    if lo < target - 1.0:
        msg = f"pelan {lo:.1f} LUFS < {target - 1:.0f} (redam noise dulu, lalu gain naik bersih)"
        needed = (target - 1.0) - lo          # gain bersih yang dibutuhkan agar mencapai batas pelan
        headroom = -1.0 - peak                # gain maksimum sebelum puncak melewati -1 dBFS
        if terima_pelan.strip():
            problems = []
            if lo < ls - 0.5:
                problems.append("hasil lebih pelan dari sumber")
            if peak > -1.0:
                problems.append("klip")
            if headroom >= needed:
                problems.append(f"gain bersih masih mungkin (headroom {headroom:+.2f} dB >= butuh {needed:+.2f} dB)")
            if problems:
                fails.append(msg + " [terima-pelan ditolak: " + "; ".join(problems) + "]")
            else:
                accepted = dict(alasan=terima_pelan.strip(), src_lufs=round(ls, 2), out_lufs=round(lo, 2), peak_dbfs=round(peak, 2),
                                headroom_db=round(headroom, 2), gain_dibutuhkan_db=round(needed, 2))
        else:
            fails.append(msg)
    if peak > -1.0:
        fails.append(f"klip: puncak {peak:.1f} dBFS (turunkan target gain, jangan ditutup limiter)")
    return dict(src_lufs=ls, out_lufs=lo, gain=lo - ls, src_crest=cs, out_crest=co, peak=peak, fails=fails, accepted=accepted)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("source"); ap.add_argument("processed")
    ap.add_argument("--target", type=float, default=-16.0)
    ap.add_argument("--terima-pelan", default="", help="alasan tertulis: terima level sumber (tanpa limiter) bila gain bersih tidak mungkin")
    a = ap.parse_args()
    r = check(a.source, a.processed, a.target, a.terima_pelan)
    print(f"sumber {r['src_lufs']:.1f} LUFS -> hasil {r['out_lufs']:.1f} LUFS (gain {r['gain']:+.1f} dB) · "
          f"crest {r['src_crest']:.1f} -> {r['out_crest']:.1f} dB · puncak {r['peak']:.1f} dBFS")
    if r["accepted"]:
        print("TERIMA-PELAN: " + json.dumps(r["accepted"], ensure_ascii=False))
    print("PASS" if not r["fails"] else "FAIL: " + "; ".join(r["fails"]))
    sys.exit(1 if r["fails"] else 0)


if __name__ == "__main__":
    main()
