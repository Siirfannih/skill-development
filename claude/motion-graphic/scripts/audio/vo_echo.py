"""Cek gema VO (audio.md §14.10): energi ekor 40-150 ms setelah akhir kata, relatif ke level kata.

Pakai: python3 vo_echo.py vo.wav words.json [--max -25]
words.json: daftar kata dengan waktu detik, salah satu bentuk:
  [{"start": 0.1, "end": 0.4}, ...]  atau  {"words": [...]}  (faster-whisper word_timestamps / vo.json)
Kata yang disusul kata berikutnya dalam < 150 ms dilewati (ekornya tertutup ucapan).
Lulus bila median ekor <= --max dB (default -25) relatif ke kata.
"""
import sys, json, numpy as np, librosa

wav, wj = sys.argv[1], sys.argv[2]
limit = float(sys.argv[sys.argv.index("--max") + 1]) if "--max" in sys.argv else -25.0
data = json.load(open(wj))
words = data["words"] if isinstance(data, dict) else data
ts = sorted((float(w.get("start", w.get("s"))), float(w.get("end", w.get("e")))) for w in words)
y, sr = librosa.load(wav, sr=None, mono=True)

def db(a, b):
    seg = y[int(a * sr):int(b * sr)]
    return 20 * np.log10(np.sqrt(np.mean(seg ** 2)) + 1e-9) if len(seg) else None

rel = []
for i, (s, e) in enumerate(ts):
    nxt = ts[i + 1][0] if i + 1 < len(ts) else e + 1
    if nxt - e < 0.15 or e - s < 0.08:
        continue
    w, t = db(s, e), db(e + 0.04, e + 0.15)
    if w is not None and t is not None:
        rel.append(t - w)
if not rel:
    sys.exit("Tidak ada kata dengan jeda >= 150 ms untuk diukur.")
med = float(np.median(rel))
print(f"kata diukur {len(rel)} | median ekor {med:.1f} dB | terburuk {max(rel):.1f} dB | batas {limit} dB")
sys.exit(0 if med <= limit else 1)
