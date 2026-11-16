#!/usr/bin/env python3
"""teks.json: kerangka dari teks_plan.plan() (waktu dari words.json), lalu peran/kode/gaya/posisi/alasan sesuai DESAIN.md.
Pakai: python3 lego/teks.py   -> ../teks.json  ; lalu kt_check.py teks.json
Peran -> gerak (typography.md §8a), satu peran satu gerak: R1 T19 · R2 T03 · R3 T25 · R4 T09 · R6 T04.
"""
import json, os, sys
import waktu as W
from waktu import P, U, T, FPS
from teks_plan import plan  # noqa: E402  (scripts/lego, lewat waktu.sys.path)

HERO, INK, CORAL, HIJAU = "#FAF8EC", "#1F2328", "#F97066", "#1A7F37"
H, V = 1920, 1080
# Adegan layar penuh (dunia repo B1, aplikasi Claude B3, dua jendela B5b) DITUNDA sampai adendum gaya MG: posisi/warna teks memakai aturan adegan wajah.
DUNIA = os.environ.get("DUNIA", "1") == "1"

# ---- blok khusus: (kata awal, setelah detik, jumlah unit) -> spesifikasi. Unit lain = R1 T19 narasi. ----
def sp(txt, after, n, **k):
    return dict(i=W.idx(txt, after), n=n, **k)

SPEK = [
    sp("finally", 0, 1, peran="R6", kode="T04", gaya="finally", teks_vis="FINALLY", alasan="kata hero emosi B1: berdiri sendiri di ruang kosong kiri (DESAIN B1)"),
    sp("selesai", 2.5, 1, peran="R2", kode="T03", gaya="r2", warna=HIJAU, alasan="kata kunci menempel centang hijau (DESAIN B1)"),
    sp("workflow", 6, 1, peran="R6", kode="T04", gaya="busur", alasan="kata cincin besar di busur kepala (DESAIN B1b)"),
    sp("AI", 7.4, 2, peran="R6", kode="T04", gaya="busur", alasan="kata cincin besar di busur kepala (DESAIN B1b)"),
    sp("ChatGPT", 8.5, 1, peran="R2", kode="T03", gaya="r2", alasan="nama menempel tokoh Codex yang lambai"),
    sp("Claude", 9.8, 1, peran="R2", kode="T03", gaya="r2", alasan="nama menempel Clawd yang melompat"),
    sp("Gemini", 10.2, 1, peran="R2", kode="T03", gaya="r2", alasan="nama menempel bintang Gemini yang berputar"),
    sp("decision", 12, 1, peran="R6", kode="T04", gaya="busur", alasan="kata cincin besar, tiga tokoh menoleh (DESAIN B1b)"),
    sp("viral", 15, 1, peran="R3", kode="T25", gaya="viral", teks_vis="VIRAL!!", alasan="parodi slop: kata viral berbayang tebal di tumpukan (DESAIN B2a)"),
    sp("AI", 20.5, 2, peran="R6", kode="T04", gaya="slab", teks_vis="AI SLOP", alasan="slab coral di belakang kepala, ruang di-grade (DESAIN B2a)"),
    sp("putus-putus", 22.5, 1, peran="R3", kode="T25", gaya="putus", alasan="suku kata muncul terputus, jeda tak rata (DESAIN B2b)"),
    sp("template", 25, 1, peran="R2", kode="T03", gaya="r2", gelap=True, alasan="kata kunci di dekat kolom ketik saat '/' diketik (DESAIN B3a)"),
    sp("ngebalik", 33, 1, peran="R2", kode="T03", gaya="r2", gelap=True, alasan="kata kunci saat daftar terhapus (DESAIN B3b)"),
    sp("workflow-nya", 37.5, 1, peran="R6", kode="T04", gaya="slab", teks_vis="WORKFLOW-NYA", alasan="slab putih hangat di belakang kepala (DESAIN B3b)"),
    sp("balik", 42.5, 2, peran="R6", kode="T04", gaya="slab", teks_vis="BALIK MODAL", alasan="slab di belakang kepala, rima dengan papan Opus B4 (DESAIN B4a)"),
    sp("habis", 43.5, 2, peran="R3", kode="T25", gaya="r3", alasan="biaya terkuras: kata kacau/frustrasi (DESAIN B4b)"),
    sp("20", 48.5, 2, peran="R2", kode="T03", gaya="kartu", teks_vis="20×", alasan="angka tampil SEBAGAI kartu ChatGPT (20× besar, mendarat di kata ini); tidak ada KT kedua supaya kata tidak dobel (Lantai A3, DESAIN B4b)"),
    sp("5", 51, 2, peran="R2", kode="T03", gaya="kartu", teks_vis="5×", alasan="angka tampil SEBAGAI kartu Claude (5× besar, mendarat di kata ini); tidak dobel (Lantai A3, DESAIN B4b)"),
    sp("kesalahan", 67.5, 1, peran="R3", kode="T25", gaya="r3", alasan="kesalahan berulang yang diminimalkan: kata kacau lalu mendarat (DESAIN B5b)"),
    sp("loop", 70, 2, peran="R2", kode="T03", gaya="r2", alasan="kata kunci saat loop menutup + centang (DESAIN B5b)"),
    sp("lintas", 57, 2, peran="R3", kode="T25", gaya="r3", alasan="banyak agen saling silang: kata kacau lalu mendarat (variasi gerak B5a)"),
    sp("100%", 72.8, 4, peran="R6", kode="T04", gaya="slab", teks_vis="100% FULL AI", sisip="pakai", alasan="slab di belakang kepala + kilat cahaya sekali (DESAIN B6a); 'pakai' tampil sebagai R1 kecil di bawah slab sisi kiri saat diucapkan (Lantai A1), sekaligus penyeimbang 'FULL AI' di kanan"),
    sp("profesional", 78, 1, peran="R4", kode="T09", gaya="bubble", teks_vis="profesional?", sisi="kiri", alasan="bubble pilihan kiri wajah (DESAIN B6b)"),
    sp("masih", 79.5, 3, peran="R4", kode="T09", gaya="bubble", teks_vis="masih kerasa AI?", sisi="kanan", alasan="bubble pilihan kanan wajah (DESAIN B6b)"),
    sp("skill", 82, 2, peran="R2", kode="T03", gaya="r2", alasan="kata kunci hadiah"),
]

