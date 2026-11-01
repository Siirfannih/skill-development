"""PKS v6 sound design — earshot real-sound process (upstream Leonxlnx/earshot 0.4.0, commit 591fa3e).
1. cues: picture events from the Remotion SFXLOG / sync (v9/mix14/cues14s.json) + visual events found by frame difference,
   re-classed with the earshot launch grammar (hard cuts and cut-zooms: nothing; camera moves: one swish; words: one mouse click).
2. design: audio/sounddesign.json for skills/real-sound/scripts/mix.py (real recordings only, chosen by earshot rank / find).
3. levels: every effect sits over the MUSIC bed by the launch kit's bed_db (earshot/forge/kits/launch.json), computed per
   event from the rendered music stem; encoded as cue weight (weight_db 6 dB per doubling).
usage: python build.py pass1|pass2"""
import json, re, sys, math, subprocess, numpy as np, soundfile as sf
R = '/home/claude/pks6'; FPS = 30
C14 = json.load(open('/home/claude/v9/mix14/cues14s.json'))
T = json.load(open('/home/claude/v9/mix14/timeline.json')); TOTAL = T['total']

# ---------- 1. cue list ----------
DROP = re.compile(r'hard cut|cut zoom|B\d → B\d|BABAK|klip Altman →')
ADD = [  # visual events with no cue in v14 (frame-difference detector, checked on contact sheets)
 (5.50, 'click', 'kata «AI» muncul'), (5.90, 'click', 'kata «company» muncul'), (9.97, 'click', 'kata «fast» muncul'),
 (14.80, 'whoosh', '«PENGGANTI kita sendiri» keluar', 0.5), (16.23, 'whoosh', '«anehnya» keluar', 0.5),
 (26.37, 'whoosh', 'daftar kartu tugas bergeser', 0.5), (27.40, 'whoosh', 'daftar kartu tugas bergeser', 0.5),
 (31.47, 'hit', 'slab KREATIF membanting'), (47.25, 'whoosh', 'kursor CEO melesat ke laporan, kamera mendekat', 0.6),
 (47.97, 'click', 'teks laporan disorot'), (49.63, 'click', 'kursor mengirim'), (49.87, 'whoosh', 'panel bergeser', 0.5),
 (50.40, 'toggle', 'garis cahaya muncul di gerbang lengkung'),
 (54.15, 'step', 'piktogram melangkah ke cahaya'), (54.50, 'step', 'piktogram melangkah ke cahaya'),
 (63.93, 'whoosh', '«nggak peduli» naik', 0.5), (65.97, 'whoosh', 'kotak biru berubah jadi grafik', 0.7),
 (70.30, 'whoosh', '«masih sama» keluar', 0.5), (75.40, 'snap', 'foto menyebar'), (75.87, 'snap', 'foto menyebar'),
 (79.27, 'whoosh', 'grid zoom out', 0.8), (85.40, 'snap', 'cut ke perempuan dengan laptop + ikon AI'),
 (89.20, 'whoosh', 'kartu landing page bergeser', 0.5),
 (99.40, 'step', 'piktogram berjalan'), (99.90, 'step', 'piktogram berjalan'), (100.40, 'step', 'piktogram berjalan'),
 (100.90, 'step', 'piktogram berjalan'), (101.35, 'step', 'piktogram berjalan'),
 (103.20, 'whoosh', 'baris tile aplikasi bergeser', 0.5), (117.30, 'whoosh', 'kartu prompt meredup dan jatuh', 0.6),
 (125.17, 'pop', 'tile ChatGPT #1'), (125.43, 'pop', 'tile ChatGPT #2'), (125.63, 'pop', 'tile ChatGPT #3'),
 (125.87, 'pop', 'tile ChatGPT #4'), (126.03, 'pop', 'tile ChatGPT #5')]
KIND = {'word': 'click', 'click': 'click', 'photo': 'snap', 'land': 'pop', 'ui_pop': 'pop', 'message': 'pop', 'light': 'toggle',
        'whoosh': 'whoosh', 'whip': 'whoosh', 'riser': 'riser', 'slam': 'hit', 'impact': 'hit', 'trash': 'trash', 'draw': 'draw'}

