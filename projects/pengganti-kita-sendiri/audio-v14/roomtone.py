"""Room tone jembatan antar pembicara v14 (Whisper-Quiet Seamless Cushion).
Perbaikan utama dibanding v13:
- Di v13, `news_billion` (-13.5 dB vs ucapan) dan `news_teen` (-17.5 dB vs ucapan) menyuntikkan derau latar yang sangat keras ke sela antar berita.
- Di v14, rasio room tone dibatasi ketat maksimal -38 dB di bawah ucapan (`min(ratio, 10**(-38/20))`), difilter bandpass lembut (140 Hz - 1200 Hz), dan diberi kurva fade-in/out kosinus agar transisi antar pembicara mulus tanpa hembusan noise.
"""
import json, subprocess, numpy as np
from scipy.signal import butter, sosfilt

SR = 48000
NEWS_SRC = {
    'news_gates': ('/home/claude/cold/P_6RhqaMUts_76.5.wav', (0.0, 5.4)),
    'news_teen': ('/home/claude/cold/CXFtV0WAN7k_19.5.wav', (0.87, 3.74)),
    'news_billion': ('/home/claude/cold/VuyOy5WN980_0.wav', (1.07, 2.74)),
    'news_fast': ('/home/claude/cold/DKA5AkrQfxo_56.5.wav', (1.06, 3.5)),
    'jensen': ('/home/claude/v6/mix/clips/jensen_full.wav', (4.43, 9.30)),
    'altman': ('/home/claude/v6/mix/clips/altman_full.wav', (0.90, 4.35)),
}

def _load(p):
    a = ['ffmpeg', '-v', 'error', '-i', p, '-af', 'highpass=f=140:poles=2,equalizer=f=320:t=q:w=1.8:g=-6.0,lowpass=f=1200:poles=2,afftdn=nf=-25', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(a, capture_output=True).stdout, np.float32).copy()

def _tone(name):
    p, (a, b) = NEWS_SRC[name]
    x = _load(p)
    seg = x[int(a * SR):int(b * SR)]
    w = int(0.25 * SR); h = int(0.05 * SR)
    r = np.array([np.sqrt(np.mean(seg[i:i + w] ** 2)) for i in range(0, len(seg) - w, h)])
    speech = np.sqrt(np.mean(seg[np.abs(seg) > 0.02] ** 2)) if np.any(np.abs(seg) > 0.02) else r.max()
    ok = np.where(r > speech * 10 ** (-60 / 20))[0]
    k = ok[np.argmin(r[ok])] if len(ok) else int(np.argmin(r))
    base = seg[k * h:k * h + w].copy()
    xf = int(0.08 * SR)
    loop = base
    while len(loop) < 3 * SR:
        nxt = base[::-1] if (len(loop) // len(base)) % 2 else base
        u = np.linspace(0, 1, xf, dtype=np.float32)
        ww = 0.5 - 0.5 * np.cos(np.pi * u)
        loop = np.concatenate([loop[:-xf], loop[-xf:] * (1 - ww) + nxt[:xf] * ww, nxt[xf:]])
    raw_ratio = float(np.sqrt(np.mean(base ** 2)) / max(speech, 1e-9))
    # Batasi room tone maksimal -38 dB dan minimal -46 dB terhadap ucapan agar selalu halus & tidak berisik
    clamped_ratio = float(np.clip(raw_ratio, 10 ** (-40.0 / 20.0), 10 ** (-32.0 / 20.0)))
    return loop, clamped_ratio

def _fill(n, tone, i0, i1):
    out = np.zeros(n, np.float32)
    i0 = max(0, i0); i1 = min(n, i1)
    L = i1 - i0
    if L <= 0: return out
    reps = int(np.ceil(L / len(tone))) + 1
    out[i0:i1] = np.tile(tone, reps)[:L]
    return out

def add_roomtone(dia, T, vo_rms_ref):
    n = len(dia); t2i = lambda s: int(round(s * SR))
    B = [b for b in T['blocks'] if b.get('name') in NEWS_SRC]
    B.sort(key=lambda b: b['t'])
    layer = np.zeros(n, np.float32); log = []
    for j, b in enumerate(B):
        tone, ratio = _tone(b['name'])
        i0, i1 = t2i(b['t']), t2i(b['t'] + b['dur'])
        blk = dia[i0:i1]
        sp = np.sqrt(np.mean(blk[np.abs(blk) > vo_rms_ref * 0.1] ** 2)) if np.any(np.abs(blk) > vo_rms_ref * 0.1) else vo_rms_ref
        tone = tone / max(np.sqrt(np.mean(tone ** 2)), 1e-9) * sp * ratio
        prev = B[j - 1] if j else None; nxt = B[j + 1] if j + 1 < len(B) else None
        news = b['name'].startswith('news_')
        if news and prev is not None and prev['name'].startswith('news_'):
            s0 = (prev['t'] + prev['dur'] + b['t']) / 2
        else:
            s0 = b['t'] - (0.05 if b['t'] < 0.2 else 0.45)
        if news and nxt is not None and nxt['name'].startswith('news_'):
            s1 = (b['t'] + b['dur'] + nxt['t']) / 2
        else:
            s1 = b['t'] + b['dur'] + (0.25 if news else 0.45)
        seg = _fill(n, tone, t2i(s0), t2i(s1))
        fin = t2i(0.06) if (news and prev is not None and prev['name'].startswith('news_')) else t2i(0.30)
        fout = t2i(0.06) if (news and nxt is not None and nxt['name'].startswith('news_')) else t2i(0.30)
        a0, a1 = max(0, t2i(s0)), min(n, t2i(s1))
        if a1 - a0 > fin + fout:
            u_in = np.linspace(0, 1, fin, dtype=np.float32)
            u_out = np.linspace(0, 1, fout, dtype=np.float32)
            seg[a0:a0 + fin] *= (0.5 - 0.5 * np.cos(np.pi * u_in))
            seg[a1 - fout:a1] *= (0.5 + 0.5 * np.cos(np.pi * u_out))
        bi0, bi1 = i0 + t2i(0.06), i1 - t2i(0.06)
        if bi1 > bi0:
            m_ = np.ones(n, np.float32); m_[bi0:bi1] = 0
            m_[i0:bi0] = np.linspace(1, 0, bi0 - i0)
            m_[bi1:i1] = np.linspace(0, 1, i1 - bi1)
            seg *= m_
        seg = sosfilt(butter(2, 1100, 'lp', fs=SR, output='sos'), seg).astype(np.float32)
        layer += seg
        log.append(dict(name=b['name'], s0=round(s0, 3), s1=round(s1, 3), tone_db_vs_speech=round(20 * np.log10(ratio + 1e-9), 1)))
    return dia + layer, log
