"""Ep02 William Tanuwijaya · r2 (D-24..D-30): foto warnet malam = panggung berulang; jam/tahun seolah terpantul dari
cahaya layar monitor; kamera mengikuti wajah William di klip panggung; "You're not." = kilat invert + hitam hening
±2 dtk tanpa musik (jeda disisipkan di VO); grid-tile reveal dari Tokopedia 2009 ke GoTo."""
from r2 import J, JT, T, KANVAS, SCRIM, NAPAS

ID = "Ep02"
VO = "/mnt/storage-projects/behindwork-batch-1/ep02/vo/rakit"
VO_BEATS = f"{VO}/vo_beats.json"
VO_WORDS = f"{VO}/vo_words.json"
VO_SRC = "ep02/vo.wav"
SUB_MD = "/home/irfan/work/skill-development/projects/behindwork-batch-1/vo/ep02_vo_en.md"
DURASI_TAMBAH = 0.7
E = "ep02/"
JEDA = [(56.30, 1.8)]           # ruang hening setelah "you're not." (sebelum "He called it a slap")
SUNYI = [(55.70, 58.10)]       # tanpa musik selama tamparan + hening
WARNET = E + "x_warnet_aqila.jpg"


def K(w_, t, **kw):
    d = {"w": w_, "t": t}; d.update(kw); return d


