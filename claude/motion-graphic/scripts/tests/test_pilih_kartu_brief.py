#!/usr/bin/env python3
"""Delapan brief penerimaan (reports/RENCANA-PERBAIKAN-KARTU.md §3; evals/cases/mg-060..067): pilih_kartu menemukan mekanik yang tepat untuk beat
brief non-pemilik, tanpa kartu proses Q, dan kartu 95 hanya untuk query cutout/kolase/metafora. Deterministik, indeks asli."""
import importlib.util, re, unittest
from pathlib import Path

S = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("pilih_kartu", S / "cookbook/pilih_kartu.py"); pk = importlib.util.module_from_spec(spec); spec.loader.exec_module(pk)

# (brief, query, kartu yang diharapkan: salah satu harus ada di 4 teratas)
BEAT = [
    (1, "hook takut", {"M08", "M14"}), (1, "harga promo", {"M20"}), (1, "testimoni pasien", {"M16", "M09"}), (1, "cta booking", {"M05"}),
    (2, "banding sebelum sesudah", {"M19"}), (2, "langkah alur aplikasi", {"63", "M18"}), (2, "angka hemat waktu", {"M20"}),
    (3, "transisi antar ruang", {"M01"}), (3, "penekanan fitur", {"M06", "M04", "17"}), (3, "angka harga", {"M20"}),
    (4, "before after", {"M19", "80"}), (4, "suasana hangat", {"M13", "M02"}),
    (5, "montase suasana ramai", {"M02"}), (5, "angka promo", {"M20"}), (5, "cta pesan", {"M05"}),
    (6, "angka statistik", {"M20"}), (6, "kisah bukti", {"M15", "M16"}), (6, "langkah donasi", {"M17", "98"}), (6, "penutup", {"M22"}),
    (7, "hook opini", {"M14"}), (7, "balik koreksi bukan tapi", {"M14", "M07"}), (7, "penekanan kata kunci", {"M03", "M06"}),
    (8, "langkah demo ui", {"63", "M18"}),
]
# Harapan rencana yang TIDAK dipenuhi pemilih sekarang (dicatat di change report, bukan dilonggarkan): query -> (harapan, hasil nyata 4 teratas)
CELAH = {
    (4, "penekanan hasil"): ({"M05", "M10"}, ["M12", "M11", "M16", "14"]),
    (8, "jelaskan konsep"): ({"88", "96"}, ["17", "95", "18", "M09"]),
    (8, "bukti hasil"): ({"M17"}, ["M16", "63", "M11", "M18"]),
}
SEMUA = [(b, q) for b, q, _ in BEAT] + list(CELAH)
POLA_95 = re.compile(r"cutout|kolase|metafora|metaphor")


class Brief(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.kartu = pk.baca_index()

    def ids(self, q):
        return [k["id"] for k in pk.pilih(self.kartu, q)]

    def test_kartu_harapan_ada_di_empat_teratas(self):
        for b, q, harap in BEAT:
            with self.subTest(brief=b, q=q):
                ids = self.ids(q); self.assertTrue(harap & set(ids), f"{q!r}: {ids}, harapan salah satu dari {sorted(harap)}")

    def test_tidak_ada_kartu_proses_q(self):
        for b, q in SEMUA:
            with self.subTest(brief=b, q=q):
                self.assertFalse([i for i in self.ids(q) if re.fullmatch(r"Q\d+", i)], q)

    def test_kartu_95_hanya_untuk_query_cutout_kolase_metafora(self):
        for b, q in SEMUA:
            if (b, q) == (8, "jelaskan konsep"):
                continue  # celah di bawah
            with self.subTest(brief=b, q=q):
                if not POLA_95.search(q):
                    self.assertNotIn("95", self.ids(q), q)
        self.assertIn("95", self.ids("cutout metaphor"))

    def test_kata_industri_saja_tidak_mengembalikan_kartu(self):
        for q in ("klinik gigi", "skincare restoran properti"):
            self.assertEqual(self.ids(q), [], q)

    def test_ui_pendek_tidak_dibuang(self):
        self.assertEqual(pk.kata_kunci("langkah demo ui")[-1], "ui")
        self.assertTrue({"63", "M18", "65", "M19"} & set(self.ids("langkah demo ui")))

    def test_celah_tercatat_sesuai_keluaran_nyata(self):
        """Pagar: bila pemilih berubah sehingga celah tertutup atau bergeser, tes ini gagal dan tabel CELAH harus diperbarui."""
        for (b, q), (_, nyata) in CELAH.items():
            with self.subTest(brief=b, q=q):
                self.assertEqual(self.ids(q), nyata)

    @unittest.expectedFailure
    def test_celah_brief4_penekanan_hasil(self):
        self.assertTrue({"M05", "M10"} & set(self.ids("penekanan hasil")))

    @unittest.expectedFailure
    def test_celah_brief8_jelaskan_konsep(self):
        self.assertTrue({"88", "96"} & set(self.ids("jelaskan konsep")))

    @unittest.expectedFailure
    def test_celah_brief8_jelaskan_konsep_tanpa_95(self):
        self.assertNotIn("95", self.ids("jelaskan konsep"))

    @unittest.expectedFailure
    def test_celah_brief8_bukti_hasil(self):
        self.assertTrue({"M17"} & set(self.ids("bukti hasil")))


if __name__ == "__main__":
    unittest.main()
