#!/usr/bin/env python3
"""Ukur frame master tempat tiap lapisan ber-alpha benar-benar tampil dan bandingkan dengan rencana lego.json.

  python3 cek_master.py <lego.json> [--hanya pola] [--json keluaran.json]

Rencana lapisan = mulai di frame ceil(t*fps - 0.51) (frame terdekat dari t; tepat setengah frame ke bawah), panjang
durasi*fps frame dengan toleransi pembulatan: tampil floor atau ceil dari panjang itu (src 30 fps pada lego 29,97 fps
kehilangan pecahan, jadi akhir bisa berbeda 1 frame). Mulai harus tepat; terpotong, tertunda, atau beda panjang >= 1 frame gagal. durasi = metadata src (durasi klip
yang benar-benar dirakit); bila src tak punya durasi, dari lapisan.json di folder lego.json (entri "id", bidang "durasi"). Ukuran: tiap lapisan ber-alpha diganti kotak
putih 8x8 berposisi unik (jumlah frame = frame src), dirakit dengan compose.py yang SAMA (dasar, kamera, fps, setpts,
overlay), lalu frame master yang memuat kotak itu dibaca langsung dari keluaran mentah. Keluar 1 bila ada lapisan yang
tampil di frame berbeda dari rencana (mulai, akhir, atau tidak tampil sama sekali). --hanya: id yang cocok pola glob
(fnmatch) saja yang dicek, mis. "T0*".
Batas: hanya lapisan ber-alpha (pix_fmt beralfa / VP9 alpha); lapisan opaque dilewati dan disebut jumlahnya. Yang diukur
adalah KAPAN lapisan tampil, bukan isinya, posisinya, atau gerak x/y (gerak dihapus pada kotak penanda). Satu kotak
per lapisan sehingga maksimum (w/8)*(h/8) lapisan per jalan; lebih dari itu gagal. Butuh dasar utuh dirakit sekali
(waktu ~ durasi video); lapisan di atas rencana bisa kelihatan benar padahal dasarnya bergeser: jalankan base_pts.py juga.
"""
import argparse, fnmatch, json, math, os, re, subprocess, sys, tempfile
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import compose

ALFA = re.compile(r"(yuva|rgba|bgra|argb|abgr|gbrap|ya8|ya16|pal8)")


def info_src(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                        "stream=pix_fmt,nb_frames:stream_tags=alpha_mode:format=duration", "-of", "json", path],
                       capture_output=True, text=True)
    try: d = json.loads(r.stdout)
    except ValueError: return None
    s = (d.get("streams") or [{}])[0]
    alfa = bool(ALFA.search(s.get("pix_fmt", ""))) or (s.get("tags", {}).get("alpha_mode") == "1")
    nb = int(s["nb_frames"]) if str(s.get("nb_frames", "")).isdigit() else None
    dur = float(d.get("format", {}).get("duration") or 0)
    return dict(alfa=alfa, nb=nb, dur=dur)


def rencana(L, base):
    """id -> (info, frame mulai, frame akhir eksklusif); lapisan opaque tidak masuk."""
    fps = L["fps"]; lp = os.path.join(base, "lapisan.json"); dur = {}
    if os.path.exists(lp):
        raw = json.load(open(lp, encoding="utf-8"))
        for e in (raw if isinstance(raw, list) else raw.get("lapisan", [])):
            if isinstance(e, dict) and "id" in e and "durasi" in e: dur[e["id"]] = float(e["durasi"])
    out, lewat = {}, 0
    for l in L.get("lapisan", []):
        inf = info_src(os.path.join(base, l["src"]))
        if not inf or not inf["alfa"]: lewat += 1; continue
        d = inf["dur"] or dur.get(l.get("id"), 0)
        t = float(l["t"])
        mulai = math.ceil(t * fps - 0.51)                # frame terdekat dari t; tepat di setengah frame (+ galat 0,01) ke bawah
        pjg = d * fps                                    # panjang pecahan: tampil di frame master floor atau ceil darinya
        out[l["id"]] = (inf, mulai, (max(1, math.floor(pjg + 1e-3)), max(1, math.ceil(pjg - 1e-3))))
    return out, lewat


