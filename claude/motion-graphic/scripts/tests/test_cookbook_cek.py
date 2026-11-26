#!/usr/bin/env python3
"""tools/cookbook.py cek: rujukan kode di Primitives/Ref harus ada, struktur vault hanya info, CATALOG menjelaskan id duplikat."""
import contextlib, importlib.util, io, tempfile, unittest
from pathlib import Path

REPO = Path(__file__).resolve().parents[4]
spec = importlib.util.spec_from_file_location("cookbook_tool", REPO / "tools" / "cookbook.py")
cb = importlib.util.module_from_spec(spec); spec.loader.exec_module(cb)

KARTU = """---
id: "{id}"
pola: {pola}
pack: 01-motion-camera-transitions
kategori: camera
kategori_lain: []
trigger: demo fitur produk dengan klik
fungsi: {fungsi}
sumber: contoh
dilihat_bergerak: ya
diukur: ya
alias: [{alias}]
vault: [{vault}]
---
### {id} · {pola}
- **Trigger:** demo fitur produk dengan klik
- **Anti-Pattern:** memotong kaku.
- **Invariant:** satu kanvas, kamera mengikuti klik.
- **Primitives/Ref:** {ref} · Vault: `x`
- **Gate:** `motion_lint.py` PASS.
"""
VAULT_LENGKAP = """---
id: "63"
pola: Contoh
dilihat_bergerak: ya
---
# 63 · Contoh
**Inti mekanik (1 kalimat):** satu hal.
**Jangan dipakai untuk:** cerita emosional.
- **Kenapa bekerja:** karena.
## Pengikat (x)
isi
## Yang harus terasa sama saat disandingkan
- apa?
"""


class Pohon(unittest.TestCase):
    """Pohon repo mini di folder sementara; modul cookbook diarahkan ke sana lewat ROOT/CB."""

    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.root = Path(self.t.name)
        self.cb = self.root / "claude/motion-graphic/cookbook"
        (self.cb / "01-motion-camera-transitions").mkdir(parents=True)
        (self.cb / "_vault/01-camera-and-transitions").mkdir(parents=True)
        (self.root / "scripts").mkdir()
        (self.cb / "INDEX.md").write_text("# index\n"); (self.cb / "00-core-invariants.md").write_text("# core\n")
        self.simpan = (cb.ROOT, cb.CB, cb.SFXDIR, cb.SFXCAT, cb.FAMJSON)
        cb.ROOT, cb.CB = str(self.root), str(self.cb)
        cb.SFXDIR = str(self.cb.parent / "guide/sfx"); cb.SFXCAT = cb.SFXDIR + "/SFXIRFAN.md"; cb.FAMJSON = cb.SFXDIR + "/FAMILI.json"

    def tearDown(self):
        cb.ROOT, cb.CB, cb.SFXDIR, cb.SFXCAT, cb.FAMJSON = self.simpan
        self.t.cleanup()

    def kartu(self, ref, id_="63", alias="", vault="", fungsi="[langkah, bukti]"):
        p = self.cb / "01-motion-camera-transitions" / f"{id_}-contoh.md"
        p.write_text(KARTU.format(id=id_, pola="Contoh Pola", ref=ref, alias=alias, vault=vault, fungsi=fungsi), encoding="utf-8")

    def vault(self, nama="63-contoh.md", isi=VAULT_LENGKAP):
        (self.cb / "_vault/01-camera-and-transitions" / nama).write_text(isi, encoding="utf-8")

    def cek(self, *a):
        o = io.StringIO()
        with contextlib.redirect_stdout(o):
            cb.cmd_index()  # CATALOG/POLA/SFX segar, supaya hanya temuan yang diuji yang muncul
            o.seek(0); o.truncate()
            rc = cb.cmd_cek(list(a))
        return rc, o.getvalue()


