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


def baris_tabel(keluaran):
    """Hanya baris tabel (berawalan `|`); sejak C4 stdout juga memuat risiko, sumber vault, dan baris penutup."""
    return [x for x in keluaran.strip().splitlines() if x.startswith("|")]


class Dasar(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name).resolve()
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
        self.assertEqual(pk.kata_kunci("Demo  FITUR, yang di UI demo"), ["demo", "fitur", "ui"])
        self.assertEqual(pk.kata_kunci("di ke"), [])

    def test_lebih_banyak_kata_cocok_menang(self):
        self.assertEqual(self.ids(cari="demo fitur produk"), ["63", "65", "93", "14"])

    def tabel(self, *baris):
        kepala = "| ID | Pola | Narrative trigger | Kategori | Status | Path |\n|---|---|---|---|---|---|\n"
        self.index.write_text(kepala + "\n".join(f"| {i} | {n} | {t} | layout | bergerak:ya · diukur:ya | 01-x/{i}.md |" for i, n, t in baris) + "\n", encoding="utf-8")
        return pk.baca_index(self.index)

    def test_trigger_berbobot_lebih_dari_nama(self):
        kartu = self.tabel(("01", "Zebra Garis Tebal", "pembukaan acara tahunan"), ("02", "Pola Biasa", "garis tebal dipakai untuk judul"))
        self.assertEqual([k["id"] for k in pk.pilih(kartu, cari="garis")], ["02", "01"])
        self.assertEqual(self.ids(cari="camera")[:2], ["63", "65"])

    def test_kata_utuh_bukan_potongan(self):
        kartu = self.tabel(("01", "Build Cepat", "build quick prototype"), ("02", "Panel", "antarmuka aplikasi"))
        self.assertEqual([k["id"] for k in pk.pilih(kartu, cari="ui")], ["02"])  # ui lewat SINONIM = aplikasi; "build"/"quick" tidak cocok
        self.assertEqual(pk.pilih(self.tabel(("01", "Build Cepat", "build quick")), cari="ui"), [])

    def test_awalan_untuk_kata_panjang(self):
        kartu = self.tabel(("01", "Galeri", "fotografi produk di meja"), ("02", "Teks", "kutipan pendek"))
        self.assertEqual([k["id"] for k in pk.pilih(kartu, cari="foto")], ["01"])
        self.assertEqual(pk.pilih(self.tabel(("01", "Galeri", "fotografi produk")), cari="fot"), [])  # awalan hanya untuk kata ≥ 4 huruf; "fot" bukan kata utuh

    def test_sinonim_inggris(self):
        kartu = self.tabel(("01", "Urutan", "tampilkan langkah satu per satu"), ("02", "Dua Sisi", "perbandingan sebelum dan sesudah pemakaian"))
        a = [k["id"] for k in pk.pilih(kartu, cari="before after")]
        self.assertEqual(a, [k["id"] for k in pk.pilih(kartu, cari="sebelum sesudah")]); self.assertEqual(a[:1], ["02"])

    def test_dua_huruf_dipertahankan(self):
        self.assertEqual(pk.kata_kunci("vo ai 3d di"), ["vo", "ai", "3d"])
        self.assertNotIn("di", pk.kata_kunci("di")); self.assertEqual(pk.kata_kunci("a an of to"), [])

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


