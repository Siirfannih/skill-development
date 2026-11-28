#!/usr/bin/env bash
# slop-grep.sh v2 · pemindai slop yang BISA mekanis, untuk teks (naskah/caption) dan kode visual (Remotion src, cue sheet).
#   bash tools/slop-grep.sh <file atau folder> [...]
# Keluar: 0 bersih · 1 ada GAGAL · 2 salah pakai. PERINGATAN tidak menggagalkan, tapi wajib dijawab di qc-report.
#
# Yang TIDAK diulang di sini karena sudah ada gerbangnya di skill-development (dipanggil di skill 06/07):
#   Easing preset, stagger rata, blur-in      -> scripts/juri/motion_lint.py
#   hex/font/ukuran literal di file adegan    -> scripts/juri/tema_cek.py
#   KT keluar zona aman, menutup wajah, PITA  -> scripts/gate/cek_komposisi.py (R1 render.sh)
#   lebih dari 2 keluarga warna aksen          -> scripts/palette_check.py (di render)
#   SFX spam / kepadatan                       -> scripts/gate/sfx_density.py
# Yang masih MANUAL (mata Sutradara + golden frame, skill 07): S-V2, S-V4, S-V8, S-V10, S-V13, S-V14, S-V24,
#   keseimbangan (Lantai C17), "terasa AI" secara umum. Kode S-xx = references/slop-catalog.md.
set -uo pipefail
export LC_ALL=C   # pola byte (emoji, em dash) dibaca per byte
[ $# -ge 1 ] || { sed -n 2,4p "$0"; exit 2; }
FAIL=0; WARN=0
hit() { # hit <GAGAL|PERINGATAN> <label> <pola ERE> <files...>
  local lvl="$1" label="$2" pat="$3"; shift 3
  [ $# -gt 0 ] || return 0
  local out; out=$(grep -EinH -- "$pat" "$@" 2>/dev/null | grep -v 'slop-ok:' | head -20)
  [ -z "$out" ] && return 0
  echo "[$lvl] $label"; echo "$out" | sed 's/^/    /'
  if [ "$lvl" = GAGAL ]; then FAIL=1; else WARN=1; fi
}
TEKS=(); KODE=(); CUE=()
for t in "$@"; do
  [ -e "$t" ] || { echo "tidak ada: $t"; exit 2; }
  while IFS= read -r f; do
    case "$f" in
      */node_modules/*|*/.bundle/*) ;;
      *.md|*.txt) TEKS+=("$f");;
      *.tsx|*.ts|*.jsx|*.js|*.css|*.html) KODE+=("$f");;
      *.json) CUE+=("$f");;
    esac
  done < <(if [ -d "$t" ]; then find "$t" -type f; else echo "$t"; fi)
done

# ---------- TEKS: naskah, caption, judul ----------
if [ ${#TEKS[@]} -gt 0 ]; then
  hit GAGAL "Klise pembuka/penutup (slop-catalog copy, plan §2.4)" \
    '(simak sampai habis|jangan lupa (like|subscribe|follow)|subscribe ya|halo guys|hai guys|selamat datang di channel|pernahkah kamu bertanya|tahukah kamu|di era (digital|modern) ini|tanpa basa-basi)' "${TEKS[@]}"
  hit GAGAL "Bahasa kaku artikel (skill 02)" '(oleh karena itu|sebagai berikut|di bawah ini adalah|dapat disimpulkan|merupakan salah satu|adapun)' "${TEKS[@]}"
  hit GAGAL "Kata slop promosi (anti-slop-design §1 Copy)" '\b(revolusioner|solusi terbaik|tanpa ribet|next-level|game.?changer|seamless|elevate|unlock|unleash|dijamin 100)' "${TEKS[@]}"
  hit GAGAL "Klaim mutlak kesehatan/keuangan (policy, plan §3 risiko)" '(pasti sembuh|dijamin (aman|untung|sembuh)|obat (ampuh|paling)|investasi (pasti|aman)|cuan pasti|bebas risiko)' "${TEKS[@]}"
  hit GAGAL "Placeholder tertinggal" '(\[TBD\]|\[INSERT|TODO:|FIXME:|lorem ipsum|<isi|XX+ ?(detik|kata))' "${TEKS[@]}"
  hit PERINGATAN "Tanda seru beruntun / huruf kapital semua di kalimat (plan §2.4)" '(!!|\?!|![[:space:]]*!)' "${TEKS[@]}"
  hit PERINGATAN "Em dash (anti-slop §1 Copy; judul memakai en dash '–')" '—' "${TEKS[@]}"
fi

# ---------- KODE: slop visual yang terlihat dari source ----------
if [ ${#KODE[@]} -gt 0 ]; then
  hit GAGAL "Latar radial gradient / blob (S-V21; Lantai C14)" 'radial-gradient|radialGradient' "${KODE[@]}"
  hit GAGAL "Glow/halo nol-offset (anti-slop §1; S-V7, Lantai C18b)" "(box-?shadow|textShadow|text-shadow)['\":[:space:]]*['\"]?0(px)? 0(px)? [0-9]|drop-shadow\\(0(px)? 0(px)? " "${KODE[@]}"
  hit GAGAL "Kaca/blur dekoratif (Apple Glass slop, Lantai C14)" 'backdrop-?filter|backdropFilter|backdrop-blur' "${KODE[@]}"
  hit GAGAL "Ungu/violet slop (anti-slop §1; plan §2.3 larangan gradasi ungu)" '#(8b5cf6|a855f7|6366f1|7c3aed|9333ea|c084fc|6e74dc|7e84e4|6369d1|9aa0ee)\b|(purple|violet|indigo|fuchsia)-[0-9]' "${KODE[@]}"
  hit GAGAL "Masuk dari scale(0) (anti-slop §4 Motion; plan §2.3 mulai >= 0,9)" 'scale\(0\)|scale:[[:space:]]*0[,}[:space:]]|\[0,[[:space:]]*1\][^;]*scale' "${KODE[@]}"
  hit GAGAL "Crossfade/fade sebagai transisi (S-V1, Lantai B13)" "@remotion/transitions/fade|\\bfade\\(\\)|crossfade|cross-fade" "${KODE[@]}"
  hit GAGAL "Render tidak deterministik (Math.random/Date di komposisi)" 'Math\.random\(|Date\.now\(|new Date\(' "${KODE[@]}"
  hit GAGAL "Emoji sebagai ikon (anti-slop §1 Icons)" $'\xF0\x9F[\x8C-\x9F]|\xE2[\x98-\x9E]' "${KODE[@]}"
  hit PERINGATAN "Gradien linear: wajib fungsi tertulis di RESEP (Lantai C18b)" 'linear-gradient|linearGradient' "${KODE[@]}"
  hit PERINGATAN "Monospace sebagai kostum 'teknis' (anti-slop §1 Type)" 'monospace|JetBrains|IBM Plex Mono|Courier' "${KODE[@]}"
  hit PERINGATAN "Vignette di latar terang (S-V18): cek still" 'vignette|Vignette' "${KODE[@]}"
fi

# ---------- CUE / aset: SFX terlarang ----------
ALL=("${KODE[@]+"${KODE[@]}"}" "${CUE[@]+"${CUE[@]}"}" "${TEKS[@]+"${TEKS[@]}"}")
if [ ${#ALL[@]} -gt 0 ]; then
  hit GAGAL "SFX kayu/thock/felt/koin/kartun/8-bit (Lantai E24; S-A5)" \
    '(wood|kayu|knock|plank|bamboo|marimba|xylophone|woodblock|thock|felt|coin|koin|cartoon|kartun|8.?bit|chiptune|footstep|langkah[_-]?kaki|rope.?creak)[^"]*\.(wav|mp3|ogg|m4a|flac)' "${ALL[@]}"
fi

[ "$WARN" = 1 ] && echo "SLOP-GREP: ada PERINGATAN (jawab di qc-report: alasan atau perbaiki)."
if [ "$FAIL" = 1 ]; then echo "SLOP-GREP: GAGAL"; exit 1; fi
echo "SLOP-GREP: LOLOS (${#TEKS[@]} teks, ${#KODE[@]} kode, ${#CUE[@]} json)"
