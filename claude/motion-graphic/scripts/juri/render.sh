#!/bin/bash
# Satu pintu render Remotion: still dulu, draft kecil, render penuh paling akhir (LANTAI F26).
#
#   render.sh <proyek> still <Comp> <label:frame> [<label:frame> ...]   still per beat  -> <proyek>/qc/stills/<label>.png (skala 0,5)
#   render.sh <proyek> draft <Comp> [awal-akhir]                         draft gerak     -> <proyek>/qc/draft[_awal-akhir].mp4 (skala 0,5, tanpa audio)
#   render.sh <proyek> final <Comp> <keluaran.mp4> [awal-akhir]          render penuh    -> hanya bila gerbang di bawah lulus
#
# <proyek> berisi RESEP.md dan folder remotion/ (src/index.ts). Bundle dibuat sekali dan dipakai ulang sampai src berubah.
# Gerbang `final` (semua harus benar):
#   1. RESEP.md lulus resep_check.py
#   2. qc/stills/ berisi still yang lebih baru daripada perubahan terakhir di remotion/src
#   3. qc/sanding.jpg (sandingkan.py) lebih baru daripada still itu
#   4. qc/JURI.md lebih baru daripada sanding dan baris terakhirnya "PUTUSAN: LULUS"
# Revisi satu adegan: perbarui still adegan itu, sanding, JURI, lalu `final` dengan rentang frame adegan itu saja
# dan sambung dengan ffmpeg; jangan render ulang seluruh video.
# Lingkungan: KONKURENSI (default 4; ukur sekali dengan `npx remotion benchmark`), ENTRY (default src/index.ts).
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
[ $# -ge 3 ] || { sed -n '2,17p' "$0"; exit 1; }
P="$(cd "$1" && pwd)"; MODE="$2"; COMP="$3"; shift 3
R="$P/remotion"; QC="$P/qc"; ENTRY="${ENTRY:-src/index.ts}"; K="${KONKURENSI:-4}"
[ -d "$R/src" ] || { echo "GAGAL: $R/src tidak ada"; exit 1; }
mkdir -p "$QC/stills"
newest_src() { find "$R/src" "$R/public" -type f -printf '%T@\n' 2>/dev/null | sort -n | tail -1; }
mtime() { stat -c %Y "$1" 2>/dev/null || echo 0; }
bundle() {
  local stamp="$QC/.bundle_stamp"
  if [ ! -d "$QC/.bundle" ] || [ ! -f "$stamp" ] || [ "$(printf '%.0f' "$(newest_src)")" -gt "$(mtime "$stamp")" ]; then
    echo "bundle: membuat ulang (src berubah)"; (cd "$R" && npx remotion bundle "$ENTRY" --out-dir="$QC/.bundle" >"$QC/bundle.log" 2>&1) || { tail -20 "$QC/bundle.log"; exit 1; }
    touch "$stamp"
  else echo "bundle: pakai ulang"; fi
}
case "$MODE" in
  still)
    [ $# -ge 1 ] || { echo "beri minimal satu <label:frame>"; exit 1; }
    bundle
    for lf in "$@"; do l="${lf%%:*}"; f="${lf##*:}"
      (cd "$R" && npx remotion still "$QC/.bundle" "$COMP" "$QC/stills/$l.png" --frame="$f" --scale=0.5 >/dev/null 2>>"$QC/still.log") \
        && echo "still $l (frame $f)" || echo "GAGAL still $l (lihat $QC/still.log)"
    done
    echo "Lanjut: teks_cek.py $QC/stills  ->  sandingkan.py $QC/stills <sheet kiblat> $QC/sanding.jpg  ->  isi $QC/JURI.md" ;;
  draft)
    bundle; RANGE="${1:-}"; OUT="$QC/draft${RANGE:+_$RANGE}.mp4"
    (cd "$R" && npx remotion render "$QC/.bundle" "$COMP" "$OUT" --scale=0.5 --crf=28 --muted --concurrency="$K" ${RANGE:+--frames=$RANGE} --log=error)
    echo "draft $OUT (skala 0,5; hanya untuk menilai gerak dan kamera)" ;;
  final)
    [ $# -ge 1 ] || { echo "beri nama file keluaran"; exit 1; }
    OUT="$1"; RANGE="${2:-}"; gagal=0
    python3 "$HERE/resep_check.py" "$P/RESEP.md" || gagal=1
    ns="$(printf '%.0f' "$(newest_src)")"; st="$(find "$QC/stills" -name '*.png' -printf '%T@\n' 2>/dev/null | sort -n | tail -1)"; st="$(printf '%.0f' "${st:-0}")"
    [ "$st" -ge "$ns" ] && [ "$st" -gt 0 ] || { echo "GAGAL gerbang: still di qc/stills lebih lama daripada perubahan src (atau belum ada). Jalankan 'still' dulu."; gagal=1; }
    [ "$(mtime "$QC/sanding.jpg")" -ge "$st" ] && [ -f "$QC/sanding.jpg" ] || { echo "GAGAL gerbang: qc/sanding.jpg belum dibuat dari still terbaru (sandingkan.py)."; gagal=1; }
    if [ -f "$QC/JURI.md" ] && [ "$(mtime "$QC/JURI.md")" -ge "$(mtime "$QC/sanding.jpg")" ] && tail -n 3 "$QC/JURI.md" | grep -q '^PUTUSAN: LULUS'; then :; else
      echo "GAGAL gerbang: qc/JURI.md belum berakhir 'PUTUSAN: LULUS' untuk sanding terbaru."; gagal=1; fi
    [ "$gagal" = 0 ] || { echo "Render penuh ditolak."; exit 1; }
    bundle; n=$(( $(grep -c '^final' "$QC/render.log" 2>/dev/null || true) + 1 ))
    echo "final $(date '+%F %T') ke-$n ${RANGE:-penuh} -> $OUT" >> "$QC/render.log"
    [ "$n" -le 2 ] || echo "PERINGATAN: ini render penuh ke-$n untuk video ini. Revisi cukup rentang yang berubah (argumen awal-akhir)."
    (cd "$R" && npx remotion render "$QC/.bundle" "$COMP" "$OUT" --concurrency="$K" ${RANGE:+--frames=$RANGE} --log=error)
    echo "final $OUT" ;;
  *) echo "mode tidak dikenal: $MODE (still | draft | final)"; exit 1 ;;
esac
