"""Ep04 Airbnb · r2 (D-24..D-30): kotak sereal = pusat gravitasi (grid-reveal di awal, zoom ke detail label sebagai
titik transisi ke arsip); daftar "Line 1–6" dibuang; kanvas napas "$0 BOOKINGS.", "$30,000 FROM CEREAL.",
"ACCEPTED — JAN 2009."; esai Paul Graham dibangun ulang sebagai halaman + stabilo; whip-pan esai -> Graham -> sereal."""
from r2 import J, JT, T, KANVAS, SCRIM, NAPAS

ID = "Ep04"
VO = "/mnt/storage-projects/behindwork-batch-1/ep04/vo/rakit"
VO_BEATS = f"{VO}/vo_beats.json"
VO_WORDS = f"{VO}/vo_words.json"
VO_SRC = "ep04/vo.wav"
SUB_MD = "/home/irfan/work/skill-development/projects/behindwork-batch-1/vo/ep04_vo_en.md"
DURASI_TAMBAH = 0.7
E = "ep04/"
OJ, HERO, NOMOR, ABB, DUA = (E + f for f in ("wb_obamaos_2008_img01_obama_oj_2x.jpg", "wb_obamaos_2008_img02_obama_hero_2x.jpg",
                                               "wb_obamaos_2008_img04_obama_number_2x.jpg", "wb_obamaos_2008_img05_obama_abb_2x.jpg", "core77_abb_cereals_2x.jpg"))
ESAI = ["What we didn't realize when we first met Brian and Joe and Nate was that Airbnb was on its last legs. After working on the company for a year and getting no growth, they'd agreed to give it one last shot. They'd try this Y Combinator thing, and if the company still didn't take off, they'd give up.",
        "Any normal person would have given up already. They'd been funding the company with credit cards. They had a binder full of credit cards they'd maxed out. Investors didn't think much of the idea."]


def K(w_, t, **kw):
    d = {"w": w_, "t": t}; d.update(kw); return d