class Fungsi(Dasar):
    """Sumbu fungsi cerita (`fungsi:` di frontmatter kartu), kartu qc di luar pencarian bawaan, catatan risiko, bantuan tanpa hasil."""

    def kartu_berkas(self, **per_id):
        for kid, (fungsi, risiko) in per_id.items():
            nama = {"63": "01-camera/63-virtual-camera-desktop-stage.md", "67": "02-typography/67-morphing-card-number-counter.md",
                    "93": "05-sfx/93-change-marked-sound-hierarchy.md"}[kid]
            p = self.index.parent / nama; p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text(f'---\nid: "{kid}"\nfungsi: [{fungsi}]\n' + (f'risiko: "{risiko}"\n' if risiko else "") + "---\nisi\n", encoding="utf-8")
        return pk.baca_index(self.index)

    def test_fungsi_menang(self):
        # B lebih dulu di index dan trigger-nya menyebut "angka" (bobot 3); A hanya punya fungsi angka (bobot 4) dan menang
        kepala = "| ID | Pola | Narrative trigger | Kategori | Status | Path |\n|---|---|---|---|---|---|\n"
        self.index.write_text(kepala + "| B | Satu | angka naik pelan | layout | bergerak:ya · diukur:ya | b.md |\n"
                              "| A | Dua | pembukaan acara tahunan | layout | bergerak:ya · diukur:ya | a.md |\n", encoding="utf-8")
        for n, f in (("a", "angka"), ("b", "suasana")):
            (self.index.parent / f"{n}.md").write_text(f"---\nid: {n}\nfungsi: [{f}]\n---\n", encoding="utf-8")
        self.assertEqual([k["id"] for k in pk.pilih(pk.baca_index(self.index), cari="angka")], ["A", "B"])
        (self.index.parent / "a.md").write_text("---\nid: a\nfungsi: [suasana]\n---\n", encoding="utf-8")
        self.assertEqual([k["id"] for k in pk.pilih(pk.baca_index(self.index), cari="angka")], ["B"])

    def test_fungsi_dibaca_dari_frontmatter(self):
        kartu = {k["id"]: k for k in self.kartu_berkas(**{"63": ("langkah, bukti", ""), "93": ("audio", "")})}
        self.assertEqual(kartu["63"]["daftar_fungsi"], ["langkah", "bukti"]); self.assertEqual(kartu["63"]["fungsi"], "langkah bukti")
        self.assertEqual(kartu["14"]["daftar_fungsi"], [])  # berkas kartu tidak ada: kosong, bukan galat

    def test_qc_tidak_muncul_tanpa_saringan_fixture(self):
        kartu = self.kartu_berkas(**{"93": ("qc", "")})
        self.assertNotIn("93", [k["id"] for k in pk.pilih(kartu, cari="bunyi")])
        self.assertIn("93", [k["id"] for k in pk.pilih(kartu, cari="bunyi", pack="05")])
        self.assertIn("93", [k["id"] for k in pk.pilih(kartu, cari="bunyi", kategori="sfx")])

    def test_risiko_dibaca(self):
        kartu = {k["id"]: k for k in self.kartu_berkas(**{"63": ("langkah", "hati-hati"), "67": ("angka", "")})}
        self.assertEqual(kartu["63"]["risiko"], "hati-hati"); self.assertEqual(kartu["67"]["risiko"], "")
        r = self.cli("--cari", "demo fitur", "--limit", "1"); self.assertEqual(r.returncode, 0)
        self.assertIn("Risiko 63: hati-hati", r.stdout)

    def test_tanpa_hasil_menyebut_fungsi(self):
        r = self.cli("--cari", "xyzzy")
        self.assertEqual(r.returncode, 1); self.assertFalse(baris_tabel(r.stdout))  # C7b: panduan fungsi kini di stdout, tabel tetap kosong
        self.assertTrue(r.stderr.startswith("Tidak ada kartu yang cocok")); self.assertIn("Sebut fungsi beat-nya", r.stderr)
        self.assertIn("hook, jelaskan, angka, banding, bukti, langkah, balik, penekanan, transisi, suasana, cta, penutup", r.stderr)


