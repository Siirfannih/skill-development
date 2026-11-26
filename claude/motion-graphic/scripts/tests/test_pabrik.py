#!/usr/bin/env python3
"""Uji pabrik primitif gerak: lint primitif (L1–L7) dan demo netral (D1–D3), analisis probe teks, klip referensi, registry v2.
Ekstraktor gerak dan skema spec-gerak diuji di test_pabrik_gerak.py. Butuh numpy, PIL, cv2, jsonschema."""
import json, re, sys, tempfile, unittest
from pathlib import Path

P = Path(__file__).resolve().parents[2] / "pabrik"
sys.path.insert(0, str(P))
try:
    import numpy as np, cv2
    from PIL import Image, ImageDraw
    import jsonschema
    import lint, metrik, daftar
    OK = True
except ImportError as e:  # pragma: no cover
    OK = False


@unittest.skipUnless(OK, "butuh numpy/PIL/cv2/jsonschema")
class TestLint(unittest.TestCase):
    BERSIH = 'import {useCurrentFrame} from "remotion"; import {z} from "zod"; import {move} from "../../../toolkit/gerak/curves";\n' \
             'export const XPropsSchema = z.object({});\nexport const X = ({children}: any) => <div style={{transform: "scale(1)", opacity: 1, clipPath: "inset(0)"}}>{children}</div>;'

    def test_ambil_json(self):
        import lib
        self.assertEqual(lib.ambil_json('teks ```json\n{"a": {"b": 1}}\n``` akhir'), {"a": {"b": 1}})
        self.assertEqual(lib.ambil_json('x {"a": "}"} y'), {"a": "}"})

    def test_l7_primitif_tidak_menggambar(self):
        for lit in ("const s = {background: p.bg};", "const s = {color: p.c};", "const s = {fontSize: 40};", "const s = {boxShadow: p.s};",
                    "const e = <svg />;", "const e = <rect />;", "const s = {borderRadius: 8};"):
            v = lint.lint_teks(self.BERSIH + "\n" + lit); self.assertTrue(any(x.startswith("L7") for x in v), lit)
        self.assertEqual(lint.lint_teks(self.BERSIH + "\nconst s = {filter: `blur(${b}px)`, transform: `translate(${x}px)`};"), [])

    def test_demo_netral(self):
        ok = 'import React from "react"; import {X} from "./X"; import {PanggungNetral, KataUji} from "../../demo-netral/Netral";\nexport const Demo = () => null;'
        self.assertEqual(lint.lint_demo(ok), [])
        self.assertTrue(any(x.startswith("D1") for x in lint.lint_demo(ok + '\nconst c = "#ff7a00";')))
        self.assertTrue(any(x.startswith("D2") for x in lint.lint_demo(ok + '\nimport w from "./wallpaper.jpg";')))
        self.assertTrue(any(x.startswith("D3") for x in lint.lint_demo(ok.replace("export const Demo", "const D"))))

    def test_kit_netral_dua_isian(self):
        src = (P / "demo-netral/Netral.tsx").read_text()
        a = src[src.index("A: {"):src.index("B: {")]; b = src[src.index("B: {"):src.index("};", src.index("B: {"))]
        for k in ("latar", "tinta", "huruf", "bentukWadah", "kata"):
            va, vb = (re.search(rf"{k}: ([^,\]]+)", x).group(1) for x in (a, b)); self.assertNotEqual(va, vb, k)

    def test_bersih(self):
        self.assertEqual(lint.lint_teks(self.BERSIH), [])

    def test_hex_rgb_hsl(self):
        for lit in ('"#fff"', '"#1a2b3c"', '"rgba(0,0,0,.5)"', '`hsl(10 50% 50%)`'):
            v = lint.lint_teks(self.BERSIH + f"\nconst c = {lit};"); self.assertTrue(any(x.startswith("L1") for x in v), lit)

    def test_hex_di_komentar_diabaikan(self):
        self.assertEqual(lint.lint_teks(self.BERSIH + "\n// warna #ff0000 contoh\n/* rgb(1,2,3) */"), [])

    def test_font_literal(self):
        v = lint.lint_teks(self.BERSIH + "\nconst f = 'font-family: Inter';"); self.assertTrue(any(x.startswith("L2") for x in v))

    def test_nama_warna(self):
        v = lint.lint_teks(self.BERSIH + "\nconst w = 'white';"); self.assertTrue(any(x.startswith("L3") for x in v))

    def test_tak_deterministik(self):
        for lit in ("Math.random()", "Date.now()", "new Date()", "requestAnimationFrame(f)", "performance.now()", "setTimeout(f,1)"):
            v = lint.lint_teks(self.BERSIH + f"\nconst r = {lit};"); self.assertTrue(any(x.startswith("L4") for x in v), lit)

    def test_impor_luar(self):
        v = lint.lint_teks(self.BERSIH + '\nimport x from "lodash";'); self.assertTrue(any(x.startswith("L5") for x in v))
        self.assertEqual(lint.lint_teks(self.BERSIH + '\nimport {Camera25D} from "../../../toolkit/kamera/Camera25D";'), [])

    def test_tanpa_skema(self):
        v = lint.lint_teks("export const X = () => null;"); self.assertTrue(any(x.startswith("L6") for x in v))


