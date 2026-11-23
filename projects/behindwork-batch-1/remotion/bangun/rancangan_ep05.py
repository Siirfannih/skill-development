"""Ep05 Stewart Butterfield · r2 (D-24..D-32): dunia game Glitch yang penuh warna = kanvas utama full-bleed; warna
luntur mendadak saat pengumuman tutup lalu hitam "TWICE IT FAILED."; zoom ke elemen kecil di layar game lalu whip-pan
ke Flickr / Slack; catatan perpisahan dan rilis akuisisi dibangun ulang sebagai halaman + stabilo; putih "$27.7 BILLION."
Layar terbelah simetris r1 dibuang (dua siklus tidak lagi tampil salin-tempel)."""
from r2 import J, JT, T, KANVAS, SCRIM, NAPAS

ID = "Ep05"
VO = "/mnt/storage-projects/behindwork-batch-1/ep05/vo/rakit"
VO_BEATS = f"{VO}/vo_beats.json"
VO_WORDS = f"{VO}/vo_words.json"
VO_SRC = "ep05/vo.wav"
SUB_MD = "/home/irfan/work/skill-development/projects/behindwork-batch-1/vo/ep05_vo_en.md"
DURASI_TAMBAH = 0.7
E = "ep05/"
GAME = E + "glitch_alpha_0010-0040.mp4"
TUTUP = ["This is a horrible day. This is a horrible thing to have to say: Glitch is closing.",
         "Unfortunately, Glitch has not attracted an audience large enough to sustain itself and based on a long period of experimentation and our best estimates, it seems unlikely that it ever would.",
         "We had ambitious goals to create a crazy, beautiful, worthwhile game with a wide audience that would be very successful, both creatively and financially. But we only managed to create a crazy, beautiful game."]
AKUISISI = ["Salesforce, the global leader in CRM, and Slack Technologies, Inc., the most innovative enterprise communications platform, have entered into a definitive agreement under which Salesforce will acquire Slack.",
            "Under the terms of the agreement, Slack shareholders will receive $26.79 in cash and 0.0776 shares of Salesforce common stock for each Slack share, representing an enterprise value of approximately $27.7 billion."]


def K(w_, t, **kw):
    d = {"w": w_, "t": t}; d.update(kw); return d


def game(mulai, jalur, **kw):
    return J(GAME, jalur, mulaiSumber=mulai, tekstur=True, **kw)


