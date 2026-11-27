#!/usr/bin/env python3
"""Pengukur tipografi kinetik (Lantai A9a): mencetak temuan sebagai informasi.

Keluar 0 untuk temuan selera/bentuk (CATATAN). Keluar 1 hanya untuk fakta terukur: dua blok tampil bersamaan (tabrakan),
teks di beat VISUAL, atau masukan rusak. --ketat (atau KETAT=1) mengembalikan keluar 1 untuk semua temuan.

Memeriksa teks.json (dari teks_plan.py, diisi model):
  - lengkap   : setiap blok punya peran (R1–R6, sub), kode (T01–T32), alasan, pos [x, y] -> CATATAN bila kosong
  - kode      : kode harus ada di pustaka teks.md §8; "fade" hanya untuk peran `sub` (eyebrow/sub-line kecil)
  - konsisten : satu peran = satu kode gerak di seluruh video (teks.md §8: peran dibedakan lewat gerak)
  - variasi   : tiap jendela 15 dtk yang berisi >= 6 blok memakai >= 3 kode berbeda (menutup "semua fade/word pop")
  - penekanan : tiap jendela 15 dtk yang berisi >= 6 blok punya >= 1 blok penekanan (R2/R3/R6) — kecuali alasan_tenang
                diisi di blok pertama jendela itu (adegan tenang yang disengaja)
  - tabrakan  : dua blok tampil bersamaan (waktu tumpang tindih > 2 f) -> FAKTA, keluar 1 (Lantai A8)
  - mode      : dengan --beats, blok yang tampil di beat bermode VISUAL -> FAKTA, keluar 1 (NEGATIF 6); beat tanpa blok tidak dituntut
Pakai: python3 kt_check.py teks.json [--w 1080 --h 1920] [--beats beats.json] [--ketat]
"""
import argparse, json, os, re, sys

KODE = {f"T{i:02d}" for i in range(1, 33)}
PENEKANAN = {"R2", "R3", "R6"}


def periksa(blocks, W=1080, H=1920, fps=30, visual=()):
    """-> (fakta, catatan). Fakta = tabrakan waktu dan teks di beat VISUAL; sisanya catatan selera/bentuk."""
    fakta, fails = [], []
    for b in blocks:
        for s, e in visual:
            if s <= b.get("t", -1) < e:
                fakta.append(f"{b['id']} '{str(b.get('teks', ''))[:20]}': tampil di beat VISUAL {s}-{e} dtk (tanpa teks)")
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
            fakta.append(f"{a['id']} & {b['id']} tampil bersamaan {a['t'] + a['dur'] - b['t']:.2f} dtk")
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
    return sorted(set(fakta), key=fakta.index), sorted(set(fails), key=fails.index)


def check(blocks, W=1080, H=1920, fps=30, visual=()):
    """Semua temuan (fakta + catatan) sebagai satu daftar."""
    fakta, catatan = periksa(blocks, W, H, fps, visual)
    return fakta + catatan


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("teks"); ap.add_argument("--w", type=int, default=1080); ap.add_argument("--h", type=int, default=1920)
    ap.add_argument("--beats", help="beats.json: blok di beat VISUAL dilaporkan sebagai fakta (keluar 1)")
    ap.add_argument("--ketat", action="store_true", help="semua temuan keluar 1 (juga KETAT=1)")
    a = ap.parse_args()
    blocks = json.load(open(a.teks, encoding="utf-8"))
    vis = []
    if a.beats:
        bj = json.load(open(a.beats, encoding="utf-8")); vis = [tuple(b["t"]) for b in (bj.get("beats", []) if isinstance(bj, dict) else bj) if b.get("mode") == "VISUAL" and b.get("t")]
    fakta, catatan = periksa(blocks, a.w, a.h, visual=vis)
    ketat = a.ketat or os.environ.get("KETAT") == "1"
    kodes = {}
    for b in blocks:
        kodes[str(b.get("kode"))] = kodes.get(str(b.get("kode")), 0) + 1
    print(f"{len(blocks)} blok · gerak: " + ", ".join(f"{k}×{v}" for k, v in sorted(kodes.items(), key=lambda x: -x[1])))
    for f in fakta[:25]:
        print("  FAKTA " + f)
    for f in catatan[:25]:
        print("  CATATAN " + f)
    print("tidak ada temuan" if not (fakta or catatan) else f"{len(fakta)} fakta, {len(catatan)} catatan")
    sys.exit(1 if fakta or (catatan and ketat) else 0)


if __name__ == "__main__":
    main()
