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


L = []          # lapisan: dict(id, comp, props, durasi, t, x, y, gerak, lubang, opaque, catatan)


def add(id, comp, props, durasi, t, x, y, gerak=None, lubang=False, opaque=False, objek=None):
    t = snap(t); durasi = max(0.2, round(durasi * FPS) / FPS)
    props = dict(props, durasi=durasi)
    L.append(dict(id=id, comp=comp, props=props, durasi=durasi, t=t, x=int(round(x)), y=int(round(y)), gerak=gerak, lubang=lubang, opaque=opaque, objek=objek))


# ====================== dasar footage (kamera dikerjakan ffmpeg) ======================
def dasar():
    b = [0, T["finally"], T["finally"] + 0.3, T["b1b"], T["decision"] - 0.25, T["b2a"], T["b2b"], T["b3a"], T["b4a"], T["b4b"], T["b5a"], T["b5b"], T["b6a"], T["b6b"], DURASI]
    z = [(1.00, 1.02, "drift"), (1.02, 1.12, "heavy"), (1.12, 1.06, "drift"), (1.00, 1.02, "drift"), (1.02, 1.06, "heavy"), (1.00, 1.03, "drift"),
         (1.03, 1.00, "drift"), (1.00, 1.04, "drift"), (1.00, 1.08, "drift"), (1.08, 1.10, "drift"), (1.00, 1.04, "drift"), (1.00, 1.03, "drift"),
         (1.00, 1.05, "drift"), (1.00, 1.04, "drift")]
    out = []
    bs = [snap(x) for x in b[:-1]] + [DURASI]
    for i, (a, c) in enumerate(zip(bs, bs[1:])):
        out.append({"src": f"../{W.EDIT}/wajah.mp4", "in": round(a, 4), "dur": round(c - a, 4) if i == len(z) - 1 else round(round((c - a) * FPS) / FPS, 4),
                    "kamera": {"zoom": [z[i][0], z[i][1]], "pusat": [0.5, 0.45], "kurva": z[i][2]}})
    return out


ZB = None


def zoom_at(t):
    cl = dasar()
    for c in cl:
        a, d = c["in"], c["dur"]
        if a - 1e-6 <= t <= a + d + 1e-6:
            z0, z1 = c["kamera"]["zoom"]
            k = CURVE.get(c["kamera"]["kurva"], CURVE["drift"])(min(1, max(0, (t - a) / d)))
            return z0 + (z1 - z0) * k
    return 1.0


# ====================== karakter ======================
def kotak(u):
    return math.ceil(22 * u) + 80, math.ceil(20 * u) + 80


def karakter(nama, model, u, seed, mulai, selesai, foot, emosi, sudut, lompat=(), kaget=(), denyut=(), lambai=(), gx=None, gy=None):
    w, h = kotak(u)
    fx, fy = foot
    props = dict(model=model, u=u, seed=seed, emosi=emosi, sudut=sudut, lompat=list(lompat), kaget=list(kaget), denyut=list(denyut), lambai=list(lambai), kamar=True)
    ox, oy = w / 2, 17 * u + 40
    g = {}
    if gx: g["x"] = [[t, round(v - ox, 1)] for t, v in gx]
    if gy: g["y"] = [[t, round(v - oy, 1)] for t, v in gy]
    add(f"K_{nama}", "Karakter", props, selesai - mulai, mulai, fx - ox, fy - oy, g or None,
        objek=dict(nama=nama.rstrip("0"), peran="karakter", t=mulai))