def adegan(w):
    b = w.beat; A = []
    def a(id_, dari, sampai, lapisan, **kw):
        d = {"id": id_, "dari": round(dari, 3), "sampai": round(sampai, 3), "lapisan": lapisan}; d.update(kw); A.append(d)
    t_but, t_sl = w("but", "01"), w("and", "01")
    # 01 dunia Glitch memanjakan mata -> whip Flickr -> whip Slack
    a("01a", 0, t_but, [game(12.0, [T(0, .5, .5, 1.0), T(1.0, .5, .55, 1.15)], grade="redam")])
    a("01b", t_but, t_sl, [J(E + "x_early_flickr_format.png", [T(t_but, .45, .45, 1.1)]), SCRIM("bawah", 0.7)], masuk="whip")
    a("01c", t_sl, b["02"]["mulai"], [J(E + "wb_slack_2013_shot.png", [T(t_sl, .35, .05, 1.6, ax=.4, ay=.3)]), SCRIM("bawah", 0.75)], masuk="whip")
    # 02 pembuatnya -> putih "SAME PATTERN."
    t_and2 = w("and", "02")
    a("02a", b["02"]["mulai"], t_and2, [JT(E + "qx4_0026-0050.mp4", 2.0, b["02"]["mulai"], t_and2, ax=.68, s=1.35), SCRIM("kiri", 0.45)], masuk="grid")
    a("02b", t_and2, b["03"]["mulai"], [KANVAS("terang")], masuk="putih")
    # 03 Game Neverending: halaman 2003 -> peta pulau (tekstur, teks besar di tengah)
    t_in3 = w("in", "03")
    a("03a", b["03"]["mulai"], t_in3, [J(E + "wb_gameneverending_2003_shot.png", [T(b["03"]["mulai"], .3, .04, 1.7, ax=.4, ay=.3), T(w("Game", "03", 2), .3, .06, 2.0, ax=.4, ay=.3)]), SCRIM("bawah", 0.8)], masuk="whip")
    a("03b", t_in3, b["04"]["mulai"], [J(E + "island_3x.png", [T(t_in3, .5, .5, 1.0), T(w("online", "03"), .45, .45, 1.3)], grade="dalam", tekstur=True)], masuk="grid")
    # 04 hitam "GLITCH." -> dunia Glitch (tekstur, teks besar di tengah)
    t_from = w("from", "04")
    a("04a", b["04"]["mulai"], t_from, [KANVAS("gelap")])
    a("04b", t_from, b["05"]["mulai"], [game(1.0, [T(t_from, .5, .5, 1.0), T(w("also", "04"), .5, .5, 1.15)], grade="redam")], masuk="whip")
    # 05 krisis dot-com -> putih "MONEY RAN LOW."
    t_and5 = w("and", "05")
    a("05a", b["05"]["mulai"], t_and5, [JT(E + "qx4_0245-0350.mp4", 47.0, b["05"]["mulai"], t_and5, ax=.68, s=1.35, grade="bw"), SCRIM("kiri", 0.45)], masuk="whip")
    a("05b", t_and5, w("second", "06"), [KANVAS("terang")])
    # 06 satu karakter sendirian di tebing (sedikit pemain) -> catatan Tiny Speck disorot
    t_tiny = w("Tiny", "06")
    a("06a", w("second", "06"), t_tiny, [J(E + "still_glitch_alpha_t13.5_2x.png", [T(w("second", "06"), .5, .5, 1.0), T(w("few", "06"), .32, .45, 1.8)], grade="dalam", tekstur=True)], masuk="whip")
    a("06b", t_tiny, b["07"]["mulai"], [{"k": "artikel", "situs": "Glitch · Tiny Speck", "judul": "A Sad Announcement from Tiny Speck", "paragraf": TUTUP[:2],
                                          "sorot": [{"p": 1, "teks": "Glitch has not attracted an audience large enough to sustain itself", "t": round(t_tiny + 0.2, 3)}],
                                          "jalur": [T(t_tiny, .5, .2, 1.0), T(t_tiny + 0.4, .5, .30, 1.34)]}], masuk="whip")
    # 07 hitam "November 2012." -> dunia Glitch luntur saat "closing" -> TechCrunch BW -> hitam "TWICE IT FAILED."
    t_glitch, t_and7, t_jobs = w("Glitch", "07"), w("and", "07"), w("jobs", "07")
    a("07a", b["07"]["mulai"], t_glitch, [KANVAS("gelap")])
    a("07b", t_glitch, t_and7, [game(12.5, [T(t_glitch, .5, .5, 1.05), T(w("closing", "07"), .5, .5, 1.12)], luntur=round(w("closing", "07"), 3))], masuk="whip")
    a("07c", t_and7, t_jobs, [J(E + "techcrunch_glitch_2012_shot.png", [T(t_and7, .5, .12, 1.2, ay=.4)], grade="dalam", tekstur=True)])
    a("07d", t_jobs, w("honest", "08"), [KANVAS("gelap")])
    # 08 catatan perpisahan: kalimat "crazy, beautiful game" disorot
    a("08", w("honest", "08"), b["09"]["mulai"], [{"k": "artikel", "situs": "Glitch · Tiny Speck", "judul": "Why why why why?", "paragraf": TUTUP[2:],
                                                    "sorot": [{"p": 0, "teks": "But we only managed to create a crazy, beautiful game.", "t": round(w("we", "08"), 3)}],
                                                    "jalur": [T(w("honest", "08"), .5, .2, 1.0), T(w("It", "08"), .5, .26, 1.34)]}], masuk="whip")
    # 09 hitam "something behind." -> 10 zoom ke peta pulau (teknologi game 1) -> whip ke Flickr
    a("09", b["09"]["mulai"], w("From", "10"), [KANVAS("gelap")])
    t_ph, t_fl = w("photo", "10"), w("Flickr", "10")
    a("10a", w("From", "10"), t_ph, [J(E + "island_3x.png", [T(w("From", "10"), .5, .5, 1.1), T(w("technology", "10"), .62, .40, 2.6)], grade="redam")])
    a("10b", t_ph, t_fl - 0.1, [J(E + "x_early_flickr_format.png", [T(t_ph, .45, .45, 1.05), T(t_ph + 0.5, .30, .40, 1.5)]), SCRIM("bawah", 0.6)], masuk="whip")
    a("10c", t_fl - 0.1, w("From", "10", 2), [KANVAS("terang")])
    # 11 zoom ke panel UI kecil di layar Glitch (alat obrolan) -> whip ke halaman Slack 2013
    t_wk = w("work", "11")
    a("11a", w("From", "10", 2), t_wk, [J(E + "still_glitch_alpha_t16.5_2x.png", [T(w("From", "10", 2), .5, .5, 1.0), T(w("chat", "11"), .22, .30, 2.6), T(w("second", "11"), .22, .30, 2.8)], grade="redam"), SCRIM("bawah", 0.6)])
    a("11b", t_wk, b["12"]["mulai"], [J(E + "wb_slack_2013_shot.png", [T(t_wk, .35, .05, 1.6, ax=.4, ay=.3), T(w("Slack", "11"), .35, .08, 1.9, ax=.4, ay=.3)]), SCRIM("bawah", 0.75)], masuk="whip")
    a("12", b["12"]["mulai"], b["13"]["mulai"], [KANVAS("gelap")])
    # 13 Macworld 2005: Yahoo membeli Flickr (judul tajam, teks di pita bawah)
    a("13", b["13"]["mulai"], b["14"]["mulai"], [J(E + "macworld_yahoo_flickr_2005_shot.png", [T(b["13"]["mulai"], .4, .31, 1.3, ax=.45, ay=.35), T(w("never", "13"), .4, .32, 1.45, ax=.45, ay=.35)]), SCRIM("bawah", 0.85)], masuk="grid")
    # 14 hitam "2021." -> rilis akuisisi disorot -> putih "$27.7 BILLION."
    t_sf, t_27 = w("Salesforce", "14"), w("$27", "14")
    a("14a", b["14"]["mulai"], t_sf, [KANVAS("gelap")])
    a("14b", t_sf, t_27, [{"k": "artikel", "situs": "Slack · News", "judul": "Salesforce Signs Definitive Agreement to Acquire Slack", "paragraf": AKUISISI,
                           "sorot": [{"p": 1, "teks": "an enterprise value of approximately $27.7 billion", "t": round(w("worth", "14"), 3)}],
                           "jalur": [T(t_sf, .5, .2, 1.0), T(w("deal", "14") - 0.3, .5, .36, 1.34)]}], masuk="whip")
    a("14c", t_27, b["15"]["mulai"], [KANVAS("terang")], masuk="putih")
    # 15 dunia Glitch hitam-putih: dua kali gagal -> putih "SAVED THEM."
    t_sv = w("saved", "15")
    a("15a", b["15"]["mulai"], t_sv, [game(14.0, [T(b["15"]["mulai"], .5, .5, 1.1)], grade="dalam")], masuk="grid")
    a("15b", t_sv, b["16"]["mulai"], [KANVAS("terang")])
    # 16 warna kembali: produk terbaikmu
    a("16", b["16"]["mulai"], b["17"]["mulai"], [game(10.0, [T(b["16"]["mulai"], .5, .5, 1.05), T(w("while", "16"), .5, .5, 1.15)], grade="dalam")], masuk="whip")
    a("17", b["17"]["mulai"], b["17"]["selesai"] + DURASI_TAMBAH, [KANVAS("gelap")])
    return A


