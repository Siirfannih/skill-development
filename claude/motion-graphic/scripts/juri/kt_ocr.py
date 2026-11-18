#!/usr/bin/env python3
"""Cek teks kinetik sudah lengkap dan terbaca beberapa frame setelah blok masuk (LANTAI A1).

  python3 kt_ocr.py <proyek>/lego [--f 4] [--terima <proyek>/qc/kt_ocr_terima.json] [--simpan <proyek>/qc/kt_ocr]

Membaca lego/lapisan.json (teks tiap blok KT) dan lego/lego.json (file render lapisan di cache/, ber-alfa). Untuk tiap
blok, frame ke-f render lapisannya sendiri dibaca tesseract (tanpa footage di belakangnya: topeng alfa), lalu TIAP kata dicek pada onsetnya sendiri (props.wt) + f frame: kata itu harus terbaca utuh
(rasio kemiripan ≥ 0,8; kata ≤ 3 huruf ≥ 0,66 karena OCR lemah di kata pendek). Huruf yang belum muncul, terpecah, atau terbalik membuat rasio jatuh.
Posisi, ukuran, dan warna tidak dinilai di sini (tema_cek, teks_cek, mata).

OCR pada huruf bergaya bisa gagal walau teksnya benar. Blok seperti itu dicek mata, lalu ditulis di file --terima:
  {"T025": "dicek mata qc/kt_ocr/T025.png: Anton miring, utuh sejak f+2"}   (kunci "T025#2" untuk kata ke-2 saja)
Alasan wajib menyebut frame yang dilihat. Keluar 0 = semua lengkap/diterima, 1 = ada blok belum lengkap, 2 = tesseract tidak ada.
"""
import argparse, csv, difflib, io, json, os, shutil, subprocess, sys


def huruf(s):
    return "".join(ch for ch in s.lower() if ch.isalnum())


def daftar(L):
    return L if isinstance(L, list) else L.get("lapisan", L.get("layers", []))


def blok_dari(lego):
    rencana = daftar(json.load(open(os.path.join(lego, "lapisan.json"), encoding="utf-8")))
    src = {l["id"]: l.get("src") for l in daftar(json.load(open(os.path.join(lego, "lego.json"), encoding="utf-8")))}
    fps = float(json.load(open(os.path.join(lego, "lego.json"), encoding="utf-8")).get("fps", 30))
    out = []
    for l in rencana:
        p = l.get("props") or {}
        teks = p.get("teks_vis") or p.get("teks")
        if l.get("comp") != "KT" or not teks or not src.get(l.get("id")): continue
        kata = [huruf(w) for w in teks.split() if huruf(w)]
        wt = p.get("wt") or [0.0]
        for i, k in enumerate(kata):
            t = wt[i] if i < len(wt) else wt[-1]
            out.append((l["id"] + (f"#{i + 1}" if len(kata) > 1 else ""), teks, k, round(t * fps), os.path.join(lego, src[l["id"]])))
    return out


def gambar(mov, f, png):
    """Frame ke-f lapisan ber-alfa → PNG hitam-di-putih dari topeng alfa (warna teks dan footage tidak berpengaruh)."""
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", mov, "-vf",
                    f"select=eq(n\\,{f}),alphaextract,negate,pad=iw+80:ih+80:40:40:white,scale=iw*2:-1",
                    "-frames:v", "1", "-update", "1", png], check=True)
    return png


def ocr(png):
    """Kata OCR dari tiga mode tata letak (kata tersebar, satu baris, satu kata)."""
    kata = set()
    for psm in ("11", "7", "8"):
        tsv = subprocess.run(["tesseract", png, "-", "--psm", psm, "-l", "eng", "tsv"], capture_output=True, text=True).stdout
        for r in csv.DictReader(io.StringIO(tsv), delimiter="\t", quoting=csv.QUOTE_NONE):
            t = huruf(r.get("text") or "")
            if t: kata.add(t)
    return kata


def cocok(kunci, kata):
    """Skor 0–1: kata kunci utuh di salah satu kata OCR (boleh menempel tanda baca/kata lain)."""
    if any(kunci in k for k in kata if len(k) >= len(kunci)): return 1.0
    return max((difflib.SequenceMatcher(None, kunci, k).ratio() for k in kata), default=0.0)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("lego", help="folder <proyek>/lego")
    ap.add_argument("--f", type=int, default=4, help="frame setelah blok masuk (bawaan 4, LANTAI/kartu: masuk 2–4 f)")
    ap.add_argument("--terima", default=None); ap.add_argument("--simpan", default=None)
    a = ap.parse_args()
    if not shutil.which("tesseract"):
        print("tesseract tidak terpasang: sudo apt install tesseract-ocr. Cek ini dilewati, nilai dengan mata."); sys.exit(2)
    terima = json.load(open(a.terima, encoding="utf-8")) if a.terima and os.path.exists(a.terima) else {}
    simpan = a.simpan or os.path.join(os.path.dirname(os.path.abspath(a.lego)), "qc", "kt_ocr")
    os.makedirs(simpan, exist_ok=True)
    gagal, n = [], 0
    for bid, teks, kunci, f0, mov in blok_dari(a.lego):
        n += 1
        png = os.path.join(simpan, f"{bid.replace('#', '_')}.png")
        kata = ocr(gambar(mov, f0 + a.f, png))
        skor = cocok(kunci, kata)
        if skor >= (0.8 if len(kunci) > 3 else 0.66): continue
        alasan = terima.get(bid, terima.get(bid.split("#")[0], ""))
        if alasan and (".png" in alasan or ".jpg" in alasan):
            print(f"  diterima {bid:6} '{teks}' ({alasan})"); continue
        dekat = max(kata, key=lambda k: difflib.SequenceMatcher(None, kunci, k).ratio(), default="")
        gagal.append(f"{bid:6} +{a.f}f '{teks}': '{kunci}' tidak terbaca utuh (OCR terdekat '{dekat}', {skor:.2f}) → {png}")
    print(f"kata KT dicek: {n} (frame +{a.f} setelah onset kata di lapisannya)")
    for g in gagal: print("  X " + g)
    if gagal:
        print(f"GAGAL: {len(gagal)} blok belum lengkap/terbaca pada +{a.f} f. Lihat frame-nya; perbaiki, atau bila OCR yang salah "
              f"tulis ke --terima dengan frame yang dicek mata."); sys.exit(1)
    print("LULUS: semua blok KT terbaca utuh.")


if __name__ == "__main__":
    main()
