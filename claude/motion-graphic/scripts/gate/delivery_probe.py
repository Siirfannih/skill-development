#!/usr/bin/env python3
"""Cek pasca-render profil pengiriman V1 (lihat references/delivery-spec.md). Alat mandiri, belum jadi gerbang wajib.

6 cek, satu baris per cek (PASS/FAIL), exit 0 bila semua lulus, 1 bila ada gagal, 2 bila alat/berkas bermasalah:
  1 codec    h264, profil High
  2 pix_fmt  yuv420p
  3 warna    color_space, color_primaries, color_transfer = bt709 DAN color_range = tv
  4 faststart box moov sebelum mdat (urutan box tingkat atas)
  5 audio    AAC-LC, 48 kHz, stereo
  6 loudness integrated -14..-16 LUFS (toleransi 0,5), true peak <= -1 dBTP; diukur di MP4 (setelah AAC)
Pakai: python3 delivery_probe.py out.mp4 [--lufs-min -16] [--lufs-max -14] [--tp-max -1] [--tol 0.5]
"""
import argparse, json, re, struct, subprocess, sys


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def boxes(path):
    """Urutan nama box tingkat atas (tanpa membaca isi besar)."""
    out = []
    with open(path, "rb") as f:
        while True:
            h = f.read(8)
            if len(h) < 8:
                break
            size, name = struct.unpack(">I4s", h)
            name = name.decode("latin1")
            out.append(name)
            if size == 1:
                size = struct.unpack(">Q", f.read(8))[0]
                f.seek(size - 16, 1)
            elif size == 0:
                break
            else:
                f.seek(size - 8, 1)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4")
    ap.add_argument("--lufs-min", type=float, default=-16.0)
    ap.add_argument("--lufs-max", type=float, default=-14.0)
    ap.add_argument("--tol", type=float, default=0.5)
    ap.add_argument("--tp-max", type=float, default=-1.0)
    a = ap.parse_args()

    p = run(["ffprobe", "-v", "error", "-show_entries",
             "stream=codec_type,codec_name,profile,pix_fmt,color_space,color_primaries,color_transfer,color_range,sample_rate,channels",
             "-of", "json", a.mp4])
    if p.returncode != 0:
        print("ERROR ffprobe gagal:", p.stderr.strip()[:200]); return 2
    st = json.loads(p.stdout).get("streams", [])
    v = next((s for s in st if s.get("codec_type") == "video"), None)
    au = next((s for s in st if s.get("codec_type") == "audio"), None)
    if not v:
        print("ERROR tidak ada stream video"); return 2

    res = []
    def add(name, ok, msg):
        res.append(ok); print(f"{'PASS' if ok else 'FAIL'} {name:9s} {msg}")

    add("codec", v.get("codec_name") == "h264" and v.get("profile") == "High",
        f"{v.get('codec_name')} / {v.get('profile')} (mau h264 / High)")
    add("pix_fmt", v.get("pix_fmt") == "yuv420p", f"{v.get('pix_fmt')} (mau yuv420p)")
    c = [v.get("color_space"), v.get("color_primaries"), v.get("color_transfer"), v.get("color_range")]
    add("warna", c == ["bt709", "bt709", "bt709", "tv"],
        f"space/prim/trc/range = {'/'.join(str(x or 'unset') for x in c)} (mau bt709/bt709/bt709/tv)")
    bx = boxes(a.mp4)
    ok = "moov" in bx and "mdat" in bx and bx.index("moov") < bx.index("mdat")
    add("faststart", ok, "moov sebelum mdat" if ok else f"urutan box {bx[:6]} (mau moov sebelum mdat)")
    if au:
        add("audio", au.get("codec_name") == "aac" and au.get("profile") == "LC"
            and str(au.get("sample_rate")) == "48000" and au.get("channels") == 2,
            f"{au.get('codec_name')} {au.get('profile')} {au.get('sample_rate')} Hz {au.get('channels')} ch (mau aac LC 48000 2)")
        m = run(["ffmpeg", "-hide_banner", "-nostats", "-i", a.mp4, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"])
        tail = m.stderr.split("Summary:")[-1]
        mi = re.search(r"\bI:\s+(-?[\d.]+) LUFS", tail)
        mp = re.search(r"Peak:\s+(-?[\d.]+|-inf) dBFS", tail)
        if not (mi and mp):
            add("loudness", False, "ebur128 tidak menghasilkan I/Peak")
        else:
            i = float(mi.group(1)); tp = float(mp.group(1)) if mp.group(1) != "-inf" else -99.0
            ok = a.lufs_min - a.tol <= i <= a.lufs_max + a.tol and tp <= a.tp_max
            add("loudness", ok, f"I {i:.1f} LUFS (mau {a.lufs_min:g}..{a.lufs_max:g} +-{a.tol:g}), TP {tp:.1f} dBTP (mau <= {a.tp_max:g}) di MP4")
    else:
        add("audio", False, "tidak ada stream audio")
        add("loudness", False, "tidak ada stream audio")
    return 0 if all(res) else 1


if __name__ == "__main__":
    sys.exit(main())
