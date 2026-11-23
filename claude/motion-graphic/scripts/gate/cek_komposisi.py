#!/usr/bin/env python3
"""Gerbang komposisi data episode sebelum build dan sebelum render final (fail-closed).

  python3 cek_komposisi.py <episode.json> [<episode2.json> ...] --public <folder public/> [--ketat] [--blok WAJAH,TEPI]
                           [--font-tebal <file>] [--font-sedang <file>]

Masukan: JSON episode ({durasi, adegan:[{id, dari, sampai, lapisan:[...], masuk?, invert?}], kt:[{peran, dari, sampai, x, y,
teks|kata, jangkar?, ukuran?}], sub?:[...]}) dan folder public/ berisi <folder aset>/aset.json (kotak wajah per aset, dari
pre-processor aset) serta fonts/. Kanvas 1920x1080 kecuali episode memuat "lebar"/"tinggi".

Tanda yang MEMBLOKIR (exit 1) secara bawaan:
  WAJAH   kotak KT beririsan dengan kotak wajah pada lapisan jangkar/gambar/video di bawahnya, diukur di awal, tengah,
          dan akhir tampilnya KT dengan geometri kamera yang sama dengan komponen Remotion
  INSET   inset < 30 % layar di atas kanvas/kartu polos (kotak kecil di ruang kosong)
  TEPI    kotak KT keluar dari zona aman (x 6,25-93,75 % lebar, y 9,3-86,6 % tinggi)
  ASET    lapisan footage tanpa entri di aset.json: wajah tidak bisa dicek, jadi dianggap gagal
Tanda lain dicetak sebagai PERINGATAN, dan ikut memblokir dengan --ketat (format story-doc memakainya):
  NAPAS   jarak antar kanvas napas (kanvas solid + KT napas/giant) > 10,5 dtk
  POTONG  < 3 jenis tata potong di 15 dtk pertama (potong, whip, grid, putih, invert)
  KARTU   lebih dari 2 kanvas napas berurutan yang identik (warna, peran, dan ukuran KT sama)
  JEDA    kanvas/kartu polos tanpa KT yang tampil dalam 0,3 dtk setelah potong (layar kosong); adegan yang memang
          dirancang kosong diberi "jeda_sengaja": "<alasan>"
  PITA    baris subtitle (sub) tampil bersamaan dengan KT (dua lapisan teks)
  LOGO    KT menumpuk area ramai (logo, papan nama, tulisan besar) yang ditandai "ramai": [[x, y, w, h], ...] ternormal
          di aset.json, tanpa latar diredam (grade dalam/blurkuat)
  JAUH / RATA / KECIL / TEKSTUR   kedekatan dan arah rata KT terhadap subjek, teks kecil sendirian, teks di atas tekstur
Lebar teks diukur dengan file font yang dipakai render (PIL), bukan ditebak; font tidak ditemukan = gagal.
Keluar: 0 bersih · 1 ada tanda yang memblokir, font/aset.json tidak ada, atau JSON tidak terbaca.
"""
import argparse, json, math, os, sys
from functools import lru_cache

W, H = 1920, 1080
PUB = ""
FONT = {"tebal": "fonts/HelveticaNeueBold.otf", "sedang": "fonts/HelveticaNeueMedium.otf"}
BLOK = ("WAJAH", "INSET", "TEPI", "ASET")
UK = {"r1": 96, "lead": 80, "r2": 124, "r6": 210, "giant": 520, "kotak": 96, "napas": 220}
LH = {"r1": 1.02, "lead": 1.02, "r2": 0.92, "r6": 0.92, "giant": 0.8, "kotak": 1.3, "napas": 0.94}


class Gagal(Exception):
    pass


@lru_cache(None)
def font(size, bold):
    from PIL import ImageFont
    p = FONT["tebal" if bold else "sedang"]
    p = p if os.path.isabs(p) else os.path.join(PUB, p)
    if not os.path.exists(p):
        raise Gagal(f"font tidak ditemukan: {p} (lebar teks tidak bisa diukur; beri --font-tebal/--font-sedang)")
    return ImageFont.truetype(p, size)


