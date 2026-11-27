#!/bin/bash
# Periksa alat yang dipakai model untuk melihat, mendengar, dan membangun video.
# Dijalankan sekali saat skill-development baru dipasang di sebuah mesin (atau saat sebuah alat gagal).
# Hasilnya ditulis ke ALAT (bawaan ~/.config/skill-development/alat.md): sesi berikutnya cukup membaca file itu.
#   ./tools/doctor.sh            periksa alat + pemasangan skill; tulis alat.md; exit 1 bila ada alat inti yang kurang
#   ./tools/doctor.sh --fix      jalankan tools/sync.sh (pasang skill ke akun) lalu periksa ulang
#   ./tools/doctor.sh --repo     tambah cek pemeliharaan repo (PETA, cookbook, NEGATIF, sumber, font)
# Folder akun diambil dari CLAUDE_CONFIG_DIR, bawaan ~/.claude.
REPO="$(cd "$(dirname "$0")/.." && pwd)"
CFG="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"; DEST="$CFG/skills"
ALAT="${SD_ALAT:-${XDG_CONFIG_HOME:-$HOME/.config}/skill-development/alat.md}"
fail=0; warn=0; baris=()
bad()  { echo "KURANG $*"; fail=1; }
note() { echo "AWAS   $*"; warn=1; }
ok()   { echo "OK     $*"; }
catat() { baris+=("| $1 | $2 | $3 |"); }   # kemampuan | status | cara pakai / cara pasang

mode="${1:-}"
if [ "$mode" = "--fix" ]; then "$REPO/tools/sync.sh" || exit 1; echo; exec "$0"; fi

echo "== Alat (indera model dan alat bangun) =="

# Python yang dipakai skrip repo: cari satu yang punya Playwright + PIL + numpy.
PY=""
for c in "${MG_PY:-}" "$HOME/work/mg-venv/bin/python" python3 /usr/bin/python3; do
  [ -n "$c" ] && command -v "$c" >/dev/null 2>&1 || continue
  "$c" -c 'import numpy, PIL, playwright' >/dev/null 2>&1 && { PY="$c"; break; }
done
punya() { [ -n "$PY" ] && "$PY" -c "import $1" >/dev/null 2>&1; }
bin_di() { command -v "$1" 2>/dev/null || { [ -n "$PY" ] && ls "$(dirname "$PY")/$1" 2>/dev/null; }; }

# 1. Render frame (melihat hasil sendiri): board.py, lihat.py, jelajah_gaya.py
if [ -n "$PY" ] && "$PY" -c 'from playwright.sync_api import sync_playwright as s
with s() as p: p.chromium.launch().close()' >/dev/null 2>&1; then
  ok "render frame: $PY (Playwright + Chromium)"
  catat "Render frame, lihat per lapis" "siap" "\`$PY claude/motion-graphic/scripts/lihat.py\`, \`scripts/storyboard/board.py\`"
elif [ -n "$PY" ]; then
  bad "render frame: Playwright ada, Chromium belum ($PY -m playwright install chromium)"
  catat "Render frame, lihat per lapis" "KURANG" "\`$PY -m playwright install chromium\`"
else
  bad "render frame: tidak ada Python dengan numpy + PIL + playwright (python3 -m venv ~/work/mg-venv && ~/work/mg-venv/bin/pip install numpy pillow playwright && ~/work/mg-venv/bin/python -m playwright install chromium)"
  catat "Render frame, lihat per lapis" "KURANG" "buat venv dengan numpy, pillow, playwright; lalu \`playwright install chromium\`"
fi

# 2. Pemecah video (membedah frame visual)
if command -v ffmpeg >/dev/null && command -v ffprobe >/dev/null; then
  ok "pemecah video: ffmpeg + ffprobe"
  catat "Pecah video jadi frame" "siap" "\`ffmpeg\`, \`ffprobe\`; \`scripts/ref_spec.py <video>\` mengekstrak still per adegan"
else bad "pemecah video: ffmpeg/ffprobe tidak ada (sudo apt install ffmpeg / brew install ffmpeg)"
  catat "Pecah video jadi frame" "KURANG" "pasang ffmpeg"; fi

