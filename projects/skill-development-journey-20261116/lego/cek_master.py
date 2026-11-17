#!/usr/bin/env python3
"""Cek MASTER (ronde 4b): jalankan compose.py yang SAMA (dasar + filter overlay yang sama, rencana frame yang sama) dengan tiap lapisan teks/bubble/coretan diganti kotak putih 8x8
berlokasi unik; dari hasilnya dibaca frame master berapa tiap lapisan benar-benar tampil. Pembanding = rencana: tampil di [round(t*29,97), akhir) dengan akhir dari rencana bangun
(lapisan yang berakhir di potongan adegan TIDAK boleh tampil di frame cut; lapisan berurutan tanpa celah/tumpang tindih).
  python3 lego/cek_master.py [--ulang]   -> qc/r4/log/master_tampil.json ; keluar 1 bila ada penyimpangan
Kalibrasi: lego/kalibrasi.json {id: [geser_t_frame, tambah_n]} dipakai bangun.py supaya tampil master = rencana."""
import json, os, subprocess, sys
import numpy as np
import waktu as W
P = W.P
FPSO = 30000 / 1001
COMPS = ("KT", "Bubble", "Coretan")
diag_dir = os.path.join(P, "qc/diag")
os.makedirs(diag_dir, exist_ok=True)


def rencana():
    """id -> (frame mulai, frame akhir eksklusif) yang DIINGINKAN, dari lego/lapisan.json (t, durasi di rencana bangun: durasi = n lapisan, tampil diharapkan n-? ditentukan `want` di bangun)"""
    lap = {e["id"]: e for e in json.load(open(os.path.join(P, "lego/lapisan.json")))}
    want = json.load(open(os.path.join(P, "lego/tampil_rencana.json")))
    return lap, want


def main():
    lap, want = rencana()
    lm = json.load(open(os.path.join(P, "lego/lego_master_gambar.json")))
    ids = [e["id"] for e in lm["lapisan"] if e["id"] in lap and lap[e["id"]]["comp"] in COMPS]
    blok = {}
    new = []
    for e in lm["lapisan"]:
        if e["id"] in ids:
            k = ids.index(e["id"]); x, y = 8 * (k % 230), 8 * (k // 230)
            n = round(lap[e["id"]]["durasi"] * 30)
            f = os.path.join(diag_dir, f"w_{n}.mov")
            if not os.path.exists(f):
                subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "color=c=white:s=8x8:r=30", "-frames:v", str(n), "-c:v", "prores_ks", "-profile:v", "4444", "-pix_fmt", "yuva444p10le", f], check=True)
            new.append(dict(id=e["id"], src=os.path.relpath(f, os.path.join(P, "lego")), t=e["t"], x=x, y=y)); blok[e["id"]] = (x, y)
    lm2 = dict(lm, lapisan=new, keluar="../qc/diag/diag_master.mp4", crf=10)
    json.dump(lm2, open(os.path.join(P, "lego/lego_diag.json"), "w"), indent=1)
    if "--ulang" in sys.argv or not os.path.exists(os.path.join(diag_dir, "diag_master.mp4")):
        r = subprocess.run(["python3", os.path.expanduser("~/work/skill-development/claude/motion-graphic/scripts/lego/compose.py"), os.path.join(P, "lego/lego_diag.json")], capture_output=True, text=True)
        if r.returncode: print(r.stdout[-300:], r.stderr[-300:]); sys.exit(2)
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", os.path.join(diag_dir, "diag_master.mp4"), "-vf", "crop=1920:16:0:0,format=gray", "-f", "rawvideo", "-"], capture_output=True).stdout
    nfr = len(raw) // (1920 * 16); fr = np.frombuffer(raw, np.uint8).reshape(nfr, 16, 1920)
    out = {}; gagal = []
    for i in ids:
        x, y = blok[i]
        v = fr[:, y + 4, x + 4] > 128
        idx = np.where(v)[0]
        out[i] = [int(idx.min()), int(idx.max()) + 1] if len(idx) else [None, None]
    json.dump(out, open(os.path.join(P, "qc/r4/log/master_tampil.json"), "w"))
    if "--kalibrasi" in sys.argv:
        kp = os.path.join(P, "lego/kalibrasi.json"); KAL = json.load(open(kp)) if os.path.exists(kp) else {}
        ch = 0
        for i in ids:
            w, o = want[i], out[i]
            if o == w or o[0] is None: continue
            k = KAL.get(i, [0, 0]); KAL[i] = [k[0] + o[0] - w[0], k[1] + (w[1] - w[0]) - (o[1] - o[0])]; ch += 1
        json.dump(KAL, open(kp, "w"), indent=0); print("kalibrasi diperbarui:", ch, "lapisan")
    print(f"{'id':12} {'rencana':>14} {'master':>14}")
    for i in ids:
        w = want[i]; o = out[i]
        sel = "" if o == w else "  <-- BEDA"
        if o != w: gagal.append(f"{i}: rencana f{w[0]}-{w[1]} master f{o[0]}-{o[1]}")
        if sel: print(f"{i:12} {str(w):>14} {str(o):>14}{sel}")
    # tidak ada lapisan dari adegan sebelumnya aktif di frame cut
    for p, nm in W.POTONG + [(W.T["decision"], "cut decision")]:
        c = round(p * FPSO)
        for i in ids:
            o = out[i]
            if o[0] is not None and o[0] < c < o[1] + 0 and want[i][1] <= c and o[1] > c: gagal.append(f"(potong '{nm}' f{c}) {i} masih tampil di frame cut (master f{o[0]}-{o[1]})")
    print(f"{len(ids)} lapisan dibaca dari master · " + ("PASS" if not gagal else f"FAIL ({len(gagal)} temuan)"))
    for g in gagal[:40]: print("GAGAL " + g)
    sys.exit(1 if gagal else 0)


if __name__ == "__main__":
    main()
