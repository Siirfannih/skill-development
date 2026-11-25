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

Profil tidak boleh membuka NEGATIF (claude/_bersama/NEGATIF.md). BRAND.md dan EDITING.md ditolak bila (baris yang bukan larangan, yaitu tanpa
"jangan/tanpa/tidak/dilarang/bukan/hindari") memuat:
  - font serif, italic/oblique, atau script (nama font serif dikenal, kata serif yang bukan sans-serif, italic, script), atau slot `huruf.aksen` terisi;
  - token bayangan berlapis atau besar (>= 2 lapis, blur > 24 px, kata lembut/halus/soft/berlapis) dan token glow/halo/bloom/neon;
  - gradien selain `linear-gradient(a, b)` dua warna (radial/conic/mesh/aurora/multi-warna, atau kata "gradien" tanpa definisi yang bisa diukur).
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
GLOW = re.compile(r"(?<![A-Za-z])(?:glow|halo|bloom|neon)(?![A-Za-z])", re.I)
SHADOW = re.compile(r"(?:box-?shadow|text-?shadow|drop-?shadow|bayangan|shadow)\b(.*)", re.I)
LEMBUT = re.compile(r"lembut|halus|soft|berlapis|layer", re.I)
GRADIEN = re.compile(r"gradien|gradient", re.I)


def _top_split(t, sep=","):
    d, cur, out = 0, "", []
    for ch in t:
        if ch == "(": d += 1
        elif ch == ")": d -= 1
        if ch == sep and d == 0: out.append(cur); cur = ""
        else: cur += ch
    return out + [cur] if cur.strip() else out


def _gradien_ok(baris):
    """True bila setiap gradien di baris ini = linear-gradient dengan tepat dua warna."""
    m = list(re.finditer(r"([\w-]*gradient)\s*\(", baris, re.I))
    if not m: return False                          # kata 'gradien' tanpa definisi terukur
    for k in m:
        if k.group(1).lower() != "linear-gradient": return False
        i, d = k.end(), 1; j = i
        while j < len(baris) and d:
            d += (baris[j] == "(") - (baris[j] == ")"); j += 1
        stops = [x for x in _top_split(baris[i:j - 1]) if not re.fullmatch(r"\s*(?:to\s[\w\s]+|-?[\d.]+(?:deg|turn|rad))\s*", x)]
        if len(stops) != 2: return False
    return True


def cek_negatif(teks, nama):
    """Temuan NEGATIF di teks profil (YAML + isi). Baris larangan (berkata jangan/tanpa/...) dilewati."""
    gagal = []
    for n, b in enumerate(teks.splitlines(), 1):
        if NEGASI.search(b): continue
        ada = lambda pola: pola.search(b)
        if ada(SERIF_NAMA) or ada(SERIF_GEN): gagal.append(f"{nama}:{n} font serif ditolak (NEGATIF 1): satu keluarga sans")
        if ada(ITALIC): gagal.append(f"{nama}:{n} italic/oblique ditolak (NEGATIF 1)")
        if ada(SCRIPT): gagal.append(f"{nama}:{n} font script/handwriting ditolak (NEGATIF 1)")
        if ada(GLOW): gagal.append(f"{nama}:{n} glow/halo/bloom/neon ditolak (NEGATIF 2)")
        m = ada(SHADOW)
        if m and m.group(1).strip(" :=-\"'"):
            isi = m.group(1)
            lapis = _top_split(re.sub(r"^[\s:=\"'`-]+", "", isi), ",")
            blur = [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)\s*px", isi)]
            if len(lapis) >= 2 or LEMBUT.search(isi) or any(x > 24 for x in blur):
                gagal.append(f"{nama}:{n} token bayangan berlapis/besar/lembut ditolak (NEGATIF 2): hanya satu bayangan kontak tajam, atau hapus")
        if ada(GRADIEN) and not _gradien_ok(b):
            gagal.append(f"{nama}:{n} gradien harus linear-gradient(a, b) dua warna; radial/conic/mesh/multi-warna atau gradien tanpa definisi ditolak (NEGATIF 2)")
    return gagal
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
        if not KOSONG(ambil(b, "huruf.aksen.keluarga")) or (isinstance(ambil(b, "huruf"), dict) and not KOSONG(ambil(b, "huruf.aksen")) and not isinstance(ambil(b, "huruf.aksen"), dict)):
            gagal.append("BRAND huruf.aksen terisi: slot huruf aksen dihapus (NEGATIF 1); satu keluarga sans, penekanan lewat bobot/ukuran/warna/posisi")
        for p_ in ("judul", "isi"):
            for k_ in ("keluarga", "file", "gaya"):
                v_ = ambil(b, f"huruf.{p_}.{k_}")
                if not KOSONG(v_) and (SERIF_NAMA.search(str(v_)) or SERIF_GEN.search(str(v_)) or SCRIPT.search(str(v_)) or ITALIC.search(str(v_))):
                    gagal.append(f"BRAND huruf.{p_}.{k_} = {v_!r}: serif/italic/script ditolak (NEGATIF 1); pakai satu keluarga sans")
        rujukan = [ambil(b, f"huruf.{p}.file") for p in ("judul", "isi")] + [ambil(b, "logo.terang"), ambil(b, "logo.gelap")]
        for r in rujukan:
            if not KOSONG(r) and str(r).strip() != "tidak ada" and not os.path.exists(os.path.join(folder, str(r))):
                gagal.append(f"BRAND merujuk {r} tetapi filenya tidak ada di {folder}")
        if b_teks and re.search(r"<[^>\n]{2,}>", b_teks): gagal.append("BRAND masih berisi placeholder <…> di teks")
        gagal += cek_negatif(open(os.path.join(folder, "BRAND.md"), encoding="utf-8").read(), "BRAND.md")
    if e is not None:
        if e == {}: gagal.append("EDITING.md tanpa blok YAML di atas")
        kk = e.get("kiblat_kartu") or []
        if not [x for x in kk if not KOSONG(str(x))]:
            gagal.append("EDITING kiblat_kartu kosong → tunjukkan frame kunci 2–3 kartu terdekat dan tanyakan pilihan user")
        if e_teks and re.search(r"<[^>\n]{2,}>", e_teks): gagal.append("EDITING masih berisi placeholder <…> di teks")
        gagal += cek_negatif(open(os.path.join(folder, "EDITING.md"), encoding="utf-8").read(), "EDITING.md")
    for g in gagal:
        print("  X " + g)
    if gagal:
        print(f"GAGAL: {len(gagal)} butir profil {folder} belum siap.")
        sys.exit(1)
    print(f"LULUS: profil {b.get('merek')} siap dipakai.")


if __name__ == "__main__":
    main()
