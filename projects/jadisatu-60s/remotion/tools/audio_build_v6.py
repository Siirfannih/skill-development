"""The Gap — audio: VO assembly + synthesized warm SFX (100–1,200 Hz, LPF 5 kHz) + 4 music cues + mix.
All SFX are generated here (no stock pack access in this session). cues.json lists every SFX with the visual it voices."""
import json, numpy as np, soundfile as sf, scipy.signal as ss, pyloudnorm as pyln, subprocess

SR = 48000
ROOT = '/home/claude/thegap'
vo = json.load(open(f'{ROOT}/video/src/vo.json'))
FPS = 30
TOTAL = vo['total']
N = int(TOTAL * SR) + SR
rng = np.random.default_rng(7)

def W(chunk, prefix, nth=1, end=False):
    k = 0
    for w in vo['words']:
        if w['c'] != chunk: continue
        if w['w'].lower().startswith(prefix.lower()):
            k += 1
            if k == nth: return w['e'] if end else w['s']
    raise KeyError(chunk + prefix)
fr = lambda frames: frames / FPS
def F(chunk, prefix, nth=1): return round(W(chunk, prefix, nth) * FPS) / FPS  # frame-quantised like Remotion

# ---------------- DSP helpers
def lp(x, fc, order=4): return ss.sosfilt(ss.butter(order, fc, 'low', fs=SR, output='sos'), x)
def hp(x, fc, order=2): return ss.sosfilt(ss.butter(order, fc, 'high', fs=SR, output='sos'), x)
def bp(x, lo, hi, order=2): return ss.sosfilt(ss.butter(order, [lo, hi], 'band', fs=SR, output='sos'), x)
def env_ad(n, a, d):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) / d)
    return e
def pink(n):
    w = rng.standard_normal(n)
    b = [0.049922035, -0.095993537, 0.050612699, -0.004408786]; a = [1, -2.494956002, 2.017265875, -0.522189400]
    return ss.lfilter(b, a, w)
def norm(x, peak=1.0):
    m = np.max(np.abs(x)) + 1e-9
    return x / m * peak

# ---------------- SFX palette (warm, thock, no ear fatigue)
def s_thud(dur=0.45, f0=95, f1=42):
    n = int(dur * SR); t = np.arange(n) / SR
    ph = 2 * np.pi * np.cumsum(f1 + (f0 - f1) * np.exp(-t / 0.05)) / SR
    x = np.sin(ph) * env_ad(n, 0.003, 0.14)
    x += 0.25 * lp(rng.standard_normal(n), 900) * env_ad(n, 0.001, 0.012)
    return norm(lp(x, 2500))
def s_impact():
    a = s_thud(0.9, 110, 38); n = len(a)
    body = lp(pink(n), 600) * env_ad(n, 0.002, 0.09)
    return norm(a + 0.35 * norm(body))
def s_pop(f0=420, dur=0.09):
    n = int(dur * SR); t = np.arange(n) / SR
    ph = 2 * np.pi * np.cumsum(f0 * (1 + 0.6 * np.exp(-t / 0.012))) / SR
    return norm(lp(np.sin(ph) * env_ad(n, 0.002, 0.025), 3000))
def s_thock(f0=210):
    n = int(0.12 * SR); t = np.arange(n) / SR
    x = np.sin(2 * np.pi * f0 * t) * env_ad(n, 0.001, 0.03)
    x += 0.6 * bp(rng.standard_normal(n), 500, 1400) * env_ad(n, 0.0005, 0.008)
    return norm(lp(x, 3500))
def s_whoosh(dur=0.5, lo=180, hi=900, land=True):
    n = int(dur * SR); t = np.arange(n) / SR
    x = pink(n)
    # sweeping band via short-time filtering
    out = np.zeros(n); seg = 1024
    for i in range(0, n, seg):
        p = i / n
        fc = lo + (hi - lo) * (p if land else 1 - p)
        out[i:i + seg] = bp(x[i:i + seg], max(60, fc * 0.6), fc * 1.6)[: len(out[i:i + seg])]
    shape = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 2 if not land else (t / dur) ** 2.2 * np.exp(-np.maximum(0, t - dur * 0.92) / 0.02)
    return norm(lp(out * shape, 2200))
