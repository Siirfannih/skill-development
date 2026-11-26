"""gerak.py: ukur TANDA TANGAN GERAK dari urutan frame (klip referensi atau render demo) dan bandingkan dua tanda tangan.

Semua angka berasal dari skrip (opencv/numpy/scipy); model vision hanya boleh MENAMAI jenis gerak (ekstrak.py --namai).
Satu fungsi ukur dipakai untuk referensi dan demo, supaya perbandingan adil.

Sinyal per frame (frame diresample ke `FPS`, lebar `LEBAR` px):
  fokus   : topeng elemen fokus menurut mode -> bbox (persentil 2–98) -> cx, cy (fraksi lebar/tinggi), skala (diagonal bbox / diagonal frame),
            opasitas (p90 kontras piksel fokus / 255), ketajaman (|Laplacian| rata-rata di topeng / kontras), rotasi (minAreaRect).
            mode 'latar' = beda dari warna tepi frame (latar datar), 'terang' = luma tinggi + saturasi rendah (caption putih di footage),
            'gelap' = luma rendah. `roi` (x0,y0,x1,y1 fraksi) membatasi area.
  kamera  : titik sudut (goodFeaturesToTrack) dilacak Lucas–Kanade -> transform similaritas RANSAC antar frame berurutan ->
            kumulatif skala, geser x/y (fraksi lebar), rotasi. Potongan keras (selisih besar + inlier rendah) memutus kumulatif.
  energi  : selisih residu setelah kompensasi kamera (piksel berubah) di dalam roi -> onset unit (puncak) untuk stagger.
Turunan: segmen gerak (frame aktif per saluran) + fit easing (cubic-bezier 4 parameter dan pegas stiffness/damping, mass 1),
overshoot, deviasi dari linear, hold, jenis masuk/keluar fokus, pola stagger (interval, ketidakrataan CV, unit), potongan, transisi
(arah dan grid baris x kolom dari peta waktu-berubah; perkiraan), ringkasan kamera (jangkar = hold di antara segmen kamera).
"""
import json, math, re, subprocess
from pathlib import Path
import numpy as np

FPS = 30
LEBAR = 320
N_KURVA = 60
AMBANG_AKTIF = {"posisi": 0.0035, "skala": 0.004, "opasitas": 0.025, "kamera": 0.0035}  # per frame @30 fps
CURVES_TS = Path(__file__).resolve().parent.parent / "toolkit/gerak/curves.ts"


# ---------- baca frame ----------
def baca_klip(path, dari, sampai, fps=FPS, lebar=LEBAR):
    """Klip [dari, sampai) detik -> array (N,H,W,3) uint8 pada fps tetap (ffmpeg)."""
    pr = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", str(path)],
                        capture_output=True, text=True, check=True)
    w0, h0 = map(int, pr.stdout.strip().split(",")[:2]); tinggi = int(round(lebar * h0 / w0 / 2) * 2)
    r = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{dari:.3f}", "-t", f"{sampai - dari:.3f}", "-i", str(path), "-vf",
                        f"fps={fps},scale={lebar}:{tinggi}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True, check=True)
    return np.frombuffer(r.stdout, np.uint8).reshape(-1, tinggi, lebar, 3).copy()


def fps_asli(path):
    """fps kontainer video asli (ffprobe r_frame_rate) -> float. Kenapa: gerak diukur di fps asli; resample menyembunyikan duplikat dan cut."""
    pr = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate", "-of", "csv=p=0", str(path)],
                        capture_output=True, text=True, check=True)
    a, b = (pr.stdout.strip().split(",")[0].split("/") + ["1"])[:2]
    return float(a) / float(b)


def frame_duplikat(frames, ambang=0.05):
    """Frame yang identik dengan frame sebelumnya (selisih rata-rata < ambang tingkat abu) -> {frame, periode, fps_animasi}.
    Duplikat periodik = animasi ber-fps lebih rendah di kontainer lebih tinggi (mis. tiap 6 frame di 30 fps = animasi 25 fps)."""
    f = frames.astype(np.int16); d = np.abs(np.diff(f, axis=0)).mean(axis=(1, 2, 3))
    dup = [int(i + 1) for i in np.nonzero(d < ambang)[0]]
    jarak = np.diff(dup) if len(dup) > 1 else np.array([])
    per = int(np.bincount(jarak).argmax()) if len(jarak) else None
    return {"frame": dup, "periode": per, "fps_animasi": None if not per else round(FPS * (per - 1) / per, 2)}


def baca_folder(folder, lebar=LEBAR, pola="*.jp*g"):
    """Folder frame berurut (render --sequence) -> array (N,H,W,3)."""
    import cv2
    fs = sorted(Path(folder).glob(pola), key=lambda p: int(re.findall(r"\d+", p.stem)[-1]))
    out = []
    for f in fs:
        im = cv2.cvtColor(cv2.imread(str(f)), cv2.COLOR_BGR2RGB); h, w = im.shape[:2]
        out.append(cv2.resize(im, (lebar, int(round(lebar * h / w / 2) * 2)), interpolation=cv2.INTER_AREA))
    return np.stack(out)


# ---------- kurva ----------
def bezier_y(u, x1, y1, x2, y2):
    """Cubic-bezier gaya CSS: progres y untuk waktu u (0..1), vektor; bagi dua 32 langkah."""
    u = np.clip(np.asarray(u, float), 0, 1); lo = np.zeros_like(u); hi = np.ones_like(u)
    for _ in range(32):
        s = (lo + hi) / 2; x = 3 * (1 - s) ** 2 * s * x1 + 3 * (1 - s) * s * s * x2 + s ** 3
        m = x < u; lo = np.where(m, s, lo); hi = np.where(m, hi, s)
    s = (lo + hi) / 2
    return 3 * (1 - s) ** 2 * s * y1 + 3 * (1 - s) * s * s * y2 + s ** 3


