#!/usr/bin/env python3
"""pilih_kartu.py: parse tabel INDEX.md, pencarian berskor, saringan kategori/bergerak, limit, kolom keyframes, kode keluar."""
import importlib.util, subprocess, sys, tempfile, unittest
from pathlib import Path

S = Path(__file__).resolve().parents[1]
SKRIP = S / "cookbook/pilih_kartu.py"
spec = importlib.util.spec_from_file_location("pilih_kartu", SKRIP); pk = importlib.util.module_from_spec(spec); spec.loader.exec_module(pk)

CONTOH = """# Cookbook · INDEX

## Cara pakai

1. Teks pembuka yang bukan tabel.

| Bukan | Tabel kartu |
|---|---|
| a | b |

| ID | Pola | Narrative trigger | Kategori | Status | Path |
|---|---|---|---|---|---|
| 14 | Tile-Grid Cut Wipe | pindah antar demo dengan sentakan kecil; kata isi di… | camera (typography, layout) | bergerak:tidak · diukur:ya | 01-camera/14-tile-grid-cut-wipe.md |
| 63 | Virtual Camera Desktop Stage | demo fitur produk tanpa pembicara; urutan aksi klik lalu hasil muncul | camera (layout, typography) | bergerak:ya · diukur:ya | 01-camera/63-virtual-camera-desktop-stage.md |
| 65 | Camera Dive Into UI | demo fitur atau konsep aplikasi dengan titik masuk kecil | camera (layout, typography) | bergerak:sebagian · diukur:ya | 01-camera/65-camera-dive-into-ui.md |
| 67 | Morphing Card Number Counter | pengumuman angka atau milestone tanpa narator | typography (layout, sfx) | bergerak:tidak · diukur:tidak | 02-typography/67-morphing-card-number-counter.md |
| 93 | Change-Marked Sound Hierarchy | bunyi hanya di perubahan keadaan; demo produk yang butuh klik | sfx | bergerak:ya · diukur:ya | 05-sfx/93-change-marked-sound-hierarchy.md |
| S01 | Hook Angka Lalu Bongkar | hook yang membuka dengan angka lalu membongkar caranya | script (typography) | bergerak:ya · diukur:ya | 06-script/S01-hook-angka.md |

Catatan setelah tabel.

| ID | Pola | Narrative trigger | Kategori | Status | Path |
|---|---|---|---|---|---|
| 99 | Tabel Kedua Tidak Dibaca | demo | camera | bergerak:ya · diukur:ya | x/99.md |
"""


class Dasar(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name)
        self.index = self.d / "cookbook/INDEX.md"; self.index.parent.mkdir()
        self.index.write_text(CONTOH, encoding="utf-8")
        self.kf = self.d / "keyframes"; self.kf.mkdir()
        for n in ("63-k1-meja.jpg", "63-k2-klik.jpg", "65-k1-ikon.jpg", "6-k1-bukan.jpg", "630-k1-bukan.jpg"):
            (self.kf / n).write_bytes(b"x")
        self.kartu = pk.baca_index(self.index)

    def tearDown(self): self.t.cleanup()

    def ids(self, **k): return [x["id"] for x in pk.pilih(self.kartu, **k)]

    def cli(self, *a):
        return subprocess.run([sys.executable, str(SKRIP), "--index", str(self.index), "--keyframes", str(self.kf), *a], capture_output=True, text=True)


