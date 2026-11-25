"""Uji profil_cek.py: template kosong gagal; profil terisi dengan aset ada lulus; warna bukan hex gagal; NEGATIF v2: huruf kedua tanpa peran/frekuensi
ditolak (serif utama tidak), gradien tanpa keluarga hue terdefinisi ditolak (bayangan/glow tidak ditolak per nama)."""
import os, re, shutil, subprocess, sys, tempfile, unittest

ALAT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "juri", "profil_cek.py")
TPL = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "templates", "merek")


class ProfilCek(unittest.TestCase):
    def setUp(self):
        self.d = os.path.join(tempfile.mkdtemp(), "merek", "uji")
        os.makedirs(os.path.join(self.d, "aset/font")); os.makedirs(os.path.join(self.d, "aset/logo"))
        for f in ("BRAND.md", "EDITING.md"): shutil.copy(os.path.join(TPL, f), self.d)

    def cek(self): return subprocess.run([sys.executable, ALAT, self.d], capture_output=True, text=True)

    def isi(self, aksen="#2E5BFF"):
        b = open(os.path.join(self.d, "BRAND.md")).read()
        b = b.replace("<nama merek>", "Uji").replace("<slug-merek>", "uji").replace('"<nama>"', '"Outfit"')
        b = b.replace("aset/font/<file>", "aset/font/Outfit.woff2").replace('"#2E5BFF"', f'"{aksen}"')
        b = re.sub(r"<[^>\n]{2,}>", "terisi", b)
        open(os.path.join(self.d, "BRAND.md"), "w").write(b)
        e = open(os.path.join(self.d, "EDITING.md")).read().replace('kiblat_kartu: ["?"]', 'kiblat_kartu: ["18"]')
        open(os.path.join(self.d, "EDITING.md"), "w").write(re.sub(r"<[^>\n]{2,}>", "terisi", e))
        for f in ("aset/font/Outfit.woff2", "aset/logo/logo-terang.svg", "aset/logo/logo-gelap.svg"):
            open(os.path.join(self.d, f), "w").close()

    def test_template_kosong_gagal(self): self.assertEqual(self.cek().returncode, 1)
    def test_terisi_lulus(self): self.isi(); r = self.cek(); self.assertEqual(r.returncode, 0, r.stdout)
    def test_warna_bukan_hex_gagal(self): self.isi(aksen="biru"); self.assertEqual(self.cek().returncode, 1)
    def ganti_logo(self, nilai):
        f = os.path.join(self.d, "BRAND.md"); b = open(f).read()
        b = b.replace("terang: aset/logo/logo-terang.svg", f"terang: {nilai}").replace("gelap:  aset/logo/logo-gelap.svg", f"gelap:  {nilai}")
        open(f, "w").write(b)
    def test_merek_tanpa_logo_lulus(self): self.isi(); self.ganti_logo('"tidak ada"'); r = self.cek(); self.assertEqual(r.returncode, 0, r.stdout)
    def test_logo_hilang_gagal(self): self.isi(); self.ganti_logo("aset/logo/tidak-ada-file.svg"); self.assertEqual(self.cek().returncode, 1)

    # --- NEGATIF v2: huruf kedua harus sistem; gradien harus punya keluarga hue ---
    def tambah(self, baris, file="BRAND.md"):
        f = os.path.join(self.d, file); open(f, "a").write("\n" + baris + "\n")

    def ganti(self, lama, baru):
        f = os.path.join(self.d, "BRAND.md"); b = open(f).read(); assert lama in b, lama; open(f, "w").write(b.replace(lama, baru))

    def kedua(self, nilai):
        self.ganti("  huruf_kedua: {keluarga: \"?\", peran: \"?\", frekuensi: \"?\"}", f"  huruf_kedua: {nilai}")

    def test_template_punya_slot_huruf_kedua(self):
        self.assertIn("huruf_kedua: {keluarga", open(os.path.join(TPL, "BRAND.md")).read())

    def test_huruf_kedua_tanpa_peran_gagal(self):
        self.isi(); self.kedua('{keluarga: "Instrument Serif", peran: "?", frekuensi: "?"}'); r = self.cek()
        self.assertEqual(r.returncode, 1); self.assertIn("peran", r.stdout); self.assertIn("frekuensi", r.stdout)

    def test_huruf_kedua_dengan_peran_dan_frekuensi_lulus(self):
        self.isi(); self.kedua('{keluarga: "Instrument Serif", peran: "suara logo", frekuensi: "<= 1 per frame"}')
        self.tambah("Kata penutup memakai huruf serif italic sebagai suara logo."); r = self.cek(); self.assertEqual(r.returncode, 0, r.stdout)

    def test_slot_aksen_lama_tanpa_peran_gagal(self):
        self.isi(); self.ganti("  isi:     {", '  aksen:   {keluarga: "Inter", bobot: 300, file: "aset/font/Outfit.woff2"}\n  isi:     {'); r = self.cek()
        self.assertEqual(r.returncode, 1); self.assertIn("peran", r.stdout)

    def test_serif_utama_tidak_ditolak(self):
        self.isi(); self.ganti('"Outfit"', '"Playfair Display"'); r = self.cek(); self.assertEqual(r.returncode, 0, r.stdout)

    def test_serif_di_teks_tanpa_slot_gagal_tapi_negasi_boleh(self):
        self.isi(); self.tambah("Kata penutup memakai huruf serif italic."); r = self.cek(); self.assertEqual(r.returncode, 1); self.assertIn("huruf_kedua", r.stdout)
        self.setUp(); self.isi(); self.tambah("Jangan pakai serif, italic, atau script."); r = self.cek(); self.assertEqual(r.returncode, 0, r.stdout)

    def test_script_tanpa_slot_gagal(self):
        self.isi(); self.tambah("Tanda tangan memakai font Pacifico."); self.assertEqual(self.cek().returncode, 1)

    def test_bayangan_dan_glow_tidak_ditolak_per_nama(self):
        self.isi(); self.tambah("bayangan: 0 4px 12px rgba(0,0,0,.2), 0 24px 60px rgba(0,0,0,.3)"); r = self.cek(); self.assertEqual(r.returncode, 0, r.stdout)
        self.setUp(); self.isi(); self.tambah("Aksen diberi glow biru."); r = self.cek(); self.assertEqual(r.returncode, 0, r.stdout)

    def test_gradien_butuh_keluarga_hue(self):
        # lulus: satu keluarga hue (biru) + netral, dua dan tiga stop; radial boleh bila hue jelas
        self.isi(); self.tambah("latar: linear-gradient(180deg, #F2EEE6, #EAE5DA)"); r = self.cek(); self.assertEqual(r.returncode, 0, r.stdout)
        self.setUp(); self.isi(); self.tambah("latar: linear-gradient(180deg, #FFFFFF, #CFE0FF, #2E5BFF)"); r = self.cek(); self.assertEqual(r.returncode, 0, r.stdout)
        self.setUp(); self.isi(); self.tambah("latar: radial-gradient(circle, #0A1F5C, #001133)"); r = self.cek(); self.assertEqual(r.returncode, 0, r.stdout)
        self.setUp(); self.isi(); self.tambah("Latar: keluarga hue biru, gradien dari #FFFFFF ke #2E5BFF."); r = self.cek(); self.assertEqual(r.returncode, 0, r.stdout)
        # gagal: tiga keluarga hue, stop tanpa warna terukur, kata gradien tanpa definisi
        self.setUp(); self.isi(); self.tambah("latar: linear-gradient(90deg, #FF0000, #00FF00, #0000FF)"); r = self.cek(); self.assertEqual(r.returncode, 1); self.assertIn("keluarga hue", r.stdout)
        self.setUp(); self.isi(); self.tambah("latar: linear-gradient(90deg, biru, ungu)"); self.assertEqual(self.cek().returncode, 1)
        self.setUp(); self.isi(); self.tambah("Latar memakai gradien halus."); self.assertEqual(self.cek().returncode, 1)

    def test_editing_juga_dicek(self):
        self.isi(); self.tambah("Penekanan dengan serif.", file="EDITING.md"); r = self.cek(); self.assertEqual(r.returncode, 1); self.assertIn("EDITING.md", r.stdout)


if __name__ == "__main__":
    unittest.main()
