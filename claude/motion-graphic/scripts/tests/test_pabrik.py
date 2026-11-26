#!/usr/bin/env python3
"""Uji pabrik primitif: skema spec, lint props, metrik (fixture kecil), analisis probe, registry. Butuh numpy, PIL, cv2, jsonschema."""
import json, sys, tempfile, unittest
from pathlib import Path

P = Path(__file__).resolve().parents[2] / "pabrik"
sys.path.insert(0, str(P))
try:
    import numpy as np, cv2
    from PIL import Image, ImageDraw
    import jsonschema
    import lint, metrik, daftar
    import ekstrak
    OK = True
except ImportError as e:  # pragma: no cover
    OK = False


def spec_ok(kategori="tipografi"):
    par = {
        "tipografi": {"hierarki": [{"peran": "dasar", "tinggi_rel": 0.08}], "tracking_em": 0.0, "unit": "kata", "pola_masuk": "naik", "pola_keluar": "fade"},
        "gerak_kamera": {"kurva": {"tipe": "cubic-bezier", "bezier": [0.4, 0, 0.2, 1]}, "durasi_detik": 1.0, "transisi": "zoom",
                         "lintasan": [{"t": 0, "x": 0, "y": 0, "skala": 1}, {"t": 1, "x": 0.1, "y": 0, "skala": 1.5}]},
        "permukaan_ui": {"radius": 0.2, "border": {"lebar": 0.002, "opasitas": 0.3}, "blur": 0.0, "bayangan": {"offset_x": 0, "offset_y": 0.01, "blur": 0.02, "opasitas": 0.3}},
        "atmosfer": {"tipe": "gradien", "palet": [{"peran": "latar", "luma": 0.2, "saturasi": 0.5}], "arah_cahaya_derajat": None, "kecepatan": 0.1, "grain": 0.05},
    }[kategori]
    return {"id": "99-T1", "kartu": "99", "teknik": "T1", "kategori": kategori, "komponen_usulan": "Contoh", "ringkas": "Ringkasan contoh yang cukup panjang.",
            "terukur": {"dari_klip": False, "catatan": "x"}, "parameter": par, "mekanik": ["aturan gerak yang dipindahkan"], "kulit": ["warna"],
            "bukti": [{"frame": "guide/x.jpg", "t": None}]}


@unittest.skipUnless(OK, "butuh numpy/PIL/cv2/jsonschema")
class TestSkema(unittest.TestCase):
    def test_valid_semua_kategori(self):
        for k in ("tipografi", "gerak_kamera", "permukaan_ui", "atmosfer"):
            self.assertEqual(ekstrak.validasi(spec_ok(k)), [], k)

    def test_kategori_salah_ditolak(self):
        s = spec_ok(); s["kategori"] = "warna"
        self.assertTrue(ekstrak.validasi(s))

    def test_parameter_kategori_lain_ditolak(self):
        s = spec_ok("tipografi"); s["parameter"] = spec_ok("gerak_kamera")["parameter"]
        self.assertTrue(ekstrak.validasi(s))

    def test_wajib_mekanik_kulit_bukti(self):
        for k in ("mekanik", "kulit", "bukti"):
            s = spec_ok(); del s[k]; self.assertTrue(ekstrak.validasi(s), k)
        s = spec_ok(); s["bukti"] = []; self.assertTrue(ekstrak.validasi(s))

    def test_spring_butuh_parameter(self):
        s = spec_ok("gerak_kamera"); s["parameter"]["kurva"] = {"tipe": "spring"}
        self.assertTrue(ekstrak.validasi(s))
        s["parameter"]["kurva"] = {"tipe": "spring", "spring": {"stiffness": 100, "damping": 10, "mass": 1}}
        self.assertEqual(ekstrak.validasi(s), [])

    def test_properti_asing_ditolak(self):
        s = spec_ok(); s["warna_hex"] = "#fff"; self.assertTrue(ekstrak.validasi(s))

    def test_ambil_json(self):
        import lib
        self.assertEqual(lib.ambil_json('teks ```json\n{"a": {"b": 1}}\n``` akhir'), {"a": {"b": 1}})
        self.assertEqual(lib.ambil_json('x {"a": "}"} y'), {"a": "}"})


