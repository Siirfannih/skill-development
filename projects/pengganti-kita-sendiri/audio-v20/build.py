"""PKS audio v20 - build dari nol (sesi baru, tanpa settingan lama).

Alur:
  1. baca penanda SFXEV dari render v11final, koreksi dari gambar (DROP / REMAP di bawah, alasan di SOUND-MAP.md);
  2. tiap peristiwa -> satu keluarga bunyi (kata kode nama file Irfan), varian dirotasi;
  3. jangkar penempatan per keluarga: transien = onset di frame; whoosh = puncak di gerak kamera tercepat;
     riser = puncak di akhir; impact = onset hit utama di frame;
  4. level SFX relatif ke VO proyek ini (punch VO = persentil-95 RMS 50 ms ucapan);
  5. backsound: level per bagian relatif ke VO (LU di bawah VO), naik di jeda VO, tanpa lubang hening;
  6. VO dikompres ringan (tanpa ubah tempo/pitch), master -14 LUFS, true peak <= -1 dBTP (limiter oversampling 4x).

Pakai:  python3 build.py            -> kedua video
        python3 build.py 1          -> video 1 saja
Keluaran: /home/claude/pks/v20/master_video{1,2}.wav (+ stem & cues untuk earshot di /home/claude/pks/v20/work/)
"""
import json, subprocess, sys, pathlib
import numpy as np, soundfile as sf, pyloudnorm as pyln
from scipy.signal import butter, sosfilt, resample_poly

SR = 48000
DUR = 132.8
OUT = pathlib.Path('/home/claude/pks/v20'); WORK = OUT / 'work'; WORK.mkdir(parents=True, exist_ok=True)
VAR = OUT / 'var'
SFXEV = '/mnt/user-data/uploads/AI-Video/pks-studio/seg/v11final.sfx'
DIALOG = '/mnt/user-data/uploads/AI-Video/pks-studio/remotion/public/audio/v8/dialog.wav'
SRC = pathlib.Path('/mnt/user-data/uploads/SFXIrfan')
MOTION = OUT / 'motion.npz'          # dari tools/video_motion.py (luminans + gerak per frame)

