"""Cek komposisi data episode sebelum render (D-24..D-28). Dipanggil bangun_ep.py; bisa juga sendiri:
  python3 cek_komposisi.py ../src/data/ep04.json

Tanda (semuanya wajib nol sebelum render, atau ditulis alasannya):
  WAJAH   kotak KT beririsan dengan kotak wajah (aset.json, MediaPipe + Haar) pada lapisan jangkar/gambar/video di bawahnya,
          diukur di awal, tengah, dan akhir tampilnya KT dengan geometri kamera yang sama dengan komponen Remotion
  NAPAS   jarak antar kanvas napas (kanvas solid + KT napas) > 10,5 dtk, atau pembuka > 10,5 dtk tanpa napas (D-25)
  POTONG  < 3 jenis tata potong di 15 dtk pertama (potong, whip, grid, putih, invert) (D-27)
  INSET   inset < 30 % layar di atas kanvas/kartu polos (kotak kecil di ruang kosong, D-26/D-28)
  TEPI    kotak KT keluar dari zona aman 16:9 (x 120-1800, y 100-935)
Lebar teks diukur dengan font Helvetica yang sama (PIL), bukan ditebak.
"""
import json, math, os, sys
from functools import lru_cache
from PIL import ImageFont

HERE = os.path.dirname(os.path.abspath(__file__)); PUB = os.path.join(HERE, "..", "public")
W, H = 1920, 1080
UK = {"r1": 96, "lead": 80, "r2": 124, "r6": 210, "giant": 520, "kotak": 96, "napas": 220}
LH = {"r1": 1.02, "lead": 1.02, "r2": 0.92, "r6": 0.92, "giant": 0.8, "kotak": 1.3, "napas": 0.94}


@lru_cache(None)
def font(size, bold):
    return ImageFont.truetype(os.path.join(PUB, "fonts", "HelveticaNeueBold.otf" if bold else "HelveticaNeueMedium.otf"), size)


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


def cek(ep):
    tanda = []
    for k in ep["kt"]:
        bx = kotak_kt(k)
        if bx[0] < 120 or bx[0] + bx[2] > 1800 or bx[1] < 100 or bx[1] + bx[3] > 935:
            tanda.append(f"TEPI   {k['dari']:.2f} {k['peran']} '{k.get('teks') or (k.get('kata') or [{}])[0].get('w','')}' kotak={tuple(round(v) for v in bx)}")
        for a in ep["adegan"]:
            if a["sampai"] <= k["dari"] or a["dari"] >= k["sampai"]:
                continue
            for l in a["lapisan"]:
                if l["k"] not in ("jangkar", "gambar", "video"):
                    continue
                folder, fn = l["src"].split("/", 1); info = aset(folder).get(fn)
                if not info:
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
    nap = sorted(a["dari"] for a in ep["adegan"] if a["lapisan"] and a["lapisan"][0]["k"] == "kanvas"
                 and any(k["peran"] == "napas" and a["dari"] - 0.05 <= k["dari"] < a["sampai"] for k in ep["kt"]))
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
    return tanda, nap


if __name__ == "__main__":
    ep = json.load(open(sys.argv[1])); t, nap = cek(ep)
    print(f"napas di: {[round(x, 1) for x in nap]}")
    print("\n".join(t) if t else "cek_komposisi: bersih")
    sys.exit(1 if t else 0)
