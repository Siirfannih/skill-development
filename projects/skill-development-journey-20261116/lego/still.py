#!/usr/bin/env python3
"""Still komposit dari lego.json pada waktu tertentu (tanpa merakit video): footage dasar + kamera, lalu tiap lapisan aktif berurutan.
  python3 lego/still.py label=detik [label=detik ...]   -> qc/still/<label>.png (960 px lebar)
Dipakai untuk gerbang §2 DESAIN (balance_check, teks_cek, sanding)."""
import io, json, os, subprocess, sys
from PIL import Image

P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEGO = os.path.join(P, "lego/lego.json")


def bez(x1, y1, x2, y2):
    def f(p):
        lo, hi = 0.0, 1.0
        for _ in range(40):
            m = (lo + hi) / 2
            x = 3 * (1 - m) ** 2 * m * x1 + 3 * (1 - m) * m * m * x2 + m ** 3
            lo, hi = (m, hi) if x < p else (lo, m)
        m = (lo + hi) / 2
        return 3 * (1 - m) ** 2 * m * y1 + 3 * (1 - m) * m * m * y2 + m ** 3
    return f


EA = {"heavy": bez(.75, 0, .18, 1), "drift": bez(.4, 0, .6, 1), "land": bez(.1, .75, .15, 1)}


def frame(src, t, alpha=False):
    cmd = ["ffmpeg", "-v", "error", "-ss", f"{max(0, t):.4f}", "-i", src, "-frames:v", "1", "-pix_fmt", "rgba" if alpha else "rgb24", "-f", "image2pipe", "-vcodec", "png", "-"]
    r = subprocess.run(cmd, capture_output=True)
    if not r.stdout and t > 0.1: return frame(src, t - 0.05, alpha)       # ujung klip: mundur satu frame
    return Image.open(io.BytesIO(r.stdout)).convert("RGBA") if r.stdout else None


def pw(keys, t):
    keys = sorted(keys)
    if t <= keys[0][0]: return keys[0][1]
    for (t0, v0), (t1, v1) in zip(keys, keys[1:]):
        if t < t1: return v0 + (v1 - v0) * (t - t0) / max(1e-6, t1 - t0)
    return keys[-1][1]


def dasar_at(L, t):
    base = os.path.dirname(LEGO)
    acc = 0.0
    for c in L["dasar"]:
        if acc - 1e-6 <= t < acc + c["dur"] + 1e-6 or c is L["dasar"][-1]:
            im = frame(os.path.join(base, c["src"]), c["in"] + (t - acc)).convert("RGB")
            cam = c.get("kamera")
            if cam:
                z0, z1 = cam["zoom"]; k = EA.get(cam.get("kurva", "heavy"), EA["drift"])(min(1, max(0, (t - acc) / c["dur"])))
                z = z0 + (z1 - z0) * k
                W, H = im.size; cx, cy = cam.get("pusat", [.5, .5])
                x0, y0 = (W - W / z) * cx, (H - H / z) * cy
                im = im.crop((int(x0), int(y0), int(x0 + W / z), int(y0 + H / z))).resize((W, H), Image.LANCZOS)
            return im.convert("RGBA")
        acc += c["dur"]


_DC = os.path.join(P, "lego/.durasi.json")


def durasi(src):
    c = json.load(open(_DC)) if os.path.exists(_DC) else {}
    k = f"{src}:{os.path.getmtime(src)}"
    if k not in c:
        c[k] = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src], capture_output=True, text=True).stdout.strip() or 0)
        json.dump(c, open(_DC, "w"))
    return c[k]


def main():
    L = json.load(open(LEGO)); base = os.path.dirname(LEGO)
    os.makedirs(os.path.join(P, "qc/still"), exist_ok=True)
    for a in sys.argv[1:]:
        label, t = a.split("="); t = float(t)
        im = dasar_at(L, t)
        n = 0
        for l in L["lapisan"]:
            src = os.path.join(base, l["src"])
            if not os.path.exists(src): continue
            d = durasi(src)
            if not (l["t"] - 1e-6 <= t < l["t"] + d): continue
            lf = frame(src, t - l["t"], alpha=True)
            if lf is None: continue
            g = l.get("gerak", {}); r = t - l["t"]
            x = pw(g["x"], r) if g.get("x") else l.get("x", 0); y = pw(g["y"], r) if g.get("y") else l.get("y", 0)
            im.alpha_composite(lf, (int(round(x)), int(round(y)))) if x >= 0 and y >= 0 else im.alpha_composite(lf.crop((max(0, -int(x)), max(0, -int(y)), lf.width, lf.height)), (max(0, int(x)), max(0, int(y))))
            n += 1
        out = os.path.join(P, "qc/still", label + ".png")
        im.convert("RGB").resize((960, 540), Image.LANCZOS).save(out)
        print(label, f"t={t:.2f}", f"lapisan={n}", out)


if __name__ == "__main__":
    main()
