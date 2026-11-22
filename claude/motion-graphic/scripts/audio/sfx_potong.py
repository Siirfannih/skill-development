#!/usr/bin/env python3
"""Potong ujung SFX di batas objeknya tanpa terdengar putus, plus gerbangnya.

Dipakai saat bunyi lebih panjang dari objek/visual yang memicunya (cakupan: bunyi hidup selama objeknya hidup).
  1. lembah  : mundur ke jeda sunyi sungguhan terakhir setelah serangan (>= 25 ms berturut-turut di bawah -24 dB dari puncak) dalam
               0,35 dtk sebelum batas; fade 15 ms DI DALAM jeda itu, jadi bunyi berhenti setelah satu ketukan utuh.
  2. fade-panjang : bila tak ada jeda (bunyi menerus: whoosh, pad, arp), fade kosinus 150-300 ms yang SELESAI di batas.
Gerbang: FAIL bila level di awal fade > -20 dB dari puncak dan fade < 150 ms (bunyi hilang saat masih keras).

Pakai sebagai modul:
    from sfx_potong import potong_akhir, gerbang
    y2, lap = potong_akhir(y, sr, n_end, onset)      # lap = {mode, mulai_s, fade_ms, db_vs_puncak, dibuang_s}
    ok, gagal = gerbang([lap, ...])
Pakai dari CLI (dengar/cek satu file):
    python3 sfx_potong.py bunyi.wav --sampai 0.48 [--out terpotong.wav]
"""
import argparse, sys
import numpy as np


def _env(y, sr, ms=10):
    w = max(1, int(sr * ms / 1000))
    return np.sqrt(np.convolve(y.astype(float) ** 2, np.ones(w) / w, "same"))


def _cos(n):
    return 0.5 - 0.5 * np.cos(np.linspace(0, np.pi, max(1, n)))   # 0 -> 1


def potong_akhir(y, sr, n_end, onset=0, cari_s=0.35, sunyi_db=-24.0, jeda_min_s=0.025, fade_min_s=0.15, fade_maks_s=0.30):
    """y mono float; n_end = sampel batas (objek selesai). Kembalikan (y terpotong, laporan) atau (y, None) bila tak perlu."""
    if n_end >= len(y):
        return y, None
    if n_end <= onset:
        return np.zeros(0), dict(mode="senyap", mulai_s=0.0, fade_ms=0, db_vs_puncak=-120.0, dibuang_s=round(len(y) / sr, 3))
    y = y.astype(float).copy(); e = _env(y, sr); pk = e.max() + 1e-12; pk_i = int(np.argmax(e))
    serang = int(np.argmax(e >= pk * 10 ** (-12 / 20)))   # titik pertama bunyi terdengar kuat (ketukan pertama, bukan puncak global)
    c0 = max(onset, serang, n_end - int(cari_s * sr))     # sunyi sebelum serangan bukan ujung bunyi
    sunyi = (e[c0:n_end] < pk * 10 ** (sunyi_db / 20)).astype(np.int8)
    d = np.diff(np.concatenate([[0], sunyi, [0]])); a_, b_ = np.flatnonzero(d == 1), np.flatnonzero(d == -1)
    runs = [(a, b) for a, b in zip(a_, b_) if b - a >= int(jeda_min_s * sr) or b == len(sunyi)]
    if runs:
        f0 = c0 + int(runs[-1][0]); v = min(n_end, f0 + int(0.015 * sr)); fl = v - f0; mode = "lembah"
        out = y[:v]; out[f0:] *= _cos(fl)[::-1]
    else:
        fl = int(min(max(fade_min_s * sr, n_end - pk_i), fade_maks_s * sr, n_end - onset)); f0 = max(0, n_end - fl); mode = "fade-panjang"
        out = y[:n_end]; out[f0:] *= _cos(len(out) - f0)[::-1]
    lap = dict(mode=mode, mulai_s=round(f0 / sr, 3), fade_ms=round(fl / sr * 1000),
               db_vs_puncak=round(float(20 * np.log10(e[min(f0, len(e) - 1)] / pk + 1e-12)), 1), dibuang_s=round((len(y) - len(out)) / sr, 3))
    return out, lap


def gerbang(laporan, keras_db=-20.0, fade_min_ms=150):
    gagal = [l for l in laporan if l and l["mode"] != "senyap" and l["db_vs_puncak"] > keras_db and l["fade_ms"] < fade_min_ms]
    return not gagal, gagal


if __name__ == "__main__":
    import soundfile as sf
    ap = argparse.ArgumentParser(); ap.add_argument("file"); ap.add_argument("--sampai", type=float, required=True, help="detik batas objek, dihitung dari awal file")
    ap.add_argument("--out"); a = ap.parse_args()
    y, sr = sf.read(a.file); y = y.mean(axis=1) if y.ndim > 1 else y
    out, lap = potong_akhir(y, sr, int(a.sampai * sr))
    print(lap or "tidak perlu dipotong (file lebih pendek dari batas)")
    ok, _ = gerbang([lap]); print("gerbang potong:", "LULUS" if ok else "GAGAL (hilang saat masih keras)")
    if a.out: sf.write(a.out, out, sr)
    sys.exit(0 if ok else 1)
