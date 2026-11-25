#!/usr/bin/env python3
"""Uji gate/permukaan_cek.py: inventaris (bawaan, KEBIJAKAN-v2, tidak memblokir) dan --gerbang (K1/K2 lama), serta gate/tabrakan_cek.py bila Playwright ada."""
import json, os, subprocess, sys, tempfile, unittest
from pathlib import Path

S = Path(__file__).resolve().parents[1]
PERMUKAAN = S / "gate/permukaan_cek.py"; TABRAKAN = S / "gate/tabrakan_cek.py"

BERSIH = """<style>
body { font-family: 'Inter', 'Helvetica Neue', sans-serif; font-style: normal; background: #f4f1ea; }
.kartu { background: #fff; border: 2px solid #111; box-shadow: 0 6px 14px rgba(0,0,0,.18); }
.bg { background: linear-gradient(180deg, #f4f1ea, #e9e4d8); transform: rotate(-3deg) translateZ(0); }
.w { font-family: -apple-system, system-ui, sans-serif; filter: blur(2px); }
</style>
<p style="font-weight:800">Teks tebal</p>
"""
BERSIH_TSX = "export const A = () => <div style={{fontFamily: 'Inter, sans-serif', fontStyle: 'normal', filter: `blur(${b}px)`}}>x</div>;\n"

SLOP = {
 "K1-SERIF": ".a { font-family: 'Instrument Serif', serif; }",
 "K1-ITALIC": ".a { font-style: italic; }",
 "K2-GLASS": ".a { backdrop-filter: blur(12px); }",
 "K2-BLUR": ".a { filter: blur(12px); }",
 "K2-GRADIENT": ".a { background: radial-gradient(circle, #fff, #000); }",
 "K2-INSET": ".a { box-shadow: inset 0 1px 0 rgba(255,255,255,.4); }",
 "K2-SHADOW": ".a { box-shadow: 0 2px 4px #000, 0 8px 16px #000; }",
 "K2-GLOW": ".a { text-shadow: 0 0 12px #0ff; }",
 "K2-3D": ".a { transform: perspective(800px) rotateY(20deg); }",
}


def run(*a):
    return subprocess.run([sys.executable, *map(str, a)], capture_output=True, text=True)


