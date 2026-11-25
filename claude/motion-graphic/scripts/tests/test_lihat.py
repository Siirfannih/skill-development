"""lihat.py: lapis kumulatif, crop 100 %, log; rute Remotion (dry-run) tanpa dependensi berat."""
import subprocess, sys, tempfile, unittest
from pathlib import Path

ALAT = Path(__file__).resolve().parents[1] / "lihat.py"
FRAME = ("<body style='margin:0;background:#F2EEE6'>"
         "<div data-lapis='0' style='position:absolute;left:0;top:0;width:100%;height:100%;background:#F2EEE6'></div>"
         "<div data-lapis='1' style='position:absolute;left:700px;top:300px;width:500px;height:500px;background:#2E5BFF'></div>"
         "<h1 data-lapis='2' style='position:absolute;left:100px;top:100px;font:700 120px sans-serif;color:#111'>Halo</h1></body>")


def punya_render():
    try:
        import playwright.sync_api, PIL, numpy  # noqa
        return True
    except Exception:
        return False


def jalan(*a, cwd=None):
    return subprocess.run([sys.executable, str(ALAT), *map(str, a)], capture_output=True, text=True, cwd=cwd)


class Remotion(unittest.TestCase):
    def test_dry_run_mencetak_perintah_per_lapis(self):
        r = jalan("--remotion", "Demo", "--entry", "src/index.ts", "--frame", "12", "--props", '{"a":1}', "--lapis", "0,1", "--dry-run", "--qc", tempfile.mkdtemp())
        self.assertEqual(r.returncode, 0, r.stderr)
        baris = r.stdout.strip().splitlines(); self.assertEqual(len(baris), 2)
        self.assertIn("npx remotion still src/index.ts Demo", baris[0]); self.assertIn("--frame=12", baris[0])
        self.assertIn('"lapis": 0', baris[0]); self.assertIn('"lapis": 1', baris[1]); self.assertIn('"a": 1', baris[1])

    def test_tanpa_target_gagal(self):
        self.assertEqual(jalan().returncode, 1)


@unittest.skipUnless(punya_render(), "Playwright/Pillow/numpy tidak ada")
class Html(unittest.TestCase):
    def setUp(self):
        self.d = Path(tempfile.mkdtemp()); (self.d / "frame1.html").write_text(FRAME, encoding="utf-8")

    def test_tiga_lapis_kumulatif_crop_dan_log(self):
        from PIL import Image
        r = jalan(self.d / "frame1.html", "--qc", self.d / "qc", "--lihat", "warna pas", "--perbaiki", "-"); self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        for n in range(3):
            png = self.d / f"qc/lihat/frame1-L{n}.png"; self.assertTrue(png.exists()); self.assertEqual(Image.open(png).size, (1920, 1080))
            crop = Image.open(self.d / f"qc/lihat/frame1-L{n}-crop.png"); self.assertEqual(crop.size, (960, 540))
        l0, l1, l2 = (Image.open(self.d / f"qc/lihat/frame1-L{n}.png").convert("RGB") for n in range(3))
        self.assertEqual(l0.getcolors(1000)[0][0] > 1900000, True)            # L0 = latar polos
        self.assertEqual(l1.getpixel((900, 500)), (0x2E, 0x5B, 0xFF)); self.assertEqual(l0.getpixel((900, 500)), (0xF2, 0xEE, 0xE6))
        self.assertNotEqual(l1.crop((100, 100, 700, 300)).getcolors(10000), l2.crop((100, 100, 700, 300)).getcolors(10000))  # teks baru muncul di L2
        log = (self.d / "qc/LOG-lihat.md").read_text(encoding="utf-8")
        self.assertEqual(log.count("frame1 | L"), 3); self.assertIn("warna pas", log)

    def test_satu_lapis_saja_dan_tanpa_data_lapis(self):
        r = jalan(self.d / "frame1.html", "--lapis", "1", "--qc", self.d / "qc"); self.assertEqual(r.returncode, 0, r.stderr)
        self.assertTrue((self.d / "qc/lihat/frame1-L1.png").exists()); self.assertFalse((self.d / "qc/lihat/frame1-L2.png").exists())
        (self.d / "polos.html").write_text("<body><p>x</p></body>", encoding="utf-8")
        self.assertEqual(jalan(self.d / "polos.html", "--qc", self.d / "qc").returncode, 1)

    def test_wilayah_tersibuk_menunjuk_objek_berdetail(self):
        import importlib.util
        from PIL import Image, ImageDraw
        spec = importlib.util.spec_from_file_location("lihat", ALAT); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
        im = Image.new("RGB", (1920, 1080), "#FFFFFF"); d = ImageDraw.Draw(im)
        for i in range(0, 400, 8): d.line((1400 + i, 700, 1400 + i, 1000), fill="#000000", width=3)
        x, y, w, h = m.wilayah_tersibuk(im, 960, 540)
        self.assertTrue(x <= 1400 and x + w >= 1700 and y <= 700 and y + h >= 1000, (x, y, w, h))


if __name__ == "__main__":
    unittest.main()