def adegan(w):
    b = w.beat; A = []
    def a(id_, dari, sampai, lapisan, **kw):
        d = {"id": id_, "dari": round(dari, 3), "sampai": round(sampai, 3), "lapisan": lapisan}; d.update(kw); A.append(d)
    t_this = w("this", "01")
    a("01a", 0, t_this, [J(WARNET, [T(0, .5, .32, 1.0), T(w("at", "01", 2), .46, .55, 1.3), T(w("café", "01"), .70, .68, 2.0, ax=.62, ay=.62)], grade="redam")])
    a("01b", t_this, b["02"]["mulai"], [JT(E + "ew_0227-0303.mp4", 2.0, t_this, b["02"]["mulai"], ax=.74), SCRIM("kiri", 0.45)], masuk="whip")
    t_until = w("until", "02")
    a("02a", b["02"]["mulai"], t_until, [KANVAS("gelap")], masuk="putih")
    a("02b", t_until, b["03"]["mulai"], [J(WARNET, [T(t_until, .72, .70, 2.4, ax=.5, ay=.62), T(w("every", "02"), .55, .5, 1.25)], grade="redam")], masuk="whip")
    t_from, t_in = w("from", "03"), w("in", "03")
    a("03a", b["03"]["mulai"], t_from, [JT(E + "ew_0312-0355.mp4", 24.0, b["03"]["mulai"], t_from, ax=.32), SCRIM("kanan", 0.45)])
    a("03b", t_from, t_in, [J(E + "x_siantar_welcome_sign.jpg", [T(t_from, .30, .5, 1.05), T(w("Pematangsiantar", "03"), .62, .5, 1.25)])], masuk="grid")
    t_took = w("took", "03")
    a("03c", t_in, t_took, [KANVAS("gelap")])
    a("03d", t_took, w("four", "03"), [J(E + "x_kapal_pelni_tanjungperak.jpg", [T(t_took, .62, .78, 1.0), T(w("ship", "03"), .62, .55, 1.3)]), SCRIM("atas", 0.5)], masuk="whip")
    a("03e", w("four", "03"), b["04"]["mulai"], [KANVAS("gelap")])
    a("04", b["04"]["mulai"], b["05"]["mulai"], [JT(E + "ew_0748-0828.mp4", 4.0, b["04"]["mulai"], b["05"]["mulai"], ax=.30, grade="bw"), SCRIM("kanan", 0.4)], masuk="whip")
    t_free, t_and5 = w("free", "05"), w("and", "05")
    a("05a", b["05"]["mulai"], t_free, [J(WARNET, [T(b["05"]["mulai"], .45, .6, 1.2), T(w("night", "05"), .72, .70, 2.2, ax=.55, ay=.6)], grade="redam")])
    a("05b", t_free, t_and5, [KANVAS("terang")], masuk="putih")
    a("05c", t_and5, b["06"]["mulai"], [JT(E + "ideafest_0040-0112.mp4", 12.0, t_and5, b["06"]["mulai"], ax=.72, ay=.40, s=1.25), SCRIM("kiri", 0.5)], masuk="whip")
    t_and6, t_an = w("and", "06"), w("an", "06", 2)
    a("06a", b["06"]["mulai"], t_and6, [KANVAS("terang")])
    a("06b", t_and6, t_an, [J(WARNET, [T(t_and6, .72, .70, 2.8, ax=.5, ay=.55), T(w("idea", "06"), .72, .70, 3.1, ax=.5, ay=.55)], grade="redam")], masuk="whip")
    a("06c", t_an, b["07"]["mulai"], [J(E + "ideafest_0040-0112.mp4", [T(t_an, .5, .55, 1.15)], mulaiSumber=27.0), SCRIM("kiri", 0.55)], masuk="grid")
    a("07", b["07"]["mulai"], b["08"]["mulai"], [KANVAS("gelap")])
    t_for8 = w("for", "08")
    a("08a", b["08"]["mulai"], t_for8, [JT(E + "ew_0543-0558.mp4", 1.0, b["08"]["mulai"], t_for8, ax=.70, grade="bw"), SCRIM("kiri", 0.45)], masuk="whip")
    a("08b", t_for8, b["09"]["mulai"], [KANVAS("gelap")])
    t_your, t_yn = w("your", "09"), w("you're", "09")
    a("09a", b["09"]["mulai"], t_your, [JT(E + "ew_0855-0930.mp4", 10.0, b["09"]["mulai"], t_your, ax=.68, grade="bw"), SCRIM("kiri", 0.45)])
    a("09b", t_your, t_yn, [JT(E + "ew_0855-0930.mp4", 10.0 + (t_your - b["09"]["mulai"]), t_your, t_yn, ax=.75, s=2.3, grade="bw"), SCRIM("kiri", 0.5)])
    a("09c", t_yn, b["10"]["mulai"], [KANVAS("gelap")], invert=[t_yn, round(t_yn + 0.1, 3)])
    a("10", b["10"]["mulai"], b["11"]["mulai"], [JT(E + "ew_0748-0828.mp4", 30.0, b["10"]["mulai"], b["11"]["mulai"], ax=.68), SCRIM("kiri", 0.45)], masuk="whip")
    t_the = w("the", "11")
    a("11a", b["11"]["mulai"], t_the, [KANVAS("terang")])
    a("11b", t_the, b["12"]["mulai"], [J(E + "wb_tokopedia_20090826_shot.png", [T(t_the, .5, .06, 1.25, ay=.32), T(w("launched", "11"), .32, .05, 1.9, ax=.62, ay=.32), T(w("with", "11"), .5, .2, 1.4)]), SCRIM("kiri", 0.88)], masuk="whip")
    t_it, t_not = w("it", "12"), w("not", "12")
    a("12a", b["12"]["mulai"], t_it, [KANVAS("gelap")])
    a("12b", t_it, t_not, [J(E + "goto_press_2023_og_4a83726f_683d_4954_9615_4b0554.jpg", [T(t_it, .48, .62, 1.0), T(w("GoTo", "12"), .48, .6, 1.25)]), SCRIM("atas", 0.55)], masuk="grid")
    a("12c", t_not, b["13"]["mulai"], [J(E + "william_tanuwijaya_2018.jpg", [T(t_not, .56, .40, 1.25, ax=.80, ay=.42), T(w("graduate", "12"), .56, .40, 1.35, ax=.80, ay=.42)]), SCRIM("kiri", 0.5)], masuk="whip")
    t_track, t_and13 = w("track", "13"), w("and", "13")
    a("13a", b["13"]["mulai"], t_and13, [KANVAS("terang")])
    a("13c", t_and13, b["14"]["mulai"], [J(WARNET, [T(t_and13, .5, .45, 1.0), T(w("one", "13"), .45, .58, 1.2)], grade="redam"), SCRIM("rata", 0.4)], masuk="whip")
    a("14", b["14"]["mulai"], b["14"]["selesai"] + DURASI_TAMBAH, [KANVAS("gelap")])
    return A


