#!/usr/bin/env python3
"""pilih_kartu.py peringkat: `fungsi:` sinyal utama, teks kartu hanya pemecah seri, kartu audio hanya bila query menyebut bunyi,
seri dipecah oleh fungsi utama lalu status dilihat bergerak, kartu bergerbang kata (`hanya_bila_kata:`), fungsi tanpa kartu dikatakan jujur."""
import importlib.util, subprocess, sys, tempfile, unittest
from pathlib import Path

S = Path(__file__).resolve().parents[1]
SKRIP = S / "cookbook/pilih_kartu.py"
spec = importlib.util.spec_from_file_location("pilih_kartu", SKRIP); pk = importlib.util.module_from_spec(spec); spec.loader.exec_module(pk)

KEPALA = "| ID | Pola | Narrative trigger | Kategori | Status | Path |\n|---|---|---|---|---|---|\n"


class Fixture(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name).resolve()
        self.index = self.d / "CATALOG.md"

    def tearDown(self): self.t.cleanup()

    def kartu(self, *baris):
        """baris: (id, nama, trigger, kategori, bergerak, fungsi, ekstra frontmatter)."""
        isi = []
        for i, nama, trig, kat, ber, fungsi, ekstra in baris:
            isi.append(f"| {i} | {nama} | {trig} | {kat} | bergerak:{ber} · diukur:ya | {i}.md |")
            (self.d / f"{i}.md").write_text(f"---\nid: {i}\nfungsi: [{fungsi}]\n{ekstra}---\n", encoding="utf-8")
        self.index.write_text(KEPALA + "\n".join(isi) + "\n", encoding="utf-8")
        return pk.baca_index(self.index)

    def ids(self, kartu, q, **k): return [x["id"] for x in pk.pilih(kartu, q, **k)]

    def cli(self, *a): return subprocess.run([sys.executable, str(SKRIP), "--index", str(self.index), "--keyframes", str(self.d / "kf"), *a],
                                             capture_output=True, text=True)


class FungsiUtama(Fixture):
    def test_sinonim_fungsi_di_teks_kartu_tidak_menghasilkan_kecocokan(self):
        # "pembuka" di trigger A dulu dipetakan ke hook; A berfungsi suasana, jadi query hook hanya membawa B
        k = self.kartu(("A", "Lapis Bunyi", "pembuka merek butuh jeda", "layout", "ya", "suasana", ""),
                       ("B", "Judul Masuk", "judul tampil di awal", "layout", "tidak", "hook", ""))
        self.assertEqual(self.ids(k, "hook"), ["B"])
        self.assertEqual(self.ids(k, "opening"), ["B"])

    def test_kata_sesudah_di_teks_bukan_perbandingan(self):
        # tanpa satu pun kartu berfungsi banding, "before after" tidak boleh mengenai "sesudah jeda" lewat sinonim
        k = self.kartu(("A", "Sengat", "hantaman sesudah jeda vakum", "sfx", "ya", "penutup", ""))
        self.assertEqual(self.ids(k, "before after"), [])
        self.assertEqual(self.ids(k, "sesudah"), [])  # "sesudah" meminta banding; fungsi tanpa kartu tidak dipinjamkan lewat kebetulan teks
        self.assertEqual(self.ids(k, "jeda vakum"), ["A"])  # kata biasa tetap dicocokkan apa adanya

    def test_kartu_tanpa_fungsi_query_tersaring_bila_ada_yang_berfungsi(self):
        k = self.kartu(("A", "Satu", "promo teaser musik", "camera", "ya", "transisi", ""),
                       ("B", "Dua", "batang naik", "layout", "tidak", "angka", ""))
        self.assertEqual(self.ids(k, "angka promo"), ["B"])

    def test_nama_mekanik_yang_disebut_tetap_dibawa(self):
        k = self.kartu(("A", "Flash Grid Wipe", "potongan kilat", "camera", "ya", "transisi", ""),
                       ("B", "Judul Masuk", "judul tampil", "typography", "ya", "hook", ""))
        self.assertEqual(self.ids(k, "flash grid hook"), ["A", "B"])

    def test_satu_kata_umum_di_nama_tidak_membawa_kartu_lintas_fungsi(self):
        # "aplikasi" (lewat sinonim ui) atau "ui" saja mengenai nama "Familiar-UI ..." tetapi tidak menyebut mekaniknya
        k = self.kartu(("A", "Familiar-UI Line Metaphor", "kalimat VO diperankan UI", "layout", "ya", "jelaskan", ""),
                       ("B", "Flow Scaffold", "alur bertahap", "layout", "ya", "langkah", ""))
        self.assertEqual(self.ids(k, "langkah alur aplikasi"), ["B"])
        self.assertEqual(self.ids(k, "langkah ui"), ["B"])
        # kata nama yang khas (≥ 5 huruf) tetap membawa kartunya; menyebut nama setara satu fungsi, teks memecah seri (sama dengan flash grid)
        self.assertEqual(self.ids(k, "langkah metaphor"), ["A", "B"])


