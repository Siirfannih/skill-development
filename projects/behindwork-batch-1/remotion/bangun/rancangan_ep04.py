"""Ep04 Airbnb · Buku Kas · Story Cinematic. Perangkat khas: kartu buku kas "Line N" (kertas, angka tinta besar)
membuka tiap baris cerita; kotak sereal $40 jadi artefak jangkar."""
ID = "Ep04"
VO = "/mnt/storage-projects/behindwork-batch-1/ep04/vo/rakit"
VO_BEATS = f"{VO}/vo_beats.json"
VO_WORDS = f"{VO}/vo_words.json"
VO_SRC = "ep04/vo.wav"
SUB_MD = "/home/irfan/work/skill-development/projects/behindwork-batch-1/vo/ep04_vo_en.md"
DURASI_TAMBAH = 0.7
E = "ep04/"
M = {"k": "kartu", "warna": "malam"}; P = {"k": "kartu", "warna": "kertas"}
# Chesky duduk di tengah: geser kamera ke kanan supaya KT kiri tidak menimpa tubuhnya
CH = lambda: {"s0": 1.18, "s1": 1.24, "x0": 175, "x1": 185, "y0": 40, "y1": 40, "kurva": "heavy"}


def K(w_, t, **kw):
    d = {"w": w_, "t": t}; d.update(kw); return d


