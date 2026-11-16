#!/bin/bash
# Benchmark render SEKALI per mesin → profil yang otomatis dipakai render.sh dan lego/lapisan.py (opsi --gl + konkurensi).
#
#   tools/bench-render/bench.sh            ±10–15 menit; memakai kunci render global yang sama dengan render.sh
#   BENCH_FRAMES=0-29 tools/bench-render/bench.sh     uji cepat (hasil kurang akurat)
#
# Keluaran: profil JSON di $RENDER_PROFILE (bawaan ~/work/render-profile.json) + rincian di tools/bench-render/out/.
# Cara memilih: setiap opsi --gl (default, angle-egl, vulkan, swangle, angle) merender adegan uji yang sama; opsi
# yang gagal atau gambarnya berbeda dari default (PSNR < 35 dB) dibuang; yang tercepat menang. Lalu konkurensi
# 2, 4, 6, … sampai jumlah thread diuji dengan opsi itu; yang tercepat disimpan. render.sh membaca profil hanya bila
# hostname-nya sama, dan variabel GL / KONKURENSI di lingkungan tetap menang (orkestrasi.md §6).
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"; OUT="$HERE/out"; PROFILE="${RENDER_PROFILE:-$HOME/work/render-profile.json}"
FR="${BENCH_FRAMES:-0-89}"; NCPU=$(nproc); K0=$(( NCPU / 2 )); [ "$K0" -ge 1 ] || K0=1
mkdir -p "$OUT"; cd "$HERE" || exit 1
log() { echo "[bench] $*"; }
if [ ! -d node_modules/@remotion/cli ]; then log "npm install (sekali)…"; npm install --no-audit --no-fund >"$OUT/npm.log" 2>&1 || { tail -20 "$OUT/npm.log"; exit 1; }; fi
exec 9>/tmp/remotion-heavy-render.lock; log "menunggu kunci render global (bila ada render lain)…"; flock 9
log "mesin: $(hostname) · thread $NCPU · RAM $(free -g | awk '/Mem:/{print $2}') GB"
{ lspci 2>/dev/null | grep -iE 'vga|3d|display'; echo; timeout 180 npx remotion gpu 2>&1; } > "$OUT/gpu.txt"
grep -iE 'vga|3d|display' "$OUT/gpu.txt" | head -3
npx remotion bundle src/index.ts --out-dir "$OUT/bundle" >"$OUT/bundle.log" 2>&1 || { tail -20 "$OUT/bundle.log"; exit 1; }
RES="$OUT/hasil.tsv"; : > "$RES"
glarg() { [ "$1" = default ] && echo "" || echo "--gl=$1"; }
waktu() {  # waktu <gl> <konkurensi> <keluaran> → detik, atau "gagal"
  local t0 t1; t0=$(date +%s.%N)
  timeout 1800 npx remotion render "$OUT/bundle" Berat "$3" --frames="$FR" --concurrency="$2" $(glarg "$1") --log=error \
    >"$OUT/render_$1_$2.log" 2>&1 || { echo gagal; return; }
  t1=$(date +%s.%N); python3 -c "print(round($t1-$t0,1))"
}
psnr() { ffmpeg -nostdin -i "$1" -i "$2" -lavfi psnr -f null - 2>&1 | grep -oE 'average:[0-9.inf]+' | cut -d: -f2; }

for gl in default angle-egl vulkan swangle angle; do
  timeout 300 npx remotion still "$OUT/bundle" Berat "$OUT/still_$gl.png" --frame=45 $(glarg "$gl") --log=error >"$OUT/still_$gl.log" 2>&1 \
    || { log "gl=$gl: still gagal"; printf 'gl\t%s\t%s\tgagal\t-\n' "$gl" "$K0" >> "$RES"; continue; }
  p="inf"; [ "$gl" = default ] || p="$(psnr "$OUT/still_default.png" "$OUT/still_$gl.png")"
  s="$(waktu "$gl" "$K0" "$OUT/r_$gl.mp4")"
  log "gl=$gl: ${s} dtk (konkurensi $K0) · PSNR vs default ${p:-?} dB"
  printf 'gl\t%s\t%s\t%s\t%s\n' "$gl" "$K0" "$s" "${p:-0}" >> "$RES"
done
# opsi non-default hanya dipilih bila ≥ 10 % lebih cepat dari default (selisih kecil = noise, tidak sepadan risikonya)
DEF=$(awk -F'\t' '$1=="gl" && $2=="default" && $4!="gagal" {print $4}' "$RES")
BEST_GL=$(awk -F'\t' -v d="${DEF:-0}" '$1=="gl" && $4!="gagal" && ($5=="inf" || $5+0>=35) && ($2=="default" || d==0 || $4 < 0.9*d) {print $4"\t"$2}' "$RES" | sort -n | head -1 | cut -f2)
[ -n "$BEST_GL" ] || { log "semua opsi gl gagal; lihat $OUT/*.log"; exit 1; }
log "gl terbaik: $BEST_GL"
for k in $(seq 2 2 "$NCPU"); do
  s="$(waktu "$BEST_GL" "$k" "$OUT/k_$k.mp4")"; log "konkurensi $k: $s dtk"; printf 'k\t%s\t%s\t%s\t-\n' "$BEST_GL" "$k" "$s" >> "$RES"
done
python3 - "$RES" "$PROFILE" "$FR" "$BEST_GL" <<'P'
import json, socket, sys, time
res, prof, fr, gl = sys.argv[1:5]
rows = [l.rstrip("\n").split("\t") for l in open(res) if l.strip()]
ok = lambda r: r[3] != "gagal"
ks = [(float(r[3]), int(r[2])) for r in rows if r[0] == "k" and ok(r)]
k = min(ks)[1] if ks else int([r for r in rows if r[0] == "gl"][0][2])
a, b = (int(x) for x in fr.split("-")); n = b - a + 1
best = min([t for t, _ in ks] or [min(float(r[3]) for r in rows if r[0] == "gl" and ok(r))])
p = {"host": socket.gethostname(), "tanggal": time.strftime("%F %T"), "gl": gl, "konkurensi": k,
     "dtk_per_frame_1080p": round(best / n, 3), "frame_uji": n, "remotion": "4.0.380",
     "hasil": [{"uji": r[0], "gl": r[1], "konkurensi": int(r[2]), "dtk": r[3], "psnr": r[4]} for r in rows]}
import os; os.makedirs(os.path.dirname(prof) or ".", exist_ok=True)
json.dump(p, open(prof, "w"), indent=1); print(f"[bench] profil {prof}: gl={gl} konkurensi={k} · {p['dtk_per_frame_1080p']} dtk/frame")
P
