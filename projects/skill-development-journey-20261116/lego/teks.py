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
    sp("selesai", 2.5, 1, peran="R6", kode="T04", gaya="slab", teks_vis="SELESAI", depan=True, warna=HIJAU, alasan="kata hero BESAR di DEPAN (Anton, hijau #1A7F37) mengisi area kosong bawah timeline B1 (REVISI-2 R2-4a)"),
    sp("workflow", 6, 1, peran="R6", kode="T04", gaya="busur", alasan="kata cincin besar di busur kepala (DESAIN B1b)"),
    sp("AI", 7.4, 2, peran="R6", kode="T04", gaya="busur", alasan="kata cincin besar di busur kepala (DESAIN B1b)"),
    sp("ChatGPT", 8.5, 1, peran="R2", kode="T03", gaya="r2", sapa="codex", alasan="nama tampil sebagai bubble sapaan tokoh Codex (D-401): tidak ada KT nama"),
    sp("Claude", 9.8, 1, peran="R2", kode="T03", gaya="r2", sapa="claude", alasan="nama tampil sebagai bubble sapaan Clawd (D-401): tidak ada KT nama"),
    sp("Gemini", 10.2, 1, peran="R2", kode="T03", gaya="r2", sapa="gemini", alasan="nama tampil sebagai bubble sapaan Gemini (D-401): tidak ada KT nama"),
    sp("decision", 12, 1, peran="R6", kode="T04", gaya="slab", teks_vis="DECISION", depan=True, alasan="kata hero besar di DEPAN, kotak dada, + push kamera kecil 1,00→1,06 (REVISI-1 B4)"),
    sp("viral", 15, 1, peran="R3", kode="T25", gaya="viral", teks_vis="VIRAL!!", alasan="parodi slop: kata viral berbayang tebal di tumpukan (DESAIN B2a)"),
    sp("AI", 20.5, 2, peran="R6", kode="T04", gaya="slab", teks_vis="AI SLOP", alasan="slab coral di belakang kepala, ruang di-grade (DESAIN B2a)"),
    sp("putus-putus", 22.5, 1, peran="R3", kode="T25", gaya="putus", warna="#FAF8EC", alasan="huruf putih; suku kata muncul terputus, jeda tak rata (DESAIN B2b)"),
    sp("template", 25, 1, peran="R2", kode="T03", gaya="r2", gelap=True, alasan="kata kunci di dekat kolom ketik saat '/' diketik (DESAIN B3a)"),
    sp("ngebalik", 33, 1, peran="R2", kode="T03", gaya="r2", gelap=True, alasan="kata kunci saat daftar terhapus (DESAIN B3b)"),
    sp("workflow-nya", 37.5, 1, peran="R6", kode="T04", gaya="slab", teks_vis="WORKFLOW-NYA", alasan="slab putih hangat di belakang kepala (DESAIN B3b)"),
    sp("balik", 42.5, 2, peran="R6", kode="T04", gaya="slab", teks_vis="BALIK MODAL", alasan="slab di belakang kepala, rima dengan papan Opus B4 (DESAIN B4a)"),
    sp("habis", 43.5, 2, peran="R3", kode="T25", gaya="r3", tahan=0.7, alasan="biaya terkuras: kata kacau/frustrasi, ditahan 0,7 dtk + punch kamera (REVISI-1 B7)"),
    sp("20", 48.5, 2, peran="R2", kode="T03", gaya="kartu", teks_vis="20×", alasan="angka tampil SEBAGAI kartu ChatGPT (20× besar, mendarat di kata ini); tidak ada KT kedua supaya kata tidak dobel (Lantai A3, DESAIN B4b)"),
    sp("5", 51, 2, peran="R2", kode="T03", gaya="kartu", teks_vis="5×", alasan="angka tampil SEBAGAI kartu Claude (5× besar, mendarat di kata ini); tidak dobel (Lantai A3, DESAIN B4b)"),
    sp("kesalahan", 67.5, 1, peran="R2", kode="T03", gaya="r2", alasan="kesalahan berulang yang diminimalkan: kata kacau lalu mendarat (DESAIN B5b)"),
    sp("loop", 70, 2, peran="R2", kode="T03", gaya="r2", alasan="kata kunci saat loop menutup + centang (DESAIN B5b)"),
    sp("lintas", 57, 2, peran="R6", kode="T04", gaya="slab", teks_vis="LINTAS AGENT", tahan=1.1, alasan="kata hero besar di BELAKANG kepala (matte), tahan ±1 dtk (REVISI-1 B9)"),
    sp("100%", 72.8, 4, peran="R6", kode="T04", gaya="slab", teks_vis="100% FULL AI", buang=["pakai"], depan=True, alasan="hero di DEPAN di atas dinding gelap shot meja 3D (Irfan 17 Nov: shot Claude mengedit mulai di kalimat ini); 'pakai' tidak ditampilkan (Irfan 17 Nov)"),
    sp("profesional", 78.3, 1, peran="R3", kode="T25", gaya="r3", ukuran=80, alasan="pertanyaan pertama yang menusuk: kata kacau lalu mendarat (REVISI-2 Opus: perlakuan R3 pindah dari 'masih kerasa AI?' yang kini tampil sebagai komentar IG)"),
    sp("masih", 79.5, 3, peran="R3", kode="T25", gaya="r3", alasan="pertanyaan yang menusuk: kata kacau lalu mendarat; komentar penonton menyusul (REVISI-1 B10)"),
    sp("skill", 82, 1, peran="R2", kode="T03", gaya="r2", alasan="kata kunci hadiah"),
    sp("gratis", 82.4, 1, peran="R2", kode="T03", gaya="tulis", alasan="tulisan tangan kuning + garis bawah goresan (D-406)"),
]