# ------------------------------------------------------------------ keluarga bunyi (kata kode Irfan)
# gain = dB relatif punch VO; anchor: onset | peak | end ; rot = varian dirotasi
FAM = {
    'WORD':     dict(files=['Kinetictypography_gunakansecaraacak__v00', 'Kinetictypography_gunakansecaraacak__v01',
                            'Kinetictypography_gunakansecaraacak__v02'], gain=-15, anchor='onset', rand=True),
    'WORD1':    dict(files=['Katapertama__v00'], gain=-13, anchor='onset'),
    'PHOTO':    dict(files=[f'Pergantianfoto__v{i:02d}' for i in range(9)], gain=-15, anchor='onset'),
    'PHOTO1':   dict(files=['Pergantianfoto_gambarpertama__v00'], gain=-13, anchor='onset'),
    'CUT':      dict(files=['Cut__v00'], gain=-12, anchor='onset'),
    'CONTRAST': dict(files=['Cutcontrastransision__v00'], gain=-12, anchor='onset'),
    'CAM':      dict(files=['Wooshcameramovementtransisi__v00'], gain=-11, anchor='peak'),
    'WIPE':     dict(files=['Woosh__v01', 'Woosh__v00'], gain=-8, anchor='peak'),
    'MOVE':     dict(files=['Move__v03', 'Move__v02'], gain=-11, anchor='peak'),
    'STEP':     dict(files=['Move__v01'], gain=-19, anchor='onset'),
    'TYPE':     dict(files=['Keyboardtyping__v01', 'Keyboardtyping__v06', 'Keyboardtyping__v00', 'Keyboardtyping__v07',
                            'Keyboardtyping__v03'], gain=-14, anchor='span'),
    'KEY':      dict(files=['Keyboardtyping__v05', 'Keyboardtyping__v04', 'Keyboardtyping__v02'], gain=-15, anchor='onset'),
    'ENTER':    dict(files=['Enter__v00'], gain=-12, anchor='onset'),
    'AIPOP':    dict(files=['Popup_user_interface_AI__v00'], gain=-10, anchor='onset'),
    'AIRESP':   dict(files=['ResponAI_AIpopup__v00', 'ResponAI_AIpopup__v02', 'ResponAI_AIpopup__v01'], gain=-11, anchor='onset'),
    'AISTREAM': dict(files=['ES_Scifi_Computer_Short_Beeps_Glitch_02__v00'], gain=-16, anchor='onset'),
    'TICK':     dict(files=['ES_User_Interface_Click_UI_Buttons_Confirm_Menu__v00'], gain=-13, anchor='onset'),
    'GLASS':    dict(files=['ES_User_Interface_Click_Pops_Glass_UI_Pops__v00', 'ES_User_Interface_Click_Pops_Glass_UI_Pops__v01'],
                     gain=-14, anchor='onset'),
    'POP':      dict(files=['pop_up__v00'], gain=-12, anchor='onset'),
    'CLICK':    dict(files=['ES_User_Interface_Click_Button_Double_Click_Fast__v02', 'ES_User_Interface_Click_Button_Double_Click_Fast__v03'],
                     gain=-14, anchor='onset'),
    'GONE':     dict(files=['ES_User_Interface_Alert_UI_Buttons_Dissapear_Mus__v00'], gain=-12, anchor='onset'),
    'NOTIF':    dict(files=['Notif__v00'], gain=-13, anchor='onset'),
    'CURVE':    dict(files=['Scanning_dan_gerak_kurva__v00'], gain=-11, anchor='onset'),
    'LIGHT':    dict(files=['Lasertransision__v00'], gain=-14, anchor='onset'),
    'LIGHTOFF': dict(files=['Lasertransision__v00'], gain=-21, anchor='onset', semis=-5),
    'IMPACT':   dict(files=['basmenyebar__v00'], gain=-7, anchor='hit', trim=(1.13, 3.6), sat=4.0, semis=3),
    # kata besar layar penuh: bunyi kata (renyah, di frame) + lapisan bas tipis untuk bobot -> terdengar satu bunyi
    'EMPH':     dict(layers=[('WORD1', 2), ('IMPACT', -6)]),
    'SPREAD':   dict(files=['basmenyebar__v00'], gain=-5, anchor='hit', trim=(0.70, 5.3), sat=4.0, semis=3),
    'RISER':    dict(files=['ES_Designed_Riser_Transition_Fast_Short_Clean_01__v00'], gain=-13, anchor='end', trim=(1.2, 3.17)),
}
# prioritas saat dua peristiwa jatuh dalam 50 ms (yang lebih tinggi menang, satu bunyi per momen)
PRIO = ['IMPACT', 'EMPH', 'SPREAD', 'RISER', 'ENTER', 'AIPOP', 'AIRESP', 'CONTRAST', 'CAM', 'WIPE', 'MOVE', 'PHOTO1',
        'CUT', 'PHOTO', 'WORD1', 'TICK', 'GLASS', 'CLICK', 'GONE', 'CURVE', 'NOTIF', 'POP', 'LIGHT', 'LIGHTOFF', 'WORD',
        'KEY', 'STEP', 'AISTREAM', 'TYPE']

