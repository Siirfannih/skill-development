"""Ep01 Jensen Huang · r2 (D-24..D-30): jaket kulit = jangkar spasial (zoom ke tekstur -> hitam; di akhir zoom-out
kembali ke jaket), kanvas napas tiap 6-10 dtk, kutipan Jensen full-bleed tanpa bingkai, whip-pan dapur -> chip -> booth."""
from r2 import J, T, KANVAS, SCRIM, NAPAS

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
    b = w.beat; A = []
    def a(id_, dari, sampai, lapisan, **kw):
        d = {"id": id_, "dari": round(dari, 3), "sampai": round(sampai, 3), "lapisan": lapisan}; d.update(kw); A.append(d)
    t_bef, t_its, t_not = w("Before", "01"), w("It's", "01"), w("not", "01")
    # 01 hook: panggung lebar -> grid membuka ke Jensen berjalan (kamera mendekat) -> hitam "a nice story" -> kilat putih
    a("01a", 0, t_bef, [{"k": "video", "src": E + "keynote.mp4", "mulaiSumber": 0.0, "laju": 0.8, "kb": {"s0": 1.0, "s1": 1.06, "kurva": "heavy"}}])
    a("01b", t_bef, t_its, [J(E + "p01b_keynote.jpg", [T(t_bef, .45, .5, 1.0), T(w("Jensen", "01"), .40, .38, 1.45, ax=.33, ay=.5)])], masuk="grid")
    a("01c", t_its, t_not - 0.06, [KANVAS("gelap")])
    a("01d", t_not - 0.06, b["02"]["mulai"], [KANVAS("terang")], masuk="putih")
    # 02 jangkar jaket kulit: wajah -> tekstur jaket -> menggelap jadi hitam pekat
    t_lea = w("leather", "02")
    a("02", b["02"]["mulai"], b["03"]["mulai"], [J(E + "p02_keynote_dekat.jpg", [T(b["02"]["mulai"], .44, .42, 1.0), T(t_lea, .52, .80, 2.3), T(w("lot", "02"), .52, .86, 4.2)],
                                                padam=round(b["03"]["mulai"] - 0.45, 3))], invert=[round(b["03"]["mulai"] - 0.14, 3), b["03"]["mulai"]])
    # 03 rewind (tahun raksasa berputar mundur) dipertahankan
    a("03", b["03"]["mulai"], b["04"]["mulai"], [{"k": "kartu", "warna": "malam"},
      {"k": "irisan", "src": E + "keynote.mp4", "video": True, "mulaiSumber": 6.0, "clip": "inset(0 0 0 86%)", "geser": 30},
      {"k": "irisan", "src": E + "keynote.mp4", "video": True, "mulaiSumber": 3.0, "clip": "inset(62% 72% 12% 0)", "geser": -24},
      {"k": "tracking"}])
    # 04 napas "9 years old." -> jangkar papan sekolah (whip), kamera menyusur papan
    t_his = w("His", "04")
    a("04a", b["04"]["mulai"], t_his, [KANVAS("gelap")])
    t_tou = w("tough", "04")
    a("04b", t_his, t_tou - 0.3, [J(E + "p04_obi.jpg", [T(t_his, .5, .40, 1.2), T(w("Kentucky", "04"), .5, .58, 1.55), T(w("prestigious", "04"), .42, .58, 2.1)], grade="bwwarm")], masuk="whip")
    a("04c", t_tou - 0.3, b["05"]["mulai"], [KANVAS("gelap")])
    # 05 tugas toilet -> kilat putih "100 BOYS. 1 MOP." -> teman sekamar
    t_for, t_and = w("For", "05"), w("And", "05")
    a("05a", b["05"]["mulai"], t_for, [KANVAS("gelap")])
    a("05b", t_for, t_and, [KANVAS("terang")], masuk="putih")
    a("05c", t_and, b["06"]["mulai"], [J(E + "p04_obi.jpg", [T(t_and, .3, .55, 1.0), T(w("17", "05"), .3, .55, 1.08)], grade="bw"), SCRIM("kanan", 0.7)], masuk="whip", arah="kiri")
    # 06 kutipan Jensen (Stanford): full-bleed, tanpa bingkai; wajah di kanan, KT di kiri
    t6 = b["06"]["mulai"]
    a("06a", t6, t6 + 1.31, [J(E + "stanford_toilet_lebar.mp4", [T(t6, .43, .33, 1.55, ax=.68, ay=.42)], mulaiSumber=3.95), SCRIM("kiri", 0.5)])
    a("06b", t6 + 1.31, b["07"]["mulai"], [J(E + "stanford_toilet_lebar.mp4", [T(t6 + 1.31, .43, .33, 1.6, ax=.70, ay=.42), T(w("all", "06"), .43, .31, 1.85, ax=.72, ay=.42)], mulaiSumber=6.94), SCRIM("kiri", 0.5)])
    # 07 napas "At 15." -> papan Denny's (whip) -> kata bergantian di kanvas napas
    t_den, t_n7 = w("Denny's", "07"), w("Not", "07")
    a("07a", b["07"]["mulai"], t_den - 0.3, [KANVAS("gelap")])
    t_wa2 = w("washing", "07", 2)
    a("07b", t_den - 0.3, t_wa2, [J(E + "p07_dennys_sign.jpg", [T(t_den - 0.3, .5, .45, 1.0), T(w("Portland", "07"), .5, .45, 1.25), T(t_n7, .5, .55, 1.6)]), SCRIM("atas", 0.55)], masuk="whip")
    a("07c", t_wa2, b["08"]["mulai"], [KANVAS("gelap")])
    # 08 kutipan pencuci piring: full-bleed, wajah di kanan
    t8 = b["08"]["mulai"]
    a("08", t8, b["09"]["mulai"], [J(E + "stanford_dish.mp4", [T(t8, .48, .42, 1.5, ax=.68, ay=.45), T(w("dishwasher", "08"), .48, .40, 1.75, ax=.70, ay=.45)], mulaiSumber=2.65), SCRIM("kiri", 0.5)])
    # 09 napas -> whip ke skema chip, kamera melompat antar blok
    t_he = w("He", "09", 2)
    a("09a", b["09"]["mulai"], t_he, [KANVAS("terang")])
    a("09b", t_he, b["10"]["mulai"], [J(E + "p09_wafer.jpg", [T(t_he, .4, .5, 1.0), T(w("nine", "09"), .28, .38, 2.0), T(w("AMD", "09"), .62, .62, 2.6), T(w("LSI", "09"), .45, .45, 3.1)], grade="dalam", tekstur=True)], masuk="whip")
    # 10 napas "1993." -> whip ke booth Denny's San Jose -> napas "NVIDIA."
    t_in2, t_nv = w("in", "10", 2), w("NVIDIA", "10")
    a("10a", b["10"]["mulai"], t_in2, [KANVAS("terang")], masuk="whip")
    a("10b", t_in2, t_nv, [J(E + "p10_booth_selektif.jpg", [T(t_in2, .55, .45, 1.05), T(w("San", "10"), .66, .45, 1.3), T(w("two", "10"), .45, .5, 1.12)])], masuk="whip")
    a("10c", t_nv, b["11"]["mulai"], [KANVAS("gelap")])
    # 11 tekstur jaket (gelap) -> zoom-out kembali ke foto jaket yang sama di awal
    t_to = w("to", "11", 2)
    a("11", b["11"]["mulai"], b["12"]["mulai"], [J(E + "p02_keynote_dekat.jpg", [T(b["11"]["mulai"], .52, .86, 4.2, drift=0.0), T(t_to, .44, .42, 1.15, ax=.30)], grade="nat"), SCRIM("kanan", 0.45)])
    # 12 pelajaran: hitam -> putih "NO JOB IS TOO SMALL." -> panggung
    t_no, t_if = w("No", "12"), w("If", "12")
    a("12a", b["12"]["mulai"], t_no, [J(E + "p03_keynote_panggung.jpg", [T(b["12"]["mulai"], .48, .55, 1.05), T(w("lesson", "12"), .48, .45, 1.25)]), SCRIM("atas", 0.6)], masuk="whip")
    a("12b", t_no, t_if, [KANVAS("terang")], masuk="putih")
    a("12c", t_if, b["13"]["mulai"], [{"k": "video", "src": E + "keynote.mp4", "mulaiSumber": 0.0, "laju": 0.5, "kb": {"s0": 1.0, "s1": 1.08, "y1": 20, "kurva": "heavy"}}], masuk="grid")
    a("13", b["13"]["mulai"], b["13"]["selesai"] + DURASI_TAMBAH, [J(E + "p13_booth_abu.jpg", [T(b["13"]["mulai"], .5, .45, 1.0)], grade="gelap")])
    return A


