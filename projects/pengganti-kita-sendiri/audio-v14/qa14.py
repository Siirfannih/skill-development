"""QA v14 — dibandingkan dengan referensi yang lulus (The Gap v18) dan referensi Irfan, bukan angka absolut dari Gemini.
1 gema VO: energi ekor 40–150 ms setelah akhir kata VO relatif level kata (v13 vs v14)
2 celah: jendela 100 ms < −45 dBFS; potongan mendadak tepat di batas klip (±0,15 dtk)
3 SFX: puncak per peran relatif puncak VO; porsi > 6 kHz dan 2–6 kHz bus SFX vs sibilan VO (The Gap: 0 SFX lebih tajam dari 's' VO)
4 cakupan: setiap kata kinetik (log render) punya tepat satu bunyi; tidak ada event dengan > 1 bunyi dalam 2 frame
"""
import json, sys, numpy as np, soundfile as sf
sys.path.insert(0, '/home/claude/skill-development/claude/motion-graphic/scripts'); import audio_qa as q
SR = 48000; T = json.load(open('timeline.json')); P = json.load(open('placed14.json'))
rep = {}
def tail_ratio(d):
    r = []
    for w in T['words']:
        b = [x for x in T['blocks'] if x['kind'] == 'vo' and x['t'] <= w['s'] < x['t'] + x['dur']]
        if not b: continue
        nxt = [v['s'] for v in T['words'] if v['s'] > w['e']]
        if nxt and nxt[0] - w['e'] < 0.2: continue                       # hanya kata dengan jeda sesudahnya
        a, e = int(w['s'] * SR), int(w['e'] * SR)
        lw = np.sqrt(np.mean(d[a:e] ** 2)) + 1e-9; lt = np.sqrt(np.mean(d[e + int(0.04 * SR):e + int(0.15 * SR)] ** 2)) + 1e-9
        r.append(20 * np.log10(lt / lw))
    return round(float(np.median(r)), 1), len(r)
for nm, p in [('v13', '../mix13/stem_dialog_g.wav'), ('v14', 'stem_dialog_g.wav')]:
    d, _ = sf.read(p); d = d if d.ndim == 1 else d.mean(1); rep[f'echo_tail_db_{nm}'] = tail_ratio(d)
m, _ = sf.read('mix_master.wav'); mm = m.mean(1)
e100 = q.env_db(mm, 0.1); rep['silent_100ms'] = [round(i * 0.1, 1) for i in np.where(e100[:-20] < -45)[0]]
ab = q.abrupt(mm); ends = [b['t'] + b['dur'] for b in T['blocks'] if b['kind'] == 'clip'] + [b['t'] for b in T['blocks'] if b['kind'] == 'clip']
rep['abrupt_at_clip_edges'] = sorted({round(a, 2) for a in ab for e in ends if abs(a - e) < 0.15})
s, _ = sf.read('stem_sfx.wav'); s = s.mean(1); d, _ = sf.read('stem_dialog_g.wav'); d = d if d.ndim == 1 else d.mean(1)
g = json.load(open('qa14.json'))[0]['module5']['master_gain_db'] if False else None
vo_pk = np.percentile(np.abs(d[np.abs(d) > 1e-3]), 99.9)
def band(x, lo, hi):
    X = np.abs(np.fft.rfft(x * np.hanning(len(x)))) ** 2; f = np.fft.rfftfreq(len(x), 1 / SR); return X[(f >= lo) & (f < hi)].sum() / (X[f >= 20].sum() + 1e-12)
# sibilan VO: 99 persentil porsi > 6 kHz di jendela 30 ms ucapan
win = int(0.03 * SR); sib = []
for i in range(0, len(d) - win, win * 4):
    x = d[i:i + win]
    if np.sqrt(np.mean(x ** 2)) > vo_pk * 0.05: sib.append(band(x, 6000, 20000))
sib_ref = float(np.percentile(sib, 99)); rep['vo_sibilance_hi6_p99'] = round(sib_ref, 3)
from collections import defaultdict
R = defaultdict(list); sharp = []
for p in P:
    i = int(max(0, p['start']) * SR); x = s[i:i + int(0.25 * SR)]
    if not len(x) or np.abs(x).max() < 1e-6: continue
    R[p['role']].append((20 * np.log10(np.abs(x).max() / vo_pk), band(x, 2000, 6000), band(x, 6000, 20000)))
    if band(x, 6000, 20000) > sib_ref: sharp.append((p['id'], round(band(x, 6000, 20000), 3)))
rep['sfx_by_role'] = {k: dict(n=len(v), peak_vs_vo_db=round(float(np.median([a for a, _, _ in v])), 1), b2_6k=round(float(np.median([b for _, b, _ in v])), 2), hi6=round(float(np.median([c for _, _, c in v])), 3)) for k, v in R.items()}
rep['sfx_sharper_than_vo_sibilance'] = sharp
words = [l.split() for l in open('/home/claude/pks-out/word_events.txt')]
wt = [float(w[1]) for w in words]; st = [p['t'] for p in P if p['role'] in ('word', 'slam')]
rep['words_total'] = len(wt); rep['words_with_sfx'] = sum(1 for t in wt if any(abs(t + 1 / 30 - x) < 0.07 or abs(t - x) < 0.07 for x in st))
rep['missing_words'] = [w[3] for w, t in zip(words, wt) if not any(abs(t + 1 / 30 - x) < 0.07 or abs(t - x) < 0.07 for x in st)]
ts = sorted(p['t'] for p in P); rep['events_within_2f'] = sum(1 for a, b in zip(ts, ts[1:]) if b - a < 2 / 30)
rep['sfx_cues'] = len(P); rep['sfx_per_sec'] = round(len(P) / T['total'], 2)
print(json.dumps(rep, ensure_ascii=False, indent=0))
json.dump(rep, open('qa14_extra.json', 'w'), indent=0, ensure_ascii=False)
