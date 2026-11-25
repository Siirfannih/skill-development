#!/usr/bin/env bash
# Loudness 2-pass linear untuk MIX AKHIR (bukan stem suara). Lantai E23 / audio.md: suara asli tidak diturunkan,
# dikompres, atau di-limit. loudnorm `linear=true` = gain murni (crest tidak berubah), jadi boleh pada mix jadi;
# hasilnya dipakai sebagai gain tunggal. Pass 2 harus melapor normalization_type=linear, bila tidak = gagal keras
# (artinya loudnorm jatuh ke mode dinamis = kompresi tersembunyi).
# Pakai: loudness_2pass.sh mix_in.wav mix_out.wav [--mix-akhir] [-I -14] [-TP -1.5] [-LRA 11] [--izinkan-turun]
#   --mix-akhir     wajib: pernyataan bahwa masukan adalah mix akhir, bukan stem suara
#   --izinkan-turun gain negatif > 0,5 dB menurunkan suara di dalam mix (E23) -> ditolak kecuali flag ini
# Keluar: 0 lulus, 1 gagal (dinamis / gain turun / hasil di luar target), 2 salah pakai.
set -euo pipefail
IN=""; OUT=""; I=-14; TP=-1.5; LRA=11; ACK=0; DOWN=0
while [ $# -gt 0 ]; do
  case "$1" in
    --mix-akhir) ACK=1;; --izinkan-turun) DOWN=1;;
    -I) I="$2"; shift;; -TP) TP="$2"; shift;; -LRA) LRA="$2"; shift;;
    *) if [ -z "$IN" ]; then IN="$1"; elif [ -z "$OUT" ]; then OUT="$1"; else echo "argumen berlebih: $1" >&2; exit 2; fi;;
  esac; shift
done
[ -n "$IN" ] && [ -n "$OUT" ] || { sed -n 7,10p "$0" >&2; exit 2; }
[ "$ACK" = 1 ] || { echo "GAGAL: tambahkan --mix-akhir (alat ini bukan untuk stem suara; lihat audio.md, Lantai E23)" >&2; exit 2; }
[ -f "$IN" ] || { echo "berkas tidak ada: $IN" >&2; exit 2; }

jget() { python3 -c 'import json,sys,re;t=sys.stdin.read();m=re.search(r"\{[^{}]*\}",t,re.S);d=json.loads(m.group(0));print(d[sys.argv[1]])' "$2" <<<"$1"; }
FILT="loudnorm=I=$I:TP=$TP:LRA=$LRA"
P1=$(ffmpeg -hide_banner -nostats -i "$IN" -af "$FILT:print_format=json" -f null - 2>&1)
MI=$(jget "$P1" input_i); MTP=$(jget "$P1" input_tp); MLRA=$(jget "$P1" input_lra)
MTH=$(jget "$P1" input_thresh); MOFF=$(jget "$P1" target_offset)
echo "SEBELUM  I=$MI LUFS  TP=$MTP dBTP  LRA=$MLRA"
GAIN=$(python3 -c "print(round($I-($MI),2))")
echo "gain linear = $GAIN dB"
if python3 -c "import sys;sys.exit(0 if $GAIN < -0.5 else 1)" && [ "$DOWN" != 1 ]; then
  echo "GAGAL: gain $GAIN dB menurunkan suara di dalam mix (E23). Turunkan musik/SFX di mix, atau --izinkan-turun." >&2; exit 1
fi
P2=$(ffmpeg -y -hide_banner -nostats -i "$IN" -af "$FILT:measured_I=$MI:measured_TP=$MTP:measured_LRA=$MLRA:measured_thresh=$MTH:offset=$MOFF:linear=true:print_format=json,aresample=48000" -ar 48000 "$OUT" 2>&1)
TYPE=$(jget "$P2" normalization_type)
if [ "$TYPE" != "linear" ]; then
  echo "GAGAL: pass 2 normalization_type=$TYPE (bukan linear: kompresi dinamis tersembunyi). Penyebab umum: TP hasil melebihi target, atau LRA terukur 0 (sinyal datar; loudnorm menganggap measured kosong). Hasil dihapus." >&2
  rm -f "$OUT"; exit 1
fi
EB=$(ffmpeg -hide_banner -nostats -i "$OUT" -af ebur128=peak=true -f null - 2>&1 | sed -n '/Summary:/,$p')
AI=$(printf '%s\n' "$EB" | awk '/^ *I:/{print $2; exit}')
AP=$(printf '%s\n' "$EB" | awk '/Peak:/{print $2; exit}')
echo "SESUDAH  I=$AI LUFS  TP=$AP dBTP  normalization_type=$TYPE"
python3 -c "import sys;i,p,t,tp=$AI,$AP,$I,$TP;sys.exit(0 if abs(i-t)<=0.5 and p<=tp+0.1 else 1)" \
  && echo "LULUS" || { echo "GAGAL: hasil di luar target (I $I +-0.5, TP <= $TP)" >&2; exit 1; }
