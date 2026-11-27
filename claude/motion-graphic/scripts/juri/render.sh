#!/bin/bash
# Satu pintu render Remotion: still dulu, draft kecil, render penuh paling akhir (LANTAI F26).
#
#   render.sh <proyek> still <Comp> <label:frame> [<label:frame> ...]   still per beat  -> <proyek>/qc/stills/<label>.png (skala 0,5)
#   render.sh <proyek> draft <Comp> [awal-akhir]                         draft gerak     -> <proyek>/qc/draft[_awal-akhir].mp4 (skala 0,5, tanpa audio)
#   render.sh <proyek> frames <Comp>                                      SEMUA frame     -> <proyek>/qc/frames/ (jpeg skala 0,5) untuk frame_audit.py
#   render.sh <proyek> final <Comp> <keluaran.mp4> [awal-akhir]          render penuh    -> hanya bila gerbang di bawah lulus
#   render.sh <proyek> lego lego/lego.json                               rakit lego      -> gerbang yang sama, lalu ffmpeg sekali
#                                                                        (scripts/lego/; jalur utama untuk video berfootage)
#
# <proyek> berisi RESEP.md dan folder remotion/ (src/index.ts). Bundle dibuat sekali dan dipakai ulang sampai src berubah.
# Gerbang `final` (temuan dicetak sebagai informasi dan render lanjut; KETAT=1 menolak bila ada yang gagal. Keluar keras hanya bila render mustahil:
#   src, Python audio, atau folder audio tidak ada):
#   0. audio/ORDER.json lulus audio_order.py check; bukti potongan sumber, jeda, palet SFX, dan urutan lapisan diuji ulang
#   1. RESEP.md lulus resep_check.py
#   2. SEMUA still di qc/stills/ lebih baru daripada perubahan terakhir di remotion/src (still paling lama yang dinilai)
#   3. qc/sanding.jpg (sandingkan.py) lebih baru daripada still itu
#   4. qc/JURI.md lebih baru daripada sanding dan baris terakhirnya "PUTUSAN: LULUS"
#   5. gaya, posisi, dan keseimbangan (Lantai C17) dinilai dengan mata di qc/JURI.md (cookbook/README.md §Juri 2); tanpa skor skrip
#   6. draft gerak sudah dilihat: qc/draft.mp4 (penuh) atau qc/draft_<awal-akhir>.mp4 (rentang yang sama) lebih baru daripada src
# 8. audit visual semua frame: qc/frame_audit/INDEX.md lebih baru daripada src dan setiap
#      potongan punya VERDICT.md berakhir 'PUTUSAN: LULUS' (Sutradara melihat frame tahan tiap detik; scripts/juri/frame_audit.py)
#  10. gerbang produksi (gerbang_produksi.sh), tiap butir berlaku bila filenya ada di proyek dan menolak render bila gagal:
#      data episode + aset.json lulus gate/cek_komposisi.py (WAJAH, INSET, TEPI, ASET; <proyek>/qc/ketat menambah tanda);
#      sfx_potong.json lulus audio/sfx_potong.py --laporan; stem vo/music/sfx lulus audio/audio_phone.py --gate
#   9. mode lego saja: lego/base_pts.py dan lego/cek_master.py lulus (pts dasar tanpa ganda; lapisan tampil di frame rencana)
#   7. setiap catatan Irfan berstatus Aktif di DECISIONS.md (R-NNN / D-NNN) disebut di qc/JURI.md dengan buktinya
#
# Revisi satu adegan: perbarui still adegan itu, sanding, JURI, lalu `final` dengan rentang frame adegan itu saja
# dan sambung dengan ffmpeg; jangan render ulang seluruh video.
# Menyambung rentang: filter concat + encode ulang (CRF 14) lalu audio utuh dipasang sekali; `-c copy` (concat demuxer /
# annexb) kehilangan 2–4 frame di sambungan (builder-trap-r2 v4). Cek jumlah frame = total rentang sebelum dikirim.
# Lingkungan: KONKURENSI (default 4; ukur sekali dengan `npx remotion benchmark`), ENTRY (default: isi file remotion/.entry bila ada,
#   selain itu src/index.ts), VARIAN (mis. A: gerbang audio memakai audio/order-A; tanpa VARIAN dan tanpa audio/ORDER.json,
#   satu-satunya folder audio/order-* yang dipakai).
# Penjaga proses: setiap `npx remotion` jalan di grup proses sendiri dengan batas waktu (RENDER_MAKS_DTK, default 2700, untuk bundle/frames/draft;
#   FINAL_MAKS_DTK, default 10800, untuk final: render final terlama yang tercatat 2248 dtk; STILL_MAKS_DTK, default 300; KILL_SETELAH_DTK, default 30);
#   habis waktu = seluruh grup dimatikan, keluar 124, ledger memuat "TIMEOUT <mode> <label>". INT/TERM mematikan grup itu.
#   Sinyal batal yang didukung: TERM (dan `tunggu.sh hentikan`); INT tidak terpasang bila render.sh dilatarbelakangkan dengan `cmd &`/`nohup`, jadi pemanggil latar memakai `setsid` + TERM. SIGKILL pada render.sh ditangani penjaga (anak mati, Chrome proyek disapu, temp dihapus).
#   Chrome dari Remotion berjalan di grup sendiri (detached) dan dimatikan oleh Remotion saat menerima TERM; anak tidak mewarisi fd 7/8.
#   still/draft/bundle memegang kunci proyek qc/.render.lock; frames/final juga (lebih dulu) selain kunci global; lego (ffmpeg saja) tanpa kunci, seperti sebelumnya. Sisa Chrome proyek ini disapu (path $R) sesudah render gagal; sisa lama diperingatkan.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
[ $# -ge 3 ] || { sed -n '2,17p' "$0"; exit 1; }
P="$(cd "$1" && pwd)"; MODE="$2"; COMP="$3"; shift 3
R="$P/remotion"; QC="$P/qc"
if [ -z "${ENTRY:-}" ]; then if [ -f "$R/.entry" ]; then ENTRY="$(tr -d '[:space:]' < "$R/.entry")"; else ENTRY="src/index.ts"; fi; fi
# Profil mesin dari tools/bench-render/bench.sh (sekali per mesin): opsi --gl dan konkurensi tercepat yang hasilnya sama.
# Dipakai hanya bila hostname cocok; variabel GL / KONKURENSI di lingkungan tetap menang.
PROFILE="${RENDER_PROFILE:-$HOME/work/render-profile.json}"; PGL=""; PK=""
if [ -f "$PROFILE" ]; then read -r PH PGL PK < <(python3 -c 'import json,sys;p=json.load(open(sys.argv[1]));print(p.get("host","-"),p.get("gl","default"),p.get("konkurensi",4))' "$PROFILE" 2>/dev/null || echo "- - -")
  [ "$PH" = "$(hostname)" ] || { PGL=""; PK=""; }; fi
K="${KONKURENSI:-${PK:-4}}"; GL="${GL:-${PGL:-default}}"; GLARG=""; [ "$GL" = default ] || GLARG="--gl=$GL"
# Ledger: setiap pemanggilan menulis satu baris JSON ke qc/jobs.jsonl (antre di kunci render, lama kerja, hasil, commit),
# supaya waktu antre, render, dan revisi bisa dipisah tanpa menebak (laporan investigasi 24 jam, 16 Nov).
T0=$(date +%s); ANTRE=0; ARGS="$(printf '%s ' "$@" | tr -d '"\\')"; CATATAN=""; CHILD_PID=""; PROJ_LOCKED=""; JOBTMP=""
ledger() {
  local rc=$? t1; t1=$(date +%s); mkdir -p "$QC"
  printf '{"mode":"%s","comp":"%s","arg":"%s","mulai":"%s","antre_dtk":%d,"kerja_dtk":%d,"rc":%d,"commit":"%s","host":"%s","konkurensi":%s,"gl":"%s"%s}\n' \
    "$MODE" "$COMP" "${ARGS% }" "$(date -d "@$T0" '+%F %T')" "$ANTRE" "$(( t1 - T0 - ANTRE ))" "$rc" \
    "$(git -C "$P" rev-parse --short HEAD 2>/dev/null || echo -)" "$(hostname)" "$K" "$GL" "${CATATAN:+,\"catatan\":\"$CATATAN\"}" >> "$QC/jobs.jsonl"
  [ -z "$JOBTMP" ] || rm -rf "$JOBTMP"
}
trap ledger EXIT
exec 7>&1  # stdout asli, supaya pesan TIMEOUT tidak ikut dialihkan ke log oleh pemanggil jalankan
RENDER_MAKS="${RENDER_MAKS_DTK:-2700}"; STILL_MAKS="${STILL_MAKS_DTK:-300}"; KILL_SETELAH="${KILL_SETELAH_DTK:-30}"
FINAL_MAKS="${FINAL_MAKS_DTK:-10800}"
# INT/TERM: matikan grup proses anak yang sedang jalan (TERM, 2 dtk, lalu KILL), baru keluar; trap EXIT di atas tetap menulis ledger.
mati() { local sig="$1"; trap '' INT TERM
  if [ -n "$CHILD_PID" ]; then kill -TERM -- "-$CHILD_PID" 2>/dev/null || true; sleep 2; kill -KILL -- "-$CHILD_PID" 2>/dev/null || true; sapu; fi
  exit $(( 128 + sig )); }
trap 'mati 2' INT; trap 'mati 15' TERM
# Proses milik render PROYEK INI saja: baris perintahnya memuat Chrome/compositor di $R/node_modules atau direktori temp job.
# Tidak pernah pencocokan nama global, jadi Chrome proyek lain dan sesi pemilik tidak tersentuh.
proses_proyek() { ps -eo pid=,args= 2>/dev/null | awk -v a="$R/node_modules/.remotion/" -v c="$R/node_modules/@remotion/compositor" -v b="${JOBTMP:-}" -v me="$$" \
  '$1!=me && $2!="awk" && (index($0,a) || index($0,c) || (b!="" && index($0,b))) {print $1}' || true; }
# Sapu: TERM, 2 dtk, lalu KILL, hanya untuk proses di atas. Dipanggil sesudah render gagal (mis. node di-SIGKILL/OOM, Chrome yatim ke PID 1).
sapu() { local p; p=$(proses_proyek | tr '\n' ' '); [ -n "${p// /}" ] || return 0
  kill -TERM $p 2>/dev/null || true; sleep 2; p=$(proses_proyek | tr '\n' ' '); [ -z "${p// /}" ] || kill -KILL $p 2>/dev/null || true; }
# Penjaga: hidup selama satu anak render jalan. Bila render.sh mati keras (tanpa trap), ia mematikan grup anak bila setpriv tidak ada,
# menunggu grup selesai (lalu KILL), menyapu Chrome proyek, dan menghapus temp job. Memegang kunci proyek (fd 8) sampai selesai.
hidup() { kill -0 "$1" 2>/dev/null || return 1; local st; st=$(sed -n 's/^State:[[:space:]]*\(.\).*/\1/p' "/proc/$1/status" 2>/dev/null); [ "$st" != Z ]; }
guarda() { local rpid="$1" g="$2" pd="$3" i
  while hidup "$rpid"; do sleep 1 8>&- 9>&-; done
  [ "$pd" != 0 ] || kill -TERM -- "-$g" 2>/dev/null || true
  for i in $(seq 1 $(( KILL_SETELAH + 5 ))); do kill -0 -- "-$g" 2>/dev/null || break; sleep 1 8>&- 9>&-; done
  kill -KILL -- "-$g" 2>/dev/null || true; sapu; [ -z "$JOBTMP" ] || rm -rf "$JOBTMP"; }
# Perintah berat jalan di sesi/grup sendiri dengan batas waktu: jalankan <maks_dtk> <label> <perintah …>. Habis waktu: grup mati, keluar 124.
jalankan() { local maks="$1" label="$2" rc=0 t; t=$(date +%s); shift 2
  # 7>&-: proses yang lolos dari grup (mis. Chrome yatim) tidak menahan stdout pemanggil. Kunci proyek (fd 8) dan global (fd 9) sengaja
  # diwarisi: selama ada proses render hidup, kunci tetap tertahan, juga bila render.sh sendiri di-SIGKILL (menunggu lebih aman daripada .bundle ganda).
  # Bila render.sh mati keras (SIGKILL), anak ikut mati: setpriv --pdeathsig TERM bila ada; penjaga di bawah selalu ada (tanpa setpriv ia yang mematikan grup).
  local pd=(); if command -v setpriv >/dev/null 2>&1 && setpriv --pdeathsig TERM true 2>/dev/null; then pd=(setpriv --pdeathsig TERM); fi
  ( cd "$R" && exec setsid "${pd[@]}" timeout --kill-after="$KILL_SETELAH" "$maks" "$@" 7>&- ) &
  CHILD_PID=$!; local jaga; guarda "$$" "$CHILD_PID" "${#pd[@]}" </dev/null >/dev/null 2>&1 7>&- & jaga=$!
  wait "$CHILD_PID" || rc=$?; CHILD_PID=""; kill "$jaga" 2>/dev/null || true; wait "$jaga" 2>/dev/null || true
  [ "$rc" = 0 ] || sapu
  if [ "$rc" = 124 ] || { [ "$rc" = 137 ] && [ $(( $(date +%s) - t )) -ge "$maks" ]; }; then
    CATATAN="TIMEOUT $MODE $label"; echo "$CATATAN setelah ${maks} dtk: proses dan anak-anaknya dihentikan (naikkan STILL_MAKS_DTK, RENDER_MAKS_DTK, atau FINAL_MAKS_DTK untuk final, bila memang selama itu)" >&7; exit 124
  fi
  case "$rc" in
    137|143) CATATAN="rc $rc $MODE $label"; echo "rc $rc: proses render dimatikan dari luar (SIGKILL/OOM = 137, TERM = 143); sisa Chrome proyek ini sudah disapu. Cek memori (dmesg | grep -i oom) sebelum mengulang." >&7 ;;
  esac
  return "$rc"; }
