"""Uji toolkit gerak (toolkit/): paritas curves.ts/js (statis), preset, bundel storyboard, mulai.sh, kebersihan mekanik, dan gerbang easing sendiri."""
import importlib.util, json, re, shutil, subprocess, sys, tempfile, unittest
from pathlib import Path

MG = Path(__file__).resolve().parents[2]
TK = MG / "toolkit"


def muat(nama, rel):
    spec = importlib.util.spec_from_file_location(nama, MG / rel)
    m = importlib.util.module_from_spec(spec); sys.modules[nama] = m; spec.loader.exec_module(m)
    return m


lint = muat("motion_lint_tk", "scripts/juri/motion_lint.py")
simpan = muat("simpan_preset_tk", "toolkit/latar/simpan_preset.py")


def tanpa_komentar(s):
    s = re.sub(r"/\*.*?\*/", "", s, flags=re.S)
    return "\n".join(re.sub(r"(?<!:)//.*$", "", b) for b in s.splitlines())


class Kurva(unittest.TestCase):
    def test_bezier_dan_nama_sama_di_ts_dan_js(self):
        ts = (TK / "gerak/curves.ts").read_text(); js = (TK / "gerak/curves.js").read_text()
        pola = r"(\w+):\s*(?:Easing\.)?bezier\(([^)]*)\)"
        a = {k: [float(x) for x in v.split(",")] for k, v in re.findall(pola, ts)}
        b = {k: [float(x) for x in v.split(",")] for k, v in re.findall(pola, js)}
        self.assertEqual(len(a), 7); self.assertEqual(a, b)
        for fn in ("dur", "exitDur", "react", "move", "arc", "drift", "lerp", "clamp01"):
            self.assertIn(f"export const {fn} ", ts, fn); self.assertIn(f"export const {fn} ", js, fn)

    def test_impor_lama_tetap_jalan(self):
        self.assertIn("toolkit/gerak/curves", (MG / "scripts/remotion/curves.ts").read_text())
        self.assertFalse(re.search(r"^export const CURVE", (MG / "scripts/remotion/curves.ts").read_text(), re.M))


class Kebersihan(unittest.TestCase):
    def kode(self):
        for f in TK.rglob("*"):
            if f.is_file() and f.suffix in (".js", ".ts", ".tsx") and "tests" not in f.parts and "presets" not in f.parts and f.name != "tema.ts":
                yield f, tanpa_komentar(f.read_text())

    def test_deterministik(self):
        for f, s in self.kode():
            self.assertNotRegex(s, r"Math\.random|Date\.now|performance\.now|requestAnimationFrame|new Date\(", f.name)

    def test_tanpa_warna_atau_huruf_bawaan(self):
        for f, s in self.kode():
            if f.name == "tema.js":
                continue
            self.assertNotRegex(s, r"#[0-9a-fA-F]{3,8}\b", f"{f.name}: warna bawaan")
            self.assertNotRegex(s, r"font-?[Ff]amily\s*:\s*['\"]\w", f"{f.name}: huruf bawaan")

    def test_grain_dan_latar_mati_bawaan(self):
        self.assertRegex((TK / "latar/grain.js").read_text(), r"opacity = 0")
        self.assertRegex((TK / "starter/src/tema.ts").read_text(), r'mode: "off"')
        self.assertRegex((TK / "starter/src/tema.ts").read_text(), r"GRAIN = \{ opacity: 0")

    def test_waktu_shader_dari_frame(self):
        s = (TK / "latar/light-wave-bg.js").read_text()
        self.assertIn('u("u_time"), frame / fps', s)


class Preset(unittest.TestCase):
    def test_index_sinkron_dengan_json(self):
        data = {f.stem: json.loads(f.read_text()) for f in sorted((TK / "latar/presets").glob("*.json"))}
        js = (TK / "latar/presets/index.js").read_text()
        self.assertEqual(json.loads(js.split("PRESETS = ", 1)[1].rstrip().rstrip(";")), data)
        for nama in ("researchly-glow", "editorial-polos", "hangat-netral"):
            self.assertIn(nama, data)
        for d in data.values():
            self.assertIn(d["komponen"], ("lightwave", "generative")); self.assertIn("params", d)

    def test_simpan_preset(self):
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp); (tmp / "presets").mkdir()
            asli = simpan.DIR; simpan.DIR = tmp / "presets"
            try:
                p = tmp / "p.json"; p.write_text(json.dumps({"colors": ["#000000", "#111111"], "mode": "dark", "glow": {"x": 0.1, "y": 0.2, "r": 0.3}, "saturation": 1.3}))
                self.assertEqual(simpan.main(["baru-ok", str(p)]), 0)
                self.assertTrue((tmp / "presets/baru-ok.json").exists())
                self.assertIn("baru-ok", (tmp / "presets/index.js").read_text())
                with self.assertRaises(SystemExit): simpan.main(["baru-ok", str(p)])          # tidak menimpa tanpa --timpa
                self.assertEqual(simpan.main(["baru-ok", str(p), "--varian", "light"]), 0)
                self.assertIn("light", json.loads((tmp / "presets/baru-ok.json").read_text())["varian"])
                p.write_text(json.dumps({"warnaaneh": 1}))
                with self.assertRaises(SystemExit): simpan.main(["lain", str(p)])
                with self.assertRaises(SystemExit): simpan.main(["Nama Salah", str(p)])
            finally:
                simpan.DIR = asli