# ------------------------------------------------------------------ koreksi dari gambar
DROP = {  # id penanda yang tidak diberi bunyi sendiri (alasan: SOUND-MAP.md)
    '00a:cut:0',            # frame pertama video, bukan peristiwa
    '04b:cam:snapwide',     # gerak hampir nol (beda frame 0.014), kartu GPT-5 pop yang membawa momen
    '04c:cam:revealout',    # kamera hampir diam; kurva membelok (line:bend) yang jadi peristiwa
    '04c:x13:shrink',       # grafik hanya memudar sebelum cut Altman; cut yang membawa
    '05g:cam:snap:1', '05g:cam:snap:2', '05g:cam:snap:3', '05g:cam:snap:4',  # langkah kamera kecil bersamaan kartu mendarat
    '06e:snapwide:1',       # gerak kecil; 'Tertinggal' (impact) 0.2 dtk kemudian yang membawa
    '03c:scan:off',         # garis scan hanya selesai, tidak ada objek baru
    '01c:cut:zoomthrough', '02a:wipe:x09', '06g:cut:peran', '06g:cut:in', '05e:in:cut', '05f:in:cut',  # duplikat transisi yang sama
    '04c:cut:in',           # transisi = titik-titik terbang (dots:fly), satu bunyi
    '05c:icons:merge',      # ikon menyatu tepat saat 'Sama' (impact) -> satu bunyi
    '05a:altman:shrink',    # bersamaan cut kontras + foto muncul; cut yang membawa
    '00a:anchor:biggest', '00a:anchor:billion', '03e:anchor:somebody',  # kata kuning di klip = keluarga kata (word:...)
    '00a:anchor:launched', '00b:anchor:fast',  # sama: kata 'Launched' / 'Fast' sudah punya penanda word
    '02e:cal:compressed',   # bagian dari satu gerak kompres kalender -> DIVE di time:compress
    '03c:cut:jensen', '04d:cut:altman',  # sama dengan cut clip:in
}

LIFT = ('TICK', 'POP', 'GLASS', 'CLICK', 'AIRESP', 'NOTIF')   # bukan kata: kata memang muncul bersama ucapannya
CLIPS = [(0.0, 10.29), (55.885, 61.255), (71.025, 75.195)]   # klip narasumber (dari gambar)

def classify(kind, t, ev, lum_jump):
    """peristiwa -> keluarga (None = tidak dibunyikan)"""
    if ev in DROP: return None
    p = ev.split(':')
    if kind == 'word': return 'WORD'
    if kind == 'snap': return 'PHOTO'
    if kind == 'cut': return 'CONTRAST' if lum_jump > 0.35 else 'CUT'
    if kind == 'sub_impact':
        return 'EMPH'
    if kind == 'scifi_whoosh':
        return {'kreatif': 'EMPH', 'arahnya': 'WORD1', 'merencanakan': None, 'ai': 'AIPOP'}.get(p[-1])
    if kind == 'low_whoosh': return 'MOVE'      # kalender dimampatkan = objek bergerak
    if kind == 'riser': return 'RISER'
    if kind == 'hit': return 'GONE' if 'absorb' in p else 'IMPACT'
    if kind == 'whoosh':
        if 'cam' in p or p[1] in ('snapwide', 'reveal', 'crane', 'punch'): return 'CAM'
        if 'wipe' in p: return 'WIPE'
        if p[1] == 'orbit': return 'AIPOP'
        return 'MOVE'
    if kind == 'draw': return 'CURVE'
    if kind == 'land': return 'POP'
    if kind == 'pop':
        if p[1] in ('agent', 'icon', 'glyph', 'bloom'): return 'AIPOP'
        if p[1] in ('reply', 'pulse'): return 'AIRESP'
        if p[1] == 'dot': return 'NOTIF'
        if p[1] == 'grey': return 'SPREAD' if p[2] == 'spread' else 'GONE'
        return 'POP'
    if kind == 'click': return 'ENTER' if 'enter' in p else 'CLICK'
    if kind == 'trash': return 'GONE'
    if kind == 'ui_tap': return 'TICK'
    if kind == 'glass_ping': return 'AIRESP' if p[1] == 'orbit' else 'GLASS'
    if kind == 'step': return 'LIGHT' if p[0] == '03d' else 'STEP'
    if kind == 'toggle':
        if 'scan' in p: return 'CURVE'
        if 'off' in p: return 'LIGHTOFF'
        return 'LIGHT'
    return None

# ------------------------------------------------------------------ util audio
def load(path, sr=SR):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-f', 'f32le', '-ac', '2', '-ar', str(sr), '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).astype(np.float64)

