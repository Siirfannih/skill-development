"""v16 audio QA (Irfan 18:52): does every SFX survive a phone speaker at 20 / 50 / 100 % volume, is the VO always clear,
and is any SFX harsh (2–6 kHz)?  Uses render/mix.wav + stems + render/cues.json.

Phone model: mono, 4th-order HPF 320 Hz (small speakers reproduce almost nothing below), LPF 11 kHz.
Volume: 100 % = 0 dB, 50 % = −12 dB, 20 % = −26 dB (typical phone volume curve). Calibration: a −14 LUFS film at 100 %
≈ 78 dB SPL at 30 cm → SPL ≈ LUFS + 92 + gain.
An SFX cue counts as audible when, in its 160 ms window on the phone model,
  (a) it is no more than 6 dB under the music and 15 dB under a word at that moment (masking), and
  (b) its own level is ≥ 30 dB SPL (quiet-room threshold for a short mid-band sound).
Usage: python3 tools/audio_phone.py [--list]"""
import json, sys, numpy as np, soundfile as sf, scipy.signal as ss

ROOT = '/home/claude/thegap/render'
SR = 48000
def mono(x): return x.mean(1) if x.ndim > 1 else x
vo = mono(sf.read(f'{ROOT}/stem_vo.wav')[0]); mu = mono(sf.read(f'{ROOT}/stem_music.wav')[0]); fx = mono(sf.read(f'{ROOT}/stem_sfx.wav')[0])
mix = mono(sf.read(f'{ROOT}/mix.wav')[0])
n = min(len(vo), len(mu), len(fx), len(mix)); vo, mu, fx, mix = vo[:n], mu[:n], fx[:n], mix[:n]
# stems are pre-master: find the master gain that maps stems to the delivered mix
g = np.sqrt(np.mean(mix ** 2)) / np.sqrt(np.mean((vo + mu + fx) ** 2) + 1e-12)
vo, mu, fx = vo * g, mu * g, fx * g * 1.0
hp = ss.butter(4, 320, 'high', fs=SR, output='sos'); lpf = ss.butter(2, 11000, 'low', fs=SR, output='sos')
ph = lambda x: ss.sosfilt(lpf, ss.sosfilt(hp, x))
pv, pm, pf = ph(vo), ph(mu), ph(fx)
db = lambda x: 10 * np.log10(np.mean(x ** 2) + 1e-14)
# K-weighting-ish offset: −14 LUFS mix ≈ −14 dBFS RMS-equivalent here; good enough for a relative check
CAL = 92 - 14 - db(mix) - 14  # maps full-scale RMS of this mix to its LUFS-ish level
cues = json.load(open(f'{ROOT}/cues.json'))
VOL = {'100%': 0, '50%': -12, '20%': -26}
res = {v: [] for v in VOL}
for c in cues:
    i = int(max(0, c['t'] - 0.02) * SR); j = i + int(0.16 * SR)
    sfx_l = db(pf[i:j]); mask = db(pm[i:j]); mvo = db(pv[i:j])
    for v, gdb in VOL.items():
        spl = sfx_l + 92 + gdb + (-14 - db(mix))   # level relative to the −14 LUFS master
        # audible: within 6 dB of the music, not buried >15 dB under a word, and ≥ 30 dB SPL
        ok = (sfx_l - mask >= -6) and (sfx_l - mvo >= -15) and (spl >= 30)
        res[v].append((ok, round(sfx_l - mask, 1), round(spl, 1), c))
import os
fixf = f'{ROOT}/../tools/cue_gain.json'
fix = json.load(open(fixf)) if os.path.exists(fixf) else {}
if '--fix' in sys.argv:
    for ok, d, spl, c in res['20%']:
        if not ok:
            key = f"{c['t']:.4f}|{c['kind']}"
            need = max(30 - spl, -6 - d, 0) + 1.5
            fix[key] = round(min(8.0, fix.get(key, 0) + min(need, 4.0)), 1)
    json.dump(fix, open(fixf, 'w'), indent=0)
    print('cue gain fixes:', len(fix))
for v in VOL:
    bad = [r for r in res[v] if not r[0]]
    print(f'{v:>4}: {len(cues) - len(bad)}/{len(cues)} SFX audible on a phone speaker')
    if '--list' in sys.argv and v == '20%':
        for ok, d, spl, c in bad: print(f'     {c["t"]:6.2f}s {c["kind"]:9} {d:+5.1f} dB vs bed, {spl:4.1f} dB SPL  {c["visual"][:60]}')
# VO clarity: speech band 300–4 kHz, VO vs everything else, 0.5 s windows where VO is talking
bp = ss.butter(4, [300, 4000], 'band', fs=SR, output='sos')
sv, so = ss.sosfilt(bp, vo), ss.sosfilt(bp, mu + fx)
w = SR // 2; snr = []
for i in range(0, n - w, w):
    if db(vo[i:i + w]) > db(vo) - 12:
        snr.append((i / SR, db(sv[i:i + w]) - db(so[i:i + w])))
s_ = np.array([x[1] for x in snr])
print(f'VO clarity (speech band, VO vs bed while talking): median {np.median(s_):.1f} dB, worst {s_.min():.1f} dB at {snr[int(np.argmin(s_))][0]:.1f}s, windows < 8 dB: {(s_ < 8).sum()}')
if '--list' in sys.argv:
    for t, v_ in snr:
        if v_ < 8: print(f'     {t:6.1f}s VO only {v_:+.1f} dB above bed')
# harshness: per SFX cue, share of 2–6 kHz energy and its level against the mix
b26 = ss.butter(4, [2000, 6000], 'band', fs=SR, output='sos'); f26 = ss.sosfilt(b26, fx); m26 = ss.sosfilt(b26, mix)
# reference = the voice's own 2–6 kHz presence (sibilance, consonants): the ear accepts that level all film long.
v26 = ss.sosfilt(b26, vo); w16 = int(0.16 * SR)
vref = np.percentile([db(v26[i:i + w16]) for i in range(0, n - w16, w16) if db(vo[i:i + w16]) > db(vo) - 12], 90)
harsh = []
for c in cues:
    i = int(max(0, c['t'] - 0.02) * SR); j = i + w16
    over = db(f26[i:j]) - vref
    if over > 0:
        harsh.append((c['t'], c['kind'], round(over, 1), c['visual'][:50]))
print(f'harsh SFX (louder in 2–6 kHz than the voice\'s own 90th-percentile presence): {len(harsh)}')
for h in harsh: print('    ', h)