def kt(w):
    b = w.beat; T_ = []; END = b["17"]["selesai"] + DURASI_TAMBAH
    def k(**kw): T_.append(kw)
    t_but, t_sl = w("but", "01"), w("and", "01")
    k(peran="lead", dari=w("two", "01"), sampai=t_but, x=960, y=360, jangkar="tengah", bayang=True, kata=[K("these two games", w("These", "01"))])
    k(peran="r6", dari=w("failed", "01"), sampai=t_but, x=960, y=450, jangkar="tengah", teks="failed completely", ukuran=130, bayang=True)
    k(peran="r6", dari=w("Flickr", "01"), sampai=t_sl, x=960, y=780, jangkar="tengah", teks="Flickr", ukuran=130, bayang=True)
    k(peran="r6", dari=w("Slack", "01"), sampai=b["02"]["mulai"], x=960, y=780, jangkar="tengah", teks="Slack", ukuran=130, bayang=True)
    t_and2 = w("and", "02")
    k(peran="lead", dari=w("same", "02"), sampai=t_and2, x=170, y=280, bayang=True, kata=[K("one maker", w("same", "02"))])
    k(peran="r1", dari=w("Stewart", "02"), sampai=t_and2, x=170, y=380, bayang=True, kata=[K("Stewart", w("Stewart", "02")), K("Butterfield", w("Butterfield", "02"), baris=1)])
    T_.append(NAPAS("SAME\nPATTERN.", w("same", "02", 2), b["03"]["mulai"], warna="tinta", ukuran=230))
    t_in3 = w("in", "03")
    k(peran="r1", dari=w("Game", "03", 2), sampai=t_in3, x=960, y=760, jangkar="tengah", bayang=True, kata=[K("Game Neverending", w("Game", "03", 2))])
    k(peran="r6", dari=w("2002", "03"), sampai=b["04"]["mulai"], x=960, y=380, jangkar="tengah", teks="2002", ukuran=210, bayang=True)
    k(peran="r2", dari=w("online", "03"), sampai=b["04"]["mulai"], x=960, y=600, jangkar="tengah", teks="a browser game", ukuran=110, bayang=True)
    t_from = w("from", "04")
    k(peran="r1", dari=w("second", "04"), sampai=w("Glitch", "04"), x=960, y=470, jangkar="tengah", kata=[K("his second game:", w("second", "04"))])
    T_.append(NAPAS("GLITCH.", w("Glitch", "04"), t_from, ukuran=300))
    k(peran="r6", dari=w("2009", "04"), sampai=b["05"]["mulai"], x=960, y=380, jangkar="tengah", teks="2009", ukuran=210, bayang=True)
    k(peran="r2", dari=w("also", "04"), sampai=b["05"]["mulai"], x=960, y=600, jangkar="tengah", teks="also a browser game", ukuran=110, bayang=True)
    t_and5 = w("and", "05")
    k(peran="lead", dari=w("first", "05"), sampai=t_and5, x=170, y=300, bayang=True, kata=[K("game 1 ran into", w("first", "05"))])
    k(peran="r1", dari=w("dot", "05"), sampai=t_and5, x=170, y=400, bayang=True, kata=[K("the dot-com", w("dot", "05")), K("crash", w("crash", "05"), baris=1)])
    T_.append(NAPAS("MONEY\nRAN LOW.", w("money", "05"), w("second", "06"), warna="tinta", ukuran=230))
    t_tiny = w("Tiny", "06")
    k(peran="r1", dari=w("second", "06"), sampai=w("too", "06"), x=960, y=430, jangkar="tengah", bayang=True, kata=[K("game 2 ran into", w("second", "06"))])
    k(peran="r6", dari=w("too", "06"), sampai=t_tiny, x=960, y=420, jangkar="tengah", teks="too few players", ukuran=130, bayang=True)
    t_glitch, t_and7, t_jobs = w("Glitch", "07"), w("and", "07"), w("jobs", "07")
    T_.append(NAPAS("November\n2012.", w("November", "07"), t_glitch, ukuran=230))
    k(peran="kotak", dari=t_glitch, sampai=t_and7, x=960, y=440, jangkar="tengah", teks="Glitch is closing", ukuran=110)
    k(peran="lead", dari=w("TechCrunch", "07"), sampai=t_jobs, x=960, y=230, jangkar="tengah", kata=[K("TechCrunch reported", w("TechCrunch", "07"))])
    k(peran="giant", dari=w("30", "07"), sampai=t_jobs, x=960, y=320, jangkar="tengah", ukuran=380, angka={"dari": 0, "ke": 30, "durasi": 0.6})
    k(peran="r2", dari=w("people", "07"), sampai=t_jobs, x=960, y=700, jangkar="tengah", teks="people lost their jobs", ukuran=110)
    T_.append(NAPAS("TWICE\nIT FAILED.", t_jobs, w("honest", "08"), ukuran=240))
    T_.append(NAPAS("something\nbehind.", w("something", "09"), w("From", "10"), ukuran=230))
    t_ph, t_fl = w("photo", "10"), w("Flickr", "10")
    k(peran="lead", dari=w("first", "10"), sampai=t_ph, x=960, y=360, jangkar="tengah", bayang=True, kata=[K("game 1's technology", w("first", "10"))])
    k(peran="r2", dari=t_ph, sampai=t_fl - 0.1, x=960, y=780, jangkar="tengah", teks="a photo site", bayang=True)
    T_.append(NAPAS("Flickr.", t_fl - 0.1, w("From", "10", 2), warna="tinta", ukuran=300))
    t_wk = w("work", "11")
    k(peran="lead", dari=w("chat", "11"), sampai=t_wk, x=960, y=700, jangkar="tengah", bayang=True, kata=[K("a chat tool on IRC", w("chat", "11"))])
    k(peran="r6", dari=w("Slack", "11"), sampai=b["12"]["mulai"], x=960, y=760, jangkar="tengah", teks="Slack", ukuran=150, bayang=True)
    k(peran="r2", dari=t_wk, sampai=w("Slack", "11"), x=960, y=780, jangkar="tengah", teks="a work app", bayang=True)
    T_.append(NAPAS("even the endings\nrhyme.", w("even", "12"), b["13"]["mulai"], ukuran=170))
    k(peran="r6", dari=w("2005", "13"), sampai=w("Yahoo", "13"), x=960, y=760, jangkar="tengah", teks="2005", ukuran=150, bayang=True)
    k(peran="r2", dari=w("Yahoo", "13"), sampai=w("price", "13"), x=960, y=780, jangkar="tengah", teks="Yahoo bought Flickr", bayang=True)
    k(peran="kotak", dari=w("price", "13"), sampai=b["14"]["mulai"], x=960, y=770, jangkar="tengah", teks="price: never announced")
    t_sf, t_27 = w("Salesforce", "14"), w("$27", "14")
    T_.append(NAPAS("2021.", w("2021", "14"), t_sf, ukuran=330))
    T_.append(NAPAS("$27.7\nBILLION.", t_27, b["15"]["mulai"], warna="tinta", ukuran=240, aksen="BILLION."))
    t_sv = w("saved", "15")
    k(peran="r1", dari=w("Twice", "15"), sampai=w("and", "15"), x=960, y=420, jangkar="tengah", kata=[K("twice, the game failed", w("Twice", "15"))])
    k(peran="r1", dari=w("twice", "15", 2), sampai=t_sv, x=960, y=420, jangkar="tengah", kata=[K("twice, a tool", w("twice", "15", 2)), K("built for themselves", w("built", "15"), baris=1)])
    T_.append(NAPAS("SAVED\nTHEM.", t_sv, b["16"]["mulai"], warna="tinta", ukuran=250, aksen="SAVED"))
    k(peran="lead", dari=w("best", "16"), sampai=b["17"]["mulai"], x=960, y=300, jangkar="tengah", kata=[K("your best product might be", w("your", "16"))])
    k(peran="r6", dari=w("tool", "16"), sampai=b["17"]["mulai"], x=960, y=390, jangkar="tengah", teks="the tool you build", ukuran=130)
    k(peran="r2", dari=w("while", "16"), sampai=b["17"]["mulai"], x=960, y=560, jangkar="tengah", teks="while chasing something else", ukuran=96)
    T_.append(NAPAS("what homemade tool\nsaved your work?", w("homemade", "17"), END, ukuran=130, aksen="saved"))
    k(peran="lead", dari=w("Tell", "17"), sampai=END, x=960, y=720, jangkar="tengah", kata=[K("tell me in the comments", w("Tell", "17"))])
    return T_


