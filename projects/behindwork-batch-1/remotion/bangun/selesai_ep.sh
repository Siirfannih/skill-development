#!/bin/bash
# Tutup satu episode: render audio saja (VO + SFX + musik) dari komposisi yang sama, gabungkan dengan video
# yang sudah dirender (tanpa render gambar ulang), ukur loudness, simpan dan unggah ke Drive.
# Pakai: selesai_ep.sh <Comp> <nama_keluaran>     (dijalankan dari folder remotion/)
set -euo pipefail
COMP="$1"; NAMA="$2"; OUT=out
[ -f "$OUT/${COMP,,}_video.mp4" ] || { echo "video $OUT/${COMP,,}_video.mp4 belum ada"; exit 1; }
npx remotion render src/index.ts "$COMP" "$OUT/${COMP,,}_audio.wav" --codec=wav --log=error
ffmpeg -v error -y -i "$OUT/${COMP,,}_video.mp4" -i "$OUT/${COMP,,}_audio.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest "$OUT/$NAMA.mp4"
echo "== loudness campuran"
ffmpeg -hide_banner -i "$OUT/${COMP,,}_audio.wav" -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I|LRA|Peak):" | tail -3
D=/mnt/storage-projects/behindwork-batch-1/final; mkdir -p "$D"; cp "$OUT/$NAMA.mp4" "$D/"
rclone copy "$D/$NAMA.mp4" "gdrive:Claude edit/behindwork-batch-1/final" 2>&1 | grep -v NOTICE || true
echo "selesai: $D/$NAMA.mp4"
