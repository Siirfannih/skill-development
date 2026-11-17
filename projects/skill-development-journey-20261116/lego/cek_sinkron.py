#!/usr/bin/env python3
"""Cek sinkron KT/Bubble/Coretan (D-402/D-405, kartu 83). Dari lego/lego.json + lego/lapisan*.json + teks.json + words.
Keluar 1 bila gagal: (i) mulai < onset-0,02 · (ii) mulai > onset+0,12 (+0,25 bila onset jatuh di wipe) · (iii) lapisan melintasi potongan adegan (kecuali gelapAt) · (iv) dua blok jalur narasi tampil bersamaan > 0 f ·
(v) narasi berakhir sebelum akhir kata terakhir-0,02 tanpa potongan · (vi) props/kode KT masih memuat keluar pudar · (vii) narasi yang onsetnya jatuh di dalam transisi wipe (lingkaran menyusut/tumbuh, dunia masuk; W.WIPE) harus ditunda sampai wipe menutup frame, maks 0,25 dtk
(ix) narasi berakhir paling lambat saat komentar IG/lapisan Komentar yang membawa kalimat berikutnya muncul (onset + 2 f)
(a) lapisan berurutan tanpa celah/tumpang tindih >= 1 frame master (jalur narasi) dan bubble/T018 berakhir tepat di frame cut decision · (b) dunia opaque D_RELAY tanpa lompatan antar-frame di 24 frame terakhir
(c) master_tampil.json (cek_master.py: compose yang sama, kotak penanda per lapisan) = rencana frame, tidak ada lapisan di frame cut
(viii) coretan/tulisan tangan tampil >= 0,25 + 0,3 x jumlah kata sejak mulai (pengecualian jalur: coretan di bawah panel IG bukan jalur narasi pita hitam).
  ~/work/mg-venv/bin/python lego/cek_sinkron.py"""
import json, os, re, sys
import waktu as W
P, U, FPSO, FPS = W.P, W.U, 30000 / 1001, 30
LANE_Y = 700
props, lego = {}, {}
for f in ("lego/lapisan.json", "lego/lapisan_opaque.json"):
    for e in json.load(open(os.path.join(P, f))): props[e["id"]] = e; lego[e["id"]] = e
WANT = json.load(open(os.path.join(P, "lego/tampil_rencana.json")))
teks = {b["id"]: b for b in json.load(open(os.path.join(P, "teks.json"), encoding="utf-8"))}
gagal = []
rows = []


def potong_dekat(t):
    return min(W.POTONG, key=lambda p: abs(p[0] - t))


def catat(id_, jenis, tx, mulai, akhir, kata0, kata1, gelap=False):
    on = U[kata0]["s"]; ak_kata = U[kata1]["e"]
    pd = potong_dekat(mulai if mulai > 0 else akhir)
    rows.append((id_, jenis, tx, mulai, akhir, on, ak_kata, pd))
    if mulai < on - 0.02: gagal.append(f"(i) {id_} '{tx}': mulai {mulai:.3f} < onset {on:.3f}-0,02")
    on2 = on + 2 / FPS
    di_wipe = any(a + 1e-6 < on2 < b - 1e-6 for a, b, _ in W.WIPE)
    if jenis in ("r1", "r2", "r3", "putus") and di_wipe:
        a, b, nm = next(w for w in W.WIPE if w[0] + 1e-6 < on2 < w[1] - 1e-6)
        if mulai < min(b, on2 + W.TUNDA_MAKS) - 0.035: gagal.append(f"(vii) {id_} '{tx}': onset {on2:.3f} di dalam wipe '{nm}' {a:.3f}-{b:.3f}, mulai {mulai:.3f} belum ditunda (>= {min(b, on2 + W.TUNDA_MAKS):.3f})")
    if mulai > on + 0.12 + (W.TUNDA_MAKS if di_wipe else 0):
        gagal.append(f"(ii) {id_} '{tx}': mulai {mulai:.3f} > onset {on:.3f}+0,12")
    for p, nm in W.POTONG:
        if gelap and nm == "masuk dunia repo": continue
        if mulai < p - 0.5 / FPSO and akhir > p + 0.5 / FPSO: gagal.append(f"(iii) {id_} '{tx}': {mulai:.3f}-{akhir:.3f} melintasi potongan '{nm}' {p:.3f}")


def pertama(b):
    """indeks kata pertama yang benar-benar tampil (kata yang dibuang karena sudah ada di UI tidak dihitung)"""
    if not b.get("buang"): return b["kata"][0]
    return next(k for k in range(b["kata"][0], b["kata"][1] + 1) if W.nrm(U[k]["w"]) not in b["buang"])


