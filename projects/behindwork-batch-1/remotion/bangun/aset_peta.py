"""Pre-processor aset (D-28): sebelum merancang adegan, tiap foto/klip di public/<ep>/ dipetakan ke JSON kecil
supaya posisi teks dan kamera diputuskan dari angka, bukan dari menebak lewat still berat.

Pakai (venv persepsi, karena butuh MediaPipe):
  cd ~/work/persepsi && LD_LIBRARY_PATH=$PWD/syslib/usr/lib/x86_64-linux-gnu \
    .venv/bin/python <repo>/projects/behindwork-batch-1/remotion/bangun/aset_peta.py <public_dir>/ep04 [--video-detik 2]

Keluaran: <public_dir>/<ep>/aset.json  {file: {...}}  per aset:
  w, h, rasio          ukuran asli dan rasio (w/h); tegak = rasio < 1,2 (jangan jadi inset kecil di kanvas kosong)
  wajah                [[x, y, w, h], ...] ternormal 0-1 terhadap gambar asli (semua wajah, MediaPipe Face Landmarker)
                       untuk klip: per sampel {t, wajah}
  fokus                {x, y} titik fokus ternormal: pusat wajah terbesar, atau pusat saliency bila tanpa wajah
  teks_padat           porsi luas gambar yang berupa teks kecil (tesseract): > 0,08 = dokumen/screenshot
  zona_teks            urutan zona aman untuk KT pada potongan 16:9 cover di tengah: kiri, kanan, atas, bawah, tengah
                       (zona yang beririsan dengan wajah dibuang; sisanya diurut dari yang paling sepi)
  label                kata-kata yang terbaca di gambar (OCR, maks 12) supaya label di foto tidak ditimpa KT
"""
import argparse, csv, io, json, os, subprocess, sys
import cv2, numpy as np
import mediapipe as mp
from mediapipe.tasks import python as mpt
from mediapipe.tasks.python import vision

ap = argparse.ArgumentParser()
ap.add_argument("folder"); ap.add_argument("--video-detik", type=float, default=2.0)
ap.add_argument("--model-dir", default=os.path.expanduser("~/work/persepsi/models"))
a = ap.parse_args()

fl = vision.FaceLandmarker.create_from_options(vision.FaceLandmarkerOptions(
    base_options=mpt.BaseOptions(model_asset_path=os.path.join(a.model_dir, "face_landmarker.task")),
    running_mode=vision.RunningMode.IMAGE, num_faces=8, min_face_detection_confidence=0.4))


def wajah(img):
    H, W = img.shape[:2]
    r = fl.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=cv2.cvtColor(img, cv2.COLOR_BGR2RGB)))
    out = []
    for lm in r.face_landmarks:
        xs = [p.x for p in lm]; ys = [p.y for p in lm]
        x0, x1, y0, y1 = max(0, min(xs)), min(1, max(xs)), max(0, min(ys)), min(1, max(ys))
        # perluas: dahi + rambut di atas, sedikit ke samping (kotak landmark hanya kulit wajah)
        w, h = x1 - x0, y1 - y0
        out.append([round(max(0, x0 - 0.15 * w), 4), round(max(0, y0 - 0.35 * h), 4), round(min(1, w * 1.3), 4), round(min(1, h * 1.45), 4)])
    # MediaPipe melewatkan wajah yang tertawa/menunduk/miring: tambah Haar (frontal alt2), wajah >= 8 % sisi pendek
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY); mn = int(0.08 * min(W, H))
    for (x, y, w, h) in HAAR.detectMultiScale(g, 1.08, 5, minSize=(mn, mn)):
        b = [x / W, (y - 0.2 * h) / H, w / W, 1.3 * h / H]
        cx, cy = b[0] + b[2] / 2, b[1] + b[3] / 2
        if not any(o[0] <= cx <= o[0] + o[2] and o[1] <= cy <= o[1] + o[3] for o in out):
            out.append([round(max(0, b[0]), 4), round(max(0, b[1]), 4), round(b[2], 4), round(b[3], 4)])
    return out


HAAR = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_alt2.xml")


def saliency(img):
    g = cv2.cvtColor(cv2.resize(img, (128, 128)), cv2.COLOR_BGR2GRAY).astype(np.float32)
    f = np.fft.fft2(g); la = np.log(np.abs(f) + 1e-6); ph = np.angle(f)
    sr = la - cv2.blur(la, (3, 3))
    s = np.abs(np.fft.ifft2(np.exp(sr + 1j * ph))) ** 2
    s = cv2.GaussianBlur(s, (9, 9), 2.5); s /= s.sum() + 1e-9
    ys, xs = np.mgrid[0:128, 0:128]
    return {"x": round(float((s * xs).sum() / 128), 3), "y": round(float((s * ys).sum() / 128), 3)}


