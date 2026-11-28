#!/usr/bin/env bash
# Automated Technical QC & 6-Frame Extractor untuk Soalnya Gini
set -euo pipefail

EP_DIR="${1:-}"
if [[ -z "$EP_DIR" || ! -f "$EP_DIR/render.mp4" ]]; then
  echo "Usage: bash tools/run_qc.sh episodes/epXX"
  exit 2
fi

VIDEO="$EP_DIR/render.mp4"
STILLS="$EP_DIR/qc-stills"
mkdir -p "$STILLS"

echo "=== 1. Slop Gate ==="
[[ -f "$EP_DIR/script.md" ]] && bash tools/slop-grep.sh "$EP_DIR/script.md"
[[ -f "$EP_DIR/Scene.tsx" ]] && bash tools/slop-grep.sh "$EP_DIR/Scene.tsx"

echo "=== 2. Video Metadata Check ==="
WIDTH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$VIDEO")
HEIGHT=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$VIDEO")
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIDEO")

echo "Resolusi: ${WIDTH}x${HEIGHT} | Durasi: ${DUR}s"
if [[ "$WIDTH" != "1080" || "$HEIGHT" != "1920" ]]; then
  echo "[FAIL] Resolusi harus 1080x1920!"
  exit 1
fi

DUR_OK=$(python3 -c "d=float('$DUR'); print('1' if 44.0 <= d <= 61.0 else '0')")
if [[ "$DUR_OK" != "1" ]]; then
  echo "[FAIL] Durasi ${DUR}s di luar rentang 44-61 detik!"
  exit 1
fi

echo "=== 3. Loudness Check (Target -14 LUFS) ==="
ffmpeg -i "$VIDEO" -af ebur128=framelog=quiet -f null - 2>&1 | grep -E "I:|LRA:|Peak:" || true

echo "=== 4. Extract 6 Key Frames for Visual Audit ==="
END_TS=$(python3 -c "print(max(1.0, float('$DUR') - 1.0))")
for TS in 0.2 3.0 15.0 30.0 45.0 "$END_TS"; do
  ffmpeg -y -ss "$TS" -i "$VIDEO" -frames:v 1 "$STILLS/frame_${TS}s.png" -loglevel error
done

echo "[OK] Technical QC selesai. 6 frame tersimpan di $STILLS/"
