#!/usr/bin/env python3
"""Uji ekstraktor gerak (pabrik/gerak.py) dengan fixture sintetis berparameter diketahui, skema data ukur (ukur-gerak) dan
primitif (spec-gerak v4), frame duplikat, dan cek uji transfer uji.py (probe DOM sintetis, kulit bocor). Butuh numpy, cv2, scipy,
jsonschema."""
import copy, json, sys, unittest
from pathlib import Path

P = Path(__file__).resolve().parents[2] / "pabrik"
sys.path.insert(0, str(P))
try:
    import numpy as np, cv2, scipy  # noqa: F401
    import jsonschema  # noqa: F401
    import gerak as G
    import ekstrak
    OK = True
except ImportError:  # pragma: no cover
    OK = False

BG = (244, 244, 245); TINTA = (60, 60, 70)


def render(N, gambar, S=4, W=320, H=180):
    """Gambar di 4x lalu turunkan (antialias) supaya gerak subpiksel terbaca seperti render nyata."""
    out = []
    for i in range(N):
        im = np.zeros((H * S, W * S, 3), np.uint8); im[:] = BG; gambar(im, i, S)
        out.append(cv2.resize(im, (W, H), interpolation=cv2.INTER_AREA))
    return np.stack(out)


def p_bz(i, m, d, bz): return float(G.bezier_y(np.clip((i - m) / d, 0, 1), *bz))


def kotak_geser(bz, N=45, mulai=5, dur=20):
    def g(im, i, S):
        x = 40 + 200 * p_bz(i, mulai, dur, bz); cv2.rectangle(im, (int(x * S), 70 * S), (int((x + 40) * S), 110 * S), TINTA, -1)
    return render(N, g)


def kotak_pegas(k, c, N=60):
    def g(im, i, S):
        x = 40 + 200 * float(G.spring_x(max(0, i - 5) / 30, k, c)); cv2.rectangle(im, (int(x * S), 70 * S), (int((x + 40) * S), 110 * S), TINTA, -1)
    return render(N, g)


def kotak_fade(N=40):
    def g(im, i, S):
        a = p_bz(i, 5, 15, (0.4, 0, 0.6, 1)); col = tuple(int(BG[j] + (TINTA[j] - BG[j]) * a) for j in range(3))
        cv2.rectangle(im, (140 * S, 70 * S), (180 * S, 110 * S), col, -1)
    return render(N, g)


def kotak_skala(N=40):
    def g(im, i, S):
        s = 0.2 + 0.8 * p_bz(i, 5, 15, (0.45, 0, 0.55, 1)); h = int(30 * s * S)
        cv2.rectangle(im, (160 * S - h, 90 * S - h), (160 * S + h, 90 * S + h), TINTA, -1)
    return render(N, g)


def stagger(on=(5, 11, 15, 23), N=35):
    def g(im, i, S):
        for k, o in enumerate(on):
            if i >= o: cv2.rectangle(im, ((40 + 60 * k) * S, 80 * S), ((80 + 60 * k) * S, 100 * S), TINTA, -1)
    return render(N, g)


def serentak(N=35):
    return stagger(on=(5, 5, 5, 5), N=N)


def zoom_tekstur(bz=(0.75, 0, 0.18, 1), N=40):
    rng = np.random.default_rng(3); t = (rng.random((90, 160)) * 255).astype(np.uint8)
    t = np.dstack([cv2.resize(cv2.GaussianBlur(t, (3, 3), 0), (640, 360), interpolation=cv2.INTER_NEAREST)] * 3); out = []
    for i in range(N):
        M = cv2.getRotationMatrix2D((320, 180), 0, 1 + 0.3 * p_bz(i, 5, 20, bz))
        out.append(cv2.resize(cv2.warpAffine(t, M, (640, 360), borderMode=cv2.BORDER_REFLECT), (320, 180), interpolation=cv2.INTER_AREA))
    return np.stack(out)


def utama(tt):
    return G._seg_utama(tt)


