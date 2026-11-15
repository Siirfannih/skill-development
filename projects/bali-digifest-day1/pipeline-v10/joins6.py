"""Mulus tidaknya tiap sambungan potongan VO: jarak MFCC 20 ms sebelum vs sesudah titik sambung,
dibanding median jarak antar-frame bertetangga di ucapan bite itu. Rasio > 2,5 = sambungan kasar."""
import json, numpy as np, soundfile as sf, librosa
SRC = {'0361': [(10, '../v3/vo_src/dfn18/0361_10_DeepFilterNet3.wav')], '0378': [(10, 'vo_src/dfn24/0378_10_DeepFilterNet3.wav')],
       '0530': [(105, 'vo_src/dfn24/0530_105_DeepFilterNet3.wav')], '0525': [(172, 'vo_src/dfn24/0525_172_DeepFilterNet3.wav')],
       '0426': [(12, 'vo_src/dfn24/0426_12_DeepFilterNet3.wav')], '0531': [(95, 'vo_src/dfn24/0531_95_DeepFilterNet3.wav')],
       '0399': [(36, 'vo_src/dfn24/0399_36_DeepFilterNet3.wav')]}
sp = json.load(open('speech6.json'))
def mf(x, sr): return librosa.feature.mfcc(y=x.astype(np.float32), sr=sr, n_mfcc=13, n_fft=1024, hop_length=len(x) + 1)[1:, 0]
for bid, d in sp.items():
    off, f = [x for x in SRC[d['clip']] if x[0] <= d['parts'][0][0]][-1]; x, sr = sf.read(f)
    if x.ndim == 2: x = x.mean(1)
    a, b = d['parts'][0][0], d['parts'][-1][1]; seg = x[int((a - off) * sr):int((b - off) * sr)].astype(np.float32)
    M = librosa.feature.mfcc(y=seg, sr=sr, n_mfcc=13, n_fft=1024, hop_length=int(0.02 * sr))[1:]
    base = np.median(np.linalg.norm(np.diff(M, axis=1), axis=0))
    h = int(0.02 * sr); res = []
    for (p0, p1), (q0, q1) in zip(d['parts'], d['parts'][1:]):
        u = x[int((p1 - off) * sr) - h:int((p1 - off) * sr)]; w = x[int((q0 - off) * sr):int((q0 - off) * sr) + h]
        eu = 20 * np.log10(np.sqrt(np.mean(u ** 2)) + 1e-9); ew = 20 * np.log10(np.sqrt(np.mean(w ** 2)) + 1e-9)
        r = np.linalg.norm(mf(u, sr) - mf(w, sr)) / base
        res.append(f"{p1:.2f}|{q0:.2f} r={r:.1f} dB {eu:.0f}->{ew:.0f}{' KASAR' if r > 2.5 and min(eu, ew) > -40 else ''}")
    print(bid, ' ; '.join(res))
