set -e
cd /home/claude/pks6; PY=/home/claude/earshot_up/.venv/bin/python; S=/home/claude/earshot_up/skills/real-sound/scripts
$PY -I tools/build.py pass1 > out/log_build1.txt
$PY -I $S/mix.py --root . --design audio/sounddesign.json --no-master --out out/pass1/premaster.wav --stems out/pass1/stems --report out/pass1/report.json > out/log_mix1.txt 2>&1
rm -rf out/dump; $PY -I $S/mix.py --root . --design audio/sounddesign.json --dump out/dump > /dev/null 2>&1
$PY -I tools/build.py pass2 | tee out/log_build2.txt
$PY -I $S/mix.py --root . --design audio/sounddesign.json --no-master --out out/audio/premaster.wav --stems out/audio/stems --report out/qa/mix_report.json --trace out/qa/adds.json > out/log_mix2.txt 2>&1
$PY -I tools/final.py ${VOM:-10}
ffmpeg -v error -y -i /home/claude/pks-out/PKS_v2_video_noaudio.mp4 -i out/audio/soundtrack_final.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 320k -shortest -movflags +faststart out/film/PKS_v6.mp4
$PY -I tools/lvl.py
