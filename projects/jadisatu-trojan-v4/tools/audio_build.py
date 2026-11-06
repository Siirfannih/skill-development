"""Audio Trojan v4: VO (−14 LUFS) + musik m4_eq (di bawah VO) + SFX per event visual. Cue terikat ke jangkar kata vo.json,
sama dengan adegan Remotion (src/scenes/*). Tulis render/cues.json, render/stem_{vo,music,sfx}.wav, render/mix.wav,
lalu salin mix ke remotion/public/mix.wav.   Pakai: audio_build.py [--sync tools/cue_sync.json]"""
import json, os, sys, subprocess, functools, numpy as np, soundfile as sf, pyloudnorm as pl
from pedalboard import Pedalboard, HighpassFilter, LowpassFilter, PeakFilter, Limiter, Gain
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); SR = 48000; FPS = 30
vo = json.load(open(f'{P}/remotion/src/vo.json')); W = vo['words']; TOTAL = vo['total']
SK = os.path.expanduser('~/sfx/Kenyset'); SI = os.path.expanduser('~/sfx/SFXIrfan')
EL = os.path.expanduser('~/work/skill-development/projects/jadisatu-60s/remotion/sfx-el'); PE = f'{P}/sfx-el'
def clean(w): return w.replace('"', '')
def ws(b, p, n=1):
    k = 0
    for w in W:
        if w['b'] == b and clean(w['w']).lower().startswith(p.lower()):
            k += 1
            if k == n: return w['s']
    raise KeyError((b, p, n))
def we(b, p, n=1):
    k = 0
    for w in W:
        if w['b'] == b and clean(w['w']).lower().startswith(p.lower()):
            k += 1
            if k == n: return w['e']
def fr(x): return round(x * FPS)
def wf(b, p, n=1): return fr(ws(b, p, n))
def wef(b, p, n=1): return fr(we(b, p, n))
BEAT = {b['b']: (fr(b['s']), fr(b['e'])) for b in vo['beats']}
F = lambda x: x / FPS  # frame → detik

# ---------- palet: satu peran = satu bunyi sepanjang video ----------
PAL = {
  'pop':     (f'{SK}/pop-up-notify-smooth-modern-332448.mp3', 0.45, 'ui'),     # kartu/UI/emoji muncul
  'land':    (f'{SK}/soft-subtle-ui-pop-sfx-348820.mp3', 0.40, 'ui'),         # tile/chip mendarat, cluster
  'word':    (f'{SI}/Kinetictypography(gunakansecaraacak).mp3', 0.3, 'ui'),   # kata penekanan / teks diegetik (SFXIrfan)
  'tick':    (f'{EL}/v17_tick_1.mp3', 0.25, 'ui'),                            # orbit, tanggal, slider, jam
  'click':   (f'{SK}/mouse-click-290204.mp3', 0.30, 'ui'),                    # kursor/jari menekan
  'typing':  (f'{SK}/iphone-keyboard-typing-sound-effect-336778.mp3', None, 'ui'),
  'send':    (f'{SK}/message-envoye-iphone-apple-391098.mp3', 0.6, 'ui'),      # pesan terkirim
  'notif':   (f'{SI}/Notif.mp3', 0.9, 'ui'),                                  # pesan masuk WA
  'ding':    (f'{SK}/notification-pluck-off-269290.mp3', 0.9, 'ui'),          # saran, siap pakai, kredit
  'buzz':    (f'{SK}/sfx-erreur-363728.mp3', 0.6, 'ui'),                      # nggak cocok
  'lock':    (f'{SK}/confirm-tap-394001.mp3', 0.5, 'ui'),                     # Rp0 terkunci
  'paper':   (f'{PE}/paper_flip.mp3', 0.8, 'texture'),                        # buku
  'drawer':  (f'{PE}/drawer.mp3', 0.9, 'texture'),                            # laci
  'whoosh':  ([f'{SK}/swoosh-2-359826.mp3', f'{SK}/simple-whoosh-382724.mp3', f'{SK}/universfield-swoosh-023-454830.mp3'], 0.9, 'motion'),
  'riser':   (f'{EL}/riser_0.mp3', None, 'motion'),
  'thud':    (f'{EL}/v17_thud_1.mp3', 1.0, 'low'),
  'shine':   (f'{SK}/shine-6-268910.mp3', 1.4, 'ui'),                          # Gratis
}
def dec(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)
def band(x, fam):
    x = x.astype(np.float32)[None, :]
    if fam == 'ui': pb = Pedalboard([HighpassFilter(300), LowpassFilter(8000), PeakFilter(3600, -4, 1.0)])
    elif fam == 'motion': pb = Pedalboard([HighpassFilter(400), LowpassFilter(2500)])
    elif fam == 'texture': pb = Pedalboard([HighpassFilter(400), LowpassFilter(2600)])
    else: pb = Pedalboard([LowpassFilter(2000), HighpassFilter(40)])
    return pb(x, SR)[0].astype(np.float64)