@unittest.skipUnless(OK, "butuh numpy/PIL/cv2/jsonschema")
class TestLint(unittest.TestCase):
    BERSIH = 'import {useCurrentFrame} from "remotion"; import {z} from "zod"; import {move} from "../../../toolkit/gerak/curves";\n' \
             'export const XPropsSchema = z.object({tokens: z.object({latar: z.string()})});\nexport const X = ({tokens}: any) => <div style={{background: tokens.latar, fontFamily: tokens.huruf}} />;'

    def test_bersih(self):
        self.assertEqual(lint.lint_teks(self.BERSIH), [])

    def test_hex_rgb_hsl(self):
        for lit in ('"#fff"', '"#1a2b3c"', '"rgba(0,0,0,.5)"', '`hsl(10 50% 50%)`'):
            v = lint.lint_teks(self.BERSIH + f"\nconst c = {lit};"); self.assertTrue(any(x.startswith("L1") for x in v), lit)

    def test_hex_di_komentar_diabaikan(self):
        self.assertEqual(lint.lint_teks(self.BERSIH + "\n// warna #ff0000 contoh\n/* rgb(1,2,3) */"), [])

    def test_font_literal(self):
        v = lint.lint_teks(self.BERSIH + "\nconst s = {fontFamily: 'Inter'};"); self.assertTrue(any(x.startswith("L2") for x in v))

    def test_nama_warna(self):
        v = lint.lint_teks(self.BERSIH + "\nconst s = {color: 'white'};"); self.assertTrue(any(x.startswith("L3") for x in v))

    def test_tak_deterministik(self):
        for lit in ("Math.random()", "Date.now()", "new Date()", "requestAnimationFrame(f)", "performance.now()", "setTimeout(f,1)"):
            v = lint.lint_teks(self.BERSIH + f"\nconst r = {lit};"); self.assertTrue(any(x.startswith("L4") for x in v), lit)

    def test_impor_luar(self):
        v = lint.lint_teks(self.BERSIH + '\nimport x from "lodash";'); self.assertTrue(any(x.startswith("L5") for x in v))
        self.assertEqual(lint.lint_teks(self.BERSIH + '\nimport {Camera25D} from "../../../toolkit/kamera/Camera25D";'), [])

    def test_tanpa_skema(self):
        v = lint.lint_teks("export const X = () => null;"); self.assertTrue(any(x.startswith("L6") for x in v))


def _gambar(draw_fn, size=(320, 180), bg=(240, 230, 210)):
    im = Image.new("RGB", size, bg); draw_fn(ImageDraw.Draw(im)); return im


