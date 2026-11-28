#!/bin/bash
cd ~/work/soalnya-gini-studio/test-produksi/ep02/remotion
export PATH="$HOME/.local/opt/node-v22.20.0-linux-x64/bin:$PATH"
date +%T > ../qc/v3/mulai.txt
flock /tmp/remotion-heavy-render.lock npx remotion render src/index.ts SgMain ../qc/video_tanpa_audio.mp4 --muted --codec=h264 --crf=16 --pixel-format=yuv420p --concurrency=3 > ../qc/v3/final_render.log 2>&1
echo "rc=$?" >> ../qc/v3/final_render.log
cd ..
bash ~/work/skill-development/claude/motion-graphic/scripts/juri/render.sh . still SgMain $(~/work/mg-venv/bin/python ~/work/soalnya-gini-studio/v2/tools/beat_frames.py label shotlist.json) > qc/v3/still_run.txt 2>&1
echo selesai >> qc/v3/still_run.txt