class RujukanKode(Pohon):
    def test_berkas_tidak_ada_gagal(self):
        self.kartu("`scripts/tidak-ada.tsx`")
        rc, out = self.cek("--ketat")
        self.assertNotEqual(rc, 0); self.assertIn("Primitives-Ref tidak ada: scripts/tidak-ada.tsx", out)

    def test_berkas_ada_lolos(self):
        (self.root / "scripts/ada.tsx").write_text("x")
        self.kartu("`scripts/ada.tsx`")
        rc, out = self.cek("--ketat"); self.assertEqual(rc, 0, out)

    def test_relatif_ke_motion_graphic_lolos(self):
        d = self.root / "claude/motion-graphic/scripts"; d.mkdir(parents=True); (d / "kamera.tsx").write_text("x")
        self.kartu("`scripts/kamera.tsx`")
        rc, out = self.cek(); self.assertEqual(rc, 0, out)

    def test_nama_polos_dicari_di_repo(self):
        (self.root / "scripts/Komponen.tsx").write_text("x")
        self.kartu("`Komponen.tsx`, `curves.ts`")
        rc, out = self.cek(); self.assertNotEqual(rc, 0)
        self.assertIn("tidak ada: curves.ts", out); self.assertNotIn("tidak ada: Komponen.tsx", out)

    def test_berkas_di_proyek_tetap_gagal(self):
        d = self.root / "projects/x/remotion"; d.mkdir(parents=True); (d / "Papan.tsx").write_text("x")
        self.kartu("`projects/x/remotion/Papan.tsx`")
        rc, out = self.cek(); self.assertNotEqual(rc, 0); self.assertIn("tidak ada: projects/x/remotion/Papan.tsx", out)

    def test_nama_polos_yang_hanya_ada_di_proyek_gagal(self):
        d = self.root / "projects/x/remotion"; d.mkdir(parents=True); (d / "Papan.tsx").write_text("x")
        self.kartu("`Papan.tsx`")
        rc, out = self.cek(); self.assertNotEqual(rc, 0); self.assertIn("tidak ada: Papan.tsx", out)

    def test_tanpa_ekstensi_dan_glob_diabaikan(self):
        self.kartu("`SpatialAnchorCamera`, `scripts/*.tsx`, keyframes `63-k1..k10`")
        rc, out = self.cek(); self.assertEqual(rc, 0, out)


class Fungsi(Pohon):
    def test_nilai_tidak_dikenal_gagal(self):
        self.kartu("`curves`", fungsi="[langkah, tukang]")
        rc, out = self.cek("--ketat"); self.assertNotEqual(rc, 0); self.assertIn("fungsi tidak dikenal: tukang", out)

    def test_daftar_kosong_atau_terlalu_panjang_gagal(self):
        for f in ("[]", "[hook, jelaskan, angka, banding]"):
            self.kartu("`curves`", fungsi=f)
            rc, out = self.cek(); self.assertNotEqual(rc, 0, f); self.assertIn("fungsi harus 1-3 nilai", out)

    def test_kunci_hilang_gagal(self):
        self.kartu("`curves`")
        p = self.cb / "01-motion-camera-transitions/63-contoh.md"
        p.write_text(p.read_text(encoding="utf-8").replace("fungsi: [langkah, bukti]\n", ""), encoding="utf-8")
        rc, out = self.cek(); self.assertNotEqual(rc, 0); self.assertIn("frontmatter kurang: fungsi", out)

    def test_nilai_sah_lolos(self):
        self.kartu("`curves`", fungsi="[hook, penutup, qc]")
        rc, out = self.cek("--ketat"); self.assertEqual(rc, 0, out)