# ---- posisi R1 menurut adegan (pusat teks, px). Wajah: kepala di x 36-64 % y 8-62 %, dada di bawahnya. ----
def r1_pos(t):
    if DUNIA:   # adegan layar penuh: teks di pita bawah jendela, menempel subjek (jendela / karakter), tinta gelap di permukaan terang
        if T["akhirnya"] <= t < T["b1b"]: return [760, 1000], True
        if T["b3a"] - 0.1 <= t < T["gimana"] - 0.1: return [760, 1000], True
        if T["b5b"] - 0.4 <= t < T["sini_e"]: return [960, 92], False
    if T["b6b"] <= t: return [960, 690], False
    if T["b1b"] <= t < T["b2a"]: return [1090, 770], False        # B1b: geser kanan, Clawd di kiri menyisakan jarak >= 24 px
    if not DUNIA:
        if T["b4b"] <= t < T["gitu_b4"] + 0.1: return [700, 790], False
        return [960, 770], False
    if t < T["akhirnya"]:               return [960, 770], False         # B1 kamar
    if t < T["b1b"]:                    return [1250, 250], True         # B1 dunia repo (terang)
    if t < T["b2a"]:                    return [960, 770], False
    if t < T["b3a"]:                    return [960, 770], False
    if t < T["gimana"]:                 return [760, 205], True          # B3 aplikasi Claude (terang)
    if t < T["b4a"]:                    return [960, 770], False
    if t < T["b4b"]:                    return [1090, 770], False        # B4a: wajah sedikit kiri, pintu biru berat di kiri -> narasi ke dada kanan
    if t < T["gitu_b4"] + 0.1:          return [700, 790], False         # B4b: kartu di kanan (dinding kosong), narasi di dada kiri
    if t < T["kayak"]:                  return [960, 770], False
    if t < T["b5b"]:                    return [960, 770], False
    if t < T["sini_e"]:                 return [960, 985], True          # B5b: bawah, antara dua jendela
    return [960, 770], False