@unittest.skipUnless(OK, "butuh numpy/cv2/scipy/jsonschema")
class TestFit(unittest.TestCase):
    def test_bezier_fit_langsung(self):
        for bz in ((0.75, 0, 0.18, 1), (0.45, 0, 0.55, 1), (0.22, 1, 0.36, 1)):
            f = G.fit_bezier(G.bezier_y(np.linspace(0, 1, 30), *bz))
            np.testing.assert_allclose(f["bezier"], bz, atol=0.06, err_msg=str(bz)); self.assertLess(f["rms"], 0.01)

    def test_kurva_bernama_dari_curves_ts(self):
        nb = G.kurva_bernama(); self.assertIn("heavy", nb); self.assertEqual(nb["heavy"], [0.75, 0, 0.18, 1])
        self.assertEqual(G.fit_bezier(G.bezier_y(np.linspace(0, 1, 30), *nb["whip"]))["terdekat"]["nama"], "whip")

    def test_spring_fit_langsung(self):
        t = np.arange(40) / 30; f = G.fit_spring(G.spring_x(t, 200, 14))
        self.assertAlmostEqual(f["stiffness"], 200, delta=10); self.assertAlmostEqual(f["damping"], 14, delta=1)


@unittest.skipUnless(OK, "butuh numpy/cv2/scipy/jsonschema")
class TestEkstraktor(unittest.TestCase):
    def test_geser_heavy_parameter_kembali(self):
        tt, _ = G.tanda_tangan(kotak_geser((0.75, 0, 0.18, 1)))
        s = utama(tt); self.assertEqual(s["saluran"], "posisi")
        np.testing.assert_allclose(s["kurva"]["bezier"], (0.75, 0, 0.18, 1), atol=0.1)
        self.assertEqual(s["kurva"]["terdekat"]["nama"], "heavy"); self.assertAlmostEqual(s["durasi_frame"], 20, delta=3)
        self.assertEqual(s["overshoot"], 0); self.assertEqual(tt["fokus"]["masuk"]["jenis"], "slide")

    def test_geser_reveal_bentuk_kurva(self):
        """Ekor reveal sangat pelan (< 0,1 px/frame) terpotong; yang diuji: bentuk terukur cocok dengan kurva asli di rentang terukur."""
        bz = (0.22, 1, 0.36, 1); tt, _ = G.tanda_tangan(kotak_geser(bz)); s = utama(tt)
        u = np.linspace(0, 1, 40); asli = G.bezier_y(u * (s["selesai"] - 4) / 20, *bz); asli = asli / asli[-1]
        self.assertLess(float(np.sqrt(np.mean((G.bezier_y(u, *s["kurva"]["bezier"]) - asli) ** 2))), 0.05)
        self.assertEqual(s["kurva"]["terdekat"]["nama"], "reveal")

    def test_pegas_stiffness_damping_overshoot(self):
        tt, _ = G.tanda_tangan(kotak_pegas(170, 12)); s = utama(tt)
        self.assertAlmostEqual(s["spring"]["stiffness"], 170, delta=170 * 0.15); self.assertAlmostEqual(s["spring"]["damping"], 12, delta=12 * 0.15)
        z = 12 / (2 * np.sqrt(170)); teori = float(np.exp(-np.pi * z / np.sqrt(1 - z * z)))
        self.assertAlmostEqual(s["overshoot"], teori, delta=0.04)

    def test_fade_dan_skala(self):
        tt, _ = G.tanda_tangan(kotak_fade()); self.assertEqual(tt["fokus"]["masuk"]["jenis"], "fade"); self.assertEqual(utama(tt)["saluran"], "opasitas")
        np.testing.assert_allclose(utama(tt)["kurva"]["bezier"], (0.4, 0, 0.6, 1), atol=0.1)
        tt, _ = G.tanda_tangan(kotak_skala()); self.assertEqual(utama(tt)["saluran"], "skala")

    def test_stagger_interval_dan_ketidakrataan(self):
        tt, _ = G.tanda_tangan(stagger()); st = tt["stagger"]
        self.assertEqual(st["onset_frame"], [5, 11, 15, 23]); self.assertAlmostEqual(st["interval_rata"], 6.0)
        self.assertAlmostEqual(st["ketidakrataan_cv"], float(np.std([6, 4, 8]) / 6), places=2); self.assertEqual(st["unit"], "kata")

    def test_kamera_zoom(self):
        tt, sg = G.tanda_tangan(zoom_tekstur()); self.assertAlmostEqual(tt["kamera"]["skala_total"], 1.3, delta=0.03)
        s = utama(tt); self.assertEqual(s["saluran"], "kamera"); np.testing.assert_allclose(s["kurva"]["bezier"], (0.75, 0, 0.18, 1), atol=0.1)
        self.assertLess(abs(tt["kamera"]["geser_x"]) + abs(tt["kamera"]["geser_y"]), 0.01)

    def test_satu_elemen_bergerak_bukan_kamera(self):
        tt, _ = G.tanda_tangan(kotak_geser((0.75, 0, 0.18, 1))); self.assertEqual(tt["kamera"]["n_segmen"], 0)

    def test_potongan_keras(self):
        a = kotak_geser((0.75, 0, 0.18, 1), N=20); b = zoom_tekstur(N=20); tt, _ = G.tanda_tangan(np.concatenate([a, b]))
        self.assertIn(20, tt["potong"])


