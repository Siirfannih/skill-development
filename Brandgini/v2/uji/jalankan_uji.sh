#!/usr/bin/env bash
# jalankan_uji.sh · uji semua tools v2 dengan berkas sintetis (ffmpeg -f lavfi). Dijalankan DI PC.
#   SKILLDEV=<akar skill-development> bash uji/jalankan_uji.sh
# Tidak memanggil API berbayar, tidak memasang apa pun. Keluaran: uji/hasil/*.log + ringkasan di stdout.
set -u
cd "$(dirname "$0")/.."; V2="$(pwd)"; H="$V2/uji/hasil"; D="$V2/uji/data"; rm -rf "$H"; mkdir -p "$H" "$D"
source tools/_env.sh
echo "SKILLDEV=$SKILLDEV ($(git -C "$SKILLDEV" log --oneline -1 2>/dev/null || cat "$SKILLDEV/COMMIT" 2>/dev/null)) PY=$PY"
ok=0; bad=0
cek() { # cek <nama> <exit yang diharapkan> <perintah...>
  local n="$1" want="$2"; shift 2; "$@" > "$H/$n.log" 2>&1; local rc=$?
  if [ "$rc" = "$want" ]; then ok=$((ok+1)); echo "OK    $n (exit $rc)"; else bad=$((bad+1)); echo "SALAH $n (exit $rc, harap $want)"; tail -5 "$H/$n.log" | sed 's/^/      /'; fi; }
FF="ffmpeg -v error -y"

echo "== data uji"
python3 uji/buat_contoh.py
# naskah bersih = naskah plan Hari 1 (142 kata)
sed -n '/^### Hari 1 ·/,/^\*\*Shot list/p' "$V2/../plan/soalnya-gini-10-plan.md" | grep '^>' | sed 's/^> //' > "$D/script_bersih.md"
printf 'Halo guys, simak sampai habis ya!! Obat ini dijamin aman dan pasti sembuh. [TBD]\n' > "$D/script_kotor.md"
mkdir -p "$D/src_kotor" "$D/src_bersih"
cat > "$D/src_kotor/Adegan.tsx" <<'EOF'
const bg = {background: 'radial-gradient(circle, #F2F4FF, #7E84E4)'};
const glow = {boxShadow: '0 0 24px #2D6BFF', backdropFilter: 'blur(12px)'};
const s = interpolate(f, [0, 10], [0, 1]); // scale(0) masuk
import {fade} from '@remotion/transitions/fade';
const j = Math.random();
const ikon = '⚡';
const sfx = staticFile('sfx/wood_knock_01.wav');
EOF
cat > "$D/src_bersih/Adegan.tsx" <<'EOF'
import {CURVE, dur} from '../lib/curves';
import {MEREK, NETRAL} from './bersama/tema';
const s = interpolate(f, [0, dur(400, 30)], [0.9, 1], {easing: CURVE.land});
const sfx = staticFile('sfx/paper_slide_02.wav');
EOF

echo "== T1 slop-grep"
cek T1a_teks_bersih 0 bash tools/slop-grep.sh "$D/script_bersih.md"
cek T1b_teks_kotor 1 bash tools/slop-grep.sh "$D/script_kotor.md"
cek T1c_kode_kotor 1 bash tools/slop-grep.sh "$D/src_kotor"
cek T1d_kode_bersih 0 bash tools/slop-grep.sh "$D/src_bersih"
cek T1e_v1_tokens 1 bash tools/slop-grep.sh "$V2/../v1/kit/design-tokens.ts"

