#!/usr/bin/env python3
"""Cek profil merek (tahap Brief): BRAND.md dan EDITING.md terisi, nilai pasti benar bentuknya, aset yang dirujuk ada.

  python3 profil_cek.py <folder data>/merek/<slug-merek>

Yang dicek (bentuk, bukan selera):
  - BRAND.md dan EDITING.md ada, masing-masing punya blok YAML di atas (--- … ---)
  - BRAND: merek, slug, warna.latar/teks/aksen, huruf.judul/isi, logo.terang/gelap terisi (bukan "?" atau "<…>")
  - semua warna yang terisi berbentuk hex #RRGGBB
  - file font dan logo yang dirujuk benar-benar ada di folder merek (logo "tidak ada" = user memastikan merek tanpa logo)
  - EDITING: kiblat_kartu terisi minimal satu
  - tidak ada placeholder template ("<…>") tersisa di teks
Nilai opsional boleh "?". Exit 1 bila ada yang gagal; pesan menyebut apa yang harus ditanyakan ke user.

NEGATIF v2 (claude/_bersama/NEGATIF.md): tidak ada teknik yang ditolak karena namanya. Profil ditolak hanya bila:
  - huruf kedua (slot `huruf.huruf_kedua`, slot lama `huruf.aksen`, atau teks yang menyebut serif/italic/script/tulisan tangan/huruf kedua) ada
    tetapi TANPA peran dan frekuensi: `huruf_kedua: {keluarga, peran, frekuensi}`. Serif sebagai keluarga utama (judul/isi) tidak ditolak;
  - token gradien tidak punya keluarga hue yang terdefinisi: gradien dengan > 2 keluarga hue, stop tanpa warna terukur (hex/rgb),
    atau kata "gradien" tanpa definisi (fungsi gradient(...) atau kalimat yang menyebut hue + hex). Bayangan, kilau, dan glow tidak ditolak di sini;
    halo di belakang teks dan sup material dinilai `scripts/banding.py` terhadap REF-SPEC.
Baris yang bukan klaim (berkata "jangan/tanpa/tidak/dilarang/bukan/hindari") dilewati.
Butuh PyYAML (python3 -m pip install pyyaml).
"""
import os, re, sys

try:
    import yaml
except ImportError:
    sys.exit("GAGAL: PyYAML belum terpasang: python3 -m pip install pyyaml")

HEX = re.compile(r"^#[0-9A-Fa-f]{6}$")
NEGASI = re.compile(r"\b(?:jangan|tanpa|tidak|dilarang|bukan|hindari|larangan|ditolak|never|no)\b", re.I)
SERIF_NAMA = re.compile(r"(?<![A-Za-z])(?:Instrument\s?Serif|Playfair|Didot|Bodoni|Fraunces|Cormorant|Garamond|Baskerville|Merriweather|Newsreader|Libre\s?Caslon|"
                        r"Editorial\s?New|Noto\s?Serif|PT\s?Serif|Source\s?Serif|DM\s?Serif|Crimson\s?(?:Text|Pro))|(?<![\w-])(?:Georgia|Times(?:\s?New\s?Roman)?|Lora)(?![\w-])", re.I)
SERIF_GEN = re.compile(r"(?<!sans)(?<!sans-)(?<!sans_)(?<![A-Za-z])serif", re.I)
SCRIPT = re.compile(r"(?<![A-Za-z])(?:script|handwriting|Pacifico|Lobster|Great\s?Vibes|Sacramento|Allura|Satisfy|Kaushan|Yellowtail)(?![A-Za-z])", re.I)
ITALIC = re.compile(r"(?<![A-Za-z])(?:italic|oblique)(?![A-Za-z])|-Italic\.", re.I)
GRADIEN = re.compile(r"gradien|gradient", re.I)


def _top_split(t, sep=","):
    d, cur, out = 0, "", []
    for ch in t:
        if ch == "(": d += 1
        elif ch == ")": d -= 1
        if ch == sep and d == 0: out.append(cur); cur = ""
        else: cur += ch
    return out + [cur] if cur.strip() else out


def _warna(t):
    """Semua warna terukur (hex #RGB/#RRGGBB atau rgb()) di teks, sebagai (r,g,b) 0-255."""
    out = []
    for m in re.finditer(r"#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b|rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)", t):
        if m.group(1):
            h = m.group(1); h = "".join(c * 2 for c in h) if len(h) == 3 else h
            out.append(tuple(int(h[i:i + 2], 16) for i in (0, 2, 4)))
        else:
            out.append(tuple(min(255, int(m.group(i))) for i in (2, 3, 4)))
    return out


def keluarga_hue(warna, toleransi=40):
    """Jumlah keluarga hue (netral tidak dihitung). Klaster hue melingkar dengan lebar `toleransi` derajat."""
    import colorsys
    hues = []
    for r, g, b in warna:
        h, sat, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        if sat >= 0.12 and v >= 0.10: hues.append(h * 360)
    pusat = []
    for h in hues:
        if not any(min(abs(h - c), 360 - abs(h - c)) <= toleransi for c in pusat): pusat.append(h)
    return len(pusat)


