#!/bin/bash
# Cek apakah Claude Code di mesin ini memuat skill-development dengan benar. Dijalankan di "Awal sesi" (AGENTS.md).
#   ./tools/doctor.sh            cek saja; exit 1 bila ada yang perlu diperbaiki
#   ./tools/doctor.sh --fix      jalankan tools/sync.sh lalu cek ulang
# Folder akun diambil dari CLAUDE_CONFIG_DIR (claude2 di PC server mengisinya otomatis), bawaan ~/.claude.
REPO="$(cd "$(dirname "$0")/.." && pwd)"
CFG="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"; DEST="$CFG/skills"
fail=0; warn=0
bad()  { echo "GAGAL  $*"; fail=1; }
note() { echo "AWAS   $*"; warn=1; }
ok()   { echo "OK     $*"; }

if [ "${1:-}" = "--fix" ]; then "$REPO/tools/sync.sh" || exit 1; echo; exec "$0"; fi

echo "Akun Claude Code: $CFG"
if git -C "$REPO" fetch -q origin main 2>/dev/null; then
  behind=$(git -C "$REPO" rev-list --count HEAD..origin/main)
  [ "$behind" -eq 0 ] && ok "repo terbaru" || bad "repo tertinggal $behind commit dari origin/main (git pull)"
else note "tidak bisa fetch origin; status repo tidak dicek"; fi

for d in "$REPO"/claude/*/; do n=$(basename "$d")
  if [ -L "$DEST/$n" ] && [ "$(readlink "$DEST/$n")" = "${d%/}" ]; then :
  elif [ -e "$DEST/$n" ]; then bad "skill $n terpasang sebagai salinan, bukan symlink ke repo (membeku)"
  else bad "skill $n tidak terpasang"; fi
done
[ "$fail" -eq 0 ] && ok "skill claude/* terpasang sebagai symlink"

nrem=$(ls -d "$DEST"/remotion-*/ 2>/dev/null | wc -l | tr -d ' ')
[ "$nrem" -ge 5 ] && ok "skill Remotion: $nrem" || bad "skill Remotion resmi tidak terpasang ($nrem)"

for d in "$REPO"/archive/*/; do n=$(basename "$d")
  [ -e "$DEST/$n" ] && bad "skill arsip masih aktif: $n (sudah digabung ke motion-graphic)"
  grep -qi -E "video|motion" "$d/SKILL.md" 2>/dev/null || continue   # hanya skill arsip video yang bersaing dengan motion-graphic
  for s in "$DEST"/synced/*/; do [ -e "$s$n" ] && note "pustaka akun claude.ai masih memuat skill arsip: $n -> hapus di claude.ai › Settings › Skills"; done
done
for s in "$DEST"/synced/*/; do for n in motion-graphic irfan-creative-workflow script-workshop; do
  [ -e "$s$n" ] && note "pustaka akun claude.ai memuat salinan lama $n; salinan repo (symlink) yang berlaku di Claude Code, salinan akun dipakai claude.ai web"
done; done

E="$(command -v earshot || ls "$HOME"/work/mg-venv/bin/earshot 2>/dev/null)"
if [ -n "$E" ]; then
  "$E" doctor 2>/dev/null | grep -q '^problems: \[\]' && ok "earshot siap ($E)" || note "earshot doctor melaporkan masalah ($E doctor)"
else note "earshot tidak terpasang: wajib untuk pekerjaan video (gerbang DENGAR, three-segment-gate.md)"; fi
D="$(command -v demucs || ls "$HOME"/work/mg-venv/bin/demucs 2>/dev/null)"
if [ -n "$D" ]; then ok "demucs siap ($D)"
else note "demucs tidak terpasang: dipakai audio/ears.py untuk menilai musik dari stem (audio.md §14.0B); pasang saat tugas audio"; fi

ENTRY="${ENTRY_DIR:-$HOME/work}"
if [ -d "$ENTRY" ]; then
  grep -q "skill-development/AGENTS.md" "$ENTRY/CLAUDE.md" 2>/dev/null && ok "folder masuk remote $ENTRY merujuk skill-development" \
    || bad "folder masuk remote $ENTRY: CLAUDE.md tidak merujuk skill-development (sesi remote tidak membaca aturan video)"
fi
echo
if [ "$fail" -ne 0 ]; then
  echo "PERBAIKI: minta persetujuan Irfan, lalu jalankan  ./tools/doctor.sh --fix  (memasang skill dari repo ini)."
  echo "Skill yang baru dipasang mungkin belum masuk daftar sesi ini: baca SKILL.md-nya langsung dari repo (mis. claude/motion-graphic/SKILL.md)."
  exit 1
fi
[ "$warn" -ne 0 ] && echo "Siap, dengan catatan AWAS di atas." || echo "Siap."