# 3. Analisa gerak (membedah frame pergerakan)
if [ -n "$PY" ] && command -v ffmpeg >/dev/null; then
  extra=""; punya cv2 && extra=" + OpenCV"
  ok "analisa gerak: ref_spec.py, banding.py ($PY$extra)"
  catat "Analisa gerak dan ukuran frame" "siap" "\`$PY claude/motion-graphic/scripts/ref_spec.py <video atau folder>\`; frame rapat: \`ffmpeg -i v.mp4 -vf fps=10 f_%04d.jpg\`"
else bad "analisa gerak: butuh Python di atas + ffmpeg"
  catat "Analisa gerak dan ukuran frame" "KURANG" "lengkapi butir 1 dan 2"; fi

# 4. Dengar (audio: musik, SFX, level, ritme)
E="$(bin_di earshot)"
if [ -n "$E" ]; then ok "dengar: earshot ($E)"
  catat "Dengar audio (musik, SFX, level, sinkron)" "siap" "\`$E describe / timeline / sheet <file>\` (\`$E --help\`)"
else bad "dengar: earshot tidak terpasang (pip install earshot di venv yang sama)"
  catat "Dengar audio (musik, SFX, level, sinkron)" "KURANG" "pasang earshot"; fi

# 5. Transkrip (narasi kata per kata)
T=""
if punya faster_whisper; then T="modul Python faster_whisper di $PY"
elif W="$(bin_di whisper-cli)" && [ -n "$W" ]; then T="$W"
elif W="$(bin_di whisper)" && [ -n "$W" ]; then T="$W"; fi
if [ -n "$T" ]; then ok "transkrip: $T"
  catat "Transkrip narasi" "siap" "$T; simpan kata + stempel waktu (words.json)"
else bad "transkrip: tidak ada Whisper (pip install faster-whisper di venv yang sama)"
  catat "Transkrip narasi" "KURANG" "pasang faster-whisper"; fi

# 6. Remotion (membangun dan merender video)
if command -v node >/dev/null && command -v npx >/dev/null; then
  nv="$(node -v 2>/dev/null)"; mj="${nv#v}"; mj="${mj%%.*}"
  if [ "${mj:-0}" -ge 18 ]; then ok "Remotion: node $nv + npx (toolkit: claude/motion-graphic/toolkit/mulai.sh)"
    catat "Bangun dan render video (Remotion)" "siap" "\`claude/motion-graphic/toolkit/mulai.sh\`, \`scripts/juri/render.sh <proyek> draft\`"
  else bad "Remotion: node $nv terlalu lama (butuh ≥ 18)"; catat "Bangun dan render video (Remotion)" "KURANG" "pasang Node ≥ 18"; fi
else bad "Remotion: node/npx tidak ada (pasang Node ≥ 18)"
  catat "Bangun dan render video (Remotion)" "KURANG" "pasang Node ≥ 18"; fi
nrem=$(ls -d "$DEST"/remotion-*/ 2>/dev/null | wc -l | tr -d ' ')
[ "$nrem" -ge 5 ] && ok "skill Remotion: $nrem" || note "skill Remotion resmi belum terpasang di akun ini ($nrem)"

# Alat tambahan (tidak menghentikan apa pun)
if punya soundfile; then ok "ukur audio: numpy + soundfile"; catat "Ukur audio (level, potongan VO)" "siap" "\`$PY claude/motion-graphic/scripts/audio/…\`"
else note "ukur audio: soundfile tidak ada (pip install soundfile)"; catat "Ukur audio (level, potongan VO)" "belum" "pip install soundfile"; fi
D="$(bin_di demucs)"; [ -n "$D" ] && { ok "pisah stem: demucs"; catat "Pisah stem musik" "siap" "\`$D\`"; } || { note "demucs tidak terpasang (pasang saat tugas audio)"; catat "Pisah stem musik" "belum" "pip install demucs"; }
command -v tesseract >/dev/null && { ok "baca teks di frame: tesseract"; catat "Baca teks di frame (OCR)" "siap" "\`tesseract\`, \`scripts/juri/teks_cek.py\`"; } || { note "tesseract tidak terpasang (sudo apt install tesseract-ocr)"; catat "Baca teks di frame (OCR)" "belum" "pasang tesseract-ocr"; }
[ -d "$HOME/fonts-lokal" ] && ok "font lokal berlisensi ada (~/fonts-lokal)" || note "~/fonts-lokal tidak ada: font berlisensi diganti padanan (fonts/README.md §B)"