def db(x): return 20 * np.log10(np.maximum(x, 1e-12))

def rms_env(x, win=0.05):
    m = (x ** 2).mean(1); w = int(win * SR)
    return np.sqrt(np.convolve(m, np.ones(w) / w, 'same'))

def punch(x):            # tingkat 'tubuh' bunyi: RMS 50 ms tertinggi
    return db(rms_env(x).max())

def hp(x, f, order=2):
    return sosfilt(butter(order, f, 'hp', fs=SR, output='sos'), x, axis=0)

def lp(x, f, order=2):
    return sosfilt(butter(order, f, 'lp', fs=SR, output='sos'), x, axis=0)

def fade(x, a=0.003, b=0.02):
    x = x.copy(); na, nb = int(a * SR), int(b * SR)
    if na: x[:na] *= np.linspace(0, 1, na)[:, None]
    if nb: x[-nb:] *= np.linspace(1, 0, nb)[:, None]
    return x

def pitch(x, semis):     # resample = pitch + durasi (hanya untuk SFX, bukan VO)
    r = 2 ** (semis / 12); up, down = 1000, int(round(1000 * r))
    return resample_poly(x, up, down, axis=0)

_cache = {}
def variant(name, fam):
    key = (name, fam.get('trim'), fam.get('semis'), fam.get('sat'))
    if key in _cache: return _cache[key]
    x, _ = sf.read(VAR / f'{name}.wav'); x = np.asarray(x, np.float64)
    if x.ndim == 1: x = np.c_[x, x]
    if fam.get('trim'):
        a, b = fam['trim']; x = x[int(a * SR):int(b * SR)]
    if fam.get('semis'): x = pitch(x, fam['semis'])
    if fam.get('sat'):   # harmonik atas agar bunyi rendah tetap terdengar di speaker HP
        g = fam['sat']; pk = np.abs(x).max(); y = np.tanh(g * x / pk) / np.tanh(g) * pk
        x = 0.6 * x + 0.4 * y
    x = hp(x, 35)
    x = fade(x, 0.002, min(0.04, len(x) / SR / 4))
    env = rms_env(x, 0.01)
    if fam['anchor'] == 'onset':
        on = np.flatnonzero(env > env.max() * 10 ** (-24 / 20)); anc = on[0] if len(on) else 0
    elif fam['anchor'] == 'hit':
        d = np.diff(env); anc = int(np.argmax(d[: int(0.6 * SR)])) if len(d) else 0
    elif fam['anchor'] == 'peak':
        anc = int(np.argmax(rms_env(x, 0.03)))
    elif fam['anchor'] == 'end':
        anc = int(np.argmax(rms_env(x, 0.03)))
    else:
        anc = 0
    x = x / 10 ** (punch(x) / 20)          # punch dinormalkan ke 0 dB, gain keluarga diterapkan saat taruh
    _cache[key] = (x, anc)
    return x, anc