echo "== T2 VO: v2 vo_master vs v1 loudnorm"
# sinyal mirip ucapan: nada 180 Hz + harmonik, dimodulasi suku kata 4 Hz, jeda tiap 1,5 dtk, + noise pink pelan
SPEECH="sine=f=180:r=48000,volume=0.5[a];sine=f=360:r=48000,volume=0.25[b];sine=f=720:r=48000,volume=0.12[c];[a][b][c]amix=3:normalize=0,tremolo=f=4:d=0.9,volume='if(lt(mod(t,1.5),1.2),1,0.02)':eval=frame"
$FF -f lavfi -i "$SPEECH" -t 12 -ac 1 -ar 24000 -af "volume=-18dB" "$D/vo_pelan.wav"
$FF -f lavfi -i "$SPEECH" -t 12 -ac 1 -ar 24000 -af "volume=20dB" "$D/vo_keras.wav"   # sumber keras ±-12 LUFS
$FF -f lavfi -i "$SPEECH" -t 12 -ac 1 -ar 24000 -af "volume=-18dB,aeval='val(0)+if(lt(mod(t,3),0.002),0.6,0)'" "$D/vo_berpuncak.wav"
cek T2a_pelan_naik 0 bash tools/vo_master.sh "$D/vo_pelan.wav" "$D/vo_pelan_out.wav"
cek T2b_keras_tts_tidak_turun 0 bash tools/vo_master.sh "$D/vo_keras.wav" "$D/vo_keras_out.wav" --sumber tts
cek T2b2_keras_rekaman_hpf_puncak 1 bash tools/vo_master.sh "$D/vo_keras.wav" "$D/vo_keras_out2.wav" --sumber rekaman
cek T2c_berpuncak_tanpa_alasan 1 bash tools/vo_master.sh "$D/vo_berpuncak.wav" "$D/vo_berpuncak_out.wav"
cek T2d_berpuncak_terima 0 bash tools/vo_master.sh "$D/vo_berpuncak.wav" "$D/vo_berpuncak_out2.wav" --terima-pelan "uji: puncak klik sintetis"
$FF -i "$D/vo_keras.wav" -af "highpass=f=80,loudnorm=I=-14:TP=-1.0:LRA=7" -ar 48000 -ac 2 "$D/vo_v1_keras.wav"
cek T2e_v1_loudnorm_keras 1 "$PY" "$MG/gate/voice_level.py" "$D/vo_keras.wav" "$D/vo_v1_keras.wav"
$FF -i "$D/vo_pelan.wav" -af "highpass=f=80,loudnorm=I=-14:TP=-1.0:LRA=7" -ar 48000 -ac 2 "$D/vo_v1_pelan.wav"
cek T2f_v1_loudnorm_pelan 0 "$PY" "$MG/gate/voice_level.py" "$D/vo_pelan.wav" "$D/vo_v1_pelan.wav"

echo "== T3 episode sintetis on-brand + delivery_probe + sg_qc"
EP="$D/ep_baik"; mkdir -p "$EP/remotion/src"
cp "$D/script_bersih.md" "$EP/script.md"; cp kit/contoh/sg001.shotlist.json "$EP/shotlist.json"; cp "$D/src_bersih/Adegan.tsx" "$EP/remotion/src/"
VF="drawbox=x='120+300*sin(t/2)':y=700:w=420:h=420:color=0x2D6BFF:t=fill,drawbox=x=200:y='1100+80*sin(t)':w=680:h=90:color=0x1B2330:t=fill,drawbox=x=200:y=1230:w=520:h=60:color=0x6B7684:t=fill"
$FF -f lavfi -i "color=c=0xE9EDF2:s=1080x1920:r=30:d=56" -vf "$VF" -c:v ffv1 "$D/master.mkv"
$FF -f lavfi -i "$SPEECH" -t 56 -ac 2 -ar 48000 -af "volume=-12dB" "$D/mix_kasar.wav"
bash "$MG/audio/loudness_2pass.sh" "$D/mix_kasar.wav" "$D/mix.wav" --mix-akhir -I -15 -TP -1.5 > "$H/T3_loudness_2pass.log" 2>&1; echo "    loudness_2pass exit $? ($(tail -1 "$H/T3_loudness_2pass.log"))"
$FF -i "$D/master.mkv" -i "$D/mix.wav" -map 0:v -map 1:a \
  -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p,setparams=colorspace=bt709:color_primaries=bt709:color_trc=bt709:range=tv" \
  -c:v libx264 -profile:v high -preset veryfast -crf 18 -maxrate 12M -bufsize 24M -g 15 -bf 2 -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart "$EP/render.mp4"
