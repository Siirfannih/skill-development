#!/usr/bin/env python3
"""Pra-proses aset Fore: kurangi detail (target energi tepi <= 10 @640px), grade per dunia,
key latar transparan/magenta, dan pecah latar jadi layer kedalaman 2.5D.

  prep.py grade  <in.png> <out.png> --world N|P [--shapes 1.0]
  prep.py key    <in.png> <out.png>             # magenta/transparan -> RGBA rapi
  prep.py layers <in.png> <outdir> [--n 3]      # depth -> far/mid/near RGBA (+inpaint)
  prep.py edge   <img>...                       # ukur energi tepi
"""
import sys, os, argparse
import numpy as np, cv2
from PIL import Image, ImageFilter

def edge_energy(path_or_img):
    im = Image.open(path_or_img).convert("RGB") if isinstance(path_or_img, str) else path_or_img
    im = im.resize((640, int(640 * im.height / im.width)))
    return float(np.asarray(im.convert("L").filter(ImageFilter.FIND_EDGES), dtype=float).mean())

def simplify(bgr, strength=1.0):
    """Bidang besar: mean-shift (menyatukan warna) + bilateral; kuat sesuai strength."""
    h, w = bgr.shape[:2]
    small = cv2.resize(bgr, (w // 2, h // 2), interpolation=cv2.INTER_AREA)
    sp, sr = int(10 * strength), int(28 * strength)
    ms = cv2.pyrMeanShiftFiltering(small, sp, sr)
    ms = cv2.bilateralFilter(ms, 9, 40, 9)
    out = cv2.resize(ms, (w, h), interpolation=cv2.INTER_CUBIC)
    # sapuan kering: sedikit tekstur dari aslinya dikembalikan di area terang
    return out

def grade(bgr, world):
    f = bgr.astype(np.float32) / 255.0
    if world == "P":   # bayangan: pudar, terang, kontras sangat rendah, bayangan teal
        f = 0.22 + f * 0.70                       # angkat hitam, redam putih
        lum = f.mean(axis=2, keepdims=True)
        f = lum + (f - lum) * 0.62                # saturasi turun
        shadow = np.clip(1.0 - lum * 1.6, 0, 1)
        f += shadow * np.array([0.05, 0.04, -0.02])[None, None, :]   # BGR: teal di bayangan
        f = f * np.array([1.02, 1.0, 0.97])
    else:              # kenyataan: low-key hangat, hitam diangkat sedikit
        f = 0.05 + np.power(f, 1.3) * 0.86        # low-key: tengah digelapkan, hitam tetap terangkat
        lum = f.mean(axis=2, keepdims=True)
        f = lum + (f - lum) * 0.85
        shadow = np.clip(1.0 - lum * 2.0, 0, 1)
        f += shadow * np.array([0.03, -0.005, 0.015])[None, None, :]  # bayangan ungu-cokelat
        f = f * np.array([0.93, 0.98, 1.04])     # hangat
    return np.clip(f * 255, 0, 255).astype(np.uint8)

def load_rgba(path):
    im = Image.open(path).convert("RGBA")
    a = np.asarray(im)
    rgb, alpha = a[..., :3], a[..., 3]
    if alpha.min() > 250:  # tidak transparan -> key magenta
        r, g, b = [rgb[..., i].astype(int) for i in range(3)]
        mag = (r > 180) & (b > 180) & (g < 110) & (abs(r - b) < 70)
        m = (~mag).astype(np.uint8) * 255
        m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
        m = cv2.GaussianBlur(m, (3, 3), 0)
        alpha = m
        # despill: tepi magenta jadi netral
        spill = np.clip((np.minimum(r, b) - g) / 255.0, 0, 1)[..., None]
        rgb = (rgb * (1 - spill * 0.6) + spill * 0.6 * rgb.mean(axis=2, keepdims=True)).astype(np.uint8)
    return rgb, alpha

def cmd_grade(a):
    rgb, alpha = load_rgba(a.inp)
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    s = simplify(bgr, a.shapes)
    g = grade(s, a.world)
    out = cv2.cvtColor(g, cv2.COLOR_BGR2RGB)
    Image.fromarray(np.dstack([out, alpha])).save(a.out)
    print(f"{os.path.basename(a.inp)}: edge {edge_energy(a.inp):.1f} -> {edge_energy(Image.fromarray(out)):.1f}")

def cmd_key(a):
    rgb, alpha = load_rgba(a.inp)
    Image.fromarray(np.dstack([rgb, alpha])).save(a.out)

_depth = None
def depth_of(img):
    global _depth
    if _depth is None:
        from transformers import pipeline
        _depth = pipeline("depth-estimation", model="depth-anything/Depth-Anything-V2-Small-hf", device="cpu")
    d = np.asarray(_depth(img)["depth"].resize(img.size), dtype=np.float32)
    return (d - d.min()) / (d.max() - d.min() + 1e-6)   # 1 = dekat

def cmd_layers(a):
    os.makedirs(a.outdir, exist_ok=True)
    img = Image.open(a.inp).convert("RGB")
    d = depth_of(img)
    d = cv2.GaussianBlur(d, (0, 0), 3)
    np.save(os.path.join(a.outdir, "depth.npy"), d)
    Image.fromarray((d * 255).astype(np.uint8)).save(os.path.join(a.outdir, "depth.png"))
    qs = np.quantile(d, np.linspace(0, 1, a.n + 1)[1:-1])
    rgb = np.asarray(img)
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    names = ["far", "mid", "near"] if a.n == 3 else [f"l{i}" for i in range(a.n)]
    for i in range(a.n):
        lo = -1 if i == 0 else qs[i - 1]
        m = (d > lo).astype(np.uint8)            # layer i = semua yang >= batas bawahnya (lebih dekat)
        if i > 0:
            m = cv2.dilate(m, np.ones((7, 7), np.uint8))
        nearer = (d > (qs[i] if i < a.n - 1 else 2)).astype(np.uint8)
        # isi lubang di layer ini (tempat objek yang lebih dekat) supaya parallax tidak bolong
        fill = cv2.inpaint(bgr, cv2.dilate(nearer, np.ones((15, 15), np.uint8)) * 255, 9, cv2.INPAINT_TELEA) if i < a.n - 1 else bgr
        alpha = (cv2.GaussianBlur(m.astype(np.float32), (0, 0), 1.5) * 255).astype(np.uint8)
        if i == 0:
            alpha[:] = 255
        out = cv2.cvtColor(fill, cv2.COLOR_BGR2RGB)
        Image.fromarray(np.dstack([out, alpha])).save(os.path.join(a.outdir, f"{names[i]}.png"))
    print("layers ->", a.outdir)

if __name__ == "__main__":
    ap = argparse.ArgumentParser(); sp = ap.add_subparsers(dest="c")
    g = sp.add_parser("grade"); g.add_argument("inp"); g.add_argument("out"); g.add_argument("--world", default="P"); g.add_argument("--shapes", type=float, default=1.0)
    k = sp.add_parser("key"); k.add_argument("inp"); k.add_argument("out")
    l = sp.add_parser("layers"); l.add_argument("inp"); l.add_argument("outdir"); l.add_argument("--n", type=int, default=3)
    e = sp.add_parser("edge"); e.add_argument("imgs", nargs="+")
    a = ap.parse_args()
    if a.c == "grade": cmd_grade(a)
    elif a.c == "key": cmd_key(a)
    elif a.c == "layers": cmd_layers(a)
    elif a.c == "edge":
        for p in a.imgs: print(f"{edge_energy(p):6.1f}  {p}")