def s_subwhoosh(dur=0.45):
    w = s_whoosh(dur, 120, 520, True); n = len(w); t = np.arange(n) / SR
    sub = np.sin(2 * np.pi * (50 + 30 * t / dur) * t) * (t / dur) ** 2
    return norm(w + 0.6 * sub)
def s_glide(dur=0.35):  # paper glide
    n = int(dur * SR); t = np.arange(n) / SR
    x = bp(pink(n), 250, 1600) * np.sin(np.pi * t / dur) ** 1.5
    return norm(lp(x, 3000))
def s_tick():  # muted wood tick
    n = int(0.05 * SR); t = np.arange(n) / SR
    x = np.sin(2 * np.pi * 760 * t) * env_ad(n, 0.0005, 0.009) + 0.4 * np.sin(2 * np.pi * 1180 * t) * env_ad(n, 0.0005, 0.005)
    return norm(lp(x, 2600))
def s_latch():
    a = s_thock(180); b = s_thock(260); n = len(a) + int(0.045 * SR)
    x = np.zeros(n); x[: len(a)] += a; x[int(0.045 * SR):] += 0.7 * b[: n - int(0.045 * SR)]
    return norm(x)
def s_gulp():
    n = int(0.22 * SR); t = np.arange(n) / SR
    ph = 2 * np.pi * np.cumsum(140 + 260 * np.exp(-t / 0.04)) / SR
    return norm(lp(np.sin(ph) * env_ad(n, 0.004, 0.06), 1500))
def s_scribble():
    n = int(0.16 * SR); t = np.arange(n) / SR
    x = bp(rng.standard_normal(n), 500, 1800) * (0.6 + 0.4 * np.sin(2 * np.pi * 38 * t)) * np.sin(np.pi * t / 0.16)
    return norm(lp(x, 2800))
def s_riser(dur=1.4):
    n = int(dur * SR); t = np.arange(n) / SR
    f = 80 * (1 + 6 * (t / dur) ** 2)
    x = 0.5 * np.sin(2 * np.pi * np.cumsum(f) / SR) + bp(pink(n), 200, 1400)
    return norm(lp(x * (t / dur) ** 2.5, 2400))
def s_swell(dur=0.6):
    n = int(dur * SR); t = np.arange(n) / SR
    x = lp(pink(n), 500) * (t / dur) ** 2 + 0.6 * np.sin(2 * np.pi * 62 * t) * (t / dur) ** 2
    return norm(x)
def s_bloop(f0=330):  # muted marimba-ish
    n = int(0.5 * SR); t = np.arange(n) / SR
    x = (np.sin(2 * np.pi * f0 * t) + 0.35 * np.sin(2 * np.pi * f0 * 4 * t) * np.exp(-t / 0.02)) * env_ad(n, 0.002, 0.16)
    return norm(lp(x, 2500))
def s_click():
    n = int(0.04 * SR); t = np.arange(n) / SR
    return norm(lp(np.sin(2 * np.pi * 520 * t) * env_ad(n, 0.0005, 0.006) + 0.3 * bp(rng.standard_normal(n), 400, 1200) * env_ad(n, 0.0003, 0.003), 2500))

PAL = dict(thud=s_thud, impact=s_impact, pop=s_pop, thock=s_thock, whoosh=s_whoosh, subwhoosh=s_subwhoosh, glide=s_glide,
           tick=s_tick, latch=s_latch, gulp=s_gulp, scribble=s_scribble, riser=s_riser, swell=s_swell, bloop=s_bloop, click=s_click)

cues = []
def cue(t, kind, db, visual, align='start', **kw):
    """align='end' → the sound peaks/ends at t (whoosh lands on the visual)."""
    cues.append(dict(t=round(t, 4), kind=kind, db=db, visual=visual, align=align, kw=kw))