class VaultInfo(Pohon):
    def test_bagian_vault_hilang_hanya_info(self):
        self.kartu("`curves`", vault="../_vault/01-camera-and-transitions/63-contoh.md")
        self.vault(isi=VAULT_LENGKAP.replace("- **Kenapa bekerja:** karena.\n", ""))
        rc, out = self.cek("--ketat")
        self.assertEqual(rc, 0, out); self.assertIn("VAULT (info)", out); self.assertIn("Kenapa bekerja", out)
        self.assertIn("0 GAGAL", out)

    def test_vault_lengkap_tanpa_info_bagian(self):
        self.kartu("`curves`", vault="../_vault/01-camera-and-transitions/63-contoh.md"); self.vault()
        rc, out = self.cek("--ketat"); self.assertEqual(rc, 0); self.assertNotIn("VAULT (info)", out)

    def test_yatim_dicetak_sebagai_info(self):
        self.kartu("`curves`"); self.vault("77-yatim.md")
        rc, out = self.cek("--ketat"); self.assertEqual(rc, 0, out)
        self.assertIn("VAULT (info) yatim", out); self.assertIn("77", out)

    def test_kartu_naskah_S_butuh_inti_atau_kerangka_saja(self):
        self.kartu("`curves`"); self.vault("S01-contoh.md", "---\nid: \"S01\"\ndilihat_bergerak: ya\n---\n**Inti struktur (1 kalimat):** x\n")
        rc, out = self.cek(); self.assertNotIn("S01-contoh.md: tidak ada", out)


class CatalogDuplikat(Pohon):
    def test_alias_duplikat_dijelaskan_dan_penyebut(self):
        self.kartu("`curves`", id_="M18", alias='"9", "42"')
        self.cek(); cat = (self.cb / "CATALOG.md").read_text(encoding="utf-8")
        self.assertIn("9 = duplikat dari 71", cat); self.assertIn("42 = duplikat dari 71", cat)
        self.assertIn("1 kartu aktif · 0 kartu vault · 2 id duplikat", cat)

    def test_alias_dengan_berkas_vault_tidak_disebut_duplikat(self):
        self.kartu("`curves`", id_="M18", alias='"9"'); self.vault("09-ada.md")
        self.cek(); self.assertNotIn("duplikat dari", (self.cb / "CATALOG.md").read_text(encoding="utf-8"))


class RepoAsli(unittest.TestCase):
    def jalan(self, *a):
        o = io.StringIO()
        with contextlib.redirect_stdout(o):
            rc = cb.cmd_cek(list(a))
        return rc, o.getvalue()

    def test_cek_ketat_nol_gagal(self):
        rc, out = self.jalan("--ketat"); self.assertEqual(rc, 0, out); self.assertIn("44 kartu · 0 GAGAL", out)

    def test_catalog_menyebut_duplikat_dari_71(self):
        cat = (Path(cb.CB) / "CATALOG.md").read_text(encoding="utf-8")
        self.assertIn("duplikat dari 71", cat); self.assertIn("44 kartu aktif · 97 kartu vault · 10 id duplikat", cat)
        self.assertEqual(cat.count("ID | Pola | Narrative trigger | Kategori | Status | Path"), 1)

    def test_44_kartu_asli_punya_fungsi_sah(self):
        for c in cb.load_cards():
            self.assertTrue(set(c["fm"]["fungsi"]) <= set(cb.FUNGSI), c["rel"]); self.assertTrue(1 <= len(c["fm"]["fungsi"]) <= 3, c["rel"])

    def test_vault_tetap_97(self):
        self.assertEqual(len(list((Path(cb.CB) / "_vault").glob("*/*.md"))), 97)

    def test_kartu_63_dan_80_menunjuk_komponen_yang_ada(self):
        for f in ("01-motion-camera-transitions/63-virtual-camera-desktop-stage.md", "01-motion-camera-transitions/80-camera-walk-word-canvas.md"):
            t = (Path(cb.CB) / f).read_text(encoding="utf-8")
            line = [l for l in t.splitlines() if l.startswith("- **Primitives/Ref:**")][0]
            self.assertIn("scripts/remotion/ae-primitives/kamera/SpatialAnchorCamera.tsx", line); self.assertNotIn("Papan.tsx", line)


if __name__ == "__main__":
    unittest.main()
