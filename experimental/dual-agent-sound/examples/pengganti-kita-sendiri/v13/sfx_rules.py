"""Aturan SFX Modul 3 (taksonomi/palet) + Modul 4 (velocity-peak, stagger density) + Modul 5 (puncak absolut per kelas).
Audit audio Irfan/Gemini 31 Okt 21:37. Dipanggil mix13.py: C = apply_rules(C, T).
Setiap cue tetap membawa `visual` + `role`; aturan ini hanya mengganti MATERIAL bunyi, waktu puncak, dan level — tidak menambah bunyi tanpa visual.
"""
import json, subprocess, copy
import numpy as np

BK = '/home/claude/pool/bank/'
MK = '/home/claude/sfx_hunt/mk/'
SR = 48000
FPS = 30

# kelas dari cue lama (cues11) yang memakai `role`
ROLE2CLASS = {'low_sub_bass_boom': 'impact', 'soft_air_whoosh': 'whoosh_s', 'low_pass_sweep': 'whoosh_s',
              'micro_tick': 'micro_tick', 'tape_hiss_bed': 'texture_bed'}

# Modul 5 — puncak absolut di master (dBFS). UI −16…−20; ketikan −22…−25; impact boleh lebih besar tapi tetap di bawah puncak VO
PEAK = {'text_pop': -19, 'ui_pop': -18, 'ui_click': -18, 'land_soft': -18, 'micro_tick': -20, 'graph_tick': -21, 'graph_pulse': -21,
        'type_key': -24, 'shutter': -20, 'flutter': -21, 'whoosh_s': -20, 'sub_layer': -17, 'riser': -21, 'sub_thud': -14,
        'impact': -12, 'text_slam': -14, 'relay': -20, 'pen': -24, 'paper': -20, 'step': -30, 'texture': -24}

# panel grafik/kurva data → haptic micro-tick + felt pulse (Modul 3 baris 3)
GRAPH_PANELS = {'02b', '02e', '02f', '02e/02f', '04b', '04c', '04b→04c', '05b'}

