#!/usr/bin/env python3
"""Delapan brief penerimaan (reports/RENCANA-PERBAIKAN-KARTU.md §3; evals/cases/mg-060..067): pilih_kartu menemukan mekanik yang tepat untuk beat
brief non-pemilik, tanpa kartu proses Q, kartu audio hanya bila bunyi disebut, kartu 95 hanya untuk query cutout/kolase/metafora, dan beat
ajakan (cta) yang belum punya kartu dijawab terus terang. Deterministik, indeks asli."""
import importlib.util, re, subprocess, sys, unittest
from pathlib import Path

S = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("pilih_kartu", S / "cookbook/pilih_kartu.py"); pk = importlib.util.module_from_spec(spec); spec.loader.exec_module(pk)

# (brief, query, kartu yang diharapkan: salah satu harus ada di 4 teratas). Harapan rencana yang dikoreksi saat tinjauan (alasan di
# steward/changes/2026-11-27-kartu-tinjauan.md): "cta booking"/"cta pesan" tidak lagi mengharapkan M05 (M05 = punchline/cutaway, bukan ajakan;
# tidak ada kartu cta, lihat CTA di bawah); "penutup" tanpa kata bunyi mengembalikan 25, M22 hanya bila bunyi disebut.
BEAT = [
    (1, "hook takut", {"M08", "M14"}), (1, "harga promo", {"M20"}), (1, "testimoni pasien", {"M16", "M09"}),
    (2, "banding sebelum sesudah", {"M19"}), (2, "langkah alur aplikasi", {"63", "M18"}), (2, "angka hemat waktu", {"M20"}),
    (3, "transisi antar ruang", {"M01"}), (3, "penekanan fitur", {"M06", "M04", "17"}), (3, "angka harga", {"M20"}),
    (4, "before after", {"M19", "80"}), (4, "suasana hangat", {"M13", "M02"}), (4, "penekanan hasil", {"M05", "M10"}),
    (5, "montase suasana ramai", {"M02"}), (5, "angka promo", {"M20"}),
    (6, "angka statistik", {"M20"}), (6, "kisah bukti", {"M15", "M16"}), (6, "langkah donasi", {"M17", "98"}),
    (6, "penutup", {"25", "M05"}), (6, "penutup bunyi", {"M22"}),
    (7, "hook opini", {"M14"}), (7, "balik koreksi bukan tapi", {"M14", "M07"}), (7, "penekanan kata kunci", {"M03", "M06"}),
    (8, "langkah demo ui", {"63", "M18"}), (8, "jelaskan konsep", {"88", "96"}), (8, "bukti hasil", {"M17"}),
]
CTA = [(1, "cta booking"), (5, "cta pesan"), (6, "donasi pendidikan"), (0, "daftar sekarang")]
SEMUA = [(b, q) for b, q, _ in BEAT] + CTA
POLA_95 = re.compile(r"cutout|kolase|collage|metafora|metaphor|halftone")
BUNYI = re.compile(r"bunyi|sfx|audio|suara|sound|musik|music|lagu")


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
            with self.subTest(brief=b, q=q):
                if not POLA_95.search(q):
                    self.assertNotIn("95", self.ids(q), q)
        self.assertIn("95", self.ids("cutout metaphor")); self.assertIn("95", self.ids("kolase metafora"))

    def test_kartu_audio_hanya_bila_bunyi_disebut(self):
        audio = {k["id"] for k in self.kartu if "audio" in k["daftar_fungsi"]}
        for b, q in SEMUA:
            with self.subTest(brief=b, q=q):
                if not BUNYI.search(q):
                    self.assertFalse(audio & set(self.ids(q)), q)

    def test_cta_tanpa_kartu_dijawab_jujur(self):
        self.assertNotIn("cta", next(k for k in self.kartu if k["id"] == "M05")["daftar_fungsi"])
        for b, q in CTA:
            with self.subTest(brief=b, q=q):
                self.assertEqual(self.ids(q), [])
                r = subprocess.run([sys.executable, str(S / "cookbook/pilih_kartu.py"), "--cari", q], capture_output=True, text=True)
                self.assertEqual(r.returncode, 1); self.assertIn("Belum ada kartu untuk fungsi cta", r.stdout)

    def test_tiap_kartu_hasil_memuat_fungsi_yang_diminta(self):
        # query di BEAT tidak menyebut nama mekanik, jadi setiap kartu hasil harus memuat salah satu fungsi yang diminta
        for b, q, _ in BEAT:
            with self.subTest(brief=b, q=q):
                minta = set(pk.fungsi_query(q)) & pk.tercakup(self.kartu)
                for k in pk.pilih(self.kartu, q):
                    if minta:
                        self.assertTrue(minta & set(k["daftar_fungsi"]), f"{q!r}: {k['id']} {k['daftar_fungsi']}")

    def test_kata_industri_saja_tidak_mengembalikan_kartu(self):
        for q in ("klinik gigi", "skincare restoran properti"):
            self.assertEqual(self.ids(q), [], q)

    def test_ui_pendek_tidak_dibuang(self):
        self.assertEqual(pk.kata_kunci("langkah demo ui")[-1], "ui")
        self.assertTrue({"63", "M18", "65", "M19"} & set(self.ids("langkah demo ui")))


if __name__ == "__main__":
    unittest.main()
