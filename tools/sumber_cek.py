#!/usr/bin/env python3
"""Tolak tanda sumber dan cerita kegagalan di file instruksi (AGENTS.md §Akhir sesi butir 2).

File instruksi berisi apa yang dikerjakan, kapan berlaku, dan cara mengeceknya. Siapa yang meminta, kapan, dan kejadian
yang melahirkan aturan dicatat di SUMBER.md skill itu (file tingkat repo: SUMBER.md di root).

  python3 tools/sumber_cek.py           daftar pelanggaran (file:baris), keluar 1 bila ada
  python3 tools/sumber_cek.py <file>…   cek file tertentu saja

Yang ditolak: "(Irfan 4 Nov)", "Irfan 16 Nov: …", "(Irfan 19:20)", "(gagal: proyek v3)", "Gagal pertama: …".
Yang boleh: contoh salah tanpa nama dan tanggal, tanggal ukur data ("dicek 7 Nov 2026"), nama proyek sebagai path.
"""
import glob, os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
BULAN = r"(?:Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des)\w*"
POLA = [
    re.compile(r"Irfan(?: oke)?,? ?\d{1,2}(?:[–-]\d{1,2})?(?:, ?\d{1,2})* ?" + BULAN),   # Irfan 4 Nov · Irfan16Nov · Irfan 1, 8 Nov
    re.compile(r"Irfan,? \d{1,2}[.:]\d{2}\b"),                                           # Irfan 19:20
    re.compile(r"(?:^|[.;>(]\s*)Irfan: \""),                                                      # Irfan: "kutipan"
    re.compile(r"\(gagal:"),
    re.compile(r"\b[Gg]agal (?:pertama|sebelumnya|yang membentuk)\b"),
    re.compile(r"\b(?:Permintaan|Koreksi(?: langsung)?|Disetujui|Diputuskan) Irfan[^.]{0,20}\d{1,2} " + BULAN),
]
INSTRUKSI = ["AGENTS.md", "README.md", "INDEX.md", "PETA.md", "scriptwriter/README.md", "content-ops/README.md",
             "claude/**/*.md", "claude/**/*.py", "claude/**/*.sh", "claude/**/*.ts", "claude/**/*.tsx",
             "tools/*.py", "tools/*.sh"]
# riwayat, data, dan bukti: tempatnya memang di sini
LEWAT = ("SUMBER.md", "RETRO.md", "/evals/", "/tests/", "/guide/referensi/", "/guide/produk/", "/contoh-gagal/",
         "/engines/", "/node_modules/", "tools/sumber_cek.py")


def daftar():
    out = set()
    for p in INSTRUKSI:
        out.update(glob.glob(os.path.join(ROOT, p), recursive=True))
    return sorted(f for f in out if os.path.isfile(f) and not any(x in f.replace(ROOT + "/", "") for x in LEWAT))


def cek(path):
    temuan = []
    for n, baris in enumerate(open(path, encoding="utf-8", errors="ignore"), 1):
        for pola in POLA:
            m = pola.search(baris)
            if m:
                temuan.append((n, m.group(0)))
                break
    return temuan


if __name__ == "__main__":
    files = [os.path.abspath(a) for a in sys.argv[1:]] or daftar()
    jumlah = 0
    for f in files:
        for n, kutip in cek(f):
            print(f"{os.path.relpath(f, ROOT)}:{n}: {kutip}")
            jumlah += 1
    print(f"sumber_cek: {jumlah} tanda sumber di {len(files)} file instruksi" + ("" if jumlah else " (bersih)"))
    sys.exit(1 if jumlah else 0)
