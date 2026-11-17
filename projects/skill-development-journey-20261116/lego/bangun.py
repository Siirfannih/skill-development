#!/usr/bin/env python3
"""Bangun lapisan lego + lego.json + objects.json dari teks.json dan words.json (semua waktu turunan, tidak ada angka hardcode kata).
  python3 lego/bangun.py            -> lego/lapisan.json (alpha, untuk lapisan.py), lego/lapisan_opaque.json, lego/lego.json (tanpa lubang), objects.json
  python3 lego/bangun.py --lubang   -> setelah lapisan.py: potong lubang matte (lapisan di belakang kepala), isi src ke lego.json
Adegan layar penuh (dunia repo, aplikasi Claude, dua jendela) DITUNDA (adendum MG63): komponennya ada, tidak dirender (DUNIA=1 untuk mengaktifkan)."""
import hashlib, json, math, os, sys
import waktu as W
from waktu import P, T, FPS, DURASI
import teks as TK
from fontTools.ttLib import TTFont

DUNIA = TK.DUNIA
FONTS = os.path.join(P, "remotion/public/fonts")
_F = {}


def wem(text, font):
    if font not in _F:
        t = TTFont(os.path.join(FONTS, font)); _F[font] = (t.getBestCmap(), t["hmtx"], t["head"].unitsPerEm)
    cm, hm, upm = _F[font]
    return sum(hm[cm.get(ord(c), cm[ord("n")])][0] for c in text) / upm


POP7, POP8, ANT = "poppins-latin-700-normal.woff2", "poppins-latin-800-normal.woff2", "anton-latin-400-normal.woff2"


def snap(t):
    return round(t * FPS) / FPS


FPSO = 30000 / 1001            # frame rate master (= wajah.mp4/suara.wav, 2496 f); lapisan Remotion tetap 30 fps dan diresample menurut waktu oleh ffmpeg


def snapo(t):
    return round(t * FPSO) / FPSO


def wt_of(b, vis):
    """detik (relatif awal lapisan) tiap kata tampil = onset kata di words.json + 2 f (audit R4: teks tidak boleh muncul sebelum diucapkan)"""
    i0, i1 = b["kata"]
    units = W.U[i0:i1 + 1]
    words = vis.split()
    if b.get("buang"): idxs = [k for k, u in enumerate(units) if W.nrm(u["w"]) not in b["buang"]]      # kata yang dibuang dari KT (label UI sudah memuatnya)
    elif len(words) == len(units): idxs = list(range(len(units)))
    elif b.get("sisip"): idxs = [k for k, u in enumerate(units) if W.nrm(u["w"]) != W.nrm(b["sisip"])]
    else: idxs = [0] * len(words)
    t0 = snapo(b["t"])
    return [max(0.0, round(units[k]["s"] + 2 / FPS - t0, 3)) for k in idxs[:len(words)]]


def bez(x1, y1, x2, y2):
    def f(p):
        lo, hi = 0.0, 1.0
        for _ in range(40):
            m = (lo + hi) / 2
            x = 3 * (1 - m) ** 2 * m * x1 + 3 * (1 - m) * m * m * x2 + m ** 3
            lo, hi = (m, hi) if x < p else (lo, m)
        m = (lo + hi) / 2
        return 3 * (1 - m) ** 2 * m * y1 + 3 * (1 - m) * m * m * y2 + m ** 3
    return f


CURVE = {"land": bez(.1, .75, .15, 1), "heavy": bez(.75, 0, .18, 1), "leave": bez(.55, 0, .9, .35), "drift": bez(.4, 0, .6, 1)}


def jalur(kurva, v0, v1, t0, dur, n=10):
    """kunci gerak lego (detik relatif lapisan) dari kurva curves.ts: tidak linear."""
    c = CURVE[kurva]
    return [[round(t0 + dur * k / n, 4), round(v0 + (v1 - v0) * c(k / n), 2)] for k in range(n + 1)]


def gabung(*segs):
    out = []
    for s in segs:
        for t, v in s:
            if out and t <= out[-1][0]:
                if t == out[-1][0]: out[-1] = [t, v]
                continue
            out.append([t, v])
    return out


SLOT_L = []      # lapisan eksternal (b10a_meja3d)
L = []          # lapisan: dict(id, comp, props, durasi, t, x, y, gerak, lubang, opaque, catatan)


def add(id, comp, props, durasi, t, x, y, gerak=None, lubang=False, opaque=False, objek=None):
    t = snapo(t); durasi = max(0.1, round(durasi * FPS) / FPS)
    props = dict(props, durasi=durasi)
    if comp in ("KT", "Lingkar"): props["v"] = 10          # Irfan 17 Nov malam: sistem masuk/keluar KT baru, Clawd di lingkaran
    L.append(dict(id=id, comp=comp, props=props, durasi=durasi, t=t, x=int(round(x)), y=int(round(y)), gerak=gerak, lubang=lubang, opaque=opaque, objek=objek))


# ====================== dasar footage (kamera dikerjakan ffmpeg) ======================
import functools


def _joins():
    """frame sambungan footage (CUT-MAP-v2 joins) terdekat dengan titik beat yang dilaporkan audit"""
    cm = json.load(open(os.path.join(P, "CUT-MAP-v2.json")))
    js = [k["timeline_frames"][0] for k in cm["kept"][1:]]
    out = []
    for anchor in (T["b4a"], T["claude_b4"], T["b5a"], T["b6b"]):
        out.append(min(js, key=lambda f: abs(f / FPSO - anchor)))
    return tuple(out)


JF = _joins()                                         # sambungan footage yang diberi punch-in (audit ronde 2 V2)
JOIN = {k: v / FPSO for k, v in zip(("j1", "j49", "j53", "j73"), JF)}
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import punch as PU  # noqa: E402

# penekanan kata kunci (REVISI-1 B12/B7): satu pulsa zoom-in/out per ±4–6 dtk pada bagian wajah; (jangkar, amplitudo)
EMF = []      # Irfan 17 Nov: pulsa masuk-keluar terasa amatir -> diganti LANGKAH (punch-in ditahan, kembali lewat potongan), lihat langkah()
LANGKAH_KATA = [("viral", .06), ("slop", .08), ("mempelajari", .05), ("publish", .06), ("balik", .07), ("habis", .10), ("langganan", .05), ("uji", .05), ("lintas", .07), ("pct", .07), ("videonya", .09)]
RAMP = 14          # frame punch-in (C01 13–25 f), kurva land


def _akhir_kalimat(t):
    """detik potongan kembali: awal kata pertama kalimat berikutnya (maks 3,5 dtk setelah kata kunci)"""
    k0 = next(i for i, u in enumerate(W.U) if u["s"] >= t - 0.02)
    for k in range(k0 + 1, len(W.U)):
        if W.U[k]["s"] > t + 3.5: return W.U[k - 1]["s"] - 0.02 if W.U[k - 1]["s"] > t + 1.2 else t + 1.2
        if W.U[k - 1]["w"].rstrip()[-1:] in ".?!": return W.U[k]["s"] - 0.03
    return t + 2.0


@functools.lru_cache(maxsize=None)
def langkah():
    """[(frame kata, frame kembali, pengali)] punch-in bertingkat. B1b: ChatGPT/Claude/Gemini masing-masing +4 % (bertumpuk), CUT ke 1,00 tepat di 'decision' (Irfan 17 Nov)."""
    fr = lambda t: round(snapo(t) * FPSO)
    ev = [(fr(T[k]), fr(T["decision"]), 1 + 0.04 * (n + 1)) for n, k in enumerate(("chatgpt1", "claude1", "gemini1"))]
    dunia = [(T["akhirnya"] - 0.3, T["b1b"] + 0.4), (T["b3a"] - 0.5, T["gimana"] + 0.9), (T["lihat_e"] - 0.5, T["sini_e"] + 0.5), (T["b6b"] - 0.2, 999)]
    joins = [(PU.jendela(j)[0] - 2, PU.jendela(j)[1] + 3) for j in JF]
    lain = []
    for key, amp in LANGKAH_KATA:
        t = T[key]; r = _akhir_kalimat(t)
        if any(not (r < a or t > b) for a, b in dunia): continue
        a, b = fr(t), fr(r)
        for x0, x1 in joins:
            if a < x1 and b > x0:
                b = x0 if a + RAMP + 8 <= x0 else -1
        if b > 0: lain.append([a, b, 1 + amp])
    lain.sort()
    for x, y in zip(lain, lain[1:]):
        x[1] = min(x[1], y[0])
    return tuple(ev) + tuple(tuple(v) for v in lain)


