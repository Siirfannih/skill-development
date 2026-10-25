#!/bin/bash
# Salin skill aktif dari repo ke ~/.claude/skills dan cabut skill yang sudah diarsipkan.
# Cadangan isi lama disimpan di ~/.claude/skills-backup/<waktu>/ sebelum ditimpa.
set -euo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"; DEST="$HOME/.claude/skills"; BK="$HOME/.claude/skills-backup/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BK"
for d in "$REPO"/claude/*/; do n=$(basename "$d")
  [ -e "$DEST/$n" ] && cp -R "$DEST/$n" "$BK/"
  rm -rf "$DEST/$n"; cp -R "$d" "$DEST/$n"; echo "sinkron  $n"; done
for d in "$REPO"/archive/*/; do n=$(basename "$d")
  if [ -e "$DEST/$n" ]; then mv "$DEST/$n" "$BK/"; echo "dicabut  $n (cadangan di $BK)"; fi; done
echo "Selesai. Cadangan: $BK"
