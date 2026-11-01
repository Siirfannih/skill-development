"""PKS v19 mix: dialog (unity, untouched) + music bed + room tone + SFX cues -> master -14 LUFS, TP <= -1.5.
Usage: python3 mix_v19.py <dialog.wav> <bed.wav> <cues.json> <sfx_root> <out_dir> [--bed-db X] [--seg A B]
cues.json: [{"role","file","t","gainDb","pan"(-1..1),"trim"(s, optional),"fadeOut"(s),"stopAt"(s, optional)}]
SFX levels follow hybrid-motion-standard: sub_impact/low_whoosh ~ -12 dB, UI/data ~ -20 dB relative to dialog peak.
"""
import sys, json, subprocess, numpy as np, soundfile as sf, pyloudnorm as pyln
from scipy.signal import butter, sosfilt

SR = 48000; DUR = 132.8; N = int(DUR * SR)
args = sys.argv[1:]
DIALOG, BED, CUES, ROOT, OUT = args[:5]
bed_db = float(args[args.index('--bed-db') + 1]) if '--bed-db' in args else 0.0
seg = (float(args[args.index('--seg') + 1]), float(args[args.index('--seg') + 2])) if '--seg' in args else None

def load(p):
    a = ['ffmpeg', '-v', 'error', '-i', p, '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(a, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).copy()

def fit(x):
    x = x[:N]; return np.pad(x, ((0, N - len(x)), (0, 0)))

dialog = fit(load(DIALOG)); bed = fit(load(BED)) * 10 ** (bed_db / 20)

# room tone: hospital-air (steady, var 0.7 dB), looped with 2 s equal-power crossfades, LPF 6 kHz, ~-54 dBFS RMS floor
rt = load(f'{ROOT}/room_tone/hospital-air__0d38392e.wav'); xf = 2 * SR
loop = rt.copy()
while len(loop) < N:
    w = np.linspace(0, np.pi / 2, xf)[:, None]
    head = loop[-xf:] * np.cos(w) + rt[:xf] * np.sin(w)
    loop = np.concatenate([loop[:-xf], head, rt[xf:]])
room = fit(loop)
room = sosfilt(butter(4, 6000, 'low', fs=SR, output='sos'), room, axis=0).astype(np.float32)
room *= 10 ** (-54 / 20) / np.sqrt((room ** 2).mean())

# SFX
dpk = np.percentile(np.abs(dialog), 99.9)
_dm = dialog.mean(1); dlg_rms = np.sqrt((_dm[np.abs(_dm) > 0.01] ** 2).mean())
# target RMS bunyi relatif RMS ucapan (dB) — terdengar jelas, VO tetap raja
REL = {'sub_impact': -4, 'low_whoosh': -3, 'scifi_whoosh': -4, 'snap_click': -5, 'glass_ping': -9, 'ui_tap': -7,
       'telemetry_blip': -10, 'graph_riser': -11, 'riser_coldopen': -9, 'heartbeat_pulse': -12}
sfx = np.zeros((N, 2), np.float32)
for c in json.load(open(CUES)):
    x = load(f"{ROOT}/{c['role']}/{c['file']}")
    if c.get('trim'): x = x[:int(c['trim'] * SR)]
    if c.get('stopAt') is not None: x = x[:max(0, int((c['stopAt'] - c['t']) * SR))]
    fo = int(c.get('fadeOut', 0.05) * SR); fo = min(fo, len(x))
    if fo: x[-fo:] *= np.linspace(1, 0, fo)[:, None]
    # v19b: gain dari RMS bunyi (300 ms pertama yang berenergi) terhadap RMS ucapan narator — bukan puncak (bunyi pendek tenggelam di v19)
    _w = int(0.3 * SR); _m = x.mean(1) ** 2
    e = np.sqrt(np.convolve(_m, np.ones(_w) / _w, 'valid').max()) if len(_m) > _w else np.sqrt(_m.mean() + 1e-18)  # jendela 300 ms terkeras
    x *= dlg_rms * 10 ** (REL.get(c['role'], -12) / 20) / max(e, 1e-9)
    p = c.get('pan', 0.0); x[:, 0] *= np.sqrt((1 - p) / 2) * np.sqrt(2); x[:, 1] *= np.sqrt((1 + p) / 2) * np.sqrt(2)
    a = int(c['t'] * SR); n = min(len(x), N - a)
    if n > 0: sfx[a:a + n] += x[:n]

# SFX duck −4 dB saat kata diucapkan (QC HP 2 Nov: 64 jendela VO<6 dB di atas latar); attack 20 ms, release 200 ms
dm = dialog.mean(1); hop = 480
fr = np.sqrt(np.convolve(dm ** 2, np.ones(hop) / hop, 'same'))[::hop]
act = (20 * np.log10(fr + 1e-9) > -42).astype(float) * -2.0
g = np.zeros_like(act); a_c = np.exp(-hop / SR / 0.02); r_c = np.exp(-hop / SR / 0.2)
for i in range(len(act)):
    pv = g[i - 1] if i else 0.0; c = a_c if act[i] < pv else r_c; g[i] = c * pv + (1 - c) * act[i]
sfx *= (10 ** (np.interp(np.arange(N) / SR, np.arange(len(g)) * hop / SR, g) / 20)).astype(np.float32)[:, None]
mix = dialog + bed + room + sfx
meter = pyln.Meter(SR)
lufs = meter.integrated_loudness(mix)
mix *= 10 ** ((-14 - lufs) / 20)
import os, tempfile; os.makedirs(OUT, exist_ok=True)
# true-peak safety: look-ahead limiter at -1.5 dBFS (ffmpeg alimiter), then re-trim to -14 LUFS
tmp = tempfile.mktemp(suffix='.wav'); sf.write(tmp, mix, SR, subtype='FLOAT')
mix = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', tmp, '-af', 'alimiter=limit=0.84:attack=3:release=60:level=disabled', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).copy()
mix *= 10 ** ((-14 - meter.integrated_loudness(mix)) / 20)
mix = np.clip(mix, -0.84, 0.84)
for k, v in dict(master=mix, stem_bed=bed, stem_sfx=sfx, stem_room=room).items():
    sf.write(f'{OUT}/{k}.wav', v if k != 'master' else v, SR, subtype='FLOAT')
if seg:
    a, b = int(seg[0] * SR), int(seg[1] * SR); sf.write(f'{OUT}/master_seg_{seg[0]:.0f}_{seg[1]:.0f}.wav', mix[a:b], SR, subtype='FLOAT')
print('LUFS in %.1f -> -14, peak %.1f dBFS' % (lufs, 20 * np.log10(np.abs(mix).max())))
