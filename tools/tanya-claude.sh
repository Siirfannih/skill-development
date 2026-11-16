#!/bin/bash
# Codex (atau model lain) minta pendapat Claude untuk satu video, tanpa Claude membaca kode atau seluruh repo.
#
#   tools/tanya-claude.sh <folder proyek> <pertanyaan.md> [gambar/still …]
#
# Claude menerima dosir yang DIRAKIT OTOMATIS dari dokumen arah yang memang sudah ditulis di awal setiap video
# (gerbang brief → kiblat → resep → storyboard), jadi tidak ada dokumen baru yang harus dibuat:
#   1. claude/motion-graphic/LANTAI.md         mutu minimum semua video (bagian skill-development yang menilai hasil)
#   2. kartu kiblat dari baris "Kartu:" di RESEP.md   gaya video ini (warna, huruf, ritme, teknik)
#   3. RESEP.md                                resep 8 bagian video ini + syarat dari prompt Irfan
#   4. DECISIONS.md, hanya baris berstatus Aktif   koreksi/keputusan Irfan untuk video ini
#   5. STATUS.md                               posisi kerja sekarang
#   6. handoff/KONSUL.md (opsional)            catatan tambahan penanya: yang sudah dicoba dan gagal, dsb.
# Ditambah pertanyaan + still yang dilampirkan (dibuka dengan Read). Claude tidak membaca kode.
# Jawaban: handoff/konsul/<n>-jawaban.md · pemakaian token: handoff/konsul/konsul.jsonl.
#
# Sesi: satu sesi Claude DILANJUTKAN (--resume) hanya bila panggilan sebelumnya < KONSUL_HANGAT dtk lalu (bawaan 270,
# cache prompt masih hangat) DAN konteksnya < KONSUL_MAKS token (bawaan 120000). Selain itu sesi baru dari dosir.
# Kenapa tidak satu sesi sepanjang video: setiap panggilan mengirim ulang SELURUH riwayat sesi ke model; cache prompt
# hanya bertahan ±5 menit, sedangkan jarak antar-revisi video 30+ menit, jadi sesi panjang membayar riwayatnya penuh
# berulang kali dan terus membesar (lead Claude rata-rata ±370 ribu token per respons; laporan investigasi 24 jam,
# 16 Nov). Ingatan proyek disimpan di file (KONSUL.md, DECISIONS.md), bukan di riwayat chat.
#
# Lingkungan: CLAUDE_CONFIG_DIR (akun, mis. ~/.claude-2 di PC), KONSUL_MODEL (mis. opus), KONSUL_BARU=1 paksa sesi baru.
set -uo pipefail
[ $# -ge 2 ] || { sed -n '2,18p' "$0"; exit 1; }
P="$(cd "$1" && pwd)"; Q="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"; shift 2
D="$P/handoff/konsul"; mkdir -p "$D"; DOS="$P/handoff/KONSUL.md"; ST="$D/.sesi"
[ -f "$P/RESEP.md" ] || { echo "GAGAL: $P/RESEP.md belum ada. Arah video (kiblat + resep) harus ditulis dan disetujui sebelum minta pendapat Claude."; exit 1; }
REPO="$(cd "$(dirname "$0")/.." && pwd)"
dosir() {  # rakit dosir dari dokumen arah proyek; urutan tetap (LANTAI dulu) supaya awalan prompt sama dan ter-cache
  python3 - "$REPO" "$P" <<'PY'
import glob, os, re, sys
repo, p = sys.argv[1:3]
def baca(path): return open(path, encoding="utf-8").read().strip() if path and os.path.exists(path) else ""
resep = baca(os.path.join(p, "RESEP.md"))
m = re.search(r"Kartu:\*{0,2}\s*`([^`]+)`", resep)
kartu = ""
if m:
    cand = glob.glob(os.path.join(repo, "claude/motion-graphic/pustaka/kartu", os.path.basename(m.group(1))))
    kartu = baca(cand[0]) if cand else ""
dec = "\n".join(l for l in baca(os.path.join(p, "DECISIONS.md")).splitlines() if re.match(r"^\| [RD]-\d+ \|", l) and "Aktif" in l)
bag = [("LANTAI (mutu minimum semua video)", baca(os.path.join(repo, "claude/motion-graphic/LANTAI.md"))),
       ("KARTU KIBLAT video ini", kartu or "(tidak ditemukan dari baris Kartu: di RESEP.md)"),
       ("RESEP video ini", resep), ("KEPUTUSAN & CATATAN IRFAN YANG AKTIF", dec or "(belum ada)"),
       ("STATUS", baca(os.path.join(p, "STATUS.md"))), ("CATATAN PENANYA", baca(os.path.join(p, "handoff/KONSUL.md")))]
print("\n\n".join(f"=== {judul} ===\n{isi}" for judul, isi in bag if isi))
PY
}
[ -f "$Q" ] || { echo "GAGAL: pertanyaan $Q tidak ada"; exit 1; }
HANGAT="${KONSUL_HANGAT:-270}"; MAKS="${KONSUL_MAKS:-120000}"
imgs=""; for g in "$@"; do [ -f "$g" ] && imgs+="- $(cd "$(dirname "$g")" && pwd)/$(basename "$g")"$'\n' || echo "AWAS: lampiran tidak ada: $g"; done

lanjut=""
if [ -z "${KONSUL_BARU:-}" ] && [ -f "$ST" ]; then
  read -r sid t ctx < "$ST"
  if [ $(( $(date +%s) - t )) -lt "$HANGAT" ] && [ "$ctx" -lt "$MAKS" ]; then lanjut="$sid"; fi
fi
n=$(( $(ls "$D"/*-jawaban.md 2>/dev/null | wc -l) + 1 )); OUTF="$D/$(printf '%02d' "$n")-jawaban.md"

if [ -n "$lanjut" ]; then
  prompt="Pertanyaan lanjutan untuk video yang sama.

$(cat "$Q")
${imgs:+
Lampiran (buka dengan Read):
$imgs}"
else
  prompt="Kamu sutradara visual dan juri untuk satu video motion milikku. Kamu TIDAK membaca kode atau repo: yang kamu
nilai hanya dosir, pertanyaan, dan gambar yang dilampirkan. Jawab ringkas dalam bahasa Indonesia:
1) putusan (setuju / ubah / tolak), 2) alasan visual (hierarki, logika visual, keterbacaan, emosi adegan),
3) perubahan konkret yang bisa langsung dikerjakan builder (posisi, ukuran, warna, kurva, timing dalam frame),
4) risiko bila diterapkan. Bila informasinya kurang untuk memutuskan, katakan apa yang kurang, jangan menebak.

Urutan yang menang bila bertentangan: catatan Irfan yang aktif > resep + kartu kiblat > LANTAI > pendapatmu.
Usulanmu tidak boleh melanggar keputusan aktif; bila menurutmu keputusan itu salah, tulis sebagai catatan terpisah.

$(dosir)

=== PERTANYAAN ===
$(cat "$Q")
${imgs:+
=== LAMPIRAN (buka dengan Read) ===
$imgs}"
fi

args=(-p "$prompt" --output-format json --allowedTools Read --add-dir "$P")
[ -n "$lanjut" ] && args+=(--resume "$lanjut")
[ -n "${KONSUL_MODEL:-}" ] && args+=(--model "$KONSUL_MODEL")
t0=$(date +%s)
raw="$(claude "${args[@]}" 2>"$D/.stderr")"; rc=$?
printf '%s' "$raw" > "$D/.raw.json"
python3 - "$OUTF" "$ST" "$D/konsul.jsonl" "$Q" "$t0" "${lanjut:-baru}" "$D/.raw.json" <<'P' || { echo "GAGAL memanggil claude (rc $rc)"; tail -5 "$D/.stderr"; exit 1; }
import json, sys, time
out, st, led, q, t0, mode, raw = sys.argv[1:8]
try:
    d = json.loads(open(raw, encoding="utf-8").read())
except ValueError:
    sys.exit(1)
u = d.get("usage") or {}
ctx = sum(int(u.get(k) or 0) for k in ("input_tokens", "cache_creation_input_tokens", "cache_read_input_tokens"))
if d.get("is_error"):
    print("GAGAL dari claude:", d.get("result")); sys.exit(1)
open(out, "w", encoding="utf-8").write(f"<!-- pertanyaan: {q} · sesi: {d.get('session_id')} ({mode}) -->\n\n{d.get('result', '')}\n")
open(st, "w").write(f"{d.get('session_id')} {int(time.time())} {ctx}\n")
row = {"waktu": time.strftime("%F %T"), "sesi": d.get("session_id"), "mode": "lanjut" if mode != "baru" else "baru",
       "detik": int(time.time()) - int(t0), "konteks": ctx, "cache_baca": int(u.get("cache_read_input_tokens") or 0),
       "keluaran": int(u.get("output_tokens") or 0), "pertanyaan": q, "jawaban": out}
open(led, "a").write(json.dumps(row, ensure_ascii=False) + "\n")
print(f"jawaban {out} · sesi {row['mode']} · konteks {ctx} token · {row['detik']} dtk")
P
