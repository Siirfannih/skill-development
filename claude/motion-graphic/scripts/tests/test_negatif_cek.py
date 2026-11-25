"""negatif_cek.py: satu pintu K1/K2 + placeholder + izin qc/izin.json. Cek DOM butuh Playwright (di PC); sisanya statis."""
import json, subprocess, sys, tempfile, unittest
from pathlib import Path

ALAT = Path(__file__).resolve().parents[1] / "gate/negatif_cek.py"
BERSIH = "<body style='margin:0;background:#F2EEE6'><h1 style='font:700 80px sans-serif;color:#111'>Satu</h1></body>"


def punya_playwright():
    try:
        import playwright.sync_api  # noqa
        return True
    except Exception:
        return False


def jalan(*a):
    return subprocess.run([sys.executable, str(ALAT), *map(str, a)], capture_output=True, text=True)


class Statis(unittest.TestCase):
    def setUp(self):
        self.t = Path(tempfile.mkdtemp())

    def tulis(self, nama, isi):
        p = self.t / nama; p.write_text(isi, encoding="utf-8"); return p

    def test_bersih_lulus(self):
        r = jalan(self.tulis("a.html", BERSIH), "--tanpa-dom"); self.assertEqual(r.returncode, 0, r.stdout + r.stderr)

    def test_serif_dan_kaca_gagal(self):
        r = jalan(self.tulis("a.html", "<h1 style=\"font-family:'Playfair Display'\">x</h1>"), "--tanpa-dom"); self.assertEqual(r.returncode, 1); self.assertIn("K1-SERIF", r.stdout)
        r = jalan(self.tulis("b.css", ".k{backdrop-filter: blur(20px)}"), "--tanpa-dom"); self.assertEqual(r.returncode, 1); self.assertIn("K2-GLASS", r.stdout)

    def test_border_putus_gagal(self):
        r = jalan(self.tulis("a.html", "<div style='width:300px;height:200px;border:2px dashed #999'></div>"), "--tanpa-dom")
        self.assertEqual(r.returncode, 1); self.assertIn("P-DASHED", r.stdout)
        r = jalan(self.tulis("b.css", "/* border: 1px dashed red */ .a{border:1px solid red}"), "--tanpa-dom"); self.assertEqual(r.returncode, 0, r.stdout)

    def test_jalur_tidak_ada(self):
        self.assertEqual(jalan(self.t / "tidak-ada.html").returncode, 2)

    def izin(self, entri):
        (self.t / "qc").mkdir(exist_ok=True); (self.t / "qc/izin.json").write_text(json.dumps({"izin": entri}), encoding="utf-8")

    def test_izin_dengan_kutipan_irfan_membuka(self):
        f = self.tulis("a.html", "<h1 style=\"font-family:'Playfair Display'\">x</h1>")
        self.izin([{"aturan": "K1", "kutipan": "pakai serif untuk kata terakhir", "catatan": "DECISIONS 12"}])
        r = jalan(f, "--tanpa-dom"); self.assertEqual(r.returncode, 0, r.stdout); self.assertIn("IZIN", r.stdout)

    def test_izin_tanpa_kutipan_ditolak(self):
        f = self.tulis("a.html", "<h1 style=\"font-family:'Playfair Display'\">x</h1>")
        self.izin([{"aturan": "K1", "alasan": "kata sifat: editorial"}])
        r = jalan(f, "--tanpa-dom"); self.assertEqual(r.returncode, 1); self.assertIn("IZIN TIDAK SAH", r.stdout)

    def test_izin_hanya_untuk_aturan_yang_disebut(self):
        f = self.tulis("a.html", "<h1 style=\"font-family:'Playfair Display';text-shadow:0 0 20px #00f\">x</h1>")
        self.izin([{"aturan": "K1", "kutipan": "pakai serif untuk kata terakhir"}])
        r = jalan(f, "--tanpa-dom"); self.assertEqual(r.returncode, 1); self.assertIn("K2-GLOW", r.stdout)


@unittest.skipUnless(punya_playwright(), "Playwright tidak ada")
class Dom(unittest.TestCase):
    def setUp(self):
        self.t = Path(tempfile.mkdtemp())

    def cek(self, isi):
        f = self.t / "f.html"; f.write_text("<body style='margin:0;background:#F2EEE6'>" + isi + "</body>", encoding="utf-8"); return jalan(f)

    def test_kotak_kosong_ber_border_gagal(self):
        r = self.cek("<div style='position:absolute;left:200px;top:200px;width:400px;height:300px;border:3px solid #888'></div>")
        self.assertEqual(r.returncode, 1, r.stdout); self.assertIn("P-KOSONG", r.stdout)

    def test_kotak_abu_kosong_gagal(self):
        r = self.cek("<div style='position:absolute;left:200px;top:200px;width:400px;height:300px;background:#cfcfcf'></div>")
        self.assertEqual(r.returncode, 1, r.stdout); self.assertIn("P-KOSONG", r.stdout)

    def test_garis_abu_pengganti_teks_gagal(self):
        bar = "<div style='height:14px;width:300px;background:#bbb;margin:8px'></div>"
        r = self.cek(f"<div style='position:absolute;left:200px;top:200px'>{bar*3}</div>")
        self.assertEqual(r.returncode, 1, r.stdout); self.assertIn("P-BAR-ABU", r.stdout)

    def test_bentuk_datar_berwarna_dan_kartu_berisi_lulus(self):
        r = self.cek("<div style='position:absolute;left:100px;top:100px;width:300px;height:300px;border-radius:50%;background:#2E5BFF'></div>"
                     "<div style='position:absolute;left:600px;top:200px;width:500px;height:300px;border:2px solid #111'><p style='font:40px sans-serif'>Isi nyata</p></div>"
                     "<svg style='position:absolute;left:1300px;top:200px' width='200' height='200'><rect width='200' height='200' fill='#111'/></svg>")
        self.assertEqual(r.returncode, 0, r.stdout)

    def test_data_sengaja_dan_latar_dilewati(self):
        r = self.cek("<div data-lapis='latar' style='position:absolute;left:0;top:0;width:900px;height:900px;background:#cfcfcf'></div>")
        self.assertEqual(r.returncode, 0, r.stdout)


if __name__ == "__main__":
    unittest.main()
