#!/usr/bin/env python3
"""ref_spec.py: bedah referensi jadi REF-SPEC terukur (KEBIJAKAN-v2 bagian 3: referensi = kebenaran selera).

  python3 ref_spec.py <video.mp4 | folder still> [--out DIR] [--max 24]

Video: deteksi adegan (ffmpeg select scene>0.25) + 1 still per jeda >= 3 detik tanpa potongan, lalu ekstrak still.
Folder: semua .png/.jpg/.jpeg/.webp dipakai apa adanya.
Per still diukur: palet k-means (k=6, hex + % luas), luma p5/p50/p95 dan rentang (p95-p5), saturasi median/p95,
anatomi gradien (rata-rata warna 4 sudut + pusat, bbox zona 10% paling jenuh dalam %), kerapatan tepi, luas fokus
(komponen terhubung terbesar non-latar, % frame), gelap/terang. Still dikelompokkan per jenis frame:
{terang,gelap} x {teks (tepi jarang), ui (tepi rapat)}.
Keluaran di --out (bawaan: folder video / folder still + /refspec): REF-SPEC.json, REF-SPEC.md (kerangka; baris
"Alasan (isi dengan mata)" dikosongkan untuk diisi manusia), contact-sheet.png, stills/.
Angka hanya ukuran; peran warna, huruf, material, gerak dan ALASAN diisi dengan mata. Fungsi metrik() dipakai banding.py.
"""
import argparse, json, os, re, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw

EXT = {".png", ".jpg", ".jpeg", ".webp"}
TEPI_UI = 0.06       # kerapatan tepi >= ini = "ui", di bawahnya = "teks"
GELAP_LUMA = 110     # median luma < ini = gelap
TOLERANSI = {"luma_range_rel": 0.40, "sat_p95_abs": 0.20, "palet_de": 15.0}


def hexc(c): return "#%02x%02x%02x" % tuple(int(round(v)) for v in c)


def kecilkan(img, lebar=480):
    w, h = img.size
    return img.convert("RGB").resize((lebar, max(1, round(h * lebar / w))), Image.BILINEAR) if w > lebar else img.convert("RGB")


def kmeans(px, k=6, iters=15, seed=0):
    rng = np.random.default_rng(seed)
    px = px.astype(np.float32)
    if len(px) > 6000: px = px[rng.choice(len(px), 6000, replace=False)]
    c = [px[rng.integers(len(px))]]
    for _ in range(k - 1):  # k-means++
        d = np.min(((px[:, None] - np.array(c)[None]) ** 2).sum(-1), axis=1)
        s = d.sum()
        c.append(px[rng.choice(len(px), p=d / s)] if s > 0 else px[rng.integers(len(px))])
    c = np.array(c)
    for _ in range(iters):
        lab = ((px[:, None] - c[None]) ** 2).sum(-1).argmin(1)
        for i in range(k):
            m = lab == i
            if m.any(): c[i] = px[m].mean(0)
    return c


