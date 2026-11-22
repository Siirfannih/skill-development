"""Ep02 William Tanuwijaya · Shift Malam · Story Cinematic. Perangkat khas: jam shift raksasa 21:00 -> 03:00 -> 09:00 -> 21:00."""
ID = "Ep02"
VO = "/mnt/storage-projects/behindwork-batch-1/ep02/vo/rakit"
VO_BEATS = f"{VO}/vo_beats.json"
VO_WORDS = f"{VO}/vo_words.json"
VO_SRC = "ep02/vo.wav"
SUB_MD = "/home/irfan/work/skill-development/projects/behindwork-batch-1/vo/ep02_vo_en.md"
DURASI_TAMBAH = 0.7
E = "ep02/"
# klip EW: William di panggung; zoom >= 1,45 ke arah William memotong watermark pojok kanan atas
EWKB = lambda s0=1.55, s1=1.62, x=110, y=40: {"s0": s0, "s1": s1, "x0": x, "x1": x + 15, "y0": y, "y1": y + 10, "kurva": "heavy"}


def K(w_, t, **kw):
    d = {"w": w_, "t": t}; d.update(kw); return d


def adegan(w):
    b = w.beat; A = []
    def a(id_, dari, sampai, lapisan, **kw):
        d = {"id": id_, "dari": round(dari, 3), "sampai": round(sampai, 3), "lapisan": lapisan}; d.update(kw); A.append(d)
    a("01a", 0, w("this", "01"), [{"k": "gambar", "src": E + "x_warnet_aqila.jpg", "grade": "gelap", "pos": "50% 55%", "kb": {"s0": 1.0, "s1": 1.08, "kurva": "heavy"}}])
    a("01b", w("this", "01"), b["02"]["mulai"], [{"k": "video", "src": E + "ew_0227-0303.mp4", "mulaiSumber": 2.0, "kb": EWKB()}])
    a("02a", b["02"]["mulai"], w("until", "02"), [{"k": "kartu", "warna": "malam"}])
    a("02b", w("until", "02"), b["03"]["mulai"], [{"k": "kartu", "warna": "malam"}])
    a("03a", b["03"]["mulai"], w("from", "03"), [{"k": "video", "src": E + "ew_0312-0355.mp4", "mulaiSumber": 24.0, "kb": EWKB()}])
    a("03b", w("from", "03"), w("who", "03"), [{"k": "gambar", "src": E + "x_siantar_welcome_sign.jpg", "kb": {"s0": 1.0, "s1": 1.06, "kurva": "heavy"}}])
    a("03c", w("who", "03"), w("four", "03"), [{"k": "gambar", "src": E + "x_kapal_pelni_tanjungperak.jpg", "pos": "50% 45%", "grade": "nat", "kb": {"s0": 1.0, "s1": 1.08, "y1": -30, "kurva": "heavy"}}])
    a("03d", w("four", "03"), b["04"]["mulai"], [{"k": "gambar", "src": E + "x_pelni_economy_class.jpg", "grade": "gelap", "kb": {"s0": 1.0, "s1": 1.07, "x1": 40}}])
    a("04", b["04"]["mulai"], b["05"]["mulai"], [{"k": "video", "src": E + "ew_0748-0828.mp4", "mulaiSumber": 4.0, "grade": "bw", "kb": EWKB(1.55, 1.66)}])
    a("05a", b["05"]["mulai"], w("and", "05"), [{"k": "gambar", "src": E + "x_warnet_aqila.jpg", "grade": "gelap", "pos": "50% 70%", "kb": {"s0": 1.05, "s1": 1.14, "x1": -40, "kurva": "heavy"}}])
    a("05b", w("and", "05"), b["06"]["mulai"], [{"k": "video", "src": E + "ideafest_0040-0112.mp4", "mulaiSumber": 12.0, "kb": {"s0": 1.45, "s1": 1.55, "x0": 0, "x1": -20, "y0": 40, "y1": 50, "kurva": "heavy"}}])
    a("06a", b["06"]["mulai"], w("and", "06"), [{"k": "kartu", "warna": "malam"}])
    a("06b", w("and", "06"), b["07"]["mulai"], [{"k": "video", "src": E + "ideafest_0040-0112.mp4", "mulaiSumber": 27.0, "kb": {"s0": 1.12, "s1": 1.22, "kurva": "heavy"}}])
    a("07", b["07"]["mulai"], b["08"]["mulai"], [{"k": "kartu", "warna": "malam"}])
    a("08", b["08"]["mulai"], b["09"]["mulai"], [{"k": "video", "src": E + "ew_0543-0558.mp4", "mulaiSumber": 1.0, "grade": "bw", "kb": EWKB(1.55, 1.64)}])
    a("09", b["09"]["mulai"], b["10"]["mulai"], [{"k": "video", "src": E + "ew_0855-0930.mp4", "mulaiSumber": 4.0, "grade": "bw", "kb": EWKB(1.7, 1.95, 110, 120)}])
    a("10", b["10"]["mulai"], b["11"]["mulai"], [{"k": "video", "src": E + "ew_0748-0828.mp4", "mulaiSumber": 30.0, "kb": EWKB(1.55, 1.63)}])
    a("11a", b["11"]["mulai"], w("the", "11"), [{"k": "kartu", "warna": "malam"}])
    a("11b", w("the", "11"), b["12"]["mulai"], [{"k": "kartu", "warna": "kertas"},
      {"k": "inset", "src": E + "wb_tokopedia_20090826_shot.png", "x": 1060, "y": 120, "w": 640, "h": 840, "pos": "50% 0%", "masuk": "kanan", "kb": {"s0": 1.0, "s1": 1.06, "kurva": "heavy"}}])
    a("12a", b["12"]["mulai"], w("Not", "12"), [{"k": "gambar", "src": E + "gojek_blog_goto_2021_og_GoTo_announcement_banner_EN.jpg", "grade": "blurkuat", "kb": {"s0": 1.0, "s1": 1.08, "kurva": "heavy"}}])
    a("12b", w("Not", "12"), b["13"]["mulai"], [{"k": "kartu", "warna": "kertas"},
      {"k": "inset", "src": E + "william_tanuwijaya_2018.jpg", "x": 220, "y": 110, "w": 640, "h": 860, "pos": "50% 30%", "masuk": "bawah", "kb": {"s0": 1.0, "s1": 1.04}}])
    a("13a", b["13"]["mulai"], w("and", "13"), [{"k": "kartu", "warna": "kertas"}])
    a("13b", w("and", "13"), b["14"]["mulai"], [{"k": "gambar", "src": E + "x_warnet_aqila.jpg", "grade": "gelap", "pos": "50% 40%", "kb": {"s0": 1.0, "s1": 1.1, "kurva": "heavy"}}])
    a("14", b["14"]["mulai"], b["14"]["selesai"] + DURASI_TAMBAH, [{"k": "kartu", "warna": "malam"},
      {"k": "irisan", "src": E + "x_warnet_aqila.jpg", "clip": "inset(0 0 0 84%)", "grade": "gelap", "geser": 0}])
    return A


