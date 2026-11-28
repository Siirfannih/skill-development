#!/usr/bin/env bash
# vo_master.sh · siapkan stem VO tanpa loudnorm/kompresor/limiter (Lantai E23; references/audio.md §14.6).
#   bash tools/vo_master.sh vo_raw.wav vo.wav [--sumber rekaman|tts] [--target -16] [--denoise] [--terima-pelan "<alasan>"]
# Rantai: (rekaman saja) highpass 70 Hz (+ afftdn ringan nr 3 / nf -55 bila --denoise) -> gain LINEAR NAIK saja menuju target
#         (tidak pernah turun di bawah level sumber) -> 48 kHz float. Gain dibatasi headroom true peak -1 dBTP:
#         bila target tidak tercapai tanpa limiter, suara dibiarkan lebih pelan dan musik/SFX yang menyesuaikan.
# --sumber tts: tanpa HPF. Uji 25 Nov 2026: HPF 70 Hz menaikkan true peak sumber keras dari -2,0 ke 0,0 dBTP (fase), lalu
#   voice_level gagal "klip" padahal sumber bersih. TTS tidak punya dengung rendah, jadi HPF tidak berfungsi (Lantai C18b).
# Bukti: scripts/gate/voice_level.py (skill-development) dijalankan di akhir; keluaran gagal = exit 1.
# Mix akhir (VO + musik + SFX) BUKAN di sini: pakai $MG/audio/loudness_2pass.sh mix.wav mix_n.wav --mix-akhir.
set -euo pipefail
source "$(dirname "$0")/_env.sh"
IN=""; OUT=""; TARGET=-16; DEN=0; TERIMA=""; SUMBER=rekaman
while [ $# -gt 0 ]; do case "$1" in
  --target) TARGET="$2"; shift;; --sumber) SUMBER="$2"; shift;; --denoise) DEN=1;; --terima-pelan) TERIMA="$2"; shift;;
  *) if [ -z "$IN" ]; then IN="$1"; elif [ -z "$OUT" ]; then OUT="$1"; else echo "argumen berlebih: $1"; exit 2; fi;;
esac; shift; done
[ -n "$IN" ] && [ -n "$OUT" ] && [ -f "$IN" ] || { sed -n 2,7p "$0"; exit 2; }
butuh gate/voice_level.py
ukur() { # -> "I TP"
  ffmpeg -hide_banner -nostats -i "$1" -af ebur128=peak=true -f null - 2>&1 | sed -n '/Summary:/,$p' \
    | awk '/^ *I:/{i=$2} /^ *Peak:/{p=$2} END{print i, p}'; }
case "$SUMBER" in rekaman) CH="highpass=f=70:poles=2";; tts) CH="anull";; *) echo "--sumber rekaman|tts"; exit 2;; esac
[ "$DEN" = 1 ] && CH="$CH,afftdn=nr=3:nf=-55"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
ffmpeg -v error -y -i "$IN" -af "$CH" -ar 48000 -c:a pcm_f32le "$TMP/pre.wav"
read -r SI STP <<<"$(ukur "$IN")"; read -r PI PTP <<<"$(ukur "$TMP/pre.wav")"
GAIN=$(python3 - "$TARGET" "$SI" "$PI" "$PTP" <<'EOF'
import sys
t, si, pi, ptp = map(float, sys.argv[1:])
want = max(t - pi, si - pi, 0.0)          # menuju target, tidak pernah di bawah sumber, tidak pernah negatif
room = -1.0 - ptp                          # headroom true peak tanpa limiter
g = min(want, room) if room > 0 else 0.0
print(f"{max(g, 0.0):.2f} {want:.2f} {room:.2f}")
EOF
)
read -r G WANT ROOM <<<"$GAIN"
echo "sumber I=$SI LUFS TP=$STP | setelah HPF I=$PI TP=$PTP | gain naik $G dB (diinginkan $WANT, headroom $ROOM)"
ffmpeg -v error -y -i "$TMP/pre.wav" -af "volume=${G}dB" -ar 48000 -c:a pcm_f32le "$OUT"
read -r OI OTP <<<"$(ukur "$OUT")"; echo "hasil  I=$OI LUFS TP=$OTP dBTP -> $OUT"
ARGS=("$IN" "$OUT" --target "$TARGET"); [ -n "$TERIMA" ] && ARGS+=(--terima-pelan "$TERIMA")
if "$PY" "$MG/gate/voice_level.py" "${ARGS[@]}"; then echo "VO-MASTER: LULUS"; else
  echo "VO-MASTER: GAGAL (lihat voice_level di atas). Bila sumber tidak punya headroom: rekam/generate ulang lebih keras, atau --terima-pelan \"<alasan>\" (dicatat di DECISIONS)."; exit 1; fi