@unittest.skipUnless(OK, "butuh numpy/cv2/scipy/jsonschema")
class TestBanding(unittest.TestCase):
    def setUp(self):
        self.ref, _ = G.tanda_tangan(stagger())

    def test_identik_lulus(self):
        h = G.bandingkan(self.ref, copy.deepcopy(self.ref)); self.assertEqual(h["dosa"], {}); self.assertEqual(h["gagal"], [])

    def test_serentak_dosa_u(self):
        d, _ = G.tanda_tangan(serentak()); self.assertIn("u", G.bandingkan(self.ref, d)["dosa"])

    def test_linear_dosa_s(self):
        r, _ = G.tanda_tangan(kotak_geser((0.75, 0, 0.18, 1))); d, _ = G.tanda_tangan(kotak_geser((0.0, 0.0, 1.0, 1.0)))
        self.assertIn("s", G.bandingkan(r, d)["dosa"]); self.assertNotIn("s", G.bandingkan(r, r)["dosa"])

    def test_tanpa_hold_dosa_t(self):
        r, _ = G.tanda_tangan(kotak_geser((0.75, 0, 0.18, 1))); d = copy.deepcopy(r); d["hold"]["maks_frame"] = 3
        self.assertIn("t", G.bandingkan(r, d)["dosa"])

    def test_loncatan_dosa_r(self):
        r, _ = G.tanda_tangan(kotak_geser((0.75, 0, 0.18, 1))); d = copy.deepcopy(r); d["potong"] = [12]
        self.assertIn("r", G.bandingkan(r, d)["dosa"])

    def test_durasi_lebih_dari_15_persen_gagal(self):
        r, _ = G.tanda_tangan(kotak_geser((0.75, 0, 0.18, 1), dur=20)); d, _ = G.tanda_tangan(kotak_geser((0.75, 0, 0.18, 1), dur=10))
        g = G.bandingkan(r, d)["gagal"]; self.assertTrue(any("durasi" in x for x in g), g)

    def test_tanpa_metrik_tampilan(self):
        h = G.bandingkan(self.ref, self.ref); teks = json.dumps(h).lower()
        for k in ("ssim", "struktur", "palet", "edge"): self.assertNotIn(k, teks)


@unittest.skipUnless(OK, "butuh numpy/cv2/scipy/jsonschema")
class TestSkemaGerak(unittest.TestCase):
    def spec(self):
        tt, _ = G.tanda_tangan(stagger())
        return {"versi": 3, "id": "99-T1", "kartu": "99", "teknik": "T1", "komponen": "Contoh", "jenis": "kt", "mekanik": ekstrak.mekanik_otomatis(tt), "catatan": "x",
                "sumber": {"statis": False, "klip": {"path": "/x.mp4", "dari": 0, "sampai": 1}, "fps": 30, "lebar_analisis": 320, "rasio": "16:9", "fokus": {"mode": "latar", "roi": None}},
                **tt, "plot": "pabrik/spec/x.png"}

    def test_valid(self):
        self.assertEqual(ekstrak.validasi(self.spec()), [])

    def test_klip_tanpa_kurva_ditolak(self):
        s = self.spec(); del s["kurva_sinyal"]; self.assertTrue(ekstrak.validasi(s))

    def test_statis_tanpa_kurva_valid(self):
        s = {"versi": 3, "id": "46-T1", "kartu": "46", "teknik": "T1", "komponen": "Tangga", "jenis": "kt", "mekanik": ["lompatan skala dua tingkat"], "catatan": "statis",
             "sumber": {"statis": True, "keyframe": ["a.jpg"], "fps": 30, "rasio": "16:9"}}
        self.assertEqual(ekstrak.validasi(s), [])

    def test_properti_tampilan_ditolak(self):
        s = self.spec(); s["palet"] = ["#ff0000"]; self.assertTrue(ekstrak.validasi(s))
        s = self.spec(); s["nama_gerak"] = ["wallpaper-senja"]; self.assertTrue(ekstrak.validasi(s))

    def test_mekanik_dari_angka(self):
        m = " ".join(self.spec()["mekanik"]); self.assertIn("Stagger 4 onset", m); self.assertIn("interval rata-rata 6.0", m)

    def test_data_ukur_repo_valid(self):
        for f in sorted((P / "ukur" / "data").glob("*.json")):
            self.assertEqual(ekstrak.validasi(json.loads(f.read_text())), [], f.name)



