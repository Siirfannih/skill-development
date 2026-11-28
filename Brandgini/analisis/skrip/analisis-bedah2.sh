#!/usr/bin/env bash
set -u
cd ~/work/soalnya-gini-studio; mkdir -p analisis/detail
F=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
# frame penuh (716x1274) untuk tipografi
for t in 4.3 18.8 35.8 45.5 25.5; do ffmpeg -v error -y -ss $t -i referensi/editing.mp4 -frames:v 1 -q:v 3 analisis/detail/editing_full_${t}.jpg; done
# transisi: 10 fps di sekitar pergantian komposisi
for r in "4.6 1.6 e1" "8.6 1.2 e2" "13.3 1.0 e3" "20.6 1.2 e4" "26.4 1.2 e5" "30.6 1.2 e6"; do set -- $r
  ffmpeg -v error -y -ss $1 -t $2 -i referensi/editing.mp4 -vf "fps=10,scale=160:-2,drawtext=fontfile=$F:text='%{pts\:hms}':x=2:y=2:fontsize=11:fontcolor=yellow:box=1:boxcolor=black@0.7,tile=6x2" -frames:v 1 -q:v 4 analisis/detail/editing_trans_$3.jpg; done
ls analisis/detail