def cues():
    ev, dropped = [], []
    types = sorted([c for c in C14 if c['role'] == 'type'], key=lambda c: c['t'])
    for c in C14:
        r = c['role']
        if r == 'type': continue
        if r in ('whoosh', 'whip') and DROP.search(c['visual']): dropped.append((c['t'], c['visual'][:60])); continue
        k = KIND[r]; w = 1.0
        if r == 'impact': w = 2.0 if c['t'] > 129 else 1.5   # the closing hit is the film's last moment
        ev.append(dict(t=c['t'], kind=k, id=f"{k}:{c['id']}", visual=c['visual'][:80], weight=w))
    for i, c in enumerate(types):   # typing: one key per character, ~87 ms apart (kit min_gap), stopping before the next word
        m = re.search(r'«([^»]+)»', c['visual']); word = m.group(1) if m else 'xxxx'
        nxt = types[i + 1]['t'] if i + 1 < len(types) else c['t'] + 2
        n = max(1, min(len(word), int((nxt - c['t'] - 0.03) / 0.087)))
        for j in range(n):
            ev.append(dict(t=round(c['t'] + j * 0.087, 3), kind='key', id=f"key:{c['id']}:{j}", visual=f"ketik «{word}» huruf {j + 1}", weight=1.0))
    for a in ADD:
        ev.append(dict(t=a[0], kind=a[1], id=f"{a[1]}:add:{a[0]}", visual=a[2], weight=1.0, light=(a[3] if len(a) > 3 else None)))
    ev.sort(key=lambda e: e['t'])
    return ev, dropped

# ---------- 2. design ----------
A = 'audio/assets/'
SAMPLES = {
 'ui.click':   {'file': A + 'ui/pb-290204_mouse-click-15C.wav', 'start': 0.036, 'end': 0.205, 'mono': True, 'norm_peak_db': -6, 'fade_out': 0.02},
 'ui.snap':    {'file': A + 'ui/es-cad01d18_shutter-canon-5d.wav', 'start': 0.368, 'end': 0.605, 'mono': True, 'eq': {'highshelf': [5000, -5.0]}, 'norm_peak_db': -6, 'fade_out': 0.03},
 'ui.pop':     {'file': A + 'ui/es-7cce069c_ui-bubbly-select.wav', 'mono': True, 'norm_peak_db': -6, 'fade_out': 0.03},
 'ui.toggle':  {'file': A + 'ui/es-ccc6c7f4_light-switch.wav', 'start': 0.186, 'end': 0.315, 'mono': True, 'norm_peak_db': -6, 'fade_out': 0.02},
 'mo.swish':   {'file': A + 'motion/es-a841407e_swish-tonal-flyby.wav', 'start': 0.091, 'end': 0.755, 'norm_peak_db': -6, 'fade_out': 0.06},
 'mo.riser':   {'file': A + 'motion/pb-04C_cinematic-riser-03.wav', 'norm_peak_db': -6, 'fade_in': 0.2, 'fade_out': 0.02},
 'im.hit':     {'file': A + 'impacts/es-0e356c2f_hit-electric-tonne.wav', 'start': 0.023, 'end': 2.6, 'norm_peak_db': -6, 'fade_out': 0.9},
 'fo.trash':   {'file': A + 'foley/es-6d8f6224_ui-trash.wav', 'mono': True, 'norm_peak_db': -6},
 'fo.draw':    {'file': A + 'foley/es-86c26fdb_marker-draw.wav', 'mono': True, 'norm_peak_db': -6},
 'fo.step.0':  {'file': A + 'foley/es-747994e2_footsteps-sneaker.wav', 'start': 13.446, 'end': 14.095, 'mono': True, 'norm_peak_db': -6, 'fade_out': 0.08},
 'fo.step.1':  {'file': A + 'foley/es-747994e2_footsteps-sneaker.wav', 'start': 2.097, 'end': 2.695, 'mono': True, 'norm_peak_db': -6, 'fade_out': 0.08},
 'fo.step.2':  {'file': A + 'foley/es-747994e2_footsteps-sneaker.wav', 'start': 5.081, 'end': 5.42, 'mono': True, 'norm_peak_db': -6, 'fade_out': 0.08},
 'fo.step.3':  {'file': A + 'foley/es-747994e2_footsteps-sneaker.wav', 'start': 12.349, 'end': 12.77, 'mono': True, 'norm_peak_db': -6, 'fade_out': 0.08},
}
SLICES = {'ui.key': {'file': A + 'ui/es-c7ac1cb5_keyboard-apple-typing.wav', 'start': 0.0, 'end': 6.6, 'len': 0.22, 'eq': {'highshelf': [4500, -4.0]}, 'min_gap': 0.07,
                     'gate_db': -14, 'mono': True, 'norm_peak_db': -6, 'max': 12}}
POOLS = {'ui.click': ['ui.click'], 'ui.snap': ['ui.snap'], 'ui.pop': ['ui.pop'], 'ui.toggle': ['ui.toggle'], 'mo.swish': ['mo.swish'],
         'mo.riser': ['mo.riser'], 'im.hit': ['im.hit'], 'fo.trash': ['fo.trash'], 'fo.draw': ['fo.draw'],
         'fo.step': ['fo.step.0', 'fo.step.1', 'fo.step.2', 'fo.step.3'], 'ui.key': ['ui.key#*']}