def _pengali(n):
    """faktor punch pada frame n: tiap langkah naik dari level sebelumnya ke levelnya dalam RAMP frame (land), ditahan sampai frame kembali"""
    aktif = sorted((a, b, m) for a, b, m in langkah() if a <= n < b)
    if not aktif: return 1.0
    lv = 1.0
    for a, b, m in aktif:
        p = min(1.0, (n - a) / RAMP); p = 1 - (1 - p) ** 3
        lv = lv + (m - lv) * p
    return lv


@functools.lru_cache(maxsize=None)
def base_clips():
    """klip dasar dipecah di titik langkah punch: potongan ramp = kurva land, potongan tahan = kurva klip asal; z = zoom dasar x pengali langkah"""
    out = []
    cuts = sorted({x for a, b, m in langkah() for x in (a, a + RAMP, b)})
    for a, c, z0, z1, kv in base_clips0():
        pts = [a] + [x for x in cuts if a < x < c] + [c]
        if len(pts) == 2 and _pengali(a) == 1.0 and _pengali(c - 1) == 1.0:
            out.append((a, c, z0, z1, kv)); continue
        zb = lambda n: z0 + (z1 - z0) * _ease(kv, (n - a) / max(1, c - a - 1))
        for x, y in zip(pts, pts[1:]):
            ramp = any(x == la and y <= la + RAMP for la, lb, m in langkah())
            out.append((x, y, round(zb(x) * _pengali(x), 5), round(zb(y - 1) * _pengali(y - 1), 5), "land" if ramp else kv))
    return out


@functools.lru_cache(maxsize=None)
def base_clips0():
    """Kamera footage KONTINU, tiap klip utuh dengan kurva curves.ts (drift saat hold, heavy saat push bertujuan): [(frame awal, frame akhir, z0, z1, kurva)], setengah terbuka.
    Di sekitar sambungan ada celah 12 frame [j-5, j+7) yang diisi klip punch; zoom di celah = interpolasi antara akhir klip sebelumnya dan awal klip berikutnya."""
    tot = round(DURASI * FPSO)
    fr = lambda t: round(snapo(t) * FPSO)
    j1, j49, j53, j73 = JF
    pr, po = PU.PRE, PU.POST + 1
    return [(0, fr(T["finally"]), 1.00, 1.02, "drift"), (fr(T["finally"]), fr(T["finally"] + 0.3), 1.02, 1.16, "heavy"), (fr(T["finally"] + 0.3), fr(T["b1b"]), 1.16, 1.06, "drift"),
            (fr(T["b1b"]), fr(T["decision"]), 1.00, 1.01, "drift"), (fr(T["decision"]), fr(T["b2a"]), 1.00, 1.02, "drift"), (fr(T["b2a"]), fr(T["b2b"]), 1.00, 1.03, "drift"),
            (fr(T["b2b"]), fr(T["b3a"]), 1.03, 1.00, "drift"), (fr(T["b3a"]), j1 - pr, 1.00, 1.04, "drift"), (j1 + po, fr(T["b4b"]), 1.04, 1.10, "drift"),
            (fr(T["b4b"]), j49 - pr, 1.10, 1.14, "drift"), (j49 + po, j53 - pr, 1.14, 1.16, "drift"), (j53 + po, fr(T["b5b"]), 1.16, 1.04, "drift"),
            (fr(T["b5b"]), fr(T["b6a"]), 1.00, 1.03, "drift"), (fr(T["b6a"]), j73 - pr, 1.00, 1.04, "drift"), (j73 + po, tot, 1.04, 1.07, "drift")]


def _ease(kv, p):
    """sama dengan compose.eased: linear / land (1-(1-p)^3) / lainnya smoothstep"""
    if kv == "linear": return p
    if kv == "land": return 1 - (1 - p) ** 3
    return p * p * (3 - 2 * p)


def orig_z(n):
    """zoom dasar asli (tanpa pecah klip): klip utuh p = (n-a)/(N-1), celah sambungan = interpolasi"""
    cl = base_clips()
    for a, c, z0, z1, kv in cl:
        if a <= n < c:
            return z0 + (z1 - z0) * _ease(kv, (n - a) / max(1, c - a - 1))
    for (a, c, z0, z1, kv), (a2, c2, y0, y1, kv2) in zip(cl, cl[1:]):
        if c <= n < a2:
            return z1 + (y0 - z1) * (n - c + 1) / (a2 - c + 1)
    return 1.0


@functools.lru_cache(maxsize=None)
def jendela_baked():
    """[(w0, w1 setengah terbuka, nama, pengali zoom fn, frame blur ekstra)]: 4 sambungan + pulsa penekanan yang tidak menabrak sambungan atau adegan dunia"""
    out = [(PU.jendela(j)[0], PU.jendela(j)[1] + 1, f"j{j}", (lambda n, j=j: PU.faktor(n, j)), (j - 1, j)) for j in JF]
    dunia = [(T["akhirnya"] - 0.3, T["b1b"] + 0.4), (T["b3a"] - 0.5, T["gimana"] + 0.9), (T["lihat_e"] - 0.5, T["sini_e"] + 0.5), (T["b6b"] - 0.2, 999)]
    for key, amp in EMF:
        n0 = round(snapo(T[key]) * FPSO); w0, w1 = PU.jendela_em(n0); w1 += 1
        t0, t1 = w0 / FPSO, w1 / FPSO
        if any(not (t1 < a or t0 > b) for a, b in dunia): continue
        if any(not (w1 + 3 <= x0 or w0 >= x1 + 3) for x0, x1, *_ in out): continue
        out.append((w0, w1, f"e{n0}", (lambda n, n0=n0, amp=amp: PU.em_env(n, n0, amp)), ()))
    return sorted(out)


def faktor_total(n):
    f = 1.0
    for w0, w1, nm, fk, bx in jendela_baked():
        if w0 <= n < w1: f *= fk(n)
    return f


@functools.lru_cache(maxsize=None)
def klip_utuh():
    """klip kamera yang benar-benar dipakai compose: klip asli dikurangi jendela baked (z awal/akhir potongan dari kurva asli)."""
    out = []
    wins = [(w0, w1) for w0, w1, *_ in jendela_baked()]
    for a, c, z0, z1, kv in base_clips():
        segs = [(a, c)]
        for w0, w1 in wins:
            new = []
            for s0, s1 in segs:
                if w1 <= s0 or w0 >= s1: new.append((s0, s1)); continue
                if s0 < w0: new.append((s0, w0))
                if w1 < s1: new.append((w1, s1))
            segs = new
        for f0, f1 in segs:
            utuh = (f0, f1) == (a, c)
            za, zb = (z0, z1) if utuh else (round(orig_z(f0), 5), round(orig_z(f1 - 1), 5))
            out.append((f0, f1, za, zb, kv))
    return sorted(out)


def z_base_n(n):
    """zoom dasar pada frame master n persis yang dipakai compose; di jendela baked: zoom asli (pengali dipakai terpisah)"""
    for w0, w1, *_ in jendela_baked():
        if w0 <= n < w1: return orig_z(n)
    for a, c, z0, z1, kv in klip_utuh():
        if a <= n < c: return z0 + (z1 - z0) * _ease(kv, (n - a) / max(1, c - a - 1))
    return orig_z(n)


