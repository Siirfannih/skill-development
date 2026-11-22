"""Ep05 Stewart Butterfield · Gagal Dua Kali · Story Cinematic. Perangkat khas: layar terbelah yang berima.
Game 1 (kiri teks / kanan visual) dicerminkan Game 2 (kiri visual / kanan teks); akhir cerita juga dicerminkan."""
ID = "Ep05"
VO = "/mnt/storage-projects/behindwork-batch-1/ep05/vo/rakit"
VO_BEATS = f"{VO}/vo_beats.json"
VO_WORDS = f"{VO}/vo_words.json"
VO_SRC = "ep05/vo.wav"
SUB_MD = "/home/irfan/work/skill-development/projects/behindwork-batch-1/vo/ep05_vo_en.md"
DURASI_TAMBAH = 0.7
E = "ep05/"
M = {"k": "kartu", "warna": "malam"}; P = {"k": "kartu", "warna": "kertas"}
XL, XR = 120, 1080  # tepi kiri teks di belahan kiri / kanan


def K(w_, t, **kw):
    d = {"w": w_, "t": t}; d.update(kw); return d


def ins(src, x, y, w, h, **kw):
    d = {"k": "inset", "src": E + src, "x": x, "y": y, "w": w, "h": h}; d.update(kw); return d


def belah(kiri, kanan):
    return [{"k": "belah", "kiri": kiri, "kanan": kanan}]


def adegan(w):
    b = w.beat; A = []
    def a(id_, dari, sampai, lapisan, **kw):
        d = {"id": id_, "dari": round(dari, 3), "sampai": round(sampai, 3), "lapisan": lapisan}; d.update(kw); A.append(d)
    a("01a", 0, w("but", "01"), belah([M, ins("wb_gameneverending_2003_img01_island6_tr.gif", 120, 140, 720, 532, masuk="tumbuh")],
                                       [M, ins("still_glitch_alpha_t15.png", 1080, 200, 720, 405, masuk="tumbuh")]))
    a("01b", w("but", "01"), b["02"]["mulai"], belah([P, ins("x_early_flickr_format.png", 160, 160, 640, 448, masuk="bawah")],
                                                     [M, ins("wb_slack_2013_shot.png", 1120, 120, 640, 520, pos="50% 0%", masuk="bawah")]))
    a("02", b["02"]["mulai"], b["03"]["mulai"], [{"k": "video", "src": E + "qx4_0026-0050.mp4", "mulaiSumber": 2.0, "kb": {"s0": 1.12, "s1": 1.18, "x0": 160, "x1": 170, "kurva": "heavy"}}])
    a("03", b["03"]["mulai"], b["04"]["mulai"], belah([P], [M, ins("wb_gameneverending_2003_img01_island6_tr.gif", 1040, 220, 760, 561, masuk="kanan")]))
    a("04", b["04"]["mulai"], b["05"]["mulai"], belah([M, ins("glitch_alpha_0010-0040.mp4", 120, 300, 720, 405, video=True, mulaiSumber=11.0, masuk="kanan")], [M]))
    a("05", b["05"]["mulai"], w("second", "06"), belah([P], [{"k": "video", "src": E + "qx4_0245-0350.mp4", "mulaiSumber": 47.0, "grade": "bw", "kb": {"s0": 1.1, "s1": 1.16, "kurva": "heavy"}}]))
    a("06", w("second", "06"), b["07"]["mulai"], belah([M, ins("still_glitch_alpha_t13.5.png", 120, 300, 720, 405, grade="bw", masuk="bawah", kb={"s0": 1.0, "s1": 1.06})], [M]))
    a("07a", b["07"]["mulai"], w("and", "07"), [M, ins("wb_glitch_closing_2013_img01_sad_glitch_girl_124041.jpeg", 560, 120, 800, 497, grade="bw", masuk="tumbuh", kb={"s0": 1.0, "s1": 1.05})])
    a("07b", w("and", "07"), b["08"]["mulai"], [{"k": "gambar", "src": E + "techcrunch_glitch_2012_shot.png", "grade": "blurkuat", "pos": "50% 15%", "kb": {"s0": 1.0, "s1": 1.08, "kurva": "heavy"}}])
    a("08a", b["08"]["mulai"], w("It", "08"), [{"k": "gambar", "src": E + "wb_glitch_closing_2013_find1.png", "grade": "blurkuat", "pos": "50% 30%", "kb": {"s0": 1.0, "s1": 1.08, "kurva": "heavy"}}])
    a("08b", w("It", "08"), b["09"]["mulai"], [P])
    a("09", b["09"]["mulai"], w("From", "10"), [M])
    a("10", w("From", "10"), w("From", "10", 2), belah([P], [M, ins("x_early_flickr_format.png", 1040, 260, 760, 531, masuk="kanan")]))
    a("11", w("From", "10", 2), b["12"]["mulai"], belah([M, ins("wb_slack_2013_shot.png", 120, 120, 720, 800, pos="50% 0%", masuk="bawah", kb={"s0": 1.0, "s1": 1.04})], [M]))
    a("12", b["12"]["mulai"], b["13"]["mulai"], [M])
    a("13", b["13"]["mulai"], b["14"]["mulai"], belah([P, ins("macworld_yahoo_flickr_2005_shot.png", 120, 120, 720, 800, pos="50% 4%", masuk="bawah")], [M]))
    a("14", b["14"]["mulai"], b["15"]["mulai"], belah([M], [M, ins("slack_blog_salesforce_2020_og_News_Social_Unfurl.jpg", 1040, 300, 760, 398, masuk="kanan")]))
    a("15", b["15"]["mulai"], w("So", "15"), [M])
    a("16", w("So", "15"), b["17"]["mulai"], [P])
    a("17", b["17"]["mulai"], b["17"]["selesai"] + DURASI_TAMBAH, [M])
    return A


