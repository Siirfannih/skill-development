#!/usr/bin/env python3
"""Pemilih kartu mekanik cookbook per beat: baca cookbook/CATALOG.md, kembalikan 2-4 kartu yang cocok dengan fungsi cerita.

  python3 pilih_kartu.py --cari "<kata kunci fungsi cerita>" [--kategori camera|typography|layout|texture|sfx|script|qc]
                         [--pack 01..06] [--bergerak] [--limit 4] [--ringkas] [--index <CATALOG.md>] [--keyframes <folder>]

Dipanggil per beat untuk mencari, tetapi 2-4 kartu itu untuk seluruh video: beat berikutnya memakai ulang kartu yang sudah terpilih bila cocok. Kartu adalah mekanik yang
dipinjam lalu di-remix ke konsep user; keluaran skrip ini bukan template dan bukan gaya yang disalin.

Masukan: tabel CATALOG.md/INDEX.md berkolom `ID | Pola | Narrative trigger | Kategori | Status | Path`.
  --cari      kata kunci dipisah spasi; kata utuh atau awalan kata (≥ 4 huruf), kata Inggris/sehari-hari dipetakan lewat SINONIM.
              Bobot: fungsi (4), narrative trigger (3), nama pola (2), kategori (1).
  --kategori  hanya kartu yang kategori utama atau tambahannya memuat nilai ini.
  --pack      saring berdasarkan awalan folder pack (mis. 01, P01, 01-motion-camera-transitions).
  Kartu berfungsi `qc` (aturan kerja, bukan mekanik visual) tidak muncul tanpa --pack atau --kategori.
  `fungsi:` dan `risiko:` dibaca dari frontmatter kartu lewat kolom Path; kartu yang tidak terbaca dianggap tanpa fungsi.
  --bergerak  hanya kartu berstatus bergerak:ya.
  --limit     jumlah baris paling banyak (bawaan 4).
  --ringkas   hanya tabel; tanpa catatan risiko, daftar sumber vault, dan baris penutup.
Keluaran: tabel (baris berawalan `|`), lalu catatan risiko, lalu per kartu satu blok sumber vault (status bergerak, ukuran, inti mekanik,
jangan dipakai untuk) supaya yang dibuka satu sumber, bukan semuanya, dan alasan kartu bekerja ikut terbaca.
"""
import argparse, glob, os, re, sys
from pathlib import Path

MG = Path(__file__).resolve().parents[2]
INDEX = MG / "cookbook" / "CATALOG.md"
KEYFRAMES = MG / "guide" / "referensi" / "sheets" / "keyframes"
KATEGORI = ("camera", "typography", "layout", "texture", "sfx", "script", "qc")
KOLOM = {"id": "id", "pola": "nama", "narrative trigger": "trigger", "kategori": "kategori", "status": "status", "path": "path"}
ABAIKAN = {"yang", "dan", "atau", "untuk", "dari", "dengan", "pada", "ini", "itu", "the", "and", "for", "with",
           "di", "ke", "ya", "se", "si", "jadi", "juga", "saja", "ada", "akan", "bisa", "lebih", "sangat", "kita", "kami", "saya", "aku",
           "mau", "buat", "bikin", "video", "reel", "konten", "a", "an", "of", "to", "in", "on", "is", "my", "our"}
# Brief ditulis dengan kata sehari-hari dan Inggris, sedangkan narrative trigger kartu berbahasa Indonesia. Tabel ini memetakan
# kata brief ke satu bentuk baku (fungsi cerita), baik di kata kunci maupun di teks kartu, supaya "before after" dan "sebelum sesudah"
# menemukan kartu yang sama. Aturan menambah: satu kata hanya boleh masuk satu bentuk baku; hanya kata fungsi, bukan nama industri.
_SINONIM = {
    "hook": "hook pembuka opening intro",
    "angka": "angka number statistik stat data persen harga price omzet counter",
    "banding": "banding bandingkan compare versus vs sebelum sesudah before after",
    "bukti": "bukti proof testimoni testimonial review ulasan hasil result studi case",
    "langkah": "langkah step cara how tutorial panduan proses process",
    "balik": "balik koreksi reframe mitos myth bantah twist",
    "penekanan": "penekanan tekan emphasis punchline kata keyword",
    "transisi": "transisi transition pindah cut wipe",
    "suasana": "suasana mood emosi emotion tenang hangat",
    "cta": "cta ajakan daftar booking pesan order beli buy signup",
    "penutup": "penutup closing outro akhir ending",
    "jelaskan": "jelaskan explain explainer konsep concept apa",
    "ui": "ui aplikasi app software saas dashboard web",
    "wajah": "wajah talking pembicara presenter host",
}
SINONIM = {kata: baku for baku, kata_kata in _SINONIM.items() for kata in kata_kata.split()}
BOBOT = (("fungsi", 4), ("trigger", 3), ("nama", 2), ("kategori", 1))
PACK_ALIASES = {
    "p01": "01-", "01": "01-",
    "p02": "02-", "02": "02-",
    "p03": "03-", "03": "03-",
    "p04": "04-", "04": "04-",
    "p05": "05-", "05": "05-",
    "p06": "06-", "06": "06-",
}


