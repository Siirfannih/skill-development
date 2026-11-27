#!/usr/bin/env python3
"""Uji palette_check.py: temuan palet adalah CATATAN (keluar 0); --ketat / KETAT=1 mengembalikan keluar 1."""
import os, subprocess, sys, tempfile, unittest
from pathlib import Path

try:
    import cv2, numpy as np
except ImportError:
    cv2 = None

S = Path(__file__).resolve().parents[1] / "palette_check.py"


@unittest.skipIf(cv2 is None, "opencv tidak ada")
class PaletteCheck(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); d = Path(self.t.name)
        a = np.zeros((90, 160, 3), np.uint8); a[:, :40] = (0, 0, 255); a[:, 40:80] = (0, 255, 0); a[:, 80:120] = (255, 0, 0)  # 3 keluarga vivid
        self.banyak = d / "banyak.png"; cv2.imwrite(str(self.banyak), a)
        self.satu = d / "satu.png"; cv2.imwrite(str(self.satu), np.full((90, 160, 3), (0, 0, 255), np.uint8))

    def tearDown(self): self.t.cleanup()

    def jalan(self, *a, env=None):
        return subprocess.run([sys.executable, str(S), *map(str, a)], capture_output=True, text=True, env={**os.environ, **(env or {})})

    def test_temuan_jadi_catatan_keluar_0_ketat_1(self):
        r = self.jalan(self.banyak); self.assertEqual(r.returncode, 0, r.stderr); self.assertIn("CATATAN", r.stdout)
        self.assertEqual(self.jalan(self.banyak, "--ketat").returncode, 1)
        self.assertEqual(self.jalan(self.banyak, env={"KETAT": "1"}).returncode, 1)

    def test_satu_keluarga_tanpa_catatan(self):
        r = self.jalan(self.satu, "--ketat"); self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertNotIn("CATATAN:", r.stdout)

    def test_berkas_rusak_tetap_gagal(self):
        self.assertNotEqual(self.jalan(Path(self.t.name) / "tidak-ada.png").returncode, 0)


if __name__ == "__main__":
    unittest.main()