# ---------------- CUE SHEET (bound to visuals in src/S*.tsx)
f = F
# S1 (grafik → Ira)
cue(fr(1), 'glide', -26, 'sumbu grafik tergambar', dur=0.5)
for w, db in (('Ada', -21), ('jarak', -22), ('antara', -23)): cue(f('c01', w) + fr(2), 'pop', db, f'headline "{w}"', f0=380)
cue(f('c01', 'seleramu'), 'glide', -20, 'kurva SELERA tergambar', dur=0.75)
cue(f('c01', 'seleramu') + fr(20), 'bloop', -20, 'titik ujung SELERA', f0=294)
cue(f('c01', 'kemampuan'), 'glide', -23, 'kurva KEMAMPUAN putus-putus', dur=0.75)
cue(f('c01', 'kemampuan') + fr(20), 'pop', -22, 'titik ujung KEMAMPUAN', f0=240)
cue(f('c01', 'kemampuan') + fr(16), 'swell', -22, 'area jarak terisi arsir', dur=0.6, align='start')
cue(f('c01', 'kemampuan') + fr(30), 'thock', -16, 'braket + label JARAK', f0=190)
cue(f('c01', 'Ira') + fr(6), 'riser', -16, 'kamera menyelam ke dalam jarak', align='end', dur=0.55)
cue(f('c01', 'Ira') + fr(7), 'thud', -15, 'mendarat di dunia putih Ira', f0=80, f1=40, dur=0.5)
cue(f('c01', 'Ira') + fr(9), 'pop', -22, 'label IRA GLASS', f0=420)
cue(f('c01', 'menyebutnya') + fr(2), 'pop', -23, 'menyebutnya', f0=330)
cue(f('c01', 'the') + fr(2), 'pop', -20, '"the" serif naik', f0=320)
cue(f('c01', 'gap') + fr(2), 'impact', -11, '"gap." biru mendarat (kunci)')
cue(F('c02', 'Bertahun') + fr(2), 'whoosh', -15, 'whip kiri ke grafik', align='end', dur=0.35, lo=400, hi=1200)
cue(F('c02', 'Bertahun') + fr(3), 'thud', -18, 'landing whip grafik', f0=85, f1=42, dur=0.4)
# S2 A
cue(F('c02', 'Bertahun') + fr(4), 'glide', -25, 'label BERTAHUN-TAHUN', dur=0.5)
for w in ('karyamu', 'akan'): cue(F('c02', w) + fr(2), 'pop', -23, f'headline {w}', f0=340)
t0, t1 = F('c02', 'karyamu'), F('c02', 'mengecewakan') + fr(6)
for i in range(7): cue(t0 + (t1 - t0) * i / 6, 'tick', -21, f'karya {i+1} di bawah garis selera')
cue(F('c02', 'mengecewakan') + fr(4), 'thock', -15, 'garis kecewa menyala', f0=170)
cue(F('c02', 'Dan') - fr(1), 'whoosh', -16, 'whip ke grid footage', align='end', dur=0.3, lo=500, hi=1200)
# S2 B grid
for w in ('Dan', 'rasa', 'kecewa', 'itu', 'tanda', 'sedang', 'bekerja'): cue(F('c02', w) + fr(2), 'pop', -20 if w == 'kecewa' else -23, f'kata grid {w}', f0=320)
for at, nm in ((F('c02', 'Dan') + fr(2), 'a'), (F('c02', 'itu') - fr(2), 'b'), (F('c02', 'tanda') + fr(4), 'c'), (F('c02', 'taste') + fr(4), 'd')): cue(at, 'bloop', -24, f'klip footage {nm} muncul', f0=262)
cue(F('c02', 'taste') + fr(2), 'thock', -13, 'pil biru taste-mu', f0=200)
cue(F('c02', 'Dan'), 'glide', -27, 'kamera push pelan ke grid', dur=1.6)
cue(F('c03', 'Sekarang'), 'whoosh', -15, 'keluar grid ke grafik', align='end', dur=0.35, lo=900, hi=250)
# S2 C
cue(F('c03', 'Sekarang') + fr(2), 'thud', -18, 'landing grafik', f0=85, f1=42, dur=0.4)
cue(F('c03', 'AI') + fr(2), 'pop', -20, 'label AI', f0=300)
cue(F('c03', 'tiga'), 'impact', -9, 'lonjakan AI ke garis selera (3 f)')
cue(F('c03', 'detik') + fr(2), 'latch', -17, 'tanda 3 DETIK di sumbu')
for i in range(12): cue(F('c03', 'bangun') + fr(i * 2), 'pop', -25 + (i % 3), f'lonjakan {i+1} apapun', f0=300 + i * 22, dur=0.07)
cue(F('c03', 'apapun') + fr(2), 'thock', -16, 'headline apapun', f0=200)
cue(F('c03', 'Dan'), 'whoosh', -22, 'kamera truck kanan', align='start', dur=0.8, lo=150, hi=500)
cue(F('c03', 'tastemu') - fr(4), 'glide', -22, 'garis taste tumbuh', dur=1.4)
cue(F('c03', 'berhenti'), 'impact', -10, 'taste BERHENTI (engsel)')
cue(F('c03', 'berhenti') + fr(4), 'glide', -26, 'garis harapan putus-putus', dur=0.6)
s3 = F('c04', 'Faktanya')
cue(s3, 'subwhoosh', -15, 'tilt vertikal ke dunia putih', align='end', dur=0.5)
cue(s3 + fr(2), 'thud', -17, 'landing dunia putih', f0=75, f1=40, dur=0.4)
# S3
for w, db in (('kita', -24), ('takut', -18), ('digantikan', -23)): cue(F('c04', w) + fr(2), 'pop', db, f'headline {w}', f0=360)
cue(F('c04', 'AI'), 'whoosh', -18, 'AI. jatuh dari atas', align='end', dur=0.4, lo=900, hi=150)
cue(F('c04', 'AI'), 'impact', -6, 'AI. mendarat berat (hit puncak 1)')
cue(F('c04', 'Tapi') + fr(4), 'glide', -22, 'AI. menyusut jadi kotak', dur=0.6)
cue(F('c04', 'Tapi') + fr(22), 'latch', -16, 'kotak AI terkunci')
for w in ('yang', 'enggan', 'kerjakan'): cue(F('c04', w) + fr(2), 'pop', -24 if w != 'enggan' else -19, f'teks {w}', f0=360)
for w, n in (('Edit', 1), ('Menulis', 1), ('Mencari', 1), ('Mencari', 2)):
    t0 = F('c04', w, n)
    cue(t0 + fr(12), 'whoosh', -21, f'ubin {w} meluncur masuk', align='end', dur=0.3, lo=300, hi=1000)
    cue(t0 + fr(6), 'pop', -20, f'ubin {w} warna settle', f0=400)
    cue(t0 + fr(24), 'gulp', -15, f'ubin {w} ditelan kotak')