# ------------------------------------------------------------------ peristiwa
def events():
    mo = np.load(MOTION); lum = mo['lum']
    rows = []
    for line in open(SFXEV):
        parts = line.split(); _, kind, t, ev = parts[:4]
        pan = next((float(q[4:]) for q in parts[4:] if q.startswith('pan=')), 0.0)
        t = float(t); f = int(round(t * 30))
        jump = abs(lum[min(len(lum) - 1, f + 3)] - lum[max(0, f - 3)])
        rows.append((t, kind, ev, jump, pan))
    rows.sort()
    out = []
    for t, kind, ev, jump, pan in rows:
        fam = classify(kind, t, ev, jump)
        if kind == 'type':
            continue
        if fam: out.append(dict(t=t, fam=fam, ev=f'{kind}:{ev}', pan=pan))
    # rentang ketik
    spans = {}
    for t, kind, ev, _, _ in rows:
        if kind == 'type':
            key = ev.rsplit(':', 1)[0]; spans.setdefault(key, {})[ev.rsplit(':', 1)[1]] = t
    for key, s in spans.items():
        if 'stream' in key:
            out.append(dict(t=s['start'], fam='AISTREAM', ev=f'type:{key}', dur=s['end'] - s['start']))
        elif s['end'] - s['start'] >= 0.4:
            out.append(dict(t=s['start'], fam='TYPE', ev=f'type:{key}', dur=s['end'] - s['start']))
        else:   # kata pendek yang 'diketik' di layar: 2-3 tuts
            n = 3 if s['end'] - s['start'] > 0.2 else 2
            for k, tt in enumerate(np.linspace(s['start'], s['end'], n)):
                out.append(dict(t=float(tt), fam='KEY', ev=f'type:{key}:{k}'))
    out.sort(key=lambda e: e['t'])
    # whoosh memuncak di gerak tercepat: geser puncak ke frame dengan beda-gambar terbesar dalam +-150 ms
    diff = mo['diff']
    for e in out:
        if e['fam'] in ('CAM', 'MOVE', 'WIPE'):
            f = int(round(e['t'] * 30)); a, b = max(1, f - 4), min(len(diff) - 1, f + 5)
            k = a + int(np.argmax(diff[a:b]))
            if diff[k] > 1.5 * np.median(diff[a:b]) and diff[k] > 0.01:
                e['shift_ms'] = round((k / 30 - e['t']) * 1000); e['t'] = k / 30
    out.sort(key=lambda e: e['t'])
    # kata pertama tiap frasa kinetik (jeda > 0.7 dtk dari kata sebelumnya)
    last = -9
    for e in out:
        if e['fam'] == 'WORD':
            if e['t'] - last > 0.7: e['fam'] = 'WORD1'
            last = e['t']
    # foto pertama tiap montase
    last = -9
    for e in out:
        if e['fam'] == 'PHOTO':
            if e['t'] - last > 1.0: e['fam'] = 'PHOTO1'
            last = e['t']
    # kata kinetik di atas klip narasumber yang sedang bicara: 3 dB lebih pelan agar tidak menambah klik pada ucapan mereka
    for e in out:
        if e['fam'] in ('WORD', 'WORD1') and any(a <= e['t'] < b for a, b in CLIPS): e['trim_db'] = -3
    # satu bunyi per momen: dalam 50 ms yang berprioritas tinggi menang (rentang ketik dikecualikan)
    keep = []
    for e in out:
        solo = lambda q: 'dur' in q or q['fam'] == 'RISER'      # rentang ketik & riser (membangun sebelum) tidak digabung
        clash = [k for k in keep if abs(k['t'] - e['t']) < 0.05 and not solo(k) and not solo(e)]
        if clash:
            k = clash[0]
            if PRIO.index(e['fam']) < PRIO.index(k['fam']):
                k['merged'] = k.get('merged', []) + [k['ev']]; k.update(t=e['t'], fam=e['fam'], ev=e['ev'])
            else:
                k['merged'] = k.get('merged', []) + [e['ev']]
            continue
        keep.append(e)
    return keep

