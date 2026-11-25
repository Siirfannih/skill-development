#!/usr/bin/env python3
"""Gerbang fail-closed: cek_komposisi (WAJAH/INSET/TEPI/ASET memblokir), audio_phone --gate, sfx_comfort --min-comfort,
sfx_potong --laporan, dan sambungannya di render.sh lewat gerbang_produksi.sh."""
import json, os, stat, subprocess, sys, tempfile, unittest
from pathlib import Path

import numpy as np
import soundfile as sf

S = Path(__file__).resolve().parents[1]
KOMPOSISI = S / "gate/cek_komposisi.py"; PHONE = S / "audio/audio_phone.py"; COMFORT = S / "audio/sfx_comfort.py"
POTONG = S / "audio/sfx_potong.py"; PRODUKSI = S / "juri/gerbang_produksi.sh"; RENDER = S / "juri/render.sh"
FONT = next((p for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
                         "/usr/share/fonts/TTF/DejaVuSans-Bold.ttf", "/Library/Fonts/Arial Bold.ttf", "/System/Library/Fonts/Supplemental/Arial Bold.ttf")
             if os.path.exists(p)), None)
SR = 48000


def run(*a, **k):
    return subprocess.run([str(x) for x in a], capture_output=True, text=True, **k)


def episode(**ubah):
    """Episode minimal yang bersih: footage tanpa wajah + KT di zona aman, lalu kanvas napas."""
    ep = {"durasi": 8.0,
          "adegan": [{"id": "01", "dari": 0, "sampai": 4, "lapisan": [{"k": "gambar", "src": "ep/foto.jpg"}]},
                     {"id": "02", "dari": 4, "sampai": 8, "masuk": "whip", "invert": [4, 4.1], "lapisan": [{"k": "kanvas", "warna": "gelap"}]}],
          "kt": [{"peran": "r2", "dari": 0.5, "sampai": 3.5, "x": 960, "y": 700, "jangkar": "tengah", "teks": "satu kata"},
                 {"peran": "napas", "dari": 4.1, "sampai": 7.5, "x": 960, "y": 400, "jangkar": "tengah", "teks": "NAPAS"}]}
    ep.update(ubah); return ep


