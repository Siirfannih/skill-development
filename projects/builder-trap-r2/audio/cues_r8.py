"""Cue r8 (audit frame per frame 15 Nov + peta waktu v3b). Waktu temuan audit ditulis di timeline v3 (peta lompat) lalu
dipetakan: v3 → lama (W lama) → v3b (invers peta baru). Semua cue menyimpan t_v2 (waktu lama) supaya bisa dipetakan ulang.
Irfan: "SFX juga belum merata misalnya pada frame ini saat kejatuhan konten lain tidak ada sfx"."""
import json, numpy as np, soundfile as sf, subprocess
SR = 48000
old = np.array(json.load(open('edit/v3/knots_v3_lompat.json'))['knots']); new = np.array(json.load(open('remotion/src/data/knots_v3.json'))['knots'])
W_old = lambda t: float(np.interp(t, old[:, 0], old[:, 1])); inv_new = lambda x: float(np.interp(x, new[:, 1], new[:, 0]))
v3_to_new = lambda t: inv_new(W_old(t))
d = json.load(open('edit/v3/cues_v3_r7.json')); C = d['cues']
S = '/home/irfan/sfx/SFXIrfan/'
out = []
for q in C:
    if 't_v2' not in q: q['t_v2'] = round(W_old(q['t']), 3)
    t3 = q['t']
    if q['peran'] == 'drop': q['dur'] = 0.9; q['fout'] = 0.4; q['alasan'] += ' · r8b: ekor 50 Hz dipendekkan, tidak menutup "satu hal yang" (audit c05)'
    if q['peran'] == 'beku': q['dur'] = 0.55; q['fout'] = 0.25; q['alasan'] += ' · r8: ekor dipendekkan, tidak menutup "Aku terobsesi"'
    if q['peran'] == 'whoosh' and abs(t3 - 38.73) < 0.01: q['t_v2'] = round(W_old(39.5), 3); q['alasan'] = 'r8: kamera naik, kartu + potret masuk (audit c04 f1186–1199)'
    if q['peran'] == 'whoosh' and abs(t3 - 64.097) < 0.01: q['t_v2'] = round(W_old(63.80), 3); q['alasan'] = 'r8: zoom-in blur ke "Edit profile" (audit c07 f1911–1916)'
    q['t'] = round(inv_new(q['t_v2']), 3); out.append(q)
def add(t3, file, gain, peran, alasan, dengar, **kw):
    out.append(dict(t=round(v3_to_new(t3), 3), t_v2=round(W_old(t3), 3), file=file, gain_db=gain, align=kw.pop('align', 'peak'),
                    peran=peran, alasan=alasan + ' (audit frame 15 Nov)', dengar=dengar, **kw))
add(1.40, S + 'Cutcontrastransision.mp3', -14, 'ganti_foto', 'isi bingkai arsip berganti (c01 f42)', 'pen click / key release')
add(2.77, S + 'Cutcontrastransision.mp3', -14, 'ganti_foto', 'isi bingkai arsip berganti (c01 f83)', 'pen click / key release')
add(3.43, S + 'Pergantianfoto.mp3', -12, 'ganti_foto', 'isi bingkai kembali ke Jensen (c01 f103)', 'pen click / toggle switch click', ss=1.2, dur=0.3, fout=0.05)
add(14.90, 'audio/sfx_el/paper_slide.mp3', -15, 'kartu_jatuh', 'gugus thumbnail kedua jatuh keluar frame (c02 f444–455)', 'kertas meluncur')
add(49.50, S + 'Woosh.mp3', -14, 'whoosh', 'halaman GitHub blur-geser keluar (c05 f1482–1494)', 'soft air whoosh')
add(64.95, S + 'Wooshcameramovementtransisi.mp3', -13, 'whoosh', 'zoom-out lorong dari "Edit profile" ke dinding kartu (c07 f1950)', 'fast whoosh lewat', fout=0.03)
add(67.20, S + 'Woosh.mp3', -15, 'whoosh', 'wipe grafik → wajah (c07 f2017)', 'soft air whoosh')
# r8b · potong adegan tanpa cue ±0,3 dtk (audit ulang 9 pemeriksa) diberi transisi halus; waktu nyata v3b langsung (bukan v3)
W_new = lambda t: float(np.interp(t, new[:, 0], new[:, 1]))
def add_new(tn, file, gain, peran, alasan, dengar, **kw):
    out.append(dict(t=round(tn, 3), t_v2=round(W_new(tn), 3), file=file, gain_db=gain, align=kw.pop('align', 'peak'), peran=peran,
                    alasan=alasan + ' (audit ulang r8, 15 Nov)', dengar=dengar, **kw))
