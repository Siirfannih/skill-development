"""Cue sheet SFX dari event visual terkunci (gerbang 9, aturan 43): 1 event = 1 bunyi, 1 peran = 1 file sepanjang video.
Masukan: audio/events_text.json, events_A.json, events_B.json, events_C.json (frame dari kode adegan).
Keluaran: audio/cues.json (t, file, gain_db, peran, alasan, align, peak, dur?) dan audio/sfx_stem.wav."""
import json, os, subprocess, numpy as np
SR = 48000
D = '/home/irfan/work/skill-development/projects/jadisatu-60s/remotion/sfx-el/'
K = '/home/irfan/sfx/Kenyset/'
I = '/home/irfan/sfx/SFXIrfan/'
E = 'audio/sfx_el/'
F = {  # peran -> file (satu file per peran)
    'klik_kata': K + 'mouse-click-290204.mp3', 'slam': D + 'v17_thud_1.mp3', 'ketik': K + 'iphone-keyboard-typing-sound-effect-336778.mp3',
    'shutter': [D + 'v17_shutter_0.mp3', D + 'v17_shutter_1.mp3', D + 'v17_shutter_2.mp3'], 'cut': D + 'v17_click_0.mp3', 'whoosh': [D + 'v17_whoosh_0.mp3', D + 'v17_whoosh_1.mp3', D + 'v17_whoosh_2.mp3'],
    'mosaik': I + 'ES_User Interface, Glitch, Glitch Databend 04 - Epidemic Sound.mp3', 'twist': I + 'ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz - Epidemic Sound.mp3',
    'cahaya': D + 'swell_1.mp3', 'pin': E + 'pin.mp3', 'kertas': [E + 'paper_slide2.mp3', E + 'paper_slide.mp3'], 'tulis': D + 'v17_scribble_1.mp3', 'hover': D + 'v17_tick_0.mp3',
    'cap': D + 'v17_impact_1.mp3', 'muncul': [K + 'pop-up-notify-smooth-modern-332448.mp3', K + 'ui-pop-up-2-197887.mp3', K + 'ui-pop-sound-316482.mp3'], 'mendarat': [K + 'soft-subtle-ui-pop-sfx-348820.mp3', K + 'soft-ui-pop-light-minimal-click-451232.mp3', K + 'minimal-pop-click-ui-11-198311.mp3'],
    'rattle': K + 'ui-processing-data-sequence-modern-interface-progress-02-230495.mp3', 'garis': [D + 'v17_glide_0.mp3', D + 'v17_glide_1.mp3', D + 'v17_glide_2.mp3'], 'riser': D + 'v17_riser_1.mp3',
    'like': I + 'ES_User Interface, Click, Pops, Glass, UI, Pops - Epidemic Sound.mp3', 'beku': D + 'v17_impact_0.mp3', 'klik_ui': [K + 'universfield-computer-mouse-click-352734.mp3', K + 'immersivecontrol-button-click-sound-463065.mp3'], 'kata_tick': D + 'v17_tick_1.mp3',
}
_cache = {}
def load(f):
    if f not in _cache:
        a = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout, dtype=np.float32).copy()
        a /= (np.abs(a).max() + 1e-9)  # normalisasi puncak dulu, lalu gain (audio.md §14.10)
        _cache[f] = a
    return _cache[f]
def peak_of(f): return float(np.argmax(np.abs(load(f))) / SR)

cues = []
rot = {}
def add(t, peran, gain, alasan, src, align='onset', dur=None, file=None, offset=0.0):
    f = file or F[peran]
    if isinstance(f, list): rot[peran] = rot.get(peran, -1) + 1; f = f[rot[peran] % len(f)]
    c = {'t': round(t, 3), 'peran': peran, 'file': f, 'gain_db': gain, 'alasan': alasan, 'sumber': src, 'align': align}
    if align == 'peak': c['peak'] = round(peak_of(f), 3)
    if dur: c['dur'] = round(dur, 3)
    if offset: c['offset'] = offset
    cues.append(c)

def ev(name):
    p = f'audio/{name}.json'
    return json.load(open(p)) if os.path.exists(p) else []

# ---- teks
for e in ev('events_text'):
    j, kode, beat = e['jenis'], e.get('kode'), e['beat']
    src = f"{e.get('id')} '{e.get('kata', '')[:30]}'"
    if j == 'ketik':
        add(e['t'], 'ketik', -13, 'teks UI diketik huruf demi huruf', src, dur=e['t_akhir'] - e['t'], offset=2.0) if beat != 'B09' else None
    elif j == 'frasa':
        add(e['t'], 'klik_kata', -16, 'frasa narasi muncul (1 pesan = 1 bunyi)', src)
    elif j == 'kata_kinetik':
        if kode == 'J':
            add(e['t'], 'slam', -5, 'kata puncak jadi kartu judul', src, align='peak')
        elif kode == 'H':
            add(e.get('t_mulai', e['t']) if 't_mulai' in e else e['f_mulai'] / 30, 'tulis', -6, 'tulisan tangan tergambar', src)
        elif e.get('kata', '').startswith('FOMO'):
            add(e['t'], 'slam', -8, "'FOMO.' dihantam bersama punch kamera", src, align='peak')
        else:
            add(e['t'], 'klik_kata', -9, 'kata kinetik/penekanan muncul', src)

