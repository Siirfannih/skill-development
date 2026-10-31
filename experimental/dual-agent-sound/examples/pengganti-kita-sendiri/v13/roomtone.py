"""Room tone jembatan antar pembicara (Irfan 31 Okt 20:19: «saat perpindahan pembicara masih ada jeda yang kurang smooth … pastikan semuanya nyambung tanpa gap»).
Setiap klip eksternal (berita, Jensen, Altman) membawa ambience ruangannya sendiri; saat dipotong, ambience ikut hilang → terdengar «putus».
Di sini: ambil jendela paling hening (tapi tidak digital-silence) dari sumber klip itu sendiri, loop dengan crossfade, taruh di bawah klip
dan perpanjang ke celah sebelum/sesudahnya. Antar dua klip berita: pindah sumber di tengah celah dengan crossfade 60 ms.
Level = level asli relatif terhadap ucapan di klip (gain yang sama dengan normalisasi blok)."""
import json, subprocess, numpy as np

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
    a = ['ffmpeg', '-v', 'error', '-i', p, '-af', 'highpass=f=120,lowpass=f=9000', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(a, capture_output=True).stdout, np.float32).copy()

def _tone(name):
    """Loop room tone (1 dtk dasar) dan rasio level tone/ucapan dari sumber."""
    p, (a, b) = NEWS_SRC[name]
    x = _load(p)
    seg = x[int(a * SR):int(b * SR)]
    w = int(0.25 * SR); h = int(0.05 * SR)
    r = np.array([np.sqrt(np.mean(seg[i:i + w] ** 2)) for i in range(0, len(seg) - w, h)])
    speech = np.sqrt(np.mean(seg[np.abs(seg) > 0.02] ** 2)) if np.any(np.abs(seg) > 0.02) else r.max()
    ok = np.where(r > speech * 10 ** (-60 / 20))[0]       # buang digital silence
    k = ok[np.argmin(r[ok])] if len(ok) else int(np.argmin(r))
    base = seg[k * h:k * h + w].copy()
    # perpanjang jendela dengan crossfade bolak-balik supaya tidak berdengung periodik
    xf = int(0.08 * SR)
    loop = base
    while len(loop) < 3 * SR:
        nxt = base[::-1] if (len(loop) // len(base)) % 2 else base
        ww = np.linspace(0, 1, xf)
        loop = np.concatenate([loop[:-xf], loop[-xf:] * (1 - ww) + nxt[:xf] * ww, nxt[xf:]])
    return loop, float(np.sqrt(np.mean(base ** 2)) / max(speech, 1e-9))

def _fill(n, tone, i0, i1):
    out = np.zeros(n, np.float32)
    i0 = max(0, i0); i1 = min(n, i1)
    L = i1 - i0
    if L <= 0: return out
    reps = int(np.ceil(L / len(tone))) + 1
    out[i0:i1] = np.tile(tone, reps)[:L]
    return out

def add_roomtone(dia, T, vo_rms_ref):
    """dia: stem dialog (mono, sudah dinormalisasi). Mengembalikan dia + room tone dan daftar wilayah yang diisi."""
    n = len(dia); t2i = lambda s: int(round(s * SR))
    B = [b for b in T['blocks'] if b.get('name') in NEWS_SRC]
    B.sort(key=lambda b: b['t'])
    layer = np.zeros(n, np.float32); log = []
    for j, b in enumerate(B):
        tone, ratio = _tone(b['name'])
        i0, i1 = t2i(b['t']), t2i(b['t'] + b['dur'])
        blk = dia[i0:i1]
        sp = np.sqrt(np.mean(blk[np.abs(blk) > vo_rms_ref * 0.1] ** 2)) if np.any(np.abs(blk) > vo_rms_ref * 0.1) else vo_rms_ref
        boost = {'jensen': 10 ** (12 / 20)}.get(b['name'], 1.0)   # ambience Milken sangat tipis (−36 dB) → diangkat ke ±−24 dB supaya jeda tidak mati
        tone = tone / max(np.sqrt(np.mean(tone ** 2)), 1e-9) * sp * ratio * boost
        prev = B[j - 1] if j else None; nxt = B[j + 1] if j + 1 < len(B) else None
        news = b['name'].startswith('news_')
        # batas kiri: tengah celah dengan klip berita sebelumnya; selain itu mulai 0,6 dtk sebelum klip (isi jeda panjang)
        if news and prev is not None and prev['name'].startswith('news_'):
            s0 = (prev['t'] + prev['dur'] + b['t']) / 2
        else:
            s0 = b['t'] - (0.05 if b['t'] < 0.2 else {'jensen': 1.0, 'altman': 1.05}.get(b['name'], 0.6))
        if news and nxt is not None and nxt['name'].startswith('news_'):
            s1 = (b['t'] + b['dur'] + nxt['t']) / 2
        else:
            s1 = b['t'] + b['dur'] + (0.30 if news else {'jensen': 0.65, 'altman': 0.7}.get(b['name'], 0.45))
        seg = _fill(n, tone, t2i(s0), t2i(s1))
        # fade: 60 ms di sambungan antar berita; 0,35 dtk masuk/keluar di jeda panjang (masuk pelan, keluar menyatu ke narator)
        fin = t2i(0.06) if (news and prev is not None and prev['name'].startswith('news_')) else t2i(0.35)
        fout = t2i(0.06) if (news and nxt is not None and nxt['name'].startswith('news_')) else t2i(0.35)
        a0, a1 = max(0, t2i(s0)), min(n, t2i(s1))
        if a1 - a0 > fin + fout:
            seg[a0:a0 + fin] *= np.linspace(0, 1, fin); seg[a1 - fout:a1] *= np.linspace(1, 0, fout)
        layer += seg
        log.append(dict(name=b['name'], s0=round(s0, 3), s1=round(s1, 3), tone_db_vs_speech=round(20 * np.log10(ratio + 1e-9), 1)))
    return dia + layer, log
