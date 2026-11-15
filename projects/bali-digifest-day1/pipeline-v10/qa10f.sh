#!/bin/sh
# v10f: QA sesudah render -> angka audio, gelombang, frame final, frame_audit per detik, reviewer GPT (INFO ditempel)
cd ~/work/bdf26/v6; V=${1:-out/BDF26_Recap_Day1-3_v10f.mp4}; PY=~/work/mg-venv/bin/python
sh fixkedip10.sh out/BDF26_Recap_Day1-3_v10f_raw.mp4 $V
ffmpeg -nostdin -v error -i $V -map 0:a -ar 48000 -y tmp/final10f.wav
$PY - <<'P'
import soundfile as sf, numpy as np, pyloudnorm as pl
x2, sr = sf.read('tmp/final10f.wav'); L = pl.Meter(sr).integrated_loudness(x2); x = x2.mean(1)
w = [(round(t, 2), round(20*np.log10(np.sqrt((x[int(t*sr):int((t+.1)*sr)]**2).mean())+1e-9), 1)) for t in np.arange(8, len(x)/sr - 0.6, 0.05)]
print(f'master LUFS {L:.2f}  peak {20*np.log10(np.abs(x).max()):.2f} dBFS  dur {len(x)/sr:.2f}')
print('jendela 100 ms < -40 dBFS (8 dtk..akhir-0,6):', [t for t in w if t[1] < -40])
P
$PY qa_wave10.py 2>&1 | tail -2
~/work/dfn/bin/python qa_frames9.py $V qa_frames10f 2>&1 | tail -8
rm -rf tmp/frames10f qc10/frame_audit; mkdir -p tmp/frames10f
ffmpeg -nostdin -v error -i $V -vf scale=960:540 -q:v 4 tmp/frames10f/f%05d.jpg
HF_HUB_OFFLINE=1 $PY qc10/prep10.py 2>&1 | tail -1
python3 ~/work/skill-development/claude/motion-graphic/scripts/juri/frame_audit.py tmp/frames10f --fps 30 --cuts qc10/cuts.json --words qc10/spoken.json --stems mixout6 --out qc10/frame_audit 2>&1 | tail -2
python3 qc10/info_text.py
sh qc10/review10f.sh
rm -rf tmp/frames10f