class Parse(Dasar):
    def test_hanya_tabel_kartu_pertama_dibaca(self):
        self.assertEqual([k["id"] for k in self.kartu], ["14", "63", "65", "67", "93", "S01"])

    def test_kolom_terisi(self):
        k = self.kartu[0]
        self.assertEqual(k["nama"], "Tile-Grid Cut Wipe"); self.assertEqual(k["path"], "01-camera/14-tile-grid-cut-wipe.md")
        self.assertEqual((k["utama"], k["tambahan"]), ("camera", ["typography", "layout"]))
        self.assertEqual((k["bergerak"], k["diukur"]), ("tidak", "ya"))
        self.assertEqual((self.kartu[4]["utama"], self.kartu[4]["tambahan"]), ("sfx", []))
        self.assertEqual((self.kartu[3]["bergerak"], self.kartu[3]["diukur"]), ("tidak", "tidak"))
        self.assertEqual(self.kartu[2]["bergerak"], "sebagian")

    def test_urutan_kolom_diambil_dari_judul(self):
        self.index.write_text("| Path | Status | Kategori | Narrative trigger | Pola | ID |\n|---|---|---|---|---|---|\n"
                              "| a/07-x.md | bergerak:ya · diukur:tidak | layout | angka mendarat | Nama Pola | 07 |\n", encoding="utf-8")
        k = pk.baca_index(self.index)[0]
        self.assertEqual((k["id"], k["nama"], k["path"], k["utama"], k["bergerak"], k["diukur"]), ("07", "Nama Pola", "a/07-x.md", "layout", "ya", "tidak"))

    def test_index_rusak_gagal(self):
        for isi in ("# tanpa tabel\n", "| ID | Pola |\n|---|---|\n| 1 | x |\n", "| ID | Pola | Narrative trigger | Kategori | Status | Path |\n|---|---|---|---|---|---|\n"):
            self.index.write_text(isi, encoding="utf-8")
            with self.assertRaises(pk.Gagal):
                pk.baca_index(self.index)
        self.index.write_text(CONTOH.replace("| sfx | bergerak:ya · diukur:ya | 05-sfx", "| sfx | 05-sfx"), encoding="utf-8")
        with self.assertRaises(pk.Gagal):
            pk.baca_index(self.index)
        with self.assertRaises(pk.Gagal):
            pk.baca_index(self.d / "tidak-ada.md")


class Cari(Dasar):
    def test_kata_kunci_dipisah_spasi_dan_dibersihkan(self):
        self.assertEqual(pk.kata_kunci("Demo  FITUR, yang di UI demo"), ["demo", "fitur"])
        self.assertEqual(pk.kata_kunci("di ke"), [])

    def test_lebih_banyak_kata_cocok_menang(self):
        self.assertEqual(self.ids(cari="demo fitur produk"), ["63", "65", "93", "14"])

    def test_nama_pola_berbobot_lebih_dari_trigger(self):
        self.assertEqual(self.ids(cari="angka")[:1], ["S01"])
        self.assertEqual(self.ids(cari="camera")[:2], ["63", "65"])

    def test_seri_mengikuti_urutan_index(self):
        self.assertEqual(self.ids(cari="tanpa"), ["63", "67"])

    def test_cocok_di_kategori(self):
        self.assertIn("93", self.ids(cari="sfx")); self.assertIn("67", self.ids(cari="sfx"))

    def test_tidak_beda_huruf_besar(self):
        self.assertEqual(self.ids(cari="MORPHING"), ["67"])

    def test_tidak_cocok_tidak_ditampilkan(self):
        self.assertEqual(self.ids(cari="xyzzy"), [])
        self.assertNotIn("67", self.ids(cari="demo"))

    def test_cari_tanpa_kata_berarti_gagal(self):
        with self.assertRaises(pk.Gagal):
            pk.pilih(self.kartu, cari="di ke")

    def test_tanpa_cari_urutan_index(self):
        self.assertEqual(self.ids(limit=3), ["14", "63", "65"])


class Saring(Dasar):
    def test_kategori_utama_dan_tambahan(self):
        self.assertEqual(self.ids(kategori="camera", limit=9), ["14", "63", "65"])
        self.assertEqual(self.ids(kategori="sfx", limit=9), ["93", "67"])
        self.assertEqual(self.ids(kategori="typography", limit=9), ["67", "14", "63", "65", "S01"])
        self.assertEqual(self.ids(kategori="texture", limit=9), [])

    def test_bergerak_hanya_ya(self):
        self.assertEqual(self.ids(bergerak=True, limit=9), ["63", "93", "S01"])
        self.assertEqual(self.ids(cari="demo", bergerak=True), ["63", "93"])

    def test_gabungan_saringan(self):
        self.assertEqual(self.ids(cari="demo", kategori="camera", bergerak=True), ["63"])

    def test_limit(self):
        self.assertEqual(len(self.ids(limit=2)), 2); self.assertEqual(len(self.ids()), 4); self.assertEqual(len(self.ids(limit=99)), 6)


