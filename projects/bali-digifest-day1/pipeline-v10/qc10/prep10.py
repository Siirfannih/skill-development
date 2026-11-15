"""Siapkan audit dua-model v10: kata terdengar (whisper dari stem VO final), potong disengaja (EDL), teks layar per potongan."""
import json, os, glob, numpy as np, soundfile as sf, librosa
from faster_whisper import WhisperModel
edl = json.load(open('edl6.json')); FPS = 30
json.dump([round(s['v0'] * FPS) for s in edl['shots']], open('qc10/cuts.json', 'w'))
vo, sr = sf.read('mixout6/stem_vo.wav'); vo = vo.mean(1) if vo.ndim > 1 else vo
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=8); W = []
for p0 in sorted({p['bite'] for p in edl['vo']}, key=lambda b: min(q['v'] for q in edl['vo'] if q['bite'] == b)):
    ps = [q for q in edl['vo'] if q['bite'] == p0]; a = max(0.0, ps[0]['v'] - 0.1); b = ps[-1]['v'] + ps[-1]['b'] - ps[-1]['a'] + 0.2
    y = librosa.resample(vo[int(a * sr):int(b * sr)].astype(np.float32), orig_sr=sr, target_sr=16000)
    W += [dict(w=w.word.strip(), s=round(w.start + a, 2), e=round(w.end + a, 2)) for g in m.transcribe(y, language='id', word_timestamps=True, beam_size=5, condition_on_previous_text=False)[0] for w in g.words]
json.dump(W, open('qc10/spoken.json', 'w'), ensure_ascii=False)
print('kata terdengar', len(W))
