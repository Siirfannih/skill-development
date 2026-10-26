"""The Gap — audio: VO assembly + synthesized warm SFX (100–1,200 Hz, LPF 5 kHz) + 4 music cues + mix.
All SFX are generated here (no stock pack access in this session). cues.json lists every SFX with the visual it voices."""
import json, numpy as np, soundfile as sf, scipy.signal as ss, pyloudnorm as pyln, subprocess, sys

SR = 48000
ROOT = '/home/claude/thegap'
vo = json.load(open(f'{ROOT}/video/src/vo.json'))
FPS = 30
TOTAL = vo['total'] + 1.0  # v13: wordmark hold
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

# ---------------- Kenyset SFX pack (chosen with earshot describe/rank, see sfx/_catalog.json)
import os, functools
SFXD = f'{ROOT}/sfx'
@functools.lru_cache(None)
def load(name, lpf=9000):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f'{SFXD}/{name}', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    x = np.frombuffer(raw, np.float32).astype(np.float64)
    nz = np.where(np.abs(x) > 0.01 * np.max(np.abs(x)))[0]
    x = x[max(0, nz[0] - int(0.002 * SR)):] if len(nz) else x
    x = lp(x, lpf, 4)  # warm: shave the top (v16: 4th order, steeper)
    fade = int(0.01 * SR); x[-fade:] *= np.linspace(1, 0, fade)
    return norm(x)
def smp(name, maxdur=None, lpf=9000, rate=1.0):
    x = load(name, lpf)
    if rate != 1.0: x = ss.resample(x, int(len(x) / rate))
    if maxdur: 
        n = int(maxdur * SR); x = x[:n].copy(); f_ = min(len(x), int(0.04 * SR)); x[-f_:] *= np.linspace(1, 0, f_)
    return x
def k_typing(dur):
    x = load('iphone-keyboard-typing-sound-effect-336778.mp3', 9000)  # v17: softer source
    n = int(dur * SR); y = x[int(0.3 * SR): int(0.3 * SR) + n].copy(); f_ = int(0.05 * SR); y[-f_:] *= np.linspace(1, 0, f_); return y
RR = {}
def rr(kind, names):
    i = RR.get(kind, 0); RR[kind] = i + 1; return names[i % len(names)]