def kt(w):
    b = w.beat; T_ = []; END = b["14"]["selesai"] + DURASI_TAMBAH
    def k(**kw): T_.append(kw)
    t_this = w("this", "01")
    k(peran="giant", dari=0.0, sampai=t_this, x=960, y=170, jangkar="tengah", layar=True, ukuran=420, angka={"dari": 18, "ke": 21, "durasi": 0.9, "format": "jam"})
    k(peran="r1", dari=t_this, sampai=b["02"]["mulai"], x=140, y=360, bayang=True, kata=[K("this young man", w("young", "01")), K("on duty", w("on", "01"), baris=1)])
    k(peran="r2", dari=w("Tokopedia", "01"), sampai=b["02"]["mulai"], x=134, y=580, teks="Tokopedia", bayang=True)
    t_until = w("until", "02")
    k(peran="lead", dari=w("shift", "02"), sampai=t_until, x=960, y=280, jangkar="tengah", kata=[K("his shift lasted", w("shift", "02"))])
    T_.append(NAPAS("12 HOURS.", w("12", "02"), t_until, ukuran=230))
    k(peran="giant", dari=t_until, sampai=b["03"]["mulai"], x=960, y=180, jangkar="tengah", layar=True, ukuran=420, angka={"dari": 21, "ke": 33, "durasi": round(w("morning", "02") - t_until, 2), "format": "jam"})
    k(peran="lead", dari=w("every", "02"), sampai=b["03"]["mulai"], x=960, y=760, jangkar="tengah", bayang=True, kata=[K("every day", w("every", "02"))])
    t_from, t_took = w("from", "03"), w("took", "03")
    k(peran="r1", dari=w("William", "03"), sampai=t_from, x=1755, y=380, jangkar="kanan", bayang=True, kata=[K("William", w("William", "03")), K("Tanuwijaya", w("Tanuwijaya", "03"), baris=1)])
    T_.append(NAPAS("1999.", w("1999", "03"), t_took, ukuran=330))
    k(peran="lead", dari=t_took, sampai=w("four", "03"), x=170, y=170, bayang=True, kata=[K("a ship to Jakarta", w("ship", "03"))])
    T_.append(NAPAS("4 DAYS.", w("four", "03"), w("three", "03"), ukuran=230))
    T_.append(NAPAS("3 NIGHTS.", w("three", "03"), b["04"]["mulai"], ukuran=230))
    k(peran="kotak", dari=w("second", "04"), sampai=w("his", "04", 2), x=1150, y=360, teks="second year")
    k(peran="r1", dari=w("father", "04"), sampai=w("support", "04"), x=1755, y=360, jangkar="kanan", bayang=True, kata=[K("his father", w("father", "04")), K("fell ill", w("fell", "04"), baris=1)])
    k(peran="lead", dari=w("support", "04"), sampai=b["05"]["mulai"], x=1755, y=360, jangkar="kanan", bayang=True, kata=[K("support", w("support", "04"))])
    k(peran="r2", dari=w("family", "04"), sampai=b["05"]["mulai"], x=1755, y=460, jangkar="kanan", teks="the family", bayang=True)
    t_free, t_and5 = w("free", "05"), w("and", "05")
    k(peran="r2", dari=w("night", "05"), sampai=t_free, x=960, y=200, jangkar="tengah", layar=True, teks="night shift")
    T_.append(NAPAS("FREE\nINTERNET.", t_free, t_and5, warna="tinta", ukuran=210))
    k(peran="lead", dari=w("fell", "05"), sampai=b["06"]["mulai"], x=170, y=300, bayang=True, kata=[K("fell in", w("fell", "05"))])
    k(peran="r6", dari=w("love", "05"), sampai=b["06"]["mulai"], x=165, y=380, teks="LOVE", bayang=True)
    t_and6, t_an = w("and", "06"), w("an", "06", 2)
    k(peran="lead", dari=w("graduated", "06"), sampai=t_and6, x=960, y=250, jangkar="tengah", warna="tinta", kata=[K("graduated", w("graduated", "06"))])
    T_.append(NAPAS("2003.", w("2003", "06"), t_and6, warna="tinta", ukuran=330))
    k(peran="r6", dari=w("2007", "06"), sampai=t_an, x=960, y=330, jangkar="tengah", layar=True, teks="2007", ukuran=300)
    k(peran="lead", dari=w("idea", "06"), sampai=t_an, x=960, y=720, jangkar="tengah", bayang=True, kata=[K("the idea came", w("the", "06"))])
    k(peran="r1", dari=t_an, sampai=b["07"]["mulai"], x=170, y=360, bayang=True, kata=[K("an online", w("online", "06")), K("marketplace", w("marketplace", "06"), baris=1), K("people could trust", w("people", "06"), baris=2)])
    k(peran="giant", dari=b["07"]["mulai"], sampai=b["08"]["mulai"], x=960, y=170, jangkar="tengah", ukuran=420, angka={"dari": 23, "ke": 27, "durasi": round(w("darkest", "07") - b["07"]["mulai"], 2), "format": "jam"})
    T_.append(NAPAS("the darkest hour.", w("darkest", "07"), b["08"]["mulai"], ukuran=120, y=700))
    t_for8 = w("for", "08")
    k(peran="r1", dari=w("didn't", "08"), sampai=t_for8, x=170, y=330, bayang=True, kata=[K("didn't know", w("didn't", "08")), K("any investors", w("any", "08"), baris=1)])
    T_.append(NAPAS("2 YEARS.", w("two", "08"), b["09"]["mulai"], ukuran=250, y=300))
    k(peran="kotak", dari=w("every", "08"), sampai=b["09"]["mulai"], x=960, y=640, jangkar="tengah", teks="every pitch failed")
    t_your, t_yn = w("your", "09"), w("you're", "09")
    k(peran="lead", dari=w("one", "09"), sampai=t_your, x=170, y=360, bayang=True, kata=[K("one of them said:", w("one", "09"))])
    k(peran="r1", dari=t_your, sampai=t_yn, x=170, y=330, bayang=True, kata=[K("your role models", w("role", "09")), K("were born special", w("born", "09"), baris=1)])
    d = NAPAS("You're not.", t_yn, b["10"]["mulai"], ukuran=110); d["tipis"] = True; T_.append(d)
    k(peran="kotak", dari=w("slap", "10"), sampai=w("courage", "10"), x=170, y=330, teks="a slap")
    k(peran="r2", dari=w("courage", "10"), sampai=b["11"]["mulai"], x=165, y=330, teks="courage", bayang=True)
    k(peran="lead", dari=w("so", "10"), sampai=b["11"]["mulai"], x=170, y=480, bayang=True, kata=[K("so he kept going", w("so", "10"))])
    t_the = w("the", "11")
    T_.append(NAPAS("August 17,\n2009.", w("August", "11"), t_the, warna="tinta", ukuran=190))
    k(peran="kotak", dari=w("launched", "11"), sampai=w("with", "11"), x=170, y=330, teks="Tokopedia launched")
    k(peran="r1", dari=w("with", "11"), sampai=b["12"]["mulai"], x=170, y=330, bayang=True, kata=[K("with Leontinus", w("with", "11")), K("Alpha Edison", w("Alpha", "11"), baris=1)])
    t_it, t_not = w("it", "12"), w("not", "12")
    T_.append(NAPAS("2021.", w("2021", "12"), t_it, ukuran=330))
    k(peran="lead", dari=w("merged", "12"), sampai=t_not, x=960, y=170, jangkar="tengah", bayang=True, kata=[K("merged with Gojek into GoTo", w("merged", "12"))])
    k(peran="lead", dari=t_not, sampai=b["13"]["mulai"], x=170, y=300, bayang=True, kata=[K("not bad, for an", t_not)])
    k(peran="r2", dari=w("internet", "12"), sampai=b["13"]["mulai"], x=165, y=400, teks="internet café", bayang=True)
    k(peran="r2", dari=w("graduate", "12"), sampai=b["13"]["mulai"], x=165, y=530, teks="graduate", bayang=True)
    t_track, t_and13 = w("track", "13"), w("and", "13")
    k(peran="lead", dari=w("investors", "13"), sampai=t_track - 0.1, x=960, y=470, jangkar="tengah", warna="tinta", kata=[K("investors judge your", w("investors", "13"))])
    T_.append(NAPAS("TRACK\nRECORD.", t_track, t_and13, warna="tinta", ukuran=220, aksen="RECORD."))
    k(peran="r2", dari=w("build", "13"), sampai=b["14"]["mulai"], x=960, y=380, jangkar="tengah", teks="build it", bayang=True)
    k(peran="r1", dari=w("one", "13"), sampai=b["14"]["mulai"], x=960, y=540, jangkar="tengah", bayang=True, kata=[K("one shift at a time", w("one", "13"))])
    k(peran="giant", dari=b["14"]["mulai"], sampai=END, x=960, y=170, jangkar="tengah", angka={"dari": 9, "ke": 21, "durasi": 0.8, "format": "jam"}, ukuran=380)
    T_.append(NAPAS("your night shift?", w("night", "14"), END, ukuran=140, y=560))
    k(peran="lead", dari=w("Tell", "14"), sampai=END, x=960, y=720, jangkar="tengah", kata=[K("tell me in the comments", w("Tell", "14"))])
    return T_


