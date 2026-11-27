"""Gerbang warna (scripts/warna/cek-warna.mjs): peran palet dari frame sintetis, warna nyasar (1 % gagal, 0,2 % lolos),
kontras teks APCA (putih di #F8FAFC gagal, navy lolos), warna nanggung (informasi: CATATAN, keluar 0; --ketat keluar 1), jalur HTML render-dua-kali, dan pembungkus Python.
Dilewati bila node atau scripts/warna/node_modules tidak ada (npm ci di scripts/warna)."""
import json, os, shutil, subprocess, sys, tempfile, unittest
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W = Path(__file__).resolve().parents[1] / "warna"
MJS = W / "cek-warna.mjs"
ADA = bool(shutil.which("node")) and (W / "node_modules").is_dir()
LATAR, NAVY, BIRU, PERM = "#F8FAFC", "#0B1F4B", "#2F5BEA", "#D5DCEC"


def hx(h): return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def jalan(*a, env=None):
    r = subprocess.run(["node", str(MJS), *map(str, a)], capture_output=True, text=True, env={**os.environ, **(env or {})})
    try: j = json.loads(r.stdout)
    except ValueError: j = None
    return r.returncode, j, r.stderr


def palet_json(path, hexes=(LATAR, NAVY, BIRU, PERM, "#FFFFFF")):
    e = lambda h: {"hex": h, "persen": 0, "luminansi": 0}
    with open(path, "w") as f:
        json.dump({"mode": {"terang": {"latar": e(hexes[0]), "tinta": e(hexes[1]), "aksen": [e(hexes[2])], "netral": [e(h) for h in hexes[3:]]}}}, f)


def dekat(h1, h2, tol=8): return all(abs(a - b) <= tol for a, b in zip(hx(h1), hx(h2)))


def font(n):
    try: return ImageFont.load_default(size=n)
    except TypeError: return ImageFont.load_default()