def z_base(t):
    return z_base_n(t * FPSO)


def zoom_at(t):
    """zoom efektif footage pada waktu t (dasar x punch/penekanan): dipakai lubang matte, Lingkar, WajahDorong"""
    n = round(t * FPSO)
    return z_base_n(n) * faktor_total(n)


def dasar():
    """klip dasar untuk compose: klip kamera utuh berkurva (tanpa klip linear) + klip baked (punch sambungan, penekanan kata kunci)."""
    out = []
    src = os.path.join(P, W.EDIT, "wajah.mp4")
    items = [("c", a, c, (z0, z1, kv)) for a, c, z0, z1, kv in klip_utuh()] + [("p", w0, w1, (nm, fk, bx)) for w0, w1, nm, fk, bx in jendela_baked()]
    for kind, f0, f1, x in sorted(items, key=lambda it: it[1]):
        if kind == "p":
            nm, fk, bx = x
            path = PU.buat(nm, f0, f1 - 1, fk, orig_z_t, src, W.EDIT, bx)
            out.append({"src": os.path.relpath(path, os.path.join(P, "lego")), "in": 0.0, "dur": round((f1 - f0) / FPSO, 5)})
        else:
            z0, z1, kv = x
            out.append({"src": f"../{W.EDIT}/wajah.mp4", "in": round(f0 / FPSO, 5), "dur": round((f1 - f0) / FPSO, 5), "kamera": {"zoom": [z0, z1], "pusat": [0.5, 0.45], "kurva": kv}})
    return out


def orig_z_t(t):
    return orig_z(round(t * FPSO))


# ====================== karakter ======================
def kotak(u):
    return math.ceil(22 * u) + 80, math.ceil(20 * u) + 80


def karakter(nama, model, u, seed, mulai, selesai, foot, emosi, sudut, lompat=(), kaget=(), denyut=(), lambai=(), gx=None, gy=None):
    w, h = kotak(u)
    fx, fy = foot
    props = dict(model=model, u=u, seed=seed, emosi=emosi, sudut=sudut, lompat=list(lompat), kaget=list(kaget), denyut=list(denyut), lambai=list(lambai), kamar=True)
    if model != "claude": props["rev"] = 2      # R2-1: Codex/Gemini pixel sekeluarga (KarakterPixel.tsx)
    ox, oy = w / 2, 17 * u + 40
    g = {}
    if gx: g["x"] = [[t, round(v - ox, 1)] for t, v in gx]
    if gy: g["y"] = [[t, round(v - oy, 1)] for t, v in gy]
    add(f"K_{nama}", "Karakter", props, selesai - mulai, mulai, fx - ox, fy - oy, g or None,
        objek=dict(nama=("Claude" if nama.startswith("Clawd") else nama.rstrip("0")), peran="karakter", t=mulai))


CLAWD_LINGKAR = {}


def ikut_zoom(foot, t0, t1, x=True, step=2):
    """kunci gerak (detik relatif t0) titik kaki tokoh di koordinat FOOTAGE yang dipetakan ke layar mengikuti zoom kamera dasar (pusat 960, 486):
    tokoh berpijak di badan Irfan dan tidak 'melayang' saat kamera punch-in (Irfan 17 Nov)."""
    out = []
    n0, n1 = round(t0 * FPSO), round(t1 * FPSO)
    for n in list(range(n0, n1, step)) + [n1]:
        z = zoom_at(n / FPSO)
        v = 960 + (foot[0] - 960) * z if x else 486 + (foot[1] - 486) * z
        out.append([round(n / FPSO - t0, 4), round(v, 1)])
    return sederhana(out)


def sederhana(pts, tol=1.5):
    """buang kunci yang hampir segaris (galat < tol px): ekspresi ffmpeg compose punya batas kedalaman if() (gagal r10c)"""
    if len(pts) <= 2: return pts
    keep = [pts[0]]
    for k in range(1, len(pts) - 1):
        a, b = keep[-1], pts[k + 1]
        span = pts[k + 1][0] - a[0]
        ok = all(abs(a[1] + (b[1] - a[1]) * (q[0] - a[0]) / span - q[1]) < tol for q in pts[pts.index(a) + 1:k + 2]) if span > 0 else True
        if not ok: keep.append(pts[k])
    keep.append(pts[-1])
    return keep


