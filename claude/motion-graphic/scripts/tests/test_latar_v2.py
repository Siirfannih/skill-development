"""Uji latar LightWaveBg v2 + GenerativeBG: tanpa noise pembentuk warna, cahaya di luar frame,
ruang negatif >= 50 %, grain <= 0.02, gerak terlihat. (a) pindai sumber, (b) preset, (c) render + ukur, (d) gerak.
(a) dan (b) jalan di mana saja; (c)/(d) butuh playwright + Chromium + numpy + scipy (PC: ~/work/mg-venv/bin/python), selain itu dilewati."""
import json, re, subprocess, sys, tempfile, unittest
from pathlib import Path

MG = Path(__file__).resolve().parents[2]
TK = MG / "toolkit"
LATAR = TK / "latar"
sys.path.insert(0, str(TK / "tests")); sys.path.insert(0, str(MG / "scripts"))

try:
    import numpy as np
    from PIL import Image
    from scipy.ndimage import gaussian_filter
    import ref_spec as RS
    from render_latar import Perender
    import playwright  # noqa: F401
    BISA = True
except ImportError:
    BISA = False

KATA = re.compile(r"fbm|simplex|perlin|snoise|valueNoise|turbulence", re.I)
PRESETS = {f.stem: json.loads(f.read_text()) for f in sorted((LATAR / "presets").glob("*.json"))}


def tanpa_komentar_js(s):
    s = re.sub(r"/\*.*?\*/", "", s, flags=re.S)
    return "\n".join(re.sub(r"(?<!:)//.*$", "", b) for b in s.splitlines())


def tanpa_fungsi(src, nama):
    """Buang fungsi GLSL `nama` (dari deklarasinya sampai kurung kurawal penutup yang seimbang)."""
    i = src.index(f"float {nama}(")
    j = src.index("{", i); d = 0
    for k in range(j, len(src)):
        d += src[k] == "{"; d -= src[k] == "}"
        if d == 0: return src[:i] + src[k + 1:]
    raise AssertionError("kurung tidak seimbang")


def varian(p, mode):
    return {**p["params"], **(p.get("varian", {}).get(mode) or {})}


class PindaiSumber(unittest.TestCase):
    def test_shader_tanpa_noise_di_luar_grain(self):
        js = (LATAR / "light-wave-bg.js").read_text()
        frag = js[js.index("const FRAG"):js.index("const cache")]
        frag = tanpa_komentar_js(frag)
        luar = tanpa_fungsi(tanpa_fungsi(frag, "grain"), "hash")      # hash dan grain: satu-satunya acak
        self.assertIsNone(KATA.search(luar), KATA.search(luar))
        self.assertIsNone(KATA.search(frag), "grain juga tidak boleh memakai fbm/simplex/...")
        self.assertEqual(len(re.findall(r"\bhash\(", luar)), 0, "hash() hanya boleh dipanggil dari grain()")
        self.assertEqual(len(re.findall(r"\bgrain\(", luar)), 1, "grain() dipanggil sekali, hanya menambah piksel")

    def test_semua_modul_latar_tanpa_kata_terlarang(self):
        for f in sorted(LATAR.rglob("*")):
            if f.suffix in (".js", ".ts", ".tsx") and "presets" not in f.parts:
                self.assertIsNone(KATA.search(tanpa_komentar_js(f.read_text())), f.name)

    def test_mode_noise_dihapus(self):
        s = tanpa_komentar_js((LATAR / "generative-bg.js").read_text())
        self.assertNotIn("drawNoise", s); self.assertNotIn("createImageData", s)
        self.assertNotIn('"noise"', (LATAR / "generative-bg.d.ts").read_text())

    def test_grain_dibatasi_di_kode(self):
        s = (LATAR / "light-wave-bg.js").read_text()
        self.assertIn("GRAIN_MAKS = 0.02", s)
        self.assertIn("Math.min(o.grain ?? GRAIN_MAKS, GRAIN_MAKS)", s)
        self.assertIn("min(u_grain,", s)


class PresetAturan(unittest.TestCase):
    def test_pusat_cahaya_di_luar_frame(self):
        n = 0
        for nama, p in PRESETS.items():
            modes = ("dark", "light") if p["komponen"] == "lightwave" else (None,)
            for mode in modes:
                d = varian(p, mode)
                luar = [d[k] for k in ("glow", "glow2") if d.get(k)] + list(d.get("zones") or [])
                self.assertTrue(luar, f"{nama}/{mode}: tanpa sumber cahaya")
                for g in luar:
                    self.assertTrue(g["x"] < 0 or g["x"] > 1 or g["y"] < 0 or g["y"] > 1, f"{nama}/{mode}: pusat ({g['x']}, {g['y']}) di dalam frame")
                    n += 1
        self.assertGreaterEqual(n, 8)

    def test_grain_dan_tanpa_mode_noise(self):
        for nama, p in PRESETS.items():
            for d in [p["params"], *(p.get("varian") or {}).values()]:
                self.assertLessEqual(d.get("grain", 0), 0.02, nama)
                self.assertNotEqual(d.get("mode"), "noise", nama)

    def test_setiap_preset_lightwave_punya_dua_varian_dengan_dasar(self):
        for nama, p in PRESETS.items():
            if p["komponen"] != "lightwave": continue
            for mode in ("dark", "light"):
                d = varian(p, mode); self.assertEqual(d["mode"], mode, nama); self.assertGreaterEqual(len(d["colors"]), 2)

    def test_simpan_preset_menolak_cahaya_di_dalam_frame(self):
        sys.path.insert(0, str(LATAR)); import simpan_preset as sp
        base = {"colors": ["#000000", "#111111"], "mode": "dark"}
        for salah in ({"glow": {"x": 0.5, "y": 0.5, "r": 1}}, {"grain": 0.05}, {"mode": "noise"}, {"zones": [{"x": 0.3, "y": 0.3}]}):
            with self.assertRaises(SystemExit): sp.cek({**base, **salah})
        sp.cek({**base, "glow": {"x": 1.2, "y": 0.3, "r": 1}, "grain": 0.02})