def spring_x(t, k, c, m=1.0):
    """Pegas teredam dari 0 menuju 1 (Remotion spring: mass, stiffness, damping), t detik."""
    t = np.asarray(t, float); w0 = math.sqrt(k / m); z = c / (2 * math.sqrt(k * m))
    if z < 1:
        wd = w0 * math.sqrt(1 - z * z)
        return 1 - np.exp(-z * w0 * t) * (np.cos(wd * t) + z * w0 / wd * np.sin(wd * t))
    if abs(z - 1) < 1e-6:
        return 1 - np.exp(-w0 * t) * (1 + w0 * t)
    r1 = -w0 * (z - math.sqrt(z * z - 1)); r2 = -w0 * (z + math.sqrt(z * z - 1))
    return 1 - (r2 * np.exp(r1 * t) - r1 * np.exp(r2 * t)) / (r2 - r1)


def kurva_bernama(path=CURVES_TS):
    """{nama: [x1,y1,x2,y2]} dari toolkit/gerak/curves.ts (satu sumber kebenaran)."""
    return {k: [float(x) for x in v.split(",")] for k, v in re.findall(r"(\w+):\s*Easing\.bezier\(([^)]*)\)", Path(path).read_text())}


def fit_bezier(p):
    """p: progres 0..1 sampel merata dari awal sampai akhir segmen. -> {bezier, rms, terdekat{nama, rms}}."""
    from scipy.optimize import least_squares
    p = np.asarray(p, float); u = np.linspace(0, 1, len(p)); nb = kurva_bernama()
    awal = list(nb.values()) + [[0.25, 0.25, 0.75, 0.75], [0.3, 1.4, 0.6, 1.0]]
    best = None
    for x0 in awal:
        x0 = np.clip(x0, [0, -1, 0, -1], [1, 2, 1, 2])
        r = least_squares(lambda q: bezier_y(u, *q) - p, x0, bounds=([0, -1, 0, -1], [1, 2, 1, 2]))
        if best is None or r.cost < best.cost: best = r
    q = [round(float(x), 3) for x in best.x]; rms = float(np.sqrt(np.mean((bezier_y(u, *q) - p) ** 2)))
    uu = np.linspace(0, 1, 61); yq = bezier_y(uu, *q)
    jar = {k: float(np.sqrt(np.mean((bezier_y(uu, *v) - yq) ** 2))) for k, v in nb.items()}
    k = min(jar, key=jar.get)
    return {"bezier": q, "rms": round(rms, 4), "terdekat": {"nama": k, "rms": round(jar[k], 4)}}


def fit_spring(p, fps=FPS):
    """p: progres 0..1 per frame (sampel frame asli). -> {stiffness, damping, mass, rms}."""
    from scipy.optimize import least_squares
    p = np.asarray(p, float); t = np.arange(len(p)) / fps; best = None
    for k0 in (60, 150, 300, 600):
        for c0 in (8, 15, 26, 45):
            r = least_squares(lambda q: spring_x(t, q[0], q[1]) - p, [k0, c0], bounds=([5, 0.5], [3000, 200]))
            if best is None or r.cost < best.cost: best = r
    k, c = best.x
    return {"stiffness": round(float(k), 1), "damping": round(float(c), 2), "mass": 1, "rms": round(float(np.sqrt(np.mean((spring_x(t, k, c) - p) ** 2))), 4)}


# ---------- sinyal per frame ----------
def _abu(f):
    return (0.299 * f[..., 0] + 0.587 * f[..., 1] + 0.114 * f[..., 2]).astype(np.float32)


def _roi_mask(shape, roi):
    h, w = shape[:2]; m = np.zeros((h, w), bool)
    if not roi: m[:] = True; return m
    x0, y0, x1, y1 = roi; m[int(y0 * h):int(math.ceil(y1 * h)), int(x0 * w):int(math.ceil(x1 * w))] = True; return m


def peta_fokus(f, mode="latar", roi=None):
    """-> (kontras 0..255 float32 per piksel, roi bool). Kontras = seberapa 'elemen fokus' piksel itu."""
    f = f.astype(np.float32); R = _roi_mask(f.shape, roi)
    if mode == "latar":
        h, w = f.shape[:2]; b = max(2, int(0.03 * min(h, w)))
        tepi = np.concatenate([f[:b].reshape(-1, 3), f[-b:].reshape(-1, 3), f[:, :b].reshape(-1, 3), f[:, -b:].reshape(-1, 3)])
        k = np.abs(f - np.median(tepi, 0)).max(-1)
    else:
        mx = f.max(-1); mn = f.min(-1); sat = (mx - mn) / (mx + 1e-6); L = _abu(f)
        k = np.clip(L - 150, 0, None) * 2.4 * (sat < 0.3) if mode == "terang" else np.clip(110 - L, 0, None) * 2.3
    k = np.where(R, k, 0).astype(np.float32)
    return k, R


