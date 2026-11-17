#!/usr/bin/env python3
"""Kerangka teks.json dari transkrip: isi teks KT/subtitle sudah pasti = ucapan, jadi yang dihitung
mesin hanya WAKTU dan DURASI tiap blok. Peran, kode gerak (T..), gaya (G..), posisi, dan alasan diputuskan model
dengan tabel `references/typography.md` §8a, lalu `kt_check.py` memeriksanya.

Blok: 1–3 kata (Lantai A4), pecah di tanda baca atau jeda >= 0,25 dtk. Muncul +2 f setelah awal kata pertama
(T19: +1…+4 f), tampil sampai kata terakhir selesai diucapkan + hold, tidak menabrak blok berikutnya (Lantai A8).
Pakai: python3 teks_plan.py words.json teks.json [--fps 30] [--maks-kata 3]
"""
import argparse, json, re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "gate"))
from cut_check import load_words  # noqa: E402  (format kata yang sama dengan gerbang suara)


def plan(words, fps=30, max_words=3):
    blocks, cur = [], []
    for k, w in enumerate(words):
        cur.append(k)
        end = bool(re.search(r"[.,?!;:]$", w["w"]))
        gap = words[k + 1]["s"] - w["e"] if k + 1 < len(words) else 9
        if end or gap >= 0.25 or len(cur) >= max_words:
            blocks.append(cur); cur = []
    if cur:
        blocks.append(cur)
    out = []
    for n, b in enumerate(blocks):
        ws = [words[i] for i in b]
        t = ws[0]["s"] + 2 / fps
        nxt = words[blocks[n + 1][0]]["s"] + 2 / fps if n + 1 < len(blocks) else ws[-1]["e"] + 1.0
        hold = 0.25 + 0.3 * len(ws)
        dur = max(ws[-1]["e"] - t + 0.05, min(hold, nxt - t))
        dur = min(dur, nxt - t) if nxt > t else dur
        out.append({"id": f"T{n + 1:03d}", "kata": [b[0], b[-1]], "teks": " ".join(w["w"] for w in ws),
                    "t": round(t, 3), "dur": round(dur, 3),
                    "peran": "", "kode": "", "gaya": "", "pos": None, "alasan": ""})
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("words"); ap.add_argument("out")
    ap.add_argument("--fps", type=int, default=30); ap.add_argument("--maks-kata", type=int, default=3)
    a = ap.parse_args()
    blocks = plan(load_words(a.words), a.fps, a.maks_kata)
    json.dump(blocks, open(a.out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{len(blocks)} blok -> {a.out}. Isi peran/kode/gaya/pos/alasan per blok (typography.md §8a), lalu kt_check.py")


if __name__ == "__main__":
    main()