# v17 (Irfan 19:20: some SFX felt rough — scribbles, paper glides, clicky UI). The palette is rebuilt from the
# smoothest sources (scored by tools/sfx_comfort.py: hiss > 6 kHz, 2–6 kHz bite, envelope roughness, earshot
# "harsh" vs "soft"), and every family is held to its own band, following Irfan's reference spectrum:
#   ui      (pop, click, tick, typing, notifications)  300 Hz – 8 kHz, gentle −4 dB dip at 2.8–4.5 kHz, short and quiet
#   motion  (whoosh, glide, swell, riser)              250 Hz – 3.2 kHz: air, no hiss
#   texture (scribble)                                 400 Hz – 2.6 kHz, kept low
#   low     (thud, impact, boom)                       < 250 Hz weight + a clean 150–450 Hz body (no saturation)
KEN = dict(
    pop=lambda **kw: smp(rr('pop', ['pop-up-notify-smooth-modern-332448.mp3', 'ui-pop-sound-316482.mp3', 'soft-ui-pop-light-minimal-click-451232.mp3', 'el/v17_pop_0.mp3']), 0.45, 9000),
    whoosh=lambda **kw: smp(rr('wh', ['swoosh-2-359826.mp3', 'simple-whoosh-382724.mp3', 'el/v17_whoosh_1.mp3', 'universfield-swoosh-023-454830.mp3']), kw.get('dur', 0.5) + 0.4, 9000),
    click=lambda **kw: smp(rr('ck', ['confirm-tap-394001.mp3', 'el/v17_click_0.mp3', 'tiktok_drop_sample_click3_kofi_by_miraclei-360034.mp3']), 0.3, 9000),
    bloop=lambda **kw: smp('marimba-bloop-3-188151.mp3', 1.0, 9000),
    latch=lambda **kw: smp('confirm-tap-394001.mp3', 0.6, 9000),
    send=lambda **kw: smp('message-envoye-iphone-apple-391098.mp3', 0.5, 9000),
    ding=lambda **kw: smp('notification-pluck-off-269290.mp3', 0.9, 9000),
    ping=lambda **kw: smp('happy-message-ping-351298.mp3', 1.0, 9000),
    typing=lambda **kw: k_typing(kw['dur']),
    glitch=lambda **kw: smp('ui-sound-2-374229.mp3', 0.35, 9000),
    shutter=lambda **kw: smp('shutter-modern.wav', 0.5, 6000),
    boom=lambda **kw: smp(rr('bm', ['el/v17_impact_1.mp3', 'el/v17_impact_0.mp3']), 1.6, 6000),  # v18: clean bass drop, no whoosh
    shine=lambda **kw: tail(smp('el/swell_1.mp3', None, 9000), 0.5),
)
SYN = {'gulp'}  # only the tiny gulp stays synthesized
def tail(x, dur):
    n = int(dur * SR); pk = int(np.argmax(np.abs(x))); a_ = max(0, pk - n); y = x[a_:pk + int(0.05 * SR)].copy()
    f_ = min(len(y) // 3, int(0.06 * SR)); y[:f_] *= np.linspace(0, 1, f_); return y
def el_impact(**kw):
    return smp(rr('im', ['el/v17_impact_1.mp3', 'el/v17_impact_0.mp3']), 1.6, 6000)  # v18: no whoosh tail
ELK = dict(
    thud=lambda **kw: smp(rr('th', ['el/v17_thud_0.mp3', 'el/thud_0.mp3', 'el/thud_1.mp3']), 1.0, 6000),
    impact=el_impact,
    thock=lambda **kw: smp(rr('tk', ['ui-sound-2-374229.mp3', 'el/thock_0.mp3']), 0.45, 9000),
    tick=lambda **kw: smp(rr('ti', ['el/v17_click_0.mp3', 'confirm-tap-394001.mp3']), 0.25, 9000, rate=1.25),
    glide=lambda **kw: smp(rr('gd', ['el/v17_whoosh_3.mp3', 'el/v17_whoosh_1.mp3', 'simple-whoosh-02-433006.mp3']), kw.get('dur', 0.75) + 0.3, 9000),
    swell=lambda **kw: tail(smp(rr('sw', ['el/swell_1.mp3', 'el/swell_0.mp3']), None, 9000), kw.get('dur', 0.6)),
    riser=lambda **kw: tail(smp(rr('ri', ['el/swell_1.mp3', 'el/v17_riser_0.mp3']), None, 9000), kw.get('dur', 0.6)),
    scribble=lambda **kw: smp('el/v17_scribble_0.mp3', kw.get('dur', 0.6) + 0.1, 9000),
    subwhoosh=lambda **kw: smp(rr('cw', ['el/camwhoosh_2.mp3', 'el/camwhoosh_1.mp3', 'swoosh-010-352856.mp3']), 1.2, 9000),
    lens=lambda **kw: smp(rr('ln', ['47313572-ui-sounds-pack-2-sound-8-358892.mp3', 'ui-sound-270349.mp3']), 0.8, 9000),
)
FAMILY = {**{k_: 'ui' for k_ in ('pop', 'click', 'tick', 'typing', 'latch', 'send', 'ding', 'ping', 'bloop', 'lens', 'shutter', 'thock', 'glitch')},
          **{k_: 'motion' for k_ in ('whoosh', 'glide', 'swell', 'riser', 'shine', 'subwhoosh')}, 'scribble': 'texture',
          **{k_: 'low' for k_ in ('thud', 'impact', 'boom')}}
def shape(x, kind):
    fam = FAMILY.get(kind)
    if fam == 'ui':
        y = lp(hp(x, 300, 2), 8000, 4); return y - 0.37 * bp(y, 2800, 4500, 2)
    if fam == 'motion': return 0.6 * lp(hp(x, 400, 4), 2500, 4)  # v18: thin, silky, mid-band (Apple-style), −4.4 dB
    if fam == 'sub': return lp(hp(x, 45, 2), 2500, 4)
    if fam == 'texture': return 0.5 * bp(x, 400, 2600, 4)
    if fam == 'low':
        y = lp(x, 2000, 4); return y + 0.45 * norm(bp(y, 150, 450, 2), np.max(np.abs(y)))
    return x

cues = []
def cue(t, kind, db, visual, align='start', **kw):
    """align='end' → the sound peaks/ends at t (whoosh lands on the visual)."""
    cues.append(dict(t=round(t, 4), kind=kind, db=db, visual=visual, align=align, kw=kw))

# ---------------- CUE SHEET (bound to visuals in src/S*.tsx)
f = F
# S1 (grafik → Ira)
# v18 (Irfan 19:33): the frame-0 boom is gone — nothing on screen asked for it and it broke the opening flow
cue(F('c01', 'jarak') + fr(3), 'whoosh', -17, 'kata Ada|jarak terdorong terpisah', align='start', dur=0.4)
cue(F('c01', 'jarak') + fr(4), 'thud', -14, 'celah terbuka', f0=80, f1=40, dur=0.45)
cue(F('c01', 'jarak') + fr(14), 'latch', -19, 'garis ukur terkunci')
cue(F('c01', 'kemampuan') - fr(2), 'subwhoosh', -18, 'v16: kamera patah ke grafik utuh', align='start')
for w, db in (('Ada', -21), ('jarak', -22), ('antara', -23)): cue(f('c01', w) + fr(2), 'pop', db, f'headline "{w}"', f0=380)
cue(f('c01', 'seleramu'), 'glide', -20, 'kurva SELERA tergambar', dur=0.75)
cue(f('c01', 'seleramu') + fr(20), 'bloop', -20, 'titik ujung SELERA', f0=294)
cue(f('c01', 'kemampuan'), 'glide', -23, 'kurva KEMAMPUAN putus-putus', dur=0.75)
cue(f('c01', 'kemampuan') + fr(18), 'pop', -22, 'titik ujung KEMAMPUAN', f0=240)
cue(f('c01', 'kemampuan') + fr(10), 'swell', -22, 'area jarak terisi arsir', dur=0.6, align='start')
cue(f('c01', 'kemampuan') + fr(17), 'thock', -16, 'braket + label JARAK', f0=190)
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
for w in ('rasa', 'kecewa', 'itu', 'tanda', 'taste', 'sedang'):
    cue(F('c02', w), 'whoosh', -24, f'kamera pindah ke {w}', align='end', dur=0.25)
cue(F('c02', 'sedang') + fr(4), 'subwhoosh', -22, 'kamera mundur: kalimat utuh', align='start')
cue(F('c03', 'Sekarang'), 'whoosh', -15, 'keluar grid ke grafik', align='end', dur=0.35, lo=900, hi=250)
# S2 C
cue(F('c03', 'Sekarang') + fr(2), 'thud', -18, 'landing grafik', f0=85, f1=42, dur=0.4)
# ChatGPT (real UI): typing in composer → send → Berpikir → "Berpikir selama 3 detik" → landing page → pull out to everything
t_type0, t_type1 = F('c03', 'Sekarang') + fr(3), F('c03', 'menutup') - fr(3)
cue(t_type0, 'typing', -15, 'mengetik prompt di composer ChatGPT', dur=t_type1 - t_type0)
cue(F('c03', 'menutup') + fr(2), 'click', -16, 'tombol kirim ChatGPT ditekan')
cue(F('c03', 'menutup') + fr(3), 'send', -20, 'pesan terkirim, kamera mundur')
cue(F('c03', 'tiga') - fr(12), 'ding', -22, 'Berpikir selama 3 detik')
cue(F('c03', 'tiga'), 'impact', -12, 'landing page muncul (3 detik)')
cue(F('c03', 'tiga'), 'pop', -18, 'kartu landing page')
cue(F('c03', 'detik') + fr(2), 'latch', -18, 'kamera push ke hasil')
cue(F('c03', 'Kamu'), 'whoosh', -17, 'pull-out ke semua hasil', align='end', dur=0.5)
for i in range(12): cue(F('c03', 'bangun') + fr(i * 2), 'pop', -25 + (i % 3), f'hasil {i+1} muncul (apapun)')
cue(F('c03', 'Dan') - fr(1), 'whoosh', -20, 'cut ke grafik taste', align='end', dur=0.4)
cue(F('c03', 'tastemu') - fr(4), 'glide', -22, 'garis taste tumbuh', dur=1.4)
cue(F('c03', 'berhenti'), 'impact', -10, 'taste BERHENTI (engsel)')
cue(F('c03', 'berhenti') + fr(4), 'glide', -26, 'garis harapan putus-putus', dur=0.6)
s3 = F('c04', 'Faktanya')
cue(s3, 'subwhoosh', -15, 'tilt vertikal ke dunia putih', align='end', dur=0.5)
cue(s3 + fr(2), 'thud', -17, 'landing dunia putih', f0=75, f1=40, dur=0.4)
# S3
for w, db in (('kita', -24), ('takut', -18), ('digantikan', -23)): cue(F('c04', w) + fr(2), 'pop', db, f'headline {w}', f0=360)
cue(F('c04', 'Faktanya'), 'glide', -20, 'lingkaran zona nyaman tergambar', dur=0.6)
cue(F('c04', 'takut'), 'thud', -16, 'orangnya tersentak takut', f0=70, f1=36, dur=0.4)
cue(F('c04', 'digantikan'), 'shine', -23, 'percik AI muncul')
for i_, n_ in enumerate(['ChatGPT', 'Claude', 'Gemini']): cue(F('c04', 'digantikan') + fr(4 + 3 * i_), 'pop', -19, f'tile {n_} terpisah', f0=280 + 40 * i_)
cue(F('c04', 'AI') - fr(2), 'whoosh', -16, 'AI merebut tengah, kita terdorong keluar', align='end', dur=0.3)
cue(F('c04', 'AI'), 'impact', -6, 'AI. mendarat berat (hit puncak 1)')
# v13: sentence built word by word, camera rides the line
for w, nth in (('Tapi', 1), ('di', 2), ('satu', 1), ('sisi', 1), ('kita', 2), ('menyerahkan', 1), ('semua', 1), ('yang', 1), ('enggan', 1), ('kita', 3), ('kerjakan', 1), ('kepadanya', 1)):
    cue(F('c04', w, nth) - fr(1), 'pop', -19 if w == 'enggan' else -23, f'kata {w} mendarat')
for i in range(4): cue(F('c04', 'semua') + fr(4 + 3 * i), 'pop', -20, f'thumbnail tugas {i+1} terselip')
cue(F('c04', 'kepadanya') + fr(10), 'subwhoosh', -17, 'snap zoom-out: kalimat utuh', align='start')
# Claude (real UI): one fresh session per task → new-chat click, file chip, typing, send. Results come later.
for i, (w, n) in enumerate((('Edit', 1), ('Menulis', 1), ('Mencari', 1), ('Mencari', 2))):
    s0 = F('c04', w, n) - fr(14)
    if i == 0: cue(s0, 'whoosh', -18, 'Claude UI meluncur masuk', align='end', dur=0.4)
    cue(s0, 'click', -15, f'obrolan baru: {w}')
    if i in (0, 2): cue(s0 + fr(1), 'pop', -21, f'lampiran file {w}')
    cue(s0 + fr(2), 'typing', -19, f'mengetik prompt {w}', dur=fr(11))
    cue(s0 + fr(17), 'send', -16, f'kirim {w}')
    cue(s0 + fr(16), 'click', -17, f'tombol kirim {w}')
    cue(s0 + fr(18), 'pop', -22, f'bubble prompt {w} muncul', f0=300)
# results arrive on "Hasilnya jadi dalam hitungan detik"
for w in ('jadi', 'dalam', 'hitungan', 'detik'):
    t0 = F('c05', w) - fr(2 if w != 'jadi' else 4)
    cue(t0 + fr(4), 'whoosh', -22, f'hasil nyata datang ({w})', align='end', dur=0.3)
    cue(t0 + fr(5), 'pop', -19, f'hasil mendarat ({w})')
cue(F('c05', 'cukup') - fr(6), 'glide', -22, 'hasil merapat ke kiri', dur=0.5)
cue(F('c05', 'cukup') + fr(2), 'thock', -13, 'cukup. (lock)', f0=160)
for i in range(12): cue(F('c05', 'perlahan') + fr(i * 2.4) + fr(8), 'whoosh', -29, f'kartu {i+1} terbang masuk', align='end', dur=0.25, lo=400, hi=1100)
cue(F('c05', 'mulai'), 'glide', -20, 'kartu memampat ke grid', dur=0.75)
cue(F('c05', 'mulai') + fr(14), 'subwhoosh', -18, 'kamera masuk dan menyapu barisan kartu kembar', align='start')
cue(F('c05', 'sama') + fr(2), 'thud', -12, 'sama. mendarat', f0=90, f1=42, dur=0.5)
cue(F('c06', 'Ira'), 'riser', -18, 'zoom-through ke kartu', align='end', dur=0.7)
cue(F('c06', 'Ira') + fr(1), 'thud', -16, 'landing hitam', f0=65, f1=34, dur=0.6)
# S4
cue(F('c06', 'Ira') + fr(4), 'pop', -24, 'label Ira Glass bilang', f0=300)
t0, t1 = F('c06', 'jarak') - fr(6), F('c06', 'karya') + fr(6)
for i in range(14):  # v17: 40 → 14 ticks, a soft trickle instead of a rattle
    p = (i / 13) ** (1 / 2.1)
    cue(t0 + (t1 - t0) * p, 'tick', -27 + 4 * (i / 13), 'karya bertambah di kurva')
cue(F('c06', 'banyak') + fr(3), 'thock', -15, 'label BANYAK KARYA, jarak tertutup', f0=180)
cue(F('c06', 'AI') - fr(2), 'swell', -18, 'reveal-out ke ribuan titik', dur=1.2)
cue(F('c06', 'ribuan') + fr(3), 'pop', -20, 'ribuan.', f0=260)
cue(F('c06', 'tidak') + fr(2), 'bloop', -22, 'lensa muncul', f0=262)
cue(F('c06', 'tidak') + fr(2), 'glide', -26, 'lensa menyapu', dur=2.0)
cue(F('c06', 'kecewa') - fr(2), 'thock', -14, 'v16: angka 0 mendarat di lensa', f0=170)
cue(F('c06', 'kecewa') + fr(2), 'pop', -20, 'v16: teks "yang mengecewakan."', f0=260)
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
# v16 Pengalaman = pictogram runner (Irfan's refs)
cue(F('c07', 'Pengalaman'), 'whoosh', -17, 'zoom-through kartu 01', align='end', dur=0.45, lo=200, hi=900)
cue(F('c07', 'Pengalaman') + fr(1), 'thud', -16, 'mendarat di lintasan', f0=80, f1=40, dur=0.45)
cue(F('c07', 'Pengalaman') - fr(1), 'latch', -19, 'tiang bendera MULAI berdiri')
cue(F('c07', 'Pengalaman') + fr(5), 'pop', -20, 'bendera MULAI terbentang', f0=320)
cue(F('c07', 'Pengalaman') + fr(2), 'thock', -19, 'pelari jongkok di garis start', f0=200)
cue(F('c07', 'Pengalaman') + fr(7), 'thock', -15, 'judul Pengalaman.', f0=190)
cue(F('c07', 'semua'), 'whoosh', -21, 'pelari melesat', align='start', dur=0.3, lo=300, hi=900)
for i, t_ in enumerate(np.arange(F('c07', 'semua') + fr(3), F('c07', 'coba') + fr(4), fr(8))):
    cue(t_, 'tick', -25 + (i % 2), f'langkah kaki {i+1}')
cue(F('c07', 'semua'), 'glide', -24, 'garis coral memanjang di belakang pelari', dur=0.8)
cue(F('c07', 'coba') + fr(4), 'thud', -14, 'pelari tersandung, berhenti', f0=90, f1=45, dur=0.4)
cue(F('c07', 'coba') + fr(5), 'scribble', -19, 'tanda silang coral di lintasan')
cue(F('c07', 'coba') + fr(7), 'bloop', -23, 'keringat lelah', f0=300)
cue(F('c07', 'gagal'), 'subwhoosh', -16, 'kamera patah ke wide: seluruh jalur gagal terlihat', align='start')
for i, t_ in enumerate(np.arange(F('c07', 'gagal') + fr(1), F('c07', 'Direction') - fr(6), fr(8))):
    cue(t_, 'tick', -25 + (i % 2), f'langkah lagi {i+1}')
cue(F('c07', 'gagal') + fr(2), 'glide', -23, 'garis biru: tetap jalan', dur=0.7)
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
cue(F('c08', 'Rick') + fr(16), 'whoosh', -20, 'foto geser ke kiri', align='end', dur=0.4)
cue(F('c08', 'tidak') + fr(2), 'pop', -24, 'tidak bisa memainkan', f0=360)
cue(F('c08', 'memproduseri') + fr(4), 'whoosh', -22, 'lensa keluar kanan', align='end', dur=0.5, lo=300, hi=900)
cue(F('c08', 'memproduseri') + fr(2), 'pop', -23, 'memproduseri', f0=360)
cue(F('c08', 'memproduseri') + fr(16), 'whoosh', -18, 'sampul Cash naik', align='end', dur=0.3, lo=250, hi=900)
cue(F('c08', 'memproduseri') + fr(16), 'thud', -15, 'sampul Cash mendarat', f0=90, f1=45, dur=0.4)
cue(F('c08', 'Adele') - fr(12), 'glide', -22, 'v16: sampul Cash bergeser memberi ruang', dur=0.4)
cue(F('c08', 'Adele') + fr(10), 'whoosh', -18, 'sampul Adele naik', align='end', dur=0.35, lo=300, hi=1100)
cue(F('c08', 'Adele') + fr(10), 'thud', -14, 'sampul Adele mendarat', f0=110, f1=55, dur=0.4)
cue(F('c08', 'Yang') + fr(14), 'subwhoosh', -15, 'nama keluar + dunia putih naik', align='end', dur=0.5)
cue(F('c08', 'Yang') + fr(10), 'whoosh', -18, 'jendela studio (Logic) naik', align='start', dur=0.45)
cue(F('c08', 'hanya') - fr(6), 'glide', -24, 'kamera menyapu 8 take', dur=1.8)
_h0, _h1 = F('c08', 'hanya') - fr(4), F('c08', 'bagus') - fr(4)
for i in range(8): cue(_h0 + (_h1 - _h0) * i / 8, 'tick', -19, f'playhead melewati take {i+1}')
cue(F('c08', 'bagus') + fr(1), 'ping', -15, 'take 6 dipilih (chime)')
cue(F('c08', 'bagus') + fr(1), 'impact', -11, 'bagus. (serif biru)')
cue(F('c08', 'bagus') + fr(1), 'latch', -16, 'take 6 dipilih, pil bagus.')
cue(F('c09', 'AI') + fr(2), 'pop', -20, 'AI bisa', f0=300)
cue(F('c09', 'membuat') - fr(6), 'glide', -24, 'v15: "AI bisa" bergeser dari tengah ke atas', dur=0.4)
cue(F('c07', 'Cara') + fr(2), 'lens', -19, 'v15: loupe kaca muncul di landing page')
cue(F('c07', 'tahu') - fr(4), 'glide', -27, 'v15: judul "Cara melihat." keluar sebelum push', dur=0.3)
cue(F('c06', 'tidak') - fr(2), 'lens', -21, 'v15: lensa kaca di ladang titik')
for w in ('membuat', 'menciptakan', 'meniru'):
    cue(F('c09', w) - fr(3), 'whoosh', -22, f'frasa {w} masuk', align='end', dur=0.3)
    cue(F('c09', w) + fr(4), 'pop', -21, f'chip gambar {w}')
for i in range(7): cue(F('c09', 'membuat') + fr(2 + i * 5), 'pop', -24 + (i % 2), f'hasil {i+1} dilempar ke kipas')
for i in range(3): cue(F('c09', 'menciptakan') + fr(22 + i * 12), 'ding', -17, f'pesanan baru #{1001+i}')
cue(F('c09', 'meniru') + fr(10), 'typing', -14, 'AI menyalin tulisanmu', dur=1.2)
cue(F('c09', 'tapi') + fr(1), 'whoosh', -18, 'visual AI bisa keluar', align='end', dur=0.35)
cue(F('c09', 'tapi') + fr(10), 'pop', -23, 'tapi tidak dengan', f0=300)
cue(F('c09', 'seleramu') + fr(1), 'impact', -7, 'seleramu. (hit puncak 2)')
cue(F('c09', 'tapi') + fr(2), 'subwhoosh', -16, 'karya berputar seperti pusaran')
cue(F('c09', 'tidak') - fr(2), 'glide', -22, 'pusaran merapat jadi orbit', dur=0.8)
cue(F('c09', 'tapi') + fr(2), 'swell', -21, 'v15: lensa fisheye menekuk karya saat muncul', dur=0.4, align='start')
cue(F('c09', 'seleramu') + fr(12), 'whoosh', -19, 'v15: orbit terlempar keluar lewat lensa fisheye', align='start', dur=0.45)
cue(F('c09', 'seleramu') + fr(26), 'thud', -15, 'cut ke hitam: kartu kaca seleramu', f0=70, f1=36, dur=0.5)
for i, nm in enumerate(('ChatGPT', 'Claude', 'Gemini')): cue(F('c09', 'seleramu') + fr(30 + i * 3), 'whoosh', -26, f'kursor {nm} mendekat', align='start', dur=0.6)
cue(F('c09', 'seleramu') + fr(27), 'click', -20, 'kursor Kamu di dalam kartu')
mark = TOTAL - fr(74)
cue(mark + fr(2), 'pop', -18, 'wordmark jadisatu', f0=300)
cue(mark + fr(10), 'latch', -20, 'titik biru wordmark')

# earshot critique v8: unvoiced visual events
cue(F('c06', 'jarak') - fr(1), 'whoosh', -20, 'statement Ira Glass bilang -> grafik', align='end', dur=0.3)
cue(F('c06', 'tidak') - fr(4), 'click', -20, 'lensa muncul di ladang titik')
cue(7.73, 'pop', -24, 'S1 grafik: label/titik')

# v16 coverage pass (tools/visual_coverage.py): visual events that had no sound of their own
for t_, kind_, db_, vis_, kw_ in [
    (3.83, 'pop', -21, 'label JARAK + arsir selesai', {}),
    (6.88, 'subwhoosh', -16, '"the gap" larut, keluar ke grafik', {}),
    (9.60, 'tick', -20, 'titik karya di kurva putus-putus', {}), (9.87, 'tick', -20, 'titik karya berikutnya', {}),
    (12.00, 'whoosh', -20, 'kamera geser di grid kalimat', {'dur': 0.3}), (12.93, 'whoosh', -20, 'kamera geser ke baris taste', {'dur': 0.3}),
    (13.30, 'pop', -18, 'pil taste-mu + klip', {}), (14.30, 'subwhoosh', -18, 'kalimat utuh terlihat', {}),
    (17.50, 'glide', -21, 'halaman landing page mengalir', {'dur': 0.5}), (18.13, 'glide', -21, 'landing page bergulir', {'dur': 0.5}),
    (18.77, 'whoosh', -20, 'kamera mundur dari landing page', {'dur': 0.35}),
    (36.77, 'thud', -16, 'hasil reel pertama mendarat', {}), (41.37, 'glide', -20, 'hasil bergeser beri ruang', {'dur': 0.5}),
    (45.97, 'pop', -18, '"Ira Glass" naik', {}), (50.27, 'pop', -18, 'kata "AI"', {}), (50.70, 'pop', -18, 'kata "memberimu"', {}),
    (51.60, 'whoosh', -19, '"ribuan." keluar, ladang titik terbuka', {'dur': 0.4}), (54.00, 'glide', -20, 'lensa menyapu ladang titik', {'dur': 0.5}),
    (54.80, 'pop', -18, 'lensa menutup, 0 tertinggal', {}), (55.33, 'pop', -18, 'tiga kartu muncul', {}),
    (59.30, 'whoosh', -17, 'menyelam ke kartu 01', {'dur': 0.35}),
    (64.77, 'pop', -19, 'kartu arah desain muncul', {}), (65.03, 'pop', -19, 'kartu arah desain berikutnya', {}),
    (67.10, 'swell', -18, 'kartu terpilih membanjiri layar', {'dur': 0.4}), (68.90, 'lens', -18, 'loupe bergeser ke tombol', {}),
    (72.00, 'pop', -18, 'lensa jadi jendela foto', {}),
    (75.13, 'whoosh', -19, 'lensa Rick keluar', {'dur': 0.35}), (75.53, 'pop', -20, 'teks memproduseri', {}), (75.73, 'glide', -21, 'dunia biru naik', {'dur': 0.4}),
    (77.40, 'whoosh', -17, 'pergantian ke pasangan album', {'dur': 0.35}),
    (89.77, 'glide', -20, 'karya merapat ke orbit', {'dur': 0.4}), (89.97, 'tick', -20, 'orbit terkunci', {}),
    (33.33, 'click', -20, 'v18: sesi Claude baru (cut)', {}), (44.07, 'whoosh', -19, 'v18: kartu berubah jadi template identik', {'dur': 0.35}),
    (54.60, 'pop', -20, 'v18: lensa menutup di angka 0', {}), (78.47, 'whoosh', -19, 'v18: pindah ke studio', {'dur': 0.35}),
]:
    cue(t_, kind_, db_, 'v16 cakupan: ' + vis_, **kw_)

# ---------------- effect family (video/src/fx.json) → bound SFX
FXJ = json.load(open(f'{ROOT}/video/src/fx.json'))
for e in FXJ:
    t = e['abs'] / FPS if 'abs' in e else F(e['c'], e['w'], e.get('nth', 1)) + fr(e.get('off', 0))
    snd = {'neg': 'shutter', 'rgb': 'glitch', 'flash': 'shine'}[e['kind']]
    db = {'neg': -13, 'rgb': -25, 'flash': -27}[e['kind']]
    cue(t, snd, db, f"FX {e['kind']}: {e['why']}")
cue(F('c04', 'AI'), 'boom', -14, 'AI. slam (layer)')
cue(F('c09', 'seleramu') + fr(1), 'boom', -16, 'seleramu. (layer)')

# v16 (Irfan 18:52: audible on a phone at 20 %): sub-only hits vanish on phone speakers, so they get a warm
# harmonic layer (saturated low end, band-passed 250–1,400 Hz) — still no 2–6 kHz bite.
SUBK = {'thud', 'impact', 'boom', 'subwhoosh', 'thock', 'tick', 'swell'}
def presence(x, amt=0.55):
    low = lp(x, 260); h = np.tanh(6 * low / (np.max(np.abs(low)) + 1e-9))
    return x + amt * norm(bp(h, 250, 1400, 2), np.max(np.abs(x)))
# per-cue lifts written by tools/audio_phone.py --fix (phone-speaker audibility at 20 % volume)
CUE_GAIN = json.load(open(f'{ROOT}/tools/cue_gain.json')) if os.path.exists(f'{ROOT}/tools/cue_gain.json') else {}
# v18: every cue snapped to the picture (tools/sync_cues.py): shifted onto the visual onset, or dropped when nothing
# on screen starts there / when it would pile onto another sound of the same family within 100 ms.
for c in cues: c['key'] = f"{c['t']:.4f}|{c['kind']}"
_SYNC = json.load(open(f'{ROOT}/tools/cue_sync.json')) if os.path.exists(f'{ROOT}/tools/cue_sync.json') and '--nosync' not in sys.argv else {}
cues = [c for c in cues if _SYNC.get(c['key']) != 'drop']
for c in cues:
    v_ = _SYNC.get(c['key'])
    if isinstance(v_, (int, float)): c['t'] = round(c['t'] + v_, 4)
# ---------------- render SFX bus
sfxL = np.zeros(N); sfxR = np.zeros(N)
for ci, c in enumerate(cues):
    if c['kind'] in ELK or (c['kind'] in KEN and c['kind'] not in SYN):
        x = (ELK.get(c['kind']) or KEN[c['kind']])(**c['kw'])
        pk = int(np.argmax(np.abs(lp(x, 2000)) > 0.5 * np.max(np.abs(lp(x, 2000)))))
        start = c['t'] - (pk / SR if c['align'] == 'end' else 0)
    else:
        x = PAL[c['kind']](**c['kw'])
        start = c['t'] - (len(x) / SR if c['align'] == 'end' else 0)
    x = shape(x, c['kind'])  # v17 band discipline (no saturation)
    i0 = int(max(0, start) * SR)
    _boost = 6.0 if F('c09', 'AI') <= c['t'] < F('c09', 'seleramu') else 0.0  # v15: build act buried the slot SFX (−14.7 dB vs music)
    seg = x[: max(0, min(len(x), N - i0))] * 10 ** ((max(c['db'], -22) + _boost + CUE_GAIN.get(c['key'], 0)) / 20)  # v16: floor −22 dB — nothing too quiet for a phone at 20 %
    pan = 0.0 if c['kind'] in ('impact', 'boom', 'thud', 'typing') else (0.35 if ci % 2 else -0.35)
    gl, gr = np.cos((pan + 1) * np.pi / 4) * 1.414, np.sin((pan + 1) * np.pi / 4) * 1.414
    sfxL[i0:i0 + len(seg)] += seg * gl; sfxR[i0:i0 + len(seg)] += seg * gr
sfxL = hp(lp(sfxL, 9000, 6), 40); sfxR = hp(lp(sfxR, 9000, 6), 40)
# v16: bus glue — gentle compression lifts the quiet ticks/pops, then +5 dB so SFX read over the bed on a phone
from pedalboard import Pedalboard, Compressor, Limiter
_pb = Pedalboard([Compressor(threshold_db=-28, ratio=2.0, attack_ms=5, release_ms=150), Limiter(threshold_db=-3)])
_st = _pb(np.stack([sfxL, sfxR]).astype(np.float32) * 10 ** (1 / 20), SR).astype(np.float64)
sfxL, sfxR = _st[0], _st[1]
sfx = (sfxL + sfxR) / 2

# ---------------- VO bus
vob = np.zeros(N)
for c in vo['chunks']:
    x, sr = sf.read(f'{ROOT}/vo/v3/{c["id"]}_trim.wav')
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
# v10 Act 1 (0 → Sekarang): not a sad piano. Irfan 15:49: 0–22 s scored 2–5 because the piano felt like a slow
# motivational video under fast cuts. Tension bed instead: sub pulse + crisp ticks + filtered pluck arp at 112 bpm,
# drop-out on the dive into Ira, kick returns on "Bertahun", chords turn F–G–Am on "Dan rasa kecewa".
tA0, tA1 = 0.0, F('c02', 'Bertahun')
tB0 = F('c03', 'Sekarang')
def pluck(f0, dur=0.35, bright=2600):
    n_ = int(dur * SR); t = np.arange(n_) / SR
    x = sum(np.sin(2 * np.pi * f0 * h * t) / h for h in range(1, 9)) * np.exp(-t / 0.09)
    return lp(x, bright) * np.minimum(1, t / 0.002)
def subp(f0, dur):
    n_ = int(dur * SR); t = np.arange(n_) / SR
    return np.sin(2 * np.pi * f0 * t) * np.exp(-t / (dur * 0.5)) * np.minimum(1, t / 0.004)
def kick_():
    n_ = int(0.35 * SR); t = np.arange(n_) / SR
    f = 48 + 90 * np.exp(-t / 0.03)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.12)
