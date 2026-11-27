#!/usr/bin/env python3
"""Regresi temuan audit dokumen: rujukan bagian menunjuk heading yang ada, tidak ada kalimat yang bertentangan dengan
Lantai C17 di orkestrasi.md, Remotion + rakit lego adalah jalur utama di build.md, baris Fase 3 PETA.md memuat guide visual,
gerbang render R1-R5 dan batas kerja ada di build.md, alur dua langkah ada di cookbook/README.md, lima invarian ada di byte 0
AGENTS.md, LANTAI.md dan MOTION-CORE.md sudah di archive/riwayat/, dan tidak ada template gaya tetap (formats/)."""
import importlib.util, os, re, subprocess, sys, unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]; MG = ROOT / "claude/motion-graphic"
RUJUK = re.compile(r"`([\w./<>-]+\.md)`\s*§\s?(\d+(?:\.\d+)*[A-Za-z]?)")
PINTU = [ROOT / "AGENTS.md", ROOT / "claude/irfan-creative-workflow/SKILL.md", MG / "SKILL.md"]
ARSIP = ROOT / "archive/riwayat"


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

    def test_path_di_pintu_produksi_ada(self):
        hilang = []
        for f in (MG / "references/build.md",):
            teks = baca(f); teks = teks[teks.index("## 4. Gerbang render"):]
            for rel in re.findall(r"`((?:\.\./)?(?:scripts|cookbook|references|guide|templates)/[\w./-]+\.(?:py|sh|md|ts))`", teks):
                if not any((d / rel).exists() for d in (f.parent, MG)):
                    hilang.append(f"{f.name}: {rel}")
            for rel in re.findall(r"(?:python3|bash) ((?:gate|audio|juri|cookbook)/[\w.]+)", teks):
                if not (MG / "scripts" / rel).exists():
                    hilang.append(f"{f.name}: scripts/{rel}")
        self.assertEqual(hilang, [])


class Kontradiksi(unittest.TestCase):
    def test_orkestrasi_tidak_melarang_melihat_gambar(self):
        t = baca(MG / "references/orkestrasi.md")
        for pola in (r"tidak (?:perlu )?membuka gambar", r"tanpa membuka gambar", r"jangan (?:buka|membuka) gambar", r"tidak melihat gambar"):
            self.assertIsNone(re.search(pola, t, flags=re.I), pola)
        self.assertIn("bukan dengan tidak melihat", t)
        self.assertIn("Dinilai dengan mata", baca(ARSIP / "LANTAI.md"))

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
        self.assertIn("motion-graphic/SKILL.md", b); self.assertIn("scripts/cookbook/pilih_kartu.py", b)  # pintu: SKILL.md (bukan MOTION-CORE, kini arsip)
        self.assertNotIn("formats/", t); self.assertNotIn("Format Bible", t)


INVARIAN = ("Cookbook = perpustakaan mekanik, bukan template", "Promosi aturan hanya lewat `skill-steward`", "Gerbang pemilik tidak dilewati",
            "Aturan = praktik terbaik, bukan hukum tetap", "Baca dulu, jangan menebak")


def blok_invarian(teks):
    """Baris blockquote berurutan di awal file."""
    baris = []
    for b in teks.splitlines():
        if not b.startswith(">"):
            break
        baris.append(b)
    return "\n".join(baris)


class Invarian(unittest.TestCase):
    def test_lima_invarian_di_byte_0(self):
        for f in (ROOT / "AGENTS.md",):
            t = baca(f); self.assertTrue(t.startswith("> **Invarian kerja**"), f.name)
            blok = blok_invarian(t)
            self.assertEqual(re.findall(r"^> (\d)\. \*\*", blok, flags=re.M), list("12345"), f.name)
            for i, x in enumerate(INVARIAN, 1):
                self.assertIn(f"> {i}. **{x}", blok, f.name)
            for x in ("2–4 kartu mekanik cookbook = output baru", "template gaya tetap", "menyalin gaya antar proyek", "S = proyek, P = pertimbangan, H = hukum netral-gaya terukur",
                      "naskah final", "storyboard + tabel racikan cookbook", "pemakaian kredit", "`render.sh final`", "`gerbang_produksi.sh`", "`scripts/gate/*`", "outbox/proyek terkait"):
                self.assertIn(x, blok, f"{f.name}: {x}")

    def test_blok_sama_dan_ringkas(self):
        a = blok_invarian(baca(ROOT / "AGENTS.md"))
        self.assertLess(len(a.encode("utf-8")), 1050)  # < 350 token: ±3 byte per token untuk teks Indonesia ber-markdown

    def test_tidak_ada_template_gaya_tetap(self):
        self.assertFalse((MG / "formats").exists())
        for f in (ROOT / "AGENTS.md", ROOT / "PETA.md", MG / "SKILL.md", MG / "references/build.md", ROOT / "tools/peta.py"):
            t = baca(f)
            for x in ("formats/", "Format Bible", "story-doc-16x9", "journey-talkinghead", "/FORMAT`", "format terkunci", "Format Terkunci"):
                self.assertNotIn(x, t, f"{f.name}: {x}")


