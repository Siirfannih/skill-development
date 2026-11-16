#!/usr/bin/env python3
"""Render lapisan lego satu per satu dengan cache (Irfan 16 Nov). Hanya lapisan yang berubah yang dirender ulang.

lapisan.json: [{"id": "T01", "comp": "TeksBlok", "props": {...}, "durasi": 1.4}, ...]
  - comp = komposisi Remotion berlatar TRANSPARAN yang hanya menggambar lapisan itu, seukuran kotaknya
    (teks/KT: kotak blok teks; visual: kotak objek; frame penuh hanya bila lapisan ikut gerak kamera 2.5D).
  - props berisi isi + gaya (kata, kode T, gaya G, ukuran). Waktu muncul dan posisi TIDAK masuk props: itu urusan
    lego.json saat dirakit, jadi menggeser waktu/posisi tidak memicu render ulang.
Kunci cache = sha1(bundle stamp + comp + props + durasi + fps). Keluaran: <proyek>/lego/cache/<kunci>.mov
(ProRes 4444 ber-alpha) dan lapisan.lock.json {id: path} untuk diisi ke lego.json.

Pakai (di PC server, setelah `render.sh <proyek> still …` membuat bundle):
  python3 lapisan.py <proyek> lapisan.json [--konkurensi 4] [--hanya T01,T02]
"""
import argparse, hashlib, json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor


def key(stamp, item, fps):
    raw = json.dumps([stamp, item["comp"], item.get("props", {}), item.get("durasi"), fps], sort_keys=True)
    return hashlib.sha1(raw.encode()).hexdigest()[:16]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("proyek"); ap.add_argument("lapisan")
    ap.add_argument("--konkurensi", type=int, default=4); ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--hanya", default="")
    a = ap.parse_args()
    P = os.path.abspath(a.proyek)
    bundle = os.path.join(P, "qc", ".bundle")
    stamp_f = os.path.join(P, "qc", ".bundle_stamp")
    if not os.path.isdir(bundle) or not os.path.exists(stamp_f):
        sys.exit("GAGAL: bundle belum ada; jalankan render.sh <proyek> still … dulu")
    stamp = str(os.path.getmtime(stamp_f))
    items = json.load(open(a.lapisan, encoding="utf-8"))
    only = set(filter(None, a.hanya.split(",")))
    cache = os.path.join(P, "lego", "cache"); os.makedirs(cache, exist_ok=True)
    lock_p = os.path.join(os.path.dirname(os.path.abspath(a.lapisan)), "lapisan.lock.json")
    lock = json.load(open(lock_p)) if os.path.exists(lock_p) else {}
    todo = []
    for it in items:
        out = os.path.join(cache, key(stamp, it, a.fps) + ".mov")
        lock[it["id"]] = os.path.relpath(out, P)
        if os.path.exists(out) or (only and it["id"] not in only):
            continue
        frames = max(1, round(float(it["durasi"]) * a.fps))
        cmd = ["npx", "remotion", "render", bundle, it["comp"], out, "--props", json.dumps(it.get("props", {})),
               "--codec=prores", "--prores-profile=4444", "--pixel-format=yuva444p10le", "--image-format=png",
               f"--frames=0-{frames - 1}", "--concurrency=1", "--log=error"]
        todo.append((it["id"], cmd))
    print(f"lapisan {len(items)} · cache dipakai {len(items) - len(todo)} · dirender {len(todo)}")

    def run(job):
        lid, cmd = job
        r = subprocess.run(cmd, cwd=os.path.join(P, "remotion"), capture_output=True, text=True)
        return lid, r.returncode, (r.stderr or r.stdout)[-400:]

    fails = []
    with ThreadPoolExecutor(max_workers=max(1, a.konkurensi)) as ex:
        for lid, rc, log in ex.map(run, todo):
            print(("ok   " if rc == 0 else "GAGAL ") + lid)
            if rc:
                fails.append(f"{lid}: {log}")
    json.dump(lock, open(lock_p, "w"), indent=1)
    print(f"-> {lock_p}")
    if fails:
        print("FAIL:\n  " + "\n  ".join(fails[:5])); sys.exit(1)


if __name__ == "__main__":
    main()