@lru_cache(None)
def aset(folder):
    p = os.path.join(PUB, folder, "aset.json")
    return json.load(open(p)) if os.path.exists(p) else {}


def kotak_kt(k):
    size = k.get("ukuran") or UK[k["peran"]]; bold = k["peran"] != "lead"
    if k.get("kata"):
        baris = {}
        for x in k["kata"]:
            baris.setdefault(x.get("baris", 0), []).append(x["w"])
        lines = [" ".join(v) for _, v in sorted(baris.items())]
    elif k["peran"] == "giant":
        a = k.get("angka", {}); lines = ["00:00" if a.get("format") == "jam" else "$30,000" if a.get("format") == "usd" else "0:00" if a.get("format") == "detik" else "8888"]
    else:
        lines = (k.get("teks") or "").split("\n")
    ls = {"lead": -0.015, "r1": -0.022, "kotak": -0.022, "r2": -0.03, "r6": -0.04, "giant": -0.06, "napas": -0.045}[k["peran"]]
    w = max(font(size, bold).getlength(s) * (1 + ls) for s in lines) + (0.6 * size if k["peran"] == "kotak" else 0)
    h = len(lines) * size * LH[k["peran"]] + (0.28 * size if k["peran"] == "kotak" else 0)
    j = k.get("jangkar", "kiri")
    x0 = k["x"] - (w / 2 if j == "tengah" else w if j == "kanan" else 0)
    return (x0, k["y"], w, h)


def pegas(dt, fps=30):
    """pendekatan respons pegas Remotion (damping 26, stiffness 150, mass 1) untuk posisi kamera."""
    if dt <= 0:
        return 0.0
    z = 26 / (2 * math.sqrt(150)); wn = math.sqrt(150)
    if z >= 1:
        return 1 - math.exp(-wn * dt) * (1 + wn * dt)
    wd = wn * math.sqrt(1 - z * z)
    return 1 - math.exp(-z * wn * dt) * (math.cos(wd * dt) + z / math.sqrt(1 - z * z) * math.sin(wd * dt))


def pos_kamera(jalur, t):
    i = 0
    for n, x in enumerate(jalur):
        if x["t"] <= t:
            i = n
    cur = jalur[i]; prev = jalur[i - 1] if i > 0 else cur
    p = 1 if i == 0 or t < cur["t"] else pegas(t - cur["t"])
    L = lambda a, b: a + (b - a) * p
    drift = 1 + cur.get("drift", 0.012) * max(0, t - max(cur["t"], 0))
    return dict(fx=L(prev["fx"], cur["fx"]), fy=L(prev["fy"], cur["fy"]), s=L(prev["s"], cur["s"]) * drift,
                ax=L(prev.get("ax", .5), cur.get("ax", .5)), ay=L(prev.get("ay", .5), cur.get("ay", .5)))


def geom_jangkar(iw, ih, k):
    c = max(W / iw, H / ih) * max(1, k["s"]); dw, dh = iw * c, ih * c
    left = min(0, max(W - dw, k["ax"] * W - k["fx"] * dw)); top = min(0, max(H - dh, k["ay"] * H - k["fy"] * dh))
    return left, top, dw, dh


def geom_cover(iw, ih, pos, kb, p):
    c = max(W / iw, H / ih); dw, dh = iw * c, ih * c
    px, py = 0.5, 0.5
    if pos:
        try:
            a, b = pos.replace("%", "").split(); px, py = float(a) / 100, float(b) / 100
        except ValueError:
            pass
    left, top = (W - dw) * px, (H - dh) * py
    kb = kb or {}; s = kb.get("s0", 1) + (kb.get("s1", 1.04) - kb.get("s0", 1)) * p
    x = kb.get("x0", 0) + (kb.get("x1", 0) - kb.get("x0", 0)) * p; y = kb.get("y0", 0) + (kb.get("y1", 0) - kb.get("y0", 0)) * p
    # transform di pusat layar: translate lalu scale
    L = lambda u, cc: (u - cc) * s + cc
    return L(left, W / 2) + x, L(top, H / 2) + y, dw * s, dh * s