FUNGSI = ("hook", "jelaskan", "angka", "banding", "bukti", "langkah", "balik", "penekanan", "transisi", "suasana", "cta", "penutup")


class Gagal(Exception):
    pass


def baca_front(path):
    """Frontmatter kartu sebagai dict sederhana (daftar `[a, b]` jadi list). Berkas hilang atau tanpa frontmatter: dict kosong."""
    try:
        teks = Path(path).read_text(encoding="utf-8")
    except OSError:
        return {}
    m = re.match(r"---\n(.*?)\n---", teks, re.S)
    fm = {}
    for baris in (m.group(1).splitlines() if m else []):
        km = re.match(r"^([A-Za-z_]+):\s*(.*)$", baris)
        if not km:
            continue
        v = km.group(2).strip()
        if v.startswith("[") and v.endswith("]"):
            fm[km.group(1)] = [x.strip().strip("\"'") for x in v[1:-1].split(",") if x.strip()]
        else:
            fm[km.group(1)] = v[1:-1] if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'" else v
    return fm


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
        fm = baca_front(Path(path).parent / k["path"])
        k["daftar_fungsi"] = fm.get("fungsi", []) if isinstance(fm.get("fungsi", []), list) else []
        k["fungsi"] = " ".join(k["daftar_fungsi"]); k["risiko"] = fm.get("risiko", "")
        kartu.append(k)
    if kepala is None:
        raise Gagal(f"{path}: tabel berkolom {' | '.join(KOLOM)} tidak ditemukan")
    if not kartu:
        raise Gagal(f"{path}: tabel kartu kosong")
    return kartu


def kata_kunci(cari):
    """Kata kunci dari --cari: huruf kecil, tanpa duplikat, minimal 2 huruf (UI, VO, AI, 3D tetap), tanpa kata sambung, dipetakan lewat SINONIM."""
    mentah = [w for w in re.findall(r"[\w$%]+", (cari or "").lower()) if len(w) >= 2 and w not in ABAIKAN]
    return list(dict.fromkeys(SINONIM.get(w, w) for w in mentah))


def _token(kartu, kolom):
    """Kata-kata satu kolom kartu (bentuk asli dan bentuk baku SINONIM), dihitung sekali per kartu."""
    cache = kartu.setdefault("_token", {})
    if kolom not in cache:
        mentah = re.findall(r"[\w$%]+", str(kartu.get(kolom, "")).lower())
        cache[kolom] = set(mentah) | {SINONIM[t] for t in mentah if t in SINONIM}
    return cache[kolom]


def _cocok(token, w):
    """Kata utuh, atau awalan kata bila w ≥ 4 huruf (foto → fotografi). Potongan di tengah kata tidak cocok (ui ≠ build)."""
    return w in token or (len(w) >= 4 and any(t.startswith(w) for t in token))


def nilai(kartu, kata):
    cocok = bobot = 0
    for w in kata:
        b = sum(n for kolom, n in BOBOT if _cocok(_token(kartu, kolom), w))
        cocok += bool(b); bobot += b
    return cocok, bobot


def pilih(kartu, cari=None, kategori=None, bergerak=False, limit=4, pack=None):
    kata = kata_kunci(cari)
    if cari and not kata:
        raise Gagal("--cari tidak memuat kata kunci (minimal satu kata ≥ 2 huruf yang bukan kata sambung)")
    pack_prefix = PACK_ALIASES.get(pack.lower(), pack.lower()) if pack else None
    hasil = []
    for k in kartu:
        if pack_prefix and not k["path"].lower().startswith(pack_prefix):
            continue
        if kategori and kategori != k["utama"] and kategori not in k["tambahan"]:
            continue
        if bergerak and k["bergerak"] != "ya":
            continue
        if not pack_prefix and not kategori and "qc" in k.get("daftar_fungsi", []):
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


def _urut_id(i):
    return [(0, int(p), "") if p.isdigit() else (1, 0, p) for p in re.findall(r"\d+|[A-Za-z]+", i)]


def keyframes(kid, folder=KEYFRAMES):
    """Frame kunci kartu: berkas `<id>-*` untuk id kartu, aliasnya, dan id kartu vault-nya (kid bisa satu id atau daftar id).
    Dicari di folder keyframes dan di folder induknya (sheets/), tempat frame beberapa kartu, mis. 14, disimpan."""
    ids = [kid] if isinstance(kid, str) else list(dict.fromkeys(kid))
    bagian, total = [], 0
    for fol in (Path(folder), Path(folder).parent):
        if not fol.is_dir():
            continue
        kena = {}
        for i in ids:
            n = sum(1 for f in fol.glob(f"{glob.escape(i)}-*") if f.is_file())
            if n:
                kena[i] = n
        if kena:
            nama = sorted(kena, key=_urut_id)
            total += sum(kena.values())
            bagian.append(f"{rel(fol)}/{nama[0] if len(nama) == 1 else '{' + ','.join(nama) + '}'}-*")
    return f"{total} file: {' + '.join(bagian)}" if total else "-"