def bangun_karakter():
    r = lambda i: W.FPS and (0, 0.13, 0.30)[i]
    fin, ch, cl, ge, dec = T["finally"], T["chatgpt1"], T["claude1"], T["gemini1"], T["decision"]
    keluar = [T["b2a"] + 0.4, T["b2a"] + 0.65, T["b2a"] + 0.88]      # bergiliran, sebelum "viral"
    end = [k + 0.45 for k in keluar]
    # Clawd: kiri bawah dekat bahu; bergeser memberi ruang untuk FINALLY lalu kembali
    A, B = (460, 790), (1590, 1000)          # B: Clawd melompat ke dada kanan bawah, memberi ruang FINALLY dan menyeimbangkannya
    gx = gabung([[0, A[0]], [fin - 0.08, A[0]]], jalur("heavy", A[0], B[0], fin - 0.08, 0.5), [[T["b1b"] - 0.2, B[0]]], jalur("land", B[0], A[0], T["b1b"] - 0.2, 0.7),
                [[keluar[0], A[0]]], jalur("leave", A[0], -420, keluar[0], 0.45, 8))
    gy = gabung([[0, A[1]], [fin - 0.08, A[1]]], jalur("heavy", A[1], B[1], fin - 0.08, 0.5), [[T["b1b"] - 0.2, B[1]]], jalur("land", B[1], A[1], T["b1b"] - 0.2, 0.7),
                [[keluar[0], A[1]]], jalur("leave", A[1], A[1] + 120, keluar[0], 0.45, 8))
    if DUNIA:   # Clawd terbang masuk ke dunia repo (lapisan dunia memuat Clawd yang mengedit), kembali ke kamar di B1b
        w0, off = T["akhirnya"] - 0.1, (1500, 1180)
        gx = gabung([[0, A[0]], [fin - 0.08, A[0]]], jalur("heavy", A[0], B[0], fin - 0.08, 0.5), [[w0, B[0]]], jalur("leave", B[0], off[0], w0, 0.4, 8))
        gy = gabung([[0, A[1]], [fin - 0.08, A[1]]], jalur("heavy", A[1], B[1], fin - 0.08, 0.5), [[w0, B[1]]], jalur("leave", B[1], off[1], w0, 0.4, 8))
        karakter("Clawd0", "claude", 24, 1, 0, w0 + 0.45, A, [[0, "neutral"], [fin, "surprised"], [fin + 0.5, "happy"]], [[0, 0.125], [w0, 0.125], [w0 + 0.3, 0.25]],
                 lompat=[(fin + 0.3, fin + 0.6, 1.8)], kaget=[(fin, 1.0)], gx=gx, gy=gy)
        s1 = T["b1b"] - 0.05
        gx = gabung([[0, off[0]]], jalur("land", off[0], A[0], 0, 0.75, 12))
        gy = gabung([[0, off[1]]], jalur("land", off[1], A[1], 0, 0.75, 12))
        gx = [[t, v] for t, v in gx]; gy = [[t, v] for t, v in gy]
        karakter("Clawd", "claude", 24, 1, s1, end[0], A,
                 [[0, "neutral"], [cl - s1 - 0.05, "excited"], [cl - s1 + 0.7, "neutral"], [dec - s1 + 0.2, "happy"], [keluar[0] - s1 - 0.05, "surprised"]],
                 [[0, 0.125], [dec - s1 + 0.1, 0.125], [dec - s1 + 0.5, 0.25], [keluar[0] - s1, 0.25], [keluar[0] - s1 + 0.3, 0.5]],
                 lompat=[(cl - s1, cl - s1 + 0.3, 3.4)], denyut=[(cl - s1, cl - s1 + 0.12, cl - s1 + 0.5, 1.08)],
                 gx=gabung(gx, [[keluar[0] - s1, A[0]]], jalur("leave", A[0], -420, keluar[0] - s1, 0.45, 8)),
                 gy=gabung(gy, [[keluar[0] - s1, A[1]]], jalur("leave", A[1], A[1] + 120, keluar[0] - s1, 0.45, 8)))
    else:
      karakter("Clawd", "claude", 24, 1, 0, end[0], A,
               [[0, "neutral"], [fin + r(0), "surprised"], [fin + r(0) + 0.5, "happy"], [T["b1b"], "neutral"], [cl - 0.05, "excited"], [cl + 0.7, "neutral"], [dec + 0.2, "happy"], [keluar[0] - 0.05, "surprised"]],
               [[0, 0.125], [dec + 0.1, 0.125], [dec + 0.5, 0.25], [keluar[0], 0.25], [keluar[0] + 0.3, 0.5]],
               lompat=[(fin + r(0) + 0.3, fin + r(0) + 0.6, 1.8), (cl, cl + 0.3, 3.4)], kaget=[(fin + r(0), 1.0)], denyut=[(cl, cl + 0.12, cl + 0.5, 1.08)], gx=gx, gy=gy)
    # Codex (bunga >_): kanan atas bahu
    C = (1450, 650)
    wc = (1540, 640)
    if DUNIA:   # melayang dekat lingkaran wajah (menonton), kembali ke kamar di B1b
        a1, a2 = T["akhirnya"] + 0.1, T["akhirnya"] + 0.7
        r0, r1 = T["b1b"] - 0.25, T["b1b"] + 0.6
        gx = gabung([[0, C[0]], [a1, C[0]]], jalur("land", C[0], wc[0], a1, 0.6), [[r0, wc[0]]], jalur("land", wc[0], C[0], r0, 0.85), [[keluar[1], C[0]]], jalur("leave", C[0], 2250, keluar[1], 0.45, 8))
        gy = gabung([[0, C[1]], [a1, C[1]]], jalur("heavy", C[1], wc[1], a1, 0.6), [[r0, wc[1]]], jalur("heavy", wc[1], C[1], r0, 0.85), [[keluar[1], C[1]]], jalur("leave", C[1], C[1] - 80, keluar[1], 0.45, 8))
    else:
        gx = gabung([[0, C[0]], [keluar[1], C[0]]], jalur("leave", C[0], 2250, keluar[1], 0.45, 8))
        gy = gabung([[0, C[1]], [keluar[1], C[1]]], jalur("leave", C[1], C[1] - 80, keluar[1], 0.45, 8))
    karakter("Codex", "codex", 19, 2, 0, end[1], C,
             [[0, "neutral"], [fin + r(1), "surprised"], [fin + r(1) + 0.5, "happy"], [fin + 1.6, "neutral"], [ch - 0.05, "excited"], [ch + 0.95, "neutral"], [keluar[1] - 0.05, "surprised"]],
             ([[0, -0.125], [T["akhirnya"] + 0.1, -0.125], [T["akhirnya"] + 0.7, 0.125], [T["b1b"] - 0.25, 0.125], [T["b1b"] + 0.6, -0.125]] if DUNIA else [[0, -0.125]]) + [[dec + 0.15, -0.125], [dec + 0.55, -0.25], [keluar[1], -0.25]],
             lompat=[(fin + r(1) + 0.3, fin + r(1) + 0.6, 1.4)], kaget=[(fin + r(1), 1.0)], denyut=[(ch, ch + 0.25, ch + 0.95, 1.08)], lambai=[(ch + 0.1, ch + 0.95)], gx=gx, gy=gy)
    # Gemini (bintang): kanan atas kepala
    G = (1330, 515)
    wg = (1740, 620)
    if DUNIA:
        a1, r0 = T["akhirnya"] + 0.15, T["b1b"] - 0.25
        gx = gabung([[0, G[0]], [a1, G[0]]], jalur("land", G[0], wg[0], a1, 0.65), [[r0, wg[0]]], jalur("land", wg[0], G[0], r0, 0.85), [[keluar[2], G[0]]], jalur("leave", G[0], 2200, keluar[2], 0.45, 8))
        gy = gabung([[0, G[1]], [a1, G[1]]], jalur("heavy", G[1], wg[1], a1, 0.65), [[r0, wg[1]]], jalur("heavy", wg[1], G[1], r0, 0.85), [[keluar[2], G[1]]], jalur("leave", G[1], G[1] - 260, keluar[2], 0.45, 8))
    else:
        gx = gabung([[0, G[0]], [keluar[2], G[0]]], jalur("leave", G[0], 2200, keluar[2], 0.45, 8))
        gy = gabung([[0, G[1]], [keluar[2], G[1]]], jalur("leave", G[1], G[1] - 260, keluar[2], 0.45, 8))
    karakter("Gemini", "gemini", 17, 3, 0, end[2], G,
             [[0, "neutral"], [fin + r(2), "surprised"], [fin + r(2) + 0.5, "happy"], [fin + 1.6, "neutral"], [ge - 0.05, "idea"], [ge + 1.2, "neutral"], [keluar[2] - 0.05, "surprised"]],
             [[0, -0.125], [ge, -0.125], [ge + 0.85, -1.125], [dec + 0.3, -1.125], [dec + 0.7, -1.25], [keluar[2], -1.25]],
             lompat=[(fin + r(2) + 0.3, fin + r(2) + 0.6, 1.4)], kaget=[(fin + r(2), 1.0)], denyut=[(ge, ge + 0.3, ge + 1.0, 1.08)], gx=gx, gy=gy)