def kt(w):
    b = w.beat; T = []
    def k(**kw): T.append(kw)
    k(peran="giant", dari=0.0, sampai=w("this", "01"), x=960, y=300, jangkar="tengah", angka={"dari": 18, "ke": 21, "durasi": 0.9, "format": "jam"})
    k(peran="r1", dari=w("this", "01"), sampai=b["02"]["mulai"], x=170, y=360, bayang=True, kata=[K("this young man", w("young", "01")), K("on duty", w("on", "01"), baris=1)])
    k(peran="r2", dari=w("Tokopedia", "01"), sampai=b["02"]["mulai"], x=164, y=580, teks="Tokopedia", bayang=True)
    k(peran="lead", dari=w("shift", "02"), sampai=w("until", "02"), x=960, y=360, jangkar="tengah", kata=[K("his shift lasted", w("shift", "02"))])
    k(peran="r6", dari=w("12", "02"), sampai=w("until", "02"), x=960, y=450, jangkar="tengah", teks="12 hours")
    k(peran="giant", dari=w("until", "02"), sampai=b["03"]["mulai"], x=960, y=250, jangkar="tengah", angka={"dari": 21, "ke": 33, "durasi": round(w("morning", "02") - w("until", "02"), 2), "format": "jam"})
    k(peran="lead", dari=w("every", "02"), sampai=b["03"]["mulai"], x=960, y=760, jangkar="tengah", kata=[K("every day", w("every", "02"))])
    k(peran="r1", dari=w("William", "03"), sampai=w("from", "03"), x=1150, y=380, bayang=True, kata=[K("William", w("William", "03")), K("Tanuwijaya", w("Tanuwijaya", "03"), baris=1)])
    k(peran="r6", dari=w("1999", "03"), sampai=w("four", "03"), x=960, y=230, jangkar="tengah", teks="1999", ukuran=280, bayang=True)
    k(peran="r1", dari=w("ship", "03"), sampai=w("four", "03"), x=960, y=560, jangkar="tengah", bayang=True, kata=[K("a ship to Jakarta", w("ship", "03"))])
    k(peran="r2", dari=w("four", "03"), sampai=b["04"]["mulai"], x=960, y=360, jangkar="tengah", teks="four days", bayang=True)
    k(peran="r2", dari=w("three", "03"), sampai=b["04"]["mulai"], x=960, y=500, jangkar="tengah", teks="three nights", bayang=True)
    k(peran="kotak", dari=w("second", "04"), sampai=w("his", "04", 2), x=1180, y=360, teks="second year")
    k(peran="r1", dari=w("father", "04"), sampai=w("support", "04"), x=1180, y=360, bayang=True, kata=[K("his father", w("father", "04")), K("fell ill", w("fell", "04"), baris=1)])
    k(peran="lead", dari=w("support", "04"), sampai=b["05"]["mulai"], x=1180, y=360, bayang=True, kata=[K("support", w("support", "04"))])
    k(peran="r2", dari=w("family", "04"), sampai=b["05"]["mulai"], x=1174, y=460, teks="the family", bayang=True)
    k(peran="r2", dari=w("night", "05"), sampai=w("free", "05"), x=960, y=420, jangkar="tengah", teks="night shift", bayang=True)
    k(peran="kotak", dari=w("free", "05"), sampai=w("and", "05"), x=960, y=420, jangkar="tengah", teks="free internet")
    k(peran="lead", dari=w("fell", "05"), sampai=b["06"]["mulai"], x=1160, y=300, bayang=True, kata=[K("fell in", w("fell", "05"))])
    k(peran="r6", dari=w("love", "05"), sampai=b["06"]["mulai"], x=1150, y=380, teks="LOVE", bayang=True)
    k(peran="lead", dari=w("graduated", "06"), sampai=w("and", "06"), x=960, y=330, jangkar="tengah", kata=[K("graduated", w("graduated", "06"))])
    k(peran="r6", dari=w("2003", "06"), sampai=w("and", "06"), x=960, y=420, jangkar="tengah", teks="2003", ukuran=280)
    k(peran="r6", dari=w("2007", "06"), sampai=w("an", "06", 2), x=960, y=300, jangkar="tengah", teks="2007", ukuran=280, bayang=True)
    k(peran="r1", dari=w("an", "06", 2), sampai=b["07"]["mulai"], x=960, y=360, jangkar="tengah", bayang=True, kata=[K("an online marketplace", w("online", "06")), K("people could trust", w("people", "06"), baris=1)])
    k(peran="giant", dari=b["07"]["mulai"], sampai=b["08"]["mulai"], x=960, y=240, jangkar="tengah", angka={"dari": 23, "ke": 27, "durasi": round(w("darkest", "07") - b["07"]["mulai"], 2), "format": "jam"})
    k(peran="lead", dari=w("darkest", "07"), sampai=b["08"]["mulai"], x=960, y=760, jangkar="tengah", kata=[K("the darkest hour", w("darkest", "07"))])
    k(peran="r1", dari=w("investors", "08"), sampai=b["09"]["mulai"], x=170, y=330, bayang=True, kata=[K("no investors", w("investors", "08"))])
    k(peran="r6", dari=w("two", "08"), sampai=b["09"]["mulai"], x=160, y=440, teks="2 years", ukuran=190, bayang=True)
    k(peran="r1", dari=w("role", "09"), sampai=w("you're", "09"), x=1150, y=330, bayang=True, kata=[K("your role models", w("role", "09"))])
    k(peran="r2", dari=w("born", "09"), sampai=w("you're", "09"), x=1144, y=440, teks="born special", bayang=True)
    k(peran="r6", dari=w("you're", "09"), sampai=w("slap", "10"), x=1140, y=360, teks="you're not", ukuran=170, bayang=True)
    k(peran="kotak", dari=w("slap", "10"), sampai=w("courage", "10"), x=1180, y=360, teks="a slap")
    k(peran="r2", dari=w("courage", "10"), sampai=b["11"]["mulai"], x=1174, y=360, teks="courage", bayang=True)
    k(peran="lead", dari=w("so", "10"), sampai=b["11"]["mulai"], x=1180, y=500, bayang=True, kata=[K("so he kept going", w("so", "10"))])
    k(peran="giant", dari=b["11"]["mulai"], sampai=w("the", "11"), x=960, y=200, jangkar="tengah", angka={"dari": 27, "ke": 33, "durasi": 0.9, "format": "jam"})
    k(peran="r2", dari=w("August", "11"), sampai=w("the", "11"), x=960, y=680, jangkar="tengah", teks="August 17, 2009")
    k(peran="r6", dari=w("launched", "11"), sampai=b["12"]["mulai"], x=165, y=330, warna="tinta", teks="launched", ukuran=190)
    k(peran="r1", dari=w("Leontinus", "11"), sampai=b["12"]["mulai"], x=170, y=560, warna="tinta", kata=[K("with Leontinus", w("with", "11")), K("Alpha Edison", w("Alpha", "11"), baris=1)])
    k(peran="r6", dari=w("2021", "12"), sampai=w("Not", "12"), x=165, y=180, teks="2021", ukuran=260, bayang=True)
    k(peran="lead", dari=w("Not", "12"), sampai=b["13"]["mulai"], x=1000, y=330, warna="tinta", kata=[K("not bad, for an", w("Not", "12"))])
    k(peran="r2", dari=w("internet", "12"), sampai=b["13"]["mulai"], x=1000, y=430, warna="tinta", teks="internet café")
    k(peran="r2", dari=w("graduate", "12"), sampai=b["13"]["mulai"], x=1000, y=560, warna="tinta", teks="graduate", aksen="graduate")
    k(peran="lead", dari=w("investors", "13"), sampai=w("and", "13"), x=960, y=360, jangkar="tengah", warna="tinta", kata=[K("investors judge your", w("investors", "13"))])
    k(peran="r6", dari=w("track", "13"), sampai=w("and", "13"), x=960, y=450, jangkar="tengah", warna="tinta", teks="track record", ukuran=180)
    k(peran="r2", dari=w("build", "13"), sampai=b["14"]["mulai"], x=960, y=380, jangkar="tengah", teks="build it", bayang=True)
    k(peran="r1", dari=w("one", "13"), sampai=b["14"]["mulai"], x=960, y=540, jangkar="tengah", bayang=True, kata=[K("one shift at a time", w("one", "13"))])
    k(peran="giant", dari=b["14"]["mulai"], sampai=b["14"]["selesai"] + DURASI_TAMBAH, x=960, y=170, jangkar="tengah", angka={"dari": 9, "ke": 21, "durasi": 0.8, "format": "jam"}, ukuran=380)
    k(peran="r2", dari=w("night", "14"), sampai=b["14"]["selesai"] + DURASI_TAMBAH, x=960, y=560, jangkar="tengah", teks="your night shift?")
    k(peran="lead", dari=w("Tell", "14"), sampai=b["14"]["selesai"] + DURASI_TAMBAH, x=960, y=720, jangkar="tengah", kata=[K("tell me in the comments", w("Tell", "14"))])
    return T


