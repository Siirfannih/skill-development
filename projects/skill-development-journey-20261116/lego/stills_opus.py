#!/usr/bin/env python3
"""Still REVISI-2 Opus: satu still per butir R2-4 a–h + 6 langkah B11 (+ r11_mac_2) dari lego.json -> qc/still/revisi2/opus/<label>.jpg (960 px).
  python3 lego/stills_opus.py [label ...]"""
import os, subprocess, sys
from waktu import T
w5 = T["lihat_e"]
M = {"a_selesai": T["selesai"] + 0.5, "b_kartu_chatgpt": T["dua0"] + 1.0, "b_kartu_apit": T["lima"] + 1.3, "c_lintas_masuk": T["lintas"] + 0.45, "c_lintas_tahan": T["lintas"] + 1.4,
     "d_b3a_apple": T["apple"] + 1.0, "d_b3a_cinematic": T["cinematic"] + 1.5, "e_gitu": T["habis"] + 1.2, "e_kayak": T["lintas"] + 1.6,
     "f_ig_masih": T["masih2"] + 0.9, "f_ig_komentar2": T["masih2"] + 1.9, "f_b3a_bawah": T["b3a"] + 6.0, "g_dalam": T["decision"] + 0.75, "g_decision_masuk": T["decision"] + 0.12,
     "h_flip": T["finally"] + 0.45, "h_habis": T["habis"] + 0.9,
     "b11_1_chatgpt": w5 + 1.9, "b11_2_claude": w5 + 4.2, "b11_3_sessionB": w5 + 6.6, "b11_4_dicatat": w5 + 9.1, "b11_5_baca": w5 + 11.5, "b11_6_pullback": w5 + 12.5}
want = sys.argv[1:] or list(M)
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = os.path.join(P, "qc/still/revisi2/opus"); os.makedirs(out, exist_ok=True)
subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), "still.py")] + [f"{k}={M[k]:.3f}" for k in want])
from PIL import Image
for k in want:
    p = os.path.join(P, "qc/still", k + ".png")
    if os.path.exists(p):
        Image.open(p).convert("RGB").save(os.path.join(out, k + ".jpg"), quality=88); os.remove(p)