@unittest.skipUnless(FONT, "tidak ada font TTF sistem untuk mengukur lebar teks")
class CekKomposisi(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name); (self.d / "public/ep").mkdir(parents=True)
        self.aset({"foto.jpg": {"w": 1920, "h": 1080, "wajah": []}})

    def tearDown(self): self.t.cleanup()

    def aset(self, isi): (self.d / "public/ep/aset.json").write_text(json.dumps(isi))

    def cek(self, ep, *flag, font=True):
        f = self.d / "ep.json"; f.write_text(json.dumps(ep))
        return run(sys.executable, KOMPOSISI, f, "--public", self.d / "public", *(("--font-tebal", FONT, "--font-sedang", FONT) if font else ()), *flag)

    def test_episode_bersih_lulus(self):
        r = self.cek(episode()); self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertIn("LULUS", r.stdout)
        self.assertEqual(self.cek(episode(), "--ketat").returncode, 0)

    def test_tepi_memblokir(self):
        ep = episode(); ep["kt"][0].update(x=30, jangkar="kiri")
        r = self.cek(ep); self.assertEqual(r.returncode, 1); self.assertIn("TEPI", r.stdout)

    def test_wajah_memblokir(self):
        self.aset({"foto.jpg": {"w": 1920, "h": 1080, "wajah": [[0.4, 0.55, 0.2, 0.25]]}})
        r = self.cek(episode()); self.assertEqual(r.returncode, 1); self.assertIn("WAJAH", r.stdout)

    def test_wajah_di_luar_kotak_teks_lulus(self):
        self.aset({"foto.jpg": {"w": 1920, "h": 1080, "wajah": [[0.05, 0.1, 0.12, 0.2]]}})
        ep = episode(); ep["kt"][0]["dekat"] = False
        r = self.cek(ep); self.assertEqual(r.returncode, 0, r.stdout)

    def test_inset_kecil_di_kanvas_memblokir(self):
        ep = episode(); ep["adegan"][1]["lapisan"].append({"k": "inset", "src": "ep/foto.jpg", "x": 100, "y": 100, "w": 400, "h": 300})
        r = self.cek(ep); self.assertEqual(r.returncode, 1); self.assertIn("INSET", r.stdout)

    def test_aset_tanpa_peta_wajah_memblokir(self):
        self.aset({})
        r = self.cek(episode()); self.assertEqual(r.returncode, 1); self.assertIn("ASET", r.stdout)

    def test_font_tidak_ada_gagal(self):
        r = self.cek(episode(), font=False); self.assertEqual(r.returncode, 1); self.assertIn("font tidak ditemukan", r.stdout)

    def test_bukan_data_episode_gagal(self):
        f = self.d / "x.json"; f.write_text("{}")
        self.assertEqual(run(sys.executable, KOMPOSISI, f, "--public", self.d / "public").returncode, 1)

    def test_jeda_kosong_peringatan_dan_memblokir_bila_ketat(self):
        ep = episode(); ep["kt"][1]["dari"] = 4.8
        r = self.cek(ep); self.assertEqual(r.returncode, 0, r.stdout); self.assertIn("PERINGATAN JEDA", r.stdout)
        r = self.cek(ep, "--ketat"); self.assertEqual(r.returncode, 1); self.assertIn("JEDA", r.stdout)
        ep["adegan"][1]["jeda_sengaja"] = "hening sebelum pelajaran"
        self.assertEqual(self.cek(ep, "--ketat").returncode, 0)

    def test_jeda_tidak_dituntut_di_adegan_mode_visual(self):
        ep = episode(); ep["kt"][1]["dari"] = 4.8
        self.assertEqual(self.cek(ep, "--ketat").returncode, 1)
        ep["adegan"][1]["mode_teks"] = "VISUAL"
        self.assertEqual(self.cek(ep, "--ketat").returncode, 0)

    def test_blok_memilih_sebagian_dan_menolak_tanda_asing(self):
        ep = episode(); ep["kt"][1].update(dari=5.0)
        self.assertEqual(self.cek(ep, "--blok", "WAJAH,INSET,TEPI,ASET,PITA").returncode, 0)
        r = self.cek(ep, "--blok", "WAJAH,INSET,TEPI,ASET,jeda"); self.assertEqual(r.returncode, 1); self.assertIn("JEDA", r.stdout)
        r = self.cek(episode(), "--blok", "WAJAH,SALAH"); self.assertEqual(r.returncode, 1); self.assertIn("tanda tak dikenal: SALAH", r.stdout)

    def test_pita_subtitle_bersama_kt_memblokir_bila_ketat(self):
        ep = episode(sub=[{"dari": 0, "sampai": 4, "teks": "terjemahan"}])
        self.assertEqual(self.cek(ep).returncode, 0)
        r = self.cek(ep, "--ketat"); self.assertEqual(r.returncode, 1); self.assertIn("PITA", r.stdout)

    def test_tiga_kanvas_napas_identik_berurutan(self):
        ad = [{"id": "f", "dari": 0, "sampai": 2, "lapisan": [{"k": "gambar", "src": "ep/foto.jpg"}], "masuk": "grid"}]
        kt = []
        for n, t in enumerate((2, 4, 6)):
            ad.append({"id": f"n{n}", "dari": t, "sampai": t + 2, "masuk": "whip", "lapisan": [{"k": "kanvas", "warna": "terang"}]})
            kt.append({"peran": "napas", "dari": t + 0.1, "sampai": t + 1.9, "x": 960, "y": 400, "jangkar": "tengah", "teks": f"KATA {n}"})
        ep = {"durasi": 8.0, "adegan": ad, "kt": kt}
        r = self.cek(ep, "--ketat"); self.assertEqual(r.returncode, 1); self.assertIn("KARTU", r.stdout)
        ad[3]["lapisan"][0]["warna"] = "gelap"
        r = self.cek(ep, "--ketat"); self.assertNotIn("KARTU", r.stdout)

    def test_teks_di_atas_logo_ramai(self):
        self.aset({"foto.jpg": {"w": 1920, "h": 1080, "wajah": [], "ramai": [[0.3, 0.55, 0.4, 0.3]]}})
        r = self.cek(episode(), "--ketat"); self.assertEqual(r.returncode, 1); self.assertIn("LOGO", r.stdout)
        ep = episode(); ep["adegan"][0]["lapisan"][0]["grade"] = "blurkuat"
        self.assertNotIn("LOGO", self.cek(ep, "--ketat").stdout)


