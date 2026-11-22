"""Ep01 Jensen Huang · Rewind · Story Cinematic (storyboard/ep01, RESEP racikan ep01, D-02..D-22)."""
ID = "Ep01"
VO = "/mnt/storage-projects/behindwork-batch-1/ep01/vo/rakit_v2"
VO_BEATS = f"{VO}/vo_beats.json"
VO_WORDS = f"{VO}/vo_words.json"
VO_SRC = "ep01/vo.wav"
SUB_MD = "/home/irfan/work/skill-development/projects/behindwork-batch-1/vo/ep01_subtitle_id.md"
DURASI_TAMBAH = 0.7
E = "ep01/"


def K(w_, t, **kw):  # satu kata KT
    d = {"w": w_, "t": t}; d.update(kw); return d


def adegan(w):
    b = w.beat
    A = []
    def a(id_, dari, sampai, lapisan, **kw):
        d = {"id": id_, "dari": round(dari, 3), "sampai": round(sampai, 3), "lapisan": lapisan}; d.update(kw); A.append(d)
    t_its = w("It's", "01")
    # 01 hook: panggung GTC lebar -> Jensen berjalan (gerak lambat) -> kartu hitam
    a("01a", 0, w("Before", "01"), [{"k": "video", "src": E + "keynote.mp4", "mulaiSumber": 0.0, "laju": 0.8, "kb": {"s0": 1.0, "s1": 1.06, "kurva": "heavy"}}])
    a("01b", w("Before", "01"), t_its, [{"k": "gambar", "src": E + "p01b_keynote.jpg", "kb": {"s0": 1.02, "s1": 1.1, "x0": 0, "x1": 60, "kurva": "heavy"}}])
    a("01c", t_its, b["02"]["mulai"], [{"k": "kartu", "warna": "malam"}])
    # 02 jaket kulit, dekat; kilat negatif 4 frame terakhir = pintu ke masa lalu
    a("02", b["02"]["mulai"], b["03"]["mulai"], [{"k": "gambar", "src": E + "p02_keynote_dekat.jpg", "kb": {"s0": 1.03, "s1": 1.1, "x0": -20, "x1": -50, "kurva": "heavy"}}],
      invert=[round(b["03"]["mulai"] - 0.14, 3), b["03"]["mulai"]])
    # 03 rewind: hitam, tahun raksasa berputar mundur, irisan footage panggung + garis tracking pita
    a("03", b["03"]["mulai"], b["04"]["mulai"], [{"k": "kartu", "warna": "malam"},
      {"k": "irisan", "src": E + "keynote.mp4", "video": True, "mulaiSumber": 6.0, "clip": "inset(0 0 0 86%)", "geser": 30},
      {"k": "irisan", "src": E + "keynote.mp4", "video": True, "mulaiSumber": 3.0, "clip": "inset(62% 72% 12% 0)", "geser": -24},
      {"k": "tracking"}])
    t_board = w("boarding", "04")
    a("04a", b["04"]["mulai"], t_board, [{"k": "kartu", "warna": "malam"},
      {"k": "inset", "src": E + "oneida.mp4", "video": True, "mulaiSumber": 0.4, "x": 300, "y": 190, "w": 560, "h": 700, "grade": "bwwarm", "pos": "50% 12%", "masuk": "bawah", "kb": {"s0": 1.0, "s1": 1.03}}])
    a("04b", t_board, b["05"]["mulai"], [{"k": "gambar", "src": E + "p04_obi.jpg", "grade": "bwwarm", "pos": "50% 0%", "kb": {"s0": 1.0, "s1": 1.08, "y0": 0, "y1": 20, "kurva": "heavy"}}])
    t_and = w("And", "05")
    a("05a", b["05"]["mulai"], t_and, [{"k": "kartu", "warna": "kertas"}])
    a("05b", t_and, b["06"]["mulai"], [{"k": "kartu", "warna": "malam"}])
    # 06 quote cut: video Stanford sinkron dengan audio quote (segmen 3,95–5,20 lalu 7,00–)
    t6 = b["06"]["mulai"]
    a("06a", t6, t6 + 1.31, [{"k": "video", "src": E + "stanford_toilet_lebar.mp4", "mulaiSumber": 3.95, "kb": {"s0": 1.6, "s1": 1.63, "x0": 72, "x1": 72, "y0": 330, "y1": 330}}])
    a("06b", t6 + 1.31, b["07"]["mulai"], [{"k": "video", "src": E + "stanford_toilet_lebar.mp4", "mulaiSumber": 6.94, "kb": {"s0": 1.63, "s1": 1.78, "x0": 72, "x1": 60, "y0": 330, "y1": 390, "kurva": "heavy"}}])
    t_not = w("Not", "07")
    a("07a", b["07"]["mulai"], t_not, [{"k": "gambar", "src": E + "p07_dennys_sign.jpg", "pos": "50% 40%", "kb": {"s0": 1.0, "s1": 1.05, "kurva": "heavy"}}])
    a("07b", t_not, b["08"]["mulai"], [{"k": "kartu", "warna": "malam"},
      {"k": "inset", "src": E + "fortune.mp4", "video": True, "mulaiSumber": 9.0, "laju": 0.58, "zoom": 1.32, "x": 300, "y": 190, "w": 560, "h": 700, "pos": "50% 40%", "masuk": "bawah", "kb": {"s0": 1.0, "s1": 1.03}}])
    t8 = b["08"]["mulai"]
    a("08", t8, b["09"]["mulai"], [{"k": "video", "src": E + "stanford_dish.mp4", "mulaiSumber": 2.65, "kb": {"s0": 1.6, "s1": 1.7, "x0": -35, "x1": -40, "y0": 330, "y1": 360, "kurva": "heavy"}}])
    t_then = w("then", "09")
    a("09a", b["09"]["mulai"], t_then, [{"k": "kartu", "warna": "malam"}])
    a("09b", t_then, b["10"]["mulai"], [{"k": "gambar", "src": E + "p09_wafer.jpg", "grade": "blur", "kb": {"s0": 1.04, "s1": 1.12, "kurva": "heavy"}}])
    t_he = w("he", "10")
    a("10a", b["10"]["mulai"], t_he, [{"k": "gambar", "src": E + "p10_booth_selektif.jpg", "pos": "50% 30%", "kb": {"s0": 1.0, "s1": 1.07, "x1": 40, "y1": 25, "kurva": "heavy"}},
      {"k": "potong", "src": E + "p10_jensen_potong.png", "pos": "50% 30%", "kb": {"s0": 1.0, "s1": 1.07, "x1": 40, "y1": 25, "kurva": "heavy"}}])
    a("10b", t_he, b["11"]["mulai"], [{"k": "kartu", "warna": "malam"},
      {"k": "inset", "src": E + "p10_plaque.jpg", "x": 1010, "y": 150, "w": 700, "h": 780, "rot": 3, "masuk": "kanan", "kb": {"s0": 1.0, "s1": 1.12, "x1": -220, "y1": 40, "kurva": "heavy"}}])
    a("11", b["11"]["mulai"], b["12"]["mulai"], [{"k": "belah",
      "kiri": [{"k": "gambar", "src": E + "p04_obi.jpg", "grade": "bwwarm", "pos": "50% 62%", "kb": {"s0": 1.0, "s1": 1.06, "x1": 30}}],
      "kanan": [{"k": "gambar", "src": E + "p11_keynote_kampus.jpg", "kb": {"s0": 1.0, "s1": 1.06, "x1": -30}}]}])
    t_if = w("If", "12")
    a("12a", b["12"]["mulai"], t_if, [{"k": "kartu", "warna": "kertas"}])
    a("12b", t_if, b["13"]["mulai"], [{"k": "video", "src": E + "keynote.mp4", "mulaiSumber": 0.0, "laju": 0.5, "kb": {"s0": 1.0, "s1": 1.08, "y1": 20, "kurva": "heavy"}}])
    a("13", b["13"]["mulai"], b["13"]["selesai"] + DURASI_TAMBAH, [{"k": "gambar", "src": E + "p13_booth_abu.jpg", "grade": "gelap", "pos": "50% 30%", "kb": {"s0": 1.0, "s1": 1.05, "kurva": "drift"}}])
    return A


