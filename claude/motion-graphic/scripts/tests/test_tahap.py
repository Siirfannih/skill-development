"""Uji tahap.py: langkah dicentang tanpa bukti belum dianggap selesai; cek tahap gagal sampai semua berbukti; `cek final`
menuntut semua tahap sebelum Deliver (format lama: tahap 1–3); template memakai nama tahap kanonik."""
import os, re, shutil, subprocess, sys, tempfile, unittest

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

    def centang(self, sampai):
        """Centang + beri bukti semua langkah tahap 1..sampai."""
        f = os.path.join(self.d, "TAHAP.md"); out, no = [], 0
        for b in open(f).read().split("\n"):
            m = re.match(r"^## Tahap (\d+)", b)
            if m: no = int(m.group(1))
            if b.startswith("- [ ]") and no <= sampai: b = b.replace("- [ ]", "- [x]", 1) + " LULUS: uji"
            out.append(b)
        open(f, "w").write("\n".join(out))

    def test_berbukti_lanjut_ke_tahap_2(self):
        s = open(os.path.join(self.d, "TAHAP.md")).read()
        i = s.index("- [ ] Profil merek"); j = s.index("\n", i)
        open(os.path.join(self.d, "TAHAP.md"), "w").write(s[:i] + s[i:j].replace("- [ ]", "- [x]") + " LULUS: profil Uji siap" + s[j:])
        self.assertIn("Tahap 1", self.run_().stdout)
        self.centang(1)
        self.assertEqual(self.run_("cek", "1").returncode, 0)
        self.assertIn("Tahap 2", self.run_().stdout)

    def test_template_memakai_nama_tahap_kanonik(self):
        nama = re.findall(r"^## Tahap \d+ · (.+)$", open(TPL).read(), flags=re.M)
        self.assertEqual(nama, ["Brief", "Naskah", "Storyboard/block out", "Animate", "Effects & grade", "Mix", "Deliver"])
        t = open(TPL).read()
        for x in ("Naskah final disetujui pemilik", "Storyboard + tabel racikan cookbook", "grade_ukur.py", "Mix dikunci", "Google Drive"):
            self.assertIn(x, t)

    def test_cek_final_menuntut_semua_tahap_sebelum_deliver(self):
        self.centang(5); r = self.run_("cek", "final")
        self.assertEqual(r.returncode, 1); self.assertIn("Tahap 6", r.stdout); self.assertNotIn("Tahap 7", r.stdout)
        self.centang(6); self.assertEqual(self.run_("cek", "final").returncode, 0)

    def test_cek_final_format_lama_tetap_tahap_1_3(self):
        lama = ("## Tahap 1 · Profil merek\n- [x] a → ok\n## Tahap 2 · Editing guideline + preview\n- [x] b → ok\n"
                "## Tahap 3 · Produksi penuh\n- [x] c → ok\n## Tahap 4 · Render 1\n- [ ] d →\n")
        open(os.path.join(self.d, "TAHAP.md"), "w").write(lama)
        self.assertEqual(self.run_("cek", "final").returncode, 0)
        open(os.path.join(self.d, "TAHAP.md"), "w").write(lama.replace("- [x] c → ok", "- [ ] c →"))
        self.assertEqual(self.run_("cek", "final").returncode, 1)


if __name__ == "__main__":
    unittest.main()