def wajah_di(info, l, t_lokal):
    if l.get("video") or l["k"] == "video":
        src_t = l.get("mulaiSumber", 0) + t_lokal * l.get("laju", 1)
        sp = info.get("sampel") or []
        if not sp:
            return []
        return min(sp, key=lambda s: abs(s["t"] - src_t))["wajah"]
    return info.get("wajah", [])


def irisan(a, b, m=8):
    return not (a[0] + a[2] + m <= b[0] or b[0] + b[2] + m <= a[0] or a[1] + a[3] + m <= b[1] or b[1] + b[3] + m <= a[1])


def subjek(ep, k):
    """kotak wajah terbesar + perkiraan bahu di lapisan footage di bawah KT (tengah tampil). None bila tidak ada."""
    t = (k["dari"] + k["sampai"]) / 2
    for a in ep["adegan"]:
        if not (a["dari"] <= t < a["sampai"]):
            continue
        for l in a["lapisan"]:
            if l["k"] not in ("jangkar", "gambar", "video"):
                continue
            folder, fn = l["src"].split("/", 1); info = aset(folder).get(fn)
            if not info:
                continue
            g = geom_jangkar(l["iw"], l["ih"], pos_kamera(l["jalur"], t)) if l["k"] == "jangkar" else \
                geom_cover(info["w"], info["h"], l.get("pos"), l.get("kb"), (t - a["dari"]) / max(0.01, a["sampai"] - a["dari"]))
            fs = [(g[0] + f[0] * g[2], g[1] + f[1] * g[3], f[2] * g[2], f[3] * g[3]) for f in wajah_di(info, l, t - a["dari"])]
            fs = [f for f in fs if f[2] * f[3] >= 0.015 * W * H and f[0] + f[2] > 0 and f[0] < W]
            if fs:
                f = max(fs, key=lambda b: b[2] * b[3]); cx = f[0] + f[2] / 2
                return {"wajah": f, "bahu": (cx - 1.1 * f[2], cx + 1.1 * f[2]), "cx": cx}
    return None


def lapisan_di(ep, t):
    for a in ep["adegan"]:
        if a["dari"] <= t < a["sampai"]:
            return a
    return None