def sinyal(frames, mode="latar", roi=None, ambang=40):
    """frames (N,H,W,3) -> dict saluran per frame (np.array panjang N) + 'potong' (indeks frame yang dimulai potongan keras)."""
    import cv2
    N, H, W = frames.shape[:3]; diag = math.hypot(W, H)
    out = {k: np.full(N, np.nan) for k in ("cx", "cy", "skala", "lebar", "tinggi", "opasitas", "ketajaman", "rotasi", "luas", "kam_ds", "kam_dx", "kam_dy", "kam_dr", "energi", "selisih", "inlier", "lebar_baru")}
    gs = [_abu(f) for f in frames]
    for i, f in enumerate(frames):
        k, R = peta_fokus(f, mode, roi); m = k > ambang
        out["luas"][i] = m.sum() / max(1, R.sum())
        if m.sum() >= max(12, 0.0004 * H * W):
            ys, xs = np.nonzero(m); x0, x1 = np.percentile(xs, [2, 98]); y0, y1 = np.percentile(ys, [2, 98])
            out["cx"][i] = (x0 + x1) / 2 / W; out["cy"][i] = (y0 + y1) / 2 / H
            out["lebar"][i] = (x1 - x0 + 1) / W; out["tinggi"][i] = (y1 - y0 + 1) / H
            out["skala"][i] = math.hypot(x1 - x0 + 1, y1 - y0 + 1) / diag
            out["opasitas"][i] = float(np.percentile(k[m], 90)) / 255
            lap = np.abs(cv2.Laplacian(gs[i], cv2.CV_32F))
            out["ketajaman"][i] = float(lap[m].mean() / (k[m].mean() + 1e-6))
            if m.sum() > 50:
                pts = np.column_stack([xs, ys]).astype(np.float32); ang = cv2.minAreaRect(pts)[2]
                out["rotasi"][i] = ((ang + 45) % 90) - 45
        else:
            out["opasitas"][i] = float(np.percentile(k[R], 99)) / 255 if R.any() else 0.0
    Rr = _roi_mask(frames.shape[1:], roi)
    out["kam_ds"][0] = 1; out["kam_dx"][0] = out["kam_dy"][0] = out["kam_dr"][0] = 0; out["energi"][0] = 0; out["selisih"][0] = 0; out["inlier"][0] = 1; out["lebar_baru"][0] = 0
    for i in range(1, N):
        a, b = gs[i - 1], gs[i]; sel = float(np.abs(a - b).mean()); out["selisih"][i] = sel
        A = None; inl = 0.0
        p0 = cv2.goodFeaturesToTrack(a.astype(np.uint8), 300, 0.01, 4)
        if p0 is not None and len(p0) >= 8:
            p1, st, _ = cv2.calcOpticalFlowPyrLK(a.astype(np.uint8), b.astype(np.uint8), p0, None, winSize=(21, 21), maxLevel=3)
            ok = st.ravel() == 1
            if ok.sum() >= 8:
                A, inm = cv2.estimateAffinePartial2D(p0[ok], p1[ok], method=cv2.RANSAC, ransacReprojThreshold=1.5)
                inl = float(inm.mean()) if inm is not None else 0.0
        if A is not None and inl >= 0.5:
            q = p1[ok][inm.ravel() == 1].reshape(-1, 2)
            # gerak global (kamera) hanya bila titik inlier tersebar luas; satu elemen yang bergerak sendiri bukan kamera
            if np.ptp(q[:, 0]) < 0.35 * W or np.ptp(q[:, 1]) < 0.25 * H: A = None
        if A is not None and inl >= 0.5:
            s = math.hypot(A[0, 0], A[1, 0]); r = math.degrees(math.atan2(A[1, 0], A[0, 0]))
            # translasi kamera diukur di pusat frame (bukan titik asal) supaya zoom murni tidak terbaca sebagai geser
            cxp, cyp = W / 2, H / 2; tx = A[0, 0] * cxp + A[0, 1] * cyp + A[0, 2] - cxp; ty = A[1, 0] * cxp + A[1, 1] * cyp + A[1, 2] - cyp
            out["kam_ds"][i], out["kam_dr"][i], out["kam_dx"][i], out["kam_dy"][i] = s, r, tx / W, ty / W
            warp = cv2.warpAffine(a, A, (W, H), borderMode=cv2.BORDER_REPLICATE)
        else:
            out["kam_ds"][i], out["kam_dr"][i], out["kam_dx"][i], out["kam_dy"][i] = 1, 0, 0, 0; warp = a
        out["inlier"][i] = inl
        ber = (np.abs(b - warp) > 30) & Rr
        out["energi"][i] = ber.sum() / max(1, Rr.sum())
        if ber.any():
            xs = np.nonzero(ber.any(0))[0]; out["lebar_baru"][i] = (xs.max() - xs.min() + 1) / W
        else: out["lebar_baru"][i] = 0
    # potongan keras: selisih besar DAN kamera gagal menjelaskannya (inlier rendah)
    sel = out["selisih"]; med = np.median(sel[1:]) if N > 1 else 0
    out["potong"] = [i for i in range(1, N) if sel[i] > max(18.0, 4 * med) and out["inlier"][i] < 0.5 and out["energi"][i] > 0.25]
    # kamera kumulatif (diputus di potongan)
    s = x = y = r = 0.0; cs, cx_, cy_, cr = [], [], [], []
    for i in range(N):
        if i not in out["potong"]:
            s += math.log(out["kam_ds"][i]); x += out["kam_dx"][i]; y += out["kam_dy"][i]; r += out["kam_dr"][i]
        cs.append(s); cx_.append(x); cy_.append(y); cr.append(r)
    out["kam_s"], out["kam_x"], out["kam_y"], out["kam_r"] = np.exp(cs), np.array(cx_), np.array(cy_), np.array(cr)
    return out


def _isi(a):
    """Isi NaN dengan nilai terdekat (fokus hilang sementara)."""
    a = np.asarray(a, float).copy(); ok = ~np.isnan(a)
    if not ok.any(): return np.zeros_like(a)
    idx = np.arange(len(a)); return np.interp(idx, idx[ok], a[ok])


# ---------- turunan ----------
def _runs(mask, gabung=2, min_len=2):
    seg = []
    for i in np.nonzero(mask)[0]:
        if seg and i - seg[-1][1] <= gabung: seg[-1][1] = i + 1
        else: seg.append([int(i), int(i) + 1])
    return [(a, b) for a, b in seg if b - a >= min_len]


