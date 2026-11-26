#!/usr/bin/env python3
"""resep_check.py: gerbang RESEP.md. Kartu kiblat dari referensi user tetap diperiksa seperti dulu; user tanpa referensi boleh memakai REF-SPEC.md (`Kartu: tidak ada`)."""
import subprocess, sys, tempfile, unittest
from pathlib import Path

SKRIP = Path(__file__).resolve().parents[1] / "juri" / "resep_check.py"
KARTU_ASLI = "01-motion-camera-transitions/63-virtual-camera-desktop-stage.md"  # ada di cookbook/; dicari lewat kandidat path skrip

RESEP = """# RESEP: contoh

**Prompt Irfan (disalin apa adanya):**
> buat video contoh

**Jenis video:** motion ber-VO · **Rasio, durasi target:** 9:16, 30 dtk
**Kiblat:** {kiblat} · **Kartu:** `{kartu}` · **Asal kiblat:** contoh
**Alasan memilih (satu kalimat):** karena contoh.

| Bagian | Jenis | Sumber | Catatan |
|---|---|---|---|
| Warna & tekstur | pengikat | {warna} | |
| Teks | pengikat | {teks} | |
| Ritme | pengikat | {ritme} | |
| B-roll / footage | teknik | {broll} | {catatan} |
| Motion graphic | teknik | {warna} | |
| Kamera & transisi | teknik | {warna} | |
| SFX | teknik | {warna} | |
| Musik | teknik | {warna} | |

**Penyesuaian karena LANTAI:** tidak ada
**Kamera diam?** tidak
"""


def isi(kiblat="kartu 63", kartu=KARTU_ASLI, warna=None, teks=None, ritme=None, broll=None, catatan=""):
    w = warna or kiblat
    return RESEP.format(kiblat=kiblat, kartu=kartu, warna=w, teks=teks or w, ritme=ritme or w, broll=broll or w, catatan=catatan)


class Dasar(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name)

    def tearDown(self): self.t.cleanup()

    def jalan(self, teks, ref_spec=False):
        (self.d / "RESEP.md").write_text(teks, encoding="utf-8")
        if ref_spec: (self.d / "REF-SPEC.md").write_text("# REF-SPEC\n", encoding="utf-8")
        r = subprocess.run([sys.executable, str(SKRIP), str(self.d / "RESEP.md")], capture_output=True, text=True)
        return r.returncode, r.stdout + r.stderr


class JalurKartu(Dasar):
    def test_kartu_kiblat_tetap_lulus(self):
        rc, out = self.jalan(isi()); self.assertEqual(rc, 0, out); self.assertIn("kiblat = kartu 63", out)

    def test_kartu_tidak_ditemukan_gagal(self):
        rc, out = self.jalan(isi(kartu="cookbook/tidak-ada.md")); self.assertEqual(rc, 1); self.assertIn("kartu kiblat tidak ditemukan", out)

    def test_path_kartu_kosong_atau_placeholder_gagal(self):
        rc, out = self.jalan(isi(kartu="<path kartu | tidak ada>")); self.assertEqual(rc, 1); self.assertIn("path kartu kiblat belum diisi", out)

    def test_tidak_ada_dengan_kiblat_kartu_tetap_gagal(self):
        rc, out = self.jalan(isi(kiblat="kartu 63", kartu="tidak ada"), ref_spec=True)
        self.assertEqual(rc, 1); self.assertIn("kartu kiblat tidak ditemukan: tidak ada", out)