def bangun_karakter():
    r = lambda i: W.FPS and (0, 0.13, 0.30)[i]
    fin, ch, cl, ge, dec = T["finally"], T["chatgpt1"], T["claude1"], T["gemini1"], T["decision"]
    keluar = [dec + 0.05, dec + 0.15, dec + 0.25]      # Irfan 17 Nov: cut patahan di "decision" -> tokoh melompat pergi di sana, DECISION + narasi dapat ruang bersih
    end = [k + 0.45 for k in keluar]
    # Clawd: kiri bawah dekat bahu; bergeser memberi ruang untuk FINALLY lalu kembali
    # Irfan 17 Nov: Clawd tidak melayang bebas, harus berpijak di badan. Bahu dari matte RVM: kiri ±(650, 770), kanan ±(1400, 820) footage.
    A, B = (650, 766), (1460, 880)          # A bahu kiri; B bahu kanan saat FINALLY (memberi ruang huruf, Clawd di depan bahu)
    UC = 16
    gx = gabung([[0, A[0]], [fin - 0.08, A[0]]], jalur("heavy", A[0], B[0], fin - 0.08, 0.5), [[T["b1b"] - 0.2, B[0]]], jalur("land", B[0], A[0], T["b1b"] - 0.2, 0.7),
                [[keluar[0], A[0]]], jalur("leave", A[0], -420, keluar[0], 0.45, 8))
    gy = gabung([[0, A[1]], [fin - 0.08, A[1]]], jalur("heavy", A[1], B[1], fin - 0.08, 0.5), [[T["b1b"] - 0.2, B[1]]], jalur("land", B[1], A[1], T["b1b"] - 0.2, 0.7),
                [[keluar[0], A[1]]], jalur("leave", A[1], A[1] + 120, keluar[0], 0.45, 8))
    if DUNIA:   # Clawd di bahu kanan diserahkan ke lingkaran wajah (Lingkar merender Clawd di koordinat footage: ikut menyusut, melompat ke rambut); kembali ke kamar di B1b
        w1 = T["akhirnya"]
        gx = gabung([[0, A[0]], [fin - 0.08, A[0]]], jalur("heavy", A[0], B[0], fin - 0.08, 0.5), [[w1 + 0.1, B[0]]])
        gy = gabung([[0, A[1]], [fin - 0.08, A[1]]], jalur("heavy", A[1], B[1], fin - 0.08, 0.5), [[w1 + 0.1, B[1]]])
        karakter("Clawd0", "claude", UC, 1, 0, w1 + 1 / 30, A, [[0, "neutral"], [fin, "surprised"], [fin + 0.5, "happy"]], [[0, 0.125], [fin - 0.05, 0.125], [fin + 0.2, -0.125]],     # badan di-flip supaya wajah tetap melihat Irfan saat pindah kiri → kanan
                 lompat=[(fin + 0.05, fin + 0.5, 2.6)], kaget=[(fin, 1.0)], gx=gx, gy=gy)
        dur1 = round(T["b1b"] + 0.2 - w1, 2); tum = round(dur1 - 0.48, 3); z1 = zoom_at(w1 + dur1 + 0.15)
        tg = snapo(w1) + (round(tum * 30) + 15) / 30                       # lingkaran selesai tumbuh kembali jadi wajah penuh
        CLAWD_LINGKAR.update(B=B, u=UC, tg=tg, kepala_layar=(960 * (1 - z1) + 1000 * z1, 540 * (1 - z1) + 190 * z1))
        s1 = CLAWD_LINGKAR["tg"]
        hx, hy = CLAWD_LINGKAR["kepala_layar"]
        FA = (650, 766)                                       # bahu kiri di koordinat footage (matte B1b: puncak bahu x 650 median y 763)
        gx = gabung([[0, hx], [0.08, hx]], jalur("heavy", hx, A[0], 0.08, 0.6, 12), [[t + 0.68, v] for t, v in ikut_zoom(FA, s1 + 0.68, keluar[0], x=True)])
        gy = gabung([[0, hy], [0.08, hy]], jalur("heavy", hy, A[1], 0.08, 0.6, 12), [[t + 0.68, v] for t, v in ikut_zoom(FA, s1 + 0.68, keluar[0], x=False)])
        karakter("Clawd", "claude", UC, 1, s1, end[0], A,
                 [[0, "neutral"], [cl - s1 - 0.05, "excited"], [cl - s1 + 0.7, "neutral"], [dec - s1 + 0.2, "happy"], [keluar[0] - s1 - 0.05, "surprised"]],
                 [[0, -0.125], [0.45, -0.125], [0.8, 0.125], [dec - s1 + 0.1, 0.125], [dec - s1 + 0.5, 0.25], [keluar[0] - s1, 0.25], [keluar[0] - s1 + 0.3, 0.5]],
                 lompat=[(0.08, 0.68, 3.0), (cl - s1, cl - s1 + 0.3, 3.4)], denyut=[(cl - s1, cl - s1 + 0.12, cl - s1 + 0.5, 1.08)],
                 gx=gabung(gx, [[keluar[0] - s1, A[0]]], jalur("leave", A[0], -420, keluar[0] - s1, 0.45, 8)),
                 gy=gabung(gy, [[keluar[0] - s1, A[1]]], jalur("leave", A[1], A[1] + 120, keluar[0] - s1, 0.45, 8)))
    else:
      karakter("Clawd", "claude", 24, 1, 0, end[0], A,
               [[0, "neutral"], [fin + r(0), "surprised"], [fin + r(0) + 0.5, "happy"], [T["b1b"], "neutral"], [cl - 0.05, "excited"], [cl + 0.7, "neutral"], [dec + 0.2, "happy"], [keluar[0] - 0.05, "surprised"]],
               [[0, 0.125], [dec + 0.1, 0.125], [dec + 0.5, 0.25], [keluar[0], 0.25], [keluar[0] + 0.3, 0.5]],
               lompat=[(fin + r(0) + 0.3, fin + r(0) + 0.6, 1.8), (cl, cl + 0.3, 3.4)], kaget=[(fin + r(0), 1.0)], denyut=[(cl, cl + 0.12, cl + 0.5, 1.08)], gx=gx, gy=gy)
    # Irfan 17 Nov: aturan pijakan Clawd juga untuk Codex & Gemini; di hook (FINALLY, dunia repo) hanya Clawd.
    # Codex mendarat di BAHU KANAN tepat di "ChatGPT"; Gemini mendarat DI ATAS KEPALA Codex di "Gemini". Kaki mengikuti zoom kamera (koordinat footage -> layar).
    FCX = (1260, 734)                         # bahu kanan dekat leher (matte B1b: x 1260 median y 731); lebih ke luar bahu sudah menurun ke kursi = tampak melayang
    FGE = (1260, 734 - 118)                   # di atas kepala Codex (sprite Codex u 14 tinggi ±118 px, diukur dari still)
    for nama, model, u, seed, tk, foot, emo_k, lompat_h in (("Codex", "codex", 14, 2, ch, FCX, "excited", 1.4), ("Gemini", "gemini", 12, 3, ge, FGE, "idea", 1.4)):
        m0 = tk - 0.2; k_out = keluar[1] if nama == "Codex" else keluar[2]
        fl = 0.32                                    # jatuh dari atas lalu mendarat (land)
        gx = ikut_zoom(foot, m0, k_out, x=True)
        gy = ikut_zoom(foot, m0, k_out, x=False)
        jt = [round(fl * k / 6, 4) for k in range(7)]
        gy0 = lambda t: next((v for tt, v in reversed(gy) if tt <= t + 1e-9), gy[0][1])
        gy = [[t, round(gy0(t) - 260 * (1 - CURVE["land"](t / fl)), 1)] for t in jt] + [[t, v] for t, v in gy if t > fl]
        last_x, last_y = gx[-1][1], gy[-1][1]
        gx = gx + jalur("leave", last_x, 2250, k_out - m0, 0.45, 8)[1:]
        gy = gy + jalur("leave", last_y, last_y - 160, k_out - m0, 0.45, 8)[1:]
        sudut = [[0, -0.125], [dec - m0 + 0.15, -0.125], [dec - m0 + 0.55, -0.25], [k_out - m0, -0.25]]
        karakter(nama, model, u, seed, m0, end[1] if nama == "Codex" else end[2], foot,
                 [[0, "surprised"], [fl + 0.05, emo_k], [fl + 1.0, "happy"], [k_out - m0 - 0.05, "surprised"]], sudut,
                 lompat=[(fl, fl + 0.3, lompat_h)], denyut=[(fl, fl + 0.15, fl + 0.6, 1.08)], lambai=([(fl + 0.1, fl + 0.9)] if nama == "Codex" else []), gx=gx, gy=gy)

# ====================== hero, slab, cincin ======================
SLAB_W = {"AI SLOP": 1560, "WORKFLOW-NYA": 1700, "BALIK MODAL": 1690, "100% FULL AI": 1700, "LINTAS AGENT": 1560, "DECISION": 840, "SELESAI": 820}


def slab_end(b):
    """akhir lapisan slab = akhir slot teks.json + 0,35 (keluar mulai 0,1 dtk sebelum slot habis), minimal 1,05 dtk tampil
    (masuk 19 f + 0,4 dtk terbaca). AI SLOP: tahan sampai tumpukan runtuh (DESAIN B2b: slab keluar bersama runtuhnya slop)."""
    if b.get("teks_vis") == "AI SLOP": return T["putus"] + 0.3
    if b.get("teks_vis") == "SELESAI": return min(b["t"] + 1.35, T["b1b"] - 0.12)     # SELESAI di depan dunia repo: keluar sebelum dunia berganti ke kamar
    if b.get("depan"): return b["t"] + 1.7                                   # DECISION di depan: sampai Clawd/Claude dkk keluar
    if b.get("tahan"): return round(snap(T["lihat_e"] - 8 / FPS) + 6.5 / FPS, 4)    # LINTAS AGENT: tahan diam ±1,1 dtk (ronde 8 T2); keluar 8 f BERSAMA push dunia B11 (= transisi masuk), selesai tepat saat dunia penuh: 0 frame sisa
    return max(b["t"] + b["dur"] + 0.35, b["t"] + 1.05)
SLAB_Y = {"AI SLOP": 420, "WORKFLOW-NYA": 380, "BALIK MODAL": 400, "100% FULL AI": 380, "LINTAS AGENT": 400, "DECISION": 900, "SELESAI": 720}