def adegan(w):
    b = w.beat; A = []
    def a(id_, dari, sampai, lapisan, **kw):
        d = {"id": id_, "dari": round(dari, 3), "sampai": round(sampai, 3), "lapisan": lapisan}; d.update(kw); A.append(d)
    a("01a", 0, w("and", "01"), [P, {"k": "inset", "src": E + "wb_obamaos_2008_img02_obama_hero.jpg", "x": 1150, "y": 150, "w": 520, "h": 682, "masuk": "tumbuh", "kb": {"s0": 1.0, "s1": 1.05}}])
    a("01b", w("and", "01"), b["02"]["mulai"], [M])
    a("02", b["02"]["mulai"], b["03"]["mulai"], [P])
    a("03a", b["03"]["mulai"], w("Which", "03"), [P])
    a("03b", w("Which", "03"), b["04"]["mulai"], [{"k": "video", "src": E + "gsb_0600-0620.mp4", "mulaiSumber": 2.0, "grade": "nat", "kb": CH()}])
    a("04a", b["04"]["mulai"], w("For", "04"), [P, {"k": "inset", "src": E + "wb_airbedandbreakfast_home_2008_img01_post_a_room.png", "x": 1200, "y": 330, "w": 490, "h": 376, "masuk": "kanan"}])
    a("04b", w("For", "04"), b["05"]["mulai"], [{"k": "gambar", "src": E + "still_ted_first_guests_t40.png", "kb": {"s0": 1.0, "s1": 1.08, "kurva": "heavy"}}])
    a("05a", b["05"]["mulai"], w("And", "05", 2), [M, {"k": "inset", "src": E + "wb_airbedandbreakfast_home_2008_shot.png", "x": 1080, "y": 100, "w": 640, "h": 860, "pos": "50% 0%", "masuk": "kanan", "kb": {"s0": 1.0, "s1": 1.05}}])
    a("05b", w("And", "05", 2), w("Line", "05"), [P, {"k": "inset", "src": E + "nathan_blecharczyk_2014.jpg", "x": 165, "y": 110, "w": 600, "h": 800, "pos": "50% 30%", "masuk": "bawah", "kb": {"s0": 1.0, "s1": 1.04}}])
    a("06a", w("Line", "05"), w("After", "06"), [P])
    a("06b", w("After", "06"), b["07"]["mulai"], [{"k": "gambar", "src": E + "invesco_dnc_2008.jpg", "grade": "gelap", "kb": {"s0": 1.0, "s1": 1.1, "kurva": "heavy"}}])
    a("07a", b["07"]["mulai"], w("Obama", "07"), [P])
    a("07b", w("Obama", "07"), w("About", "07"), [P, {"k": "inset", "src": E + "core77_abb_cereals.jpg", "x": 514, "y": 130, "w": 892, "h": 640, "masuk": "tumbuh", "kb": {"s0": 1.0, "s1": 1.05}}])
    a("07c", w("About", "07"), b["08"]["mulai"], [M])
    a("08a", b["08"]["mulai"], w("Which", "08"), [P])
    a("08b", w("Which", "08"), b["09"]["mulai"], [{"k": "video", "src": E + "gsb_1028-1040.mp4", "mulaiSumber": 1.0, "kb": CH()}])
    a("09a", b["09"]["mulai"], w("Paul", "09"), [P])
    a("09b", w("Paul", "09"), b["10"]["mulai"], [{"k": "gambar", "src": E + "yc_blog_the_airbnbs_find1.png", "grade": "blurkuat", "pos": "50% 30%", "kb": {"s0": 1.0, "s1": 1.1, "kurva": "heavy"}}])
    a("10a", b["10"]["mulai"], w("Unconvinced", "10"), [{"k": "gambar", "src": E + "paul_graham_yc_2009.jpg", "grade": "nat", "kb": {"s0": 1.02, "s1": 1.1, "x1": -30, "kurva": "heavy"}}])
    a("10b", w("Unconvinced", "10"), w("Until", "10"), [M])
    a("10c", w("Until", "10"), b["11"]["mulai"], [M, {"k": "inset", "src": E + "wb_obamaos_2008_img02_obama_hero.jpg", "x": 1150, "y": 150, "w": 520, "h": 682, "masuk": "bawah", "rot": -3, "kb": {"s0": 1.0, "s1": 1.05}}])
    a("11a", b["11"]["mulai"], w("If", "11"), [{"k": "video", "src": E + "gsb_1052-1108.mp4", "mulaiSumber": 1.0, "kb": CH()}])
    a("11b", w("If", "11"), b["12"]["mulai"], [P])
    a("12a", b["12"]["mulai"], w("Accepted", "12"), [P])
    a("12b", w("Accepted", "12"), w("And", "12"), [{"k": "video", "src": E + "gsb_1144-1150.mp4", "mulaiSumber": 0.0, "grade": "nat", "kb": {"s0": 1.0, "s1": 1.06, "kurva": "heavy"}}])
    a("12c", w("And", "12"), b["13"]["mulai"], [{"k": "gambar", "src": E + "888_brannan_2016.jpg", "grade": "gelap", "kb": {"s0": 1.0, "s1": 1.08, "x1": -60, "kurva": "heavy"}}])
    a("13", b["13"]["mulai"], b["14"]["mulai"], [P])
    a("14a", b["14"]["mulai"], w("They", "14"), [M])
    a("14b", w("They", "14"), w("If", "14"), [P])
    a("15", w("If", "14"), b["15"]["selesai"] + DURASI_TAMBAH, [M])
    return A