$FF -i "$D/master.mkv" -i "$D/mix_kasar.wav" -map 0:v -map 1:a -c:v libx264 -crf 18 -c:a aac "$D/render_v1gaya.mp4"
cek T3a_probe_spec 0 "$PY" "$MG/gate/delivery_probe.py" "$EP/render.mp4"
cek T3b_probe_v1gaya 1 "$PY" "$MG/gate/delivery_probe.py" "$D/render_v1gaya.mp4"
G="$D/golden"; mkdir -p "$G"
for t in 5 20 40; do $FF -ss $t -i "$EP/render.mp4" -frames:v 1 "$G/A-$t.png"; done
cat > "$G/golden.json" <<'EOF'
[{"file": "A-5.png", "gaya": "A-kolase", "visual_type": "kolase_hero", "disetujui": "UJI-1", "catatan": "golden sintetis"},
 {"file": "A-20.png", "gaya": "A-kolase", "visual_type": "diagram_rakit", "disetujui": "UJI-1", "catatan": "golden sintetis"},
 {"file": "A-40.png", "gaya": "B-arsip", "visual_type": "arsip_stabilo", "disetujui": null, "catatan": "belum disetujui: harus diabaikan"}]
EOF
cek T3c_sg_qc_baik 0 env SG_GOLDEN="$G" bash tools/sg_qc.sh "$EP" --tanpa-ledger
cek T3d_sg_qc_tanpa_ledger_jobs 1 env SG_GOLDEN="$G" bash tools/sg_qc.sh "$EP"
EPB="$D/ep_pelangi"; mkdir -p "$EPB"; cp "$EP/script.md" "$EP/shotlist.json" "$EPB/"
$FF -f lavfi -i "testsrc2=s=1080x1920:r=30:d=56" -i "$D/mix.wav" -map 0:v -map 1:a -c:v libx264 -pix_fmt yuv420p -crf 23 -c:a aac -ar 48000 "$EPB/render.mp4"
cek T3e_sg_qc_pelangi 1 env SG_GOLDEN="$G" bash tools/sg_qc.sh "$EPB" --tanpa-ledger
grep -h -E "^b0[1-3]|PASS|FAIL" "$EPB/qc/G6_golden.log" | head -5 > "$H/T3e_golden_ringkas.log"
$FF -f lavfi -i "color=c=0xE9EDF2:s=1080x1920:d=1" -frames:v 1 "$D/kosong.png"; mkdir -p "$D/beats_kosong"; for i in $(seq -w 1 15); do cp "$D/kosong.png" "$D/beats_kosong/b$i.png"; done
cek T3f_golden_kosong 1 "$PY" tools/golden_cek.py --shotlist "$EP/shotlist.json" --beats "$D/beats_kosong" --golden "$G" --tema kit/tema.ts --out "$D/golden_kosong"
python3 -c "import json;d=json.load(open('$EP/shotlist.json'));d['gaya']='B-arsip';json.dump(d,open('$D/sl_B.json','w'))"
cek T3g_golden_tanpa_golden 1 "$PY" tools/golden_cek.py --shotlist "$D/sl_B.json" --beats "$EP/qc/beats" --golden "$G" --tema kit/tema.ts --out "$D/golden_B"

