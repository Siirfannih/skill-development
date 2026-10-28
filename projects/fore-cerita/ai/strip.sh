#!/bin/bash
# strip.sh out.jpg clip1 clip2 ... : 4 frames per clip (row per clip)
out=$1; shift; args=()
for c in "$@"; do n=$(basename $c .mp4); d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $c)
 for k in 0 1 2 3; do t=$(python3 -c "print($d*($k*0.31+0.03))"); ffmpeg -v error -ss $t -i $c -frames:v 1 -y /tmp/st_${n}_$k.jpg; args+=(/tmp/st_${n}_$k.jpg:$n@$t); done; done
python3 /home/claude/fore/ai/sheet.py $out 4 400 "${args[@]}"
