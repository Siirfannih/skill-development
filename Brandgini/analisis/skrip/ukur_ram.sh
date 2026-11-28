#!/usr/bin/env bash
# Ukur RAM render Remotion 1080p komposisi "Berat" (tools/bench-render) pada konkurensi 6 dan 2, menghormati kunci render global.
set -u
cd ~/work/skill-development/tools/bench-render
OUT=$(mktemp -d /tmp/sg-ukurram.XXXX)
exec 9>/tmp/remotion-heavy-render.lock; flock 9
./node_modules/.bin/remotion bundle src/index.ts --out-dir "$OUT/bundle" >/dev/null 2>&1 || { echo "bundle gagal"; exit 1; }
avail() { awk '/MemAvailable/{printf "%.2f", $2/1048576}' /proc/meminfo; }
for K in 6 2; do
  base=$(avail); min=$base
  ( timeout 600 ./node_modules/.bin/remotion render "$OUT/bundle" Berat "$OUT/o$K.mp4" --frames=0-89 --concurrency=$K --log=error >/dev/null 2>&1; echo $? > "$OUT/rc$K" ) &
  pid=$!; t0=$(date +%s)
  while kill -0 $pid 2>/dev/null; do a=$(avail); min=$(python3 -c "print(min($min,$a))"); sleep 0.5; done
  echo "konkurensi $K: rc $(cat $OUT/rc$K) · $(( $(date +%s)-t0 )) dtk/90 frame · MemAvailable awal ${base} GiB, terendah ${min} GiB, terpakai puncak $(python3 -c "print(round($base-$min,2))") GiB"
done
du -sh "$OUT" | cut -f1 | sed 's/^/ukuran bundle+keluaran: /'
rm -rf "$OUT"