def kecepatan(sg):
    """-> dict saluran -> kecepatan per frame (panjang N, elemen 0 = 0). Frame potongan diberi 0 (bukan gerak)."""
    cx, cy, sk, op = (_isi(sg[k]) for k in ("cx", "cy", "skala", "opasitas"))
    v = {"posisi": np.r_[0, np.hypot(np.diff(cx), np.diff(cy))], "skala": np.r_[0, np.abs(np.diff(np.log(np.maximum(sk, 1e-3))))],
         "opasitas": np.r_[0, np.abs(np.diff(op))],
         "kamera": np.r_[0, np.hypot(np.diff(sg["kam_x"]), np.diff(sg["kam_y"])) + np.abs(np.diff(np.log(sg["kam_s"])))]}
    # lompatan satu frame (unit baru menempel ke bbox, kata berganti) adalah peristiwa diskret, bukan gerak: dipangkas
    for k in ("posisi", "skala", "opasitas"):
        x = v[k]; tetangga = np.maximum(np.r_[0, x[:-1]], np.r_[x[1:], 0])
        v[k] = np.where(x > 3 * np.maximum(tetangga, AMBANG_AKTIF[k]), tetangga, x)
    fokus_ada = ~np.isnan(np.asarray(sg["cx"], float)); lompat = np.r_[False, fokus_ada[1:] != fokus_ada[:-1]]
    for k in v:
        for i in sg["potong"]: v[k][i] = 0
        if k != "kamera": v[k][lompat] = 0
    return v


def _nilai_saluran(sg, ch):
    if ch == "posisi":
        cx, cy = _isi(sg["cx"]), _isi(sg["cy"]); return cx, cy
    if ch == "skala": return np.log(np.maximum(_isi(sg["skala"]), 1e-3)), None
    if ch == "opasitas": return _isi(sg["opasitas"]), None
    return np.log(sg["kam_s"]), (sg["kam_x"], sg["kam_y"])


def progres_segmen(sg, ch, a, b):
    """Progres 0..1 saluran ch pada frame a-1..b (termasuk titik awal diam), plus nilai bersih. Posisi/kamera diproyeksikan ke arah bersih."""
    a0 = max(0, a - 1); b1 = min(len(sg["selisih"]) - 1, b)
    if ch == "posisi":
        cx, cy = _nilai_saluran(sg, ch); P = np.column_stack([cx[a0:b1 + 1], cy[a0:b1 + 1]])
    elif ch == "kamera":
        ls, (x, y) = _nilai_saluran(sg, ch); P = np.column_stack([x[a0:b1 + 1], y[a0:b1 + 1], ls[a0:b1 + 1] * 0.5])
    else:
        v, _ = _nilai_saluran(sg, ch); P = v[a0:b1 + 1, None]
    d = P[-1] - P[0]; n = float(np.linalg.norm(d))
    if n < 1e-9: return None, 0.0
    return (P - P[0]) @ d / n / n, n


def _pecah(vt, a, b, min_len=3):
    """Pecah run [a,b) di lembah kecepatan (< 35 % puncak kiri dan kanan) -> daftar sub-run."""
    x = np.convolve(vt[a:b], np.ones(3) / 3, mode="same")
    for k in np.argsort(x):
        i = a + int(k)
        if i - a < min_len or b - i < min_len: continue
        kiri, kanan = x[:k].max(), x[k + 1:].max()
        # ekor pegas (ayunan balik kecil sesudah gerak utama) tetap satu segmen dengan gerak utamanya
        ekor = x[k + 1:].sum() < 0.35 * x[:k].sum()
        if x[k] < 0.35 * min(kiri, kanan) and not ekor:
            return _pecah(vt, a, i, min_len) + _pecah(vt, i, b, min_len)
        break
    return [(a, b)]


def _pecah_balik(sg, ch, a, b, min_len=3):
    """Gerak pergi-pulang (bersih < 50 % simpangan) dipecah di titik ekstrem -> daftar sub-run."""
    p, net = progres_segmen(sg, ch, a, b)
    if p is None or b - a < 2 * min_len: return [(a, b)]
    if np.ptp(p) > 2.0 or p.max() > 1.5 or p.min() < -0.5:
        k = int(np.argmax(np.abs(p - p[0]) if p.max() > 1.5 or np.ptp(p) > 2 else -p)); i = max(a, a - 1 + k)
        if i - a >= min_len and b - i >= min_len: return _pecah_balik(sg, ch, a, i, min_len) + _pecah_balik(sg, ch, i, b, min_len)
    return [(a, b)]


