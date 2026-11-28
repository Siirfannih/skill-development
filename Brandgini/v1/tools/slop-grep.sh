#!/usr/bin/env bash
# Deterministic Anti-Slop & Policy Gate untuk script.md dan Scene.tsx
set -euo pipefail

TARGET="${1:-}"
if [[ -z "$TARGET" || ! -f "$TARGET" ]]; then
  echo "Usage: bash tools/slop-grep.sh <file>"
  exit 2
fi

FAIL=0

check_pattern() {
  local label="$1"
  local pattern="$2"
  if grep -Ein "$pattern" "$TARGET" >/dev/null 2>&1; then
    echo "[FAIL] $label terdeteksi di $TARGET:"
    grep -Ein "$pattern" "$TARGET"
    FAIL=1
  fi
}

# 1. Klise pembuka/penutup AI-slop
check_pattern "Klise AI-slop" "(simak sampai habis|jangan lupa like|subscribe ya|halo guys|selamat datang di channel|pernahkah kamu bertanya-tanya|tahukah kamu)"

# 2. Bahasa kaku non-conversational
check_pattern "Bahasa terlalu kaku" "(oleh karena itu|sebagai berikut|di bawah ini adalah|dapat disimpulkan)"

# 3. Larangan keras SFX kayu
check_pattern "SFX Kayu terlarang" "(wood[_-]?sfx|wood[_-]?knock|kayu|marimba|xylophone|plank)"

# 4. Placeholder tertinggal
check_pattern "Placeholder belum diisi" "(\[TBD\]|\[INSERT|TODO:|FIXME:)"

if [[ "$FAIL" -ne 0 ]]; then
  echo "SLOP-GATE: GAGAL. Perbaiki temuan di atas sebelum lanjut."
  exit 1
fi

echo "SLOP-GATE: LOLOS ($TARGET)"
