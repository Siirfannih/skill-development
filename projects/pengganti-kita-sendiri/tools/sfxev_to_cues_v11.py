"""PKS v11 · SFXEV (penanda kode) -> cue SFX memakai folder SFXIrfan (nama file = fungsi; Irfan 2 Nov 14.18).
Setiap file 'family' sudah dipotong per varian (ears/family.py) dan varian terpilih ada di palette_v11.json.
Aturan:
- kata kode -> peran -> bunyi tetap (kecuali peran 'acak' dari Irfan: kinetic typography, potongan variasi, ketukan tombol);
- whoosh = hanya gerak kamera nyata (flow >= 4 px/f atau beda global >= 8), jarak >= 1,5 dtk (Irfan: whoosh berisik & spam);
  gerak objek (drag, salip, shrink, terbang) = 'move' lembut, bukan whoosh;
- foto pertama montase = gambarpertama, foto berikutnya = klik pergantian foto;
- setiap kata kinetik = klik kinetic acak; kata pertama frasa = Katapertama;
- ketikan: satu ketukan per huruf (penanda key) atau rentang 'type' start/end -> potongan Keyboardtyping sepanjang ketikan + Enter;
- maks 2 bunyi / 100 ms; klik kata dilebur bila event lain jatuh <= 2 f.
usage: python3 sfxev_to_cues_v11.py <events.sfx> <motion.json> <palette_v11.json> <out_cues.json> <report.md>
"""
import sys, json, re, random
import numpy as np

SFX, MOTION, PAL, OUT, REP = sys.argv[1:6]
pal = json.load(open(PAL)); mo = json.load(open(MOTION)); FPS = mo['fps']
flow = np.array(mo['flow']); glob = np.array(mo['glob']); onset = np.array(mo['onset'])
rng = random.Random(11)
CAM_WORDS = ('cam', 'snapwide', 'crane', 'reveal', 'punch', 'whip', 'breakwide', 'pan', 'truck', 'tilt')
MOVE_OBJ = ('drag', 'return', 'salip', 'shrink', 'dots', 'head', 'icons', 'x01', 'x13', 'altman', 'ceo', 'orbit', 'text', 'paint')

def role_for(kind, ident):
    p = ident.split(':'); obj = p[1] if len(p) > 1 else ident
    if p[0] == 'word' or kind == 'word': return 'word'
    if obj == 'anchor': return 'word'
    if kind == 'type': return 'typing'
    if kind == 'key': return 'key'
    if obj == 'photo': return 'photo_first' if p[-1] == '0' else 'photo'
    if kind == 'snap': return 'photo'
    if kind == 'cut':
        return {'cut': 'cut', 'cutzoom': 'cut_contrast', 'in': 'cut_var', 'clip': 'cut_var'}.get(obj, 'cut_var')
    if kind in ('whoosh', 'scifi_whoosh', 'low_whoosh'):
        if obj == 'time': return 'scan'
        if obj in MOVE_OBJ: return 'move'
        if obj in ('cut', 'wipe'): return 'cut_var'          # potongan/wipe = klik variasi, bukan whoosh
        return 'cam_whoosh'
    if kind == 'riser': return 'big_swoosh' if ident.startswith('04a:cut') else 'riser'
    if kind == 'draw': return 'curve' if obj in ('line', 'axis', 'wire') else 'move'
    if kind == 'trash': return 'trash'
    if kind == 'click':
        return 'enter' if obj in ('send', 'sendceo', 'hp', 'laptop', 'tablet', 'enter') else 'click'
    if kind == 'ui_tap': return 'tick' if obj == 'tick' else 'click'
    if kind == 'glass_ping': return 'notif' if obj == 'cal' else 'ai_pop'
    if kind == 'toggle':
        if obj == 'scan': return 'glitch' if p[-1] == 'on' else None
        return 'light'
    if kind == 'pop':
        if obj in ('agent', 'icon'): return 'ai_pop'
        if obj == 'reply': return 'ai_reply'
        if obj == 'photo': return 'photo'
        if obj in ('grey', 'glyph') and p[-1] in ('spread', 'all'): return 'spread'
        if obj == 'grey': return None
        return 'pop'
    if kind == 'land': return 'land'
    if kind in ('hit', 'sub_impact'):
        if obj == 'boom': return 'boom'
        if obj == 'head': return 'ai_reply'
        if obj == 'cal': return 'land'
        return 'land'
    return None

PRIO = {'boom': 7, 'photo_first': 6, 'photo': 6, 'cut': 6, 'cut_contrast': 6, 'cut_var': 5, 'enter': 6, 'cam_whoosh': 5, 'whoosh': 5,
        'big_swoosh': 5, 'riser': 4, 'spread': 5, 'tick': 5, 'ai_pop': 4, 'ai_reply': 4, 'notif': 4, 'light': 4, 'glitch': 4,
        'pop': 3, 'land': 3, 'click': 3, 'trash': 3, 'move': 2, 'curve': 2, 'scan': 2, 'typing': 3, 'key': 2, 'word_first': 2, 'word': 1}
ALIGN = {'cam_whoosh': 'peak', 'whoosh': 'peak', 'big_swoosh': 'peak', 'riser': 'peak', 'move': 'peak', 'boom': 'onset', 'spread': 'onset',
         'typing': 'start', 'curve': 'start'}
