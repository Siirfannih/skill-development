#!/usr/bin/env python3
"""Audio QA gate — ukur mix video sendiri dan referensi dengan definisi yang SAMA.

Pakai:
  python3 audio_qa.py video_or_wav [lebih_banyak_file ...] [--segments segments.json] [--json out.json]
  python3 audio_qa.py mix_master.wav --module5 <stem_dir> <timeline.json> <placed.json>   # gerbang Modul 5 penuh

Metrik (semua dihitung dari file, bukan dari kode/ingatan):
- loudness: I (LUFS), LRA (LU), true peak (dBTP) via ffmpeg ebur128
- pita spektral (Welch, % daya total): sub 20–150, lowmid 150–500, mid 500–2500, high >2500
- side/mid: rasio RMS (L-R)/2 terhadap (L+R)/2
- abrupt_drops: jumlah penurunan RMS > 18 dB dalam 50 ms (jendela 10 ms), hanya dari level > -40 dBFS
  (definisi yang dipakai audit Gemini 31 Okt; turunan karena hard cut yang disengaja tetap terhitung → baca bersama timestamp)
- silent_100ms: jumlah jendela 100 ms < -45 dBFS (gap mati), dikecualikan 2 dtk terakhir
- segments (opsional, JSON [{name,start,end}]): LUFS momentary rata-rata per segmen (cek klip narasumber vs VO)

Catatan pembacaan: persentase pita sangat dipengaruhi musik; bandingkan dengan referensi yang genre/tujuannya sama,
bukan dengan angka absolut.
"""
import json, subprocess, sys, re
import numpy as np
from scipy.signal import welch

SR = 48000