def id_kartu(k, index=INDEX):
    """Id kartu, aliasnya, dan id kartu vault-nya (dari nama berkas), untuk mencari frame kunci."""
    fm = baca_front(Path(index).parent / k["path"])
    ids = [k["id"]] + [a for a in fm.get("alias", []) if isinstance(a, str)]
    for vp in fm.get("vault", []) if isinstance(fm.get("vault", []), list) else []:
        m = re.match(r"^(\d+)(?:-(\d+))?-|^([A-Za-z]\d+)", Path(vp).name)
        if m:
            ids += [x for x in m.groups() if x]
    return list(dict.fromkeys(ids))


def tabel(hasil, index=INDEX, folder=KEYFRAMES):
    out = ["| ID | Nama | Bergerak/Diukur | Path kartu | Keyframes |", "|---|---|---|---|---|"]
    for k in hasil:
        out.append(f"| {k['id']} | {k['nama']} | {k['bergerak']}/{k['diukur']} | {rel(Path(index).parent / k['path'])} | {keyframes(id_kartu(k, index), folder)} |")
    return "\n".join(out)


def _potong(teks, n=140):
    teks = " ".join(teks.split())
    return teks if len(teks) <= n else teks[:n - 1].rstrip() + "…"


def _sumber(path):
    """Satu kartu vault: (id, status bergerak, ukuran dalam token, kalimat inti mekanik, klausa pertama jangan-dipakai-untuk)."""
    teks = path.read_text(encoding="utf-8")
    fm = baca_front(path)
    inti = re.search(r"\*\*Inti (?:mekanik|struktur)[^*\n]*:\*\*[ \t]*(.+)", teks)
    jangan = re.search(r"\*\*Jangan dipakai untuk:\*\*[ \t]*(.+)", teks)
    inti = _potong(re.split(r"(?<=[.!?])\s", inti.group(1).strip())[0]) if inti else "-"
    jangan = _potong(re.split(r"[;,]|\.\s|\.$", jangan.group(1).strip())[0]) if jangan else "-"
    vid = fm.get("id") or re.match(r"^[A-Za-z]?\d+(?:-\d+)*", path.name).group(0)
    return vid, fm.get("dilihat_bergerak", "?") or "?", int(round(len(teks) / 4, -2)), inti, jangan


def blok_sumber(k, index=INDEX, maks=4):
    """Baris-baris `<id> sumber vault:` untuk satu kartu; kosong bila kartu tak punya sumber vault yang terbaca."""
    fm = baca_front(Path(index).parent / k["path"])
    daftar = fm.get("vault", []) if isinstance(fm.get("vault", []), list) else []
    sumber = []
    for vp in daftar:
        p = (Path(index).parent / k["path"]).parent / vp
        if p.is_file():
            sumber.append(_sumber(p))
    if not sumber:
        return []
    urut = [x for x in sumber if x[1] == "ya"] + [x for x in sumber if x[1] != "ya"] if len(sumber) > maks else sumber
    out = [f"{k['id']} sumber vault:"]
    for vid, ber, tok, inti, jangan in urut[:maks]:
        out.append(f"  {vid} (bergerak: {ber}, ~{tok} tok) — {inti} · jangan untuk: {jangan}")
    if len(urut) > maks:
        out.append(f"  +{len(urut) - maks} sumber lain: python3 tools/cookbook.py cari {k['id']}")
    return out


PENUTUP = ("Angka di Invariant dan di kartu vault = pengamatan dari video sumber, titik awal untuk disetel ke konsep kita, bukan target; "
           "yang mutlak hanya NEGATIF [mutlak]. Buka satu sumber: python3 tools/cookbook.py baca <vid>. Cek slop: references/slop-catalog.md.")


def main(argv=None):
    ap = argparse.ArgumentParser(description="Pilih kartu mekanik cookbook dari CATALOG.md menurut fungsi cerita satu beat.")
    ap.add_argument("--cari", help="kata kunci fungsi cerita, dipisah spasi")
    ap.add_argument("--kategori", choices=KATEGORI)
    ap.add_argument("--pack", help="saring domain pack (mis. 01, P01, 01-motion-camera-transitions)")
    ap.add_argument("--bergerak", action="store_true", help="hanya kartu bergerak:ya")
    ap.add_argument("--limit", type=int, default=4)
    ap.add_argument("--ringkas", action="store_true", help="hanya tabel, tanpa risiko, sumber vault, dan baris penutup")
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
        if a.cari:
            print(f"Sebut fungsi beat-nya: {', '.join(FUNGSI)} (kata industri seperti \"klinik\" atau \"rumah\" tidak dipakai).", file=sys.stderr)
        return 1
    print(tabel(hasil, a.index, a.keyframes))
    if a.ringkas:
        return 0
    for k in hasil:
        if k.get("risiko"):
            print(f"Risiko {k['id']}: {k['risiko']}")
    print()
    for k in hasil:
        for baris in blok_sumber(k, a.index):
            print(baris)
    print(PENUTUP)
    return 0


if __name__ == "__main__":
    sys.exit(main())
