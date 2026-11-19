# mix_v7.py · SFX v7 dari event visual rencana v7 (burn di flash, slam+riser di R3, whoosh di R6, tick di R2); mesin mix sama dengan mix.py v6.
# asal: mix.py · daftar cue SFX (§5.3 + tambahan keputusan Irfan 19 Nov: whoosh transisi/zoom, tick hero R6, riser sebelum slam)
# → stem_vo.wav (v6_suara dual-mono, sampel tidak diubah), stem_sfx.wav, stem_music.wav (hening, draf tanpa musik), mix.wav, cues.json.
# Pakai: ~/work/mg-venv/bin/python alat/mix_v7.py <outdir> [--musik]   (--musik: pakai <outdir>/musik_mentah.wav dari alat/musik.py; tanpa itu musik hening)
import json, os, sys, numpy as np, soundfile as sf

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARG = [a for a in sys.argv[1:] if not a.startswith('--')]
MUSIK = '--musik' in sys.argv
OUT = ARG[0] if ARG else f'{R}/kerja/mix'
os.makedirs(OUT, exist_ok=True)
SFX = os.path.expanduser('~/work/skill-development/Asset/audio/video-perkenalan-20261118')
EXTRA = f'{R}/kerja/sfx_extra'
SR, FPS, N = 48000, 30, 2006

meta = json.load(open(f'{SFX}/sfx_meta.json')) | json.load(open(f'{EXTRA}/sfx_meta_extra.json'))
PATH = {k: (f'{SFX}/sfx/{k}' if os.path.exists(f'{SFX}/sfx/{k}') else f'{EXTRA}/{k}') for k in meta}
DENGAR = {
    'film-burn.wav': 'kresek film terbakar, desis naik lalu pudar',
    'hantam-sub.wav': 'hantaman bass dalam dengan ekor sub panjang',
    'kamera-klik_negative.wav': 'klik rana kamera kering, pendek',
    'kardus-buka.wav': 'gesek kardus terbuka, tutup terlipat',
    'kardus-mendarat.wav': 'kardus jatuh ke lantai, buk tumpul',
    'kertas-polaroid.wav': 'kertas foto jatuh tipis',
    'kertas-sobek.wav': 'sobekan kertas cepat',
    'mouse-klik.wav': 'klik mouse ganda kecil',
    'ui-pop.wav': 'pop UI pendek bersih',
    'ui-tutup.wav': 'klik tutup UI lembut menurun',
    'whoosh-kamera.wav': 'desir udara cepat lewat kamera',
    'hantam-sub-hp.wav': 'hantaman bass dalam + saturasi tengah agar terdengar di speaker HP',
    'tick-hero.wav': 'blip digital sangat pendek, terang, di-low-pass',
    'riser-slam.wav': 'riser naik 0,8 dtk berakhir tajam',
}
GAIN = {'film-burn.wav': -6, 'hantam-sub.wav': -3, 'hantam-sub-hp.wav': -1, 'kamera-klik_negative.wav': -6, 'kardus-buka.wav': -6, 'kardus-mendarat.wav': -6,
        'kertas-polaroid.wav': -6, 'kertas-sobek.wav': -6, 'mouse-klik.wav': -4, 'ui-pop.wav': -8, 'ui-tutup.wav': -8,
        'whoosh-kamera.wav': -7, 'tick-hero.wav': -8, 'riser-slam.wav': -8}

# v7: cue diturunkan dari event visual rencana v7 (remotion/src/v7/rencana.json), bukan tabel tangan v6.
RC = json.load(open(f'{R}/remotion/src/v7/rencana.json'))
FLASH = [0, 308, 399, 595, 772, 914, 1072, 1305, 1485, 1574, 1790, 1843]   # = FLASH di V7.tsx
D = [(max(f, 5), 'film-burn', 'flash light-leak di sambungan' + (' (pembuka)' if f == 0 else '')) for f in FLASH]
for bl in RC['blok']:
    for r in bl['baris']:
        f1 = r['kata'][0]['f']
        if r['gaya'] in ('r3', 'r3n'):
            D.append((f1 - 1, 'hantam-sub-hp', f"slam {r['teks'].upper()} mendarat"))
            D.append((f1 - 5, 'riser-slam', f"naik ke slam {r['teks'].upper()}"))
        elif r['gaya'] == 'r6':
            D.append((f1 + 1, 'whoosh-kamera', f"depth push {r['teks'].upper()} + kamera 1,22"))
        elif r['gaya'] == 'r2':
            D.append((f1 + 4, 'tick-hero', f"kata kunci {r['teks']} mendarat"))
# jarak: buang tick/riser yang < 6 f dari cue lain (slam/burn menang), whoosh ≥ 1 dtk
PRIO = {'hantam-sub-hp': 0, 'film-burn': 1, 'whoosh-kamera': 2, 'riser-slam': 3, 'tick-hero': 4}
D.sort(key=lambda c: (PRIO[c[1]], c[0]))
pilih = []
for f, n, al in D:
    if f < 0 or f >= N: continue
    if any(abs(f - g) < 4 for g, _, _ in pilih) and n in ('tick-hero', 'riser-slam'): continue
    pilih.append((f, n, al))