lane = []
for id_, l in lego.items():
    pr = props.get(id_)
    if not pr: continue
    p = pr["props"]; b = teks.get(id_)
    if pr["comp"] in ("KT", "Bubble", "Coretan") and id_ in WANT:      # R4b: tampil di master = rencana frame (lego/tampil_rencana.json), t/durasi di JSON sudah dikalibrasi cek_master
        S_, E_ = WANT[id_]; l = dict(l, t=S_ / FPSO); pr = dict(pr, durasi=(E_ - S_) / FPSO)
    elif pr["comp"] in ("KT", "Bubble", "Coretan"): pr = dict(pr, durasi=pr["durasi"] - 1 / FPS)
    if pr["comp"] == "KT" and b:
        t0 = l["t"]; t1 = t0 + pr["durasi"]
        catat(id_, p["gaya"], p["teks"], t0, t1, pertama(b), b["kata"][1], gelap=b.get("gelapAt") is not None)
        y = l["y"] + p["h"] / 2
        if p["gaya"] in ("r1", "r2", "r3", "putus"):
            if "keluarAt" in p or p.get("gulir"): gagal.append(f"(vi) {id_}: props memuat keluar pudar (keluarAt/gulir) pada gaya {p['gaya']}")
            if y >= LANE_Y and not b.get("tahan"):
                lane.append((id_, p["teks"], t0, t1, U[b["kata"][1]]["e"], WANT[id_][0], WANT[id_][1]) if id_ in WANT else (id_, p["teks"], t0, t1, U[b["kata"][1]]["e"], round(t0 * FPSO), round(t0 * FPSO) + round(pr["durasi"] * FPS)))
        elif "keluarAt" in p and abs(p["keluarAt"] + 6 / FPS - props[id_]["durasi"]) > 1e-3: gagal.append(f"(vi) {id_}: hero keluar bukan mask 6 f (keluarAt + 6 f harus = durasi) (keluarAt {p['keluarAt']} durasi {pr['durasi']})")
    elif pr["comp"] == "Bubble":
        nm = id_.split("_")[1]; k = {"Codex": 22, "Clawd": 23, "Gemini": 24}[nm]
        catat(id_, "bubble", " ".join(s["t"] for r in p["baris"] for s in r), l["t"], l["t"] + pr["durasi"], k, k)
        if abs(l["t"] + pr["durasi"] - W.T["decision"]) > 1 / FPS + 1e-3: gagal.append(f"(vi) {id_}: bubble tidak berakhir di cut decision ({l['t'] + pr['durasi']:.3f} vs {W.T['decision']:.3f})")
    elif pr["comp"] == "Coretan":
        k0 = p.get("kata0"); b2 = teks.get(id_)
        catat(id_, "coretan", "panah" if "panah" in p else "tulisan", l["t"], l["t"] + pr["durasi"], k0, k0)
    elif pr["comp"] == "DuniaIG" and p.get("coret"):
        c = p["coret"]; wi = lego[id_]["t"]; kc = c["kata0"]
        catat("IG_tulisan", "tulisan-tangan", " ".join(k["t"] for k in c["tulis"]["kata"]), wi + c["awal"], wi + c["akhir"], kc, kc + 2)
        catat("IG_panah", "coretan", "panah", wi + c["panah"]["at"], wi + c["akhir"], c["panahKata"], c["panahKata"])
        if wi + c["akhir"] - (wi + c["awal"]) < 0.25 + 0.3 * 3 - 0.02: gagal.append(f"(viii) IG_tulisan: tampil {c['akhir'] - c['awal']:.3f} dtk < {0.25 + 0.9:.2f}")
# habis banget (hero) dihitung bersama jalur hanya sebagai pengganti 'Ini'; jalur narasi = lane
lane.sort(key=lambda r: r[2])
for a, b in zip(lane, lane[1:]):
    ov = min(a[3], b[3]) - max(a[2], b[2])
    if ov > 0.5 / FPSO: gagal.append(f"(iv) {a[0]} '{a[1]}' & {b[0]} '{b[1]}' tampil bersamaan {ov * FPSO:.1f} f")
for id_, tx, t0, t1, ak_kata, *_ in lane:
    if t1 < ak_kata - 0.02 and not any(abs(t1 - p) < 0.045 for p, _ in W.POTONG):
        gagal.append(f"(v) {id_} '{tx}': berakhir {t1:.3f} < akhir kata {ak_kata:.3f}-0,02 tanpa potongan adegan")
# (a) lapisan berurutan di jalur yang sama tidak boleh punya celah >= 1 frame master (atau tumpang tindih) bila tidak ada potongan/pembawa di antaranya
for a, b in zip(lane, lane[1:]):
    ada_potong = any(a[3] - 0.04 <= p <= b[2] + 0.04 for p, _ in W.POTONG)
    if b[2] - a[4] < 0.6 and not ada_potong and b[5] != a[6]:
        gagal.append(f"(a) {a[0]} '{a[1]}' berakhir f{a[6]} tetapi {b[0]} '{b[1]}' mulai f{b[5]}: celah/tumpang tindih {b[5] - a[6]} frame master")
