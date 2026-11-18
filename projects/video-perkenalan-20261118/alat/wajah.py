# wajah.py <src.mp4> <out.json> : kotak wajah (haar, tiap 2 frame) -> {frame: [cx, cy, w]} di koordinat 1080x1920
import cv2, json, sys
cap = cv2.VideoCapture(sys.argv[1]); det = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
out = {}; n = 0
while True:
    ok, img = cap.read()
    if not ok: break
    if n % 2 == 0:
        sm = cv2.cvtColor(cv2.resize(img, (360, 640)), cv2.COLOR_BGR2GRAY)
        fs = det.detectMultiScale(sm, 1.1, 5, minSize=(60, 60))
        if len(fs):
            x, y, w, h = max(fs, key=lambda r: r[2] * r[3])
            out[n] = [round((x + w / 2) * 3), round((y + h / 2) * 3), round(w * 3)]
    n += 1
json.dump(out, open(sys.argv[2], 'w')); print('frames', n, 'deteksi', len(out))
