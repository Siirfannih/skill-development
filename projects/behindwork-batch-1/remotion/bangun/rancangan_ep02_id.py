"""Ep02 versi bahasa Indonesia r2 (suara The Gap): visual, SFX tambahan, dan musik dari rancangan_ep02 r2 (Inggris);
titik potong dipetakan ke kata Indonesia; KT ditulis ulang dengan kata yang diucapkan dan batas adegan yang sama;
hening ±2 dtk setelah "kamu nggak." (jeda VO + tanpa musik); tanpa subtitle (D-21, D-23, D-30)."""
import importlib.util, os
from peta_id import muat_waktu, pemeta, ganti
from r2 import NAPAS

HERE = os.path.dirname(os.path.abspath(__file__))
_s = importlib.util.spec_from_file_location("en02", os.path.join(HERE, "rancangan_ep02.py")); EN = importlib.util.module_from_spec(_s); _s.loader.exec_module(EN)

ID = "Ep02ID"
VO = "/mnt/storage-projects/behindwork-batch-1/ep02/vo/id_gap/rakit"
VO_BEATS = f"{VO}/vo_beats.json"
VO_WORDS = f"{VO}/vo_words.json"
VO_SRC = "ep02/vo_id.wav"
SUB_MD = None
DURASI_TAMBAH = EN.DURASI_TAMBAH
JEDA = [(50.30, 1.8)]
SUNYI = [(49.65, 52.10)]
K = EN.K
EN_B, EN_W = muat_waktu(EN.VO_BEATS, EN.VO_WORDS)
ID_B, _ = muat_waktu(VO_BEATS, VO_WORDS)
_, MAP_T = pemeta(EN_B, EN_W, ID_B)