@unittest.skipUnless(OK, "butuh numpy/cv2/scipy/jsonschema")
class TestFrameDuplikat(unittest.TestCase):
    def test_animasi_25_di_30(self):
        # animasi 25 fps ditampilkan di 30 fps: tiap 6 frame kontainer satu frame animasi diulang
        idx = np.floor(np.arange(36) * 25 / 30).astype(int)
        fr = render(36, lambda im, i, S: cv2.circle(im, ((40 + 6 * int(idx[i])) * S, 90 * S), 20 * S, TINTA, -1))
        d = G.frame_duplikat(fr); self.assertEqual(d["periode"], 6); self.assertAlmostEqual(d["fps_animasi"], 25.0)

    def test_tanpa_duplikat(self):
        fr = render(20, lambda im, i, S: cv2.circle(im, ((40 + 5 * i) * S, 90 * S), 20 * S, TINTA, -1))
        self.assertEqual(G.frame_duplikat(fr)["frame"], [])


def _primitif(**ubah):
    s = json.loads((P / "spec" / "tipografi-unit-masuk-meluncur.json").read_text()); s.update(ubah); return s


@unittest.skipUnless(OK, "butuh numpy/cv2/scipy/jsonschema")
class TestSpecPrimitif(unittest.TestCase):
    def setUp(self):
        from jsonschema import Draft202012Validator
        self.v = Draft202012Validator(json.loads((P / "spec-gerak.schema.json").read_text()))

    def galat(self, s): return list(self.v.iter_errors(s))

    def test_repo_valid_dan_berbukti(self):
        fs = sorted((P / "spec").glob("*.json")); self.assertTrue(fs)
        for f in fs:
            s = json.loads(f.read_text()); self.assertEqual(self.galat(s), [], f.name)
            for a in s["parameter"]: self.assertIn(a["label"], ("measured", "estimated"), f.name)
            self.assertTrue(any(x["dari_catalog"] for x in s["pemicu"]), f"{f.name}: pemicu dari CATALOG")

    def test_pemicu_catalog_ada(self):
        cat = (P.parent / "cookbook" / "CATALOG.md").read_text()
        for f in sorted((P / "spec").glob("*.json")):
            for x in json.loads(f.read_text())["pemicu"]:
                if x["dari_catalog"]: self.assertIn(x["istilah"], cat, f.name)

    def test_id_pola_lapisan(self):
        self.assertTrue(self.galat(_primitif(id="WordBeat"))); self.assertTrue(self.galat(_primitif(id="suara-x-y")))

    def test_wajib_slot_dan_jangan_dicuri(self):
        for k in ("pemicu", "alasan_bekerja", "slot", "jangan_dicuri"):
            s = _primitif(); del s[k]; self.assertTrue(self.galat(s), k)

    def test_estimated_inti_batasi_status(self):
        s = _primitif(); s["parameter"][0] = dict(s["parameter"][0], label="estimated"); self.assertTrue(self.galat(s))
        s["status_maks"] = "teruji-sebagian"; self.assertEqual(self.galat(s), [])
        s = _primitif(); s["kurva"] = dict(s["kurva"], label="estimated"); self.assertTrue(self.galat(s))

    def test_resep_hanya_id(self):
        ids = {json.loads(f.read_text())["id"] for f in (P / "spec").glob("*.json")}
        for f in (P / "resep").glob("*.json"):
            r = json.loads(f.read_text()); self.assertEqual(set(r) - {"id", "primitif", "urutan", "catatan"}, set(), f.name)
            for x in r["primitif"]: self.assertRegex(x, r"^(tipografi|visual|kamera|transisi)-")
        self.assertTrue(ids)


def _probe(unit, H=720, W=1280, n=54, durasi=7, dy=0.15, fade=False, linear=False, lewat=0.0, blur=True):
    """Probe DOM sintetis: unit (teks, onset) masuk dari bawah ke y diam 300 px."""
    import uji
    pr = {f: [] for f in range(n)}
    for k, (teks, o) in enumerate(unit):
        for f in range(n):
            if f < o: op, p = 0.0, 0.0
            else:
                u = min(1.0, (f - o) / durasi)
                p = u if linear else float(G.bezier_y(u, *json.loads((P / "spec" / "tipografi-unit-masuk-meluncur.json").read_text())["kurva"]["bezier"]))
                p = p + lewat * np.sin(np.pi * u) if lewat else p
                op = min(1.0, (f - o + 1) / 4) if fade else 1.0
            y = 300 + (1 - p) * dy * H
            pr[f].append({"teks": teks, "x": 200 + 200 * k, "y": y, "w": 120, "h": 60, "fs": 60, "op": op, "blur": (1 - p) * 7 if blur else 0.0,
                          "tutup": 0, "tutup_objek": 0, "wadah_keluar": False})
    return pr


