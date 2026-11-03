#!/bin/zsh
# Render satu segmen PKS untuk QC cepat. Pakai bundle yang sudah ada (bundle ulang hanya jika src berubah).
# usage: ./seg.sh <nama> <start_s> <end_s> [scale=0.5]
set -e
cd "$(dirname "$0")/remotion"
NAME=$1; A=$2; B=$3; SCALE=${4:-0.5}
FA=$(python3 -c "print(int(round($A*30)))"); FB=$(python3 -c "print(int(round($B*30))-1)")
STAMP=../seg/.bundle_stamp
NEWEST=$(find src -type f -newer $STAMP 2>/dev/null | head -1)
if [ ! -d ../seg/bundle ] || [ ! -f $STAMP ] || [ -n "$NEWEST" ]; then
  npx remotion bundle src/index.ts --out-dir=../seg/bundle --public-dir=public > ../seg/bundle.log 2>&1
  touch $STAMP
fi
npx remotion render ../seg/bundle PenggantiKitaSendiri ../seg/${NAME}_v.mp4 --frames=$FA-$FB --scale=$SCALE --muted --concurrency=4 --timeout=120000 --props='{"sfxlog":true}' --log=verbose > ../seg/${NAME}.log 2>&1
grep -o 'SFXEV.*' ../seg/${NAME}.log | sort -u > ../seg/${NAME}.sfx || true
if [ -f ../seg/master19.wav ]; then
  ffmpeg -y -v error -i ../seg/${NAME}_v.mp4 -ss $A -t $(python3 -c "print($B-$A)") -i ../seg/master19.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest ../seg/${NAME}.mp4
else
  mv ../seg/${NAME}_v.mp4 ../seg/${NAME}.mp4
fi
echo DONE ../seg/${NAME}.mp4
