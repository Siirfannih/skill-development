# Mix v4 (revisi Irfan 16 Nov, Lantai E23): suara asli tidak diturunkan/ditekan/di-limit.
# Suara: rapikan desis HF codec (EQ statis + low-pass, bukan kompresor) -> gain NAIK bersih (puncak <= -1,1 dBFS)
#        -> frasa awal "have very low resilience," (1,7-3,4 dtk) diangkat gain statis bila lebih pelan dari median.
# Musik + SFX: stem v1 (relasi ke suara v1 tetap) diikutkan dengan selisih gain suara; limiter HANYA di bus musik+SFX.
import numpy as np, soundfile as sf, subprocess, pyloudnorm as pyln, json
SR = 48000; DUR = 47.6; N = int(DUR * SR)
P = '/home/irfan/work/skill-development/projects/jensen-pain-suffering/audio'
meter = pyln.Meter(SR)

def rd(path, af=None):
    cmd = ['ffmpeg', '-v', 'error', '-i', path] + (['-af', af] if af else []) + ['-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    a = np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, dtype=np.float32).reshape(-1, 2).copy()
    b = np.zeros((N, 2), np.float32); b[:min(N, len(a))] = a[:N]; return b

db = lambda x: 20 * np.log10(max(float(np.abs(x).max()), 1e-9))
SUMBER = rd(P + '/suara.wav')
# desis codec YouTube/opus ada di dalam suara (demucs: no_vocals -61 LUFS, jadi bukan noise latar): rak HF statis
EQ = 'highshelf=f=7500:g=-2:t=q:w=0.7,lowpass=f=14500:poles=2'
v = rd(P + '/suara.wav', EQ)

# angkat frasa awal yang lebih pelan (gain statis, rampa 120 ms di jeda; hanya naik)
W = json.load(open(P + '/words.json')); W = W if isinstance(W, list) else W['words']
def lu(x, a, b): return meter.integrated_loudness(x[int(a * SR):int(b * SR)])
phr = [(0.0, 1.70), (1.78, 3.40), (3.47, 6.05)]
med = np.median([lu(v, a, b) for a, b in [(0, 1.7), (3.47, 6.05), (6.1, 9.0), (9.2, 15), (16, 27), (28, 39), (40, 44)]])
lift = max(0.0, min(3.0, med - lu(v, 1.78, 3.40)))
env = np.ones(N, np.float32); r = int(0.12 * SR)
r = int(0.06 * SR); a, b = int(1.72 * SR), int(3.40 * SR)  # rampa di dalam jeda 1,66-1,78 dan 3,40-3,46
env[a:b] = 10 ** (lift / 20); env[a - r:a] = np.linspace(1, 10 ** (lift / 20), r); env[b:b + r] = np.linspace(10 ** (lift / 20), 1, r)
v *= env[:, None]

# gain bersih: setinggi mungkin menuju -16 LUFS dengan puncak sampel <= -1,1 dBFS (tanpa limiter)
g_lufs = -16.0 - meter.integrated_loudness(v)
g_peak = -1.02 - db(v)
g = min(g_lufs, g_peak)
v *= 10 ** (g / 20)
Lv = meter.integrated_loudness(v)

# musik + SFX: stem v1 dibuat untuk suara -15 LUFS; ikut turun/naik sebesar selisih suara sekarang ke -15
mus = rd(P + '/stem_musik.wav'); sfx = rd(P + '/stem_sfx.wav')
k = 10 ** ((Lv - (-15.0)) / 20)
bus = (mus + sfx) * k
sf.write(P + '/v4/bus_pre.wav', bus, SR, subtype='FLOAT')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', P + '/v4/bus_pre.wav', '-af', 'alimiter=limit=0.5:attack=3:release=80:level=disabled',
                '-c:a', 'pcm_f32le', P + '/v4/bus_lim.wav'], check=True)
bus = rd(P + '/v4/bus_lim.wav')
mix = v + bus
# puncak gabungan > -1 dBFS (suara + ekor hit): bus musik+SFX yang mengalah di titik itu (rampa 30 ms), suara utuh
thr = 10 ** (-1.1 / 20)
from scipy.ndimage import minimum_filter1d, uniform_filter1d
for _ in range(4):
    am = np.abs(mix).max(1)
    if am.max() <= thr: break
    need = np.ones(N, np.float32); o = am > thr
    need[o] = np.clip((thr - np.abs(v[o]).max(1)) / np.maximum(np.abs(bus[o]).max(1), 1e-6), 0, 1)
    gcur = uniform_filter1d(minimum_filter1d(need, int(0.03 * SR)), int(0.03 * SR))
    bus *= np.minimum(gcur, 1)[:, None]; mix = v + bus
pk = db(mix)
if pk > -1.0:  # bila jumlah masih lewat -1 dBFS, yang turun bus musik+SFX di titik itu, bukan suara
    over = np.abs(mix).max(1) > 10 ** (-1.05 / 20)
    print('PERINGATAN: puncak mix', round(pk, 2), 'di', np.where(over)[0][:5] / SR)
sf.write(P + '/stem_suara_v4.wav', v, SR, subtype='FLOAT')
sf.write(P + '/v4/sumber.wav', SUMBER, SR, subtype='FLOAT')
sf.write(P + '/mix_v4.wav', mix, SR, subtype='FLOAT')
print(f'suara: gain {g:+.2f} dB (lufs {g_lufs:+.2f}, puncak {g_peak:+.2f}), angkat frasa awal {lift:+.1f} dB -> {Lv:.1f} LUFS, puncak {db(v):.1f}')
print(f'mix {meter.integrated_loudness(mix):.1f} LUFS, puncak {db(mix):.1f} dBFS; bus k {20*np.log10(k):+.1f} dB')
for a, b in ((0, 1.7), (1.78, 3.4), (3.47, 6), (6, 9), (9, 15), (15, 27), (27, 34), (34, 40), (40, 44), (44, 47)):
    print(f'{a:5.2f}-{b:5.2f} suara {lu(v, a, b):6.1f}  bus {lu(bus, a, b):6.1f}')