# Kunci proyek (fd 8): satu job still/draft/bundle/frames/final per proyek, supaya bundle bersama dan ledger tidak saling timpa.
proj_lock() { [ -z "$PROJ_LOCKED" ] || return 0; mkdir -p "$QC"; exec 8>"$QC/.render.lock"
  local q0; q0=$(date +%s)
  flock -n 8 || { echo "kunci proyek: menunggu render lain di proyek ini…"; flock 8; }
  PROJ_LOCKED=1; ANTRE=$(( ANTRE + $(date +%s) - q0 ))
  # Temp per job di qc/.tmp (bukan /tmp bersama): sisa job sebelumnya dihapus sekarang karena kunci bebas; job ini dihapus saat keluar.
  rm -rf "$QC/.tmp"; JOBTMP="$QC/.tmp/job.$$"; mkdir -p "$JOBTMP"; export TMPDIR="$JOBTMP"
  # Kunci proyek dipegang, jadi proses Chrome/compositor proyek ini yang masih hidup pasti sisa render yang mati (bukan render sah).
  local y; y=$(proses_proyek | wc -l)
  [ "${y:-0}" -eq 0 ] || echo "PERINGATAN: $y proses Chrome/compositor proyek ini ($R) masih hidup tanpa render yang memegang kunci. Matikan hanya yang proyek ini: ps -eo pid=,args= | awk -v a='$R/node_modules/' 'index(\$0,a) && \$2!=\"awk\" {print \$1}' | xargs -r kill"; }

