#!/usr/bin/env python3
"""Gerbang suara asli pembicara (format klip podcast/wawancara).

Membandingkan render dengan klip sumber (atau stem dialog sebelum mix). Suara pembicara yang
diproses (LPF, denoise, kompresor, loudnorm dinamis, mono) kehilangan udara di atas 9 kHz dan
rentang dinamikanya menyempit; itu yang terdengar "mendem".

Pakai:  python3 voice_fidelity.py sumber.mp4 render.mp4 [--seconds 60]
Lulus:  porsi energi > 9 kHz render >= 70 % porsi sumber
        LRA render >= LRA sumber - 2 LU   (musik/SFX yang terlalu tinggi juga menyempitkan LRA)
Keluaran: angka kedua file + PASS/FAIL. Exit code 1 bila FAIL.
"""
import argparse, re, subprocess, sys
import numpy as np

def pcm(path, secs):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-t", str(secs), "-vn", "-ac", "1", "-ar", "48000",
                          "-f", "f32le", "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.float32)

def hf_share(x, sr=48000):
    n = 8192; X = 0
    for i in range(0, len(x) - n, n // 2):
        X = X + np.abs(np.fft.rfft(x[i:i + n] * np.hanning(n))) ** 2
    f = np.fft.rfftfreq(n, 1 / sr)
    return 100 * X[f >= 9000].sum() / X[f >= 50].sum()

def loud(path, secs):
    err = subprocess.run(["ffmpeg", "-hide_banner", "-t", str(secs), "-i", path, "-af", "ebur128", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    summ = err[err.rfind("Summary"):]
    i = float(re.search(r"I:\s+(-?[\d.]+)", summ).group(1)); lra = float(re.search(r"LRA:\s+([\d.]+)", summ).group(1))
    return i, lra

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("source"); ap.add_argument("render")
    ap.add_argument("--seconds", type=float, default=60); a = ap.parse_args()
    rows = {}
    for k, p in (("sumber", a.source), ("render", a.render)):
        rows[k] = (hf_share(pcm(p, a.seconds)),) + loud(p, a.seconds)
        print(f"{k:7s} >9kHz {rows[k][0]:.3f} %   I {rows[k][1]:.1f} LUFS   LRA {rows[k][2]:.1f} LU")
    ratio = rows["render"][0] / max(rows["sumber"][0], 1e-9); dlra = rows["render"][2] - rows["sumber"][2]
    ok_hf, ok_lra = ratio >= 0.70, dlra >= -2.0
    print(f"udara >9kHz render/sumber = {ratio:.2f} (>= 0,70) {'PASS' if ok_hf else 'FAIL: suara diproses (LPF/denoise/kompresi)'}")
    print(f"selisih LRA = {dlra:+.1f} LU (>= -2) {'PASS' if ok_lra else 'FAIL: dinamika suara ditekan atau bed terlalu tinggi'}")
    ok = ok_hf and ok_lra; print("PASS" if ok else "FAIL"); sys.exit(0 if ok else 1)

if __name__ == "__main__":
    main()