cue(F('c05', 'jadi'), 'pop', -17, 'hasil dimuntahkan kotak', f0=300)
cue(F('c05', 'hitungan') - fr(6), 'riser', -26, 'penggaris detik berlari', dur=0.6)
nt = 0
t0, t1 = F('c05', 'hitungan') - fr(6), F('c05', 'cukup')
for i in range(28):
    p = (i / 27) ** 0.5
    cue(t0 + (t1 - t0) * p, 'tick', -28, 'penggaris detik (tick roll)')
cue(F('c05', 'cukup'), 'whoosh', -22, 'kotak AI keluar kanan', align='end', dur=0.35, lo=800, hi=200)
cue(F('c05', 'cukup') + fr(2), 'thock', -13, 'cukup. (lock)', f0=160)
for i in range(12): cue(F('c05', 'perlahan') + fr(i * 2.4) + fr(8), 'whoosh', -29, f'kartu {i+1} terbang masuk', align='end', dur=0.25, lo=400, hi=1100)
cue(F('c05', 'mulai'), 'glide', -20, 'kartu memampat ke grid', dur=0.75)
cue(F('c05', 'sama') + fr(2), 'thud', -12, 'sama. mendarat', f0=90, f1=42, dur=0.5)
cue(F('c06', 'Ira'), 'riser', -18, 'zoom-through ke kartu', align='end', dur=0.7)
cue(F('c06', 'Ira') + fr(1), 'thud', -16, 'landing hitam', f0=65, f1=34, dur=0.6)
# S4
cue(F('c06', 'Ira') + fr(4), 'pop', -24, 'label Ira Glass bilang', f0=300)
t0, t1 = F('c06', 'jarak') - fr(6), F('c06', 'karya') + fr(6)
for i in range(40):
    p = (i / 39) ** (1 / 2.1)
    cue(t0 + (t1 - t0) * p, 'tick', -27 + 4 * (i / 39), 'karya bertambah di kurva')
