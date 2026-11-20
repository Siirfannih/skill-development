#!/usr/bin/env python3
"""Pindahkan cue (SFX, aset motion, titik musik) dari timeline lama ke timeline baru lewat WAKTU SUMBER.

Saat titik potong digeser, detik timeline semua klip sesudahnya ikut bergeser; cue yang disimpan sebagai detik timeline
jadi meleset dari kata/objeknya. Skrip ini menerjemahkan tiap cue: detik timeline lama → klip lama + detik sumber →
klip baru yang memuat detik sumber itu → detik timeline baru. Cue di klip tanpa sumber (judul, jeda) ikut offset dari
awal klip ber-nomor sama. Cue yang momen sumbernya sudah dibuang dari timeline baru ditandai HILANG (putuskan ulang).

  python3 cue_sumber.py lama/timeline.json baru/timeline.json cues.json OUT.json [--kunci tl]
  cues.json = list objek dengan detik timeline di kunci --kunci (bawaan "tl"). Exit 1 bila ada cue HILANG.
Timeline = keluaran `timeline.py` (atau rows dengan tl_in/src_in/src_out "mm:ss.xx").
"""
import argparse, json, sys


def detik(x):
    m, s = x.split(":")
    return int(m) * 60 + float(s)


def baris(p):
    rows = json.load(open(p, encoding="utf-8"))["rows"]
    for r in rows:
        r["_t0"] = r.get("tl_in_s", detik(r["tl_in"])); r["_t1"] = r["_t0"] + float(r["durasi"])
        r["_a"] = None if r["src_in"] == "—" else r.get("src_in_s") or detik(r["src_in"])
        r["_b"] = None if r["src_in"] == "—" else r.get("src_out_s") or detik(r["src_out"])
    return rows


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("lama"); ap.add_argument("baru"); ap.add_argument("cues")
    ap.add_argument("out"); ap.add_argument("--kunci", default="tl"); a = ap.parse_args()
    lama, baru = baris(a.lama), baris(a.baru); per_no = {r["no"]: r for r in baru}
    cues = json.load(open(a.cues, encoding="utf-8")); hilang = 0
    for c in cues:
        t = float(c[a.kunci]); r = next((r for r in lama if r["_t0"] <= t < r["_t1"]), None)
        baru_t = None
        if r is None:
            pass
        elif r["_a"] is None:
            n = per_no.get(r["no"])
            baru_t = None if n is None else n["_t0"] + min(t - r["_t0"], n["_t1"] - n["_t0"])
        else:
            src = r["_a"] + (t - r["_t0"])
            n = next((n for n in baru if n["_a"] is not None and n["_a"] <= src < n["_b"]), None)
            baru_t = None if n is None else n["_t0"] + src - n["_a"]
            c["sumber"] = round(src, 3)
        if baru_t is None:
            c["status"] = "HILANG"; hilang += 1
            print(f"HILANG  {c.get('sfx') or c.get('nama') or c}: tl lama {t:.2f}")
        else:
            c[a.kunci + "_lama"] = t; c[a.kunci] = round(baru_t, 3)
    json.dump(cues, open(a.out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{len(cues) - hilang} cue dipindah, {hilang} HILANG")
    sys.exit(1 if hilang else 0)


if __name__ == "__main__":
    main()
