#!/usr/bin/env python3
"""antrean.py · antrean produksi bersama lintas akun (Soalnya Gini 2/hari, siirfan 2/hari, Behindwork 1/hari).

  python3 tools/antrean.py [--dir antrean/] [--config kit/antrean.config.json] <perintah>
    status                               ringkasan per akun + antrean review Irfan + sumber daya mesin
    berikut                              SATU pekerjaan mesin berikutnya (atau "tunggu" + alasan), tidak mengubah apa pun
    baru <akun> <judul>                  item baru di tahap ide
    mulai <id>                           tandai sedang dikerjakan (menghitung sesi LLM / render berat)
    pindah <id> <tahap> --oleh mesin|irfan [--catatan ".."]   pindah tahap; keluar dari review_* dan siap_unggah->tayang hanya --oleh irfan
    tahan <id> --catatan ".."            pindah ke 'tertahan' (butuh manusia), dicatat

Item = antrean/<id>.json. Prinsip penjadwalan (README §4):
  1. Selesaikan dulu, baru mulai: tahap yang lebih hilir didahulukan (WIP pendek, umur item pendek).
  2. Stop-the-line: bila antrean review Irfan > review.antre_maks, tidak ada ide/fakta baru yang ditarik.
  3. Batas WIP per akun = per_hari x wip_faktor item di tahap fakta..qc; stok siap_unggah dijaga buffer_hari x per_hari.
  4. Sumber daya: render berat hanya bila kunci render global bebas, RAM tersedia >= ram_min_gib_berat dan disk >= disk_min_gib;
     sesi LLM paralel <= sesi_llm_maks; kerja ringan (still, whisper, ffmpeg) <= kerja_ringan_maks.
  5. Adil antar akun: defisit terbesar terhadap target stok didahulukan.
"""
import argparse, datetime as dt, fcntl, json, os, shutil, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def now(): return dt.datetime.now().isoformat(timespec="seconds")


def load_items(d):
    return {p.stem: json.load(open(p, encoding="utf-8")) for p in sorted(Path(d).glob("*.json"))}