class Sumber(Dasar):
    """C4: sumber vault per kartu, frame kunci lewat alias dan id vault, --ringkas."""

    VAULT = ('---\nid: "{i}"\ndilihat_bergerak: {b}\n---\n# {i}\n**Inti mekanik (1 kalimat):** Satu hal yang bergerak. Kalimat kedua tidak ikut.\n'
             '**Jangan dipakai untuk:** cerita emosional, wajah.\n')

    def tulis_kartu(self, nama, vault_ids, alias=()):
        v = self.index.parent / "vault"; v.mkdir(exist_ok=True)
        for i, b in vault_ids:
            (v / f"{i}-x.md").write_text(self.VAULT.format(i=i, b=b), encoding="utf-8")
        k = self.index.parent / nama; k.parent.mkdir(parents=True, exist_ok=True)
        k.write_text("---\nid: kartu\nalias: [" + ", ".join(alias) + "]\nvault: [" + ", ".join(f"../vault/{i}-x.md" for i, _ in vault_ids) + "]\n---\nisi\n", encoding="utf-8")

    def test_blok_sumber_fixture(self):
        self.tulis_kartu("01-camera/63-virtual-camera-desktop-stage.md", [("63", "ya"), ("64", "tidak")])
        r = self.cli("--cari", "demo fitur produk", "--limit", "1"); self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn("63 sumber vault:\n  63 (bergerak: ya, ~", r.stdout)
        self.assertIn("— Satu hal yang bergerak. · jangan untuk: cerita emosional", r.stdout)
        self.assertNotIn("Kalimat kedua", r.stdout)
        self.assertIn("bukan target", r.stdout); self.assertIn("references/slop-catalog.md", r.stdout)
        self.assertTrue(all(not x.startswith("|") for x in r.stdout.splitlines()[4:]))

    def test_lebih_dari_empat_sumber_yang_bergerak_dulu(self):
        self.tulis_kartu("01-camera/63-virtual-camera-desktop-stage.md",
                         [("10", "tidak"), ("11", "tidak"), ("12", "ya"), ("13", "tidak"), ("14", "ya"), ("15", "tidak")])
        out = self.cli("--cari", "demo fitur produk", "--limit", "1").stdout.splitlines()
        i = out.index("63 sumber vault:")
        self.assertTrue(out[i + 1].lstrip().startswith("12 (bergerak: ya")); self.assertTrue(out[i + 2].lstrip().startswith("14 (bergerak: ya"))
        self.assertEqual(out[i + 5].strip(), "+2 sumber lain: python3 tools/cookbook.py cari 63")

    def test_tanpa_sumber_vault_tidak_ada_blok(self):
        self.assertNotIn("sumber vault:", self.cli("--cari", "demo fitur", "--limit", "1").stdout)

    def test_keyframes_lewat_alias_fixture(self):
        self.tulis_kartu("01-camera/65-camera-dive-into-ui.md", [], alias=["63"])
        r = self.cli("--cari", "dive", "--limit", "1")
        self.assertIn(f"3 file: {self.kf}/{{63,65}}-*", baris_tabel(r.stdout)[2])
        self.assertEqual(pk.keyframes(["63", "65"], self.kf), f"3 file: {self.kf}/{{63,65}}-*")
        self.assertEqual(pk.keyframes(["6", "630"], self.kf), f"2 file: {self.kf}/{{6,630}}-*")  # '6-k1' dan '630-k1' memang ada; '63-*' tidak ikut

    def test_ringkas(self):
        self.tulis_kartu("01-camera/63-virtual-camera-desktop-stage.md", [("63", "ya")])
        out = self.cli("--cari", "demo fitur produk", "--ringkas").stdout.strip().splitlines()
        self.assertTrue(out and all(x.startswith("|") for x in out))


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
        b = baris_tabel(r.stdout)
        self.assertEqual(b[0], "| ID | Nama | Bergerak/Diukur | Path kartu | Keyframes |"); self.assertEqual(len(b), 4)
        self.assertEqual([x.strip() for x in b[2].strip("|").split("|")][:3], ["63", "Virtual Camera Desktop Stage", "ya/ya"])
        self.assertIn(str(self.index.parent / "01-camera/63-virtual-camera-desktop-stage.md"), b[2])
        self.assertIn(f"2 file: {self.kf}/63-*", b[2])
        self.assertIn("sebagian/ya", b[3]); self.assertIn(f"1 file: {self.kf}/65-*", b[3])

    def test_tanpa_keyframes_bertanda_strip(self):
        r = self.cli("--kategori", "script"); self.assertEqual(r.returncode, 0)
        self.assertTrue(baris_tabel(r.stdout)[2].rstrip().endswith("| - |"))
        self.assertEqual(pk.keyframes("63", self.d / "tidak-ada"), "-")

    def test_limit_bawaan_empat(self):
        self.assertEqual(len(baris_tabel(self.cli().stdout)), 2 + 4)

    def test_kode_keluar(self):
        r = self.cli("--cari", "xyzzy"); self.assertEqual(r.returncode, 1); self.assertFalse(baris_tabel(r.stdout)); self.assertIn("Tidak ada kartu", r.stderr)
        self.assertEqual(self.cli("--cari", "di").returncode, 2)
        self.assertEqual(self.cli("--limit", "0").returncode, 2)
        self.assertEqual(self.cli("--kategori", "gaya").returncode, 2)
        self.index.write_text("kosong\n"); r = self.cli(); self.assertEqual(r.returncode, 2); self.assertIn("GAGAL", r.stderr)


