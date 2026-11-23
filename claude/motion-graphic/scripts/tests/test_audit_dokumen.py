#!/usr/bin/env python3
"""Regresi temuan audit dokumen: rujukan bagian menunjuk heading yang ada, tidak ada kalimat yang bertentangan dengan
Lantai C17 di orkestrasi.md, Remotion + rakit lego adalah jalur utama di build.md, baris Fase 3 PETA.md memuat guide visual,
dan pintu produksi (MOTION-CORE + Format Bible) tetap tipis dan lengkap."""
import importlib.util, os, re, unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]; MG = ROOT / "claude/motion-graphic"
RUJUK = re.compile(r"`([\w./<>-]+\.md)`\s*§\s?(\d+(?:\.\d+)*[A-Za-z]?)")
PINTU = [ROOT / "AGENTS.md", ROOT / "claude/irfan-creative-workflow/SKILL.md", MG / "SKILL.md", MG / "MOTION-CORE.md", *sorted((MG / "formats").glob("*.md"))]


def baca(p): return Path(p).read_text(encoding="utf-8")


def cari(asal, rel):
    for dasar in (asal.parent, MG, MG / "references", ROOT / "claude", ROOT):
        p = (dasar / rel)
        if p.is_file():
            return p
    return None


def ada_bagian(teks, nomor):
    n = re.escape(nomor)
    return bool(re.search(rf"^#{{1,6}}\s+(?:§\s?)?{n}(?:[.\s:)]|$)", teks, flags=re.M | re.I))


class RujukanBagian(unittest.TestCase):
    def test_rujukan_bernomor_menunjuk_heading_yang_ada(self):
        rusak = []
        for f in PINTU:
            for rel, nomor in RUJUK.findall(baca(f)):
                if "<" in rel:
                    continue
                t = cari(f, rel)
                if t is None:
                    rusak.append(f"{f.relative_to(ROOT)}: file {rel} tidak ada")
                elif not ada_bagian(baca(t), nomor):
                    rusak.append(f"{f.relative_to(ROOT)}: {rel} §{nomor} tidak punya heading")
        self.assertEqual(rusak, [])

    def test_storyboard_tidak_dirujuk_ke_bagian_16(self):
        for f in PINTU:
            self.assertIsNone(re.search(r"storyboard\.md`?\s*§\s?16", baca(f)), f.name)
        self.assertTrue(ada_bagian(baca(MG / "references/storyboard.md"), "5"))
        self.assertIn("Tabel kritik", baca(MG / "references/storyboard.md"))

    def test_path_di_pintu_produksi_ada(self):
        hilang = []
        for f in (MG / "MOTION-CORE.md", *sorted((MG / "formats").glob("*.md"))):
            for rel in re.findall(r"`((?:\.\./)?(?:scripts|formats|references|guide|templates)/[\w./-]+\.(?:py|sh|md|ts))`", baca(f)):
                if not any((d / rel).exists() for d in (f.parent, MG)):
                    hilang.append(f"{f.name}: {rel}")
            for rel in re.findall(r"(?:python3|bash) ((?:gate|audio|juri)/[\w.]+)", baca(f)):
                if not (MG / "scripts" / rel).exists():
                    hilang.append(f"{f.name}: scripts/{rel}")
        self.assertEqual(hilang, [])


class Kontradiksi(unittest.TestCase):
    def test_orkestrasi_tidak_melarang_melihat_gambar(self):
        t = baca(MG / "references/orkestrasi.md")
        for pola in (r"tidak (?:perlu )?membuka gambar", r"tanpa membuka gambar", r"jangan (?:buka|membuka) gambar", r"tidak melihat gambar"):
            self.assertIsNone(re.search(pola, t, flags=re.I), pola)
        self.assertIn("bukan dengan tidak melihat", t)
        self.assertIn("Dinilai dengan mata", baca(MG / "LANTAI.md"))

    def test_build_remotion_jalur_utama(self):
        t = baca(MG / "references/build.md")
        self.assertIn("Jalur utama: Remotion, dan rakit lego", t)
        for pola in (r"default\s*:\s*after effects", r"bawaan\s*:\s*after effects", r"dibuat di AE", r"atau AE bila"):
            self.assertIsNone(re.search(pola, t, flags=re.I), pola)
        ae = [b for b in t.splitlines() if re.search(r"After Effects|\bAE\b", b)]
        self.assertTrue(all("bukan jalur bawaan" in b or "AFTER-EFFECTS.md" in b for b in ae), ae)


