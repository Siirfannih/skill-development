#!/bin/bash
# Gerbang produksi untuk render final: format terkunci, komposisi episode, ujung SFX, dan mix di speaker HP.
#
#   gerbang_produksi.sh <proyek> [<folder audio terkunci>] [<python ber-numpy+soundfile>]
#
# Dipanggil render.sh mode final/lego. Tiap gerbang bersyarat pada adanya file terkait di proyek, supaya proyek tanpa
# file itu tetap berjalan; begitu filenya ada, hasil gagal atau tidak terbaca = keluar 1 (fail-closed).
#   FORMAT     <proyek>/FORMAT (satu baris: slug format) ada -> slug harus punya formats/<slug>.md. Format story-doc-16x9
#              mewajibkan data episode + aset.json dan menjalankan cek_komposisi.py --ketat.
#   KOMPOSISI  data episode (remotion/src/data/*.json yang memuat "adegan" dan "kt"; atau daftar di KOMPOSISI_DATA) dan
#              remotion/public/*/aset.json ada -> gate/cek_komposisi.py (WAJAH, INSET, TEPI, ASET memblokir).
#   POTONG     sfx_potong.json di folder audio terkunci, <proyek>/audio, atau <proyek>/qc -> audio/sfx_potong.py --laporan.
#   HP         stem_vo.wav + stem_music.wav + stem_sfx.wav di salah satu folder itu -> audio/audio_phone.py --gate
#              (mix.wav dan cues.json wajib ada di folder yang sama).
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"; MG="$(cd "$HERE/../.." && pwd)"
[ $# -ge 1 ] || { sed -n '2,14p' "$0"; exit 1; }
P="$(cd "$1" && pwd)" || exit 1; AUDIO_DIR="${2:-$P/audio}"; PY="${3:-python3}"
R="$P/remotion"; QC="$P/qc"; gagal=0; KETAT=""; WAJIB=0

if [ -f "$P/FORMAT" ]; then
  SLUG="$(tr -d '[:space:]' < "$P/FORMAT")"
  if [ -z "$SLUG" ] || [ "$SLUG" = README ] || [ ! -f "$MG/formats/$SLUG.md" ]; then
    echo "GAGAL gerbang format: '$SLUG' di $P/FORMAT bukan format terkunci (pilih satu dari formats/README.md)."; gagal=1
  else echo "format terkunci: $SLUG"; [ "$SLUG" = story-doc-16x9 ] && { KETAT="--ketat"; WAJIB=1; }; fi
fi

EPS=()
if [ -n "${KOMPOSISI_DATA:-}" ]; then read -r -a EPS <<< "$KOMPOSISI_DATA"
else
  for f in "$R"/src/data/*.json; do [ -f "$f" ] || continue
    python3 -c 'import json,sys;d=json.load(open(sys.argv[1]));sys.exit(0 if isinstance(d,dict) and "adegan" in d and "kt" in d else 1)' "$f" 2>/dev/null && EPS+=("$f")
  done
fi
ASET="$(ls "$R"/public/*/aset.json 2>/dev/null | head -1)"
if [ "${#EPS[@]}" -gt 0 ] && [ -n "$ASET" ]; then
  python3 "$HERE/../gate/cek_komposisi.py" "${EPS[@]}" --public "$R/public" $KETAT \
    || { echo "GAGAL gerbang komposisi: perbaiki tanda di atas pada data episode (cek_komposisi.py), lalu build ulang."; gagal=1; }
elif [ "$WAJIB" = 1 ]; then
  echo "GAGAL gerbang komposisi: format story-doc-16x9 butuh data episode (remotion/src/data/*.json) dan remotion/public/<ep>/aset.json."; gagal=1
else echo "gerbang komposisi: dilewati (tidak ada data episode + aset.json)"; fi

SUDAH=":"
for d in "$AUDIO_DIR" "$P/audio" "$QC"; do
  [ -d "$d" ] || continue; d="$(cd "$d" && pwd)"; case "$SUDAH" in *":$d:"*) continue ;; esac; SUDAH="$SUDAH$d:"
  if [ -f "$d/sfx_potong.json" ]; then
    "$PY" "$HERE/../audio/sfx_potong.py" --laporan "$d/sfx_potong.json" \
      || { echo "GAGAL gerbang potong SFX ($d/sfx_potong.json): potong di jeda sunyi atau fade 150-300 ms yang selesai di batas objek."; gagal=1; }
  fi
  if [ -f "$d/stem_vo.wav" ] && [ -f "$d/stem_music.wav" ] && [ -f "$d/stem_sfx.wav" ]; then
    "$PY" "$HERE/../audio/audio_phone.py" --root "$d" --gate \
      || { echo "GAGAL gerbang speaker HP ($d): SFX harsh harus 0 dan median VO clarity >= 8 dB (audio_phone.py --root $d --list)."; gagal=1; }
  fi
done
exit "$gagal"
