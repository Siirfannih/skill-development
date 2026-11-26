"""metrik.py: ukuran keras fase uji (murni numpy/cv2/PIL; tanpa Remotion, bisa diuji dengan fixture kecil).

struktur(a, b)          kemiripan STRUKTUR dua gambar setelah warna dinormalkan (grayscale + equalize): SSIM + korelasi peta tepi.
dua_token(a, b)         struktur sama (edge_warna: tepi tak peduli polaritas/warna; SSIM dilaporkan) dan piksel berbeda (selisih RGB rata-rata) antara dua set token.
lintasan(frames)        centroid massa tepi per frame (x, y ternormalisasi) dari urutan frame.
progres(track)          lintasan -> progres skalar 0..1 sepanjang sumbu gerak utama.
kurva(param)            kurva spec (cubic-bezier / spring) -> fungsi t(0..1) -> progres 0..1.
bandingkan_gerak(prog, fps, spec_gerak)   gerak dipecah per segmen; RMS median per segmen vs kurva spec + rasio durasi; None bila tak ada gerak.
"""
import math
import numpy as np
import cv2
from PIL import Image

UKURAN = (256, 144)


def _gray(img, size=UKURAN):
    a = np.asarray(img.convert("L").resize(size, Image.LANCZOS))
    return cv2.equalizeHist(a).astype(np.float32) / 255.0


def ssim(a, b):
    """SSIM Gaussian (11, 1,5) pada dua array float 0..1 ukuran sama."""
    C1, C2 = 0.01 ** 2, 0.03 ** 2
    g = lambda x: cv2.GaussianBlur(x, (11, 11), 1.5)
    mu_a, mu_b = g(a), g(b)
    saa, sbb, sab = g(a * a) - mu_a ** 2, g(b * b) - mu_b ** 2, g(a * b) - mu_a * mu_b
    m = ((2 * mu_a * mu_b + C1) * (2 * sab + C2)) / ((mu_a ** 2 + mu_b ** 2 + C1) * (saa + sbb + C2))
    return float(m.mean())


def _tepi(x):
    x = cv2.GaussianBlur(x, (0, 0), 1.2)
    return np.hypot(cv2.Sobel(x, cv2.CV_32F, 1, 0), cv2.Sobel(x, cv2.CV_32F, 0, 1))


def edge_corr(a, b):
    ea, eb = _tepi(a), _tepi(b)
    ea, eb = ea - ea.mean(), eb - eb.mean()
    d = math.sqrt(float((ea ** 2).sum() * (eb ** 2).sum()))
    return float((ea * eb).sum() / d) if d > 1e-9 else 0.0


def struktur(img_a, img_b):
    a, b = _gray(img_a), _gray(img_b)
    s, e = ssim(a, b), edge_corr(a, b)
    return {"ssim": round(s, 4), "edge": round(e, 4), "skor": round((s + e) / 2, 4)}


def edge_warna(img_a, img_b, ambang=0.25, dilasi=5):
    """Kesamaan peta tepi yang tidak peduli polaritas/warna: tepi = perubahan di kanal mana pun; skor = bagian tepi satu gambar yang
    ada dalam jarak `dilasi` px dari tepi gambar lain (0..1). Dipakai untuk dua set token (warna beda, struktur sama)."""
    def e(im):
        x = cv2.GaussianBlur(np.asarray(im.convert("RGB").resize(UKURAN, Image.LANCZOS), np.float32) / 255.0, (0, 0), 1.2); m = np.zeros(x.shape[:2], np.float32)
        for c in range(3): m = np.maximum(m, np.hypot(cv2.Sobel(x[..., c], cv2.CV_32F, 1, 0), cv2.Sobel(x[..., c], cv2.CV_32F, 0, 1)))
        return m > ambang
    ea, eb = e(img_a), e(img_b); k = np.ones((dilasi, dilasi), np.uint8)
    da, db = cv2.dilate(ea.astype(np.uint8), k) > 0, cv2.dilate(eb.astype(np.uint8), k) > 0
    n = ea.sum() + eb.sum()
    return float(((ea & db).sum() + (eb & da).sum()) / n) if n else 0.0


