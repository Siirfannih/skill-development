#!/usr/bin/env python3
"""Lihat per lapis: render frame HTML atau still Remotion lapis demi lapis, supaya "bangun, lihat, perbaiki" jadi satu perintah.

HTML (lapis ditandai atribut data-lapis):
  python3 lihat.py frame.html [--lapis 0 | 0,1 | semua] [--size 1920x1080] [--qc qc] [--lihat "apa yang dilihat"] [--perbaiki "apa yang diperbaiki"]

  data-lapis="0|1|2|3" (juga dikenal nama latar=0, objek=1, teks=2, label=3, sama dengan yang dibaca tabrakan_cek.py).
  L0 latar, L1 satu objek utama, L2 teks, L3 label/aksen kecil. Merender KUMULATIF L0..Ln: lapis di atas n disembunyikan (visibility), layout tetap.
  --lapis n   hanya render hasil kumulatif sampai n (bawaan "semua": satu gambar per lapis yang ada di frame, urut naik).
  Keluaran per lapis, resolusi penuh (--size):
    qc/lihat/<frame>-L<n>.png         frame kumulatif
    qc/lihat/<frame>-L<n>-crop.png    crop 100 % (piksel asli, bawaan 960x540) di wilayah tersibuk (kepadatan tepi tertinggi)
  dan menambah satu baris di qc/LOG-lihat.md: waktu | frame | lapis | berkas | crop | lihat | perbaiki.
  Setelah menjalankan, BUKA gambarnya (bukan contact sheet), perbaiki lapis itu, baru tulis lapis berikutnya.

Remotion (still per lapis; composition harus membaca prop `lapis`: tampilkan hanya lapis <= prop):
  python3 lihat.py --remotion <Comp> --entry src/index.ts [--frame 90] [--props '{"judul":"x"}'] [--lapis 0,1,2,3] [--cwd <folder remotion>] [--dry-run]
  Menjalankan per lapis: npx remotion still <entry> <Comp> <out.png> --frame=<N> --props='{...,"lapis":n}'
  --dry-run hanya mencetak perintahnya.

Butuh Python ber-Playwright + Pillow + numpy (di PC server: ~/work/mg-venv/bin/python). Keluar 0 sukses · 1 gagal (mis. tak ada data-lapis) · 2 alat tidak ada.
"""
import argparse, datetime, json, os, re, shlex, subprocess, sys

NAMA = {"latar": 0, "objek": 1, "teks": 2, "label": 3}


def tanda(v):
    v = str(v).strip().lower()
    if v in NAMA: return NAMA[v]
    return int(v) if re.fullmatch(r"\d+", v) else None


def parse_lapis(s, ada):
    if s in (None, "", "semua"): return sorted(ada)
    return sorted({int(x) for x in s.split(",") if x.strip() != ""})