echo "== T4 words_align (faster-whisper lokal, suara edubizz-2 15 dtk)"
SRC2="$V2/../riset/referensi-animasi/threads/edubizz-2.mp4"; [ -f "$SRC2" ] || SRC2="$HOME/work/soalnya-gini-studio/riset/referensi-animasi/threads/edubizz-2.mp4"
printf 'Nah, pas sinar matahari kena panel, cahaya itu bawa partikel kecil namanya foton. Foton ini nabrak atom silikon, terus bikin elektronnya lepas dan bergerak. Gerakan elektron inilah yang jadi listrik. Tapi listrik yang dihasilin ini masih listrik.\n' > "$D/naskah_edubizz2.md"
cek T4a_align_medium85 0 "$PY" tools/words_align.py "$SRC2" "$D/naskah_edubizz2.md" "$D/words_e2.json" --model medium --durasi 10 20
cek T4b_align_small_v1ambang95 1 "$PY" tools/words_align.py "$SRC2" "$D/naskah_edubizz2.md" "$D/words_e2b.json" --model small --min-cakupan 0.95 --durasi 10 20
echo '{"beats":[{"beat_id":1,"kt":[{"teks":"silikon"}]},{"beat_id":2,"kt":[{"teks":"listrik"}]}]}' > "$D/kt_ok.json"
echo '{"beats":[{"beat_id":1,"kt":[{"teks":"foton"}]},{"beat_id":2,"kt":[{"teks":"listrik"}]}]}' > "$D/kt_foton.json"
cek T4d_kt_tertangkap 0 "$PY" tools/words_align.py "$SRC2" "$D/naskah_edubizz2.md" "$D/words_e2d.json" --model medium --durasi 10 20 --shotlist "$D/kt_ok.json"
cek T4e_kt_salah_dengar 1 "$PY" tools/words_align.py "$SRC2" "$D/naskah_edubizz2.md" "$D/words_e2e.json" --model medium --durasi 10 20 --shotlist "$D/kt_foton.json"
printf 'Kalau kamu taruh laci uang di tembok, kamu sudah punya ATM.\n' > "$D/naskah_salah.md"
cek T4c_align_naskah_salah 1 "$PY" tools/words_align.py "$SRC2" "$D/naskah_salah.md" "$D/words_e2c.json" --model small --durasi 10 20

echo "== T5 variasi_cek (10 naskah plan)"
mkdir -p "$D/arsip"; python3 - "$V2/../plan/soalnya-gini-10-plan.md" "$D/arsip" <<'EOF'
import re, sys
t = open(sys.argv[1], encoding="utf-8").read()
for i, m in enumerate(re.findall(r"\*\*Naskah VO[^\n]*\n> ([^\n]+)", t), 1):
    open(f"{sys.argv[2]}/hari{i:02d}.md", "w").write(m + "\n")
