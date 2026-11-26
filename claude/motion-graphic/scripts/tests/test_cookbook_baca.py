#!/usr/bin/env python3
"""tools/cookbook.py baca <id>: kartu vault tanpa blok Pengikat (kulit video sumber), checklist sanding diberi bingkai; baris Kata kunci gaya dan hex di Kondisi footage asli disembunyikan; --pengikat = berkas utuh."""
import re, subprocess, sys, unittest
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

    def test_kata_kunci_gaya_disembunyikan_kecuali_pengikat(self):
        asli = next(VAULT.glob("*/64-*.md")).read_text(encoding="utf-8")
        self.assertIn("**Kata kunci gaya:** brutalist swiss", asli)  # berkas vault tidak disentuh
        out = baca("64").stdout
        self.assertNotIn("Kata kunci gaya:**", out); self.assertNotIn("biru elektrik", out)
        self.assertIn("**Jangan dipakai untuk:**", out); self.assertIn("**Diambil untuk:**", out)  # baris sekitarnya tetap
        self.assertIn("biru elektrik", baca("64", "--pengikat").stdout)

    def test_hex_di_kondisi_footage_disamarkan_kecuali_pengikat(self):
        out = baca("64").stdout
        self.assertNotIn("#010101", out); self.assertNotIn("#FAFAFA", out)
        self.assertIn("3:4 vertikal", out); self.assertIn("Kamera diam", out)  # fakta bukan kulit tetap
        self.assertIn("#010101", baca("64", "--pengikat").stdout)

    def test_fakta_non_kulit_di_kondisi_footage_tetap(self):
        # kartu 80: resolusi/rasio dan angka posisi tetap; hanya nilai hex yang berganti
        out = baca("80").stdout; asli = next(VAULT.glob("*/80-*.md")).read_text(encoding="utf-8")
        seksi = lambda t: re.search(r"^## Kondisi footage asli\n(.*?)(?=^## |\Z)", t, re.M | re.S).group(1)
        self.assertEqual(re.sub(r"#[0-9A-Fa-f]{6}\b", "", seksi(asli)).count("16:9"), seksi(out).count("16:9"))
        self.assertIn("16:9", seksi(out)); self.assertIn("cy 45–65 %", seksi(out)); self.assertIn("13 vs tengah 22", seksi(out))
        self.assertIsNone(re.search(r"#[0-9A-Fa-f]{3,8}\b", seksi(out)))

    def test_hex_di_seksi_lain_tidak_disentuh(self):
        # penyamaran dibatasi pada seksi 'Kondisi footage asli'; hex di seksi Pola (kartu 14: #E6E6E6) tercetak apa adanya
        self.assertIn("#E6E6E6", next(VAULT.glob("*/14-*.md")).read_text(encoding="utf-8"))
        self.assertIn("#E6E6E6", baca("14").stdout)

    def test_tidak_ada_kartu_vault_yang_bocor_hex_di_kondisi_footage(self):
        for f in sorted(VAULT.glob("*/*.md")):
            out = baca(f.name.split("-")[0]).stdout
            m = re.search(r"^## Kondisi footage asli\n(.*?)(?=^## |\Z)", out, re.M | re.S)
            if m: self.assertIsNone(re.search(r"#[0-9A-Fa-f]{3,8}\b", m.group(1)), f.name)
            self.assertNotRegex(out, r"(?m)^\*\*Kata kunci gaya:\*\*", f.name)

    def test_id_tidak_ada(self):
        r = baca("9999"); self.assertEqual(r.returncode, 1); self.assertEqual(r.stdout, ""); self.assertIn("tidak ada kartu untuk '9999'", r.stderr)

    def test_kartu_tanpa_seksi_tercetak_utuh(self):
        # kartu 95 tanpa seksi Pengikat: tercetak utuh, kecuali hex di "Kondisi footage asli" yang kini disamarkan
        r = baca("95"); self.assertEqual(r.returncode, 0)
        asli = next(VAULT.glob("*/95-*.md")).read_text(encoding="utf-8")
        self.assertNotIn("## Pengikat", asli)
        harapan = re.sub(r"(^## Kondisi footage asli\n.*?)(?=^## |\Z)", lambda m: re.sub(r"#[0-9A-Fa-f]{3,8}\b", "[warna disembunyikan]", m.group(1)), asli, flags=re.M | re.S)
        self.assertNotEqual(harapan, asli); self.assertEqual(r.stdout, harapan)

    def test_kartu_aktif_lewat_id_bukan_vault(self):
        r = baca("M20"); self.assertEqual(r.returncode, 0); self.assertIn('id: "M20"', r.stdout)

    def test_tanpa_argumen_rc_1(self):
        self.assertEqual(baca().returncode, 1)


if __name__ == "__main__":
    unittest.main()