def hero(b):
    vis = b.get("teks_vis", b["teks"])
    t0 = b["t"]
    if b["gaya"] == "finally":
        wd = 1460                                          # REVISI-1 B1: huruf raksasa memenuhi x 12–88 %, di belakang kepala (matte), bersamaan zoom-in kamera
        fs = wd / wem(vis, ANT); h = math.ceil(1.1 * fs)
        dur = (T["akhirnya"] + 0.04) - t0
        y0 = b["pos"][1] - 0.55 * fs
        add(b["id"], "KT", dict(teks=vis, kode=b["kode"], gaya="finally", w=wd, h=int(1080 - y0), hTeks=h, keluarAt=round(dur - 12 / 30, 3), seed=1, wt=wt_of(b, vis), rev=2), dur, t0, 230, y0, lubang=True,
            objek=dict(nama="FINALLY", peran="hero", t=t0))
    elif b["gaya"] == "slab":
        wd, end = SLAB_W[vis], slab_end(b)
        fs = wd / wem(vis, ANT); h = math.ceil(1.1 * fs)
        dur = end - t0
        kw = dict(teks=vis, kode=b["kode"], gaya="slab", w=wd, h=h, keluarAt=round(dur - (0.3 if b.get("depan") else 8 / 30 if vis == "LINTAS AGENT" else 0.45), 3), warna="#F97066" if vis == "AI SLOP" else b.get("warna", "#FAF8EC"), wt=wt_of(b, vis))
        xs = ((1920 - wd) / 2) if not b.get("depan") else b["pos"][0] - wd / 2
        if vis == "LINTAS AGENT":       # REVISI-2 R2-4c (Opus): dua bidang 3D berengsel di kepala; kotak selebar frame supaya AGENT yang mendekat tidak terpotong
            h = math.ceil(1.7 * fs); kw.update(persp=True, w=1920, h=h, lebarIsi=wd, rev=7); xs = 0
        if vis == "AI SLOP": kw["getarAt"] = 0.0
        if vis == "100% FULL AI": kw["sapu"] = True
        if b.get("depan"): kw["depan"] = True; kw["rev"] = 2       # REVISI-2 f/g (Opus): mendarat di tempat, tidak meluncur dari tepi kotak
        if not b.get("depan") and vis != "LINTAS AGENT":       # Irfan 17 Nov: hero naik dari tepi BAWAH frame (kotak sampai bawah frame), keluar turun lagi
            kw.update(h=int(1080 - (SLAB_Y[vis] - h / 2)), hTeks=h)
        add(b["id"], "KT", kw, dur, t0, xs, SLAB_Y[vis] - h / 2, lubang=not b.get("depan"), objek=dict(nama=vis, peran=("slab-di-depan" if b.get("depan") else "slab-di-belakang-kepala"), t=t0))
        if b.get("sisip"):   # kata ucapan yang tidak muat di slab: R1 kecil di bawah slab sisi kiri, tampil saat diucapkan (Lantai A1)
            k = W.idx(b["sisip"], t0 - 0.05)
            ts, te = W.U[k]["s"], W.U[k]["e"]
            size = 84; w = wem(b["sisip"], POP7) * size * 0.98 + 140; hh = size * 1.8
            add(b["id"] + "_" + b["sisip"], "KT", dict(teks=b["sisip"], kode="T19", gaya="r1", w=int(w), h=int(hh), size=size), max(0.6, te - ts + 0.45), ts,
                520 - w / 2, SLAB_Y[vis] + h / 2 + 30 - hh / 2)
    elif b["gaya"] == "busur":
        r = TK.RING[b["teks"]]
        size = r["size"]
        wpct = wem(b["teks"], POP8) * size - 4 * len(b["teks"])
        _, plen = TK.arch_at(50)
        end = T["decision"] + 1.2 if b["teks"] == "decision" else T["decision"] + 0.6
        dur = end - t0
        pct = wpct / plen * 100
        pts = []
        for p in range(int(r["mulai"] - 3), int(r["mulai"] + r["geser"] + pct + 4)):
            pts.append(TK.arch_at(p)[0])
        xs, ys = [q[0] for q in pts], [q[1] for q in pts]
        m = int(size * 1.6) + 60
        bx, by = max(0, min(xs) - m), max(0, min(ys) - m)
        bw, bh = min(1920, max(xs) + m) - bx, min(1080, max(ys) + m) - by
        d = "M150 1010 C40 390 430 195 900 195 C1370 195 1800 390 1690 1010"
        # path digeser ke koordinat kotak: terjemahkan titik kontrol
        pts_c = TK.ARCH
        tr = lambda p: f"{p[0] - bx} {p[1] - by}"
        d2 = f"M{tr(pts_c[0])} C{tr(pts_c[1])} {tr(pts_c[2])} {tr(pts_c[3])} C{tr(pts_c[4])} {tr(pts_c[5])} {tr(pts_c[6])}"
        add(b["id"], "KT", dict(teks=b["teks"], kode=b["kode"], gaya="busur", w=int(bw), h=int(bh), size=size, seed={"workflow": 1, "AI model": 2, "decision": 3}[b["teks"]],
                                busur=dict(d=d2, mulai=r["mulai"], geser=r["geser"]), keluarAt=round(dur - 0.35, 3), wt=wt_of(b, b["teks"])), dur, t0, bx, by, lubang=True,
            objek=dict(nama=b["teks"], peran="kata-cincin", t=t0))


def kt(b):
    g, vis = b["gaya"], b.get("teks_vis", b["teks"])
    t0, dur = b["t"], b["dur"]
    cx, cy = b["pos"]
    if g == "r1":
        size = 84; w = wem(vis, POP7) * size * 0.98 + 140; h = size * 1.8
        kw = dict(teks=vis, kode="T19", gaya="r1", w=int(w), h=int(h), size=size, gelap=bool(b.get("gelap")), wt=wt_of(b, vis))
        if b.get("gelapAt") is not None: kw["gelapAt"] = b["gelapAt"]
        add(b["id"], "KT", kw, round(dur - 0.04, 3), t0, cx - w / 2, cy - h / 2)    # -1 frame: tidak menempel blok berikutnya setelah snap 29,97
    elif g == "r2":
        size = b.get("ukuran", 88); w = (wem(vis, POP8) * size) * 2.1 + 80; h = size * 2.7
        kw = dict(teks=vis, kode="T03", gaya="r2", w=int(w), h=int(h), size=size, gelap=bool(b.get("gelap")), wt=wt_of(b, vis), rev=3)
        if b.get("warna"): kw["warna"] = b["warna"]
        add(b["id"], "KT", kw, max(dur, 0.1), t0, cx - w / 2, cy - h / 2, objek=dict(nama=vis, peran="kata-kunci-slam", t=t0))
    elif g == "r3":
        size = b.get("ukuran", 96); w = wem(vis, POP8) * size + size * 1.2; h = size * 2.0
        add(b["id"], "KT", dict(teks=vis, kode="T25", gaya="r3", w=int(w), h=int(h), size=size, gelap=bool(b.get("gelap")), warna=b.get("warna"), wt=wt_of(b, vis), rev=2), max(dur + b.get("tahan", 0), 0.1), t0, cx - w / 2, cy - h / 2,
            objek=dict(nama=vis, peran="kata-kacau", t=t0))
    elif g == "viral":
        size = 150; w = wem("VIRAL!!", POP8) * size + 300; h = size * 2.0
        end = T["putus"] - 0.5
        add(b["id"], "KT", dict(teks=b["teks_vis"], kode="T25", gaya="viral", rev=2, w=int(w), h=int(h), size=size, bekuAt=round(T["slop"] - t0, 3), keluarAt=round(end - t0 - 0.4, 3)), end - t0, t0, cx - w / 2, cy - h / 2,
            objek=dict(nama="VIRAL!!", peran="slop-teks", t=t0))
    elif g == "putus":
        size = 124; w = wem("putus-putus", POP8) * size + 300; h = size * 2.0
        end = T["putus_e"] + 0.1
        add(b["id"], "KT", dict(teks="putus-putus", kode="T25", gaya="putus", w=int(w), h=int(h), size=size, warna=b.get("warna", "#FAF8EC"), rev=2), end - t0, t0, cx - w / 2, cy - h / 2,
            objek=dict(nama="putus-putus", peran="kata-terputus", t=t0))
    elif g == "kartu":
        return                                            # angka tampil di kartu (bangun kartu())
    elif g == "bubble":
        size = 56 if b["sisi"] == "kanan" else 60
        w = wem(vis, POP7) * size + size * 0.5 + 22 + 80 + 80 + 90; h = size * 1.15 + 48 + 80 + 60
        x = cx - w / 2
        if b["sisi"] == "kanan": x = min(x, 1824 - w)
        else: x = max(x, 96)
        end = DURASI + 0.04                                # menutup frame terakhir (audit R6); batas compose total + 0,05
        pre = 14 / FPS                                      # titik-titik mengetik 0,47 dtk SEBELUM kata diucapkan; teks tampil <= 2 f setelah onset (audit V11)
        t0b = t0 - pre
        add(b["id"], "KT", dict(teks=vis, kode="T09", gaya="bubble", w=int(w), h=int(h), size=size, sisi=b["sisi"], keluarAt=round(end - t0b + 2, 2), wt=[round(v + pre, 3) for v in wt_of(b, vis)]), end - t0b, t0b, x, cy - h / 2,
            objek=dict(nama=vis, peran="bubble-pilihan", t=t0))


