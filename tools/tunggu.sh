#!/bin/bash
# Jalankan pekerjaan panjang (render, frames, Whisper, mix) lepas dari sesi model, lalu tunggu TANPA polling.
#
#   tools/tunggu.sh jalan <nama> -- <perintah …>   mulai di latar (nohup), log ke ~/work/jobs/<nama>/log
#   tools/tunggu.sh tunggu <nama> [maks_dtk]        SATU panggilan yang tidur sampai job selesai/gagal (default 1500 dtk),
#                                                    lalu cetak status + 20 baris log terakhir. Belum selesai = keluar 3.
#   tools/tunggu.sh status [<nama>]                 status semua/satu job (tanpa menunggu)
#
# Kenapa: worker yang mengecek status setiap beberapa detik membangunkan model dengan konteks ratusan ribu token tiap
# kali (sfx_builder_v6: 113 dari 277 respons = 42 % token hanya polling; laporan investigasi 24 jam, 16 Nov).
# Aturan pakai: setelah `jalan`, kerjakan hal lain yang tidak bergantung pada job ini; bila tidak ada, panggil `tunggu`
# sekali dengan batas waktu panjang (alat Bash/exec diberi timeout ≥ maks_dtk). Jangan memanggil `status` berulang.
set -uo pipefail
J="${JOBS_DIR:-$HOME/work/jobs}"; mkdir -p "$J"
cmd="${1:-}"; shift || true
case "$cmd" in
  jalan)
    n="${1:?nama job}"; shift; [ "${1:-}" = "--" ] && shift
    [ $# -gt 0 ] || { echo "beri perintah setelah --"; exit 1; }
    d="$J/$n"; if [ -f "$d/pid" ] && kill -0 "$(cat "$d/pid")" 2>/dev/null; then echo "job $n masih berjalan (pid $(cat "$d/pid"))"; exit 1; fi
    rm -rf "$d"; mkdir -p "$d"; printf '%q ' "$@" > "$d/cmd"; date +%s > "$d/mulai"; pwd > "$d/cwd"
    nohup bash -c 'cd "$1"; shift; d="$1"; shift; "$@" > "$d/log" 2>&1; echo $? > "$d/rc.tmp"; mv "$d/rc.tmp" "$d/rc"; date +%s > "$d/selesai"' \
      _ "$(pwd)" "$d" "$@" >/dev/null 2>&1 &
    echo $! > "$d/pid"; echo "job $n jalan (pid $!) · log $d/log · tunggu: tools/tunggu.sh tunggu $n" ;;
  tunggu)
    n="${1:?nama job}"; maks="${2:-1500}"; d="$J/$n"; [ -d "$d" ] || { echo "job $n tidak ada"; exit 1; }
    t0=$(date +%s)
    while [ ! -f "$d/rc" ]; do
      if ! kill -0 "$(cat "$d/pid" 2>/dev/null)" 2>/dev/null && [ ! -f "$d/rc" ]; then sleep 1; [ -f "$d/rc" ] || { echo "job $n mati tanpa kode keluar"; tail -n 20 "$d/log"; exit 2; }; fi
      [ $(( $(date +%s) - t0 )) -lt "$maks" ] || { echo "job $n belum selesai setelah ${maks} dtk (berjalan $(( $(date +%s) - $(cat "$d/mulai") )) dtk)"; tail -n 5 "$d/log"; exit 3; }
      sleep 10
    done
    rc=$(cat "$d/rc"); echo "job $n selesai rc=$rc · $(( $(cat "$d/selesai") - $(cat "$d/mulai") )) dtk"; tail -n 20 "$d/log"; exit "$rc" ;;
  status)
    for d in "$J"/${1:-*}/; do [ -d "$d" ] || continue; n=$(basename "$d")
      if [ -f "$d/rc" ]; then echo "$n selesai rc=$(cat "$d/rc") $(( $(cat "$d/selesai") - $(cat "$d/mulai") )) dtk"
      elif kill -0 "$(cat "$d/pid" 2>/dev/null)" 2>/dev/null; then echo "$n berjalan $(( $(date +%s) - $(cat "$d/mulai") )) dtk"
      else echo "$n mati tanpa kode keluar"; fi; done ;;
  *) sed -n '2,12p' "$0"; exit 1 ;;
esac