class Keluaran(Dasar):
    def test_tabel_dan_keyframes(self):
        r = self.cli("--cari", "demo fitur", "--limit", "2"); self.assertEqual(r.returncode, 0, r.stderr)
        b = r.stdout.strip().splitlines()
        self.assertEqual(b[0], "| ID | Nama | Bergerak/Diukur | Path kartu | Keyframes |"); self.assertEqual(len(b), 4)
        self.assertEqual([x.strip() for x in b[2].strip("|").split("|")][:3], ["63", "Virtual Camera Desktop Stage", "ya/ya"])
        self.assertIn(str(self.index.parent / "01-camera/63-virtual-camera-desktop-stage.md"), b[2])
        self.assertIn(f"2 file: {self.kf}/63-*", b[2])
        self.assertIn("sebagian/ya", b[3]); self.assertIn(f"1 file: {self.kf}/65-*", b[3])

    def test_tanpa_keyframes_bertanda_strip(self):
        r = self.cli("--kategori", "script"); self.assertEqual(r.returncode, 0)
        self.assertTrue(r.stdout.strip().splitlines()[2].rstrip().endswith("| - |"))
        self.assertEqual(pk.keyframes("63", self.d / "tidak-ada"), "-")

    def test_limit_bawaan_empat(self):
        self.assertEqual(len(self.cli().stdout.strip().splitlines()), 2 + 4)

    def test_kode_keluar(self):
        r = self.cli("--cari", "xyzzy"); self.assertEqual(r.returncode, 1); self.assertEqual(r.stdout, ""); self.assertIn("Tidak ada kartu", r.stderr)
        self.assertEqual(self.cli("--cari", "di").returncode, 2)
        self.assertEqual(self.cli("--limit", "0").returncode, 2)
        self.assertEqual(self.cli("--kategori", "gaya").returncode, 2)
        self.index.write_text("kosong\n"); r = self.cli(); self.assertEqual(r.returncode, 2); self.assertIn("GAGAL", r.stderr)


class IndexAsli(unittest.TestCase):
    """INDEX.md repo terbaca utuh: jumlah kartu sama dengan baris tabel, semua path dan status dikenali."""

    def setUp(self): self.kartu = pk.baca_index()

    def test_semua_baris_terbaca(self):
        baris = [b for b in pk.INDEX.read_text(encoding="utf-8").splitlines() if b.startswith("| ") and b.rstrip().endswith(".md |")]
        self.assertEqual(len(self.kartu), len(baris)); self.assertGreater(len(self.kartu), 50)
        self.assertEqual(len({k["id"] for k in self.kartu}), len(self.kartu))

    def test_path_kategori_status_sah(self):
        for k in self.kartu:
            self.assertTrue((pk.INDEX.parent / k["path"]).is_file(), k["path"])
            self.assertIn(k["utama"], pk.KATEGORI, k["id"]); self.assertTrue(set(k["tambahan"]) <= set(pk.KATEGORI), k["id"])
            self.assertIn(k["bergerak"], ("ya", "sebagian", "tidak"), k["id"]); self.assertIn(k["diukur"], ("ya", "tidak"), k["id"])

    def test_cli_pada_index_asli(self):
        r = subprocess.run([sys.executable, str(SKRIP), "--cari", "demo fitur produk", "--bergerak"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        b = r.stdout.strip().splitlines(); self.assertTrue(3 <= len(b) <= 6)
        for x in b[2:]:
            s = [c.strip() for c in x.strip("|").split("|")]
            self.assertTrue(s[2].startswith("ya/")); self.assertTrue(s[3].startswith("claude/motion-graphic/cookbook/"))
            self.assertTrue((S.parents[2] / s[3]).is_file(), s[3])
            self.assertTrue(s[4] == "-" or "claude/motion-graphic/guide/referensi/sheets/keyframes/" in s[4])

    def test_kartu_motion_graphic_dan_flash_grid_bergerak(self):
        id_map = {k["id"]: k for k in self.kartu}
        for cid in ("14", "17", "88", "95"):
            self.assertIn(cid, id_map)
            self.assertEqual(id_map[cid]["bergerak"], "ya", cid)
        res_cutout = [k["id"] for k in pk.pilih(self.kartu, cari="cutout metaphor", bergerak=True)]
        self.assertIn("95", res_cutout)
        res_grid = [k["id"] for k in pk.pilih(self.kartu, cari="flash grid", bergerak=True)]
        self.assertIn("14", res_grid)


if __name__ == "__main__":
    unittest.main()