def kt(w):
    b = w.beat; T = []
    def k(**kw): T.append(kw)
    def baris(n, dari, sampai):  # kartu buku kas
        k(peran="r6", dari=dari, sampai=sampai, x=165, y=170, warna="tinta", teks=f"Line {n}")
    # 01
    k(peran="r1", dari=w("box", "01"), sampai=w("and", "01"), x=170, y=260, warna="tinta", kata=[K("this box", w("box", "01")), K("of cereal sold for", w("of", "01"), baris=1)])
    k(peran="r6", dari=w("$40", "01"), sampai=w("and", "01"), x=165, y=470, warna="aksen", teks="$40", ukuran=300)
    k(peran="lead", dari=w("founders", "01"), sampai=b["02"]["mulai"], x=960, y=330, jangkar="tengah", kata=[K("the founders say it", w("founders", "01"))])
    k(peran="r6", dari=w("saved", "01"), sampai=b["02"]["mulai"], x=960, y=420, jangkar="tengah", teks="saved Airbnb", ukuran=190)
    # 02
    k(peran="lead", dari=w("let's", "02"), sampai=b["03"]["mulai"], x=960, y=330, jangkar="tengah", warna="tinta", kata=[K("let's open their", w("let's", "02"))])
    k(peran="r6", dari=w("cash", "02"), sampai=b["03"]["mulai"], x=960, y=420, jangkar="tengah", warna="tinta", teks="cash book")
    # 03
    baris(1, w("Line", "03"), w("Which", "03"))
    k(peran="kotak", dari=w("Rent", "03"), sampai=w("Which", "03"), x=170, y=470, teks="rent")
    k(peran="r6", dari=w("2007", "03"), sampai=b["04"]["mulai"], x=165, y=170, teks="2007", ukuran=210, bayang=True)
    k(peran="r1", dari=w("Brian", "03"), sampai=b["04"]["mulai"], x=170, y=420, bayang=True, kata=[K("Brian Chesky", w("Brian", "03")), K("& Joe Gebbia", w("Joe", "03"), baris=1)])
    k(peran="lead", dari=w("couldn't", "03"), sampai=b["04"]["mulai"], x=170, y=660, bayang=True, kata=[K("couldn't pay rent", w("couldn't", "03"))])
    # 04
    baris(2, w("Line", "04"), w("For", "04"))
    k(peran="kotak", dari=w("Three", "04"), sampai=w("For", "04"), x=170, y=470, teks="3 air mattresses")
    k(peran="r2", dari=w("three", "04", 2), sampai=b["05"]["mulai"], x=165, y=150, teks="3 guests", bayang=True)
    k(peran="r2", dari=w("hotels", "04"), sampai=b["05"]["mulai"], x=1755, y=150, jangkar="kanan", teks="hotels: full", bayang=True)
    # 05
    k(peran="r1", dari=w("AirBed", "05"), sampai=w("And", "05", 2), x=170, y=330, kata=[K("AirBed", w("AirBed", "05")), K("& Breakfast", w("and", "05"), baris=1)])
    k(peran="lead", dari=w("soon", "05"), sampai=w("Line", "05"), x=860, y=250, warna="tinta", kata=[K("and soon", w("soon", "05"))])
    k(peran="r1", dari=w("Nathan", "05"), sampai=w("Line", "05"), x=860, y=360, warna="tinta", kata=[K("Nathan", w("Nathan", "05")), K("Blecharczyk", w("Blecharczyk", "05"), baris=1)])
    k(peran="kotak", dari=w("joined", "05"), sampai=w("Line", "05"), x=860, y=600, teks="+1 programmer")
    # 06
    baris(3, w("Line", "05"), w("After", "06"))
    k(peran="r6", dari=w("0", "06"), sampai=w("After", "06"), x=165, y=420, warna="aksen", teks="0", ukuran=360)
    k(peran="r2", dari=w("Denver", "06"), sampai=b["07"]["mulai"], x=165, y=200, teks="Denver, 2008", bayang=True)
    k(peran="r6", dari=w("bookings", "06"), sampai=b["07"]["mulai"], x=165, y=380, teks="bookings stopped", ukuran=150, bayang=True)
    # 07
    baris(4, w("line", "07"), w("Obama", "07"))
    k(peran="kotak", dari=w("cereal", "07"), sampai=w("Obama", "07"), x=170, y=470, teks="cereal")
    k(peran="lead", dari=w("Obama", "07"), sampai=w("About", "07"), x=930, y=800, jangkar="kanan", warna="tinta", kata=[K("Obama O's", w("Obama", "07"))])
    k(peran="lead", dari=w("Cap", "07"), sampai=w("About", "07"), x=990, y=800, warna="tinta", kata=[K("Cap'n McCain's", w("Cap", "07"))])
    k(peran="r6", dari=w("$40", "07"), sampai=b["08"]["mulai"], x=960, y=300, jangkar="tengah", warna="aksen", teks="$40", ukuran=360)
    k(peran="lead", dari=w("box", "07"), sampai=b["08"]["mulai"], x=960, y=680, jangkar="tengah", kata=[K("a box", w("a", "07"))])
    # 08
    k(peran="lead", dari=w("total", "08"), sampai=w("Which", "08"), x=960, y=200, jangkar="tengah", warna="tinta", kata=[K("in total, about", w("In", "08"))])
    k(peran="giant", dari=w("$30", "08"), sampai=w("Which", "08"), x=960, y=330, jangkar="tengah", warna="tinta", ukuran=300, angka={"dari": 0, "ke": 30000, "durasi": 1.0, "format": "usd"})
    k(peran="r1", dari=w("Chesky", "08"), sampai=b["09"]["mulai"], x=170, y=300, bayang=True, kata=[K("Chesky says", w("Chesky", "08"))])
    k(peran="r1", dari=w("funded", "08"), sampai=b["09"]["mulai"], x=170, y=450, bayang=True, kata=[K("it funded", w("funded", "08")), K("the company", w("the", "08"), baris=1)])
    # 09
    baris(5, w("Line", "09"), w("Paul", "09"))
    k(peran="kotak", dari=w("Credit", "09"), sampai=w("Paul", "09"), x=170, y=470, teks="credit cards")
    k(peran="r1", dari=w("Paul", "09"), sampai=b["10"]["mulai"], x=960, y=250, jangkar="tengah", kata=[K("Paul Graham wrote:", w("Paul", "09"))])
    k(peran="kotak", dari=w("binder", "09"), sampai=b["10"]["mulai"], x=960, y=390, jangkar="tengah", teks="a whole binder")
    k(peran="r6", dari=w("Maxed", "09"), sampai=b["10"]["mulai"], x=960, y=560, jangkar="tengah", warna="aksen", teks="MAXED OUT", bayang=True)
    # 10
    k(peran="r1", dari=w("Graham", "10"), sampai=w("Unconvinced", "10"), x=170, y=170, bayang=True, kata=[K("Paul Graham", w("Graham", "10")), K("at Y Combinator", w("Y", "10"), baris=1)])
    k(peran="r6", dari=w("Unconvinced", "10"), sampai=w("Until", "10"), x=960, y=420, jangkar="tengah", teks="unconvinced", ukuran=190)
    k(peran="r1", dari=w("Until", "10"), sampai=b["11"]["mulai"], x=170, y=360, kata=[K("until Joe pulled out", w("Until", "10")), K("a box of cereal", w("a", "10"), baris=1)])
    # 11
    k(peran="r1", dari=w("Chesky", "11"), sampai=w("If", "11"), x=170, y=300, bayang=True, kata=[K("Chesky remembers", w("Chesky", "11"))])
    k(peran="lead", dari=w("Graham", "11"), sampai=w("If", "11"), x=170, y=420, bayang=True, kata=[K("Graham saying:", w("Graham", "11"))])
    k(peran="lead", dari=w("If", "11"), sampai=b["12"]["mulai"], x=170, y=190, warna="tinta", kata=[K("“if you can sell", w("If", "11"))])
    k(peran="r6", dari=w("$4", "11"), sampai=b["12"]["mulai"], x=165, y=280, warna="tinta", teks="$4 cereal", ukuran=190)
    k(peran="r6", dari=w("for", "11"), sampai=b["12"]["mulai"], x=165, y=470, warna="aksen", teks="for $40", ukuran=190)
    k(peran="r1", dari=w("maybe", "11"), sampai=b["12"]["mulai"], x=170, y=690, warna="tinta", kata=[K("maybe strangers", w("maybe", "11")), K("will share a home”", w("share", "11"), baris=1)])
    # 12
    baris(6, w("Line", "12"), w("Accepted", "12"))
    k(peran="kotak", dari=w("Accepted", "12"), sampai=w("And", "12"), x=170, y=250, teks="ACCEPTED")
    k(peran="r2", dari=w("January", "12"), sampai=w("And", "12"), x=165, y=420, teks="January 2009", bayang=True)
    k(peran="r6", dari=w("2020", "12"), sampai=b["13"]["mulai"], x=165, y=180, teks="2020", ukuran=280, bayang=True)
    k(peran="r2", dari=w("went", "12"), sampai=b["13"]["mulai"], x=165, y=470, teks="went public", bayang=True)
    # 13: seluruh struk, lalu satu baris disorot
    t0 = w("receipt", "13")
    isi = ["1  rent", "2  air mattresses", "3  zero", "4  cereal", "5  credit cards", "6  accepted"]
    k(peran="lead", dari=t0, sampai=b["14"]["mulai"], x=170, y=150, warna="tinta", kata=[K(s, round(t0 + 0.16 * i, 3), baris=i) for i, s in enumerate(isi)])
    k(peran="kotak", dari=w("$40", "13"), sampai=b["14"]["mulai"], x=1000, y=380, teks="the $40 box", ukuran=124)
    # 14
    k(peran="lead", dari=w("maybe", "14"), sampai=w("They", "14"), x=960, y=250, jangkar="tengah", kata=[K("maybe investors rarely buy", w("maybe", "14"))])
    k(peran="r6", dari=w("ideas", "14"), sampai=w("They", "14"), x=960, y=340, jangkar="tengah", teks="ideas")
    k(peran="lead", dari=w("They", "14"), sampai=w("If", "14"), x=960, y=250, jangkar="tengah", warna="tinta", kata=[K("they buy proof", w("They", "14"))])
    k(peran="r6", dari=w("you", "14"), sampai=w("If", "14"), x=960, y=340, jangkar="tengah", warna="aksen", teks="you won't give up", ukuran=160)
    # 15
    k(peran="lead", dari=w("If", "14"), sampai=b["15"]["selesai"] + DURASI_TAMBAH, x=960, y=280, jangkar="tengah", kata=[K("if your life had a cash book", w("If", "14"))])
    k(peran="r2", dari=w("which", "15"), sampai=b["15"]["selesai"] + DURASI_TAMBAH, x=960, y=420, jangkar="tengah", teks="which line saved you?")
    k(peran="lead", dari=w("Tell", "15"), sampai=b["15"]["selesai"] + DURASI_TAMBAH, x=960, y=640, jangkar="tengah", kata=[K("tell me in the comments", w("Tell", "15"))])
    return T