@unittest.skipUnless(OK, "butuh numpy/cv2/scipy/jsonschema")
class TestUjiTransfer(unittest.TestCase):
    U = [("Satu", 3), ("dua", 15), ("tiga", 27), ("empat", 39)]

    def cek(self, **kw):
        import uji
        return uji.cek_unit_masuk(_primitif(), _probe(self.U, **kw), 1280, 720)[1]

    def test_lulus_sesuai_spec(self):
        self.assertEqual(self.cek(), [])

    def test_fade_ditolak(self):
        self.assertTrue(any("bukan potong" in g for g in self.cek(fade=True)))

    def test_linear_ditolak(self):
        self.assertTrue(any("RMS progres" in g for g in self.cek(linear=True)))

    def test_durasi_dan_offset(self):
        self.assertTrue(any("durasi luncur" in g for g in self.cek(durasi=14)))
        self.assertTrue(any("offset_y" in g for g in self.cek(dy=0.3)))

    def test_pantul_dan_blur(self):
        self.assertTrue(any("melewati" in g for g in self.cek(lewat=0.15)))
        self.assertTrue(any("blur" in g for g in self.cek(blur=False)))

    def test_ganti_di_jangkar(self):
        import uji
        sp = json.loads((P / "spec" / "tipografi-ganti-unit-di-jangkar.json").read_text()); on = sp["uji"]["demo"]["onset"]; n = sp["uji"]["demo"]["durasi"]
        def pr(geser=0, celah=0):
            out = {f: [] for f in range(n)}
            for i, o in enumerate(on):
                akhir = (on[i + 1] - 1 - celah) if i + 1 < len(on) else n - 1
                for f in range(o, akhir + 1):
                    w = 80 + 40 * i; out[f].append({"teks": f"k{i}", "x": 360 - w / 2 + geser * (f - o), "y": 600, "w": w, "h": 60, "op": 1.0, "blur": 0})
            return out
        self.assertEqual(uji.cek_unit_ganti(sp, pr(), 720, 1280)[1], [])
        self.assertTrue(uji.cek_unit_ganti(sp, pr(geser=3), 720, 1280)[1])
        self.assertTrue(any("tanpa celah" in g for g in uji.cek_unit_ganti(sp, pr(celah=2), 720, 1280)[1]))

    def test_kulit_bocor_warna(self):
        import uji, tempfile
        from PIL import Image
        with tempfile.TemporaryDirectory() as d:
            fs = []
            for i, warna in enumerate([(201, 214, 223)] * 3):
                im = Image.new("RGB", (320, 180), warna); f = Path(d) / f"f{i}.jpg"; im.save(f); fs.append(f)
            self.assertEqual(uji.kulit_bocor(fs, _primitif()), [])
            im = Image.new("RGB", (320, 180), (0x50, 0x6D, 0xF1)); f = Path(d) / "x.jpg"; im.save(f)
            self.assertTrue(uji.kulit_bocor([f], _primitif()))

    def test_campuran_token_kit_bukan_bocor(self):
        import uji, tempfile
        from PIL import Image
        sp = _primitif(); sp["jangan_dicuri"] = dict(sp["jangan_dicuri"], warna=["#8992A1"])
        a, b = (np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)]) for h in ("#C9D6DF", "#1E3A5F"))
        with tempfile.TemporaryDirectory() as d:
            f = Path(d) / "c.png"; Image.new("RGB", (320, 180), tuple(int(v) for v in (a * 0.6 + b * 0.4))).save(f)
            self.assertTrue(uji.kulit_bocor([f], sp))                 # tanpa info kit: dekat warna referensi
            self.assertEqual(uji.kulit_bocor([f], sp, "A"), [])       # campuran dua token isian A: berasal dari kit
            sp["jangan_dicuri"]["warna"] = ["#1E3A5F"]; self.assertTrue(uji.kulit_bocor([f], sp, "A"))  # token sendiri tetap dicek

    def test_uji_tanpa_tampilan_referensi(self):
        src = (P / "uji.py").read_text()
        for k in ("flipbook", "baca_klip", "karakter_sama", "ssim"): self.assertNotIn(k, src)


if __name__ == "__main__":
    unittest.main()