@unittest.skipUnless(BISA, "playwright/numpy/scipy tidak ada (jalankan di PC: ~/work/mg-venv/bin/python)")
class RenderUkur(unittest.TestCase):
    W, H = 540, 960

    @classmethod
    def setUpClass(cls):
        try: cls.P = Perender()
        except Exception as e: raise unittest.SkipTest(f"Chromium headless tidak jalan: {e}")
        cls.tmp = tempfile.TemporaryDirectory()

    @classmethod
    def tearDownClass(cls):
        cls.P.tutup(); cls.tmp.cleanup()

    def hex(self, c): return [int(c[i:i + 2], 16) for i in (1, 3, 5)]

    def negatif(self, img, dasar):
        de = RS.de2000(RS.rgb2lab(img.reshape(-1, 3)), RS.rgb2lab([self.hex(dasar)]))[:, 0]
        return de < 3, 100 * float((de < 3).mean())

    def grain(self, img, mask):
        f = img.astype(float) / 255
        hp = f - np.stack([gaussian_filter(f[..., c], 1.5) for c in range(3)], -1)
        return float(hp.reshape(-1, 3)[mask].std())

    def semua(self):
        for nama, p in PRESETS.items():
            if p["komponen"] != "lightwave": continue
            for mode in ("dark", "light"):
                yield nama, mode, varian(p, mode)["colors"][0], {"preset": nama, "mode": mode}

    def test_ruang_negatif_grain_dan_gerak(self):
        for nama, mode, dasar, o in self.semua():
            a = self.P.lightwave(o, 30, self.W, self.H); b = self.P.lightwave(o, 60, self.W, self.H)    # dua frame berjarak 1 s
            ma, pa = self.negatif(a, dasar); mb, pb = self.negatif(b, dasar)
            tag = f"{nama}/{mode}"
            print(f"  {tag}: ruang negatif {pa:.1f} % -> {pb:.1f} %", end="")
            self.assertGreaterEqual(pa, 50, tag); self.assertGreaterEqual(pb, 50, tag)
            g = max(self.grain(a, ma), self.grain(b, mb)); print(f", grain {g:.4f}", end="")
            self.assertLessEqual(g, 0.02, tag)
            sa, sb = (np.stack([gaussian_filter(x.astype(float)[..., c], 4) for c in range(3)], -1) for x in (a, b))
            gerak = float(np.abs(sa - sb).max()); print(f", gerak maks {gerak:.1f}/255")
            self.assertGreater(gerak, 1.0, f"{tag}: ekor cahaya tidak bergerak")

    def test_grain_dibatasi_walau_diminta_besar(self):
        o = {"preset": "editorial-polos", "mode": "dark", "grain": 0.3}
        img = self.P.lightwave(o, 30, self.W, self.H)
        m, _ = self.negatif(img, "#03050C")
        self.assertLessEqual(self.grain(img, m), 0.02)

    def test_dasar_navy_lewat_prop_base(self):
        o = {"preset": "researchly-glow", "mode": "dark", "base": "#0A1440"}
        img = self.P.lightwave(o, 30, self.W, self.H)
        _, persen = self.negatif(img, "#0A1440"); self.assertGreaterEqual(persen, 50)

    def test_banding_f1_tidak_terpicu(self):
        for nama, mode, dasar, o in self.semua():
            png = Path(self.tmp.name) / f"{nama}-{mode}.png"
            Image.fromarray(self.P.lightwave(o, 30, self.W, self.H)).save(png)
            r = subprocess.run([sys.executable, str(MG / "scripts/banding.py"), str(png), "--out", str(png.with_suffix(".cmp.png"))], capture_output=True, text=True)
            self.assertIn("F1 gradien ragu-ragu: tidak", r.stdout, f"{nama}/{mode}\n{r.stdout}{r.stderr}")

    def test_generatif_zona_ruang_negatif_dan_tolak_noise(self):
        p = PRESETS["zona-lembut"]["params"]
        a = self.P.generatif({"preset": "zona-lembut"}, 30, self.W, self.H); b = self.P.generatif({"preset": "zona-lembut"}, 60, self.W, self.H)
        for img in (a, b): self.assertGreaterEqual(self.negatif(img, p["base"])[1], 50)
        self.assertGreater(float(np.abs(a.astype(int) - b.astype(int)).max()), 0)
        err = self.P.pg.evaluate("() => { try { TK.bgCSS({ mode: 'noise', colors: ['#000000'] }); return ''; } catch (e) { return String(e); } }")
        self.assertIn("noise", err)
        err = self.P.pg.evaluate("() => { try { TK.bgCSS({ mode: 'zona', colors: ['#000000'], zones: [{ x: 0.5, y: 0.5, r: 0.5 }] }); return ''; } catch (e) { return String(e); } }")
        self.assertIn("di luar frame", err)


if __name__ == "__main__":
    unittest.main(verbosity=2)
