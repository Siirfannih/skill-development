#!/bin/bash
# Gerbang produksi untuk render final: komposisi episode, ujung SFX, dan mix di speaker HP. Netral gaya: tidak ada
# daftar format atau template; yang diperiksa hanya ukuran yang berlaku di gaya apa pun.
#
#   gerbang_produksi.sh [--ketat] <proyek> [<folder audio terkunci>] [<python ber-numpy+soundfile>]
#
# Dipanggil render.sh mode final/lego. Tiap gerbang bersyarat pada adanya file terkait di proyek, supaya proyek tanpa
# file itu tetap berjalan; begitu filenya ada, hasil gagal atau tidak terbaca = keluar 1 (fail-closed).
#   KOMPOSISI  data episode (remotion/src/data/*.json yang memuat "adegan" dan "kt"; atau daftar di KOMPOSISI_DATA) dan
#              remotion/public/*/aset.json ada -> gate/cek_komposisi.py (WAJAH, INSET, TEPI, ASET selalu memblokir).
#   KETAT      pilihan proyek, tidak pernah bawaan: flag --ketat, atau file <proyek>/qc/ketat. File kosong (atau hanya
#              komentar #) = semua tanda memblokir (cek_komposisi.py --ketat). File berisi nama tanda (mis. "JEDA KARTU
#              LOGO") = tanda itu ikut memblokir di samping empat tanda bawaan. Nama tanda tak dikenal = keluar 1.
#              Mode ketat mewajibkan data episode + aset.json ada.
#   PERMUKAAN  <proyek>/remotion/src dan <proyek>/storyboard (bila ada) -> gate/permukaan_cek.py (K1 sans saja, K2 permukaan datar;
#              ERROR memblokir). Bawaan aktif; dilewati hanya dengan file <proyek>/qc/permukaan-lewati berisi alasan tertulis >= 3 kata
#              (alasan dicetak). Pengecualian per baris: komentar `permukaan-ok: <alasan>`. Hasil gagal atau tak terbaca = keluar 1.
#   POTONG     sfx_potong.json di folder audio terkunci, <proyek>/audio, atau <proyek>/qc -> audio/sfx_potong.py --laporan.
#   HP         stem_vo.wav + stem_music.wav + stem_sfx.wav di salah satu folder itu -> audio/audio_phone.py --gate
#              (mix.wav dan cues.json wajib ada di folder yang sama).
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
FLAG_KETAT=0; ARGS=()
for a in "$@"; do if [ "$a" = "--ketat" ]; then FLAG_KETAT=1; else ARGS+=("$a"); fi; done
[ "${#ARGS[@]}" -ge 1 ] || { sed -n '2,20p' "$0"; exit 1; }
P="$(cd "${ARGS[0]}" && pwd)" || exit 1; AUDIO_DIR="${ARGS[1]:-$P/audio}"; PY="${ARGS[2]:-python3}"
R="$P/remotion"; QC="$P/qc"; gagal=0; KETAT=(); WAJIB=0

if [ "$FLAG_KETAT" = 1 ]; then KETAT=(--ketat); WAJIB=1; echo "komposisi ketat: semua tanda memblokir (flag --ketat)"
elif [ -f "$QC/ketat" ]; then
  WAJIB=1; TANDA="$(sed 's/#.*//' "$QC/ketat" | tr ',a-z' ' A-Z' | xargs)"
  if [ -z "$TANDA" ]; then KETAT=(--ketat); echo "komposisi ketat: semua tanda memblokir (qc/ketat)"
  else KETAT=(--blok "WAJAH,INSET,TEPI,ASET,${TANDA// /,}"); echo "komposisi ketat: bawaan + $TANDA memblokir (qc/ketat)"; fi
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
  python3 "$HERE/../gate/cek_komposisi.py" "${EPS[@]}" --public "$R/public" ${KETAT[@]+"${KETAT[@]}"} \
    || { echo "GAGAL gerbang komposisi: perbaiki tanda di atas pada data episode (cek_komposisi.py), lalu build ulang."; gagal=1; }
elif [ "$WAJIB" = 1 ]; then
  echo "GAGAL gerbang komposisi: mode ketat butuh data episode (remotion/src/data/*.json) dan remotion/public/<ep>/aset.json."; gagal=1
else echo "gerbang komposisi: dilewati (tidak ada data episode + aset.json)"; fi

SRC=(); for d in "$R/src" "$P/storyboard"; do [ -d "$d" ] && SRC+=("$d"); done
if [ "${#SRC[@]}" -gt 0 ]; then
  ALASAN="$( [ -f "$QC/permukaan-lewati" ] && sed 's/#.*//' "$QC/permukaan-lewati" | xargs || true )"
  if [ -n "$ALASAN" ] && [ "$(echo "$ALASAN" | wc -w)" -ge 3 ]; then echo "gerbang permukaan: dilewati dengan alasan tertulis (qc/permukaan-lewati): $ALASAN"
  else
    [ -f "$QC/permukaan-lewati" ] && echo "qc/permukaan-lewati diabaikan: alasan harus >= 3 kata"
    python3 "$HERE/../gate/permukaan_cek.py" "${SRC[@]}" \
      || { echo "GAGAL gerbang permukaan: ubah ke sans datar (K1/K2), atau beri komentar permukaan-ok: <alasan> bila user memintanya."; gagal=1; }
  fi
else echo "gerbang permukaan: dilewati (tidak ada remotion/src atau storyboard)"; fi

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
