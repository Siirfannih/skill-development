#!/usr/bin/env python3
"""Uji ref_spec.py dan banding.py (KEBIJAKAN-v2): sidik jari F1, selisih vs referensi, REF-SPEC dari folder still. Butuh numpy + PIL."""
import json, subprocess, sys, tempfile, unittest
from pathlib import Path

try:
    import numpy as np
    from PIL import Image
except ImportError:
    np = None
try:
    import scipy
except ImportError:
    scipy = None

S = Path(__file__).resolve().parents[1]


def jalan(*a):
    return subprocess.run([sys.executable, *map(str, a)], capture_output=True, text=True)


def simpan(p, arr): Image.fromarray(arr.astype("uint8")).save(p)


@unittest.skipIf(np is None, "numpy/PIL tidak ada")
class Banding(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name)
        H, W = 270, 480
        yy = np.linspace(0, 1, H)[:, None, None] * np.ones((1, W, 1))
        # ragu-ragu: hampir putih, gradasi lemah ke lavender (rentang luma kecil, saturasi rendah)
        self.ragu = self.d / "ragu.png"; simpan(self.ragu, np.concatenate([245 - 14 * yy, 246 - 14 * yy, 252 - 4 * yy], 2))
        # tegas: putih bersih + zona biru jenuh di bawah
        zona = np.clip((yy - .5) * 2, 0, 1)
        self.tegas = self.d / "tegas.png"; simpan(self.tegas, np.concatenate([255 - 215 * zona, 255 - 165 * zona, 255 - 0 * zona], 2))
        self.navy = self.d / "navy.png"; simpan(self.navy, np.concatenate([8 + 0 * yy, 10 + 20 * yy, 60 + 120 * yy], 2))
        self.datar = self.d / "datar.png"; simpan(self.datar, np.full((H, W, 3), 250))

    def tearDown(self): self.t.cleanup()

    def test_f1_gagal_untuk_gradien_ragu(self):
        r = jalan(S / "banding.py", self.ragu, self.tegas, "--out", self.d / "o.png", "--json")
        d = json.loads(r.stdout); self.assertEqual(r.returncode, 1); self.assertTrue(d["f1"]); self.assertTrue((self.d / "o.png").exists())

    def test_f1_lulus_terhadap_diri_sendiri_dan_datar(self):
        for f in (self.tegas, self.navy, self.datar):
            r = jalan(S / "banding.py", f, f, "--out", self.d / "o.png", "--json"); d = json.loads(r.stdout)
            self.assertEqual(r.returncode, 0, r.stdout); self.assertFalse(d["f1"])

    def test_f1_dimaafkan_bila_referensi_berprofil_sama(self):
        r = jalan(S / "banding.py", self.ragu, self.ragu, "--out", self.d / "o.png", "--json"); d = json.loads(r.stdout)
        self.assertTrue(d["f1"]); self.assertTrue(d["f1_dimaafkan"]); self.assertEqual(r.returncode, 0)

    def test_terang_vs_gelap_selisih_besar(self):
        r = jalan(S / "banding.py", self.tegas, self.navy, "--out", self.d / "o.png", "--json"); d = json.loads(r.stdout)
        self.assertEqual(r.returncode, 1); self.assertGreater(d["banding"]["palet_de"], 15)

    def test_crop_dan_toleransi_bendera(self):
        r = jalan(S / "banding.py", self.tegas, self.tegas, "--crop", "0,0,240,135", "--tol-luma", "5", "--tol-sat", "5", "--tol-de", "99", "--out", self.d / "o.png")
        self.assertEqual(r.returncode, 0, r.stdout)

    def test_refspec_folder_dan_banding_ke_json(self):
        st = self.d / "stills"; st.mkdir()
        for f in (self.tegas, self.navy): (st / f.name).write_bytes(f.read_bytes())
        out = self.d / "rs"; r = jalan(S / "ref_spec.py", st, "--out", out); self.assertEqual(r.returncode, 0, r.stderr)
        spec = json.loads((out / "REF-SPEC.json").read_text())
        self.assertEqual(sum(t["n"] for t in spec["tipe"].values()), 2); self.assertEqual({s["metrik"]["gelap"] for s in spec["stills"]}, {True, False})
        self.assertIn("Alasan (isi dengan mata)", (out / "REF-SPEC.md").read_text()); self.assertTrue((out / "contact-sheet.png").exists())
        r = jalan(S / "banding.py", self.tegas, out / "REF-SPEC.json", "--tipe", "terang", "--out", self.d / "o.png"); self.assertEqual(r.returncode, 0, r.stdout)
        r = jalan(S / "banding.py", self.tegas, out / "REF-SPEC.json", "--tipe", "gelap", "--out", self.d / "o.png"); self.assertEqual(r.returncode, 1)

    def _jarang(self):
        H, W = 270, 480; a = np.full((H, W, 3), 0.0); a[:] = (10, 20, 80); yy, xx = np.ogrid[:H, :W]  # latar navy: F1 tidak terpicu
        a[(yy - 135) ** 2 + (xx - 240) ** 2 < 20 ** 2] = (120, 160, 255); p = self.d / "jarang.png"; simpan(p, a); return p

    def _teks(self):
        H, W = 270, 480; a = np.full((H, W, 3), 250.0)
        for y in (100, 125, 150): a[y:y + 8:2, 60:420:3] = 20  # pita garis-garis mirip teks, fokus kecil
        p = self.d / "teks.png"; simpan(p, a); return p

    def _besar(self):
        a = np.full((270, 480, 3), 250.0); a[40:230, 60:420] = (30, 70, 200); p = self.d / "besar.png"; simpan(p, a); return p

    def test_mandiri_f1_gagal_dan_lulus(self):
        r = jalan(S / "banding.py", self.ragu, "--json"); self.assertEqual(r.returncode, 1); self.assertTrue(json.loads(r.stdout)["f1"])
        r = jalan(S / "banding.py", self.tegas, "--json"); self.assertEqual(r.returncode, 0); self.assertFalse(json.loads(r.stdout)["f1"])

    @unittest.skipIf(scipy is None, "scipy tidak ada: F3 dilewati")
    def test_f3_jarang_peringatan_bukan_gagal(self):
        r = jalan(S / "banding.py", self._jarang(), "--json"); d = json.loads(r.stdout)
        self.assertTrue(d["f3_jarang"]); self.assertEqual(r.returncode, 0)
        self.assertFalse(json.loads(jalan(S / "banding.py", self._besar(), "--json").stdout)["f3_jarang"])
        self.assertFalse(json.loads(jalan(S / "banding.py", self._teks(), "--json").stdout)["f3_jarang"])

    @unittest.skipIf(scipy is None, "scipy tidak ada: F3 dilewati")
    def test_seri_batas_10_persen(self):
        s = self.d / "seri"; s.mkdir(); b = self._besar()
        for i in range(9): (s / f"b{i}.png").write_bytes(b.read_bytes())
        (s / "j.png").write_bytes(self._jarang().read_bytes())  # 1/10 = 10 % -> masih lulus
        r = jalan(S / "banding.py", "--seri", s, "--json"); d = json.loads(r.stdout)
        self.assertEqual(d["n"], 10); self.assertEqual(d["jarang_pct"], 10.0); self.assertEqual(r.returncode, 0)
        (s / "j2.png").write_bytes(self._jarang().read_bytes())  # 2/11 = 18 %
        r = jalan(S / "banding.py", "--seri", s, "--json"); self.assertEqual(r.returncode, 1); self.assertEqual(sorted(json.loads(r.stdout)["jarang"]), ["j.png", "j2.png"])

    def test_seri_f1_dan_masukan_salah(self):
        s = self.d / "seri2"; s.mkdir(); (s / "r.png").write_bytes(self.ragu.read_bytes())
        self.assertEqual(jalan(S / "banding.py", "--seri", s).returncode, 1)
        self.assertEqual(jalan(S / "banding.py", "--seri", self.d / "x").returncode, 2)

    def test_sebelum_selisih_dan_target(self):
        r = jalan(S / "banding.py", self.tegas, "--sebelum", self.navy, "--target", self.datar, "--json"); self.assertEqual(r.returncode, 0, r.stderr)
        d = json.loads(r.stdout)["metrik"]; h = d["luma_range"]
        self.assertAlmostEqual(h["selisih"], round(h["sesudah"] - h["sebelum"], 3), places=2)
        self.assertIn("tutup_pct", h)
        self.assertEqual(jalan(S / "banding.py", self.tegas, "--sebelum", self.d / "x.png").returncode, 2)

    def test_masukan_salah(self):
        self.assertEqual(jalan(S / "banding.py", self.d / "x.png", self.tegas).returncode, 2)
        self.assertEqual(jalan(S / "ref_spec.py", self.d / "tidak-ada").returncode, 2)


if __name__ == "__main__":
    unittest.main()