# ---- event visual
wi = 0
jatuh_last = [-9.0]
b20 = []
for e in ev('events_A') + ev('events_B') + ev('events_C'):
    j, t, src = e['jenis'], e['t'], f"{e['beat']} {e.get('objek', '')[:40]}"
    if j == 'ganti_klip': add(t, 'shutter', -7, 'isi bingkai arsip berganti (foto montase = shutter)', src)
    elif j == 'cut': add(t, 'cut', -13, 'ganti adegan tanpa gerak = klik cut pelan', src)
    elif j == 'whoosh':
        lemah = 'lembut' in e.get('catatan', '') or 'pelan' in e.get('catatan', '')
        add(e.get('t_puncak', t), 'whoosh', -15 if lemah else -10, 'gerak kamera cepat terlihat, puncak di v_max', src, align='peak', file=F['whoosh'][wi % 3]); wi += 1
    elif j == 'mosaik':
        add(t, 'mosaik', -14, 'mosaik piksel membangun', src)
        if e.get('t_penuh'): add(e['t_penuh'] + 0.05, 'garis', -14, 'mosaik pecah membuka adegan baru', src)
    elif j == 'wipe':
        if e['beat'] in ('B15',): add(t, 'twist', -4, 'twist: dinding menggelap, grade + musik berganti', src, align='peak')
        else: add(e.get('t_puncak', t), 'cahaya', -8, 'cahaya kembali (wipe gelap→terang)', src)
    elif j == 'jatuh':
        if e['beat'] == 'B08':
            if t - jatuh_last[0] >= 0.5:
                add(t, 'kertas', -10, 'cetakan thumbnail jatuh dari pin (satu bunyi per gelombang jatuh)', src, align='peak'); jatuh_last[0] = t
        else: add(t, 'pin', -9, 'cetakan dipasang/disorot (pin)', src, align='peak')
    elif j == 'tulis': add(t, 'tulis', -6, 'garis/tulisan tangan tergambar', src)
    elif j == 'klik': add(t, 'klik_ui', -7, 'kursor klik tombol', src)
    elif j == 'hover': add(t, 'hover', -12, 'kursor masuk tombol/thumbnail', src)
    elif j == 'cap': add(t, 'cap', -5, 'logo dicap di kata "AI"', src)
    elif j == 'muncul' and e['beat'] == 'B20':
        b20.append(t)
        if len(b20) <= 3: add(t, 'mendarat', -11, 'halaman repo baru muncul', src)
    elif j == 'muncul': add(t, 'muncul', -10, 'UI/kartu muncul', src)
    elif j == 'riwayat': add(t, 'rattle', -16, 'riwayat chat bertambah cepat = satu rattle berirama', src, dur=e['t_akhir'] - t, offset=8.0)
    elif j == 'benang': add(t, 'garis', -13, 'benang tergambar', src)
    elif j in ('scroll', 'susut'): add(t, 'garis', -14, 'halaman/modal bergerak', src)
    elif j == 'like': pass  # satu event dengan klik like
    elif j == 'beku': add(t, 'beku', -6, 'semua membeku', src)
    elif j in ('guncang',): pass  # menyatu dengan beku/cap/slam (1 event 1 bunyi)
    elif j == 'ketik': add(t, 'ketik', -13, 'nama repo diketik', src, dur=e['t_akhir'] - t, offset=6.0)
    elif j == 'pos_terbit': add(t, 'muncul', -9, 'post terbit', src)
    elif j in ('pan', 'tutup'): add(t, 'garis', -14, 'kamera/modal bergerak pelan', src)
    elif j in ('push', 'gerak', 'akhir'): pass  # gerak kontinu pelan tanpa event diskret; kursor bergerak menyatu dengan klik
    else: add(t, 'muncul', -12, f'event {j}', src)

if len(b20) > 3:
    add(b20[3], 'rattle', -15, 'repo bertambah makin cepat = satu rattle berirama (bukan 16 pop)', 'B20', dur=b20[-1] - b20[3] + 0.15, offset=8.0)
# tick lembut per kata narasi (kata kinetik berbunyi per kata; kata pertama frasa sudah punya klik frasa)
W = json.load(open('edit/words_final.json'))
starts = [c['t'] for c in cues if c['peran'] == 'klik_kata']
for w in W:
    if any(abs(w['s'] - t0) < 0.12 for t0 in starts): continue
    add(w['s'] + 0.07, 'kata_tick', -19, 'kata narasi muncul (per kata, sangat lembut)', w['w'])
# riser menuju jawaban "Tapi" (PLAN B03)
add(5.45, 'riser', -11, 'riser menuju jawaban "Tapi" (engsel hook)', 'B03 PLAN', align='peak')

