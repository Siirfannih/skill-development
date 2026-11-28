#!/usr/bin/env bash
# sg_qc.sh · gerbang teknis Soalnya Gini setelah render final (pengganti v1 run_qc.sh). Fail-closed, 0 token LLM.
#   bash tools/sg_qc.sh <folder episode> [--tanpa-ledger]
# Folder episode berisi: render.mp4, shotlist.json, script.md, remotion/src/ (opsional caption_yt.md, caption_fb.md),
#   qc/jobs.jsonl (ditulis render.sh skill-development).
# Gerbang (semua dijalankan; exit 1 bila satu saja GAGAL; laporan qc/qc-report.json):
#   G0 jalur render : baris terakhir mode=final di qc/jobs.jsonl rc=0 (render lewat $MG/juri/render.sh final, MOTION-CORE §4)
#   G1 format       : 1080x1920, 30 fps, durasi = target shotlist ±0,5 dtk dan 45–60,5 dtk
#   G2 pengiriman   : $MG/gate/delivery_probe.py (H.264 High, yuv420p, bt709, faststart, AAC 48k stereo, -14..-16 LUFS, TP <= -1)
#   G3 slop         : tools/slop-grep.sh naskah + caption + kode
#   G4 palet        : $MG/palette_check.py render.mp4 (<= 2 keluarga aksen, dominan >= 70 %)
#   G5 beat         : tools/beat_frames.py cek shotlist.json, lalu ekstrak keyframe dari render.mp4 ke qc/beats/
#   G6 golden       : tools/golden_cek.py (keras: kosong, luar token, tanpa golden; sisanya PERLU-MATA -> skill 07 tahap 2)
set -uo pipefail
source "$(dirname "$0")/_env.sh"
EP="${1:-}"; LEDGER=1; [ "${2:-}" = "--tanpa-ledger" ] && LEDGER=0
[ -n "$EP" ] && [ -d "$EP" ] || { sed -n 2,13p "$0"; exit 2; }
butuh gate/delivery_probe.py palette_check.py
V="$EP/render.mp4"; S="$EP/shotlist.json"; QC="$EP/qc"; mkdir -p "$QC"
GOLD="${SG_GOLDEN:-$SG_ROOT/merek/soalnya-gini/contoh/bagus}"; TEMA="${SG_TEMA:-$SG_ROOT/kit/tema.ts}"
declare -A R; FAIL=0
gate() { # gate <id> <perintah...>
  local id="$1"; shift; echo "=== $id: $*"
  if "$@" > "$QC/$id.log" 2>&1; then R[$id]=LULUS; else R[$id]=GAGAL; FAIL=1; fi
  sed 's/^/    /' "$QC/$id.log" | tail -25; echo "--- $id ${R[$id]}"; }
for f in "$V" "$S" "$EP/script.md"; do [ -f "$f" ] || { echo "GAGAL: $f tidak ada"; exit 1; }; done

if [ "$LEDGER" = 1 ]; then
  gate G0_jalur_render python3 -c '
import json,sys
L=[json.loads(l) for l in open(sys.argv[1]) if l.strip()]
F=[j for j in L if j.get("mode")=="final"]
print("render final terakhir:", F[-1] if F else "TIDAK ADA")
sys.exit(0 if F and F[-1].get("rc")==0 else 1)' "$QC/jobs.jsonl"
else R[G0_jalur_render]="DILEWATI(uji)"; fi

gate G1_format python3 - "$V" "$S" <<'EOF'
import json, subprocess, sys
v, s = sys.argv[1:]
p = json.loads(subprocess.run(["ffprobe","-v","error","-select_streams","v:0","-count_packets","-show_entries",
    "stream=width,height,r_frame_rate,nb_read_packets:format=duration","-of","json",v],capture_output=True,text=True).stdout)
st, d = p["streams"][0], float(p["format"]["duration"]); num, den = map(int, st["r_frame_rate"].split("/"))
t = json.load(open(s))["target_duration_sec"]; fps = num/den
F = []
if (st["width"], st["height"]) != (1080, 1920): F.append(f"resolusi {st['width']}x{st['height']}")
if abs(fps-30) > 0.01: F.append(f"fps {fps:.3f}")
if not (45.0 <= d <= 60.5): F.append(f"durasi {d:.2f} di luar 45-60,5")
if abs(d-t) > 0.5: F.append(f"durasi {d:.2f} vs target shotlist {t}")
print(f"{st['width']}x{st['height']} {fps:.2f} fps {d:.2f} dtk {st.get('nb_read_packets')} frame")
print("PASS" if not F else "FAIL: "+"; ".join(F)); sys.exit(1 if F else 0)
EOF
gate G2_pengiriman "$PY" "$MG/gate/delivery_probe.py" "$V"
SLOP=("$EP/script.md"); for c in "$EP"/caption_*.md "$EP/remotion/src" "$EP/audio/cues.json"; do [ -e "$c" ] && SLOP+=("$c"); done
gate G3_slop bash "$SG_TOOLS/slop-grep.sh" "${SLOP[@]}"
gate G4_palet "$PY" "$MG/palette_check.py" "$V"
gate G5_beat bash -c "python3 '$SG_TOOLS/beat_frames.py' cek '$S' && python3 '$SG_TOOLS/beat_frames.py' ekstrak '$S' '$V' '$QC/beats'"
gate G6_golden "$PY" "$SG_TOOLS/golden_cek.py" --shotlist "$S" --beats "$QC/beats" --golden "$GOLD" --tema "$TEMA" --out "$QC/golden"

python3 - "$QC" "$FAIL" <<EOF
import json, sys
r = {$(for k in "${!R[@]}"; do printf '"%s":"%s",' "$k" "${R[$k]}"; done)}
json.dump({"gerbang": dict(sorted(r.items())), "lulus_teknis": sys.argv[2] == "0",
           "berikut": "skill 07 tahap 2: penilai melihat qc/golden/sanding.jpg" if sys.argv[2] == "0" else "kembali ke skill 06"},
          open(sys.argv[1] + "/qc-report.json", "w"), ensure_ascii=False, indent=1)
print(json.dumps(dict(sorted(r.items())), ensure_ascii=False))
EOF
[ "$FAIL" = 0 ] && echo "SG-QC: LULUS TEKNIS" || echo "SG-QC: GAGAL"
exit "$FAIL"