def tick_():
    n_ = int(0.02 * SR); t = np.arange(n_) / SR
    return bp(rng.standard_normal(n_), 2500, 6000) * np.exp(-t / 0.004)
# v15 (Irfan 17:52): the synthesized acts 1–3 are replaced by ElevenLabs Music cues, one per act, each with a job
# (tools/el_music.py). Seams sit on act changes, where VO + transition SFX cover them; "berhenti" is a hard stop.
tB0 = F('c03', 'Sekarang'); tStop = F('c03', 'berhenti'); tF = F('c04', 'Faktanya'); tAI = F('c04', 'AI')
tPerl = F('c05', 'perlahan'); tS4 = F('c06', 'Ira'); tC = F('c07', 'Karena'); tA1 = F('c02', 'Bertahun')
def load_mp3(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64).reshape(-1, 2)
cueL = np.zeros(N); cueR = np.zeros(N); CUE_SEG = []
def put_cue(name, dst0, dst1, fin, fout, lufs, src0=0.0):
    x = load_mp3(f'{ROOT}/music/{name}.mp3'); s0 = int(src0 * SR)
    n_ = min(int((dst1 - dst0) * SR), len(x) - s0); seg = x[s0:s0 + n_].copy()
    L_ = pyln.Meter(SR).integrated_loudness(seg); seg *= 10 ** ((lufs - L_) / 20)
    e = np.ones(n_); a_ = max(1, int(fin * SR)); b_ = max(1, int(fout * SR))
    e[:a_] = np.linspace(0, 1, a_) ** 0.5; e[n_ - b_:] *= np.linspace(1, 0, b_) ** 0.5   # equal-power-ish crossfades
    i_ = int(dst0 * SR); cueL[i_:i_ + n_] += seg[:, 0] * e; cueR[i_:i_ + n_] += seg[:, 1] * e
