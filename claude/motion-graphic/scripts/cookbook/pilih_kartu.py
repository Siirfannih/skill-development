#!/usr/bin/env python3
"""Pemilih kartu mekanik cookbook per beat: baca cookbook/CATALOG.md, kembalikan 2-4 kartu yang cocok dengan fungsi cerita.

  python3 pilih_kartu.py --cari "<kata kunci fungsi cerita>" [--kategori camera|typography|layout|texture|sfx|script|qc]
                         [--pack 01..06] [--bergerak] [--limit 4] [--index <CATALOG.md>] [--keyframes <folder>]

Dipanggil sekali per beat di Langkah 1 cookbook, supaya CATALOG.md tidak perlu dibaca utuh. Kartu adalah mekanik yang
dipinjam lalu di-remix ke konsep user; keluaran skrip ini bukan template dan bukan gaya yang disalin.

Masukan: tabel CATALOG.md/INDEX.md berkolom `ID | Pola | Narrative trigger | Kategori | Status | Path`.
  --cari      kata kunci dipisah spasi. Bobot: nama pola (3), narrative trigger (2), kategori (1).
  --kategori  hanya kartu yang kategori utama atau tambahannya memuat nilai ini.
  --pack      saring berdasarkan awalan folder pack (mis. 01, P01, 01-motion-camera-transitions).
  --bergerak  hanya kartu berstatus bergerak:ya.
  --limit     jumlah baris paling banyak (bawaan 4).
"""
import argparse, os, re, sys
from pathlib import Path

MG = Path(__file__).resolve().parents[2]
INDEX = MG / "cookbook" / "CATALOG.md"
KEYFRAMES = MG / "guide" / "referensi" / "sheets" / "keyframes"
KATEGORI = ("camera", "typography", "layout", "texture", "sfx", "script", "qc")
KOLOM = {"id": "id", "pola": "nama", "narrative trigger": "trigger", "kategori": "kategori", "status": "status", "path": "path"}
ABAIKAN = {"yang", "dan", "atau", "untuk", "dari", "dengan", "pada", "ini", "itu", "the", "and", "for", "with"}
BOBOT = (("nama", 3), ("trigger", 2), ("kategori", 1))
PACK_ALIASES = {
    "p01": "01-", "01": "01-",
    "p02": "02-", "02": "02-",
    "p03": "03-", "03": "03-",
    "p04": "04-", "04": "04-",
    "p05": "05-", "05": "05-",
    "p06": "06-", "06": "06-",
}


class Gagal(Exception):
    pass


def sel(baris):
    return [s.strip() for s in baris.strip().strip("|").split("|")]


def baca_index(path=INDEX):
    """Kembalikan daftar kartu (dict) sesuai urutan CATALOG/INDEX. Gagal bila tabel kartu tidak ditemukan atau kosong."""
    try:
        baris = Path(path).read_text(encoding="utf-8").splitlines()
    except OSError as e:
        raise Gagal(f"INDEX tidak terbaca: {e}")
    kepala, kartu = None, []
    for b in baris:
        if not b.lstrip().startswith("|"):
            if kepala and kartu:
                break
            continue
        s = sel(b)
        if kepala is None:
            nama = [KOLOM.get(x.lower()) for x in s]
            if all(k in nama for k in KOLOM.values()):
                kepala = nama
            continue
        if all(re.fullmatch(r":?-+:?", x) for x in s):
            continue
        if len(s) != len(kepala):
            raise Gagal(f"baris tabel dengan {len(s)} kolom, judulnya {len(kepala)}: {b[:80]}")
        k = {n: v for n, v in zip(kepala, s) if n}
        k["urut"] = len(kartu)
        kat = re.match(r"\s*([\w-]+)\s*(?:\((.*)\))?", k["kategori"])
        k["utama"] = kat.group(1).lower() if kat else ""
        k["tambahan"] = [x.strip().lower() for x in (kat.group(2) or "").split(",") if x.strip()] if kat else []
        st = dict(re.findall(r"(bergerak|diukur)\s*:\s*(\w+)", k["status"]))
        k["bergerak"], k["diukur"] = st.get("bergerak", "?"), st.get("diukur", "?")
        kartu.append(k)
    if kepala is None:
        raise Gagal(f"{path}: tabel berkolom {' | '.join(KOLOM)} tidak ditemukan")
    if not kartu:
        raise Gagal(f"{path}: tabel kartu kosong")
    return kartu