class PintuProduksi(unittest.TestCase):
    def test_lantai_dan_motion_core_sudah_diarsipkan(self):
        for n in ("LANTAI.md", "MOTION-CORE.md"):
            self.assertFalse((MG / n).exists(), n)
            self.assertTrue((ARSIP / n).is_file(), n)

    def test_build_memuat_gerbang_dan_larangan(self):
        t = baca(MG / "references/build.md")
        for x in ("cek_komposisi.py", "audio_order.py", "sfx_potong.py", "audio_phone.py --root <folder stem> --gate", "render.sh <proyek> final",
                  "gerbang_produksi.sh", "`WAJAH`, `INSET`, `TEPI`, `ASET`", "qc/ketat", "--ketat",
                  "**Render final lewat `render.sh final`**", "NOT RUN", "Jangan mengedit `scripts/gate/*` atau `scripts/juri/*`",
                  "Jangan mematikan gerbang dengan menghapus atau mengganti nama file pemicunya", "Tenggat bukan alasan",
                  "PASS tanpa bukti = FAIL", "Dilarang menambah elemen di luar tabel racikan"):
            self.assertIn(x, t)
        self.assertEqual(len(re.findall(r"^\| R[1-5] \|", t, flags=re.M)), 5)

    def test_cookbook_readme_memuat_alur_dua_langkah(self):
        t = baca(MG / "cookbook/README.md")
        alur = t[t.index("## 2."):t.index("## 3.")]
        urut = ["Tanya sebelum meracik", "Langkah 1", "irfan-creative-workflow/SKILL.md", "pilih_kartu.py --cari", "2–4 kartu",
                "| Beat | Fungsi cerita | Pola (ID.Tn) |", "Langkah 2"]
        pos = [alur.find(x) for x in urut]
        self.assertNotIn(-1, pos, [x for x, p in zip(urut, pos) if p < 0]); self.assertEqual(pos, sorted(pos))
        for x in ("--pack 01..06", "--bergerak"):
            self.assertIn(x, alur)
        self.assertIn("dari `toolkit/`", baca(MG / "SKILL.md") + baca(MG / "references/build.md"))
        self.assertIn("`render.sh final` lulus", baca(MG / "references/build.md"))

    def test_skill_md_adalah_pintu_dan_merutekan_alur(self):
        skill = baca(MG / "SKILL.md")
        for x in ("irfan-creative-workflow/SKILL.md", "scripts/cookbook/pilih_kartu.py", "2-4 kartu", "references/dunia-visual.md", "references/build.md",
                  "render.sh <proyek> final", "build.md` (§4", "scripts/lihat.py", "negatif_cek.py", "**Hukum besi:**"):
            self.assertIn(x, skill)
        self.assertTrue((MG / "scripts/cookbook/pilih_kartu.py").is_file())

    def test_arsip_lantai_dan_motion_core_ditandai(self):
        self.assertIn("pintu aktif: SKILL.md", baca(ARSIP / "MOTION-CORE.md")[:1500])

    def test_pintu_atas_menunjuk_skill_md(self):
        a = baca(ROOT / "AGENTS.md")[:3000]
        self.assertIn("claude/motion-graphic/SKILL.md", a); self.assertIn("pilih_kartu.py", a)

    def test_pengunci_ragam_isolasi_flashgrid_dan_sfx_alami(self):
        t = baca(MG / "references/build.md") + baca(MG / "cookbook/README.md")
        for x in ("Tanya sebelum meracik", "Satu video = satu sesi terpisah", "Variasikan mode", "FlashGrid.tsx"):
            self.assertIn(x, t)
        self.assertIn("Level alami", baca(MG / "guide/sfx/GUIDE.md"))
        self.assertTrue((MG / "scripts/remotion/FlashGrid.tsx").is_file())


class CookbookDomainPacks(unittest.TestCase):
    def test_batas_token_router_dan_invarian(self):
        idx = baca(MG / "cookbook/INDEX.md")
        core = baca(MG / "cookbook/00-core-invariants.md")
        self.assertLess(len(idx) // 4, 600)
        self.assertLess(len(core) // 4, 1000)

    def test_cookbook_cek_ketat_lulus(self):
        r = subprocess.run([sys.executable, str(ROOT / "tools/cookbook.py"), "cek", "--ketat"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertIn("0 GAGAL", r.stdout)

    def test_vault_utuh_dan_semua_id_lama_terpetakan(self):
        vault = sorted((MG / "cookbook/_vault").glob("*/*.md"))
        self.assertEqual(len(vault), 97)
        spec = importlib.util.spec_from_file_location("cookbook", ROOT / "tools/cookbook.py")
        cb = importlib.util.module_from_spec(spec); spec.loader.exec_module(cb)
        missing = [p.name for p in vault if cb.resolve(p.stem.split("-")[0]) is None]
        self.assertEqual(missing, [])

    def test_tidak_ada_path_cookbook_lama_di_file_aktif(self):
        lama = ("01-camera-and-transitions/", "02-typography-and-captions/", "03-visual-formats/",
                "04-pacing-and-structure/", "05-audio-and-sfx/", "06-script-and-story/", "cookbook/teknik/")
        aktif = [ROOT / "AGENTS.md", ROOT / "PETA.md", ROOT / "tools/peta.py",
                 ROOT / "claude/irfan-creative-workflow/SKILL.md", MG / "SKILL.md", MG / "references/build.md",
                 MG / "cookbook/README.md", MG / "scripts/remotion/Kursor.tsx", MG / "scripts/remotion/Penghitung.tsx"]
        temuan = [(f.relative_to(ROOT), p) for f in aktif for p in lama if p in baca(f)]
        self.assertEqual(temuan, [])


if __name__ == "__main__":
    unittest.main()