def EKSTRA_SFX(w):
    b = w.beat
    return [
        {"t": 0.0, "file": "sfx/glitch_cut.mp3", "gain": -16, "pilar": "aksen", "peran": "frame 0: gebrakan bunyi (Lantai D22c)"},
        {"t": round(b["07"]["mulai"] - 1.2, 3), "file": "sfx/riser_cymbal.wav", "gain": -16, "pilar": "aksen", "peran": "menuju jam paling gelap"},
        {"t": w("you're", "09"), "file": "sfx/sub_drop.wav", "gain": -11, "pilar": "aksen", "peran": "kalimat penolakan mendarat"},
        {"t": w("launched", "11"), "file": "sfx/impact_thud.wav", "gain": -12, "pilar": "aksen", "peran": "Tokopedia lahir"},
        {"t": w("the", "11") + 0.02, "file": "sfx/paper_drop.wav", "gain": -14, "pilar": "foley", "peran": "arsip halaman 2009 mendarat"},
    ]


MUSIK = [
    {"file": "musik/musik-freesound-264081.mp3", "dari": 0.0, "sampai": 43.4, "gain": -7.3, "fadeIn": 0.05, "fadeOut": 0.4},
    {"file": "musik/mixkit-corporate-music-440.mp3", "dari": 43.3, "sampai": 60.75, "gain": -5.2, "fadeIn": 0.4, "fadeOut": 0.3},
    {"file": "musik/mixkit-corporate-music-34.mp3", "dari": 60.69, "sampai": 88.68, "gain": -10.8, "fadeIn": 0.3, "fadeOut": 1.2},
]