# ====================== hero, slab, cincin ======================
SLAB_W = {"AI SLOP": 1560, "WORKFLOW-NYA": 1700, "BALIK MODAL": 1690, "100% FULL AI": 1700}


def slab_end(b):
    """akhir lapisan slab = akhir slot teks.json + 0,35 (keluar mulai 0,1 dtk sebelum slot habis), minimal 1,05 dtk tampil
    (masuk 19 f + 0,4 dtk terbaca). AI SLOP: tahan sampai tumpukan runtuh (DESAIN B2b: slab keluar bersama runtuhnya slop)."""
    if b.get("teks_vis") == "AI SLOP": return T["putus"] + 0.3
    return max(b["t"] + b["dur"] + 0.35, b["t"] + 1.05)
SLAB_Y = {"AI SLOP": 420, "WORKFLOW-NYA": 380, "BALIK MODAL": 400, "100% FULL AI": 380}


def hero(b):
    vis = b.get("teks_vis", b["teks"])
    t0 = b["t"]
    if b["gaya"] == "finally":
        fs = 0.20 * 1080 * 2048 / 1760                     # tinggi huruf kapital = 20 % frame (DESAIN B1, P2 Sutradara)
        sp_ = -0.03                                         # Anton dirapatkan 3 % em: ekor "Y" hanya menyelip sedikit di belakang pipi
        wd = math.ceil(fs * (wem(vis, ANT) + sp_ * (len(vis) - 1))); h = math.ceil(1.1 * fs)
        dur = (T["akhirnya"] + (0.04 if DUNIA else 0.3)) - t0
        x0 = 96                                            # margin aman 5 %; ekor kanan menyelip di belakang rambut (lubang matte ber-zoom kamera)
        add(b["id"], "KT", dict(teks=vis, kode=b["kode"], gaya="finally", w=wd, h=h, spasi=sp_, keluarAt=round(dur - 0.4, 3), seed=1), dur, t0, x0, b["pos"][1] - h / 2, lubang=True,
            objek=dict(nama="FINALLY", peran="hero", t=t0))
    elif b["gaya"] == "slab":
        wd, end = SLAB_W[vis], slab_end(b)
        fs = wd / wem(vis, ANT); h = math.ceil(1.1 * fs)
        dur = end - t0
        kw = dict(teks=vis, kode=b["kode"], gaya="slab", w=wd, h=h, keluarAt=round(dur - 0.45, 3), warna="#F97066" if vis == "AI SLOP" else "#FAF8EC")
        if vis == "AI SLOP": kw["getarAt"] = 0.0
        if vis == "100% FULL AI": kw["sapu"] = True
        add(b["id"], "KT", kw, dur, t0, (1920 - wd) / 2, SLAB_Y[vis] - h / 2, lubang=True, objek=dict(nama=vis, peran="slab-di-belakang-kepala", t=t0))
        if b.get("sisip"):   # kata ucapan yang tidak muat di slab: R1 kecil di bawah slab sisi kiri, tampil saat diucapkan (Lantai A1)
            k = W.idx(b["sisip"], t0 - 0.05)
            ts, te = W.U[k]["s"], W.U[k]["e"]
            size = 66; w = wem(b["sisip"], POP7) * size * 0.98 + 140; hh = size * 1.8
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
                                busur=dict(d=d2, mulai=r["mulai"], geser=r["geser"]), keluarAt=round(dur - 0.35, 3)), dur, t0, bx, by, lubang=True,
            objek=dict(nama=b["teks"], peran="kata-cincin", t=t0))


