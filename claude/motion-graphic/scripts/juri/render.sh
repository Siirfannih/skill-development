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
# Gerbang `final` (semua harus benar):
#   0. audio/ORDER.json lulus audio_order.py check; bukti potongan sumber, jeda, palet SFX, dan urutan lapisan diuji ulang
#   1. RESEP.md lulus resep_check.py
#   2. SEMUA still di qc/stills/ lebih baru daripada perubahan terakhir di remotion/src (still paling lama yang dinilai)
#   3. qc/sanding.jpg (sandingkan.py) lebih baru daripada still itu
#   4. qc/JURI.md lebih baru daripada sanding dan baris terakhirnya "PUTUSAN: LULUS"
#   5. balance_check.py pada qc/stills tidak FAIL (Lantai C17); hanya frame transisi <= 12 f yang boleh diterima,
# lewat baris 'KESEIMBANGAN: transisi f<awal>-<akhir> <alasan>' di JURI.md
#   6. draft gerak sudah dilihat: qc/draft.mp4 (penuh) atau qc/draft_<awal-akhir>.mp4 (rentang yang sama) lebih baru daripada src
# 8. audit frame per frame: qc/frame_audit/INDEX.md lebih baru daripada src dan setiap
#      potongan punya VERDICT.md berakhir 'PUTUSAN: LULUS' (agen lain memeriksa tiap detik; scripts/juri/frame_audit.py)
#   7. setiap catatan Irfan berstatus Aktif di DECISIONS.md (R-NNN / D-NNN) disebut di qc/JURI.md dengan buktinya
#
# Revisi satu adegan: perbarui still adegan itu, sanding, JURI, lalu `final` dengan rentang frame adegan itu saja
# dan sambung dengan ffmpeg; jangan render ulang seluruh video.
# Menyambung rentang: filter concat + encode ulang (CRF 14) lalu audio utuh dipasang sekali; `-c copy` (concat demuxer /
# annexb) kehilangan 2–4 frame di sambungan (builder-trap-r2 v4). Cek jumlah frame = total rentang sebelum dikirim.
# Lingkungan: KONKURENSI (default 4; ukur sekali dengan `npx remotion benchmark`), ENTRY (default src/index.ts).
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
[ $# -ge 3 ] || { sed -n '2,17p' "$0"; exit 1; }
P="$(cd "$1" && pwd)"; MODE="$2"; COMP="$3"; shift 3
R="$P/remotion"; QC="$P/qc"; ENTRY="${ENTRY:-src/index.ts}"
# Profil mesin dari tools/bench-render/bench.sh (sekali per mesin): opsi --gl dan konkurensi tercepat yang hasilnya sama.
# Dipakai hanya bila hostname cocok; variabel GL / KONKURENSI di lingkungan tetap menang.
PROFILE="${RENDER_PROFILE:-$HOME/work/render-profile.json}"; PGL=""; PK=""
if [ -f "$PROFILE" ]; then read -r PH PGL PK < <(python3 -c 'import json,sys;p=json.load(open(sys.argv[1]));print(p.get("host","-"),p.get("gl","default"),p.get("konkurensi",4))' "$PROFILE" 2>/dev/null || echo "- - -")
  [ "$PH" = "$(hostname)" ] || { PGL=""; PK=""; }; fi
K="${KONKURENSI:-${PK:-4}}"; GL="${GL:-${PGL:-default}}"; GLARG=""; [ "$GL" = default ] || GLARG="--gl=$GL"
# Ledger: setiap pemanggilan menulis satu baris JSON ke qc/jobs.jsonl (antre di kunci render, lama kerja, hasil, commit),
# supaya waktu antre, render, dan revisi bisa dipisah tanpa menebak (laporan investigasi 24 jam, 16 Nov).
T0=$(date +%s); ANTRE=0; ARGS="$(printf '%s ' "$@" | tr -d '"\\')"
ledger() {
  local rc=$? t1; t1=$(date +%s); mkdir -p "$QC"
  printf '{"mode":"%s","comp":"%s","arg":"%s","mulai":"%s","antre_dtk":%d,"kerja_dtk":%d,"rc":%d,"commit":"%s","host":"%s","konkurensi":%s,"gl":"%s"}\n' \
    "$MODE" "$COMP" "${ARGS% }" "$(date -d "@$T0" '+%F %T')" "$ANTRE" "$(( t1 - T0 - ANTRE ))" "$rc" \
    "$(git -C "$P" rev-parse --short HEAD 2>/dev/null || echo -)" "$(hostname)" "$K" "$GL" >> "$QC/jobs.jsonl"
}
trap ledger EXIT

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
  local stamp="$QC/.bundle_stamp"
  if [ ! -d "$QC/.bundle" ] || [ ! -f "$stamp" ] || [ "$(printf '%.0f' "$(newest_src)")" -gt "$(mtime "$stamp")" ]; then
    echo "bundle: membuat ulang (src berubah)"; (cd "$R" && npx remotion bundle "$ENTRY" --out-dir="$QC/.bundle" >"$QC/bundle.log" 2>&1) || { tail -20 "$QC/bundle.log"; exit 1; }
    touch "$stamp"
  else echo "bundle: pakai ulang"; fi
}
# Kunci GLOBAL untuk render berat (frames/final): satu render di PC bersama pada satu waktu. Render final menulis
# ±2 MB per frame ke /tmp; dua render bersamaan menghabiskan disk (gagal 15 Nov: builder-trap-r2 v4 crash di f1210 saat
# jensen-pain-suffering render bersamaan, disk 106 MB). Bila disk sempit, render final per rentang lalu sambung.
heavy_lock() { exec 9>/tmp/remotion-heavy-render.lock; echo "kunci render global: menunggu render lain selesai (bila ada)…"
  local q0; q0=$(date +%s); flock 9; ANTRE=$(( $(date +%s) - q0 )); [ "$ANTRE" -lt 5 ] || echo "antre ${ANTRE} dtk di kunci render"; }