for q in out:   # r8d: punch Threads mulai di cut f535 → whoosh ke punch (menutup cut juga)
    if q['peran'] == 'whoosh' and 18.2 < q['t'] < 18.7: q['t'] = 17.90; q['t_v2'] = round(W_new(17.90), 3); q['alasan'] = 'r8d: punch ke post Threads dari cut f535 (selesai f541)'
for q in out:   # B13b: whoosh punch dan ketik ke frame visualnya (audit ulang c04: f996, f1003)
    if q['peran'] == 'whoosh' and 33.0 < q['t'] < 34.0: q['t'] = 33.20; q['t_v2'] = round(W_new(33.20), 3)
    if q['peran'] == 'ketik' and 33.0 < q['t'] < 34.2: q['t'] = 33.43; q['t_v2'] = round(W_new(33.43), 3)
CUTS = [12.97, 15.90, 21.40, 25.93, 27.83, 31.70, 32.70, 43.57, 45.13, 46.87, 48.57, 56.63, 59.50, 62.70, 72.27, 73.77, 75.10, 80.00]
for k, tn in enumerate(CUTS):
    import re as _re
    WH = _re.compile(r'whoosh|woosh|swoosh|swish|whip|transisi|transition', _re.I)
    def ok(fn):
        for q in out:
            if abs(q['t'] - tn) >= 1.05: continue
            if q['file'] == fn: return False
            if WH.search(fn) and (WH.search(q['file']) or WH.search(q['peran'])): return False
        return True
    cands = [(S + 'Cutcontrastransision.mp3', 'pen click / key release'), (S + 'Katapertama.mp3', 'crisp click')]
    if k % 2: cands.reverse()
    f, dg = next((c for c in cands if ok(c[0])), cands[-1])
    add_new(tn, f, -17, 'potong_adegan', f'potong adegan di {tn:.2f} dtk tanpa bunyi', dg)
# rentetan kartu repo B20: satu cue panjang dari klik kertas per kartu yang mendarat (c06 f1559–1670)
land3 = [1559, 1569, 1578, 1585, 1600, 1614, 1621, 1628, 1635, 1641, 1646, 1651, 1657, 1664, 1670]
tn = [v3_to_new(f / 30) for f in land3]; t0 = tn[0]
src = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', 'audio/sfx_el/paper_slide2.mp3', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout, np.float32)
pk = int(np.argmax(np.abs(src))); hit = src[max(0, pk - int(0.01 * SR)):pk + int(0.14 * SR)].copy()
hit *= np.linspace(1, 0, len(hit)) ** 1.5; hit /= np.abs(hit).max()
rng = np.random.default_rng(7); rat = np.zeros(int((tn[-1] - t0 + 0.3) * SR), np.float32)
for k, t in enumerate(tn):
    i = int((t - t0) * SR); g = 10 ** ((-3 * rng.random() - (0 if k in (0, 6, 11) else 2)) / 20)
    h = hit if k % 2 == 0 else hit[::1] * 0.9; n = min(len(h), len(rat) - i); rat[i:i + n] += g * h[:n]
sf.write('audio/sfx_el/kartu_rattle_r8.wav', rat, SR, subtype='FLOAT')
out.append(dict(t=round(t0, 3), t_v2=round(W_old(land3[0] / 30), 3), file='audio/sfx_el/kartu_rattle_r8.wav', gain_db=-11, align='start',
                peran='rentetan_kartu', alasan='kartu repo B20 jatuh/ditumpuk satu per satu, 15 klik kertas di frame mendarat (c06; R-016 lama "satu rattle")',
                dengar='deretan klik kertas lembut'))
out.sort(key=lambda q: q['t']); d['cues'] = out
json.dump(d, open('edit/v3/cues_v3.json', 'w'), ensure_ascii=False, indent=1)
print('cue', len(out), 'per dtk', round(len(out) / 83.3667, 2))