def adegan(w):
    b = w.beat; A = []
    def a(id_, dari, sampai, lapisan, **kw):
        d = {"id": id_, "dari": round(dari, 3), "sampai": round(sampai, 3), "lapisan": lapisan}; d.update(kw); A.append(d)
    t40, t_and = w("$40", "01"), w("and", "01")
    # 01 kotak sereal muncul lewat grid -> putih "$40." -> zoom ke tulisan pembuatnya
    a("01a", 0, t40, [KANVAS("terang"), {"k": "inset", "src": HERO, "x": 1060, "y": 81, "w": 700, "h": 918, "masuk": "tumbuh", "kb": {"s0": 1.0, "s1": 1.05}}], masuk="grid")
    a("01b", t40, t_and, [KANVAS("terang")], masuk="putih")
    a("01c", t_and, b["02"]["mulai"], [J(ABB, [T(t_and, .45, .45, 1.05), T(w("saved", "01"), .42, .40, 1.35)]), SCRIM("bawah", 0.85)], masuk="whip")
    # 02 buku kas = label nomor edisi tulisan tangan (zoom ke 244/500)
    a("02", b["02"]["mulai"], b["03"]["mulai"], [J(NOMOR, [T(b["02"]["mulai"], .4, .4, 1.1), T(w("cash", "02"), .32, .45, 1.9, ax=.62)]), SCRIM("kanan", 0.5)], masuk="whip")
    # 03 putih "RENT." -> Chesky (kamera mengikuti wajah)
    t_which = w("Which", "03")
    a("03a", b["03"]["mulai"], t_which, [KANVAS("terang")])
    a("03b", t_which, b["04"]["mulai"], [JT(E + "gsb_0600-0620.mp4", 2.0, t_which, b["04"]["mulai"], ax=.72, s=1.4), SCRIM("kiri", 0.5)], masuk="whip")
    # 04 email "designers bed and breakfast" (kasur angin) -> putih "3 GUESTS." -> foto tiga tamu (teks hanya di pita bawah)
    t_for, t_when = w("For", "04"), w("when", "04")
    a("04a", b["04"]["mulai"], t_for, [J(E + "still_ted_email_2007_t21.png", [T(b["04"]["mulai"], .45, .45, 1.15), T(w("air", "04"), .45, .58, 1.3)]), SCRIM("bawah", 0.55)], masuk="whip")
    a("04b", t_for, t_when, [KANVAS("terang")])
    a("04c", t_when, b["05"]["mulai"], [J(E + "still_ted_first_guests_t40.png", [T(t_when, .5, .45, 1.0), T(w("hotels", "04"), .55, .45, 1.08)]), SCRIM("bawah", 0.7)], masuk="grid")
    # 05 beranda AirBed & Breakfast (kepala halaman diperbesar) -> Nathan (potret di kanvas, tanpa bayangan berat)
    t_and5, t_line = w("And", "05", 2), w("Line", "05")
    a("05a", b["05"]["mulai"], t_and5, [J(E + "wb_airbedandbreakfast_home_2008_shot.png", [T(b["05"]["mulai"], .32, .03, 1.6, ax=.4, ay=.25), T(w("Breakfast", "05"), .32, .04, 1.75, ax=.4, ay=.25)]), SCRIM("bawah", 0.88)], masuk="whip")
    a("05b", t_and5, t_line, [KANVAS("terang"), {"k": "inset", "src": E + "nathan_blecharczyk_2014_2x.jpg", "x": 1020, "y": 70, "w": 700, "h": 935, "pos": "50% 25%", "masuk": "kanan", "kb": {"s0": 1.0, "s1": 1.04}}])
    # 06 hitam "$0 BOOKINGS." -> stadion Denver, warna luntur saat pemesanan berhenti
    t_after = w("After", "06")
    a("06a", t_line, t_after, [KANVAS("gelap")])
    a("06b", t_after, b["07"]["mulai"], [J(E + "invesco_dnc_2008.jpg", [T(t_after, .5, .5, 1.05), T(w("bookings", "06"), .5, .5, 1.2)], luntur=round(w("bookings", "06"), 3)), SCRIM("atas", 0.55)], masuk="whip")
    # 07 putih "CEREAL." -> dua kotak (grid) -> zoom ke label harga/nomor
    t_ob, t_ab = w("Obama", "07"), w("About", "07")
    a("07a", b["07"]["mulai"], t_ob, [KANVAS("terang")])
    a("07b", t_ob, t_ab, [J(DUA, [T(t_ob, .28, .5, 1.35, ax=.45), T(w("Cap", "07"), .72, .5, 1.35, ax=.55)])], masuk="grid")
    a("07c", t_ab, b["08"]["mulai"], [J(NOMOR, [T(t_ab, .35, .5, 1.3), T(w("box", "07"), .32, .45, 1.7)]), SCRIM("kanan", 0.45)], masuk="whip")
    # 08 putih "$30,000 FROM CEREAL." -> Chesky
    t_which8 = w("Which", "08")
    a("08a", b["08"]["mulai"], t_which8, [KANVAS("terang")])
    a("08b", t_which8, b["09"]["mulai"], [JT(E + "gsb_1028-1040.mp4", 1.0, t_which8, b["09"]["mulai"], ax=.72, s=1.4), SCRIM("kiri", 0.5)], masuk="whip")
    # 09 esai Paul Graham dibangun ulang, kalimat binder disorot -> hitam "MAXED OUT."
    t_max = w("Maxed", "09")
    a("09a", b["09"]["mulai"], t_max, [{"k": "artikel", "situs": "Paul Graham · Essays", "judul": "The Airbnbs", "meta": "December 2020", "paragraf": ESAI,
                                        "sorot": [{"p": 1, "teks": "They had a binder full of credit cards they'd maxed out.", "t": round(w("whole", "09"), 3)}],
                                        "jalur": [T(b["09"]["mulai"], .5, .22, 1.0), T(w("Paul", "09") - 0.3, .5, .36, 1.34)]}], masuk="whip")
    a("09b", t_max, b["10"]["mulai"], [KANVAS("gelap")])
    # 10 whip ke Paul Graham di YC -> hitam "unconvinced." -> whip ke kotak sereal
    t_unc, t_until = w("Unconvinced", "10"), w("Until", "10")
    a("10a", b["10"]["mulai"], t_unc, [J(E + "paul_graham_yc_2009.jpg", [T(b["10"]["mulai"], .5, .5, 1.05), T(w("Y", "10"), .80, .35, 1.6, ax=.68, ay=.45)]), SCRIM("kiri", 0.55)], masuk="whip")
    a("10b", t_unc, t_until, [KANVAS("gelap")])
    a("10c", t_until, b["11"]["mulai"], [KANVAS("terang"), {"k": "inset", "src": HERO, "x": 1060, "y": 81, "w": 700, "h": 918, "masuk": "tumbuh", "kb": {"s0": 1.0, "s1": 1.05}}], masuk="whip")
    # 11 Chesky mengingat -> kutipan di kanvas putih
    t_if = w("If", "11")
    a("11a", b["11"]["mulai"], t_if, [JT(E + "gsb_1052-1108.mp4", 1.0, b["11"]["mulai"], t_if, ax=.72, s=1.4), SCRIM("kiri", 0.5)])
    a("11b", t_if, b["12"]["mulai"], [KANVAS("terang")])
    # 12 hari pertama YC -> putih "ACCEPTED — JAN 2009." -> gedung 2020
    t_acc, t_and12 = w("Accepted", "12"), w("And", "12")
    a("12a", b["12"]["mulai"], t_acc, [J(E + "gsb_1144-1150.mp4", [T(b["12"]["mulai"], .5, .5, 1.0)], mulaiSumber=0.0), SCRIM("atas", 0.4)], masuk="whip")
    a("12b", t_acc, t_and12, [KANVAS("terang")], masuk="putih")
    a("12c", t_and12, b["13"]["mulai"], [J(E + "888_brannan_2016.jpg", [T(t_and12, .35, .45, 1.0), T(w("went", "12"), .55, .45, 1.15)], grade="redam"), SCRIM("kiri", 0.5)], masuk="whip")
    # 13 jangkar kembali: dari detail label, tarik mundur ke kedua kotak -> putih "THAT $40 BOX."
    t_that = w("that", "13")
    a("13a", b["13"]["mulai"], t_that, [J(DUA, [T(b["13"]["mulai"], .30, .32, 2.6, drift=0.0), T(w("founders", "13"), .5, .5, 1.05)]), SCRIM("bawah", 0.65)], masuk="grid")
    a("13b", t_that, b["14"]["mulai"], [KANVAS("terang")])
    t_they = w("They", "14")
    a("14a", b["14"]["mulai"], t_they, [J(E + "paul_graham_yc_2009.jpg", [T(b["14"]["mulai"], .45, .5, 1.1), T(w("ideas", "14"), .45, .45, 1.25)], grade="gelap")], masuk="whip")
    a("14b", t_they, w("If", "14"), [KANVAS("terang")])
    a("15", w("If", "14"), b["15"]["selesai"] + DURASI_TAMBAH, [J(DUA, [T(w("If", "14"), .5, .5, 1.0)], grade="gelap")])
    return A