def dua_token(img_a, img_b):
    """Struktur sama + piksel beda. Mengembalikan ssim struktur dan selisih RGB rata-rata (0..255)."""
    b = img_b.convert("RGB").resize(img_a.size, Image.LANCZOS)
    sel = float(np.abs(np.asarray(img_a.convert("RGB"), np.float32) - np.asarray(b, np.float32)).mean())
    st = struktur(img_a, b)
    return {"ssim_struktur": st["ssim"], "edge_struktur": round(edge_warna(img_a, b), 4), "selisih_piksel": round(sel, 2)}


def lintasan(frames):
    """frames: daftar PIL.Image. -> array (n,2) centroid massa tepi dalam fraksi lebar/tinggi."""
    out = []
    for im in frames:
        g = _gray(im, (192, 108)); e = _tepi(g); e = np.where(e > e.mean(), e, 0)
        s = e.sum()
        if s < 1e-9: out.append((0.5, 0.5)); continue
        ys, xs = np.mgrid[0:e.shape[0], 0:e.shape[1]]
        out.append(((e * xs).sum() / s / e.shape[1], (e * ys).sum() / s / e.shape[0]))
    return np.array(out)


def progres(track):
    """Proyeksi lintasan ke sumbu utama (PCA), dinormalkan 0..1 dan diarahkan naik. -> (progres, rentang_piksel_frac)."""
    t = np.asarray(track, float); t = t - t.mean(0)
    if len(t) < 3: return np.zeros(len(t)), 0.0
    u, s, vt = np.linalg.svd(t, full_matrices=False); p = t @ vt[0]
    rentang = float(p.max() - p.min())
    if rentang < 1e-9: return np.zeros(len(t)), 0.0
    p = (p - p.min()) / rentang
    if p[-1] < p[0]: p = 1 - p
    return p, rentang


def _bezier(x1, y1, x2, y2):
    def f(t):
        if t <= 0: return 0.0
        if t >= 1: return 1.0
        lo, hi = 0.0, 1.0
        for _ in range(40):  # cari u dengan x(u)=t
            u = (lo + hi) / 2; x = 3 * (1 - u) ** 2 * u * x1 + 3 * (1 - u) * u * u * x2 + u ** 3
            lo, hi = (u, hi) if x < t else (lo, u)
        u = (lo + hi) / 2
        return 3 * (1 - u) ** 2 * u * y1 + 3 * (1 - u) * u * u * y2 + u ** 3
    return f


def _spring(k, c, m):
    """Pegas teredam menuju 1 dari 0 (analitik), waktu 0..1 dipetakan ke durasi sampai ±1 % menetap."""
    w0 = math.sqrt(k / m); z = c / (2 * math.sqrt(k * m))
    def x(t):
        if z < 1:
            wd = w0 * math.sqrt(1 - z * z)
            return 1 - math.exp(-z * w0 * t) * (math.cos(wd * t) + z * w0 / wd * math.sin(wd * t))
        return 1 - math.exp(-w0 * t) * (1 + w0 * t)
    ts = np.linspace(0, 20 / max(w0 * max(z, 0.2), 1e-6), 4000)
    ys = np.array([abs(x(t) - 1) for t in ts]); idx = np.where(ys > 0.01)[0]
    T = ts[idx[-1]] if len(idx) else ts[-1]
    return lambda u: float(x(min(max(u, 0), 1) * T))


def kurva(param):
    if param["tipe"] == "cubic-bezier": return _bezier(*param["bezier"])
    s = param["spring"]; return _spring(s["stiffness"], s["damping"], s["mass"])


