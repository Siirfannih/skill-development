#!/usr/bin/env bash
# Wrapper Blender headless: render urutan frame. Blender mengeksekusi argumen BERURUTAN, jadi -a (atau -f) harus
# paling akhir; -E, -o, -F, -s, -e harus sebelum itu. Skrip menyusun urutan yang benar dan memeriksa Blender dulu.
# Pakai: render_seq.sh scene.blend --start 1 --end 77 [--engine CYCLES] [--format OPEN_EXR] [--out //render/frame_#####]
#                      [--threads N] [--dry-run]
#   --dry-run  hanya cetak perintah (tidak butuh Blender). --out relatif ke berkas .blend ("//"), jumlah # = lebar nomor frame.
# Keluar: 0 ok, 2 salah pakai atau Blender tidak ada.
set -euo pipefail
BLEND=""; S=1; E=""; ENGINE=CYCLES; FMT=OPEN_EXR; OUT='//render/frame_#####'; TH=""; DRY=0
while [ $# -gt 0 ]; do
  case "$1" in
    --start) S="$2"; shift;; --end) E="$2"; shift;; --engine) ENGINE="$2"; shift;;
    --format) FMT="$2"; shift;; --out) OUT="$2"; shift;; --threads) TH="$2"; shift;;
    --dry-run) DRY=1;;
    -*) echo "opsi tidak dikenal: $1" >&2; exit 2;;
    *) BLEND="$1";;
  esac; shift
done
[ -n "$BLEND" ] && [ -n "$E" ] || { sed -n 4,6p "$0" >&2; exit 2; }
case "$S$E" in *[!0-9]*) echo "--start/--end harus bilangan bulat" >&2; exit 2;; esac
[ "$E" -ge "$S" ] || { echo "--end ($E) < --start ($S)" >&2; exit 2; }
case "$OUT" in *'#'*) ;; *) echo "--out harus memuat # untuk nomor frame (mis. //render/frame_#####)" >&2; exit 2;; esac

CMD=(blender -b "$BLEND" -E "$ENGINE" -o "$OUT" -F "$FMT" -s "$S" -e "$E")
[ -n "$TH" ] && CMD+=(-t "$TH")
CMD+=(-a)   # -a harus terakhir

if [ "$DRY" = 1 ]; then printf '%q ' "${CMD[@]}"; echo; exit 0; fi
if ! command -v blender >/dev/null 2>&1; then
  echo "GAGAL: blender tidak ada di PATH (tidak terpasang). Pasang Blender atau jalankan di mesin yang punya; gunakan --dry-run untuk melihat perintah." >&2
  exit 2
fi
blender --version | head -1
[ -f "$BLEND" ] || { echo "berkas tidak ada: $BLEND" >&2; exit 2; }
exec "${CMD[@]}"
