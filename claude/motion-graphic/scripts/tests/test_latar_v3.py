"""Uji latar LightWaveBg v3 (port patokan Irfan: AMBIENT WASH + CORE, falloff Gaussian) + GenerativeBG.
(a) pindai sumber, (b) preset, lalu render + ukur: (c) area kalem, (d) tepi, (e) kontras teks APCA, (f) grain, (g) gerak, (h) sama dengan patokan.
(a)(b) jalan di mana saja; render butuh playwright + Chromium + numpy + scipy (PC: ~/work/mg-venv/bin/python), selain itu dilewati."""
import json, re, subprocess, sys, tempfile, unittest
from pathlib import Path

MG = Path(__file__).resolve().parents[2]
TK = MG / "toolkit"
LATAR = TK / "latar"
sys.path.insert(0, str(TK / "tests")); sys.path.insert(0, str(MG / "scripts"))

V2_COMMIT = "0f464576"          # impor v2 (smoothstep + elips), pembanding kalibrasi tepi
V2_TEPI = {"dark": 0.567, "light": 0.218}   # gradien L* maks v2 (researchly-glow, 960x540), diukur dari commit itu
PATOKAN = LATAR / "patokan-irfan.glsl"
UNI = {  # warna dari komentar uniform di patokan-irfan.glsl
    "dark": dict(u_baseColor=[.012, .020, .047], u_ambientColor=[.055, .145, .420], u_coreColor=[.145, .388, .922], u_grainAmount=.02),
    "light": dict(u_baseColor=[.973, .980, .988], u_ambientColor=[.820, .875, .980], u_coreColor=[.580, .720, .990], u_grainAmount=.02)}
DASAR = {"dark": (3, 5, 12), "light": (248, 250, 252)}
TEKS = {"dark": (255, 255, 255), "light": (15, 23, 42)}      # putih (gelap) / navy (terang)

try:
    import numpy as np
    from PIL import Image
    from scipy.ndimage import gaussian_filter
    import ukur_latar as U
    from render_latar import Perender
    import playwright  # noqa: F401
    BISA = True
except ImportError:
    BISA = False

KATA = re.compile(r"fbm|simplex|perlin|snoise|valueNoise|turbulence", re.I)
KERAS = re.compile(r"\bsmoothstep\s*\(|\bstep\s*\(|\bclamp\s*\(")
PRESETS = {f.stem: json.loads(f.read_text()) for f in sorted((LATAR / "presets").glob("*.json"))}


def tanpa_komentar_js(s):
    s = re.sub(r"/\*.*?\*/", "", s, flags=re.S)
    return "\n".join(re.sub(r"(?<!:)//.*$", "", b) for b in s.splitlines())


def fungsi_glsl(src, nama, tipe="float"):
    """Badan fungsi GLSL `nama` (dari deklarasi sampai kurung kurawal penutup yang seimbang)."""
    i = src.index(f"{tipe} {nama}("); j = src.index("{", i); d = 0
    for k in range(j, len(src)):
        d += src[k] == "{"; d -= src[k] == "}"
        if d == 0: return src[i:k + 1]
    raise AssertionError("kurung tidak seimbang")


def varian(p, mode):
    return {**p["params"], **(p.get("varian", {}).get(mode) or {})}


class PindaiSumber(unittest.TestCase):
    def frag(self):
        js = (LATAR / "light-wave-bg.js").read_text()
        return tanpa_komentar_js(js[js.index("const FRAG"):js.index("const cache")])

    def test_tanpa_noise_pembentuk_warna(self):
        frag = self.frag()
        self.assertIsNone(KATA.search(frag), KATA.search(frag))
        luar = frag.replace(fungsi_glsl(frag, "hash"), "")
        self.assertEqual(len(re.findall(r"\bhash\(", luar)), 1, "hash() hanya dipanggil sekali (grain)")
        self.assertRegex(luar, r"grain\s*=\s*\(hash\(", "hash hanya untuk grain")

    def test_cahaya_tanpa_smoothstep_step_clamp_dan_pakai_exp(self):
        frag = self.frag()
        self.assertIsNone(KERAS.search(frag), f"smoothstep/step/clamp pada shader: {KERAS.search(frag)}")
        g = fungsi_glsl(frag, "gaussianGlow")
        self.assertIn("exp(", g); self.assertRegex(g, r"exp\(\s*-dot\(d,\s*d\)\s*\*\s*falloff\s*\)")

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

    def test_bawaan_core_ambient_sama_dengan_patokan(self):
        s = (LATAR / "light-wave-bg.js").read_text()
        self.assertRegex(s, r"DEFAULT_CORE = \{ x: 1\.05, y: 0\.15, radius: 0\.95, ratio: 0\.6 / 0\.95, intensity: 0\.75, falloff: 2\.2 \}")
        self.assertRegex(s, r"DEFAULT_AMBIENT = \{ x: 0\.75, y: 0\.4, width: 1\.35, ratio: 0\.95 / 1\.35, angle: 0, intensity: 0\.55, falloff: 1\.4 \}")
        self.assertTrue(PATOKAN.exists(), "salinan patokan-irfan.glsl dibutuhkan untuk uji paritas")