def EKSTRA_SFX(w):
    b = w.beat; t_yn = w("you're", "09")
    return [
        {"t": 0.0, "file": "sfx/glitch_cut.mp3", "gain": -16, "pilar": "aksen", "peran": "frame 0: gebrakan bunyi (Lantai D22c)"},
        {"t": round(b["07"]["mulai"] - 1.2, 3), "file": "sfx/riser_cymbal.wav", "gain": -16, "pilar": "aksen", "peran": "menuju jam paling gelap"},
        {"t": t_yn, "file": "sfx/glitch_cut.mp3", "gain": -13, "pilar": "aksen", "peran": "kilat invert tamparan (micro-impact)"},
        {"t": round(t_yn + 0.02, 3), "file": "sfx/sub_drop.wav", "gain": -12, "pilar": "aksen", "peran": "kalimat penolakan mendarat"},
        {"t": w("launched", "11"), "file": "sfx/impact_thud.wav", "gain": -12, "pilar": "aksen", "peran": "Tokopedia lahir"},
    ]


MUSIK = [
    {"file": "musik/musik-freesound-264081.mp3", "dari": 0.0, "sampai": 43.4, "gain": -7.3, "fadeIn": 0.05, "fadeOut": 0.4},
    {"file": "musik/mixkit-corporate-music-440.mp3", "dari": 43.3, "sampai": 62.55, "gain": -5.2, "fadeIn": 0.4, "fadeOut": 0.3},
    {"file": "musik/mixkit-corporate-music-34.mp3", "dari": 62.49, "sampai": 90.48, "gain": -10.8, "fadeIn": 0.3, "fadeOut": 1.2},
]
