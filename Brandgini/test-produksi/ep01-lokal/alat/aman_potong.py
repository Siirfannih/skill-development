#!/usr/bin/env python3
"""aman_potong.py (alat lokal ep01): sesuaikan usulan cut_check --suggest agar lolos validasi recut.py.
Alasan (LOG ep01, titik tersendat): cut_check menyisakan PRE 0,04 dtk sebelum kata berikut, tetapi guard recut minta >= 0,05 dtk
di kedua sisi, recut membulatkan rentang ke frame 30 fps (+-17 ms), dan ujung rentang harus di bawah ambang sunyi (puncak-32 dB).
Langkah: persempit ke [kata_kiri.e + 0,06, kata_kanan.s - 0,08]; geser ujung ke bagian paling sunyi (<= -47 dBFS di +-20 ms);
rentang yang menyentuh kata (diam 'di dalam kata') dibuang.
  aman_potong.py suara.wav potong.json words_src.json potong_aman.json
"""
import json, sys
import numpy as np, soundfile as sf
wav, src, wf, out = sys.argv[1:5]
x, sr = sf.read(wav, always_2d=True); x = x.mean(axis=1)
def db_win(t0, t1):
    i0, i1 = int(max(0, t0) * sr), int(min(len(x) / sr, t1) * sr)
    return 20 * np.log10(np.sqrt(np.mean(x[i0:i1] ** 2)) + 1e-9)
BAT = -49.0; WIN = 0.05   # recut: jendela sebelum awal rentang dan sesudah akhir rentang harus <= puncak-32 dB (-44.7 di ep01)
R = json.load(open(src)); W = json.load(open(wf))
res = []; drop = []
for a, b, why in R:
    kiri = [w for w in W if w["e"] <= a + 0.02]; kanan = [w for w in W if w["s"] >= b - 0.02]
    inside = [w for w in W if w["s"] < b and w["e"] > a]
    if inside: drop.append((a, b, why, "menyentuh kata " + inside[0]["w"])); continue
    import math
    a2 = max(a, math.ceil(((kiri[-1]["e"] if kiri else 0) + 0.05) * 30) / 30); b2 = min(b, math.floor(((kanan[0]["s"] if kanan else 1e9) - 0.05) * 30) / 30)
    while a2 < b2 and db_win(a2 - WIN, a2) > BAT: a2 += 0.01
    while b2 > a2 and db_win(b2, b2 + WIN) > BAT: b2 -= 0.01
    if b2 - a2 < 0.05: drop.append((a, b, why, "terlalu sempit/tidak sunyi")); continue
    res.append([round(a2, 3), round(b2, 3), why])
json.dump(res, open(out, "w"), ensure_ascii=False)
print(f"{len(res)} rentang dipakai, total {sum(b-a for a,b,_ in res):.2f} dtk; {len(drop)} dibuang:")
for d in drop: print("  ", [round(v,2) if isinstance(v,float) else v for v in d])
