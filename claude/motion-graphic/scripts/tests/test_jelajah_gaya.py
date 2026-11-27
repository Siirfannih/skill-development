#!/usr/bin/env python3
"""Uji jelajah_gaya.py: lembar thumbnail + penuh, angka per arah, peringatan MIRIP untuk dua arah yang sama."""
import json, subprocess, sys, tempfile, unittest
from pathlib import Path

try:
    import numpy as np
    from PIL import Image
except ImportError:
    np = None

S = Path(__file__).resolve().parents[1] / "jelajah_gaya.py"


def jalan(*a):
    return subprocess.run([sys.executable, str(S), *map(str, a)], capture_output=True, text=True)


@unittest.skipIf(np is None, "numpy/PIL tidak ada")
class JelajahGaya(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name)
        H, W = 270, 480
        yy = np.linspace(0, 1, H)[:, None, None] * np.ones((1, W, 1))
        def simpan(n, arr):
            p = self.d / n; Image.fromarray(np.clip(arr, 0, 255).astype("uint8")).save(p); return p
        self.pucat = simpan("pucat.png", np.full((H, W, 3), 244.0))
        self.pucat2 = simpan("pucat2.png", np.full((H, W, 3), 240.0))
        self.jingga = simpan("jingga.png", np.concatenate([240 - 30 * yy, 90 + 60 * yy, 60 + 40 * yy], 2))
        self.gelap = simpan("gelap.png", np.concatenate([10 + 90 * yy, 8 + 20 * yy, 20 + 10 * yy], 2))
        self.ref = simpan("ref.jpg", np.concatenate([230 - 20 * yy, 100 + 50 * yy, 70 + 30 * yy], 2))

    def tearDown(self): self.t.cleanup()

    def test_tiga_arah_berbeda(self):
        out = self.d / "o"
        r = jalan("--arah", f"A={self.pucat}", "--arah", f"B={self.jingga}", "--arah", f"C={self.gelap}",
                  "--patokan", f"B={self.ref}", "--keluar", out)
        self.assertEqual(r.returncode, 0, r.stderr)
        for n in ("jelajah-thumb.jpg", "jelajah-penuh.jpg", "jelajah.json"):
            self.assertTrue((out / n).is_file(), n)
        j = json.loads((out / "jelajah.json").read_text())
        self.assertEqual(len(j["pasangan"]), 3)
        self.assertFalse(any(p["mirip"] for p in j["pasangan"]))
        self.assertIn("jarak_ke_patokan", j["arah"]["B"])
        # B (jingga) lebih dekat ke patokan jingganya daripada A (pucat) ke patokan yang sama
        self.assertLess(j["arah"]["B"]["jarak_ke_patokan"][0], 20)
        thumb, penuh = Image.open(out / "jelajah-thumb.jpg"), Image.open(out / "jelajah-penuh.jpg")
        self.assertLess(thumb.width, penuh.width)

    def test_dua_arah_sama_dilaporkan_mirip(self):
        r = jalan("--arah", f"A={self.pucat}", "--arah", f"B={self.pucat2}", "--keluar", self.d / "o2")
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn("MIRIP", r.stdout)

    def test_masukan_salah(self):
        self.assertEqual(jalan("--arah", "tanpa-label.png", "--keluar", self.d / "x").returncode, 2)
        self.assertEqual(jalan("--arah", f"A={self.pucat}", "--patokan", f"Z={self.ref}", "--keluar", self.d / "x").returncode, 2)


if __name__ == "__main__":
    unittest.main()