def komentar():
    """REVISI-1 B10: kartu komentar penonton (teks diberikan Irfan) menggantikan bubble chat; satu per satu di kiri/kanan wajah, bertahan sampai akhir"""
    end = DURASI + 0.04
    for id_, nama, teks, sisi, t0, warna in (("KOM1", "@pengguna_1", "Lumayan nih", "kiri", T["profesional"], "#9AA3B2"), ("KOM2", "@pengguna_2", "masih AI slop", "kanan", T["masih2"], "#B8A58E")):
        size = 56
        wt_ = wem(teks, POP7) * size
        w = int(wt_ + 64 + 22 + 24 + 36 + 80 + 20); h = int(22 + size * 1.12 + 28 + 4 + 24 + 80)
        x = 56 if sisi == "kiri" else 1920 - 56 - w
        add(id_, "Komentar", dict(nama=nama, teks=teks, sisi=sisi, warna=warna, w=w, h=h, size=size), end - t0, t0, x, 790 - h / 2, objek=dict(nama=f"komentar penonton '{teks}'", peran="komentar-muncul", t=t0))


# ====================== B2: tumpukan slop + grade ======================
def slop():
    sl = T["slop"]
    runtuh0 = T["b2b"] + 0.08
    items = [  # id, jenis, waktu muncul, pusat (x,y), ukuran badan (w,h), rot
        ("S01", "gradien", T["viral"] + 0.05, (230, 1010), (440, 230), -6), ("S02", "api", T["viral"] + 0.2, (190, 560), (200, 240), -8),
        ("S03", "bingkai", T["ngedit"], (960, 540), (1920, 1080), 0), ("S04", "panah", T["ngedit"] + 0.15, (430, 290), (360, 200), 20),
        ("S05", "kaget", T["ngedit"] + 0.45, (1700, 640), (200, 200), 10), ("S06", "gradien", T["tapi"] + 0.1, (1700, 1010), (440, 230), 6),
        ("S07", "stiker", T["tapi"] + 0.2, (160, 760), (290, 290), 10), ("S08", "flare", T["tapi"] + 0.7, (1650, 560), (400, 400), 0),
        ("S09", "api", T["tapi"] + 1.0, (1790, 500), (190, 230), 12), ("S10", "kaget", T["hasilnya"] - 0.3, (250, 360), (170, 170), -12),
        ("S11", "glow", T["hasilnya"], (150, 140), (420, 420), 0), ("S12", "kilau", T["hasilnya"] + 0.2, (1290, 940), (120, 120), 0),
        ("S13", "stiker", T["hasilnya"] + 0.5, (1640, 810), (260, 260), 14), ("S14", "panah", T["hasilnya"] + 0.65, (1540, 520), (320, 180), 200)]
    PAD = 60
    for k, (id_, jenis, t0, (cx, cy), (bw, bh), rot) in enumerate(items):
        t0 = snap(t0)
        runtuh_t = runtuh0 + (0, 0.15, 0.34, 0.08, 0.25, 0.02, 0.2, 0.12, 0.36, 0.28, 0.05, 0.4, 0.17, 0.32)[k]
        end = runtuh_t + 0.95
        if jenis == "bingkai":
            add(id_, "Slop", dict(jenis=jenis, rev=2, seed=k + 1, w=1920, h=1080, hb=1080, rot=0, bekuAt=round(sl - t0, 3), runtuhAt=round(runtuh_t - t0, 3), jatuh=1300), end - t0, t0, 0, 0,
                objek=dict(nama="bingkai neon", peran="slop-dekor", t=t0))
            continue
        x0, y0 = cx - bw / 2 - PAD, cy - bh / 2 - PAD
        w = bw + 2 * PAD
        h = int(1080 - y0)                                    # kotak sampai dasar frame: runtuh keluar bawah tanpa terpotong
        jatuh = h - PAD - bh + 60
        nama = {"gradien": "gradien ungu-pink", "api": "emoji api", "kaget": "emoji kaget", "panah": "panah merah", "stiker": "stiker !!", "flare": "lens flare", "glow": "glow", "kilau": "kilau"}[jenis]
        add(id_, "Slop", dict(jenis=jenis, seed=k + 1, w=int(w), h=h, hb=int(bh), rot=rot, bekuAt=round(sl - t0, 3), runtuhAt=round(runtuh_t - t0, 3), jatuh=int(jatuh)), end - t0, t0, x0, y0,
            objek=dict(nama=nama, peran="slop-dekor", t=t0))
    add("GRADE", "Slop", dict(jenis="grade", seed=99, w=1920, h=1080, hb=1080, rot=0, bekuAt=99, runtuhAt=99, jatuh=0), T["b3a"] - sl, sl, 0, 0, lubang=True,
        objek=dict(nama="grade -15%", peran="grade", t=sl))


