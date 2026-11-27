#!/usr/bin/env python3
"""board.py (storyboard): isian beat/metafora/mode/sfx/warna = CATATAN (keluar 0; --ketat keluar 1).
Tetap keluar 1: panel hilang, teks layar keluar frame, kerangka tersisa. Butuh Playwright + Chromium."""
import json, os, subprocess, sys, tempfile, unittest
from pathlib import Path

S = Path(__file__).resolve().parents[1] / "storyboard" / "board.py"
try:
    from playwright.sync_api import sync_playwright
    with sync_playwright() as _p:
        _p.chromium.launch().close()
    ADA = True
except Exception:
    ADA = False

BEAT = {"id": "b1", "babak": "k1", "t": [0, 2], "vo": "halo", "aksi": "a", "kamera": "diam", "keluar": "cut"}  # tanpa metafora/mode/isi_objek
SPEC = {"project": "uji", "format": {"w": 540, "h": 960}, "babak": [{"id": "k1", "nama": "satu", "musik": {"peran": "bed", "alasan": "x"}}], "beats": [BEAT]}
PANEL = "<!doctype html><body style='margin:0'><div data-layar style='position:absolute;left:{x}px;top:100px;font:40px sans-serif'>{teks}</div></body>"


def jalan(d, *a, env=None):
    return subprocess.run([sys.executable, str(S), str(d), *a], capture_output=True, text=True, env={**os.environ, **(env or {})})


@unittest.skipUnless(ADA, "Playwright/Chromium tidak ada")
class Board(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name) / "sb"; (self.d / "panels").mkdir(parents=True)  # induknya = folder uji (bukan /tmp bersama)
        (self.d / "beats.json").write_text(json.dumps(SPEC)); (self.d / "tokens.css").write_text("")
        self.panel("Halo", 40)

    def tearDown(self): self.t.cleanup()

    def panel(self, teks, x): (self.d / "panels" / "b1.html").write_text(PANEL.format(teks=teks, x=x))

    def test_isian_kurang_jadi_catatan_keluar_0_ketat_1(self):
        r = jalan(self.d); self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertIn("CATATAN", r.stdout); self.assertIn("metafora", r.stdout); self.assertIn("mode", r.stdout)
        self.assertEqual(jalan(self.d, "--ketat").returncode, 1)
        self.assertEqual(jalan(self.d, env={"KETAT": "1"}).returncode, 1)

    def test_panel_hilang_tetap_gagal(self):
        (self.d / "panels" / "b1.html").unlink()
        r = jalan(self.d); self.assertEqual(r.returncode, 1); self.assertIn("belum ada panel", r.stdout)

    def test_teks_keluar_frame_tetap_gagal(self):
        self.panel("Halo dunia panjang", 400)
        r = jalan(self.d); self.assertEqual(r.returncode, 1, r.stdout); self.assertIn("keluar frame", r.stdout)

    def test_kerangka_tersisa_tetap_gagal(self):
        r = jalan(self.d, "--skeleton"); self.assertEqual(r.returncode, 0)   # panel sudah ada: tidak ditimpa
        (self.d / "panels" / "b1.html").write_text("<body><div data-skeleton>x</div></body>")
        r = jalan(self.d); self.assertEqual(r.returncode, 1); self.assertIn("kerangka masih ada", r.stdout)

    def test_beats_json_hilang_gagal(self):
        (self.d / "beats.json").unlink(); self.assertNotEqual(jalan(self.d).returncode, 0)


if __name__ == "__main__":
    unittest.main()
