"""Ep03 YouTube · r2 (D-24..D-30): video "Me at the zoo" full-bleed sebagai jangkar (tanpa timeline detik); zoom
digital ke wajah Jawed dan ke gajah; freeze-frame BW -> dokumen asli dibangun ulang sebagai UI artikel dengan stabilo
(pidato Karim, Time, rilis SEC); iklan baris $20; kanvas napas "TUNE IN. HOOK UP.", "0 REPLIES.", "$1.65 BILLION.";
whip-pan montase anjing / liburan / gajah."""
from r2 import J, T, KANVAS, SCRIM, NAPAS

ID = "Ep03"
VO = "/mnt/storage-projects/behindwork-batch-1/ep03/vo/rakit"
VO_BEATS = f"{VO}/vo_beats.json"
VO_WORDS = f"{VO}/vo_words.json"
VO_SRC = "ep03/vo.wav"
SUB_MD = "/home/irfan/work/skill-development/projects/behindwork-batch-1/vo/ep03_vo_en.md"
DURASI_TAMBAH = 0.7
E = "ep03/"
ZOO = E + "zoo.mp4"

PIDATO = ["We didn't even know how to describe our new product. To generate interest we just said it was a new kind of dating site. Because let's face it – the one thing the Internet needs more of, is another dating site. We even had a slogan for it: “Tune in – Hook up”. But there was one catch – we didn't have any videos.",
          "We were so desperate for some actual dating videos, whatever that means, that we turned to the website that any desperate person would turn to: Craigslist. We spammed Craigslist in Los Angeles and Las Vegas, encouraging women to upload videos of themselves. In exchange, we offered to send them twenty dollars, for every video uploaded. It was a brilliant marketing scheme. Except for the fact that we didn't get a single reply."]
TIME = ["In the stripped-down version – repeated in dozens of news accounts – Chad and Steve got the idea in the winter of 2005, after they had trouble sharing videos online that had been shot at a dinner party at Steve's San Francisco apartment. Karim says the dinner party never happened and that the seed idea of video sharing was his – although he is quick to say its realization in YouTube required “the equal efforts of all three of us.”"]
SEC = ["MOUNTAIN VIEW, Calif., October 9, 2006 – Google Inc. announced today that it has agreed to acquire YouTube, the consumer media company for people to watch and share original videos through a Web experience, for $1.65 billion in a stock-for-stock transaction. Following the acquisition, YouTube will operate independently to preserve its successful brand and passionate community."]


def K(w_, t, **kw):
    d = {"w": w_, "t": t}; d.update(kw); return d


def zoo(dari, mulai, jalur, **kw):
    return J(ZOO, jalur, mulaiSumber=mulai, **kw)


