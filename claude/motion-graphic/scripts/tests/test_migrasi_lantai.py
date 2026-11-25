"""Pintu baru SKILL.md ramping dan tidak ada butir Lantai yang hilang: tiap ID LANTAI.md punya rumah di MIGRASI-LANTAI.md,
rumahnya ada, daftar NEGATIF sama di file bersama dan SKILL.md, dan batas ukuran SKILL.md terjaga."""
import importlib.util, re, subprocess, sys, unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]; MG = ROOT / "claude/motion-graphic"


def muat(nama, path):
    spec = importlib.util.spec_from_file_location(nama, path); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m


class MigrasiLantai(unittest.TestCase):
    def setUp(self):
        self.sl = muat("sync_lantai", ROOT / "tools/sync_lantai.py")
        self.ids = self.sl.id_lantai((MG / "LANTAI.md").read_text(encoding="utf-8"))
        self.peta = self.sl.baris_migrasi((MG / "MIGRASI-LANTAI.md").read_text(encoding="utf-8"))

    def test_ada_46_butir(self):
        self.assertEqual(len(self.ids), 46)

    def test_setiap_id_lantai_ada_di_migrasi(self):
        mentah = (MG / "MIGRASI-LANTAI.md").read_text(encoding="utf-8")
        for i in self.ids:
            self.assertRegex(mentah, rf"(?m)^\| {i} \|", f"{i} tidak ada di MIGRASI-LANTAI.md")
        self.assertEqual(sorted(set(self.peta) - set(self.ids)), [])

    def test_rumah_baru_nyata(self):
        for i, rumah in self.peta.items():
            for path in re.findall(r"`((?:references|scripts|cookbook|\.\./_bersama)?[\w./-]*\.(?:md|py|sh|ts))`", rumah):
                self.assertTrue((MG / path).exists(), f"{i}: {path}")

    def test_sync_lantai_check_lulus(self):
        r = subprocess.run([sys.executable, str(ROOT / "tools/sync_lantai.py"), "--check"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)


class SkillRamping(unittest.TestCase):
    def setUp(self):
        self.t = (MG / "SKILL.md").read_text(encoding="utf-8")

    def test_ukuran_dan_deskripsi(self):
        self.assertLessEqual(len(self.t.encode("utf-8")), 12 * 1024)
        self.assertLessEqual(self.t.count("\n") + 1, 200)
        d = re.search(r'^description: "(.*)"$', self.t, flags=re.M).group(1)
        self.assertLessEqual(len(d), 300)
        for kata in ("LANTAI", "cookbook", "RESEP", "juri"):   # deskripsi = pemicu, bukan ringkasan alur/komponen
            self.assertNotIn(kata, d)

    def test_bagian_inti_berurutan(self):
        urut = ["## Sebelum mulai", "## NEGATIF", "## Alur", "**Hukum besi:**", "## Profil merek", "## Bila ... buka ...", "## Alat"]
        pos = [self.t.find(x) for x in urut]
        self.assertNotIn(-1, pos); self.assertEqual(pos, sorted(pos))
        self.assertEqual(len(re.findall(r"^\d\. \*\*", self.t[self.t.index("## Alur"):self.t.index("**Hukum besi:**")], flags=re.M)), 8)

    def test_negatif_sepuluh_butir_dan_sinkron(self):
        k = (ROOT / "claude/_bersama/NEGATIF.md").read_text(encoding="utf-8")
        blok = lambda s: s[s.index("<!-- NEGATIF:mulai -->"):s.index("<!-- NEGATIF:selesai -->")]
        self.assertEqual(blok(k), blok(self.t))
        self.assertEqual(len(re.findall(r"^\d+\. \*\*", blok(self.t), flags=re.M)), 10)
        self.assertEqual(len(re.findall(r"Alasan:", blok(self.t))), 10)   # tiap butir membawa alasannya
        r = subprocess.run([sys.executable, str(ROOT / "tools/sync_negatif.py"), "--check"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)

    def test_vibedesign_menunjuk_file_bersama(self):
        self.assertIn("_bersama/NEGATIF.md", (ROOT / "claude/vibedesign/SKILL.md").read_text(encoding="utf-8"))

    def test_rujukan_di_skill_ada(self):
        for rel in re.findall(r"`((?:references|scripts|templates|cookbook)/[\w./-]+\.(?:md|py|sh))`", self.t):
            self.assertTrue((MG / rel).exists(), rel)

    def test_mtd_hanya_penunjuk_dan_dunia_visual_ada(self):
        mtd = (ROOT / "claude/motion-theme-director/SKILL.md").read_text(encoding="utf-8")
        self.assertLess(len(mtd.encode("utf-8")), 2500); self.assertIn("references/dunia-visual.md", mtd)
        dv = (MG / "references/dunia-visual.md").read_text(encoding="utf-8")
        for x in ("Router tema", "Lima uji biner", "Gerbang 3 style frame", "Kata di brief"):
            self.assertIn(x, dv)

    def test_referensi_baru_dibatasi_15kb(self):
        for f in ("dunia-visual", "teks", "kamera-gerak", "revisi", "storyboard"):
            self.assertLessEqual((MG / f"references/{f}.md").stat().st_size, 15 * 1024, f)
        self.assertIn("Aturan inti (Lantai E23-E25a)", (MG / "references/audio.md").read_text(encoding="utf-8")[:6000])

    def test_motion_core_dan_lantai_ditandai_arsip(self):
        self.assertIn("pintu aktif: SKILL.md", (MG / "LANTAI.md").read_text(encoding="utf-8")[:200])
        self.assertIn("pintu aktif: SKILL.md", (MG / "MOTION-CORE.md").read_text(encoding="utf-8")[:1500])


if __name__ == "__main__":
    unittest.main()
