#!/bin/bash
# Full Delivery Gate pipeline on a locked visual (Blok 1 mekanis)
set -e
cd "$(dirname "$0")/.."
G=~/work/skill-development/claude/motion-graphic/scripts; PY=~/work/mg-venv/bin/python
V=$1; OUT=$2
python3 $G/gate/audio_order.py lock visual $V --dir audio | tail -1
python3 edit/sfx_cues.py
$PY -I $G/gate/sfx_density.py $V audio/cues.json --json audio/sfx_density.json | tail -2
python3 $G/gate/audio_order.py lock sfx audio/cues.json --dir audio | tail -1
$PY -I edit/mix.py -14 >/dev/null
ffmpeg -v error -y -i audio/stem_voice.wav -i audio/stem_sfx.wav -filter_complex "[0]highpass=f=70,volume=6.8dB[v];[v][1]amix=inputs=2:normalize=0,alimiter=limit=0.9:level=false[o]" -map "[o]" -c:a pcm_s16le audio/preview_vs.wav
ffmpeg -v error -y -i $V -i audio/preview_vs.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest out/preview_visual_sfx.mp4
python3 $G/gate/audio_order.py lock musik music/used.wav --peran "bed tunggal dipilih Irfan (Aware, Adrián Berenguer), offset 47,9 dtk" --alasan "Irfan: 'Gunakan musik ini'; drop di 'aku tidak menjual', lift di 'aku memutuskan' (−3 dB agar suara di atas); music_fit fokus GUGUR dilaporkan" --didengar out/preview_visual_sfx.mp4 --dir audio | tail -1
MUS=-14 MASTER=2.1 ./edit/finalize.sh $V $OUT | tail -1
python3 $G/gate/audio_order.py check --dir audio | tail -1
echo -n "voice_fidelity "; $PY -I $G/gate/voice_fidelity.py edit/voice_edit.wav $OUT | tail -1
echo -n "caption_lines "; $PY -I $G/gate/caption_lines.py $OUT --fps 2 | tail -1
echo -n "palette "; $PY -I $G/palette_check.py $OUT | tail -1
ffmpeg -v error -y -i audio/stem_voice.wav -af "highpass=f=70,volume=8.5dB" qc/phone/stem_vo.wav
ffmpeg -v error -y -i audio/stem_sfx.wav -af "volume=1.7dB" qc/phone/stem_sfx.wav
ffmpeg -v error -y -i audio/stem_music.wav -af "equalizer=f=3150:t=q:w=1:g=-6,volume=1.7dB" qc/phone/stem_music.wav
cp audio/mix.wav qc/phone/mix.wav; python3 -c "import json; json.dump(json.load(open('audio/cues.json'))['cues'],open('qc/phone/cues.json','w'))"
$PY -I $G/audio/audio_phone.py --root qc/phone --list > qc/phone/report.txt 2>&1; head -3 qc/phone/report.txt; grep -E "VO clarity|harsh" qc/phone/report.txt