XF_ = 0.35
put_cue('c1_opening', 0.0, tA1 + XF_, 0.06, XF_, -26.0)                       # hook: sub pulse + ticks, impact from frame 0
put_cue('c2_longing', tA1 - XF_, tB0 + 0.3, XF_, 0.3, -28.5)                    # bittersweet but driving (no sad piano)
put_cue('c3_accel', tB0 - 0.3, tStop, 0.3, 0.025, -27.0)                         # rising tension → HARD stop on "berhenti"
# the stop is a held breath, not a hole: a low drone sits under the first second of c4 (rule 32)
_tb = tStop + 0.04; _dl = tAI - _tb + 0.3
place(mus, pad([nt(33), nt(40), nt(45)], _dl, 0.12, 1.2), _tb, 0.13)
put_cue('c4_stopped', tStop + 0.03, tAI + 0.25, 0.05, 0.25, -30.0)               # held breath: drone + swell into AI.
put_cue('c5_pressure', tAI - 0.02, tPerl + 0.5, 0.02, 0.5, -27.0, src0=0.0)      # braam on AI. + dark drive
put_cue('c6_void', tPerl - 0.5, tC + 0.9, 0.5, 1.2, -29.5)                       # sameness → void (heartbeat)

# 4–5: the track (stereo, not reverbed; added after the synth bus)
def load_st(name):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f'{ROOT}/sfx/{name}', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64).reshape(-1, 2)
trk = load_st('nightfall-future-bass-music-228100.mp3')
tD = F('c08', 'Rick'); tSel = F('c09', 'seleramu')
trkL = np.zeros(N); trkR = np.zeros(N)
def put(src0, dst0, dst1, fin=0.05, fout=0.05):
    i0 = int(dst0 * SR); n_ = int((dst1 - dst0) * SR); s0 = int(src0 * SR)
    seg = trk[s0:s0 + n_].copy(); n_ = len(seg)
    e = np.ones(n_); a_ = int(fin * SR); b_ = int(fout * SR)
    e[:a_] = np.linspace(0, 1, a_); e[n_ - b_:] *= np.linspace(1, 0, b_)
    trkL[i0:i0 + n_] += seg[:, 0] * e; trkR[i0:i0 + n_] += seg[:, 1] * e