@functools.lru_cache(None)
def sample(path, maxdur, fam):
    x = dec(path)
    if fam == 'texture':  # kertas/laci: mulai 40 ms sebelum transien utama
        pk = int(np.argmax(np.abs(x))); x = x[max(0, pk - int(0.04 * SR)):]
    nz = np.where(np.abs(x) > 0.02 * np.max(np.abs(x)))[0]
    x = x[max(0, nz[0] - int(0.002 * SR)):] if len(nz) else x
    if maxdur: x = x[:int(maxdur * SR)].copy()
    fade = min(len(x) // 3, int(0.03 * SR)); x[-fade:] *= np.linspace(1, 0, fade)
    x = band(x, fam)
    return x / (np.max(np.abs(x)) + 1e-9)
RR = {}
def get(kind, dur=None):
    path, md, fam = PAL[kind]
    if isinstance(path, list):
        i = RR.get(kind, 0); RR[kind] = i + 1; path = path[i % len(path)]
    if kind == 'typing':
        x = dec(path); n = int(dur * SR)
        r = np.sqrt(np.convolve(x ** 2, np.ones(2400) / 2400, 'same')); o = int(np.argmax(r > 0.25 * r.max()))  # mulai di bagian yang sedang mengetik
        y = x[o:o + n].copy(); f_ = int(0.04 * SR); y[-f_:] *= np.linspace(1, 0, f_); y[:f_] *= np.linspace(0, 1, f_)
        y = band(y, 'ui'); return y / (np.max(np.abs(y)) + 1e-9), fam
    if kind == 'riser':
        x = sample(path, None, fam); n = int(dur * SR); pk = int(np.argmax(np.abs(x))); y = x[max(0, pk - n):pk + int(0.03 * SR)].copy()
        f_ = len(y) // 3; y[:f_] *= np.linspace(0, 1, f_); return y, fam
    return sample(path, md, fam), fam

# ---------- lembar cue (frame dari jangkar yang sama dengan adegan) ----------
cues = []
def cue(fr_, kind, db, visual, align='start', **kw): cues.append(dict(t=round(F(fr_), 4), kind=kind, db=db, visual=visual, align=align, kw=kw))
# B01 hook
for p in ['Gimana', 'semudah', 'ayang']: cue(wf('b01', p) + 1, 'word', -21, f'kata {p} naik')
cue(1, 'pop', -19, 'emoji balon chat (frame 0)')
for p, lbl in [('nyatet', 'emoji buku'), ('keuangan', 'emoji kantong uang')]: cue(wf('b01', p) + 3, 'pop', -22, lbl)
cue(wf('b01', 'ayang') + 4, 'notif', -18, 'bubble "udah makan belum?"')
cue(wf('b01', 'WhatsApp') + 1, 'pop', -19, 'logo WhatsApp + kata')
cue(wf('b01', 'WhatsApp') + 6, 'send', -20, 'bubble kedua')
cue(wf('b01', 'WhatsApp') + 13, 'word', -22, 'bubble jadi "jual 12 risol 60rb"')
s2 = BEAT['b02'][0]
cue(s2 - 3, 'whoosh', -18, 'whip ke orbit', align='peak')
for k, d in enumerate([4, 8, 12]): cue(s2 + d + 2, 'tick', -26, f'ikon orbit kecil {k}')
cue(wf('b02', 'ribet') + 2, 'word', -18, 'pill ribet')
cue(wf('b02', 'buku') + 2, 'paper', -19, 'buku')
cue(wf('b02', 'Excel') + 2, 'pop', -19, 'tile Excel')
cue(wf('b02', 'laci') + 2, 'drawer', -19, 'laci')
cue(wf('b02', 'nggak') - 1, 'land', -19, 'kartu catatan + laci muncul')
cue(wf('b02', 'cocok') + 1, 'buzz', -18, 'angka beda menyala + getar')
s3 = BEAT['b03'][0]
cue(s3 - 4, 'whoosh', -18, 'tarik ke atas → carousel', align='peak')
cue(s3 - 4, 'pop', -21, 'kartu lapak')
cue(wf('b03', 'atau') + 1, 'whoosh', -22, 'kamera geser ke kartu 2', align='peak')
cue(wf('b03', 'atau') - 2, 'pop', -22, 'kartu titip')
cue(wf('b03', 'toko') + 3, 'whoosh', -22, 'kamera geser ke toko', align='peak')
cue(wf('b03', 'toko') - 2, 'pop', -22, 'kartu toko')
for i in range(3): cue(wf('b03', 'masalahnya') + 3 + i * 5, 'land', -21 + i, f'buku sama di kartu {i+1}')
for i in range(3): cue(wf('b03', 'dicatat') - 1 + i * 3, 'tick', -22, f'tanda silang {i+1}')
s4 = BEAT['b04'][0]
cue(s4 - 1, 'riser', -23, 'push-through ke buku', align='end', dur=0.35)
cue(s4 + 1, 'thud', -20, 'mendarat di chat WA')
cue(wf('b04', 'Jadisatu') + 2, 'pop', -20, 'logo Jadisatu Workspace')
cue(wf('b04', 'chat') + 2, 'whoosh', -24, 'kamera zoom ke thread', align='peak')
tj, tr1, tb, tr2 = wf('b04', 'jual'), wef('b04', 'ribu', 1), wf('b04', 'beli'), wef('b04', 'ribu', 2)
cue(tj - 3, 'typing', -23, 'ketik "jual 12 risol 60rb"', dur=F(tr1 - tj + 3))
cue(tr1 + 2, 'send', -19, 'kirim pesan 1')
cue(tr1 + 3 + 12 + 1, 'notif', -19, 'balasan "Tercatat" pemasukan')
cue(tb - 4, 'typing', -23, 'ketik "beli gas 25rb"', dur=F(tr2 - tb + 4))
cue(tr2 + 2, 'send', -19, 'kirim pesan 2')
cue(tr2 + 3 + 12 + 1, 'notif', -19, 'balasan "Tercatat" pengeluaran')
cue(wf('b04', 'langsung') - 2, 'whoosh', -21, 'kamera mundur, HP ke kiri', align='peak')
cue(wf('b04', 'langsung') + 2, 'pop', -21, 'dua kolom muncul')
cue(wf('b04', 'pemasukan') + 6, 'land', -19, 'baris mendarat di Pemasukan')
cue(wf('b04', 'pengeluaran') + 6, 'land', -19, 'baris mendarat di Pengeluaran')
tT = wf('b05', 'Terus')
cue(tT - 2, 'whoosh', -22, 'HP kembali ke tengah', align='peak')
cue(tT + 3, 'pop', -21, 'chip jam muncul')
for k in range(4): cue(tT + 9 + k * 5, 'tick', -25, f'jam bergulir {k}')
cue(wf('b05', 'laporan') - 8, 'whoosh', -24, 'kamera zoom ke laporan', align='peak')
cue(wf('b05', 'laporan') - 1, 'notif', -17, 'laporan harian 18.00 masuk')
tap = wf('b05', 'WhatsApp') + 2
cue(tap, 'click', -18, 'jari mengetuk link')
t0 = tap + 4
cue(t0 + 5, 'whoosh', -20, 'dasbor lahir dari link', align='peak')
for k, d in enumerate([11, 17]): cue(t0 + d + 2, 'land', -23, f'KPI {2*k+1}-{2*k+2}')
cue(t0 + 26, 'tick', -24, 'grafik tumbuh')
cue(t0 + 32, 'land', -24, 'daftar terlaris')
tK = wf('b06', 'kapan')
cue(tK - 22, 'word', -21, 'sorot Perlu restock')
cue(tK - 4, 'whoosh', -19, 'dorong ke kartu stok', align='peak')
cue(tK + 3, 'pop', -21, 'kalender muncul')
cue(wf('b06', 'habis') - 1, 'tick', -19, 'tanggal 19 dipilih')
cue(wf('b06', 'habis') + 5, 'word', -20, 'chip habis')
cue(wf('b06', 'dibeli') - 3, 'ding', -18, 'kartu saran belanja')
tKl = wf('b06', 'kalau')
cue(tKl + 6, 'whoosh', -19, 'geser ke akun cabang', align='peak')
cue(tKl + 9, 'land', -21, 'chip Cabang 1')
cue(wf('b06', 'tambahin'), 'click', -17, 'klik Tambah cabang')
cue(wf('b06', 'cabangnya') - 1, 'land', -19, 'chip Cabang 2')
cue(wf('b06', 'cabangnya') + 9, 'land', -19, 'chip Cabang 3')
cue(wf('b06', 'satu') - 1, 'word', -21, 'satu akun menyala')
s7 = BEAT['b07'][0]
cue(s7, 'whoosh', -18, 'whip ke slider', align='peak')
cue(s7 - 1, 'pop', -21, 'kartu slider')
cue(wf('b07', 'mulai') - 1, 'land', -23, 'emoji kilau')
cue(wf('b07', 'kecil') - 3, 'land', -22, 'lapak dari beat 3 kembali')
cue(wf('b07', 'cobain') - 6, 'click', -19, 'kursor pegang slider')
for k in range(4): cue(wf('b07', 'cobain') - 1 + k * 5, 'tick', -24, f'slider bergeser {k}')
cue(wf('b07', 'gratis') - 9, 'lock', -18, 'Rp0 terkunci')
cue(wf('b07', 'gratis') - 1, 'shine', -16, 'kartu Gratis (aksen hangat)')
s8 = BEAT['b08'][0]
cue(s8 - 2, 'whoosh', -18, 'whip ke usaha contoh + kartu Risol Bu Sari', align='peak')
for k in range(0, 8, 2): cue(s8 + 5 + k * 3, 'land', -25 + (k % 4) / 2, f'tile foto {k+1}-{k+2}')
cue(wf('b08', 'belum') - 1, 'word', -21, 'chip belum maksimal')
cue(wf('b08', 'kami') - 1, 'whoosh', -20, 'carousel platform masuk', align='peak')
tKe, tWe, tOp, tSa = wf('b08', 'kelola') - 4, wf('b08', 'website') - 6, wf('b08', 'optimasi') - 2, wf('b08', 'sampai')
for k in range(0, 12, 3): cue(tKe + 3 + k * 2, 'land', -25, f'post IG {k+1}-{k+3}')
cue(tKe + 19, 'word', -22, 'label Dijadwalkan')
for t_, nm in [(tWe, 'website'), (tOp, 'Google Bisnis'), (tSa, 'Workspace')]:
    cue(t_ - 8, 'click', -19, f'klik panah → {nm}')
    cue(t_ - 2, 'whoosh', -21, f'slide ke {nm}', align='peak')
cue(tWe + 4, 'pop', -22, 'hero website'); cue(tWe + 12, 'land', -24, 'kartu menu'); cue(tWe + 23, 'pop', -22, 'tombol Pesan via WhatsApp')
cue(tOp + 12, 'click', -20, 'kursor ubah jam'); cue(tOp + 17, 'word', -22, 'jam jadi 21.00')
cue(tOp + 23, 'land', -22, 'foto diunggah'); cue(tOp + 27, 'typing', -25, 'tulis update', dur=0.5)
cue(wf('b08', 'pakai') - 1, 'ding', -19, 'siap pakai')
s9 = BEAT['b09'][0]
cue(s9, 'whoosh', -21, 'whip ke kolom komentar', align='peak')
cue(s9 - 1, 'pop', -21, 'kolom komentar')
tW9, tW9e = wf('b09', 'workspace'), wef('b09', 'workspace')
cue(tW9 - 2, 'typing', -23, 'ketik workspace', dur=F(tW9e - tW9 + 2))
cue(tW9e + 1, 'send', -19, 'komentar terkirim')
cue(wf('b09', 'akses') - 7, 'pop', -21, 'dua chip muncul')
cue(wf('b09', 'akses'), 'click', -18, 'pilih Akses gratis')
cue(wf('b09', 'DM') - 1, 'land', -21, 'emoji amplop DM')
cue(wf('b09', 'paket'), 'click', -18, 'pilih Paket kreatif')
s10 = BEAT['b10'][0]
cue(s10 - 3, 'whoosh', -22, 'potong ke layar gelap', align='peak')
tEnd = wef('b10', 'bikin')
cue(tEnd + 15, 'ding', -18, 'logo Jadisatu')
cue(tEnd + 27, 'land', -22, 'bubble pembuka kembali')

# ---------- sinkron dari render (opsional) ----------
OFFS = {'word': 2.0, 'tick': 3.5, 'land': 3.5, 'typing': 4.5}
CAP = {'word': 2.0, 'typing': 0.0, 'click': 1.5, 'tick': 3.5, 'land': 4.0, 'pop': 5.5, 'thud': 0.0, 'notif': 3.0}  # batas atas gain HP agar median kelas tetap di rentang Modul 5  # kalibrasi kelas ke target Modul 5 §14.10
GAIN = json.load(open(f'{P}/tools/cue_gain_anchor.json')) if os.path.exists(f'{P}/tools/cue_gain_anchor.json') else {}
sync = {}
if '--sync' in sys.argv: sync = json.load(open(sys.argv[sys.argv.index('--sync') + 1]))
N = int((TOTAL + 0.5) * SR)
stem_sfx = np.zeros(N)
placed = []
for c in cues:
    key = f"{c['t']:.4f}|{c['kind']}"
    sh = sync.get(key, 0)
    if sh == 'drop': continue
    t = c['t'] + sh
    x, fam = get(c['kind'], c['kw'].get('dur'))
    g = 10 ** ((c['db'] + OFFS.get(c['kind'], 0) + min(GAIN.get(key, 0), CAP.get(c['kind'], 8))) / 20)
    if c['align'] == 'peak': t -= np.argmax(np.abs(x)) / SR
    elif c['align'] == 'end': t -= len(x) / SR
    i0 = int(max(0, t) * SR); seg = x[: max(0, min(len(x), N - i0))] * g
    stem_sfx[i0:i0 + len(seg)] += seg
    placed.append({**c, 't_placed': round(t, 4), 't_hit': round(max(0, t) + int(np.argmax(np.abs(x))) / SR, 4), 'family': fam})
os.makedirs(f'{P}/render', exist_ok=True)
json.dump(cues, open(f'{P}/render/cues_anchor.json', 'w'), ensure_ascii=False, indent=0)
# cues.json = untuk sync_cues (--anchors) berisi jangkar; selain itu waktu bunyi nyata (dipakai audio_phone / visual_coverage)
json.dump(cues if '--anchors' in sys.argv else [{**q, 't': q['t_hit']} for q in placed], open(f'{P}/render/cues.json', 'w'), ensure_ascii=False, indent=0)
json.dump(placed, open(f'{P}/render/placed.json', 'w'), ensure_ascii=False, indent=0)

# ---------- VO ----------
meter = pl.Meter(SR)
v, sr_ = sf.read(f'{P}/vo/vo.wav'); v = v if v.ndim == 1 else v.mean(1)
v = Pedalboard([HighpassFilter(70), PeakFilter(3000, 2, 1.0)])(v.astype(np.float32)[None, :], SR)[0].astype(np.float64)
v = np.pad(v, (0, max(0, N - len(v))))[:N]
v *= 10 ** ((-14 - 3 - meter.integrated_loudness(v)) / 20)  # mono diputar 2 kanal: −3 dB = −14 LUFS stereo
for b in vo['beats']:  # tiap blok VO −14 LUFS (Modul 5), ramp 30 ms di tepi
    a_, c_ = int(b['s'] * SR), int(b['e'] * SR); gb = 10 ** ((-17.2 - meter.integrated_loudness(v[a_:c_])) / 20)
    r_ = int(0.03 * SR); e_ = np.ones(c_ - a_) * gb; e_[:r_] = np.linspace(1, gb, r_); e_[-r_:] = np.linspace(gb, 1, r_); v[a_:c_] *= e_
# ---------- musik ----------
m, srm = sf.read(f'{P}/music/m4_eq.wav'); m = m.T.astype(np.float32)
m = m[:, int(0.42 * SR):]  # buang hening awal track agar frame 0 tidak bolong
from pedalboard import LowShelfFilter
m = Pedalboard([PeakFilter(1250, -1.8, 1.4), PeakFilter(3000, -2, 1.0), LowShelfFilter(100, 9, 0.7)])(m, SR).astype(np.float64)
m = np.pad(m, ((0, 0), (0, max(0, N - m.shape[1]))))[:, :N]
lvl = meter.integrated_loudness(m.T)
MUS = float(os.environ.get('MUS_LUFS', -23.3))
m *= 10 ** ((MUS - lvl) / 20)
env = np.ones(N)
# naik +2 dB di sebelum VO (frame 0) dan saat layar kredit setelah VO selesai, ramp ≥ 250 ms
def ramp(a, b, g0, g1):
    i0, i1 = int(a * SR), int(b * SR); env[i0:i1] = np.linspace(g0, g1, i1 - i0)
end_speech = W[-1]['e']
ramp(end_speech + 0.1, end_speech + 0.6, 1.0, 10 ** (3 / 20)); env[int((end_speech + 0.6) * SR):] = 10 ** (3 / 20)
fo = int(1.6 * SR); env[N - fo:] *= np.linspace(1, 0, fo) ** 1.5
m *= env
# ---------- mix ----------
stereo = lambda x: np.vstack([x, x])
mix = stereo(v) + m + stereo(stem_sfx)
sf.write(f'{P}/render/stem_mix_raw.wav', mix.T, SR, subtype='PCM_24'); sf.write(f'{P}/render/stem_dialog_g.wav', v, SR, subtype='PCM_24')
CLS = {'pop': 'ui_pop', 'land': 'land_soft', 'word': 'text_pop', 'click': 'ui_click', 'tick': 'micro_tick', 'typing': 'type_key', 'send': 'ui_pop', 'notif': 'ui_pop', 'ding': 'ui_pop', 'lock': 'ui_click'}
json.dump([{'class': CLS.get(q['kind'], q['kind']), 'start': q['t_placed'], 'visual': q['visual']} for q in placed], open(f'{P}/render/placed_m5.json', 'w'), ensure_ascii=False)
json.dump({'blocks': [{'name': b['b'], 'kind': 'vo', 't': b['s'], 'dur': b['e'] - b['s']} for b in vo['beats']]}, open(f'{P}/render/timeline.json', 'w'))
L = meter.integrated_loudness(mix.T)
mix *= 10 ** ((-14.2 - L) / 20)
def peak_limit(x, thr_db=-1.5, look=0.004, rel=0.08):
    """limiter lookahead sederhana (puncak 4× oversampling, tanpa makeup gain)"""
    from scipy.signal import resample_poly
    from scipy.ndimage import minimum_filter1d
    thr = 10 ** (thr_db / 20)
    up = np.max(np.abs(resample_poly(x, 4, 1, axis=1)), axis=0).reshape(-1, 4).max(1)[: x.shape[1]]
    g = np.minimum(1.0, thr / (up + 1e-12))
    n = int(look * SR); g = minimum_filter1d(g, 2 * n + 1)
    a = np.exp(-1 / (rel * SR)); out = np.empty_like(g); cur = 1.0
    for i in range(len(g)):  # attack instan, release eksponensial
        cur = g[i] if g[i] < cur else a * cur + (1 - a) * g[i]; out[i] = cur
    return x * out
mix = peak_limit(mix, -1.6)
for name, x in (('stem_vo', stereo(v)), ('stem_music', m), ('stem_sfx', stereo(stem_sfx)), ('mix', mix)):
    sf.write(f'{P}/render/{name}.wav', x.T, SR, subtype='PCM_24')
sf.write(f'{P}/remotion/public/mix.wav', mix.T, SR, subtype='PCM_24')
print('cues', len(cues), 'placed', len(placed), 'mix LUFS', round(meter.integrated_loudness(mix.T), 2))