class JalurRefSpec(Dasar):
    def test_ref_spec_tanpa_kartu_lulus(self):
        rc, out = self.jalan(isi(kiblat="REF-SPEC", kartu="tidak ada"), ref_spec=True)
        self.assertEqual(rc, 0, out); self.assertIn("kiblat = ref-spec", out)

    def test_profil_merek_tanpa_kartu_lulus(self):
        rc, out = self.jalan(isi(kiblat="profil merek + tema", kartu="tidak ada"), ref_spec=True)
        self.assertEqual(rc, 0, out)

    def test_ref_spec_tanpa_berkas_gagal(self):
        rc, out = self.jalan(isi(kiblat="REF-SPEC", kartu="tidak ada"), ref_spec=False)
        self.assertEqual(rc, 1); self.assertIn("pengikat dari REF-SPEC tetapi REF-SPEC.md tidak ada di folder proyek", out)

    def test_ref_spec_dengan_path_kartu_nyata_diperiksa_seperti_dulu(self):
        rc, out = self.jalan(isi(kiblat="REF-SPEC", kartu=KARTU_ASLI), ref_spec=False)
        self.assertEqual(rc, 0, out)  # tidak butuh REF-SPEC.md; kartunya yang diperiksa
        rc, out = self.jalan(isi(kiblat="REF-SPEC", kartu="cookbook/tidak-ada.md"), ref_spec=True)
        self.assertEqual(rc, 1); self.assertIn("kartu kiblat tidak ditemukan", out)

    def test_ref_spec_campur_kartu_gagal(self):
        rc, out = self.jalan(isi(kiblat="REF-SPEC", kartu="tidak ada", teks="kartu 95"), ref_spec=True)
        self.assertEqual(rc, 1); self.assertIn("lebih dari satu sumber", out)

    def test_campur_tiga_pengikat_gagal_walau_kartu_tidak_ada(self):
        rc, out = self.jalan(isi(kiblat="REF-SPEC", kartu="tidak ada", warna="REF-SPEC", teks="REF-SPEC", ritme="kartu 95"), ref_spec=True)
        self.assertEqual(rc, 1); self.assertIn("lebih dari satu sumber", out)

    def test_tidak_ada_tanpa_sumber_pengikat_terisi_gagal(self):
        rc, out = self.jalan(isi(kiblat="<kiblat>", kartu="tidak ada"), ref_spec=True)
        self.assertEqual(rc, 1)


class TetapDitolak(Dasar):
    """Semua penolakan lama tetap berlaku di jalur REF-SPEC maupun jalur kartu."""

    def kedua_jalur(self):
        yield dict(kiblat="kartu 63"), False
        yield dict(kiblat="REF-SPEC", kartu="tidak ada"), True

    def test_label_wajib_hilang_gagal(self):
        for label in ("Prompt Irfan", "Alasan memilih", "Penyesuaian karena LANTAI", "Kamera diam?"):
            for kw, rs in self.kedua_jalur():
                teks = isi(**kw)
                bersih = "\n".join(l for l in teks.splitlines() if label not in l)
                rc, out = self.jalan(bersih, ref_spec=rs)
                self.assertEqual(rc, 1, (label, kw, out)); self.assertIn(f"'{label}' belum diisi", out)

    def test_baris_bagian_hilang_gagal(self):
        for kw, rs in self.kedua_jalur():
            teks = "\n".join(l for l in isi(**kw).splitlines() if not l.startswith("| Musik"))
            rc, out = self.jalan(teks, ref_spec=rs); self.assertEqual(rc, 1); self.assertIn("baris 'musik' tidak ada", out)

    def test_sumber_belum_diisi_gagal(self):
        for kw, rs in self.kedua_jalur():
            rc, out = self.jalan(isi(warna="<kiblat>", **kw), ref_spec=rs); self.assertEqual(rc, 1)

    def test_teknik_pinjaman_tanpa_catatan_gagal(self):
        for kw, rs in self.kedua_jalur():
            rc, out = self.jalan(isi(broll="kartu 92", catatan="", **kw), ref_spec=rs)
            self.assertEqual(rc, 1); self.assertIn("tanpa catatan alasan", out)
            rc, out = self.jalan(isi(broll="kartu 92", catatan="disesuaikan ke pengikat dengan warna merek", **kw), ref_spec=rs)
            self.assertEqual(rc, 0, out)

    def test_berkas_resep_tidak_ada_gagal(self):
        r = subprocess.run([sys.executable, str(SKRIP), str(self.d / "tidak-ada.md")], capture_output=True, text=True)
        self.assertEqual(r.returncode, 1); self.assertIn("tidak ada", r.stdout)

    def test_label_penyesuaian_lantai_kosong_gagal(self):
        for kw, rs in self.kedua_jalur():
            teks = isi(**kw).replace("**Penyesuaian karena LANTAI:** tidak ada", "**Penyesuaian karena LANTAI:** <isi>")
            rc, out = self.jalan(teks, ref_spec=rs); self.assertEqual(rc, 1); self.assertIn("'Penyesuaian karena LANTAI' belum diisi", out)


if __name__ == "__main__":
    unittest.main()