def segmen(sg, fps=FPS):
    """Segmen gerak (dipecah di lembah kecepatan dan di titik balik) per saluran dominan, dengan fit easing. -> daftar urut waktu."""
    v = kecepatan(sg); out = []
    aktif = {k: v[k] > AMBANG_AKTIF[k] for k in v}
    semua = np.zeros(len(sg["selisih"]), bool)
    for k in aktif: semua |= aktif[k]
    vt = sum(v[k] / AMBANG_AKTIF[k] for k in v)
    runs = []
    for a, b in _runs(semua, gabung=3):
        # perluas ke ekor gerak yang pelan (easing panjang) selama masih ada gerak kecil
        while a > 1 and vt[a - 1] > 0.12 and not semua[a - 1] and not any(r[0] <= a - 1 < r[1] for r in runs): a -= 1
        while b < len(vt) and vt[b] > 0.12 and not semua[b]: b += 1
        runs += _pecah(vt, a, b)
    for a0, b0 in runs:
        # saluran dominan = perubahan BERSIH terbesar (relatif ambang), bukan panjang lintasan: getar kecil tidak menang atas zoom/geser nyata
        skor = {k: (progres_segmen(sg, k, a0, b0)[1] / AMBANG_AKTIF[k]) if v[k][a0:b0].max() > AMBANG_AKTIF[k] else 0.0 for k in v}
        if not any(skor.values()): continue
        ch = max(skor, key=skor.get)
        for a, b in _pecah_balik(sg, ch, a0, b0):
            p, net = progres_segmen(sg, ch, a, b)
            if p is None or len(p) < 3: continue
            bz = fit_bezier(np.interp(np.linspace(0, len(p) - 1, 30), np.arange(len(p)), np.clip(p, -0.5, 1.5)))
            sp = fit_spring(np.clip(p, -0.5, 1.5), fps)
            u = np.linspace(0, 1, len(p))
            out.append({"mulai": int(a), "selesai": int(b), "durasi_frame": int(b - a), "saluran": ch, "besar": round(net, 4),
                        "kurva": bz, "spring": sp, "overshoot": round(min(1.0, max(0.0, float(p.max()) - 1.0)), 3),
                        "deviasi_linear": round(min(1.0, float(np.max(np.abs(p - u)))), 3)})
    return out


def hold(seg, n):
    """Jeda tanpa gerak di antara/di sekitar segmen (frame)."""
    titik = [0] + [x for s in seg for x in (s["mulai"], s["selesai"])] + [n]
    d = [{"mulai": titik[i], "durasi_frame": titik[i + 1] - titik[i]} for i in range(0, len(titik), 2) if titik[i + 1] - titik[i] > 0]
    return {"daftar": d, "maks_frame": max([x["durasi_frame"] for x in d] or [0])}


def onset(sg, min_jarak=2, prominensi=0.5, absolut=0.0015):
    """Puncak energi residu yang MENONJOL (energi turun >= separuh puncak di antara dua onset) = unit baru muncul/berubah.
    Gerak kontinu (skala/geser halus) memberi satu bukit, bukan rentetan onset. Potongan keras dikecualikan. -> indeks frame."""
    from scipy.signal import find_peaks
    e = np.asarray(sg["energi"], float).copy()
    for i in sg["potong"]: e[i] = 0
    if e.max() <= absolut: return []
    pk, pr = find_peaks(np.r_[0, e, 0], height=max(absolut, 0.1 * float(e.max())), distance=min_jarak)
    pk = pk - 1; tinggi = pr["peak_heights"]
    from scipy.signal import peak_prominences
    prom = peak_prominences(np.r_[0, e, 0], pk + 1)[0]
    return [int(i) for i, h, p in zip(pk, tinggi, prom) if p >= prominensi * h]


def stagger(sg, ons=None):
    ons = onset(sg) if ons is None else ons
    if len(ons) < 2: return {"onset_frame": ons, "interval_rata": None, "ketidakrataan_cv": None, "unit": "tidak-ada" if not ons else "tunggal"}
    it = np.diff(ons); lb = float(np.median([sg["lebar_baru"][i] for i in ons]))
    unit = "huruf" if lb < 0.05 else ("kata" if lb < 0.35 else "baris")
    return {"onset_frame": [int(x) for x in ons], "interval_rata": round(float(it.mean()), 2), "ketidakrataan_cv": round(float(it.std() / (it.mean() + 1e-9)), 3), "unit": unit}


def jenis_masuk(sg, i0, arah=1, jendela=12):
    """Klasifikasi masuk (arah=1, dari frame i0 maju) atau keluar (arah=-1, mundur dari i0).
    -> {jenis: potong|fade|blur|mask-reveal|scale|slide|diam, durasi_frame}."""
    N = len(sg["selisih"]); idx = [i for i in range(i0, i0 + arah * jendela, arah) if 0 <= i < N and not np.isnan(sg["cx"][i])]
    if len(idx) < 2: return {"jenis": "potong", "durasi_frame": 0}
    op = np.array([sg["opasitas"][i] for i in idx]); sk = np.array([sg["skala"][i] for i in idx]); kt = np.array([sg["ketajaman"][i] for i in idx])
    cx = np.array([sg["cx"][i] for i in idx]); cy = np.array([sg["cy"][i] for i in idx])
    lw = np.array([sg["lebar"][i] for i in idx]); lh = np.array([sg["tinggi"][i] for i in idx])
    x0 = cx - lw / 2; x1 = cx + lw / 2; y0 = cy - lh / 2; y1 = cy + lh / 2
    akhir = slice(-3, None)
    # durasi = sampai semua saluran menetap (selisih ke nilai akhir < 10 % rentang)
    def menetap(a):
        r = np.ptp(a)
        if r < 1e-6: return 0
        far = np.nonzero(np.abs(a - a[akhir].mean()) > 0.1 * r)[0]; return int(far.max() + 1) if len(far) else 0
    dur = max(menetap(op), menetap(sk), menetap(cx), menetap(cy))
    if dur <= 1 and op[0] > 0.6 * op[akhir].mean(): return {"jenis": "potong", "durasi_frame": 0}
    op_r = op[0] / (op[akhir].mean() + 1e-6); sk_r = sk[0] / (sk[akhir].mean() + 1e-6); kt_r = kt[0] / (kt[akhir].mean() + 1e-6)
    gesr = math.hypot(cx[0] - cx[akhir].mean(), cy[0] - cy[akhir].mean())
    tepi_diam = min(abs(x0[0] - x0[-1]), abs(x1[0] - x1[-1]), abs(y0[0] - y0[-1]), abs(y1[0] - y1[-1])) < 0.01
    tumbuh = max(lw[-1] / (lw[0] + 1e-6), lh[-1] / (lh[0] + 1e-6))
    if tumbuh > 1.4 and tepi_diam and op_r > 0.6: j = "mask-reveal"
    elif abs(math.log(max(sk_r, 1e-3))) > math.log(1.25): j = "scale"
    elif gesr > 0.04: j = "slide"
    elif kt_r < 0.5 and op_r > 0.5: j = "blur"
    elif op_r < 0.6: j = "fade"
    else: j = "diam"
    return {"jenis": j, "durasi_frame": int(dur)}