class PresetAturan(unittest.TestCase):
    def test_pusat_core_di_luar_frame(self):
        n = 0
        for nama, p in PRESETS.items():
            modes = ("dark", "light") if p["komponen"] == "lightwave" else (None,)
            for mode in modes:
                d = varian(p, mode)
                luar = [d["core"]] if p["komponen"] == "lightwave" else list(d.get("zones") or [])
                self.assertTrue(luar, f"{nama}/{mode}: tanpa sumber cahaya")
                for g in luar:
                    self.assertTrue(g["x"] < 0 or g["x"] > 1 or g["y"] < 0 or g["y"] > 1, f"{nama}/{mode}: pusat ({g['x']}, {g['y']}) di dalam frame")
                    n += 1
        self.assertGreaterEqual(n, 7)

    def test_grain_dan_tanpa_mode_noise(self):
        for nama, p in PRESETS.items():
            for d in [p["params"], *(p.get("varian") or {}).values()]:
                self.assertLessEqual(d.get("grain", 0), 0.02, nama)
                self.assertNotEqual(d.get("mode"), "noise", nama)

    def test_setiap_preset_lightwave_punya_dua_varian_dengan_dasar_ambient_core(self):
        for nama, p in PRESETS.items():
            if p["komponen"] != "lightwave": continue
            for mode in ("dark", "light"):
                d = varian(p, mode); self.assertEqual(d["mode"], mode, nama); self.assertEqual(len(d["colors"]), 3, nama)
                self.assertIn("ambient", d); self.assertIn("core", d)

    def test_simpan_preset_menolak_core_di_dalam_frame(self):
        sys.path.insert(0, str(LATAR)); import simpan_preset as sp
        base = {"colors": ["#000000", "#111111", "#222222"], "mode": "dark"}
        for salah in ({"core": {"x": 0.5, "y": 0.5, "radius": 1}}, {"grain": 0.05}, {"mode": "noise"}, {"zones": [{"x": 0.3, "y": 0.3}]}):
            with self.assertRaises(SystemExit): sp.cek({**base, **salah})
        sp.cek({**base, "core": {"x": 1.2, "y": 0.3, "radius": 1}, "ambient": {"width": 1.4}, "grain": 0.02})