# earshot launch kit (kits/launch.json): bed_db over the music bed, offset (s), align, min gap
KIT = {'click': ('ui.click', 6.5, -0.011, 'attack', 0.085), 'snap': ('ui.snap', 6.0, 0.009, 'peak', 0.066),
       'pop': ('ui.pop', 12.0, 0.004, 'attack', 0.114), 'toggle': ('ui.toggle', 6.5, 0.0, 'attack', 0.085),
       'whoosh': ('mo.swish', 9.0, 0.037, 'peak', 0.0), 'riser': ('mo.riser', 8.0, -0.06, 'end', 0.0),
       'hit': ('im.hit', 7.5, 0.0, 'peak', 0.0), 'key': ('ui.key', 0.5, 0.008, 'attack', 0.087),
       'trash': ('fo.trash', 7.0, 0.0, 'peak', 0.0), 'draw': ('fo.draw', 3.0, 0.0, 'attack', 0.0), 'step': ('fo.step', 3.0, -0.02, 'attack', 0.115)}

MUSIC = {'file': A + 'music/es-26ac59fe_leave-the-room.wav', 'src_bpm': 120.0, 'target_bpm': 120.0, 'stretch': 'none', 'gain_db': 0.0,
 'segments': [
  {'label': 'intro bars 0-6 with its pre-roll; film = src + 0.43 so the drop lands on 54.93', 'src_from': 0.0, 'src_to': 14.5, 'at': 0.43, 'fade_in': 0.008, 'fade_in_at_start': False, 'fade_out': 0.06},
  {'label': 'bars 0-55 again from the top (intro loops back to its own first bar, same chord); src bar 20 (top drop candidate, novelty 0.87) lands on 54.93 «mengambil tempat kita» -> Jensen', 'src_from': 0.5, 'src_to': 112.5, 'at': 14.93, 'fade_in': 0.01, 'fade_out': 0.06},
  {'label': 'outro bars 60-62 (the build before the track resolves) at body level to the last frame: the film ends on the closing hit 130.03 + this bed, not on a fade (earshot critique final_lu)', 'src_from': 120.5, 'src_to': 126.6, 'at': 126.93, 'fade_in': 0.01, 'fade_out': 0.05}]}

def vo_ride(depth=-5.0):
    """music dips under the voice (earshot launch playbook §9: duck 3-6 dB under VO)"""
    d, sr = sf.read('/home/claude/v9/mix14/stem_dialog_g.wav'); d = d if d.ndim == 1 else d.mean(1)
    fr = int(0.05 * sr); e = np.array([np.sqrt(np.mean(d[i:i + fr] ** 2)) for i in range(0, len(d) - fr, fr)])
    on = 20 * np.log10(e + 1e-9) > 20 * np.log10(np.percentile(e[e > 1e-4], 50)) - 14
    on = np.convolve(on.astype(float), np.ones(8), 'same') > 0   # hold 0.4 s: no pumping between words
    pts, prev = [[0.0, 0.0]], False
    for i, v in enumerate(on):
        t = i * 0.05
        if v and not prev: pts += [[max(0, t - 0.15), pts[-1][1] if pts else 0.0], [t, depth]]
        if not v and prev: pts += [[t, depth], [t + 0.4, 0.0]]
        prev = v
    return pts

HITS_BIG = [50.167, 54.933, 111.267, 113.167, 130.033]
def stopdowns(pts):
    """kit mix.stop_down: the music steps down 9 dB for 0.35 s before the big hits and comes back on them"""
    out = []
    for t in HITS_BIG: out += [[t - 0.40, None], [t - 0.33, -9.0], [t - 0.005, -9.0], [t, None]]
    return out

def merge_rides(vo, sd):
    f = lambda t: np.interp(t, [p[0] for p in vo], [p[1] for p in vo])
    ts = sorted(set([p[0] for p in vo] + [p[0] for p in sd]))
    sdi = {}
    for t in HITS_BIG: sdi[t] = (t - 0.33, t - 0.005)
    out = []
    for t in ts:
        v = f(t)
        for h, (a, b) in sdi.items():
            if a <= t <= b: v = min(v, -9.0)
        out.append([round(t, 3), round(float(v), 2)])
    return out

def design(ev, with_sfx):
    rules = []
    if with_sfx:
        for k, (pool, _, off, align, _) in KIT.items():
            rules.append({'name': f'r.{k}', 'match': {'kind': k}, 'pool': pool, 'mode': 'cycle', 'gain_db': 0.0, 'weight_db': 6.0,
                          'weight_ref': 1.0, 'pan': 0.0, 'align': align, 'offset': off})
    rides = merge_rides(vo_ride(), stopdowns(None))
    D = {'duration': TOTAL, 'cues': 'out/cues.json', 'samples': SAMPLES, 'slices': SLICES, 'pools': POOLS, 'rules': rules, 'music': MUSIC,
         'buses': {'music': {'gain_db': 0.0, 'auto': rides}, 'sfx': {'gain_db': 0.0}}, 'master': {'lufs': -14, 'ceiling': 0.77}}
    json.dump(D, open(f'{R}/audio/sounddesign.json', 'w'), indent=1, ensure_ascii=False)