def adegan(w):
    b = w.beat; A = []
    def a(id_, dari, sampai, lapisan, **kw):
        d = {"id": id_, "dari": round(dari, 3), "sampai": round(sampai, 3), "lapisan": lapisan}; d.update(kw); A.append(d)
    t_and2 = w("and", "01", 2)
    # 01 video pertama full-bleed: Jawed di kanan, lalu kamera melompat ke gajah
    a("01a", 0, t_and2, [zoo(0, 0.0, [T(0, .47, .42, 1.3, ax=.70, ay=.45), T(w("two", "01"), .80, .30, 1.7, ax=.66, ay=.40)]), SCRIM("kiri", 0.55)])
    a("01b", t_and2, b["02"]["mulai"], [KANVAS("terang")], masuk="putih")
    # 02 grid membuka ke kebun binatang -> kanvas tanggal -> kebun binatang lagi
    t_apr, t_at2 = w("April", "02"), w("at", "02", 2)
    a("02a", b["02"]["mulai"], t_apr, [zoo(b["02"]["mulai"], 0.0, [T(b["02"]["mulai"], .5, .5, 1.0)])], masuk="grid")
    a("02b", t_apr, t_at2, [KANVAS("terang")])
    a("02c", t_at2, b["03"]["mulai"], [zoo(t_at2, 1.2, [T(t_at2, .5, .5, 1.05), T(w("Zoo", "02"), .55, .5, 1.15)]), SCRIM("bawah", 0.6)], masuk="whip")
    # 03 zoom digital ke wajah Jawed -> napas -> komposit tiga pendiri digeser per nama
    t_third, t_chad, t_all = w("the", "03"), w("Chad", "03"), w("all", "03")
    a("03a", b["03"]["mulai"], t_third, [zoo(b["03"]["mulai"], 2.0, [T(b["03"]["mulai"], .47, .42, 1.3, ax=.66, ay=.45), T(w("Jawed", "03"), .46, .40, 2.3, ax=.68, ay=.45)]), SCRIM("kiri", 0.55)])
    a("03b", t_third, t_chad, [KANVAS("gelap")])
    a("03c", t_chad, b["04"]["mulai"], [J(E + "youtube_founders_komposit.jpg", [T(t_chad, .17, .5, 1.0), T(w("Steve", "03"), .5, .5, 1.0), T(t_all, .5, .5, 1.0)]), SCRIM("bawah", 0.6)], masuk="whip", arah="kiri")
    # 04 freeze-frame BW -> slide Valentine -> napas "a dating site." -> pidato asli disorot -> putih "TUNE IN. HOOK UP."
    t_star, t_dat, t_and4, t_tune = w("started", "04"), w("dating", "04"), w("and", "04"), w("Tune", "04")
    a("04a", b["04"]["mulai"], t_star, [J(E + "zoo_beku_4s.png", [T(b["04"]["mulai"], .45, .45, 1.15)], grade="bw"), SCRIM("bawah", 0.5)], masuk="putih")
    a("04b", t_star, t_dat - 0.15, [J(E + "still_acm_valentine_slide_t30.png", [T(t_star, .55, .4, 1.15), T(w("Valentine's", "04"), .60, .20, 1.8)]), SCRIM("bawah", 0.6)], masuk="whip")
    a("04c", t_dat - 0.15, t_and4, [KANVAS("gelap")])
    a("04d", t_and4, t_tune, [{"k": "artikel", "situs": "University of Illinois · Commencement 2007", "judul": "Commencement Address", "meta": "Jawed Karim · May 13, 2007",
                               "paragraf": PIDATO, "sorot": [{"p": 0, "teks": "“Tune in – Hook up”", "t": round(w("slogan", "04"), 3)}],
                               "jalur": [T(t_and4, .5, .25, 1.0), T(w("slogan", "04") - 0.3, .5, .30, 1.34)]}], masuk="whip")
    a("04e", t_tune, b["05"]["mulai"], [KANVAS("terang")])
    # 05 gajah bukan calon pacar -> napas "SO EMPTY." -> iklan baris $20 -> "0 REPLIES."
    t_and5, t_emp, t_off, t_and52 = w("and", "05"), w("empty", "05") - 0.3, w("offered", "05"), w("and", "05", 2)
    a("05a", b["05"]["mulai"], t_emp, [zoo(b["05"]["mulai"], 7.0, [T(b["05"]["mulai"], .5, .45, 1.2), T(w("elephant", "05"), .80, .30, 1.9, ax=.66, ay=.40)]), SCRIM("atas", 0.6)], masuk="grid")
    a("05b", t_emp, t_off - 0.2, [KANVAS("terang")])
    a("05c", t_off - 0.2, t_and52, [{"k": "iklan", "judul": "Upload a video of yourself:", "harga": "$20", "t": round(t_off - 0.2, 3),
                                      "baris": ["Get paid $20 for every video you upload.", "Los Angeles · Las Vegas", "Reply by email."]}], masuk="whip")
    a("05d", t_and52, b["06"]["mulai"], [KANVAS("gelap")])
    # 06 orang mengunggah apa saja: whip-pan montase
    t_dogs, t_hol, t_ele, t_so6 = w("dogs", "06"), w("holidays", "06"), w("elephants", "06"), w("all", "06") - 0.15
    a("06a", b["06"]["mulai"], t_dogs, [zoo(b["06"]["mulai"], 12.0, [T(b["06"]["mulai"], .45, .45, 1.2, ax=.68), T(w("uploading", "06"), .45, .45, 1.35, ax=.70)]), SCRIM("kiri", 0.55)], masuk="whip")
    a("06b", t_dogs, t_hol, [J(E + "x_anjing_pantai.jpg", [T(t_dogs, .5, .5, 1.05), T(t_dogs + 0.4, .5, .5, 1.15)])], masuk="whip")
    a("06c", t_hol, t_ele, [J(E + "x_liburan_pantai.jpg", [T(t_hol, .5, .4, 1.05), T(t_hol + 0.4, .5, .4, 1.15)])], masuk="whip")
    a("06d", t_ele, t_so6, [zoo(t_ele, 13.0, [T(t_ele, .80, .30, 1.8, ax=.5), T(t_ele + 0.4, .80, .30, 2.0, ax=.5)])], masuk="whip")
    a("06e", t_so6, w("second", "07"), [KANVAS("terang")])
    # 07 artikel Time disorot -> napas "NEVER HAPPENED." -> Steve Chen
    t_nev, t_and7 = w("never", "07"), w("and", "07")
    a("07a", w("second", "07"), t_nev - 0.1, [{"k": "artikel", "situs": "TIME · 2006", "judul": "The YouTube Gurus", "paragraf": TIME,
                                                "sorot": [{"p": 0, "teks": "a dinner party at Steve's San Francisco apartment", "t": round(w("dinner", "07"), 3)}],
                                                "jalur": [T(w("second", "07"), .5, .22, 1.0), T(w("dinner", "07") - 0.35, .5, .27, 1.38)]}], masuk="whip")
    a("07b", t_nev - 0.1, t_and7, [KANVAS("gelap")])
    a("07c", t_and7, b["08"]["mulai"], [J(E + "steve_chen_taiwan.jpg", [T(t_and7, .54, .25, 1.2, ax=.80, ay=.38), T(w("stronger", "07"), .54, .25, 1.3, ax=.80, ay=.38)]), SCRIM("kiri", 0.5)], masuk="whip")
    # 08 napas "Karim's own version." -> tsunami 2004 (hormat: tanpa whip/glitch, drift pelan)
    t_idea = w("idea", "08")
    a("08a", b["08"]["mulai"], t_idea - 0.1, [KANVAS("gelap")])
    a("08b", t_idea - 0.1, b["09"]["mulai"], [J(E + "banda_aceh_2004_street.jpeg", [T(t_idea - 0.1, .5, .45, 1.05, drift=0.01)], grade="gelap")])
    # 09 napas "it ends." -> rilis SEC disorot -> napas "$1.65 BILLION."
    t_and9, t_1 = w("and", "09"), round(w("billion", "09") - 1.08, 3)
    a("09a", b["09"]["mulai"], t_and9, [KANVAS("gelap")])
    a("09b", t_and9, t_1, [{"k": "artikel", "situs": "U.S. SEC · EX-99.1 Press Release", "judul": "Google To Acquire YouTube for $1.65 Billion in Stock", "paragraf": SEC,
                            "sorot": [{"p": 0, "teks": "$1.65 billion in a stock-for-stock transaction", "t": round(w("bought", "09"), 3)}],
                            "jalur": [T(t_and9, .5, .2, 1.0), T(w("Google", "09") - 0.3, .5, .30, 1.34)]}], masuk="whip")
    a("09c", t_1, b["10"]["mulai"], [KANVAS("gelap")], masuk="putih")
    # 10 suara asli Chad & Steve: full-bleed
    a("10", b["10"]["mulai"], b["11"]["mulai"], [J(E + "chadsteve.mp4", [T(b["10"]["mulai"], .5, .4, 1.0)], mulaiSumber=8.05), SCRIM("atas", 0.6)])
    t_but = w("but", "11")
    a("11a", b["11"]["mulai"], t_but, [J(E + "still_acm_valentine_slide_t30.png", [T(b["11"]["mulai"], .55, .3, 1.2)], grade="bw"), SCRIM("rata", 0.8)], masuk="whip")
    a("11b", t_but, b["12"]["mulai"], [KANVAS("gelap")])
    # 12 kembali ke jangkar: video pertama
    a("12", b["12"]["mulai"], b["13"]["mulai"], [zoo(b["12"]["mulai"], 0.0, [T(b["12"]["mulai"], .45, .45, 1.35, ax=.74), T(w("if", "12"), .45, .45, 1.45, ax=.76)], laju=0.6), SCRIM("kiri", 0.6)], masuk="grid")
    a("13", b["13"]["mulai"], b["13"]["selesai"] + DURASI_TAMBAH, [KANVAS("gelap")])
    return A