def kt(w):
    b = w.beat; T = []
    def k(**kw): T.append(kw)
    # 01
    k(peran="r2", dari=w("two", "01"), sampai=w("failed", "01"), x=960, y=740, jangkar="tengah", teks="two games")
    k(peran="r6", dari=w("failed", "01"), sampai=w("but", "01"), x=960, y=720, jangkar="tengah", teks="failed completely", ukuran=150, warna="aksen")
    k(peran="r2", dari=w("Flickr", "01"), sampai=b["02"]["mulai"], x=480, y=700, jangkar="tengah", warna="tinta", teks="Flickr")
    k(peran="r2", dari=w("Slack", "01"), sampai=b["02"]["mulai"], x=1440, y=700, jangkar="tengah", teks="Slack")
    # 02
    k(peran="lead", dari=w("same", "02"), sampai=b["03"]["mulai"], x=170, y=250, bayang=True, kata=[K("one maker", w("same", "02"))])
    k(peran="r1", dari=w("Stewart", "02"), sampai=b["03"]["mulai"], x=170, y=360, bayang=True, kata=[K("Stewart", w("Stewart", "02")), K("Butterfield", w("Butterfield", "02"), baris=1)])
    k(peran="kotak", dari=w("same", "02", 2), sampai=b["03"]["mulai"], x=170, y=620, teks="one pattern")
    # 03 Game 1 (teks kiri)
    k(peran="lead", dari=w("first", "03"), sampai=b["04"]["mulai"], x=XL, y=170, warna="tinta", kata=[K("game 1", w("first", "03"))])
    k(peran="r1", dari=w("Game", "03"), sampai=b["04"]["mulai"], x=XL, y=270, warna="tinta", kata=[K("Game", w("Game", "03")), K("Neverending", w("Neverending", "03"), baris=1)])
    k(peran="r6", dari=w("2002", "03"), sampai=b["04"]["mulai"], x=XL - 5, y=480, warna="aksen", teks="2002")
    k(peran="lead", dari=w("browser", "03"), sampai=b["04"]["mulai"], x=XL, y=730, warna="tinta", kata=[K("a browser game", w("an", "03"))])
    # 04 Game 2 (teks kanan)
    k(peran="lead", dari=w("second", "04"), sampai=b["05"]["mulai"], x=XR, y=170, kata=[K("game 2", w("second", "04"))])
    k(peran="r1", dari=w("Glitch", "04"), sampai=b["05"]["mulai"], x=XR, y=270, kata=[K("Glitch", w("Glitch", "04"))])
    k(peran="r6", dari=w("2009", "04"), sampai=b["05"]["mulai"], x=XR - 5, y=400, warna="aksen", teks="2009")
    k(peran="lead", dari=w("also", "04"), sampai=b["05"]["mulai"], x=XR, y=650, kata=[K("also a", w("also", "04")), K("browser game", w("browser", "04"), baris=1)])
    # 05 akhir Game 1
    k(peran="lead", dari=w("first", "05"), sampai=w("second", "06"), x=XL, y=200, warna="tinta", kata=[K("game 1 ran into", w("first", "05"))])
    k(peran="r1", dari=w("dot", "05"), sampai=w("second", "06"), x=XL, y=310, warna="tinta", kata=[K("the dot-com", w("dot", "05")), K("crash", w("crash", "05"), baris=1)])
    k(peran="kotak", dari=w("money", "05"), sampai=w("second", "06"), x=XL, y=560, teks="money ran low")
    # 06 akhir Game 2
    k(peran="lead", dari=w("second", "06"), sampai=b["07"]["mulai"], x=XR, y=200, kata=[K("game 2 ran into", w("second", "06"))])
    k(peran="r1", dari=w("too", "06"), sampai=b["07"]["mulai"], x=XR, y=310, kata=[K("too few", w("too", "06")), K("players", w("players", "06"), baris=1)])
    k(peran="lead", dari=w("Tiny", "06"), sampai=b["07"]["mulai"], x=XR, y=600, kata=[K("Tiny Speck", w("Tiny", "06")), K("said so", w("said", "06"), baris=1)])
    # 07
    k(peran="r2", dari=w("November", "07"), sampai=w("Glitch", "07"), x=960, y=700, jangkar="tengah", teks="November 2012")
    k(peran="kotak", dari=w("Glitch", "07"), sampai=w("and", "07"), x=960, y=700, jangkar="tengah", teks="Glitch is closing")
    k(peran="lead", dari=w("TechCrunch", "07"), sampai=b["08"]["mulai"], x=960, y=230, jangkar="tengah", kata=[K("TechCrunch reported", w("TechCrunch", "07"))])
    k(peran="giant", dari=w("30", "07"), sampai=b["08"]["mulai"], x=960, y=340, jangkar="tengah", ukuran=380, angka={"dari": 0, "ke": 30, "durasi": 0.6})
    k(peran="lead", dari=w("people", "07"), sampai=b["08"]["mulai"], x=960, y=700, jangkar="tengah", kata=[K("people lost", w("people", "07")), K("their jobs", w("their", "07"))])
    # 08
    k(peran="lead", dari=w("goodbye", "08"), sampai=w("It", "08"), x=960, y=280, jangkar="tengah", kata=[K("the goodbye note was", w("goodbye", "08"))])
    k(peran="r6", dari=w("honest", "08"), sampai=w("It", "08"), x=960, y=380, jangkar="tengah", teks="honest")
    k(peran="lead", dari=w("we", "08"), sampai=b["09"]["mulai"], x=170, y=230, warna="tinta", kata=[K("“we only managed to create", w("we", "08"))])
    k(peran="r6", dari=w("crazy", "08"), sampai=b["09"]["mulai"], x=165, y=340, warna="tinta", teks="a crazy,", ukuran=170)
    k(peran="r6", dari=w("beautiful", "08"), sampai=b["09"]["mulai"], x=165, y=520, warna="aksen", teks="beautiful game”", ukuran=170)
    # 09
    k(peran="lead", dari=w("each", "09"), sampai=w("From", "10"), x=960, y=330, jangkar="tengah", kata=[K("but each game left", w("each", "09"))])
    k(peran="r6", dari=w("something", "09"), sampai=w("From", "10"), x=960, y=420, jangkar="tengah", teks="something behind", ukuran=170)
    # 10 Game 1 -> Flickr (teks kiri)
    k(peran="r1", dari=w("first", "10"), sampai=w("From", "10", 2), x=XL, y=200, warna="tinta", kata=[K("game 1's", w("first", "10")), K("technology", w("technology", "10"), baris=1)])
    k(peran="lead", dari=w("photo", "10"), sampai=w("From", "10", 2), x=XL, y=440, warna="tinta", kata=[K("a photo site:", w("photo", "10"))])
    k(peran="r6", dari=w("Flickr", "10"), sampai=w("From", "10", 2), x=XL - 5, y=530, warna="aksen", teks="Flickr")
    # 11 Game 2 -> Slack (teks kanan)
    k(peran="lead", dari=w("chat", "11"), sampai=b["12"]["mulai"], x=XR, y=170, kata=[K("game 2's", w("second", "11")), K("chat tool", w("chat", "11"), baris=1)])
    k(peran="r2", dari=w("IRC", "11"), sampai=b["12"]["mulai"], x=XR - 4, y=340, teks="on IRC")
    k(peran="lead", dari=w("work", "11"), sampai=b["12"]["mulai"], x=XR, y=500, kata=[K("a work app:", w("work", "11"))])
    k(peran="r6", dari=w("Slack", "11"), sampai=b["12"]["mulai"], x=XR - 5, y=590, warna="aksen", teks="Slack")
    # 12
    k(peran="lead", dari=w("even", "12"), sampai=b["13"]["mulai"], x=960, y=330, jangkar="tengah", kata=[K("and even the endings", w("even", "12"))])
    k(peran="r6", dari=w("rhyme", "12"), sampai=b["13"]["mulai"], x=960, y=420, jangkar="tengah", teks="rhyme")
    # 13 akhir Flickr (teks kanan, visual kiri)
    k(peran="r6", dari=w("2005", "13"), sampai=b["14"]["mulai"], x=XR - 5, y=170, teks="2005")
    k(peran="r1", dari=w("Yahoo", "13"), sampai=b["14"]["mulai"], x=XR, y=420, kata=[K("Yahoo bought", w("Yahoo", "13")), K("Flickr", w("Flickr", "13"), baris=1)])
    k(peran="kotak", dari=w("never", "13"), sampai=b["14"]["mulai"], x=XR - 20, y=680, teks="price: never told", ukuran=80)
    # 14 akhir Slack (teks kiri, visual kanan)
    k(peran="r6", dari=w("2021", "14"), sampai=b["15"]["mulai"], x=XL - 5, y=170, teks="2021")
    k(peran="r1", dari=w("Salesforce", "14"), sampai=b["15"]["mulai"], x=XL, y=420, kata=[K("Salesforce", w("Salesforce", "14")), K("bought Slack", w("bought", "14"), baris=1)])
    k(peran="r6", dari=w("$27", "14"), sampai=b["15"]["mulai"], x=XL - 5, y=640, warna="aksen", teks="$27.7B")
    # 15
    k(peran="lead", dari=w("Twice", "15"), sampai=w("and", "15"), x=960, y=330, jangkar="tengah", kata=[K("twice, the game failed", w("Twice", "15"))])
    k(peran="lead", dari=w("twice", "15", 2), sampai=w("So", "15"), x=960, y=250, jangkar="tengah", kata=[K("twice, a tool built for themselves", w("twice", "15", 2))])
    k(peran="r6", dari=w("saved", "15"), sampai=w("So", "15"), x=960, y=360, jangkar="tengah", warna="aksen", teks="saved them")
    # 16
    k(peran="lead", dari=w("best", "16"), sampai=b["17"]["mulai"], x=960, y=250, jangkar="tengah", warna="tinta", kata=[K("your best product might be", w("your", "16"))])
    k(peran="r6", dari=w("tool", "16"), sampai=b["17"]["mulai"], x=960, y=340, jangkar="tengah", warna="tinta", teks="the tool you build", ukuran=150)
    k(peran="lead", dari=w("while", "16"), sampai=b["17"]["mulai"], x=960, y=560, jangkar="tengah", warna="tinta", kata=[K("while chasing something else", w("while", "16"))])
    # 17
    k(peran="r2", dari=w("homemade", "17"), sampai=b["17"]["selesai"] + DURASI_TAMBAH, x=960, y=330, jangkar="tengah", teks="what homemade tool")
    k(peran="r2", dari=w("saved", "17"), sampai=b["17"]["selesai"] + DURASI_TAMBAH, x=960, y=470, jangkar="tengah", teks="saved your work?", aksen="saved")
    k(peran="lead", dari=w("Tell", "17"), sampai=b["17"]["selesai"] + DURASI_TAMBAH, x=960, y=680, jangkar="tengah", kata=[K("tell me in the comments", w("Tell", "17"))])
    return T