def load(path):
    a = ['ffmpeg', '-v', 'error', '-i', path, '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    x = np.frombuffer(subprocess.run(a, capture_output=True).stdout, np.float32).reshape(-1, 2).astype(np.float64)
    return x

def ebur(path):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', path, '-vn', '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    g = lambda pat: float(re.findall(pat, r)[-1])
    return dict(I=g(r'I:\s+(-?[\d.]+) LUFS'), LRA=g(r'LRA:\s+([\d.]+) LU'), TP=g(r'Peak:\s+(-?[\d.]+) dBFS'))

def bands(m):
    f, p = welch(m, SR, nperseg=8192)
    sel = (f >= 20)
    tot = p[sel].sum()
    pct = lambda a, b: round(100 * p[(f >= a) & (f < b)].sum() / tot, 1)
    return dict(sub_20_150=pct(20, 150), lowmid_150_500=pct(150, 500), mid_500_2500=pct(500, 2500), high_2500_plus=pct(2500, 24000))

def env_db(m, win):
    h = int(win * SR); n = len(m) // h
    return 20 * np.log10(np.sqrt((m[:n * h].reshape(n, h) ** 2).mean(1)) + 1e-12)

def abrupt(m):
    e = env_db(m, 0.01)   # 10 ms
    k = 5                 # 50 ms
    out = []
    i = 0
    while i < len(e) - k:
        if e[i] > -40 and e[i] - e[i + k] > 18:
            out.append(round(i * 0.01, 2)); i += k
        else:
            i += 1
    return out

def run(path, segs=None):
    x = load(path); m = x.mean(1); s = (x[:, 0] - x[:, 1]) / 2
    res = dict(file=path.split('/')[-1], dur=round(len(m) / SR, 2), **ebur(path), **bands(m))
    res['side_mid'] = round(float(np.sqrt(np.mean(s ** 2)) / (np.sqrt(np.mean(m ** 2)) + 1e-12)), 3)
    ab = abrupt(m); res['abrupt_drops'] = len(ab); res['abrupt_at'] = ab[:40]
    e100 = env_db(m, 0.1); cut = max(0, len(e100) - 20)
    sil = [round(i * 0.1, 1) for i in np.where(e100[:cut] < -45)[0]]
    res['silent_100ms'] = len(sil); res['silent_at'] = sil[:40]
    if segs:
        out = {}
        for sg in segs:
            a, b = int(sg['start'] * SR), int(sg['end'] * SR)
            seg = m[a:b]
            out[sg['name']] = dict(rms_db=round(float(20 * np.log10(np.sqrt(np.mean(seg ** 2)) + 1e-12)), 1),
                                   side_mid=round(float(np.sqrt(np.mean(s[a:b] ** 2)) / (np.sqrt(np.mean(seg ** 2)) + 1e-12)), 3),
                                   **bands(seg))
        res['segments'] = out
    return res

def module5(mix_master, stem_dir, timeline, placed):
    """Gerbang Modul 5 per blok/kelas. stem_dir berisi stem_dialog_g.wav, stem_music.wav, stem_sfx.wav, stem_mix_raw.wav (pra-master)."""
    import soundfile as sf, pyloudnorm as pyln
    meter = pyln.Meter(SR); T = json.load(open(timeline)); P = json.load(open(placed))
    raw, _ = sf.read(f'{stem_dir}/stem_mix_raw.wav'); mm, _ = sf.read(mix_master)
    g = meter.integrated_loudness(mm) - meter.integrated_loudness(raw)          # gain master (dB)
    dia, _ = sf.read(f'{stem_dir}/stem_dialog_g.wav')
    if dia.ndim == 1: dia = np.stack([dia, dia], 1)   # stem dialog mono diputar di kedua kanal → ukur sebagai stereo (+3 dB vs mono)
    mus, _ = sf.read(f'{stem_dir}/stem_music.wav'); sfx, _ = sf.read(f'{stem_dir}/stem_sfx.wav')
    db = lambda x: 20 * np.log10(max(x, 1e-9))
    rep = dict(master_gain_db=round(g, 2), blocks={}, music_under_vo_lufs=None, sfx_peaks={}, fails=[])
    vo_mask = np.zeros(len(mus), bool)
    for b in T['blocks']:
        if b['kind'] == 'pad': continue
        a, c = int(b['t'] * SR), int((b['t'] + b['dur']) * SR)
        L = meter.integrated_loudness(dia[a:c]) + g
        rep['blocks'][b['name']] = round(L, 1)
        if b['kind'] == 'vo':
            vo_mask[a:c] = True
            if not (-15.0 <= L <= -13.0): rep['fails'].append(f"VO {b['name']} {L:.1f} LUFS (target −14 ±1)")
        else:
            if not (-16.0 <= L <= -14.5): rep['fails'].append(f"klip {b['name']} {L:.1f} LUFS (target −15…−15,5 ±0,5)")
    mu = meter.integrated_loudness(mus[vo_mask]) + g
    rep['music_under_vo_lufs'] = round(mu, 1)
    if not (-25.0 <= mu <= -22.0): rep['fails'].append(f'musik di bawah VO {mu:.1f} LUFS (target −22…−25)')
    m = np.abs(sfx).max(1) if sfx.ndim > 1 else np.abs(sfx)
    RANGE = {'text_pop': (-20, -16), 'ui_pop': (-20, -16), 'ui_click': (-20, -16), 'land_soft': (-20, -16), 'micro_tick': (-21, -16),
             'graph_tick': (-22, -16), 'type_key': (-25, -22), 'flutter': (-22, -16), 'shutter': (-21, -16)}
    for q in P:
        c = q.get('class'); s0 = int(q['start'] * SR); w = m[max(0, s0):s0 + int(0.25 * SR)]
        if not len(w): continue
        pk = db(w.max()) + g
        rep['sfx_peaks'].setdefault(c, []).append(round(pk, 1))
    for c, v in rep['sfx_peaks'].items():
        med = float(np.median(v))
        if c in RANGE and not (RANGE[c][0] - 1 <= med <= RANGE[c][1] + 1): rep['fails'].append(f'SFX {c} median puncak {med:.1f} dBFS (target {RANGE[c]})')
        rep['sfx_peaks'][c] = dict(n=len(v), median=round(med, 1), max=max(v))
    return rep

def gate(r):
    """Ambang Modul 5 untuk mix keseluruhan."""
    f = []
    if not (-14.5 <= r['I'] <= -14.0): f.append(f"I {r['I']} (target −14,0…−14,5)")
    if r['TP'] > -1.0: f.append(f"TP {r['TP']} > −1 dBTP")
    if not (25 <= r['sub_20_150'] <= 55): f.append(f"sub {r['sub_20_150']} % (target 25–55)")
    if r['lowmid_150_500'] >= 42: f.append(f"low-mid {r['lowmid_150_500']} % (target < 42)")
    return f

if __name__ == '__main__':
    args = sys.argv[1:]; segs = None; jout = None
    if '--segments' in args:
        i = args.index('--segments'); segs = json.load(open(args[i + 1])); del args[i:i + 2]
    if '--json' in args:
        i = args.index('--json'); jout = args[i + 1]; del args[i:i + 2]
    m5 = None
    if '--module5' in args:
        i = args.index('--module5'); m5 = args[i + 1:i + 4]; del args[i:i + 4]
    R = [run(p, segs if k == 0 else None) for k, p in enumerate(args)]
    if m5:
        R[0]['module5'] = module5(args[0], *m5); R[0]['gate_fails'] = gate(R[0]) + R[0]['module5']['fails']
    for r in R:
        print(json.dumps({k: v for k, v in r.items() if k not in ('abrupt_at', 'silent_at', 'segments')}, ensure_ascii=False))
        print('  abrupt_at:', r['abrupt_at'][:25]); print('  silent_at:', r['silent_at'][:25])
        if 'module5' in r:
            m = r['module5']; print('  master_gain', m['master_gain_db'], '| musik di bawah VO', m['music_under_vo_lufs'], 'LUFS')
            print('  blok LUFS:', m['blocks']); print('  SFX puncak per kelas:', m['sfx_peaks'])
            print('  GERBANG:', 'LULUS' if not r['gate_fails'] else 'GAGAL → ' + ' | '.join(r['gate_fails']))
        if 'segments' in r:
            for k, v in r['segments'].items(): print('  seg', k, v)
    if jout: json.dump(R, open(jout, 'w'), indent=1)