KOREKSI = {86: "Progres", 88: "baliknya", 94: "cuma"}     # ASR ulang 18 Nov: 'Progres di baliknya'; Irfan: 'cuma'

# ---- posisi R1 menurut adegan (pusat teks, px). Wajah: kepala di x 36-64 % y 8-62 %, dada di bawahnya. ----
def r1_pos(t):
    if T["kayak"] - 0.05 <= t < T["lihat_e"] - 0.05: return [960, 950], False      # D-405: 'Kayak yang' tidak di bahu: satu jalur pita bawah, tidak menimpa deret kartu B11
    if T["b4b"] - 0.4 <= t < T["habis"]: return [960, 805], False                 # D-404: 'Pak.' dan 'Ini' di tempat yang SAMA (saling menggantikan)
    if T["b4b"] <= t < T["dua0"] - 0.3: return [960, 930], False                  # B4b awal: rata tengah dada (Irfan 17 Nov), di bawah 'habis banget'
    if T["dua0"] - 0.3 <= t < T["lima"] - 0.3: return [960, 930], False          # kartu ChatGPT di kanan, kiri masih kosong
    if T["lima"] - 0.3 <= t < T["gitu_b4"] + 0.1: return [960, 930], False       # kartu mengapit Irfan (ChatGPT kanan, Claude kiri): narasi di dada bawah, di antara kartu (REVISI-2 R2-4b)
    if DUNIA:   # adegan layar penuh: teks di pita bawah jendela, menempel subjek (jendela / karakter), tinta gelap di permukaan terang
        if T["akhirnya"] <= t < T["b1b"]: return [760, 945], True      # safe zone (Irfan 17 Nov): tepi huruf <= ±990
        if T["b3a"] - 0.1 <= t < T["gimana"] - 0.1: return [760, 945], True
        if T["lihat_e"] - 0.05 <= t < T["sini_e"]:     # B11: KT di pita bawah sejak jentikan (Irfan 17 Nov)
            return [960, 950], False      # REVISI-2 (Opus): papan aktif selalu di tengah -> KT di tengah pita bawah
    if T["udah"] - 0.6 <= t: return [660, 812], False       # pita hitam bawah video postingan IG, putih seperti teks di video (REVISI-1 B10); "Comment di bawah." diatur di bangun()
    if T["b6a"] - 0.1 <= t < T["udah"] - 0.1: return [960, 945], False      # shot meja 3D kini mulai di "Ini 100% full pakai AI" (Irfan 17 Nov)          # B10a: pita bawah meja kerja (lingkaran wajah di kanan)                                # area hitam di bawah video postingan
    if T["b6b"] <= t: return [960, 740], False
    if T["decision"] - 0.05 <= t < T["b2a"] + 0.9: return [960, 735], False                  # DECISION mengisi dada: narasi di atas DECISION dengan jarak (Opus: tidak menempel), di bawah dagu (REVISI-2 R2-4g: bukan kiri atas)
    if 17.9 <= t < 19.6: return [960, 770], False                  # B2: sticker api/emoji kanan (x>1440): narasi geser kiri (cek_tumpuk)
    if 21.0 <= t < 22.3: return [1010, 702], False                 # B2: burst kiri bawah (x<640): narasi geser kanan
    if T["lintas"] - 0.2 <= t < T["lintas"] + 2.4: return [960, 760], False   # LINTAS AGENT: narasi di bahu kanan di bawah AGENT (Opus: balance_check, LINTAS menjauh = ringan di kiri)
    if T["b1b"] <= t < T["b2a"]: return [960, 905], False        # B1b: dada tengah di antara Clawd (bahu kiri) dan Codex (bahu kanan)
    if not DUNIA:
        if T["b4b"] <= t < T["dua0"] - 0.3: return [1300, 790], False
        if T["dua0"] - 0.3 <= t < T["gitu_b4"] + 0.1: return [700, 790], False
        return [960, 770], False
    if t < T["akhirnya"]:               return [960, 770], False         # B1 kamar
    if t < T["b1b"]:                    return [1250, 250], True         # B1 dunia repo (terang)
    if t < T["b2a"]:                    return [960, 770], False
    if t < T["b3a"]:                    return [960, 770], False
    if t < T["gimana"]:                 return [760, 205], True          # B3 aplikasi Claude (terang)
    if t < T["b4a"]:                    return [960, 770], False
    if t < T["b4b"]:                    return [960, 800], False         # B4a rata tengah di dada (Irfan 17 Nov: "terlalu dikanan harusnya rata tengah")
    if t < T["gitu_b4"] + 0.1:          return [960, 930], False         # B4b: kartu di kanan (dinding kosong), narasi di dada kiri
    if t < T["kayak"]:                  return [960, 770], False
    if t < T["b5b"]:                    return [960, 770], False
    if t < T["sini_e"]:                 return [960, 950], True          # B5b: bawah, antara dua jendela
    return [960, 770], False