def EKSTRA_SFX(w):
    b = w.beat
    return [
        {"t": 0.0, "file": "sfx/glitch_cut.mp3", "gain": -16, "pilar": "aksen", "peran": "frame 0: gebrakan bunyi (Lantai D22c)"},
        {"t": w("cash", "02"), "file": "sfx/page_turn.wav", "gain": -13, "pilar": "foley", "peran": "buku kas dibuka"},
        {"t": w("0", "06"), "file": "sfx/sub_drop.wav", "gain": -11, "pilar": "aksen", "peran": "nol pemesanan"},
        {"t": w("Maxed", "09"), "file": "sfx/impact_thud.wav", "gain": -12, "pilar": "aksen", "peran": "kartu kredit habis"},
        {"t": round(w("receipt", "13") - 0.05, 3), "file": "sfx/page_turn.wav", "gain": -14, "pilar": "foley", "peran": "struk penuh dibuka"},
    ]


MUSIK = [
    {"file": "musik/mixkit-instrument-piano-184.mp3", "dari": 0.0, "sampai": 76.6, "gain": -6.0, "fadeIn": 0.05, "fadeOut": 0.6},
    {"file": "musik/mixkit-minimalism-506.mp3", "dari": 76.3, "sampai": 92.98, "gain": -11.5, "fadeIn": 0.6, "fadeOut": 1.2},
]
