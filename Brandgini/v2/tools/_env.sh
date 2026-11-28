# _env.sh · di-source oleh tools Soalnya Gini. Menemukan skill-development (lapisan otak) dan Python yang dipakai.
# Tidak menyalin isi skill-development: semua gerbang dipanggil dari lokasinya.
#   SKILLDEV  akar repo skill-development (default: ~/work/skill-development di PC, ~/wonder/repos/skill-development di Mac)
#   MG        $SKILLDEV/claude/motion-graphic/scripts
#   PY        Python ber-numpy (+ cv2/soundfile bila ada): $PYTHON > ~/work/mg-venv/bin/python > python3
if [ -z "${SKILLDEV:-}" ]; then
  for c in "$HOME/work/skill-development" "$HOME/wonder/repos/skill-development"; do
    [ -d "$c/claude/motion-graphic/scripts" ] && { SKILLDEV="$c"; break; }
  done
fi
MG="${SKILLDEV:-/tidak-ditemukan}/claude/motion-graphic/scripts"
SG_TOOLS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SG_ROOT="$(cd "$SG_TOOLS/.." && pwd)"
if [ -z "${PY:-}" ]; then
  for c in "${PYTHON:-}" "$HOME/work/mg-venv/bin/python" python3; do
    [ -n "$c" ] && command -v "$c" >/dev/null 2>&1 && "$c" -c 'import numpy' >/dev/null 2>&1 && { PY="$c"; break; }
  done
fi
# butuh <path relatif MG> ... : gagal keras (exit 2) bila gerbang skill-development tidak ada. Jangan diganti salinan lokal.
butuh() {
  local f; for f in "$@"; do
    [ -e "$MG/$f" ] || { echo "GAGAL-ALAT: $MG/$f tidak ada. skill-development di '${SKILLDEV:-?}' belum memuat alat ini (git pull dulu); gerbang tidak boleh dilewati." >&2; exit 2; }
  done
}
