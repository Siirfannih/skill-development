#!/bin/sh
# v6 pipeline: speech -> EDL -> shot -> mix -> kepala -> teks -> layout -> render
set -e
cd ~/work/bdf26/v6
~/work/mg-venv/bin/python sil6.py > sil6.log 2>&1
python3 build6.py > build6.log
cp edl6.json remotion/src/edl.json
rm -f remotion/public/media/shot_*.mp4
python3 extract_shots6.py edl6.json remotion/public/media > extract6.log 2>&1
~/work/mg-venv/bin/python mix6.py edl6.json sfx6.json mixout6 > mix6.log 2>&1
cp mixout6/mix.wav remotion/public/media/mix.wav
HF_HUB_OFFLINE=1 ~/work/mg-venv/bin/python sync9.py > sync9.log 2>&1
python3 - <<'PY'
import json, re
d = json.load(open('edl6.json')); r = open('remotion/src/Root.tsx').read()
r = re.sub(r'(id="BDF26Day1" component=\{Main\} durationInFrames=)\{\d+\}', r'\g<1>{%d}' % round(d['dur'] * 30), r)
open('remotion/src/Root.tsx', 'w').write(r)
PY
~/work/dfn/bin/python heads6.py > heads6.log 2>&1
~/work/dfn/bin/python broll_map6.py > broll_map6.log 2>&1
~/work/mg-venv/bin/python kt6.py > kt6.log 2>&1
python3 layout6p.py > layout6p.log 2>&1
~/work/dfn/bin/python hook7.py > hook7.log 2>&1
~/work/dfn/bin/python center8.py > center8.log 2>&1
python3 kt6b.py > kt6b.log 2>&1
cd remotion && node_modules/.bin/remotion render src/index.ts BDF26Day1 ../out/BDF26_Day1_ContentCreator_v8${VARIANT:-A}.mp4 --codec h264 --crf 18 --audio-codec aac --audio-bitrate 320k --concurrency=7 > ../render6.log 2>&1
echo ALL_DONE >> ../render6.log
