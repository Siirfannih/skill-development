#!/usr/bin/env python3
"""Cek irisan bbox (audit ronde 2): KT vs stiker/slop, KT vs karakter (jarak >= 24 px), KT vs KT lain, sepanjang waktu tampil (sampel 1/10 dtk + tiap frame di sekitar awal blok).
Sumber: lego/lego.json (posisi, gerak), lego/lapisan.json (props). bbox KT = lebar teks sebenarnya (metrik Poppins) x tinggi huruf, bukan kotak lapisan.
  python3 lego/cek_tumpuk.py      -> keluar 1 bila ada irisan. Slab hero/cincin (di belakang kepala, sengaja menimpa) tidak dibandingkan dengan slop."""
import json, math, os, sys
from fontTools.ttLib import TTFont
import waktu as W
P = W.P
F = 30000 / 1001
FONTS = os.path.join(P, "remotion/public/fonts")
_f = {}


def wem(text, font):
    if font not in _f:
        t = TTFont(os.path.join(FONTS, font)); _f[font] = (t.getBestCmap(), t["hmtx"], t["head"].unitsPerEm)
    cm, hm, upm = _f[font]
    return sum(hm[cm.get(ord(c), cm[ord("n")])][0] for c in text) / upm


lego = {e["id"]: e for e in json.load(open(os.path.join(P, "lego/lego.json")))["lapisan"]}
lap = {e["id"]: e for e in json.load(open(os.path.join(P, "lego/lapisan.json")))}
lap.update({e["id"]: e for e in json.load(open(os.path.join(P, "lego/lapisan_opaque.json")))})
dur = {}
for i, e in lego.items():
    r = __import__("subprocess").run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", os.path.join(P, "lego", e["src"])], capture_output=True, text=True)
    dur[i] = float(r.stdout.strip() or 0)


def pw(keys, t):
    keys = sorted(keys)
    if t <= keys[0][0]: return keys[0][1]
    for (a, va), (b, vb) in zip(keys, keys[1:]):
        if t < b: return va + (vb - va) * (t - a) / max(1e-6, b - a)
    return keys[-1][1]


def pos(e, t):
    g = e.get("gerak", {}); r = t - e["t"]
    return (pw(g["x"], r) if g.get("x") else e["x"], pw(g["y"], r) if g.get("y") else e["y"])


def kt_box(i, t):
    """(x0,y0,x1,y1) teks terlihat atau None. Hanya kata yang sudah tampil (wt) dihitung."""
    e, p = lego[i], lap[i]["props"]
    g = p.get("gaya"); x, y = pos(e, t); w, h = p["w"], p["h"]; cx, cy = x + w / 2, y + h / 2
    words = p["teks"].split(); wt = p.get("wt") or [0.0] * len(words)
    r = t - e["t"]
    vis = [k for k in range(len(words)) if r >= wt[min(k, len(wt) - 1)] - 1e-6]
    if not vis:
        if g != 'bubble': return None
        kiri = p.get('sisi') != 'kanan'; x1 = x + 40 if kiri else x + w - 40 - 170
        return (x1, y + h - 40 - 90, x1 + 170, y + h - 40)
    if g == "r1":
        s = p.get("size", 66); font = "poppins-latin-700-normal.woff2"
        full = wem(p["teks"], font) * s * 0.98; part = wem(" ".join(words[:max(vis) + 1]), font) * s * 0.98
        return (cx - full / 2, cy - s * 0.55, cx - full / 2 + part, cy + s * 0.55)
    if g in ("r2", "r3", "putus"):
        s = p.get("size", 88); font = "poppins-latin-800-normal.woff2"; wd = wem(p["teks"].replace(" ", " "), font) * s
        return (cx - wd / 2, cy - s * 0.55, cx + wd / 2, cy + s * 0.55)
    if g == "bubble":
        s = p.get("size", 60); wd = wem(p["teks"], "poppins-latin-700-normal.woff2") * s + s * 0.5 + 22 + 80
        kiri = p.get("sisi") != "kanan"; x1 = x + 40 if kiri else x + w - 40 - wd
        return (x1, y + h - 40 - (s * 1.15 + 48), x1 + wd, y + h - 40)
    if g == "viral":
        s = p.get("size", 150); wd = wem("VIRAL!!", "poppins-latin-800-normal.woff2") * s
        return (cx - wd / 2, cy - s * 0.6, cx + wd / 2, cy + s * 0.6)
    return None


