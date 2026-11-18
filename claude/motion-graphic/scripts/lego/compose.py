#!/usr/bin/env python3
"""Rakit video seperti lego: footage dasar + lapisan (teks/KT, visual, overlay) yang sudah dirender
TERPISAH dan disimpan di cache digabung SEKALI dengan ffmpeg. Lapisan yang tidak berubah tidak dirender ulang; teks
dari transkrip hanya digeser waktu, durasi, dan posisinya saat dirakit.

Kenapa: render Remotion penuh menggambar ulang SEMUA lapisan di setiap frame (decode footage di Chrome, blur, glow,
blend) dan diulang setiap revisi. Di sini Chrome hanya menggambar lapisan grafis yang berubah, sebesar kotaknya saja;
footage dan kamera footage dikerjakan ffmpeg.

lego.json:
{
  "fps": 30, "w": 1080, "h": 1920,
  "dasar": [                      # trek footage berurutan (talking head, b-roll); kamera footage dikerjakan di sini
    {"src": "edit/wajah.mp4", "in": 0.0, "dur": 12.3,
     "kamera": {"zoom": [1.0, 1.06], "pusat": [0.5, 0.42], "kurva": "heavy"}}   # opsional: push/pull pelan
  ],
  "lapisan": [                    # klip ber-alpha (ProRes 4444 .mov / PNG seq / WebM VP9 alpha), urutan = urutan tumpuk
    {"id": "T01", "src": "lego/cache/ab12.mov", "t": 1.20, "x": 120, "y": 900,
     "gerak": {"x": [[0, 120], [0.4, 100]], "y": [[0, 900]]}}                   # opsional, detik relatif ke t
  ],
  "audio": "audio/mix.wav",       # mix final, dipasang sekali
  "keluar": "out/final.mp4", "crf": 16
}
Aturan:
  - Lapisan yang harus ikut gerak kamera 2.5D atau berubah skala dirender dengan gerak itu sudah di dalamnya
    (kotak penuh/frame penuh ber-alpha). compose hanya memindah x/y dan menggeser waktu.
  - Efek glow/blend dirender di dalam lapisan; compose hanya overlay normal (alpha), supaya warna tidak bergeser.
  - Warna: semua lapisan dirakit di RGB (gbrap) lalu dikonversi sekali ke yuv420p bt709; overlay
    PNG/still langsung di YUV menggeser rentang warna.
Pakai:
  python3 compose.py lego.json            # tulis video final
  python3 compose.py lego.json --cek      # hanya validasi (file ada, waktu dalam durasi, lapisan tidak di luar frame)
  python3 compose.py lego.json --rentang 10 14   # rakit rentang saja untuk QC cepat
Klip dasar harus >= 2 frame pada fps lego (validate menolak). Ukur pts frame dasar: base_pts.py; ukur frame tampil
tiap lapisan ber-alpha terhadap rencana: cek_master.py.
"""
import argparse, json, math, os, subprocess, sys

BEZ = {"land": (0.1, 0.75, 0.15, 1), "heavy": (0.75, 0, 0.18, 1), "drift": (0.4, 0, 0.6, 1), "linear": None}


def ffprobe_dur(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                         capture_output=True, text=True).stdout.strip()
    try:
        return float(out)
    except ValueError:
        return None


def piecewise(keys, var="T"):
    """[[t, v], ...] -> ekspresi ffmpeg linear per segmen (t relatif)."""
    keys = sorted(keys)
    if len(keys) == 1:
        return f"{keys[0][1]}"
    expr = f"{keys[-1][1]}"
    for (t0, v0), (t1, v1) in reversed(list(zip(keys, keys[1:]))):
        seg = f"({v0}+({v1}-{v0})*({var}-{t0})/{max(1e-6, t1 - t0)})"
        expr = f"if(lt({var},{t1}),{seg},{expr})"
    return f"if(lt({var},{keys[0][0]}),{keys[0][1]},{expr})"


def eased(p, curve):
    """Ekspresi ffmpeg untuk kurva: cubic-bezier didekati smoothstep berbobot (cukup untuk push footage pelan)."""
    if curve == "linear":
        return p
    if curve == "land":
        return f"(1-pow(1-{p},3))"
    return f"({p}*{p}*(3-2*{p}))"


def validate(L, base_dir):
    errs = []
    total = sum(c["dur"] for c in L["dasar"])
    for i, c in enumerate(L["dasar"]):
        if not os.path.exists(os.path.join(base_dir, c["src"])):
            errs.append(f"dasar hilang: {c['src']}")
        if round(c["dur"] * L["fps"]) < 2:
            errs.append(f"dasar #{i} hanya {round(c['dur'] * L['fps'])} frame ({c['dur']:.4f} dtk): klip dasar < 2 frame "
                        "menggandakan pts frame dasar dan menggeser footage/lapisan 1-2 frame; gabungkan ke klip tetangga")
    for l in L.get("lapisan", []):
        p = os.path.join(base_dir, l["src"])
        if not os.path.exists(p):
            errs.append(f"lapisan {l.get('id')} hilang: {l['src']}")
            continue
        d = ffprobe_dur(p) or 0
        if l["t"] < 0 or l["t"] + d > total + 0.05:
            errs.append(f"lapisan {l.get('id')} di luar durasi ({l['t']:.2f}+{d:.2f} > {total:.2f})")
        if not (-L["w"] < l.get("x", 0) < L["w"] and -L["h"] < l.get("y", 0) < L["h"]):
            errs.append(f"lapisan {l.get('id')} di luar frame")
    if L.get("audio") and not os.path.exists(os.path.join(base_dir, L["audio"])):
        errs.append(f"audio hilang: {L['audio']}")
    return errs, total


