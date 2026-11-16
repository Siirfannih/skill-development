#!/usr/bin/env python3
"""Gerbang tipografi kinetik (Lantai A9a; Irfan 16 Nov: "animasi KT selalu sama, hampir semuanya fade").

Memeriksa teks.json (dari teks_plan.py, diisi model):
  - lengkap   : setiap blok punya peran (R1–R6, sub), kode (T01–T32), alasan, pos [x, y] -> FAIL bila kosong
  - kode      : kode harus ada di pustaka typography.md §8; "fade" hanya untuk peran `sub` (eyebrow/sub-line kecil)
  - konsisten : satu peran = satu kode gerak di seluruh video (typography.md §8: peran dibedakan lewat gerak)
  - variasi   : tiap jendela 15 dtk yang berisi >= 6 blok memakai >= 3 kode berbeda (menutup "semua fade/word pop")
  - penekanan : tiap jendela 15 dtk yang berisi >= 6 blok punya >= 1 blok penekanan (R2/R3/R6) — kecuali alasan_tenang
                diisi di blok pertama jendela itu (adegan tenang yang disengaja)
  - tabrakan  : dua blok tampil bersamaan (waktu tumpang tindih > 2 f) -> FAIL (Lantai A8)
Pakai: python3 kt_check.py teks.json [--w 1080 --h 1920]
"""
import argparse, json, re, sys

KODE = {f"T{i:02d}" for i in range(1, 33)}
PENEKANAN = {"R2", "R3", "R6"}


def check(blocks, W=1080, H=1920, fps=30):
    fails = []
    for b in blocks:
        miss = [k for k in ("peran", "kode", "alasan") if not str(b.get(k) or "").strip()]
        if b.get("pos") in (None, "", []):
            miss.append("pos")
        if miss:
            fails.append(f"{b['id']} '{b.get('teks', '')[:20]}': kosong {', '.join(miss)}"); continue
        k = str(b["kode"]).upper()
        if k == "FADE":
            if b["peran"] != "sub":
                fails.append(f"{b['id']}: fade hanya untuk peran sub (eyebrow/sub-line), bukan {b['peran']}")
        elif k not in KODE:
            fails.append(f"{b['id']}: kode {b['kode']} tidak ada di pustaka T01–T32")
        x, y = b["pos"][:2]
        if not (0.05 * W <= x <= 0.95 * W and 0.05 * H <= y <= 0.95 * H):
            fails.append(f"{b['id']}: pos {b['pos']} di luar margin aman 5 %")
    roles = {}
    for b in blocks:
        if b.get("peran") and b.get("kode"):
            roles.setdefault(b["peran"], set()).add(str(b["kode"]).upper())
    for r, ks in roles.items():
        if len(ks) > 1:
            fails.append(f"peran {r} memakai {len(ks)} gerak berbeda: {', '.join(sorted(ks))} (satu peran satu gerak)")
    ts = sorted(blocks, key=lambda b: b["t"])
    for a, b in zip(ts, ts[1:]):
        if a["t"] + a["dur"] - b["t"] > 2 / fps:
            fails.append(f"{a['id']} & {b['id']} tampil bersamaan {a['t'] + a['dur'] - b['t']:.2f} dtk")
    if ts:
        t, end = ts[0]["t"], ts[-1]["t"]
        while t <= end:
            win = [b for b in ts if t <= b["t"] < t + 15]
            if len(win) >= 6:
                kodes = {str(b.get("kode", "")).upper() for b in win}
                if len(kodes) < 3:
                    fails.append(f"{t:.0f}–{t + 15:.0f} dtk: {len(win)} blok hanya {len(kodes)} gerak ({', '.join(sorted(kodes))}); minimal 3")
                if not any(b.get("peran") in PENEKANAN for b in win) and not win[0].get("alasan_tenang"):
                    fails.append(f"{t:.0f}–{t + 15:.0f} dtk: tidak ada penekanan (R2/R3/R6) dan tidak ada alasan_tenang")
            t += 5
    return sorted(set(fails), key=fails.index)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("teks"); ap.add_argument("--w", type=int, default=1080); ap.add_argument("--h", type=int, default=1920)
    a = ap.parse_args()
    blocks = json.load(open(a.teks, encoding="utf-8"))
    fails = check(blocks, a.w, a.h)
    kodes = {}
    for b in blocks:
        kodes[str(b.get("kode"))] = kodes.get(str(b.get("kode")), 0) + 1
    print(f"{len(blocks)} blok · gerak: " + ", ".join(f"{k}×{v}" for k, v in sorted(kodes.items(), key=lambda x: -x[1])))
    for f in fails[:25]:
        print("  " + f)
    print("PASS" if not fails else f"FAIL: {len(fails)} temuan")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
