"""Ep01 versi bahasa Indonesia r2 (suara The Gap): visual, SFX tambahan, dan musik dari rancangan_ep01 r2 (Inggris);
titik potong dipetakan ke kata Indonesia yang sepadan; KT ditulis ulang memakai kata yang diucapkan dan batas adegan
yang sama dengan visualnya; tanpa subtitle (D-21, D-23). Kutipan Jensen (06, 08) dibawakan narator."""
import importlib.util, os
from peta_id import muat_waktu, pemeta, ganti
from r2 import NAPAS

HERE = os.path.dirname(os.path.abspath(__file__))
_s = importlib.util.spec_from_file_location("en01", os.path.join(HERE, "rancangan_ep01.py")); EN = importlib.util.module_from_spec(_s); _s.loader.exec_module(EN)

ID = "Ep01ID"
VO = "/mnt/storage-projects/behindwork-batch-1/ep01/vo/id_gap/rakit"
VO_BEATS = f"{VO}/vo_beats.json"
VO_WORDS = f"{VO}/vo_words.json"
VO_SRC = "ep01/vo_id.wav"
SUB_MD = None
DURASI_TAMBAH = EN.DURASI_TAMBAH
K = EN.K
EN_B, EN_W = muat_waktu(EN.VO_BEATS, EN.VO_WORDS)
ID_B, _ = muat_waktu(VO_BEATS, VO_WORDS)
_, MAP_T = pemeta(EN_B, EN_W, ID_B)

GANTI = {
    ("Before", "01"): ("Sebelum", "01"), ("Jensen", "01"): ("Jensen", "01"), ("It's", "01"): ("Ceritanya", "01"), ("not", "01"): ("bukan", "01"),
    ("leather", "02"): ("jaket", "02"), ("lot", "02"): ("jauh", "02"), ("His", "04"): ("Pamannya", "04"), ("Kentucky", "04"): ("Kentucky", "04"),
    ("prestigious", "04"): ("bergengsi", "04"), ("tough", "04"): ("ternyata", "04"), ("For", "05"): ("untuk", "05"), ("And", "05"): ("Dan", "05"),
    ("17", "05"): ("17", "05"), ("all", "06"): ("kalian", "06"), ("Denny's", "07"): ("Denny's", "07"), ("Not", "07"): ("Bukan", "07"),
    ("Portland", "07"): ("Portland", "07"), ("washing", "07", 2): ("cuci", "07", 2), ("He", "09", 2): ("Dia", "09", 2), ("nine", "09"): ("9", "09"),
    ("AMD", "09"): ("AMD", "09"), ("LSI", "09"): ("LSI", "09"), ("in", "10", 2): ("Di", "10"), ("NVIDIA", "10"): ("NVIDIA", "10"),
    ("San", "10"): ("San", "10"), ("two", "10"): ("2", "10"), ("to", "11", 2): ("sampai", "11"), ("No", "12"): ("nggak", "12"),
    ("If", "12"): ("kalau", "12"), ("lesson", "12"): ("pelajarannya", "12"),
}


def _w2(w):
    wp, _ = pemeta(EN_B, EN_W, w.beat)
    return ganti(w, wp, GANTI)


def adegan(w):
    return EN.adegan(_w2(w))


def EKSTRA_SFX(w):
    return EN.EKSTRA_SFX(_w2(w))


MUSIK = [dict(m, dari=round(MAP_T(m["dari"]), 3) if m["dari"] > 0 else 0.0, sampai=round(MAP_T(m["sampai"]), 3)) for m in EN.MUSIK]


