"""VO & Dialog Assembler v14 (Apple Keynote / Documentary Crisp & Natural Edition).
Perbaikan utama dibanding v12/v13:
1. EQ Narator VO Jernih & Renyah: Menghapus scoop -4.5 dB @ 300 Hz dan roll-off gelap -2 dB @ 7.5 kHz yang sebelumnya membuat suara VO tipis dan mendem. Diganti dengan Apple Keynote Vocal Chain (HPF 80 Hz, +1.0 dB @ 135 Hz chest warmth, -1.8 dB @ 275 Hz narrow mud cut, +1.8 dB @ 3.8 kHz presence, +1.5 dB @ 9.5 kHz silky air).
2. Zero Clipped Syllables (Tanpa Mengubah Timeline): Memperpanjang ekor alami setiap kata narator hingga +80 ms ke dalam celah jeda (dikompensasi dari durasi nol `g`) dengan kurva fade-out raised-cosine yang mulus, sehingga panjang segmen dan seluruh timestamp `timeline.json` tetap 100% identik dengan frame video.
3. Klip Berita & Narasumber (Bill Gates, Sky, Bloomberg, Jensen, Altman) Bebas Gema & Tanpa Patahan:
   - Mengganti kompresor agresif (ratio 3.5, release 80ms yang mengangkat pantulan ruangan) dengan kompresor halus (ratio 2.2, release 220ms) + soft noise reduction & multi-notch anti-boxy (260 Hz & 420 Hz).
   - Menghilangkan jeda mati 30ms di potongan internal pembicara berita yang sama dengan crossfade kosinus halus.
   - Memperpanjang handle J-cut (min 55 ms) dan L-cut (min 180 ms) dengan kurva raised-cosine agar tidak pernah terdengar putus mendadak.
"""
import json, subprocess, numpy as np, soundfile as sf, re, os

SR = 48000
PICK = {'1': 2, '2': 2, '3': 2, '4': 3, '5': 1, '6': 3}
CLAUSE, LIST, SENT = 0.12, 0.05, 0.30
LISTW = {('3', 'berpikir,'), ('3', 'menulis,'), ('5', 'sama,'), ('5', 'founder,'), ('6', 'membangun,'), ('6', 'merencanakan,')}
norm = lambda s: s.lower()

def rcos_in(n):
    if n <= 0: return np.ones(0, dtype=np.float32)
    u = np.linspace(0, 1, n, dtype=np.float32)
    return 0.5 - 0.5 * np.cos(np.pi * u)

def rcos_out(n):
    if n <= 0: return np.ones(0, dtype=np.float32)
    u = np.linspace(0, 1, n, dtype=np.float32)
    return 0.5 + 0.5 * np.cos(np.pi * u)

def load_det(p):
    # Sinyal deteksi batas kata tetap identik dengan v11/v12 agar timeline.json 100% terkunci ke frame video
    a = ['ffmpeg', '-v', 'error', '-i', p, '-af', 'highpass=f=80,equalizer=f=160:t=q:w=1:g=1.5,treble=g=-2.5:f=7500', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(a, capture_output=True).stdout, np.float32).copy()

def load(p):
    # v14 Apple Keynote Crisp & Warm Vocal Chain (jernih, renyah, tanpa gema, body vokal utuh)
    af = (
        'highpass=f=80:poles=2,'
        'equalizer=f=135:t=q:w=1.4:g=1.0,'
        'equalizer=f=275:t=q:w=2.4:g=-1.8,'
        'equalizer=f=3800:t=q:w=1.5:g=1.8,'
        'treble=g=1.5:f=9200'
    )
    a = ['ffmpeg', '-v', 'error', '-i', p, '-af', af, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(a, capture_output=True).stdout, np.float32).copy()

def env_db(x):
    h = int(0.005 * SR); n = len(x) // h
    return 20 * np.log10(np.sqrt((x[:n * h].reshape(n, h) ** 2).mean(1)) + 1e-9), h

def onset(x, t, ref):
    e, h = env_db(x); i = int(t * SR / h); lo = max(0, i - int(0.3 * SR / h))
    while i > lo and e[i] > ref - 40: i -= 1
    return i * h / SR

def offset(x, t, ref):
    e, h = env_db(x); i = int(t * SR / h); hi = min(len(e) - 1, i + int(0.35 * SR / h))
    while i < hi and e[i] > ref - 40: i += 1
    return i * h / SR

