#!/bin/zsh
# Tambal rentang frame di seg/v22final_v.mp4 lalu mux ulang 2 versi audio v20.  usage: zsh ./patch21.sh <fA> <fB>
set -e
cd "$(dirname "$0")/remotion"
A=$1; B=$2
rm -f ../seg/.bundle_stamp
npx remotion bundle src/index.ts --out-dir=../seg/bundle --public-dir=public > ../seg/bundle.log 2>&1
touch ../seg/.bundle_stamp
npx remotion render ../seg/bundle PenggantiKitaSendiri ../seg/p22_${A}_${B}.mp4 --frames=$A-$B --muted --concurrency=4 --timeout=120000 --crf=16 --props='{"sfxlog":true}' --log=verbose > ../seg/p22.log 2>&1
cd ../seg
TA=$(python3 -c "print($A/30)"); TB=$(python3 -c "print(($B+1)/30)")
ffmpeg -y -v error -i v22final_v.mp4 -i p22_${A}_${B}.mp4 -filter_complex \
 "[0:v]trim=end=$TA,setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[p];[0:v]trim=start=$TB,setpts=PTS-STARTPTS[b];[a][p][b]concat=n=3:v=1[v]" \
 -map "[v]" -c:v libx264 -crf 16 -preset medium -pix_fmt yuv420p -r 30 v22final_v_patched.mp4
mv v22final_v.mp4 v22final_v_prepatch.mp4; mv v22final_v_patched.mp4 v22final_v.mp4
cd ..
for V in 1 2; do
  ffmpeg -y -v error -i seg/v22final_v.mp4 -i seg/master_v20_video$V.flac -map 0:v -map 1:a -c:v copy -c:a aac -b:a 320k -shortest out/PKS_v22_video$V.mp4
done
echo PATCH22_DONE > seg/p22.run.log