def kt(w):
    b = w.beat; T_ = []
    def k(**kw): T_.append(kw)
    t_bef, t_its, t_not = w("Before", "01"), w("It's", "01"), w("not", "01")
    k(peran="r1", dari=w("heard", "01"), sampai=t_bef, x=230, y=420, bayang=True, kata=[K("heard", w("heard", "01")), K("this one", w("this", "01"), baris=1)])
    k(peran="lead", dari=w("Jensen", "01"), sampai=t_its, x=1130, y=360, bayang=True, kata=[K("Jensen Huang", w("Jensen", "01"))])
    k(peran="r2", dari=w("car", "01"), sampai=t_its, x=1124, y=460, teks="a car wash", bayang=True)
    T_.append(NAPAS("a nice story.", w("nice", "01"), t_not - 0.06, ukuran=170))
    T_.append(NAPAS("NOT HOW IT\nHAPPENED.", t_not, b["02"]["mulai"], warna="tinta", ukuran=170))
    k(peran="r1", dari=w("leather", "02"), sampai=w("lot", "02"), x=1270, y=420, bayang=True, kata=[K("leather", w("leather", "02")), K("jacket", w("jacket", "02"), baris=1)])
    k(peran="r2", dari=w("lot", "02"), sampai=b["03"]["mulai"], x=960, y=470, jangkar="tengah", teks="a lot harder", bayang=True)
    k(peran="lead", dari=w("rewind", "03"), sampai=b["04"]["mulai"], x=960, y=170, jangkar="tengah", kata=[K("rewind", w("rewind", "03"))])
    k(peran="giant", dari=w("rewind", "03"), sampai=b["04"]["mulai"], x=960, y=300, jangkar="tengah", angka={"dari": 2026, "ke": 1972, "durasi": round(w("1972", "03") - w("rewind", "03"), 2)})
    t_his = w("His", "04")
    T_.append(NAPAS("9 YEARS OLD.", w("nine", "04"), t_his, ukuran=200))
    k(peran="lead", dari=t_his, sampai=w("Kentucky", "04"), x=170, y=170, bayang=True, kata=[K("his uncle sent him", t_his)])
    k(peran="kotak", dari=w("Kentucky", "04"), sampai=w("prestigious", "04"), x=170, y=170, teks="Kentucky")
    k(peran="kotak", dari=w("prestigious", "04"), sampai=w("tough", "04") - 0.3, x=170, y=170, teks="prestigious?")
    T_.append(NAPAS("TOUGH.", w("tough", "04"), b["05"]["mulai"], ukuran=280))
    t_for, t_and = w("For", "05"), w("And", "05")
    k(peran="lead", dari=w("daily", "05"), sampai=t_for, x=960, y=330, jangkar="tengah", kata=[K("his daily chore:", w("daily", "05"))])
    k(peran="r2", dari=w("Cleaning", "05"), sampai=t_for, x=960, y=440, jangkar="tengah", teks="the toilets")
    T_.append(NAPAS("100 BOYS.\n1 MOP.", t_for, t_and, warna="tinta", ukuran=230, aksen="100"))
    k(peran="lead", dari=w("roommate", "05"), sampai=b["06"]["mulai"], x=1755, y=200, jangkar="kanan", bayang=True, kata=[K("his roommate", w("his", "05", 2))])
    k(peran="r6", dari=w("17", "05"), sampai=b["06"]["mulai"], x=1755, y=290, jangkar="kanan", teks="17", ukuran=300, bayang=True)
    t6 = b["06"]["mulai"]
    k(peran="r1", dari=w("I", "06"), sampai=t6 + 1.31, x=170, y=330, bayang=True, kata=[K("I used to", w("I", "06")), K("clean toilets", w("clean", "06"), baris=1)])
    k(peran="lead", dari=w("more", "06"), sampai=b["07"]["mulai"], x=170, y=300, bayang=True, kata=[K("more toilets than", w("more", "06"))])
    k(peran="r2", dari=w("all", "06"), sampai=b["07"]["mulai"], x=165, y=410, teks="all of you", bayang=True)
    k(peran="r2", dari=w("combined", "06"), sampai=b["07"]["mulai"], x=165, y=540, teks="combined", bayang=True)
    t_den, t_n7 = w("Denny's", "07"), w("Not", "07")
    T_.append(NAPAS("AT 15.", w("15", "07"), t_den - 0.3, ukuran=260))
    k(peran="r2", dari=w("Portland", "07"), sampai=t_n7, x=1755, y=780, jangkar="kanan", teks="Portland", bayang=True)
    k(peran="r2", dari=t_n7, sampai=w("washing", "07", 2), x=960, y=180, jangkar="tengah", teks="not washing cars", bayang=True)
    T_.append(NAPAS("washing dishes.", w("washing", "07", 2), w("Then", "07"), ukuran=170))
    T_.append(NAPAS("busboy.", w("busboy", "07"), w("then", "07", 2), ukuran=200))
    T_.append(NAPAS("waiter.", w("waiter", "07"), b["08"]["mulai"], ukuran=200))
    k(peran="lead", dari=w("probably", "08"), sampai=b["09"]["mulai"], x=170, y=320, bayang=True, kata=[K("Denny's best", w("probably", "08"))])
    k(peran="r2", dari=w("dishwasher", "08"), sampai=b["09"]["mulai"], x=165, y=420, teks="dishwasher", bayang=True)
    t_he = w("He", "09", 2)
    T_.append(NAPAS("didn't stay.", w("didn't", "09"), t_he, warna="tinta", ukuran=190))
    k(peran="r2", dari=w("electrical", "09"), sampai=w("nine", "09"), x=960, y=430, jangkar="tengah", teks="electrical engineering", ukuran=120)
    k(peran="lead", dari=w("nine", "09"), sampai=w("AMD", "09"), x=960, y=360, jangkar="tengah", kata=[K("nine years", w("nine", "09"))])
    k(peran="r2", dari=w("designing", "09"), sampai=w("AMD", "09"), x=960, y=450, jangkar="tengah", teks="DESIGNING CHIPS", ukuran=130)
    k(peran="r2", dari=w("AMD", "09"), sampai=w("LSI", "09"), x=960, y=430, jangkar="tengah", teks="AMD", ukuran=130)
    k(peran="r6", dari=w("LSI", "09"), sampai=b["10"]["mulai"], x=960, y=420, jangkar="tengah", teks="LSI Logic", ukuran=200)
    t_in2, t_nv = w("in", "10", 2), w("NVIDIA", "10")
    k(peran="r1", dari=w("Until", "10"), sampai=w("1993", "10"), x=960, y=470, jangkar="tengah", warna="tinta", kata=[K("until finally,", w("Until", "10"))])
    T_.append(NAPAS("1993.", w("1993", "10"), t_in2, warna="tinta", ukuran=360))
    k(peran="lead", dari=w("booth", "10"), sampai=w("two", "10"), x=170, y=790, bayang=True, kata=[K("a booth at Denny's, San Jose", w("booth", "10"))])
    k(peran="r1", dari=w("two", "10"), sampai=t_nv, x=170, y=700, bayang=True, kata=[K("two colleagues", w("two", "10")), K("planned a company", w("planned", "10"), baris=1)])
    T_.append(NAPAS("NVIDIA.", t_nv, b["11"]["mulai"], ukuran=260))
    k(peran="kotak", dari=w("toilets", "11"), sampai=w("washing", "11"), x=960, y=470, jangkar="tengah", teks="toilets")
    k(peran="kotak", dari=w("washing", "11"), sampai=w("to", "11", 2), x=960, y=470, jangkar="tengah", teks="dishes")
    k(peran="r2", dari=w("most", "11"), sampai=b["12"]["mulai"], x=1755, y=560, jangkar="kanan", teks="the most valuable", ukuran=100, bayang=True)
    k(peran="lead", dari=w("chip", "11"), sampai=b["12"]["mulai"], x=1755, y=690, jangkar="kanan", bayang=True, kata=[K("chip company", w("chip", "11")), K("in the world", w("in", "11"), baris=1)])
    t_no, t_if = w("No", "12"), w("If", "12")
    k(peran="lead", dari=w("lesson", "12"), sampai=t_no, x=960, y=200, jangkar="tengah", bayang=True, kata=[K("so maybe the lesson is this:", w("So", "12"))])
    T_.append(NAPAS("NO JOB IS\nTOO SMALL.", t_no, t_if, warna="tinta", ukuran=200, aksen="SMALL."))
    k(peran="r2", dari=w("top", "12"), sampai=b["13"]["mulai"], x=960, y=790, jangkar="tengah", teks="to the top", bayang=True)
    k(peran="r2", dari=w("your", "13"), sampai=b["13"]["selesai"] + DURASI_TAMBAH, x=960, y=420, jangkar="tengah", teks="your first job?")
    k(peran="lead", dari=w("Tell", "13"), sampai=b["13"]["selesai"] + DURASI_TAMBAH, x=960, y=590, jangkar="tengah", kata=[K("tell me in the comments", w("Tell", "13"))])
    return T_


