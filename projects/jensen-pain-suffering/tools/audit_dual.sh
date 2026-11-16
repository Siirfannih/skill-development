#!/bin/bash
# Audit frame per potongan oleh DUA model berbeda, paralel, blind (orkestrasi.md §4):
#   Gemini lewat `agy`  -> VERDICT_gemini.md      ChatGPT lewat `codex exec -i` -> VERDICT_gpt.md
# Pakai: audit_dual.sh <qc/frame_audit> [cNN ...]   (tanpa daftar = semua potongan)
set -u
FA="$(cd "$1" && pwd)"; shift
TPL=/home/irfan/work/skill-development/claude/motion-graphic/templates/roles/pemeriksa-frame.md
KONTEKS="${KONTEKS:-}"
chunks=("$@"); [ ${#chunks[@]} -eq 0 ] && chunks=($(cd "$FA" && ls -d c*/ | tr -d /))
prompt_for() {
  local C="$1"
  printf '%s\n\n%s\n\nPotongan: %s. Lampiran: semua s*.jpg (1 lembar = 1 detik = 30 frame, kiri->kanan atas->bawah, strip audio biru suara/hijau musik/oranye SFX, bingkai merah = tanda otomatis) dan INFO.md berikut:\n\n%s\n\nKeluaran WAJIB: blok JSON {"temuan":[{"detik":..,"frame":..,"jenis":"..","terlihat":"..","usul":".."}],"putusan":"LULUS|GAGAL"} lalu satu baris terakhir persis "PUTUSAN: LULUS" atau "PUTUSAN: GAGAL". Temuan tanpa nomor frame tidak dihitung.' \
    "$(sed -n '/^> Kamu/,/^> 4\./p' "$TPL" | sed 's/^> //')" "$KONTEKS" "$C" "$(cat "$FA/$C/INFO.md")"
}
for C in "${chunks[@]}"; do
  D="$FA/$C"; imgs=$(ls "$D"/s*.jpg)
  P="$(prompt_for "$C")"
  ( timeout 900 agy -p "JANGAN menjalankan perintah shell apa pun. Baca setiap gambar langsung dengan alat baca file."$'\n\n'"$P"$'\n\nGambar (buka semuanya):\n'"$imgs" --add-dir "$D" --print-timeout 840s --output-format text --dangerously-skip-permissions > "$D/VERDICT_gemini.md" 2> "$D/.gemini.err"; echo "gemini $C exit $?" ) &
  args=(); for i in $imgs; do args+=(-i "$i"); done
  [ -n "${HANYA_GEMINI:-}" ] || ( timeout 900 codex exec --skip-git-repo-check "${args[@]}" -- "$P" < /dev/null > "$D/.gpt.raw" 2> "$D/.gpt.err"; tail -n 60 "$D/.gpt.raw" > "$D/VERDICT_gpt.md"; echo "gpt $C exit $?" ) &
done
wait
for C in "${chunks[@]}"; do printf '%s  gemini: %s  gpt: %s\n' "$C" "$(grep -o 'PUTUSAN: [A-Z]*' "$FA/$C/VERDICT_gemini.md" | tail -1)" "$(grep -o 'PUTUSAN: [A-Z]*' "$FA/$C/VERDICT_gpt.md" | tail -1)"; done
