"""Uji tema_cek.py: template + adegan bertoken tanpa catatan; literal di adegan, turunan menyimpang, MEREK kurang = CATATAN (keluar 0, --ketat keluar 1); UI asli bebas; tema.ts hilang gagal."""
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
    def rc(self, *x): return subprocess.run([sys.executable, ALAT, self.d, *x], capture_output=True, text=True).returncode
    def catatan(self):
        """Temuan: keluar 0 bawaan, 1 dengan --ketat."""
        self.assertEqual(self.rc(), 0); self.assertEqual(self.rc("--ketat"), 1)

    def test_bersih_lulus(self): self.assertEqual(self.rc(), 0)
    def test_warna_langsung_di_adegan_dicatat(self):
        self.tulis("b2.tsx", "export const B=()=> <div style={{color:'#1E1E1E'}}/>;\n"); self.catatan()
    def test_ukuran_langsung_di_adegan_dicatat(self):
        self.tulis("b2.tsx", "export const B=()=> <div style={{fontSize: 40}}/>;\n"); self.catatan()
    def test_turunan_menyimpang_dicatat(self):
        self.ubah_tema("glow: '#8FA6FF'", "glow: '#FF8F3A'"); self.catatan()
    def test_merek_tanpa_latar_dicatat(self):
        self.ubah_tema("  latar: '#FFFFFF',", ""); self.catatan()
    def test_pengecualian_tanpa_alasan_dicatat(self):
        self.ubah_tema("export const PENGECUALIAN = {", "export const PENGECUALIAN = {\n  neon: {warna: '#35F2FF', adegan: 'b2'},"); self.catatan()

    def test_tema_ts_hilang_tetap_gagal(self):
        os.remove(os.path.join(self.d, "bersama", "tema.ts")); self.assertNotEqual(self.rc(), 0)


if __name__ == "__main__":
    unittest.main()
