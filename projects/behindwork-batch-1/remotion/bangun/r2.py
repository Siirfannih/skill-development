"""Pembantu rancangan r2 (D-24..D-30): jangkar spasial, kanvas napas, tata potong. Ukuran aset diambil dari aset.json."""
import json, os

PUB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public")
_aset = {}


def info(src):
    folder, fn = src.split("/", 1)
    if folder not in _aset:
        _aset[folder] = json.load(open(os.path.join(PUB, folder, "aset.json")))
    return _aset[folder][fn]


def T(t, fx, fy, s=1.0, ax=0.5, ay=0.5, drift=None):
    d = {"t": round(t, 3), "fx": fx, "fy": fy, "s": s, "ax": ax, "ay": ay}
    if drift is not None:
        d["drift"] = drift
    return d


def J(src, jalur, **kw):
    """lapisan jangkar: foto/klip full-bleed, kamera berpindah titik fokus dengan pegas."""
    i = info(src)
    d = {"k": "jangkar", "src": src, "iw": i["w"], "ih": i["h"], "jalur": jalur}
    if src.endswith((".mp4", ".mov", ".webm")):
        d["video"] = True
    d.update(kw); return d


def KANVAS(warna):
    return {"k": "kanvas", "warna": warna}


def SCRIM(sisi, kuat=0.62):
    return {"k": "scrim", "sisi": sisi, "kuat": kuat}


def NAPAS(teks, dari, sampai, warna="putih", ukuran=None, aksen=None, y=None):
    """1-3 kata di tengah kanvas napas; y dihitung supaya blok di tengah vertikal."""
    n = teks.count("\n") + 1; uk = ukuran or 220
    d = {"peran": "napas", "dari": round(dari, 3), "sampai": round(sampai, 3), "x": 960, "y": y if y is not None else round(540 - n * uk * 0.94 / 2 - 20),
         "jangkar": "tengah", "teks": teks, "warna": warna}
    if ukuran:
        d["ukuran"] = ukuran
    if aksen:
        d["aksen"] = aksen
    return d


def JT(src, mulai, dari, sampai, ax=0.68, ay=0.38, s=1.8, laju=1.0, **kw):
    """jangkar klip pembicara: kamera mengikuti wajah dari sampel aset.json (tiap 2 dtk), wajah tetap di (ax, ay)."""
    i = info(src); sp = [x for x in i.get("sampel", []) if x["wajah"]]
    jal = []; t = dari
    while t < sampai:
        st = mulai + (t - dari) * laju
        x = min(sp, key=lambda q: abs(q["t"] - st))["wajah"][0] if sp else [0.4, 0.15, 0.2, 0.4]
        fx = x[0] + x[2] / 2; fy = x[1] + x[3] * 0.45
        if not jal or abs(fx - jal[-1]["fx"]) > 0.03 or abs(fy - jal[-1]["fy"]) > 0.04:
            jal.append(T(t, round(fx, 3), round(fy, 3), s, ax, ay, drift=0.006))
        t += 0.5
    return J(src, jal, mulaiSumber=mulai, laju=laju, **kw)
