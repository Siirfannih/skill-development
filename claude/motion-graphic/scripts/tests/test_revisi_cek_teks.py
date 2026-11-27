"""Uji revisi_cek.py (tingkat atribut): atribut blok teks di luar cakupan ditolak, sumber usul ditolak."""
import json, os, subprocess, sys, tempfile, unittest

ALAT = os.path.join(os.path.dirname(__file__), "..", "juri", "revisi_cek.py")


def git(d, *a):
    subprocess.run(["git", "-C", d, *a], check=True, capture_output=True)


class RevisiCek(unittest.TestCase):
    def setUp(self):
        self.d = tempfile.mkdtemp()
        git(self.d, "init", "-q"); git(self.d, "config", "user.email", "t@t"); git(self.d, "config", "user.name", "t")
        os.makedirs(os.path.join(self.d, "lego")); os.makedirs(os.path.join(self.d, "qc"))
        self.tulis_lego(); self.tulis_teks({})
        git(self.d, "add", "-A"); git(self.d, "commit", "-qm", "basis")
        self.basis = subprocess.run(["git", "-C", self.d, "rev-parse", "HEAD"], capture_output=True, text=True).stdout.strip()

    def tulis_lego(self):
        json.dump({"dasar": [], "lapisan": []}, open(os.path.join(self.d, "lego/lego.json"), "w"))

    def tulis_teks(self, ubah):
        b = {"id": "T100", "kata": [205, 205], "teks": "profesional", "t": 78.6, "dur": 0.6, "pos": [700, 840], "ukuran": 80}
        b.update(ubah)
        json.dump([b, {"id": "T101", "kata": [206, 206], "teks": "gak?", "t": 79.3, "pos": [900, 840]}],
                  open(os.path.join(self.d, "teks.json"), "w"))

    def cek(self, izin):
        json.dump({"basis": self.basis, "alasan": "uji", "boleh_berubah": izin}, open(os.path.join(self.d, "qc/cakupan-revisi.json"), "w"))
        return subprocess.run([sys.executable, ALAT, "cek", self.d], capture_output=True, text=True)

    def test_warna_tidak_diminta_gagal(self):
        self.tulis_teks({"id": "T102", "pos": [700, 300], "warna": "#F97066", "ukuran": 97})
        r = self.cek([{"teks": "profesional", "atribut": ["pos"], "ledger": "D-1", "sumber": "Irfan"}])
        self.assertEqual(r.returncode, 1, r.stdout)
        self.assertIn("warna", r.stdout); self.assertIn("ukuran", r.stdout)

    def test_hanya_posisi_lulus(self):
        self.tulis_teks({"pos": [700, 300]})
        r = self.cek([{"teks": "profesional", "atribut": ["pos"], "ledger": "D-1", "sumber": "Irfan"}])
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)

    def test_sumber_usul_ditolak(self):
        self.tulis_teks({"warna": "#F97066"})
        r = self.cek([{"teks": "profesional", "atribut": ["warna"], "ledger": "D-2", "sumber": "usul"}])
        self.assertNotEqual(r.returncode, 0)

    def test_tanpa_sumber_ditolak(self):
        self.tulis_teks({"pos": [700, 300]})
        r = self.cek([{"teks": "profesional", "atribut": ["pos"], "ledger": "D-1"}])
        self.assertNotEqual(r.returncode, 0)

    def test_sumber_pemilik_dan_owner_lulus_seperti_irfan(self):
        for sumber in ("pemilik", "owner"):
            self.tulis_teks({"warna": "#F97066"})
            r = self.cek([{"teks": "profesional", "atribut": ["warna"], "ledger": "D-2", "sumber": sumber}])
            self.assertEqual(r.returncode, 0, (sumber, r.stdout + r.stderr))

    def test_usul_dipilih_lulus(self):
        self.tulis_teks({"warna": "#F97066"})
        r = self.cek([{"teks": "profesional", "atribut": ["warna"], "ledger": "D-2", "sumber": "usul-dipilih"}])
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)


if __name__ == "__main__":
    unittest.main()