def EKSTRA_SFX(w):
    b = w.beat
    return [
        {"t": 0.0, "file": "sfx/glitch_cut.mp3", "gain": -16, "pilar": "aksen", "peran": "frame 0: gebrakan bunyi (Lantai D22c)"},
        {"t": round(b["12"]["mulai"] - 1.45, 3), "file": "sfx/riser_cymbal.wav", "gain": -15, "pilar": "aksen", "peran": "riser menuju pelajaran"},
        {"t": w("No", "12"), "file": "sfx/sub_drop.wav", "gain": -10, "pilar": "aksen", "peran": "pelajaran mendarat (sub drop)"},
        {"t": w("to", "11", 2), "file": "sfx/whoosh_airy.wav", "gain": -13, "pilar": "transisi", "peran": "zoom-out kembali ke jaket"},
    ]


MUSIK = [
    {"file": "musik/musik-freesound-51252.mp3", "dari": 0.0, "sampai": 40.14, "gain": -10.1, "fadeIn": 0.05, "fadeOut": 0.3},
    {"file": "musik/mixkit-driving-623.mp3", "dari": 40.0, "sampai": 71.85, "gain": -10.3, "fadeIn": 0.25, "fadeOut": 0.35},
    {"file": "musik/mixkit-confident-32.mp3", "dari": 71.7, "sampai": 89.228, "gain": -8.4, "fadeIn": 0.3, "fadeOut": 1.2},
]