put(0.0, tC - 1.6, tD + 0.25, fin=1.3, fout=0.5)  # intro: bells / music box (hope)
DROP = 96.06  # track drop (librosa beat + RMS jump), aligned to "seleramu."
off = DROP - tSel
end_t = TOTAL
put(tD - 0.25 + off, tD - 0.25, end_t, fin=0.5, fout=2.2)  # breakdown → build → drop on seleramu
_r0 = F('c09', 'AI') - 0.2
place(mus, pad([nt(33), nt(45)], tSel - _r0, 1.0, 0.2), _r0, 0.3)
_rs = int((tSel - (tSel - 1.6)) * SR); _rt = np.arange(_rs) / SR
place(mus, lp(pink(_rs), 2500) * (_rt / _rt[-1]) ** 2 * 0.6, tSel - 1.6)
TRK_SEG = [(tC - 1.6, tD + 0.25, -32.0), (tD + 0.25, tSel - 0.05, -30.5), (tSel - 0.05, end_t, -25.0)]
# reverb (simple exponential-noise IR)
ir_n = int(2.2 * SR); ir = rng.standard_normal(ir_n) * np.exp(-np.arange(ir_n) / SR / 0.55); ir = lp(ir, 3500)
wet = ss.fftconvolve(mus, ir)[:N]; mus = mus + 0.25 * norm(wet, np.max(np.abs(mus)) + 1e-9)
mus = lp(mus, 6000)
# sidechain duck under VO (8 dB)
venv = ss.lfilter([1 - np.exp(-1 / (0.25 * SR))], [1, -np.exp(-1 / (0.25 * SR))], np.abs(vob))
venv = venv / (np.max(venv) + 1e-9)
# v16: music also dips 3 dB under each SFX hit (sidechain from the SFX bus) so objects cut through
senv = ss.lfilter([1 - np.exp(-1 / (0.06 * SR))], [1, -np.exp(-1 / (0.06 * SR))], np.abs(sfx)); senv = senv / (np.percentile(senv, 99.5) + 1e-9)
duck_s = 10 ** (-1.5 * np.clip(senv, 0, 1) / 20)  # v17: 3→1.5 dB, no audible pumping
duck = 10 ** (-8 * np.clip(venv * 6, 0, 1) / 20) * duck_s
mus = mus * duck
# v16: two-band duck. The speech band (≥ 300 Hz) of the music gets out of the voice's way (−11 dB), the low end only
# dips −4 dB so the bed keeps its weight. Clear VO on a phone without the music feeling switched off.
_v = np.clip(venv * 6, 0, 1)
duck_hi = 10 ** (-11 * _v / 20) * duck_s; duck_lo = 10 ** (-4 * _v / 20) * duck_s
def duck2(x):
    lo_ = lp(x, 300, 2); return lo_ * duck_lo + (x - lo_) * duck_hi