def kt(w):
    b = w.beat; T_ = []; END = b["13"]["selesai"] + DURASI_TAMBAH
    S = {a["id"]: a for a in EN.adegan(_w2(w))}  # batas adegan = visual yang sama
    d = lambda i: S[i]["dari"]; s = lambda i: S[i]["sampai"]
    def k(**kw): T_.append(kw)
    k(peran="r1", dari=w("pernah", "01"), sampai=d("01b"), x=230, y=420, bayang=True, kata=[K("pernah dengar", w("pernah", "01")), K("cerita ini?", w("cerita", "01"), baris=1)])
    k(peran="lead", dari=w("Jensen", "01"), sampai=d("01c"), x=1130, y=360, bayang=True, kata=[K("Jensen Huang", w("Jensen", "01"))])
    k(peran="r2", dari=w("cuci", "01"), sampai=d("01c"), x=1124, y=460, teks="cuci mobil", bayang=True)
    T_.append(NAPAS("enak didengar.", max(d("01c"), w("enak", "01")), s("01c"), ukuran=170))
    T_.append(NAPAS("BUKAN BEGITU\nKEJADIANNYA.", d("01d"), s("01d"), warna="tinta", ukuran=150))
    k(peran="r1", dari=w("jaket", "02"), sampai=w("jauh", "02"), x=1270, y=420, bayang=True, kata=[K("jaket", w("jaket", "02")), K("kulit", w("kulit", "02"), baris=1)])
    k(peran="r2", dari=w("jauh", "02"), sampai=s("02"), x=960, y=470, jangkar="tengah", teks="jauh lebih berat", bayang=True)
    t_m = w("mundur", "03")
    k(peran="lead", dari=t_m, sampai=s("03"), x=960, y=170, jangkar="tengah", kata=[K("mundur", t_m)])
    k(peran="giant", dari=t_m, sampai=s("03"), x=960, y=300, jangkar="tengah", angka={"dari": 2026, "ke": 1972, "durasi": round(max(1.0, w("1972", "03") - t_m), 2)})
    T_.append(NAPAS("9 TAHUN.", max(d("04a"), w("9", "04")), s("04a"), ukuran=230))
    k(peran="lead", dari=d("04b"), sampai=w("Kentucky", "04"), x=170, y=170, bayang=True, kata=[K("pamannya mengirimnya", d("04b"))])
    k(peran="kotak", dari=w("Kentucky", "04"), sampai=w("bergengsi", "04"), x=170, y=170, teks="Kentucky")
    k(peran="kotak", dari=w("bergengsi", "04"), sampai=s("04b"), x=170, y=170, teks="bergengsi?")
    T_.append(NAPAS("KERAS.", max(d("04c"), w("keras", "04")), s("04c"), ukuran=300))
    k(peran="lead", dari=d("05a"), sampai=w("toilet", "05"), x=960, y=330, jangkar="tengah", kata=[K("tugas hariannya:", d("05a"))])
    k(peran="r2", dari=w("toilet", "05"), sampai=s("05a"), x=960, y=440, jangkar="tengah", teks="bersihin toilet")
    T_.append(NAPAS("100 ANAK.\n1 PEL.", d("05b"), s("05b"), warna="tinta", ukuran=230, aksen="100"))
    k(peran="lead", dari=w("teman", "05"), sampai=s("05c"), x=1755, y=200, jangkar="kanan", bayang=True, kata=[K("teman sekamarnya", w("teman", "05"))])
    k(peran="r6", dari=w("17", "05"), sampai=s("05c"), x=1755, y=290, jangkar="kanan", teks="17", ukuran=300, bayang=True)
    k(peran="r1", dari=w("Kata", "06"), sampai=w("lebih", "06"), x=170, y=330, bayang=True, kata=[K("kata Jensen", w("Kata", "06")), K("sendiri:", w("sendiri", "06"), baris=1)])
    k(peran="lead", dari=w("lebih", "06"), sampai=s("06b"), x=170, y=300, bayang=True, kata=[K("lebih banyak toilet", w("lebih", "06"))])
    k(peran="r2", dari=w("daripada", "06"), sampai=s("06b"), x=165, y=410, teks="daripada", bayang=True)
    k(peran="r2", dari=w("kalian", "06"), sampai=s("06b"), x=165, y=540, teks="kalian semua", bayang=True)
    T_.append(NAPAS("UMUR 15.", d("07a"), s("07a"), ukuran=240))
    k(peran="r2", dari=w("Portland", "07"), sampai=w("Bukan", "07"), x=1755, y=780, jangkar="kanan", teks="Portland", bayang=True)
    k(peran="r2", dari=w("Bukan", "07"), sampai=s("07b"), x=960, y=180, jangkar="tengah", teks="bukan cuci mobil", bayang=True)
    T_.append(NAPAS("cuci piring.", d("07c"), w("busboy", "07"), ukuran=190))
    T_.append(NAPAS("busboy.", w("busboy", "07"), w("pelayan", "07"), ukuran=200))
    T_.append(NAPAS("pelayan.", w("pelayan", "07"), s("07c"), ukuran=200))
    k(peran="lead", dari=w("pencuci", "08"), sampai=s("08"), x=170, y=320, bayang=True, kata=[K("pencuci piring", w("pencuci", "08"))])
    k(peran="r2", dari=w("terbaik", "08"), sampai=s("08"), x=165, y=420, teks="terbaik di Denny's", bayang=True)
    T_.append(NAPAS("nggak berhenti.", max(d("09a"), w("nggak", "09")), s("09a"), warna="tinta", ukuran=170))
    k(peran="r2", dari=w("teknik", "09"), sampai=w("9", "09"), x=960, y=430, jangkar="tengah", teks="teknik elektro", ukuran=120)
    k(peran="lead", dari=w("9", "09"), sampai=w("AMD", "09"), x=960, y=360, jangkar="tengah", kata=[K("9 tahun", w("9", "09"))])
    k(peran="r2", dari=w("merancang", "09"), sampai=w("AMD", "09"), x=960, y=450, jangkar="tengah", teks="MERANCANG CHIP", ukuran=130)
    k(peran="r2", dari=w("AMD", "09"), sampai=w("LSI", "09"), x=960, y=430, jangkar="tengah", teks="AMD", ukuran=130)
    k(peran="r6", dari=w("LSI", "09"), sampai=s("09b"), x=960, y=420, jangkar="tengah", teks="LSI Logic", ukuran=200)
    k(peran="r1", dari=d("10a"), sampai=w("1993", "10"), x=960, y=470, jangkar="tengah", warna="tinta", kata=[K("sampai akhirnya,", d("10a"))])
    T_.append(NAPAS("1993.", w("1993", "10"), s("10a"), warna="tinta", ukuran=360))
    k(peran="lead", dari=d("10b"), sampai=w("2", "10"), x=170, y=790, bayang=True, kata=[K("sebuah booth Denny's, San Jose", d("10b"))])
    k(peran="r1", dari=w("2", "10"), sampai=s("10b"), x=170, y=700, bayang=True, kata=[K("dia dan 2 rekannya", w("2", "10")), K("merancang perusahaan", w("merancang", "10"), baris=1)])
    T_.append(NAPAS("NVIDIA.", d("10c"), s("10c"), ukuran=260))
    k(peran="kotak", dari=w("toilet", "11"), sampai=w("cuci", "11"), x=960, y=470, jangkar="tengah", teks="toilet")
    k(peran="kotak", dari=w("cuci", "11"), sampai=w("sampai", "11"), x=960, y=470, jangkar="tengah", teks="piring")
    k(peran="r2", dari=w("paling", "11"), sampai=s("11"), x=1755, y=560, jangkar="kanan", teks="paling bernilai", ukuran=104, bayang=True)
    k(peran="lead", dari=w("dunia", "11"), sampai=s("11"), x=1755, y=690, jangkar="kanan", bayang=True, kata=[K("di dunia", w("dunia", "11"))])
    k(peran="lead", dari=w("pelajarannya", "12"), sampai=s("12a"), x=960, y=200, jangkar="tengah", bayang=True, kata=[K("jadi mungkin pelajarannya:", w("Jadi", "12"))])
    T_.append(NAPAS("NGGAK ADA YANG\nTERLALU RENDAH.", d("12b"), s("12b"), warna="tinta", ukuran=160, aksen="RENDAH."))
    k(peran="r2", dari=w("puncak", "12"), sampai=s("12c"), x=960, y=790, jangkar="tengah", teks="ke puncak", bayang=True)
    k(peran="r2", dari=w("kerja", "13"), sampai=END, x=960, y=420, jangkar="tengah", teks="kerja pertamamu?")
    k(peran="lead", dari=w("Cerita", "13"), sampai=END, x=960, y=590, jangkar="tengah", kata=[K("cerita di komentar", w("Cerita", "13"))])
    return T_
