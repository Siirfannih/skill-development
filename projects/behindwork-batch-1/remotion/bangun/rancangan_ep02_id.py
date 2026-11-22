"""Ep02 versi bahasa Indonesia (suara The Gap): visual, SFX tambahan, dan musik dari rancangan_ep02 (Inggris),
waktunya dari VO Indonesia; KT ditulis ulang memakai kata yang diucapkan; tanpa subtitle (D-21)."""
import importlib.util, os
from peta_id import muat_waktu, pemeta, ganti

HERE = os.path.dirname(os.path.abspath(__file__))
_s = importlib.util.spec_from_file_location("en02", os.path.join(HERE, "rancangan_ep02.py")); EN = importlib.util.module_from_spec(_s); _s.loader.exec_module(EN)

ID = "Ep02ID"
VO = "/mnt/storage-projects/behindwork-batch-1/ep02/vo/id_gap/rakit"
VO_BEATS = f"{VO}/vo_beats.json"
VO_WORDS = f"{VO}/vo_words.json"
VO_SRC = "ep02/vo_id.wav"
SUB_MD = None
DURASI_TAMBAH = EN.DURASI_TAMBAH
K = EN.K
EN_B, EN_W = muat_waktu(EN.VO_BEATS, EN.VO_WORDS)
ID_B, _ = muat_waktu(VO_BEATS, VO_WORDS)
_, MAP_T = pemeta(EN_B, EN_W, ID_B)

# titik potong adegan/SFX Inggris -> kata Indonesia yang sepadan
GANTI = {
    ("this", "01"): ("pemuda", "01"), ("until", "02"): ("sampai", "02"), ("from", "03"): ("dari", "03"),
    ("who", "03"): ("yang", "03"), ("four", "03"): ("4", "03"), ("and", "05"): ("dan", "05"),
    ("and", "06"): ("dan", "06"), ("the", "11"): ("dan", "11"), ("Not", "12"): ("Lumayan", "12"),
    ("and", "13"): ("dan", "13"), ("you're", "09"): ("kamu", "09"), ("launched", "11"): ("diluncurkan", "11"),
    ("darkest", "07"): ("gelap", "07"),
}


def _w2(w):
    wp, _ = pemeta(EN_B, EN_W, w.beat)
    return ganti(w, wp, GANTI)


def adegan(w):
    A = EN.adegan(_w2(w))
    for x in A:  # klip terang di bawah KT putih panjang: diredam supaya terbaca
        if x["id"] == "06b":
            x["lapisan"][0]["grade"] = "redam"
    return A


def EKSTRA_SFX(w):
    return EN.EKSTRA_SFX(_w2(w))


MUSIK = [dict(m, dari=round(MAP_T(m["dari"]), 3) if m["dari"] > 0 else 0.0, sampai=round(MAP_T(m["sampai"]), 3)) for m in EN.MUSIK]


