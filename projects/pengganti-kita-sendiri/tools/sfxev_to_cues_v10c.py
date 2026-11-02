"""PKS v10c · SFXEV (penanda kode) -> cue SFX. Pengganti sfxev_to_cues.py.
Aturan Irfan 2 Nov 12.36/12.41 (pola The Gap v18 + video #2 "20 konten"):
- satu KATA KODE = satu BUNYI yang sama sepanjang video (tidak dirotasi acak);
- pergantian foto/gambar = klik kamera (shutter) satu bunyi per gambar, BUKAN whoosh;
- whoosh hanya bila kamera/objek benar-benar bergerak (dicek di kurva gerak video); puncaknya jatuh di v_max;
- setiap kata kinetik yang muncul = klik (seperti mouse/tap);
- bunyi renyah, agak nyaring, bernada (Apple motion), tidak deep: low_whoosh/sub dibuang;
- tanpa bunyi bila tidak ada objek; maks 2 bunyi / 100 ms; satu event satu bunyi.
usage: python3 sfxev_to_cues_v10c.py <events.sfx> <motion.json> <palette.json> <out_cues.json> <report.md>
palette.json: {role: file}  (file relatif ke <sfx_root>/<role>/)
"""
import sys, json, re
import numpy as np

SFX, MOTION, PAL, OUT, REP = sys.argv[1:6]
pal = json.load(open(PAL)); mo = json.load(open(MOTION)); FPS = mo['fps']
flow = np.array(mo['flow']); glob = np.array(mo['glob']); onset = np.array(mo['onset'])

def role_for(kind, ident):
    obj = ident.split(':')[1] if ':' in ident else ident
    if kind == 'word' or ident.startswith('word:'): return 'word'
    if obj == 'photo' or kind in ('snap', 'snap_click'): return 'shutter'
    if kind == 'whoosh' or kind in ('low_whoosh', 'scifi_whoosh', 'riser'): return 'whoosh'
    if kind == 'draw': return 'glide' if 'line' in ident else None
    if kind == 'cut': return None                       # potongan keras: bunyi sudah dibawa objek sesudahnya
    if obj == 'light' or kind == 'toggle' and obj in ('light', 'beam', 'bloom'): return 'switch'
    if obj == 'tick' or kind == 'notify': return 'tonal'  # centang/berhasil = nada pendek yang memuaskan
    if kind == 'trash': return 'trash'
    if kind in ('click', 'ui_tap', 'key'): return 'click'
    if kind in ('pop', 'glass_ping', 'toggle'): return 'pop'
    if kind in ('land', 'sub_impact', 'hit'):
        return 'word' if obj == 'anchor' else 'hit'      # kata jangkar = tipografi -> klik; objek mendarat -> thud lembut
    if kind == 'graph_riser': return 'glide'
    return None

PRIO = {'hit': 6, 'shutter': 5, 'whoosh': 4, 'switch': 4, 'tonal': 3, 'pop': 3, 'click': 3, 'trash': 3, 'glide': 2, 'word': 1}
ALIGN = {'whoosh': 'peak', 'glide': 'start'}

ev = []
for line in open(SFX):
    m = re.match(r'SFXEV (\S+) ([\d.]+) (\S+)(?: pan=(-?[\d.]+))?', line.strip())
    if m: ev.append((float(m.group(2)), m.group(1), m.group(3), float(m.group(4) or 0)))
ev.sort()
log, cues, seen, last_key = [], [], set(), -9
for t, kind, ident, pan in ev:
    if ident in seen or ':return:' in ident: continue
    seen.add(ident)
    r = role_for(kind, ident)
    if not r: log.append(f'{t:7.2f} {ident:34s} -> (tanpa bunyi: {kind})'); continue
    if kind == 'key':                                    # ketikan: satu klik per burst
        if t - last_key < 0.4: last_key = t; continue
        last_key = t
    f0 = int(round(t * FPS))
    if r == 'whoosh':
        # gerak nyata? puncak gerak kamera (phase-corr) atau perubahan global di [t-3f, t+18f]
        a, b = max(1, f0 - 3), min(len(flow) - 1, f0 + 18)
        fl, gl = flow[a:b + 1], glob[a:b + 1]
        moving = fl.max() >= 2.0 or gl.max() >= 6.0
        if not moving:
            log.append(f'{t:7.2f} {ident:34s} -> DIBUANG whoosh: tidak ada gerak (flow {fl.max():.1f}, glob {gl.max():.1f})'); continue
        pk = a + int(np.argmax(fl if fl.max() >= 2.0 else gl))
        tt = pk / FPS
        log.append(f'{t:7.2f} {ident:34s} -> whoosh, puncak di v_max {tt:.2f} ({(tt - t) * 1000:+.0f} ms)')
        t = tt
    elif r in ('shutter', 'pop', 'click', 'tonal', 'switch', 'hit', 'trash'):
        # transien jatuh di frame objek pertama terlihat (onset ±4 f); tidak ada onset -> tetap di frame kode
        a, b = max(2, f0 - 4), min(len(onset) - 1, f0 + 4)
        w = onset[a:b + 1]
        if w.max() > np.percentile(onset, 60) + 0.8:
            fe = a + int(np.argmax(w)); t2 = fe / FPS
            if abs(t2 - t) > 0.001: log.append(f'{t:7.2f} {ident:34s} -> {r}, geser ke onset {t2:.2f} ({(t2 - t) * 1000:+.0f} ms)')
            t = t2
    cues.append(dict(role=r, file=pal[r], t=round(t, 3), pan=round(pan * 0.6, 2), prio=PRIO[r], align=ALIGN.get(r, 'onset'), src=ident))

# satu event satu bunyi: klik kata dibuang bila event lain jatuh <= 2 f; maks 2 bunyi / 100 ms; peran sama >= 90 ms
out = []
GAP = {'shutter': 0.2, 'hit': 1.2, 'whoosh': 0.35, 'word': 0.09}
for c in sorted(cues, key=lambda c: (-c['prio'], c['t'])):
    if c['role'] == 'word' and any(abs(o['t'] - c['t']) <= 2 / FPS for o in out):
        log.append(f"{c['t']:7.2f} {c['src']:34s} -> klik kata dilebur ke event lain"); continue
    near = [o for o in out if abs(o['t'] - c['t']) < 0.1]
    same = [o for o in out if o['role'] == c['role'] and abs(o['t'] - c['t']) < GAP.get(c['role'], 0.09)]
    if len(near) >= 2 or same:
        log.append(f"{c['t']:7.2f} {c['src']:34s} -> dibuang (padat: {len(near)} dekat / {len(same)} sama)"); continue
    out.append(c)
out.sort(key=lambda c: c['t'])
json.dump(out, open(OUT, 'w'), indent=1)
from collections import Counter
cnt = Counter(c['role'] for c in out)
open(REP, 'w').write('# Peta SFX v10c (kata kode -> bunyi)\n\n' + '\n'.join(f'- `{k}`: {v} cue, file `{pal[k]}`' for k, v in sorted(cnt.items())) +
                     f'\n\n{len(ev)} penanda -> {len(out)} cue\n\n```\n' + '\n'.join(sorted(log)) + '\n```\n')
print(len(ev), 'penanda ->', len(out), 'cue', dict(cnt))
