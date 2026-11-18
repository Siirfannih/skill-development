#!/usr/bin/env python3
"""Uji gerbang sinkron lego: compose.validate (dasar < 2 frame), lego/base_pts.py, lego/cek_master.py."""
import json, os, subprocess, sys, tempfile, unittest

LEGO = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lego")
FF = ["ffmpeg", "-v", "error", "-y"]
sys.path.insert(0, LEGO)
import compose


def alat(nama, *a):
    return subprocess.run([sys.executable, os.path.join(LEGO, nama), *a], capture_output=True, text=True)


class LegoSinkron(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.d = tempfile.mkdtemp()
        subprocess.run(FF + ["-f", "lavfi", "-i", "testsrc=s=160x96:r=30:d=3", "-pix_fmt", "yuv420p", os.path.join(cls.d, "dasar.mp4")], check=True)
        subprocess.run(FF + ["-f", "lavfi", "-i", "color=c=red:s=64x32:r=30,format=yuva444p", "-frames:v", "10", "-c:v", "prores_ks",
                             "-profile:v", "4444", "-pix_fmt", "yuva444p10le", os.path.join(cls.d, "kotak.mov")], check=True)
        subprocess.run(FF + ["-f", "lavfi", "-i", "color=c=blue:s=64x32:r=30", "-frames:v", "10", "-pix_fmt", "yuv420p", os.path.join(cls.d, "opaque.mp4")], check=True)

    def lego(self, dasar, lapisan=(), durasi=None):
        p = os.path.join(self.d, "lego.json")
        json.dump({"fps": 30, "w": 160, "h": 96, "dasar": dasar, "lapisan": list(lapisan)}, open(p, "w"))
        lp = os.path.join(self.d, "lapisan.json")
        if durasi: json.dump([{"id": i, "durasi": v} for i, v in durasi.items()], open(lp, "w"))
        elif os.path.exists(lp): os.remove(lp)
        return p

    BAIK = [{"src": "dasar.mp4", "in": 0, "dur": 1.0, "kamera": {"zoom": [1, 1.1]}}, {"src": "dasar.mp4", "in": 1.0, "dur": 1.5}]
    KOTAK = {"id": "K1", "src": "kotak.mov", "t": 0.5, "x": 10, "y": 10}

    def test_validate_tolak_dasar_1_frame(self):
        errs, _ = compose.validate({"fps": 30, "w": 160, "h": 96, "dasar": [dict(self.BAIK[0]), {"src": "dasar.mp4", "in": 1, "dur": 1 / 30}], "lapisan": []}, self.d)
        self.assertTrue(any("gabungkan" in e for e in errs))
        self.assertEqual(alat("base_pts.py", self.lego([self.BAIK[0], {"src": "dasar.mp4", "in": 1, "dur": 1 / 30}])).returncode, 1)

    def test_base_pts_lulus_tanpa_klip_1_frame(self):
        r = alat("base_pts.py", self.lego(self.BAIK)); self.assertEqual(r.returncode, 0, r.stdout + r.stderr)

    def test_periksa_pts_ganda(self):
        import base_pts
        self.assertTrue(base_pts.periksa([0, 1 / 30, 1 / 30, 3 / 30], 30))
        self.assertEqual(base_pts.periksa([i / 30 for i in range(5)], 30), [])

    def test_cek_master_lulus(self):
        r = alat("cek_master.py", self.lego(self.BAIK, [self.KOTAK, {"id": "O1", "src": "opaque.mp4", "t": 1.0, "x": 0, "y": 0}], {"K1": 99}))
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertIn("opaque dilewati: 1", r.stdout)

    def test_cek_master_gagal_bila_tampil_beda_dari_rencana(self):
        # lapisan 10 frame mulai t=2.2 dari dasar 2,5 dtk: keluaran terpotong di akhir dasar, hanya 8 frame tampil (rencana 10)
        r = alat("cek_master.py", self.lego(self.BAIK, [dict(self.KOTAK, t=2.2)]))
        self.assertEqual(r.returncode, 1, r.stdout + r.stderr); self.assertIn("K1", r.stdout)

    def test_cek_master_hanya_pola(self):
        r = alat("cek_master.py", self.lego(self.BAIK, [dict(self.KOTAK, t=2.2)]), "--hanya", "Z*")
        self.assertEqual(r.returncode, 1); self.assertIn("tidak ada lapisan", r.stdout)


if __name__ == "__main__":
    unittest.main()