def build_cmd(L, base_dir, rng=None):
    W, H, fps = L["w"], L["h"], L["fps"]
    up = 2  # kamera footage dihitung di 2× lalu diperkecil: zoom pelan tidak bergetar karena pembulatan piksel
    inputs, chains, k = [], [], 0
    for c in L["dasar"]:
        inputs += ["-ss", f"{c['in']}", "-t", f"{c['dur']}", "-i", os.path.join(base_dir, c["src"])]
        cam = c.get("kamera")
        f = f"[{k}:v]fps={fps},scale={W * up}:{H * up}:force_original_aspect_ratio=increase,crop={W * up}:{H * up},setsar=1"
        if cam:
            z0, z1 = cam.get("zoom", [1, 1])
            cx, cy = cam.get("pusat", [0.5, 0.5])
            n = max(1, round(c["dur"] * fps))
            p = f"min(1,on/{n - 1 if n > 1 else 1})"
            z = f"({z0}+({z1}-{z0})*{eased(p, cam.get('kurva', 'heavy'))})"
            f += (f",zoompan=z='{z}':x='(iw-iw/zoom)*{cx}':y='(ih-ih/zoom)*{cy}':d=1:s={W * up}x{H * up}:fps={fps}")
        f += f",scale={W}:{H}:flags=lanczos,format=gbrp,setpts=PTS-STARTPTS[d{k}]"
        chains.append(f)
        k += 1
    nd = k
    chains.append("".join(f"[d{i}]" for i in range(nd)) + f"concat=n={nd}:v=1:a=0,format=gbrap[base0]")
    cur = "base0"
    for j, l in enumerate(L.get("lapisan", [])):
        inputs += ["-i", os.path.join(base_dir, l["src"])]
        t = float(l["t"])
        chains.append(f"[{k}:v]fps={fps},format=gbrap,setpts=PTS-STARTPTS+{t}/TB[l{j}]")
        g = l.get("gerak", {})
        x = piecewise(g["x"], "(t-%s)" % t) if g.get("x") else str(l.get("x", 0))
        y = piecewise(g["y"], "(t-%s)" % t) if g.get("y") else str(l.get("y", 0))
        nxt = f"o{j}"
        chains.append(f"[{cur}][l{j}]overlay=x='{x}':y='{y}':eof_action=pass:format=gbrp[{nxt}]")
        cur = nxt
        k += 1
    chains.append(f"[{cur}]format=yuv420p,setparams=colorspace=bt709:color_primaries=bt709:color_trc=bt709:range=tv[v]")
    cmd = ["ffmpeg", "-y", "-v", "error", "-stats"] + inputs
    if L.get("audio"):
        cmd += ["-i", os.path.join(base_dir, L["audio"])]
    cmd += ["-filter_complex", ";".join(chains), "-map", "[v]"]
    if L.get("audio"):
        cmd += ["-map", f"{k}:a", "-c:a", "aac", "-b:a", "256k"]
    if rng:
        cmd += ["-ss", str(rng[0]), "-to", str(rng[1])]
    out = os.path.join(base_dir, L.get("keluar", "out/final.mp4"))
    if rng:
        out = out.replace(".mp4", f"_{rng[0]:g}-{rng[1]:g}.mp4")
    cmd += ["-c:v", "libx264", "-preset", "medium", "-crf", str(L.get("crf", 16)), "-r", str(fps),
            "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-movflags", "+faststart", out]
    return cmd, out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("lego"); ap.add_argument("--cek", action="store_true")
    ap.add_argument("--rentang", nargs=2, type=float)
    a = ap.parse_args()
    L = json.load(open(a.lego, encoding="utf-8"))
    base = os.path.dirname(os.path.abspath(a.lego))
    errs, total = validate(L, base)
    print(f"dasar {len(L['dasar'])} klip · {total:.2f} dtk · lapisan {len(L.get('lapisan', []))}")
    if errs:
        print("FAIL: " + "; ".join(errs[:10])); sys.exit(1)
    if a.cek:
        print("PASS"); return
    cmd, out = build_cmd(L, base, a.rentang)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    r = subprocess.run(cmd)
    if r.returncode:
        sys.exit(r.returncode)
    got = ffprobe_dur(out) or 0
    want = (a.rentang[1] - a.rentang[0]) if a.rentang else total
    print(f"{out} · {got:.2f} dtk (target {want:.2f})")
    print("PASS" if abs(got - want) <= 1.5 / L["fps"] + 0.05 else "FAIL: durasi tidak cocok")


if __name__ == "__main__":
    main()