def bandingkan_gerak(prog, fps, spec_gerak, min_rentang=0.01, rentang=None, min_net=0.15):
    """prog: progres per frame (dinormalkan 0..1 oleh progres()). Kamera bisa bergerak dalam beberapa segmen (dorong, geser, tarik),
    jadi gerak dipecah: segmen = rentetan frame dengan kecepatan >= 8 % puncak (celah <= 2 frame digabung, >= 3 frame). Tiap segmen
    dengan perpindahan bersih >= min_net rentang total dinormalkan ke 0..1 dan dibandingkan dengan kurva spec; yang dilaporkan MEDIAN
    antar segmen. -> {'rms','rasio_durasi','durasi','n_segmen'} atau None bila tidak ada gerak (rentang < min_rentang)."""
    prog = np.asarray(prog, float)
    if rentang is not None and rentang < min_rentang: return None
    if len(prog) < 4 or prog.max() - prog.min() < 0.5: return None
    v = np.abs(np.diff(prog)); v = np.convolve(v, np.ones(3) / 3, mode="same"); aktif = np.where(v >= 0.08 * v.max())[0]
    seg = []
    for k in aktif:  # gabung indeks aktif dengan celah <= 2 frame
        if seg and k - seg[-1][1] <= 3: seg[-1][1] = k + 1
        else: seg.append([k, k + 1])
    seg = [(i0, i1) for i0, i1 in seg if i1 - i0 >= 3]
    f = kurva(spec_gerak["kurva"]); hasil = []
    for i0, i1 in seg:
        i0 = max(0, i0 - 1); i1 = min(len(prog) - 1, i1 + 1)
        if i1 - i0 < 2: continue
        s = prog[i0:i1 + 1]; net = abs(s[-1] - s[0])
        if net < min_net: continue
        s = (s - s[0]) / (s[-1] - s[0]); u = np.linspace(0, 1, len(s)); tgt = np.array([f(x) for x in u])
        hasil.append((float(np.sqrt(((s - tgt) ** 2).mean())), (i1 - i0) / fps))
    if not hasil: return None
    r = sorted(h[0] for h in hasil); d = sorted(h[1] for h in hasil); med = lambda x: x[len(x) // 2] if len(x) % 2 else (x[len(x) // 2 - 1] + x[len(x) // 2]) / 2
    return {"rms": round(float(med(r)), 4), "rasio_durasi": round(float(med(d)) / spec_gerak["durasi_detik"], 3), "durasi": round(float(med(d)), 3), "n_segmen": len(hasil)}


# ---------- palet (dosa i) ----------
def hex_rgb(h):
    h = h.lstrip("#")
    if len(h) in (3, 4): h = "".join(c * 2 for c in h[:3])
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def _lab(rgb):
    a = np.asarray(rgb, np.float32).reshape(-1, 1, 3) / 255.0
    return cv2.cvtColor(a, cv2.COLOR_RGB2LAB).reshape(-1, 3).astype(np.float64)


def de2000(l1, l2):
    """CIEDE2000 antara dua larik Lab (broadcast). cv2 float Lab: L 0..100, a/b ~ -127..127 (sudah skala CIE)."""
    L1, a1, b1 = l1[..., 0], l1[..., 1], l1[..., 2]; L2, a2, b2 = l2[..., 0], l2[..., 1], l2[..., 2]
    C1, C2 = np.hypot(a1, b1), np.hypot(a2, b2); Cb = (C1 + C2) / 2
    G = 0.5 * (1 - np.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7))); a1p, a2p = (1 + G) * a1, (1 + G) * a2
    C1p, C2p = np.hypot(a1p, b1), np.hypot(a2p, b2)
    h1 = np.degrees(np.arctan2(b1, a1p)) % 360; h2 = np.degrees(np.arctan2(b2, a2p)) % 360
    dL, dC = L2 - L1, C2p - C1p
    dh = h2 - h1; dh = np.where(dh > 180, dh - 360, np.where(dh < -180, dh + 360, dh)); dh = np.where(C1p * C2p == 0, 0, dh)
    dH = 2 * np.sqrt(C1p * C2p) * np.sin(np.radians(dh) / 2)
    Lb, Cpb = (L1 + L2) / 2, (C1p + C2p) / 2
    hs = h1 + h2; hb = np.where(np.abs(h1 - h2) > 180, (hs + 360) / 2, hs / 2); hb = np.where(C1p * C2p == 0, hs, hb)
    T = 1 - 0.17 * np.cos(np.radians(hb - 30)) + 0.24 * np.cos(np.radians(2 * hb)) + 0.32 * np.cos(np.radians(3 * hb + 6)) - 0.20 * np.cos(np.radians(4 * hb - 63))
    Sl = 1 + 0.015 * (Lb - 50) ** 2 / np.sqrt(20 + (Lb - 50) ** 2); Sc = 1 + 0.045 * Cpb; Sh = 1 + 0.015 * Cpb * T
    Rt = -2 * np.sqrt(Cpb ** 7 / (Cpb ** 7 + 25 ** 7)) * np.sin(np.radians(60 * np.exp(-(((hb - 275) / 25) ** 2))))
    return np.sqrt((dL / Sl) ** 2 + (dC / Sc) ** 2 + (dH / Sh) ** 2 + Rt * (dC / Sc) * (dH / Sh))