def _masuk_awal(sg, i0, seg):
    """Elemen yang sudah ada sejak frame 0: jenis masuk diambil dari segmen gerak pertamanya (bukan dari frame 0 yang diam)."""
    if i0 == 0 and seg:
        s = seg[0]; return jenis_masuk(sg, max(0, s["mulai"] - 1), 1, jendela=s["durasi_frame"] + 3)
    return jenis_masuk(sg, i0, 1)


def fokus_ringkas(sg, seg=()):
    ada = ~np.isnan(np.asarray(sg["cx"], float)); N = len(ada)
    if not ada.any(): return {"muncul_frame": None, "hilang_frame": None, "masuk": None, "keluar": None, "rotasi_maks_derajat": 0}
    i0 = int(np.argmax(ada)); i1 = int(N - 1 - np.argmax(ada[::-1]))
    rot = np.asarray(sg["rotasi"], float); rot = rot[~np.isnan(rot)]
    return {"muncul_frame": i0, "hilang_frame": i1 if i1 < N - 1 else None,
            "masuk": _masuk_awal(sg, i0, seg), "keluar": jenis_masuk(sg, i1, -1) if i1 < N - 1 else None,
            "rotasi_maks_derajat": round(float(np.ptp(rot)) if len(rot) else 0.0, 1)}


