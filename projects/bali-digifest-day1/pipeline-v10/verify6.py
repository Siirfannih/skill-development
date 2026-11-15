"""Rakit tiap bite dari potongan speech5 (crossfade 10 ms) -> verify6/<bid>.wav, lalu transkrip large-v3 + prompt filler.
Kata > 0,55 dtk ditandai (kemungkinan mikir/"eee" tersembunyi)."""
import json, os, numpy as np, soundfile as sf, librosa
from faster_whisper import WhisperModel
SRC = {'0361': [(10, '../v3/vo_src/dfn18/0361_10_DeepFilterNet3.wav')], '0378': [(10, 'vo_src/dfn24/0378_10_DeepFilterNet3.wav')],
       '0530': [(105, 'vo_src/dfn24/0530_105_DeepFilterNet3.wav')], '0525': [(172, 'vo_src/dfn24/0525_172_DeepFilterNet3.wav')],
       '0426': [(12, 'vo_src/dfn24/0426_12_DeepFilterNet3.wav')], '0531': [(95, 'vo_src/dfn24/0531_95_DeepFilterNet3.wav')],
       '0399': [(36, 'vo_src/dfn24/0399_36_DeepFilterNet3.wav')]}
sp = json.load(open('speech6.json')); os.makedirs('verify6', exist_ok=True)
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=8)
PROMPT = None   # prompt filler memancing halusinasi "apa namanya"; verifikasi pakai transkrip polos
for bid, d in sp.items():
    off, f = [x for x in SRC[d['clip']] if x[0] <= d['parts'][0][0]][-1]; x, sr = sf.read(f)
    if x.ndim == 2: x = x.mean(1)
    xf = int(0.01 * sr); out = np.zeros(0)
    for a, b in d['parts']:
        y = x[int((a - off) * sr):int((b - off) * sr)].copy()
        if len(out) >= xf:
            r = np.linspace(0, 1, xf); out[-xf:] = out[-xf:] * (1 - r) + y[:xf] * r; y = y[xf:]
        out = np.concatenate([out, y])
    sf.write(f'verify6/{bid}.wav', out, sr)
    y16 = librosa.resample(out.astype(np.float32), orig_sr=sr, target_sr=16000)
    segs, _ = m.transcribe(y16, language='id', word_timestamps=True, vad_filter=False, beam_size=5, initial_prompt=PROMPT)
    W = [(w.start, w.end, w.word.strip()) for s in segs for w in s.words]
    print(bid, f'{len(out)/sr:.2f}s |', ' '.join(f"{w}{'<'+format(e-s,'.2f')+'>' if e-s>0.55 else ''}" for s, e, w in W), flush=True)
