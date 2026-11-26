#!/usr/bin/env python3
"""tools/cookbook.py baca <id>: kartu vault tanpa blok Pengikat (kulit video sumber), checklist sanding diberi bingkai; --pengikat = berkas utuh."""
import subprocess, sys, unittest
from pathlib import Path

REPO = Path(__file__).resolve().parents[4]
TOOL = REPO / "tools" / "cookbook.py"
VAULT = REPO / "claude/motion-graphic/cookbook/_vault"


def baca(*a):
    return subprocess.run([sys.executable, str(TOOL), "baca", *a], capture_output=True, text=True)


class Baca(unittest.TestCase):
    def setUp(self):
        self.berkas = next(VAULT.glob("*/57-*.md")); self.asli = self.berkas.read_text(encoding="utf-8")

    def test_pengikat_disembunyikan(self):
        r = baca("57"); self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn("disembunyikan", r.stdout)
        baris = r.stdout.split("\n"); i = next(n for n, x in enumerate(baris) if x.startswith("## Pengikat"))
        self.assertTrue(baris[i + 1].startswith("## "), "tidak ada baris antara judul Pengikat dan seksi berikutnya")
        self.assertNotIn("#110E09", r.stdout); self.assertNotIn("Warna & tekstur", r.stdout)  # isi Pengikat tidak ikut
        self.assertIn("#110E09", self.asli)  # dan berkasnya sendiri tidak disentuh

    def test_bingkai_checklist_langsung_di_bawah_judul(self):
        baris = baca("57").stdout.split("\n"); i = next(n for n, x in enumerate(baris) if x.startswith("## Yang harus terasa sama saat disandingkan"))
        self.assertTrue(baris[i + 1].startswith("> Jawab tiap pertanyaan untuk hubungan yang ditanyakan"))
        self.assertIn("milik video sumber", baris[i + 1]); self.assertTrue(baris[i + 2].startswith("- Satu subjek"))

    def test_dengan_pengikat_sama_dengan_berkas(self):
        r = baca("57", "--pengikat"); self.assertEqual(r.returncode, 0); self.assertEqual(r.stdout, self.asli)

    def test_bagian_lain_tidak_berubah(self):
        out = baca("57").stdout
        for bag in ("## Pola", "### T1 · Concentric-to-Box Morph", "## Catatan pakai", "**Inti mekanik (1 kalimat):**"):
            self.assertIn(bag, out)

    def test_id_tidak_ada(self):
        r = baca("9999"); self.assertEqual(r.returncode, 1); self.assertEqual(r.stdout, ""); self.assertIn("tidak ada kartu untuk '9999'", r.stderr)

    def test_kartu_tanpa_seksi_tercetak_utuh(self):
        r = baca("95"); self.assertEqual(r.returncode, 0)
        self.assertEqual(r.stdout, next(VAULT.glob("*/95-*.md")).read_text(encoding="utf-8"))

    def test_kartu_aktif_lewat_id_bukan_vault(self):
        r = baca("M20"); self.assertEqual(r.returncode, 0); self.assertIn('id: "M20"', r.stdout)

    def test_tanpa_argumen_rc_1(self):
        self.assertEqual(baca().returncode, 1)


if __name__ == "__main__":
    unittest.main()