def bicara(n, rng):
    """Derau pita bicara 300-3000 Hz dengan amplop suku kata."""
    import scipy.signal as ss
    x = ss.sosfilt(ss.butter(4, [300, 3000], "band", fs=SR, output="sos"), rng.standard_normal(n))
    return 0.25 * x / np.abs(x).max() * (0.6 + 0.4 * np.sin(2 * np.pi * 3 * np.arange(n) / SR))


class AudioPhoneGate(unittest.TestCase):
    def tulis(self, d, harsh=False, musik_keras=False):
        import scipy.signal as ss
        rng = np.random.default_rng(1); n = SR * 6; t = np.arange(n) / SR
        vo = bicara(n, rng)
        mu = (0.2 * ss.sosfilt(ss.butter(4, [300, 3000], "band", fs=SR, output="sos"), rng.standard_normal(n)) if musik_keras
              else 0.01 * np.sin(2 * np.pi * 440 * t))
        fx = np.zeros(n); i = SR * 2; w = int(0.16 * SR); env = np.hanning(w)
        fx[i:i + w] = (0.9 * np.sin(2 * np.pi * 4000 * t[:w]) if harsh else 0.05 * np.sin(2 * np.pi * 700 * t[:w])) * env
        for nama, y in (("stem_vo", vo), ("stem_music", mu), ("stem_sfx", fx), ("mix", vo + mu + fx)):
            sf.write(f"{d}/{nama}.wav", y, SR)
        json.dump([{"t": 2.0, "peran": "aksen", "alasan": "objek muncul"}], open(f"{d}/cues.json", "w"))

    def test_mix_bersih_lulus(self):
        with tempfile.TemporaryDirectory() as d:
            self.tulis(d); r = run(sys.executable, PHONE, "--root", d, "--gate")
            self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertIn("GERBANG audio_phone: LULUS", r.stdout)

    def test_sfx_harsh_gagal_dan_tanpa_flag_tetap_laporan(self):
        with tempfile.TemporaryDirectory() as d:
            self.tulis(d, harsh=True)
            r = run(sys.executable, PHONE, "--root", d, "--gate")
            self.assertEqual(r.returncode, 1, r.stdout + r.stderr); self.assertIn("SFX harsh", r.stdout)
            r = run(sys.executable, PHONE, "--root", d)
            self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertNotIn("GERBANG", r.stdout)

    def test_vo_tenggelam_gagal(self):
        with tempfile.TemporaryDirectory() as d:
            self.tulis(d, musik_keras=True); r = run(sys.executable, PHONE, "--root", d, "--gate")
            self.assertEqual(r.returncode, 1, r.stdout + r.stderr); self.assertIn("median VO clarity", r.stdout)

    def test_stem_hilang_gagal(self):
        with tempfile.TemporaryDirectory() as d:
            self.assertNotEqual(run(sys.executable, PHONE, "--root", d, "--gate").returncode, 0)


class SfxComfortGate(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); d = self.t.name; sr = 44100; t = np.arange(sr) / sr
        self.lembut, self.kasar = f"{d}/lembut.wav", f"{d}/kasar.wav"
        sf.write(self.lembut, 0.5 * np.sin(2 * np.pi * 220 * t) * np.hanning(sr), sr)
        rng = np.random.default_rng(2)
        sf.write(self.kasar, 0.5 * rng.standard_normal(sr) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 70 * t))), sr)
        stub = f"{d}/earshot"; open(stub, "w").write("#!/bin/sh\nexit 0\n"); os.chmod(stub, os.stat(stub).st_mode | stat.S_IEXEC)
        self.env = {**os.environ, "EARSHOT": stub, "MG_ROOT": d}

    def tearDown(self): self.t.cleanup()

    def test_fungsi_ambang(self):
        sys.path.insert(0, str(S / "audio"))
        try:
            import sfx_comfort
        finally:
            sys.path.pop(0)
        self.assertEqual(sfx_comfort.di_bawah_ambang({"a": 0.5, "b": -2.0, "c": None}, -1.0), [("c", None), ("b", -2.0)])
        self.assertEqual(sfx_comfort.di_bawah_ambang({"a": 0.5}, -1.0), [])

    def test_file_di_bawah_ambang_gagal(self):
        r = run(sys.executable, COMFORT, "--min-comfort", "-1.5", self.lembut, self.kasar, env=self.env)
        self.assertEqual(r.returncode, 1, r.stdout + r.stderr); self.assertIn("DI BAWAH AMBANG  kasar.wav", r.stdout)
        self.assertNotIn("DI BAWAH AMBANG  lembut.wav", r.stdout)

    def test_semua_di_atas_ambang_lulus(self):
        r = run(sys.executable, COMFORT, self.lembut, "--min-comfort", "-1.5", env=self.env)
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertIn("LULUS", r.stdout)

    def test_tanpa_flag_tetap_keluar_nol(self):
        r = run(sys.executable, COMFORT, self.lembut, self.kasar, env=self.env)
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertNotIn("GERBANG", r.stdout)

    def test_flag_tanpa_angka_gagal(self):
        self.assertNotEqual(run(sys.executable, COMFORT, self.lembut, "--min-comfort", env=self.env).returncode, 0)