class Audio(Fixture):
    def setUp(self):
        super().setUp()
        self.k = self.kartu(("S", "Sengat Vakum", "pembuka merek dengan hantaman", "sfx", "ya", "audio, hook, penutup", ""),
                            ("V", "Judul Masuk", "judul tampil", "typography", "tidak", "hook", ""))

    def test_kartu_audio_tidak_mengisi_slot_visual(self):
        self.assertEqual(self.ids(self.k, "hook takut"), ["V"])
        self.assertEqual(self.ids(self.k, "penutup"), [])

    def test_kartu_audio_bila_query_menyebut_bunyi(self):
        self.assertEqual(self.ids(self.k, "hook bunyi")[:1], ["S"])
        self.assertEqual(self.ids(self.k, "sfx penutup"), ["S"])
        self.assertIn("S", self.ids(self.k, "hook", kategori="sfx"))


class Seri(Fixture):
    def test_fungsi_utama_lalu_bergerak_lalu_urutan(self):
        k = self.kartu(("W", "Satu", "a", "layout", "ya", "langkah, hook", ""), ("X", "Dua", "b", "layout", "tidak", "hook", ""),
                       ("Y", "Tiga", "c", "layout", "ya", "hook", ""), ("Z", "Empat", "d", "layout", "sebagian", "hook, langkah", ""))
        self.assertEqual(self.ids(k, "hook"), ["Y", "Z", "X", "W"])

    def test_teks_tetap_memecah_seri_sebelum_fungsi_utama(self):
        k = self.kartu(("A", "Satu", "tanpa kata itu", "layout", "ya", "hook", ""), ("B", "Dua", "hook takut ke dokter", "layout", "ya", "balik, hook", ""))
        self.assertEqual(self.ids(k, "hook takut"), ["B", "A"])


class Gerbang(Fixture):
    def test_hanya_bila_kata(self):
        k = self.kartu(("95", "Cutout Collage", "penjelasan konsep lewat benda", "layout", "ya", "jelaskan", "hanya_bila_kata: [cutout, kolase, metafora]\n"),
                       ("88", "Benda Diagram", "klaim dijelaskan", "layout", "ya", "jelaskan", ""))
        self.assertEqual(self.ids(k, "jelaskan konsep"), ["88"])
        self.assertEqual(self.ids(k, "jelaskan kolase")[:1], ["95"])
        self.assertIn("95", self.ids(k, "cutout"))
        self.assertEqual(k[0]["hanya_bila_kata"], ["cutout", "kolase", "metafora"])


class TanpaKartu(Fixture):
    def setUp(self):
        super().setUp()
        self.kartu(("A", "Slab", "kata punchline", "typography", "ya", "penekanan", ""), ("B", "Langkah", "urutan klik", "layout", "ya", "langkah", ""))

    def test_fungsi_tanpa_kartu_kosong_dan_jujur(self):
        r = self.cli("--cari", "cta booking")
        self.assertEqual(r.returncode, 1); self.assertFalse([x for x in r.stdout.splitlines() if x.startswith("|")])
        self.assertIn("Belum ada kartu untuk fungsi cta", r.stdout)
        self.assertIn("pacing-map.md", r.stdout)
        self.assertRegex(r.stdout, r"(?m)^  tanpa kartu: cta")

    def test_fungsi_tanpa_kartu_disebut_di_samping_hasil(self):
        r = self.cli("--cari", "langkah donasi")
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertEqual([x.split("|")[1].strip() for x in r.stdout.splitlines() if x.startswith("|")][2:], ["B"])
        self.assertIn("Belum ada kartu untuk fungsi cta (donasi)", r.stdout)
        self.assertIn("kartu di atas menjawab fungsi lain", r.stdout)  # tidak terbaca seperti larangan yang dilanggar tabelnya sendiri

    def test_baris_dicocokkan_menyebut_kartu_yang_benar_cocok(self):
        r = self.cli("--cari", "tour")
        self.assertIn("Dicocokkan lewat fungsi beat: langkah (tour): B.", r.stdout)


if __name__ == "__main__":
    unittest.main()