RANDOM = ('word', 'cut_var', 'key')

ev = []
for line in open(SFX):
    m = re.match(r'SFXEV (\S+) ([\d.]+) (\S+)(?: pan=(-?[\d.]+))?', line.strip())
    if m: ev.append((float(m.group(2)), m.group(1), m.group(3), float(m.group(4) or 0)))
ev.sort()
log, cues, seen = [], [], set()
type_open = {}
last_word = -9
for t, kind, ident, pan in ev:
    if ident in seen: continue
    seen.add(ident)
    r = role_for(kind, ident)
    if not r: log.append(f'{t:7.2f} {ident:36s} -> (tanpa bunyi: {kind})'); continue
    if r == 'typing':                                   # rentang ketikan: start ... end
        base = ident.rsplit(':', 1)[0]
        if ident.endswith(':start'): type_open[base] = t; continue
        if ident.endswith(':end') and base in type_open:
            t0 = type_open.pop(base); d = max(0.25, t - t0 + 0.08)
            cues.append(dict(role='typing', file=pal['typing'][0], t=round(t0, 3), trim=round(d, 3), fadeOut=0.06, pan=0.0, prio=PRIO['typing'], align='start', src=base))
            log.append(f'{t0:7.2f} {base:36s} -> typing {d:.2f} dtk')
        continue
    if r == 'word':
        if t - last_word > 0.6: r = 'word_first'
        last_word = t
    f0 = int(round(t * FPS))
    if r == 'cam_whoosh':
        a, b = max(1, f0 - 3), min(len(flow) - 1, f0 + 10)
        fl, gl = flow[a:b + 1], glob[a:b + 1]
        if not (fl.max() >= 8.0 or gl.max() >= 14.0):   # hanya gerak kamera besar (ref: 3–5 whoosh per video)
            log.append(f'{t:7.2f} {ident:36s} -> whoosh DIBUANG: gerak kecil (flow {fl.max():.1f}, glob {gl.max():.1f})'); continue
        pk = a + int(np.argmax(fl if fl.max() >= 4.0 else gl)); t = pk / FPS
    elif r in ('whoosh', 'move', 'riser', 'big_swoosh'):
        a, b = max(1, f0 - 3), min(len(flow) - 1, f0 + 10)
        fl, gl = flow[a:b + 1], glob[a:b + 1]
        if fl.max() >= 2.0 or gl.max() >= 5.0:
            t = (a + int(np.argmax(fl if fl.max() >= 2.0 else gl))) / FPS
    elif r not in ('word', 'word_first', 'key'):
        a, b = max(2, f0 - 4), min(len(onset) - 1, f0 + 4)
        w = onset[a:b + 1]
        if w.max() > np.percentile(onset, 60) + 0.8: t = (a + int(np.argmax(w))) / FPS
    files = pal[r]
    f = rng.choice(files) if r in RANDOM else files[0]
    cues.append(dict(role=r, file=f, t=round(t, 3), pan=round(pan * 0.6, 2), prio=PRIO[r], align=ALIGN.get(r, 'peak'), src=ident))

out = []
GAP = {'cam_whoosh': 3.0, 'whoosh': 3.0, 'big_swoosh': 3.0, 'riser': 2.0, 'boom': 3.0, 'spread': 3.0, 'photo': 0.18, 'photo_first': 0.18,
       'word': 0.09, 'word_first': 0.09, 'key': 0.06, 'move': 0.35, 'light': 0.12}
for c in sorted(cues, key=lambda c: (-c['prio'], c['t'])):
    if c['role'] in ('word', 'word_first') and any(abs(o['t'] - c['t']) <= 2 / FPS and o['role'] not in ('key',) for o in out):
        log.append(f"{c['t']:7.2f} {c['src']:36s} -> klik kata dilebur"); continue
    if c['role'] == 'key' and any(o['role'] == 'typing' and o['t'] - 0.05 <= c['t'] <= o['t'] + o['trim'] for o in out):
        continue
    near = [o for o in out if abs(o['t'] - c['t']) < 0.1 and o['role'] != 'typing']
    same = [o for o in out if o['role'] == c['role'] and abs(o['t'] - c['t']) < GAP.get(c['role'], 0.09)]
    if len(near) >= 2 or same:
        log.append(f"{c['t']:7.2f} {c['src']:36s} -> dibuang (padat/sama: {len(near)}/{len(same)})"); continue
    out.append(c)
out.sort(key=lambda c: c['t'])
json.dump(out, open(OUT, 'w'), indent=1)
from collections import Counter
cnt = Counter(c['role'] for c in out)
open(REP, 'w').write('# Peta SFX v11 (folder SFXIrfan, kata kode -> bunyi)\n\n' +
                     '\n'.join(f'- `{k}`: {v} cue · {", ".join(pal[k])}' for k, v in sorted(cnt.items())) +
                     f'\n\n{len(ev)} penanda -> {len(out)} cue\n\n```\n' + '\n'.join(sorted(log)) + '\n```\n')
print(len(ev), 'penanda ->', len(out), 'cue', dict(cnt))
