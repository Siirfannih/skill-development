#!/usr/bin/env python3
"""jelajah_gaya.py: build the side-by-side sheet for style exploration (dunia-visual.md §7).

  python3 jelajah_gaya.py --arah A=a.png --arah B=b.png --arah C=c.png \
      --patokan A=ref1.jpg --patokan B=ref2.jpg --patokan C=ref3.jpg --keluar <folder> [--judul "beat 03"]

Each direction (arah) is one rendered frame of the same beat. Its anchors (patokan) are the reference keyframes it leans on;
an arah may have 0-3 of them. The same tool makes a per-technique sheet: one --arah plus its source keyframes.

Writes to <keluar>:
  jelajah-thumb.jpg  every row at phone-thumbnail size (frame 320 px wide): the "do they look different?" view
  jelajah-penuh.jpg  every row at working size (frame 1280 px wide, anchors 640 px): the detail view
  jelajah.json       per-direction numbers + pairwise thumbnail distance

Distance between two directions = mean CIE76 dE of 48x27 thumbnails (colour + layout together). Below --mirip (default 12)
the pair is reported as MIRIP: at thumbnail size they read as one direction, so one of them must change material, not hue.
Numbers point at what to look at; the decision stays with the eye. Exit 0 always unless input is wrong (2).
"""
import argparse, itertools, json, os, sys

import numpy as np
from PIL import Image, ImageDraw

THUMB_W, FULL_W, ANCHOR_FULL_W = 320, 1280, 640
GAP, LABEL_H = 12, 26


def lab(rgb):
    """sRGB uint8 (..., 3) -> CIE Lab, D65."""
    c = rgb.astype(np.float64) / 255.0
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    m = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]])
    xyz = c @ m.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 216 / 24389, np.cbrt(xyz), (24389 / 27 * xyz + 16) / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)


def mini(img):
    return lab(np.asarray(img.convert("RGB").resize((48, 27), Image.BILINEAR)))


def angka(img):
    a = np.asarray(img.convert("RGB").resize((480, 270), Image.BILINEAR)).astype(np.float64) / 255.0
    luma = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    mx, mn = a.max(-1), a.min(-1)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    gy, gx = np.gradient(luma)
    return {
        "luma_p50": round(float(np.percentile(luma, 50) * 255), 1),
        "luma_range": round(float((np.percentile(luma, 95) - np.percentile(luma, 5)) * 255), 1),
        "sat_p95": round(float(np.percentile(sat, 95)), 3),
        "tepi_pct": round(float((np.hypot(gx, gy) > 0.04).mean() * 100), 1),
    }


def jarak(a, b):
    return float(np.sqrt(((mini(a) - mini(b)) ** 2).sum(-1)).mean())


def pasang(items, nama):
    out = []
    for s in items or []:
        if "=" not in s:
            print(f"{nama} harus LABEL=path: {s}", file=sys.stderr)
            sys.exit(2)
        k, p = s.split("=", 1)
        if not os.path.isfile(p):
            print(f"berkas tidak ada: {p}", file=sys.stderr)
            sys.exit(2)
        out.append((k.strip(), p))
    return out


def skala(img, w):
    return img.convert("RGB").resize((w, max(1, round(img.height * w / img.width))), Image.LANCZOS)


def lembar(baris, w_frame, w_anchor, judul):
    rows = []
    for label, frame, anchors in baris:
        f = skala(frame, w_frame)
        an = [skala(a, w_anchor) for a in anchors]
        h = max([f.height] + [x.height for x in an])
        w = f.width + sum(x.width + GAP for x in an)
        rows.append((label, f, an, w, h))
    W = max(r[3] for r in rows) + 2 * GAP
    H = LABEL_H + sum(r[4] + LABEL_H + GAP for r in rows) + GAP
    sheet = Image.new("RGB", (W, H), (28, 28, 30))
    d = ImageDraw.Draw(sheet)
    d.text((GAP, 6), judul, fill=(235, 235, 235))
    y = LABEL_H
    for label, f, an, _, h in rows:
        d.text((GAP, y + 6), f"arah {label}" + ("   | patokan ->" if an else ""), fill=(235, 235, 235))
        y += LABEL_H
        sheet.paste(f, (GAP, y))
        x = GAP + f.width + GAP
        for a in an:
            sheet.paste(a, (x, y))
            x += a.width + GAP
        y += h + GAP
    return sheet


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--arah", action="append", required=True, help="LABEL=frame.png (repeat)")
    ap.add_argument("--patokan", action="append", help="LABEL=keyframe.jpg (repeat, label of the arah it anchors)")
    ap.add_argument("--keluar", required=True)
    ap.add_argument("--judul", default="jelajah gaya")
    ap.add_argument("--mirip", type=float, default=12.0)
    a = ap.parse_args(argv)
    arah = pasang(a.arah, "--arah")
    patokan = pasang(a.patokan, "--patokan")
    labels = [k for k, _ in arah]
    if len(set(labels)) != len(labels):
        print("label --arah harus unik", file=sys.stderr)
        sys.exit(2)
    for k, _ in patokan:
        if k not in labels:
            print(f"--patokan {k} tidak punya --arah", file=sys.stderr)
            sys.exit(2)
    img = {k: Image.open(p) for k, p in arah}
    anc = {k: [Image.open(p) for kk, p in patokan if kk == k] for k in labels}
    baris = [(k, img[k], anc[k]) for k in labels]
    os.makedirs(a.keluar, exist_ok=True)
    lembar(baris, THUMB_W, THUMB_W // 2, a.judul + " (thumbnail)").save(os.path.join(a.keluar, "jelajah-thumb.jpg"), quality=88)
    lembar(baris, FULL_W, ANCHOR_FULL_W, a.judul).save(os.path.join(a.keluar, "jelajah-penuh.jpg"), quality=90)
    hasil = {"arah": {k: {"frame": p, "patokan": [pp for kk, pp in patokan if kk == k], **angka(img[k])} for k, p in arah},
             "pasangan": []}
    for x, y in itertools.combinations(labels, 2):
        dd = round(jarak(img[x], img[y]), 1)
        hasil["pasangan"].append({"a": x, "b": y, "jarak_thumb": dd, "mirip": dd < a.mirip})
    for k in labels:
        for i, an in enumerate(anc[k]):
            hasil["arah"][k].setdefault("jarak_ke_patokan", []).append(round(jarak(img[k], an), 1))
    with open(os.path.join(a.keluar, "jelajah.json"), "w", encoding="utf-8") as fh:
        json.dump(hasil, fh, indent=2, ensure_ascii=False)
    for k in labels:
        r = hasil["arah"][k]
        print(f"arah {k}: luma p50 {r['luma_p50']}, rentang {r['luma_range']}, sat p95 {r['sat_p95']}, tepi {r['tepi_pct']} %"
              + (f", jarak ke patokan {r['jarak_ke_patokan']}" if "jarak_ke_patokan" in r else ""))
    for p in hasil["pasangan"]:
        print(f"{p['a']} vs {p['b']}: jarak thumbnail {p['jarak_thumb']}" + ("  MIRIP: satu arah di thumbnail" if p["mirip"] else ""))
    print(f"lembar: {os.path.join(a.keluar, 'jelajah-thumb.jpg')}, {os.path.join(a.keluar, 'jelajah-penuh.jpg')}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
