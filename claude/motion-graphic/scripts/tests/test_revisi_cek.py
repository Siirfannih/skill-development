#!/usr/bin/env python3
"""Uji gerbang revisi (scripts/juri/revisi_cek.py): perubahan lapisan di luar cakupan ledger harus gagal."""
import json, os, subprocess, sys, tempfile, unittest

ALAT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "juri", "revisi_cek.py")
BASIS = {"dasar": [{"src": "a", "in": 0}, {"src": "b", "in": 1}],
         "lapisan": [{"id": f"T{i}", "src": f"c/{i}.mov", "t": float(i), "x": 10, "y": 10} for i in (1, 2, 3)]}


class RevisiCek(unittest.TestCase):
    def setUp(self):
        self.d = tempfile.mkdtemp(); self.p = os.path.join(self.d, "p")
        os.makedirs(os.path.join(self.p, "lego")); self.tulis(BASIS)
        g = lambda *a: subprocess.run(["git", "-C", self.d, "-c", "user.name=t", "-c", "user.email=t@t", *a], check=True, capture_output=True, text=True).stdout.strip()
        g("init", "-q"); g("add", "-A"); g("commit", "-qm", "basis")
        self.assertEqual(self.alat("mulai", self.p, "--basis", g("rev-parse", "--short", "HEAD"), "--alasan", "uji"), 0)

    def tulis(self, d): json.dump(d, open(os.path.join(self.p, "lego/lego.json"), "w"))
    def alat(self, *a): return subprocess.run([sys.executable, ALAT, *a], capture_output=True, text=True).returncode
    def cek(self): return self.alat("cek", self.p)

    def izin(self, daftar):
        f = os.path.join(self.p, "qc/cakupan-revisi.json"); d = json.load(open(f)); d["boleh_berubah"] = daftar; json.dump(d, open(f, "w"))

    def ubah(self):
        d = json.loads(json.dumps(BASIS)); d["dasar"][1]["in"] = 1.5; d["lapisan"][0]["x"] = 500; d["lapisan"][1]["src"] = "c/2b.mov"; self.tulis(d)

    def test_tanpa_perubahan_lulus(self): self.assertEqual(self.cek(), 0)
    def test_berubah_tanpa_izin_gagal(self): self.ubah(); self.assertEqual(self.cek(), 1)

    def test_dasar_per_nomor(self):
        self.ubah(); lap = [{"id": "T1", "ledger": "D-1"}, {"id": "T2", "ledger": "D-2"}]
        self.izin(lap); self.assertEqual(self.cek(), 1)
        self.izin(lap + [{"dasar": [0], "ledger": "D-3"}]); self.assertEqual(self.cek(), 1)
        self.izin(lap + [{"dasar": [1], "ledger": "D-3"}]); self.assertEqual(self.cek(), 0)

    def test_izin_per_atribut(self):
        self.ubah(); isi = [{"id": "*", "atribut": ["isi"], "ledger": "D-1"}, {"dasar": True, "ledger": "D-3"}]
        self.izin(isi); self.assertEqual(self.cek(), 1)   # T1 pindah posisi, hanya isi yang diizinkan
        self.izin(isi + [{"id": "T1", "atribut": ["pos"], "ledger": "D-2"}]); self.assertEqual(self.cek(), 0)

    def test_izin_tanpa_ledger_gagal(self): self.ubah(); self.izin([{"id": "T*", "ledger": ""}]); self.assertEqual(self.cek(), 1)

    def test_hilang_dan_baru_gagal(self):
        d = json.loads(json.dumps(BASIS)); d["lapisan"][1]["id"] = "T9"; self.tulis(d); self.assertEqual(self.cek(), 1)

    def test_tanpa_file_cakupan_gagal(self): os.remove(os.path.join(self.p, "qc/cakupan-revisi.json")); self.assertEqual(self.cek(), 1)
    def test_basis_tidak_diganti(self): self.assertEqual(self.alat("mulai", self.p, "--basis", "HEAD", "--alasan", "x"), 1)


if __name__ == "__main__":
    unittest.main()