def save(d, it): json.dump(it, open(Path(d) / f"{it['id']}.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)


def mem_gib():
    try:
        for l in open("/proc/meminfo"):
            if l.startswith("MemAvailable:"): return int(l.split()[1]) / 1048576
    except OSError: pass
    return float(os.environ.get("ANTREAN_RAM_GIB", "0"))  # bukan Linux: isi manual, default 0 = tidak aman


def lock_bebas(path):
    try:
        fd = os.open(path, os.O_RDWR | os.O_CREAT, 0o666)
    except OSError: return True
    try:
        fcntl.flock(fd, fcntl.LOCK_EX | fcntl.LOCK_NB); fcntl.flock(fd, fcntl.LOCK_UN); return True
    except BlockingIOError: return False
    finally: os.close(fd)


def sumber(cfg, items):
    b = cfg["batas"]; sedang = [i for i in items.values() if i.get("sedang")]
    res = lambda i: cfg["sumber_daya"].get(i["tahap"], "")
    return dict(ram=round(mem_gib(), 1), disk=round(shutil.disk_usage(os.path.expanduser("~")).free / 2**30, 1),
                kunci_bebas=lock_bebas(b["kunci_render"]),
                llm=sum("llm" in res(i) for i in sedang), ringan=sum("ringan" in res(i) for i in sedang),
                berat=sum(res(i) == "berat" for i in sedang))


def bisa(cfg, s, kelas):
    b = cfg["batas"]; why = []
    if "berat" == kelas:
        if s["berat"] >= b["render_berat_maks"] or not s["kunci_bebas"]: why.append("kunci render dipakai")
        if s["ram"] < b["ram_min_gib_berat"]: why.append(f"RAM {s['ram']} < {b['ram_min_gib_berat']} GiB")
        if s["disk"] < b["disk_min_gib"]: why.append(f"disk {s['disk']} < {b['disk_min_gib']} GiB")
    if "llm" in kelas and s["llm"] >= b["sesi_llm_maks"]: why.append(f"sesi LLM {s['llm']}/{b['sesi_llm_maks']}")
    if "ringan" in kelas:
        if s["ringan"] >= b["kerja_ringan_maks"]: why.append(f"kerja ringan {s['ringan']}/{b['kerja_ringan_maks']}")
        if s["ram"] < b["ram_min_gib_ringan"]: why.append(f"RAM {s['ram']} < {b['ram_min_gib_ringan']} GiB")
    return why


def review_q(cfg, items):
    return [i for i in items.values() if cfg["pelaku"].get(i["tahap"]) == "irfan" and i["tahap"] != "siap_unggah"]


def berikut(cfg, items, out=True):
    T = cfg["tahap"]; s = sumber(cfg, items); rq = review_q(cfg, items)
    stop = len(rq) > cfg["review"]["antre_maks"]
    cand, tunggu = [], []
    for akun, a in cfg["akun"].items():
        mine = [i for i in items.values() if i["akun"] == akun]
        stok = sum(i["tahap"] == "siap_unggah" for i in mine)
        wip = sum(T.index("fakta") <= T.index(i["tahap"]) <= T.index("qc") for i in mine if i["tahap"] in T)
        defisit = a["per_hari"] * cfg["batas"]["buffer_hari"] - stok - 0.5 * wip
        for i in mine:
            t = i["tahap"]
            if t not in T or cfg["pelaku"].get(t) == "irfan" or t == "tayang" or i.get("sedang"): continue
            if t in ("ide", "fakta") and stop: tunggu.append(f"{i['id']}: stop-the-line, review Irfan {len(rq)} item"); continue
            if t == "ide" and wip >= a["per_hari"] * cfg["batas"]["wip_faktor"]: tunggu.append(f"{i['id']}: WIP {akun} {wip} penuh"); continue
            kelas = cfg["sumber_daya"].get(t, "ringan"); why = bisa(cfg, s, kelas)
            if why: tunggu.append(f"{i['id']} ({t}): " + ", ".join(why)); continue
            cand.append((-T.index(t), -defisit, i.get("dibuat", ""), i, kelas))
    cand.sort(key=lambda c: c[:3])
    if not out: return cand, tunggu, s
    if cand:
        _, _, _, i, k = cand[0]
        print(f"BERIKUT: {i['id']} [{i['akun']}] tahap '{i['tahap']}' ({k}) · {i['judul']}")
    else:
        print("TUNGGU: tidak ada pekerjaan mesin yang boleh jalan sekarang")
    for w in tunggu[:8]: print("  tertahan:", w)
    return cand, tunggu, s


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--dir", default=str(ROOT / "antrean"))
    ap.add_argument("--config", default=str(ROOT / "kit/antrean.config.json")); ap.add_argument("cmd")
    ap.add_argument("args", nargs="*"); ap.add_argument("--oleh"); ap.add_argument("--catatan", default="")
    a = ap.parse_args(); cfg = json.load(open(a.config, encoding="utf-8")); Path(a.dir).mkdir(parents=True, exist_ok=True)
    items = load_items(a.dir); T = cfg["tahap"]
    if a.cmd == "status":
        for akun, c in cfg["akun"].items():
            mine = [i for i in items.values() if i["akun"] == akun]
            per = {t: sum(i["tahap"] == t for i in mine) for t in T + ["tertahan"]}
            print(f"{akun:13s} target {c['per_hari']}/hari · " + " ".join(f"{t}={n}" for t, n in per.items() if n))
        rq = review_q(cfg, items)
        print(f"review Irfan: {len(rq)} item (maks per sesi {cfg['review']['maks_per_sesi']}, sesi {', '.join(cfg['review']['jadwal_wita'])} WITA)"
              + (" · STOP-THE-LINE aktif" if len(rq) > cfg["review"]["antre_maks"] else ""))
        for i in sorted(rq, key=lambda i: i.get("masuk_tahap", ""))[:cfg["review"]["maks_per_sesi"]]:
            print(f"  {i['tahap']:18s} {i['id']} [{i['akun']}] sejak {i.get('masuk_tahap', '?')} · {i['judul']}")
        print("mesin:", json.dumps(sumber(cfg, items))); return 0
    if a.cmd == "berikut": berikut(cfg, items); return 0
    if a.cmd == "baru":
        akun, judul = a.args[0], " ".join(a.args[1:])
        if akun not in cfg["akun"]: print("akun tidak dikenal:", akun); return 2
        n = 1 + sum(i["akun"] == akun for i in items.values())
        it = dict(id=f"{akun[:2]}{n:03d}", akun=akun, judul=judul, tahap="ide", dibuat=now(), masuk_tahap=now(), riwayat=[])
        save(a.dir, it); print("baru", it["id"]); return 0
    if a.cmd in ("mulai", "pindah", "tahan"):
        it = items.get(a.args[0]) if a.args else None
        if not it: print("id tidak ada"); return 2
        if a.cmd == "mulai":
            kelas = cfg["sumber_daya"].get(it["tahap"], "ringan"); why = bisa(cfg, sumber(cfg, items), kelas)
            if cfg["pelaku"].get(it["tahap"]) == "irfan": print("GAGAL: tahap ini milik Irfan"); return 1
            if why: print("GAGAL: sumber daya belum cukup:", ", ".join(why)); return 1
            it["sedang"] = dict(tahap=it["tahap"], mulai=now())
        elif a.cmd == "tahan":
            it["riwayat"].append(dict(dari=it["tahap"], ke="tertahan", oleh=a.oleh or "mesin", t=now(), catatan=a.catatan))
            it["tahap_sebelum"] = it["tahap"]; it["tahap"] = "tertahan"; it.pop("sedang", None)
        else:
            ke = a.args[1]; dari = it["tahap"]
            if ke not in T: print("tahap tidak dikenal:", ke); return 2
            if a.oleh not in ("mesin", "irfan"): print("wajib --oleh mesin|irfan"); return 2
            sumber_tahap = it.get("tahap_sebelum") if dari == "tertahan" else dari
            if cfg["pelaku"].get(sumber_tahap) == "irfan" and a.oleh != "irfan":
                print(f"GAGAL: keluar dari '{sumber_tahap}' hanya oleh Irfan (gerbang pemilik; upload selalu menunggu Irfan)"); return 1
            if dari != "tertahan" and T.index(ke) > T.index(dari) + 1:
                print(f"GAGAL: tidak boleh melompati tahap ({dari} -> {ke})"); return 1
            it["riwayat"].append(dict(dari=dari, ke=ke, oleh=a.oleh, t=now(), catatan=a.catatan))
            it["tahap"] = ke; it["masuk_tahap"] = now(); it.pop("sedang", None); it.pop("tahap_sebelum", None)
        save(a.dir, it); print(f"{it['id']}: {it['tahap']}" + (" (sedang)" if it.get("sedang") else "")); return 0
    print(__doc__); return 2


if __name__ == "__main__":
    sys.exit(main())