# ------------------------------------------------------------------ SFX bus
def sfx_bus(evts, vo_ref, vo=None):
    bus = np.zeros((int(DUR * SR) + SR, 2)); rot = {}
    rng = np.random.default_rng(20)
    todo = []
    for e in evts:
        if 'layers' in FAM[e['fam']]:
            for k, (sub, off) in enumerate(FAM[e['fam']]['layers']):
                todo.append((e, sub, off, k == 0))
        else:
            todo.append((e, e['fam'], 0, True))
    for e, famname, off, primary in todo:
        fam = FAM[famname]
        files = fam['files']
        if fam.get('rand') and len(files) > 1:
            prev = rot.get(famname, -1); choices = [i for i in range(len(files)) if i != prev]
            i = int(rng.choice(choices))
        else:
            i = (rot.get(famname, -1) + 1) % len(files)
        rot[famname] = i
        x, anc = variant(files[i], fam)
        if fam['anchor'] == 'span':      # ketikan sepanjang rentang
            need = int(e['dur'] * SR) + int(0.05 * SR); parts = []; j = i
            while sum(len(p) for p in parts) < need:
                y, _ = variant(files[j % len(files)], fam); parts.append(y); j += 1
            x = fade(np.concatenate(parts)[:need], 0.002, 0.04); anc = 0
        lift = 0.0
        if vo is not None and primary and famname in LIFT:
            # SFX UI kecil yang jatuh tepat di suku kata keras narator: angkat sampai +4 dB agar tidak tertelan
            a0, b0 = int((e['t'] - 0.02) * SR), int((e['t'] + 0.15) * SR)
            vpk = db(rms_env(vo[max(0, a0):b0], 0.01).max()) if b0 > a0 else -120
            spk = vo_ref + fam['gain'] + e.get('trim_db', 0) + db(rms_env(x, 0.01).max())
            lift = float(np.clip(vpk - spk - 8, 0, 4)); e['lift_db'] = round(lift, 1) if lift else 0
        g = 10 ** ((vo_ref + fam['gain'] + off + e.get('trim_db', 0) + lift) / 20)
        pan = 0.5 * e.get('pan', 0.0)            # posisi objek di layar, dipersempit setengah
        x = x * np.array([np.sqrt(0.5 * (1 - pan)), np.sqrt(0.5 * (1 + pan))]) * np.sqrt(2)
        s = int(round(e['t'] * SR)) - anc
        a = max(0, s); b = min(len(bus), s + len(x))
        if b > a: bus[a:b] += g * x[a - s:b - s]
        if primary: e['variant'] = files[i]; e['level_db'] = round(fam['gain'] + off, 1)
        else: e['layer'] = files[i]
    return bus[: int(DUR * SR)]

# ------------------------------------------------------------------ VO
def vo_track():
    x = load(DIALOG)[: int(DUR * SR)]
    if len(x) < int(DUR * SR): x = np.r_[x, np.zeros((int(DUR * SR) - len(x), 2))]
    # kompresor ringan (detektor RMS 10 ms, 2.5:1 di atas ambang, attack 8 ms, release 150 ms): turunkan PLR VO
    env = db(rms_env(x, 0.01)); thr = -26.0
    over = np.maximum(env - thr, 0); gr = -over * (1 - 1 / 2.5)
    a_att, a_rel = np.exp(-1 / (0.008 * SR)), np.exp(-1 / (0.150 * SR))
    sm = np.empty_like(gr); g = 0.0
    for n in range(len(gr)):
        c = gr[n]; k = a_att if c < g else a_rel
        g = k * g + (1 - k) * c; sm[n] = g
    return x * 10 ** (sm / 20)[:, None], x

def speech_mask(raw):
    e = db(rms_env(raw, 0.05)); return e > -45

# ------------------------------------------------------------------ backsound
def bed_gain_curve(bed, vo_lufs, plan):
    """plan: list (t, LU di bawah VO). Ukur loudness jangka pendek bed (3 dtk) dan hitung gain agar bed
    mengikuti target -> bentuk emosi dirancang, dinamika mikro file tetap."""
    meter = pyln.Meter(SR); hop = 0.25; n = int(DUR / hop) + 1
    st = np.full(n, -70.0)
    for k in range(n):
        c = k * hop; seg = bed[max(0, int((c - 1.5) * SR)): int((c + 1.5) * SR)]
        if len(seg) > 0.5 * SR and np.abs(seg).max() > 1e-6:
            try: st[k] = max(-70, meter.integrated_loudness(seg))
            except Exception: pass
    st = np.maximum(st, -45)            # bagian sangat pelan tidak didorong berlebihan
    tt = np.arange(n) * hop
    pt = np.array([p[0] for p in plan]); pv = np.array([p[1] for p in plan])
    target = vo_lufs + np.interp(tt, pt, pv)
    gdb = np.clip(target - st, -30, 12)
    k = np.ones(9) / 9; gdb = np.convolve(np.r_[[gdb[0]] * 4, gdb, [gdb[-1]] * 4], k, 'valid')   # haluskan ~2 dtk
    g = np.interp(np.arange(len(bed)) / SR, tt, gdb)
    return bed * 10 ** (g / 20)[:, None]