POS_KHUSUS = {   # pusat blok khusus; nilai dari DESAIN per adegan (kunci dicocokkan tanpa tanda baca)
    "finally": [454, 540], "selesai": [1235, 330], "ChatGPT,": [1450, 735], "Claude,": [480, 415], "Gemini.": [1636, 290],
    "template.": [760, 1000], "ngebalik.": [760, 1000], "AI slop.": [960, 420], "workflow-nya": [960, 380],
    "balik modal": [960, 400], "100% full pakai AI.": [960, 380], "putus-putus.": [1080, 800],
    "habis banget": [700, 790], "20 kali": [1520, 360], "5 kali": [1590, 740], "kesalahan": [960, 92], "loop pembelajaran": [960, 92],
    "viral": [1480, 250], "profesional": [400, 815], "masih kerasa AI?": [1520, 815], "skill gratis": [960, 690],
    "lintas agent.": [960, 770],
}


POS_N = {W.nrm(k): v for k, v in POS_KHUSUS.items()}

# ---- busur cincin (koordinat frame penuh) ----
ARCH = [(150, 1010), (40, 390), (430, 195), (900, 195), (1370, 195), (1800, 390), (1690, 1010)]
ARCH_D = "M150 1010 C40 390 430 195 900 195 C1370 195 1800 390 1690 1010"
RING = {"workflow": dict(mulai=4.0, geser=2.0, size=150), "AI model": dict(mulai=33.0, geser=1.5, size=146),
        "decision": dict(mulai=60.5, geser=1.5, size=150)}