GANTI = {
    ("this", "01"): ("pemuda", "01"), ("at", "01", 2): ("di", "01"), ("café", "01"): ("warnet", "01"), ("until", "02"): ("sampai", "02"),
    ("every", "02"): ("setiap", "02"), ("from", "03"): ("dari", "03"), ("in", "03"): ("yang", "03"), ("took", "03"): ("naik", "03"),
    ("ship", "03"): ("kapal", "03"), ("four", "03"): ("4", "03"), ("three", "03"): ("3", "03"), ("Pematangsiantar", "03"): ("Pematangsiantar", "03"),
    ("free", "05"): ("internet", "05"), ("and", "05"): ("Dan", "05"), ("night", "05"): ("shift", "05"), ("and", "06"): ("dan", "06"),
    ("an", "06", 2): ("pasar", "06"), ("idea", "06"): ("ide", "06"), ("for", "08"): ("2", "08"), ("your", "09"): ("panutanmu", "09"),
    ("you're", "09"): ("kamu", "09"), ("the", "11"): ("dan", "11"), ("launched", "11"): ("diluncurkan", "11"), ("with", "11"): ("bersama", "11"),
    ("it", "12"): ("Tokopedia", "12"), ("not", "12"): ("Lumayan", "12"), ("GoTo", "12"): ("go", "12"), ("graduate", "12"): ("warnet", "12"),
    ("track", "13"): ("rekam", "13"), ("and", "13"): ("Dan", "13"), ("one", "13"): ("Satu", "13"),
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
    b = w.beat; T_ = []; END = b["14"]["selesai"] + DURASI_TAMBAH
    S = {a["id"]: a for a in EN.adegan(_w2(w))}
    d = lambda i: S[i]["dari"]; s = lambda i: S[i]["sampai"]
    def k(**kw): T_.append(kw)
    k(peran="giant", dari=0.0, sampai=s("01a"), x=960, y=170, jangkar="tengah", layar=True, ukuran=420, angka={"dari": 18, "ke": 21, "durasi": 0.9, "format": "jam"})
    k(peran="r1", dari=d("01b"), sampai=s("01b"), x=140, y=360, bayang=True, kata=[K("pemuda", w("pemuda", "01")), K("yang berjaga", w("berjaga", "01"), baris=1)])
    k(peran="r2", dari=w("Tokopedia", "01"), sampai=s("01b"), x=134, y=580, teks="Tokopedia", bayang=True)
    k(peran="lead", dari=w("Shift", "02"), sampai=s("02a"), x=960, y=280, jangkar="tengah", kata=[K("shift-nya", w("Shift", "02"))])
    T_.append(NAPAS("12 JAM.", w("12", "02"), s("02a"), ukuran=250))
    k(peran="giant", dari=d("02b"), sampai=s("02b"), x=960, y=180, jangkar="tengah", layar=True, ukuran=420, angka={"dari": 21, "ke": 33, "durasi": round(max(0.6, w("pagi", "02") - d("02b")), 2), "format": "jam"})
    k(peran="lead", dari=w("setiap", "02"), sampai=s("02b"), x=960, y=760, jangkar="tengah", bayang=True, kata=[K("setiap hari", w("setiap", "02"))])
    k(peran="r1", dari=w("William", "03"), sampai=s("03a"), x=1755, y=380, jangkar="kanan", bayang=True, kata=[K("William", w("William", "03")), K("Tanuwijaya", w("Tanuwijaya", "03"), baris=1)])
    T_.append(NAPAS("1999.", max(d("03c"), w("1999", "03")), s("03c"), ukuran=330))
    k(peran="lead", dari=d("03d"), sampai=s("03d"), x=170, y=170, bayang=True, kata=[K("naik kapal ke Jakarta", d("03d"))])
    T_.append(NAPAS("4 HARI.", d("03e"), w("3", "03"), ukuran=240))
    T_.append(NAPAS("3 MALAM.", w("3", "03"), s("03e"), ukuran=240))
    k(peran="kotak", dari=w("tahun", "04"), sampai=w("ayahnya", "04"), x=1150, y=360, teks="tahun kedua")
    k(peran="r1", dari=w("ayahnya", "04"), sampai=w("tulang", "04"), x=1755, y=360, jangkar="kanan", bayang=True, kata=[K("ayahnya", w("ayahnya", "04")), K("jatuh sakit", w("jatuh", "04"), baris=1)])
    k(peran="lead", dari=w("tulang", "04"), sampai=s("04"), x=1755, y=360, jangkar="kanan", bayang=True, kata=[K("tulang punggung", w("tulang", "04"))])
    k(peran="r2", dari=w("keluarga", "04"), sampai=s("04"), x=1755, y=460, jangkar="kanan", teks="keluarga", bayang=True)
    k(peran="r2", dari=w("shift", "05"), sampai=s("05a"), x=960, y=200, jangkar="tengah", layar=True, teks="shift malam")
    T_.append(NAPAS("INTERNET\nGRATIS.", d("05b"), s("05b"), warna="tinta", ukuran=210))
    k(peran="lead", dari=w("jatuh", "05"), sampai=s("05c"), x=170, y=300, bayang=True, kata=[K("jatuh", w("jatuh", "05"))])
    k(peran="r6", dari=w("cinta", "05"), sampai=s("05c"), x=165, y=380, teks="CINTA", bayang=True)
    k(peran="lead", dari=w("lulus", "06"), sampai=s("06a"), x=960, y=250, jangkar="tengah", warna="tinta", kata=[K("lulus", w("lulus", "06"))])
    T_.append(NAPAS("2003.", max(d("06a"), w("2003", "06")), s("06a"), warna="tinta", ukuran=330))
    k(peran="r6", dari=w("2007", "06"), sampai=s("06b"), x=960, y=330, jangkar="tengah", layar=True, teks="2007", ukuran=300)
    k(peran="lead", dari=w("ide", "06"), sampai=s("06b"), x=960, y=720, jangkar="tengah", bayang=True, kata=[K("idenya datang", w("ide", "06"))])
    k(peran="r1", dari=d("06c"), sampai=s("06c"), x=170, y=360, bayang=True, kata=[K("pasar online", d("06c")), K("yang bisa", w("bisa", "06"), baris=1), K("dipercaya", w("dipercaya", "06"), baris=2)])
    k(peran="giant", dari=d("07"), sampai=s("07"), x=960, y=170, jangkar="tengah", ukuran=420, angka={"dari": 23, "ke": 27, "durasi": round(max(0.6, w("gelap", "07") - d("07")), 2), "format": "jam"})
    T_.append(NAPAS("jam paling gelap.", w("jam", "07"), s("07"), ukuran=120, y=700))
    k(peran="r1", dari=w("kenal", "08"), sampai=s("08a"), x=170, y=330, bayang=True, kata=[K("nggak kenal", w("kenal", "08")), K("satu pun investor", w("satupun", "08"), baris=1)])
    T_.append(NAPAS("2 TAHUN.", d("08b"), s("08b"), ukuran=250, y=300))
    k(peran="kotak", dari=w("gagal", "08"), sampai=s("08b"), x=960, y=640, jangkar="tengah", teks="semua tawarannya gagal", ukuran=90)
    k(peran="lead", dari=w("salah", "09"), sampai=s("09a"), x=170, y=360, bayang=True, kata=[K("salah satunya bilang:", w("salah", "09"))])
    k(peran="r1", dari=d("09b"), sampai=s("09b"), x=170, y=330, bayang=True, kata=[K("panutanmu", d("09b")), K("lahir spesial", w("lahir", "09"), baris=1)])
    t = NAPAS("kamu nggak.", d("09c"), s("09c"), ukuran=110); t["tipis"] = True; T_.append(t)
    k(peran="kotak", dari=w("tamparan", "10"), sampai=w("berani", "10"), x=170, y=330, teks="tamparan")
    k(peran="r2", dari=w("berani", "10"), sampai=s("10"), x=165, y=330, teks="berani", bayang=True)
    k(peran="lead", dari=w("jalan", "10"), sampai=s("10"), x=170, y=480, bayang=True, kata=[K("jalan terus", w("jalan", "10"))])
    T_.append(NAPAS("17 Agustus\n2009.", d("11a"), s("11a"), warna="tinta", ukuran=190))
    k(peran="kotak", dari=w("diluncurkan", "11"), sampai=w("bersama", "11"), x=170, y=330, teks="Tokopedia diluncurkan")
    k(peran="r1", dari=w("bersama", "11"), sampai=s("11b"), x=170, y=330, bayang=True, kata=[K("bersama Leontinus", w("bersama", "11")), K("Alpha Edison", w("Alpha", "11"), baris=1)])
    T_.append(NAPAS("2021.", max(d("12a"), w("2021", "12")), s("12a"), ukuran=330))
    k(peran="lead", dari=w("bergabung", "12"), sampai=s("12b"), x=960, y=170, jangkar="tengah", bayang=True, kata=[K("bergabung dengan Gojek jadi GoTo", w("bergabung", "12"))])
    k(peran="lead", dari=d("12c"), sampai=s("12c"), x=170, y=300, bayang=True, kata=[K("lumayan, untuk", d("12c"))])
    k(peran="r2", dari=w("lulusan", "12"), sampai=s("12c"), x=165, y=400, teks="lulusan", bayang=True)
    k(peran="r2", dari=w("warnet", "12"), sampai=s("12c"), x=165, y=530, teks="warnet", bayang=True)
    k(peran="r1", dari=w("investor", "13"), sampai=w("rekam", "13"), x=960, y=470, jangkar="tengah", warna="tinta", kata=[K("investor menilai", w("investor", "13"))])
    T_.append(NAPAS("REKAM\nJEJAK.", w("rekam", "13"), s("13a"), warna="tinta", ukuran=220, aksen="JEJAK."))
    k(peran="r2", dari=w("bangun", "13"), sampai=s("13c"), x=960, y=380, jangkar="tengah", teks="bangun sendiri", bayang=True)
    k(peran="r1", dari=w("Satu", "13"), sampai=s("13c"), x=960, y=540, jangkar="tengah", bayang=True, kata=[K("satu shift demi satu shift", w("Satu", "13"))])
    k(peran="giant", dari=d("14"), sampai=END, x=960, y=170, jangkar="tengah", angka={"dari": 9, "ke": 21, "durasi": 0.8, "format": "jam"}, ukuran=380)
    T_.append(NAPAS("shift-mu jam berapa?", w("jam", "14"), END, ukuran=130, y=560))
    k(peran="lead", dari=w("Tulis", "14"), sampai=END, x=960, y=720, jangkar="tengah", kata=[K("tulis di komentar", w("Tulis", "14"))])
    return T_
