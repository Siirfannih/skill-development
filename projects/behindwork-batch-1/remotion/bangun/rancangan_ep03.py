"""Ep03 YouTube · Bedah 19 Detik · Story Cinematic. Perangkat khas: penghitung detik raksasa 0:00 -> 0:19 di samping
video pertama itu sendiri (inset kiri), dipanggil di awal tiap beat "At second N"."""
ID = "Ep03"
VO = "/mnt/storage-projects/behindwork-batch-1/ep03/vo/rakit"
VO_BEATS = f"{VO}/vo_beats.json"
VO_WORDS = f"{VO}/vo_words.json"
VO_SRC = "ep03/vo.wav"
SUB_MD = "/home/irfan/work/skill-development/projects/behindwork-batch-1/vo/ep03_vo_en.md"
DURASI_TAMBAH = 0.7
E = "ep03/"
ZOO = dict(k="inset", src=E + "zoo.mp4", video=True, x=165, y=220, w=640, h=480)


def K(w_, t, **kw):
    d = {"w": w_, "t": t}; d.update(kw); return d


def zoo(mulai, laju=1.0, **kw):
    d = dict(ZOO); d.update({"mulaiSumber": mulai, "laju": laju}); d.update(kw); return d


def adegan(w):
    b = w.beat; A = []
    def a(id_, dari, sampai, lapisan, **kw):
        d = {"id": id_, "dari": round(dari, 3), "sampai": round(sampai, 3), "lapisan": lapisan}; d.update(kw); A.append(d)
    M = {"k": "kartu", "warna": "malam"}; P = {"k": "kartu", "warna": "kertas"}
    a("01a", 0, w("and", "01", 2), [M, zoo(0.0, masuk="tumbuh")])
    a("01b", w("and", "01", 2), b["02"]["mulai"], [P])
    a("02a", b["02"]["mulai"], w("at", "02", 2), [M])
    a("02b", w("at", "02", 2), b["03"]["mulai"], [M, zoo(0.5, 0.5)])
    a("03a", b["03"]["mulai"], w("that's", "03"), [M, zoo(2.0, 0.5)])
    a("03b", w("that's", "03"), b["04"]["mulai"], [P, {"k": "inset", "src": E + "youtube_founders_komposit.jpg", "x": 246, "y": 110, "w": 1428, "h": 521, "masuk": "bawah", "kb": {"s0": 1.0, "s1": 1.03}}])
    a("04a", b["04"]["mulai"], w("the", "04"), [M, zoo(4.0, 0.5)])
    a("04b", w("the", "04"), w("and", "04"), [M, {"k": "inset", "src": E + "still_acm_valentine_slide_t30.png", "x": 1015, "y": 200, "w": 740, "h": 555, "masuk": "kanan", "kb": {"s0": 1.0, "s1": 1.05}}])
    a("04c", w("and", "04"), b["05"]["mulai"], [{"k": "gambar", "src": E + "karim_commencement_p-3.png", "pos": "50% 61%", "kb": {"s0": 1.05, "s1": 1.22, "kurva": "heavy"}}])
    a("05a", b["05"]["mulai"], w("an", "05"), [M, zoo(7.0, 0.5)])
    a("05b", w("an", "05"), w("and", "05"), [M, zoo(4.0, 0.6, zoom=1.7, pos="80% 20%")])
    a("05c", w("and", "05"), w("and", "05", 2), [{"k": "gambar", "src": E + "karim_commencement_p-3.png", "pos": "50% 73%", "kb": {"s0": 1.05, "s1": 1.2, "kurva": "heavy"}}])
    a("05d", w("and", "05", 2), b["06"]["mulai"], [M])
    a("06a", b["06"]["mulai"], w("people", "06"), [M, zoo(12.0, 0.5)])
    a("06b", w("people", "06"), w("so", "06"), [M, zoo(12.0, 0.8, x=1115, y=300)])
    a("06c", w("so", "06"), w("second", "07"), [P])
    a("07a", w("second", "07"), w("the", "07"), [M, zoo(15.0, 0.5)])
    a("07b", w("the", "07"), w("and", "07"), [P, {"k": "inset", "src": E + "time_youtube_gurus_2006_shot.png", "x": 1080, "y": 110, "w": 640, "h": 820, "pos": "50% 18%", "masuk": "kanan", "kb": {"s0": 1.0, "s1": 1.05}}])
    a("07c", w("and", "07"), b["08"]["mulai"], [P, {"k": "inset", "src": E + "steve_chen_taiwan.jpg", "x": 165, "y": 110, "w": 600, "h": 800, "pos": "50% 30%", "masuk": "bawah", "kb": {"s0": 1.0, "s1": 1.04}}])
    a("08a", b["08"]["mulai"], w("Karim's", "08"), [M, zoo(17.0, 0.5)])
    a("08b", w("Karim's", "08"), b["09"]["mulai"], [{"k": "gambar", "src": E + "banda_aceh_2004_street.jpeg", "grade": "gelap", "kb": {"s0": 1.0, "s1": 1.07, "kurva": "drift"}}])
    a("09a", b["09"]["mulai"], w("and", "09"), [M, zoo(18.6, 0.5)])
    a("09b", w("and", "09"), b["10"]["mulai"], [{"k": "gambar", "src": E + "sec_google_youtube_2006_wb_shot.png", "grade": "blurkuat", "pos": "50% 6%", "kb": {"s0": 1.0, "s1": 1.12, "kurva": "heavy"}}])
    a("10", b["10"]["mulai"], b["11"]["mulai"], [M, {"k": "inset", "src": E + "chadsteve.mp4", "video": True, "mulaiSumber": 8.05, "x": 165, "y": 220, "w": 640, "h": 480}])
    a("11a", b["11"]["mulai"], w("but", "11"), [P])
    a("11b", w("but", "11"), b["12"]["mulai"], [M])
    a("12a", b["12"]["mulai"], w("if", "12"), [P])
    a("12b", w("if", "12"), b["13"]["mulai"], [M, zoo(14.0, 1.0)])
    a("13", b["13"]["mulai"], b["13"]["selesai"] + DURASI_TAMBAH, [M])
    return A


