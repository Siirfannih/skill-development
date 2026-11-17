#!/usr/bin/env python3
"""tools/sumber_cek.py: tanda sumber ditolak di file instruksi, contoh tanpa nama/tanggal dan tanggal ukur data lolos."""
import os, subprocess, sys, tempfile, unittest

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))
ALAT = os.path.join(ROOT, "tools", "sumber_cek.py")


def jalankan(teks):
    with tempfile.NamedTemporaryFile("w", suffix=".md", delete=False, encoding="utf-8") as f:
        f.write(teks)
    try:
        return subprocess.run([sys.executable, ALAT, f.name], capture_output=True, text=True).returncode
    finally:
        os.unlink(f.name)


class SumberCek(unittest.TestCase):
    def test_tanda_sumber_ditolak(self):
        for teks in ("Teks maksimal 2 baris (Irfan 9 Nov).", "Fade hanya untuk sub (gagal: proyek v3).",
                     "v17 (Irfan 19:20): comfort first.", "Gagal pertama: tiga klip memakai satu piano.",
                     "Sumber: Irfan16Nov, P1 R022.", "Permintaan Irfan 25 Okt 2026: jangan diterima mentah."):
            self.assertEqual(jalankan(teks), 1, teks)

    def test_instruksi_dan_data_lolos(self):
        for teks in ("Teks maksimal 2 baris, tidak terpotong tepi.", "Contoh gagal: 324 cue dalam 95 dtk.",
                     "# Pembanding · dicek 7 Nov 2026", "Laporkan hasilnya ke Irfan.", "Bila gagal: pindahkan teks."):
            self.assertEqual(jalankan(teks), 0, teks)

    def test_repo_bersih(self):
        r = subprocess.run([sys.executable, ALAT], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout[-2000:])


if __name__ == "__main__":
    unittest.main()
