#!/usr/bin/env python3
"""Cek profil merek (tahap 1): BRAND.md dan EDITING.md terisi, nilai pasti benar bentuknya, aset yang dirujuk ada.

  python3 profil_cek.py <folder data>/merek/<slug-merek>

Yang dicek (bentuk, bukan selera):
  - BRAND.md dan EDITING.md ada, masing-masing punya blok YAML di atas (--- … ---)
  - BRAND: merek, slug, warna.latar/teks/aksen, huruf.judul/isi, logo.terang/gelap terisi (bukan "?" atau "<…>")
  - semua warna yang terisi berbentuk hex #RRGGBB
  - file font dan logo yang dirujuk benar-benar ada di folder merek
  - EDITING: kiblat_kartu terisi minimal satu
  - tidak ada placeholder template ("<…>") tersisa di teks
Nilai opsional boleh "?". Exit 1 bila ada yang gagal; pesan menyebut apa yang harus ditanyakan ke user.
Butuh PyYAML (python3 -m pip install pyyaml).
"""
import os, re, sys

try:
    import yaml
except ImportError:
    sys.exit("GAGAL: PyYAML belum terpasang: python3 -m pip install pyyaml")

HEX = re.compile(r"^#[0-9A-Fa-f]{6}$")
KOSONG = lambda v: v is None or (isinstance(v, str) and (v.strip() in ("", "?") or v.strip().startswith("<")))


def baca(path):
    if not os.path.exists(path):
        return None, None
    s = open(path, encoding="utf-8").read()
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", s, re.S)
    if not m:
        return {}, s
    return (yaml.safe_load(m.group(1)) or {}), m.group(2)


def ambil(d, jalur):
    for k in jalur.split("."):
        if not isinstance(d, dict):
            return None
        d = d.get(k)
    return d


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    folder = sys.argv[1].rstrip("/")
    gagal = []
    b, b_teks = baca(os.path.join(folder, "BRAND.md"))
    e, e_teks = baca(os.path.join(folder, "EDITING.md"))
    if b is None: gagal.append("BRAND.md tidak ada (salin dari templates/merek/BRAND.md)")
    if e is None: gagal.append("EDITING.md tidak ada (salin dari templates/merek/EDITING.md)")
    if b is not None:
        if b == {}: gagal.append("BRAND.md tanpa blok YAML di atas")
        for k in ("merek", "slug", "warna.latar", "warna.teks", "warna.aksen", "huruf.judul.keluarga",
                  "huruf.isi.keluarga", "logo.terang", "logo.gelap"):
            if KOSONG(ambil(b, k)): gagal.append(f"BRAND {k} belum diisi → tanyakan ke user atau cari di aset/situs/repo mereknya")
        for k, v in (b.get("warna") or {}).items():
            if not KOSONG(v) and not HEX.match(str(v)): gagal.append(f"BRAND warna.{k} = {v!r} bukan hex #RRGGBB")
        rujukan = [ambil(b, f"huruf.{p}.file") for p in ("judul", "isi", "aksen")] + [ambil(b, "logo.terang"), ambil(b, "logo.gelap")]
        for r in rujukan:
            if not KOSONG(r) and not os.path.exists(os.path.join(folder, str(r))):
                gagal.append(f"BRAND merujuk {r} tetapi filenya tidak ada di {folder}")
        if b_teks and re.search(r"<[^>\n]{2,}>", b_teks): gagal.append("BRAND masih berisi placeholder <…> di teks")
    if e is not None:
        if e == {}: gagal.append("EDITING.md tanpa blok YAML di atas")
        kk = e.get("kiblat_kartu") or []
        if not [x for x in kk if not KOSONG(str(x))]:
            gagal.append("EDITING kiblat_kartu kosong → tunjukkan frame kunci 2–3 kartu terdekat dan tanyakan pilihan user")
        if e_teks and re.search(r"<[^>\n]{2,}>", e_teks): gagal.append("EDITING masih berisi placeholder <…> di teks")
    for g in gagal:
        print("  X " + g)
    if gagal:
        print(f"GAGAL: {len(gagal)} butir profil {folder} belum siap.")
        sys.exit(1)
    print(f"LULUS: profil {b.get('merek')} siap dipakai.")


if __name__ == "__main__":
    main()