def ocr(path, W, H):
    try:
        tsv = subprocess.run(["tesseract", path, "-", "--psm", "11", "-l", "eng", "tsv"], capture_output=True, text=True, timeout=60).stdout
    except Exception:
        return 0.0, []
    luas, kata = 0.0, []
    for r in csv.DictReader(io.StringIO(tsv), delimiter="\t", quoting=csv.QUOTE_NONE):
        try:
            conf = float(r["conf"])
        except (ValueError, KeyError, TypeError):
            continue
        t = (r.get("text") or "").strip()
        if conf < 60 or len(t) < 2 or not any(c.isalpha() for c in t):
            continue
        w, h = int(r["width"]), int(r["height"]); luas += w * h
        if len(kata) < 12 and len(t) >= 3:
            kata.append(t)
    return round(luas / (W * H), 3), kata


def zona(img, faces):
    """zona aman pada potongan 16:9 cover di tengah, dalam koordinat frame 0-1."""
    H, W = img.shape[:2]; r = W / H; R = 16 / 9
    if r > R:  # lebih lebar: potong sisi
        cw = R / r; cx0, cy0, cwn, chn = (1 - cw) / 2, 0, cw, 1
    else:
        ch = r / R; cx0, cy0, cwn, chn = 0, (1 - ch) / 2, 1, ch
    fr = [((x - cx0) / cwn, (y - cy0) / chn, w / cwn, h / chn) for x, y, w, h in faces]
    Z = {"kiri": (0.06, 0.12, 0.40, 0.76), "kanan": (0.54, 0.12, 0.40, 0.76), "atas": (0.08, 0.10, 0.84, 0.28),
         "bawah": (0.08, 0.58, 0.84, 0.28), "tengah": (0.25, 0.30, 0.50, 0.40)}
    g = cv2.Canny(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY), 80, 160)
    out = []
    for n, (zx, zy, zw, zh) in Z.items():
        if any(not (zx + zw <= fx or fx + fw <= zx or zy + zh <= fy or fy + fh <= zy) for fx, fy, fw, fh in fr):
            continue
        px0 = int((cx0 + zx * cwn) * W); py0 = int((cy0 + zy * chn) * H)
        px1 = int((cx0 + (zx + zw) * cwn) * W); py1 = int((cy0 + (zy + zh) * chn) * H)
        sib = float((g[py0:py1, px0:px1] > 0).mean()) if px1 > px0 and py1 > py0 else 1.0
        out.append((round(sib, 3), n))
    return [n for _, n in sorted(out)]


def peta_gambar(img, path=None):
    H, W = img.shape[:2]
    f = wajah(img)
    if f:
        big = max(f, key=lambda b: b[2] * b[3]); fok = {"x": round(big[0] + big[2] / 2, 3), "y": round(big[1] + big[3] / 2, 3)}
    else:
        fok = saliency(img)
    d = {"w": W, "h": H, "rasio": round(W / H, 3), "tegak": W / H < 1.2, "wajah": f, "fokus": fok, "zona_teks": zona(img, f)}
    if path:
        d["teks_padat"], d["label"] = ocr(path, W, H)
    return d


hasil = {}
for fn in sorted(os.listdir(a.folder)):
    p = os.path.join(a.folder, fn); ext = fn.lower().rsplit(".", 1)[-1]
    if ext in ("jpg", "jpeg", "png", "webp", "gif"):
        img = cv2.imread(p)
        if img is None and ext == "gif":
            cap = cv2.VideoCapture(p); ok, img = cap.read()
        if img is None:
            continue
        hasil[fn] = peta_gambar(img, p)
    elif ext in ("mp4", "mov", "webm"):
        cap = cv2.VideoCapture(p); fps = cap.get(cv2.CAP_PROP_FPS) or 30; n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        dur = n / fps; sampel = []; t = 0.0; first = None
        while t < dur:
            cap.set(cv2.CAP_PROP_POS_FRAMES, int(t * fps)); ok, fr = cap.read()
            if not ok:
                break
            first = first if first is not None else fr
            sampel.append({"t": round(t, 2), "wajah": wajah(fr)})
            t += a.video_detik
        if first is None:
            continue
        d = peta_gambar(first); d["durasi"] = round(dur, 2); d["sampel"] = sampel
        semua = [b for s in sampel for b in s["wajah"]]; d["wajah"] = []  # per sampel; ringkasan:
        d["ada_wajah"] = round(sum(1 for s in sampel if s["wajah"]) / max(1, len(sampel)), 2)
        hasil[fn] = d
    print(fn, "wajah", len(hasil.get(fn, {}).get("wajah", [])) if fn in hasil else "-", file=sys.stderr)

json.dump(hasil, open(os.path.join(a.folder, "aset.json"), "w"), indent=1)
print(f"{len(hasil)} aset -> {os.path.join(a.folder, 'aset.json')}")