EOF
echo "    naskah diekstrak: $(ls "$D/arsip" | wc -l)"
for f in "$D"/arsip/*.md; do python3 tools/variasi_cek.py "$f" --arsip "$D/arsip" | grep tertinggi; done > "$H/T5_matriks.log"
cek T5a_tiap_naskah_lolos 0 bash -c "for f in $D/arsip/*.md; do python3 tools/variasi_cek.py \$f --arsip $D/arsip || exit 1; done"
python3 - "$D/arsip/hari01.md" "$D/hari01_daurulang.md" <<'EOF'
import sys
w = open(sys.argv[1]).read().split()
for i, x in [(3, "berdagang"), (12, "pesaing"), (40, "bergeser"), (70, "pindah"), (100, "ramai")]: w[i] = x
open(sys.argv[2], "w").write(" ".join(w))
EOF
cek T5b_daur_ulang_naskah 1 python3 tools/variasi_cek.py "$D/hari01_daurulang.md" --arsip "$D/arsip"
printf '{"episode":"sg001","cap":"Kalau…","gaya":"A-kolase","pilar":"F"}\n{"episode":"sg002","cap":"Kalau…","gaya":"A-kolase","pilar":"J"}\n' > "$D/tayang.jsonl"
echo '{"episode":"sg003","cap":"Kalau…","gaya":"B-arsip","pilar":"E"}' > "$D/meta_sg003.json"
cek T5c_rotasi_cap 1 python3 tools/variasi_cek.py "$D/arsip/hari03.md" --arsip "$D/arsip" --meta "$D/meta_sg003.json" --log "$D/tayang.jsonl"

echo "== T6 beat_frames"
cek T6a_cek_plan_apa_adanya 1 python3 tools/beat_frames.py cek "$D/ep01_dari_plan.shotlist.json"
cek T6b_cek_sg001 0 python3 tools/beat_frames.py cek kit/contoh/sg001.shotlist.json
cek T6c_label 0 python3 tools/beat_frames.py label kit/contoh/sg001.shotlist.json
cek T6d_storyboard 0 python3 tools/beat_frames.py storyboard kit/contoh/sg001.shotlist.json "$EP/qc/beats" "$D/STORYBOARD-uji.md"
cek T6e_schema 0 python3 -c "import json,jsonschema;jsonschema.validate(json.load(open('kit/contoh/sg001.shotlist.json')),json.load(open('kit/shotlist.schema.json')));print('valid')"

python3 -c "import json;d=json.load(open('kit/contoh/sg001.shotlist.json'));d['beats'][1]['maskot'].pop('fungsi');json.dump(d,open('$D/sl_maskot.json','w'))"
cek T6f_maskot_tanpa_fungsi 1 python3 tools/beat_frames.py cek "$D/sl_maskot.json"

echo "== T7 tema_cek (skill-development) atas kit/tema.ts"
mkdir -p "$D/remsrc/bersama" "$D/remsrc_salah/bersama"; cp kit/tema.ts "$D/remsrc/bersama/"; cp "$D/src_bersih/Adegan.tsx" "$D/remsrc/"
cp kit/tema.ts "$D/remsrc_salah/bersama/"; printf "const c = {color: '#7E84E4', fontFamily: 'Oswald', fontSize: 40};\n" > "$D/remsrc_salah/A1.tsx"
cek T7a_tema_lulus 0 python3 "$MG/juri/tema_cek.py" "$D/remsrc"
cek T7b_literal_di_adegan 1 python3 "$MG/juri/tema_cek.py" "$D/remsrc_salah"
cek T7c_motion_lint_bersih 0 python3 "$MG/juri/motion_lint.py" "$D/src_bersih"

echo "== T8 antrean"
A="$D/antrean"; rm -rf "$A"; python3 - "$D/cfg_uji.json" <<'EOF'
import json, sys
c = json.load(open("kit/antrean.config.json")); c["batas"]["kunci_render"] = "/tmp/sg-uji-kunci.lock"
c["batas"]["ram_min_gib_berat"] = 0; c["batas"]["ram_min_gib_ringan"] = 0; c["review"]["antre_maks"] = 2
json.dump(c, open(sys.argv[1], "w"))
EOF
Q="python3 tools/antrean.py --dir $A --config $D/cfg_uji.json"
$Q baru soalnya-gini "Indomaret" >/dev/null; $Q baru soalnya-gini "Mabuk" >/dev/null; $Q baru behindwork "BW ep" >/dev/null
for s in fakta naskah review_naskah; do $Q pindah so001 $s --oleh mesin >/dev/null; done
cek T8a_review_tanpa_irfan 1 $Q pindah so001 suara --oleh mesin
cek T8b_review_oleh_irfan 0 $Q pindah so001 suara --oleh irfan
cek T8c_lompat_tahap 1 $Q pindah so002 naskah --oleh mesin
for s in storyboard review_storyboard; do $Q pindah so001 $s --oleh mesin >/dev/null 2>&1; done
$Q pindah so001 build --oleh irfan >/dev/null; $Q pindah so001 render --oleh mesin >/dev/null
cek T8d_berikut_hilir_dulu 0 bash -c "$Q berikut | tee /dev/stderr | grep -q 'BERIKUT: so001'"
( flock /tmp/sg-uji-kunci.lock sleep 6 ) & sleep 1
cek T8e_render_tunggu_kunci 0 bash -c "$Q berikut | tee /dev/stderr | grep -q 'so001 (render): kunci render dipakai'"
wait
for i in 3 4 5; do $Q baru siirfan "klip $i" >/dev/null; done
for id in si001 si002 si003; do for s in fakta naskah review_naskah; do $Q pindah $id $s --oleh mesin >/dev/null; done; done
cek T8f_stop_the_line 0 bash -c "$Q berikut | tee /dev/stderr | grep -q 'stop-the-line'"
cek T8g_upload_hanya_irfan 1 bash -c "$Q pindah so001 qc --oleh mesin >/dev/null; $Q pindah so001 review_final --oleh mesin >/dev/null; $Q pindah so001 siap_unggah --oleh irfan >/dev/null; $Q pindah so001 tayang --oleh mesin"
$Q status > "$H/T8_status.log" 2>&1

echo "== T9 tts dry-run (tanpa API, tanpa membaca kunci)"
cek T9a_tts_dryrun_ganjil 0 bash -c "python3 tools/tts_gemini.py --input $D/script_bersih.md --out $D/tidak_dibuat.wav --episode sg001 | tee /dev/stderr | grep -q 'sg-perempuan'"
cek T9b_tidak_ada_wav 1 test -f "$D/tidak_dibuat.wav"
cek T9c_giliran_genap 0 bash -c "python3 tools/tts_gemini.py --input $D/script_bersih.md --out $D/tidak_dibuat.wav --episode sg002 | grep -q 'sg-laki'"

echo "== T10 keluaran Gemini Voice Design nyata (vo-uji/, dibuat 25 Nov; tidak ada panggilan API di uji ini)"
VU="$V2/../vo-uji"
for f in "$VU"/ab-*.wav "$VU"/uji-sg-*.wav; do printf '%s ' "$(basename "$f")"; ffmpeg -hide_banner -nostats -i "$f" -af ebur128=peak=true -f null - 2>&1 | sed -n '/Summary:/,$p' | awk '/^ *I:/{i=$2} /^ *LRA:/{l=$2} /^ *Peak:/{p=$2} END{print "I", i, "LRA", l, "TP", p}'; done > "$H/T10_loudness_mentah.log"
cat "$H/T10_loudness_mentah.log" | sed 's/^/    /'
cek T10a_vo_master_perempuan 0 bash tools/vo_master.sh "$VU/ab-sg-perempuan-lisan.wav" "$D/vo_gemini_p.wav" --sumber tts
cek T10b_vo_master_laki_puncak_panas 1 bash tools/vo_master.sh "$VU/ab-sg-laki-lisan.wav" "$D/vo_gemini_l.wav" --sumber tts
printf 'Eh, kalau kamu jualan es di ujung pantai nih, saingan kamu tuh bakal buka persis di sebelahmu. Kok bisa? Soalnya gini... Bayangin deh, pantainya satu kilometer, pembelinya nyebar rata. Nah, penjual yang kiri mikir, kalau aku geser dikit ke tengah, yang di kiri tetep ke aku kan, terus aku dapet bonus orang di tengah juga.\n' > "$D/naskah_lisan.md"
cek T10c_align_gemini_p 0 "$PY" tools/words_align.py "$D/vo_gemini_p.wav" "$D/naskah_lisan.md" "$D/words_gp.json" --model medium --durasi 10 30
cek T10d_align_gemini_l 0 "$PY" tools/words_align.py "$D/vo_gemini_l.wav" "$D/naskah_lisan.md" "$D/words_gl.json" --model medium --durasi 10 30

echo; echo "RINGKASAN: $ok sesuai harapan, $bad tidak sesuai"
