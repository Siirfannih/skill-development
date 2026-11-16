#!/bin/bash
# Sambung v4 (revisi R-007): rentang yang berubah dirender ulang (render.sh final … awal-akhir), sisanya dari v3.
# Filter concat + encode ulang CRF 14, lalu mix v4 dipasang sekali (render.sh: -c copy kehilangan frame di sambungan).
set -euo pipefail
cd "$(dirname "$0")/.."
V3=out/jensen-pain-suffering_v3.mp4; OUT=out/jensen-pain-suffering_v4.mp4
R=(104-181 271-457 543-560 813-922 1330-1427)
segs=(); inputs=(-i "$V3"); n=1; prev=0; parts=""; k=0
for r in "${R[@]}"; do
  a=${r%-*}; b=${r#*-}; f="out/r10_$r.mp4"; [ -f "$f" ] || { echo "tidak ada $f"; exit 1; }
  inputs+=(-i "$f")
  if [ "$a" -gt "$prev" ]; then parts+="[0:v]trim=start_frame=$prev:end_frame=$a,setpts=PTS-STARTPTS[s$k];"; segs+=("[s$k]"); k=$((k+1)); fi
  parts+="[$n:v]setpts=PTS-STARTPTS[s$k];"; segs+=("[s$k]"); k=$((k+1)); n=$((n+1)); prev=$((b+1))
done
[ "$prev" -lt 1428 ] && { parts+="[0:v]trim=start_frame=$prev:end_frame=1428,setpts=PTS-STARTPTS[s$k];"; segs+=("[s$k]"); k=$((k+1)); }
filter="${parts}$(printf '%s' "${segs[@]}")concat=n=$k:v=1:a=0,format=yuv420p[v]"
ffmpeg -v error -y "${inputs[@]}" -i audio/mix_v4.wav -filter_complex "$filter" -map "[v]" -map "$n:a" \
  -c:v libx264 -crf 14 -preset slow -r 30 -c:a aac -b:a 320k -ar 48000 -shortest -movflags +faststart "$OUT"
fr=$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "$OUT")
echo "$OUT: $fr frame (harus 1428)"; [ "$fr" = 1428 ]
