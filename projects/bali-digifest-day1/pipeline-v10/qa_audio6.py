import json, numpy as np, soundfile as sf, pyloudnorm as pyln
edl = json.load(open('edl6.json')); d = 'mixout6'
mix, sr = sf.read(f'{d}/mix.wav'); vo, _ = sf.read(f'{d}/stem_vo.wav'); mu, _ = sf.read(f'{d}/stem_music.wav'); na, _ = sf.read(f'{d}/stem_nat.wav')
m = pyln.Meter(sr); mono = mix.mean(1); h = int(sr * 0.1)
r = np.array([20 * np.log10(np.sqrt(np.mean(mono[i:i + h] ** 2)) + 1e-9) for i in range(0, len(mono) - h, h)])
print('master LUFS %.2f  peak %.2f dBFS  dur %.2f' % (m.integrated_loudness(mix), 20 * np.log10(np.abs(mix).max()), len(mix) / sr))
print('jendela 100 ms paling pelan (selain 0,5 dtk akhir): %.1f dBFS di %.1f dtk' % (r[:-5].min(), r[:-5].argmin() * 0.1))
print('jendela < -40 dBFS:', [round(i * 0.1, 1) for i in np.where(r[:-5] < -40)[0]])
def L(x): return m.integrated_loudness(x) if len(x) > sr * 0.45 else -70
print('id    VO    musik  nat   VO-(musik+nat)')
for p in edl['vo']:
    a, b = int(p['v'] * sr), int((p['v'] + p['b'] - p['a']) * sr)
    print(f"{p['id']:4s} {L(vo[a:b]):6.1f} {L(mu[a:b]):6.1f} {L(na[a:b]):6.1f}  {L(vo[a:b]) - L(mu[a:b] + na[a:b]):5.1f}")
# celah antar potongan VO: level total campuran (harus tetap ada musik+ambience, bukan sunyi)
for p, q in zip(edl['vo'], edl['vo'][1:]):
    e = p['v'] + p['b'] - p['a']; s = q['v']
    seg = mono[int(e * sr):int(s * sr)]
    print(f"celah {p['id']}->{q['id']} {s - e:.2f} dtk, level campuran {20 * np.log10(np.sqrt(np.mean(seg ** 2)) + 1e-9):.1f} dBFS")