audio_python() {
  if [ -n "${PYTHON:-}" ]; then
    "$PYTHON" -c 'import numpy, soundfile' >/dev/null 2>&1 && { echo "$PYTHON"; return; }
    return 1
  fi
  local candidate
  for candidate in "$HOME/work/mg-venv/bin/python" python3 /usr/bin/python3; do
    command -v "$candidate" >/dev/null 2>&1 || continue
    "$candidate" -c 'import numpy, soundfile' >/dev/null 2>&1 || continue
    echo "$candidate"; return
  done
  return 1
}
[ -d "$R/src" ] || { echo "GAGAL: $R/src tidak ada"; exit 1; }
mkdir -p "$QC/stills"
newest_src() { find "$R/src" "$R/public" -type f -printf '%T@\n' 2>/dev/null | sort -n | tail -1; }
mtime() { stat -c %Y "$1" 2>/dev/null || echo 0; }
bundle() {
  proj_lock
  local stamp="$QC/.bundle_stamp"
  # Bundle dari entry lain (mis. src/index.ts padahal proyek memakai src/video/index.ts) berisi komposisi yang salah: bangun ulang.
  local beda=0; if [ -f "$QC/.bundle_entry" ] && [ "$(cat "$QC/.bundle_entry")" != "$ENTRY" ]; then beda=1; echo "bundle: entry berubah ($(cat "$QC/.bundle_entry") -> $ENTRY)"; fi
  if [ "$beda" = 1 ] || [ ! -d "$QC/.bundle" ] || [ ! -f "$stamp" ] || [ "$(printf '%.0f' "$(newest_src)")" -gt "$(mtime "$stamp")" ]; then
    echo "bundle: membuat ulang (src berubah)"; jalankan "$RENDER_MAKS" bundle npx remotion bundle "$ENTRY" --out-dir="$QC/.bundle" >"$QC/bundle.log" 2>&1 || { tail -20 "$QC/bundle.log"; exit 1; }; printf '%s' "$ENTRY" > "$QC/.bundle_entry"
    touch "$stamp"
  else echo "bundle: pakai ulang"; fi
}
# Kunci GLOBAL untuk render berat (frames/final): satu render di PC bersama pada satu waktu. Render final menulis
# ±2 MB per frame ke /tmp; dua render bersamaan menghabiskan disk (gagal 15 Nov: builder-trap-r2 v4 crash di f1210 saat
# jensen-pain-suffering render bersamaan, disk 106 MB). Bila disk sempit, render final per rentang lalu sambung.
heavy_lock() { proj_lock; exec 9>/tmp/remotion-heavy-render.lock; echo "kunci render global: menunggu render lain selesai (bila ada)…"
  local q0; q0=$(date +%s); flock 9; local a=$(( $(date +%s) - q0 )); ANTRE=$(( ANTRE + a )); [ "$a" -lt 5 ] || echo "antre ${a} dtk di kunci render"; }
