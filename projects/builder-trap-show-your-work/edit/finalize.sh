#!/bin/bash
# visual terkunci -> sfx -> musik -> mix -> mux + ukur
set -e
cd "$(dirname "$0")/.."
G=~/work/skill-development/claude/motion-graphic/scripts
PY=~/work/mg-venv/bin/python
V=${1:-out/visual_v5.mp4}; OUT=${2:-out/builder-trap_v5.mp4}
MUS=${MUS:--13.5}
python3 edit/sfx_cues.py
$PY -I edit/mix.py $MUS >/dev/null
ffmpeg -v error -y -i audio/stem_voice.wav -i audio/stem_sfx.wav -i audio/stem_music.wav -filter_complex "[0]highpass=f=70,volume=6.8dB[v];[1]volume=${SFXG:-0}dB[s];[2]equalizer=f=3150:t=q:w=1:g=-6[m];[v][s][m]amix=inputs=3:normalize=0,volume=${MASTER:-1.1}dB,alimiter=limit=0.95:attack=5:release=80:level=false[o]" -map "[o]" -c:a pcm_s24le audio/raw_mix.wav
ffmpeg -v error -y -i audio/raw_mix.wav -af "aresample=192000,alimiter=limit=0.8:attack=1:release=50:level=false,aresample=48000" -c:a pcm_s16le audio/mix.wav
ffmpeg -v error -y -i $V -i audio/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -af volume=-0.4dB -shortest $OUT
for s in voice sfx music; do echo -n "$s "; ffmpeg -hide_banner -i audio/stem_$s.wav -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tr -s ' '; done
echo -n "final "; ffmpeg -hide_banner -i $OUT -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I:|LRA:|Peak:)" | tr -s ' ' | tr '\n' ' '; echo