def cek(ep):
    tanda = []
    for k in ep["kt"]:
        nm = k.get("teks") or (k.get("kata") or [{}])[0].get("w", k["peran"])
        size = k.get("ukuran") or UK[k["peran"]]
        # D-31 kedekatan & arah rata terhadap subjek
        if k["peran"] in ("r1", "lead", "r2", "r6", "kotak") and k.get("jangkar", "kiri") != "tengah" and k.get("dekat", True):
            sj = subjek(ep, k)
            if sj:
                bx = kotak_kt(k); kiri_subjek = bx[0] + bx[2] / 2 < sj["cx"]
                gap = sj["bahu"][0] - (bx[0] + bx[2]) if kiri_subjek else bx[0] - sj["bahu"][1]
                if gap > 0.12 * W:
                    tanda.append(f"JAUH   {k['dari']:.2f} '{nm}' {gap / W * 100:.0f}% dari bahu subjek (maks 8-12%)")
                if kiri_subjek and k.get("jangkar", "kiri") != "kanan":
                    tanda.append(f"RATA   {k['dari']:.2f} '{nm}' di kiri subjek tapi tidak rata kanan")
                if not kiri_subjek and k.get("jangkar", "kiri") == "kanan":
                    tanda.append(f"RATA   {k['dari']:.2f} '{nm}' di kanan subjek tapi rata kanan")
        # D-32 teks kecil sendirian / teks di atas tekstur
        a = lapisan_di(ep, (k["dari"] + k["sampai"]) / 2)
        if a and size < 88 and k["peran"] != "napas":
            teman = [o for o in ep["kt"] if o is not k and (o.get("ukuran") or UK[o["peran"]]) >= 96
                     and min(o["sampai"], k["sampai"]) - max(o["dari"], k["dari"]) > 0.3 * (k["sampai"] - k["dari"])]
            polos = a["lapisan"][0]["k"] in ("kanvas", "kartu")
            if not teman and (polos or any(l.get("tekstur") for l in a["lapisan"])):
                tanda.append(f"KECIL  {k['dari']:.2f} '{nm}' {size}px sendirian di {'kanvas' if polos else 'tekstur'}")
        if a and any(l.get("tekstur") for l in a["lapisan"]) and k["peran"] not in ("napas", "giant"):
            if k.get("jangkar") != "tengah" or (size < 88 and not any(o is not k and o.get("jangkar") == "tengah" and (o.get("ukuran") or UK[o["peran"]]) >= 110 for o in ep["kt"] if min(o["sampai"], k["sampai"]) > max(o["dari"], k["dari"]))):
                tanda.append(f"TEKSTUR {k['dari']:.2f} '{nm}' di atas tekstur harus besar (88-130 px) di tengah")
    for k in ep["kt"]:
        bx = kotak_kt(k)
        if bx[0] < 0.0625 * W or bx[0] + bx[2] > 0.9375 * W or bx[1] < 0.0926 * H or bx[1] + bx[3] > 0.8657 * H:
            tanda.append(f"TEPI   {k['dari']:.2f} {k['peran']} '{k.get('teks') or (k.get('kata') or [{}])[0].get('w','')}' kotak={tuple(round(v) for v in bx)}")
        for a in ep["adegan"]:
            if a["sampai"] <= k["dari"] or a["dari"] >= k["sampai"]:
                continue
            for l in a["lapisan"]:
                if l["k"] not in ("jangkar", "gambar", "video") or l.get("grade") in ("dalam", "blurkuat"):
                    continue  # latar yang diburamkan kuat: wajah tidak terbaca sebagai wajah
                folder, fn = l["src"].split("/", 1); info = aset(folder).get(fn)
                if not info:
                    tanda.append(f"ASET   adegan {a['id']} {l['src']}: tidak ada di {folder}/aset.json, wajah tidak bisa dicek")
                    continue
                for t in (max(k["dari"], a["dari"]) + 0.05, (max(k["dari"], a["dari"]) + min(k["sampai"], a["sampai"])) / 2, min(k["sampai"], a["sampai"]) - 0.05):
                    if l["k"] == "jangkar":
                        g = geom_jangkar(l["iw"], l["ih"], pos_kamera(l["jalur"], t))
                    else:
                        p = (t - a["dari"]) / max(0.01, a["sampai"] - a["dari"])
                        g = geom_cover(info["w"], info["h"], l.get("pos"), l.get("kb"), p)
                    for f in wajah_di(info, l, t - a["dari"]):
                        fb = (g[0] + f[0] * g[2], g[1] + f[1] * g[3], f[2] * g[2], f[3] * g[3])
                        if fb[2] * fb[3] < 0.004 * W * H:  # wajah sangat kecil (kerumunan, layar): abaikan
                            continue
                        if irisan(bx, fb):
                            tanda.append(f"WAJAH  {t:.2f} adegan {a['id']} {fn}: KT {k['peran']} '{k.get('teks') or (k.get('kata') or [{}])[0].get('w','')}' {tuple(round(v) for v in bx)} vs wajah {tuple(round(v) for v in fb)}")
                            break
                    else:
                        continue
                    break
    # napas
    # kanvas napas = kanvas/kartu polos dengan 1-3 kata napas, atau angka raksasa (tahun/jam) di kartu hitam
    nap = sorted(a["dari"] for a in ep["adegan"] if a["lapisan"] and a["lapisan"][0]["k"] in ("kanvas", "kartu")
                 and any(k["peran"] in ("napas", "giant") and a["dari"] - 0.05 <= k["dari"] < a["sampai"] for k in ep["kt"]))
    titik = [0.0] + nap + [ep["durasi"]]
    for x, y in zip(titik, titik[1:]):
        if y - x > 10.5:
            tanda.append(f"NAPAS  {x:.1f}-{y:.1f} dtk tanpa kanvas napas ({y - x:.1f} dtk)")
    jenis = set()
    for a in ep["adegan"]:
        if a["dari"] < 15:
            jenis.add(a.get("masuk", "potong"))
            if a.get("invert"):
                jenis.add("invert")
    if len(jenis) < 3:
        tanda.append(f"POTONG 15 dtk pertama hanya {sorted(jenis)}")
    for a in ep["adegan"]:
        polos = any(l["k"] in ("kartu", "kanvas") for l in a["lapisan"])
        for l in a["lapisan"]:
            if l["k"] == "inset" and polos and l["w"] * l["h"] < 0.3 * W * H:
                tanda.append(f"INSET  adegan {a['id']} {l['src']} {l['w']}x{l['h']} di kanvas polos")
    tanda += cek_format(ep, nap)
    return list(dict.fromkeys(tanda)), nap


