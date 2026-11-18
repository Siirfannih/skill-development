"""Uji profil_cek.py: template kosong gagal; profil terisi dengan aset ada lulus; warna bukan hex gagal."""
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


if __name__ == "__main__":
    unittest.main()
