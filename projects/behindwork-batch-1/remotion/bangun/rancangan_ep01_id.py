"""Ep01 versi bahasa Indonesia (suara The Gap): visual, SFX tambahan, dan musik dari rancangan_ep01 (Inggris),
waktunya dari VO Indonesia; KT ditulis ulang memakai kata yang diucapkan; tanpa subtitle (D-21).
Beat 06 dan 08 (kutipan suara asli di versi Inggris) dibawakan narator."""
import importlib.util, os
from peta_id import muat_waktu, pemeta, ganti

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
    ("Before", "01"): ("sebelum", "01"), ("It's", "01"): ("Ceritanya", "01"), ("boarding", "04"): ("sekolah", "04"),
    ("And", "05"): ("Dan", "05"), ("Not", "07"): ("Bukan", "07"), ("then", "09"): ("lalu", "09"),
    ("he", "10"): ("dia", "10"), ("If", "12"): ("kalau", "12"), ("too", "12"): ("terlalu", "12"), ("NVIDIA", "10"): ("NVIDIA", "10"),
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
    b = w.beat; T = []; END = b["13"]["selesai"] + DURASI_TAMBAH
    def k(**kw): T.append(kw)
    e1 = w("Ceritanya", "01"); t_seb = w("sebelum", "01")
    k(peran="r1", dari=w("dengar", "01"), sampai=t_seb, x=230, y=420, bayang=True, kata=[K("pernah dengar", w("pernah", "01")), K("cerita ini?", w("cerita", "01"), baris=1)])
    k(peran="lead", dari=w("Jensen", "01"), sampai=e1, x=1130, y=360, bayang=True, kata=[K("Jensen Huang", w("Jensen", "01"))])
    k(peran="r2", dari=w("cuci", "01"), sampai=e1, x=1060, y=460, teks="cuci mobil", bayang=True)
    k(peran="lead", dari=w("enak", "01"), sampai=w("tapi", "01"), x=960, y=470, jangkar="tengah", kata=[K("enak didengar", w("enak", "01"))])
    k(peran="lead", dari=w("tapi", "01"), sampai=b["02"]["mulai"], x=960, y=390, jangkar="tengah", kata=[K("tapi", w("tapi", "01"))])
    k(peran="r2", dari=w("bukan", "01"), sampai=b["02"]["mulai"], x=960, y=490, jangkar="tengah", teks="bukan begitu kejadiannya", ukuran=110)
    k(peran="r1", dari=w("jaket", "02"), sampai=b["03"]["mulai"], x=1150, y=420, bayang=True, kata=[K("jaket", w("jaket", "02")), K("kulit", w("kulit", "02"), baris=1)])
    k(peran="lead", dari=w("jauh", "02"), sampai=b["03"]["mulai"], x=1150, y=640, bayang=True, kata=[K("jauh lebih", w("jauh", "02"))])
    k(peran="r2", dari=w("berat", "02"), sampai=b["03"]["mulai"], x=1144, y=730, teks="berat", bayang=True)
    t_m = w("mundur", "03")
    k(peran="lead", dari=t_m, sampai=b["04"]["mulai"], x=960, y=170, jangkar="tengah", kata=[K("mundur", t_m)])
    k(peran="giant", dari=t_m, sampai=b["04"]["mulai"], x=960, y=300, jangkar="tengah", angka={"dari": 2026, "ke": 1972, "durasi": round(max(1.0, b["03"]["selesai"] - t_m - 0.3), 2)})
    t_sek = w("sekolah", "04")
    k(peran="r2", dari=w("9", "04"), sampai=t_sek, x=900, y=430, teks="sembilan tahun")
    k(peran="lead", dari=w("Pamannya", "04"), sampai=t_sek, x=906, y=600, kata=[K("pamannya", w("Pamannya", "04"))])
    k(peran="kotak", dari=w("Kentucky", "04"), sampai=w("dikira", "04"), x=960, y=380, jangkar="tengah", teks="Kentucky")
    k(peran="kotak", dari=w("dikira", "04"), sampai=w("ternyata", "04"), x=960, y=380, jangkar="tengah", teks="bergengsi?")
    k(peran="kotak", dari=w("ternyata", "04"), sampai=b["05"]["mulai"], x=960, y=380, jangkar="tengah", teks="sekolah asrama yang keras")
    t_dan = w("Dan", "05")
    k(peran="lead", dari=w("hariannya", "05"), sampai=w("toilet", "05"), x=960, y=420, jangkar="tengah", warna="tinta", kata=[K("tugas hariannya", w("hariannya", "05"))])
    k(peran="r2", dari=w("toilet", "05"), sampai=t_dan, x=960, y=280, jangkar="tengah", warna="tinta", teks="toilet")
    k(peran="r6", dari=w("100", "05"), sampai=t_dan, x=960, y=470, jangkar="tengah", warna="tinta", teks="100 anak", aksen="100", ukuran=170)
    k(peran="lead", dari=w("teman", "05"), sampai=b["06"]["mulai"], x=960, y=320, jangkar="tengah", kata=[K("teman sekamarnya", w("teman", "05"))])
    k(peran="r6", dari=w("17", "05"), sampai=b["06"]["mulai"], x=960, y=430, jangkar="tengah", teks="17", ukuran=300)
    t_leb = w("lebih", "06")
    k(peran="lead", dari=w("Kata", "06"), sampai=t_leb, x=1160, y=330, bayang=True, kata=[K("kata Jensen", w("Kata", "06"))])
    k(peran="lead", dari=t_leb, sampai=b["07"]["mulai"], x=1160, y=330, bayang=True, kata=[K("lebih banyak", t_leb)])
    k(peran="r2", dari=w("toilet", "06"), sampai=b["07"]["mulai"], x=1150, y=440, teks="toilet", bayang=True)
    k(peran="r2", dari=w("kalian", "06"), sampai=b["07"]["mulai"], x=1755, y=570, jangkar="kanan", teks="kalian semua", bayang=True)
    t_buk = w("Bukan", "07")
    k(peran="r2", dari=w("Umur", "07"), sampai=t_buk, x=1755, y=790, jangkar="kanan", teks="umur 15", bayang=True)
    k(peran="r1", dari=t_buk, sampai=b["08"]["mulai"], x=990, y=250, kata=[K("bukan cuci mobil", t_buk, redup=True), K("cuci piring", w("cuci", "07", 2), baris=1), K("busboy", w("busboy", "07"), baris=2)])
    k(peran="r2", dari=w("pelayan", "07"), sampai=b["08"]["mulai"], x=984, y=560, teks="pelayan")
    k(peran="r2", dari=w("pencuci", "08"), sampai=b["09"]["mulai"], x=1755, y=320, jangkar="kanan", teks="pencuci piring", bayang=True)
    k(peran="lead", dari=w("terbaik", "08"), sampai=b["09"]["mulai"], x=1755, y=460, jangkar="kanan", bayang=True, kata=[K("terbaik di Denny's", w("terbaik", "08"))])
    t_kul = w("kuliah", "09")
    k(peran="r1", dari=w("nggak", "09"), sampai=t_kul, x=960, y=380, jangkar="tengah", kata=[K("dia nggak berhenti", w("nggak", "09")), K("di dapur", w("dapur", "09"), baris=1)])
    k(peran="r2", dari=w("teknik", "09"), sampai=w("lalu", "09"), x=960, y=430, jangkar="tengah", teks="teknik elektro")
    k(peran="lead", dari=w("9", "09"), sampai=b["10"]["mulai"], x=960, y=230, jangkar="tengah", kata=[K("sembilan tahun", w("9", "09"))])
    k(peran="r2", dari=w("AMD", "09"), sampai=b["10"]["mulai"], x=960, y=380, jangkar="tengah", teks="AMD", warna="redup")
    k(peran="r6", dari=w("LSI", "09"), sampai=b["10"]["mulai"], x=960, y=520, jangkar="tengah", teks="LSI Logic")
    t_dia = w("dia", "10")
    k(peran="r6", dari=w("tahun", "10"), sampai=t_dia, x=500, y=210, teks="1993", ukuran=330, belakang=True)
    k(peran="lead", dari=w("Denny", "10"), sampai=t_dia, x=512, y=150, kata=[K("Denny's, San Jose", w("Denny", "10"))], bayang=True)
    k(peran="r1", dari=w("2", "10"), sampai=b["11"]["mulai"], x=230, y=420, kata=[K("dua", w("2", "10")), K("rekannya", w("rakannya", "10"), baris=1)])
    k(peran="kotak", dari=w("toilet", "11"), sampai=b["12"]["mulai"], x=480, y=380, jangkar="tengah", teks="toilet")
    k(peran="r2", dari=w("paling", "11"), sampai=b["12"]["mulai"], x=1440, y=790, jangkar="tengah", teks="paling bernilai", ukuran=104, bayang=True)
    t_ng = w("nggak", "12"); t_kal = w("kalau", "12")
    k(peran="r1", dari=w("pelajarannya", "12"), sampai=t_ng, x=960, y=470, jangkar="tengah", warna="tinta", kata=[K("pelajarannya", w("pelajarannya", "12"))])
    k(peran="lead", dari=t_ng, sampai=t_kal, x=960, y=370, jangkar="tengah", warna="tinta", kata=[K("nggak ada pekerjaan yang", t_ng)])
    k(peran="r6", dari=w("terlalu", "12"), sampai=t_kal, x=960, y=470, jangkar="tengah", warna="tinta", teks="terlalu rendah", aksen="rendah", ukuran=180)
    k(peran="lead", dari=w("membangun", "12"), sampai=b["13"]["mulai"], x=960, y=680, jangkar="tengah", bayang=True, kata=[K("membangun kebiasaan", w("membangun", "12"))])
    k(peran="r2", dari=w("puncak", "12"), sampai=b["13"]["mulai"], x=960, y=790, jangkar="tengah", teks="ke puncak", bayang=True)
    k(peran="r2", dari=w("kerja", "13"), sampai=END, x=960, y=420, jangkar="tengah", teks="kerja pertamamu?")
    k(peran="lead", dari=w("Cerita", "13"), sampai=END, x=960, y=590, jangkar="tengah", kata=[K("cerita di komentar", w("Cerita", "13"))])
    return T