def write_cues(ev):
    out = {'fps': FPS, 'total': int(round(TOTAL * FPS)), 'events': [dict(f=round(e['t'] * FPS, 3), kind=e['kind'], id=e['id'], weight=round(e['weight'], 4), pan=0.0) for e in ev]}
    json.dump(out, open(f'{R}/out/cues.json', 'w'), indent=0, ensure_ascii=False)
    json.dump(ev, open(f'{R}/out/cues_annotated.json', 'w'), indent=0, ensure_ascii=False)

def space_runs(ev):
    """kit.space_run: a run of one kind never closer than its min gap (drop the later event of a too-close pair)"""
    last, keep = {}, []
    for e in ev:
        g = KIT[e['kind']][4]
        if g and e['kind'] in last and e['t'] - last[e['kind']] < g: e['spaced_out'] = True; continue
        last[e['kind']] = e['t']; keep.append(e)
    return keep

def levels(ev):
    """weight per event so that the effect's loudest 50 ms sits bed_db over the music's median 50 ms in the second before the cue"""
    mus, sr = sf.read(f'{R}/out/pass1/stems/music.wav'); mus = mus.mean(1)
    dump = json.load(open(f'{R}/out/dump/_samples.json'))
    loud = {}
    for name, s in [(x['name'], x) for x in dump if 'name' in x]:
        x, _ = sf.read(f'{R}/out/dump/{s["file"]}'); x = x.mean(1) if x.ndim > 1 else x
        w = int(0.05 * sr); loud[name] = max(20 * np.log10(np.sqrt(np.mean(x[i:i + w] ** 2)) + 1e-9) for i in range(0, max(1, len(x) - w), w // 4))
    pool_l = {p: float(np.mean([loud[n] for n in loud if (n in names or any(n.startswith(m[:-1]) for m in names if m.endswith('*')))]))
              for p, names in POOLS.items()}
    w50 = int(0.05 * sr)
    for e in ev:
        pool, bed_db = KIT[e['kind']][0], KIT[e['kind']][1]
        i = int(e['t'] * sr); i = i - int(0.45 * sr) if e['kind'] in ('hit', 'riser') else i   # big hits: the bed BEFORE the stop-down
        seg = mus[max(0, i - sr):i]
        lv = [20 * np.log10(np.sqrt(np.mean(seg[j:j + w50] ** 2)) + 1e-9) for j in range(0, max(1, len(seg) - w50), w50)] or [-60]
        bed = max(float(np.median(lv)), -32.0)   # before the music enters (cold open) or in silences: never chase the floor
        if e.get('light'): bed_db -= 4.0          # secondary motion (text exits, small slides): a lighter swish
        gain = bed + bed_db - pool_l[pool] + 2.0 * math.log2(e['weight'])
        e['gain_db'] = round(gain, 2)
    from collections import defaultdict
    med = defaultdict(list)
    for e in ev: med[e['kind']].append(e['gain_db'])
    for e in ev:   # one level per class of action: no event more than 3 dB over its class median (the cold-open clips raised a few)
        e['gain_db'] = round(min(e['gain_db'], float(np.median(med[e['kind']])) + 3.0), 2)
        if e['kind'] == 'hit' and e['t'] > 129: e['gain_db'] = round(float(np.median(med['hit'])) + 11.0, 2)   # the closing hit: the last moment at body level (earshot critique: final_lu)
        e['weight'] = 2 ** (e['gain_db'] / 6.0)
    return ev

if __name__ == '__main__':
    import os
    os.makedirs(f'{R}/out', exist_ok=True)
    ev, dropped = cues()
    ev = space_runs(ev)
    if sys.argv[1] == 'pass1':
        write_cues(ev); design(ev, with_sfx=False)
        json.dump(dropped, open(f'{R}/out/dropped_cuts.json', 'w'), indent=0, ensure_ascii=False)
        from collections import Counter
        print(len(ev), 'events', Counter(e['kind'] for e in ev), '| hard cuts / cut-zooms left silent:', len(dropped))
    else:
        ev = levels(ev); write_cues(ev); design(ev, with_sfx=True)
        from collections import defaultdict
        g = defaultdict(list)
        for e in ev: g[e['kind']].append(e['gain_db'])
        print({k: (len(v), round(float(np.median(v)), 1)) for k, v in g.items()})