def ukur(L, base, ids, info, tmp):
    fps, W, H = L["fps"], L["w"], L["h"]
    kol = W // 8
    if len(ids) > kol * (H // 8): raise SystemExit(f"FAIL: {len(ids)} lapisan melebihi {kol * (H // 8)} kotak penanda")
    baris = (len(ids) + kol - 1) // kol
    new = []
    for k, i in enumerate(ids):
        n = info[i][0]["nb"] or info[i][2][1]
        f = os.path.join(tmp, f"w_{n}.mov")
        if not os.path.exists(f):
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", f"color=c=white:s=8x8:r={fps}", "-frames:v", str(n),
                            "-c:v", "prores_ks", "-profile:v", "4444", "-pix_fmt", "yuva444p10le", f], check=True)
        e = next(x for x in L["lapisan"] if x["id"] == i)
        new.append(dict(id=i, src=os.path.relpath(f, base), t=e["t"], x=8 * (k % kol), y=8 * (k // kol)))
    L2 = dict(L, lapisan=new); L2.pop("audio", None)
    cmd, _ = compose.build_cmd(L2, base)
    fi = cmd.index("-filter_complex")
    cmd[fi + 1] = cmd[fi + 1].rsplit("[v]", 1)[0] + f",crop={W}:{baris * 8}:0:0,format=gray[v]"
    cmd = cmd[:cmd.index("-map") + 2] + ["-f", "rawvideo", "-"]
    raw = subprocess.run(cmd, capture_output=True).stdout
    nfr = len(raw) // (W * baris * 8)
    if not nfr: raise SystemExit("FAIL: ffmpeg tidak menghasilkan frame")
    fr = np.frombuffer(raw[:nfr * W * baris * 8], np.uint8).reshape(nfr, baris * 8, W)
    out = {}
    for k, i in enumerate(ids):
        idx = np.where(fr[:, 8 * (k // kol) + 4, 8 * (k % kol) + 4] > 128)[0]
        out[i] = [int(idx.min()), int(idx.max()) + 1] if len(idx) else [None, None]
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("lego"); ap.add_argument("--hanya"); ap.add_argument("--json")
    a = ap.parse_args()
    L = json.load(open(a.lego, encoding="utf-8")); base = os.path.dirname(os.path.abspath(a.lego))
    errs, _ = compose.validate(dict(L, lapisan=[], audio=None), base)
    if errs: print("FAIL: " + "; ".join(errs[:10])); sys.exit(1)
    info, lewat = rencana(L, base)
    ids = [i for i in info if not a.hanya or fnmatch.fnmatch(i, a.hanya)]
    if not ids:
        print(f"FAIL: tidak ada lapisan ber-alpha yang dicek (opaque dilewati: {lewat})"); sys.exit(1)
    with tempfile.TemporaryDirectory() as tmp:
        got = ukur(L, base, ids, info, tmp)
    if a.json: json.dump(got, open(a.json, "w"))
    gagal = []
    for i in ids:
        _, mulai, (lo, hi) = info[i]; g = got[i]
        if g[0] != mulai or g[1] is None or not lo <= g[1] - g[0] <= hi:
            gagal.append(f"{i}: rencana f{mulai}+{lo}..{hi} frame master f{g[0]}-{g[1]}")
    print(f"{len(ids)} lapisan ber-alpha dibaca dari master (opaque dilewati: {lewat}) · " + ("PASS" if not gagal else f"FAIL ({len(gagal)} temuan)"))
    for g in gagal[:40]: print("GAGAL " + g)
    sys.exit(1 if gagal else 0)


if __name__ == "__main__":
    main()
