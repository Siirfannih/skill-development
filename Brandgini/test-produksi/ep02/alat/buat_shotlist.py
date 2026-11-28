"""Membangun shotlist.json ep02 dari words.json (waktu kata nyata). Tulis ulang bila beat berubah."""
import json, re
W = json.load(open("words.json"))
SF = "~/sfx/SFXIrfan/"
POP = SF + "ES_User Interface, Click, Pops, Glass, UI, Pops - Epidemic Sound.mp3"
WHO = SF + "ES_Swooshes, Whoosh, Big, Cinematic - Epidemic Sound.mp3"
KLK = SF + "ES_User Interface, Click, Button, Double Click, Fast, Phone Tap - Epidemic Sound.mp3"
DNG = SF + "ES_User Interface, Alert, Notification, Message, Text - Epidemic Sound.mp3"
CNF = SF + "ES_User Interface, Click, UI Buttons, Confirm, Menu - Epidemic Sound.mp3"
RIS = SF + "ES_Designed, Riser, Transition, Fast, Short, Clean 01 - Epidemic Sound.mp3"
def norm(s): return re.sub(r"[^a-z]", "", s.lower())
def wt(kata, lo, hi):
    for w in W:
        if lo - 0.05 <= w["s"] < hi and norm(w["w"]) == norm(kata): return w
    raise SystemExit(f"kata KT '{kata}' tidak ada di transkrip {lo}-{hi}")
def kt(b0, b1, teks, peran, kode, mode, baris=1, anchor=None):
    ws = teks.replace("…", "").replace("|", " ").split(); first = wt(anchor or ws[0], b0, b1); last = wt(ws[-1], first["s"] - .01, b1 + 1)
    return {"teks": teks, "peran": peran, "kode": kode, "baris": baris, "mode": mode,
            "mulai_sec": round(first["s"], 2), "akhir_sec": round(min(last["e"] + 0.7, b1 + 0.0), 2)}
# (start,end, visual_type, vo_text, kt, perubahan, makna, aksi, objek, bentuk, transisi, kamera, sfx, maskot, fakta)
B = []
def add(**k): B.append(k)
add(s=0.0, e=2.5, vt="cap_pembuka", vo="Kenapa kamu mabuk di mobil? Sopirnya nggak.", ktl=[("Kenapa…?", "R6", "T04", "settle", None)], ch=[1.3],
    mk="Penumpang pucat, sopir tenang di mobil yang sama", ak="menikung", ob=["mobil tampak samping", "penumpang pucat", "sopir tenang", "jalan"], bt="cutout kolase", tr=("potong", 0), cam="push pelan 1,00→1,05 (CURVE.drift)",
    sfx=[(0.0, POP, "aksen")], mas=None)
add(s=2.5, e=5.52, vt="kolase_tukar", vo="Padahal satu mobil, satu jalan, satu tikungan.", ktl=[("tikungan", "R3", "T01", "rise", None)], ch=[3.5, 4.5],
    mk="Kondisinya sama persis untuk semua orang di mobil", ak="menyamakan", ob=["mobil", "jalan", "tikungan"], bt="tiga benda berurutan", tr=("push-through", 10, "ganti topik ke daftar kondisi"), cam="push-in 1,00→1,06 (CURVE.heavy)",
    sfx=[(2.5, WHO, "transisi"), (3.5, POP, "tick"), (4.5, POP, "tick")], mas=None)
add(s=5.52, e=7.56, vt="tanda_tangan_buka", vo="Kok bisa? Soalnya gini.", ktl=[("Kok bisa?", "R6", "T19", "pop", "kok"), ("Soalnya gini", "R6", "T30", "spin", None)], ch=[6.6],
    mk="Janji membongkar: bagian dalam kepala akan diperlihatkan", ak="membuka potongan kepala", ob=["kepala penumpang", "potongan melintang"], bt="potongan melintang", tr=("push-through", 8, "momen tanda tangan (v3: tanpa maskot)"), cam="push pelan 1,00→1,05",
    sfx=[(5.52, POP, "transisi"), (6.66, KLK, "aksen")], mas=None)