def wilayah_tersibuk(img, cw, ch):
    """Kotak (x, y, w, h) berukuran cw x ch dengan jumlah gradien (kepadatan tepi) terbesar. Gambar lebih kecil dari kotak: seluruhnya."""
    import numpy as np
    w, h = img.size
    cw, ch = min(cw, w), min(ch, h)
    if (cw, ch) == (w, h): return (0, 0, w, h)
    a = np.asarray(img.convert("L"), dtype=np.float32)
    g = np.zeros_like(a)
    g[:, 1:] += np.abs(np.diff(a, axis=1)); g[1:, :] += np.abs(np.diff(a, axis=0))
    cell = 32
    gh, gw = h // cell, w // cell
    c = g[:gh * cell, :gw * cell].reshape(gh, cell, gw, cell).sum(axis=(1, 3))
    S = np.pad(c, ((1, 0), (1, 0))).cumsum(0).cumsum(1)
    kw, kh = max(1, cw // cell), max(1, ch // cell)
    best, pos = -1.0, (0, 0)
    for j in range(0, gh - kh + 1):
        for i in range(0, gw - kw + 1):
            v = S[j + kh, i + kw] - S[j, i + kw] - S[j + kh, i] + S[j, i]
            if v > best: best, pos = v, (i, j)
    x = min(pos[0] * cell, w - cw); y = min(pos[1] * cell, h - ch)
    return (int(x), int(y), int(cw), int(ch))


def simpan_crop(png, ukuran_crop):
    from PIL import Image
    im = Image.open(png)
    x, y, w, h = wilayah_tersibuk(im, *ukuran_crop)
    out = png[:-4] + "-crop.png"
    im.crop((x, y, x + w, y + h)).save(out)
    return out, (x, y, w, h)


def catat(qc, frame, lapis, png, crop, box, lihat, perbaiki):
    os.makedirs(qc, exist_ok=True)
    f = os.path.join(qc, "LOG-lihat.md")
    if not os.path.exists(f):
        open(f, "w", encoding="utf-8").write("# LOG lihat per lapis\n\nwaktu | frame | lapis | berkas | crop 100 % (x,y,w,h) | lihat | perbaiki\n--- | --- | --- | --- | --- | --- | ---\n")
    t = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    with open(f, "a", encoding="utf-8") as fh:
        fh.write(f"{t} | {frame} | L{lapis} | {os.path.relpath(png, qc)} | {os.path.basename(crop)} {','.join(map(str, box))} | {lihat or '-'} | {perbaiki or '-'}\n")
    return f


def lihat_html(a):
    from playwright.sync_api import sync_playwright
    W, H = (int(x) for x in a.size.lower().split("x"))
    cw, ch = (int(x) for x in a.crop.lower().split("x"))
    frame = os.path.splitext(os.path.basename(a.target))[0]
    keluar = os.path.join(a.qc, "lihat"); os.makedirs(keluar, exist_ok=True)
    hasil = []
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={"width": W, "height": H})
        pg.goto("file://" + os.path.abspath(a.target)); pg.wait_for_timeout(200)
        vals = pg.evaluate("() => [...document.querySelectorAll('[data-lapis]')].map(e => e.getAttribute('data-lapis'))")
        ada = {tanda(v) for v in vals} - {None}
        if not ada:
            b.close(); print('GAGAL: tidak ada elemen data-lapis="0|1|2|3" di frame ini; tandai lapisnya dulu (L0 latar, L1 objek, L2 teks, L3 label).'); return 1
        for n in parse_lapis(a.lapis, ada):
            css = "".join(f'[data-lapis="{k}"],[data-lapis="{k}"] *{{visibility:hidden!important}}' for k in list(range(n + 1, 10)) + [nm for nm, v in NAMA.items() if v > n])
            h = pg.add_style_tag(content=css)
            png = os.path.join(keluar, f"{frame}-L{n}.png")
            pg.screenshot(path=png, full_page=False)
            h.evaluate("e => e.remove()")
            crop, box = simpan_crop(png, (cw, ch))
            log = catat(a.qc, frame, n, png, crop, box, a.lihat, a.perbaiki)
            hasil.append((n, png, crop))
        b.close()
    for n, png, crop in hasil: print(f"L{n}: {png}  crop 100 %: {crop}")
    print(f"log: {log}\nBUKA gambar tiap lapis (bukan contact sheet), perbaiki lapis itu dulu, baru lanjut.")
    return 0


def lihat_remotion(a):
    props = json.loads(a.props) if a.props else {}
    keluar = os.path.join(a.qc, "lihat"); os.makedirs(keluar, exist_ok=True)
    lapis = parse_lapis(a.lapis, {0, 1, 2, 3})
    frame = f"{a.remotion}-f{a.frame}"
    cw, ch = (int(x) for x in a.crop.lower().split("x"))
    for n in lapis:
        png = os.path.abspath(os.path.join(keluar, f"{frame}-L{n}.png"))
        cmd = ["npx", "remotion", "still", a.entry, a.remotion, png, f"--frame={a.frame}", "--props=" + json.dumps({**props, "lapis": n}, ensure_ascii=False)]
        if a.dry_run: print(" ".join(shlex.quote(c) for c in cmd)); continue
        r = subprocess.run(cmd, cwd=a.cwd)
        if r.returncode != 0 or not os.path.exists(png): print(f"GAGAL: remotion still lapis {n}"); return 1
        crop, box = simpan_crop(png, (cw, ch))
        catat(a.qc, frame, n, png, crop, box, a.lihat, a.perbaiki)
        print(f"L{n}: {png}  crop 100 %: {crop}")
    return 0


def main(argv=None):
    ap = argparse.ArgumentParser(description="Lihat per lapis (HTML data-lapis atau still Remotion)")
    ap.add_argument("target", nargs="?"); ap.add_argument("--lapis", default="semua"); ap.add_argument("--size", default="1920x1080")
    ap.add_argument("--crop", default="960x540"); ap.add_argument("--qc", default="qc")
    ap.add_argument("--lihat", default=""); ap.add_argument("--perbaiki", default="")
    ap.add_argument("--remotion"); ap.add_argument("--entry", default="src/index.ts"); ap.add_argument("--frame", type=int, default=0)
    ap.add_argument("--props"); ap.add_argument("--cwd"); ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args(argv)
    if a.remotion:
        if not a.dry_run:
            try: import PIL  # noqa
            except Exception: print("Pillow/numpy tidak ada (pakai ~/work/mg-venv/bin/python di PC)", file=sys.stderr); return 2
        return lihat_remotion(a)
    if not a.target or not os.path.isfile(a.target): print("beri frame .html atau --remotion <Comp>", file=sys.stderr); return 1
    try:
        import playwright.sync_api, PIL, numpy  # noqa
    except Exception:
        print("butuh Playwright + Pillow + numpy (pakai ~/work/mg-venv/bin/python di PC)", file=sys.stderr); return 2
    return lihat_html(a)


if __name__ == "__main__":
    sys.exit(main())