BAIK = {"mode": "lembah", "mulai_s": 0.4, "fade_ms": 15, "db_vs_puncak": -30.0, "dibuang_s": 0.2}
KERAS = {"mode": "fade-panjang", "mulai_s": 0.4, "fade_ms": 40, "db_vs_puncak": -6.0, "dibuang_s": 0.2}


class SfxPotongLaporan(unittest.TestCase):
    def cek(self, isi):
        with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as f:
            f.write(isi if isinstance(isi, str) else json.dumps(isi))
        try:
            return run(sys.executable, POTONG, "--laporan", f.name)
        finally:
            os.unlink(f.name)

    def test_laporan(self):
        self.assertEqual(self.cek([BAIK, None]).returncode, 0)
        self.assertEqual(self.cek({"potong": [BAIK]}).returncode, 0)
        self.assertEqual(self.cek([{"t": 1.0, "file": "a.wav", "potong": BAIK}, {"t": 2.0, "file": "b.wav"}]).returncode, 0)
        r = self.cek([BAIK, KERAS]); self.assertEqual(r.returncode, 1); self.assertIn("hilang saat masih keras", r.stdout)
        self.assertEqual(self.cek([{"t": 1.0, "potong": KERAS}]).returncode, 1)

    def test_laporan_rusak_gagal(self):
        self.assertEqual(self.cek("bukan json").returncode, 1)
        self.assertEqual(self.cek({"lain": 1}).returncode, 1)
        self.assertEqual(self.cek([{"mode": "lembah"}]).returncode, 1)


