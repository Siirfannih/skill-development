#!/usr/bin/env python3
"""variasi_cek.py · penjaga "konten berulang/massal" (YouTube inauthentic content; Meta unoriginal) yang bisa mekanis.

  python3 tools/variasi_cek.py naskah_baru.md --arsip arsip/naskah/ [--meta meta_baru.json --log arsip/tayang.jsonl]
        [--maks-mirip 0.12] [--maks-hook 0.5]

Cek:
  MIRIP   kemiripan 3-gram kata (Jaccard) naskah baru vs tiap naskah di arsip > --maks-mirip -> GAGAL
          (YouTube: "similar or repetitive content ... minimal variation across videos")
  HOOK    8 kata pertama mirip (Jaccard 1-gram) > --maks-hook dengan salah satu dari 30 naskah terakhir -> GAGAL
  ROTASI  dari --log (satu JSON per baris: {"episode","cap","gaya","pilar"} urut tayang) + --meta episode baru:
          cap pembuka sama > 2x berturut, gaya sama > 3x berturut, pilar sama 2x berturut -> GAGAL
          (plan §2.1: tak ada pola hook dipakai > 6 dari 10 video; ini versi berturut-turut yang bisa dicek sebelum tayang)
Ambang default dikalibrasi dari 10 naskah plan (lihat uji/HASIL-UJI.md); naikkan hanya dengan alasan tertulis.
"""
import argparse, json, re, sys
from pathlib import Path


def kata(t):
    t = re.sub(r"^---.*?---", " ", t, flags=re.S)
    return re.findall(r"[a-z0-9]+", t.lower())


def ng(w, n=3):
    return {tuple(w[i:i + n]) for i in range(len(w) - n + 1)}


def jac(a, b):
    return len(a & b) / max(1, len(a | b))


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("naskah"); ap.add_argument("--arsip", required=True)
    ap.add_argument("--meta"); ap.add_argument("--log")
    ap.add_argument("--maks-mirip", type=float, default=0.12); ap.add_argument("--maks-hook", type=float, default=0.5)
    a = ap.parse_args()
    baru = kata(open(a.naskah, encoding="utf-8").read()); G = ng(baru); H = set(baru[:8])
    F = []; arsip = sorted(Path(a.arsip).glob("*.md"), key=lambda p: p.stat().st_mtime)
    skor = []
    for p in arsip:
        if p.resolve() == Path(a.naskah).resolve(): continue
        w = kata(p.read_text(encoding="utf-8")); skor.append((jac(G, ng(w)), p.name, jac(H, set(w[:8]))))
    for s, n, h in skor:
        if s > a.maks_mirip: F.append(f"MIRIP {s:.2f} dengan {n}")
    for s, n, h in skor[-30:]:
        if h > a.maks_hook: F.append(f"HOOK {h:.2f} mirip pembuka {n}")
    if skor:
        top = max(skor); print(f"arsip {len(skor)} naskah · kemiripan 3-gram tertinggi {top[0]:.3f} ({top[1]})")
    if a.meta and a.log and Path(a.log).exists():
        m = json.load(open(a.meta, encoding="utf-8"))
        log = [json.loads(l) for l in open(a.log, encoding="utf-8") if l.strip()] + [m]
        def run(k):
            n = 1
            for x in reversed(log[:-1]):
                if x.get(k) == m.get(k): n += 1
                else: break
            return n
        for k, lim in (("cap", 2), ("gaya", 3), ("pilar", 1)):
            if m.get(k) is not None and run(k) > lim: F.append(f"ROTASI {k} '{m.get(k)}' {run(k)}x berturut (maks {lim})")
    for x in F: print("  GAGAL", x)
    print("PASS" if not F else f"FAIL ({len(F)})"); sys.exit(1 if F else 0)


if __name__ == "__main__":
    main()
