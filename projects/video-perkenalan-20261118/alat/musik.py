# musik.py · stem musik pratinjau "Aware → Relax" (pilihan Irfan 19 Nov), menggantikan §5.2 (Rain in L.A. + Otis).
# Struktur §5.2 dipertahankan: bed f0–768, kantong hening f768–772, lagu kedua masuk f772 di "tapi".
#   Aware (Adrián Berenguer) mulai 9,967 dtk sumber → hantaman strings 29,80 jatuh di jump cut f595 (#10, "drum bed ±f600").
#   Relax (Peyruis) mulai 18,53 dtk sumber (hantaman groove) di f772; angkatan groove berikutnya 55,10 jatuh di ±f1869
#   (polaroid → kamera mundur ke profil). Berhenti f1990 sebelum slam ULANGI f1992 (kantong untuk hantaman + loop).
# Level (sesudah duck, suara −16,7 LUFS): Aware −30/−26,5, Relax −28,5/−29/−28. Duck saat bicara −3/−4 dB (ramp 60 ms masuk, 250 ms lepas), dip −6 dB di 0,8–4 kHz saat bicara, HPF 90 Hz. Suara tidak disentuh.
# Pakai: ~/work/mg-venv/bin/python alat/musik.py <outdir>   → musik_mentah.wav + musik.json
import json, os, sys, numpy as np, soundfile as sf, pyloudnorm as pyln
from scipy.signal import butter, sosfiltfilt

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1] if len(sys.argv) > 1 else f'{R}/kerja/mix'
SR, FPS, N = 48000, 30, 2006
L = int(round(N / FPS * SR))
meter = pyln.Meter(SR)


def baca(nama):
    x, sr = sf.read(f'{R}/sumber/musik/{nama}', dtype='float64', always_2d=True)
    assert sr == SR, (nama, sr)
    return np.repeat(x, 2, 1) if x.shape[1] == 1 else x


def s(f):  # frame → sampel
    return int(round(f / FPS * SR))


def ramp(n, naik=True):
    t = np.linspace(0, 1, n)
    k = 0.5 - 0.5 * np.cos(np.pi * t)  # ease, bukan linear
    return k if naik else k[::-1]


# (sumber, detik sumber di frame awal, frame awal, frame akhir, fade masuk ms, fade keluar ms, bagian: [(frame mulai, target LUFS)])
BAGIAN = [
    dict(nama='Aware', file='aware.wav', src=9.967, f0=0, f1=768, fi=20, fo=120,
         duck=-3, target=[(0, -30.0), (595, -26.5)]),       # target = LUFS sesudah duck. Intro tipis di bawah hook; strings #10 naik 3,5 LU
    dict(nama='Relax', file='relax.wav', src=18.53, f0=772, f1=1990, fi=5, fo=150,
         duck=-4, target=[(772, -28.5), (1328, -29.0), (1845, -28.0)]),  # groove; tengah lagu (37–54 dtk) aslinya −7 dB → hanya −1 LU
]

# aktivitas bicara dari words_v6 (jeda < 0,35 dtk digabung)
words = json.load(open(f'{R}/sumber/words_v6.json'))
bicara = np.zeros(L)
seg = []
for w in sorted(words, key=lambda w: w['start']):
    a, b = w['start'] - 0.06, w['end'] + 0.06
    if seg and a - seg[-1][1] < 0.35: seg[-1][1] = max(seg[-1][1], b)
    else: seg.append([a, b])
for a, b in seg: bicara[max(0, int(a * SR)):min(L, int(b * SR))] = 1
# ramp 60 ms masuk, 250 ms lepas (penghalusan satu kutub asimetris, dihitung per blok 1 ms)
blk = SR // 1000
env = bicara[:L // blk * blk].reshape(-1, blk).max(1)
sm = np.zeros_like(env); v = 0.0
for i, e in enumerate(env):
    tau = 60 if e > v else 250
    v += (e - v) * (1 - np.exp(-1 / tau)); sm[i] = v
duck_env = np.repeat(sm, blk); duck_env = np.pad(duck_env, (0, L - len(duck_env)), mode='edge')[:, None]

hpf = butter(2, 90, 'highpass', fs=SR, output='sos')
band = butter(2, [800, 4000], 'bandpass', fs=SR, output='sos')
stem = np.zeros((L, 2))
info = []
for B in BAGIAN:
    x = baca(B['file'])
    a, b = s(B['f0']), s(B['f1'])
    src0 = int(round(B['src'] * SR))
    y = x[src0:src0 + (b - a)].copy()
    y = sosfiltfilt(hpf, y, axis=0)
    # saat bicara: duck + dip 1–4 kHz (komponen pita fase-nol dikurangi → dip bersih)
    dk, dip = B['duck'], -6
    y = y - (1 - 10 ** (dip / 20)) * sosfiltfilt(band, y, axis=0) * duck_env[a:b]
    y *= 10 ** (dk * duck_env[a:b] / 20)
    # gain per bagian SESUDAH duck: loudness yang benar-benar terdengar di bawah suara = target; sambungan di-ramp 300 ms
    tg = B['target'] + [(B['f1'], None)]
    g = np.ones(len(y))
    for (fa, lu), (fb, _) in zip(tg[:-1], tg[1:]):
        p, q = s(fa) - a, s(fb) - a
        g[p:q] = 10 ** ((lu - meter.integrated_loudness(y[p:q])) / 20)
    for fa, _ in tg[1:-1]:
        p = s(fa) - a; n = int(0.3 * SR); g0, g1 = g[p - 1], g[p]
        g[p:p + n] = g0 + (g1 - g0) * ramp(n)
    y *= g[:, None]
    fi, fo = int(B['fi'] / 1000 * SR), int(B['fo'] / 1000 * SR)
    y[:fi] *= ramp(fi)[:, None]; y[-fo:] *= ramp(fo, False)[:, None]
    stem[a:b] += y
    info.append(dict(bagian=B['nama'], file=B['file'], sumber_dtk=[B['src'], round(B['src'] + (b - a) / SR, 3)],
                     frame=[B['f0'], B['f1']], target_lufs=B['target'], duck_db=dk, dip_1_4k_db=dip,
                     lufs_hasil=round(meter.integrated_loudness(y), 1)))
    for (fa, lu), (fb, _) in zip(tg[:-1], tg[1:]): info[-1].setdefault('lufs_bagian', []).append([fa, fb, round(meter.integrated_loudness(y[s(fa) - a:s(fb) - a]), 1)])
os.makedirs(OUT, exist_ok=True)
sf.write(f'{OUT}/musik_mentah.wav', stem, SR, subtype='PCM_24')  # mix.py membaca ini, menulis stem_music.wav (sesudah pelindung puncak)
json.dump(info, open(f'{OUT}/musik.json', 'w'), indent=1, ensure_ascii=False)
for i in info: print(i['bagian'], i['frame'], 'sumber', i['sumber_dtk'], 'LUFS', i['lufs_hasil'])