cue(F('c06', 'banyak') + fr(3), 'thock', -15, 'label BANYAK KARYA, jarak tertutup', f0=180)
cue(F('c06', 'AI') - fr(2), 'swell', -18, 'reveal-out ke ribuan titik', dur=1.2)
cue(F('c06', 'ribuan') + fr(3), 'pop', -20, 'ribuan.', f0=260)
cue(F('c06', 'tidak') + fr(2), 'bloop', -22, 'lensa muncul', f0=262)
cue(F('c06', 'tidak') + fr(2), 'glide', -26, 'lensa menyapu', dur=2.0)
cue(F('c06', 'kecewa') + fr(8), 'click', -20, 'lensa menutup kosong')
cue(F('c07', 'Karena') - fr(10), 'whoosh', -18, 'titik rontok', align='end', dur=0.5, lo=700, hi=120)
for i in range(3): cue(F('c07', 'Karena') - fr(12) + i * 0.06, 'pop', -20, f'titik {i+1} bertahan', f0=330 + 60 * i)
cue(F('c07', 'Karena') + fr(7), 'swell', -14, 'banjir putih', align='end', dur=0.4)
cue(F('c07', 'Karena') + fr(7), 'thud', -16, 'landing putih', f0=80, f1=40, dur=0.5)
# S5
for i in range(3): cue(F('c07', 'Karena') + fr(4 + i * 5), 'pop', -22, f'kartu 0{i+1} berdiri', f0=300 + 50 * i)
cue(F('c07', 'tiga') + fr(2), 'pop', -20, 'tiga', f0=380)
cue(F('c07', 'hal') + fr(2), 'bloop', -15, 'kartu 01 jadi biru (warna pertama)', f0=294)
cue(F('c07', 'tidak') + fr(2), 'pop', -23, 'tidak bisa di-generate', f0=300)
cue(F('c07', 'Pengalaman'), 'whoosh', -17, 'zoom-through kartu 01', align='end', dur=0.45, lo=200, hi=900)
cue(F('c07', 'Pengalaman') + fr(1), 'thud', -16, 'landing kotak biru', f0=80, f1=40, dur=0.45)
for i in range(7): cue(F('c07', 'Pengalaman') + fr(6 + i * 2), 'pop', -26, f'kotak percobaan {i+1}', f0=320 + 20 * i, dur=0.07)
cue(F('c07', 'Pengalaman') + fr(14), 'thock', -16, 'Pengalaman.', f0=190)
step = round((W('c07', 'gagal') - W('c07', 'semua')) * FPS / 7)
for i in range(7): cue(F('c07', 'semua') + fr(4 + i * step), 'scribble', -20, f'coretan coral {i+1}')
cue(F('c07', 'Direction'), 'whoosh', -15, 'whip pan ke Direction', align='end', dur=0.3, lo=400, hi=1200)
cue(F('c07', 'Direction') + fr(2), 'thud', -18, 'landing whip', f0=90, f1=45, dur=0.35)
for i in range(4): cue(F('c07', 'Direction') + fr(2 + i * 2), 'pop', -24, f'kartu kipas {i+1}', f0=300 + 25 * i, dur=0.07)
cue(F('c07', 'Direction') + fr(6), 'thock', -15, 'Direction.', f0=200)
cue(F('c07', 'satu') + fr(4), 'latch', -14, 'braket memilih satu')
cue(F('c07', 'membuang') + fr(10), 'whoosh', -17, 'sisa kartu dibuang', align='end', dur=0.45, lo=300, hi=1100)
cue(F('c07', 'Cara'), 'swell', -15, 'banjir navy dari kartu', align='end', dur=0.45)
cue(F('c07', 'Cara') + fr(1), 'thud', -15, 'landing navy', f0=70, f1=36, dur=0.5)
for i in range(9): cue(F('c07', 'Cara') + fr(i * 1.5 + 2), 'pop', -27, f'balok {i+1}', f0=280 + 18 * i, dur=0.06)
cue(F('c07', 'Cara') + fr(4), 'glide', -24, 'lensa bergeser', dur=1.6)
cue(F('c07', 'salah'), 'latch', -14, 'titik coral: salah')
cue(F('c07', 'tahu') + fr(2), 'pop', -25, 'tahu ada yang salah', f0=340)
cue(F('c08', 'Rick'), 'subwhoosh', -16, 'lensa membesar jadi jendela', align='end', dur=0.7)
# S6
cue(F('c08', 'Rick') + fr(4), 'pop', -18, 'iris foto Rick', f0=260)
cue(F('c08', 'Rick') + fr(4), 'thock', -16, 'Rick Rubin', f0=180)
cue(F('c08', 'tidak') + fr(2), 'pop', -24, 'tidak bisa memainkan', f0=360)
cue(F('c08', 'memproduseri') + fr(4), 'whoosh', -22, 'lensa keluar kanan', align='end', dur=0.5, lo=300, hi=900)
cue(F('c08', 'memproduseri') + fr(2), 'pop', -23, 'memproduseri', f0=360)
cue(F('c08', 'memproduseri') + fr(16), 'whoosh', -18, 'sampul Cash naik', align='end', dur=0.3, lo=250, hi=900)
cue(F('c08', 'memproduseri') + fr(16), 'thud', -15, 'sampul Cash mendarat', f0=90, f1=45, dur=0.4)
cue(F('c08', 'Adele') + fr(10), 'whoosh', -18, 'sampul Adele naik', align='end', dur=0.35, lo=300, hi=1100)
cue(F('c08', 'Adele') + fr(10), 'thud', -14, 'sampul Adele mendarat', f0=110, f1=55, dur=0.4)
cue(F('c08', 'Yang') + fr(14), 'subwhoosh', -15, 'nama keluar + dunia putih naik', align='end', dur=0.5)
cue(F('c08', 'Yang') + fr(16), 'pop', -22, 'Yang ia bawa ke studio', f0=320)
cue(F('c08', 'hanya') + fr(2), 'pop', -20, 'hanya satu.', f0=400)
cue(F('c08', 'ia', 3) + fr(2), 'pop', -23, 'ia tau apa yang', f0=300)
cue(F('c08', 'bagus') + fr(1), 'impact', -11, 'bagus. (serif biru)')
cue(F('c08', 'bagus') + fr(1), 'bloop', -18, 'bagus. warna', f0=392)
cue(F('c09', 'AI') + fr(2), 'pop', -20, 'AI bisa', f0=300)
cue(F('c09', 'AI') + fr(4), 'pop', -24, 'pil muncul', f0=420)
for w in ('membuat', 'bisnis', 'meniru'): cue(F('c09', w), 'click', -16, f'slot swap: {w}')
cue(F('c09', 'tapi') + fr(9), 'whoosh', -16, 'whip pil keluar', align='end', dur=0.35, lo=900, hi=250)
cue(F('c09', 'tapi') + fr(10), 'pop', -23, 'tapi tidak dengan', f0=300)
cue(F('c09', 'seleramu') + fr(1), 'impact', -7, 'seleramu. (hit puncak 2)')
cue(F('c09', 'seleramu') + fr(10), 'glide', -22, 'kurva selera biru tumbuh lagi', dur=1.0)
mark = F('c09', 'seleramu') + fr(44)
cue(mark + fr(2), 'pop', -18, 'wordmark jadisatu', f0=300)
cue(mark + fr(10), 'latch', -20, 'titik biru wordmark')

