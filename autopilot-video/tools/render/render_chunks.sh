#!/bin/zsh
# Render per potongan supaya Chrome tidak kehabisan memori di Mac yang disknya hampir penuh.
cd ~/Proyek/content-ops-runs/aff-pompa-01
pkill -f "remotion render" 2>/dev/null
mkdir -p out/chunks; rm -f out/chunks/*.mp4 out/chunks/list.txt
for r in 0-299 300-599 600-899 900-1199; do
  for try in 1 2; do
    npx remotion render src/index.ts Main out/chunks/c$r.mp4 --frames=$r --concurrency=2 --image-format=jpeg --jpeg-quality=90 --timeout=60000 --muted > runs/render_$r.log 2>&1 && break
    echo "retry $r" >> runs/render_chunks.log
  done
  [ -f out/chunks/c$r.mp4 ] && echo "file 'c$r.mp4'" >> out/chunks/list.txt && echo "ok $r $(date +%T)" >> runs/render_chunks.log
done
ffmpeg -y -v error -f concat -safe 0 -i out/chunks/list.txt -c copy out/silent.mp4 && echo "CONCAT OK $(date +%T)" >> runs/render_chunks.log
