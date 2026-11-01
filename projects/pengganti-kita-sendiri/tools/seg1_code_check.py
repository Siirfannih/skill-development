"""SEGMEN 1 · cek kode tanpa render. python3 seg1_code_check.py <remotion/src> > OBJECT-MAP.md
Per adegan: daftar objek bernama (penanda SFX id `<scene>:<objek>:<peristiwa>`), teks (AnchorWord/SpeakerLine), media.
Bendera:
  SAFE?   AnchorWord dengan x/y literal di luar safe zone (x 288–1632, y 216–864)
  RAWTXT  teks overlay besar (fontSize ≥ 60) di luar komponen bersama → tidak terjepit safe zone/tidak ter-probe
  NOSFX   adegan punya media/objek tapi tanpa penanda SFX
  SIZE    SpeakerLine dengan prop size berbeda dalam satu baris (seharusnya seragam; lib menormalkan, tapi tulis seragam)
"""
import sys, re, glob, os

src = sys.argv[1]
SAFE = (288, 216, 1632, 864)
rows, flags = [], []
for p in sorted(glob.glob(os.path.join(src, 'scenes', 'S*.tsx'))):
    s = open(p).read(); sc = os.path.basename(p)[:-4]
    sfx = re.findall(r'sfxMark\([^,]+,\s*"(\w+)",[^;]*?[`"]([^`"]+)[`"]', s)
    sfx += [(k, i) for k, i in re.findall(r'sfx[=:]\s*\{\{?\s*kind:\s*"(\w+)",\s*id:\s*"([^"]+)"', s)]
    anchors = re.findall(r'<AnchorWord\s+text="([^"]+)"([^>]*)/?>', s)
    media = len(re.findall(r'<(OffthreadVideo|Img|Video|MatteClip|ClipCard)\b', s))
    speakers = re.findall(r'text:\s*"([^"]+)"', s) if 'SpeakerLine' in s else []
    for txt, props in anchors:
        x = re.search(r'\bx=\{(-?\d+)\}', props); y = re.search(r'\by=\{(-?\d+)\}', props)
        if x and not (SAFE[0] <= int(x.group(1)) <= SAFE[2]): flags.append(f'SAFE? | {sc} | AnchorWord «{txt}» x={x.group(1)}')
        if y and not (SAFE[1] <= int(y.group(1)) <= SAFE[3]): flags.append(f'SAFE? | {sc} | AnchorWord «{txt}» y={y.group(1)}')
    for m in re.finditer(r'fontSize:\s*(\d+)', s):
        if int(m.group(1)) >= 60:
            ln = s[:m.start()].count('\n') + 1
            flags.append(f'RAWTXT | {sc}:{ln} | fontSize {m.group(1)} di luar AnchorWord/SpeakerLine — cek: teks UI asli (boleh) atau overlay (pindah ke komponen)')
    if (media or anchors) and not sfx: flags.append(f'NOSFX | {sc} | {media} media, {len(anchors)} teks, 0 penanda SFX')
    rows.append((sc, sfx, [a[0] for a in anchors], speakers, media))

print('# Segmen 1 · peta objek ↔ SFX (dari kode)\n')
print('| adegan | penanda SFX (peran · id) | teks anchor | teks narasumber | media |\n|---|---|---|---|---|')
for sc, sfx, an, sp, md in rows:
    print(f"| {sc} | {'<br>'.join(f'{k} · {i}' for k, i in sfx[:40])} | {' '.join(an)} | {' '.join(sp)} | {md} |")
print('\n## Bendera\n\n| jenis | lokasi | catatan |\n|---|---|---|')
for f in flags: print(f'| {f} |')
print(f"\n{'LOLOS' if not any(f.startswith(('SAFE?', 'NOSFX')) for f in flags) else 'PERLU TINJAU'} · {len(flags)} bendera")