_peak_cache = {}
def file_peak(path, a=0.0, b=None):
    k = (path, a, b)
    if k not in _peak_cache:
        args = ['ffmpeg', '-v', 'error', '-ss', str(a or 0)] + (['-t', str(b - (a or 0))] if b else []) + ['-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
        x = np.frombuffer(subprocess.run(args, capture_output=True).stdout, np.float32)
        h = int(0.005 * SR)
        e = np.array([np.sqrt(np.mean(x[i:i + h] ** 2)) for i in range(0, max(1, len(x) - h), h)]) if len(x) > h else np.array([1.0])
        _peak_cache[k] = float(np.argmax(e) * 0.005)
    return _peak_cache[k]

def cls(q):
    return q.get('class') or ROLE2CLASS.get(q.get('role', ''), q.get('role', ''))

def apply_rules(C, T):
    out = []
    shut_t = sorted(q['t'] for q in C if cls(q) == 'shutter')
    seq_pitch = {}
    for q in C:
        q = copy.deepcopy(q); c = cls(q); q['class'] = c
        if c == 'texture_bed':      # hiss tekstur: tetap relatif VO, LPF lebih hangat
            q['lp'] = min(q.get('lp') or 4000, 4000); out.append(q); continue
        # ── Modul 3 baris 1: whoosh = udara hangat (LPF 2,5 kHz) + sub thump; puncak di v_max kamera (Modul 4.1)
        if c in ('whoosh_s', 'riser'):
            q['lp'] = min(q.get('lp') or 2500, 2500)
            if q.get('align') != 'peak':
                q['align'] = 'peak'; q['peak'] = file_peak(q['file'], q.get('a', 0) or 0, q.get('b'))
            if c == 'whoosh_s':
                th = dict(id=q['id'] + '_sub', t=q['t'], **{'class': 'sub_layer'}, file=BK + 'b_cut_hit__sub.wav', lp=150, fo=0.12,
                          align='peak', peak=file_peak(BK + 'b_cut_hit__sub.wav'), panel=q.get('panel'), visual=q.get('visual'),
                          role='lapisan sub thump di bawah whoosh (Modul 3 baris 1)')
                out.append(th)
        # ── Modul 3 baris 2: kartu/urutan item = felt/wood pop bernada naik
        elif c == 'ui_pop':
            q['file'] = BK + 'b_knock__desk.wav'; q['lp'] = 2500
        # ── Modul 3 baris 3: grafik/kurva/data = haptic micro-tick 2–4 ms + felt pulse naik (60–180 Hz)
        elif c in ('text_pop', 'land_soft', 'micro_tick') and q.get('panel') in GRAPH_PANELS:
            key = q.get('panel'); n = seq_pitch.get(key, 0); seq_pitch[key] = n + 1
            q['class'] = c = 'graph_tick'; q['file'] = BK + 'b_pro_click__mouse.wav'; q['b'] = 0.02; q['lp'] = 4000; q['fo'] = 0.004; q['pitch'] = 0
            out.append(dict(id=q['id'] + '_pulse', t=q['t'], **{'class': 'graph_pulse'}, file=BK + 'b_pro_pop_in__deep.wav', lp=180, pitch=min(n, 12), fo=0.06,
                            panel=q.get('panel'), visual=q.get('visual'), role='felt pulse bernada naik mengikuti momentum data (Modul 3 baris 3)'))
        # kata kinetik biasa = ketukan kayu/felt hangat (bukan «blup»)
        elif c == 'text_pop':
            q['file'] = BK + 'b_knock__wood.wav'; q['lp'] = 2500
        elif c == 'land_soft':
            q['file'] = BK + 'b_fit__land.light__fingertip_book.wav'; q['lp'] = 2000
        elif c == 'micro_tick':
            q['file'] = BK + 'b_fit__key__thock.wav'; q['lp'] = 1500
        # ── Modul 3 baris 4: ketikan = thock lembut LPF 1,5 kHz, variasi nada ±3 % (±0,5 st), −22…−25 dBFS
        elif c == 'type_key':
            q['file'] = BK + 'b_typing_key__thock.wav'; q['lp'] = 1500
            q['pitch'] = round(((hash(q['id']) % 7) - 3) / 6.0, 2)
        # ── Modul 3 baris 5: metafora dokumenter = foley material; langkah kartun dilarang → felt sangat tipis
        elif c == 'step':
            q['file'] = BK + 'b_tap__soft.wav'; q['lp'] = 800
        elif c == 'relay':
            q['file'] = BK + 'b_knock__wood.wav'; q['lp'] = 1500
        # Pilar B: ganti foto cepat (montase) = flutter karton/kertas LPF 2,2 kHz sinkron 1:1; shutter tunggal tetap shutter
        elif c == 'shutter':
            close = any(0 < abs(t - q['t']) < 0.4 for t in shut_t)
            if close:
                q['class'] = c = 'flutter'; q['file'] = MK + 'mk1104.mp3'; q['a'] = 0.0; q['b'] = 0.18; q['lp'] = 2200; q['fo'] = 0.05
            else:
                q['lp'] = min(q.get('lp') or 4000, 4000)
        elif c in ('sub_thud', 'impact', 'text_slam'):
            q['lp'] = min(q.get('lp') or 900, 900)
        elif c in ('pen', 'paper'):
            q['lp'] = min(q.get('lp') or 3000, 3000)
        # ── Modul 4.2: pop/klik kemunculan = +2 f setelah objek terlihat jelas (skala > 0,6), bukan frame 0
        if c in ('text_pop', 'ui_pop', 'graph_tick'):
            q['t'] = round(q['t'] + 2 / FPS, 3)
        q['peak_dbfs'] = PEAK.get(c)
        out.append(q)
    # pulse ikut bergeser +2 f bersama tick-nya
    for q in out:
        if q['class'] == 'graph_pulse':
            q['t'] = round(q['t'] + 2 / FPS, 3); q['peak_dbfs'] = PEAK['graph_pulse']
        if q['class'] == 'sub_layer':
            q['peak_dbfs'] = PEAK['sub_layer']
    # ── Modul 4.3: stagger density — kelas UI sama > 6 dalam 1,2 dtk → simpan 6 pertama, sisanya satu tekstur flutter kontinu
    out.sort(key=lambda q: q['t'])
    keep = []; dropped = {}
    for q in out:
        if q['class'] in ('ui_pop', 'land_soft', 'text_pop', 'relay', 'graph_tick', 'graph_pulse'):
            near = [k for k in keep if k['class'] == q['class'] and q['t'] - k['t'] < 1.2]
            if len(near) >= 6:
                dropped.setdefault((q['class'], near[0]['id']), []).append(q); continue
        keep.append(q)
    for (c, _), qs in dropped.items():
        t0, t1 = qs[0]['t'], qs[-1]['t']
        keep.append(dict(id=f'density_{c}_{t0}', t=t0, **{'class': 'texture'}, file=MK + 'mk2386.mp3', a=0.0, b=max(0.25, t1 - t0 + 0.2),
                         lp=2200, fi=0.06, fo=0.15, peak_dbfs=PEAK['texture'], panel=qs[0].get('panel'),
                         visual=f'{len(qs)} item {c} beruntun', role='tekstur kertas kontinu menggantikan tick ke-7 dst. (Modul 4.3)'))
    keep.sort(key=lambda q: q['t'])
    return keep