def kt(w):
    b = w.beat; T = []
    def k(**kw): T.append(kw)
    e1 = w("It's", "01")
    k(peran="r1", dari=w("heard", "01"), sampai=w("Before", "01"), x=230, y=420, bayang=True,
      kata=[K("heard", w("heard", "01")), K("this one", w("this", "01"), baris=1)])
    k(peran="lead", dari=w("Jensen", "01"), sampai=e1, x=1130, y=360, bayang=True, kata=[K("Jensen Huang", w("Jensen", "01"))])
    k(peran="r2", dari=w("car", "01"), sampai=e1, x=1124, y=460, teks="a car wash", bayang=True)
    k(peran="lead", dari=w("nice", "01"), sampai=w("but", "01"), x=960, y=470, jangkar="tengah", kata=[K("a nice story", w("nice", "01"))])
    k(peran="lead", dari=w("but", "01"), sampai=b["02"]["mulai"], x=960, y=390, jangkar="tengah", kata=[K("but", w("but", "01"))])
    k(peran="r2", dari=w("not", "01"), sampai=b["02"]["mulai"], x=960, y=490, jangkar="tengah", teks="not how it happened")
    k(peran="r1", dari=w("leather", "02"), sampai=b["03"]["mulai"], x=1150, y=420, bayang=True, kata=[K("leather", w("leather", "02")), K("jacket", w("jacket", "02"), baris=1)])
    k(peran="r2", dari=w("lot", "02"), sampai=b["03"]["mulai"], x=1144, y=640, teks="a lot harder", bayang=True)
    k(peran="lead", dari=w("rewind", "03"), sampai=b["04"]["mulai"], x=960, y=170, jangkar="tengah", kata=[K("rewind", w("rewind", "03"))])
    k(peran="giant", dari=w("rewind", "03"), sampai=b["04"]["mulai"], x=960, y=300, jangkar="tengah", angka={"dari": 2026, "ke": 1972, "durasi": round(w("1972", "03") - w("rewind", "03"), 2)})
    k(peran="r2", dari=w("nine", "04"), sampai=w("boarding", "04"), x=930, y=430, teks="nine years old")
    k(peran="lead", dari=w("uncle", "04"), sampai=w("boarding", "04"), x=936, y=600, kata=[K("his uncle", w("His", "04"))])
    k(peran="kotak", dari=w("Kentucky", "04"), sampai=w("prestigious", "04"), x=960, y=380, jangkar="tengah", teks="Kentucky")
    k(peran="kotak", dari=w("prestigious", "04"), sampai=w("tough", "04"), x=960, y=380, jangkar="tengah", teks="prestigious?")
    k(peran="kotak", dari=w("tough", "04"), sampai=b["05"]["mulai"], x=960, y=380, jangkar="tengah", teks="a tough boarding school")
    k(peran="lead", dari=w("daily", "05"), sampai=w("toilets", "05"), x=960, y=420, jangkar="tengah", warna="tinta", kata=[K("daily chore", w("daily", "05"))])
    k(peran="r2", dari=w("toilets", "05"), sampai=w("And", "05"), x=960, y=280, jangkar="tengah", warna="tinta", teks="toilets")
    k(peran="r6", dari=w("hundred", "05"), sampai=w("And", "05"), x=960, y=470, jangkar="tengah", warna="tinta", teks="a hundred boys", aksen="hundred", ukuran=170)
    k(peran="lead", dari=w("roommate", "05"), sampai=b["06"]["mulai"], x=960, y=320, jangkar="tengah", kata=[K("his roommate", w("his", "05", 2))])
    k(peran="r6", dari=w("17", "05"), sampai=b["06"]["mulai"], x=960, y=430, jangkar="tengah", teks="17", ukuran=300)
    t6 = b["06"]["mulai"]
    k(peran="r1", dari=w("I", "06"), sampai=t6 + 1.31, x=1180, y=330, bayang=True, kata=[K("I used to", w("I", "06")), K("clean toilets", w("clean", "06"), baris=1)])
    k(peran="lead", dari=w("more", "06"), sampai=b["07"]["mulai"], x=1160, y=330, bayang=True, kata=[K("more toilets than", w("more", "06"))])
    k(peran="r2", dari=w("all", "06"), sampai=b["07"]["mulai"], x=1150, y=440, teks="all of you", bayang=True)
    k(peran="r2", dari=w("combined", "06"), sampai=b["07"]["mulai"], x=1150, y=570, teks="combined", bayang=True)
    k(peran="r2", dari=w("15", "07"), sampai=w("Not", "07"), x=1755, y=790, jangkar="kanan", teks="at 15", bayang=True)
    k(peran="r1", dari=w("Not", "07"), sampai=b["08"]["mulai"], x=990, y=250, kata=[K("not washing cars", w("Not", "07"), redup=True),
      K("washing dishes", w("washing", "07", 2), baris=1), K("busboy", w("busboy", "07"), baris=2)])
    k(peran="r2", dari=w("waiter", "07"), sampai=b["08"]["mulai"], x=984, y=560, teks="waiter")
    k(peran="lead", dari=w("probably", "08"), sampai=b["09"]["mulai"], x=1180, y=320, bayang=True, kata=[K("Denny's best", w("probably", "08"))])
    k(peran="r2", dari=w("dishwasher", "08"), sampai=b["09"]["mulai"], x=1174, y=420, teks="dishwasher", bayang=True)
    k(peran="r1", dari=w("he", "09"), sampai=w("He", "09", 1) if False else w("studied", "09"), x=960, y=380, jangkar="tengah",
      kata=[K("he didn't stay", w("he", "09")), K("in the kitchen", w("in", "09"), baris=1)])
    k(peran="r2", dari=w("electrical", "09"), sampai=w("then", "09"), x=960, y=430, jangkar="tengah", teks="electrical engineering", ukuran=110)
    k(peran="lead", dari=w("nine", "09"), sampai=b["10"]["mulai"], x=960, y=230, jangkar="tengah", kata=[K("nine years", w("nine", "09"))])
    k(peran="r2", dari=w("AMD", "09"), sampai=b["10"]["mulai"], x=960, y=380, jangkar="tengah", teks="AMD", warna="redup")
    k(peran="r6", dari=w("LSI", "09"), sampai=b["10"]["mulai"], x=960, y=520, jangkar="tengah", teks="LSI Logic")
    k(peran="r6", dari=w("1993", "10"), sampai=w("he", "10"), x=500, y=210, teks="1993", ukuran=330, belakang=True)
    k(peran="lead", dari=w("Denny's", "10"), sampai=w("he", "10"), x=512, y=150, kata=[K("Denny's, San Jose", w("Denny's", "10"))], bayang=True)
    k(peran="r1", dari=w("two", "10"), sampai=b["11"]["mulai"], x=230, y=420, kata=[K("two", w("two", "10")), K("colleagues", w("colleagues", "10"), baris=1)])
    k(peran="kotak", dari=w("toilets", "11"), sampai=b["12"]["mulai"], x=480, y=380, jangkar="tengah", teks="toilets")
    k(peran="r2", dari=w("most", "11"), sampai=b["12"]["mulai"], x=1440, y=790, jangkar="tengah", teks="most valuable", ukuran=104, bayang=True)
    k(peran="r1", dari=w("lesson", "12"), sampai=w("No", "12"), x=960, y=470, jangkar="tengah", warna="tinta", kata=[K("the lesson", w("the", "12"))])
    k(peran="lead", dari=w("No", "12"), sampai=w("If", "12"), x=960, y=370, jangkar="tengah", warna="tinta", kata=[K("no job is", w("No", "12"))])
    k(peran="r6", dari=w("too", "12"), sampai=w("If", "12"), x=960, y=470, jangkar="tengah", warna="tinta", teks="too small", aksen="small")
    k(peran="r2", dari=w("top", "12"), sampai=b["13"]["mulai"], x=960, y=790, jangkar="tengah", teks="to the top", bayang=True)
    k(peran="r2", dari=w("your", "13"), sampai=b["13"]["selesai"] + DURASI_TAMBAH, x=960, y=420, jangkar="tengah", teks="your first job?")
    k(peran="lead", dari=w("Tell", "13"), sampai=b["13"]["selesai"] + DURASI_TAMBAH, x=960, y=590, jangkar="tengah", kata=[K("tell me in the comments", w("Tell", "13"))])
    return T


