#!/bin/sh
# v8: ulang tata letak teks + render saja (audio/shot tidak berubah)
set -e
cd ~/work/bdf26/v6
~/work/mg-venv/bin/python kt6.py > kt6.log 2>&1
python3 layout6p.py > layout6p.log 2>&1
~/work/dfn/bin/python hook7.py > hook7.log 2>&1
~/work/dfn/bin/python center8.py > center8.log 2>&1
python3 kt6b.py > kt6b.log 2>&1
[ "$NORENDER" = 1 ] && exit 0
cd remotion && node_modules/.bin/remotion render src/index.ts BDF26Day1 ../out/BDF26_Day1_ContentCreator_v8${VARIANT:-A}.mp4 --codec h264 --crf 18 --audio-codec aac --audio-bitrate 320k --concurrency=7 > ../render6.log 2>&1
echo ALL_DONE >> ../render6.log
