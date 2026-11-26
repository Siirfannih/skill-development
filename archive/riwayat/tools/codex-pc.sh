#!/bin/bash
# Menjalankan Codex (ChatGPT) di PC server untuk tugas dari orkestrator.
# Keputusanku: di PC, Codex berjalan penuh di terminal tanpa sandbox bubblewrap, karena bwrap di PC
# gagal ("bwrap: loopback: Failed RTM_NEWADDR: Operation not permitted") sehingga Codex tidak bisa membaca/menulis
# folder kerja. Batas kerja Codex ada di file TASK (FILE BOLEH / FILE JANGAN), dan pembuat tidak pernah memeriksa
# hasilnya sendiri (claude/motion-graphic/references/orkestrasi.md §1).
#
#   tools/codex-pc.sh <folder proyek> <handoff/TASK-xx.md> [-i lampiran ...]
set -euo pipefail
[ $# -ge 2 ] || { sed -n 2,8p "$0"; exit 1; }
DIR="$(cd "$1" && pwd)"; TASK="$2"; shift 2
[ -f "$TASK" ] || { echo "TASK tidak ada: $TASK"; exit 1; }
grep -q "FILE BOLEH" "$TASK" || { echo "TASK wajib memuat bagian FILE BOLEH / FILE JANGAN"; exit 1; }
exec codex exec --sandbox danger-full-access -C "$DIR" "$(cat "$TASK")" "$@" < /dev/null