@unittest.skipUnless(BISA, "playwright/numpy/scipy tidak ada (jalankan di PC: ~/work/mg-venv/bin/python)")
class RenderUkur(unittest.TestCase):
    W, H = 960, 540
    KOTAK_TEKS = (int(.15 * 960), int(.42 * 540), int(.85 * 960), int(.58 * 540))     # baris judul di tengah

    @classmethod
    def setUpClass(cls):
        try: cls.P = Perender()
        except Exception as e: raise unittest.SkipTest(f"Chromium headless tidak jalan: {e}")
        cls.tmp = tempfile.TemporaryDirectory()
        cls.v2 = None
        repo = MG.parents[1]
        if subprocess.run(["git", "-C", str(repo), "cat-file", "-e", V2_COMMIT], capture_output=True).returncode == 0:
            d = Path(cls.tmp.name) / "v2"; d.mkdir()
            ar = subprocess.run(["git", "-C", str(repo), "archive", V2_COMMIT, "claude/motion-graphic/toolkit"], capture_output=True)
            subprocess.run(["tar", "-x", "-C", str(d)], input=ar.stdout, check=True)
            cls.v2 = cls.P.versi(d / "claude/motion-graphic/toolkit")

    @classmethod
    def tearDownClass(cls):
        if cls.v2: cls.v2.tutup()
        cls.P.tutup(); cls.tmp.cleanup()

    def semua(self):
        for nama, p in PRESETS.items():
            if p["komponen"] != "lightwave": continue
            for mode in ("dark", "light"):
                yield nama, mode, {"preset": nama, "mode": mode}

    def test_c_area_kalem_dan_f_grain_dan_g_gerak(self):
        for nama, mode, o in self.semua():
            a = self.P.lightwave(o, 30, self.W, self.H); b = self.P.lightwave(o, 60, self.W, self.H)   # dua frame berjarak 1 s
            ka, kb = U.area_kalem(a, DASAR[mode]), U.area_kalem(b, DASAR[mode]); tag = f"{nama}/{mode}"
            g = max(U.grain(a), U.grain(b))
            sa, sb = (U.blur(x, 4) for x in (a, b)); gerak = float(np.abs(sa - sb).max())
            print(f"  {tag}: kalem {ka:.1f} % / {kb:.1f} %, grain {g:.4f}, gerak maks {gerak:.1f}/255")
            self.assertGreaterEqual(ka, 50, tag); self.assertGreaterEqual(kb, 50, tag)
            self.assertLessEqual(g, 0.02, tag)
            self.assertGreater(gerak, 0.2 if nama == "editorial-polos" else 1.0, f"{tag}: cahaya tidak bergerak")   # editorial sengaja nyaris polos

    def test_grain_dibatasi_walau_diminta_besar(self):
        img = self.P.lightwave({"preset": "editorial-polos", "mode": "dark", "grain": 0.3}, 30, self.W, self.H)
        self.assertLessEqual(U.grain(img), 0.02)

    def test_d_tidak_ada_tepi(self):
        for mode in ("dark", "light"):
            o = {"preset": "researchly-glow", "mode": mode}
            if self.v2:
                m2 = U.tepi(self.v2.lightwave(o, 30, self.W, self.H))[0]
                self.assertAlmostEqual(m2, V2_TEPI[mode], delta=0.05, msg="kalibrasi v2 bergeser")
            batas = 0.5 * V2_TEPI[mode]       # v3 harus < setengah gradien maksimum v2
            for fr in (0, 30, 60):
                m3, p3 = U.tepi(self.P.lightwave(o, fr, self.W, self.H))
                print(f"  tepi {mode} f{fr}: v3 maks {m3:.3f} (p99,9 {p3:.3f}) | v2 {V2_TEPI[mode]:.3f} | batas {batas:.3f}")
                self.assertLess(m3, batas, f"{mode} f{fr}: gradien {m3:.3f} >= {batas:.3f}")
        for nama, mode, o in self.semua():   # semua preset: batas per mode
            m3 = U.tepi(self.P.lightwave(o, 30, self.W, self.H))[0]
            self.assertLess(m3, 0.5 * V2_TEPI[mode], f"{nama}/{mode}: {m3:.3f}")

    def test_e_kontras_teks_apca(self):
        for nama, mode, o in self.semua():
            lc = U.kontras_teks(self.P.lightwave(o, 30, self.W, self.H), self.KOTAK_TEKS, TEKS[mode])
            print(f"  APCA {nama}/{mode} ({'putih' if mode == 'dark' else 'navy'}): Lc terburuk {lc:.1f}")
            self.assertGreaterEqual(lc, 60, f"{nama}/{mode}")

    def test_apca_rumus_sesuai_nilai_acuan(self):
        self.assertAlmostEqual(U.apca((0, 0, 0), (255, 255, 255)), 106.04, delta=0.1)
        self.assertAlmostEqual(U.apca((255, 255, 255), (0, 0, 0)), -107.88, delta=0.1)

    def test_h_v3_sama_dengan_patokan_apa_adanya(self):
        frag = PATOKAN.read_text()
        for mode in ("dark", "light"):
            for fr in (0, 30):
                pat = self.P.glsl(frag, UNI[mode], fr, self.W, self.H)
                v3 = self.P.lightwave({"preset": "researchly-glow", "mode": mode}, fr, self.W, self.H)
                d = np.abs(pat.astype(int) - v3.astype(int))
                self.assertLessEqual(int(d.max()), 2, f"{mode} f{fr}: selisih maks {d.max()}/255 (hanya pembulatan hex yang boleh)")

    def test_prop_base_brand_dan_override(self):
        img = self.P.lightwave({"preset": "researchly-glow", "mode": "dark", "base": "#0A1440"}, 30, self.W, self.H)
        self.assertGreaterEqual(U.area_kalem(img, (10, 20, 64)), 50)
        a = self.P.lightwave({"preset": "researchly-glow", "mode": "dark", "core": {"x": 1.3}}, 30, self.W, self.H)
        b = self.P.lightwave({"preset": "researchly-glow", "mode": "dark"}, 30, self.W, self.H)
        self.assertGreater(float(np.abs(a.astype(int) - b.astype(int)).max()), 10, "override core.x tidak berpengaruh")

    def test_generatif_zona_ruang_negatif_dan_tolak_noise(self):
        from scipy.ndimage import gaussian_filter  # noqa: F401
        p = PRESETS["zona-lembut"]["params"]; base = [int(p["base"][i:i + 2], 16) for i in (1, 3, 5)]
        a = self.P.generatif({"preset": "zona-lembut"}, 30, 540, 960); b = self.P.generatif({"preset": "zona-lembut"}, 60, 540, 960)
        for img in (a, b): self.assertGreaterEqual(U.area_kalem(img, base, batas=3), 50)
        self.assertGreater(float(np.abs(a.astype(int) - b.astype(int)).max()), 0)
        err = self.P.pg.evaluate("() => { try { TK.bgCSS({ mode: 'noise', colors: ['#000000'] }); return ''; } catch (e) { return String(e); } }")
        self.assertIn("noise", err)
        err = self.P.pg.evaluate("() => { try { TK.bgCSS({ mode: 'zona', colors: ['#000000'], zones: [{ x: 0.5, y: 0.5, r: 0.5 }] }); return ''; } catch (e) { return String(e); } }")
        self.assertIn("di luar frame", err)


if __name__ == "__main__":
    unittest.main(verbosity=2)
