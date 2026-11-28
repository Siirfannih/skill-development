#!/usr/bin/env python3
"""buat_shotlist.py (alat lokal ep01): shotlist.json v2 dari batas beat (waktu suara terpotong) + captions.json. Waktu beat = sumber tunggal."""
import json, re, sys
cap = json.load(open(sys.argv[1])); W = cap["words"]; out = sys.argv[2]
SF = "~/sfx/Epidemic/"
POP = "taktil/glue-stick-dab-on-paper-1a9ef820.wav"
KLIK = "mekanik/led-plastic-button-press-single-ab33e364.wav"
WHOOSH = "air/designed-whoosh-soft-airy-073cf199.wav"
LOGO = "taktil/playing-card-set-down-db3f8c58.wav"
DING = "stab/glockenspiel-single-tone-c3-f93cc6c3.wav"
THUMP = "impact/bass-drop-deep-sub-very-short-01-8df9a95d.wav"
TAP = KLIK
def cue(t, f, p): return {"t": t, "file": SF + f, "pilar": p}
M = lambda k, a, f: {"karakter": "maskot_utama", "aksi": k, "fungsi": f, **a}
B = [
 (0.0, 4.7, "cap_pembuka", "potong", 0, "cap kata + gerobak di ujung kiri; gerobak kedua jatuh di sebelahnya", "membuka lapak", ["gerobak es", "garis pantai"], "push pelan 1,72→1,86 (dunia, CURVE.drift)", [("Kalau", "R6", "T05")], [1.5, 3.3], [cue(0.55, THUMP, "aksen"), cue(3.3, POP, "foley")], None, []),
 (4.7, 6.3, "tanda_tangan_buka", "buka-maskot", 8, "Soalnya gini.", "membuka kardus", ["Gini", "gerobak"], "push-through 1,07 lalu tahan", [("Soalnya gini", "R6", "T12")], [5.7], [cue(4.7, TAP, "transisi"), cue(5.7, LOGO, "aksen")], M("membuka", {"ekspresi": "penasaran"}, "membuka flap: janji 'dibongkar'"), []),
 (6.3, 9.1, "diagram_rakit", "pull-back", 12, "pantai satu kilometer, titik pembeli tersebar rata", "menyebar", ["garis 0–1 km", "titik pembeli"], "pull-back 1,86→1,0 (CURVE.heavy)", [("satu kilometer", "R4", "T08")], [6.6, 7.4], [cue(6.35, WHOOSH, "transisi"), cue(7.0, POP, "foley")], None, ["F0"]),
 (9.1, 13.5, "diagram_rakit", "push-through", 6, "dua gerobak di ¼ dan ¾, bilah wilayah dua warna", "memisah", ["gerobak kiri", "gerobak kanan", "bilah wilayah"], "tahan hidup (drift), hit 1,07", [("seperempat", "R4", "T08")], [9.2, 10.4, 11.5, 12.9], [cue(9.15, WHOOSH, "transisi"), cue(11.5, TAP, "tick"), cue(12.9, TAP, "tick")], None, ["F3"]),
 (13.5, 15.7, "kolase_hero", "potong", 0, "tiap orang memilih yang terdekat: titik pembeli berwarna", "memilih", ["titik pembeli", "gerobak"], "tahan hidup", [("paling dekat", "R2", "T10")], [14.2], [cue(13.6, POP, "foley")], None, ["F0"]),
 (15.7, 18.9, "kolase_tukar", "push-through", 6, "gerobak kiri geser ke tengah", "menggeser", ["gerobak kiri", "bilah wilayah"], "ikut gerobak kiri", [("geser dikit", "R2", "T10")], [16.0, 17.6], [cue(15.75, WHOOSH, "transisi")], M("menunjuk", {"ekspresi": "netral"}, "menunjuk gerobak kiri yang bergeser"), ["F2"]),
 (18.9, 22.8, "kolase_tukar", "potong", 0, "wilayah di tengah ikut tertarik: sorot stabilo", "merebut", ["stabilo", "bilah wilayah"], "tahan hidup", [("sebagian orang", "R2", "T10")], [19.0, 20.3, 21.4], [cue(19.0, POP, "foley")], None, ["F2"]),
 (22.8, 25.4, "kolase_tukar", "push-through", 6, "gerobak kanan ikut geser", "mengejar", ["gerobak kanan"], "ikut gerobak kanan", [("ikut geser", "R2", "T10")], [23.0, 24.4], [cue(22.85, WHOOSH, "transisi")], M("menunjuk", {"ekspresi": "netral"}, "menunjuk gerobak kanan yang menyusul"), ["F2"]),
 (25.4, 30.3, "payoff_oh_gitu", "potong", 0, "keduanya menempel di tengah; Gini oh gitu", "menempel", ["gerobak kiri", "gerobak kanan"], "dorong ke tengah 1,0→1,42 (CURVE.heavy)", [("ketemu di tengah", "R2", "T10"), ("Nempel", "R6", "T05")], [26.0, 27.9, 29.6], [cue(27.0, WHOOSH, "transisi"), cue(29.6, TAP, "tick")], M("melompat", {"ekspresi": "oh_gitu"}, "bereaksi 'oh gitu' saat keduanya menempel"), ["F2"]),
 (30.3, 33.9, "kolase_tukar", "push-through", 6, "gerobak kanan mundur ke ujung, wilayahnya mengecil, lalu kembali", "mundur", ["gerobak kanan", "bilah wilayah"], "tahan 1,42, ikut gerobak kanan", [("mundur ke ujung", "R2", "T10")], [30.9, 32.1, 33.4], [cue(30.35, WHOOSH, "transisi"), cue(33.4, WHOOSH, "transisi")], None, ["F2"]),
 (33.9, 35.7, "kolase_hero", "potong", 0, "tidak ada yang mau mundur: keduanya tetap menempel", "bertahan", ["gerobak kiri", "gerobak kanan"], "tarik mundur 1,42→1,0", [("nggak ada", "R2", "T10")], [34.6], [cue(34.6, POP, "foley")], None, ["F2"]),
 (35.7, 40.1, "angka_kunci", "push-through", 6, "kartu Hotelling · 1929 jatuh dari atas, teks diketik", "mengutip", ["kartu", "siluet"], "kartu mendarat, dunia tetap", [("Hotelling", "R4", "T08"), ("1929", "R6", "T05")], [35.8, 36.3, 38.4], [cue(35.75, WHOOSH, "transisi"), cue(38.8, DING, "aksen")], None, ["F1"]),
 (40.1, 44.3, "potongan_melintang", "push-through", 10, "potongan melintang ke pojok gang: dua minimarket generik jatuh, jalan besar dan sekolah", "memindahkan", ["jalan", "sekolah", "minimarket"], "push-through 1,25→1,0 lalu drift", [("Minimarket", "R4", "T08")], [40.3, 40.65, 42.7, 43.7], [cue(40.1, THUMP, "aksen"), cue(40.3, POP, "foley"), cue(40.65, POP, "foley"), cue(43.0, POP, "foley")], None, ["F5"]),
 (44.3, 46.6, "kolase_hero", "potong", 0, "titik ramai menyala: sekolah, perumahan", "menyalakan", ["sekolah", "perumahan"], "tahan hidup", [("perumahan", "R4", "T08")], [44.3, 44.5, 45.3], [cue(43.9, POP, "foley"), cue(44.5, POP, "foley")], None, ["F5"]),
 (46.6, 49.6, "kolase_tukar", "push-through", 6, "dua minimarket meluncur ke titik yang sama dan menempel", "berebut", ["minimarket", "titik ramai"], "ikut minimarket", [("titik yang sama", "R2", "T10")], [46.7, 48.0], [cue(46.65, WHOOSH, "transisi"), cue(48.0, TAP, "tick")], None, ["F5"]),
 (49.6, 53.0, "diagram_rakit", "push-through", 6, "pembeli di ujung gang berjalan jauh, garis jarak memanjang", "menempuh jarak", ["pembeli", "garis jarak"], "tahan hidup", [("makin jauh", "R2", "T10")], [49.9, 51.6], [cue(49.65, WHOOSH, "transisi")], None, []),
 (53.0, 55.3, "loop_tutup", "pull-back", 10, "tarik mundur ke pantai frame pertama; Gini menutup flap", "menutup", ["pantai", "gerobak", "Gini"], "pull-back 2,3→1,76 (CURVE.land)", [("sebelahan juga", "R4", "T08")], [53.4, 54.2], [cue(53.0, WHOOSH, "transisi"), cue(54.1, TAP, "tick")], M("menutup", {"ekspresi": "netral"}, "menutup flap: jembatan loop ke frame 1"), []),
]
beats = []
for i, (s, e, vt, tr, fr, vis, aksi, objek, kam, kt, per, sfx, mas, fak) in enumerate(B, 1):
    vo = " ".join(w["w"] for w in W if s - 0.05 <= w["s"] < e - 0.05)
    b = {"beat_id": i, "start_sec": s, "end_sec": e, "perubahan_sec": per, "vo_text": vo, "fakta_ids": fak,
         "kt": [{"teks": t_, "peran": p_, "kode": k_, "baris": 1} for t_, p_, k_ in kt], "visual_type": vt,
         "metafora": {"makna": vis, "aksi": aksi, "objek": objek}, "transisi_masuk": {"tipe": tr, "frames": fr},
         "kamera": kam, "sfx": sfx}
    if mas: b["maskot"] = mas
    if i == 12: b["keyframe_sec"] = 39.2   # kartu sudah selesai diketik (1929 mulai 38,4)
    if i == 16: b["keyframe_sec"] = 51.8
    beats.append(b)
sl = {"episode_id": "sg001", "title": "Kenapa Indomaret dan Alfamart selalu sebelahan? – Soalnya Gini", "gaya": "A-kolase", "kartu_kiblat": ["95", "17"],
      "opening_cap": "Kalau…", "pilar": "F", "target_duration_sec": 55.3, "fps": 30, "beats": beats}
json.dump(sl, open(out, "w"), ensure_ascii=False, indent=1)
print(len(beats), "beat")
