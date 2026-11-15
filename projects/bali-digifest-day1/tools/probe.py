"""Transkrip jendela-jendela kecil dari file asli (48k -> 16k) untuk memastikan isi sebuah celah.
Pakai: python probe.py <file> a-b [a-b ...]"""
import sys, subprocess, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=8)
f = sys.argv[1]
for w in sys.argv[2:]:
    a, b = map(float, w.split('-'))
    pcm = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(a), '-to', str(b), '-i', f, '-map', '0:a:0', '-ac', '1', '-ar', '16000',
                          '-f', 's16le', '-'], capture_output=True).stdout
    x = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768
    segs, _ = m.transcribe(x, language='id', word_timestamps=True, vad_filter=False, beam_size=5)
    words = [f"{ww.word.strip()}[{ww.start + a:.2f}-{ww.end + a:.2f}]" for s in segs for ww in s.words]
    print(w, '|', ' '.join(words), flush=True)
