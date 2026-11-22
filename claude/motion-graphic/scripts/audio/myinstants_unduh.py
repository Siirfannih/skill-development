#!/usr/bin/env python3
"""Unduh SEMUA suara dari hasil pencarian myinstants.com (sumber gratis, guide/sfx/FAMILI.md §2 tingkat 2).

Struktur halaman (dipelajari 22 Nov 2026): tiap hasil = tombol
  onclick="play('/media/sounds/<nama>.mp3', 'loader-<id>', '<slug>-<id>')"
diikuti <a class="instant-link" href="/en/instant/<slug>-<id>/">Judul</a>.
Paginasi: &page=2, 3, ... (36 hasil/halaman); halaman lewat akhir = 404 atau tanpa hasil baru.

Pakai:
  python3 myinstants_unduh.py "ah" --keluar ~/sfx/myinstants/ah [--maks N] [--halaman N]
  python3 myinstants_unduh.py "https://www.myinstants.com/en/search/?name=ah" --keluar DIR

Sopan: User-Agent generik, jeda 0,5-1 dtk antar permintaan, file yang sudah ada dilewati, retry ringan.
Tulis index.csv (judul, url_halaman, url_mp3, file, ukuran_byte, durasi_dtk) di folder keluaran.
File hasil BELUM tentu layak pakai: periksa dulu dengan sfx_vet.py sebelum dipasang di video
(banyak berisi musik, meme, atau kualitas rendah).
"""
import argparse, csv, html, os, random, re, subprocess, sys, time, urllib.error, urllib.parse, urllib.request

BASE = "https://www.myinstants.com"
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"}
RE_PLAY = re.compile(r"onclick=\"play\('(/media/sounds/[^']+)',\s*'[^']*',\s*'([^']+)'\)\"")
RE_LINK = re.compile(r'<a href="(/[a-z]{2}/instant/[^"]+/)" class="instant-link[^"]*">(.*?)</a>', re.S)


def jeda():
    time.sleep(random.uniform(0.5, 1.0))


def ambil(url, retry=3):
    for i in range(retry):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            err = e
        except Exception as e:
            err = e
        time.sleep(2 * (i + 1))
    print(f"  gagal {url}: {err}", file=sys.stderr)
    return None


def url_cari(q, halaman):
    if q.startswith("http"):
        u = urllib.parse.urlparse(q)
        qs = urllib.parse.parse_qs(u.query)
        qs["page"] = [str(halaman)]
        return urllib.parse.urlunparse(u._replace(query=urllib.parse.urlencode(qs, doseq=True)))
    return f"{BASE}/en/search/?{urllib.parse.urlencode({'name': q, 'page': halaman})}"


def parse(teks):
    """-> [(judul, url_halaman, path_mp3)] urut seperti di halaman."""
    plays = [(m.start(), m.group(1), m.group(2)) for m in RE_PLAY.finditer(teks)]
    links = {}
    for m in RE_LINK.finditer(teks):
        links[m.group(1).rstrip("/").rsplit("/", 1)[-1]] = (m.group(1), re.sub(r"<[^>]+>", "", html.unescape(m.group(2))).strip())
    out = []
    for _, mp3, slug in plays:
        href, judul = links.get(slug, (f"/en/instant/{slug}/", slug))
        out.append((judul, BASE + href, mp3))
    return out


def slug(s):
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:50] or "suara"


def durasi(path):
    try:
        o = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                           capture_output=True, text=True, timeout=30).stdout.strip()
        return f"{float(o):.2f}"
    except Exception:
        return ""


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("kata", help="kata kunci atau URL pencarian myinstants penuh")
    ap.add_argument("--keluar", required=True, help="folder keluaran")
    ap.add_argument("--maks", type=int, default=0, help="batas jumlah suara (0 = semua)")
    ap.add_argument("--halaman", type=int, default=0, help="batas jumlah halaman hasil (0 = sampai habis)")
    a = ap.parse_args()
    out = os.path.expanduser(a.keluar)
    os.makedirs(out, exist_ok=True)

    item, lihat = [], set()
    h = 1
    while True:
        if a.halaman and h > a.halaman:
            break
        teks = ambil(url_cari(a.kata, h))
        jeda()
        if teks is None:
            break
        baru = [x for x in parse(teks.decode("utf-8", "replace")) if x[2] not in lihat]
        if not baru:
            break
        for x in baru:
            lihat.add(x[2])
        item += baru
        print(f"halaman {h}: {len(baru)} suara (total {len(item)})")
        if a.maks and len(item) >= a.maks:
            break
        h += 1
    if a.maks:
        item = item[:a.maks]

    baris, ok, lewati, gagal = [], 0, 0, 0
    for i, (judul, hal, mp3) in enumerate(item, 1):
        asli = os.path.basename(urllib.parse.unquote(mp3))
        nama = f"{slug(judul)}__{slug(os.path.splitext(asli)[0])}{os.path.splitext(asli)[1].lower() or '.mp3'}"
        dst = os.path.join(out, nama)
        if os.path.exists(dst) and os.path.getsize(dst) > 0:
            lewati += 1
        else:
            data = ambil(BASE + urllib.parse.quote(urllib.parse.unquote(mp3)))
            jeda()
            if not data:
                gagal += 1
                print(f"  [{i}/{len(item)}] GAGAL {judul}")
                continue
            with open(dst + ".part", "wb") as f:
                f.write(data)
            os.replace(dst + ".part", dst)
            ok += 1
        baris.append([judul, hal, BASE + mp3, nama, os.path.getsize(dst), durasi(dst)])
        if i % 25 == 0:
            print(f"  [{i}/{len(item)}]")
    with open(os.path.join(out, "index.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["judul", "url_halaman", "url_mp3", "file", "ukuran_byte", "durasi_dtk"])
        w.writerows(baris)
    tot = sum(r[4] for r in baris)
    print(f"selesai: {ok} baru, {lewati} dilewati, {gagal} gagal; {len(baris)} file, {tot/1e6:.1f} MB -> {out}")


if __name__ == "__main__":
    main()
