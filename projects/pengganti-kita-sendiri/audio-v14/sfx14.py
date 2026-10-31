"""Renderer SFX v14. Satu cue = satu bunyi. Pita per keluarga = The Gap v17 (tools/audio_build.py `shape`), tanpa saturasi.
Puncak bunyi didaratkan TEPAT di frame event (align peak), kecuali riser (berakhir di cut) dan ketikan (mulai di huruf pertama)."""
import subprocess, numpy as np
from scipy.signal import butter, sosfilt
SR = 48000
t2i = lambda s: int(round(s * SR)); db2 = lambda g: 10 ** (g / 20)
_cache = {}
def load(p):
    if p not in _cache:
        x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout, np.float32).astype(np.float64)
        a = np.abs(x); nz = np.where(a > a.max() * 0.03)[0]
        x = x[max(0, nz[0] - t2i(0.003)):nz[-1] + t2i(0.02)] if len(nz) else x   # buang hening depan/belakang
        _cache[p] = x
    return _cache[p].copy()
lp = lambda x, f, o=4: sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
hp = lambda x, f, o=2: sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
bp = lambda x, a, b, o=2: sosfilt(butter(o, [a, b], 'band', fs=SR, output='sos'), x)
def shape(x, fam):
    if fam == 'ui':
        y = lp(hp(x, 300), 8000); return y - 0.37 * bp(y, 2800, 4500)
    if fam == 'motion': return lp(hp(x, 400, 4), 2500)
    if fam == 'texture': return bp(x, 400, 2600, 4)
    if fam == 'low':
        y = lp(x, 2000); return y + 0.45 * bp(y, 150, 450) * (np.abs(y).max() / (np.abs(bp(y, 150, 450)).max() + 1e-9))
    return x

def typing_spans(C):
    """Ketikan: cue per kata digabung jadi satu rentang per kalimat yang diketik (gap < 0,8 dtk, tanpa klik di antaranya)."""
    T = [c for c in C if c['role'] == 'type']; other = [c['t'] for c in C if c['role'] == 'click']
    spans = []
    for c in T:
        if spans and c['t'] - spans[-1]['t1'] < 0.8 and not any(spans[-1]['t1'] < o < c['t'] for o in other):
            spans[-1]['t1'] = c['t']; spans[-1]['ids'].append(c['id'])
        else: spans.append(dict(c, t1=c['t'], ids=[c['id']]))
    for s in spans: s['dur'] = round(s['t1'] - s['t'] + 0.38, 3)
    return spans

def render_sfx(C, N, dia, master_comp=0.0):
    sfx = np.zeros((N, 2)); placed = []
    # VO aktif → SFX −3 dB (The Gap v17); slam/impact tidak
    fr = t2i(0.02); e = np.array([np.sqrt(np.mean(dia[i:i + fr] ** 2)) for i in range(0, N, fr)]); vr = np.sqrt(np.mean(dia[np.abs(dia) > 0.01] ** 2))
    von = np.repeat((e > vr * db2(-20)).astype(float), fr)[:N]; von = np.convolve(von, np.ones(t2i(0.06)) / t2i(0.06), 'same')
    vduck = db2(-3 * np.clip(von, 0, 1))
    cues = [c for c in C if c['role'] != 'type'] + typing_spans(C)
    pan_i = 0
    for q in sorted(cues, key=lambda c: c['t']):
        x = load(q['file'])
        if q['role'] == 'type':
            n = t2i(q['dur']); off = t2i(0.5 + (hash(q['id']) % 120) / 10.0)   # potongan berbeda tiap kalimat dari rekaman 21 dtk
            x = x[off:off + n]; f_ = min(t2i(0.04), len(x) // 4); x[:f_] *= np.linspace(0, 1, f_); x[-f_:] *= np.linspace(1, 0, f_)
        if q['role'] == 'impact': x = x[:t2i(0.9)]
        x = shape(x, q['fam'])
        f_o = min(t2i(0.25 if q['role'] == 'impact' else 0.03), len(x) // 3); x[-f_o:] *= np.linspace(1, 0, f_o)
        x *= db2(q['peak_dbfs'] - master_comp) / max(np.abs(x).max(), 1e-9)
        if q['role'] == 'riser': start = q['t'] - len(x) / SR
        elif q['role'] == 'type': start = q['t']
        else:
            env = np.abs(lp(x, 2000)) if q['fam'] in ('motion', 'low') else np.abs(x)
            pk = int(np.argmax(env > 0.7 * env.max())); start = q['t'] - pk / SR
        i0 = t2i(start); j0 = max(0, i0); x = x[j0 - i0:]; n = min(len(x), N - j0)
        if n <= 0: continue
        g = x[:n] * (vduck[j0:j0 + n] if q['role'] not in ('slam', 'impact') else 1.0)
        if q['fam'] in ('low',) or q['role'] == 'type': pan = 0.0
        else: pan_i += 1; pan = 0.22 if pan_i % 2 else -0.22
        gl, gr = np.cos((pan + 1) * np.pi / 4) * 1.414, np.sin((pan + 1) * np.pi / 4) * 1.414
        sfx[j0:j0 + n, 0] += g * gl; sfx[j0:j0 + n, 1] += g * gr
        placed.append(dict(id=q['id'], role=q['role'], **{'class': q['role']}, t=q['t'], start=round(start, 3), file=q['file'].split('/')[-1],
                           peak_dbfs=q['peak_dbfs'], visual=q['visual'], why=q['why'], panel=q.get('panel'), dur=q.get('dur')))
    return sfx, placed