class GerbangProduksi(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.p = Path(self.t.name)
        (self.p / "remotion/src/data").mkdir(parents=True); (self.p / "audio").mkdir(); (self.p / "qc").mkdir()

    def tearDown(self): self.t.cleanup()

    def jalan(self, *flag): return run("bash", PRODUKSI, *flag, self.p, self.p / "audio", sys.executable)

    def test_proyek_tanpa_file_pemicu_lulus(self):
        r = self.jalan(); self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertIn("dilewati", r.stdout)

    def test_file_format_tidak_dibaca(self):
        """Tidak ada template gaya: file FORMAT di proyek tidak mengubah apa pun, dan skrip tidak menyebut formats/."""
        (self.p / "FORMAT").write_text("campur-bebas\n")
        r = self.jalan(); self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertNotIn("format", r.stdout.lower())
        for f in (PRODUKSI, KOMPOSISI, RENDER):
            t = f.read_text()
            for x in ("formats/", "/FORMAT", "story-doc", "journey-talkinghead", "Format Bible"):
                self.assertNotIn(x, t, f"{f.name}: {x}")

    def test_ketat_tanpa_data_episode_gagal(self):
        r = self.jalan("--ketat"); self.assertEqual(r.returncode, 1); self.assertIn("butuh data episode", r.stdout)
        (self.p / "qc/ketat").write_text("")
        r = self.jalan(); self.assertEqual(r.returncode, 1); self.assertIn("butuh data episode", r.stdout)

    def proyek_dengan_jeda(self):
        pub = self.p / "remotion/public"; (pub / "ep").mkdir(parents=True); (pub / "fonts").mkdir()
        for n in ("HelveticaNeueBold.otf", "HelveticaNeueMedium.otf"):
            os.symlink(FONT, pub / "fonts" / n)
        (pub / "ep/aset.json").write_text(json.dumps({"foto.jpg": {"w": 1920, "h": 1080, "wajah": []}}))
        ep = episode(); ep["kt"][1].update(dari=5.0)
        (self.p / "remotion/src/data/ep01.json").write_text(json.dumps(ep))

    @unittest.skipUnless(FONT, "tidak ada font TTF sistem")
    def test_ketat_hanya_bila_proyek_memilih(self):
        self.proyek_dengan_jeda()
        r = self.jalan(); self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertIn("PERINGATAN JEDA", r.stdout)
        r = self.jalan("--ketat"); self.assertEqual(r.returncode, 1); self.assertIn("flag --ketat", r.stdout)
        (self.p / "qc/ketat").write_text("# semua tanda\n")
        r = self.jalan(); self.assertEqual(r.returncode, 1); self.assertIn("semua tanda memblokir (qc/ketat)", r.stdout)

    @unittest.skipUnless(FONT, "tidak ada font TTF sistem")
    def test_qc_ketat_berisi_daftar_tanda(self):
        self.proyek_dengan_jeda()
        (self.p / "qc/ketat").write_text("pita, logo  # tanpa JEDA\n")
        r = self.jalan(); self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertIn("bawaan + PITA LOGO", r.stdout)
        (self.p / "qc/ketat").write_text("JEDA\nKARTU\n")
        r = self.jalan(); self.assertEqual(r.returncode, 1); self.assertNotIn("PERINGATAN JEDA", r.stdout)
        (self.p / "qc/ketat").write_text("JEDAA\n")
        r = self.jalan(); self.assertEqual(r.returncode, 1); self.assertIn("tanda tak dikenal: JEDAA", r.stdout)

    def test_laporan_potong_gagal_memblokir(self):
        (self.p / "audio/sfx_potong.json").write_text(json.dumps([KERAS]))
        r = self.jalan(); self.assertEqual(r.returncode, 1); self.assertIn("GAGAL gerbang potong SFX", r.stdout)
        (self.p / "audio/sfx_potong.json").write_text(json.dumps([BAIK])); self.assertEqual(self.jalan().returncode, 0)

    def test_stem_tanpa_mix_memblokir(self):
        for n in ("stem_vo", "stem_music", "stem_sfx"):
            sf.write(str(self.p / f"qc/{n}.wav"), np.zeros(SR), SR)
        r = self.jalan(); self.assertEqual(r.returncode, 1); self.assertIn("GAGAL gerbang speaker HP", r.stdout)

    @unittest.skipUnless(FONT, "tidak ada font TTF sistem")
    def test_komposisi_gagal_memblokir(self):
        pub = self.p / "remotion/public"; (pub / "ep").mkdir(parents=True); (pub / "fonts").mkdir()
        for n in ("HelveticaNeueBold.otf", "HelveticaNeueMedium.otf"):
            os.symlink(FONT, pub / "fonts" / n)
        (pub / "ep/aset.json").write_text(json.dumps({"foto.jpg": {"w": 1920, "h": 1080, "wajah": []}}))
        (self.p / "remotion/src/data/lain.json").write_text("[1, 2]")
        f = self.p / "remotion/src/data/ep01.json"; f.write_text(json.dumps(episode()))
        r = self.jalan(); self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertIn("ep01.json", r.stdout)
        ep = episode(); ep["kt"][0].update(x=30, jangkar="kiri"); f.write_text(json.dumps(ep))
        r = self.jalan(); self.assertEqual(r.returncode, 1); self.assertIn("GAGAL gerbang komposisi", r.stdout)

    def test_render_sh_memanggil_gerbang_dan_menolak_render(self):
        s = RENDER.read_text()
        baris = next(b for b in s.splitlines() if "gerbang_produksi.sh" in b and not b.lstrip().startswith("#"))
        self.assertIn('"$P" "$AUDIO_DIR" "$PYTHON_BIN"', baris); self.assertIn("gagal=1", baris)
        self.assertLess(s.index(baris), s.index('[ "$gagal" = 0 ] || { echo "Render penuh ditolak."; exit 1; }'))


if __name__ == "__main__":
    unittest.main()
