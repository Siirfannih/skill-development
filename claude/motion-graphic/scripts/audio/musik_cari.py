#!/usr/bin/env python3
"""Kumpulkan kandidat musik per kategori suasana dari Mixkit (Tier 2 musik, guide/sfx/FAMILI.md §4).

Kategori (references/audio.md §14.0A) dipetakan ke halaman mood Mixkit. Track diunduh utuh ke folder kandidat proyek
(bukan ke repo) dan dicatat di SOURCES.md: file · mood · judul · URL · lisensi.

Lisensi (Mixkit Stock Music Free License, dibaca dari mixkit.co/license): boleh untuk proyek komersial di web dan
media sosial (video medsos, YouTube, iklan online, podcast); tidak boleh untuk TV/radio, CD/DVD, game; tidak boleh
di-remix menjadi track musik saja, diaku sebagai milik sendiri, atau didaftarkan ke layanan hak (Content ID).

Mixkit dihitung SATU sumber. music_fit.py butuh kandidat dari >= 2 sumber: tambahkan musik lokal Irfan,
ElevenLabs Music (biaya disebut dulu), atau sumber berlisensi lain.

Pakai:
  python3 musik_cari.py --kategori hangat --out projects/<proyek>/musik/kandidat [--n 8] [--mood calm,hopeful]
  lalu: python3 music_fit.py --category hangat --voice sumber.mp4 --duration <dtk> <kandidat>/*.mp3 <sumber lain>/*
"""
import argparse, html, os, re, sys, urllib.request

UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64)"}
MOOD = {
    "fokus": ["calm", "atmospheric"],
    "slowdown": ["dreamy", "emotional", "calm"],
    "energi": ["energetic", "driving"],
    "tegang": ["dramatic", "dark"],
    "hangat": ["hopeful", "cheerful"],
}
LISENSI = "Mixkit Stock Music Free License: web/medsos/YouTube/iklan online boleh; bukan TV/radio, CD/DVD, game; jangan Content ID"


def get(url, binary=False):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        d = r.read()
    return d if binary else d.decode("utf-8", "replace")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--kategori", choices=sorted(MOOD), required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--n", type=int, default=8, help="track per mood")
    ap.add_argument("--mood", help="daftar mood Mixkit dipisah koma; menggantikan peta kategori")
    a = ap.parse_args()
    moods = a.mood.split(",") if a.mood else MOOD[a.kategori]
    os.makedirs(a.out, exist_ok=True)
    src = os.path.join(a.out, "SOURCES.md")
    baru = not os.path.exists(src)
    n_ok = 0
    with open(src, "a", encoding="utf-8") as fh:
        if baru:
            fh.write("| File | Mood | Judul | URL | Lisensi |\n|---|---|---|---|---|\n")
        for m in moods:
            try:
                page = get(f"https://mixkit.co/free-stock-music/mood/{m}/")
            except Exception as ex:
                print(f"PERINGATAN mood '{m}': {ex}")
                continue
            urls = re.findall(r'preview-url-value="(https://assets\.mixkit\.co/music/(\d+)/\d+\.mp3)"', page)
            titles = [html.unescape(t.strip()) for t in re.findall(r'item-grid-card__title">\s*([^<]+?)\s*</h2>', page)]
            for i, (u, tid) in enumerate(urls[: a.n]):
                fn = os.path.join(a.out, f"mixkit-{m}-{tid}.mp3")
                if os.path.exists(fn):
                    n_ok += 1
                    continue
                try:
                    open(fn, "wb").write(get(u, binary=True))
                except Exception as ex:
                    print(f"PERINGATAN unduh {u}: {ex}")
                    continue
                judul = titles[i] if i < len(titles) else m
                fh.write(f"| {os.path.basename(fn)} | {m} | {judul} | {u} | {LISENSI} |\n")
                n_ok += 1
    if not n_ok:
        sys.exit("tidak ada track terunduh")
    print(f"{n_ok} track Mixkit di {a.out} (lisensi di SOURCES.md). Mixkit = 1 sumber; tambahkan sumber kedua, lalu:")
    print(f"  python3 {os.path.join(os.path.dirname(os.path.abspath(__file__)), 'music_fit.py')} --category {a.kategori} "
          f"--voice <suara.mp4> --duration <dtk> {a.out}/*.mp3 <sumber_lain>/*")


if __name__ == "__main__":
    main()
