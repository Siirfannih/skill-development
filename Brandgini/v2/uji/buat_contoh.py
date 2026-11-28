#!/usr/bin/env python3
"""Membuat dua shotlist uji dari plan Hari 1 (Indomaret–Alfamart):
  uji/data/ep01_dari_plan.shotlist.json  konversi APA ADANYA tabel shot list plan §4 Hari 1 (dipakai untuk uji negatif)
  kit/contoh/sg001.shotlist.json         versi v2: beat <= 5 dtk, perubahan <= 2,2 dtk, transisi bervariasi
Naskah VO diambil persis dari plan (142 kata); tidak ada kalimat baru."""
import json, math
from pathlib import Path

R = Path(__file__).resolve().parent.parent

# (a) plan apa adanya: detik, visual, teks layar. Plan menulis satu keluarga transisi (push-in + potongan melintang, §2.3).
plan = [(0, 3, "Kalau…"), (3, 6, "Soalnya gini"), (6, 10, "1 km"), (10, 14, "¼ · ¾"), (14, 19, "+pembeli"), (19, 24, ""),
        (24, 28, "Nempel."), (28, 33, ""), (33, 37, "Hotelling · 1929"), (37, 44, "Titik ramai terbatas"),
        (44, 50, "Yang rugi: pembeli di ujung"), (50, 56, "Di dekatmu sebelahan juga?")]
a = dict(episode_id="sg001", title="Kenapa Indomaret dan Alfamart selalu sebelahan? – Soalnya Gini", gaya="A-kolase",
         kartu_kiblat=["95"], opening_cap="Kalau…", target_duration_sec=56, fps=30, beats=[])
for i, (s, e, t) in enumerate(plan, 1):
    a["beats"].append(dict(beat_id=i, start_sec=s, end_sec=e, vo_text="(lihat naskah plan)", kt=[{"teks": t, "peran": "R2", "kode": "T01"}] if t else [],
                           visual_type="tanda_tangan_buka" if i == 2 else "kolase_hero", metafora={"makna": "-", "aksi": "-", "objek": ["-"]},
                           transisi_masuk={"tipe": "push-through"}, kamera="push-in", sfx=[]))
(R / "uji/data").mkdir(parents=True, exist_ok=True)
json.dump(a, open(R / "uji/data/ep01_dari_plan.shotlist.json", "w"), ensure_ascii=False, indent=1)

