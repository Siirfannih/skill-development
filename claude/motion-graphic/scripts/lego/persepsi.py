"""Lapisan persepsi untuk Remotion: footage -> matte orang (RVM, stabil antar frame) + posisi wajah per frame (MediaPipe).

Pakai:
  python3 persepsi.py footage.mp4 out_dir [--detik 3] [--model-dir ~/work/persepsi/models] [--birefnet]

Keluaran di out_dir:
  matte.mp4    alpha orang (putih = orang), resolusi dan fps sama dengan footage
  wajah.json   per frame: t, kotak wajah (x,y,w,h ternormal 0-1), titik kunci (dahi, hidung, dagu, mata kiri/kanan)
  cek.jpg      3 frame contoh: matte di-overlay merah + titik wajah, untuk dilihat sebelum dipakai
  laporan.txt  waktu proses per detik footage
--birefnet: tambah 1 frame matte BiRefNet (birefnet-portrait lewat rembg) untuk banding tepi rambut.
"""
import argparse, json, os, subprocess, time
import numpy as np, cv2, onnxruntime as ort
import mediapipe as mp
from mediapipe.tasks import python as mpt
from mediapipe.tasks.python import vision

ap = argparse.ArgumentParser()
ap.add_argument("video"); ap.add_argument("out")
ap.add_argument("--detik", type=float, default=0)
ap.add_argument("--model-dir", default=os.path.expanduser("~/work/persepsi/models"))
ap.add_argument("--downsample", type=float, default=0, help="0 = otomatis (sisi panjang ~512 px)")
ap.add_argument("--birefnet", action="store_true")
a = ap.parse_args()
os.makedirs(a.out, exist_ok=True)

cap = cv2.VideoCapture(a.video); fps = cap.get(cv2.CAP_PROP_FPS) or 30
W, H = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
n_max = int(a.detik * fps) if a.detik else 10**9
ds = a.downsample or min(1.0, 512 / max(W, H))

rvm = ort.InferenceSession(os.path.join(a.model_dir, "rvm_mobilenetv3_fp32.onnx"), providers=["CPUExecutionProvider"])
rec = [np.zeros([1, 1, 1, 1], np.float32)] * 4
dsr = np.array([ds], np.float32)
fl = vision.FaceLandmarker.create_from_options(vision.FaceLandmarkerOptions(
    base_options=mpt.BaseOptions(model_asset_path=os.path.join(a.model_dir, "face_landmarker.task")),
    running_mode=vision.RunningMode.VIDEO, num_faces=1))
KUNCI = {"dahi": 10, "hidung": 1, "dagu": 152, "mata_kiri": 33, "mata_kanan": 263}

enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "gray", "-s", f"{W}x{H}", "-r", str(fps),
                        "-i", "-", "-c:v", "libx264", "-crf", "14", "-pix_fmt", "yuv420p", os.path.join(a.out, "matte.mp4")],
                       stdin=subprocess.PIPE)
wajah, contoh, i, t0 = [], [], 0, time.time(); t_rvm = t_face = 0.0
while i < n_max:
    ok, fr = cap.read()
    if not ok: break
    rgb = cv2.cvtColor(fr, cv2.COLOR_BGR2RGB)
    s = time.time()
    src = (rgb.astype(np.float32) / 255).transpose(2, 0, 1)[None]
    fgr, pha, *rec = rvm.run(None, {"src": src, "r1i": rec[0], "r2i": rec[1], "r3i": rec[2], "r4i": rec[3], "downsample_ratio": dsr})
    alpha = (np.clip(pha[0, 0], 0, 1) * 255).astype(np.uint8); enc.stdin.write(alpha.tobytes()); t_rvm += time.time() - s
    s = time.time()
    res = fl.detect_for_video(mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb), int(i * 1000 / fps)); t_face += time.time() - s
    row = {"t": round(i / fps, 4)}
    if res.face_landmarks:
        L = res.face_landmarks[0]; xs = [p.x for p in L]; ys = [p.y for p in L]
        row["kotak"] = [round(min(xs), 4), round(min(ys), 4), round(max(xs) - min(xs), 4), round(max(ys) - min(ys), 4)]
        row["titik"] = {k: [round(L[v].x, 4), round(L[v].y, 4)] for k, v in KUNCI.items()}
    wajah.append(row)
    if i in (0, int(fps), int(2 * fps)): contoh.append((fr.copy(), alpha.copy(), row))
    i += 1
enc.stdin.close(); enc.wait(); fl.close()
json.dump({"fps": fps, "w": W, "h": H, "frames": wajah}, open(os.path.join(a.out, "wajah.json"), "w"))

tiles = []
for fr, al, row in contoh:
    v = fr.copy(); v[..., 2] = np.maximum(v[..., 2], (al * 0.6).astype(np.uint8))
    for k, (x, y) in row.get("titik", {}).items(): cv2.circle(v, (int(x * W), int(y * H)), max(4, W // 150), (0, 255, 0), -1)
    if "kotak" in row:
        x, y, w, h = row["kotak"]; cv2.rectangle(v, (int(x * W), int(y * H)), (int((x + w) * W), int((y + h) * H)), (0, 255, 255), max(2, W // 400))
    tiles.append(cv2.resize(v, (360, int(360 * H / W))))
if tiles: cv2.imwrite(os.path.join(a.out, "cek.jpg"), np.hstack(tiles))

dur = i / fps; ada = sum(1 for r in wajah if "kotak" in r)
lap = [f"footage {os.path.basename(a.video)} {W}x{H} {fps:.2f} fps, diproses {i} frame ({dur:.1f} dtk), downsample RVM {ds:.3f}",
       f"RVM: {t_rvm:.1f} dtk total = {t_rvm / max(dur, 1e-6):.1f} dtk per detik footage",
       f"MediaPipe: {t_face:.1f} dtk total = {t_face / max(dur, 1e-6):.1f} dtk per detik footage; wajah terdeteksi {ada}/{i} frame"]
if a.birefnet:
    from rembg import remove, new_session
    from PIL import Image
    s = time.time(); m = remove(Image.fromarray(cv2.cvtColor(contoh[0][0], cv2.COLOR_BGR2RGB)), session=new_session("birefnet-portrait"), only_mask=True)
    m.save(os.path.join(a.out, "birefnet_frame0.png")); lap.append(f"BiRefNet 1 frame: {time.time() - s:.1f} dtk (termasuk muat model)")
open(os.path.join(a.out, "laporan.txt"), "w").write("\n".join(lap) + "\n"); print("\n".join(lap))