def polos(a):
    """adegan yang seluruh lapisannya kanvas/kartu (tanpa footage, gambar, atau UI)."""
    return bool(a["lapisan"]) and all(l["k"] in ("kanvas", "kartu") for l in a["lapisan"])


def cek_format(ep, nap):
    """KARTU, JEDA, PITA: pencegah kartu identik berderet, layar kosong setelah potong, dan dua lapisan teks."""
    tanda = []; kt = ep["kt"]
    mulai = lambda k: min(x.get("t", k["dari"]) for x in k["kata"]) if k.get("kata") else k["dari"]
    deret = []
    for a in sorted(ep["adegan"], key=lambda a: a["dari"]):
        if not polos(a):
            continue
        isi = [k for k in kt if k["dari"] < a["sampai"] and k["sampai"] > a["dari"]]
        if not a.get("jeda_sengaja") and not any(max(mulai(k), k["dari"]) <= a["dari"] + 0.3 for k in isi):
            awal = min([max(mulai(k), k["dari"]) for k in isi] + [a["sampai"]])
            tanda.append(f"JEDA   {a['dari']:.2f} adegan {a['id']} kanvas kosong {awal - a['dari']:.2f} dtk setelah potong (maks 0,3)")
        if a["dari"] in nap:
            besar = max(isi, key=lambda k: k.get("ukuran") or UK[k["peran"]], default=None)
            deret.append((a, (a["lapisan"][0].get("warna"), bool(a.get("invert")), besar and besar["peran"], besar and (besar.get("ukuran") or UK[besar["peran"]]))))
    for n in range(2, len(deret)):
        if deret[n][1] == deret[n - 1][1] == deret[n - 2][1]:
            tanda.append(f"KARTU  {deret[n][0]['dari']:.2f} adegan {deret[n][0]['id']} kanvas napas ke-3 berurutan yang identik {deret[n][1]}; ganti warna, skala, atau aksen")
    for k in kt:   # LOGO: KT di atas area ramai (logo, papan nama, tulisan besar) yang ditandai di aset.json -> "ramai"
        t = (k["dari"] + k["sampai"]) / 2; a = lapisan_di(ep, t); bx = kotak_kt(k)
        for l in (a["lapisan"] if a else []):
            if l["k"] not in ("jangkar", "gambar", "video") or l.get("grade") in ("dalam", "blurkuat") or "/" not in l.get("src", ""):
                continue
            folder, fn = l["src"].split("/", 1); info = aset(folder).get(fn) or {}
            if not info.get("ramai"):
                continue
            g = geom_jangkar(l["iw"], l["ih"], pos_kamera(l["jalur"], t)) if l["k"] == "jangkar" else \
                geom_cover(info["w"], info["h"], l.get("pos"), l.get("kb"), (t - a["dari"]) / max(0.01, a["sampai"] - a["dari"]))
            if any(irisan(bx, (g[0] + r[0] * g[2], g[1] + r[1] * g[3], r[2] * g[2], r[3] * g[3])) for r in info["ramai"]):
                tanda.append(f"LOGO   {t:.2f} adegan {a['id']} {fn}: KT '{k.get('teks') or (k.get('kata') or [{}])[0].get('w', '')}' menumpuk area ramai; pindah ke ruang kosong atau redam latar (grade dalam/blurkuat)")
    for s in ep.get("sub") or []:
        if any(k["dari"] < s["sampai"] and k["sampai"] > s["dari"] for k in kt):
            tanda.append(f"PITA   {len(ep['sub'])} baris subtitle tampil bersamaan dengan KT (satu lapisan teks saja)")
            break
    return tanda