def arch_pts(n=400):
    pts = []
    for seg in range(2):
        p0, p1, p2, p3 = ARCH[seg * 3: seg * 3 + 4]
        for k in range(n // 2):
            u = k / (n // 2)
            x = (1 - u) ** 3 * p0[0] + 3 * (1 - u) ** 2 * u * p1[0] + 3 * (1 - u) * u * u * p2[0] + u ** 3 * p3[0]
            y = (1 - u) ** 3 * p0[1] + 3 * (1 - u) ** 2 * u * p1[1] + 3 * (1 - u) * u * u * p2[1] + u ** 3 * p3[1]
            pts.append((x, y))
    pts.append(ARCH[-1])
    return pts


def arch_at(pct):
    pts = arch_pts(); L = [0.0]
    for a, b in zip(pts, pts[1:]):
        L.append(L[-1] + ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) ** .5)
    target = L[-1] * pct / 100
    for k in range(1, len(L)):
        if L[k] >= target:
            return [round(pts[k][0]), round(pts[k][1])], L[-1]
    return [round(pts[-1][0]), round(pts[-1][1])], L[-1]


def onset(k):
    return U[k]["s"] + 2 / FPS


def rechunk(blocks):
    """Audit ronde 2 (V7/V8): kata terakhir blok R1 harus tampil utuh >= 0,30 dtk sebelum blok berikutnya (tidak ada kilatan 1 frame dan blok bertumpuk).
    Bila tidak: kata terakhir dipindah ke depan blok berikutnya (maks 3 kata) atau blok satu kata digabung ke blok berikutnya."""
    changed = True
    while changed:
        changed = False
        for a, b in zip(blocks, blocks[1:]):
            if a["peran"] != "R1" or b["peran"] != "R1" or a["kata"][1] + 1 != b["kata"][0]: continue
            wa, wb = a["teks"].split(), b["teks"].split()
            if b["t"] - onset(a["kata"][1]) >= 0.30: continue
            end_b = b["t"] + b["dur"]
            if len(wa) == 1 and len(wb) < 3:
                b["teks"] = a["teks"] + " " + b["teks"]; b["kata"] = [a["kata"][0], b["kata"][1]]; b["t"] = a["t"]; b["dur"] = round(end_b - a["t"], 3)
                blocks.remove(a); changed = True; break
            if len(wa) > 1 and len(wb) < 3:
                k = a["kata"][1]
                a["teks"] = " ".join(wa[:-1]); a["kata"] = [a["kata"][0], k - 1]
                b["teks"] = wa[-1] + " " + b["teks"]; b["kata"] = [k, b["kata"][1]]; b["t"] = onset(k)
                a["dur"] = round(b["t"] - a["t"], 3); b["dur"] = round(end_b - b["t"], 3); changed = True; break
    return blocks


def bangun():
    carve = {}
    for s_ in SPEK:
        carve[s_["i"]] = s_
    blocks, i = [], 0
    while i < len(U):
        if i in carve:
            s_ = carve[i]
            ws = U[i:i + s_["n"]]
            b = plan(ws, FPS, 9)[0]                 # satu blok utuh (maks-kata longgar), waktu mengikuti rumus teks_plan
            b = dict(b); b["kata"] = [i, i + s_["n"] - 1]; b["teks"] = " ".join(w["w"] for w in ws)
            for key in ("peran", "kode", "gaya", "alasan", "gelap", "teks_vis", "sisi", "warna", "sisip"):
                if key in s_: b[key] = s_[key]
            blocks.append(b); i += s_["n"]
        else:
            j = i
            while j < len(U) and j not in carve:
                j += 1
            run = plan(U[i:j], FPS, 3)
            for b in run:
                b["kata"] = [b["kata"][0] + i, b["kata"][1] + i]
                b["peran"], b["kode"], b["gaya"] = "R1", "T19", "r1"
                b["alasan"] = "narasi berjalan, tempo cepat: word-pop ikut VO"
                blocks.append(b)
            i = j
    blocks.sort(key=lambda b: b["t"])
    rechunk(blocks)
    # tidak bertabrakan: akhir blok <= awal blok berikutnya (kt_check A8)
    for a, b in zip(blocks, blocks[1:]):
        if a["t"] + a["dur"] > b["t"]:
            a["dur"] = round(max(0.1, b["t"] - a["t"]), 3)
    for b in blocks:   # blok narasi tidak boleh melewati awal dunia B5b (teks putih di bawah jendela putih): selesai saat push-through mendarat (audit V10)
        if b["peran"] == "R1" and b["t"] < T["lihat_e"] < b["t"] + b["dur"] - 0.001:
            b["dur"] = round(T["lihat_e"] - b["t"], 3)
    blocks[-1]["dur"] = round(min(blocks[-1]["dur"], waktu_akhir() - blocks[-1]["t"]), 3)
    for n, b in enumerate(blocks):
        b["id"] = f"T{n + 1:03d}"
        pos, gelap = r1_pos(b["t"])
        if b["peran"] == "R1":
            b["pos"], b["gelap"] = pos, gelap
        elif b["gaya"] == "busur":
            r = RING[b["teks"]]
            b["pos"] = arch_at(r["mulai"] + 8)[0]
        else:
            b["pos"] = POS_N.get(W.nrm(b["teks"]), pos)
            if DUNIA and b["teks"] == "selesai": b["pos"] = [1010, 212]
            if not DUNIA and b["teks"] in ("selesai", "template.", "ngebalik.", "kesalahan", "loop pembelajaran"):
                b["pos"] = [960, 770]
            b.setdefault("gelap", gelap if b["gaya"] in ("r2", "r3") and DUNIA else False)
            if not DUNIA: b["gelap"] = False
        b["t"] = round(b["t"], 3)
    return blocks


def waktu_akhir():
    return W.DURASI


if __name__ == "__main__":
    bl = bangun()
    json.dump(bl, open(os.path.join(P, "teks.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(len(bl), "blok ->", os.path.join(P, "teks.json"))
