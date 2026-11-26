#!/usr/bin/env bash
# mulai.sh <folder-proyek> [remotion|storyboard] — salin kerangka + modul toolkit ke proyek baru (tidak menimpa file yang sudah ada).
#   remotion    (bawaan) package.json, tsconfig, remotion.config.ts, src/{Root,Video,tema}.tsx + src/toolkit/ (gerak, latar, kamera, transisi, inti)
#   storyboard  frame.html + tema.js + toolkit/toolkit.js (bundel klasik, jalan via file://) + toolkit/esm/ (modul ESM asli)
# Modul DISALIN (bukan symlink): bundler Remotion tidak mengikuti symlink keluar proyek dengan mulus. Perbarui dengan menjalankan ulang
# dengan --perbarui (hanya src/toolkit atau toolkit/, bukan berkas milikmu).
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
MG="$(cd "$HERE/.." && pwd)"
PERBARUI=0; ARGS=()
for a in "$@"; do [ "$a" = "--perbarui" ] && PERBARUI=1 || ARGS+=("$a"); done
DEST="${ARGS[0]:-}"; JALUR="${ARGS[1]:-remotion}"
[ -n "$DEST" ] || { echo "pakai: mulai.sh <folder-proyek> [remotion|storyboard] [--perbarui]" >&2; exit 2; }
mkdir -p "$DEST"; DEST="$(cd "$DEST" && pwd)"
MOD=(gerak latar kamera transisi)

salin_modul() { # $1 = folder tujuan modul
  rm -rf "$1"; mkdir -p "$1"
  for m in "${MOD[@]}"; do cp -R "$HERE/$m" "$1/$m"; done
}

case "$JALUR" in
  remotion)
    if [ "$PERBARUI" = 0 ]; then cp -Rn "$HERE/starter/." "$DEST/" 2>/dev/null || true; fi
    T="$DEST/src/toolkit"; mkdir -p "$DEST/src"; salin_modul "$T"
    mkdir -p "$T/inti"
    cp -R "$MG/scripts/remotion/ae-primitives" "$T/inti/ae-primitives"; rm -f "$T/inti/ae-primitives/README.md"
    cp "$MG/scripts/remotion/curves.ts" "$MG/scripts/remotion/timing.ts" "$T/inti/"
    # jalur relatif repo -> jalur relatif salinan
    find "$T" -name '*.ts' -o -name '*.tsx' | while read -r f; do
      perl -pi -e 's{\.\./\.\./scripts/remotion/}{../inti/}g; s{\.\./\.\./toolkit/}{../}g' "$f"
    done
    echo "remotion: $DEST  (isi src/tema.ts dari BRAND.md/REF-SPEC.md; node_modules: npm install atau symlink)"
    ;;
  storyboard)
    if [ "$PERBARUI" = 0 ]; then cp -Rn "$HERE/starter-storyboard/." "$DEST/" 2>/dev/null || true; fi
    mkdir -p "$DEST/toolkit"; salin_modul "$DEST/toolkit/esm"; rm -rf "$DEST/toolkit/esm/transisi"
    python3 "$HERE/bundel.py" "$DEST/toolkit/toolkit.js"
    echo "storyboard: $DEST/frame.html  (render: python3 $MG/scripts/lihat.py $DEST/frame.html)"
    ;;
  *) echo "jalur tidak dikenal: $JALUR (remotion|storyboard)" >&2; exit 2 ;;
esac
