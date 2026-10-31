"""Profil SFX referensi: dari stem no_vocals (demucs) cari transien, ukur level relatif VO, durasi, pita, kelas kasar.
Pakai: python3 sfx_profile.py <nama> [<nama> ...]   (membaca sep/htdemucs/<nama>/{vocals,no_vocals}.wav, menulis prof_<nama>.json)
Catatan: demucs memasukkan musik + SFX ke no_vocals; transien dibedakan dari musik dengan onset yang menonjol > 6 dB di atas
median 1 dtk sekitarnya. Kelas hanya heuristik (durasi + centroid + porsi pita), bukan pengenalan bunyi."""
import sys, json, numpy as np, soundfile as sf, librosa, pyloudnorm as pyln
from scipy.signal import butter, sosfilt

def bandpow(x, sr, lo, hi):
    X = np.abs(np.fft.rfft(x * np.hanning(len(x)))) ** 2; f = np.fft.rfftfreq(len(x), 1 / sr)
    return X[(f >= lo) & (f < hi)].sum() / (X[f >= 20].sum() + 1e-12)

def run(nm):
    v, sr = sf.read(f'sep/htdemucs/{nm}/vocals.wav'); o, _ = sf.read(f'sep/htdemucs/{nm}/no_vocals.wav')
    vm, om = v.mean(1), o.mean(1); meter = pyln.Meter(sr)
    mix = v + o
    res = dict(name=nm, dur=round(len(om) / sr, 1), I_mix=round(meter.integrated_loudness(mix), 1),
               I_vocal=round(meter.integrated_loudness(v), 1), I_other=round(meter.integrated_loudness(o), 1))
    h = int(0.01 * sr); n = len(om) // h
    env = 20 * np.log10(np.sqrt((om[:n * h].reshape(n, h) ** 2).mean(1)) + 1e-9)
    venv = 20 * np.log10(np.sqrt((vm[:n * h].reshape(n, h) ** 2).mean(1)) + 1e-9)
    bed = np.array([np.median(env[max(0, i - 50):i + 50]) for i in range(n)])
    on = librosa.onset.onset_detect(y=om.astype(np.float32), sr=sr, hop_length=h, backtrack=True, units='frames', delta=0.08)
    ev = []
    for i in on:
        j = i + int(np.argmax(env[i:i + 15])) if i + 15 < n else i
        prom = env[j] - bed[j]
        if prom < 6: continue
        k = j
        while k < n - 1 and env[k] > env[j] - 20 and k - j < 200: k += 1
        seg = om[i * h:max(k, i + 3) * h]
        if len(seg) < 256: continue
        S = np.abs(np.fft.rfft(seg * np.hanning(len(seg)))); f = np.fft.rfftfreq(len(seg), 1 / sr)
        cen = float((S * f).sum() / (S.sum() + 1e-12))
        lo, mid, hi26, hi6 = bandpow(seg, sr, 20, 250), bandpow(seg, sr, 250, 2000), bandpow(seg, sr, 2000, 6000), bandpow(seg, sr, 6000, 20000)
        rise = (j - i) * 0.01; dur = (k - i) * 0.01
        vo_here = np.max(venv[max(0, j - 30):j + 30])
        cls = ('impact' if lo > 0.5 else 'click' if dur < 0.08 and cen > 1500 else 'pop' if dur < 0.25 and mid > 0.45
               else 'whoosh' if rise > 0.08 or dur > 0.35 else 'tick/ui')
        ev.append(dict(t=round(i * 0.01, 2), peak=round(float(env[j]), 1), prom=round(float(prom), 1), vo_near=round(float(vo_here), 1),
                       rel_vo=round(float(env[j] - vo_here), 1) if vo_here > -45 else None, rise=round(rise, 2), dur=round(dur, 2),
                       cen=int(cen), lo=round(lo, 2), mid=round(mid, 2), hi26=round(hi26, 2), hi6=round(hi6, 3), cls=cls))
    res['n_events'] = len(ev); res['per_sec'] = round(len(ev) / res['dur'], 2)
    rel = [e['rel_vo'] for e in ev if e['rel_vo'] is not None]
    res['sfx_peak_vs_vo_peak_db'] = dict(median=round(float(np.median(rel)), 1), p25=round(float(np.percentile(rel, 25)), 1), p75=round(float(np.percentile(rel, 75)), 1)) if rel else None
    res['bed_vs_vo_db'] = round(float(np.median(bed[venv > -35]) - np.median(venv[venv > -35])), 1)
    from collections import Counter
    res['classes'] = Counter(e['cls'] for e in ev)
    for c in res['classes']:
        E = [e for e in ev if e['cls'] == c]
        res[f'cls_{c}'] = dict(n=len(E), cen=int(np.median([e['cen'] for e in E])), hi26=round(float(np.median([e['hi26'] for e in E])), 2),
                               hi6=round(float(np.median([e['hi6'] for e in E])), 3), dur=round(float(np.median([e['dur'] for e in E])), 2),
                               rel_vo=round(float(np.median([e['rel_vo'] for e in E if e['rel_vo'] is not None] or [np.nan])), 1))
    gaps = np.diff([e['t'] for e in ev]); res['min_gap_p10'] = round(float(np.percentile(gaps, 10)), 2) if len(gaps) else None
    json.dump(dict(summary=res, events=ev), open(f'prof_{nm}.json', 'w'), indent=0)
    print(json.dumps(res, ensure_ascii=False))

for nm in sys.argv[1:]: run(nm)
