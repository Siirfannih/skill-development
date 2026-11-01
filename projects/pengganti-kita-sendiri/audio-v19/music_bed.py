"""PKS v19 music bed: stem orchestration per babak (Irfan's SOUND-PLAN + hybrid-motion-standard).
Sources (Epidemic, real files, no synthesis):
  dox_bass.wav     DOX STEMS BASS (Lennon Hutton)   E min -> -4 st = C min  : sub drone babak 2 + bridge + refleksi pad
  cycles_inst.wav  77 Cycles STEMS INSTRUMENTS        C min                    : arpeggio babak 3
  cycles_bass.wav  77 Cycles STEMS BASS               C min                    : pulse dari "ditepati"
  cycles_drums.wav 77 Cycles STEMS DRUMS              -                        : akselerasi dari "mengajari AI"
  darkwater.wav    Dark Water (Magnus Ludvigsson)     G min                    : piano refleksi
Video time t -> 77 Cycles track time t-16 (bass enters 15.8 s track = 31.8 s video "ditepati"; drums 25 s track = 41 s video).
Usage: python3 music_bed.py <src_dir> <dialog.wav> <out.wav>
"""
import sys, subprocess, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt

SR = 48000; DUR = 132.8; N = int(DUR * SR)
SRC, DIALOG, OUT = sys.argv[1:4]

def load(name, af=None):
    a = ['ffmpeg', '-v', 'error', '-i', f'{SRC}/{name}'] + (['-af', af] if af else []) + ['-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(a, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).copy()

def place(src, t_video, t_src, dur):
    """copy src[t_src:t_src+dur] to bed at t_video"""
    out = np.zeros((N, 2), np.float32)
    a, b = int(t_video * SR), int(t_src * SR); n = min(int(dur * SR), len(src) - b, N - a)
    out[a:a + n] = src[b:b + n]; return out

def env(points):
    """piecewise-linear gain in dB over time [(t, db), ...] -> linear per sample"""
    t = np.arange(N) / SR; ts, ds = zip(*points)
    return (10 ** (np.interp(t, ts, ds) / 20)).astype(np.float32)[:, None]

def db(x): return 20 * np.log10(max(x, 1e-9))

drone = load('dox_bass.wav', 'rubberband=pitch=0.7937:transients=smooth')
inst = load('cycles_inst.wav'); bass = load('cycles_bass.wav'); drums = load('cycles_drums.wav')
piano = load('darkwater.wav')

# --- layers (gain curves in dB, -120 = off). Babak boundaries from ANCHORS-V9 sentence times.
L = {}
# Babak 2 drone 9.95 hard-drop entry -> stays as floor until 75 (bridge), returns as pad under piano.
L['drone'] = place(drone, 9.95, 5.0, 123) * env([(0, -120), (9.94, -120), (9.95, -3), (22, -5), (40, -9), (54.8, -4), (61, -6), (75, -10), (117, -7), (126, -12), (132.8, -40)])
# Babak 3 arp: enters on "janji sederhana" (22 s), lifts on agents, falls away into the bridge.
L['inst'] = place(inst, 0, 0, DUR) * env([(0, -120), (21.0, -120), (22.5, -6), (40.9, -4), (50, -2), (54.8, -4), (61.2, -10), (70.4, -14), (75.2, -120)])
L['bass'] = place(bass, 0, 0, DUR) * env([(0, -120), (31.7, -120), (31.85, -6), (50, -4), (55.9, -8), (61.2, -10), (74.4, -14), (75.2, -120)])
# perkusi naik: otomasi dB dari "mengajari AI" sampai puncak agent 50 s
L['drums'] = place(drums, 0, 0, DUR) * env([(0, -120), (40.9, -120), (40.95, 2), (47, 8), (50, 12), (54.79, 12), (54.8, -120)])
# Babak 4 refleksi: piano from Sam Altman's line end; held, unresolved tail.
L['piano'] = place(piano, 75.2, 5.0, 58) * env([(0, -120), (75.19, -120), (76.5, -4), (117, -4), (125.2, -2), (129.7, -6), (132.8, -30)])

bed = sum(L.values())
# act trims from measured bed-vs-dialog balance (target music 8-12 dB under dialog per act, see MIX-NOTES)
bed *= env([(0, 0), (10, 4.4), (21.9, 4.4), (22.1, 3.5), (40.9, 3.5), (41.1, 2), (54.9, 2), (55.1, -1.6), (60.9, -1.6), (61.1, 3.4), (74.9, 3.4), (75.1, 1), (90.9, 1), (91.1, 0), (116.9, 0), (117.1, -2), (125.9, -2), (126.1, 0), (132.8, 0)])

# EQ carving: dip 1-4 kHz so narrator stays king (approx. -4 dB band-stop blend)
sos = butter(2, [1000, 4000], 'bandpass', fs=SR, output='sos')
bed = bed - (1 - 10 ** (-4 / 20)) * sosfilt(sos, bed, axis=0).astype(np.float32)

# Ducking from dialog envelope: -6 dB under VO, -8 dB under quoted clips; attack 40 ms, release 350 ms.
d, sr = sf.read(DIALOG, dtype='float32'); d = d.mean(1) if d.ndim > 1 else d
assert sr == SR
d = np.pad(d, (0, max(0, N - len(d))))[:N]
hop = 480; fr = np.sqrt(np.convolve(d ** 2, np.ones(hop) / hop, 'same'))[::hop]
active = (20 * np.log10(fr + 1e-9) > -42).astype(float)
ta = np.arange(len(active)) * hop / SR
clip = ((ta < 9.95) | ((ta > 55.8) & (ta < 60.5)) | ((ta > 71.0) & (ta < 74.6)))
depth = np.where(clip, -8.0, -6.0) * active
g = np.zeros_like(depth); a_c = np.exp(-hop / SR / 0.04); r_c = np.exp(-hop / SR / 0.35)
for i in range(len(depth)):
    prev = g[i - 1] if i else 0.0
    c = a_c if depth[i] < prev else r_c
    g[i] = c * prev + (1 - c) * depth[i]
duck = 10 ** (np.interp(np.arange(N) / SR, ta, g) / 20)
bed *= duck[:, None].astype(np.float32)

# Level: bed sits so speech-time music is ~-26 LUFS-ish; normalize by peak first, final gain set in mix.
bed *= 10 ** (-12 / 20) / max(np.abs(bed).max(), 1e-9)
sf.write(OUT, bed, SR, subtype='FLOAT')
for k, v in L.items(): print(k, 'peak %.1f dBFS' % db(np.abs(v).max()))
print('wrote', OUT)