class Mulai(unittest.TestCase):
    def jalan(self, jalur):
        tmp = Path(tempfile.mkdtemp()); self.addCleanup(shutil.rmtree, tmp, ignore_errors=True)
        r = subprocess.run(["bash", str(TK / "mulai.sh"), str(tmp / "p"), jalur], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        return tmp / "p"

    def test_remotion(self):
        p = self.jalan("remotion")
        for f in ("package.json", "remotion.config.ts", "src/Root.tsx", "src/Video.tsx", "src/tema.ts", "src/toolkit/kamera/Camera25D.tsx",
                  "src/toolkit/inti/curves.ts", "src/toolkit/inti/ae-primitives/transisi/SceneChain.tsx"):
            self.assertTrue((p / f).exists(), f)
        s = "".join(f.read_text() for f in (p / "src/toolkit").rglob("*.ts*"))
        self.assertNotRegex(s, r"from \"[^\"]*(scripts/remotion|\.\./\.\./toolkit/)")
        self.assertIn('"remotion": "4.0.380"', (p / "package.json").read_text())
        self.assertEqual(lint.lint(p / "src"), [])   # kerangka lolos gerbang sendiri

    def test_storyboard(self):
        p = self.jalan("storyboard")
        for f in ("frame.html", "tema.js", "toolkit/toolkit.js", "toolkit/esm/gerak/curves.js"):
            self.assertTrue((p / f).exists(), f)
        b = (p / "toolkit/toolkit.js").read_text()
        for nama in ("move", "CURVE", "cameraAt", "applyCamera25D", "lightWaveBg", "generativeBg", "applyGrain", "resolveOptions"):
            self.assertIn(nama, b)
        self.assertNotRegex(b, r"^(import|export)\s", "bundel klasik tanpa import/export")
        if shutil.which("node"):
            self.assertEqual(subprocess.run(["node", "--check", str(p / "toolkit/toolkit.js")], capture_output=True).returncode, 0)
        self.assertEqual(lint.lint(p), [])


class GerbangEasingSendiri(unittest.TestCase):
    def cek(self, nama, isi):
        with tempfile.TemporaryDirectory() as d:
            (Path(d) / nama).write_text(isi)
            return lint.lint(d)

    def test_menandai_easing_sendiri(self):
        for isi in ("const e = (t) => 1 - Math.pow(1 - t, 3);", "function land(t) { return t; }", "const heavy = (t) => t * t;", "const e = 1 - (1 - t) ** 3;"):
            self.assertEqual(len(self.cek("anim.js", isi)), 1, isi)
        self.assertEqual(len(self.cek("S.tsx", "const heavy = (t: number) => t * t;")), 1)
        self.assertEqual(len(self.cek("f.html", "<script>function reveal(t){return t}</script>")), 1)

    def test_lolos_bila_impor_toolkit_atau_motion_ok(self):
        self.assertEqual(self.cek("a.tsx", 'import { CURVE } from "./toolkit/gerak/curves";\nconst e = 1 - Math.pow(1 - t, 3);'), [])
        self.assertEqual(self.cek("a.js", 'import { move } from "./toolkit/esm/gerak/curves.js";\nfunction land(t){}'), [])
        self.assertEqual(self.cek("a.html", '<script src="toolkit/toolkit.js"></script><script>function whip(t){}</script>'), [])
        self.assertEqual(self.cek("a.js", "const e = 1 - Math.pow(1 - t, 3); // motion-ok: kurva fisika, bukan easing gerak"), [])

    def test_kode_toolkit_dikecualikan(self):
        with tempfile.TemporaryDirectory() as d:
            (Path(d) / "toolkit").mkdir(); (Path(d) / "toolkit/x.js").write_text("const heavy = 1;")
            self.assertEqual(lint.lint(d), [])


if __name__ == "__main__":
    unittest.main()