# ---------------- render SFX bus
sfx = np.zeros(N)
for c in cues:
    x = PAL[c['kind']](**c['kw'])
    start = c['t'] - (len(x) / SR if c['align'] == 'end' else 0)
    i0 = int(max(0, start) * SR)
    seg = x[: max(0, min(len(x), N - i0))] * 10 ** (c['db'] / 20)
    sfx[i0:i0 + len(seg)] += seg
sfx = hp(lp(sfx, 5200, 6), 40)

# ---------------- VO bus
vob = np.zeros(N)
for c in vo['chunks']:
    x, sr = sf.read(f'{ROOT}/vo/v2/{c["id"]}_trim.wav')
    assert sr == SR
    i0 = int(c['start'] * SR); vob[i0:i0 + len(x)] += x[: N - i0]
# light presence + gentle compression
vob = vob + 0.12 * bp(vob, 2500, 4000)
def compress(x, thr_db=-20, ratio=2.5, att=0.005, rel=0.12):
    env = np.abs(ss.hilbert(x)) if False else np.abs(x)
    a1 = np.exp(-1 / (att * SR)); r1 = np.exp(-1 / (rel * SR))
    e = ss.lfilter([1 - r1], [1, -r1], env)
    db = 20 * np.log10(e + 1e-9); over = np.maximum(0, db - thr_db)
    g = 10 ** (-(over - over / ratio) / 20)
    return x * g
vob = compress(vob)

