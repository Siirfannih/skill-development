#!/usr/bin/env python3
"""Timeline untuk editor dari rekaman talking head mentah (paket selects, `references/selects-editor.md`).

Masukan klip.json:
  {"fps": "60000/1001", "tc_awal": "14:51:26;08",
   "klip": [{"no": "01", "beat": "HOOK", "in": 348.60, "out": 350.25, "ucapan": "...", "mode": "...",
             "visual": "...", "audio": "..."},
            {"no": "02", "beat": "JUDUL", "grafis": 0.9, "ucapan": "—", ...}]}
  `in`/`out` = detik di file sumber. Klip tanpa sumber (judul, jeda, tahan frame) memakai `grafis` = durasi.
  `tc_awal` = timecode frame pertama file sumber (ffprobe: stream tag timecode). Titik koma = drop-frame.

Keluaran di DIR: timeline.json {"rows": [...], "total": "mm:ss.xx"} dan timeline_editor.csv
(no, beat, tl_in, tl_out, durasi, src_in, src_out, tc_in, tc_out, ucapan, mode, visual, audio) +
angka detik (tl_in_s, src_in_s, src_out_s) untuk skrip lain (`rakitan_cek.py`, `cue_sumber.py`).

  python3 timeline.py klip.json DIR
"""
import csv, json, sys
from fractions import Fraction


def tc_alat(fps):
    nom = round(float(fps)); df = abs(float(fps) - nom) > 0.001; drop = nom // 15 if df else 0
    f10, f1 = nom * 600 - drop * 9, nom * 60 - drop
    sep = ";" if df else ":"

    def ke_frame(tc):
        h, m, s, f = (int(x) for x in tc.replace(";", ":").split(":"))
        tm = 60 * h + m
        return (3600 * h + 60 * m + s) * nom + f - drop * (tm - tm // 10)

    def ke_tc(fr):
        if drop:
            d, r = divmod(fr, f10)
            fr += drop * 9 * d + (drop * ((r - drop) // f1) if r > drop else 0)
        f = fr % nom; s = fr // nom % 60; m = fr // (nom * 60) % 60; h = fr // (nom * 3600)
        return f"{h:02d}:{m:02d}:{s:02d}{sep}{f:02d}"
    return ke_frame, ke_tc


def mmss(x):
    m, s = divmod(x, 60)
    return f"{int(m):02d}:{s:05.2f}"


def main(src, out):
    d = json.load(open(src, encoding="utf-8")); fps = Fraction(d.get("fps", "30000/1001"))
    ke_frame, ke_tc = tc_alat(fps); f0 = ke_frame(d["tc_awal"]) if d.get("tc_awal") else 0
    tc = lambda sec: ke_tc(f0 + round(sec * fps))
    rows, t = [], 0.0
    for k in d["klip"]:
        g = k.get("grafis")
        dur = float(g) if g is not None else k["out"] - k["in"]
        if dur <= 0:
            sys.exit(f"klip {k['no']}: durasi {dur:.3f} <= 0")
        r = dict(no=k["no"], beat=k.get("beat", ""), tl_in=mmss(t), tl_out=mmss(t + dur), durasi=f"{dur:.2f}",
                 src_in="—" if g is not None else mmss(k["in"]), src_out="—" if g is not None else mmss(k["out"]),
                 tc_in="—" if g is not None else tc(k["in"]), tc_out="—" if g is not None else tc(k["out"]),
                 ucapan=k.get("ucapan", "—"), mode=k.get("mode", ""), visual=k.get("visual", ""), audio=k.get("audio", ""))
        rows.append(r | dict(tl_in_s=round(t, 3), src_in_s=None if g is not None else k["in"],
                             src_out_s=None if g is not None else k["out"]))
        t += dur
    with open(f"{out}/timeline_editor.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=[k for k in rows[0] if not k.endswith("_s")], extrasaction="ignore")
        w.writeheader(); w.writerows(rows)
    json.dump(dict(rows=rows, total=mmss(t), fps=str(fps), tc_awal=d.get("tc_awal")),
              open(f"{out}/timeline.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("TOTAL", mmss(t), "·", len(rows), "klip")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(*sys.argv[1:])