def _gradien_ok(baris):
    """Gradien di baris ini punya keluarga hue terdefinisi: semua stop warna terukur dan <= 2 keluarga hue (+ netral).
    Atau kalimat tanpa fungsi gradient() yang menyebut 'hue' dan minimal satu hex."""
    m = list(re.finditer(r"([\w-]*gradient)\s*\(", baris, re.I))
    if not m:
        return bool(re.search(r"hue", baris, re.I)) and bool(_warna(baris))
    for k in m:
        i, d = k.end(), 1; j = i
        while j < len(baris) and d:
            d += (baris[j] == "(") - (baris[j] == ")"); j += 1
        stops = [x for x in _top_split(baris[i:j - 1]) if not re.fullmatch(r"\s*(?:(?:to|at|from)\s[\w\s%.-]+|circle|ellipse|-?[\d.]+(?:deg|turn|rad))\s*", x)]
        stop_warna = [_warna(x) for x in stops]
        if len(stops) < 2 or any(not w for w in stop_warna): return False     # stop tanpa warna terukur = keluarga hue tak terdefinisi
        if keluarga_hue([w[0] for w in stop_warna]) > 2: return False
    return True


def cek_negatif(teks, nama, ada_huruf_kedua=False):
    """Temuan v2 di teks profil: huruf kedua tanpa slot lengkap, gradien tanpa keluarga hue. Baris yang menafikan dilewati."""
    gagal = []
    for n, b in enumerate(teks.splitlines(), 1):
        if NEGASI.search(b): continue
        if re.match(r"\s*(?:judul|isi):", b): continue     # keluarga utama (serif sekalipun) bukan huruf kedua
        ada = lambda pola: pola.search(b)
        if (ada(SERIF_NAMA) or ada(SERIF_GEN) or ada(ITALIC) or ada(SCRIPT)) and not ada_huruf_kedua:
            gagal.append(f"{nama}:{n} huruf kedua (serif/italic/script/tulisan tangan) disebut tanpa slot huruf_kedua {{keluarga, peran, frekuensi}} (NEGATIF 1): tulis perannya dan seberapa sering")
        if ada(GRADIEN) and not _gradien_ok(b):
            gagal.append(f"{nama}:{n} gradien tanpa keluarga hue yang terdefinisi (NEGATIF 2): tulis linear-gradient(...) dengan stop hex/rgb (<= 2 keluarga hue + netral), atau kalimat yang menyebut hue + hex")
    return gagal


def cek_huruf_kedua(b):
    """Slot huruf kedua: bila keluarga terisi, peran dan frekuensi wajib. Mengembalikan (ada_terisi, daftar_gagal)."""
    hasil, ada = [], False
    for jalur in ("huruf.huruf_kedua", "huruf_kedua", "huruf.aksen"):
        v = ambil(b, jalur)
        if v is None or KOSONG(v): continue
        if not isinstance(v, dict):
            ada = True; hasil.append(f"BRAND {jalur} = {v!r}: tulis sebagai {{keluarga, peran, frekuensi}}"); continue
        if KOSONG(v.get("keluarga")): continue
        ada = True
        for k in ("peran", "frekuensi"):
            w = v.get(k)
            if w is None or str(w).strip() in ("", "?") or re.fullmatch(r"<[^>]*>", str(w).strip()): hasil.append(f"BRAND {jalur}.{k} kosong: huruf kedua harus punya peran dan frekuensi (NEGATIF 1), mis. peran 'suara logo', frekuensi '<= 1 per frame'")
    return ada, hasil
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
    ada2_brand = False
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
        ada2, g2 = cek_huruf_kedua(b); gagal += g2; ada2_brand = ada2 and not g2
        rujukan = [ambil(b, f"huruf.{p}.file") for p in ("judul", "isi")] + [ambil(b, "logo.terang"), ambil(b, "logo.gelap")]
        for r in rujukan:
            if not KOSONG(r) and str(r).strip() != "tidak ada" and not os.path.exists(os.path.join(folder, str(r))):
                gagal.append(f"BRAND merujuk {r} tetapi filenya tidak ada di {folder}")
        if b_teks and re.search(r"<[^>\n]{2,}>", b_teks): gagal.append("BRAND masih berisi placeholder <…> di teks")
        gagal += cek_negatif(open(os.path.join(folder, "BRAND.md"), encoding="utf-8").read(), "BRAND.md", ada2 and not g2)
    if e is not None:
        if e == {}: gagal.append("EDITING.md tanpa blok YAML di atas")
        kk = e.get("kiblat_kartu") or []
        if not [x for x in kk if not KOSONG(str(x))]:
            gagal.append("EDITING kiblat_kartu kosong → tunjukkan frame kunci 2–3 kartu terdekat dan tanyakan pilihan user")
        if e_teks and re.search(r"<[^>\n]{2,}>", e_teks): gagal.append("EDITING masih berisi placeholder <…> di teks")
        gagal += cek_negatif(open(os.path.join(folder, "EDITING.md"), encoding="utf-8").read(), "EDITING.md", ada2_brand)
    for g in gagal:
        print("  X " + g)
    if gagal:
        print(f"GAGAL: {len(gagal)} butir profil {folder} belum siap.")
        sys.exit(1)
    print(f"LULUS: profil {b.get('merek')} siap dipakai.")


if __name__ == "__main__":
    main()