# ---- aturan jarak: peran sama < 0,1 dtk → buang yang kemudian; whoosh < 1 dtk → yang kedua jadi hover tick
cues.sort(key=lambda c: c['t'])
out, last = [], {}
for c in cues:
    if c['peran'] in last and c['t'] - last[c['peran']] < (1.0 if c['peran'] == 'whoosh' else 0.1):
        if c['peran'] == 'whoosh': c.update(peran='hover', file=F['hover'], gain_db=-14, align='onset', alasan=c['alasan'] + ' (whoosh < 1 dtk dari whoosh sebelumnya → tick)'); c.pop('peak', None)
        else: continue
    last[c['peran']] = c['t']; out.append(c)
json.dump({'cues': out}, open('audio/cues.json', 'w'), ensure_ascii=False, indent=1)

# ---- stem SFX
DUR = 94.967
stem = np.zeros(int(DUR * SR) + SR, dtype=np.float32)
for c in out:
    a = load(c['file'])
    if c.get('dur'):
        o = int(c.get('offset', 0) * SR); a = a[o:o + int(c['dur'] * SR)].copy(); fd = int(0.02 * SR); a[-fd:] *= np.linspace(1, 0, fd)
    start = c['t'] - (c.get('peak', 0) if c['align'] == 'peak' else 0)
    i = int(round(start * SR)); a = a * 10 ** (c['gain_db'] / 20)
    if i < 0: a = a[-i:]; i = 0
    stem[i:i + len(a)] += a[:len(stem) - i]
stem = stem[:int(DUR * SR)]
import soundfile as sf
sf.write('audio/sfx_stem.wav', stem, SR)
from collections import Counter
print('cue', len(out), 'per dtk', round(len(out) / DUR, 2), dict(Counter(c['peran'] for c in out)))

# ---- sinkron ke onset visual nyata di render terkunci (±7 f): cue tanpa onset dalam ±5 f digeser ke onset terdekat
if os.path.exists('qc/draft.mp4'):
    import sys as _s; _s.path.insert(0, '/home/irfan/work/skill-development/claude/motion-graphic/scripts/gate')
    import sfx_density as _sd
    onsets, _ = _sd.visual_events('qc/draft.mp4')
    moved = 0
    for c in out:
        if c.get('dur') or c['peran'] in ('whoosh', 'riser', 'twist', 'cahaya'): continue
        d = onsets - c['t']; near = d[np.abs(d) <= 7 / 30]
        if len(near) and not (np.abs(d) <= 5 / 30).any():
            c['t'] = round(float(c['t'] + near[np.argmin(np.abs(near))]), 3); c['sinkron'] = True; moved += 1
    # onset tanpa cue: cue terdekat (≤ 9 f, bukan rentang) yang bukan satu-satunya penutup onset lain digeser ke sana
    for o in onsets:
        if any(abs(c['t'] - o) <= 5 / 30 for c in out): continue
        cand = [c for c in out if not c.get('dur') and c['peran'] in ('kata_tick', 'klik_kata', 'cut', 'garis') and abs(c['t'] - o) <= 9 / 30
                and sum(abs(c['t'] - o2) <= 5 / 30 for o2 in onsets) == 0]
        if cand: c = min(cand, key=lambda c: abs(c['t'] - o)); c['t'] = round(float(o), 3); c['sinkron'] = True; moved += 1
    out.sort(key=lambda c: c['t'])
    # maks 2 bunyi per 100 ms (audio.md §14.9): buang yang prioritasnya paling rendah
    PRI = ['twist', 'slam', 'cap', 'beku', 'whoosh', 'klik_ui', 'shutter', 'klik_kata', 'pin', 'kertas', 'mosaik', 'muncul', 'mendarat', 'cahaya', 'tulis', 'ketik', 'rattle', 'riser', 'hover', 'cut', 'garis', 'kata_tick']
    changed = True
    while changed:
        changed = False
        for i in range(len(out)):
            grp = [c for c in out if 0 <= c['t'] - out[i]['t'] < 0.1 and not c.get('dur')]
            if len(grp) > 2:
                out.remove(max(grp, key=lambda c: PRI.index(c['peran']) if c['peran'] in PRI else 99)); changed = True; break
    json.dump({'cues': out}, open('audio/cues.json', 'w'), ensure_ascii=False, indent=1)
    stem = np.zeros(int(DUR * SR) + SR, dtype=np.float32)
    for c in out:
        a = load(c['file'])
        if c.get('dur'):
            o = int(c.get('offset', 0) * SR); a = a[o:o + int(c['dur'] * SR)].copy(); fd = int(0.02 * SR); a[-fd:] *= np.linspace(1, 0, fd)
        start = c['t'] - (c.get('peak', 0) if c['align'] == 'peak' else 0)
        i = int(round(start * SR)); a = a * 10 ** (c['gain_db'] / 20)
        if i < 0: a = a[-i:]; i = 0
        stem[i:i + len(a)] += a[:len(stem) - i]
    sf.write('audio/sfx_stem.wav', stem[:int(DUR * SR)], SR)
    print('disinkron ke onset:', moved)
