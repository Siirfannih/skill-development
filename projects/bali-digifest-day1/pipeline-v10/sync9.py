"""v10 (Irfan 15 Nov: teks kadang lebih maju / ketinggalan dari suara). Waktu muncul tiap kata diambil dari SUARA FINAL:
whisper large-v3 per kata pada stem VO hasil mix (per bite), lalu kata teks (kt6.C) dicocokkan berurutan (difflib) dengan kata
yang terdengar. Kata yang tidak cocok diinterpolasi dari tetangga. Keluaran sync9.json {bite: [waktu timeline per kata teks]}."""
import json, re, difflib, numpy as np, soundfile as sf, librosa
from faster_whisper import WhisperModel
edl = json.load(open('edl6.json')); vo, sr = sf.read('mixout6/stem_vo.wav'); vo = vo.mean(1) if vo.ndim > 1 else vo
src = open('kt6.py').read(); C = eval(src[src.index('C = {') + 4:src.index('\nORANGE')].replace('P,', "'p',").replace('B,', "'b',"))
norm = lambda w: re.sub(r'[^a-z0-9]', '', w.lower().replace('2d', 'duad'))
OVR = {('K1', 8): ('src', 45.92), ('K1', 9): ('piece', 'K12'), ('C3', 19): ('src', 63.43), ('C3', 20): ('src', 63.67)}   # C3: energi 'atau di' 91,65-91,90 (whisper final melewatkannya)
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=8); out = {}
for bite, items in C.items():
    ps = [p for p in edl['vo'] if p['bite'] == bite]
    if not ps: continue
    a = max(0.0, ps[0]['v'] - 0.1); b = ps[-1]['v'] + ps[-1]['b'] - ps[-1]['a'] + 0.2   # v10f: hook mulai 0,04 -> a negatif = audio kosong
    seg = vo[int(a * sr):int(b * sr)].astype(np.float32)
    y = librosa.resample(seg, orig_sr=sr, target_sr=16000)
    rec = [(w.start + a, w.word, w.end + a) for g in m.transcribe(y, language='id', word_timestamps=True, beam_size=5, condition_on_previous_text=False)[0] for w in g.words]
    txt = []
    for it in items:
        if it[0] == 'p': txt += [w for ln in it[1] for w, t in ln]
        else: txt += [it[1].split()[0]]
    A = [norm(w) for w in txt]; Bw = [norm(r_[1]) for r_ in rec]
    t_of = [None] * len(txt)
    # v10f: cocokkan per HURUF, bukan per kata: whisper memecah 'talkshow-talkshownya' / 'narasumber-narasumber' jadi 3 token
    # (kata ber-tanda-hubung dulu jatuh ke interpolasi, terlambat 0,35-0,38 dtk). Waktu kata = awal token whisper huruf pertamanya.
    ca = ''.join(A); cb = ''.join(Bw)
    wa = [i for i, w in enumerate(A) for _ in w]; wb = [j for j, w in enumerate(Bw) for _ in w]
    pa = np.cumsum([0] + [len(w) for w in A])
    hit = {}
    for blk in difflib.SequenceMatcher(None, ca, cb, autojunk=False).get_matching_blocks():
        for k in range(blk.size): hit[blk.a + k] = blk.b + k
    for i in range(len(A)):
        cs = [hit[p] for p in range(pa[i], pa[i + 1]) if p in hit]
        if len(cs) >= max(1, 0.6 * len(A[i])) and pa[i] in hit:   # huruf pertama cocok + mayoritas huruf cocok
            j = wb[hit[pa[i]]]; k0 = hit[pa[i]] - (len(''.join(Bw[:j])))   # posisi huruf di dalam token whisper
            t_of[i] = round(rec[j][0] + (rec[j][2] - rec[j][0]) * k0 / max(1, len(Bw[j])), 3)   # 'disini' -> 'sini' di tengah token
    # kata tak cocok: interpolasi linear di antara tetangga yang cocok
    idx = [i for i, t in enumerate(t_of) if t is not None]
    for i in range(len(t_of)):
        if t_of[i] is None:
            lo = max([j for j in idx if j < i], default=None); hi = min([j for j in idx if j > i], default=None)
            if lo is not None and hi is not None: t_of[i] = round(t_of[lo] + (t_of[hi] - t_of[lo]) * (i - lo) / (hi - lo), 3)
            elif lo is not None: t_of[i] = round(t_of[lo] + 0.25 * (i - lo), 3)
            elif hi is not None: t_of[i] = round(max(a + 0.1, t_of[hi] - 0.25 * (hi - i)), 3)
    # v10f: whisper final menggabung 'ikut seneng' jadi satu token 'senang' 16,72-18,10 -> waktu sumber (w_0712: ikut 45,92) / awal potongan K12
    for (bb, i), (kind, v) in OVR.items():
        if bb == bite:
            if kind == 'src': t_of[i] = round(next(p['v'] + v - p['a'] for p in ps if p['a'] <= v < p['b']), 3)
            else: t_of[i] = round(next(p['v'] for p in ps if p['id'] == v) + 0.03, 3)
    # v10f (Sonnet: 'jangan' tampil 0,4 dtk sebelum suaranya): whisper menaruh awal kata di jeda -> geser ke awal energi suara
    # (jendela 10 ms >= -24 dB pada stem VO) dalam 0,6 dtk, tidak melewati kata berikutnya
    for i in range(len(t_of)):
        if t_of[i] is None: continue
        db = lambda t: 20 * np.log10(np.sqrt(np.mean(vo[int(t * sr):int((t + 0.03) * sr)] ** 2)) + 1e-9)
        if db(t_of[i]) < -26:
            lim = min(t_of[i] + 0.6, t_of[i + 1] - 0.05 if i + 1 < len(t_of) and t_of[i + 1] else 1e9)
            for tt in np.arange(t_of[i], lim, 0.01):
                if db(tt) >= -32 and max(db(u) for u in np.arange(tt, tt + 0.15, 0.03)) >= -24: print(f'  onset {txt[i]} {t_of[i]:.2f} -> {tt:.2f}'); t_of[i] = round(float(tt), 3); break
    out[bite] = t_of
    print(f"{bite:4s} cocok {len(idx)}/{len(txt)}  terdengar: {' '.join(r_[1] for r_ in rec)[:90]}")
json.dump(out, open('sync9.json', 'w'), indent=1)