def EKSTRA_SFX(w):
    b = w.beat
    return [
        {"t": 0.0, "file": "sfx/glitch_cut.mp3", "gain": -16, "pilar": "aksen", "peran": "frame 0: gebrakan bunyi (Lantai D22c)"},
        {"t": w("money", "05"), "file": "sfx/sub_drop.wav", "gain": -12, "pilar": "aksen", "peran": "uang habis"},
        {"t": w("Glitch", "07"), "file": "sfx/sub_drop.wav", "gain": -11, "pilar": "aksen", "peran": "pengumuman tutup"},
        {"t": round(w("Slack", "11") - 1.2, 3), "file": "sfx/riser_cymbal.wav", "gain": -17, "pilar": "aksen", "peran": "menuju Slack lahir"},
        {"t": round(w("$27", "14") - 1.2, 3), "file": "sfx/riser_cymbal.wav", "gain": -17, "pilar": "aksen", "peran": "menuju angka akuisisi"},
    ]


MUSIK = [
    {"file": "musik/mixkit-futuristic-1167.mp3", "dari": 0.0, "sampai": 45.1, "gain": -3.5, "fadeIn": 0.05, "fadeOut": 0.5},
    {"file": "musik/mixkit-corporate-music-440.mp3", "dari": 44.9, "sampai": 90.29, "gain": -6.0, "fadeIn": 0.4, "fadeOut": 1.2},
]
