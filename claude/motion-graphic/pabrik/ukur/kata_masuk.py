"""ukur/kata_masuk.py — lacak satu unit teks berwarna yang masuk, per frame di fps asli.

Mask = piksel bersaturasi (HSV S > ambang) di dalam ROI; unit yang masuk berwarna aksen sampai ia tenang, jadi saturasi
memisahkannya dari teks lama berwarna gelap. Keluaran per frame: x0, x1, cy, tinggi bbox (fraksi frame), ketajaman
(rerata |Laplacian| di bbox), luas. Lompatan besar dalam satu frame ditandai `cut` (bukan easing).
Pakai: python ukur/kata_masuk.py video.mp4 --dari s --sampai s --roi x0,y0,x1,y1 [--s_min 80] [--json out.json]
"""
import argparse, json, subprocess, sys
import numpy as np, cv2

def baca(path, dari, sampai):
    w, h = map(int, subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
        "stream=width,height", "-of", "csv=p=0", path], text=True).strip().split(","))
    raw = subprocess.check_output(["ffmpeg", "-v", "error", "-ss", str(dari), "-t", str(sampai - dari), "-i", path,
        "-f", "rawvideo", "-pix_fmt", "bgr24", "-"])
    return np.frombuffer(raw, np.uint8).reshape(-1, h, w, 3)

def lacak(frames, roi, s_min=80):
    H, W = frames.shape[1:3]
    x0, y0, x1, y1 = int(roi[0]*W), int(roi[1]*H), int(roi[2]*W), int(roi[3]*H)
    out, prev = [], None
    for i, f in enumerate(frames):
        c = f[y0:y1, x0:x1]
        hsv = cv2.cvtColor(c, cv2.COLOR_BGR2HSV)
        m = (hsv[..., 1] > s_min) & (hsv[..., 2] > 60)
        dup = prev is not None and float(np.abs(f.astype(int) - prev).mean()) == 0.0
        prev = f.astype(int)
        if m.sum() < 30:
            out.append({"f": i, "ada": False, "dup": dup}); continue
        ys, xs = np.nonzero(m)
        bx0, bx1, by0, by1 = xs.min(), xs.max(), ys.min(), ys.max()
        g = cv2.cvtColor(c[by0:by1+1, bx0:bx1+1], cv2.COLOR_BGR2GRAY)
        out.append({"f": i, "ada": True, "dup": dup, "x0": (bx0+x0)/W, "x1": (bx1+x0)/W, "cx": ((bx0+bx1)/2+x0)/W,
                    "cy": ((by0+by1)/2+y0)/H, "h": (by1-by0)/H, "tajam": float(np.abs(cv2.Laplacian(g, cv2.CV_64F)).mean()),
                    "luas": int(m.sum())})
    return out

if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("video"); ap.add_argument("--dari", type=float, required=True)
    ap.add_argument("--sampai", type=float, required=True); ap.add_argument("--roi", required=True)
    ap.add_argument("--s_min", type=int, default=80); ap.add_argument("--json")
    a = ap.parse_args()
    fr = baca(a.video, a.dari, a.sampai)
    r = lacak(fr, [float(v) for v in a.roi.split(",")], a.s_min)
    for d in r:
        print(d["f"], "dup" if d["dup"] else "   ", *(f"{k}={d[k]:.3f}" for k in ("x0", "x1", "cx", "cy", "h", "tajam") if k in d))
    if a.json: json.dump(r, open(a.json, "w"), indent=1)
