#!/usr/bin/env python3
"""Ukur pts tiap frame DASAR (tanpa lapisan, tanpa audio) lewat compose.py yang sama.

  python3 base_pts.py <lego.json> [--json keluaran.json]

Keluar 1 bila ada pts ganda (dua frame berpts sama) atau frame yang pts-nya menyimpang >= 1 frame dari i/fps;
keluar 0 bila indeks frame = waktu di semua frame. Penyebab umum: klip dasar 1 frame (zoompan) membuat concat
menggandakan pts; compose.py validate sudah menolak klip < 2 frame, alat ini menangkap sisanya dari hasil nyata.
Batas: membaca seluruh trek dasar (waktu ~ durasi video); hanya mengukur dasar, bukan lapisan.
"""
import argparse, json, os, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import compose


def ukur(L, base_dir):
    L = dict(L, lapisan=[]); L.pop("audio", None)
    cmd, _ = compose.build_cmd(L, base_dir)
    fi = cmd.index("-filter_complex")
    cmd[fi + 1] = cmd[fi + 1].rsplit("[v]", 1)[0] + ",showinfo[v]"
    cmd[cmd.index("-v") + 1] = "info"
    cmd = cmd[:cmd.index("-map") + 2] + ["-f", "null", "-"]
    r = subprocess.run(cmd, capture_output=True, text=True)
    pts = [float(ln.split("pts_time:")[1].split()[0]) for ln in r.stderr.splitlines() if "pts_time:" in ln and " n:" in ln]
    return pts, r.returncode


def periksa(pts, fps):
    temuan = []
    for i, t in enumerate(pts):
        lag = t * fps - i
        if i and t <= pts[i - 1] + 1e-6:
            temuan.append(f"frame {i}: pts ganda/mundur ({t:.6f})")
        elif abs(lag) >= 0.999:
            temuan.append(f"frame {i}: pts {t:.6f} menyimpang {lag:+.2f} frame dari i/fps")
    return temuan


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("lego"); ap.add_argument("--json")
    a = ap.parse_args()
    L = json.load(open(a.lego, encoding="utf-8")); base = os.path.dirname(os.path.abspath(a.lego))
    errs, _ = compose.validate(dict(L, lapisan=[], audio=None), base)
    if errs:
        print("FAIL: " + "; ".join(errs[:10])); sys.exit(1)
    pts, rc = ukur(L, base)
    if rc or not pts:
        print(f"FAIL: ffmpeg gagal mengukur dasar (rc={rc}, {len(pts)} frame)"); sys.exit(1)
    if a.json: json.dump(pts, open(a.json, "w"))
    temuan = periksa(pts, L["fps"])
    print(f"{len(pts)} frame dasar · " + ("PASS" if not temuan else f"FAIL ({len(temuan)} temuan)"))
    for t in temuan[:20]: print("GAGAL " + t)
    sys.exit(1 if temuan else 0)


if __name__ == "__main__":
    main()
