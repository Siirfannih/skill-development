# Bedah gerak kamera dari video jadi: transform kemiripan antar-frame (ORB + RANSAC) → zoom, geser, putar per frame.
# Pakai: python3 bedah-kamera.py video.mp4 keluaran.csv
import sys, cv2, numpy as np
cap = cv2.VideoCapture(sys.argv[1]); fps = cap.get(cv2.CAP_PROP_FPS) or 30
orb = cv2.ORB_create(1500); bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
prev = None; rows = []; i = 0
while True:
    ok, fr = cap.read()
    if not ok: break
    g = cv2.cvtColor(cv2.resize(fr, (640, 360)), cv2.COLOR_BGR2GRAY)
    kp, de = orb.detectAndCompute(g, None)
    z = tx = ty = rot = 0.0; inl = 0; cut = 0
    if prev is not None:
        diff = np.mean(cv2.absdiff(g, prev[2]))
        if prev[1] is not None and de is not None and len(kp) > 20 and len(prev[0]) > 20:
            m = bf.match(prev[1], de)
            if len(m) > 15:
                a = np.float32([prev[0][x.queryIdx].pt for x in m]); b = np.float32([kp[x.trainIdx].pt for x in m])
                M, msk = cv2.estimateAffinePartial2D(a, b, method=cv2.RANSAC, ransacReprojThreshold=2.0)
                if M is not None:
                    inl = int(msk.sum()); s = np.hypot(M[0, 0], M[1, 0]); z = np.log(max(s, 1e-6)); rot = np.degrees(np.arctan2(M[1, 0], M[0, 0]))
                    tx, ty = M[0, 2] + (s - 1) * 0, M[1, 2]
                    # geser murni (tanpa efek zoom terhadap pusat)
                    c = np.array([320, 180]); p = M[:, :2] @ c + M[:, 2]; tx, ty = p - c
        if inl < 12: z = tx = ty = rot = 0.0; cut = 1 if diff > 25 else 0
    rows.append((i / fps, z, tx, ty, rot, inl, cut)); prev = (kp, de, g); i += 1
np.savetxt(sys.argv[2], np.array(rows), delimiter=",", header="t,dlogzoom,tx,ty,rot,inliers,cut", fmt="%.5f")
R = np.array(rows); sp = np.hypot(R[:, 2], R[:, 3]) / 640 * 1920 + np.abs(R[:, 1]) * 1920   # kecepatan gabungan (px/frame setara 1080p)
mov = sp > 1.5; acc = np.abs(np.diff(sp)); jerk = np.abs(np.diff(sp, 2))
# segmen gerak
seg = []; s = None
for k, v in enumerate(mov):
    if v and s is None: s = k
    if (not v or k == len(mov) - 1) and s is not None: seg.append((s, k)); s = None
dur = [ (b - a) / fps for a, b in seg if b - a >= 3 ]
print(f"{sys.argv[1].split('/')[-1]}: {len(R)/fps:.1f} dtk · bergerak {mov.mean()*100:.0f}% waktu · {len(dur)} gerak (≥0,1 dtk) · durasi rata {np.mean(dur) if dur else 0:.2f} dtk (median {np.median(dur) if dur else 0:.2f})")
print(f"  kecepatan rata saat gerak {sp[mov].mean():.1f} px/f · puncak p95 {np.percentile(sp, 95):.1f} · percepatan rata {acc[mov[1:]].mean():.2f} · jerk p95 {np.percentile(jerk, 95):.2f}")
print(f"  zoom: total log-perubahan {np.abs(R[:,1]).sum():.2f} · rotasi |rata| {np.abs(R[:,4])[mov].mean():.3f}°/f · potongan {int(R[:,6].sum())}")
# berapa gerak yang 'berhenti-mulai' (kecepatan turun <0,5 lalu naik lagi dalam 0,3 dtk)
stopgo = sum(1 for k in range(1, len(sp) - 9) if sp[k] < 0.5 and sp[k - 1] > 1.5 and sp[k + 1:k + 10].max() > 1.5)
print(f"  berhenti-mulai mendadak: {stopgo}")