@unittest.skipUnless(OK, "butuh numpy/PIL/cv2/jsonschema")
class TestProbe(unittest.TestCase):
    def test_probe_teks_kecil_tabrakan_terpotong(self):
        it = [{"tag": "div", "teks": "kecil", "x": 10, "y": 10, "w": 100, "h": 12, "fs": 10, "op": 1},
              {"tag": "div", "teks": "besar", "x": 10, "y": 100, "w": 300, "h": 80, "fs": 60, "op": 1},
              {"tag": "div", "teks": "menimpa", "x": 20, "y": 120, "w": 200, "h": 60, "fs": 60, "op": 1},
              {"tag": "div", "teks": "keluar", "x": 1200, "y": 600, "w": 200, "h": 60, "fs": 60, "op": 1},
              {"tag": "div", "teks": "samar", "x": 0, "y": 300, "w": 100, "h": 12, "fs": 6, "op": 0.2}]
        r = metrik.analisis_probe(it, 1280, 720)
        self.assertEqual(len(r["kecil"]), 1); self.assertEqual(len(r["tabrakan"]), 1); self.assertEqual(len(r["terpotong"]), 1)
        tertutup = it[:3] + [dict(it[2], teks="tertutup", vis=False, x=12, y=12)]
        self.assertEqual(len(metrik.analisis_probe(tertutup, 1280, 720)["tabrakan"]), 1)  # teks tertutup layer lain tidak dihitung
        self.assertEqual(metrik.analisis_probe(it[1:2], 1280, 720), {"kecil": [], "tabrakan": [], "terpotong": []})
        bg = {"tag": "svg", "teks": "", "x": 0, "y": 0, "w": 1280, "h": 720, "fs": 0, "op": 1}; kecil = dict(bg, w=200, h=150, x=10, y=100)
        self.assertEqual(metrik.analisis_probe([it[1], bg], 1280, 720)["tabrakan"], [])  # teks di atas latar/footage penuh bukan tabrakan
        self.assertEqual(len(metrik.analisis_probe([it[1], kecil], 1280, 720)["tabrakan"]), 1)
        r = metrik.analisis_probe([{"tag": "div", "teks": "p", "x": 0, "y": 0, "w": 50, "h": 20, "fs": 20, "op": 1}], 720, 1280)  # portrait 720 -> 1080 skala 1,5: 30px
        self.assertEqual(r["kecil"], [])


    def test_oklusi_j_dan_o(self):
        pf = {5: [{"teks": "aman", "op": 1, "tutup": 0.0, "tutup_objek": 0.0},
                  {"teks": "tertutup grid", "op": 1, "tutup": 0.4, "tutup_objek": 0.4},
                  {"teks": "tipis", "op": 1, "tutup": 0.05, "tutup_objek": 0.05},
                  {"teks": "luar wadah", "op": 1, "tutup": 0, "tutup_objek": 0, "wadah_keluar": True},
                  {"teks": "samar", "op": 0.2, "tutup": 0.9, "tutup_objek": 0.9}]}
        r = metrik.analisis_oklusi(pf)
        self.assertEqual(len(r["j"]), 2)            # tertutup > 10 % dan keluar wadah; 5 % dan teks samar tidak
        self.assertEqual(len(r["o"]), 2)            # lapisan non-teks >= 2 % (grid 40 %, tipis 5 %)
        self.assertEqual(metrik.analisis_oklusi({1: [{"teks": "x", "op": 1}]}), {"j": [], "o": []})