def kata_kunci(cari):
    return [w for w in dict.fromkeys(re.findall(r"[\w$%]+", (cari or "").lower())) if len(w) >= 3 and w not in ABAIKAN]


def nilai(kartu, kata):
    cocok = bobot = 0
    for w in kata:
        b = sum(n for kolom, n in BOBOT if w in kartu[kolom].lower())
        cocok += bool(b); bobot += b
    return cocok, bobot


def pilih(kartu, cari=None, kategori=None, bergerak=False, limit=4, pack=None):
    kata = kata_kunci(cari)
    if cari and not kata:
        raise Gagal("--cari tidak memuat kata kunci (minimal satu kata ≥ 3 huruf yang bukan kata sambung)")
    pack_prefix = PACK_ALIASES.get(pack.lower(), pack.lower()) if pack else None
    hasil = []
    for k in kartu:
        if pack_prefix and not k["path"].lower().startswith(pack_prefix):
            continue
        if kategori and kategori != k["utama"] and kategori not in k["tambahan"]:
            continue
        if bergerak and k["bergerak"] != "ya":
            continue
        cocok, bobot = nilai(k, kata) if kata else (0, 0)
        if kata and not cocok:
            continue
        hasil.append((-cocok, -bobot, 0 if not kategori or k["utama"] == kategori else 1, k["urut"], k))
    hasil.sort(key=lambda x: x[:4])
    return [x[4] for x in hasil[:max(limit, 0)]]


def rel(p):
    p = Path(p).resolve()
    try:
        return p.relative_to(MG.parents[1]).as_posix()
    except ValueError:
        return p.as_posix()


def keyframes(kid, folder=KEYFRAMES):
    n = len(list(Path(folder).glob(f"{kid}-*"))) if Path(folder).is_dir() else 0
    return f"{n} file: {rel(folder)}/{kid}-*" if n else "-"


def tabel(hasil, index=INDEX, folder=KEYFRAMES):
    out = ["| ID | Nama | Bergerak/Diukur | Path kartu | Keyframes |", "|---|---|---|---|---|"]
    for k in hasil:
        out.append(f"| {k['id']} | {k['nama']} | {k['bergerak']}/{k['diukur']} | {rel(Path(index).parent / k['path'])} | {keyframes(k['id'], folder)} |")
    return "\n".join(out)


def main(argv=None):
    ap = argparse.ArgumentParser(description="Pilih kartu mekanik cookbook dari CATALOG.md menurut fungsi cerita satu beat.")
    ap.add_argument("--cari", help="kata kunci fungsi cerita, dipisah spasi")
    ap.add_argument("--kategori", choices=KATEGORI)
    ap.add_argument("--pack", help="saring domain pack (mis. 01, P01, 01-motion-camera-transitions)")
    ap.add_argument("--bergerak", action="store_true", help="hanya kartu bergerak:ya")
    ap.add_argument("--limit", type=int, default=4)
    ap.add_argument("--index", default=str(INDEX)); ap.add_argument("--keyframes", default=str(KEYFRAMES))
    a = ap.parse_args(argv)
    if a.limit < 1:
        ap.error("--limit minimal 1")
    try:
        hasil = pilih(baca_index(a.index), a.cari, a.kategori, a.bergerak, a.limit, a.pack)
    except Gagal as e:
        print(f"GAGAL  {e}", file=sys.stderr); return 2
    if not hasil:
        saring = " ".join(x for x in (f'--cari "{a.cari}"' if a.cari else "", f"--kategori {a.kategori}" if a.kategori else "", f"--pack {a.pack}" if a.pack else "", "--bergerak" if a.bergerak else "") if x)
        print(f"Tidak ada kartu yang cocok ({saring}). Ganti kata kunci dengan fungsi cerita beat-nya, atau longgarkan saringan.", file=sys.stderr)
        return 1
    print(tabel(hasil, a.index, a.keyframes))
    return 0


if __name__ == "__main__":
    sys.exit(main())