@unittest.skipUnless(ADA, "node atau scripts/warna/node_modules tidak ada")
class Warna(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name); self.palet = self.d / "palet.json"; palet_json(self.palet)

    def tearDown(self): self.t.cleanup()

    def frame(self, nama="f.png", tambah=None, latar=LATAR):
        im = Image.new("RGB", (800, 450), hx(latar)); d = ImageDraw.Draw(im)
        d.rectangle([40, 40, 360, 140], fill=hx(NAVY))      # ~8,9 %
        d.rectangle([420, 40, 600, 120], fill=hx(BIRU))     # ~4 %
        d.rectangle([40, 250, 760, 400], fill=hx(PERM))     # ~30 %
        if tambah: tambah(d)
        p = self.d / nama; im.save(p); return p

    # --- masuk
    def test_masuk_peran(self):
        f = self.frame(); out = self.d / "p.json"
        rc, _, err = jalan("masuk", f, "--out", out); self.assertEqual(rc, 0, err)
        m = json.loads(out.read_text())["mode"]["terang"]
        self.assertTrue(dekat(m["latar"]["hex"], LATAR), m["latar"])
        self.assertTrue(dekat(m["tinta"]["hex"], NAVY), m["tinta"])
        self.assertTrue(any(dekat(a["hex"], BIRU) for a in m["aksen"]), m["aksen"])
        self.assertTrue(any(dekat(n["hex"], PERM) for n in m["netral"]), m["netral"])
        self.assertGreater(m["kontras_tinta_latar"], 10); self.assertGreater(m["apca_tinta_latar"], 90)
        self.assertGreater(m["latar"]["persen"], 50)

    def test_masuk_ke_spec_dan_tema(self):
        f = self.frame(); spec = self.d / "spec.json"; tema = self.d / "tema.ts"
        spec.write_text(json.dumps({"sumber": "x"}))
        rc, _, err = jalan("masuk", f, "--out", self.d / "p.json", "--ke-spec", spec, "--ke-tema", tema); self.assertEqual(rc, 0, err)
        s = json.loads(spec.read_text()); self.assertEqual(s["sumber"], "x"); self.assertIn("terang", s["palet"]["mode"])
        t = tema.read_text()
        self.assertRegex(t, r'primer:\s*"#[0-9a-f]{6}"'); self.assertRegex(t, r'latar:\s*"#[0-9a-f]{6}"'); self.assertRegex(t, r'tinta:\s*"#[0-9a-f]{6}"')

    # --- keluar (a) warna nyasar
    def test_garis_pink_1_persen_gagal_02_lolos(self):
        pink = self.frame("pink.png", lambda d: d.rectangle([0, 200, 799, 204], fill=hx("#FF3D8B")))          # 800x5 = 1,1 %
        rc, j, _ = jalan("keluar", pink, "--palet", self.palet, "--json")
        self.assertEqual(rc, 0); self.assertEqual(j["status"], "CATATAN")
        self.assertEqual(jalan("keluar", pink, "--palet", self.palet, "--json", "--ketat")[0], 1)
        self.assertEqual(jalan("keluar", pink, "--palet", self.palet, "--json", env={"KETAT": "1"})[0], 1)
        a = [x for x in j["alasan"] if x["jenis"] == "warna-nyasar"]
        self.assertTrue(a and dekat(a[0]["hex"], "#FF3D8B", 12) and a[0]["luas"] >= 0.9, j["alasan"]); self.assertEqual(a[0]["bbox"][2], 800)
        kecil = self.frame("kecil.png", lambda d: d.rectangle([0, 200, 799, 200], fill=hx("#FF3D8B")))        # 800x1 = 0,22 %
        rc, j, _ = jalan("keluar", kecil, "--palet", self.palet, "--json"); self.assertEqual(rc, 0, j); self.assertEqual(j["status"], "PASS")

    def test_abaikan_area_foto(self):
        f = self.frame("foto.png", lambda d: d.rectangle([100, 410, 700, 445], fill=hx("#FF3D8B")))
        rc, j, _ = jalan("keluar", f, "--palet", self.palet, "--json", "--ketat"); self.assertEqual(rc, 1)
        rc, j, _ = jalan("keluar", f, "--palet", self.palet, "--abaikan", "90,400,620,50", "--json", "--ketat"); self.assertEqual(rc, 0, j)

    # --- (b) kontras lewat dua still
    def pasangan(self, warna_teks):
        bg = Image.new("RGB", (800, 450), hx(LATAR)); penuh = bg.copy()
        ImageDraw.Draw(penuh).text((60, 150), "Halo dunia", fill=hx(warna_teks), font=font(70))
        penuh.save(self.d / "t.png"); bg.save(self.d / "tn.png"); return self.d / "t.png", self.d / "tn.png"

    def test_teks_putih_di_f8fafc_gagal_navy_lolos(self):
        p, tn = self.pasangan("#FFFFFF")
        rc, j, _ = jalan("keluar", p, "--palet", self.palet, "--tanpa-teks", tn, "--json")
        self.assertEqual(rc, 1, j)
        k = [x for x in j["alasan"] if x["jenis"] == "kontras-apca"]
        self.assertTrue(k and k[0]["lc"] < 15 and k[0]["min"] in (45, 60) and len(k[0]["xy"]) == 2, j["alasan"])
        p, tn = self.pasangan(NAVY)
        rc, j, _ = jalan("keluar", p, "--palet", self.palet, "--tanpa-teks", tn, "--json")
        self.assertEqual(rc, 0, j); self.assertTrue(j["blok"] and j["blok"][0]["lc"] > 90 and j["blok"][0]["wcag"] > 10)

    # --- (c) warna nanggung
    def test_warna_nanggung(self):
        f = self.frame("keruh.png", lambda d: d.rectangle([420, 140, 780, 240], fill=hx("#6B6F8A")))       # ~ 18 %, bukan palet
        rc, j, _ = jalan("keluar", f, "--palet", self.palet, "--json")
        self.assertEqual(rc, 0); self.assertEqual(j["status"], "CATATAN"); self.assertIn("warna-nanggung", [x["jenis"] for x in j["alasan"]])
        self.assertEqual(jalan("keluar", f, "--palet", self.palet, "--json", "--ketat")[0], 1)
        # warna yang sama sebagai bagian palet = sah
        p2 = self.d / "p2.json"; palet_json(p2, (LATAR, NAVY, BIRU, PERM, "#6B6F8A"))
        rc, j, _ = jalan("keluar", f, "--palet", p2, "--json"); self.assertNotIn("warna-nanggung", [x["jenis"] for x in j["alasan"]])

    # --- jalur HTML (render dua kali + axe sebagai suplemen)
    def html(self, warna):
        h = self.d / "f.html"
        h.write_text(f"<!doctype html><meta charset=utf-8><body style='margin:0;background:{LATAR};width:800px;height:450px'>"
                     f"<div data-lapis='teks' style='position:absolute;left:80px;top:150px;font:700 64px sans-serif;color:{warna}'>Halo dunia</div></body>")
        Image.new("RGB", (800, 450), hx(LATAR)).save(self.d / "f.png"); return h, self.d / "f.png"

    def test_html_dua_render(self):
        h, p = self.html("#FFFFFF")
        rc, j, err = jalan("keluar", p, "--palet", self.palet, "--html", h, "--json")
        if rc == 2 or (j and j["status"] == "ERROR"): self.skipTest("Chromium/playwright-core tidak tersedia: " + err[-120:])
        self.assertEqual(rc, 1, j); self.assertEqual(j["kontras"], "html")
        k = [x for x in j["alasan"] if x["jenis"] == "kontras-apca"]; self.assertTrue(k and k[0]["blok"] and k[0]["lc"] < 15, j["alasan"])
        h, p = self.html(NAVY)
        rc, j, _ = jalan("keluar", p, "--palet", self.palet, "--html", h, "--json"); self.assertEqual(rc, 0, j)

    # --- sambungan di gerbang_produksi.sh: warna nyasar = CATATAN di qc/warna.json, tidak lagi memblokir; lewati hanya dengan alasan tertulis
    def test_gerbang_produksi_langkah_warna(self):
        proj = self.d / "proj"; (proj / "qc/stills").mkdir(parents=True); palet_json(proj / "palet.json")
        self.frame("liar.png", lambda d: d.rectangle([0, 200, 799, 204], fill=hx("#FF3D8B"))).replace(proj / "qc/stills/a.png")
        sh = Path(__file__).resolve().parents[1] / "juri/gerbang_produksi.sh"
        run = lambda: subprocess.run(["bash", str(sh), str(proj)], capture_output=True, text=True)
        r = run(); self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertEqual(json.loads((proj / "qc/warna.json").read_text())["status"], "CATATAN")
        (proj / "qc/warna_lewati.txt").write_text("# alasan\nfoto produk memuat warna kulit; dicek dengan mata\n")
        r = run(); self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertIn("dilewati dengan alasan tertulis", r.stdout)

    # --- pembungkus Python
    def test_pembungkus_python(self):
        f = self.frame(); r = subprocess.run([sys.executable, str(W / "palet_masuk.py"), str(f), "--out", str(self.d / "q.json")], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr); self.assertTrue((self.d / "q.json").is_file())
        r = subprocess.run([sys.executable, str(W / "palet_keluar.py"), str(f), "--palet", str(self.palet)], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)


if __name__ == "__main__":
    unittest.main()