add(s=7.56, e=10.6, vt="potongan_melintang", vo="Di dalam telinga kamu, ada rongga kecil berisi cairan.", ktl=[("cairan", "R2", "T23", "diegetik", None)], ch=[8.8, 9.7],
    mk="Telinga dalam punya rongga berisi cairan", ak="memperbesar", ob=["telinga dalam", "rongga melingkar", "cairan"], bt="potongan melintang", tr=("push-through", 10, "B di dalam A: masuk ke telinga"), cam="push-in 1,00→1,10 masuk ke rongga (CURVE.heavy)",
    sfx=[(7.56, WHO, "transisi"), (9.7, POP, "tick")], mas=None)
add(s=10.6, e=13.44, vt="diagram_rakit", vo="Tiap mobil belok atau ngerem, cairannya ikut goyang.", ktl=[("goyang", "R2", "T28", "flip", None)], ch=[11.8, 12.6],
    mk="Gerakan mobil menggoyang cairan di telinga", ak="menggoyang", ob=["mobil", "rongga", "cairan miring"], bt="sebab-akibat: satu elemen menggerakkan elemen lain", tr=("push-through", 10, "dari dalam telinga ke mobil yang bergerak"), cam="push-in 1,00→1,06",
    sfx=[(10.6, WHO, "transisi"), (12.0, POP, "tick")], mas=None)
add(s=13.44, e=15.58, vt="kolase_hero", vo="Jadi otak tahu nih, badan lagi gerak.", ktl=[("gerak", "R2", "T19", "pop", None)], ch=[14.5],
    mk="Otak menerima laporan gerak dari telinga", ak="melapor", ob=["telinga", "otak", "sinyal biru"], bt="sebab-akibat", tr=("push-through", 10), cam="push pelan 1,00→1,06",
    sfx=[(13.44, WHO, "transisi"), (14.5, POP, "tick")], mas=None)
add(s=15.58, e=18.18, vt="kolase_tukar", vo="Nah, tapi mata kamu lagi lihat HP yang diam.", ktl=[("diam", "R2", "T01", "rise", None)], ch=[16.9],
    mk="Mata melaporkan layar yang diam", ak="menatap", ob=["mata", "layar HP", "sinyal biru kedua"], bt="sebab-akibat", tr=("push-through", 10), cam="push pelan 1,00→1,06",
    sfx=[(15.58, WHO, "transisi"), (16.9, POP, "tick")], mas=None)
add(s=18.18, e=20.38, vt="angka_kunci", vo="Jadi otak dapat dua laporan yang nggak cocok.", ktl=[("nggak cocok", "R3", "T04", "settle", None)], ch=[19.3],
    mk="Dua laporan bertabrakan di otak", ak="bertabrakan", ob=["otak", "dua sinyal", "tanda tanya"], bt="sebab-akibat", tr=("push-through", 10), cam="push-in 1,00→1,07",
    sfx=[(18.18, WHO, "transisi"), (19.3, KLK, "aksen")], mas=None)
add(s=20.38, e=21.6, vt="diagram_rakit", vo="Telinga bilang gerak,", ktl=[("gerak", "R2", "T28", "flip", None)], ch=[20.9], ad="A9a",
    mk="Telinga melaporkan gerak", ak="melapor", ob=["telinga", "panah"], bt="sebab-akibat", tr=("push-through", 10), cam="push pelan 1,00→1,05",
    sfx=[(20.38, WHO, "transisi"), (20.9, POP, "tick")], mas=None)
add(s=21.6, e=22.9, vt="diagram_rakit", vo="mata bilang diam.", ktl=[("diam", "R2", "T28", "flip", None)], ch=[22.1], ad="A9b",
    mk="Mata melaporkan diam, berlawanan dengan telinga", ak="menolak", ob=["mata", "panah berlawanan"], bt="sebab-akibat", tr=("push-through", 10), cam="push pelan 1,00→1,05",
    sfx=[(21.6, WHO, "transisi"), (22.1, POP, "tick")], mas=None)
add(s=22.9, e=25.54, vt="angka_kunci", vo="Salah satu penjelasannya namanya konflik sensorik.", ktl=[("konflik sensorik", "R2", "T01", "rise", None)], ch=[24.0],
    mk="Nama teorinya: konflik sensorik (salah satu penjelasan)", ak="menamai", ob=["otak", "tanda seru", "dua sinyal"], bt="label diegetik", tr=("push-through", 10), cam="push-in 1,00→1,06",
    sfx=[(22.9, WHO, "transisi"), (24.0, DNG, "aksen")], mas=None, fakta=["F1"])
