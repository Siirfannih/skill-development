#!/usr/bin/env python3
"""Hitung jumlah baris caption di render. Gagal bila ada caption > 2 baris (aturan 44, Irfan 9 Nov) atau terpotong di tepi.

Pakai:  python3 caption_lines.py render.mp4 [--fps 4] [--band 0.55 0.95] [--max-lines 2]
Deteksi: piksel putih (min RGB > 215, saturasi rendah) di pita bawah, proyeksi per baris,
         blok setinggi huruf caption (1,1–4 % tinggi frame) dihitung sebagai satu baris.
Teks berwarna aksen (headline oranye, dsb.) tidak dihitung; ini khusus caption putih.
Keluaran: daftar rentang waktu yang melanggar + PASS/FAIL. Exit code 1 bila FAIL.
Deteksi bisa salah pada komposisi kinetik bertingkat yang disengaja; buka still (--stills) dan
putuskan per frame: caption > 2 baris = gagal, komposisi penekanan yang dirancang = catat sebagai pengecualian.
"""
import argparse, subprocess, sys
import numpy as np

def frames(path, fps, w=540):
    probe = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                            "stream=width,height", "-of", "csv=p=0", path], capture_output=True, text=True).stdout
    W, H = map(int, probe.strip().split(",")[:2]); h = int(round(H * w / W / 2) * 2)
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-i", path, "-vf", f"fps={fps},scale={w}:{h}",
                          "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
    i = 0
    while True:
        buf = p.stdout.read(w * h * 3)
        if len(buf) < w * h * 3: break
        yield i / fps, np.frombuffer(buf, np.uint8).reshape(h, w, 3); i += 1

def lines_in(img, band):
    h, w, _ = img.shape; y0, y1 = int(band[0] * h), int(band[1] * h)
    c = img[y0:y1].astype(int); mn, mx = c.min(2), c.max(2)
    mask = (mn > 215) & (mx - mn < 25)
    rows = mask.sum(1) > max(3, 0.01 * w)
    runs, start, gap = [], None, 0
    for y, on in enumerate(list(rows) + [False] * 4):
        if on:
            start = y if start is None else start; gap = 0
        elif start is not None:
            gap += 1
            if gap > 3: runs.append((start, y - gap)); start, gap = None, 0
    out = []
    for a, b in runs:
        hh = b - a + 1
        if 0.011 * h <= hh <= 0.04 * h:
            blk = mask[a:b + 1]; cols = np.where(blk.any(0))[0]
            mid = blk[hh // 2]; trans = int(np.abs(np.diff(mid.astype(int))).sum())
            fill = blk[:, cols.min():cols.max() + 1].mean()
            if trans >= 8 and fill < 0.55:  # pola huruf: banyak tepi, tidak padat (bukan kertas/lingkaran)
                out.append((a + y0, b + y0, cols.min(), cols.max()))
    if out:  # label kecil (kredit sumber, eyebrow) jauh lebih pendek dari huruf caption: tidak dihitung
        top = max(l[1] - l[0] for l in out); out = [l for l in out if (l[1] - l[0]) >= 0.6 * top]
    return out, w

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("video"); ap.add_argument("--fps", type=float, default=4)
    ap.add_argument("--band", type=float, nargs=2, default=[0.55, 0.95]); ap.add_argument("--max-lines", type=int, default=2)
    ap.add_argument("--stills", help="folder: simpan still setiap frame yang ditandai untuk dicek mata")
    a = ap.parse_args()
    if a.stills:
        import os; os.makedirs(a.stills, exist_ok=True)
    bad, edge, n = [], [], 0
    for t, img in frames(a.video, a.fps):
        n += 1; ls, w = lines_in(img, a.band)
        flag = False
        if len(ls) > a.max_lines: bad.append(t); flag = True
        if any(l[2] <= 0.03 * w or l[3] >= 0.97 * w for l in ls): edge.append(t); flag = True
        if flag and a.stills:
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.2f}", "-i", a.video, "-frames:v", "1",
                            "-vf", "scale=540:-2", f"{a.stills}/flag_{t:06.2f}.jpg"])
    def spans(ts):
        out = []
        for t in ts:
            if out and t - out[-1][1] <= 1.5 / a.fps: out[-1][1] = t
            else: out.append([t, t])
        return ", ".join(f"{s:.1f}-{e:.1f}s" for s, e in out)
    print(f"frame dicek: {n} @ {a.fps} fps, pita y {a.band}")
    print(f"caption > {a.max_lines} baris: {len(bad)} frame  {spans(bad)}")
    print(f"teks menyentuh tepi (terpotong): {len(edge)} frame  {spans(edge)}")
    ok = not bad and not edge
    print("PASS" if ok else "FAIL"); sys.exit(0 if ok else 1)

if __name__ == "__main__":
    main()
