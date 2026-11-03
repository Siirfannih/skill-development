# Ringkas timeline earshot: jenis bunyi (label/kind), centroid, prominence, jarak ke potongan gambar terdekat, kepadatan.
import json, sys, collections, numpy as np
for p in sys.argv[1:]:
    d = json.load(open(p)); ev = d['events']; dur = d['duration']
    cuts = [c['t'] if isinstance(c, dict) else c for c in (d.get('cuts') or [])]
    tagged = [e for e in ev if e.get('label')]
    print(f"\n### {p.split('/')[-1]}  dur {dur:.1f}s  LUFS {d['loudness']['integrated_lufs']}  events {len(ev)} ({len(ev)/dur:.2f}/s)  cuts {len(cuts)}  tempo {d['music'].get('tempo')}")
    print('summary:', (d.get('summary') or '')[:600])
    K = collections.Counter(e.get('kind') for e in tagged); L = collections.Counter(e['label'] for e in tagged)
    print('kind:', dict(K)); print('label top:', L.most_common(14))
    cen = collections.defaultdict(list); prom = collections.defaultdict(list)
    for e in tagged: cen[e.get('kind')].append(e.get('centroid_hz', 0)); prom[e.get('kind')].append(e.get('prominence_db', 0))
    print('centroid median per kind:', {k: int(np.median(v)) for k, v in cen.items()})
    print('prominence median per kind (dB di atas bed):', {k: round(float(np.median(v)), 1) for k, v in prom.items()})
    if cuts:
        off = []
        for e in ev:
            c = min(cuts, key=lambda c: abs(c - e['t'])); off.append(e['t'] - c)
        off = np.array(off); near = np.abs(off) <= 0.1
        print(f'event dalam ±100 ms potongan: {near.mean()*100:.0f} %; cuts tanpa event ±100 ms: {sum(1 for c in cuts if not any(abs(e["t"]-c)<=0.1 for e in ev))}/{len(cuts)}')
    sy = d.get('sync') or {}
    if sy: print('sync:', json.dumps(sy)[:400])
    for e in tagged[:40]:
        print(f"  {e['t']:6.2f} {e.get('kind',''):8s} {e['label'][:30]:30s} c={e.get('centroid_hz')} prom={e.get('prominence_db')} len={e.get('length_ms')}")
