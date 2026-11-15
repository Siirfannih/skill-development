"""Bedah per detik v8f (Irfan 14 Nov): tiap detik video final = 1 baris: 6 frame (tiap 5 frame) + amplop audio 10 ms
(abu-abu = mix final, hijau = suara orang/VO) + garis potong suara (kuning) & gambar (biru) + teks yang tampil.
Tanda MERAH: (a) DIAM di tengah ucapan: VO < -40 dBFS >= 0,12 dtk di antara dua kata dalam satu bite;
(b) TURUN MENDADAK: mix turun > 15 dB dalam 60 ms dan bertahan >= 150 ms.
Pakai: python3 bedah8.py VIDEO PREFIX  (stem dari mixout6/, EDL dari edl6.json = run terakhir)"""
import json, sys, os, subprocess, glob, numpy as np, soundfile as sf
from PIL import Image, ImageDraw, ImageFont
vid, pre = sys.argv[1], sys.argv[2]
edl = json.load(open('edl6.json')); ph = json.load(open('remotion/src/phrases6.json')); big = json.load(open('remotion/src/kt6.json'))['big']
tmp = f'tmp/bedah_{pre}'; os.makedirs(tmp, exist_ok=True)
for f in glob.glob(f'{tmp}/*.jpg'): os.remove(f)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', vid, '-vf', 'fps=6,scale=160:90', f'{tmp}/%05d.jpg'], check=True)
mix, sr = sf.read(vid.replace('.mp4', '.wav')) if os.path.exists(vid.replace('.mp4', '.wav')) else (None, None)
if mix is None:
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', vid, '-vn', '-ac', '1', '-ar', '48000', f'{tmp}/a.wav'], check=True); mix, sr = sf.read(f'{tmp}/a.wav')
vo, _ = sf.read('mixout6/stem_vo.wav'); vo = vo.mean(1) if vo.ndim > 1 else vo; mix = mix.mean(1) if mix.ndim > 1 else mix
h = sr // 100
env = lambda x: np.array([20 * np.log10(np.sqrt(np.mean(x[i:i + h] ** 2)) + 1e-9) for i in range(0, len(x) - h, h)])
em, ev = env(mix), env(vo); N = int(len(mix) / sr)
# (a) diam di tengah ucapan: per bite, dari awal potongan pertama s.d. akhir potongan terakhir
bites = {}
for p in edl['vo']:
    a, b = p['v'], p['v'] + p['b'] - p['a']; bites.setdefault(p['bite'], [a, b]); bites[p['bite']][1] = b
diam = []
for bid, (a, b) in bites.items():
    i0, i1 = int(a * 100) + 5, int(b * 100) - 5; low = ev[i0:i1] < -40; i = 0
    while i < len(low):
        if low[i]:
            j = i
            while j < len(low) and low[j]: j += 1
            if j - i >= 12: diam.append(((i0 + i) / 100, (i0 + j) / 100, bid))
            i = j
        else: i += 1
drops = []
for i in range(len(em) - 16):
    if em[i] > -30 and em[i] - em[i + 1:i + 7].min() > 15 and em[i] - em[i + 6:i + 21].mean() > 15 and (not drops or i / 100 - drops[-1] > 0.3) and i / 100 < N - 3.5:
        drops.append(i / 100)
cuts_vo = sorted({round(p['v'], 2) for p in edl['vo']} | {round(p['v'] + p['b'] - p['a'], 2) for p in edl['vo']})
cuts_sh = [s['v0'] for s in edl['shots']]
def text_at(t):
    for c in ph:
        if c['start'] <= t <= c['end']: return ' / '.join(' '.join(w['w'] for w in l if w['t'] <= t + 0.2) for l in c['lines'])
    for d in big:
        if d['start'] <= t <= d['end']: return '[BESAR] ' + d['text']
    return ''
F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 12); FB = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 13)
RW, RH = 6 * 160 + 600, 104; ROWS = 20; flagged = []
for pg in range(0, N, ROWS):
    S = Image.new('RGB', (RW, RH * min(ROWS, N - pg)), (18, 18, 18)); d = ImageDraw.Draw(S)
    for r, sec in enumerate(range(pg, min(N, pg + ROWS))):
        y0 = r * RH
        for k in range(6):
            fp = f'{tmp}/{sec * 6 + k + 1:05d}.jpg'
            if os.path.exists(fp): S.paste(Image.open(fp), (k * 160, y0))
        X0 = 960; W2 = 580
        wav = lambda e, t: y0 + 8 + (1 - (max(-60, min(0, e)) + 60) / 60) * 80
        # garis potong
        for t in cuts_sh:
            if sec <= t < sec + 1: x = X0 + (t - sec) * W2; d.line([(x, y0), (x, y0 + 90)], fill=(60, 120, 255), width=2)
        for t in cuts_vo:
            if sec <= t < sec + 1: x = X0 + (t - sec) * W2; d.line([(x, y0), (x, y0 + 90)], fill=(255, 210, 0), width=1)
        bad = []
        for a, b, bid in diam:
            if a < sec + 1 and b > sec:
                d.rectangle([X0 + (max(a, sec) - sec) * W2, y0 + 2, X0 + (min(b, sec + 1) - sec) * W2, y0 + 88], fill=(110, 0, 0)); bad.append(f'DIAM {b - a:.2f}s ({bid})')
        for t in drops:
            if sec <= t < sec + 1: x = X0 + (t - sec) * W2; d.polygon([(x - 6, y0 + 2), (x + 6, y0 + 2), (x, y0 + 14)], fill=(255, 40, 40)); bad.append('TURUN MENDADAK')
        for e, col in ((em, (150, 150, 150)), (ev, (60, 220, 90))):
            pts = [(X0 + k / 100 * W2, wav(e[sec * 100 + k], 0)) for k in range(100) if sec * 100 + k < len(e)]
            if len(pts) > 1: d.line(pts, fill=col, width=1)
        d.text((X0 + 4, y0 + 88), f'{sec:02d}-{sec + 1:02d} dtk  {text_at(sec + 0.5)[:60]}', fill='white', font=F)
        if bad: d.text((X0 + 300, y0 + 2), ' | '.join(bad)[:48], fill=(255, 90, 90), font=FB); flagged.append((sec, bad))
    S.save(f'{pre}_{pg // ROWS + 1}.jpg', quality=78)
print('detik bertanda:', len(flagged))
for sec, bad in flagged: print(f'  {sec:02d} dtk: {", ".join(bad)}')
