#!/usr/bin/env python3
"""Cari kandidat SFX per famili bunyi di sumber gratis berlisensi (Tier 2, guide/sfx/FAMILI.md §Sumber).

Sumber (dicek bisa diunduh tanpa akun dari PC server):
  - Freesound, hanya lisensi CC0, durasi dibatasi famili: preview HQ dari halaman pencarian.
  - Mixkit, halaman tag (Mixkit Sound Effects Free License; teks lengkap dibaca di mixkit.co/license sebelum rilis komersial).
Kata kunci dan tag diambil dari FAMILI.json (`cari`, `mixkit`, `maks_dtk`), atau `--kata` untuk pencarian bebas.

Setiap file diunduh ke folder kandidat proyek (bukan ke repo), dicatat di SOURCES.md folder itu
(file · sumber · halaman · lisensi · kata kunci), lalu diperiksa `sfx_vet.py --famili` (LULUS → PERIKSA → GAGAL)
dan kandidat yang tidak GAGAL didengar dengan `earshot rank "<deskripsi famili>"`: lolos ukuran ≠ karakternya cocok.

Pakai:
  python3 sfx_cari.py --famili taktil --out projects/<proyek>/sfx/kandidat [--kata "paper slide"] [--n 6]
"""
import argparse, html, json, os, re, subprocess, sys, urllib.parse, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
FAMILI_JSON = os.path.join(HERE, "..", "..", "guide", "sfx", "FAMILI.json")
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64)"}
LIS_FS = "CC0 (Freesound)"
LIS_MK = "Mixkit Sound Effects Free License (cek teks di mixkit.co/license sebelum rilis komersial)"


def get(url, binary=False, timeout=20):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = r.read()
    return data if binary else data.decode("utf-8", "replace")


def freesound(q, maks_dtk, n):
    f = f'license:"Creative Commons 0" duration:[0 TO {maks_dtk}]'
    url = "https://freesound.org/search/?" + urllib.parse.urlencode({"q": q, "f": f})
    out, seen = [], set()
    for mp3 in re.findall(r'data-mp3="([^"]+)"', get(url)):
        m = re.search(r"/previews/\d+/(\d+)_\d+-lq\.mp3", mp3)
        if not m or m.group(1) in seen:
            continue
        seen.add(m.group(1))
        out.append(dict(sumber="freesound", id=m.group(1), judul=q, url=mp3.replace("-lq.mp3", "-hq.mp3"),
                        halaman=f"https://freesound.org/s/{m.group(1)}/", lisensi=LIS_FS, kata=q))
        if len(out) >= n:
            break
    return out


def mixkit(tag, n):
    page = get(f"https://mixkit.co/free-sound-effects/{tag}/")
    urls = re.findall(r'preview-url-value="(https://assets\.mixkit\.co/active_storage/sfx/(\d+)/\d+-preview\.mp3)"', page)
    titles = [html.unescape(t.strip()) for t in re.findall(r'item-grid-card__title">\s*([^<]+?)\s*</h2>', page)]
    out = []
    for i, (u, sid) in enumerate(urls[:n]):
        out.append(dict(sumber="mixkit", id=sid, judul=titles[i] if i < len(titles) else tag, url=u,
                        halaman=f"https://mixkit.co/free-sound-effects/{tag}/", lisensi=LIS_MK, kata=tag))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--famili", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--kata", help="kata kunci bahasa Inggris; menggantikan daftar `cari` famili")
    ap.add_argument("--n", type=int, default=6, help="kandidat per kata kunci per sumber")
    ap.add_argument("--tanpa-dengar", action="store_true", help="lewati earshot rank (mis. earshot tidak terpasang)")
    a = ap.parse_args()
    fams = json.load(open(FAMILI_JSON))["famili"]
    if a.famili not in fams:
        sys.exit(f"famili '{a.famili}' tidak ada; pilihan: {', '.join(fams)}")
    fam = fams[a.famili]
    os.makedirs(a.out, exist_ok=True)
    kata = [a.kata] if a.kata else fam["cari"][:2]
    calon = []
    for q in kata:
        try:
            calon += freesound(q, fam.get("maks_dtk", 3), a.n)
        except Exception as ex:
            print(f"PERINGATAN freesound '{q}': {ex}")
    for tag in ([] if a.kata else fam.get("mixkit", [])[:2]):
        try:
            calon += mixkit(tag, a.n)
        except Exception as ex:
            print(f"PERINGATAN mixkit '{tag}': {ex}")
    src = os.path.join(a.out, "SOURCES.md")
    baru = not os.path.exists(src)
    files = []
    with open(src, "a", encoding="utf-8") as fh:
        if baru:
            fh.write("| File | Sumber | Judul | Halaman | Lisensi | Kata kunci |\n|---|---|---|---|---|---|\n")
        for c in calon:
            fn = os.path.join(a.out, f'{a.famili}-{c["sumber"]}-{c["id"]}.mp3')
            if not os.path.exists(fn):
                try:
                    open(fn, "wb").write(get(c["url"], binary=True))
                except Exception as ex:
                    print(f"PERINGATAN unduh {c['url']}: {ex}")
                    continue
                fh.write(f'| {os.path.basename(fn)} | {c["sumber"]} | {c["judul"]} | {c["halaman"]} | {c["lisensi"]} | {c["kata"]} |\n')
            if fn not in files:
                files.append(fn)
    if not files:
        sys.exit("tidak ada kandidat terunduh")
    print(f"{len(files)} kandidat di {a.out} (sumber dicatat di SOURCES.md); diperiksa sfx_vet --famili {a.famili}:")
    res = subprocess.run([sys.executable, os.path.join(HERE, "sfx_vet.py"), *files, "--famili", a.famili,
                          "--json", os.path.join(a.out, f"vet-{a.famili}.json")], capture_output=True, text=True)
    rows = json.load(open(os.path.join(a.out, f"vet-{a.famili}.json")))
    urut = {"LULUS": 0, "PERIKSA": 1, "GAGAL": 2}
    for r in sorted(rows, key=lambda r: (urut[r["putusan"]], len(r.get("periksa", [])))):
        why = "; ".join(r.get("gagal", []) + r.get("periksa", []))[:150]
        print(f'  {r["putusan"]:8} {os.path.basename(r["file"])}  {why}')
    lolos = [r["file"] for r in rows if r["putusan"] != "GAGAL"]
    if a.tanpa_dengar or not lolos:
        print(f'Berikutnya: earshot rank "{fam["deskripsi"]}" pada kandidat yang tidak GAGAL, lalu dengar di konteks.')
        return
    # Ukuran teknis bersih belum berarti karakternya cocok (kandidat bisa lulus sfx_vet tetapi terdengar seperti benda lain),
    # jadi kandidat yang tidak GAGAL selalu didengar terhadap deskripsi famili.
    exe = os.environ.get("EARSHOT") or os.path.expanduser("~/work/mg-venv/bin/earshot")
    print(f'Dengar (earshot rank "{fam["deskripsi"]}"):')
    r = subprocess.run([exe, "rank", fam["deskripsi"], *lolos], capture_output=True, text=True)
    for line in r.stdout.splitlines():
        if line.strip().startswith(tuple("0123456789")):
            print("  " + line.strip())
    print("Pakai kandidat teratas yang 'strong'/'plausible' dan tidak GAGAL; tulis label dengar + lisensinya di cue. "
          "Tidak ada yang strong/plausible → ganti kata kunci (--kata) atau famili, jangan memaksa yang terdekat.")


if __name__ == "__main__":
    main()