class Permukaan(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name)
    def tearDown(self): self.t.cleanup()

    def cek(self, nama, isi, *flag):
        f = self.d / nama; f.write_text(isi); return run(PERMUKAAN, f, *flag)

    def rules(self, nama, isi):
        r = self.cek(nama, isi, "--json", "--gerbang"); return {x["rule"]: x["level"] for x in json.loads(r.stdout)["temuan"]}, r.returncode

    def test_bersih_nol_error(self):
        r = self.cek("bersih.html", BERSIH, "--gerbang"); self.assertEqual(r.returncode, 0, r.stdout); self.assertIn("LULUS", r.stdout)
        r = self.cek("bersih.tsx", BERSIH_TSX, "--gerbang"); self.assertEqual(r.returncode, 0, r.stdout)

    def test_sans_serif_tidak_ditandai(self):
        k, rc = self.rules("a.css", "a{font-family: Georgia-free, sans-serif} b{font-family:var(--font-sans), ui-sans-serif, sans-serif}")
        self.assertEqual((k, rc), ({}, 0))

    def test_tiap_aturan_tertangkap(self):
        for rule, isi in SLOP.items():
            k, rc = self.rules("x.css", isi); self.assertIn(rule, k, (rule, k)); self.assertEqual(rc, 1, rule)

    def test_semua_sekaligus_dan_ringkasan(self):
        r = self.cek("slop.css", "\n".join(SLOP.values()), "--json", "--gerbang"); d = json.loads(r.stdout)
        self.assertEqual(r.returncode, 1); self.assertEqual(set(SLOP) - set(d["ringkasan"]), set())

    def test_varian_serif_dan_italic(self):
        for isi in ("a{font-family: Playfair Display, serif}", "a{font-family: var(--serif)}", "const s={fontFamily:'Georgia'}",
                    "a{font: 400 20px/1.2 \"Times New Roman\"}"):
            self.assertIn("K1-SERIF", self.rules("v.css", isi)[0], isi)
        for isi in ("const s={fontStyle:'italic'}", "a{font: italic 400 20px Inter}", "<p>a <em>b</em></p>", "<i>x</i>"):
            nama = "v.html" if "<" in isi else "v.tsx"
            self.assertIn("K1-ITALIC", self.rules(nama, isi)[0], isi)

    def test_tag_i_kosong_dekorasi_tidak_ditandai(self):
        self.assertEqual(self.rules("d.html", "<div><i style=\"left:1px\"></i><i></i></div>"), ({}, 0))

    def test_blur_ambang_dan_dinamis(self):
        self.assertNotIn("K2-BLUR", self.rules("a.css", ".a{filter:blur(2px)}")[0])
        self.assertEqual(self.rules("a.css", ".a{filter:blur(4px)}")[0].get("K2-BLUR"), "ERROR")
        k, rc = self.rules("a.tsx", "const s={filter:`blur(${b}px)`}"); self.assertEqual((k.get("K2-BLUR"), rc), ("WARN", 0))

    def test_gradien_dua_warna_boleh_tiga_tidak_teks_gradien(self):
        self.assertNotIn("K2-GRADIENT", self.rules("a.css", ".a{background:linear-gradient(90deg,#000,#222)}")[0])
        self.assertIn("K2-GRADIENT", self.rules("a.css", ".a{background:linear-gradient(90deg,#000,rgba(1,2,3,.5),#fff)}")[0])
        self.assertIn("K2-GRADIENT", self.rules("a.css", ".a{-webkit-background-clip:text}")[0])

    def test_bayangan_satu_lapis_tajam_boleh(self):
        k, rc = self.rules("a.css", ".a{box-shadow:0 8px 20px rgba(0,0,0,.18); text-shadow: 2px 2px 0 #000}"); self.assertEqual((k, rc), ({}, 0))
        self.assertIn("K2-SHADOW", self.rules("a.css", ".a{box-shadow:0 30px 60px #0003}")[0])
        self.assertIn("K2-SHADOW", self.rules("a.tsx", "const s={boxShadow:'0 1px 2px #000, 0 4px 8px #000'}")[0])
        self.assertIn("K2-GLOW", self.rules("a.css", ".a{filter:drop-shadow(0 0 10px #0ff)}")[0])

    def test_3d_dan_blend(self):
        for isi in ("import * as THREE from 'three';", "a{transform-style:preserve-3d}", "a{transform:rotateX(30deg)}", "a{transform:translateZ(40px)}"):
            self.assertIn("K2-3D", self.rules("a.tsx" if "import" in isi else "a.css", isi)[0], isi)
        k, rc = self.rules("a.css", ".a{mix-blend-mode:multiply}"); self.assertEqual((k.get("K2-BLEND"), rc), ("WARN", 0))

    def test_komentar_tidak_dipindai(self):
        self.assertEqual(self.rules("a.css", "/* font-family: Georgia; backdrop-filter: blur(9px) */ a{color:red}"), ({}, 0))

    def test_pengecualian(self):
        isi = "/* permukaan-ok: user minta serif di sesi ini */\n.a{font-family: Georgia}\n.b{font-style: italic} /* permukaan-ok: kutipan dari referensi */\n"
        r = self.cek("p.css", isi, "--json", "--gerbang"); d = json.loads(r.stdout)
        self.assertEqual(r.returncode, 0, r.stdout); self.assertEqual(len(d["pengecualian"]), 2)
        r = self.cek("q.css", "/* permukaan-ok: boleh */\n.a{font-style: italic}\n", "--json", "--gerbang"); d = json.loads(r.stdout)
        self.assertEqual(r.returncode, 1); self.assertIn("K0-ALASAN", {x["rule"] for x in d["temuan"]})

    def test_lewati_node_modules_dan_jalur_hilang(self):
        (self.d / "node_modules").mkdir(); (self.d / "node_modules/x.css").write_text(SLOP["K1-ITALIC"])
        r = run(PERMUKAAN, self.d, "--gerbang"); self.assertEqual(r.returncode, 0, r.stdout)
        self.assertEqual(run(PERMUKAAN, self.d / "tidak-ada").returncode, 1)