case "$MODE" in
  still)
    [ $# -ge 1 ] || { echo "beri minimal satu <label:frame>"; exit 1; }
    bundle
    for lf in "$@"; do l="${lf%%:*}"; f="${lf##*:}"
      if jalankan "$STILL_MAKS" "$l" npx remotion still "$QC/.bundle" "$COMP" "$QC/stills/$l.png" --frame="$f" --scale=0.5 $GLARG >/dev/null 2>>"$QC/still.log"
      then echo "still $l (frame $f)"; else echo "GAGAL still $l (lihat $QC/still.log)"; fi
    done
    echo "Lanjut: teks_cek.py $QC/stills  ->  sandingkan.py $QC/stills <sheet kiblat> $QC/sanding.jpg  ->  isi $QC/JURI.md" ;;
  frames)
    heavy_lock; bundle; FR="$QC/frames"; rm -rf "$FR"; mkdir -p "$FR"
    jalankan "$RENDER_MAKS" "$COMP" npx remotion render "$QC/.bundle" "$COMP" "$FR" --sequence --image-format=jpeg --jpeg-quality=85 --scale=0.5 --concurrency="$K" $GLARG --log=error
    echo "frames $FR ($(ls "$FR" | wc -l) gambar). Lanjut: python3 $HERE/frame_audit.py $FR --src $R/src --cuts … --words …  (fase visual; audio: --fase audio setelah SFX dikunci)" ;;
  draft)
    bundle; RANGE="${1:-}"; OUT="$QC/draft${RANGE:+_$RANGE}.mp4"
    jalankan "$RENDER_MAKS" "$COMP" npx remotion render "$QC/.bundle" "$COMP" "$OUT" --scale=0.5 --crf=28 --muted --concurrency="$K" $GLARG ${RANGE:+--frames=$RANGE} --log=error
    echo "draft $OUT (skala 0,5; hanya untuk menilai gerak dan kamera)" ;;
  final|lego)
    if [ "$MODE" = lego ]; then LEGO="$P/${COMP}"; [ -f "$LEGO" ] || { echo "GAGAL: $LEGO tidak ada (render.sh <proyek> lego lego/lego.json)"; exit 1; }; OUT="(lego)"; RANGE=""
    else [ $# -ge 1 ] || { echo "beri nama file keluaran"; exit 1; }; OUT="$1"; RANGE="${2:-}"; fi
    gagal=0
    PYTHON_BIN="$(audio_python)" || {
      echo "GAGAL gerbang audio: Python dengan numpy + soundfile tidak ditemukan. Pasang requirements.txt atau set PYTHON=/path/venv/bin/python."
      exit 1
    }
    WARIS=""; CHANGED=""
    if [ -f "$QC/revisi.json" ]; then
      # Revisi video lama (Lantai F27): aturan baru berlaku untuk bagian yang diubah sejak versi yang disetujui.
      BASIS="$("$PYTHON_BIN" -c 'import json,sys;print(json.load(open(sys.argv[1]))["basis"])' "$QC/revisi.json")"
      WARIS="--warisan"
      CHANGED="$(cd "$R" && git diff --name-only --relative "$BASIS" -- src 2>/dev/null | sed "s#^#$R/#" | tr '\n' ' ')"
      echo "mode revisi: basis $BASIS · file berubah: ${CHANGED:-(tidak ada)}"
    fi
    if [ -f "$QC/cakupan-revisi.json" ] && [ -f "$P/lego/lego.json" ]; then
      # Revisi atas versi yang disetujui: lapisan di luar cakupan ledger tidak boleh berubah (Lantai F27, revisi.md §21.2).
      python3 "$HERE/revisi_cek.py" cek "$P" || { echo "GAGAL gerbang revisi: lihat daftar lapisan di atas."; gagal=1; }
    fi
    AUDIO_DIR="$P/audio"
    if [ -n "${VARIAN:-}" ]; then
      [ -d "$P/audio/order-$VARIAN" ] || { echo "GAGAL gerbang audio: audio/order-$VARIAN tidak ada (VARIAN=$VARIAN)."; exit 1; }
      AUDIO_DIR="$P/audio/order-$VARIAN"
    elif [ ! -f "$P/audio/ORDER.json" ]; then
      ord=( "$P"/audio/order-*/ORDER.json )
      if [ "${#ord[@]}" -eq 1 ] && [ -f "${ord[0]}" ]; then AUDIO_DIR="$(dirname "${ord[0]}")"
      elif [ "${#ord[@]}" -gt 1 ]; then echo "GAGAL gerbang audio: beberapa varian terkunci (audio/order-*); pilih dengan VARIAN=<A|B>."; exit 1; fi
    fi
    [ -d "$AUDIO_DIR" ] || { echo "GAGAL gerbang audio: folder $AUDIO_DIR tidak ada (render tidak bisa memeriksa audio)."; exit 1; }
    echo "gerbang audio: $AUDIO_DIR"
    if ! "$PYTHON_BIN" "$HERE/../gate/audio_order.py" check --dir "$AUDIO_DIR" $WARIS; then
      echo "GAGAL gerbang audio: urutan audio belum terkunci dengan bukti source words + cut map (lihat baris di atas)."
      gagal=1
    fi
    python3 "$HERE/resep_check.py" "$P/RESEP.md" || gagal=1
    if [ -f "$P/qc/merek" ]; then python3 "$HERE/profil_cek.py" "$(tr -d '[:space:]' < "$P/qc/merek")" || { echo "GAGAL gerbang: profil merek (BRAND.md/EDITING.md) belum lulus profil_cek.py."; gagal=1; }; fi
    TEMA="$(ls -d "$R"/src/*/bersama/tema.ts 2>/dev/null | head -1 || true)"; if [ -n "$TEMA" ] && grep -q "export const MEREK" "$TEMA"; then python3 "$HERE/tema_cek.py" "$(dirname "$(dirname "$TEMA")")" || { echo "GAGAL gerbang: gaya adegan di luar tema.ts (templates/sistem-desain)."; gagal=1; }; fi
    if [ -f "$P/lego/lego.json" ] && [ -f "$P/lego/lapisan.json" ]; then python3 "$HERE/kt_ocr.py" "$P/lego" --terima "$QC/kt_ocr_terima.json" --simpan "$QC/kt_ocr" || { echo "GAGAL gerbang: kata KT belum utuh/terbaca 4 f setelah onsetnya (kt_ocr.py; OCR salah baca → qc/kt_ocr_terima.json dengan frame yang dicek)."; gagal=1; }; fi
    if [ -f "$P/TAHAP.md" ]; then python3 "$HERE/tahap.py" "$P" cek final || { echo "GAGAL gerbang: langkah tahap sebelum Deliver belum selesai berbukti (TAHAP.md); jalankan tahap.py untuk langkah berikutnya."; gagal=1; }; fi
    bash "$HERE/gerbang_produksi.sh" "$P" "$AUDIO_DIR" "$PYTHON_BIN" || { echo "GAGAL gerbang produksi: komposisi episode, potong SFX, atau mix speaker HP (lihat baris di atas)."; gagal=1; }
    python3 "$HERE/motion_lint.py" "$R/src" $([ -d "$P/storyboard" ] && echo "$P/storyboard") ${WARIS:+--hanya $CHANGED} || { echo "GAGAL gerbang: gerak preset/stagger rata/blur masuk/easing sendiri (Lantai B13a); pakai toolkit/gerak/curves."; gagal=1; }
    python3 "$HERE/audio_bus_check.py" "$R/src" || { echo "GAGAL gerbang: audio di dalam <Sequence> adegan terpotong di batas adegan; putar mix lewat satu komponen '// audio-bus' di root."; gagal=1; }
    ns="$(printf '%.0f' "$(newest_src)")"; st="$(find "$QC/stills" -name '*.png' -printf '%T@\n' 2>/dev/null | sort -n | head -1)"; st="$(printf '%.0f' "${st:-0}")"  # still PALING LAMA: satu still basi = gagal (builder-trap-r2 r7: JB13 basi lolos)
    [ "$st" -ge "$ns" ] && [ "$st" -gt 0 ] || { echo "GAGAL gerbang: still di qc/stills lebih lama daripada perubahan src (atau belum ada). Jalankan 'still' dulu."; gagal=1; }
    [ "$(mtime "$QC/sanding.jpg")" -ge "$st" ] && [ -f "$QC/sanding.jpg" ] || { echo "GAGAL gerbang: qc/sanding.jpg belum dibuat dari still terbaru (sandingkan.py)."; gagal=1; }
    if [ -f "$QC/JURI.md" ] && [ "$(mtime "$QC/JURI.md")" -ge "$(mtime "$QC/sanding.jpg")" ] && tail -n 3 "$QC/JURI.md" | grep -q '^PUTUSAN: LULUS'; then :; else
      echo "GAGAL gerbang: qc/JURI.md belum berakhir 'PUTUSAN: LULUS' untuk sanding terbaru."; gagal=1; fi
    dr="$QC/draft${RANGE:+_$RANGE}.mp4"
    [ -f "$dr" ] && [ "$(mtime "$dr")" -ge "$ns" ] || { echo "GAGAL gerbang: draft gerak $(basename "$dr") belum dibuat dari src terbaru (render.sh draft${RANGE:+ $COMP $RANGE}); lihat geraknya dulu."; gagal=1; }
    if [ -f "$P/DECISIONS.md" ]; then
      miss=$( { grep -oE '^\| [RD]-[0-9]+ \|.*\| Aktif \|' "$P/DECISIONS.md" || true; } | { grep -oE '^\| [RD]-[0-9]+' || true; } | tr -d '| ' | while read -r id; do grep -q "$id" "$QC/JURI.md" 2>/dev/null || printf '%s ' "$id"; done)
      [ -z "$miss" ] || { echo "GAGAL gerbang: catatan Irfan aktif belum diperiksa di qc/JURI.md: $miss"; gagal=1; }
    fi
    FA="$QC/frame_audit"
    if [ ! -f "$FA/INDEX.md" ] || [ "$(mtime "$FA/INDEX.md")" -lt "$ns" ]; then echo "GAGAL gerbang: audit frame per frame belum dibuat dari src terbaru (render.sh frames → frame_audit.py → agen pemeriksa per potongan)."; gagal=1
    else
      # LULUS hanya berlaku untuk isi potongan yang dinilai: HASH di VERDICT harus sama dengan .hash potongan sekarang.
      bad=$(for v in "$FA"/c*/VERDICT.md; do d="$(dirname "$v")"
        { tail -n 3 "$v" | grep -q '^PUTUSAN: LULUS' && grep -qx "HASH: $(cat "$d/.hash" 2>/dev/null)" "$v"; } || printf '%s ' "$(basename "$d")"; done)
      [ -z "$bad" ] || { echo "GAGAL gerbang: potongan belum LULUS di audit frame: $bad"; gagal=1; }
    fi
    if [ "$MODE" = lego ]; then
      # Sinkron lego: pts frame dasar tidak boleh ganda/bergeser, dan tiap lapisan ber-alpha harus tampil di frame rencananya.
      "$PYTHON_BIN" "$HERE/../lego/base_pts.py" "$LEGO" || { echo "GAGAL gerbang: pts frame dasar lego ganda/bergeser (base_pts.py); gabungkan klip dasar pendek ke tetangga."; gagal=1; }
      "$PYTHON_BIN" "$HERE/../lego/cek_master.py" "$LEGO" || { echo "GAGAL gerbang: lapisan tampil di frame berbeda dari rencana (cek_master.py)."; gagal=1; }
    fi
    if [ "$gagal" != 0 ]; then
      if [ "${KETAT:-0}" = 1 ]; then echo "Render penuh ditolak (KETAT=1)."; exit 1; fi
      echo "CATATAN: butir GAGAL di atas adalah informasi, bukan putusan. Lihat sendiri tiap butir, perbaiki yang memang masalah, tulis sisanya dengan alasan di qc/JURI.md. Render dilanjutkan (KETAT=1 untuk menolak)."
    fi
    free_mb=$(df --output=avail -BM "$P" | tail -1 | tr -dc 0-9)
    [ "${free_mb:-0}" -ge 8000 ] || echo "PERINGATAN: disk kosong ${free_mb} MB (< 8 GB). Render penuh memakai sampai ±3,6 GB di puncaknya dan proses lain di PC bersama bisa naik-turun 2–3 GB; kehabisan ruang muncul sebagai halaman render crash (builder-trap-r2 v2 14 Nov; v3 15 Nov dua kali, disk 561 MB saat crash). Bebaskan ruang dulu."
    if [ "$MODE" = lego ]; then
      # Rakit lego: lapisan sudah dirender terpisah (scripts/lego/lapisan.py, cache); di sini hanya ffmpeg sekali.
      "$PYTHON_BIN" "$HERE/../lego/compose.py" "$LEGO" --cek && "$PYTHON_BIN" "$HERE/../lego/compose.py" "$LEGO"
      echo "final(lego) $(date '+%F %T') $LEGO" >> "$QC/render.log"; exit $?
    fi
    heavy_lock
    bundle; n=$(( $(grep -c '^final' "$QC/render.log" 2>/dev/null || true) + 1 ))
    echo "final $(date '+%F %T') ke-$n ${RANGE:-penuh} -> $OUT" >> "$QC/render.log"
    [ "$n" -le 2 ] || echo "PERINGATAN: ini render penuh ke-$n untuk video ini. Revisi cukup rentang yang berubah (argumen awal-akhir)."
    jalankan "$FINAL_MAKS" "$COMP" npx remotion render "$QC/.bundle" "$COMP" "$OUT" --concurrency="$K" $GLARG ${RANGE:+--frames=$RANGE} --log=error
    echo "final $OUT" ;;
  *) echo "mode tidak dikenal: $MODE (still | draft | frames | final | lego)"; exit 1 ;;
esac