D = [(f, n, n, al) for f, n, al in pilih]
T = []
# satu peran satu file (gerbang sfx_density)
PERAN = {'film-burn': 'transisi', 'whoosh-kamera': 'hero', 'hantam-sub-hp': 'slam', 'tick-hero': 'kunci', 'riser-slam': 'riser'}
cues = sorted([dict(f=f, t=round(f / FPS, 3), file=n + '.wav', peran=PERAN[n], alasan=a, dengar=DENGAR[n + '.wav'], gain_db=GAIN[n + '.wav']) for f, n, p, a in D + T], key=lambda c: c['f'])

# koreksi gain per cue dari audio_phone.py --fix (speaker HP), kunci 't|peran'
FIX = json.load(open(f'{OUT}/cue_gain.json')) if os.path.exists(f'{OUT}/cue_gain.json') else {}
for c in cues:
    c['gain_db'] = round(c['gain_db'] + FIX.get(f"{c['t']:.4f}|{c['peran']}", 0), 1)
L = int(round(N / FPS * SR))
vo, sr = sf.read(f'{R}/sumber/v6_suara.wav', dtype='float64')
assert sr == SR
vo = vo[:L] if vo.ndim == 1 else vo[:L, 0]
vo = np.pad(vo, (0, L - len(vo)))
stem_vo = np.stack([vo, vo], 1)
sfx = np.zeros((L, 2))
music = sf.read(f'{OUT}/musik_mentah.wav', dtype='float64')[0][:L] if MUSIK else np.zeros((L, 2))
assert music.shape == (L, 2)
for c in cues:
    x, s2 = sf.read(PATH[c['file']], dtype='float64', always_2d=True)
    assert s2 == SR
    if x.shape[1] == 1: x = np.repeat(x, 2, 1)
    x = x * 10 ** (c['gain_db'] / 20)
    a = int(round(c['t'] * SR)) - int(meta[c['file']]['puncak_ms'] * SR / 1000)
    if a < 0:  # awal terpotong (film-burn pembuka): fade-in 10 ms
        x = x[-a:].copy(); fi = int(0.01 * SR); x[:fi] *= np.linspace(0, 1, fi)[:, None]; a = 0
    b = min(L, a + len(x)); x = x[:b - a]
    # jaga puncak −1 dBFS per cue: hanya cue ini yang diturunkan, suara tetap (musik mengalah sesudahnya, lihat bawah)
    k = 1.0
    while np.abs(stem_vo[a:b] + sfx[a:b] + x * k).max() > 10 ** (-1 / 20) and k > 0.2: k *= 0.95
    if k < 1: c['gain_db'] = round(c['gain_db'] + 20 * np.log10(k), 1); print('cue', c['f'], c['file'], 'turun', round(20 * np.log10(k), 1), 'dB')
    sfx[a:b] += x * k
# loop: ekor SFX di ujung video di-fade 20 ms agar tidak klik saat kembali ke f0 (suara tidak disentuh)
fo = int(0.02 * SR); sfx[-fo:] *= np.linspace(1, 0, fo)[:, None]
# musik tidak boleh mendorong puncak melewati max(−1 dBFS, puncak suara+SFX): musik saja yang diturunkan lokal (blok 10 ms, lepas halus)
if MUSIK:
    lim, blk = 10 ** (-1 / 20), SR // 100
    base = stem_vo + sfx
    g = np.ones(L // blk + 1)
    for i in range(len(g)):
        sl = slice(i * blk, min(L, (i + 1) * blk))
        if sl.start >= L: break
        cap = max(lim, np.abs(base[sl]).max())
        k = 1.0
        while np.abs(base[sl] + music[sl] * k).max() > cap and k > 0.05: k *= 0.9
        g[i] = k
    g = np.minimum(g, np.r_[g[1:], 1])  # turun 10 ms lebih awal
    for i in range(1, len(g)): g[i] = min(g[i], g[i - 1] + 0.05)  # lepas ±0,2 dtk
    gs = np.repeat(g, blk)[:L]
    if (g < 1).any(): print('blok:', sorted({int(i * blk / SR * FPS) for i in np.where(g < 0.7)[0]}))
    if (g < 1).any(): print('musik diturunkan lokal di', int((g < 1).sum()), 'blok 10 ms, terdalam', round(20 * np.log10(g.min()), 1), 'dB')
    music = music * gs[:, None]
mix = stem_vo + sfx + music
sf.write(f'{OUT}/stem_music.wav', music, SR, subtype='PCM_24')
for n, a in [('stem_vo', stem_vo), ('stem_sfx', sfx), ('mix', mix)]:
    sf.write(f'{OUT}/{n}.wav', a, SR, subtype='PCM_24')
json.dump(cues, open(f'{OUT}/cues.json', 'w'), indent=1, ensure_ascii=False)
print(len(cues), 'cue,', round(len(cues) / (N / FPS), 2), 'cue/dtk; puncak mix', round(20 * np.log10(np.abs(mix).max()), 2), 'dBFS')
