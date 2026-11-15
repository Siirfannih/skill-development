"""v10 (Irfan 15 Nov: teks kadang lebih maju / ketinggalan dari suara). Waktu muncul tiap kata diambil dari SUARA FINAL:
whisper large-v3 per kata pada stem VO hasil mix (per bite), lalu kata teks (kt6.C) dicocokkan berurutan (difflib) dengan kata
yang terdengar. Kata yang tidak cocok diinterpolasi dari tetangga. Keluaran sync9.json {bite: [waktu timeline per kata teks]}."""
import json, re, difflib, numpy as np, soundfile as sf, librosa
from faster_whisper import WhisperModel
edl = json.load(open('edl6.json')); vo, sr = sf.read('mixout6/stem_vo.wav'); vo = vo.mean(1) if vo.ndim > 1 else vo
src = open('kt6.py').read(); C = eval(src[src.index('C = {') + 4:src.index('\nORANGE')].replace('P,', "'p',").replace('B,', "'b',"))
norm = lambda w: re.sub(r'[^a-z0-9]', '', w.lower().replace('2d', 'duad'))
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=8); out = {}
for bite, items in C.items():
    ps = [p for p in edl['vo'] if p['bite'] == bite]
    if not ps: continue
    a = ps[0]['v'] - 0.1; b = ps[-1]['v'] + ps[-1]['b'] - ps[-1]['a'] + 0.2
    seg = vo[int(a * sr):int(b * sr)].astype(np.float32)
    y = librosa.resample(seg, orig_sr=sr, target_sr=16000)
    rec = [(w.start + a, w.word) for g in m.transcribe(y, language='id', word_timestamps=True, beam_size=5, condition_on_previous_text=False)[0] for w in g.words]
    txt = []
    for it in items:
        if it[0] == 'p': txt += [w for ln in it[1] for w, t in ln]
        else: txt += [it[1].split()[0]]
    A = [norm(w) for w in txt]; Bw = [norm(w) for t, w in rec]
    t_of = [None] * len(txt)
    for blk in difflib.SequenceMatcher(None, A, Bw, autojunk=False).get_matching_blocks():
        for k in range(blk.size): t_of[blk.a + k] = round(rec[blk.b + k][0], 3)
    # kata tak cocok: interpolasi linear di antara tetangga yang cocok
    idx = [i for i, t in enumerate(t_of) if t is not None]
    for i in range(len(t_of)):
        if t_of[i] is None:
            lo = max([j for j in idx if j < i], default=None); hi = min([j for j in idx if j > i], default=None)
            if lo is not None and hi is not None: t_of[i] = round(t_of[lo] + (t_of[hi] - t_of[lo]) * (i - lo) / (hi - lo), 3)
            elif lo is not None: t_of[i] = round(t_of[lo] + 0.25 * (i - lo), 3)
            elif hi is not None: t_of[i] = round(max(a + 0.1, t_of[hi] - 0.25 * (hi - i)), 3)
    out[bite] = t_of
    print(f"{bite:4s} cocok {len(idx)}/{len(txt)}  terdengar: {' '.join(w for t, w in rec)[:90]}")
json.dump(out, open('sync9.json', 'w'), indent=1)