def EKSTRA_SFX(w):
    return [
        {"t": 0.0, "file": "sfx/glitch_cut.mp3", "gain": -16, "pilar": "aksen", "peran": "frame 0: gebrakan bunyi (Lantai D22c)"},
        {"t": w("money", "05"), "file": "sfx/sub_drop.wav", "gain": -12, "pilar": "aksen", "peran": "uang habis"},
        {"t": w("jobs", "07"), "file": "sfx/impact_thud.wav", "gain": -11, "pilar": "aksen", "peran": "TWICE IT FAILED"},
        {"t": round(w("Slack", "11") - 1.2, 3), "file": "sfx/riser_cymbal.wav", "gain": -17, "pilar": "aksen", "peran": "menuju Slack lahir"},
        {"t": round(w("$27", "14") - 1.2, 3), "file": "sfx/riser_cymbal.wav", "gain": -17, "pilar": "aksen", "peran": "menuju angka akuisisi"},
    ]


MUSIK = [
    {"file": "musik/mixkit-futuristic-1167.mp3", "dari": 0.0, "sampai": 45.1, "gain": -3.5, "fadeIn": 0.05, "fadeOut": 0.5},
    {"file": "musik/mixkit-corporate-music-440.mp3", "dari": 44.9, "sampai": 90.29, "gain": -6.0, "fadeIn": 0.4, "fadeOut": 1.2},
]
