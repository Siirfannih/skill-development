# mix.py · daftar cue SFX (§5.3 + tambahan keputusan Irfan 19 Nov: whoosh transisi/zoom, tick hero R6, riser sebelum slam)
# → stem_vo.wav (v6_suara dual-mono, sampel tidak diubah), stem_sfx.wav, stem_music.wav (hening, draf tanpa musik), mix.wav, cues.json.
# Pakai: python3 alat/mix.py <outdir> [--musik]   (--musik: pakai <outdir>/musik_mentah.wav dari alat/musik.py; tanpa itu musik hening)
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

# (frame, file, peran, alasan) · frame = puncak file
D = [  # §5.3
    (5, 'film-burn', 'transisi', 'burn + flash pembuka'), (18, 'hantam-sub-hp', 'slam', 'ULANGI slam'),
    (84, 'whoosh-kamera', 'transisi', 'IRFAN carry ke kartu'), (90, 'ui-pop', 'ui', 'kartu arsip 1'), (100, 'ui-pop', 'ui', 'kartu arsip 2'), (109, 'ui-pop', 'ui', 'kartu arsip 3'),
    (192, 'kamera-klik_negative', 'negative', 'negative #4'), (286, 'film-burn', 'transisi', 'masuk #6'), (386, 'whoosh-kamera', 'transisi', 'push-through monitor'),
    (445, 'ui-pop', 'ui', 'jendela Workspace'), (458, 'ui-pop', 'ui', 'Canvas+greatstock+Tuntunly'), (470, 'ui-pop', 'ui', 'jendela skill-development'),
    (489, 'kardus-mendarat', 'objek', 'kardus tertutup mendarat'), (504, 'hantam-sub-hp', 'slam', 'stempel BELUM DI-LAUNCHING'),
    (575, 'hantam-sub-hp', 'slam', 'BUILDER slam'), (585, 'kamera-klik_negative', 'negative', 'negative + break wide'), (640, 'film-burn', 'transisi', 'masuk #11'),
    (904, 'kamera-klik_negative', 'negative', 'negative PALSU'), (909, 'kertas-sobek', 'objek', 'PALSU sobek'), (914, 'whoosh-kamera', 'transisi', 'whip ke kardus'),
    (922, 'kardus-buka', 'objek', 'kardus dibuka, produk naik'), (972, 'ui-pop', 'ui', 'jendela skill-development ke tengah'), (985, 'whoosh-kamera', 'transisi', 'push-through ke repo'),
    (1028, 'ui-pop', 'ui', 'jendela Claude'), (1076, 'film-burn', 'transisi', 'masuk #15'), (1106, 'hantam-sub-hp', 'slam', '100% slam'),
    (1190, 'whoosh-kamera', 'transisi', 'push-through ke laptop'), (1207, 'ui-pop', 'ui', 'CapCut memantul'), (1236, 'ui-pop', 'ui', 'Premiere memantul'), (1284, 'ui-pop', 'ui', 'After Effects memantul'),
    (1219, 'ui-tutup', 'ui', 'CapCut batal'), (1257, 'ui-tutup', 'ui', 'Premiere batal'), (1302, 'ui-tutup', 'ui', 'After Effects batal'),
    (1305, 'whoosh-kamera', 'transisi', 'pull-back ke wajah'), (1384, 'ui-pop', 'ui', 'kartu repo + Claude mengorbit'), (1472, 'hantam-sub-hp', 'slam', 'BERBEDA slam'),
    (1485, 'film-burn', 'transisi', 'masuk #19'), (1574, 'whoosh-kamera', 'transisi', 'pull-back ke wajah'), (1784, 'kertas-sobek', 'objek', 'cincin BUILDER TRAP sobek'),
    (1850, 'ui-pop', 'ui', 'hai!'), (1865, 'kertas-polaroid', 'objek', 'polaroid'), (1878, 'whoosh-kamera', 'transisi', 'kamera mundur ke profil'),
    (1890, 'ui-pop', 'ui', 'grid tile mulai'), (1981, 'mouse-klik', 'ui', 'klik Follow'), (1999, 'whoosh-kamera', 'transisi', 'menyelam → loop'),
]
T = [  # tambahan (dicatat di laporan sebagai peran baru: tick-hero, riser-slam)
    (173, 'tick-hero', 'hero', 'KONSISTEN mendarat'), (203, 'tick-hero', 'hero', 'GAK mendarat'), (210, 'tick-hero', 'hero', 'JADI-JADI mendarat'),
    (224, 'tick-hero', 'hero', 'BUKAN mendarat'), (280, 'tick-hero', 'hero', 'IDE mendarat'), (337, 'tick-hero', 'hero', 'PRODUK mendarat'),
    (349, 'whoosh-kamera', 'zoom', 'punch 1,18 #6'), (362, 'tick-hero', 'hero', 'FOKUS mendarat'), (408, 'tick-hero', 'hero', '6 BULAN mendarat'),
    (571, 'riser-slam', 'riser', 'naik ke BUILDER slam'), (611, 'tick-hero', 'hero', 'PENYAKIT mendarat'), (676, 'tick-hero', 'hero', 'ANXIETY mendarat'),
    (697, 'tick-hero', 'hero', 'OVERTHINKING mendarat'), (722, 'whoosh-kamera', 'zoom', 'reframe 1,18 heavy #11'), (759, 'tick-hero', 'hero', 'BELUM mendarat'),
    (766, 'tick-hero', 'hero', 'LAYAK mendarat'), (774, 'whoosh-kamera', 'zoom', 'pull-back titik balik'), (813, 'tick-hero', 'hero', 'RISIKO mendarat'),
    (900, 'riser-slam', 'riser', 'naik ke PALSU slam'), (1033, 'whoosh-kamera', 'zoom', 'kamera mundur dari judul repo'), (1102, 'riser-slam', 'riser', 'naik ke 100% slam'),
    (1126, 'whoosh-kamera', 'zoom', 'punch 1,16 #15'), (1363, 'tick-hero', 'hero', 'AI mendarat'), (1468, 'riser-slam', 'riser', 'naik ke BERBEDA slam'),
    (1736, 'whoosh-kamera', 'zoom', 'push 1,15 heavy #21'), (1778, 'tick-hero', 'hero', 'cincin BUILDER TRAP mendarat'), (1992, 'hantam-sub-hp', 'slam', 'ULANGI gema hook'),
]
# satu peran satu file (gerbang sfx_density): peran = fungsi bunyi, bukan kategori
PERAN = {'film-burn': 'burn', 'whoosh-kamera': 'transisi', 'ui-pop': 'ui-muncul', 'ui-tutup': 'ui-batal', 'mouse-klik': 'klik-follow',
         'kardus-buka': 'kardus-buka', 'kardus-mendarat': 'kardus-mendarat', 'kertas-polaroid': 'polaroid', 'kertas-sobek': 'sobek',
         'kamera-klik_negative': 'negative', 'hantam-sub-hp': 'slam', 'tick-hero': 'hero', 'riser-slam': 'riser'}
cues = sorted([dict(f=f, t=round(f / FPS, 3), file=n + '.wav', peran=PERAN[n], alasan=a, dengar=DENGAR[n + '.wav'], gain_db=GAIN[n + '.wav']) for f, n, p, a in D + T], key=lambda c: c['f'])

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