@unittest.skipUnless(OK, "butuh numpy/PIL/cv2/jsonschema")
class TestMetrik(unittest.TestCase):
    def setUp(self):
        self.a = _gambar(lambda d: (d.rectangle([40, 30, 200, 110], fill=(20, 40, 90)), d.ellipse([220, 100, 290, 160], fill=(200, 60, 40))))
        self.b = _gambar(lambda d: (d.rectangle([10, 120, 60, 170], fill=(20, 40, 90)), d.line([0, 0, 320, 180], fill=(0, 0, 0), width=4)))

    def test_struktur_sama_walau_warna_beda(self):
        rgb_swap = Image.fromarray(np.asarray(self.a)[..., ::-1].copy())
        self.assertGreater(metrik.struktur(self.a, rgb_swap)["skor"], 0.8)

    def test_struktur_beda_rendah(self):
        self.assertLess(metrik.struktur(self.a, self.b)["skor"], 0.5)

    def test_dua_token(self):
        swap = Image.fromarray(np.asarray(self.a)[..., ::-1].copy())
        r = metrik.dua_token(self.a, swap)
        self.assertGreater(r["edge_struktur"], 0.8); self.assertGreater(r["selisih_piksel"], 12)
        same = metrik.dua_token(self.a, self.a); self.assertLess(same["selisih_piksel"], 0.5)

    def test_dua_token_polaritas_terbalik_dan_tak_berhubungan(self):
        gelap = _gambar(lambda d: (d.rectangle([40, 30, 200, 110], fill=(240, 240, 250)), d.ellipse([220, 100, 290, 160], fill=(255, 190, 60))), bg=(16, 28, 70))
        self.assertGreater(metrik.dua_token(self.a, gelap)["edge_struktur"], 0.8)   # terang vs gelap, bentuk sama
        self.assertLess(metrik.dua_token(self.a, self.b)["edge_struktur"], 0.7)     # bentuk beda

    def test_kurva_bezier_monoton(self):
        f = metrik.kurva({"tipe": "cubic-bezier", "bezier": [0.4, 0, 0.2, 1]})
        v = [f(x) for x in np.linspace(0, 1, 11)]
        self.assertAlmostEqual(v[0], 0, 3); self.assertAlmostEqual(v[-1], 1, 3); self.assertTrue(all(b >= a - 1e-9 for a, b in zip(v, v[1:])))

    def _urutan(self, kurva, n=40, mulai=5, panjang=20, diam=False):
        f = metrik.kurva(kurva); frames = []
        for i in range(n):
            p = 0 if diam else f(min(max((i - mulai) / panjang, 0), 1))
            x = int(30 + 200 * p); frames.append(_gambar(lambda d: d.rectangle([x, 60, x + 60, 120], fill=(10, 10, 10)), bg=(250, 250, 250)))
        return frames

    def test_lintasan_cocok_kurva(self):
        kv = {"tipe": "cubic-bezier", "bezier": [0.4, 0, 0.2, 1]}
        prog, rentang = metrik.progres(metrik.lintasan(self._urutan(kv)))
        g = metrik.bandingkan_gerak(prog, 30, {"kurva": kv, "durasi_detik": 20 / 30}, rentang=rentang)
        self.assertLess(g["rms"], 0.08); self.assertTrue(0.7 < g["rasio_durasi"] < 1.4)

    def test_lintasan_kurva_salah_error_besar(self):
        prog, rentang = metrik.progres(metrik.lintasan(self._urutan({"tipe": "cubic-bezier", "bezier": [0.9, 0, 0.95, 0.2]})))
        g = metrik.bandingkan_gerak(prog, 30, {"kurva": {"tipe": "cubic-bezier", "bezier": [0.05, 0.9, 0.1, 1]}, "durasi_detik": 0.66}, rentang=rentang)
        self.assertGreater(g["rms"], 0.15)

    def test_gerak_dua_segmen(self):
        kv = {"tipe": "cubic-bezier", "bezier": [0.4, 0, 0.2, 1]}; f = metrik.kurva(kv)
        p = lambda i: 0 if i < 5 else f((i - 5) / 20) if i <= 25 else 1 if i < 45 else 1 - 0.7 * f((i - 45) / 15) if i <= 60 else 0.3
        g = metrik.bandingkan_gerak(np.array([p(i) for i in range(80)]), 30, {"kurva": kv, "durasi_detik": 20 / 30})
        self.assertEqual(g["n_segmen"], 2); self.assertLess(g["rms"], 0.12)

    def test_kamera_diam_none(self):
        prog, rentang = metrik.progres(metrik.lintasan(self._urutan({"tipe": "cubic-bezier", "bezier": [0, 0, 1, 1]}, diam=True)))
        self.assertIsNone(metrik.bandingkan_gerak(prog, 30, {"kurva": {"tipe": "cubic-bezier", "bezier": [0, 0, 1, 1]}, "durasi_detik": 1}, rentang=rentang))

    def test_palet_dalam_dan_luar(self):
        im = _gambar(lambda d: d.rectangle([0, 0, 120, 90], fill=(255, 0, 0)), bg=(16, 32, 48))
        self.assertFalse(metrik.palet_dosa(im, ["#102030", "#ff0000"])["dosa"])
        r = metrik.palet_dosa(im, ["#102030", "#f0e0d0"]); self.assertTrue(r["dosa"]); self.assertEqual(r["warna_dominan"], "#ff0000")

    def test_palet_abaikan_antialias_dan_campuran(self):
        im = _gambar(lambda d: d.line([0, 0, 320, 180], fill=(128, 16, 24), width=1), bg=(16, 32, 48))  # garis tipis warna antara
        self.assertFalse(metrik.palet_dosa(im, ["#102030", "#ff0000"])["dosa"])
        grad = Image.fromarray(np.tile(np.linspace([16, 32, 48], [240, 224, 208], 320).astype("uint8"), (180, 1, 1)))
        self.assertFalse(metrik.palet_dosa(grad, ["#102030", "#f0e0d0"])["dosa"])  # gradasi antar warna palet sah

    def test_de2000_nol_dan_besar(self):
        L = metrik._lab([(10, 20, 30), (255, 0, 0)])
        self.assertAlmostEqual(float(metrik.de2000(L[0], L[0])), 0, 3); self.assertGreater(float(metrik.de2000(L[0], L[1])), 40)

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