# ---------------- music (4 cues, synthesized)
def note_piano(f0, dur, vel=0.6):
    n = int(dur * SR); t = np.arange(n) / SR
    x = sum((0.6 ** h) * np.sin(2 * np.pi * f0 * (h + 1) * t * (1 + 0.0004 * h)) * np.exp(-t * (1.2 + 0.9 * h)) for h in range(6))
    x *= np.minimum(1, t / 0.004)
    return lp(x, 2600) * vel
def pad(freqs, dur, a=1.2, r=1.5):
    n = int(dur * SR); t = np.arange(n) / SR
    x = sum(np.sin(2 * np.pi * f * t + rng.random() * 6) + 0.5 * np.sin(2 * np.pi * f * 1.003 * t) + 0.25 * np.sin(2 * np.pi * f * 2.001 * t) for f in freqs)
    e = np.minimum(1, t / a) * np.minimum(1, np.maximum(0, (dur - t)) / r)
    return lp(x * e, 1400) / len(freqs)
def place(buf, x, t, g=1.0):
    i0 = int(t * SR); m = min(len(x), N - i0)
    if m > 0: buf[i0:i0 + m] += x[:m] * g
nt = lambda m: 440 * 2 ** ((m - 69) / 12)
mus = np.zeros(N)
# Cue A (0 → c03 start): sparse felt piano, A minor add9, 70 bpm
tA0, tA1 = 0.0, F('c02', 'Bertahun')
tB0 = F('c03', 'Sekarang')
place(mus, pad([nt(45), nt(52), nt(57)], tB0 + 0.6, 2.5, 1.2), 0.2, 0.35)
motif = [69, 72, 76, 71, 69, 64, 67, 71]
beat = 60 / 70
for i in range(int((tB0 - 0.4) / beat)):
    m = motif[i % len(motif)] - (12 if i % 4 == 3 else 0)
    if i % 2 == 0 or i > 8:
        place(mus, note_piano(nt(m), 3.0, 0.32 if i % 4 else 0.42), 0.4 + i * beat)