def _palet_lab(palet_hex, langkah=9):
    """Titik sah = warna palet + hitam + putih + ruas garis di antaranya (gradasi, bayangan, tint). -> Lab (m,3)."""
    base = [hex_rgb(h) for h in palet_hex] + [(0, 0, 0), (255, 255, 255)]
    pts = []
    for i in range(len(base)):
        for j in range(i, len(base)):
            for t in np.linspace(0, 1, langkah if i != j else 1):
                pts.append(tuple(np.array(base[i]) * (1 - t) + np.array(base[j]) * t))
    return _lab(np.array(pts))


def palet_dosa(img, palet_hex, luas_min=0.005, de_maks=12.0):
    """Warna luar palet. Piksel yang > de_maks dari semua titik sah dan lolos pembukaan morfologi 3x3 (membuang anti-aliasing
    selebar 1-2 px) dihitung; dosa bila luasnya >= luas_min frame. -> {luas, dosa, warna_dominan(hex)}."""
    a = np.asarray(img.convert("RGB").resize((img.width // 2 or 1, img.height // 2 or 1), Image.BILINEAR))
    q = (a >> 3).reshape(-1, 3).astype(np.int32); kode = q[:, 0] * 1024 + q[:, 1] * 32 + q[:, 2]
    uniq, inv, cnt = np.unique(kode, return_inverse=True, return_counts=True)
    rgb = np.stack([(uniq >> 10) & 31, (uniq >> 5) & 31, uniq & 31], 1) * 8 + 4
    P = _palet_lab(palet_hex); L = _lab(rgb)
    d = np.min(de2000(L[:, None, :], P[None, :, :]), axis=1)
    luar = (d > de_maks)[inv].reshape(a.shape[:2]).astype(np.uint8)
    luar = cv2.morphologyEx(luar, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    luas = float(luar.mean())
    dom = None
    if luar.any():
        px = a[luar.astype(bool)]; m = np.median(px, axis=0).astype(int); dom = "#%02x%02x%02x" % tuple(m)
    return {"luas": round(luas, 4), "dosa": luas >= luas_min, "warna_dominan": dom}


# ---------- probe DOM (dosa h dan j) ----------
def analisis_probe(items, w, h, teks_min_px=24.0, tumpang_min=0.05):
    """items: daftar elemen dari probe satu frame: {tag, teks, x, y, w, h, fs, op}. Hanya teks yang terlihat (op >= 0.9 dan titik tengahnya tidak tertutup elemen lain: `vis`).
    -> {kecil: [...], tabrakan: [...], terpotong: [...]}; ukuran font diskalakan ke 1080 sisi pendek."""
    skala = 1080.0 / min(w, h); T = [i for i in items if i.get("teks", "").strip() and i.get("op", 1) >= 0.9 and i.get("vis", True) and i["w"] > 1 and i["h"] > 1]
    kecil = [f"'{t['teks'][:24]}' {t['fs'] * skala:.1f}px@1080" for t in T if t["fs"] * skala < teks_min_px]
    terpotong = []
    for t in T:
        ix = max(0, min(t["x"] + t["w"], w) - max(t["x"], 0)) * max(0, min(t["y"] + t["h"], h) - max(t["y"], 0))
        if ix < 0.9 * t["w"] * t["h"]: terpotong.append(f"'{t['teks'][:24]}' keluar frame")
    tab = []
    for i in range(len(T)):
        for j in range(i + 1, len(T)):
            a, b = T[i], T[j]
            if len(a["teks"].strip()) <= 1 and len(b["teks"].strip()) <= 1: continue  # animasi per huruf: huruf tunggal boleh bersinggungan saat bergerak
            ox = max(0, min(a["x"] + a["w"], b["x"] + b["w"]) - max(a["x"], b["x"])); oy = max(0, min(a["y"] + a["h"], b["y"] + b["h"]) - max(a["y"], b["y"]))
            if ox * oy > tumpang_min * min(a["w"] * a["h"], b["w"] * b["h"]): tab.append(f"'{a['teks'][:18]}' x '{b['teks'][:18]}'")
    for t in T:  # teks vs objek grafis (svg/img/canvas) yang bukan leluhurnya
        for o in items:
            if o.get("tag") in ("svg", "img", "canvas") and o["w"] > 1 and o["w"] * o["h"] < 0.5 * w * h:  # bidang >= 50 % frame = latar/footage, bukan objek
                ox = max(0, min(t["x"] + t["w"], o["x"] + o["w"]) - max(t["x"], o["x"])); oy = max(0, min(t["y"] + t["h"], o["y"] + o["h"]) - max(t["y"], o["y"]))
                if ox * oy > 0.3 * t["w"] * t["h"] and not o.get("isi_teks"): tab.append(f"'{t['teks'][:18]}' x <{o['tag']}>")
    return {"kecil": kecil, "tabrakan": tab, "terpotong": terpotong}


# ---------- oklusi teks (dosa j dan o), dari probe DOM v2 ----------
def analisis_oklusi(per_frame, tumpang_j=0.10, tumpang_o=0.02):
    """per_frame: {frame: [item teks]}; item punya teks, op, tutup (bagian titik sampel teks yang tertutup elemen lain 0..1),
    tutup_objek (bagian yang tertutup elemen BUKAN teks), wadah_keluar (teks melewati kotak wadahnya).
    j: tertutup > tumpang_j atau keluar wadah; o: elemen non-teks di atas teks (tutup_objek >= tumpang_o) pada frame mana pun.
    -> {'j': [...], 'o': [...]} (pesan; kosong = bersih)."""
    j, o = [], []
    for f in sorted(per_frame):
        for t in per_frame[f]:
            if t.get("op", 1) < 0.9 or not t.get("teks", "").strip(): continue
            nm = t["teks"][:22]
            if t.get("tutup", 0) > tumpang_j: j.append(f"f{f}: '{nm}' tertutup {t['tutup'] * 100:.0f}%")
            if t.get("wadah_keluar"): j.append(f"f{f}: '{nm}' keluar kotak wadahnya")
            if t.get("tutup_objek", 0) >= tumpang_o: o.append(f"f{f}: lapisan non-teks di atas '{nm}' ({t['tutup_objek'] * 100:.0f}% titik)")
    return {"j": j, "o": o}


def teks_tak_terlihat(frame_penuh, frame_tanpa_teks, n_teks_dom, ambang_diff=25, min_frac=0.0003):
    """Mask teks = selisih render penuh vs render dengan teks disembunyikan. -> (frac_piksel_teks, tak_terlihat) ;
    tak_terlihat bila DOM punya teks terlihat tetapi selisihnya nyaris nol (teks sewarna latar atau seluruhnya tertutup)."""
    a = np.asarray(frame_penuh.convert("RGB").resize(frame_tanpa_teks.size), np.int16); b = np.asarray(frame_tanpa_teks.convert("RGB"), np.int16)
    frac = float((np.abs(a - b).sum(2) > ambang_diff).mean())
    return round(frac, 5), bool(n_teks_dom > 0 and frac < min_frac)


# ---------- dosa shader latar (k-n) ----------
def ruang_negatif(img, hex_dasar, de_maks=3.0):
    """Bagian piksel yang ΔE2000 < de_maks dari warna dasar. Dosa m bila < 0,5 (komponen berlatar)."""
    a = np.asarray(img.convert("RGB").resize((img.width // 2 or 1, img.height // 2 or 1), Image.BILINEAR)).reshape(-1, 3)
    q = (a >> 2).astype(np.int32); kode = q[:, 0] * 4096 + q[:, 1] * 64 + q[:, 2]
    u, inv = np.unique(kode, return_inverse=True)
    rgb = np.stack([(u >> 12) & 63, (u >> 6) & 63, u & 63], 1) * 4 + 2
    d = de2000(_lab(rgb), _lab([hex_rgb(hex_dasar)])[0][None, :])
    return float((d < de_maks)[inv].mean())


def grain_estimasi(img):
    """Simpangan baku residu frekuensi tinggi (0..1 dari 255) pada area datar (gradien lokal kecil). Dosa n bila > 0,02."""
    g = np.asarray(img.convert("L"), np.float32)
    blur = cv2.GaussianBlur(g, (0, 0), 2.0); res = g - blur
    gx, gy = cv2.Sobel(blur, cv2.CV_32F, 1, 0), cv2.Sobel(blur, cv2.CV_32F, 0, 1)
    datar = cv2.erode((np.hypot(gx, gy) < 6.0).astype(np.uint8), np.ones((5, 5), np.uint8)) > 0
    if datar.sum() < 500: return 0.0
    return float(res[datar].std() / 255.0)


def luar_palet_dekat(img, hex_palet, hex_ref, de_palet=12.0, de_ref=12.0, luas_min=0.005):
    """Dosa p (kulit referensi bocor): piksel di luar palet demo (seperti palet_dosa) yang dekat (ΔE < de_ref) ke salah satu warna
    referensi. -> {'luas', 'dosa', 'warna_dominan'}."""
    a = np.asarray(img.convert("RGB").resize((img.width // 2 or 1, img.height // 2 or 1), Image.BILINEAR))
    q = (a >> 3).reshape(-1, 3).astype(np.int32); kode = q[:, 0] * 1024 + q[:, 1] * 32 + q[:, 2]
    uniq, inv = np.unique(kode, return_inverse=True)
    rgb = np.stack([(uniq >> 10) & 31, (uniq >> 5) & 31, uniq & 31], 1) * 8 + 4; L = _lab(rgb)
    dp = np.min(de2000(L[:, None, :], _palet_lab(hex_palet)[None, :, :]), axis=1)
    dr = np.min(de2000(L[:, None, :], _lab([hex_rgb(h) for h in hex_ref])[None, :, :]), axis=1)
    m = ((dp > de_palet) & (dr < de_ref))[inv].reshape(a.shape[:2]).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8)); luas = float(m.mean())
    dom = "#%02x%02x%02x" % tuple(np.median(a[m.astype(bool)], axis=0).astype(int)) if m.any() else None
    return {"luas": round(luas, 4), "dosa": luas >= luas_min, "warna_dominan": dom}