def transisi(frames, sg, fps=FPS):
    """Wilayah transisi: rentetan frame berselisih besar dengan inlier kamera rendah, >= 3 frame (potongan 1 frame bukan transisi).
    Peta waktu-berubah (32x18) -> arah (fit bidang) dan grid baris x kolom (perkiraan). -> daftar dict."""
    sel = np.asarray(sg["selisih"]); inl = np.asarray(sg["inlier"]); e = np.asarray(sg["energi"])
    m = (e > 0.12) & (inl < 0.6) & (sel > 4)
    out = []
    for a, b in _runs(m, gabung=1, min_len=3):
        a0 = max(0, a - 1); b1 = min(len(frames) - 1, b)
        import cv2
        kecil = [cv2.resize(_abu(frames[i]), (32, 18), interpolation=cv2.INTER_AREA) for i in range(a0, b1 + 1)]
        base = kecil[0]; T = np.full(base.shape, np.nan)
        for t, g in enumerate(kecil[1:], 1):
            baru = np.isnan(T) & (np.abs(g - base) > 25); T[baru] = t
        ok = ~np.isnan(T)
        hasil = {"mulai": int(a), "selesai": int(b), "durasi_frame": int(b - a), "arah": None, "grid": None, "bentuk": "seragam"}
        if ok.sum() > 20 and np.nanstd(T) > 0.5:
            ys, xs = np.nonzero(ok); A = np.column_stack([xs / 31, ys / 17, np.ones(len(xs))]); c, *_ = np.linalg.lstsq(A, T[ok], rcond=None)
            r2 = 1 - np.var(T[ok] - A @ c) / (np.var(T[ok]) + 1e-9)
            if r2 > 0.4:
                n = math.hypot(c[0], c[1]) + 1e-9; hasil["arah"] = [round(c[0] / n, 2), round(c[1] / n, 2)]; hasil["bentuk"] = "linear"
            # grid: blok dengan varians-dalam-sel rendah dan berbeda antar sel
            Tf = np.where(ok, T, np.nanmax(T) + 1); tot = Tf.var() + 1e-9; best = None
            for R in (2, 3, 4, 6, 9, 18):
                for C in (2, 4, 8, 16, 32):
                    if 18 % R or 32 % C: continue
                    blk = Tf.reshape(R, 18 // R, C, 32 // C); dalam = blk.var(axis=(1, 3)).mean() / tot
                    if dalam < 0.15 and (best is None or R * C < best[0] * best[1]): best = (R, C, dalam)
            if best and best[0] * best[1] >= 4 and hasil["bentuk"] != "linear" or (best and best[0] * best[1] >= 16):
                hasil["grid"] = {"baris": best[0], "kolom": best[1], "skala_analisis": "18x32"}; hasil["bentuk"] = "grid"
        out.append(hasil)
    return out


def kamera_ringkas(sg, seg):
    ks = [s for s in seg if s["saluran"] == "kamera"]
    return {"skala_total": round(float(sg["kam_s"][-1] / sg["kam_s"][0]), 3), "skala_maks": round(float(np.max(sg["kam_s"])), 3), "skala_min": round(float(np.min(sg["kam_s"])), 3),
            "geser_x": round(float(sg["kam_x"][-1]), 3), "geser_y": round(float(sg["kam_y"][-1]), 3),
            "rentang_x": round(float(np.ptp(sg["kam_x"])), 3), "rentang_y": round(float(np.ptp(sg["kam_y"])), 3),
            "n_segmen": len(ks), "jangkar": len(ks) + 1 if ks else 0}


def resample(a, n=N_KURVA):
    a = _isi(a); return np.interp(np.linspace(0, len(a) - 1, n), np.arange(len(a)), a)


def kurva_sinyal(sg, n=N_KURVA):
    e = np.asarray(sg["energi"], float); e = e / (e.max() + 1e-9)
    d = {"cx": sg["cx"], "cy": sg["cy"], "skala": sg["skala"], "opasitas": sg["opasitas"], "kamera_s": sg["kam_s"], "kamera_x": sg["kam_x"], "kamera_y": sg["kam_y"], "energi": e}
    return {"n": n, **{k: [round(float(x), 4) for x in resample(v, n)] for k, v in d.items()}}


def tanda_tangan(frames, mode="latar", roi=None, fps=FPS):
    """Satu urutan frame -> dict tanda tangan gerak (bagian terukur spec-gerak)."""
    sg = sinyal(frames, mode, roi); seg = segmen(sg, fps); ons = onset(sg)
    tt = {"durasi_frame": int(len(frames)), "fokus": fokus_ringkas(sg, seg), "segmen": seg, "hold": hold(seg, len(frames)),
          "stagger": stagger(sg, ons), "potong": [int(i) for i in sg["potong"]], "transisi": transisi(frames, sg, fps),
          "kamera": kamera_ringkas(sg, seg), "kurva_sinyal": kurva_sinyal(sg)}
    return tt, sg


# ---------- plot ----------
def plot(sg, tt, keluar, judul="", banding=None):
    """Plot kurva bukti. banding = (sg_ref, label_ref): overlay referensi pada waktu ternormalisasi."""
    import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
    N = len(sg["selisih"]); t = np.linspace(0, 1, N) if banding else np.arange(N)
    fig, ax = plt.subplots(5, 1, figsize=(9, 10), sharex=True)
    sal = [("posisi", [("cx", "cx"), ("cy", "cy")]), ("skala", [("skala", "skala fokus")]), ("opasitas", [("opasitas", "opasitas/kontras")]),
           ("kamera", [("kam_s", "skala kamera"), ("kam_x", "geser x"), ("kam_y", "geser y")]), ("energi", [("energi", "energi residu")])]
    for a, (nm, ls) in zip(ax, sal):
        for k, lab in ls:
            a.plot(t, _isi(sg[k]) if k not in ("energi",) else sg[k], label=f"{lab}" + (" (demo)" if banding else ""))
            if banding:
                r = banding[0]; a.plot(np.linspace(0, 1, len(r["selisih"])), _isi(r[k]) if k != "energi" else r[k], "--", label=f"{lab} ({banding[1]})")
        a.set_ylabel(nm); a.legend(fontsize=6, loc="upper right")
        if not banding:
            for s in tt["segmen"]: a.axvspan(s["mulai"], s["selesai"], color="0.85", zorder=-1)
            for i in tt["potong"]: a.axvline(i, color="r", lw=0.8)
    if not banding:
        for i in tt["stagger"]["onset_frame"]: ax[4].axvline(i, color="g", lw=0.6)
    ax[-1].set_xlabel("waktu ternormalisasi" if banding else f"frame @{FPS} fps"); fig.suptitle(judul, fontsize=9); fig.tight_layout()
    Path(keluar).parent.mkdir(parents=True, exist_ok=True); fig.savefig(keluar, dpi=80); plt.close(fig)


# ---------- perbandingan ----------
LANTAI = {"cx": 0.03, "cy": 0.03, "skala": 0.03, "opasitas": 0.15, "kamera_s": 0.03, "kamera_x": 0.03, "kamera_y": 0.03}
AMBANG = {"rms_kurva": 0.25, "durasi_rel": 0.15, "overshoot_abs": 0.05, "stagger_rel": 0.20, "stagger_cv_abs": 0.20, "hold_min": 6}


def _norm(a):
    a = np.asarray(a, float); r = a.max() - a.min(); return (a - a.min()) / r if r > 1e-9 else a * 0


def _seg_utama(tt):
    s = [x for x in tt["segmen"] if x["durasi_frame"] >= 3]
    return max(s, key=lambda x: x["durasi_frame"] * (1 + x["besar"])) if s else None


def _padanan(su, ref, demo):
    """Segmen demo yang paling tumpang-tindih (waktu ternormalisasi) dengan segmen utama referensi, saluran apa pun:
    zoom yang terbaca 'skala' di satu klip bisa terbaca 'kamera' di klip lain (teks memenuhi frame), geraknya tetap sama."""
    a0, a1 = su["mulai"] / ref["durasi_frame"], su["selesai"] / ref["durasi_frame"]; best, bo = None, 0.0
    for s in demo["segmen"]:
        b0, b1 = s["mulai"] / demo["durasi_frame"], s["selesai"] / demo["durasi_frame"]
        o = max(0.0, min(a1, b1) - max(a0, b0)) / max(a1 - a0, b1 - b0)
        if o > bo: best, bo = s, o
    return best if bo >= 0.3 else None


def bandingkan(ref, demo):
    """ref, demo: tanda tangan (dict spec). -> {metrik, gagal[], dosa{s,t,u,r}}. Tanpa metrik tampilan (tidak ada SSIM/struktur)."""
    M, G, D = {}, [], {}
    kr, kd = ref["kurva_sinyal"], demo["kurva_sinyal"]; rms = {}
    for ch, lt in LANTAI.items():
        a = np.asarray(kr[ch], float)
        if np.ptp(a) < lt: continue
        b = np.asarray(kd[ch], float); nb = _norm(b) if np.ptp(b) >= lt / 3 else np.full_like(b, 0.5)
        r = float(np.sqrt(np.mean((_norm(a) - nb) ** 2))); r_bal = float(np.sqrt(np.mean((_norm(a) - (1 - nb)) ** 2)))
        rms[ch] = round(min(r, r_bal) if ch in ("cx", "cy", "kamera_x", "kamera_y") else r, 3)  # arah posisi boleh dicerminkan
        if rms[ch] > AMBANG["rms_kurva"]: G.append(f"RMS kurva {ch} {rms[ch]} > {AMBANG['rms_kurva']}")
    M["rms_kurva"] = rms
    M["korelasi_energi"] = round(float(np.corrcoef(kr["energi"], kd["energi"])[0, 1]) if np.ptp(kd["energi"]) > 0 and np.ptp(kr["energi"]) > 0 else 0.0, 3)
    dur = lambda tt: sum(s["durasi_frame"] for s in tt["segmen"])
    dr, dd = dur(ref), dur(demo); M["durasi_gerak"] = {"ref": dr, "demo": dd, "selisih_rel": round(abs(dd - dr) / dr, 3) if dr else None}
    if dr and abs(dd - dr) / dr > AMBANG["durasi_rel"]: G.append(f"durasi gerak demo {dd} vs ref {dr} frame (> {int(AMBANG['durasi_rel'] * 100)} %)")
    M["durasi_klip"] = {"ref": ref["durasi_frame"], "demo": demo["durasi_frame"]}
    if abs(demo["durasi_frame"] - ref["durasi_frame"]) / ref["durasi_frame"] > AMBANG["durasi_rel"]: G.append("durasi klip demo berbeda > 15 % dari referensi")
    su = _seg_utama(ref); sd = _padanan(su, ref, demo) if su else None
    if su:
        M["segmen_utama"] = {"ref": {k: su[k] for k in ("saluran", "durasi_frame", "overshoot", "deviasi_linear")} | {"bezier": su["kurva"]["bezier"]},
                             "demo": ({k: sd[k] for k in ("saluran", "durasi_frame", "overshoot", "deviasi_linear")} | {"bezier": sd["kurva"]["bezier"]}) if sd else None}
        if not sd: G.append("segmen gerak utama tidak ada di demo")
        else:
            if abs(sd["durasi_frame"] - su["durasi_frame"]) / su["durasi_frame"] > AMBANG["durasi_rel"]:
                G.append(f"durasi segmen utama demo {sd['durasi_frame']} vs ref {su['durasi_frame']} frame (> 15 %)")
            if max(su["overshoot"], sd["overshoot"]) > 0.03 and abs(su["overshoot"] - sd["overshoot"]) > AMBANG["overshoot_abs"]:
                G.append(f"overshoot demo {sd['overshoot']} vs ref {su['overshoot']}")
    sr, sdm = ref["stagger"], demo["stagger"]; M["stagger"] = {"ref": {k: sr[k] for k in ("interval_rata", "ketidakrataan_cv", "unit")} | {"n": len(sr["onset_frame"])},
                                                              "demo": {k: sdm[k] for k in ("interval_rata", "ketidakrataan_cv", "unit")} | {"n": len(sdm["onset_frame"])}}
    if len(sr["onset_frame"]) >= 3:
        if sdm["interval_rata"] is None: G.append("demo tanpa stagger padahal referensi ber-stagger")
        else:
            if abs(sdm["interval_rata"] - sr["interval_rata"]) / sr["interval_rata"] > AMBANG["stagger_rel"]: G.append(f"interval stagger demo {sdm['interval_rata']} vs ref {sr['interval_rata']} frame")
            if abs(sdm["ketidakrataan_cv"] - sr["ketidakrataan_cv"]) > AMBANG["stagger_cv_abs"]: G.append(f"ketidakrataan stagger demo {sdm['ketidakrataan_cv']} vs ref {sr['ketidakrataan_cv']}")
    for k in ("masuk", "keluar"):
        a, b = (ref["fokus"] or {}).get(k), (demo["fokus"] or {}).get(k)
        M[f"jenis_{k}"] = {"ref": a and a["jenis"], "demo": b and b["jenis"]}
        if a and a["jenis"] != "diam" and (not b or b["jenis"] != a["jenis"]): G.append(f"jenis {k} demo {b and b['jenis']} != ref {a['jenis']}")
    # dosa gerak biner
    nonlin_ref = [s for s in ref["segmen"] if s["durasi_frame"] >= 4 and s["deviasi_linear"] > 0.12]
    seg_d = [s for s in demo["segmen"] if s["durasi_frame"] >= 4]
    if nonlin_ref and seg_d and all(s["deviasi_linear"] < 0.06 for s in seg_d): D["s"] = f"semua segmen demo hampir linear (deviasi {[s['deviasi_linear'] for s in seg_d][:5]}) padahal referensi ber-easing"
    if len(seg_d) >= 3:
        bz = np.array([s["kurva"]["bezier"] for s in seg_d]); bzr = np.array([s["kurva"]["bezier"] for s in ref["segmen"] if s["durasi_frame"] >= 4] or [[0] * 4])
        if np.ptp(bz, 0).max() < 0.03 and len(bzr) >= 3 and np.ptp(bzr, 0).max() > 0.15: D["s"] = (D.get("s", "") + "; kurva demo seragam di semua segmen padahal referensi bervariasi").lstrip("; ")
    if ref["hold"]["maks_frame"] >= AMBANG["hold_min"] and demo["hold"]["maks_frame"] < AMBANG["hold_min"]:
        D["t"] = f"hold demo maks {demo['hold']['maks_frame']} frame < {AMBANG['hold_min']} padahal referensi menahan {ref['hold']['maks_frame']} frame"
    if len(sr["onset_frame"]) >= 3 and (sr["interval_rata"] or 0) >= 2 and len(sdm["onset_frame"]) <= 1:
        D["u"] = f"semua unit demo masuk serentak ({len(sdm['onset_frame'])} onset) padahal referensi ber-stagger ({len(sr['onset_frame'])} onset)"
    if len(demo["potong"]) > len(ref["potong"]) + 1 or (not ref["potong"] and len(demo["potong"]) >= 1 and not ref["transisi"]):
        D["r"] = f"loncatan/potongan frame di demo {demo['potong']} tanpa padanan di referensi ({ref['potong']})"
    return {"metrik": M, "gagal": G, "dosa": D}