@unittest.skipUnless(OK, "butuh numpy/PIL/cv2/jsonschema")
class TestReferensiSelaras(unittest.TestCase):
    def test_waktu_normalisasi_durasi(self):
        import lib, tempfile
        with tempfile.NamedTemporaryFile(suffix=".mp4") as f:
            sp = {"sumber": {"klip": {"path": f.name, "dari": 12.4, "sampai": 16.0}}}
            self.assertAlmostEqual(lib.waktu_referensi(sp, 0.0), 12.4); self.assertAlmostEqual(lib.waktu_referensi(sp, 0.5), 14.2)
            self.assertAlmostEqual(lib.waktu_referensi(sp, 2.0), 16.0)               # dijepit
            self.assertIsNotNone(lib.spec_klip(sp))
        self.assertIsNone(lib.spec_klip({"sumber": {"klip": {"path": "/tidak/ada.mp4", "dari": 0, "sampai": 1}}}))
        self.assertIsNone(lib.spec_klip({"sumber": {"statis": True}}))

@unittest.skipUnless(OK, "butuh numpy/PIL/cv2/jsonschema")
class TestRegistry(unittest.TestCase):
    def test_skema_props(self):
        src = 'export const AbcPropsSchema = z.object({\n  a: z.number(),\n  b: z.object({c: z.string()}),\n});\nexport const Abc = () => null;'
        t = daftar.skema_props(src, "Abc"); self.assertTrue(t.startswith("z.object(") and t.endswith("})") and "z.string()" in t)
        self.assertIsNone(daftar.skema_props("const x=1", "Abc"))

    def test_simpan_ganti_dan_urut(self):
        with tempfile.TemporaryDirectory() as d:
            path = Path(d) / "registry.json"
            for n, st in (("tipografi-b-c", "teruji"), ("kamera-a-b", "ditolak"), ("tipografi-b-c", "teruji-sebagian")):
                daftar.simpan_entri({"id": n, "status": st}, reg=json.loads(path.read_text()) if path.exists() else {"versi": 3, "primitif": []}, path=path)
            r = json.loads(path.read_text())
            self.assertEqual([x["id"] for x in r["primitif"]], ["kamera-a-b", "tipografi-b-c"]); self.assertEqual(r["primitif"][1]["status"], "teruji-sebagian")

    def test_registry_repo_valid(self):
        p = P / "registry.json"
        if not p.exists(): self.skipTest("registry belum ada")
        r = json.loads(p.read_text()); self.assertEqual(r["versi"], 3)
        for e in r["primitif"]:
            self.assertIn(e["status"], ("teruji", "teruji-sebagian", "ditolak"))
            for k in ("id", "komponen", "kategori", "mekanik", "pemicu", "alasan_bekerja", "slot", "jangan_dicuri", "spec", "props_schema", "metrik_transfer", "dosa", "tanggal"):
                self.assertIn(k, e)
            self.assertEqual(set(e["metrik_transfer"]), {"A", "B"})
            self.assertFalse({"ssim", "struktur", "flipbook"} & set(json.dumps(e).replace('"', " ").split()))
            if e["status"] == "ditolak": self.assertTrue(e.get("alasan"))

if __name__ == "__main__":
    unittest.main()