class Peta(unittest.TestCase):
    def setUp(self):
        spec = importlib.util.spec_from_file_location("peta", ROOT / "tools/peta.py"); self.peta = importlib.util.module_from_spec(spec); spec.loader.exec_module(self.peta)

    def fase3(self, teks):
        return next(b for b in teks.splitlines() if b.startswith("| Fase 3 visual"))

    def test_fase_3_memuat_guide_visual(self):
        for teks in (baca(ROOT / "PETA.md"), self.peta.build()):
            for g in ("guide/teks/GUIDE.md", "guide/visual/GUIDE.md", "guide/gerak/GUIDE.md"):
                self.assertIn(f"`claude/motion-graphic/{g}`", self.fase3(teks))

    def test_regenerasi_menolak_rute_tanpa_guide_visual(self):
        self.assertEqual(self.peta.jaga_rute(), [])
        rusak = self.peta.RUTE.replace("`claude/motion-graphic/guide/visual/GUIDE.md`, ", "")
        self.assertTrue(any("guide/visual/GUIDE.md" in k for k in self.peta.jaga_rute(rusak)))
        self.peta.RUTE = rusak
        with self.assertRaises(SystemExit):
            self.peta.build()

    def test_peta_memuat_rute_produksi(self):
        t = baca(ROOT / "PETA.md")
        b = next(x for x in t.splitlines() if x.startswith("| Sesi produksi video"))
        self.assertIn("MOTION-CORE.md", b); self.assertIn("formats/README.md", b)


class PintuProduksi(unittest.TestCase):
    def test_motion_core_tipis(self):
        self.assertLess((MG / "MOTION-CORE.md").stat().st_size, 12_000)

    def test_motion_core_memuat_gerbang_dan_larangan(self):
        t = baca(MG / "MOTION-CORE.md")
        for x in ("cek_komposisi.py", "audio_order.py", "sfx_potong.py", "audio_phone.py --root <folder stem> --gate", "render.sh <proyek> final",
                  "formats/README.md", "Dilarang melewati `render.sh final`", "Dilarang mengedit `scripts/gate/*` atau `scripts/juri/*`"):
            self.assertIn(x, t)
        self.assertEqual(len(re.findall(r"^\| \d+ \| \*\*", t, flags=re.M)), 10)

    def test_format_bible_lengkap(self):
        kolom = "| Beat | Waktu | Kalimat VO | Jenis adegan | Aset/Subjek | Teks Kunci | Catatan SFX |"
        router = baca(MG / "formats/README.md")
        for slug in ("story-doc-16x9", "journey-talkinghead"):
            self.assertIn(f"`{slug}`", router); self.assertIn(kolom, baca(MG / f"formats/{slug}.md"))
        s = baca(MG / "formats/story-doc-16x9.md")
        for x in ("Maksimal 2 kanvas napas identik berurutan", "≤ 0,3 dtk", "tidak ada pita subtitle", "Teks tidak menumpuk logo", "--ketat"):
            self.assertIn(x, s)
        j = baca(MG / "formats/journey-talkinghead.md")
        for x in ("Hard cut-out", "Warna asli kamera", "SFX hanya di perubahan keadaan visual", "Musik ada sejak frame 0", "jeda sunyi"):
            self.assertIn(x, j)

    def test_pintu_atas_menunjuk_motion_core(self):
        self.assertIn("MOTION-CORE.md", baca(ROOT / "AGENTS.md")[:1500])
        skill = baca(MG / "SKILL.md"); self.assertLess(skill.index("MOTION-CORE.md"), skill.index("## 0. Lantai"))


if __name__ == "__main__":
    unittest.main()
