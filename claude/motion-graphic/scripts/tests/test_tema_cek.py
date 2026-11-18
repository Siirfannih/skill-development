"""Uji tema_cek.py: template + adegan bertoken lulus; literal di adegan, turunan menyimpang, MEREK kurang gagal; UI asli bebas."""
import os, shutil, subprocess, sys, tempfile, unittest

H = os.path.dirname(os.path.abspath(__file__))
ALAT = os.path.join(H, "..", "juri", "tema_cek.py")
TPL = os.path.join(H, "..", "..", "templates", "sistem-desain", "tema.ts")


class TemaCek(unittest.TestCase):
    def setUp(self):
        self.d = tempfile.mkdtemp(); os.makedirs(os.path.join(self.d, "bersama", "ui-asli", "github"))
        shutil.copy(TPL, os.path.join(self.d, "bersama", "tema.ts"))
        self.tulis("b1.tsx", "export const A=()=> <div style={{color: MEREK.primer, fontSize: HURUF.ukuran.narasi}}/>;\n")
        self.tulis("bersama/ui-asli/github/Repo.tsx", "export const G=()=> <div style={{color:'#0969DA', fontSize: 14}}/>;\n")

    def tulis(self, rel, isi): open(os.path.join(self.d, rel), "w").write(isi)
    def ubah_tema(self, a, b):
        f = os.path.join(self.d, "bersama", "tema.ts"); s = open(f).read(); open(f, "w").write(s.replace(a, b, 1))
    def rc(self): return subprocess.run([sys.executable, ALAT, self.d], capture_output=True, text=True).returncode

    def test_bersih_lulus(self): self.assertEqual(self.rc(), 0)
    def test_warna_langsung_di_adegan_gagal(self):
        self.tulis("b2.tsx", "export const B=()=> <div style={{color:'#1E1E1E'}}/>;\n"); self.assertEqual(self.rc(), 1)
    def test_ukuran_langsung_di_adegan_gagal(self):
        self.tulis("b2.tsx", "export const B=()=> <div style={{fontSize: 40}}/>;\n"); self.assertEqual(self.rc(), 1)
    def test_turunan_menyimpang_gagal(self):
        self.ubah_tema("glow: '#8FA6FF'", "glow: '#FF8F3A'"); self.assertEqual(self.rc(), 1)
    def test_merek_tanpa_latar_gagal(self):
        self.ubah_tema("  latar: '#FFFFFF',", ""); self.assertEqual(self.rc(), 1)
    def test_pengecualian_tanpa_alasan_gagal(self):
        self.ubah_tema("export const PENGECUALIAN = {", "export const PENGECUALIAN = {\n  neon: {warna: '#35F2FF', adegan: 'b2'},"); self.assertEqual(self.rc(), 1)


if __name__ == "__main__":
    unittest.main()