RP="${RENDER_PROFILE:-$HOME/work/render-profile.json}"
if [ -f "$RP" ] && python3 -c 'import json,socket,sys;sys.exit(json.load(open(sys.argv[1])).get("host")!=socket.gethostname())' "$RP" 2>/dev/null; then
  ok "profil render mesin ini ada ($RP)"
elif command -v npx >/dev/null; then
  note "mesin ini belum dibenchmark: sesi video pertama menjalankan tools/bench-render/bench.sh sekali (orkestrasi.md)"
fi

echo; echo "== Pemasangan skill =="
echo "Akun Claude Code: $CFG"
if git -C "$REPO" fetch -q origin main 2>/dev/null; then
  behind=$(git -C "$REPO" rev-list --count HEAD..origin/main)
  [ "$behind" -eq 0 ] && ok "repo terbaru" || note "repo tertinggal $behind commit dari origin/main (git pull)"
else note "tidak bisa fetch origin; status repo tidak dicek"; fi
sk=0
for d in "$REPO"/claude/*/; do n=$(basename "$d")
  if [ -L "$DEST/$n" ] && [ "$(readlink "$DEST/$n")" = "${d%/}" ]; then :
  elif [ -e "$DEST/$n" ]; then note "skill $n terpasang sebagai salinan, bukan symlink ke repo (membeku)"; sk=1
  else note "skill $n tidak terpasang"; sk=1; fi
done
[ "$sk" -eq 0 ] && ok "skill claude/* terpasang sebagai symlink" || echo "       (./tools/doctor.sh --fix memasangnya; atau baca SKILL.md langsung dari repo)"

if [ "$mode" = "--repo" ]; then
  echo; echo "== Pemeliharaan repo =="
  python3 "$REPO/tools/peta.py" --check >/dev/null 2>&1 && ok "PETA.md terbaru" || bad "PETA.md basi (python3 tools/peta.py)"
  python3 "$REPO/tools/cookbook.py" cek >/dev/null 2>&1 && ok "cookbook valid" || bad "cookbook tidak valid (python3 tools/cookbook.py cek)"
  python3 "$REPO/tools/sync_lantai.py" --check >/dev/null 2>&1 && ok "MIGRASI-LANTAI.md memetakan semua ID" || bad "ID LANTAI tidak cocok (python3 tools/sync_lantai.py)"
  python3 "$REPO/tools/sync_negatif.py" --check >/dev/null 2>&1 && ok "daftar NEGATIF sama di _bersama dan SKILL.md" || bad "daftar NEGATIF beda (python3 tools/sync_negatif.py --tulis)"
  python3 "$REPO/tools/sumber_cek.py" >/dev/null 2>&1 && ok "file instruksi tanpa tanda sumber" || bad "tanda sumber di file instruksi (python3 tools/sumber_cek.py)"
  nf=$(ls "$REPO"/claude/motion-graphic/fonts/*/*.woff2 2>/dev/null | wc -l | tr -d ' ')
  [ "$nf" -ge 200 ] && ok "font repo: $nf file" || bad "folder font repo tidak lengkap ($nf file)"
  for d in "$REPO"/archive/*/; do n=$(basename "$d"); [ "$n" = riwayat ] && continue
    [ -e "$DEST/$n" ] && bad "skill arsip masih aktif: $n"; done
fi

mkdir -p "$(dirname "$ALAT")" 2>/dev/null && {
  echo "# Alat skill-development di mesin ini"
  echo
  echo "Ditulis \`tools/doctor.sh\` pada $(date +%F) di $(hostname). Baca ini di awal kerja; jalankan ulang doctor hanya bila sebuah alat gagal atau baris berstatus KURANG."
  echo
  echo "Python skrip repo: \`${PY:-belum ada}\`"
  echo
  echo "| Kemampuan | Status | Cara pakai / cara pasang |"
  echo "|---|---|---|"
  printf '%s\n' "${baris[@]}"
} > "$ALAT" 2>/dev/null && echo && echo "Daftar alat ditulis ke $ALAT"

echo
if [ "$fail" -ne 0 ]; then
  echo "Ada alat inti yang KURANG. Pasang dengan perintah di atas (atau sebut ke pemilik mesin) sebelum menganalisis atau merender."
  exit 1
fi
[ "$warn" -ne 0 ] && echo "Siap, dengan catatan AWAS di atas." || echo "Siap."
