#!/usr/bin/env python3
"""Still momen kunci per beat (waktu turunan T dari words.json) -> qc/still/<label>.png lewat still.py (960 px). Pakai: python3 lego/stills.py [label ...]"""
import os, subprocess, sys
import waktu as W
from waktu import T
M = {"B1_a": T["finally"] + 0.55, "B1_b": T["selesai"] + 0.35, "B1_c": T["b1b"] - 0.2, "B1b_a": T["ai_model"] + 0.8, "B1b_b": T["gemini1"] + 0.7, "B1b_c": T["decision"] + 0.9,
     "B2a_a": T["tapi"] + 1.2, "B2a_b": T["slop"] + 0.25, "B2b_a": T["b2b"] + 1.2, "B2b_b": T["putus"] + 0.8,
     "B3a_a": T["template"] + 0.4, "B3a_b": T["apple"] + 0.9, "B3a_c": T["cinematic"] + 0.9, "B3b_a": T["ngebalik"] + 1.3, "B3b_b": T["workflow2"] + 0.5,
     "B4a_a": T["b4a"] + 1.2, "B4a_b": T["balik"] + 0.3, "B4b_a": T["dua0"] + 0.7, "B4b_b": T["lima"] + 0.7,
     "B5a_a": T["b5a"] + 2.0, "B5a_b": T["kayak"] + 1.0, "B5b_a": T["lihat_e"] + 1.9, "B5b_b": T["lihat_e"] + 4.1, "B5b_c": T["session"] + 1.3, "B5b_d": T["kesalahan"] + 1.4,
     "B5b_e": T["loop"] + 1.9, "B6a_a": T["pct"] + 1.2, "B6a_b": T["ai_e"] - 0.1, "B6b_a": T["profesional"] + 0.7, "B6b_b": T["masih2"] + 1.1, "B6b_c": T["skill"] + 0.8,
     "tr_wajah_dunia": T["akhirnya"] + 0.3, "tr_dunia_wajah": T["b1b"] + 0.2, "tr_app_masuk": T["b3a"] + 0.15, "tr_app_keluar": T["gimana"] + 0.05,
     "tr_b5b_masuk": T["lihat_e"] + 0.1, "tr_b5b_keluar": T["sini_e"] + 0.1}
want = sys.argv[1:] or list(M)
subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), "still.py")] + [f"{k}={M[k]:.3f}" for k in want])
