#!/usr/bin/env python3
"""Uji teks_cek.py: tanda OCR adalah informasi (keluar 0); --ketat / KETAT=1 keluar 1; folder tanpa still tetap gagal."""
import os, shutil, subprocess, sys, tempfile, unittest
from pathlib import Path

S = Path(__file__).resolve().parents[1] / "juri" / "teks_cek.py"


def jalan(*a, env=None):
    return subprocess.run([sys.executable, str(S), *map(str, a)], capture_output=True, text=True, env={**os.environ, **(env or {})})


@unittest.skipIf(shutil.which("tesseract") is None, "tesseract tidak ada")
class TeksCek(unittest.TestCase):
    def test_folder_kosong_tetap_gagal(self):
        with tempfile.TemporaryDirectory() as d:
            self.assertEqual(jalan(d).returncode, 1)

    def test_tanda_jadi_informasi_ketat_keluar_1(self):
        from PIL import Image, ImageDraw, ImageFont
        with tempfile.TemporaryDirectory() as d:
            im = Image.new("RGB", (960, 540), "white"); dr = ImageDraw.Draw(im)
            try: f = ImageFont.truetype("DejaVuSans-Bold.ttf", 80)
            except OSError: f = ImageFont.load_default()
            dr.text((10, 200), "TOTAL", fill="black", font=f)  # menyentuh tepi kiri
            im.save(Path(d) / "a.png")
            r = jalan(d); self.assertEqual(r.returncode, 0, r.stdout)
            if "ADA" in r.stdout:
                self.assertNotIn("tidak bisa diberi alasan", r.stdout)
                self.assertEqual(jalan(d, "--ketat").returncode, 1)
                self.assertEqual(jalan(d, env={"KETAT": "1"}).returncode, 1)


if __name__ == "__main__":
    unittest.main()
