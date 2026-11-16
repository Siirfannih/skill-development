#!/usr/bin/env python3
"""Audit R4: setiap kata KT harus tampil <= 2 frame sebelum onset kata di edit/words.json (R6). Memeriksa SEMUA blok teks.json:
waktu tampil kata ke-k = t lapisan (lego.json) + wt[k] (lapisan.json). Keluar 1 bila ada yang lebih awal dari onset - 2 f."""
import json, os, sys
import waktu as W
P = W.P
F = 30000 / 1001
lego = {e["id"]: e for e in json.load(open(os.path.join(P, "lego/lego.json")))["lapisan"]}
lap = {e["id"]: e for e in json.load(open(os.path.join(P, "lego/lapisan.json")))}
bl = json.load(open(os.path.join(P, "teks.json"), encoding="utf-8"))
bad, n = [], 0
for b in bl:
    for key in (b["id"], b["id"] + "_" + str(b.get("sisip", ""))):
        if key not in lego or key not in lap: continue
        i0, i1 = b["kata"]; units = W.U[i0:i1 + 1]; p = lap[key]["props"]; wt = p.get("wt") or [0.0]
        vis = p["teks"].split(); on = [u["s"] for u in units]
        if b.get("sisip") and key.endswith(str(b["sisip"])): on = [W.U[W.idx(b["sisip"], lego[key]["t"] - 0.05)]["s"]]
        elif len(on) != len(wt):
            on = [on[min(k, len(on) - 1)] for k in range(len(wt))] if b.get("sisip") is None else [u["s"] for u in units if W.nrm(u["w"]) != W.nrm(b["sisip"])]
        for k, w in enumerate(wt):
            n += 1; sel = lego[key]["t"] + w - on[min(k, len(on) - 1)]
            if sel < -2 / 30 - 1 / F: bad.append((b["id"], p["teks"], k, round(sel, 3)))
print(f"kata dicek {n}; lebih awal dari onset-2f: {len(bad)}")
for x in bad[:20]: print("  ", x)
sys.exit(1 if bad else 0)
