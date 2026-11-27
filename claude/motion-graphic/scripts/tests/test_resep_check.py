#!/usr/bin/env python3
"""resep_check.py: isian RESEP.md yang kurang = CATATAN (keluar 0; --ketat keluar 1); berkas rujukan hilang (kartu kiblat, REF-SPEC.md, RESEP.md) tetap keluar 1.
User tanpa referensi boleh memakai REF-SPEC.md (`Kartu: tidak ada`)."""
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

    def jalan(self, teks, ref_spec=False, ketat=False):
        (self.d / "RESEP.md").write_text(teks, encoding="utf-8")
        if ref_spec: (self.d / "REF-SPEC.md").write_text("# REF-SPEC\n", encoding="utf-8")
        r = subprocess.run([sys.executable, str(SKRIP), str(self.d / "RESEP.md")] + (["--ketat"] if ketat else []), capture_output=True, text=True)
        return r.returncode, r.stdout + r.stderr

    def catatan(self, teks, ref_spec=False):
        """Isian kurang: keluar 0 bawaan dengan CATATAN, keluar 1 dengan --ketat. Mengembalikan keluaran bawaan."""
        rc, out = self.jalan(teks, ref_spec); self.assertEqual(rc, 0, out); self.assertIn("CATATAN", out)
        rc_k, _ = self.jalan(teks, ref_spec, ketat=True); self.assertEqual(rc_k, 1)
        return out


class JalurKartu(Dasar):
    def test_kartu_kiblat_tetap_lulus(self):
        rc, out = self.jalan(isi()); self.assertEqual(rc, 0, out); self.assertIn("kiblat = kartu 63", out)

    def test_kartu_tidak_ditemukan_gagal(self):
        rc, out = self.jalan(isi(kartu="cookbook/tidak-ada.md")); self.assertEqual(rc, 1); self.assertIn("kartu kiblat tidak ditemukan", out)

    def test_path_kartu_kosong_atau_placeholder_gagal(self):
        self.assertIn("path kartu kiblat belum diisi", self.catatan(isi(kartu="<path kartu | tidak ada>")))

    def test_tidak_ada_dengan_kiblat_kartu_tetap_gagal(self):
        self.assertIn("kartu kiblat tidak ditemukan: tidak ada", self.catatan(isi(kiblat="kartu 63", kartu="tidak ada"), ref_spec=True))


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
        self.assertIn("lebih dari satu sumber", self.catatan(isi(kiblat="REF-SPEC", kartu="tidak ada", teks="kartu 95"), ref_spec=True))

    def test_campur_tiga_pengikat_gagal_walau_kartu_tidak_ada(self):
        self.assertIn("lebih dari satu sumber", self.catatan(isi(kiblat="REF-SPEC", kartu="tidak ada", warna="REF-SPEC", teks="REF-SPEC", ritme="kartu 95"), ref_spec=True))

    def test_tidak_ada_tanpa_sumber_pengikat_terisi_gagal(self):
        self.catatan(isi(kiblat="<kiblat>", kartu="tidak ada"), ref_spec=True)


class IsianJadiCatatan(Dasar):
    """Isian yang kurang dicatat di jalur REF-SPEC maupun jalur kartu; tidak lagi menggagalkan."""

    def kedua_jalur(self):
        yield dict(kiblat="kartu 63"), False
        yield dict(kiblat="REF-SPEC", kartu="tidak ada"), True

    def test_label_hilang_jadi_catatan(self):
        for label in ("Prompt Irfan", "Alasan memilih", "Kamera diam?"):
            for kw, rs in self.kedua_jalur():
                teks = isi(**kw)
                bersih = "\n".join(l for l in teks.splitlines() if label not in l)
                self.assertIn(f"'{label}' belum diisi", self.catatan(bersih, ref_spec=rs))

    def test_label_prompt_pemilik_diterima_setara(self):
        for kw, rs in self.kedua_jalur():
            rc, out = self.jalan(isi(**kw).replace("**Prompt Irfan", "**Prompt pemilik"), ref_spec=rs)
            self.assertEqual(rc, 0, out); self.assertNotIn("CATATAN", out)
            rc, out = self.jalan(isi(**kw).replace("**Prompt Irfan", "**Prompt pemilik"), ref_spec=rs, ketat=True)
            self.assertEqual(rc, 0, out)

    def test_label_penyesuaian_lantai_tidak_dituntut(self):
        for kw, rs in self.kedua_jalur():
            bersih = "\n".join(l for l in isi(**kw).splitlines() if "Penyesuaian karena LANTAI" not in l)
            rc, out = self.jalan(bersih, ref_spec=rs, ketat=True); self.assertEqual(rc, 0, out)

    def test_baris_bagian_hilang_dicatat(self):
        for kw, rs in self.kedua_jalur():
            teks = "\n".join(l for l in isi(**kw).splitlines() if not l.startswith("| Musik"))
            self.assertIn("baris 'musik' tidak ada", self.catatan(teks, ref_spec=rs))

    def test_sumber_belum_diisi_dicatat(self):
        for kw, rs in self.kedua_jalur():
            self.catatan(isi(warna="<kiblat>", **kw), ref_spec=rs)

    def test_teknik_pinjaman_tanpa_catatan_dicatat(self):
        for kw, rs in self.kedua_jalur():
            self.assertIn("tanpa catatan alasan", self.catatan(isi(broll="kartu 92", catatan="", **kw), ref_spec=rs))
            rc, out = self.jalan(isi(broll="kartu 92", catatan="disesuaikan ke pengikat dengan warna merek", **kw), ref_spec=rs)
            self.assertEqual(rc, 0, out)

    def test_berkas_resep_tidak_ada_gagal(self):
        r = subprocess.run([sys.executable, str(SKRIP), str(self.d / "tidak-ada.md")], capture_output=True, text=True)
        self.assertEqual(r.returncode, 1); self.assertIn("tidak ada", r.stdout)


if __name__ == "__main__":
    unittest.main()