# (a2) bubble dan blok yang berakhir di cut decision harus berakhir TEPAT di frame cut (tidak ada frame kosong sebelum cut)
cut_n = round(W.T["decision"] * FPSO)
for id_ in [i for i in props if i.startswith("B_")] + ["T018"]:
    if id_ in props:
        e_n = WANT[id_][1]
        if e_n != cut_n: gagal.append(f"(a) {id_}: berakhir f{e_n}, cut decision f{cut_n}")
# (b) lompatan skala/posisi dunia opaque: D_RELAY (dorong keluar ke cut meja 3D) tidak boleh melonjak antar-frame
def _gray(path, a, b):
    import subprocess, numpy as np
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vf", f"select='between(n,{a},{b})',scale=240:135", "-vsync", "0", "-f", "rawvideo", "-pix_fmt", "gray", "-"], capture_output=True).stdout
    n = len(raw) // (240 * 135)
    return np.frombuffer(raw, np.uint8).reshape(n, 135, 240).astype(float)
if "D_RELAY" in props:
    pr = props["D_RELAY"]["props"]; src = [e for e in json.load(open(os.path.join(P, "lego/lego.json")))["lapisan"] if e["id"] == "D_RELAY"][0]["src"]
    tot = round(props["D_RELAY"]["durasi"] * FPS); akhir_dunia = tot - pr["post"] - 1
    fr = _gray(os.path.join(P, "lego", src), akhir_dunia - 24, akhir_dunia)
    d = [abs(fr[i] - fr[i - 1]).mean() for i in range(1, len(fr))]
    for i, v in enumerate(d):
        lompat = v > 8 or (v > 4 and i > 0 and v > 1.8 * d[i - 1])
        if lompat: gagal.append(f"(b) D_RELAY frame {akhir_dunia - 23 + i}: lompatan antar-frame {v:.1f} (sebelumnya {d[i - 1] if i else 0:.1f})")
    print(f"D_RELAY 24 frame terakhir dunia: selisih antar-frame maks {max(d):.1f}")
for pk, kk_ in (("k1", "masih kerasa AI slop"), ("k2", "Keren editan profesional")):
    if "D_IG" in props:
        tp = lego["D_IG"]["t"] + props["D_IG"]["props"]["kunci"][pk]
        for id_, tx, t0, t1, ak_kata, *_ in lane:
            if t0 < tp and t1 > tp + 2 / FPS + 0.02: gagal.append(f"(ix) {id_} '{tx}': masih tampil sampai {t1:.3f}, komentar IG '{kk_}' sudah muncul di {tp:.3f}")
# (c) MASTER: hasil `cek_master.py --ulang` (compose yang sama dengan lapisan = kotak penanda) harus sama dengan rencana frame, dan tidak ada lapisan dari adegan sebelumnya di frame cut
mp = os.path.join(P, "qc/r4/log/master_tampil.json")
if not os.path.exists(mp): gagal.append("(c) master_tampil.json belum ada: jalankan lego/cek_master.py --ulang")
else:
    if os.path.getmtime(mp) < os.path.getmtime(os.path.join(P, "lego/lego.json")): gagal.append("(c) master_tampil.json lebih tua dari lego.json: jalankan ulang lego/cek_master.py --ulang")
    mt = json.load(open(mp))
    if set(mt) != set(WANT): gagal.append("(c) master_tampil.json basi (daftar lapisan beda dengan tampil_rencana.json): jalankan lego/cek_master.py --ulang"); mt = {}
    for id_, o in mt.items():
        if o != WANT.get(id_): gagal.append(f"(c) {id_}: master f{o[0]}-{o[1]} != rencana f{WANT.get(id_)}")
    for p_, nm_ in W.POTONG:
        c_ = round(p_ * FPSO)
        for id_, o in mt.items():
            if o[0] is not None and WANT[id_][1] <= c_ < o[1]: gagal.append(f"(c) {id_} masih tampil di frame cut '{nm_}' f{c_}")
    print(f"(c) master: {len(mt)} lapisan teks/bubble/coretan tampil persis sesuai rencana frame di master hasil compose")
kt_src = open(os.path.join(P, "remotion/src/video/bersama/KT.tsx"), encoding="utf-8").read()
if "gayaKeluar" in kt_src: gagal.append("(vi) KT.tsx masih memuat gayaKeluar (keluar pudar)")
print(f"{'id':12} {'jenis':14} {'teks':28} {'mulai':>7} {'akhir':>7} {'onset':>7} {'akhirKata':>9}  potongan terdekat")
for r in sorted(rows, key=lambda r: r[3]):
    print(f"{r[0]:12} {r[1]:14} {r[2][:27]:28} {r[3]:7.3f} {r[4]:7.3f} {r[5]:7.3f} {r[6]:9.3f}  {r[7][1]} {r[7][0]:.3f}")
for g in gagal: print("GAGAL " + g)
print(f"{len(rows)} lapisan diperiksa · jalur narasi {len(lane)} blok · " + ("PASS" if not gagal else f"FAIL ({len(gagal)} temuan)"))
sys.exit(1 if gagal else 0)