# ====================== dunia layar penuh (MG63): repo+timeline, app Claude, dua jendela ======================
def dunia():
    # B1: dunia repo + lingkaran wajah
    w1 = T["akhirnya"]; dur1 = round(T["b1b"] + 0.2 - w1, 2)
    kun = dict(lift=0.5, geser=0.7, tekan=round(T["selesai"] - 0.12 - w1 - 0.0 - 0.2, 3), selesai=round(T["selesai"] + 0.07 - w1, 3), keluar=round(dur1 - 0.5, 3))
    kun["tekan"] = round(kun["selesai"] - 0.46, 3)
    add("D_REPO", "DuniaRepo", dict(w=1920, h=1080, rev=5, kunci=kun), dur1, w1, 0, 0, opaque=True, objek=dict(nama="halaman repo + timeline", peran="dunia-transisi", t=w1))
    tum = round(dur1 - 0.48, 3)
    z0 = zoom_at(w1); B = CLAWD_LINGKAR["B"]
    # Clawd: posisi layar di bahu kanan -> koordinat footage Lingkar (p=0: layar = 960(1-z)+X z, 540(1-z)+Y z); berpijak di rambut (matte: puncak rambut x 1000 ±y 150–205)
    cl = dict(u=round(CLAWD_LINGKAR["u"] / z0, 3), x0=round((B[0] - 960 * (1 - z0)) / z0, 1), y0=round((B[1] - 540 * (1 - z0)) / z0, 1), x1=1000, y1=190,
              sampai=round(tum + 15 / 30, 3), besar=1.6)
    add("D_REPO_WAJAH", "Lingkar", dict(w=1920, h=1080, rev=3, t0=snap(w1), tumbuhAt=tum, z0=round(z0, 4), z1=round(zoom_at(w1 + dur1 + 0.15), 4), clawd=cl), dur1 + 0.15, w1, 0, 0,
        objek=dict(nama="lingkaran wajah", peran="wajah-lingkaran", t=w1))
    # B3: aplikasi Claude
    w3 = snap(T["b3a"] - 0.1); dur3 = round(T["gimana"] - 0.1 - w3 + 0.75, 2)
    ap, ci = T["apple"] - w3, T["cinematic"] - w3
    kun3 = dict(klik=1.0, slash=round(T["template"] - w3, 3), apple=round(ap, 3), aKlik=round(ap + 0.95, 3), bs=round(ap + 1.2, 3), cine=round(ci, 3), cKlik=round(ci + 1.35, 3), hapus=round(T["ngebalik"] - w3, 3), keluar=round(T["gimana"] - 0.1 - w3, 3))
    add("D_APP", "AppClaude", dict(w=1920, h=1080, rev=8, kunci=kun3), dur3, w3, 0, 0, opaque=True, objek=dict(nama="aplikasi Claude terang", peran="dunia-transisi", t=w3))
    add("D_APP_WAJAH", "Lingkar", dict(w=1920, h=1080, rev=3, t0=w3, tumbuhAt=round(kun3["keluar"] + 0.04, 3), z0=round(zoom_at(w3), 4), z1=round(zoom_at(w3 + dur3 + 0.1), 4)), dur3 + 0.1, w3, 0, 0,
        objek=dict(nama="lingkaran wajah", peran="wajah-lingkaran", t=w3))
    for nm, tt in (("saran /apple-style", w3 + kun3["apple"] + 0.42), ("klik /apple-style", w3 + kun3["aKlik"]), ("saran /cinematic-storytelling", w3 + kun3["cine"] + 0.64), ("klik /cinematic-storytelling", w3 + kun3["cKlik"]), ("teks diketik dihapus", T["ngebalik"])):
        L.append(dict(id="O_" + nm, comp="-", props={}, durasi=0, t=tt, x=0, y=0, gerak=None, lubang=False, opaque=False, objek=dict(nama=nm, peran="item-ui", t=tt), skip=True))
    # B6b REVISI-1 B10a: meja kerja hangat + timeline editor, Claude menyeret blok teks "kayak gimana?" tepat di onset kata; wajah di lingkaran
    s0 = snapo(T["b6b"]); wi0 = snapo(T["udah"] - 0.05); dure = round((wi0 - s0) * 30) / 30
    kk = round(T["kayak_v"] - s0, 3)
    # SLOT b10a_meja3d (Blender dikerjakan Codex terpisah): bila /mnt/.../b10a/out/b10a.mov ada, dirakit sebagai lapisan opaque pada jendela kalimat; bila belum, footage wajah biasa (dasar)
    SLOT = "/mnt/storage-projects/skill-dev-journey/b10a/out/b10a.mov"
    if os.path.exists(SLOT):
        SLOT_L.append(dict(id="b10a_meja3d", src=SLOT, t=s0, x=0, y=0))
    # Irfan 17 Nov: tanpa lingkaran wajah di shot meja 3D; Irfan bicara dari timeline di monitor (slot Blender langsung berganti ke postingan IG)
    L.append(dict(id="O_slot b10a", comp="-", props={}, durasi=0, t=s0, x=0, y=0, gerak=None, lubang=False, opaque=False, objek=dict(nama="slot b10a_meja3d (meja 3D, onset 'kayak gimana?')", peran="slot-opaque", t=s0 + kk), skip=True))
    # B6b REVISI-1 B10: postingan Instagram desktop (frame video mengecil masuk, footage berjalan, komentar acak pop-up)
    wi = snapo(T["udah"] - 0.05); duri = round((DURASI - wi) * 30) / 30
    k1 = round(T["masih2"] - wi, 3)
    k2 = round(W.s("AI?", T["masih2"]) - wi, 3)          # komentar kedua pop di "AI?" (urutan Irfan: "masih kerasa AI slop" lalu "Keren editan profesional")
    add("D_IG", "DuniaIG", dict(w=1920, h=1080, rev=6, t0=snapo(wi), z0=round(zoom_at(wi), 4), kunci=dict(k1=k1, k2=k2, field=round(T["comment_w"] - wi, 3))), duri, wi, 0, 0, opaque=True,
        objek=dict(nama="postingan Instagram desktop", peran="dunia-transisi", t=wi))
    for nm, tt in (("komentar 'masih kerasa AI slop'", T["masih2"]), ("komentar 'Keren editan profesional'", W.s("AI?", T["masih2"])), ("kolom Add a comment", T["comment_w"])):
        L.append(dict(id="O_" + nm, comp="-", props={}, durasi=0, t=tt, x=0, y=0, gerak=None, lubang=False, opaque=False, objek=dict(nama=nm, peran="item-ui", t=tt), skip=True))
        # B5b: dunia Mac
    pre, post = 8, 8
    w5 = T["lihat_e"]; w5s = snap(w5 - pre / FPS)
    dun = round(T["sini_e"] - w5 - 0.0, 3)
    s_ = lambda txt, a, n=0: W.s(txt, a, n) - w5
    kun5 = dict(ketik1=round(s_("ChatGPT", 59.9), 3), pesan1=round(s_("koordinasi", 60), 3), amplop1=round(s_("ke", 61), 3), ketik2=round(s_("ke", 61) + 0.9, 3),
                pesan2=round(s_("dikoordinasi", 62) + 0.4, 3), amplop2=round(s_("sebaliknya", 63), 3), pesan3=round(s_("session", 64) + 0.3, 3), catat=round(s_("kesalahan", 67), 3),
                loop=round(s_("loop", 70), 3), selesai=round(s_("pembelajaran", 70) + 0.35, 3), keluar=round(dun - 0.3, 3))
    add("D_RELAY", "RelayDunia", dict(w=1920, h=1080, rev=21, pre=pre, post=post, preT0=w5s, postT0=snap(T["sini_e"]), zPre=round(zoom_at(w5s), 4), kunci=kun5), dun + (pre + post) / FPS, w5s, 0, 0, opaque=True,
        objek=dict(nama="desktop Mac + jaringan agen", peran="dunia-transisi", t=w5))
    lA = min(0.35, max(0.3, kun5["ketik1"] - 0.5)); lD = kun5["pesan3"] - 0.35; tb = kun5["catat"] + 0.55
    for nm, tt in (("papan ChatGPT lahir (2,5D, tajam)", w5 + lA), ("pesan doctor.sh gagal", w5 + kun5["pesan1"]), ("aliran titik ChatGPT ke Claude (pesan langsung)", w5 + kun5["amplop1"]), ("papan Claude lahir, ChatGPT mundur", w5 + kun5["amplop1"] + 0.05),
                   ("pesan Sudah kujalankan doctor --fix", w5 + kun5["pesan2"]), ("aliran titik Claude ke ChatGPT", w5 + kun5["amplop2"]), ("papan session B lahir, papan lain mundur", w5 + lD), ("pesan Revisi kamera selesai", w5 + kun5["pesan3"]),
                   ("kartu Dicatat ditulis", w5 + kun5["catat"]), ("kartu Dicatat terbang ke rak skill-development", w5 + tb), ("papan session C lahir, membaca kartu baru (berkas lavender)", w5 + max(tb + 0.95 + 0.35, kun5["loop"] - 0.55)),
                   ("centang hijau (langsung benar)", w5 + kun5["selesai"]), ("jaringan tumbuh: agen kecil membaca rak", w5 + kun5["selesai"] - 0.1)):
        L.append(dict(id="O_" + nm, comp="-", props={}, durasi=0, t=tt, x=0, y=0, gerak=None, lubang=False, opaque=False, objek=dict(nama=nm, peran="item-ui", t=tt), skip=True))


# ====================== B4b: kartu paket ======================
def kartu():
    # Label = nama paket ASLI di UI (Lantai D20): ChatGPT "Pro", Claude "Max"; ucapan "Pro Max"/"Claude Pro" tetap di KT R1.
    # Sisi kanan = dinding kosong di B4b (wajah sedikit kiri dari tengah); kartu terbang dari tepi kanan, menghadap pembicara.
    for id_, model, label, angka, tl, fin_xy in (("KARTU1", "chatgpt", "ChatGPT Pro", 20, T["dua0"], (1290, 160)), ("KARTU2", "claude", "Claude Max", 5, T["lima"], (170, 440))):
        fl = 0.45
        t0 = tl - fl + 0.02
        end = T["gitu_b4"]
        w, h = 460 + 180, 400 + 180
        fx, fy = fin_xy[0] - 90, fin_xy[1] - 90
        sg = 1 if model == "chatgpt" else -1             # ChatGPT terbang dari kanan, Claude dari kiri: kartu mengapit Irfan (REVISI-2 R2-4b)
        gx = gabung(jalur("land", fx + sg * 900, fx, 0, fl, 12), [[fl + 0.2, fx]], [[end - t0 - 0.3, fx]], jalur("leave", fx, fx + sg * 900, end - t0 - 0.3, 0.3, 6))
        gy = jalur("heavy", fy + 120, fy, 0, fl, 8)
        add(id_, "Kartu", dict(model=model, label=label, angka=angka, w=w, h=h, terbang=fl, jarak=900, kanan=(model == "chatgpt"), rev=6), end - t0, t0, fx, fy, dict(x=gx, y=gabung(gy, [[end - t0, fy]])),
            objek=dict(nama=f"kartu {label} {angka}x", peran="kartu-mendarat", t=tl))