def kt(w):
    b = w.beat; T = []
    def k(**kw): T.append(kw)
    def hit(dari, sampai, a0, a1, t_dur=0.6):  # penghitung detik di kartu "At second N"
        k(peran="giant", dari=dari, sampai=sampai, x=900, y=330, ukuran=380, angka={"dari": a0, "ke": a1, "durasi": t_dur, "format": "detik"})
    # 01
    k(peran="r1", dari=w("YouTube's", "01"), sampai=w("and", "01", 2), x=900, y=230, kata=[K("YouTube's", w("YouTube's", "01")), K("first video", w("first", "01"), baris=1)])
    k(peran="giant", dari=w("19", "01"), sampai=w("and", "01", 2), x=900, y=530, ukuran=300, angka={"dari": 0, "ke": 19, "durasi": 0.9, "format": "detik"})
    k(peran="lead", dari=w("two", "01"), sampai=w("and", "01", 2), x=905, y=830, kata=[K("two elephants", w("two", "01"))])
    k(peran="lead", dari=w("second", "01", 2), sampai=b["02"]["mulai"], x=960, y=360, jangkar="tengah", warna="tinta", kata=[K("second by second,", w("second", "01", 2))])
    k(peran="r2", dari=w("how", "01"), sampai=b["02"]["mulai"], x=960, y=470, jangkar="tengah", warna="tinta", teks="how YouTube began", aksen="began")
    # 02: penghitung diputar mundur ke nol
    k(peran="giant", dari=w("second", "02"), sampai=w("at", "02", 2), x=960, y=180, jangkar="tengah", ukuran=420, angka={"dari": 19, "ke": 0, "durasi": 0.6, "format": "detik"})
    k(peran="r2", dari=w("April", "02"), sampai=w("at", "02", 2), x=960, y=620, jangkar="tengah", teks="April 23, 2005")
    k(peran="r1", dari=w("San", "02"), sampai=b["03"]["mulai"], x=900, y=330, kata=[K("San Diego", w("San", "02")), K("Zoo", w("Zoo", "02"), baris=1)])
    # 03
    hit(b["03"]["mulai"], w("that's", "03"), 0, 2)
    k(peran="lead", dari=w("Jawed", "03"), sampai=b["04"]["mulai"], x=1436, y=660, jangkar="tengah", warna="tinta", kata=[K("Jawed Karim", w("Jawed", "03"))])
    k(peran="kotak", dari=w("third", "03"), sampai=w("all", "03"), x=960, y=770, jangkar="tengah", teks="the third founder")
    k(peran="lead", dari=w("Chad", "03"), sampai=b["04"]["mulai"], x=484, y=660, jangkar="tengah", warna="tinta", kata=[K("Chad Hurley", w("Chad", "03"))])
    k(peran="lead", dari=w("Steve", "03"), sampai=b["04"]["mulai"], x=960, y=660, jangkar="tengah", warna="tinta", kata=[K("Steve Chen", w("Steve", "03"))])
    k(peran="r2", dari=w("all", "03"), sampai=b["04"]["mulai"], x=960, y=770, jangkar="tengah", warna="tinta", teks="all from PayPal", aksen="PayPal")
    # 04
    hit(b["04"]["mulai"], w("the", "04"), 2, 4)
    k(peran="lead", dari=w("surprise", "04"), sampai=w("and", "04"), x=170, y=250, kata=[K("the surprise:", w("surprise", "04"))])
    k(peran="kotak", dari=w("Valentine's", "04"), sampai=w("and", "04"), x=170, y=390, teks="Valentine's Day")
    k(peran="r6", dari=w("dating", "04"), sampai=w("and", "04"), x=170, y=560, teks="dating site", ukuran=134)
    k(peran="kotak", dari=w("slogan", "04"), sampai=b["05"]["mulai"], x=960, y=300, jangkar="tengah", teks="the slogan")
    k(peran="kotak", dari=w("Tune", "04"), sampai=b["05"]["mulai"], x=960, y=450, jangkar="tengah", teks="“Tune in, Hook up”", ukuran=124)
    # 05
    hit(b["05"]["mulai"], w("an", "05"), 4, 7)
    k(peran="lead", dari=w("elephant", "05"), sampai=w("and", "05"), x=900, y=300, kata=[K("an elephant is", w("an", "05"))])
    k(peran="r6", dari=w("not", "05"), sampai=w("and", "05"), x=900, y=410, teks="not a date", ukuran=150)
    k(peran="kotak", dari=w("empty", "05"), sampai=w("and", "05", 2), x=960, y=280, jangkar="tengah", teks="so empty")
    k(peran="kotak", dari=w("$20", "05"), sampai=w("and", "05", 2), x=960, y=430, jangkar="tengah", teks="$20 a video", ukuran=124)
    k(peran="kotak", dari=w("Craigslist", "05"), sampai=w("and", "05", 2), x=960, y=600, jangkar="tengah", teks="on Craigslist")
    k(peran="lead", dari=w("replies", "05"), sampai=b["06"]["mulai"], x=960, y=300, jangkar="tengah", kata=[K("and the replies", w("the", "05", 2))])
    k(peran="r6", dari=w("zero", "05"), sampai=b["06"]["mulai"], x=960, y=420, jangkar="tengah", teks="ZERO", ukuran=300, warna="aksen")
    # 06
    hit(b["06"]["mulai"], w("people", "06"), 7, 12)
    k(peran="lead", dari=w("uploading", "06"), sampai=w("so", "06"), x=170, y=170, kata=[K("people uploaded anything", w("uploading", "06"))])
    k(peran="r6", dari=w("dogs", "06"), sampai=w("so", "06"), x=170, y=300, teks="dogs,", ukuran=160)
    k(peran="r6", dari=w("holidays", "06"), sampai=w("so", "06"), x=170, y=470, teks="holidays,", ukuran=160)
    k(peran="r6", dari=w("elephants", "06"), sampai=w("so", "06"), x=170, y=640, teks="elephants", ukuran=160, warna="aksen")
    k(peran="lead", dari=w("opened", "06"), sampai=b["07"]["mulai"], x=960, y=230, jangkar="tengah", warna="tinta", kata=[K("the site opened to", w("opened", "06"))])
    k(peran="r6", dari=w("all", "06"), sampai=b["07"]["mulai"], x=960, y=330, jangkar="tengah", warna="aksen", teks="ALL", ukuran=300)
    k(peran="r2", dari=w("videos", "06"), sampai=b["07"]["mulai"], x=960, y=620, jangkar="tengah", warna="tinta", teks="videos")
    # 07
    hit(w("second", "07"), w("the", "07"), 12, 15)
    k(peran="lead", dari=w("famous", "07"), sampai=w("and", "07"), x=170, y=200, warna="tinta", kata=[K("the famous", w("famous", "07"))])
    k(peran="r2", dari=w("dinner", "07"), sampai=w("and", "07"), x=165, y=300, warna="tinta", teks="dinner party")
    k(peran="lead", dari=w("Karim", "07"), sampai=w("and", "07"), x=170, y=440, warna="tinta", kata=[K("Karim told Time:", w("Karim", "07"))])
    k(peran="kotak", dari=w("never", "07"), sampai=w("and", "07"), x=170, y=560, teks="never happened")
    k(peran="r1", dari=w("Chen", "07"), sampai=b["08"]["mulai"], x=860, y=280, warna="tinta", kata=[K("Chen admitted", w("Chen", "07"))])
    k(peran="lead", dari=w("marketing", "07"), sampai=b["08"]["mulai"], x=860, y=430, warna="tinta", kata=[K("marketing made it", w("marketing", "07"))])
    k(peran="r2", dari=w("stronger", "07"), sampai=b["08"]["mulai"], x=856, y=530, warna="aksen", teks="stronger")
    # 08
    hit(b["08"]["mulai"], w("Karim's", "08"), 15, 17)
    k(peran="lead", dari=w("Karim's", "08"), sampai=b["09"]["mulai"], x=170, y=230, bayang=True, kata=[K("Karim's own version:", w("Karim's", "08"))])
    k(peran="r1", dari=w("videos", "08"), sampai=b["09"]["mulai"], x=170, y=360, bayang=True, kata=[K("videos of the", w("videos", "08"))])
    k(peran="r6", dari=w("2004", "08"), sampai=b["09"]["mulai"], x=165, y=480, teks="2004 tsunami", ukuran=150, bayang=True)
    k(peran="r2", dari=w("Indonesia", "08"), sampai=b["09"]["mulai"], x=168, y=660, teks="in Indonesia", bayang=True)
    # 09
    hit(b["09"]["mulai"], w("and", "09"), 17, 19, 0.5)
    k(peran="r2", dari=w("October", "09"), sampai=w("Google", "09"), x=960, y=300, jangkar="tengah", teks="October 2006", bayang=True)
    k(peran="lead", dari=w("Google", "09"), sampai=b["10"]["mulai"], x=960, y=280, jangkar="tengah", bayang=True, kata=[K("Google bought it for", w("Google", "09"))])
    k(peran="r6", dari=round(w("billion", "09") - 1.08, 3), sampai=b["10"]["mulai"], x=960, y=400, jangkar="tengah", teks="$1.65 BILLION", ukuran=170, aksen="BILLION", bayang=True)
    k(peran="lead", dari=w("in", "09", 2), sampai=b["10"]["mulai"], x=960, y=620, jangkar="tengah", bayang=True, kata=[K("in stock", w("in", "09", 2))])
    # 10 suara asli
    k(peran="r1", dari=w("We've", "10"), sampai=b["11"]["mulai"], x=900, y=300, kata=[K("“We've been", w("We've", "10")), K("acquired", w("acquired", "10"), baris=1), K("by Google.”", w("by", "10"), baris=2)])
    # 11
    k(peran="lead", dari=w("planned", "11"), sampai=w("but", "11"), x=960, y=250, jangkar="tengah", warna="tinta", kata=[K("they planned for", w("planned", "11"))])
    k(peran="r6", dari=w("dates", "11"), sampai=w("but", "11"), x=960, y=350, jangkar="tengah", warna="tinta", teks="dates")
    k(peran="lead", dari=w("people", "11"), sampai=b["12"]["mulai"], x=960, y=250, jangkar="tengah", kata=[K("but people brought", w("people", "11"))])
    k(peran="r6", dari=w("everything", "11"), sampai=b["12"]["mulai"], x=960, y=350, jangkar="tengah", teks="everything else", ukuran=150)
    # 12
    k(peran="lead", dari=w("first", "12"), sampai=w("if", "12"), x=960, y=250, jangkar="tengah", warna="tinta", kata=[K("your first plan", w("your", "12"))])
    k(peran="r6", dari=w("can", "12"), sampai=w("if", "12"), x=960, y=350, jangkar="tengah", warna="aksen", teks="can be wrong", ukuran=170)
    k(peran="r1", dari=w("if", "12"), sampai=b["13"]["mulai"], x=900, y=260, kata=[K("if you see", w("if", "12")), K("what people", w("what", "12"), baris=1), K("actually use", w("actually", "12"), baris=2)])
    # 13
    k(peran="giant", dari=b["13"]["mulai"], sampai=b["13"]["selesai"] + DURASI_TAMBAH, x=960, y=170, jangkar="tengah", ukuran=380, angka={"dari": 0, "ke": 19, "durasi": 0.9, "format": "detik"})
    k(peran="r2", dari=w("second", "13"), sampai=b["13"]["selesai"] + DURASI_TAMBAH, x=960, y=560, jangkar="tengah", teks="which second?")
    k(peran="lead", dari=w("Tell", "13"), sampai=b["13"]["selesai"] + DURASI_TAMBAH, x=960, y=720, jangkar="tengah", kata=[K("tell me in the comments", w("Tell", "13"))])
    return T