trkL, trkR, cueL, cueR = duck2(trkL), duck2(trkR), duck2(cueL), duck2(cueR)

# ---------------- mix + loudness
vob = norm(vob, 0.5)
_seg = mus[int((tSel - 8) * SR):int(tSel * SR)]
mus = mus * 10 ** ((-33.0 - pyln.Meter(SR).integrated_loudness(_seg)) / 20)  # v15: synth bus is only the pre-drop pad/riser now
_m = pyln.Meter(SR)
for a_, b_, tgt in TRK_SEG:
    i0_, i1_ = int(a_ * SR), int(b_ * SR)
    L = _m.integrated_loudness(np.stack([trkL[i0_:i1_], trkR[i0_:i1_]], 1))
    g_ = 10 ** ((tgt - L) / 20)
    trkL[i0_:i1_] *= g_; trkR[i0_:i1_] *= g_
# v17: SFX step 3 dB aside while a word is spoken (speech-band clarity); between words they keep full level
_dv = 10 ** (-3 * np.clip(venv * 6, 0, 1) / 20); sfxL = sfxL * _dv; sfxR = sfxR * _dv; sfx = sfx * _dv
sfx_ = sfx * 0.5
d = int(0.011 * SR)
musR = np.concatenate([np.zeros(d), mus[:-d]])
musL = mus; musR = 0.55 * mus + 0.45 * musR; musL = 0.55 * mus + 0.45 * np.concatenate([mus[d // 2:], np.zeros(d // 2)])  # v14: wider (earshot: side −17 dB)
_mid = (trkL + trkR) / 2; _sid = (trkL - trkR) / 2 * 1.85; trkL = _mid + _sid; trkR = _mid - _sid
_cm = (cueL + cueR) / 2; _cs = (cueL - cueR) / 2 * 1.7; cueL = _cm + _cs; cueR = _cm - _cs
# v17: smoother bed — high shelf −3 dB above ~5 kHz (hat edge) and −2 dB under 70 Hz (less throb fatigue)
from pedalboard import HighShelfFilter, LowShelfFilter
_eq = Pedalboard([HighShelfFilter(cutoff_frequency_hz=5000, gain_db=-3.0), LowShelfFilter(cutoff_frequency_hz=70, gain_db=-2.0)])
for _a in ('cue', 'trk'):
    _st = _eq(np.stack([globals()[_a + 'L'], globals()[_a + 'R']]).astype(np.float32), SR).astype(np.float64)
    globals()[_a + 'L'], globals()[_a + 'R'] = _st[0], _st[1]
mixL = vob + musL + trkL + cueL + sfxL * 0.5; mixR = vob + musR + trkR + cueR + sfxR * 0.5
mix = (mixL + mixR) / 2
meter = pyln.Meter(SR)
n_ = int(TOTAL * SR)
X = np.stack([mixL[:n_], mixR[:n_]], 1)
X = X * 10 ** ((-14 - meter.integrated_loudness(X)) / 20)
from scipy.ndimage import maximum_filter1d
def limit(X, ceil_db=-1.5):
    c = 10 ** (ceil_db / 20)
    up = np.max([np.abs(ss.resample_poly(X[:, ch], 4, 1)).reshape(-1, 4).max(1)[: len(X)] for ch in range(2)], 0)
    need = np.minimum(1, c / (up + 1e-9))
    la = int(0.005 * SR)
    g0 = -maximum_filter1d(-need, size=2 * la + 1)
    rel = np.exp(-1 / (0.08 * SR))
    g = ss.lfilter([1 - rel], [1, -rel], g0 - 1) + 1
    g = np.minimum(g, g0)
    return X * g[:, None]
for _ in range(3):
    X = limit(X)
    X = X * 10 ** ((-14 - meter.integrated_loudness(X)) / 20)
X = limit(X)
mix = X.mean(1)
print('LUFS', round(meter.integrated_loudness(X), 2), 'peak dBTP~', round(20 * np.log10(np.max(np.abs(ss.resample_poly(X[:, 0], 4, 1)))), 2))
sf.write(f'{ROOT}/render/mix.wav', X.astype(np.float32), SR, subtype='PCM_24')
sf.write(f'{ROOT}/render/stem_vo.wav', vob[: len(mix)].astype(np.float32), SR)
sf.write(f'{ROOT}/render/stem_music.wav', (mus + (trkL + trkR) / 2 + (cueL + cueR) / 2)[: len(mix)].astype(np.float32), SR)
sf.write(f'{ROOT}/render/stem_sfx.wav', sfx_[: len(mix)].astype(np.float32), SR)
json.dump(cues, open(f'{ROOT}/render/cues.json', 'w'), indent=1)
print('cues', len(cues))