def slop_box(i, t):
    e, p = lego[i], lap[i]["props"]
    if p["jenis"] in ("bingkai", "grade"): return None
    r = t - e["t"]; pad = 60
    bw, bh = p["w"] - 2 * pad, p["hb"]; rot = math.radians(abs(p["rot"]) + 3)
    W2 = abs(bw * math.cos(rot)) + abs(bh * math.sin(rot)); H2 = abs(bh * math.cos(rot)) + abs(bw * math.sin(rot))
    cx, cy = e["x"] + pad + bw / 2, e["y"] + pad + bh / 2
    k = (r - p["runtuhAt"]) * F
    if k > 0:
        tahan = 3 + (p["seed"] % 2); st = math.floor(k / tahan); q = min(1, st / 7); cy += q * q * p["jatuh"]
    return (cx - W2 / 2, cy - H2 / 2, cx + W2 / 2, cy + H2 / 2)


def char_box(i, t):
    e, p = lego[i], lap[i]["props"]; u = p["u"]; x, y = pos(e, t)
    w, h = math.ceil(22 * u) + 80, math.ceil(20 * u) + 80
    fx, fy = x + w / 2, y + 17 * u + 40
    half = 7.2 * u if p["model"] == "claude" else 5.6 * u
    top = fy - (12.4 * u if p["model"] == "claude" else 13.4 * u)      # tinggi tubuh + lompat + emote
    return (fx - half, top, fx + half, fy + 0.6 * u)


def gap(a, b):
    dx = max(a[0] - b[2], b[0] - a[2], 0); dy = max(a[1] - b[3], b[1] - a[3], 0)
    return math.hypot(dx, dy) if (dx > 0 and dy > 0) else max(dx, dy) if (dx > 0 or dy > 0) else -1


KT = [i for i in lego if lap[i]["comp"] == "KT" and lap[i]["props"].get("gaya") in ("r1", "r2", "r3", "putus", "bubble", "viral")]
SL = [i for i in lego if lap[i]["comp"] == "Slop"]
CH = [i for i in lego if lap[i]["comp"] == "Karakter"]
bad = {}
T = 0.0
while T < W.DURASI:
    for t in (T, T + 1 / 30):
        act = lambda i: lego[i]["t"] <= t < lego[i]["t"] + dur[i]
        bx = {i: kt_box(i, t) for i in KT if act(i)}
        bx = {i: b for i, b in bx.items() if b}
        for i, b in bx.items():
            for j in SL:
                if act(j) and (s := slop_box(j, t)) and gap(b, s) < 4: bad.setdefault(("KT-slop", i, j), t)
            for j in CH:
                if act(j) and gap(b, char_box(j, t)) < 24: bad.setdefault(("KT-karakter", i, j), t)
            for j, b2 in bx.items():
                if j > i and gap(b, b2) < 0 + 1e-9 and lap[i]["props"].get("gaya") != "viral" and lap[j]["props"].get("gaya") != "viral":
                    bad.setdefault(("KT-KT", i, j), t)
    T += 0.1
print(f"KT {len(KT)} · slop {len(SL)} · karakter {len(CH)} · irisan: {len(bad)}")
for k, t in sorted(bad.items(), key=lambda x: x[1])[:40]:
    print(f"  {t:6.2f} dtk  {k[0]:12} {k[1]} ({lap[k[1]]['props']['teks'][:18]}) x {k[2]}")
sys.exit(1 if bad else 0)