# Cue B (Sekarang → berhenti, then Faktanya → sama): low pulse 96 bpm, filtered saw-ish
def pulse(t0, t1, root, bpm=96, cutoff=700):
    b = 60 / bpm / 2; out = np.zeros(int((t1 - t0) * SR) + 1)
    for i in range(int((t1 - t0) / b)):
        n_ = int(b * 0.9 * SR); t = np.arange(n_) / SR
        f0 = nt(root + (0 if (i // 8) % 2 == 0 else -2))
        x = sum(np.sin(2 * np.pi * f0 * h * t) / h for h in range(1, 7)) * np.exp(-t / 0.12)
        i0 = int(i * b * SR); out[i0:i0 + n_] += lp(x, cutoff)[: len(out) - i0]
    return out
tStop = F('c03', 'tastemu') - 0.2
place(mus, pulse(tB0, tStop, 33, 96, 600) * 0.55, tB0)
place(mus, pad([nt(57), nt(60), nt(64)], tStop - tB0 + 0.3, 1.0, 0.25), tB0, 0.22)
# engsel: silence, then berhenti hit carries; resume at Faktanya
tF = F('c04', 'Faktanya'); tSama = F('c05', 'sama') + 1.0
place(mus, pulse(tF + 0.2, tSama, 33, 104, 900) * 0.55, tF + 0.2)
place(mus, pad([nt(57), nt(60), nt(64), nt(67)], tSama - tF, 1.5, 1.2), tF, 0.2)
for i in range(int((tSama - tF) / (60 / 104 * 2))):
    place(mus, note_piano(nt([76, 74, 72, 71][i % 4]), 1.2, 0.18), tF + 0.2 + i * (60 / 104 * 2))
# S4 drone
tS4 = F('c06', 'Ira'); tC = F('c07', 'Karena')
place(mus, pad([nt(45), nt(52)], tC - tS4 + 0.4, 2.0, 0.6), tS4, 0.45)
place(mus, pad([nt(76)], tC - tS4, 3.0, 1.0), tS4 + 1.5, 0.12)
# Cue C (Karena → Rick): warm rising, F major → C, arpeggio 84 bpm
tD = F('c08', 'Rick')
chords = [[53, 57, 60, 64], [48, 55, 60, 64], [50, 57, 60, 65], [55, 59, 62, 67]]
bar = 60 / 84 * 4
for i in range(int((tD - tC) / bar) + 1):
    ch = chords[i % 4]
    place(mus, pad([nt(m) for m in ch], bar + 0.6, 0.6, 0.6), tC + i * bar, 0.32)
    for j in range(8):
        place(mus, note_piano(nt(ch[j % 4] + 12), 1.0, 0.22), tC + i * bar + j * bar / 8)
# Cue D (Rick → end): resolve, sparse piano + pad, A minor → C major on seleramu
tSel = F('c09', 'seleramu')
prog = [[45, 57, 60, 64], [41, 57, 60, 65], [43, 55, 59, 62]]
bar2 = 60 / 72 * 4
i = 0
while tD + i * bar2 < tSel - 0.2:
    ch = prog[i % 3]
    place(mus, pad([nt(m) for m in ch], bar2 + 0.5, 0.8, 0.8), tD + i * bar2, 0.3)
    for j, m in enumerate([ch[1] + 12, ch[2] + 12, ch[3] + 12]):
        place(mus, note_piano(nt(m), 2.0, 0.24), tD + i * bar2 + j * bar2 / 3)
    i += 1
place(mus, pad([nt(48), nt(55), nt(60), nt(64), nt(67)], TOTAL - tSel + 0.5, 0.3, 2.0), tSel, 0.42)
for j, m in enumerate([72, 76, 79, 84]): place(mus, note_piano(nt(m), 4.0, 0.3), tSel + 0.05 + j * 0.12)
# reverb (simple exponential-noise IR)
ir_n = int(2.2 * SR); ir = rng.standard_normal(ir_n) * np.exp(-np.arange(ir_n) / SR / 0.55); ir = lp(ir, 3500)
wet = ss.fftconvolve(mus, ir)[:N]; mus = mus + 0.25 * norm(wet, np.max(np.abs(mus)) + 1e-9)
mus = lp(mus, 6000)
# sidechain duck under VO (8 dB)
venv = ss.lfilter([1 - np.exp(-1 / (0.25 * SR))], [1, -np.exp(-1 / (0.25 * SR))], np.abs(vob))
venv = venv / (np.max(venv) + 1e-9)
duck = 10 ** (-8 * np.clip(venv * 6, 0, 1) / 20)
mus = mus * duck

# ---------------- mix + loudness
vob = norm(vob, 0.5)
mus = norm(mus, 1) * 10 ** (-17 / 20) * 2
sfx_ = sfx * 0.5
mix = vob + mus + sfx_
meter = pyln.Meter(SR)
mix = mix[: int(TOTAL * SR)]
loud = meter.integrated_loudness(mix)
mix = mix * 10 ** ((-14 - loud) / 20)
# lookahead peak limiter (5 ms lookahead, 80 ms release), iterate loudness
from scipy.ndimage import maximum_filter1d
def limit(x, ceil_db=-1.5):
    c = 10 ** (ceil_db / 20)
    up = np.abs(ss.resample_poly(x, 4, 1)).reshape(-1, 4).max(1)[: len(x)]
    need = np.minimum(1, c / (up + 1e-9))
    la = int(0.005 * SR)
    g = -maximum_filter1d(-need, size=2 * la + 1)
    rel = np.exp(-1 / (0.08 * SR))
    g = ss.lfilter([1 - rel], [1, -rel], g - 1) + 1
    g = np.minimum(g, -maximum_filter1d(-need, size=2 * la + 1))
    return x * g
for _ in range(3):
    mix = limit(mix)
    loud = meter.integrated_loudness(mix)
    mix = mix * 10 ** ((-14 - loud) / 20)
mix = limit(mix)
print('LUFS', round(meter.integrated_loudness(mix), 2), 'peak dBTP~', round(20 * np.log10(np.max(np.abs(ss.resample_poly(mix, 4, 1)))), 2))
sf.write(f'{ROOT}/render/mix.wav', np.stack([mix, mix], 1).astype(np.float32), SR, subtype='PCM_24')
sf.write(f'{ROOT}/render/stem_vo.wav', vob[: len(mix)].astype(np.float32), SR)
sf.write(f'{ROOT}/render/stem_music.wav', mus[: len(mix)].astype(np.float32), SR)
sf.write(f'{ROOT}/render/stem_sfx.wav', sfx_[: len(mix)].astype(np.float32), SR)
json.dump(cues, open(f'{ROOT}/render/cues.json', 'w'), indent=1)
print('cues', len(cues))