class IndexAsli(unittest.TestCase):
    """CATALOG.md repo terbaca utuh: jumlah kartu sama dengan baris tabel, semua path dan status dikenali."""

    def setUp(self): self.kartu = pk.baca_index()

    def test_semua_baris_terbaca(self):
        baris = [b for b in pk.INDEX.read_text(encoding="utf-8").splitlines() if b.startswith("| ") and b.rstrip().endswith(".md |")]
        self.assertEqual(len(self.kartu), len(baris)); self.assertGreaterEqual(len(self.kartu), 40)
        self.assertEqual(len({k["id"] for k in self.kartu}), len(self.kartu))

    def test_path_kategori_status_sah(self):
        for k in self.kartu:
            self.assertTrue((pk.INDEX.parent / k["path"]).is_file(), k["path"])
            self.assertIn(k["utama"], pk.KATEGORI, k["id"]); self.assertTrue(set(k["tambahan"]) <= set(pk.KATEGORI), k["id"])
            self.assertIn(k["bergerak"], ("ya", "sebagian", "tidak"), k["id"]); self.assertIn(k["diukur"], ("ya", "tidak"), k["id"])

    def test_cli_pada_index_asli(self):
        r = subprocess.run([sys.executable, str(SKRIP), "--cari", "demo fitur produk", "--bergerak"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        b = baris_tabel(r.stdout); self.assertTrue(3 <= len(b) <= 6)
        for x in b[2:]:
            s = [c.strip() for c in x.strip("|").split("|")]
            self.assertTrue(s[2].startswith("ya/")); self.assertTrue(s[3].startswith("claude/motion-graphic/cookbook/"))
            self.assertTrue((S.parents[2] / s[3]).is_file(), s[3])
            self.assertTrue(s[4] == "-" or "claude/motion-graphic/guide/referensi/sheets/" in s[4])  # sheets/ ikut: frame kartu 14 ada di sana (C4)

    def test_qc_tidak_muncul_tanpa_saringan(self):
        ids = [k["id"] for k in pk.pilih(self.kartu, cari="audit frame", limit=99)]
        self.assertFalse([i for i in ids if i.startswith("Q")], ids)
        self.assertIn("Q03", [k["id"] for k in pk.pilih(self.kartu, cari="audit frame", pack="06")])
        self.assertIn("Q03", [k["id"] for k in pk.pilih(self.kartu, cari="audit frame", kategori="qc")])

    def test_risiko_dicetak(self):
        r = subprocess.run([sys.executable, str(SKRIP), "--cari", "cutout metaphor"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr); self.assertIn("Risiko 95:", r.stdout)
        self.assertIn("sidik jari slop", r.stdout)

    def test_sumber_vault_dicetak(self):
        r = subprocess.run([sys.executable, str(SKRIP), "--cari", "demo fitur produk"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn("sumber vault:", r.stdout); self.assertIn("bukan target", r.stdout)

    def test_keyframes_lewat_alias(self):
        k14 = next(k for k in self.kartu if k["id"] == "14")
        self.assertNotEqual(pk.keyframes(pk.id_kartu(k14), pk.KEYFRAMES), "-")
        r = subprocess.run([sys.executable, str(SKRIP), "--cari", "flash grid", "--bergerak", "--ringkas"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        sel14 = [x for x in baris_tabel(r.stdout) if x.startswith("| 14 |")][0]
        self.assertNotIn("| - |", sel14[-8:])

    def test_ringkas(self):
        r = subprocess.run([sys.executable, str(SKRIP), "--cari", "cutout metaphor", "--ringkas"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertTrue(all(x.startswith("|") for x in r.stdout.strip().splitlines()))
        self.assertNotIn("Risiko", r.stdout)

    def test_semua_kartu_aktif_punya_fungsi(self):
        self.assertEqual([k["id"] for k in self.kartu if not k["daftar_fungsi"]], [])

    def test_kartu_motion_graphic_dan_flash_grid_bergerak(self):
        id_map = {k["id"]: k for k in self.kartu}
        for cid in ("14", "17", "88", "95"):
            self.assertIn(cid, id_map)
            self.assertEqual(id_map[cid]["bergerak"], "ya", cid)
        res_cutout = [k["id"] for k in pk.pilih(self.kartu, cari="cutout metaphor", bergerak=True)]
        self.assertIn("95", res_cutout)
        res_grid = [k["id"] for k in pk.pilih(self.kartu, cari="flash grid", bergerak=True)]
        self.assertIn("14", res_grid)
        res_pack = [k["id"] for k in pk.pilih(self.kartu, pack="01", bergerak=True)]
        self.assertIn("14", res_pack)
        self.assertNotIn("95", res_pack)


if __name__ == "__main__":
    unittest.main()