def kt(w):
    b = w.beat; T = []; w2 = _w2(w); END = b["14"]["selesai"] + DURASI_TAMBAH
    def k(**kw): T.append(kw)
    t_pemuda = w("pemuda", "01")
    k(peran="giant", dari=0.0, sampai=t_pemuda, x=960, y=300, jangkar="tengah", angka={"dari": 18, "ke": 21, "durasi": 0.9, "format": "jam"})
    k(peran="r1", dari=t_pemuda, sampai=b["02"]["mulai"], x=170, y=360, bayang=True, kata=[K("pemuda", t_pemuda), K("yang berjaga", w("berjaga", "01"), baris=1)])
    k(peran="r2", dari=w("Tokopedia", "01"), sampai=b["02"]["mulai"], x=164, y=580, teks="Tokopedia", bayang=True)
    t_sampai = w("sampai", "02")
    k(peran="lead", dari=w("Shift", "02"), sampai=t_sampai, x=960, y=360, jangkar="tengah", kata=[K("shift-nya", w("Shift", "02"))])
    k(peran="r6", dari=w("12", "02"), sampai=t_sampai, x=960, y=450, jangkar="tengah", teks="12 jam")
    k(peran="giant", dari=t_sampai, sampai=b["03"]["mulai"], x=960, y=250, jangkar="tengah", angka={"dari": 21, "ke": 33, "durasi": round(w("pagi", "02") - t_sampai, 2), "format": "jam"})
    k(peran="lead", dari=w("setiap", "02"), sampai=b["03"]["mulai"], x=960, y=760, jangkar="tengah", kata=[K("setiap hari", w("setiap", "02"))])
    t_dari = w("dari", "03")
    k(peran="r1", dari=w("William", "03"), sampai=t_dari, x=1150, y=380, bayang=True, kata=[K("William", w("William", "03")), K("Tanuwijaya", w("Tanuwijaya", "03"), baris=1)])
    k(peran="r6", dari=w("tahun", "03"), sampai=w("4", "03"), x=960, y=230, jangkar="tengah", teks="1999", ukuran=280, bayang=True)
    k(peran="r1", dari=w("kapal", "03"), sampai=w("4", "03"), x=960, y=560, jangkar="tengah", bayang=True, kata=[K("naik kapal ke Jakarta", w("naik", "03"))])
    k(peran="r2", dari=w("4", "03"), sampai=b["04"]["mulai"], x=960, y=360, jangkar="tengah", teks="empat hari", bayang=True)
    k(peran="r2", dari=w("3", "03"), sampai=b["04"]["mulai"], x=960, y=500, jangkar="tengah", teks="tiga malam", bayang=True)
    k(peran="kotak", dari=w("tahun", "04"), sampai=w("ayahnya", "04"), x=1180, y=360, teks="tahun kedua")
    k(peran="r1", dari=w("ayahnya", "04"), sampai=w("tulang", "04"), x=1180, y=360, bayang=True, kata=[K("ayahnya", w("ayahnya", "04")), K("jatuh sakit", w("jatuh", "04"), baris=1)])
    k(peran="lead", dari=w("tulang", "04"), sampai=b["05"]["mulai"], x=1180, y=360, bayang=True, kata=[K("tulang punggung", w("tulang", "04"))])
    k(peran="r2", dari=w("keluarga", "04"), sampai=b["05"]["mulai"], x=1174, y=460, teks="keluarga", bayang=True)
    t_dan5 = w("dan", "05")
    k(peran="r2", dari=w("shift", "05"), sampai=w("internet", "05"), x=960, y=420, jangkar="tengah", teks="shift malam", bayang=True)
    k(peran="kotak", dari=w("internet", "05"), sampai=t_dan5, x=960, y=420, jangkar="tengah", teks="internet gratis")
    k(peran="lead", dari=w("jatuh", "05"), sampai=b["06"]["mulai"], x=1160, y=300, bayang=True, kata=[K("jatuh", w("jatuh", "05"))])
    k(peran="r6", dari=w("cinta", "05"), sampai=b["06"]["mulai"], x=1150, y=380, teks="CINTA", bayang=True)
    t_dan6 = w("dan", "06")
    k(peran="lead", dari=w("lulus", "06"), sampai=t_dan6, x=960, y=330, jangkar="tengah", kata=[K("lulus", w("lulus", "06"))])
    k(peran="r6", dari=w("tahun", "06"), sampai=t_dan6, x=960, y=420, jangkar="tengah", teks="2003", ukuran=280)
    k(peran="r6", dari=w("tahun", "06", 2), sampai=w("pasar", "06"), x=960, y=300, jangkar="tengah", teks="2007", ukuran=280, bayang=True)
    k(peran="r1", dari=w("pasar", "06"), sampai=b["07"]["mulai"], x=960, y=360, jangkar="tengah", bayang=True, kata=[K("pasar online", w("pasar", "06")), K("yang bisa dipercaya", w("bisa", "06"), baris=1)])
    k(peran="giant", dari=b["07"]["mulai"], sampai=b["08"]["mulai"], x=960, y=240, jangkar="tengah", angka={"dari": 23, "ke": 27, "durasi": round(w("gelap", "07") - b["07"]["mulai"], 2), "format": "jam"})
    k(peran="lead", dari=w("jam", "07"), sampai=b["08"]["mulai"], x=960, y=760, jangkar="tengah", kata=[K("jam paling gelap", w("jam", "07"))])
    k(peran="r1", dari=w("kenal", "08"), sampai=b["09"]["mulai"], x=170, y=300, bayang=True, kata=[K("nggak kenal", w("kenal", "08")), K("satu pun investor", w("satu", "08"), baris=1)])
    k(peran="r6", dari=w("2", "08"), sampai=b["09"]["mulai"], x=160, y=510, teks="2 tahun", ukuran=190, bayang=True)
    k(peran="kotak", dari=w("gagal", "08"), sampai=b["09"]["mulai"], x=170, y=720, teks="gagal")
    t_kamu = w("kamu", "09")
    k(peran="r1", dari=w("panutanmu", "09"), sampai=t_kamu, x=1150, y=330, bayang=True, kata=[K("panutanmu", w("panutanmu", "09"))])
    k(peran="r2", dari=w("lahir", "09"), sampai=t_kamu, x=1144, y=440, teks="lahir spesial", bayang=True)
    k(peran="r6", dari=t_kamu, sampai=w("tamparan", "10"), x=1755, y=360, jangkar="kanan", teks="kamu nggak", ukuran=150, bayang=True)
    k(peran="kotak", dari=w("tamparan", "10"), sampai=w("berani", "10"), x=1180, y=360, teks="tamparan")
    k(peran="r2", dari=w("berani", "10"), sampai=b["11"]["mulai"], x=1174, y=360, teks="berani", bayang=True)
    k(peran="lead", dari=w("jalan", "10"), sampai=b["11"]["mulai"], x=1180, y=500, bayang=True, kata=[K("jalan terus", w("jalan", "10"))])
    t_dan11 = w("dan", "11")
    k(peran="giant", dari=b["11"]["mulai"], sampai=t_dan11, x=960, y=200, jangkar="tengah", angka={"dari": 27, "ke": 33, "durasi": 0.9, "format": "jam"})
    k(peran="r2", dari=w("Agustus", "11"), sampai=t_dan11, x=960, y=680, jangkar="tengah", teks="17 Agustus 2009")
    k(peran="r6", dari=w("diluncurkan", "11"), sampai=b["12"]["mulai"], x=165, y=330, warna="tinta", teks="diluncurkan", ukuran=150)
    k(peran="r1", dari=w("Leontinus", "11"), sampai=b["12"]["mulai"], x=170, y=560, warna="tinta", kata=[K("bersama Leontinus", w("bersama", "11")), K("Alpha Edison", w("Alpha", "11"), baris=1)])
    t_lumayan = w("Lumayan", "12")
    k(peran="r6", dari=w("Tahun", "12"), sampai=t_lumayan, x=165, y=180, teks="2021", ukuran=260, bayang=True)
    k(peran="lead", dari=t_lumayan, sampai=b["13"]["mulai"], x=1000, y=330, warna="tinta", kata=[K("lumayan, untuk", t_lumayan)])
    k(peran="r2", dari=w("lulusan", "12"), sampai=b["13"]["mulai"], x=1000, y=430, warna="tinta", teks="lulusan", aksen="lulusan")
    k(peran="r2", dari=w("warnet", "12"), sampai=b["13"]["mulai"], x=1000, y=560, warna="tinta", teks="warnet")
    t_dan13 = w("dan", "13")
    k(peran="lead", dari=w("investor", "13"), sampai=t_dan13, x=960, y=360, jangkar="tengah", warna="tinta", kata=[K("investor menilai", w("investor", "13"))])
    k(peran="r6", dari=w("rekam", "13"), sampai=t_dan13, x=960, y=450, jangkar="tengah", warna="tinta", teks="rekam jejak", ukuran=180)
    k(peran="r2", dari=w("bangun", "13"), sampai=b["14"]["mulai"], x=960, y=380, jangkar="tengah", teks="bangun sendiri", bayang=True)
    k(peran="r1", dari=w("satu", "13"), sampai=b["14"]["mulai"], x=960, y=540, jangkar="tengah", bayang=True, kata=[K("satu shift demi satu shift", w("satu", "13"))])
    k(peran="giant", dari=b["14"]["mulai"], sampai=END, x=960, y=170, jangkar="tengah", angka={"dari": 9, "ke": 21, "durasi": 0.8, "format": "jam"}, ukuran=380)
    k(peran="r2", dari=w("jam", "14"), sampai=END, x=960, y=560, jangkar="tengah", teks="shift-mu jam berapa?")
    k(peran="lead", dari=w("Tulis", "14"), sampai=END, x=960, y=720, jangkar="tengah", kata=[K("tulis di komentar", w("Tulis", "14"))])
    return T