def metrik(img):
    """Ukur satu frame (PIL.Image) -> dict."""
    im = kecilkan(img); a = np.asarray(im, dtype=np.float32); H, W = a.shape[:2]
    R, G, B = a[..., 0], a[..., 1], a[..., 2]
    luma = 0.2126 * R + 0.7152 * G + 0.0722 * B
    mx, mn = a.max(-1), a.min(-1); sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    p5, p50, p95 = np.percentile(luma, [5, 50, 95])
    # palet
    flat = a.reshape(-1, 3); cen = kmeans(flat)
    lab = ((flat[:, None] - cen[None]) ** 2).sum(-1).argmin(1)
    frac = np.bincount(lab, minlength=len(cen)) / len(lab)
    urut = np.argsort(-frac)
    palet = [{"hex": hexc(cen[i]), "persen": round(float(frac[i]) * 100, 1)} for i in urut if frac[i] > 0]
    bg = cen[urut[0]]
    # anatomi gradien
    ph, pw = max(1, int(H * .08)), max(1, int(W * .08))
    sudut = {"kiri_atas": a[:ph, :pw], "kanan_atas": a[:ph, -pw:], "kiri_bawah": a[-ph:, :pw], "kanan_bawah": a[-ph:, -pw:],
             "pusat": a[H // 2 - ph:H // 2 + ph, W // 2 - pw:W // 2 + pw]}
    sudut = {k: hexc(v.reshape(-1, 3).mean(0)) for k, v in sudut.items()}
    thr = np.percentile(sat, 90)
    ys, xs = np.nonzero(sat >= max(thr, 1e-3))
    if len(xs):
        bbox = [round(float(np.percentile(xs, 2)) / W * 100, 1), round(float(np.percentile(ys, 2)) / H * 100, 1),
                round(float(np.percentile(xs, 98)) / W * 100, 1), round(float(np.percentile(ys, 98)) / H * 100, 1)]
    else: bbox = [0, 0, 0, 0]
    # tepi
    gy, gx = np.gradient(luma); tepi = float((np.hypot(gx, gy) > 20).mean())
    # fokus: komponen terhubung terbesar non-latar
    fokus = None
    try:
        from scipy import ndimage
        non = (np.abs(a - bg).sum(-1) > 60)
        non = ndimage.binary_dilation(non, iterations=4)
        lbl, n = ndimage.label(non)
        if n: fokus = round(float(np.bincount(lbl.ravel())[1:].max()) / (H * W) * 100, 1)
        else: fokus = 0.0
    except ImportError:
        pass
    lin = lambda v: np.where(v / 255 <= .03928, v / 255 / 12.92, ((v / 255 + .055) / 1.055) ** 2.4)
    l2, l98 = np.percentile(luma, [2, 98])
    kontras = float((lin(max(l2, l98)) + .05) / (lin(min(l2, l98)) + .05))
    gelap = bool(p50 < GELAP_LUMA)
    return {"luma_p5": round(float(p5), 1), "luma_p50": round(float(p50), 1), "luma_p95": round(float(p95), 1),
            "luma_range": round(float(p95 - p5), 1), "luma_std": round(float(luma.std()), 2),
            "sat_median": round(float(np.median(sat)), 3), "sat_p95": round(float(np.percentile(sat, 95)), 3),
            "palet": palet, "gradien": {**sudut, "zona_jenuh_bbox_pct": bbox}, "tepi": round(tepi, 4),
            "fokus_pct": fokus, "kontras_ekstrem": round(kontras, 1), "gelap": gelap,
            "tipe": ("gelap" if gelap else "terang") + "-" + ("ui" if tepi >= TEPI_UI else "teks")}


def fingerprint_f1(m):
    """F1 gradien ragu-ragu: rentang luma < 35 DAN sat p95 < 0,15 DAN bukan datar (std luma > 3)."""
    return m["luma_range"] < 35 and m["sat_p95"] < 0.15 and m["luma_std"] > 3


# --- warna: ΔE2000 (dipakai banding.py) ---
def rgb2lab(rgb):
    c = np.asarray(rgb, dtype=np.float64).reshape(-1, 3) / 255
    c = np.where(c <= .04045, c / 12.92, ((c + .055) / 1.055) ** 2.4)
    M = np.array([[.4124564, .3575761, .1804375], [.2126729, .7151522, .0721750], [.0193339, .1191920, .9503041]])
    xyz = c @ M.T / np.array([.95047, 1, 1.08883])
    f = np.where(xyz > 216 / 24389, np.cbrt(xyz), (24389 / 27 * xyz + 16) / 116)
    return np.stack([116 * f[:, 1] - 16, 500 * (f[:, 0] - f[:, 1]), 200 * (f[:, 1] - f[:, 2])], 1)


def de2000(l1, l2):
    """Matriks ΔE2000 (n1 x n2) dari Lab."""
    L1, a1, b1 = [l1[:, i][:, None] for i in range(3)]; L2, a2, b2 = [l2[:, i][None] for i in range(3)]
    C1, C2 = np.hypot(a1, b1), np.hypot(a2, b2); Cm = (C1 + C2) / 2
    G = .5 * (1 - np.sqrt(Cm ** 7 / (Cm ** 7 + 25 ** 7)))
    a1p, a2p = (1 + G) * a1, (1 + G) * a2; C1p, C2p = np.hypot(a1p, b1), np.hypot(a2p, b2)
    h1 = np.degrees(np.arctan2(b1, a1p)) % 360; h2 = np.degrees(np.arctan2(b2, a2p)) % 360
    dL, dC = L2 - L1, C2 - C1p
    dh = h2 - h1; dh = np.where(dh > 180, dh - 360, np.where(dh < -180, dh + 360, dh)); dh = np.where(C1p * C2p == 0, 0, dh)
    dH = 2 * np.sqrt(C1p * C2p) * np.sin(np.radians(dh / 2))
    Lp, Cp = (L1 + L2) / 2, (C1p + C2p) / 2
    hs = h1 + h2
    hp = np.where(np.abs(h1 - h2) > 180, np.where(hs < 360, (hs + 360) / 2, (hs - 360) / 2), hs / 2)
    hp = np.where(C1p * C2p == 0, hs, hp)
    T = 1 - .17 * np.cos(np.radians(hp - 30)) + .24 * np.cos(np.radians(2 * hp)) + .32 * np.cos(np.radians(3 * hp + 6)) - .20 * np.cos(np.radians(4 * hp - 63))
    dth = 30 * np.exp(-(((hp - 275) / 25) ** 2)); Rc = 2 * np.sqrt(Cp ** 7 / (Cp ** 7 + 25 ** 7))
    Sl = 1 + .015 * (Lp - 50) ** 2 / np.sqrt(20 + (Lp - 50) ** 2); Sc = 1 + .045 * Cp; Sh = 1 + .015 * Cp * T
    Rt = -np.sin(np.radians(2 * dth)) * Rc
    return np.sqrt((dL / Sl) ** 2 + (dC / Sc) ** 2 + (dH / Sh) ** 2 + Rt * (dC / Sc) * (dH / Sh))


def palet_de(pa, pb):
    """Rata-rata (berbobot % luas) jarak ΔE2000 tetangga terdekat dari palet pa ke palet pb."""
    la = rgb2lab([[int(p["hex"][i:i + 2], 16) for i in (1, 3, 5)] for p in pa])
    lb = rgb2lab([[int(p["hex"][i:i + 2], 16) for i in (1, 3, 5)] for p in pb])
    w = np.array([p["persen"] for p in pa], dtype=float); w = w / w.sum()
    return float((de2000(la, lb).min(1) * w).sum())


# --- ekstraksi still ---
def durasi(video):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", video], capture_output=True, text=True)
    return float(r.stdout.strip())


def waktu_still(video, maks):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", video, "-vf", "select='gt(scene,0.25)',showinfo", "-an", "-f", "null", "-"],
                       capture_output=True, text=True)
    potong = sorted({round(float(x), 2) for x in re.findall(r"pts_time:([\d.]+)", r.stderr)})
    dur = durasi(video); batas = [0.0] + potong + [dur]
    ts = [0.1]
    for t in potong: ts.append(min(t + 0.15, dur - 0.05))
    for a, b in zip(batas, batas[1:]):
        if b - a >= 3: ts.append(round((a + b) / 2, 2))
    ts = sorted(set(round(t, 2) for t in ts if t < dur))
    if len(ts) > maks:
        idx = np.linspace(0, len(ts) - 1, maks).round().astype(int); ts = [ts[i] for i in sorted(set(idx))]
    return ts


def ekstrak(video, out, maks):
    os.makedirs(out, exist_ok=True); hasil = []
    for t in waktu_still(video, maks):
        p = os.path.join(out, "still_%07.2fs.png" % t)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", video, "-frames:v", "1", p], check=False)
        if os.path.isfile(p): hasil.append((p, t))
    return hasil


# --- agregasi ---
def rata(ms, k): 
    v = [m[k] for m in ms if m.get(k) is not None]; return round(float(np.mean(v)), 3) if v else None


def kelompok(stills):
    tipe = {}
    for s in stills: tipe.setdefault(s["metrik"]["tipe"], []).append(s)
    out = {}
    for nama, ss in sorted(tipe.items()):
        ms = [s["metrik"] for s in ss]
        out[nama] = {"n": len(ss), "stills": [s["file"] for s in ss],
                     "rata": {k: rata(ms, k) for k in ("luma_p5", "luma_p50", "luma_p95", "luma_range", "sat_median", "sat_p95", "tepi", "fokus_pct", "kontras_ekstrem")},
                     "palet": [p for m in ms for p in m["palet"]]}
    return out


def kontak(stills, path, kolom=4, lebar=320):
    ims = [(Image.open(s["path"]).convert("RGB"), s) for s in stills]
    if not ims: return
    h = round(lebar * ims[0][0].size[1] / ims[0][0].size[0]); baris = (len(ims) + kolom - 1) // kolom; lab = 30
    sheet = Image.new("RGB", (kolom * lebar, baris * (h + lab)), (24, 24, 24)); d = ImageDraw.Draw(sheet)
    for i, (im, s) in enumerate(ims):
        x, y = (i % kolom) * lebar, (i // kolom) * (h + lab)
        sheet.paste(im.resize((lebar, h)), (x, y))
        t = "" if s["t"] is None else "%.1fs " % s["t"]
        d.text((x + 6, y + h + 4), f"{t}{s['metrik']['tipe']}", fill=(235, 235, 235))
        d.text((x + 6, y + h + 16), f"luma {s['metrik']['luma_range']:.0f} sat95 {s['metrik']['sat_p95']:.2f}", fill=(160, 160, 160))
    sheet.save(path)


def tulis_md(spec, path):
    L = [f"# REF-SPEC: {os.path.basename(spec['sumber'])}", "",
         "Kerangka terukur (ref_spec.py). Angka = ukuran mesin; peran, huruf, material, gerak, dan ALASAN diisi dengan mata (KEBIJAKAN-v2 bagian 1).", "",
         f"Toleransi banding: rentang luma beda <= {spec['toleransi']['luma_range_rel']*100:.0f}%, sat p95 beda <= {spec['toleransi']['sat_p95_abs']}, palet dE <= {spec['toleransi']['palet_de']}", ""]
    for nama, t in spec["tipe"].items():
        r = t["rata"]
        L += [f"## Jenis frame: {nama} ({t['n']} still)", "",
              "| ukuran | nilai |", "|---|---|",
              f"| luma p5 / p50 / p95 | {r['luma_p5']} / {r['luma_p50']} / {r['luma_p95']} (rentang {r['luma_range']}) |",
              f"| saturasi median / p95 | {r['sat_median']} / {r['sat_p95']} |",
              f"| kerapatan tepi | {r['tepi']} |", f"| luas fokus (% frame) | {r['fokus_pct']} |", f"| kontras ekstrem (kasar) | {r['kontras_ekstrem']}:1 |", "",
              "Palet (hex, % luas) tiap still:", ""]
        for s in spec["stills"]:
            if s["metrik"]["tipe"] != nama: continue
            m = s["metrik"]; g = m["gradien"]
            L.append(f"- `{s['file']}`: " + ", ".join(f"{p['hex']} {p['persen']}%" for p in m["palet"]))
            L.append(f"  - sudut KA/KaA/KiB/KaB {g['kiri_atas']}/{g['kanan_atas']}/{g['kiri_bawah']}/{g['kanan_bawah']}, pusat {g['pusat']}, zona jenuh bbox% {g['zona_jenuh_bbox_pct']}")
        L += ["", "Alasan (isi dengan mata):", "- Warna (peran latar/tinta/aksen + makna): ", "- Huruf (keluarga, bobot, rasio ukuran, gaya kedua + perannya): ",
              "- Layout (margin, grid, ruang kosong): ", "- Material (bayangan, arah cahaya, kilau; satu atau banyak sistem): ", "- Gerak (transisi, kamera, masuk teks + timestamp): ",
              "- Makna jenis frame ini (mis. gelap = babak masalah): ", ""]
    open(path, "w", encoding="utf-8").write("\n".join(L))


def main(argv=None):
    ap = argparse.ArgumentParser(description="Bedah referensi -> REF-SPEC terukur")
    ap.add_argument("sumber"); ap.add_argument("--out"); ap.add_argument("--max", type=int, default=24)
    a = ap.parse_args(argv)
    if not os.path.exists(a.sumber): print("jalur tidak ada: " + a.sumber, file=sys.stderr); return 2
    isdir = os.path.isdir(a.sumber)
    out = a.out or os.path.join(a.sumber if isdir else os.path.dirname(os.path.abspath(a.sumber)), "refspec")
    os.makedirs(out, exist_ok=True)
    if isdir:
        fs = sorted(f for f in os.listdir(a.sumber) if os.path.splitext(f)[1].lower() in EXT)
        if len(fs) > a.max: fs = [fs[i] for i in sorted(set(np.linspace(0, len(fs) - 1, a.max).round().astype(int)))]
        daftar = [(os.path.join(a.sumber, f), None) for f in fs]
    else:
        daftar = ekstrak(a.sumber, os.path.join(out, "stills"), a.max)
    if not daftar: print("tidak ada still", file=sys.stderr); return 2
    stills = []
    for p, t in daftar:
        stills.append({"file": os.path.relpath(p, out), "path": p, "t": t, "metrik": metrik(Image.open(p))})
    spec = {"sumber": os.path.abspath(a.sumber), "toleransi": dict(TOLERANSI), "tipe": kelompok(stills),
            "stills": [{k: v for k, v in s.items() if k != "path"} for s in stills]}
    json.dump(spec, open(os.path.join(out, "REF-SPEC.json"), "w"), ensure_ascii=False, indent=1)
    tulis_md(spec, os.path.join(out, "REF-SPEC.md")); kontak(stills, os.path.join(out, "contact-sheet.png"))
    print(f"{len(stills)} still -> {out}")
    for n, t in spec["tipe"].items():
        r = t["rata"]; print(f"  {n:<12} n={t['n']:<3} luma_range={r['luma_range']} sat_p95={r['sat_p95']} tepi={r['tepi']} fokus%={r['fokus_pct']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
