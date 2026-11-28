import sys, json, subprocess, re, statistics as st
import numpy as np
def load(p):
    b=subprocess.run(["ffmpeg","-v","error","-i",p,"-ac","1","-ar","16000","-f","s16le","-"],capture_output=True).stdout
    return np.frombuffer(b,np.int16).astype(np.float32)/32768
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=4)
for path in sys.argv[1:]:
    segs, info = m.transcribe(load(path), language="id", word_timestamps=True, vad_filter=False)
    words = [w for s in segs for w in s.words]
    txt = " ".join(w.word.strip() for w in words)
    dur = words[-1].end - words[0].start
    gaps = [round(b.start - a.end, 2) for a, b in zip(words, words[1:])]
    long = [g for g in gaps if g >= 0.15]
    eb = subprocess.run(["ffmpeg","-hide_banner","-nostats","-i",path,"-vn","-af","ebur128=peak=true","-f","null","-"],capture_output=True,text=True).stderr.split("Summary:")[-1]
    I = re.search(r"I:\s+(-?[\d.]+)", eb).group(1); LRA = re.search(r"LRA:\s+(-?[\d.]+)", eb).group(1); TP = re.search(r"Peak:\s+(-?[\d.]+)", eb).group(1)
    print(f"== {path}\nkata {len(words)} | durasi ucap {dur:.1f}s | {len(words)/dur:.2f} kata/dtk | {len(words)/dur*60:.0f} WPM")
    print(f"jeda>=0.15s: {len(long)} | median {st.median(long) if long else 0:.2f}s | maks {max(gaps):.2f}s | jeda>=0.3s: {sum(g>=0.3 for g in gaps)}")
    print(f"loudness I {I} LUFS, LRA {LRA} LU, TP {TP} dBTP")
    print("teks:", txt[:900])
    big = [(round(a.end,2), g, a.word.strip(), b.word.strip()) for a,b,g in zip(words,words[1:],gaps) if g>=0.3]
    print("jeda >=0.3 (t, dtk, sebelum, sesudah):", big[:20])
