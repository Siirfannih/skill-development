#!/usr/bin/env python3
"""Render lapisan lego satu per satu dengan cache. Hanya lapisan yang berubah yang dirender ulang.

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
import argparse, hashlib, json, os, shutil, signal, subprocess, sys, tempfile, time
from concurrent.futures import ThreadPoolExecutor


def gl_arg():
    """Opsi --gl dari profil mesin (tools/bench-render/bench.sh), sama seperti render.sh; env GL menang."""
    gl = os.environ.get("GL")
    if not gl:
        try:
            import socket
            p = json.load(open(os.environ.get("RENDER_PROFILE", os.path.expanduser("~/work/render-profile.json"))))
            gl = p.get("gl") if p.get("host") == socket.gethostname() else None
        except (OSError, ValueError):
            gl = None
    return [f"--gl={gl}"] if gl and gl != "default" else []


def _pohon(penanda):
    """PID proses yang baris perintahnya memuat `penanda` (direktori temp pekerjaan ini) beserta semua turunannya. Tidak pernah pencocokan nama global."""
    keluar = subprocess.run(["ps", "-eo", "pid=,ppid=,args="], capture_output=True, text=True).stdout
    baris = []
    for l in keluar.splitlines():
        b = l.split(None, 2)
        if len(b) == 3 and b[0].isdigit() and b[1].isdigit():
            baris.append((int(b[0]), int(b[1]), b[2]))
    saya = os.getpid()
    ids = {p for p, _, a in baris if penanda in a and p != saya}
    tumbuh = True
    while tumbuh:
        baru = {p for p, pp, _ in baris if pp in ids and p not in ids and p != saya}
        tumbuh = bool(baru); ids |= baru
    return ids


def _sapu(penanda):
    """Matikan sisa proses (Chrome yatim) milik pekerjaan ini: TERM, 2 dtk, KILL. Hanya yang terkait penanda."""
    for sig in (signal.SIGTERM, signal.SIGKILL):
        ids = _pohon(penanda)
        if not ids:
            return
        for p in ids:
            try: os.kill(p, sig)
            except ProcessLookupError: pass
        if sig == signal.SIGTERM:
            time.sleep(2)


def jalankan_grup(cmd, timeout, tmp_induk, **kw):
    """(Salinan pabrik/lib.py.) subprocess.run untuk render: proses jalan di sesi/grup sendiri dengan TMPDIR sendiri. Habis waktu, error, atau Ctrl-C:
    seluruh grup dimatikan (TERM, 3 dtk, KILL) dan sisa Chrome pekerjaan ini disapu (lewat TMPDIR-nya), lalu pengecualian diteruskan.
    Mengembalikan CompletedProcess (stdout/stderr teks) seperti subprocess.run."""
    os.makedirs(tmp_induk, exist_ok=True)
    tmp = tempfile.mkdtemp(prefix="render-", dir=tmp_induk)
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, start_new_session=True,
                         env={**(kw.pop("env", None) or os.environ), "TMPDIR": tmp}, **kw)
    try:
        out, err = p.communicate(timeout=timeout)
        if p.returncode:
            _sapu(tmp)
        return subprocess.CompletedProcess(cmd, p.returncode, out, err)
    except BaseException:
        try: os.killpg(p.pid, signal.SIGTERM)
        except ProcessLookupError: pass
        try: p.wait(3)
        except subprocess.TimeoutExpired: pass
        try: os.killpg(p.pid, signal.SIGKILL)
        except ProcessLookupError: pass
        p.wait(); _sapu(tmp)
        raise
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def key(stamp, item, fps):
    raw = json.dumps([stamp, item["comp"], item.get("props", {}), item.get("durasi"), fps], sort_keys=True)
    return hashlib.sha1(raw.encode()).hexdigest()[:16]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("proyek"); ap.add_argument("lapisan")
    ap.add_argument("--konkurensi", type=int, default=4); ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--hanya", default="")
    ap.add_argument("--maks", type=int, default=int(os.environ.get("LAPISAN_MAKS_DTK", "900")), help="batas waktu per lapisan, detik (default 900 / env LAPISAN_MAKS_DTK)")
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
               f"--frames=0-{frames - 1}", "--concurrency=1", "--log=error"] + gl_arg()
        todo.append((it["id"], cmd))
    print(f"lapisan {len(items)} · cache dipakai {len(items) - len(todo)} · dirender {len(todo)}")

    def run(job):
        lid, cmd = job
        try:
            r = jalankan_grup(cmd, a.maks, os.path.join(P, "qc", ".tmp-lapisan"), cwd=os.path.join(P, "remotion"))
        except subprocess.TimeoutExpired:
            return lid, 124, f"TIMEOUT setelah {a.maks} dtk (grup proses dimatikan; naikkan --maks atau LAPISAN_MAKS_DTK bila memang selama itu)"
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