POS_KHUSUS = {   # pusat blok khusus; nilai dari DESAIN per adegan (kunci dicocokkan tanpa tanda baca)
    "finally": [960, 380], "selesai": [650, 790], "ChatGPT,": [1530, 700], "Claude,": [650, 540], "Gemini.": [1560, 520],
    "template.": [760, 945], "ngebalik.": [760, 945], "AI slop.": [960, 420], "workflow-nya": [960, 380],
    "balik modal": [960, 400], "100% full pakai AI.": [600, 215], "putus-putus.": [1080, 800],
    "habis banget": [950, 810], "20 kali": [1520, 360], "5 kali": [1590, 740], "kesalahan": [960, 950], "loop pembelajaran": [960, 950],
    "viral": [1480, 250], "profesional": [700, 840], "masih kerasa AI?": [620, 812], "skill gratis": [620, 812],
    "lintas agent.": [960, 400], "decision": [960, 860], "skill": [470, 812],
}


POS_N = {W.nrm(k): v for k, v in POS_KHUSUS.items()}

# ---- busur cincin (koordinat frame penuh) ----
ARCH = [(370, 860), (300, 450), (690, 300), (1000, 300), (1310, 300), (1650, 430), (1620, 780)]     # Irfan 17 Nov: garis merah, dekat kepala
ARCH_D = "M370 860 C300 450 690 300 1000 300 C1310 300 1650 430 1620 780"
RING = {"workflow": dict(mulai=13.0, geser=2.0, size=150), "AI model": dict(mulai=56.0, geser=1.5, size=146),     # kiri naik / kanan turun, kepala di tengah
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
    L = lambda b: 2 if (T["b2a"] - 0.5 <= b["t"] < T["putus"] + 0.2 or T["b4b"] <= b["t"] < T["dua0"]) else 3      # B2: maks 2 kata (slop di sudut)
    changed = True
    while changed:
        changed = False
        for a, b in zip(blocks, blocks[1:]):
            if a["peran"] != "R1" or b["peran"] != "R1" or a["kata"][1] + 1 != b["kata"][0]: continue
            wa, wb = a["teks"].split(), b["teks"].split()
            if b["t"] - onset(a["kata"][1]) >= 0.30: continue
            end_b = b["t"] + b["dur"]
            if len(wa) == 1 and len(wb) < L(b):
                b["teks"] = a["teks"] + " " + b["teks"]; b["kata"] = [a["kata"][0], b["kata"][1]]; b["t"] = a["t"]; b["dur"] = round(end_b - a["t"], 3)
                blocks.remove(a); changed = True; break
            if len(wa) > 1 and len(wb) < L(b):
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
            for key in ("peran", "kode", "gaya", "alasan", "gelap", "teks_vis", "sisi", "warna", "sisip", "ukuran", "tahan", "depan", "buang", "sapa"):
                if key in s_: b[key] = s_[key]
            blocks.append(b); i += s_["n"]
        else:
            j = i
            while j < len(U) and j not in carve:
                j += 1
            # B2 (tumpukan slop di sudut bawah): blok narasi maks 2 kata supaya tidak menyentuh slop (R1 kini 84 px, REVISI-2 R2-4e)
            mw = lambda k: 2 if (T["b2a"] - 0.5 <= U[k]["s"] < T["putus"] + 0.2 or T["b4b"] <= U[k]["s"] < T["dua0"]) else 3
            a0 = i
            while a0 < j:
                a1 = a0
                while a1 < j and mw(a1) == mw(a0): a1 += 1
                for b in plan(U[a0:a1], FPS, mw(a0)):
                    b["kata"] = [b["kata"][0] + a0, b["kata"][1] + a0]
                    b["peran"], b["kode"], b["gaya"] = "R1", "T19", "r1"
                    b["alasan"] = "narasi berjalan, tempo cepat: word-pop ikut VO"
                    blocks.append(b)
                a0 = a1
            i = j
    blocks.sort(key=lambda b: b["t"])
    # Lantai A3 / REVISI-2 R2-4d: kata yang sudah tampil di UI aplikasi Claude (B3a) tidak boleh tampil lagi sebagai KT
    blocks = [b for b in blocks if not (b["peran"] == "R1" and T["b3a"] <= b["t"] < T["gimana"] and any(k in W.nrm(b["teks"]) for k in ("apple", "cinematic", "storytelling")))]
    # Lantai A3 / REVISI-2 (Opus): komentar IG "masih kerasa AI slop" (UI, urutan Irfan REVISI-1 B10) lahir tepat di "masih" -> KT "masih kerasa AI?" tidak diulang (GANDA KT-vs-UI)
    blocks = [b for b in blocks if not (T["masih2"] - 0.3 <= b["t"] < T["masih2"] + 0.6 and W.nrm(b["teks"]).startswith("masihkerasa"))]
    rechunk(blocks)
    # Irfan 17 Nov: dunia agen masuk di jentikan -> blok narasi yang menyeberanginya dipecah di kata pertama sesudah jentikan
    hasil = []
    for b in blocks:
        ks = list(range(b["kata"][0], b["kata"][1] + 1))
        cut = next((n for n, k in enumerate(ks) if n > 0 and U[k]["s"] >= T["lihat_e"] - 0.02), None)
        if b["peran"] == "R1" and b["t"] < T["lihat_e"] and cut is not None:
            ws = b["teks"].split(); end = b["t"] + b["dur"]
            b2 = dict(b, teks=" ".join(ws[cut:]), kata=[ks[cut], b["kata"][1]], t=round(onset(ks[cut]), 3))
            b2["dur"] = round(end - b2["t"], 3)
            b["teks"] = " ".join(ws[:cut]); b["kata"] = [b["kata"][0], ks[cut - 1]]; b["dur"] = round(b2["t"] - b["t"], 3)
            hasil += [b, b2]
        else:
            hasil.append(b)
    blocks = hasil
    # Lantai A3 / REVISI-2 R2-4d: nama agen sudah tampil di label B11 (UI) -> tidak boleh diulang sebagai KT; kata itu dibuang dari blok R1 (suara tetap menyebutnya)
    hasil = []
    for b in blocks:
        if b["peran"] == "R1" and T["b5b"] - 0.5 <= b["t"] < T["sini_e"]:
            ws = b["teks"].split(); ada = b["kata"][0] <= 169 <= b["kata"][1] and len(ws) == b["kata"][1] - b["kata"][0] + 1       # R5/B1: "ChatGPT" (kata 169, "Bahkan ChatGPT dengan session...") diucapkan sebagai subjek dan WAJIB tampil
            keep = [k for k, w in enumerate(ws) if W.nrm(w) not in ("chatgpt", "claude", "session") or (ada and b["kata"][0] + k == 169)]
            end = b["t"] + b["dur"]
            if len(keep) != len(ws):
                if not keep: continue
                b["buang"] = ["claude", "session"] if ada else ["chatgpt", "claude", "session"]
                b["teks"] = " ".join(ws[k] for k in keep)
                b["t"] = max(b["t"], onset(b["kata"][0] + keep[0]) - 0.05); b["dur"] = round(end - b["t"], 3)
            if ada and b["kata"] == [168, 170]:       # "Bahkan ChatGPT" lalu "dengan" (blok terpisah, onset per kata)
                b2 = dict(b, teks="dengan", kata=[170, 170], t=round(onset(170), 3)); b2.pop("buang", None)
                b2["dur"] = round(end - b2["t"], 3)
                b["teks"] = "Bahkan ChatGPT"; b["kata"] = [168, 169]; b["dur"] = round(b2["t"] - b["t"], 3); b.pop("buang", None)
                hasil.append(b); hasil.append(b2); continue
        hasil.append(b)
    blocks = hasil
    # tidak bertabrakan: akhir blok <= awal blok berikutnya (kt_check A8)
    for a, b in zip(blocks, blocks[1:]):
        if a["t"] + a["dur"] > b["t"]:
            a["dur"] = round(max(0.1, b["t"] - a["t"]), 3)
    for b in blocks:   # blok narasi tidak boleh melewati awal dunia B5b (teks putih di bawah jendela putih): selesai saat push-through mendarat (audit V10)
        if b["peran"] == "R1" and b["t"] < T["lihat_e"] < b["t"] + b["dur"] - 0.001:
            b["dur"] = round(T["lihat_e"] - b["t"], 3)
    blocks[-1]["dur"] = round(min(blocks[-1]["dur"], waktu_akhir() - blocks[-1]["t"]), 3)
    for b in blocks:      # D-402/D-403: peta koreksi visual (indeks kata -> teks tampil); words.json tidak diubah
        ws = b["teks"].split()
        if b["peran"] == "R1" and len(ws) == b["kata"][1] - b["kata"][0] + 1:
            b["teks"] = " ".join(KOREKSI.get(b["kata"][0] + k, w) for k, w in enumerate(ws))
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
            if DUNIA and b["teks"] == "selesai": b["pos"] = [740, 790]
            if not DUNIA and b["teks"] in ("selesai", "template.", "ngebalik.", "kesalahan", "loop pembelajaran"):
                b["pos"] = [960, 770]
            b.setdefault("gelap", gelap if b["gaya"] in ("r2", "r3") and DUNIA else False)
            if not DUNIA: b["gelap"] = False
        if b["teks"].startswith("Comment") and b["t"] > T["udah"]:     # menempel di bawah kolom "Add a comment…" postingan IG, tinta gelap di halaman putih (REVISI-1 B10)
            b["pos"], b["gelap"] = [1380, 945], True
            b["coret"] = "ig"
        if b["peran"] == "R1" and T["akhirnya"] - 0.05 <= b["t"] < T["akhirnya"] + 0.6:     # E9: lahir saat lingkaran masih menyusut di atas footage -> putih dulu, lalu tinta
            b["gelapAt"] = round(max(0.0, T["dunia1"] + 0.33 - b["t"]), 3)
        b["t"] = round(b["t"], 3)
    return blocks


def waktu_akhir():
    return W.DURASI


if __name__ == "__main__":
    bl = bangun()
    json.dump(bl, open(os.path.join(P, "teks.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(len(bl), "blok ->", os.path.join(P, "teks.json"))
