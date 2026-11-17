#!/usr/bin/env python3
"""Gerbang celah KT (audit ronde 7 W1): jeda antar blok KT berurutan 1–5 frame = teks hilang sebentar lalu muncul lagi (kedip).
Aturan: bila jeda < 6 frame, blok sebelumnya DITAHAN sampai blok berikutnya masuk (tanpa animasi keluar). Jeda >= 6 frame = jeda nyata, boleh.
Waktu keluar tampak = akhir lapisan dikurangi animasi keluar kecuali 2 f awal yang masih terbaca (R1/R2 5 f, R3 6 f), kecuali keluarAt diberikan. Hanya KT r1/r2/r3/putus/bubble/viral (hero/slab punya aturan sendiri).
  python3 lego/cek_celah_kt.py   -> exit 1 bila ada celah 1–5 frame"""
import json, os, sys
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FPS = 30000 / 1001
lego = {e["id"]: e for e in json.load(open(os.path.join(P, "lego/lego.json")))["lapisan"]}
lap = {a["id"]: a for a in json.load(open(os.path.join(P, "lego/lapisan.json")))}
KT = sorted([i for i, a in lap.items() if a["comp"] == "KT" and a["props"].get("gaya") in ("r1", "r2", "r3", "putus", "bubble", "viral") and i in lego], key=lambda i: lego[i]["t"])
LV = {"r1": 5, "r2": 5, "r3": 6, "putus": 6, "bubble": 6, "viral": 6}
bad = []
for a, b in zip(KT, KT[1:]):
    pa = lap[a]["props"]; d = lap[a]["durasi"]; ka = pa.get("keluarAt")
    vis_end = lego[a]["t"] + (d if ka is not None and ka >= d else ka if ka is not None else d - (LV[pa["gaya"]] - 2) / 30)      # ditahan (keluarAt >= durasi) = terlihat penuh; animasi keluar kurva 'leave' mulai lambat: 2 f pertama masih terbaca
    gap = (lego[b]["t"] - vis_end) * FPS
    if 0.5 <= gap < 5.5: bad.append((lego[a]["t"], a, b, round(gap)))
for t, a, b, g in bad:
    print(f"  {t:6.2f} dtk  {a} ('{lap[a]['props']['teks'][:22]}') -> {b} ('{lap[b]['props']['teks'][:22]}')  celah {g} frame")
print(f"KT {len(KT)} · celah 1–5 frame: {len(bad)}")
sys.exit(1 if bad else 0)