add(s=25.54, e=28.02, vt="kolase_hero", vo="Dan otak membalasnya dengan pusing dan mual.", ktl=[("pusing", "R2", "T19", "pop", None)], ch=[26.8],
    mk="Akibatnya penumpang pusing dan mual", ak="memutar", ob=["kepala penumpang", "spiral pusing", "wajah hijau"], bt="cutout kolase", tr=("push-through", 10), cam="push pelan 1,00→1,06",
    sfx=[(25.54, WHO, "transisi"), (26.8, POP, "tick")], mas=None)
add(s=28.02, e=30.6, vt="kolase_tukar", vo="Sopir beda, loh. Dia yang megang setir dan pedal,", ktl=[("pedal", "R2", "T01", "rise", None)], ch=[29.4],
    mk="Sopir memegang kendali setir dan pedal", ak="mengendalikan", ob=["sopir", "setir", "pedal"], bt="cutout kolase", tr=("push-through", 10, "pindah ke sopir"), cam="push-in 1,00→1,06",
    sfx=[(28.02, WHO, "transisi"), (29.4, POP, "tick")], mas=None)
add(s=30.6, e=33.04, vt="diagram_rakit", vo="jadi dia tahu kapan mobil bakal belok atau ngerem,", ktl=[("tahu kapan", "R2", "T28", "flip", "tahu")], ch=[31.6],
    mk="Sopir tahu duluan kapan mobil belok", ak="menebak", ob=["sopir", "garis tebakan putus-putus", "tikungan"], bt="sebab-akibat", tr=("push-through", 10), cam="push pelan 1,00→1,06",
    sfx=[(30.6, WHO, "transisi"), (31.6, POP, "tick")], mas=None, fakta=["F2"])
add(s=33.04, e=35.9, vt="kolase_hero", vo="sebelum itu kejadian. Otaknya udah nebak duluan,", ktl=[("duluan", "R2", "T19", "pop", None)], ch=[34.4],
    mk="Otak sopir sudah menebak gerakan berikutnya", ak="menebak", ob=["otak sopir", "garis tebakan", "mobil"], bt="sebab-akibat", tr=("push-through", 10), cam="push-in 1,00→1,06",
    sfx=[(33.04, WHO, "transisi"), (34.4, POP, "tick")], mas=None, fakta=["F2"])
add(s=35.9, e=37.9, vt="angka_kunci", vo="dan tebakannya hampir selalu pas.", ktl=[("hampir selalu pas", "R3", "T01", "rise", None)], ch=[36.7],
    mk="Tebakan sopir hampir selalu cocok dengan kenyataan", ak="mencocokkan", ob=["tiga centang", "garis tebakan"], bt="sebab-akibat", tr=("push-through", 10), cam="push pelan 1,00→1,05",
    sfx=[(35.9, WHO, "transisi"), (36.7, CNF, "aksen")], mas=None, fakta=["F2"])
add(s=37.9, e=41.14, vt="kolase_tukar", vo="Penumpang nggak tahu. Apalagi yang duduk di belakang sambil main HP.", ktl=[("nggak tahu", "R3", "T04", "settle", "nggak")], ch=[38.9, 40.0],
    mk="Penumpang tidak bisa menebak, apalagi yang main HP", ak="menunduk", ob=["penumpang belakang", "HP", "jalan tak terlihat"], bt="cutout kolase", tr=("push-through", 10, "pindah ke penumpang belakang"), cam="push-in 1,00→1,06",
    sfx=[(37.9, WHO, "transisi"), (39.0, POP, "tick")], mas=None)
add(s=41.14, e=43.72, vt="kolase_hero", vo="Tiap rem mendadak itu kejutan buat otaknya.", ktl=[("kejutan", "R2", "T30", "spin", None)], ch=[42.2],
    mk="Rem mendadak = kejutan untuk otak penumpang", ak="menyentak", ob=["badan tersentak", "mobil mengerem", "tanda seru"], bt="cutout kolase", tr=("push-through", 10), cam="push-in cepat 1,00→1,08 (CURVE.whip)",
    sfx=[(41.14, WHO, "transisi"), (42.2, KLK, "aksen")], mas=None, fakta=["F0"])  # F0: lint angka salah cocok "juta" di "kejutan" (bug beat_frames.py)