def scene(k):
    n = f's{k}_t{PICK[k]}'; xo = load(f'raw/{n}.mp3'); x = load_det(f'raw/{n}.mp3')
    W = [w for w in json.load(open(f'stt/{n}.json'))['words'] if w['type'] == 'word']
    ref = 20 * np.log10(np.sqrt(np.mean(x[np.abs(x) > 0.01] ** 2)) + 1e-9)
    cuts = []
    for i in range(len(W) - 1):
        a, b = W[i], W[i + 1]; t_end = offset(x, a['end'], ref); t_on = onset(x, b['start'], ref)
        if t_on - t_end < 0.03: continue
        tok = a['text']
        tgt = SENT if tok[-1] in '.?' else (LIST if (k, norm(tok)) in LISTW else CLAUSE)
        if k == '6' and norm(b['text']) == 'jadi': tgt = 1.0
        cuts.append((t_end, t_on, tgt))
    s0 = onset(x, W[0]['start'], ref) - 0.10; y = []; pos = max(0, s0); words = []; tt = 0.0
    for (te, to, tgt) in cuts + [(offset(x, W[-1]['end'], ref) + 0.06, None, 0)]:
        base_end_idx = int((te + 0.03) * SR)
        pos_idx = int(pos * SR)
        base_len = max(0, base_end_idx - pos_idx)
        for w in W:
            if pos <= w['start'] < te + 0.03:
                words.append(dict(w=w['text'], s=round(tt + w['start'] - pos, 3), e=round(tt + w['end'] - pos, 3), src=f's{k}'))
        if to is None:
            seg = xo[pos_idx:base_end_idx].copy()
            fi = min(int(0.045 * SR), len(seg) // 3); seg[:fi] *= rcos_in(fi)
            fo = min(int(0.075 * SR), len(seg) // 3); seg[-fo:] *= rcos_out(fo)
            y.append(seg); tt += len(seg) / SR
            break
        g_samples = int(max(0.0, tgt - 0.13) * SR)
        # Ambil ekor alami tambahan hingga 70ms dari rekaman asli (dikompensasi dari g_samples agar durasi total identik 100%)
        extra = min(g_samples, int(0.070 * SR), max(0, len(xo) - base_end_idx))
        seg = xo[pos_idx:base_end_idx + extra].copy()
        fi = min(int(0.045 * SR), len(seg) // 3); seg[:fi] *= rcos_in(fi)
        fo = min(int(0.070 * SR) + extra // 2, len(seg) // 2); seg[-fo:] *= rcos_out(fo)
        rem_pad = max(0, (base_len + g_samples) - len(seg))
        y.append(seg)
        if rem_pad > 0:
            y.append(np.zeros(rem_pad, dtype=np.float32))
        tt += (base_len + g_samples) / SR
        pos = to - 0.10
    return np.concatenate(y), words, n

ND = '/home/claude/cold/'
NEWS = {
    'gates': (ND + 'P_6RhqaMUts_76.5.wav', [(0.00, 1.34), (2.42, 3.42), (4.34, 5.40)], 'CNBC — Bill Gates: "AI is the biggest technical thing ever in my lifetime"', 'https://youtu.be/P_6RhqaMUts?t=77'),
    'teen': (ND + 'CXFtV0WAN7k_19.5.wav', [(0.87, 1.63), (2.09, 3.74)], 'Sky News — "16-year-old … launched a new AI company"', 'https://youtu.be/CXFtV0WAN7k?t=20'),
    'billion': (ND + 'VuyOy5WN980_0.wav', [(1.07, 2.74)], 'Bloomberg — "raised over a billion dollars"', 'https://youtu.be/VuyOy5WN980?t=1'),
    'fast': (ND + 'DKA5AkrQfxo_56.5.wav', [(1.06, 1.70), (2.24, 3.50)], 'Sky News — "This time, progress was so fast"', 'https://youtu.be/DKA5AkrQfxo?t=57'),
}

# Rantai pembersih klip berita & narasumber v14: mono, HPF 115 Hz, anti-boxy dual notch (250 Hz & 360 Hz), presence 3.3 kHz, soft denoise, dan kompresor lambat yang TIDAK mengangkat gema ruangan
# v15 (1 Nov, Irfan: suara berita "mendem/keteken"): rantai lama memotong body (notch 240/350/680 Hz), LPF 10 kHz dan afftdn
# membuat sumber yang sudah sempit (Gates rolloff 3,3 kHz) makin mendem. Rantai baru: hanya HPF, sedikit anti-boxy, presence +
# kilau untuk mengembalikan kejelasan, kompresor ringan. Tanpa denoise, tanpa LPF.
M1 = (
    'pan=mono|c0=0.5*c0+0.5*c1,'
    'highpass=f=90:poles=2,'
    'equalizer=f=320:t=q:w=1.6:g=-1.5,'
    'equalizer=f=2800:t=q:w=1.2:g=3.0,'
    'highshelf=f=5000:g=4.0,'
    'acompressor=threshold=-20dB:ratio=2.0:attack=10:release=180:makeup=2dB'
)

def m1load(wav):
    return np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', wav, '-af', M1, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout, np.float32).copy()

PRE, POST = 0.133, 0.280
def handles(x, W, s, e):
    pw = [w['end'] for w in W if w['end'] <= s + 0.005]
    nw = [w['start'] for w in W if w['start'] >= e - 0.005]
    pre = max(0.055, min(PRE, s - (max(pw) if pw else 0.0) - 0.015))
    post = max(0.180, min(POST, (min(nw) if nw else 9e9) - e - 0.015))
    hp = x[max(0, int((s - pre) * SR)):int(s * SR)].copy()
    hq = x[int(e * SR):int((e + post) * SR)].copy()
    if len(hp): hp *= rcos_in(len(hp))
    if len(hq): hq *= rcos_out(len(hq))
    return hp, hq

def news(nm):
    wav, spans, lab, url = NEWS[nm]
    x = m1load(wav)
    W = [w for w in json.load(open(wav[:-4] + '.json'))['words'] if w['type'] == 'word']
    y = []; words = []; tt = 0.0; H = []
    gap_len = int(0.03 * SR)
    for idx, (s, e) in enumerate(spans):
        seg = x[int(s * SR):int(e * SR)].copy()
        hp, hq = handles(x, W, s, e)
        fi = min(int(0.025 * SR), len(seg) // 4); seg[:fi] *= rcos_in(fi)
        fo = min(int(0.050 * SR), len(seg) // 4); seg[-fo:] *= rcos_out(fo)
        H.append((tt + (0.03 if y else 0.0) - len(hp) / SR, hp))
        H.append((tt + (0.03 if y else 0.0) + len(seg) / SR, hq))
        for w in W:
            if s - 0.02 <= w['start'] < e:
                words.append(dict(w=w['text'], s=round(tt + max(0, w['start'] - s), 3), e=round(tt + min(e, w['end']) - s, 3), src='news_' + nm))
        if y:
            # Isi jeda internal 30ms dengan ekor halus dari segmen sebelumnya agar tidak terjadi drop ke digital zero
            bridge = x[int(e * SR):int(e * SR) + gap_len].copy()
            if len(bridge) < gap_len:
                bridge = np.pad(bridge, (0, gap_len - len(bridge)))
            bridge *= rcos_out(gap_len) * 0.35
            y.append(bridge); tt += 0.03
        y.append(seg); tt += len(seg) / SR
    return np.concatenate(y), words, lab, url, H

CLIP = {
    'jensen': ('/home/claude/v6/mix/clips/jensen_full.wav', '/home/claude/v6/mix/clips/jensen_full.json', 4.43, 9.30),
    'altman': ('/home/claude/v6/mix/clips/altman_full.wav', '/home/claude/v6/mix/clips/altman_full.json', 0.90, 4.35),
}

SEQ = [
    ('pad', 0.05, 'awal: suara berita langsung'), ('news', 'gates'), ('pad', 0.14, 'ganti sumber'), ('news', 'teen'),
    ('pad', 0.12, 'ganti sumber'), ('news', 'billion'), ('pad', 0.14, 'ganti sumber'), ('news', 'fast'),
    ('pad', 0.30, 'SEMALAM → hantaman → VO'), ('vo', '1'), ('pad', SENT, '01d→02a'), ('vo', '2'), ('pad', SENT, 'BABAK 1 → BABAK 2'),
    ('vo', '3'), ('pad', 0.9, 'jeda panjang 1: sebelum Jensen (boom + hening)'), ('clip', 'jensen'), ('pad', 0.40, 'sesudah Jensen'),
    ('vo', '4'), ('pad', 0.9, 'jeda panjang 2: sebelum Altman'), ('clip', 'altman'), ('pad', 0.6, 'jeda panjang 3: sesudah Altman'),
    ('vo', '5'), ('pad', SENT, '05h→06a'), ('vo', '6'), ('pad', 3.0, 'ekor 06g')
]

if __name__ == '__main__':
    out = []; words = []; blocks = []; t = 0.0; vo_rms = None; OV = []
    _y, _, _ = scene('1'); vo_rms_news = float(np.sqrt(np.mean(_y[np.abs(_y) > 0.01] ** 2)))   # v15: berita setara VO (dulu −1 dB)
    for it in SEQ:
        if it[0] == 'pad':
            out.append(np.zeros(int(it[1] * SR), dtype=np.float32))
            blocks.append(dict(kind='pad', t=round(t, 3), dur=it[1], label=it[2]))
            t += it[1]; continue
        if it[0] == 'vo':
            y, ww, n = scene(it[1])
            if vo_rms is None: vo_rms = float(np.sqrt(np.mean(y[np.abs(y) > 0.01] ** 2)))
            for w in ww: w['s'] = round(w['s'] + t, 3); w['e'] = round(w['e'] + t, 3)
            words += ww; blocks.append(dict(kind='vo', name=f's{it[1]}', take=n, t=round(t, 3), dur=round(len(y) / SR, 3)))
            out.append(y); t += len(y) / SR
        elif it[0] == 'news':
            y, ww, lab, url, H = news(it[1])
            _k = vo_rms_news / float(np.sqrt(np.mean(y[np.abs(y) > 0.01] ** 2)))
            y = y * _k; OV.extend([(t + r, h * _k) for r, h in H])
            for w in ww: w['s'] = round(w['s'] + t, 3); w['e'] = round(w['e'] + t, 3)
            words += ww; blocks.append(dict(kind='clip', name='news_' + it[1], label=lab, url=url, t=round(t, 3), dur=round(len(y) / SR, 3)))
            out.append(y); t += len(y) / SR
        else:
            nm = it[1]; wav, js, a, b = CLIP[nm]; x = m1load(wav)
            y = x[int(a * SR):int(b * SR)].astype(np.float32)
            CW = [w for w in json.load(open(js))['words'] if w['type'] == 'word']
            hp, hq = handles(x, CW, a, b)
            _k = vo_rms * 10 ** (-1 / 20) / float(np.sqrt(np.mean(y[np.abs(y) > 0.01] ** 2)))
            y *= _k; hp = hp * _k; hq = hq * _k
            fi_ = min(int(0.035 * SR), len(y) // 4); y[:fi_] *= rcos_in(fi_)
            fo_ = min(int(0.065 * SR), len(y) // 4); y[-fo_:] *= rcos_out(fo_)
            OV.append((t - len(hp) / SR, hp)); OV.append((t + len(y) / SR, hq))
            for w in json.load(open(js))['words']:
                if w['type'] == 'word' and a <= w['start'] < b:
                    words.append(dict(w=w['text'], s=round(t + w['start'] - a, 3), e=round(t + w['end'] - a, 3), src=nm))
            blocks.append(dict(kind='clip', name=nm, t=round(t, 3), dur=round(len(y) / SR, 3)))
            out.append(y); t += len(y) / SR
    D = np.concatenate(out)
    for pos, h in OV:
        i0 = int(round(pos * SR)); j0 = max(0, i0); hh = h[j0 - i0:]; n = min(len(hh), len(D) - j0)
        if n > 0: D[j0:j0 + n] += hh[:n]
    out_dir = 'mix15d'
    json.dump([dict(t=round(p_, 3), dur=round(len(h) / SR, 3)) for p_, h in OV], open(os.path.join(out_dir, 'handles.json'), 'w'))
    sf.write(os.path.join(out_dir, 'stem_dialog.wav'), D, SR, subtype='FLOAT')
    json.dump(dict(total=round(t, 3), blocks=blocks, words=words), open(os.path.join(out_dir, 'timeline.json'), 'w'), indent=0, ensure_ascii=False)
    print('total %.2f dtk' % t)
    for b in blocks:
        if b['kind'] != 'pad': print(b)