def EKSTRA_SFX(w):
    b = w.beat
    return [
        {"t": round(b["12"]["mulai"] - 1.45, 3), "file": "sfx/riser_cymbal.wav", "gain": -15, "pilar": "aksen", "peran": "riser menuju pelajaran"},
        {"t": w("too", "12"), "file": "sfx/sub_drop.wav", "gain": -10, "pilar": "aksen", "peran": "pelajaran mendarat (sub drop)"},
        {"t": w("NVIDIA", "10"), "file": "sfx/impact_thud.wav", "gain": -12, "pilar": "aksen", "peran": "NVIDIA lahir"},
        {"t": 0.0, "file": "sfx/glitch_cut.mp3", "gain": -16, "pilar": "aksen", "peran": "frame 0: gebrakan bunyi (Lantai D22c)"},
    ]


MUSIK = [
    # musik per babak (Lantai E25), dipilih music_fit.py terhadap VO ep01: tegang -> energi -> hangat; level jeda ±-21 LUFS, di-duck saat ucapan
    {"file": "musik/musik-freesound-51252.mp3", "dari": 0.0, "sampai": 40.14, "gain": -10.1, "fadeIn": 0.05, "fadeOut": 0.3},
    {"file": "musik/mixkit-driving-623.mp3", "dari": 40.0, "sampai": 71.85, "gain": -10.3, "fadeIn": 0.25, "fadeOut": 0.35},
    {"file": "musik/mixkit-confident-32.mp3", "dari": 71.7, "sampai": 89.228, "gain": -8.4, "fadeIn": 0.3, "fadeOut": 1.2},
]
