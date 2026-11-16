#!/usr/bin/env python3
"""Lubang matte: alpha lapisan x (1 - matte pembicara) -> teks/slab/grade berdiri DI BELAKANG kepala dan badan Irfan.
  python3 lubang.py <lapisan.mov> <t_abs detik> <x> <y> <out.mov>
Matte = qc/matte/wajah-matte.mkv (RVM, gray lossless, sama waktu dengan edit/wajah.mp4). Lapisan dipotong sebesar kotaknya (x,y,w,h dari file).
Hasil ProRes 4444 ber-alpha; kunci cache dari pemanggil (bangun.py)."""
import json, os, subprocess, sys

P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MATTE = os.path.join(P, "qc/matte/wajah-matte.mkv")


def ukuran(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "json", path], capture_output=True, text=True)
    s = json.loads(r.stdout)["streams"][0]
    return s["width"], s["height"]


def durasi(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path], capture_output=True, text=True)
    return float(r.stdout.strip())


def potong(src, t_abs, x, y, out):
    w, h = ukuran(src)
    d = durasi(src)
    # kotak di luar frame (mis. jatuh keluar bawah) dipotong ke dalam frame untuk matte
    cx, cy = max(0, int(x)), max(0, int(y))
    pad_l, pad_t = cx - int(x), cy - int(y)
    fc = (f"[1:v]fps=30,format=gray,negate,crop={w}:{h}:{cx}:{cy}[inv];"
          f"[0:v]format=yuva444p10le,split[rgb][al];[al]alphaextract,format=gray[la];"
          f"[la][inv]blend=all_mode=multiply,format=gray[na];[rgb][na]alphamerge,format=yuva444p10le[v]")
    # catatan: bila x/y negatif, crop mulai di 0 (tepi) - lapisan yang diletakkan di luar frame tidak memakai lubang
    cmd = ["ffmpeg", "-y", "-v", "error", "-i", src, "-ss", f"{t_abs:.4f}", "-t", f"{d:.4f}", "-i", MATTE, "-filter_complex", fc, "-map", "[v]", "-t", f"{d:.4f}",
           "-c:v", "prores_ks", "-profile:v", "4444", "-pix_fmt", "yuva444p10le", "-vendor", "apl0", out]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit("GAGAL lubang: " + r.stderr[-400:])


def potong_zoom(src, t_abs, x, y, out, zoom, pusat=(0.5, 0.45)):
    """Seperti potong(), tetapi matte ikut kamera footage dasar: tiap frame matte di-crop/zoom dengan z(t) yang sama seperti `dasar`
    (lego.json kamera.zoom + pusat), lalu dipotong sebesar kotak lapisan. Tanpa ini lubang meleset sampai ±30 px saat punch 1,12×
    (tepi rambut memotong huruf di tempat yang salah). zoom: fungsi detik absolut -> skala."""
    import numpy as np
    from PIL import Image
    w, h = ukuran(src)
    d = durasi(src)
    n = max(1, round(d * 30))
    W, H = 1920, 1080
    rd = subprocess.Popen(["ffmpeg", "-v", "error", "-ss", f"{t_abs:.4f}", "-i", MATTE, "-vf", "fps=30,format=gray", "-frames:v", str(n),
                           "-f", "rawvideo", "-pix_fmt", "gray", "-"], stdout=subprocess.PIPE)
    tmp = out + ".matte.mkv"
    wr = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "gray", "-s", f"{w}x{h}", "-r", "30", "-i", "-",
                           "-c:v", "ffv1", tmp], stdin=subprocess.PIPE)
    last = None
    for k in range(n):
        buf = rd.stdout.read(W * H)
        if len(buf) == W * H:
            last = buf
        elif last is None:
            last = bytes(W * H)
        im = Image.frombytes("L", (W, H), last)
        z = max(1.0, zoom(t_abs + k / 30))
        x0, y0 = (W - W / z) * pusat[0], (H - H / z) * pusat[1]
        im = im.crop((x0, y0, x0 + W / z, y0 + H / z)).resize((W, H), Image.BILINEAR) if z > 1.0005 else im
        box = np.full((h, w), 255, np.uint8)                      # di luar frame: tidak ada pembicara -> alpha utuh
        a = 255 - np.asarray(im)
        ix0, iy0, ix1, iy1 = max(0, int(x)), max(0, int(y)), min(W, int(x) + w), min(H, int(y) + h)
        if ix1 > ix0 and iy1 > iy0:
            box[iy0 - int(y):iy1 - int(y), ix0 - int(x):ix1 - int(x)] = a[iy0:iy1, ix0:ix1]
        wr.stdin.write(box.tobytes())
    wr.stdin.close(); wr.wait(); rd.stdout.close(); rd.wait()
    fc = ("[1:v]format=gray[inv];[0:v]format=yuva444p10le,split[rgb][al];[al]alphaextract,format=gray[la];"
          "[la][inv]blend=all_mode=multiply,format=gray[na];[rgb][na]alphamerge,format=yuva444p10le[v]")
    cmd = ["ffmpeg", "-y", "-v", "error", "-i", src, "-i", tmp, "-filter_complex", fc, "-map", "[v]", "-t", f"{d:.4f}",
           "-c:v", "prores_ks", "-profile:v", "4444", "-pix_fmt", "yuva444p10le", "-vendor", "apl0", out]
    r = subprocess.run(cmd, capture_output=True, text=True)
    os.remove(tmp)
    if r.returncode:
        sys.exit("GAGAL lubang: " + r.stderr[-400:])


if __name__ == "__main__":
    a = sys.argv[1:]
    potong(a[0], float(a[1]), float(a[2]), float(a[3]), a[4])
