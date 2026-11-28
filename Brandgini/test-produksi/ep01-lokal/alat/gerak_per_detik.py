#!/usr/bin/env python3
"""gerak_per_detik.py (uji anti-PPT butir 4, Bang Motion): tiap detik harus ada gerak. Selisih mutlak rata-rata frame abu 1/4 skala antar sampel 5 fps
di dalam satu detik; 'mati' bila selisih maks < ambang (0,6 dari 255). Ambang ditetapkan sendiri (kalibrasi: napas kamera 5 px ~ 0,2-0,5).
  gerak_per_detik.py render.mp4 [v1.mp4]"""
import sys, cv2, numpy as np
def ukur(p):
    c = cv2.VideoCapture(p); fps = c.get(cv2.CAP_PROP_FPS); n = int(c.get(cv2.CAP_PROP_FRAME_COUNT)); step = int(round(fps / 5)); prev = None; per = {}; i = 0
    while True:
        ok, f = c.read()
        if not ok: break
        if i % step == 0:
            g = cv2.cvtColor(cv2.resize(f, (270, 480)), cv2.COLOR_BGR2GRAY).astype(np.float32)
            if prev is not None: per.setdefault(int(i / fps), []).append(float(np.mean(np.abs(g - prev))))
            prev = g
        i += 1
    return per
for p in sys.argv[1:]:
    per = ukur(p); mati = [s for s, v in sorted(per.items()) if max(v) < 0.6]
    allm = np.array([max(v) for _, v in sorted(per.items())])
    print(f"{p}: {len(per)} detik, detik mati (<0,6): {len(mati)} {mati}; median gerak {np.median(allm):.2f}; min {allm.min():.2f}")
