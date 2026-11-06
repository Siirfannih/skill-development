"""audio_phone.py --fix menulis tools/cue_gain.json berkunci waktu-hit; ubah ke kunci jangkar (cue_gain_anchor.json)."""
import json, os
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pl = json.load(open(f'{P}/render/placed.json')); g = json.load(open(f'{P}/tools/cue_gain.json'))
ga = json.load(open(f'{P}/tools/cue_gain_anchor.json')) if os.path.exists(f'{P}/tools/cue_gain_anchor.json') else {}
for q in pl:
    k = f"{q['t_hit']:.4f}|{q['kind']}"
    if k in g:
        a = f"{q['t']:.4f}|{q['kind']}"; ga[a] = round(min(8.0, ga.get(a, 0) + g[k]), 1)
json.dump(ga, open(f'{P}/tools/cue_gain_anchor.json', 'w'), indent=0); os.remove(f'{P}/tools/cue_gain.json')
print('anchor gains', len(ga))
