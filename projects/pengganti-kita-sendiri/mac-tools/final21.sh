#!/bin/zsh
# Render final PKS v21 (bisu, 1080p) + penanda SFX, lalu mux 2 versi audio v20.
# usage: ./final21.sh   (log: seg/v21final.log; hasil: out/PKS_v21_video{1,2}.mp4)
set -e
cd "$(dirname "$0")/remotion"
rm -f ../seg/.bundle_stamp
npx remotion bundle src/index.ts --out-dir=../seg/bundle --public-dir=public > ../seg/bundle.log 2>&1
touch ../seg/.bundle_stamp
npx remotion render ../seg/bundle PenggantiKitaSendiri ../seg/v21final_v.mp4 --frames=0-3983 --scale=1 --muted --concurrency=4 --timeout=120000 --crf=16 --props='{"sfxlog":true}' --log=verbose > ../seg/v21final.log 2>&1
grep -o 'SFXEV.*' ../seg/v21final.log | sort -u > ../seg/v21final.sfx || true
cd ..
for V in 1 2; do
  ffmpeg -y -v error -i seg/v21final_v.mp4 -i seg/master_v20_video$V.flac -map 0:v -map 1:a -c:v copy -c:a aac -b:a 320k -shortest out/PKS_v21_video$V.mp4
done
echo FINAL21_DONE > seg/v21final.run.log