@unittest.skipUnless(OK, "butuh numpy/PIL/cv2/jsonschema")
class TestDosaBaru(unittest.TestCase):
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

    def test_teks_tak_terlihat(self):
        a = _gambar(lambda d: d.text((10, 10), "HALO DUNIA", fill=(0, 0, 0)), bg=(255, 255, 255))
        kosong = _gambar(lambda d: None, bg=(255, 255, 255))
        frac, hilang = metrik.teks_tak_terlihat(a, kosong, 1)
        self.assertGreater(frac, 0.001); self.assertFalse(hilang)
        frac, hilang = metrik.teks_tak_terlihat(kosong, kosong, 1)
        self.assertTrue(hilang); self.assertFalse(metrik.teks_tak_terlihat(kosong, kosong, 0)[1])

    def test_ruang_negatif_dan_grain(self):
        polos = Image.new("RGB", (320, 180), (246, 245, 252))
        self.assertGreater(metrik.ruang_negatif(polos, "#F6F5FC"), 0.99)
        ramai = _gambar(lambda d: d.rectangle([0, 0, 320, 120], fill=(200, 60, 40)), bg=(246, 245, 252))
        self.assertLess(metrik.ruang_negatif(ramai, "#F6F5FC"), 0.5)
        rng = np.random.default_rng(1)
        halus = Image.fromarray(np.clip(246 + rng.normal(0, 1, (180, 320, 3)), 0, 255).astype("uint8"))
        kasar = Image.fromarray(np.clip(246 + rng.normal(0, 12, (180, 320, 3)), 0, 255).astype("uint8"))
        self.assertLess(metrik.grain_estimasi(halus), 0.02); self.assertGreater(metrik.grain_estimasi(kasar), 0.02)

    def test_kulit_bocor(self):
        senja = _gambar(lambda d: d.rectangle([0, 0, 160, 120], fill=(221, 130, 98)), bg=(246, 245, 252))
        pal = ["#F6F5FC", "#0E1426"]
        self.assertTrue(metrik.luar_palet_dekat(senja, pal, ["#DD8262"])["dosa"])
        self.assertFalse(metrik.luar_palet_dekat(senja, pal, ["#1887E6"])["dosa"])       # luar palet tetapi bukan warna referensi: bukan (p)
        self.assertFalse(metrik.luar_palet_dekat(_gambar(lambda d: None, bg=(246, 245, 252)), pal, ["#F6F5FC"])["dosa"])  # warna palet = bukan bocor


