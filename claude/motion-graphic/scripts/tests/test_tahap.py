"""Uji tahap.py: langkah dicentang tanpa bukti belum dianggap selesai; cek tahap gagal sampai semua berbukti."""
import os, shutil, subprocess, sys, tempfile, unittest

ALAT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "juri", "tahap.py")
TPL = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "templates", "TAHAP.md")


class Tahap(unittest.TestCase):
    def setUp(self):
        self.d = tempfile.mkdtemp(); shutil.copy(TPL, os.path.join(self.d, "TAHAP.md"))

    def run_(self, *a): return subprocess.run([sys.executable, ALAT, self.d, *a], capture_output=True, text=True)

    def ganti(self, a, b):
        f = os.path.join(self.d, "TAHAP.md"); s = open(f).read(); open(f, "w").write(s.replace(a, b, 1))

    def test_awal_menunjuk_tahap_1(self):
        r = self.run_(); self.assertIn("Tahap 1", r.stdout); self.assertIn("profil_cek", r.stdout)

    def test_centang_tanpa_bukti_belum_selesai(self):
        self.ganti("- [ ] Profil merek", "- [x] Profil merek"); r = self.run_()
        self.assertIn("Tahap 1", r.stdout); self.assertIn("tanpa bukti", r.stdout.replace("belum ada bukti", "tanpa bukti"))
        self.assertEqual(self.run_("cek", "1").returncode, 1)

    def test_berbukti_lanjut_ke_tahap_2(self):
        s = open(os.path.join(self.d, "TAHAP.md")).read()
        i = s.index("- [ ] Profil merek"); j = s.index("\n", i)
        open(os.path.join(self.d, "TAHAP.md"), "w").write(s[:i] + s[i:j].replace("- [ ]", "- [x]") + " LULUS: profil Uji siap" + s[j:])
        self.assertEqual(self.run_("cek", "1").returncode, 0)
        self.assertIn("Tahap 2", self.run_().stdout)


if __name__ == "__main__":
    unittest.main()