def kt(b):
    g, vis = b["gaya"], b.get("teks_vis", b["teks"])
    t0, dur = b["t"], b["dur"]
    cx, cy = b["pos"]
    if g == "r1":
        size = 66; w = wem(vis, POP7) * size * 0.98 + 140; h = size * 1.8
        add(b["id"], "KT", dict(teks=vis, kode="T19", gaya="r1", w=int(w), h=int(h), size=size, gelap=bool(b.get("gelap"))), dur, t0, cx - w / 2, cy - h / 2)
    elif g == "r2":
        size = 88; w = (wem(vis, POP8) * size) * 2.1 + 80; h = size * 2.7
        kw = dict(teks=vis, kode="T03", gaya="r2", w=int(w), h=int(h), size=size, gelap=bool(b.get("gelap")))
        if b.get("warna"): kw["warna"] = b["warna"]
        add(b["id"], "KT", kw, max(dur, 0.33), t0, cx - w / 2, cy - h / 2, objek=dict(nama=vis, peran="kata-kunci-slam", t=t0))
    elif g == "r3":
        size = 96; w = wem(vis, POP8) * size + size * 1.2; h = size * 2.0
        add(b["id"], "KT", dict(teks=vis, kode="T25", gaya="r3", w=int(w), h=int(h), size=size, gelap=bool(b.get("gelap")), warna=b.get("warna")), max(dur, 0.4), t0, cx - w / 2, cy - h / 2,
            objek=dict(nama=vis, peran="kata-kacau", t=t0))
    elif g == "viral":
        size = 150; w = wem("VIRAL!!", POP8) * size + 300; h = size * 2.0
        end = T["putus"] - 0.5
        add(b["id"], "KT", dict(teks=b["teks_vis"], kode="T25", gaya="viral", w=int(w), h=int(h), size=size, bekuAt=round(T["slop"] - t0, 3), keluarAt=round(end - t0 - 0.4, 3)), end - t0, t0, cx - w / 2, cy - h / 2,
            objek=dict(nama="VIRAL!!", peran="slop-teks", t=t0))
    elif g == "putus":
        size = 124; w = wem("putus-putus", POP8) * size + 300; h = size * 2.0
        end = T["putus_e"] + 0.1
        add(b["id"], "KT", dict(teks="putus-putus", kode="T25", gaya="putus", w=int(w), h=int(h), size=size, warna="#F97066"), end - t0, t0, cx - w / 2, cy - h / 2,
            objek=dict(nama="putus-putus", peran="kata-terputus", t=t0))
    elif g == "kartu":
        return                                            # angka tampil di kartu (bangun kartu())
    elif g == "bubble":
        size = 56 if b["sisi"] == "kanan" else 60
        w = wem(vis, POP7) * size + size * 0.5 + 22 + 80 + 80 + 90; h = size * 1.15 + 48 + 80 + 60
        x = cx - w / 2
        if b["sisi"] == "kanan": x = min(x, 1824 - w)
        else: x = max(x, 96)
        end = DURASI
        add(b["id"], "KT", dict(teks=vis, kode="T09", gaya="bubble", w=int(w), h=int(h), size=size, sisi=b["sisi"], keluarAt=round(end - b["t"] + 2, 2)), end - t0, t0, x, cy - h / 2,
            objek=dict(nama=vis, peran="bubble-pilihan", t=t0))