def main():
    only_l = "--lubang" in sys.argv
    TK.json.dump(TK.bangun(), open(os.path.join(P, "teks.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    bl = json.load(open(os.path.join(P, "teks.json"), encoding="utf-8"))
    bangun_karakter()
    for b in bl:
        if b["peran"] == "R6" or b["gaya"] == "busur": hero(b)
    slop()
    kartu()
    if DUNIA: dunia()
    for b in bl:
        if not (b["peran"] == "R6"): kt(b)
    # urutan tumpuk (z): lubang/slab/cincin/grade/kartu/karakter/slop/KT kecil
    zorder = {"busur": 0, "GRADE": 1, "slab": 2, "Kartu": 3, "Karakter": 4, "Slop": 5}
    def z(l):
        if l["comp"] in ("DuniaRepo", "AppClaude", "RelayDunia"): return -2
        if l["comp"] == "Lingkar": return -1
        if l["id"].startswith("T") and l["props"].get("gaya") == "busur": return 0
        if l["id"] == "GRADE": return 1
        if l["props"].get("gaya") == "slab": return 2
        if l["comp"] == "Kartu": return 3
        if l["comp"] == "Karakter": return 4
        if l["comp"] == "Slop": return 5
        if l["comp"] == "Komentar": return 7
        if l["props"].get("depan"): return 6
        if l["props"].get("gaya") in ("bubble",): return 7
        return 6
    L.sort(key=lambda l: (z(l), l["t"]))
    SK = [l for l in L if l.get("skip")]; L[:] = [l for l in L if not l.get("skip")]
    # audit ronde 7 W1: jeda 1–5 frame antar blok KT berurutan = kedip -> blok sebelumnya DITAHAN (tanpa animasi keluar) sampai blok berikutnya masuk; onset tidak berubah
    _LV = {"r1": 5, "r2": 5, "r3": 6, "putus": 6, "bubble": 6, "viral": 6}
    ktl = sorted([l for l in L if l["comp"] == "KT" and l["props"].get("gaya") in _LV], key=lambda l: l["t"])
    for a, b in zip(ktl, ktl[1:]):
        pa = a["props"]; ka = pa.get("keluarAt"); d = a["durasi"]
        if ka is not None and ka >= d: continue
        vis = a["t"] + (ka if ka is not None else d - (_LV[pa["gaya"]] - 2) / 30)
        if 0.5 <= (b["t"] - vis) * FPSO < 5.5:      # Irfan 17 Nov: blok lama keluar (fade+blur+naik 7 f) BERSAMAAN blok baru masuk, bukan hilang di frame yang sama
            ka2 = round(round((b["t"] - a["t"]) * 30 - 5) / 30, 4); nd = round(ka2 + 7 / 30, 4)    # keluar mulai 5 f sebelum blok baru: hanya ±2 f silang di opacity rendah (sampling: 7 f silang = teks bertumpuk)
            a["durasi"] = nd; a["props"] = dict(pa, durasi=nd, keluarAt=ka2)
    os.makedirs(os.path.join(P, "lego"), exist_ok=True)
    json.dump([dict(id=l["id"], comp=l["comp"], props=l["props"], durasi=l["durasi"]) for l in L if not l["opaque"]], open(os.path.join(P, "lego/lapisan.json"), "w"), indent=1, ensure_ascii=False)
    json.dump([dict(id=l["id"], comp=l["comp"], props=l["props"], durasi=l["durasi"]) for l in L if l["opaque"]], open(os.path.join(P, "lego/lapisan_opaque.json"), "w"), indent=1, ensure_ascii=False)
    lock_p = os.path.join(P, "lego/lapisan.lock.json")
    lock = json.load(open(lock_p)) if os.path.exists(lock_p) else {}
    lap = []
    for l in L:
        src = lock.get(l["id"])
        if l["lubang"] and src:
            ok = os.path.join(P, "lego/cache", os.path.basename(src).replace(".mov", f"-lubangz-{int(l['t']*1000)}-{l['x']}-{l['y']}.mov"))
            src = os.path.relpath(ok, os.path.join(P, "lego")) if os.path.exists(ok) else None
        elif src:
            src = os.path.relpath(os.path.join(P, src), os.path.join(P, "lego"))
        e = dict(id=l["id"], src=src or "BELUM", t=l["t"], x=l["x"], y=l["y"])
        if l["gerak"]: e["gerak"] = l["gerak"]
        lap.append(e)
    for sl in SLOT_L:
        lz = [i for i, l in enumerate(L) if l["comp"] in ("Lingkar", "DuniaRepo", "AppClaude", "RelayDunia")]
        ix = (max(lz) + 1) if lz else 0          # di atas dunia & lingkaran, di bawah KT/karakter; D_IG (z 6) tetap menutupnya
        lap.insert(ix, dict(id=sl["id"], src=sl["src"], t=sl["t"], x=0, y=0))
    lego = dict(fps=FPSO, w=1920, h=1080, dasar=dasar(), lapisan=[e for e in lap if e["src"] != "BELUM"], audio=f"../{W.EDIT}/suara.wav", keluar="out/final.mp4", crf=16)
    lego["belum_dirender"] = [e["id"] for e in lap if e["src"] == "BELUM"]
    lego["slot_b10a_meja3d"] = "terisi" if SLOT_L else "kosong (footage wajah biasa; menunggu /mnt/storage-projects/skill-dev-journey/b10a/out/b10a.mov)"
    json.dump(lego, open(os.path.join(P, "lego/lego.json"), "w"), indent=1, ensure_ascii=False)
    mg = {k: v for k, v in lego.items() if k != "audio"}; mg.update(keluar="../qc/master_gambar.mp4", crf=14)      # master gambar: lego tanpa audio
    json.dump(mg, open(os.path.join(P, "lego/lego_master_gambar.json"), "w"), indent=1, ensure_ascii=False)
    objs = [dict(nama=l["objek"]["nama"], peran=l["objek"]["peran"], t=round(l["objek"]["t"], 3), frame=round(l["objek"]["t"] * FPSO), lapisan=l["id"]) for l in L + SK if l.get("objek")]
    objs.sort(key=lambda o: o["t"])
    json.dump(objs, open(os.path.join(P, "objects.json"), "w"), indent=1, ensure_ascii=False)
    print(f"{len(L)} lapisan ({sum(1 for l in L if l['lubang'])} dengan lubang) · lego.json: {len(lego['lapisan'])} berisi src · objects.json {len(objs)}")
    if only_l:
        import lubang
        for l in L:
            if not l["lubang"] or l["id"] not in lock: continue
            src = os.path.join(P, lock[l["id"]])
            out = os.path.join(P, "lego/cache", os.path.basename(src).replace(".mov", f"-lubangz-{int(l['t']*1000)}-{l['x']}-{l['y']}.mov"))
            if not os.path.exists(out):   # matte ikut zoom kamera dasar (zoom_at), bukan matte mentah
                lubang.potong_zoom(src, l["t"], l["x"], l["y"], out, zoom_at); print("lubang", l["id"])
        print("jalankan ulang tanpa --lubang untuk mengisi lego.json")


if __name__ == "__main__":
    main()
