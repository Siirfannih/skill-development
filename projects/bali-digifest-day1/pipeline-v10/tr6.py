"""v6: transkrip per kata (large-v3) dari audio DeepFilterNet tiap pembicara baru -> v6/words6.json (detik klip sumber).
Prompt hanya nama diri (prompt filler memancing halusinasi, v5)."""
import json, numpy as np, soundfile as sf, librosa
from faster_whisper import WhisperModel
SRC = {'0361': (10, '../v3/vo_src/dfn18/0361_10_DeepFilterNet3.wav'), '0378': (10, 'vo_src/dfn24/0378_10_DeepFilterNet3.wav'),
       '0530': (105, 'vo_src/dfn24/0530_105_DeepFilterNet3.wav'), '0525': (172, 'vo_src/dfn24/0525_172_DeepFilterNet3.wav'),
       '0426': (12, 'vo_src/dfn24/0426_12_DeepFilterNet3.wav'), '0531': (95, 'vo_src/dfn24/0531_95_DeepFilterNet3.wav'),
       '0399': (36, 'vo_src/dfn24/0399_36_DeepFilterNet3.wav')}
WIN = [('H', '0361', 12.2, 15.4), ('D1', '0378', 12.4, 17.2), ('D2', '0530', 113.6, 121.0), ('T1', '0525', 173.6, 191.0),
       ('I1', '0426', 13.4, 28.2), ('T2', '0531', 97.4, 109.8), ('C1', '0399', 38.4, 50.2), ('C2', '0399', 73.6, 75.6), ('Q', '0399', 68.0, 73.6),
       ('C3', '0399', 54.8, 67.2)]
PROMPT = 'Bali Digifest, Primakara, Pemprov Bali, art toys, claymaking, dua dimensi, tiga dimensi, Denpasar, Jembrana, Klungkung.'
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=8)
out = {}
for bid, c, a, b in WIN:
    off, f = SRC[c]; x, sr = sf.read(f)
    if x.ndim == 2: x = x.mean(1)
    seg = librosa.resample(x[int((a - off) * sr):int((b - off) * sr)].astype(np.float32), orig_sr=sr, target_sr=16000)
    segs, _ = m.transcribe(seg, language='id', word_timestamps=True, vad_filter=False, beam_size=5, initial_prompt=PROMPT)
    W = [[round(w.start + a, 3), round(w.end + a, 3), w.word.strip(), round(w.probability, 2)] for s in segs for w in s.words]
    out[bid] = dict(clip=c, a=a, b=b, words=W)
    print(bid, c, ' '.join(f'{w[2]}[{w[0]:.2f}-{w[1]:.2f}]' for w in W), flush=True)
json.dump(out, open('words6.json', 'w'), ensure_ascii=False, indent=1)