# ====================== B2: tumpukan slop + grade ======================
def slop():
    sl = T["slop"]
    runtuh0 = T["b2b"] + 0.08
    items = [  # id, jenis, waktu muncul, pusat (x,y), ukuran badan (w,h), rot
        ("S01", "gradien", T["viral"] + 0.05, (480, 880), (880, 330), -12), ("S02", "api", T["viral"] + 0.2, (190, 560), (200, 240), -8),
        ("S03", "bingkai", T["ngedit"], (960, 540), (1920, 1080), 0), ("S04", "panah", T["ngedit"] + 0.15, (430, 290), (360, 200), 20),
        ("S05", "kaget", T["ngedit"] + 0.45, (1700, 640), (200, 200), 10), ("S06", "gradien", T["tapi"] + 0.1, (1500, 940), (820, 300), 9),
        ("S07", "stiker", T["tapi"] + 0.2, (1330, 770), (290, 290), 10), ("S08", "flare", T["tapi"] + 0.7, (1640, 190), (500, 500), 0),
        ("S09", "api", T["tapi"] + 1.0, (1760, 440), (190, 230), 12), ("S10", "kaget", T["hasilnya"] - 0.3, (250, 360), (170, 170), -12),
        ("S11", "glow", T["hasilnya"], (150, 140), (420, 420), 0), ("S12", "kilau", T["hasilnya"] + 0.2, (1290, 880), (120, 120), 0),
        ("S13", "stiker", T["hasilnya"] + 0.5, (1640, 800), (260, 260), 14), ("S14", "panah", T["hasilnya"] + 0.65, (1590, 470), (320, 180), 200)]
    PAD = 60
    for k, (id_, jenis, t0, (cx, cy), (bw, bh), rot) in enumerate(items):
        t0 = snap(t0)
        runtuh_t = runtuh0 + (0, 0.15, 0.34, 0.08, 0.25, 0.02, 0.2, 0.12, 0.36, 0.28, 0.05, 0.4, 0.17, 0.32)[k]
        end = runtuh_t + 0.95
        if jenis == "bingkai":
            add(id_, "Slop", dict(jenis=jenis, seed=k + 1, w=1920, h=1080, hb=1080, rot=0, bekuAt=round(sl - t0, 3), runtuhAt=round(runtuh_t - t0, 3), jatuh=1300), end - t0, t0, 0, 0,
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
    add("D_REPO", "DuniaRepo", dict(w=1920, h=1080, rev=4, kunci=kun), dur1, w1, 0, 0, opaque=True, objek=dict(nama="halaman repo + timeline", peran="dunia-transisi", t=w1))
    tum = round(dur1 - 0.48, 3)
    add("D_REPO_WAJAH", "Lingkar", dict(w=1920, h=1080, rev=2, t0=snap(w1), tumbuhAt=tum, z0=round(zoom_at(w1), 4), z1=round(zoom_at(w1 + dur1 + 0.15), 4)), dur1 + 0.15, w1, 0, 0,
        objek=dict(nama="lingkaran wajah", peran="wajah-lingkaran", t=w1))
    # B3: aplikasi Claude
    w3 = snap(T["b3a"] - 0.1); dur3 = round(T["gimana"] - 0.1 - w3 + 0.75, 2)
    kun3 = dict(klik=1.0, slash=round(T["template"] - w3, 3), item1=round(T["apple"] - w3, 3), item2=round(T["cinematic"] - w3, 3), hapus=round(T["ngebalik"] - w3, 3), keluar=round(T["gimana"] - 0.1 - w3, 3))
    add("D_APP", "AppClaude", dict(w=1920, h=1080, rev=5, kunci=kun3), dur3, w3, 0, 0, opaque=True, objek=dict(nama="aplikasi Claude terang", peran="dunia-transisi", t=w3))
    add("D_APP_WAJAH", "Lingkar", dict(w=1920, h=1080, rev=2, t0=w3, tumbuhAt=round(kun3["keluar"] + 0.04, 3), z0=round(zoom_at(w3), 4), z1=round(zoom_at(w3 + dur3 + 0.1), 4)), dur3 + 0.1, w3, 0, 0,
        objek=dict(nama="lingkaran wajah", peran="wajah-lingkaran", t=w3))
    for nm, tt in (("/apple-style", T["apple"]), ("/cinematic-storytelling", T["cinematic"]), ("daftar terhapus", T["ngebalik"])):
        L.append(dict(id="O_" + nm, comp="-", props={}, durasi=0, t=tt, x=0, y=0, gerak=None, lubang=False, opaque=False, objek=dict(nama=nm, peran="item-ui", t=tt), skip=True))
    # B5b: dua jendela
    pre, post = 8, 8
    w5 = T["lihat_e"]; w5s = snap(w5 - pre / FPS)
    dun = round(T["sini_e"] - w5 - 0.0, 3)
    s_ = lambda txt, a, n=0: W.s(txt, a, n) - w5
    kun5 = dict(ketik1=round(s_("ChatGPT", 59.9), 3), pesan1=round(s_("koordinasi", 60), 3), amplop1=round(s_("ke", 61), 3), ketik2=round(s_("ke", 61) + 0.9, 3),
                pesan2=round(s_("dikoordinasi", 62) + 0.4, 3), amplop2=round(s_("sebaliknya", 63), 3), pesan3=round(s_("session", 64) + 0.3, 3), catat=round(s_("kesalahan", 67), 3),
                loop=round(s_("loop", 70), 3), selesai=round(s_("pembelajaran", 70) + 0.35, 3), keluar=round(dun - 0.3, 3))
    add("D_RELAY", "RelayDunia", dict(w=1920, h=1080, rev=5, pre=pre, post=post, preT0=w5s, postT0=snap(T["sini_e"]), zPre=round(zoom_at(w5s), 4), kunci=kun5), dun + (pre + post) / FPS, w5s, 0, 0, opaque=True,
        objek=dict(nama="dua jendela Claude + ChatGPT", peran="dunia-transisi", t=w5))
    for nm, tt in (("pesan doctor.sh gagal", w5 + kun5["pesan1"]), ("pesan Sudah kujalankan doctor --fix", w5 + kun5["pesan2"]), ("pesan Revisi kamera selesai", w5 + kun5["pesan3"]),
                   ("amplop Codex ke Clawd", w5 + kun5["amplop1"]), ("amplop Clawd ke Codex", w5 + kun5["amplop2"]), ("kartu Dicatat", w5 + kun5["catat"]), ("loop + centang hijau", w5 + kun5["selesai"])):
        L.append(dict(id="O_" + nm, comp="-", props={}, durasi=0, t=tt, x=0, y=0, gerak=None, lubang=False, opaque=False, objek=dict(nama=nm, peran="item-ui", t=tt), skip=True))


# ====================== B4b: kartu paket ======================
def kartu():
    # Label = nama paket ASLI di UI (Lantai D20): ChatGPT "Pro", Claude "Max"; ucapan "Pro Max"/"Claude Pro" tetap di KT R1.
    # Sisi kanan = dinding kosong di B4b (wajah sedikit kiri dari tengah); kartu terbang dari tepi kanan, menghadap pembicara.
    for id_, model, label, angka, tl, fin_xy in (("KARTU1", "chatgpt", "ChatGPT Pro", 20, T["dua0"], (1290, 160)), ("KARTU2", "claude", "Claude Max", 5, T["lima"], (1360, 540))):
        fl = 0.45
        t0 = tl - fl + 0.02
        end = T["gitu_b4"]
        w, h = 460 + 180, 400 + 180
        fx, fy = fin_xy[0] - 90, fin_xy[1] - 90
        gx = gabung(jalur("land", fx + 900, fx, 0, fl, 12), [[fl + 0.2, fx]], [[end - t0 - 0.3, fx]], jalur("leave", fx, fx + 900, end - t0 - 0.3, 0.3, 6))
        gy = jalur("heavy", fy + 120, fy, 0, fl, 8)
        add(id_, "Kartu", dict(model=model, label=label, angka=angka, w=w, h=h, terbang=fl, jarak=900, kanan=True, rev=4), end - t0, t0, fx, fy, dict(x=gx, y=gabung(gy, [[end - t0, fy]])),
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
        if l["props"].get("gaya") in ("bubble",): return 7
        return 6
    L.sort(key=lambda l: (z(l), l["t"]))
    SK = [l for l in L if l.get("skip")]; L[:] = [l for l in L if not l.get("skip")]
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
    lego = dict(fps=FPS, w=1920, h=1080, dasar=dasar(), lapisan=[e for e in lap if e["src"] != "BELUM"], audio=f"../{W.EDIT}/suara.wav", keluar="out/final.mp4", crf=16)
    lego["belum_dirender"] = [e["id"] for e in lap if e["src"] == "BELUM"]
    json.dump(lego, open(os.path.join(P, "lego/lego.json"), "w"), indent=1, ensure_ascii=False)
    objs = [dict(nama=l["objek"]["nama"], peran=l["objek"]["peran"], t=round(l["objek"]["t"], 3), frame=round(l["objek"]["t"] * FPS), lapisan=l["id"]) for l in L + SK if l.get("objek")]
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