def place(src, at, src_from, length, fi=0.0, fo=0.0):
    out = np.zeros((int(DUR * SR), 2)); seg = src[int(src_from * SR): int((src_from + length) * SR)].copy()
    if fi: seg[: int(fi * SR)] *= np.linspace(0, 1, int(fi * SR))[:, None]
    if fo: seg[-int(fo * SR):] *= np.linspace(1, 0, int(fo * SR))[:, None]
    a = int(at * SR); b = min(len(out), a + len(seg)); out[a:b] = seg[: b - a]; return out

def reggae_intro():
    """awal Reggae sebelum piano (0.30-9.62 dtk file), diperpanjang 1 bar (periode 3.12 dtk) agar
    menutup sampai cut 'Sadar' 10.29 tanpa masuk ke piano."""
    r = load(SRC / 'Reggaesoundpembuka-pakeawalannyaaja sebelumsuarapiano.mp3')
    a = r[int(0.30 * SR): int(9.62 * SR)].copy()
    b = r[int(6.50 * SR): int(7.60 * SR)].copy()     # fase sama (9.62 - 3.12)
    xf = int(0.03 * SR)
    a[-xf:] = a[-xf:] * np.linspace(1, 0, xf)[:, None] + b[:xf] * np.linspace(0, 1, xf)[:, None]
    y = np.r_[a, b[xf:]]
    return y

# rencana level bed (detik, LU relatif VO). Naik di jeda VO, turun saat klip narasumber bicara.
PLAN_BODY = [(0, -15), (9.6, -15), (9.9, -8), (10.3, -8), (10.9, -18), (19.0, -17), (19.6, -16), (40, -16), (50, -15),
             (54.6, -15), (55.0, -6), (55.8, -6), (56.2, -19), (61.0, -19), (61.6, -14), (69.8, -14), (70.2, -6),
             (70.9, -6), (71.3, -19), (74.4, -19), (74.7, -8), (75.2, -14), (100, -13), (103.5, -14), (124.9, -14),
             (125.3, -5), (126.2, -5), (126.6, -12), (129.6, -12), (130.6, -9), (DUR, -9)]

def beds(version, vo_lufs):
    n = int(DUR * SR)
    particle = load(SRC / 'ES_Particle Emission - Soundpembuka.mp3')
    office = load(SRC / 'ES_Ambience, Office, Designed, Busy Office - Epidemic Sound.mp3')
    if version == 1:
        bed = place(particle, 0.0, 0.0, DUR, fi=0.02)
    else:
        intro = reggae_intro()
        bed = place(intro, 0.0, 0.0, 10.29 + 0.08, fo=0.08)          # berhenti bersama cut ke 'Sadar'
        body = place(particle, 0.0, 0.0, DUR)
        tt = np.arange(n) / SR
        ramp = np.clip((tt - 10.24) / 0.9, 0, 1) ** 1.5                  # Particle masuk dari cut
        ramp *= np.clip((125.55 - tt) / 0.3, 0, 1)                       # ...dan keluar di awal jeda VO 125.25
        bed = bed + body * ramp[:, None]
        # tema pembuka kembali di penutup 'Peran Kamu' (bookend): masuk di awal jeda VO 125.25 (pre-lap ke cut 126.35)
        # dari bar ke-2 (pad sudah penuh; 0-1 dtk file masih fade-in sendiri dan meninggalkan lubang di jeda VO)
        bed = bed + place(intro, 125.25, 3.12, DUR - 125.25, fi=0.12)
    end_fade = np.clip((DUR - np.arange(n) / SR) / 2.2, 0, 1)            # tutup setelah VO selesai
    bed = bed_gain_curve(bed, vo_lufs, PLAN_BODY) * end_fade[:, None]
    # ambience kantor: hanya adegan 'kita bekerja' (kalender, tugas, ketik prompt) 32.0-50.0
    amb = place(office, 32.0, 20.0, 18.0, fi=1.5, fo=1.5)
    amb = hp(amb, 150)
    m = pyln.Meter(SR); al = m.integrated_loudness(amb[int(33.5 * SR):int(48.5 * SR)])
    amb *= 10 ** ((vo_lufs - 24 - al) / 20)
    layers = {'bed': bed, 'amb': amb}
    # documenter tidak dipakai: earshot mendengarnya sebagai 'burung mengepak / hewan kecil di rumput' (foley rustle)
    # di bawah cold open -> bunyi tanpa objek di gambar (lihat LISTEN.md ronde 2)
    return layers

