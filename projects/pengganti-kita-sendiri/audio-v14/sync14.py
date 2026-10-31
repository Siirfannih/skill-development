"""Sinkron cue v14 ke onset visual di render (diadaptasi dari The Gap tools/sync_cues.py, D-038).
- Cue start-aligned (kata, klik, pop, foto, lampu, slam, impact): geser ke onset visual terdekat ±5 frame (sel grid 8×6 + event global).
  Tidak ada onset dalam ±7 frame → tidak ada yang berubah di layar → cue dibuang (dilaporkan).
- Cue whoosh/whip (align puncak) & riser & ketikan: tidak digeser (waktunya = puncak kecepatan kamera / akhir build dari kode).
- Tabrakan: maks 2 bunyi per 100 ms; tidak boleh dua bunyi satu keluarga dalam 100 ms (kecuali ketikan).
- Cakupan: onset visual kuat yang tidak punya cue dalam ±4 frame → coverage14.json untuk diperiksa.
Pakai: python3 sync14.py <video_tanpa_audio.mp4>"""
import json, sys, subprocess, numpy as np
FPS = 30; W, H = 256, 144; GX, GY = 8, 6
vid = sys.argv[1]
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', vid, '-vf', f'scale={W}:{H},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
d = np.abs(np.diff(fr, axis=0))
cell = d.reshape(len(d), GY, H // GY, GX, W // GX).mean((2, 4)).reshape(len(d), -1)
rise = np.maximum(0, cell[1:] - cell[:-1])
onset = np.concatenate([[0, 0], rise.max(1)])          # index = frame where the change is first visible
thr = np.percentile(onset, 60) + 0.8
dg = d.mean((1, 2)); og = np.maximum(0, dg - np.concatenate([[0], dg[:-1]]))
tg = np.median(og) + 3 * np.median(np.abs(og - np.median(og))) + 0.6
GEV = [i + 1 for i in range(1, len(og) - 1) if og[i] > tg and og[i] >= og[i - 1] and og[i] >= og[i + 1]]
C = json.load(open('cues14.json'))
FIX = {'whoosh', 'whip', 'riser', 'type'}
kept, drops, shifts = [], [], []
for c in C:
    if c['role'] in FIX: kept.append(c); continue
    if '[frame log' in c['visual'] or c.get('src_id','').startswith('log_'):   # kata dari log render: frame persis, +1 f = frame pertama terlihat
        c['t_code'] = c['t']; c['t'] = round(c['t'] + 1 / FPS, 3); kept.append(c); continue
    f0 = int(round(c['t'] * FPS)); a, b = max(1, f0 - 7), min(len(onset) - 1, f0 + 7)
    w = onset[a:b + 1]
    cand = [a + i for i in range(len(w)) if w[i] >= max(thr, 0.6 * w.max())] + [g for g in GEV if a <= g <= b]
    if not cand:
        drops.append(dict(t=c['t'], role=c['role'], visual=c['visual'][:70], why='tidak ada perubahan visual ±7 f')); continue
    near5 = [x for x in cand if abs(x - f0) <= 5]
    fe = min(near5 or cand, key=lambda x: abs(x - f0))
    if abs(fe - f0) > 5: fe = f0       # onset hanya di 6–7 f: event ada tapi jangan geser jauh
    c['t_code'] = c['t']; c['t'] = round(fe / FPS, 3); shifts.append(fe - f0); kept.append(c)
FAM = lambda c: c['fam'] if c['role'] != 'type' else 'type'
PRI = ['impact', 'slam', 'word', 'whip', 'whoosh', 'riser', 'click', 'message', 'ui_pop', 'land', 'type', 'light', 'photo', 'trash', 'draw', 'shutter']
kept.sort(key=lambda c: c['t']); final = []
for c in kept:
    near = [o for o in final if abs(o['t'] - c['t']) < 0.1 and 'riser' not in (o['role'], c['role'])]
    same = [o for o in near if o['role'] == c['role'] and c['role'] != 'type']
    if same or len(near) >= 2:
        worst = max(near + [c], key=lambda o: PRI.index(o['role']))
        drops.append(dict(t=worst['t'], role=worst['role'], visual=worst['visual'][:70], why='tabrakan ≤100 ms'))
        if worst is c: continue
        final.remove(worst)
    final.append(c)
json.dump(final, open('cues14s.json', 'w'), indent=0, ensure_ascii=False)
# cakupan: onset kuat (global atau sel kuat) tanpa cue ±4 f
strong = sorted(set([g for g in GEV] + [i for i in range(2, len(onset)) if onset[i] > np.percentile(onset, 97)]))
ct = np.array([c['t'] * FPS for c in final] + [(c['t'] - 0.0) * FPS for c in final])
unc = []
last = -99
for s in strong:
    if s - last < 4: continue
    if not len(ct) or np.min(np.abs(ct - s)) > 4: unc.append(dict(t=round(s / FPS, 2), strength=round(float(onset[s]), 1), glob=s in GEV)); last = s
json.dump(dict(drops=drops, uncovered=unc), open('coverage14.json', 'w'), indent=0, ensure_ascii=False)
sh = np.array(shifts)
from collections import Counter
print(f'cue {len(C)} → {len(final)}; dibuang {len(drops)} {dict(Counter(d["why"] for d in drops))}')
print(f'geser (frame): median |{np.median(np.abs(sh)):.1f}|, >2 f: {(np.abs(sh) > 2).sum()}, bunyi mendahului objek (digeser maju): {(sh > 2).sum()}, tertinggal: {(sh < -2).sum()}')
print('onset kuat tanpa cue:', len(unc), [u['t'] for u in unc][:60])
