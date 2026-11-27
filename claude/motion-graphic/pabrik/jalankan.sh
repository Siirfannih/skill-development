#!/usr/bin/env bash
# jalankan.sh <butir>...  : fase 1 -> 4 berurutan per komponen.
#   butir = kartu:teknik:Nama:kategori[:klip:dari:sampai]
#   contoh: ./jalankan.sh 63:T1:WorldStage:gerak_kamera:$HOME/work/pustaka-video/unggahan/Motiongrapich.mp4:12.4:16.0 46:T1:ScaleLadder:tipografi
# Keluar 0 bila semua lulus, 1 bila ada yang ditolak (pabrik tetap lanjut ke butir berikutnya).
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
PY="${PY:-$HOME/work/mg-venv/bin/python}"
export PATH="$HOME/.local/bin:$HOME/.local/opt/node-v22.20.0-linux-x64/bin:$PATH"
[ $# -gt 0 ] || { sed -n 2,6p "$0"; exit 2; }
RC=0
for B in "$@"; do
  IFS=: read -r K T N C V D S <<<"$B"
  echo "=== $N (kartu $K.$T) ==="
  ARGS=("$K" --teknik "${T:-T1}" --komponen "$N" --kategori "$C")
  [ -n "${V:-}" ] && ARGS+=(--klip "$V" --dari "$D" --sampai "$S")
  "$PY" "$HERE/ekstrak.py" "${ARGS[@]}" || { echo "ekstrak gagal: $B"; RC=1; continue; }
  SPEC="spec/$K-${T:-T1}.json"
  "$PY" "$HERE/sintesis.py" "$HERE/$SPEC" --nama "$N" || { echo "sintesis gagal: $B (butir dihentikan, uji.py tidak dijalankan)"; RC=1; continue; }
  "$PY" "$HERE/uji.py" "$N" --spec "$SPEC" || RC=1
  "$PY" "$HERE/daftar.py" "$N" || RC=1
done
exit $RC