@unittest.skipUnless(OK, "butuh numpy/PIL/cv2/jsonschema")
class TestReferensiSelaras(unittest.TestCase):
    def test_waktu_normalisasi_durasi(self):
        import lib, tempfile
        with tempfile.NamedTemporaryFile(suffix=".mp4") as f:
            sp = {"terukur": {"klip": {"path": f.name, "dari": 12.4, "sampai": 16.0}}}
            self.assertAlmostEqual(lib.waktu_referensi(sp, 0.0), 12.4); self.assertAlmostEqual(lib.waktu_referensi(sp, 0.5), 14.2)
            self.assertAlmostEqual(lib.waktu_referensi(sp, 2.0), 16.0)               # dijepit
            self.assertIsNotNone(lib.spec_klip(sp))
        self.assertIsNone(lib.spec_klip({"terukur": {"klip": {"path": "/tidak/ada.mp4", "dari": 0, "sampai": 1}}}))
        self.assertIsNone(lib.spec_klip({"terukur": {"dari_klip": False}}))

    def test_token_netral_enam_peran_dan_palet_json(self):
        import lib
        for k in ("A", "B"):
            self.assertEqual(len(lib.palet_token(k)), 6)
            j = lib.palet_json(k); self.assertEqual(len(j["hex_semua"]), 6); self.assertIn(lib.TOKENS[k]["mode"], j["mode"])
        self.assertNotEqual(lib.palet_token("A"), lib.palet_token("B"))

    def test_kontrak_demo_menolak_hex_liar(self):
        import sintesis, lib
        d = lib.PABRIK / "kandidat" / "_UjiKontrak"; d.mkdir(parents=True, exist_ok=True)
        try:
            (d / "_UjiKontrak.tsx").write_text('import {z} from "zod"; export const _UjiKontrakPropsSchema = z.object({}); export const _UjiKontrak = () => null;')
            demo = "export const DemoA = () => null; export const DemoB = () => null; " + " ".join(lib.palet_token("A") + lib.palet_token("B")) + " #dd8262"
            (d / "Demo.tsx").write_text(demo)
            meta = {"palet": {"A": lib.palet_token("A"), "B": lib.palet_token("B")}, "fungsi": "x", "width": 1, "height": 1, "fps": 30, "durasi": 3, "stills": [0], "urutan": {"dari": 0, "sampai": 2}}
            (d / "meta.json").write_text(json.dumps(meta))
            g = sintesis.cek("_UjiKontrak")
            self.assertTrue(any("di luar set token netral" in x for x in g), g)
            meta["palet"]["A"] = ["#123456"] * 6; (d / "meta.json").write_text(json.dumps(meta))
            self.assertTrue(any("harus persis set token" in x for x in sintesis.cek("_UjiKontrak")))
        finally:
            import shutil; shutil.rmtree(d, ignore_errors=True)


@unittest.skipUnless(OK, "butuh numpy/PIL/cv2/jsonschema")
class TestRegistry(unittest.TestCase):
    def test_skema_props(self):
        src = 'export const AbcPropsSchema = z.object({\n  a: z.number(),\n  b: z.object({c: z.string()}),\n});\nexport const Abc = () => null;'
        t = daftar.skema_props(src, "Abc"); self.assertTrue(t.startswith("z.object(") and t.endswith("})") and "z.string()" in t)
        self.assertIsNone(daftar.skema_props("const x=1", "Abc"))

    def test_simpan_ganti_dan_urut(self):
        with tempfile.TemporaryDirectory() as d:
            path = Path(d) / "registry.json"
            for n, st in (("B", "teruji"), ("A", "ditolak"), ("B", "teruji-sebagian")):
                daftar.simpan_entri({"nama": n, "status": st}, reg=json.loads(path.read_text()) if path.exists() else {"versi": 1, "komponen": []}, path=path)
            r = json.loads(path.read_text())
            self.assertEqual([x["nama"] for x in r["komponen"]], ["A", "B"]); self.assertEqual(r["komponen"][1]["status"], "teruji-sebagian")

    def test_registry_repo_valid(self):
        p = P / "registry.json"
        if not p.exists(): self.skipTest("registry belum ada")
        r = json.loads(p.read_text()); self.assertEqual(r["versi"], 1)
        for e in r["komponen"]:
            self.assertIn(e["status"], ("teruji", "teruji-sebagian", "ditolak"))
            for k in ("nama", "fungsi", "kartu_sumber", "kategori", "props_schema", "demo_stills", "metrik_akhir", "tanggal"): self.assertIn(k, e)
            if e["status"] == "ditolak": self.assertTrue(e.get("alasan"))


if __name__ == "__main__":
    unittest.main()
