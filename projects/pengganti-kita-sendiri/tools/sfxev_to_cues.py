"""SFXEV (penanda kode, dari render segmen) -> cues JSON untuk mix_v19.py.
Pemetaan jenis lama v8 -> peran library v9 (SFX-CATALOG-V9 pilihan 1). Aturan Irfan:
- tanpa suara keyboard: burst 'key' -> satu telemetry_blip per burst (jeda > 0,4 s = burst baru)
- satu event satu bunyi; maks 2 bunyi per 100 ms (prioritas: impact > anchor > UI > whoosh)
- bunyi jatuh tepat di frame objek (t dari penanda), pan dari penanda bila ada.
usage: python3 sfxev_to_cues.py out.json a.sfx b.sfx ...
"""
import sys, json, re

F = {  # role -> (file, gainDb rel. puncak dialog, trim s, prioritas)
    'sub_impact': ('deep-boom-impact__2f0a40ab.wav', -12, None, 5),
    'low_whoosh': ('sub-cinematic-01__a9946ddf.wav', -14, None, 3),
    'scifi_whoosh': ('tech-data-transition-10__33907101.wav', -20, None, 4),
    'glass_ping': ('ui-confirm-menu__998fe887.wav', -20, None, 2),
    'ui_tap': ('menu-select-notif-24__19f645e5.wav', -20, None, 2),
    'telemetry_blip': ('telemetry-data-readout-01__6bf8bd1d.wav', -26, 0.35, 1),
    'snap_click': ('low-zap-pop__6ef71795.wav', -18, None, 3),
    'graph_riser': ('shepard-tone-up-09__25747e8d.wav', -22, 4.0, 2),
}
MAP = {  # jenis penanda -> peran (None = buang)
    'sub_impact': 'sub_impact', 'land': 'sub_impact', 'low_whoosh': 'low_whoosh', 'scifi_whoosh': 'scifi_whoosh',
    'glass_ping': 'glass_ping', 'toggle': 'glass_ping', 'pop': 'glass_ping', 'ui_tap': 'ui_tap', 'click': 'ui_tap',
    'trash': 'ui_tap', 'snap': 'snap_click', 'snap_click': 'snap_click', 'graph_riser': 'graph_riser',
    'riser': 'scifi_whoosh',  # riser bloom lama (flash dihapus) -> whoosh tipis di match cut
    'key': 'telemetry_blip',
}
def role_for(kind, ident):
    if kind == 'whoosh':
        return 'low_whoosh' if (':cam:' in ident or 'snapwide' in ident or 'reveal' in ident) else 'scifi_whoosh'
    if kind == 'draw':
        return 'graph_riser' if 'line' in ident else None
    if kind == 'cut':
        return None  # potongan keras = sunyi (bed musik sudah mengikat); transisi bergerak sudah punya whoosh sendiri
    return MAP.get(kind)

ev = []
for p in sys.argv[2:]:
    for line in open(p):
        m = re.match(r'SFXEV (\S+) ([\d.]+) (\S+)(?: pan=(-?[\d.]+))?', line.strip())
        if m: ev.append((float(m.group(2)), m.group(1), m.group(3), float(m.group(4) or 0)))
ev.sort()
cues, last_key, seen = [], -9, set()
for t, kind, ident, pan in ev:
    if ident in seen or ':return:' in ident: continue  # 1 event 1 bunyi: tarik kartu sudah ber-whoosh
    seen.add(ident)
    r = role_for(kind, ident)
    if not r: continue
    if r == 'telemetry_blip':
        if t - last_key < 0.4: last_key = t; continue
        last_key = t
    f, g, trim, pr = F[r]
    c = dict(role=r, file=f, t=round(t, 3), gainDb=g, pan=pan, prio=pr, src=ident)
    if trim: c['trim'] = trim; c['fadeOut'] = 0.15 if r == 'telemetry_blip' else 0.8
    cues.append(c)
# kepadatan: maks 2 per 100 ms, peran sama tidak dalam 90 ms
out = []
for c in sorted(cues, key=lambda c: (-c['prio'], c['t'])):
    near = [o for o in out if abs(o['t'] - c['t']) < 0.1]
    gap = 0.25 if c['role'] == 'snap_click' else 0.09  # montase foto: maks 4 snap/dtk
    same = [o for o in out if o['role'] == c['role'] and abs(o['t'] - c['t']) < gap]
    if len(near) >= 2 or same: continue
    out.append(c)
out.sort(key=lambda c: c['t'])
json.dump(out, open(sys.argv[1], 'w'), indent=1)
from collections import Counter
print(len(ev), 'penanda ->', len(out), 'cue', dict(Counter(c['role'] for c in out)))
