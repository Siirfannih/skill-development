#!/usr/bin/env python3
"""Still REVISI-2 (butir R2-1..R2-4 a–h + B11) dari lego.json (komposit lapisan cache) -> qc/still/revisi2/<label>.jpg (960 px).
  SDJ_EDIT=lego/_r6 python3 lego/stills2.py [label ...]"""
import os, subprocess, sys
import waktu as W
from waktu import T
w5 = T["lihat_e"]
M = {"a_selesai": T["selesai"] + 0.95, "b_kartu_chatgpt": T["dua0"] + 1.0, "b_kartu_apit": T["lima"] + 1.3, "c_lintas": T["lintas"] + 1.0,
     "d_b3a_apple": T["apple"] + 1.0, "d_b3a_cinematic": T["cinematic"] + 1.5, "e_gitu": T["gitu_b4"] + 0.15, "e_kayak": T["lintas"] + 1.6,
     "f_ig_masih": T["masih2"] + 0.9, "f_ig_komentar2": T["masih2"] + 1.9, "f_b3a_bawah": T["b3a"] + 6.0, "g_dalam": T["decision"] + 0.15, "g_decision": T["decision"] + 0.9,
     "h_flip": T["finally"] + 0.45, "h_habis": T["habis"] + 0.9,
     "b11_1_chatgpt": w5 + 1.9, "b11_2_claude": w5 + 3.7, "b11_3_sessionB": w5 + 6.6, "b11_4_dicatat": w5 + 9.1, "b11_5_baca": w5 + 11.2, "b11_6_pullback": w5 + 12.5}
want = sys.argv[1:] or list(M)
out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "qc/still/revisi2")
os.makedirs(out, exist_ok=True)
subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), "still.py")] + [f"{k}={M[k]:.3f}" for k in want])
from PIL import Image
for k in want:
    p = os.path.join(os.path.dirname(out), k + ".png")
    if os.path.exists(p):
        Image.open(p).convert("RGB").save(os.path.join(out, k + ".jpg"), quality=88); os.remove(p)