def periksa(path, ketat=False, blok=BLOK):
    """Kembalikan (blokir, peringatan, napas) untuk satu file episode."""
    global W, H
    ep = json.load(open(path, encoding="utf-8"))
    for kunci in ("adegan", "kt", "durasi"):
        if kunci not in ep:
            raise Gagal(f"{path}: kunci '{kunci}' tidak ada (bukan data episode)")
    W, H = ep.get("lebar", 1920), ep.get("tinggi", 1080)
    tanda, nap = cek(ep)
    blokir = [t for t in tanda if ketat or t.split()[0] in blok]
    return blokir, [t for t in tanda if t not in blokir], nap


def main(argv=None):
    global PUB
    ap = argparse.ArgumentParser(description="Gerbang komposisi data episode (exit 1 bila WAJAH, INSET, TEPI, atau ASET).")
    ap.add_argument("episode", nargs="+"); ap.add_argument("--public", help="folder public/ (bawaan: ../public atau ../../public dari file episode)")
    ap.add_argument("--ketat", action="store_true", help="semua tanda memblokir"); ap.add_argument("--blok", help="daftar tanda yang memblokir, dipisah koma")
    ap.add_argument("--font-tebal"); ap.add_argument("--font-sedang")
    a = ap.parse_args(argv)
    blok = tuple(x.strip().upper() for x in a.blok.split(",")) if a.blok else BLOK
    if a.font_tebal: FONT["tebal"] = os.path.abspath(a.font_tebal)
    if a.font_sedang: FONT["sedang"] = os.path.abspath(a.font_sedang)
    gagal = 0
    for path in a.episode:
        d = os.path.dirname(os.path.abspath(path))
        PUB = os.path.abspath(a.public) if a.public else next((p for p in (os.path.join(d, "..", "public"), os.path.join(d, "..", "..", "public")) if os.path.isdir(p)), "")
        font.cache_clear(); aset.cache_clear()
        try:
            if not PUB or not os.path.isdir(PUB):
                raise Gagal(f"folder public tidak ditemukan untuk {path} (beri --public)")
            blokir, awas, nap = periksa(path, a.ketat, blok)
        except (Gagal, OSError, ValueError, KeyError) as e:
            print(f"GAGAL  {os.path.basename(path)}: {e!r}" if isinstance(e, KeyError) else f"GAGAL  {os.path.basename(path)}: {e}"); gagal = 1; continue
        print(f"{os.path.basename(path)}: napas di {[round(x, 1) for x in nap]}")
        for t in awas: print("  PERINGATAN " + t)
        for t in blokir: print("  " + t)
        print(f"  cek_komposisi: {'GAGAL, ' + str(len(blokir)) + ' tanda memblokir' if blokir else 'LULUS'}" + (f" ({len(awas)} peringatan)" if awas else ""))
        gagal = gagal or bool(blokir)
    return 1 if gagal else 0




if __name__ == "__main__":
    sys.exit(main())