add(s=43.72, e=45.6, vt="diagram_rakit", vo="Makin sering tebakannya meleset,", ktl=[("meleset", "R2", "T01", "rise", None)], ch=[44.6], ad="A18a",
    mk="Makin sering tebakan meleset", ak="menaikkan", ob=["meter meleset"], bt="grafik meter", tr=("push-through", 10), cam="push pelan 1,00→1,05",
    sfx=[(43.72, WHO, "transisi"), (44.6, RIS, "aksen")], mas=None)
add(s=45.6, e=46.62, vt="diagram_rakit", vo="makin gampang mual.", ktl=[("mual", "R2", "T01", "rise", None)], ch=[46.0], ad="A18b",
    mk="Meter mual ikut naik", ak="menaikkan", ob=["meter meleset penuh", "meter mual"], bt="grafik meter", tr=("push-through", 10), cam="push pelan 1,00→1,05",
    sfx=[(45.6, WHO, "transisi"), (46.0, POP, "tick")], mas=None)
add(s=46.62, e=49.84, vt="payoff_oh_gitu", vo="Makanya duduk di depan sambil lihat jalan, sering terasa lebih enak.", ktl=[("lihat jalan", "R3", "T28", "flip", "lihat")], ch=[47.6, 48.7],
    mk="Duduk di depan dan melihat jalan sering terasa lebih enak", ak="pindah dan melihat", ob=["penumpang di depan", "jalan"], bt="cutout kolase", tr=("push-through", 10, "pindah ke jok depan"), cam="push-in 1,00→1,06",
    sfx=[(46.62, WHO, "transisi"), (48.7, POP, "aksen")], mas=None, fakta=["F4"])
add(s=49.84, e=53.7, vt="loop_tutup", vo="Kamu tim mabuk atau tim tidur di mobil?", ktl=[("tim mabuk atau|tim tidur?", "R3", "T01", "rise", "tim")], ch=[51.0, 52.3],
    mk="Pertanyaan penutup mengembalikan ke tikungan awal", ak="menutup", ob=["mobil di tikungan"], bt="cutout kolase", tr=("push-through", 10, "kembali ke frame 1 (loop)"), cam="push balik 1,06→1,00",
    sfx=[(49.84, WHO, "transisi"), (52.6, POP, "aksen")], mas=None)
ORD = [1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,19,20]
beats = []
for i, k in enumerate(B, 1):
    b = {"adegan": k.get("ad") or f"A{ORD.pop(0)}", "beat_id": i, "start_sec": k["s"], "end_sec": k["e"], "perubahan_sec": k["ch"], "vo_text": k["vo"], "fakta_ids": k.get("fakta", []),
         "kt": [kt(k["s"], k["e"], *x[:5][0:1], *x[1:4], anchor=x[4]) if False else kt(k["s"], k["e"], x[0], x[1], x[2], x[3], 1, x[4]) for x in k["ktl"]],
         "visual_type": k["vt"], "metafora": {"makna": k["mk"], "aksi": k["ak"], "objek": k["ob"], "bentuk": k["bt"]},
         "transisi_masuk": {"tipe": k["tr"][0], "frames": k["tr"][1], **({"alasan": k["tr"][2]} if len(k["tr"]) > 2 else {})},
         "kamera": k["cam"], "sfx": [{"t": t, "file": f, "pilar": p} for t, f, p in k["sfx"]]}
    kt0 = min(x["mulai_sec"] for x in b["kt"]); d = k["e"] - k["s"]
    b["keyframe_sec"] = round(min(k["e"] - 0.1, max(k["s"] + min(max(0.6, 0.55 * d), d - 0.1), kt0 + 0.45)), 2)
    if k["mas"]: b["maskot"] = dict(zip(["karakter", "aksi", "fungsi", "ekspresi"], k["mas"]))
    if k["s"] == 5.52:   # beat 3: "Kok bisa?" tampil dulu, hilang sebelum "Soalnya gini" (6,66 dtk)
        b["kt"][0]["tahan_sec"] = 0.95
    beats.append(b)
sl = {"episode_id": "sg002", "title": "Kenapa kamu mabuk di mobil, sopirnya nggak? – Soalnya Gini", "gaya": "A-kolase", "kartu_kiblat": ["95", "88", "65"],
      "opening_cap": "Kenapa…", "pilar": "C", "target_duration_sec": 53.7, "fps": 30, "beats": beats}
json.dump(sl, open("shotlist.json", "w"), ensure_ascii=False, indent=1)
print(len(beats), "beat")
