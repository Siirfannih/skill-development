#!/usr/bin/env bash
# Bedah referensi: contact sheet fps=1 bertimestamp + scene detection (>0.3 cut, >0.12 perubahan)
set -u
cd ~/work/soalnya-gini-studio
mkdir -p analisis; rm -f analisis/*_sheet_*.png
FONT=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
for n in editing vox vox2 edubizz-1; do
  f=referensi/$n.mp4
  nice -n 10 ffmpeg -v error -y -i "$f" -vf "fps=1,scale=200:-2,drawtext=fontfile=$FONT:text='%{pts\:hms}':x=3:y=3:fontsize=14:fontcolor=yellow:box=1:boxcolor=black@0.7,tile=8x4" -q:v 4 analisis/${n}_sheet_%02d.jpg
  for th in 0.3 0.12; do
    nice -n 10 ffmpeg -hide_banner -i "$f" -vf "select='gt(scene,$th)',showinfo" -an -f null - 2>&1 \
      | grep -o 'pts_time:[0-9.]*' | cut -d: -f2 | awk '{printf "%.2f ", $1}' > analisis/${n}_scene_${th}.txt
    echo "$n scene>$th: $(wc -w < analisis/${n}_scene_${th}.txt) -> $(cat analisis/${n}_scene_${th}.txt)"
  done
done
ls -la analisis