def kt(w):
    b = w.beat; T_ = []; END = b["13"]["selesai"] + DURASI_TAMBAH
    def k(**kw): T_.append(kw)
    t_and2 = w("and", "01", 2)
    k(peran="r1", dari=w("YouTube's", "01"), sampai=w("two", "01"), x=140, y=280, bayang=True, kata=[K("YouTube's", w("YouTube's", "01")), K("first video", w("first", "01"), baris=1)])
    k(peran="r2", dari=w("19", "01"), sampai=w("two", "01"), x=135, y=500, teks="19 seconds", ukuran=112, bayang=True)
    k(peran="r2", dari=w("two", "01"), sampai=t_and2, x=1755, y=170, jangkar="kanan", teks="two elephants", bayang=True)
    T_.append(NAPAS("SECOND BY\nSECOND.", w("second", "01", 2), b["02"]["mulai"], warna="tinta", ukuran=190))
    k(peran="lead", dari=w("how", "01"), sampai=b["02"]["mulai"], x=960, y=760, jangkar="tengah", warna="tinta", kata=[K("how YouTube began", w("how", "01"))])
    t_apr, t_at2 = w("April", "02"), w("at", "02", 2)
    T_.append(NAPAS("April 23,\n2005.", t_apr, t_at2, warna="tinta", ukuran=210))
    k(peran="r2", dari=w("San", "02"), sampai=b["03"]["mulai"], x=165, y=780, teks="San Diego Zoo", bayang=True)
    t_third, t_chad, t_all = w("the", "03"), w("Chad", "03"), w("all", "03")
    k(peran="r1", dari=w("Jawed", "03"), sampai=t_third, x=170, y=380, bayang=True, kata=[K("Jawed Karim", w("Jawed", "03"))])
    T_.append(NAPAS("the third\nfounder.", t_third, t_chad, ukuran=200))
    k(peran="lead", dari=t_chad, sampai=w("Steve", "03"), x=960, y=800, jangkar="tengah", bayang=True, kata=[K("Chad Hurley", t_chad)])
    k(peran="lead", dari=w("Steve", "03"), sampai=t_all, x=960, y=800, jangkar="tengah", bayang=True, kata=[K("Steve Chen", w("Steve", "03"))])
    k(peran="kotak", dari=t_all, sampai=b["04"]["mulai"], x=960, y=780, jangkar="tengah", teks="all from PayPal")
    t_star, t_dat, t_and4, t_tune = w("started", "04"), w("dating", "04"), w("and", "04"), w("Tune", "04")
    k(peran="kotak", dari=w("surprise", "04"), sampai=t_star, x=170, y=780, teks="the surprise")
    k(peran="kotak", dari=w("Valentine's", "04"), sampai=t_dat - 0.15, x=170, y=780, teks="Valentine's Day")
    T_.append(NAPAS("a dating site.", t_dat - 0.1, t_and4, ukuran=180))
    T_.append(NAPAS("TUNE IN.\nHOOK UP.", t_tune, b["05"]["mulai"], warna="tinta", ukuran=230, aksen="HOOK UP."))
    t_and5, t_off, t_and52 = w("and", "05"), w("offered", "05"), w("and", "05", 2)
    k(peran="lead", dari=round(w("elephant", "05") + 0.5, 3), sampai=t_and5 + 0.0, x=1755, y=170, jangkar="kanan", bayang=True, kata=[K("an elephant is", w("an", "05"))])
    k(peran="r6", dari=w("not", "05"), sampai=w("site", "05"), x=1755, y=260, jangkar="kanan", teks="not a date", ukuran=150, bayang=True)
    k(peran="lead", dari=w("site", "05"), sampai=w("empty", "05") - 0.3, x=1755, y=170, jangkar="kanan", bayang=True, kata=[K("the site stayed", w("the", "05"))])
    T_.append(NAPAS("SO EMPTY.", w("empty", "05") - 0.05, t_off - 0.2, warna="tinta", ukuran=250))
    k(peran="lead", dari=w("replies", "05"), sampai=w("zero", "05"), x=960, y=470, jangkar="tengah", kata=[K("and the replies…", w("the", "05", 2))])
    T_.append(NAPAS("0 REPLIES.", w("zero", "05"), b["06"]["mulai"], ukuran=250, aksen="0"))
    t_dogs, t_hol, t_ele, t_so6 = w("dogs", "06"), w("holidays", "06"), w("elephants", "06"), w("all", "06") - 0.15
    k(peran="lead", dari=w("uploading", "06"), sampai=t_dogs, x=170, y=330, bayang=True, kata=[K("people uploaded", w("uploading", "06")), K("anything", w("anything", "06"), baris=1)])
    k(peran="r6", dari=t_dogs, sampai=t_hol, x=960, y=420, jangkar="tengah", teks="dogs,", bayang=True)
    k(peran="r6", dari=t_hol, sampai=t_ele, x=960, y=420, jangkar="tengah", teks="holidays,", bayang=True)
    k(peran="r6", dari=t_ele, sampai=w("so", "06"), x=1755, y=170, jangkar="kanan", teks="elephants", ukuran=180, bayang=True)
    k(peran="lead", dari=w("so", "06"), sampai=t_so6, x=1755, y=170, jangkar="kanan", bayang=True, kata=[K("so the site opened to", w("so", "06"))])
    T_.append(NAPAS("ALL VIDEOS.", w("all", "06"), w("second", "07"), warna="tinta", ukuran=250, aksen="ALL"))
    t_nev, t_and7 = w("never", "07"), w("and", "07")
    T_.append(NAPAS("NEVER\nHAPPENED.", t_nev - 0.1, t_and7, ukuran=210))
    k(peran="r1", dari=w("Chen", "07"), sampai=b["08"]["mulai"], x=140, y=280, bayang=True, kata=[K("Chen admitted", w("Chen", "07"))])
    k(peran="lead", dari=w("marketing", "07"), sampai=b["08"]["mulai"], x=140, y=420, bayang=True, kata=[K("marketing made it", w("marketing", "07"))])
    k(peran="r2", dari=w("stronger", "07"), sampai=b["08"]["mulai"], x=135, y=520, teks="stronger", bayang=True)
    t_idea = w("idea", "08")
    T_.append(NAPAS("Karim's own\nversion.", w("Karim's", "08"), t_idea - 0.1, ukuran=190))
    k(peran="lead", dari=t_idea, sampai=b["09"]["mulai"], x=170, y=200, bayang=True, kata=[K("the idea came from videos of the", t_idea)])
    k(peran="r6", dari=w("2004", "08"), sampai=b["09"]["mulai"], x=165, y=310, teks="2004 tsunami", ukuran=170, bayang=True)
    k(peran="r2", dari=w("Indonesia", "08"), sampai=b["09"]["mulai"], x=168, y=500, teks="in Indonesia", bayang=True)
    t_and9, t_1 = w("and", "09"), round(w("billion", "09") - 1.08, 3)
    T_.append(NAPAS("it ends.", w("ends", "09"), t_and9, ukuran=200))
    T_.append(NAPAS("$1.65\nBILLION.", t_1, b["10"]["mulai"], ukuran=240, aksen="BILLION."))
    k(peran="lead", dari=w("We've", "10"), sampai=b["11"]["mulai"], x=140, y=130, bayang=True, kata=[K("“We've been", w("We've", "10")), K("acquired by Google.”", w("acquired", "10"), baris=1)])
    t_but = w("but", "11")
    k(peran="lead", dari=w("planned", "11"), sampai=t_but, x=960, y=280, jangkar="tengah", bayang=True, kata=[K("they planned for", w("planned", "11"))])
    k(peran="r6", dari=w("dates", "11"), sampai=t_but, x=960, y=380, jangkar="tengah", teks="dates.", ukuran=260, bayang=True)
    k(peran="lead", dari=w("people", "11"), sampai=b["12"]["mulai"], x=960, y=250, jangkar="tengah", kata=[K("but people brought", w("people", "11"))])
    T_.append(NAPAS("everything\nelse.", w("everything", "11"), b["12"]["mulai"], ukuran=200, y=360))
    k(peran="lead", dari=w("first", "12"), sampai=w("if", "12"), x=140, y=170, bayang=True, kata=[K("your first plan", w("your", "12"))])
    k(peran="r6", dari=w("can", "12"), sampai=w("if", "12"), x=135, y=260, teks="can be wrong", ukuran=140, bayang=True)
    k(peran="r1", dari=w("if", "12"), sampai=b["13"]["mulai"], x=140, y=200, bayang=True, kata=[K("if you see", w("if", "12")), K("what people", w("what", "12"), baris=1), K("actually use", w("actually", "12"), baris=2)])
    T_.append(NAPAS("which second?", w("second", "13"), END, ukuran=170, y=400))
    k(peran="lead", dari=w("Tell", "13"), sampai=END, x=960, y=600, jangkar="tengah", bayang=True, kata=[K("tell me in the comments", w("Tell", "13"))])
    return T_


def EKSTRA_SFX(w):
    b = w.beat
    return [
        {"t": 0.0, "file": "sfx/glitch_cut.mp3", "gain": -16, "pilar": "aksen", "peran": "frame 0: gebrakan bunyi (Lantai D22c)"},
        {"t": w("zero", "05"), "file": "sfx/sub_drop.wav", "gain": -11, "pilar": "aksen", "peran": "nol balasan mendarat"},
        {"t": round(w("billion", "09") - 2.4, 3), "file": "sfx/riser_cymbal.wav", "gain": -16, "pilar": "aksen", "peran": "menuju angka akuisisi"},
        {"t": w("We've", "10") - 0.05, "file": "sfx/paper_slide.wav", "gain": -16, "pilar": "foley", "peran": "klip asli masuk"},
    ]


MUSIK = [
    {"file": "musik/mixkit-warm-443.mp3", "dari": 0.0, "sampai": 63.5, "gain": -4.7, "fadeIn": 0.05, "fadeOut": 0.6},
    {"file": "musik/mixkit-minimalism-506.mp3", "dari": 63.2, "sampai": 93.35, "gain": -11.5, "fadeIn": 0.7, "fadeOut": 1.2},
]
