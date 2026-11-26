#!/usr/bin/env python3
"""pilih_kartu.py C7b: kata niat (launch, promo, tour, donasi) dibaca sebagai fungsi cerita, kata industri tidak, dan hasil kosong memberi panduan di stdout."""
import importlib.util, subprocess, sys, unittest
from pathlib import Path

S = Path(__file__).resolve().parents[1]
SKRIP = S / "cookbook/pilih_kartu.py"
spec = importlib.util.spec_from_file_location("pilih_kartu", SKRIP); pk = importlib.util.module_from_spec(spec); spec.loader.exec_module(pk)

# query nyata dari brief non-pemilik -> fungsi yang harus ada di fungsi: tiap kartu hasil
NIAT = {
    "product launch skincare": "hook",
    "real estate property tour": "langkah",
    "restoran menu baru": "hook",
    "donasi pendidikan": "cta",
}
INDUSTRI = "skincare restoran properti"


def cli(*a):
    return subprocess.run([sys.executable, str(SKRIP), *a], capture_output=True, text=True)


class Niat(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.kartu = pk.baca_index()

    def test_brief_industri_mendapat_kartu_menurut_fungsi(self):
        for q, f in NIAT.items():
            with self.subTest(q=q):
                hasil = pk.pilih(self.kartu, q)
                self.assertTrue(hasil, f"{q!r} kosong")
                for k in hasil:
                    self.assertIn(f, k["daftar_fungsi"], f"{q!r}: kartu {k['id']} tanpa fungsi {f}")

    def test_cli_mencetak_baris_dicocokkan_lewat_fungsi(self):
        for q, f in NIAT.items():
            with self.subTest(q=q):
                r = cli("--cari", q)
                self.assertEqual(r.returncode, 0)
                baris = [x for x in r.stdout.splitlines() if x.startswith("Dicocokkan lewat fungsi beat:")]
                self.assertEqual(len(baris), 1); self.assertIn(f, baris[0])

    def test_kata_fungsi_langsung_tanpa_baris(self):
        r = cli("--cari", "angka yang harus mendarat")
        self.assertEqual(r.returncode, 0); self.assertNotIn("Dicocokkan lewat fungsi", r.stdout)

    def test_ringkas_hanya_tabel(self):
        r = cli("--cari", "product launch skincare", "--ringkas")
        self.assertTrue(all(x.startswith("|") for x in r.stdout.strip().splitlines()))

    def test_hanya_nama_industri_kosong_dengan_panduan_di_stdout(self):
        r = cli("--cari", INDUSTRI)
        self.assertEqual(r.returncode, 1)  # kode keluar tetap 1: pemanggil dan tes lama membedakan "tidak ada" dari galat (2)
        self.assertFalse([x for x in r.stdout.splitlines() if x.startswith("|")])
        self.assertIn("bukan menurut industri", r.stdout)
        for f in pk.FUNGSI:
            self.assertRegex(r.stdout, rf"(?m)^  {f}\s+--cari ")
        self.assertTrue(r.stderr.startswith("Tidak ada kartu yang cocok"))

    def test_panduan_tidak_dicetak_bila_saringan_ikut(self):
        r = cli("--cari", INDUSTRI, "--kategori", "camera")
        self.assertEqual(r.returncode, 1); self.assertEqual(r.stdout, "")

    def test_tiap_contoh_panduan_mengembalikan_kartu_dengan_fungsinya(self):
        self.assertEqual([f for f, _ in pk.CONTOH_FUNGSI], list(pk.FUNGSI))
        for f, q in pk.CONTOH_FUNGSI:
            with self.subTest(f=f, q=q):
                hasil = pk.pilih(self.kartu, q)
                self.assertTrue(hasil)
                self.assertIn(f, hasil[0]["daftar_fungsi"], f"{q!r}: kartu teratas {hasil[0]['id']} tanpa fungsi {f}")

    def test_kata_industri_tidak_masuk_tabel_sinonim(self):
        for kata in ("skincare", "restoran", "klinik", "properti", "property", "estate", "pendidikan", "produk", "product", "menu"):
            self.assertNotIn(kata, pk.SINONIM); self.assertNotIn(kata, pk.NIAT)

    def test_kata_niat_dipetakan_ke_fungsi_yang_ada(self):
        for kata, baku in pk.NIAT.items():
            self.assertIn(baku, pk.FUNGSI, kata)
        self.assertEqual(pk.kata_niat("launch promo harga")["hook"], ["launch"])
        self.assertEqual(pk.kata_niat("launch promo harga")["angka"], ["promo", "harga"])

    def test_daftar_di_teks_kartu_bukan_ajakan(self):
        ids = [k["id"] for k in pk.pilih(self.kartu, "cta")]
        self.assertEqual(ids[0], "M05")
        for bukan in ("17", "98", "M10"):
            self.assertNotIn(bukan, ids)


if __name__ == "__main__":
    unittest.main()