class Inventaris(unittest.TestCase):
    """KEBIJAKAN-v2: bawaan = inventaris sistem, exit 0 walau ada serif/gradien/bayangan."""
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name)
    def tearDown(self): self.t.cleanup()

    def inv(self, nama, isi):
        f = self.d / nama; f.write_text(isi); r = run(PERMUKAAN, f, "--json"); return r, json.loads(r.stdout)["inventaris"][str(f)]["kategori"]

    def test_slop_tidak_memblokir_bawaan(self):
        r, k = self.inv("slop.css", "\n".join(SLOP.values()))
        self.assertEqual(r.returncode, 0, r.stdout)
        self.assertEqual(json.loads(r.stdout)["mode"], "inventaris")
        for kat in ("HURUF", "BAYANGAN", "GRADIEN", "KACA/BLUR", "3D"): self.assertGreater(k[kat]["total"], 0, kat)

    def test_teks_laporan_dan_exit_nol(self):
        f = self.d / "a.css"; f.write_text(".a{font-family:'Instrument Serif',serif}\n.b{font-style:italic}\n")
        r = run(PERMUKAAN, f); self.assertEqual(r.returncode, 0, r.stdout)
        self.assertIn("inventaris", r.stdout); self.assertIn("HURUF: 2 sistem berbeda", r.stdout); self.assertIn("a.css:1", r.stdout)
        self.assertNotIn("GAGAL", r.stdout)

    def test_sistem_dikelompokkan_per_nilai(self):
        isi = (".a{box-shadow:0 8px 20px rgba(0,0,0,.18)}\n.b{box-shadow:0 8px 20px rgba(0,0,0,.18)}\n.c{box-shadow:0 2px 4px #000}\n"
               ".d{background:linear-gradient(90deg,#2E5BFF,#fff)}\n.e{background:linear-gradient(90deg,#2E5BFF,#fff)}\n"
               ".f{font-family:Inter,sans-serif}\n.g{font-family:'Inter',sans-serif}\n.h{font-family:Playfair Display,serif}\n")
        r, k = self.inv("a.css", isi)
        self.assertEqual((k["BAYANGAN"]["distinct"], k["BAYANGAN"]["total"]), (2, 3))
        self.assertEqual((k["GRADIEN"]["distinct"], k["GRADIEN"]["total"]), (1, 2))
        self.assertEqual(k["HURUF"]["distinct"], 2); self.assertEqual(k["HURUF"]["per_subjenis"], {"keluarga:sans/lain": 1, "keluarga:serif": 1})

    def test_tsx_dan_komentar(self):
        r, k = self.inv("a.tsx", "// font-family: Georgia\nconst s={fontFamily:'Inter, sans-serif', boxShadow:'0 4px 12px #0002', fontStyle:'italic'}")
        self.assertEqual(k["HURUF"]["per_subjenis"], {"keluarga:sans/lain": 1, "gaya": 1}); self.assertEqual(k["BAYANGAN"]["distinct"], 1)

    def test_gerbang_memulihkan_perilaku_lama(self):
        f = self.d / "a.css"; f.write_text(".a{font-style: italic}")
        self.assertEqual(run(PERMUKAAN, f).returncode, 0)
        self.assertEqual(run(PERMUKAAN, f, "--gerbang").returncode, 1)

    def test_jalur_hilang_tetap_gagal(self):
        self.assertEqual(run(PERMUKAAN, self.d / "tidak-ada").returncode, 1)


class GerbangProduksiPermukaan(unittest.TestCase):
    def proyek(self, isi, env=None):
        t = tempfile.TemporaryDirectory(); self.addCleanup(t.cleanup); d = Path(t.name)
        (d / "remotion/src").mkdir(parents=True); (d / "remotion/src/A.tsx").write_text(isi); (d / "qc").mkdir()
        return subprocess.run(["bash", str(S / "juri/gerbang_produksi.sh"), str(d)], capture_output=True, text=True, env={**os.environ, **(env or {})})

    def test_inventaris_tidak_memblokir(self):
        r = self.proyek("const s={fontStyle:'italic'}"); self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertIn("inventaris", r.stdout)
        self.assertEqual(self.proyek(BERSIH_TSX).returncode, 0)

    def test_gerbang_lama_lewat_env(self):
        slop = "const s={fontStyle:'italic'}"
        self.assertEqual(self.proyek(slop, {"PERMUKAAN_GERBANG": "1"}).returncode, 1)
        self.assertEqual(self.proyek(BERSIH_TSX, {"PERMUKAAN_GERBANG": "1"}).returncode, 0)


def punya_playwright():
    try:
        import playwright.sync_api  # noqa
        return True
    except Exception:
        return False


@unittest.skipUnless(punya_playwright() and TABRAKAN.exists(), "Playwright tidak ada")
class Tabrakan(unittest.TestCase):
    def test_tabrakan_dan_bersih(self):
        with tempfile.TemporaryDirectory() as t:
            t = Path(t)
            (t / "bersih.html").write_text("<body style='margin:0'><h1 style='position:absolute;left:200px;top:200px;font:700 80px sans-serif'>Satu</h1>"
                                           "<p style='position:absolute;left:200px;top:600px;font:40px sans-serif'>Dua</p></body>")
            (t / "tabrak.html").write_text("<body style='margin:0'><h1 style='position:absolute;left:200px;top:200px;font:700 80px sans-serif'>Judul besar</h1>"
                                           "<p style='position:absolute;left:220px;top:230px;font:60px sans-serif'>Menimpa judul</p>"
                                           "<div data-lapis='objek' style='position:absolute;left:900px;top:200px;width:400px;height:300px;background:#ccc'></div>"
                                           "<p style='position:absolute;left:950px;top:300px;font:40px sans-serif'>Di atas objek</p></body>")
            r = run(TABRAKAN, t / "bersih.html"); self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
            r = run(TABRAKAN, t / "tabrak.html"); self.assertEqual(r.returncode, 1, r.stdout + r.stderr)
            self.assertTrue((t / "tabrak.tabrakan.png").exists())


if __name__ == "__main__":
    unittest.main()