# (b) v2. (start, end, vo, kt[(teks, peran, kode)], visual_type, transisi, fakta, metafora-aksi, objek)
B = [
 (0.0, 3.0, "Kalau kamu jualan es di ujung pantai, saingan kamu bakal buka tepat di sebelahmu.", [("Kalau…", "R6", "T05")], "cap_pembuka", None, [], "membuka lapak", ["gerobak es", "garis pantai"]),
 (3.0, 6.0, "Soalnya gini.", [("Soalnya gini", "R6", "T12")], "tanda_tangan_buka", "buka-maskot", [], "membuka kardus", ["Gini", "gerobak kedua"]),
 (6.0, 10.0, "Bayangin pantai satu kilometer, pembelinya tersebar rata.", [("satu kilometer", "R4", "T08")], "diagram_rakit", "pull-back", ["F0"], "menyebar", ["garis 0–1 km", "titik pembeli"]),
 (10.0, 14.0, "Posisi paling adil, satu penjual di seperempat, satu lagi di tiga perempat.", [("seperempat", "R4", "T08"), ("tiga perempat", "R4", "T08")], "diagram_rakit", "potong", ["F0"], "membagi", ["dua gerobak", "dua wilayah"]),
 (14.0, 17.5, "Tiap orang jalan ke yang paling dekat.", [("paling dekat", "R2", "T03")], "kolase_aksi_kursor", "slide-arah", [], "berjalan", ["pembeli", "panah"]),
 (17.5, 22.0, "Tapi penjual kiri mikir, kalau aku geser dikit ke tengah, aku tetap dapat semua orang di kiri,", [("geser", "R2", "T03")], "kolase_tukar", "match-cut", [], "menggeser", ["gerobak kiri", "wilayah membesar"]),
 (22.0, 25.0, "plus sebagian orang di tengah.", [("di tengah", "R2", "T03")], "diagram_rakit", "potong", [], "merebut", ["wilayah tengah"]),
 (25.0, 29.0, "Penjual kanan nggak mau kalah, ikut geser. Terus, terus, sampai dua-duanya ketemu di tengah.", [("ikut geser", "R2", "T03")], "kolase_tukar", "whip", [], "berkejaran", ["gerobak kanan"]),
 (29.0, 31.0, "Nempel.", [("Nempel.", "R6", "T05")], "payoff_oh_gitu", "potong", [], "menempel", ["dua gerobak", "Gini oh gitu"]),
 (31.0, 35.5, "Kalau salah satu mundur ke ujung, dia langsung kehilangan pembeli di tengah. Jadi nggak ada yang mau mundur.", [("mundur", "R3", "T10")], "diagram_rakit", "pull-back", [], "mundur lalu kembali", ["gerobak", "wilayah mengecil"]),
 (35.5, 39.0, "Ekonom Harold Hotelling menulis pola ini tahun 1929.", [("Hotelling", "R4", "T08"), ("1929", "R4", "T08")], "angka_kunci", "grid-flash", ["F1"], "mencatat", ["kartu ilustrasi Hotelling"]),
 (39.0, 43.5, "Minimarket mirip. Titik yang ramai, dekat jalan besar, sekolah, atau perumahan, jumlahnya terbatas,", [("titik ramai", "R2", "T03")], "kolase_hero", "push-through", ["F2"], "menyala", ["jalan", "sekolah", "perumahan"]),
 (43.5, 47.0, "jadi dua-duanya ngincer titik yang sama. Itu salah satu penjelasannya.", [("titik yang sama", "R3", "T10")], "kolase_hero", "potong", ["F2"], "mendarat", ["dua minimarket generik"]),
 (47.0, 51.0, "Yang rugi pembeli di ujung, jalannya makin jauh.", [("makin jauh", "R3", "T10")], "kolase_aksi_kursor", "slide-arah", [], "berjalan jauh", ["pembeli di ujung", "garis jarak"]),
 (51.0, 56.0, "Di dekat rumahmu, mereka sebelahan juga?", [("sebelahan juga?", "R6", "T12")], "loop_tutup", "pull-back", [], "kembali ke awal", ["garis pantai", "Gini tutup flap"]),
]
b = dict(a, beats=[], pilar="F")
for i, (s, e, vo, kt, vt, tr, fk, aksi, obj) in enumerate(B, 1):
    d = e - s; n = math.ceil(d / 2.0) - 1                           # titik perubahan merata, jarak <= 2,0 dtk
    ch = [round(s + d * k / (n + 1), 2) for k in range(1, n + 1)]
    beat = dict(beat_id=i, start_sec=s, end_sec=e, perubahan_sec=ch, vo_text=vo, fakta_ids=fk,
                kt=[{"teks": t, "peran": p, "kode": c, "baris": 1} for t, p, c in kt], visual_type=vt,
                metafora={"makna": vo.split(",")[0], "aksi": aksi, "objek": obj},
                transisi_masuk={"tipe": tr or "potong", "frames": 0 if tr in (None, "potong") else 8},
                kamera="push pelan 1,00→1,04 (CURVE.drift)" if d > 2 else "diam disengaja (beat 2 dtk)",
                sfx=[{"t": s, "file": "~/sfx/SFXIrfan/<dipilih saat Mix>", "pilar": "transisi" if tr else "aksen"}])
    if vt == "tanda_tangan_buka": beat["maskot"] = {"karakter": "maskot_utama", "aksi": "membuka", "fungsi": "membuka potongan gerobak: janji 'dibongkar'", "ekspresi": "penasaran"}
    if vt == "payoff_oh_gitu": beat["maskot"] = {"karakter": "maskot_utama", "aksi": "menunjuk", "fungsi": "menandai dua gerobak yang menempel"}
    b["beats"].append(beat)
(R / "kit/contoh").mkdir(parents=True, exist_ok=True)
json.dump(b, open(R / "kit/contoh/sg001.shotlist.json", "w"), ensure_ascii=False, indent=1)
words = sum(len(x[2].split()) for x in B)
print(f"plan: {len(a['beats'])} beat · v2: {len(b['beats'])} beat, {words} kata VO")
