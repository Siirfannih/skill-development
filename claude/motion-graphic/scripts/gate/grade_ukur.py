#!/usr/bin/env python3
"""Ukur hasil color grading footage dengan angka sebelum dinilai dengan mata (`references/grade.md`).

Grading dinilai dari still berdampingan; angka ini menunjuk apa yang perlu dilihat, bukan juri selera. Frame pertama
adalah basis (footage asli); frame berikutnya varian grading dari momen yang sama, urut sama per momen.

Per frame dicetak:
  kulit    : rata-rata RGB piksel kulit (YCbCr, area tengah), hue (°), saturasi, luma
  bayangan : rata-rata RGB 10 % piksel tergelap (arah warna area gelap)
  luma     : persentil 1 / 50 / 99,5 dan % piksel > 0,9
Penunjuk (dibandingkan dengan basis momen yang sama):
  HUE KULIT   hue kulit di luar 11–19°: < 11 terbaca merah muda/pucat, > 19 terbaca oranye/kuning
  KANAL HANCUR satu kanal bayangan < 0,012: hitam berubah jadi navy/hijau pekat, detail kain/rambut hilang
  GELAP        luma median turun > 30 % dari basis: ruangan redup tenggelam di layar HP
  SILAU        > 0,5 % piksel > 0,95

  python3 grade_ukur.py --momen 3 asli_1.png asli_2.png asli_3.png varA_1.png varA_2.png varA_3.png ...
  (PNG 16-bit dari: ffmpeg -ss T -i video -frames:v 1 -vf "<rantai>,format=rgb48le" out.png)
"""
import argparse, colorsys, subprocess
import numpy as np


def muat(p):
    pr = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
                         "-of", "csv=p=0", p], capture_output=True, text=True).stdout.strip().split(",")
    w, h = int(pr[0]), int(pr[1])
    b = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-f", "rawvideo", "-pix_fmt", "rgb48le", "-"],
                       capture_output=True).stdout
    return np.frombuffer(b, np.uint16).reshape(h, w, 3).astype(np.float32) / 65535


def ukur(a, mask=None):
    R, G, B = a[..., 0], a[..., 1], a[..., 2]; Y = 0.2126 * R + 0.7152 * G + 0.0722 * B
    if mask is None:
        h, w = Y.shape; Cb = (B - Y) / 1.8556; Cr = (R - Y) / 1.5748
        c = np.zeros_like(Y, bool); c[int(h * .2):int(h * .75), int(w * .35):int(w * .65)] = True
        mask = c & (Cr > .03) & (Cr < .16) & (Cb > -.12) & (Cb < 0) & (Y > .15) & (Y < .85)
    sk = a[mask].mean(0); hu, _, sa = colorsys.rgb_to_hls(*sk)
    gelap = a[Y <= np.percentile(Y, 10)].mean(0)
    return mask, dict(kulit=sk, hue=hu * 360, sat=sa, Yk=float(.2126 * sk[0] + .7152 * sk[1] + .0722 * sk[2]),
                      bayangan=gelap, p1=np.percentile(Y, 1), p50=np.percentile(Y, 50), p995=np.percentile(Y, 99.5),
                      atas09=100 * (Y > .9).mean(), atas095=100 * (Y > .95).mean())


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("frame", nargs="+"); ap.add_argument("--momen", type=int, default=1)
    a = ap.parse_args(); basis, masks = {}, {}
    for i, p in enumerate(a.frame):
        k = i % a.momen; m, s = ukur(muat(p), masks.get(k)); masks.setdefault(k, m)
        if k not in basis:
            basis[k] = s
        b = basis[k]; tanda = []
        if not 11 <= s["hue"] <= 19: tanda.append(f"HUE KULIT {s['hue']:.1f}°")
        if s["bayangan"].min() < 0.012: tanda.append("KANAL HANCUR")
        if s["p50"] < 0.7 * b["p50"]: tanda.append(f"GELAP (median {s['p50']:.3f} vs {b['p50']:.3f})")
        if s["atas095"] > 0.5: tanda.append("SILAU")
        print(f"{p.split('/')[-1]:24s} kulit {np.round(s['kulit'], 3)} hue {s['hue']:5.1f}° sat {s['sat']:.2f} "
              f"Y {s['Yk']:.3f} | bayangan {np.round(s['bayangan'], 3)} | p1 {s['p1']:.3f} p50 {s['p50']:.3f} "
              f"p99.5 {s['p995']:.3f} >0.9 {s['atas09']:.2f}%  {' · '.join(tanda)}")


if __name__ == "__main__":
    main()