# ------------------------------------------------------------------ master
def tp_limit(x, ceiling_db=-1.2):
    """limiter puncak oversampling 4x, lookahead 3 ms, release 120 ms."""
    up = resample_poly(x, 4, 1, axis=0); pk = np.abs(up).max(1)
    pk = pk.reshape(-1, 4).max(1)[: len(x)]
    if len(pk) < len(x): pk = np.r_[pk, np.zeros(len(x) - len(pk))]
    ceil = 10 ** (ceiling_db / 20); need = np.minimum(1, ceil / np.maximum(pk, 1e-9))
    la = int(0.003 * SR)
    from scipy.ndimage import minimum_filter1d
    need = minimum_filter1d(need, size=2 * la + 1, origin=0)
    need = np.r_[need[la:], np.ones(la)]
    rel = np.exp(-1 / (0.120 * SR)); g = np.empty_like(need); c = 1.0
    for n in range(len(need)):
        t = need[n]; c = t if t < c else rel * c + (1 - rel) * t; g[n] = c
    return x * g[:, None], g

def true_peak(x):
    return db(np.abs(resample_poly(x, 4, 1, axis=0)).max())

def build(version):
    vo, raw = vo_track()
    meter = pyln.Meter(SR)
    mask = speech_mask(raw)
    vo_lufs = meter.integrated_loudness(vo)
    vo_ref = np.percentile(db(rms_env(vo))[mask], 95)       # punch VO saat bicara
    ev = events()
    sfx = sfx_bus(ev, vo_ref, vo)
    lay = beds(version, vo_lufs)
    music = sum(lay.values())
    mix = vo + sfx + music
    # gain ke -14 LUFS, lalu limiter; ulangi sampai tepat
    gain = -14 - meter.integrated_loudness(mix)
    for _ in range(4):
        out, gr = tp_limit(mix * 10 ** (gain / 20))
        l = meter.integrated_loudness(out); gain += (-14 - l)
        if abs(-14 - l) < 0.1: break
    tp = true_peak(out)
    sf.write(OUT / f'master_video{version}.wav', out.astype(np.float32), SR, subtype='PCM_24')
    G = 10 ** (gain / 20)
    for name, s in [('vo', vo), ('sfx', sfx), ('music', music)]:
        sf.write(WORK / f'v{version}_{name}.wav', (s * G).astype(np.float32), SR, subtype='FLOAT')
    cues = {'events': [{'t': round(e['t'], 3), 'kind': e['fam'], 'id': e['ev']} for e in ev]}
    json.dump(cues, open(WORK / f'cues_v{version}.json', 'w'), indent=0)
    json.dump(ev, open(WORK / f'events_v{version}.json', 'w'), indent=1)
    info = dict(version=version, lufs=round(meter.integrated_loudness(out), 2), true_peak_dbtp=round(tp, 2),
                max_gr_db=round(float(db(gr.min())), 2), gr_over_1db_s=round(float((db(gr) < -1).sum() / SR), 2),
                vo_lufs_raw=round(vo_lufs, 2), vo_ref=round(float(vo_ref), 2), n_events=len(ev))
    print(json.dumps(info))
    return info

if __name__ == '__main__':
    vs = [int(a) for a in sys.argv[1:]] or [1, 2]
    for v in vs: build(v)