case "$MODE" in
  still)
    [ $# -ge 1 ] || { echo "beri minimal satu <label:frame>"; exit 1; }
    bundle
    for lf in "$@"; do l="${lf%%:*}"; f="${lf##*:}"
      (cd "$R" && npx remotion still "$QC/.bundle" "$COMP" "$QC/stills/$l.png" --frame="$f" --scale=0.5 $GLARG >/dev/null 2>>"$QC/still.log") \
        && echo "still $l (frame $f)" || echo "GAGAL still $l (lihat $QC/still.log)"
    done
    echo "Lanjut: teks_cek.py $QC/stills  ->  sandingkan.py $QC/stills <sheet kiblat> $QC/sanding.jpg  ->  isi $QC/JURI.md" ;;
  frames)
    heavy_lock; bundle; FR="$QC/frames"; rm -rf "$FR"; mkdir -p "$FR"
    (cd "$R" && npx remotion render "$QC/.bundle" "$COMP" "$FR" --sequence --image-format=jpeg --jpeg-quality=85 --scale=0.5 --concurrency="$K" $GLARG --log=error)
    echo "frames $FR ($(ls "$FR" | wc -l) gambar). Lanjut: python3 $HERE/frame_audit.py $FR --cuts … --cues … --words … --stems … --out $QC/frame_audit" ;;
  draft)
    bundle; RANGE="${1:-}"; OUT="$QC/draft${RANGE:+_$RANGE}.mp4"
    (cd "$R" && npx remotion render "$QC/.bundle" "$COMP" "$OUT" --scale=0.5 --crf=28 --muted --concurrency="$K" $GLARG ${RANGE:+--frames=$RANGE} --log=error)
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
      # Revisi atas versi yang disetujui: lapisan di luar cakupan ledger tidak boleh berubah (Lantai F27, revision-log §21.2).
      python3 "$HERE/revisi_cek.py" cek "$P" || { echo "GAGAL gerbang revisi: lihat daftar lapisan di atas."; exit 1; }
    fi
    if ! "$PYTHON_BIN" "$HERE/../gate/audio_order.py" check --dir "$P/audio" $WARIS; then
      echo "GAGAL gerbang audio: kunci suara dengan bukti source words + cut map, lalu visual, SFX, dan musik sebelum render final."
      exit 1
    fi
    python3 "$HERE/resep_check.py" "$P/RESEP.md" || gagal=1
    python3 "$HERE/motion_lint.py" "$R/src" ${WARIS:+--hanya $CHANGED} || { echo "GAGAL gerbang: gerak preset/stagger rata/blur masuk (Lantai B13a); pakai curves.ts."; gagal=1; }
    python3 "$HERE/audio_bus_check.py" "$R/src" || { echo "GAGAL gerbang: audio di dalam <Sequence> adegan terpotong di batas adegan; putar mix lewat satu komponen '// audio-bus' di root."; gagal=1; }
    ns="$(printf '%.0f' "$(newest_src)")"; st="$(find "$QC/stills" -name '*.png' -printf '%T@\n' 2>/dev/null | sort -n | head -1)"; st="$(printf '%.0f' "${st:-0}")"  # still PALING LAMA: satu still basi = gagal (builder-trap-r2 r7: JB13 basi lolos)
    [ "$st" -ge "$ns" ] && [ "$st" -gt 0 ] || { echo "GAGAL gerbang: still di qc/stills lebih lama daripada perubahan src (atau belum ada). Jalankan 'still' dulu."; gagal=1; }
    [ "$(mtime "$QC/sanding.jpg")" -ge "$st" ] && [ -f "$QC/sanding.jpg" ] || { echo "GAGAL gerbang: qc/sanding.jpg belum dibuat dari still terbaru (sandingkan.py)."; gagal=1; }
    if ! python3 "$HERE/balance_check.py" "$QC/stills" > "$QC/balance.log" 2>&1; then
      # Hanya frame transisi <= 12 f yang boleh diterima: tiap baris KESEIMBANGAN menyebut rentangnya.
      if grep -q '^KESEIMBANGAN:' "$QC/JURI.md" 2>/dev/null && ! grep '^KESEIMBANGAN:' "$QC/JURI.md" | awk '{ if (match($0, /transisi f[0-9]+-[0-9]+/)) { split(substr($0, RSTART + 10, RLENGTH - 10), r, "-"); if (r[2] - r[1] > 12 || r[2] < r[1]) bad = 1 } else bad = 1 } END { exit bad ? 0 : 1 }'; then
        echo "balance_check FAIL, diterima untuk frame transisi di JURI.md (lihat qc/balance.log)"
      else grep -E '^FAIL' "$QC/balance.log" | head -8; echo "GAGAL gerbang: frame berat sebelah (Lantai C17). Pindahkan posisi teks/objek. Hanya frame transisi <= 12 f yang boleh diterima: 'KESEIMBANGAN: transisi f<awal>-<akhir> <alasan>' di qc/JURI.md."; gagal=1; fi
    fi
    if [ -f "$QC/JURI.md" ] && [ "$(mtime "$QC/JURI.md")" -ge "$(mtime "$QC/sanding.jpg")" ] && tail -n 3 "$QC/JURI.md" | grep -q '^PUTUSAN: LULUS'; then :; else
      echo "GAGAL gerbang: qc/JURI.md belum berakhir 'PUTUSAN: LULUS' untuk sanding terbaru."; gagal=1; fi
    dr="$QC/draft${RANGE:+_$RANGE}.mp4"
    [ -f "$dr" ] && [ "$(mtime "$dr")" -ge "$ns" ] || { echo "GAGAL gerbang: draft gerak $(basename "$dr") belum dibuat dari src terbaru (render.sh draft${RANGE:+ $COMP $RANGE}); lihat geraknya dulu."; gagal=1; }
    if [ -f "$P/DECISIONS.md" ]; then
      miss=$(grep -oE '^\| [RD]-[0-9]+ \|.*\| Aktif \|' "$P/DECISIONS.md" | grep -oE '^\| [RD]-[0-9]+' | tr -d '| ' | while read -r id; do grep -q "$id" "$QC/JURI.md" 2>/dev/null || printf '%s ' "$id"; done)
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
    [ "$gagal" = 0 ] || { echo "Render penuh ditolak."; exit 1; }
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
    (cd "$R" && npx remotion render "$QC/.bundle" "$COMP" "$OUT" --concurrency="$K" $GLARG ${RANGE:+--frames=$RANGE} --log=error)
    echo "final $OUT" ;;
  *) echo "mode tidak dikenal: $MODE (still | draft | frames | final | lego)"; exit 1 ;;
esac
