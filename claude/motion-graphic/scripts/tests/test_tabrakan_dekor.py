#!/usr/bin/env python3
"""tabrakan_cek.py: elemen ber-`data-dekor` (penanda dekoratif vibedesign) dikecualikan seperti `data-sengaja="tumpuk"`; sisanya tetap dicek.
Butuh Python dengan Playwright (PC server: ~/work/mg-venv/bin/python); tanpa itu tes dilewati."""
import subprocess, sys, tempfile, unittest
from pathlib import Path

REPO = Path(__file__).resolve().parents[4]
TABRAKAN = REPO / "claude/motion-graphic/scripts/gate/tabrakan_cek.py"
JUDUL = "<h1 style='position:absolute;left:200px;top:200px;font:700 80px sans-serif'>Judul besar</h1>"
OBJEK = "<div data-lapis='objek' style='position:absolute;left:900px;top:200px;width:400px;height:300px;background:#ccc'></div>"


def punya_playwright():
    try:
        import playwright.sync_api  # noqa
        return True
    except Exception:
        return False


def jalan(html, d):
    f = Path(d) / "x.html"; f.write_text("<body style='margin:0'>" + html + "</body>")
    return subprocess.run([sys.executable, str(TABRAKAN), str(f)], capture_output=True, text=True)


@unittest.skipUnless(punya_playwright(), "Playwright tidak ada")
class Dekor(unittest.TestCase):
    def cek(self, html):
        with tempfile.TemporaryDirectory() as d:
            return jalan(html, d)

    def test_teks_di_atas_teks_tetap_gagal_tanpa_penanda(self):
        r = self.cek(JUDUL + "<p style='position:absolute;left:220px;top:230px;font:60px sans-serif'>Menimpa</p>")
        self.assertEqual(r.returncode, 1, r.stdout + r.stderr); self.assertIn("TEKS-TEKS", r.stdout)

    def test_teks_dekor_dikecualikan_dari_tabrakan_teks(self):
        r = self.cek(JUDUL + "<p data-dekor style='position:absolute;left:220px;top:230px;font:60px sans-serif'>Menimpa</p>")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)

    def test_dekor_pada_leluhur_berlaku_untuk_anak(self):
        r = self.cek(JUDUL + "<div data-dekor><p style='position:absolute;left:220px;top:230px;font:60px sans-serif'>Menimpa</p></div>")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)

    def test_objek_dekor_tidak_menjadi_penghalang(self):
        teks = "<p style='position:absolute;left:950px;top:300px;font:40px sans-serif'>Di atas objek</p>"
        self.assertEqual(self.cek(OBJEK + teks).returncode, 1)
        self.assertEqual(self.cek(OBJEK.replace("data-lapis='objek'", "data-lapis='objek' data-dekor") + teks).returncode, 0)

    def test_dekor_tidak_melindungi_teks_lain(self):
        # teks tanpa penanda yang menimpa objek tetap gagal walau ada elemen ber-data-dekor di tempat lain
        r = self.cek("<span data-dekor style='position:absolute;left:10px;top:10px;font:30px sans-serif'>hias</span>" + OBJEK +
                     "<p style='position:absolute;left:950px;top:300px;font:40px sans-serif'>Di atas objek</p>")
        self.assertEqual(r.returncode, 1, r.stdout + r.stderr)

    def test_data_sengaja_tumpuk_tetap_berlaku(self):
        r = self.cek(JUDUL + "<p data-sengaja='tumpuk' style='position:absolute;left:220px;top:230px;font:60px sans-serif'>Menimpa</p>")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)


if __name__ == "__main__":
    unittest.main()
