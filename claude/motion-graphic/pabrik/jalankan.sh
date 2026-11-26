#!/usr/bin/env bash
# jalankan.sh spec/<id>.json ... : fase 2 -> 4 berurutan per primitif (spec v4 sudah ditulis dari data ukur + arsip).
#   contoh: ./jalankan.sh spec/tipografi-unit-masuk-meluncur.json
# Model sintesis: opus untuk kategori kamera, sonnet lainnya. Keluar 1 bila ada yang ditolak.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
PY="${PY:-$HOME/work/mg-venv/bin/python}"
export PATH="$HOME/.local/bin:$HOME/.local/opt/node-v22.20.0-linux-x64/bin:$PATH"
[ $# -gt 0 ] || { sed -n 2,4p "$0"; exit 2; }
RC=0
for S in "$@"; do
  echo "=== $S ==="
  M=sonnet; grep -q '"kategori": "kamera"' "$S" && M=opus
  "$PY" "$HERE/sintesis.py" "$S" --model "$M" || echo "sintesis $S: galat (uji tetap mencatat)"
  "$PY" "$HERE/uji.py" "$S" --model "$M" || RC=1
  "$PY" "$HERE/daftar.py" "$S" || RC=1
done
exit $RC