def EKSTRA_SFX(w):
    b = w.beat
    return [
        {"t": 0.0, "file": "sfx/glitch_cut.mp3", "gain": -16, "pilar": "aksen", "peran": "frame 0: gebrakan bunyi (Lantai D22c)"},
        {"t": w("second", "02"), "file": "sfx/tape_rewind.mp3", "gain": -14, "pilar": "transisi", "peran": "penghitung diputar mundur ke 0:00", "sampai": round(w("second", "02") + 0.7, 3)},
        {"t": w("zero", "05"), "file": "sfx/sub_drop.wav", "gain": -11, "pilar": "aksen", "peran": "nol balasan mendarat"},
        {"t": round(w("billion", "09") - 2.4, 3), "file": "sfx/riser_cymbal.wav", "gain": -16, "pilar": "aksen", "peran": "menuju angka akuisisi"},
        {"t": w("We've", "10") - 0.05, "file": "sfx/paper_slide.wav", "gain": -16, "pilar": "foley", "peran": "klip asli masuk"},
    ]


MUSIK = [
    {"file": "musik/mixkit-warm-443.mp3", "dari": 0.0, "sampai": 63.5, "gain": -4.7, "fadeIn": 0.05, "fadeOut": 0.6},
    {"file": "musik/mixkit-minimalism-506.mp3", "dari": 63.2, "sampai": 93.35, "gain": -11.5, "fadeIn": 0.7, "fadeOut": 1.2},
]
