"""Ukuran pendukung (bukan pengganti telinga): rasio VO:musik per bagian, versi speaker HP
(HP 300 Hz + LP 12 kHz, volume 20/50/100 % = -14/-6/0 dB terhadap ambang dengar kasar), dan
margin tiap SFX terhadap VO+musik di 120 ms sekitarnya."""
import sys, json, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt
v = sys.argv[1]; W = '/home/claude/pks/v20/work'
vo, sr = sf.read(f'{W}/v{v}_vo.wav'); mu, _ = sf.read(f'{W}/v{v}_music.wav'); fx, _ = sf.read(f'{W}/v{v}_sfx.wav')
def phone(x): 
    x = sosfilt(butter(2, 300, 'hp', fs=sr, output='sos'), x, axis=0)
    return sosfilt(butter(4, 12000, 'lp', fs=sr, output='sos'), x, axis=0)
def lev(x, a, b): s = x[int(a*sr):int(b*sr)]; return 10*np.log10((s**2).mean()+1e-12)
secs = [(0,10.3,'cold open'),(10.3,19.5,'sadar'),(19.5,32,'janji'),(32,50,'kerja'),(50,56,'tempat kita'),(56,61,'jensen'),
        (61,71,'nggak peduli'),(71,75,'altman'),(75,96.3,'satu sukses'),(96.3,103.5,'susah'),(103.5,126,'merencanakan'),(126,129.7,'peran'),(129.7,132.8,'outro')]
pv, pm = phone(vo), phone(mu)
print('bagian            VO-musik dB (full | HP)')
for a,b,n in secs:
    print(f'{n:16s} {lev(vo,a,b)-lev(mu,a,b):6.1f} | {lev(pv,a,b)-lev(pm,a,b):6.1f}')
ev = json.load(open(f'{W}/events_v{v}.json'))
pf = phone(fx); bgd = pv + pm
def _r10(x, a, b):
    s = x[int(a*sr):int(b*sr)].mean(1); w = int(0.01*sr); n = len(s)//w
    return 10*np.log10((s[:n*w].reshape(n, w)**2).mean(1)+1e-12)
pk10 = lambda x, a, b: _r10(x, a, b).max()
med10 = lambda x, a, b: np.median(_r10(x, a, b))
low = []
for e in ev:
    t = e['t']; m = pk10(pf, t-0.01, t+0.15) - med10(bgd, t-0.01, t+0.15)
    e['margin'] = round(m, 1)
    if m < -3: low.append((round(t,2), e['fam'], e['ev'][:30], round(m,1)))
fams = {}
for e in ev: fams.setdefault(e['fam'], []).append(e['margin'])
print('margin SFX vs VO+musik di HP (median, min) per keluarga:')
for f, ms in sorted(fams.items()): print(f'  {f:9s} n={len(ms):3d} med {np.median(ms):6.1f}  min {min(ms):6.1f}')
print('tenggelam (< -3 dB):', low[:40])
