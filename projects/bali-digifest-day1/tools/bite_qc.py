"""Ukur kualitas audio satu potongan testimoni (tanpa telinga).
Pakai: python bite_qc.py <sumber.MP4|.npy> <awal> <akhir> [label]
Keluaran: SNR (rms kata vs lantai noise jeda), lantai noise, tingkat kata hilang (kata Whisper prob < 0,5),
lalu earshot describe: z untuk 'people talking in the background' / 'a crowd talking' = indikasi suara bertumpuk.
"""
import sys, subprocess, json, re, os, numpy as np, tempfile, wave

src, a0, a1 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
label = sys.argv[4] if len(sys.argv) > 4 else os.path.basename(src)
if src.endswith('.npy'):
    x = np.load(src).astype(np.float32) / 32768; sr = 16000; x = x[int(a0 * sr):int(a1 * sr)]
else:
    sr = 48000
    pcm = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(a0), '-to', str(a1), '-i', src, '-map', '0:a:0', '-ac', '1',
                          '-ar', str(sr), '-f', 's16le', '-'], capture_output=True).stdout
    x = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768
hop = int(0.05 * sr)
fr = np.array([np.sqrt(np.mean(x[i:i + hop] ** 2) + 1e-12) for i in range(0, len(x) - hop, hop)])
db = 20 * np.log10(fr)
speech = float(np.percentile(db, 90)); floor = float(np.percentile(db, 10))
tmp = tempfile.mktemp(suffix='.wav')
w = wave.open(tmp, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
out = subprocess.run([os.path.expanduser('~/work/mg-venv/bin/earshot'), 'describe', tmp], capture_output=True, text=True).stdout
os.remove(tmp)
def z(name):
    m = re.search(r'([+-]\d+\.\d)\s+' + re.escape(name), out); return float(m.group(1)) if m else None
def hint(name):
    m = re.search(re.escape(name) + r' \(([+-]\d+\.\d)\)', out); return float(m.group(1)) if m else None
res = dict(label=label, a0=a0, a1=a1, dur=round(a1 - a0, 2), speech_p90=round(speech, 1), floor_p10=round(floor, 1),
           snr=round(speech - floor, 1), bg_talk=z('people talking in the background'), crowd_talk=hint('a crowd talking'),
           cafe=z('a busy cafe'))
print(json.dumps(res))