def kt(w):
    b = w.beat; T_ = []; END = b["15"]["selesai"] + DURASI_TAMBAH
    def k(**kw): T_.append(kw)
    t40, t_and = w("$40", "01"), w("and", "01")
    k(peran="r1", dari=w("box", "01"), sampai=t40, x=140, y=380, warna="tinta", kata=[K("this box", w("box", "01")), K("of cereal sold for", w("of", "01"), baris=1)])
    T_.append(NAPAS("$40.", t40, t_and, warna="tinta", ukuran=420, aksen="$40."))
    k(peran="lead", dari=w("founders", "01"), sampai=b["02"]["mulai"], x=140, y=660, bayang=True, kata=[K("the founders say it", w("founders", "01"))])
    k(peran="r2", dari=w("saved", "01"), sampai=b["02"]["mulai"], x=135, y=760, teks="saved Airbnb", bayang=True)
    k(peran="lead", dari=w("let's", "02"), sampai=b["03"]["mulai"], x=1755, y=360, jangkar="kanan", bayang=True, kata=[K("let's open their", w("let's", "02"))])
    k(peran="r2", dari=w("cash", "02"), sampai=b["03"]["mulai"], x=1755, y=460, jangkar="kanan", teks="cash book", bayang=True)
    t_which = w("Which", "03")
    k(peran="lead", dari=w("Line", "03"), sampai=t_which, x=960, y=260, jangkar="tengah", warna="tinta", kata=[K("line one:", w("Line", "03"))])
    T_.append(NAPAS("RENT.", w("Rent", "03"), t_which, warna="tinta", ukuran=300))
    k(peran="r6", dari=w("2007", "03"), sampai=b["04"]["mulai"], x=135, y=170, teks="2007", bayang=True)
    k(peran="r1", dari=w("Brian", "03"), sampai=b["04"]["mulai"], x=140, y=420, bayang=True, kata=[K("Brian Chesky", w("Brian", "03")), K("& Joe Gebbia", w("Joe", "03"), baris=1)])
    k(peran="lead", dari=w("couldn't", "03"), sampai=b["04"]["mulai"], x=140, y=660, bayang=True, kata=[K("couldn't pay rent", w("couldn't", "03"))])
    t_for, t_when = w("For", "04"), w("when", "04")
    k(peran="kotak", dari=w("Three", "04"), sampai=t_for, x=140, y=770, teks="3 air mattresses")
    T_.append(NAPAS("3 GUESTS.", w("three", "04", 2), t_when, warna="tinta", ukuran=280))
    k(peran="kotak", dari=w("design", "04"), sampai=w("hotels", "04"), x=140, y=770, teks="a design conference")
    k(peran="kotak", dari=w("hotels", "04"), sampai=b["05"]["mulai"], x=140, y=770, teks="hotels: full")
    t_and5, t_line = w("And", "05", 2), w("Line", "05")
    k(peran="r1", dari=w("AirBed", "05"), sampai=t_and5, x=140, y=700, bayang=True, kata=[K("AirBed", w("AirBed", "05")), K("& Breakfast", w("and", "05"), baris=1)])
    k(peran="lead", dari=w("soon", "05"), sampai=t_line, x=140, y=300, warna="tinta", kata=[K("and soon", w("soon", "05"))])
    k(peran="r1", dari=w("Nathan", "05"), sampai=t_line, x=140, y=400, warna="tinta", kata=[K("Nathan", w("Nathan", "05")), K("Blecharczyk", w("Blecharczyk", "05"), baris=1)])
    k(peran="kotak", dari=w("joined", "05"), sampai=t_line, x=140, y=640, teks="+1 programmer")
    t_after = w("After", "06")
    k(peran="lead", dari=t_line, sampai=w("0", "06"), x=960, y=470, jangkar="tengah", kata=[K("line three is a…", t_line)])
    T_.append(NAPAS("$0\nBOOKINGS.", w("0", "06"), t_after, ukuran=230, aksen="$0"))
    k(peran="r2", dari=w("Denver", "06"), sampai=b["07"]["mulai"], x=135, y=170, teks="Denver, 2008", bayang=True)
    k(peran="r6", dari=w("bookings", "06"), sampai=b["07"]["mulai"], x=135, y=320, teks="bookings stopped", ukuran=150, bayang=True)
    t_ob, t_ab = w("Obama", "07"), w("About", "07")
    k(peran="lead", dari=w("line", "07"), sampai=w("cereal", "07"), x=960, y=260, jangkar="tengah", warna="tinta", kata=[K("so line four is", w("So", "07"))])
    T_.append(NAPAS("CEREAL.", w("cereal", "07"), t_ob, warna="tinta", ukuran=300))
    k(peran="kotak", dari=t_ob, sampai=w("Cap", "07"), x=140, y=770, teks="Obama O's")
    k(peran="kotak", dari=w("Cap", "07"), sampai=t_ab, x=140, y=770, teks="Cap'n McCain's")
    k(peran="r6", dari=w("$40", "07"), sampai=b["08"]["mulai"], x=1755, y=300, jangkar="kanan", teks="$40", ukuran=300, bayang=True)
    k(peran="lead", dari=w("box", "07"), sampai=b["08"]["mulai"], x=1755, y=600, jangkar="kanan", bayang=True, kata=[K("a box", w("a", "07"))])
    t_which8 = w("Which", "08")
    k(peran="lead", dari=w("total", "08"), sampai=w("$30", "08"), x=960, y=220, jangkar="tengah", warna="tinta", kata=[K("in total, about", w("In", "08"))])
    k(peran="giant", dari=w("$30", "08"), sampai=t_which8, x=960, y=290, jangkar="tengah", warna="tinta", ukuran=300, angka={"dari": 0, "ke": 30000, "durasi": 0.9, "format": "usd"})
    T_.append(NAPAS("FROM CEREAL.", w("$30", "08") + 0.9, t_which8, warna="tinta", ukuran=150, y=640))
    k(peran="r1", dari=w("Chesky", "08"), sampai=b["09"]["mulai"], x=140, y=300, bayang=True, kata=[K("Chesky says", w("Chesky", "08"))])
    k(peran="r1", dari=w("funded", "08"), sampai=b["09"]["mulai"], x=140, y=450, bayang=True, kata=[K("it funded", w("funded", "08")), K("the company", w("the", "08"), baris=1)])
    t_max = w("Maxed", "09")
    T_.append(NAPAS("MAXED OUT.", t_max, b["10"]["mulai"], ukuran=250, aksen="MAXED"))
    t_unc, t_until = w("Unconvinced", "10"), w("Until", "10")
    k(peran="r1", dari=w("Graham", "10"), sampai=t_unc, x=140, y=170, bayang=True, kata=[K("Paul Graham", w("Graham", "10")), K("at Y Combinator", w("Y", "10"), baris=1)])
    T_.append(NAPAS("unconvinced.", t_unc, t_until, ukuran=200))
    k(peran="r1", dari=t_until, sampai=b["11"]["mulai"], x=140, y=380, warna="tinta", kata=[K("until Joe pulled out", t_until), K("a box of cereal", w("a", "10"), baris=1)])
    t_if = w("If", "11")
    k(peran="r1", dari=w("Chesky", "11"), sampai=t_if, x=140, y=300, bayang=True, kata=[K("Chesky remembers", w("Chesky", "11"))])
    k(peran="lead", dari=w("Graham", "11"), sampai=t_if, x=140, y=420, bayang=True, kata=[K("Graham saying:", w("Graham", "11"))])
    k(peran="lead", dari=t_if, sampai=b["12"]["mulai"], x=170, y=170, warna="tinta", kata=[K("“if you can sell", t_if)])
    k(peran="r6", dari=w("$4", "11"), sampai=b["12"]["mulai"], x=165, y=260, warna="tinta", teks="$4 cereal", ukuran=190)
    T_.append(dict(NAPAS("for $40", w("for", "11"), b["12"]["mulai"], warna="aksen", ukuran=190, y=450), x=165, jangkar="kiri"))
    k(peran="r1", dari=w("maybe", "11"), sampai=b["12"]["mulai"], x=170, y=690, warna="tinta", kata=[K("maybe strangers", w("maybe", "11")), K("will share a home”", w("share", "11"), baris=1)])
    t_acc, t_and12 = w("Accepted", "12"), w("And", "12")
    k(peran="lead", dari=w("Line", "12"), sampai=t_acc, x=140, y=170, bayang=True, kata=[K("line six:", w("Line", "12"))])
    T_.append(NAPAS("ACCEPTED —\nJAN 2009.", t_acc, t_and12, warna="tinta", ukuran=200, aksen="ACCEPTED"))
    k(peran="r6", dari=w("2020", "12"), sampai=b["13"]["mulai"], x=135, y=180, teks="2020", ukuran=280, bayang=True)
    k(peran="r2", dari=w("went", "12"), sampai=b["13"]["mulai"], x=135, y=470, teks="went public", bayang=True)
    t_that = w("that", "13")
    k(peran="lead", dari=w("whole", "13"), sampai=t_that, x=140, y=800, bayang=True, kata=[K("on the whole receipt,", w("On", "13"))])
    T_.append(NAPAS("THAT $40\nBOX.", t_that, b["14"]["mulai"], warna="tinta", ukuran=230, aksen="$40"))
    t_they = w("They", "14")
    k(peran="lead", dari=w("maybe", "14"), sampai=t_they, x=960, y=250, jangkar="tengah", kata=[K("maybe investors rarely buy", w("maybe", "14"))])
    k(peran="r6", dari=w("ideas", "14"), sampai=t_they, x=960, y=360, jangkar="tengah", teks="ideas.", ukuran=280, bayang=True)
    k(peran="lead", dari=t_they, sampai=w("If", "14"), x=960, y=230, jangkar="tengah", warna="tinta", kata=[K("they buy proof", t_they)])
    T_.append(NAPAS("you won't\ngive up.", w("you", "14"), w("If", "14"), warna="tinta", ukuran=200, aksen="give up."))
    k(peran="lead", dari=w("If", "14"), sampai=END, x=140, y=280, kata=[K("if your life had a cash book", w("If", "14"))])
    k(peran="r2", dari=w("which", "15"), sampai=END, x=135, y=420, teks="which line saved you?", ukuran=100)
    k(peran="lead", dari=w("Tell", "15"), sampai=END, x=140, y=640, kata=[K("tell me in the comments", w("Tell", "15"))])
    return T_


def EKSTRA_SFX(w):
    return [
        {"t": 0.0, "file": "sfx/glitch_cut.mp3", "gain": -16, "pilar": "aksen", "peran": "frame 0: gebrakan bunyi (Lantai D22c)"},
        {"t": w("cash", "02"), "file": "sfx/page_turn.wav", "gain": -13, "pilar": "foley", "peran": "buku kas dibuka"},
        {"t": w("0", "06"), "file": "sfx/sub_drop.wav", "gain": -11, "pilar": "aksen", "peran": "nol pemesanan"},
        {"t": w("Maxed", "09"), "file": "sfx/impact_thud.wav", "gain": -12, "pilar": "aksen", "peran": "kartu kredit habis"},
    ]


MUSIK = [
    {"file": "musik/mixkit-instrument-piano-184.mp3", "dari": 0.0, "sampai": 76.6, "gain": -6.0, "fadeIn": 0.05, "fadeOut": 0.6},
    {"file": "musik/mixkit-minimalism-506.mp3", "dari": 76.3, "sampai": 92.98, "gain": -11.5, "fadeIn": 0.6, "fadeOut": 1.2},
]
